<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('eds:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('eds:'+k,JSON.stringify(v))}catch(e){}}};
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
/* ---- drawing kit for this subject (EDS Companion) ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string
   (or an object with .svg) to concatenate into an <svg>'s innerHTML. Coordinates are user units of the
   caller's viewBox; s is a scale where 1 is the size given below.
   chain(x,y,len,o)        one pro-alpha collagen chain lying left (N-end) to right (C-end) along y: a row of
                           beads in Gly-X-Y triplets (every third bead a small graphite glycine). o: {n (beads,
                           default len/7), col (CSS colour of X/Y beads, default --chain-a), show (0..1 fraction of
                           beads drawn from the left, for a "being made" animation), pro (true: globular N- and
                           C-propeptides at the ends), cut (0..1 propeptides drift off and fade, as when ADAMTS2/BMP1
                           cleave them), sub (bead index drawn as a variant: orange, larger, e.g. a glycine
                           substitution), hyd (0..1 fraction of Y beads with a small hydroxyl dot), wave (amplitude)}.
   helix(x,y,len,o)        a triple helix lying along y from x to x+len: three chains (colours --chain-a, --chain-b,
                           --chain-c, i.e. alpha1, alpha1, alpha2) twisting with over-under crossings. o: {amp (half
                           height, default 7), turns (default len/38), phase (0..1 spins the twist), zip (0..1: how
                           much has wound, from the C-end on the right; the rest lies as three separate strands),
                           kink (0..1 position of a variant kink, drawn orange with a local bulge), w (strand width),
                           cols:[a,b,c]}.
   fibril(x,y,len,o)       collagen molecules packed in a quarter-staggered fibril with D-period banding, lying along
                           y (top edge) for len. o: {rows (default 6), rh (row height, default 6), grow (0..1 fraction
                           of molecules that have joined, in assembly order), irregular (true: uneven rows, gaps and a
                           lumpy outline, as with too little type V collagen), xlink (true: jade cross-link ticks),
                           seed}. Returns {svg, h}.
   joint(x,y,s,o)          a synovial joint seen from the front: a proximal bone from above ending in a rounded head
                           centred at (x,y), a distal bone below with a cartilage-lined socket, a joint capsule and
                           ligaments on both sides, optional muscles. s = scale (1 = about 180 tall, 110 wide).
                           o: {ang (degrees the distal bone rotates about the head), slip (0..1 sideways translation of
                           the socket: about .5 subluxation, 1 dislocation), lax (0..1 capsule and ligament slack:
                           0 taut, 1 bulging and wavy), muscle (0..1 muscle bands across the joint), hl (true: ring the
                           joint in --variant)}.
   limb(x,y,len,deg,o)     a two-segment limb or finger drawn as a thick rounded stroke: the proximal segment runs
                           from (x-len,y) to the joint at (x,y), the distal segment continues at deg degrees from
                           straight (0 straight, negative = hyperextension, bending upward; positive = flexion,
                           downward). o: {len2 (distal length), w (thickness), arc (true: protractor arc and angle
                           label), limit (degrees: dashed threshold ray, e.g. -10 for the Beighton elbow/knee item),
                           flip (true: mirror so the limb points left), col}. Returns {svg, end:[x,y]}.
   skin(x,y,w,o)           skin in cross-section from the surface at y down: epidermis, dermis with wavy collagen
                           bundles, subcutaneous fat. o: {h (total height, default 80), pull (0..1: a pinch at the
                           centre lifts the layers, as in a skin-extensibility test), max (lift at pull=1, default
                           h*.8), thin (true: a thin, translucent dermis with a visible vein, as in vEDS), scar (0..1 a
                           widened atrophic scar at 3/4 width), bruise (0..1), fingers (true: draw the pinching finger
                           tips)}. Returns {svg, top (the surface height at the centre)}.
   artery(x,y,len,o)       a medium artery in long section along y: adventitia, media and intima walls above and below a
                           lumen with flowing blood. o: {r (lumen half-height, default 12), media (wall thickness,
                           default 7), thin (true: a thin media, as in vEDS), flow (0..1 phase of the blood dots),
                           tear (0..1: an intimal tear opens and a false lumen spreads in the media), rupture (0..1:
                           the wall breaks and blood leaks out)}.
   pulse(x,y,w,h,o)        an ECG-style strip of heart beats from x to x+w with baseline y and spike height h.
                           o: {bpm (default 70), secs (seconds the strip spans, default 6), phase (0..1 scrolls it),
                           col}. Use pathFn() for heart-rate-over-minutes curves.
   tilt(x,y,s,ang,o)       a tilt table pivoting at (x,y) with a person strapped on, feet on the footplate; ang 0 is
                           lying flat, 70 nearly upright. s = scale (1 = a 120-long table). o: {pool (0..1 shades the
                           legs with pooled blood), col (person colour)}.
   zebra(x,y,r,o)          the zebra emblem, the EDS community's symbol: a disc of radius r with wavy stripes and one
                           jade strand. o: {jade (false to omit the jade strand), id (unique clip id)}.
   person(x,y,s,fill,o)    a person pictogram for icon arrays (s = height), fill a CSS colour; o.op opacity.
   ped(x,y,sex,aff,o)      a pedigree symbol: sex 'm' square, 'f' circle; aff 0 unaffected, 1 affected (filled),
                           .5 carrier (half shaded); o: {dead, proband, r}. A proband arrow needs
                           marker('pedArrow',...) in the same svg's <defs>.
   marker(id,color)        an arrowhead <marker> for <defs>. */
function chain(x,y,len,o={}){const n=o.n||Math.max(6,Math.floor(len/7)),col=o.col||'var(--chain-a)',show=o.show==null?1:clamp(o.show),cut=clamp(o.cut||0),amp=o.wave==null?2.2:o.wave,hyd=o.hyd||0;
  const step=len/(n-1),r=Math.min(step*.42,4.2);let g='';const k=Math.round(n*show);
  if(o.pro!==false&&show>0){const fx=cut*14,op=1-cut*.9;
    g+=`<g style="opacity:${f1(op)}"><circle cx="${f1(x-r*2.6-fx)}" cy="${f1(y-fx*.4)}" r="${f1(r*1.9)}" style="fill:var(--panel-2);stroke:${col};stroke-width:1.2"/>`;
    if(show>=1)g+=`<circle cx="${f1(x+len+r*3.4+fx)}" cy="${f1(y+fx*.4)}" r="${f1(r*2.8)}" style="fill:var(--panel-2);stroke:${col};stroke-width:1.2"/>`;
    g+='</g>'}
  let d='';for(let i=0;i<k;i++){const px=x+i*step,py=y+Math.sin(i*.7)*amp;d+=(i?'L':'M')+f1(px)+' '+f1(py)}
  if(k>1)g+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:1.2;opacity:.55"/>`;
  for(let i=0;i<k;i++){const px=x+i*step,py=y+Math.sin(i*.7)*amp,gly=i%3===0,v=o.sub===i;
    if(v){g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(r*1.35)}" style="fill:var(--variant);stroke:var(--ink);stroke-width:1"/>`;continue}
    g+=gly?`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(r*.62)}" style="fill:var(--chain-b)"/>`
          :`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(r)}" style="fill:${col}"/>`;
    if(i%3===2&&hyd>0&&i/n<hyd)g+=`<circle cx="${f1(px)}" cy="${f1(py-r*1.6)}" r="${f1(r*.38)}" style="fill:var(--accent)"/>`}
  return g}
function helix(x,y,len,o={}){const amp=o.amp||7,turns=o.turns||len/38,ph=o.phase||0,zip=o.zip==null?1:clamp(o.zip),w=o.w||2.6,
  cols=o.cols||['var(--chain-a)','var(--chain-b)','var(--chain-c)'],N=Math.max(40,Math.round(len/2));
  const cut=1-zip,kk=o.kink;
  const pt=(k,u)=>{const s=ease(ramp(u,cut-.12,cut+.02)),a=2*Math.PI*(turns*u+ph)+k*2*Math.PI/3;
    let yy=y+(k-1)*amp*2.1*(1-s)+amp*Math.sin(a)*s;if(kk!=null)yy+=amp*1.6*Math.exp(-Math.pow((u-kk)/.035,2))*(k-1||.6);
    return [x+u*len,yy,Math.cos(a)*s]};
  /* draw back-facing pieces first, then front-facing, so the strands cross over and under */
  let back='',front='';
  for(let k=0;k<3;k++){let seg=[],cur=null;
    for(let i=0;i<=N;i++){const u=i/N,[px,py,z]=pt(k,u),f=z>=0;if(cur===null||f!==cur){if(seg.length>1)(cur?front+=line(seg,k):back+=line(seg,k));seg=seg.length?[seg[seg.length-1]]:[];cur=f}seg.push([px,py])}
    if(seg.length>1)(cur?front+=line(seg,k):back+=line(seg,k))}
  function line(seg,k){const d=seg.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
    return `<path d="${d}" style="fill:none;stroke:var(--panel);stroke-width:${f1(w+2.2)};stroke-linecap:round"/><path d="${d}" style="fill:none;stroke:${cols[k]};stroke-width:${f1(w)};stroke-linecap:round"/>`}
  let g=`<g style="opacity:.6">${back}</g>${front}`;
  if(kk!=null){const kx=x+kk*len;g+=`<circle cx="${f1(kx)}" cy="${f1(y)}" r="${f1(amp*1.9)}" style="fill:none;stroke:var(--variant);stroke-width:1.8;stroke-dasharray:3 2"/>`}
  return g}
function fibril(x,y,len,o={}){const rows=o.rows||6,rh=o.rh||6,grow=o.grow==null?1:clamp(o.grow),rr=rng(o.seed||11),irr=!!o.irregular;
  const mol=len*.34,gap=mol*.12,D=(mol+gap)/5;let g='',all=[];
  for(let r=0;r<rows;r++){let off=-((r*D*1.2)%(mol+gap))-(mol+gap);
    const th=irr?rh*(.55+rr()*.7):rh*.72,yy=y+r*rh+(irr?(rr()-.5)*rh*.5:0);
    for(let xx=x+off;xx<x+len;xx+=mol+gap){const a=Math.max(x,xx),b=Math.min(x+len,xx+mol);if(b-a<3)continue;
      if(irr&&rr()<.18)continue;all.push({a,b,yy,th,ord:(a-x)/len*.7+r/rows*.3})}}
  all.sort((p,q)=>p.ord-q.ord);const k=Math.round(all.length*grow);
  all.slice(0,k).forEach(m=>{g+=`<rect x="${f1(m.a)}" y="${f1(m.yy)}" width="${f1(m.b-m.a)}" height="${f1(m.th)}" rx="${f1(m.th/2)}" style="fill:var(--fibril);stroke:var(--fibril-line);stroke-width:.8"/>`});
  /* D-period banding: faint stripes every D */
  if(grow>.6&&!irr)for(let xx=x+D/2;xx<x+len;xx+=D)g+=`<rect x="${f1(xx)}" y="${f1(y-1)}" width="${f1(D*.42)}" height="${f1(rows*rh+1)}" style="fill:var(--fibril-line);opacity:${f1(.16*ramp(grow,.6,1))}"/>`;
  if(o.xlink&&grow>.8)for(let i=0;i<Math.floor(len/18);i++){const xx=x+9+i*18,r=Math.floor(rr()*(rows-1));g+=`<line x1="${f1(xx)}" x2="${f1(xx+2)}" y1="${f1(y+r*rh+rh*.6)}" y2="${f1(y+(r+1)*rh+rh*.2)}" style="stroke:var(--accent);stroke-width:1.6;stroke-linecap:round"/>`}
  return {svg:g,h:rows*rh}}
function joint(x,y,s=1,o={}){const ang=o.ang||0,slip=clamp(o.slip||0),lax=clamp(o.lax||0),mu=clamp(o.muscle||0),S=v=>f1(v*s);
  const tx=slip*30*s,ty=slip*6*s,rad=ang*Math.PI/180;
  /* distal frame -> world */
  const W=(px,py)=>[x+tx+px*s*Math.cos(rad)-py*s*Math.sin(rad),y+ty+px*s*Math.sin(rad)+py*s*Math.cos(rad)];
  let g='';
  /* muscles behind the bones */
  if(mu>0)[-1,1].forEach(sd=>{const a=[x+sd*15*s,y-78*s],b=W(sd*15,78);g+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(x+sd*(26+mu*6)*s)} ${f1(y)} ${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:var(--muscle);stroke-width:${f1((4+mu*9)*s)};stroke-linecap:round;opacity:.55"/>`});
  /* proximal bone with its head */
  g+=`<path d="M${f1(x-11*s)} ${f1(y-92*s)}V${f1(y-12*s)}A${S(19)} ${S(19)} 0 1 0 ${f1(x+11*s)} ${f1(y-12*s)}V${f1(y-92*s)}Z" style="fill:var(--bone);stroke:var(--bone-line);stroke-width:1.3"/>`;
  g+=`<path d="M${f1(x-17*s)} ${f1(y+6*s)}A${S(19)} ${S(19)} 0 0 0 ${f1(x+17*s)} ${f1(y+6*s)}" style="fill:none;stroke:var(--cartilage);stroke-width:${S(3.4)}"/>`;
  /* distal bone with its socket (drawn in its own frame) */
  const deg=ang;g+=`<g transform="translate(${f1(x+tx)} ${f1(y+ty)}) rotate(${f1(deg)})">`;
  g+=`<path d="M${S(-20)} ${S(9)}A${S(21.5)} ${S(21.5)} 0 0 0 ${S(20)} ${S(9)}L${S(25)} ${S(14)}L${S(12)} ${S(36)}V${S(94)}H${S(-12)}V${S(36)}L${S(-25)} ${S(14)}Z" style="fill:var(--bone);stroke:var(--bone-line);stroke-width:1.3"/>`;
  g+=`<path d="M${S(-19)} ${S(10)}A${S(21.5)} ${S(21.5)} 0 0 0 ${S(19)} ${S(10)}" style="fill:none;stroke:var(--cartilage);stroke-width:${S(3.4)}"/></g>`;
  /* capsule and ligaments: taut when lax=0, long, bulging and wavy as lax rises */
  [-1,1].forEach(sd=>{const a=[x+sd*12*s,y-30*s],b=W(sd*14,36);const mx=(a[0]+b[0])/2+sd*(8+lax*18)*s,my=(a[1]+b[1])/2;
    g+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(mx)} ${f1(my)} ${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:var(--capsule);stroke-width:${f1(2.4*s+.4)};stroke-linecap:round;${lax>.3?`stroke-dasharray:${f1(5*s)} ${f1(2.2*s*lax)}`:''}"/>`;
    const c=W(sd*20,22),dd=[x+sd*18*s,y-16*s];g+=`<path d="M${f1(dd[0])} ${f1(dd[1])}Q${f1((dd[0]+c[0])/2+sd*lax*10*s)} ${f1((dd[1]+c[1])/2)} ${f1(c[0])} ${f1(c[1])}" style="fill:none;stroke:var(--capsule);stroke-width:${f1(3.6*s)};stroke-linecap:round;opacity:.75"/>`});
  if(o.hl)g+=`<circle cx="${f1(x+tx/2)}" cy="${f1(y+4*s)}" r="${S(36)}" style="fill:none;stroke:var(--variant);stroke-width:2;stroke-dasharray:4 3"/>`;
  return g}
function limb(x,y,len,deg=0,o={}){const l2=o.len2||len*.9,w=o.w||12,sg=o.flip?-1:1,col=o.col||'var(--skin-epi)';
  const a=deg*Math.PI/180,end=[x+sg*Math.cos(a)*l2,y+Math.sin(a)*l2];
  let g=`<path d="M${f1(x-sg*len)} ${f1(y)}L${f1(x)} ${f1(y)}L${f1(end[0])} ${f1(end[1])}" style="fill:none;stroke:var(--skin-line);stroke-width:${f1(w+2.4)};stroke-linecap:round;stroke-linejoin:round"/>`;
  g+=`<path d="M${f1(x-sg*len)} ${f1(y)}L${f1(x)} ${f1(y)}L${f1(end[0])} ${f1(end[1])}" style="fill:none;stroke:${col};stroke-width:${f1(w)};stroke-linecap:round;stroke-linejoin:round"/>`;
  g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(w*.22)}" style="fill:var(--skin-line)"/>`;
  if(o.limit!=null){const la=o.limit*Math.PI/180,R=l2*.95;g+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x+sg*Math.cos(la)*R)}" y2="${f1(y+Math.sin(la)*R)}" style="stroke:var(--accent);stroke-width:1.4;stroke-dasharray:4 3"/>`}
  if(o.arc!==false&&Math.abs(deg)>.5){const R=Math.min(l2*.55,46),a0=0,a1=deg*Math.PI/180,sw=(deg>0)===(sg>0)?1:0;
    const p0=[x+sg*R,y],p1=[x+sg*Math.cos(a1)*R,y+Math.sin(a1)*R];
    g+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x+sg*l2*.9)}" y2="${f1(y)}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3"/>`;
    g+=`<path d="M${f1(p0[0])} ${f1(p0[1])}A${f1(R)} ${f1(R)} 0 0 ${sw} ${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    const am=a1/2;g+=`<text x="${f1(x+sg*Math.cos(am)*(R+14))}" y="${f1(y+Math.sin(am)*(R+14)+4)}" class="t-sm t-mid" style="fill:var(--ink)">${Math.round(Math.abs(deg))}°</text>`}
  return {svg:g,end}}
function skin(x,y,w,o={}){const H=o.h||80,pull=clamp(o.pull||0),mx=o.max==null?H*.8:o.max,thin=!!o.thin,cx=x+w/2,sig=w*.11;
  const ep=H*.1,de=thin?H*.22:H*.46,su=H-ep-de;
  const lift=(xx,depth)=>pull*mx*Math.exp(-Math.pow((xx-cx)/(sig*(1+depth*1.6)),2))*(1-depth*.75);
  const edge=(off,depth)=>{let d='';for(let i=0;i<=60;i++){const xx=x+w*i/60;d+=(i?'L':'M')+f1(xx)+' '+f1(y+off-lift(xx,depth))}return d};
  const band=(o1,d1,o2,d2)=>{let d=edge(o1,d1);for(let i=60;i>=0;i--){const xx=x+w*i/60;d+='L'+f1(xx)+' '+f1(y+o2-lift(xx,d2))}return d+'Z'};
  let g=`<path d="${band(ep+de,.66,H,1)}" style="fill:var(--skin-sub)"/>`;
  /* fat lobules */
  const rr=rng(5);for(let i=0;i<Math.floor(w/22);i++){const xx=x+11+i*22+(rr()-.5)*6,yy=y+ep+de+su*.5;g+=`<ellipse cx="${f1(xx)}" cy="${f1(yy-lift(xx,.85))}" rx="9" ry="${f1(su*.32)}" style="fill:none;stroke:var(--skin-line);stroke-width:.7;opacity:.45"/>`}
  g+=`<path d="${band(ep,.2,ep+de,.66)}" style="fill:var(--skin-derm);${thin?'opacity:.75':''}"/>`;
  /* collagen bundles in the dermis */
  if(o.fibres!==false)for(let k=0;k<(thin?2:4);k++){const off=ep+de*(k+.6)/(thin?2.4:4.4);let d='';for(let i=0;i<=40;i++){const xx=x+w*i/40;d+=(i?'L':'M')+f1(xx)+' '+f1(y+off-lift(xx,.25+k*.1)+Math.sin(i*.9+k)*1.6)}
    g+=`<path d="${d}" style="fill:none;stroke:var(--fibril-line);stroke-width:${thin?1:1.6};opacity:.7"/>`}
  if(thin){let d='';for(let i=0;i<=40;i++){const xx=x+w*i/40;d+=(i?'L':'M')+f1(xx)+' '+f1(y+ep+de*.6-lift(xx,.3)+Math.sin(i*.35)*3)}g+=`<path d="${d}" style="fill:none;stroke:var(--vessel);stroke-width:2.4;opacity:.65"/>`}
  g+=`<path d="${band(0,0,ep,.2)}" style="fill:var(--skin-epi);stroke:var(--skin-line);stroke-width:1"/>`;
  if(o.scar>0){const sx=x+w*.75,sw=10+o.scar*22;g+=`<path d="M${f1(sx-sw/2)} ${f1(y)}Q${f1(sx)} ${f1(y+ep*1.6+o.scar*4)} ${f1(sx+sw/2)} ${f1(y)}Z" style="fill:var(--field);stroke:var(--skin-line);stroke-width:1"/>`}
  if(o.bruise>0)g+=`<ellipse cx="${f1(x+w*.25)}" cy="${f1(y+ep+de*.4)}" rx="${f1(10+o.bruise*14)}" ry="${f1(5+o.bruise*5)}" style="fill:var(--nerve);opacity:${f1(.15+o.bruise*.3)}"/>`;
  const top=y-lift(cx,0);
  if(o.fingers&&pull>0)[-1,1].forEach(sd=>{const fx=cx+sd*(sig*.55+4);g+=`<path d="M${f1(fx+sd*16)} ${f1(top-40)}Q${f1(fx+sd*4)} ${f1(top-12)} ${f1(fx)} ${f1(top+4)}" style="fill:none;stroke:var(--skin-line);stroke-width:13;stroke-linecap:round"/><path d="M${f1(fx+sd*16)} ${f1(top-40)}Q${f1(fx+sd*4)} ${f1(top-12)} ${f1(fx)} ${f1(top+4)}" style="fill:none;stroke:var(--skin-epi);stroke-width:10.5;stroke-linecap:round"/>`});
  return {svg:g,top}}
function artery(x,y,len,o={}){const r=o.r||12,m=o.thin?(o.media||7)*.42:(o.media||7),ad=4,fl=o.flow||0,tear=clamp(o.tear||0),rup=clamp(o.rupture||0);let g='';
  [-1,1].forEach(sd=>{const y0=y+sd*r;
    g+=`<rect x="${f1(x)}" y="${f1(sd<0?y0-m-ad:y0+m)}" width="${f1(len)}" height="${ad}" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:.6"/>`;
    g+=`<rect x="${f1(x)}" y="${f1(sd<0?y0-m:y0)}" width="${f1(len)}" height="${f1(m)}" style="fill:var(--media)"/>`;
    for(let i=0;i<len/8;i++){const xx=x+4+i*8;g+=`<line x1="${f1(xx)}" x2="${f1(xx+5)}" y1="${f1(y0+sd*m*.5)}" y2="${f1(y0+sd*m*.5)}" style="stroke:var(--vessel);stroke-width:.7;opacity:.4"/>`}
    g+=`<line x1="${f1(x)}" x2="${f1(x+len)}" y1="${f1(y0)}" y2="${f1(y0)}" style="stroke:var(--vessel);stroke-width:1.4"/>`});
  g+=`<rect x="${f1(x)}" y="${f1(y-r+.7)}" width="${f1(len)}" height="${f1(2*r-1.4)}" style="fill:var(--vessel-soft);opacity:.6"/>`;
  for(let i=0;i<len/14;i++){const xx=x+((i*14+fl*14*6)%len),yy=y+Math.sin(i*1.7)*r*.45;g+=`<ellipse cx="${f1(xx)}" cy="${f1(yy)}" rx="3.2" ry="2.2" style="fill:var(--blood);opacity:.8"/>`}
  if(tear>0){const tx=x+len*.42,fl2=len*.38*tear,y0=y-r;
    g+=`<path d="M${f1(tx)} ${f1(y0)}L${f1(tx+3)} ${f1(y0-m*.55)}" style="stroke:var(--variant);stroke-width:2.2"/>`;
    g+=`<path d="M${f1(tx+2)} ${f1(y0-m*.5)}Q${f1(tx+fl2*.5)} ${f1(y0-m*.5-2.5*tear)} ${f1(tx+fl2)} ${f1(y0-m*.5)}Q${f1(tx+fl2*.5)} ${f1(y0-m*.5+2.5*tear)} ${f1(tx+2)} ${f1(y0-m*.5)}Z" style="fill:var(--blood);opacity:.75"/>`}
  if(rup>0){const rx=x+len*.62,y0=y-r-m-ad;g+=`<path d="M${f1(rx-4)} ${f1(y0+ad+m)}L${f1(rx)} ${f1(y0)}L${f1(rx+4)} ${f1(y0+ad+m)}" style="fill:var(--field);stroke:var(--variant);stroke-width:1.6"/>`;
    for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.32,d=6+rup*22*(1+i%2*.4);g+=`<circle cx="${f1(rx+Math.cos(a)*d)}" cy="${f1(y0+Math.sin(a)*d)}" r="${f1(1.6+rup*1.8)}" style="fill:var(--blood);opacity:${f1(.4+rup*.5)}"/>`}}
  return g}
