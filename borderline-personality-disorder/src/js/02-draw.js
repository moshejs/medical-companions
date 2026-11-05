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
