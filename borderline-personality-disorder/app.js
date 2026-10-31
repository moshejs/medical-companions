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
const SOURCES=[{"key": "Adamis2026", "text": "Adamis D, Zhang T, Gavin B, McNicholas F. Prevalence and moderators of personality disorders in adults with ADHD: A meta-analysis. Psychiatry Res. 2026;360:117085. PMID 41849922; doi:10.1016/j.psychres.2026.117085.", "link": "https://doi.org/10.1016/j.psychres.2026.117085", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Afifi2011", "text": "Afifi TO, Mather A, Boman J, Fleisher W, Enns MW, Macmillan H, et al. Childhood adversity and personality disorders: results from a nationally representative population-based study. J Psychiatr Res. 2011;45(6):814-22. PMID 21146190; doi:10.1016/j.jpsychires.2010.11.008.", "link": "https://doi.org/10.1016/j.jpsychires.2010.11.008", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Agrawal2004", "text": "Agrawal HR, Gunderson J, Holmes BM, Lyons-Ruth K. Attachment studies with borderline patients: a review. Harv Rev Psychiatry. 2004;12(2):94-104. PMID 15204804; PMCID PMC1857277; doi:10.1080/10673220490447218.", "link": "https://doi.org/10.1080/10673220490447218", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Alba2022DBT", "text": "Alba MC, Bailey KT, Coniglio KA, Finkelstein J, Rizvi SL. Risk management in dialectical behavior therapy: Treating life-threatening behaviors as problems to be solved. Psychotherapy (Chic). 2022;59(2):163-167. PMID 35025564; doi:10.1037/pst0000376.", "link": "https://doi.org/10.1037/pst0000376", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "AlvarezTomas2019Meta", "text": "Álvarez-Tomás I, Ruiz J, Guilera G, Bados A. Long-term clinical and functional course of borderline personality disorder: A meta-analysis of prospective studies. Eur Psychiatry. 2019;56:75-83. PMID 30599336; doi:10.1016/j.eurpsy.2018.10.010.", "link": "https://doi.org/10.1016/j.eurpsy.2018.10.010", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "AlvarezTomas2024Health", "text": "Álvarez-Tomás I, Soler J, Schmidt C, Pascual JC. Physical health, primary care utilization and long-term quality of life in borderline personality disorder: A 10-year follow-up study in a Spanish sample. J Psychosom Res. 2024;179:111623. PMID 38422718; doi:10.1016/j.jpsychores.2024.111623.", "link": "https://doi.org/10.1016/j.jpsychores.2024.111623", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Amad2014", "text": "Amad A, Ramoz N, Thomas P, Jardri R, Gorwood P. Genetics of borderline personality disorder: systematic review and proposal of an integrative model. Neurosci Biobehav Rev. 2014;40:6-19. PMID 24456942; doi:10.1016/j.neubiorev.2014.01.003.", "link": "https://doi.org/10.1016/j.neubiorev.2014.01.003", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Anderson2015", "text": "Anderson JL, Sellbom M. Construct Validity of the DSM-5 Section III Personality Trait Profile for Borderline Personality Disorder. J Pers Assess. 2015;97(5):478-86. PMID 26061018; doi:10.1080/00223891.2015.1051226.", "link": "https://doi.org/10.1080/00223891.2015.1051226", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Andre2015", "text": "André JA, Verschuere B, Lobbestael J. Diagnostic value of the Dutch version of the McLean Screening Instrument for BPD (MSI-BPD). J Pers Disord. 2015;29(1):71-8. PMID 24932872; doi:10.1521/pedi_2014_28_148.", "link": "https://doi.org/10.1521/pedi_2014_28_148", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "APA2013", "text": "American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition (DSM-5). Arlington, VA: American Psychiatric Association; 2013. doi:10.1176/appi.books.9780890425596.", "link": "https://doi.org/10.1176/appi.books.9780890425596", "areas": ["A"], "unverified": false, "validated": "Crossref"}, {"key": "APA2022", "text": "American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR). Washington, DC: American Psychiatric Association Publishing; 2022. doi:10.1176/appi.books.9780890425787.", "link": "https://doi.org/10.1176/appi.books.9780890425787", "areas": ["A", "C", "D"], "unverified": false, "validated": "Crossref"}, {"key": "APA2024Guideline", "text": "Keepers GA, Fochtmann LJ, Anzia JM, Benjamin S, Lyness JM, Mojtabai R, et al. The American Psychiatric Association Practice Guideline for the Treatment of Patients With Borderline Personality Disorder. Am J Psychiatry. 2024;181(11):1024-1028. PMID 39482953; doi:10.1176/appi.ajp.24181010.", "link": "https://doi.org/10.1176/appi.ajp.24181010", "areas": ["A", "E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Arens2013", "text": "Arens EA, Stopsack M, Spitzer C, Appel K, Dudeck M, Völzke H, et al. Borderline personality disorder in four different age groups: a cross-sectional study of community residents in Germany. J Pers Disord. 2013;27(2):196-207. PMID 23514183; doi:10.1521/pedi.2013.27.2.196.", "link": "https://doi.org/10.1521/pedi.2013.27.2.196", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Arntz2005Modes", "text": "Arntz A, Klokman J, Sieswerda S. An experimental test of the schema mode model of borderline personality disorder. J Behav Ther Exp Psychiatry. 2005;36(3):226-239. PMID 16004961; doi:10.1016/j.jbtep.2005.05.005.", "link": "https://doi.org/10.1016/j.jbtep.2005.05.005", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Arntz2022GST", "text": "Arntz A, Jacob GA, Lee CW, Brand-de Wilde OM, Fassbinder E, Harper RP, et al. Effectiveness of Predominantly Group Schema Therapy and Combined Individual and Group Schema Therapy for Borderline Personality Disorder: A Randomized Clinical Trial. JAMA Psychiatry. 2022;79(4):287-299. PMID 35234828; PMCID PMC8892362; doi:10.1001/jamapsychiatry.2022.0010.", "link": "https://doi.org/10.1001/jamapsychiatry.2022.0010", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Arntz2023Dropout", "text": "Arntz A, Mensink K, Cox WR, Verhoef REJ, van Emmerik AAP, Rameckers SA, et al. Dropout from psychological treatment for borderline personality disorder: a multilevel survival meta-analysis. Psychol Med. 2023;53(3):668-686. PMID 36453183; PMCID PMC9975988; doi:10.1017/s0033291722003634.", "link": "https://doi.org/10.1017/s0033291722003634", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Assmann2025", "text": "Assmann N, Jacob G, Schaich A, Berger T, Zindler T, Betz L, et al. A digital therapeutic for people with borderline personality disorder in Germany (EPADIP-BPD): a pragmatic, assessor-blind, parallel-group, randomised controlled trial. Lancet Psychiatry. 2025;12(5):366-376. PMID 40245074; doi:10.1016/s2215-0366(25)00063-x.", "link": "https://doi.org/10.1016/s2215-0366(25)00063-x", "areas": ["E", "G"], "unverified": false, "validated": "Europe PMC", "aliases": ["Assmann2025priovi"]}, {"key": "Aviram2006", "text": "Aviram RB, Brodsky BS, Stanley B. Borderline personality disorder, stigma, and treatment implications. Harv Rev Psychiatry. 2006;14(5):249-56. PMID 16990170; doi:10.1080/10673220600975121.", "link": "https://doi.org/10.1080/10673220600975121", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Bach2017", "text": "Bach B, Sellbom M, Kongerslev M, Simonsen E, Krueger RF, Mulder R. Deriving ICD-11 personality disorder domains from dsm-5 traits: initial attempt to harmonize two diagnostic systems. Acta Psychiatr Scand. 2017;136(1):108-117. PMID 28504853; doi:10.1111/acps.12748.", "link": "https://doi.org/10.1111/acps.12748", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bach2018ANZJP", "text": "Bach B, Sellbom M, Skjernov M, Simonsen E. ICD-11 and DSM-5 personality trait domains capture categorical personality disorders: Finding a common ground. Aust N Z J Psychiatry. 2018;52(5):425-434. PMID 28835108; doi:10.1177/0004867417727867.", "link": "https://doi.org/10.1177/0004867417727867", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bach2018BMC", "text": "Bach B, First MB. Application of the ICD-11 classification of personality disorders. BMC Psychiatry. 2018;18(1):351. PMID 30373564; PMCID PMC6206910; doi:10.1186/s12888-018-1908-3.", "link": "https://doi.org/10.1186/s12888-018-1908-3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Back2022Oxytocin", "text": "Back SN, Schmitz M, Koenig J, Zettl M, Kleindienst N, Herpertz SC, et al. Reduced vagal activity in borderline personality disorder is unaffected by intranasal oxytocin administration, but predicted by the interaction between childhood trauma and attachment insecurity. J Neural Transm (Vienna). 2022;129(4):409-419. PMID 35275249; PMCID PMC9007810; doi:10.1007/s00702-022-02482-9.", "link": "https://doi.org/10.1007/s00702-022-02482-9", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bailey2013", "text": "Bailey RC, Grenyer BF. Burden and support needs of carers of persons with borderline personality disorder: a systematic review. Harv Rev Psychiatry. 2013;21(5):248-58. PMID 24651557; doi:10.1097/HRP.0b013e3182a75c2c.", "link": "https://doi.org/10.1097/hrp.0b013e3182a75c2c", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bailey2014", "text": "Bailey RC, Grenyer BF. Supporting a person with personality disorder: a study of carer burden and well-being. J Pers Disord. 2014;28(6):796-809. PMID 24689763; doi:10.1521/pedi_2014_28_136.", "link": "https://doi.org/10.1521/pedi_2014_28_136", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bailey2015", "text": "Bailey RC, Grenyer BF. The relationship between expressed emotion and wellbeing for families and carers of a relative with Borderline Personality Disorder. Personal Ment Health. 2015;9(1):21-32. PMID 25195577; doi:10.1002/pmh.1273.", "link": "https://doi.org/10.1002/pmh.1273", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Baker2015", "text": "Baker GA, Bromley RL, Briggs M, Cheyne CP, Cohen MJ, García-Fiñana M, et al. IQ at 6 years after in utero exposure to antiepileptic drugs: a controlled cohort study. Neurology. 2015;84(4):382-90. PMID 25540307; PMCID PMC4336006; doi:10.1212/WNL.0000000000001182.", "link": "https://doi.org/10.1212/wnl.0000000000001182", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "BallLinks2009", "text": "Ball JS, Links PS. Borderline personality disorder and childhood trauma: evidence for a causal relationship. Curr Psychiatry Rep. 2009;11(1):63-8. PMID 19187711; doi:10.1007/s11920-009-0010-4.", "link": "https://doi.org/10.1007/s11920-009-0010-4", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bandelow2010", "text": "Bandelow B, Schmahl C, Falkai P, Wedekind D. Borderline personality disorder: a dysregulation of the endogenous opioid system? Psychol Rev. 2010;117(2):623-36. PMID 20438240; doi:10.1037/a0018095.", "link": "https://doi.org/10.1037/a0018095", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Barnicot2026", "text": "Barnicot K, Thompson E, Turner S, Mandy W, McCabe R, Stark E, et al. Overlapping And Differentiating Clinical Features of Autism and Borderline Personality Disorder in Women and People Assigned Female at Birth: A Cross-Sectional Study. Autism. 2026;30(5):1292-1304. PMID 41928549; PMCID PMC13087160; doi:10.1177/13623613261431309.", "link": "https://doi.org/10.1177/13623613261431309", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Barr2020", "text": "Barr KR, Townsend ML, Grenyer BFS. Using peer workers with lived experience to support the treatment of borderline personality disorder: a qualitative study of consumer, carer and clinician perspectives. Borderline Personal Disord Emot Dysregul. 2020;7:20. PMID 32884819; PMCID PMC7465429; doi:10.1186/s40479-020-00135-5.", "link": "https://doi.org/10.1186/s40479-020-00135-5", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bartsch2026Peer", "text": "Bartsch DR, Giles JA, Tomlinson NJ, Cooke-O'connor L. Effectiveness of a co-produced peer group for borderline personality disorder: connection and recovery. J Ment Health. 2026:1-11 (online ahead of print). PMID 42172009; doi:10.1080/09638237.2026.2672345.", "link": "https://doi.org/10.1080/09638237.2026.2672345", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bartz2011Oxytocin", "text": "Bartz J, Simeon D, Hamilton H, Kim S, Crystal S, Braun A, et al. Oxytocin can hinder trust and cooperation in borderline personality disorder. Soc Cogn Affect Neurosci. 2011;6(5):556-563. PMID 21115541; PMCID PMC3190211; doi:10.1093/scan/nsq085.", "link": "https://doi.org/10.1093/scan/nsq085", "areas": ["G", "C"], "unverified": false, "validated": "Europe PMC", "aliases": ["Bartz2011"]}, {"key": "BassirNia2018", "text": "Bassir Nia A, Eveleth MC, Gabbay JM, Hassan YJ, Zhang B, Perez-Rodriguez MM. Past, present, and future of genetic research in borderline personality disorder. Curr Opin Psychol. 2018;21:60-68. PMID 29032046; PMCID PMC5847441; doi:10.1016/j.copsyc.2017.09.002.", "link": "https://doi.org/10.1016/j.copsyc.2017.09.002", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bateman1999", "text": "Bateman A, Fonagy P. Effectiveness of partial hospitalization in the treatment of borderline personality disorder: a randomized controlled trial. Am J Psychiatry. 1999;156(10):1563-9. PMID 10518167; doi:10.1176/ajp.156.10.1563.", "link": "https://doi.org/10.1176/ajp.156.10.1563", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Bateman2001", "text": "Bateman A, Fonagy P. Treatment of borderline personality disorder with psychoanalytically oriented partial hospitalization: an 18-month follow-up. Am J Psychiatry. 2001;158(1):36-42. PMID 11136631; doi:10.1176/appi.ajp.158.1.36.", "link": "https://doi.org/10.1176/appi.ajp.158.1.36", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Bateman2008", "text": "Bateman A, Fonagy P. 8-year follow-up of patients treated for borderline personality disorder: mentalization-based treatment versus treatment as usual. Am J Psychiatry. 2008;165(5):631-638. PMID 18347003; doi:10.1176/appi.ajp.2007.07040636.", "link": "https://doi.org/10.1176/appi.ajp.2007.07040636", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bateman2009", "text": "Bateman A, Fonagy P. Randomized controlled trial of outpatient mentalization-based treatment versus structured clinical management for borderline personality disorder. Am J Psychiatry. 2009;166(12):1355-1364. PMID 19833787; doi:10.1176/appi.ajp.2009.09040539.", "link": "https://doi.org/10.1176/appi.ajp.2009.09040539", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Bateman2010WP", "text": "Bateman A, Fonagy P. Mentalization based treatment for borderline personality disorder. World Psychiatry. 2010;9(1):11-15. PMID 20148147; PMCID PMC2816926; doi:10.1002/j.2051-5545.2010.tb00255.x.", "link": "https://doi.org/10.1002/j.2051-5545.2010.tb00255.x", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bateman2015Lancet", "text": "Bateman AW, Gunderson J, Mulder R. Treatment of personality disorder. Lancet. 2015;385(9969):735-43. PMID 25706219; doi:10.1016/S0140-6736(14)61394-5.", "link": "https://doi.org/10.1016/s0140-6736(14)61394-5", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Bateman2021", "text": "Bateman A, Constantinou MP, Fonagy P, Holzer S. Eight-year prospective follow-up of mentalization-based treatment versus structured clinical management for people with borderline personality disorder. Personal Disord. 2021;12(4):291-299. PMID 32584091; doi:10.1037/per0000422.", "link": "https://doi.org/10.1037/per0000422", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Battino2024EURAP", "text": "Battino D, Tomson T, Bonizzoni E, Craig J, Perucca E, Sabers A, et al. Risk of Major Congenital Malformations and Exposure to Antiseizure Medication Monotherapy. JAMA Neurol. 2024;81(5):481-489. PMID 38497990; PMCID PMC10949148; doi:10.1001/jamaneurol.2024.0258.", "link": "https://doi.org/10.1001/jamaneurol.2024.0258", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Bayes2016", "text": "Bayes AJ, McClure G, Fletcher K, Román Ruiz Del Moral YE, Hadzi-Pavlovic D, Stevenson JL, et al. Differentiating the bipolar disorders from borderline personality disorder. Acta Psychiatr Scand. 2016;133(3):187-95. PMID 26432099; doi:10.1111/acps.12509.", "link": "https://doi.org/10.1111/acps.12509", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bayes2019", "text": "Bayes A, Parker G, Paris J. Differential Diagnosis of Bipolar II Disorder and Borderline Personality Disorder. Curr Psychiatry Rep. 2019;21(12):125. PMID 31749106; doi:10.1007/s11920-019-1120-2.", "link": "https://doi.org/10.1007/s11920-019-1120-2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bayes2020", "text": "Bayes AJ, Parker GB. Differentiating borderline personality disorder (BPD) from bipolar disorder: diagnostic efficiency of DSM BPD criteria. Acta Psychiatr Scand. 2020;141(2):142-148. PMID 31758547; doi:10.1111/acps.13133.", "link": "https://doi.org/10.1111/acps.13133", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Beatson2016", "text": "Beatson J, Broadbear JH, Sivakumaran H, George K, Kotler E, Moss F, et al. Missed diagnosis: The emerging crisis of borderline personality disorder in older people. Aust N Z J Psychiatry. 2016;50(12):1139-1145. PMID 27056175; doi:10.1177/0004867416640100.", "link": "https://doi.org/10.1177/0004867416640100", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Beck2020MBTG", "text": "Beck E, Bo S, Jørgensen MS, Gondan M, Poulsen S, Storebø OJ, et al. Mentalization-based treatment in groups for adolescents with borderline personality disorder: a randomized controlled trial. J Child Psychol Psychiatry. 2020;61(5):594-604. PMID 31702058; doi:10.1111/jcpp.13152.", "link": "https://doi.org/10.1111/jcpp.13152", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Becker2002", "text": "Becker DF, Grilo CM, Edell WS, McGlashan TH. Diagnostic efficiency of borderline personality disorder criteria in hospitalized adolescents: comparison with hospitalized adults. Am J Psychiatry. 2002;159(12):2042-7. PMID 12450954; doi:10.1176/appi.ajp.159.12.2042.", "link": "https://doi.org/10.1176/appi.ajp.159.12.2042", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Belsky2012", "text": "Belsky DW, Caspi A, Arseneault L, Bleidorn W, Fonagy P, Goodman M, et al. Etiological features of borderline personality related characteristics in a birth cohort of 12-year-old children. Dev Psychopathol. 2012;24(1):251-65. PMID 22293008; PMCID PMC3547630; doi:10.1017/S0954579411000812.", "link": "https://doi.org/10.1017/s0954579411000812", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bertsch2013HormBehav", "text": "Bertsch K, Schmidinger I, Neumann ID, Herpertz SC. Reduced plasma oxytocin levels in female patients with borderline personality disorder. Horm Behav. 2013;63(3):424-9. PMID 23201337; doi:10.1016/j.yhbeh.2012.11.013.", "link": "https://doi.org/10.1016/j.yhbeh.2012.11.013", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bertsch2013Oxytocin", "text": "Bertsch K, Gamer M, Schmidt B, Schmidinger I, Walther S, Kästel T, et al. Oxytocin and reduction of social threat hypersensitivity in women with borderline personality disorder. Am J Psychiatry. 2013;170(10):1169-1177. PMID 23982273; doi:10.1176/appi.ajp.2013.13020263.", "link": "https://doi.org/10.1176/appi.ajp.2013.13020263", "areas": ["G", "C"], "unverified": false, "validated": "Europe PMC", "aliases": ["Bertsch2013AJP"]}, {"key": "Betts2023", "text": "Betts JK, Seigerman MR, Hulbert C, McKechnie B, Rayner VK, Jovev M, et al. A randomised controlled trial of a psychoeducational group intervention for family and friends of young people with borderline personality disorder features. Aust N Z J Psychiatry. 2023;57(11):1453-1464. PMID 37170885; PMCID PMC10619189; doi:10.1177/00048674231172108.", "link": "https://doi.org/10.1177/00048674231172108", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Biskin2015Course", "text": "Biskin RS. The Lifetime Course of Borderline Personality Disorder. Can J Psychiatry. 2015;60(7):303-308. PMID 26175388; PMCID PMC4500179; doi:10.1177/070674371506000702.", "link": "https://doi.org/10.1177/070674371506000702", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Biskin2021NSSI", "text": "Biskin RS, Paris J, Zelkowitz P, Mills D, Laporte L, Heath N. Nonsuicidal Self-Injury in Early Adolescence as a Predictor of Borderline Personality Disorder in Early Adulthood. J Pers Disord. 2021;35(5):764-775. PMID 33779286; doi:10.1521/pedi_2020_34_500.", "link": "https://doi.org/10.1521/pedi_2020_34_500", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bjork2022", "text": "Bjørk MH, Zoega H, Leinonen MK, Cohen JM, Dreier JW, Furu K, et al. Association of Prenatal Exposure to Antiseizure Medication With Risk of Autism and Intellectual Disability. JAMA Neurol. 2022;79(7):672-681. PMID 35639399; doi:10.1001/jamaneurol.2022.1269.", "link": "https://doi.org/10.1001/jamaneurol.2022.1269", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Black2004Suicide", "text": "Black DW, Blum N, Pfohl B, Hale N. Suicidal behavior in borderline personality disorder: prevalence, risk factors, prediction, and prevention. J Pers Disord. 2004;18(3):226-39. PMID 15237043; doi:10.1521/pedi.18.3.226.35445.", "link": "https://doi.org/10.1521/pedi.18.3.226.35445", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Black2011Attitudes", "text": "Black DW, Pfohl B, Blum N, McCormick B, Allen J, North CS, et al. Attitudes toward borderline personality disorder: a survey of 706 mental health clinicians. CNS Spectr. 2011;16(3):67-74. PMID 24725357; doi:10.1017/S109285291200020X.", "link": "https://doi.org/10.1017/s109285291200020x", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Black2014Quetiapine", "text": "Black DW, Zanarini MC, Romine A, Shaw M, Allen J, Schulz SC. Comparison of low and moderate dosages of extended-release quetiapine in borderline personality disorder: a randomized, double-blind, placebo-controlled trial. Am J Psychiatry. 2014;171(11):1174-82. PMID 24968985; doi:10.1176/appi.ajp.2014.13101348.", "link": "https://doi.org/10.1176/appi.ajp.2014.13101348", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "BlancoMachinea2026", "text": "Blanco Machinea J, Grandjean L, Beuchat H, Kolly S, Conus P, de Roten Y, et al. Follow-up effects of a brief Good Psychiatric Management treatment for borderline personality disorder. Borderline Personal Disord Emot Dysregul. 2026;13(1):34. PMID 42458542; PMCID PMC13651128; doi:10.1186/s40479-026-00357-z.", "link": "https://doi.org/10.1186/s40479-026-00357-z", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Blankley2015", "text": "Blankley G, Galbally M, Snellen M, Power J, Lewis AJ. Borderline Personality Disorder in the perinatal period: early infant and maternal outcomes. Australas Psychiatry. 2015;23(6):688-92. PMID 26133812; doi:10.1177/1039856215590254.", "link": "https://doi.org/10.1177/1039856215590254", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Blum2008STEPPS", "text": "Blum N, St John D, Pfohl B, Stuart S, McCormick B, Allen J, et al. Systems Training for Emotional Predictability and Problem Solving (STEPPS) for outpatients with borderline personality disorder: a randomized controlled trial and 1-year follow-up. Am J Psychiatry. 2008;165(4):468-478. PMID 18281407; PMCID PMC3608469; doi:10.1176/appi.ajp.2007.07071079.", "link": "https://doi.org/10.1176/appi.ajp.2007.07071079", "areas": ["E", "H"], "unverified": false, "validated": "Europe PMC", "aliases": ["Blum2008"]}, {"key": "Bodner2011", "text": "Bodner E, Cohen-Fridel S, Iancu I. Staff attitudes toward patients with borderline personality disorder. Compr Psychiatry. 2011;52(5):548-55. PMID 21130423; doi:10.1016/j.comppsych.2010.10.004.", "link": "https://doi.org/10.1016/j.comppsych.2010.10.004", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bodner2015", "text": "Bodner E, Cohen-Fridel S, Mashiah M, Segal M, Grinshpoon A, Fischel T, et al. The attitudes of psychiatric hospital staff toward hospitalization and treatment of patients with borderline personality disorder. BMC Psychiatry. 2015;15:2. PMID 25609479; PMCID PMC4307152; doi:10.1186/s12888-014-0380-y.", "link": "https://doi.org/10.1186/s12888-014-0380-y", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bohus2000Pain", "text": "Bohus M, Limberger M, Ebner U, Glocker FX, Schwarz B, Wernz M, et al. Pain perception during self-reported distress and calmness in patients with borderline personality disorder and self-mutilating behavior. Psychiatry Res. 2000;95(3):251-60. PMID 10974364; doi:10.1016/s0165-1781(00)00179-7.", "link": "https://doi.org/10.1016/s0165-1781(00)00179-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bohus2009", "text": "Bohus M, Kleindienst N, Limberger MF, Stieglitz RD, Domsalla M, Chapman AL, et al. The short version of the Borderline Symptom List (BSL-23): development and initial data on psychometric properties. Psychopathology. 2009;42(1):32-9. PMID 19023232; doi:10.1159/000173701.", "link": "https://doi.org/10.1159/000173701", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Bohus2020DBTPTSD", "text": "Bohus M, Kleindienst N, Hahn C, Müller-Engelmann M, Ludäscher P, Steil R, et al. Dialectical Behavior Therapy for Posttraumatic Stress Disorder (DBT-PTSD) Compared With Cognitive Processing Therapy (CPT) in Complex Presentations of PTSD in Women Survivors of Childhood Abuse: A Randomized Clinical Trial. JAMA Psychiatry. 2020;77(12):1235-1245. PMID 32697288; PMCID PMC7376475; doi:10.1001/jamapsychiatry.2020.2148.", "link": "https://doi.org/10.1001/jamapsychiatry.2020.2148", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bohus2021", "text": "Bohus M, Stoffers-Winterling J, Sharp C, Krause-Utz A, Schmahl C, Lieb K. Borderline personality disorder. Lancet. 2021;398(10310):1528-1540. PMID 34688371; doi:10.1016/S0140-6736(21)00476-1.", "link": "https://doi.org/10.1016/s0140-6736(21)00476-1", "areas": ["A", "B", "C", "D", "E", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Bora2021", "text": "Bora E. A meta-analysis of theory of mind and 'mentalization' in borderline personality disorder: a true neuro-social-cognitive or meta-social-cognitive impairment? Psychol Med. 2021;51(15):2541-2551. PMID 34530941; doi:10.1017/S0033291721003718.", "link": "https://doi.org/10.1017/s0033291721003718", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Border2019", "text": "Border R, Johnson EC, Evans LM, Smolen A, Berley N, Sullivan PF, et al. No Support for Historical Candidate Gene or Candidate Gene-by-Interaction Hypotheses for Major Depression Across Multiple Large Samples. Am J Psychiatry. 2019;176(5):376-387. PMID 30845820; PMCID PMC6548317; doi:10.1176/appi.ajp.2018.18070881.", "link": "https://doi.org/10.1176/appi.ajp.2018.18070881", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bornovalova2009", "text": "Bornovalova MA, Hicks BM, Iacono WG, McGue M. Stability, change, and heritability of borderline personality disorder traits from adolescence to adulthood: a longitudinal twin study. Dev Psychopathol. 2009;21(4):1335-53. PMID 19825271; PMCID PMC2789483; doi:10.1017/S0954579409990186.", "link": "https://doi.org/10.1017/s0954579409990186", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bornovalova2013", "text": "Bornovalova MA, Huibregtse BM, Hicks BM, Keyes M, McGue M, Iacono W. Tests of a direct effect of childhood abuse on adult borderline personality disorder traits: a longitudinal discordant twin design. J Abnorm Psychol. 2013;122(1):180-94. PMID 22686871; PMCID PMC3482426; doi:10.1037/a0028328.", "link": "https://doi.org/10.1037/a0028328", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Borschmann2013JCP", "text": "Borschmann R, Barrett B, Hellier JM, Byford S, Henderson C, Rose D, et al. Joint crisis plans for people with borderline personality disorder: feasibility and outcomes in a randomised controlled trial. Br J Psychiatry. 2013;202(5):357-64. PMID 23637110; doi:10.1192/bjp.bp.112.117762.", "link": "https://doi.org/10.1192/bjp.bp.112.117762", "areas": ["F", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Borschmann2013"]}, {"key": "Borschmann2014", "text": "Borschmann R, Trevillion K, Henderson RC, Rose D, Szmukler G, Moran P. Advance statements for borderline personality disorder: a qualitative study of future crisis treatment preferences. Psychiatr Serv. 2014;65(6):802-7. PMID 24585205; doi:10.1176/appi.ps.201300303.", "link": "https://doi.org/10.1176/appi.ps.201300303", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bortolla2020", "text": "Bortolla R, Cavicchioli M, Fossati A, Maffei C. Emotional Reactivity in Borderline Personality Disorder: Theoretical Considerations Based on a Meta-Analytic Review of Laboratory Studies. J Pers Disord. 2020;34(1):64-87. PMID 30355020; doi:10.1521/pedi_2018_32_382.", "link": "https://doi.org/10.1521/pedi_2018_32_382", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bos2010", "text": "Bos EH, van Wel EB, Appelo MT, Verbraak MJ. A randomized controlled trial of a Dutch version of systems training for emotional predictability and problem solving for borderline personality disorder. J Nerv Ment Dis. 2010;198(4):299-304. PMID 20386260; doi:10.1097/NMD.0b013e3181d619cf.", "link": "https://doi.org/10.1097/nmd.0b013e3181d619cf", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bouchard2009", "text": "Bouchard S, Sabourin S, Lussier Y, Villeneuve E. Relationship quality and stability in couples when one partner suffers from borderline personality disorder. J Marital Fam Ther. 2009;35(4):446-55. PMID 19785701; doi:10.1111/j.1752-0606.2009.00151.x.", "link": "https://doi.org/10.1111/j.1752-0606.2009.00151.x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bowers2015", "text": "Bowers L, James K, Quirk A, Simpson A, Stewart D, Hodsoll J. Reducing conflict and containment rates on acute psychiatric wards: The Safewards cluster randomised controlled trial. Int J Nurs Stud. 2015;52(9):1412-22. PMID 26166187; PMCID PMC4518134; doi:10.1016/j.ijnurstu.2015.05.001.", "link": "https://doi.org/10.1016/j.ijnurstu.2015.05.001", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Brickman2014", "text": "Brickman LJ, Ammerman BA, Look AE, Berman ME, McCloskey MS. The relationship between non-suicidal self-injury and borderline personality disorder symptoms in a college sample. Borderline Personal Disord Emot Dysregul. 2014;1:14. PMID 26401298; PMCID PMC4579519; doi:10.1186/2051-6673-1-14.", "link": "https://doi.org/10.1186/2051-6673-1-14", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Bridler2015", "text": "Bridler R, Häberle A, Müller ST, Cattapan K, Grohmann R, Toto S, et al. Psychopharmacological treatment of 2195 in-patients with borderline personality disorder: A comparison with other psychiatric disorders. Eur Neuropsychopharmacol. 2015;25(6):763-72. PMID 25907249; doi:10.1016/j.euroneuro.2015.03.017.", "link": "https://doi.org/10.1016/j.euroneuro.2015.03.017", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Brown2002", "text": "Brown MZ, Comtois KA, Linehan MM. Reasons for suicide attempts and nonsuicidal self-injury in women with borderline personality disorder. J Abnorm Psychol. 2002;111(1):198-202. PMID 11866174; doi:10.1037//0021-843x.111.1.198.", "link": "https://doi.org/10.1037//0021-843x.111.1.198", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bungert2015", "text": "Bungert M, Koppe G, Niedtfeld I, Vollstädt-Klein S, Schmahl C, Lis S, et al. Pain Processing after Social Exclusion and Its Relation to Rejection Sensitivity in Borderline Personality Disorder. PLoS One. 2015;10(8):e0133693. PMID 26241850; PMCID PMC4524681; doi:10.1371/journal.pone.0133693.", "link": "https://doi.org/10.1371/journal.pone.0133693", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Burke2019", "text": "Burke L, Kells M, Flynn D, Joyce M. Exploring staff perceptions of the utility of clinician connections when working with emotionally dysregulated clients. Borderline Personal Disord Emot Dysregul. 2019;6:12. PMID 31372226; PMCID PMC6660965; doi:10.1186/s40479-019-0109-0.", "link": "https://doi.org/10.1186/s40479-019-0109-0", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Button2013", "text": "Button KS, Ioannidis JP, Mokrysz C, Nosek BA, Flint J, Robinson ES, et al. Power failure: why small sample size undermines the reliability of neuroscience. Nat Rev Neurosci. 2013;14(5):365-76. PMID 23571845; doi:10.1038/nrn3475.", "link": "https://doi.org/10.1038/nrn3475", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Calati2013", "text": "Calati R, Gressier F, Balestri M, Serretti A. Genetic modulation of borderline personality disorder: systematic review and meta-analysis. J Psychiatr Res. 2013;47(10):1275-87. PMID 23810197; doi:10.1016/j.jpsychires.2013.06.002.", "link": "https://doi.org/10.1016/j.jpsychires.2013.06.002", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Carlson2009", "text": "Carlson EA, Egeland B, Sroufe LA. A prospective investigation of the development of borderline personality symptoms. Dev Psychopathol. 2009;21(4):1311-34. PMID 19825270; PMCID PMC11034778; doi:10.1017/S0954579409990174.", "link": "https://doi.org/10.1017/s0954579409990174", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Carpenter2013", "text": "Carpenter RW, Trull TJ. Components of emotion dysregulation in borderline personality disorder: a review. Curr Psychiatry Rep. 2013;15(1):335. PMID 23250816; PMCID PMC3973423; doi:10.1007/s11920-012-0335-2.", "link": "https://doi.org/10.1007/s11920-012-0335-2", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Carter2017PPV", "text": "Carter G, Milner A, McGill K, Pirkis J, Kapur N, Spittal MJ. Predicting suicidal behaviours using clinical instruments: systematic review and meta-analysis of positive predictive values for risk scales. Br J Psychiatry. 2017;210(6):387-395. PMID 28302700; doi:10.1192/bjp.bp.116.182717.", "link": "https://doi.org/10.1192/bjp.bp.116.182717", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Cavelti2021", "text": "Cavelti M, Lerch S, Ghinea D, Fischer-Waldschmidt G, Resch F, Koenig J, et al. Heterogeneity of borderline personality disorder symptoms in help-seeking adolescents. Borderline Personal Disord Emot Dysregul. 2021;8(1):9. PMID 33722308; PMCID PMC7958409; doi:10.1186/s40479-021-00147-9.", "link": "https://doi.org/10.1186/s40479-021-00147-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Cavelti2024Stepped", "text": "Cavelti M, Blaha Y, Lerch S, Hertel C, Berger T, Reichl C, et al. The evaluation of a stepped care approach for early intervention of borderline personality disorder. Borderline Personal Disord Emot Dysregul. 2024;11(1):12. PMID 38886843; PMCID PMC11184763; doi:10.1186/s40479-024-00256-1.", "link": "https://doi.org/10.1186/s40479-024-00256-1", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Chan2026", "text": "Nam Chan JK, Yin Li RC, Man Wong CS, Mahboobani VR, Ku KM, Chang WC. Association of Borderline Personality Disorder with Physical Diseases and Mortality: A 16-Year Population-Based Electronic Health-Record Cohort Study in Hong Kong. Psychother Psychosom. 2026 (online ahead of print):1-11. PMID 41843727; PMCID PMC13160504; doi:10.1159/000551534.", "link": "https://doi.org/10.1159/000551534", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Chanen2008", "text": "Chanen AM, Jovev M, Djaja D, McDougall E, Yuen HP, Rawlings D, et al. Screening for borderline personality disorder in outpatient youth. J Pers Disord. 2008;22(4):353-64. PMID 18684049; doi:10.1521/pedi.2008.22.4.353.", "link": "https://doi.org/10.1521/pedi.2008.22.4.353", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chanen2008HYPE", "text": "Chanen AM, Jackson HJ, McCutcheon LK, Jovev M, Dudgeon P, Yuen HP, et al. Early intervention for adolescents with borderline personality disorder using cognitive analytic therapy: randomised controlled trial. Br J Psychiatry. 2008;193(6):477-484. PMID 19043151; doi:10.1192/bjp.bp.107.048934.", "link": "https://doi.org/10.1192/bjp.bp.107.048934", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Chanen2013", "text": "Chanen AM, McCutcheon L. Prevention and early intervention for borderline personality disorder: current status and recent evidence. Br J Psychiatry Suppl. 2013;54:s24-9. PMID 23288497; doi:10.1192/bjp.bp.112.119180.", "link": "https://doi.org/10.1192/bjp.bp.112.119180", "areas": ["A", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Chanen2013Prevention"]}, {"key": "Chanen2017WP", "text": "Chanen A, Sharp C, Hoffman P; Global Alliance for Prevention and Early Intervention for Borderline Personality Disorder. Prevention and early intervention for borderline personality disorder: a novel public health priority. World Psychiatry. 2017;16(2):215-216. PMID 28498598; PMCID PMC5428197; doi:10.1002/wps.20429.", "link": "https://doi.org/10.1002/wps.20429", "areas": ["A", "D"], "unverified": false, "validated": "PubMed", "aliases": ["Chanen2017"]}, {"key": "Chanen2020INVEST", "text": "Chanen AM, Nicol K, Betts JK, Bond GR, Mihalopoulos C, Jackson HJ, et al. INdividual Vocational and Educational Support Trial (INVEST) for young people with borderline personality disorder: study protocol for a randomised controlled trial. Trials. 2020;21(1):583. PMID 32591007; PMCID PMC7320570; doi:10.1186/s13063-020-04471-3.", "link": "https://doi.org/10.1186/s13063-020-04471-3", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Chanen2020YoungPeople", "text": "Chanen AM, Nicol K, Betts JK, Thompson KN. Diagnosis and Treatment of Borderline Personality Disorder in Young People. Curr Psychiatry Rep. 2020;22(5):25. PMID 32335771; doi:10.1007/s11920-020-01144-5.", "link": "https://doi.org/10.1007/s11920-020-01144-5", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Chanen2022Age", "text": "Chanen AM, Betts JK, Jackson H, Cotton SM, Gleeson J, Davey CG, et al. A Comparison of Adolescent versus Young Adult Outpatients with First-Presentation Borderline Personality Disorder: Findings from the MOBY Randomized Controlled Trial. Can J Psychiatry. 2022;67(1):26-38. PMID 33576244; PMCID PMC8811246; doi:10.1177/0706743721992677.", "link": "https://doi.org/10.1177/0706743721992677", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Chanen2022MOBY", "text": "Chanen AM, Betts JK, Jackson H, Cotton SM, Gleeson J, Davey CG, et al. Effect of 3 Forms of Early Intervention for Young People With Borderline Personality Disorder: The MOBY Randomized Clinical Trial. JAMA Psychiatry. 2022;79(2):109-119. PMID 34910093; PMCID PMC8674805; doi:10.1001/jamapsychiatry.2021.3637.", "link": "https://doi.org/10.1001/jamapsychiatry.2021.3637", "areas": ["E", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Chapman2006", "text": "Chapman AL, Gratz KL, Brown MZ. Solving the puzzle of deliberate self-harm: the experiential avoidance model. Behav Res Ther. 2006;44(3):371-94. PMID 16446150; doi:10.1016/j.brat.2005.03.005.", "link": "https://doi.org/10.1016/j.brat.2005.03.005", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Chapman2006DBT", "text": "Chapman AL. Dialectical behavior therapy: current indications and unique elements. Psychiatry (Edgmont). 2006;3(9):62-68. PMID 20975829; PMCID PMC2963469.", "link": "https://pubmed.ncbi.nlm.nih.gov/20975829/", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "ChoiKain2010Interpersonal", "text": "Choi-Kain LW, Zanarini MC, Frankenburg FR, Fitzmaurice GM, Reich DB. A longitudinal study of the 10-year course of interpersonal features in borderline personality disorder. J Pers Disord. 2010;24(3):365-376. PMID 20545500; PMCID PMC3222950; doi:10.1521/pedi.2010.24.3.365.", "link": "https://doi.org/10.1521/pedi.2010.24.3.365", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "ChoiKain2017", "text": "Choi-Kain LW, Finch EF, Masland SR, Jenkins JA, Unruh BT. What Works in the Treatment of Borderline Personality Disorder. Curr Behav Neurosci Rep. 2017;4(1):21-30. PMID 28331780; PMCID PMC5340835; doi:10.1007/s40473-017-0103-z.", "link": "https://doi.org/10.1007/s40473-017-0103-z", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Chung2026", "text": "Chung YS, Shin H, Koo BH, Yun S, Oh UJ, Choi SW, et al. Mentalization as a mediator of the effects of early life stress on borderline personality disorder in a South Korean clinical sample. Borderline Personal Disord Emot Dysregul. 2026;13(1):11. PMID 41913301; PMCID PMC13159255; doi:10.1186/s40479-026-00338-2.", "link": "https://doi.org/10.1186/s40479-026-00338-2", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Cicchetti2014", "text": "Cicchetti D, Rogosch FA, Hecht KF, Crick NR, Hetzel S. Moderation of maltreatment effects on childhood borderline personality symptoms by gender and oxytocin receptor and FK506 binding protein 5 genes. Dev Psychopathol. 2014;26(3):831-49. PMID 25047302; PMCID PMC4123548; doi:10.1017/S095457941400042X.", "link": "https://doi.org/10.1017/s095457941400042x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Clarkin2007", "text": "Clarkin JF, Levy KN, Lenzenweger MF, Kernberg OF. Evaluating three treatments for borderline personality disorder: a multiwave study. Am J Psychiatry. 2007;164(6):922-928. PMID 17541052; doi:10.1176/ajp.2007.164.6.922.", "link": "https://doi.org/10.1176/ajp.2007.164.6.922", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Cloitre2014", "text": "Cloitre M, Garvert DW, Weiss B, Carlson EB, Bryant RA. Distinguishing PTSD, Complex PTSD, and Borderline Personality Disorder: A latent class analysis. Eur J Psychotraumatol. 2014;5. PMID 25279111; PMCID PMC4165723; doi:10.3402/ejpt.v5.25097.", "link": "https://doi.org/10.3402/ejpt.v5.25097", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Cohen2008", "text": "Cohen P, Chen H, Gordon K, Johnson J, Brook J, Kasen S. Socioeconomic background and the developmental course of schizotypal and borderline personality disorder symptoms. Dev Psychopathol. 2008;20(2):633-50. PMID 18423098; PMCID PMC3857688; doi:10.1017/S095457940800031X.", "link": "https://doi.org/10.1017/s095457940800031x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Coid2006", "text": "Coid J, Yang M, Tyrer P, Roberts A, Ullrich S. Prevalence and correlates of personality disorder in Great Britain. Br J Psychiatry. 2006;188:423-31. PMID 16648528; doi:10.1192/bjp.188.5.423.", "link": "https://doi.org/10.1192/bjp.188.5.423", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Collison2021", "text": "Collison KL, Lynam DR. Personality disorders as predictors of intimate partner violence: A meta-analysis. Clin Psychol Rev. 2021;88:102047. PMID 34130046; doi:10.1016/j.cpr.2021.102047.", "link": "https://doi.org/10.1016/j.cpr.2021.102047", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Crawford2018LABILE", "text": "Crawford MJ, Sanatinia R, Barrett B, Cunningham G, Dale O, Ganguli P, et al. The Clinical Effectiveness and Cost-Effectiveness of Lamotrigine in Borderline Personality Disorder: A Randomized Placebo-Controlled Trial. Am J Psychiatry. 2018;175(8):756-764. PMID 29621901; doi:10.1176/appi.ajp.2018.17091006.", "link": "https://doi.org/10.1176/appi.ajp.2018.17091006", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Crawford2022CALMED", "text": "Crawford MJ, Leeson VC, Evans R, Barrett B, McQuaid A, Cheshire J, et al. The clinical effectiveness and cost effectiveness of clozapine for inpatients with severe borderline personality disorder (CALMED study): a randomised placebo-controlled trial. Ther Adv Psychopharmacol. 2022;12:20451253221090832. PMID 35510087; PMCID PMC9058570; doi:10.1177/20451253221090832.", "link": "https://doi.org/10.1177/20451253221090832", "areas": ["F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Cristea2017", "text": "Cristea IA, Gentili C, Cotet CD, Palomba D, Barbui C, Cuijpers P. Efficacy of Psychotherapies for Borderline Personality Disorder: A Systematic Review and Meta-analysis. JAMA Psychiatry. 2017;74(4):319-328. PMID 28249086; doi:10.1001/jamapsychiatry.2016.4287.", "link": "https://doi.org/10.1001/jamapsychiatry.2016.4287", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Crowell2009", "text": "Crowell SE, Beauchaine TP, Linehan MM. A biosocial developmental model of borderline personality: Elaborating and extending Linehan's theory. Psychol Bull. 2009;135(3):495-510. PMID 19379027; PMCID PMC2696274; doi:10.1037/a0015616.", "link": "https://doi.org/10.1037/a0015616", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "DAgostino2019", "text": "D'Agostino A, Rossi Monti M, Starcevic V. Psychotic symptoms in borderline personality disorder: an update. Curr Opin Psychiatry. 2019;32(1):22-26. PMID 30169467; doi:10.1097/YCO.0000000000000462.", "link": "https://doi.org/10.1097/yco.0000000000000462", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Daros2013", "text": "Daros AR, Zakzanis KK, Ruocco AC. Facial emotion recognition in borderline personality disorder. Psychol Med. 2013;43(9):1953-63. PMID 23149223; doi:10.1017/S0033291712002607.", "link": "https://doi.org/10.1017/s0033291712002607", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Daukantaite2025", "text": "Daukantaitė D, Lindkvist RM, Lantto R, Westling S. Brief Admission by Self-Referral: A 4-Year Follow-Up on Utilisation Patterns and Experiences. Int J Ment Health Nurs. 2025;34(4):e70091. PMID 40635140; PMCID PMC12241490; doi:10.1111/inm.70091.", "link": "https://doi.org/10.1111/inm.70091", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dawidowski2025", "text": "Dawidowski B, Franczak Ł, Podwalski P, Michalczyk A, Łupkowska-Grygorcewicz A, Piotrowska O, et al. The Epigenetic Landscape of Borderline Personality Disorder: Insights from a Systematic Review. J Clin Med. 2025;14(22). PMID 41303216; PMCID PMC12653379; doi:10.3390/jcm14228182.", "link": "https://doi.org/10.3390/jcm14228182", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "DeCou2019", "text": "DeCou CR, Comtois KA, Landes SJ. Dialectical Behavior Therapy Is Effective for the Treatment of Suicidal Behavior: A Meta-Analysis. Behav Ther. 2019;50(1):60-72. PMID 30661567; doi:10.1016/j.beth.2018.03.009.", "link": "https://doi.org/10.1016/j.beth.2018.03.009", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dickens2016", "text": "Dickens GL, Lamont E, Gray S. Mental health nurses' attitudes, behaviour, experience and knowledge regarding adults with a diagnosis of borderline personality disorder: systematic, integrative literature review. J Clin Nurs. 2016;25(13-14):1848-75. PMID 27139693; doi:10.1111/jocn.13202.", "link": "https://doi.org/10.1111/jocn.13202", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Dickens2016Interventions", "text": "Dickens GL, Hallett N, Lamont E. Interventions to improve mental health nurses' skills, attitudes, and knowledge related to people with a diagnosis of borderline personality disorder: Systematic review. Int J Nurs Stud. 2016;56:114-27. PMID 26747180; doi:10.1016/j.ijnurstu.2015.10.019.", "link": "https://doi.org/10.1016/j.ijnurstu.2015.10.019", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dickens2018", "text": "Dickens GL, Lamont E, Stirling FJ. Student health professionals' attitudes and experience after watching \"Ida's Diary\", a first-person account of living with borderline personality disorder: Mixed methods study. Nurse Educ Today. 2018;65:128-135. PMID 29567593; doi:10.1016/j.nedt.2018.03.003.", "link": "https://doi.org/10.1016/j.nedt.2018.03.003", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dickens2019", "text": "Dickens GL, Lamont E, Mullen J, MacArthur N, Stirling FJ. Mixed-methods evaluation of an educational intervention to change mental health nurses' attitudes to people diagnosed with borderline personality disorder. J Clin Nurs. 2019;28(13-14):2613-2623. PMID 30830704; doi:10.1111/jocn.14847.", "link": "https://doi.org/10.1111/jocn.14847", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dickens2022", "text": "Dickens GL, Schoultz M, Hallett N. Mental health nurses' measured attitudes to people and practice: Systematic review of UK empirical research 2000-2019. J Psychiatr Ment Health Nurs. 2022;29(6):788-812. PMID 35147265; PMCID PMC9790366; doi:10.1111/jpm.12826.", "link": "https://doi.org/10.1111/jpm.12826", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "DiGiacomo2024Oxytocin", "text": "di Giacomo E, Andreini E, Santambrogio J, Arcara A, Clerici M. The interplay between borderline personality disorder and oxytocin: a systematic narrative review on possible contribution and treatment options. Front Psychiatry. 2024;15:1439615. PMID 39109363; PMCID PMC11300194; doi:10.3389/fpsyt.2024.1439615.", "link": "https://doi.org/10.3389/fpsyt.2024.1439615", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Distel2008", "text": "Distel MA, Trull TJ, Derom CA, Thiery EW, Grimmer MA, Martin NG, et al. Heritability of borderline personality disorder features is similar across three countries. Psychol Med. 2008;38(9):1219-29. PMID 17988414; doi:10.1017/S0033291707002024.", "link": "https://doi.org/10.1017/s0033291707002024", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Distel2009", "text": "Distel MA, Trull TJ, Willemsen G, Vink JM, Derom CA, Lynskey M, et al. The five-factor model of personality and borderline personality disorder: a genetic analysis of comorbidity. Biol Psychiatry. 2009;66(12):1131-8. PMID 19748081; doi:10.1016/j.biopsych.2009.07.017.", "link": "https://doi.org/10.1016/j.biopsych.2009.07.017", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Distel2010", "text": "Distel MA, Willemsen G, Ligthart L, Derom CA, Martin NG, Neale MC, et al. Genetic covariance structure of the four main features of borderline personality disorder. J Pers Disord. 2010;24(4):427-44. PMID 20695804; PMCID PMC3705216; doi:10.1521/pedi.2010.24.4.427.", "link": "https://doi.org/10.1521/pedi.2010.24.4.427", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Distel2011ADHD", "text": "Distel MA, Carlier A, Middeldorp CM, Derom CA, Lubke GH, Boomsma DI. Borderline personality traits and adult attention-deficit hyperactivity disorder symptoms: a genetic analysis of comorbidity. Am J Med Genet B Neuropsychiatr Genet. 2011;156B(7):817-25. PMID 21812103; PMCID PMC3990457; doi:10.1002/ajmg.b.31226.", "link": "https://doi.org/10.1002/ajmg.b.31226", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Distel2011LifeEvents", "text": "Distel MA, Middeldorp CM, Trull TJ, Derom CA, Willemsen G, Boomsma DI. Life events and borderline personality features: the influence of gene-environment interaction and gene-environment correlation. Psychol Med. 2011;41(4):849-60. PMID 20594379; doi:10.1017/S0033291710001297.", "link": "https://doi.org/10.1017/s0033291710001297", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ditrich2021", "text": "Ditrich I, Philipsen A, Matthies S. Borderline personality disorder (BPD) and attention deficit hyperactivity disorder (ADHD) revisited - a review-update on common grounds and subtle distinctions. Borderline Personal Disord Emot Dysregul. 2021;8(1):22. PMID 34229766; PMCID PMC8261991; doi:10.1186/s40479-021-00162-w.", "link": "https://doi.org/10.1186/s40479-021-00162-w", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Doering2010", "text": "Doering S, Hörz S, Rentrop M, Fischer-Kern M, Schuster P, Benecke C, et al. Transference-focused psychotherapy v. treatment by community psychotherapists for borderline personality disorder: randomised controlled trial. Br J Psychiatry. 2010;196(5):389-395. PMID 20435966; doi:10.1192/bjp.bp.109.070177.", "link": "https://doi.org/10.1192/bjp.bp.109.070177", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Domes2019Oxytocin", "text": "Domes G, Ower N, von Dawans B, Spengler FB, Dziobek I, Bohus M, et al. Effects of intranasal oxytocin administration on empathy and approach motivation in women with borderline personality disorder: a randomized controlled trial. Transl Psychiatry. 2019;9(1):328. PMID 31801937; PMCID PMC6892895; doi:10.1038/s41398-019-0658-4.", "link": "https://doi.org/10.1038/s41398-019-0658-4", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Domsalla2014", "text": "Domsalla M, Koppe G, Niedtfeld I, Vollstädt-Klein S, Schmahl C, Bohus M, et al. Cerebral processing of social rejection in patients with borderline personality disorder. Soc Cogn Affect Neurosci. 2014;9(11):1789-97. PMID 24273076; PMCID PMC4221221; doi:10.1093/scan/nst176.", "link": "https://doi.org/10.1093/scan/nst176", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Donegan2003", "text": "Donegan NH, Sanislow CA, Blumberg HP, Fulbright RK, Lacadie C, Skudlarski P, et al. Amygdala hyperreactivity in borderline personality disorder: implications for emotional dysregulation. Biol Psychiatry. 2003;54(11):1284-93. PMID 14643096; doi:10.1016/s0006-3223(03)00636-x.", "link": "https://doi.org/10.1016/s0006-3223(03)00636-x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Drews2019", "text": "Drews E, Fertuck EA, Koenig J, Kaess M, Arntz A. Hypothalamic-pituitary-adrenal axis functioning in borderline personality disorder: A meta-analysis. Neurosci Biobehav Rev. 2019;96:316-334. PMID 30500331; doi:10.1016/j.neubiorev.2018.11.008.", "link": "https://doi.org/10.1016/j.neubiorev.2018.11.008", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Dudas2017", "text": "Dudas RB, Lovejoy C, Cassidy S, Allison C, Smith P, Baron-Cohen S. The overlap between autistic spectrum conditions and borderline personality disorder. PLoS One. 2017;12(9):e0184447. PMID 28886113; PMCID PMC5590952; doi:10.1371/journal.pone.0184447.", "link": "https://doi.org/10.1371/journal.pone.0184447", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dufour2025", "text": "Dufour AS, Nadeau L, Cailhol L. Is peer support beneficial for individuals with borderline personality disorder? Exploring its potential and challenges - a scoping review. Front Psychiatry. 2025;16:1663685. PMID 41210132; PMCID PMC12590239; doi:10.3389/fpsyt.2025.1663685.", "link": "https://doi.org/10.3389/fpsyt.2025.1663685", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dwyer2025BI1358894", "text": "Dwyer JB, Schmahl C, Makinodan M, Fineberg SK, Sommer S, Wruck J, et al. Efficacy and Safety of BI 1358894 in Patients With Borderline Personality Disorder: Results of a Phase 2 Randomized, Placebo-Controlled, Parallel Group Dose-Ranging Trial. J Clin Psychiatry. 2025;86(1). PMID 39832346; doi:10.4088/JCP.24m15523.", "link": "https://doi.org/10.4088/jcp.24m15523", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "EbnerPriemer2007PsychiatryRes", "text": "Ebner-Priemer UW, Welch SS, Grossman P, Reisch T, Linehan MM, Bohus M. Psychophysiological ambulatory assessment of affective dysregulation in borderline personality disorder. Psychiatry Res. 2007;150(3):265-75. PMID 17321599; doi:10.1016/j.psychres.2006.04.014.", "link": "https://doi.org/10.1016/j.psychres.2006.04.014", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "EbnerPriemer2007PsycholMed", "text": "Ebner-Priemer UW, Kuo J, Kleindienst N, Welch SS, Reisch T, Reinhard I, et al. State affective instability in borderline personality disorder assessed by ambulatory monitoring. Psychol Med. 2007;37(7):961-70. PMID 17202005; doi:10.1017/S0033291706009706.", "link": "https://doi.org/10.1017/s0033291706009706", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "EbnerPriemer2008", "text": "Ebner-Priemer UW, Kuo J, Schlotz W, Kleindienst N, Rosenthal MZ, Detterer L, et al. Distress and affective dysregulation in patients with borderline personality disorder: a psychophysiological ambulatory monitoring study. J Nerv Ment Dis. 2008;196(4):314-20. PMID 18414126; doi:10.1097/NMD.0b013e31816a493f.", "link": "https://doi.org/10.1097/nmd.0b013e31816a493f", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "EbnerPriemer2015", "text": "Ebner-Priemer UW, Houben M, Santangelo P, Kleindienst N, Tuerlinckx F, Oravecz Z, et al. Unraveling affective dysregulation in borderline personality disorder: a theoretical model and empirical evidence. J Abnorm Psychol. 2015;124(1):186-98. PMID 25603359; doi:10.1037/abn0000021.", "link": "https://doi.org/10.1037/abn0000021", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "ElGabalawy2010", "text": "El-Gabalawy R, Katz LY, Sareen J. Comorbidity and associated severity of borderline personality disorder and physical health conditions in a nationally representative sample. Psychosom Med. 2010;72(7):641-7. PMID 20508177; doi:10.1097/PSY.0b013e3181e10c7b.", "link": "https://doi.org/10.1097/psy.0b013e3181e10c7b", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Ellison2016", "text": "Ellison WD, Rosenstein L, Chelminski I, Dalrymple K, Zimmerman M. The Clinical Significance of Single Features of Borderline Personality Disorder: Anger, Affective Instability, Impulsivity, and Chronic Emptiness in Psychiatric Outpatients. J Pers Disord. 2016;30(2):261-70. PMID 25893552; doi:10.1521/pedi_2015_29_193.", "link": "https://doi.org/10.1521/pedi_2015_29_193", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ellison2018", "text": "Ellison WD, Rosenstein LK, Morgan TA, Zimmerman M. Community and Clinical Epidemiology of Borderline Personality Disorder. Psychiatr Clin North Am. 2018;41(4):561-573. PMID 30447724; doi:10.1016/j.psc.2018.07.008.", "link": "https://doi.org/10.1016/j.psc.2018.07.008", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Evoy2026", "text": "Evoy G, Poirier S, Vadnais M, Hudon A. Content, Engagement, and Information Quality of Borderline Personality Disorder Videos on TikTok: Mixed Methods Analysis. JMIR Form Res. 2026;10:e106246. PMID 42902775; PMCID PMC13683317; doi:10.2196/106246.", "link": "https://doi.org/10.2196/106246", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Eyden2016", "text": "Eyden J, Winsper C, Wolke D, Broome MR, MacCallum F. A systematic review of the parenting and outcomes experienced by offspring of mothers with borderline personality pathology: Potential mechanisms and clinical implications. Clin Psychol Rev. 2016;47:85-105. PMID 27261413; doi:10.1016/j.cpr.2016.04.002.", "link": "https://doi.org/10.1016/j.cpr.2016.04.002", "areas": ["B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "FDA-Clozaril", "text": "HLS Therapeutics. CLOZARIL (clozapine) tablets, US prescribing information, effective 2025-06-06, set id 90876802-0e3a-44c9-9ff7-1754dfbe736a (boxed warning and section 1 read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Depakote", "text": "AbbVie. DEPAKOTE (divalproex sodium) delayed-release tablets, US prescribing information, effective 2026-03-31, set id 08a65cf4-7749-4ceb-6895-8f4805e2b01f (boxed warning and section 1 read). https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22Depakote%22", "link": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22Depakote%22", "areas": ["F", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-LabelSearch2026", "text": "US Food and Drug Administration. openFDA drug label endpoint, query indications_and_usage:\"borderline personality\" (returned \"No matches found\" on 2026-10-25). https://api.fda.gov/drug/label.json?search=indications_and_usage:%22borderline+personality%22", "link": "https://api.fda.gov/drug/label.json?search=indications_and_usage:%22borderline+personality%22", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Lamictal", "text": "GlaxoSmithKline. LAMICTAL and LAMICTAL ODT (lamotrigine), US prescribing information, effective 2025-10-10, set id d7e3572d-56fe-4727-2bb4-013ccca22678 (boxed warning read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Lithobid", "text": "ANI Pharmaceuticals. LITHOBID (lithium carbonate) extended-release tablets, US prescribing information, effective 2026-08-24, set id f7f5b69a-c2a1-4586-a189-1475d41387c0 (boxed warning read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Prozac", "text": "Dista Products Company (Eli Lilly). PROZAC (fluoxetine), US prescribing information, effective 2026-01-08, set id c88f33ed-6dfb-4c5e-bc01-d8e36dd97299 (boxed warning read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Seroquel", "text": "AstraZeneca. SEROQUEL (quetiapine) tablets, US prescribing information, effective 2025-01-22, set id 0584dda8-bc3c-48fe-1a90-79608f78e8a0 (section 1 read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "Ferrer2010", "text": "Ferrer M, Andión O, Matalí J, Valero S, Navarro JA, Ramos-Quiroga JA, et al. Comorbid attention-deficit/hyperactivity disorder in borderline patients defines an impulsive subtype of borderline personality disorder. J Pers Disord. 2010;24(6):812-22. PMID 21158602; doi:10.1521/pedi.2010.24.6.812.", "link": "https://doi.org/10.1521/pedi.2010.24.6.812", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Fertuck2009", "text": "Fertuck EA, Jekal A, Song I, Wyman B, Morris MC, Wilson ST, et al. Enhanced 'Reading the Mind in the Eyes' in borderline personality disorder compared to healthy controls. Psychol Med. 2009;39(12):1979-88. PMID 19460187; PMCID PMC3427787; doi:10.1017/S003329170900600X.", "link": "https://doi.org/10.1017/s003329170900600x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Finch2019TAU", "text": "Finch EF, Iliakis EA, Masland SR, Choi-Kain LW. A meta-analysis of treatment as usual for borderline personality disorder. Personal Disord. 2019;10(6):491-499. PMID 31414854; doi:10.1037/per0000353.", "link": "https://doi.org/10.1037/per0000353", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fineberg2023Ketamine", "text": "Fineberg SK, Choi EY, Shapiro-Thompson R, Dhaliwal K, Neustadter E, Sakheim M, et al. A pilot randomized controlled trial of ketamine in Borderline Personality Disorder. Neuropsychopharmacology. 2023;48(7):991-999. PMID 36804489; PMCID PMC10209175; doi:10.1038/s41386-023-01540-4.", "link": "https://doi.org/10.1038/s41386-023-01540-4", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Flynn2017", "text": "Flynn D, Kells M, Joyce M, Corcoran P, Herley S, Suarez C, et al. Family Connections versus optimised treatment-as-usual for family members of individuals with borderline personality disorder: non-randomised controlled study. Borderline Personal Disord Emot Dysregul. 2017;4:18. PMID 28861273; PMCID PMC5575921; doi:10.1186/s40479-017-0069-1.", "link": "https://doi.org/10.1186/s40479-017-0069-1", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Fok2012LifeExpectancy", "text": "Fok ML, Hayes RD, Chang CK, Stewart R, Callard FJ, Moran P. Life expectancy at birth and all-cause mortality among people with personality disorder. J Psychosom Res. 2012;73(2):104-107. PMID 22789412; doi:10.1016/j.jpsychores.2012.05.001.", "link": "https://doi.org/10.1016/j.jpsychores.2012.05.001", "areas": ["G", "A"], "unverified": false, "validated": "Europe PMC", "aliases": ["Fok2012"]}, {"key": "Fonagy2008", "text": "Fonagy P, Bateman A. The development of borderline personality disorder--a mentalizing model. J Pers Disord. 2008;22(1):4-21. PMID 18312120; doi:10.1521/pedi.2008.22.1.4.", "link": "https://doi.org/10.1521/pedi.2008.22.1.4", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Fonagy2015", "text": "Fonagy P, Speranza M, Luyten P, Kaess M, Hessels C, Bohus M. ESCAP Expert Article: borderline personality disorder in adolescence: an expert research review with implications for clinical practice. Eur Child Adolesc Psychiatry. 2015;24(11):1307-20. PMID 26271454; doi:10.1007/s00787-015-0751-z.", "link": "https://doi.org/10.1007/s00787-015-0751-z", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Fonagy2017a", "text": "Fonagy P, Luyten P, Allison E, Campbell C. What we have changed our minds about: Part 1. Borderline personality disorder as a limitation of resilience. Borderline Personal Disord Emot Dysregul. 2017;4:11. PMID 28413687; PMCID PMC5389119; doi:10.1186/s40479-017-0061-9.", "link": "https://doi.org/10.1186/s40479-017-0061-9", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Fonagy2017b", "text": "Fonagy P, Luyten P, Allison E, Campbell C. What we have changed our minds about: Part 2. Borderline personality disorder, epistemic trust and the developmental significance of social communication. Borderline Personal Disord Emot Dysregul. 2017;4:9. PMID 28405338; PMCID PMC5387344; doi:10.1186/s40479-017-0062-8.", "link": "https://doi.org/10.1186/s40479-017-0062-8", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "FonagyLuyten2009", "text": "Fonagy P, Luyten P. A developmental, mentalization-based approach to the understanding and treatment of borderline personality disorder. Dev Psychopathol. 2009;21(4):1355-81. PMID 19825272; doi:10.1017/S0954579409990198.", "link": "https://doi.org/10.1017/s0954579409990198", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ford2021", "text": "Ford JD, Courtois CA. Complex PTSD and borderline personality disorder. Borderline Personal Disord Emot Dysregul. 2021;8(1):16. PMID 33958001; PMCID PMC8103648; doi:10.1186/s40479-021-00155-9.", "link": "https://doi.org/10.1186/s40479-021-00155-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Fornaro2016", "text": "Fornaro M, Orsolini L, Marini S, De Berardis D, Perna G, Valchera A, et al. The prevalence and predictors of bipolar and borderline personality disorders comorbidity: Systematic review and meta-analysis. J Affect Disord. 2016;195:105-18. PMID 26881339; doi:10.1016/j.jad.2016.01.040.", "link": "https://doi.org/10.1016/j.jad.2016.01.040", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Fossati1999", "text": "Fossati A, Madeddu F, Maffei C. Borderline Personality Disorder and childhood sexual abuse: a meta-analytic study. J Pers Disord. 1999;13(3):268-80. PMID 10498039; doi:10.1521/pedi.1999.13.3.268.", "link": "https://doi.org/10.1521/pedi.1999.13.3.268", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Foxhall2019", "text": "Foxhall M, Hamilton-Giachritsis C, Button K. The link between rejection sensitivity and borderline personality disorder: A systematic review and meta-analysis. Br J Clin Psychol. 2019;58(3):289-326. PMID 30900278; doi:10.1111/bjc.12216.", "link": "https://doi.org/10.1111/bjc.12216", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Francis2023", "text": "Francis JL, Sawyer A, Roberts R, Yelland C, Drioli-Phillips P, Sved Williams AE. Mothers with borderline personality disorders' experiences of mother-infant dialectical behavior therapy. J Clin Psychol. 2023;79(5):1245-1260. PMID 36515397; doi:10.1002/jclp.23465.", "link": "https://doi.org/10.1002/jclp.23465", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Frankenburg2004Medical", "text": "Frankenburg FR, Zanarini MC. The association between borderline personality disorder and chronic medical illnesses, poor health-related lifestyle choices, and costly forms of health care utilization. J Clin Psychiatry. 2004;65(12):1660-1665. PMID 15641871; doi:10.4088/jcp.v65n1211.", "link": "https://doi.org/10.4088/jcp.v65n1211", "areas": ["G", "A", "H"], "unverified": false, "validated": "Europe PMC", "aliases": ["Frankenburg2004"]}, {"key": "Frankenburg2006Obesity", "text": "Frankenburg FR, Zanarini MC. Obesity and obesity-related illnesses in borderline patients. J Pers Disord. 2006;20(1):71-80. PMID 16563080; doi:10.1521/pedi.2006.20.1.71.", "link": "https://doi.org/10.1521/pedi.2006.20.1.71", "areas": ["G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Frost2020", "text": "Frost R, Murphy J, Hyland P, Shevlin M, Ben-Ezra M, Hansen M, et al. Revealing what is distinct by recognising what is common: distinguishing between complex PTSD and Borderline Personality Disorder symptoms using bifactor modelling. Eur J Psychotraumatol. 2020;11(1):1836864. PMID 33425242; PMCID PMC7759200; doi:10.1080/20008198.2020.1836864.", "link": "https://doi.org/10.1080/20008198.2020.1836864", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Fruzzetti2005", "text": "Fruzzetti AE, Shenk C, Hoffman PD. Family interaction and the development of borderline personality disorder: a transactional model. Dev Psychopathol. 2005;17(4):1007-30. PMID 16613428; doi:10.1017/s0954579405050479.", "link": "https://doi.org/10.1017/s0954579405050479", "areas": ["B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Gartlehner2021", "text": "Gartlehner G, Crotty K, Kennedy S, Edlund MJ, Ali R, Siddiqui M, et al. Pharmacological Treatments for Borderline Personality Disorder: A Systematic Review and Meta-Analysis. CNS Drugs. 2021;35(10):1053-1067. PMID 34495494; PMCID PMC8478737; doi:10.1007/s40263-021-00855-4.", "link": "https://doi.org/10.1007/s40263-021-00855-4", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ghaemi2014", "text": "Ghaemi SN, Dalley S, Catania C, Barroilhet S. Bipolar or borderline: a clinical overview. Acta Psychiatr Scand. 2014;130(2):99-108. PMID 24571137; doi:10.1111/acps.12257.", "link": "https://doi.org/10.1111/acps.12257", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gharraee2022", "text": "Gharraee B, Shabani A, Masoumian S, Zamirinejad S, Yaghmaeezadeh H, Khanjani S, et al. Psychometric Properties of Persian Version of Structured Clinical Interview for DSM-5 for Personality Disorders. East Asian Arch Psychiatry. 2022;32(4):95-99. PMID 36578184; doi:10.12809/eaap2208.", "link": "https://doi.org/10.12809/eaap2208", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "GiesenBloo2006", "text": "Giesen-Bloo J, van Dyck R, Spinhoven P, van Tilburg W, Dirksen C, van Asselt T, et al. Outpatient psychotherapy for borderline personality disorder: randomized trial of schema-focused therapy vs transference-focused psychotherapy. Arch Gen Psychiatry. 2006;63(6):649-658. PMID 16754838; doi:10.1001/archpsyc.63.6.649.", "link": "https://doi.org/10.1001/archpsyc.63.6.649", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Glaser2008", "text": "Glaser JP, Van Os J, Mengelers R, Myin-Germeys I. A momentary assessment study of the reputed emotional phenotype associated with borderline personality disorder. Psychol Med. 2008;38(9):1231-9. PMID 18047769; doi:10.1017/S0033291707002322.", "link": "https://doi.org/10.1017/s0033291707002322", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Glaser2010", "text": "Glaser JP, Van Os J, Thewissen V, Myin-Germeys I. Psychotic reactivity in borderline personality disorder. Acta Psychiatr Scand. 2010;121(2):125-34. PMID 19555465; doi:10.1111/j.1600-0447.2009.01427.x.", "link": "https://doi.org/10.1111/j.1600-0447.2009.01427.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Glass2024Inactivity", "text": "Glass IV, Frankenburg FR, Zanarini MC. Longitudinal description and prediction of physical inactivity among patients with borderline personality disorder and personality-disordered comparison subjects. Borderline Personal Disord Emot Dysregul. 2024;11(1):11. PMID 38845011; PMCID PMC11157732; doi:10.1186/s40479-024-00253-4.", "link": "https://doi.org/10.1186/s40479-024-00253-4", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gonzalez2016", "text": "González RA, Igoumenou A, Kallis C, Coid JW. Borderline personality disorder and violence in the UK population: categorical and dimensional trait assessment. BMC Psychiatry. 2016;16:180. PMID 27255770; PMCID PMC4891918; doi:10.1186/s12888-016-0885-7.", "link": "https://doi.org/10.1186/s12888-016-0885-7", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Goodman2014", "text": "Goodman M, Carpenter D, Tang CY, Goldstein KE, Avedon J, Fernandez N, et al. Dialectical behavior therapy alters emotion regulation and amygdala activity in patients with borderline personality disorder. J Psychiatr Res. 2014;57:108-16. PMID 25038629; PMCID PMC4263347; doi:10.1016/j.jpsychires.2014.06.020.", "link": "https://doi.org/10.1016/j.jpsychires.2014.06.020", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Goodman2017", "text": "Goodman M, Tomas IA, Temes CM, Fitzmaurice GM, Aguirre BA, Zanarini MC. Suicide attempts and self-injurious behaviours in adolescent and adult patients with borderline personality disorder. Personal Ment Health. 2017;11(3):157-163. PMID 28544496; PMCID PMC5571736; doi:10.1002/pmh.1375.", "link": "https://doi.org/10.1002/pmh.1375", "areas": ["A", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Grant2008", "text": "Grant BF, Chou SP, Goldstein RB, Huang B, Stinson FS, Saha TD, et al. Prevalence, correlates, disability, and comorbidity of DSM-IV borderline personality disorder: results from the Wave 2 National Epidemiologic Survey on Alcohol and Related Conditions. J Clin Psychiatry. 2008;69(4):533-45. PMID 18426259; PMCID PMC2676679; doi:10.4088/jcp.v69n0404.", "link": "https://doi.org/10.4088/jcp.v69n0404", "areas": ["A", "D", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Grant2022Brexpiprazole", "text": "Grant JE, Valle S, Chesivoir E, Ehsan D, Chamberlain SR. A double-blind placebo-controlled study of brexpiprazole for the treatment of borderline personality disorder. Br J Psychiatry. 2022;220(2):58-63. PMID 35049469; PMCID PMC7612273; doi:10.1192/bjp.2021.159.", "link": "https://doi.org/10.1192/bjp.2021.159", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Grant2026Psilocybin", "text": "Grant JE, Boutouis S, O'Brien M, Avila L, Neelapu M, Ehsan D. An Open-Label Study of Single-Dose Psilocybin for Borderline Personality Disorder With Co-Occurring Major Depressive Disorder. Clin Neuropharmacol. 2026;49(4):163-169. PMID 41973961; doi:10.1097/wnf.0000000000000683.", "link": "https://doi.org/10.1097/wnf.0000000000000683", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gratz2010", "text": "Gratz KL, Rosenthal MZ, Tull MT, Lejuez CW, Gunderson JG. An experimental investigation of emotional reactivity and delayed emotional recovery in borderline personality disorder: the role of shame. Compr Psychiatry. 2010;51(3):275-85. PMID 20399337; doi:10.1016/j.comppsych.2009.08.005.", "link": "https://doi.org/10.1016/j.comppsych.2009.08.005", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Gratz2014ERGT", "text": "Gratz KL, Tull MT, Levy R. Randomized controlled trial and uncontrolled 9-month follow-up of an adjunctive emotion regulation group therapy for deliberate self-harm among women with borderline personality disorder. Psychol Med. 2014;44(10):2099-2112. PMID 23985088; doi:10.1017/s0033291713002134.", "link": "https://doi.org/10.1017/s0033291713002134", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Grenyer2018Stepped", "text": "Grenyer BFS, Lewis KL, Fanaian M, Kotze B. Treatment of personality disorder using a whole of service stepped care approach: A cluster randomized controlled trial. PLoS One. 2018;13(11):e0206472. PMID 30399184; PMCID PMC6219775; doi:10.1371/journal.pone.0206472.", "link": "https://doi.org/10.1371/journal.pone.0206472", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Grenyer2019", "text": "Grenyer BFS, Bailey RC, Lewis KL, Matthias M, Garretty T, Bickerton A. A Randomized Controlled Trial of Group Psychoeducation for Carers of Persons With Borderline Personality Disorder. J Pers Disord. 2019;33(2):214-228. PMID 29505385; doi:10.1521/pedi_2018_32_340.", "link": "https://doi.org/10.1521/pedi_2018_32_340", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Grilo2001", "text": "Grilo CM, McGlashan TH, Morey LC, Gunderson JG, Skodol AE, Shea MT, et al. Internal consistency, intercriterion overlap and diagnostic efficiency of criteria sets for DSM-IV schizotypal, borderline, avoidant and obsessive-compulsive personality disorders. Acta Psychiatr Scand. 2001;104(4):264-72. PMID 11722301; doi:10.1034/j.1600-0447.2001.00436.x.", "link": "https://doi.org/10.1034/j.1600-0447.2001.00436.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Grilo2004CLPS", "text": "Grilo CM, Sanislow CA, Gunderson JG, Pagano ME, Yen S, Zanarini MC, et al. Two-year stability and change of schizotypal, borderline, avoidant, and obsessive-compulsive personality disorders. J Consult Clin Psychol. 2004;72(5):767-775. PMID 15482035; PMCID PMC3289406; doi:10.1037/0022-006x.72.5.767.", "link": "https://doi.org/10.1037/0022-006x.72.5.767", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Grilo2007", "text": "Grilo CM, Sanislow CA, Skodol AE, Gunderson JG, Stout RL, Bender DS, et al. Longitudinal diagnostic efficiency of DSM-IV criteria for borderline personality disorder: a 2-year prospective study. Can J Psychiatry. 2007;52(6):357-62. PMID 17696021; doi:10.1177/070674370705200604.", "link": "https://doi.org/10.1177/070674370705200604", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gross2002PrimaryCare", "text": "Gross R, Olfson M, Gameroff M, Shea S, Feder A, Fuentes M, et al. Borderline personality disorder in primary care. Arch Intern Med. 2002;162(1):53-60. PMID 11784220; doi:10.1001/archinte.162.1.53.", "link": "https://doi.org/10.1001/archinte.162.1.53", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Guile2018", "text": "Guilé JM, Boissel L, Alaux-Cantin S, de La Rivière SG. Borderline personality disorder in adolescents: prevalence, diagnosis, and treatment strategies. Adolesc Health Med Ther. 2018;9:199-210. PMID 30538595; PMCID PMC6257363; doi:10.2147/AHMT.S156565.", "link": "https://doi.org/10.2147/ahmt.s156565", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Guillen2024", "text": "Guillén V, Fernández-Felipe I, Marco JH, Grau A, Botella C, García-Palacios A. \"Family Connections\", a program for relatives of people with borderline personality disorder: A randomized controlled trial. Fam Process. 2024;63(4):2195-2214. PMID 39624006; PMCID PMC11659101; doi:10.1111/famp.13089.", "link": "https://doi.org/10.1111/famp.13089", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson1975", "text": "Gunderson JG, Singer MT. Defining borderline patients: an overview. Am J Psychiatry. 1975;132(1):1-10. PMID 802958; doi:10.1176/ajp.132.1.1.", "link": "https://doi.org/10.1176/ajp.132.1.1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson1978", "text": "Gunderson JG, Kolb JE. Discriminating features of borderline patients. Am J Psychiatry. 1978;135(7):792-6. PMID 665789; doi:10.1176/ajp.135.7.792.", "link": "https://doi.org/10.1176/ajp.135.7.792", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson1981", "text": "Gunderson JG, Kolb JE, Austin V. The diagnostic interview for borderline patients. Am J Psychiatry. 1981;138(7):896-903. PMID 7258348; doi:10.1176/ajp.138.7.896.", "link": "https://doi.org/10.1176/ajp.138.7.896", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson1997", "text": "Gunderson JG, Berkowitz C, Ruiz-Sancho A. Families of borderline patients: a psychoeducational approach. Bull Menninger Clin. 1997;61(4):446-57. PMID 9401149.", "link": "https://pubmed.ncbi.nlm.nih.gov/9401149/", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson2000CLPS", "text": "Gunderson JG, Shea MT, Skodol AE, McGlashan TH, Morey LC, Stout RL, et al. The Collaborative Longitudinal Personality Disorders Study: development, aims, design, and sample characteristics. J Pers Disord. 2000;14(4):300-15. PMID 11213788; doi:10.1521/pedi.2000.14.4.300.", "link": "https://doi.org/10.1521/pedi.2000.14.4.300", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson2003Remissions", "text": "Gunderson JG, Bender D, Sanislow C, Yen S, Rettew JB, Dolan-Sewell R, et al. Plausibility and possible determinants of sudden \"remissions\" in borderline patients. Psychiatry. 2003;66(2):111-119. PMID 12868289; doi:10.1521/psyc.66.2.111.20614.", "link": "https://doi.org/10.1521/psyc.66.2.111.20614", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gunderson2009Ontogeny", "text": "Gunderson JG. Borderline personality disorder: ontogeny of a diagnosis. Am J Psychiatry. 2009;166(5):530-9. PMID 19411380; PMCID PMC3145201; doi:10.1176/appi.ajp.2009.08121825.", "link": "https://doi.org/10.1176/appi.ajp.2009.08121825", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson2011", "text": "Gunderson JG, Stout RL, McGlashan TH, Shea MT, Morey LC, Grilo CM, et al. Ten-year course of borderline personality disorder: psychopathology and function from the Collaborative Longitudinal Personality Disorders study. Arch Gen Psychiatry. 2011;68(8):827-37. PMID 21464343; PMCID PMC3158489; doi:10.1001/archgenpsychiatry.2011.37.", "link": "https://doi.org/10.1001/archgenpsychiatry.2011.37", "areas": ["A", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson2011Family", "text": "Gunderson JG, Zanarini MC, Choi-Kain LW, Mitchell KS, Jang KL, Hudson JI. Family study of borderline personality disorder and its sectors of psychopathology. Arch Gen Psychiatry. 2011;68(7):753-62. PMID 21727257; PMCID PMC3150490; doi:10.1001/archgenpsychiatry.2011.65.", "link": "https://doi.org/10.1001/archgenpsychiatry.2011.65", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson2014Mood", "text": "Gunderson JG, Stout RL, Shea MT, Grilo CM, Markowitz JC, Morey LC, et al. Interactions of borderline personality disorder and mood disorders over 10 years. J Clin Psychiatry. 2014;75(8):829-834. PMID 25007118; doi:10.4088/jcp.13m08972.", "link": "https://doi.org/10.4088/jcp.13m08972", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gunderson2018", "text": "Gunderson JG, Herpertz SC, Skodol AE, Torgersen S, Zanarini MC. Borderline personality disorder. Nat Rev Dis Primers. 2018;4:18029. PMID 29795363; doi:10.1038/nrdp.2018.29.", "link": "https://doi.org/10.1038/nrdp.2018.29", "areas": ["A", "B", "C", "D", "E", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson2018GPM", "text": "Gunderson J, Masland S, Choi-Kain L. Good psychiatric management: a review. Curr Opin Psychol. 2018;21:127-131. PMID 29547739; doi:10.1016/j.copsyc.2017.12.006.", "link": "https://doi.org/10.1016/j.copsyc.2017.12.006", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "GundersonLyonsRuth2008", "text": "Gunderson JG, Lyons-Ruth K. BPD's interpersonal hypersensitivity phenotype: a gene-environment-developmental model. J Pers Disord. 2008;22(1):22-41. PMID 18312121; PMCID PMC2596628; doi:10.1521/pedi.2008.22.1.22.", "link": "https://doi.org/10.1521/pedi.2008.22.1.22", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hallett2017", "text": "Hallett N, Dickens GL. De-escalation of aggressive behaviour in healthcare settings: Concept analysis. Int J Nurs Stud. 2017;75:10-20. PMID 28709012; doi:10.1016/j.ijnurstu.2017.07.003.", "link": "https://doi.org/10.1016/j.ijnurstu.2017.07.003", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hallquist2015", "text": "Hallquist MN, Hipwell AE, Stepp SD. Poor self-control and harsh punishment in childhood prospectively predict borderline personality symptoms in adolescent girls. J Abnorm Psychol. 2015;124(3):549-64. PMID 25961815; PMCID PMC4573776; doi:10.1037/abn0000058.", "link": "https://doi.org/10.1037/abn0000058", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hastrup2022", "text": "Hastrup LH, Jennum P, Ibsen R, Kjellberg J, Simonsen E. Welfare consequences of early-onset Borderline Personality Disorder: a nationwide register-based case-control study. Eur Child Adolesc Psychiatry. 2022;31(2):253-260. PMID 33231787; doi:10.1007/s00787-020-01683-5.", "link": "https://doi.org/10.1007/s00787-020-01683-5", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Haynos2016", "text": "Haynos AF, Fruzzetti AE, Anderson C, Briggs D, Walenta J. Effects of dialectical behavior therapy skills training on outcomes for mental health staff in a child and adolescent residential setting. J Hosp Adm. 2016;5(2):55-61. PMID 28751925; PMCID PMC5526638; doi:10.5430/jha.v5n2p55.", "link": "https://doi.org/10.5430/jha.v5n2p55", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hazlett2012", "text": "Hazlett EA, Zhang J, New AS, Zelmanova Y, Goldstein KE, Haznedar MM, et al. Potentiated amygdala response to repeated emotional pictures in borderline personality disorder. Biol Psychiatry. 2012;72(6):448-56. PMID 22560044; PMCID PMC3415575; doi:10.1016/j.biopsych.2012.03.027.", "link": "https://doi.org/10.1016/j.biopsych.2012.03.027", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hecht2014", "text": "Hecht KF, Cicchetti D, Rogosch FA, Crick NR. Borderline personality features in childhood: the role of subtype, developmental timing, and chronicity of child maltreatment. Dev Psychopathol. 2014;26(3):805-15. PMID 25047300; PMCID PMC4141853; doi:10.1017/S0954579414000406.", "link": "https://doi.org/10.1017/s0954579414000406", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hein2025Emptiness", "text": "Hein KE, Glass IV, Frankenburg FR, Fitzmaurice GM, Zanarini MC. Emptiness in patients with borderline personality disorder: Severity and predictors of outcome over 24 years of prospective follow-up. J Affect Disord. 2025;372:234-240. PMID 39613044; PMCID PMC11827871; doi:10.1016/j.jad.2024.11.075.", "link": "https://doi.org/10.1016/j.jad.2024.11.075", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hepp2018", "text": "Hepp J, Lane SP, Wycoff AM, Carpenter RW, Trull TJ. Interpersonal stressors and negative affect in individuals with borderline personality disorder and community adults in daily life: A replication and extension. J Abnorm Psychol. 2018;127(2):183-189. PMID 29528672; PMCID PMC5851290; doi:10.1037/abn0000318.", "link": "https://doi.org/10.1037/abn0000318", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hepp2020", "text": "Hepp J, Carpenter RW, Störkel LM, Schmitz SE, Schmahl C, Niedtfeld I. A systematic review of daily life studies on non-suicidal self-injury based on the four-function model. Clin Psychol Rev. 2020;82:101888. PMID 32949907; PMCID PMC7680364; doi:10.1016/j.cpr.2020.101888.", "link": "https://doi.org/10.1016/j.cpr.2020.101888", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hepp2021BRT", "text": "Hepp J, Störkel LM, Wycoff AM, Freeman LK, Schmahl C, Niedtfeld I. A test of the interpersonal function of non-suicidal self-injury in daily life. Behav Res Ther. 2021;144:103930. PMID 34271283; PMCID PMC8381558; doi:10.1016/j.brat.2021.103930.", "link": "https://doi.org/10.1016/j.brat.2021.103930", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hepp2021PersonalDisord", "text": "Hepp J, Carpenter RW, Freeman LK, Vebares TJ, Trull TJ. The environmental, interpersonal, and affective context of nonsuicidal self-injury urges in daily life. Personal Disord. 2021;12(1):29-38. PMID 32881575; PMCID PMC7946409; doi:10.1037/per0000456.", "link": "https://doi.org/10.1037/per0000456", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Herpertz2001", "text": "Herpertz SC, Dietrich TM, Wenning B, Krings T, Erberich SG, Willmes K, et al. Evidence of abnormal amygdala functioning in borderline personality disorder: a functional MRI study. Biol Psychiatry. 2001;50(4):292-8. PMID 11522264; doi:10.1016/s0006-3223(01)01075-7.", "link": "https://doi.org/10.1016/s0006-3223(01)01075-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Herpertz2015", "text": "Herpertz SC, Bertsch K. A New Perspective on the Pathophysiology of Borderline Personality Disorder: A Model of the Role of Oxytocin. Am J Psychiatry. 2015;172(9):840-51. PMID 26324303; doi:10.1176/appi.ajp.2015.15020216.", "link": "https://doi.org/10.1176/appi.ajp.2015.15020216", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hoffman1999", "text": "Hoffman PD, Fruzzetti AE, Swenson CR. Dialectical behavior therapy--family skills training. Fam Process. 1999;38(4):399-414. PMID 10668619; doi:10.1111/j.1545-5300.1999.00399.x.", "link": "https://doi.org/10.1111/j.1545-5300.1999.00399.x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hoffman2003", "text": "Hoffman PD, Buteau E, Hooley JM, Fruzzetti AE, Bruce ML. Family members' knowledge about borderline personality disorder: correspondence with their levels of depression, burden, distress, and expressed emotion. Fam Process. 2003;42(4):469-78. PMID 14979218; doi:10.1111/j.1545-5300.2003.00469.x.", "link": "https://doi.org/10.1111/j.1545-5300.2003.00469.x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hoffman2005", "text": "Hoffman PD, Fruzzetti AE, Buteau E, Neiditch ER, Penney D, Bruce ML, et al. Family connections: a program for relatives of persons with borderline personality disorder. Fam Process. 2005;44(2):217-25. PMID 16013747; doi:10.1111/j.1545-5300.2005.00055.x.", "link": "https://doi.org/10.1111/j.1545-5300.2005.00055.x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hoffman2007CPR", "text": "Hoffman PD, Fruzzetti AE. Advances in interventions for families with a relative with a personality disorder diagnosis. Curr Psychiatry Rep. 2007;9(1):68-73. PMID 17257517; doi:10.1007/s11920-007-0012-z.", "link": "https://doi.org/10.1007/s11920-007-0012-z", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hoffman2007JMH", "text": "Hoffman PD, Fruzzetti AE, Buteau E. Understanding and engaging families: an education, skills and support program for relatives impacted by borderline personality disorder. J Ment Health. 2007;16(1):69-82. doi:10.1080/09638230601182052. Not indexed in PubMed; no abstract in Crossref or Europe PMC.", "link": "https://doi.org/10.1080/09638230601182052", "areas": ["H"], "unverified": false, "validated": "Crossref"}, {"key": "Hollander2001Divalproex", "text": "Hollander E, Allen A, Lopez RP, Bienstock CA, Grossman R, Siever LJ, et al. A preliminary double-blind, placebo-controlled trial of divalproex sodium in borderline personality disorder. J Clin Psychiatry. 2001;62(3):199-203. PMID 11305707; doi:10.4088/jcp.v62n0311.", "link": "https://doi.org/10.4088/jcp.v62n0311", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Hollander2005Divalproex", "text": "Hollander E, Swann AC, Coccaro EF, Jiang P, Smith TB. Impact of trait impulsivity and state aggression on divalproex versus placebo response in borderline personality disorder. Am J Psychiatry. 2005;162(3):621-4. PMID 15741486; doi:10.1176/appi.ajp.162.3.621.", "link": "https://doi.org/10.1176/appi.ajp.162.3.621", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Hopwood2008", "text": "Hopwood CJ, Morey LC, Edelen MO, Shea MT, Grilo CM, Sanislow CA, et al. A comparison of interview and self-report methods for the assessment of borderline personality disorder criteria. Psychol Assess. 2008;20(1):81-5. PMID 18315403; doi:10.1037/1040-3590.20.1.81.", "link": "https://doi.org/10.1037/1040-3590.20.1.81", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Horky2026rTMS", "text": "Horký M, Bartys P, Jáni M, Radimecká M, Širůček J, Rektorová K, et al. Right DLPFC repetitive transcranial magnetic stimulation in women with borderline personality disorder: A double-blind randomized sham-controlled trial. J Affect Disord. 2026;415:122473. PMID 42697251; doi:10.1016/j.jad.2026.122473.", "link": "https://doi.org/10.1016/j.jad.2026.122473", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Houben2017", "text": "Houben M, Claes L, Vansteelandt K, Berens A, Sleuwaegen E, Kuppens P. The emotion regulation function of nonsuicidal self-injury: A momentary assessment study in inpatients with borderline personality disorder features. J Abnorm Psychol. 2017;126(1):89-95. PMID 27808541; doi:10.1037/abn0000229.", "link": "https://doi.org/10.1037/abn0000229", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Houben2018", "text": "Houben M, Claes L, Sleuwaegen E, Berens A, Vansteelandt K. Emotional reactivity to appraisals in patients with a borderline personality disorder: a daily life study. Borderline Personal Disord Emot Dysregul. 2018;5:18. PMID 30459949; PMCID PMC6234606; doi:10.1186/s40479-018-0095-7.", "link": "https://doi.org/10.1186/s40479-018-0095-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Houben2021", "text": "Houben M, Mestdagh M, Dejonckheere E, Obbels J, Sienaert P, van Roy J, et al. The Statistical Specificity of Emotion Dynamics in Borderline Personality Disorder. J Pers Disord. 2021;35(6):819-840. PMID 34124950; doi:10.1521/pedi_2021_35_509.", "link": "https://doi.org/10.1521/pedi_2021_35_509", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Huang2009", "text": "Huang Y, Kotov R, de Girolamo G, Preti A, Angermeyer M, Benjet C, et al. DSM-IV personality disorders in the WHO World Mental Health Surveys. Br J Psychiatry. 2009;195(1):46-53. PMID 19567896; PMCID PMC2705873; doi:10.1192/bjp.bp.108.058552.", "link": "https://doi.org/10.1192/bjp.bp.108.058552", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Iliakis2021", "text": "Iliakis EA, Ilagan GS, Choi-Kain LW. Dropout rates from psychotherapy trials for borderline personality disorder: A meta-analysis. Personal Disord. 2021;12(3):193-206. PMID 33591777; doi:10.1037/per0000453.", "link": "https://doi.org/10.1037/per0000453", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ingenhoven2010", "text": "Ingenhoven T, Lafay P, Rinne T, Passchier J, Duivenvoorden H. Effectiveness of pharmacotherapy for severe personality disorders: meta-analyses of randomized controlled trials. J Clin Psychiatry. 2010;71(1):14-25. PMID 19778496; doi:10.4088/jcp.08r04526gre.", "link": "https://doi.org/10.4088/jcp.08r04526gre", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Jacob2009", "text": "Jacob GA, Hellstern K, Ower N, Pillmann M, Scheel CN, Rüsch N, et al. Emotional reactions to standardized stimuli in women with borderline personality disorder: stronger negative affect, but no differences in reactivity. J Nerv Ment Dis. 2009;197(11):808-15. PMID 19996718; doi:10.1097/NMD.0b013e3181bea44d.", "link": "https://doi.org/10.1097/nmd.0b013e3181bea44d", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Jahng2008", "text": "Jahng S, Wood PK, Trull TJ. Analysis of affective instability in ecological momentary assessment: Indices using successive difference and group comparison via multilevel modeling. Psychol Methods. 2008;13(4):354-75. PMID 19071999; doi:10.1037/a0014173.", "link": "https://doi.org/10.1037/a0014173", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson1999", "text": "Johnson JG, Cohen P, Brown J, Smailes EM, Bernstein DP. Childhood maltreatment increases risk for personality disorders during early adulthood. Arch Gen Psychiatry. 1999;56(7):600-6. PMID 10401504; doi:10.1001/archpsyc.56.7.600.", "link": "https://doi.org/10.1001/archpsyc.56.7.600", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2000Acta", "text": "Johnson JG, Cohen P, Kasen S, Skodol AE, Hamagami F, Brook JS. Age-related change in personality disorder trait levels between early adolescence and adulthood: a community-based longitudinal investigation. Acta Psychiatr Scand. 2000;102(4):265-75. PMID 11089726; doi:10.1034/j.1600-0447.2000.102004265.x.", "link": "https://doi.org/10.1034/j.1600-0447.2000.102004265.x", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2003CLPS", "text": "Johnson DM, Shea MT, Yen S, Battle CL, Zlotnick C, Sanislow CA, et al. Gender differences in borderline personality disorder: findings from the Collaborative Longitudinal Personality Disorders Study. Compr Psychiatry. 2003;44(4):284-92. PMID 12923706; doi:10.1016/S0010-440X(03)00090-7.", "link": "https://doi.org/10.1016/s0010-440x(03)00090-7", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Jorgensen2013MBT", "text": "Jørgensen CR, Freund C, Bøye R, Jordet H, Andersen D, Kjølbye M. Outcome of mentalization-based and supportive psychotherapy in patients with borderline personality disorder: a randomized trial. Acta Psychiatr Scand. 2013;127(4):305-317. PMID 22897123; doi:10.1111/j.1600-0447.2012.01923.x.", "link": "https://doi.org/10.1111/j.1600-0447.2012.01923.x", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Jorgensen2021MBTG", "text": "Jørgensen MS, Storebø OJ, Bo S, Poulsen S, Gondan M, Beck E, et al. Mentalization-based treatment in groups for adolescents with Borderline Personality Disorder: 3- and 12-month follow-up of a randomized controlled trial. Eur Child Adolesc Psychiatry. 2021;30(5):699-710. PMID 32388627; doi:10.1007/s00787-020-01551-2.", "link": "https://doi.org/10.1007/s00787-020-01551-2", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Joyce2024", "text": "Joyce M, Kells M, Boylan E, Corcoran P, Power B, Wall S, et al. Hopelessness for family members of individuals with borderline personality disorder. Fam Process. 2024;63(4):2135-2150. PMID 39234790; PMCID PMC11659099; doi:10.1111/famp.13045.", "link": "https://doi.org/10.1111/famp.13045", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Juul2023", "text": "Juul S, Jakobsen JC, Hestbaek E, Jørgensen CK, Olsen MH, Rishede M, et al. Short-Term versus Long-Term Mentalization-Based Therapy for Borderline Personality Disorder: A Randomized Clinical Trial (MBT-RCT). Psychother Psychosom. 2023;92(5):329-339. PMID 37935133; PMCID PMC10716869; doi:10.1159/000534289.", "link": "https://doi.org/10.1159/000534289", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Juul2025", "text": "Juul S, Jakobsen JC, Hestbaek E, Kamp CB, Olsen MH, Rishede M, et al. Short-Term versus Long-Term Mentalization-Based Therapy for Borderline Personality Disorder: 24 Months Follow-Up of a Randomized Clinical Trial. Psychother Psychosom. 2025;94(4):263-272. PMID 40340917; doi:10.1159/000544934.", "link": "https://doi.org/10.1159/000544934", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Juurlink2020NESDA", "text": "Juurlink TT, Lamers F, van Marle HJF, Anema JR, Beekman ATF. The role of borderline personality disorder symptoms on absenteeism & work performance in the Netherlands Study of Depression and Anxiety (NESDA). BMC Psychiatry. 2020;20(1):414. PMID 32831059; PMCID PMC7444043; doi:10.1186/s12888-020-02815-6.", "link": "https://doi.org/10.1186/s12888-020-02815-6", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Juurlink2022", "text": "Juurlink TT, Lamers F, van Marle HJF, Zwinkels W, Spijkerman MA, Beekman ATF, et al. Individual placement and support and employment in personality disorders: a registry based cohort study. BMC Psychiatry. 2022;22(1):188. PMID 35300624; PMCID PMC8932290; doi:10.1186/s12888-022-03823-4.", "link": "https://doi.org/10.1186/s12888-022-03823-4", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kaess2014Adolescence", "text": "Kaess M, Brunner R, Chanen A. Borderline personality disorder in adolescence. Pediatrics. 2014;134(4):782-793. PMID 25246626; doi:10.1542/peds.2013-3677.", "link": "https://doi.org/10.1542/peds.2013-3677", "areas": ["G", "A", "D"], "unverified": false, "validated": "Europe PMC", "aliases": ["Kaess2014"]}, {"key": "Kaess2025", "text": "Kaess M, Cavelti M. Research Review: What we have learned about early detection and intervention of borderline personality disorder. J Child Psychol Psychiatry. 2025;66(12):1829-1848. PMID 40659496; PMCID PMC12626185; doi:10.1111/jcpp.70011.", "link": "https://doi.org/10.1111/jcpp.70011", "areas": ["D", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Kaess2025Review"]}, {"key": "Kamphausen2013", "text": "Kamphausen S, Schröder P, Maier S, Bader K, Feige B, Kaller CP, et al. Medial prefrontal dysfunction and prolonged amygdala response during instructed fear processing in borderline personality disorder. World J Biol Psychiatry. 2013;14(4):307-18, S1-4. PMID 22404662; doi:10.3109/15622975.2012.665174.", "link": "https://doi.org/10.3109/15622975.2012.665174", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Karan2016", "text": "Karan E, Niesten IJ, Frankenburg FR, Fitzmaurice GM, Zanarini MC. Prevalence and course of sexual relationship difficulties in recovered and non-recovered patients with borderline personality disorder over 16 years of prospective follow-up. Personal Ment Health. 2016;10(3):232-43. PMID 26864454; doi:10.1002/pmh.1327.", "link": "https://doi.org/10.1002/pmh.1327", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kaufman2020", "text": "Kaufman EA, Victor SE, Hipwell AE, Stepp SD. Reciprocal Influences of Parent and Adolescent Borderline Personality Symptoms Over 3 Years. J Pers Disord. 2020;34(Suppl B):130-145. PMID 32539621; PMCID PMC10454519; doi:10.1521/pedi_2020_34_483.", "link": "https://doi.org/10.1521/pedi_2020_34_483", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Keefe2021Selection", "text": "Keefe JR, Kim TT, DeRubeis RJ, Streiner DL, Links PS, McMain SF. Treatment selection in borderline personality disorder between dialectical behavior therapy and psychodynamic psychiatric management. Psychol Med. 2021;51(11):1829-1837. PMID 32204742; doi:10.1017/s0033291720000550.", "link": "https://doi.org/10.1017/s0033291720000550", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kendall2009", "text": "Kendall T, Pilling S, Tyrer P, Duggan C, Burbeck R, Meader N, et al. Borderline and antisocial personality disorders: summary of NICE guidance. BMJ. 2009;338:b93. PMID 19176682; doi:10.1136/bmj.b93.", "link": "https://doi.org/10.1136/bmj.b93", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kendler2008", "text": "Kendler KS, Aggen SH, Czajkowski N, Røysamb E, Tambs K, Torgersen S, et al. The structure of genetic and environmental risk factors for DSM-IV personality disorders: a multivariate twin study. Arch Gen Psychiatry. 2008;65(12):1438-46. PMID 19047531; PMCID PMC2844885; doi:10.1001/archpsyc.65.12.1438.", "link": "https://doi.org/10.1001/archpsyc.65.12.1438", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kendler2011", "text": "Kendler KS, Myers J, Reichborn-Kjennerud T. Borderline personality disorder traits and their relationship with dimensions of normative personality: a web-based cohort and twin study. Acta Psychiatr Scand. 2011;123(5):349-59. PMID 21198457; PMCID PMC3081883; doi:10.1111/j.1600-0447.2010.01653.x.", "link": "https://doi.org/10.1111/j.1600-0447.2010.01653.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kernberg1967", "text": "Kernberg O. Borderline personality organization. J Am Psychoanal Assoc. 1967;15(3):641-85. PMID 4861171; doi:10.1177/000306516701500309.", "link": "https://doi.org/10.1177/000306516701500309", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Kernot2023", "text": "Kernot J, Baker A, Oster C, Petrakis M, Dawson S. Employment interventions to assist people who experience borderline personality disorder: A scoping review. Int J Soc Psychiatry. 2023;69(8):1845-1855. PMID 37497932; PMCID PMC10685697; doi:10.1177/00207640231189424.", "link": "https://doi.org/10.1177/00207640231189424", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Keuroghlian2013Medical", "text": "Keuroghlian AS, Frankenburg FR, Zanarini MC. The relationship of chronic medical illnesses, poor health-related lifestyle choices, and health care utilization to recovery status in borderline patients over a decade of prospective follow-up. J Psychiatr Res. 2013;47(10):1499-1506. PMID 23856083; PMCID PMC3884821; doi:10.1016/j.jpsychires.2013.06.012.", "link": "https://doi.org/10.1016/j.jpsychires.2013.06.012", "areas": ["G", "A", "H"], "unverified": false, "validated": "Europe PMC", "aliases": ["Keuroghlian2013"]}, {"key": "Keuroghlian2015Anxiety", "text": "Keuroghlian AS, Gunderson JG, Pagano ME, Markowitz JC, Ansell EB, Shea MT, et al. Interactions of borderline personality disorder and anxiety disorders over 10 years. J Clin Psychiatry. 2015;76(11):1529-1534. PMID 26114336; doi:10.4088/jcp.14m09748.", "link": "https://doi.org/10.4088/jcp.14m09748", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kimmel2016", "text": "Kimmel CL, Alhassoon OM, Wollman SC, Stern MJ, Perez-Figueroa A, Hall MG, et al. Age-related parieto-occipital and other gray matter changes in borderline personality disorder: A meta-analysis of cortical and subcortical structures. Psychiatry Res Neuroimaging. 2016;251:15-25. PMID 27107250; doi:10.1016/j.pscychresns.2016.04.005.", "link": "https://doi.org/10.1016/j.pscychresns.2016.04.005", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kjaer2020", "text": "Kjær JNR, Biskin R, Vestergaard C, Munk-Jørgensen P. All-Cause Mortality of Hospital-Treated Borderline Personality Disorder: A Nationwide Cohort Study. J Pers Disord. 2020;34(6):723-735. PMID 30307824; doi:10.1521/pedi_2018_32_403.", "link": "https://doi.org/10.1521/pedi_2018_32_403", "areas": ["A", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Kjaer2020Mortality"]}, {"key": "Klein2021priovi", "text": "Klein JP, Hauer-von Mauschwitz A, Berger T, Fassbinder E, Mayer J, Borgwardt S, et al. Effectiveness and safety of the adjunctive use of an internet-based self-management intervention for borderline personality disorder in addition to care as usual: results from a randomised controlled trial. BMJ Open. 2021;11(9):e047771. PMID 34497078; PMCID PMC8438831; doi:10.1136/bmjopen-2020-047771.", "link": "https://doi.org/10.1136/bmjopen-2020-047771", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Klein2022", "text": "Klein P, Fairweather AK, Lawn S. Structural stigma and its impact on healthcare for borderline personality disorder: a scoping review. Int J Ment Health Syst. 2022;16(1):48. PMID 36175958; PMCID PMC9520817; doi:10.1186/s13033-022-00558-3.", "link": "https://doi.org/10.1186/s13033-022-00558-3", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Kleindienst2008", "text": "Kleindienst N, Bohus M, Ludäscher P, Limberger MF, Kuenkele K, Ebner-Priemer UW, et al. Motives for nonsuicidal self-injury among women with borderline personality disorder. J Nerv Ment Dis. 2008;196(3):230-6. PMID 18340259; doi:10.1097/NMD.0b013e3181663026.", "link": "https://doi.org/10.1097/nmd.0b013e3181663026", "areas": ["C", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Kleindienst2011", "text": "Kleindienst N, Limberger MF, Ebner-Priemer UW, Keibel-Mauchnik J, Dyer A, Berger M, et al. Dissociation predicts poor response to Dialectial Behavioral Therapy in female patients with Borderline Personality Disorder. J Pers Disord. 2011;25(4):432-47. PMID 21838560; doi:10.1521/pedi.2011.25.4.432.", "link": "https://doi.org/10.1521/pedi.2011.25.4.432", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kleindienst2020", "text": "Kleindienst N, Jungkunz M, Bohus M. A proposed severity classification of borderline symptoms using the borderline symptom list (BSL-23). Borderline Personal Disord Emot Dysregul. 2020;7(1):11. PMID 32514359; PMCID PMC7262769; doi:10.1186/s40479-020-00126-6.", "link": "https://doi.org/10.1186/s40479-020-00126-6", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Kliem2010", "text": "Kliem S, Kröger C, Kosfelder J. Dialectical behavior therapy for borderline personality disorder: a meta-analysis using mixed-effects modeling. J Consult Clin Psychol. 2010;78(6):936-951. PMID 21114345; doi:10.1037/a0021015.", "link": "https://doi.org/10.1037/a0021015", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Klonsky2007", "text": "Klonsky ED. The functions of deliberate self-injury: a review of the evidence. Clin Psychol Rev. 2007;27(2):226-39. PMID 17014942; doi:10.1016/j.cpr.2006.08.002.", "link": "https://doi.org/10.1016/j.cpr.2006.08.002", "areas": ["C", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Knaak2015", "text": "Knaak S, Szeto ACh, Fitch K, Modgill G, Patten S. Stigma towards borderline personality disorder: effectiveness and generalizability of an anti-stigma program for healthcare providers using a pre-post randomized design. Borderline Personal Disord Emot Dysregul. 2015;2:9. PMID 26401311; PMCID PMC4579503; doi:10.1186/s40479-015-0030-0.", "link": "https://doi.org/10.1186/s40479-015-0030-0", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Knight1953", "text": "Knight RP. Borderline states. Bull Menninger Clin. 1953;17(1):1-12. PMID 13009379.", "link": "https://pubmed.ncbi.nlm.nih.gov/13009379/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Kockler2022", "text": "Kockler TD, Santangelo PS, Eid M, Kuehner C, Bohus M, Schmaedeke S, et al. Self-esteem instability might be more characteristic of borderline personality disorder than affective instability: Findings from an e-diary study with clinical and healthy controls. J Psychopathol Clin Sci. 2022;131(3):301-313. PMID 35230856; doi:10.1037/abn0000731.", "link": "https://doi.org/10.1037/abn0000731", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Koenig2016", "text": "Koenig J, Kemp AH, Feeling NR, Thayer JF, Kaess M. Resting state vagal tone in borderline personality disorder: A meta-analysis. Prog Neuropsychopharmacol Biol Psychiatry. 2016;64:18-26. PMID 26169575; doi:10.1016/j.pnpbp.2015.07.002.", "link": "https://doi.org/10.1016/j.pnpbp.2015.07.002", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Koenigsberg2009", "text": "Koenigsberg HW, Fan J, Ochsner KN, Liu X, Guise KG, Pizzarello S, et al. Neural correlates of the use of psychological distancing to regulate responses to negative social cues: a study of patients with borderline personality disorder. Biol Psychiatry. 2009;66(9):854-63. PMID 19651401; PMCID PMC2821188; doi:10.1016/j.biopsych.2009.06.010.", "link": "https://doi.org/10.1016/j.biopsych.2009.06.010", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Koenigsberg2014", "text": "Koenigsberg HW, Denny BT, Fan J, Liu X, Guerreri S, Mayson SJ, et al. The neural correlates of anomalous habituation to negative emotional pictures in borderline and avoidant personality disorder patients. Am J Psychiatry. 2014;171(1):82-90. PMID 24275960; PMCID PMC3947284; doi:10.1176/appi.ajp.2013.13070852.", "link": "https://doi.org/10.1176/appi.ajp.2013.13070852", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Konstantinou2021rTMS", "text": "Konstantinou GN, Trevizol AP, Downar J, McMain SF, Vila-Rodriguez F, Daskalakis ZJ, et al. Repetitive transcranial magnetic stimulation in patients with borderline personality disorder: A systematic review. Psychiatry Res. 2021;304:114145. PMID 34358761; doi:10.1016/j.psychres.2021.114145.", "link": "https://doi.org/10.1016/j.psychres.2021.114145", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Korzekwa2008", "text": "Korzekwa MI, Dell PF, Links PS, Thabane L, Webb SP. Estimating the prevalence of borderline personality disorder in psychiatric outpatients using a two-phase procedure. Compr Psychiatry. 2008;49(4):380-6. PMID 18555059; doi:10.1016/j.comppsych.2008.01.007.", "link": "https://doi.org/10.1016/j.comppsych.2008.01.007", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Korzekwa2009", "text": "Korzekwa MI, Dell PF, Links PS, Thabane L, Fougere P. Dissociation in borderline personality disorder: a detailed look. J Trauma Dissociation. 2009;10(3):346-67. PMID 19585341; doi:10.1080/15299730902956838.", "link": "https://doi.org/10.1080/15299730902956838", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Kothgassner2021", "text": "Kothgassner OD, Goreis A, Robinson K, Huscsava MM, Schmahl C, Plener PL. Efficacy of dialectical behavior therapy for adolescent self-harm and suicidal ideation: a systematic review and meta-analysis. Psychol Med. 2021;51(7):1057-1067. PMID 33875025; PMCID PMC8188531; doi:10.1017/s0033291721001355.", "link": "https://doi.org/10.1017/s0033291721001355", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kramer2023SSDI", "text": "Kramer U, Temes CM, Frankenburg FR, Glass IV, Zanarini MC. Course and predictors of social security disability insurance in patients with borderline personality disorder over 24 years of prospective follow-up. Borderline Personal Disord Emot Dysregul. 2023;10(1):30. PMID 37807072; PMCID PMC10561411; doi:10.1186/s40479-023-00236-x.", "link": "https://doi.org/10.1186/s40479-023-00236-x", "areas": ["G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kramer2024GPM", "text": "Kramer U, Grandjean L, Machinea JB, Beuchat H, Ranjbar S, de Roten Y, et al. Emotional processing as mechanism of change in brief good psychiatric management for borderline personality disorder: results of a randomized controlled trial. BMC Psychiatry. 2024;24(1):921. PMID 39696018; PMCID PMC11656953; doi:10.1186/s12888-024-06370-2.", "link": "https://doi.org/10.1186/s12888-024-06370-2", "areas": ["E", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "KrauseUtz2014", "text": "Krause-Utz A, Winter D, Niedtfeld I, Schmahl C. The latest neuroimaging findings in borderline personality disorder. Curr Psychiatry Rep. 2014;16(3):438. PMID 24492919; doi:10.1007/s11920-014-0438-z.", "link": "https://doi.org/10.1007/s11920-014-0438-z", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "KrauseUtz2021", "text": "Krause-Utz A, Frost R, Chatzaki E, Winter D, Schmahl C, Elzinga BM. Dissociation in Borderline Personality Disorder: Recent Experimental, Neurobiological Studies, and Implications for Future Research and Treatment. Curr Psychiatry Rep. 2021;23(6):37. PMID 33909198; PMCID PMC8081699; doi:10.1007/s11920-021-01246-8.", "link": "https://doi.org/10.1007/s11920-021-01246-8", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "KujaHalkola2021", "text": "Kuja-Halkola R, Lind Juto K, Skoglund C, Rück C, Mataix-Cols D, Pérez-Vigil A, et al. Do borderline personality disorder and attention-deficit/hyperactivity disorder co-aggregate in families? A population-based study of 2 million Swedes. Mol Psychiatry. 2021;26(1):341-349. PMID 30323291; PMCID PMC7815504; doi:10.1038/s41380-018-0248-5.", "link": "https://doi.org/10.1038/s41380-018-0248-5", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kujovic2025iTBS", "text": "Kujovic M, Bahr C, Riesbeck M, Benz D, Wingerter L, Deiß M, et al. Effects of intermittent theta burst stimulation add-on to dialectical behavioral therapy in borderline personality disorder: results of a randomized, sham-controlled pilot trial. Eur Arch Psychiatry Clin Neurosci. 2025;275(8):2301-2314. PMID 39297977; PMCID PMC12638378; doi:10.1007/s00406-024-01901-0.", "link": "https://doi.org/10.1007/s00406-024-01901-0", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kulkarni2018Memantine", "text": "Kulkarni J, Thomas N, Hudaib AR, Gavrilidis E, Grigg J, Tan R, et al. Effect of the Glutamate NMDA Receptor Antagonist Memantine as Adjunctive Treatment in Borderline Personality Disorder: An Exploratory, Randomised, Double-Blind, Placebo-Controlled Trial. CNS Drugs. 2018;32(2):179-187. PMID 29549516; doi:10.1007/s40263-018-0506-8.", "link": "https://doi.org/10.1007/s40263-018-0506-8", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kuo2009", "text": "Kuo JR, Linehan MM. Disentangling emotion processes in borderline personality disorder: physiological and self-reported assessment of biological vulnerability, baseline intensity, and reactivity to emotionally evocative stimuli. J Abnorm Psychol. 2009;118(3):531-44. PMID 19685950; PMCID PMC4277483; doi:10.1037/a0016392.", "link": "https://doi.org/10.1037/a0016392", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kuo2016", "text": "Kuo JR, Fitzpatrick S, Metcalfe RK, McMain S. A multi-method laboratory investigation of emotional reactivity and emotion regulation abilities in borderline personality disorder. J Behav Ther Exp Psychiatry. 2016;50:52-60. PMID 26047310; doi:10.1016/j.jbtep.2015.05.002.", "link": "https://doi.org/10.1016/j.jbtep.2015.05.002", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Lak2025", "text": "Lak M, Shakiba S, Dolatshahi B, Saatchi M, Shahrbaf M, Jafarpour A. The prevalence of suicide ideation, suicide attempt and suicide in borderline personality disorder patients: A systematic review and meta-analysis. Gen Hosp Psychiatry. 2025;95:52-61. PMID 40279864; doi:10.1016/j.genhosppsych.2025.04.005.", "link": "https://doi.org/10.1016/j.genhosppsych.2025.04.005", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Lamont2021", "text": "Lamont E, Dickens GL. Mental health services, care provision, and professional support for people diagnosed with borderline personality disorder: systematic review of service-user, family, and carer perspectives. J Ment Health. 2021;30(5):619-633. PMID 31099717; doi:10.1080/09638237.2019.1608923.", "link": "https://doi.org/10.1080/09638237.2019.1608923", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lanfredi2025", "text": "Lanfredi M, Meloni S, Ferrari C, Fruzzetti AE, Geviti A, Macis A, et al. Family Connections: The Impact of an Education Program for Carers of Individuals With Borderline Personality Disorder in Italian Mental Health Services. Fam Process. 2025;64(1):e13098. PMID 39873150; PMCID PMC11774136; doi:10.1111/famp.13098.", "link": "https://doi.org/10.1111/famp.13098", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Laporte2018Stepped", "text": "Laporte L, Paris J, Bergevin T, Fraser R, Cardin JF. Clinical outcomes of a stepped care program for borderline personality disorder. Personal Ment Health. 2018;12(3):252-264. PMID 29709109; doi:10.1002/pmh.1421.", "link": "https://doi.org/10.1002/pmh.1421", "areas": ["E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Larcombe2022", "text": "Larcombe E, Müller A. The relationship between borderline personality disorder and occupational participation: An integrative review. Int J Ment Health Nurs. 2022;31(5):1141-1150. PMID 35536729; doi:10.1111/inm.13014.", "link": "https://doi.org/10.1111/inm.13014", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Large2016", "text": "Large M, Kaneson M, Myles N, Myles H, Gunaratne P, Ryan C. Meta-Analysis of Longitudinal Cohort Studies of Suicide Risk Assessment among Psychiatric Patients: Heterogeneity in Results and Lack of Improvement over Time. PLoS One. 2016;11(6):e0156322. PMID 27285387; PMCID PMC4902221; doi:10.1371/journal.pone.0156322.", "link": "https://doi.org/10.1371/journal.pone.0156322", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Laurenssen2018", "text": "Laurenssen EMP, Luyten P, Kikkert MJ, Westra D, Peen J, Soons MBJ, et al. Day hospital mentalization-based treatment v. specialist treatment as usual in patients with borderline personality disorder: randomized controlled trial. Psychol Med. 2018;48(15):2522-2529. PMID 29478425; doi:10.1017/s0033291718000132.", "link": "https://doi.org/10.1017/s0033291718000132", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lawn2015", "text": "Lawn S, McMahon J. Experiences of care by Australians with a diagnosis of borderline personality disorder. J Psychiatr Ment Health Nurs. 2015;22(7):510-21. PMID 26122817; PMCID PMC4755162; doi:10.1111/jpm.12226.", "link": "https://doi.org/10.1111/jpm.12226", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Lee2026MOBY", "text": "Lee YY, Betts JK, Lardner E, Jackson H, Cotton SM, Gleeson J, et al. Economic evaluation of three forms of early intervention for young people with borderline personality disorder: a within-trial cost-utility analysis from the MOBY clinical trial. Eur Child Adolesc Psychiatry. 2026;35(6):1935-1946. PMID 41838105; PMCID PMC13337604; doi:10.1007/s00787-026-02994-9.", "link": "https://doi.org/10.1007/s00787-026-02994-9", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Leichsenring2024WP", "text": "Leichsenring F, Fonagy P, Heim N, Kernberg OF, Leweke F, Luyten P, et al. Borderline personality disorder: a comprehensive review of diagnosis and clinical presentation, etiology, treatment, and current controversies. World Psychiatry. 2024;23(1):4-25. PMID 38214629; PMCID PMC10786009; doi:10.1002/wps.21156.", "link": "https://doi.org/10.1002/wps.21156", "areas": ["A", "D", "E"], "unverified": false, "validated": "PubMed", "aliases": ["Leichsenring2024"]}, {"key": "Lenzenweger2007", "text": "Lenzenweger MF, Lane MC, Loranger AW, Kessler RC. DSM-IV personality disorders in the National Comorbidity Survey Replication. Biol Psychiatry. 2007;62(6):553-64. PMID 17217923; PMCID PMC2044500; doi:10.1016/j.biopsych.2006.09.019.", "link": "https://doi.org/10.1016/j.biopsych.2006.09.019", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Lequesne2004", "text": "Lequesne ER, Hersh RG. Disclosure of a diagnosis of borderline personality disorder. J Psychiatr Pract. 2004;10(3):170-6. PMID 15330223; doi:10.1097/00131746-200405000-00005.", "link": "https://doi.org/10.1097/00131746-200405000-00005", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lewis1988", "text": "Lewis G, Appleby L. Personality disorder: the patients psychiatrists dislike. Br J Psychiatry. 1988;153:44-9. PMID 3224249; doi:10.1192/bjp.153.1.44.", "link": "https://doi.org/10.1192/bjp.153.1.44", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Lieb2004", "text": "Lieb K, Zanarini MC, Schmahl C, Linehan MM, Bohus M. Borderline personality disorder. Lancet. 2004;364(9432):453-61. PMID 15288745; doi:10.1016/S0140-6736(04)16770-6.", "link": "https://doi.org/10.1016/s0140-6736(04)16770-6", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lieb2010Cochrane", "text": "Lieb K, Völlm B, Rücker G, Timmer A, Stoffers JM. Pharmacotherapy for borderline personality disorder: Cochrane systematic review of randomised trials. Br J Psychiatry. 2010;196(1):4-12. PMID 20044651; doi:10.1192/bjp.bp.108.062984.", "link": "https://doi.org/10.1192/bjp.bp.108.062984", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Lieslehto2023Outcomes", "text": "Lieslehto J, Tiihonen J, Lähteenvuo M, Mittendorfer-Rutz E, Tanskanen A, Taipale H. Association of pharmacological treatments and real-world outcomes in borderline personality disorder. Acta Psychiatr Scand. 2023;147(6):603-613. PMID 37094828; doi:10.1111/acps.13564.", "link": "https://doi.org/10.1111/acps.13564", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Lieslehto2023Suicide", "text": "Lieslehto J, Tiihonen J, Lähteenvuo M, Mittendorfer-Rutz E, Tanskanen A, Taipale H. Comparative Effectiveness of Pharmacotherapies for the Risk of Attempted or Completed Suicide Among Persons With Borderline Personality Disorder. JAMA Netw Open. 2023;6(6):e2317130. PMID 37285156; PMCID PMC10248738; doi:10.1001/jamanetworkopen.2023.17130.", "link": "https://doi.org/10.1001/jamanetworkopen.2023.17130", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Liljedahl2017BA", "text": "Liljedahl SI, Helleman M, Daukantaité D, Westrin Å, Westling S. A standardized crisis management model for self-harming and suicidal individuals with three or more diagnostic criteria of borderline personality disorder: The Brief Admission Skåne randomized controlled trial protocol (BASRCT). BMC Psychiatry. 2017;17(1):220. PMID 28619050; PMCID PMC5472925; doi:10.1186/s12888-017-1371-6.", "link": "https://doi.org/10.1186/s12888-017-1371-6", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Linehan1991", "text": "Linehan MM, Armstrong HE, Suarez A, Allmon D, Heard HL. Cognitive-behavioral treatment of chronically parasuicidal borderline patients. Arch Gen Psychiatry. 1991;48(12):1060-4. PMID 1845222; doi:10.1001/archpsyc.1991.01810360024003.", "link": "https://doi.org/10.1001/archpsyc.1991.01810360024003", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Linehan2006", "text": "Linehan MM, Comtois KA, Murray AM, Brown MZ, Gallop RJ, Heard HL, et al. Two-year randomized controlled trial and follow-up of dialectical behavior therapy vs therapy by experts for suicidal behaviors and borderline personality disorder. Arch Gen Psychiatry. 2006;63(7):757-766. PMID 16818865; doi:10.1001/archpsyc.63.7.757.", "link": "https://doi.org/10.1001/archpsyc.63.7.757", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Linehan2015", "text": "Linehan MM, Korslund KE, Harned MS, Gallop RJ, Lungu A, Neacsiu AD, et al. Dialectical behavior therapy for high suicide risk in individuals with borderline personality disorder: a randomized clinical trial and component analysis. JAMA Psychiatry. 2015;72(5):475-482. PMID 25806661; doi:10.1001/jamapsychiatry.2014.3039.", "link": "https://doi.org/10.1001/jamapsychiatry.2014.3039", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "LinehanWilks2015", "text": "Linehan MM, Wilks CR. The Course and Evolution of Dialectical Behavior Therapy. Am J Psychother. 2015;69(2):97-110. PMID 26160617; doi:10.1176/appi.psychotherapy.2015.69.2.97.", "link": "https://doi.org/10.1176/appi.psychotherapy.2015.69.2.97", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lobbestael2005", "text": "Lobbestael J, Arntz A, Sieswerda S. Schema modes and childhood abuse in borderline and antisocial personality disorders. J Behav Ther Exp Psychiatry. 2005;36(3):240-253. PMID 15953584; doi:10.1016/j.jbtep.2005.05.006.", "link": "https://doi.org/10.1016/j.jbtep.2005.05.006", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lobbestael2008", "text": "Lobbestael J, Van Vreeswijk MF, Arntz A. An empirical test of schema mode conceptualizations in personality disorders. Behav Res Ther. 2008;46(7):854-860. PMID 18460405; doi:10.1016/j.brat.2008.03.006.", "link": "https://doi.org/10.1016/j.brat.2008.03.006", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lobbestael2011", "text": "Lobbestael J, Leurgans M, Arntz A. Inter-rater reliability of the Structured Clinical Interview for DSM-IV Axis I Disorders (SCID I) and Axis II Disorders (SCID II). Clin Psychol Psychother. 2011;18(1):75-9. PMID 20309842; doi:10.1002/cpp.693.", "link": "https://doi.org/10.1002/cpp.693", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Loew2006Topiramate", "text": "Loew TH, Nickel MK, Muehlbacher M, Kaplan P, Nickel C, Kettler C, et al. Topiramate treatment for women with borderline personality disorder: a double-blind, placebo-controlled study. J Clin Psychopharmacol. 2006;26(1):61-6. PMID 16415708; doi:10.1097/01.jcp.0000195113.61291.48.", "link": "https://doi.org/10.1097/01.jcp.0000195113.61291.48", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Loranger1994", "text": "Loranger AW, Sartorius N, Andreoli A, Berger P, Buchheim P, Channabasavanna SM, et al. The International Personality Disorder Examination. The World Health Organization/Alcohol, Drug Abuse, and Mental Health Administration international pilot study of personality disorders. Arch Gen Psychiatry. 1994;51(3):215-24. PMID 8122958; doi:10.1001/archpsyc.1994.03950030051005.", "link": "https://doi.org/10.1001/archpsyc.1994.03950030051005", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lou2021", "text": "Lou J, Sun Y, Cui Z, Gong L. Common and distinct patterns of gray matter alterations in borderline personality disorder and posttraumatic stress disorder: A dual meta-analysis. Neurosci Lett. 2021;741:135376. PMID 33221476; doi:10.1016/j.neulet.2020.135376.", "link": "https://doi.org/10.1016/j.neulet.2020.135376", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Lubke2014", "text": "Lubke GH, Laurin C, Amin N, Hottenga JJ, Willemsen G, van Grootheest G, et al. Genome-wide analyses of borderline personality features. Mol Psychiatry. 2014;19(8):923-9. PMID 23979607; PMCID PMC3872258; doi:10.1038/mp.2013.109.", "link": "https://doi.org/10.1038/mp.2013.109", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ludascher2007", "text": "Ludäscher P, Bohus M, Lieb K, Philipsen A, Jochims A, Schmahl C. Elevated pain thresholds correlate with dissociation and aversive arousal in patients with borderline personality disorder. Psychiatry Res. 2007;149(1-3):291-6. PMID 17126914; doi:10.1016/j.psychres.2005.04.009.", "link": "https://doi.org/10.1016/j.psychres.2005.04.009", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ludascher2010", "text": "Ludäscher P, Valerius G, Stiglmayr C, Mauchnik J, Lanius RA, Bohus M, et al. Pain sensitivity and neural processing during dissociative states in patients with borderline personality disorder with and without comorbid posttraumatic stress disorder: a pilot study. J Psychiatry Neurosci. 2010;35(3):177-84. PMID 20420768; PMCID PMC2861134; doi:10.1503/jpn.090022.", "link": "https://doi.org/10.1503/jpn.090022", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Luykx2025Clozapine", "text": "Luykx JJ, Colgan M, Vieta E, Hamina A, Schulte PFJ, Correll CU, et al. Transdiagnostic effectiveness and safety of clozapine in individuals with psychotic, affective, and personality disorders: nationwide and meta-analytic comparisons with other antipsychotics. Lancet Psychiatry. 2025;12(12):921-931. PMID 41192460; doi:10.1016/S2215-0366(25)00297-4.", "link": "https://doi.org/10.1016/s2215-0366(25)00297-4", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Luyten2020", "text": "Luyten P, Campbell C, Allison E, Fonagy P. The Mentalizing Approach to Psychopathology: State of the Art and Future Directions. Annu Rev Clin Psychol. 2020;16:297-325. PMID 32023093; doi:10.1146/annurev-clinpsy-071919-015355.", "link": "https://doi.org/10.1146/annurev-clinpsy-071919-015355", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lynch2006DBT", "text": "Lynch TR, Chapman AL, Rosenthal MZ, Kuo JR, Linehan MM. Mechanisms of change in dialectical behavior therapy: theoretical and empirical observations. J Clin Psychol. 2006;62(4):459-480. PMID 16470714; doi:10.1002/jclp.20243.", "link": "https://doi.org/10.1002/jclp.20243", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "LyonsRuth2013", "text": "Lyons-Ruth K, Bureau JF, Holmes B, Easterbrooks A, Brooks NH. Borderline symptoms and suicidality/self-injury in late adolescence: prospectively observed relationship correlates in infancy and childhood. Psychiatry Res. 2013;206(2-3):273-81. PMID 23123044; PMCID PMC3605274; doi:10.1016/j.psychres.2012.09.030.", "link": "https://doi.org/10.1016/j.psychres.2012.09.030", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "MadleyDowd2024", "text": "Madley-Dowd P, Ahlqvist VH, Forbes H, Rast JE, Martin FZ, Zhong C, et al. Antiseizure medication use during pregnancy and children's neurodevelopmental outcomes. Nat Commun. 2024;15(1):9640. PMID 39548057; PMCID PMC11568279; doi:10.1038/s41467-024-53813-1.", "link": "https://doi.org/10.1038/s41467-024-53813-1", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Maercker2022", "text": "Maercker A, Cloitre M, Bachem R, Schlumpf YR, Khoury B, Hitchcock C, et al. Complex post-traumatic stress disorder. Lancet. 2022;400(10345):60-72. PMID 35780794; doi:10.1016/S0140-6736(22)00821-2.", "link": "https://doi.org/10.1016/s0140-6736(22)00821-2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Maneta2013", "text": "Maneta EK, Cohen S, Schulz MS, Waldinger RJ. Two to tango: a dyadic analysis of links between borderline personality traits and intimate partner violence. J Pers Disord. 2013;27(2):233-43. PMID 23514186; doi:10.1521/pedi.2013.27.2.233.", "link": "https://doi.org/10.1521/pedi.2013.27.2.233", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Marek2022", "text": "Marek S, Tervo-Clemmens B, Calabro FJ, Montez DF, Kay BP, Hatoum AS, et al. Reproducible brain-wide association studies require thousands of individuals. Nature. 2022;603(7902):654-660. PMID 35296861; PMCID PMC8991999; doi:10.1038/s41586-022-04492-9.", "link": "https://doi.org/10.1038/s41586-022-04492-9", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Markham2003", "text": "Markham D, Trower P. The effects of the psychiatric label 'borderline personality disorder' on nursing staff's perceptions and causal attributions for challenging behaviours. Br J Clin Psychol. 2003;42(Pt 3):243-56. PMID 14565891; doi:10.1348/01446650360703366.", "link": "https://doi.org/10.1348/01446650360703366", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Martinho2014PRN", "text": "Martinho E Jr, Fitzmaurice GM, Frankenburg FR, Zanarini MC. Pro re nata (as needed) psychotropic medication use in patients with borderline personality disorder and subjects with other personality disorders over 14 years of prospective follow-up. J Clin Psychopharmacol. 2014;34(4):499-503. PMID 24875066; PMCID PMC4077949; doi:10.1097/JCP.0000000000000132.", "link": "https://doi.org/10.1097/jcp.0000000000000132", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Martinussen2017", "text": "Martinussen M, Friborg O, Schmierer P, Kaiser S, Øvergård KT, Neunhoeffer AL, et al. The comorbidity of personality disorders in eating disorders: a meta-analysis. Eat Weight Disord. 2017;22(2):201-209. PMID 27995489; doi:10.1007/s40519-016-0345-x.", "link": "https://doi.org/10.1007/s40519-016-0345-x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "May2021", "text": "May T, Pilkington PD, Younan R, Williams K. Overlap of autism spectrum disorder and borderline personality disorder: A systematic review and meta-analysis. Autism Res. 2021;14(12):2688-2710. PMID 34608760; doi:10.1002/aur.2619.", "link": "https://doi.org/10.1002/aur.2619", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "May2023", "text": "May A, Balzan R, Williams AS, Wade TD, Paranjothy SM. Interventions for perinatal borderline personality disorder and complex trauma: a systematic review. Arch Womens Ment Health. 2023;26(3):295-309. PMID 37079042; PMCID PMC10191955; doi:10.1007/s00737-023-01313-4.", "link": "https://doi.org/10.1007/s00737-023-01313-4", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "McCauley2018", "text": "McCauley E, Berk MS, Asarnow JR, Adrian M, Cohen J, Korslund K, et al. Efficacy of Dialectical Behavior Therapy for Adolescents at High Risk for Suicide: A Randomized Clinical Trial. JAMA Psychiatry. 2018;75(8):777-785. PMID 29926087; PMCID PMC6584278; doi:10.1001/jamapsychiatry.2018.1109.", "link": "https://doi.org/10.1001/jamapsychiatry.2018.1109", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "McGlashan2005CLPS", "text": "McGlashan TH, Grilo CM, Sanislow CA, Ralevski E, Morey LC, Gunderson JG, et al. Two-year prevalence and stability of individual DSM-IV criteria for schizotypal, borderline, avoidant, and obsessive-compulsive personality disorders: toward a hybrid model of axis II disorders. Am J Psychiatry. 2005;162(5):883-889. PMID 15863789; PMCID PMC3272783; doi:10.1176/appi.ajp.162.5.883.", "link": "https://doi.org/10.1176/appi.ajp.162.5.883", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "McLaren2022", "text": "McLaren V, Gallagher M, Hopwood CJ, Sharp C. Hypermentalizing and Borderline Personality Disorder: A Meta-Analytic Review. Am J Psychother. 2022;75(1):21-31. PMID 35099264; doi:10.1176/appi.psychotherapy.20210018.", "link": "https://doi.org/10.1176/appi.psychotherapy.20210018", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "McMain2009", "text": "McMain SF, Links PS, Gnam WH, Guimond T, Cardish RJ, Korman L, et al. A randomized trial of dialectical behavior therapy versus general psychiatric management for borderline personality disorder. Am J Psychiatry. 2009;166(12):1365-1374. PMID 19755574; doi:10.1176/appi.ajp.2009.09010039.", "link": "https://doi.org/10.1176/appi.ajp.2009.09010039", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "McMain2012", "text": "McMain SF, Guimond T, Streiner DL, Cardish RJ, Links PS. Dialectical behavior therapy compared with general psychiatric management for borderline personality disorder: clinical outcomes and functioning over a 2-year follow-up. Am J Psychiatry. 2012;169(6):650-661. PMID 22581157; doi:10.1176/appi.ajp.2012.11091416.", "link": "https://doi.org/10.1176/appi.ajp.2012.11091416", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "McMain2017", "text": "McMain SF, Guimond T, Barnhart R, Habinski L, Streiner DL. A randomized trial of brief dialectical behaviour therapy skills training in suicidal patients suffering from borderline disorder. Acta Psychiatr Scand. 2017;135(2):138-148. PMID 27858962; doi:10.1111/acps.12664.", "link": "https://doi.org/10.1111/acps.12664", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "McMain2022", "text": "McMain SF, Chapman AL, Kuo JR, Dixon-Gordon KL, Guimond TH, Labrish C, et al. The Effectiveness of 6 versus 12 Months of Dialectical Behavior Therapy for Borderline Personality Disorder: A Noninferiority Randomized Clinical Trial. Psychother Psychosom. 2022;91(6):382-397. PMID 35738244; doi:10.1159/000525102.", "link": "https://doi.org/10.1159/000525102", "areas": ["E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "McQuaid2024", "text": "McQuaid GA, Strang JF, Jack A. Borderline Personality as a Factor in Late, Missed, and Mis-Diagnosis in Autistic Girls and Women: A Conceptual Analysis. Autism Adulthood. 2024;6(4):401-427. PMID 40018062; PMCID PMC11861065; doi:10.1089/aut.2023.0034.", "link": "https://doi.org/10.1089/aut.2023.0034", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Meador2013NEAD", "text": "Meador KJ, Baker GA, Browning N, Cohen MJ, Bromley RL, Clayton-Smith J, et al. Fetal antiepileptic drug exposure and cognitive outcomes at age 6 years (NEAD study): a prospective observational study. Lancet Neurol. 2013;12(3):244-52. PMID 23352199; PMCID PMC3684942; doi:10.1016/S1474-4422(12)70323-X.", "link": "https://doi.org/10.1016/s1474-4422(12)70323-x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Meaney2016", "text": "Meaney R, Hasking P, Reupert A. Prevalence of Borderline Personality Disorder in University Samples: Systematic Review, Meta-Analysis and Meta-Regression. PLoS One. 2016;11(5):e0155439. PMID 27171206; PMCID PMC4865108; doi:10.1371/journal.pone.0155439.", "link": "https://doi.org/10.1371/journal.pone.0155439", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Mehlum2014", "text": "Mehlum L, Tørmoen AJ, Ramberg M, Haga E, Diep LM, Laberg S, et al. Dialectical behavior therapy for adolescents with repeated suicidal and self-harming behavior: a randomized trial. J Am Acad Child Adolesc Psychiatry. 2014;53(10):1082-1091. PMID 25245352; doi:10.1016/j.jaac.2014.07.003.", "link": "https://doi.org/10.1016/j.jaac.2014.07.003", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Mehlum2016", "text": "Mehlum L, Ramberg M, Tørmoen AJ, Haga E, Diep LM, Stanley BH, et al. Dialectical Behavior Therapy Compared With Enhanced Usual Care for Adolescents With Repeated Suicidal and Self-Harming Behavior: Outcomes Over a One-Year Follow-Up. J Am Acad Child Adolesc Psychiatry. 2016;55(4):295-300. PMID 27015720; doi:10.1016/j.jaac.2016.01.005.", "link": "https://doi.org/10.1016/j.jaac.2016.01.005", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mehlum2026", "text": "Mehlum L, Dibaj IS, Haga E, Helle SE, Morken KTE, Klungsøyr O, et al. Adult life outcomes for adolescents 12.4 years after dialectical behavior therapy - a randomized clinical trial. Eur Child Adolesc Psychiatry. 2026;35(3):983-994. PMID 41543545; PMCID PMC13212379; doi:10.1007/s00787-025-02856-w.", "link": "https://doi.org/10.1007/s00787-025-02856-w", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Meuldijk2017", "text": "Meuldijk D, McCarthy A, Bourke ME, Grenyer BF. The value of psychological treatment for borderline personality disorder: Systematic review and cost offset analysis of economic evaluations. PLoS One. 2017;12(3):e0171592. PMID 28249032; PMCID PMC5332029; doi:10.1371/journal.pone.0171592.", "link": "https://doi.org/10.1371/journal.pone.0171592", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Miller2017EDSAFE", "text": "Miller IW, Camargo CA Jr, Arias SA, Sullivan AF, Allen MH, Goldstein AB, et al. Suicide Prevention in an Emergency Department Population: The ED-SAFE Study. JAMA Psychiatry. 2017;74(6):563-570. PMID 28456130; PMCID PMC5539839; doi:10.1001/jamapsychiatry.2017.0678.", "link": "https://doi.org/10.1001/jamapsychiatry.2017.0678", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Miller2024ED", "text": "Miller J, Nguyen E, Lam AYH, Brann P, Innes S, Buntine P, et al. Experiences of consumers, carers and clinicians during borderline personality disorder presentations to the emergency department-An integrative review. J Psychiatr Ment Health Nurs. 2024;31(4):572-582. PMID 38108606; doi:10.1111/jpm.13009.", "link": "https://doi.org/10.1111/jpm.13009", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "MonkCunliffe2022", "text": "Monk-Cunliffe J, Borschmann R, Monk A, O'Mahoney J, Henderson C, Phillips R, et al. Crisis interventions for adults with borderline personality disorder. Cochrane Database Syst Rev. 2022;9(9):CD009353. PMID 36161394; PMCID PMC9511988; doi:10.1002/14651858.CD009353.pub3.", "link": "https://doi.org/10.1002/14651858.cd009353.pub3", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Morey2013", "text": "Morey LC, Skodol AE. Convergence between DSM-IV-TR and DSM-5 diagnostic models for personality disorder: evaluation of strategies for establishing diagnostic thresholds. J Psychiatr Pract. 2013;19(3):179-93. PMID 23653075; doi:10.1097/01.pra.0000430502.78833.06.", "link": "https://doi.org/10.1097/01.pra.0000430502.78833.06", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Morgan2013Older", "text": "Morgan TA, Chelminski I, Young D, Dalrymple K, Zimmerman M. Differences between older and younger adults with borderline personality disorder on clinical presentation and impairment. J Psychiatr Res. 2013;47(10):1507-13. PMID 23866737; doi:10.1016/j.jpsychires.2013.06.009.", "link": "https://doi.org/10.1016/j.jpsychires.2013.06.009", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Moukhtarian2021", "text": "Moukhtarian TR, Reinhard I, Moran P, Ryckaert C, Skirrow C, Ebner-Priemer U, et al. Comparable emotional dynamics in women with ADHD and borderline personality disorder. Borderline Personal Disord Emot Dysregul. 2021;8(1):6. PMID 33579385; PMCID PMC7879647; doi:10.1186/s40479-021-00144-y.", "link": "https://doi.org/10.1186/s40479-021-00144-y", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Mulay2019", "text": "Mulay AL, Waugh MH, Fillauer JP, Bender DS, Bram A, Cain NM, et al. Borderline personality disorder diagnosis in a new key. Borderline Personal Disord Emot Dysregul. 2019;6:18. PMID 31827801; PMCID PMC6886204; doi:10.1186/s40479-019-0116-1.", "link": "https://doi.org/10.1186/s40479-019-0116-1", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Mulder2020", "text": "Mulder RT, Horwood LJ, Tyrer P. The borderline pattern descriptor in the International Classification of Diseases, 11th Revision: A redundant addition to classification. Aust N Z J Psychiatry. 2020;54(11):1095-1100. PMID 32900208; doi:10.1177/0004867420951608.", "link": "https://doi.org/10.1177/0004867420951608", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Mulder2021", "text": "Mulder RT. ICD-11 Personality Disorders: Utility and Implications of the New Model. Front Psychiatry. 2021;12:655548. PMID 34040555; PMCID PMC8141634; doi:10.3389/fpsyt.2021.655548.", "link": "https://doi.org/10.3389/fpsyt.2021.655548", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Mulder2023", "text": "Mulder R, Tyrer P. Borderline personality disorder: a spurious condition unsupported by science that should be abandoned. J R Soc Med. 2023;116(4):148-150. PMID 37042739; PMCID PMC10164266; doi:10.1177/01410768231164780.", "link": "https://doi.org/10.1177/01410768231164780", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Nadort2009", "text": "Nadort M, Arntz A, Smit JH, Giesen-Bloo J, Eikelenboom M, Spinhoven P, et al. Implementation of outpatient schema therapy for borderline personality disorder with versus without crisis support by the therapist outside office hours: A randomized trial. Behav Res Ther. 2009;47(11):961-973. PMID 19698939; doi:10.1016/j.brat.2009.07.013.", "link": "https://doi.org/10.1016/j.brat.2009.07.013", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "NCT01243658", "text": "Prof. Dr. Markus Heinrichs (sponsor). \"The Effects of Oxytocin on Patients With Borderline Personality Disorder\". ClinicalTrials.gov NCT01243658. Status completed (checked 2026-10-25); start 2011-01; completion 2022-04 (actual); enrolment 138 (actual); phase NA.", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT02097706", "text": "The Alfred. A Randomised Double-blind Placebo Controlled Investigation of the Efficacy of a Novel Drug as an Adjunct in Patients With Borderline Personality Disorder (NMDA receptor antagonist vs inert capsule). ClinicalTrials.gov NCT02097706; recruiting; start 2015-01; enrollment 150 (estimated).", "link": "", "areas": ["F", "G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT02985047", "text": "Region Skane. Brief Admission Skane: Replacing General Admission for Individuals With Self-harm and Acute Risk of Suicide. ClinicalTrials.gov NCT02985047; completed; start 2015-09-01, completion 2018-08-10; enrollment 125 (actual).", "link": "", "areas": ["F"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT03395314", "text": "Yale University (sponsor). A Randomized Active Placebo Controlled Trial of Ketamine in Borderline Personality Disorder. ClinicalTrials.gov NCT03395314. Status terminated (checked 2026-10-25); start 2018-02-15; completion 2022-05-06 (actual); enrolment 22 (actual); phase PHASE2.", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04100096", "text": "Otsuka Pharmaceutical Development & Commercialization. A Trial of Brexpiprazole in the Treatment of Borderline Personality Disorder. ClinicalTrials.gov NCT04100096; completed; start 2019-10-17, completion 2021-06-27; enrollment 332 (actual).", "link": "", "areas": ["F"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04566601", "text": "Boehringer Ingelheim. A Study to Test Different Doses of BI 1358894 and Find Out Whether They Reduce Symptoms in People With Borderline Personality Disorder. ClinicalTrials.gov NCT04566601; completed; start 2020-11-13, completion 2023-01-25; enrollment 390 (actual).", "link": "", "areas": ["F"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05399498", "text": "University of Chicago (sponsor). An Open Label Study of Single-Dose Psilocybin for Major Depressive Disorder With Co-occurring Borderline Personality Disorder. ClinicalTrials.gov NCT05399498. Status completed (checked 2026-10-25); start 2023-11-01; completion 2025-12-01 (actual); enrolment 9 (actual); phase PHASE2.", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05712057", "text": "Duke University (sponsor). Neurostimulation Enhanced Cognitive Restructuring for Transdiagnostic Emotional Dysregulation: A Component Analysis. ClinicalTrials.gov NCT05712057. Status recruiting (checked 2026-10-25); start 2023-05-15; completion 2027-12-01 (estimated); enrolment 240 (estimated); phase NA.", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06259851", "text": "Masarykova Univerzita (sponsor). rTMS-enhanced Psychotherapy for Borderline Personality Disorder. ClinicalTrials.gov NCT06259851. Status active not recruiting (checked 2026-10-25); start 2023-08-20; completion 2026-12 (estimated); enrolment 60 (estimated); phase NA.", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06683014", "text": "Yale University. The Effects of MDMA (3,4-methylenedioxymethamphetamine) in Social Cognition in Borderline Personality Disorder. ClinicalTrials.gov NCT06683014; recruiting; start 2025-09-05; enrollment 10 (estimated).", "link": "", "areas": ["F", "G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06759298", "text": "Tanta University. The Effects of Methylphenidate on Symptomatology in Individuals With Borderline Personality Disorder. ClinicalTrials.gov NCT06759298; not yet recruiting; enrollment 60 (estimated).", "link": "", "areas": ["F"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07099534", "text": "University Hospital, Toulouse. Ketamine Infusion for Symptomatic Improvement in Severe Borderline Personality Disorder: A Pilot Study. ClinicalTrials.gov NCT07099534; not yet recruiting; estimated start 2026-09-01; enrollment 38 (estimated).", "link": "", "areas": ["F", "G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07460947", "text": "Mclean Hospital (sponsor). A Pilot Trial of One Day Accelerated Intermittent Theta-burst Stimulation Plus D-cycloserine in Suicidal Patients With Borderline Personality Disorder (ONE-D BPD). ClinicalTrials.gov NCT07460947. Status recruiting (checked 2026-10-25); start 2026-06-10; completion 2027-12 (estimated); enrolment 20 (estimated); phase PHASE1,PHASE2.", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07551882", "text": "Fundació Institut de Recerca de l'Hospital de la Santa Creu i Sant Pau. Efficacy of Oxytocin Plus Self-compassion Training Combination in Patients With Borderline Personality Disorder. ClinicalTrials.gov NCT07551882; recruiting; start 2024-01-10; enrollment 80 (estimated).", "link": "", "areas": ["F", "G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07569198", "text": "Joshua Rosenblat (sponsor). Combining Ketamine With Dialectical Behavioural Therapy (DBT) for Suicidality in Individuals With Treatment-Resistant Depression and Borderline Personality Disorder: A Phase II Randomized, Midazolam-Controlled Clinical Trial (KET-DBT). ClinicalTrials.gov NCT07569198. Status recruiting (checked 2026-10-25); start 2026-07-16; completion 2029-08 (estimated); enrolment 120 (estimated); phase PHASE2.", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07833761", "text": "University of Minnesota (sponsor). ADEPT: Augmenting DBT Effectiveness With Psilocybin-Assisted Therapy. ClinicalTrials.gov NCT07833761. Status not yet recruiting (checked 2026-10-25); start 2026-12-01; completion 2030-12-31 (estimated); enrolment 18 (estimated); phase PHASE1.", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "Nemeth2018", "text": "Németh N, Mátrai P, Hegyi P, Czéh B, Czopf L, Hussain A, et al. Theory of mind disturbances in borderline personality disorder: A meta-analysis. Psychiatry Res. 2018;270:143-153. PMID 30248485; doi:10.1016/j.psychres.2018.08.049.", "link": "https://doi.org/10.1016/j.psychres.2018.08.049", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ng2016Recovery", "text": "Ng FY, Bourke ME, Grenyer BF. Recovery from Borderline Personality Disorder: A Systematic Review of the Perspectives of Consumers, Clinicians, Family and Carers. PLoS One. 2016;11(8):e0160515. PMID 27504634; PMCID PMC4978398; doi:10.1371/journal.pone.0160515.", "link": "https://doi.org/10.1371/journal.pone.0160515", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ng2019LivedRecovery", "text": "Ng FYY, Townsend ML, Miller CE, Jewell M, Grenyer BFS. The lived experience of recovery in borderline personality disorder: a qualitative study. Borderline Personal Disord Emot Dysregul. 2019;6:10. PMID 31143449; PMCID PMC6532193; doi:10.1186/s40479-019-0107-2.", "link": "https://doi.org/10.1186/s40479-019-0107-2", "areas": ["G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "NICE2009", "text": "National Collaborating Centre for Mental Health (UK). Borderline Personality Disorder: Treatment and Management. NICE Clinical Guideline CG78 (full guideline). Leicester (UK): British Psychological Society; 2009. PMID 21796831 (NCBI Bookshelf).", "link": "https://pubmed.ncbi.nlm.nih.gov/21796831/", "areas": ["A", "D", "F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "NICE2022NG225", "text": "National Institute for Health and Care Excellence. Self-harm: assessment, management and preventing recurrence. NICE guideline NG225. London: NICE; published 7 September 2022. https://www.nice.org.uk/guidance/ng225 (Recommendations 1.5, 1.6, 1.10, 1.11, 1.13 read).", "link": "https://www.nice.org.uk/guidance/ng225", "areas": ["F"], "unverified": false, "validated": "NICE website, 2026-10-25"}, {"key": "NICE2022SelfHarm", "text": "National Institute for Health and Care Excellence. Self-harm: assessment, management and preventing recurrence. NICE guideline NG225. London: NICE; 2022 Sep 7. PMID 36595613 (NCBI Bookshelf). Recommendation wording read from nice.org.uk/guidance/ng225.", "link": "https://pubmed.ncbi.nlm.nih.gov/36595613/", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Nickel2006Aripiprazole", "text": "Nickel MK, Muehlbacher M, Nickel C, Kettler C, Pedrosa Gil F, Bachler E, et al. Aripiprazole in the treatment of patients with borderline personality disorder: a double-blind, placebo-controlled study. Am J Psychiatry. 2006;163(5):833-8. PMID 16648324; doi:10.1176/ajp.2006.163.5.833.", "link": "https://doi.org/10.1176/ajp.2006.163.5.833", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Niederkrotenthaler2010", "text": "Niederkrotenthaler T, Voracek M, Herberth A, Till B, Strauss M, Etzersdorfer E, et al. Role of media reports in completed and prevented suicide: Werther v. Papageno effects. Br J Psychiatry. 2010;197(3):234-43. PMID 20807970; doi:10.1192/bjp.bp.109.074633.", "link": "https://doi.org/10.1192/bjp.bp.109.074633", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Niederkrotenthaler2020", "text": "Niederkrotenthaler T, Braun M, Pirkis J, Till B, Stack S, Sinyor M, et al. Association between suicide reporting in the media and suicide: systematic review and meta-analysis. BMJ. 2020;368:m575. PMID 32188637; PMCID PMC7190013; doi:10.1136/bmj.m575.", "link": "https://doi.org/10.1136/bmj.m575", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Niedtfeld2010", "text": "Niedtfeld I, Schulze L, Kirsch P, Herpertz SC, Bohus M, Schmahl C. Affect regulation and pain in borderline personality disorder: a possible link to the understanding of self-injury. Biol Psychiatry. 2010;68(4):383-91. PMID 20537612; doi:10.1016/j.biopsych.2010.04.015.", "link": "https://doi.org/10.1016/j.biopsych.2010.04.015", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Niedtfeld2017", "text": "Niedtfeld I, Schmitt R, Winter D, Bohus M, Schmahl C, Herpertz SC. Pain-mediated affect regulation is reduced after dialectical behavior therapy in borderline personality disorder: a longitudinal fMRI study. Soc Cogn Affect Neurosci. 2017;12(5):739-747. PMID 28119507; PMCID PMC5460047; doi:10.1093/scan/nsw183.", "link": "https://doi.org/10.1093/scan/nsw183", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Niemantsverdriet2017", "text": "Niemantsverdriet MBA, Slotema CW, Blom JD, Franken IH, Hoek HW, Sommer IEC, et al. Hallucinations in borderline personality disorder: Prevalence, characteristics and associations with comorbid symptoms and disorders. Sci Rep. 2017;7(1):13920. PMID 29066713; PMCID PMC5654997; doi:10.1038/s41598-017-13108-6.", "link": "https://doi.org/10.1038/s41598-017-13108-6", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Niesten2024Dissociation", "text": "Niesten IJM, Glass IV, Zanarini MC. Course and Prediction of Dissociation in Patients with Borderline Personality Disorder and Personality-Disordered Comparison Subjects: A 24-Year Follow-Up Study. J Trauma Dissociation. 2024;25(5):613-627. PMID 39093625; doi:10.1080/15299732.2024.2383192.", "link": "https://doi.org/10.1080/15299732.2024.2383192", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Nock2009", "text": "Nock MK, Prinstein MJ, Sterba SK. Revealing the form and function of self-injurious thoughts and behaviors: A real-time ecological assessment study among adolescents and young adults. J Abnorm Psychol. 2009;118(4):816-27. PMID 19899851; PMCID PMC5258190; doi:10.1037/a0016948.", "link": "https://doi.org/10.1037/a0016948", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Nordkamp2024", "text": "Nordkamp A, Roed K, Videbech P, Midtgaard J. 'Throw me a life buoy, please': A systematic review and thematic synthesis of qualitative evidence regarding nurses' experiences of caring for inpatients with borderline personality disorder and/or non-suicidal self-injury. J Psychiatr Ment Health Nurs. 2024;31(6):1216-1229. PMID 38940193; doi:10.1111/jpm.13077.", "link": "https://doi.org/10.1111/jpm.13077", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Nuij2021", "text": "Nuij C, van Ballegooijen W, de Beurs D, Juniar D, Erlangsen A, Portzky G, et al. Safety planning-type interventions for suicide prevention: meta-analysis. Br J Psychiatry. 2021;219(2):419-426. PMID 35048835; doi:10.1192/bjp.2021.50.", "link": "https://doi.org/10.1192/bjp.2021.50", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Nunes2009", "text": "Nunes PM, Wenzel A, Borges KT, Porto CR, Caminha RM, de Oliveira IR. Volumes of the hippocampus and amygdala in patients with borderline personality disorder: a meta-analysis. J Pers Disord. 2009;23(4):333-45. PMID 19663654; doi:10.1521/pedi.2009.23.4.333.", "link": "https://doi.org/10.1521/pedi.2009.23.4.333", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ociskova2023", "text": "Ociskova M, Prasko J, Vanek J, Nesnidal V, Sollar T, Slepecky M. Stigma and self-stigma in borderline personality disorder: A narrative review. Neuro Endocrinol Lett. 2023;44(4):206-215. PMID 37466060.", "link": "https://pubmed.ncbi.nlm.nih.gov/37466060/", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Ostervang2022", "text": "Østervang C, Geisler Johansen L, Friis-Brixen A, Myhre Jensen C. Experiences of nursing care for patients who self-harm and suggestions for future practices: The perspectives of emergency care nurses. Int J Ment Health Nurs. 2022;31(1):70-82. PMID 34506045; doi:10.1111/inm.12933.", "link": "https://doi.org/10.1111/inm.12933", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Oud2018", "text": "Oud M, Arntz A, Hermens ML, Verhoef R, Kendall T. Specialized psychotherapies for adults with borderline personality disorder: A systematic review and meta-analysis. Aust N Z J Psychiatry. 2018;52(10):949-961. PMID 30091375; PMCID PMC6151959; doi:10.1177/0004867418791257.", "link": "https://doi.org/10.1177/0004867418791257", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Pagura2010PTSD", "text": "Pagura J, Stein MB, Bolton JM, Cox BJ, Grant B, Sareen J. Comorbidity of borderline personality disorder and posttraumatic stress disorder in the U.S. population. J Psychiatr Res. 2010;44(16):1190-1198. PMID 20537660; PMCID PMC4209725; doi:10.1016/j.jpsychires.2010.04.016.", "link": "https://doi.org/10.1016/j.jpsychires.2010.04.016", "areas": ["G", "D"], "unverified": false, "validated": "Europe PMC", "aliases": ["Pagura2010"]}, {"key": "PareMiron2016", "text": "Pare-Miron V, Czuzoj-Shulman N, Oddy L, Spence AR, Abenhaim HA. Effect of Borderline Personality Disorder on Obstetrical and Neonatal Outcomes. Womens Health Issues. 2016;26(2):190-5. PMID 26718528; doi:10.1016/j.whi.2015.11.001.", "link": "https://doi.org/10.1016/j.whi.2015.11.001", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Paris2001", "text": "Paris J, Zweig-Frank H. A 27-year follow-up of patients with borderline personality disorder. Compr Psychiatry. 2001;42(6):482-7. PMID 11704940; doi:10.1053/comp.2001.26271.", "link": "https://doi.org/10.1053/comp.2001.26271", "areas": ["A", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Paris2002", "text": "Paris J. Implications of long-term outcome research for the management of patients with borderline personality disorder. Harv Rev Psychiatry. 2002;10(6):315-23. PMID 12485978; doi:10.1080/10673220216229.", "link": "https://doi.org/10.1080/10673220216229", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Paris2002Chronic", "text": "Paris J. Chronic suicidality among patients with borderline personality disorder. Psychiatr Serv. 2002;53(6):738-42. PMID 12045312; doi:10.1176/appi.ps.53.6.738.", "link": "https://doi.org/10.1176/appi.ps.53.6.738", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Paris2015", "text": "Paris J, Black DW. Borderline personality disorder and bipolar disorder: what is the difference and why does it matter? J Nerv Ment Dis. 2015;203(1):3-7. PMID 25536097; doi:10.1097/NMD.0000000000000225.", "link": "https://doi.org/10.1097/nmd.0000000000000225", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Paris2019Suicidality", "text": "Paris J. Suicidality in Borderline Personality Disorder. Medicina (Kaunas). 2019;55(6):223. PMID 31142033; PMCID PMC6632023; doi:10.3390/medicina55060223.", "link": "https://doi.org/10.3390/medicina55060223", "areas": ["A", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Pascual2008Ziprasidone", "text": "Pascual JC, Soler J, Puigdemont D, Pérez-Egea R, Tiana T, Alvarez E, et al. Ziprasidone in the treatment of borderline personality disorder: a double-blind, placebo-controlled, randomized study. J Clin Psychiatry. 2008;69(4):603-8. PMID 18251623; doi:10.4088/jcp.v69n0412.", "link": "https://doi.org/10.4088/jcp.v69n0412", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Paton2015", "text": "Paton C, Crawford MJ, Bhatti SF, Patel MX, Barnes TR. The use of psychotropic medication in patients with emotionally unstable personality disorder under the care of UK mental health services. J Clin Psychiatry. 2015;76(4):e512-8. PMID 25919844; doi:10.4088/JCP.14m09228.", "link": "https://doi.org/10.4088/jcp.14m09228", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Patorno2017", "text": "Patorno E, Huybrechts KF, Bateman BT, Cohen JM, Desai RJ, Mogun H, et al. Lithium Use in Pregnancy and the Risk of Cardiac Malformations. N Engl J Med. 2017;376(23):2245-2254. PMID 28591541; PMCID PMC5667676; doi:10.1056/NEJMoa1612222.", "link": "https://doi.org/10.1056/nejmoa1612222", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Paudex2025ED", "text": "Paudex T, Endomba FT, Forestier N, Pierandrei A, Chauvet-Gélinier JC, Pinoit JM. Prevalence of Eating Disorders in People With Borderline Personality Disorder: A Systematic Review and Meta-Analysis. Clin Psychol Psychother. 2025;32(5):e70150. PMID 41014207; PMCID PMC12476134; doi:10.1002/cpp.70150.", "link": "https://doi.org/10.1002/cpp.70150", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "PereiraRibeiro2025", "text": "Pereira Ribeiro J, Juul S, Kongerslev MT, Jørgensen MS, Völlm BA, Edemann-Callesen H, et al. Pharmacological interventions for co-occurring psychopathology in people with borderline personality disorder: secondary analysis of the Cochrane systematic review with meta-analyses. Br J Psychiatry. 2025;226(4):226-237. PMID 39428384; PMCID PMC12038388; doi:10.1192/bjp.2024.172.", "link": "https://doi.org/10.1192/bjp.2024.172", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "PereiraRibeiro2026", "text": "Pereira Ribeiro J, Stoffers-Winterling J, Jørgensen MS, Juul S, Matbouriahi M, Fisher D, et al. Treatment Moderators of Symptom Severity in Psychotherapy for People with Borderline Personality Disorder: Systematic Review with Meta-Analyses of Individual Participant Data. Psychother Psychosom. 2026;95(4):283-305. PMID 41134728; doi:10.1159/000548417.", "link": "https://doi.org/10.1159/000548417", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Perroud2011", "text": "Perroud N, Paoloni-Giacobino A, Prada P, Olié E, Salzmann A, Nicastro R, et al. Increased methylation of glucocorticoid receptor gene (NR3C1) in adults with a history of childhood maltreatment: a link with the severity and type of trauma. Transl Psychiatry. 2011;1(12):e59. PMID 22832351; PMCID PMC3309499; doi:10.1038/tp.2011.60.", "link": "https://doi.org/10.1038/tp.2011.60", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Peters2023", "text": "Peters JR, Crowe ML, Morgan T, Zimmerman M, Sharp C, Grilo CM, et al. Borderline personality disorder symptom networks across adolescent and adult clinical samples: examining symptom centrality and replicability. Psychol Med. 2023;53(7):2946-2953. PMID 35094733; PMCID PMC9339041; doi:10.1017/S0033291721004931.", "link": "https://doi.org/10.1017/s0033291721004931", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Petfield2015", "text": "Petfield L, Startup H, Droscher H, Cartwright-Hatton S. Parenting in mothers with borderline personality disorder and impact on child outcomes. Evid Based Ment Health. 2015;18(3):67-75. PMID 26205740; PMCID PMC11234925; doi:10.1136/eb-2015-102163.", "link": "https://doi.org/10.1136/eb-2015-102163", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Philips2024", "text": "Philips B, Leichsenring F, Jordet H, Karterud S. Flaws in the Design of a Randomized Controlled Trial Comparing Short-Term versus Long-Term Mentalization-Based Therapy for Borderline Personality Disorder. Psychother Psychosom. 2024;93(5):346-347. PMID 39084199; PMCID PMC11469651; doi:10.1159/000540309.", "link": "https://doi.org/10.1159/000540309", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Philipsen2008", "text": "Philipsen A, Limberger MF, Lieb K, Feige B, Kleindienst N, Ebner-Priemer U, et al. Attention-deficit hyperactivity disorder as a potentially aggravating factor in borderline personality disorder. Br J Psychiatry. 2008;192(2):118-23. PMID 18245028; doi:10.1192/bjp.bp.107.035782.", "link": "https://doi.org/10.1192/bjp.bp.107.035782", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Plante2013", "text": "Plante DT, Frankenburg FR, Fitzmaurice GM, Zanarini MC. Relationship between sleep disturbance and recovery in patients with borderline personality disorder. J Psychosom Res. 2013;74(4):278-82. PMID 23497827; PMCID PMC3603271; doi:10.1016/j.jpsychores.2013.01.006.", "link": "https://doi.org/10.1016/j.jpsychores.2013.01.006", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pompili2005", "text": "Pompili M, Girardi P, Ruberto A, Tatarelli R. Suicide in borderline personality disorder: a meta-analysis. Nord J Psychiatry. 2005;59(5):319-24. PMID 16757458; doi:10.1080/08039480500320025.", "link": "https://doi.org/10.1080/08039480500320025", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Porter2020", "text": "Porter C, Palmier-Claus J, Branitsky A, Mansell W, Warwick H, Varese F. Childhood adversity and borderline personality disorder: a meta-analysis. Acta Psychiatr Scand. 2020;141(1):6-20. PMID 31630389; doi:10.1111/acps.13118.", "link": "https://doi.org/10.1111/acps.13118", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Prados2015", "text": "Prados J, Stenz L, Courtet P, Prada P, Nicastro R, Adouan W, et al. Borderline personality disorder and childhood maltreatment: a genome-wide methylation analysis. Genes Brain Behav. 2015;14(2):177-88. PMID 25612291; doi:10.1111/gbb.12197.", "link": "https://doi.org/10.1111/gbb.12197", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Prasad2022", "text": "Prasad D, Kuhathasan N, de Azevedo Cardoso T, Suh JS, Frey BN. The prevalence of borderline personality features and borderline personality disorder during the perinatal period: a systematic review and meta-analysis. Arch Womens Ment Health. 2022;25(2):277-289. PMID 35217928; doi:10.1007/s00737-022-01218-8.", "link": "https://doi.org/10.1007/s00737-022-01218-8", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Prossin2010", "text": "Prossin AR, Love TM, Koeppe RA, Zubieta JK, Silk KR. Dysregulation of regional endogenous opioid function in borderline personality disorder. Am J Psychiatry. 2010;167(8):925-33. PMID 20439388; PMCID PMC6863154; doi:10.1176/appi.ajp.2010.09091348.", "link": "https://doi.org/10.1176/appi.ajp.2010.09091348", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Pucker2019Isolation", "text": "Pucker HE, Temes CM, Zanarini MC. Description and prediction of social isolation in borderline patients over 20 years of prospective follow-up. Personal Disord. 2019;10(4):383-388. PMID 31045388; doi:10.1037/per0000337.", "link": "https://doi.org/10.1037/per0000337", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Quirk2015Physical", "text": "Quirk SE, El-Gabalawy R, Brennan SL, Bolton JM, Sareen J, Berk M, et al. Personality disorders and physical comorbidities in adults from the United States: data from the National Epidemiologic Survey on Alcohol and Related Conditions. Soc Psychiatry Psychiatr Epidemiol. 2015;50(5):807-820. PMID 25314916; doi:10.1007/s00127-014-0974-1.", "link": "https://doi.org/10.1007/s00127-014-0974-1", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rameckers2021", "text": "Rameckers SA, Verhoef REJ, Grasman RPPP, Cox WR, van Emmerik AAP, Engelmoer IM, et al. Effectiveness of Psychological Treatments for Borderline Personality Disorder and Predictors of Treatment Outcomes: A Multivariate Multilevel Meta-Analysis of Data from All Design Types. J Clin Med. 2021;10(23):5622. PMID 34884324; PMCID PMC8658126; doi:10.3390/jcm10235622.", "link": "https://doi.org/10.3390/jcm10235622", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Rayner2019", "text": "Rayner G, Blackburn J, Edward KL, Stephenson J, Ousey K. Emergency department nurse's attitudes towards patients who self-harm: A meta-analysis. Int J Ment Health Nurs. 2019;28(1):40-53. PMID 30387232; doi:10.1111/inm.12550.", "link": "https://doi.org/10.1111/inm.12550", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Reed2012Dysphoria", "text": "Reed LI, Fitzmaurice G, Zanarini MC. The course of dysphoric affective and cognitive states in borderline personality disorder: a 10-year follow-up study. Psychiatry Res. 2012;196(1):96-100. PMID 22326877; PMCID PMC3351545; doi:10.1016/j.psychres.2011.08.026.", "link": "https://doi.org/10.1016/j.psychres.2011.08.026", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Reed2019", "text": "Reed GM, First MB, Kogan CS, Hyman SE, Gureje O, Gaebel W, et al. Innovations and changes in the ICD-11 classification of mental, behavioural and neurodevelopmental disorders. World Psychiatry. 2019;18(1):3-19. PMID 30600616; PMCID PMC6313247; doi:10.1002/wps.20611.", "link": "https://doi.org/10.1002/wps.20611", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "ReichbornKjennerud2015", "text": "Reichborn-Kjennerud T, Czajkowski N, Ystrøm E, Ørstavik R, Aggen SH, Tambs K, et al. A longitudinal twin study of borderline and antisocial personality disorder traits in early to middle adulthood. Psychol Med. 2015;45(14):3121-31. PMID 26050739; PMCID PMC4589465; doi:10.1017/S0033291715001117.", "link": "https://doi.org/10.1017/s0033291715001117", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Reichl2021", "text": "Reichl C, Kaess M. Self-harm in the context of borderline personality disorder. Curr Opin Psychol. 2021;37:139-144. PMID 33548678; doi:10.1016/j.copsyc.2020.12.007.", "link": "https://doi.org/10.1016/j.copsyc.2020.12.007", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Reitz2012", "text": "Reitz S, Krause-Utz A, Pogatzki-Zahn EM, Ebner-Priemer U, Bohus M, Schmahl C. Stress regulation and incision in borderline personality disorder--a pilot study modeling cutting behavior. J Pers Disord. 2012;26(4):605-15. PMID 22867510; doi:10.1521/pedi.2012.26.4.605.", "link": "https://doi.org/10.1521/pedi.2012.26.4.605", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Reitz2015", "text": "Reitz S, Kluetsch R, Niedtfeld I, Knorz T, Lis S, Paret C, et al. Incision and stress regulation in borderline personality disorder: neurobiological mechanisms of self-injurious behaviour. Br J Psychiatry. 2015;207(2):165-72. PMID 25906795; doi:10.1192/bjp.bp.114.153379.", "link": "https://doi.org/10.1192/bjp.bp.114.153379", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Renneberg2012", "text": "Renneberg B, Herm K, Hahn A, Staebler K, Lammers CH, Roepke S. Perception of social participation in borderline personality disorder. Clin Psychol Psychother. 2012;19(6):473-80. PMID 22076727; doi:10.1002/cpp.772.", "link": "https://doi.org/10.1002/cpp.772", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Reynolds2019", "text": "Reynolds CJ, Tragesser SL. Borderline Personality Disorder Features Are Associated with Concurrent Pain-Related Disability in a Chronic Pain Sample. Pain Med. 2019;20(2):233-245. PMID 29618083; doi:10.1093/pm/pny052.", "link": "https://doi.org/10.1093/pm/pny052", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Riffer2019", "text": "Riffer F, Farkas M, Streibl L, Kaiser E, Sprung M. Psychopharmacological treatment of patients with borderline personality disorder: comparing data from routine clinical care with recommended guidelines. Int J Psychiatry Clin Pract. 2019;23(3):178-188. PMID 31140337; doi:10.1080/13651501.2019.1576904.", "link": "https://doi.org/10.1080/13651501.2019.1576904", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ring2019", "text": "Ring D, Lawn S. Stigma perpetuation at the interface of mental health care: a review to compare patient and clinician perspectives of stigma and borderline personality disorder. J Ment Health. 2025;34(1):57-77 (published online 2019). PMID 30862201; doi:10.1080/09638237.2019.1581337.", "link": "https://doi.org/10.1080/09638237.2019.1581337", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Rinne2002", "text": "Rinne T, van den Brink W, Wouters L, van Dyck R. SSRI treatment of borderline personality disorder: a randomized, placebo-controlled clinical trial for female patients with borderline personality disorder. Am J Psychiatry. 2002;159(12):2048-54. PMID 12450955; doi:10.1176/appi.ajp.159.12.2048.", "link": "https://doi.org/10.1176/appi.ajp.159.12.2048", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Rohde2018Clozapine", "text": "Rohde C, Polcwiartek C, Correll CU, Nielsen J. Real-World Effectiveness of Clozapine for Borderline Personality Disorder: Results From a 2-Year Mirror-Image Study. J Pers Disord. 2018;32(6):823-837. PMID 29120277; doi:10.1521/pedi_2017_31_328.", "link": "https://doi.org/10.1521/pedi_2017_31_328", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "RomeuLabayen2020", "text": "Romeu-Labayen M, Rigol Cuadra MA, Galbany-Estragués P, Blanco Corbal S, Giralt Palou RM, Tort-Nasarre G. Borderline personality disorder in a community setting: service users' experiences of the therapeutic relationship with mental health nurses. Int J Ment Health Nurs. 2020;29(5):868-877. PMID 32304273; doi:10.1111/inm.12720.", "link": "https://doi.org/10.1111/inm.12720", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Rosenthal2008", "text": "Rosenthal MZ, Gratz KL, Kosson DS, Cheavens JS, Lejuez CW, Lynch TR. Borderline personality disorder and emotional responding: a review of the research literature. Clin Psychol Rev. 2008;28(1):75-91. PMID 17544188; doi:10.1016/j.cpr.2007.04.001.", "link": "https://doi.org/10.1016/j.cpr.2007.04.001", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Rossouw2012MBTA", "text": "Rossouw TI, Fonagy P. Mentalization-based treatment for self-harm in adolescents: a randomized controlled trial. J Am Acad Child Adolesc Psychiatry. 2012;51(12):1304-1313.e3. PMID 23200287; doi:10.1016/j.jaac.2012.09.018.", "link": "https://doi.org/10.1016/j.jaac.2012.09.018", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Rothman2024Brexpiprazole", "text": "Rothman B, Brewer C, Chang D, Hobart M, Hefting N, McQuade RD, et al. A randomised study and an extension study of brexpiprazole in patients with borderline personality disorder. Acta Neuropsychiatr. 2024;37:e39. PMID 39558901; PMCID PMC13130291; doi:10.1017/neu.2024.31.", "link": "https://doi.org/10.1017/neu.2024.31", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ruggero2010", "text": "Ruggero CJ, Zimmerman M, Chelminski I, Young D. Borderline personality disorder and the misdiagnosis of bipolar disorder. J Psychiatr Res. 2010;44(6):405-8. PMID 19889426; PMCID PMC2849890; doi:10.1016/j.jpsychires.2009.09.011.", "link": "https://doi.org/10.1016/j.jpsychires.2009.09.011", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ruocco2012", "text": "Ruocco AC, Amirthavasagam S, Zakzanis KK. Amygdala and hippocampal volume reductions as candidate endophenotypes for borderline personality disorder: a meta-analysis of magnetic resonance imaging studies. Psychiatry Res. 2012;201(3):245-52. PMID 22507760; doi:10.1016/j.pscychresns.2012.02.012.", "link": "https://doi.org/10.1016/j.pscychresns.2012.02.012", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ruocco2013", "text": "Ruocco AC, Amirthavasagam S, Choi-Kain LW, McMain SF. Neural correlates of negative emotionality in borderline personality disorder: an activation-likelihood-estimation meta-analysis. Biol Psychiatry. 2013;73(2):153-60. PMID 22906520; doi:10.1016/j.biopsych.2012.07.014.", "link": "https://doi.org/10.1016/j.biopsych.2012.07.014", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Rusch2006", "text": "Rüsch N, Hölzer A, Hermann C, Schramm E, Jacob GA, Bohus M, et al. Self-stigma in women with borderline personality disorder and women with social phobia. J Nerv Ment Dis. 2006;194(10):766-73. PMID 17041289; doi:10.1097/01.nmd.0000239898.48701.dc.", "link": "https://doi.org/10.1097/01.nmd.0000239898.48701.dc", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Rusch2007", "text": "Rüsch N, Lieb K, Göttler I, Hermann C, Schramm E, Richter H, et al. Shame and implicit self-concept in women with borderline personality disorder. Am J Psychiatry. 2007;164(3):500-8. PMID 17329476; doi:10.1176/ajp.2007.164.3.500.", "link": "https://doi.org/10.1176/ajp.2007.164.3.500", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Sadikaj2010", "text": "Sadikaj G, Russell JJ, Moskowitz DS, Paris J. Affect dysregulation in individuals with borderline personality disorder: persistence and interpersonal triggers. J Pers Assess. 2010;92(6):490-500. PMID 20954051; doi:10.1080/00223891.2010.513287.", "link": "https://doi.org/10.1080/00223891.2010.513287", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Salzman1995", "text": "Salzman C, Wolfson AN, Schatzberg A, Looper J, Henke R, Albanese M, et al. Effect of fluoxetine on anger in symptomatic volunteers with borderline personality disorder. J Clin Psychopharmacol. 1995;15(1):23-9. PMID 7714224; doi:10.1097/00004714-199502000-00005.", "link": "https://doi.org/10.1097/00004714-199502000-00005", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Samaritans116123", "text": "Samaritans. Contact a Samaritan: call 116 123, free from any phone, day or night, in the UK and Ireland. https://www.samaritans.org/how-we-can-help/contact-samaritan/", "link": "https://www.samaritans.org/how-we-can-help/contact-samaritan/", "areas": ["F"], "unverified": false, "validated": "Samaritans website, 2026-10-25"}, {"key": "SamaritansMedia", "text": "Samaritans. 10 top tips for reporting suicide. Samaritans media guidelines. https://www.samaritans.org/about-samaritans/media-guidelines/10-top-tips-reporting-suicide/ (page read 2026-10-25; no date shown).", "link": "https://www.samaritans.org/about-samaritans/media-guidelines/10-top-tips-reporting-suicide/", "areas": ["F"], "unverified": false, "validated": "Samaritans website, 2026-10-25"}, {"key": "SAMHSA988", "text": "Substance Abuse and Mental Health Services Administration. 988 Suicide & Crisis Lifeline: \"988 offers 24/7 judgment-free support... Text, call, or chat 988.\" https://www.samhsa.gov/mental-health/988", "link": "https://www.samhsa.gov/mental-health/988", "areas": ["F"], "unverified": false, "validated": "SAMHSA website, 2026-10-25"}, {"key": "SamuelWidiger2008", "text": "Samuel DB, Widiger TA. A meta-analytic review of the relationships between the five-factor model and DSM-IV-TR personality disorders: a facet level analysis. Clin Psychol Rev. 2008;28(8):1326-42. PMID 18708274; PMCID PMC2614445; doi:10.1016/j.cpr.2008.07.002.", "link": "https://doi.org/10.1016/j.cpr.2008.07.002", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Sanislow2002", "text": "Sanislow CA, Grilo CM, Morey LC, Bender DS, Skodol AE, Gunderson JG, et al. Confirmatory factor analysis of DSM-IV criteria for borderline personality disorder: findings from the collaborative longitudinal personality disorders study. Am J Psychiatry. 2002;159(2):284-90. PMID 11823272; doi:10.1176/appi.ajp.159.2.284.", "link": "https://doi.org/10.1176/appi.ajp.159.2.284", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sansone2001", "text": "Sansone RA, Whitecar P, Meier BP, Murry A. The prevalence of borderline personality among primary care patients with chronic pain. Gen Hosp Psychiatry. 2001;23(4):193-7. PMID 11543845; doi:10.1016/s0163-8343(01)00148-7.", "link": "https://doi.org/10.1016/s0163-8343(01)00148-7", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sansone2011Gender", "text": "Sansone RA, Sansone LA. Gender patterns in borderline personality disorder. Innov Clin Neurosci. 2011;8(5):16-20. PMID 21686143; PMCID PMC3115767.", "link": "https://pubmed.ncbi.nlm.nih.gov/21686143/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Sansone2013Clinicians", "text": "Sansone RA, Sansone LA. Responses of mental health clinicians to patients with borderline personality disorder. Innov Clin Neurosci. 2013;10(5-6):39-43. PMID 23882440; PMCID PMC3719460.", "link": "https://pubmed.ncbi.nlm.nih.gov/23882440/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Santangelo2014", "text": "Santangelo P, Reinhard I, Mussgay L, Steil R, Sawitzki G, Klein C, et al. Specificity of affective instability in patients with borderline personality disorder compared to posttraumatic stress disorder, bulimia nervosa, and healthy controls. J Abnorm Psychol. 2014;123(1):258-72. PMID 24661176; PMCID PMC4254796; doi:10.1037/a0035619.", "link": "https://doi.org/10.1037/a0035619", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Santangelo2018", "text": "Santangelo PS, Koenig J, Kockler TD, Eid M, Holtmann J, Koudela-Hamila S, et al. Affective instability across the lifespan in borderline personality disorder - a cross-sectional e-diary study. Acta Psychiatr Scand. 2018;138(5):409-419. PMID 30146733; doi:10.1111/acps.12950.", "link": "https://doi.org/10.1111/acps.12950", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Santangelo2020", "text": "Santangelo PS, Kockler TD, Zeitler ML, Knies R, Kleindienst N, Bohus M, et al. Self-esteem instability and affective instability in everyday life after remission from borderline personality disorder. Borderline Personal Disord Emot Dysregul. 2020;7(1):25. PMID 33292714; PMCID PMC7684893; doi:10.1186/s40479-020-00140-8.", "link": "https://doi.org/10.1186/s40479-020-00140-8", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Schmahl2006", "text": "Schmahl C, Bohus M, Esposito F, Treede RD, Di Salle F, Greffrath W, et al. Neural correlates of antinociception in borderline personality disorder. Arch Gen Psychiatry. 2006;63(6):659-67. PMID 16754839; doi:10.1001/archpsyc.63.6.659.", "link": "https://doi.org/10.1001/archpsyc.63.6.659", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Schmahl2012", "text": "Schmahl C, Kleindienst N, Limberger M, Ludäscher P, Mauchnik J, Deibler P, et al. Evaluation of naltrexone for dissociative symptoms in borderline personality disorder. Int Clin Psychopharmacol. 2012;27(1):61-8. PMID 22002175; doi:10.1097/YIC.0b013e32834d0e50.", "link": "https://doi.org/10.1097/yic.0b013e32834d0e50", "areas": ["C", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Schmitz2020", "text": "Schmitz M, Müller LE, Schulz A, Kleindienst N, Herpertz SC, Bertsch K. Heart and brain: Cortical representation of cardiac signals is disturbed in borderline personality disorder, but unaffected by oxytocin administration. J Affect Disord. 2020;264:24-28. PMID 31846808; doi:10.1016/j.jad.2019.11.139.", "link": "https://doi.org/10.1016/j.jad.2019.11.139", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Schneider2020Oxytocin", "text": "Schneider I, Boll S, Volman I, Roelofs K, Spohn A, Herpertz SC, et al. Oxytocin Normalizes Approach-Avoidance Behavior in Women With Borderline Personality Disorder. Front Psychiatry. 2020;11:120. PMID 32218744; PMCID PMC7078372; doi:10.3389/fpsyt.2020.00120.", "link": "https://doi.org/10.3389/fpsyt.2020.00120", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Schroeder2013", "text": "Schroeder K, Fisher HL, Schäfer I. Psychotic symptoms in patients with borderline personality disorder: prevalence and clinical management. Curr Opin Psychiatry. 2013;26(1):113-9. PMID 23168909; doi:10.1097/YCO.0b013e32835a2ae7.", "link": "https://doi.org/10.1097/yco.0b013e32835a2ae7", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Schulz2008Olanzapine", "text": "Schulz SC, Zanarini MC, Bateman A, Bohus M, Detke HC, Trzaskoma Q, et al. Olanzapine for the treatment of borderline personality disorder: variable dose 12-week randomised double-blind placebo-controlled study. Br J Psychiatry. 2008;193(6):485-92. PMID 19043153; doi:10.1192/bjp.bp.107.037903.", "link": "https://doi.org/10.1192/bjp.bp.107.037903", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Schulze2011", "text": "Schulze L, Domes G, Krüger A, Berger C, Fleischer M, Prehn K, et al. Neuronal correlates of cognitive reappraisal in borderline patients with affective instability. Biol Psychiatry. 2011;69(6):564-73. PMID 21195392; doi:10.1016/j.biopsych.2010.10.025.", "link": "https://doi.org/10.1016/j.biopsych.2010.10.025", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Schulze2016", "text": "Schulze L, Schmahl C, Niedtfeld I. Neural Correlates of Disturbed Emotion Processing in Borderline Personality Disorder: A Multimodal Meta-Analysis. Biol Psychiatry. 2016;79(2):97-106. PMID 25935068; doi:10.1016/j.biopsych.2015.03.027.", "link": "https://doi.org/10.1016/j.biopsych.2015.03.027", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Schulze2019", "text": "Schulze L, Schulze A, Renneberg B, Schmahl C, Niedtfeld I. Neural Correlates of Affective Disturbances: A Comparative Meta-analysis of Negative Affect Processing in Borderline Personality Disorder, Major Depressive Disorder, and Posttraumatic Stress Disorder. Biol Psychiatry Cogn Neurosci Neuroimaging. 2019;4(3):220-232. PMID 30581154; doi:10.1016/j.bpsc.2018.11.004.", "link": "https://doi.org/10.1016/j.bpsc.2018.11.004", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Scott2025Ketamine", "text": "Scott E, Thekkuden DT, Kerr K, Meurk C. Ketamine/esketamine in the treatment of depression with comorbid borderline personality disorder or traits: A systematic review of effectiveness. Aust N Z J Psychiatry. 2025;59(12):1046-1058. PMID 40974230; doi:10.1177/00048674251374472.", "link": "https://doi.org/10.1177/00048674251374472", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Seigerman2020", "text": "Seigerman MR, Betts JK, Hulbert C, McKechnie B, Rayner VK, Jovev M, et al. A study comparing the experiences of family and friends of young people with borderline personality disorder features with family and friends of young people with other serious illnesses and general population adults. Borderline Personal Disord Emot Dysregul. 2020;7:17. PMID 32704374; PMCID PMC7374854; doi:10.1186/s40479-020-00128-4.", "link": "https://doi.org/10.1186/s40479-020-00128-4", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sempertegui2013", "text": "Sempértegui GA, Karreman A, Arntz A, Bekker MH. Schema therapy for borderline personality disorder: a comprehensive review of its empirical foundations, effectiveness and implementation possibilities. Clin Psychol Rev. 2013;33(3):426-447. PMID 23422036; doi:10.1016/j.cpr.2012.11.006.", "link": "https://doi.org/10.1016/j.cpr.2012.11.006", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Shafiei2024", "text": "Shafiei G, Keller AS, Bertolero M, Shanmugan S, Bassett DS, Chen AA, et al. Generalizable Links Between Borderline Personality Traits and Functional Connectivity. Biol Psychiatry. 2024;96(6):486-494. PMID 38460580; PMCID PMC11338739; doi:10.1016/j.biopsych.2024.02.1016.", "link": "https://doi.org/10.1016/j.biopsych.2024.02.1016", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Shah2018", "text": "Shah R, Zanarini MC. Comorbidity of Borderline Personality Disorder: Current Status and Future Directions. Psychiatr Clin North Am. 2018;41(4):583-593. PMID 30447726; doi:10.1016/j.psc.2018.07.009.", "link": "https://doi.org/10.1016/j.psc.2018.07.009", "areas": ["D", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Shah2018Comorbidity"]}, {"key": "Shanks2011", "text": "Shanks C, Pfohl B, Blum N, Black DW. Can negative attitudes toward patients with borderline personality disorder be changed? The effect of attending a STEPPS workshop. J Pers Disord. 2011;25(6):806-12. PMID 22217226; doi:10.1521/pedi.2011.25.6.806.", "link": "https://doi.org/10.1521/pedi.2011.25.6.806", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sharan2023", "text": "Sharan P, Das N, Hans G. Clinical Practice Guidelines for Assessment and Management of Patients with Borderline Personality Disorder. Indian J Psychiatry. 2023;65(2):221-237. PMID 37063623; PMCID PMC10096204; doi:10.4103/indianjpsychiatry.indianjpsychiatry_495_22.", "link": "https://doi.org/10.4103/indianjpsychiatry.indianjpsychiatry_495_22", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sharp2011", "text": "Sharp C, Pane H, Ha C, Venta A, Patel AB, Sturek J, et al. Theory of mind and emotion regulation difficulties in adolescents with borderline traits. J Am Acad Child Adolesc Psychiatry. 2011;50(6):563-573.e1. PMID 21621140; doi:10.1016/j.jaac.2011.01.017.", "link": "https://doi.org/10.1016/j.jaac.2011.01.017", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Sharp2015", "text": "Sharp C, Fonagy P. Practitioner Review: Borderline personality disorder in adolescence--recent conceptualization, intervention, and implications for clinical practice. J Child Psychol Psychiatry. 2015;56(12):1266-88. PMID 26251037; doi:10.1111/jcpp.12449.", "link": "https://doi.org/10.1111/jcpp.12449", "areas": ["A", "D"], "unverified": false, "validated": "PubMed", "aliases": ["Sharp2015JCPP"]}, {"key": "Sharp2015JAP", "text": "Sharp C, Wright AG, Fowler JC, Frueh BC, Allen JG, Oldham J, et al. The structure of personality pathology: Both general ('g') and specific ('s') factors? J Abnorm Psychol. 2015;124(2):387-98. PMID 25730515; doi:10.1037/abn0000033.", "link": "https://doi.org/10.1037/abn0000033", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sheehan2016", "text": "Sheehan L, Nieweglowski K, Corrigan P. The Stigma of Personality Disorders. Curr Psychiatry Rep. 2016;18(1):11. PMID 26780206; doi:10.1007/s11920-015-0654-1.", "link": "https://doi.org/10.1007/s11920-015-0654-1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Shin2026", "text": "Shin H, Choi W, Chung YS, Park H, Oh UJ, Choi SW, et al. A pilot randomized controlled trial of mentalization-based treatment and structured clinical management for outpatients with borderline personality disorder in South Korea. Borderline Personal Disord Emot Dysregul. 2026;13(1):32. PMID 42421108; PMCID PMC13628851; doi:10.1186/s40479-026-00354-2.", "link": "https://doi.org/10.1186/s40479-026-00354-2", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sicorello2021", "text": "Sicorello M, Schmahl C. Emotion dysregulation in borderline personality disorder: A fronto-limbic imbalance? Curr Opin Psychol. 2021;37:114-120. PMID 33422855; doi:10.1016/j.copsyc.2020.12.002.", "link": "https://doi.org/10.1016/j.copsyc.2020.12.002", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Silberschmidt2015", "text": "Silberschmidt A, Lee S, Zanarini M, Schulz SC. Gender Differences in Borderline Personality Disorder: Results From a Multinational, Clinical Trial Sample. J Pers Disord. 2015;29(6):828-38. PMID 25562535; doi:10.1521/pedi_2014_28_175.", "link": "https://doi.org/10.1521/pedi_2014_28_175", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Silbersweig2007", "text": "Silbersweig D, Clarkin JF, Goldstein M, Kernberg OF, Tuescher O, Levy KN, et al. Failure of frontolimbic inhibitory function in the context of negative emotion in borderline personality disorder. Am J Psychiatry. 2007;164(12):1832-41. PMID 18056238; doi:10.1176/appi.ajp.2007.06010126.", "link": "https://doi.org/10.1176/appi.ajp.2007.06010126", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Silverman2012Anxiety", "text": "Silverman MH, Frankenburg FR, Reich DB, Fitzmaurice G, Zanarini MC. The course of anxiety disorders other than PTSD in patients with borderline personality disorder and Axis II comparison subjects: a 10-year follow-up study. J Pers Disord. 2012;26(5):804-814. PMID 23013347; PMCID PMC3551625; doi:10.1521/pedi.2012.26.5.804.", "link": "https://doi.org/10.1521/pedi.2012.26.5.804", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Simeon2011", "text": "Simeon D, Bartz J, Hamilton H, Crystal S, Braun A, Ketay S, et al. Oxytocin administration attenuates stress reactivity in borderline personality disorder: a pilot study. Psychoneuroendocrinology. 2011;36(9):1418-21. PMID 21546164; doi:10.1016/j.psyneuen.2011.03.013.", "link": "https://doi.org/10.1016/j.psyneuen.2011.03.013", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Sims2022", "text": "Sims E, Nelson KJ, Sisti D. Borderline personality disorder, therapeutic privilege, integrated care: is it ethical to withhold a psychiatric diagnosis? J Med Ethics. 2022;48(11):801-804. PMID 34261801; doi:10.1136/medethics-2021-107216.", "link": "https://doi.org/10.1136/medethics-2021-107216", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sisti2016", "text": "Sisti D, Segal AG, Siegel AM, Johnson R, Gunderson J. Diagnosing, Disclosing, and Documenting Borderline Personality Disorder: A Survey of Psychiatrists' Practices. J Pers Disord. 2016;30(6):848-856. PMID 26623537; doi:10.1521/pedi_2015_29_228.", "link": "https://doi.org/10.1521/pedi_2015_29_228", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Skodol2003", "text": "Skodol AE, Bender DS. Why are women diagnosed borderline more than men? Psychiatr Q. 2003;74(4):349-60. PMID 14686459; doi:10.1023/a:1026087410516.", "link": "https://doi.org/10.1023/a:1026087410516", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Skodol2005CLPS", "text": "Skodol AE, Gunderson JG, Shea MT, McGlashan TH, Morey LC, Sanislow CA, et al. The Collaborative Longitudinal Personality Disorders Study (CLPS): overview and implications. J Pers Disord. 2005;19(5):487-504. PMID 16274278; PMCID PMC3289284; doi:10.1521/pedi.2005.19.5.487.", "link": "https://doi.org/10.1521/pedi.2005.19.5.487", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Skodol2011", "text": "Skodol AE, Bender DS, Morey LC, Clark LA, Oldham JM, Alarcon RD, et al. Personality disorder types proposed for DSM-5. J Pers Disord. 2011;25(2):136-69. PMID 21466247; doi:10.1521/pedi.2011.25.2.136.", "link": "https://doi.org/10.1521/pedi.2011.25.2.136", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Skoglund2021", "text": "Skoglund C, Tiger A, Rück C, Petrovic P, Asherson P, Hellner C, et al. Familial risk and heritability of diagnosed borderline personality disorder: a register study of the Swedish population. Mol Psychiatry. 2021;26(3):999-1008. PMID 31160693; PMCID PMC7910208; doi:10.1038/s41380-019-0442-0.", "link": "https://doi.org/10.1038/s41380-019-0442-0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Smith2020Attachment", "text": "Smith M, South S. Romantic attachment style and borderline personality pathology: A meta-analysis. Clin Psychol Rev. 2020;75:101781. PMID 31918217; doi:10.1016/j.cpr.2019.101781.", "link": "https://doi.org/10.1016/j.cpr.2019.101781", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Soeteman2008Cost", "text": "Soeteman DI, Hakkaart-van Roijen L, Verheul R, Busschbach JJ. The economic burden of personality disorders in mental health care. J Clin Psychiatry. 2008;69(2):259-65. PMID 18363454; doi:10.4088/jcp.v69n0212.", "link": "https://doi.org/10.4088/jcp.v69n0212", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Soeteman2008QoL", "text": "Soeteman DI, Verheul R, Busschbach JJ. The burden of disease in personality disorders: diagnosis-specific quality of life. J Pers Disord. 2008;22(3):259-68. PMID 18540798; doi:10.1521/pedi.2008.22.3.259.", "link": "https://doi.org/10.1521/pedi.2008.22.3.259", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Soloff1986Haloperidol", "text": "Soloff PH, George A, Nathan RS, Schulz PM, Ulrich RF, Perel JM. Progress in pharmacotherapy of borderline disorders. A double-blind study of amitriptyline, haloperidol, and placebo. Arch Gen Psychiatry. 1986;43(7):691-7. PMID 3521532; doi:10.1001/archpsyc.1986.01800070081010.", "link": "https://doi.org/10.1001/archpsyc.1986.01800070081010", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Soloff1993Phenelzine", "text": "Soloff PH, Cornelius J, George A, Nathan S, Perel JM, Ulrich RF. Efficacy of phenelzine and haloperidol in borderline personality disorder. Arch Gen Psychiatry. 1993;50(5):377-85. PMID 8489326; doi:10.1001/archpsyc.1993.01820170055007.", "link": "https://doi.org/10.1001/archpsyc.1993.01820170055007", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Soloff2019Suicidal", "text": "Soloff PH, Chiappetta L. 10-Year Outcome of Suicidal Behavior in Borderline Personality Disorder. J Pers Disord. 2019;33(1):82-100. PMID 29469667; PMCID PMC9237746; doi:10.1521/pedi_2018_32_332.", "link": "https://doi.org/10.1521/pedi_2018_32_332", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Spitzer1979", "text": "Spitzer RL, Endicott J, Gibbon M. Crossing the border into borderline personality and borderline schizophrenia. The development of criteria. Arch Gen Psychiatry. 1979;36(1):17-24. PMID 760694; doi:10.1001/archpsyc.1979.01780010023001.", "link": "https://doi.org/10.1001/archpsyc.1979.01780010023001", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Staebler2011CPP", "text": "Staebler K, Helbing E, Rosenbach C, Renneberg B. Rejection sensitivity and borderline personality disorder. Clin Psychol Psychother. 2011;18(4):275-83. PMID 21110407; doi:10.1002/cpp.705.", "link": "https://doi.org/10.1002/cpp.705", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Staebler2011PsycholMed", "text": "Staebler K, Renneberg B, Stopsack M, Fiedler P, Weiler M, Roepke S. Facial emotional expression in reaction to social exclusion in borderline personality disorder. Psychol Med. 2011;41(9):1929-38. PMID 21306661; doi:10.1017/S0033291711000080.", "link": "https://doi.org/10.1017/s0033291711000080", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Stanley2010AJP", "text": "Stanley B, Siever LJ. The interpersonal dimension of borderline personality disorder: toward a neuropeptide model. Am J Psychiatry. 2010;167(1):24-39. PMID 19952075; PMCID PMC4176877; doi:10.1176/appi.ajp.2009.09050744.", "link": "https://doi.org/10.1176/appi.ajp.2009.09050744", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Stanley2010JAD", "text": "Stanley B, Sher L, Wilson S, Ekman R, Huang YY, Mann JJ. Non-suicidal self-injurious behavior, endogenous opioids and monoamine neurotransmitters. J Affect Disord. 2010;124(1-2):134-40. PMID 19942295; PMCID PMC2875354; doi:10.1016/j.jad.2009.10.028.", "link": "https://doi.org/10.1016/j.jad.2009.10.028", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Stanley2018ED", "text": "Stanley B, Brown GK, Brenner LA, Galfalvy HC, Currier GW, Knox KL, et al. Comparison of the Safety Planning Intervention With Follow-up vs Usual Care of Suicidal Patients Treated in the Emergency Department. JAMA Psychiatry. 2018;75(9):894-900. PMID 29998307; PMCID PMC6142908; doi:10.1001/jamapsychiatry.2018.1776.", "link": "https://doi.org/10.1001/jamapsychiatry.2018.1776", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Stapleton2019", "text": "Stapleton A, Wright N. The experiences of people with borderline personality disorder admitted to acute psychiatric inpatient wards: a meta-synthesis. J Ment Health. 2019;28(4):443-457. PMID 28686468; doi:10.1080/09638237.2017.1340594.", "link": "https://doi.org/10.1080/09638237.2017.1340594", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Steele2019", "text": "Steele KR, Townsend ML, Grenyer BFS. Parenting and personality disorder: An overview and meta-synthesis of systematic reviews. PLoS One. 2019;14(10):e0223038. PMID 31574104; PMCID PMC6772038; doi:10.1371/journal.pone.0223038.", "link": "https://doi.org/10.1371/journal.pone.0223038", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Stein2007PAI", "text": "Stein MB, Pinsker-Aspen JH, Hilsenroth MJ. Borderline pathology and the Personality Assessment Inventory (PAI): an evaluation of criterion and concurrent validity. J Pers Assess. 2007;88(1):81-9. PMID 17266418; doi:10.1080/00223890709336838.", "link": "https://doi.org/10.1080/00223890709336838", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Stepp2012", "text": "Stepp SD, Whalen DJ, Pilkonis PA, Hipwell AE, Levine MD. Children of mothers with borderline personality disorder: identifying parenting behaviors as potential targets for intervention. Personal Disord. 2012;3(1):76-91. PMID 22299065; PMCID PMC3268672; doi:10.1037/a0023081.", "link": "https://doi.org/10.1037/a0023081", "areas": ["B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Stepp2014", "text": "Stepp SD, Whalen DJ, Scott LN, Zalewski M, Loeber R, Hipwell AE. Reciprocal effects of parenting and borderline personality disorder symptoms in adolescent girls. Dev Psychopathol. 2014;26(2):361-78. PMID 24443951; PMCID PMC4103652; doi:10.1017/S0954579413001041.", "link": "https://doi.org/10.1017/s0954579413001041", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Stepp2017", "text": "Stepp SD, Lazarus SA. Identifying a borderline personality disorder prodrome: Implications for community screening. Personal Ment Health. 2017;11(3):195-205. PMID 28786230; doi:10.1002/pmh.1389.", "link": "https://doi.org/10.1002/pmh.1389", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Stern1938", "text": "Stern A. Psychoanalytic Investigation of and Therapy in the Border Line Group of Neuroses. Psychoanal Q. 1938;7(4):467-489. doi:10.1080/21674086.1938.11925367.", "link": "https://doi.org/10.1080/21674086.1938.11925367", "areas": ["A"], "unverified": false, "validated": "Crossref"}, {"key": "Stiglmayr2001", "text": "Stiglmayr CE, Shapiro DA, Stieglitz RD, Limberger MF, Bohus M. Experience of aversive tension and dissociation in female patients with borderline personality disorder -- a controlled study. J Psychiatr Res. 2001;35(2):111-8. PMID 11377440; doi:10.1016/s0022-3956(01)00012-7.", "link": "https://doi.org/10.1016/s0022-3956(01)00012-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Stiglmayr2008", "text": "Stiglmayr CE, Ebner-Priemer UW, Bretz J, Behm R, Mohse M, Lammers CH, et al. Dissociative symptoms are positively related to stress in borderline personality disorder. Acta Psychiatr Scand. 2008;117(2):139-47. PMID 18028248; doi:10.1111/j.1600-0447.2007.01126.x.", "link": "https://doi.org/10.1111/j.1600-0447.2007.01126.x", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Stoffers2012", "text": "Stoffers JM, Völlm BA, Rücker G, Timmer A, Huband N, Lieb K. Psychological therapies for people with borderline personality disorder. Cochrane Database Syst Rev. 2012(8):CD005652. PMID 22895952; PMCID PMC6481907; doi:10.1002/14651858.cd005652.pub2.", "link": "https://doi.org/10.1002/14651858.cd005652.pub2", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "StoffersWinterling2022", "text": "Stoffers-Winterling JM, Storebø OJ, Pereira Ribeiro J, Kongerslev MT, Völlm BA, Mattivi JT, et al. Pharmacological interventions for people with borderline personality disorder. Cochrane Database Syst Rev. 2022;11(11):CD012956. PMID 36375174; PMCID PMC9662763; doi:10.1002/14651858.CD012956.pub2.", "link": "https://doi.org/10.1002/14651858.cd012956.pub2", "areas": ["F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "StoffersWinterling2022BJP", "text": "Stoffers-Winterling JM, Storebø OJ, Kongerslev MT, Faltinsen E, Todorovac A, Sedoc Jørgensen M, et al. Psychotherapies for borderline personality disorder: a focused systematic review and meta-analysis. Br J Psychiatry. 2022;221(3):538-552. PMID 35088687; doi:10.1192/bjp.2021.204.", "link": "https://doi.org/10.1192/bjp.2021.204", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Storebo2020", "text": "Storebø OJ, Stoffers-Winterling JM, Völlm BA, Kongerslev MT, Mattivi JT, Jørgensen MS, et al. Psychological therapies for people with borderline personality disorder. Cochrane Database Syst Rev. 2020;5:CD012955. PMID 32368793; PMCID PMC7199382; doi:10.1002/14651858.cd012955.pub2.", "link": "https://doi.org/10.1002/14651858.cd012955.pub2", "areas": ["E", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Streit2022", "text": "Streit F, Witt SH, Awasthi S, Foo JC, Jungkunz M, Frank J, et al. Borderline personality disorder and the big five: molecular genetic analyses indicate shared genetic architecture with neuroticism and openness. Transl Psychiatry. 2022;12(1):153. PMID 35411043; PMCID PMC9001677; doi:10.1038/s41398-022-01912-2.", "link": "https://doi.org/10.1038/s41398-022-01912-2", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Streit2025medRxiv", "text": "Streit F, Awasthi S, Hall AS, Braun A, Niarchou M, Marouli E, et al. Genome-wide association study of borderline personality disorder identifies 11 loci and highlights shared risk with mental and somatic disorders. medRxiv. 2025. PMID 40832388; PMCID PMC12363718; doi:10.1101/2024.11.12.24316957.", "link": "https://doi.org/10.1101/2024.11.12.24316957", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Streit2026", "text": "Streit F, Awasthi S, Hall ASM, Braun A, Niarchou M, Marouli E, et al. Genome-wide association analyses of borderline personality disorder identify 11 loci and highlight shared risk with mental and somatic disorders. Nat Genet. 2026;58(8):1831-1844. PMID 42477112; PMCID PMC13447106; doi:10.1038/s41588-026-02654-3.", "link": "https://doi.org/10.1038/s41588-026-02654-3", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Sturrock2014", "text": "Sturrock B, Mellor D. Perceived emotional invalidation and borderline personality disorder features: a test of theory. Personal Ment Health. 2014;8(2):128-42. PMID 24700736; doi:10.1002/pmh.1249.", "link": "https://doi.org/10.1002/pmh.1249", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "SvedWilliams2021", "text": "Sved Williams A, Osborn A, Yelland C, Hollamby S. Changing intergenerational patterns of emotional dysregulation in families with perinatal borderline personality disorder. Arch Womens Ment Health. 2021;24(4):641-648. PMID 33742283; doi:10.1007/s00737-021-01119-2.", "link": "https://doi.org/10.1007/s00737-021-01119-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tadayonnejad2026rTMS", "text": "Tadayonnejad R, Gera R, Chu SA, Hawkins H, Hovhannisyan E, Ngo TDP, et al. Ventrolateral prefrontal-amygdala repetitive transcranial magnetic stimulation (rTMS) modulation of impulsivity in borderline personality disorder: a proof-of-concept study. Sci Rep. 2026;16(1):26833. PMID 42286136; PMCID PMC13518863; doi:10.1038/s41598-026-56692-2.", "link": "https://doi.org/10.1038/s41598-026-56692-2", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Tan2025", "text": "Tan SY, Hope J. Is Brief Admission Effective for Individuals With Lived Experience of Borderline Personality Disorder (BPD) When Experiencing Crisis? A Mixed Systematic Review. Int J Ment Health Nurs. 2025;34(1):e13503. PMID 39785101; doi:10.1111/inm.13503.", "link": "https://doi.org/10.1111/inm.13503", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Temes2017", "text": "Temes CM, Magni LR, Fitzmaurice GM, Aguirre BA, Goodman M, Zanarini MC. Prevalence and severity of childhood adversity in adolescents with BPD, psychiatrically healthy adolescents, and adults with BPD. Personal Ment Health. 2017;11(3):171-178. PMID 28786232; doi:10.1002/pmh.1387.", "link": "https://doi.org/10.1002/pmh.1387", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Temes2019", "text": "Temes CM, Frankenburg FR, Fitzmaurice GM, Zanarini MC. Deaths by Suicide and Other Causes Among Patients With Borderline Personality Disorder and Personality-Disordered Comparison Subjects Over 24 Years of Prospective Follow-Up. J Clin Psychiatry. 2019;80(1):18m12436. PMID 30688417; doi:10.4088/JCP.18m12436.", "link": "https://doi.org/10.4088/jcp.18m12436", "areas": ["A", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Temes2020", "text": "Temes CM, Magni LR, Aguirre BA, Goodman M, Ridolfi ME, Zanarini MC. Parameters of reported childhood sexual abuse and assault in adolescents and adults with borderline personality disorder. Personal Ment Health. 2020;14(3):254-262. PMID 31960623; PMCID PMC10501328; doi:10.1002/pmh.1475.", "link": "https://doi.org/10.1002/pmh.1475", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Theriault2026", "text": "Thériault C, Cailhol L, Poirier S, Bérubé FA, Ouellet E, David P, et al. Le Trouble de la Personnalité Limite à L’ère de TikTok : Exploration Qualitative des Discours D’internautes: Borderline Personality Disorder in the Age of TikTok: A Qualitative Exploration of Internet Users’ Comments. Can J Psychiatry. 2026;71(4):307-316. PMID 41637311; PMCID PMC13009609; doi:10.1177/07067437251411023.", "link": "https://doi.org/10.1177/07067437251411023", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Thomas2019Cortisol", "text": "Thomas N, Gurvich C, Hudaib AR, Gavrilidis E, Kulkarni J. Systematic review and meta-analysis of basal cortisol levels in Borderline Personality Disorder compared to non-psychiatric controls. Psychoneuroendocrinology. 2019;102:149-157. PMID 30557762; doi:10.1016/j.psyneuen.2018.12.009.", "link": "https://doi.org/10.1016/j.psyneuen.2018.12.009", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Thompson2020", "text": "Thompson KN, Jackson H, Cavelti M, Betts J, McCutcheon L, Jovev M, et al. Number of Borderline Personality Disorder Criteria and Depression Predict Poor Functioning and Quality of Life in Outpatient Youth. J Pers Disord. 2020;34(6):785-798. PMID 30689518; doi:10.1521/pedi_2019_33_411.", "link": "https://doi.org/10.1521/pedi_2019_33_411", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Tomko2014", "text": "Tomko RL, Trull TJ, Wood PK, Sher KJ. Characteristics of borderline personality disorder in a community sample: comorbidity, treatment utilization, and general functioning. J Pers Disord. 2014;28(5):734-50. PMID 25248122; PMCID PMC3864176; doi:10.1521/pedi_2012_26_093.", "link": "https://doi.org/10.1521/pedi_2012_26_093", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Tomson2018", "text": "Tomson T, Battino D, Bonizzoni E, Craig J, Lindhout D, Perucca E, et al. Comparative risk of major congenital malformations with eight different antiepileptic drugs: a prospective cohort study of the EURAP registry. Lancet Neurol. 2018;17(6):530-538. PMID 29680205; doi:10.1016/S1474-4422(18)30107-8.", "link": "https://doi.org/10.1016/s1474-4422(18)30107-8", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Torgersen2000", "text": "Torgersen S, Lygren S, Oien PA, Skre I, Onstad S, Edvardsen J, et al. A twin study of personality disorders. Compr Psychiatry. 2000;41(6):416-25. PMID 11086146; doi:10.1053/comp.2000.16560.", "link": "https://doi.org/10.1053/comp.2000.16560", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Torgersen2001", "text": "Torgersen S, Kringlen E, Cramer V. The prevalence of personality disorders in a community sample. Arch Gen Psychiatry. 2001;58(6):590-6. PMID 11386989; doi:10.1001/archpsyc.58.6.590.", "link": "https://doi.org/10.1001/archpsyc.58.6.590", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Torgersen2008", "text": "Torgersen S, Czajkowski N, Jacobson K, Reichborn-Kjennerud T, Røysamb E, Neale MC, et al. Dimensional representations of DSM-IV cluster B personality disorders in a population-based sample of Norwegian twins: a multivariate study. Psychol Med. 2008;38(11):1617-25. PMID 18275631; doi:10.1017/S0033291708002924.", "link": "https://doi.org/10.1017/s0033291708002924", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tritt2005Lamotrigine", "text": "Tritt K, Nickel C, Lahmann C, Leiberich PK, Rother WK, Loew TH, et al. Lamotrigine treatment of aggression in female borderline-patients: a randomized, double-blind, placebo-controlled study. J Psychopharmacol. 2005;19(3):287-91. PMID 15888514; doi:10.1177/0269881105051540.", "link": "https://doi.org/10.1177/0269881105051540", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Trull2008", "text": "Trull TJ, Solhan MB, Tragesser SL, Jahng S, Wood PK, Piasecki TM, et al. Affective instability: measuring a core feature of borderline personality disorder with ecological momentary assessment. J Abnorm Psychol. 2008;117(3):647-61. PMID 18729616; doi:10.1037/a0012532.", "link": "https://doi.org/10.1037/a0012532", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Trull2010", "text": "Trull TJ, Jahng S, Tomko RL, Wood PK, Sher KJ. Revised NESARC personality disorder diagnoses: gender, prevalence, and comorbidity with substance dependence disorders. J Pers Disord. 2010;24(4):412-26. PMID 20695803; PMCID PMC3771514; doi:10.1521/pedi.2010.24.4.412.", "link": "https://doi.org/10.1521/pedi.2010.24.4.412", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Trull2018", "text": "Trull TJ, Freeman LK, Vebares TJ, Choate AM, Helle AC, Wycoff AM. Borderline personality disorder and substance use disorders: an updated review. Borderline Personal Disord Emot Dysregul. 2018;5:15. PMID 30250740; PMCID PMC6145127; doi:10.1186/s40479-018-0093-9.", "link": "https://doi.org/10.1186/s40479-018-0093-9", "areas": ["D", "G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Trull2018SUD"]}, {"key": "Trull2022", "text": "Trull TJ, Hepp J, Wycoff AM, Vebares TJ, Fleming MN, Hua JPY, et al. Relations between lab indices of emotion dysregulation and negative affect reactivity in daily life in two independent studies. J Affect Disord. 2022;297:217-224. PMID 34695499; PMCID PMC8629845; doi:10.1016/j.jad.2021.10.031.", "link": "https://doi.org/10.1016/j.jad.2021.10.031", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Turner2024", "text": "Turner BJ, McKnight B, Helps CE, Yeo SN, Barbic S. Peer support for borderline personality disorder: A critical review of its feasibility, acceptability, and alignment with concepts of recovery. Personal Disord. 2024;15(6):425-435. PMID 39101926; doi:10.1037/per0000683.", "link": "https://doi.org/10.1037/per0000683", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tyrer2015Lancet", "text": "Tyrer P, Reed GM, Crawford MJ. Classification, assessment, prevalence, and effect of personality disorder. Lancet. 2015;385(9969):717-726. PMID 25706217; doi:10.1016/s0140-6736(14)61995-4.", "link": "https://doi.org/10.1016/s0140-6736(14)61995-4", "areas": ["G", "D"], "unverified": false, "validated": "Europe PMC", "aliases": ["Tyrer2015"]}, {"key": "Tyrer2019", "text": "Tyrer P, Mulder R, Kim YR, Crawford MJ. The Development of the ICD-11 Classification of Personality Disorders: An Amalgam of Science, Pragmatism, and Politics. Annu Rev Clin Psychol. 2019;15:481-502. PMID 30601688; doi:10.1146/annurev-clinpsy-050718-095736.", "link": "https://doi.org/10.1146/annurev-clinpsy-050718-095736", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Usher2024GPMA", "text": "Usher C, Freeman I, Wesemann D, Ross E, Fleisher C, Choi-Kain L. The Impact of a One-Day Workshop on Good Psychiatric Management for Adolescent (GPM-A) Borderline Personality Disorder. Acad Psychiatry. 2024;48(4):346-350. PMID 38782842; doi:10.1007/s40596-024-01984-w.", "link": "https://doi.org/10.1007/s40596-024-01984-w", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "vanAsselt2008", "text": "van Asselt AD, Dirksen CD, Arntz A, Giesen-Bloo JH, van Dyck R, Spinhoven P, et al. Out-patient psychotherapy for borderline personality disorder: cost-effectiveness of schema-focused therapy v. transference-focused psychotherapy. Br J Psychiatry. 2008;192(6):450-457. PMID 18515897; doi:10.1192/bjp.bp.106.033597.", "link": "https://doi.org/10.1192/bjp.bp.106.033597", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "vanSchie2024", "text": "van Schie CC, Lewis K, Barr KR, Jewell M, Malcolmson N, Townsend ML, et al. Borderline personality disorder and stigma: Lived experience perspectives on helpful and hurtful language. Personal Ment Health. 2024;18(3):216-226. PMID 38482732; doi:10.1002/pmh.1609.", "link": "https://doi.org/10.1002/pmh.1609", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Verheul2003", "text": "Verheul R, Van Den Bosch LM, Koeter MW, De Ridder MA, Stijnen T, Van Den Brink W. Dialectical behaviour therapy for women with borderline personality disorder: 12-month, randomised clinical trial in The Netherlands. Br J Psychiatry. 2003;182:135-140. PMID 12562741; doi:10.1192/bjp.182.2.135.", "link": "https://doi.org/10.1192/bjp.182.2.135", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Volkert2018", "text": "Volkert J, Gablonski TC, Rabung S. Prevalence of personality disorders in the general adult population in Western countries: systematic review and meta-analysis. Br J Psychiatry. 2018;213(6):709-715. PMID 30261937; doi:10.1192/bjp.2018.202.", "link": "https://doi.org/10.1192/bjp.2018.202", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Wagner2014DBTCost", "text": "Wagner T, Fydrich T, Stiglmayr C, Marschall P, Salize HJ, Renneberg B, et al. Societal cost-of-illness in patients with borderline personality disorder one year before, during and after dialectical behavior therapy in routine outpatient care. Behav Res Ther. 2014;61:12-22. PMID 25113523; doi:10.1016/j.brat.2014.07.004.", "link": "https://doi.org/10.1016/j.brat.2014.07.004", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Wagner2022Cost", "text": "Wagner T, Assmann N, Köhne S, Schaich A, Alvarez-Fischer D, Borgwardt S, et al. The societal cost of treatment-seeking patients with borderline personality disorder in Germany. Eur Arch Psychiatry Clin Neurosci. 2022;272(4):741-752. PMID 34605983; PMCID PMC9095542; doi:10.1007/s00406-021-01332-1.", "link": "https://doi.org/10.1007/s00406-021-01332-1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Wertz2020", "text": "Wertz J, Caspi A, Ambler A, Arseneault L, Belsky DW, Danese A, et al. Borderline Symptoms at Age 12 Signal Risk for Poor Outcomes During the Transition to Adulthood: Findings From a Genetically Sensitive Longitudinal Cohort Study. J Am Acad Child Adolesc Psychiatry. 2020;59(10):1165-1177.e2. PMID 31325594; PMCID PMC6980181; doi:10.1016/j.jaac.2019.07.005.", "link": "https://doi.org/10.1016/j.jaac.2019.07.005", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Westling2019BA", "text": "Westling S, Daukantaite D, Liljedahl SI, Oh Y, Westrin Å, Flyckt L, et al. Effect of Brief Admission to Hospital by Self-referral for Individuals Who Self-harm and Are at Risk of Suicide: A Randomized Clinical Trial. JAMA Netw Open. 2019;2(6):e195463. PMID 31173128; PMCID PMC6563573; doi:10.1001/jamanetworkopen.2019.5463.", "link": "https://doi.org/10.1001/jamanetworkopen.2019.5463", "areas": ["F", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Westling2019"]}, {"key": "Wetzelaer2017", "text": "Wetzelaer P, Lokkerbo J, Arntz A, van Aselt T, Smit F, Evers S. Cost-effectiveness and Budget Impact of Specialized Psychotherapy for Borderline Personality Disorder: A Synthesis of the Evidence. J Ment Health Policy Econ. 2017;20(4):177-190. PMID 29300704. No DOI listed.", "link": "https://pubmed.ncbi.nlm.nih.gov/29300704/", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "WHO2022ICD11", "text": "World Health Organization. ICD-11 for Mortality and Morbidity Statistics: 6D10 Personality disorder; 6D11 Prominent personality traits or patterns; 6D11.5 Borderline pattern. Geneva: WHO; 2022. https://icd.who.int (unverified: the icd.who.int browser is script-rendered and returned no readable content to the validation tools; the codes and wording were cross-checked against their reproduction in Sharan2023 and Bach2018BMC)", "link": "https://icd.who.int", "areas": ["D"], "unverified": true}, {"key": "WHO2023Media", "text": "World Health Organization. Preventing suicide: a resource for media professionals, update 2023. Geneva: WHO; 12 September 2023. ISBN 978-92-4-007684-6. https://www.who.int/publications/i/item/9789240076846 (catalogue record read; PDF not accessible).", "link": "https://www.who.int/publications/i/item/9789240076846", "areas": ["F"], "unverified": false, "validated": "WHO publications catalogue, 2026-10-25"}, {"key": "Wibbelink2026BOOTS", "text": "Wibbelink CJM, Kamphuis JH, Sinnaeve R, Grasman RPPP, Alberts J, Alkema M, et al. Dialectical Behavior Therapy vs Schema Therapy for Patients With Borderline Personality Disorder: The BOOTS Multicenter Randomized Clinical Trial. JAMA Psychiatry. 2026;83(7):669-681. PMID 42018336; doi:10.1001/jamapsychiatry.2026.0418.", "link": "https://doi.org/10.1001/jamapsychiatry.2026.0418", "areas": ["E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Widom2009", "text": "Widom CS, Czaja SJ, Paris J. A prospective investigation of borderline personality disorder in abused and neglected children followed up into adulthood. J Pers Disord. 2009;23(5):433-46. PMID 19817626; doi:10.1521/pedi.2009.23.5.433.", "link": "https://doi.org/10.1521/pedi.2009.23.5.433", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Willis2017", "text": "Willis F, Kuniss S, Kleindienst N, Naoum J, Reitz S, Boll S, et al. The role of nociceptive input and tissue injury on stress regulation in borderline personality disorder. Pain. 2017;158(3):479-487. PMID 27941497; doi:10.1097/j.pain.0000000000000787.", "link": "https://doi.org/10.1097/j.pain.0000000000000787", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Winograd2008", "text": "Winograd G, Cohen P, Chen H. Adolescent borderline symptoms in the community: prognosis for functioning over 20 years. J Child Psychol Psychiatry. 2008;49(9):933-941. PMID 18665882; doi:10.1111/j.1469-7610.2008.01930.x.", "link": "https://doi.org/10.1111/j.1469-7610.2008.01930.x", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Winsper2012", "text": "Winsper C, Zanarini M, Wolke D. Prospective study of family adversity and maladaptive parenting in childhood and borderline personality disorder symptoms in a non-clinical population at 11 years. Psychol Med. 2012;42(11):2405-20. PMID 22475090; doi:10.1017/S0033291712000542.", "link": "https://doi.org/10.1017/s0033291712000542", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Winsper2016", "text": "Winsper C, Lereya ST, Marwaha S, Thompson A, Eyden J, Singh SP. The aetiological and psychopathological validity of borderline personality disorder in youth: A systematic review and meta-analysis. Clin Psychol Rev. 2016;44:13-24. PMID 26709502; doi:10.1016/j.cpr.2015.12.001.", "link": "https://doi.org/10.1016/j.cpr.2015.12.001", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Winsper2017", "text": "Winsper C, Hall J, Strauss VY, Wolke D. Aetiological pathways to Borderline Personality Disorder symptoms in early adolescence: childhood dysregulated behaviour, maladaptive parenting and bully victimisation. Borderline Personal Disord Emot Dysregul. 2017;4:10. PMID 28588894; PMCID PMC5457614; doi:10.1186/s40479-017-0060-x.", "link": "https://doi.org/10.1186/s40479-017-0060-x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Winsper2017Sleep", "text": "Winsper C, Tang NK, Marwaha S, Lereya ST, Gibbs M, Thompson A, et al. The sleep phenotype of Borderline Personality Disorder: A systematic review and meta-analysis. Neurosci Biobehav Rev. 2017;73:48-67. PMID 27988314; doi:10.1016/j.neubiorev.2016.12.008.", "link": "https://doi.org/10.1016/j.neubiorev.2016.12.008", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Winsper2020", "text": "Winsper C, Bilgin A, Thompson A, Marwaha S, Chanen AM, Singh SP, et al. The prevalence of personality disorders in the community: a global systematic review and meta-analysis. Br J Psychiatry. 2020;216(2):69-78. PMID 31298170; doi:10.1192/bjp.2019.166.", "link": "https://doi.org/10.1192/bjp.2019.166", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Witt2017", "text": "Witt SH, Streit F, Jungkunz M, Frank J, Awasthi S, Reinbold CS, et al. Genome-wide association study of borderline personality disorder reveals genetic overlap with bipolar disorder, major depression and schizophrenia. Transl Psychiatry. 2017;7(6):e1155. PMID 28632202; PMCID PMC5537640; doi:10.1038/tp.2017.115.", "link": "https://doi.org/10.1038/tp.2017.115", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Witt2021", "text": "Witt KG, Hetrick SE, Rajaram G, Hazell P, Taylor Salisbury TL, Townsend E, et al. Pharmacological interventions for self-harm in adults. Cochrane Database Syst Rev. 2021;1(1):CD013669. PMID 35608866; PMCID PMC8094615; doi:10.1002/14651858.CD013669.pub2.", "link": "https://doi.org/10.1002/14651858.cd013669.pub2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Wolke2012", "text": "Wolke D, Schreier A, Zanarini MC, Winsper C. Bullied by peers in childhood and borderline personality symptoms at 11 years of age: a prospective study. J Child Psychol Psychiatry. 2012;53(8):846-55. PMID 22380520; doi:10.1111/j.1469-7610.2012.02542.x.", "link": "https://doi.org/10.1111/j.1469-7610.2012.02542.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Yu2019BJP", "text": "Yu H, Meng YJ, Li XJ, Zhang C, Liang S, Li ML, et al. Common and distinct patterns of grey matter alterations in borderline personality disorder and bipolar disorder: voxel-based meta-analysis. Br J Psychiatry. 2019;215(1):395-403. PMID 30846010; doi:10.1192/bjp.2019.44.", "link": "https://doi.org/10.1192/bjp.2019.44", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini1990", "text": "Zanarini MC, Gunderson JG, Frankenburg FR. Cognitive features of borderline personality disorder. Am J Psychiatry. 1990;147(1):57-63. PMID 2293789; doi:10.1176/ajp.147.1.57.", "link": "https://doi.org/10.1176/ajp.147.1.57", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini1990DIBR", "text": "Zanarini MC, Gunderson JG, Frankenburg FR, Chauncey DL. Discriminating borderline personality disorder from other axis II disorders. Am J Psychiatry. 1990;147(2):161-7. PMID 2301653; doi:10.1176/ajp.147.2.161.", "link": "https://doi.org/10.1176/ajp.147.2.161", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini1997", "text": "Zanarini MC, Williams AA, Lewis RE, Reich RB, Vera SC, Marino MF, et al. Reported pathological childhood experiences associated with the development of borderline personality disorder. Am J Psychiatry. 1997;154(8):1101-6. PMID 9247396; doi:10.1176/ajp.154.8.1101.", "link": "https://doi.org/10.1176/ajp.154.8.1101", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini1998AxisI", "text": "Zanarini MC, Frankenburg FR, Dubo ED, Sickel AE, Trikha A, Levin A, et al. Axis I comorbidity of borderline personality disorder. Am J Psychiatry. 1998;155(12):1733-9. PMID 9842784; doi:10.1176/ajp.155.12.1733.", "link": "https://doi.org/10.1176/ajp.155.12.1733", "areas": ["D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini1998AxisII", "text": "Zanarini MC, Frankenburg FR, Dubo ED, Sickel AE, Trikha A, Levin A, et al. Axis II comorbidity of borderline personality disorder. Compr Psychiatry. 1998;39(5):296-302. PMID 9777282; doi:10.1016/s0010-440x(98)90038-4.", "link": "https://doi.org/10.1016/s0010-440x(98)90038-4", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2000Dissociation", "text": "Zanarini MC, Ruser T, Frankenburg FR, Hennen J. The dissociative experiences of borderline patients. Compr Psychiatry. 2000;41(3):223-7. PMID 10834632; doi:10.1016/S0010-440X(00)90051-8.", "link": "https://doi.org/10.1016/s0010-440x(00)90051-8", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2001Olanzapine", "text": "Zanarini MC, Frankenburg FR. Olanzapine treatment of female borderline personality disorder patients: a double-blind, placebo-controlled pilot study. J Clin Psychiatry. 2001;62(11):849-54. PMID 11775043; doi:10.4088/jcp.v62n1103.", "link": "https://doi.org/10.4088/jcp.v62n1103", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2002DIBR", "text": "Zanarini MC, Frankenburg FR, Vujanovic AA. Inter-rater and test-retest reliability of the Revised Diagnostic Interview for Borderlines. J Pers Disord. 2002;16(3):270-6. PMID 12136682; doi:10.1521/pedi.16.3.270.22538.", "link": "https://doi.org/10.1521/pedi.16.3.270.22538", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2003Course", "text": "Zanarini MC, Frankenburg FR, Hennen J, Silk KR. The longitudinal course of borderline psychopathology: 6-year prospective follow-up of the phenomenology of borderline personality disorder. Am J Psychiatry. 2003;160(2):274-83. PMID 12562573; doi:10.1176/appi.ajp.160.2.274.", "link": "https://doi.org/10.1176/appi.ajp.160.2.274", "areas": ["A", "D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2003MSI", "text": "Zanarini MC, Vujanovic AA, Parachini EA, Boulanger JL, Frankenburg FR, Hennen J. A screening measure for BPD: the McLean Screening Instrument for Borderline Personality Disorder (MSI-BPD). J Pers Disord. 2003;17(6):568-73. PMID 14744082; doi:10.1521/pedi.17.6.568.25355.", "link": "https://doi.org/10.1521/pedi.17.6.568.25355", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2003Omega3", "text": "Zanarini MC, Frankenburg FR. omega-3 Fatty acid treatment of women with borderline personality disorder: a double-blind, placebo-controlled pilot study. Am J Psychiatry. 2003;160(1):167-9. PMID 12505817; doi:10.1176/appi.ajp.160.1.167.", "link": "https://doi.org/10.1176/appi.ajp.160.1.167", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2003ZAN", "text": "Zanarini MC, Vujanovic AA, Parachini EA, Boulanger JL, Frankenburg FR, Hennen J. Zanarini Rating Scale for Borderline Personality Disorder (ZAN-BPD): a continuous measure of DSM-IV borderline psychopathology. J Pers Disord. 2003;17(3):233-42. PMID 12839102; doi:10.1521/pedi.17.3.233.22147.", "link": "https://doi.org/10.1521/pedi.17.3.233.22147", "areas": ["D", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Zanarini2003"]}, {"key": "Zanarini2004AxisI", "text": "Zanarini MC, Frankenburg FR, Hennen J, Reich DB, Silk KR. Axis I comorbidity in patients with borderline personality disorder: 6-year follow-up and prediction of time to remission. Am J Psychiatry. 2004;161(11):2108-2114. PMID 15514413; doi:10.1176/appi.ajp.161.11.2108.", "link": "https://doi.org/10.1176/appi.ajp.161.11.2108", "areas": ["G", "D"], "unverified": false, "validated": "Europe PMC", "aliases": ["Zanarini2004Comorbidity"]}, {"key": "Zanarini2004Services", "text": "Zanarini MC, Frankenburg FR, Hennen J, Silk KR. Mental health service utilization by borderline personality disorder patients and Axis II comparison subjects followed prospectively for 6 years. J Clin Psychiatry. 2004;65(1):28-36. PMID 14744165; doi:10.4088/jcp.v65n0105.", "link": "https://doi.org/10.4088/jcp.v65n0105", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2005MSAD", "text": "Zanarini MC, Frankenburg FR, Hennen J, Reich DB, Silk KR. The McLean Study of Adult Development (MSAD): overview and implications of the first six years of prospective follow-up. J Pers Disord. 2005;19(5):505-23. PMID 16274279; doi:10.1521/pedi.2005.19.5.505.", "link": "https://doi.org/10.1521/pedi.2005.19.5.505", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2006Prediction", "text": "Zanarini MC, Frankenburg FR, Hennen J, Reich DB, Silk KR. Prediction of the 10-year course of borderline personality disorder. Am J Psychiatry. 2006;163(5):827-832. PMID 16648323; doi:10.1176/ajp.2006.163.5.827.", "link": "https://doi.org/10.1176/ajp.2006.163.5.827", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zanarini2007Subsyndromal", "text": "Zanarini MC, Frankenburg FR, Reich DB, Silk KR, Hudson JI, McSweeney LB. The subsyndromal phenomenology of borderline personality disorder: a 10-year follow-up study. Am J Psychiatry. 2007;164(6):929-35. PMID 17541053; doi:10.1176/ajp.2007.164.6.929.", "link": "https://doi.org/10.1176/ajp.2007.164.6.929", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2008Psychoed", "text": "Zanarini MC, Frankenburg FR. A preliminary, randomized trial of psychoeducation for women with borderline personality disorder. J Pers Disord. 2008;22(3):284-90. PMID 18540800; doi:10.1521/pedi.2008.22.3.284.", "link": "https://doi.org/10.1521/pedi.2008.22.3.284", "areas": ["D", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2008SelfHarm", "text": "Zanarini MC, Frankenburg FR, Reich DB, Fitzmaurice G, Weinberg I, Gunderson JG. The 10-year course of physically self-destructive acts reported by borderline patients and axis II comparison subjects. Acta Psychiatr Scand. 2008;117(3):177-84. PMID 18241308; PMCID PMC3884820; doi:10.1111/j.1600-0447.2008.01155.x.", "link": "https://doi.org/10.1111/j.1600-0447.2008.01155.x", "areas": ["A", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2009", "text": "Zanarini MC, Jacoby RJ, Frankenburg FR, Reich DB, Fitzmaurice G. The 10-year course of social security disability income reported by patients with borderline personality disorder and axis II comparison subjects. J Pers Disord. 2009;23(4):346-56. PMID 19663655; PMCID PMC3222934; doi:10.1521/pedi.2009.23.4.346.", "link": "https://doi.org/10.1521/pedi.2009.23.4.346", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2010Eating", "text": "Zanarini MC, Reichman CA, Frankenburg FR, Reich DB, Fitzmaurice G. The course of eating disorders in patients with borderline personality disorder: a 10-year follow-up study. Int J Eat Disord. 2010;43(3):226-232. PMID 19343799; PMCID PMC2839025; doi:10.1002/eat.20689.", "link": "https://doi.org/10.1002/eat.20689", "areas": ["G", "D"], "unverified": false, "validated": "Europe PMC", "aliases": ["Zanarini2010ED"]}, {"key": "Zanarini2010Psychosocial", "text": "Zanarini MC, Frankenburg FR, Reich DB, Fitzmaurice G. The 10-year course of psychosocial functioning among patients with borderline personality disorder and axis II comparison subjects. Acta Psychiatr Scand. 2010;122(2):103-109. PMID 20199493; PMCID PMC3876887; doi:10.1111/j.1600-0447.2010.01543.x.", "link": "https://doi.org/10.1111/j.1600-0447.2010.01543.x", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zanarini2010Recovery", "text": "Zanarini MC, Frankenburg FR, Reich DB, Fitzmaurice G. Time to attainment of recovery from borderline personality disorder and stability of recovery: A 10-year prospective follow-up study. Am J Psychiatry. 2010;167(6):663-7. PMID 20395399; PMCID PMC3203735; doi:10.1176/appi.ajp.2009.09081130.", "link": "https://doi.org/10.1176/appi.ajp.2009.09081130", "areas": ["A", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2011JPD", "text": "Zanarini MC, Horwood J, Wolke D, Waylen A, Fitzmaurice G, Grant BF. Prevalence of DSM-IV borderline personality disorder in two community samples: 6,330 English 11-year-olds and 34,653 American adults. J Pers Disord. 2011;25(5):607-19. PMID 22023298; PMCID PMC4678770; doi:10.1521/pedi.2011.25.5.607.", "link": "https://doi.org/10.1521/pedi.2011.25.5.607", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2011Olanzapine", "text": "Zanarini MC, Schulz SC, Detke HC, Tanaka Y, Zhao F, Lin D, et al. A dose comparison of olanzapine for the treatment of borderline personality disorder: a 12-week randomized, double-blind, placebo-controlled study. J Clin Psychiatry. 2011;72(10):1353-62. PMID 21535995; doi:10.4088/JCP.08m04138yel.", "link": "https://doi.org/10.4088/jcp.08m04138yel", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2011SUD", "text": "Zanarini MC, Frankenburg FR, Weingeroff JL, Reich DB, Fitzmaurice GM, Weiss RD. The course of substance use disorders in patients with borderline personality disorder and Axis II comparison subjects: a 10-year follow-up study. Addiction. 2011;106(2):342-348. PMID 21083831; PMCID PMC3222933; doi:10.1111/j.1360-0443.2010.03176.x.", "link": "https://doi.org/10.1111/j.1360-0443.2010.03176.x", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zanarini2012", "text": "Zanarini MC, Frankenburg FR, Reich DB, Fitzmaurice G. Attainment and stability of sustained symptomatic remission and recovery among patients with borderline personality disorder and axis II comparison subjects: a 16-year prospective follow-up study. Am J Psychiatry. 2012;169(5):476-83. PMID 22737693; PMCID PMC3509999; doi:10.1176/appi.ajp.2011.11101550.", "link": "https://doi.org/10.1176/appi.ajp.2011.11101550", "areas": ["A", "D", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2015Marriage", "text": "Zanarini MC, Frankenburg FR, Reich DB, Wedig MM, Conkey LC, Fitzmaurice GM. The course of marriage/sustained cohabitation and parenthood among borderline patients followed prospectively for 16 years. J Pers Disord. 2015;29(1):62-70. PMID 24963829; PMCID PMC4276730; doi:10.1521/pedi_2014_28_147.", "link": "https://doi.org/10.1521/pedi_2014_28_147", "areas": ["G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zanarini2015Meds", "text": "Zanarini MC, Frankenburg FR, Bradford Reich D, Harned AL, Fitzmaurice GM. Rates of psychotropic medication use reported by borderline patients and axis II comparison subjects over 16 years of prospective follow-up. J Clin Psychopharmacol. 2015;35(1):63-7. PMID 25384261; PMCID PMC4276426; doi:10.1097/JCP.0000000000000232.", "link": "https://doi.org/10.1097/jcp.0000000000000232", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2015Treatment", "text": "Zanarini MC, Frankenburg FR, Reich DB, Conkey LC, Fitzmaurice GM. Treatment rates for patients with borderline personality disorder and other personality disorders: a 16-year study. Psychiatr Serv. 2015;66(1):15-20. PMID 25270039; PMCID PMC4283568; doi:10.1176/appi.ps.201400055.", "link": "https://doi.org/10.1176/appi.ps.201400055", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zanarini2016Fluidity", "text": "Zanarini MC, Frankenburg FR, Reich DB, Fitzmaurice GM. Fluidity of the Subsyndromal Phenomenology of Borderline Personality Disorder Over 16 Years of Prospective Follow-Up. Am J Psychiatry. 2016;173(7):688-694. PMID 26869248; PMCID PMC4930411; doi:10.1176/appi.ajp.2015.15081045.", "link": "https://doi.org/10.1176/appi.ajp.2015.15081045", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zanarini2018Excellent", "text": "Zanarini MC, Temes CM, Frankenburg FR, Reich DB, Fitzmaurice GM. Description and prediction of time-to-attainment of excellent recovery for borderline patients followed prospectively for 20 years. Psychiatry Res. 2018;262:40-45. PMID 29407567; PMCID PMC6025755; doi:10.1016/j.psychres.2018.01.034.", "link": "https://doi.org/10.1016/j.psychres.2018.01.034", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zanarini2018Web", "text": "Zanarini MC, Conkey LC, Temes CM, Fitzmaurice GM. Randomized Controlled Trial of Web-Based Psychoeducation for Women With Borderline Personality Disorder. J Clin Psychiatry. 2018;79(3):16m11153. PMID 28703950; PMCID PMC5764827; doi:10.4088/jcp.16m11153.", "link": "https://doi.org/10.4088/jcp.16m11153", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2021Comorbidity", "text": "Zanarini MC, Athanasiadi A, Temes CM, Magni LR, Hein KE, Fitzmaurice GM, et al. Symptomatic Disorders in Adults and Adolescents With Borderline Personality Disorder. J Pers Disord. 2021;35(Suppl B):48-55. PMID 33779275; PMCID PMC9345066; doi:10.1521/pedi_2021_35_502.", "link": "https://doi.org/10.1521/pedi_2021_35_502", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zanarini2024Comorbid", "text": "Zanarini MC, Frankenburg FR, Glass IV, Fitzmaurice GM. The 24-Year Course of Symptomatic Disorders in Patients With Borderline Personality Disorder and Personality-Disordered Comparison Subjects: Description and Prediction of Recovery From BPD. J Clin Psychiatry. 2024;85(3):24m15370. PMID 39145674; doi:10.4088/jcp.24m15370.", "link": "https://doi.org/10.4088/jcp.24m15370", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zanarini2024Remission", "text": "Zanarini MC, Frankenburg FR, Hein KE, Glass IV, Fitzmaurice GM. Sustained Symptomatic Remission and Recovery and Their Loss Among Patients With Borderline Personality Disorder and Patients With Other Types of Personality Disorders: A 24-Year Prospective Follow-Up Study. J Clin Psychiatry. 2024;85(4):24m15457. PMID 39480146; doi:10.4088/jcp.24m15457.", "link": "https://doi.org/10.4088/jcp.24m15457", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zanarini2025SUD", "text": "Zanarini MC, Temes CM, Glass IV, Frankenburg FR, Fitzmaurice GM, Unruh BT, et al. The 24-year course of substance use disorders in patients with borderline personality disorder and personality-disordered comparison subjects. Am J Addict. 2025;34(4):422-432. PMID 40001161; doi:10.1111/ajad.70012.", "link": "https://doi.org/10.1111/ajad.70012", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zimmerman2005", "text": "Zimmerman M, Rothschild L, Chelminski I. The prevalence of DSM-IV personality disorders in psychiatric outpatients. Am J Psychiatry. 2005;162(10):1911-8. PMID 16199838; doi:10.1176/appi.ajp.162.10.1911.", "link": "https://doi.org/10.1176/appi.ajp.162.10.1911", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2010JCP", "text": "Zimmerman M, Ruggero CJ, Chelminski I, Young D. Psychiatric diagnoses in patients previously overdiagnosed with bipolar disorder. J Clin Psychiatry. 2010;71(1):26-31. PMID 19646366; doi:10.4088/JCP.08m04633.", "link": "https://doi.org/10.4088/jcp.08m04633", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2012JCP", "text": "Zimmerman M, Chelminski I, Young D, Dalrymple K, Martinez J. Does the presence of one feature of borderline personality disorder have clinical significance? Implications for dimensional ratings of personality disorders. J Clin Psychiatry. 2012;73(1):8-12. PMID 22054015; doi:10.4088/JCP.10m06784.", "link": "https://doi.org/10.4088/jcp.10m06784", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2013DCN", "text": "Zimmerman M, Morgan TA. The relationship between borderline personality disorder and bipolar disorder. Dialogues Clin Neurosci. 2013;15(2):155-69. PMID 24174890; PMCID PMC3811087; doi:10.31887/DCNS.2013.15.2/mzimmerman.", "link": "https://doi.org/10.31887/dcns.2013.15.2/mzimmerman", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2017BJP", "text": "Zimmerman M, Multach MD, Dalrymple K, Chelminski I. Clinically useful screen for borderline personality disorder in psychiatric out-patients. Br J Psychiatry. 2017;210(2):165-166. PMID 27908898; doi:10.1192/bjp.bp.116.182121.", "link": "https://doi.org/10.1192/bjp.bp.116.182121", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2021MSI", "text": "Zimmerman M, Balling C. Screening for Borderline Personality Disorder With the McLean Screening Instrument: A Review and Critique of the Literature. J Pers Disord. 2021;35(2):288-298. PMID 31887102; doi:10.1521/pedi_2019_33_451.", "link": "https://doi.org/10.1521/pedi_2019_33_451", "areas": ["D"], "unverified": false, "validated": "PubMed"}];
/* =============== home: one schematic emotion wave, with and without skills =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of facts: a cited one can replace them once research exists. */
const HERO_CAP=['Schematic, not to scale: a trigger, a fast rise, a high peak and a slow return to baseline.','Schematic, not to scale: the sea-green wave illustrates the idea of skills helping an emotion settle sooner. It is not a measured result.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),sb=$('#heroSk'),cap=$('#heroCap');let sk=false;
  const MIN=60;/* schematic minutes on the scrubber */
  const F0=moodF({t0:.12,base:.14,peak:.93,rise:.018,fall:.42}),F1=moodF({t0:.12,base:.14,peak:.7,rise:.03,fall:.11});
  function phase(u,f){if(u<f.t0)return['Calm baseline','var(--calm)'];if(u<f.t0+.035)return['Trigger','var(--storm)'];
    if(u<f.peakAt+.06)return[u<f.peakAt?'Fast rise':'Peak intensity','var(--storm)'];
    return f(u)<.24?['Back near baseline','var(--calm)']:[sk?'Settling sooner':'Slow return to baseline','var(--mood)']}
  function draw(t){const N=vb(svg,'520 300','400 360');const f=sk?F1:F0,v=f(t);
    /* layout tables: wide = brain left, graph right; narrow = brain on top, graph below */
    const L=N?{bx:120,by:84,bs:.72,tx:24,ty:26,th:96,gx:34,gy:162,gw:346,gh:140,px:214,py:52}
             :{bx:118,by:140,bs:.92,tx:26,ty:60,th:176,gx:214,gy:62,gw:288,gh:172,px:214,py:28};
    let s=`<defs>${marker('hArr','var(--muted)')}</defs>`;
    /* thermometer and brain: the amygdala glows with the wave; prefrontal control brightens as it settles */
    s+=thermo(L.tx,L.ty,L.th,v,{label:'intensity'});
    const settle=t>f.peakAt?ramp(t,f.peakAt,f.peakAt+.25):0;
    const b=brain(L.bx,L.by,L.bs,{hl:{amyg:ramp(v,.2,.95),pfc:sk?.25+settle*.6:.15+settle*.25}});s+=b.svg;
    const a=b.at.amyg;s+=`<line x1="${f1(a[0])}" y1="${f1(a[1]+6)}" x2="${f1(a[0]-18)}" y2="${f1(L.by+64*L.bs)}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(a[0]-18)}" y="${f1(L.by+64*L.bs+12)}" class="t-xs t-mid">amygdala</text>`;
    const p=b.at.pfc;s+=`<text x="${f1(p[0])}" y="${f1(L.by-62*L.bs)}" class="t-xs t-mid">prefrontal</text>`;
    /* the graph */
    s+=`<rect x="${L.gx}" y="${L.gy}" width="${L.gw}" height="${L.gh}" rx="8" style="fill:var(--field)"/>`;
    if(sk)s+=wave(L.gx,L.gy,L.gw,L.gh,F0,{upto:1,col:'var(--mood)',dash:true}).svg.replace(/stroke-width:2.6/,'stroke-width:1.6;opacity:.45');
    const w=wave(L.gx,L.gy,L.gw,L.gh,f,{upto:t,col:sk?'var(--calm)':'var(--mood)',fill:true,thr:.72,thrLabel:'very intense',base:true,dot:true});s+=w.svg;
    const tx=L.gx+L.gw*f.t0;s+=`<path d="M${f1(tx)} ${L.gy+L.gh+2}v-14" style="stroke:var(--storm);stroke-width:2" marker-end="url(#hArr)"/>`;
    const tl=tline(L.gx,L.gy+L.gh+(N?14:18),L.gw,{min:0,max:MIN,step:N?20:10,fmt:v=>v+'′',label:''});s+=tl.svg;
    s+=`<text x="${f1(L.gx+L.gw-8)}" y="${f1(L.gy+16)}" class="t-xs t-end">emotional intensity (schematic)</text>`;
    /* phase label */
    const [ph,col]=phase(t,f);
    s+=`<text x="${L.px}" y="${L.py}" class="t-big" style="fill:${col}">${ph}</text>`;
    s+=`<text x="${L.px}" y="${L.py+18}" class="t-sm">minute ${Math.round(t*MIN)} of ${MIN}</text>`;
    svg.innerHTML=s}
  sb.addEventListener('click',()=>{sk=!sk;sb.setAttribute('aria-pressed',sk);cap.innerHTML=sk?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  cap.innerHTML=HERO_CAP[0];
  playWire(rg,$('#heroPlay'),draw,9000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 What BPD is =============== */
/* Who has BPD? Five scenes on one scrubber: a 1,000-person icon array for the community estimates,
   four 100-person grids for clinical settings, an age panel and a sex-ratio panel whose sample
   (community or clinical) is chosen by a toggle. Every number comes from research pass A. */
const WH_STEPS=[
 {from:0,at:.15,k:'In the community · 1 of 2',t:'The highest estimate: 5.9%',
  txt:`NESARC Wave 2 interviewed 34,653 US adults face to face in 2004–2005 and found lifetime BPD in 5.9% (99% CI 5.4–6.4): 59 of these 1,000 figures. The authors concluded that BPD is "much more prevalent in the general population than previously recognized". It was more common in younger adults, in people who were separated, divorced or widowed, and in people with lower income and education. <sup class="c" data-ref="Grant2008" title="Source 184">184</sup>`,
  pt:`In that survey about 59 adults in every 1,000 had had BPD at some point. Keep going: most experts think this number is too high.`,
  hook:`NESARC Wave 2 (Grant 2008): 5.9% lifetime, with no sex difference (men 5.6%, women 6.2%). <sup class="c" data-ref="Grant2008" title="Source 184">184</sup>`},
 {from:.2,at:.35,k:'In the community · 2 of 2',t:'Stricter rules: 2.7%',
  txt:`A reanalysis of NESARC required each criterion to cause distress or impairment. That cut any personality disorder from 21.5% to 9.1%, <sup class="c" data-ref="Trull2010" title="Source 535">535</sup> and lifetime BPD to 2.7% (95% CI 2.5–3.0): 27 of 1,000. The faded figures are the people the stricter rule removed; Grant's "more liberal diagnostic rules" probably counted people with subthreshold BPD. <sup class="c" data-ref="Tomko2014" title="Source 528">528</sup> Other surveys sit lower still: 1.4% in the US NCS-R and 0.7% in Oslo, and the median point prevalence across community studies is about 1%. A 2024 review gives a lifetime range of 0.7–2.7%. <sup class="c" data-ref="Gunderson2009Ontogeny,Torgersen2001,Ellison2018,Leichsenring2024WP" title="Source 144,203,300,531">144,203,300,531</sup>`,
  pt:`How strict the rules are changes the count. Most experts say about 1 to 3 adults in 100 have BPD at some point in their lives. <sup class="c" data-ref="Ellison2018,Tomko2014" title="Source 144,528">144,528</sup>`,
  hook:`Community prevalence ≈ 1–3% (median point ≈ 1%). Requiring distress or impairment for each criterion took NESARC from 5.9% to 2.7%. <sup class="c" data-ref="Ellison2018,Tomko2014" title="Source 144,528">144,528</sup>`},
 {from:.4,at:.55,k:'In clinics',t:'Closer to care, more common',
  txt:`BPD becomes more common the nearer you get to specialist care: 6.4% (14 of 218) in a US urban primary care practice, about four times the community rate; about 10–12% of psychiatric outpatients; and about 20–22% of psychiatric inpatients. <sup class="c" data-ref="Gross2002PrimaryCare,Ellison2018" title="Source 144,194">144,194</sup> Other reviews give about 12% and 22%, or 15–28% of patients in clinics or hospitals; single outpatient studies range from 7% to 27% depending on setting and method. <sup class="c" data-ref="Leichsenring2024WP,Gunderson2018,Korzekwa2008" title="Source 207,279,300">207,279,300</sup> In the primary care study, half of the patients with BPD had had no mental health treatment in the past year (ringed), and 42.9% were not recognised by their physician as having an emotional problem. <sup class="c" data-ref="Gross2002PrimaryCare" title="Source 194">194</sup>`,
  pt:`About 1 in 10 people seen in a mental health clinic, and about 1 in 5 people in a psychiatric hospital, have BPD. <sup class="c" data-ref="Ellison2018" title="Source 144">144</sup>`,
  hook:`Outpatients ≈ 10–12%, inpatients ≈ 20–22%, primary care 6.4%, where nearly half went unrecognised. <sup class="c" data-ref="Ellison2018,Gross2002PrimaryCare" title="Source 144,194">144,194</sup>`},
 {from:.6,at:.76,k:'By age',t:'It usually starts in adolescence',
  txt:`A coherent BPD syndrome usually begins in adolescence, after age 12, often after or alongside depression, anxiety, conduct problems or substance use. <sup class="c" data-ref="Bohus2021" title="Source 66">66</sup> It can be diagnosed reliably from about age 11, and about 3% of adolescents in the community have it; 3.2% of 6,330 English 11-year-olds met DSM-IV criteria. <sup class="c" data-ref="Guile2018,Zanarini2011JPD" title="Source 195,589">195,589</sup> Calling the diagnosis controversial in this age group "is no longer justified". <sup class="c" data-ref="Kaess2014Adolescence" title="Source 250">250</sup> Personality-disorder traits fell by 28% between ages 14 and 22 in one US cohort, <sup class="c" data-ref="Johnson2000Acta" title="Source 241">241</sup> and in German community data BPD fell sharply between adolescence and young adulthood while impulsivity fell and depressivity rose with age. <sup class="c" data-ref="Arens2013" title="Source 13">13</sup> Older outpatients (45–68) more often reported chronic emptiness and less often impulsivity, self-harm and mood swings than younger ones, so BPD in later life is easily missed. <sup class="c" data-ref="Morgan2013Older,Beatson2016" title="Source 45,353">45,353</sup>`,
  pt:`BPD usually starts in the teenage years. Teenagers can be diagnosed and helped, and there is no need to wait until 18. <sup class="c" data-ref="Bohus2021,Chanen2022Age" title="Source 66,96">66,96</sup>`,
  hook:`Onset in adolescence (after 12); diagnosable from about 11; about 3% of adolescents. Older adults: more emptiness, less impulsivity. <sup class="c" data-ref="Bohus2021,Guile2018,Morgan2013Older" title="Source 66,195,353">66,195,353</sup>`},
 {from:.8,at:.95,k:'By sex',t:'A sampling story',
  txt:`DSM-IV-TR stated that BPD is "diagnosed predominantly (about 75%) in females". <sup class="c" data-ref="Skodol2003" title="Source 486">486</sup> In the community the gap almost disappears: 6.2% of women and 5.6% of men in NESARC Wave 2, and 3.0% and 2.4% under the stricter rules. <sup class="c" data-ref="Grant2008,Tomko2014" title="Source 184,528">184,528</sup> The clinical excess "appears to be largely a function of sampling bias", and the true ratio by sex is unknown. <sup class="c" data-ref="Skodol2003" title="Source 486">486</sup> Men with BPD more often have substance use disorders and antisocial personality disorder; women more often have eating, mood, anxiety and post-traumatic stress disorders. <sup class="c" data-ref="Sansone2011Gender" title="Source 453">453</sup> In a 770-person clinical-trial sample, suicidality, aggression and substance misuse did not differ by sex. <sup class="c" data-ref="Silberschmidt2015" title="Source 480">480</sup>`,
  pt:`Men get BPD about as often as women. Women are diagnosed more often mainly because they seek help more often in the settings where studies were done. <sup class="c" data-ref="Skodol2003,Grant2008" title="Source 184,486">184,486</sup>`,
  hook:`Clinical samples ≈ 75% female; community samples ≈ equal. The difference is mainly referral (sampling) bias. <sup class="c" data-ref="Skodol2003,Grant2008" title="Source 184,486">184,486</sup>`}
];
const WH_WORDS=[
 {f:'a borderline',c:'said about a person',s:'a person with BPD, someone living with BPD',
  w:`Describe the behaviour, not the person's character. In a 1988 vignette study, the personality-disorder label alone made psychiatrists judge identical patients as more difficult and less deserving of care: "an enduring pejorative judgement rather than a clinical diagnosis". <sup class="c" data-ref="Lewis1988" title="Source 303">303</sup>`},
 {f:'manipulative',c:'said about a request for help',s:'Describe what happened and the need behind it: "asked several staff for help while very distressed"',
  w:`The public may see people with personality disorders as "purposefully misbehaving". <sup class="c" data-ref="Sheehan2016" title="Source 477">477</sup> Nurses given the BPD label for the same challenging behaviour saw it as more under the person's control and felt less sympathy and optimism than with schizophrenia or depression labels. <sup class="c" data-ref="Markham2003" title="Source 330">330</sup>`},
 {f:'attention-seeking',c:'said about self-harm',s:'Self-harm is a sign of severe distress: respond with care and assessment',
  w:`Clinicians should not read repeated suicide attempts as a sign of little wish to die. <sup class="c" data-ref="Black2004Suicide" title="Source 55">55</sup> NICE states that people with BPD "should not be excluded from any health or social care service because of their diagnosis or because they have self-harmed". <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`},
 {f:'a difficult patient',c:'said in a handover',s:'A person in a lot of distress: what would help right now?',
  w:`Nearly half of 706 surveyed clinicians preferred to avoid patients with BPD, but those who had treated more people with BPD reported more empathy and optimism. <sup class="c" data-ref="Black2011Attitudes" title="Source 56">56</sup> Distancing can feel like rejection to someone sensitive to abandonment and may create "a self-fulfilling prophecy". <sup class="c" data-ref="Aviram2006" title="Source 18">18</sup>`},
 {f:'untreatable',c:'said about the diagnosis',s:'Treatable, and most people improve a great deal',
  w:`Perceived untreatability is one of six themes in the stigma research. <sup class="c" data-ref="Ring2019" title="Source 433">433</sup> In the McLean study, 99% of people had a 2-year remission by 16 years, <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup> and psychotherapy reduces symptom severity compared with usual care. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup> Messages that combine recovery with biological causes may reduce stigma most. <sup class="c" data-ref="Sheehan2016" title="Source 477">477</sup>`},
 {f:'too young for BPD',c:'said about a teenager',s:'BPD can be recognised, and helped, in adolescence',
  w:`BPD in adolescence is as reliable and valid as in adults, and can be diagnosed from about age 11. <sup class="c" data-ref="Kaess2014Adolescence,Guile2018" title="Source 195,250">195,250</sup> A global alliance calls early intervention "a novel public health priority". <sup class="c" data-ref="Chanen2017WP" title="Source 93">93</sup>`}
];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');let mode='comm',setSt=()=>{};
  /* a person glyph in <defs>, reused by <use>: 1,000 of them stay light enough to redraw every frame */
  const DEF=`<defs><g id="whP"><circle cx="0" cy="1.7" r="1.7"/><path d="M-2.6 10V6Q-2.6 4 0 4Q2.6 4 2.6 6V10Z"/></g></defs>`;
  const P=(x,y,s,fill,op)=>`<use href="#whP" transform="translate(${f1(x)} ${f1(y)}) scale(${(s/10).toFixed(3)})" style="fill:${fill}${op!=null&&op<1?';opacity:'+op.toFixed(2):''}"/>`;
  /* a fixed scatter order, so the same people light up every time */
  const ORD=(()=>{const r=rng(1938),a=[...Array(1000).keys()];for(let i=999;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}const pos=new Array(1000);a.forEach((v,i)=>pos[v]=i);return pos})();
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;

  /* ---- scene A: 1,000 people and the community estimates ---- */
  function sceneA(t,N){
    const hi=t<.2?Math.round(59*ease(ramp(t,.02,.16))):Math.round(lerp(59,27,ease(ramp(t,.22,.34))));
    const ghost=t<.2?0:59-hi;
    const G=N?{x:22,y:70,dx:9,dy:11.2,s:9.6}:{x:24,y:66,dx:8.7,dy:12.2,s:10};
    let s='';
    for(let i=0;i<1000;i++){const c=i%40,r=Math.floor(i/40),x=G.x+c*G.dx+G.dx/2,y=G.y+r*G.dy,o=ORD[i];
      if(o<hi)s+=P(x,y,G.s,'var(--storm)');else if(o<hi+ghost)s+=P(x,y,G.s,'var(--storm)',.28);else s+=P(x,y,G.s,'var(--line)')}
    const gy=G.y+25*G.dy+(N?14:12);
    s+=T(G.x,gy,`<tspan style="fill:var(--storm);font-weight:600">${hi} of 1,000</tspan>${ghost?` · ${ghost} removed by the stricter rule (faded)`:''}`,'t-sm');
    /* the dot plot of estimates */
    const D=N?{x:30,w:340,y:gy+30,dy:34}:{x:420,w:270,y:96,dy:50};
    const E=[['NESARC Wave 2 · lifetime',5.9,0],['NESARC, stricter rules · lifetime',2.7,1],['NCS-R, US',1.4,1],['Median of community studies · point',1,1],['Oslo · interview study',.7,1]];
    const X=v=>D.x+D.w*v/7;
    if(!N){s+=T(D.x,70,'COMMUNITY ESTIMATES OF BPD','t-sm','fill:var(--ink);font-weight:600')}
    else s+=T(D.x,D.y-12,'COMMUNITY ESTIMATES OF BPD','t-sm','fill:var(--ink);font-weight:600');
    E.forEach(([l,v,ph],k)=>{const y=D.y+k*D.dy+(N?12:16),on=ph===0?ramp(t,.02,.1):ramp(t,.24+k*.02,.3+k*.02);if(on<=0)return;
      s+=`<g style="opacity:${f1(on)}">`+T(D.x,y-9,l)+`<line x1="${f1(D.x)}" x2="${f1(D.x+D.w)}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/>`+
        `<circle cx="${f1(X(v))}" cy="${f1(y)}" r="6" style="fill:${k===0?'var(--storm)':k===1?'var(--mood)':'var(--dx)'}"/>`+T(X(v)+11,y+4,v+'%','t-sm','fill:var(--ink);font-weight:600')+'</g>'});
    const ay=D.y+E.length*D.dy+(N?2:6);
    s+=`<line x1="${f1(D.x)}" x2="${f1(D.x+D.w)}" y1="${f1(ay)}" y2="${f1(ay)}" class="axis"/>`;
    [0,1,2,3,4,5,6,7].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(ay)}" y2="${f1(ay+4)}" class="axis"/>`+T(X(v),ay+15,v+'%','t-xs t-mid')});
    if(t>=.2){const b=ramp(t,.3,.36);s+=`<rect x="${f1(X(1))}" y="${f1(D.y-2)}" width="${f1(X(3)-X(1))}" height="${f1(ay-D.y+2)}" rx="6" style="fill:var(--accent);opacity:${f1(.1*b)}"/>`+(b>0?T((X(1)+X(3))/2,ay+28,'most reviews: about 1–3%','t-xs t-mid',`fill:var(--accent);opacity:${f1(b)}`):'')}
    return s}

  /* ---- scene B: four settings as 100-person grids ---- */
  const WH_SET=[['Community','about 1 in 100',1],['Primary care','6.4 in 100',6.4],['Psychiatric outpatients','about 11 in 100',11],['Psychiatric inpatients','about 21 in 100',21]];
  function sceneB(t,N){const p=ease(ramp(t,.41,.53));let s='';
    WH_SET.forEach(([nm,lab,v],i)=>{
      const g=N?{x:24+(i%2)*190,y:84+Math.floor(i/2)*246,dx:16,dy:17}:{x:20+i*174,y:92,dx:15.4,dy:19};
      const n=v*p,full=Math.floor(n),frac=n-full;
      for(let k=0;k<100;k++){const c=k%10,r=Math.floor(k/10),x=g.x+c*g.dx+g.dx/2,y=g.y+r*g.dy;
        if(k<full)s+=P(x,y,12,'var(--storm)');else if(k===full&&frac>.05)s+=P(x,y,12,'var(--storm)',.25+frac*.6);else s+=P(x,y,12,'var(--line)');
        if(i===1&&k<3&&p>.85)s+=`<circle cx="${f1(x)}" cy="${f1(y+6)}" r="8.4" style="fill:none;stroke:var(--warn);stroke-width:1.6;opacity:${f1(ramp(p,.85,1))}"/>`}
      const ly=g.y+10*g.dy+(N?16:18);
      s+=T(g.x+2,ly,nm,'t-lbl')+T(g.x+2,ly+(N?18:20),lab,'t-big','fill:var(--storm);font-size:15px')});
    const op=`opacity:${f1(ramp(p,.85,1))}`;
    if(N)s+=T(24,576,`<tspan style="fill:var(--warn);font-weight:600">○</tspan> ringed: in primary care, half had no mental`,'t-xs',op)+T(24,590,'health treatment in the past year','t-xs',op);
    else s+=T(20,386,`<tspan style="fill:var(--warn);font-weight:600">○</tspan> ringed: in primary care, half had no mental health treatment in the past year`,'t-xs',op);
    return s}

  /* ---- scene C: age ---- */
  const WH_AGE=[['11-year-olds|England',11,3.2],['Adolescents|community',15,3],['US adults|under 30',25,4.3],['All US|adults',45,2.7]];
  const whImp=a=>a<12?.12+.1*ramp(a,10,12):a<16?lerp(.22,.86,ramp(a,12,16)):.86*Math.exp(-(a-16)/34);
  const whEmp=a=>a<12?.1:lerp(.38,.66,ramp(a,16,64));
  function sceneC(t,N){const age=lerp(10,70,ramp(t,.61,.78));let s='';
    const B=N?{x:30,y:84,w:340,h:150}:{x:28,y:92,w:300,h:220};
    s+=T(B.x,B.y-14,'HOW COMMON, BY AGE GROUP','t-sm','fill:var(--ink);font-weight:600');
    const bw=B.w/WH_AGE.length;
    for(let v=0;v<=5;v++){const y=B.y+B.h*(1-v/5);s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${f1(y)}" y2="${f1(y)}" class="${v?'grid':'axis'}"/>`+T(B.x-4,y+3,v+'%','t-xs t-end')}
    WH_AGE.forEach(([l,a,v],i)=>{const on=ramp(age,a-3,a+3),h=B.h*v/5*ease(on),x=B.x+i*bw+bw*.18,w=bw*.64;
      s+=`<rect x="${f1(x)}" y="${f1(B.y+B.h-h)}" width="${f1(w)}" height="${f1(h)}" rx="4" style="fill:${i<2?'var(--mood)':'var(--dx)'};opacity:${f1(.3+.7*on)}"/>`;
      if(on>.5)s+=T(x+w/2,B.y+B.h-h-6,(i===1?'≈':'')+v+'%','t-sm t-mid','fill:var(--ink);font-weight:600');
      const words=l.split('|');words.forEach((wd,j)=>{s+=T(x+w/2,B.y+B.h+14+j*12,wd,'t-xs t-mid')})});
    s+=T(B.x,B.y+B.h+(N?44:46),'Bars come from different studies and rules.','t-xs');
    /* schematic lines */
    const L=N?{x:34,y:350,w:336,h:166}:{x:390,y:92,w:300,h:220};
    s+=T(L.x,L.y-14,'WHAT IT LOOKS LIKE WITH AGE (SCHEMATIC)','t-sm','fill:var(--ink);font-weight:600');
    s+=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="8" style="fill:var(--field)"/>`;
    const u=ramp(age,10,70);
    const fi=x=>whImp(lerp(10,70,x)),fe=x=>whEmp(lerp(10,70,x));
    s+=wave(L.x,L.y,L.w,L.h,fi,{upto:u,col:'var(--storm)',dot:true}).svg;
    s+=wave(L.x,L.y,L.w,L.h,fe,{upto:u,col:'var(--mood)',dot:true,dash:true}).svg;
    const tl=tline(L.x,L.y+L.h+12,L.w,{min:10,max:70,step:10,fmt:v=>v,label:''});s+=tl.svg;
    s+=T(L.x+L.w,L.y+L.h+42,'age (years)','t-xs t-end');
    /* annotations that pop up as the age cursor passes */
    /* [age, text lines, colour, y of the first line, anchor at the right edge] */
    const ann=[[12,['onset usually after 12'],'var(--storm)',L.y+L.h-10,0],[18,['traits fall 28%, ages 14 to 22'],'var(--muted)',L.y+L.h-26,0],[52,['older adults: more emptiness,','less impulsivity and self-harm'],'var(--mood)',L.y+16,1]];
    ann.forEach(([a,lines,c,yy,right])=>{const o=ramp(age,a,a+4);if(o<=0)return;const x=tl.X(a);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(right?yy+lines.length*12:L.y)}" y2="${f1(L.y+L.h)}" style="stroke:${c};stroke-width:1;stroke-dasharray:2 3;opacity:${f1(o*.8)}"/>`;
      lines.forEach((ln,j)=>{s+=T(right?L.x+L.w-6:x+4,yy+j*12,ln,'t-xs'+(right?' t-end':''),`fill:${c};opacity:${f1(o)}`)})});
    s+=T(L.x,L.y+L.h+(N?54:56),'<tspan style="fill:var(--storm)">━ impulsive features</tspan>   <tspan style="fill:var(--mood)">╍ emptiness, low mood</tspan>','t-xs');
    s+=`<line x1="${f1(tl.X(age))}" x2="${f1(tl.X(age))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    s+=T(tl.X(age),L.y-3,'age '+Math.round(age),'t-xs t-mid','fill:var(--ink)');
    return s}

  /* ---- scene D: sex ratio, community or clinical sample ---- */
  function sceneD(t,N){let s='';const p=ease(ramp(t,.81,.9)),clin=mode==='clin';
    const W=clin?15:11;/* women among 20 people with BPD: clinical 75%; community 3.0% vs 2.4% with equal numbers of men and women */
    const box=(x,y,w,h,on)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:${on?'var(--panel-2)':'none'};stroke:${on?'var(--ink)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
    const A=N?{x:20,y:70,w:360,h:140}:{x:20,y:80,w:204,h:250},C=N?{x:20,y:420,w:360,h:120}:{x:496,y:80,w:204,h:250},M=N?{x:60,y:262}:{x:270,y:158};
    s+=box(A.x,A.y,A.w,A.h,!clin)+box(C.x,C.y,C.w,C.h,clin);
    s+=T(A.x+14,A.y+22,'COMMUNITY','t-sm','fill:var(--ink);font-weight:600')+T(A.x+14,A.y+36,'NESARC, stricter rules');
    const bars=[['women',3.0,'var(--self)'],['men',2.4,'var(--other)']];
    bars.forEach(([l,v,c],k)=>{const bx=A.x+14,by=A.y+56+k*(N?30:40),bw=(A.w-90)*v/3.2;
      s+=`<rect x="${bx}" y="${by}" width="${f1(bw*(.2+.8*p))}" height="${N?16:20}" rx="4" style="fill:${c}"/>`+T(bx+bw*(.2+.8*p)+6,by+(N?12:14),l+' '+v.toFixed(1)+'%','t-sm','fill:var(--ink)')});
    s+=T(A.x+14,A.y+A.h-(N?14:40),'Wave 2: women 6.2%, men 5.6%');
    if(!N)s+=T(A.x+14,A.y+A.h-24,'near-equal');
    s+=T(C.x+14,C.y+22,'CLINICAL SAMPLES','t-sm','fill:var(--ink);font-weight:600')+T(C.x+14,C.y+36,'as stated in DSM-IV-TR');
    const cw=C.w-28;s+=`<rect x="${C.x+14}" y="${C.y+(N?54:60)}" width="${f1(cw)}" height="${N?18:22}" rx="4" style="fill:var(--other)"/><rect x="${C.x+14}" y="${C.y+(N?54:60)}" width="${f1(cw*.75*(.2+.8*p))}" height="${N?18:22}" rx="4" style="fill:var(--self)"/>`;
    s+=T(C.x+14,C.y+(N?90:102),'about 75% women','t-sm','fill:var(--ink)')+T(C.x+14,C.y+(N?106:120),'a 3 : 1 ratio');
    if(!N)s+=T(C.x+14,C.y+C.h-24,'clinics see more women');
    /* the 20 people with BPD in the chosen sample */
    const cols=N?10:5,dx=N?28:36,dy=N?40:44,sz=N?26:30;
    s+=T(M.x,M.y-(N?30:34),'20 PEOPLE WITH BPD','t-sm','fill:var(--ink);font-weight:600')+T(M.x,M.y-(N?16:20),'in the selected sample');
    const shown=Math.round(lerp(10,W,p));
    for(let i=0;i<20;i++){const x=M.x+(i%cols)*dx+dx/2,y=M.y+Math.floor(i/cols)*dy;s+=P(x,y,sz,i<shown?'var(--self)':'var(--other)')}
    const ly=M.y+(20/cols)*dy+(N?6:4);
    s+=T(M.x,ly,`<tspan style="fill:var(--self);font-weight:600">${shown} women</tspan> · <tspan style="fill:var(--other);font-weight:600">${20-shown} men</tspan>`,'t-sm');
    if(!N){s+=`<path d="M${A.x+A.w+4} ${A.y+A.h+14}H${C.x-8}" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#whArr)"/>`+T((A.x+A.w+C.x)/2,A.y+A.h+30,'who reaches a clinic, and gets studied there','t-xs t-mid')}
    else s+=`<path d="M360 ${A.y+A.h+6}V${A.y+A.h+26}" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#whArr)"/>`;
    const msg=clin?['Clinical sample selected:','the doorway skews the count.']:['Community sample selected: the split','if men and women were equally numerous.'];
    if(N)s+=T(20,568,msg[0],'t-xs','fill:var(--ink)')+T(20,582,msg[1],'t-xs','fill:var(--ink)');else s+=T(20,392,msg.join(' '),'t-xs','fill:var(--ink)');
    return s}

  const TITLES=[['Who has BPD? In the community','1,000 US adults · NESARC Wave 2'],['Who has BPD? In the community','1,000 US adults · NESARC, stricter rules'],['Who has BPD? In clinics','100 people in each setting'],['Who has BPD? By age','prevalence and how it shows'],['Who has BPD? By sex','community and clinical samples']];
  function draw(t){const N=vb(svg,'720 400','400 600');const ph=phaseOf(WH_STEPS,t);setSt(ph);
    let s=DEF.replace('</defs>',marker('whArr','var(--muted)')+'</defs>');
    s+=T(N?20:22,28,TITLES[ph][0],'t-big')+T(N?20:22,46,TITLES[ph][1],'t-sm');
    s+=ph<2?sceneA(t,N):ph===2?sceneB(t,N):ph===3?sceneC(t,N):sceneD(t,N);
    svg.innerHTML=s;
    const st=WH_STEPS[ph];
    $('#whNote').innerHTML=noteHTML(ph===4?Object.assign({},st,{txt:st.txt+(mode==='clin'?' <b>Clinical sample shown:</b> about 15 of every 20 people diagnosed are women.':' <b>Community sample shown:</b> 3.0% of women and 2.4% of men means about 11 women to 9 men among 20 people with BPD, if men and women are equally numerous (derived from the published rates).')}):st);
    const R=[`NESARC Wave 2 · <b>5.9%</b> lifetime`,`NESARC stricter rules · <b>2.7%</b> lifetime`,`community <b>≈1%</b> · primary care <b>6.4%</b> · outpatients <b>10–12%</b> · inpatients <b>20–22%</b>`,`11-year-olds <b>3.2%</b> · adolescents <b>≈3%</b> · adults under 30 <b>4.3%</b>`,mode==='clin'?`clinical samples · <b>≈75%</b> women`:`community · women <b>3.0%</b>, men <b>2.4%</b>`];
    $('#whRead').innerHTML=`<span>${R[ph]}</span>`}
  const stop=playWire(rg,$('#whPlay'),draw,24000,'Replay','what');
  setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $$('[data-whs]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.whs;$$('[data-whs]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(+rg.value<.8){stop();rg.value=.95}draw(+rg.value)}));
  draw(+rg.value);

  /* ---- words matter: flip cards ---- */
  const wb=$('#whWords');
  wb.innerHTML=WH_WORDS.map((w,i)=>`<button class="whflip" aria-pressed="false" data-whw="${i}" aria-label="Phrase to avoid: ${w.f}. Press to turn the card over."><span class="in"><span class="fa fr"><small>You might hear · ${w.c}</small><q>${w.f}</q><small>Turn over →</small></span><span class="fa bk"><small>Try instead</small><b class="say">${w.s}</b><p>${w.w}</p></span></span></button>`).join('');
  wb.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('[data-whw]');if(!b)return;const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);
    b.setAttribute('aria-label',on?`Try instead: ${WH_WORDS[+b.dataset.whw].s}. Press to turn back.`:`Phrase to avoid: ${WH_WORDS[+b.dataset.whw].f}. Press to turn the card over.`)});
};
/* =============== 1.2 the emotion wave =============== */
/* the wave occupies t 0..EM_WEND; the cycle ring occupies EM_WEND..1 */
const EM_WEND=.7;
const EM_STEPS=[
 {from:0,at:.05,k:'Before anything happens',t:'Baseline',
  txt:`The wave starts higher than in comparison groups. In one e-diary study, mean momentary distress over 24 hours was 4.85 out of 10 in BPD against 0.34 in healthy controls. <sup class="c" data-ref="Santangelo2014" title="Source 455">455</sup> Kuo and Linehan found higher resting skin conductance and negative emotion and lower resting respiratory sinus arrhythmia in BPD. <sup class="c" data-ref="Kuo2009" title="Source 289">289</sup> Across three e-diary datasets, people with BPD had a more negative emotional "home base". <sup class="c" data-ref="EbnerPriemer2015" title="Source 141">141</sup>`,
  pt:`For many people with BPD the hardest part is how high painful feelings already are before anything happens.`,
  hook:`Kuo &amp; Linehan 2009: high <b>baseline</b> negative emotion and low resting RSA in BPD, not a bigger reaction. <sup class="c" data-ref="Kuo2009" title="Source 289">289</sup>`},
 {from:.09,at:.118,k:'The trigger',t:'An interpersonal cue',
  txt:`Triggers are often interpersonal: a cancelled plan, a short reply, a look that reads as criticism. In daily life, rejection and disagreement were followed by hostility, sadness and fear, and the rejection links were stronger in BPD. <sup class="c" data-ref="Hepp2018" title="Source 217">217</sup> Gunderson and colleagues describe "extreme sensitivity to perceived interpersonal slights". <sup class="c" data-ref="Gunderson2018" title="Source 207">207</sup> This is the <b>sensitivity</b> part of Linehan's model. <sup class="c" data-ref="Kuo2009,Reitz2012" title="Source 289,428">289,428</sup>`,
  pt:`A small signal from someone else, like a cancelled plan, can land as a big rejection.`,
  hook:`Rejection sensitivity and BPD features: pooled r = 0.326; clinical samples against controls r = 0.655. <sup class="c" data-ref="Foxhall2019" title="Source 168">168</sup>`},
 {from:.13,at:.165,k:'Seconds to minutes',t:'A fast rise',
  txt:`Negative emotion climbs quickly. In laboratory mood inductions with ratings before, just after, and 3 and 6 minutes after a story, BPD, depression and control groups showed the <b>same rise and fall</b>; BPD differed by a much higher level throughout. <sup class="c" data-ref="Jacob2009" title="Source 238">238</sup> Reactions were larger to a negative-evaluation stressor than to a general one. <sup class="c" data-ref="Gratz2010" title="Source 187">187</sup> Press <b>Add a comparison curve</b> to see a parallel rise from a lower start.`,
  pt:`The feeling rises fast. In studies, the jump itself is often similar to other people's; it starts from a higher place.`,
  hook:`Jacob 2009: "extreme negative affectivity" may describe BPD better than hyperreactivity. <sup class="c" data-ref="Jacob2009" title="Source 238">238</sup>`},
 {from:.18,at:.21,k:'The peak',t:'High intensity',
  txt:`At the top, emotions are intense and often mixed: people with BPD reported more often feeling more than one emotion at once and, early in treatment, more difficulty naming it. <sup class="c" data-ref="EbnerPriemer2007PsychiatryRes" title="Source 138">138</sup> Not being able to label emotions was linked to distress in BPD. <sup class="c" data-ref="EbnerPriemer2008" title="Source 140">140</sup> Urges are more likely when negative affect is high, after rejection and later in the day. <sup class="c" data-ref="Hepp2021PersonalDisord" title="Source 220">220</sup> A meta-analysis of 31 laboratory studies found null-to-small differences in physiological reactivity; the big difference was how negatively people rated what they saw. <sup class="c" data-ref="Bortolla2020" title="Source 73">73</sup>`,
  pt:`At the peak, feelings are strong and tangled, and urges to do something right now are strongest.`,
  hook:`Bortolla 2020 meta-analysis: the hyperreactivity hypothesis was "in general" not supported in the lab. <sup class="c" data-ref="Bortolla2020" title="Source 73">73</sup>`},
 {from:.3,at:.47,k:'Minutes to hours',t:'A slow return',
  txt:`<span class="ev early">Early evidence</span> The return to baseline is where the evidence is most mixed. Shame after negative evaluation stayed raised in BPD through the end of the recovery period, and aversive tension returned more slowly in a pilot study. <sup class="c" data-ref="Gratz2010,Reitz2012" title="Source 187,428">187,428</sup> Over 20 days, affect carried over more from one interpersonal event to the next. <sup class="c" data-ref="Sadikaj2010" title="Source 445">445</sup> But a weaker pull back to baseline in e-diary data was inconsistent and small. <sup class="c" data-ref="EbnerPriemer2015" title="Source 141">141</sup> Press <b>Skills used</b> to see what regulation is meant to do.`,
  pt:`Coming back down can take longer, especially after shame or criticism. But studies do not all agree on this.`,
  hook:`"Slow return to baseline": supported for shame and tension in specific contexts; e-diary attractor strength findings are small and inconsistent. <sup class="c" data-ref="Gratz2010,EbnerPriemer2015" title="Source 141,187">141,187</sup>`},
 {from:EM_WEND,at:.86,k:'Hours to days',t:'The cycle',
  txt:`An urgent action can bring short-term relief, which is why it can become a habit. Self-injury most often aims to relieve negative emotion, and relief often follows. <sup class="c" data-ref="Klonsky2007" title="Source 271">271</sup> But in daily life, negative emotion was higher in the hours after self-injury, a cycle the authors describe. <sup class="c" data-ref="Houben2017" title="Source 232">232</sup> Shame and conflict then feed the next trigger. The experiential avoidance model sees escape from emotion as what keeps the cycle going. <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Chapman2006" title="Source 98">98</sup> Every link is a place where a skill or support can break the chain.`,
  pt:`Something that brings quick relief can feel like it works. The relief does not last, and bad feelings often come back within hours.`,
  hook:`Urges build and pass: most thoughts of self-injury lasted 1–30 minutes in one study. Getting through the peak with support matters. <sup class="c" data-ref="Nock2009,Hepp2021PersonalDisord" title="Source 220,389">220,389</sup>`}
];
/* a person can tell when the nodes of the ring are read aloud */
const EM_RING=[
 {n:'Trigger',s:'rejection, criticism',v:.45},
 {n:'Emotion',s:'shame, fear, anger',v:.85},
 {n:'Urge',s:'builds, then passes',v:.95},
 {n:'Urgent action',s:'e.g. self-harm, lashing out',v:.8},
 {n:'Short-term relief',s:'tension falls briefly',v:.45},
 {n:'Shame & conflict',s:'emotion rises again',v:.78}
];
inits.emotion=()=>{
  const svg=$('#emSvg'),rg=$('#emT');let cmp=false,sk=false,setSt=()=>{};
  const F={bpd:moodF({t0:.16,base:.36,peak:.9,rise:.045,fall:.55}),
           cmp:moodF({t0:.16,base:.08,peak:.56,rise:.045,fall:.24}),
           sk:moodF({t0:.16,base:.36,peak:.7,rise:.06,fall:.17})};
  const PH=[['baseline',.06],['trigger',.16],['rise',.21],['peak',.31],['return',.66]];
  function ring(cx,cy,r,k,NR){let s='';const n=EM_RING.length,off=0,bw=NR?112:124,bh=40;
    const P=i=>{const a=(i*360/n+off-90)*Math.PI/180;return[cx+r*Math.cos(a),cy+r*Math.sin(a)]};
    s+=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--line);stroke-width:10;opacity:.7"/>`;
    /* arrows between nodes along the ring */
    for(let i=0;i<n;i++){const a0=(i*360/n+off-90+18)*Math.PI/180,a1=((i+1)*360/n+off-90-18)*Math.PI/180;
      const x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
      const broken=sk&&i===2;
      s+=`<path d="M${f1(x0)} ${f1(y0)}A${r} ${r} 0 0 1 ${f1(x1)} ${f1(y1)}" style="fill:none;stroke:${broken?'var(--accent)':'var(--muted)'};stroke-width:1.8${broken?';stroke-dasharray:3 5':''}" marker-end="url(#emArr)"/>`}
    const act=Math.floor(((k%n)+n)%n+1e-6)%n;
    /* a token travels round the ring: the cycle turning */
    {const a=((k%n)*360/n-90)*Math.PI/180,tx=cx+r*Math.cos(a),ty=cy+r*Math.sin(a);s+=`<circle cx="${f1(tx)}" cy="${f1(ty)}" r="9" style="fill:var(--storm);opacity:.9;stroke:var(--panel);stroke-width:2.5"/>`}
    EM_RING.forEach((d,i)=>{const [x,y]=P(i),on=i===act,dim=sk&&(i===3||i===4);
      s+=`<g style="opacity:${dim?.4:1}"><rect x="${f1(x-bw/2)}" y="${f1(y-bh/2)}" width="${bw}" height="${bh}" rx="10" style="fill:${on?'var(--storm-soft)':'var(--panel)'};stroke:${on?'var(--storm)':'var(--line)'};stroke-width:${on?2:1.2}"/>`+
        `<text x="${f1(x)}" y="${f1(y-3)}" class="t-lbl t-mid" style="font-size:12.5px">${d.n.replace('&','&amp;')}</text><text x="${f1(x)}" y="${f1(y+12)}" class="t-xs t-mid">${d.s}</text></g>`});
    if(sk){const [x,y]=P(2.5);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="11" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.6"/><path d="M${f1(x-5)} ${f1(y-5)}L${f1(x+5)} ${f1(y+5)}M${f1(x+5)} ${f1(y-5)}L${f1(x-5)} ${f1(y+5)}" style="stroke:var(--accent);stroke-width:2.2;stroke-linecap:round"/>`}
    const C=sk?['A skill breaks','the chain','the urge passes','without the action']:['The cycle','','each link can','be broken'];
    s+=`<text x="${cx}" y="${cy+(sk?14:6)}" class="t-lbl t-mid" style="font-size:${sk?13:16}px">${C[0]}</text>`+(C[1]?`<text x="${cx}" y="${cy+30}" class="t-lbl t-mid" style="font-size:13px">${C[1]}</text>`:'')+
      `<text x="${cx}" y="${cy+(sk?46:24)}" class="t-xs t-mid">${C[2]}</text><text x="${cx}" y="${cy+(sk?58:36)}" class="t-xs t-mid">${C[3]}</text>`;
    return {svg:s,act}}
  function draw(t){const NR=vb(svg,'720 380','400 600');
    const L=NR?{wx:44,wy:118,ww:326,wh:200,bx:118,by:470,bs:.78,tx:300,ty:410,th:120,cx:200,cy:222,cr:128}
              :{wx:56,wy:112,ww:440,wh:200,bx:620,by:118,bs:.72,tx:590,ty:196,th:118,cx:276,cy:206,cr:136};
    const ph=phaseOf(EM_STEPS,t),u=clamp(t/EM_WEND),cyc=ramp(t,EM_WEND-.02,EM_WEND+.04),k=ramp(t,EM_WEND,1)*7;
    const main=sk?F.sk:F.bpd;let s=`<defs>${marker('emArr','var(--muted)')}</defs>`;
    /* title */
    s+=`<text x="${L.wx}" y="28" class="t-sm" style="fill:var(--storm)">${cyc<.5?'NEGATIVE EMOTION OVER TIME':'EMOTION → URGE → ACTION → RELIEF → SHAME'}</text>`;
    /* ---- wave panel ---- */
    let w='';
    [0,.25,.5,.75,1].forEach(v=>{const y=L.wy+L.wh*(1-v);w+=`<line x1="${L.wx}" x2="${L.wx+L.ww}" y1="${f1(y)}" y2="${f1(y)}" class="${v?'grid':'axis'}"/>`});
    w+=`<text x="${L.wx-8}" y="${L.wy+6}" class="t-xs t-end">high</text><text x="${L.wx-8}" y="${L.wy+L.wh}" class="t-xs t-end">low</text>`;
    /* phase labels under the axis */
    /* only the current phase is named, at the middle of its stretch, so short phases never collide */
    let px=L.wx;PH.forEach(([n,e],i)=>{const x1=L.wx+L.ww*e,on=i===Math.min(ph,4)&&cyc<.5;
      if(on)w+=`<rect x="${f1(px)}" y="${L.wy+L.wh}" width="${f1(x1-px)}" height="4" style="fill:var(--storm);opacity:.6"/><text x="${f1(clamp((px+x1)/2,L.wx+24,L.wx+L.ww-24))}" y="${L.wy+L.wh+17}" class="t-xs t-mid" style="fill:var(--storm);font-weight:700">${n}</text>`;
      if(i<PH.length-1)w+=`<line x1="${f1(x1)}" x2="${f1(x1)}" y1="${L.wy+L.wh}" y2="${L.wy+L.wh+6}" class="axis"/>`;px=x1});
    w+=`<text x="${L.wx+L.ww}" y="${L.wy+L.wh+32}" class="t-xs t-end">time since the trigger (schematic)</text>`;
    if(cmp){const c=wave(L.wx,L.wy,L.ww,L.wh,F.cmp,{upto:u,col:'var(--calm)',dash:true});w+=c.svg;
      if(u>.5){const p=c.at(.62);w+=`<text x="${f1(p[0])}" y="${f1(p[1]+16)}" class="t-xs" style="fill:var(--calm)">comparison group</text>`}}
    if(sk){const g=wave(L.wx,L.wy,L.ww,L.wh,F.bpd,{upto:u,col:'var(--storm)',dash:true});w+=`<g style="opacity:.45">${g.svg}</g>`}
    const mw=wave(L.wx,L.wy,L.ww,L.wh,main,{upto:u,col:sk?'var(--accent)':'var(--mood)',fill:true,thr:.78,thrLabel:'urges more likely',base:true,dot:u>0});
    w+=mw.svg;
    if(u>.5){const p=mw.at(.78);w+=`<text x="${f1(p[0])}" y="${f1(p[1]-10)}" class="t-xs t-mid" style="fill:${sk?'var(--accent)':'var(--mood)'}">${sk?'with skills (illustrative)':'BPD-typical (schematic)'}</text>`}
    /* the trigger: another person and a message */
    const tx=L.wx+L.ww*.16,show=ramp(t,.085,.11)*(1-.6*ramp(t,.3,.4));
    if(show>0){w+=`<g style="opacity:${f1(show)}">`+person(tx-14,L.wy-62,30,'var(--other)')+
      bubble(tx+10,L.wy-74,NR?214:226,30,{tx:tx+4,ty:L.wy-52,col:'var(--other)',lines:['“Sorry, can’t make it tonight.”']})+
      `<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${L.wy-26}" y2="${L.wy+L.wh}" style="stroke:var(--other);stroke-width:1;stroke-dasharray:3 4"/></g>`}
    s+=`<g style="opacity:${f1(1-.88*cyc)}">${w}</g>`;
    /* ---- current intensity ---- */
    let v=main(u),act=-1;
    if(cyc>0){const R=ring(L.cx,L.cy,L.cr,k,NR);act=R.act;v=lerp(v,EM_RING[act].v*(sk&&(act===3||act===4)?.7:1),cyc);
      s+=`<g style="opacity:${f1(cyc)}">${R.svg}</g>`}
    const amy=clamp((v-.25)/.7),pfc=sk?clamp(.3+.6*ramp(u,.25,.5)):clamp(.15+.25*ramp(u,.4,.9));
    const B=brain(L.bx,L.by,L.bs,{hl:{amyg:amy,pfc:pfc,insula:amy*.6}});
    s+=B.svg;
    const bl=NR?L.by+64:L.by+62;
    s+=`<text x="${L.bx}" y="${bl}" class="t-xs t-mid">threat ${amy>.6?'high':amy>.3?'rising':'low'} · control ${pfc>.55?'engaged':'quiet'}</text>`;
    s+=thermo(L.tx,L.ty,L.th,v,{label:'intensity'});
    s+=`<text x="${L.tx+20}" y="${L.ty+L.th*(1-v)+4}" class="t-lbl">${Math.round(v*100)}</text><text x="${L.tx+20}" y="${L.ty+L.th*(1-v)+17}" class="t-xs">of 100</text>`;
    s+=`<text x="${NR?200:L.bx}" y="${NR?592:372}" class="t-xs t-mid" style="fill:var(--warn)">SCHEMATIC · not measured values</text>`;
    svg.innerHTML=s;
    setSt(ph);
    $('#emNote').innerHTML=noteHTML(EM_STEPS[ph]);
    $('#emRead').innerHTML=cyc>.5?`<span>link <b>${EM_RING[act].n.replace('&','&amp;')}</b></span><span>intensity <b>${Math.round(v*100)}</b>/100 (schematic)</span>${sk?'<span>skills <b>on</b> (illustrative)</span>':''}`:
      `<span>phase <b>${PH[Math.min(ph,4)][0]}</b></span><span>intensity <b>${Math.round(v*100)}</b>/100 (schematic)</span>${cmp?`<span>comparison <b>${Math.round(F.cmp(u)*100)}</b></span>`:''}${v>=.78?'<span><b>above the urge line</b></span>':''}`;
  }
  const stop=playWire(rg,$('#emPlay'),draw,22000,'Replay','emotion');
  setSt=stepWire($('#emSteps'),EM_STEPS,rg,draw,stop);
  $('#emCmp').addEventListener('click',()=>{cmp=!cmp;$('#emCmp').setAttribute('aria-pressed',cmp);draw(+rg.value)});
  $('#emSk').addEventListener('click',()=>{sk=!sk;$('#emSk').setAttribute('aria-pressed',sk);draw(+rg.value)});
  draw(+rg.value);

  /* ---- e-diary day: MSSD live ---- */
  const es=$('#emEpSvg'),sel=$('#emEpI'),vr=$('#emEpV');
  const D0={bpd:[3,4,3,5,4,8,7,6,4,3,3,4,7,8,5,4,3,6,5,4,8,6,4,3],cmp:[0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,1,0,0,2,0,0,1,0]};
  let D={bpd:D0.bpd.slice(),cmp:D0.cmp.slice()},ed='bpd',sorted=false,selI=5,drag=false,G=null;
  sel.innerHTML=D.bpd.map((_,i)=>`<option value="${i}">${i+1}</option>`).join('');sel.value=selI;
  const view=k=>sorted?D[k].slice().sort((a,b)=>a-b):D[k];
  const stat=a=>{const n=a.length,m=a.reduce((x,y)=>x+y,0)/n,va=a.reduce((x,y)=>x+(y-m)*(y-m),0)/(n-1);
    let ss=0,ac=0;for(let i=1;i<n;i++){const d=a[i]-a[i-1];ss+=d*d;if(Math.abs(d)>=3)ac++}
    return{m,sd:Math.sqrt(va),va,mssd:ss/(n-1),pac:ac/(n-1)}};
  function drawE(){const NR=vb(es,'720 330','400 372');
    G=NR?{x0:34,x1:388,y0:36,y1:236,b0:262,b1:330,lab:356}:{x0:44,x1:704,y0:30,y1:206,b0:230,b1:290,lab:316};
    const X=i=>lerp(G.x0,G.x1,i/23),Y=v=>lerp(G.y1,G.y0,v/10);let s='';
    [0,2,4,6,8,10].forEach(v=>s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${G.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    for(let i=0;i<24;i+=NR?4:2)s+=`<text x="${f1(X(i))}" y="${G.y1+14}" class="t-xs t-mid">${i+1}</text>`;
    s+=`<text x="${G.x1}" y="${G.y0-12}" class="t-xs t-end">${NR?'distress 0–10 · prompt number':'distress 0–10 · prompt number across one day'}</text>`;
    ['cmp','bpd'].forEach(k=>{const a=view(k),col=k==='bpd'?'var(--storm)':'var(--calm)',on=k===ed;
      s+=`<path d="${a.map((v,i)=>(i?'L':'M')+f1(X(i))+' '+f1(Y(v))).join('')}" style="fill:none;stroke:${col};stroke-width:${on?2.6:1.8};opacity:${on?1:.55};stroke-linejoin:round"/>`;
      a.forEach((v,i)=>{s+=`<circle cx="${f1(X(i))}" cy="${f1(Y(v))}" r="${on?(i===selI&&!sorted?7:5):3}" style="fill:${on?(i===selI&&!sorted?'var(--panel)':col):col};stroke:${col};stroke-width:2;opacity:${on?1:.55}"/>`})});
    /* squared successive differences for the edited profile */
    const a=view(ed),col=ed==='bpd'?'var(--storm)':'var(--calm)',bw=(G.x1-G.x0)/23;
    s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${G.b1}" y2="${G.b1}" class="axis"/>`;
    for(let i=1;i<24;i++){const d=a[i]-a[i-1],h=(G.b1-G.b0)*Math.min(1,d*d/49),x=lerp(G.x0,G.x1,(i-.5)/23),big=Math.abs(d)>=3;
      s+=`<rect x="${f1(x-bw*.32)}" y="${f1(G.b1-h)}" width="${f1(bw*.64)}" height="${f1(Math.max(h,.8))}" rx="2" style="fill:${big?col:'var(--muted)'};opacity:${big?.85:.35}"/>`}
    s+=`<text x="${G.x0}" y="${G.lab}" class="t-xs">${NR?'bars: squared jumps · coloured = 3+ points':'bars: squared jump between successive ratings · coloured = a jump of 3 or more'}</text>`;
    es.innerHTML=s;
    const SB=stat(view('bpd')),SC=stat(view('cmp'));
    $('#emStats').innerHTML=[['bpd','BPD',SB],['cmp','Comparison',SC]].map(([c,n,S])=>
      `<div class="${c}"><small>${n} · MSSD</small><b>${S.mssd.toFixed(2)}</b><span class="stage-cap">mean ${S.m.toFixed(2)} · SD ${S.sd.toFixed(2)} · variance ${S.va.toFixed(2)} · acute changes ${Math.round(S.pac*100)}%</span></div>`).join('')+
      `<div><small>${sorted?'Sorted':'As rated'}</small><span class="stage-cap">${sorted?'Same values in rising order: mean and variance unchanged, MSSD much lower. Order is what MSSD measures.':'Drag a point up or down. A single big jump raises the MSSD far more than a slow drift.'}</span></div>`;
    vr.value=D[ed][selI];
  }
  function setPt(i,v){if(sorted){sorted=false;$('#emSort').setAttribute('aria-pressed','false')}selI=i;sel.value=i;D[ed][i]=clamp(Math.round(v),0,10);drawE()}
  function evPt(e){const p=es.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=es.getScreenCTM();if(!m)return null;const q=p.matrixTransform(m.inverse());
    return{i:clamp(Math.round((q.x-G.x0)/(G.x1-G.x0)*23),0,23),v:(G.y1-q.y)/(G.y1-G.y0)*10}}
  es.addEventListener('pointerdown',e=>{const q=evPt(e);if(!q)return;drag=true;try{es.setPointerCapture(e.pointerId)}catch(_){}setPt(q.i,q.v)});
  es.addEventListener('pointermove',e=>{if(!drag)return;const q=evPt(e);if(q)setPt(selI,q.v)});
  ['pointerup','pointercancel'].forEach(n=>es.addEventListener(n,()=>{drag=false}));
  sel.addEventListener('change',()=>{selI=+sel.value;drawE()});
  vr.addEventListener('input',()=>setPt(selI,+vr.value));
  $$('[data-ep]').forEach(b=>b.addEventListener('click',()=>{ed=b.dataset.ep;$$('[data-ep]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawE()}));
  $('#emSort').addEventListener('click',()=>{sorted=!sorted;$('#emSort').setAttribute('aria-pressed',sorted);drawE()});
  $('#emReset').addEventListener('click',()=>{D={bpd:D0.bpd.slice(),cmp:D0.cmp.slice()};sorted=false;$('#emSort').setAttribute('aria-pressed','false');drawE()});
  drawE();
  const pr=redraws.emotion;redraws.emotion=()=>{pr&&pr();drawE()};
};
/* =============== 1.3 Causes & the biosocial model =============== */
const CA_AGE=25;
/* ages (years) at which the schematic child shows a strong feeling and someone responds */
const CA_EV=[0.7,1.7,2.6,3.5,4.4,5.3,6.2,7.0,7.8,8.6,9.4,10.2,11.0,11.8,12.6,13.4,14.2,15.0,15.9,16.8,17.7,18.8,20.1,21.5,23.0,24.4];
/* response type per exchange: d = dismissed / punished, a = answered only after escalation, v = validated, n = neutral (infancy) */
function caResp(env,i,a){if(a<1.2)return 'n';if(env==='val')return 'v';
  if(a>=6&&a<12.5)return i%3===2?'a':'d';return i%5===4?'v':'d'}
function caPulse(env,a){/* height and settle time of the reaction at age a */
  const inv=env==='inv';
  const h=inv?.3+.5*ramp(a,1.5,15)-.2*ramp(a,18,25):.3+.1*ramp(a,1.5,12)-.08*ramp(a,18,25);
  const tau=inv?.18+.36*ramp(a,2,15)-.12*ramp(a,18,25):.18+.04*ramp(a,2,12);
  return {h,tau}}
function caLevel(env,a){const inv=env==='inv';
  let v=inv?.1+.12*ramp(a,4,16)-.07*ramp(a,18,25):.1+.02*ramp(a,4,16);
  CA_EV.forEach((e,i)=>{const d=a-e;if(d<=0)return;const P=caPulse(env,e),boost=caResp(env,i,e)==='a'?1.12:1;
    v+=P.h*boost*(1-Math.exp(-d/.05))*Math.exp(-d/P.tau)});
  return clamp(v,0,1)}
const CA_TXT={
 inv:[
  {c:['Big feelings,','fast to rise'],e:['Caregivers learn','this baby’s signals']},
  {c:['Upset, and','it isn’t real?'],e:['“Stop crying,','it’s nothing.”']},
  {c:['Louder, so','someone notices'],e:['“You’re','overreacting.”']},
  {c:['Only the biggest','storms get through'],e:['Ignored, then','suddenly answered']},
  {c:['Who am I if my','feelings are wrong?'],e:['“You’re too much.”']},
  {c:['Strong feelings,','slow to settle'],e:['Pattern carries into','adult relationships']}],
 val:[
  {c:['Big feelings,','fast to rise'],e:['Caregivers learn','this baby’s signals']},
  {c:['Upset,','and seen'],e:['“That scared you.','I’m here.”']},
  {c:['Angry, but','heard'],e:['“You’re angry.','Let’s sort it out.”']},
  {c:['Feelings rise,','then settle'],e:['Steady, predictable','responses']},
  {c:['Still sensitive,','with words for it'],e:['“That makes sense.','What would help?”']},
  {c:['Sensitive,','with ways to cope'],e:['Skills learned','at home travel on']}]};
const CA_STEPS=[
 {from:0,at:.03,k:'Birth to age 2',t:'Temperament at birth',
  txt:`The biosocial model starts with the child. Some children are born more emotionally vulnerable: more sensitive to emotional cues, with reactions that are hard to regulate and slow to return to baseline. The developmental version adds impulsivity as one of the earliest traits on the path. In the Pittsburgh Girls Study, parent and teacher ratings of emotionality at ages 5–8, and parent-rated hyperactivity/impulsivity, predicted new positive BPD screens at 14–22. <sup class="c" data-ref="Crowell2009,Stepp2017" title="Source 112,507">112,507</sup>`,
  pt:`Some babies feel things more strongly and calm down more slowly. That is a difference in temperament, not a fault, and it is nobody’s doing.`,
  hook:`Biosocial model = emotional vulnerability (sensitivity, reactivity, slow return to baseline) × an invalidating environment. <sup class="c" data-ref="Crowell2009" title="Source 112">112</sup>`},
 {from:.08,at:.15,k:'Ages 2–6',t:'Early invalidation',
  txt:`The other half of the model is the environment. An invalidating environment is intolerant of a child’s private emotional experience, especially emotions that are not backed by something others can see. In a 56-family study followed from infancy, maternal withdrawal observed at 18 months predicted borderline symptoms and suicidality or self-injury in late adolescence, independently of childhood abuse. In the Minnesota high-risk cohort, early temperament, disorganised attachment and parental hostility all predicted adult BPD symptoms. <sup class="c" data-ref="Crowell2009,LyonsRuth2013,Carlson2009" title="Source 84,112,325">84,112,325</sup>`,
  pt:`“Invalidating” means the child’s feelings are dismissed, punished or treated as wrong, often by people who are stressed themselves and doing their best.`,
  hook:`The invalidating environment = intolerance of the child’s expression of private emotion. <sup class="c" data-ref="Crowell2009" title="Source 112">112</sup>`},
 {from:.24,at:.3,k:'Ages 6–9',t:'Escalation to be heard',
  txt:`Development is described as a chain of transactions: each side’s response becomes the other side’s next trigger. The cohorts fit this two-way picture. In the Pittsburgh Girls Study, child dysregulation and harsh parenting influenced each other from 5 to 14. In ALSPAC, children with dysregulated behaviour at 4–8 were more likely to meet maladaptive parenting (β = 0.075) and to be bullied (β = 0.327). <sup class="c" data-ref="Crowell2009,Hallquist2015,Winsper2017" title="Source 112,211,559">112,211,559</sup>`,
  pt:`When calm signals are not answered, a child may learn to signal louder. Then the adults react to the louder signal, and both sides can get stuck.`,
  hook:`Transactional = child and environment shape each other over time, not a one-way arrow from parent to child. <sup class="c" data-ref="Crowell2009,Fruzzetti2005" title="Source 112,173">112,173</sup>`},
 {from:.36,at:.42,k:'Ages 9–12',t:'Intermittent reinforcement',
  txt:`<span class="ev hyp">Hypothesis</span> The drawing shows one way such a loop can keep itself going (gold arrows): small signals are dismissed, and only the most intense ones get a response, which teaches that only intense signals work. This part is a schematic of the transactional idea, not a measured result. What has been measured is the two-way influence: Fruzzetti’s model describes invalidating and conflictual family exchanges, and the absence of validating ones, transacting with the child’s vulnerability. <sup class="c" data-ref="Fruzzetti2005,Hallquist2015" title="Source 173,211">173,211</sup>`,
  pt:`If a reaction only gets noticed when it is very big, big reactions are what the child learns. Nobody plans this; it grows out of tired, stressed moments on both sides.`,
  hook:`Fruzzetti’s transactional model: invalidation and missing validation interact with the child’s vulnerability, and it blames neither child nor parent. <sup class="c" data-ref="Fruzzetti2005" title="Source 173">173</sup>`},
 {from:.48,at:.6,k:'Ages 12–18',t:'Adolescence: onset',
  txt:`A coherent BPD syndrome usually begins in adolescence, after age 12, often preceded by or alongside internalising problems (depression, anxiety) or externalising problems (conduct problems, hyperactivity, substance use). In E-Risk, borderline-related characteristics were already measurable at 12. In the Pittsburgh cohort only worsening self-control between 12 and 14 predicted growth in BPD symptoms from 14 to 17, and rises in teenage symptoms predicted harsher parenting more than the reverse. <sup class="c" data-ref="Bohus2021,Belsky2012,Hallquist2015,Stepp2014" title="Source 48,66,211,506">48,66,211,506</sup>`,
  pt:`The pattern usually becomes clear in the teenage years. Teenage symptoms can change how parents feel and act, too: influence runs both ways.`,
  hook:`BPD onset is typically in adolescence (after 12), often after internalising or externalising problems. <sup class="c" data-ref="Bohus2021" title="Source 66">66</sup>`},
 {from:.72,at:.9,k:'Ages 18–25',t:'The adult pattern',
  txt:`In the model’s terms, emotional vulnerability and invalidation have transacted into pervasive emotion dysregulation. But traits are not fixed: in the Minnesota Twin Family Study the mean BPD-trait score fell from 41.3 at 14 to 35.19 at 24, and in Norwegian twins the mean criterion count fell 28% over 10 years. Most people with BPD gradually reach symptomatic remission, and treatment can speed this up; these are population-level statements. Switch to <b>Mostly validating</b> to compare the braid. <sup class="c" data-ref="Bornovalova2009,ReichbornKjennerud2015,Gunderson2018" title="Source 69,207,426">69,207,426</sup>`,
  pt:`BPD traits usually ease with age, and recovery is common. Knowing how the loop works points care toward emotion skills for the person and support for the family.`,
  hook:`BPD traits: mean levels fall from the teens into adulthood while rank-order stability stays high (r = .53–.73). <sup class="c" data-ref="Bornovalova2009" title="Source 69">69</sup>`}];

inits.causes=()=>{
  const svg=$('#caSvg'),rg=$('#caT');let env='inv';
  function draw(t){
    const N=vb(svg,'720 420','400 700'),A=t*CA_AGE,p=phaseOf(CA_STEPS,t),T=CA_TXT[env][p];
    const L=N?{x0:30,x1:370,cy:90,ch:150,ey:312,eh:80,ty:478,ob:[20,548,360,140],bw:178}
             :{x0:40,x1:560,cy:46,ch:150,ey:236,eh:64,ty:378,ob:[578,40,130,300],bw:160};
    const X=a=>lerp(L.x0,L.x1,a/CA_AGE),W=L.x1-L.x0;
    let s=`<defs>${marker('caA','var(--mood)')}${marker('caD','var(--storm)')}${marker('caV','var(--calm)')}${marker('caG','var(--gold)')}${marker('caN','var(--muted)')}</defs>`;
    /* adolescence band */
    if(A>10){const op=ramp(A,10,12.5)*.55;s+=`<rect x="${f1(X(12))}" y="${L.cy-14}" width="${f1(X(18)-X(12))}" height="${f1(L.ey+L.eh-L.cy+22)}" rx="8" style="fill:var(--storm-soft);opacity:${f1(op)}"/>`;
      s+=`<text x="${f1((X(12)+X(18))/2)}" y="${L.cy+L.ch+(N?30:14)}" class="t-xs t-mid" style="fill:var(--storm);opacity:${f1(ramp(A,11,13))}">adolescence: onset</text>`}
    /* lane labels */
    s+=`<text x="${L.x0}" y="${L.cy+L.ch+14}" class="t-sm" style="fill:var(--mood);font-weight:600">CHILD · reactions</text>`;
    s+=`<text x="${L.x0}" y="${L.ey-12}" class="t-sm" style="fill:${env==='inv'?'var(--storm)':'var(--calm)'};font-weight:600">ENVIRONMENT · responses</text>`;
    s+=`<rect x="${L.x0}" y="${L.ey}" width="${W}" height="${L.eh}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    /* child wave */
    const f=u=>caLevel(env,u*CA_AGE);
    const wv=wave(L.x0,L.cy,W,L.ch,f,{upto:t,fill:true,dot:true,base:true,col:'var(--mood)'});
    s+=wv.svg;
    /* braid: exchanges up to now */
    const my=L.ey+L.eh/2;
    CA_EV.forEach((e,i)=>{if(e>A)return;const r=caResp(env,i,e),age=A-e,op=f1(clamp(1-age/9,.18,1));
      const pk=wv.at(Math.min(t,(e+.12)/CA_AGE)),xr=X(e+.32);
      const col=r==='d'?'var(--storm)':r==='v'?'var(--calm)':r==='a'?'var(--gold)':'var(--muted)',mk=r==='d'?'caD':r==='v'?'caV':r==='a'?'caG':'caN';
      /* child signal down to the environment */
      s+=`<path d="M${f1(pk[0])} ${f1(pk[1]+6)}C${f1(pk[0]+4)} ${f1((pk[1]+my)/2)} ${f1(xr-8)} ${f1((pk[1]+my)/2)} ${f1(xr-3)} ${f1(my-12)}" style="fill:none;stroke:var(--mood);stroke-width:1.3;opacity:${op}" marker-end="url(#caA)"/>`;
      /* the response marker and its arrow back up */
      if(A>=e+.3){const xb=X(e+.62),yb=wv.at(Math.min(t,(e+.6)/CA_AGE))[1];
        s+=`<circle cx="${f1(xr)}" cy="${f1(my)}" r="${r==='a'?6.5:5}" style="fill:${col};opacity:${op}"/>`;
        s+=`<path d="M${f1(xr+3)} ${f1(my-8)}C${f1(xr+8)} ${f1((yb+my)/2)} ${f1(xb-2)} ${f1((yb+my)/2+6)} ${f1(xb)} ${f1(yb+10)}" style="fill:none;stroke:${col};stroke-width:${r==='a'?2.2:1.3};opacity:${op};stroke-dasharray:${r==='d'?'3 3':'none'}" marker-end="url(#${mk})"/>`}});
    /* bubbles for the current phase */
    const cur=wv.at(t),bw=L.bw,bx=clamp(cur[0]-bw*.7,L.x0-8,L.x1-bw+8);
    if(t>.004){
      const ex=CA_EV.filter(e=>e<=A).pop();
      const by=N?L.ey+L.eh+14:L.ey+L.eh+10;
      const ecol=env==='inv'?(p===0?'var(--muted)':'var(--storm)'):(p===0?'var(--muted)':'var(--calm)');
      if(ex!=null){const ebx=clamp(X(ex)-bw/2,L.x0-8,L.x1-bw+8);
        s+=bubble(ebx,N?by+4:by-2,bw,T.e.length*15+12,{lines:T.e,col:ecol,tx:X(ex+.32),ty:my+8});}
      const cyb=Math.max(4,L.cy-12-(T.c.length*15+12));
      if(!N||true){s+=bubble(bx,N?cyb+6:cyb+22,bw,T.c.length*15+12,{lines:T.c,col:'var(--mood)',think:true,tx:cur[0],ty:cur[1]-8})}
    }
    /* time axis */
    s+=tline(L.x0,L.ty,W,{min:0,max:25,step:5,fmt:v=>v,label:'age (years)'}).svg;
    s+=`<line x1="${f1(X(A))}" x2="${f1(X(A))}" y1="${L.cy-6}" y2="${L.ty}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3;opacity:.45"/>`;
    /* outcome box */
    const [ox,oy,ow,oh]=L.ob,show=ramp(t,.7,.82),inv=env==='inv';
    s+=`<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" rx="12" style="fill:${inv?'var(--storm-soft)':'var(--calm-soft)'};stroke:${inv?'var(--storm)':'var(--calm)'};stroke-width:1.2;opacity:${f1(.25+show*.75)}"/>`;
    const head=inv?['One possible','path']:['Same','temperament'];
    const body=inv?['Pervasive emotion','dysregulation: the','pattern the model','links to BPD']:['More ways to','manage strong','feelings; lower','risk (schematic)'];
    const tx=ox+ow/2;
    if(show>0){s+=`<g style="opacity:${f1(show)}">`;
      if(N){s+=`<text x="${tx}" y="${oy+28}" class="t-big t-mid">${head.join(' ')}</text>`;body.forEach((b,i)=>s+=`<text x="${tx}" y="${oy+54+i*17}" class="t-sm t-mid" style="fill:var(--ink)">${b}</text>`);
        s+=`<text x="${tx}" y="${oy+oh-14}" class="t-xs t-mid">schematic; traits often ease later</text>`}
      else{head.forEach((h,i)=>s+=`<text x="${tx}" y="${oy+34+i*20}" class="t-big t-mid">${h}</text>`);body.forEach((b,i)=>s+=`<text x="${tx}" y="${oy+90+i*17}" class="t-sm t-mid" style="fill:var(--ink)">${b}</text>`);
        ['schematic, not','a prediction;','traits often','ease with age'].forEach((b,i)=>s+=`<text x="${tx}" y="${oy+190+i*14}" class="t-xs t-mid">${b}</text>`)}
      s+='</g>'}
    else{s+=`<text x="${tx}" y="${oy+(N?oh/2:oh/2)}" class="t-xs t-mid">${N?'outcome appears at 18+':'outcome'}</text>`;if(!N)s+=`<text x="${tx}" y="${oy+oh/2+14}" class="t-xs t-mid">at 18+</text>`}
    /* legend */
    const lgY=N?L.ty+50:L.ty+32,lg=env==='inv'?[['var(--storm)','dismissed'],['var(--gold)',N?'answered late':'answered after escalating'],['var(--calm)','validated']]:[['var(--calm)','validated'],['var(--mood)','child’s signal']];
    let lx=L.x0;lg.forEach(([c,n])=>{s+=`<circle cx="${f1(lx+5)}" cy="${lgY-3}" r="4.5" style="fill:${c}"/><text x="${f1(lx+14)}" y="${lgY}" class="t-xs">${n}</text>`;lx+=n.length*(N?7.2:5.9)+(N?26:30)});
    svg.innerHTML=s;
    setSt(p);
    const lv=caLevel(env,A);
    rg.setAttribute('aria-valuetext',`Age ${A.toFixed(1)}: ${CA_STEPS[p].t}`);
    $('#caRead').innerHTML=`<span>age <b>${A.toFixed(1)} y</b></span><span>environment <b>${env==='inv'?'mostly invalidating':'mostly validating'}</b></span><span>reaction now <b>${Math.round(lv*100)}</b> / 100 (schematic)</span>`;
    $('#caNote').innerHTML=noteHTML(CA_STEPS[p]);
  }
  const stop=playWire(rg,$('#caPlay'),draw,22000,'Replay','causes');
  const setSt=stepWire($('#caSteps'),CA_STEPS,rg,draw,stop);
  $$('[data-caenv]').forEach(b=>b.addEventListener('click',()=>{env=b.dataset.caenv;$$('[data-caenv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- forest plot ---------- */
  const R=[
   {g:'design',n:'Any adversity: BPD vs non-clinical controls',sn:'Adversity vs non-clinical',or:13.91,lo:11.11,hi:17.43,src:'Porter 2020 · 97 studies · case–control',k:'Porter2020',c:'<sup class="c" data-ref="Porter2020" title="Source 416">416</sup>',
    d:'People with BPD were 13.91 times more likely to report childhood adversity than non-clinical controls in case–control studies. This is the biggest number, and also the design most open to recall and selection differences.'},
   {g:'design',n:'Any adversity: BPD vs other psychiatric groups',sn:'vs other psychiatric groups',or:3.15,lo:2.62,hi:3.79,src:'Porter 2020',k:'Porter2020',c:'<sup class="c" data-ref="Porter2020" title="Source 416">416</sup>',
    d:'Compared with people with other psychiatric diagnoses, the odds ratio for reported adversity was 3.15: adversity is common in many conditions, not only BPD.'},
   {g:'design',n:'Any adversity: retrospective cohorts',sn:'Retrospective cohorts',or:2.59,lo:.93,hi:7.3,src:'Porter 2020',k:'Porter2020',c:'<sup class="c" data-ref="Porter2020" title="Source 416">416</sup>',
    d:'In retrospective cohort studies the odds ratio was 2.59, and its interval (0.93–7.30) crosses 1.'},
   {g:'design',n:'Any adversity: epidemiological studies',sn:'Epidemiological studies',or:2.56,lo:1.24,hi:5.3,src:'Porter 2020',k:'Porter2020',c:'<sup class="c" data-ref="Porter2020" title="Source 416">416</sup>',
    d:'In population (epidemiological) studies the odds ratio was 2.56. The drop from 13.91 to about 2.6 shows that most people exposed to adversity do not develop BPD.'},
   {g:'design',n:'Abuse or neglect, US population (adjusted)',sn:'NESARC, adjusted',lo:1.22,hi:1.63,range:true,src:'Afifi 2011 · NESARC n = 34,653 · cluster A/B PD',k:'Afifi2011',c:'<sup class="c" data-ref="Afifi2011" title="Source 2">2</sup>',
    d:'In the nationally representative NESARC survey, childhood abuse and neglect stayed linked to cluster A and B personality disorders after adjusting for other adversities and disorders, but the adjusted odds ratios were modest: 1.22 to 1.63 (the bar shows that range, not a confidence interval).'},
   {g:'abuse',n:'Emotional abuse (case–control)',sn:'Emotional abuse',or:38.11,lo:25.99,hi:55.88,src:'Porter 2020',k:'Porter2020',c:'<sup class="c" data-ref="Porter2020" title="Source 416">416</sup>',
    d:'Emotional abuse showed the largest effect of any subtype in the case–control data: OR 38.11.'},
   {g:'abuse',n:'Sexual abuse (youth, ≤19)',sn:'Sexual abuse, youth',or:4.88,lo:3.3,hi:7.21,src:'Winsper 2016 · 61 studies',k:'Winsper2016',c:'<sup class="c" data-ref="Winsper2016,Zanarini1997" title="Source 558,568">558,568</sup>',
    d:'In a meta-analysis of 61 youth studies (age 19 or under), sexual abuse went with youth BPD at OR 4.88. In adults, sexual abuse is “neither necessary nor sufficient” for BPD.'},
   {g:'abuse',n:'Physical abuse (youth)',sn:'Physical abuse, youth',or:2.79,lo:2.03,hi:3.84,src:'Winsper 2016',k:'Winsper2016',c:'<sup class="c" data-ref="Winsper2016" title="Source 558">558</sup>',d:'Physical abuse and youth BPD: OR 2.79.'},
   {g:'abuse',n:'Maternal hostility / verbal abuse (youth)',sn:'Maternal hostility, youth',or:3.28,lo:2.67,hi:4.03,src:'Winsper 2016',k:'Winsper2016',c:'<sup class="c" data-ref="Winsper2016" title="Source 558">558</sup>',d:'Maternal hostility or verbal abuse and youth BPD: OR 3.28.'},
   {g:'neglect',n:'Neglect (case–control)',sn:'Neglect',or:17.73,lo:13.01,hi:24.17,src:'Porter 2020 · Zanarini 1997',k:'Porter2020',c:'<sup class="c" data-ref="Porter2020,Zanarini1997" title="Source 416,568">416,568</sup>',
    d:'Neglect had the second-largest effect in case–control data (OR 17.73). In 358 inpatients with BPD, 92% reported neglect before 18, and caretaker neglect by both genders was a significant risk factor.'},
   {g:'neglect',n:'Neglect (youth)',sn:'Neglect, youth',or:3.4,lo:2.27,hi:5.11,src:'Winsper 2016',k:'Winsper2016',c:'<sup class="c" data-ref="Winsper2016" title="Source 558">558</sup>',d:'Neglect and youth BPD: OR 3.40.'},
   {g:'bully',n:'Bullied: self-report',sn:'Bullied, self-report',or:2.82,lo:2.13,hi:3.72,src:'Wolke 2012 · ALSPAC 6,050 pairs · symptoms at ~11.8 y',k:'Wolke2012',c:'<sup class="c" data-ref="Wolke2012" title="Source 564">564</sup>',
    d:'In ALSPAC, peer-bullying victims had higher odds of BPD symptoms at about 11.8 years after adjusting for confounders: 2.82 by self-report.'},
   {g:'bully',n:'Bullied: mother report',sn:'Bullied, mother report',or:2.43,lo:1.86,hi:3.16,src:'Wolke 2012',k:'Wolke2012',c:'<sup class="c" data-ref="Wolke2012" title="Source 564">564</sup>',d:'By mother report: OR 2.43.'},
   {g:'bully',n:'Bullied: teacher report',sn:'Bullied, teacher report',or:1.95,lo:1.34,hi:2.83,src:'Wolke 2012',k:'Wolke2012',c:'<sup class="c" data-ref="Wolke2012" title="Source 564">564</sup>',d:'By teacher report: OR 1.95. All three informants agree on the direction.'},
   {g:'bully',n:'Chronically bullied',sn:'Chronically bullied',or:5.44,lo:3.86,hi:7.66,src:'Wolke 2012',k:'Wolke2012',c:'<sup class="c" data-ref="Wolke2012" title="Source 564">564</sup>',d:'Chronic bullying gave an OR of 5.44 for BPD symptoms at 11, a dose–response pattern.'},
   {g:'bully',n:'Relational + overt victimisation',sn:'Relational + overt',or:7.1,lo:4.79,hi:10.51,src:'Wolke 2012',k:'Wolke2012',c:'<sup class="c" data-ref="Wolke2012" title="Source 564">564</sup>',d:'Combined relational and overt victimisation: OR 7.10.'},
   {g:'family',n:'Family adversity in pregnancy: 1–2',sn:'Family adversity 1–2',or:1.34,lo:1.01,hi:1.77,src:'Winsper 2012 · ALSPAC · symptoms at 11',k:'Winsper2012',c:'<sup class="c" data-ref="Winsper2012" title="Source 557">557</sup>',
    d:'Family adversity measured in pregnancy predicted probable BPD symptoms at 11 in a dose–response way: 1–2 adversities OR 1.34.'},
   {g:'family',n:'Family adversity in pregnancy: more than 2',sn:'Family adversity >2',or:1.99,lo:1.34,hi:2.94,src:'Winsper 2012',k:'Winsper2012',c:'<sup class="c" data-ref="Winsper2012" title="Source 557">557</sup>',d:'More than 2 adversities: OR 1.99.'},
   {g:'family',n:'Suboptimal parenting (per index point)',sn:'Suboptimal parenting / point',or:1.13,lo:1.05,hi:1.23,src:'Winsper 2012',k:'Winsper2012',c:'<sup class="c" data-ref="Winsper2012" title="Source 557">557</sup>',d:'Each point on a suboptimal-parenting index raised the odds of probable BPD symptoms: OR 1.13 per point.'},
   {g:'family',n:'Parent conflict',sn:'Parent conflict',or:1.19,lo:1.06,hi:1.34,src:'Winsper 2012',k:'Winsper2012',c:'<sup class="c" data-ref="Winsper2012" title="Source 557">557</sup>',d:'Conflict between parents: OR 1.19.'},
   {g:'family',n:'Parental psychiatric history',sn:'Parental psychiatric history',none:'modifies the harsh-treatment effect',src:'Belsky 2012 · E-Risk 1,116 twin pairs',k:'Belsky2012',c:'<sup class="c" data-ref="Belsky2012" title="Source 48">48</sup>',
    d:'No pooled odds ratio. In E-Risk, harsh treatment through age 10 predicted borderline-related characteristics at 12, and the effect was stronger in children with a family history of psychiatric illness: a diathesis–stress pattern.'},
   {g:'attach',n:'Insecure attachment',sn:'Insecure attachment',none:'13 of 13 studies: strong link',src:'Agrawal 2004 · review',k:'Agrawal2004',c:'<sup class="c" data-ref="Agrawal2004" title="Source 3">3</sup>',
    d:'No pooled odds ratio. All 13 studies in the review reported a strong association between BPD and insecure attachment (unresolved, preoccupied, fearful); the direction of effect is unclear.'},
   {g:'attach',n:'Maternal withdrawal at 18 months',sn:'Maternal withdrawal, 18 mo',none:'predicted symptoms at ~20 y',src:'Lyons-Ruth 2013 · 56 families',k:'LyonsRuth2013',c:'<sup class="c" data-ref="LyonsRuth2013" title="Source 325">325</sup>',
    d:'No odds ratio. Observed maternal withdrawal at 18 months predicted borderline symptoms in late adolescence, independently of childhood abuse severity.'}];
  const fs=$('#caForest'),pk=$('#caPick');let grp='all',sel=3;
  pk.innerHTML=R.map((r,i)=>`<option value="${i}">${r.n}${r.or?` (OR ${r.or})`:''}</option>`).join('');pk.value=sel;
  const LX=v=>Math.log(v)/Math.log(60);
  function drawF(){
    const N=vb(fs,'720 100','400 100'),rows=R.map((r,i)=>[r,i]).filter(([r])=>grp==='all'||r.g===grp);
    const rh=N?40:24,top=40,H=top+rows.length*rh+44;
    fs.setAttribute('viewBox',`0 0 ${N?400:720} ${H}`);
    const px0=N?16:322,px1=N?318:572,X=v=>lerp(px0,px1,LX(clamp(v,1,60)));
    let s='';
    [1,2,5,10,20,50].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-8}" y2="${H-36}" class="${v===1?'axis':'grid'}" style="${v===1?'stroke:var(--muted);stroke-dasharray:4 3':''}"/><text x="${f1(X(v))}" y="${H-20}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1((px0+px1)/2)}" y="${H-5}" class="t-xs t-mid">odds ratio (log scale)</text>`;
    s+=`<text x="${N?px0:10}" y="${top-18}" class="t-xs" style="font-weight:600">${N?'ESTIMATE':'RISK FACTOR / DESIGN'}</text><text x="${N?390:712}" y="${top-18}" class="t-xs t-end" style="font-weight:600">OR (95% CI)</text>`;
    const gc={design:'var(--dx)',abuse:'var(--storm)',neglect:'var(--amyg)',bully:'var(--gold)',family:'var(--mood)',attach:'var(--bond)'};
    rows.forEach(([r,i],k)=>{const y=top+k*rh+(N?24:12),on=i===sel,c=gc[r.g];
      s+=`<g class="ca-row" data-row="${i}" tabindex="0" role="button" aria-label="${r.n}">`;
      s+=`<rect x="2" y="${f1(y-(N?30:12))}" width="${N?396:716}" height="${rh-2}" rx="6" style="fill:${on?'var(--storm-soft)':'transparent'}"/>`;
      if(N)s+=`<text x="${px0}" y="${f1(y-12)}" class="t-xs" style="fill:var(--ink);${on?'font-weight:700':''}">${r.sn}</text>`;
      else s+=`<text x="10" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);font-size:10.5px;${on?'font-weight:700':''}">${r.n}</text>`;
      if(r.none){s+=`<text x="${f1(X(1)+8)}" y="${f1(y+4)}" class="t-xs" style="fill:${c};font-style:italic">${r.none}</text><text x="${N?390:712}" y="${f1(y+4)}" class="t-xs t-end">no pooled OR</text>`}
      else{s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:${on?3:2};stroke-linecap:round${r.range?';stroke-dasharray:4 3':''}"/>`;
        if(!r.range){s+=`<rect x="${f1(X(r.or)-(on?6:4.5))}" y="${f1(y-(on?6:4.5))}" width="${on?12:9}" height="${on?12:9}" style="fill:${c}"/>`;
          s+=`<text x="${N?390:712}" y="${f1(y+4)}" class="t-xs t-end" style="fill:var(--ink)">${r.or.toFixed(2)} (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})</text>`}
        else s+=`<text x="${N?390:712}" y="${f1(y+4)}" class="t-xs t-end" style="fill:var(--ink)">${r.lo.toFixed(2)} to ${r.hi.toFixed(2)}</text>`}
      s+='</g>'});
    fs.innerHTML=s;
    const r=R[sel];
    $('#caDetail').innerHTML=`<div class="kicker">${r.src}</div><h4>${r.n}</h4><p>${r.d} ${r.c}</p>`+(r.g==='design'&&r.or>10?`<div class="hook"><b>Exam hook</b>Case–control OR 13.91 vs population OR ≈ 2.6: same exposure, very different numbers. Design shapes the estimate. <sup class="c" data-ref="Porter2020" title="Source 416">416</sup></div>`:'')+(r.g!=='design'?`<div class="pt"><b>In plain words</b>An odds ratio compares groups. It does not tell you what will happen to one child: most children with this experience do not develop BPD.</div>`:'');
  }
  $$('[data-cagrp]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.cagrp;$$('[data-cagrp]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(grp!=='all'&&R[sel].g!==grp){sel=R.findIndex(r=>r.g===grp);pk.value=sel}drawF()}));
  pk.addEventListener('change',()=>{sel=+pk.value;if(grp!=='all'&&R[sel].g!==grp){grp='all';$$('[data-cagrp]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.cagrp==='all'))}drawF()});
  fs.addEventListener('click',e=>{const g=e.target.closest('[data-row]');if(!g)return;sel=+g.dataset.row;pk.value=sel;drawF()});
  fs.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest('[data-row]');if(!g)return;e.preventDefault();sel=+g.dataset.row;pk.value=sel;drawF();const n=fs.querySelector(`[data-row="${sel}"]`);n&&n.focus()});
  drawF();

  /* ---------- 100 children ---------- */
  const IC=[{n:'any childhood adversity (epidemiological studies)',or:2.56},{n:'more than 2 family adversities in pregnancy',or:1.99},{n:'self-reported bullying',or:2.82},{n:'chronic bullying',or:5.44}];
  const is=$('#caIconSvg'),ip=$('#caIconPick'),P0=.017;
  function drawI(){const N=vb(is,'720 340','400 640'),c=IC[+ip.value],p1=c.or*P0/(1-P0+c.or*P0);
    const k0=Math.round(P0*100),k1=Math.round(p1*100);let s='';
    const grid=(gx,gy,k,title,pct,col)=>{let g=`<text x="${gx}" y="${gy-30}" class="t-lbl">${title}</text><text x="${gx}" y="${gy-14}" class="t-sm">≈ ${pct.toFixed(1)} in 100 · ${100-k} of 100 figures stay grey</text>`;
      for(let i=0;i<100;i++){const r=Math.floor(i/10),q=i%10,on=i>=100-k;g+=person(gx+q*27+8,gy+r*26,19,on?col:'var(--muted)',{op:on?1:.3})}return g};
    if(N){s+=grid(28,50,k0,'Without the exposure',P0*100,'var(--mood)');s+=grid(28,370,k1,'With '+(c.or<3?'it':'it'),p1*100,'var(--storm)')}
    else{s+=grid(50,60,k0,'100 children without the exposure',P0*100,'var(--mood)');s+=grid(400,60,k1,'100 children with '+c.n.split(' (')[0],p1*100,'var(--storm)')}
    is.innerHTML=s}
  ip.addEventListener('change',drawI);drawI();
  const prR=redraws.causes;redraws.causes=()=>{prR&&prR();drawF();drawI()};
  const ib=$('#caIconBtn');ib.addEventListener('click',()=>{const on=ib.getAttribute('aria-pressed')!=='true';ib.setAttribute('aria-pressed',on);$('#caIcons').classList.toggle('on',on);drawI()});
};
/* =============== 1.4 Genes & families =============== */
/* ---- twin view: three estimates of the variance split ---- */
const GE_EST=[
 {n:'Torgersen 2000',m:'92 MZ + 129 DZ pairs · interview (SCID-II)',A:69,C:0,E:31},
 {n:'Distel 2008',m:'5,496 twins · 3 countries · self-report',A:42,C:0,E:58},
 {n:'Skoglund 2021',m:'1,851,755 Swedes · diagnosed BPD · register',A:46,C:0,E:54}];
const GE_DOTS=[['Torgersen 2008',35],['Distel 2008',42],['Skoglund 2021',46],['Distel 2010',51],['Kendler 2011',60],['Torgersen 2000',69]];
const GE_TW=[
 {from:0,at:.07,k:'Twin designs',t:'Two kinds of twins',
  txt:`Identical (monozygotic, MZ) twins share all their genes; non-identical (dizygotic, DZ) twins share about half, like other full siblings. Both kinds usually grow up together. If identical twins are more alike for a trait than non-identical twins, genes are part of the reason. In the drawings, a bar joins each identical pair. <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`,
  pt:`Twins let researchers compare people who share all their genes with people who share half, while their homes are similar.`,
  hook:`MZ twins share 100% of their genes, DZ twins about 50%: the gap in their similarity is what twin models use.`},
 {from:.15,at:.27,k:'E-Risk · age 12',t:'Concordance',
  txt:`In the E-Risk birth cohort (1,116 same-sex twin pairs), the chance that a co-twin also had an extreme borderline-related score at 12, when one twin did, was 52% in identical and 7% in non-identical pairs. The twin correlations for the score were 0.66 and 0.29. The drawing shows 14 pairs of each kind with the first twin affected; watch the co-twins fill in. <sup class="c" data-ref="Belsky2012" title="Source 48">48</sup>`,
  pt:`When one identical twin had many borderline traits, the other often did too. With non-identical twins this was rare.`,
  hook:`E-Risk probandwise concordance for extreme borderline scores at 12: MZ 52% vs DZ 7%; correlations 0.66 vs 0.29. <sup class="c" data-ref="Belsky2012" title="Source 48">48</sup>`},
 {from:.32,at:.42,k:'Norway · 2000',t:'Torgersen 2000: 69%',
  txt:`The first interview-based twin study of all personality disorders (92 MZ and 129 DZ pairs, SCID-II) gave borderline PD a heritability of .69 in the best-fitting model. Shared family environment never entered the best models, although the authors could not rule out shared familial effects. The sample was moderate, so the estimate is uncertain. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Torgersen2000" title="Source 530">530</sup>`,
  pt:`In this small, careful study, about two-thirds of the differences between people in BPD traits were linked to genes.`,
  hook:`Torgersen 2000: h² = .69 for BPD (personality disorders overall .60). <sup class="c" data-ref="Torgersen2000" title="Source 530">530</sup>`},
 {from:.5,at:.58,k:'3 countries · 2008',t:'Distel 2008: 42%',
  txt:`In 5,496 twins from the Netherlands, Belgium and Australia who filled in a mailed questionnaire, additive genes explained 42% of the variation in BPD features, similarly in men and women and in all three countries. Unique environment explained the other 58%. Women scored higher than men, and younger adults higher than older adults. <span class="ev est">Established</span> <sup class="c" data-ref="Distel2008" title="Source 124">124</sup>`,
  pt:`A much bigger study using questionnaires found genes explain a bit under half. The rest came from experiences that differ even between siblings.`,
  hook:`Distel 2008: A = 42%, E = 58%, no shared-environment component. <sup class="c" data-ref="Distel2008" title="Source 124">124</sup>`},
 {from:.66,at:.74,k:'Sweden · 2021',t:'Skoglund 2021: 46%',
  txt:`A total-population register study followed 1,851,755 people born 1973–1993; 11,665 (0.6%) received a clinical BPD diagnosis. Heritability of diagnosed BPD was 46% (95% CI 39–53), with no shared-environment component; the rest was individually unique environment. Identical co-twins of a person with BPD had a hazard ratio of 11.5, non-identical co-twins 7.4. Switch to <b>Family &amp; register study</b> for the other relatives. <span class="ev est">Established</span> <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`,
  pt:`Using real diagnoses in a whole country, genes explained a little under half, the same range as the twin questionnaires.`,
  hook:`Swedish register: h² of diagnosed BPD = 46%; full-sibling hazard ratio 4.7. <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`},
 {from:.82,at:.92,k:'Reading the numbers',t:'What heritability is not',
  txt:`Heritability describes a population, not a person. Common variants measured by genome-wide studies explain about 17% (SNP heritability), roughly a third of the twin and family figure, a ratio typical of psychiatric disorders. In adult Norwegian twins, genes explained 72% of the 10-year stability of BPD traits, while unique environmental effects were mostly transient and the main source of change. And "unique environment" includes experiences such as abuse that siblings do not share. <sup class="c" data-ref="Streit2026,Streit2025medRxiv,ReichbornKjennerud2015" title="Source 426,516,517">426,516,517</sup>`,
  pt:`“46% heritable” does not mean 46% of your BPD came from genes, or that your child has a 46% chance. It describes how much of the variation between people in a group lines up with genes.`,
  hook:`Most non-genetic variance in BPD is unique (non-shared) environment, not shared family environment. <sup class="c" data-ref="Distel2008,Skoglund2021" title="Source 124,489">124,489</sup>`}];
/* ---- family view: relatives in a three-generation pedigree ---- */
const GE_REL=[
 {id:'mz',n:'identical co-twin',g:'100%',hr:11.5,lo:1.6,hi:83.8},
 {id:'dz',n:'non-identical co-twin',g:'50%',hr:7.4,lo:1,hi:55.3},
 {id:'sib',n:'full sibling',g:'50%',hr:4.7,lo:3.9,hi:5.6},
 {id:'mh',n:'maternal half-sibling',g:'25%',hr:2.1,lo:1.5,hi:3},
 {id:'cou',n:'cousin',g:'12.5%',hr:1.7,lo:1.4,hi:2},
 {id:'ph',n:'paternal half-sibling',g:'25%',hr:1.3,lo:.9,hi:2.1}];
const GE_FM=[
 {from:0,at:.07,k:'Swedish register',t:'One person with BPD',
  txt:`The proband (arrow) is a person with a clinical BPD diagnosis. In the Swedish total-population register of 1,851,755 people born 1973–1993, 11,665 (0.6%) received one between 1997 and 2013, and 85.4% of them were female. The question is how much more often their relatives are diagnosed than people in general. <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`,
  pt:`Researchers start from one person with BPD and ask: how often do their relatives also have it?`,
  hook:`Familial risk is reported as a hazard ratio: how many times more often relatives are diagnosed than the general population.`},
 {from:.15,at:.24,k:'Co-twins',t:'Twins: 11.5 and 7.4',
  txt:`Adjusted hazard ratios: identical co-twin 11.5 (95% CI 1.6–83.8), non-identical co-twin 7.4 (1.0–55.3). Twins with a diagnosis are rare even in a whole country, so the intervals are very wide; the bars on the right are clipped. <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`,
  pt:`The closer the genetic match, the higher the risk, but even an identical twin’s risk is far from certain.`,
  hook:`Wide CIs for twins (MZ 1.6–83.8): few twin pairs, so treat these as rough. <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`},
 {from:.32,at:.41,k:'Siblings',t:'Full siblings: 4.7',
  txt:`Full siblings had a hazard ratio of 4.7 (3.9–5.6), a much more precise estimate. In the McLean family study, where 885 siblings and parents were all interviewed directly, BPD was found in 14.1% of relatives of people with BPD versus 4.9% of relatives of people without it (risk ratio 2.9, 95% CI 1.5–5.5). All four sectors of BPD (affective, interpersonal, behavioural, cognitive) ran in families, the affective and interpersonal ones most strongly. <sup class="c" data-ref="Skoglund2021,Gunderson2011Family" title="Source 205,489">205,489</sup>`,
  pt:`A brother or sister of someone with BPD is more likely to have it too, but most do not: about 86 in 100 relatives in the McLean study did not.`,
  hook:`McLean family study: BPD in 14.1% vs 4.9% of relatives; risk ratio 2.9. <sup class="c" data-ref="Gunderson2011Family" title="Source 205">205</sup>`},
 {from:.5,at:.59,k:'Half-siblings',t:'Half-siblings: 2.1 and 1.3',
  txt:`Half-siblings share about a quarter of their genes. The hazard ratio was 2.1 (1.5–3.0) for maternal half-siblings and 1.3 (0.9–2.1) for paternal half-siblings; the paternal interval crosses 1, so it is compatible with no raised risk. <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`,
  pt:`Half-brothers and half-sisters have a smaller raise in risk than full siblings.`,
  hook:`Familial risk falls with genetic relatedness: MZ 11.5 → full sib 4.7 → maternal half-sib 2.1. <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`},
 {from:.66,at:.75,k:'Cousins',t:'Cousins: 1.7',
  txt:`Cousins whose parents were full siblings had a hazard ratio of 1.7 (1.4–2.0). The study reported no parent–offspring pairs, because it followed people born 1973–1993, so the pedigree leaves the parents without a number. <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`,
  pt:`Cousins share about an eighth of their genes, and their risk is only a little higher than average.`,
  hook:`No parent risk in Skoglund 2021: the cohort design had no parent–child pairs. <sup class="c" data-ref="Skoglund2021" title="Source 489">489</sup>`},
 {from:.82,at:.92,k:'Putting it together',t:'Genes, not destiny',
  txt:`The gradient from twins to cousins, together with twin models, gives heritability of 46% for diagnosed BPD, with no shared-environment component. Both numbers describe groups. Most relatives, even siblings, do not develop BPD, and a family history is not a forecast. BPD also aggregates with ADHD in families (full sibling with ADHD: adjusted OR 2.8 for BPD). <sup class="c" data-ref="Skoglund2021,Gunderson2011Family,KujaHalkola2021" title="Source 205,286,489">205,286,489</sup>`,
  pt:`BPD runs in families partly through genes, but most relatives never develop it. Knowing the family history can help people notice early signs and get support.`,
  hook:`First-degree relatives: higher risk, still a minority affected (14.1%). <sup class="c" data-ref="Gunderson2011Family" title="Source 205">205</sup>`}];

inits.genes=()=>{
  const svg=$('#geSvg'),rg=$('#geT'),stEl=$('#geSteps');let mode='twin';
  const STEPS=()=>mode==='twin'?GE_TW:GE_FM;
  /* own stepper so the labels can change with the design */
  function wireSteps(){const S=STEPS();stEl.innerHTML=S.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('')}
  stEl.setAttribute('role','group');stEl.setAttribute('aria-label','Steps');
  stEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop();const s=STEPS()[+b.dataset.st];rg.value=s.at;draw(s.at)});
  function setSt(i){$$('[data-st]',stEl).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));const s=STEPS()[i];if(s)rg.setAttribute('aria-valuetext',`Step ${i+1} of ${STEPS().length}: ${s.t}`)}

  /* variance split at time t */
  function split(t){const k=[[.32,0],[.5,1],[.66,2]];let i=-1;k.forEach(([a,j])=>{if(t>=a)i=j});
    if(i<0)return null;const cur=GE_EST[i],prev=GE_EST[Math.max(0,i-1)],m=i===0?1:ease(ramp(t,k[i][0],k[i][0]+.06));
    return {A:lerp(prev.A,cur.A,m),C:0,E:lerp(prev.E,cur.E,m),est:cur}}
  function twinPairs(x0,y0,cols,n,kind,conc,show,pw,ph){let s='';
    for(let i=0;i<n;i++){const c=i%cols,r=Math.floor(i/cols),cx=x0+c*pw+pw/2,y=y0+r*ph,sex=i%3===2?'m':'f';
      const op=clamp(show*n-i,0,1);if(op<=0)continue;
      const a=cx-11,b=cx+11;s+=`<g style="opacity:${f1(op)}">`;
      s+=`<path d="M${f1(cx)} ${y-20}L${f1(a)} ${y-9}M${f1(cx)} ${y-20}L${f1(b)} ${y-9}" style="stroke:var(--ink);stroke-width:1.2;fill:none"/>`;
      if(kind==='mz')s+=`<line x1="${f1(cx-5.5)}" x2="${f1(cx+5.5)}" y1="${y-14.5}" y2="${y-14.5}" style="stroke:var(--ink);stroke-width:1.2"/>`;
      const cc=clamp(conc-i,0,1);
      s+=ped(a,y,sex,1,{r:8});s+=ped(b,y,sex,0,{r:8});
      if(cc>0)s+=(sex==='m'?`<rect x="${f1(b-8)}" y="${f1(y-8)}" width="16" height="16" rx="1.5"`:`<circle cx="${f1(b)}" cy="${y}" r="8"`)+` style="fill:var(--storm);opacity:${f1(cc)};stroke:var(--ink);stroke-width:1.5"/>`;
      s+='</g>'}
    return s}
  function drawTwin(t,N){let s='';const p=phaseOf(GE_TW,t);
    /* twin pairs */
    const L=N?{x0:12,y0:66,cols:7,pw:53,ph:44,gap:136,bx:20,by:340,bw:360,dy:500,cy:600}:{x0:16,y0:70,cols:7,pw:52,ph:46,gap:146,bx:410,by:70,bw:290,dy:216,cy:340};
    const show=ramp(t,0,.1),fill=ramp(t,.16,.28);
    const mzc=7*fill,dzc=1*ramp(fill,.5,1);
    s+=`<text x="${L.x0+4}" y="${L.y0-44}" class="t-sm" style="fill:var(--ink);font-weight:600">Identical (MZ) pairs</text><text x="${L.x0+4}" y="${L.y0-30}" class="t-xs">${fill>0?`co-twin affected: <tspan style="fill:var(--storm);font-weight:700">${Math.round(mzc)} of 14</tspan> (study: 52%)`:'share ~100% of genes'}</text>`;
    s+=twinPairs(L.x0,L.y0,L.cols,14,'mz',mzc,show,L.pw,L.ph);
    const y2=L.y0+L.gap;
    s+=`<text x="${L.x0+4}" y="${y2-44}" class="t-sm" style="fill:var(--ink);font-weight:600">Non-identical (DZ) pairs</text><text x="${L.x0+4}" y="${y2-30}" class="t-xs">${fill>0?`co-twin affected: <tspan style="fill:var(--storm);font-weight:700">${Math.round(dzc)} of 14</tspan> (study: 7%)`:'share ~50% of genes'}</text>`;
    s+=twinPairs(L.x0,y2,L.cols,14,'dz',dzc,show,L.pw,L.ph);
    if(!N)s+=`<text x="${L.x0+4}" y="${y2+L.ph+30}" class="t-xs">Filled = extreme borderline-related score at 12 (E-Risk). Left twin of each pair affected.</text>`;
    /* variance bar */
    const sp=split(t),bx=L.bx,by=L.by,bw=L.bw;
    s+=`<text x="${bx}" y="${by-30}" class="t-sm" style="fill:var(--ink);font-weight:600">WHERE THE VARIATION COMES FROM</text>`;
    if(!sp){s+=`<rect x="${bx}" y="${by-16}" width="${bw}" height="34" rx="6" style="fill:var(--panel-2);stroke:var(--line);stroke-dasharray:4 3"/><text x="${bx+bw/2}" y="${by+5}" class="t-xs t-mid">estimates appear from step 3</text>`}
    else{const segs=[['A','additive genes',sp.A,'var(--mood)'],['C','shared environment',sp.C,'var(--gold)'],['E','unique environment',sp.E,'var(--calm)']];let x=bx;
      segs.forEach(([k,n,v,c])=>{const w=bw*v/100;if(w>0.5){s+=`<rect x="${f1(x)}" y="${by-16}" width="${f1(w)}" height="34" style="fill:${c};opacity:.85"/>`;
        if(w>34)s+=`<text x="${f1(x+w/2)}" y="${by+5}" class="t-lbl t-mid" style="fill:var(--bg)">${k} ${Math.round(v)}%</text>`}x+=w});
      s+=`<rect x="${bx}" y="${by-16}" width="${bw}" height="34" rx="2" style="fill:none;stroke:var(--line)"/>`;
      if(p===5){const w=bw*17.3/100;s+=`<rect x="${bx}" y="${by+20}" width="${f1(w)}" height="8" style="fill:var(--mood)"/><text x="${f1(bx+w+6)}" y="${by+28}" class="t-xs" style="fill:var(--mood)">common variants (GWAS): 17.3%</text>`}
      let lx=bx;segs.forEach(([k,n,v,c])=>{const nn={A:'genes',C:'shared env.',E:'unique env.'}[k];s+=`<rect x="${f1(lx)}" y="${by+(p===5?38:28)}" width="10" height="10" rx="2" style="fill:${c}"/><text x="${f1(lx+14)}" y="${by+(p===5?47:37)}" class="t-xs">${k} ${nn}</text>`;lx+=N?(k==='A'?88:k==='C'?126:0):(k==='A'?72:k==='C'?102:0)});
      s+=`<text x="${bx}" y="${by+(p===5?72:62)}" class="t-lbl" style="fill:var(--mood)">${sp.est.n}</text><text x="${bx}" y="${by+(p===5?88:78)}" class="t-xs">${sp.est.m}</text>`}
    /* heritability dot strip */
    const dy=L.dy,X=v=>bx+bw*v/80;
    s+=`<text x="${bx}" y="${dy-26}" class="t-sm" style="fill:var(--ink);font-weight:600">HERITABILITY BY STUDY</text>`;
    s+=`<line x1="${bx}" x2="${bx+bw}" y1="${dy}" y2="${dy}" class="axis"/>`;
    [0,20,40,60,80].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${dy-3}" y2="${dy+3}" class="axis"/><text x="${f1(X(v))}" y="${dy+16}" class="t-xs t-mid">${v}%</text>`);
    const shown=ramp(t,.32,.9)*GE_DOTS.length;
    GE_DOTS.forEach(([n,v],i)=>{const op=clamp(shown-i,0,1);if(op<=0)return;const on=sp&&sp.est.n===n,y=dy-10-(i%2)*0;
      s+=`<circle cx="${f1(X(v))}" cy="${dy}" r="${on?7:5}" style="fill:var(--mood);opacity:${f1(op*(on?1:.55))};stroke:var(--panel);stroke-width:1.5"/>`;
      if(on)s+=`<text x="${f1(X(v))}" y="${dy-12}" class="t-xs t-mid" style="fill:var(--mood);font-weight:700">${v}%</text>`});
    if(p===5){s+=`<path d="M${f1(X(17.3))} ${dy-7}l5 7l-5 7l-5 -7z" style="fill:var(--gold)"/><text x="${f1(X(17.3))}" y="${dy-12}" class="t-xs t-mid" style="fill:var(--gold)">SNP 17.3%</text>`}
    s+=`<text x="${bx}" y="${dy+34}" class="t-xs">${p===5?'dots: 6 twin/register studies · diamond: GWAS':'dots: six twin and register studies, 35–69%'}</text>`;
    /* concordance mini bars */
    if(fill>0){const cy=L.cy,cx=bx,cw=bw*.8;
      s+=`<text x="${cx}" y="${cy-18}" class="t-sm" style="fill:var(--ink);font-weight:600">PROBANDWISE CONCORDANCE, AGE 12</text>`;
      [['MZ',52,'var(--storm)'],['DZ',7,'var(--other)']].forEach(([k,v,c],i)=>{const y=cy+i*20,w=cw*v/100*fill;
        s+=`<text x="${cx}" y="${y+9}" class="t-xs">${k}</text><rect x="${cx+26}" y="${y}" width="${f1(cw)}" height="11" rx="3" style="fill:var(--panel-2)"/><rect x="${cx+26}" y="${y}" width="${f1(w)}" height="11" rx="3" style="fill:${c}"/><text x="${f1(cx+32+cw)}" y="${y+9}" class="t-xs">${Math.round(v*fill)}%</text>`})}
    return s}
  function drawFam(t,N){let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;const p=phaseOf(GE_FM,t);
    const sc=N?.84:1,ox=N?6:12,oy=N?16:10,P=(x,y)=>[ox+x*sc,oy+y*sc];
    const vis={mz:ramp(t,.15,.2),dz:ramp(t,.15,.2),sib:ramp(t,.32,.37),mh:ramp(t,.5,.55),ph:ramp(t,.5,.55),cou:ramp(t,.66,.71)};
    const ln=(a,b,c,d,o=1)=>{const A=P(a,b),B=P(c,d);return `<line x1="${f1(A[0])}" y1="${f1(A[1])}" x2="${f1(B[0])}" y2="${f1(B[1])}" style="stroke:var(--ink);stroke-width:1.3;opacity:${f1(o)}"/>`};
    const pd=(x,y,sex,aff,o={})=>{const q=P(x,y);return `<g style="opacity:${f1(o.op==null?1:o.op)}">`+ped(q[0],q[1],sex,aff,{r:11*sc,proband:o.proband})+'</g>'};
    const lab=(x,y,txt,col,o=1,bold)=>{const q=P(x,y);return `<text x="${f1(q[0])}" y="${f1(q[1])}" class="t-xs t-mid" style="fill:${col||'var(--muted)'};opacity:${f1(o)}${bold?';font-weight:700':''}">${txt}</text>`};
    /* generation labels */
    if(!N)[['I',60],['II',170],['III',290]].forEach(([g,y])=>{const q=P(0,y+4);s+=`<text x="${f1(q[0])}" y="${f1(q[1])}" class="t-xs">${g}</text>`});
    /* gen I: grandparents */
    s+=ln(277,60,313,60)+pd(265,60,'m',0)+pd(325,60,'f',0)+ln(295,60,295,120)+ln(210,120,380,120)+ln(210,120,210,159)+ln(380,120,380,159);
    s+=lab(200,64,'grandparents');
    /* gen II */
    s+=ln(20,170,90,170,vis.ph)+pd(20,170,'f',0,{op:vis.ph})+ln(90,170,210,170)+pd(90,170,'m',0)+pd(210,170,'f',0)+ln(210,170,300,170,vis.mh)+pd(300,170,'m',0,{op:vis.mh})+ln(380,170,440,170,vis.cou)+pd(380,170,'f',0)+pd(440,170,'m',0,{op:vis.cou});
    s+=lab(90,198,'father')+lab(210,198,'mother')+lab(380,198,'aunt');
    if(p>=4){const q=P(150,213);s+=`<rect x="${f1(q[0]-82*sc)}" y="${f1(q[1]-10*sc)}" width="${f1(164*sc)}" height="${f1(14*sc)}" rx="3" style="fill:var(--panel);opacity:${f1(ramp(t,.68,.74))}"/>`+lab(150,213,'parents: no register estimate','var(--gold)',ramp(t,.68,.74))}
    /* gen III sibships */
    s+=ln(55,170,55,240,vis.ph)+ln(55,240,40,279,vis.ph);
    s+=ln(150,170,150,240)+ln(132,240,215,240)+ln(215,240,215,279,vis.sib)+ln(132,240,132,250)+ln(132,250,105,279)+ln(132,250,160,279,vis.mz);
    s+=ln(255,170,255,240,vis.mh)+ln(255,240,285,279,vis.mh)+ln(410,170,410,279,vis.cou);
    if(vis.mz>0){const a=P(118,265),b=P(146,265);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:var(--ink);stroke-width:1.3;opacity:${f1(vis.mz)}"/>`}
    s+=pd(105,290,'f',1,{proband:true});
    s+=pd(160,290,'f',0,{op:vis.mz})+pd(215,290,'m',0,{op:vis.sib})+pd(40,290,'m',0,{op:vis.ph})+pd(285,290,'f',0,{op:vis.mh})+pd(410,290,'f',0,{op:vis.cou});
    if(N){s+=lab(105,326,'BPD','var(--storm)',1,true);
      const hn=(x,id,l,v)=>{const o=vis[id];return lab(x,326,l,'var(--ink)',o)+lab(x,344,v,'var(--storm)',o,true)};
      s+=hn(40,'ph','pat.½','1.3')+hn(160,'mz','twin','11.5/7.4')+hn(215,'sib','sib','4.7')+hn(285,'mh','mat.½','2.1')+hn(410,'cou','cousin','1.7')}
    else{s+=lab(105,322,'person','var(--storm)',1,true)+lab(105,335,'with BPD','var(--storm)',1,true);
    const hr=(x,id,l1,l2)=>{const r=GE_REL.find(q=>q.id===id),o=vis[id];return lab(x,322,l1,'var(--ink)',o)+lab(x,335,l2,'var(--muted)',o)+lab(x,350,'HR '+r.hr,'var(--storm)',o,true)};
    s+=hr(160,'mz','co-twin','MZ / DZ').replace('HR 11.5','11.5 / 7.4')+hr(215,'sib','full','sibling')+hr(40,'ph','paternal','half-sib')+hr(285,'mh','maternal','half-sib')+hr(410,'cou','cousin','')}
    /* bar chart */
    const C=N?{x:110,y:420,w:250,h:30}:{x:572,y:60,w:130,h:40};
    const Xb=v=>C.x+C.w*clamp(v,0,13)/13;
    s+=`<text x="${N?20:C.x-96}" y="${C.y-24}" class="t-sm" style="fill:var(--ink);font-weight:600">${N?'HAZARD RATIO BY RELATEDNESS':'HAZARD RATIO'}</text>`;
    [0,1,5,10].forEach(v=>{s+=`<line x1="${f1(Xb(v))}" x2="${f1(Xb(v))}" y1="${C.y-8}" y2="${C.y+GE_REL.length*C.h}" class="${v===1?'axis':'grid'}" style="${v===1?'stroke:var(--muted);stroke-dasharray:4 3':''}"/><text x="${f1(Xb(v))}" y="${f1(C.y+GE_REL.length*C.h+14)}" class="t-xs t-mid">${v}</text>`});
    GE_REL.forEach((r,i)=>{const o=vis[r.id],y=C.y+i*C.h+C.h/2;if(o<=0)return;
      s+=`<g style="opacity:${f1(o)}"><text x="${C.x-6}" y="${f1(y-(N?0:4))}" class="t-xs t-end" style="fill:var(--ink)">${N?r.n.replace('non-identical','DZ').replace('identical','MZ').replace('maternal half-sibling','mat. half-sib').replace('paternal half-sibling','pat. half-sib'):r.n.split(' ').slice(-1)[0].replace('co-twin',r.id==='mz'?'MZ twin':'DZ twin').replace('half-sibling',r.id==='mh'?'mat. half-sib':'pat. half-sib')}</text>`;
      if(!N)s+=`<text x="${C.x-6}" y="${f1(y+8)}" class="t-xs t-end">${r.g} genes</text>`;
      const w=Xb(r.hr*o)-C.x;s+=`<rect x="${C.x}" y="${f1(y-6)}" width="${f1(Math.max(0,w))}" height="12" rx="3" style="fill:var(--storm);opacity:.8"/>`;
      s+=`<line x1="${f1(Xb(r.lo))}" x2="${f1(Xb(r.hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--ink);stroke-width:1.3"/>`;
      if(r.hi>13)s+=`<path d="M${f1(Xb(13)-2)} ${f1(y-4)}l5 4l-5 4" style="fill:none;stroke:var(--ink);stroke-width:1.3"/>`;
      s+=`<text x="${f1(Math.min(Xb(r.hr)+6,C.x+C.w-2))}" y="${f1(y-8)}" class="t-xs" style="fill:var(--storm);font-weight:700">${r.hr}</text>`;
      s+='</g>'});
    s+=`<text x="${N?20:C.x-96}" y="${f1(C.y+GE_REL.length*C.h+32)}" class="t-xs">bar = adjusted HR, line = 95% CI</text>`;
    if(p>=2){const q=N?[20,C.y+GE_REL.length*C.h+56]:[24,392];
      s+=N?`<text x="${q[0]}" y="${q[1]}" class="t-xs" style="fill:var(--ink)">McLean family study: BPD in <tspan style="fill:var(--storm);font-weight:700">14.1%</tspan> of</text><text x="${q[0]}" y="${q[1]+16}" class="t-xs" style="fill:var(--ink)">relatives of people with BPD vs <tspan style="font-weight:700">4.9%</tspan> of others</text>`
        :`<text x="${q[0]}" y="${q[1]}" class="t-xs" style="fill:var(--ink)">McLean family study: BPD in <tspan style="fill:var(--storm);font-weight:700">14.1%</tspan> of relatives of people with BPD vs <tspan style="font-weight:700">4.9%</tspan> of other relatives</text>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 420',mode==='twin'?'400 660':'400 700');
    svg.innerHTML=mode==='twin'?drawTwin(t,N):drawFam(t,N);
    const S=STEPS(),p=phaseOf(S,t);setSt(p);
    $('#geNote').innerHTML=noteHTML(S[p]);
    const sp=split(t);
    $('#geRead').innerHTML=mode==='twin'?(sp?`<span>study <b>${sp.est.n}</b></span><span>genes <b>${Math.round(sp.A)}%</b></span><span>shared env. <b>0%</b></span><span>unique env. <b>${Math.round(sp.E)}%</b></span>`:`<span>E-Risk concordance <b>MZ 52% · DZ 7%</b></span><span>twin correlations <b>0.66 · 0.29</b></span>`)
      :`<span>relatives shown <b>${GE_REL.filter(r=>t>=({mz:.15,dz:.15,sib:.32,mh:.5,ph:.5,cou:.66})[r.id]).length} of 6</b></span><span>heritability of diagnosed BPD <b>46%</b></span>`;
  }
  $('#geCap').innerHTML=`<b>Schematic pairs and pedigree.</b> Figures are drawn to show published proportions and hazard ratios; they are not real families. Heritability and hazard ratios are population statistics. <sup class="c" data-ref="Belsky2012,Skoglund2021" title="Source 48,489">48,489</sup>`;
  const stop=playWire(rg,$('#gePlay'),draw,20000,'Replay','genes');
  $$('[data-gemode]').forEach(b=>b.addEventListener('click',()=>{if(mode===b.dataset.gemode)return;mode=b.dataset.gemode;stop();
    $$('[data-gemode]').forEach(x=>x.setAttribute('aria-pressed',x===b));wireSteps();
    const s0=STEPS()[mode==='twin'?1:1];rg.value=s0.at;draw(s0.at)}));
  wireSteps();draw(+rg.value);

  /* ---------- polygenic liability ---------- */
  const ps=$('#gePgs'),pr=$('#geR'),RMAX=.46,PREV=.017;
  const erf=x=>{const s=Math.sign(x);x=Math.abs(x);const t=1/(1+.3275911*x);return s*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x))};
  const Phi=z=>.5*(1+erf(z/Math.SQRT2));
  const zT=(()=>{let lo=0,hi=5;for(let i=0;i<60;i++){const m=(lo+hi)/2;if(1-Phi(m)>PREV)lo=m;else hi=m}return(lo+hi)/2})();
  const phi=(z,m=0,sd=1)=>Math.exp(-.5*((z-m)/sd)**2)/(sd*Math.sqrt(2*Math.PI));
  function drawP(){const N=vb(ps,'720 396','400 425'),u=+pr.value,R2=u*RMAX,mu=1.755*Math.sqrt(R2),sd=Math.sqrt(1-R2);
    const top=1-Phi((zT-mu)/sd),bot=1-Phi((zT+mu)/sd),ratio=bot>0?top/bot:1;
    const G=N?{x:20,y:120,w:360,h:200}:{x:30,y:96,w:660,h:200};
    const X=z=>G.x+G.w*(z+4)/8,Y=v=>G.y+G.h-G.h*v/.5;
    let s='';
    /* variant ticks strip */
    const nt=Math.round(u*(N?150:280)),rr=rng(7);s+=`<text x="${G.x}" y="22" class="t-sm" style="fill:var(--ink);font-weight:600">COMMON VARIANTS IN THE SCORE</text>`;
    for(let i=0;i<nt;i++){const x=G.x+rr()*G.w,y=(N?50:34)+rr()*28;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y+6)}" style="stroke:var(--mood);stroke-width:1;opacity:.6"/>`}
    s+=N?`<text x="${G.x}" y="38" class="t-xs">each tick = many tiny-effect variants</text>`:`<text x="${G.x+G.w}" y="22" class="t-xs t-end">each tick stands for many tiny-effect variants</text>`;
    /* curves */
    const path=(m,sd2,k)=>{let d='';for(let i=0;i<=160;i++){const z=-4+8*i/160;d+=(i?'L':'M')+f1(X(z))+' '+f1(Y(phi(z,m,sd2)*k))}return d};
    s+=`<rect x="${f1(X(zT))}" y="${G.y}" width="${f1(G.x+G.w-X(zT))}" height="${G.h}" style="fill:var(--storm-soft);opacity:.6"/>`;
    s+=`<path d="${path(0,1,1)}L${f1(X(4))} ${f1(Y(0))}L${f1(X(-4))} ${f1(Y(0))}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/>`;
    s+=`<path d="${path(-mu,sd,.55)}" style="fill:none;stroke:var(--calm);stroke-width:2.4"/>`;
    s+=`<path d="${path(mu,sd,.55)}" style="fill:none;stroke:var(--storm);stroke-width:2.4"/>`;
    s+=`<line x1="${f1(X(zT))}" x2="${f1(X(zT))}" y1="${G.y-6}" y2="${G.y+G.h}" style="stroke:var(--storm);stroke-width:1.5;stroke-dasharray:5 4"/>`;
    s+=`<text x="${f1(X(zT)+4)}" y="${G.y+12}" class="t-xs" style="fill:var(--storm)">threshold</text><text x="${f1(X(zT)+4)}" y="${G.y+25}" class="t-xs" style="fill:var(--storm)">(≈1.7% above)</text>`;
    s+=`<line x1="${G.x}" x2="${G.x+G.w}" y1="${G.y+G.h}" y2="${G.y+G.h}" class="axis"/><text x="${G.x}" y="${G.y+G.h+16}" class="t-xs">lower liability</text><text x="${G.x+G.w}" y="${G.y+G.h+16}" class="t-xs t-end">higher liability</text>`;
    const lgY=G.y+G.h+(N?40:36);let lx=G.x;[['var(--muted)','everyone'],['var(--calm)',N?'bottom 10%':'bottom 10% of scores'],['var(--storm)',N?'top 10%':'top 10% of scores']].forEach(([c,n])=>{s+=`<rect x="${lx}" y="${lgY-8}" width="14" height="4" rx="2" style="fill:${c}"/><text x="${lx+18}" y="${lgY}" class="t-xs">${n}</text>`;lx+=n.length*(N?6.9:5.8)+(N?30:34)});
    /* scale of the slider */
    const sy=N?lgY+34:lgY+34,sx0=N?G.x+10:G.x+10,sw=N?G.w-20:G.w-20;
    {s+=`<line x1="${sx0}" x2="${sx0+sw}" y1="${sy}" y2="${sy}" class="axis"/>`;
      [['today 4.6%',.046,'var(--ink)'],['SNP h² 17.3%',.173,'var(--mood)'],['twin/register ~46%',.46,'var(--muted)']].forEach(([n,v,c],i)=>{const x=sx0+sw*v/RMAX;s+=`<circle cx="${f1(x)}" cy="${sy}" r="4" style="fill:${c}"/><text x="${f1(i===2?sx0+sw:i===0?Math.max(x-6,sx0-10):x)}" y="${sy+(i===1?-8:18)}" class="t-xs ${i===2?'t-end':i===0?'':'t-mid'}" style="fill:${c}">${n}</text>`});
      s+=`<circle cx="${f1(sx0+sw*u)}" cy="${sy}" r="6" style="fill:none;stroke:var(--storm);stroke-width:2"/>`}
    ps.innerHTML=s;
    const snp=R2>.173+1e-6;
    $('#gePgsRead').innerHTML=`<span>score explains <b>${(R2*100).toFixed(1)}%</b>${snp?' (beyond what common variants can reach)':''}</span><span>top 10% risk <b>${(top*100).toFixed(1)}%</b></span><span>bottom 10% <b>${(bot*100).toFixed(1)}%</b></span><span>ratio <b>×${ratio.toFixed(1)}</b></span><span>top 10% without BPD <b>${Math.round((1-top)*100)} in 100</b></span>`;
    pr.setAttribute('aria-valuetext',`${(R2*100).toFixed(1)}% of liability explained; top tenth risk ${(top*100).toFixed(1)}%`)}
  pr.addEventListener('input',drawP);drawP();

  /* ---------- genetic correlations ---------- */
  const gs=$('#geRg');let ver='2025',cur=null,stopA=null;
  const RG={'2017':[['Major depression',.57],['Schizophrenia',.34],['Bipolar disorder',.28]],
            '2025':[['PTSD',.77],['Depression',.74],['ADHD',.67],['Schizophrenia',.36],['Bipolar disorder',.35]]};
  const CAP={'2017':`First BPD GWAS (Witt 2017): 998 patients and 1,545 controls, no single genome-wide significant marker, but the first molecular evidence that BPD shares genetic risk with these disorders. <sup class="c" data-ref="Witt2017" title="Source 562">562</sup>`,
             '2025':`Preprint of the 2026 GWAS: 12,339 cases. The published paper names PTSD, depression, ADHD, antisocial behaviour and suicide and self-harm measures as the strongest correlations. Separately, BPD correlated with neuroticism at r<sub>g</sub> = 0.34 (2022). <sup class="c" data-ref="Streit2025medRxiv,Streit2026,Streit2022" title="Source 515,516,517">515,516,517</sup>`};
  function drawG(k){const N=vb(gs,'420 300','400 300'),L=RG[ver],x0=N?128:140,w=N?240:240;let s='';
    s+=`<text x="${x0}" y="22" class="t-xs">genetic correlation (r<tspan dy="3" style="font-size:7px">g</tspan><tspan dy="-3">)</tspan></text>`;
    [0,.25,.5,.75,1].forEach(v=>{const x=x0+w*v;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="34" y2="${36+5*44}" class="grid"/><text x="${f1(x)}" y="${36+5*44+14}" class="t-xs t-mid">${v}</text>`});
    L.forEach(([n,v],i)=>{const y=44+i*44,vv=v*k;s+=`<text x="${x0-8}" y="${y+16}" class="t-xs t-end" style="fill:var(--ink);font-size:11px">${n}</text><rect x="${x0}" y="${y+2}" width="${f1(w*vv)}" height="20" rx="4" style="fill:var(--mood);opacity:${f1(.45+v*.55)}"/><text x="${f1(x0+w*vv+6)}" y="${y+16}" class="t-xs" style="fill:var(--ink);font-weight:700">${vv.toFixed(2)}</text>`});
    gs.innerHTML=s;$('#geRgCap').innerHTML=CAP[ver]}
  $$('[data-gerg]').forEach(b=>b.addEventListener('click',()=>{ver=b.dataset.gerg;$$('[data-gerg]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopA&&stopA();stopA=animate(700,p=>drawG(ease(p)))}));
  drawG(1);
  const ph=onHide.genes;onHide.genes=()=>{ph&&ph();stopA&&stopA()};
  const pr2=redraws.genes;redraws.genes=()=>{pr2&&pr2();drawP();drawG(1)};
};
/* =============== 1.5 Brain & stress systems =============== */
const BR_STEPS=[
 {from:0,at:.09,k:'Threat response',t:'The amygdala',
  txt:`<span class="ev est">Established, disputed</span> A meta-analysis of 19 fMRI studies (281 people with BPD, 293 controls) found more left-amygdala activation to negative stimuli, and blunted prefrontal responses. The amygdala overactivity appeared in unmedicated samples, not medicated ones. An earlier meta-analysis (11 studies) found less amygdala activation instead, so the direction is not settled. With eye-tracking, women with BPD looked faster and more often at the eyes of angry faces, with a larger amygdala response. People with BPD were less accurate at recognising neutral faces as neutral. <sup class="c" data-ref="Schulze2016,Ruocco2013,Bertsch2013Oxytocin,Daros2013" title="Source 50,114,442,465">50,114,442,465</sup>`,
  pt:`The brain’s alarm centre tends to respond more strongly to angry or threatening faces in research groups of people with BPD. Neutral faces can look less neutral.`,
  hook:`Amygdala hyperactivity in BPD shows up in unmedicated samples, not medicated ones (Schulze 2016). <sup class="c" data-ref="Schulze2016" title="Source 465">465</sup>`},
 {from:.17,at:.25,k:'Regulation',t:'Prefrontal and cingulate',
  txt:`<span class="ev hyp">Hypothesis</span> The dominant "fronto-limbic imbalance" model says limbic areas generate strong emotion while prefrontal control under-engages. Findings that fit: blunted dorsolateral prefrontal responses to negative stimuli; less ventromedial prefrontal activity when holding back a response during negative emotion (16 vs 14 people); less dorsal anterior cingulate engagement when trying to distance oneself (18 vs 16). A review of task fMRI challenges the simple version of this model, in which overactive amygdala and weak prefrontal control map straight onto symptoms. <sup class="c" data-ref="KrauseUtz2014,Schulze2016,Silbersweig2007,Koenigsberg2009,Sicorello2021" title="Source 276,284,465,479,481">276,284,465,479,481</sup>`,
  pt:`The parts of the brain that help calm a strong feeling seem to work less hard in these studies. Think of a brake that grips less firmly, not a broken one.`,
  hook:`Fronto-limbic model: limbic (amygdala, insula) overactivity + prefrontal/ACC under-engagement. It is a model, and it is debated. <sup class="c" data-ref="Sicorello2021" title="Source 479">479</sup>`},
 {from:.33,at:.42,k:'Insula & structure',t:'Insula and hippocampus',
  txt:`<span class="ev est">Established</span> The insula, which tracks body feelings, was more active to negative emotion in BPD. Structurally, a meta-analysis of 11 volumetric studies (205 people with BPD, 222 controls) found the hippocampus 11% smaller and the amygdala 13% smaller on average, differences not explained by medication or by co-occurring depression, PTSD or substance use. Voxel-based studies (395 vs 415) found less grey matter in medial prefrontal cortex, amygdala and right parahippocampal gyrus, a pattern unlike bipolar disorder. <sup class="c" data-ref="Ruocco2013,Ruocco2012,Yu2019BJP" title="Source 441,442,565">441,442,565</sup>`,
  pt:`On average, two memory-and-emotion areas are a little smaller in people with BPD in these studies. These are group averages; many individuals overlap with controls.`,
  hook:`Meta-analytic volume reductions in BPD: hippocampus ≈ 11%, amygdala ≈ 13% (Ruocco 2012). <sup class="c" data-ref="Ruocco2012" title="Source 441">441</sup>`},
 {from:.5,at:.6,k:'Stress hormones',t:'The HPA axis',
  txt:`<span class="ev early">Early evidence</span> The stress-hormone (HPA) axis runs from the hypothalamus to the pituitary to the adrenal glands, which release cortisol. Meta-analyses (37 studies; 803 people with BPD, 1,092 controls) found higher continuous cortisol output but a blunted cortisol response to psychosocial stress. A separate meta-analysis of single basal samples (12 studies) found lower cortisol (g = −0.32). The direction depends on how cortisol is measured. Resting vagal heart-rate variability, a marker of calming capacity, was also lower (g = −0.59; 5 studies). <sup class="c" data-ref="Drews2019,Thomas2019Cortisol,Koenig2016" title="Source 134,275,526">134,275,526</sup>`,
  pt:`The body’s stress system may run “on” more of the time but respond less sharply to a new stress. The studies disagree on details.`,
  hook:`HPA in BPD: elevated continuous cortisol output, blunted response to psychosocial stress (Drews 2019). <sup class="c" data-ref="Drews2019" title="Source 134">134</sup>`},
 {from:.67,at:.76,k:'Pain & bonding chemistry',t:'Pain, opioids and oxytocin',
  txt:`<span class="ev hyp">Hypothesis</span> Pain perception was reduced in unmedicated women with BPD even when calm, and more so under intense distress; electrical pain thresholds were higher and tracked dissociation. PET imaging (18 women with BPD, 14 controls) showed more mu-opioid receptor availability and more endogenous opioid release during sadness. Plasma oxytocin was lower in one study; a single intranasal dose normalised the fast glances to angry eyes and the amygdala response, but in another trial oxytocin reduced trust in anxiously attached, rejection-sensitive people. These are small experiments, not treatments. <sup class="c" data-ref="Bohus2000Pain,Ludascher2007,Prossin2010,Bertsch2013HormBehav,Bertsch2013Oxytocin,Bartz2011Oxytocin,Bandelow2010" title="Source 28,32,49,50,63,320,419">28,32,49,50,63,320,419</sup>`,
  pt:`Brain chemicals linked to pain relief and closeness may work differently in BPD. This is an active research idea, not a proven cause, and no medicine is approved on this basis.`,
  hook:`Opioid and oxytocin models in BPD: Hypothesis, supported by small PET, CSF and single-dose studies. <sup class="c" data-ref="Stanley2010AJP,Herpertz2015" title="Source 222,499">222,499</sup>`},
 {from:.83,at:.92,k:'Reading the evidence',t:'Not a "BPD brain"',
  txt:`<span class="ev est">Established</span> Early studies had tiny samples (6 per group in 2001, 15 in 2003). In about 50,000 people, brain–behaviour associations were smaller than thought, and studies at the median size of about 25 were underpowered with inflated effects. Many BPD findings also appear in PTSD, depression or bipolar disorder, so group-level imaging cannot diagnose an individual. Some differences shifted after therapy: switch to <b>After DBT</b>. <sup class="c" data-ref="Herpertz2001,Donegan2003,Marek2022,Button2013,Schulze2019,Goodman2014" title="Source 82,133,182,221,329,466">82,133,182,221,329,466</sup>`,
  pt:`Brain scans show averages from research groups. They cannot tell whether one person has BPD, and the brain keeps changing, including with treatment.`,
  hook:`Neuroimaging is not used to diagnose BPD: small samples, small effects and findings shared with other disorders. <sup class="c" data-ref="Marek2022,Schulze2019" title="Source 329,466">329,466</sup>`}];
const BR_LV={bpd:{amyg:1,pfc:.18,acc:.22,insula:.85,hippo:.3},cmp:{amyg:.32,pfc:.65,acc:.55,insula:.35,hippo:.3},post:{amyg:.55,pfc:.18,acc:.22,insula:.85,hippo:.3}};
function brFace(cx,cy,r,o={}){let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${r}" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.4"/>`;
  const e=r*.36,ey=cy-r*.12;
  if(o.look)s+=`<circle cx="${f1(cx-e)}" cy="${f1(ey)}" r="${f1(r*.26)}" style="fill:none;stroke:var(--storm);stroke-width:1.6;opacity:${f1(o.look)}"/><circle cx="${f1(cx+e)}" cy="${f1(ey)}" r="${f1(r*.26)}" style="fill:none;stroke:var(--storm);stroke-width:1.6;opacity:${f1(o.look)}"/>`;
  s+=`<circle cx="${f1(cx-e)}" cy="${f1(ey)}" r="${f1(r*.08)}" style="fill:var(--ink)"/><circle cx="${f1(cx+e)}" cy="${f1(ey)}" r="${f1(r*.08)}" style="fill:var(--ink)"/>`;
  s+=`<path d="M${f1(cx-e-r*.18)} ${f1(ey-r*.28)}L${f1(cx-e+r*.16)} ${f1(ey-r*.14)}M${f1(cx+e+r*.18)} ${f1(ey-r*.28)}L${f1(cx+e-r*.16)} ${f1(ey-r*.14)}" style="stroke:var(--ink);stroke-width:1.6;stroke-linecap:round"/>`;
  s+=`<path d="M${f1(cx-r*.34)} ${f1(cy+r*.45)}Q${f1(cx)} ${f1(cy+r*.2)} ${f1(cx+r*.34)} ${f1(cy+r*.45)}" style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round"/>`;
  return s}
function brPill(x,y,ev,N){const T={est:['EST.','var(--good)','var(--good-soft)'],early:['EARLY','var(--warn)','var(--warn-soft)'],hyp:['HYP.','var(--rx)','var(--rx-soft)']}[ev],w=T[0].length*(N?7.4:6.2)+10;
  return `<rect x="${f1(x)}" y="${f1(y-11)}" width="${f1(w)}" height="15" rx="4" style="fill:${T[2]}"/><text x="${f1(x+5)}" y="${f1(y)}" class="t-xs" style="fill:${T[1]};font-weight:700">${T[0]}</text>`}

inits.brain=()=>{
  const svg=$('#brSvg'),rg=$('#brT');let grp='bpd';
  function panel(p,u,P,N){let s='';const {x,y,w}=P,G=BR_LV[grp];
    const title=(t,yy=y)=>`<text x="${x}" y="${yy}" class="t-sm" style="fill:var(--ink);font-weight:600">${t}</text>`;
    const line=(t,yy,c,b)=>`<text x="${x}" y="${f1(yy)}" class="t-xs" style="fill:${c||'var(--muted)'}${b?';font-weight:700':''}">${t}</text>`;
    if(p===0){s+=title('AMYGDALA RESPONSE TO A NEGATIVE FACE');
      const bars=[['comparison','cmp',.32,'var(--other)'],['BPD','bpd',1,'var(--amyg)'],['after DBT','post',.55,'var(--calm)']],bw=N?70:60,gap=N?40:30,base=y+150,hh=110,gr=ease(ramp(u,.1,.7));
      bars.forEach(([n,k,v,c],i)=>{const bx=x+20+i*(bw+gap),h=hh*v*gr,on=k===grp;
        s+=`<rect x="${f1(bx)}" y="${f1(base-h)}" width="${bw}" height="${f1(h)}" rx="5" style="fill:${c};opacity:${on?.95:.35};stroke:${on?'var(--ink)':'none'};stroke-width:1.4"/><text x="${f1(bx+bw/2)}" y="${base+15}" class="t-xs t-mid" style="fill:var(--ink)${on?';font-weight:700':''}">${n}</text>`});
      s+=`<line x1="${x}" x2="${x+w}" y1="${base}" y2="${base}" class="axis"/>`;
      s+=`<text x="${x+w}" y="${y+24}" class="t-xs t-end">schematic heights</text>`;
      const yy=base+42;s+=line('Schulze 2016 · 19 studies · 281 vs 293',yy,'var(--ink)',true)+line('↑ more left-amygdala response (unmedicated)',yy+15)+line('Ruocco 2013 · 11 studies · 154 vs 150',yy+38,'var(--ink)',true)+line('↓ less amygdala response: direction disputed',yy+53);
      s+=line('After DBT: one 12-month study, 11 per group',yy+76,'var(--calm)')}
    else if(p===1){s+=title('THE BALANCE MODEL (HYPOTHESIS)');
      const tgt={bpd:13,cmp:-2,post:13}[grp],ang=lerp(0,tgt,ease(ramp(u,.05,.6))),cx=x+w/2,cy=y+92,L=N?140:120;
      const rad=ang*Math.PI/180,dx=Math.cos(rad)*L,dy=Math.sin(rad)*L;
      s+=`<path d="M${f1(cx-14)} ${cy+44}L${f1(cx)} ${cy}L${f1(cx+14)} ${cy+44}Z" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<line x1="${f1(cx-dx)}" y1="${f1(cy-dy)}" x2="${f1(cx+dx)}" y2="${f1(cy+dy)}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/>`;
      const pan=(px,py,c,t1,t2,r)=>`<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(px)}" y2="${f1(py+16)}" style="stroke:var(--ink)"/><circle cx="${f1(px)}" cy="${f1(py+16+r)}" r="${f1(r)}" style="fill:${c};opacity:.85"/><text x="${f1(px)}" y="${f1(py+36+2*r)}" class="t-xs t-mid" style="fill:var(--ink)">${t1}</text><text x="${f1(px)}" y="${f1(py+50+2*r)}" class="t-xs t-mid">${t2}</text>`;
      s+=pan(cx-dx,cy-dy,'var(--pfc)','prefrontal','control',8+G.pfc*14)+pan(cx+dx,cy+dy,'var(--amyg)','amygdala','alarm',8+G.amyg*14);
      const yy=y+218;s+=line('dlPFC response blunted (meta-analysis)',yy,'var(--ink)')+line('vmPFC lower when inhibiting (16 vs 14)',yy+16,'var(--ink)')+line('dACC less engaged when distancing (18 vs 16)',yy+32,'var(--ink)')+line('Critique: the simple model is too simple',yy+54,'var(--rx)');
      if(grp==='post')s+=line('After DBT: amygdala change only; balance not measured',yy+70,'var(--calm)')}
    else if(p===2){s+=title('AVERAGE VOLUME VS CONTROLS');
      const rows=[['Hippocampus',11],['Amygdala',13]],bw=w-20,sh=ease(ramp(u,.1,.7));
      rows.forEach(([n,r],i)=>{const yy=y+30+i*54,v=grp==='cmp'?100:100-r*sh,ww=bw*v/100;
        s+=`<text x="${x}" y="${yy}" class="t-xs" style="fill:var(--ink);font-weight:700">${n}</text><rect x="${x}" y="${yy+8}" width="${f1(bw)}" height="18" rx="4" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/><rect x="${x}" y="${yy+8}" width="${f1(ww)}" height="18" rx="4" style="fill:var(--hpa);opacity:.8"/><text x="${f1(x+bw)}" y="${yy}" class="t-xs t-end" style="fill:var(--ink)">${grp==='cmp'?'100% (reference)':`${v.toFixed(0)}% · −${(r*sh).toFixed(0)}%`}</text>`});
      const yy=y+150;s+=line('Ruocco 2012 · 11 studies · 205 vs 222',yy,'var(--ink)',true)+line('not explained by medication or comorbidity',yy+15);
      s+=line('Insula: more active to negative emotion',yy+42,'var(--ink)',true)+line('(Ruocco 2013, 11 studies)',yy+57);
      s+=line('Grey matter lower: medial PFC, amygdala',yy+84,'var(--ink)',true)+line('(13 studies, 395 vs 415; unlike bipolar)',yy+99);
      if(grp==='post')s+=line('After DBT: no volume data in these studies',yy+124,'var(--calm)')}
    else if(p===3){s+=title('HPA AXIS: STRESS-HORMONE CHAIN');
      const bx=x+(N?6:4),bw2=N?120:110,nodes=[['Hypothalamus','CRH',y+30],['Pituitary','ACTH',y+100],['Adrenal glands','cortisol',y+170]];
      nodes.forEach(([n,h,yy],i)=>{s+=`<rect x="${bx}" y="${yy}" width="${bw2}" height="40" rx="8" style="fill:var(--panel-2);stroke:var(--hpa);stroke-width:1.3"/><text x="${bx+bw2/2}" y="${yy+17}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${n}</text><text x="${bx+bw2/2}" y="${yy+31}" class="t-xs t-mid">${h} ↓</text>`;
        if(i<2)s+=`<line x1="${bx+bw2/2}" x2="${bx+bw2/2}" y1="${yy+40}" y2="${yy+70}" style="stroke:var(--hpa);stroke-width:1.6" marker-end="url(#brH)"/>`});
      /* cortisol dots travel back up to the brain (feedback) */
      const fx=bx+bw2+12,ny=G===BR_LV.bpd||grp==='post'?9:6;
      s+=`<path d="M${bx+bw2} ${y+190}C${fx+10} ${y+190} ${fx+10} ${y+50} ${bx+bw2} ${y+50}" style="fill:none;stroke:var(--hpa);stroke-width:1;stroke-dasharray:3 4;opacity:.7"/>`;
      for(let k=0;k<ny;k++){const q=(u*2+k/ny)%1,yy=lerp(y+190,y+50,q);s+=`<circle cx="${f1(bx+bw2+Math.sin(q*Math.PI)*16)}" cy="${f1(yy)}" r="3.4" style="fill:var(--hpa)"/>`}
      s+=`<text x="${f1(fx-6)}" y="${y+228}" class="t-xs">feedback</text>`;
      /* mini charts */
      const cx0=x+(N?178:150),cw=w-(N?178:150),c1=y+40,ch=56;
      s+=`<text x="${cx0}" y="${c1-12}" class="t-xs" style="fill:var(--ink);font-weight:700">Continuous output</text>`;
      [['comparison','cmp',.45,'var(--other)'],['BPD','bpd',.75,'var(--hpa)']].forEach(([n,k,v,c],i)=>{const on=k===grp||(grp==='post'&&k==='bpd');s+=`<rect x="${cx0}" y="${c1+i*22}" width="${f1(cw*v*ease(ramp(u,.05,.5)))}" height="14" rx="3" style="fill:${c};opacity:${on?.95:.4}"/><text x="${f1(cx0+4)}" y="${c1+i*22+11}" class="t-xs" style="fill:var(--bg);font-weight:700">${n}</text>`});
      const c2=c1+ch+48;s+=`<text x="${cx0}" y="${c2-12}" class="t-xs" style="fill:var(--ink);font-weight:700">After a social stressor</text>`;
      s+=`<line x1="${cx0}" x2="${cx0+cw}" y1="${c2+60}" y2="${c2+60}" class="axis"/>`;
      const up=ramp(u,.2,.95),curve=(pk,c,on)=>`<path d="${pathFn(v=>1-(.25+pk*Math.exp(-(((v-.35)/.18)**2))),cx0,cx0+cw*up,c2,c2+60,60)}" style="fill:none;stroke:${c};stroke-width:${on?2.6:1.6};opacity:${on?1:.45}"/>`;
      s+=curve(.6,'var(--other)',grp==='cmp')+curve(.22,'var(--hpa)',grp!=='cmp');
      s+=`<text x="${cx0+cw}" y="${c2+74}" class="t-xs t-end">time →</text>`;
      const yy=y+(N?262:258);s+=line('37 studies · 803 vs 1,092 · schematic shapes',yy)+line('Single basal samples: lower (g = −0.32)',yy+15,'var(--warn)')+line('Resting vagal HRV lower (g = −0.59)',yy+30,'var(--ink)');
      if(grp==='post')s+=line('After DBT: not measured here',yy+46,'var(--calm)')}
    else if(p===4){s+=title('OPIOID & OXYTOCIN HYPOTHESES');
      const sx=x+(N?90:80),sy=y+96,n=clamp(.25+u*.9,0,1);
      s+=synapse(sx,sy,1.25,{n:grp==='cmp'?n*.5:n,tx:'var(--nt)',seed:5,label:''});
      s+=`<text x="${sx}" y="${sy+56}" class="t-xs t-mid" style="fill:var(--ink)">opioid release (sadness)</text><text x="${sx}" y="${sy+70}" class="t-xs t-mid">(PET, 18 vs 14)</text>`;
      const px=x+(N?190:170),pw=w-(N?190:170);
      s+=`<text x="${px}" y="${y+34}" class="t-xs" style="fill:var(--ink);font-weight:700">Pain threshold</text>`;
      [['calm',grp==='cmp'?.4:.62],['distress',grp==='cmp'?.42:.85]].forEach(([n,v],i)=>{const yy=y+46+i*30,ww=pw*v*ease(ramp(u,.1,.6));s+=`<rect x="${px}" y="${yy}" width="${f1(pw)}" height="14" rx="3" style="fill:var(--panel-2)"/><rect x="${px}" y="${yy}" width="${f1(ww)}" height="14" rx="3" style="fill:var(--storm);opacity:.8"/><text x="${px}" y="${yy+26}" class="t-xs">${n}</text>`});
      s+=`<text x="${px}" y="${y+130}" class="t-xs" style="fill:var(--ink);font-weight:700">Plasma oxytocin</text>`;
      [['comparison',.7,'cmp'],['BPD',.45,'bpd']].forEach(([n,v,k],i)=>{const yy=y+140+i*22,on=k===grp||(grp==='post'&&k==='bpd');s+=`<rect x="${px}" y="${yy}" width="${f1(pw*v)}" height="14" rx="3" style="fill:var(--bond);opacity:${on?.9:.35}"/><text x="${f1(px+4)}" y="${yy+11}" class="t-xs" style="fill:var(--bg);font-weight:700">${n}</text>`});
      const yy=y+(N?230:226);s+=line('Single oxytocin dose: calmer response to angry eyes',yy,'var(--ink)')+line('…but less trust in rejection-sensitive people',yy+15,'var(--warn)')+line('Naltrexone (n = 29): no clear effect',yy+30)+line('Bars schematic; all small studies',yy+45);
      if(grp==='post')s+=line('After DBT: pain-related amygdala response reduced',yy+62,'var(--calm)')}
    else{s+=title('HOW MANY PEOPLE WERE SCANNED?');
      const rows=[['2001 amygdala study','per group',6],['2014 DBT study','per group',11],['2003 faces study','per group',15],['median imaging study','total',25],['2016 meta-analysis','BPD total',281],['2024 connectome sample','young adults',870],['needed to replicate','(Marek 2022)',3000]];
      const lx=x+(N?150:138),lw=w-(N?150:138)-8,LX=v=>lx+lw*Math.log10(v)/Math.log10(5000),sh=ramp(u,0,.8)*rows.length;
      [1,10,100,1000].forEach(v=>s+=`<line x1="${f1(LX(v))}" x2="${f1(LX(v))}" y1="${y+16}" y2="${y+20+rows.length*34}" class="grid"/><text x="${f1(LX(v))}" y="${y+34+rows.length*34}" class="t-xs t-mid">${v>=1000?'1,000':v}</text>`);
      rows.forEach(([n,m,v],i)=>{const o=clamp(sh-i,0,1);if(o<=0)return;const yy=y+38+i*34,last=i===rows.length-1;
        s+=`<g style="opacity:${f1(o)}"><text x="${x}" y="${yy}" class="t-xs" style="fill:var(--ink)">${n}</text><text x="${x}" y="${yy+13}" class="t-xs">${m}</text>`;
        s+=`<line x1="${f1(LX(1))}" x2="${f1(LX(v))}" y1="${yy-3}" y2="${yy-3}" style="stroke:${last?'var(--good)':'var(--muted)'};stroke-width:2;${last?'stroke-dasharray:4 3':''}"/><circle cx="${f1(LX(v))}" cy="${yy-3}" r="5" style="fill:${last?'var(--good)':v<30?'var(--storm)':'var(--dx)'}"/><text x="${f1(LX(v)+(v>1000?-8:8))}" y="${yy+11}" class="t-xs ${v>1000?'t-end':''}" style="fill:var(--ink)">${last?'thousands':v.toLocaleString('en')}</text></g>`});
      s+=line('log scale · the “thousands” point is approximate',y+50+rows.length*34)}
    return s}
  function draw(t){
    const N=vb(svg,'720 420','400 720'),p=phaseOf(BR_STEPS,t),S=BR_STEPS[p],nx=BR_STEPS[p+1],u=clamp((t-S.from)/((nx?nx.from:1.0001)-S.from));
    const B=N?{x:200,y:200,s:1.75,face:[44,52,22]}:{x:208,y:212,s:2.05,face:[56,46,26]},P=N?{x:20,y:410,w:360}:{x:404,y:30,w:300};
    let s=`<defs>${marker('brH','var(--hpa)')}${marker('brA','var(--storm)')}<marker id="brP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--pfc)"/></marker></defs>`;
    const G=BR_LV[grp],k=p===0?{amyg:G.amyg*ease(ramp(u,.15,.6))}:p===1?{amyg:G.amyg,pfc:G.pfc,acc:G.acc}:p===2?{amyg:G.amyg,pfc:G.pfc,acc:G.acc,insula:G.insula,hippo:.55}:{amyg:G.amyg*.6,pfc:G.pfc*.6,acc:G.acc*.6,insula:G.insula*.6,hippo:.25};
    /* comparison: keep a little glow so the regions stay visible */
    const br=brain(B.x,B.y,B.s,{hl:k});s+=br.svg;const A=br.at;
    /* the face and the gaze */
    if(p===0){const [fx,fy,fr]=B.face,fo=ramp(u,0,.12);s+=`<g style="opacity:${f1(fo)}">${brFace(fx,fy,fr,{look:ramp(u,.12,.3)*(grp==='cmp'?.35:1)})}</g>`;
      if(p===0&&u>.15){const [ax,ay]=A.amyg,pr=ramp(u,.15,.45);s+=`<path d="M${fx+fr*.5} ${fy+fr*.6}Q${f1(fx+10)} ${f1(ay-10)} ${f1(lerp(fx+fr*.5,ax-10,pr))} ${f1(lerp(fy+fr*.6,ay-2,pr))}" style="fill:none;stroke:var(--storm);stroke-width:1.6;stroke-dasharray:4 3" marker-end="url(#brA)"/>`}}
    /* regulation arrow pfc -> amygdala */
    if(p===1||p===2){const [px,py]=A.pfc,[ax,ay]=A.amyg,w=1+5*G.pfc,o=p===1?ramp(u,.1,.4):.6;
      s+=`<path d="M${f1(px+6)} ${f1(py+12)}Q${f1(px+10)} ${f1(ay)} ${f1(ax-12)} ${f1(ay)}" style="fill:none;stroke:var(--pfc);stroke-width:${f1(w)};opacity:${f1(o)}" marker-end="url(#brP)"/>`;
      if(p===1)s+=`<text x="${f1(px-4)}" y="${f1(ay+20)}" class="t-xs t-mid" style="fill:var(--pfc);opacity:${f1(o)}">calming signal</text>`}
    /* hypothalamus link to the HPA panel */
    if(p===3){const hx=B.x+2*B.s,hy=B.y+14*B.s;s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(5+3*Math.sin(u*12))}" style="fill:var(--hpa);opacity:.85"/>`;
      s+=N?`<path d="M${f1(hx)} ${f1(hy+6)}L${f1(hx)} ${P.y+24}" style="stroke:var(--hpa);stroke-dasharray:3 3;fill:none"/>`:`<path d="M${f1(hx+6)} ${f1(hy)}C${f1(hx+120)} ${f1(hy)} ${P.x-60} ${P.y+50} ${P.x+2} ${P.y+50}" style="stroke:var(--hpa);stroke-dasharray:3 3;fill:none"/>`;
      s+=`<text x="${f1(hx+10)}" y="${f1(hy-10)}" class="t-xs" style="fill:var(--hpa);font-weight:700">hypothalamus</text>`}
    if(p===4){const [ax,ay]=A.amyg;s+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(14+4*Math.sin(u*10))}" style="fill:none;stroke:var(--nt);stroke-width:1.5;stroke-dasharray:3 3"/>`}
    /* region labels with evidence pills */
    const LB=N?{pfc:[6,98,'Prefrontal','est'],acc:[138,70,'Ant. cingulate','early'],insula:[268,80,'Insula','est'],amyg:[14,352,'Amygdala','est'],hippo:[214,352,'Hippocampus','est']}
              :{pfc:[18,118,'Prefrontal cortex','est'],acc:[128,80,'Anterior cingulate','early'],insula:[262,92,'Insula','est'],amyg:[30,392,'Amygdala','est'],hippo:[228,392,'Hippocampus','est']};
    const vis={amyg:true,pfc:p>=1,acc:p>=1,insula:p>=2,hippo:p>=2};
    for(const r in LB){if(!vis[r])continue;const [lx,ly,n,ev]=LB[r],[cx,cy]=A[r],cw=n.length*(N?6.9:5.7);
      const ex=lx+cw/2,ey=ly<B.y?ly+5:ly-14;
      s+=`<line x1="${f1(ex)}" y1="${f1(ey)}" x2="${f1(cx)}" y2="${f1(cy)}" style="stroke:var(--muted);stroke-width:.8;opacity:.8"/>`;
      s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:var(--ink);font-weight:600">${n}</text>`+brPill(lx+cw+5,ly,r==='pfc'&&p===1?'hyp':ev,N)}
    s+=panel(p,u,P,N);
    svg.innerHTML=s;
    setSt(p);
    rg.setAttribute('aria-valuetext',`Step ${p+1}: ${S.t}, ${grp==='bpd'?'BPD group':grp==='cmp'?'comparison group':'after DBT'}`);
    $('#brRead').innerHTML=`<span>showing <b>${grp==='bpd'?'BPD group average':grp==='cmp'?'comparison group':'after DBT (early evidence)'}</b></span><span>finding <b>${p+1} of 6</b></span>`;
    $('#brNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#brPlay'),draw,26000,'Replay','brain');
  const setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  $$('[data-brgrp]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.brgrp;$$('[data-brgrp]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- replication board ---------- */
  const BD=[
   {sys:'Threat',ev:'est',t:'More left-amygdala response to negative stimuli',n:574,nl:'19 fMRI studies · 281 BPD, 293 controls',ef:'location meta-analysis; seen in unmedicated, not medicated samples',c:3,src:'<sup class="c" data-ref="Schulze2016" title="Source 465">465</sup>'},
   {sys:'Threat',ev:'est',t:'…or less amygdala activation?',n:304,nl:'11 studies · 154 BPD, 150 controls',ef:'less activation from amygdala to dorsolateral PFC; more insula',c:2,src:'<sup class="c" data-ref="Ruocco2013" title="Source 442">442</sup>'},
   {sys:'Regulation',ev:'est',t:'Blunted dorsolateral prefrontal response',n:574,nl:'19 fMRI studies · 281 BPD, 293 controls',ef:'bilateral dlPFC blunted to negative stimuli',c:3,src:'<sup class="c" data-ref="Schulze2016" title="Source 465">465</sup>'},
   {sys:'Regulation',ev:'early',t:'Less vmPFC activity when holding back',n:30,nl:'16 BPD, 14 controls',ef:'emotional go/no-go task',c:1,src:'<sup class="c" data-ref="Silbersweig2007" title="Source 481">481</sup>'},
   {sys:'Structure',ev:'est',t:'Smaller hippocampus and amygdala',n:427,nl:'11 volumetric studies · 205 BPD, 222 controls',ef:'hippocampus −11%, amygdala −13% on average',c:4,src:'<sup class="c" data-ref="Ruocco2012" title="Source 441">441</sup>'},
   {sys:'Structure',ev:'est',t:'Less grey matter in medial PFC and amygdala',n:810,nl:'13 studies · 395 BPD, 415 controls',ef:'voxel-based; pattern differs from bipolar disorder',c:4,src:'<sup class="c" data-ref="Yu2019BJP" title="Source 565">565</sup>'},
   {sys:'Stress',ev:'early',t:'Higher continuous cortisol, blunted stress response',n:1895,nl:'37 studies · 803 BPD, 1,092 controls',ef:'single samples and drug challenges did not differ',c:2,src:'<sup class="c" data-ref="Drews2019" title="Source 134">134</sup>'},
   {sys:'Stress',ev:'early',t:'Lower basal cortisol',n:546,nl:'12 studies · 278 BPD, 268 controls',ef:'g = −0.32 (95% CI −0.56 to −0.06)',c:2,src:'<sup class="c" data-ref="Thomas2019Cortisol" title="Source 526">526</sup>'},
   {sys:'Stress',ev:'early',t:'Lower resting vagal heart-rate variability',n:200,nl:'5 studies · 95 BPD, 105 controls',ef:'g = −0.59 (95% CI −1.11 to −0.06)',c:2,src:'<sup class="c" data-ref="Koenig2016" title="Source 275">275</sup>'},
   {sys:'Body',ev:'early',t:'Weaker heartbeat-evoked potentials',n:113,nl:'53 medication-free women with BPD, 60 controls',ef:'tracked emotion dysregulation; oxytocin did not change it',c:2,src:'<sup class="c" data-ref="Schmitz2020" title="Source 460">460</sup>'},
   {sys:'Mind',ev:'est',t:'Reflective-functioning deficit',n:3454,nl:'34 studies · 1,448 BPD, 2,006 controls',ef:'d = 1.68 (reflective functioning) vs d = 0.36 (theory of mind)',c:4,src:'<sup class="c" data-ref="Bora2021" title="Source 67">67</sup>'},
   {sys:'Mind',ev:'est',t:'Hypermentalizing is not specific to BPD',n:4188,nl:'36 studies · 4,188 people',ef:'r = 0.26 for BPD vs 0.24 for other disorders',c:4,src:'<sup class="c" data-ref="McLaren2022" title="Source 337">337</sup>'},
   {sys:'Pain',ev:'early',t:'Higher pain thresholds',n:24,nl:'12 BPD, 12 controls (electrical); 12 vs 19 (calm and distress)',ef:'thresholds rose with dissociation and aversive arousal',c:1,src:'<sup class="c" data-ref="Ludascher2007,Bohus2000Pain" title="Source 63,320">63,320</sup>'},
   {sys:'Chemistry',ev:'early',t:'More mu-opioid receptor availability',n:32,nl:'PET · 18 women with BPD, 14 controls',ef:'more endogenous opioid release during induced sadness',c:1,src:'<sup class="c" data-ref="Prossin2010" title="Source 419">419</sup>'},
   {sys:'Chemistry',ev:'hyp',t:'Opioid-system theory of BPD',n:0,nl:'built from indirect findings',ef:'altered opioid sensitivity or availability; clinical data limited',c:1,src:'<sup class="c" data-ref="Bandelow2010,Stanley2010AJP" title="Source 28,499">28,499</sup>'},
   {sys:'Chemistry',ev:'early',t:'Oxytocin calms the response to angry eyes',n:81,nl:'randomised, placebo-controlled · 40 BPD, 41 controls',ef:'single 26 IU dose; another trial found reduced trust',c:2,src:'<sup class="c" data-ref="Bertsch2013Oxytocin,Bartz2011Oxytocin" title="Source 32,50">32,50</sup>'},
   {sys:'Chemistry',ev:'hyp',t:'Oxytocin and interpersonal hypersensitivity',n:0,nl:'theoretical model',ef:'links oxytocin to salience and social reward; may not be BPD-specific',c:1,src:'<sup class="c" data-ref="Herpertz2015" title="Source 222">222</sup>'},
   {sys:'Change',ev:'early',t:'Amygdala activity falls after DBT',n:22,nl:'11 per group, 12 months of DBT',ef:'better habituation tracked better emotion regulation',c:1,src:'<sup class="c" data-ref="Goodman2014" title="Source 182">182</sup>'},
   {sys:'Networks',ev:'early',t:'Connectivity patterns predict borderline traits',n:1093,nl:'870 young adults + 223 adolescents (Human Connectome Project)',ef:'traits, not diagnosed BPD; emotion-regulation and executive systems',c:2,src:'<sup class="c" data-ref="Shafiei2024" title="Source 470">470</sup>'}];
  const board=$('#brBoard'),so=$('#brSort');let flt='all';
  const EVL={est:['ev est','Established'],early:['ev early','Early evidence'],hyp:['ev hyp','Hypothesis']},CW=['','low','modest','moderate','good','high'];
  function drawB(){let L=BD.filter(d=>flt==='all'||d.ev===flt);
    const k=so.value;L=[...L].sort((a,b)=>k==='conf'?b.c-a.c||b.n-a.n:k==='n'?b.n-a.n:a.sys.localeCompare(b.sys)||b.c-a.c);
    board.innerHTML=L.map(d=>`<article class="br-card"><div class="br-top"><span class="${EVL[d.ev][0]}">${EVL[d.ev][1]}</span><span class="br-meta">${d.sys}</span></div><h4>${d.t}</h4><div class="br-meta"><b>Sample</b> ${d.nl}<br><b>Effect</b> ${d.ef}</div><div class="br-meter" aria-label="Confidence ${d.c} of 5">${[1,2,3,4,5].map(i=>`<i class="${i<=d.c?'on':''}"></i>`).join('')}<span>${CW[d.c]} confidence</span></div><p class="br-meta">${d.src}</p></article>`).join('')}
  $$('[data-brf]').forEach(b=>b.addEventListener('click',()=>{flt=b.dataset.brf;$$('[data-brf]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawB()}));
  so.addEventListener('change',drawB);drawB();
};
/* =============== 2.1 DSM-5-TR criteria =============== */
const CR_C=[
 {s:['Abandonment','fears'],n:'Abandonment fears',w:`Frantic efforts to avoid real or imagined abandonment. Suicidal or self-harming behaviour is not counted here: it belongs to criterion 5.`,m:'V'},
 {s:['Unstable','relationships'],n:'Unstable, intense relationships',w:`A pattern of unstable and intense relationships that alternate between extremes of idealization and devaluation.`,m:'L'},
 {s:['Identity','disturbance'],n:'Identity disturbance',w:`A markedly and persistently unstable self-image or sense of self.`,m:'U'},
 {s:['Impulsivity','(2+ areas)'],n:'Impulsivity',w:`Impulsivity in at least two areas that are potentially self-damaging, for example spending, sex, substance use, reckless driving or binge eating. Suicidal or self-harming behaviour is not counted here.`,m:'I'},
 {s:['Suicidal or','self-harm'],n:'Suicidal or self-harming behaviour',w:`Recurrent suicidal behaviour, gestures or threats, or self-mutilating behaviour. This is the only criterion under which such behaviour is scored.`,m:'S'},
 {s:['Affective','instability'],n:'Affective instability',w:`Affective instability due to marked reactivity of mood, for example intense episodic dysphoria, irritability or anxiety “usually lasting a few hours and only rarely more than a few days”.`,m:'M'},
 {s:['Chronic','emptiness'],n:'Chronic emptiness',w:`Chronic feelings of emptiness.`,m:'E'},
 {s:['Intense','anger'],n:'Intense anger',w:`Inappropriate, intense anger or difficulty controlling anger, for example frequent displays of temper, constant anger or recurrent physical fights.`,m:'I'},
 {s:['Paranoia or','dissociation'],n:'Stress-related paranoia or dissociation',w:`Transient, stress-related paranoid ideation or severe dissociative symptoms.`,m:'P'}
];
/* CLPS adult mean symptom ratings, 0-2 (Peters 2023, Table 1) */
const CR_MEAN=[.75,1.02,.88,1.11,.64,1.23,1.05,1.14,.84];
const CR_EF=[
 `Against bipolar disorder: highest specificity and highest positive predictive value (0.90), accuracy 85%. <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup> The best inclusion criterion in hospitalised adolescents. <sup class="c" data-ref="Becker2002" title="Source 47">47</sup>`,
 `Highest negative predictive value against bipolar disorder (0.91). <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup> With suicidal or self-injurious behaviour, the best predictor of a BPD diagnosis 2 years later. <sup class="c" data-ref="Grilo2007" title="Source 193">193</sup>`,
 `Accuracy 85% against bipolar disorder, <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup> and one of the two most central criteria in symptom networks. <sup class="c" data-ref="Peters2023" title="Source 410">410</sup>`,
 `The best exclusion criterion in hospitalised adults. <sup class="c" data-ref="Becker2002" title="Source 47">47</sup>`,
 `With unstable relationships, the best predictor of a BPD diagnosis 2 years later. <sup class="c" data-ref="Grilo2007" title="Source 193">193</sup>`,
 `Highest sensitivity in 3,674 outpatients (92.8%), negative predictive value 99%: its absence nearly rules BPD out. <sup class="c" data-ref="Zimmerman2017BJP" title="Source 607">607</sup> Most common criterion in BPD (92.5%) but lowest specificity against bipolar disorder. <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup>`,
 `On its own, the only single feature linked to impairment on every index of psychosocial functioning. <sup class="c" data-ref="Ellison2016" title="Source 143">143</sup>`,
 `Least common criterion in BPD in a comparison with bipolar disorder (49%). <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup> The best exclusion criterion in hospitalised adolescents. <sup class="c" data-ref="Becker2002" title="Source 47">47</sup>`,
 ''
];
const CR_STEPS=[
 {from:0,at:.1,k:'DSM-5-TR Section II',t:'Nine criteria on one ring',
  txt:`DSM-5-TR describes BPD as a pervasive pattern of instability of interpersonal relationships, self-image and affects, with marked impulsivity, that begins by early adulthood and is present in a variety of contexts. It is shown by 5 (or more) of 9 criteria. The defining criteria have not changed in any major way since DSM-III in 1980. <sup class="c" data-ref="APA2022,Kaess2025,Leichsenring2024WP" title="Source 11,251,300">11,251,300</sup>`,
  pt:`There is a list of nine typical difficulties. A diagnosis needs at least five of them, lasting a long time and showing up in many parts of life.`,
  hook:`5 or more of 9, beginning by early adulthood, across a variety of contexts.`},
 {from:.18,at:.32,k:'Person A',t:'Five tiles: the threshold',
  txt:`Person A meets criteria 1 to 5: abandonment fears, unstable relationships, identity disturbance, impulsivity, and suicidal or self-harming behaviour. The fifth tile takes the count over the threshold. Suicidal or self-harming behaviour is scored only under criterion 5, never under criteria 1 or 4. <sup class="c" data-ref="APA2022,Kaess2025,Mulay2019" title="Source 11,251,355">11,251,355</sup>`,
  pt:`Five is the line. Four is not enough for the diagnosis, although four features can still cause real difficulty.`,
  hook:`Self-harm counts once: only under criterion 5, never under 1 (abandonment) or 4 (impulsivity).`},
 {from:.36,at:.5,k:'Person B',t:'A different five',
  txt:`Person B meets criteria 5 to 9: suicidal or self-harming behaviour, affective instability, chronic emptiness, intense anger, and stress-related paranoia or dissociation. Both people meet the same diagnosis. <sup class="c" data-ref="Mulay2019" title="Source 355">355</sup>`,
  pt:`Two people with the same diagnosis can have very different everyday struggles.`},
 {from:.54,at:.62,k:'Overlap',t:'Only one criterion shared',
  txt:`Persons A and B share only criterion 5: the arithmetic of a polythetic rule, where any 5 of 9 will do. <sup class="c" data-ref="Mulay2019" title="Source 355">355</sup> Even so, the criteria hang together. In 668 CLPS participants a one-factor model fitted well, and a three-factor model (disturbed relatedness, behavioural dysregulation, affective dysregulation) fitted better and replicated at 2 years. <span class="ev est">Established</span> <sup class="c" data-ref="Sanislow2002" title="Source 451">451</sup>`,
  pt:`People with BPD do not all look alike, but their difficulties still belong together.`,
  hook:`Two people can share a single criterion and both have BPD.`},
 {from:.66,at:.84,k:'Counting',t:'256 ways to qualify',
  txt:`Count every way to meet 5 or more of 9: 126 sets of exactly 5, 84 of 6, 36 of 7, 9 of 8 and 1 of all 9, which makes 256. <sup class="c" data-ref="Mulay2019" title="Source 355">355</sup> In practice many people meet more than five: in one clinical comparison, people with BPD met a mean of 6.6 criteria, against 1.9 in people with bipolar disorder. <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup>`,
  pt:`There are 256 different combinations that all lead to the same diagnosis.`,
  hook:`256 = 126 + 84 + 36 + 9 + 1. Exactly five: 126 combinations.`},
 {from:.88,at:.97,k:'Network view',t:'Two criteria at the centre',
  txt:`In symptom-network analyses of three clinical samples (CLPS adults, n = 731; MIDAS outpatients, n = 3,651; adolescents, n = 1,012), affective instability and identity disturbance were the most central criteria in all three, and relationship difficulties were also central in both adult networks. The network was broadly the same in adolescents and adults. <sup class="c" data-ref="Peters2023" title="Source 410">410</sup>`,
  pt:`Mood swings and an unsteady sense of who you are tend to be linked to all the other difficulties.`,
  hook:`Most central in networks: affective instability (6) and identity disturbance (3).`}
];
function crBin(n,k){if(k<0||k>n)return 0;let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r)}
function crArc(cx,cy,r,a0,a1){/* degrees, 0 = top, clockwise */
  if(a1-a0>=359.9)return `M${f1(cx)} ${f1(cy-r)}A${r} ${r} 0 1 1 ${f1(cx-.01)} ${f1(cy-r)}`;
  const P=a=>{const q=(a-90)*Math.PI/180;return [cx+r*Math.cos(q),cy+r*Math.sin(q)]},p0=P(a0),p1=P(a1);
  return `M${f1(p0[0])} ${f1(p0[1])}A${r} ${r} 0 ${a1-a0>180?1:0} 1 ${f1(p1[0])} ${f1(p1[1])}`}
inits.criteria=()=>{
  /* ---------- main scrubber: two people, same diagnosis ---------- */
  const svg=$('#crSvg'),rg=$('#crT'),note=$('#crNote');
  const A=[0,1,2,3,4],B=[4,5,6,7,8],CNT=[126,84,36,9,1];
  let setA=()=>{},lastP=-1;
  function draw(t){
    const N=vb(svg,'720 380','400 640'),P=phaseOf(CR_STEPS,t);
    if(P!==lastP){lastP=P;setA(P);note.innerHTML=noteHTML(CR_STEPS[P])}
    const L=N?{cx:200,cy:186,r:136,tw:84,th:40,px:16,pw:368,py:364}:{cx:198,cy:200,r:140,tw:88,th:42,px:410,pw:300,py:28};
    const ap=ramp(t,0,.08),fa=ramp(t,.18,.32),fb=ramp(t,.36,.5),ov=ramp(t,.54,.62),cb=ramp(t,.66,.84),ce=ramp(t,.88,.97);
    const nA=P>=1?Math.floor(fa*5+1e-6):0,nB=P>=2?Math.floor(fb*5+1e-6):0;
    const pos=i=>{const q=(-90+i*40)*Math.PI/180;return [L.cx+L.r*Math.cos(q),L.cy+L.r*Math.sin(q)]};
    let s='';
    s+=`<text x="${N?16:20}" y="20" class="t-sm">DSM-5-TR · 9 CRITERIA · ≥5 NEEDED</text>`;
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${L.r}" style="fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:3 5"/>`;
    /* network edges */
    if(P>=5&&ce>0){for(let i=0;i<9;i++)for(let j=i+1;j<9;j++){const c=(i===2||i===5||j===2||j===5),m=(i===1||j===1);const a=pos(i),b=pos(j);
      s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:${c?'var(--dx)':m?'var(--mood)':'var(--muted)'};stroke-width:${c?2.4:m?1.6:.8};opacity:${f1(ce*(c?.75:m?.5:.22))}"/>`}}
    /* progress arc in the ring */
    const ar=L.r-62;let cnt=0,arcCol='var(--dx)';
    if(P===1)cnt=nA;else if(P===2){cnt=nB;arcCol='var(--mood)'}else if(P===3){cnt=1;arcCol='var(--gold)'}
    if(P>=1&&P<=3){s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${ar}" style="fill:none;stroke:var(--panel-2);stroke-width:9"/>`;
      if(cnt>0)s+=`<path d="${crArc(L.cx,L.cy,ar,0,cnt*40)}" style="fill:none;stroke:${cnt>=5&&P<3?'var(--good)':arcCol};stroke-width:9;stroke-linecap:round"/>`;
      const tq=(200-90)*Math.PI/180;s+=`<line x1="${f1(L.cx+(ar-9)*Math.cos(tq))}" y1="${f1(L.cy+(ar-9)*Math.sin(tq))}" x2="${f1(L.cx+(ar+9)*Math.cos(tq))}" y2="${f1(L.cy+(ar+9)*Math.sin(tq))}" style="stroke:var(--ink);stroke-width:2"/>`;
      s+=`<text x="${f1(L.cx+(ar+18)*Math.cos(tq))}" y="${f1(L.cy+(ar+18)*Math.sin(tq)+4)}" class="t-xs t-mid" style="fill:var(--ink)">5</text>`}
    /* tiles */
    for(let i=0;i<9;i++){const [x,y]=pos(i),op=clamp(ap*9-i*.9+.2);
      const inA=P>=1&&A.indexOf(i)>=0&&A.indexOf(i)<nA,inB=P>=2&&B.indexOf(i)>=0&&B.indexOf(i)<nB;
      let fill='var(--panel)',st='var(--line)',sw=1.3,o=op,sc=1;
      if(P<=3){if(inA&&inB){fill='var(--gold-soft)';st='var(--gold)';sw=2.2}else if(inB){fill='var(--brand-soft)';st='var(--mood)';sw=1.8}else if(inA){fill=P>=2?'var(--panel)':'var(--dx-soft)';st='var(--dx)';sw=1.8}
        if(P===3&&!(inA&&inB))o=lerp(1,.32,ov)}
      if(P>=4&&P<5){o=1}
      if(P>=5&&(i===2||i===5)){fill='var(--dx-soft)';st='var(--dx)';sw=2.4;sc=1+.1*ce}
      const w=L.tw*sc,h=L.th*sc;
      s+=`<g style="opacity:${f1(o)}"><rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${f1(w)}" height="${f1(h)}" rx="9" style="fill:${fill};stroke:${st};stroke-width:${sw}"/>`;
      s+=`<circle cx="${f1(x-w/2+3)}" cy="${f1(y-h/2+3)}" r="8.5" style="fill:${st==='var(--line)'?'var(--panel-2)':st};stroke:var(--panel);stroke-width:1.5"/><text x="${f1(x-w/2+3)}" y="${f1(y-h/2+6.5)}" class="t-xs t-mid" style="fill:${st==='var(--line)'?'var(--ink)':'var(--panel)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${f1(x+3)}" y="${f1(y-2)}" class="t-xs t-mid" style="fill:var(--ink)">${CR_C[i].s[0]}</text><text x="${f1(x+3)}" y="${f1(y+10)}" class="t-xs t-mid" style="fill:var(--ink)">${CR_C[i].s[1]}</text>`;
      if(P>=2&&P<=3&&(inA||inB)){const tg=(P>=2&&A.indexOf(i)>=0&&A.indexOf(i)<nA?'A':'')+(inB?'B':'');s+=`<text x="${f1(x+w/2-4)}" y="${f1(y-h/2-4)}" class="t-xs t-end" style="fill:${tg==='AB'?'var(--gold)':tg==='B'?'var(--mood)':'var(--dx)'};font-weight:700">${tg.split('').join('+')}</text>`}
      s+='</g>'}
    /* centre */
    let big='9',sub1='criteria',sub2='5 or more needed',bc='var(--ink)';
    if(P===1){big=nA+'/9';sub1='Person A';sub2=nA>=5?'threshold met':'below threshold';bc=nA>=5?'var(--good)':'var(--dx)'}
    else if(P===2){big=nB+'/9';sub1='Person B';sub2=nB>=5?'threshold met':'below threshold';bc=nB>=5?'var(--good)':'var(--mood)'}
    else if(P===3){big='1';sub1='criterion';sub2='in common';bc='var(--gold)'}
    else if(P===4){let tot=0;CNT.forEach((c,k)=>tot+=c*ramp(cb,k/5,(k+1)/5));big=String(Math.round(tot));sub1='ways to';sub2='qualify';bc='var(--dx)'}
    else if(P===5){big='3 · 6';sub1='most';sub2='central';bc='var(--dx)'}
    if(P===5)s+=`<circle cx="${L.cx}" cy="${L.cy+8}" r="40" style="fill:var(--panel);opacity:${f1(.9*ce)}"/>`;
    s+=`<text x="${L.cx}" y="${L.cy+4}" class="t-mid" style="font:800 ${P===5?26:34}px var(--display);fill:${bc}">${big}</text><text x="${L.cx}" y="${L.cy+22}" class="t-xs t-mid">${sub1}</text><text x="${L.cx}" y="${L.cy+34}" class="t-xs t-mid" style="fill:${bc}">${sub2}</text>`;
    /* panel: people */
    const X=L.px,Y=L.py,rows=N?[Y+18,Y+56,Y+94]:[Y+34,Y+86,Y+138],sq=20,sx=X+(N?118:104);
    const rowDef=[{l:'Person A',c:'var(--dx)',on:i=>A.indexOf(i)>=0&&A.indexOf(i)<nA,vis:P>=1},{l:'Person B',c:'var(--mood)',on:i=>B.indexOf(i)>=0&&B.indexOf(i)<nB,vis:P>=2},{l:'Shared',c:'var(--gold)',on:i=>i===4,vis:P>=3}];
    if(!N)s+=`<text x="${X}" y="${Y}" class="t-sm">TWO PEOPLE, ONE DIAGNOSIS</text>`;
    rowDef.forEach((r,k)=>{const y=rows[k],o=r.vis?(k===0?clamp(fa*3):k===1?clamp(fb*3):ov):0;if(o<=0)return;
      s+=`<g style="opacity:${f1(P>=4?.55:o)}">`+(k<2?person(X+8,y-13,24,r.c):`<circle cx="${X+8}" cy="${y-1}" r="7" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/>`);
      const c=CR_C.reduce((a,_,i)=>a+(r.on(i)?1:0),0);
      s+=`<text x="${X+26}" y="${y-3}" class="t-lbl" style="fill:${r.c}">${r.l}</text><text x="${X+26}" y="${y+10}" class="t-xs">${k<2?c+' of 9'+(c>=5?' ✓':''):'criterion 5'}</text>`;
      for(let i=0;i<9;i++){const xx=sx+i*(sq+2),on=r.on(i);s+=`<rect x="${xx}" y="${y-sq/2-2}" width="${sq}" height="${sq}" rx="4" style="fill:${on?r.c:'var(--panel-2)'};stroke:${on?r.c:'var(--line)'}"/><text x="${xx+sq/2}" y="${y+2}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`}
      s+='</g>'});
    /* panel: combinations */
    const cy0=N?Y+132:Y+186,H=N?72:90,bot=cy0+H+40,bw=N?40:36,gap=(L.pw-30-5*bw)/4;
    if(P>=4||P===3&&ov>.9){const o=P>=4?1:.35;
      s+=`<g style="opacity:${o}"><text x="${X}" y="${cy0}" class="t-sm">WAYS TO MEET ≥5 OF 9</text>`;
      let tot=0;CNT.forEach((c,k)=>{const g=P>=4?ramp(cb,k/5,(k+1)/5):0;tot+=c*g;const h=Math.max(c/126*H,1.5)*g,x=X+30+k*(bw+gap);
        s+=`<rect x="${f1(x)}" y="${f1(bot-h)}" width="${bw}" height="${f1(h)}" rx="3" style="fill:${k===0?'var(--dx)':'var(--dx-soft)'};stroke:var(--dx)"/>`;
        if(g>0)s+=`<text x="${f1(x+bw/2)}" y="${f1(bot-h-5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${Math.round(c*g)}</text>`;
        s+=`<text x="${f1(x+bw/2)}" y="${bot+13}" class="t-xs t-mid">${k+5}</text>`});
      s+=`<line x1="${X+24}" x2="${X+L.pw}" y1="${bot}" y2="${bot}" class="axis"/><text x="${X+L.pw}" y="${bot+26}" class="t-xs t-end">criteria met</text>`;
      s+=`<text x="${X+L.pw}" y="${cy0+(N?4:6)}" class="t-end" style="font:800 ${N?22:28}px var(--display);fill:var(--dx)">${Math.round(tot)}</text><text x="${X+L.pw}" y="${cy0+(N?16:20)}" class="t-xs t-end">total</text></g>`}
    else if(P<3){s+=`<text x="${X}" y="${cy0+20}" class="t-xs" style="opacity:.7">How many different sets of five or more are there?</text>`}
    svg.innerHTML=s;
  }
  const stop=playWire(rg,$('#crPlay'),draw,15000,'Replay','criteria');
  setA=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the counter ---------- */
  const ring=$('#crRing'),rsvg=$('#crRingSvg'),det=$('#crDet'),sel=new Set();let last=-1;
  CR_C.forEach((c,i)=>{const q=(-90+i*40)*Math.PI/180,b=document.createElement('button');b.className='cr-tile';b.type='button';b.dataset.i=i;b.setAttribute('aria-pressed','false');
    b.style.left=f1(50+38*Math.cos(q))+'%';b.style.top=f1(50+38*Math.sin(q))+'%';b.innerHTML=`<b>${i+1}</b><span>${c.s[0]} ${c.s[1].replace(/[()]/g,'')}</span>`;b.setAttribute('aria-label',`Criterion ${i+1}: ${c.n}`);ring.appendChild(b)});
  const gates=$$('#crGate input');
  function upd(flip){
    $$('.cr-tile',ring).forEach(b=>{const i=+b.dataset.i;b.setAttribute('aria-pressed',sel.has(i));b.classList.toggle('last',i===last)});
    const n=sel.size,g=gates.filter(x=>x.checked).length,met=n>=5;
    let r=`<circle cx="50" cy="50" r="38" style="fill:none;stroke:var(--line);stroke-width:.5;stroke-dasharray:1.2 2"/><circle cx="50" cy="50" r="21" style="fill:none;stroke:var(--panel-2);stroke-width:4"/>`;
    if(n>0)r+=`<path d="${crArc(50,50,21,0,n*40)}" style="fill:none;stroke:${met?'var(--good)':'var(--dx)'};stroke-width:4;stroke-linecap:round"/>`;
    const tq=(200-90)*Math.PI/180;r+=`<line x1="${f1(50+18.5*Math.cos(tq))}" y1="${f1(50+18.5*Math.sin(tq))}" x2="${f1(50+23.5*Math.cos(tq))}" y2="${f1(50+23.5*Math.sin(tq))}" style="stroke:var(--ink);stroke-width:.7"/>`;
    r+=`<text x="50" y="50" text-anchor="middle" style="font:800 11px var(--display);fill:${met?'var(--good)':'var(--ink)'}">${n}/9</text><text x="50" y="55.6" text-anchor="middle" style="font:600 2.9px var(--mono);fill:var(--muted);letter-spacing:.15px">${met?'THRESHOLD MET':(5-n)+' MORE NEEDED'}</text>`;
    for(let k=0;k<4;k++)r+=`<circle cx="${44.6+k*3.6}" cy="60" r="1.2" style="fill:${gates[k].checked?'var(--dx)':'var(--panel-2)'};stroke:var(--dx);stroke-width:.3"><title>General criterion ${k+1}</title></circle>`;
    rsvg.innerHTML=r;
    if(last>=0){const c=CR_C[last];det.innerHTML=`<div class="kicker">Criterion ${last+1} · full wording · mnemonic letter ${c.m}</div><h4>${c.n}</h4><p>${c.w} <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup></p><p class="stage-cap">${sel.has(last)?'Counted':'Not counted'} · CLPS mean rating ${CR_MEAN[last].toFixed(2)} of 2</p>`;
      if(flip){det.classList.remove('flip');void det.offsetWidth;det.classList.add('flip')}}
    else det.innerHTML=`<div class="kicker">The flip side</div><h4>Tap a tile</h4><p>Each tile shows a short label. Tap it to count it, and its full wording appears here.</p>`;
    const v=$('#crVerdict');
    if(!met){v.className='verdict no';v.innerHTML=`${n} of 9: below the DSM-5-TR threshold of 5.${n?` Features below the threshold still matter: people with even one criterion had more co-occurring disorders, hospital admissions and time off work than people with none. <sup class="c" data-ref="Zimmerman2012JCP" title="Source 605">605</sup>`:''}`}
    else if(g<4){v.className='verdict maybe';v.innerHTML=`${n} of 9 counted, but ${4-g} of the 4 general criteria ${4-g===1?'is':'are'} not ticked. A count alone is not a diagnosis: a clinician asks whether the pattern is enduring, pervasive and not better explained by something else.`}
    else{v.className='verdict yes';v.innerHTML=`${n} of 9 plus all four general criteria: the teaching threshold is met. In real care, this is where a clinician confirms each feature with a semi-structured interview, which is how BPD is diagnosed reliably. <sup class="c" data-ref="Leichsenring2024WP" title="Source 300">300</sup>`}
    let inc=0;for(let k=Math.max(5,n);k<=9;k++)inc+=crBin(9-n,k-n);
    $('#crCombo').innerHTML=`<span>General criteria ticked: <b>${g}/4</b>.</span><span>Of the <b>256</b> ways to meet the threshold, <b>${inc}</b> include every tile you chose.</span>${n>=5?`<span>Your set is 1 of <b>${crBin(9,n)}</b> possible sets of exactly ${n}.</span>`:''}`;
  }
  ring.addEventListener('click',e=>{const b=e.target.closest('.cr-tile');if(!b)return;const i=+b.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);last=i;upd(true)});
  gates.forEach(x=>x.addEventListener('change',()=>upd(false)));
  const ex=a=>{sel.clear();a.forEach(i=>sel.add(i));last=a[a.length-1];upd(true)};
  $('#crExA').addEventListener('click',()=>ex(A));$('#crExB').addEventListener('click',()=>ex(B));
  $('#crClear').addEventListener('click',()=>{sel.clear();last=-1;gates.forEach(x=>x.checked=false);upd(false)});
  upd(false);

  /* ---------- frequency rows ---------- */
  const fq=$('#crFreq');let order='dsm';
  fq.innerHTML=CR_C.map((c,i)=>`<div class="cr-row" data-i="${i}"><span class="lb"><b>${i+1}</b>${c.n}</span><span class="br" aria-hidden="true"><i style="width:${f1(CR_MEAN[i]/2*100)}%"></i></span><span class="vl">${CR_MEAN[i].toFixed(2)}</span><span class="ef">${CR_EF[i]||'No criterion-level accuracy figure in the sources used here.'}</span></div>`).join('');
  function sortRows(){
    const rows=$$('.cr-row',fq),before=new Map(rows.map(r=>[r,r.getBoundingClientRect().top]));
    const key=i=>order==='mean'?-CR_MEAN[i]:order==='ef'?(CR_EF[i]?0:1)*10+i/10:i;
    rows.sort((a,b)=>key(+a.dataset.i)-key(+b.dataset.i)).forEach(r=>fq.appendChild(r));
    const mx=Math.max(...CR_MEAN);rows.forEach(r=>r.classList.toggle('top',order==='mean'&&CR_MEAN[+r.dataset.i]===mx));
    rows.forEach(r=>{const d=before.get(r)-r.getBoundingClientRect().top;if(!d)return;r.style.transition='none';r.style.transform=`translateY(${d}px)`;
      requestAnimationFrame(()=>{r.style.transition='transform .45s ease';r.style.transform=''})});
  }
  $$('[data-crs]').forEach(b=>b.addEventListener('click',()=>{order=b.dataset.crs;$$('[data-crs]').forEach(x=>x.setAttribute('aria-pressed',x===b));sortRows()}));
  $('#crEfT').addEventListener('click',e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',on);fq.classList.toggle('noef',!on)});
};
/* =============== 2.2 ICD-11 & dimensional models =============== */
const IC_STEPS=[
 {from:0,at:.12,k:'ICD-10 · 1992',t:'Named boxes',
  txt:`ICD-10 listed separate, named personality disorders. BPD sat inside emotionally unstable personality disorder as its borderline type, F60.31, beside an impulsive type; Danish register studies of BPD use the F60.31 code. <sup class="c" data-ref="Kjaer2020" title="Source 264">264</sup> The two subtypes still echo in data: among 506 help-seeking adolescents, latent class analysis found a broad "borderline" group (86.8%) and an "impulsive" group high only on impulsivity and anger (13.2%). <sup class="c" data-ref="Cavelti2021" title="Source 87">87</sup>`,
  pt:`Older systems sorted people into named boxes. BPD was one box inside "emotionally unstable".`,
  hook:`ICD-10 F60.31: emotionally unstable personality disorder, borderline type.`},
 {from:.2,at:.36,k:'ICD-11 · 6D10',t:'One disorder, graded by severity',
  txt:`ICD-11, approved in May 2019 and used for health reporting from 1 January 2022, removes every named type. <sup class="c" data-ref="Reed2019" title="Source 425">425</sup> What remains is one personality disorder, 6D10, graded mild (6D10.0), moderate (6D10.1) or severe (6D10.2). <sup class="c" data-ref="Sharan2023,Mulder2021" title="Source 357,473">357,473</sup> It needs an enduring disturbance in self-functioning (identity, self-worth, accuracy of self-view, self-direction) and/or interpersonal functioning, lasting more than 2 years and showing across situations. Below the threshold, personality difficulty (QE50.7) is not a mental disorder. <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup> Move the severity slider.`,
  pt:`ICD-11 first asks how much a person's personality difficulties affect their life: mild, moderate or severe.`,
  hook:`6D10.0 mild · 6D10.1 moderate · 6D10.2 severe. QE50.7 personality difficulty is not a disorder.`},
 {from:.42,at:.58,k:'Trait domains · 6D11.0–.4',t:'Five domains describe the style',
  txt:`Severity says how much; optional trait-domain specifiers say what kind: Negative Affectivity (6D11.0), Detachment (6D11.1), Dissociality (6D11.2), Disinhibition (6D11.3) and Anankastia (6D11.4). As many as apply can be recorded. <sup class="c" data-ref="Sharan2023,Bach2018BMC" title="Source 21,473">21,473</sup> In 606 patients from depression trials, BPD symptoms went with greater ICD-11 severity and mapped mainly onto Negative Affectivity, Dissociality and Disinhibition, with weak links to Anankastia and Detachment. <sup class="c" data-ref="Mulder2020" title="Source 356">356</sup> Switch the trait model to compare the DSM-5 domains.`,
  pt:`Next, ICD-11 describes the person's style, for example strong negative emotions or acting on impulse.`,
  hook:`ICD-11 domains: Negative Affectivity, Detachment, Dissociality, Disinhibition, Anankastia. ICD-11 has no psychoticism domain; DSM-5 has no anankastia domain.`},
 {from:.62,at:.76,k:'Specifier · 6D11.5',t:'The borderline pattern',
  txt:`After lengthy debate, ICD-11 kept an optional borderline pattern, <sup class="c" data-ref="Tyrer2019" title="Source 540">540</sup> added to enhance clinical utility, including identifying people who may respond to certain psychotherapies. <sup class="c" data-ref="Sharan2023" title="Source 473">473</sup> It is the only ICD-11 personality specifier defined polythetically: at least 5 of 9 features adapted from the DSM-5 criteria. Its mood states "typically last for a few hours but may last for up to several days", and it may note a view of the self as inadequate or bad, profound alienation and loneliness, and rejection hypersensitivity. <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup>`,
  pt:`The word "borderline" survives in ICD-11 as an extra label added after the severity rating.`,
  hook:`A full ICD-11 label: "Moderate personality disorder, with borderline pattern, with Negative Affectivity, Disinhibition and Dissociality". <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup>`},
 {from:.8,at:.95,k:'DSM-5-TR Section III',t:'The Alternative Model (AMPD)',
  txt:`DSM-5-TR keeps the nine-criterion category in Section II, and offers an Alternative Model in Section III. For BPD, Criterion A is moderate or greater impairment in 2 or more of identity, self-direction, empathy and intimacy. Criterion B is 4 or more of 7 traits (emotional lability, anxiousness, separation insecurity, depressivity, impulsivity, risk taking, hostility), at least one of which is impulsivity, risk taking or hostility. <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup> When 20 experts translated the criteria, 19 rated personality functioning impaired whenever 5 or more criteria were present. <sup class="c" data-ref="Mulay2019" title="Source 355">355</sup>`,
  pt:`The DSM's alternative model also starts with how well personality is working, then lists traits, much like ICD-11.`,
  hook:`AMPD BPD: A = impairment in ≥2 of identity, self-direction, empathy, intimacy. B = ≥4 of 7 traits, including impulsivity, risk taking or hostility.`}
];
const IC_SEV=[
 {n:'Personality difficulty',c:'QE50.7',col:'var(--muted)',d:['Not a mental disorder: listed among factors','influencing health status','Relatively stable (at least 2 years),','intermittent or low-intensity difficulties']},
 {n:'Mild',c:'6D10.0',col:'var(--dx)',d:['Harm to self or others: typically not','Impairment: limited to circumscribed areas','Under stress: some distortion of appraisals,','reality testing intact']},
 {n:'Moderate',c:'6D10.1',col:'var(--warn)',d:['Harm to self or others: sometimes','Impairment: marked (some areas may be kept)','Under stress: marked distortions; possibly mild','dissociative states or psychotic-like beliefs']},
 {n:'Severe',c:'6D10.2',col:'var(--storm)',d:['Harm to self or others: often','Impairment: in all or nearly all areas','Under stress: often dissociative states or','psychotic-like beliefs (e.g. extreme paranoia)']}
];
const IC_DOM={icd:[['Negative','Affectivity',.86],['Detachment','',.24],['Dissociality','',.5],['Disinhibition','',.78],['Anankastia','',.14]],
  ampd:[['Negative','Affectivity',.86],['Detachment','',.24],['Antagonism','',.5],['Disinhibition','',.78],['Psychoticism','',.3]]};
const IC_ICD=['Borderline pattern','Severity · self','Severity · interpersonal','Severity · harm','Severity · under stress','Negative Affectivity','Disinhibition','Dissociality'];
const IC_AM=['A · Identity','A · Self-direction','A · Empathy','A · Intimacy','B · Emotional lability','B · Anxiousness','B · Separation insecurity','B · Depressivity','B · Impulsivity','B · Risk taking','B · Hostility'];
const IC_MAP=[
 {n:'Abandonment fears',i:[0,2],a:[6,5,3],tx:`ICD-11's borderline pattern lists the same feature, and interpersonal dysfunction is part of the ICD-11 general requirement graded by severity. <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup> In the AMPD, separation insecurity and anxiousness are among the seven BPD traits, and intimacy is a Criterion A area. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`},
 {n:'Unstable relationships',i:[0,2],a:[3,2],tx:`A borderline pattern feature; interpersonal dysfunction is graded within ICD-11 severity. <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup> The AMPD covers relationships through its Criterion A areas of empathy and intimacy. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup> Relationship difficulties were central in adult symptom networks. <sup class="c" data-ref="Peters2023" title="Source 410">410</sup>`},
 {n:'Identity disturbance',i:[0,1],a:[0,1],tx:`ICD-11 grades self-functioning, including identity, self-worth, accuracy of self-view and self-direction, as part of severity. <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup> AMPD Criterion A begins with identity and self-direction. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`},
 {n:'Impulsivity',i:[0,6],a:[8,9],tx:`Disinhibition is a tendency to act rashly on immediate stimuli without considering negative consequences. <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup> AMPD Criterion B includes impulsivity and risk taking, and at least one of these (or hostility) is required. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`},
 {n:'Suicidal or self-harming behaviour',i:[0,3],a:[7,8],tx:`ICD-11 grades harm to self or others within severity: typically not in mild, sometimes in moderate and often in severe personality disorder. <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup> None of the seven AMPD BPD traits names it directly; depressivity and impulsivity are the nearest by definition in this teaching map. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`},
 {n:'Affective instability',i:[0,5],a:[4],tx:`Negative Affectivity is a tendency to experience a broad range of negative emotions with frequency and intensity out of proportion to the situation. The borderline pattern's mood states "typically last for a few hours but may last for up to several days". <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup> AMPD trait: emotional lability. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`},
 {n:'Chronic emptiness',i:[0,1],a:[7,0],tx:`A borderline pattern feature; the pattern can also note a view of the self as inadequate or bad, and profound alienation and loneliness. <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup> In the AMPD the nearest elements are depressivity and the identity area of Criterion A. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`},
 {n:'Intense anger',i:[0,5,7],a:[10],tx:`In 606 patients, BPD symptoms mapped onto Negative Affectivity, Dissociality and Disinhibition. <sup class="c" data-ref="Mulder2020" title="Source 356">356</sup> AMPD trait: hostility, one of the three traits of which at least one is required. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`},
 {n:'Paranoia or dissociation',i:[0,4],a:[],tx:`ICD-11 grades reactions under stress within severity: mild dissociative states or psychotic-like beliefs may occur in moderate, and are often present in severe personality disorder, for example extreme paranoid reactions. ICD-11 has no psychoticism domain. <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup> It is not among the seven AMPD BPD traits. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`}
];
function icWrap(t,n){const w=t.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c.trim());c=x}else c+=' '+x});if(c.trim())L.push(c.trim());return L}
inits.icd=()=>{
  const svg=$('#icSvg'),rg=$('#icT'),sev=$('#icSev'),note=$('#icNote'),rd=$('#icRead');let view='icd',setA=()=>{},lastP=-1;
  const sevIdx=v=>v<.25?0:v<.5?1:v<.75?2:3;
  function draw(t){
    const N=vb(svg,'720 380','400 600'),P=phaseOf(IC_STEPS,t),sv=+sev.value,si=sevIdx(sv),S=IC_SEV[si];
    if(P!==lastP){lastP=P;setA(P);note.innerHTML=noteHTML(IC_STEPS[P])}
    const sb=ramp(t,.03,.12),m=ease(ramp(t,.2,.34)),r=ease(ramp(t,.42,.56)),bp=ramp(t,.62,.76),am=ease(ramp(t,.8,.93));
    const W=N?400:720;let s='';
    const head=['ICD-10 (1992): named personality disorders','ICD-11 (2022): one personality disorder, graded','ICD-11: severity + trait domains','ICD-11: severity + domains + borderline pattern','DSM-5-TR Section III: Alternative Model'][P];
    s+=`<text x="${N?14:20}" y="22" class="t-sm" style="fill:var(--dx)">${head.toUpperCase()}</text>`;
    /* ---- boxes -> bar ---- */
    const bar=N?{x:20,y:44,w:360,h:40}:{x:150,y:40,w:420,h:40};
    let box=[];
    if(N){for(let i=0;i<7;i++){if(i===3){box.push({x:60,y:144,w:280,h:44});continue}const k=i<3?i:i-1;box.push({x:14+(k%3)*126,y:44+Math.floor(k/3)*44,w:118,h:34})}}
    else{let x=42;for(let i=0;i<7;i++){const w=i===3?120:76;box.push({x,y:42,w,h:40});x+=w+10}}
    const fade=1-r*.0,boxOp=1-am;
    if(m<1)box.forEach((b,i)=>{const x=lerp(b.x,bar.x+(bar.w/7)*i,m),y=lerp(b.y,bar.y,m),w=lerp(b.w,bar.w/7+1,m),h=lerp(b.h,bar.h,m),hl=i===3;
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(lerp(8,0,m))}" style="fill:${hl?'var(--dx-soft)':'var(--panel-2)'};stroke:${hl?'var(--dx)':'var(--line)'};stroke-width:${hl?1.8:1}"/>`;
      if(m<.5){const o=1-m*2;if(hl)s+=`<text x="${f1(x+w/2)}" y="${f1(y+h/2-2)}" class="t-xs t-mid" style="fill:var(--dx);font-weight:700;opacity:${f1(o)}">F60.3 Emotionally</text><text x="${f1(x+w/2)}" y="${f1(y+h/2+10)}" class="t-xs t-mid" style="fill:var(--dx);opacity:${f1(o)}">unstable PD</text>`;
        else s+=`<text x="${f1(x+w/2)}" y="${f1(y+h/2+3)}" class="t-xs t-mid" style="opacity:${f1(o)}">named type</text>`}});
    /* sub-types */
    const so=sb*(1-ramp(t,.2,.27));
    if(so>0){const b3=box[3],cx=b3.x+b3.w/2,sy=N?226:122,sw=N?170:156,gap=N?8:16;
      [['Impulsive type',''],['Borderline type','F60.31']].forEach(([a,c],k)=>{const x=k?cx+gap/2:cx-gap/2-sw;
        s+=`<g style="opacity:${f1(so)}"><path d="M${f1(cx)} ${f1(b3.y+b3.h)}L${f1(x+sw/2)} ${f1(sy)}" class="arrow"/><rect x="${f1(x)}" y="${sy}" width="${sw}" height="42" rx="8" style="fill:${k?'var(--storm-soft)':'var(--panel-2)'};stroke:${k?'var(--storm)':'var(--line)'};stroke-width:${k?1.8:1}"/>`+
          `<text x="${f1(x+sw/2)}" y="${sy+18}" class="t-lbl t-mid" style="fill:${k?'var(--storm)':'var(--ink)'}">${a}</text>`+(c?`<text x="${f1(x+sw/2)}" y="${sy+33}" class="t-xs t-mid" style="fill:var(--storm)">${c}</text>`:'')+'</g>'});
      if(!N&&so>.5)s+=`<text x="360" y="${(N?184:122)+70}" class="t-xs t-mid" style="opacity:${f1(so)}">F60.3 · emotionally unstable personality disorder, with two types</text>`}
    /* when: a small timeline */
    const tlo=N?sb*(1-r):sb*(1-m);
    if(tlo>0){const ty=N?480:300,tx=N?30:120,tw=N?340:480,TL=tline(tx,ty,tw,{min:1990,max:2025,step:5,fmt:v=>v});
      s+=`<g style="opacity:${f1(tlo)}">${TL.svg}`;
      [[1992,'ICD-10',0],[2019,'ICD-11 approved',1],[2022,'ICD-11 in use',-1]].forEach(([y,l,up])=>{const x=TL.X(y);s+=`<circle cx="${f1(x)}" cy="${ty}" r="6" style="fill:${y<2000?'var(--panel-2)':'var(--dx)'};stroke:var(--dx);stroke-width:1.5"/><text x="${f1(x)}" y="${ty-(up>0?30:up<0?-34:14)}" class="t-xs t-mid" style="fill:var(--dx);font-weight:700">${l}</text>`;if(up)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ty-26}" y2="${ty-7}" style="stroke:var(--dx);stroke-width:1"/>`});
      s+='</g>'}
    /* the ICD-11 bar */
    if(m>0){const o=m*boxOp;s+=`<g style="opacity:${f1(o)}"><rect x="${bar.x}" y="${bar.y}" width="${bar.w}" height="${bar.h}" rx="10" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:1.8"/>`+
      `<text x="${bar.x+bar.w/2}" y="${bar.y+17}" class="t-lbl t-mid" style="fill:var(--dx);opacity:${f1(ramp(m,.5,1))}">6D10 Personality disorder</text><text x="${bar.x+bar.w/2}" y="${bar.y+31}" class="t-xs t-mid" style="opacity:${f1(ramp(m,.5,1))}">${r>.05?'severity: '+S.n.toLowerCase()+' · '+S.c:'all named types removed'}</text></g>`}
    /* ---- severity gauge ---- */
    const go=ramp(t,.24,.34)*(1-r)*boxOp;
    if(go>0){const G=N?{cx:200,cy:250,R:118}:{cx:180,cy:310,R:118},dx=N?20:340,dy=N?300:138;
      const zc=['var(--panel-2)','var(--dx-soft)','var(--warn-soft)','var(--storm-soft)'],zs=['var(--muted)','var(--dx)','var(--warn)','var(--storm)'];
      const pt=(a,rr)=>[G.cx+rr*Math.cos(Math.PI*(1-a)),G.cy-rr*Math.sin(Math.PI*(1-a))];
      s+=`<g style="opacity:${f1(go)}">`;
      for(let z=0;z<4;z++){const a0=z/4,a1=(z+1)/4,p0=pt(a0,G.R),p1=pt(a1,G.R),q1=pt(a1,G.R-30),q0=pt(a0,G.R-30);
        s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}A${G.R} ${G.R} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}L${f1(q1[0])} ${f1(q1[1])}A${G.R-30} ${G.R-30} 0 0 0 ${f1(q0[0])} ${f1(q0[1])}Z" style="fill:${zc[z]};stroke:${z===si?zs[z]:'var(--line)'};stroke-width:${z===si?2:1}"/>`;
        const lp=pt((z+.5)/4,G.R+14),lb=['difficulty','mild','moderate','severe'][z];s+=`<text x="${f1(lp[0])}" y="${f1(lp[1])}" class="t-xs t-mid" style="fill:${zs[z]};font-weight:${z===si?700:500}">${lb}</text>`}
      const np=pt(sv,G.R-8);s+=`<line x1="${G.cx}" y1="${G.cy}" x2="${f1(np[0])}" y2="${f1(np[1])}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><circle cx="${G.cx}" cy="${G.cy}" r="7" style="fill:var(--ink)"/>`;
      s+=`<text x="${G.cx}" y="${G.cy+22}" class="t-mid" style="font:800 18px var(--display);fill:${S.col}">${S.c}</text>`;
      s+=`<text x="${dx}" y="${dy}" class="t-big" style="fill:${S.col}">${S.n}</text>`;
      S.d.forEach((l,k)=>{s+=`<text x="${dx}" y="${dy+22+k*17+(k>=2?6:0)}" class="t-sm" style="fill:var(--ink)">${l}</text>`});
      s+=`<text x="${dx}" y="${dy+(N?100:120)}" class="t-xs">Personality difficulty sits below the disorder threshold.</text>`;
      s+='</g>'}
    /* ---- radar ---- */
    const ro=r*(1-am);
    if(ro>0){const R=N?{cx:200,cy:262,R:100}:{cx:262,cy:214,R:100},D=IC_DOM[view],g=v=>v;
      const pt=(k,v)=>{const a=(-90+k*72)*Math.PI/180;return [R.cx+R.R*v*Math.cos(a),R.cy+R.R*v*Math.sin(a)]};
      s+=`<g style="opacity:${f1(ro)}">`;
      [.25,.5,.75,1].forEach(q=>{let d='';for(let k=0;k<5;k++){const p=pt(k,q);d+=(k?'L':'M')+f1(p[0])+' '+f1(p[1])}s+=`<path d="${d}Z" style="fill:none;stroke:var(--line);stroke-width:1"/>`});
      for(let k=0;k<5;k++){const p=pt(k,1),l=pt(k,1.2),dk=D[k],shared=k<4,diff=view==='icd'?k===4:k===4;
        s+=`<line x1="${R.cx}" y1="${R.cy}" x2="${f1(p[0])}" y2="${f1(p[1])}" class="axis"/>`;
        const anc=Math.abs(l[0]-R.cx)<8?'t-mid':l[0]<R.cx?'t-end':'';
        s+=`<text x="${f1(l[0])}" y="${f1(l[1]+(k===0?-4:4))}" class="t-xs ${anc}" style="fill:${diff?'var(--gold)':'var(--ink)'};font-weight:600">${dk[0]}</text>`;
        if(dk[1])s+=`<text x="${f1(l[0])}" y="${f1(l[1]+8)}" class="t-xs ${anc}" style="fill:var(--ink);font-weight:600">${dk[1]}</text>`;
        if(diff)s+=`<text x="${f1(l[0])}" y="${f1(l[1]+16)}" class="t-xs ${anc}" style="fill:var(--gold)">${view==='icd'?'ICD-11 only':'DSM-5 only'}</text>`}
      const gr=ease(ramp(t,.46,.58));let d='';for(let k=0;k<5;k++){const p=pt(k,D[k][2]*gr);d+=(k?'L':'M')+f1(p[0])+' '+f1(p[1])}
      const pc=bp>0?'var(--storm)':'var(--dx)';
      s+=`<path d="${d}Z" style="fill:${pc};fill-opacity:.2;stroke:${pc};stroke-width:2.2;stroke-linejoin:round"/>`;
      for(let k=0;k<5;k++){const p=pt(k,D[k][2]*gr);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.5" style="fill:${pc}"/>`}
      s+=`<text x="${R.cx}" y="${R.cy+R.R+(N?40:20)}" class="t-xs t-mid">schematic profile · ${view==='icd'?'ICD-11 domains 6D11.0–.4':'DSM-5 AMPD trait domains'}</text>`;
      /* borderline pattern badge */
      if(bp>0){const B=N?{x:40,y:420,w:320,h:104}:{x:470,y:96,w:226,h:196};
        s+=`<g style="opacity:${f1(bp)}"><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--storm-soft);stroke:var(--storm);stroke-width:1.8"/>`;
        s+=`<text x="${B.x+14}" y="${B.y+22}" class="t-lbl" style="fill:var(--storm)">6D11.5 Borderline pattern</text><text x="${B.x+14}" y="${B.y+37}" class="t-xs">optional specifier · ≥5 of 9 features</text>`;
        const lit=Math.floor(bp*5.999),dx0=B.x+14,dy0=B.y+(N?54:58);
        for(let k=0;k<9;k++){const cx=N?dx0+12+k*33:dx0+14+(k%3)*30,cy=N?dy0+6:dy0+6+Math.floor(k/3)*28;
          s+=`<circle cx="${cx}" cy="${cy}" r="10" style="fill:${k<lit?'var(--storm)':'var(--panel)'};stroke:var(--storm);stroke-width:1.4"/><text x="${cx}" y="${cy+3.5}" class="t-xs t-mid" style="fill:${k<lit?'var(--panel)':'var(--storm)'};font-weight:700">${k+1}</text>`}
        const tx=N?B.x+14:B.x+118,ty=N?B.y+86:B.y+66;
        const lines=N?[`mood states: a few hours, up to several days`]:['mood states:','a few hours,','up to several','days'];
        lines.forEach((l,k)=>{s+=`<text x="${tx}" y="${ty+k*13}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
        if(!N)s+=`<text x="${B.x+14}" y="${B.y+164}" class="t-xs" style="fill:var(--ink)">${lit} of 9 shown ${lit>=5?'✓ pattern present':''}</text><text x="${B.x+14}" y="${B.y+180}" class="t-xs">only polythetic ICD-11 specifier</text>`;
        s+='</g>'}
      /* label builder */
      const lb={x:360,y:370},tok=[S.n==='Personality difficulty'?'Personality difficulty':S.n+' personality disorder'];
      if(bp>.3)tok.push('with borderline pattern');if(view==='icd'&&gr>.9)tok.push('with Negative Affectivity, Disinhibition'+(bp>.6?' and Dissociality':''));
      const full=tok.join(', ');
      if(N){const ls=icWrap(full,58);ls.forEach((l,k)=>{s+=`<text x="200" y="${562+k*13}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${l}</text>`})}
      else s+=`<text x="${lb.x}" y="${lb.y}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${full}</text>`;
      s+='</g>'}
    /* ---- AMPD ---- */
    if(am>0){const g=am,Aval=[.72,.58,.36,.78],Aname=[['Identity','self'],['Self-direction','self'],['Empathy','interpersonal'],['Intimacy','interpersonal']];
      const AL=N?{x:16,y:44,cw:180,ch:78,gap:8}:{x:24,y:56,cw:148,ch:120,gap:10};
      s+=`<g style="opacity:${f1(g)}"><text x="${AL.x}" y="${AL.y}" class="t-sm" style="fill:var(--dx)">CRITERION A · PERSONALITY FUNCTIONING</text>`;
      let nA=0;
      Aname.forEach(([n,dom],k)=>{const x=AL.x+(k%2)*(AL.cw+AL.gap),y=AL.y+12+Math.floor(k/2)*(AL.ch+AL.gap),v=Aval[k]*ramp(am,.1,.8),on=v>=.5;if(on)nA++;
        s+=`<rect x="${x}" y="${y}" width="${AL.cw}" height="${AL.ch}" rx="10" style="fill:var(--panel);stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.8:1}"/>`;
        s+=`<text x="${x+12}" y="${y+20}" class="t-lbl">${n}</text><text x="${x+12}" y="${y+33}" class="t-xs">${dom}</text>`;
        const bx=x+12,bw=AL.cw-24,by=y+AL.ch-22;s+=`<rect x="${bx}" y="${by}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*v)}" height="10" rx="5" style="fill:${on?'var(--dx)':'var(--muted)'}"/><line x1="${f1(bx+bw*.5)}" x2="${f1(bx+bw*.5)}" y1="${by-4}" y2="${by+14}" style="stroke:var(--ink);stroke-width:1.4"/>`;
        if(k===0)s+=`<text x="${f1(bx+bw*.5)}" y="${by-7}" class="t-xs t-mid">moderate</text>`});
      const ay=AL.y+12+2*(AL.ch+AL.gap)+(N?6:12);
      s+=`<text x="${AL.x}" y="${ay}" class="t-xs" style="fill:${nA>=2?'var(--good)':'var(--ink)'};font-weight:700">${nA} of 4 areas at moderate or worse ${nA>=2?'✓ (≥2 needed)':'(≥2 needed)'}</text>`;
      const TL=N?{x:16,y:ay+30,w:368,h:30}:{x:360,y:56,w:340,h:34};
      const tr=['Emotional lability','Anxiousness','Separation insecurity','Depressivity','Impulsivity','Risk taking','Hostility'],lit=[0,2,4,6],req=[4,5,6];
      s+=`<text x="${TL.x}" y="${TL.y}" class="t-sm" style="fill:var(--dx)">CRITERION B · 7 TRAITS, ≥4 NEEDED</text>`;
      let nB=0,rq=false;
      tr.forEach((n,k)=>{const on=lit.indexOf(k)>=0&&ramp(am,.2,.9)>=(lit.indexOf(k)+1)/4-.001;if(on){nB++;if(req.indexOf(k)>=0)rq=true}
        const cols=N?2:1,x=TL.x+(k%cols)*(TL.w/cols),y=TL.y+10+Math.floor(k/cols)*(TL.h+(N?4:4)),w=TL.w/cols-(N?6:0);
        s+=`<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="${TL.h}" rx="8" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.8:1}"/>`;
        s+=`<text x="${f1(x+12)}" y="${y+TL.h/2+4}" class="t-sm" style="fill:${on?'var(--dx)':'var(--ink)'};font-weight:${on?700:500}">${n}</text>`;
        if(req.indexOf(k)>=0)s+=`<text x="${f1(x+w-10)}" y="${y+TL.h/2+4}" class="t-xs t-end" style="fill:var(--gold);font-weight:700">★</text>`});
      const by2=TL.y+10+(N?4:7)*(TL.h+4)+(N?14:16);
      s+=`<text x="${TL.x}" y="${by2}" class="t-xs" style="fill:${nB>=4&&rq?'var(--good)':'var(--ink)'};font-weight:700">${nB} of 7 ${nB>=4&&rq?'✓ incl. a ★ trait':''}</text><text x="${TL.x}" y="${by2+13}" class="t-xs">★ at least one of impulsivity, risk taking, hostility</text>`;
      s+='</g>'}
    svg.innerHTML=s;
    rd.innerHTML=`<span>Severity <b>${S.n} (${S.c})</b></span><span>Trait model <b>${view==='icd'?'ICD-11: 5 domains incl. Anankastia':'DSM-5: 5 domains incl. Psychoticism'}</b></span>`;
  }
  const stop=playWire(rg,$('#icPlay'),draw,16000,'Replay','icd');
  setA=stepWire($('#icSteps'),IC_STEPS,rg,draw,stop);
  sev.addEventListener('input',()=>{stop();if(+rg.value<.24||+rg.value>=.8){rg.value=IC_STEPS[1].at}draw(+rg.value)});
  $$('[data-icv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.icv;$$('[data-icv]').forEach(x=>x.setAttribute('aria-pressed',x===b));stop();if(+rg.value<.5||+rg.value>=.8)rg.value=IC_STEPS[2].at;draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- the criterion map ---------- */
  const ms=$('#icMapSvg'),mn=$('#icMapNote'),cb=$('#icCrit'),tb=$('#icTbl');let cur=5,stopM=null,icTick=0;
  cb.innerHTML=IC_MAP.map((c,i)=>`<button class="btn" data-icc="${i}" aria-pressed="${i===cur}">${i+1} · ${c.n}</button>`).join('');
  tb.innerHTML=IC_MAP.map((c,i)=>`<tr data-r="${i}"><th><button data-icr="${i}" aria-pressed="${i===cur}"><b>${i+1}</b>${c.n}</button></th><td>${c.i.map(k=>IC_ICD[k]).join('; ')}</td><td>${c.a.length?c.a.map(k=>IC_AM[k]).join('; '):'Not among the seven BPD traits'}</td></tr>`).join('');
  function drawMap(p){
    const N=vb(ms,'720 330','400 392'),c=IC_MAP[cur];let s='';
    const L=N?{tx:200,ty:16,tw:300,lx:8,lw:176,rx:216,rw:176,ly:80,ry:80,lh:30,rh:30}:{tx:360,ty:12,tw:330,lx:24,lw:250,rx:446,rw:250,ly:82,ry:66,lh:30,rh:23.5};
    s+=`<rect x="${L.tx-L.tw/2}" y="${L.ty}" width="${L.tw}" height="36" rx="10" style="fill:var(--dx);stroke:var(--dx)"/><text x="${L.tx}" y="${L.ty+23}" class="t-lbl t-mid" style="fill:var(--panel)">DSM-5-TR ${cur+1} · ${c.n}</text>`;
    s+=`<text x="${L.lx}" y="${L.ly-14}" class="t-xs" style="fill:var(--dx);font-weight:700">ICD-11</text><text x="${L.rx+L.rw}" y="${L.ry-14+(N?0:0)}" class="t-xs t-end" style="fill:var(--dx);font-weight:700">AMPD (SECTION III)</text>`;
    const ox=L.tx,oy=L.ty+36;
    const edge=(x,y,k,n)=>{const q=ramp(p,k/(n+1)*.6,k/(n+1)*.6+.5);if(q<=0)return '';return `<path d="M${ox} ${oy}C${ox} ${f1(oy+40)} ${f1(x+(x<ox?30:-30))} ${f1(y)} ${f1(x)} ${f1(y)}" pathLength="1" style="fill:none;stroke:var(--dx);stroke-width:2;stroke-dasharray:1;stroke-dashoffset:${f1(1-q)};opacity:.75"/>`};
    const nE=c.i.length+c.a.length;let e=0;
    IC_ICD.forEach((n,k)=>{const y=L.ly+k*L.lh,on=c.i.indexOf(k)>=0;if(on)s+=edge(L.lx+L.lw,y+L.lh/2-3,e++,nE);
      s+=`<rect x="${L.lx}" y="${y}" width="${L.lw}" height="${L.lh-6}" rx="7" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.8:1}"/><text x="${L.lx+10}" y="${y+L.lh/2+1}" class="t-xs" style="fill:${on?'var(--dx)':'var(--muted)'};font-weight:${on?700:500}">${n}</text>`});
    IC_AM.forEach((n,k)=>{const y=L.ry+k*(N?L.rh*.88:L.rh),h=N?L.rh*.88-4:L.rh-4,on=c.a.indexOf(k)>=0;if(on)s+=edge(L.rx,y+h/2,e++,nE);
      s+=`<rect x="${L.rx}" y="${f1(y)}" width="${L.rw}" height="${f1(h)}" rx="7" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.8:1}"/><text x="${L.rx+10}" y="${f1(y+h/2+3.5)}" class="t-xs" style="fill:${on?'var(--dx)':'var(--muted)'};font-weight:${on?700:500}">${n}</text>`});
    if(!c.a.length){const y=L.ry+11*(N?L.rh*.88:L.rh)+12;s+=`<text x="${L.rx}" y="${f1(y)}" class="t-xs" style="fill:var(--warn)">no AMPD BPD trait</text>`}
    ms.innerHTML=s;
  }
  function pick(i){cur=i;$$('[data-icc]',cb).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.icc===i));$$('[data-icr]',tb).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.icr===i));
    $$('tr',tb).forEach(r=>r.classList.toggle('on',+r.dataset.r===i));
    const c=IC_MAP[i];mn.innerHTML=noteHTML({k:`Criterion ${i+1} · teaching map`,t:c.n,txt:c.tx,pt:i===2||i===5?`This criterion sits at the heart of BPD in every system: it is among the most central in symptom networks.`:`The same experience is described in all three systems, just filed in different places.`,
      hook:c.a.length?`AMPD counterpart${c.a.length>1?'s':''}: ${c.a.map(k=>IC_AM[k].slice(4)).join(', ')}.`:`ICD-11 grades stress-related paranoia and dissociation within severity; no AMPD BPD trait.`});
    if(stopM)stopM();const tk=++icTick;stopM=animate(700,drawMap,()=>{stopM=null});setTimeout(()=>{if(tk===icTick){if(stopM){stopM();stopM=null}drawMap(1)}},900)}
  cb.addEventListener('click',e=>{const b=e.target.closest('[data-icc]');if(b)pick(+b.dataset.icc)});
  tb.addEventListener('click',e=>{const b=e.target.closest('[data-icr]');if(b)pick(+b.dataset.icr)});
  const prevR=redraws.icd;redraws.icd=()=>{prevR&&prevR();drawMap(1)};
  pick(cur);drawMap(1);
};
/* =============== 2.3 Assessment & interviews =============== */
const AS_STEPS=[
 {from:0,at:.07,k:'Step 1 of 7 · Concern',t:'Concern raised',
  txt:`Assessment usually starts when the person, someone close to them or a clinician notices a long-standing pattern: intense emotions, stormy relationships, impulsive acts or self-harm. BPD is common where people seek help: 6.4% lifetime prevalence in one US primary care practice, where 42.9% of those with BPD had not been recognised by their physician as having an emotional problem. <sup class="c" data-ref="Gross2002PrimaryCare" title="Source 194">194</sup> It affects about 10–12% of psychiatric outpatients and 20–22% of inpatients. <sup class="c" data-ref="Ellison2018" title="Source 144">144</sup>`,
  pt:`If your emotions and relationships have felt like a storm for years, it is reasonable to ask for a proper assessment.`,
  hook:`Missing BPD leads to misleading drug treatment that rarely succeeds: ask actively about relationships and unstable identity. <sup class="c" data-ref="Gunderson2018" title="Source 207">207</sup>`},
 {from:1/7,at:1/7+.07,k:'Step 2 of 7 · Screening',t:'Screening questionnaire',
  txt:`The McLean Screening Instrument (MSI-BPD) has 10 yes/no items. In 200 people with treatment histories, a cut-off of 7 or more gave sensitivity 0.81 and specificity 0.85. <sup class="c" data-ref="Zanarini2003MSI" title="Source 575">575</sup> In a Dutch sample, a cut-off of 5 gave sensitivity 0.94 and specificity 0.86, and a review argues the cut-off may need to be below 7 when the aim is screening rather than case-finding. <sup class="c" data-ref="Andre2015,Zimmerman2021MSI" title="Source 9,608">9,608</sup> Asking a single question about affective instability picks up 92.8% of outpatients with BPD. <sup class="c" data-ref="Zimmerman2017BJP" title="Source 607">607</sup>`,
  pt:`A short questionnaire can flag who should have a full assessment. It cannot tell you that you have BPD.`,
  hook:`MSI-BPD: 10 items, cut-off 7, sensitivity 0.81, specificity 0.85. <sup class="c" data-ref="Zanarini2003MSI" title="Source 575">575</sup>`},
 {from:2/7,at:2/7+.07,k:'Step 3 of 7 · Diagnosis',t:'Structured interview',
  txt:`The recommended route is a structured or semi-structured interview for the diagnosis, with self-report questionnaires for screening or severity. <sup class="c" data-ref="Kaess2025,Leichsenring2024WP" title="Source 251,300">251,300</sup> The DIB-R reached kappas above 0.75 for the BPD diagnosis. <sup class="c" data-ref="Zanarini2002DIBR" title="Source 573">573</sup> The IPDE was tested in 716 patients at 14 centres in 11 countries. <sup class="c" data-ref="Loranger1994" title="Source 317">317</sup> The SCID-II showed excellent inter-rater agreement for most personality disorders <sup class="c" data-ref="Lobbestael2011" title="Source 315">315</sup>, and the SCID-5-PD acceptable agreement for BPD in one Persian study <span class="ev early">Early evidence</span> <sup class="c" data-ref="Gharraee2022" title="Source 176">176</sup>.`,
  pt:`The diagnosis comes from a careful conversation with a trained clinician, who asks about the same experiences in a set order.`,
  hook:`Interview = diagnosis; questionnaire = screening or severity. Using both together identified BPD criteria best in CLPS. <sup class="c" data-ref="Hopwood2008" title="Source 230">230</sup>`},
 {from:3/7,at:3/7+.07,k:'Step 4 of 7 · Differential',t:'Differential and comorbidities',
  txt:`Most people with BPD have other conditions too. Among adult inpatients with BPD, lifetime rates were 89.0% for any anxiety disorder, 86.6% for major depression, 62.1% for a substance use disorder, 53.8% for an eating disorder and 27.9% for ADHD; 76.6% had "complex comorbidity", a disorder of affect plus a disorder of impulse. <sup class="c" data-ref="Zanarini2021Comorbidity" title="Source 599">599</sup> Short mood shifts lasting hours point to BPD; sustained mood episodes point to bipolar disorder. <sup class="c" data-ref="Kaess2025,Paris2015" title="Source 251,401">251,401</sup>`,
  pt:`Depression, anxiety, trauma symptoms, substance or eating problems often come with BPD. Each one deserves its own attention.`,
  hook:`Complex comorbidity (affect + impulse disorder) is a strong marker of BPD. <sup class="c" data-ref="Zanarini1998AxisI" title="Source 569">569</sup>`},
 {from:4/7,at:4/7+.07,k:'Step 5 of 7 · Disclosure',t:'Sharing the diagnosis',
  txt:`Withholding the diagnosis to protect the person is now generally seen as unethical. <sup class="c" data-ref="Sims2022" title="Source 484">484</sup> Yet 57% of 134 US psychiatrists surveyed had at some point not disclosed it. <sup class="c" data-ref="Sisti2016" title="Source 485">485</sup> NICE asks for an atmosphere of hope, "explaining that recovery is possible and attainable". <sup class="c" data-ref="NICE2009" title="Source 379">379</sup> The evidence behind that hope: 34.5% of 290 people were in remission at 2 years, 49.4% at 4 years and 68.6% at 6 years (population statistics from one cohort). <sup class="c" data-ref="Zanarini2003Course" title="Source 574">574</sup> A psychoeducation workshop soon after disclosure reduced impulsivity and relationship storminess. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Zanarini2008Psychoed" title="Source 583">583</sup>`,
  pt:`You have the right to know your diagnosis, and to hear that recovery is common.`,
  hook:`MSAD remission: 34.5% at 2 years, 49.4% at 4, 68.6% at 6; recurrence after remission only 5.9%. <sup class="c" data-ref="Zanarini2003Course" title="Source 574">574</sup>`},
 {from:5/7,at:5/7+.07,k:'Step 6 of 7 · Measurement',t:'Severity and change',
  txt:`Two scales track how things change. The BSL-23 is a 23-item self-rating with six grades of mean item score from none or low (0–0.3) to extremely high (3.5–4); a mean of 1.50 best separated BPD from other disorders. <sup class="c" data-ref="Bohus2009,Kleindienst2020" title="Source 64,269">64,269</sup> The ZAN-BPD is clinician-rated over the past week: 9 criteria, each 0–4, total 0–36. <sup class="c" data-ref="Zanarini2003ZAN" title="Source 577">577</sup> The scores in the drawing are illustrative.`,
  pt:`Simple scores, repeated over time, help you and your clinician see whether treatment is working.`,
  hook:`ZAN-BPD: 9 × 0–4 = 0–36, past week. BSL-23: self-rated, grades 0–4, cut-off 1.50. <sup class="c" data-ref="Zanarini2003ZAN,Kleindienst2020" title="Source 269,577">269,577</sup>`},
 {from:6/7,at:6/7+.07,k:'Step 7 of 7 · Safety',t:'Crisis and safety plan',
  txt:`APA 2024 implementation text says people with BPD should be monitored for suicide risk, with assessments documented and "individualized safety plans" developed. <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup> NICE CG78 asks that each care plan include a crisis plan naming triggers, self-management strategies that work and how to reach services, including out-of-hours numbers. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup> Risk scales should not be used to predict suicide or self-harm. <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup>`,
  pt:`A safety plan is a short written plan you make with a clinician: your warning signs, what helps, who to contact and crisis numbers.`,
  hook:`NICE NG225: no risk tools or low/medium/high stratification to predict suicide; use a risk formulation instead. <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup>`}
];
const AS_TEEN=[
 `In young people, BPD affects around 3% in the community, and from 11% of outpatients to 78% of suicidal adolescents seen in an emergency department. <sup class="c" data-ref="Guile2018" title="Source 195">195</sup> NICE recommends that a person under 18 with repeated self-harm, persistent risk-taking or marked emotional instability is referred to CAMHS for assessment. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
 `In 63 participants aged 25 or under, the MSI-BPD cut-off of 7 gave sensitivity 0.90 and specificity 0.93. <sup class="c" data-ref="Zanarini2003MSI" title="Source 575">575</sup> In 101 outpatients aged 15–25, the Borderline Personality Questionnaire had sensitivity 0.68, specificity 0.90, PPV 0.65 and NPV 0.91. <sup class="c" data-ref="Chanen2008" title="Source 90">90</sup>`,
 `The criteria are the same, but under 18 the features must have been present for at least 1 year. <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup> Evidence supports diagnosis from age 12, and tools validated in youth include the CI-BPD, DIB-R, BPDSI-IV adolescent version, SCID-II, BPFSC, BPQ, MSI-BPD and BSL. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup> An expert review found "no justification for failing to make an early diagnosis". <sup class="c" data-ref="Fonagy2015" title="Source 161">161</sup>`,
 `In adolescent inpatients with BPD, lifetime rates were 75.0% for major depression, 60.6% for anxiety disorders, 35.6% for substance use, 30.8% for eating disorders and 22.1% for ADHD; complex comorbidity was 40.4%. <sup class="c" data-ref="Zanarini2021Comorbidity" title="Source 599">599</sup>`,
 `Clinicians remain reluctant to diagnose BPD in adolescents, and more training in early diagnosis is recommended. <sup class="c" data-ref="Kaess2025,Peters2023" title="Source 251,410">251,410</sup> The symptom network is broadly the same in adolescents and adults. <sup class="c" data-ref="Peters2023" title="Source 410">410</sup>`,
 `The BSL is among the measures validated in young people. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`,
 `Lifetime self-injury (about 90%) and suicide attempts (about 75%) were similar in adolescent and adult inpatients with BPD <sup class="c" data-ref="Goodman2017" title="Source 183">183</sup>, so safety planning belongs in youth assessment too. Young people should have the full range of recommended treatments within CAMHS. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`
];
const AS_LBL={w:['Concern','Screening','Interview','Differential','Sharing it','Measuring','Safety plan'],n:['Concern','Screen','Interview','Rule out','Share','Measure','Plan']};
const AS_SUB=['','MSI-BPD','SCID · DIB-R','comorbidity','hope','BSL · ZAN','crisis plan'],AS_SUBN=['','MSI-BPD','SCID','comorbid.','hope','BSL·ZAN','crisis'];
const AS_SET=[{n:'Community',p:1,src:'median point prevalence about 1%'},{n:'Primary care',p:6.4,src:'6.4% lifetime in one US practice'},{n:'Psychiatric outpatients',p:11,src:'10–12% (midpoint shown)'},{n:'Psychiatric inpatients',p:21,src:'20–22% (midpoint shown)'}];
const AS_TESTS=[{n:'MSI-BPD, cut-off 7',se:.81,sp:.85,c:'<sup class="c" data-ref="Zanarini2003MSI" title="Source 575">575</sup>'},{n:'MSI-BPD, cut-off 7, age 25 or under',se:.90,sp:.93,c:'<sup class="c" data-ref="Zanarini2003MSI" title="Source 575">575</sup>'},{n:'MSI-BPD (Dutch), cut-off 5',se:.94,sp:.86,c:'<sup class="c" data-ref="Andre2015" title="Source 9">9</sup>'},{n:'MSI-BPD (Dutch), cut-off 7',se:.71,sp:.96,c:'<sup class="c" data-ref="Andre2015" title="Source 9">9</sup>'},{n:'BPQ, ages 15–25',se:.68,sp:.90,c:'<sup class="c" data-ref="Chanen2008" title="Source 90">90</sup>'}];
inits.assess=()=>{
  const svg=$('#asSvg'),rg=$('#asT');let teen=false;
  const tx=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const chip=(x,y,w,h,col,soft)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="7" style="fill:${soft};stroke:${col};stroke-width:1.2"/>`;
  /* the panel above the stairs: one small scene per step, u = 0..1 progress within the step */
  function scene(i,u,X,Y,W,H){let s=chip(X,Y,W,H,'var(--line)','var(--field)');
    const T=['1 · A concern is raised','2 · Screening questionnaire','3 · Structured interview','4 · Differential and comorbidities','5 · Sharing the diagnosis','6 · Measuring severity and change','7 · Crisis and safety plan'];
    s+=tx(X+14,Y+22,T[i],'t-lbl');
    s+=tx(X+W-12,Y+22,teen?'ADOLESCENT':'ADULT','t-xs t-end','fill:var(--dx);font-weight:700');
    if(i===0){s+=person(X+38,Y+40,46,'var(--other)');
      s+=bubble(X+76,Y+36,W-92,44,{tx:X+52,ty:Y+52,lines:W<340?['Ask about emotions,','relationships, sense of self']:['Ask about emotions, relationships','and sense of self'],col:'var(--dx)'});
      const st=teen?['≈3% community','11% outpatients','78% suicidal, ED']:['6.4% primary care','10–12% outpatients','20–22% inpatients'],cw=(W-28-12)/3;
      st.forEach((t,k)=>{const a=ramp(u,.15+k*.18,.35+k*.18);if(a<=0)return;
        s+=`<g style="opacity:${f1(a)}">${chip(X+14+k*(cw+6),Y+H-36,cw,24,'var(--dx)','var(--dx-soft)')}${tx(X+14+k*(cw+6)+cw/2,Y+H-20,t,'t-xs t-mid','fill:var(--dx);font-weight:700;font-size:'+f1(Math.min(9.5,(cw-6)/t.length/.6))+'px')}</g>`});
      s+=tx(X+14,Y+H-44,'how common BPD is where people seek help','t-xs');}
    else if(i===1){const n=Math.round(ramp(u,.05,.75)*8),bs=Math.min(24,(W-60)/10-6),gap=6,x0=X+14;
      s+=tx(X+14,Y+42,'MSI-BPD · 10 yes/no items','t-sm');
      for(let k=0;k<10;k++){const bx=x0+k*(bs+gap),on=k<n;
        s+=`<rect x="${f1(bx)}" y="${f1(Y+52)}" width="${f1(bs)}" height="${f1(bs)}" rx="4" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:1.4"/>`;
        if(on)s+=`<path d="M${f1(bx+bs*.22)} ${f1(Y+52+bs*.52)}l${f1(bs*.2)} ${f1(bs*.2)}l${f1(bs*.38)} ${f1(-bs*.42)}" style="fill:none;stroke:var(--dx);stroke-width:2.2;stroke-linecap:round"/>`}
      const lx=x0+6*(bs+gap)-gap/2;s+=`<line x1="${f1(lx)}" x2="${f1(lx)}" y1="${f1(Y+46)}" y2="${f1(Y+58+bs)}" style="stroke:var(--storm);stroke-width:1.6;stroke-dasharray:4 3"/>`+tx(lx+4,Y+58+bs+12,'cut-off: 7 or more','t-xs','fill:var(--storm)');
      s+=tx(X+14,Y+60+bs+30,`${n} of 10 · `+(n>=7?'<tspan style="fill:var(--storm);font-weight:700">screen positive → interview next</tspan>':'below the cut-off so far'),'t-sm');
      if(teen)s+=tx(X+14,Y+H-28,'MSI-BPD, age ≤25: sens 0.90 · spec 0.93','t-xs','fill:var(--ink)')+tx(X+14,Y+H-14,'BPQ, ages 15–25: sens 0.68 · spec 0.90','t-xs','fill:var(--ink)');else s+=tx(X+14,Y+H-14,'Cut-off 7: sensitivity 0.81 · specificity 0.85','t-xs','fill:var(--ink)')}
    else if(i===2){const R=teen?[['CI-BPD','validated in youth'],['DIB-R','validated in youth'],['Under 18','features present ≥ 1 year']]:[['SCID-5-PD','semi-structured · DSM-5'],['DIB-R','κ > 0.75 for the diagnosis'],['IPDE','WHO trial: 716 patients, 11 countries']];
      const rh=Math.min(32,(H-48)/3-4);
      R.forEach((r,k)=>{const a=ramp(u,.05+k*.2,.25+k*.2);if(a<=0)return;const yy=Y+36+k*(rh+5);
        s+=`<g style="opacity:${f1(a)}" transform="translate(${f1((1-a)*20)} 0)">${chip(X+14,yy,W-28,rh,'var(--dx)','var(--panel)')}${tx(X+24,yy+rh/2+4,r[0],'t-lbl','font-size:12px')}${tx(X+W-24,yy+rh/2+4,r[1],'t-xs t-end')}</g>`})}
    else if(i===3){const R=teen?[['Depression',75.0],['Anxiety',60.6],['Substance use',35.6],['Eating disorder',30.8],['ADHD',22.1]]:[['Anxiety',89.0],['Depression',86.6],['Substance use',62.1],['Eating disorder',53.8],['ADHD',27.9]];
      const bx=X+120,bw=W-120-52,rh=Math.min(22,(H-58)/5);s+=tx(X+14,Y+40,(teen?'adolescent':'adult')+' inpatients with BPD · lifetime %','t-xs');
      R.forEach((r,k)=>{const yy=Y+50+k*rh,w=bw*r[1]/100*ease(ramp(u,.05+k*.08,.45+k*.08));
        s+=tx(X+14,yy+rh*.65,r[0],'t-sm','fill:var(--ink)')+`<rect x="${f1(bx)}" y="${f1(yy+3)}" width="${f1(bw)}" height="${f1(rh-7)}" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(bx)}" y="${f1(yy+3)}" width="${f1(w)}" height="${f1(rh-7)}" rx="3" style="fill:var(--dx);opacity:.85"/>`+tx(bx+bw+6,yy+rh*.65,w>0?r[1].toFixed(1):'','t-xs','fill:var(--ink)')})}
    else if(i===4){const bw=Math.min(190,W*.48);s+=person(X+30,Y+40,40,'var(--dx)');
      s+=bubble(X+54,Y+34,bw,46,{tx:X+40,ty:Y+50,lines:['Recovery is possible','and attainable'],col:'var(--accent)'});
      s+=tx(X+14,Y+H-14,'NICE: hope and optimism','t-xs');
      const gx=X+54+bw+16,gw=X+W-14-gx,R=[['2 y',34.5],['4 y',49.4],['6 y',68.6]],gb=Y+H-30,gh=H-78,cw=gw/3;
      s+=tx(gx,Y+44,'remission','t-xs')+tx(gx,Y+56,'290 people','t-xs');
      R.forEach((r,k)=>{const h=gh*r[1]/100*ease(ramp(u,.1+k*.15,.5+k*.15));
        s+=`<rect x="${f1(gx+k*cw+cw*.18)}" y="${f1(gb-h)}" width="${f1(cw*.64)}" height="${f1(h)}" rx="3" style="fill:var(--accent)"/>`+tx(gx+k*cw+cw/2,gb+13,r[0],'t-xs t-mid')+(h>0?tx(gx+k*cw+cw/2,gb-h-4,r[1],'t-xs t-mid','fill:var(--ink)'):'')});
      s+=`<line x1="${f1(gx)}" x2="${f1(gx+gw)}" y1="${f1(gb)}" y2="${f1(gb)}" class="axis"/>`}
    else if(i===5){const B=[0,.3,.7,1.7,2.7,3.5,4],C=['var(--calm)','var(--calm)','var(--mood)','var(--mood)','var(--storm)','var(--storm)'],O=[.25,.5,.35,.65,.6,.9],x0=X+14,w=W-28,Xv=v=>x0+w*v/4,by=Y+68;
      const NM=['none/low','mild','moderate','high','very high','extremely high'];
      s+=tx(X+14,Y+38,'BSL-23 · self-rated · mean item score 0–4','t-xs');
      for(let k=0;k<6;k++)s+=`<rect x="${f1(Xv(B[k]))}" y="${by}" width="${f1(Xv(B[k+1])-Xv(B[k])-1)}" height="14" style="fill:${C[k]};opacity:${O[k]}"/>`;
      B.forEach(v=>{s+=tx(Xv(v),by+26,v,'t-xs t-mid')});
      const v=lerp(2.4,1.2,ease(ramp(u,.1,.85))),bi=B.findIndex((b,k)=>v>=b&&v<B[k+1]);
      s+=`<path d="M${f1(Xv(v))} ${by-2}l-6 -9h12z" style="fill:var(--ink)"/>`+tx(Xv(v),by-14,v.toFixed(1)+' · '+NM[bi],'t-xs t-mid','fill:var(--ink);font-weight:700');
      s+=`<line x1="${f1(Xv(1.5))}" x2="${f1(Xv(1.5))}" y1="${by-4}" y2="${by+18}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 2"/>`;
      const zy=by+48,z=Math.round(lerp(20,10,ease(ramp(u,.1,.85))));
      s+=tx(X+14,zy-6,'ZAN-BPD · clinician-rated · past week · 0–36','t-xs')+`<rect x="${f1(x0)}" y="${zy}" width="${f1(w)}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(x0)}" y="${zy}" width="${f1(w*z/36)}" height="12" rx="6" style="fill:var(--dx)"/>`+tx(x0+w*z/36+6,zy+10,z,'t-xs','fill:var(--ink);font-weight:700');
      if(H>zy+30-Y)s+=tx(X+14,Y+H-12,'illustrative scores falling over treatment','t-xs')}
    else{const L=['Warning signs','Internal coping','People &amp; places','People to ask','Crisis lines','Safer surroundings'],cw=(W-28)/2,rh=Math.min(30,(H-70)/3);
      L.forEach((l,k)=>{const c=k%2,r=Math.floor(k/2),xx=X+14+c*cw,yy=Y+36+r*rh,a=ramp(u,.04+k*.11,.14+k*.11);
        s+=`<rect x="${f1(xx)}" y="${f1(yy+4)}" width="16" height="16" rx="4" style="fill:${a>=1?'var(--accent-soft)':'var(--panel)'};stroke:var(--accent);stroke-width:1.3"/>`;
        if(a>0)s+=`<path d="M${f1(xx+4)} ${f1(yy+12)}l3.5 3.5l5 -7" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round;opacity:${f1(a)}"/>`;
        s+=tx(xx+24,yy+16,l,'t-sm','fill:var(--ink)')});
      s+=tx(X+14,Y+H-14,(W<340?'':'written with the person · ')+'see 4.2 Suicide &amp; self-harm safety','t-xs','fill:var(--accent)')}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 620');
    const L=N?{lx:12,ly:290,lw:376,lh:310,cx:12,cy:12,cw:376,ch:238}:{lx:24,ly:120,lw:672,lh:230,cx:24,cy:14,cw:382,ch:162};
    const f=t*7,i=clamp(Math.floor(f),0,6),u=clamp(f-i);
    const lab=AS_LBL[N?'n':'w'];
    const ld=ladder(L.lx,L.ly,L.lw,L.lh,lab,{at:i,col:'var(--dx)',done:true});
    let s=ld.svg;
    const sw=L.lw/7,sh=L.lh/7;
    (N?AS_SUBN:AS_SUB).forEach((sb,k)=>{if(!sb||sh*(k+1)<44)return;const sx=L.lx+sw*k+(sw-3)/2,sy=L.ly+L.lh-sh*(k+1)+30;
      s+=tx(sx,sy,sb,'t-xs t-mid',k===i?'fill:var(--on-brand);opacity:.85':'opacity:.8')});
    /* the climber: stands on step i, hops to i+1 at the end of each step */
    const hop=ease(ramp(u,.86,1)),a=ld.top(i),b=ld.top(Math.min(6,i+1)),px=lerp(a[0],b[0],i<6?hop:0),py=lerp(a[1],b[1],i<6?hop:0)-(i<6?bump(hop,0,1)*16:0);
    s+=person(px,py-30,28,'var(--self)');
    s+=N?`<g transform="translate(12 12) scale(1.2533)">${scene(i,u,0,0,300,190)}</g>`:scene(i,u,L.cx,L.cy,L.cw,L.ch);
    if(!N)s+=tx(696,40,`step ${i+1} of 7`,'t-sm t-end')+tx(696,56,teen?'adolescent pathway':'adult pathway','t-xs t-end');
    svg.innerHTML=s;
    const p=phaseOf(AS_STEPS,t);setSt(p);
    $('#asNote').innerHTML=noteHTML(AS_STEPS[p])+(teen?`<div class="kv"><div><dt>Adolescent pathway</dt><dd>${AS_TEEN[p]}</dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#asPlay'),draw,28000,'Replay','assess');
  const setSt=stepWire($('#asSteps'),AS_STEPS,rg,draw,stop);
  $$('[data-asage]').forEach(b=>b.addEventListener('click',()=>{teen=b.dataset.asage==='teen';$$('[data-asage]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- predictive-value calculator: 1,000 people screened ---- */
  const isv=$('#asIcons'),pr=$('#asPrev'),ts=$('#asTest');let reveal=1,stopR=null;
  function counts(){const p=+pr.value/100,T=AS_TESTS[+ts.value]||AS_TESTS[0],D=Math.round(1000*p),TP=Math.round(D*T.se),FN=D-TP,FP=Math.round((1000-D)*(1-T.sp)),TN=1000-D-FP;return{p,T,D,TP,FN,FP,TN}}
  function drawI(){const N=vb(isv,'720 360','400 620');const c=counts();
    const cols=N?25:40,rows=N?40:25,cell=N?14.4:13.6,x0=N?(400-cols*cell)/2:(720-cols*cell)/2,y0=N?8:8;
    let s='';const lim=Math.round(1000*reveal);
    for(let k=0;k<1000;k++){const r=Math.floor(k/cols),q=k%cols,x=x0+q*cell,y=y0+r*cell;
      const g=k<c.TP?0:k<c.TP+c.FN?1:k<c.TP+c.FN+c.FP?2:3,on=k<lim;
      const st=!on?'fill:var(--panel-2);opacity:.5':g===0?'fill:var(--storm)':g===1?'fill:var(--storm-soft);stroke:var(--storm);stroke-width:1':g===2?'fill:var(--dx)':'fill:var(--panel-2)';
      s+=`<rect x="${f1(x+1)}" y="${f1(y+1)}" width="${f1(cell-2.6)}" height="${f1(cell-2.6)}" rx="2" style="${st}"/>`}
    const yb=y0+rows*cell+(N?14:12);
    s+=`<text x="${f1(x0)}" y="${f1(yb)}" class="t-xs">1,000 people screened · ${AS_SET.some(z=>z.p===+pr.value)?'':'custom '}prevalence ${(+pr.value).toFixed(1)}% · ${c.T.n.replace('&','&amp;')}</text>`;
    isv.innerHTML=s;
    const pos=c.TP+c.FP,ppv=pos?c.TP/pos*100:0,npv=(c.TN+c.FN)?c.TN/(c.TN+c.FN)*100:0;
    $('#asPrevV').textContent=(+pr.value).toFixed(1)+'%';
    $('#asRead').innerHTML=`<div><small>truly have BPD</small><b class="as-big">${c.D}</b></div><div><small>screen positive</small><b class="as-big">${pos}</b></div><div><small>positive and truly BPD</small><b class="as-big" style="color:var(--storm)">${Math.round(ppv)}%</b></div><div><small>negative and truly not</small><b class="as-big" style="color:var(--good)">${npv.toFixed(1)}%</b></div>`;
    const set=AS_SET.find(z=>z.p===+pr.value);
    $('#asCalcNote').innerHTML=noteHTML({k:set?set.n+' · '+set.src:'Custom prevalence',t:`${pos} positive screens, ${c.TP} with BPD`,
      txt:`With ${c.T.n} (sensitivity ${c.T.se.toFixed(2)}, specificity ${c.T.sp.toFixed(2)}) ${c.T.c} and a prevalence of ${(+pr.value).toFixed(1)}%, ${c.D} of 1,000 people have BPD. The questionnaire flags ${c.TP} of them and misses ${c.FN}, and it also flags ${c.FP} people who do not have BPD. So a positive screen means BPD about ${Math.round(ppv)}% of the time (positive predictive value), and a negative screen is right ${npv.toFixed(1)}% of the time (negative predictive value).`,
      pt:`A positive questionnaire means "worth a proper assessment", not "you have BPD". Where BPD is rare, most positive screens are false alarms.`,
      hook:`Sensitivity and specificity belong to the test; PPV and NPV depend on prevalence. Calculated MSI-BPD PPV: about 5% at 1%, 38% at 10% and 57% at 20% prevalence. <sup class="c" data-ref="Zanarini2003MSI,Ellison2018" title="Source 144,575">144,575</sup>`})
      +`<div class="verdict ${ppv<30?'no':ppv<60?'maybe':'yes'}">${ppv<30?'Most positive screens here are false alarms':ppv<60?'A positive screen is close to a coin toss here':'Most positive screens here are true cases'}: an interview is still needed to diagnose.</div>`;
  }
  function run(){if(stopR)stopR();reveal=0;stopR=animate(700,p=>{reveal=p;drawI()},()=>{stopR=null})}
  $$('[data-asset]').forEach(b=>b.addEventListener('click',()=>{pr.value=AS_SET[+b.dataset.asset].p;$$('[data-asset]').forEach(x=>x.setAttribute('aria-pressed',x===b));run()}));
  pr.addEventListener('input',()=>{if(stopR){stopR();stopR=null}reveal=1;$$('[data-asset]').forEach(x=>x.setAttribute('aria-pressed',AS_SET[+x.dataset.asset].p===+pr.value));drawI()});
  ts.addEventListener('change',run);
  drawI();
  const prevR=redraws.assess;redraws.assess=()=>{prevR&&prevR();drawI()};
  const prevH=onHide.assess;onHide.assess=()=>{prevH&&prevH();if(stopR){stopR();stopR=null;reveal=1}};
};
/* =============== 2.4 BPD or something else? =============== */
const DF_TRIG=[.07,.16,.21,.33,.45,.52,.61,.74,.83,.92],DF_DEP=[.36,.3,.42,.26,.4,.34,.3,.38,.28,.35];
const dfSpike=(d,r,fa)=>d<=0?0:(1-Math.exp(-d/r))*Math.exp(-d/fa);
const DF_SPK=(()=>{let m=0;for(let i=1;i<400;i++){m=Math.max(m,dfSpike(i/400*.03,.0012,.0035))}return m})();
const dfSm=(u,a,b)=>{const x=clamp((u-a)/(b-a));return x*x*(3-2*x)};
const DF_P=[
 {id:'bpd',n:'BPD',c:'var(--storm)',
  f:u=>{let v=.5;DF_TRIG.forEach((t,i)=>{v-=DF_DEP[i]*dfSpike(u-t,.0012,.0035)/DF_SPK});return v},
  day:u=>{const g=moodF({t0:.22,base:0,peak:1,rise:.025,fall:.2});return .5-.36*g(u)},
  self:u=>{let k=0;DF_TRIG.forEach(t=>{if(u>t)k++});const hi=[0,2,3,5,7,8].indexOf(k)>=0;return hi?.78:.28},
  imp:DF_TRIG.filter((_,i)=>i%2===0).map(t=>t+.006),
  key:['Time scale: hours, rarely days','Trigger: interpersonal (perceived rejection)','Self-concept: alternating']},
 {id:'bip',n:'Bipolar II',c:'var(--dx)',
  f:u=>.5+.32*(dfSm(u,.1,.13)-dfSm(u,.23,.26))-.32*(dfSm(u,.4,.45)-dfSm(u,.82,.88)),
  day:u=>.8+.015*Math.sin(u*20),
  key:['Time scale: days to weeks','Trigger: can occur regardless of events','Family history of bipolar: a key clue']},
 {id:'cptsd',n:'Complex PTSD',c:'var(--hpa)',
  f:u=>.34+.035*Math.sin(u*31)+.02*Math.sin(u*83+1),
  day:u=>.34+.02*Math.sin(u*9),
  self:u=>.2,
  key:['Time scale: chronic and pervasive','History: usually sustained or multiple trauma','Self-concept: stably negative']},
 {id:'adhd',n:'ADHD',c:'var(--accent)',
  f:u=>.5+.07*Math.sin(u*190)+.05*Math.sin(u*71+2)+.03*Math.sin(u*330),
  day:u=>.5+.07*Math.sin(u*40)+.04*Math.sin(u*97),
  imp:[.04,.1,.15,.23,.29,.36,.41,.49,.56,.62,.68,.75,.81,.88,.94],
  key:['Time scale: everyday, smaller swings','Impulsivity: more motor, less tied to stress','Emotion dysregulation: less than in BPD']},
 {id:'dep',n:'Depression',c:'var(--mood)',
  f:u=>.5-.27*(dfSm(u,.06,.16)-dfSm(u,.84,.96)*.55)+.012*Math.sin(u*60),
  day:u=>.23+.01*Math.sin(u*12),
  key:['Time scale: a sustained low','Sudden anger: rare','Co-occurs in most inpatients with BPD']}
];
const DF_STEPS=[
 {from:0,at:.18,k:'Profile 1 · BPD',t:'Hours, after a hurt',
  txt:`In BPD, affective instability comes from marked reactivity of mood: intense dysphoria, irritability or anxiety "usually lasting a few hours and only rarely more than a few days". <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup> The shifts are transient and follow interpersonal stressors such as perceived rejection. <sup class="c" data-ref="Paris2015,Sharan2023" title="Source 401,473">401,473</sup> Affective instability is the most sensitive criterion (92.8%) but is transdiagnostic, so on its own it separates BPD from bipolar disorder poorly. <sup class="c" data-ref="Zimmerman2017BJP,Bayes2020" title="Source 44,607">44,607</sup>`,
  pt:`Moods in BPD can swing several times a week, often after a hurt in a relationship, and settle within hours.`,
  hook:`BPD mood shifts last hours and are reactive: ask what happened just before.`},
 {from:.2,at:.38,k:'Profile 2 · Bipolar II',t:'Days to weeks, with or without a trigger',
  txt:`Bipolar disorder involves sustained mood changes: episodes that last days to weeks and can occur regardless of external events. <sup class="c" data-ref="Paris2015,Sharan2023" title="Source 401,473">401,473</sup> The two share mood lability and impulsivity but differ on other validators: childhood sexual abuse, family history of bipolar disorder, self-harm, treatment response and neurobiology. <sup class="c" data-ref="Ghaemi2014" title="Source 175">175</sup> Personality items alone classified 81–84% of people correctly, rising to 92–95% when hypo/manic features were added. <sup class="c" data-ref="Bayes2016" title="Source 42">42</sup>`,
  pt:`In bipolar disorder, a high or low mood settles in and stays for days or weeks.`,
  hook:`Hours (BPD) or days to weeks (bipolar)? A family history of bipolar disorder favours bipolar. <sup class="c" data-ref="Bayes2016" title="Source 42">42</sup>`},
 {from:.4,at:.58,k:'Profile 3 · Complex PTSD',t:'A steady negative self',
  txt:`ICD-11 complex PTSD adds chronic, pervasive disturbances in emotion regulation, self-concept and relationships to the core PTSD symptoms, usually after sustained or multiple trauma. <sup class="c" data-ref="Maercker2022" title="Source 327">327</sup> The self-concept differs: stably negative in complex PTSD, alternating and unstable in BPD (dashed lines). <sup class="c" data-ref="Frost2020" title="Source 172">172</sup> Abandonment fears, unstable self, unstable relationships and impulsiveness each raised the odds of BPD over complex PTSD. <sup class="c" data-ref="Cloitre2014" title="Source 105">105</sup> Both can be diagnosed together.`,
  pt:`In complex PTSD, people often feel steadily bad about themselves. In BPD, the sense of self tends to flip.`,
  hook:`Cloitre's four BPD discriminators: abandonment fears, unstable self, unstable relationships, impulsiveness.`},
 {from:.6,at:.78,k:'Profile 4 · ADHD',t:'Restless, not reactive',
  txt:`ADHD and BPD share impulsivity and emotion dysregulation. Impulsivity in BPD is stress-dependent and linked to poor use of context cues for inhibition, while ADHD shows more motor impulsivity (tick marks). Emotion dysregulation rises from ADHD to BPD to the two combined. <sup class="c" data-ref="Ditrich2021" title="Source 129">129</sup> Lifetime ADHD was found in 27.9% of adult and 22.1% of adolescent inpatients with BPD. <sup class="c" data-ref="Zanarini2021Comorbidity" title="Source 599">599</sup>`,
  pt:`In ADHD, acting fast and restlessness show up most days, stressed or not. In BPD, impulsive acts cluster after emotional storms.`,
  hook:`BPD impulsivity is stress-dependent; ADHD impulsivity is more motor.`},
 {from:.8,at:.98,k:'Profile 5 · Depression',t:'Low and lasting',
  txt:`Major depression is the commonest co-occurring condition: lifetime in 86.6% of adult and 75.0% of adolescent inpatients with BPD. <sup class="c" data-ref="Zanarini2021Comorbidity" title="Source 599">599</sup> One guideline gives bedside cues: sudden anger is rare in depression, and in BPD mistrust comes with anger rather than resignation. <sup class="c" data-ref="Sharan2023" title="Source 473">473</sup> Depression-related social disability often persists even after BPD symptoms remit. <sup class="c" data-ref="Gunderson2018" title="Source 207">207</sup>`,
  pt:`Depression is a long low. BPD and depression often come together, and each needs attention.`,
  hook:`Depression with BPD is the rule, not the exception: treat both.`}
];
const DF_NONE='<span class="df-none">—</span>';
const DF_ROWS=[
 {id:'time',n:'Mood time scale',sh:[0,1,2,3,4],
  c:[`Reactive shifts usually lasting a few hours, rarely more than a few days <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>`,`Sustained episodes of days to weeks; can occur regardless of events <sup class="c" data-ref="Paris2015,Sharan2023" title="Source 401,473">401,473</sup>`,`Chronic, pervasive disturbance in emotion regulation <sup class="c" data-ref="Maercker2022" title="Source 327">327</sup>`,`Emotion dysregulation present but less than in BPD; most with both <sup class="c" data-ref="Ditrich2021" title="Source 129">129</sup>`,DF_NONE,DF_NONE],
  out:`Overlaying all five traces on one axis: only BPD has sharp dips lasting hours. Watch the one-day zoom.`},
 {id:'self',n:'Identity and self-concept',sh:[0,2],
  c:[`Alternating, unstable self-concept; identity disturbance is one of the most central criteria <sup class="c" data-ref="Frost2020,Peters2023" title="Source 172,410">172,410</sup>`,`Identity disturbance (with abandonment fears) separates BPD from bipolar disorder best <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup>`,`Stably negative self-concept, its most distinctive feature <sup class="c" data-ref="Frost2020" title="Source 172">172</sup>`,DF_NONE,DF_NONE,`Identity disruption much lower than in BPD (d = −1.36) <sup class="c" data-ref="Barnicot2026" title="Source 29">29</sup>`],
  out:`Dashed lines show self-concept: BPD flips between positive and negative, complex PTSD stays low.`},
 {id:'aband',n:'Fear of abandonment',sh:[0,1],
  c:[`Criterion 1; highest specificity and PPV (0.90) against bipolar disorder <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup>`,`Abandonment fears best separate BPD from bipolar disorder <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup>`,`Frantic efforts to avoid abandonment raised the odds of BPD over complex PTSD <sup class="c" data-ref="Cloitre2014" title="Source 105">105</sup>`,DF_NONE,DF_NONE,`Coping with being alone was one of five separating features <sup class="c" data-ref="Barnicot2026" title="Source 29">29</sup>`],
  out:`The triangles mark interpersonal triggers such as perceived rejection: BPD dips follow them; bipolar episodes do not.`},
 {id:'trauma',n:'Trauma history',sh:[0,2],
  c:[`PTSD common but not universal: 30.2% in a US population sample <sup class="c" data-ref="Pagura2010PTSD,Zanarini1998AxisI" title="Source 396,569">396,569</sup>`,`Childhood sexual abuse predicted BPD rather than bipolar disorder <sup class="c" data-ref="Bayes2016" title="Source 42">42</sup>`,`Usually follows sustained or multiple trauma exposure <sup class="c" data-ref="Maercker2022" title="Source 327">327</sup>`,`In women with BPD, childhood ADHD went with childhood emotional abuse <sup class="c" data-ref="Philipsen2008" title="Source 413">413</sup>`,DF_NONE,DF_NONE],
  out:`Complex PTSD usually follows sustained or multiple trauma; in BPD, PTSD is common but not universal.`},
 {id:'imp',n:'Impulsivity',sh:[0,3],
  c:[`Stress-dependent, with poor use of context cues for inhibition <sup class="c" data-ref="Ditrich2021" title="Source 129">129</sup>`,`Shared with BPD; separates the two poorly <sup class="c" data-ref="Ghaemi2014,Bayes2019" title="Source 43,175">43,175</sup>`,`Impulsiveness raised the odds of BPD over complex PTSD <sup class="c" data-ref="Cloitre2014" title="Source 105">105</sup>`,`More motor impulsivity <sup class="c" data-ref="Ditrich2021" title="Source 129">129</sup>`,DF_NONE,`Impulsivity was one of five separating features <sup class="c" data-ref="Barnicot2026" title="Source 29">29</sup>`],
  out:`Tick marks are impulsive acts: in BPD they cluster after triggers, in ADHD they are spread through ordinary days.`},
 {id:'anger',n:'Anger and mistrust',sh:[0,4],
  c:[`Criterion 8; mistrust comes with anger rather than resignation <sup class="c" data-ref="Sharan2023" title="Source 473">473</sup>`,DF_NONE,DF_NONE,DF_NONE,`Sudden anger is rare <sup class="c" data-ref="Sharan2023" title="Source 473">473</sup>`,DF_NONE],
  out:`BPD and depression together: sharp reactive dips against a sustained low.`},
 {id:'fam',n:'Family history',sh:[0,1],
  c:[`No family history of bipolar disorder predicted BPD over bipolar disorder <sup class="c" data-ref="Bayes2016" title="Source 42">42</sup>`,`Family history is a key differentiator for bipolar II <sup class="c" data-ref="Bayes2019,Ghaemi2014" title="Source 43,175">43,175</sup>`,DF_NONE,DF_NONE,DF_NONE,DF_NONE],
  out:`BPD and bipolar II on one axis: the question "does bipolar disorder run in the family?" is one of the strongest separators.`},
 {id:'meds',n:'Response to mood stabilisers',sh:[0,1],
  c:[`Very low-certainty evidence: no effect on BPD severity (SMD −0.07); lamotrigine no better than placebo in LABILE <sup class="c" data-ref="StoffersWinterling2022,Crawford2018LABILE" title="Source 109,512">109,512</sup>`,`Misdiagnosis can deprive a person of effective medication for bipolar disorder <sup class="c" data-ref="Paris2015" title="Source 401">401</sup>; treatment response differs <sup class="c" data-ref="Ghaemi2014" title="Source 175">175</sup>`,DF_NONE,DF_NONE,DF_NONE,DF_NONE],
  out:`No medication is approved for BPD itself; mood stabilisers did not improve overall BPD severity in trials. See Medication: the evidence.`},
 {id:'sens',n:'Sensory processing',sh:[],
  c:[DF_NONE,DF_NONE,DF_NONE,DF_NONE,DF_NONE,`Sensory differences were the largest feature favouring autism (d = 1.19) <sup class="c" data-ref="Barnicot2026" title="Source 29">29</sup>`],
  out:`Sensory processing is not a mood trace, so the stage does not change: it is the strongest clue toward autism in women assessed for BPD.`}
];
const DF_CO=[['Any anxiety disorder',89.0,60.6],['Major depression',86.6,75.0],['Complex comorbidity',76.6,40.4],['Substance use disorder',62.1,35.6],['Eating disorder',53.8,30.8],['PTSD',53.3,22.1],['ADHD',27.9,22.1],['Bipolar II',5.5,3.8]];
inits.differential=()=>{
  const svg=$('#dfSvg'),rg=$('#dfT'),note=$('#dfNote');let stopF=null,mode='one',focus=null,fprog=1,setA=()=>{},lastP=-1;
  function plot(x,y,w,h,f,up,col,o={}){const N=o.N||900,n=Math.max(2,Math.round(N*up));let d='';
    for(let i=0;i<=n;i++){const u=up*i/n,v=clamp(f(u),-.02,1.02);d+=(i?'L':'M')+f1(x+w*u)+' '+f1(y+h*(1-v))}
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${o.sw||2.3};stroke-linejoin:round;stroke-linecap:round;opacity:${o.op==null?1:o.op}${o.dash?';stroke-dasharray:5 4':''}"/>`}
  function draw(t){
    const N=vb(svg,'720 380','400 540'),P=phaseOf(DF_STEPS,t),cur=DF_P[P];
    if(P!==lastP){lastP=P;setA(P);if(!focus)note.innerHTML=noteHTML(DF_STEPS[P])}
    const C=N?{x:40,y:46,w:348,h:200,ax:262,ix:40,iy:340,iw:348,ih:88,kx:16,ky:470}:{x:62,y:44,w:640,h:180,ax:236,ix:62,iy:296,iw:290,ih:68,kx:380,ky:290};
    const up=clamp(ramp(t,P*.2+.005,P*.2+.17));
    let show=[P];if(focus)show=focus.sh.length?focus.sh:[P];else if(mode==='all')show=[0,1,2,3,4].filter(k=>k<=P);
    let s='';
    const ttl=focus?focus.n:mode==='all'&&P>0?'Overlay: '+show.map(k=>DF_P[k].n).join(' · '):cur.n;
    s+=`<text x="${N?16:20}" y="22" class="t-sm" style="fill:var(--dx)">${(N&&ttl.length>40?ttl.slice(0,40)+'…':ttl).toUpperCase()}</text><text x="${N?384:700}" y="22" class="t-xs t-end">mood, 8 weeks · schematic</text>`;
    /* chart frame */
    s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    const my=C.y+C.h*.5;s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${my}" y2="${my}" style="stroke:var(--calm);stroke-width:1.2;stroke-dasharray:1 4"/>`;
    [['elevated',.92],['baseline',.5],['low',.08]].forEach(([l,v])=>{s+=`<text x="${C.x-6}" y="${f1(C.y+C.h*(1-v)+3)}" class="t-xs t-end" style="${N?'font-size:8px':''}">${N&&l==='baseline'?'base':l}</text>`});
    for(let w=1;w<8;w++){const x=C.x+C.w*w/8;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${C.y}" y2="${C.y+C.h}" class="grid"/>`}
    const TL=tline(C.x,C.ax,C.w,{min:0,max:8,step:1,label:'weeks'});s+=TL.svg;
    /* triggers (BPD shown) */
    const bpdOn=show.indexOf(0)>=0,hiT=focus&&(focus.id==='aband'||focus.id==='time');
    if(bpdOn)DF_TRIG.forEach(tr=>{const x=C.x+C.w*tr,vis=(show.length===1&&!focus?up:1)>=tr;if(!vis)return;s+=`<path d="M${f1(x-5)} ${C.y+2}L${f1(x+5)} ${C.y+2}L${f1(x)} ${C.y+10}Z" style="fill:var(--bond);opacity:${hiT?1:.75}"/>`});
    if(bpdOn)s+=`<text x="${C.x+C.w-4}" y="${C.y-4}" class="t-xs t-end" style="fill:var(--bond)">▼ interpersonal trigger</text>`;
    if(show.indexOf(1)>=0&&!N)s+=`<text x="${f1(C.x+C.w*.175)}" y="${f1(C.y+C.h*(1-.86))}" class="t-xs t-mid" style="fill:var(--dx)">episode: days</text><text x="${f1(C.x+C.w*.63)}" y="${f1(C.y+C.h*(1-.3))}" class="t-xs t-mid" style="fill:var(--dx)">episode: weeks</text>`;
    /* traces */
    show.forEach(k=>{const p=DF_P[k],isCur=k===P||!!focus,u=focus?fprog:(mode==='all'&&k<P)?1:up;
      s+=plot(C.x,C.y,C.w,C.h,p.f,u,p.c,{op:isCur?1:.45,sw:isCur?2.4:1.6});
      const showSelf=(focus&&focus.id==='self')||(!focus&&k===P&&(k===2));
      if(p.self&&(showSelf||(focus&&focus.id==='self')))s+=plot(C.x,C.y,C.w,C.h,p.self,u,p.c,{dash:true,sw:1.6,op:.85,N:600});
      const showImp=(focus&&focus.id==='imp')||(!focus&&k===P&&k===3);
      if(p.imp&&showImp)p.imp.forEach(ti=>{if(ti>u)return;const x=C.x+C.w*ti;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${C.y+C.h-16}" y2="${C.y+C.h-4}" style="stroke:${p.c};stroke-width:2.4;stroke-linecap:round"/>`});
      if(u<1&&isCur){const v=clamp(p.f(u),-.02,1.02);s+=`<circle cx="${f1(C.x+C.w*u)}" cy="${f1(C.y+C.h*(1-v))}" r="5" style="fill:${p.c};stroke:var(--panel);stroke-width:2"/>`}});
    if(!focus&&P===2&&show.indexOf(0)<0)s+=plot(C.x,C.y,C.w,C.h,DF_P[0].self,up,DF_P[0].c,{dash:true,sw:1.4,op:.6,N:600});
    if((focus&&focus.id==='self')||(!focus&&P===2))s+=`<text x="${C.x+6}" y="${C.y+C.h-8}" class="t-xs" style="fill:var(--ink)">- - - self-concept</text>`;
    if((focus&&focus.id==='imp')||(!focus&&P===3))s+=`<text x="${C.x+C.w-6}" y="${C.y+C.h-20}" class="t-xs t-end" style="fill:var(--ink)">| impulsive act</text>`;
    if(focus&&focus.id==='trauma'){s+=`<text x="${C.x+6}" y="${C.y+16}" class="t-xs" style="fill:var(--hpa);font-weight:700">complex PTSD: usually after sustained or multiple trauma</text><text x="${C.x+6}" y="${C.y+29}" class="t-xs" style="fill:var(--storm);font-weight:700">BPD: PTSD in about 3 in 10</text>`}
    /* legend for overlays */
    if(show.length>1){let lx=C.x,ly=C.ax+(N?30:28);show.forEach(k=>{const p=DF_P[k],wd=p.n.length*6+30;if(lx+wd>C.x+C.w){lx=C.x;ly+=14}s+=`<line x1="${lx}" x2="${lx+16}" y1="${ly}" y2="${ly}" style="stroke:${p.c};stroke-width:3"/><text x="${lx+20}" y="${ly+3}" class="t-xs" style="fill:var(--ink)">${p.n}</text>`;lx+=wd})}
    /* inset: one day */
    const zs=focus?show:[P];
    s+=`<rect x="${C.ix}" y="${C.iy}" width="${C.iw}" height="${C.ih}" rx="8" style="fill:var(--panel);stroke:var(--line)"/><text x="${C.ix+8}" y="${C.iy-6}" class="t-xs" style="fill:var(--ink);font-weight:700">ZOOM: ONE DAY (24 h)</text>`;
    s+=`<line x1="${C.ix+6}" x2="${C.ix+C.iw-6}" y1="${C.iy+C.ih*.5}" y2="${C.iy+C.ih*.5}" style="stroke:var(--calm);stroke-width:1;stroke-dasharray:1 4"/>`;
    zs.forEach(k=>{const p=DF_P[k];s+=plot(C.ix+6,C.iy+6,C.iw-12,C.ih-12,p.day,focus?1:clamp(up*1.6),p.c,{N:240,sw:2.2})});
    [0,6,12,18,24].forEach(h=>{s+=`<text x="${f1(C.ix+6+(C.iw-12)*h/24)}" y="${C.iy+C.ih+13}" class="t-xs t-mid">${h}h</text>`});
    const inT=zs.indexOf(0)>=0?'BPD: one dip, back within hours':zs.indexOf(1)>=0?'inside an episode: shifted all day':'little change within one day';
    s+=`<text x="${C.ix+C.iw-8}" y="${C.iy+14}" class="t-xs t-end" style="fill:var(--ink)">${inT}</text>`;
    /* key box */
    if(!focus){const K=cur.key,kx=C.kx,ky=C.ky;s+=`<text x="${kx}" y="${ky+(N?0:6)}" class="t-sm" style="fill:${cur.c}">${cur.n.toUpperCase()} · CLUES</text>`;
      K.forEach((l,i)=>{s+=`<circle cx="${kx+5}" cy="${ky+(N?20:26)+i*20-4}" r="3" style="fill:${cur.c}"/><text x="${kx+14}" y="${ky+(N?20:26)+i*20}" class="t-sm" style="fill:var(--ink)">${l}</text>`})}
    else{const kx=C.kx,ky=C.ky;s+=`<text x="${kx}" y="${ky+(N?0:6)}" class="t-sm" style="fill:var(--warn)">FEATURE · ${focus.n.toUpperCase()}</text><text x="${kx}" y="${ky+(N?20:26)}" class="t-xs">Press a profile step to leave the feature view.</text>`}
    svg.innerHTML=s;
  }
  const stop=playWire(rg,$('#dfPlay'),draw,22000,'Replay','differential');
  const setStep=stepWire($('#dfSteps'),DF_STEPS,rg,draw,stop);
  setA=i=>{setStep(i)};
  const clearFocus=()=>{if(!focus)return;focus=null;fprog=1;lastP=-1;$$('[data-dfr]').forEach(b=>b.setAttribute('aria-pressed','false'));$$('#dfTbl tr').forEach(r=>r.classList.remove('on'));$('#dfOut').innerHTML=DF_OUT0};
  $('#dfSteps').addEventListener('click',()=>{if(focus){clearFocus();draw(+rg.value)}},true);
  rg.addEventListener('input',()=>{if(focus){clearFocus();draw(+rg.value)}},true);
  $('#dfPlay').addEventListener('click',()=>{if(stopF){stopF();stopF=null}fprog=1;clearFocus()},true);
  $$('[data-dfm]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.dfm;$$('[data-dfm]').forEach(x=>x.setAttribute('aria-pressed',x===b));clearFocus();draw(+rg.value)}));
  /* matrix */
  const tb=$('#dfTbl'),out=$('#dfOut');const DF_OUT0=`Pick a feature in the first column. The traces above switch to the conditions it separates.`;
  tb.innerHTML=DF_ROWS.map((r,i)=>`<tr data-r="${i}"><th><button data-dfr="${i}" aria-pressed="false">${r.n}<small>${r.sh.length?'show in traces':'no trace'}</small></button></th>${r.c.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('');
  out.innerHTML=DF_OUT0;
  tb.addEventListener('click',e=>{const b=e.target.closest('[data-dfr]');if(!b)return;const i=+b.dataset.dfr,r=DF_ROWS[i];
    stop();if(stopF)stopF();focus=r;
    $$('[data-dfr]',tb).forEach(x=>x.setAttribute('aria-pressed',x===b));$$('tr',tb).forEach(x=>x.classList.toggle('on',+x.dataset.r===i));
    out.innerHTML=`<b>${r.n}.</b> ${r.out}${r.id==='meds'?` <a href="#meds" data-go="meds">Medication: the evidence</a>.`:''}`;
    const P=r.sh.length?r.sh[r.sh.length-1]:phaseOf(DF_STEPS,+rg.value);
    note.innerHTML=noteHTML({k:'Feature view',t:r.n,txt:DF_STEPS[r.sh.length?r.sh[0]:P].txt,pt:`One feature rarely decides a diagnosis on its own. Clinicians weigh the whole pattern over time.`});
    /* animate the relevant curves sweeping in */
    const keep=focus;stopF=animate(1600,p=>{if(focus!==keep)return;fprog=Math.max(.002,p);draw(+rg.value)},()=>{stopF=null;fprog=1;if(focus===keep)draw(+rg.value)});
  });
  draw(+rg.value);

  /* co-occurrence bars */
  const cs=$('#dfCoSvg');let ag=0,shown=DF_CO.map(r=>r[1]),stopC=null;
  function drawCo(){const N=vb(cs,'720 300','400 420');let s='';
    const L=N?{lx:12,bx:12,bw:330,y0:30,rh:48,lab:'below'}:{lx:190,bx:200,bw:440,y0:30,rh:32};
    s+=`<text x="${N?12:20}" y="16" class="t-sm" style="fill:var(--dx)">${ag?'ADOLESCENT':'ADULT'} INPATIENTS WITH BPD · LIFETIME %</text>`;
    DF_CO.forEach((r,i)=>{const v=shown[i],y=L.y0+i*L.rh,by=N?y+16:y,hi=i===2;
      s+=N?`<text x="${L.lx}" y="${y+10}" class="t-sm" style="fill:var(--ink)">${r[0]}</text>`:`<text x="${L.lx}" y="${by+14}" class="t-sm t-end" style="fill:var(--ink)">${r[0]}</text>`;
      s+=`<rect x="${L.bx}" y="${by+3}" width="${L.bw}" height="16" rx="5" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${by+3}" width="${f1(L.bw*v/100)}" height="16" rx="5" style="fill:${hi?'var(--gold)':'var(--dx)'}"/>`;
      s+=`<text x="${f1(L.bx+L.bw*v/100+6)}" y="${by+15}" class="t-sm" style="fill:var(--ink);font-weight:700">${v.toFixed(1)}%</text>`});
    if(!N)s+=`<text x="${L.bx}" y="${L.y0+8*L.rh+8}" class="t-xs" style="fill:var(--gold)">complex comorbidity = a disorder of affect plus a disorder of impulse</text>`;
    else s+=`<text x="12" y="${L.y0+8*L.rh+6}" class="t-xs" style="fill:var(--gold)">complex comorbidity: affect + impulse disorder</text>`;
    cs.innerHTML=s}
  $$('[data-dfa]').forEach(b=>b.addEventListener('click',()=>{ag=+b.dataset.dfa;$$('[data-dfa]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const from=shown.slice(),to=DF_CO.map(r=>r[1+ag]);if(stopC)stopC();stopC=animate(700,p=>{const e=ease(p);shown=from.map((v,i)=>lerp(v,to[i],e));drawCo()},()=>{stopC=null})}));
  drawCo();
  const prevR=redraws.differential;redraws.differential=()=>{prevR&&prevR();drawCo()};
};
/* =============== 3.1 dialectical behaviour therapy =============== */
const DB_PROG={
 std:{W:52,n:'Standard DBT',short:'12 months',
  end:{k:'Week 52 · end of the year',t:'What a year of DBT showed',
   txt:`In the first trial, a year of DBT meant fewer and less medically severe parasuicidal acts, more people staying in therapy and fewer inpatient days than usual care. <sup class="c" data-ref="Linehan1991" title="Source 309">309</sup> Against expert community therapists, people in DBT were "half as likely to make a suicide attempt" over 2 years (hazard ratio 2.66), with fewer hospital admissions and lower dropout. <sup class="c" data-ref="Linehan2006" title="Source 310">310</sup> Against general psychiatric management, both improved and no outcome differed. <sup class="c" data-ref="McMain2009" title="Source 338">338</sup> Two years later, about two-thirds were in diagnostic remission. <sup class="c" data-ref="McMain2012" title="Source 339">339</sup> These are group results from trials, not a promise for one person.`,
   pt:`After a year, many people self-harm less, go to hospital less and stay in treatment. Other well-organised care can help as much.`,
   hook:`Linehan 2006: DBT vs expert therapy, suicide attempts HR 2.66, dropout HR 3.2. <sup class="c" data-ref="Linehan2006" title="Source 310">310</sup>`}},
 six:{W:26,n:'6-month DBT',short:'6 months',
  end:{k:'Week 26 · end of treatment',t:'Is 6 months enough?',
   txt:`McMain 2022 randomised 240 suicidal or self-harming people with BPD (mean age 28; 79% female) to 6 or 12 months of comprehensive DBT. Six months was non-inferior for total self-harm at 6, 12 and 24 months, gave faster falls in BPD symptoms and general psychopathology, and dropout did not differ. <sup class="c" data-ref="McMain2022" title="Source 341">341</sup> NICE CG78 still advises against BPD-specific interventions shorter than 3 months outside a structured service. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
   pt:`In one large trial, half a year of DBT worked as well as a full year for self-harm.`,
   hook:`McMain 2022: DBT-6 non-inferior to DBT-12 for self-harm up to 24 months. <sup class="c" data-ref="McMain2022" title="Source 341">341</sup>`}},
 ado:{W:19,n:'DBT-A',short:'19 weeks',
  end:{k:'Week 19 · end of treatment',t:'What DBT-A showed',
   txt:`In Mehlum 2014, 77 adolescents with recent, repeated self-harm received 19 weeks of DBT-A or enhanced usual care; DBT-A reduced self-harm, suicidal ideation and depressive symptoms more. <sup class="c" data-ref="Mehlum2014" title="Source 345">345</sup> At 1 year it stayed ahead for self-harm frequency <sup class="c" data-ref="Mehlum2016" title="Source 346">346</sup>; at 12.4 years self-harm episodes were more than twice as common after usual care, a difference that was not statistically significant at the last follow-up. <sup class="c" data-ref="Mehlum2026" title="Source 347">347</sup> In McCauley 2018 (173 adolescents, 6 months), 90.3% with DBT made no suicide attempt against 78.9% with supportive therapy. <sup class="c" data-ref="McCauley2018" title="Source 335">335</sup>`,
   pt:`Teenagers who self-harmed did so less after a few months of DBT for adolescents than with usual care.`,
   hook:`McCauley 2018: no suicide attempt 90.3% vs 78.9% (OR 0.30); completion 75.6% vs 55.2%. <sup class="c" data-ref="McCauley2018" title="Source 335">335</sup>`}}
};
function dbSteps(p){const P=DB_PROG[p];return [
 {from:0,at:.015,k:'Before week 1',t:'Orientation and commitment',
  txt:`DBT starts with orientation and a commitment to reducing life-threatening behaviour. Its risk-management toolkit is the diary card, chain analysis, solution analysis, phone coaching and the consultation team. <sup class="c" data-ref="Alba2022DBT" title="Source 4">4</sup> Any version of DBT must serve five functions: building capabilities, generalising them to daily life, improving motivation and reducing dysfunctional behaviour, keeping therapists capable and motivated, and structuring the environment. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`,
  pt:`At the start you and your therapist agree on goals and on what therapy will work on first.`,
  hook:`DBT's five functions: enhance capabilities, generalise them, improve motivation, support the therapist, structure the environment. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`},
 {from:.06,at:.1,k:'Every week',t:'Four modes, running together',
  txt:`Standard DBT runs weekly individual therapy (about 1 hour), a weekly skills group (about 1.5–2.5 hours, usually 4 to 10 members) and a weekly consultation team for the therapists (about 1–2 hours). Between sessions the individual therapist can be phoned for coaching, to help the person use skills when they are most needed, for example in a crisis: this serves the "generalisation" function. <sup class="c" data-ref="Chapman2006DBT,LinehanWilks2015" title="Source 99,312">99,312</sup>`,
  pt:`Each week there is one-to-one therapy and a skills class, and you can call your therapist for quick coaching between sessions.`,
  hook:`Four modes: individual therapy, skills group, phone coaching, therapist consultation team. <sup class="c" data-ref="LinehanWilks2015" title="Source 312">312</sup>`},
 {from:.18,at:.22,k:'Each session',t:'The target hierarchy',
  txt:`Each week the person fills in a diary card tracking targets such as self-harm, suicide attempts and emotional misery; the therapist uses it to set the agenda. Session time goes first to behaviours that threaten life, then to behaviours that interfere with therapy (missed sessions, lateness, non-collaboration), then to behaviours that interfere with quality of life. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> Watch the ladder: the highest step present comes first.`,
  pt:`Safety comes first in every session, then anything that gets in the way of therapy, then the rest of life.`,
  hook:`DBT target priority: life-threatening → therapy-interfering → quality-of-life-interfering. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`},
 {from:.38,at:.5,k:'In the skills group',t:'Four skills modules',
  txt:`The group teaches four skills areas: mindfulness (attention to the present moment), distress tolerance (surviving crises without making things worse), emotion regulation and interpersonal effectiveness. Sessions combine teaching, practice, discussion and homework. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> In a component trial, the arms that included skills training reduced non-suicidal self-injury more than DBT without skills. <sup class="c" data-ref="Linehan2015" title="Source 311">311</sup>`,
  pt:`The skills class teaches four things: staying present, getting through a crisis, handling strong feelings and asking for what you need.`,
  hook:`Linehan 2015: skills training drives the extra drop in non-suicidal self-injury; dropout 24% with standard DBT vs 48% without skills. <sup class="c" data-ref="Linehan2015" title="Source 311">311</sup>`},
 {from:.58,at:.66,k:'When something happens',t:'Chain analysis and coaching',
  txt:`When a target behaviour happens, therapist and patient map the chain that led to it and the consequences that may keep it going, then look for more skilful alternatives. <sup class="c" data-ref="Chapman2006DBT,Lynch2006DBT" title="Source 99,324">99,324</sup> Lynch and colleagues distil DBT's proposed mechanism to "the reduction of ineffective action tendencies linked with dysregulated emotions". <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Lynch2006DBT" title="Source 324">324</sup> Build a chain yourself below.`,
  pt:`After a hard moment, you trace step by step what led there, and find the point where a skill could have changed the ending.`,
  hook:`Chain analysis = vulnerability → prompting event → links → behaviour → consequences, then solution analysis. <sup class="c" data-ref="Chapman2006DBT,Alba2022DBT" title="Source 4,99">4,99</sup>`},
 Object.assign({from:.86,at:1},P.end)
]}
const DB_CHAIN=[
 {n:'Vulnerability',ex:['slept 4 hours,','skipped meals'],sk:'Emotion regulation',do:['look after sleep and food','to lower vulnerability'],
  txt:`The chain often starts before the trigger: poor sleep, hunger, illness or stress make emotions easier to set off. Emotion regulation is one of the four skills modules. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> Changing the earliest link makes every later link weaker.`,
  pt:`A tired, hungry body reacts faster. Looking after basics is a real skill, not a small thing.`},
 {n:'Prompting event',ex:['a friend','cancels by text'],sk:'Interpersonal effectiveness',do:['ask what happened,','say what you need'],
  txt:`The prompting event is often interpersonal. Interpersonal effectiveness is the skills module for asking for what you need in relationships. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> In daily life, rejection is followed by hostility and sadness more strongly in BPD. <sup class="c" data-ref="Hepp2018" title="Source 217">217</sup>`,
  pt:`Checking what the message meant, and asking for what you need, can change what happens next.`},
 {n:'Thoughts',ex:['"they don\'t','want me around"'],sk:'Mindfulness',do:['notice the thought','as a thought'],
  txt:`Mindfulness, attention to the present moment, is one of the four skills areas and one of DBT's essential acceptance-based elements. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> Noticing an interpretation as an interpretation leaves room before acting on it.`,
  pt:`A thought is not a fact. Seeing it as "just a thought" can slow everything down.`},
 {n:'Emotions',ex:['shame, fear,','anger'],sk:'Emotion regulation',do:['name the emotion,','let it rise and fall'],
  txt:`Not being able to name emotions was linked to distress in BPD in daily life. <sup class="c" data-ref="EbnerPriemer2008" title="Source 140">140</sup> DBT keeps a focus on emotions and the biosocial theory at its core, and emotion regulation is taught in the group. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> See <a href="#emotion" data-go="emotion">The emotion wave</a>.`,
  pt:`Putting a name to the feeling is the first step to riding it out.`},
 {n:'Urge',ex:['urge to act','on it, now'],sk:'Distress tolerance',do:['get through the peak','without making it worse'],
  txt:`Distress tolerance is the module for surviving crises without making things worse. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> Urges build and then pass: in one study most thoughts of self-injury lasted 1–30 minutes. <sup class="c" data-ref="Nock2009" title="Source 389">389</sup> Phone coaching exists for exactly this moment. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`,
  pt:`An urge is a wave too. It peaks and passes, often within minutes, and a call for coaching can help get through it.`},
 {n:'Behaviour',ex:['the target','behaviour','(kept abstract)'],sk:'Phone coaching',do:['call for skills','coaching instead'],
  txt:`Between sessions the individual therapist is available by phone to help apply skills when they are most needed, for example in a crisis. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> Skills training arms in the component trial reduced non-suicidal self-injury more than DBT without skills. <sup class="c" data-ref="Linehan2015" title="Source 311">311</sup>`,
  pt:`At the moment of acting, reaching out for coaching is itself the skilful behaviour.`},
 {n:'Consequences',ex:['brief relief,','then shame;','friend upset'],sk:'Solution analysis',do:['change what keeps','the chain going'],
  txt:`Chain analysis also asks which consequences may be maintaining the behaviour; solution analysis then finds more skilful alternatives. <sup class="c" data-ref="Chapman2006DBT,Alba2022DBT" title="Source 4,99">4,99</sup> Short-term relief can reinforce a behaviour even when negative emotion rises again in the following hours. <sup class="c" data-ref="Klonsky2007,Houben2017" title="Source 232,271">232,271</sup>`,
  pt:`Quick relief can keep a habit going. Seeing that clearly, without blame, is how the next chain gets shorter.`}
];
const DB_FLIPS=[
 ['Skills module','Mindfulness','Attention to the present moment. One of DBT\'s essential elements, with acceptance-oriented interventions. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>'],
 ['Skills module','Distress tolerance','Surviving crises without making things worse. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>'],
 ['Skills module','Emotion regulation','Handling strong feelings: one of the four areas taught in the weekly skills group. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>'],
 ['Skills module','Interpersonal effectiveness','Asking for what you need in relationships, and keeping them. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>'],
 ['Tool','Diary card','A weekly self-monitoring form tracking targets such as self-harm, suicide attempts and emotional misery; it sets the session agenda. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>'],
 ['Tool','Chain analysis','Working out what led up to a behaviour and what keeps it going, then finding skilful alternatives. <sup class="c" data-ref="Chapman2006DBT,Lynch2006DBT" title="Source 99,324">99,324</sup>'],
 ['Mode','Phone coaching','The therapist can be phoned between sessions to help use skills when most needed, for example in a crisis. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>'],
 ['Mode','Consultation team','Therapists meet weekly for about 1–2 hours to stay compassionate and non-judgemental and to reduce burnout. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>'],
 ['Idea','Dialectics','DBT holds a dialectical philosophy at its core, with the biosocial theory and a focus on emotions. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> Proposed mechanisms include validation, mindfulness and dialectics. <sup class="c" data-ref="Lynch2006DBT" title="Source 324">324</sup>'],
 ['Idea','The five functions','Enhance capabilities, generalise them, improve motivation and reduce dysfunctional behaviour, support the therapists, structure the environment. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>']
];
const DB_CO={
 all:{n:'All BPD psychotherapies vs usual care',rows:[
  ['BPD severity',-.52,-.70,-.33,'moderate','22 trials'],
  ['Self-harm',-.32,-.49,-.14,'low','13 trials'],
  ['Suicide-related outcomes',-.34,-.57,-.11,'low','13 trials'],
  ['Psychosocial functioning',-.45,-.68,-.22,'low','22 trials']],
  note:{k:'Cochrane 2020 · 75 RCTs · 4,507 people',t:'Only severity clears the bar',
   txt:`Across BPD psychotherapies against usual care, BPD severity fell by SMD −0.52 (moderate certainty), about −3.6 points on the 0–36 ZAN-BPD, above the 3.0-point minimal clinically relevant difference. "Only the outcome of BPD severity reached the MIREDIF-defined cut-off for a clinically meaningful improvement", and subgroups found no clear difference between therapy types. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup> The 2012 review had concluded that "none of the treatments has a very robust evidence base". <sup class="c" data-ref="Stoffers2012" title="Source 511">511</sup>`,
   pt:`On average, specialised therapy helps more than usual care, most clearly for overall BPD symptoms.`,
   hook:`Cochrane 2020: BPD severity SMD −0.52 (moderate certainty), the only outcome above the clinically meaningful threshold. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`}},
 dbt:{n:'DBT vs usual care',rows:[
  ['BPD severity',-.60,null,null,'low','3 trials'],
  ['Self-harm',-.28,-.48,-.07,'low','7 trials'],
  ['Psychosocial functioning',-.36,null,null,'low','6 trials']],
  note:{k:'Cochrane 2020 · DBT subgroup',t:'Consistent, low-certainty gains',
   txt:`DBT was the subject of about a third of the 75 trials. Against usual care it reduced BPD severity (SMD −0.60, 3 trials), self-harm (−0.28, 7 trials) and improved psychosocial functioning (−0.36, 6 trials), all at low certainty. <sup class="c" data-ref="Storebo2020,StoffersWinterling2022BJP" title="Source 513,514">513,514</sup> A focused 2022 analysis found standalone DBT reduced self-harm (SMD −0.54) and add-on DBT skills training reduced BPD severity (SMD −0.66, moderate certainty). <sup class="c" data-ref="StoffersWinterling2022BJP" title="Source 513">513</sup> Cristea 2017 found small effects that shrank when risk of bias was accounted for. <sup class="c" data-ref="Cristea2017" title="Source 111">111</sup>`,
   pt:`DBT helps on average, but the studies are small and the size of the benefit is uncertain.`,
   hook:`Add-on DBT skills training: BPD severity SMD −0.66 (moderate certainty). <sup class="c" data-ref="StoffersWinterling2022BJP" title="Source 513">513</sup>`}}
};
inits.dbt=()=>{
  const svg=$('#dbSvg'),rg=$('#dbT');let pg='std',STEPS=dbSteps(pg),setSt=()=>{};
  const PH=rng(7),COACH=[];for(let i=0;i<60;i++)COACH.push(PH()<.32);
  const MODS=[{k:'DT',n:'Distress tolerance',c:'var(--accent)',a0:-90},{k:'ER',n:'Emotion regulation',c:'var(--mood)',a0:30},{k:'IE',n:'Interpersonal effectiveness',c:'var(--other)',a0:150}];
  const ROWS=[{n:'Individual therapy',s:'weekly · about 1 h',c:'var(--rx)',on:()=>1},{n:'Skills group',s:'weekly · 1.5–2.5 h',c:'var(--accent)',on:()=>1},
    {n:'Phone coaching',s:'between sessions',c:'var(--gold)',on:w=>COACH[w]},{n:'Consultation team',s:'therapists · 1–2 h',c:'var(--brand)',on:()=>1}];
  const rad=a=>a*Math.PI/180,pt=(cx,cy,r,a)=>[cx+r*Math.cos(rad(a)),cy+r*Math.sin(rad(a))];
  function sector(cx,cy,r1,r2,a0,a1){if(a1-a0<.05)return '';const L=a1-a0>180?1:0,[x1,y1]=pt(cx,cy,r2,a0),[x2,y2]=pt(cx,cy,r2,a1),[x3,y3]=pt(cx,cy,r1,a1),[x4,y4]=pt(cx,cy,r1,a0);
    return `M${f1(x1)} ${f1(y1)}A${r2} ${r2} 0 ${L} 1 ${f1(x2)} ${f1(y2)}L${f1(x3)} ${f1(y3)}A${r1} ${r1} 0 ${L} 0 ${f1(x4)} ${f1(y4)}Z`}
  function draw(t){const NR=vb(svg,'720 420','400 740'),P=DB_PROG[pg],W=P.W,wk=t*W,ph=phaseOf(STEPS,t);
    const L=NR?{cx:200,cy:178,R:112,r0:44,wkY:330,mt:368,mx0:16,cx0:150,cx1:374,ry:382,rh:38,tlY:540,lt:578,lx:20,ly:590,lw:360,lh:110,ft:730}
              :{cx:168,cy:184,R:118,r0:46,wkY:350,mt:28,mx0:336,cx0:466,cx1:704,ry:42,rh:40,tlY:212,lt:248,lx:340,ly:258,lw:364,lh:112,ft:404};
    let s=`<text x="${NR?16:40}" y="28" class="t-sm" style="fill:var(--rx)">SKILLS GROUP · FOUR MODULES</text>`;
    /* ---- skills ring ---- */
    const third=W/3,mi=Math.min(2,Math.floor(wk/third));
    MODS.forEach((m,i)=>{const a0=m.a0,a1=a0+120,pr=ramp(wk,i*third,(i+1)*third),on=i===mi&&t>.02;
      s+=`<path d="${sector(L.cx,L.cy,L.r0+4,L.R,a0+1.5,a1-1.5)}" style="fill:var(--panel-2);stroke:${on?m.c:'var(--line)'};stroke-width:${on?2:1}"/>`;
      if(pr>0)s+=`<path d="${sector(L.cx,L.cy,L.r0+4,L.R,a0+1.5,a0+1.5+(117)*pr)}" style="fill:${m.c};opacity:${on?.62:.4}"/>`;
      const [lx,ly]=pt(L.cx,L.cy,(L.r0+L.R)/2+4,a0+60),w=m.n.split(' ');
      s+=`<text x="${f1(lx)}" y="${f1(ly-3)}" class="t-lbl t-mid" style="font-size:12px">${w[0]}</text><text x="${f1(lx)}" y="${f1(ly+11)}" class="t-lbl t-mid" style="font-size:12px">${w.slice(1).join(' ')}</text>`;
      if(pr>0&&pr<1&&on){const [px,py]=pt(L.cx,L.cy,L.R+8,a0+1.5+117*pr);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="5" style="fill:${m.c};stroke:var(--panel);stroke-width:2"/>`}});
    /* mindfulness at the centre glows at the start of each module (schematic) */
    const mf=t>.01?Math.max(...[0,1,2].map(i=>bump(wk,i*third-.5,i*third+Math.max(2,W*.05)))):0;
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${L.r0}" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:${f1(1.2+mf*2)}"/>`;
    if(mf>0)s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${f1(L.r0*(.5+.5*mf))}" style="fill:var(--rx);opacity:${f1(.15+.25*mf)}"/>`;
    s+=`<text x="${L.cx}" y="${L.cy+4}" class="t-lbl t-mid" style="font-size:12px">Mindfulness</text>`;
    s+=`<text x="${L.cx}" y="${L.wkY}" class="t-big t-mid">${t<.01?'Before week 1':`Week ${Math.max(1,Math.ceil(wk))} of ${W}`}</text>`;
    s+=`<text x="${L.cx}" y="${L.wkY+18}" class="t-xs t-mid">${P.n} · module: ${t<.01?'none yet':MODS[mi].n.toLowerCase()}</text>`;
    /* ---- the four modes, week by week ---- */
    s+=`<text x="${L.mx0}" y="${L.mt}" class="t-sm" style="fill:var(--rx)">FOUR MODES · WEEK BY WEEK</text>`;
    const X=w=>lerp(L.cx0,L.cx1,w/W),cw=(L.cx1-L.cx0)/W,lit=ph>=1||t>.06;
    ROWS.forEach((r,i)=>{const y=L.ry+i*L.rh,act=lit&&(ph!==0);
      s+=`<text x="${L.mx0}" y="${y+12}" class="t-lbl" style="font-size:12px;opacity:${act?1:.55}">${r.n}</text><text x="${L.mx0}" y="${y+25}" class="t-xs">${r.s}</text>`;
      for(let w=0;w<W;w++){const done=w<wk,on=r.on(w),cur=w===Math.floor(wk)&&t>.01;
        s+=`<rect x="${f1(X(w)+cw*.12)}" y="${y+4}" width="${f1(Math.max(1.5,cw*.76))}" height="22" rx="${f1(Math.min(3,cw*.3))}" style="fill:${done&&on?r.c:'var(--panel-2)'};opacity:${done&&on?.85:on?1:.45};${cur?`stroke:${r.c};stroke-width:1.5`:''}"/>`}});
    const tl=tline(L.cx0,L.tlY,L.cx1-L.cx0,{min:0,max:W,step:W===52?13:W===26?13:W===19?19:10,fmt:v=>v?'wk '+v:'0'});s+=tl.svg;
    s+=`<line x1="${f1(X(Math.min(W,wk)))}" x2="${f1(X(Math.min(W,wk)))}" y1="${L.ry-2}" y2="${L.tlY}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/>`;
    /* ---- target hierarchy ---- */
    let at=-1;if(ph===2)at=2-Math.min(2,Math.floor(ramp(t,.18,.38)*3));else if(ph===4)at=2;
    s+=`<text x="${L.lx}" y="${L.lt}" class="t-sm" style="fill:var(--rx)">SESSION AGENDA · PRIORITY RISES →</text>`;
    const LD=ladder(L.lx,L.ly,L.lw,L.lh,['Quality of life','Therapy-interfering','Life-threatening'],{at,col:'var(--rx)'});s+=LD.svg;
    ['3rd','2nd','1st'].forEach((n,i)=>{const [x,y]=LD.top(i);s+=`<text x="${f1(x)}" y="${f1(y+(L.lh/3)*(i+1)-8)}" class="t-xs t-mid" style="fill:${i===at?'var(--on-brand)':'var(--muted)'}">${n}</text>`});
    s+=`<text x="${NR?200:L.cx}" y="${L.ft}" class="t-xs t-mid" style="fill:var(--warn)">SCHEMATIC · pacing and coaching weeks illustrative</text>`;
    svg.innerHTML=s;
    setSt(ph);
    $('#dbNote').innerHTML=noteHTML(STEPS[ph]);
    const n=Math.min(W,Math.ceil(wk));
    $('#dbRead').innerHTML=`<span>week <b>${n} of ${W}</b></span><span>individual therapy <b>≈${n} h</b></span><span>skills group <b>≈${f1(n*1.5).replace('.0','')}–${f1(n*2.5).replace('.0','')} h</b></span><span>coaching weeks (illustrative) <b>${COACH.slice(0,n).filter(Boolean).length}</b></span>`;
  }
  const stop=playWire(rg,$('#dbPlay'),draw,24000,'Replay','dbt');
  function wire(){const old=$('#dbSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS,rg,draw,stop)}
  $$('[data-dbv]').forEach(b=>b.addEventListener('click',()=>{stop();pg=b.dataset.dbv;STEPS=dbSteps(pg);$$('[data-dbv]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- chain analysis builder ---- */
  const cs=$('#dbChSvg');let cut=4,CG=null;
  $('#dbCut').innerHTML='<span class="kicker" style="align-self:center">Skill goes in at</span>'+DB_CHAIN.map((c,i)=>`<button class="btn" data-cut="${i}" aria-pressed="${i===cut}">${c.n}</button>`).join('');
  function drawC(){const NR=vb(cs,'720 300','400 590');let s=`<defs>${marker('dbArr','var(--muted)')}${marker('dbArrA','var(--accent)')}</defs>`;
    const box=i=>NR?{x:14,y:14+i*80,w:200,h:62}:{x:12+i*100,y:30,w:90,h:92};CG={NR,box};
    DB_CHAIN.forEach((c,i)=>{const b=box(i),after=i>cut,on=i===cut;
      if(i){const p=box(i-1);s+=NR?`<path d="M${b.x+40} ${p.y+p.h-6}V${b.y+6}M${b.x+56} ${p.y+p.h-6}V${b.y+6}" style="stroke:var(--muted);stroke-width:2;opacity:${after?.3:.8}"/>`
        :`<path d="M${p.x+p.w-6} ${b.y+38}H${b.x+6}M${p.x+p.w-6} ${b.y+54}H${b.x+6}" style="stroke:var(--muted);stroke-width:2;opacity:${after?.3:.8}"/>`}
      s+=`<g class="clk" data-ci="${i}" style="opacity:${after?.32:1}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${NR?22:30}" style="fill:${on?'var(--accent-soft)':'var(--panel)'};stroke:${on?'var(--accent)':i===5?'var(--storm)':'var(--line)'};stroke-width:${on?2.6:1.6}"/>`;
      if(NR)s+=`<text x="${b.x+18}" y="${b.y+25}" class="t-lbl" style="font-size:12.5px">${i+1}. ${c.n}</text><text x="${b.x+18}" y="${b.y+44}" class="t-xs">${c.ex.join(' ').replace(/"/g,'&quot;')}</text>`;
      else s+=`<text x="${b.x+b.w/2}" y="${b.y+30}" class="t-lbl t-mid" style="font-size:11.5px">${c.n.split(' ')[0]}</text>${c.n.split(' ')[1]?`<text x="${b.x+b.w/2}" y="${b.y+44}" class="t-lbl t-mid" style="font-size:11.5px">${c.n.split(' ')[1]}</text>`:''}`+
        c.ex.map((e,k)=>`<text x="${b.x+b.w/2}" y="${b.y+(c.n.includes(' ')?62:54)+k*12}" class="t-xs t-mid" style="font-size:8.6px">${e.replace(/"/g,'&quot;')}</text>`).join('');
      s+='</g>'});
    /* the skill drops in */
    const c=DB_CHAIN[cut],b=box(cut);
    const S=NR?{x:236,y:clamp(b.y-14,8,590-110),w:154,h:96}:{x:clamp(b.x+b.w/2-92,8,712-184),y:172,w:184,h:84};
    s+=NR?`<path d="M${b.x+b.w} ${b.y+b.h/2}H${S.x-4}" style="stroke:var(--accent);stroke-width:2" marker-end="url(#dbArrA)"/>`
         :`<path d="M${b.x+b.w/2} ${b.y+b.h}V${S.y-4}" style="stroke:var(--accent);stroke-width:2" marker-end="url(#dbArrA)"/>`;
    s+=`<rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" rx="12" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.8"/>`+
      `<text x="${S.x+S.w/2}" y="${S.y+18}" class="t-xs t-mid" style="fill:var(--accent);font-weight:600">SKILL</text>`+
      `<text x="${S.x+S.w/2}" y="${S.y+36}" class="t-lbl t-mid" style="font-size:${c.sk.length>20?11:12.5}px">${c.sk}</text>`+
      c.do.map((d,k)=>`<text x="${S.x+S.w/2}" y="${S.y+56+k*13}" class="t-xs t-mid">${d}</text>`).join('');
    if(cut<6){const e=box(6);
      s+=NR?`<path d="M${S.x+S.w/2} ${S.y+S.h+2}V${e.y+e.h/2}" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:5 5" marker-end="url(#dbArrA)"/><text x="${S.x+S.w/2+6}" y="${(S.y+S.h+e.y+e.h/2)/2}" class="t-xs" style="fill:var(--accent)">a different</text><text x="${S.x+S.w/2+6}" y="${(S.y+S.h+e.y+e.h/2)/2+12}" class="t-xs" style="fill:var(--accent)">ending</text>`
        :(S.x+S.w<640?`<path d="M${S.x+S.w+2} ${S.y+S.h/2}H${e.x+e.w/2}V${e.y+e.h+4}" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:5 5" marker-end="url(#dbArrA)"/><text x="${(S.x+S.w+e.x+e.w/2)/2}" y="${S.y+S.h/2-6}" class="t-xs t-mid" style="fill:var(--accent)">a different ending</text>`:'')}
    s+=`<text x="${NR?14:12}" y="${NR?584:290}" class="t-xs">${NR?'':'Faded links: what the skill can change. '}Link ${cut+1} of 7: ${c.n.toLowerCase()}</text>`;
    cs.innerHTML=s;
    $$('[data-cut]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.cut===cut));
    $('#dbChNote').innerHTML=noteHTML({k:`Link ${cut+1} · ${c.n}`,t:`Break it with ${c.sk.toLowerCase()}`,txt:c.txt,pt:c.pt,
      hook:cut===6?`Chain analysis looks backward to the vulnerability and forward to the consequences that maintain the behaviour. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`:cut===4?`Distress tolerance = surviving crises without making things worse. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`:null});
  }
  $('#dbCut').addEventListener('click',e=>{const b=e.target.closest('[data-cut]');if(!b)return;cut=+b.dataset.cut;drawC()});
  cs.addEventListener('click',e=>{const g=e.target.closest('[data-ci]');if(g){cut=+g.dataset.ci;drawC();return}
    const p=cs.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=cs.getScreenCTM();if(!m||!CG)return;const q=p.matrixTransform(m.inverse());
    let best=0,bd=1e9;DB_CHAIN.forEach((_,i)=>{const b=CG.box(i),d=CG.NR?Math.abs(q.y-(b.y+b.h/2)):Math.abs(q.x-(b.x+b.w/2));if(d<bd){bd=d;best=i}});cut=best;drawC()});
  drawC();

  /* ---- flip set ---- */
  $('#dbFlips').innerHTML=DB_FLIPS.map(([k,n,b])=>`<button class="dbflip" aria-pressed="false"><small>${k}</small><b>${n}</b><span class="fr">Tap to see what it is for</span><span class="bk">${b}</span></button>`).join('');
  $('#dbFlips').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('.dbflip');if(b)b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});

  /* ---- Cochrane forest ---- */
  const co=$('#dbCoSvg');let cv='all';
  function drawCo(p){const D=DB_CO[cv],nr=D.rows.length-1,NR=vb(co,`620 ${58+46*nr+64}`,`400 ${62+66*nr+64}`);let s='';
    const G=NR?{x0:30,x1:384,y0:62,dy:66,lab:-30}:{x0:220,x1:600,y0:58,dy:46,lab:0},X=v=>lerp(G.x0,G.x1,(v+1)/1.2);
    const yEnd=G.y0+G.dy*(D.rows.length-1)+24;
    [-1,-.75,-.5,-.25,0].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${G.y0-22}" y2="${yEnd}" class="${v?'grid':'axis'}" style="${v?'':'stroke:var(--ink);opacity:.5'}"/><text x="${f1(X(v))}" y="${yEnd+14}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${f1(X(-.5))}" y="${yEnd+30}" class="t-xs t-mid">← favours therapy · SMD</text><text x="${f1(X(0)-4)}" y="${G.y0-28}" class="t-xs t-end">no difference</text>`;
    if(!NR)s+=`<text x="${G.x0-14}" y="${G.y0-28}" class="t-xs t-end">outcome · trials · certainty</text>`;
    D.rows.forEach(([n,m,lo,hi,cert,tr],i)=>{const y=G.y0+G.dy*i,col=cert==='moderate'?'var(--rx)':'var(--muted)',mm=m*p;
      const lx=NR?G.x0:G.x0-14,ly=NR?y+G.lab:y-2;
      s+=`<text x="${lx}" y="${ly}" class="t-lbl ${NR?'':'t-end'}" style="font-size:12.5px">${n}</text><text x="${lx}" y="${ly+13}" class="t-xs ${NR?'':'t-end'}">${tr} · ${cert} certainty</text>`;
      if(lo!=null)s+=`<line x1="${f1(X(lo*p))}" x2="${f1(X(hi*p))}" y1="${y}" y2="${y}" style="stroke:${col};stroke-width:2.4;stroke-linecap:round"/>`;
      s+=`<rect x="${f1(X(mm)-6)}" y="${y-6}" width="12" height="12" style="fill:${col}"/>`;
      if(p>.98)s+=`<text x="${f1(lo==null?X(m)-12:X(lo)-6)}" y="${y+4}" class="t-xs t-end" style="fill:var(--ink)">${lo==null?'no CI given · ':''}${m.toFixed(2).replace('-','−')}</text>`});
    co.innerHTML=s;
    $('#dbCoCap').innerHTML=`${D.n}. Squares are standardised mean differences; lines are 95% confidence intervals where the abstract reports them. Green = moderate certainty, grey = low. Population averages from trials. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`;
    $('#dbCoNote').innerHTML=noteHTML(D.note);
  }
  $$('[data-dbc]').forEach(b=>b.addEventListener('click',()=>{cv=b.dataset.dbc;$$('[data-dbc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCo(1)}));
  drawCo(1);
  const pr=redraws.dbt;redraws.dbt=()=>{pr&&pr();drawC();drawCo(1)};
};
/* =============== 3.2 Mentalization-based treatment =============== */
inits.mbt=()=>{
  /* ---------- main stage: mentalizing under attachment stress ---------- */
  const svg=$('#mbSvg'),rg=$('#mbT');let hi=true,setSt=()=>{};
  const THR=.6;
  /* schematic arousal: climbs after the trigger, peaks, and falls once the therapist slows things down */
  const arousal=t=>{const pk=hi?.94:.48;
    if(t<.8)return .14+(pk-.14)*ease(ramp(t,.1,.5));
    return lerp(pk,hi?.24:.2,ease(ramp(t,.8,.97)))};
  const M={
    ment:{n:'Mentalizing',c:'var(--accent)',A:['Jo looks tired.','Maybe a hard day?'],B:['Maya seems tense.','I should explain.']},
    pe:{n:'Psychic equivalence',c:'var(--storm)',A:['I feel dropped,','so Jo dropped me.'],B:['I feel blamed,','so I am attacked.']},
    tel:{n:'Teleological mode',c:'var(--storm)',A:['If Jo cared, Jo','would have texted.'],B:['Words mean nothing.','Show me, then.']},
    pre:{n:'Pretend mode',c:'var(--mood)',A:['It is all my','childhood. I know.'],B:['We talked it through.','We are fine.']},
    pause:{n:'Slowing down',c:'var(--brand)',A:['Wait. What just','happened in me?'],B:['When did it','start to go wrong?']},
    rep:{n:'Mentalizing again',c:'var(--accent)',A:['I felt hurt when','you came in late.'],B:['I did not see that.','Tell me more?']}
  };
  const STEPS=[
    {from:0,at:.05,k:'Before the trigger',t:'Minds in mind',
     txt:`Jo arrives late and quiet. Maya and Jo are both mentalizing: each makes a tentative guess about what is going on inside the other, and is ready to be wrong. Mentalizing is "the capacity to understand others and oneself in terms of internal mental states", and it varies along four dimensions: automatic–controlled, internal–external focus, self–other and cognitive–affective. <sup class="c" data-ref="Luyten2020" title="Source 323">323</sup>`,
     lo:`The same start: two people guessing, gently, at each other's minds.`,
     pt:`Mentalizing is noticing that you and other people have thoughts and feelings behind what you do, and guessing at them with an open mind.`,
     hook:`Mentalizing has four dimensions: automatic–controlled, internal–external, self–other, cognitive–affective (Luyten 2020).`},
    {from:.14,at:.28,k:'Arousal rising',t:'Attachment stress climbs',
     txt:`<span class="ev hyp">Hypothesis</span> The developmental mentalizing model proposes that in BPD the attachment system switches on at a low threshold, and controlled, reflective mentalizing then switches off, leaving fast automatic guesses. <sup class="c" data-ref="FonagyLuyten2009" title="Source 164">164</sup> In this model, reduced mentalizing leads to problems with emotion regulation and impulsivity, especially in close relationships. <sup class="c" data-ref="Bateman2010WP" title="Source 38">38</sup> The dashed line on the gauge is that threshold, drawn schematically.`,
     lo:`Arousal rises a little but stays under the threshold, so reflective thinking stays online.`,
     pt:`When someone close seems to pull away, alarm can rise fast. Above a certain point, it gets much harder to think about what the other person really means.`,
     hook:`Mentalizing model: attachment activation → loss of controlled mentalizing → emotional storms and impulsive acts (Hypothesis). <sup class="c" data-ref="FonagyLuyten2009" title="Source 164">164</sup>`},
    {from:.36,at:.43,k:'Above the threshold',t:'Psychic equivalence',
     txt:`Inner experience is treated as outer reality: "I feel dropped" becomes "Jo has dropped me". There is no gap between a feeling and a fact, so there is nothing to question. <sup class="c" data-ref="Chung2026" title="Source 102">102</sup> In 90 people with BPD and 47 controls in Korea, psychic equivalence was linked both to having the diagnosis and to symptom severity. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>`,
     lo:`Under low stress, Maya can notice the feeling "I feel dropped" without treating it as proof.`,
     pt:`A strong feeling can seem like the truth about the world. "I feel unwanted" turns into "I am unwanted".`,
     hook:`Psychic equivalence = inner experience equated with outer reality. <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>`},
    {from:.5,at:.57,k:'Still above the threshold',t:'Teleological mode',
     txt:`Only physical, goal-directed actions count as proof of what someone feels or intends. <sup class="c" data-ref="Chung2026" title="Source 102">102</sup> Words, apologies and explanations stop registering; what matters is whether Jo texted, came, stayed. The bond line between them has broken: neither can reach the other's mind.`,
     lo:`With arousal low, an explanation still counts as information about Jo's mind.`,
     pt:`In this state, only actions feel real: "Prove you care." Kind words do not get through.`,
     hook:`Teleological mode = only observable actions prove intentions. <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>`},
    {from:.64,at:.71,k:'Talk without contact',t:'Pretend mode',
     txt:`Now both talk fluently about feelings, but the talk is cut off from what they actually feel: it "appears to mentalize" while disconnected from real inner states and reality. <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>`,
     lo:`Under low stress the conversation stays connected: what is said matches what is felt.`,
     pt:`Sometimes people say all the right things about feelings, but it feels empty and nothing changes. That is pretend mode.`,
     hook:`Pretend mode = mentalizing talk detached from real feeling. The three pre-mentalizing modes: psychic equivalence, teleological, pretend. <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>`},
    {from:.8,at:.94,k:'The therapist steps in',t:'Pause, rewind, repair',
     txt:`The therapist slows the exchange down and goes back to the moment it went wrong, asking what each person felt and assumed then. As arousal falls below the threshold, controlled mentalizing comes back and the bond repairs. MBT is "a time-limited treatment which structures interventions that promote the further development of mentalizing". <sup class="c" data-ref="Bateman2010WP" title="Source 38">38</sup> In the MBT-A trial, the benefit on self-harm and depression was explained by better mentalizing and less attachment avoidance. <sup class="c" data-ref="Rossouw2012MBTA" title="Source 438">438</sup>`,
     lo:`With low stress there is nothing to repair: the therapist can use calm moments to practise curiosity about minds.`,
     pt:`In MBT, the therapist helps you hit "pause", go back to the moment things went wrong, and look at what was going on in your mind and the other person's.`,
     hook:`MBT aims to develop mentalizing itself. <sup class="c" data-ref="Bateman2010WP" title="Source 38">38</sup> Mechanism in MBT-A: improved mentalizing and less attachment avoidance. <sup class="c" data-ref="Rossouw2012MBTA" title="Source 438">438</sup>`}
  ];
  const modeAt=t=>{const p=phaseOf(STEPS,t),s=arousal(t);
    if(p===5)return s>=THR?'pause':(hi?'rep':'ment');
    if(s<THR)return 'ment';
    return ['ment','pe','pe','tel','pre','pre'][p]};
  /* horizontal or vertical arousal gauge with its threshold */
  function gauge(x,y,len,v,vert){const col=v<.45?'var(--calm)':v<THR?'var(--mood)':'var(--storm)';let s='';
    if(vert){s+=`<rect x="${x-9}" y="${y}" width="18" height="${len}" rx="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      const h=len*clamp(v);s+=`<rect x="${x-6}" y="${f1(y+len-h)}" width="12" height="${f1(h)}" rx="6" style="fill:${col}"/>`;
      const ty=y+len*(1-THR);s+=`<line x1="${x-16}" x2="${x+16}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--storm);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      s+=`<text x="${x}" y="${y-22}" class="t-xs t-mid">AROUSAL</text><text x="${x}" y="${y-10}" class="t-xs t-mid" style="fill:var(--ink)">${Math.round(v*100)}%</text>`;
      s+=`<text x="${x-20}" y="${f1(ty-4)}" class="t-xs t-end" style="fill:var(--storm)">threshold</text><text x="${x-20}" y="${f1(ty+9)}" class="t-xs t-end" style="fill:var(--storm)">(schematic)</text>`}
    else{s+=`<rect x="${x}" y="${y-8}" width="${len}" height="16" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<rect x="${x+2}" y="${y-5}" width="${f1(Math.max(0,(len-4)*clamp(v)))}" height="10" rx="5" style="fill:${col}"/>`;
      const tx=x+len*THR;s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${y-14}" y2="${y+14}" style="stroke:var(--storm);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      s+=`<text x="${x}" y="${y-14}" class="t-xs">AROUSAL ${Math.round(v*100)}%</text><text x="${f1(tx+4)}" y="${y+22}" class="t-xs" style="fill:var(--storm)">threshold (schematic)</text>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 390','400 574'),s=arousal(t),mk=modeAt(t),md=M[mk],p=phaseOf(STEPS,t);
    const L=N?{ax:102,bx:298,py:178,ps:78,bA:[12,70,180,54],bB:[208,70,180,54],th:[200,396],tb:[90,338,220,44],gy:[40,390,300],st:[30,494,340],ft:564,hd:30}
             :{ax:200,bx:470,py:150,ps:96,bA:[86,52,200,56],bB:[372,52,200,56],th:[335,300],tb:[384,262,196,44],gy:[668,70,230],st:[40,332,560],ft:384,hd:24};
    let o='';
    /* mode banner */
    o+=`<text x="${N?200:335}" y="${L.hd}" class="t-sm t-mid" style="fill:${md.c};font-weight:600">${md.n.toUpperCase()}${mk==='ment'&&p>0&&!hi?' · stress stays below threshold':''}</text>`;
    /* bond between the two */
    const ru=hi?clamp((s-THR)/(.94-THR)*1.15):0,by=L.py+L.ps*.55;
    o+=bond(L.ax+26,by,L.bx-26,by,{k:clamp(1-s*.7,.2,1),rupture:ru,curve:N?-14:-18});
    if(ru>.25)o+=`<text x="${(L.ax+L.bx)/2}" y="${f1(by+28)}" class="t-xs t-mid" style="fill:var(--storm)">bond ruptured</text>`;
    else if(p===5&&hi&&s<THR)o+=`<text x="${(L.ax+L.bx)/2}" y="${f1(by+28)}" class="t-xs t-mid" style="fill:var(--accent)">bond repaired</text>`;
    /* the two people */
    const shake=mk==='pe'||mk==='tel'?Math.sin(t*260)*1.6:0;
    o+=person(L.ax+shake,L.py,L.ps,'var(--self)')+person(L.bx-shake,L.py,L.ps,'var(--other)');
    o+=`<text x="${L.ax}" y="${L.py+L.ps+16}" class="t-lbl t-mid">Maya</text><text x="${L.bx}" y="${L.py+L.ps+16}" class="t-lbl t-mid">Jo</text>`;
    /* thought bubbles: border colour = the current mode */
    const[ax,ay,aw,ah]=L.bA,[bx,by2,bw,bh]=L.bB;
    o+=bubble(ax,ay,aw,ah,{think:true,tx:L.ax,ty:L.py-4,lines:md.A,col:md.c});
    o+=bubble(bx,by2,bw,bh,{think:true,tx:L.bx,ty:L.py-4,lines:md.B,col:md.c});
    /* the therapist arrives in the last step */
    if(p===5){const a=ramp(t,.8,.84);o+=`<g style="opacity:${f1(a)}">`+person(L.th[0],L.th[1],N?56:62,'var(--rx)');
      o+=`<text x="${L.th[0]}" y="${L.th[1]+(N?72:78)}" class="t-xs t-mid" style="fill:var(--rx)">therapist</text>`;
      const[tx,ty,tw,th]=L.tb;o+=bubble(tx,ty,tw,th,{tx:L.th[0]+(N?0:14),ty:L.th[1]+6,lines:s>=THR?['Let us pause and go back','to when Jo came in.']:['What did each of you','feel in that moment?'],col:'var(--rx)'})+'</g>'}
    /* gauge */
    o+=N?gauge(L.gy[0],L.gy[2],L.gy[1]-L.gy[0],s,false):gauge(L.gy[0],L.gy[1],L.gy[2],s,true);
    /* mode strip: which mode was active at each moment so far */
    const[sx,sy,sw]=L.st;
    o+=`<text x="${sx}" y="${sy-8}" class="t-xs">MODE OVER THE CONVERSATION</text>`;
    o+=`<rect x="${sx}" y="${sy}" width="${sw}" height="12" rx="3" style="fill:var(--panel-2)"/>`;
    for(let u=0;u<t;u+=.01){const c=M[modeAt(u)].c;o+=`<rect x="${f1(sx+sw*u)}" y="${sy}" width="${f1(sw*Math.min(.0105,t-u))}" height="12" style="fill:${c};opacity:.85"/>`}
    o+=`<line x1="${f1(sx+sw*t)}" x2="${f1(sx+sw*t)}" y1="${sy-3}" y2="${sy+15}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    const lg=[['var(--accent)','mentalizing'],['var(--storm)','equivalence / teleological'],['var(--mood)','pretend'],['var(--brand)','slowing down']];
    let lx=sx;lg.forEach(([c,n],i)=>{if(N&&i===2){lx=sx}const ly=sy+28+(N&&i>=2?14:0);o+=`<rect x="${lx}" y="${ly-7}" width="9" height="9" rx="2" style="fill:${c}"/><text x="${lx+13}" y="${ly+1}" class="t-xs">${n}</text>`;lx+=n.length*5.9+30});
    if(N)o+=`<text x="200" y="${L.ft}" class="t-xs t-mid" style="fill:var(--warn)">SCHEMATIC · illustrative people and thoughts</text>`;
    else o+=`<text x="${sx+sw}" y="${L.ft}" class="t-xs t-end" style="fill:var(--warn)">SCHEMATIC · illustrative people and thoughts</text>`;
    svg.innerHTML=o;
    setSt(p);
    const st=STEPS[p];
    $('#mbNote').innerHTML=noteHTML(hi?st:Object.assign({},st,{txt:`<b>Low-stress view.</b> ${st.lo} `+st.txt}));
    $('#mbRead').innerHTML=`<span>arousal <b>${Math.round(s*100)}%</b> (schematic)</span><span>threshold <b>${THR*100}%</b></span><span>mode <b>${md.n}</b></span><span>bond <b>${ru>.25?'ruptured':ru>0?'strained':'intact'}</b></span>`;
  }
  const stop=playWire(rg,$('#mbPlay'),draw,22000,'Replay','mbt');
  setSt=stepWire($('#mbSteps'),STEPS,rg,draw,stop);
  $$('[data-mbs]').forEach(b=>b.addEventListener('click',()=>{stop();hi=b.dataset.mbs==='hi';$$('[data-mbs]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- trial comparator ---------- */
  const ts=$('#mbTr');let cur='b08',grow=1,stopG=null;
  /* kind: bars (paired, a = MBT arm, b = comparator), qual (direction only), ci (mean difference), rr (risk ratio)
     tx: treatment band(s) in years since entry; ms: measurement times */
  const TR=[
    {id:'b99',y:1999,s:'1999',n:'Bateman & Fonagy 1999',d:'Partial hospital vs standard psychiatric care · 38 patients',kind:'qual',a:'Partial hospital (MBT forerunner)',b:'Standard care',
     rows:[['Suicide attempts and self-harm','fewer','limited change or worse'],['Inpatient days','fewer','limited change or worse'],['Depression','less','limited change or worse'],['Social function','better','limited change or worse']],
     tx:[[0,1.5,'treatment, up to 18 months']],ms:[.5,1.5],
     txt:`38 patients were randomised to psychoanalytically oriented partial hospitalisation (individual and group psychotherapy, up to 18 months) or standard psychiatric care. The partial-hospital group improved on all measures, including less self-harm, fewer suicide attempts and fewer inpatient days, with change beginning at 6 months; controls showed limited change or got worse. The abstract gives directions, not plottable numbers. <sup class="c" data-ref="Bateman1999" title="Source 34">34</sup>`,
     hook:`Bateman & Fonagy 1999 was the forerunner of MBT: partial hospitalisation cut suicidal acts, self-harm and inpatient days vs standard care. <sup class="c" data-ref="Bateman1999" title="Source 34">34</sup>`},
    {id:'b01',y:2001,s:'2001',n:'18-month follow-up',d:'Same trial, 18 months after treatment ended · 44 patients',kind:'qual',a:'Partial hospital',b:'Standard care',
     rows:[['Gains at the end of treatment','kept','—'],['Most measures','kept improving','—']],
     tx:[[0,1.5,'treatment']],ms:[3],
     txt:`Eighteen months after treatment ended, partial-hospital patients kept their gains and kept improving on most measures. <sup class="c" data-ref="Bateman2001" title="Source 35">35</sup>`,
     hook:`Gains after MBT-type partial hospitalisation continued to grow after treatment ended. <sup class="c" data-ref="Bateman2001" title="Source 35">35</sup>`},
    {id:'b08',y:2008,s:'2008',n:'8-year follow-up',d:'8 years after entry, 5 years after MBT ended · 41 patients',kind:'bars',a:'MBT (partial hospital)',b:'Treatment as usual',
     rows:[['Suicidality',23,74,'%',100,'lower'],['Still meeting the BPD diagnosis',13,87,'%',100,'lower'],['Global functioning above 60',45,10,'%',100,'higher'],['Years employed or in education',3.2,1.2,' yr',4,'higher'],['Years on 3 or more medications',.02,1.9,' yr',4,'lower']],
     tx:[[0,3,'MBT (ended 5 years before this point)']],ms:[8],
     txt:`Eight years after entry, the MBT group did better on every outcome shown. The authors add a caveat: "their general social function remains impaired". These are group figures from 41 people, not a prediction for anyone. <sup class="c" data-ref="Bateman2008" title="Source 36">36</sup>`,
     hook:`Bateman 2008: still meeting BPD criteria 13% vs 87%; suicidality 23% vs 74%, 8 years after entry. <sup class="c" data-ref="Bateman2008" title="Source 36">36</sup>`},
    {id:'b09',y:2009,s:'2009',n:'Outpatient MBT vs SCM',d:'18 months of MBT or structured clinical management · 134 patients',kind:'qual',a:'Outpatient MBT',b:'Structured clinical management',
     rows:[['Suicide attempts','steeper decline','declined'],['Hospitalisation','steeper decline','declined'],['Overall','substantial improvement','substantial improvement']],
     tx:[[0,1.5,'treatment, 18 months']],ms:[1.5],slope:true,
     txt:`Both groups improved substantially, but MBT gave a steeper decline in suicide attempts and hospitalisation. The comparator was an active, structured treatment rather than usual care. The abstract gives no numbers, so the lines here show direction only. <sup class="c" data-ref="Bateman2009" title="Source 37">37</sup> Structured clinical management is covered in <a href="#gpm" data-go="gpm">Good psychiatric management</a>.`,
     hook:`Bateman 2009: MBT vs an active comparator (SCM); both improved, MBT faster on suicide attempts and hospitalisation. <sup class="c" data-ref="Bateman2009" title="Source 37">37</sup>`},
    {id:'r12',y:2012,s:'2012',n:'MBT-A for adolescents',d:'80 adolescents who self-harmed, with depression · 12 months',kind:'qual',a:'MBT-A',b:'Usual treatment',
     rows:[['Self-harm','reduced more','reduced less'],['Depression','reduced more','reduced less']],
     tx:[[0,1,'12 months']],ms:[1],
     txt:`MBT-A reduced self-harm and depression more than usual treatment over 12 months. The benefit was explained by better mentalizing and less attachment avoidance. <sup class="c" data-ref="Rossouw2012MBTA" title="Source 438">438</sup>`,
     hook:`MBT-A (Rossouw & Fonagy 2012): fewer self-harm episodes, mediated by mentalizing. <sup class="c" data-ref="Rossouw2012MBTA" title="Source 438">438</sup>`},
    {id:'l18',y:2018,s:'2018',n:'Day-hospital MBT',d:'Netherlands, vs specialist treatment as usual · 95 patients',kind:'bars',a:'MBT day hospital',b:'Specialist TAU',
     rows:[['Early dropout',9,34,'%',100,'lower']],tx:[],ms:[1.5],
     txt:`Day-hospital MBT was not superior to specialist treatment as usual on outcomes at 18 months, but early dropout was much lower (9% vs 34%). <sup class="c" data-ref="Laurenssen2018" title="Source 297">297</sup>`,
     hook:`Laurenssen 2018: MBT kept people in treatment (early dropout 9% vs 34%) without better 18-month outcomes. <sup class="c" data-ref="Laurenssen2018" title="Source 297">297</sup>`},
    {id:'g20',y:2020,s:'2020',n:'MBT in groups, adolescents',d:'112 adolescents, 1 year of MBT-G vs usual care',kind:'bars',a:'MBT-G',b:'Usual care',
     rows:[['Remission, end of treatment',29,29,'%',100,'higher'],['Remission, 2 years after entry',35,39,'%',100,'higher'],['Attended under half of sessions',29,7,'%',100,'lower']],
     tx:[[0,1,'1 year of groups']],ms:[1,2],
     txt:`No difference from usual care on the primary outcome (adjusted difference 0.4 BPFS-C units; 95% CI −6.3 to 7.1): 29% remitted in both groups. <sup class="c" data-ref="Beck2020MBTG" title="Source 46">46</sup> Two years after entry, remission was 35% vs 39%, not significantly different. <sup class="c" data-ref="Jorgensen2021MBTG" title="Source 244">244</sup> Attendance was a problem in the group format. <sup class="c" data-ref="Beck2020MBTG" title="Source 46">46</sup>`,
     hook:`MBT-G for adolescents did not beat usual care (29% remission in both). A negative trial is still evidence. <sup class="c" data-ref="Beck2020MBTG" title="Source 46">46</sup>`},
    {id:'b21',y:2021,s:'2021',n:'8 years after the 2009 trial',d:'98 of the 134 patients seen again',kind:'bars',a:'MBT',b:'SCM',
     rows:[['Still meeting recovery criteria (primary outcome)',74,51,'%',100,'higher']],tx:[[0,1.5,'treatment']],ms:[8],
     txt:`Eight years after the start of the 2009 trial, more patients still met the recovery criteria for the primary outcome after MBT than after SCM (74% vs 51%), and the MBT group was more often in purposeful activity. <sup class="c" data-ref="Bateman2021" title="Source 40">40</sup>`,
     hook:`Bateman 2021: 74% vs 51% still meeting recovery criteria 8 years after MBT vs SCM. <sup class="c" data-ref="Bateman2021" title="Source 40">40</sup>`},
    {id:'j23',y:2023,s:'2023–25',n:'5 vs 14 months of MBT',d:'166 outpatients, Denmark',kind:'ci',a:'favours short',b:'favours long',
     rows:[['BPD symptoms at 16 months',.99,-1.06,3.03],['BPD symptoms at 24 months',-.56,-2.67,1.54]],lim:4,ref:0,unit:'mean difference',
     tx:[[0,.42,'5 months'],[0,1.17,'14 months']],ms:[1.33,2],
     txt:`Short-term (5 months) and long-term (14 months) MBT did not differ on BPD symptoms at 16 months <sup class="c" data-ref="Juul2023" title="Source 246">246</sup> or 24 months; the long-term group had better quality of life, but 40% of that data was missing. <sup class="c" data-ref="Juul2025" title="Source 247">247</sup> Both intervals cross zero, the line of no difference. Other researchers argue the trial design was flawed. <sup class="c" data-ref="Philips2024" title="Source 412">412</sup>`,
     hook:`Juul 2023: 5 months of MBT matched 14 months on BPD symptoms; the design is disputed. <sup class="c" data-ref="Juul2023,Philips2024" title="Source 246,412">246,412</sup>`},
    {id:'c20',y:2020.5,s:'Cochrane 2020',n:'Pooled: MBT vs usual care',d:'Cochrane review, 3 trials per outcome · low certainty',kind:'rr',a:'favours MBT',b:'favours usual care',
     rows:[['Self-harm',.62,.49,.8],['Suicidality',.1,.04,.3]],ref:1,unit:'risk ratio (log scale)',tx:[],ms:[],
     txt:`Pooling three trials per outcome, the 2020 Cochrane review found MBT reduced self-harm (RR 0.62) and suicidality (RR 0.10) compared with usual care. All of this is low-certainty evidence. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup> A risk ratio below 1 favours MBT.`,
     hook:`Cochrane 2020, MBT vs TAU: self-harm RR 0.62; suicidality RR 0.10 (low certainty). <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`}
  ];
  const btns=$('#mbTrBtns');
  btns.innerHTML='<span class="kicker">Trial</span>'+TR.map(r=>`<button class="btn" data-mbtr="${r.id}" aria-pressed="${r.id===cur}">${r.s} · ${r.n}</button>`).join('');
  function drawT(){
    const N=vb(ts,'600 430','400 640'),R=TR.find(r=>r.id===cur);let o='';
    const W=N?400:600,x0=N?20:30,x1=W-(N?20:30);
    /* 1. publication timeline */
    const P0=1998,P1=2026,PX=y=>lerp(x0+10,x1-10,(y-P0)/(P1-P0)),py=N?40:42;
    o+=`<text x="${x0}" y="${py-22}" class="t-xs">PUBLISHED</text>`;
    o+=`<line x1="${x0}" x2="${x1}" y1="${py}" y2="${py}" class="axis"/>`;
    (N?[2000,2010,2020]:[2000,2005,2010,2015,2020,2025]).forEach(y=>o+=`<line x1="${f1(PX(y))}" x2="${f1(PX(y))}" y1="${py-3}" y2="${py+3}" class="axis"/><text x="${f1(PX(y))}" y="${py+16}" class="t-xs t-mid">${y}</text>`);
    TR.forEach(r=>{const on=r.id===cur;o+=`<circle cx="${f1(PX(r.y))}" cy="${py}" r="${on?7:4.5}" style="fill:${on?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.6"/>`});
    { const lx=clamp(PX(R.y),x0+60,x1-60);o+=`<text x="${f1(lx)}" y="${py-11}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">${R.s}</text>`; }
    /* 2. within-trial time strip */
    const sy=N?92:96,YX=y=>lerp(x0+10,x1-10,y/8.5);
    o+=`<text x="${x0}" y="${sy-14}" class="t-xs">YEARS SINCE TRIAL ENTRY</text>`;
    o+=`<line x1="${x0+10}" x2="${x1-10}" y1="${sy+16}" y2="${sy+16}" class="axis"/>`;
    [0,2,4,6,8].forEach(y=>o+=`<text x="${f1(YX(y))}" y="${sy+30}" class="t-xs t-mid">${y}</text>`);
    R.tx.forEach((b,i)=>{const yy=sy+(R.tx.length>1?i*9-4:0);o+=`<rect x="${f1(YX(b[0]))}" y="${yy}" width="${f1(Math.max(2,YX(b[1])-YX(b[0])))}" height="${R.tx.length>1?7:12}" rx="3" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1"/>`;
      o+=`<text x="${f1(YX(b[1])+5)}" y="${yy+(R.tx.length>1?7:10)}" class="t-xs" style="fill:var(--rx)">${b[2]}</text>`});
    R.ms.forEach(m=>{const mx=YX(m);o+=`<path d="M${f1(mx)} ${sy+9}l5 7l-5 7l-5 -7z" style="fill:var(--ink)"/>`});
    if(!R.tx.length&&!R.ms.length)o+=`<text x="${f1((x0+x1)/2)}" y="${sy+10}" class="t-xs t-mid">pooled across trials: no single timeline</text>`;
    else if(R.ms.length)o+=`<text x="${x1}" y="${sy-14}" class="t-xs t-end">◆ outcome measured</text>`;
    /* 3. results */
    const ry=N?156:162;
    o+=`<text x="${x0}" y="${ry}" class="t-sm" style="fill:var(--ink);font-weight:600">${R.n.toUpperCase()}</text>`;
    o+=`<text x="${x0}" y="${ry+15}" class="t-xs">${R.d}</text>`;
    const lgy=ry+34;
    if(R.kind==='bars'||R.kind==='qual'){
      o+=`<rect x="${x0}" y="${lgy-8}" width="10" height="10" rx="2" style="fill:var(--rx)"/><text x="${x0+15}" y="${lgy+1}" class="t-xs">${R.a}</text>`;
      const bx=x0+(N?190:260);o+=`<rect x="${bx}" y="${lgy-8}" width="10" height="10" rx="2" style="fill:var(--muted);opacity:.6"/><text x="${bx+15}" y="${lgy+1}" class="t-xs">${R.b}</text>`}
    const top=lgy+16,avail=(N?620:420)-top,rh=Math.min(N?84:58,avail/Math.max(R.rows.length,1));
    if(R.kind==='bars'){const lw=N?0:212,bx0=x0+lw,bw=x1-bx0-(N?46:56);
      R.rows.forEach((r,i)=>{const y=top+i*rh,[lab,a,b,u,mx,dir]=r;
        o+=`<text x="${x0}" y="${f1(y+11)}" class="t-xs" style="fill:var(--ink)">${lab}</text><text x="${x1}" y="${f1(y+11)}" class="t-xs t-end">${dir} is better</text>`;
        const yb=N?y+18:y+16;
        [[a,'var(--rx)',1],[b,'var(--muted)',.6]].forEach(([v,c,op],j)=>{const w=bw*clamp(v/mx)*grow,yy=yb+j*(N?15:14);
          o+=`<rect x="${bx0}" y="${f1(yy)}" width="${f1(Math.max(1.5,w))}" height="${N?12:11}" rx="3" style="fill:${c};opacity:${op}"/>`;
          o+=`<text x="${f1(bx0+Math.max(1.5,w)+5)}" y="${f1(yy+9.5)}" class="t-xs" style="fill:var(--ink)">${grow<1?'':(u==='%'?v+'%':v+u)}</text>`})})}
    else if(R.kind==='qual'){
      R.rows.forEach((r,i)=>{const y=top+i*(N?44:30),[lab,a,b]=r;
        o+=`<text x="${x0}" y="${f1(y+11)}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;
        const c1=x0+(N?8:200),c2=x0+(N?196:380);
        o+=`<text x="${c1}" y="${f1(y+(N?26:11))}" class="t-xs" style="fill:var(--rx);opacity:${f1(grow)}">● ${a}</text><text x="${c2}" y="${f1(y+(N?26:11))}" class="t-xs" style="opacity:${f1(grow)}">● ${b}</text>`});
      if(R.slope){const gy=top+R.rows.length*(N?44:30)+(N?30:28),gx0=x0+(N?30:200),gx1=x1-(N?20:30),gh=N?120:80;
        o+=`<line x1="${gx0}" x2="${gx0}" y1="${gy}" y2="${gy+gh}" class="axis"/><line x1="${gx0}" x2="${gx1}" y1="${gy+gh}" y2="${gy+gh}" class="axis"/>`;
        o+=`<text x="${gx0-6}" y="${gy+8}" class="t-xs t-end">high</text><text x="${gx1}" y="${gy+gh+14}" class="t-xs t-end">18 months</text><text x="${gx0}" y="${gy+gh+14}" class="t-xs">entry</text>`;
        const ln=(k,c,d)=>`<path d="M${gx0} ${gy+6}Q${f1(lerp(gx0,gx1,.4))} ${f1(gy+gh*k*.6)} ${f1(lerp(gx0,gx1,grow))} ${f1(lerp(gy+6,gy+gh*k,grow))}" style="fill:none;stroke:${c};stroke-width:2.4${d?';stroke-dasharray:5 4':''}"/>`;
        o+=ln(.62,'var(--muted)',1)+ln(.94,'var(--rx)',0);
        o+=`<text x="${f1(gx1-4)}" y="${f1(gy+gh*.62-6)}" class="t-xs t-end">SCM</text><text x="${f1(gx1-4)}" y="${f1(gy+gh*.94-6)}" class="t-xs t-end" style="fill:var(--rx)">MBT</text>`;
        o+=`<text x="${f1((gx0+gx1)/2)}" y="${gy-4}" class="t-xs t-mid" style="fill:var(--warn)">suicide attempts, hospitalisation: direction only, no values</text>`}}
    else{/* interval plot */
      const rr=R.kind==='rr',lo=rr?Math.log(.02):-R.lim,hi2=rr?Math.log(2):R.lim,lx0=x0+(N?10:200),lx1=x1-(N?10:30),
        X=v=>lerp(lx0,lx1,((rr?Math.log(v):v)-lo)/(hi2-lo)),ay=top+R.rows.length*(N?64:52)+6;
      o+=`<line x1="${f1(X(R.ref))}" x2="${f1(X(R.ref))}" y1="${top-4}" y2="${ay}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
      o+=`<line x1="${lx0}" x2="${lx1}" y1="${ay}" y2="${ay}" class="axis"/>`;
      (rr?[.02,.1,.5,1,2]:[-4,-2,0,2,4]).forEach(v=>o+=`<text x="${f1(X(v))}" y="${ay+14}" class="t-xs t-mid">${v}</text>`);
      o+=`<text x="${f1((lx0+lx1)/2)}" y="${ay+28}" class="t-xs t-mid">${R.unit}</text>`;
      o+=`<text x="${f1(X(R.ref)-6)}" y="${ay+42}" class="t-xs t-end" style="fill:var(--rx)">← ${R.a}</text><text x="${f1(X(R.ref)+6)}" y="${ay+42}" class="t-xs">${R.b} →</text>`;
      R.rows.forEach((r,i)=>{const y=top+i*(N?64:52),[lab,e,l,h]=r,cy=y+(N?30:22),ref=R.ref,g=v=>rr?Math.exp(lerp(Math.log(ref),Math.log(v),grow)):lerp(ref,v,grow);
        o+=`<text x="${N?x0:x0}" y="${f1(y+11)}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;
        o+=`<line x1="${f1(X(g(l)))}" x2="${f1(X(g(h)))}" y1="${f1(cy)}" y2="${f1(cy)}" style="stroke:var(--rx);stroke-width:2"/><rect x="${f1(X(g(e))-5)}" y="${f1(cy-5)}" width="10" height="10" style="fill:var(--rx)"/>`;
        if(grow>=1)o+=`<text x="${f1(X(h)+6)}" y="${f1(cy+4)}" class="t-xs" style="fill:var(--ink)">${e} (${l} to ${h})</text>`})}
    ts.innerHTML=o;
    $('#mbTrNote').innerHTML=noteHTML({k:R.s+' · '+R.d,t:R.n,txt:R.txt,hook:R.hook,
      pt:R.kind==='rr'?'A risk ratio of 0.62 means about 38% fewer people with the outcome in the MBT groups, on average, across these trials.':R.kind==='ci'?'The short course did as well as the long one in this trial: the uncertainty bars cross the no-difference line.':'These are averages for groups of people in a study. They cannot predict how any one person will do.'});
    $('#mbTrCap').innerHTML='Outcome values exactly as the abstracts report them; bars are drawn to scale within each row. Where an abstract reports a direction but no number, no bar is drawn. Population statistics, not individual predictions.';
  }
  btns.addEventListener('click',e=>{const b=e.target.closest('[data-mbtr]');if(!b)return;cur=b.dataset.mbtr;
    $$('[data-mbtr]',btns).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopG)stopG();grow=0;drawT();stopG=animate(650,p=>{grow=ease(p);drawT()},()=>{stopG=null;grow=1;drawT()});
    /* a hidden tab may never run the animation frames: settle on the full bars regardless */
    setTimeout(()=>{if(grow<1){if(stopG)stopG();stopG=null;grow=1;drawT()}},900)});
  redraws.mbt=(prev=>()=>{prev&&prev();drawT()})(redraws.mbt);
  drawT();
};
/* =============== 3.3 Schema therapy & TFP =============== */
inits.schema=()=>{
  const svg=$('#scSvg'),rg=$('#scT');let view='st',setSt=()=>{};
  /* ---------- schema-mode stage ---------- */
  const MODES=[
    {k:'vc',n:['Vulnerable','child'],c:'var(--mood)',kid:1,say:['Everyone leaves.','I am all alone.']},
    {k:'ac',n:['Angry /','impulsive','child'],c:'var(--storm)',kid:1,say:['How dare they!','I will show them.']},
    {k:'pp',n:['Punitive','parent'],c:'var(--med)',say:['You are too much.','You deserve this.']},
    {k:'dp',n:['Detached','protector'],c:'var(--muted)',say:['Feel nothing.','Shut it all off.']},
    {k:'ha',n:['Healthy','adult'],c:'var(--accent)',say:['That hurt. I can','ask what happened.']}
  ];
  const ST=[
    {from:0,at:.06,k:'The trigger',t:'A text cancels the plans',
     txt:`A friend cancels plans by text an hour before. Young's schema-mode model proposes that people with BPD flip between four maladaptive modes: the abandoned/abused ("vulnerable") child, the angry/impulsive child, the punitive parent and the detached protector. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup> The healthy adult mode, on the right, starts small: it was lowest in BPD and highest in non-patients in two experimental studies. <sup class="c" data-ref="Arntz2005Modes,Lobbestael2005" title="Source 14,313">14,313</sup>`,
     pt:`Schema therapy describes "modes": different states, almost like different parts of you, that can take over in a moment of stress.`,
     hook:`BPD modes: detached protector, punitive parent, abandoned/abused child, angry/impulsive child; healthy adult is weak. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>`},
    {from:.16,at:.22,k:'Mode 1',t:'The vulnerable child',
     txt:`The first mode to step forward is the abandoned or abused child: the hurt, frightened state that reads the cancelled plan as being left. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup> The same four modes were found in BPD in a second study. <sup class="c" data-ref="Lobbestael2005" title="Source 313">313</sup>`,
     pt:`A small disappointment can feel like being abandoned. That is the "vulnerable child" mode speaking.`,
     hook:`Lobbestael 2005: the four BPD modes replicated; healthy adult low in BPD, high in non-patients. <sup class="c" data-ref="Lobbestael2005" title="Source 313">313</sup>`},
    {from:.3,at:.36,k:'Mode 2',t:'The angry/impulsive child',
     txt:`Hurt flips into rage or urgent impulses. The angry/impulsive child mode is one of the four that people with BPD scored highest on. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup> The arrows show modes handing over to each other: the model is about flipping between states, not a fixed type.`,
     pt:`Hurt can turn into anger very fast, with an urge to do something right now.`,
     hook:`The schema-mode model is about flipping between states: people with BPD scored highest on all four maladaptive modes. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>`},
    {from:.44,at:.5,k:'Mode 3',t:'The punitive parent',
     txt:`After the anger, an inner critic turns on the person: harsh, punishing, self-blaming. People with BPD scored highest on this mode alongside the other three maladaptive ones. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>`,
     pt:`A harsh inner voice can follow: "You ruin everything." Schema therapy names this the "punitive parent".`,
     hook:`Punitive parent = the self-punishing inner critic mode. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>`},
    {from:.58,at:.64,k:'Mode 4',t:'The detached protector',
     txt:`Finally everything shuts down: numbness, withdrawal, nothing felt. In the experimental test, a stress film raised the detached protector mode more in people with BPD than in either control group. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>`,
     pt:`When it all gets too much, you may go numb or switch off. That shutdown is the "detached protector".`,
     hook:`Arntz 2005: stress raised the detached protector more in BPD than in controls. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>`},
    {from:.72,at:.9,k:'Years of therapy',t:'Growing the healthy adult',
     txt:`Over sessions the healthy adult grows and the other modes quieten (schematic). Trials used long, frequent therapy: twice a week for 3 years. <sup class="c" data-ref="GiesenBloo2006" title="Source 177">177</sup> After 1.5 years of schema therapy in regular care, 42% had recovered from BPD. <sup class="c" data-ref="Nadort2009" title="Source 359">359</sup> Combined group and individual schema therapy beat usual care on BPD severity (d 1.14). <sup class="c" data-ref="Arntz2022GST" title="Source 15">15</sup> The technique names that appear are labels for orientation only; this companion's sources do not describe how each one works.`,
     pt:`Therapy aims to make the calm, caring "healthy adult" side stronger, so it can look after the hurt parts instead of being overrun by them.`,
     hook:`Schema therapy evidence: beat TFP on recovery over 3 years (RR 2.18); combined individual + group beat usual care. <sup class="c" data-ref="GiesenBloo2006,Arntz2022GST" title="Source 15,177">15,177</sup>`}
  ];
  const TFP=[
    {from:0,at:.08,k:'The model',t:'A split inner world',
     txt:`TFP comes from Kernberg's 1967 description of "borderline personality organization": a middle level of personality organisation marked by primitive defences such as splitting and projective identification, identity diffusion and lapses in reality testing. <sup class="c" data-ref="Kernberg1967,Gunderson2009Ontogeny" title="Source 203,259">203,259</sup> The drawing shows splitting as two halves held apart: an all-good picture of self and other, and an all-bad one.`,
     pt:`Splitting means seeing yourself or someone else as all good or all bad, with nothing in between, and flipping from one to the other.`,
     hook:`Kernberg 1967, borderline personality organisation: splitting, projective identification, identity diffusion, lapses in reality testing. <sup class="c" data-ref="Kernberg1967" title="Source 259">259</sup>`},
    {from:.2,at:.28,k:'All-good',t:'Idealisation',
     txt:`While the good half is lit, the other person is perfect and the self is loved. Because the bad half is kept separate, it cannot temper the picture. This is a schematic of the model, not a measured process. <sup class="c" data-ref="Kernberg1967" title="Source 259">259</sup>`,
     pt:`Someone new can seem perfect, the one person who really understands you.`,
     hook:`Splitting keeps contradictory images apart; idealisation and devaluation are its two faces.`},
    {from:.4,at:.48,k:'All-bad',t:'The flip',
     txt:`One frustration and the same person flips into the all-bad half: cruel, rejecting, and the self worthless. In a three-way trial, only TFP changed irritability and verbal and direct assault. <sup class="c" data-ref="Clarkin2007" title="Source 104">104</sup>`,
     pt:`After one letdown, the same person can suddenly seem all bad, and you may feel all bad too.`,
     hook:`Clarkin 2007 (TFP vs DBT vs supportive therapy, 90 patients): all improved; TFP and DBT improved suicidality; only TFP changed irritability and assault measures. <sup class="c" data-ref="Clarkin2007" title="Source 104">104</sup>`},
    {from:.6,at:.67,k:'The frame',t:'A contract around the therapy',
     txt:`The dashed border is a schematic frame around the therapy (its terms are not described in this companion's sources). A one-year trial against experienced community psychotherapists found less dropout (38.5% vs 67.3%), fewer suicide attempts (d 0.8) and fewer inpatient admissions (d 0.5) with TFP; self-harm did not change in either group. <sup class="c" data-ref="Doering2010" title="Source 130">130</sup>`,
     pt:`TFP is a structured, long-term therapy, and it kept more people in treatment than usual therapy in one trial.`,
     hook:`Doering 2010: TFP dropout 38.5% vs 67.3% with community therapists; borderline symptoms d 1.6. <sup class="c" data-ref="Doering2010" title="Source 130">130</sup>`},
    {from:.78,at:.92,k:'Integration',t:'Halves come together',
     txt:`The aim drawn here is integration: the two halves slide together into one whole picture in which the same person can be both loving and disappointing. In the Dutch head-to-head trial both TFP and schema therapy helped on all measures, though schema therapy did better on recovery and TFP had a higher dropout risk. <sup class="c" data-ref="GiesenBloo2006" title="Source 177">177</sup>`,
     pt:`Getting better can mean seeing people, and yourself, as mixed: good and bad at once, and still worth keeping.`,
     hook:`Giesen-Bloo 2006: both improved; schema therapy > TFP on recovery (RR 2.18) and retention. <sup class="c" data-ref="GiesenBloo2006" title="Source 177">177</sup>`}
  ];
  const CAP={st:'<b>Schematic.</b> The figures and their activation bars illustrate the schema-mode model; they are not measurements. Mode names: <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>.',
    tfp:'<b>Schematic.</b> The halves illustrate Kernberg\'s model of splitting; the drawing is not a measured process. <sup class="c" data-ref="Kernberg1967" title="Source 259">259</sup>'};
  /* activation 0..1 of each mode at time t (schematic) */
  function act(i,t){const pk=[.22,.36,.5,.64][i],ther=ramp(t,.72,.98);
    if(i===4)return lerp(.18,1,ease(ther));
    let a=.12+.88*Math.exp(-Math.pow((t-pk)/.07,2));
    if(i===3&&t>.6&&t<.74)a=Math.max(a,.85);
    if(t<.12)a=.12;
    return clamp(lerp(a,.14,ease(ther)))}
  function drawST(t,N){let o='';const p=phaseOf(ST,t);
    const W=N?400:720,xs=N?[44,122,200,278,356]:[90,225,360,495,630],base=N?300:282,ther=ramp(t,.72,.98);
    /* trigger card */
    o+=`<rect x="${N?20:200}" y="${N?16:14}" width="${N?360:320}" height="34" rx="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    o+=`<text x="${W/2}" y="${N?37:35}" class="t-sm t-mid" style="fill:var(--ink)">${ther>0?'Therapy: '+f1(ther*3)+' of 3 years, twice weekly':'Trigger: "Sorry, can\'t make it tonight."'}</text>`;
    /* stage floor */
    o+=`<path d="M${N?10:30} ${base+8}H${W-(N?10:30)}" style="stroke:var(--line);stroke-width:2"/>`;
    let active=-1;if(p>=1&&p<=4)active=p-1;
    /* hand-over arrows between successive modes */
    const SZ=MODES.map((m,i)=>{const on=i===active||(i===4&&p===5);return (m.kid?(N?52:78):(N?66:100))*(i===4?lerp(.62,1.3,ease(ther)):1)*(on?1.12:1)});
    for(let i=0;i<3;i++){if(p>=i+2&&p<=4){const y=base-(N?96:132);o+=`<path d="M${xs[i]+18} ${y}Q${(xs[i]+xs[i+1])/2} ${y-18} ${xs[i+1]-18} ${y}" class="arrow" style="stroke:var(--storm);opacity:.6" marker-end="url(#scAr)"/>`}}
    MODES.forEach((m,i)=>{const a=act(i,t),on=i===active||(i===4&&p===5),sz=SZ[i],
        fy=base-sz+(on?6:0);
      o+=`<g style="opacity:${f1(.35+.65*a)}">`+person(xs[i],fy,sz,m.c)+'</g>';
      if(on&&i<4)o+=`<ellipse cx="${xs[i]}" cy="${base+8}" rx="${f1(sz*.45)}" ry="5" style="fill:${m.c};opacity:.35"/>`;
      m.n.forEach((ln,j)=>o+=`<text x="${xs[i]}" y="${base+24+j*12}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${ln}</text>`);
      const bw=N?56:80,by=base+60;
      o+=`<rect x="${xs[i]-bw/2}" y="${by}" width="${bw}" height="6" rx="3" style="fill:var(--panel-2)"/><rect x="${xs[i]-bw/2}" y="${by}" width="${f1(bw*a)}" height="6" rx="3" style="fill:${m.c}"/>`});
    o+=`<text x="${N?10:30}" y="${base+82}" class="t-xs">bars: how active each mode is (schematic)</text>`;
    /* speech bubble of the active mode */
    const si=p===5?4:active;
    if(si>=0){const m=MODES[si],bw=N?190:200,bx=clamp(xs[si]-bw/2,N?6:20,W-bw-(N?6:20)),by=N?68:70;
      o+=bubble(bx,by,bw,44,{tx:xs[si],ty:base-SZ[si]+2,lines:m.say,col:m.c})}
    /* therapy technique labels */
    if(p===5){const L=['limited reparenting','imagery rescripting','chair work'];
      L.forEach((s,i)=>{const a=ramp(t,.76+i*.05,.8+i*.05);if(!a)return;const x=N?20:40,y=(N?140:150)+i*18;
        o+=`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--accent);opacity:${f1(a)}">◆ ${s}</text>`});
      o+=`<text x="${N?20:40}" y="${(N?140:150)+56}" class="t-xs" style="opacity:${f1(ramp(t,.9,.94))}">technique names, for orientation</text>`}
    return {o,p}}
  /* ---------- TFP stage ---------- */
  function drawTFP(t,N){let o='';const p=phaseOf(TFP,t);
    const W=N?400:720,cx=W/2,cy=N?250:205,R=N?110:120,gap=lerp(N?40:110,0,ease(ramp(t,.8,.96))),
      litG=p===1?1:p===4?.8:.35,litB=p===2?1:p===4?.8:.35,mix=ease(ramp(t,.86,.98));
    if(p>=3){const fr=R+gap+(N?26:34);o+=`<rect x="${f1(cx-fr-(N?0:40))}" y="${f1(cy-R-(N?44:46))}" width="${f1(2*fr+(N?0:80))}" height="${f1(2*R+(N?88:92))}" rx="18" style="fill:none;stroke:var(--rx);stroke-width:1.6;stroke-dasharray:7 5;opacity:${f1(ramp(t,.6,.64))}"/>`;
      o+=`<text x="${cx}" y="${f1(cy-R-(N?30:30))}" class="t-xs t-mid" style="fill:var(--rx);opacity:${f1(ramp(t,.6,.64))}">treatment frame / contract (schematic)</text>`}
    const half=(side,col,lit,lab,sl,ol)=>{const x=cx+side*gap,d=side<0?`M${f1(x)} ${f1(cy-R)}A${R} ${R} 0 0 0 ${f1(x)} ${f1(cy+R)}Z`:`M${f1(x)} ${f1(cy-R)}A${R} ${R} 0 0 1 ${f1(x)} ${f1(cy+R)}Z`;
      let s=`<path d="${d}" style="fill:${col};opacity:${f1(.12+.3*lit)};stroke:${col};stroke-width:${lit>.9?2.4:1.4}"/>`;
      const px=x+side*R*.5;
      s+=person(px-(N?20:24),cy-(N?44:46),N?36:40,'var(--self)',{op:.4+.6*lit})+person(px+(N?20:24),cy-(N?44:46),N?36:40,'var(--other)',{op:.4+.6*lit});
      s+=`<text x="${f1(px)}" y="${f1(cy+14)}" class="t-sm t-mid" style="fill:${col};font-weight:600">${lab}</text>`;
      s+=`<text x="${f1(px)}" y="${f1(cy+32)}" class="t-xs t-mid" style="fill:var(--ink)">self: ${sl}</text><text x="${f1(px)}" y="${f1(cy+46)}" class="t-xs t-mid" style="fill:var(--ink)">other: ${ol}</text>`;
      return s};
    o+=half(-1,'var(--accent)',litG,'ALL-GOOD','loved','perfect');
    o+=half(1,'var(--storm)',litB,'ALL-BAD','worthless','cruel');
    if(gap>2)o+=`<line x1="${cx}" x2="${cx}" y1="${f1(cy-R+10)}" y2="${f1(cy+R-10)}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 4;opacity:${f1(gap/(N?40:110))}"/><text x="${cx}" y="${f1(cy+R+16)}" class="t-xs t-mid" style="opacity:${f1(gap/(N?40:110))}">split</text>`;
    if(mix>0){o+=`<circle cx="${cx}" cy="${cy}" r="${R}" style="fill:none;stroke:var(--brand);stroke-width:${f1(1+2*mix)};opacity:${f1(mix)}"/>`;
      o+=`<text x="${cx}" y="${f1(cy+R+18)}" class="t-sm t-mid" style="fill:var(--brand);opacity:${f1(mix)}">one whole, mixed picture</text>`}
    /* flip arrow while splitting is active */
    if(p===2||p===1){const y=cy-R-(N?14:12);o+=`<path d="M${f1(cx-(N?60:120))} ${y}Q${cx} ${y-24} ${f1(cx+(N?60:120))} ${y}" class="arrow" style="stroke:var(--storm)" marker-end="url(#scAr)"/>`;
      if(p===2)o+=`<text x="${cx}" y="${y-22}" class="t-xs t-mid" style="fill:var(--storm)">one frustration flips the picture</text>`}
    o+=`<text x="${N?20:30}" y="${N?30:28}" class="t-sm" style="fill:var(--ink)">${['How the self and others are held in mind','All-good half lit','All-bad half lit','Agreeing the frame','Integration'][p]}</text>`;
    return {o,p}}
  function draw(t){const N=vb(svg,'720 400','400 '+(view==='st'?'420':'460'));
    const r=view==='st'?drawST(t,N):drawTFP(t,N);
    svg.innerHTML=`<defs>${marker('scAr','var(--storm)')}</defs>`+r.o+`<text x="${N?200:690}" y="${N?(view==='st'?412:452):392}" class="t-xs ${N?'t-mid':'t-end'}" style="fill:var(--warn)">SCHEMATIC</text>`;
    setSt(r.p);const S=(view==='st'?ST:TFP)[r.p];$('#scNote').innerHTML=noteHTML(S);
    if(view==='st'){const top=MODES.map((m,i)=>[act(i,t),i]).sort((a,b)=>b[0]-a[0])[0][1];
      $('#scRead').innerHTML=`<span>leading mode <b>${MODES[top].n.join(' ')}</b></span><span>healthy adult <b>${Math.round(act(4,t)*100)}%</b> (schematic)</span><span>therapy <b>${f1(ramp(t,.72,.98)*3)} of 3 years</b></span>`}
    else $('#scRead').innerHTML=`<span>view <b>${['split','all-good','all-bad','frame','integrating'][r.p]}</b></span><span>trial frequency <b>twice weekly, 3 years</b> (Giesen-Bloo 2006)</span>`;
  }
  const stop=playWire(rg,$('#scPlay'),draw,22000,'Replay','schema');
  function wire(){const old=$('#scSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,view==='st'?ST:TFP,rg,draw,stop)}
  $$('[data-scv]').forEach(b=>b.addEventListener('click',()=>{stop();view=b.dataset.scv;$$('[data-scv]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#scCap').innerHTML=CAP[view];wire();draw(+rg.value)}));
  $('#scCap').innerHTML=CAP.st;wire();draw(+rg.value);

  /* ---------- recovery curves, Giesen-Bloo / van Asselt ---------- */
  const rs=$('#scRec'),rr=$('#scRecT');
  const curve=(E,y)=>E*Math.pow(clamp(y/4),1.5);
  function drawR(u){const N=vb(rs,'600 330','400 380'),Y=u*4;let o='';
    const x0=N?46:60,x1=N?384:570,y0=N?40:36,y1=N?300:270,X=y=>lerp(x0,x1,y/4),V=v=>lerp(y1,y0,v/60);
    o+=`<rect x="${f1(X(0))}" y="${y0}" width="${f1(X(3)-X(0))}" height="${y1-y0}" style="fill:var(--rx-soft);opacity:.55"/><text x="${f1(X(1.5))}" y="${y0+14}" class="t-xs t-mid" style="fill:var(--rx)">treatment: 3 years, twice weekly</text>`;
    [0,20,40,60].forEach(v=>o+=`<line x1="${x0}" x2="${x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
    [0,1,2,3,4].forEach(y=>o+=`<text x="${f1(X(y))}" y="${y1+15}" class="t-xs t-mid">${y}</text>`);
    o+=`<text x="${x1}" y="${y1+30}" class="t-xs t-end">years since entry</text><text x="${x0}" y="${y0-14}" class="t-xs">RECOVERED FROM BPD</text>`;
    const path=E=>{let d='';for(let i=0;i<=80;i++){const y=Y*i/80;d+=(i?'L':'M')+f1(X(y))+' '+f1(V(curve(E,y)))}return d};
    o+=`<path d="${path(52)}" style="fill:none;stroke:var(--accent);stroke-width:2.6"/><path d="${path(29)}" style="fill:none;stroke:var(--storm);stroke-width:2.6;stroke-dasharray:6 4"/>`;
    if(Y>=3){o+=`<line x1="${f1(X(3))}" x2="${f1(X(3))}" y1="${y0+20}" y2="${y1}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3"/><text x="${f1(X(3)-5)}" y="${f1(V(46))}" class="t-xs t-end" style="fill:var(--ink)">3 years: RR 2.18</text><text x="${f1(X(3)-5)}" y="${f1(V(46)+12)}" class="t-xs t-end">for recovery, P = .04</text>`}
    if(Y>=3.98){[[52,'var(--accent)','52%'],[29,'var(--storm)','29%']].forEach(([v,c,l])=>{o+=`<circle cx="${f1(X(4))}" cy="${f1(V(v))}" r="6" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><text x="${f1(X(4)-10)}" y="${f1(V(v)-9)}" class="t-xs t-end" style="fill:${c};font-weight:600">${l}</text>`})}
    o+=`<rect x="${x0+8}" y="${y0+26}" width="10" height="3" style="fill:var(--accent)"/><text x="${x0+22}" y="${y0+30}" class="t-xs">schema therapy</text><rect x="${x0+8}" y="${y0+40}" width="10" height="3" style="fill:var(--storm)"/><text x="${x0+22}" y="${y0+44}" class="t-xs">TFP</text>`;
    rs.innerHTML=o;
    $('#scRecRead').innerHTML=`<span>year <b>${f1(Y)}</b></span>`+(Y>=3.98?`<span>recovered <b>52% vs 29%</b></span><span>mean 4-year cost <b>EUR 37,826 vs 46,795</b></span>`:`<span>4-year values appear at year 4</span>`);
  }
  playWire(rr,$('#scRecPlay'),drawR,7000,'Replay','schema');
  drawR(+rr.value);
  $('#scRecNote').innerHTML=noteHTML({k:'Giesen-Bloo 2006 · 88 patients',t:'Schema therapy recovered more people',
    txt:`After 3 years, more schema therapy patients had recovered (relative risk 2.18; P = .04) or reliably improved (relative risk 2.33; P = .009), and TFP carried a higher dropout risk (P = .01). <sup class="c" data-ref="GiesenBloo2006" title="Source 177">177</sup> The cost-effectiveness paper reported 52% vs 29% recovered over 4 years, at lower mean cost with schema therapy. <sup class="c" data-ref="vanAsselt2008" title="Source 542">542</sup>`,
    pt:`In this trial, about half the people in schema therapy had recovered after 4 years, compared with about 3 in 10 in TFP. Both groups improved.`,
    hook:`Giesen-Bloo 2006: schema therapy beat TFP on recovery (RR 2.18) and retention. Note: a commonly quoted "45.5% vs 23.8%" is not in the abstract; the checked figures are RR 2.18 and 52% vs 29% at 4 years. <sup class="c" data-ref="GiesenBloo2006,vanAsselt2008" title="Source 177,542">177,542</sup>`});

  /* ---------- Arntz 2022 group schema therapy ---------- */
  const gs=$('#scGst');let gv='eff';
  function drawG(){const N=vb(gs,'600 290',gv==='eff'?'400 420':'400 320');let o='';const W=N?400:600,x0=N?16:24,x1=W-(N?16:24);
    if(gv==='eff'){const R=[['Either schema format vs usual care',.73,.29,1.18],['IGST vs usual care',1.14],['IGST vs PGST',.84],['PGST vs usual care',.3,-.29,.89]];
      const lx0=N?x0+20:x0+230,lx1=x1-(N?20:20),X=v=>lerp(lx0,lx1,(v+.5)/2),rh=N?84:56,top=N?40:36;
      o+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${top-10}" y2="${top+R.length*rh}" style="stroke:var(--ink);stroke-dasharray:3 3"/>`;
      [-.5,0,.5,1,1.5].forEach(v=>o+=`<text x="${f1(X(v))}" y="${top+R.length*rh+14}" class="t-xs t-mid">${v}</text>`);
      o+=`<text x="${f1((lx0+lx1)/2)}" y="${top+R.length*rh+28}" class="t-xs t-mid">Cohen d for BPD severity (right = first arm better)</text>`;
      R.forEach((r,i)=>{const y=top+i*rh,cy=y+(N?30:4);o+=`<text x="${x0}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${r[0]}</text>`;
        if(r.length>2)o+=`<line x1="${f1(X(r[2]))}" x2="${f1(X(r[3]))}" y1="${cy}" y2="${cy}" style="stroke:var(--rx);stroke-width:2"/>`;
        o+=`<rect x="${f1(X(r[1])-5)}" y="${cy-5}" width="10" height="10" style="fill:var(--rx)"/><text x="${f1(clamp(X(r[1]),lx0+70,lx1-70))}" y="${cy+20}" class="t-xs t-mid" style="fill:var(--ink)">d ${r[1]}${r.length>2?` (${r[2]} to ${r[3]})`:' (CI not in abstract)'}</text>`});
      $('#scGstCap').innerHTML='Mainly-group schema therapy alone did not beat usual care: its interval crosses zero. Combined individual and group schema therapy did best. <sup class="c" data-ref="Arntz2022GST" title="Source 15">15</sup>'}
    else{const A=[['IGST · individual + group',.82,.74],['PGST · mainly group',.72,.62],['Optimal usual care',.73,.64]],top=N?44:40,rh=N?90:66,bx0=N?x0:x0+190,bw=x1-bx0-90;
      o+=`<text x="${x0}" y="${top-18}" class="t-xs">PROPORTION STILL IN TREATMENT</text>`;
      A.forEach((a,i)=>{const y=top+i*rh;o+=`<text x="${x0}" y="${y+(N?4:16)}" class="t-xs" style="fill:var(--ink)">${a[0]}</text>`;
        [[a[1],'1 year',1],[a[2],'2 years',.6]].forEach(([v,l,op],j)=>{const yy=y+(N?12:6)+j*(N?20:18);
          o+=`<rect x="${bx0}" y="${yy}" width="${f1(bw*v)}" height="13" rx="3" style="fill:${i===0?'var(--rx)':i===1?'var(--accent)':'var(--muted)'};opacity:${op}"/><text x="${f1(bx0+bw*v+6)}" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${v.toFixed(2)} · ${l}</text>`})});
      $('#scGstCap').innerHTML='Retention at 1 and 2 years as published. Population statistics, not individual predictions. <sup class="c" data-ref="Arntz2022GST" title="Source 15">15</sup> Schema therapy had the lowest dropout overall in a survival meta-analysis; group formats had the highest. <sup class="c" data-ref="Arntz2023Dropout" title="Source 16">16</sup>'}
    gs.innerHTML=o}
  $$('[data-scg]').forEach(b=>b.addEventListener('click',()=>{gv=b.dataset.scg;$$('[data-scg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawG()}));
  redraws.schema=(prev=>()=>{prev&&prev();drawG()})(redraws.schema);
  drawG();
};
/* =============== 3.4 Good psychiatric management =============== */
inits.gpm=()=>{
  const svg=$('#gpSvg'),rg=$('#gpT');let view='gpm',setSt=()=>{};
  const RUNG=[
    {w:'GPM + psychoed.',nw:'GPM',n:'GPM and psychoeducation',who:['Generalist clinicians,','once weekly'],tr:['GPM-A: a one-day staff','workshop (uncontrolled)']},
    {w:'STEPPS groups',nw:'Groups',n:'Structured group programme',who:['Manualised group, 20 weeks,','added to usual care'],tr:['Systems component involves','the support network']},
    {w:'DBT · MBT · ST',nw:'Specialist',n:'Specialist psychotherapy',who:['Specialist teams'],tr:['DBT: weekly consultation team','MBT: limited extra training']},
    {w:'Crisis care',nw:'Crisis',n:'Crisis care and brief admission',who:['Self-admission agreed','in advance (Skåne model)'],tr:['Up to 3 days, at most','3 times a month']}
  ];
  /* level of care (0..3) the person needs, as knots [t, level]; the specialist-only view waits for a place */
  const KN={gpm:[[0,0],[.3,0],[.36,1],[.48,1],[.53,2],[.64,2],[.68,3],[.76,3],[.8,2],[.86,1],[.93,0],[1,0]],
    spec:[[0,0],[.5,0],[.53,2],[.64,2],[.68,3],[.76,3],[.8,2],[.9,2],[.93,0],[1,0]]};
  const lvl=t=>{const k=KN[view];if(t<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(t<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*ease((t-a[0])/(b[0]-a[0]))}return k[k.length-1][1]};
  const STEPS=[
    {from:0,at:.06,k:'Month 0 · diagnosis',t:'Diagnosis, said out loud',
     txt:`GPM starts by naming the disorder and explaining it. APA 2024 recommends (1C) "a collaborative discussion about their diagnosis and treatment, which includes psychoeducation related to the disorder". <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup> In 50 young women, a psychoeducation workshop within a week of being told the diagnosis gave a greater fall in impulsivity and stormy relationships than a waitlist. <sup class="c" data-ref="Zanarini2008Psychoed" title="Source 583">583</sup> Yet 57% of 134 US psychiatrists surveyed had at some point not disclosed a BPD diagnosis. <sup class="c" data-ref="Sisti2016" title="Source 485">485</sup>`,
     sp:`On a specialist-only pathway, the diagnosis may come with a referral and a wait.`,
     pt:`Being told the name of what you have, and what it means, is a treatment step in itself. It helps people make sense of their experiences.`,
     hook:`APA 2024 (1C): collaborative discussion of diagnosis with psychoeducation. Withholding the diagnosis is now generally seen as unethical. <sup class="c" data-ref="APA2024Guideline,Sims2022" title="Source 12,484">12,484</sup>`},
    {from:.16,at:.22,k:'Months 2–7 · the model',t:'Interpersonal hypersensitivity',
     txt:`GPM "medicalizes the disorder, emphasizes psychoeducation, and focuses on social adaptation". <sup class="c" data-ref="Gunderson2018GPM" title="Source 208">208</sup> Its explanatory model comes from Gunderson and Lyons-Ruth's "interpersonal hypersensitivity" phenotype: an inherited reactivity to interpersonal stress that, together with parents' own vulnerabilities, may escalate into disorganised attachment and later BPD. <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="GundersonLyonsRuth2008" title="Source 209">209</sup> The person stays on the base step: once-weekly generalist care.`,
     sp:`The person is still waiting at the base, without structured care.`,
     pt:`GPM explains BPD as being extra sensitive to how others treat you: feeling connected keeps things calm; feeling rejected sets off the storm.`,
     hook:`GPM = once-weekly, generalist, medicalizes the disorder, psychoeducation, social adaptation. <sup class="c" data-ref="Gunderson2018GPM" title="Source 208">208</sup>`},
    {from:.32,at:.4,k:'Months 8–12 · step up',t:'Add a structured group',
     txt:`When needs grow, a structured group can be added. STEPPS is a 20-week, manual-based group programme combining cognitive-behavioural elements and skills training with a "systems" component, added to usual care. <sup class="c" data-ref="Blum2008STEPPS" title="Source 60">60</sup> In 124 people, STEPPS improved ZAN-BPD total and all four domains, impulsivity, mood and global functioning, but not suicide attempts, self-harm or hospitalisation; dropout was high in both arms. <sup class="c" data-ref="Blum2008STEPPS" title="Source 60">60</sup> A 14-week emotion regulation group added to therapy reduced self-harm in 61 women, with gains kept at 9 months. <sup class="c" data-ref="Gratz2014ERGT" title="Source 188">188</sup>`,
     sp:`The specialist-only pathway has no middle step: the person keeps waiting.`,
     pt:`A skills group gives tools for handling emotions and involves the people around you.`,
     hook:`STEPPS: 20-week add-on group with a systems component; improves BPD symptoms, not suicide attempts or self-harm. <sup class="c" data-ref="Blum2008STEPPS" title="Source 60">60</sup>`},
    {from:.5,at:.57,k:'Months 12–15 · specialist',t:'Specialist therapy if not responding',
     txt:`GPM's authors keep intensive therapies for people who do not respond to generalist care. <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Gunderson2018GPM" title="Source 208">208</sup> A 2024 review notes that "almost half of the patients do not respond sufficiently" to psychotherapy and finds no approach superior. <sup class="c" data-ref="Leichsenring2024WP" title="Source 300">300</sup> Specialist options are covered in <a href="#dbt" data-go="dbt">DBT</a>, <a href="#mbt" data-go="mbt">MBT</a> and <a href="#schema" data-go="schema">Schema therapy &amp; TFP</a>.`,
     sp:`A specialist place opens: the person jumps straight from waiting to the specialist step.`,
     pt:`If things are not improving, more intensive specialist therapy is the next step up.`,
     hook:`Stepped care: start generalist; step up for non-response (Hypothesis, Gunderson 2018). <sup class="c" data-ref="Gunderson2018GPM" title="Source 208">208</sup>`},
    {from:.66,at:.72,k:'Month 17 · crisis',t:'Safety plan and brief admission',
     txt:`A crisis takes the person to the top step. APA 2024 implementation text calls for monitoring suicide risk and "individualized safety plans". <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup> Safety planning-type interventions cut suicidal behaviour (RR 0.570; NNT 16) in mixed populations. <sup class="c" data-ref="Nuij2021" title="Source 391">391</sup> In the Brief Admission Skåne model, people agree a contract in advance and can self-admit for up to 3 days, at most 3 times a month <sup class="c" data-ref="Liljedahl2017BA" title="Source 308">308</sup>; its trial found no advantage in hospital days at 12 months. <sup class="c" data-ref="Westling2019BA" title="Source 549">549</sup> A whole-of-service stepped-care model cut bed days per admission from 13.46 to 4.28. <sup class="c" data-ref="Grenyer2018Stepped" title="Source 189">189</sup>`,
     sp:`Crisis care is the same on both pathways.`,
     pt:`A safety plan is a short written plan made with a clinician: warning signs, things that help, people to call, and crisis numbers. Short, planned hospital stays can be part of it.`,
     hook:`Stepped care (Grenyer 2018 cluster RCT): bed days per admission 13.46 → 4.28; cost-neutral. <sup class="c" data-ref="Grenyer2018Stepped" title="Source 189">189</sup>`},
    {from:.8,at:.95,k:'Months 19–24 · step down',t:'"Get a life": work and relationships',
     txt:`As the crisis settles, care steps back down. GPM focuses on social adaptation <sup class="c" data-ref="Gunderson2018GPM" title="Source 208">208</sup> because symptom remission is not the same as a full life: 2 years after DBT or GPM, about two-thirds of people had reached diagnostic remission, but 53% were neither employed nor in school and 39% were receiving psychiatric disability support. <sup class="c" data-ref="McMain2012" title="Source 339">339</sup> In Montreal, people in extended care for 18–24 months improved no more than those staying 6–12 months. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Laporte2018Stepped" title="Source 294">294</sup>`,
     sp:`In this view the person also steps down, but only after a fixed specialist course.`,
     pt:`Getting better is not only fewer crises. GPM keeps asking about work, study and relationships, the things that make a life.`,
     hook:`McMain 2012: ~two-thirds remitted, but 53% not working or studying at 36 months: functional recovery lags. <sup class="c" data-ref="McMain2012" title="Source 339">339</sup>`}
  ];
  function draw(t){
    const N=vb(svg,'720 400','400 610'),L=lvl(t),p=phaseOf(STEPS,t),ri=Math.round(L),mo=Math.round(t*24),wait=view==='spec'&&t<.515;
    const G=N?{lx:20,ly:56,lw:360,lh:220,tx0:40,tx1:380,ty0:318,ty1:376,bx:20,by:410,bw:360,bh:180}:{lx:30,ly:56,lw:440,lh:230,tx0:50,tx1:470,ty0:318,ty1:372,bx:494,by:56,bw:206,bh:230};
    let o='';
    const LD=ladder(G.lx,G.ly,G.lw,G.lh,RUNG.map(r=>N?r.nw:r.w),{at:wait?-1:ri,col:'var(--rx)',done:false});
    o+=LD.svg;
    /* the person: interpolate between tread centres */
    const a=LD.top(Math.floor(L)),b=LD.top(Math.min(3,Math.floor(L)+1)),f=L-Math.floor(L),px=lerp(a[0],b[0],f),py=lerp(a[1],b[1],f)-Math.sin(Math.PI*f)*18;
    const ps=N?34:40;
    /* queue of others waiting, specialist view */
    if(wait){const qs=N?22:26,sp=N?16:19;for(let i=0;i<4;i++)o+=person(G.lx+12+i*sp,G.ly+G.lh-qs-4,qs,'var(--muted)',{op:.55});
      o+=person(G.lx+12+4*sp,G.ly+G.lh-qs-4,qs,'var(--self)')}
    else o+=person(px,py-ps-2,ps,'var(--self)');
    /* timeline trace of the level of care */
    const X=u=>lerp(G.tx0,G.tx1,u),Y=v=>lerp(G.ty1,G.ty0,v/3);
    o+=`<text x="${G.tx0}" y="${G.ty0-10}" class="t-xs">LEVEL OF CARE OVER 24 MONTHS</text>`;
    [0,1,2,3].forEach(v=>o+=`<line x1="${G.tx0}" x2="${G.tx1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`);
    let d='';for(let i=0;i<=120;i++){const u=t*i/120;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(lvl(u)))}
    o+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:2.4;stroke-linejoin:round"/><circle cx="${f1(X(t))}" cy="${f1(Y(L))}" r="4.5" style="fill:var(--rx)"/>`;
    [0,6,12,18,24].forEach(m=>o+=`<text x="${f1(X(m/24))}" y="${G.ty1+14}" class="t-xs t-mid">${m}</text>`);
    o+=`<text x="${G.tx1}" y="${G.ty1+27}" class="t-xs t-end">months</text>`;
    /* info card for the current step */
    const R=wait?{n:'Waiting list',who:['No structured care yet'],tr:['Fewer than 25% receive','guideline-adherent therapy']}:RUNG[ri];
    o+=`<rect x="${G.bx}" y="${G.by}" width="${G.bw}" height="${G.bh}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    let yy=G.by+22;const tx=G.bx+14;
    o+=`<text x="${tx}" y="${yy}" class="t-xs" style="fill:var(--rx)">${wait?'NOW · NOT YET ON THE LADDER':'NOW · STEP '+(ri+1)+' OF 4'}</text>`;yy+=20;
    o+=`<text x="${tx}" y="${yy}" class="t-lbl">${R.n}</text>`;yy+=24;
    o+=`<text x="${tx}" y="${yy}" class="t-xs">DELIVERED BY</text>`;yy+=15;
    R.who.forEach(l=>{o+=`<text x="${tx}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text>`;yy+=14});yy+=8;
    o+=`<text x="${tx}" y="${yy}" class="t-xs">TRAINING / FORMAT</text>`;yy+=15;
    R.tr.forEach(l=>{o+=`<text x="${tx}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text>`;yy+=14});
    yy+=10;o+=`<text x="${tx}" y="${yy}" class="t-xs" style="fill:var(--warn)">${view==='gpm'?'pathway: GPM + stepped care':'pathway: specialist only'}</text>`;
    o+=`<text x="${N?200:G.lx}" y="${N?32:30}" class="t-sm${N?' t-mid':''}" style="fill:var(--ink)">Month ${mo} · ${wait?'waiting for a specialist place':['diagnosis and psychoeducation','generalist care','stepping up','specialist therapy','crisis','stepping down'][p]}</text>`;
    svg.innerHTML=o;
    setSt(p);const S=STEPS[p];
    $('#gpNote').innerHTML=noteHTML(view==='gpm'?S:Object.assign({},S,{txt:`<b>Specialist-only view.</b> ${S.sp} Fewer than 25% of patients with BPD receive guideline-adherent psychotherapy. <sup class="c" data-ref="Assmann2025" title="Source 17">17</sup> `+S.txt}));
    $('#gpRead').innerHTML=`<span>month <b>${mo}</b></span><span>step <b>${wait?'waiting':(ri+1)+' · '+R.n}</b></span><span>pathway <b>${view==='gpm'?'GPM + stepped care':'specialist only'}</b></span>`;
  }
  const stop=playWire(rg,$('#gpPlay'),draw,24000,'Replay','gpm');
  setSt=stepWire($('#gpSteps'),STEPS,rg,draw,stop);
  $$('[data-gpv]').forEach(b=>b.addEventListener('click',()=>{stop();view=b.dataset.gpv;$$('[data-gpv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- evidence board ---------- */
  const ev=$('#gpEv');let cur='mcm',grow=1,stopG=null;
  /* row kinds: eq (both arms improved equally), bar (single published %), pair (two values), d (effect size, 0..1 scale) */
  const EV=[
    {id:'mcm',b:'DBT vs GPM (McMain 2009, 2012)',t:'DBT vs general psychiatric management',k:'180 people · 1 year of treatment · 2-year follow-up',
     rows:[{eq:'Self-harm episodes',v:'fewer, less severe'},{eq:'Emergency visits, hospital days',v:'fewer'},{eq:'BPD symptoms, depression, anger',v:'better'},{eq:'Interpersonal functioning',v:'better'},
       {h:'36 months, both groups together'},{bar:'Diagnostic remission (~two-thirds)',v:67},{bar:'Neither employed nor in school',v:53},{bar:'On psychiatric disability support',v:39}],
     txt:`Both groups improved, with fewer and less severe self-harm episodes, fewer emergency visits and hospital days, and better BPD symptoms, depression, anger and interpersonal functioning: "No significant differences across any outcomes were found between groups". <sup class="c" data-ref="McMain2009" title="Source 338">338</sup> Two years after treatment the gains held in both groups; about two-thirds had reached diagnostic remission, but 53% were neither employed nor in school and 39% were on psychiatric disability support at 36 months. <sup class="c" data-ref="McMain2012" title="Source 339">339</sup>`,
     pt:`A well-organised general approach did as well as DBT for these patients.`,hook:`McMain 2009: DBT = GPM on all outcomes at 1 year; McMain 2012: still equal 2 years later. <sup class="c" data-ref="McMain2009,McMain2012" title="Source 338,339">338,339</sup>`},
    {id:'brief',b:'Brief GPM (2024, 2026)',t:'Brief GPM vs usual treatment',k:'76 patients · 10 sessions over 4 months',
     rows:[{d:'Total ZAN-BPD at 4 months',v:.04},{d:'Relationship problems at 4 months',v:.52},{eq:'ZAN-BPD at 12 months',v:'GPM reduced symptoms significantly more',one:1}],
     txt:`Brief GPM did not differ from usual treatment on total ZAN-BPD at 4 months (d 0.04) but did better on relationship problems (d 0.52), impulsivity, social problems and retention. <sup class="c" data-ref="Kramer2024GPM" title="Source 283">283</sup> At 12 months the GPM group showed significantly greater ZAN-BPD reduction. <span class="ev early">Early evidence</span> <sup class="c" data-ref="BlancoMachinea2026" title="Source 58">58</sup>`,
     pt:`A short, 10-session version of GPM helped with relationships quickly, and its effect on symptoms showed up later.`,hook:`Brief GPM: d 0.04 on total symptoms at 4 months, d 0.52 on relationships. <sup class="c" data-ref="Kramer2024GPM" title="Source 283">283</sup>`},
    {id:'steps',b:'STEPPS and skills groups',t:'Add-on groups',k:'Blum 2008 RCT and a 2022 meta-analysis',
     rows:[{d:'Add-on DBT skills: BPD severity (SMD)',v:.66},{d:'Add-on STEPPS: BPD severity (SMD)',v:.48},{eq:'STEPPS: suicide attempts, self-harm',v:'no difference (nor hospitalisation)',none:1}],
     txt:`In the 2022 focused meta-analysis, add-on DBT skills training reduced BPD severity (SMD −0.66, moderate certainty) and add-on STEPPS SMD −0.48. <sup class="c" data-ref="StoffersWinterling2022BJP" title="Source 513">513</sup> In Blum 2008 (124 analysed), STEPPS improved ZAN-BPD and all four domains with moderate to large effects, but not suicide attempts, self-harm or hospitalisation; dropout was high in both arms. <sup class="c" data-ref="Blum2008STEPPS" title="Source 60">60</sup> Effects are shown as sizes, ignoring sign.`,
     pt:`Skills groups added to ordinary care reduce BPD symptoms, though they did not reduce self-harm in the STEPPS trial.`,hook:`STEPPS: 20 weeks, add-on, systems component; SMD −0.48 on BPD severity. <sup class="c" data-ref="Blum2008STEPPS,StoffersWinterling2022BJP" title="Source 60,513">60,513</sup>`},
    {id:'scm',arms:['MBT','SCM'],b:'Structured clinical management',t:'SCM as an active comparator',k:'Bateman 2009 (134) and a 2026 Korean pilot (64)',
     rows:[{eq:'Overall at 18 months (Bateman 2009)',v:'substantial improvement in both'},{eq:'Suicide attempts (2026 pilot)',v:'both reduced, no difference'},{h:'8 years after the 2009 trial'},{pair:'Still meeting recovery criteria',a:74,b2:51,la:'MBT',lb:'SCM'}],
     txt:`In Bateman 2009, "Substantial improvements were observed in both conditions", though MBT gave a steeper decline in suicide attempts and hospitalisation. <sup class="c" data-ref="Bateman2009" title="Source 37">37</sup> Eight years later more people still met recovery criteria after MBT (74% vs 51%). <sup class="c" data-ref="Bateman2021" title="Source 40">40</sup> A 2026 Korean pilot found MBT and SCM both cut suicide attempts, with no difference. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Shin2026" title="Source 478">478</sup>`,
     pt:`Structured clinical management is organised general care. People improved a lot with it, even though a specialist therapy sometimes did a bit better.`,hook:`Bateman 2009: MBT vs SCM, "Substantial improvements were observed in both conditions". <sup class="c" data-ref="Bateman2009" title="Source 37">37</sup>`},
    {id:'step',b:'Stepped care and youth services',t:'Changing the service, not the therapy',k:'Grenyer 2018 cluster RCT · MOBY 2022',
     rows:[{pair:'Bed days per admission',a:13.46,b2:4.28,la:'before',lb:'stepped care',u:' days',mx:15},{pair:'Treatment completion, youth',a:47.8,b2:19.2,la:'HYPE service',lb:'general youth service',u:'%',mx:100},{eq:'Adding CAT to HYPE (MOBY)',v:'no added benefit',none:1}],
     txt:`A cost-neutral whole-of-service stepped-care model cut bed days per admission from 13.46 to 4.28, made re-presentation to emergency 1.3 times less likely and saved an estimated USD 2,720 per patient per year (642 inpatients). <sup class="c" data-ref="Grenyer2018Stepped" title="Source 189">189</sup> In MOBY (139 people aged 15–25), a dedicated youth BPD service had higher completion (47.8% vs 19.2%), but adding cognitive analytic therapy did not improve functioning. <sup class="c" data-ref="Chanen2022MOBY" title="Source 97">97</sup>`,
     pt:`How a service is organised can matter as much as which therapy it offers.`,hook:`Grenyer 2018: stepped care, bed days 13.46 → 4.28; MOBY: service model beat therapy brand. <sup class="c" data-ref="Grenyer2018Stepped,Chanen2022MOBY" title="Source 97,189">97,189</sup>`},
    {id:'tau',b:'Usual care arms',t:'What unstructured usual care does',k:'Meta-analysis of 16 trials\' TAU arms',
     rows:[{d:'BPD symptoms (Hedges g)',v:.371},{d:'Self-harm and suicidality (Hedges g)',v:.003}],
     txt:`Across the treatment-as-usual arms of 16 BPD trials, BPD symptoms improved by a small-to-moderate amount (g 0.371; 95% CI 0.246–0.495), but self-harm and suicidality did not change (g 0.003). The authors say this questions the idea that usual care is harmful. <sup class="c" data-ref="Finch2019TAU" title="Source 156">156</sup>`,
     pt:`Ordinary care is not harmful, but on its own it did not reduce self-harm. Structure matters.`,hook:`TAU arms: symptoms g 0.371, self-harm g 0.003. <sup class="c" data-ref="Finch2019TAU" title="Source 156">156</sup>`}
  ];
  const bt=$('#gpEvBtns');bt.innerHTML='<span class="kicker">Compare</span>'+EV.map(e=>`<button class="btn" data-gpe="${e.id}" aria-pressed="${e.id===cur}">${e.b}</button>`).join('');
  function drawE(){const N=vb(ev,'600 360','400 560'),E=EV.find(e=>e.id===cur);let o='';const x0=N?16:24,x1=(N?400:600)-(N?16:24);
    o+=`<text x="${x0}" y="22" class="t-sm" style="fill:var(--ink);font-weight:600">${E.t.toUpperCase()}</text><text x="${x0}" y="38" class="t-xs">${E.k}</text>`;
    let y=60;const lw=N?0:230,c0=x0+lw,cw=N?220:x1-c0-150;
    E.rows.forEach(r=>{
      if(r.h){o+=`<text x="${x0}" y="${y+10}" class="t-xs" style="fill:var(--rx)">${r.h.toUpperCase()}</text>`;y+=22;return}
      const ty=y+11,ry=N?y+18:y;
      if(!N||r.eq||r.bar||r.d||r.pair)o+=`<text x="${x0}" y="${ty}" class="t-xs" style="fill:var(--ink)">${r.eq||r.bar||r.d||r.pair}</text>`;
      if(r.eq){const g=f1(grow);
        if(r.none)o+=`<text x="${c0+(N?0:8)}" y="${ry+(N?11:11)}" class="t-xs" style="opacity:${g}">= ${r.v}</text>`;
        else if(r.one)o+=`<text x="${c0+(N?0:8)}" y="${ry+11}" class="t-xs" style="fill:var(--rx);opacity:${g}">▲ ${r.v}</text>`;
        else{const A=E.arms||['DBT','GPM'];o+=`<text x="${c0+(N?0:8)}" y="${ry+11}" class="t-xs" style="fill:var(--rx);opacity:${g}">● ${A[0]} = ${A[1]}: ${r.v}</text>`}
        y+=N?40:26;return}
      if(r.bar){const w=cw*r.v/100*grow;o+=`<rect x="${c0}" y="${ry+1}" width="${f1(Math.max(1.5,w))}" height="12" rx="3" style="fill:var(--rx);opacity:.8"/><text x="${f1(c0+w+6)}" y="${ry+11}" class="t-xs" style="fill:var(--ink)">${grow<1?'':r.v+'%'}</text>`;y+=N?40:26;return}
      if(r.d){const w=cw*r.v*grow;o+=`<rect x="${c0}" y="${ry+1}" width="${f1(Math.max(1.5,w))}" height="12" rx="3" style="fill:var(--accent)"/><text x="${f1(c0+Math.max(1.5,w)+6)}" y="${ry+11}" class="t-xs" style="fill:var(--ink)">${grow<1?'':r.v}</text>`;y+=N?40:26;return}
      if(r.pair){const mx=r.mx||100,u=r.u||'%';[[r.a,r.la,'var(--rx)',1],[r.b2,r.lb,'var(--muted)',.7]].forEach(([v,l,c,op],j)=>{const w=cw*v/mx*grow,yy=ry+j*16;
          o+=`<rect x="${c0}" y="${yy+1}" width="${f1(Math.max(1.5,w))}" height="12" rx="3" style="fill:${c};opacity:${op}"/><text x="${f1(c0+w+6)}" y="${yy+11}" class="t-xs" style="fill:var(--ink)">${grow<1?'':v+u+' · '+l}</text>`});y+=N?56:42}});
    if(E.rows.some(r=>r.d)){y+=14;o+=`<text x="${x0}" y="${y}" class="t-xs">effect sizes shown as magnitudes</text>`;y+=8}
    ev.setAttribute('viewBox',`0 0 ${N?400:600} ${Math.max(N?220:200,Math.round(y+16))}`);
    ev.innerHTML=o;
    $('#gpEvNote').innerHTML=noteHTML({k:E.k,t:E.t,txt:E.txt,pt:E.pt,hook:E.hook});
    $('#gpEvCap').innerHTML='Values as published in each abstract. "=" means the trial found no significant difference between arms. Population statistics, not individual predictions.'}
  bt.addEventListener('click',e=>{const b=e.target.closest('[data-gpe]');if(!b)return;cur=b.dataset.gpe;$$('[data-gpe]',bt).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopG)stopG();grow=0;drawE();stopG=animate(600,p=>{grow=ease(p);drawE()},()=>{stopG=null;grow=1;drawE()});
    setTimeout(()=>{if(grow<1){if(stopG)stopG();stopG=null;grow=1;drawE()}},900)});
  redraws.gpm=(prev=>()=>{prev&&prev();drawE()})(redraws.gpm);
  drawE();
};
/* =============== 3.5 Therapies compared =============== */
/* Forest-plot rows. m: 'smd' (standardised mean difference or Cohen d, negative = better with therapy),
   'rr' (risk ratio, log scale, below 1 = fewer events with therapy), 'pct' (dropout %, a = therapy, b = comparator),
   'txt' (no pooled number in the source). c = certainty: mod, low, vlow (GRADE), trial (single trial, not
   GRADE-rated), na (review without a GRADE rating in its abstract). w = number of trials pooled (square size).
   fl: a single-trial Cohen d published as a positive number for benefit, plotted on the benefit side. */
const CO_TAU={
 sev:{t:'BPD severity',rows:[
  {n:'Any psychotherapy',s:'Cochrane 2020 · 22 trials · 1244 people',m:'smd',e:-.52,lo:-.70,hi:-.33,c:'mod',w:22,pool:1},
  {n:'Specialised therapies',s:'Oud 2018 · DBT, MBT, TFP, schema',m:'smd',e:-.59,lo:-.90,hi:-.28,c:'mod',w:12},
  {n:'Psychotherapies, stand-alone',s:'Cristea 2017 · reported as g 0.32',m:'smd',e:-.32,c:'na',w:10,fl:1},
  {n:'DBT',s:'Cochrane 2020 · 3 trials',m:'smd',e:-.60,c:'low',w:3},
  {n:'DBT skills, added on',s:'Stoffers-Winterling 2022',m:'smd',e:-.66,c:'mod',w:5},
  {n:'STEPPS, added on',s:'Stoffers-Winterling 2022',m:'smd',e:-.48,c:'na',w:3},
  {n:'Schema therapy (both formats)',s:'Arntz 2022 · one trial · d 0.73',m:'smd',e:-.73,lo:-1.18,hi:-.29,c:'trial',w:1,fl:1},
  {n:'TFP vs community therapists',s:'Doering 2010 · one trial · d 1.6',m:'smd',e:-1.6,c:'trial',w:1,fl:1},
  {n:'Brief GPM (10 sessions)',s:'Kramer 2024 · one trial · d 0.04',m:'smd',e:-.04,c:'trial',w:1,fl:1},
  {n:'MBT',s:'no pooled severity estimate',m:'txt',x:'not pooled for this outcome in these reviews'}],
  kv:`Against usual care, BPD-tailored psychotherapy reduced BPD severity (SMD −0.52; 95% CI −0.70 to −0.33; moderate certainty), and subgroup analysis found no clear difference between therapy types. Oud 2018 found SMD −0.59 for the specialised therapies; Cristea 2017 found smaller effects (g 0.32) and warned of bias. Add-on DBT skills training gave SMD −0.66 (moderate certainty), add-on STEPPS −0.48. Single trials: schema therapy d 0.73 (0.29–1.18), TFP vs community psychotherapists d 1.6, brief GPM d 0.04 at 4 months (with a greater reduction than usual care at 12 months). <sup class="c" data-ref="Storebo2020,Oud2018,Cristea2017,StoffersWinterling2022BJP,Arntz2022GST,Doering2010,Kramer2024GPM,BlancoMachinea2026" title="Source 15,58,111,130,283,395,513,514">15,58,111,130,283,395,513,514</sup>`},
 sh:{t:'Self-harm',rows:[
  {n:'Any psychotherapy',s:'Cochrane 2020 · 13 trials',m:'smd',e:-.32,lo:-.49,hi:-.14,c:'low',w:13,pool:1},
  {n:'DBT',s:'Cochrane 2020 · 7 trials',m:'smd',e:-.28,lo:-.48,hi:-.07,c:'low',w:7},
  {n:'DBT, stand-alone',s:'Stoffers-Winterling 2022',m:'smd',e:-.54,c:'low',w:5},
  {n:'DBT, self-injury',s:'Oud 2018',m:'smd',e:-.40,c:'na',w:4},
  {n:'MBT',s:'Cochrane 2020 · 3 trials · risk ratio',m:'rr',e:.62,lo:.49,hi:.80,c:'low',w:3},
  {n:'MBT, stand-alone',s:'Stoffers-Winterling 2022 · risk ratio',m:'rr',e:.51,c:'low',w:3},
  {n:'STEPPS',s:'Blum 2008 · one trial',m:'txt',x:'no difference in self-harm'},
  {n:'TFP',s:'Doering 2010 · one trial',m:'txt',x:'self-harm did not change in either group'}],
  kv:`Psychotherapy vs usual care reduced self-harm (SMD −0.32; 95% CI −0.49 to −0.14; 13 trials; low certainty). DBT: SMD −0.28 (−0.48 to −0.07; 7 trials). MBT: risk ratio 0.62 (0.49–0.80; 3 trials). STEPPS did not change self-harm in its trial, and neither did TFP or the community psychotherapists in Doering 2010. In the usual-care arms of 16 trials, self-harm and suicidality did not change (g 0.003). <sup class="c" data-ref="Storebo2020,StoffersWinterling2022BJP,Oud2018,Blum2008STEPPS,Doering2010,Finch2019TAU" title="Source 60,130,156,395,513,514">60,130,156,395,513,514</sup>`},
 sui:{t:'Suicide-related outcomes',rows:[
  {n:'Any psychotherapy',s:'Cochrane 2020 · 13 trials',m:'smd',e:-.34,lo:-.57,hi:-.11,c:'low',w:13,pool:1},
  {n:'DBT, self-directed violence',s:'DeCou 2019 · 18 trials',m:'smd',e:-.324,lo:-.471,hi:-.176,c:'na',w:18},
  {n:'DBT, suicidal ideation',s:'DeCou 2019',m:'smd',e:-.229,lo:-.473,hi:.016,c:'na',w:10},
  {n:'TFP, suicide attempts',s:'Doering 2010 · one trial · d 0.8',m:'smd',e:-.8,c:'trial',w:1,fl:1},
  {n:'MBT, suicidality',s:'Cochrane 2020 · 3 trials · risk ratio',m:'rr',e:.10,lo:.04,hi:.30,c:'low',w:3},
  {n:'MBT, stand-alone',s:'Stoffers-Winterling 2022 · risk ratio',m:'rr',e:.10,c:'low',w:3},
  {n:'STEPPS',s:'Blum 2008 · one trial',m:'txt',x:'no difference in suicide attempts'}],
  kv:`Psychotherapy vs usual care: SMD −0.34 (95% CI −0.57 to −0.11; 13 trials; low certainty). MBT: risk ratio 0.10 (0.04–0.30; 3 trials; low certainty). DeCou 2019 found DBT reduced self-directed violence (d −0.324) but its effect on suicidal ideation crossed zero (−0.473 to 0.016). Low certainty means few, small trials. <sup class="c" data-ref="Storebo2020,StoffersWinterling2022BJP,DeCou2019,Doering2010,Blum2008STEPPS" title="Source 60,117,130,513,514">60,117,130,513,514</sup>`},
 fun:{t:'Psychosocial functioning',rows:[
  {n:'Any psychotherapy',s:'Cochrane 2020 · 22 trials',m:'smd',e:-.45,lo:-.68,hi:-.22,c:'low',w:22,pool:1},
  {n:'DBT',s:'Cochrane 2020 · 6 trials',m:'smd',e:-.36,c:'low',w:6},
  {n:'DBT, stand-alone',s:'Stoffers-Winterling 2022',m:'smd',e:-.51,c:'low',w:5},
  {n:'TFP vs community therapists',s:'Doering 2010 · one trial · d 1.0',m:'smd',e:-1.0,c:'trial',w:1,fl:1},
  {n:'MBT vs supportive group',s:'Jørgensen 2013 · one trial',m:'txt',x:'only global functioning better with MBT'}],
  kv:`Psychotherapy vs usual care improved functioning (SMD −0.45; 95% CI −0.68 to −0.22; 22 trials; low certainty), about −2.8 points on the GAF, which did not reach the clinically meaningful cut-off. Functional recovery lags behind symptoms: 2 years after DBT or GPM, 53% were neither working nor in school. <sup class="c" data-ref="Storebo2020,StoffersWinterling2022BJP,Doering2010,Jorgensen2013MBT,McMain2012" title="Source 130,243,339,513,514">130,243,339,513,514</sup>`},
 drop:{t:'Dropout',rows:[
  {n:'Pooled, all studies',s:'Iliakis 2021',m:'pct',a:22.3,c:'na'},
  {n:'Pooled, outpatient RCTs',s:'Iliakis 2021 · up to 29.9% bias-adjusted',m:'pct',a:28.2,c:'na'},
  {n:'DBT studies, pre to post',s:'Kliem 2010 · 16 studies',m:'pct',a:27.3,c:'na'},
  {n:'TFP vs community therapists',s:'Doering 2010 · one trial',m:'pct',a:38.5,b:67.3,c:'trial'},
  {n:'MBT day hospital vs specialist care',s:'Laurenssen 2018 · early dropout',m:'pct',a:9,b:34,c:'trial'},
  {n:'Any psychotherapy vs usual care',s:'Cochrane 2020',m:'txt',x:'did not reduce attrition'}],
  kv:`About 1 in 4 people leave BPD psychotherapy early: 22.3% across all studies, 28.2% in outpatient RCTs, up to 29.9% after adjusting for publication bias, mostly in the first half of treatment. Schema therapy had the lowest dropout overall, MBT in the first two quarters, and community treatment by experts the highest. Overall, BPD-specific psychotherapy did not reduce attrition compared with usual care. <sup class="c" data-ref="Iliakis2021,Arntz2023Dropout,Kliem2010,Doering2010,Laurenssen2018,Storebo2020" title="Source 16,130,236,270,297,514">16,130,236,270,297,514</sup>`}
};
/* head-to-head trials: a tug of war between A and B. p in -1..1: -0.6 = favours A, 0 = no clear difference */
const CO_H2H=[
 {n:'McMain 2009, 2012',s:'180 people · 1 year',a:'DBT',b:'GPM',o:{sev:[0,'no significant difference'],sh:[0,'no significant difference'],sui:[0,'no significant difference'],fun:[0,'no significant difference']}},
 {n:'BOOTS 2026',s:'204 people · 2 years',a:'DBT',b:'Schema',o:{sev:[0,'d 0.15 (−0.17 to 0.47) at 3 years'],drop:[0,'52% vs 46% at 2 years, n.s.']}},
 {n:'Giesen-Bloo 2006',s:'88 people · 3 years',a:'Schema',b:'TFP',o:{sev:[-.6,'more recovered: RR 2.18'],drop:[-.6,'higher dropout risk with TFP']}},
 {n:'Clarkin 2007',s:'90 people · 1 year',a:'TFP',b:'DBT',o:{sev:[0,'both improved (as did supportive therapy)'],sui:[0,'both improved suicidality']}},
 {n:'Bateman 2009, 2021',s:'134 people · 18 months',a:'MBT',b:'SCM',o:{sev:[0,'substantial improvements in both'],sui:[-.55,'steeper fall in suicide attempts'],fun:[-.5,'8 years on: more in purposeful activity']}},
 {n:'Arntz 2022',s:'495 people · 2 years',a:'Combined ST',b:'Group ST',o:{sev:[-.6,'d 0.84 for combined'],drop:[-.25,'retention 0.74 vs 0.62']}},
 {n:'Linehan 2015',s:'99 women · 1 year',a:'Std DBT',b:'No skills',o:{sh:[-.6,'skills arms cut self-injury more'],sui:[0,'all arms improved similarly'],drop:[-.6,'dropout 24% vs 48%']}},
 {n:'McMain 2022',s:'240 people',a:'DBT 6 mo',b:'DBT 12 mo',o:{sh:[0,'6 months non-inferior'],sev:[-.35,'faster fall in BPD symptoms'],drop:[0,'dropout did not differ']}},
 {n:'Juul 2023, 2025',s:'166 people',a:'MBT 5 mo',b:'MBT 14 mo',o:{sev:[0,'no difference at 16 or 24 months']}},
 {n:'Linehan 2006',s:'101 women · 1 year + 1',a:'DBT',b:'Experts',o:{sui:[-.6,'half as likely to attempt: HR 2.66'],drop:[-.6,'lower dropout: HR 3.2']}}
];
const CO_H2H_KV={
 sev:`Head-to-head trials mostly find no clear winner on BPD severity: DBT vs GPM, DBT vs schema therapy (BOOTS: d 0.15; 95% CI −0.17 to 0.47), 5 vs 14 months of MBT. Schema therapy beat TFP on recovery (RR 2.18), and combined individual plus group schema therapy beat mainly-group schema therapy (d 0.84). <sup class="c" data-ref="McMain2009,Wibbelink2026BOOTS,Juul2023,Juul2025,GiesenBloo2006,Arntz2022GST,McMain2022,Clarkin2007,Bateman2009" title="Source 15,37,104,177,246,247,338,341,553">15,37,104,177,246,247,338,341,553</sup>`,
 sh:`DBT and GPM reduced self-harm equally. In the DBT component trial, the arms that included skills training reduced non-suicidal self-injury more than DBT without skills, and 6 months of DBT was non-inferior to 12. <sup class="c" data-ref="McMain2009,Linehan2015,McMain2022" title="Source 311,338,341">311,338,341</sup>`,
 sui:`Linehan 2006 matched its expert comparison therapists for sex, availability, expertise, allegiance, training, consultation and prestige; DBT recipients were still "half as likely to make a suicide attempt". MBT gave a steeper fall in suicide attempts than structured clinical management. <sup class="c" data-ref="Linehan2006,Bateman2009,Clarkin2007,Linehan2015,McMain2009" title="Source 37,104,310,311,338">37,104,310,311,338</sup>`,
 fun:`Functioning moved alike with DBT and GPM. Eight years after the MBT vs SCM trial began, the MBT group was more often in purposeful activity. <sup class="c" data-ref="McMain2009,Bateman2021" title="Source 40,338">40,338</sup>`,
 drop:`Dropout differed in some head-to-head trials: lower with standard DBT than DBT without skills (24% vs 48%), lower with DBT than expert community therapy (HR 3.2), and lower with schema therapy than TFP. In BOOTS, DBT 52% and schema therapy 46% at 2 years did not differ significantly. <sup class="c" data-ref="Linehan2015,Linehan2006,GiesenBloo2006,Wibbelink2026BOOTS,Arntz2022GST,McMain2022" title="Source 15,177,310,311,341,553">15,177,310,311,341,553</sup>`
};
const CO_CERT={mod:['var(--good)','Moderate certainty (GRADE)'],low:['var(--warn)','Low certainty (GRADE)'],vlow:['var(--bad)','Very low certainty'],trial:['var(--dx)','Single trial, not GRADE-rated'],na:['var(--muted)','Review, no GRADE rating given']};
const CO_STEPS=[
 {from:0,at:.08,k:'Step 1 · the rows',t:'The question',
  txt:`Each row is one comparison: a review's pooled estimate or a single trial, always a BPD therapy against usual care. The top row pools every BPD-tailored psychotherapy in the 2020 Cochrane review, which included 75 randomised trials and 4507 participants testing more than 16 kinds of therapy; about a third were DBT trials and 7 were MBT trials. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`,
  pt:`Every line asks one question: did people do better with this therapy than with the usual care on offer?`,
  hook:`Cochrane 2020: 75 RCTs, 4507 participants, more than 16 therapies; DBT made up about one-third of the trials. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`},
 {from:.17,at:.25,k:'Step 2 · the square',t:'Point estimate',
  txt:`The square marks the single best estimate of the difference between groups. Most rows use a standardised mean difference (SMD): the gap between the groups divided by their spread, so trials using different scales can be pooled. Here negative, to the left, means fewer symptoms with therapy. Reviews call an effect around 0.3 small and around 0.6 medium. A risk ratio (lower block) compares how often an event happened: 0.62 means 38% fewer people with the event. <sup class="c" data-ref="Cristea2017,Oud2018,Storebo2020" title="Source 111,395,514">111,395,514</sup>`,
  pt:`The square is the average difference between the groups. Further left means more improvement with therapy.`},
 {from:.34,at:.42,k:'Step 3 · the whiskers',t:'Confidence interval',
  txt:`The line through the square is the 95% confidence interval, the range of effects that fit the data. Many participants give a short line; few give a long one. For psychotherapy against usual care on BPD severity it runs from −0.70 to −0.33. Where an abstract gave no interval, only the square is shown: that is missing information, not certainty. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`,
  pt:`The line shows how sure we can be. A short line means the result is more precise.`,
  hook:`Psychotherapy vs usual care, BPD severity: SMD −0.52 (95% CI −0.70 to −0.33), moderate certainty. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`},
 {from:.5,at:.58,k:'Step 4 · the middle line',t:'Line of no effect',
  txt:`The vertical line at 0 (at 1 for a risk ratio) means no difference. An interval that crosses it is compatible with no effect. Pick <b>Suicide-related</b>: DBT reduced self-directed violence (d −0.324; −0.471 to −0.176), but its effect on suicidal ideation crossed zero (−0.473 to 0.016), so it was not significant. Rows that cross turn hollow. <sup class="c" data-ref="DeCou2019" title="Source 117">117</sup>`,
  pt:`If the line touches the middle, the study cannot rule out that the therapy made no difference.`,
  hook:`An interval that includes 0 (SMD) or 1 (risk ratio) is not statistically significant.`},
 {from:.67,at:.75,k:'Step 5 · size and colour',t:'Weight and certainty',
  txt:`Bigger squares pool more trials and carry more weight; the diamond is the overall pooled result. Colour shows the GRADE certainty of the evidence. In Cochrane 2020, only BPD severity was moderate certainty; self-harm, suicide-related outcomes and functioning were low. Single trials are not GRADE-rated and show in blue. Cristea 2017 warns that effects are "inflated by risk of bias and publication bias, and particularly unstable at follow-up". <sup class="c" data-ref="Storebo2020,Cristea2017" title="Source 111,514">111,514</sup>`,
  pt:`Green marks moderate certainty, the best rating any outcome here received. Amber means low certainty: fewer and smaller studies.`,
  hook:`Cochrane 2020: BPD severity moderate certainty; self-harm, suicide-related outcomes and functioning low certainty. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`},
 {from:.84,at:.95,k:'Step 6 · does it matter?',t:'Big enough to matter?',
  txt:`A statistical difference is not always one people feel. Cochrane translated the severity effect into about −3.6 points on the 0–36 ZAN-BPD, above the 3.0-point minimal clinically relevant difference; functioning came to about −2.8 GAF points. "Only the outcome of BPD severity reached the MIREDIF-defined cut-off for a clinically meaningful improvement." A 2024 review adds that almost half of patients do not respond sufficiently. <sup class="c" data-ref="Storebo2020,Leichsenring2024WP" title="Source 300,514">300,514</sup>`,
  pt:`On average, therapy helps by an amount people notice. Some people benefit a lot and others much less, so it is worth saying when a therapy is not working.`,
  hook:`Only BPD severity reached the clinically meaningful threshold: about −3.6 vs a 3.0-point ZAN-BPD MCID. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`}
];
/* ingredient card sort */
const CO_TH={dbt:'DBT',mbt:'MBT',st:'Schema',tfp:'TFP',gpm:'GPM',stepps:'STEPPS'};
const CO_ING=[
 {h:'A clear model, shared with the person',th:['dbt','mbt','st','gpm'],p:`NICE asks for "an explicit and integrated theoretical approach used by both the treatment team and the therapist, which is shared with the service user". DBT has the biosocial theory, MBT the mentalizing model, schema therapy the mode model, and GPM "medicalizes the disorder". <sup class="c" data-ref="NICE2009,Chapman2006DBT,Bateman2010WP,Arntz2005Modes,Gunderson2018GPM" title="Source 14,38,99,208,379">14,38,99,208,379</sup>`},
 {h:'Structure and a set frame',th:['dbt','mbt','st','tfp','gpm','stepps'],p:`APA recommends (1B) "a structured approach to psychotherapy". DBT is "modular and hierarchical", MBT "time-limited", STEPPS a 20-week manual-based group, GPM once weekly; schema therapy and TFP ran twice a week for 3 years in Giesen-Bloo 2006. <sup class="c" data-ref="APA2024Guideline,LinehanWilks2015,Bateman2010WP,Blum2008STEPPS,Gunderson2018GPM,GiesenBloo2006" title="Source 12,38,60,177,208,312">12,38,60,177,208,312</sup>`},
 {h:'A focus on emotions',th:['dbt','mbt','st','gpm','stepps'],p:`DBT names a focus on emotions as essential; in MBT, reduced mentalizing leads to problems with emotion regulation; STEPPS is named for emotional predictability; brief GPM was studied with emotional processing as its mechanism of change; one schema mode is the angry/impulsive child. <sup class="c" data-ref="Chapman2006DBT,Bateman2010WP,Blum2008STEPPS,Kramer2024GPM,Arntz2005Modes" title="Source 14,38,60,99,283">14,38,60,99,283</sup>`},
 {h:'Support for the therapists',th:['dbt','mbt'],p:`DBT therapists meet weekly in a consultation team to keep a compassionate, non-judgemental stance and reduce burnout. MBT worked when delivered with moderate supervision. NICE asks services to provide therapist supervision. <sup class="c" data-ref="Chapman2006DBT,Bateman2010WP,NICE2009" title="Source 38,99,379">38,99,379</sup>`},
 {h:'Learning about the diagnosis',th:['gpm'],p:`GPM "emphasizes psychoeducation". APA recommends (1C) a collaborative discussion of the diagnosis that includes psychoeducation, and a workshop soon after diagnosis reduced impulsivity and stormy relationships more than waitlist. <sup class="c" data-ref="Gunderson2018GPM,APA2024Guideline,Zanarini2008Psychoed" title="Source 12,208,583">12,208,583</sup>`},
 {h:'Validation',th:['dbt'],p:`Validation is one of the proposed mechanisms of change in DBT, with mindfulness, targeting, chain analysis and dialectics; NICE asks crisis staff to use validating statements and not minimise the person's reasons. <sup class="c" data-ref="Lynch2006DBT,NICE2009" title="Source 324,379">324,379</sup>`}
];
const CO_DIST={
 dbt:[{h:'Four skills modules',p:`Mindfulness, distress tolerance, emotion regulation and interpersonal effectiveness, taught in groups of about 4 to 10. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`},
  {h:'Diary card and target hierarchy',p:`A weekly self-monitoring card sets the agenda: life-threatening behaviour first, then therapy-interfering, then quality-of-life-interfering behaviour. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`},
  {h:'Phone coaching and chain analysis',p:`Between sessions the therapist coaches skills by phone; in session, a chain analysis maps what led up to a behaviour and what keeps it going. <sup class="c" data-ref="Chapman2006DBT,Lynch2006DBT" title="Source 99,324">99,324</sup>`},
  {h:'Signature evidence',p:`Against matched expert therapists, DBT recipients were "half as likely to make a suicide attempt" (HR 2.66). NICE: consider comprehensive DBT for women when reducing recurrent self-harm is a priority. <sup class="c" data-ref="Linehan2006,NICE2009" title="Source 310,379">310,379</sup>`}],
 mbt:[{h:'Mentalizing',p:`"The capacity to understand others and oneself in terms of internal mental states", which MBT tries to strengthen, especially under stress in close relationships. <sup class="c" data-ref="Luyten2020,Bateman2010WP" title="Source 38,323">38,323</sup>`},
  {h:'Three pre-mentalizing modes',p:`Psychic equivalence (inner experience treated as outer reality), pretend mode, and teleological thinking (only actions count as proof). <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>`},
  {h:'Generalist-friendly',p:`Found effective when delivered by mental health professionals with limited extra training and moderate supervision. <sup class="c" data-ref="Bateman2010WP" title="Source 38">38</sup>`},
  {h:'Signature evidence',p:`8 years after entry, 13% vs 87% still met BPD criteria after MBT partial hospitalisation vs usual care, though general social function remained impaired. <sup class="c" data-ref="Bateman2008" title="Source 36">36</sup>`}],
 st:[{h:'Schema modes',p:`Detached protector, punitive parent, abandoned/abused child and angry/impulsive child, with a weak healthy adult that therapy builds up. <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>`},
  {h:'Individual plus group',p:`Combined individual and group schema therapy beat both usual care (d 1.14) and mainly-group schema therapy (d 0.84). <sup class="c" data-ref="Arntz2022GST" title="Source 15">15</sup>`},
  {h:'Lowest dropout',p:`In a survival meta-analysis of 111 studies, schema therapy had the lowest dropout overall. <sup class="c" data-ref="Arntz2023Dropout" title="Source 16">16</sup>`},
  {h:'Signature evidence',p:`Against TFP: 52% vs 29% recovered, with lower 4-year costs (EUR 37,826 vs 46,795). <sup class="c" data-ref="vanAsselt2008,GiesenBloo2006" title="Source 177,542">177,542</sup>`}],
 tfp:[{h:'A psychodynamic therapy',p:`Cristea 2017 found psychodynamic approaches (g 0.41) and DBT (g 0.34) were the only ones to beat controls on their own. See <a href="#schema" data-go="schema">schema therapy &amp; TFP</a> for how TFP works. <sup class="c" data-ref="Cristea2017" title="Source 111">111</sup>`},
  {h:'Anger and assault',p:`Of TFP, DBT and supportive therapy, only TFP changed irritability and verbal and direct assault. <sup class="c" data-ref="Clarkin2007" title="Source 104">104</sup>`},
  {h:'Signature evidence',p:`Against experienced community psychotherapists: less dropout (38.5% vs 67.3%), fewer suicide attempts (d 0.8), better borderline symptoms (d 1.6). <sup class="c" data-ref="Doering2010" title="Source 130">130</sup>`},
  {h:'But against schema therapy',p:`TFP had the higher dropout risk and fewer recoveries over 3 years. <sup class="c" data-ref="GiesenBloo2006" title="Source 177">177</sup>`}],
 gpm:[{h:'Generalist by design',p:`"A once-weekly, generalist model that medicalizes the disorder, emphasizes psychoeducation, and focuses on social adaptation." <sup class="c" data-ref="Gunderson2018GPM" title="Source 208">208</sup>`},
  {h:'Medication management included',p:`In McMain 2009, GPM combined psychodynamically informed therapy with symptom-targeted medication management following APA guidance. <sup class="c" data-ref="McMain2009" title="Source 338">338</sup>`},
  {h:'First step, not last resort',p:`<span class="ev hyp">Hypothesis</span> Its authors propose GPM as the primary intervention, with intensive therapies kept for people who do not respond. <sup class="c" data-ref="Gunderson2018GPM" title="Source 208">208</sup>`},
  {h:'Signature evidence',p:`Matched DBT on every outcome at 1 year and 2 years later; brief GPM (10 sessions) improved relationship problems (d 0.52). <sup class="c" data-ref="McMain2009,McMain2012,Kramer2024GPM" title="Source 283,338,339">283,338,339</sup>`}],
 stepps:[{h:'A systems component',p:`A 20-week, manual-based group added to usual care, combining cognitive-behavioural elements and skills training with a "systems" component that involves the person's support network. <sup class="c" data-ref="Blum2008STEPPS" title="Source 60">60</sup>`},
  {h:'Signature evidence',p:`Improved ZAN-BPD total and all four domains, impulsivity, mood and global functioning, but not suicide attempts, self-harm or hospitalisation; dropout was high in both arms. <sup class="c" data-ref="Blum2008STEPPS" title="Source 60">60</sup>`},
  {h:'Pooled',p:`Added to usual care, STEPPS reduced BPD severity (SMD −0.48). <sup class="c" data-ref="StoffersWinterling2022BJP" title="Source 513">513</sup>`}]
};
function coWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){if(c)L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L}
const coFmt=v=>{let x=String(v).replace('-','');if(x.startsWith('.'))x='0'+x;if(/^\d+(\.\d)?$/.test(x)&&Math.abs(v)<1)x=(+x).toFixed(2);return (v<0?'−':'')+x};

inits.compare=()=>{
  const svg=$('#coSvg'),rg=$('#coT');let cmp='tau',oc='sev',setSt=()=>{};
  const sec=$('#m-compare');
  $('#coLegend').innerHTML=Object.keys(CO_CERT).map(k=>`<span><i class="cert" style="background:${CO_CERT[k][0]}"></i>${CO_CERT[k][1]}</span>`).join('')+'<span><i style="background:var(--muted);height:2px"></i>95% CI</span>';
  function axis(L,y,kind,s){const P0=L.P0,P1=L.P1;let X,ticks,zero,fmt=v=>v,lab;
    if(kind==='smd'){X=v=>lerp(P0,P1,(v+1.8)/2.6);ticks=[-1.5,-1,-.5,0,.5];zero=0;fmt=v=>v===0?'0':(v<0?'−':'')+Math.abs(v);lab='SMD / Cohen d'}
    else if(kind==='rr'){const a=Math.log(.03),b=Math.log(4);X=v=>lerp(P0,P1,(Math.log(v)-a)/(b-a));ticks=[.05,.1,.25,.5,1,2];zero=1;lab='risk ratio (log scale)'}
    else{X=v=>lerp(P0,P1,v/75);ticks=[0,10,20,30,40,50,60,70];zero=null;fmt=v=>v+'%';lab='% dropping out'}
    const op=ramp(s,0,.6);let o=`<g style="opacity:${f1(op)}"><line x1="${P0}" x2="${P1}" y1="${y}" y2="${y}" class="axis"/>`;
    ticks.forEach(v=>{o+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y}" y2="${y+4}" class="axis"/><text x="${f1(X(v))}" y="${y+15}" class="t-xs t-mid">${fmt(v)}</text>`});
    if(kind!=='pct'){o+=`<text x="${f1(X(zero)-6)}" y="${y+28}" class="t-xs t-end" style="fill:var(--rx)">← favours therapy</text><text x="${f1(X(zero)+6)}" y="${y+28}" class="t-xs">favours control →</text>`}
    else o+=`<text x="${P0}" y="${y+28}" class="t-xs">← fewer people stop</text>`;
    o+=`<text x="${P1}" y="${y+(kind==='pct'?28:40)}" class="t-xs t-end">${lab}</text></g>`;
    return {svg:o,X,zero}}
  function drawTau(t,N){
    const D=CO_TAU[oc],rows=D.rows,s0=ramp(t,0,.15),sq=ramp(t,.17,.3),ci=ramp(t,.34,.47),ne=ramp(t,.5,.6),wc=ramp(t,.67,.78),md=ramp(t,.84,.94);
    const L=N?{P0:22,P1:382,rh:62,top:62}:{P0:290,P1:540,rh:34,top:62};
    const blocks=['smd','rr','pct','txt'].map(k=>({k,r:rows.filter(r=>r.m===k)})).filter(b=>b.r.length);
    let y=L.top,s='',H;
    s+=`<text x="12" y="22" class="t-lbl">${D.t}</text><text x="12" y="38" class="t-xs">${oc==='drop'?'share of people who stopped treatment early':(N?'BPD psychotherapy vs usual care':'BPD psychotherapy vs usual care · each row on its source\'s scale')}</text>`;
    let idx=0;
    blocks.forEach(B=>{
      const yTop=y,hasAx=B.k!=='txt';let A=null;
      const yAx=yTop+B.r.length*L.rh+6;
      if(hasAx){A=axis(L,yAx,B.k,s0);
        /* line of no effect */
        if(A.zero!=null){const zx=A.X(A.zero);s+=`<line x1="${f1(zx)}" x2="${f1(zx)}" y1="${yTop-2}" y2="${yAx}" style="stroke:${ne>0?'var(--ink)':'var(--line)'};stroke-width:${f1(1+ne*.8)};stroke-dasharray:${ne>0?'5 3':'2 4'};opacity:${f1(.5+ne*.5)}"/>`;
          if(ne>0)s+=`<text x="${f1(zx)}" y="${yTop-6}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(ne)}">no effect = ${A.zero}</text>`}
        else if(ne>0){const bx0=A.X(22.3),bx1=A.X(28.2);s+=`<rect x="${f1(bx0)}" y="${yTop-4}" width="${f1(bx1-bx0)}" height="${f1(yAx-yTop+4)}" style="fill:var(--warn-soft);opacity:${f1(ne*.9)}"/><text x="${f1((bx0+bx1)/2)}" y="${yTop-8}" class="t-xs t-mid" style="opacity:${f1(ne)}">pooled 22–28%</text>`}
        s+=A.svg}
      B.r.forEach((r,i)=>{const top=yTop+i*L.rh,app=ramp(s0,idx*.06,idx*.06+.4);idx++;
        const lx=12,ly=N?top+13:top+L.rh/2-1,py=N?top+50:top+L.rh/2+1;
        s+=`<g style="opacity:${f1(app)}">`;
        s+=`<text x="${lx}" y="${f1(ly)}" class="t-lbl" style="font-size:12.5px">${r.n}</text><text x="${lx}" y="${f1(N?top+26:ly+13)}" class="t-xs">${r.s}</text>`;
        if(r.m==='txt'){s+=`<text x="${N?22:L.P0}" y="${f1(N?top+42:ly+5)}" class="t-sm" style="font-style:italic">${r.x}</text>`}
        else if(r.m==='pct'){const xa=A.X(r.a),xb=r.b!=null?A.X(r.b):null,col=wc>0?CO_CERT[r.c][0]:'var(--ink)';
          if(xb!=null){const xe=lerp(xa,xb,ci);s+=`<line x1="${f1(xa)}" x2="${f1(xe)}" y1="${f1(py)}" y2="${f1(py)}" style="stroke:var(--muted);stroke-width:2"/>`;
            if(ci>.95)s+=`<circle cx="${f1(xb)}" cy="${f1(py)}" r="${f1(5*sq)}" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`}
          s+=`<circle cx="${f1(xa)}" cy="${f1(py)}" r="${f1(5.5*sq)}" style="fill:${col}"/>`;
          const tx=`${r.a}%${r.b!=null?' vs '+r.b+'%':''}`;s+=`<text x="${N?22:712}" y="${f1(N?top+38:py+4)}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink);opacity:${f1(sq)}">${tx}</text>`}
        else{const X=A.X,xe=X(r.e),hasCI=r.lo!=null,cross=hasCI&&((r.m==='smd'&&r.lo<0&&r.hi>0)||(r.m==='rr'&&r.lo<1&&r.hi>1));
          const col=wc>0?CO_CERT[r.c][0]:'var(--ink)',sz=lerp(9,lerp(5,15,clamp(Math.sqrt(r.w)/Math.sqrt(22))),wc)*sq;
          if(hasCI&&ci>0){const x0=lerp(xe,X(r.lo),ci),x1=lerp(xe,X(r.hi),ci);s+=`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(py)}" y2="${f1(py)}" style="stroke:${col};stroke-width:2"/>`;
            if(ci>.98)s+=`<line x1="${f1(x0)}" x2="${f1(x0)}" y1="${f1(py-4)}" y2="${f1(py+4)}" style="stroke:${col};stroke-width:2"/><line x1="${f1(x1)}" x2="${f1(x1)}" y1="${f1(py-4)}" y2="${f1(py+4)}" style="stroke:${col};stroke-width:2"/>`}
          const hollow=cross&&ne>.5;
          if(r.pool&&wc>0){const dw=lerp(sz/2,Math.abs(X(r.hi)-X(r.lo))/2,wc),dh=7*sq;s+=`<path d="M${f1(xe-dw)} ${f1(py)}L${f1(xe)} ${f1(py-dh)}L${f1(xe+dw)} ${f1(py)}L${f1(xe)} ${f1(py+dh)}Z" style="fill:${col};stroke:var(--panel);stroke-width:1"/>`}
          else if(sz>0)s+=`<rect x="${f1(xe-sz/2)}" y="${f1(py-sz/2)}" width="${f1(sz)}" height="${f1(sz)}" style="fill:${hollow?'var(--panel)':col};stroke:${col};stroke-width:${hollow?2:0}"/>`;
          if(hollow)s+=`<text x="${f1(X(r.hi)+6)}" y="${f1(py+3)}" class="t-xs" style="fill:var(--bad)">crosses ${r.m==='rr'?1:0}</text>`;
          const et=r.m==='rr'?`RR ${r.e.toFixed(2)}`:coFmt(r.e),ct=hasCI?(r.m==='rr'?` (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})`:` (${coFmt(r.lo)} to ${coFmt(r.hi)})`):'';
          s+=`<text x="${N?22:712}" y="${f1(N?top+38:py+4)}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink);opacity:${f1(sq)}">${et}<tspan style="opacity:${f1(ci)}">${ct}</tspan></text>`}
        s+='</g>'});
      y=yAx+(hasAx?(B.k==='pct'?50:64):8)});
    /* step 6: clinical relevance inset */
    if(md>0){const mx=N?22:300,mw=N?360:300,my=y+4;
      if(oc==='sev'){const X=v=>mx+mw*v/5;s+=`<g style="opacity:${f1(md)}"><text x="${mx}" y="${my+10}" class="t-sm" style="fill:var(--ink)">ZAN-BPD points (0–36 scale): pooled change vs MCID</text>`+
        `<rect x="${mx}" y="${my+18}" width="${f1(X(3.6*md)-mx)}" height="12" rx="3" style="fill:var(--good)"/><text x="${f1(X(3.6*md)+5)}" y="${my+28}" class="t-xs">−3.6 with therapy</text>`+
        `<line x1="${f1(X(3))}" x2="${f1(X(3))}" y1="${my+14}" y2="${my+36}" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:3 2"/><text x="${f1(X(3)-4)}" y="${my+48}" class="t-xs t-end" style="fill:var(--ink)">3.0 = smallest change that matters</text></g>`;y+=56}
      else{const msg=oc==='fun'?'≈ −2.8 GAF points: below the clinically meaningful cut-off':oc==='drop'?'about 1 in 4 stop early, mostly in the first half of treatment':'low certainty: not shown to reach the clinically meaningful cut-off';
        s+=`<text x="${mx}" y="${my+14}" class="t-sm" style="fill:var(--ink);opacity:${f1(md)}">${msg}</text>`;y+=26}}
    H=Math.max(N?420:300,Math.ceil(y+8));
    return {s,H}}
  function drawH2H(t,N){
    const rows=CO_H2H.filter(r=>r.o[oc]),s0=ramp(t,0,.15),mv=ramp(t,.17,.47),ne=ramp(t,.5,.6),wc=ramp(t,.67,.78);
    const L=N?{R0:92,R1:308,rh:66,top:66}:{R0:330,R1:560,rh:46,top:66};
    let s=`<text x="12" y="22" class="t-lbl">${CO_TAU[oc].t}: head-to-head trials</text><text x="12" y="38" class="t-xs">both arms are active treatments · marker moves toward the arm that did better</text>`;
    if(!rows.length){s+=`<text x="12" y="80" class="t-sm" style="font-style:italic">No head-to-head result for this outcome in the trials summarised here.</text>`;return {s,H:N?200:140}}
    const mid=(L.R0+L.R1)/2,half=(L.R1-L.R0)/2;
    if(ne>0)s+=`<text x="${f1(mid)}" y="${L.top-10}" class="t-xs t-mid" style="opacity:${f1(ne)}">no clear difference</text>`;
    rows.forEach((r,i)=>{const top=L.top+i*L.rh,app=ramp(s0,i*.07,i*.07+.4),[p,txt]=r.o[oc];
      const ry=N?top+34:top+16,col=wc>0?'var(--dx)':'var(--ink)';
      s+=`<g style="opacity:${f1(app)}"><text x="12" y="${f1(N?top+12:top+14)}" class="t-lbl" style="font-size:12.5px">${r.n}</text><text x="${N?388:12}" y="${f1(N?top+12:top+27)}" class="t-xs${N?' t-end':''}">${r.s}</text>`;
      s+=`<line x1="${L.R0}" x2="${L.R1}" y1="${f1(ry)}" y2="${f1(ry)}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
      if(ne>0)s+=`<line x1="${f1(mid)}" x2="${f1(mid)}" y1="${f1(ry-11)}" y2="${f1(ry+8)}" style="stroke:var(--ink);stroke-dasharray:3 2;opacity:${f1(.3+ne*.5)}"/>`;
      s+=`<text x="${L.R0-8}" y="${f1(ry+4)}" class="t-sm t-end" style="fill:${p<0&&ne>.5?'var(--rx)':'var(--ink)'};font-weight:${p<0&&ne>.5?700:500}">${r.a}</text><text x="${L.R1+8}" y="${f1(ry+4)}" class="t-sm" style="fill:${p>0&&ne>.5?'var(--rx)':'var(--ink)'}">${r.b}</text>`;
      const mx=mid+p*half*mv,neutral=p===0;
      s+=`<circle cx="${f1(mx)}" cy="${f1(ry)}" r="7" style="fill:${neutral&&ne>.5?'var(--panel)':col};stroke:${col};stroke-width:2.4"/>`;
      if(neutral&&ne>.5)s+=`<circle cx="${f1(mx)}" cy="${f1(ry)}" r="${f1(11+ne*2)}" style="fill:none;stroke:var(--muted);stroke-dasharray:2 3"/>`;
      s+=`<text x="${f1(N?mid:mid)}" y="${f1(ry+19)}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(mv)}">${txt}</text></g>`});
    const y=L.top+rows.length*L.rh;
    const nN=rows.filter(r=>r.o[oc][0]===0).length;
    s+=`<text x="12" y="${y+16}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(t,.84,.94))}">${nN} of ${rows.length} comparisons: no clear winner</text>`;
    return {s,H:y+30}}
  function draw(t){
    const N=NARROW(),R=cmp==='tau'?drawTau(t,N):drawH2H(t,N);
    vb(svg,'720 '+R.H,'400 '+R.H);svg.innerHTML=R.s;
    const p=phaseOf(CO_STEPS,t);setSt(p);
    const kv=cmp==='tau'?CO_TAU[oc].kv:CO_H2H_KV[oc];
    $('#coNote').innerHTML=noteHTML(CO_STEPS[p])+`<div class="kv"><div><dt>${CO_TAU[oc].t} · ${cmp==='tau'?'vs usual care':'head-to-head'}</dt><dd>${kv}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#coPlay'),draw,22000,'Replay','compare');
  setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  $$('[data-cmp]',sec).forEach(b=>b.addEventListener('click',()=>{cmp=b.dataset.cmp;$$('[data-cmp]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-oc]',sec).forEach(b=>b.addEventListener('click',()=>{oc=b.dataset.oc;$$('[data-oc]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- ingredient card sort ---- */
  const sh=$('#coShared'),di=$('#coDist');
  function sortCards(th){
    sh.innerHTML='<h4>Shared ingredients</h4>'+CO_ING.map(g=>{const on=g.th.includes(th);
      return `<div class="ing ${on?'on':'off'}"><b class="h">${g.h}</b><div class="chips">${g.th.map(x=>`<span class="tag ${x===th?'rx':''}">${CO_TH[x]}</span>`).join('')}</div><p>${g.p}</p></div>`}).join('');
    di.innerHTML=`<h4>Distinctive to ${CO_TH[th]==='Schema'?'schema therapy':CO_TH[th]}</h4>`+CO_DIST[th].map(d=>`<div class="ing on"><b class="h">${d.h}</b><p>${d.p}</p></div>`).join('')+
      `<p class="stage-cap">Lit cards are the ingredients this guide's sources describe for ${CO_TH[th]==='Schema'?'schema therapy':CO_TH[th]} (${CO_ING.filter(g=>g.th.includes(th)).length} of ${CO_ING.length}). A dim card means the sources here do not describe it, not that the therapy lacks it.</p>`}
  $$('[data-th]',sec).forEach(b=>b.addEventListener('click',()=>{$$('[data-th]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));sortCards(b.dataset.th)}));
  sortCards('dbt');
};
/* =============== 4.1 Medication: the evidence =============== */
/* polypharmacy pile-up: one illustrative person over 24 months (schematic) */
const ME_CRISES=[2,6,11,16];
const ME_PILLS=[
 {m:2,lab:'Sedative for a crisis',col:'var(--med)',keep:false},
 {m:6,lab:'Antipsychotic added',col:'var(--storm)',keep:false},
 {m:11,lab:'Antidepressant added',col:'var(--dx)',keep:true},
 {m:16,lab:'Mood stabiliser added',col:'var(--accent)',keep:false}];
const ME_STEPS=[
 {from:0,at:.1,k:'Month 2 · first crisis',t:'One crisis, one prescription',
  txt:`A crisis brings the person to a doctor, and a sedative is started. NICE CG78 allows short-term sedative medication "cautiously" in a crisis: a single drug with a low side-effect profile, low addictive properties and "relative safety in overdose", agreed in advance, and usually stopped within 1 week. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
  pt:`A short-term medicine in a crisis can be reasonable. The plan should say when it stops.`,
  hook:`NICE CG78: crisis sedatives only short-term, usually stopped within 1 week. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`},
 {from:.2,at:.27,k:'Month 6 · another crisis',t:'Another crisis, another drug',
  txt:`The first medicine was never stopped, and a new crisis adds an antipsychotic. APA 2024 warns that "Frequent dose escalation or medication changes in response to crises or transient mood states are also problematic and rarely effective", and that medicines "would not be expected to affect core features of BPD". <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>`,
  pt:`Adding a new medicine after every crisis rarely helps, because medicines do not treat the core of BPD.`},
 {from:.4,at:.5,k:'Month 11 · the pile-up',t:'Most people end up on several',
  txt:`This is common. In 2195 European inpatients with BPD, 90% received at least one psychotropic drug, 80% two or more and 54% three or more (mean 2.8); quetiapine was the most used single drug (22%). In a UK audit, 92% of people with emotionally unstable personality disorder were prescribed psychotropics. A review puts it at "up to 96%". <sup class="c" data-ref="Bridler2015,Paton2015,Gartlehner2021" title="Source 78,174,404">78,174,404</sup>`,
  pt:`Most people with BPD who are in hospital take two or more psychiatric medicines, even though none is approved for BPD.`,
  hook:`About 90% of inpatients with BPD receive psychotropics and over half receive three or more. <sup class="c" data-ref="Bridler2015" title="Source 78">78</sup>`},
 {from:.58,at:.68,k:'Months 16–18 · by default',t:'Continued by default',
  txt:`People with BPD and no co-occurring diagnosis were less likely to have had a medication review in the past year, and treatment "may be continued long term by default". In the McLean study, use of antipsychotics and mood stabilisers stayed stable over 16 years, and "as needed" medicine use was about twice as common in people who never recovered. <sup class="c" data-ref="Paton2015,Zanarini2015Meds,Martinho2014PRN" title="Source 331,404,594">331,404,594</sup>`,
  pt:`Medicines started in a crisis often stay on the list for years unless someone reviews them.`},
 {from:.74,at:.83,k:'Month 18 · review',t:'Review and reconcile',
  txt:`APA recommends (1C) a review and reconciliation of medications "at least every 6 months", to find those that "warrant tapering or discontinuation", and notes review is "especially useful following stabilization of an acute crisis". NICE asks for review "with the aim of reducing and stopping unnecessary drug treatment". Any change is planned with the prescriber. <sup class="c" data-ref="APA2024Guideline,NICE2009" title="Source 12,379">12,379</sup>`,
  pt:`It is reasonable to ask what each medicine is for and when it will be reviewed. Changes should be planned with your doctor, not made suddenly on your own.`,
  hook:`APA 2024 (1C): review and reconcile medicines at least every 6 months. NICE: aim to reduce and stop unnecessary drugs. <sup class="c" data-ref="APA2024Guideline,NICE2009" title="Source 12,379">12,379</sup>`},
 {from:.9,at:1,k:'Month 24 · what stays',t:'A clear target, or nothing',
  txt:`What remains should have a clear reason. NICE allows drug treatment for "comorbid conditions"; APA suggests (2C) any medicine be "time-limited, aimed at addressing a specific measurable target symptom, and adjunctive to psychotherapy". In this sketch, an antidepressant stays because a co-occurring depression was diagnosed; the main treatment is psychotherapy. <sup class="c" data-ref="NICE2009,APA2024Guideline,Bohus2021" title="Source 12,66,379">12,66,379</sup>`,
  pt:`A medicine can still be right for a separate condition such as depression. Therapy remains the main treatment for BPD.`,
  hook:`APA 2024 (2C): time-limited, a measurable target symptom, adjunctive to psychotherapy. <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>`}
];
/* Cochrane 2022 vs placebo (very low certainty unless stated) */
const ME_CL={
 ap:{n:'Antipsychotics',sh:'Antipsych.',col:'var(--storm)',
  rows:[{o:'BPD severity',m:'smd',e:-.18,lo:-.45,hi:.08,k:'8 trials, 951',c:'vlow'},{o:'Self-harm',m:'rr',e:.66,lo:.15,hi:2.84,k:'2 trials, 76',c:'vlow'},{o:'Suicide-related',m:'smd',e:.05,lo:-.18,hi:.29,k:'7 trials, 854',c:'vlow'},{o:'Functioning',m:'smd',e:-.16,lo:-.33,hi:0,k:'7 trials, 904',c:'vlow'},{o:'Interpersonal problems',m:'smd',e:-.21,lo:-.34,hi:-.08,k:'8 trials, 907',c:'low'}],
  trials:[`<b>Quetiapine XR</b> (95 adults, 8 weeks): 150 mg/day improved ZAN-BPD vs placebo; responders among completers 82% (150 mg), 74% (300 mg), 48% (placebo); sedation drove dropout. <sup class="c" data-ref="Black2014Quetiapine" title="Source 57">57</sup>`,
   `<b>Olanzapine</b> (451 people, 12 weeks): only 5–10 mg/day beat placebo (ZAN-BPD −8.5 vs −6.8; effect size 0.29), "a clinically modest advantage", with +3.17 kg weight gain vs +0.02 kg. A 314-person variable-dose trial found no difference. <sup class="c" data-ref="Zanarini2011Olanzapine,Schulz2008Olanzapine" title="Source 463,590">463,590</sup>`,
   `<b>Aripiprazole, ziprasidone, haloperidol</b>: one small positive aripiprazole trial; ziprasidone no different from placebo; haloperidol's early benefit was not replicated. <sup class="c" data-ref="Nickel2006Aripiprazole,Pascual2008Ziprasidone,Soloff1993Phenelzine" title="Source 382,403,494">382,403,494</sup>`],
  harm:`Weight gain, metabolic syndrome, movement side effects or tardive dyskinesia; NICE: not for medium- or long-term treatment of BPD. <sup class="c" data-ref="APA2024Guideline,NICE2009" title="Source 12,379">12,379</sup>`,
  co:`Second-generation antipsychotics carry US indications for conditions such as schizophrenia and bipolar disorder, not BPD. APA: a low dose "may be used" for psychosis, high impulsivity or agitation. <sup class="c" data-ref="FDA-Seroquel,APA2024Guideline" title="Source 12,153">12,153</sup>`},
 ms:{n:'Mood stabilisers',sh:'Mood stab.',col:'var(--accent)',
  rows:[{o:'BPD severity',m:'smd',e:-.07,lo:-.43,hi:.57,k:'4 trials, 265',c:'vlow'},{o:'Self-harm',m:'rr',e:1.08,lo:.79,hi:1.48,k:'1 trial, 276',c:'vlow'},{o:'Interpersonal problems',m:'smd',e:-.58,lo:-1.14,hi:-.02,k:'4 trials, 300',c:'low'}],
  trials:[`<b>LABILE</b> (UK, 276 adults, lamotrigine up to 400 mg/day, 52 weeks): ZAN-BPD 11.3 vs 11.5 on placebo, adjusted difference 0.1 (95% CI −1.8 to 2.0); no difference on any secondary outcome; "not a clinically effective or cost-effective use of resources". Only 36% and 42% were still taking study medicine at 52 weeks. <sup class="c" data-ref="Crawford2018LABILE" title="Source 109">109</sup>`,
   `<b>Earlier small trials</b>: lamotrigine in 24 women reduced self-rated anger; divalproex beat placebo for impulsive aggression in 52 outpatients; topiramate improved several scales. Pooled early effects (SMD 1.51 for impulsive dyscontrol) were not confirmed by LABILE. <span class="ev early">Early evidence, superseded</span> <sup class="c" data-ref="Tritt2005Lamotrigine,Hollander2005Divalproex,Loew2006Topiramate,Ingenhoven2010" title="Source 229,237,316,533">229,237,316,533</sup>`],
  harm:`Valproate: neural tube defects and lower child IQ after exposure in pregnancy, polycystic ovaries; lamotrigine: Stevens-Johnson syndrome; topiramate: cognitive effects; lithium: narrow therapeutic index. <sup class="c" data-ref="APA2024Guideline,FDA-Depakote,FDA-Lamictal,FDA-Lithobid" title="Source 12,148,150,151">12,148,150,151</sup>`,
  co:`Lamotrigine and valproate carry US indications for epilepsy and bipolar disorder, not BPD. APA notes lithium's narrow therapeutic index and toxicity in overdose for people with BPD and bipolar disorder. <sup class="c" data-ref="FDA-Lamictal,FDA-Depakote,APA2024Guideline" title="Source 12,148,150">12,148,150</sup>`},
 ad:{n:'Antidepressants',sh:'Antidep.',col:'var(--dx)',
  rows:[{o:'BPD severity',m:'smd',e:-.27,lo:-.65,hi:1.18,k:'2 trials, 87',c:'vlow'}],
  trials:[`<b>Too few trials</b>: Cochrane 2022 found too little data for firm conclusions; for self-harm there was one 20-person trial. <sup class="c" data-ref="StoffersWinterling2022" title="Source 512">512</sup>`,
   `<b>Fluoxetine</b> (22 people, 13 weeks) reduced anger, with a high placebo response; <b>fluvoxamine</b> (38 women) reduced rapid mood shifts but not impulsivity or aggression; <b>phenelzine</b> beat haloperidol on anger and hostility in 1993. <sup class="c" data-ref="Salzman1995,Rinne2002,Soloff1993Phenelzine" title="Source 434,446,494">434,446,494</sup>`],
  harm:`Boxed warning: more suicidal thoughts and behaviour in children, adolescents and young adults in short-term studies. Swedish registry: HR 1.38 for suicidal behaviour on vs off antidepressants (observational). <sup class="c" data-ref="FDA-Prozac,Lieslehto2023Suicide" title="Source 152,307">152,307</sup>`,
  co:`Depression is common with BPD: NESARC found lifetime mood disorders in 82.7%. NICE allows drug treatment for comorbid conditions such as this. <sup class="c" data-ref="Tomko2014,NICE2009" title="Source 379,528">379,528</sup>`},
 cz:{n:'Clozapine',sh:'Clozapine',col:'var(--storm)',ring:1,rows:[],
  trials:[`<b>CALMED</b> (UK): aimed for 222 inpatients with severe BPD, closed early with 29 because of poor recruitment and COVID-19; ZAN-BPD difference −3.86 (95% CI −10.04 to 2.32), so the question could not be answered. <sup class="c" data-ref="Crawford2022CALMED" title="Source 110">110</sup>`,
   `<b>Observational</b>: in 1107 Danish people with BPD, psychiatric bed-days fell from 190.08 to 65.95 after starting clozapine (mirror-image, no control group); in Sweden clozapine was linked to less rehospitalisation (HR 0.54); a 2025 register study found no hospitalisation benefit in BPD. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Rohde2018Clozapine,Lieslehto2023Outcomes,Luykx2025Clozapine" title="Source 306,322,435">306,322,435</sup>`],
  harm:`Boxed warning: severe neutropenia, orthostatic hypotension, bradycardia and syncope, seizure, myocarditis. Its US label for reducing suicidal behaviour covers schizophrenia and schizoaffective disorder only. <sup class="c" data-ref="FDA-Clozaril" title="Source 147">147</sup>`,
  co:`APA: clozapine "may be considered" for extremely ill hospitalized patients, based on case reports, naturalistic data and a small trial. <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>`},
 bz:{n:'Benzodiazepines',sh:'Benzos',col:'var(--bad)',ring:1,rows:[],
  trials:[`<b>No trial benefit</b> on core BPD outcomes in the research summarised here. Swedish within-person cohort (22,601 people): attempted or completed suicide HR 1.61 (1.45–1.78) on vs off benzodiazepines, the highest of the classes studied. <span class="ev early">Early evidence: observational</span> <sup class="c" data-ref="Lieslehto2023Suicide" title="Source 307">307</sup>`,
   `<b>Rehospitalisation</b>: HR 1.38 on benzodiazepines in a sister analysis of 17,532 people. <sup class="c" data-ref="Lieslehto2023Outcomes" title="Source 306">306</sup>`],
  harm:`APA: "not generally recommended because of potential for greater impulsivity or disinhibition as well as potential for misuse or development of dependence". <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>`,
  co:`Anxiety disorders are common with BPD (lifetime 84.8% in NESARC); the APA caution about benzodiazepines in BPD still applies. <sup class="c" data-ref="Tomko2014,APA2024Guideline" title="Source 12,528">12,528</sup>`},
 o3:{n:'Omega-3 and others',sh:'Omega-3',col:'var(--med)',rows:[],
  trials:[`<b>Omega-3</b> (ethyl-EPA 1 g/day, 30 women, 8 weeks): better than placebo for aggression and depressive symptoms in this pilot. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Zanarini2003Omega3" title="Source 576">576</sup>`,
   `<b>Naltrexone</b> for dissociation (two small crossover trials, 29 people): lower but not significantly. <sup class="c" data-ref="Schmahl2012" title="Source 459">459</sup>`,
   `<b>ADHD medicines</b>: linked to lower suicidal-behaviour hazard (HR 0.83) and less rehospitalisation (HR 0.88) in Swedish registry data. Observational only. <sup class="c" data-ref="Lieslehto2023Suicide,Lieslehto2023Outcomes" title="Source 306,307">306,307</sup>`],
  harm:`Small pilots: no reliable safety picture. Report all supplements to the prescriber.`,
  co:`ADHD is among the conditions that can come with BPD; the registry signal for ADHD medicines is observational and untested in trials. <sup class="c" data-ref="Lieslehto2023Suicide" title="Source 307">307</sup>`},
 nw:{n:'Newer agents',sh:'Newer',col:'var(--hpa)',rows:[],
  trials:[`<b>Brexpiprazole</b> phase 2 (324 people, 11 weeks; NCT04100096): primary endpoint not met (difference −1.02; p = 0.24); akathisia 14.0% vs 1.2%. <sup class="c" data-ref="Rothman2024Brexpiprazole,NCT04100096" title="Source 364,439">364,439</sup>`,
   `<b>BI 1358894</b>, a TRPC4/5 inhibitor (390 people; NCT04566601): no difference from placebo on any endpoint. <sup class="c" data-ref="Dwyer2025BI1358894,NCT04566601" title="Source 137,365">137,365</sup>`,
   `<b>Memantine</b> (33 people, 8 weeks): reduced ZAN-BPD over time vs placebo. <span class="ev early">Early evidence</span> Ketamine, MDMA, oxytocin and methylphenidate studies are small or early-phase. See <a href="#frontier" data-go="frontier">Research toward better care</a>. <sup class="c" data-ref="Kulkarni2018Memantine,NCT07099534,NCT06683014,NCT07551882,NCT06759298" title="Source 288,369,370,371,373">288,369,370,371,373</sup>`],
  harm:`Large placebo responses and high dropout are common in BPD drug trials. <sup class="c" data-ref="Grant2022Brexpiprazole,Rothman2024Brexpiprazole,Dwyer2025BI1358894" title="Source 137,185,439">137,185,439</sup>`,
  co:`None of these is approved for BPD; they are research medicines here. <sup class="c" data-ref="Rothman2024Brexpiprazole" title="Source 439">439</sup>`}
};
const ME_ORDER=['ap','ms','ad','cz','bz','o3','nw'];
const ME_MXC=[['sev','BPD severity'],['sh','Self-harm'],['sui','Suicide-related'],['fun','Functioning'],['ip','Interpersonal']];
const ME_MX=[
 {r:'Antipsychotics',cl:{sev:['−0.18','vlow','SMD −0.18 (95% CI −0.45 to 0.08); 8 trials, 951 people'],sh:['RR 0.66','vlow','RR 0.66 (0.15 to 2.84); 2 trials, 76 people'],sui:['0.05','vlow','SMD 0.05 (−0.18 to 0.29); 7 trials, 854 people'],fun:['−0.16','vlow','SMD −0.16 (−0.33 to 0.00); 7 trials, 904 people'],ip:['−0.21','low','SMD −0.21 (−0.34 to −0.08); 8 trials, 907 people: "may slightly reduce" interpersonal problems']}},
 {r:'Mood stabilisers',cl:{sev:['−0.07','vlow','SMD −0.07 (−0.43 to 0.57); 4 trials, 265 people'],sh:['RR 1.08','vlow','RR 1.08 (0.79 to 1.48); 1 trial, 276 people'],ip:['−0.58','low','SMD −0.58 (−1.14 to −0.02); 4 trials, 300 people: "may reduce" interpersonal problems']}},
 {r:'Antidepressants',cl:{sev:['−0.27','vlow','SMD −0.27 (−0.65 to 1.18); 2 trials, 87 people'],sh:['1 trial','vlow','a single 20-person trial; too few data for a conclusion']}},
 {r:'Psychotherapy vs usual care',pt:1,cl:{sev:['−0.52','mod','SMD −0.52 (−0.70 to −0.33); 22 trials, 1244 people; moderate certainty'],sh:['−0.32','low','SMD −0.32 (−0.49 to −0.14); 13 trials'],sui:['−0.34','low','SMD −0.34 (−0.57 to −0.11); 13 trials'],fun:['−0.45','low','SMD −0.45 (−0.68 to −0.22); 22 trials']}}
];
const ME_CN={mod:'moderate certainty',low:'low certainty',vlow:'very low certainty'};

inits.meds=()=>{
  const sec=$('#m-meds'),svg=$('#meSvg'),rg=$('#meT');
  const dist=u=>{let v=.16;ME_CRISES.forEach((m,i)=>{const d=u-m/24;if(d>0)v+=.7*(1-Math.exp(-d/.006))*Math.exp(-d/.03)*(i===3?.9:1)});return clamp(v)};
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 660'),M=t*24;
    const W=N?{x:20,y:34,w:360,h:90}:{x:24,y:34,w:430,h:100};
    let s=`<text x="${W.x}" y="22" class="t-sm">DISTRESS (schematic) · months 0–24</text>`;
    const wv=wave(W.x,W.y,W.w,W.h,dist,{upto:t,fill:true,col:'var(--storm)',dot:true});s+=wv.svg;
    s+=`<line x1="${W.x}" x2="${W.x+W.w}" y1="${W.y+W.h+4}" y2="${W.y+W.h+4}" class="axis"/>`;
    [0,6,12,18,24].forEach(m=>{const x=W.x+W.w*m/24;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${W.y+W.h+4}" y2="${W.y+W.h+8}" class="axis"/><text x="${f1(x)}" y="${W.y+W.h+20}" class="t-xs t-mid">${m}</text>`});
    ME_CRISES.forEach((m,i)=>{if(M<m)return;const x=W.x+W.w*m/24;s+=`<text x="${f1(x+4)}" y="${W.y+8}" class="t-xs" style="fill:var(--storm)">crisis ${i+1}</text>`});
    /* review band */
    if(M>=18){const x0=W.x+W.w*18/24,x1=W.x+W.w*Math.min(M,21)/24;s+=`<rect x="${f1(x0)}" y="${W.y}" width="${f1(Math.max(2,x1-x0))}" height="${W.h}" style="fill:var(--accent-soft);opacity:.7"/><text x="${f1(x0+4)}" y="${W.y+W.h-6}" class="t-xs" style="fill:var(--accent)">review</text>`}
    /* the pill stack */
    const S=N?{x:110,y0:330,lx:160,top:176}:{x:120,y0:350,lx:170,top:182};
    s+=`<text x="${N?20:24}" y="${S.top}" class="t-sm">PRESCRIPTION LIST</text>`;
    let onList=0;
    ME_PILLS.forEach((p,i)=>{if(M<p.m)return;const dp=ease(clamp((M-p.m)/1.2));const sx=W.x+W.w*p.m/24,sy=W.y+W.h*(1-dist(p.m/24+.004));
      const ty=S.y0-i*34,x=lerp(sx,S.x,dp),y=lerp(sy,ty,dp);
      let gone=0;if(!p.keep&&M>18)gone=ease(clamp((M-18-i*.6)/1.4));
      const op=1-gone;if(op<=.02)return;
      if(gone<.5)onList++;
      s+=`<g style="opacity:${f1(op)}" transform="translate(${f1(-gone*40)} 0)">${pill(x,y,46,{col:p.col,ang:(1-dp)*35})}`;
      if(dp>.9){s+=`<text x="${S.lx}" y="${f1(ty+4)}" class="t-sm" style="fill:var(--ink)">${p.lab}</text>`;
        if(gone>0)s+=`<line x1="${S.lx}" x2="${S.lx+150}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--bad);stroke-width:1.6"/>`;
        if(p.keep&&M>21)s+=`<text x="${S.lx}" y="${f1(ty+17)}" class="t-xs" style="fill:var(--accent)">kept: diagnosed co-occurring depression</text>`}
      s+='</g>'});
    if(M>=12&&M<18){const pr=clamp((M-12)/2);s+=`<g style="opacity:${f1(pr)}">${pill(S.x,S.y0-4*34,30,{col:'var(--muted)'})}<text x="${S.lx}" y="${S.y0-4*34+4}" class="t-sm">+ "as needed" extras</text></g>`}
    if(M<2)s+=`<text x="${S.lx-40}" y="${S.y0+4}" class="t-sm" style="font-style:italic">no medicines yet</text>`;
    s+=`<line x1="${S.x-40}" x2="${S.x+40}" y1="${S.y0+22}" y2="${S.y0+22}" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"/>`;
    /* published bars */
    const B=N?{x:20,y:416,w:300,lw:0}:{x:480,y:60,w:150,lw:0},bp=ramp(t,.4,.56);
    s+=`<text x="${B.x}" y="${B.y-14}" class="t-sm">PUBLISHED: INPATIENTS WITH BPD</text>`;
    [ [90,'1 or more psychotropic'],[80,'2 or more'],[54,'3 or more'] ].forEach(([v,l],i)=>{const y=B.y+i*(N?44:48);
      s+=`<text x="${B.x}" y="${y+8}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${B.x}" y="${y+14}" width="${B.w}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${y+14}" width="${f1(B.w*v/100*bp)}" height="14" rx="4" style="fill:var(--med)"/><text x="${f1(B.x+B.w+6)}" y="${y+25}" class="t-sm" style="fill:var(--ink);opacity:${f1(bp)}">${Math.round(v*bp)}%</text>`});
    const ny=B.y+3*(N?44:48)+8;
    s+=`<g style="opacity:${f1(bp)}"><text x="${B.x}" y="${ny}" class="t-xs">mean 2.8 drugs · Bridler 2015, n = 2195</text><text x="${B.x}" y="${ny+16}" class="t-xs">UK audit: 92% prescribed · Paton 2015</text></g>`;
    const rv=ramp(t,.74,.8);
    if(rv>0){const ry=ny+40;s+=`<g style="opacity:${f1(rv)}"><rect x="${B.x}" y="${ry}" width="${N?360:226}" height="${N?62:92}" rx="10" style="fill:var(--accent-soft);stroke:var(--accent)"/>`+
      (N?`<text x="${B.x+10}" y="${ry+20}" class="t-sm" style="fill:var(--ink)">APA 2024: review at least every 6 months</text><text x="${B.x+10}" y="${ry+38}" class="t-sm" style="fill:var(--ink)">NICE: aim to reduce and stop</text><text x="${B.x+10}" y="${ry+54}" class="t-sm" style="fill:var(--ink)">unnecessary drug treatment</text>`
        :`<text x="${B.x+10}" y="${ry+20}" class="t-sm" style="fill:var(--ink)">APA 2024 (1C): review and</text><text x="${B.x+10}" y="${ry+36}" class="t-sm" style="fill:var(--ink)">reconcile at least every</text><text x="${B.x+10}" y="${ry+52}" class="t-sm" style="fill:var(--ink)">6 months. NICE: reduce</text><text x="${B.x+10}" y="${ry+68}" class="t-sm" style="fill:var(--ink)">and stop unnecessary drugs.</text>`)+'</g>'}
    svg.innerHTML=s;
    const p=phaseOf(ME_STEPS,t);setSt(p);
    $('#meNote').innerHTML=noteHTML(ME_STEPS[p]);
    $('#meRead').innerHTML=`<span>month <b>${Math.floor(M)}</b></span><span>crises <b>${ME_CRISES.filter(m=>M>=m).length}</b></span><span>medicines on the list <b>${onList}</b></span><span>status <b>${M<18?'no review yet':M<21.5?'under review':'reviewed'}</b></span>`;
  }
  const stop=playWire(rg,$('#mePlay'),draw,20000,'Replay','meds');
  setSt=stepWire($('#meSteps'),ME_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- evidence board ---- */
  const bd=$('#meBoard'),card=$('#meCard');let cl='ap',lens='core',stopC=null;
  function drawBoard(){
    const N=vb(bd,'520 420','400 470'),cx=N?200:260,cy=N?220:200,rx=N?150:190,ry=N?170:150;
    let s=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:none;stroke:var(--line);stroke-dasharray:3 5"/>`;
    s+=pill(cx,cy-12,78,{cross:true,col:'var(--med)'});
    const cl1=lens==='core'?['No medicine is','approved for BPD itself']:['For conditions that','come with BPD'];
    s+=`<text x="${cx}" y="${cy+50}" class="t-lbl t-mid">${cl1[0]}</text><text x="${cx}" y="${cy+66}" class="t-lbl t-mid">${cl1[1]}</text>`;
    if(lens==='co')s+=`<text x="${cx}" y="${cy+84}" class="t-xs t-mid">treated per that condition's guidance</text>`;
    ME_ORDER.forEach((k,i)=>{const a=-Math.PI/2+i*2*Math.PI/ME_ORDER.length,x=cx+rx*Math.cos(a),y=cy+ry*Math.sin(a),C=ME_CL[k],on=k===cl;
      s+=`<g class="clk" data-cl="${k}" tabindex="0" role="button" aria-label="${C.n}">`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?32:26}" style="fill:${on?'var(--med-soft)':'var(--panel)'};stroke:${C.ring?'var(--bad)':on?'var(--med)':'var(--line)'};stroke-width:${on||C.ring?2:1}"/>`;
      s+=pill(x,y,on?40:32,{col:C.col,ang:-30});
      s+=`<text x="${f1(x)}" y="${f1(y+(on?46:40))}" class="t-sm t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${N?C.sh:C.n.replace(' and others','')}</text></g>`;
      });
    bd.innerHTML=s}
  function forest(C,k){/* mini forest plot of Cochrane rows, k 0..1 grows the CIs */
    const rows=C.rows.filter(r=>r.m==='smd'),rr=C.rows.filter(r=>r.m==='rr'),N=NARROW();
    if(!rows.length&&!rr.length)return '';
    const W=N?320:480,a0=N?12:150,a1=W-10,rh=N?36:26,y0=N?40:34,X=v=>lerp(a0,a1,(v+1.2)/2.4);
    const all=rows.concat([{o:'Psychotherapy (for contrast)',m:'smd',e:-.52,lo:-.70,hi:-.33,k:'vs usual care',c:'mod',pt:1}]);
    const ay=y0+all.length*rh-10,H=ay+34;
    let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Cochrane 2022 estimates against placebo for ${C.n}">`;
    s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="14" y2="${ay}" style="stroke:var(--ink);stroke-dasharray:4 3;opacity:.6"/>`;
    all.forEach((r,i)=>{const y=y0+i*rh,col=r.c==='mod'?'var(--good)':r.c==='low'?'var(--warn)':'var(--bad)';
      s+=N?`<text x="4" y="${y-9}" class="t-sm" style="fill:var(--ink)">${r.o} <tspan class="t-xs">${r.e<0?'−'+Math.abs(r.e):r.e}</tspan></text>`:`<text x="4" y="${y+4}" class="t-xs" style="fill:var(--ink)">${r.o}</text>`;
      s+=`<line x1="${f1(lerp(X(r.e),X(r.lo),k))}" x2="${f1(lerp(X(r.e),X(r.hi),k))}" y1="${y}" y2="${y}" style="stroke:${col};stroke-width:2"/>`;
      s+=r.pt?`<path d="M${f1(X(r.e)-7)} ${y}L${f1(X(r.e))} ${y-6}L${f1(X(r.e)+7)} ${y}L${f1(X(r.e))} ${y+6}Z" style="fill:${col}"/>`:`<rect x="${f1(X(r.e)-4.5)}" y="${y-4.5}" width="9" height="9" style="fill:${col}"/>`});
    s+=`<line x1="${a0}" x2="${a1}" y1="${ay}" y2="${ay}" class="axis"/>`;[-1,-.5,0,.5,1].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${ay+13}" class="t-xs t-mid">${v<0?'−'+Math.abs(v):v}</text>`});
    s+=`<text x="${f1(X(0)-4)}" y="${ay+26}" class="t-xs t-end" style="fill:var(--rx)">← favours treatment</text><text x="${f1(X(0)+4)}" y="${ay+26}" class="t-xs">favours placebo / control →</text>`;
    s+=`<text x="${a1}" y="10" class="t-xs t-end">SMD, 95% CI</text></svg>`;
    if(rr.length)s+=rr.map(r=>`<p class="stage-cap">${r.o}: RR ${r.e} (95% CI ${r.lo}–${r.hi}), crosses 1 · ${r.k} people</p>`).join('');
    return s}
  function openCard(quiet){
    const C=ME_CL[cl];if(stopC)stopC();
    const head=`<div class="sub">${lens==='core'?'Core BPD outcomes':'Co-occurring conditions'}</div><h4>${C.n}</h4>`;
    if(lens==='co'){card.innerHTML=head+`<p>${C.co}</p><p>NICE: drug treatment "may be considered in the overall treatment of comorbid conditions". A 2025 re-analysis of the Cochrane data found that its findings "do not support the use of pharmacological interventions in people with BPD to target co-occurring psychopathology" within BPD. Treating a diagnosed co-occurring condition in its own right, on that condition's evidence, is a separate question. <sup class="c" data-ref="NICE2009,PereiraRibeiro2025" title="Source 379,407">379,407</sup></p><p class="stage-cap">Lifetime co-occurring disorders in BPD (NESARC): anxiety 84.8%, mood 82.7%, substance use 78.2%; about 30% have PTSD. <sup class="c" data-ref="Tomko2014,Pagura2010PTSD" title="Source 396,528">396,528</sup></p>`;return}
    const hasF=C.rows.length;
    const draw1=k=>{card.innerHTML=head+(hasF?`<p class="sub">Cochrane 2022 vs placebo</p>${forest(C,k)}`:`<p class="sub">No pooled Cochrane estimate</p>`)+`<p class="sub">Key trials</p><ul>${C.trials.map(x=>`<li>${x}</li>`).join('')}</ul><p class="sub">Harms</p><p>${C.harm}</p>`+(hasF?`<p class="stage-cap">Cochrane 2022: 46 trials, 2769 participants; "no difference in effects were observed on any of the primary outcomes at the end of treatment for any medication". <sup class="c" data-ref="StoffersWinterling2022" title="Source 512">512</sup></p>`:'')};
    if(hasF&&!quiet){stopC=animate(700,p=>draw1(ease(p)))}else draw1(1)}
  function pick(k,quiet){cl=k;$$('[data-cl]',sec).forEach(b=>{if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',b.dataset.cl===k)});drawBoard();openCard(quiet)}
  $$('button[data-cl]',sec).forEach(b=>b.addEventListener('click',()=>pick(b.dataset.cl)));
  bd.addEventListener('click',e=>{const g=e.target.closest('[data-cl]');if(g)pick(g.dataset.cl)});
  bd.addEventListener('keydown',e=>{const g=e.target.closest('[data-cl]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(g.dataset.cl)}});
  $$('[data-lens]',sec).forEach(b=>b.addEventListener('click',()=>{lens=b.dataset.lens;$$('[data-lens]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));drawBoard();openCard()}));
  pick('ap',true);
  const prevR=redraws.meds;redraws.meds=()=>{prevR&&prevR();drawBoard();openCard(true)};

  /* ---- certainty matrix ---- */
  const mx=$('#meMx'),mn=$('#meMxNote');
  mx.innerHTML=`<thead><tr><th>Drug class vs placebo</th>${ME_MXC.map(c=>`<th>${c[1]}</th>`).join('')}</tr></thead><tbody>`+ME_MX.map((r,i)=>`<tr${r.pt?' class="hl"':''}><th>${r.r}</th>${ME_MXC.map(([c])=>{const v=r.cl[c];return `<td><button class="${v?'c-'+v[1]:'c-none'}" data-mx="${i}:${c}" aria-pressed="false">${v?v[0]:'—'}<small>${v?ME_CN[v[1]]:'no estimate'}</small></button></td>`}).join('')}</tr>`).join('')+'</tbody>';
  function mxNote(i,c){const r=ME_MX[i],v=r.cl[c],cn=ME_MXC.find(x=>x[0]===c)[1];
    mn.innerHTML=`<div class="kicker">${r.r} · ${cn}</div><h4>${v?v[0]+' · '+ME_CN[v[1]]:'No pooled estimate'}</h4><p>${v?v[2]+'.':'The reviews summarised here report no pooled estimate for this cell.'} ${r.pt?'Source: Cochrane 2020 psychotherapy review. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>':'Source: Cochrane 2022 medication review. "No pharmacological therapy seems effective in specifically treating BPD pathology." <sup class="c" data-ref="StoffersWinterling2022" title="Source 512">512</sup>'}</p>
      <div class="pt"><b>In plain words</b>${v&&v[1]==='vlow'?'Very low certainty: few or small trials, so the true effect could be quite different from this estimate.':v&&v[1]==='low'?'Low certainty: a possible small benefit, based on few and small trials.':v?'Moderate certainty: the most solid result in this table.':'Not enough studies to say.'}</div>`}
  mx.addEventListener('click',e=>{const b=e.target.closest('[data-mx]');if(!b)return;$$('[data-mx]',mx).forEach(x=>x.setAttribute('aria-pressed',x===b));const [i,c]=b.dataset.mx.split(':');mxNote(+i,c)});
  const first=$('[data-mx="0:sev"]',mx);first.setAttribute('aria-pressed','true');mxNote(0,'sev');
};
/* =============== 4.2 Suicide & self-harm safety =============== */
/* Safe messaging: no methods or means anywhere in this module; help-seeking and treatability throughout. */
const CS_STEPS=[
 {from:0,at:.08,k:'Step 1 of 6',t:'Warning signs',
  txt:`A safety plan is "a brief clinical intervention" that combines evidence-based strategies into a prioritised list of coping skills and strategies. <sup class="c" data-ref="Stanley2018ED" title="Source 501">501</sup> It starts with warning signs: the thoughts, moods and situations that tend to come before a crisis. A NICE crisis plan likewise names the person's likely triggers. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
  pt:`Knowing your own early signs lets you start using the plan before the wave reaches its peak.`,
  hook:`Safety plan plus at least 2 follow-up calls: suicidal behaviour in 3.03% vs 5.29% over 6 months (OR 0.56). <sup class="c" data-ref="Stanley2018ED" title="Source 501">501</sup>`},
 {from:1/6,at:1/6+.08,k:'Step 2 of 6',t:'Internal coping',
  txt:`Next come things the person can do on their own to get through the peak. Self-management strategies that have worked before are a core part of a NICE crisis plan. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup> Skills-based therapy targets exactly this: in Cochrane 2020, DBT reduced self-harm compared with usual care. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`,
  pt:`Strong feelings rise fast and then pass. Coping skills help you ride out the highest part.`,
  hook:`The best-supported function of self-injury is short-term relief from intense emotion; skills offer other routes to relief. <sup class="c" data-ref="Klonsky2007,Kleindienst2008" title="Source 267,271">267,271</sup>`},
 {from:2/6,at:2/6+.08,k:'Step 3 of 6',t:'People and places for distraction',
  txt:`If coping alone is not enough, the plan lists people and social settings that help take the mind off the crisis, without needing to talk about it. The steps are used in order, moving to the next if one does not help. <sup class="c" data-ref="Stanley2018ED" title="Source 501">501</sup>`,
  pt:`Being around other people, even without talking about how you feel, can help the wave pass.`,
  hook:`A safety plan is a prioritised list: start with the first step and move up only if needed. <sup class="c" data-ref="Stanley2018ED" title="Source 501">501</sup>`},
 {from:3/6,at:3/6+.08,k:'Step 4 of 6',t:'People to ask for help',
  txt:`Then come people the person trusts enough to say "I'm struggling" and ask for help. Families can help by staying calm, listening and helping the person use the plan. NICE asks that, after a crisis, the crisis plan is updated with the person, and with family or carers if possible. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
  pt:`Telling someone you trust that you are struggling is a strength, not a burden.`,
  hook:`NICE CG78: after a crisis, review what triggered it and update the crisis plan with the person and, if possible, family or carers. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`},
 {from:4/6,at:4/6+.08,k:'Step 5 of 6',t:'Professionals and crisis lines',
  txt:`The plan lists the care team, out-of-hours and crisis team numbers <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>, and crisis lines: in the US, call, text or chat 988, free and confidential, 24/7 <sup class="c" data-ref="SAMHSA988" title="Source 449">449</sup>; in the UK and Ireland, Samaritans on 116 123, free from any phone at any time <sup class="c" data-ref="Samaritans116123" title="Source 447">447</sup>. In ED-SAFE, screening plus a brief ED intervention with follow-up calls lowered suicide attempts to 18%, against 23% with usual care. <sup class="c" data-ref="Miller2017EDSAFE" title="Source 349">349</sup>`,
  pt:`Crisis lines are free, confidential and always open. Calling is always OK, even if you are not sure it is "bad enough".`,
  hook:`ED-SAFE: screening alone did nothing (22% vs 23%); screening plus a brief intervention and calls cut attempts to 18%. <sup class="c" data-ref="Miller2017EDSAFE" title="Source 349">349</sup>`},
 {from:5/6,at:5/6+.08,k:'Step 6 of 6',t:'Making the surroundings safer',
  txt:`The last step is agreeing, together, how to make the person's surroundings safer during a crisis. For medicines, NICE NG225 advises shared decisions about limiting the quantity supplied and returning unwanted medicines. <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup> And the wave passes: suicidal thoughts and self-harm in BPD usually decline markedly over the years. <sup class="c" data-ref="Soloff2019Suicidal,Zanarini2008SelfHarm" title="Source 495,584">495,584</sup>`,
  pt:`A safety plan is yours to keep, carry and change. Most people with BPD get better over time.`,
  hook:`Meta-analysis of safety planning: RR 0.57 for suicidal behaviour (NNT 16), with no effect on suicidal ideation. <sup class="c" data-ref="Nuij2021" title="Source 391">391</sup>`}
];
const CS_CLIN=[
 `Write the plan with the person, in their own words. APA 2024 implementation text asks for monitoring of suicide risk, documented assessments and "individualized safety plans". <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>`,
 `Explore what has helped before. In a crisis, NICE asks for empathic open questions and no solutions offered before the problem is clear. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
 `Use validating statements and avoid minimising the person's stated reasons; try to understand the crisis from their point of view. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
 `Agree who may be contacted. In 41 joint crisis plans, people with BPD asked for dignity and respect; some wanted contact during crises, others to be left alone. <sup class="c" data-ref="Borschmann2014" title="Source 72">72</sup>`,
 `Give the person a copy of the plan with contact details <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup>, and provide initial aftercare within 48 hours of the assessment if there are ongoing safety concerns. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup>`,
 `Discuss medicine quantities through shared decision-making and consider toxicity in overdose when prescribing. <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup> Follow up: the VA model used at least two calls to monitor risk and revise the plan. <sup class="c" data-ref="Stanley2018ED" title="Source 501">501</sup>`
];
const CS_TXT={me:[['Notice the thoughts, feelings and situations','that tell me a crisis may be building'],['Things I can do on my own to ride the wave:','a skill, music, a walk, slow breathing'],['People and social places that take my mind','off things: a friend\'s home, a café, a group'],['People I can tell that I am struggling','and ask to help me'],['My care team and out-of-hours numbers;','988 (US) · Samaritans 116 123 (UK, Ireland)'],['Agreeing, with support, how to make','my surroundings safer during a crisis']],
 clin:[['Help the person name their own warning','signs, in their own words'],['Explore what has helped before;','practise one strategy together'],['Identify places and people that distract,','without needing to talk about the crisis'],['With consent, agree who can be','contacted and how they can help'],['Write in team, out-of-hours and crisis-line','numbers; give the person a copy'],['Discuss safety together, e.g. limiting the','quantity of medicines supplied']]};
const CS_LBL={w:['Warning signs','Inner coping','Distraction','Ask for help','Crisis lines','Safer space'],n:['Signs','Coping','Distract','Ask','Helplines','Safer']};
const CS_OUT=[
 {n:'Meta-analysis · 35 studies, 34,832 people',s:6,o:0,c:'<sup class="c" data-ref="Lak2025" title="Source 291">291</sup>',
  txt:`Pooled across 35 studies of 34,832 people with BPD, lifetime suicidal ideation was estimated at 80%, suicide attempts at 52% and death by suicide at 6% (95% CI 4–8%). <sup class="c" data-ref="Lak2025" title="Source 291">291</sup> So about 94 in 100 people with BPD in these studies did not die by suicide.`,
  read:[['did not die by suicide','94 in 100'],['suicide (pooled)','6%'],['lifetime suicidal thoughts','80%']]},
 {n:'McLean Study of Adult Development · 24 years',s:6,o:14,c:'<sup class="c" data-ref="Temes2019" title="Source 523">523</sup>',
  txt:`Over 24 years, 5.9% of 290 former inpatients with BPD died by suicide, compared with 1.4% of 72 comparison subjects; 14.0% vs 5.5% died of other causes. Of those who died by suicide, 87.5% had not recovered before death, so getting better matters. <sup class="c" data-ref="Temes2019" title="Source 523">523</sup>`,
  read:[['did not die by suicide','94 in 100'],['suicide, 24 years','5.9%'],['other causes','14.0%']]},
 {n:'Montreal follow-up · 27 years',s:10,o:0,c:'<sup class="c" data-ref="Paris2001" title="Source 398">398</sup>',
  txt:`In a 27-year follow-up of 64 people, the cumulative proportion who died by suicide reached 10.3%, and only 5 still met BPD criteria. <sup class="c" data-ref="Paris2001" title="Source 398">398</sup> Reviews by Paris give "up to 10%" as the share who die by suicide. <sup class="c" data-ref="Paris2019Suicidality" title="Source 402">402</sup> Higher than in the other studies, and still: about 90 in 100 did not die by suicide.`,
  read:[['did not die by suicide','about 90 in 100'],['suicide, 27 years','10.3%'],['still met criteria','5 people']]}
];
inits.crisis=()=>{
  const svg=$('#csSvg'),rg=$('#csT');let view='me';
  const F=moodF({t0:.1,base:.16,peak:.9,rise:.3,fall:.25});
  const tx=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  function draw(t){const N=vb(svg,'720 380','400 600');
    const L=N?{wx:12,wy:100,ww:376,wh:484,lx:18,ly:280,lw:364,lh:300,hx:14,hy:28}:{wx:24,wy:82,ww:672,wh:270,lx:44,ly:150,lw:632,lh:200,hx:24,hy:26};
    const f=t*6,k=clamp(Math.floor(f),0,5),u=clamp(f-k),a=ease(ramp(u,0,.45));
    let s=`<rect x="${L.wx}" y="${L.wy}" width="${L.ww}" height="${L.wh}" rx="10" style="fill:var(--field)"/>`;
    /* the distress wave, behind the stairs */
    const w=wave(L.wx,L.wy+10,L.ww,L.wh-14,F,{upto:t,col:'var(--storm)',fill:true,thr:.72,dot:true});
    s+=`<g style="opacity:.75">${w.svg}</g>`;
    s+=tx(L.wx+10,L.wy+18,'distress (schematic)','t-xs','fill:var(--storm)')+tx(L.wx+10,L.wy+10+(L.wh-14)*.28-5,'very intense','t-xs','fill:var(--storm)');
    const v=F(t);s+=tx(L.wx+L.ww-10,L.wy+18,t<F.peakAt?'rising':v>.5?'cresting, then easing':v>.3?'passing':'settling','t-xs t-end','fill:var(--storm)');
    /* the stairs rise one at a time: a clip reveals finished steps and the growing current one */
    const n=6,sw=L.lw/n,sh=L.lh/n,bot=L.ly+L.lh;let clip='';
    for(let j=0;j<=k;j++){const hj=sh*(j+1)*(j<k?1:a);clip+=`<rect x="${f1(L.lx+sw*j)}" y="${f1(bot-hj)}" width="${f1(sw)}" height="${f1(hj)}"/>`}
    for(let j=k+1;j<n;j++){const hj=sh*(j+1);s+=`<rect x="${f1(L.lx+sw*j)}" y="${f1(bot-hj)}" width="${f1(sw-3)}" height="${f1(hj)}" rx="6" style="fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:4 4"/>`}
    const ld=ladder(L.lx,L.ly,L.lw,L.lh,CS_LBL[N?'n':'w'],{at:k,col:'var(--accent)',done:true});
    s+=`<defs><clipPath id="csClip">${clip}</clipPath></defs><g clip-path="url(#csClip)">${ld.svg}</g>`;
    for(let j=0;j<=k;j++){const c=ld.top(j),hj=sh*(j+1)*(j<k?1:a);if(hj<40)continue;
      s+=tx(c[0]-1.5,bot-hj+34,j+1,'t-big t-mid',j===k?'fill:var(--on-brand);opacity:.9':'fill:var(--accent);opacity:.8')}
    /* the person stands on the step that is rising */
    const c=ld.top(k),py=bot-sh*(k+1)*a;
    s+=person(c[0]-1.5,py-32,30,'var(--self)');
    /* header: what this step means, in the chosen view */
    const T=CS_TXT[view][k];
    s+=tx(L.hx,L.hy,`${k+1} · ${CS_STEPS[k].t}`,'t-lbl',N?'font-size:15px':'')+tx(N?384:696,L.hy,view==='me'?'PERSONAL VIEW':'CLINICIAN VIEW','t-xs t-end','fill:var(--accent);font-weight:700');
    const fs=N?'fill:var(--ink);font-size:12.5px':'fill:var(--ink)';s+=tx(L.hx,L.hy+(N?24:20),T[0],'t-sm',fs)+tx(L.hx,L.hy+(N?42:36),T[1],'t-sm',fs);
    svg.innerHTML=s;
    const p=phaseOf(CS_STEPS,t);setSt(p);
    $('#csNote').innerHTML=noteHTML(CS_STEPS[p])+(view==='clin'?`<div class="kv"><div><dt>The clinician's part</dt><dd>${CS_CLIN[p]}</dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#csPlay'),draw,30000,'Replay','crisis');
  const setSt=stepWire($('#csSteps'),CS_STEPS,rg,draw,stop);
  $$('[data-csview]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.csview;$$('[data-csview]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- chronic vs acute: schematic ---- */
  const rs=$('#csRisk'),rr=$('#csRiskT');const show={chronic:true,acute:true};
  const SP=[[.08,.42],[.19,.36],[.31,.3],[.46,.2],[.68,.12]];
  const chron=u=>.44-.24*u+.015*Math.sin(u*40);
  const spk=u=>SP.reduce((m,[c,h])=>m+h*Math.exp(-Math.pow((u-c)/.018,2)),0);
  const tot=u=>chron(u)+spk(u);
  function drawR(t){const N=vb(rs,'720 300','400 320');
    const C=N?{x:40,y:30,w:340,h:250,ax:300}:{x:56,y:24,w:620,h:210,ax:252};
    let s='';const Y=v=>C.y+C.h*(1-v);
    [.25,.5,.75].forEach(g=>{s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(Y(g))}" y2="${f1(Y(g))}" class="grid"/>`});
    s+=`<line x1="${C.x}" x2="${C.x}" y1="${C.y}" y2="${C.y+C.h}" class="axis"/>`;
    s+=`<text transform="translate(${C.x-14} ${C.y+C.h/2}) rotate(-90)" class="t-xs t-mid">suicidal thinking (schematic)</text>`;
    const tl=tline(C.x,C.y+C.h,C.w,{min:0,max:10,step:N?2:1,fmt:v=>v,label:'years'});s+=tl.svg;
    if(show.acute){s+=`<path d="${pathFn(u=>tot(u*t),C.x,C.x+C.w*t,C.y+C.h,C.y,Math.max(2,Math.round(400*t)))}" style="fill:none;stroke:var(--storm);stroke-width:2.4;stroke-linejoin:round"/>`}
    if(show.chronic){s+=`<path d="${pathFn(u=>chron(u*t),C.x,C.x+C.w*t,C.y+C.h,C.y,Math.max(2,Math.round(120*t)))}" style="fill:none;stroke:var(--mood);stroke-width:2.4;stroke-dasharray:7 5"/>`}
    const inSp=SP.find(([c])=>Math.abs(t-c)<.035);
    const cx=C.x+C.w*t,cy=Y(show.acute?tot(t):chron(t));
    if(show.acute||show.chronic)s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="5.5" style="fill:${inSp&&show.acute?'var(--storm)':'var(--mood)'};stroke:var(--panel);stroke-width:2"/>`;
    /* labels */
    if(show.chronic&&t>.55)s+=tx(C.x+C.w*(N?.4:.55),Y(chron(.55))+20,N?'chronic baseline':'chronic baseline: slowly falling','t-xs','fill:var(--mood)');
    if(show.acute&&t>.1){const [c,h]=SP[0];s+=tx(C.x+C.w*c+10,Y(chron(c)+h)+4,'acute crisis','t-xs','fill:var(--storm)')}
    if(show.acute&&t>.5)s+=tx(C.x+C.w*.46+10,Y(chron(.46)+.2)+4,'fewer, lower','t-xs','fill:var(--storm)');
    rs.innerHTML=s;
    const yr=(t*10).toFixed(1);
    const ac=inSp&&show.acute;
    $('#csRiskNote').innerHTML=noteHTML(ac?{k:`Year ${yr} · acute`,t:'An acute rise',
      txt:`A rise above the person's usual level, often after a trigger. The response is the safety plan, crisis contact and an assessment focused on needs and safety, with a risk formulation rather than a score. <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup> NICE CG78 asks clinicians to explore other options before considering admission, keeping admission for crises with significant risk that cannot be managed elsewhere, with its length and purpose agreed in advance. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
      pt:`A crisis is a time to use your plan and reach out. It is temporary, even when it does not feel that way.`,
      hook:`Acute risk: safety plan, crisis team, follow-up. NICE CG78: consider a crisis or home treatment team before admission. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`}
     :{k:`Year ${yr} · chronic`,t:'The chronic baseline',
      txt:`Long-standing suicidal thoughts that, in outpatient therapy, "can be best understood as a way of communicating distress". <sup class="c" data-ref="Paris2002Chronic" title="Source 400">400</sup> The response is steady, ongoing treatment: specifically designed psychotherapies have the best evidence, and hospitalisation has not been shown to be useful for chronic suicidality. <sup class="c" data-ref="Paris2019Suicidality" title="Source 402">402</sup> Over years, ideation, attempts and self-injury diminished markedly in a 14-year cohort. <sup class="c" data-ref="Soloff2019Suicidal" title="Source 495">495</sup>`,
      pt:`Living with suicidal thoughts for a long time is common in BPD, and those thoughts usually fade as treatment and life go on.`,
      hook:`Chronic suicidality → long-term psychotherapy; acute rise → crisis response. Hospitalisation is of unproven value for chronic suicidality (review opinion). <sup class="c" data-ref="Paris2002Chronic" title="Source 400">400</sup>`});
  }
  const stopR=playWire(rr,$('#csRiskPlay'),drawR,14000,'Replay','crisis');
  $$('[data-csline]').forEach(b=>b.addEventListener('click',()=>{show[b.dataset.csline]=!show[b.dataset.csline];b.setAttribute('aria-pressed',show[b.dataset.csline]);drawR(+rr.value)}));
  drawR(+rr.value);

  /* ---- long-term outcomes icon array ---- */
  const os=$('#csOut');let ds=0,rev=1,stopO=null;
  function drawO(){const N=vb(os,'720 230','400 430');const D=CS_OUT[ds];
    const cols=N?10:20,cw=N?36:33,ch=N?38:40,x0=N?(400-cols*cw)/2:(720-cols*cw)/2,y0=14;let s='';
    const lim=Math.round(100*rev);
    for(let i=0;i<100;i++){const r=Math.floor(i/cols),q=i%cols;
      /* alive first, then other causes, then suicide at the end so the majority reads first */
      const g=i<100-D.s-D.o?0:i<100-D.s?1:2,col=g===0?'var(--accent)':g===1?'var(--muted)':'var(--storm)';
      s+=person(x0+q*cw+cw/2,y0+r*ch,ch*.72,i<lim?col:'var(--panel-2)',{op:g===1?.55:1})}
    const yb=y0+(100/cols)*ch+(N?14:12);
    s+=`<text x="${f1(x0)}" y="${f1(yb)}" class="t-xs">${N?'each figure = 1 in 100 · population statistic':D.n+' · each figure = 1 in 100 · population statistic'}</text>`;
    os.innerHTML=s;
    $('#csOutRead').innerHTML=D.read.map(([a,b],i)=>`<div><small>${a}</small><b class="cs-big" style="${i?'color:var(--ink)':''}">${b}</b></div>`).join('');
    $('#csOutNote').innerHTML=noteHTML({k:'Population statistics',t:D.n.split(' · ')[0],txt:D.txt,
      pt:`Most people with BPD do not die by suicide, and suicidal behaviour usually becomes less frequent with time and treatment.`,
      hook:`About 1 in 10 or fewer (5.9–10.3% in long cohorts; 6% pooled) die by suicide; the risk is real, and so is recovery. <sup class="c" data-ref="Temes2019,Paris2001,Lak2025" title="Source 291,398,523">291,398,523</sup>`})
      +`<div class="kv"><div><dt>Legend</dt><dd><span style="color:var(--accent);font-weight:700">alive or not known to have died</span> · <span style="color:var(--muted);font-weight:700">died of other causes</span> · <span style="color:var(--storm);font-weight:700">died by suicide</span></dd></div></div>`;
  }
  function runO(){if(stopO)stopO();rev=0;stopO=animate(800,p=>{rev=p;drawO()},()=>{stopO=null})}
  $$('[data-csout]').forEach(b=>b.addEventListener('click',()=>{ds=+b.dataset.csout;$$('[data-csout]').forEach(x=>x.setAttribute('aria-pressed',x===b));runO()}));
  drawO();
  const prevR=redraws.crisis;redraws.crisis=()=>{prevR&&prevR();drawO()};
  const prevH=onHide.crisis;onHide.crisis=()=>{prevH&&prevH();if(stopO){stopO();stopO=null;rev=1}};
};
/* =============== 4.3 Research toward better care =============== */
const RE_Y0=1986,RE_Y1=2026;
const reT=y=>(y-RE_Y0)/(RE_Y1-RE_Y0);
/* DBT's path: trials (k 'rct'), reviews ('ma') and guidelines ('gl') summarised in this guide */
const RE_EV=[
 {y:1991,n:'Linehan 1991: first RCT',k:'rct'},{y:2003,n:'Verheul 2003: Dutch replication',k:'rct'},{y:2006,n:'Linehan 2006: vs expert therapists',k:'rct'},
 {y:2009,n:'NICE CG78',k:'gl'},{y:2009.6,n:'McMain 2009: vs GPM',k:'rct'},{y:2010,n:'Kliem 2010 meta-analysis',k:'ma'},{y:2014,n:'Mehlum 2014: adolescents',k:'rct'},
 {y:2015,n:'Linehan 2015: components',k:'rct'},{y:2017,n:'McMain 2017: skills group',k:'rct'},{y:2018,n:'McCauley 2018: adolescents',k:'rct'},
 {y:2019,n:'DeCou 2019 meta-analysis',k:'ma'},{y:2020,n:'Cochrane 2020',k:'ma'},{y:2020.6,n:'Bohus 2020: DBT-PTSD',k:'rct'},{y:2022,n:'McMain 2022: 6 vs 12 months',k:'rct'},
 {y:2024,n:'APA 2024',k:'gl'},{y:2026,n:'BOOTS 2026: vs schema therapy',k:'rct'}];
const RE_CHECK=[
 {y:1991,t:'A randomised control group'},{y:2003,t:'Replicated by another team'},{y:2006,t:'Beats an active, expert comparison'},
 {y:2010,t:'Pooled in a meta-analysis'},{y:2015,t:'Shows which parts work'},{y:2020,t:'Certainty of evidence rated'}];
const RE_STEPS=[
 {from:0,at:reT(1988),k:'Before 1991 · idea',t:'An idea from the clinic',
  txt:`DBT grew out of early efforts to apply standard behaviour therapy to people who were highly suicidal. Its development was "trial and error", driven mainly by clinical experience. At this stage it is a <span class="ev hyp">Hypothesis</span>: a promising approach without controlled evidence. <sup class="c" data-ref="LinehanWilks2015" title="Source 312">312</sup>`,
  pt:`Every treatment starts as an idea that seems to help some people. That is not yet proof.`},
 {from:reT(1990.5),at:reT(1992),k:'1991 · first trial',t:'The first randomised trial',
  txt:`Linehan 1991 randomised chronically parasuicidal women with BPD to a year of DBT or community treatment as usual. DBT recipients had fewer and less medically severe parasuicidal acts, stayed in therapy more and spent fewer days in hospital; there were no differences in depression, hopelessness or suicidal ideation. One trial: <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Linehan1991" title="Source 309">309</sup>`,
  pt:`A fair test compares people who got the new treatment with similar people who did not, chosen by chance.`,
  hook:`Linehan 1991 was the first RCT of DBT, in chronically parasuicidal women with BPD. <sup class="c" data-ref="Linehan1991" title="Source 309">309</sup>`},
 {from:reT(2002),at:reT(2006.5),k:'2003–2006 · replication',t:'Replicated, against tougher controls',
  txt:`A Dutch team found better retention and fewer self-damaging acts with DBT (58 women). Linehan 2006 then compared DBT with therapists matched for expertise, allegiance, training and prestige: DBT recipients were still "half as likely to make a suicide attempt" (HR 2.66), so the effect "cannot reasonably be attributed to general factors associated with expert psychotherapy". <sup class="c" data-ref="Verheul2003,Linehan2006" title="Source 310,544">310,544</sup>`,
  pt:`The result held up when another team tested it, and when the comparison was skilled therapy rather than ordinary care.`,
  hook:`Linehan 2006: DBT halved suicide attempts vs expert community therapists (HR 2.66). <sup class="c" data-ref="Linehan2006" title="Source 310">310</sup>`},
 {from:reT(2008.5),at:reT(2009.6),k:'2009 · guideline',t:'Into a guideline',
  txt:`NICE CG78: "For women with borderline personality disorder for whom reducing recurrent self-harm is a priority, consider a comprehensive dialectical behaviour therapy programme." Note how narrow the recommendation is: who (women), what goal (recurrent self-harm), what form (comprehensive). The same year, DBT and general psychiatric management gave equal outcomes. <span class="ev est">Established</span> for this use. <sup class="c" data-ref="NICE2009,McMain2009" title="Source 338,379">338,379</sup>`,
  pt:`A guideline only recommends a treatment for the people and goals the trials actually tested.`,
  hook:`NICE CG78 1.3.4.5: consider comprehensive DBT for women when reducing recurrent self-harm is a priority. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`},
 {from:reT(2013.5),at:reT(2018.5),k:'2014–2022 · refinement',t:'Which parts, how long, for whom?',
  txt:`Later trials took DBT apart and stretched it. Arms with skills training reduced self-injury more than DBT without skills; adolescents had less self-harm with DBT-A (two trials); a 20-week skills group cut suicidal and self-injury episodes; and 6 months of DBT was non-inferior to 12. <sup class="c" data-ref="Linehan2015,Mehlum2014,McCauley2018,McMain2017,McMain2022" title="Source 311,335,340,341,345">311,335,340,341,345</sup>`,
  pt:`Good research keeps asking which part of a treatment does the work, and whether a shorter version is enough.`,
  hook:`McMain 2022: 6 months of DBT was non-inferior to 12 months for self-harm. <sup class="c" data-ref="McMain2022" title="Source 341">341</sup>`},
 {from:reT(2019.5),at:reT(2025.5),k:'2020–2026 · synthesis',t:'Weighed, and not crowned',
  txt:`DBT made up about a third of the 75 trials in Cochrane 2020, yet its single-therapy estimates were rated low certainty, and no therapy type clearly beat the others. APA 2024 recommends (1B) a structured psychotherapy with support in the literature, and its chair said "No therapy emerged as a 'gold standard'". BOOTS 2026 found DBT and schema therapy alike. Even the best-studied therapy stays open to question. <sup class="c" data-ref="Storebo2020,APA2024Guideline,Wibbelink2026BOOTS" title="Source 12,514,553">12,514,553</sup>`,
  pt:`After 35 years and many trials, DBT is well supported but not "the" answer. That is how evidence normally looks.`,
  hook:`Cochrane 2020: DBT about one-third of trials; single-therapy estimates low certainty; no clear difference between therapy types. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`}
];
/* pipeline cards. st: idea / trial / est (where the evidence has taken it); ev: evidence label */
const RE_LANES=[['early','Earlier intervention'],['brief','Briefer and scalable therapies'],['digi','Digital and app skills'],['neuro','Neuromodulation (rTMS, iTBS)'],['med','Medication trials'],['prec','Precision and dimensional approaches'],['co','Lived-experience co-design']];
const RE_CARDS=[
 {l:'early',st:'est',ev:'est',n:'Why intervene early',txt:`BPD is common in clinical practice, among the most functionally disabling mental disorders, linked to help-seeking and responsive to treatment, and its traits are malleable in youth. <span class="ev est">Established</span> for the rationale. <sup class="c" data-ref="Chanen2013" title="Source 92">92</sup>`},
 {l:'early',st:'trial',ev:'early',n:'Youth service model (MOBY)',id:'ACTRN12610000100099',txt:`139 people aged 15–25: all arms improved functioning by 19.3–23.8%. The HYPE service raised treatment completion (47.8% vs 19.2%), but adding cognitive analytic therapy gave no extra functional benefit. <sup class="c" data-ref="Chanen2022MOBY" title="Source 97">97</sup>`},
 {l:'early',st:'trial',ev:'early',n:'Indicated prevention',txt:`Prevention aimed at subthreshold BPD symptoms "shows promise"; selective and universal prevention still need research. <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>`},
 {l:'early',st:'trial',ev:'early',n:'Stepped care for teens',txt:`A Swiss clinic offered everyone a brief intervention first; the study could not show added benefit of DBT for adolescents, possibly for lack of power. <sup class="c" data-ref="Cavelti2024Stepped" title="Source 88">88</sup>`},
 {l:'early',st:'trial',ev:'early',n:'GPM-A staff training',txt:`A one-day workshop for 32 staff raised willingness to disclose a BPD diagnosis and reduced negative attitudes for 6 months (uncontrolled). <sup class="c" data-ref="Usher2024GPMA" title="Source 541">541</sup>`},
 {l:'brief',st:'est',ev:'est',n:'6 vs 12 months of DBT',txt:`240 suicidal or self-harming adults: 6 months was non-inferior to 12 for self-harm at 6, 12 and 24 months, with faster falls in BPD symptoms and no difference in dropout. <span class="ev est">Established</span> for this trial. <sup class="c" data-ref="McMain2022" title="Source 341">341</sup>`},
 {l:'brief',st:'trial',ev:'early',n:'Brief GPM (10 sessions)',id:'NCT03717818',txt:`76 participants: no difference from usual care on total ZAN-BPD at 4 months (d 0.04), better on relationship problems (d 0.52); greater symptom reduction at 12-month follow-up. <sup class="c" data-ref="Kramer2024GPM,BlancoMachinea2026" title="Source 58,283">58,283</sup>`},
 {l:'brief',st:'trial',ev:'early',n:'Stepped care clinics',txt:`Montreal: 6–12 months of extended care gave the same change as 18–24 months (naturalistic). Australia: whole-of-service stepped care cut bed days per admission from 13.46 to 4.28 in a cluster RCT. <sup class="c" data-ref="Laporte2018Stepped,Grenyer2018Stepped" title="Source 189,294">189,294</sup>`},
 {l:'digi',st:'trial',ev:'early',n:'priovi app (EPADIP-BPD)',txt:`580 adults in Germany: the unguided schema-therapy-based app plus usual care improved BSL-23 at 3 months (d 0.24) with fewer suicide attempts (7 vs 21). Fewer than 25% of patients receive guideline-adherent psychotherapy. <sup class="c" data-ref="Assmann2025" title="Source 17">17</sup>`},
 {l:'digi',st:'trial',ev:'early',n:'Earlier priovi trial',id:'NCT03418142',txt:`204 participants over 12 months: no significant difference in the BPDSI slope vs care as usual (d 0.27; 95% CI 0.00–0.55). <sup class="c" data-ref="Klein2021priovi" title="Source 265">265</sup>`},
 {l:'neuro',st:'trial',ev:'early',n:'rTMS: what exists',txt:`A 2021 review found 8 small studies with 63 patients: well tolerated, efficacy not established. <sup class="c" data-ref="Konstantinou2021rTMS" title="Source 278">278</sup>`},
 {l:'neuro',st:'trial',ev:'early',n:'iTBS added to DBT',txt:`Sham-controlled pilot, 53 randomised: no significant effect on BSL-23 (trend d 0.23), while DBT itself gave large change. A separate sham-controlled 10-Hz rTMS trial in 30 women found no difference. <sup class="c" data-ref="Kujovic2025iTBS,Horky2026rTMS" title="Source 231,287">231,287</sup>`},
 {l:'neuro',st:'idea',ev:'hyp',n:'Targeted iTBS for impulsivity',txt:`11 people, one session to an individually targeted right ventrolateral prefrontal site: less impulsivity on a delay-discounting task. Hypothesis-generating. <sup class="c" data-ref="Tadayonnejad2026rTMS" title="Source 520">520</sup>`},
 {l:'neuro',st:'idea',ev:'hyp',n:'Registered TMS trials',id:'NCT06259851 · NCT07460947 · NCT05712057',txt:`rTMS-enhanced DBT (active, not recruiting, est. n 60); one-day accelerated iTBS plus D-cycloserine in suicidal patients (recruiting, est. n 20); rTMS-enhanced cognitive restructuring (recruiting, est. n 240). <sup class="c" data-ref="NCT06259851,NCT07460947,NCT05712057" title="Source 367,368,372">367,368,372</sup>`},
 {l:'med',st:'trial',ev:'early',n:'Clozapine (CALMED)',id:'ISRCTN18352058',txt:`Aimed for 222, closed with 29: ZAN-BPD difference −3.86 (95% CI −10.04 to 2.32); "recruited insufficient participants to test the primary hypothesis". <sup class="c" data-ref="Crawford2022CALMED" title="Source 110">110</sup>`},
 {l:'med',st:'trial',ev:'early',n:'Memantine',id:'NCT02097706',txt:`8-week pilot (17 vs 16): adjunctive memantine reduced ZAN-BPD over time vs placebo. A larger registered trial is still listed as recruiting past its estimated end date, with no results. <sup class="c" data-ref="Kulkarni2018Memantine,NCT02097706" title="Source 288,361">288,361</sup>`},
 {l:'med',st:'trial',ev:'early',n:'Ketamine',id:'NCT03395314 · NCT07099534 · NCT07569198',txt:`First RCT (10 vs 12, terminated): suicidal ideation and depression fell numerically but not significantly vs midazolam. A Toulouse pilot is not yet recruiting; a 120-person ketamine plus DBT trial is recruiting. <sup class="c" data-ref="Fineberg2023Ketamine,NCT03395314,NCT07099534,NCT07569198" title="Source 157,363,371,374">157,363,371,374</sup>`},
 {l:'med',st:'trial',ev:'early',n:'Brexpiprazole, BI 1358894',id:'NCT04100096 · NCT04566601',txt:`Two phase 2 trials (324 and 390 people) missed their primary endpoints; akathisia 14.0% vs 1.2% with brexpiprazole. Negative results are results too. <sup class="c" data-ref="Rothman2024Brexpiprazole,Dwyer2025BI1358894,NCT04100096,NCT04566601" title="Source 137,364,365,439">137,364,365,439</sup>`},
 {l:'med',st:'idea',ev:'hyp',n:'Psilocybin, MDMA',id:'NCT05399498 · NCT07833761 · NCT06683014',txt:`Open-label psilocybin in 9 adults with BPD and depression: depression fell (d 1.41), BPD scores did not change significantly. A psilocybin-plus-DBT phase 1 is not yet recruiting; an MDMA social-cognition study (est. n 10) is recruiting. <sup class="c" data-ref="Grant2026Psilocybin,NCT05399498,NCT07833761,NCT06683014" title="Source 186,366,369,375">186,366,369,375</sup>`},
 {l:'med',st:'idea',ev:'early',n:'Oxytocin',id:'NCT01243658 · NCT07551882',txt:`Lab studies: one dose normalised threat processing and raised empathy, but decreased trust in anxiously attached people. A 2024 review calls its role "uncertain". A completed 138-person trial has no posted results; a trial with self-compassion training is recruiting. <sup class="c" data-ref="Bertsch2013Oxytocin,Bartz2011Oxytocin,DiGiacomo2024Oxytocin,NCT01243658,NCT07551882" title="Source 32,50,123,360,373">32,50,123,360,373</sup>`},
 {l:'prec',st:'est',ev:'est',n:'ICD-11 severity dimension',txt:`ICD-11 moved toward classifying personality pathology on a single severity dimension, from normal personality to severe disorder. See <a href="#icd" data-go="icd">ICD-11 &amp; dimensional models</a>. <sup class="c" data-ref="Tyrer2015Lancet" title="Source 539">539</sup>`},
 {l:'prec',st:'trial',ev:'early',n:'Choosing DBT or GPM by model',txt:`Re-analysis of 156 patients: those randomised to their model-predicted best treatment did better (d 0.36). Not prospectively tested. <sup class="c" data-ref="Keefe2021Selection" title="Source 255">255</sup>`},
 {l:'prec',st:'trial',ev:'early',n:'Who benefits from therapy',txt:`Individual-participant data, 19 trials: co-occurring depression and sexual trauma predicted less benefit; anxiety and alcohol use disorder predicted more. <sup class="c" data-ref="PereiraRibeiro2026" title="Source 408">408</sup>`},
 {l:'prec',st:'idea',ev:'hyp',n:'Predictors of slow remission',txt:`Older age, childhood sexual abuse, family history of substance use, poor vocational record and other factors predicted slower remission: candidate stratifiers, not a validated tool. <sup class="c" data-ref="Zanarini2006Prediction" title="Source 581">581</sup>`},
 {l:'co',st:'trial',ev:'early',n:'Co-produced peer group',txt:`A 10-week peer group built with people with lived experience (51 participants) showed small to moderate gains in recovery, belonging and personality functioning (uncontrolled). <sup class="c" data-ref="Bartsch2026Peer" title="Source 31">31</sup>`},
 {l:'co',st:'idea',ev:'early',n:'Co-design of trials',txt:`People with BPD helped build the priovi app but not design its trial: co-design so far reaches the product more than the research question. <sup class="c" data-ref="Assmann2025" title="Source 17">17</sup>`}
];
const RE_EVN={est:'Established',early:'Early evidence',hyp:'Hypothesis'};
const RE_HYPE=[
 {q:'Magnetic brain stimulation calms BPD',a:'early',txt:`Sham-controlled trials so far are negative or underpowered: iTBS added to DBT had no significant effect, and 10-Hz rTMS did not beat sham in 30 women. A review of 8 small studies found efficacy not established. <sup class="c" data-ref="Kujovic2025iTBS,Horky2026rTMS,Konstantinou2021rTMS" title="Source 231,278,287">231,278,287</sup>`},
 {q:'Six months of DBT works as well as a full year',a:'est',txt:`A non-inferiority RCT of 240 people found 6 months non-inferior to 12 for self-harm up to 24 months. One large, well-designed trial: established for this question, though which people need longer care is unknown. <sup class="c" data-ref="McMain2022" title="Source 341">341</sup>`},
 {q:'Ketamine: a fast fix for BPD?',a:'early',txt:`The only RCT (22 people, terminated early) found no significant difference from midazolam on suicidal ideation or depression. A review advises caution, citing reports of self-harm after stopping and possibly more dissociation. <sup class="c" data-ref="Fineberg2023Ketamine,Scott2025Ketamine" title="Source 157,467">157,467</sup>`},
 {q:'The ‘love hormone’ could fix trust in BPD',a:'early',txt:`Single doses changed threat processing and empathy in the lab, but one study found oxytocin decreased trust and cooperation in anxiously attached, rejection-sensitive people. No clinical trial has shown a benefit. <sup class="c" data-ref="Bertsch2013Oxytocin,Bartz2011Oxytocin,DiGiacomo2024Oxytocin" title="Source 32,50,123">32,50,123</sup>`},
 {q:'An app cut suicide attempts in BPD',a:'early',txt:`In 580 adults, an unguided app plus usual care gave a small benefit (d 0.24) and fewer suicide attempts (7 vs 21). An earlier trial of the same app missed its primary outcome. Needs replication. <sup class="c" data-ref="Assmann2025,Klein2021priovi" title="Source 17,265">17,265</sup>`},
 {q:'Talking therapy helps people with BPD',a:'est',txt:`75 randomised trials, 4507 participants: BPD-tailored psychotherapy reduced BPD severity vs usual care (SMD −0.52), with moderate certainty and a clinically relevant size. <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>`},
 {q:'Psychedelic therapy for BPD',a:'hyp',txt:`An open-label, single-dose psilocybin study in 9 adults with BPD and depression: depression fell, BPD scores did not change significantly. No control group. A phase 1 trial with DBT has not started. <sup class="c" data-ref="Grant2026Psilocybin,NCT07833761" title="Source 186,375">186,375</sup>`},
 {q:'A computer model picks your best therapy',a:'early',txt:`A model matched 156 past patients to DBT or GPM with a moderate advantage, but only in a re-analysis; it has not been tested in new patients. <sup class="c" data-ref="Keefe2021Selection" title="Source 255">255</sup>`}
];

inits.frontier=()=>{
  const sec=$('#m-frontier'),svg=$('#reSvg'),rg=$('#reT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 390','400 500'),Y=lerp(RE_Y0,RE_Y1,t);
    const stage=Y<1991?0:Y<2009?1:2,stageF=Y<1991?Y/1991:Y<2009?clamp((Y-1991)/2.5):clamp((Y-2009)/1.5);
    let s='';
    /* lanes */
    const LN=N?{x:16,w:368,y:20,h:84}:{x:20,w:680,y:20,h:84},cw=LN.w/3,names=['Idea','Trials','Established'],cols=['var(--rx)','var(--warn)','var(--good)'];
    names.forEach((n,i)=>{const x=LN.x+i*cw;s+=`<rect x="${f1(x+3)}" y="${LN.y}" width="${f1(cw-6)}" height="${LN.h}" rx="10" style="fill:${i===stage?'var(--panel-2)':'var(--field)'};stroke:${i===stage?cols[i]:'var(--line)'};stroke-dasharray:${i===2?'0':'4 3'}"/><text x="${f1(x+12)}" y="${LN.y+16}" class="t-xs" style="fill:${cols[i]}">${n.toUpperCase()}</text>`;
      if(i<2)s+=`<path d="M${f1(x+cw-8)} ${LN.y+LN.h/2}l10 0" class="arrow" marker-end="url(#reAr)"/>`});
    s=`<defs>${marker('reAr','var(--muted)')}</defs>`+s;
    /* the DBT card slides between lanes */
    const px=i=>LN.x+i*cw+cw/2,cx=stage===0?px(0):lerp(px(stage-1),px(stage),ease(stageF)),cy=LN.y+LN.h/2+8,cwid=N?96:150;
    const lab=stage===0?'hyp':stage===1?'early':'est',lc={hyp:'var(--rx)',early:'var(--warn)',est:'var(--good)'}[lab];
    s+=`<rect x="${f1(cx-cwid/2)}" y="${cy-20}" width="${cwid}" height="40" rx="8" style="fill:var(--panel);stroke:${lc};stroke-width:2"/><text x="${f1(cx)}" y="${cy-3}" class="t-lbl t-mid">DBT</text><text x="${f1(cx)}" y="${cy+12}" class="t-xs t-mid" style="fill:${lc}">${RE_EVN[lab]}</text>`;
    /* timeline */
    const TL=N?{x:24,w:352,y:250}:{x:30,w:660,y:250},X=y=>TL.x+TL.w*(y-RE_Y0)/(RE_Y1-RE_Y0);
    s+=`<line x1="${TL.x}" x2="${f1(X(Y))}" y1="${TL.y}" y2="${TL.y}" style="stroke:var(--accent);stroke-width:3"/><line x1="${f1(X(Y))}" x2="${TL.x+TL.w}" y1="${TL.y}" y2="${TL.y}" class="axis"/>`;
    for(let y=1990;y<=2026;y+=(N?10:5)){s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${TL.y}" y2="${TL.y+5}" class="axis"/><text x="${f1(X(y))}" y="${TL.y+18}" class="t-xs t-mid">${y}</text>`}
    s+=`<circle cx="${f1(X(Y))}" cy="${TL.y}" r="6" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/><text x="${f1(clamp(X(Y),TL.x+20,TL.x+TL.w-20))}" y="${TL.y+34}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${Math.floor(Y)}</text>`;
    /* events stack above the line */
    const cnt={rct:0,ma:0,gl:0};let last=null;
    RE_EV.forEach((e,i)=>{if(Y<e.y)return;cnt[e.k]++;last=e;const x=X(e.y),lvl=e.k==='gl'?3:e.k==='ma'?2:1,ey=TL.y-12-lvl*20+(i%2)*6;
      const col=e.k==='gl'?'var(--good)':e.k==='ma'?'var(--dx)':'var(--accent)';
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(ey)}" y2="${TL.y}" style="stroke:${col};opacity:.35"/>`;
      s+=e.k==='gl'?`<path d="M${f1(x)} ${f1(ey-8)}v14M${f1(x)} ${f1(ey-8)}l9 3.5l-9 3.5" style="fill:${col};stroke:${col};stroke-width:1.6"/>`:e.k==='ma'?`<path d="M${f1(x-6)} ${f1(ey)}L${f1(x)} ${f1(ey-5)}L${f1(x+6)} ${f1(ey)}L${f1(x)} ${f1(ey+5)}Z" style="fill:${col}"/>`:`<circle cx="${f1(x)}" cy="${f1(ey)}" r="4.5" style="fill:${col}"/>`});
    if(last){const lx=clamp(X(last.y),TL.x+90,TL.x+TL.w-90);s+=`<text x="${f1(lx)}" y="${N?136:140}" class="t-sm t-mid" style="fill:var(--ink)">latest: ${last.n}</text>`}
    s+=`<g transform="translate(${N?16:20} ${N?160:166})"><circle cx="4" cy="-3" r="4" style="fill:var(--accent)"/><text x="12" y="0" class="t-xs">trial ${cnt.rct}</text><path d="M${N?78:88} -3l6 -5l6 5l-6 5z" style="fill:var(--dx)"/><text x="${N?98:108}" y="0" class="t-xs">review ${cnt.ma}</text><path d="M${N?160:180} -9v12M${N?160:180} -9l8 3l-8 3" style="fill:var(--good);stroke:var(--good);stroke-width:1.4"/><text x="${N?172:192}" y="0" class="t-xs">guideline ${cnt.gl}</text></g>`;
    /* checklist */
    const CK=N?{x:16,y:310,cw:368,rh:26,cols:1}:{x:20,y:300,cw:226,rh:30,cols:3};
    s+=`<text x="${CK.x}" y="${CK.y}" class="t-sm">WHAT MAKES EVIDENCE TRUSTWORTHY</text>`;
    RE_CHECK.forEach((c,i)=>{const col=i%CK.cols,row=Math.floor(i/CK.cols),x=CK.x+col*CK.cw,y=CK.y+18+row*CK.rh,on=Y>=c.y,k=clamp((Y-c.y)/1.2);
      s+=`<rect x="${x}" y="${y-11}" width="16" height="16" rx="4" style="fill:${on?'var(--good)':'var(--panel)'};stroke:${on?'var(--good)':'var(--line)'}"/>`;
      if(on)s+=`<path d="M${x+4} ${y-3}l3 3.5l6 -7" style="fill:none;stroke:var(--panel);stroke-width:2.2;stroke-dasharray:14;stroke-dashoffset:${f1(14*(1-k))}"/>`;
      s+=`<text x="${x+24}" y="${y+1}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'}">${c.t}</text><text x="${x+24}" y="${y+13}" class="t-xs" style="opacity:${on?1:.6}">${on?'from '+Math.floor(c.y):'not yet'}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(RE_STEPS,t);setSt(p);
    $('#reNote').innerHTML=noteHTML(RE_STEPS[p]);
    $('#reRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>stage <b>${names[stage]}</b></span><span>label <b>${RE_EVN[lab]}</b></span><span>checks met <b>${RE_CHECK.filter(c=>Y>=c.y).length} of ${RE_CHECK.length}</b></span>`;
    rg.setAttribute('aria-valuetext',`${Math.floor(Y)}: ${RE_STEPS[p].t}`);
  }
  const stop=playWire(rg,$('#rePlay'),draw,24000,'Replay','frontier');
  setSt=stepWire($('#reSteps'),RE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- pipeline board ---- */
  const pipe=$('#rePipe'),det=$('#reDetail');let flt='all',sel=0;
  pipe.innerHTML=`<div class="zhead"><span>Idea / registered</span><span>In trials</span><span>Established</span></div>`+RE_LANES.map(([id,n])=>`<div class="lane"><b>${n}</b><div class="zones">${['idea','trial','est'].map(z=>`<div class="zone" data-lane="${id}" data-z="${z}"></div>`).join('')}</div></div>`).join('');
  const btns=RE_CARDS.map((c,i)=>{const b=document.createElement('button');b.className='rc';b.dataset.card=i;b.setAttribute('aria-pressed','false');
    b.innerHTML=`<span>${c.n}</span><span class="ev ${c.ev}">${RE_EVN[c.ev]}</span>${c.id?`<small>${c.id}</small>`:''}`;return b});
  function place(all){btns.forEach((b,i)=>{const c=RE_CARDS[i];$(`.zone[data-lane="${c.l}"][data-z="${all?'idea':c.st}"]`,pipe).appendChild(b)})}
  function slide(){
    if(RM){place(false);return}
    place(true);const first=btns.map(b=>b.getBoundingClientRect());
    place(false);
    btns.forEach((b,i)=>{const r=b.getBoundingClientRect(),dx=first[i].left-r.left,dy=first[i].top-r.top;if(!dx&&!dy)return;
      b.style.transition='none';b.style.transform=`translate(${dx}px,${dy}px)`;b.getBoundingClientRect();
      b.style.transition=`transform .9s cubic-bezier(.3,.1,.2,1) ${(i%5)*.06+.15}s`;b.style.transform=''})}
  function filter(){btns.forEach((b,i)=>b.classList.toggle('hide',flt==='est'&&RE_CARDS[i].ev!=='est'))}
  function detail(i){sel=i;const c=RE_CARDS[i];btns.forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
    const lane=RE_LANES.find(l=>l[0]===c.l)[1],stn={idea:'Idea or registered, no clinical result yet',trial:'Tested in trials, not settled',est:'Established'}[c.st];
    det.innerHTML=`<div class="kicker">${lane}</div><h4>${c.n}</h4><p><span class="ev ${c.ev}">${RE_EVN[c.ev]}</span></p><p>${c.txt}</p><div class="kv"><div><dt>Where it sits</dt><dd>${stn}</dd></div>${c.id?`<div><dt>Registration</dt><dd>${c.id}</dd></div>`:''}</div>`}
  pipe.addEventListener('click',e=>{const b=e.target.closest('[data-card]');if(b){detail(+b.dataset.card);if(matchMedia('(max-width:1100px)').matches&&e.isTrusted)det.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $$('[data-flt]',sec).forEach(b=>b.addEventListener('click',()=>{flt=b.dataset.flt;$$('[data-flt]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));filter();
    if(flt==='est'&&RE_CARDS[sel].ev!=='est')detail(RE_CARDS.findIndex(c=>c.ev==='est'))}));
  $('#reReplay').addEventListener('click',()=>{filter();slide()});
  place(false);detail(0);
  onShow.frontier=()=>{requestAnimationFrame(slide)};

  /* ---- hype filter ---- */
  const hy=$('#reHype'),sc=$('#reScore');const ans={};
  hy.innerHTML=RE_HYPE.map((h,i)=>`<div class="hcard" id="reH${i}"><span class="kicker">A headline might say</span><q>${h.q}</q><div class="ctrls" role="group" aria-label="Your guess">${['est','early','hyp'].map(g=>`<button class="btn" data-h="${i}" data-g="${g}" aria-pressed="false">${RE_EVN[g]}</button>`).join('')}</div><div class="rev"><div class="verdict" id="reV${i}"></div><p>${h.txt}</p></div></div>`).join('');
  function score(){const n=Object.keys(ans).length,ok=Object.keys(ans).filter(i=>ans[i]===RE_HYPE[i].a).length;sc.innerHTML=`<span>answered <b>${n} of ${RE_HYPE.length}</b></span><span>matched the evidence label <b>${ok}</b></span>`}
  hy.addEventListener('click',e=>{const b=e.target.closest('[data-g]');if(!b)return;const i=+b.dataset.h,g=b.dataset.g,H=RE_HYPE[i];ans[i]=g;
    $$(`[data-h="${i}"]`,hy).forEach(x=>x.setAttribute('aria-pressed',x===b));
    const v=$('#reV'+i),right=g===H.a;v.className='verdict '+(right?'yes':'maybe');
    v.innerHTML=(right?'Matches: ':'The evidence label is ')+`<span class="ev ${H.a}">${RE_EVN[H.a]}</span>`;
    $('#reH'+i).classList.add('done');score()});
  score();
};
/* =============== 5.1 Course & recovery =============== */
/* Published follow-up points (research pass G). Years since baseline -> cumulative %. */
const CU_D={
 rem2:[[0,0],[2,35],[4,55],[6,76],[8,88],[10,91],[12,95],[14,97],[16,99]],   /* 2-year remission, BPD (Zanarini 2012) */
 rem8:[[8,28],[10,43],[12,57],[14,70],[16,78]],                               /* 8-year remission, BPD */
 rec2:[[0,0],[2,14],[4,27],[6,36],[8,43],[10,47],[12,50],[14,56],[16,60]],   /* 2-year recovery, BPD */
 oRem:[[0,0],[2,88],[4,96],[6,99],[16,99]],                                   /* comparison: other personality disorders */
 oRec:[[0,0],[2,51],[4,67],[6,71],[8,77],[10,84],[16,85]],
 rc2:[[0,0],[2,16],[4,21],[6,30],[8,33],[10,34],[12,36],[14,36]],            /* recurrence after a 2-year remission, by years since it */
 clps:[[0,0],[10,85]]                                                         /* CLPS: 85% remitted by 10 years (Gunderson 2011) */
};
/* piecewise-linear through knots; before the first knot 0 (or null when strict) */
function cuPL(k,y,strict){if(y<k[0][0])return strict?null:k[0][1];for(let i=1;i<k.length;i++)if(y<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return k[k.length-1][1]}
const cuY=t=>16*ramp(t,.02,.88);
const CU_SYM=[ /* name, group (a acute, t temperamental, o other), 2-year remission %, 4-year remission %, recurrence after a 2-year remission % (Zanarini 2016) */
 ['Self-harm','a',97,91,43],['Help-seeking suicide attempts','a',99,null,55],['Affective instability','o',96,73,null],['Serious identity disturbance','o',99,null,null],
 ['Chronic depression','t',72,43,null],['Chronic loneliness, emptiness','t',71,42,90],['Chronic anger','t',67,38,98],['Chronic anxiety','t',62,34,93]];
const CU_STEPS={
 msad:[
  {from:0,at:.02,k:'Year 0 · McLean Hospital, 1992–1995',t:'Who was followed',
   txt:`The McLean Study of Adult Development (MSAD) enrolled 290 inpatients who met two sets of criteria for BPD (DIB-R and DSM-III-R), plus 72 inpatients with other personality disorders, and re-interviewed them every 2 years. At baseline they were 77.1% female and 87% white, with a mean age of 27 and a mean GAF score of 39.8, which means major impairment. Retention was high: 87.5% of surviving participants with BPD were seen at every wave to 16 years. <sup class="c" data-ref="Temes2019,Zanarini2012" title="Source 523,592">523,592</sup>`,
   pt:`The study followed a group of very unwell young adults for many years and checked on them every two years.`,
   hook:`MSAD = 290 BPD inpatients + 72 other-PD comparisons, McLean, from 1992, assessed every 2 years. <sup class="c" data-ref="Temes2019" title="Source 523">523</sup>`},
  {from:.1,at:.33,k:'Years 2–6',t:'Remission begins early',
   txt:`About a third had a 2-year remission by the 2-year follow-up, and three-quarters by year 6 (35%, 55%, 76% at 2, 4, 6 years). The first 6-year report gave 34.5%, 49.4% and 68.6%, with 73.5% remitting at some point, and only 5.9% of those who remitted had a recurrence by then. No comparison subject developed BPD. <sup class="c" data-ref="Zanarini2012,Zanarini2003Course" title="Source 574,592">574,592</sup> Recovery, which also needs good social and vocational functioning, climbs much more slowly: 14% at 2 years, 36% at 6. <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup>`,
   pt:`Within a few years, most people no longer had enough symptoms for the diagnosis. Getting life back on track took longer.`,
   hook:`MSAD 6-year remission: 34.5% → 49.4% → 68.6%; only 5.9% of remitters had a recurrence. <sup class="c" data-ref="Zanarini2003Course" title="Source 574">574</sup>`},
  {from:.4,at:.55,k:'Year 10',t:'Most have remitted; recovery lags',
   txt:`By 10 years, 93% had a remission lasting at least 2 years and 86% one lasting at least 4 years, but only 50% had recovered. Recurrence was 30% after a 2-year remission and 15% after a 4-year one, and 34% of those who recovered lost their recovery later. <sup class="c" data-ref="Zanarini2010Recovery" title="Source 588">588</sup> Among the 242 people who remitted by 10 years, 39.3% first remitted by year 2 and only 3.7% between years 8 and 10. <sup class="c" data-ref="Zanarini2006Prediction" title="Source 581">581</sup>`,
   pt:`Ten years on, nearly everyone had had a long break from symptoms. About half also had good work and social lives.`,
   hook:`MSAD 10 years: 93% 2-year remission, 86% 4-year remission, 50% recovery; 34% of the recovered lost it. <sup class="c" data-ref="Zanarini2010Recovery" title="Source 588">588</sup>`},
  {from:.62,at:.88,k:'Year 16',t:'Long remissions last',
   txt:`By 16 years, cumulative remission was 99% for a 2-year remission and 78% for an 8-year one; recovery was 60% and 40%. The longer a remission had lasted, the less likely it was to end: recurrence was 36% after a 2-year remission but 10% after an 8-year one (comparison subjects 7% to 4%). People with BPD remitted more slowly than comparison subjects (hazard ratio 0.15 for a 2-year remission) and recurred faster (HR 6.87). <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup> Rings in the icon array show people who had a recurrence after remitting.`,
   pt:`Once symptoms have stayed away for years, they usually stay away. Work and relationships remain the harder part.`,
   hook:`MSAD 16 years: 99% 2-year remission vs 60% 2-year recovery; recurrence 36% after a 2-year but 10% after an 8-year remission. <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup>`},
  {from:.9,at:1,k:'Year 16 · by symptom',t:'Acute fades fast, temperamental lingers',
   txt:`MSAD separates "acute" symptoms, such as self-harm and help-seeking suicide attempts, from "temperamental" ones, such as chronic anger and profound abandonment concerns. Acute symptoms resolve faster and often drive costly care; temperamental ones resolve more slowly and track ongoing impairment. <sup class="c" data-ref="Zanarini2005MSAD" title="Source 580">580</sup> By 16 years, self-harm had a 2-year remission in 97% of those who had it, chronic anger in 67%, and recurrence was 43% for self-harm against 98% for chronic anger. <sup class="c" data-ref="Zanarini2016Fluidity" title="Source 596">596</sup> <span class="ev early">Early evidence</span> CLPS did not find this split: there, all criteria declined at similar rates over 10 years. <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup>`,
   pt:`Risky, impulsive behaviours such as self-harm usually fade first. Feelings like anger, emptiness and loneliness often take longer. <sup class="c" data-ref="Zanarini2016Fluidity" title="Source 596">596</sup>`,
   hook:`Acute (impulsive) symptoms remit fastest and recur least; temperamental (dysphoric) symptoms persist. <sup class="c" data-ref="Zanarini2007Subsyndromal,Zanarini2016Fluidity" title="Source 582,596">582,596</sup>`}],
 clps:[
  {from:0,at:.02,k:'Year 0 · four US cities',t:'Who was followed',
   txt:`The Collaborative Longitudinal Personality Disorders Study (CLPS) followed treatment-seeking patients aged 18–45 from 19 hospital and outpatient settings: 175 with BPD, 312 with cluster C personality disorders and 95 with major depressive disorder and no personality disorder. <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup> CLPS enrolled 668 treatment-seeking adults at four US sites in 2000. <sup class="c" data-ref="Gunderson2000CLPS" title="Source 201">201</sup> Its sample was broader than MSAD's inpatients, so the two studies' numbers are not interchangeable.`,
   pt:`A second big study followed people from clinics as well as hospitals, and compared BPD with other conditions.`,
   hook:`CLPS (from 2000): 175 BPD, 312 cluster C PD, 95 MDD; 10-year follow-up. <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup>`},
  {from:.1,at:.18,k:'Years 0–2',t:'Fast change for some',
   txt:`Within 6 months, 18 of 160 patients improved dramatically to 2 or fewer criteria, and only 1 had relapsed by 2 years; changes in life situation and remission of a co-occurring disorder were judged the main drivers. <sup class="c" data-ref="Gunderson2003Remissions" title="Source 202">202</sup> After 2 years, 50–61% of the personality-disorder groups were below the diagnostic threshold, but only 23–38% met a stricter definition of improvement. <sup class="c" data-ref="Grilo2004CLPS" title="Source 192">192</sup> The line between published points is drawn, not measured.`,
   pt:`Some people improve quickly, sometimes after a big change in their life. How much counts as "better" depends on the rule used.`,
   hook:`CLPS 2 years: 50–61% below threshold, 23–38% by a stricter rule. <sup class="c" data-ref="Grilo2004CLPS" title="Source 192">192</sup>`},
  {from:.4,at:.55,k:'Year 10',t:'85% remitted, 12% relapsed',
   txt:`Over 10 years, 85% of patients with BPD remitted and 12% relapsed. Remission was slower than in major depression and only slightly slower than in other personality disorders, and relapse was less frequent and slower. <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup> Social functioning, though, showed "severe and persistent impairment" with only modest improvement. <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup>`,
   pt:`In this study too, most people stopped meeting the diagnosis, and few slipped back. Everyday functioning improved much less.`,
   hook:`CLPS 10 years: 85% remission, 12% relapse, social functioning still severely impaired. <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup>`},
  {from:.62,at:.88,k:'Beyond year 10',t:'Traits and behaviours',
   txt:`CLPS reported to 10 years. Its authors proposed that personality disorders are hybrids of stable traits and intermittently expressed symptomatic behaviours: improvement is "possible and not uncommon", but traits change slowly. <sup class="c" data-ref="Skodol2005CLPS" title="Source 487">487</sup> <span class="ev hyp">Hypothesis</span> The hybrid model is an interpretation; the stability and change it explains are observed. <sup class="c" data-ref="Skodol2005CLPS" title="Source 487">487</sup>`,
   pt:`Some parts of BPD are behaviours that can stop; other parts are long-standing ways of feeling that change more slowly.`,
   hook:`Hybrid model (CLPS): stable traits + intermittent symptomatic behaviours. <sup class="c" data-ref="Skodol2005CLPS" title="Source 487">487</sup>`},
  {from:.9,at:1,k:'By criterion',t:'All criteria declined together',
   txt:`Unlike MSAD, CLPS found that all BPD criteria declined at similar rates over 10 years. <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup> Over the first 2 years, though, affective instability and anger were the most prevalent and least changeable criteria, while self-injury and frantic efforts to avoid abandonment changed most. <sup class="c" data-ref="McGlashan2005CLPS" title="Source 336">336</sup> How fast specific symptoms change depends on the sample and the method.`,
   pt:`The two big studies agree that people get better; they differ on whether some symptoms fade faster than others.`,
   hook:`CLPS 10 years: criteria fell at similar rates; at 2 years affective instability and anger were the most stable. <sup class="c" data-ref="Gunderson2011,McGlashan2005CLPS" title="Source 204,336">204,336</sup>`}]
};
inits.course=()=>{
  const svg=$('#cuSvg'),rg=$('#cuT');let study='msad',setSt=()=>{};
  const DEF=`<defs><g id="cuP"><circle cx="0" cy="1.7" r="1.7"/><path d="M-2.6 10V6Q-2.6 4 0 4Q2.6 4 2.6 6V10Z"/></g></defs>`;
  const P=(x,y,s,fill,op)=>`<use href="#cuP" transform="translate(${f1(x)} ${f1(y)}) scale(${(s/10).toFixed(3)})" style="fill:${fill}${op!=null&&op<1?';opacity:'+op.toFixed(2):''}"/>`;
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  /* rings: people who had a recurrence after a 2-year remission, from new remitters at each wave times the
     recurrence curve, scaled so that at 16 years 36% of remitters are ringed (the published figure) */
  function rings(Y){let r=0;for(let w=2;w<=Y+1e-9;w+=2){const d=cuPL(CU_D.rem2,w)-cuPL(CU_D.rem2,w-2);r+=d*cuPL(CU_D.rc2,Y-w)/100}
    let r16=0;for(let w=2;w<=16;w+=2){r16+=(cuPL(CU_D.rem2,w)-cuPL(CU_D.rem2,w-2))*cuPL(CU_D.rc2,16-w)/100}
    return r*(36*99/100)/r16}
  function draw(t){const N=vb(svg,'720 470','400 680');const ph=phaseOf(CU_STEPS[study],t);setSt(ph);const Y=cuY(t),ms=study==='msad';
    const C=N?{x:46,y:66,w:330,h:170}:{x:52,y:62,w:360,h:230};
    let s=DEF;
    s+=T(N?20:22,28,ms?'MSAD · 290 inpatients with BPD':'CLPS · 175 patients with BPD','t-big')+T(N?20:22,46,ms?'cumulative share reaching each outcome':'cumulative share remitted; CLPS reported to 10 years','t-sm');
    /* chart */
    s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="8" style="fill:var(--field)"/>`;
    for(let v=0;v<=100;v+=25){const y=C.y+C.h*(1-v/100);s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/>`+T(C.x-5,y+3,v+'%','t-xs t-end')}
    const tl=tline(C.x,C.y+C.h+10,C.w,{min:0,max:16,step:N?4:2,fmt:v=>v,label:''});s+=tl.svg+T(C.x+C.w,C.y+C.h+40,'years since baseline','t-xs t-end');
    const fK=k=>u=>{const v=cuPL(k,u*16,true);return v==null?NaN:v/100};
    const up=Y/16;
    const line=(k,col,o)=>{const f=fK(k),u0=k[0][0]/16;if(up<u0)return '';const g=u=>f(u0+(up-u0)*u)||0;
      return wave(C.x+C.w*u0,C.y,C.w*(up-u0)||.01,C.h,g,Object.assign({col},o)).svg};
    const dots=(k,col)=>k.filter(p=>p[0]>0&&p[0]<=Y+1e-6).map(p=>`<circle cx="${f1(tl.X(p[0]))}" cy="${f1(C.y+C.h*(1-p[1]/100))}" r="3.4" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`).join('');
    if(ms){
      s+=line(CU_D.oRem,'var(--muted)',{dash:true}).replace(/stroke-width:2.6/,'stroke-width:1.4;opacity:.6');
      s+=line(CU_D.oRec,'var(--muted)',{dash:true}).replace(/stroke-width:2.6/,'stroke-width:1.4;opacity:.45');
      s+=line(CU_D.rem8,'var(--mood)',{dash:true}).replace(/stroke-width:2.6/,'stroke-width:1.8');
      s+=line(CU_D.rem2,'var(--mood)',{dot:true})+dots(CU_D.rem2,'var(--mood)');
      s+=line(CU_D.rec2,'var(--accent)',{dot:true,fill:true})+dots(CU_D.rec2,'var(--accent)');
      const lab=(v,txt,col,dy=0)=>{const x=tl.X(Y),y=C.y+C.h*(1-v/100)+dy;const right=x>C.x+C.w*.62;return T(right?x-9:x+9,y+4,txt,'t-sm'+(right?' t-end':''),`fill:${col};font-weight:600`)};
      if(Y>.3){const r2=cuPL(CU_D.rem2,Y),rc=cuPL(CU_D.rec2,Y);s+=lab(r2,'remission '+Math.round(r2)+'%','var(--mood)',r2>88?16:-6)+lab(rc,'recovery '+Math.round(rc)+'%','var(--accent)',rc>r2-14?14:0);
        if(Y>=8.5){const r8=cuPL(CU_D.rem8,Y);s+=lab(r8,'8-year remission '+Math.round(r8)+'%','var(--mood)',8).replace('font-weight:600','font-weight:400')}}
      if(Y>3&&!N)s+=T(C.x+C.w-6,C.y+C.h-8,'grey dashed: other personality disorders','t-xs t-end');
    }else{
      s+=line(CU_D.rem2,'var(--muted)',{}).replace(/stroke-width:2.6/,'stroke-width:1.2;opacity:.35');
      const Yc=Math.min(Y,10),uc=Yc/16;
      if(Yc>0)s+=wave(C.x,C.y,C.w*uc||.01,C.h,u=>.85*u,{col:'var(--dx)',dash:true,dot:Y<=10}).svg;
      if(Y>=1.6){const x2=tl.X(2);s+=`<line x1="${f1(x2)}" x2="${f1(x2)}" y1="${f1(C.y+C.h*(1-.61))}" y2="${f1(C.y+C.h*(1-.50))}" style="stroke:var(--dx);stroke-width:5;stroke-linecap:round;opacity:.55"/>`+T(x2+8,C.y+C.h*(1-.56)+3,'50–61%','t-xs','fill:var(--dx)')}
      if(Y>=9.9){const x=tl.X(10),y=C.y+C.h*.15;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:var(--panel);stroke:var(--dx);stroke-width:2"/>`+T(x-9,y-8,'85% remitted by 10 years','t-sm t-end','fill:var(--dx);font-weight:600')+T(x+9,y+22,'12% relapsed','t-xs','fill:var(--storm)')}
      if(Y>10){s+=`<rect x="${f1(tl.X(10))}" y="${C.y}" width="${f1(tl.X(16)-tl.X(10))}" height="${C.h}" style="fill:var(--panel-2);opacity:.6"/>`+T((tl.X(10)+tl.X(16))/2,C.y+C.h/2+30,'not followed','t-xs t-mid')}
      if(!N)s+=T(C.x+C.w-6,C.y+C.h-8,'faint line: MSAD 2-year remission, for comparison','t-xs t-end');
    }
    const cx=tl.X(Y);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${C.y}" y2="${C.y+C.h}" style="stroke:var(--ink);stroke-width:1;opacity:.3"/>`+T(cx,C.y-6,'year '+f1(Y).replace('.0',''),'t-xs t-mid','fill:var(--ink)');
    /* icon array: 100 people */
    const G=N?{x:56,y:316,dx:29,dy:22,sz:15}:{x:448,y:70,dx:25,dy:22,sz:15};
    const rem=ms?cuPL(CU_D.rem2,Y):.85*Math.min(Y,10)/10*100,rec=ms?cuPL(CU_D.rec2,Y):0;
    const nRem=Math.round(rem),nRec=Math.round(rec),nRing=ms?Math.round(rings(Y)):Math.round(12*ramp(Y,0,10));
    s+=T(G.x-4,G.y-14,'100 PEOPLE','t-sm','fill:var(--ink);font-weight:600');
    for(let k=0;k<100;k++){const x=G.x+(k%10)*G.dx+G.dx/2,y=G.y+Math.floor(k/10)*G.dy;
      const col=k<nRec?'var(--accent)':k<nRem?'var(--mood)':'var(--storm)';s+=P(x,y,G.sz,col);
      /* ring the remitted, non-recovered people first, then the recovered */
      const ringed=nRing>0&&k<nRem&&k>=nRem-nRing;
      if(ringed)s+=`<circle cx="${f1(x)}" cy="${f1(y+7.5)}" r="10.5" style="fill:none;stroke:var(--storm);stroke-width:1.4;opacity:.9"/>`}
    const ly=G.y+10*G.dy+(N?8:10);
    const leg=ms?[['var(--storm)',`still meets criteria ${100-nRem}`],['var(--mood)',`remitted ${nRem-nRec}`],['var(--accent)',`recovered ${nRec}`]]:[['var(--storm)',`still meets criteria ${100-nRem}`],['var(--mood)',`remitted ${nRem}`]];
    leg.forEach(([c,l],i)=>{const lx=G.x+(N?(i%2)*150:0),yy=ly+(N?Math.floor(i/2)*15:i*15);s+=`<rect x="${f1(lx)}" y="${f1(yy-8)}" width="9" height="9" rx="2" style="fill:${c}"/>`+T(lx+13,yy,l,'t-xs')});
    const ry=ly+(N?(leg.length>2?30:15):leg.length*15);s+=`<circle cx="${f1(G.x+4)}" cy="${f1(ry-4)}" r="5" style="fill:none;stroke:var(--storm);stroke-width:1.4"/>`+T(G.x+13,ry,ms?`ringed: had a recurrence after remitting ${nRing}`:`ringed: relapsed ${nRing}`,'t-xs');
    /* acute vs temperamental bars */
    const B=N?{x:20,y:600,w:360}:{x:22,y:384,w:676};
    s+=T(B.x,B.y,ms?'SYMPTOMS STILL PRESENT':'BY CRITERION (CLPS)','t-sm','fill:var(--ink);font-weight:600')+(ms?T(B.x+(N?0:186),B.y+(N?14:0),'mean of the 2-year remission rates, scaled to the 16-year values','t-xs'):'');
    const acute=(97+99)/2,temp=(72+71+67+62)/4,sh=ms?cuPL(CU_D.rem2,Y)/99:Math.min(Y,10)/10;
    const bars=ms?[['Acute (self-harm, suicide attempts)',100-acute*sh,'var(--storm)'],['Temperamental (anger, emptiness, anxiety, depression)',100-temp*sh,'var(--mood)']]:[['Acute criteria',100-60*sh,'var(--storm)'],['Temperamental criteria',100-60*sh,'var(--mood)']];
    const bx=B.x+(N?0:312),bw=N?B.w-40:B.w-352;
    if(ms)bars.forEach(([l,v,c],i)=>{const y=B.y+(N?28:16)+i*(N?34:30);
      s+=T(B.x,y+(N?0:12),l,'t-xs','fill:var(--ink)');
      const yb=N?y+5:y;s+=`<rect x="${f1(bx)}" y="${f1(yb)}" width="${f1(bw)}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(bx)}" y="${f1(yb)}" width="${f1(bw*v/100)}" height="14" rx="4" style="fill:${c}"/>`+T(bx+bw*v/100+6,yb+11,Math.round(v)+'%','t-xs','fill:var(--ink)')});
    if(!ms){const L2=['All BPD criteria declined at similar rates over 10 years.','At 2 years, affective instability and anger were the least changeable.'];L2.forEach((l,i)=>{s+=T(B.x,B.y+(N?34:24)+i*15,l,'t-xs','fill:var(--ink)')})}
    svg.innerHTML=s;
    $('#cuNote').innerHTML=noteHTML(CU_STEPS[study][ph]);
    $('#cuRead').innerHTML=ms?`<span>year <b>${f1(Y)}</b></span><span>2-year remission <b>${Math.round(rem)}%</b></span><span>2-year recovery <b>${Math.round(rec)}%</b></span>`:`<span>year <b>${f1(Y)}</b></span><span>remitted <b>${Y<=10?'drawn':'85%'}</b> (published at 10 years)</span><span>relapsed by 10 years <b>12%</b></span>`}
  const stop=playWire(rg,$('#cuPlay'),draw,22000,'Replay','course');
  function wire(){const old=$('#cuSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,CU_STEPS[study],rg,draw,stop)}
  wire();
  $$('[data-cuc]').forEach(b=>b.addEventListener('click',()=>{study=b.dataset.cuc;$$('[data-cuc]').forEach(x=>x.setAttribute('aria-pressed',x===b));stop();wire();draw(+rg.value)}));
  draw(+rg.value);

  /* ---- the symptom remission race ---- */
  const rs=$('#cuRace'),rr=$('#cuRaceT');let rm='r2';
  const RACE_NOTE={
   r2:{k:'2-year remission · by 16 years',t:'Self-harm fades, dysphoria lingers',txt:`Each bar is the share of people who had the symptom at baseline and had not yet had a 2-year remission from it. By 16 years, 2-year remission ranged from 62% to 100% across the 24 symptoms (median 93%). <sup class="c" data-ref="Zanarini2016Fluidity" title="Source 596">596</sup>`,pt:`The behaviours most likely to bring someone to hospital are the ones most likely to stop.`,hook:`By 16 years: self-harm 97%, help-seeking suicide attempts 99%, chronic anger 67%, chronic anxiety 62% (2-year remission). <sup class="c" data-ref="Zanarini2016Fluidity" title="Source 596">596</sup>`},
   r4:{k:'4-year remission · by 16 years',t:'A stricter test widens the gap',txt:`Requiring the symptom to stay away for 4 years separates the groups further: self-harm still reached 91%, but chronic anger 38% and chronic anxiety 34%. Four-year remission ranged from 34% to 100% (median 74%). Bars marked "not reported" have no 4-year figure in this guide's sources. <sup class="c" data-ref="Zanarini2016Fluidity" title="Source 596">596</sup>`,pt:`Feelings like anger and anxiety often come and go for years, even when the dangerous behaviours have stopped.`,hook:`4-year remission by 16 years: self-harm 91% vs chronic anger 38%. <sup class="c" data-ref="Zanarini2016Fluidity" title="Source 596">596</sup>`},
   rc:{k:'Recurrence after a 2-year remission',t:'Fluid, not fixed',txt:`Here the bars grow: the share who had the symptom come back after a 2-year remission. Recurrence was lowest for impulsive symptoms (self-harm 43%, help-seeking suicide attempts 55%) and highest for temperamental ones (chronic anger 98%, chronic anxiety 93%, loneliness and emptiness 90%); the median across all 24 symptoms was 75%. The authors call BPD symptoms fluid, with the urgent acute ones carrying a better prognosis. <sup class="c" data-ref="Zanarini2016Fluidity" title="Source 596">596</sup>`,pt:`Symptoms can come and go. A return of anger or emptiness is common and does not mean starting again from zero.`,hook:`Recurrence after remission: self-harm 43% vs chronic anger 98% (median 75%). <sup class="c" data-ref="Zanarini2016Fluidity" title="Source 596">596</sup>`}};
  function drawR(t){const N=vb(rs,'720 360','400 560'),Y=16*t;let s='';
    const L=N?{x:20,lw:0,bx:20,bw:300,y:58,dy:60}:{x:22,lw:230,bx:262,bw:380,y:56,dy:36};
    s+=T(L.x,24,{r2:'Still without a 2-year remission',r4:'Still without a 4-year remission',rc:'Came back after a 2-year remission'}[rm],'t-big')+T(L.x,42,`year ${f1(Y)} of 16`,'t-sm');
    const sh=rm==='rc'?cuPL(CU_D.rc2,Math.min(14,Y*14/16))/36:rm==='r4'?(Y<4?0:cuPL(CU_D.rem2,Y-2)/cuPL(CU_D.rem2,14)):cuPL(CU_D.rem2,Y)/99;
    CU_SYM.forEach(([nm,g,v2,v4,vr],i)=>{const v=rm==='r2'?v2:rm==='r4'?v4:vr,y=L.y+i*L.dy;const col=g==='a'?'var(--storm)':g==='t'?'var(--mood)':'var(--dx)';
      s+=T(N?L.x:L.x+L.lw-8,N?y:y+12,nm,'t-sm'+(N?'':' t-end'),'fill:var(--ink)');
      const by=N?y+8:y;
      s+=`<rect x="${L.bx}" y="${f1(by)}" width="${L.bw}" height="16" rx="4" style="fill:var(--panel-2)"/>`;
      if(v==null){s+=T(L.bx+8,by+12,'not reported','t-xs');return}
      const val=rm==='rc'?v*sh:100-v*sh;
      s+=`<rect x="${L.bx}" y="${f1(by)}" width="${f1(L.bw*val/100)}" height="16" rx="4" style="fill:${col}"/>`+T(L.bx+L.bw*val/100+6,by+12,Math.round(val)+'%','t-xs','fill:var(--ink);font-weight:600')});
    const ly=N?L.y+8*L.dy+6:L.y+8*L.dy+12;
    [['var(--storm)','acute (impulsive)'],['var(--mood)','temperamental'],['var(--dx)','not grouped here']].forEach(([c,l],i)=>{const lx=(N?L.x:L.bx)+i*(N?120:130);s+=`<rect x="${lx}" y="${ly-8}" width="9" height="9" rx="2" style="fill:${c}"/>`+T(lx+13,ly,l,'t-xs')});
    rs.innerHTML=s;$('#cuRaceNote').innerHTML=noteHTML(RACE_NOTE[rm])}
  playWire(rr,$('#cuRacePlay'),drawR,9000,'Replay','course');
  $$('[data-cur]').forEach(b=>b.addEventListener('click',()=>{rm=b.dataset.cur;$$('[data-cur]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawR(+rr.value)}));
  drawR(+rr.value);
};
/* =============== 5.2 Families & carers =============== */
/* One illustrative moment, replayed with three replies. Version A (invalidating) runs over
   t 0–.38, B (reassuring but dismissive) over .38–.62 and C (validating) over .62–1. Inside a
   version, u 0–.3 is the shared opening line and the reply lands at u = .3. */
const FA_V={
 A:{t0:0,t1:.38,name:'invalidating',col:'var(--storm)'},
 B:{t0:.38,t1:.62,name:'dismissive',col:'var(--med)'},
 C:{t0:.62,t1:1,name:'validating',col:'var(--calm)'}
};
const faPre=u=>.15+.4*ease(ramp(u,.02,.25));
const FA_WAVE={
 A:u=>u<.3?faPre(u):.55+.42*ease(ramp(u,.3,.68)),
 B:u=>u<.3?faPre(u):.55+.06*bump(u,.3,.55)-.12*ease(ramp(u,.55,1)),
 C:u=>u<.3?faPre(u):.55-.38*ease(ramp(u,.32,.95))
};
/* the family member's own intensity: the transactional model has two people, not one */
const FA_CARER={
 A:u=>.24+.08*ramp(u,.25,.3)+.42*ease(ramp(u,.55,.8)),
 B:u=>.24+.1*ramp(u,.3,.5),
 C:u=>.24-.06*ramp(u,.4,1)
};
const FA_BOND={
 A:u=>({k:lerp(.6,.15,ease(ramp(u,.3,.7))),rupture:ease(ramp(u,.55,.8))}),
 B:u=>({k:lerp(.6,.36,ease(ramp(u,.3,.75))),rupture:0}),
 C:u=>({k:lerp(.6,.96,ease(ramp(u,.35,1))),rupture:0})
};
const FA_SCRIPT={
 parent:{who:'Sam, 19',role:'lives with BPD',fam:'Parent',famRole:'family member',
  open:['I failed the exam.','I worked so hard and','it was all for nothing.'],
  A:{say:['You’re overreacting.','It’s one exam.'],back:['You never take','me seriously!']},
  B:{say:['Don’t worry! You’ll','do better next time.'],back:['They don’t get it.'],think:true},
  C1:{say:['That sounds really','painful. What','happened?'],back:['I just froze on','the first question.']},
  C2:{say:['It makes sense you’re','upset after all that','work. Plan, or talk?'],back:['Talk first.','Then maybe plan.']}},
 partner:{who:'Alex',role:'lives with BPD',fam:'Partner',famRole:'partner',
  open:['You didn’t text back','all afternoon. I','thought you’d left.'],
  A:{say:['You’re being dramatic.','I was busy.'],back:['You don’t care','about me!']},
  B:{say:['Relax, it’s fine.','I’m here now.'],back:['So my feelings','don’t count.'],think:true},
  C1:{say:['You were scared when','I went quiet. That','sounds hard.'],back:['It was. My mind','went to the worst.']},
  C2:{say:['That makes sense','after today. Next time','I’ll text quickly.'],back:['Thank you.','That would help.']}}
};
const FA_STEPS=[
 {from:0,at:.07,k:'The moment',t:'Something painful is said',
  txt:`A person living with BPD brings a painful moment to someone close. Emotional vulnerability in the biosocial model means heightened sensitivity, intense responses and a slow return to baseline: the wave is already rising before anyone replies. <sup class="c" data-ref="Crowell2009" title="Source 112">112</sup> Families are under strain too: in a review of 465 carers, burden ran about half a standard deviation higher than for carers of people with other serious mental illnesses. <sup class="c" data-ref="Bailey2013" title="Source 23">23</sup>`,
  pt:`The feeling is real and strong. What happens next depends on both people, not only one.`,
  hook:`Biosocial model: emotional vulnerability (sensitivity, reactivity, slow return to baseline) × an invalidating environment. <sup class="c" data-ref="Crowell2009" title="Source 112">112</sup>`},
 {from:.11,at:.3,k:'Reply A',t:'Invalidating: "You’re overreacting"',
  txt:`The reply tells the person their feeling is wrong. The invalidating environment of the biosocial model is one that does not tolerate the expression of private emotional experience, especially feelings not backed by observable events. <sup class="c" data-ref="Crowell2009" title="Source 112">112</sup> In the transactional model, critical responses and a person's emotional vulnerability shape each other over time, which is why the family member's own thermometer climbs as well. Its authors say it blames neither the person with BPD nor the parents. <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Fruzzetti2005" title="Source 173">173</sup> Among 280 carers, 82.9% reported high criticism in the family. <sup class="c" data-ref="Bailey2015" title="Source 25">25</sup>`,
  pt:`Being told you are overreacting usually makes the feeling bigger, and then both people get upset.`,
  hook:`Transactional model (Fruzzetti): invalidation and emotional vulnerability feed each other; it blames neither side. <sup class="c" data-ref="Fruzzetti2005" title="Source 173">173</sup>`},
 {from:.38,at:.55,k:'Reply B · same moment again',t:'Reassuring, but dismissive',
  txt:`This reply is kind in intent, but it jumps past the feeling to a fix. The wave stops climbing but does not settle, and the person thinks the reply rather than says it. NICE's crisis advice for clinicians names exactly this trap: avoid minimising the person's stated reasons, and do not offer solutions before the problem is clear. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup> Emotional overinvolvement was high in 69.6% of 280 carers, and it went with higher burden for the carer. <sup class="c" data-ref="Bailey2015" title="Source 25">25</sup>`,
  pt:`"Don't worry" is meant kindly, but it can sound like "your feeling doesn't matter".`,
  hook:`NICE CG78 crisis principles: understand the person's point of view, use validating statements, do not minimise, do not offer solutions before the problem is clear. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`},
 {from:.62,at:.76,k:'Reply C · validate, part 1',t:'Listen, then reflect what you hear',
  txt:`The first steps of validation are attention and reflection: put other things down, ask an open question, and say back the feeling you hear. NICE describes empathic open questions with validating statements, and trying to understand the crisis from the person's point of view. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup> People with BPD and carers both describe helpful language as "connecting, validating and accepting". <sup class="c" data-ref="vanSchie2024" title="Source 543">543</sup>`,
  pt:`You don't have to agree to validate. You show you have heard the feeling and that it makes sense to you.`,
  hook:`Validation ≠ agreement. It communicates that a response is understandable from the other person's point of view.`},
 {from:.81,at:.95,k:'Reply C · validate, part 2',t:'Make sense of it, then ask before fixing',
  txt:`Next, link the feeling to its causes ("after all that work, it makes sense") and ask whether the person wants help or just to be heard. Problem-solving comes after understanding. DBT family skills training aims to build a mutually validating environment and teaches every family member emotion-regulation and interpersonal skills. <sup class="c" data-ref="Hoffman1999" title="Source 223">223</sup> Family Connections, a 12-week programme led by trained family members, teaches these family skills alongside information and coping skills. <sup class="c" data-ref="Hoffman2005" title="Source 225">225</sup>`,
  pt:`When people feel understood, the wave comes down faster, and then solving the problem gets easier.`,
  hook:`Family Connections: 12 weeks, DBT-based, led by trained family members. <sup class="c" data-ref="Hoffman2005" title="Source 225">225</sup>`}
];
const FA_PERSP={
 parent:` In this version a parent replies to a young adult. Among 82 carers of young people with BPD features, distress and negative caregiving experiences were higher than in general-population adults. <sup class="c" data-ref="Seigerman2020" title="Source 468">468</sup>`,
 partner:` In this version two partners talk. Attachment anxiety correlates with BPD traits (r = 0.48 across 27 effect sizes), so a silence can land as abandonment. <sup class="c" data-ref="Smith2020Attachment" title="Source 490">490</sup>`
};
/* Family Connections outcomes. dir: down / up (a significant improvement), ns (no significant
   difference), fav (effect sizes favoured FC, not significant), nr (not in our source). */
const FA_FC={
 h05:{n:'Hoffman 2005 · uncontrolled',
  rows:[{o:'Burden',d:'down',l:'fell; held at 6 months'},{o:'Grief',d:'down',l:'fell; held at 6 months'},{o:'Depression',d:'nr',l:'not reported in our source'},{o:'Mastery',d:'up',l:'rose; held at 6 months'}],
  k:'44 participants, 34 families',t:'The first Family Connections study',
  txt:`In the first uncontrolled study of Family Connections (44 participants from 34 families), grief and burden fell and mastery rose from before to after the 12 weeks, and the gains held at 6 months. <span class="ev early">Early evidence</span> The developers published a second uncontrolled study in 2007; until 2017 these two were the only studies. <sup class="c" data-ref="Hoffman2005,Hoffman2007JMH,Flynn2017" title="Source 158,225,227">158,225,227</sup>`,
  pt:`Relatives who took the course felt less weighed down and more able to cope, and still did 6 months later.`,
  hook:`No control group: improvement before and after cannot by itself show the programme caused it.`},
 f17:{n:'Flynn 2017 · controlled, not randomised',cmp:'Optimised TAU',
  rows:[{o:'Burden',d:'down',l:'p < 0.001 · vs TAU p = .02',c:'ns'},{o:'Grief',d:'down',l:'p < 0.001 · vs TAU p = 0.013',c:'ns'},{o:'Depression',d:'down',l:'p < 0.001',c:'ns'},{o:'Mastery',d:'up',l:'p < 0.001',c:'ns'}],
  k:'Ireland · n = 80 (51 FC, 29 comparison)',t:'A comparison group, but no randomisation',
  txt:`In a non-randomised controlled study in Ireland, Family Connections improved burden, grief, depression and mastery (all p < 0.001), while optimised treatment-as-usual showed only non-significant change. Between groups, FC was better for subjective burden (p = .02), objective burden (p = .048) and grief (p = 0.013), and the gains held at 3 and 12–19 months. The comparison arm, a three-session psychoeducation programme, was "of limited benefit". <sup class="c" data-ref="Flynn2017" title="Source 158">158</sup>`,
  pt:`Families who took the full course improved; families who had a short three-session course did not change much.`,
  hook:`Flynn 2017: FC beat a short psychoeducation comparison on burden and grief, but groups were not randomised.`},
 g24:{n:'Guillén 2024 · randomised',cmp:'Active TAU',
  rows:[{o:'Burden',d:'ns',l:'not superior to active TAU',c:'ns'},{o:'Grief',d:'nr',l:'not reported in our source'},{o:'Depression',d:'fav',l:'effect sizes favoured FC',c:'ns'},{o:'Mastery',d:'nr',l:'not reported in our source'}],
  k:'Spain · 121 relatives, 82 families',t:'The randomised trial',
  txt:`In a two-arm randomised trial in Spain (121 relatives from 82 families, plus 82 patients), Family Connections was not statistically superior to an active treatment-as-usual of similar length on burden. Its adjusted means and effect sizes were consistently better for burden, stress, depression, family functioning and quality of life, and patients whose relatives took FC improved significantly in stress, depression and anxiety. <sup class="c" data-ref="Guillen2024" title="Source 196">196</sup>`,
  pt:`Against another good programme of the same length, FC was not clearly better, though the numbers leaned its way.`,
  hook:`Only RCT of FC vs active TAU: no significant difference on burden. Status: promising, not proven superior. <sup class="c" data-ref="Guillen2024" title="Source 196">196</sup>`},
 l25:{n:'Lanfredi 2025 · before and after',
  rows:[{o:'Burden',d:'down',l:'fell; held at 4 months'},{o:'Grief',d:'down',l:'fell; held at 4 months'},{o:'Depression',d:'down',l:'fell; held at 4 months'},{o:'Mastery',d:'nr',l:'not reported in our source'}],
  k:'Italy · 202 caregivers',t:'A large Italian sample',
  txt:`In 202 Italian caregivers, burden, grief, depression, global distress and both suppressed and expressed anger fell after Family Connections, and the gains held at 4 months. <sup class="c" data-ref="Lanfredi2025" title="Source 293">293</sup> In another sample of 75 participants (57% parents), hopelessness was mostly minimal or mild to begin with (mean 4.61) and did not change significantly. <sup class="c" data-ref="Joyce2024" title="Source 245">245</sup>`,
  pt:`In a big group of Italian families, carers felt less burden, grief, low mood and anger after the course.`,
  hook:`Uncontrolled FC studies consistently show lower burden and grief; the controlled evidence is thinner. <sup class="c" data-ref="Lanfredi2025,Guillen2024" title="Source 196,293">196,293</sup>`}
};
inits.families=()=>{
  const svg=$('#faSvg'),rg=$('#faT'),note=$('#faNote'),read=$('#faRead');
  let who=store.get('fa-persp','parent');if(!FA_SCRIPT[who])who='parent';
  let setSt=()=>{};
  function ver(t){return t<FA_V.B.t0?'A':t<FA_V.C.t0?'B':'C'}
  function uOf(v,t){return ramp(t,FA_V[v].t0,FA_V[v].t1)}
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const S=FA_SCRIPT[who],v=ver(t),u=uOf(v,t),wf=FA_WAVE[v];
    const L=N?{P:[105,122,84],C:[295,122,84],pb:[6,12,190,62],cb:[204,12,190,62],tp:34,tc:366,th:74,nm:236,chip:[6,272,388,28],cap:318,
               ch:{x:40,y:356,w:250,h:150,tl:340,lx:298,ax:528}}
            :{P:[110,150,96],C:[330,150,96],pb:[10,24,200,64],cb:[230,24,200,64],tp:42,tc:398,th:86,nm:272,chip:[10,302,420,30],cap:356,
               ch:{x:462,y:58,w:160,h:206,tl:34,lx:628,ax:286}};
    const [px,py,ps]=L.P,[cx,cy,cs]=L.C;
    let s='';
    /* bond */
    const B=FA_BOND[v](u);
    s+=bond(px+ps*.32,py+ps*.62,cx-cs*.32,cy+cs*.62,{k:B.k,rupture:B.rupture,curve:N?10:14});
    const bw=B.rupture>.3?'broken':B.k<.3?'thin':B.k<.55?'strained':B.k<.8?'steady':'strong';
    s+=`<text x="${f1((px+cx)/2)}" y="${f1(py+ps*.62-(N?16:20))}" class="t-xs t-mid" style="fill:var(--bond)">bond: ${bw}</text>`;
    /* people */
    s+=person(px,py,ps,'var(--self)')+person(cx,cy,cs,'var(--other)');
    /* thermometers */
    const pv=wf(u),cvv=FA_CARER[v](u);
    s+=thermo(L.tp,py+4,L.th,pv,{w:N?10:12,label:'feeling'})+thermo(L.tc,cy+4,L.th,cvv,{w:N?10:12,label:'feeling'});
    /* names */
    s+=`<text x="${px}" y="${L.nm}" class="t-lbl t-mid">${S.who}</text><text x="${px}" y="${L.nm+14}" class="t-xs t-mid">${S.role}</text>`;
    s+=`<text x="${cx}" y="${L.nm}" class="t-lbl t-mid">${S.fam}</text><text x="${cx}" y="${L.nm+14}" class="t-xs t-mid">${S.famRole}</text>`;
    /* speech */
    const key=v==='C'?(u>=.5?'C2':'C1'):v,R=S[key],tipP=[px,py-6],tipC=[cx,cy-6];
    const [bx,by,bwid,bh]=L.pb,[qx,qy,qw,qh]=L.cb;
    /* what the person with BPD is saying (or thinking) now */
    let pl=S.open,pThink=false;
    if(v!=='C'){if(u>=.55){pl=R.back;pThink=!!R.think}}
    else if(u>=.62)pl=S.C2.back;else if(u>=.5)pl=['\u2026'];else if(u>=.38)pl=S.C1.back;
    s+=bubble(bx,by,bwid,bh,{tx:tipP[0],ty:tipP[1],lines:pl,col:pThink?'var(--muted)':'var(--self)',think:pThink});
    if(u>=.3)s+=bubble(qx,qy,qw,qh,{tx:tipC[0],ty:tipC[1],lines:R.say,col:FA_V[v].col,fill:'var(--panel)'});
    else s+=`<text x="${qx+qw/2}" y="${qy+qh/2+4}" class="t-xs t-mid">listening…</text>`;
    if(pThink)s+=`<text x="${bx+bwid/2}" y="${by+bh+(N?14:16)}" class="t-xs t-mid">(thought, not said)</text>`;
    /* version chips */
    const [kx,ky,kw,kh]=L.chip,cw=kw/3;
    ['A','B','C'].forEach((k,i)=>{const on=k===v,done=FA_V[k].t1<=t+1e-6&&!on,x=kx+cw*i+2;
      s+=`<rect x="${f1(x)}" y="${ky}" width="${f1(cw-4)}" height="${kh}" rx="${kh/2}" style="fill:${on?FA_V[k].col:'var(--panel-2)'};stroke:${FA_V[k].col};stroke-width:1.2;opacity:${on||done?1:.6}"/>`+
        `<text x="${f1(x+(cw-4)/2)}" y="${f1(ky+kh/2+4)}" class="${N?'t-xs':'t-sm'} t-mid" style="fill:${on?'var(--panel)':'var(--ink)'};font-weight:600">${k} · ${FA_V[k].name}${done&&!N?' ✓':''}</text>`});
    const cap=u<.3?(v==='A'?'The opening line. Nobody has replied yet.':'Same moment, replayed: a different reply is coming.'):
      v==='A'?(u<.55?'Reply A dismisses the feeling.':'The feeling escalates on both sides.'):
      v==='B'?(u<.55?'Reply B reassures, but skips the feeling.':'The wave stalls high: it is not heard.'):
      (u<.5?'Reply C listens and reflects.':'Reply C makes sense of it, then asks.');
    s+=`<text x="${f1(kx+kw/2)}" y="${L.cap}" class="t-sm t-mid" style="fill:var(--ink)">${cap}</text>`;
    /* emotion wave chart */
    const c=L.ch;
    s+=`<text x="${c.x}" y="${c.tl}" class="t-sm" style="fill:var(--mood);font-weight:600">${N?'EMOTION WAVE · '+S.who.toUpperCase():'EMOTION WAVE'}</text>`;
    if(!N)s+=`<text x="${c.x}" y="${c.tl+14}" class="t-xs">${S.who}, schematic intensity</text>`;
    s+=`<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    const rx=c.x+c.w*.3;
    s+=`<line x1="${f1(rx)}" x2="${f1(rx)}" y1="${c.y}" y2="${c.y+c.h}" class="grid"/><text x="${f1(rx+4)}" y="${c.y+c.h-6}" class="t-xs">reply</text>`;
    s+=`<text x="${c.x+4}" y="${c.y+c.h-6}" class="t-xs">opener</text>`;
    const thr=wave(c.x,c.y,c.w,c.h,FA_WAVE.A,{upto:0,thr:.78,thrLabel:'overwhelmed'});s+=thr.svg;
    ['A','B','C'].forEach(k=>{const isCur=k===v,past=FA_V[k].t1<=t+1e-6;if(!isCur&&!past)return;
      const W=wave(c.x,c.y,c.w,c.h,FA_WAVE[k],{upto:isCur?Math.max(.004,u):1,col:FA_V[k].col,dot:isCur,fill:isCur});
      s+=`<g style="opacity:${isCur?1:.45}">${W.svg}</g>`;
      if(past||u>.96){const e=W.at(1);s+=`<text x="${c.lx}" y="${f1(e[1]+3)}" class="t-xs" style="fill:${FA_V[k].col};font-weight:600">${k} ${FA_V[k].name}</text>`}});
    s+=`<text x="${c.x+c.w}" y="${c.ax}" class="t-xs t-end">time after the opener →</text>`;
    svg.innerHTML=s;
    /* note + readout */
    const i=phaseOf(FA_STEPS,t),P=Object.assign({},FA_STEPS[i]);
    if(i===0)P.txt+=FA_PERSP[who];
    note.innerHTML=noteHTML(P);setSt(i);
    read.innerHTML=`<span>Reply <b>${v} · ${FA_V[v].name}</b></span><span>${S.who}: <b>${Math.round(pv*100)}</b>/100</span><span>${S.fam}: <b>${Math.round(cvv*100)}</b>/100</span><span>Bond <b>${bw}</b></span><span>(schematic units)</span>`;
  }
  const stop=playWire(rg,$('#faPlay'),draw,16000,'Replay','families');
  setSt=stepWire($('#faSteps'),FA_STEPS,rg,draw,stop);
  $$('[data-fap]').forEach(b=>{b.setAttribute('aria-pressed',b.dataset.fap===who);
    b.addEventListener('click',()=>{who=b.dataset.fap;store.set('fa-persp',who);$$('[data-fap]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)})});
  draw(+rg.value);

  /* ---- Family Connections outcomes ---- */
  const fsv=$('#faFc'),fnote=$('#faFcNote');let st='h05',stopF=null;
  const AFT={down:.58,up:1.42,ns:.96,fav:.82};
  function drawFc(p){
    const N=vb(fsv,'620 290','400 470'),D=FA_FC[st],cmp=!!D.cmp;
    const L=N?{x:20,w:250,row:104,y0:58,lbl:0}:{x:110,w:380,row:56,y0:62,lbl:1};
    let s=`<text x="${N?20:20}" y="22" class="t-sm" style="fill:var(--brand);font-weight:600">${D.n.toUpperCase()}</text>`;
    s+=`<text x="${N?20:20}" y="38" class="t-xs"><tspan style="fill:var(--muted)">■ before</tspan>   <tspan style="fill:var(--accent)">■ after Family Connections</tspan>${cmp?`   <tspan style="fill:var(--other)">■ ${D.cmp}, after</tspan>`:''}</text>`;
    const base=N?L.w*.5:190,bh=cmp?11:14;
    D.rows.forEach((r,i)=>{const y=L.y0+i*L.row,good=r.d==='down'||r.d==='up';
      const lx=N?L.x:L.x-12,ly=N?y+4:y+16;
      s+=`<text x="${lx}" y="${ly}" class="t-lbl${N?'':' t-end'}">${r.o}</text>`;
      const by=N?y+12:y+2;
      s+=`<rect x="${L.x}" y="${by}" width="${f1(base)}" height="${bh}" rx="3" style="fill:var(--muted);opacity:.45"/>`;
      if(r.d!=='nr'){const w=base*lerp(1,AFT[r.d],ease(p));
        s+=`<rect x="${L.x}" y="${by+bh+3}" width="${f1(w)}" height="${bh}" rx="3" style="fill:var(--accent)${r.d==='fav'?';opacity:.55':''}"/>`;
        if(r.d==='fav')s+=`<rect x="${L.x}" y="${by+bh+3}" width="${f1(w)}" height="${bh}" rx="3" style="fill:none;stroke:var(--accent);stroke-dasharray:4 3"/>`;
        if(cmp&&r.c){const wc=base*lerp(1,AFT[r.c],ease(p));s+=`<rect x="${L.x}" y="${by+2*bh+6}" width="${f1(wc)}" height="${bh}" rx="3" style="fill:var(--other);opacity:.8"/>`}
        const arrow=r.d==='down'?'↓':r.d==='up'?'↑':r.d==='fav'?'↘':'≈';
        const tx=N?L.x:L.x+base*1.45+10,ty=N?by+(cmp?3:2)*bh+(cmp?24:20):by+bh+6;
        s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-sm" style="fill:${good?'var(--good)':'var(--warn)'};font-weight:600">${arrow} ${r.l}</text>`;
        if(cmp&&r.c&&!N)s+=`<text x="${f1(tx)}" y="${f1(ty+15)}" class="t-xs">${D.cmp}: ${r.c==='ns'?'no significant change':r.c}</text>`;
        if(cmp&&r.c&&N)s+=`<text x="${f1(tx)}" y="${f1(ty+14)}" class="t-xs">${D.cmp}: no significant change</text>`;
      }else{
        const tx=N?L.x:L.x+base+10,ty=N?by+bh+18:by+bh-2;
        s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-xs">${r.l}</text>`}
    });
    fsv.innerHTML=s;
  }
  function pickFc(k){st=k;$$('[data-fas]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.fas===k));
    const D=FA_FC[k];fnote.innerHTML=noteHTML({k:D.k,t:D.t,txt:D.txt,pt:D.pt,hook:D.hook});
    if(stopF)stopF();clearTimeout(pickFc.tm);stopF=animate(700,drawFc,()=>{stopF=null});
    /* a background tab can pause animation frames: make sure the final state is drawn */
    pickFc.tm=setTimeout(()=>{if(stopF){stopF();stopF=null}drawFc(1)},900)}
  $$('[data-fas]').forEach(b=>b.addEventListener('click',()=>pickFc(b.dataset.fas)));
  drawFc(1);pickFc('h05');
  redraws.families=(()=>{const prev=redraws.families;return()=>{prev&&prev();drawFc(1)}})();

  /* ---- carer checklist: educational, never scored ---- */
  const out=$('#faCheckOut'),NM={sleep:'sleep and health',support:'people to talk to',therapy:'help of your own',limits:'limits',info:'good information'};
  function chk(){const on=$$('[data-fac]').filter(c=>c.checked);
    $$('[data-fac]').forEach(c=>{c.closest('li').querySelector('.tip').hidden=!c.checked});
    const st0=store.get('fa-check',{});$$('[data-fac]').forEach(c=>st0[c.dataset.fac]=c.checked);store.set('fa-check',st0);
    out.textContent=on.length?`In place: ${on.map(c=>NM[c.dataset.fac]).join(', ')}. This is not a score; anything unticked is simply a place to start.`:'Nothing ticked yet. That is common: carers often put themselves last.'}
  const saved=store.get('fa-check',{});
  $$('[data-fac]').forEach(c=>{c.checked=!!saved[c.dataset.fac];c.addEventListener('change',chk)});
  chk();
};
/* =============== 5.3 Living with BPD =============== */
/* One illustrative week, u in [0,1] = Monday 00:00 to Sunday 24:00. Every number in the week
   drawing is schematic. Index [0] of a pair is "without supports", [1] "with supports". */
const LI_D=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const liU=(d,h)=>(d+h/24)/7;
const LI_EV=[
 {u:liU(0,10),a:[.46,.36],f:[.07,.022],lane:'work',lbl:'deadline moved up',sk:'mindfulness: one task'},
 {u:liU(2,13),a:[.64,.42],f:[.095,.028],lane:'rel',lbl:'text left unanswered',sk:'emotion regulation'},
 {u:liU(5,20),a:[.8,.52],f:[.13,.034],lane:'rel',lbl:'argument',sk:'phone coaching'}
];
const LI_GOOD=liU(6,12);
const LI_SLEEP=[[7,6.2,5.2,6,6.3,4,6.5],[7.2,7,6.6,7.2,7,6.4,7.6]];
const LI_THR=.68;
function liShape(d,f){return d<=0?0:(1-Math.exp(-d/.005))*Math.exp(-d/f)}
function liWave(sup){const k=sup?1:0;return u=>{let v=.2+.025*Math.sin(u*Math.PI*14-1);
  LI_EV.forEach(e=>{v+=e.a[k]*liShape(u-e.u,e.f[k])});
  v-=.09*bump(u,LI_GOOD-.05,LI_GOOD+.07);return v}}
const LI_STEPS=[
 {from:0,at:.083,k:'Monday · work',t:'Monday: the workload lands',
  txt:`A deadline moves up and the wave rises fast. In a Dutch cohort of workers, BPD symptoms went with much higher odds of impaired work performance (OR 6.02), an effect carried by depressive symptoms, which suggests treating mood may help work. <sup class="c" data-ref="Juurlink2020NESDA" title="Source 248">248</sup> An integrative review linked BPD with lower education, more dropout and low employment, with symptoms, self-stigma and non-disclosure as barriers; employment itself appeared to improve symptoms. <sup class="c" data-ref="Larcombe2022" title="Source 295">295</sup> With supports on, a mindfulness skill (attention to the present moment) shortens the wave. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`,
  pt:`Pressure at work can set off a big feeling quickly. A small, practised skill can bring it down sooner.`,
  hook:`Work impairment in BPD was mediated by depressive symptoms in NESDA, so treat co-occurring depression. <sup class="c" data-ref="Juurlink2020NESDA" title="Source 248">248</sup>`},
 {from:liU(2,8),at:liU(2,18),k:'Wednesday · relationships',t:'A text left unanswered',
  txt:`A partner goes quiet for an afternoon and the silence feels like rejection. Across 27 effect sizes, attachment anxiety correlated most strongly with BPD traits (r = 0.48), and avoidance less (r = 0.30); the two interacted, suggesting disorganised attachment. <sup class="c" data-ref="Smith2020Attachment" title="Source 490">490</sup> Emotion regulation is one of the four DBT skills areas, alongside mindfulness, distress tolerance and interpersonal effectiveness. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`,
  pt:`A slow reply can feel like being left. Naming the feeling and checking the facts can stop it from taking over the day.`,
  hook:`Attachment anxiety correlates with BPD traits at r = 0.48; avoidance at r = 0.30. <sup class="c" data-ref="Smith2020Attachment" title="Source 490">490</sup>`},
 {from:liU(3,12),at:liU(3,21),k:'Thursday · therapy',t:'A skills group',
  txt:`Standard DBT combines weekly individual therapy, a weekly skills group of about 1.5–2.5 hours with 4 to 10 members, phone coaching between sessions and a therapist consultation team. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup> Skills training is the active ingredient for self-injury: in a component trial, arms with skills training reduced non-suicidal self-injury more than DBT without it. <sup class="c" data-ref="Linehan2015" title="Source 311">311</sup> A 20-week skills group reduced suicidal and self-injury episodes more than a waitlist and improved anger, distress tolerance and emotion regulation. <sup class="c" data-ref="McMain2017" title="Source 340">340</sup> Switch to <b>without supports</b> to see a week with no group. More in <a href="#dbt" data-go="dbt">Dialectical behaviour therapy</a>.`,
  pt:`In a skills group you learn and practise ways to handle strong feelings, then try them out during the week.`,
  hook:`DBT has four parts: individual therapy, skills group, phone coaching and a consultation team. <sup class="c" data-ref="LinehanWilks2015" title="Source 312">312</sup>`},
 {from:liU(5,12),at:liU(5,23),k:'Saturday · relationships and health',t:'A weekend conflict',
  txt:`An argument escalates late on Saturday. Among 35 couples in which the woman had BPD, 68.7% had frequent break-ups and reconciliations. <sup class="c" data-ref="Bouchard2009" title="Source 75">75</sup> Without supports the wave stays high into the night: sleep shortens and alcohol appears. People with BPD have objective sleep problems and more nightmares than healthy controls, independent of depression. <sup class="c" data-ref="Winsper2017Sleep" title="Source 560">560</sup> About 45% have a current substance use disorder and 46% a current alcohol use disorder. <sup class="c" data-ref="Trull2018" title="Source 536">536</sup> With supports, a phone-coaching call helps apply a distress-tolerance skill: getting through a crisis without making it worse. <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>`,
  pt:`If an argument ever involves hurting or being hurt, you deserve to be safe. Health workers can help you find support without judging you. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup>`,
  hook:`IPV: antisocial and borderline personality disorders show the most robust links with both perpetration and victimisation. Assess both directions. <sup class="c" data-ref="Collison2021" title="Source 108">108</sup>`},
 {from:liU(6,4),at:.975,k:'Sunday',t:'A good day',
  txt:`A walk, lunch with a friend, an early night: good days are part of life with BPD too. Over time they become more common. In the McLean study, 93% had a remission lasting at least 2 years within 10 years, though full recovery, which includes work and social functioning, was reached by 50%. <sup class="c" data-ref="Zanarini2010Recovery" title="Source 588">588</sup> Lived-experience research describes recovery as non-linear and driven by hope, engagement, treatment and meaningful activities and relationships. <sup class="c" data-ref="Ng2019LivedRecovery" title="Source 378">378</sup> Relationship difficulties also ease: over 95% of recovered and non-recovered McLean patients reached remission from sexual relationship difficulties over 16 years. <sup class="c" data-ref="Karan2016" title="Source 253">253</sup>`,
  pt:`Recovery is common. Most people with BPD stop meeting the criteria over time, though steady work and relationships can take longer.`,
  hook:`Remission ≠ recovery: at 16 years, remission 78–99% but recovery 40–60%. <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup>`}
];
/* the domain explorer: rows for a small bar chart, then findings and practical points */
const LI_DOM={
 work:{h:'Work & study',max:100,unit:'%',
  rows:[{l:'Remission by 16 y',lo:78,hi:99,col:'var(--calm)'},{l:'Recovery by 16 y',lo:40,hi:60,col:'var(--brand)'},{l:'IPS job: PD',v:37.6,col:'var(--accent)'},{l:'IPS job: other',v:38.0,col:'var(--other)',fmt:'38.0%'},{l:'SSDI, per wave',v:47.2,col:'var(--med)'}],
  cap:`Ranges depend on how long remission or recovery had to last. IPS = Individual Placement and Support in a Dutch registry; PD = personality disorders. SSDI = US disability income, mean share per follow-up wave over 24 years. <sup class="c" data-ref="Zanarini2012,Juurlink2022,Kramer2023SSDI" title="Source 249,282,592">249,282,592</sup>`,
  facts:[`Recovery in the McLean study needs both symptom remission and good social and vocational functioning: by 16 years, remission was 78–99% but recovery 40–60%. <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup>`,
   `People with personality disorders found competitive work through IPS as often as people with other mental disorders (37.6% vs 38.0%), with a median 195.5 vs 178.5 days to a job. <sup class="c" data-ref="Juurlink2022" title="Source 249">249</sup>`,
   `SSDI status was fluid: 40% of baseline recipients came off it, though 43% of those went back on, and 55% of recipients had worked or studied at least half of the previous 2 years by year 10. <sup class="c" data-ref="Zanarini2009" title="Source 585">585</sup>`,
   `In university samples, clinically significant BPD features had a lifetime prevalence of 9.7%, with wide variation by method. <sup class="c" data-ref="Meaney2016" title="Source 344">344</sup>`,
   `Only 7 papers on employment interventions for BPD were found, all small or non-randomised; INVEST is testing IPS for young people with BPD features. <sup class="c" data-ref="Kernot2023,Chanen2020INVEST" title="Source 94,260">94,260</sup> <span class="ev hyp">Hypothesis</span>`],
  dos:[`NICE asks care plans to set long-term goals, including employment and occupation, linked to short-term treatment aims. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
   `Ask the care team about supported employment such as IPS. <sup class="c" data-ref="Juurlink2022" title="Source 249">249</sup>`,
   `Treating co-occurring depression may help work functioning. <sup class="c" data-ref="Juurlink2020NESDA" title="Source 248">248</sup>`]},
 rel:{h:'Relationships',max:100,unit:'',
  rows:[{l:'Attachment anxiety (r × 100)',v:48,col:'var(--self)',fmt:'r = 0.48'},{l:'Attachment avoidance (r × 100)',v:30,col:'var(--other)',fmt:'r = 0.30'},{l:'Couples: break-up cycles',v:68.7,col:'var(--bond)',fmt:'68.7%'},{l:'Couples: separated by 18 mo',v:30,col:'var(--muted)',fmt:'~30%'}],
  cap:`Correlations are shown ×100 to share an axis with percentages. Couple figures come from 35 couples in which the woman had BPD. <sup class="c" data-ref="Smith2020Attachment,Bouchard2009" title="Source 75,490">75,490</sup>`,
  facts:[`Attachment anxiety correlated most strongly with BPD traits (r = 0.48), avoidance less (r = 0.30). <sup class="c" data-ref="Smith2020Attachment" title="Source 490">490</sup>`,
   `Compared with 35 non-clinical couples, couples in which the woman had BPD had lower satisfaction, more demand/withdraw communication and more violence; nearly half of the male partners met criteria for a personality disorder. <sup class="c" data-ref="Bouchard2009" title="Source 75">75</sup>`,
   `Recovered McLean patients were more likely to have married or cohabited and become parents, and less likely to have lost custody of a child. <sup class="c" data-ref="Zanarini2015Marriage" title="Source 593">593</sup>`,
   `In a meta-analysis of 163 studies, antisocial and borderline personality disorders had the most robust links with both perpetration and victimisation of intimate partner violence. <sup class="c" data-ref="Collison2021" title="Source 108">108</sup> In a British population sample, serious and repeated violence was better explained by co-occurring substance misuse, anxiety and antisocial personality disorder. <sup class="c" data-ref="Gonzalez2016" title="Source 181">181</sup>`],
  dos:[`NICE NG225 asks staff who see someone after self-harm to ask about domestic abuse, violence or exploitation, alone if appropriate. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup>`,
   `If a relationship involves hurting or being hurt, you deserve to be safe, and health workers can help without judging you. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup>`]},
 preg:{h:'Parenting & pregnancy',max:12,unit:'%',
  rows:[{l:'Valproate',v:10.3,col:'var(--bad)'},{l:'Carbamazepine',v:5.5,col:'var(--med)'},{l:'Topiramate',v:3.9,col:'var(--med)'},{l:'Oxcarbazepine',v:3.0,col:'var(--muted)',fmt:'3.0%'},{l:'Lamotrigine',v:2.9,col:'var(--muted)'},{l:'Levetiracetam',v:2.8,col:'var(--muted)'}],
  cap:`Major congenital malformations by drug, EURAP registry, 7,355 monotherapy pregnancies (mostly epilepsy). No medicine is approved for BPD itself; these are relevant only because some are prescribed off-label. <sup class="c" data-ref="Tomson2018" title="Source 529">529</sup>`,
  facts:[`In clinical perinatal samples, the pooled prevalence of BPD was 14.0%; in non-clinical samples, 0.7–1.7%. <sup class="c" data-ref="Prasad2022" title="Source 418">418</sup>`,
   `In US birth data, BPD was linked after adjustment with preterm birth (OR 1.54), caesarean delivery (1.44), gestational diabetes (1.45) and venous thromboembolism (2.11). <sup class="c" data-ref="PareMiron2016" title="Source 397">397</sup>`,
   `The Depakote label states valproate "should not be administered to a woman of childbearing potential unless other medications have failed to provide adequate symptom control or are otherwise unacceptable". <sup class="c" data-ref="FDA-Depakote" title="Source 148">148</sup> After high-dose exposure, IQ at age 6 was 9.7 points lower. <sup class="c" data-ref="Baker2015" title="Source 26">26</sup> Valproate and topiramate exposure went with more autism and intellectual disability; lamotrigine showed no consistent rise. <sup class="c" data-ref="Bjork2022,MadleyDowd2024" title="Source 54,326">54,326</sup>`,
   `First-trimester lithium went with cardiac malformations in 2.41% vs 1.15% unexposed, rising with dose. <sup class="c" data-ref="Patorno2017" title="Source 405">405</sup>`,
   `Reviews link maternal BPD with less sensitive, more intrusive parenting and higher parenting stress, and call for parenting interventions. <sup class="c" data-ref="Petfield2015,Steele2019" title="Source 411,503">411,503</sup> <span class="ev early">Early evidence</span> In Mother–Infant DBT, 71% completed the 25 weeks and mothers' symptoms improved, though observed interaction often stayed of concern. <sup class="c" data-ref="SvedWilliams2021" title="Source 519">519</sup> Mothers described more confidence reading their child's cues. <sup class="c" data-ref="Francis2023" title="Source 169">169</sup>`],
  dos:[`If you are pregnant or planning a baby, ask your doctor about every medicine you take. <sup class="c" data-ref="FDA-Depakote" title="Source 148">148</sup>`,
   `Interventions for perinatal BPD are few (7 studies, 2 RCTs); DBT skills groups, mother–baby units and child–parent psychotherapy showed promise. <sup class="c" data-ref="May2023" title="Source 334">334</sup> <span class="ev early">Early evidence</span> See <a href="#meds" data-go="meds">Medication: the evidence</a>.`]},
 health:{h:'Physical health',max:100,unit:'%',
  rows:[{l:'Current SUD',v:45.46,col:'var(--med)'},{l:'Lifetime SUD',v:75.28,col:'var(--med)'},{l:'Current alcohol use disorder',v:46.39,col:'var(--storm)'},{l:'Obese at 6 y (McLean)',v:28,col:'var(--muted)'}],
  cap:`Substance use disorder (SUD) figures from a review of 70 studies; obesity from 264 McLean patients. Population statistics. <sup class="c" data-ref="Trull2018,Frankenburg2006Obesity" title="Source 171,536">171,536</sup>`,
  facts:[`In US national survey data, BPD was linked with hypertension, liver, cardiovascular and gastrointestinal disease and arthritis after full adjustment (adjusted ORs 1.46–2.80). <sup class="c" data-ref="ElGabalawy2010" title="Source 142">142</sup>`,
   `People whose BPD had not remitted were more likely to report obesity, diabetes, hypertension, back pain and chronic fatigue, and to use more emergency and hospital care. <sup class="c" data-ref="Frankenburg2004Medical,Keuroghlian2013Medical" title="Source 170,261">170,261</sup>`,
   `In a Hong Kong cohort, BPD was linked with natural-cause mortality (HR 2.02), with cardiovascular disease a leading contributor, and 13.01 excess life-years lost; the authors called for physical-health monitoring alongside suicide prevention. These are population statistics. <sup class="c" data-ref="Chan2026" title="Source 89">89</sup>`,
   `People with BPD sleep less efficiently and have more nightmares than healthy controls, independent of depression; non-recovered McLean patients took 39 vs 28 minutes to fall asleep. <sup class="c" data-ref="Winsper2017Sleep,Plante2013" title="Source 414,560">414,560</sup>`],
  dos:[`NICE asks clinicians to monitor a broad range of outcomes, including drug and alcohol use, alongside BPD symptoms. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
   `Sleep, exercise, smoking, alcohol and regular check-ups are part of getting well. <sup class="c" data-ref="Keuroghlian2013Medical,Winsper2017Sleep" title="Source 261,560">261,560</sup> Whether treating BPD improves physical health is unknown: the links are associations.`]},
 stigma:{h:'Stigma & disclosure',max:100,unit:'%',
  rows:[{l:'No credentials given',v:59.9,col:'var(--muted)'},{l:'Misinformation: diagnosis',v:29.2,col:'var(--storm)'},{l:'Misinformation: explainers',v:24.7,col:'var(--storm)'}],
  cap:`207 TikTok videos about BPD. Personal-experience videos drew far more engagement than treatment videos (mean weighted likes 2,389 vs 222). <sup class="c" data-ref="Evoy2026" title="Source 145">145</sup>`,
  facts:[`BPD may carry stigma beyond other mental illnesses; clinicians' emotional distancing can be felt as rejection and set up a self-fulfilling cycle. <sup class="c" data-ref="Aviram2006" title="Source 18">18</sup>`,
   `The public may read BPD symptoms as "purposeful misbehaviour"; recovery messages plus biological explanations looked most promising against stigma. <sup class="c" data-ref="Ociskova2023" title="Source 393">393</sup> <span class="ev early">Early evidence</span>`,
   `Comments on BPD TikTok videos showed frequent self-diagnosis, confusion with autism and ADHD, and distrust of professional diagnosis; social media worked as both support and misinformation. <sup class="c" data-ref="Theriault2026" title="Source 525">525</sup>`,
   `Self-stigma predicted low self-esteem in women with BPD, beyond depression and shame. <sup class="c" data-ref="Rusch2006" title="Source 443">443</sup> Non-disclosure was a barrier to work and study, and honesty an enabler. <sup class="c" data-ref="Larcombe2022" title="Source 295">295</sup>`],
  dos:[`You should never be turned away from care because of your diagnosis or because you have self-harmed. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
   `Check who made a video and whether they cite evidence; a diagnosis needs an assessment, not a quiz. See <a href="#assess" data-go="assess">Assessment &amp; interviews</a>. <sup class="c" data-ref="Evoy2026" title="Source 145">145</sup>`]}
};
inits.living=()=>{
  const svg=$('#liSvg'),rg=$('#liT'),note=$('#liNote'),read=$('#liRead');
  let sup=store.get('li-sup',1)?1:0,setSt=()=>{};
  const hoursAbove=k=>{const f=liWave(k);let n=0;for(let i=0;i<=1680;i++)if(f(i/1680)>LI_THR)n++;return Math.round(n/10)};
  const H=[hoursAbove(0),hoursAbove(1)];
  function draw(t){
    const N=vb(svg,'720 400','400 410');
    const L=N?{x0:66,x1:392,eT:16,e0:28,e1:176,lw:{work:206,rel:244},hs:[268,312],th:342,ax:370,lab:4,leg:398}
             :{x0:122,x1:708,eT:18,e0:28,e1:150,lw:{work:180,rel:214},hs:[236,280],th:312,ax:338,lab:8,leg:384};
    const W=L.x1-L.x0,X=u=>L.x0+W*u,k=sup;
    let s='';
    /* day columns */
    for(let d=0;d<7;d++){if(d%2)s+=`<rect x="${f1(X(d/7))}" y="${L.e0-6}" width="${f1(W/7)}" height="${L.ax-L.e0+6}" style="fill:var(--panel-2);opacity:.45"/>`;
      s+=`<text x="${f1(X((d+.5)/7))}" y="${L.ax+16}" class="t-xs t-mid" style="${Math.floor(t*7)===d?'fill:var(--ink);font-weight:700':''}">${LI_D[d]}</text>`}
    s+=tline(L.x0,L.ax,W,{min:0,max:7,step:1,fmt:()=>''}).svg;
    /* lane titles */
    const lane=(y,txt)=>`<text x="${L.lab}" y="${f1(y+4)}" class="t-sm" style="fill:var(--ink)">${txt}</text>`;
    s+=`<text x="${L.lab}" y="${L.eT}" class="t-sm" style="fill:var(--mood);font-weight:600">EMOTION WAVE</text>`;
    s+=lane(L.lw.work,N?'Work':'Work / study')+lane(L.lw.rel,N?'People':'Relationships')+lane((L.hs[0]+L.hs[1])/2,N?'Health':'Sleep &amp; health')+lane(L.th,N?'Therapy':'Therapy &amp; skills');
    [L.lw.work,L.lw.rel,L.th].forEach(y=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${y}" y2="${y}" class="grid"/>`});
    /* emotion wave: the other condition as a dashed ghost, the current one up to t */
    const fCur=liWave(k),fAlt=liWave(1-k),eh=L.e1-L.e0;
    const g=wave(L.x0,L.e0,W,eh,fAlt,{upto:1,col:'var(--muted)',dash:true});
    s+=`<g style="opacity:.55">${g.svg}</g>`;
    const w=wave(L.x0,L.e0,W,eh,fCur,{upto:Math.max(.003,t),col:k?'var(--mood)':'var(--storm)',fill:true,dot:true,thr:LI_THR,thrLabel:'overwhelming'});
    s+=w.svg;
    s+=`<text x="${L.x1}" y="${L.e1+12}" class="t-xs t-end">dashed: same week ${k?'without':'with'} supports</text>`;
    /* work: weekday blocks */
    for(let d=0;d<5;d++){const a=liU(d,9),b=liU(d,17);if(t<a)continue;
      s+=`<rect x="${f1(X(a))}" y="${L.lw.work-5}" width="${f1(X(Math.min(b,t))-X(a))}" height="10" rx="3" style="fill:var(--dx);opacity:.35"/>`}
    /* events, and the skill that answers each one */
    LI_EV.forEach((e,i)=>{if(t<e.u)return;const y=L.lw[e.lane],x=X(e.u);
      s+=`<circle cx="${f1(x)}" cy="${y}" r="5.5" style="fill:var(--storm);stroke:var(--panel);stroke-width:1.5"/>`;
      const right=e.u<.8||!N;const lx=right?x+9:x-9;
      s+=`<text x="${f1(lx)}" y="${y-8}" class="t-xs${right?'':' t-end'}" style="fill:var(--storm)">${N&&i===1?'no reply':e.lbl}</text>`;
      const pk=w.at(e.u+.012);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y-6}" y2="${f1(Math.min(pk[1]+4,L.e1))}" style="stroke:var(--storm);stroke-width:1;stroke-dasharray:2 3;opacity:.6"/>`;
      if(k){const su=e.u+.012;if(t>=su){const sx=X(su);
        s+=`<path d="M${f1(sx)} ${L.th-7}l7 7l-7 7l-7 -7z" style="fill:var(--accent)"/>`;
        if(!N||i!==1)s+=`<text x="${f1(sx+(e.u>.8?-10:10))}" y="${L.th+18}" class="t-xs${e.u>.8?' t-end':''}" style="fill:var(--accent)">${N?'skill':e.sk}</text>`;
        const sp=w.at(Math.min(t,su+.02));s+=`<line x1="${f1(sx)}" x2="${f1(sx)}" y1="${L.th-8}" y2="${f1(sp[1]+6)}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:3 3;opacity:.8"/>`}}});
    /* relationships: the reply that came, and Sunday lunch */
    const reply=liU(2,17.5);if(t>=reply){const x=X(reply);s+=`<circle cx="${f1(x)}" cy="${L.lw.rel}" r="4" style="fill:var(--good)"/>`;if(!N)s+=`<text x="${f1(x+7)}" y="${L.lw.rel+14}" class="t-xs" style="fill:var(--good)">reply: "was in a meeting"</text>`}
    const lunch=liU(6,13);if(t>=lunch){const x=X(lunch);s+=`<circle cx="${f1(x)}" cy="${L.lw.rel}" r="4" style="fill:var(--good)"/><text x="${f1(x-7)}" y="${L.lw.rel+14}" class="t-xs t-end" style="fill:var(--good)">lunch with a friend</text>`}
    /* sleep bars, one per night */
    const [h0,h1]=L.hs,hh=h1-h0;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${h1}" y2="${h1}" class="axis"/>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(h1-hh*7/9)}" y2="${f1(h1-hh*7/9)}" style="stroke:var(--calm);stroke-width:1;stroke-dasharray:2 4"/><text x="${L.x0+2}" y="${f1(h1-hh*7/9-3)}" class="t-xs" style="fill:var(--calm)">7 h</text>`;
    LI_SLEEP[k].forEach((hrs,d)=>{const u=liU(d,23.5);if(t<u)return;const bw=N?14:24,x=X(u)-bw/2,bh=hh*hrs/9;
      s+=`<rect x="${f1(x)}" y="${f1(h1-bh)}" width="${bw}" height="${f1(bh)}" rx="3" style="fill:${hrs<5.5?'var(--storm)':'var(--other)'};opacity:.75"/>`;
      if(!N)s+=`<text x="${f1(x+bw/2)}" y="${f1(h1-bh-3)}" class="t-xs t-mid">${hrs}</text>`});
    if(!k&&t>=liU(5,22.5)){const x=X(liU(5,22.5));s+=`<text x="${f1(x-6)}" y="${h0+6}" class="t-xs t-end" style="fill:var(--med)">alcohol</text><circle cx="${f1(x)}" cy="${h0+3}" r="4" style="fill:var(--med)"/>`}
    const walk=liU(6,10);if(t>=walk){const x=X(walk);s+=`<circle cx="${f1(x)}" cy="${h0+3}" r="4" style="fill:var(--good)"/><text x="${f1(x-7)}" y="${h0+6}" class="t-xs t-end" style="fill:var(--good)">walk</text>`}
    /* therapy lane */
    if(k){[[1,16,'therapy session'],[3,18,'skills group']].forEach(([d,h,l])=>{const u=liU(d,h);if(t<u)return;const x=X(u),bw=X(u+2.2/168)-x+(N?6:10);
      s+=`<rect x="${f1(x)}" y="${L.th-8}" width="${f1(bw)}" height="16" rx="5" style="fill:var(--rx);opacity:.85"/><text x="${f1(x+bw/2)}" y="${L.th-12}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">${N?(d===3?'group':'session'):l}</text>`})}
    else s+=`<text x="${f1(X(.5))}" y="${L.th+4}" class="t-xs t-mid">no regular therapy or group this week</text>`;
    /* now cursor */
    const xn=X(t);s+=`<line x1="${f1(xn)}" x2="${f1(xn)}" y1="${L.e0-4}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    const day=Math.min(6,Math.floor(t*7)),hr=Math.floor((t*7-day)*24);
    /* legend */
    if(!N)s+=`<text x="${L.x0}" y="${L.leg}" class="t-xs"><tspan style="fill:var(--storm)">● trigger</tspan>   <tspan style="fill:var(--accent)">◆ skill used</tspan>   <tspan style="fill:var(--good)">● good moment</tspan>   <tspan style="fill:var(--other)">▮ sleep (hours)</tspan>   <tspan style="fill:var(--rx)">▬ therapy</tspan></text>`;
    else s+=`<text x="${L.lab}" y="${L.leg}" class="t-xs"><tspan style="fill:var(--storm)">● trigger</tspan>  <tspan style="fill:var(--accent)">◆ skill</tspan>  <tspan style="fill:var(--good)">● good</tspan>  <tspan style="fill:var(--other)">▮ sleep</tspan>  <tspan style="fill:var(--rx)">▬ therapy</tspan></text>`;
    svg.innerHTML=s;
    const i=phaseOf(LI_STEPS,t);note.innerHTML=noteHTML(LI_STEPS[i]);setSt(i);
    read.innerHTML=`<span><b>${LI_D[day]} ${String(hr).padStart(2,'0')}:00</b></span><span>Intensity <b>${Math.round(clamp(fCur(t))*100)}</b>/100</span><span>Hours above the line this week: <b>${H[k]}</b> ${k?'with':'without'} supports vs <b>${H[1-k]}</b> ${k?'without':'with'}</span><span>(schematic)</span>`;
  }
  const stop=playWire(rg,$('#liPlay'),draw,18000,'Replay','living');
  setSt=stepWire($('#liSteps'),LI_STEPS,rg,draw,stop);
  $$('[data-lis]').forEach(b=>{b.setAttribute('aria-pressed',+b.dataset.lis===sup);
    b.addEventListener('click',()=>{sup=+b.dataset.lis;store.set('li-sup',sup);$$('[data-lis]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)})});
  draw(+rg.value);

  /* ---- domain explorer ---- */
  const dsv=$('#liDomSvg');let dom='work';
  function drawDom(){
    const D=LI_DOM[dom],n=D.rows.length,N=vb(dsv,'520 '+(n*40+24),'400 '+(n*50+20));
    const L=N?{lx:4,bx:4,bw:300,top:8,row:50}:{lx:170,bx:180,bw:260,top:12,row:40};
    let s='';
    D.rows.forEach((r,i)=>{const y=L.top+i*L.row,by=N?y+16:y+4,sc=v=>L.bw*v/D.max;
      s+=`<text x="${L.lx}" y="${N?y+10:y+16}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink)">${r.l}</text>`;
      s+=`<rect x="${L.bx}" y="${by}" width="${L.bw}" height="16" rx="4" style="fill:var(--panel-2)"/>`;
      if(r.lo!=null){s+=`<rect x="${f1(L.bx+sc(r.lo))}" y="${by}" width="${f1(sc(r.hi-r.lo))}" height="16" rx="4" style="fill:${r.col}"/><rect x="${L.bx}" y="${by+6}" width="${f1(sc(r.lo))}" height="4" rx="2" style="fill:${r.col};opacity:.35"/>`;
        s+=`<text x="${f1(L.bx+sc(r.hi)+6)}" y="${by+12}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.lo}–${r.hi}${D.unit}</text>`}
      else{s+=`<rect x="${L.bx}" y="${by}" width="${f1(sc(r.v))}" height="16" rx="4" style="fill:${r.col}"/><text x="${f1(L.bx+sc(r.v)+6)}" y="${by+12}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.fmt||r.v+D.unit}</text>`}});
    dsv.innerHTML=s;
  }
  function pickDom(k){dom=k;const D=LI_DOM[k];
    $$('[data-lid]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lid===k));
    $('#liDomH').textContent=D.h;$('#liDomCap').innerHTML=D.cap;
    $('#liDomTxt').innerHTML=`<p class="kicker">What studies found</p><ul>${D.facts.map(f=>`<li>${f}</li>`).join('')}</ul><div class="do"><b>Practical points</b><ul>${D.dos.map(f=>`<li>${f}</li>`).join('')}</ul></div>`;
    drawDom()}
  $$('[data-lid]').forEach(b=>b.addEventListener('click',()=>pickDom(b.dataset.lid)));
  pickDom('work');
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawDom()};
};
/* =============== 5.4 Nursing care =============== */
/* Each station: s = short station label (wide), sn = narrow label, a/e/p = actions / evidence / pitfall for the
   SVG panels (no citations inside SVG), and the note fields with citations. No injury or method detail anywhere. */
const NU_ED=[
 {s:['Triage and','first contact'],sn:'Triage',a:'Greet calmly and explain what will happen next. Wait in an area close to staff who can support and observe.',e:'People with BPD, carers and clinicians mostly report negative ED experiences; stigma is felt to drive repeat visits.',p:'A long, unexplained wait and a cold or dismissive welcome.',
  k:'ED · Station 1 of 5',t:'Triage and a calm first contact',
  txt:`NICE CG78 asks for a calm, non-threatening attitude and an effort to understand the crisis from the person's point of view. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup> NICE NG225 places the waiting area for people who have self-harmed close to staff who can provide care, support and observation. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup> An integrative review of 9 papers found mostly negative ED experiences, with barriers to timely care and stigmatising attitudes felt to drive further visits. <sup class="c" data-ref="Miller2024ED" title="Source 350">350</sup>`,
  pt:`The first few minutes shape the whole visit. Calm, clear words help a person in crisis feel safe enough to stay.`,
  hook:`NICE NG225: ED waiting area for people who self-harm should be near staff who can support and observe. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup>`},
 {s:['Physical care','without judgement'],sn:'Care',a:'Treat injuries with the same care and respect as any other patient. Start the psychosocial assessment alongside physical care.',e:'ED nurses describe their skills as biomedical and want closer links with psychiatry; empathy toward self-harm is often limited.',p:'Waiting until medical treatment ends, or until alcohol levels fall, before assessing.',
  k:'ED · Station 2 of 5',t:'Physical care without judgement',
  txt:`NICE NG225: carry out physical care and the psychosocial assessment at the same time, as soon as possible, and do not use breath or blood alcohol levels to delay the assessment. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup> Danish emergency nurses saw their competence as biomedical and suggested close collaboration with psychiatry. <sup class="c" data-ref="Ostervang2022" title="Source 394">394</sup> A meta-analysis found limited empathy among ED nurses toward people who self-harm and recommended education and supervision. <sup class="c" data-ref="Rayner2019" title="Source 423">423</sup>`,
  pt:`Good wound care is also emotional care: a respectful, unhurried manner tells the person they deserve help.`,
  hook:`Physical and psychosocial care run in parallel, not one after the other. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup>`},
 {s:['Assessment and','safety plan'],sn:'Assess',a:'Talk in a private space. Ask about needs, strengths and what is happening; build a risk formulation and write a safety plan together.',e:'Safety plan with follow-up calls: suicidal behaviour 3.03% vs 5.29% at 6 months. Risk scales: PPV for suicide only 5.5%.',p:'Rating the person low, medium or high risk and deciding care from the score.',
  k:'ED · Station 3 of 5',t:'Collaborative assessment and safety plan',
  txt:`Hold the assessment in a private area where the person cannot be overheard; use a risk formulation, not risk tools, scales or a global low/medium/high rating, and develop a safety plan with the person. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup> A safety plan with at least two follow-up calls was followed by suicidal behaviour in 3.03% vs 5.29% over 6 months. <sup class="c" data-ref="Stanley2018ED" title="Source 501">501</sup> Risk scales had a pooled positive predictive value of 5.5% for suicide. <sup class="c" data-ref="Carter2017PPV" title="Source 86">86</sup>`,
  pt:`Instead of scoring someone, the nurse asks what is going on, what helps and what would keep them safer, and writes it down with them.`,
  hook:`Risk formulation, not risk prediction. "No 'high-risk' classification was clinically useful." <sup class="c" data-ref="Carter2017PPV" title="Source 86">86</sup>`},
 {s:['Brief admission','or discharge'],sn:'Admit?',a:'Consider a crisis or home treatment team first. If admitted, agree purpose and length in advance; if discharged, leave with a crisis plan.',e:'Brief admission RCT: no fewer hospital days, but within-group falls in compulsory days and self-injury.',p:'An open-ended admission with no agreed purpose, or discharge with no plan.',
  k:'ED · Station 4 of 5',t:'Brief admission or discharge with a crisis plan',
  txt:`NICE CG78: refer to a crisis resolution and home treatment team before considering acute admission; admit only for crises with significant risk that cannot be managed elsewhere, agreeing length and purpose in advance. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup> In the brief admission RCT (125 adults), self-referral did not reduce total hospital days, though only that group showed within-group falls in compulsory admission days and self-injury. <sup class="c" data-ref="Westling2019BA" title="Source 549">549</sup> Cochrane 2022 rates the crisis-intervention evidence low to very low certainty. <sup class="c" data-ref="MonkCunliffe2022" title="Source 351">351</sup>`,
  pt:`Hospital is one option, not the default. When it is used, everyone should know why, and for how long.`,
  hook:`NICE CG78: formal care programme review for anyone admitted twice or more in 6 months. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`},
 {s:['Follow-up','within days'],sn:'Follow-up',a:'Arrange aftercare within 48 hours if safety concerns continue. Phone to check in, update the plan, and tell the GP.',e:'ED-SAFE: a brief ED intervention plus calls lowered suicide attempts to 18% vs 23%.',p:'Losing contact at the hand-over between services.',
  k:'ED · Station 5 of 5',t:'Follow-up within days',
  txt:`NICE NG225: provide initial aftercare within 48 hours of the psychosocial assessment if there are ongoing safety concerns, and give the person a copy of the plan with contact details. <sup class="c" data-ref="NICE2022SelfHarm,NICE2022NG225" title="Source 380,381">380,381</sup> In ED-SAFE, screening plus a brief intervention with telephone calls lowered suicide attempts to 18%, from 23% with usual care. <sup class="c" data-ref="Miller2017EDSAFE" title="Source 349">349</sup> Safety planning more than doubled the odds of attending outpatient care (OR 2.06). <sup class="c" data-ref="Stanley2018ED" title="Source 501">501</sup>`,
  pt:`A phone call a day or two later tells the person they were not forgotten, and it keeps the plan alive.`,
  hook:`Aftercare within 48 hours when concerns continue (NICE NG225); ED-SAFE attempts 18% vs 23%. <sup class="c" data-ref="NICE2022SelfHarm,Miller2017EDSAFE" title="Source 349,381">349,381</sup>`}
];
const NU_WARD=[
 {s:['Admission with','a purpose'],sn:'Admit',a:'Agree the purpose and expected length of the stay with the person at the start; return to voluntary care as soon as possible.',e:'People found coercive admission and poor discharge planning harmful; they valued feeling safe.',p:'Unclear goals that let a stay drift on.',
  k:'Ward · Station 1 of 5',t:'Admission with a purpose',
  txt:`NICE CG78: agree the length and purpose of any admission in advance, and resume voluntary care as soon as possible if compulsion was needed; arrange a care programme review for anyone admitted twice or more in 6 months. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup> People who had stayed on acute wards found coercive admission and poor discharge planning harmful. <sup class="c" data-ref="Stapleton2019" title="Source 502">502</sup>`,
  pt:`A short, focused stay with clear goals is usually more helpful than a long one without them.`,
  hook:`Admission: agreed purpose and length, voluntary care as soon as possible. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`},
 {s:['Therapeutic','relationship'],sn:'Relate',a:'Make time to talk and listen. Validate feelings, explain BPD in plain words, and build trust step by step.',e:'People valued being listened to and time to talk; with community nurses: learning, trust and validation.',p:'Little staff contact, and negative attitudes that people can feel.',
  k:'Ward · Station 2 of 5',t:'The therapeutic relationship',
  txt:`People on acute wards valued being listened to, time to talk with staff and other patients, time out and feeling safe; they found negative staff attitudes, lack of contact and lack of BPD knowledge harmful. <sup class="c" data-ref="Stapleton2019" title="Source 502">502</sup> With community mental health nurses, people named learning about the disorder, building trust and being empowered through validation. <sup class="c" data-ref="RomeuLabayen2020" title="Source 436">436</sup>`,
  pt:`Being listened to and taken seriously is itself part of treatment.`,
  hook:`Three helpful parts of the nurse relationship: psychoeducation, trust, validation. <sup class="c" data-ref="RomeuLabayen2020" title="Source 436">436</sup>`},
 {s:['Observation,','least restrictive'],sn:'Observe',a:'Decide observation case by case with the person\'s views, by trained staff, and review it regularly.',e:'Safewards on 31 wards: conflict down 15%, containment down 23.2%.',p:'Blanket observation levels and restrictions that keep escalating.',
  k:'Ward · Station 3 of 5',t:'Observation and least-restrictive care',
  txt:`NICE NG225: decide the need for close observation case by case, taking the person's views into account, with skilled trained staff, consent or a legal framework, and regular review. <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup> In the Safewards cluster RCT (31 wards, 15 hospitals), simple interventions to improve staff–patient relationships reduced conflict by 15% and containment by 23.2%. <sup class="c" data-ref="Bowers2015" title="Source 76">76</sup>`,
  pt:`Being watched all the time can feel like punishment. Good wards use the least restriction that keeps people safe, and explain why.`,
  hook:`Safewards: conflict −15% (5.7–23.7), containment −23.2% (9.9–35.5). <sup class="c" data-ref="Bowers2015" title="Source 76">76</sup>`},
 {s:['De-escalation,','one team plan'],sn:'Team',a:'Respond the same way across staff and shifts from one written plan. Use calm communication and self-regulation first.',e:'Nurses ask for a coherent therapeutic framework; care seemed better where one existed.',p:'Different answers from different staff, which feels unfair and confusing.',
  k:'Ward · Station 4 of 5',t:'De-escalation and a single team plan',
  txt:`De-escalation is "a collective term for a range of interwoven staff-delivered components comprising communication, self-regulation, assessment, actions, and safety maintenance", aiming to reduce aggression while minimising coercion. <sup class="c" data-ref="Hallett2017" title="Source 210">210</sup> Nurses asked for a coherent therapeutic framework, and care seemed better where one existed. <sup class="c" data-ref="Dickens2016" title="Source 118">118</sup> NICE asks teams to manage risk as a whole multidisciplinary team. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`,
  pt:`When every nurse follows the same plan, the person knows what to expect, and trust can grow.`,
  hook:`De-escalation components: communication, self-regulation, assessment, actions, safety maintenance. <sup class="c" data-ref="Hallett2017" title="Source 210">210</sup>`},
 {s:['Discharge and','transition'],sn:'Discharge',a:'Plan discharge with the person (and family if possible): how to manage distress, future crises and re-engaging. Inform the GP.',e:'Poor discharge planning was named as harmful. Brief-admission use fell from about 8 to 3–4 days per 6 months over 4 years.',p:'An abrupt ending with no plan for the first days at home.',
  k:'Ward · Station 5 of 5',t:'Discharge and transition',
  txt:`NICE CG78: before discharge, agree a plan with the person (and family where possible) for managing distress, coping with future crises and re-engaging with services, and inform the GP; expect endings to evoke strong emotions and phase them. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup> In 4-year follow-up of 62 brief-admission users, mean use fell from about 8 days per 6 months to 3–4. <sup class="c" data-ref="Daukantaite2025" title="Source 115">115</sup>`,
  pt:`Leaving hospital is a big step. A clear plan for the first days at home makes it safer.`,
  hook:`Transitions: discuss beforehand, structure and phase them, keep crisis access. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`}
];
const NU_TALK=[
 {who:'In the ED, after self-harm',say:['Just patch me up.','Nobody here wants to deal with me anyway.'],
  r:[{t:'"We\'re very busy. You\'ll have to wait like everyone else."',g:0,f:'Dismissive. It confirms the person\'s fear of being unwanted, and stigmatising attitudes are felt to drive repeat visits. <sup class="c" data-ref="Miller2024ED" title="Source 350">350</sup>'},
     {t:'"It sounds like you\'ve had hard experiences here before. I\'m going to look after you now, and when you\'re ready I\'d like to hear what happened tonight."',g:1,f:'Validates the feeling, gives care now and starts the conversation without delay, as NICE NG225 asks: physical and psychosocial care together. <sup class="c" data-ref="NICE2022SelfHarm,NICE2009" title="Source 379,381">379,381</sup>'},
     {t:'"Of course we want to help! Don\'t think like that."',g:0,f:'Kindly meant, but it minimises what the person said. NICE asks staff to avoid minimising the person\'s stated reasons. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>'}]},
 {who:'On the ward',say:['You\'re the only nurse who understands me.','Can you be my nurse every shift?'],
  r:[{t:'"Yes, I\'ll ask to be your nurse every time."',g:0,f:'Warm, but not sustainable, and it makes the rest of the team seem less safe. Consistency across the whole team matters. <sup class="c" data-ref="NICE2009,Dickens2016" title="Source 118,379">118,379</sup>'},
     {t:'"That\'s not appropriate. You need to stop getting attached."',g:0,f:'Rejecting. It punishes the person for trusting someone, and negative attitudes are among the things people found harmful on wards. <sup class="c" data-ref="Stapleton2019" title="Source 502">502</sup>'},
     {t:'"I\'m glad our talks help. The whole team works from one plan, so I\'ll share what helps you with every nurse, and we\'ll keep it going together."',g:1,f:'Validates the relationship and holds the boundary by widening it to the team. Nurses ask for a coherent shared framework. <sup class="c" data-ref="Dickens2016,NICE2009" title="Source 118,379">118,379</sup>'}]},
 {who:'Before discharge',say:['If you send me home,','I can\'t promise I\'ll be safe.'],
  r:[{t:'"Thank you for telling me. Let\'s look at your safety plan together now: what would help tonight, and who you can contact. I\'ll make sure the team hears this."',g:1,f:'Takes it seriously, stays collaborative and uses the safety plan; the team then reviews the plan rather than a score. <sup class="c" data-ref="NICE2022SelfHarm,Stanley2018ED" title="Source 381,501">381,501</sup>'},
     {t:'"You\'re just saying that so you can stay."',g:0,f:'Invalidating and stigmatising. Statements about safety always deserve a caring, non-judgemental response. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>'},
     {t:'"Then you can stay as long as you like."',g:0,f:'Kind, but it drops the plan. NICE asks for admissions with an agreed purpose and length and a discharge plan made with the person. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>'}]},
 {who:'A community phone call',say:['I\'m furious with my therapist.','She\'s useless and I\'m never going back.'],
  r:[{t:'"You\'re right, she doesn\'t sound very good."',g:0,f:'Colludes with one side. It may feel validating, but it can push the person out of therapy that is likely to help.'},
     {t:'"You shouldn\'t talk about her like that."',g:0,f:'Corrects instead of understanding; NICE asks staff to understand the crisis from the person\'s point of view first. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>'},
     {t:'"You sound really angry and let down. What happened in the session? Strong feelings about therapy are worth bringing to her; that can be part of the work."',g:1,f:'Validates the emotion, explores with an open question and keeps the door to treatment open. Changes and endings in care can evoke strong emotions. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>'}]}
];
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');let focus='ed';
  const NU_S=NU_ED.map((d,i)=>({from:i/5,at:i/5+.08,k:d.k,t:d.t,txt:d.txt,pt:d.pt,hook:d.hook}));
  const tx=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const wrap=(s,n)=>{const w=s.split(' '),L=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){L.push(l);l=x}else l=(l+' '+x).trim()});if(l)L.push(l);return L};
  const esc=s=>s.replace(/&/g,'&amp;');
  function draw(t){const N=vb(svg,'720 380','400 600');const D=focus==='ed'?NU_ED:NU_WARD;
    const f=t*5,i=clamp(Math.floor(f),0,4),u=clamp(f-i);
    const T=N?{x0:36,x1:364,y:52}:{x0:70,x1:650,y:54};const X=k=>lerp(T.x0,T.x1,k/4);
    let s=`<line x1="${T.x0}" x2="${T.x1}" y1="${T.y}" y2="${T.y}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    /* walking position: stays at a station, moves to the next in the last part of the step */
    const mv=ease(ramp(u,.75,1)),pos=i<4?lerp(i,i+1,mv):4;
    s+=`<line x1="${T.x0}" x2="${f1(X(pos))}" y1="${T.y}" y2="${T.y}" style="stroke:var(--brand);stroke-width:4;stroke-linecap:round"/>`;
    D.forEach((d,k)=>{const on=k===i,dn=k<i;
      s+=`<circle cx="${f1(X(k))}" cy="${T.y}" r="${on?11:8}" style="fill:${on?'var(--brand)':dn?'var(--brand-soft)':'var(--panel)'};stroke:var(--brand);stroke-width:2"/>`+tx(X(k),T.y+4,k+1,'t-xs t-mid',on?'fill:var(--on-brand);font-weight:700':'fill:var(--ink)');
      if(N)s+=tx(X(k),T.y-18,d.sn,'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'');
      else{s+=tx(X(k),T.y-28,d.s[0],'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')+tx(X(k),T.y-16,d.s[1],'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')}});
    /* nurse and patient walk together; the bond strengthens over the pathway */
    const px=X(pos),fy=N?78:80,fs=N?40:46,ph=Math.sin(t*90)*(mv>0&&mv<1?2:0);
    const k=.25+.7*(pos/4);
    s+=bond(px-20,fy+fs*.42,px+20,fy+fs*.42,{k,curve:-10});
    s+=person(px-26,fy+ph,fs,'var(--other)')+person(px+26,fy-ph,fs,'var(--accent)');
    s+=tx(px-26,fy+fs+13,'patient','t-xs t-mid')+tx(px+26,fy+fs+13,'nurse','t-xs t-mid','fill:var(--accent)');
    /* three panels for the current station, fading in */
    const d=D[i],al=f1(.25+.75*ramp(u,0,.15));
    const P=[['NURSE\'S ACTIONS',d.a,'var(--accent)'],['EVIDENCE',d.e,'var(--dx)'],['COMMON PITFALL',d.p,'var(--bad)']];
    if(N){let y=164;P.forEach(([h,b,c])=>{const L=wrap(esc(b),46),hh=30+L.length*16;
        s+=`<g style="opacity:${al}"><rect x="12" y="${y}" width="376" height="${hh}" rx="10" style="fill:var(--field);stroke:${c};stroke-width:1.3"/>`+tx(24,y+19,h,'t-xs',`fill:${c};font-weight:700;letter-spacing:.08em`);
        L.forEach((l,j)=>{s+=tx(24,y+37+j*16,l,'t-sm','fill:var(--ink);font-size:12px')});s+='</g>';y+=hh+10});svg.setAttribute('viewBox','0 0 400 '+Math.max(420,Math.round(y+6)));}
    else{const cw=216,gap=12,x0=(720-3*cw-2*gap)/2,y0=158,ph2=196;
      P.forEach(([h,b,c],j)=>{const x=x0+j*(cw+gap),L=wrap(esc(b),29);
        s+=`<g style="opacity:${al}"><rect x="${f1(x)}" y="${y0}" width="${cw}" height="${ph2}" rx="10" style="fill:var(--field);stroke:${c};stroke-width:1.3"/>`+tx(x+12,y0+22,h,'t-xs',`fill:${c};font-weight:700;letter-spacing:.08em`);
        L.forEach((l,q)=>{s+=tx(x+12,y0+44+q*17,l,'t-sm','fill:var(--ink);font-size:11.5px')});s+='</g>'})}
    svg.innerHTML=s;
    const p=phaseOf(NU_S,t);setSt(p);
    $('#nuNote').innerHTML=noteHTML(NU_S[p]);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,30000,'Replay','nursing');
  const setSt=stepWire($('#nuSteps'),NU_S,rg,draw,stop);
  $$('[data-nufocus]').forEach(b=>b.addEventListener('click',()=>{focus=b.dataset.nufocus;$$('[data-nufocus]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const D=focus==='ed'?NU_ED:NU_WARD;D.forEach((d,i)=>Object.assign(NU_S[i],{k:d.k,t:d.t,txt:d.txt,pt:d.pt,hook:d.hook}));
    $$('[data-st] span',$('#nuSteps')).forEach((sp,i)=>{sp.textContent=NU_S[i].t});draw(+rg.value)}));
  draw(+rg.value);

  /* ---- replies simulator ---- */
  const ts=$('#nuTalk');let sc=0,pick=-1,stopT=null,ta=1;
  function drawT(){const N=vb(ts,'720 230','400 330');const S=NU_TALK[sc];let s='';
    const pX=N?40:60,pY=N?60:50;
    s+=person(pX,pY,54,'var(--other)')+tx(pX,pY+70,'patient','t-xs t-mid');
    const bw=N?300:420,bx=pX+40;
    s+=bubble(bx,pY-24,bw,52,{tx:pX+14,ty:pY+16,lines:S.say.map(x=>x.replace(/&/g,'&amp;')),col:'var(--other)'});
    s+=tx(N?388:700,N?16:18,S.who.toUpperCase(),'t-xs t-end','fill:var(--muted);letter-spacing:.08em');
    if(pick>=0){const R=S.r[pick],nX=N?360:660,nY=N?220:150,L=wrap(R.t.replace(/^"|"$/g,'').replace(/&/g,'&amp;'),N?44:58).slice(0,6),bh=24+L.length*15,bw2=N?318:440,bx2=N?12:nX-40-bw2;
      s+=`<g style="opacity:${f1(ta)}">`+person(nX,nY,54,'var(--accent)')+tx(nX,nY+70,'nurse','t-xs t-mid','fill:var(--accent)');
      s+=bubble(bx2,nY-bh+30,bw2,bh,{tx:nX-14,ty:nY+16,lines:L,col:R.g?'var(--good)':'var(--bad)'});
      s+=tx(bx2+6,nY-bh+22-8,R.g?'✓ validates and holds the boundary':'✗ misses something','t-xs',`fill:${R.g?'var(--good)':'var(--bad)'};font-weight:700`)+'</g>'}
    else s+=tx(N?200:420,N?210:160,'Choose a reply below','t-sm t-mid');
    ts.innerHTML=s}
  function note(){const S=NU_TALK[sc];
    if(pick<0){$('#nuTalkNote').innerHTML=noteHTML({k:S.who,t:'What would you say?',txt:'Read what the person says, then choose one of the three replies. Look for a reply that shows the feeling makes sense and keeps the care plan and the team in place.',pt:'Validating is not the same as agreeing. You can understand a feeling and still hold a limit.',hook:'NICE CG78 in crisis: calm, non-threatening attitude; empathic open questions; validating statements; do not minimise; no solutions before the problem is clear. <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>'});return}
    const R=S.r[pick];$('#nuTalkNote').innerHTML=`<div class="verdict ${R.g?'yes':'no'}">${R.g?'A good reply':'Try another reply'}</div>`+noteHTML({k:S.who,t:R.g?'Validates and holds the boundary':'Why this one misses',txt:R.f,pt:R.g?'Name the feeling, stay with the person, and keep the plan and the team in the picture.':'Notice whether a reply dismisses, rejects, minimises, colludes or drops the plan.'})}
  function reps(){const S=NU_TALK[sc];$('#nuReps').innerHTML=S.r.map((r,i)=>`<button class="btn" data-nurep="${i}" aria-pressed="${i===pick}"><b>${'ABC'[i]}</b>${r.t.replace(/&/g,'&amp;')}</button>`).join('')}
  $('#nuReps').addEventListener('click',e=>{const b=e.target.closest('[data-nurep]');if(!b)return;pick=+b.dataset.nurep;$$('[data-nurep]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopT)stopT();ta=.3;stopT=animate(350,p=>{ta=.3+.7*p;drawT()},()=>{stopT=null});note()});
  $$('[data-nusc]').forEach(b=>b.addEventListener('click',()=>{sc=+b.dataset.nusc;pick=-1;$$('[data-nusc]').forEach(x=>x.setAttribute('aria-pressed',x===b));reps();drawT();note()}));
  reps();drawT();note();

  /* ---- bars ---- */
  const bs=$('#nuBars');let gb=1,stopB=null;
  function drawB(){const N=vb(bs,'720 270','400 470');let s='';
    const A=N?{x:20,y:28,w:360,h:180}:{x:24,y:28,w:320,h:200},B=N?{x:20,y:290,w:360,h:200}:{x:384,y:28,w:316,h:200};
    s+=tx(A.x,A.y,'WHAT TRAINING CHANGES','t-xs','fill:var(--brand);font-weight:700;letter-spacing:.08em')+tx(A.x,A.y+14,'review of 8 studies · relative size, not measured','t-xs');
    [['Knowledge',.92,'largest'],['Cognitive attitudes',.8,'large'],['Feelings',.42,'smaller']].forEach(([l,v,w],k)=>{const y=A.y+40+k*48,bw=(A.w-10)*v*ease(gb);
      s+=tx(A.x,y,l,'t-sm','fill:var(--ink)')+`<rect x="${A.x}" y="${y+8}" width="${f1(A.w-10)}" height="16" rx="5" style="fill:var(--panel-2)"/><rect x="${A.x}" y="${y+8}" width="${f1(bw)}" height="16" rx="5" style="fill:var(--brand);opacity:${k===2?.55:.9}"/>`+(gb>.6?tx(A.x+bw-6,y+20,w,'t-xs t-end','fill:var(--on-brand);font-weight:700'):'')});
    s+=tx(A.x,A.y+40+3*48-6,'Biggest gains: staff with the poorest attitudes','t-xs');
    s+=tx(B.x,B.y,'SAFEWARDS · 31 WARDS · CLUSTER RCT','t-xs','fill:var(--accent);font-weight:700;letter-spacing:.08em')+tx(B.x,B.y+14,'reduction in events · 95% CI','t-xs');
    const sc=v=>B.x+(B.w-40)*v/40;
    [0,10,20,30,40].forEach(v=>{s+=`<line x1="${f1(sc(v))}" x2="${f1(sc(v))}" y1="${B.y+30}" y2="${B.y+150}" class="grid"/>`+tx(sc(v),B.y+166,v+'%','t-xs t-mid')});
    [['Conflict',15,5.7,23.7],['Containment',23.2,9.9,35.5]].forEach(([l,v,lo,hi],k)=>{const y=B.y+48+k*52,e=ease(gb);
      s+=tx(B.x,y,l,'t-sm','fill:var(--ink)')+`<rect x="${f1(sc(0))}" y="${y+8}" width="${f1(sc(v*e)-sc(0))}" height="18" rx="4" style="fill:var(--accent)"/>`;
      if(gb>.8)s+=`<path d="M${f1(sc(lo))} ${y+17}H${f1(sc(hi))}M${f1(sc(lo))} ${y+11}v12M${f1(sc(hi))} ${y+11}v12" style="stroke:var(--ink);stroke-width:1.4;fill:none"/>`+tx(sc(hi)+6,y+21,'−'+v+'%','t-sm','fill:var(--ink);font-weight:700')});
    bs.innerHTML=s}
  function runB(){if(stopB)stopB();gb=0;stopB=animate(900,p=>{gb=p;drawB()},()=>{stopB=null})}
  $('#nuBarsGo').addEventListener('click',runB);
  drawB();
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawB();drawT()};
  const prevH=onHide.nursing;onHide.nursing=()=>{prevH&&prevH();if(stopB){stopB();stopB=null;gb=1}if(stopT){stopT();stopT=null;ta=1}};
};
/* =============== 6.1 History & people =============== */
const HI_Y0=1935,HI_Y1=2026,hiT=y=>(y-HI_Y0)/(HI_Y1-HI_Y0),hiY=t=>lerp(HI_Y0,HI_Y1,t);
/* milestones: y year, who, n number of people in the silhouette (0 = an institution), idea,
   d short description for the card (no citations: it is drawn in SVG), c the cited note line, k kind */
const HI_MS=[
 {y:1938,who:'Adolph Stern',n:1,idea:'The "border line group"',d:'Patients between neurosis and psychosis',k:'idea',c:`Stern described the "border line group of neuroses" in the Psychoanalytic Quarterly. <sup class="c" data-ref="Stern1938" title="Source 508">508</sup>`},
 {y:1953,who:'Robert Knight',n:1,idea:'"Borderline states"',d:'The label enters wider psychoanalytic use',k:'idea',c:`Knight published "Borderline states"; he and Stern are named as most responsible for introducing the label. <sup class="c" data-ref="Knight1953,Gunderson2009Ontogeny" title="Source 203,273">203,273</sup>`},
 {y:1967,who:'Otto Kernberg',n:1,idea:'Borderline personality organisation',d:'Splitting, identity diffusion, lapses in reality testing',k:'idea',c:`Kernberg defined "borderline personality organization", a middle level of personality organisation marked by primitive defences (splitting, projective identification), identity diffusion and lapses in reality testing. <sup class="c" data-ref="Kernberg1967,Gunderson2009Ontogeny" title="Source 203,259">203,259</sup>`},
 {y:1968,who:'Grinker and colleagues',n:3,idea:'"The Borderline Syndrome"',d:'An early empirical study of the syndrome',k:'dx',c:`Grinker and colleagues published the empirical study "The Borderline Syndrome". <sup class="c" data-ref="Gunderson2009Ontogeny" title="Source 203">203</sup>`},
 {y:1975,who:'Gunderson & Singer',n:2,idea:'Six descriptive features',d:'Diagnosis at a first interview',k:'dx',c:`Gunderson and Singer reviewed the descriptive literature and proposed six features, among them intense affect, impulsive behaviour and brief psychotic experiences. <sup class="c" data-ref="Gunderson1975" title="Source 197">197</sup> In 1978 seven criteria separated borderline patients from schizophrenic and neurotic-depressed groups with high accuracy. <sup class="c" data-ref="Gunderson1978" title="Source 198">198</sup>`},
 {y:1979,who:'Spitzer, Endicott & Gibbon',n:3,idea:'Borderline split from schizotypal',d:'Criteria built from 808 vs 808 patients',k:'dx',c:`Spitzer, Endicott and Gibbon built two criteria sets from data on 808 borderline and 808 control patients; they became DSM-III borderline and schizotypal personality disorder. <sup class="c" data-ref="Spitzer1979" title="Source 496">496</sup>`},
 {y:1980,who:'American Psychiatric Association',n:0,idea:'BPD enters DSM-III',d:'A defined diagnosis, little changed to DSM-5',k:'dx',c:`BPD was introduced in DSM-III; from DSM-III to DSM-5 its defining criteria saw no major changes. <sup class="c" data-ref="Leichsenring2024WP" title="Source 300">300</sup> Fewer than 15 research reports on BPD appeared before 1980, and more than 275 in 1980–1990. <sup class="c" data-ref="Gunderson2009Ontogeny" title="Source 203">203</sup>`},
 {y:1981,who:'Gunderson and colleagues',n:2,idea:'A structured interview (DIB)',d:'Five areas of functioning; revised as DIB-R',k:'dx',c:`The Diagnostic Interview for Borderline Patients, a semi-structured interview covering five areas of functioning, was published; a revised version (DIB-R) followed. <sup class="c" data-ref="Gunderson1981,Zanarini1990DIBR" title="Source 199,567">199,567</sup>`},
 {y:1991,who:'Marsha Linehan',n:1,idea:'First DBT trial',d:'Less self-harm, fewer inpatient days',k:'tx',c:`Linehan and colleagues published the first randomised trial of dialectical behaviour therapy: compared with usual treatment over 1 year, DBT reduced self-harm acts and their medical severity, kept more people in therapy and cut inpatient days. <sup class="c" data-ref="Linehan1991" title="Source 309">309</sup>`},
 {y:1992,who:'World Health Organization',n:0,idea:'ICD-10: emotionally unstable PD',d:'F60.31, borderline type',k:'dx',c:`ICD-10 code F60.31, emotionally unstable personality disorder, borderline type, is the code used in Danish national register studies of BPD. <sup class="c" data-ref="Kjaer2020" title="Source 264">264</sup>`},
 {y:1993,who:'Mary Zanarini',n:1,idea:'The McLean study begins',d:'290 inpatients followed every 2 years',k:'course',c:`From 1992 to 1995 the McLean Study of Adult Development recruited 290 inpatients with BPD and 72 comparison subjects: the first NIMH-funded prospective study of the course of BPD. <sup class="c" data-ref="Temes2019,Zanarini2005MSAD" title="Source 523,580">523,580</sup>`},
 {y:1999,who:'Bateman & Fonagy',n:2,idea:'Forerunner of MBT',d:'Partial hospitalisation trial, 38 patients',k:'tx',c:`Bateman and Fonagy's trial of psychoanalytically oriented partial hospitalisation (38 patients, up to 18 months) cut suicidal acts, self-harm and inpatient days compared with standard care. <sup class="c" data-ref="Bateman1999" title="Source 34">34</sup>`},
 {y:2000,who:'Gunderson and colleagues',n:3,idea:'The CLPS study begins',d:'668 adults, 175 with BPD, four US sites',k:'course',c:`The Collaborative Longitudinal Personality Disorders Study enrolled 668 treatment-seeking adults, 175 with BPD. <sup class="c" data-ref="Gunderson2000CLPS" title="Source 201">201</sup>`},
 {y:2003,who:'Zanarini and colleagues',n:3,idea:'The recovery era',d:'68.6% remitted by 6 years',k:'course',c:`MSAD reported remission in 34.5% at 2 years, 49.4% at 4 and 68.6% at 6, with only 5.9% recurrence among remitters; these findings began the "recovery era". <sup class="c" data-ref="Zanarini2003Course" title="Source 574">574</sup>`},
 {y:2009,who:'NICE',n:0,idea:'A first national guideline',d:'"The first comprehensive view"',k:'tx',c:`NICE issued its first national guideline on BPD, described as taking "the first comprehensive view of the disorder". <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>`},
 {y:2010,who:'Zanarini and colleagues',n:3,idea:'93% remission, 50% recovery',d:'10 years of follow-up',k:'course',c:`By 10 years, 93% had a 2-year remission and 50% had recovered; at 16 years remission reached 78–99% and recovery 40–60%, depending on the definition. <sup class="c" data-ref="Zanarini2010Recovery,Zanarini2012" title="Source 588,592">588,592</sup> CLPS reported 85% remission and 12% relapse over 10 years in 2011. <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup>`},
 {y:2013,who:'American Psychiatric Association',n:0,idea:'DSM-5 and the AMPD',d:'Categories kept; a dimensional model added',k:'dx',c:`DSM-5 kept the categorical criteria and added the Section III Alternative Model for Personality Disorders, describing types by impairments in personality functioning plus pathological traits. <sup class="c" data-ref="APA2013,Skodol2011" title="Source 10,488">10,488</sup>`},
 {y:2022,who:'World Health Organization',n:0,idea:'ICD-11: severity first',d:'Optional "borderline pattern"',k:'dx',c:`ICD-11 replaced personality-disorder categories with one severity spectrum plus up to five trait domains, "the most radical change in the classification history of personality disorders", and after lengthy debate added an optional borderline pattern descriptor. <sup class="c" data-ref="Tyrer2019" title="Source 540">540</sup> DSM-5-TR, also 2022, keeps the category. <sup class="c" data-ref="APA2022" title="Source 11">11</sup>`},
 {y:2024,who:'American Psychiatric Association',n:0,idea:'A new practice guideline',d:'Treatment of patients with BPD',k:'tx',c:`The APA published a new practice guideline for the treatment of patients with BPD. <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup> Psychological or psychosocial treatment is the primary recommended treatment, with medication only as an adjunct. <sup class="c" data-ref="Bateman2015Lancet,Bohus2021" title="Source 39,66">39,66</sup>`}];
const HI_STIG=[[1988,'label alone biases judgement'],[2003,'BPD label, less sympathy'],[2008,'US awareness month vote'],[2009,'NIMH: <2% of SZ funding'],[2011,'half of clinicians avoid'],[2024,'connecting language helps']];
const HI_OUT=[[1935,1980,'a psychoanalytic "colloquialism"','var(--storm)','"colloquialism"'],[1980,1991,'a defined diagnosis','var(--dx)','diagnosis'],[1991,2003,'treatable','var(--rx)','treatable'],[2003,2026,'treatable, recovery common','var(--accent)','recovery common']];
const HI_STEPS=[
 {from:0,at:hiT(1953),k:'1938–1967',t:'Psychoanalytic roots',
  txt:`"Borderline" began as a psychoanalytic word for patients who seemed to sit between neurosis and psychosis. Until the 1970s it remained a rarely and inconsistently used "colloquialism within the psychoanalytic fraternity", with schizophrenia as its main reference point. <sup class="c" data-ref="Gunderson2009Ontogeny,Stern1938" title="Source 203,508">203,508</sup>`,
  pt:`At first, "borderline" was a vague word doctors used for people they found hard to place.`,
  hook:`Stern 1938 "border line group" → Knight 1953 "Borderline states" → Kernberg 1967 borderline personality organisation. <sup class="c" data-ref="Gunderson2009Ontogeny" title="Source 203">203</sup>`},
 {from:hiT(1968),at:hiT(1975),k:'1968–1979',t:'Describing the syndrome',
  txt:`Researchers began to describe borderline patients by what could be observed. Gunderson and Singer's features and the Spitzer criteria study turned an idea into criteria that could be tested, and separated "borderline personality" from "borderline schizophrenia" (schizotypal personality disorder). <sup class="c" data-ref="Gunderson1975,Spitzer1979" title="Source 197,496">197,496</sup>`,
  pt:`Doctors started writing down the signs they could actually see, so they could agree on who had the condition.`,
  hook:`Spitzer 1979 (808 vs 808) split borderline from schizotypal, the basis of DSM-III. <sup class="c" data-ref="Spitzer1979" title="Source 496">496</sup>`},
 {from:hiT(1980),at:hiT(1980.5),k:'1980',t:'DSM-III: a diagnosis',
  txt:`DSM-III made BPD an official diagnosis. Research took off: fewer than 15 reports before 1980, more than 275 in the following decade. <sup class="c" data-ref="Leichsenring2024WP,Gunderson2009Ontogeny" title="Source 203,300">203,300</sup>`,
  pt:`Once there were clear rules for the diagnosis, research on BPD grew very quickly.`,
  hook:`BPD entered DSM-III in 1980; its criteria changed little through DSM-5. <sup class="c" data-ref="Leichsenring2024WP" title="Source 300">300</sup>`},
 {from:hiT(1986),at:hiT(1991.5),k:'1988–1999',t:'Treatments that work',
  txt:`The first randomised trials showed that specific psychotherapies help: DBT in 1991 and Bateman and Fonagy's partial hospitalisation programme in 1999. The concept moved from "untreatable neurotics" toward a treatable condition. <sup class="c" data-ref="Linehan1991,Bateman1999,Gunderson2009Ontogeny" title="Source 34,203,309">34,203,309</sup> In the same era, a 1988 study showed the personality-disorder label itself worked as "an enduring pejorative judgement rather than a clinical diagnosis". <sup class="c" data-ref="Lewis1988" title="Source 303">303</sup>`,
  pt:`In the 1990s, trials showed that particular talking therapies really help people with BPD.`,
  hook:`First DBT RCT: Linehan 1991. MBT's forerunner: Bateman & Fonagy 1999. <sup class="c" data-ref="Linehan1991,Bateman1999" title="Source 34,309">34,309</sup>`},
 {from:hiT(2000),at:hiT(2003.5),k:'2000–2012',t:'The recovery era',
  txt:`Long-term studies changed the outlook. MSAD and CLPS found that most people remit and few relapse, although social and work functioning lag. <sup class="c" data-ref="Zanarini2003Course,Gunderson2011" title="Source 204,574">204,574</sup> BPD awareness grew too: in 2008 the US House of Representatives unanimously passed a resolution supporting a BPD awareness month, while NIMH funding for BPD (about $6 million a year) was under 2% of that for schizophrenia. <sup class="c" data-ref="Gunderson2009Ontogeny" title="Source 203">203</sup>`,
  pt:`Following people for many years showed that most get much better. BPD "was previously regarded as untreatable"; that view has changed. <sup class="c" data-ref="Bohus2021" title="Source 66">66</sup>`,
  hook:`MSAD 10 years: 93% remission, 50% recovery; CLPS 10 years: 85% remission, 12% relapse. <sup class="c" data-ref="Zanarini2010Recovery,Gunderson2011" title="Source 204,588">204,588</sup>`},
 {from:hiT(2012),at:hiT(2022.5),k:'2013–2024',t:'Dimensions and guidelines',
  txt:`Classification turned toward dimensions: DSM-5's alternative model, then ICD-11's severity-first system with an optional borderline pattern. Clinician attitudes are still a problem (nearly half of 706 clinicians preferred to avoid patients with BPD), and co-produced research now asks people with BPD which words help. <sup class="c" data-ref="Tyrer2019,APA2013,Black2011Attitudes,vanSchie2024" title="Source 10,56,540,543">10,56,540,543</sup>`,
  pt:`Today BPD is seen as treatable and is described by how severe it is as well as by its pattern. The words used about it are changing too.`,
  hook:`ICD-11 (2022): severity + up to five trait domains + optional borderline pattern; ICD-10 used F60.31. <sup class="c" data-ref="Tyrer2019,Kjaer2020" title="Source 264,540">264,540</sup>`}];
const HI_PAIRS=[['Stern','Named a "border line group" of neuroses'],['Knight','Wrote "Borderline states"'],['Kernberg','Borderline personality organisation: splitting and identity diffusion'],['Gunderson & Singer','Six features for diagnosis at a first interview'],['Spitzer','Criteria sets that split borderline from schizotypal'],['Linehan','The first randomised trial of DBT'],['Bateman & Fonagy','A partial hospitalisation trial, forerunner of MBT'],['Zanarini','A long-term study showing remission is common']];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');let view='people',setSt=()=>{};
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const KC={idea:'var(--storm)',dx:'var(--dx)',tx:'var(--rx)',course:'var(--accent)'};
  /* an institution glyph: a small building */
  const inst=(x,y,s,col)=>`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s/40)})"><path d="M-20 0L0 -12L20 0Z" style="fill:${col}"/><rect x="-18" y="2" width="36" height="4" style="fill:${col}"/>${[-13,-4.5,4.5,13].map(c=>`<rect x="${c-2}" y="7" width="4" height="18" style="fill:${col}"/>`).join('')}<rect x="-20" y="26" width="40" height="5" style="fill:${col}"/></g>`;
  const people=(x,y,n,s,col)=>n===0?inst(x,y+s*.05,s*1.05,col):[...Array(n)].map((_,i)=>person(x+(i-(n-1)/2)*s*.62,y+(n>1&&i%2?s*.08:0),s*(n>1?.86:1),col)).join('');
  const wrap=(str,max)=>{const w=str.split(' '),L=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>max){L.push(l.trim());l=x}else l+=' '+x});if(l.trim())L.push(l.trim());return L};
  function draw(t){const N=vb(svg,'720 420','400 640');const Y=hiY(t),ph=phaseOf(HI_STEPS,t);setSt(ph);
    let cur=-1;HI_MS.forEach((m,i)=>{if(m.y<=Y+.01)cur=i});
    let s=T(N?20:22,28,'From "border line" to recovery','t-big')+T(N?20:22,46,`year ${Math.floor(Y)} · ${view==='people'?'who':'what'} changed the picture`,'t-sm');
    /* card for the current milestone */
    const K=N?{x:20,y:62,w:360,h:178}:{x:22,y:60,w:676,h:150};
    if(cur>=0){const m=HI_MS[cur],col=KC[m.k],pop=ease(ramp(Y,m.y,m.y+1.2)),pp=view==='people';
      s+=`<g style="opacity:${f1(.6+.4*pop)}"><rect x="${K.x}" y="${f1(K.y+6*(1-pop))}" width="${K.w}" height="${K.h}" rx="14" style="fill:var(--panel-2);stroke:${col};stroke-width:1.6"/>`;
      const ix=K.x+(N?60:76),iy=K.y+(N?28:30)+6*(1-pop),isz=N?54:64;
      s+=`<circle cx="${f1(ix)}" cy="${f1(iy+isz*.5)}" r="${f1(isz*.62)}" style="fill:var(--panel);stroke:${col};stroke-width:1.2"/>`;
      s+=pp?people(ix,iy+isz*.1,m.n,isz*.78,col):`<g transform="translate(${f1(ix)} ${f1(iy+isz*.5)})"><path d="M-20 -16H-2Q0 -16 0 -13V18Q-2 15 -6 15H-20Z M20 -16H2Q0 -16 0 -13V18Q2 15 6 15H20Z" style="fill:none;stroke:${col};stroke-width:2.4;stroke-linejoin:round"/>${[-8,-2,4].map(d=>`<line x1="-15" x2="-5" y1="${d}" y2="${d}" style="stroke:${col};stroke-width:1.4"/><line x1="5" x2="15" y1="${d}" y2="${d}" style="stroke:${col};stroke-width:1.4"/>`).join('')}</g>`;
      const tx=K.x+(N?130:160),ty=K.y+(N?34:40)+6*(1-pop),mx=N?24:52;
      s+=T(tx,ty-12,String(m.y===1993?'1992–1995':m.y),'t-sm',`fill:${col};font-weight:600`);
      const head=wrap(pp?m.who:m.idea,N?22:44);head.forEach((l,i)=>{s+=T(tx,ty+8+i*20,l,'t-big','font-size:17px')});
      const sub=wrap(pp?m.idea:m.who,mx),dd=wrap(m.d,mx),by=ty+8+head.length*20+4;
      sub.forEach((l,i)=>{s+=T(tx,by+i*15,l,'t-sm','fill:var(--ink)')});
      dd.forEach((l,i)=>{s+=T(tx,by+sub.length*15+4+i*14,l,'t-xs')});
      s+='</g>'}
    else s+=T(K.x+K.w/2,K.y+K.h/2,'Press Play: the story starts in 1938','t-sm t-mid');
    /* timeline */
    const A=N?{x:28,y:300,w:344}:{x:30,y:262,w:660};
    const tl=tline(A.x,A.y,A.w,{min:1940,max:2020,step:N?20:10,fmt:v=>v,label:''});
    const X=y=>A.x+A.w*(y-HI_Y0)/(HI_Y1-HI_Y0);
    s+=`<line x1="${f1(A.x)}" x2="${f1(A.x+A.w)}" y1="${A.y}" y2="${A.y}" class="axis"/>`;
    for(let v=1940;v<=2020;v+=N?20:10)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${A.y-3}" y2="${A.y+3}" class="axis"/>`+T(X(v),A.y+15,v,'t-xs t-mid');
    s+=`<rect x="${f1(A.x)}" y="${A.y-2}" width="${f1(Math.max(0,X(Y)-A.x))}" height="4" rx="2" style="fill:var(--brand);opacity:.5"/>`;
    HI_MS.forEach((m,i)=>{const on=m.y<=Y,x=X(m.y),lift=(i%3)*(N?7:8),col=KC[m.k];
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${A.y-6}" y2="${A.y-14-lift}" style="stroke:${on?col:'var(--line)'};stroke-width:1.2"/><circle cx="${f1(x)}" cy="${f1(A.y-17-lift)}" r="${i===cur?6:4}" style="fill:${on?col:'var(--panel)'};stroke:${on?col:'var(--line)'};stroke-width:1.5"/>`});
    if(cur>=0){const x=X(HI_MS[cur].y);s+=`<path d="M${f1(x)} ${f1(K.y+K.h)}L${f1(x)} ${A.y-40}" style="stroke:${KC[HI_MS[cur].k]};stroke-width:1;stroke-dasharray:3 3;opacity:.7"/>`}
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${A.y-48}" y2="${A.y+6}" style="stroke:var(--ink);stroke-width:1.4;opacity:.5"/>`;
    const lg=[['idea','ideas'],['dx','diagnosis'],['tx','treatment'],['course','long-term course']];
    lg.forEach(([k,l],i)=>{const lx=A.x+i*(N?86:110);s+=`<circle cx="${lx+4}" cy="${A.y+32}" r="4" style="fill:${KC[k]}"/>`+T(lx+12,A.y+35,l,'t-xs')});
    /* outlook band */
    const O=N?{y:358,h:24}:{y:316,h:22};
    s+=T(A.x,O.y-6,'THE OUTLOOK','t-sm','fill:var(--ink);font-weight:600');
    HI_OUT.forEach(([a,b,l,c,sl],i)=>{const x0=X(a),x1=X(b),vis=clamp((Y-a)/(b-a)),w=(x1-x0)*vis;if(vis<=0)return;
      s+=`<rect x="${f1(x0)}" y="${O.y}" width="${f1(w)}" height="${O.h}" style="fill:${c};opacity:.85"/>`;
      const lab=N||i===1?sl:l;if(!N||i===0||i===3)s+=T(x0+5,O.y+O.h/2+4,lab,'t-xs',`fill:#fff;font-weight:600;opacity:${f1(ramp(vis,.7,.95))}`)});
    if(N){const cur2=HI_OUT.filter(o=>o[0]<=Y).pop();s+=T(A.x,O.y+O.h+14,'now: '+cur2[2],'t-xs','fill:var(--ink)')}
    else s+=T(A.x+A.w,O.y-6,`from "untreatable neurotics" to treatable, with recovery common`,'t-xs t-end');
    /* stigma milestones */
    const Sg=N?{y:420}:{y:362};
    s+=T(A.x,Sg.y,'STIGMA AND AWARENESS','t-sm','fill:var(--ink);font-weight:600');
    HI_STIG.forEach(([y,l],i)=>{if(y>Y)return;const o=ramp(Y,y,y+1.5);
      if(N){const yy=Sg.y+18+i*17;s+=`<path d="M${A.x+4} ${yy-8}l4 4l-4 4l-4 -4z" style="fill:var(--storm);opacity:${f1(o)}"/>`+T(A.x+14,yy,`${y} · ${l}`,'t-xs',`opacity:${f1(o)};fill:var(--ink)`)}
      else{const lx=A.x+Math.floor(i/2)*226,yy=Sg.y+20+(i%2)*16;s+=`<path d="M${lx+4} ${yy-8}l4 4l-4 4l-4 -4z" style="fill:var(--storm);opacity:${f1(o)}"/>`+T(lx+14,yy,`${y} · ${l}`,'t-xs',`opacity:${f1(o)};fill:var(--ink)`);
        s+=`<path d="M${f1(X(y))} ${O.y+O.h+2}l3 4l-3 4l-3 -4z" style="fill:var(--storm);opacity:${f1(o)}"/>`}});
    svg.innerHTML=s;
    const st=HI_STEPS[ph];
    $('#hiNote').innerHTML=noteHTML(st)+(cur>=0?`<div class="kv"><div><dt>${HI_MS[cur].y===1993?'1992–1995':HI_MS[cur].y} · ${HI_MS[cur].who}</dt><dd>${HI_MS[cur].c}</dd></div></div>`:'');
    $('#hiRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>milestones passed <b>${cur+1}</b> of ${HI_MS.length}</span>`}
  const stop=playWire(rg,$('#hiPlay'),draw,30000,'Replay','history');
  setSt=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  $$('[data-hiv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.hiv;$$('[data-hiv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* portraits: silhouettes, no photos */
  const PC=['var(--storm)','var(--storm)','var(--storm)','var(--dx)','var(--rx)','var(--rx)','var(--accent)'];
  for(let i=0;i<7;i++){const el=$('#hiPor'+i);if(!el)continue;const two=i===5;
    el.innerHTML=`<circle cx="32" cy="32" r="30" style="fill:var(--panel-2);stroke:${PC[i]};stroke-width:1.5"/>`+(two?person(24,14,36,PC[i])+person(41,16,34,PC[i],{op:.75}):person(32,12,42,PC[i]))}

  /* match the person to the idea */
  const nm=$('#hiNames'),cc=$('#hiConcepts'),msg=$('#hiMsg');let sel=null,done=new Set();
  const order=[3,6,0,5,2,7,1,4];
  function score(){$('#hiScore').innerHTML=`Matched <b>${done.size}</b> of ${HI_PAIRS.length}`}
  function build(){sel=null;done=new Set();
    nm.innerHTML=HI_PAIRS.map((p,i)=>`<button class="btn" draggable="true" data-hin="${i}" aria-pressed="false">${p[0]}</button>`).join('');
    cc.innerHTML=order.map(i=>`<button data-hic="${i}"><span>${HI_PAIRS[i][1]}</span></button>`).join('');
    msg.textContent='';score()}
  function tryMatch(n,c,btn){if(n==null||done.has(n))return;
    if(n===c){done.add(n);btn.classList.add('ok');btn.insertAdjacentHTML('afterbegin',`<b>${HI_PAIRS[n][0]}</b>`);const nb=$(`[data-hin="${n}"]`,nm);nb.disabled=true;nb.setAttribute('aria-pressed','false');nb.draggable=false;
      msg.textContent=done.size===HI_PAIRS.length?'All matched. The full story is in the timeline above.':`Right: ${HI_PAIRS[n][0]}.`}
    else{btn.classList.remove('no');void btn.offsetWidth;btn.classList.add('no');msg.textContent=`Not ${HI_PAIRS[n][0]}: try another idea.`}
    sel=null;$$('[data-hin]',nm).forEach(b=>b.setAttribute('aria-pressed','false'));score()}
  nm.addEventListener('click',e=>{const b=e.target.closest('[data-hin]');if(!b||b.disabled)return;const i=+b.dataset.hin;sel=sel===i?null:i;$$('[data-hin]',nm).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.hin===sel));msg.textContent=sel==null?'':`${HI_PAIRS[i][0]} selected: now choose an idea.`});
  nm.addEventListener('dragstart',e=>{const b=e.target.closest('[data-hin]');if(!b)return;e.dataTransfer.setData('text/plain',b.dataset.hin);e.dataTransfer.effectAllowed='move'});
  cc.addEventListener('click',e=>{const b=e.target.closest('[data-hic]');if(!b||b.classList.contains('ok'))return;if(sel==null){msg.textContent='Choose a name first.';return}tryMatch(sel,+b.dataset.hic,b)});
  cc.addEventListener('dragover',e=>{const b=e.target.closest('[data-hic]');if(!b||b.classList.contains('ok'))return;e.preventDefault();b.classList.add('over')});
  cc.addEventListener('dragleave',e=>{const b=e.target.closest('[data-hic]');if(b)b.classList.remove('over')});
  cc.addEventListener('drop',e=>{const b=e.target.closest('[data-hic]');if(!b)return;e.preventDefault();b.classList.remove('over');const n=e.dataTransfer.getData('text/plain');if(n!=='')tryMatch(+n,+b.dataset.hic,b)});
  $('#hiReset').addEventListener('click',build);
  build();
};
/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · Understanding BPD",2:"Part 2 · Diagnosis",3:"Part 3 · Psychotherapies",4:"Part 4 · Medication, safety & research",5:"Part 5 · Course & living",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding BPD ---- */
 [1,`How common is BPD in the general population?`,`Roughly 1–3% of adults; the median point prevalence across studies is about 1% <sup class="c" data-ref="Ellison2018,Tomko2014" title="Source 144,528">144,528</sup>.`],
 [1,`How common is BPD in psychiatric services?`,`About 10–12% of psychiatric outpatients and about 20–22% of psychiatric inpatients <sup class="c" data-ref="Ellison2018" title="Source 144">144</sup>.`],
 [1,`Why are clinical samples about 75% female?`,`Mainly sampling (referral) bias: community samples show near-equal rates in men and women <sup class="c" data-ref="Skodol2003,Grant2008" title="Source 184,486">184,486</sup>.`],
 [1,`When does BPD usually begin?`,`In adolescence, after about age 12. It can be diagnosed from about age 11 and affects about 3% of adolescents in the community <sup class="c" data-ref="Bohus2021,Guile2018" title="Source 66,195">66,195</sup>.`],
 [1,`What are the three parts of emotional vulnerability in Linehan's model?`,`High sensitivity, high intensity (reactivity) and a slow return to baseline <sup class="c" data-ref="Crowell2009,Kuo2009" title="Source 112,289">112,289</sup>.`],
 [1,`What does daily-life (EMA) mood data typically show in BPD?`,`Sudden large drops from positive mood: 48% of drops from a very positive mood reached negative mood, against 9% in controls <sup class="c" data-ref="EbnerPriemer2007PsycholMed" title="Source 139">139</sup>.`],
 [1,`Is affective instability specific to BPD?`,`No. It is also heightened in PTSD and bulimia nervosa, so it is transdiagnostic <sup class="c" data-ref="Santangelo2014" title="Source 455">455</sup>. Self-esteem instability may be more BPD-specific <sup class="c" data-ref="Kockler2022" title="Source 274">274</sup>.`],
 [1,`In the lab, is the body's stress response much bigger in BPD?`,`Physiological hyperreactivity is null to small in meta-analysis; the big difference is how negatively stimuli are rated <sup class="c" data-ref="Bortolla2020" title="Source 73">73</sup>. Baseline negative emotion is high and resting RSA low <sup class="c" data-ref="Kuo2009" title="Source 289">289</sup>.`],
 [1,`How strongly is rejection sensitivity linked to BPD?`,`Pooled r = 0.326, and r = 0.655 for clinical vs control comparisons <sup class="c" data-ref="Foxhall2019" title="Source 168">168</sup>. In the Cyberball game, people with BPD feel excluded even when included <sup class="c" data-ref="Renneberg2012,Staebler2011PsycholMed" title="Source 430,498">430,498</sup>.`],
 [1,`Why does self-injury so often become a habit?`,`Its most common function is short-lived relief from intense negative emotion. Daily-life data show the negative emotion rising again over the following hours <sup class="c" data-ref="Klonsky2007,Houben2017" title="Source 232,271">232,271</sup>.`],
 [1,`What heritability did the two classic twin studies of BPD report?`,`About .69 in Torgersen 2000 (interview, 221 pairs) and 42% in Distel 2008 (self-report, 5,496 twins, three countries) <sup class="c" data-ref="Torgersen2000,Distel2008" title="Source 124,530">124,530</sup>.`],
 [1,`Which environment matters more in twin studies: shared or unique?`,`Unique (non-shared) environment explains most of the non-genetic variance, not the family environment siblings share <sup class="c" data-ref="Distel2008,Skoglund2021" title="Source 124,489">124,489</sup>.`],
 [1,`What did the largest BPD GWAS find?`,`Streit 2026: 12,339 cases and 11 loci. SNP heritability is about 17%, and polygenic scores explain 4.6% of the variance, too little to predict for an individual <sup class="c" data-ref="Streit2026" title="Source 517">517</sup>.`],
 [1,`How strong is the link between childhood adversity and BPD?`,`OR 13.91 against non-clinical controls, with the largest effects for emotional abuse and neglect <sup class="c" data-ref="Porter2020" title="Source 416">416</sup>. Most children who are hurt do not develop BPD <sup class="c" data-ref="Porter2020,Zanarini1997" title="Source 416,568">416,568</sup>.`],
 [1,`Is childhood sexual abuse necessary for BPD?`,`No: it is "neither necessary nor sufficient". Caretaker neglect is a key risk factor <sup class="c" data-ref="Zanarini1997" title="Source 568">568</sup>.`],
 [1,`What does the biosocial model say?`,`BPD grows from emotional vulnerability interacting over time with an invalidating environment, one that is intolerant of a child's private emotional experience <sup class="c" data-ref="Crowell2009" title="Source 112">112</sup>.`],
 [1,`What volume differences did a meta-analysis find in the BPD brain?`,`Hippocampus about 11% and amygdala about 13% smaller on average <sup class="c" data-ref="Ruocco2012" title="Source 441">441</sup>. Scans cannot diagnose BPD; small samples limit replication <sup class="c" data-ref="Marek2022,Button2013" title="Source 82,329">82,329</sup>.`],
 [1,`Is the mentalizing difficulty in BPD large or small?`,`Very large for reflective functioning (d = 1.68) but modest for theory of mind (d = 0.36) <sup class="c" data-ref="Bora2021" title="Source 67">67</sup>.`],
 /* ---- Part 2: diagnosis ---- */
 [2,`How many DSM-5-TR criteria are needed for BPD, and how many combinations are possible?`,`5 or more of 9, which gives 256 possible combinations, 126 of them with exactly 5 <sup class="c" data-ref="APA2022,Mulay2019" title="Source 11,355">11,355</sup>.`],
 [2,`Under which criterion is suicidal or self-harming behaviour scored?`,`Only criterion 5. It is never counted under criterion 1 (abandonment) or 4 (impulsivity) <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`],
 [2,`How long do the mood shifts of criterion 6 usually last?`,`Usually a few hours and only rarely more than a few days <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>. Sustained mood episodes point to bipolar disorder <sup class="c" data-ref="Paris2015" title="Source 401">401</sup>.`],
 [2,`What is criterion 9?`,`Transient, stress-related paranoid ideation or severe dissociative symptoms <sup class="c" data-ref="APA2022" title="Source 11">11</sup>.`],
 [2,`Which criterion has the highest sensitivity?`,`Affective instability: sensitivity 92.8% and negative predictive value 99%, so its absence nearly rules BPD out <sup class="c" data-ref="Zimmerman2017BJP" title="Source 607">607</sup>.`],
 [2,`Which features best separate BPD from bipolar disorder?`,`Abandonment fears and identity disturbance. Affective instability is transdiagnostic <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup>.`],
 [2,`What are the numbers for the MSI-BPD?`,`10 yes/no items, cut-off 7, sensitivity 0.81, specificity 0.85 <sup class="c" data-ref="Zanarini2003MSI" title="Source 575">575</sup>.`],
 [2,`What does the ZAN-BPD measure?`,`Change in BPD: 9 criteria each rated 0–4 by a clinician, total 0–36, over a 1-week window <sup class="c" data-ref="Zanarini2003ZAN" title="Source 577">577</sup>.`],
 [2,`Which BSL-23 mean score best separated BPD from other patients?`,`1.50, on a scale whose mean item score runs from 0 to 4 <sup class="c" data-ref="Kleindienst2020" title="Source 269">269</sup>.`],
 [2,`What are the ICD-11 personality codes?`,`6D10 personality disorder (.0 mild, .1 moderate, .2 severe), 6D11.0–6D11.4 trait domains, 6D11.5 borderline pattern, and QE50.7 personality difficulty <sup class="c" data-ref="Sharan2023" title="Source 473">473</sup>.`],
 [2,`Name the five ICD-11 trait domains.`,`Negative Affectivity, Detachment, Dissociality, Disinhibition and Anankastia. There is no psychoticism domain <sup class="c" data-ref="Bach2018BMC,Bach2018ANZJP" title="Source 20,21">20,21</sup>.`],
 [2,`What extra rule applies to diagnosing BPD under 18?`,`The features must have lasted at least 1 year <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`],
 [2,`What are Cloitre's four features that separate BPD from complex PTSD?`,`Abandonment fears, unstable self, unstable relationships and impulsiveness <sup class="c" data-ref="Cloitre2014" title="Source 105">105</sup>. In complex PTSD the self-concept is stably negative; in BPD it alternates <sup class="c" data-ref="Frost2020" title="Source 172">172</sup>.`],
 [2,`How often do hallucinations occur in BPD?`,`In about 43% of outpatients, without the negative symptoms or disorganisation typical of primary psychosis <sup class="c" data-ref="Niemantsverdriet2017" title="Source 387">387</sup>.`],
 [2,`How often have psychiatrists withheld a BPD diagnosis?`,`57% of 134 surveyed US psychiatrists had at some point not disclosed it, mostly because of stigma or uncertainty <sup class="c" data-ref="Sisti2016" title="Source 485">485</sup>. Withholding is now generally seen as unethical <sup class="c" data-ref="Sims2022" title="Source 484">484</sup>.`],
 /* ---- Part 3: psychotherapies ---- */
 [3,`Name the four DBT skills modules.`,`Mindfulness, distress tolerance, emotion regulation and interpersonal effectiveness <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`],
 [3,`What are the four parts of standard DBT?`,`Individual therapy, a skills group, between-session phone coaching and a therapist consultation team <sup class="c" data-ref="LinehanWilks2015" title="Source 312">312</sup>.`],
 [3,`What is the DBT target hierarchy?`,`Life-threatening behaviour first, then therapy-interfering behaviour, then quality-of-life-interfering behaviour <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`],
 [3,`What is a chain analysis?`,`Working out, step by step, what led up to a target behaviour and which consequences may keep it going, then finding more skilful alternatives <sup class="c" data-ref="Chapman2006DBT,Lynch2006DBT" title="Source 99,324">99,324</sup>.`],
 [3,`What did Linehan 2006 show?`,`DBT halved the likelihood of a suicide attempt compared with expert community therapy (HR 2.66) over 2 years <sup class="c" data-ref="Linehan2006" title="Source 310">310</sup>.`],
 [3,`Which DBT component drives the extra fall in self-injury?`,`Skills training, in the Linehan 2015 component trial <sup class="c" data-ref="Linehan2015" title="Source 311">311</sup>.`],
 [3,`How did DBT compare with general psychiatric management in McMain 2009?`,`Equal outcomes over 1 year: "No significant differences across any outcomes" <sup class="c" data-ref="McMain2009" title="Source 338">338</sup>.`],
 [3,`Does DBT have to last 12 months?`,`Not for self-harm: in McMain 2022, 6 months of DBT was non-inferior to 12 months <sup class="c" data-ref="McMain2022" title="Source 341">341</sup>.`],
 [3,`Does DBT help suicidal adolescents?`,`Yes: McCauley 2018 found fewer suicide attempts after DBT than supportive therapy (OR 0.30) <sup class="c" data-ref="McCauley2018" title="Source 335">335</sup>.`],
 [3,`What are MBT's three pre-mentalizing modes?`,`Psychic equivalence, pretend mode and teleological mode <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>.`],
 [3,`What did Bateman 2008 report at 8 years?`,`13% vs 87% still met BPD criteria after MBT by partial hospitalisation vs usual care <sup class="c" data-ref="Bateman2008" title="Source 36">36</sup>.`],
 [3,`Which schema modes characterise BPD?`,`Detached protector, punitive parent, abandoned/abused (vulnerable) child and angry/impulsive child, with a weak healthy adult <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>.`],
 [3,`Schema therapy or TFP: which did better in Giesen-Bloo 2006?`,`Schema therapy, on recovery over 3 years (RR 2.18) and with less dropout <sup class="c" data-ref="GiesenBloo2006" title="Source 177">177</sup>.`],
 [3,`Which outcome reached the clinically meaningful threshold in Cochrane 2020?`,`Only BPD severity (SMD −0.52; moderate certainty) for BPD-tailored psychotherapy vs usual care <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>.`],
 [3,`Is one psychotherapy for BPD best?`,`None has been shown superior to another. APA 2024 recommends (1B) a structured, evidence-supported psychotherapy <sup class="c" data-ref="APA2024Guideline,Leichsenring2024WP" title="Source 12,300">12,300</sup>.`],
 [3,`How common is dropout from BPD psychotherapy, and when?`,`About 1 in 4 (22.3–28.2%), peaking early in treatment <sup class="c" data-ref="Iliakis2021,Arntz2023Dropout" title="Source 16,236">16,236</sup>.`],
 [3,`What is STEPPS?`,`A 20-week add-on group programme with a "systems" component that involves the person's support network <sup class="c" data-ref="Blum2008STEPPS" title="Source 60">60</sup>.`],
 /* ---- Part 4: medication, safety & research ---- */
 [4,`Is any medicine approved for BPD?`,`No. No FDA label lists BPD, and all drug use for BPD is off-label <sup class="c" data-ref="FDA-LabelSearch2026,StoffersWinterling2022" title="Source 149,512">149,512</sup>.`],
 [4,`What did the 2022 Cochrane review of medicines find?`,`46 RCTs: no medicine beat placebo on BPD severity, self-harm, suicide-related outcomes or functioning; evidence mostly very low certainty <sup class="c" data-ref="StoffersWinterling2022" title="Source 512">512</sup>.`],
 [4,`What does NICE CG78 say about drugs for BPD?`,`Do not use drugs specifically for BPD or its individual symptoms, and do not use antipsychotics medium- or long-term <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`],
 [4,`How long does NICE CG78 allow crisis sedation?`,`Short-term only, usually stopped within 1 week <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`],
 [4,`What does APA 2024 say about medicines in BPD?`,`(2C) Time-limited, aimed at a measurable target symptom and adjunctive to psychotherapy; (1C) reviewed and reconciled at least every 6 months <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>.`],
 [4,`What did the LABILE trial find?`,`Lamotrigine was no better than placebo at 52 weeks (ZAN-BPD 11.3 vs 11.5) <sup class="c" data-ref="Crawford2018LABILE" title="Source 109">109</sup>.`],
 [4,`What was the trade-off with olanzapine 5–10 mg/day?`,`A modest ZAN-BPD advantage, with about 3 kg weight gain in 12 weeks <sup class="c" data-ref="Zanarini2011Olanzapine" title="Source 590">590</sup>.`],
 [4,`How common is polypharmacy in inpatients with BPD?`,`About 90% receive psychotropics and over half receive three or more <sup class="c" data-ref="Bridler2015" title="Source 78">78</sup>.`],
 [4,`Why is valproate a particular concern?`,`About 10% major malformation risk in exposed pregnancies and lower child IQ; the label says avoid in people who could become pregnant unless alternatives fail <sup class="c" data-ref="Battino2024EURAP,FDA-Depakote" title="Source 41,148">41,148</sup>.`],
 [4,`Why are benzodiazepines not generally recommended in BPD?`,`Disinhibition, misuse and dependence <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>; in Swedish register data they had the highest hazard for suicidal behaviour (HR 1.61) <sup class="c" data-ref="Lieslehto2023Suicide" title="Source 307">307</sup>.`],
 [4,`About what share of people with BPD die by suicide (population statistics)?`,`The meta-analytic estimate is 6%; long cohorts report 5.9–10.3% <sup class="c" data-ref="Lak2025,Temes2019,Paris2001" title="Source 291,398,523">291,398,523</sup>. Suicidal behaviour declines markedly over time <sup class="c" data-ref="Soloff2019Suicidal,Zanarini2008SelfHarm" title="Source 495,584">495,584</sup>.`],
 [4,`Why does NICE NG225 advise against suicide risk scales?`,`They cannot predict suicide: pooled positive predictive value only 5.5% <sup class="c" data-ref="Carter2017PPV" title="Source 86">86</sup>. Do not use them, or low/medium/high stratification, to decide treatment <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup>.`],
 [4,`How much does safety planning reduce suicidal behaviour?`,`By about 43% (RR 0.57; number needed to treat 16) <sup class="c" data-ref="Nuij2021" title="Source 391">391</sup>.`],
 [4,`Did brief admission by self-referral reduce hospital days?`,`No, compared with usual care in its RCT <sup class="c" data-ref="Westling2019BA" title="Source 549">549</sup>.`],
 [4,`What is the Papageno effect?`,`Stories of people coping with suicidal thoughts without acting on them are linked with fewer suicides (Early evidence) <sup class="c" data-ref="Niederkrotenthaler2010" title="Source 383">383</sup>.`],
 [4,`How did brexpiprazole do in its multicentre phase 2 trial?`,`It missed its primary endpoint, and akathisia was 14.0% vs 1.2% on placebo <sup class="c" data-ref="Rothman2024Brexpiprazole" title="Source 439">439</sup>.`],
 [4,`What did the EPADIP-BPD trial of a digital programme find?`,`The schema-therapy-based app priovi improved BSL-23 scores more than self-help material at 3 months (d = 0.24) (Early evidence) <sup class="c" data-ref="Assmann2025" title="Source 17">17</sup>.`],
 /* ---- Part 5: course & living ---- */
 [5,`What were the MSAD remission rates over 6 years?`,`34.5% at 2 years, 49.4% at 4 and 68.6% at 6; only 5.9% of remitters had a recurrence <sup class="c" data-ref="Zanarini2003Course" title="Source 574">574</sup>.`],
 [5,`Remission vs recovery at 16 years in MSAD?`,`99% had a 2-year remission, but only 60% had a 2-year recovery (remission plus good social and vocational functioning) <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup>.`],
 [5,`Is recovery stable once reached?`,`Less so than remission: 50% recovered by 10 years, and 34% of them lost it <sup class="c" data-ref="Zanarini2010Recovery" title="Source 588">588</sup>.`],
 [5,`What did CLPS find over 10 years?`,`85% remitted and 12% relapsed, but social functioning stayed severely impaired <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup>.`],
 [5,`Which symptoms fade first, and which last longest?`,`Impulsive (acute) symptoms such as self-harm fade fastest; affective (temperamental) symptoms such as chronic anger and emptiness persist longest <sup class="c" data-ref="Zanarini2007Subsyndromal,Zanarini2016Fluidity" title="Source 582,596">582,596</sup>.`],
 [5,`Which comorbidity best predicts remission and recovery?`,`The absence of a substance use disorder <sup class="c" data-ref="Zanarini2004AxisI,Zanarini2024Comorbid" title="Source 578,600">578,600</sup>.`],
 [5,`What happens to comorbid disorders when BPD remits?`,`They decline too; when BPD does not remit, they persist <sup class="c" data-ref="Zanarini2004AxisI" title="Source 578">578</sup>.`],
 [5,`What physical health problems are linked with not remitting?`,`Obesity, diabetes, osteoarthritis, chronic pain conditions and costly medical care <sup class="c" data-ref="Frankenburg2004Medical,Keuroghlian2013Medical" title="Source 170,261">170,261</sup>.`],
 [5,`How heavy is the burden on carers?`,`About half a standard deviation higher than for carers of people with other serious mental illnesses <sup class="c" data-ref="Bailey2013" title="Source 23">23</sup>.`],
 [5,`What is Family Connections, and how strong is its evidence?`,`A 12-week DBT-based programme led by trained family members. It reduced burden and grief in uncontrolled and controlled studies but was not superior to active usual care in its one RCT <sup class="c" data-ref="Hoffman2005,Flynn2017,Guillen2024" title="Source 158,196,225">158,196,225</sup>.`],
 [5,`Does more knowledge about BPD always help families?`,`Not alone: in one study it went with more burden and hostility, so the source and accuracy of information matter <sup class="c" data-ref="Hoffman2003" title="Source 224">224</sup>.`],
 [5,`Which profession holds the poorest attitudes toward BPD, and what does training change?`,`Nurses; training effects are largest for knowledge, not feelings <sup class="c" data-ref="Dickens2016Interventions" title="Source 119">119</sup>.`],
 [5,`What did Safewards achieve?`,`15% fewer conflict events and 23.2% fewer containment events on acute wards <sup class="c" data-ref="Bowers2015" title="Source 76">76</sup>.`],
 [5,`What does NICE CG78 advise before an acute admission?`,`Offer a crisis resolution or home treatment team first, and agree the length and purpose of any admission in advance <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`],
 [5,`What did the MOBY trial show in young people?`,`A dedicated early-intervention service (HYPE) improved attendance and completion, but specialist psychotherapy added no functional benefit <sup class="c" data-ref="Chanen2022MOBY" title="Source 97">97</sup>.`],
 [5,`What should a clinician ask about intimate partner violence in BPD?`,`Safety in both directions: BPD and antisocial personality disorder show the most robust links with both perpetration and victimisation <sup class="c" data-ref="Collison2021" title="Source 108">108</sup>.`],
 /* ---- Part 6: history ---- */
 [6,`Who first described a "border line" group?`,`Adolph Stern, in 1938, between neurosis and psychosis <sup class="c" data-ref="Stern1938" title="Source 508">508</sup>.`],
 [6,`What did Kernberg describe in 1967?`,`Borderline personality organisation: primitive defences such as splitting, identity diffusion and lapses in reality testing <sup class="c" data-ref="Kernberg1967,Gunderson2009Ontogeny" title="Source 203,259">203,259</sup>.`],
 [6,`When did BPD enter DSM, and what made it possible?`,`DSM-III in 1980, after Spitzer's 1979 study split borderline personality from schizotypal ("borderline schizophrenia") <sup class="c" data-ref="Spitzer1979,Leichsenring2024WP" title="Source 300,496">300,496</sup>.`],
 [6,`What study began the "recovery era"?`,`MSAD's 2003 report: 68.6% remitted by 6 years, with few recurrences <sup class="c" data-ref="Zanarini2003Course" title="Source 574">574</sup>.`],
 [6,`What did ICD-11 change for personality disorder in 2022?`,`It replaced the named types with one severity spectrum plus trait domains, "the most radical change" in the classification's history, with an optional borderline pattern <sup class="c" data-ref="Tyrer2019" title="Source 540">540</sup>.`]
];
const RV_MN=[
 ["R-S-A-I + 9","memory aid",`The DSM-5-TR definition names instability in <b>R</b>elationships, <b>S</b>elf-image and <b>A</b>ffects, plus marked <b>I</b>mpulsivity <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>. Hang the criteria on it: R = 1, 2; S = 3, 7; A = 6, 8; I = 4, 5; and 9 for stress-related paranoia or dissociation.`],
 ["5 of 9 makes 256","memory aid",`126 + 84 + 36 + 9 + 1 = 256 ways to meet 5 or more of 9 criteria, so two people can share only one criterion <sup class="c" data-ref="Mulay2019" title="Source 355">355</sup>.`],
 ["Self-harm lives at 5","memory aid",`Suicidal or self-harming behaviour is scored only under criterion 5, never under 1 or 4 <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`],
 ["Sensitive, strong, slow","memory aid",`The three parts of emotional vulnerability in the biosocial model: high sensitivity, high intensity and a slow return to baseline <sup class="c" data-ref="Crowell2009,Kuo2009" title="Source 112,289">112,289</sup>.`],
 ["My Emotions Deserve Interest","memory aid",`The four DBT skills modules: <b>M</b>indfulness, <b>E</b>motion regulation, <b>D</b>istress tolerance, <b>I</b>nterpersonal effectiveness <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`],
 ["Life, therapy, quality","memory aid",`DBT's target hierarchy: life-threatening behaviour, then therapy-interfering, then quality-of-life-interfering behaviour <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`],
 ["PET the modes","memory aid",`MBT's three pre-mentalizing modes: <b>P</b>sychic equivalence, pr<b>E</b>tend mode, <b>T</b>eleological mode <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>.`],
 ["One protector, one parent, two children, a weak adult","memory aid",`Schema modes in BPD: detached protector, punitive parent, vulnerable child and angry/impulsive child; the healthy adult is weak <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>.`],
 ["Negative, three Ds, A","memory aid",`ICD-11 trait domains: <b>N</b>egative Affectivity, <b>D</b>etachment, <b>D</b>issociality, <b>D</b>isinhibition, <b>A</b>nankastia <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup>.`],
 ["Signs, skills, people, numbers","memory aid",`A crisis or safety plan names warning signs and triggers, coping strategies that work, people to contact and how to reach services out of hours <sup class="c" data-ref="NICE2009,Stanley2018ED" title="Source 379,501">379,501</sup>.`]
];
const RV_CRIT=[
 /* n, two-line label, row in the grouped layout (0 R,1 S,2 A,3 I,4 stress), slot */
 [1,['Abandonment','fears'],0,0],[2,['Unstable','relationships'],0,1],[3,['Identity','disturbance'],1,0],
 [4,['Impulsivity','2+ areas'],3,0],[5,['Suicidal or','self-harming'],3,1],[6,['Affective','instability'],2,0],
 [7,['Chronic','emptiness'],1,1],[8,['Intense','anger'],2,1],[9,['Paranoia or','dissociation'],4,0]
];
const RV_ROWS=[['R','Relationships','--other'],['S','Self-image','--self'],['A','Affects','--storm'],['I','Impulsivity','--med'],['9','Stress','--dx']];
const RV_STEPS=[
 {from:0,at:.13,k:'Definition',t:'Four instabilities',txt:`DSM-5-TR defines BPD as a pervasive pattern of instability of interpersonal relationships, self-image and affects, and marked impulsivity, beginning by early adulthood and present in a variety of contexts, shown by 5 or more of 9 criteria <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`,pt:'BPD is about things that keep shifting: relationships, how you see yourself, feelings, and acting on impulse.',hook:'Instability of relationships, self-image and affects, plus marked impulsivity; onset by early adulthood.'},
 {from:.2,at:.33,k:'R-S-A-I + 9',t:'Sort the nine',txt:`As a memory aid, hang the nine criteria on the four words: relationships (1 abandonment, 2 unstable relationships), self (3 identity, 7 emptiness), affects (6 affective instability, 8 anger), impulsivity (4 impulsivity, 5 suicidal or self-harming behaviour), and criterion 9, transient stress-related paranoid ideation or severe dissociation <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>. The grouping is for study only: statistically the nine criteria form one coherent construct <sup class="c" data-ref="Sanislow2002" title="Source 451">451</sup>.`,pt:'Five short words can help you remember all nine criteria.',hook:'Criterion 9 = transient, stress-related paranoid ideation or severe dissociative symptoms.'},
 {from:.4,at:.53,k:'5 of 9',t:'256 ways in',txt:`Any 5 of 9 can be met in 256 combinations: 126 with exactly 5 criteria, 84 with 6, 36 with 7, 9 with 8 and 1 with all 9 <sup class="c" data-ref="Mulay2019" title="Source 355">355</sup>. Even so, affective instability and identity disturbance were the most central symptoms in network analyses of three samples <sup class="c" data-ref="Peters2023" title="Source 410">410</sup>.`,pt:'There are many different ways to have BPD, so no two people look exactly alike.',hook:'5 of 9 = 256 combinations; 126 of them use exactly 5 criteria.'},
 {from:.6,at:.72,k:'Two people',t:'Sharing one criterion',txt:`Two people can both meet the threshold yet share only one criterion: one meets criteria 1–5, the other 5–9 <sup class="c" data-ref="Mulay2019" title="Source 355">355</sup>. This heterogeneity is one reason ICD-11 grades personality disorder by severity first and adds an optional borderline pattern <sup class="c" data-ref="Tyrer2019,Bach2018BMC" title="Source 21,540">21,540</sup>.`,pt:'Two people with the same diagnosis may have very different struggles, so care is planned around the person.',hook:'Polythetic criteria mean heterogeneity: criteria 1–5 and 5–9 overlap only at 5.'},
 {from:.79,at:.94,k:'Count once',t:'Where self-harm counts',txt:`Suicidal or self-harming behaviour is scored only under criterion 5, never under criterion 1 or 4 <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>. Affective instability has the highest sensitivity of the nine (92.8%) and a negative predictive value of 99%, so asking about it works as a one-question screen <sup class="c" data-ref="Zimmerman2017BJP" title="Source 607">607</sup>. A screen is not a diagnosis: that needs a careful interview <sup class="c" data-ref="Chanen2008,Zanarini2003MSI" title="Source 90,575">90,575</sup>.`,pt:'Self-harm is a sign that someone needs support now. Help works, and recovery is common <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup>.',hook:'Absent affective instability nearly rules out BPD (NPV 99%).'}
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

  /* ---- mnemonic in motion: R-S-A-I + 9 ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const COMB=[[5,126],[6,84],[7,36],[8,9],[9,1]];
  function draw(t){
    const N=vb(svg,'720 380','400 600');
    /* layout: L = the tile panel, R = the explainer panel */
    const L=N?{x:10,y:8,w:380}:{x:10,y:10,w:356},R=N?{x:16,y:352,w:368,h:240}:{x:384,y:24,w:322,h:340};
    const TW0=N?118:112,TW1=N?164:150,TH0=N?52:58,TH1=40,lblW=40,FS=N?11:9.8;
    const gridPos=k=>{const c=k%3,r=Math.floor(k/3);return [L.x+6+c*(TW0+(N?6:4)),L.y+50+r*(TH0+14)]};
    const grpPos=(row,slot)=>[L.x+lblW+slot*(TW1+6),L.y+40+row*(TH1+18)];
    /* phase visibilities */
    const ph=[0,.17,.37,.57,.76,1.01];
    const vis=k=>{const a=ph[k],b=ph[k+1];return ramp(t,a,a+.035)*(k===4?1:1-ramp(t,b-.02,b+.015))};
    const v0=k=>k===0?1-ramp(t,ph[1]-.02,ph[1]+.015):vis(k);
    const sort=ease(ramp(t,.19,.33));
    const pA=ramp(t,.6,.66),pB=ramp(t,.65,.71),fin=ramp(t,.79,.86),fin2=ramp(t,.86,.93);
    let s='';
    /* row labels for the grouped layout */
    RV_ROWS.forEach(([ch,nm,col],r)=>{const y=L.y+40+r*(TH1+18),op=sort,TH=TH1;
      if(op>0)s+=`<g style="opacity:${f1(op)}"><circle cx="${L.x+18}" cy="${y+TH/2}" r="15" style="fill:var(${col});opacity:.16"/><text class="t-big t-mid" x="${L.x+18}" y="${y+TH/2+6}" style="fill:var(${col})">${ch}</text></g>`});
    /* tiles */
    RV_CRIT.forEach(([n,lab,row,slot],k)=>{
      const g0=gridPos(k),g1=grpPos(row,slot),x=lerp(g0[0],g1[0],sort),y=lerp(g0[1],g1[1],sort),TW=lerp(TW0,TW1,sort),TH=lerp(TH0,TH1,sort);
      const col=RV_ROWS[row][2];
      const inA=n<=5,inB=n>=5;
      let fill='var(--panel)',stroke='var(--line)',sw=1.2;
      if(sort>.5){fill='var(--panel)';stroke=`var(${col})`}
      const aOn=inA?pA:0,bOn=inB?pB:0;
      const hot5=n===5?fin:0,hot6=n===6?fin2:0;
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(TW)}" height="${f1(TH)}" rx="8" style="fill:${fill};stroke:${stroke};stroke-width:${sw}"/>`;
      if(hot5>0)s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(TW)}" height="${f1(TH)}" rx="8" style="fill:var(--storm-soft);stroke:var(--storm);stroke-width:2.4;opacity:${f1(hot5)}"/>`;
      if(hot6>0)s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(TW)}" height="${f1(TH)}" rx="8" style="fill:var(--calm-soft);stroke:var(--calm);stroke-width:2.4;opacity:${f1(hot6)}"/>`;
      s+=`<circle cx="${f1(x+14)}" cy="${f1(y+TH/2)}" r="10" style="fill:var(${sort>.5?col:'--brand'});opacity:.9"/><text class="t-lbl t-mid" x="${f1(x+14)}" y="${f1(y+TH/2+4.5)}" style="fill:var(--on-brand);font-size:12px">${n}</text>`;
      s+=`<text class="t-xs" x="${f1(x+29)}" y="${f1(y+TH/2-2)}" style="fill:var(--ink);font-size:${FS}px">${lab[0]}</text><text class="t-xs" x="${f1(x+29)}" y="${f1(y+TH/2+10)}" style="font-size:${FS}px">${lab[1]}</text>`;
      /* person markers: A in --self, B in --other */
      if(aOn>0)s+=`<circle cx="${f1(x+TW-10)}" cy="${f1(y+10)}" r="6" style="fill:var(--self);opacity:${f1(aOn*(1-fin))}"/><text class="t-xs t-mid" x="${f1(x+TW-10)}" y="${f1(y+13)}" style="fill:var(--on-brand);font-size:8px;opacity:${f1(aOn*(1-fin))}">A</text>`;
      if(bOn>0)s+=`<circle cx="${f1(x+TW-10)}" cy="${f1(y+TH-10)}" r="6" style="fill:var(--other);opacity:${f1(bOn*(1-fin))}"/><text class="t-xs t-mid" x="${f1(x+TW-10)}" y="${f1(y+TH-7)}" style="fill:var(--on-brand);font-size:8px;opacity:${f1(bOn*(1-fin))}">B</text>`;
    });
    /* title over the tile panel */
    const ttl=sort<.5?'The nine DSM-5-TR criteria':'Sorted with the memory aid R-S-A-I + 9';
    s+=`<text class="t-lbl" x="${L.x+6}" y="${L.y+22}">${ttl}</text>`;
    /* ---- explainer panel ---- */
    s+=`<g transform="translate(${R.x} ${R.y})">`;
    s+=`<rect x="0" y="0" width="${R.w}" height="${R.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    /* phase 0: the four words */
    const a0=v0(0);
    if(a0>0){s+=`<g style="opacity:${f1(a0)}"><text class="t-sm" x="16" y="28">A pervasive pattern of instability in</text>`;
      RV_ROWS.slice(0,4).forEach(([ch,nm,col],k)=>{const on=ramp(t,.02+k*.025,.05+k*.025),y=(N?54:62)+k*(N?32:44);
        s+=`<g style="opacity:${f1(.2+.8*on)}"><circle cx="30" cy="${y}" r="${N?13:15}" style="fill:var(${col});opacity:.18"/><text class="t-big t-mid" x="30" y="${y+6}" style="fill:var(${col})">${ch}</text><text class="t-big" x="54" y="${y+6}">${k===3?'marked Impulsivity':nm}</text></g>`});
      s+=`<text class="t-sm" x="16" y="${N?190:256}">begins by early adulthood,</text><text class="t-sm" x="16" y="${N?206:274}">across contexts: 5 or more of 9</text>`;
      if(!N)s+=`<text class="t-xs" x="16" y="${300}">criterion wording shortened for study</text>`;s+='</g>'}
    /* phase 1: memory aid */
    const a1=vis(1);
    if(a1>0){s+=`<g style="opacity:${f1(a1)}"><text class="t-lbl" x="16" y="30">Memory aid</text>`;
      RV_ROWS.forEach(([ch,nm,col],k)=>{const x=16+k*(N?46:44);s+=`<text class="t-big" x="${x}" y="${N?66:72}" style="fill:var(${col});font-size:26px">${ch}${k<3?' -':k===3?' +':''}</text>`});
      const lines=N?['R relationships: 1, 2','S self: 3, 7','A affects: 6, 8','I impulsivity: 4, 5','9 stress: paranoia, dissociation']:['R  relationships: criteria 1 and 2','S  self: criteria 3 and 7','A  affects: criteria 6 and 8','I  impulsivity: criteria 4 and 5','9  stress-related paranoia','    or dissociation'];
      lines.forEach((l,k)=>{s+=`<text class="t-sm" x="16" y="${(N?96:110)+k*(N?22:26)}" style="fill:var(--ink)">${l}</text>`});
      s+=`<text class="t-xs" x="16" y="${N?224:300}">a study grouping, not a DSM category</text></g>`}
    /* phase 2: combinations bar chart */
    const a2=vis(2);
    if(a2>0){const bx=N?40:44,by=N?186:262,bw=N?54:46,maxH=N?120:170,grow=ramp(t,.4,.53);let tot=0;
      s+=`<g style="opacity:${f1(a2)}"><text class="t-lbl" x="16" y="28">Ways to meet 5 or more of 9</text>`;
      s+=`<line x1="${bx-8}" x2="${bx+5*(bw+8)}" y1="${by}" y2="${by}" class="axis"/>`;
      COMB.forEach(([k,n],j)=>{const g=clamp(grow*5-j),h=maxH*n/126*g,x=bx+j*(bw+8);tot+=Math.round(n*g);
        s+=`<rect x="${x}" y="${f1(by-h)}" width="${bw}" height="${f1(h)}" rx="4" style="fill:var(--brand);opacity:${f1(.35+.5*(j===0?1:.7))}"/>`;
        s+=`<text class="t-xs t-mid" x="${x+bw/2}" y="${by+14}">${k} of 9</text>`;
        if(g>0)s+=`<text class="t-sm t-mid" x="${x+bw/2}" y="${f1(by-h-5)}" style="fill:var(--ink)">${Math.round(n*g)}</text>`});
      s+=`<text class="t-big t-end" x="${R.w-16}" y="28" style="fill:var(--brand);font-size:22px">${tot}</text><text class="t-xs t-end" x="${R.w-16}" y="44">combinations</text>`;
      s+=`<text class="t-xs" x="16" y="${by+32}">126 + 84 + 36 + 9 + 1 = 256</text></g>`}
    /* phase 3: two people */
    const a3=vis(3);
    if(a3>0){const y0=N?40:52;s+=`<g style="opacity:${f1(a3)}"><text class="t-lbl" x="16" y="28">Two people, one diagnosis</text>`;
      [['A','--self',[1,2,3,4,5],pA],['B','--other',[5,6,7,8,9],pB]].forEach(([nm,col,cs,on],j)=>{const y=y0+j*(N?78:96);
        s+=`<g style="opacity:${f1(.15+.85*on)}">`+person(30,y,40,`var(${col})`)+`<text class="t-lbl" x="56" y="${y+16}">Person ${nm}</text>`;
        cs.forEach((c,q)=>{const cx=62+q*(N?30:34);s+=`<circle cx="${cx}" cy="${y+38}" r="12" style="fill:var(${c===5?'--storm-soft':'--panel'});stroke:var(${col});stroke-width:1.8"/><text class="t-lbl t-mid" x="${cx}" y="${y+42.5}">${c}</text>`});
        s+=`</g>`});
      s+=`<text class="t-sm" x="16" y="${N?210:262}" style="fill:var(--ink);opacity:${f1(pB)}">Shared: only criterion 5</text><text class="t-xs" x="16" y="${N?226:282}" style="opacity:${f1(pB)}">both meet 5 of 9</text></g>`}
    /* phase 4: count once, one-question screen */
    const a4=vis(4);
    if(a4>0){s+=`<g style="opacity:${f1(a4)}">`;
      s+=`<g style="opacity:${f1(.2+.8*fin)}"><text class="t-lbl" x="16" y="30" style="fill:var(--storm)">Criterion 5 only</text><text class="t-sm" x="16" y="50" style="fill:var(--ink)">Suicidal or self-harming behaviour</text><text class="t-sm" x="16" y="66" style="fill:var(--ink)">is not counted again under 1 or 4</text></g>`;
      const sens=92.8*fin2,yb=N?118:128,bw=R.w-32;
      s+=`<g style="opacity:${f1(.2+.8*fin2)}"><text class="t-lbl" x="16" y="${yb-14}" style="fill:var(--calm)">Criterion 6 as a one-question screen</text>`;
      s+=`<rect x="16" y="${yb}" width="${bw}" height="14" rx="7" style="fill:var(--panel)"/><rect x="16" y="${yb}" width="${f1(bw*sens/100)}" height="14" rx="7" style="fill:var(--calm)"/>`;
      s+=`<text class="t-sm" x="16" y="${yb+32}" style="fill:var(--ink)">sensitivity ${f1(sens)}%</text><text class="t-sm" x="16" y="${yb+50}" style="fill:var(--ink)">NPV ${Math.round(99*fin2)}%: if absent, BPD unlikely</text>`;
      s+=`<text class="t-xs" x="16" y="${yb+(N?72:80)}">a screen flags; an interview diagnoses</text></g></g>`}
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
 [1,`The median point prevalence of BPD in the general population is closest to:`,[`1%`,`0.01%`,`10%`,`25%`],0,`About 1%, with community estimates of roughly 1–3% <sup class="c" data-ref="Ellison2018,Tomko2014" title="Source 144,528">144,528</sup>.`],
 [1,`Among psychiatric inpatients, BPD affects about:`,[`1–2%`,`20–22%`,`50–60%`,`80%`],1,`About 20–22% of inpatients and 10–12% of outpatients <sup class="c" data-ref="Ellison2018" title="Source 144">144</sup>.`],
 [1,`Clinical samples with BPD are about 75% female. The best explanation is:`,[`BPD is X-linked`,`Men cannot meet criterion 5`,`Mainly referral and sampling bias; community rates are near-equal`,`Oestrogen causes BPD`],2,`Community samples show near-equal rates in men and women <sup class="c" data-ref="Skodol2003,Grant2008" title="Source 184,486">184,486</sup>.`],
 [1,`BPD usually begins:`,[`After age 60`,`In early childhood, before age 5`,`Only after a first psychiatric admission`,`In adolescence, after about age 12`],3,`It can be diagnosed from about age 11 and affects about 3% of adolescents in the community <sup class="c" data-ref="Bohus2021,Guile2018" title="Source 66,195">66,195</sup>.`],
 [1,`Which is NOT one of the three components of emotional vulnerability in Linehan's biosocial model?`,[`Low intelligence`,`High sensitivity`,`High intensity`,`Slow return to baseline`],0,`The three are sensitivity, intensity (reactivity) and a slow return to baseline <sup class="c" data-ref="Crowell2009,Kuo2009" title="Source 112,289">112,289</sup>.`],
 [1,`In daily-life (EMA) studies, a typical BPD mood pattern is:`,[`Mood never changes`,`Sudden large drops from positive mood`,`Week-long manic highs`,`Mood rises only at night`],1,`48% of drops from a very positive mood reached negative mood, against 9% in controls <sup class="c" data-ref="EbnerPriemer2007PsycholMed" title="Source 139">139</sup>.`],
 [1,`Affective instability is heightened in BPD and also in:`,[`No other condition`,`Only schizophrenia`,`PTSD and bulimia nervosa`,`Only in healthy adolescents`],2,`It is transdiagnostic <sup class="c" data-ref="Santangelo2014" title="Source 455">455</sup>; self-esteem instability may be more BPD-specific <sup class="c" data-ref="Kockler2022" title="Source 274">274</sup>.`],
 [1,`A lab meta-analysis found that, compared with controls, people with BPD show:`,[`Huge heart-rate surges to every stimulus`,`No difference in how they rate stimuli`,`Lower emotional ratings`,`Null to small physiological hyperreactivity but more negative ratings`],3,`The big difference is how negatively stimuli are rated <sup class="c" data-ref="Bortolla2020" title="Source 73">73</sup>.`],
 [1,`The most common function people report for self-injury is:`,[`Boredom`,`Short-term relief from intense negative emotion`,`Pleasure-seeking`,`No reason`],1,`Relief is short-lived, and daily-life data show negative emotion rising again over hours <sup class="c" data-ref="Klonsky2007,Houben2017" title="Source 232,271">232,271</sup>.`],
 [1,`Twin heritability estimates for BPD range from about:`,[`0–5%`,`95–100%`,`42% to .69`,`Exactly 50% in every study`],2,`42% in Distel 2008 (self-report) and about .69 in Torgersen 2000 (interview) <sup class="c" data-ref="Distel2008,Torgersen2000" title="Source 124,530">124,530</sup>.`],
 [1,`In twin studies, most of the non-genetic variance in BPD comes from:`,[`Shared family environment`,`Birth order`,`Diet`,`Unique (non-shared) environment`],3,`Unique environment, not shared family environment <sup class="c" data-ref="Distel2008,Skoglund2021" title="Source 124,489">124,489</sup>.`],
 [1,`In the largest BPD GWAS (Streit 2026), polygenic scores explained about:`,[`4.6% of the variance`,`46% of the variance`,`90% of the variance`,`0%`],0,`Too little for individual prediction; SNP heritability was about 17% and 11 loci were found <sup class="c" data-ref="Streit2026" title="Source 517">517</sup>.`],
 [1,`Childhood adversity raises the odds of BPD (OR 13.91 vs non-clinical controls). The largest effects were for:`,[`Moving house`,`Being an only child`,`Emotional abuse and neglect`,`Parental divorce alone`],2,`Emotional abuse and neglect showed the largest effects <sup class="c" data-ref="Porter2020" title="Source 416">416</sup>.`],
 [1,`Zanarini 1997 concluded that childhood sexual abuse in BPD is:`,[`Present in every case`,`Necessary but not sufficient`,`Sufficient but not necessary`,`Neither necessary nor sufficient`],3,`Caretaker neglect was a key risk factor <sup class="c" data-ref="Zanarini1997" title="Source 568">568</sup>.`],
 [1,`In the biosocial model, an "invalidating environment" is one that:`,[`Is intolerant of a child's expression of private emotional experience`,`Has no rules`,`Is always physically abusive`,`Provides too much praise`],0,`Especially of emotions not backed by observable events <sup class="c" data-ref="Crowell2009" title="Source 112">112</sup>.`],
 [1,`A meta-analysis found that, on average, people with BPD have:`,[`Larger hippocampal volume`,`About 11% smaller hippocampus and 13% smaller amygdala`,`No brain differences at all`,`A diagnostic scan signature`],1,`These are group averages; neuroimaging is not used to diagnose BPD <sup class="c" data-ref="Ruocco2012,Marek2022" title="Source 329,441">329,441</sup>.`],
 [1,`Hypermentalizing means:`,[`Being unable to think`,`A deficit in memory`,`Excellent accuracy in reading others`,`Excessive, inaccurate attribution of mental states`],3,`It is not specific to BPD <sup class="c" data-ref="Sharp2011,McLaren2022" title="Source 337,474">337,474</sup>.`],
 /* ---- Part 2 ---- */
 [2,`How many DSM-5-TR criteria are needed for BPD?`,[`5 or more of 9`,`3 or more of 9`,`All 9`,`4 or more of 7`],0,`Giving 256 possible combinations <sup class="c" data-ref="APA2022,Mulay2019" title="Source 11,355">11,355</sup>.`],
 [2,`Two people can both have BPD yet share only:`,[`No criteria`,`One criterion`,`Four criteria`,`Every criterion`],1,`For example, one meets criteria 1–5 and another 5–9 <sup class="c" data-ref="Mulay2019" title="Source 355">355</sup>.`],
 [2,`Recurrent suicidal or self-harming behaviour is scored under:`,[`Criterion 1 and criterion 5`,`Criterion 4 only`,`Criterion 5 only`,`Criterion 9`],2,`Never under criteria 1 or 4 <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`],
 [2,`Case: a 24-year-old describes intense dysphoria and irritability after arguments that settle within a few hours. This best fits:`,[`A manic episode`,`A depressive episode`,`Cyclothymia by definition`,`BPD criterion 6, affective instability`],3,`Criterion 6 mood shifts usually last hours and rarely more than a few days; sustained episodes point to bipolar disorder <sup class="c" data-ref="APA2022,Paris2015" title="Source 11,401">11,401</sup>.`],
 [2,`Which criterion has the highest sensitivity (92.8%) and NPV (99%)?`,[`Affective instability`,`Inappropriate anger`,`Paranoia or dissociation`,`Impulsivity`],0,`Asking about it works as a one-question screen <sup class="c" data-ref="Zimmerman2017BJP" title="Source 607">607</sup>.`],
 [2,`Which features best separate BPD from bipolar disorder?`,[`Affective instability and anger`,`Abandonment fears and identity disturbance`,`Sleep and appetite`,`Age and sex`],1,`Affective instability is transdiagnostic <sup class="c" data-ref="Bayes2020" title="Source 44">44</sup>.`],
 [2,`The MSI-BPD uses a cut-off of:`,[`2 of 23`,`15 of 36`,`7 of 10`,`1.50`],2,`Sensitivity 0.81, specificity 0.85 <sup class="c" data-ref="Zanarini2003MSI" title="Source 575">575</sup>.`],
 [2,`Case: a screen with sensitivity 0.81 and specificity 0.85 is used where BPD prevalence is 1%. A positive result means BPD is likely in about:`,[`95% of positives`,`81% of positives`,`50% of positives`,`5% of positives`],3,`A calculated PPV of about 5% at 1%, rising to about 38% at 10% prevalence; screens flag, interviews diagnose <sup class="c" data-ref="Zanarini2003MSI,Ellison2018" title="Source 144,575">144,575</sup>.`],
 [2,`The ZAN-BPD is:`,[`A clinician-rated change measure, 9 items 0–4, total 0–36, over 1 week`,`A blood test`,`A 10-item yes/no screen`,`A self-rated 23-item list`],0,`It measures change over a 1-week window <sup class="c" data-ref="Zanarini2003ZAN" title="Source 577">577</sup>.`],
 [2,`On the BSL-23, the mean score that best separated BPD from other patients was:`,[`0.10`,`1.50`,`3.90`,`7`],1,`Scores run 0–4 in six severity grades <sup class="c" data-ref="Kleindienst2020" title="Source 269">269</sup>.`],
 [2,`In ICD-11, the code 6D11.5 is:`,[`Severe personality disorder`,`Personality difficulty`,`The borderline pattern specifier`,`Negative Affectivity`],2,`6D10 is personality disorder (.0–.2 severity); QE50.7 is personality difficulty <sup class="c" data-ref="Sharan2023" title="Source 473">473</sup>.`],
 [2,`Which is NOT an ICD-11 personality trait domain?`,[`Negative Affectivity`,`Anankastia`,`Dissociality`,`Psychoticism`],3,`ICD-11 has no psychoticism domain; DSM-5's trait model does <sup class="c" data-ref="Bach2018BMC,Bach2018ANZJP" title="Source 20,21">20,21</sup>.`],
 [2,`ICD-11 first grades personality disorder by:`,[`Severity: mild, moderate or severe`,`Type: borderline, antisocial, etc.`,`Age at onset`,`Number of hospital admissions`],0,`Then trait domains and an optional borderline pattern can be added <sup class="c" data-ref="Tyrer2019,Bach2018BMC" title="Source 21,540">21,540</sup>.`],
 [2,`AMPD Criterion B for BPD requires 4 or more of 7 traits, including at least one of:`,[`Anxiousness, depressivity or separation insecurity`,`Impulsivity, risk taking or hostility`,`Grandiosity, callousness or deceit`,`Eccentricity, unusual beliefs or withdrawal`],1,`Criterion A needs impairment in 2 or more of identity, self-direction, empathy and intimacy <sup class="c" data-ref="Kaess2025" title="Source 251">251</sup>.`],
 [2,`Case: a 15-year-old meets 6 criteria, present for 8 months. Under DSM-5-TR:`,[`BPD can never be diagnosed under 18`,`BPD can be diagnosed now`,`Features must have lasted at least 1 year before diagnosing BPD`,`Only ICD-11 applies to adolescents`],2,`Under 18 the features must have lasted at least 1 year <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>. Early assessment and help are encouraged <sup class="c" data-ref="Fonagy2015" title="Source 161">161</sup>.`],
 [2,`In complex PTSD, compared with BPD, the self-concept is typically:`,[`Alternating between idealised and devalued`,`Grandiose`,`Absent`,`Stably negative`],3,`In BPD it alternates <sup class="c" data-ref="Frost2020" title="Source 172">172</sup>. Cloitre's discriminators are abandonment fears, unstable self, unstable relationships and impulsiveness <sup class="c" data-ref="Cloitre2014" title="Source 105">105</sup>.`],
 [2,`About what share of people with BPD have a current substance use disorder?`,[`About half`,`Fewer than 1%`,`Nearly 100%`,`About 5%`],0,`And about a quarter of people with an SUD have BPD <sup class="c" data-ref="Trull2018" title="Source 536">536</sup>.`],
 [2,`Case: an outpatient with BPD hears a critical voice when under stress, with no negative symptoms or disorganisation. The best interpretation is:`,[`This always means schizophrenia`,`Hallucinations occur in about 43% of outpatients with BPD and need careful assessment`,`Hallucinations rule out BPD`,`This is always a medicine side effect`],1,`Without the features typical of primary psychosis <sup class="c" data-ref="Niemantsverdriet2017" title="Source 387">387</sup>; "pseudo-psychotic" is a misleading label <sup class="c" data-ref="Schroeder2013" title="Source 462">462</sup>.`],
 [2,`Withholding a BPD diagnosis "to protect the patient" is now generally seen as:`,[`Best practice`,`Required by law`,`Recommended for adolescents`,`Unethical, and harmful to integrated care`],3,`Therapeutic privilege is no longer accepted <sup class="c" data-ref="Sims2022" title="Source 484">484</sup>; psychoeducation right after disclosure helped in one trial <sup class="c" data-ref="Zanarini2008Psychoed" title="Source 583">583</sup>.`],
 /* ---- Part 3 ---- */
 [3,`Which is NOT one of the four DBT skills modules?`,[`Free association`,`Mindfulness`,`Distress tolerance`,`Interpersonal effectiveness`],0,`The fourth is emotion regulation <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`],
 [3,`Standard DBT includes individual therapy, a skills group, phone coaching and:`,[`Inpatient admission`,`A therapist consultation team`,`Daily medication`,`Family therapy every week`],1,`The consultation team supports therapists and reduces burnout <sup class="c" data-ref="LinehanWilks2015,Chapman2006DBT" title="Source 99,312">99,312</sup>.`],
 [3,`In DBT's target hierarchy, what comes first?`,[`Quality-of-life-interfering behaviour`,`Therapy-interfering behaviour`,`Life-threatening behaviour`,`Homework`],2,`Then therapy-interfering, then quality-of-life-interfering behaviour <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`],
 [3,`The weekly self-monitoring form in DBT is called the:`,[`Thought record`,`Mood chart`,`Fear ladder`,`Diary card`],3,`The therapist uses it to set the session agenda <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`],
 [3,`The first RCT of DBT was published in:`,[`1991`,`1975`,`2006`,`2015`],0,`Linehan 1991, in chronically parasuicidal women with BPD <sup class="c" data-ref="Linehan1991" title="Source 309">309</sup>.`],
 [3,`Linehan 2006 found that DBT, compared with expert community therapy:`,[`Had no effect on suicide attempts`,`Halved the likelihood of a suicide attempt`,`Doubled dropout`,`Worked only with medication`],1,`HR 2.66; the control arm matched therapist expertise and allegiance <sup class="c" data-ref="Linehan2006" title="Source 310">310</sup>.`],
 [3,`In the Linehan 2015 component trial, the extra fall in self-injury came from:`,[`Phone coaching alone`,`Medication`,`Skills training`,`Group activities without skills`],2,`"Interventions that include DBT skills training are more effective than DBT without skills training" <sup class="c" data-ref="Linehan2015" title="Source 311">311</sup>.`],
 [3,`McMain 2009 compared DBT with general psychiatric management for 1 year and found:`,[`DBT far superior`,`GPM far superior`,`Both harmful`,`No significant differences on any outcome`],3,`Both groups improved <sup class="c" data-ref="McMain2009" title="Source 338">338</sup>.`],
 [3,`McMain 2022 showed that for self-harm, 6 months of DBT was:`,[`Non-inferior to 12 months`,`Worse than 12 months`,`Not tested`,`Worse than no treatment`],0,`It also gave faster falls in BPD symptoms <sup class="c" data-ref="McMain2022" title="Source 341">341</sup>.`],
 [3,`In high-risk adolescents, McCauley 2018 found DBT vs supportive therapy:`,[`Increased suicide attempts`,`Reduced suicide attempts (OR 0.30)`,`Made no difference to anything`,`Was not tolerated`],1,`The advantage narrowed between 6 and 12 months <sup class="c" data-ref="McCauley2018" title="Source 335">335</sup>.`],
 [3,`"Psychic equivalence" in MBT means:`,[`Acting only on physical proof`,`Talking about feelings while cut off from them`,`Treating inner experience as if it were outer reality`,`Accurate mentalizing`],2,`The other pre-mentalizing modes are pretend and teleological <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>.`],
 [3,`Bateman 2008 reported that 8 years after entry, the share still meeting BPD criteria was:`,[`50% vs 50%`,`87% vs 13%`,`0% vs 100%`,`13% after MBT vs 87% after usual care`],3,`Though "general social function remains impaired" <sup class="c" data-ref="Bateman2008" title="Source 36">36</sup>.`],
 [3,`Which is NOT one of the schema modes linked with BPD?`,[`Narcissistic self-aggrandiser`,`Detached protector`,`Punitive parent`,`Angry/impulsive child`],0,`The fourth is the vulnerable (abandoned/abused) child; the healthy adult is weak <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>.`],
 [3,`Giesen-Bloo 2006 compared schema therapy with TFP over 3 years and found:`,[`TFP better on recovery`,`Schema therapy better on recovery (RR 2.18), with less dropout`,`No one improved`,`Both worse than usual care`],1,`Both therapies helped on all measures <sup class="c" data-ref="GiesenBloo2006" title="Source 177">177</sup>.`],
 [3,`Arntz 2022 found that schema therapy worked best when delivered:`,[`Only as a group`,`Only online`,`As combined individual and group therapy`,`Without a therapist`],2,`Mainly-group schema therapy alone did not beat usual care <sup class="c" data-ref="Arntz2022GST" title="Source 15">15</sup>.`],
 [3,`In Doering 2010, dropout from TFP vs experienced community therapists was:`,[`Equal`,`67.3% vs 38.5%`,`5% vs 95%`,`38.5% vs 67.3%`],3,`TFP also improved BPD symptoms (d 1.6) <sup class="c" data-ref="Doering2010" title="Source 130">130</sup>.`],
 [3,`Cochrane 2020 found BPD-tailored psychotherapy reduced BPD severity vs usual care by:`,[`SMD −0.52, moderate certainty`,`SMD −3.0, high certainty`,`No effect`,`SMD +0.52`],0,`Only BPD severity reached the clinically meaningful threshold <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>.`],
 [3,`Which statement about BPD psychotherapies is best supported?`,[`DBT is proven superior to all others`,`No psychotherapy has been shown superior to another`,`Only psychoanalysis works`,`Psychotherapy is not recommended`],1,`APA 2024 recommends (1B) a structured, evidence-supported psychotherapy <sup class="c" data-ref="APA2024Guideline,Leichsenring2024WP" title="Source 12,300">12,300</sup>.`],
 [3,`Dropout from BPD psychotherapy is about:`,[`0%`,`75%`,`1 in 4, peaking early`,`1 in 100`],2,`22.3–28.2% <sup class="c" data-ref="Iliakis2021,Arntz2023Dropout" title="Source 16,236">16,236</sup>.`],
 [3,`NICE CG78 advises against brief BPD-specific psychological interventions of less than:`,[`3 months, outside a structured service`,`3 days`,`3 years`,`1 week`],0,`Brief interventions should sit within a structured service <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`],
 /* ---- Part 4 ---- */
 [4,`How many medicines does the FDA approve for BPD itself?`,[`Three`,`None`,`One, quetiapine`,`All antipsychotics`],1,`All drug use for BPD is off-label <sup class="c" data-ref="FDA-LabelSearch2026,StoffersWinterling2022" title="Source 149,512">149,512</sup>.`],
 [4,`Cochrane 2022 (46 RCTs) concluded that, compared with placebo, medicines:`,[`Cured BPD`,`Reduced suicide by half`,`Showed no difference on BPD severity, self-harm, suicide-related outcomes or functioning`,`Were all harmful`],2,`Evidence was mostly very low certainty <sup class="c" data-ref="StoffersWinterling2022" title="Source 512">512</sup>.`],
 [4,`NICE CG78 states that antipsychotics should:`,[`Be first-line for all patients`,`Be given lifelong`,`Replace psychotherapy`,`Not be used for medium- or long-term treatment of BPD`],3,`Drugs may be considered for comorbid conditions <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`],
 [4,`Case: a person with BPD in crisis is offered a sedative. NICE CG78 says it should usually be stopped within:`,[`1 week`,`6 months`,`1 year`,`Never`],0,`Short-term only, a single drug, and "fewer tablets more frequently" if overdose risk is significant <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`],
 [4,`APA 2024 suggests (2C) that any psychotropic medicine in BPD be:`,[`Started at the first visit`,`Time-limited, aimed at a measurable target symptom and adjunctive to psychotherapy`,`Increased with every crisis`,`Combined with a benzodiazepine`],1,`And reviewed at least every 6 months (1C) <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>.`],
 [4,`Case: a patient with BPD and no comorbid illness takes four psychotropics started during past crises. The guideline-based next step is:`,[`Add a fifth`,`Stop all at once today`,`Review and reconcile medicines, aiming to reduce unnecessary drugs`,`Never discuss medicines`],2,`APA 2024 (1C) and NICE CG78 both ask for regular review <sup class="c" data-ref="APA2024Guideline,NICE2009" title="Source 12,379">12,379</sup>.`],
 [4,`In the LABILE trial, lamotrigine vs placebo at 52 weeks:`,[`Halved ZAN-BPD`,`Caused remission`,`Was better for self-harm`,`Made no difference (ZAN-BPD 11.3 vs 11.5)`],3,`Not clinically effective or cost-effective <sup class="c" data-ref="Crawford2018LABILE" title="Source 109">109</sup>.`],
 [4,`About what share of inpatients with BPD receive psychotropic medicines?`,[`10%`,`90%`,`50%`,`1%`],1,`Over half receive three or more <sup class="c" data-ref="Bridler2015" title="Source 78">78</sup>.`],
 [4,`The US valproate label states that valproate should not be given to a woman of childbearing potential:`,[`Under any circumstances`,`If she is over 40`,`Unless other medications have failed or are otherwise unacceptable`,`Without food`],2,`Major malformations in about 10% of exposed pregnancies <sup class="c" data-ref="FDA-Depakote,Battino2024EURAP" title="Source 41,148">41,148</sup>.`],
 [4,`Benzodiazepines are not generally recommended in BPD because of:`,[`Weight gain`,`Hair loss`,`Neutropenia`,`Disinhibition, misuse and dependence`],3,`And the highest suicidal-behaviour hazard in Swedish registry data (HR 1.61) <sup class="c" data-ref="APA2024Guideline,Lieslehto2023Suicide" title="Source 12,307">12,307</sup>.`],
 [4,`The 2025 meta-analytic estimate of suicide in BPD (a population statistic) is about:`,[`6%`,`0.1%`,`50%`,`25%`],0,`Suicidal behaviour declines markedly over time, and treatment helps <sup class="c" data-ref="Lak2025,Soloff2019Suicidal" title="Source 291,495">291,495</sup>.`],
 [4,`Case: an ED nurse is asked to score a suicide risk scale to decide whether to discharge. NICE NG225 advises:`,[`Discharge if the score is low`,`Do not use risk scales or low/medium/high stratification to decide treatment; use a risk formulation`,`Use two scales instead of one`,`Admit everyone`],1,`Risk scales have a positive predictive value for suicide of only 5.5% <sup class="c" data-ref="NICE2022NG225,Carter2017PPV" title="Source 86,380">86,380</sup>.`],
 [4,`Safety planning-type interventions reduce suicidal behaviour by about:`,[`0%`,`90%`,`43% (RR 0.57; NNT 16)`,`They increase it`],2,`No effect on suicidal ideation was found <sup class="c" data-ref="Nuij2021" title="Source 391">391</sup>.`],
 [4,`Case: a person attends the ED after self-harm and has been drinking. NICE NG225 says the psychosocial assessment should:`,[`Wait until the next day`,`Wait until blood alcohol is zero`,`Be skipped`,`Not be delayed because of alcohol levels, and happen alongside physical care`],3,`Hold it in a private area where the person cannot be overheard <sup class="c" data-ref="NICE2022NG225,NICE2022SelfHarm" title="Source 380,381">380,381</sup>.`],
 [4,`Brief admission by self-referral, compared with usual care, in its RCT:`,[`Did not reduce hospital days`,`Halved hospital days`,`Increased compulsory admission`,`Was never tested`],0,`Within-group falls in compulsory admission days and NSSI were seen only in the brief-admission group <sup class="c" data-ref="Westling2019BA" title="Source 549">549</sup>.`],
 [4,`The "Papageno effect" refers to:`,[`More suicides after celebrity reports`,`Fewer suicides linked to stories of coping with suicidal thoughts`,`A drug side effect`,`A DBT skill`],1,`Reporting methods, in contrast, is linked to higher risk <sup class="c" data-ref="Niederkrotenthaler2010,Niederkrotenthaler2020" title="Source 383,384">383,384</sup>.`],
 [4,`NICE NG225 states that drug treatment as a specific intervention to reduce self-harm should:`,[`Be first-line`,`Be lifelong`,`Not be offered`,`Use clozapine`],2,`Specialist psychotherapies reduce self-harm <sup class="c" data-ref="NICE2022NG225,Storebo2020" title="Source 380,514">380,514</sup>.`],
 [4,`The multicentre phase 2 trial of brexpiprazole in BPD:`,[`Led to FDA approval`,`Showed large benefit`,`Was never run`,`Missed its primary endpoint, with more akathisia`],3,`Akathisia 14.0% vs 1.2% <sup class="c" data-ref="Rothman2024Brexpiprazole" title="Source 439">439</sup>.`],
 [4,`Ketamine, psilocybin and brain stimulation for BPD are best described as:`,[`Early and unproven`,`Approved first-line treatments`,`Proven harmful`,`Proven cures`],0,`Small trials only; none is an established treatment <sup class="c" data-ref="Konstantinou2021rTMS,Fineberg2023Ketamine,Grant2026Psilocybin" title="Source 157,186,278">157,186,278</sup>.`],
 [4,`In the US, a person in suicidal crisis can call or text:`,[`411`,`988`,`116 123`,`999 only`],1,`The 988 Suicide & Crisis Lifeline; in the UK and Ireland, Samaritans on 116 123 <sup class="c" data-ref="SAMHSA988,Samaritans116123" title="Source 447,449">447,449</sup>.`],
 /* ---- Part 5 ---- */
 [5,`In MSAD, how many people with BPD had remitted by 6 years?`,[`5.9%`,`20%`,`68.6%`,`100%`],2,`34.5% at 2 years and 49.4% at 4; only 5.9% of remitters had a recurrence <sup class="c" data-ref="Zanarini2003Course" title="Source 574">574</sup>.`],
 [5,`At 16 years in MSAD, 2-year remission vs 2-year recovery was:`,[`10% vs 90%`,`50% vs 50%`,`60% vs 99%`,`99% vs 60%`],3,`Recovery adds good social and vocational functioning <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup>.`],
 [5,`Which symptoms of BPD typically fade fastest?`,[`Impulsive symptoms such as self-harm`,`Chronic emptiness`,`Chronic anger`,`Abandonment worries`],0,`Affective (temperamental) symptoms persist longest <sup class="c" data-ref="Zanarini2007Subsyndromal,Zanarini2016Fluidity" title="Source 582,596">582,596</sup>.`],
 [5,`The strongest comorbidity predictor of BPD remission and recovery is the absence of:`,[`Anxiety`,`A substance use disorder`,`Insomnia`,`Asthma`],1,`Getting help for alcohol or drug use is one of the most useful steps toward recovery <sup class="c" data-ref="Zanarini2004AxisI,Zanarini2024Comorbid" title="Source 578,600">578,600</sup>.`],
 [5,`In CLPS over 10 years:`,[`No one remitted`,`Everyone recovered fully`,`85% remitted, 12% relapsed, social functioning stayed impaired`,`Remission required medication`],2,`Remission and recovery are different things <sup class="c" data-ref="Gunderson2011" title="Source 204">204</sup>.`],
 [5,`Failure to remit or recover from BPD is associated with:`,[`Better physical health`,`Lower medical costs`,`No physical differences`,`Obesity, diabetes, osteoarthritis and chronic pain`],3,`Physical health is part of recovery <sup class="c" data-ref="Frankenburg2004Medical,Keuroghlian2013Medical" title="Source 170,261">170,261</sup>.`],
 [5,`Carers of people with BPD report burden about how much higher than carers of people with other serious mental illnesses?`,[`Half a standard deviation`,`No difference`,`Lower`,`Ten times`],0,`A common reaction, not a failure <sup class="c" data-ref="Bailey2013,Bailey2014" title="Source 23,24">23,24</sup>.`],
 [5,`Case: a parent asks what might help them as a carer. Which programme has the most family-specific evidence?`,[`Brief admission`,`Family Connections, a 12-week DBT-based programme`,`Lamotrigine`,`A risk scale`],1,`It reduced burden and grief in controlled and uncontrolled studies, though not superior to active usual care in its RCT <sup class="c" data-ref="Hoffman2005,Flynn2017,Guillen2024" title="Source 158,196,225">158,196,225</sup>.`],
 [5,`More knowledge about BPD alone, in one family study, went with:`,[`Less burden`,`No change`,`More burden and hostility`,`Recovery`],2,`The source and accuracy of information matter <sup class="c" data-ref="Hoffman2003" title="Source 224">224</sup>.`],
 [5,`Case: a ward manager wants a simple, evidence-based way to reduce conflict and containment. Which has RCT evidence?`,[`Removing all activities`,`Longer observation periods`,`Seclusion protocols`,`Safewards`],3,`15% fewer conflict and 23.2% fewer containment events <sup class="c" data-ref="Bowers2015" title="Source 76">76</sup>.`],
 [5,`Training for nurses about BPD changes which outcome most?`,[`Knowledge`,`Feelings`,`Salary`,`Nothing`],0,`Effects were largest for knowledge, smaller for feelings <sup class="c" data-ref="Dickens2016Interventions" title="Source 119">119</sup>.`],
 [5,`Case: a community nurse is planning a person's move between services. NICE CG78 advises:`,[`Ending contact without notice`,`Discussing and structuring the change beforehand, keeping access to crisis services`,`Discharging during a crisis`,`Avoiding the topic`],1,`Endings and transitions may evoke strong emotions <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`],
 [5,`Before considering an acute admission, NICE CG78 advises first:`,[`Prescribing antipsychotics`,`A risk scale`,`Referral to a crisis resolution and home treatment team`,`Discharge`],2,`Agree the length and purpose of any admission in advance <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`],
 [5,`In MOBY, which helped young people with BPD most clearly?`,[`Specialist psychotherapy added to everything`,`Medication`,`Longer admissions`,`A dedicated youth service (HYPE) improving attendance and completion`],3,`Completion 47.8% vs 19.2% in general youth services; added psychotherapy gave no extra functional benefit <sup class="c" data-ref="Chanen2022MOBY" title="Source 97">97</sup>.`],
 [5,`In BPD, intimate partner violence should be assessed:`,[`In both directions: perpetration and victimisation`,`Only as victimisation`,`Only as perpetration`,`Never`],0,`BPD and antisocial personality disorder show the most robust links with both <sup class="c" data-ref="Collison2021" title="Source 108">108</sup>.`],
 [5,`People with BPD receiving US disability income (SSDI):`,[`Never come off it`,`Often do: 40% came off it`,`Cannot work`,`Are rare`],1,`Disability status was fluid <sup class="c" data-ref="Zanarini2009" title="Source 585">585</sup>.`],
 [5,`In clinical perinatal samples, the pooled prevalence of BPD was about:`,[`0.1%`,`50%`,`14%`,`90%`],2,`0.7–1.7% in non-clinical perinatal samples <sup class="c" data-ref="Prasad2022" title="Source 418">418</sup>.`],
 [5,`Who should professionals working with people with BPD have routine access to, according to NICE CG78?`,[`Legal counsel`,`Security staff`,`Pharmaceutical representatives`,`Supervision and staff support`],3,`NG225 adds reflective practice for staff working with self-harm <sup class="c" data-ref="NICE2009,NICE2022SelfHarm" title="Source 379,381">379,381</sup>.`],
 /* ---- Part 6 ---- */
 [6,`Who described the "border line group of neuroses" in 1938?`,[`Adolph Stern`,`Otto Kernberg`,`Marsha Linehan`,`John Gunderson`],0,`Between neurosis and psychosis <sup class="c" data-ref="Stern1938" title="Source 508">508</sup>.`],
 [6,`Kernberg's 1967 concept was:`,[`Dialectical behaviour therapy`,`Borderline personality organisation`,`Mentalizing`,`Schema modes`],1,`With primitive defences such as splitting and identity diffusion <sup class="c" data-ref="Kernberg1967,Gunderson2009Ontogeny" title="Source 203,259">203,259</sup>.`],
 [6,`BPD entered the DSM in:`,[`DSM-I, 1952`,`DSM-5, 2013`,`DSM-III, 1980`,`DSM-5-TR, 2022`],2,`After Spitzer's 1979 criteria study <sup class="c" data-ref="Spitzer1979,Leichsenring2024WP" title="Source 300,496">300,496</sup>.`],
 [6,`Bateman and Fonagy's 1999 partial-hospitalisation trial was the forerunner of:`,[`DBT`,`STEPPS`,`Schema therapy`,`Mentalization-based treatment`],3,`It cut suicidal acts, self-harm and inpatient days vs standard care <sup class="c" data-ref="Bateman1999" title="Source 34">34</sup>.`]
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
 ["6D10 · personality disorder (ICD-11)",`The single ICD-11 personality disorder code, graded mild (6D10.0), moderate (6D10.1) or severe (6D10.2) <sup class="c" data-ref="Sharan2023" title="Source 473">473</sup>.`,"icd"],
 ["988 Suicide & Crisis Lifeline",`The US line offering free, confidential support 24/7 by call, text or chat to 988 <sup class="c" data-ref="SAMHSA988" title="Source 449">449</sup>.`,"crisis"],
 ["Abandonment fears (criterion 1)",`Frantic efforts to avoid real or imagined abandonment. Suicidal or self-harming behaviour is not counted here <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`,"criteria"],
 ["Acute vs temperamental symptoms",`MSAD's split between symptoms such as self-injury, which resolve faster, and chronic anger or abandonment concerns, which resolve slowly <sup class="c" data-ref="Zanarini2005MSAD" title="Source 580">580</sup>.`,"course"],
 ["Affective instability (criterion 6)",`Marked reactivity of mood, usually lasting a few hours and only rarely more than a few days <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>; the most sensitive criterion (92.8%) <sup class="c" data-ref="Zimmerman2017BJP" title="Source 607">607</sup>.`,"criteria"],
 ["Aftercare",`Follow-up after self-harm; NICE NG225 asks for initial aftercare within 48 hours if there are ongoing safety concerns <sup class="c" data-ref="NICE2022SelfHarm" title="Source 381">381</sup>.`,"crisis"],
 ["Akathisia",`An inner restlessness caused by some antipsychotics; 14.0% vs 1.2% on placebo in the brexpiprazole phase 2 trial <sup class="c" data-ref="Rothman2024Brexpiprazole" title="Source 439">439</sup>.`,"meds"],
 ["ALSPAC",`A UK birth cohort; in it, chronic peer victimisation gave OR 5.44 for BPD symptoms at age 11 <sup class="c" data-ref="Wolke2012" title="Source 564">564</sup>.`,"causes"],
 ["Alternative Model for Personality Disorders (AMPD)",`DSM-5-TR Section III model: impairment in personality functioning (Criterion A) plus pathological traits (Criterion B) <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`,"icd"],
 ["Amygdala",`A threat-detection region; meta-analytic volume about 13% smaller in BPD <sup class="c" data-ref="Ruocco2012" title="Source 441">441</sup>, with hyperactivity to negative stimuli in unmedicated samples <sup class="c" data-ref="Schulze2016" title="Source 465">465</sup>.`,"brain"],
 ["Anankastia",`The ICD-11 trait domain of perfectionism and rigid control; only weakly linked with BPD symptoms <sup class="c" data-ref="Bach2018BMC,Mulder2020" title="Source 21,356">21,356</sup>.`,"icd"],
 ["Anterior cingulate cortex",`A frontal region involved in regulating emotion and pain; reduced activity during heat pain in BPD supports an attentional-shift account (Early evidence) <sup class="c" data-ref="Niedtfeld2010" title="Source 385">385</sup>.`,"brain"],
 ["APA 2024 practice guideline",`The American Psychiatric Association's guideline for BPD; it recommends (1B) structured, evidence-supported psychotherapy <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>.`,"compare"],
 ["Attachment, insecure",`Every study in a 13-study review linked BPD with insecure attachment, especially unresolved, preoccupied and fearful types <sup class="c" data-ref="Agrawal2004" title="Source 3">3</sup>.`,"causes"],
 ["Benzodiazepines",`Sedatives not generally recommended in BPD because of disinhibition, misuse and dependence <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>; HR 1.61 for suicidal behaviour in Swedish registry data <sup class="c" data-ref="Lieslehto2023Suicide" title="Source 307">307</sup>.`,"meds"],
 ["Biosocial model",`Linehan's theory: BPD arises when an emotionally vulnerable child grows up in an invalidating environment <sup class="c" data-ref="Crowell2009" title="Source 112">112</sup>.`,"causes"],
 ["Bipolar disorder",`Mood episodes lasting days to weeks; BPD occurs in 21.6% of people with bipolar disorder, and bipolar in 18.5% of people with BPD <sup class="c" data-ref="Fornaro2016,Paris2015" title="Source 166,401">166,401</sup>.`,"differential"],
 ["BOOTS trial",`A Dutch RCT of DBT vs schema therapy in 204 outpatients: no significant difference in BPD severity at 3 years <sup class="c" data-ref="Wibbelink2026BOOTS" title="Source 553">553</sup>.`,"compare"],
 ["Borderline pattern (6D11.5)",`An optional ICD-11 specifier, defined by 5 of 9 features adapted from DSM BPD criteria <sup class="c" data-ref="Sharan2023,Bach2018BMC" title="Source 21,473">21,473</sup>.`,"icd"],
 ["Borderline personality disorder (BPD)",`A pervasive pattern of instability in relationships, self-image and affects, with marked impulsivity, beginning by early adulthood <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`,"what"],
 ["Borderline personality organisation",`Kernberg's 1967 concept: a middle level of organisation with primitive defences, identity diffusion and lapses in reality testing <sup class="c" data-ref="Kernberg1967" title="Source 259">259</sup>.`,"history"],
 ["BPQ (Borderline Personality Questionnaire)",`A youth screen: sensitivity 0.68, specificity 0.90 in 15–25-year-olds; it "is not a replacement for clinical diagnosis" <sup class="c" data-ref="Chanen2008" title="Source 90">90</sup>.`,"assess"],
 ["Brain stimulation (rTMS)",`Repetitive transcranial magnetic stimulation; 8 small studies (63 patients) found it tolerated but not proven effective in BPD (Early evidence) <sup class="c" data-ref="Konstantinou2021rTMS" title="Source 278">278</sup>.`,"frontier"],
 ["Brexpiprazole",`An antipsychotic whose multicentre phase 2 trial in BPD missed its primary endpoint <sup class="c" data-ref="Rothman2024Brexpiprazole" title="Source 439">439</sup>.`,"meds"],
 ["Brief admission by self-referral",`A contract-based stay of up to 3 days that the person can request; its RCT did not reduce hospital days <sup class="c" data-ref="Liljedahl2017BA,Westling2019BA" title="Source 308,549">308,549</sup>.`,"crisis"],
 ["BSL-23 (Borderline Symptom List)",`A 23-item self-rated severity scale; mean scores run 0–4, and 1.50 best separated BPD from other disorders <sup class="c" data-ref="Bohus2009,Kleindienst2020" title="Source 64,269">64,269</sup>.`,"assess"],
 ["Candidate gene",`A gene studied because of a biological hunch; 5-HTTLPR and other serotonin candidates showed no association with BPD <sup class="c" data-ref="Calati2013,Amad2014" title="Source 7,83">7,83</sup>.`,"genes"],
 ["Carer burden",`The practical and emotional load of caring; about half an SD higher in carers of people with BPD than of people with other serious mental illnesses <sup class="c" data-ref="Bailey2013" title="Source 23">23</sup>.`,"families"],
 ["Chain analysis",`A DBT method that traces what led to a target behaviour and what keeps it going, then finds more skilful alternatives <sup class="c" data-ref="Chapman2006DBT,Lynch2006DBT" title="Source 99,324">99,324</sup>.`,"dbt"],
 ["Childhood adversity",`Abuse, neglect or bullying in childhood; OR 13.91 for BPD vs non-clinical controls, largest for emotional abuse and neglect <sup class="c" data-ref="Porter2020" title="Source 416">416</sup>.`,"causes"],
 ["Chronic emptiness (criterion 7)",`Chronic feelings of emptiness <sup class="c" data-ref="APA2022" title="Source 11">11</sup>; among the most persistent symptoms over time <sup class="c" data-ref="Zanarini2007Subsyndromal" title="Source 582">582</sup>.`,"criteria"],
 ["Chronic vs acute suicide risk",`Paris distinguishes chronic suicidality, often a way of communicating distress, from acute risk <sup class="c" data-ref="Paris2002Chronic" title="Source 400">400</sup>.`,"crisis"],
 ["CLPS",`The Collaborative Longitudinal Personality Disorders Study; 85% of people with BPD remitted and 12% relapsed over 10 years <sup class="c" data-ref="Gunderson2000CLPS,Gunderson2011" title="Source 201,204">201,204</sup>.`,"course"],
 ["Clozapine",`An antipsychotic whose BPD trial (CALMED) closed early with 29 participants, so its main question went unanswered <sup class="c" data-ref="Crawford2022CALMED" title="Source 110">110</sup>.`,"meds"],
 ["Cochrane review",`A systematic review using Cochrane methods; 2020 for psychotherapy (SMD −0.52 on severity) and 2022 for medicines (no benefit over placebo) <sup class="c" data-ref="Storebo2020,StoffersWinterling2022" title="Source 512,514">512,514</sup>.`,"compare"],
 ["Comorbidity",`Co-occurring conditions; in NESARC, lifetime anxiety 84.8%, mood 82.7% and substance use 78.2% in BPD <sup class="c" data-ref="Tomko2014" title="Source 528">528</sup>.`,"differential"],
 ["Complex comorbidity",`A disorder of affect plus a disorder of impulse: a strong marker of BPD <sup class="c" data-ref="Zanarini1998AxisI" title="Source 569">569</sup>.`,"differential"],
 ["Complex PTSD",`A trauma diagnosis with a stably negative self-concept; BPD is separated by abandonment fears, unstable self, unstable relationships and impulsiveness <sup class="c" data-ref="Cloitre2014,Frost2020" title="Source 105,172">105,172</sup>.`,"differential"],
 ["Consultation team (DBT)",`The weekly therapists' meeting that keeps a compassionate stance and reduces burnout <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["Cortisol",`The main stress hormone; continuous output is elevated but the response to social stress blunted in BPD <sup class="c" data-ref="Drews2019" title="Source 134">134</sup>.`,"brain"],
 ["Crisis plan",`A written plan naming triggers, self-management strategies and how to reach services out of hours <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`,"crisis"],
 ["Crisis resolution and home treatment team",`A community team NICE CG78 asks to be offered before an acute admission <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`,"nursing"],
 ["Cyberball",`A virtual ball-tossing game that studies social exclusion; people with BPD feel excluded even when included <sup class="c" data-ref="Renneberg2012,Staebler2011PsycholMed" title="Source 430,498">430,498</sup>.`,"emotion"],
 ["DBT-A",`DBT adapted for adolescents; it reduced self-harm and suicidal ideation vs controls in meta-analysis <sup class="c" data-ref="Kothgassner2021,Mehlum2014" title="Source 281,345">281,345</sup>.`,"dbt"],
 ["DBT-PTSD",`DBT adapted for childhood-abuse PTSD; small advantage over cognitive processing therapy, with less early dropout <sup class="c" data-ref="Bohus2020DBTPTSD" title="Source 65">65</sup>.`,"dbt"],
 ["De-escalation",`Staff-delivered communication, self-regulation, assessment, actions and safety maintenance to reduce aggression with minimal coercion <sup class="c" data-ref="Hallett2017" title="Source 210">210</sup>.`,"nursing"],
 ["Detached protector",`A schema mode of emotional shutting-down; raised more by stress in BPD than in controls <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>.`,"schema"],
 ["Detachment",`An ICD-11 trait domain of social and emotional distance <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup>.`,"icd"],
 ["Diary card",`DBT's weekly self-monitoring form of targets such as self-harm and emotional misery; it sets the session agenda <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["Dialectical behaviour therapy (DBT)",`A modular, hierarchical treatment of individual therapy, skills group, phone coaching and a consultation team <sup class="c" data-ref="LinehanWilks2015" title="Source 312">312</sup>.`,"dbt"],
 ["Dialectics",`DBT's philosophy of balancing acceptance and change, one of its essential elements <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["DIB-R",`The Revised Diagnostic Interview for Borderlines; kappas above 0.75 for the diagnosis <sup class="c" data-ref="Zanarini2002DIBR" title="Source 573">573</sup>.`,"assess"],
 ["Disclosure of diagnosis",`Telling the person their diagnosis; 57% of surveyed psychiatrists had at some point not done so <sup class="c" data-ref="Sisti2016" title="Source 485">485</sup>, now seen as unethical to withhold <sup class="c" data-ref="Sims2022" title="Source 484">484</sup>.`,"assess"],
 ["Disinhibition",`An ICD-11 trait domain: acting rashly on immediate stimuli without considering consequences <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup>.`,"icd"],
 ["Dissociality",`An ICD-11 trait domain of disregard for others' rights and feelings; BPD symptoms map partly onto it <sup class="c" data-ref="Bach2018BMC,Mulder2020" title="Source 21,356">21,356</sup>.`,"icd"],
 ["Dissociation",`Feeling unreal, numb or cut off; it rises with stress, more steeply in BPD <sup class="c" data-ref="Stiglmayr2008" title="Source 510">510</sup>, and predicts poorer DBT response <sup class="c" data-ref="Kleindienst2011" title="Source 268">268</sup>.`,"brain"],
 ["Distress tolerance",`DBT skills for surviving crises without making things worse <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["Dropout",`Leaving therapy early; about 1 in 4 in BPD psychotherapy, highest in the first quarter of treatment <sup class="c" data-ref="Iliakis2021,Arntz2023Dropout" title="Source 16,236">16,236</sup>.`,"compare"],
 ["DSM-5-TR",`The 2022 revision of the APA's manual; it keeps BPD as a categorical diagnosis <sup class="c" data-ref="APA2022" title="Source 11">11</sup>.`,"criteria"],
 ["DSM-III",`The 1980 manual that introduced BPD, after Spitzer's 1979 study <sup class="c" data-ref="Spitzer1979,Leichsenring2024WP" title="Source 300,496">300,496</sup>.`,"history"],
 ["Early intervention",`Recognising and helping BPD in young people; justified because BPD is common, disabling and treatable <sup class="c" data-ref="Chanen2013,Fonagy2015" title="Source 92,161">92,161</sup>.`,"frontier"],
 ["Ecological momentary assessment (EMA)",`Repeated phone or e-diary ratings in daily life, which show mood shifts in BPD clearly <sup class="c" data-ref="Trull2008,Santangelo2014" title="Source 455,534">455,534</sup>.`,"emotion"],
 ["Emotion dysregulation",`Difficulty regulating intense emotion; a path from invalidation through dysregulation explained 38% of BPD features in one cross-sectional study (Early evidence) <sup class="c" data-ref="Sturrock2014" title="Source 518">518</sup>.`,"emotion"],
 ["Emotion regulation (DBT module)",`DBT skills for understanding and changing intense emotions <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["Emotion regulation group therapy (ERGT)",`A 14-week add-on group that reduced self-harm and emotion dysregulation in women with BPD <sup class="c" data-ref="Gratz2014ERGT" title="Source 188">188</sup>.`,"gpm"],
 ["Emotional overinvolvement",`A component of expressed emotion; 69.6% of carers reported it high, linked with more burden <sup class="c" data-ref="Bailey2015" title="Source 25">25</sup>.`,"families"],
 ["Emotional vulnerability",`High sensitivity, high intensity and a slow return to baseline <sup class="c" data-ref="Crowell2009,Kuo2009" title="Source 112,289">112,289</sup>.`,"emotion"],
 ["Epistemic trust",`Openness to trusting knowledge from others; Fonagy proposes epistemic hypervigilance can follow adverse social learning (Hypothesis) <sup class="c" data-ref="Fonagy2017b" title="Source 163">163</sup>.`,"causes"],
 ["EURAP",`An international pregnancy registry; major malformations in 9.9% with valproate vs 3.1% with lamotrigine <sup class="c" data-ref="Battino2024EURAP" title="Source 41">41</sup>.`,"meds"],
 ["Expressed emotion",`Criticism and emotional overinvolvement in families; 82.9% of carers reported high criticism <sup class="c" data-ref="Bailey2015" title="Source 25">25</sup>.`,"families"],
 ["Family Connections",`A 12-week DBT-based programme for relatives, led by trained family members <sup class="c" data-ref="Hoffman2005,Flynn2017" title="Source 158,225">158,225</sup>.`,"families"],
 ["General psychiatric management (GPM)",`A once-weekly generalist model emphasising psychoeducation and social adaptation; equal to DBT in McMain 2009 <sup class="c" data-ref="Gunderson2018GPM,McMain2009" title="Source 208,338">208,338</sup>.`,"gpm"],
 ["Genetic correlation",`Shared genetic influence between traits; BPD's strongest are with PTSD, depression and ADHD <sup class="c" data-ref="Streit2026" title="Source 517">517</sup>.`,"genes"],
 ["GWAS",`A genome-wide association study; the largest in BPD found 11 loci in 12,339 cases <sup class="c" data-ref="Streit2026" title="Source 517">517</sup>.`,"genes"],
 ["Hallucinations in BPD",`Reported by about 43% of outpatients, without the negative symptoms of primary psychosis <sup class="c" data-ref="Niemantsverdriet2017" title="Source 387">387</sup>.`,"differential"],
 ["Healthy adult mode",`The schema mode therapy aims to strengthen; weak in BPD <sup class="c" data-ref="Arntz2005Modes,Lobbestael2005" title="Source 14,313">14,313</sup>.`,"schema"],
 ["Heritability",`The share of differences between people linked to genes; estimates for BPD run from 42% to about .69 <sup class="c" data-ref="Distel2008,Torgersen2000" title="Source 124,530">124,530</sup>.`,"genes"],
 ["Hippocampus",`A memory region; meta-analytic volume about 11% smaller in BPD <sup class="c" data-ref="Ruocco2012" title="Source 441">441</sup>.`,"brain"],
 ["HPA axis",`The hypothalamic–pituitary–adrenal stress system; continuous cortisol raised, stress response blunted in BPD <sup class="c" data-ref="Drews2019" title="Source 134">134</sup>.`,"brain"],
 ["HYPE",`Helping Young People Early, an Australian youth BPD service that improved attendance and completion in MOBY <sup class="c" data-ref="Chanen2022MOBY" title="Source 97">97</sup>.`,"gpm"],
 ["Hypermentalizing",`Excessive, inaccurate attribution of mental states to others; not specific to BPD <sup class="c" data-ref="Sharp2011,McLaren2022" title="Source 337,474">337,474</sup>.`,"brain"],
 ["ICD-10 F60.31",`Emotionally unstable personality disorder, borderline type, the ICD-10 code used in Danish register studies <sup class="c" data-ref="Kjaer2020" title="Source 264">264</sup>.`,"icd"],
 ["ICD-11",`The WHO classification in use since 2022; one personality disorder graded by severity, with trait domains <sup class="c" data-ref="Reed2019,Tyrer2019" title="Source 425,540">425,540</sup>.`,"icd"],
 ["Idealisation and devaluation (criterion 2)",`Unstable, intense relationships alternating between extremes <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`,"criteria"],
 ["Identity disturbance (criterion 3)",`A markedly and persistently unstable self-image or sense of self <sup class="c" data-ref="APA2022" title="Source 11">11</sup>; one of the most central symptoms in networks <sup class="c" data-ref="Peters2023" title="Source 410">410</sup>.`,"criteria"],
 ["Impulsivity (criterion 4)",`In at least two potentially self-damaging areas, such as spending, sex, substances, reckless driving or binge eating <sup class="c" data-ref="APA2022,Kaess2025" title="Source 11,251">11,251</sup>.`,"criteria"],
 ["Inappropriate anger (criterion 8)",`Intense anger or difficulty controlling anger <sup class="c" data-ref="APA2022" title="Source 11">11</sup>; among the most persistent symptoms <sup class="c" data-ref="Zanarini2016Fluidity" title="Source 596">596</sup>.`,"criteria"],
 ["Interpersonal effectiveness",`DBT skills for asking for what you need and keeping relationships and self-respect <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["Intimate partner violence",`BPD shows robust links with both perpetration and victimisation; assess safety in both directions <sup class="c" data-ref="Collison2021" title="Source 108">108</sup>.`,"living"],
 ["Invalidating environment",`One intolerant of a child's private emotional experience, especially emotions not backed by observable events <sup class="c" data-ref="Crowell2009" title="Source 112">112</sup>.`,"causes"],
 ["IPDE",`The International Personality Disorder Examination, a semi-structured interview tested in a WHO field trial <sup class="c" data-ref="Loranger1994" title="Source 317">317</sup>.`,"assess"],
 ["Joint crisis plan",`A crisis plan agreed with the team; no difference in self-harm at 6 months in its RCT <sup class="c" data-ref="Borschmann2013JCP" title="Source 71">71</sup>.`,"crisis"],
 ["Ketamine",`An anaesthetic tested in one small BPD RCT (n = 22) with no significant effect on suicidal ideation vs midazolam (Early evidence) <sup class="c" data-ref="Fineberg2023Ketamine" title="Source 157">157</sup>.`,"frontier"],
 ["LABILE trial",`A UK RCT of lamotrigine in 276 adults with BPD: no better than placebo at 52 weeks <sup class="c" data-ref="Crawford2018LABILE" title="Source 109">109</sup>.`,"meds"],
 ["Lamotrigine",`An anticonvulsant; no benefit in LABILE, and a boxed warning for serious rash <sup class="c" data-ref="Crawford2018LABILE,FDA-Lamictal" title="Source 109,150">109,150</sup>.`,"meds"],
 ["Lifetime prevalence",`The share who have had a condition at any point; 5.9% for BPD in NESARC Wave 2, or 2.7% when distress or impairment was required <sup class="c" data-ref="Grant2008,Tomko2014" title="Source 184,528">184,528</sup>.`,"what"],
 ["MBT-A",`MBT for adolescents; it reduced self-harm and depression more than usual care <sup class="c" data-ref="Rossouw2012MBTA" title="Source 438">438</sup>.`,"mbt"],
 ["McLean Screening Instrument (MSI-BPD)",`A 10-item yes/no screen; cut-off 7, sensitivity 0.81, specificity 0.85 <sup class="c" data-ref="Zanarini2003MSI" title="Source 575">575</sup>.`,"assess"],
 ["Medication reconciliation",`Reviewing every medicine; APA 2024 recommends (1C) at least every 6 months in BPD <sup class="c" data-ref="APA2024Guideline" title="Source 12">12</sup>.`,"meds"],
 ["Memantine",`An NMDA antagonist; one 8-week exploratory RCT (33 people) reduced ZAN-BPD vs placebo (Early evidence) <sup class="c" data-ref="Kulkarni2018Memantine" title="Source 288">288</sup>.`,"frontier"],
 ["Mentalization-based treatment (MBT)",`A time-limited therapy structured to strengthen mentalizing <sup class="c" data-ref="Bateman2010WP" title="Source 38">38</sup>.`,"mbt"],
 ["Mentalizing",`Understanding oneself and others in terms of internal mental states <sup class="c" data-ref="Luyten2020" title="Source 323">323</sup>.`,"mbt"],
 ["Mindfulness",`DBT's core skill of attention to the present moment <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["MOBY trial",`An Australian trial in 139 young people; a dedicated service improved engagement, but added psychotherapy did not improve functioning <sup class="c" data-ref="Chanen2022MOBY" title="Source 97">97</sup>.`,"frontier"],
 ["Mother–Infant DBT",`A 25-week group in which mothers learn skills; depression, anxiety and BPD symptoms improved <sup class="c" data-ref="SvedWilliams2021" title="Source 519">519</sup>.`,"families"],
 ["MSAD",`The McLean Study of Adult Development: 290 inpatients with BPD followed every 2 years from 1992–1995 <sup class="c" data-ref="Temes2019,Zanarini2005MSAD" title="Source 523,580">523,580</sup>.`,"course"],
 ["MSSD",`Mean squared successive difference, a preferred EMA index of instability because it captures temporal order <sup class="c" data-ref="Jahng2008" title="Source 239">239</sup>.`,"emotion"],
 ["NESARC",`A large US population survey; BPD lifetime prevalence 5.9% in Wave 2 <sup class="c" data-ref="Grant2008" title="Source 184">184</sup>.`,"what"],
 ["Negative affectivity",`The ICD-11 trait domain of frequent, intense negative emotions out of proportion to the situation <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup>.`,"icd"],
 ["Negative predictive value (NPV)",`The chance someone with a negative result does not have the condition; 99% for absent affective instability <sup class="c" data-ref="Zimmerman2017BJP" title="Source 607">607</sup>.`,"assess"],
 ["Neuroticism",`A normal personality trait; BPD's genetic liability is shared with high neuroticism and low agreeableness <sup class="c" data-ref="Distel2009" title="Source 125">125</sup>.`,"genes"],
 ["NICE CG78",`The 2009 English guideline on BPD, the first national guideline <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`,"nursing"],
 ["NICE NG225",`The 2022 English self-harm guideline; it advises against risk scales for predicting suicide <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup>.`,"crisis"],
 ["Non-inferiority trial",`A trial testing whether a new option is not meaningfully worse; McMain 2022 showed 6 months of DBT non-inferior to 12 <sup class="c" data-ref="McMain2022" title="Source 341">341</sup>.`,"compare"],
 ["Non-suicidal self-injury (NSSI)",`Self-injury without suicidal intent; its main function is short-term relief from intense negative emotion <sup class="c" data-ref="Klonsky2007,Kleindienst2008" title="Source 267,271">267,271</sup>.`,"crisis"],
 ["Off-label",`Use of a medicine for a condition not on its label; all drug use for BPD is off-label <sup class="c" data-ref="StoffersWinterling2022" title="Source 512">512</sup>.`,"meds"],
 ["Olanzapine",`An antipsychotic with a modest ZAN-BPD advantage at 5–10 mg/day and about 3 kg weight gain in 12 weeks <sup class="c" data-ref="Zanarini2011Olanzapine" title="Source 590">590</sup>.`,"meds"],
 ["Opioid hypothesis",`The proposal that altered endogenous opioid signalling underlies part of BPD (Hypothesis) <sup class="c" data-ref="Bandelow2010" title="Source 28">28</sup>.`,"brain"],
 ["Oxytocin",`A social hormone; single-dose lab studies show mixed effects in BPD, and no clinical benefit is shown (Early evidence) <sup class="c" data-ref="Bertsch2013Oxytocin,Bartz2011Oxytocin" title="Source 32,50">32,50</sup>.`,"frontier"],
 ["PAI-BOR",`The Personality Assessment Inventory Borderline Features scale; a T-score of 70 or more classified 73% correctly <sup class="c" data-ref="Stein2007PAI" title="Source 504">504</sup>.`,"assess"],
 ["Papageno effect",`Fewer suicides linked to stories of people coping with suicidal thoughts (Early evidence) <sup class="c" data-ref="Niederkrotenthaler2010" title="Source 383">383</sup>.`,"crisis"],
 ["Paranoid ideation, stress-related (criterion 9)",`Transient, stress-related paranoid ideation or severe dissociative symptoms <sup class="c" data-ref="APA2022" title="Source 11">11</sup>.`,"criteria"],
 ["Partial hospitalisation",`Day-hospital treatment; the setting of Bateman and Fonagy's 1999 trial, forerunner of MBT <sup class="c" data-ref="Bateman1999" title="Source 34">34</sup>.`,"mbt"],
 ["Peer support worker",`A worker with lived experience who supports people with BPD or carers <sup class="c" data-ref="Barr2020" title="Source 30">30</sup>.`,"living"],
 ["Person-first language",`Saying "people with BPD" and describing behaviour, not character; stigmatising language hurts <sup class="c" data-ref="vanSchie2024,Sheehan2016" title="Source 477,543">477,543</sup>.`,"what"],
 ["Personality difficulty (QE50.7)",`An ICD-11 code below the disorder threshold, not classified as a mental disorder <sup class="c" data-ref="Sharan2023,Bach2018BMC" title="Source 21,473">21,473</sup>.`,"icd"],
 ["Phone coaching",`Between-session calls to the DBT therapist to apply skills when they are most needed <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["Polygenic score",`A sum of many small genetic effects; for BPD it explains 4.6% of variance, too little to predict for individuals <sup class="c" data-ref="Streit2026" title="Source 517">517</sup>.`,"genes"],
 ["Polypharmacy",`Taking several medicines at once; 54% of European inpatients with BPD took three or more <sup class="c" data-ref="Bridler2015" title="Source 78">78</sup>.`,"meds"],
 ["Polythetic criteria",`A rule met by any subset (5 of 9), giving 256 combinations <sup class="c" data-ref="Mulay2019" title="Source 355">355</sup>.`,"criteria"],
 ["Positive predictive value (PPV)",`The chance a positive result is a true case; it falls with prevalence, about 5% for MSI-BPD at 1% prevalence <sup class="c" data-ref="Zanarini2003MSI,Ellison2018" title="Source 144,575">144,575</sup>.`,"assess"],
 ["Pretend mode",`Appearing to mentalize while cut off from real inner states and reality <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>.`,"mbt"],
 ["Psilocybin",`A psychedelic; one open-label study of 9 adults lowered depression but not BPD scores (Hypothesis-generating) <sup class="c" data-ref="Grant2026Psilocybin" title="Source 186">186</sup>.`,"frontier"],
 ["Psychic equivalence",`Treating inner experience as if it were outer reality <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>.`,"mbt"],
 ["Psychoeducation",`Learning about BPD; a workshop within a week of diagnosis reduced impulsivity and stormy relationships <sup class="c" data-ref="Zanarini2008Psychoed" title="Source 583">583</sup>.`,"assess"],
 ["Psychosocial assessment",`A needs-focused assessment after self-harm, not delayed by medical treatment or alcohol levels <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup>.`,"nursing"],
 ["Punitive parent",`A harsh, self-critical schema mode characteristic of BPD <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>.`,"schema"],
 ["Recovery",`Remission plus good social and vocational functioning; reached by 60% at 16 years in MSAD <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup>.`,"course"],
 ["Recurrence",`Return of the diagnosis after remission; only 5.9% of MSAD remitters at 6 years <sup class="c" data-ref="Zanarini2003Course" title="Source 574">574</sup>.`,"course"],
 ["Referral bias",`Distortion from who reaches clinics; it explains much of the female excess in clinical samples <sup class="c" data-ref="Skodol2003" title="Source 486">486</sup>.`,"what"],
 ["Reflective functioning",`A measure of mentalizing; very large deficit in BPD (d = 1.68) <sup class="c" data-ref="Bora2021" title="Source 67">67</sup>.`,"brain"],
 ["Rejection sensitivity",`Anxious expectation of rejection; pooled r = 0.326 with BPD <sup class="c" data-ref="Foxhall2019" title="Source 168">168</sup>.`,"emotion"],
 ["Remission",`No longer meeting the criteria; 99% reached a 2-year remission by 16 years in MSAD <sup class="c" data-ref="Zanarini2012" title="Source 592">592</sup>.`,"course"],
 ["Respiratory sinus arrhythmia (RSA)",`Heart-rate variability with breathing, a marker of regulation; low at rest in BPD <sup class="c" data-ref="Kuo2009" title="Source 289">289</sup>.`,"emotion"],
 ["Risk formulation",`An individual understanding of risk within every psychosocial assessment, which NICE NG225 prefers to risk scales <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup>.`,"crisis"],
 ["Risk scales",`Checklists scoring suicide risk; pooled PPV for suicide only 5.5% <sup class="c" data-ref="Carter2017PPV" title="Source 86">86</sup>, not to be used to predict suicide <sup class="c" data-ref="NICE2022NG225" title="Source 380">380</sup>.`,"crisis"],
 ["Safe messaging",`Talking and writing about suicide without describing methods, with hope and support sources; method reporting raises risk <sup class="c" data-ref="Niederkrotenthaler2020,SamaritansMedia" title="Source 384,448">384,448</sup>.`,"crisis"],
 ["Safety planning",`A prioritised written list of coping strategies and contacts; it cut suicidal behaviour by about 43% <sup class="c" data-ref="Stanley2018ED,Nuij2021" title="Source 391,501">391,501</sup>.`,"crisis"],
 ["Safewards",`Simple ward interventions that cut conflict by 15% and containment by 23.2% <sup class="c" data-ref="Bowers2015" title="Source 76">76</sup>.`,"nursing"],
 ["Samaritans 116 123",`Free support in the UK and Ireland, any time, from any phone <sup class="c" data-ref="Samaritans116123" title="Source 447">447</sup>.`,"crisis"],
 ["Schema mode",`A momentary emotional state and coping style; BPD has four maladaptive modes and a weak healthy adult <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>.`,"schema"],
 ["Schema therapy",`A therapy that maps modes and builds a healthy adult; best as combined individual and group therapy <sup class="c" data-ref="Arntz2022GST" title="Source 15">15</sup>.`,"schema"],
 ["SCID-5-PD",`The Structured Clinical Interview for DSM-5 Personality Disorders; reliable for BPD in a single-country study (Early evidence) <sup class="c" data-ref="Gharraee2022" title="Source 176">176</sup>.`,"assess"],
 ["Self-esteem instability",`Fluctuating self-worth; possibly more specific to BPD than affective instability <sup class="c" data-ref="Kockler2022" title="Source 274">274</sup>.`,"emotion"],
 ["Self-harm",`Any intentional self-injury or self-poisoning; specialist psychotherapies reduce it <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>, and no one should be excluded from care because of it <sup class="c" data-ref="NICE2009" title="Source 379">379</sup>.`,"crisis"],
 ["Sensitivity and specificity",`The share of true cases a test detects, and of non-cases it correctly clears <sup class="c" data-ref="Zanarini2003MSI" title="Source 575">575</sup>.`,"assess"],
 ["Severity (ICD-11)",`Mild, moderate or severe, marked by harm and impairment: mild "typically not", severe "often" associated with harm <sup class="c" data-ref="Bach2018BMC" title="Source 21">21</sup>.`,"icd"],
 ["Skills group",`DBT's weekly class of about 4–10 people, with teaching, practice and homework <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["SNP heritability",`Heritability captured by common genetic variants; about 17% for BPD <sup class="c" data-ref="Streit2026" title="Source 517">517</sup>.`,"genes"],
 ["Splitting",`A primitive defence in Kernberg's model, seeing people as all good or all bad <sup class="c" data-ref="Kernberg1967,Gunderson2009Ontogeny" title="Source 203,259">203,259</sup>.`,"history"],
 ["Standardised mortality ratio (SMR)",`Observed over expected deaths; 8.3 for hospital-treated BPD in Denmark <sup class="c" data-ref="Kjaer2020" title="Source 264">264</sup>.`,"what"],
 ["Standardised mean difference (SMD)",`An effect size in SD units; −0.52 for psychotherapy on BPD severity in Cochrane 2020 <sup class="c" data-ref="Storebo2020" title="Source 514">514</sup>.`,"compare"],
 ["STEPPS",`Systems Training for Emotional Predictability and Problem Solving, a 20-week add-on group involving the support network <sup class="c" data-ref="Blum2008STEPPS" title="Source 60">60</sup>.`,"gpm"],
 ["Stepped care",`Starting brief and stepping up as needed; a whole-service model cut bed days per admission from 13.46 to 4.28 <sup class="c" data-ref="Grenyer2018Stepped" title="Source 189">189</sup>.`,"gpm"],
 ["Stigma",`Unfair negative views; nearly half of 706 clinicians preferred to avoid patients with BPD <sup class="c" data-ref="Black2011Attitudes" title="Source 56">56</sup>.`,"what"],
 ["Structural stigma",`Policies, norms and service design that limit access to care for people with BPD and families <sup class="c" data-ref="Klein2022" title="Source 266">266</sup>.`,"what"],
 ["Structured clinical management (SCM)",`A generalist comparator; both SCM and MBT improved substantially in Bateman 2009 <sup class="c" data-ref="Bateman2009" title="Source 37">37</sup>.`,"mbt"],
 ["Substance use disorder",`Present in about half of people with BPD; its absence best predicts remission <sup class="c" data-ref="Trull2018,Zanarini2024Comorbid" title="Source 536,600">536,600</sup>.`,"differential"],
 ["Supervision",`Routine staff support NICE CG78 asks for; NG225 adds reflective practice <sup class="c" data-ref="NICE2009,NICE2022SelfHarm" title="Source 379,381">379,381</sup>.`,"nursing"],
 ["Supported employment",`Help into work; it helps people with personality disorders find jobs about as often as people with other mental illnesses <sup class="c" data-ref="Juurlink2022" title="Source 249">249</sup>.`,"living"],
 ["Target hierarchy",`DBT's order: life-threatening, then therapy-interfering, then quality-of-life-interfering behaviour <sup class="c" data-ref="Chapman2006DBT" title="Source 99">99</sup>.`,"dbt"],
 ["Teleological mode",`Accepting only physical, goal-directed actions as proof of what someone feels or intends <sup class="c" data-ref="Chung2026" title="Source 102">102</sup>.`,"mbt"],
 ["Theory of mind",`Inferring others' beliefs and intentions; only modestly reduced in BPD (d = 0.36) <sup class="c" data-ref="Bora2021" title="Source 67">67</sup>.`,"brain"],
 ["Therapeutic relationship",`Trust, learning about the disorder and validation were the parts people with BPD valued with community nurses <sup class="c" data-ref="RomeuLabayen2020" title="Source 436">436</sup>.`,"nursing"],
 ["Transactional model",`Fruzzetti's model of child vulnerability and family invalidation shaping each other; it blames no one <sup class="c" data-ref="Fruzzetti2005" title="Source 173">173</sup>.`,"causes"],
 ["Transference-focused psychotherapy (TFP)",`A psychodynamic therapy; it beat experienced community therapists on symptoms and dropout <sup class="c" data-ref="Doering2010,Clarkin2007" title="Source 104,130">104,130</sup>.`,"schema"],
 ["Treatment as usual (TAU)",`The comparator in many trials; small-to-moderate symptom improvement but no change in self-harm in meta-analysis <sup class="c" data-ref="Finch2019TAU" title="Source 156">156</sup>.`,"compare"],
 ["Twin study",`Comparing identical (MZ) and fraternal (DZ) twins to estimate heritability <sup class="c" data-ref="Torgersen2000,Distel2008" title="Source 124,530">124,530</sup>.`,"genes"],
 ["Unique environment",`Experiences not shared by siblings; most of the non-genetic variance in BPD <sup class="c" data-ref="Distel2008" title="Source 124">124</sup>.`,"genes"],
 ["Validation",`Communicating that a person's experience makes sense; a core DBT and nursing skill <sup class="c" data-ref="Lynch2006DBT,RomeuLabayen2020" title="Source 324,436">324,436</sup>.`,"families"],
 ["Valproate",`An anticonvulsant with a boxed warning for malformations and lower IQ after exposure in pregnancy <sup class="c" data-ref="FDA-Depakote,Meador2013NEAD" title="Source 148,343">148,343</sup>.`,"meds"],
 ["Vulnerable child",`The abandoned/abused child schema mode in BPD <sup class="c" data-ref="Arntz2005Modes" title="Source 14">14</sup>.`,"schema"],
 ["ZAN-BPD",`The Zanarini Rating Scale: 9 criteria rated 0–4 by a clinician, total 0–36, over 1 week <sup class="c" data-ref="Zanarini2003ZAN" title="Source 577">577</sup>.`,"assess"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'msi bpd' or 'zan-bpd' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐]/g,'');
  function render(){const q=norm(inp.value.trim());const L=GL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GL_T.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SO_AREAN={A:'Epidemiology, presentation, stigma & history',B:'Causes: genes, temperament, adversity & the biosocial model',C:'Mechanisms: emotion dysregulation, neurobiology & mentalizing',D:'Diagnosis: DSM-5-TR, ICD-11, assessment & differential',E:'Psychological treatments: DBT, MBT, schema therapy, TFP, GPM & their evidence',F:'Medication evidence, crisis care & suicide and self-harm safety',G:'Course, comorbidity, recovery & research toward better treatment',H:'Living, families, work and school & nursing care'};
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