function pulse(x,y,w,h,o={}){const bpm=o.bpm||70,secs=o.secs||6,ph=o.phase||0,beat=w/(secs*bpm/60);let d=`M${f1(x)} ${f1(y)}`;
  for(let bx=x-((ph*beat)%beat);bx<x+w;bx+=beat){const p=bx+beat*.55;if(p-beat*.08<x||p+beat*.2>x+w)continue;
    d+=`L${f1(p-beat*.18)} ${f1(y)}Q${f1(p-beat*.13)} ${f1(y-h*.12)} ${f1(p-beat*.08)} ${f1(y)}L${f1(p-beat*.03)} ${f1(y+h*.12)}L${f1(p)} ${f1(y-h)}L${f1(p+beat*.03)} ${f1(y+h*.22)}L${f1(p+beat*.06)} ${f1(y)}Q${f1(p+beat*.14)} ${f1(y-h*.2)} ${f1(p+beat*.2)} ${f1(y)}`}
  d+=`L${f1(x+w)} ${f1(y)}`;return `<path d="${d}" style="fill:none;stroke:${o.col||'var(--accent)'};stroke-width:1.8;stroke-linejoin:round"/>`}
function tilt(x,y,s=1,ang=0,o={}){const L=120*s,col=o.col||'var(--ink)',pool=clamp(o.pool||0);
  let g=`<path d="M${f1(x-14*s)} ${f1(y+46*s)}L${f1(x)} ${f1(y+4*s)}L${f1(x+14*s)} ${f1(y+46*s)}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4*s)}" style="fill:var(--muted)"/>`;
  /* the board: head end at -L*.55, feet at +L*.45 along its length; rotate so the feet go down */
  g+=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})">`;
  g+=`<rect x="${f1(-L*.55)}" y="${f1(-5*s)}" width="${f1(L)}" height="${f1(5*s)}" rx="${f1(2*s)}" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><rect x="${f1(L*.45-3*s)}" y="${f1(-24*s)}" width="${f1(4*s)}" height="${f1(24*s)}" style="fill:var(--muted)"/>`;
  /* person lying on the board, head toward -x */
  const by=-11*s;g+=`<circle cx="${f1(-L*.47)}" cy="${f1(by)}" r="${f1(6*s)}" style="fill:${col}"/>`;
  g+=`<rect x="${f1(-L*.4)}" y="${f1(by-5*s)}" width="${f1(L*.38)}" height="${f1(10*s)}" rx="${f1(4*s)}" style="fill:${col}"/>`;
  g+=`<rect x="${f1(-L*.03)}" y="${f1(by-4*s)}" width="${f1(L*.46)}" height="${f1(8*s)}" rx="${f1(3.5*s)}" style="fill:${col}"/>`;
  if(pool>0)g+=`<rect x="${f1(L*.1)}" y="${f1(by-4*s)}" width="${f1(L*.33)}" height="${f1(8*s)}" rx="${f1(3.5*s)}" style="fill:var(--blood);opacity:${f1(pool*.7)}"/>`;
  [-.3,.2].forEach(u=>{g+=`<rect x="${f1(u*L)}" y="${f1(by-7*s)}" width="${f1(4*s)}" height="${f1(14*s)}" style="fill:var(--accent);opacity:.8"/>`});
  return g+'</g>'}
function zebra(x,y,r=18,o={}){const id=o.id||'zb'+Math.round(x)+'_'+Math.round(y),k=r/18;let g=`<clipPath id="${id}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}"/></clipPath><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--brand)"/><g clip-path="url(#${id})" style="fill:none;stroke-linecap:round">`;
  const wave=(yy,up)=>{let d=`M${f1(x-r)} ${f1(yy)}`;for(let i=0;i<4;i++)d+=`q${f1(5*k)} ${f1((up?-5:5)*k)} ${f1(10*k)} 0`;return d};
  g+=`<path d="${wave(y-8*k,true)}" style="stroke:var(--on-brand);stroke-width:${f1(3.4*k)}"/><path d="${wave(y+8*k,true)}" style="stroke:var(--on-brand);stroke-width:${f1(3.4*k)}"/>`;
  if(o.jade!==false)g+=`<path d="${wave(y,false)}" style="stroke:var(--jade);stroke-width:${f1(4.2*k)}"/>`;
  return g+'</g>'}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
function ped(x,y,sex='m',aff=0,o={}){const r=o.r||11;let g='';const sh=sex==='m'?`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="1.5"`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}"`;
  g+=`${sh} style="fill:${aff>=1?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1.5"/>`;
  if(aff>0&&aff<1){const cid='pc'+Math.round(x)+'_'+Math.round(y);g+=`<clipPath id="${cid}"><rect x="${f1(x-r)}" y="${f1(y-r)}" width="${r}" height="${2*r}"/></clipPath>${sh} clip-path="url(#${cid})" style="fill:var(--variant);stroke:none"/>${sh} style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
  if(o.dead)g+=`<line x1="${f1(x-r*1.3)}" y1="${f1(y+r*1.3)}" x2="${f1(x+r*1.3)}" y2="${f1(y-r*1.3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
  if(o.proband)g+=`<path d="M${f1(x-r*2.2)} ${f1(y+r*1.9)}L${f1(x-r*1.15)} ${f1(y+r*.95)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#pedArrow)"/>`;
  return g}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What EDS is',g:1,n:'1.1',d:'Thirteen types, how common they are, and the zebra'},
 {id:'collagen',t:'Collagen, gene to fibril',g:1,n:'1.2',d:'How a collagen chain becomes a fibre, and where each type breaks it'},
 {id:'types',t:'The 13 types (2017)',g:1,n:'1.3',d:'The 2017 classification: genes, inheritance and hallmark features'},
 {id:'genes',t:'Inheritance & genetic testing',g:1,n:'1.4',d:'Dominant and recessive types, family trees, and when a test helps'},
 {id:'beighton',t:'Beighton score',g:2,n:'2.1',d:'The nine-point hypermobility score, step by step'},
 {id:'criteria',t:'The 2017 hEDS criteria',g:2,n:'2.2',d:'Criteria 1, 2 and 3 as a teaching checklist'},
 {id:'hsd',t:'hEDS or HSD?',g:2,n:'2.3',d:'Hypermobility spectrum disorders and how they differ from hEDS'},
 {id:'differential',t:'Look-alikes & red flags',g:2,n:'2.4',d:'Marfan, Loeys-Dietz and other conditions to tell apart'},
 {id:'joints',t:'Joints & dislocations',g:3,n:'3.1',d:'Lax ligaments, unstable joints, subluxations and proprioception'},
 {id:'pain',t:'Pain & fatigue',g:3,n:'3.2',d:'Why pain is so common, how it changes, and fatigue'},
 {id:'skin',t:'Skin, scars & bruising',g:3,n:'3.3',d:'Stretchy, fragile skin and classical EDS'},
 {id:'autonomic',t:'POTS & the autonomic link',g:3,n:'3.4',d:'Dizziness on standing, heart rate and what the evidence shows'},
 {id:'gut',t:'Gut, bladder & MCAS',g:3,n:'3.5',d:'Gastrointestinal, pelvic and mast-cell associations, evidence-labelled'},
 {id:'vascular',t:'Vascular EDS',g:3,n:'3.6',d:'Arteries, bowel and uterus: the risks, the signs and the plan'},
 {id:'physio',t:'Exercise & physiotherapy',g:4,n:'4.1',d:'Strength, control and pacing: what the evidence supports'},
 {id:'meds',t:'Medicines',g:4,n:'4.2',d:'Pain, POTS and vascular EDS: what is used and how strong the evidence is'},
 {id:'surgery',t:'Surgery & anaesthesia',g:4,n:'4.3',d:'Fragile tissue, local anaesthetics and safer procedures'},
 {id:'frontier',t:'Toward better treatment',g:4,n:'4.4',d:'The hEDS gene search, criteria revision and vEDS trials'},
 {id:'living',t:'Living with EDS',g:5,n:'5.1',d:'School, work, sport, mental health and support'},
 {id:'pregnancy',t:'Pregnancy & parenthood',g:5,n:'5.2',d:'Planning, pregnancy and birth by type, and passing EDS on'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Handling, skin, BP cuffs, dislocations and vEDS emergencies'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Ehlers and Danlos to the 2017 classification'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The syndromes','g-bio','c-bio'],2:['Diagnosis','g-dx','c-dx'],3:['Body systems','g-sys','c-sys'],4:['Treatment','g-rx','c-rx'],5:['Living with EDS','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('eds:tab');sessionStorage.setItem('eds:tab','1')}catch(e){}
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
