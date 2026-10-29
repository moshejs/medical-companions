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
const SOURCES=[{"key": "Aalberts2012", "text": "Aalberts JJ, Thio CH, Schuurman AG, van Langen IM, van der Pol BA, van Tintelen JP, et al. Diagnostic yield in adults screened at the Marfan outpatient clinic using the 1996 and 2010 Ghent nosologies. Am J Med Genet A. 2012;158A(5):982-8. PMID 22461464; doi:10.1002/ajmg.a.35343.", "link": "https://doi.org/10.1002/ajmg.a.35343", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ablin2017", "text": "Ablin JN, Wolfe F. A Comparative Evaluation of the 2011 and 2016 Criteria for Fibromyalgia. J Rheumatol. 2017;44(8):1271-1276. PMID 28572464; doi:10.3899/jrheum.170095.", "link": "https://doi.org/10.3899/jrheum.170095", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Abu2008", "text": "Abu A, Frydman M, Marek D, Pras E, Nir U, Reznik-Wolf H, et al. Deleterious mutations in the Zinc-Finger 469 gene cause brittle cornea syndrome. Am J Hum Genet. 2008;82(5):1217-22. PMID 18452888; PMCID PMC2427192; doi:10.1016/j.ajhg.2008.04.001.", "link": "https://doi.org/10.1016/j.ajhg.2008.04.001", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Adib2005", "text": "Adib N, Davies K, Grahame R, Woo P, Murray KJ. Joint hypermobility syndrome in childhood. A not so benign multisystem disorder? Rheumatology (Oxford). 2005;44(6):744-50. PMID 15728418; doi:10.1093/rheumatology/keh557.", "link": "https://doi.org/10.1093/rheumatology/keh557", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Aletaha2010", "text": "Aletaha D, Neogi T, Silman AJ, Funovits J, Felson DT, Bingham CO 3rd, et al. 2010 Rheumatoid arthritis classification criteria: an American College of Rheumatology/European League Against Rheumatism collaborative initiative. Arthritis Rheum. 2010;62(9):2569-2581. PMID 20872595; doi:10.1002/art.27584.", "link": "https://doi.org/10.1002/art.27584", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "AlKaabi2026", "text": "Al Kaabi N, Camacho E, Al-Timimi AS, Andrawes R, Masthan MI, Momen R, et al. The impact of dyspnea on health-related quality of life and physical activity in hypermobile Ehlers Danlos syndrome and generalized-hypermobility spectrum disorder. Respir Med. 2026;263:109158. PMID 42722088; doi:10.1016/j.rmed.2026.109158.", "link": "https://doi.org/10.1016/j.rmed.2026.109158", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Almheiri2026", "text": "Almheiri S, ElMubarak A, Fadlalsaed O. Pregnancy Outcomes in Women With Vascular Ehlers-Danlos Syndrome: A Systematic Review of Maternal and Fetal Complications. Cureus. 2026;18(8):e114336. PMID 42725136; PMCID PMC13560463; doi:10.7759/cureus.114336.", "link": "https://doi.org/10.7759/cureus.114336", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Amaral2026", "text": "Amaral D, Patrick K, Redeker G, Horvath C, Morgan B, Dalley CB. Anesthesia Clinical Practice Guidelines for Ehlers-Danlos Syndrome: A Modified Delphi Survey. AANA J. 2026;94(5):351-358. PMID 42878823; doi:10.70278/aanaj/.0000001099.", "link": "https://doi.org/10.70278/aanaj/.0000001099", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Anderson2015", "text": "Anderson LK. CE: Nursing Management of Patients with Ehlers-Danlos Syndrome. Am J Nurs. 2015;115(7):38-46. PMID 26067654; doi:10.1097/01.NAJ.0000467274.82951.57.", "link": "https://doi.org/10.1097/01.naj.0000467274.82951.57", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Anderson2021", "text": "Anderson LK, Lane KR. The diagnostic journey in adults with hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorders. J Am Assoc Nurse Pract. 2021;34(4):639-648. PMID 34739411; doi:10.1097/JXX.0000000000000672.", "link": "https://doi.org/10.1097/jxx.0000000000000672", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Anderson2023", "text": "Anderson LK, Lane KR. Clinical trajectory of hypermobile Ehlers-Danlos syndrome/hypermobility spectrum disorders in older adults. J Am Assoc Nurse Pract. 2023;35(10):605-612. PMID 37261967; doi:10.1097/JXX.0000000000000900.", "link": "https://doi.org/10.1097/jxx.0000000000000900", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Angwin2020", "text": "Angwin C, Brady AF, Pope FM, Vandersteen A, Baker D, Cheema H, et al. Arterial complications in classical Ehlers-Danlos syndrome: a case series. J Med Genet. 2020;57(11):769-776. PMID 32467296; doi:10.1136/jmedgenet-2019-106689.", "link": "https://doi.org/10.1136/jmedgenet-2019-106689", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Angwin2020C", "text": "Angwin C, Ghali N, Baker D, Brady AF, Pope FM, Vandersteen A, et al. Electron microscopy in the diagnosis of Ehlers-Danlos syndromes: correlation with clinical and genetic investigations. Br J Dermatol. 2020;182(3):698-707. PMID 31141158; doi:10.1111/bjd.18165.", "link": "https://doi.org/10.1111/bjd.18165", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Angwin2023", "text": "Angwin C, Ghali N, van Dijk FS. Case report: Two individuals with AEBP1-related classical-like EDS: Further clinical characterisation and description of novel AEBP1 variants. Front Genet. 2023;14:1148224. PMID 37144134; PMCID PMC10151747; doi:10.3389/fgene.2023.1148224.", "link": "https://doi.org/10.3389/fgene.2023.1148224", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Angwin2023H", "text": "Angwin C, Ghali N, van Dijk FS. Case report and discussion: Pre-implantation genetic diagnosis with surrogacy in vascular Ehlers-Danlos syndrome. Front Genet. 2023;14:1147607. PMID 37007973; PMCID PMC10062526; doi:10.3389/fgene.2023.1147607.", "link": "https://doi.org/10.3389/fgene.2023.1147607", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Angwin2025", "text": "Angwin C, Byers P, Dulfer E, Ghali N, Harris J, Hausser I, et al. The Natural History of Dermatosparaxis Ehlers Danlos Syndrome: An Adult Case Series. Am J Med Genet A. 2025;197(4):e63957. PMID 39641471; doi:10.1002/ajmg.a.63957.", "link": "https://doi.org/10.1002/ajmg.a.63957", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "ArendtNielsen1990", "text": "Arendt-Nielsen L, Kaalund S, Bjerring P, Høgsaa B. Insufficient effect of local analgesics in Ehlers Danlos type III patients (connective tissue disorder). Acta Anaesthesiol Scand. 1990;34(5):358-361. PMID 2389651; doi:10.1111/j.1399-6576.1990.tb03103.x.", "link": "https://doi.org/10.1111/j.1399-6576.1990.tb03103.x", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Artoni2018", "text": "Artoni A, Bassotti A, Abbattista M, Marinelli B, Lecchi A, Gianniello F, et al. Hemostatic abnormalities in patients with Ehlers-Danlos syndrome. J Thromb Haemost. 2018;16(12):2425-2431. PMID 30312027; doi:10.1111/jth.14310.", "link": "https://doi.org/10.1111/jth.14310", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Arvan2026", "text": "Arvan M, Feinstein RT, Rudin NJ, Nichols M. Computable Phenotype for Identifying Undiagnosed Hypermobile Ehlers-Danlos Syndrome: Protocol for a Development and Validation Study. JMIR Res Protoc. 2026;15:e91647. PMID 42579883; PMCID PMC13460795; doi:10.2196/91647.", "link": "https://doi.org/10.2196/91647", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "AubryRozier2021", "text": "Aubry-Rozier B, Schwitzguebel A, Valerio F, Tanniger J, Paquier C, Berna C, et al. Are patients with hypermobile Ehlers-Danlos syndrome or hypermobility spectrum disorder so different?. Rheumatol Int. 2021;41(10):1785-1794. PMID 34398260; PMCID PMC8390400; doi:10.1007/s00296-021-04968-3.", "link": "https://doi.org/10.1007/s00296-021-04968-3", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC", "aliases": ["Aubry-Rozier2021"]}, {"key": "Ayoub2020", "text": "Ayoub S, Ghali N, Angwin C, Baker D, Baffini S, Brady AF, et al. Clinical features, molecular results, and management of 12 individuals with the rare arthrochalasia Ehlers-Danlos syndrome. Am J Med Genet A. 2020;182(5):994-1007. PMID 32091183; doi:10.1002/ajmg.a.61523.", "link": "https://doi.org/10.1002/ajmg.a.61523", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Aziz2025", "text": "Aziz Q, Harris LA, Goodman BP, Simrén M, Shin A. AGA Clinical Practice Update on GI Manifestations and Autonomic or Immune Dysfunction in Hypermobile Ehlers-Danlos Syndrome: Expert Review. Clin Gastroenterol Hepatol. 2025;23(8):1291-1302. PMID 40387691; doi:10.1016/j.cgh.2025.02.015.", "link": "https://doi.org/10.1016/j.cgh.2025.02.015", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Baderkhan2021", "text": "Baderkhan H, Wanhainen A, Stenborg A, Stattin EL, Björck M. Celiprolol Treatment in Patients with Vascular Ehlers-Danlos Syndrome. Eur J Vasc Endovasc Surg. 2021;61(2):326-331. PMID 33223285; doi:10.1016/j.ejvs.2020.10.020.", "link": "https://doi.org/10.1016/j.ejvs.2020.10.020", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "BaezaVelasco2023", "text": "Baeza-Velasco C, Rodriguez N, Parra L, Gutiérrez-Rosado T. Adjustment to disease and quality of life in people with vascular Ehlers-Danlos and Loeys-Dietz syndromes: A mixed-method study. Front Psychol. 2023;14:1019863. PMID 36925590; PMCID PMC10011476; doi:10.3389/fpsyg.2023.1019863.", "link": "https://doi.org/10.3389/fpsyg.2023.1019863", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bale2019", "text": "Bale P, Easton V, Bacon H, Jerman E, Watts L, Barton G, et al. The effectiveness of a multidisciplinary intervention strategy for the treatment of symptomatic joint hypermobility in childhood: a randomised, single Centre parallel group trial (The Bendy Study). Pediatr Rheumatol Online J. 2019;17(1):2. PMID 30621718; PMCID PMC6325876; doi:10.1186/s12969-018-0298-x.", "link": "https://doi.org/10.1186/s12969-018-0298-x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Banica2020", "text": "Banica T, Coussens M, Verroken C, Calders P, De Wandele I, Malfait F, et al. Higher fracture prevalence and smaller bone size in patients with hEDS/HSD-a prospective cohort study. Osteoporos Int. 2020;31(5):849-856. PMID 31873762; doi:10.1007/s00198-019-05269-z.", "link": "https://doi.org/10.1007/s00198-019-05269-z", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Basalom2020", "text": "Basalom S, Rauch F. Bone Disease in Patients with Ehlers-Danlos Syndromes. Curr Osteoporos Rep. 2020;18(2):95-102. PMID 32162201; doi:10.1007/s11914-020-00568-5.", "link": "https://doi.org/10.1007/s11914-020-00568-5", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bashe2025", "text": "Bashe G. A Caregiver's Perspective: Identifying \"Zebras\"-Listening to Patients is a Clinical Necessity. J Patient Exp. 2025;12:23743735251404807. PMID 41394325; PMCID PMC12696320; doi:10.1177/23743735251404807.", "link": "https://doi.org/10.1177/23743735251404807", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bathen2013", "text": "Bathen T, Hångmann AB, Hoff M, Andersen LØ, Rand-Hendriksen S. Multidisciplinary treatment of disability in ehlers-danlos syndrome hypermobility type/hypermobility syndrome: A pilot study using a combination of physical and cognitive-behavioral therapy on 12 women. Am J Med Genet A. 2013;161A(12):3005-11. PMID 23913726; doi:10.1002/ajmg.a.36060.", "link": "https://doi.org/10.1002/ajmg.a.36060", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Baumann2012", "text": "Baumann M, Giunta C, Krabichler B, Rüschendorf F, Zoppi N, Colombi M, et al. Mutations in FKBP14 cause a variant of Ehlers-Danlos syndrome with progressive kyphoscoliosis, myopathy, and hearing loss. Am J Hum Genet. 2012;90(2):201-16. PMID 22265013; PMCID PMC3276673; doi:10.1016/j.ajhg.2011.12.004.", "link": "https://doi.org/10.1016/j.ajhg.2011.12.004", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Beckers2017", "text": "Beckers AB, Keszthelyi D, Fikree A, Vork L, Masclee A, Farmer AD, et al. Gastrointestinal disorders in joint hypermobility syndrome/Ehlers-Danlos syndrome hypermobility type: A review for the gastroenterologist. Neurogastroenterol Motil. 2017;29(8). PMID 28086259; doi:10.1111/nmo.13013.", "link": "https://doi.org/10.1111/nmo.13013", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Beighton1969", "text": "Beighton P, Horan F. Orthopaedic aspects of the Ehlers-Danlos syndrome. J Bone Joint Surg Br. 1969;51(3):444-453. PMID 5820785; doi:10.1302/0301-620X.51B3.444.", "link": "https://doi.org/10.1302/0301-620x.51b3.444", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Beighton1973", "text": "Beighton P, Solomon L, Soskolne CL. Articular mobility in an African population. Ann Rheum Dis. 1973;32(5):413-418. PMID 4751776; PMCID PMC1006136; doi:10.1136/ard.32.5.413.", "link": "https://doi.org/10.1136/ard.32.5.413", "areas": ["A", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Beighton1988", "text": "Beighton P, de Paepe A, Danks D, Finidori G, Gedde-Dahl T, Goodman R, et al. International Nosology of Heritable Disorders of Connective Tissue, Berlin, 1986. Am J Med Genet. 1988;29(3):581-594. PMID 3287925; doi:10.1002/ajmg.1320290316.", "link": "https://doi.org/10.1002/ajmg.1320290316", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Beighton1998", "text": "Beighton P, De Paepe A, Steinmann B, Tsipouras P, Wenstrup RJ. Ehlers-Danlos syndromes: revised nosology, Villefranche, 1997. Ehlers-Danlos National Foundation (USA) and Ehlers-Danlos Support Group (UK). Am J Med Genet. 1998;77(1):31-37. PMID 9557891; doi:10.1002/(sici)1096-8628(19980428)77:1<31::aid-ajmg8>3.0.co;2-o.", "link": "https://doi.org/10.1002/(sici)1096-8628(19980428)77:1<31::aid-ajmg8>3.0.co", "areas": ["A", "B", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bendik2011", "text": "Bendik EM, Tinkle BT, Al-shuik E, Levin L, Martin A, Thaler R, et al. Joint hypermobility syndrome: A common clinical disorder associated with migraine in women. Cephalalgia. 2011;31(5):603-613. PMID 21278238; doi:10.1177/0333102410392606.", "link": "https://doi.org/10.1177/0333102410392606", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Benistan2023", "text": "Benistan K, Pontier B, Leblond C, Flageul O, Le Guicher G, Enjalbert M, et al. The Effectiveness of Compression Garments for Reducing Pain in Non-Vascular Ehlers-Danlos Syndromes: A Prospective Observational Cohort Study. Healthcare (Basel). 2023;11(13). PMID 37444695; PMCID PMC10340571; doi:10.3390/healthcare11131862.", "link": "https://doi.org/10.3390/healthcare11131862", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Benistan2024", "text": "Benistan K, Foy M, Gillas F, Genet F, Kane M, Barbot F, et al. Effects of compression garments on balance in hypermobile Ehlers-Danlos syndrome: a randomized controlled trial. Disabil Rehabil. 2024;46(9):1841-1850. PMID 37194618; doi:10.1080/09638288.2023.2209742.", "link": "https://doi.org/10.1080/09638288.2023.2209742", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Bennett2021", "text": "Bennett SE, Walsh N, Moss T, Palmer S. Understanding the psychosocial impact of joint hypermobility syndrome and Ehlers-Danlos syndrome hypermobility type: a qualitative interview study. Disabil Rehabil. 2021;43(6):795-804. PMID 31318301; doi:10.1080/09638288.2019.1641848.", "link": "https://doi.org/10.1080/09638288.2019.1641848", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bennett2022", "text": "Bennett SE, Walsh N, Moss T, Palmer S. Developing a self-management intervention to manage hypermobility spectrum disorders (HSD) and hypermobile Ehlers-Danlos syndrome (hEDS): an analysis informed by behaviour change theory. Disabil Rehabil. 2022;44(18):5231-5240. PMID 34101520; doi:10.1080/09638288.2021.1933618.", "link": "https://doi.org/10.1080/09638288.2021.1933618", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Berg2026", "text": "Berg KM, Dockrell DM. The lived experience of hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorders in the United Kingdom: findings from a national cross-sectional survey. Disabil Rehabil. 2026;48(20):6545-6556. PMID 41928730; doi:10.1080/09638288.2026.2646723.", "link": "https://doi.org/10.1080/09638288.2026.2646723", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Berglund2015", "text": "Berglund B, Pettersson C, Pigg M, Kristiansson P. Self-reported quality of life, anxiety and depression in individuals with Ehlers-Danlos syndrome (EDS): a questionnaire study. BMC Musculoskelet Disord. 2015;16:89. PMID 25880527; PMCID PMC4403907; doi:10.1186/s12891-015-0549-7.", "link": "https://doi.org/10.1186/s12891-015-0549-7", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bergqvist2013", "text": "Bergqvist D, Björck M, Wanhainen A. Treatment of vascular Ehlers-Danlos syndrome: a systematic review. Ann Surg. 2013;258(2):257-261. PMID 23751452; doi:10.1097/SLA.0b013e31829c7a59.", "link": "https://doi.org/10.1097/sla.0b013e31829c7a59", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bernhoff2022", "text": "Bernhoff G, Huhmar H, Käll LB. Assessment of systemic joint laxity in the clinical context: Relevance and replicability of the Beighton score in chronic fatigue. J Back Musculoskelet Rehabil. 2022;35(4):859-866. PMID 34957987; PMCID PMC9398072; doi:10.3233/BMR-210081.", "link": "https://doi.org/10.3233/bmr-210081", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "BertoliAvella2015", "text": "Bertoli-Avella AM, Gillis E, Morisaki H, Verhagen JMA, de Graaf BM, van de Beek G, et al. Mutations in a TGF-β ligand, TGFB3, cause syndromic aortic aneurysms and dissections. J Am Coll Cardiol. 2015;65(13):1324-1336. PMID 25835445; PMCID PMC4380321; doi:10.1016/j.jacc.2015.01.040.", "link": "https://doi.org/10.1016/j.jacc.2015.01.040", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Beyens2021", "text": "Beyens A, Pottie L, Sips P, Callewaert B. Clinical and Molecular Delineation of Cutis Laxa Syndromes: Paradigms for Homeostasis. Adv Exp Med Biol. 2021;1348:273-309. PMID 34807425; doi:10.1007/978-3-030-80614-9_13.", "link": "https://doi.org/10.1007/978-3-030-80614-9_13", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Blackburn2018", "text": "Blackburn PR, Xu Z, Tumelty KE, Zhao RW, Monis WJ, Harris KG, et al. Bi-allelic Alterations in AEBP1 Lead to Defective Collagen Assembly and Connective Tissue Structure Resulting in a Variant of Ehlers-Danlos Syndrome. Am J Hum Genet. 2018;102(4):696-705. PMID 29606302; PMCID PMC5985336; doi:10.1016/j.ajhg.2018.02.018.", "link": "https://doi.org/10.1016/j.ajhg.2018.02.018", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bloom2017", "text": "Bloom L, Byers P, Francomano C, Tinkle B, Malfait F, Steering Committee of The International Consortium on the Ehlers-Danlos Syndromes. The international consortium on the Ehlers-Danlos syndromes. Am J Med Genet C Semin Med Genet. 2017;175(1):5-7. PMID 28306227; doi:10.1002/ajmg.c.31547.", "link": "https://doi.org/10.1002/ajmg.c.31547", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bockhorn2021", "text": "Bockhorn LN, Vera AM, Dong D, Delgado DA, Varner KE, Harris JD. Interrater and Intrarater Reliability of the Beighton Score: A Systematic Review. Orthop J Sports Med. 2021;9(1):2325967120968099. PMID 33786328; PMCID PMC7960900; doi:10.1177/2325967120968099.", "link": "https://doi.org/10.1177/2325967120968099", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Boris2018", "text": "Boris JR, Bernadzikowski T. Demographics of a large paediatric Postural Orthostatic Tachycardia Syndrome Program. Cardiol Young. 2018;28(5):668-674. PMID 29357955; doi:10.1017/S1047951117002888.", "link": "https://doi.org/10.1017/s1047951117002888", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Boulu2025", "text": "Boulu X, Karam JD, Schmidt J. Compression garments in hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorders: a retrospective cohort study. BMC Musculoskelet Disord. 2025;26(1):1066. PMID 41286814; PMCID PMC12642080; doi:10.1186/s12891-025-09318-z.", "link": "https://doi.org/10.1186/s12891-025-09318-z", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Bourne2021JACC", "text": "Bourne KM, Sheldon RS, Hall J, Lloyd M, Kogut K, Sheikh N, et al. Compression Garment Reduces Orthostatic Tachycardia and Symptoms in Patients With Postural Orthostatic Tachycardia Syndrome. J Am Coll Cardiol. 2021;77(3):285-296. PMID 33478652; doi:10.1016/j.jacc.2020.11.040.", "link": "https://doi.org/10.1016/j.jacc.2020.11.040", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bourne2026CJC", "text": "Bourne KM, Karalasingham K, Siddiqui T, Mammarella B, Patel A, Exner DV, et al. Abdominal-only Compression Garments Reduce Orthostatic Tachycardia and Improve Symptoms in Patients With Postural Orthostatic Tachycardia Syndrome. Can J Cardiol. 2026;42(6):1320-1328. PMID 41338488; PMCID PMC13370740; doi:10.1016/j.cjca.2025.11.038.", "link": "https://doi.org/10.1016/j.cjca.2025.11.038", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bourne2026RAPM", "text": "Bourne KM, Thai S, Lei LY, Siddiqui T, Black B, Peltier A, et al. Patients with Ehlers-Danlos syndrome experience reduced effectiveness of lidocaine local anesthetic: a randomized cross-over clinical trial. Reg Anesth Pain Med. 2026 (online ahead of print):rapm-2025-107416. PMID 41775498; PMCID PMC13049915; doi:10.1136/rapm-2025-107416.", "link": "https://doi.org/10.1136/rapm-2025-107416", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC", "aliases": ["Bourne2026"]}, {"key": "Bovet2016", "text": "Bovet C, Carlson M, Taylor M. Quality of life, unmet needs, and iatrogenic injuries in rehabilitation of patients with Ehlers-Danlos Syndrome hypermobility type/Joint Hypermobility Syndrome. Am J Med Genet A. 2016;170(8):2044-2051. PMID 27273746; doi:10.1002/ajmg.a.37774.", "link": "https://doi.org/10.1002/ajmg.a.37774", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bowen2017", "text": "Bowen JM, Sobey GJ, Burrows NP, Colombi M, Lavallee ME, Malfait F, et al. Ehlers-Danlos syndrome, classical type. Am J Med Genet C Semin Med Genet. 2017;175(1):27-39. PMID 28192633; doi:10.1002/ajmg.c.31548.", "link": "https://doi.org/10.1002/ajmg.c.31548", "areas": ["A", "B", "C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bowen2020JCI", "text": "Bowen CJ, Calderón Giadrosic JF, Burger Z, Rykiel G, Davis EC, Helmers MR, et al. Targetable cellular signaling events mediate vascular pathology in vascular Ehlers-Danlos syndrome. J Clin Invest. 2020;130(2):686-698. PMID 31639107; PMCID PMC6994142; doi:10.1172/JCI130730.", "link": "https://doi.org/10.1172/jci130730", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bowen2023vEDS", "text": "Bowen JM, Hernandez M, Johnson DS, Green C, Kammin T, Baker D, et al. Diagnosis and management of vascular Ehlers-Danlos syndrome: Experience of the UK national diagnostic service, Sheffield. Eur J Hum Genet. 2023;31(7):749-760. PMID 36977837; PMCID PMC10326011; doi:10.1038/s41431-023-01343-7.", "link": "https://doi.org/10.1038/s41431-023-01343-7", "areas": ["G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Bowen2023"]}, {"key": "Brady2017", "text": "Brady AF, Demirdas S, Fournel-Gigleux S, Ghali N, Giunta C, Kapferer-Seebacher I, et al. The Ehlers-Danlos syndromes, rare types. Am J Med Genet C Semin Med Genet. 2017;175(1):70-115. PMID 28306225; doi:10.1002/ajmg.c.31550.", "link": "https://doi.org/10.1002/ajmg.c.31550", "areas": ["A", "B"], "unverified": false, "validated": "Europe PMC"}, {"key": "Brooke2010", "text": "Brooke BS, Arnaoutakis G, McDonnell NB, Black JH. Contemporary management of vascular complications associated with Ehlers-Danlos syndrome. J Vasc Surg. 2010;51(1):131-138. PMID 19879095; PMCID PMC6042287; doi:10.1016/j.jvs.2009.08.019.", "link": "https://doi.org/10.1016/j.jvs.2009.08.019", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bulbena1993", "text": "Bulbena A, Duró JC, Porta M, Martín-Santos R, Mateo A, Molina L, et al. Anxiety disorders in the joint hypermobility syndrome. Psychiatry Res. 1993;46(1):59-68. PMID 8464956; doi:10.1016/0165-1781(93)90008-5.", "link": "https://doi.org/10.1016/0165-1781(93)90008-5", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bulbena2017", "text": "Bulbena A, Baeza-Velasco C, Bulbena-Cabré A, Pailhez G, Critchley H, Chopra P, et al. Psychiatric and psychological aspects in the Ehlers-Danlos syndromes. Am J Med Genet C Semin Med Genet. 2017;175(1):237-245. PMID 28186381; doi:10.1002/ajmg.c.31544.", "link": "https://doi.org/10.1002/ajmg.c.31544", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "BurkittWright2011", "text": "Burkitt Wright EMM, Spencer HL, Daly SB, Manson FDC, Zeef LAH, Urquhart J, et al. Mutations in PRDM5 in brittle cornea syndrome identify a pathway regulating extracellular matrix development and maintenance. Am J Hum Genet. 2011;88(6):767-777. PMID 21664999; PMCID PMC3113239; doi:10.1016/j.ajhg.2011.05.007.", "link": "https://doi.org/10.1016/j.ajhg.2011.05.007", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "BurykIggers2022", "text": "Buryk-Iggers S, Mittal N, Santa Mina D, Adams SC, Englesakis M, Rachinsky M, et al. Exercise and Rehabilitation in People With Ehlers-Danlos Syndrome: A Systematic Review. Arch Rehabil Res Clin Transl. 2022;4(2):100189. PMID 35756986; PMCID PMC9214343; doi:10.1016/j.arrct.2022.100189.", "link": "https://doi.org/10.1016/j.arrct.2022.100189", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Buso2024", "text": "Buso G, Corvini F, Fusco EM, Messina M, Cherubini F, Laera N, et al. Current Evidence and Future Perspectives in the Medical Management of Vascular Ehlers-Danlos Syndrome: Focus on Vascular Prevention. J Clin Med. 2024;13(14):4255. PMID 39064294; PMCID PMC11278074; doi:10.3390/jcm13144255. Full text read.", "link": "https://doi.org/10.3390/jcm13144255", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Byers1997", "text": "Byers PH, Duvic M, Atkinson M, Robinow M, Smith LT, Krane SM, et al. Ehlers-Danlos syndrome type VIIA and VIIB result from splice-junction mutations or genomic deletions that involve exon 6 in the COL1A1 and COL1A2 genes of type I collagen. Am J Med Genet. 1997;72(1):94-105. PMID 9295084; doi:10.1002/(sici)1096-8628(19971003)72:1<94::aid-ajmg20>3.0.co;2-o.", "link": "https://doi.org/10.1002/(sici)1096-8628(19971003)72:1<94::aid-ajmg20>3.0.co", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Byers2017", "text": "Byers PH, Belmont J, Black J, De Backer J, Frank M, Jeunemaitre X, et al. Diagnosis, natural history, and management in vascular Ehlers-Danlos syndrome. Am J Med Genet C Semin Med Genet. 2017;175(1):40-47. PMID 28306228; doi:10.1002/ajmg.c.31553.", "link": "https://doi.org/10.1002/ajmg.c.31553", "areas": ["A", "B", "C", "D", "E", "F", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Byers2025GeneReviews", "text": "Byers PH. Vascular Ehlers-Danlos Syndrome. In: Adam MP, Bick S, Mirzaa GM, Wallace SE, Amemiya A, editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993–2026. 1999 Sep 2 [updated 2025 Apr 10]. PMID 20301667.", "link": "https://pubmed.ncbi.nlm.nih.gov/20301667/", "areas": ["H", "B", "G", "F"], "unverified": false, "validated": "PubMed", "aliases": ["ByersGR-vEDS", "Byers2025GR"]}, {"key": "CalderonMartinez2025", "text": "Calderon-Martinez E, Velasco WV, Guo D, Hostetler EH, Xun Z, Stephens S, et al. Differences in Arterial Events in Vascular Ehlers-Danlos, Loeys-Dietz, and Marfan Syndrome. J Am Coll Cardiol. 2025;85(24):2355-2367. PMID 40533124; doi:10.1016/j.jacc.2025.04.023.", "link": "https://doi.org/10.1016/j.jacc.2025.04.023", "areas": ["B", "F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Callen2025", "text": "Callen EF, Clay TL, Cogan W, Black WR, Jones JT, Mabachi N. Community Social Networking for Ehlers-Danlos Syndrome. Health Educ Behav. 2025;52(2):199-206. PMID 39474797; doi:10.1177/10901981241292275.", "link": "https://doi.org/10.1177/10901981241292275", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Carbone2000", "text": "Carbone L, Tylavsky FA, Bush AJ, Koo W, Orwoll E, Cheng S. Bone density in Ehlers-Danlos syndrome. Osteoporos Int. 2000;11(5):388-392. PMID 10912839; doi:10.1007/s001980070104.", "link": "https://doi.org/10.1007/s001980070104", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Carroll2023", "text": "Carroll MB. Hypermobility spectrum disorders: A review. Rheumatol Immunol Res. 2023;4(2):60-68. PMID 37637226; PMCID PMC10457547; doi:10.2478/rir-2023-0010.", "link": "https://doi.org/10.2478/rir-2023-0010", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Carter1964", "text": "Carter C, Wilkinson J. Persistent joint laxity and congenital dislocation of the hip. J Bone Joint Surg Br. 1964;46:40-45. PMID 14126235; doi:10.1302/0301-620X.46B1.40.", "link": "https://doi.org/10.1302/0301-620x.46b1.40", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Castori2010", "text": "Castori M, Camerota F, Celletti C, Danese C, Santilli V, Saraceni VM, et al. Natural history and manifestations of the hypermobility type Ehlers-Danlos syndrome: a pilot study on 21 patients. Am J Med Genet A. 2010;152A(3):556-64. PMID 20140961; doi:10.1002/ajmg.a.33231.", "link": "https://doi.org/10.1002/ajmg.a.33231", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Castori2012", "text": "Castori M, Morlino S, Celletti C, Celli M, Morrone A, Colombi M, et al. Management of pain and fatigue in the joint hypermobility syndrome (a.k.a. Ehlers-Danlos syndrome, hypermobility type): principles and proposal for a multidisciplinary approach. Am J Med Genet A. 2012;158A(8):2055-2070. PMID 22786715; doi:10.1002/ajmg.a.35483.", "link": "https://doi.org/10.1002/ajmg.a.35483", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Castori2013", "text": "Castori M, Morlino S, Celletti C, Ghibellini G, Bruschini M, Grammatico P, et al. Re-writing the natural history of pain and related symptoms in the joint hypermobility syndrome/Ehlers-Danlos syndrome, hypermobility type. Am J Med Genet A. 2013;161A(12):2989-3004. PMID 24254847; doi:10.1002/ajmg.a.36315.", "link": "https://doi.org/10.1002/ajmg.a.36315", "areas": ["C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Castori2015", "text": "Castori M. Ehlers-Danlos syndrome(s) mimicking child abuse: Is there an impact on clinical practice? Am J Med Genet C Semin Med Genet. 2015;169(4):289-92. PMID 26452443; doi:10.1002/ajmg.c.31460.", "link": "https://doi.org/10.1002/ajmg.c.31460", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Castori2017", "text": "Castori M, Tinkle B, Levy H, Grahame R, Malfait F, Hakim A. A framework for the classification of joint hypermobility and related conditions. Am J Med Genet C Semin Med Genet. 2017;175(1):148-157. PMID 28145606; doi:10.1002/ajmg.c.31539.", "link": "https://doi.org/10.1002/ajmg.c.31539", "areas": ["A", "B", "C", "D", "E", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Castori2026EOP", "text": "Castori M. Pharmacotherapeutic management of chronic pain in joint hypermobility and Ehlers-Danlos syndromes: a clinical perspective. Expert Opin Pharmacother. 2026 (online ahead of print). PMID 42899629; doi:10.1080/14656566.2026.2753024.", "link": "https://doi.org/10.1080/14656566.2026.2753024", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Cazzato2016", "text": "Cazzato D, Castori M, Lombardi R, Caravello F, Bella ED, Petrucci A, et al. Small fiber neuropathy is a common feature of Ehlers-Danlos syndromes. Neurology. 2016;87(2):155-159. PMID 27306637; PMCID PMC4940063; doi:10.1212/wnl.0000000000002847.", "link": "https://doi.org/10.1212/wnl.0000000000002847", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Cederlof2016", "text": "Cederlöf M, Larsson H, Lichtenstein P, Almqvist C, Serlachius E, Ludvigsson JF. Nationwide population-based cohort study of psychiatric disorders in individuals with Ehlers-Danlos syndrome or hypermobility syndrome and their siblings. BMC Psychiatry. 2016;16:207. PMID 27377649; PMCID PMC4932739; doi:10.1186/s12888-016-0922-6.", "link": "https://doi.org/10.1186/s12888-016-0922-6", "areas": ["A", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Celletti2013", "text": "Celletti C, Castori M, La Torre G, Camerota F. Evaluation of kinesiophobia and its correlations with pain and fatigue in joint hypermobility syndrome/Ehlers-Danlos syndrome hypermobility type. Biomed Res Int. 2013;2013:580460. PMID 23936820; PMCID PMC3725998; doi:10.1155/2013/580460.", "link": "https://doi.org/10.1155/2013/580460", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Celletti2020", "text": "Celletti C, Borsellino B, Castori M, Censi F, Calcagnini G, Camerota F, et al. A new insight on postural tachycardia syndrome in 102 adults with hypermobile Ehlers-Danlos Syndrome/hypermobility spectrum disorder. Monaldi Arch Chest Dis. 2020;90(2). PMID 32434316; doi:10.4081/monaldi.2020.1286.", "link": "https://doi.org/10.4081/monaldi.2020.1286", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Celletti2021", "text": "Celletti C, Paolucci T, Maggi L, Volpi G, Billi M, Mollica R, et al. Pain Management through Neurocognitive Therapeutic Exercises in Hypermobile Ehlers-Danlos Syndrome Patients with Chronic Low Back Pain. Biomed Res Int. 2021;2021:6664864. PMID 34124258; PMCID PMC8189767; doi:10.1155/2021/6664864.", "link": "https://doi.org/10.1155/2021/6664864", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Chappell2026", "text": "Chappell A, Jepson B, Kilgour G. Intervention to Improve Running and Physical Activity Participation in Children With Generalised Joint Hypermobility: A Feasibility Study. Child Care Health Dev. 2026;52(5):e70345. PMID 42717780; PMCID PMC13559497; doi:10.1111/cch.70345.", "link": "https://doi.org/10.1111/cch.70345", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Chen2008GJH", "text": "Chen HC, Shah SH, Li YJ, Stabler TV, Jordan JM, Kraus VB. Inverse association of general joint hypermobility with hand and knee osteoarthritis and serum cartilage oligomeric matrix protein levels. Arthritis Rheum. 2008;58(12):3854-3864. PMID 19035482; PMCID PMC3698615; doi:10.1002/art.24319.", "link": "https://doi.org/10.1002/art.24319", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Chew2025", "text": "Chew MT, Ilhan E, Nicholson LL, Kobayashi S, Pacey V, Hakim A, et al. HOPE for Hypermobile Ehlers-Danlos Syndrome (hEDS) and Hypermobility Spectrum Disorder (HSD)-A Pilot Randomised Controlled Trial of Feasibility, Acceptability and Appropriateness. Eur J Pain. 2025;29(6):e70030. PMID 40298033; PMCID PMC12038781; doi:10.1002/ejp.70030.", "link": "https://doi.org/10.1002/ejp.70030", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Chew2025H", "text": "Chew MT, Ilhan E, Dennis S, Nicholson LL, Kobayashi S, Chan C. Navigating HOPE (Hypermobile Online Pain managemEnt): Perspectives and Experiences From People With Hypermobile Ehlers-Danlos Syndrome or Hypermobility Spectrum Disorder on a Condition-Specific Online Pain Management Programme. Health Expect. 2025;28(1):e70186. PMID 39962637; PMCID PMC11832430; doi:10.1111/hex.70186.", "link": "https://doi.org/10.1111/hex.70186", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Chiarelli2021", "text": "Chiarelli N, Zoppi N, Venturini M, Capitanio D, Gelfi C, Ritelli M, et al. Matrix Metalloproteinases Inhibition by Doxycycline Rescues Extracellular Matrix Organization and Partly Reverts Myofibroblast Differentiation in Hypermobile Ehlers-Danlos Syndrome Dermal Fibroblasts: A Potential Therapeutic Target? Cells. 2021;10(11):3236. PMID 34831458; PMCID PMC8621259; doi:10.3390/cells10113236.", "link": "https://doi.org/10.3390/cells10113236", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Chopra2017", "text": "Chopra P, Tinkle B, Hamonet C, Brock I, Gompel A, Bulbena A, et al. Pain management in the Ehlers-Danlos syndromes. Am J Med Genet C Semin Med Genet. 2017;175(1):212-219. PMID 28186390; doi:10.1002/ajmg.c.31554.", "link": "https://doi.org/10.1002/ajmg.c.31554", "areas": ["C", "E", "F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Choudhary2025", "text": "Choudhary A, Fikree A, Ruffle JK, Takahashi K, Palsson OS, Aziz I, et al. A machine learning approach to stratify patients with hypermobile Ehlers-Danlos syndrome/hypermobility spectrum disorders according to disorders of gut brain interaction, comorbidities and quality of life. Neurogastroenterol Motil. 2025;37(1):e14957. PMID 39543811; PMCID PMC11650402; doi:10.1111/nmo.14957.", "link": "https://doi.org/10.1111/nmo.14957", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Christensen2026Shoulder", "text": "Christensen T, Juhl CB, Juul-Kristensen B, Skou ST, Søndergaard J, Søgaard K, et al. Association Between Changes in Shoulder Strength and Self-Reported Shoulder Symptoms in Patients With Hypermobility Following 16-Weeks of High-Load or Low-Load Exercise: A Secondary Analysis of an RCT. Physiother Res Int. 2026;31(2):e70197. PMID 41848184; PMCID PMC12997522; doi:10.1002/pri.70197.", "link": "https://doi.org/10.1002/pri.70197", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Chuchin2024", "text": "Chuchin JD, Ornstein TJ. Fear avoidance, fear of falling, and pain disability in hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorders. Disabil Rehabil. 2024;46(18):4234-4245. PMID 37843031; doi:10.1080/09638288.2023.2268520.", "link": "https://doi.org/10.1080/09638288.2023.2268520", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Cikrit1987", "text": "Cikrit DF, Miles JH, Silver D. Spontaneous arterial perforation: the Ehlers-Danlos specter. J Vasc Surg. 1987;5(2):248-255. PMID 3546738; doi:10.1016/0741-5214(87)90133-9.", "link": "https://doi.org/10.1016/0741-5214(87)90133-9", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Cinquina2026", "text": "Cinquina V, Carini G, Chiarelli N, Vezzoli M, Bertini V, Venturini M, et al. Proximity extension assay-based serum proteomic profiling identifies shared protein signatures in hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorders. Clin Proteomics. 2026;23(1). PMID 41794655; PMCID PMC13081554; doi:10.1186/s12014-026-09588-2.", "link": "https://doi.org/10.1186/s12014-026-09588-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Clark2024Psych", "text": "Clark NL, Kainth GS, Johnson M, Rangan A, Kottam L, Swainston K. Psychological interventions to improve pain, fatigue, anxiety, depression, and quality of life in children and adults with hypermobility spectrum disorders and Ehlers-Danlos syndrome: a systematic review. Rheumatol Int. 2024;44(1):41-55. PMID 38091036; PMCID PMC10766748; doi:10.1007/s00296-023-05503-2.", "link": "https://doi.org/10.1007/s00296-023-05503-2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Clayton2015", "text": "Clayton HA, Jones SA, Henriques DY. Proprioceptive precision is impaired in Ehlers-Danlos syndrome. Springerplus. 2015;4:323. PMID 26180743; PMCID PMC4493259; doi:10.1186/s40064-015-1089-1.", "link": "https://doi.org/10.1186/s40064-015-1089-1", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Clinch2011", "text": "Clinch J, Deere K, Sayers A, Palmer S, Riddoch C, Tobias JH, et al. Epidemiology of generalized joint laxity (hypermobility) in fourteen-year-old children from the UK: a population-based evaluation. Arthritis Rheum. 2011;63(9):2819-2827. PMID 21547894; PMCID PMC3164233; doi:10.1002/art.30435.", "link": "https://doi.org/10.1002/art.30435", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Colige1999", "text": "Colige A, Sieron AL, Li SW, Schwarze U, Petty E, Wertelecki W, et al. Human Ehlers-Danlos syndrome type VII C and bovine dermatosparaxis are caused by mutations in the procollagen I N-proteinase gene. Am J Hum Genet. 1999;65(2):308-17. PMID 10417273; PMCID PMC1377929; doi:10.1086/302504.", "link": "https://doi.org/10.1086/302504", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "CollinsHutchinson2025", "text": "Collins Hutchinson ML, Liang E, Fuster E, Blitshteyn S. Autonomic symptom burden, comorbidities and quality of life in women with Hypermobility Spectrum Disorders and hypermobile Ehlers-Danlos syndrome. Auton Neurosci. 2025;262:103356. PMID 41118678; doi:10.1016/j.autneu.2025.103356.", "link": "https://doi.org/10.1016/j.autneu.2025.103356", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Colman2021", "text": "Colman M, Syx D, De Wandele I, Dhooge T, Symoens S, Malfait F. Clinical and molecular characteristics of 168 probands and 65 relatives with a clinical presentation of classical Ehlers-Danlos syndrome. Hum Mutat. 2021;42(10):1294-1306. PMID 34265140; doi:10.1002/humu.24258.", "link": "https://doi.org/10.1002/humu.24258", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Colman2023", "text": "Colman M, Syx D, De Wandele I, Rombaut L, Wille D, Malfait Z, et al. Sensory Profiling in Classical Ehlers-Danlos Syndrome: A Case-Control Study Revealing Pain Characteristics, Somatosensory Changes, and Impaired Pain Modulation. J Pain. 2023;24(11):2063-2078. PMID 37380025; doi:10.1016/j.jpain.2023.06.015.", "link": "https://doi.org/10.1016/j.jpain.2023.06.015", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Cooper2018", "text": "Cooper DJ, Scammell BE, Batt ME, Palmer D. Development and validation of self-reported line drawings of the modified Beighton score for the assessment of generalised joint hypermobility. BMC Med Res Methodol. 2018;18(1):11. PMID 29343224; PMCID PMC5772709; doi:10.1186/s12874-017-0464-8.", "link": "https://doi.org/10.1186/s12874-017-0464-8", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Copetti2019", "text": "Copetti M, Morlino S, Colombi M, Grammatico P, Fontana A, Castori M. Severity classes in adults with hypermobile Ehlers-Danlos syndrome/hypermobility spectrum disorders: a pilot study of 105 Italian patients. Rheumatology (Oxford). 2019;58(10):1722-1730. PMID 30783660; doi:10.1093/rheumatology/kez029.", "link": "https://doi.org/10.1093/rheumatology/kez029", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Corrado2018", "text": "Corrado B, Ciardi G. Hypermobile Ehlers-Danlos syndrome and rehabilitation: taking stock of evidence based medicine: a systematic review of the literature. J Phys Ther Sci. 2018;30(6):843-847. PMID 29950777; PMCID PMC6016292; doi:10.1589/jpts.30.847.", "link": "https://doi.org/10.1589/jpts.30.847", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Corrao2026", "text": "Corrao S, Ruggeri MI, Benedetto AD, Corrao G, Calvo L, Scibetta S. Vascular Ehlers-Danlos syndrome: A multidisciplinary clinical framework for early suspicion, emergency-safe management and lifelong care. J Intern Med. 2026 (online ahead of print). PMID 42798186; doi:10.1111/joim.70165.", "link": "https://doi.org/10.1111/joim.70165", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Coussens2021", "text": "Coussens M, Calders P, Lapauw B, Celie B, Banica T, De Wandele I, et al. Does Muscle Strength Change Over Time in Patients With Hypermobile Ehlers-Danlos Syndrome/Hypermobility Spectrum Disorder? An Eight-Year Follow-Up Study. Arthritis Care Res (Hoboken). 2021;73(7):1041-1048. PMID 32293111; doi:10.1002/acr.24220.", "link": "https://doi.org/10.1002/acr.24220", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Coussens2023", "text": "Coussens M, Banica T, Lapauw B, De Wandele I, Rombaut L, Malfait F, et al. Bone parameters in hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorder: A comparative cross-sectional study. Bone. 2023;166:116583. PMID 36243401; doi:10.1016/j.bone.2022.116583.", "link": "https://doi.org/10.1016/j.bone.2022.116583", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Csecs2021", "text": "Csecs JLL, Iodice V, Rae CL, Brooke A, Simmons R, Quadt L, et al. Joint Hypermobility Links Neurodivergence to Dysautonomia and Pain. Front Psychiatry. 2021;12:786916. PMID 35185636; PMCID PMC8847158; doi:10.3389/fpsyt.2021.786916.", "link": "https://doi.org/10.3389/fpsyt.2021.786916", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Daman2019", "text": "Daman M, Shiravani F, Hemmati L, Taghizadeh S. The effect of combined exercise therapy on knee proprioception, pain intensity and quality of life in patients with hypermobility syndrome: A randomized clinical trial. J Bodyw Mov Ther. 2019;23(1):202-205. PMID 30691753; doi:10.1016/j.jbmt.2017.12.012.", "link": "https://doi.org/10.1016/j.jbmt.2017.12.012", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Damseh2022", "text": "Damseh N, Dupuis L, O'Connor C, Oh RY, Wang YW, Stavropoulos DJ, et al. Diagnostic outcomes for molecular genetic testing in children with suspected Ehlers-Danlos syndrome. Am J Med Genet A. 2022;188(5):1376-1383. PMID 35128800; doi:10.1002/ajmg.a.62672.", "link": "https://doi.org/10.1002/ajmg.a.62672", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "David2018F1000", "text": "David FS, Dixit R. How to prevent the next Marathon Pharmaceuticals. F1000Res. 2018;7:74. PMID 29636900; PMCID PMC5865197; doi:10.12688/f1000research.13678.1.", "link": "https://doi.org/10.12688/f1000research.13678.1", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Daylor2025", "text": "Daylor V, Griggs M, Weintraub A, Byrd R, Petrucci T, Huff M, et al. Defining the Chronic Complexities of hEDS and HSD: A Global Survey of Diagnostic Challenges, Life-Long Comorbidities, and Unmet Needs. J Clin Med. 2025;14(16):5636. PMID 40869462; PMCID PMC12386360; doi:10.3390/jcm14165636.", "link": "https://doi.org/10.3390/jcm14165636", "areas": ["D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "DeBaets2021", "text": "De Baets S, Calders P, Verhoost L, Coussens M, Dewandele I, Malfait F, et al. Patient perspectives on employment participation in the \"hypermobile Ehlers-Danlos syndrome\". Disabil Rehabil. 2021;43(5):668-677. PMID 31287330; doi:10.1080/09638288.2019.1636316.", "link": "https://doi.org/10.1080/09638288.2019.1636316", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "DeBaets2022", "text": "De Baets S, Cruyt E, Calders P, Dewandele I, Malfait F, Vanderstraeten G, et al. Societal participation in ehlers-danlos syndromes and hypermobility spectrum disorder, compared to fibromyalgia and healthy controls. PLoS One. 2022;17(6):e0269608. PMID 35709306; PMCID PMC9202833; doi:10.1371/journal.pone.0269608.", "link": "https://doi.org/10.1371/journal.pone.0269608", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "DeCoster2005", "text": "De Coster PJ, Van den Berghe LI, Martens LC. Generalized joint hypermobility and temporomandibular disorders: inherited connective tissue disease as a model with maximum expression. J Orofac Pain. 2005;19(1):47-57. PMID 15779539.", "link": "https://pubmed.ncbi.nlm.nih.gov/15779539/", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Demirdas2017", "text": "Demirdas S, Dulfer E, Robert L, Kempers M, van Beek D, Micha D, et al. Recognizing the tenascin-X deficient type of Ehlers-Danlos syndrome: a cross-sectional study in 17 patients. Clin Genet. 2017;91(3):411-425. PMID 27582382; doi:10.1111/cge.12853.", "link": "https://doi.org/10.1111/cge.12853", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Demirdas2024", "text": "Demirdas S, van den Bersselaar LM, Lechner R, Bos J, Alsters SIM, Baars MJH, et al. Vascular Ehlers-Danlos Syndrome: A Comprehensive Natural History Study in a Dutch National Cohort of 142 Patients. Circ Genom Precis Med. 2024;17(3):e003978. PMID 38623759; PMCID PMC11188628; doi:10.1161/CIRCGEN.122.003978.", "link": "https://doi.org/10.1161/circgen.122.003978", "areas": ["A", "B", "C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Demmler2019", "text": "Demmler JC, Atkinson MD, Reinhold EJ, Choy E, Lyons RA, Brophy ST. Diagnosed prevalence of Ehlers-Danlos syndrome and hypermobility spectrum disorder in Wales, UK: a national electronic cohort study and case-control comparison. BMJ Open. 2019;9(11):e031365. PMID 31685485; PMCID PMC6858200; doi:10.1136/bmjopen-2019-031365.", "link": "https://doi.org/10.1136/bmjopen-2019-031365", "areas": ["A", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "DePaepe2004", "text": "De Paepe A, Malfait F. Bleeding and bruising in patients with Ehlers-Danlos syndrome and other collagen vascular disorders. Br J Haematol. 2004;127(5):491-500. PMID 15566352; doi:10.1111/j.1365-2141.2004.05220.x.", "link": "https://doi.org/10.1111/j.1365-2141.2004.05220.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Devitt2017", "text": "Devitt BM, Smith BN, Stapf R, Tacey M, O'Donnell JM. Generalized Joint Hypermobility Is Predictive of Hip Capsular Thickness. Orthop J Sports Med. 2017;5(4):2325967117701882. PMID 28451620; PMCID PMC5400218; doi:10.1177/2325967117701882.", "link": "https://doi.org/10.1177/2325967117701882", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "DeWandele2014ASP", "text": "De Wandele I, Calders P, Peersman W, Rimbaut S, De Backer T, Malfait F, et al. Autonomic symptom burden in the hypermobility type of Ehlers-Danlos syndrome: a comparative study with two other EDS types, fibromyalgia, and healthy controls. Semin Arthritis Rheum. 2014;44(3):353-61. PMID 24968706; doi:10.1016/j.semarthrit.2014.05.013.", "link": "https://doi.org/10.1016/j.semarthrit.2014.05.013", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "DeWandele2014Mech", "text": "De Wandele I, Rombaut L, Leybaert L, Van de Borne P, De Backer T, Malfait F, et al. Dysautonomia and its underlying mechanisms in the hypermobility type of Ehlers-Danlos syndrome. Semin Arthritis Rheum. 2014;44(1):93-100. PMID 24507822; doi:10.1016/j.semarthrit.2013.12.006.", "link": "https://doi.org/10.1016/j.semarthrit.2013.12.006", "areas": ["G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["DeWandele2014"]}, {"key": "DeWandele2016", "text": "De Wandele I, Rombaut L, De Backer T, Peersman W, Da Silva H, De Mits S, et al. Orthostatic intolerance and fatigue in the hypermobility type of Ehlers-Danlos Syndrome. Rheumatology (Oxford). 2016;55(8):1412-1420. PMID 27094596; doi:10.1093/rheumatology/kew032.", "link": "https://doi.org/10.1093/rheumatology/kew032", "areas": ["C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dhooge2021", "text": "Dhooge T, Van Damme T, Syx D, Mosquera LM, Nampoothiri S, Radhakrishnan A, et al. More than meets the eye: Expanding and reviewing the clinical and mutational spectrum of brittle cornea syndrome. Hum Mutat. 2021;42(6):711-730. PMID 33739556; doi:10.1002/humu.24199.", "link": "https://doi.org/10.1002/humu.24199", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Dietz1991", "text": "Dietz HC, Cutting GR, Pyeritz RE, Maslen CL, Sakai LY, Corson GM, et al. Marfan syndrome caused by a recurrent de novo missense mutation in the fibrillin gene. Nature. 1991;352(6333):337-9. PMID 1852208; doi:10.1038/352337a0.", "link": "https://doi.org/10.1038/352337a0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "DietzGR-Marfan", "text": "Dietz H. FBN1-Related Marfan Syndrome. In: Adam MP, et al., editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993-. NBK1335; last revision 2022-02-17. PMID 20301510.", "link": "https://pubmed.ncbi.nlm.nih.gov/20301510/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "DiStefano2016", "text": "Di Stefano G, Celletti C, Baron R, Castori M, Di Franco M, La Cesa S, et al. Central sensitization as the mechanism underlying pain in joint hypermobility syndrome/Ehlers-Danlos syndrome, hypermobility type. Eur J Pain. 2016;20(8):1319-1325. PMID 26919608; doi:10.1002/ejp.856.", "link": "https://doi.org/10.1002/ejp.856", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dolan1998", "text": "Dolan AL, Arden NK, Grahame R, Spector TD. Assessment of bone in Ehlers Danlos syndrome by ultrasound and densitometry. Ann Rheum Dis. 1998;57(10):630-633. PMID 9893576; PMCID PMC1752482; doi:10.1136/ard.57.10.630.", "link": "https://doi.org/10.1136/ard.57.10.630", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dolan2003", "text": "Dolan AL, Hart DJ, Doyle DV, Grahame R, Spector TD. The relationship of joint hypermobility, bone mineral density, and osteoarthritis in the general population: the Chingford Study. J Rheumatol. 2003;30(4):799-803. PMID 12672202.", "link": "https://pubmed.ncbi.nlm.nih.gov/12672202/", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dolso2023", "text": "Dolsø M, Juul-Kristensen B, Skou ST, Søgaard K, Søndergaard J, Juhl CB, et al. Psychological factors and symptom duration are associated with exercise-based treatment effect in people with hypermobile shoulders: A secondary analysis of a randomised controlled trial. Musculoskelet Sci Pract. 2023;66:102798. PMID 37331257; doi:10.1016/j.msksp.2023.102798.", "link": "https://doi.org/10.1016/j.msksp.2023.102798", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Douglas2026", "text": "Douglas AC, Staas DJ. The WNT/β-catenin Pathway and Matrix Metalloproteinase-9 in hypermobile Ehlers-Danlos Syndrome and Autism Spectrum Disorder: A Possible Connection. J Musculoskelet Neuronal Interact. 2026;26(3):466-481. PMID 42675949; PMCID PMC13539730.", "link": "https://pubmed.ncbi.nlm.nih.gov/42675949/", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dubacher2020", "text": "Dubacher N, Münger J, Gorosabel MC, Crabb J, Ksiazek AA, Caspar SM, et al. Celiprolol but not losartan improves the biomechanical integrity of the aorta in a mouse model of vascular Ehlers-Danlos syndrome. Cardiovasc Res. 2020;116(2):457-465. PMID 31056650; doi:10.1093/cvr/cvz095.", "link": "https://doi.org/10.1093/cvr/cvz095", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dundar2009", "text": "Dündar M, Müller T, Zhang Q, Pan J, Steinmann B, Vodopiutz J, et al. Loss of dermatan-4-sulfotransferase 1 function results in adducted thumb-clubfoot syndrome. Am J Hum Genet. 2009;85(6):873-82. PMID 20004762; PMCID PMC2790573; doi:10.1016/j.ajhg.2009.11.010.", "link": "https://doi.org/10.1016/j.ajhg.2009.11.010", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "EDSociety2026", "text": "The Ehlers-Danlos Society. A Major Update Is Coming to EDS and HSD Diagnosis. News page, dated 11/03/2026. https://www.ehlers-danlos.com/new-global-diagnostic-criteria-2026/ (unverified: organisational web page, not a bibliographic record; the publication itself is not yet available)", "link": "https://www.ehlers-danlos.com/new-global-diagnostic-criteria-2026/", "areas": ["H"], "unverified": true}, {"key": "EDSSociety2025", "text": "The Ehlers-Danlos Society. hEDS/HSD Criteria Review Study update (news page, dated \"10/11/2025\"). https://www.ehlers-danlos.com/heds-hsd-criteria-review-study-update/. Accessed 2026-10-25. (unverified: organisation web page, not indexed in PubMed or Crossref)", "link": "https://www.ehlers-danlos.com/heds-hsd-criteria-review-study-update/", "areas": ["D"], "unverified": true}, {"key": "EDSSociety2025Criteria", "text": "The Ehlers-Danlos Society. hEDS & HSD criteria review study update (news item, published 10/11/2025). https://www.ehlers-danlos.com/heds-hsd-criteria-review-study-update/ (accessed 2026-10-25). (unverified: organisation web page, not indexed by a validation service)", "link": "https://www.ehlers-danlos.com/heds-hsd-criteria-review-study-update/", "areas": ["A"], "unverified": true}, {"key": "EDSSociety2026", "text": "The Ehlers-Danlos Society. New global diagnostic criteria 2026 (news page, dated \"11/03/2026\"). https://www.ehlers-danlos.com/new-global-diagnostic-criteria-2026/. Accessed 2026-10-25. (unverified: organisation web page, not indexed in PubMed or Crossref)", "link": "https://www.ehlers-danlos.com/new-global-diagnostic-criteria-2026/", "areas": ["D"], "unverified": true}, {"key": "EDSSociety2026Criteria", "text": "The Ehlers-Danlos Society. New global diagnostic criteria 2026 (news item, published 11/03/2026). https://www.ehlers-danlos.com/new-global-diagnostic-criteria-2026/ (accessed 2026-10-25). (unverified: organisation web page, not indexed by a validation service; essential for the announced criteria date)", "link": "https://www.ehlers-danlos.com/new-global-diagnostic-criteria-2026/", "areas": ["A"], "unverified": true}, {"key": "Eisenbeiss2003", "text": "Eisenbeiss C, Martinez A, Hagedorn-Greiwe M, Reinhardt DP, Bätge B, Brinckmann J. Reduced skin thickness: a new minor diagnostic criterion for the classical and hypermobility types of Ehlers-Danlos syndrome. Br J Dermatol. 2003;149(4):850-852. PMID 14616379; doi:10.1046/j.1365-2133.2003.05439.x.", "link": "https://doi.org/10.1046/j.1365-2133.2003.05439.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "EllerVainicher2016", "text": "Eller-Vainicher C, Bassotti A, Imeraj A, Cairoli E, Ulivieri FM, Cortini F, et al. Bone involvement in adult patients affected with Ehlers-Danlos syndrome. Osteoporos Int. 2016;27(8):2525-2531. PMID 27084695; doi:10.1007/s00198-016-3562-2.", "link": "https://doi.org/10.1007/s00198-016-3562-2", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "ElMasri2018", "text": "El Masri H, Loong TH, Meurette G, Podevin J, Zinzindohoue F, Lehur PA. Bowel perforation in type IV vascular Ehlers-Danlos syndrome. A systematic review. Tech Coloproctol. 2018;22(5):333-341. PMID 29700641; doi:10.1007/s10151-018-1783-4.", "link": "https://doi.org/10.1007/s10151-018-1783-4", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Engelbert2003", "text": "Engelbert RH, Bank RA, Sakkers RJ, Helders PJ, Beemer FA, Uiterwaal CS. Pediatric generalized joint hypermobility with and without musculoskeletal complaints: a localized or systemic disorder?. Pediatrics. 2003;111(3):e248-54. PMID 12612280; doi:10.1542/peds.111.3.e248.", "link": "https://doi.org/10.1542/peds.111.3.e248", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Engelbert2017", "text": "Engelbert RH, Juul-Kristensen B, Pacey V, de Wandele I, Smeenk S, Woinarosky N, et al. The evidence-based rationale for physical therapy treatment of children, adolescents, and adults diagnosed with joint hypermobility syndrome/hypermobile Ehlers Danlos syndrome. Am J Med Genet C Semin Med Genet. 2017;175(1):158-167. PMID 28306230; doi:10.1002/ajmg.c.31545.", "link": "https://doi.org/10.1002/ajmg.c.31545", "areas": ["E", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Estrella2024", "text": "Estrella E, Frazier PA. Healthcare experiences among adults with hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorder in the United States. Disabil Rehabil. 2024;46(4):731-740. PMID 36772820; doi:10.1080/09638288.2023.2176554.", "link": "https://doi.org/10.1080/09638288.2023.2176554", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Ewer2024", "text": "Ewer ER, De Pauw R, Kazkazk H, Ninis N, Rowe P, Simmonds JV, et al. The Spider: a visual, multisystemic symptom impact questionnaire for people with hypermobility-related disorders-validation in adults. Clin Rheumatol. 2024;43(9):3005-3017. PMID 39085705; PMCID PMC11330398; doi:10.1007/s10067-024-07071-7.", "link": "https://doi.org/10.1007/s10067-024-07071-7", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Fairweather2025", "text": "Fairweather D, Bruno KA, Darakjian AA, Wilson FC, Fliess JJ, Murphy EF, et al. Localized and historical hypermobile spectrum disorders share self-reported symptoms and comorbidities with hEDS and HSD. Front Med (Lausanne). 2025;12:1594796. PMID 40880755; PMCID PMC12380834; doi:10.3389/fmed.2025.1594796.", "link": "https://doi.org/10.3389/fmed.2025.1594796", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "FaiyazUlHaque2004", "text": "Faiyaz-Ul-Haque M, Zaidi SH, Al-Ali M, Al-Mureikhi MS, Kennedy S, Al-Thani G, et al. A novel missense mutation in the galactosyltransferase-I (B4GALT7) gene in a family exhibiting facioskeletal anomalies and Ehlers-Danlos syndrome resembling the progeroid type. Am J Med Genet A. 2004;128A(1):39-45. PMID 15211654; doi:10.1002/ajmg.a.30005.", "link": "https://doi.org/10.1002/ajmg.a.30005", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Fatoye2009", "text": "Fatoye F, Palmer S, Macmillan F, Rowe P, van der Linden M. Proprioception and muscle torque deficits in children with hypermobility syndrome. Rheumatology (Oxford). 2009;48(2):152-157. PMID 19088133; doi:10.1093/rheumatology/ken435.", "link": "https://doi.org/10.1093/rheumatology/ken435", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fatoye2011", "text": "Fatoye FA, Palmer S, van der Linden ML, Rowe PJ, Macmillan F. Gait kinematics and passive knee joint range of motion in children with hypermobility syndrome. Gait Posture. 2011;33(3):447-451. PMID 21300548; doi:10.1016/j.gaitpost.2010.12.022.", "link": "https://doi.org/10.1016/j.gaitpost.2010.12.022", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "FDA-Corlanor", "text": "US FDA. Corlanor (ivabradine) prescribing information (Amgen; NDA206143/NDA209964; set id 92018a65-38f6-45f7-91d4-a34921b81d0d; effective 2025-11-10): indications, dosing, contraindications, fetal toxicity warning. Drugs@FDA NDA206143 original approval 2015-04-15, priority review.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Fludrocortisone", "text": "US FDA. Fludrocortisone acetate tablets prescribing information (American Health Packaging; ANDA040431; set id 001e72ea-2c9e-468c-90cc-6c347234e2a9; effective 2025-05-19).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Gastrocrom", "text": "US FDA. Gastrocrom (cromolyn sodium oral concentrate) prescribing information (Viatris Specialty; NDA020479; effective 2024-06-26): indication.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-InderalLA", "text": "US FDA. Inderal LA (propranolol hydrochloride) prescribing information (ANI Pharmaceuticals; NDA018553; set id 35d28979-36b1-4630-b85e-a44e0a443734; effective 2026-08-24).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Mestinon", "text": "US FDA. Mestinon (pyridostigmine bromide) prescribing information (Bausch Health US; NDA009829/NDA015193/NDA011665; set id a851795e-b7a8-40c3-9922-5e79d3eb4d92; effective 2020-12-02).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Midodrine", "text": "US FDA. Midodrine hydrochloride tablets prescribing information (Alembic Pharmaceuticals; ANDA214734; set id 03b54024-2a26-4abe-bd8b-b66bb6781fa7; effective 2023-01-27): boxed warning, indication and dosing. Drugs@FDA NDA019815 (ProAmatine): original approval 1996-09-06, priority review.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Northera", "text": "US FDA. Northera (droxidopa) prescribing information (Lundbeck; NDA203202; set id 2179f02c-48d7-48eb-8007-5ae43d8d16bc; effective 2019-07-01): boxed warning and indication.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "Feldman2023", "text": "Feldman ECH, Homan KJ, Williams SE, Ting TV, Goldschneider KR, Kashikar-Zuck S. A narrative review of the literature on illness uncertainty in hypermobile ehlers-danlos syndrome: implications for research and clinical practice. Pediatr Rheumatol Online J. 2023;21(1):121. PMID 37845704; PMCID PMC10577933; doi:10.1186/s12969-023-00908-6.", "link": "https://doi.org/10.1186/s12969-023-00908-6", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Fernandez2024", "text": "Fernandez A, Jaquet M, Aubry-Rozier B, Suter M, Aybek S, Berna C. Functional neurological signs in hypermobile Ehlers-Danlos syndrome and hypermobile spectrum disorders with suspected neuropathic pain. Brain Behav. 2024;14(2):e3441. PMID 38409931; PMCID PMC10897362; doi:10.1002/brb3.3441.", "link": "https://doi.org/10.1002/brb3.3441", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ferrell2004", "text": "Ferrell WR, Tennant N, Sturrock RD, Ashton L, Creed G, Brydson G, et al. Amelioration of symptoms by enhancement of proprioception in patients with joint hypermobility syndrome. Arthritis Rheum. 2004;50(10):3323-3328. PMID 15476239; doi:10.1002/art.20582.", "link": "https://doi.org/10.1002/art.20582", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fikree2014", "text": "Fikree A, Grahame R, Aktar R, Farmer AD, Hakim AJ, Morris JK, et al. A prospective evaluation of undiagnosed joint hypermobility syndrome in patients with gastrointestinal symptoms. Clin Gastroenterol Hepatol. 2014;12(10):1680-87.e2. PMID 24440216; doi:10.1016/j.cgh.2014.01.014.", "link": "https://doi.org/10.1016/j.cgh.2014.01.014", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Fikree2015", "text": "Fikree A, Aktar R, Grahame R, Hakim AJ, Morris JK, Knowles CH, et al. Functional gastrointestinal disorders are associated with the joint hypermobility syndrome in secondary care: a case-control study. Neurogastroenterol Motil. 2015;27(4):569-79. PMID 25817057; doi:10.1111/nmo.12535.", "link": "https://doi.org/10.1111/nmo.12535", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Flegge2025", "text": "Flegge LG, Estrella E, Harris EK, Hirsh AT, Bushey MA. Symptomatic joint hypermobility is not a barrier to attendance, graduation, or satisfaction for adults participating in a multidisciplinary pain rehabilitation program. Front Pain Res (Lausanne). 2025;6:1472160. PMID 40182801; PMCID PMC11967196; doi:10.3389/fpain.2025.1472160.", "link": "https://doi.org/10.3389/fpain.2025.1472160", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Fletcher2025", "text": "Fletcher EKS, Fischer AL, Manocha RHK. Depressive symptoms are highly prevalent and associated with fatigue and pain catastrophizing in the Hypermobility Spectrum Disorders and hypermobile Ehlers Danlos syndrome: a cross-sectional study. Rheumatol Int. 2025;45(5):128. PMID 40293579; doi:10.1007/s00296-025-05869-5.", "link": "https://doi.org/10.1007/s00296-025-05869-5", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Flowers2018", "text": "Flowers PPE, Cleveland RJ, Schwartz TA, Nelson AE, Kraus VB, Hillstrom HJ, et al. Association between general joint hypermobility and knee, hip, and lumbar spine osteoarthritis by race: a cross-sectional study. Arthritis Res Ther. 2018;20(1):76. PMID 29669593; PMCID PMC5907300; doi:10.1186/s13075-018-1570-7.", "link": "https://doi.org/10.1186/s13075-018-1570-7", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Forghani2019", "text": "Forghani I. Updates in Clinical and Genetics Aspects of Hypermobile Ehlers Danlos Syndrome. Balkan Med J. 2019;36(1):12-16. PMID 30063214; PMCID PMC6335943; doi:10.4274/balkanmedj.2018.1113.", "link": "https://doi.org/10.4274/balkanmedj.2018.1113", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Forghani2025", "text": "Forghani I, See J, McGonigle WC. Hypermobile Ehlers-Danlos Syndrome: Diagnostic Challenges and the Role of Genetic Testing. Genes (Basel). 2025;16(5):530. PMID 40428350; PMCID PMC12111038; doi:10.3390/genes16050530.", "link": "https://doi.org/10.3390/genes16050530", "areas": ["A", "B"], "unverified": false, "validated": "Europe PMC"}, {"key": "FozFelipe2025", "text": "Foz Felipe D, Casas-Alba D, Sadok SH, Toral Fernández M, Vega-Hanna L, Plaza L, et al. Unveiling the Spectrum: Clinical and Molecular Insights from a Spanish Pediatric Cohort with Hypermobility Disorders and Ehlers-Danlos Syndrome. Genes (Basel). 2025;16(8):925. PMID 40869974; PMCID PMC12386060; doi:10.3390/genes16080925.", "link": "https://doi.org/10.3390/genes16080925", "areas": ["A", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Frank2015", "text": "Frank M, Albuisson J, Ranque B, Golmard L, Mazzella JM, Bal-Theoleyre L, et al. The type of variants at the COL3A1 gene associates with the phenotype and severity of vascular Ehlers-Danlos syndrome. Eur J Hum Genet. 2015;23(12):1657-64. PMID 25758994; PMCID PMC4795191; doi:10.1038/ejhg.2015.32.", "link": "https://doi.org/10.1038/ejhg.2015.32", "areas": ["B", "D", "F", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Frank2019JACC", "text": "Frank M, Adham S, Seigle S, Legrand A, Mirault T, Henneton P, et al. Vascular Ehlers-Danlos Syndrome: Long-Term Observational Study. J Am Coll Cardiol. 2019;73(15):1948-1957. PMID 30999998; doi:10.1016/j.jacc.2019.01.058.", "link": "https://doi.org/10.1016/j.jacc.2019.01.058", "areas": ["F", "G", "H"], "unverified": false, "validated": "Europe PMC", "aliases": ["Frank2019"]}, {"key": "Fu2010JACC", "text": "Fu Q, Vangundy TB, Galbreath MM, Shibata S, Jain M, Hastings JL, et al. Cardiac origins of the postural orthostatic tachycardia syndrome. J Am Coll Cardiol. 2010;55(25):2858-2868. PMID 20579544; PMCID PMC2914315; doi:10.1016/j.jacc.2010.02.043.", "link": "https://doi.org/10.1016/j.jacc.2010.02.043", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fu2011Hypertension", "text": "Fu Q, Vangundy TB, Shibata S, Auchus RJ, Williams GH, Levine BD. Exercise training versus propranolol in the treatment of the postural orthostatic tachycardia syndrome. Hypertension. 2011;58(2):167-175. PMID 21690484; PMCID PMC3142863; doi:10.1161/HYPERTENSIONAHA.111.172262.", "link": "https://doi.org/10.1161/hypertensionaha.111.172262", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gaisl2017", "text": "Gaisl T, Giunta C, Bratton DJ, Sutherland K, Schlatzer C, Sievi N, et al. Obstructive sleep apnoea and quality of life in Ehlers-Danlos syndrome: a parallel cohort study. Thorax. 2017;72(8):729-735. PMID 28073822; doi:10.1136/thoraxjnl-2016-209560.", "link": "https://doi.org/10.1136/thoraxjnl-2016-209560", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Galli2011", "text": "Galli M, Cimolin V, Rigoldi C, Castori M, Celletti C, Albertini G, et al. Gait strategy in patients with Ehlers-Danlos syndrome hypermobility type: a kinematic and kinetic evaluation using 3D gait analysis. Res Dev Disabil. 2011;32(5):1663-1668. PMID 21420276; doi:10.1016/j.ridd.2011.02.018.", "link": "https://doi.org/10.1016/j.ridd.2011.02.018", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Garland2021JACC", "text": "Garland EM, Gamboa A, Nwazue VC, Celedonio JE, Paranjape SY, Black BK, et al. Effect of High Dietary Sodium Intake in Patients With Postural Tachycardia Syndrome. J Am Coll Cardiol. 2021;77(17):2174-2184. PMID 33926653; PMCID PMC8103825; doi:10.1016/j.jacc.2021.03.005.", "link": "https://doi.org/10.1016/j.jacc.2021.03.005", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gazit2003", "text": "Gazit Y, Nahir AM, Grahame R, Jacob G. Dysautonomia in the joint hypermobility syndrome. Am J Med. 2003;115(1):33-40. PMID 12867232; doi:10.1016/s0002-9343(03)00235-3.", "link": "https://doi.org/10.1016/s0002-9343(03)00235-3", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Gensemer2021", "text": "Gensemer C, Burks R, Kautz S, Judge DP, Lavallee M, Norris RA. Hypermobile Ehlers-Danlos syndromes: Complex phenotypes, challenging diagnoses, and poorly understood causes. Dev Dyn. 2021;250(3):318-344. PMID 32629534; PMCID PMC7785693; doi:10.1002/dvdy.220.", "link": "https://doi.org/10.1002/dvdy.220", "areas": ["B", "D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Gensemer2025KLK15", "text": "Gensemer C, Petrucci T, Beck T, Daylor V, Griggs M, Griggs C, et al. KLK15 alters connective tissues in hypermobile Ehlers-Danlos syndrome. iScience. 2025;28(9):113343. PMID 40949095; PMCID PMC12424230; doi:10.1016/j.isci.2025.113343.", "link": "https://doi.org/10.1016/j.isci.2025.113343", "areas": ["B", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Gensemer2025"]}, {"key": "Germain2002", "text": "Germain DP. Clinical and genetic features of vascular Ehlers-Danlos syndrome. Ann Vasc Surg. 2002;16(3):391-397. PMID 12016538; doi:10.1007/s10016-001-0229-y.", "link": "https://doi.org/10.1007/s10016-001-0229-y", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Germain2007", "text": "Germain DP. Ehlers-Danlos syndrome type IV. Orphanet J Rare Dis. 2007;2:32. PMID 17640391; PMCID PMC1971255; doi:10.1186/1750-1172-2-32.", "link": "https://doi.org/10.1186/1750-1172-2-32", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Ghali2019GenetMed", "text": "Ghali N, Baker D, Brady AF, Burrows N, Cervi E, Cilliers D, et al. Atypical COL3A1 variants (glutamic acid to lysine) cause vascular Ehlers-Danlos syndrome with a consistent phenotype of tissue fragility and skin hyperextensibility. Genet Med. 2019;21(9):2081-2091. PMID 30837697; doi:10.1038/s41436-019-0470-9.", "link": "https://doi.org/10.1038/s41436-019-0470-9", "areas": ["B", "D"], "unverified": false, "validated": "PubMed", "aliases": ["Ghali2019"]}, {"key": "Giunta2008", "text": "Giunta C, Elçioglu NH, Albrecht B, Eich G, Chambaz C, Janecke AR, et al. Spondylocheiro dysplastic form of the Ehlers-Danlos syndrome--an autosomal-recessive entity caused by mutations in the zinc transporter gene SLC39A13. Am J Hum Genet. 2008;82(6):1290-305. PMID 18513683; PMCID PMC2427271; doi:10.1016/j.ajhg.2008.05.001.", "link": "https://doi.org/10.1016/j.ajhg.2008.05.001", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Giunta2018", "text": "Giunta C, Baumann M, Fauth C, Lindert U, Abdalla EM, Brady AF, et al. A cohort of 17 patients with kyphoscoliotic Ehlers-Danlos syndrome caused by biallelic mutations in FKBP14: expansion of the clinical and mutational spectrum and description of the natural history. Genet Med. 2018;20(1):42-54. PMID 28617417; PMCID PMC5763155; doi:10.1038/gim.2017.70.", "link": "https://doi.org/10.1038/gim.2017.70", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "GiuntaGR-FKBP14", "text": "Giunta C, Rohrbach M, Fauth C, Baumann M. FKBP14 Kyphoscoliotic Ehlers-Danlos Syndrome. In: Adam MP, et al., editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993-. NBK541503; last revision 2019-05-23. PMID 31132235.", "link": "https://pubmed.ncbi.nlm.nih.gov/31132235/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Glans2020", "text": "Glans M, Humble MB, Elwin M, Bejerot S. Self-rated joint hypermobility: the five-part questionnaire evaluated in a Swedish non-clinical adult population. BMC Musculoskelet Disord. 2020;21(1):174. PMID 32183749; PMCID PMC7079417; doi:10.1186/s12891-020-3067-1.", "link": "https://doi.org/10.1186/s12891-020-3067-1", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Glans2025", "text": "Glans MR, Aziz A, Kindgren E, Knez R, Landgren M, Landgren V. No association between joint hypermobility, musculoskeletal pain and neurodevelopmental problems in a school-based sample of 11-year-old children. BJPsych Open. 2025;11(6):e262. PMID 41178087; PMCID PMC12641418; doi:10.1192/bjo.2025.10881.", "link": "https://doi.org/10.1192/bjo.2025.10881", "areas": ["D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Grahame2000", "text": "Grahame R, Bird HA, Child A. The revised (Brighton 1998) criteria for the diagnosis of benign joint hypermobility syndrome (BJHS). J Rheumatol. 2000;27(7):1777-1779. PMID 10914867. No DOI listed.", "link": "https://pubmed.ncbi.nlm.nih.gov/10914867/", "areas": ["A", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Green2020clEDS", "text": "Green C, Ghali N, Akilapa R, Angwin C, Baker D, Bartlett M, et al. Classical-like Ehlers-Danlos syndrome: a clinical description of 20 newly identified individuals with evidence of tissue fragility. Genet Med. 2020;22(10):1576-1582. PMID 32572181; doi:10.1038/s41436-020-0850-1.", "link": "https://doi.org/10.1038/s41436-020-0850-1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Griggs2025", "text": "Griggs M, Daylor V, Petrucci T, Weintraub A, Huff M, Willey S, et al. Proteomic discoveries in hypermobile Ehlers-Danlos syndrome reveal insights into disease pathophysiology. Immunohorizons. 2025;9(10):vlaf044. PMID 40972649; PMCID PMC12448790; doi:10.1093/immhor/vlaf044.", "link": "https://doi.org/10.1093/immhor/vlaf044", "areas": ["A", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Guarnieri2019", "text": "Guarnieri V, Morlino S, Di Stolfo G, Mastroianno S, Mazza T, Castori M. Cardiac valvular Ehlers-Danlos syndrome is a well-defined condition due to recessive null variants in COL1A2. Am J Med Genet A. 2019;179(5):846-851. PMID 30821104; doi:10.1002/ajmg.a.61100.", "link": "https://doi.org/10.1002/ajmg.a.61100", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Guedry2024", "text": "Guedry SE, Langley BO, Schaefer K, Hanes DA. Integrative medicine for hypermobility spectrum disorders (HSD) and Ehlers-Danlos syndromes (EDS): a feasibility study. Disabil Rehabil. 2024;46(24):5854-5867. PMID 38353245; doi:10.1080/09638288.2024.2314713.", "link": "https://doi.org/10.1080/09638288.2024.2314713", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Guier2020", "text": "Guier C, Shi G, Ledford C, Taunton M, Heckman M, Wilke B. Primary Total Hip Arthroplasty in Patients With Ehlers-Danlos Syndrome: A Retrospective Matched-Cohort Study. Arthroplast Today. 2020;6(3):386-389. PMID 32577483; PMCID PMC7303917; doi:10.1016/j.artd.2020.05.006.", "link": "https://doi.org/10.1016/j.artd.2020.05.006", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Guilleminault2013", "text": "Guilleminault C, Primeau M, Chiu HY, Yuen KM, Leger D, Metlaine A. Sleep-disordered breathing in Ehlers-Danlos syndrome: a genetic model of OSA. Chest. 2013;144(5):1503-1511. PMID 23929538; doi:10.1378/chest.13-0174.", "link": "https://doi.org/10.1378/chest.13-0174", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gulbahar2006", "text": "Gulbahar S, Sahin E, Baydar M, Bircan C, Kizil R, Manisali M, et al. Hypermobility syndrome increases the risk for low bone mass. Clin Rheumatol. 2006;25(4):511-514. PMID 16311714; doi:10.1007/s10067-005-0103-3.", "link": "https://doi.org/10.1007/s10067-005-0103-3", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Haem2024", "text": "Haem T, Benson B, Dernoncourt A, Gondry J, Schmidt J, Foulon A. Vascular Ehlers-Danlos syndrome and pregnancy: A systematic review. BJOG. 2024;131(12):1620-1629. PMID 38926786; doi:10.1111/1471-0528.17893.", "link": "https://doi.org/10.1111/1471-0528.17893", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Hakim2003", "text": "Hakim AJ, Grahame R. A simple questionnaire to detect hypermobility: an adjunct to the assessment of patients with diffuse musculoskeletal pain. Int J Clin Pract. 2003;57(3):163-166. PMID 12723715. No DOI listed.", "link": "https://pubmed.ncbi.nlm.nih.gov/12723715/", "areas": ["A", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hakim2017", "text": "Hakim A, O'Callaghan C, De Wandele I, Stiles L, Pocinki A, Rowe P. Cardiovascular autonomic dysfunction in Ehlers-Danlos syndrome-Hypermobile type. Am J Med Genet C Semin Med Genet. 2017;175(1):168-174. PMID 28160388; doi:10.1002/ajmg.c.31543.", "link": "https://doi.org/10.1002/ajmg.c.31543", "areas": ["C", "E", "F", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hakim2017Fatigue", "text": "Hakim A, De Wandele I, O'Callaghan C, Pocinki A, Rowe P. Chronic fatigue in Ehlers-Danlos syndrome-Hypermobile type. Am J Med Genet C Semin Med Genet. 2017;175(1):175-180. PMID 28186393; doi:10.1002/ajmg.c.31542.", "link": "https://doi.org/10.1002/ajmg.c.31542", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hakim2024GeneReviews", "text": "Hakim A. Hypermobile Ehlers-Danlos Syndrome. In: Adam MP, Bick S, Mirzaa GM, Wallace SE, Amemiya A, editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993–2026. 2004 Oct 22 [updated 2024 Feb 22]. PMID 20301456.", "link": "https://pubmed.ncbi.nlm.nih.gov/20301456/", "areas": ["H", "B", "G", "F"], "unverified": false, "validated": "PubMed", "aliases": ["HakimGR-hEDS", "Hakim2024GR"]}, {"key": "Hakimi2020", "text": "Hakimi A, Bergoin C, Mucci P. Immediate and 6-week after effects of a rehabilitation program for Ehlers-Danlos syndrome hypermobile type patients: A retrospective study. Am J Med Genet A. 2020;182(10):2263-2271. PMID 32738018; doi:10.1002/ajmg.a.61772.", "link": "https://doi.org/10.1002/ajmg.a.61772", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Hakimi2023", "text": "Hakimi A, Bergoin C, De Jesus A, Hoorelbeke A, Ramon P, Florea O, et al. Multiple Sustainable Benefits of a Rehabilitation Program in Therapeutic Management of Hypermobile Ehlers-Danlos Syndrome: A Prospective and Controlled Study at Short- and Medium-Term. Arch Phys Med Rehabil. 2023;104(12):2059-2066. PMID 37406924; doi:10.1016/j.apmr.2023.06.012.", "link": "https://doi.org/10.1016/j.apmr.2023.06.012", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Hall1995", "text": "Hall MG, Ferrell WR, Sturrock RD, Hamblen DL, Baxendale RH. The effect of the hypermobility syndrome on knee joint proprioception. Br J Rheumatol. 1995;34(2):121-125. PMID 7704456; doi:10.1093/rheumatology/34.2.121.", "link": "https://doi.org/10.1093/rheumatology/34.2.121", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Halverson2021", "text": "Halverson CME, Clayton EW, Garcia Sierra A, Francomano C. Patients with Ehlers-Danlos syndrome on the diagnostic odyssey: Rethinking complexity and difficulty as a hero's journey. Am J Med Genet C Semin Med Genet. 2021;187(4):416-424. PMID 34524722; doi:10.1002/ajmg.c.31935.", "link": "https://doi.org/10.1002/ajmg.c.31935", "areas": ["A", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Halverson2023", "text": "Halverson CME, Cao S, Perkins SM, Francomano CA. Comorbidity, misdiagnoses, and the diagnostic odyssey in patients with hypermobile Ehlers-Danlos syndrome. Genet Med Open. 2023;1(1):100812. PMID 39669244; PMCID PMC11613559; doi:10.1016/j.gimo.2023.100812.", "link": "https://doi.org/10.1016/j.gimo.2023.100812", "areas": ["A", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Halverson2025", "text": "Halverson CME, Vershaw SL, Francomano CA, Doyle T. Sources and consequences of self-doubt in patients with Ehlers-Danlos syndrome: a qualitative study in Europe and North America. BMJ Open. 2025;15(12):e109681. PMID 41387006; PMCID PMC12706247; doi:10.1136/bmjopen-2025-109681.", "link": "https://doi.org/10.1136/bmjopen-2025-109681", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hausser1994", "text": "Hausser I, Anton-Lamprecht I. Differential ultrastructural aberrations of collagen fibrils in Ehlers-Danlos syndrome types I-IV as a means of diagnostics and classification. Hum Genet. 1994;93(4):394-407. PMID 8168810; doi:10.1007/bf00201664.", "link": "https://doi.org/10.1007/bf00201664", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Henderson2017", "text": "Henderson FC Sr, Austin C, Benzel E, Bolognese P, Ellenbogen R, Francomano CA, et al. Neurological and spinal manifestations of the Ehlers-Danlos syndromes. Am J Med Genet C Semin Med Genet. 2017;175(1):195-211. PMID 28220607; doi:10.1002/ajmg.c.31549.", "link": "https://doi.org/10.1002/ajmg.c.31549", "areas": ["C", "F", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Henderson2024", "text": "Henderson FC Sr, Schubart JR, Narayanan MV, Tuchman K, Mills SE, Poppe DJ, et al. Craniocervical instability in patients with Ehlers-Danlos syndromes: outcomes analysis following occipito-cervical fusion. Neurosurg Rev. 2024;47(1):27. PMID 38163828; PMCID PMC10758368; doi:10.1007/s10143-023-02249-0.", "link": "https://doi.org/10.1007/s10143-023-02249-0", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Henning2026", "text": "Henning M, Hock M, Shukri A, Löw V, Kernich N, Rauterberg J, et al. Prevalence and management of mental health comorbidities in a German cohort of patients with Ehlers-Danlos syndromes and a generalized hypermobility spectrum disorder. Orphanet J Rare Dis. 2026;21(1):83. PMID 41634809; PMCID PMC12958675; doi:10.1186/s13023-026-04242-4.", "link": "https://doi.org/10.1186/s13023-026-04242-4", "areas": ["A", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hershenfeld2016", "text": "Hershenfeld SA, Wasim S, McNiven V, Parikh M, Majewski P, Faghfoury H, et al. Psychiatric disorders in Ehlers-Danlos syndrome are frequent, diverse and strongly associated with pain. Rheumatol Int. 2016;36(3):341-348. PMID 26433894; doi:10.1007/s00296-015-3375-1.", "link": "https://doi.org/10.1007/s00296-015-3375-1", "areas": ["C", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Higo2024", "text": "Higo A, Palmer S, Liaghat B, Tallis J, Silvester L, Pearce G. The Effectiveness of Conservative Interventions on Pain, Function, and Quality of Life in Adults with Hypermobile Ehlers-Danlos Syndrome/Hypermobility Spectrum Disorders and Shoulder Symptoms: A Systematic Review. Arch Rehabil Res Clin Transl. 2024;6(3):100360. PMID 39372240; PMCID PMC11447556; doi:10.1016/j.arrct.2024.100360.", "link": "https://doi.org/10.1016/j.arrct.2024.100360", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Holmes2018Fibril", "text": "Holmes DF, Lu Y, Starborg T, Kadler KE. Collagen Fibril Assembly and Function. Curr Top Dev Biol. 2018;130:107-142. PMID 29853175; doi:10.1016/bs.ctdb.2018.02.004.", "link": "https://doi.org/10.1016/bs.ctdb.2018.02.004", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hopperger2024", "text": "Höpperger S, Spathopoulou A, Mayer-Suess L, Suarez-Cubero M, Sillaber K, Spreiz A, et al. Generation of the human induced pluripotent stem cell line (IBKMOLi003-A) from PBMCs of a vascular Ehlers-Danlos syndrome (vEDS) patient carrying the heterozygous nonsense mutation c.430C > T (p.Q105) in the COL3A1 gene. Stem Cell Res. 2024;75:103321. PMID 38301384; doi:10.1016/j.scr.2024.103321.", "link": "https://doi.org/10.1016/j.scr.2024.103321", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hornsby2023", "text": "Hornsby EA, Tucker K, Johnston LM. Reproducibility of Hypermobility Assessment Scales for Children When Performed Using Telehealth versus In-Person Modes. Phys Occup Ther Pediatr. 2023;43(4):446-462. PMID 36482699; doi:10.1080/01942638.2022.2151393.", "link": "https://doi.org/10.1080/01942638.2022.2151393", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hornsby2024", "text": "Hornsby EA, Johnston LM. Impact of a Pilates intervention on physical function in children with generalised joint hypermobility and chronic musculoskeletal pain: A single-case experimental design. J Bodyw Mov Ther. 2024;40:30-41. PMID 39593600; doi:10.1016/j.jbmt.2024.02.012.", "link": "https://doi.org/10.1016/j.jbmt.2024.02.012", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "HugonRodin2016", "text": "Hugon-Rodin J, Lebègue G, Becourt S, Hamonet C, Gompel A. Gynecologic symptoms and the influence on reproductive life in 386 women with hypermobility type ehlers-danlos syndrome: a cohort study. Orphanet J Rare Dis. 2016;11(1):124. PMID 27619482; PMCID PMC5020453; doi:10.1186/s13023-016-0511-2.", "link": "https://doi.org/10.1186/s13023-016-0511-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Hulmes2002", "text": "Hulmes DJ. Building collagen molecules, fibrils, and suprafibrillar structures. J Struct Biol. 2002;137(1-2):2-10. PMID 12064927; doi:10.1006/jsbi.2002.4450.", "link": "https://doi.org/10.1006/jsbi.2002.4450", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Igharo2023", "text": "Igharo D, Thiel JC, Rolke R, Akkaya M, Weis J, Katona I, et al. Skin biopsy reveals generalized small fibre neuropathy in hypermobile Ehlers-Danlos syndromes. Eur J Neurol. 2023;30(3):719-728. PMID 36437696; doi:10.1111/ene.15649.", "link": "https://doi.org/10.1111/ene.15649", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Isselbacher2022", "text": "Isselbacher EM, Preventza O, Hamilton Black J, Augoustides JG, Beck AW, Bolen MA, et al. 2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease: A Report of the American Heart Association/American College of Cardiology Joint Committee on Clinical Practice Guidelines. Circulation. 2022;146(24):e334-e482. PMID 36322642; PMCID PMC9876736; doi:10.1161/CIR.0000000000001106. Section 6.1.2.4 read in full text.", "link": "https://doi.org/10.1161/cir.0000000000001106", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Izumi2025", "text": "Izumi R, Hayashi K, Sato M, Yamaguchi T, Suzuki A, Nakaya Y, et al. Intramuscular hemorrhage during rehabilitation in a post-stroke patient with vascular Ehlers-Danlos syndrome: a case report and review of spasticity-related muscle injury. Front Rehabil Sci. 2025;6:1638656. PMID 41020269; PMCID PMC12464579; doi:10.3389/fresc.2025.1638656.", "link": "https://doi.org/10.3389/fresc.2025.1638656", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Jacome1999", "text": "Jacome DE. Headache in Ehlers-Danlos syndrome. Cephalalgia. 1999;19(9):791-796. PMID 10595288; doi:10.1046/j.1468-2982.1999.1909791.x.", "link": "https://doi.org/10.1046/j.1468-2982.1999.1909791.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Jansson2004", "text": "Jansson A, Saartok T, Werner S, Renström P. General joint laxity in 1845 Swedish school children of different ages: age- and gender-specific distributions. Acta Paediatr. 2004;93(9):1202-6. PMID 15384884; doi:10.1080/08035250410023971.", "link": "https://doi.org/10.1080/08035250410023971", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Jari2026", "text": "Jari M, Alaei F. Prevalence, associated disorders and treatment of joint hypermobility syndrome; A systematic review. J Bodyw Mov Ther. 2026;46:74-79. PMID 41927246; doi:10.1016/j.jbmt.2025.10.037.", "link": "https://doi.org/10.1016/j.jbmt.2025.10.037", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Jensen2013GJH", "text": "Jensen BR, Olesen AT, Pedersen MT, Kristensen JH, Remvig L, Simonsen EB, et al. Effect of generalized joint hypermobility on knee function and muscle activation in children and adults. Muscle Nerve. 2013;48(5):762-769. PMID 24037762; doi:10.1002/mus.23802.", "link": "https://doi.org/10.1002/mus.23802", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Jensen2021Orth", "text": "Jensen AM, Andersen JQ, Quisth L, Ramstrand N. Finger orthoses for management of joint hypermobility disorders: Relative effects on hand function and cognitive load. Prosthet Orthot Int. 2021;45(1):36-45. PMID 33834743; PMCID PMC7978036; doi:10.1177/0309364620956866.", "link": "https://doi.org/10.1177/0309364620956866", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Jeunemaitre2025", "text": "Jeunemaitre X, Mousseaux E, Frank M, Adham S, Pitocco F, Billon C, et al. Efficacy of Irbesartan in Celiprolol-Treated Patients With Vascular Ehlers-Danlos Syndrome. Circulation. 2025;151(10):686-695. PMID 39906986; doi:10.1161/CIRCULATIONAHA.124.072849.", "link": "https://doi.org/10.1161/circulationaha.124.072849", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Johannessen2016", "text": "Johannessen EC, Reiten HS, Løvaas H, Maeland S, Juul-Kristensen B. Shoulder function, pain and health related quality of life in adults with joint hypermobility syndrome/Ehlers-Danlos syndrome-hypermobility type. Disabil Rehabil. 2016;38(14):1382-1390. PMID 26824670; doi:10.3109/09638288.2015.1102336.", "link": "https://doi.org/10.3109/09638288.2015.1102336", "areas": ["A", "C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Johansen2022vEDS", "text": "Johansen H, Velvin G, Lidal IB. Education and employment status among adults with Loeys-Dietz syndrome and vascular Ehlers-Danlos syndrome in Norway, a questionnaire based study. PLoS One. 2022;17(12):e0279848. PMID 36584154; PMCID PMC9803106; doi:10.1371/journal.pone.0279848.", "link": "https://doi.org/10.1371/journal.pone.0279848", "areas": ["E", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Johansen2022"]}, {"key": "Jonsson1996", "text": "Jónsson H, Valtýsdóttir ST, Kjartansson O, Brekkan A. Hypermobility associated with osteoarthritis of the thumb base: a clinical and radiological subset of hand osteoarthritis. Ann Rheum Dis. 1996;55(8):540-543. PMID 8774182; PMCID PMC1010234; doi:10.1136/ard.55.8.540.", "link": "https://doi.org/10.1136/ard.55.8.540", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Juul-Kristensen2007", "text": "Juul-Kristensen B, Røgind H, Jensen DV, Remvig L. Inter-examiner reproducibility of tests and criteria for generalized joint hypermobility and benign joint hypermobility syndrome. Rheumatology (Oxford). 2007;46(12):1835-41. PMID 18006569; doi:10.1093/rheumatology/kem290.", "link": "https://doi.org/10.1093/rheumatology/kem290", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Juul-Kristensen2017", "text": "Juul-Kristensen B, Schmedling K, Rombaut L, Lund H, Engelbert RH. Measurement properties of clinical assessment methods for classifying generalized joint hypermobility-A systematic review. Am J Med Genet C Semin Med Genet. 2017;175(1):116-147. PMID 28306223; doi:10.1002/ajmg.c.31540.", "link": "https://doi.org/10.1002/ajmg.c.31540", "areas": ["A", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Juzwiak2026", "text": "Juzwiak EE, Bowen CJ, Edwards R, Restrepo L, Lee S, Parks CA, et al. Steroid hormone antagonism affords vascular protection in a mouse model of vascular Ehlers-Danlos syndrome. JCI Insight. 2026;11(12). PMID 42048161; PMCID PMC13313488; doi:10.1172/jci.insight.198202.", "link": "https://doi.org/10.1172/jci.insight.198202", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kahana1987", "text": "Kahana M, Feinstein A, Tabachnic E, Schewach-Millet M, Engelberg S. Painful piezogenic pedal papules in patients with Ehlers-Danlos syndrome. J Am Acad Dermatol. 1987;17(2 Pt 1):205-209. PMID 3624559; doi:10.1016/s0190-9622(87)70192-3.", "link": "https://doi.org/10.1016/s0190-9622(87)70192-3", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kalisch2020", "text": "Kalisch L, Hamonet C, Bourdon C, Montalescot L, de Cazotte C, Baeza-Velasco C. Predictors of pain and mobility disability in the hypermobile Ehlers-Danlos syndrome. Disabil Rehabil. 2020;42(25):3679-3686. PMID 31060411; doi:10.1080/09638288.2019.1608595.", "link": "https://doi.org/10.1080/09638288.2019.1608595", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kalisch2022", "text": "Kalisch L, Boniwell I, Osin E, Baeza-Velasco C. Feeling Good Despite EDS: The Effects of a 5-Week Online Positive Psychology Programme for Ehlers-Danlos-Syndromes Patients. J Contemp Psychother. 2022;52(1):79-87. PMID 34667333; PMCID PMC8517566; doi:10.1007/s10879-021-09521-8.", "link": "https://doi.org/10.1007/s10879-021-09521-8", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kaluza2025", "text": "Kałuża B, Rychlik I, Domański J, Żuk-Łapan A, Babula E, Poprawa I, et al. Bone Densitometry Parameters in Females with Ehlers-Danlos Syndrome-Does the Hypermobile Subtype Increase the Risk of Low Bone Mass in Patients with Ehlers-Danlos Syndrome?. J Clin Med. 2025;14(3):941. PMID 39941612; PMCID PMC11818599; doi:10.3390/jcm14030941.", "link": "https://doi.org/10.3390/jcm14030941", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kanjwal2011", "text": "Kanjwal K, Karabin B, Sheikh M, Elmer L, Kanjwal Y, Saeed B, et al. Pyridostigmine in the treatment of postural orthostatic tachycardia: a single-center experience. Pacing Clin Electrophysiol. 2011;34(6):750-755. PMID 21410722; doi:10.1111/j.1540-8159.2011.03047.x.", "link": "https://doi.org/10.1111/j.1540-8159.2011.03047.x", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "KapfererSeebacher2016", "text": "Kapferer-Seebacher I, Pepin M, Werner R, Aitman TJ, Nordgren A, Stoiber H, et al. Periodontal Ehlers-Danlos Syndrome Is Caused by Mutations in C1R and C1S, which Encode Subcomponents C1r and C1s of Complement. Am J Hum Genet. 2016;99(5):1005-1014. PMID 27745832; PMCID PMC5097948; doi:10.1016/j.ajhg.2016.08.019.", "link": "https://doi.org/10.1016/j.ajhg.2016.08.019", "areas": ["B", "F"], "unverified": false, "validated": "PubMed"}, {"key": "KapfererSeebacher2021", "text": "Kapferer-Seebacher I, Oakley-Hannibal E, Lepperdinger U, Johnson D, Ghali N, Brady AF, et al. Prospective clinical investigations of children with periodontal Ehlers-Danlos syndrome identify generalized lack of attached gingiva as a pathognomonic feature. Genet Med. 2021;23(2):316-322. PMID 33005042; doi:10.1038/s41436-020-00985-y.", "link": "https://doi.org/10.1038/s41436-020-00985-y", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "KapfererSeebacherGR-pEDS", "text": "Kapferer-Seebacher I, van Dijk FS, Zschocke J. Periodontal Ehlers-Danlos Syndrome. In: Adam MP, et al., editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993-. NBK572429; last revision 2021-07-29. PMID 34324282.", "link": "https://pubmed.ncbi.nlm.nih.gov/34324282/", "areas": ["B", "F"], "unverified": false, "validated": "PubMed", "aliases": ["KapfererSeebacher2021GR"]}, {"key": "Karthikeyan2018", "text": "Karthikeyan A, Venkat-Raman N. Hypermobile Ehlers-Danlos syndrome and pregnancy. Obstet Med. 2018;11(3):104-109. PMID 30214474; PMCID PMC6134354; doi:10.1177/1753495X18754577.", "link": "https://doi.org/10.1177/1753495x18754577", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Kelly2024THA", "text": "Kelly M, Kagan RP, Yoo J. Increased Opioid Use in Patients With Ehlers-Danlos Syndrome Before and After Total Hip Arthroplasty. Arthroplast Today. 2024;27:101390. PMID 38690094; PMCID PMC11058070; doi:10.1016/j.artd.2024.101390.", "link": "https://doi.org/10.1016/j.artd.2024.101390", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kemp2010", "text": "Kemp S, Roberts I, Gamble C, Wilkinson S, Davidson JE, Baildam EM, et al. A randomized comparative trial of generalized vs targeted physiotherapy in the management of childhood hypermobility. Rheumatology (Oxford). 2010;49(2):315-25. PMID 19948753; doi:10.1093/rheumatology/kep362.", "link": "https://doi.org/10.1093/rheumatology/kep362", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kessler1996", "text": "Kessler E, Takahara K, Biniaminov L, Brusel M, Greenspan DS. Bone morphogenetic protein-1: the type I procollagen C-proteinase. Science. 1996;271(5247):360-2. PMID 8553073; doi:10.1126/science.271.5247.360.", "link": "https://doi.org/10.1126/science.271.5247.360", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kindgren2021", "text": "Kindgren E, Quiñones Perez A, Knez R. Prevalence of ADHD and Autism Spectrum Disorder in Children with Hypermobility Spectrum Disorders or Hypermobile Ehlers-Danlos Syndrome: A Retrospective Study. Neuropsychiatr Dis Treat. 2021;17:379-388. PMID 33603376; PMCID PMC7882457; doi:10.2147/NDT.S290494.", "link": "https://doi.org/10.2147/ndt.s290494", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kirk1967", "text": "Kirk JA, Ansell BM, Bywaters EG. The hypermobility syndrome. Musculoskeletal complaints associated with generalized joint hypermobility. Ann Rheum Dis. 1967;26(5):419-425. PMID 6039590; PMCID PMC1031347; doi:10.1136/ard.26.5.419.", "link": "https://doi.org/10.1136/ard.26.5.419", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Klaassens2012", "text": "Klaassens M, Reinstein E, Hilhorst-Hofstee Y, Schrander JJ, Malfait F, Staal H, et al. Ehlers-Danlos arthrochalasia type (VIIA-B)--expanding the phenotype: from prenatal life through adulthood. Clin Genet. 2012;82(2):121-30. PMID 21801164; PMCID PMC4026000; doi:10.1111/j.1399-0004.2011.01758.x.", "link": "https://doi.org/10.1111/j.1399-0004.2011.01758.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Klinge2021", "text": "Klinge PM, McElroy A, Donahue JE, Brinker T, Gokaslan ZL, Beland MD. Abnormal spinal cord motion at the craniocervical junction in hypermobile Ehlers-Danlos patients. J Neurosurg Spine. 2021;35(1):18-24. PMID 34020423; doi:10.3171/2020.10.spine201765.", "link": "https://doi.org/10.3171/2020.10.spine201765", "areas": ["C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Knight2023Tele", "text": "Knight DRT, Bruno KA, Gehin JM, Lothman KA, Leschitz J, Lazo AL, et al. The Impact of a Group Telemedicine Program for Chronic Disease: A Retrospective Cohort Survey Study on Hypermobile Ehlers-Danlos Syndrome and Hypermobility Spectrum Disorder. Telemed J E Health. 2023;29(2):261-269. PMID 35687402; doi:10.1089/tmj.2022.0092.", "link": "https://doi.org/10.1089/tmj.2022.0092", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "KoshoGR-mcEDS", "text": "Kosho T, Yamaguchi T, Mizumoto S, Mendoza-Londono R. Musculocontractural Ehlers-Danlos Syndrome. In: Adam MP, et al., editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993-. NBK614472; last revision 2025-05-15. PMID 40373179.", "link": "https://pubmed.ncbi.nlm.nih.gov/40373179/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kozyra2024", "text": "Kozyra M, Kostyun R, Strecker S. The prevalence of multisystem diagnoses among young patients with hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorder: A retrospective analysis using a large healthcare claims database. Medicine (Baltimore). 2024;103(41):e39212. PMID 39465806; PMCID PMC11479467; doi:10.1097/MD.0000000000039212.", "link": "https://doi.org/10.1097/md.0000000000039212", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Krahe2018", "text": "Krahe AM, Adams RD, Nicholson LL. Features that exacerbate fatigue severity in joint hypermobility syndrome/Ehlers-Danlos syndrome - hypermobility type. Disabil Rehabil. 2018;40(17):1989-1996. PMID 28482708; doi:10.1080/09638288.2017.1323022.", "link": "https://doi.org/10.1080/09638288.2017.1323022", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kraus2004", "text": "Kraus VB, Li YJ, Martin ER, Jordan JM, Renner JB, Doherty M, et al. Articular hypermobility is a protective factor for hand osteoarthritis. Arthritis Rheum. 2004;50(7):2178-2183. PMID 15248215; doi:10.1002/art.20354.", "link": "https://doi.org/10.1002/art.20354", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kucharik2020", "text": "Kucharik AH, Chang C. The Relationship Between Hypermobile Ehlers-Danlos Syndrome (hEDS), Postural Orthostatic Tachycardia Syndrome (POTS), and Mast Cell Activation Syndrome (MCAS). Clin Rev Allergy Immunol. 2020;58(3):273-297. PMID 31267471; doi:10.1007/s12016-019-08755-8.", "link": "https://doi.org/10.1007/s12016-019-08755-8", "areas": ["F", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "KulasSoborg2017", "text": "Kulas Søborg ML, Leganger J, Quitzau Mortensen L, Rosenberg J, Burcharth J. Establishment and baseline characteristics of a nationwide Danish cohort of patients with Ehlers-Danlos syndrome. Rheumatology (Oxford). 2017;56(5):763-767. PMID 28077691; doi:10.1093/rheumatology/kew478.", "link": "https://doi.org/10.1093/rheumatology/kew478", "areas": ["A", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kulin2026", "text": "Kulin D, Holtmann G, Fairlie T, Staller K, Nurko S, Keefer L, et al. Meta-Analysis: Chronic Gastrointestinal Symptoms and Comorbidities in Hypermobile Ehlers-Danlos Syndrome and Hypermobility Spectrum Disorders. Aliment Pharmacol Ther. 2026;64(5):574-589. PMID 42437376; PMCID PMC13466160; doi:10.1111/apt.70856.", "link": "https://doi.org/10.1111/apt.70856", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kumskova2023", "text": "Kumskova M, Flora GD, Staber J, Lentz SR, Chauhan AK. Characterization of bleeding symptoms in Ehlers-Danlos syndrome. J Thromb Haemost. 2023;21(7):1824-1830. PMID 37179130; doi:10.1016/j.jtha.2023.04.004.", "link": "https://doi.org/10.1016/j.jtha.2023.04.004", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kutschke2024", "text": "Kutschke MJ, Albright JA, Winschel JM, He EW, Cruz AI Jr, Daniels AH, et al. Increased Risk of Patellofemoral Instability Events and Surgical Management in Patients With Joint Hypermobility Syndromes: A Matched Cohort Analysis. Arthrosc Sports Med Rehabil. 2024;6(6):100995. PMID 39776511; PMCID PMC11701986; doi:10.1016/j.asmr.2024.100995.", "link": "https://doi.org/10.1016/j.asmr.2024.100995", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lam2025CJA", "text": "Lam AL, Mittal N, Vinod M, Karkouti K, Clarke H, Bartoszko J. The association of point-of-care coagulation testing with bleeding symptoms in patients with Ehlers-Danlos syndrome: an exploratory cross-sectional study. Can J Anaesth. 2025;72(11):1661-1668. PMID 41419706; doi:10.1007/s12630-025-03048-5.", "link": "https://doi.org/10.1007/s12630-025-03048-5", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lattimore2023", "text": "Lattimore P, Harrison F. Pilot study of an online-delivered mindfulness meditation in Ehlers-Danlos syndrome (hEDS): effect on quality-of-life and participant lived experience. Disabil Rehabil. 2023;45(23):3833-3840. PMID 36326346; doi:10.1080/09638288.2022.2140843.", "link": "https://doi.org/10.1080/09638288.2022.2140843", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Leganger2022", "text": "Leganger J, Fonnes S, Kulas Søborg ML, Rosenberg J, Burcharth J. The most common comorbidities in patients with Ehlers-Danlos syndrome: a 15-year nationwide population-based cohort study. Disabil Rehabil. 2022;44(2):189-193. PMID 32412854; doi:10.1080/09638288.2020.1761890.", "link": "https://doi.org/10.1080/09638288.2020.1761890", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Leistritz2011", "text": "Leistritz DF, Pepin MG, Schwarze U, Byers PH. COL3A1 haploinsufficiency results in a variety of Ehlers-Danlos syndrome type IV with delayed onset of complications and longer life expectancy. Genet Med. 2011;13(8):717-22. PMID 21637106; doi:10.1097/GIM.0b013e3182180c89.", "link": "https://doi.org/10.1097/gim.0b013e3182180c89", "areas": ["B", "D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Lepperdinger2022", "text": "Lepperdinger U, Angwin C, Milnes D, Sobey G, Ghali N, Johnson D, et al. Oral characteristics in adult individuals with periodontal Ehlers-Danlos syndrome. J Clin Periodontol. 2022;49(12):1244-1252. PMID 35833531; PMCID PMC9796896; doi:10.1111/jcpe.13698.", "link": "https://doi.org/10.1111/jcpe.13698", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Levine2022OT", "text": "Levine D, Work B, McDonald S, Harty N, Mabe C, Powell A, et al. Occupational Therapy Interventions for Clients with Ehlers-Danlos Syndrome (EDS) in the Presence of Postural Orthostatic Tachycardia Syndrome (POTS). Occup Ther Health Care. 2022;36(3):253-270. PMID 34520307; doi:10.1080/07380577.2021.1975200.", "link": "https://doi.org/10.1080/07380577.2021.1975200", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Liaghat2020", "text": "Liaghat B, Skou ST, Jørgensen U, Sondergaard J, Søgaard K, Juul-Kristensen B. Heavy shoulder strengthening exercise in people with hypermobility spectrum disorder (HSD) and long-lasting shoulder symptoms: a feasibility study. Pilot Feasibility Stud. 2020;6:97. PMID 32670599; PMCID PMC7350677; doi:10.1186/s40814-020-00632-y.", "link": "https://doi.org/10.1186/s40814-020-00632-y", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Liaghat2021", "text": "Liaghat B, Pedersen JR, Young JJ, Thorlund JB, Juul-Kristensen B, Juhl CB. Joint hypermobility in athletes is associated with shoulder injuries: a systematic review and meta-analysis. BMC Musculoskelet Disord. 2021;22(1):389. PMID 33902511; PMCID PMC8077913; doi:10.1186/s12891-021-04249-x.", "link": "https://doi.org/10.1186/s12891-021-04249-x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Liaghat2022APMR", "text": "Liaghat B, Skou ST, Sondergaard J, Boyle E, Søgaard K, Juul-Kristensen B. Clinical Characteristics of 100 Patients With Hypermobility Spectrum Disorders and Shoulder Complaints With or Without Mechanical Symptoms: A Cross-sectional Study. Arch Phys Med Rehabil. 2022;103(9):1749-1757.e4. PMID 35065941; doi:10.1016/j.apmr.2021.12.021.", "link": "https://doi.org/10.1016/j.apmr.2021.12.021", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Liaghat2022BJSM", "text": "Liaghat B, Skou ST, Søndergaard J, Boyle E, Søgaard K, Juul-Kristensen B. Short-term effectiveness of high-load compared with low-load strengthening exercise on self-reported function in patients with hypermobile shoulders: a randomised controlled trial. Br J Sports Med. 2022;56(22):1269-76. PMID 35649707; PMCID PMC9626913; doi:10.1136/bjsports-2021-105223.", "link": "https://doi.org/10.1136/bjsports-2021-105223", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Liaghat2024BJSM", "text": "Liaghat B, Juul-Kristensen B, Faber DA, Christensen EO, Søgaard K, Skou ST, et al. One-year effectiveness of high-load compared with low-load strengthening exercise on self-reported function in patients with hypermobile shoulders: a secondary analysis from a randomised controlled trial. Br J Sports Med. 2024;58(7):373-381. PMID 38253436; PMCID PMC10982631; doi:10.1136/bjsports-2023-107563.", "link": "https://doi.org/10.1136/bjsports-2023-107563", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Liaghat2024Protocol", "text": "Liaghat B, Bojsen-Møller J, Juul-Kristensen B, Henriksen P, Mohammadnejad A, Heiberg BD, et al. High-load strength training compared with standard care treatment in young adults with joint hypermobility and knee pain: study protocol for a randomised controlled trial (the HIPEr-Knee study). BMJ Open. 2024;14(10):e090812. PMID 39414294; PMCID PMC11487976; doi:10.1136/bmjopen-2024-090812.", "link": "https://doi.org/10.1136/bmjopen-2024-090812", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Liaghat2025", "text": "Liaghat B, Juul-Kristensen B, Christensen FH, Nissen SE, Skou ST, Søgaard K, et al. Pain trajectories and exercise-induced pain during 16 weeks of high-load or low-load shoulder exercise in patients with hypermobile shoulders: A secondary analysis of a randomized controlled trial. Scand J Pain. 2025;25(1). PMID 40460306; doi:10.1515/sjpain-2024-0072.", "link": "https://doi.org/10.1515/sjpain-2024-0072", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lind2002", "text": "Lind J, Wallenburg HC. Pregnancy and the Ehlers-Danlos syndrome: a retrospective study in a Dutch population. Acta Obstet Gynecol Scand. 2002;81(4):293-300. PMID 11952457; doi:10.1034/j.1600-0412.2002.810403.x.", "link": "https://doi.org/10.1034/j.1600-0412.2002.810403.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lindsay2012TGFB2", "text": "Lindsay ME, Schepers D, Bolar NA, Doyle JJ, Gallo E, Fert-Bober J, et al. Loss-of-function mutations in TGFB2 cause a syndromic presentation of thoracic aortic aneurysm. Nat Genet. 2012;44(8):922-7. PMID 22772368; PMCID PMC3616632; doi:10.1038/ng.2349.", "link": "https://doi.org/10.1038/ng.2349", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Loeys2005", "text": "Loeys BL, Chen J, Neptune ER, Judge DP, Podowski M, Holm T, et al. A syndrome of altered cardiovascular, craniofacial, neurocognitive and skeletal development caused by mutations in TGFBR1 or TGFBR2. Nat Genet. 2005;37(3):275-81. PMID 15731757; doi:10.1038/ng1511.", "link": "https://doi.org/10.1038/ng1511", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Loeys2006", "text": "Loeys BL, Schwarze U, Holm T, Callewaert BL, Thomas GH, Pannu H, et al. Aneurysm syndromes caused by mutations in the TGF-beta receptor. N Engl J Med. 2006;355(8):788-98. PMID 16928994; doi:10.1056/NEJMoa055695.", "link": "https://doi.org/10.1056/nejmoa055695", "areas": ["B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Loeys2010", "text": "Loeys BL, Dietz HC, Braverman AC, Callewaert BL, De Backer J, Devereux RB, et al. The revised Ghent nosology for the Marfan syndrome. J Med Genet. 2010;47(7):476-85. PMID 20591885; doi:10.1136/jmg.2009.072785.", "link": "https://doi.org/10.1136/jmg.2009.072785", "areas": ["B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "LoeysGR-LDS", "text": "Loeys BL, Dietz HC. Loeys-Dietz Syndrome. In: Adam MP, et al., editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993-. NBK1133; last revision 2024-09-12. PMID 20301312.", "link": "https://pubmed.ncbi.nlm.nih.gov/20301312/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lohkamp2022", "text": "Lohkamp LN, Marathe N, Fehlings MG. Craniocervical Instability in Ehlers-Danlos Syndrome-A Systematic Review of Diagnostic and Surgical Treatment Criteria. Global Spine J. 2022;12(8):1862-1871. PMID 35195459; PMCID PMC9609512; doi:10.1177/21925682211068520.", "link": "https://doi.org/10.1177/21925682211068520", "areas": ["C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lucero2006", "text": "Lucero HA, Kagan HM. Lysyl oxidase: an oxidative enzyme and effector of cell function. Cell Mol Life Sci. 2006;63(19-20):2304-16. PMID 16909208; PMCID PMC11136443; doi:10.1007/s00018-006-6149-9.", "link": "https://doi.org/10.1007/s00018-006-6149-9", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Luder2021", "text": "Luder G, Aeberli D, Mebes CM, Haupt-Bertschy B, Baeyens JP, Verra ML. Effect of resistance training on muscle properties and function in women with generalized joint hypermobility: a single-blind pragmatic randomized controlled trial. BMC Sports Sci Med Rehabil. 2021;13(1):10. PMID 33557909; PMCID PMC7871640; doi:10.1186/s13102-021-00238-8.", "link": "https://doi.org/10.1186/s13102-021-00238-8", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lyons2016", "text": "Lyons JJ, Yu X, Hughes JD, Le QT, Jamil A, Bai Y, et al. Elevated basal serum tryptase identifies a multisystem disorder associated with increased TPSAB1 copy number. Nat Genet. 2016;48(12):1564-1569. PMID 27749843; PMCID PMC5397297; doi:10.1038/ng.3696.", "link": "https://doi.org/10.1038/ng.3696", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Maarj2021", "text": "Maarj M, Coda A, Tofts L, Williams C, Santos D, Pacey V. Outcome measures for assessing change over time in studies of symptomatic children with hypermobility: a systematic review. BMC Pediatr. 2021;21(1):527. PMID 34839813; PMCID PMC8628404; doi:10.1186/s12887-021-03009-z.", "link": "https://doi.org/10.1186/s12887-021-03009-z", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Maarj2023", "text": "Maarj M, Pacey V, Tofts L, Clapham M, Coda A. The Impact of Podiatric Intervention on the Quality of Life and Pain in Children and Adolescents with Hypermobility. Int J Environ Res Public Health. 2023;20(17). PMID 37681763; PMCID PMC10487040; doi:10.3390/ijerph20176623.", "link": "https://doi.org/10.3390/ijerph20176623", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "MacCarrick2014", "text": "MacCarrick G, Black JH 3rd, Bowdin S, El-Hamamsy I, Frischmeyer-Guerrerio PA, Guerrerio AL, et al. Loeys-Dietz syndrome: a primer for diagnosis and management. Genet Med. 2014;16(8):576-87. PMID 24577266; PMCID PMC4131122; doi:10.1038/gim.2014.11.", "link": "https://doi.org/10.1038/gim.2014.11", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "MacCarrick2026", "text": "MacCarrick G, Afifi RO, Allen R, Almpani K, Black JH 3rd, Boyce AM, et al. Loeys-Dietz syndrome: 2026 updated care management primer. Genet Med. 2026;28(7):102577. PMID 41988792; doi:10.1016/j.gim.2026.102577.", "link": "https://doi.org/10.1016/j.gim.2026.102577", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Magnusson2001", "text": "Magnusson SP, Julsgaard C, Aagaard P, Zacharie C, Ullman S, Kobayasi T, et al. Viscoelastic properties and flexibility of the human muscle-tendon unit in benign joint hypermobility syndrome. J Rheumatol. 2001;28(12):2720-2725. PMID 11764223.", "link": "https://pubmed.ncbi.nlm.nih.gov/11764223/", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Malek2021", "text": "Malek S, Köster DV. The Role of Cell Adhesion and Cytoskeleton Dynamics in the Pathogenesis of the Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorders. Front Cell Dev Biol. 2021;9:649082. PMID 33968931; PMCID PMC8097055; doi:10.3389/fcell.2021.649082.", "link": "https://doi.org/10.3389/fcell.2021.649082", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Malek2021C", "text": "Malek S, Reinhold EJ, Pearce GS. The Beighton Score as a measure of generalised joint hypermobility. Rheumatol Int. 2021;41(10):1707-1716. PMID 33738549; PMCID PMC8390395; doi:10.1007/s00296-021-04832-4.", "link": "https://doi.org/10.1007/s00296-021-04832-4", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC", "aliases": ["Malek2021D"]}, {"key": "Malfait2007RtoC", "text": "Malfait F, Symoens S, De Backer J, Hermanns-Lê T, Sakalihasan N, Lapière CM, et al. Three arginine to cysteine substitutions in the pro-alpha (I)-collagen chain cause Ehlers-Danlos syndrome with a propensity to arterial rupture in early adulthood. Hum Mutat. 2007;28(4):387-95. PMID 17211858; doi:10.1002/humu.20455.", "link": "https://doi.org/10.1002/humu.20455", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Malfait2013B3GALT6", "text": "Malfait F, Kariminejad A, Van Damme T, Gauche C, Syx D, Merhi-Soussi F, et al. Defective initiation of glycosaminoglycan synthesis due to B3GALT6 mutations causes a pleiotropic Ehlers-Danlos-syndrome-like connective tissue disorder. Am J Hum Genet. 2013;92(6):935-45. PMID 23664118; PMCID PMC3675258; doi:10.1016/j.ajhg.2013.04.016.", "link": "https://doi.org/10.1016/j.ajhg.2013.04.016", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Malfait2017", "text": "Malfait F, Francomano C, Byers P, Belmont J, Berglund B, Black J, et al. The 2017 international classification of the Ehlers-Danlos syndromes. Am J Med Genet C Semin Med Genet. 2017;175(1):8-26. PMID 28306229; doi:10.1002/ajmg.c.31552.", "link": "https://doi.org/10.1002/ajmg.c.31552", "areas": ["A", "B", "C", "D", "E", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Malfait2020", "text": "Malfait F, Castori M, Francomano CA, Giunta C, Kosho T, Byers PH. The Ehlers-Danlos syndromes. Nat Rev Dis Primers. 2020;6(1):64. PMID 32732924; doi:10.1038/s41572-020-0194-9.", "link": "https://doi.org/10.1038/s41572-020-0194-9", "areas": ["A", "B", "C", "D", "E", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Malfait2024GeneReviews", "text": "Malfait F, Symoens S, Syx D. Classic Ehlers-Danlos Syndrome. In: Adam MP, Bick S, Mirzaa GM, Wallace SE, Amemiya A, editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993–2026. 2007 May 29 [updated 2024 Feb 1]. PMID 20301422.", "link": "https://pubmed.ncbi.nlm.nih.gov/20301422/", "areas": ["H", "B", "G", "F"], "unverified": false, "validated": "PubMed", "aliases": ["MalfaitGR-cEDS", "Malfait2024GR"]}, {"key": "Mallik1994", "text": "Mallik AK, Ferrell WR, McDonald AG, Sturrock RD. Impaired proprioceptive acuity at the proximal interphalangeal joint in patients with the hypermobility syndrome. Br J Rheumatol. 1994;33(7):631-637. PMID 8019791; doi:10.1093/rheumatology/33.7.631.", "link": "https://doi.org/10.1093/rheumatology/33.7.631", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mao2002", "text": "Mao JR, Taylor G, Dean WB, Wagner DR, Afzal V, Lotz JC, et al. Tenascin-X deficiency mimics Ehlers-Danlos syndrome in mice through alteration of collagen deposition. Nat Genet. 2002;30(4):421-5. PMID 11925569; doi:10.1038/ng850.", "link": "https://doi.org/10.1038/ng850", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mao2022", "text": "Mao G, Kopparapu S, Jin Y, Davidar AD, Hersh AM, Weber-Levine C, et al. Craniocervical instability in patients with Ehlers-Danlos syndrome: controversies in diagnosis and management. Spine J. 2022;22(12):1944-1952. PMID 36028216; doi:10.1016/j.spinee.2022.08.008.", "link": "https://doi.org/10.1016/j.spinee.2022.08.008", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Marini2017", "text": "Marini JC, Forlino A, Bächinger HP, Bishop NJ, Byers PH, Paepe A, et al. Osteogenesis imperfecta. Nat Rev Dis Primers. 2017;3:17052. PMID 28820180; doi:10.1038/nrdp.2017.52.", "link": "https://doi.org/10.1038/nrdp.2017.52", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mast2009", "text": "Mast KJ, Nunes ME, Ruymann FB, Kerlin BA. Desmopressin responsiveness in children with Ehlers-Danlos syndrome associated bleeding symptoms. Br J Haematol. 2009;144(2):230-233. PMID 19036109; doi:10.1111/j.1365-2141.2008.07446.x.", "link": "https://doi.org/10.1111/j.1365-2141.2008.07446.x", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mastoroudes2013", "text": "Mastoroudes H, Giarenis I, Cardozo L, Srikrishna S, Vella M, Robinson D, et al. Lower urinary tract symptoms in women with benign joint hypermobility syndrome: a case-control study. Int Urogynecol J. 2013;24(9):1553-8. PMID 23436036; doi:10.1007/s00192-013-2065-3.", "link": "https://doi.org/10.1007/s00192-013-2065-3", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "McDermott2018", "text": "McDermott P, Wolfe E, Lowry C, Robinson K, French HP. Evaluating the immediate effects of wearing foot orthotics in children with Joint Hypermobility Syndrome (JHS) by analysis of temperospatial parameters of gait and dynamic balance: A preliminary study. Gait Posture. 2018;60:61-64. PMID 29156379; doi:10.1016/j.gaitpost.2017.11.005.", "link": "https://doi.org/10.1016/j.gaitpost.2017.11.005", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Mehr2018", "text": "Mehr SE, Barbul A, Shibao CA. Gastrointestinal symptoms in postural tachycardia syndrome: a systematic review. Clin Auton Res. 2018;28(4):411-421. PMID 29549458; PMCID PMC6314490; doi:10.1007/s10286-018-0519-x.", "link": "https://doi.org/10.1007/s10286-018-0519-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Michalickova1998", "text": "Michalickova K, Susic M, Willing MC, Wenstrup RJ, Cole WG. Mutations of the alpha2(V) chain of type V collagen impair matrix assembly and produce ehlers-danlos syndrome type I. Hum Mol Genet. 1998;7(2):249-55. PMID 9425231; doi:10.1093/hmg/7.2.249.", "link": "https://doi.org/10.1093/hmg/7.2.249", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Milhorat2007", "text": "Milhorat TH, Bolognese PA, Nishikawa M, McDonnell NB, Francomano CA. Syndrome of occipitoatlantoaxial hypermobility, cranial settling, and chiari malformation type I in patients with hereditary disorders of connective tissue. J Neurosurg Spine. 2007;7(6):601-609. PMID 18074684; doi:10.3171/spi-07/12/601.", "link": "https://doi.org/10.3171/spi-07/12/601", "areas": ["C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Miller2020", "text": "Miller AJ, Stiles LE, Sheehan T, Bascom R, Levy HP, Francomano CA, et al. Prevalence of hypermobile Ehlers-Danlos syndrome in postural orthostatic tachycardia syndrome. Auton Neurosci. 2020;224:102637. PMID 31954224; PMCID PMC7282488; doi:10.1016/j.autneu.2020.102637.", "link": "https://doi.org/10.1016/j.autneu.2020.102637", "areas": ["D", "F", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Miller2020AutonNeurosci", "Miller2020POTS"]}, {"key": "Minatogawa2022", "text": "Minatogawa M, Unzaki A, Morisaki H, Syx D, Sonoda T, Janecke AR, et al. Clinical and molecular features of 66 patients with musculocontractural Ehlers-Danlos syndrome caused by pathogenic variants in CHST14 (mcEDS-CHST14). J Med Genet. 2022;59(9):865-877. PMID 34815299; PMCID PMC9411915; doi:10.1136/jmedgenet-2020-107623.", "link": "https://doi.org/10.1136/jmedgenet-2020-107623", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mitakides2017", "text": "Mitakides J, Tinkle BT. Oral and mandibular manifestations in the Ehlers-Danlos syndromes. Am J Med Genet C Semin Med Genet. 2017;175(1):220-225. PMID 28192626; doi:10.1002/ajmg.c.31541.", "link": "https://doi.org/10.1002/ajmg.c.31541", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mittal2021", "text": "Mittal N, Santa Mina D, Buryk-Iggers S, Lopez-Hernandez L, Hussey L, Franzese A, et al. The GoodHope Exercise and Rehabilitation (GEAR) Program for People With Ehlers-Danlos Syndromes and Generalized Hypermobility Spectrum Disorders. Front Rehabil Sci. 2021;2:769792. PMID 36188836; PMCID PMC9397788; doi:10.3389/fresc.2021.769792.", "link": "https://doi.org/10.3389/fresc.2021.769792", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Mittal2022", "text": "Mittal N, Sabo A, Deshpande A, Clarke H, Taati B. Feasibility of video-based joint hypermobility assessment in individuals with suspected Ehlers-Danlos syndromes/generalised hypermobility spectrum disorders: a single-site observational study protocol. BMJ Open. 2022;12(12):e068098. PMID 36526308; PMCID PMC9764649; doi:10.1136/bmjopen-2022-068098.", "link": "https://doi.org/10.1136/bmjopen-2022-068098", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Miyake2010", "text": "Miyake N, Kosho T, Mizumoto S, Furuichi T, Hatamochi A, Nagashima Y, et al. Loss-of-function mutations of CHST14 in a new type of Ehlers-Danlos syndrome. Hum Mutat. 2010;31(8):966-74. PMID 20533528; doi:10.1002/humu.21300.", "link": "https://doi.org/10.1002/humu.21300", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mohammed2010", "text": "Mohammed SD, Lunniss PJ, Zarate N, Farmer AD, Grahame R, Aziz Q, et al. Joint hypermobility and rectal evacuatory dysfunction: an etiological link in abnormal connective tissue? Neurogastroenterol Motil. 2010;22(10):1085-e283. PMID 20618831; doi:10.1111/j.1365-2982.2010.01562.x.", "link": "https://doi.org/10.1111/j.1365-2982.2010.01562.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Molander2020", "text": "Molander P, Novo M, Hållstam A, Löfgren M, Stålnacke BM, Gerdle B. Ehlers-Danlos Syndrome and Hypermobility Syndrome Compared with Other Common Chronic Pain Diagnoses-A Study from the Swedish Quality Registry for Pain Rehabilitation. J Clin Med. 2020;9(7):2143. PMID 32645981; PMCID PMC7408708; doi:10.3390/jcm9072143.", "link": "https://doi.org/10.3390/jcm9072143", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Monaco2022", "text": "Monaco A, Choi D, Uzun S, Maitland A, Riley B. Association of mast-cell-related conditions with hypermobile syndromes: a review of the literature. Immunol Res. 2022;70(4):419-431. PMID 35449490; PMCID PMC9022617; doi:10.1007/s12026-022-09280-1.", "link": "https://doi.org/10.1007/s12026-022-09280-1", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Moon2018Neurotherapeutics", "text": "Moon J, Kim DY, Lee WJ, Lee HS, Lim JA, Kim TJ, et al. Efficacy of Propranolol, Bisoprolol, and Pyridostigmine for Postural Tachycardia Syndrome: a Randomized Clinical Trial. Neurotherapeutics. 2018;15(3):785-795. PMID 29500811; PMCID PMC6095784; doi:10.1007/s13311-018-0612-9.", "link": "https://doi.org/10.1007/s13311-018-0612-9", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Morlino2017", "text": "Morlino S, Dordoni C, Sperduti I, Venturini M, Celletti C, Camerota F, et al. Refining patterns of joint hypermobility, habitus, and orthopedic traits in joint hypermobility syndrome and Ehlers-Danlos syndrome, hypermobility type. Am J Med Genet A. 2017;173(4):914-929. PMID 28266107; doi:10.1002/ajmg.a.38106.", "link": "https://doi.org/10.1002/ajmg.a.38106", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Morlino2020", "text": "Morlino S, Micale L, Ritelli M, Rohrbach M, Zoppi N, Vandersteen A, et al. COL1-related overlap disorder: A novel connective tissue disorder incorporating the osteogenesis imperfecta/Ehlers-Danlos syndrome overlap. Clin Genet. 2020;97(3):396-406. PMID 31794058; doi:10.1111/cge.13683.", "link": "https://doi.org/10.1111/cge.13683", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Morri2026", "text": "Morri M, Tremosini M, Forni C, Moroni A, Pedrini E, Cecco AD, et al. Characteristics of Pain in Patients Diagnosed With Ehlers-Danlos Syndrome and Hypermobility Spectrum Disorders. An Observational Study. Pain Res Manag. 2026;2026(1):e6664142. PMID 42363793; PMCID PMC13309903; doi:10.1155/prm/6664142.", "link": "https://doi.org/10.1155/prm/6664142", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "MortierGR-Stickler", "text": "Mortier G. Stickler Syndrome. In: Adam MP, et al., editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993-. NBK1302; last revision 2023-09-07. PMID 20301479.", "link": "https://pubmed.ncbi.nlm.nih.gov/20301479/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Motlak2026", "text": "Motlak M, Lee E, Guilarte G, Surapaneni A, Dreikorn E, Massart M, et al. The hypermobility crisis: A review and call to action. Dev Dyn. 2026 (online ahead of print). PMID 42426930; doi:10.1002/dvdy.70169.", "link": "https://doi.org/10.1002/dvdy.70169", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Muller2013", "text": "Müller T, Mizumoto S, Suresh I, Komatsu Y, Vodopiutz J, Dundar M, et al. Loss of dermatan sulfate epimerase (DSE) function results in musculocontractural Ehlers-Danlos syndrome. Hum Mol Genet. 2013;22(18):3761-72. PMID 23704329; doi:10.1093/hmg/ddt227.", "link": "https://doi.org/10.1093/hmg/ddt227", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mulvey2013", "text": "Mulvey MR, Macfarlane GJ, Beasley M, Symmons DP, Lovell K, Keeley P, et al. Modest association of joint hypermobility with disabling and limiting musculoskeletal pain: results from a large-scale general population-based survey. Arthritis Care Res (Hoboken). 2013;65(8):1325-1333. PMID 23401475; doi:10.1002/acr.21979.", "link": "https://doi.org/10.1002/acr.21979", "areas": ["A", "C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Murdock2025", "text": "Murdock DR, Suresh A, Calderon Martinez E, Marin I, Marin F, Braverman AC, et al. Early diagnosis of vascular Ehlers-Danlos syndrome through AI-powered facial analysis: Results from the Montalcino Aortic Consortium. Genet Med Open. 2025;3:103434. PMID 40575353; PMCID PMC12197971; doi:10.1016/j.gimo.2025.103434.", "link": "https://doi.org/10.1016/j.gimo.2025.103434", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Murray2013", "text": "Murray B, Yashar BM, Uhlmann WR, Clauw DJ, Petty EM. Ehlers-Danlos syndrome, hypermobility type: A characterization of the patients' lived experience. Am J Med Genet A. 2013;161A(12):2981-8. PMID 24254846; doi:10.1002/ajmg.a.36293.", "link": "https://doi.org/10.1002/ajmg.a.36293", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Murray2014GenetMed", "text": "Murray ML, Pepin M, Peterson S, Byers PH. Pregnancy-related deaths and complications in women with vascular Ehlers-Danlos syndrome. Genet Med. 2014;16(12):874-880. PMID 24922461; doi:10.1038/gim.2014.53.", "link": "https://doi.org/10.1038/gim.2014.53", "areas": ["F", "B", "G", "H"], "unverified": false, "validated": "Europe PMC", "aliases": ["Murray2014"]}, {"key": "Myllyharju2003", "text": "Myllyharju J. Prolyl 4-hydroxylases, the key enzymes of collagen biosynthesis. Matrix Biol. 2003;22(1):15-24. PMID 12714038; doi:10.1016/s0945-053x(03)00006-4.", "link": "https://doi.org/10.1016/s0945-053x(03)00006-4", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Nakajima2013", "text": "Nakajima M, Mizumoto S, Miyake N, Kogawa R, Iida A, Ito H, et al. Mutations in B3GALT6, which encodes a glycosaminoglycan linker region enzyme, cause a spectrum of skeletal and connective tissue disorders. Am J Hum Genet. 2013;92(6):927-34. PMID 23664117; PMCID PMC3675233; doi:10.1016/j.ajhg.2013.04.003.", "link": "https://doi.org/10.1016/j.ajhg.2013.04.003", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "NCT00190411", "text": "Assistance Publique - Hôpitaux de Paris. Prevention of Vascular Complications by BetaBlocker Treatment in Vascular Ehlers-Danlos Syndrome (BBEST). ClinicalTrials.gov NCT00190411; status Completed.", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT02165085", "text": "Assistance Publique - Hôpitaux de Paris. MEDIC: Identification of Plasmatic Biomarkers in Vascular Ehlers-Danlos Syndrome. ClinicalTrials.gov NCT02165085. Status: completed 2015-07; 211 enrolled.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT02597361", "text": "Assistance Publique - Hôpitaux de Paris. ARCADE: Angiotensin II Receptor Blockade in Vascular Ehlers-Danlos Syndrome: a Double Blind, Randomized, Placebo Controlled, Multicenter Trial. ClinicalTrials.gov NCT02597361; status Completed (61 enrolled).", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT03093493", "text": "Boston University. Determine the Causative Genetic Variations in Patients With Ehlers-Danlos Syndrome. ClinicalTrials.gov NCT03093493. Status: completed 2025-04-03; 334 enrolled; last update posted 2026-01-27.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04133272", "text": "Sangiorgi L (Istituto Ortopedico Rizzoli). RED: Registry of Ehlers-Danlos Syndrome. ClinicalTrials.gov NCT04133272. Status: recruiting; 3000 estimated; estimated completion 2033-01; last update posted 2025-11-20.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05366114", "text": "University Health Network, Toronto. Vision-based Assessment of Joint Extensibility in Ehlers Danlos Syndrome. ClinicalTrials.gov NCT05366114. Start 2022-04-26; estimated enrolment 225; status unknown.", "link": "", "areas": ["D"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05405257", "text": "Baylor College of Medicine. EDS-OXY: Oxytocin Treatment for Chronic Pain in Hypermobile Ehlers-Danlos Syndrome. ClinicalTrials.gov NCT05405257. Status: terminated 2025-03-11 (recruitment; 2 enrolled); last update posted 2025-08-28.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05432466", "text": "Acer Therapeutics Inc. DiSCOVER: A Phase 3 Randomized, Double-Blind, Decentralized Clinical Trial to Compare the Efficacy of Celiprolol to Placebo in the Treatment of Patients With COL3A1-Positive Vascular Ehlers-Danlos Syndrome. ClinicalTrials.gov NCT05432466; status Recruiting; last update posted 2025-08-24.", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05463679", "text": "Aytu BioPharma, Inc. PREVEnt: A Multicenter, Randomized, Double-blind, Placebo-controlled Study of Enzastaurin for the Prevention of Arterial Events in Patients With Vascular Ehlers-Danlos Syndrome. ClinicalTrials.gov NCT05463679; status Suspended (\"Indefinite hold by company\").", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05603741", "text": "University of Calgary. Local Anesthetic Response in Ehlers-Danlos Syndrome (EDS) and Healthy Volunteers. ClinicalTrials.gov NCT05603741; status Active, not recruiting.", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05976841", "text": "Institut National de la Santé Et de la Recherche Médicale, France. National Cohort on the Vascular Ehlers-Danlos Syndrome (RaDiCo-SEDVasc). ClinicalTrials.gov NCT05976841. Status: active, not recruiting; 340 enrolled; estimated completion 2028-01; last update posted 2026-02-12.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05994664", "text": "Baylor College of Medicine. The Effects Of Heart Coherence Training On Patients With Vascular Ehlers-Danlos Syndrome (HEARTMATH). ClinicalTrials.gov NCT05994664. Status: recruiting; 40 estimated; last update posted 2024-07-01.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07516496", "text": "Cambridge University Hospitals NHS Foundation Trust. MPEDS: Metabolic Phenotyping in Individuals With Vascular Ehlers-Danlos Syndrome (vEDS). ClinicalTrials.gov NCT07516496. Status: recruiting; start 2026-03-05; last update posted 2026-04-08.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07697573", "text": "Sheffield Hallam University. Co-Producing and Piloting an Exercise-Based Lifestyle Intervention for Individuals With Vascular Ehlers-Danlos Syndrome (vEDS): A Mixed-Methods Feasibility Study. ClinicalTrials.gov NCT07697573. Status: not yet recruiting; estimated start 2027-03-01; last update posted 2026-07-13.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "Nelson2015Mayo", "text": "Nelson AD, Mouchli MA, Valentin N, Deyle D, Pichurin P, Acosta A, et al. Ehlers Danlos syndrome and gastrointestinal manifestations: a 20-year experience at Mayo Clinic. Neurogastroenterol Motil. 2015;27(11):1657-66. PMID 26376608; doi:10.1111/nmo.12665.", "link": "https://doi.org/10.1111/nmo.12665", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nicholson2018", "text": "Nicholson LL, Chan C. The Upper Limb Hypermobility Assessment Tool: A novel validated measure of adult joint mobility. Musculoskelet Sci Pract. 2018;35:38-45. PMID 29510315; doi:10.1016/j.msksp.2018.02.006.", "link": "https://doi.org/10.1016/j.msksp.2018.02.006", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Nicholson2022", "text": "Nicholson LL, Chan C, Tofts L, Pacey V. Hypermobility syndromes in children and adolescents: Assessment, diagnosis and multidisciplinary management. Aust J Gen Pract. 2022;51(6):409-414. PMID 35637584; doi:10.31128/AJGP-03-21-5870.", "link": "https://doi.org/10.31128/ajgp-03-21-5870", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Nielsen2014", "text": "Nielsen RH, Couppé C, Jensen JK, Olsen MR, Heinemeier KM, Malfait F, et al. Low tendon stiffness and abnormal ultrastructure distinguish classic Ehlers-Danlos syndrome from benign joint hypermobility syndrome in patients. FASEB J. 2014;28(11):4668-4676. PMID 25122555; doi:10.1096/fj.14-249656.", "link": "https://doi.org/10.1096/fj.14-249656", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Oderich2005", "text": "Oderich GS, Panneton JM, Bower TC, Lindor NM, Cherry KJ, Noel AA, et al. The spectrum, management and clinical outcome of Ehlers-Danlos syndrome type IV: a 30-year experience. J Vasc Surg. 2005;42(1):98-106. PMID 16012458; doi:10.1016/j.jvs.2005.03.053.", "link": "https://doi.org/10.1016/j.jvs.2005.03.053", "areas": ["F", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ong2010", "text": "Ong KT, Perdu J, De Backer J, Bozec E, Collignon P, Emmerich J, et al. Effect of celiprolol on prevention of cardiovascular events in vascular Ehlers-Danlos syndrome: a prospective randomised, open, blinded-endpoints trial. Lancet. 2010;376(9751):1476-1484. PMID 20825986; doi:10.1016/S0140-6736(10)60960-9.", "link": "https://doi.org/10.1016/s0140-6736(10)60960-9", "areas": ["F", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "openFDA-Celiprolol", "text": "US FDA via openFDA. Searches of the drug label endpoint (`search=celiprolol`) and Drugs@FDA endpoint (generic name and active ingredient \"celiprolol\") on 2026-10-25 returned \"No matches found\".", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "Orgel2006", "text": "Orgel JP, Irving TC, Miller A, Wess TJ. Microfibrillar structure of type I collagen in situ. Proc Natl Acad Sci U S A. 2006;103(24):9001-5. PMID 16751282; PMCID PMC1473175; doi:10.1073/pnas.0502718103.", "link": "https://doi.org/10.1073/pnas.0502718103", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ottenheijm2012", "text": "Ottenheijm CA, Voermans NC, Hudson BD, Irving T, Stienen GJ, van Engelen BG, et al. Titin-based stiffening of muscle fibers in Ehlers-Danlos Syndrome. J Appl Physiol (1985). 2012;112(7):1157-1165. PMID 22223454; PMCID PMC3774215; doi:10.1152/japplphysiol.01166.2011.", "link": "https://doi.org/10.1152/japplphysiol.01166.2011", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Oyediran2026", "text": "Oyediran SA, Kim Y, Novikov Z, Krause TM. Understanding Ehlers-Danlos Syndrome: A Claims-Based Analysis of Healthcare Cost Patterns. J Health Econ Outcomes Res. 2026;13(2):8-15. PMID 42491842; PMCID PMC13378745; doi:10.36469/001c.145941.", "link": "https://doi.org/10.36469/001c.145941", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Pacey2010", "text": "Pacey V, Nicholson LL, Adams RD, Munn J, Munns CF. Generalized joint hypermobility and risk of lower limb joint injury during sport: a systematic review with meta-analysis. Am J Sports Med. 2010;38(7):1487-97. PMID 20601606; doi:10.1177/0363546510364838.", "link": "https://doi.org/10.1177/0363546510364838", "areas": ["E", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Pacey2013", "text": "Pacey V, Tofts L, Adams RD, Munns CF, Nicholson LL. Exercise in children with joint hypermobility syndrome and knee pain: a randomised controlled trial comparing exercise into hypermobile versus neutral knee extension. Pediatr Rheumatol Online J. 2013;11(1):30. PMID 23941143; PMCID PMC3751568; doi:10.1186/1546-0096-11-30.", "link": "https://doi.org/10.1186/1546-0096-11-30", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Pacey2014", "text": "Pacey V, Adams RD, Tofts L, Munns CF, Nicholson LL. Proprioceptive acuity into knee hypermobile range in children with joint hypermobility syndrome. Pediatr Rheumatol Online J. 2014;12:40. PMID 25278815; PMCID PMC4182796; doi:10.1186/1546-0096-12-40.", "link": "https://doi.org/10.1186/1546-0096-12-40", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Pacey2015", "text": "Pacey V, Tofts L, Adams RD, Munns CF, Nicholson LL. Quality of life prediction in children with joint hypermobility syndrome. J Paediatr Child Health. 2015;51(7):689-95. PMID 25622801; doi:10.1111/jpc.12826.", "link": "https://doi.org/10.1111/jpc.12826", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Palmer2016", "text": "Palmer S, Cramp F, Clark E, Lewis R, Brookes S, Hollingworth W, et al. The feasibility of a randomised controlled trial of physiotherapy for adults with joint hypermobility syndrome. Health Technol Assess. 2016;20(47):1-264. PMID 27365226; PMCID PMC4947876; doi:10.3310/hta20470.", "link": "https://doi.org/10.3310/hta20470", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Palmer2017BIoH", "text": "Palmer S, Cramp F, Lewis R, Gould G, Clark EM. Development and initial validation of the Bristol Impact of Hypermobility questionnaire. Physiotherapy. 2017;103(2):186-192. PMID 27567344; doi:10.1016/j.physio.2016.04.002.", "link": "https://doi.org/10.1016/j.physio.2016.04.002", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Palmer2017SDC", "text": "Palmer S, Manns S, Cramp F, Lewis R, Clark EM. Test-retest reliability and smallest detectable change of the Bristol Impact of Hypermobility (BIoH) questionnaire. Musculoskelet Sci Pract. 2017;32:64-69. PMID 28881227; doi:10.1016/j.msksp.2017.08.007.", "link": "https://doi.org/10.1016/j.msksp.2017.08.007", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Palmer2021", "text": "Palmer S, Davey I, Oliver L, Preece A, Sowerby L, House S. The effectiveness of conservative interventions for the management of syndromic hypermobility: a systematic literature review. Clin Rheumatol. 2021;40(3):1113-1129. PMID 32681365; PMCID PMC7895781; doi:10.1007/s10067-020-05284-0.", "link": "https://doi.org/10.1007/s10067-020-05284-0", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Parapia2008", "text": "Parapia LA, Jackson C. Ehlers-Danlos syndrome--a historical review. Br J Haematol. 2008;141(1):32-35. PMID 18324963; doi:10.1111/j.1365-2141.2008.06994.x.", "link": "https://doi.org/10.1111/j.1365-2141.2008.06994.x", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Park2025", "text": "Park HJ, Scott CJ, Smith HS, Wojcik MH. Rare disease narratives on social media: A content analysis. Genet Med Open. 2025;3:102844. PMID 40115594; PMCID PMC11925512; doi:10.1016/j.gimo.2025.102844.", "link": "https://doi.org/10.1016/j.gimo.2025.102844", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Pearce2023", "text": "Pearce G, Bell L, Pezaro S, Reinhold E. Childbearing with Hypermobile Ehlers-Danlos Syndrome and Hypermobility Spectrum Disorders: A Large International Survey of Outcomes and Complications. Int J Environ Res Public Health. 2023;20(20). PMID 37887695; PMCID PMC10606623; doi:10.3390/ijerph20206957.", "link": "https://doi.org/10.3390/ijerph20206957", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Peebles2022", "text": "Peebles KC, Tan I, Butlin M, Collins F, Tofts L, Avolio AP, et al. The prevalence and impact of orthostatic intolerance in young women across the hypermobility spectrum. Am J Med Genet A. 2022;188(6):1761-1776. PMID 35224842; PMCID PMC9305471; doi:10.1002/ajmg.a.62705.", "link": "https://doi.org/10.1002/ajmg.a.62705", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Peebles2024", "text": "Peebles KC, Jacobs C, Makaroff L, Pacey V. The use and effectiveness of exercise for managing postural orthostatic tachycardia syndrome in young adults with joint hypermobility and related conditions: A scoping review. Auton Neurosci. 2024;252:103156. PMID 38401460; doi:10.1016/j.autneu.2024.103156.", "link": "https://doi.org/10.1016/j.autneu.2024.103156", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Pepin2000", "text": "Pepin M, Schwarze U, Superti-Furga A, Byers PH. Clinical and genetic features of Ehlers-Danlos syndrome type IV, the vascular type. N Engl J Med. 2000;342(10):673-680. PMID 10706896; doi:10.1056/NEJM200003093421001.", "link": "https://doi.org/10.1056/nejm200003093421001", "areas": ["A", "B", "D", "F", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Pepin2014", "text": "Pepin MG, Schwarze U, Rice KM, Liu M, Leistritz D, Byers PH. Survival is affected by mutation type and molecular mechanism in vascular Ehlers-Danlos syndrome (EDS type IV). Genet Med. 2014;16(12):881-888. PMID 24922459; doi:10.1038/gim.2014.72.", "link": "https://doi.org/10.1038/gim.2014.72", "areas": ["A", "B", "D", "F", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Peterson2018", "text": "Peterson B, Coda A, Pacey V, Hawke F. Physical and mechanical therapies for lower limb symptoms in children with Hypermobility Spectrum Disorder and Hypermobile Ehlers-Danlos Syndrome: a systematic review. J Foot Ankle Res. 2018;11:59. PMID 30455744; PMCID PMC6222981; doi:10.1186/s13047-018-0302-1.", "link": "https://doi.org/10.1186/s13047-018-0302-1", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Petrucci2024", "text": "Petrucci T, Barclay SJ, Gensemer C, Morningstar J, Daylor V, Byerly K, et al. Phenotypic Clusters and Multimorbidity in Hypermobile Ehlers-Danlos Syndrome. Mayo Clin Proc Innov Qual Outcomes. 2024;8(3):253-262. PMID 38779137; PMCID PMC11109295; doi:10.1016/j.mayocpiqo.2024.04.001.", "link": "https://doi.org/10.1016/j.mayocpiqo.2024.04.001", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Pezaro2024", "text": "Pezaro S, Brock I, Buckley M, Callaway S, Demirdas S, Hakim A, et al. Management of childbearing with hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorders: A scoping review and expert co-creation of evidence-based clinical guidelines. PLoS One. 2024;19(5):e0302401. PMID 38748660; PMCID PMC11095771; doi:10.1371/journal.pone.0302401.", "link": "https://doi.org/10.1371/journal.pone.0302401", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pollock2021", "text": "Pollock L, Ridout A, Teh J, Nnadi C, Stavroulias D, Pitcher A, et al. The Musculoskeletal Manifestations of Marfan Syndrome: Diagnosis, Impact, and Management. Curr Rheumatol Rep. 2021;23(11):81. PMID 34825999; PMCID PMC8626407; doi:10.1007/s11926-021-01045-3.", "link": "https://doi.org/10.1007/s11926-021-01045-3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Puledda2015", "text": "Puledda F, Viganò A, Celletti C, Petolicchio B, Toscano M, Vicenzini E, et al. A study of migraine characteristics in joint hypermobility syndrome a.k.a. Ehlers-Danlos syndrome, hypermobility type. Neurol Sci. 2015;36(8):1417-1424. PMID 25791889; doi:10.1007/s10072-015-2173-6.", "link": "https://doi.org/10.1007/s10072-015-2173-6", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Quinlan2026", "text": "Quinlan R, Gray K, Davies LM, Tofts L, Williams CM, Hakim AJ, et al. Treatment for symptomatic hypermobility in childhood. Cochrane Database Syst Rev. 2026;9(9):CD016390. PMID 42703910; PMCID PMC13548365; doi:10.1002/14651858.CD016390.", "link": "https://doi.org/10.1002/14651858.cd016390", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Rahman2014", "text": "Rahman A, Daniel C, Grahame R. Efficacy of an out-patient pain management programme for people with joint hypermobility syndrome. Clin Rheumatol. 2014;33(11):1665-9. PMID 24557080; doi:10.1007/s10067-014-2539-9.", "link": "https://doi.org/10.1007/s10067-014-2539-9", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Raj2005Circ", "text": "Raj SR, Black BK, Biaggioni I, Harris PA, Robertson D. Acetylcholinesterase inhibition improves tachycardia in postural tachycardia syndrome. Circulation. 2005;111(21):2734-2740. PMID 15911704; doi:10.1161/CIRCULATIONAHA.104.497594.", "link": "https://doi.org/10.1161/circulationaha.104.497594", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Raj2009Circ", "text": "Raj SR, Black BK, Biaggioni I, Paranjape SY, Ramirez M, Dupont WD, et al. Propranolol decreases tachycardia and improves symptoms in the postural tachycardia syndrome: less is more. Circulation. 2009;120(9):725-734. PMID 19687359; PMCID PMC2758650; doi:10.1161/CIRCULATIONAHA.108.846501.", "link": "https://doi.org/10.1161/circulationaha.108.846501", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Raj2020CCS", "text": "Raj SR, Guzman JC, Harvey P, Richer L, Schondorf R, Seifer C, et al. Canadian Cardiovascular Society Position Statement on Postural Orthostatic Tachycardia Syndrome (POTS) and Related Disorders of Chronic Orthostatic Intolerance. Can J Cardiol. 2020;36(3):357-372. PMID 32145864; doi:10.1016/j.cjca.2019.12.024.", "link": "https://doi.org/10.1016/j.cjca.2019.12.024", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "RamirezPaesano2023", "text": "Ramírez-Paesano C, Rodiera Clarens C, Sharp Segovia A, Coila Bustinza A, Rodiera Olive J, Juanola Galceran A. Perioperative opioid-minimization approach as a useful protocol in the management of patients with Ehlers-Danlos syndrome-hypermobility type, craniocervical instability and severe chronic pain who are to undergo occipito-cervical fixation. Orphanet J Rare Dis. 2023;18(1):214. PMID 37491286; doi:10.1186/s13023-023-02829-9.", "link": "https://doi.org/10.1186/s13023-023-02829-9", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rauterberg2025", "text": "Rauterberg J, Hock M, Kernich N, Shukri A, Klapproth H, Löw V, et al. Health care supply in patients with Ehlers-Danlos syndromes and generalized hypermobility spectrum disorder: a German perspective. Orphanet J Rare Dis. 2025;20(1):436. PMID 40819036; PMCID PMC12358066; doi:10.1186/s13023-025-03937-4.", "link": "https://doi.org/10.1186/s13023-025-03937-4", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "ReinaBueno2020", "text": "Reina-Bueno M, Vázquez-Bautista C, Palomo-Toucedo IC, Domínguez-Maldonado G, Castillo-López JM, Munuera-Martínez PV. Custom-Made Foot Orthoses Reduce Pain and Fatigue in Patients with Ehlers-Danlos Syndrome. A Pilot Study. Int J Environ Res Public Health. 2020;17(4). PMID 32093191; PMCID PMC7068607; doi:10.3390/ijerph17041359.", "link": "https://doi.org/10.3390/ijerph17041359", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Remvig2007", "text": "Remvig L, Jensen DV, Ward RC. Epidemiology of general joint hypermobility and basis for the proposed criteria for benign joint hypermobility syndrome: review of the literature. J Rheumatol. 2007;34(4):804-809. PMID 17407233. No DOI listed.", "link": "https://pubmed.ncbi.nlm.nih.gov/17407233/", "areas": ["A", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Reychler2019", "text": "Reychler G, Liistro G, Piérard GE, Hermanns-Lê T, Manicourt D. Inspiratory muscle strength training improves lung function in patients with the hypermobile Ehlers-Danlos syndrome: A randomized controlled trial. Am J Med Genet A. 2019;179(3):356-364. PMID 30569502; doi:10.1002/ajmg.a.61016.", "link": "https://doi.org/10.1002/ajmg.a.61016", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Reychler2021", "text": "Reychler G, De Backer MM, Piraux E, Poncin W, Caty G. Physical therapy treatment of hypermobile Ehlers-Danlos syndrome: A systematic review. Am J Med Genet A. 2021;185(10):2986-2994. PMID 34145717; doi:10.1002/ajmg.a.62393.", "link": "https://doi.org/10.1002/ajmg.a.62393", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "RicardBlum2011", "text": "Ricard-Blum S. The collagen family. Cold Spring Harb Perspect Biol. 2011;3(1):a004978. PMID 21421911; PMCID PMC3003457; doi:10.1101/cshperspect.a004978.", "link": "https://doi.org/10.1101/cshperspect.a004978", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Rigoldi2013", "text": "Rigoldi C, Cimolin V, Camerota F, Celletti C, Albertini G, Mainardi L, et al. Measuring regularity of human postural sway using approximate entropy and sample entropy in patients with Ehlers-Danlos syndrome hypermobility type. Res Dev Disabil. 2013;34(2):840-846. PMID 23246558; doi:10.1016/j.ridd.2012.11.007.", "link": "https://doi.org/10.1016/j.ridd.2012.11.007", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ritelli2019", "text": "Ritelli M, Cinquina V, Venturini M, Pezzaioli L, Formenti AM, Chiarelli N, et al. Expanding the Clinical and Mutational Spectrum of Recessive AEBP1-Related Classical-Like Ehlers-Danlos Syndrome. Genes (Basel). 2019;10(2). PMID 30759870; PMCID PMC6410021; doi:10.3390/genes10020135.", "link": "https://doi.org/10.3390/genes10020135", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ritelli2020", "text": "Ritelli M, Colombi M. Molecular Genetics and Pathogenesis of Ehlers-Danlos Syndrome and Related Connective Tissue Disorders. Genes (Basel). 2020;11(5):547. PMID 32414079; PMCID PMC7288446; doi:10.3390/genes11050547.", "link": "https://doi.org/10.3390/genes11050547", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ritelli2020C", "text": "Ritelli M, Venturini M, Cinquina V, Chiarelli N, Colombi M. Multisystemic manifestations in a cohort of 75 classical Ehlers-Danlos syndrome patients: natural history and nosological perspectives. Orphanet J Rare Dis. 2020;15(1):197. PMID 32736638; PMCID PMC7393722; doi:10.1186/s13023-020-01470-0.", "link": "https://doi.org/10.1186/s13023-020-01470-0", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC", "aliases": ["Ritelli2020OJRD"]}, {"key": "Ritelli2020ClinGenet", "text": "Ritelli M, Rovati C, Venturini M, Chiarelli N, Cinquina V, Castori M, et al. Application of the 2017 criteria for vascular Ehlers-Danlos syndrome in 50 patients ascertained according to the Villefranche nosology. Clin Genet. 2020;97(2):287-295. PMID 31600821; doi:10.1111/cge.13653.", "link": "https://doi.org/10.1111/cge.13653", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ritelli2022", "text": "Ritelli M, Chiarelli N, Cinquina V, Zoppi N, Bertini V, Venturini M, et al. RNA-Seq of Dermal Fibroblasts from Patients with Hypermobile Ehlers-Danlos Syndrome and Hypermobility Spectrum Disorders Supports Their Categorization as a Single Entity with Involvement of Extracellular Matrix Degrading and Proinflammatory Pathomechanisms. Cells. 2022;11(24):4040. PMID 36552803; PMCID PMC9777098; doi:10.3390/cells11244040.", "link": "https://doi.org/10.3390/cells11244040", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Ritelli2024", "text": "Ritelli M, Chiarelli N, Cinquina V, Vezzoli M, Venturini M, Colombi M. Looking back and beyond the 2017 diagnostic criteria for hypermobile Ehlers-Danlos syndrome: A retrospective cross-sectional study from an Italian reference center. Am J Med Genet A. 2024;194(2):174-194. PMID 37774134; doi:10.1002/ajmg.a.63426.", "link": "https://doi.org/10.1002/ajmg.a.63426", "areas": ["A", "B", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ritelli2025", "text": "Ritelli M, Chiarelli N, Cinquina V, Bertini V, Piantoni S, Caproli A, et al. Bridging the Diagnostic Gap for Hypermobile Ehlers-Danlos Syndrome and Hypermobility Spectrum Disorders: Evidence of a Common Extracellular Matrix Fragmentation Pattern in Patient Plasma as a Potential Biomarker. Am J Med Genet A. 2025;197(1):e63857. PMID 39225014; doi:10.1002/ajmg.a.63857.", "link": "https://doi.org/10.1002/ajmg.a.63857", "areas": ["B", "D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "RohrbachGR-kEDS", "text": "Rohrbach M, Giunta C. PLOD1-Related Kyphoscoliotic Ehlers-Danlos Syndrome. In: Adam MP, et al., editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993-. NBK1462; last revision 2024-06-13. PMID 20301635.", "link": "https://pubmed.ncbi.nlm.nih.gov/20301635/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Roma2018", "text": "Roma M, Marden CL, De Wandele I, Francomano CA, Rowe PC. Postural tachycardia syndrome and other forms of orthostatic intolerance in Ehlers-Danlos syndrome. Auton Neurosci. 2018;215:89-96. PMID 29519641; doi:10.1016/j.autneu.2018.02.006.", "link": "https://doi.org/10.1016/j.autneu.2018.02.006", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Rombaut2010", "text": "Rombaut L, Malfait F, Cools A, De Paepe A, Calders P. Musculoskeletal complaints, physical activity and health-related quality of life among patients with the Ehlers-Danlos syndrome hypermobility type. Disabil Rehabil. 2010;32(16):1339-1345. PMID 20156051; doi:10.3109/09638280903514739.", "link": "https://doi.org/10.3109/09638280903514739", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rombaut2011", "text": "Rombaut L, Malfait F, De Paepe A, Rimbaut S, Verbruggen G, De Wandele I, et al. Impairment and impact of pain in female patients with Ehlers-Danlos syndrome: a comparative study with fibromyalgia and rheumatoid arthritis. Arthritis Rheum. 2011;63(7):1979-1987. PMID 21391202; doi:10.1002/art.30337.", "link": "https://doi.org/10.1002/art.30337", "areas": ["A", "H", "C"], "unverified": false, "validated": "Europe PMC", "aliases": ["Rombaut2011Pain"]}, {"key": "Rombaut2011Balance", "text": "Rombaut L, Malfait F, De Wandele I, Thijs Y, Palmans T, De Paepe A, et al. Balance, gait, falls, and fear of falling in women with the hypermobility type of Ehlers-Danlos syndrome. Arthritis Care Res (Hoboken). 2011;63(10):1432-1439. PMID 21793229; doi:10.1002/acr.20557.", "link": "https://doi.org/10.1002/acr.20557", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rombaut2011F", "text": "Rombaut L, Malfait F, De Wandele I, Cools A, Thijs Y, De Paepe A, et al. Medication, surgery, and physiotherapy among patients with the hypermobility type of Ehlers-Danlos syndrome. Arch Phys Med Rehabil. 2011;92(7):1106-1112. PMID 21636074; doi:10.1016/j.apmr.2011.01.016.", "link": "https://doi.org/10.1016/j.apmr.2011.01.016", "areas": ["F", "E"], "unverified": false, "validated": "Europe PMC", "aliases": ["Rombaut2011E"]}, {"key": "Rombaut2012Strength", "text": "Rombaut L, Malfait F, De Wandele I, Taes Y, Thijs Y, De Paepe A, et al. Muscle mass, muscle strength, functional performance, and physical impairment in women with the hypermobility type of Ehlers-Danlos syndrome. Arthritis Care Res (Hoboken). 2012;64(10):1584-1592. PMID 22556148; doi:10.1002/acr.21726.", "link": "https://doi.org/10.1002/acr.21726", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rombaut2012Tendon", "text": "Rombaut L, Malfait F, De Wandele I, Mahieu N, Thijs Y, Segers P, et al. Muscle-tendon tissue properties in the hypermobility type of Ehlers-Danlos syndrome. Arthritis Care Res (Hoboken). 2012;64(5):766-772. PMID 22232076; doi:10.1002/acr.21592.", "link": "https://doi.org/10.1002/acr.21592", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rombaut2015", "text": "Rombaut L, Scheper M, De Wandele I, De Vries J, Meeus M, Malfait F, et al. Chronic pain in patients with the hypermobility type of Ehlers-Danlos syndrome: evidence for generalized hyperalgesia. Clin Rheumatol. 2015;34(6):1121-1129. PMID 24487572; doi:10.1007/s10067-014-2499-0.", "link": "https://doi.org/10.1007/s10067-014-2499-0", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "RosasTosas2025", "text": "Rosàs Tosas M. The Contradictions in the Criteria for Diagnosing Hypermobile Ehlers-Danlos Syndrome as Reflecting Some of the Philosophical Debates about the Threshold between the Normal and the Pathological. J Med Philos. 2025;50(4):248-261. PMID 40237709; PMCID PMC12279013; doi:10.1093/jmp/jhaf004.", "link": "https://doi.org/10.1093/jmp/jhaf004", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ross2014ClinSci", "text": "Ross AJ, Ocon AJ, Medow MS, Stewart JM. A double-blind placebo-controlled cross-over study of the vascular effects of midodrine in neuropathic compared with hyperadrenergic postural tachycardia syndrome. Clin Sci (Lond). 2014;126(4):289-296. PMID 23978222; PMCID PMC3896075; doi:10.1042/CS20130222.", "link": "https://doi.org/10.1042/cs20130222", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rowe1999", "text": "Rowe PC, Barron DF, Calkins H, Maumenee IH, Tong PY, Geraghty MT. Orthostatic intolerance and chronic fatigue syndrome associated with Ehlers-Danlos syndrome. J Pediatr. 1999;135(4):494-499. PMID 10518084; doi:10.1016/s0022-3476(99)70173-3.", "link": "https://doi.org/10.1016/s0022-3476(99)70173-3", "areas": ["C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rozen2006", "text": "Rozen TD, Roth JM, Denenberg N. Cervical spine joint hypermobility: a possible predisposing factor for new daily persistent headache. Cephalalgia. 2006;26(10):1182-1185. PMID 16961783; doi:10.1111/j.1468-2982.2006.01187.x.", "link": "https://doi.org/10.1111/j.1468-2982.2006.01187.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ruhoy2024", "text": "Ruhoy IS, Bolognese PA, Rosenblum JS, Dass RA, Nayyer NS, Wood JD, et al. Comorbidities and neurosurgical interventions in a cohort with connective tissue disorders. Front Neurol. 2024;15:1484504. PMID 39931100; PMCID PMC11809041; doi:10.3389/fneur.2024.1484504.", "link": "https://doi.org/10.3389/fneur.2024.1484504", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Russek2016", "text": "Russek LN, Errico DM. Prevalence, injury rate and, symptom frequency in generalized joint laxity and joint hypermobility syndrome in a \"healthy\" college population. Clin Rheumatol. 2016;35(4):1029-1039. PMID 25930211; doi:10.1007/s10067-015-2951-9.", "link": "https://doi.org/10.1007/s10067-015-2951-9", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Russek2019", "text": "Russek LN, Stott P, Simmonds J. Recognizing and Effectively Managing Hypermobility-Related Conditions. Phys Ther. 2019;99(9):1189-1200. PMID 31158283; doi:10.1093/ptj/pzz078.", "link": "https://doi.org/10.1093/ptj/pzz078", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Russek2022UCI", "text": "Russek LN, Block NP, Byrne E, Chalela S, Chan C, Comerford M, et al. Presentation and physical therapy management of upper cervical instability in patients with symptomatic generalized joint hypermobility: International expert consensus recommendations. Front Med (Lausanne). 2022;9:1072764. PMID 36743665; PMCID PMC9893781; doi:10.3389/fmed.2022.1072764.", "link": "https://doi.org/10.3389/fmed.2022.1072764", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Russek2026", "text": "Russek LN, Di Bon J, Herbland A, Vivlamore Zion Higgins C, Jandrew TR, Adams AM, et al. An Online Pilates Program for People with Hypermobility: A Pragmatic Clinical Trial Looking at Function, Interoception, Kinesiophobia, and Physical Activity Levels. J Multidiscip Healthc. 2026;19:564972. PMID 41737369; PMCID PMC12927770; doi:10.2147/JMDH.S564972.", "link": "https://doi.org/10.2147/jmdh.s564972", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Sabo2024", "text": "Sabo A, Mittal N, Deshpande A, Clarke H, Taati B. Automated, Vision-Based Goniometry and Range of Motion Calculation in Individuals With Suspected Ehlers-Danlos Syndromes/Generalized Hypermobility Spectrum Disorders: A Comparison of Pose-Estimation Libraries to Goniometric Measurements. IEEE J Transl Eng Health Med. 2024;12:140-150. PMID 38088992; PMCID PMC10712662; doi:10.1109/JTEHM.2023.3327691.", "link": "https://doi.org/10.1109/jtehm.2023.3327691", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sabo2026", "text": "Sabo A, Taati B, Deshpande A, Mittal N. Development and evaluation of a vision pose-tracking based Beighton score tool for generalized joint hypermobility in individuals with suspected Ehlers-Danlos syndromes. Biomed Eng Online. 2026;25(1):40. PMID 41639883; PMCID PMC12964692; doi:10.1186/s12938-026-01527-4.", "link": "https://doi.org/10.1186/s12938-026-01527-4", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sacheti1997", "text": "Sacheti A, Szemere J, Bernstein B, Tafas T, Schechter N, Tsipouras P. Chronic pain is a manifestation of the Ehlers-Danlos syndrome. J Pain Symptom Manage. 1997;14(2):88-93. PMID 9262038; doi:10.1016/s0885-3924(97)00007-9.", "link": "https://doi.org/10.1016/s0885-3924(97)00007-9", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sahin2008", "text": "Sahin N, Baskent A, Cakmak A, Salli A, Ugurlu H, Berker E. Evaluation of knee proprioception and effects of proprioception exercise in patients with benign joint hypermobility syndrome. Rheumatol Int. 2008;28(10):995-1000. PMID 18368409; doi:10.1007/s00296-008-0566-z.", "link": "https://doi.org/10.1007/s00296-008-0566-z", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Saputra2025", "text": "Saputra PBT, Widiarti W, Siahaan PP, Putra RM, Putranto JNE, Budiarto RM, et al. The Impact of Celiprolol in Vascular Ehlers-Danlos Syndrome: A Systematic Review of Current Evidence. Med Sci (Basel). 2025;13(2):74. PMID 40559232; PMCID PMC12195525; doi:10.3390/medsci13020074.", "link": "https://doi.org/10.3390/medsci13020074", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Schalkwijk2001", "text": "Schalkwijk J, Zweers MC, Steijlen PM, Dean WB, Taylor G, van Vlijmen IM, et al. A recessive form of the Ehlers-Danlos syndrome caused by tenascin-X deficiency. N Engl J Med. 2001;345(16):1167-75. PMID 11642233; doi:10.1056/NEJMoa002939.", "link": "https://doi.org/10.1056/nejmoa002939", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Scheper2016", "text": "Scheper MC, Juul-Kristensen B, Rombaut L, Rameckers EA, Verbunt J, Engelbert RH. Disability in Adolescents and Adults Diagnosed With Hypermobility-Related Disorders: A Meta-Analysis. Arch Phys Med Rehabil. 2016;97(12):2174-2187. PMID 26976801; doi:10.1016/j.apmr.2016.02.015.", "link": "https://doi.org/10.1016/j.apmr.2016.02.015", "areas": ["E", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Scheper2017Hyperalgesia", "text": "Scheper MC, Pacey V, Rombaut L, Adams RD, Tofts L, Calders P, et al. Generalized Hyperalgesia in Children and Adults Diagnosed With Hypermobility Syndrome and Ehlers-Danlos Syndrome Hypermobility Type: A Discriminative Analysis. Arthritis Care Res (Hoboken). 2017;69(3):421-429. PMID 27483212; doi:10.1002/acr.22998.", "link": "https://doi.org/10.1002/acr.22998", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Scheper2017Strength", "text": "Scheper M, Rombaut L, de Vries J, De Wandele I, van der Esch M, Visser B, et al. The association between muscle strength and activity limitations in patients with the hypermobility type of Ehlers-Danlos syndrome: the impact of proprioception. Disabil Rehabil. 2017;39(14):1391-1397. PMID 27339264; doi:10.1080/09638288.2016.1196396.", "link": "https://doi.org/10.1080/09638288.2016.1196396", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Scheurich2025", "text": "Scheurich JA, Beals-Erickson SE, Wallace DP, Cramer E, Fox EJ, Black W, et al. Safety and outcomes of intensive interdisciplinary pain treatment for patients with and without pediatric generalized joint hypermobility: a longitudinal retrospective study. Rheumatol Int. 2025;45(9):202. PMID 40828386; doi:10.1007/s00296-025-05947-8.", "link": "https://doi.org/10.1007/s00296-025-05947-8", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Schlager2018", "text": "Schlager A, Ahlqvist K, Rasmussen-Barr E, Bjelland EK, Pingel R, Olsson C, et al. Inter- and intra-rater reliability for measurement of range of motion in joints included in three hypermobility assessment methods. BMC Musculoskelet Disord. 2018;19(1):376. PMID 30326873; PMCID PMC6192271; doi:10.1186/s12891-018-2290-5.", "link": "https://doi.org/10.1186/s12891-018-2290-5", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Schubart2019LA", "text": "Schubart JR, Schaefer E, Janicki P, Adhikary SD, Schilling A, Hakim AJ, et al. Resistance to local anesthesia in people with the Ehlers-Danlos Syndromes presenting for dental surgery. J Dent Anesth Pain Med. 2019;19(5):261-270. PMID 31723666; PMCID PMC6834718; doi:10.17245/jdapm.2019.19.5.261.", "link": "https://doi.org/10.17245/jdapm.2019.19.5.261", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC", "aliases": ["Schubart2019"]}, {"key": "Schubart2019Opioid", "text": "Schubart JR, Schilling A, Schaefer E, Bascom R, Francomano C. Use of prescription opioid and other drugs among a cohort of persons with Ehlers-Danlos syndrome: A retrospective study. Am J Med Genet A. 2019;179(3):397-403. PMID 30624009; doi:10.1002/ajmg.a.61031.", "link": "https://doi.org/10.1002/ajmg.a.61031", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Schubart2024", "text": "Schubart JR, Schaefer EW, Knight DRT, Mills SE, Francomano CA. Estimates of the excess cost burden of Ehlers-Danlos syndromes: a United States MarketScan® claims database analysis. Front Public Health. 2024;12:1365712. PMID 39022417; PMCID PMC11252068; doi:10.3389/fpubh.2024.1365712.", "link": "https://doi.org/10.3389/fpubh.2024.1365712", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Schubert-Hjalmarsson2026", "text": "Schubert-Hjalmarsson E, Söderpalm AC. Diagnostic value of piezogenic papules in childhood: A scoping review and analysis of existing data. BMC Pediatr. 2026;26(1):734. PMID 42581348; PMCID PMC13465072; doi:10.1186/s12887-026-07414-0.", "link": "https://doi.org/10.1186/s12887-026-07414-0", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "SchubertHjalmarsson2025", "text": "Schubert-Hjalmarsson E, Fasth A, Ickmans K, Söderpalm AC, Lundberg M. Exploring signs of central sensitization in adolescents with hypermobility Spectrum disorder or hypermobile Ehlers-Danlos syndrome. Eur J Pain. 2025;29(1):e4754. PMID 39529262; PMCID PMC11609890; doi:10.1002/ejp.4754.", "link": "https://doi.org/10.1002/ejp.4754", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Schwarze2001", "text": "Schwarze U, Schievink WI, Petty E, Jaff MR, Babovic-Vuksanovic D, Cherry KJ, et al. Haploinsufficiency for one COL3A1 allele of type III procollagen results in a phenotype similar to the vascular form of Ehlers-Danlos syndrome, Ehlers-Danlos syndrome type IV. Am J Hum Genet. 2001;69(5):989-1001. PMID 11577371; PMCID PMC1274375; doi:10.1086/324123.", "link": "https://doi.org/10.1086/324123", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Schwarze2004", "text": "Schwarze U, Hata R, McKusick VA, Shinkai H, Hoyme HE, Pyeritz RE, et al. Rare autosomal recessive cardiac valvular form of Ehlers-Danlos syndrome results from mutations in the COL1A2 gene that activate the nonsense-mediated RNA decay pathway. Am J Hum Genet. 2004;74(5):917-30. PMID 15077201; PMCID PMC1181985; doi:10.1086/420794.", "link": "https://doi.org/10.1086/420794", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Scicluna2022", "text": "Scicluna K, Formosa MM, Farrugia R, Borg I. Hypermobile Ehlers-Danlos syndrome: A review and a critical appraisal of published genetic research to date. Clin Genet. 2022;101(1):20-31. PMID 34219226; doi:10.1111/cge.14026.", "link": "https://doi.org/10.1111/cge.14026", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sedky2019", "text": "Sedky K, Gaisl T, Bennett DS. Prevalence of Obstructive Sleep Apnea in Joint Hypermobility Syndrome: A Systematic Review and Meta-Analysis. J Clin Sleep Med. 2019;15(2):293-299. PMID 30736885; PMCID PMC6374081; doi:10.5664/jcsm.7636.", "link": "https://doi.org/10.5664/jcsm.7636", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Seneviratne2017", "text": "Seneviratne SL, Maitland A, Afrin L. Mast cell disorders in Ehlers-Danlos syndrome. Am J Med Genet C Semin Med Genet. 2017;175(1):226-236. PMID 28261938; doi:10.1002/ajmg.c.31555.", "link": "https://doi.org/10.1002/ajmg.c.31555", "areas": ["F", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Shalhub2019JVS", "text": "Shalhub S, Byers PH, Hicks KL, Charlton-Ouw K, Zarkowsky D, Coleman DM, et al. A multi-institutional experience in the aortic and arterial pathology in individuals with genetically confirmed vascular Ehlers-Danlos syndrome. J Vasc Surg. 2019;70(5):1543-1554. PMID 31126764; PMCID PMC8240141; doi:10.1016/j.jvs.2019.01.069.", "link": "https://doi.org/10.1016/j.jvs.2019.01.069", "areas": ["F", "G"], "unverified": false, "validated": "Europe PMC", "aliases": ["Shalhub2019"]}, {"key": "Shalhub2020", "text": "Shalhub S, Byers PH, Hicks KL, Coleman DM, Davis FM, De Caridi G, et al. A multi-institutional experience in vascular Ehlers-Danlos syndrome diagnosis. J Vasc Surg. 2020;71(1):149-157. PMID 31353273; PMCID PMC7245161; doi:10.1016/j.jvs.2019.04.487.", "link": "https://doi.org/10.1016/j.jvs.2019.04.487", "areas": ["D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Sheldon2015", "text": "Sheldon RS, Grubb BP, Olshansky B, Shen WK, Calkins H, Brignole M, et al. 2015 heart rhythm society expert consensus statement on the diagnosis and treatment of postural tachycardia syndrome, inappropriate sinus tachycardia, and vasovagal syncope. Heart Rhythm. 2015;12(6):e41-e63. PMID 25980576; PMCID PMC5267948; doi:10.1016/j.hrthm.2015.03.029. Recommendation table read in full text.", "link": "https://doi.org/10.1016/j.hrthm.2015.03.029", "areas": ["F", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Shoulders2009", "text": "Shoulders MD, Raines RT. Collagen structure and stability. Annu Rev Biochem. 2009;78:929-58. PMID 19344236; PMCID PMC2846778; doi:10.1146/annurev.biochem.77.032207.120833.", "link": "https://doi.org/10.1146/annurev.biochem.77.032207.120833", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Simmonds2019", "text": "Simmonds JV, Herbland A, Hakim A, Ninis N, Lever W, Aziz Q, et al. Exercise beliefs and behaviours of individuals with Joint Hypermobility syndrome/Ehlers-Danlos syndrome - hypermobility type. Disabil Rehabil. 2019;41(4):445-455. PMID 29125009; doi:10.1080/09638288.2017.1398278.", "link": "https://doi.org/10.1080/09638288.2017.1398278", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Simmonds2022", "text": "Simmonds JV. Masterclass: Hypermobility and hypermobility related disorders. Musculoskelet Sci Pract. 2022;57:102465. PMID 34808594; doi:10.1016/j.msksp.2021.102465.", "link": "https://doi.org/10.1016/j.msksp.2021.102465", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Singh2017", "text": "Singh H, McKay M, Baldwin J, Nicholson L, Chan C, Burns J, et al. Beighton scores and cut-offs across the lifespan: cross-sectional study of an Australian population. Rheumatology (Oxford). 2017;56(11):1857-1864. PMID 28340003; doi:10.1093/rheumatology/kex043.", "link": "https://doi.org/10.1093/rheumatology/kex043", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Smith2013BJHS", "text": "Smith TO, Jerman E, Easton V, Bacon H, Armon K, Poland F, et al. Do people with benign joint hypermobility syndrome (BJHS) have reduced joint proprioception? A systematic review and meta-analysis. Rheumatol Int. 2013;33(11):2709-2716. PMID 23728275; doi:10.1007/s00296-013-2790-4.", "link": "https://doi.org/10.1007/s00296-013-2790-4", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Smith2014Rheum", "text": "Smith TO, Easton V, Bacon H, Jerman E, Armon K, Poland F, et al. The relationship between benign joint hypermobility syndrome and psychological distress: a systematic review and meta-analysis. Rheumatology (Oxford). 2014;53(1):114-22. PMID 24080253; doi:10.1093/rheumatology/ket317.", "link": "https://doi.org/10.1093/rheumatology/ket317", "areas": ["G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Smith2014"]}, {"key": "Smits-Engelsman2011", "text": "Smits-Engelsman B, Klerks M, Kirby A. Beighton score: a valid measure for generalized hypermobility in children. J Pediatr. 2011;158(1):119-23, 123.e1-4. PMID 20850761; doi:10.1016/j.jpeds.2010.07.021.", "link": "https://doi.org/10.1016/j.jpeds.2010.07.021", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Snead2011", "text": "Snead MP, McNinch AM, Poulson AV, Bearcroft P, Silverman B, Gomersall P, et al. Stickler syndrome, ocular-only variants and a key diagnostic role for the ophthalmologist. Eye (Lond). 2011;25(11):1389-400. PMID 21921955; PMCID PMC3213659; doi:10.1038/eye.2011.201.", "link": "https://doi.org/10.1038/eye.2011.201", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Sokol2025", "text": "Sokol OE, Biggs EE, Berger AS, Simons LE, Bhandari RP. The Relationship Between Fatigue, Pain Interference, Pain-Related Distress, and Avoidance in Pediatric Hypermobile Ehlers-Danlos Syndrome. Children (Basel). 2025;12(2). PMID 40003271; PMCID PMC11854175; doi:10.3390/children12020170.", "link": "https://doi.org/10.3390/children12020170", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Song2020PainPhysician", "text": "Song B, Yeh P, Nguyen D, Ikpeama U, Epstein M, Harrell J. Ehlers-Danlos Syndrome: An Analysis of the Current Treatment Options. Pain Physician. 2020;23(4):429-438. PMID 32709178; doi:10.36076/ppj.2020/23/429.", "link": "https://doi.org/10.36076/ppj.2020/23/429", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sood2024", "text": "Sood V, Kaul A, El-Chammas KI, Mukkada VA, Sun Q, Fei L, et al. High prevalence of gastrointestinal disorders in a large cohort of patients with joint hypermobility. J Pediatr Gastroenterol Nutr. 2024;79(1):42-47. PMID 38747032; PMCID PMC11236462; doi:10.1002/jpn3.12245.", "link": "https://doi.org/10.1002/jpn3.12245", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Spanhove2020", "text": "Spanhove V, De Wandele I, Kjær BH, Malfait F, Vanderstukken F, Cools A. The effect of five isometric exercises on glenohumeral translations in healthy subjects and patients with the hypermobility type of the ehlers-danlos syndrome (heds) or hypermobility spectrum disorder (hsd) with multidirectional shoulder instability: an observational study. Physiotherapy. 2020;107:11-18. PMID 32026810; doi:10.1016/j.physio.2019.06.010.", "link": "https://doi.org/10.1016/j.physio.2019.06.010", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Spanhove2022", "text": "Spanhove V, Calders P, Berckmans K, Palmans T, Malfait F, Cools A, et al. Electromyographic Muscle Activity and Three-Dimensional Scapular Kinematics in Patients With Multidirectional Shoulder Instability: A Study in the Hypermobile Type of the Ehlers-Danlos Syndrome and the Hypermobility Spectrum Disorders. Arthritis Care Res (Hoboken). 2022;74(5):833-840. PMID 33253470; doi:10.1002/acr.24525.", "link": "https://doi.org/10.1002/acr.24525", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Spanhove2023", "text": "Spanhove V, De Wandele I, Malfait F, Calders P, Cools A. Home-based exercise therapy for treating shoulder instability in patients with hypermobile Ehlers-Danlos syndrome/hypermobility spectrum disorders. A randomized trial. Disabil Rehabil. 2023;45(11):1811-1821. PMID 35609204; doi:10.1080/09638288.2022.2076932.", "link": "https://doi.org/10.1080/09638288.2022.2076932", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Spiegel2022", "text": "Spiegel E, Nicholls-Dempsey L, Czuzoj-Shulman N, Abenhaim HA. Pregnancy outcomes in women with Ehlers-Danlos Syndrome. J Matern Fetal Neonatal Med. 2022;35(9):1683-1689. PMID 32654548; doi:10.1080/14767058.2020.1767574.", "link": "https://doi.org/10.1080/14767058.2020.1767574", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Stanitski2000", "text": "Stanitski DF, Nadjarian R, Stanitski CL, Bawle E, Tsipouras P. Orthopaedic manifestations of Ehlers-Danlos syndrome. Clin Orthop Relat Res. 2000;(376):213-221. PMID 10906878; doi:10.1097/00003086-200007000-00029.", "link": "https://doi.org/10.1097/00003086-200007000-00029", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Stein2025", "text": "Stein T, Collins S, St Louis J. The prevalence of hypermobile Ehlers-Danlos syndrome at a gender-affirming primary care clinic. SAGE Open Med. 2025;13:20503121251315021. PMID 39850941; PMCID PMC11755520; doi:10.1177/20503121251315021.", "link": "https://doi.org/10.1177/20503121251315021", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Stembridge2023", "text": "Stembridge N, Doolan BJ, Lavallee ME, Hausser I, Pope FM, Seneviratne SL, et al. The role of cutaneous manifestations in the diagnosis of the Ehlers-Danlos syndromes. Skin Health Dis. 2023;3(1):e140. PMID 36751332; PMCID PMC9892481; doi:10.1002/ski2.140.", "link": "https://doi.org/10.1002/ski2.140", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Stephens2022", "text": "Stephens SB, Russo M, Shalhub S, Beecroft T, Weigand J, Milewicz DM, et al. Evaluating perinatal and neonatal outcomes among children with vascular Ehlers-Danlos syndrome. Genet Med. 2022;24(10):2134-2143. PMID 35984436; doi:10.1016/j.gim.2022.07.010.", "link": "https://doi.org/10.1016/j.gim.2022.07.010", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Stephens2023", "text": "Stephens SB, Shalhub S, Dodd N, Li J, Huang M, Oda S, et al. Vertebral Tortuosity Is Associated With Increased Rate of Cardiovascular Events in Vascular Ehlers-Danlos Syndrome. J Am Heart Assoc. 2023;12(19):e029518. PMID 37776192; PMCID PMC10727246; doi:10.1161/JAHA.123.029518.", "link": "https://doi.org/10.1161/jaha.123.029518", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Stern2017", "text": "Stern CM, Pepin MJ, Stoler JM, Kramer DE, Spencer SA, Stein CJ. Musculoskeletal Conditions in a Pediatric Population with Ehlers-Danlos Syndrome. J Pediatr. 2017;181:261-266. PMID 27908650; doi:10.1016/j.jpeds.2016.10.078.", "link": "https://doi.org/10.1016/j.jpeds.2016.10.078", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sulli2024", "text": "Sulli A, Hysa E, Cere A, Lalli F, Pinelli A, Sammorì S, et al. Microvascular status and skin thickness in adults with hypermobile Ehlers-Danlos syndrome: a pilot investigation. Clin Exp Rheumatol. 2024;42(3):682-688. PMID 37976114; doi:10.55563/clinexprheumatol/nrs4mp.", "link": "https://doi.org/10.55563/clinexprheumatol/nrs4mp", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sundelin2017", "text": "Sundelin HE, Stephansson O, Johansson K, Ludvigsson JF. Pregnancy outcome in joint hypermobility syndrome and Ehlers-Danlos syndrome. Acta Obstet Gynecol Scand. 2017;96(1):114-119. PMID 27743500; doi:10.1111/aogs.13043.", "link": "https://doi.org/10.1111/aogs.13043", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Susanne2025", "text": "Susanne L, Lisbeth C. Wrist Stabilising Exercise Versus Hand Orthotic Intervention for Persons with Hypermobility - A Randomised Clinical Trial. Clin Rehabil. 2025;39(1):47-57. PMID 39469898; PMCID PMC11776353; doi:10.1177/02692155241293265.", "link": "https://doi.org/10.1177/02692155241293265", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Symoens2012", "text": "Symoens S, Syx D, Malfait F, Callewaert B, De Backer J, Vanakker O, et al. Comprehensive molecular analysis demonstrates type V collagen mutations in over 90% of patients with classic EDS and allows to refine diagnostic criteria. Hum Mutat. 2012;33(10):1485-93. PMID 22696272; doi:10.1002/humu.22137.", "link": "https://doi.org/10.1002/humu.22137", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tabernacki2026", "text": "Tabernacki T, McLachlan L, Loria M, Gupta S, Banik S, Mishra K, et al. Prevalence of Hypermobile Ehlers-Danlos Syndrome in Transgender and Gender Diverse Individuals: A Retrospective Cohort Study. LGBT Health. 2026;13(1):32-38. PMID 40986523; doi:10.1177/23258292251382250.", "link": "https://doi.org/10.1177/23258292251382250", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Taub2021JACC", "text": "Taub PR, Zadourian A, Lo HC, Ormiston CK, Golshan S, Hsu JC. Randomized Trial of Ivabradine in Patients With Hyperadrenergic Postural Orthostatic Tachycardia Syndrome. J Am Coll Cardiol. 2021;77(7):861-871. PMID 33602468; doi:10.1016/j.jacc.2020.12.029.", "link": "https://doi.org/10.1016/j.jacc.2020.12.029", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "TeranWodzinski2023", "text": "Teran-Wodzinski P, Kumar A. Clinical characteristics of patients with hypermobile type Ehlers-Danlos syndrome (hEDS) and generalized hypermobility spectrum disorders (G-HSD): an online survey. Rheumatol Int. 2023;43(10):1935-1945. PMID 37378685; doi:10.1007/s00296-023-05378-3.", "link": "https://doi.org/10.1007/s00296-023-05378-3", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Thwaites2022", "text": "Thwaites PA, Gibson PR, Burgell RE. Hypermobile Ehlers-Danlos syndrome and disorders of the gastrointestinal tract: What the gastroenterologist needs to know. J Gastroenterol Hepatol. 2022;37(9):1693-1709. PMID 35750466; PMCID PMC9544979; doi:10.1111/jgh.15927.", "link": "https://doi.org/10.1111/jgh.15927", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Tinkle2017", "text": "Tinkle B, Castori M, Berglund B, Cohen H, Grahame R, Kazkaz H, et al. Hypermobile Ehlers-Danlos syndrome (a.k.a. Ehlers-Danlos syndrome Type III and Ehlers-Danlos syndrome hypermobility type): Clinical description and natural history. Am J Med Genet C Semin Med Genet. 2017;175(1):48-69. PMID 28145611; doi:10.1002/ajmg.c.31538.", "link": "https://doi.org/10.1002/ajmg.c.31538", "areas": ["A", "B", "C", "D", "E", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Tirosh1991", "text": "Tirosh E, Jaffe M, Marmur R, Taub Y, Rosenberg Z. Prognosis of motor development and joint hypermobility. Arch Dis Child. 1991;66(8):931-3. PMID 1718221; PMCID PMC1793429; doi:10.1136/adc.66.8.931.", "link": "https://doi.org/10.1136/adc.66.8.931", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Tobias2013", "text": "Tobias JH, Deere K, Palmer S, Clark EM, Clinch J. Joint hypermobility is a risk factor for musculoskeletal pain during adolescence: findings of a prospective cohort study. Arthritis Rheum. 2013;65(4):1107-1115. PMID 23450628; doi:10.1002/art.37836.", "link": "https://doi.org/10.1002/art.37836", "areas": ["C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Tofts2023", "text": "Tofts LJ, Simmonds J, Schwartz SB, Richheimer RM, O'Connor C, Elias E, et al. Pediatric joint hypermobility: a diagnostic framework and narrative review. Orphanet J Rare Dis. 2023;18(1):104. PMID 37143135; PMCID PMC10157984; doi:10.1186/s13023-023-02717-2.", "link": "https://doi.org/10.1186/s13023-023-02717-2", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Topan2024", "text": "Topan R, Pandya S, Williams S, Ruffle JK, Zarate-Lopez N, Aziz Q, et al. Comprehensive Assessment of Nutrition and Dietary Influences in Hypermobile Ehlers-Danlos Syndrome-A Cross-Sectional Study. Am J Gastroenterol. 2024;119(4):727-738. PMID 37970870; doi:10.14309/ajg.0000000000002586.", "link": "https://doi.org/10.14309/ajg.0000000000002586", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "ToprakCelenay2017", "text": "Toprak Celenay S, Ozer Kaya D. Effects of spinal stabilization exercises in women with benign joint hypermobility syndrome: a randomized controlled trial. Rheumatol Int. 2017;37(9):1461-1468. PMID 28361275; doi:10.1007/s00296-017-3713-6.", "link": "https://doi.org/10.1007/s00296-017-3713-6", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Treacy2026", "text": "Treacy K, Narice BF, Williams-Goss D, Anumba DOC. The association between collagenopathies and the risk of spontaneous preterm birth: A systematic review with selective meta-analysis. Acta Obstet Gynecol Scand. 2026 (online ahead of print). PMID 42852470; PMCID PMC13650666; doi:10.1111/aogs.70361.", "link": "https://doi.org/10.1111/aogs.70361", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Trudgian2024", "text": "Trudgian R, Flood T. An exploration of the journey to diagnosis of Ehlers-Danlos Syndrome (EDS) for women living in Australia. PLoS One. 2024;19(7):e0307574. PMID 39052631; PMCID PMC11271888; doi:10.1371/journal.pone.0307574.", "link": "https://doi.org/10.1371/journal.pone.0307574", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tudini2024", "text": "Tudini F, Jordon M, Levine D, Healy M, Cathey S, Chui K. Evaluating the effects of two different kinesiology taping techniques on shoulder range of motion and proprioception in patients with hypermobile Ehlers-Danlos syndrome: a randomized controlled trial. Front Rehabil Sci. 2024;5:1383551. PMID 38836006; PMCID PMC11148207; doi:10.3389/fresc.2024.1383551.", "link": "https://doi.org/10.3389/fresc.2024.1383551", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Udugampolage2025", "text": "Udugampolage N, Taurino J, Bassotti A, Pini A, Caruso R, Callus E, et al. Exploring fatigue in Marfan and hypermobile Ehlers-Danlos syndromes: an analytical cross-sectional study in two Italian healthcare centres. BMJ Open. 2025;15(1):e087298. PMID 39762099; PMCID PMC11749496; doi:10.1136/bmjopen-2024-087298.", "link": "https://doi.org/10.1136/bmjopen-2024-087298", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Uppal2026", "text": "Uppal J, Deol P, Giri P, Singh A, Hamzeh R, Qi J, et al. A Randomized Crossover Trial of Ivabradine, Propranolol, and Placebo in Postural Orthostatic Tachycardia Syndrome: A Detailed Description. JACC Adv. 2026;5(6 Pt 2):102795. PMID 42132710; doi:10.1016/j.jacadv.2026.102795.", "link": "https://doi.org/10.1016/j.jacadv.2026.102795", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Valdez2026", "text": "Valdez JA, Gansert E, Bhuiyan FJ, Sonaiya MS, Ramesh R, Townsend CO, et al. Lack of evidence for increased mast cell activation syndrome prevalence in postural orthostatic tachycardia syndrome and/or hypermobile Ehlers-Danlos syndrome. J Allergy Clin Immunol Pract. 2026 (online ahead of print):S2213-2198(26)00684-7. PMID 42595300; doi:10.1016/j.jaip.2026.08.005. No abstract in PubMed; title only.", "link": "https://doi.org/10.1016/j.jaip.2026.08.005", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Valent2019IAAI", "text": "Valent P, Bonadonna P, Hartmann K, Broesby-Olsen S, Brockow K, Butterfield JH, et al. Why the 20% + 2 Tryptase Formula Is a Diagnostic Gold Standard for Severe Systemic Mast Cell Activation and Mast Cell Activation Syndrome. Int Arch Allergy Immunol. 2019;180(1):44-51. PMID 31256161; PMCID PMC7115850; doi:10.1159/000501079.", "link": "https://doi.org/10.1159/000501079", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "VanDamme2016", "text": "Van Damme T, Colige A, Syx D, Giunta C, Lindert U, Rohrbach M, et al. Expanding the clinical and mutational spectrum of the Ehlers-Danlos syndrome, dermatosparaxis type. Genet Med. 2016;18(9):882-91. PMID 26765342; doi:10.1038/gim.2015.188.", "link": "https://doi.org/10.1038/gim.2015.188", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "VanDamme2018", "text": "Van Damme T, Pang X, Guillemyn B, Gulberti S, Syx D, De Rycke R, et al. Biallelic B3GALT6 mutations cause spondylodysplastic Ehlers-Danlos syndrome. Hum Mol Genet. 2018;27(20):3475-3487. PMID 29931299; doi:10.1093/hmg/ddy234.", "link": "https://doi.org/10.1093/hmg/ddy234", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "vanDeLaar2012", "text": "van de Laar IM, van der Linde D, Oei EH, Bos PK, Bessems JH, Bierma-Zeinstra SM, et al. Phenotypic spectrum of the SMAD3-related aneurysms-osteoarthritis syndrome. J Med Genet. 2012;49(1):47-57. PMID 22167769; doi:10.1136/jmedgenet-2011-100382.", "link": "https://doi.org/10.1136/jmedgenet-2011-100382", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "vanDeLaar2022", "text": "van de Laar IMBH, Baas AF, De Backer J, Blankenstein JD, Dulfer E, Helderman-van den Enden ATJM, et al. Surveillance and monitoring in vascular Ehlers-Danlos syndrome in European Reference Network For Rare Vascular Diseases (VASCERN). Eur J Med Genet. 2022;65(9):104557. PMID 35779834; doi:10.1016/j.ejmg.2022.104557.", "link": "https://doi.org/10.1016/j.ejmg.2022.104557", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "vandenBersselaar2026", "text": "van den Bersselaar LM, van de Laar IMBH, Baars MJH, Baas A, Dulfer E, Helderman-van den Enden ATJM, et al. Pregnancy and Delivery Outcomes in Vascular Ehlers-Danlos Syndrome: A Retrospective Multicentre Cohort Study. BJOG. 2026;133(3):463-470. PMID 40104886; PMCID PMC12770062; doi:10.1111/1471-0528.18142.", "link": "https://doi.org/10.1111/1471-0528.18142", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Vandersteen2024", "text": "Vandersteen AM, Weerakkody RA, Parry DA, Kanonidou C, Toddie-Moore DJ, Vandrovcova J, et al. Genetic complexity of diagnostically unresolved Ehlers-Danlos syndrome. J Med Genet. 2024;61(3):232-238. PMID 37813462; doi:10.1136/jmg-2023-109329.", "link": "https://doi.org/10.1136/jmg-2023-109329", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "VanDijk2024", "text": "van Dijk FS, Angwin C, Demirdas S, Ghali N, Zschocke J. Clinical diagnosis of the monogenic Ehlers-Danlos syndromes. Med Genet. 2024;36(4):225-234. PMID 39629459; PMCID PMC11610443; doi:10.1515/medgen-2024-2060.", "link": "https://doi.org/10.1515/medgen-2024-2060", "areas": ["A", "B"], "unverified": false, "validated": "Europe PMC", "aliases": ["vanDijk2024"]}, {"key": "vanDijkGR-clEDS", "text": "van Dijk FS, Ghali N, Demirdas S, Baker D. TNXB-Related Classical-Like Ehlers-Danlos Syndrome. In: Adam MP, et al., editors. GeneReviews®. Seattle (WA): University of Washington, Seattle; 1993-. NBK584019; last revision 2022-09-15. PMID 36108117.", "link": "https://pubmed.ncbi.nlm.nih.gov/36108117/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "VanMeulenbroek2020", "text": "Van Meulenbroek T, Conijn AEA, Huijnen IPJ, Engelbert RHH, Verbunt JA. Multidisciplinary Treatment for Hypermobile Adolescents with Chronic Musculoskeletal Pain. J Rehabil Med Clin Commun. 2020;3:1000033. PMID 33884135; PMCID PMC8008726; doi:10.2340/20030711-1000033.", "link": "https://doi.org/10.2340/20030711-1000033", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "vanStraaten1991", "text": "van Straaten EA, van Langen IM, Oorthuys JW, Oosting J. Piezogenic papules of the feet in healthy children and their possible relation with connective tissue disorders. Pediatr Dermatol. 1991;8(4):277-279. PMID 1792197; doi:10.1111/j.1525-1470.1991.tb00932.x.", "link": "https://doi.org/10.1111/j.1525-1470.1991.tb00932.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Vasireddi2026", "text": "Vasireddi A, Strecker S, Giles S. Kinesiophobia, global health, pain, and bone mineral density in women with hypermobile Ehlers-Danlos syndrome: a prospective cohort study. Rheumatol Int. 2026;46(6):95. PMID 42168630; doi:10.1007/s00296-026-06134-z.", "link": "https://doi.org/10.1007/s00296-026-06134-z", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Vazquez2022", "text": "Vazquez M, Chovanec J, Kim J, DiMaggio T, Milner JD, Francomano CA, et al. Hereditary alpha-tryptasemia modifies clinical phenotypes among individuals with congenital hypermobility disorders. HGG Adv. 2022;3(2):100094. PMID 35287299; PMCID PMC8917312; doi:10.1016/j.xhgg.2022.100094.", "link": "https://doi.org/10.1016/j.xhgg.2022.100094", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "VeitRubin2016", "text": "Veit-Rubin N, Cartwright R, Singh AU, Digesu GA, Fernando R, Khullar V. Association between joint hypermobility and pelvic organ prolapse in women: a systematic review and meta-analysis. Int Urogynecol J. 2016;27(10):1469-78. PMID 26658756; doi:10.1007/s00192-015-2896-1.", "link": "https://doi.org/10.1007/s00192-015-2896-1", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Venable2023", "text": "Venable E, Knight DRT, Thoreson EK, Baudhuin LM. COL1A1 and COL1A2 variants in Ehlers-Danlos syndrome phenotypes and COL1-related overlap disorder. Am J Med Genet C Semin Med Genet. 2023;193(2):147-159. PMID 36896471; doi:10.1002/ajmg.c.32038.", "link": "https://doi.org/10.1002/ajmg.c.32038", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Vernino2021", "text": "Vernino S, Bourne KM, Stiles LE, Grubb BP, Fedorowski A, Stewart JM, et al. Postural orthostatic tachycardia syndrome (POTS): State of the science and clinical care from a 2019 National Institutes of Health Expert Consensus Meeting - Part 1. Auton Neurosci. 2021;235:102828. PMID 34144933; PMCID PMC8455420; doi:10.1016/j.autneu.2021.102828. Full text read.", "link": "https://doi.org/10.1016/j.autneu.2021.102828", "areas": ["F", "G", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Voermans2009", "text": "Voermans NC, van Alfen N, Pillen S, Lammens M, Schalkwijk J, Zwarts MJ, et al. Neuromuscular involvement in various types of Ehlers-Danlos syndrome. Ann Neurol. 2009;65(6):687-697. PMID 19557868; doi:10.1002/ana.21643.", "link": "https://doi.org/10.1002/ana.21643", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Voermans2010", "text": "Voermans NC, Knoop H, Bleijenberg G, van Engelen BG. Pain in ehlers-danlos syndrome is common, severe, and associated with functional impairment. J Pain Symptom Manage. 2010;40(3):370-378. PMID 20579833; doi:10.1016/j.jpainsymman.2009.12.026.", "link": "https://doi.org/10.1016/j.jpainsymman.2009.12.026", "areas": ["A", "C"], "unverified": false, "validated": "Europe PMC", "aliases": ["Voermans2010Pain"]}, {"key": "Voermans2010Fatigue", "text": "Voermans NC, Knoop H, van de Kamp N, Hamel BC, Bleijenberg G, van Engelen BG. Fatigue is a frequent and clinically relevant problem in Ehlers-Danlos Syndrome. Semin Arthritis Rheum. 2010;40(3):267-274. PMID 19878973; doi:10.1016/j.semarthrit.2009.08.003.", "link": "https://doi.org/10.1016/j.semarthrit.2009.08.003", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC", "aliases": ["Voermans2010E"]}, {"key": "Voermans2011Fatigue", "text": "Voermans NC, Knoop H, Bleijenberg G, van Engelen BG. Fatigue is associated with muscle weakness in Ehlers-Danlos syndrome: an explorative study. Physiotherapy. 2011;97(2):170-174. PMID 21497252; doi:10.1016/j.physio.2010.06.001.", "link": "https://doi.org/10.1016/j.physio.2010.06.001", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC", "aliases": ["Voermans2011"]}, {"key": "Wang2021AAP", "text": "Wang E, Ganti T, Vaou E, Hohler A. The relationship between mast cell activation syndrome, postural tachycardia syndrome, and Ehlers-Danlos syndrome. Allergy Asthma Proc. 2021;42(3):243-246. PMID 33980338; doi:10.2500/aap.2021.42.210022.", "link": "https://doi.org/10.2500/aap.2021.42.210022", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Wang2024AJMG", "text": "Wang YT, Jahani S, Morel-Swols D, Kapely A, Rosen A, Forghani I. Patient experiences of receiving a diagnosis of hypermobile Ehlers-Danlos syndrome. Am J Med Genet A. 2024;194(8):e63613. PMID 38545882; doi:10.1002/ajmg.a.63613.", "link": "https://doi.org/10.1002/ajmg.a.63613", "areas": ["D", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Wang2024"]}, {"key": "Wang2025Fascia", "text": "Wang TJ, Stecco A, Hakim AJ, Schleip R. Fascial Pathophysiology in Hypermobility Spectrum Disorders and Hypermobile Ehlers-Danlos Syndrome: A Review of Emerging Evidence. Int J Mol Sci. 2025;26(12):5587. PMID 40565051; PMCID PMC12193134; doi:10.3390/ijms26125587.", "link": "https://doi.org/10.3390/ijms26125587", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Wang2026OJRD", "text": "Wang Y, Xie H, Song L, Xu K, Fan J, Wang P, et al. Pulmonary hemorrhage as an early clue: an integrated clinical-imaging-genetic diagnostic insight for vascular Ehlers-Danlos syndrome. Orphanet J Rare Dis. 2026;21(1):174. PMID 41872842; PMCID PMC13134318; doi:10.1186/s13023-026-04327-0.", "link": "https://doi.org/10.1186/s13023-026-04327-0", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Wang2026SciRep", "text": "Wang Y, Li X, Wang Y. Diagnostic validation of the Chinese version of the five-part questionnaire for screening joint hypermobility in young adults. Sci Rep. 2026;16(1):15163. PMID 41888376; PMCID PMC13172406; doi:10.1038/s41598-026-45970-8.", "link": "https://doi.org/10.1038/s41598-026-45970-8", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Weerakkody2016", "text": "Weerakkody RA, Vandrovcova J, Kanonidou C, Mueller M, Gampawar P, Ibrahim Y, et al. Targeted next-generation sequencing makes new molecular diagnoses and expands genotype-phenotype relationship in Ehlers-Danlos syndrome. Genet Med. 2016;18(11):1119-1127. PMID 27011056; doi:10.1038/gim.2016.14.", "link": "https://doi.org/10.1038/gim.2016.14", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Weiler2019JACI", "text": "Weiler CR, Austen KF, Akin C, Barkoff MS, Bernstein JA, Bonadonna P, et al. AAAAI Mast Cell Disorders Committee Work Group Report: Mast cell activation syndrome (MCAS) diagnosis and management. J Allergy Clin Immunol. 2019;144(4):883-896. PMID 31476322; doi:10.1016/j.jaci.2019.08.023.", "link": "https://doi.org/10.1016/j.jaci.2019.08.023", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Wenstrup2000", "text": "Wenstrup RJ, Florer JB, Willing MC, Giunta C, Steinmann B, Young F, et al. COL5A1 haploinsufficiency is a common molecular mechanism underlying the classical form of EDS. Am J Hum Genet. 2000;66(6):1766-76. PMID 10777716; PMCID PMC1378044; doi:10.1086/302930.", "link": "https://doi.org/10.1086/302930", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Wenstrup2002", "text": "Wenstrup RJ, Meyer RA, Lyle JS, Hoechstetter L, Rose PS, Levy HP, et al. Prevalence of aortic root dilation in the Ehlers-Danlos syndrome. Genet Med. 2002;4(3):112-7. PMID 12180144; doi:10.1097/00125817-200205000-00003.", "link": "https://doi.org/10.1097/00125817-200205000-00003", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Wenstrup2004", "text": "Wenstrup RJ, Florer JB, Brunskill EW, Bell SM, Chervoneva I, Birk DE. Type V collagen controls the initiation of collagen fibril assembly. J Biol Chem. 2004;279(51):53331-7. PMID 15383546; doi:10.1074/jbc.M409622200.", "link": "https://doi.org/10.1074/jbc.m409622200", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Wenstrup2006", "text": "Wenstrup RJ, Florer JB, Davidson JM, Phillips CL, Pfeiffer BJ, Menezes DW, et al. Murine model of the Ehlers-Danlos syndrome. col5a1 haploinsufficiency disrupts collagen fibril assembly at multiple stages. J Biol Chem. 2006;281(18):12888-95. PMID 16492673; doi:10.1074/jbc.M511528200.", "link": "https://doi.org/10.1074/jbc.m511528200", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Wesley2021", "text": "Wesley A, Bray P, Munns CF, Pacey V. Impact of heritable disorders of connective tissue on daily life of children: Parent perspectives. J Paediatr Child Health. 2021;57(5):626-630. PMID 33244831; doi:10.1111/jpc.15284.", "link": "https://doi.org/10.1111/jpc.15284", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Wiesmann2014", "text": "Wiesmann T, Castori M, Malfait F, Wulf H. Recommendations for anesthesia and perioperative management in patients with Ehlers-Danlos syndrome(s). Orphanet J Rare Dis. 2014;9:109. PMID 25053156; PMCID PMC4223622; doi:10.1186/s13023-014-0109-5. Full text read.", "link": "https://doi.org/10.1186/s13023-014-0109-5", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Wilkinson2025", "text": "Wilkinson NR, Cervi E, Wagner B, Morris-Rosendahl D, Baker D, Flora H, et al. Vascular Ehlers-Danlos syndrome in children: evaluating the importance of diagnosis and follow-up during childhood. Eur J Hum Genet. 2025;33(3):368-376. PMID 39730916; PMCID PMC11893879; doi:10.1038/s41431-024-01773-x.", "link": "https://doi.org/10.1038/s41431-024-01773-x", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Wilson2026Preprint", "text": "Wilson FC, Zangerle DJ, Darakjian AA, Bhutani M, Fliess JJ, Gehin JM, et al. Sex differences in self-reported symptoms and comorbidities associated with hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorders: A retrospective study. Research Square (preprint, not peer reviewed). Posted 2026 Jan 30. doi:10.21203/rs.3.rs-8310986/v1.", "link": "https://doi.org/10.21203/rs.3.rs-8310986/v1", "areas": ["A"], "unverified": false, "validated": "Crossref"}, {"key": "Wolfe2016", "text": "Wolfe F, Clauw DJ, Fitzcharles MA, Goldenberg DL, Häuser W, Katz RL, et al. 2016 Revisions to the 2010/2011 fibromyalgia diagnostic criteria. Semin Arthritis Rheum. 2016;46(3):319-329. PMID 27916278; doi:10.1016/j.semarthrit.2016.08.012.", "link": "https://doi.org/10.1016/j.semarthrit.2016.08.012", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Xu2024EDS", "text": "Xu K, Li G, Wu Z, Zhang TJ, Wu N. Diagnosis and treatment of the Ehlers-Danlos syndromes in China: synopsis of the first guidelines. Orphanet J Rare Dis. 2024;19(1):194. PMID 38741208; PMCID PMC11092078; doi:10.1186/s13023-024-03121-0.", "link": "https://doi.org/10.1186/s13023-024-03121-0", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Yamauchi2012", "text": "Yamauchi M, Sricholpech M. Lysine post-translational modifications of collagen. Essays Biochem. 2012;52:113-33. PMID 22708567; PMCID PMC3499978; doi:10.1042/bse0520113.", "link": "https://doi.org/10.1042/bse0520113", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Yang2022", "text": "Yang F, Yang RJ, Li Q, Zhang J, Meng YX, Liu XJ, et al. Whole-exome sequencing facilitates the differential diagnosis of Ehlers-Danlos syndrome (EDS). Mol Genet Genomic Med. 2022;10(3):e1885. PMID 35119775; PMCID PMC8922958; doi:10.1002/mgg3.1885.", "link": "https://doi.org/10.1002/mgg3.1885", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Yeowell2000", "text": "Yeowell HN, Walker LC. Mutations in the lysyl hydroxylase 1 gene that result in enzyme deficiency and the clinical phenotype of Ehlers-Danlos syndrome type VI. Mol Genet Metab. 2000;71(1-2):212-24. PMID 11001813; doi:10.1006/mgme.2000.3076.", "link": "https://doi.org/10.1006/mgme.2000.3076", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Yew2021", "text": "Yew KS, Kamps-Schmitt KA, Borge R. Hypermobile Ehlers-Danlos Syndrome and Hypermobility Spectrum Disorders. Am Fam Physician. 2021;103(8):481-492. PMID 33856167.", "link": "https://pubmed.ncbi.nlm.nih.gov/33856167/", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Yue2023", "text": "Yue F, Era T, Yamaguchi T, Kosho T. Pathophysiological Investigation of Skeletal Deformities of Musculocontractural Ehlers-Danlos Syndrome Using Induced Pluripotent Stem Cells. Genes (Basel). 2023;14(3):730. PMID 36981001; PMCID PMC10048181; doi:10.3390/genes14030730.", "link": "https://doi.org/10.3390/genes14030730", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Zarate2010", "text": "Zarate N, Farmer AD, Grahame R, Mohammed SD, Knowles CH, Scott SM, et al. Unexplained gastrointestinal symptoms and joint hypermobility: is connective tissue the missing link? Neurogastroenterol Motil. 2010;22(3):252-e78. PMID 19840271; doi:10.1111/j.1365-2982.2009.01421.x.", "link": "https://doi.org/10.1111/j.1365-2982.2009.01421.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Zhang2026OSA", "text": "Zhang KL, Wallon R, Laukaitis CM, Davies C. Obstructive sleep apnea and CPAP efficacy in patients with Hypermobile Ehlers-Danlos syndrome and hypermobility spectrum disorder: a case-control study. Sleep Breath. 2026;30(4). PMID 42417930; PMCID PMC13346149; doi:10.1007/s11325-026-03763-3.", "link": "https://doi.org/10.1007/s11325-026-03763-3", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Zou2014COL12A1", "text": "Zou Y, Zwolanek D, Izu Y, Gandhy S, Schreiber G, Brockmann K, et al. Recessive and dominant mutations in COL12A1 cause a novel EDS/myopathy overlap syndrome in humans and mice. Hum Mol Genet. 2014;23(9):2339-52. PMID 24334604; PMCID PMC3976332; doi:10.1093/hmg/ddt627.", "link": "https://doi.org/10.1093/hmg/ddt627", "areas": ["B"], "unverified": false, "validated": "PubMed"}];
/* =============== home: from one collagen chain to a working joint, with and without a variant =============== */
const HERO_CAP=['Schematic, not to scale.','Schematic, not to scale: one faulty link shown in orange, followed through each step. In vascular EDS the most common kind of COL3A1 variant is a glycine substitution. <sup class="c" data-ref="Frank2015,Demirdas2024" title="Source 118,169">118,169</sup>'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),vb2=$('#heroVar'),cap=$('#heroCap');let vr=false;
  /* three stacked strip panels (chain, helix, fibril) read top to bottom, then a tall tissue panel on
     the right; the timeline fills them in order and lights the current one */
  const STEPS=[['One chain','A collagen chain is made','A chain with one faulty link'],
               ['Triple helix','Three chains wind together','The helix kinks at the fault'],
               ['Fibril','Molecules line up into a fibril','The fibril forms unevenly'],
               ['Tissue','Fibrils hold the joint together','Looser tissue lets the joint shift']];
  function draw(t){const N=vb(svg,'520 300','400 380');let s='';
    const L=N?{x:12,w:250,y:56,h:100,g:8,jx:272,jw:116}:{x:12,w:330,y:52,h:76,g:7,jx:352,jw:156};
    const P=[0,1,2].map(i=>({x:L.x,y:L.y+i*(L.h+L.g),w:L.w,h:L.h}));
    P.push({x:L.jx,y:L.y,w:L.jw,h:3*L.h+2*L.g});
    const ph=t<.25?0:t<.5?1:t<.75?2:3;
    s+=`<text x="12" y="22" class="t-big" style="fill:${vr&&ph>0?'var(--variant)':'var(--ink)'}">${STEPS[ph][vr?2:1]}</text>`;
    s+=`<text x="12" y="40" class="t-sm">Step ${ph+1} of 4 · schematic</text>`;
    P.forEach((p,i)=>{const on=i===ph,done=i<ph,lit=on||done;
      s+=`<clipPath id="hc${i}"><rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10"/></clipPath>`;
      s+=`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10" style="fill:${on?'var(--accent-soft)':'var(--field)'};stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
      s+=`<text x="${p.x+10}" y="${p.y+17}" class="t-sm" style="fill:${on?'var(--accent)':'var(--muted)'}">${i+1} · ${STEPS[i][0]}</text>`;
      /* chevrons: down between the strips, right from the fibril to the tissue */
      const ac=`fill:none;stroke:${lit?'var(--accent)':'var(--line)'};stroke-width:1.6`;
      if(i<2)s+=`<path d="M${p.x+p.w/2-5} ${p.y+p.h+1}l5 4l5-4" style="${ac}"/>`;
      if(i===2)s+=`<path d="M${p.x+p.w+2} ${p.y+p.h/2-5}l4 5l-4 5" style="${ac}"/>`;
      const cy=p.y+p.h/2+7;let g='';
      if(i===0)g=chain(p.x+22,cy,p.w-56,{n:N?19:24,show:Math.max(.06,ramp(t,0,.2)),hyd:ramp(t,.08,.24),sub:vr?(N?10:13):undefined});
      if(i===1)g=helix(p.x+12,cy,p.w-24,{amp:N?12:11,zip:ramp(t,.25,.47),phase:t*1.5,kink:vr&&t>=.25?.55:null,w:3});
      if(i===2){const rows=N?9:7,rh=N?7:6.6;g=fibril(p.x+10,cy-rows*rh/2,p.w-20,{rows,rh,grow:Math.max(.04,ramp(t,.5,.72)),irregular:vr,xlink:true,seed:7}).svg}
      if(i===3){const ld=ease(ramp(t,.78,.96)),sc=N?.82:.95,cx=p.x+p.w/2-(N?6:8),jy=p.y+p.h/2+12;
        g=joint(cx,jy,sc,{lax:vr?.95:.1,slip:ld*(vr?.62:.06),ang:ld*(vr?14:4),muscle:.35,hl:vr&&ld>.5});
        if(t>=.75)g+=`<path d="M${f1(p.x+p.w-6)} ${f1(jy+50*sc)}h${f1(-10-ld*12)}" style="stroke:var(--muted);stroke-width:2.2" marker-end="url(#hArr)"/><text x="${f1(p.x+p.w-8)}" y="${f1(jy+50*sc+18)}" class="t-xs t-end">load</text>`}
      s+=`<g clip-path="url(#hc${i})" style="opacity:${lit?1:.35}">${g}</g>`});
    svg.innerHTML=`<defs>${marker('hArr','var(--muted)')}</defs>`+s}
  vb2.addEventListener('click',()=>{vr=!vr;vb2.setAttribute('aria-pressed',vr);cap.innerHTML=vr?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  playWire(rg,$('#heroPlay'),draw,10000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 What EDS is =============== */
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');
  let scope='all',mode='wales';

  /* ---------- data (every number cited in the note panel or the table) ---------- */
  /* 13 types of 2017: abbreviation, inheritance (d dominant, r recessive, b both), size rank (log of published frequency), label */
  const TYPES=[
    {a:'hEDS',inh:'d',sz:5,f:'most common · no gene test',g:'gene unknown',hatch:true},
    {a:'cEDS',inh:'d',sz:4,f:'~1 in 20,000',g:'COL5A1/2'},
    {a:'vEDS',inh:'d',sz:3,f:'1 in 50–200k',g:'COL3A1'},
    {a:'kEDS',inh:'r',sz:2,f:'~1 in 100k',g:'PLOD1'},
    {a:'aEDS',inh:'d',sz:1,f:'<1/1M'},
    {a:'dEDS',inh:'r',sz:1,f:'<1/1M'},
    {a:'clEDS',inh:'r',sz:1,f:'<1/1M'},
    {a:'spEDS',inh:'r',sz:1,f:'<1/1M'},
    {a:'mcEDS',inh:'r',sz:1,f:'<1/1M'},
    {a:'mEDS',inh:'b',sz:1,f:'<1/1M'},
    {a:'pEDS',inh:'d',sz:1,f:'<1/1M'},
    {a:'cvEDS',inh:'r',sz:0,f:'7 people'},
    {a:'BCS',inh:'r',sz:0,f:'85 reported'}];
  const SEX={
    all:[{l:'Wales · EDS or JHS',v:70},{l:'Denmark · EDS',v:73.9},{l:'Sweden · EDS',v:74},{l:'US claims · new EDS',v:78},{l:'Netherlands · vEDS',v:50,hl:1}],
    h:[{l:'Sweden · hypermobility synd.',v:67},{l:'Mayo · hEDS (preprint)',v:90.6},{l:'HEDGE study · hEDS',v:92},{l:'Mayo · HSD (preprint)',v:95.2}]};
  const DELAY={
    all:[{l:'Germany · all types',v:22.0},{l:'Germany · cEDS/clEDS',v:14.5},{l:'Global Registry · hEDS',v:10.39}],
    h:[{l:'Germany · hEDS/HSD',v:23.0},{l:'Global Registry · hEDS',v:10.39},{l:'older reports',v:5,ge:1}]};
  /* "crowds of 1,000" needed to meet one person */
  const CROWDS=[{l:'cEDS',n:20,txt:'~1 in 20,000'},{l:'kEDS',n:100,txt:'~1 in 100,000'},{l:'vEDS',n:50,n2:200,txt:'1 in 50,000–200,000'},{l:'each ultra-rare type',n:1000,more:1,txt:'fewer than 1 in 1,000,000'}];

  const STEPS=[
    {from:0,at:.2,k:'Scene 1 · the body\'s glue',t:'Connective tissue everywhere',
     txt:`The Ehlers-Danlos syndromes are a family of conditions that affect connective tissue, the material that holds skin, joints, blood vessels and organs together. Most of the known EDS genes encode the fibrillar collagens I, III and V, the enzymes that modify or process them, or enzymes that modify the sugar chains of proteoglycans. Type III collagen is a major protein of vessel walls and hollow organs such as the bowel, which is why vascular EDS affects them. <sup class="c" data-ref="Malfait2017,Malfait2020,Byers2017" title="Source 67,291,292">67,291,292</sup>`,
     pt:`Connective tissue is the body's glue and scaffolding. In EDS it is built a little differently, so skin, joints and other tissues can be stretchier or more fragile than usual.`,
     hook:`EDS = heritable disorders of connective tissue. Most known genes: collagens I, III, V and their processing enzymes. <sup class="c" data-ref="Malfait2020" title="Source 292">292</sup>`},
    {from:.25,at:.45,k:'Scene 2 · the 2017 classification',t:'Thirteen types',
     txt:`The 2017 International Classification recognises 13 types, each with suggestive clinical criteria. For every type except hypermobile EDS, the definite diagnosis "relies on molecular confirmation": finding the causative variant. hEDS is the only clinical diagnosis, and it is the most common type. Green tiles are dominant (a child of an affected parent has a 50% chance of inheriting the variant); amber tiles are recessive (both parents carry a variant). Myopathic EDS has been reported with both patterns. <sup class="c" data-ref="Malfait2017,Tinkle2017,Malfait2024GeneReviews,RohrbachGR-kEDS,Zou2014COL12A1" title="Source 291,293,390,461,517">291,293,390,461,517</sup>`,
     pt:`There are 13 kinds of EDS. Twelve can be confirmed with a gene test. The most common one, hypermobile EDS, cannot yet: doctors use a checklist and an examination.`,
     hook:`13 types in 2017; all except hEDS need a causative variant. The 2020 primer counts 14 (classical-like type 2, AEBP1) and 20 genes. <sup class="c" data-ref="Malfait2017,Malfait2020" title="Source 291,292">291,292</sup>`},
    {from:.5,at:.7,k:'Scene 3 · how common',t:'How common is EDS?',
     txt:`In Wales, linked primary-care and hospital records found 6,021 people with a coded diagnosis of EDS or joint hypermobility syndrome: 194.2 per 100,000 in 2016/17, or about 1 in 500. Most (84%) carried the joint hypermobility syndrome label, which the authors map mainly to hEDS or HSD. Single types are far rarer: classical EDS about 1 in 20,000, vascular EDS 1 in 50,000 to 200,000, kyphoscoliotic about 1 in 100,000, and seven types fewer than 1 in 1,000,000. These count diagnosed people, so true numbers depend on case-finding and on the criteria in use. <sup class="c" data-ref="Demmler2019,VanDijk2024,Byers2017" title="Source 67,119,480">67,119,480</sup>`,
     pt:`About 1 in every 500 people in Wales has been diagnosed with EDS or a related joint hypermobility condition. Most single types of EDS are much rarer.`,
     hook:`Wales: diagnosed EDS + JHS 194.2 per 100,000 (≈1 in 500), about four times the EU rare-disease threshold of 50 per 100,000. <sup class="c" data-ref="Demmler2019" title="Source 119">119</sup>`},
    {from:.75,at:.97,k:'Scene 4 · who gets the diagnosis',t:'Who is diagnosed, and when',
     txt:`About 70–78% of people with a diagnosis in national registers and claims are female, and more than 90% in specialist hEDS cohorts, although an autosomal dominant condition should affect men and women equally. The reason is unknown: hormonal effects on tissue and pain, and under-recognition in males, are proposed (<span class="ev hyp">Hypothesis</span>). Vascular EDS, defined by a gene test, was 50% female in the Dutch cohort. In Wales, males were most often diagnosed at 5–9 years and females at 15–19, and women were diagnosed 8.5 years later than men on average. In a survey of 505 adults with hEDS the mean wait was 10.39 years; a German service reported 23.0 years for hEDS/HSD. <sup class="c" data-ref="Demmler2019,KulasSoborg2017,Cederlof2016,Oyediran2026,Halverson2023,Wilson2026Preprint,Forghani2019,Douglas2026,Demirdas2024,Rauterberg2025" title="Source 81,118,119,132,166,204,255,349,376,507">81,118,119,132,166,204,255,349,376,507</sup>`,
     pt:`More women than men are diagnosed with hypermobile EDS, and doctors do not yet know why. Boys are often diagnosed in childhood, many women only as adults, and many people wait 10 years or more.`,
     hook:`Wales: women diagnosed on average 8.5 years later than men (95% CI 7.70–9.22); 72% of males vs 41% of females diagnosed before 18. <sup class="c" data-ref="Demmler2019" title="Source 119">119</sup>`}];
  const setSt=stepWire($('#whSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* ---------- glyphs ---------- */
  function body(cx,top,s,lit){const P=(x,y)=>f1(cx+x*s)+' '+f1(top+y*s);let g='';
    const limb=d=>`<path d="${d}" style="fill:none;stroke:var(--line);stroke-width:${f1(17*s)};stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(13*s)};stroke-linecap:round;stroke-linejoin:round"/>`;
    g+=limb(`M${P(-30,46)}L${P(-44,98)}L${P(-50,150)}`)+limb(`M${P(30,46)}L${P(44,98)}L${P(50,150)}`);
    g+=limb(`M${P(-13,128)}L${P(-16,198)}L${P(-18,258)}`)+limb(`M${P(13,128)}L${P(16,198)}L${P(18,258)}`);
    g+=`<path d="M${P(-34,42)}Q${P(0,34)} ${P(34,42)}L${P(26,134)}Q${P(0,142)} ${P(-26,134)}Z" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`;
    g+=`<rect x="${f1(cx-6*s)}" y="${f1(top+26*s)}" width="${f1(12*s)}" height="${f1(14*s)}" style="fill:var(--panel-2)"/><circle cx="${f1(cx)}" cy="${f1(top+15*s)}" r="${f1(15*s)}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`;
    /* faint inner organs that light up */
    if(lit[2]>0)g+=`<path d="M${P(-4,40)}L${P(-4,120)}M${P(-4,120)}L${P(-14,136)}M${P(-4,120)}L${P(8,136)}" style="fill:none;stroke:var(--vessel);stroke-width:${f1(3.2*s)};stroke-linecap:round;opacity:${f1(lit[2])}"/>`;
    if(lit[3]>0)g+=`<path d="${gutPath(cx-14*s,top+92*s,28*s,26*s)}" style="fill:none;stroke:var(--muscle);stroke-width:${f1(4*s)};stroke-linecap:round;opacity:${f1(lit[3])}"/>`;
    return g}
  const SITES=[[-47,124,'skin'],[16,198,'joint'],[-4,62,'vessel'],[0,104,'gut']];
  function gutPath(x,y,w,h){let d=`M${f1(x)} ${f1(y)}`;const n=3;for(let i=0;i<n;i++){const yy=y+h*i/n,y2=y+h*(i+.5)/n;
      d+=i%2?`C${f1(x+w)} ${f1(yy)} ${f1(x+w)} ${f1(yy)} ${f1(x+w*.5)} ${f1(y2)}C${f1(x)} ${f1(y2+h/(2*n))} ${f1(x)} ${f1(y2)} ${f1(x)} ${f1(y+h*(i+1)/n)}`
                :`C${f1(x+w*.3)} ${f1(yy-4)} ${f1(x+w)} ${f1(yy)} ${f1(x+w)} ${f1(y2)}C${f1(x+w)} ${f1(y2+h/(2*n))} ${f1(x+w*.7)} ${f1(y+h*(i+1)/n)} ${f1(x+w*.5)} ${f1(y+h*(i+1)/n)}`}
    return d}
  function gut(x,y,w,h,ph){const d=gutPath(x,y,w,h);
    return `<path d="${d}" style="fill:none;stroke:var(--skin-line);stroke-width:17;stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--muscle);stroke-width:14;stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--skin-derm);stroke-width:6;stroke-linecap:round;stroke-dasharray:10 8;stroke-dashoffset:${f1(-ph*90)}"/>`}
  function tile(x,y,w,T,op){const fill=T.inh==='r'?'var(--gold-soft)':'var(--accent-soft)',st=T.inh==='r'?'var(--gold)':'var(--accent)';let g='';
    g+=`<g style="opacity:${f1(op)}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(w)}" rx="8" style="fill:${fill};stroke:${st};stroke-width:1.6"/>`;
    if(T.inh==='b')g+=`<path d="M${f1(x+w)} ${f1(y)}L${f1(x+w)} ${f1(y+w-8)}Q${f1(x+w)} ${f1(y+w)} ${f1(x+w-8)} ${f1(y+w)}L${f1(x)} ${f1(y+w)}Z" style="fill:var(--gold-soft);opacity:.9"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(w)}" rx="8" style="fill:none;stroke:var(--gold);stroke-width:1.6;stroke-dasharray:4 3"/>`;
    if(T.hatch)g+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(w)}" rx="8" style="fill:url(#whHatch)"/>`;
    const big=w>=90,mid=w>=60;
    g+=`<text x="${f1(x+w/2)}" y="${f1(y+(big?w*.42:w/2+(mid?-2:2)))}" class="${big?'t-big':'t-lbl'} t-mid" style="${big?'font-size:24px':mid?'':'font-size:11.5px'}">${T.a}</text>`;
    if(big||mid)g+=`<text x="${f1(x+w/2)}" y="${f1(y+(big?w*.42+20:w/2+13))}" class="t-xs t-mid" style="fill:var(--ink)">${T.f}</text>`;
    else g+=`<text x="${f1(x+w/2)}" y="${f1(y+w/2+15)}" class="t-xs t-mid" style="font-size:8.5px">${T.f}</text>`;
    if(big&&T.g)g+=`<text x="${f1(x+w/2)}" y="${f1(y+w*.42+36)}" class="t-xs t-mid" style="fill:${T.hatch?'var(--variant)':'var(--muted)'};font-weight:600">${T.g}</text>`;
    return g+'</g>'}
  /* shelf packing of the 13 tiles */
  function pack(x0,y0,W,sizes,gap){let x=x0,y=y0,rowH=0;return sizes.map(w=>{if(x+w>x0+W+.5){x=x0;y+=rowH+gap;rowH=0}const p={x,y,w};x+=w+gap;rowH=Math.max(rowH,w);return p})}

  /* ---------- the scene ---------- */
  function draw(t){const N=vb(svg,'720 380','400 560');const W=N?400:720;let s='';
    const ph=phaseOf(STEPS,t);
    s+=`<defs><pattern id="whHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" style="stroke:var(--variant);stroke-width:2;opacity:.45"/></pattern>${marker('whArr','var(--muted)')}</defs>`;
    s+=`<text x="16" y="28" class="t-big">${STEPS[ph].t}</text><text x="${W-16}" y="28" class="t-sm t-end">${ph+1} / 4</text>`;
    let read='';
    if(ph===0){const u=ramp(t,0,.23);const lit=[0,1,2,3].map(i=>ease(ramp(u,i*.22,i*.22+.16)));
      const bx=N?92:150,bt=N?66:70,bs=N?.9:1.12;
      s+=body(bx,bt,bs,lit);
      const PN=N?[0,1,2,3].map(i=>({x:184,y:52+i*124,w:206,h:114})):[0,1,2,3].map(i=>({x:300+(i%2)*208,y:48+Math.floor(i/2)*162,w:200,h:152}));
      const LBL=[['SKIN','stretch, scars, bruising'],['JOINTS','capsule and ligaments'],['BLOOD VESSELS','artery wall layers'],['GUT & HOLLOW ORGANS','bowel wall']];
      PN.forEach((p,i)=>{const L=lit[i],sx=bx+SITES[i][0]*bs,sy=bt+SITES[i][1]*bs;
        s+=`<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(p.x)}" y2="${f1(p.y+p.h/2)}" style="stroke:var(--accent);stroke-width:1.4;stroke-dasharray:3 3;opacity:${f1(L)}"/>`;
        s+=`<circle cx="${f1(sx)}" cy="${f1(sy)}" r="${f1(5+3*bump(u,i*.22,i*.22+.3))}" style="fill:var(--accent);opacity:${f1(.2+.8*L)}"/>`;
        s+=`<clipPath id="whc${i}"><rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10"/></clipPath>`;
        s+=`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10" style="fill:var(--field);stroke:${L>.5?'var(--accent)':'var(--line)'};stroke-width:${L>.5?1.6:1}"/>`;
        let g='';const lu=ramp(u,i*.22,1);
        if(i===0)g=skin(p.x+8,p.y+(N?50:62),p.w-16,{h:N?56:78,pull:.85*bump(lu,.05,.7),max:N?26:34,fingers:true}).svg;
        if(i===1)g=joint(p.x+p.w/2,p.y+(N?66:88),N?.42:.55,{lax:.55,ang:12*Math.sin(lu*Math.PI*2),slip:.15*bump(lu,.2,.8),muscle:.3});
        if(i===2)g=artery(p.x+6,p.y+(N?68:92),p.w-12,{r:N?10:13,media:N?5:7,flow:t*14});
        if(i===3)g=gut(p.x+40,p.y+(N?40:52),p.w-80,N?54:74,t*6);
        s+=`<g clip-path="url(#whc${i})" style="opacity:${f1(.18+.82*L)}">${g}</g>`;
        s+=`<rect x="${p.x+6}" y="${p.y+6}" width="${f1(Math.min(p.w-12,LBL[i][0].length*7.2+14))}" height="18" rx="5" style="fill:var(--panel);opacity:.9"/><text x="${p.x+13}" y="${p.y+19}" class="t-sm" style="fill:${L>.5?'var(--accent)':'var(--muted)'};font-weight:600">${LBL[i][0]}</text>`;
        s+=`<text x="${p.x+p.w-8}" y="${p.y+p.h-8}" class="t-xs t-end" style="fill:var(--ink);opacity:${f1(L)}">${LBL[i][1]}</text>`});
      if(!N)s+=`<text x="16" y="368" class="t-xs">Schematic: one connective-tissue system, many places it shows.</text>`;
      read=`<span>places lit <b>${lit.filter(v=>v>.5).length} of 4</b></span><span>collagens most often involved <b>I, III, V</b></span>`}
    if(ph===1){const u=ramp(t,.25,.47);
      const nx=N?200:78,ny=N?92:200;
      const sizes=N?[136,88,72,60,48,48,48,48,48,48,48,40,40]:[146,96,78,64,52,52,52,52,52,52,52,44,44];
      const P=N?pack(16,134,368,sizes,8):pack(166,58,540,sizes,9);
      TYPES.forEach((T,i)=>{const p=P[i],e=ease(ramp(u,i*.035,i*.035+.42));
        const x=lerp(nx-p.w/2*.3,p.x,e),y=lerp(ny-p.w/2*.3,p.y,e),w=lerp(p.w*.3,p.w,e);
        s+=`<line x1="${nx}" y1="${ny}" x2="${f1(x+w/2)}" y2="${f1(y+w/2)}" style="stroke:var(--line);stroke-width:1;opacity:${f1(.8*(1-e*.6))}"/>`;
        s+=tile(x,y,w,T,.25+.75*e)});
      s+=zebra(nx,ny,N?22:28,{id:'whZ'})+`<text x="${nx}" y="${ny+(N?38:46)}" class="t-lbl t-mid">EDS</text>`;
      const shown=TYPES.filter((T,i)=>ramp(u,i*.035,i*.035+.42)>.5).length;
      s+=`<text x="${nx}" y="${ny+(N?54:64)}" class="t-sm t-mid">${shown} of 13</text>`;
      /* legend */
      const ly=N?440:352,lx=N?16:166;const lg=[['var(--accent-soft)','var(--accent)','dominant'],['var(--gold-soft)','var(--gold)','recessive'],['url(#whHatch)','var(--variant)','gene unknown']];
      lg.forEach((L,i)=>{const x=lx+i*(N?120:128);s+=`<rect x="${x}" y="${ly-10}" width="14" height="14" rx="3" style="fill:${L[0]};stroke:${L[1]};stroke-width:1.4"/><text x="${x+20}" y="${ly+1}" class="t-sm">${L[2]}</text>`});
      s+=`<text x="${lx}" y="${ly+(N?22:20)}" class="t-xs">${N?'Tile size ≈ published frequency (log scale).':'Tile size ≈ published frequency on a log scale; mEDS (dashed) is reported as dominant or recessive.'}</text>`;
      if(N)s+=`<text x="${lx}" y="${ly+38}" class="t-xs">mEDS (dashed): dominant or recessive.</text><text x="${lx}" y="${ly+54}" class="t-xs">Abbreviations: see the table below.</text>`;
      read=`<span>types shown <b>${shown} / 13</b></span><span>confirmed by a gene test <b>12</b></span><span>clinical diagnosis only <b>hEDS</b></span><span>2020 primer <b>14 types · 20 genes</b></span>`}
    if(ph===2){const u=ramp(t,.5,.72);
      if(mode==='wales'){const cols=N?40:50,cs=9,gx=N?20:24,gy=N?62:66,rows=1000/cols;
        const shown=Math.round(1000*ease(ramp(u,0,.45)));let g='';
        const rate=1.942,jhs=.84;const hi=ramp(u,.5,.8);
        /* pick two fixed cells to light */
        const pick=[Math.floor(rows*.38)*cols+Math.floor(cols*.62),Math.floor(rows*.71)*cols+Math.floor(cols*.21)];
        for(let k=0;k<shown;k++){const cx=gx+(k%cols)*cs+cs/2,cy=gy+Math.floor(k/cols)*cs+cs/2;
          const which=pick.indexOf(k);let col='var(--line)',r=2.6;
          if(which>=0&&hi>0){r=2.6+hi*1.6;
            if(scope==='all')col=which===0?'var(--accent)':'var(--accent)';
            else col='var(--accent)'}
          g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:${col}"/>`;
          if(which>=0&&hi>.2)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(6+hi*4)}" style="fill:none;stroke:var(--accent);stroke-width:1.6;opacity:${f1(hi)}"/>`}
        /* second dot is 0.94 of a person: shade the missing slice */
        s+=g;
        const gw=cols*cs,gh=rows*cs;
        s+=`<text x="${gx}" y="${gy-8}" class="t-sm">${shown.toLocaleString('en-GB')} people${N?'':' · one dot each'}</text>`;
        /* EU threshold marker: 0.5 per 1,000 = half a dot */
        const ix=N?20:gx+gw+22,iy=N?gy+gh+30:76,iw=N?360:W-ix-16;
        const val=scope==='all'?rate:rate*jhs;
        s+=`<text x="${ix}" y="${iy}" class="t-sm" style="fill:var(--accent)">${scope==='all'?'DIAGNOSED EDS OR JHS':'CODED JHS (≈ hEDS/HSD)'}</text>`;
        s+=`<text x="${ix}" y="${iy+(N?38:44)}" class="t-big" style="font-size:${N?36:42}px;fill:var(--accent)">${(val*hi).toFixed(2)}</text><text x="${ix+(N?96:112)}" y="${iy+(N?38:44)}" class="t-sm">per 1,000</text>`;
        s+=`<text x="${ix}" y="${iy+(N?58:66)}" class="t-xs" style="fill:var(--ink)">Wales, 2016/17 · ≈ 1 in ${scope==='all'?'500':'600'}</text>`;
        /* bar comparing to EU rare threshold and other registers */
        const bars=scope==='all'?[['Wales EDS+JHS',1.942],['Sweden EDS+JHS',1.2],['EU rare threshold',.5,1],['Denmark EDS only',.2]]:[['Wales, coded JHS',1.631],['Wales, coded EDS',.311],['EU rare threshold',.5,1]];
        const by=iy+(N?80:92),bw=iw-(N?118:0),bx0=ix+(N?118:0);
        bars.forEach((b,i)=>{const yy=N?by+i*20:by+i*34,len=bw*b[1]/2.2*ease(ramp(u,.55+i*.06,.85+i*.04));
          if(N)s+=`<text x="${ix}" y="${yy+9}" class="t-xs" style="fill:var(--ink)">${b[0]}</text>`;else s+=`<text x="${bx0}" y="${yy}" class="t-xs" style="fill:var(--ink)">${b[0]}</text>`;
          const ry=N?yy:yy+5;
          s+=`<rect x="${bx0}" y="${ry}" width="${f1(Math.max(1,len))}" height="10" rx="3" style="fill:${b[2]?'none':'var(--accent)'};stroke:${b[2]?'var(--warn)':'none'};stroke-dasharray:${b[2]?'3 2':'0'};opacity:${b[2]?1:.85}"/>`;
          s+=`<text x="${f1(bx0+len+5)}" y="${ry+9}" class="t-xs">${b[1].toFixed(b[1]<1?1:2).replace(/\.0$/,'')}</text>`});
        read=`<span>people shown <b>${shown}</b></span><span>${scope==='all'?'diagnosed EDS or JHS':'coded JHS'} <b>${(val*hi).toFixed(2)} per 1,000</b></span><span>EU rare threshold <b>0.5 per 1,000</b></span><span>count <b>${scope==='all'?'all EDS':'hEDS + HSD only'}</b></span>`}
      else{/* type-specific: crowds of 1,000 needed to meet one person */
        const lx=N?16:24,sx=N?16:186,cs=N?3.6:4,per=100;let y=N?68:72;
        s+=`<text x="${lx}" y="${y}" class="t-sm">${N?'One square = a crowd of 1,000 people.':'One square = a crowd of 1,000 people. Squares needed to meet one person with the type:'}</text>`;y+=N?14:22;
        if(N){s+=`<text x="${lx}" y="${y}" class="t-sm">Squares needed to meet one person:</text>`;y+=18}
        const hl=scope==='h';
        s+=`<rect x="${lx}" y="${y-2}" width="${W-2*lx}" height="${N?40:30}" rx="8" style="fill:${hl?'var(--warn-soft)':'var(--panel-2)'}"/>`;
        s+=`<text x="${lx+10}" y="${y+(N?15:18)}" class="t-lbl" style="font-size:12.5px">hEDS</text><text x="${lx+(N?52:60)}" y="${y+(N?15:18)}" class="t-xs" style="fill:var(--ink)">${N?'no type-specific estimate: no gene test.':'no type-specific estimate: there is no gene test to count it by. Wales counts it inside 1.94 per 1,000.'}</text>`;
        if(N)s+=`<text x="${lx+52}" y="${y+30}" class="t-xs" style="fill:var(--ink)">Wales counts it in 1.94 per 1,000.</text>`;
        y+=N?56:46;
        CROWDS.forEach((c,ci)=>{const e=ease(ramp(u,ci*.12,ci*.12+.45)),n=Math.round(c.n*e),n2=c.n2?Math.round(c.n2*e):0,tot=Math.max(n,n2);
          const lines=Math.max(1,Math.ceil(tot/per));
          s+=`<g style="opacity:${hl?.4:1}">`;
          s+=`<text x="${lx}" y="${y+(N?0:9)}" class="t-lbl" style="font-size:12.5px">${c.l}</text><text x="${N?W-16:lx}" y="${y+(N?0:24)}" class="t-xs ${N?'t-end':''}" style="fill:var(--ink)">${c.txt}</text>`;
          const yy=N?y+8:y;
          let g='';for(let k=0;k<tot;k++){const cx=sx+(k%per)*cs,cy=yy+Math.floor(k/per)*cs;const lo=k<n;g+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cs-1)}" height="${f1(cs-1)}" style="fill:${lo?'var(--accent)':'var(--accent-soft)'};stroke:${lo?'none':'var(--accent)'};stroke-width:.4"/>`}
          s+=g;
          const endTxt=c.more?`${tot>=c.n?'1,000+':tot}`:c.n2?`${n}–${n2}`:`${n}`;
          const ex=sx+Math.min(per,tot)*cs+6;
          s+=`<text x="${f1(Math.min(ex,W-60))}" y="${f1(yy+Math.min(lines,1)*cs+(N?8:6))}" class="t-sm" style="fill:var(--accent);font-weight:600">${endTxt}</text>`;
          s+=`</g>`;
          y=yy+lines*cs+(N?24:30)});
        read=`<span>cEDS <b>20 crowds</b></span><span>vEDS <b>50–200 crowds</b></span><span>kEDS <b>100 crowds</b></span><span>ultra-rare types <b>1,000+ crowds</b></span>`}}
    if(ph===3){const u=ramp(t,.75,.97);
      const A=N?{x:16,y:62,w:368,lw:150}:{x:20,y:66,w:330,lw:156},B=N?{x:16,y:N?318:0,w:368}:{x:384,y:66,w:320};
      const sex=SEX[scope];
      s+=`<text x="${A.x}" y="${A.y}" class="t-sm" style="fill:var(--accent)">SHARE FEMALE · ${scope==='all'?'all diagnosed EDS':'hEDS / HSD cohorts'}</text>`;
      const bx=A.x+A.lw,bw=A.w-A.lw-34,row=N?24:28;
      sex.forEach((d,i)=>{const yy=A.y+16+i*row,e=ease(ramp(u,i*.06,.45+i*.06));
        s+=`<text x="${bx-6}" y="${yy+11}" class="t-xs t-end" style="fill:var(--ink)">${d.l}</text>`;
        s+=`<rect x="${bx}" y="${yy}" width="${bw}" height="14" rx="3" style="fill:var(--panel-2)"/>`;
        s+=`<rect x="${bx}" y="${yy}" width="${f1(bw*d.v/100*e)}" height="14" rx="3" style="fill:${d.hl?'var(--vas)':'var(--accent)'};opacity:.85"/>`;
        s+=`<text x="${f1(bx+bw*d.v/100*e+4)}" y="${yy+11}" class="t-xs" style="fill:var(--ink)">${f1(d.v*e).replace('.0','')}%</text>`});
      const half=bx+bw/2,ytop=A.y+12,ybot=A.y+16+sex.length*row-6;
      s+=`<line x1="${f1(half)}" x2="${f1(half)}" y1="${ytop}" y2="${ybot}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(half)}" y="${ybot+13}" class="t-xs t-mid" style="fill:var(--ink)">50% = what a dominant gene predicts</text>`;
      /* panel B: age and delay */
      const by=N?A.y+16+sex.length*row+34:B.y;
      s+=`<text x="${B.x}" y="${by}" class="t-sm" style="fill:var(--accent)">AGE AT DIAGNOSIS · WALES</text>`;
      const ax0=B.x+(N?40:44),ax1=B.x+B.w-10,AX=a=>lerp(ax0,ax1,a/40),ay=by+30;
      s+=`<line x1="${ax0}" x2="${ax1}" y1="${ay}" y2="${ay}" class="axis"/>`;[0,10,20,30,40].forEach(a=>s+=`<text x="${f1(AX(a))}" y="${ay+13}" class="t-xs t-mid">${a}</text>`);
      s+=`<text x="${ax1}" y="${ay+26}" class="t-xs t-end">years</text>`;
      const pk=[['male',5,9,'var(--dx)',-14],['female',15,19,'var(--accent)',-14]];
      pk.forEach((p,i)=>{const e=ease(ramp(u,.15+i*.1,.45+i*.1));s+=`<rect x="${f1(AX(p[1]))}" y="${ay+p[4]}" width="${f1((AX(p[2])-AX(p[1]))*e)}" height="10" rx="3" style="fill:${p[3]}"/><text x="${f1(AX(p[1]))}" y="${ay+p[4]-4}" class="t-xs" style="fill:${p[3]};font-weight:600">${p[0]} peak ${p[1]}–${p[2]}</text>`});
      s+=`<text x="${B.x}" y="${ay-4}" class="t-xs">peak</text>`;
      /* childhood share */
      const cy=ay+44;s+=`<text x="${B.x}" y="${cy}" class="t-xs" style="fill:var(--ink)">diagnosed before 18: males <tspan style="fill:var(--dx);font-weight:700">${Math.round(72*ease(ramp(u,.3,.6)))}%</tspan> · females <tspan style="fill:var(--accent);font-weight:700">${Math.round(41*ease(ramp(u,.3,.6)))}%</tspan> · women ${f1(8.5*ease(ramp(u,.35,.65)))} y later</text>`;
      /* delay bars */
      const dy=cy+26;s+=`<text x="${B.x}" y="${dy}" class="t-sm" style="fill:var(--accent)">YEARS TO DIAGNOSIS · mean</text>`;
      const dl=DELAY[scope],dlw=N?150:146,dx0=B.x+dlw,dw=B.x+B.w-dx0-40;
      dl.forEach((d,i)=>{const yy=dy+12+i*(N?22:24),e=ease(ramp(u,.4+i*.08,.75+i*.06));
        s+=`<text x="${dx0-6}" y="${yy+10}" class="t-xs t-end" style="fill:var(--ink)">${d.l}</text>`;
        s+=`<rect x="${dx0}" y="${yy}" width="${f1(dw*d.v/25*e)}" height="12" rx="3" style="fill:var(--gold);opacity:.8"/><text x="${f1(dx0+dw*d.v/25*e+4)}" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${d.ge?'≥ ':''}${(d.v*e).toFixed(d.v%1?d.v===10.39?2:1:0)} y</text>`});
      read=`<span>female share <b>${sex.map(d=>d.v+'%').join(' · ')}</b></span><span>diagnostic delay <b>${dl.map(d=>d.v).join(' / ')} y</b></span><span>count <b>${scope==='all'?'all EDS':'hEDS + HSD only'}</b></span>`}
    svg.innerHTML=s;
    setSt(ph);
    $('#whNote').innerHTML=noteHTML(STEPS[ph]);
    $('#whRead').innerHTML=read;
  }
  const stop=playWire(rg,$('#whPlay'),draw,24000,'Replay','what');
  $$('[data-whscope]').forEach(b=>b.addEventListener('click',()=>{scope=b.dataset.whscope;$$('[data-whscope]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-whmode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.whmode;$$('[data-whmode]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(+rg.value<.5||+rg.value>=.75){stop();rg.value=.7}draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- zebra flip cards ---------- */
  $$('#whZebra .fc').forEach(c=>c.addEventListener('click',()=>{const on=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',on);c.classList.toggle('flip',on)}));

  /* ---------- population calculator ---------- */
  const pop=$('#whPop'),pre=$('#whPreset');
  const fmt=v=>v>=100?Math.round(v).toLocaleString('en-GB'):v>=10?Math.round(v).toString():v>=1?f1(v):v>=.01?v.toFixed(2):'<0.01';
  function calc(){let n=Math.max(0,+pop.value||0);
    const rows=[[n*194.2/1e5,'diagnosed EDS or joint hypermobility syndrome, at the Welsh rate'],[n/2e4,'with classical EDS (about 1 in 20,000)'],[[n/2e5,n/5e4],'with vascular EDS (1 in 200,000 to 1 in 50,000)'],[n/1e5,'with kyphoscoliotic EDS (about 1 in 100,000)'],[n/1e6,'with each ultra-rare type (fewer than 1 in 1,000,000)',1]];
    $('#whCalcOut').innerHTML=rows.map(r=>`<div><b>${Array.isArray(r[0])?fmt(r[0][0])+'–'+fmt(r[0][1]):(r[2]?'&lt; ':'')+fmt(r[0])}</b><span>${r[1]}</span></div>`).join('');
    $('#whCalcCap').innerHTML=`Expected numbers in ${Math.round(n).toLocaleString('en-GB')} people, applying published rates. These are population statistics: they say nothing about any one person, and real counts depend on testing, coding and criteria. <sup class="c" data-ref="Demmler2019,VanDijk2024,Byers2017" title="Source 67,119,480">67,119,480</sup>`}
  pop.addEventListener('input',()=>{pre.value='';calc()});
  pre.addEventListener('change',()=>{if(pre.value){pop.value=pre.value;calc()}});
  calc();
};
/* =============== 1.2 Collagen, gene to fibril =============== */
/* six steps of one collagen molecule's life; each step's local time u runs 0..1 between its from and the next from */
const CO_STEPS=[
 {from:0,at:.12,k:'Step 1 · nucleus',t:'Gene to mRNA',
  txt:`Collagen makes up about one-third of the body's protein and about three-quarters of the dry weight of skin; 28 collagen types are built from at least 46 different chains. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup> Each collagen gene has two copies, one from each parent. Both are read into messenger RNA (mRNA), which leaves the nucleus for ribosomes on the rough endoplasmic reticulum (ER). Type I collagen is two α1(I) chains and one α2(I) chain; type III is three α1(III) chains; type V comes in several chain combinations. <sup class="c" data-ref="Yamauchi2012,Shoulders2009" title="Source 432,510">432,510</sup> Use the <b>Gene</b> buttons to switch.`,
  pt:`A gene is a recipe. The cell copies the recipe into a messenger, and the messenger carries it to the cell's protein factories.`,
  hook:`Most EDS genes encode collagen I, III or V, enzymes that modify or process them, or enzymes that build proteoglycan sugar chains. <sup class="c" data-ref="Malfait2020" title="Source 292">292</sup>`},
 {from:.17,at:.29,k:'Step 2 · rough ER',t:'A Gly-X-Y chain',
  txt:`Each pro-α chain is built bead by bead from its N-end to its C-end, with a globular propeptide at each end. In the helical part every third amino acid must be glycine, the smallest one, because only glycine fits in the crowded centre of the triple helix. The repeat is written Gly-X-Y: proline fills X about 28% of the time and 4-hydroxyproline fills Y about 38%; Pro-Hyp-Gly is the commonest triplet, at 10.5%. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>`,
  pt:`Think of a bead necklace where every third bead must be the smallest bead. A bigger bead in that spot stops the three strands lying close.`,
  hook:`Gly-X-Y: glycine at every third position. A glycine substitution in COL3A1 is the commonest vEDS variant. <sup class="c" data-ref="Shoulders2009,Frank2015" title="Source 169,432">169,432</sup>`},
 {from:.34,at:.47,k:'Step 3 · rough ER',t:'Hydroxylate, then wind',
  txt:`Prolyl 4-hydroxylase turns proline in the Y position into 4-hydroxyproline, and lysyl hydroxylases make hydroxylysine, some of which then carries sugars. <sup class="c" data-ref="Shoulders2009,Yamauchi2012" title="Source 432,510">432,510</sup> The C-propeptides pick and align the three chains <sup class="c" data-ref="Hulmes2002" title="Source 217">217</sup>, and the triple helix folds from the C-end toward the N-end: three left-handed chains coil into a right-handed helix with a one-residue stagger and a 28.6 Å axial repeat. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup> FKBP14 catalyses folding of type III collagen. <sup class="c" data-ref="Giunta2018" title="Source 183">183</sup>`,
  pt:`Small chemical tags are added, then the three strands twist together like a rope, starting from one end.`,
  hook:`The triple helix zips from C to N. A glycine substitution stalls it there, and the delay leaves the chains over-modified. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>`},
 {from:.5,at:.64,k:'Step 4 · leaving the cell',t:'Secrete and trim the ends',
  txt:`Outside the cell, the C-propeptides keep procollagen soluble. <sup class="c" data-ref="Hulmes2002" title="Source 217">217</sup> Fibrils can form only after both ends are cut off. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup> The C-propeptides of procollagens I, II and III are removed by procollagen C-proteinase, which is the same protein as BMP-1. <sup class="c" data-ref="Kessler1996" title="Source 244">244</sup> The N-propeptides of types I and II are removed by procollagen I N-proteinase, encoded by ADAMTS2, which also trims type III. <sup class="c" data-ref="Colige1999,VanDamme2016" title="Source 99,474">99,474</sup>`,
  pt:`The finished rope still has two bulky end caps. Two enzymes snip them off so the ropes can line up.`,
  hook:`BMP-1 is the C-proteinase; ADAMTS-2 is the N-proteinase. dEDS loses the enzyme, aEDS loses the cut site (exon 6). <sup class="c" data-ref="Kessler1996,Colige1999,Byers1997" title="Source 66,99,244">66,99,244</sup>`},
 {from:.67,at:.8,k:'Step 5 · outside the cell',t:'A quarter-staggered fibril',
  txt:`One type I triple helix is under 2 nm wide and about 300 nm long. Molecules pack side by side, each shifted by D = 67 nm from its neighbour. A molecule is 4.46 D long, so the stagger leaves gap zones (0.54 D) and overlap zones (0.46 D): the banding seen on electron microscopy (the Hodge-Petruska model). Tendon fibrils reach up to 1 cm long and about 500 nm wide. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup> Purified collagen can assemble on its own, but in tissue, cells steer where fibrils start, which way they point and how thick they grow. <sup class="c" data-ref="Holmes2018Fibril" title="Source 212">212</sup>`,
  pt:`The ropes pack together in a staggered pattern, like bricks in a wall. That pattern gives fibrils their striped look under the microscope.`,
  hook:`D-period 67 nm; molecule 4.46 D; gap zone 0.54 D, overlap zone 0.46 D. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>`},
 {from:.84,at:.96,k:'Step 6 · outside the cell',t:'Cross-link and size control',
  txt:`Lysyl oxidase (LOX) leaves the cell as proLOX, is activated by cutting, and oxidises specific lysines to an aldehyde so that covalent cross-links can form. <sup class="c" data-ref="Lucero2006" title="Source 279">279</sup> Cross-links give strength and stability but are not needed to build the fibril. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup> Type V collagen co-assembles with type I and controls when fibrils start: mouse embryos with no α1(V) chain make virtually no fibrils and die at about embryonic day 10. <sup class="c" data-ref="Wenstrup2004" title="Source 502">502</sup> Tenascin-X regulates how collagen is deposited <sup class="c" data-ref="Mao2002" title="Source 295">295</sup>, and decorin's dermatan sulfate helps organise fibrils into bundles. <sup class="c" data-ref="Miyake2010" title="Source 309">309</sup>`,
  pt:`Chemical bridges lock the ropes together, and helper proteins decide how many fibres form and how thick they grow.`,
  hook:`Haploinsufficiency (a null allele: less normal protein) versus dominant negative (a faulty chain spoils molecules that also hold normal chains). In vEDS, null variants delayed the first complication by almost 15 years. <sup class="c" data-ref="Leistritz2011,Schwarze2001" title="Source 262,424">262,424</sup>`}
];
/* what the selected EDS type changes at each step */
const CO_VN={
 c:[`Copy 2 here is a null allele: it makes no usable product, so the cell has about half the type V collagen. About one-third of people with cEDS have COL5A1 haploinsufficiency, and most COL5A1 variants in a 126-person series created a null allele. <sup class="c" data-ref="Wenstrup2000,Symoens2012" title="Source 456,500">456,500</sup>`,
  `About one-third of COL5A1 variants, and all COL5A2 variants, in that series were structural: they change the chain itself. COL5A2 exon skipping gave a sparse fibril network of very variable size and shape. <sup class="c" data-ref="Symoens2012,Michalickova1998" title="Source 302,456">302,456</sup>`,
  `Folding of the main collagen, type I, is not the problem. Type V is a minor partner that matters later, when fibrils start. <sup class="c" data-ref="Wenstrup2004" title="Source 502">502</sup>`,
  `Trimming is not the step that fails in cEDS: watch steps 5 and 6.`,
  `Type V co-assembles with type I and controls fibril initiation. In col5a1+/− mice, half-normal collagen V gave 50% fewer dermal fibrils, plus a second population of large, abnormal fibrils that formed without control. <sup class="c" data-ref="Wenstrup2004,Wenstrup2006" title="Source 502,503">502,503</sup>`,
  `Electron microscopy of cEDS skin shows composite fibrils with flower-like cross-sections, the "collagen flowers", although no biopsy finding is specific to one type. The mouse model had lower skin tensile strength. <sup class="c" data-ref="Hausser1994,Angwin2020C,Wenstrup2006" title="Source 13,206,503">13,206,503</sup>`],
 v:[`COL3A1 makes type III procollagen, a major protein of vessel walls and hollow organs. Copy 2 here carries a missense change at a glycine codon; its message is made as usual. Some vEDS variants are null alleles instead, which lower the amount. <sup class="c" data-ref="Byers2017,Schwarze2001" title="Source 67,424">67,424</sup>`,
  `The orange bead is a glycine substitution, the commonest class: 71 of 126 variants in a French cohort. The replacing amino acids were biased toward those that most destabilise assembly. <sup class="c" data-ref="Frank2015" title="Source 169">169</sup>`,
  `Folding stalls at the substitution, and the delay leaves the chains over-modified. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup> Type III has three identical chains, so changed and normal chains end up in the same molecules: a dominant-negative effect, predicted for 43 of 56 variants (76.8%) in a Dutch cohort. <sup class="c" data-ref="Demirdas2024" title="Source 118">118</sup>`,
  `With a null allele, by contrast, fewer molecules are made but none carries a faulty chain into the fibril. <sup class="c" data-ref="Schwarze2001" title="Source 424">424</sup>`,
  `In a 1994 electron-microscopy series, skin from people with clinically vascular EDS showed a dermis thinned to a third of normal, with small-diameter fibrils. <sup class="c" data-ref="Hausser1994" title="Source 206">206</sup>`,
  `In 142 Dutch people with vEDS, median age at first major event was 30.0 years for splice and in-frame variants, 40.5 for glycine substitutions and 53.0 for haploinsufficient variants. These are group statistics, not predictions for one person. See <a href="#vascular" data-go="vascular">Vascular EDS</a>. <sup class="c" data-ref="Demirdas2024" title="Source 118">118</sup>`],
 a:[`Copy 2 of COL1A1 or COL1A2 loses all or part of exon 6, which is then skipped in the message. <sup class="c" data-ref="Byers1997,Klaassens2012" title="Source 66,247">66,247</sup>`,
  `The chain from the changed copy lacks the stretch encoded by exon 6, which holds the N-proteinase cleavage site. <sup class="c" data-ref="Byers1997" title="Source 66">66</sup>`,
  `Nothing shows yet: the missing piece is the cleavage site, which matters at the next step. <sup class="c" data-ref="Byers1997" title="Source 66">66</sup>`,
  `The enzyme is present, but the substrate has lost its cleavage site, so the N-propeptide stays on. Dermatosparaxis blocks the same step from the enzyme side. COL1A1 variants produced the most severe effects. <sup class="c" data-ref="Byers1997" title="Source 66">66</sup>`,
  `If N-propeptides persist, they change fibril shape. <sup class="c" data-ref="Hulmes2002" title="Source 217">217</sup> The skipped exon leads to defective collagen synthesis. <sup class="c" data-ref="Klaassens2012" title="Source 247">247</sup>`,
  `The hallmark is congenital bilateral hip dislocation with severe generalised joint hypermobility and recurrent subluxations. <sup class="c" data-ref="VanDijk2024,Ayoub2020" title="Source 21,480">21,480</sup>`],
 d:[`The collagen genes are normal. Both copies of ADAMTS2, the procollagen N-proteinase gene, carry variants: recessive inheritance. <sup class="c" data-ref="Colige1999" title="Source 99">99</sup>`,
  `Chains are made as usual in dEDS; the fault comes after secretion. <sup class="c" data-ref="Colige1999" title="Source 99">99</sup>`,
  `Folding is not affected: watch step 4.`,
  `ADAMTS2 variants abolish N-proteinase activity, so the N-propeptide stays on. ADAMTS-2 also trims type III procollagen. <sup class="c" data-ref="Colige1999,VanDamme2016" title="Source 99,474">99,474</sup>`,
  `If N-propeptides persist, they change fibril shape. <sup class="c" data-ref="Hulmes2002" title="Source 217">217</sup>`,
  `Clinically, extreme skin fragility with redundant, almost lax skin. A series of 5 adults aged 22 to 42 described redundant skin folds and fractures. <sup class="c" data-ref="VanDijk2024,Angwin2025" title="Source 16,480">16,480</sup>`],
 k:[`The collagen genes are normal. Both copies of PLOD1, the gene for lysyl hydroxylase 1, carry variants: recessive inheritance. <sup class="c" data-ref="Yeowell2000,VanDijk2024" title="Source 480,512">480,512</sup>`,
  `The chains themselves are normal; the missing step is a modification that comes next. <sup class="c" data-ref="Yeowell2000" title="Source 512">512</sup>`,
  `Without lysyl hydroxylase 1, lysines stay unhydroxylated (orange crosses). Hydroxylysines carry the sugars and are precursors of the cross-links that give collagen its tensile strength. <sup class="c" data-ref="Yeowell2000" title="Source 512">512</sup>`,
  `Trimming is not the step that fails in kEDS: watch step 6.`,
  `Fibrils still assemble: telopeptide cross-links form after assembly and are not needed to build the fibril. <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>`,
  `Cross-links now form from unhydroxylated lysines (dashed orange). The urinary LP/HP cross-link ratio is about 6 in PLOD1-kEDS against about 0.2 in controls, and a markedly raised ratio can confirm the diagnosis when genetic testing finds only one variant or a VUS. <sup class="c" data-ref="Giunta2008,RohrbachGR-kEDS" title="Source 182,390">182,390</sup>`]
};
/* "which step breaks": cells c = {column: 2 main, 1 also}; columns 0..5 are the animation steps, 6 lies outside collagen itself */
const CO_MX=[
 {ab:'cEDS',name:'Classical EDS',gene:'COL5A1, COL5A2 (rarely COL1A1)',inh:'AD',v:'c',c:{0:2,1:1,4:2,5:1},
  txt:`Mostly too little type V collagen. In 126 people with diagnosed or suspected cEDS, 93 had a type V defect; over 90% of those meeting all major criteria had one. <sup class="c" data-ref="Symoens2012" title="Source 456">456</sup> Type V controls when fibrils start; mice with half-normal collagen V had 50% fewer dermal fibrils. <sup class="c" data-ref="Wenstrup2004,Wenstrup2006" title="Source 502,503">502,503</sup>`},
 {ab:'vEDS',name:'Vascular EDS',gene:'COL3A1',inh:'AD',v:'v',c:{0:1,1:2,2:2},
  txt:`Type III procollagen is a major protein of vessel walls and hollow organs. <sup class="c" data-ref="Byers2017" title="Source 67">67</sup> Glycine substitutions are the commonest variant class, and a substitution stalls folding where it sits. Null alleles (step 1) lower the amount instead. <sup class="c" data-ref="Frank2015,Shoulders2009,Schwarze2001" title="Source 169,424,432">169,424,432</sup>`},
 {ab:'aEDS',name:'Arthrochalasia EDS',gene:'COL1A1, COL1A2 (exon 6)',inh:'AD',v:'a',c:{0:1,3:2},
  txt:`Variants delete all or part of exon 6, which holds the N-proteinase cleavage site: the same step as dEDS, blocked at the substrate instead of the enzyme. The hallmark is congenital bilateral hip dislocation. <sup class="c" data-ref="Byers1997,Klaassens2012,VanDijk2024" title="Source 66,247,480">66,247,480</sup>`},
 {ab:'dEDS',name:'Dermatosparaxis EDS',gene:'ADAMTS2',inh:'AR',v:'d',c:{3:2,4:1},
  txt:`Biallelic ADAMTS2 variants abolish procollagen N-proteinase activity. Fifteen people had been reported by 2025. Extreme skin fragility with redundant, almost lax skin. <sup class="c" data-ref="Colige1999,Angwin2025,VanDijk2024" title="Source 16,99,480">16,99,480</sup>`},
 {ab:'kEDS',name:'Kyphoscoliotic EDS, PLOD1',gene:'PLOD1',inh:'AR',v:'k',c:{2:2,5:1},
  txt:`Lysyl hydroxylase 1 deficiency. Without hydroxylysine the cross-link pattern shifts: the urinary LP/HP ratio is about 6, against about 0.2 in controls, and a markedly raised ratio can confirm the diagnosis when testing finds only one variant or a VUS. <sup class="c" data-ref="Yeowell2000,Giunta2008,RohrbachGR-kEDS" title="Source 182,390,512">182,390,512</sup>`},
 {ab:'kEDS',name:'Kyphoscoliotic EDS, FKBP14',gene:'FKBP14',inh:'AR',v:null,c:{2:2},
  txt:`An ER folding catalyst for type III collagen. It looks almost the same as PLOD1-kEDS, but urinary pyridinolines are normal and hearing loss is common; patients' fibroblasts have enlarged ER cisterns. <sup class="c" data-ref="Giunta2018,Baumann2012" title="Source 30,183">30,183</sup> The animation shows the normal folding step.`},
 {ab:'spEDS',name:'Spondylodysplastic EDS, SLC39A13',gene:'SLC39A13',inh:'AR',v:null,c:{2:2},
  txt:`An ER zinc transporter. Without it, lysine and proline are under-hydroxylated, and the urinary LP/HP ratio is about 1. <sup class="c" data-ref="Giunta2008" title="Source 182">182</sup> The animation shows the normal step.`},
 {ab:'cvEDS',name:'Cardiac-valvular EDS',gene:'COL1A2 (both copies)',inh:'AR',v:null,c:{0:2},
  txt:`Biallelic COL1A2 variants trigger nonsense-mediated mRNA decay, so no proα2(I) chains are made. Surprisingly, this causes heart-valve disease without bone involvement. <sup class="c" data-ref="Schwarze2004" title="Source 425">425</sup>`},
 {ab:'mEDS',name:'Myopathic EDS',gene:'COL12A1',inh:'AD/AR',v:null,c:{1:2},
  txt:`Collagen XII. Both a recessive loss-of-function variant and a de novo dominant variant were found in the first families; 25 people from 16 families had been reported by 2024. <sup class="c" data-ref="Zou2014COL12A1,VanDijk2024" title="Source 480,517">480,517</sup>`},
 {ab:'clEDS1',name:'Classical-like EDS type 1',gene:'TNXB',inh:'AR',v:null,c:{4:2,5:1},
  txt:`Tenascin-X regulates collagen deposition: knockout mice had fibrils of normal size and shape but less densely packed, and their fibroblasts made collagen I yet failed to deposit it. Skin is hyperextensible without atrophic scars. <sup class="c" data-ref="Mao2002,Schalkwijk2001" title="Source 295,413">295,413</sup>`},
 {ab:'clEDS2',name:'Classical-like EDS type 2',gene:'AEBP1',inh:'AR',v:null,c:{4:2},
  txt:`ACLP binds fibrillar collagens and enhances their polymerisation; patient skin shows less dermal collagen and ragged fibrils. Described in 2018, after the 2017 classification. <sup class="c" data-ref="Blackburn2018" title="Source 47">47</sup>`},
 {ab:'spEDS',name:'Spondylodysplastic EDS, linker enzymes',gene:'B4GALT7, B3GALT6',inh:'AR',v:null,c:{6:2},
  txt:`Enzymes that build the sugar linker attaching glycosaminoglycan chains to proteoglycan core proteins. <sup class="c" data-ref="Malfait2013B3GALT6,FaiyazUlHaque2004" title="Source 148,290">148,290</sup>`},
 {ab:'mcEDS',name:'Musculocontractural EDS',gene:'CHST14, DSE',inh:'AR',v:null,c:{5:1,6:2},
  txt:`Dermatan sulfate is lost and replaced by chondroitin sulfate. Decorin normally carries dermatan sulfate to help organise collagen: fibrils keep their size and shape, but bundles form poorly. <sup class="c" data-ref="Dundar2009,Muller2013,Miyake2010" title="Source 134,309,319">134,309,319</sup>`},
 {ab:'BCS',name:'Brittle cornea syndrome',gene:'ZNF469, PRDM5',inh:'AR',v:null,c:{0:1,6:2},
  txt:`These genes probably encode transcription factors for matrix components; PRDM5 regulates the expression of fibrillar collagens. <sup class="c" data-ref="Dhooge2021,BurkittWright2011" title="Source 63,125">63,125</sup>`},
 {ab:'pEDS',name:'Periodontal EDS',gene:'C1R, C1S',inh:'AD',v:null,c:{6:2},
  txt:`Gain-of-function variants in subunits of the first complement component: the one type outside the collagen and proteoglycan pathways. The changed proteins are retained inside the cell. <sup class="c" data-ref="KapfererSeebacher2016,VanDijk2024" title="Source 238,480">238,480</sup>`},
 {ab:'hEDS',name:'Hypermobile EDS',gene:'no gene known',inh:'?',v:null,c:null,
  none:'No gene known, so it cannot be placed on the pathway. The diagnosis is clinical.',
  txt:`No genetic, epigenetic or metabolomic cause has been found, and the diagnosis rests on the 2017 clinical criteria. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> <span class="ev hyp">Hypothesis</span> Van Dijk and colleagues expect most people with hEDS not to have a single-gene cause. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`}
];

inits.collagen=()=>{
  const svg=$('#coSvg'),rg=$('#coT');
  let V='n',G='1',hl=null,setSt=()=>{};
  const VN={n:'Typical',c:'cEDS',v:'vEDS',a:'aEDS',d:'dEDS',k:'kEDS (PLOD1)'};
  const GN={'1':'COL1A1','3':'COL3A1','5':'COL5A1'};
  const FAULT={n:[],c:[0,4,5],v:[1,2],a:[3],d:[3],k:[2,5]};
  const REG=[0,1,1,2,3,3];
  const OR='fill:var(--variant)',INK='fill:var(--ink)';
  const T=(x,y,s,c='t-xs',st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const COLS=()=>G==='3'?['var(--chain-a)','var(--chain-a)','var(--chain-a)']:['var(--chain-a)','var(--chain-a)','var(--chain-c)'];
  const LBL=()=>G==='1'?['pro-α1(I)','pro-α1(I)','pro-α2(I)']:G==='3'?['pro-α1(III)','pro-α1(III)','pro-α1(III)']:['pro-α(V)','pro-α(V)','pro-α(V)'];
  const cross=(x,y,r=4,w=2)=>`<path d="M${f1(x-r)} ${f1(y-r)}L${f1(x+r)} ${f1(y+r)}M${f1(x+r)} ${f1(y-r)}L${f1(x-r)} ${f1(y+r)}" style="stroke:var(--variant);stroke-width:${w};stroke-linecap:round"/>`;
  const ribo=(x,y)=>`<ellipse cx="${f1(x)}" cy="${f1(y-5)}" rx="10" ry="7" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.1;opacity:.95"/><ellipse cx="${f1(x)}" cy="${f1(y+6)}" rx="7.5" ry="4.5" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.1;opacity:.95"/>`;
  const blob=(x,y,r,col,op=1)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel-2);stroke:${col};stroke-width:1.3;opacity:${f1(op)}"/>`;

  /* ---- the strip at the top: nucleus → ER → secretion → matrix ---- */
  function ov(W,y0,ph,N){
    const x0=12,w=W-24,X=v=>x0+w*v;let s='';
    const R=[{a:0,b:.18,n:'1 nucleus'},{a:.19,b:.47,n:N?'2–3 ER':'2–3 rough ER'},{a:.48,b:.655,n:N?'4 exit':'4 secretion'},{a:.67,b:1,n:N?'5–6 matrix':'5–6 outside the cell'}];
    s+=`<rect x="${f1(X(0))}" y="${y0}" width="${f1(w*.655)}" height="46" rx="18" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<ellipse cx="${f1(X(.09))}" cy="${y0+23}" rx="${f1(w*.07)}" ry="15" style="fill:var(--panel-2);stroke:var(--nuc);stroke-width:1.3"/>`;
    for(let i=0;i<3;i++){let d='';for(let j=0;j<=24;j++){const xx=X(.205)+j*w*.25/24;d+=(j?'L':'M')+f1(xx)+' '+f1(y0+12+i*11+Math.sin(j*.9+i)*3)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--cell-line);stroke-width:1.3"/>`;
      for(let j=1;j<24;j+=3)s+=`<circle cx="${f1(X(.205)+j*w*.25/24)}" cy="${f1(y0+12+i*11+Math.sin(j*.9+i)*3-2.5)}" r="1.4" style="fill:var(--muted)"/>`}
    for(let i=0;i<3;i++)s+=`<path d="M${f1(X(.5))} ${y0+13+i*9}q${f1(w*.05)} 7 ${f1(w*.1)} 0" style="fill:none;stroke:var(--cell-line);stroke-width:2.2;stroke-linecap:round"/>`;
    s+=`<circle cx="${f1(X(.632))}" cy="${y0+23}" r="5" style="fill:none;stroke:var(--cell-line);stroke-width:1.2"/>`;
    for(let i=0;i<4;i++)s+=`<rect x="${f1(X(.68+i*.012))}" y="${y0+5+i*10}" width="${f1(w*(.3-i*.016))}" height="6" rx="3" style="fill:var(--fibril);stroke:var(--fibril-line);stroke-width:.7"/>`;
    /* rings: the current step (jade), the faulty steps of the chosen type and the matrix pick (orange, dashed) */
    const bad=new Set(FAULT[V].map(i=>REG[i]));if(hl&&hl.c!=null&&hl.c<6)bad.add(REG[hl.c]);
    R.forEach((r,i)=>{if(bad.has(i))s+=`<rect x="${f1(X(r.a)-1)}" y="${y0-5}" width="${f1(w*(r.b-r.a)+2)}" height="56" rx="11" style="fill:none;stroke:var(--variant);stroke-width:1.8;stroke-dasharray:5 3"/>`;
      if(REG[ph]===i)s+=`<rect x="${f1(X(r.a)+2)}" y="${y0-2}" width="${f1(w*(r.b-r.a)-4)}" height="50" rx="9" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>`;
      s+=T(X((r.a+r.b)/2),y0+64,r.n,'t-xs t-mid',REG[ph]===i?'fill:var(--ink);font-weight:700':'')});
    return s}

  /* ---- step 1: two gene copies are read into mRNA ---- */
  function s1(B,u,t,N){let s='';const nw=N?B.w:B.w*.58,nh=N?214:B.h,g=GN[G],prod=[0,0];
    s+=`<rect x="${B.x}" y="${B.y}" width="${f1(nw)}" height="${nh}" rx="22" style="fill:var(--cell);stroke:var(--nuc);stroke-width:1.4;stroke-dasharray:6 4"/>`;
    s+=T(B.x+16,B.y+22,`NUCLEUS · ${g}, two copies`,'t-sm',INK);
    for(let c=0;c<2;c++){
      const y=B.y+(N?70:78)+c*(N?74:82),x0=B.x+20,len=nw-40,gs=x0+len*.1,ge=x0+len*.94;
      const p=ramp(u-c*.06,.02,.6),px=gs+(ge-gs)*p,mx=gs+(ge-gs)*.5,e0=gs+(ge-gs)*.12,e1=gs+(ge-gs)*.21;
      s+=`<rect x="${f1(gs)}" y="${y-10}" width="${f1(ge-gs)}" height="20" rx="4" style="fill:var(--panel-2)"/>`;
      for(let xx=x0;xx<=x0+len;xx+=8)s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${y-5}" y2="${y+5}" style="stroke:var(--line);stroke-width:1.2"/>`;
      s+=`<line x1="${f1(x0)}" x2="${f1(x0+len)}" y1="${y-5}" y2="${y-5}" style="stroke:var(--muted);stroke-width:1.6"/><line x1="${f1(x0)}" x2="${f1(x0+len)}" y1="${y+5}" y2="${y+5}" style="stroke:var(--muted);stroke-width:1.6"/>`;
      const wav=(xa,xb)=>{if(xb-xa<2)return '';let d='';for(let xx=xa;xx<=xb;xx+=3)d+=(d?'L':'M')+f1(xx)+' '+f1(y-17+Math.sin((xx-gs)*.25)*2.2);return `<path d="${d}" style="fill:none;stroke:var(--chain-a);stroke-width:2.4;stroke-linecap:round"/>`};
      let lab=`copy ${c+1}`,st='';
      if(c===1&&V==='c'){lab='copy 2 · null allele: no usable product';st=OR;
        if(p>.1)s+=cross(Math.min(px,ge)-14,y-18,5,2.4)}
      else if(c===1&&V==='a'){s+=`<rect x="${f1(e0)}" y="${y-9}" width="${f1(e1-e0)}" height="18" style="fill:var(--variant);opacity:.7"/>`;
        s+=wav(gs,Math.min(px,e0));if(px>e1){s+=wav(e1,px);s+=cross((e0+e1)/2,y-17,3.5,1.8)}
        lab='copy 2 · exon 6 (the cut site) is skipped';st=OR}
      else{s+=wav(gs,px);
        if(c===1&&V==='v'){s+=`<circle cx="${f1(mx)}" cy="${y}" r="5" style="fill:var(--variant);stroke:var(--ink);stroke-width:.8"/>`;
          if(px>mx)s+=`<circle cx="${f1(mx)}" cy="${y-17}" r="3.6" style="fill:var(--variant)"/>`;lab='copy 2 · missense change at a glycine codon';st=OR}}
      if(p>0&&p<1)s+=`<ellipse cx="${f1(px)}" cy="${y}" rx="11" ry="9" style="fill:var(--brand);opacity:.85"/>`;
      s+=T(x0,y+24,lab,'t-xs',st);
      prod[c]=c===1&&V==='c'?0:Math.floor(ramp(u-c*.06,.25,.95)*4);
    }
    const fy=B.y+nh-14;
    if(V==='d'||V==='k'){s+=T(B.x+16,fy-15,`Collagen genes are normal in ${V==='d'?'dEDS':'kEDS'}.`,'t-xs',OR);
      s+=T(B.x+16,fy,`${V==='d'?'ADAMTS2':'PLOD1'}: both copies changed (recessive). See step ${V==='d'?4:3}.`,'t-xs',OR)}
    else s+=T(B.x+16,fy,N?'dark oval = RNA polymerase · jade = mRNA':'dark oval = RNA polymerase reading · jade = mRNA','t-xs');
    /* cytoplasm: finished messages with ribosomes on them */
    const rx=N?B.x:B.x+nw+22,ry=N?B.y+nh+18:B.y,rw=N?B.w:B.w-nw-22;
    s+=T(rx,ry+16,'CYTOPLASM · mRNA meets ribosomes','t-sm',INK);
    let i=0;for(let c=0;c<2;c++)for(let j=0;j<prod[c];j++){const col=i%2,row=Math.floor(i/2),xx=rx+col*(rw/2)+4,yy=ry+44+row*25,L=rw/2-22;
      let d='';for(let q=0;q<=L;q+=3)d+=(q?'L':'M')+f1(xx+q)+' '+f1(yy+Math.sin(q*.25)*2);
      s+=`<path d="${d}" style="fill:none;stroke:var(--chain-a);stroke-width:2.2;stroke-linecap:round"/>`+ribo(xx+L*.38,yy-1);
      if(c===1&&V==='v')s+=`<circle cx="${f1(xx+L*.7)}" cy="${f1(yy)}" r="3.4" style="fill:var(--variant)"/>`;
      if(c===1&&V==='a')s+=cross(xx+L*.12,yy,3,1.6);
      i++}
    s+=T(rx,ry+(N?150:152),`mRNA so far: copy 1 → ${prod[0]} · copy 2 → ${prod[1]}`,'t-sm');
    const CMP={'1':['type I = 2 × α1(I) + 1 × α2(I)','found in dermis, bone, tendon, ligament'],'3':['type III = 3 × α1(III)','found in skin, blood vessels, intestine'],'5':['type V = several chain combinations','found in bone, dermis, cornea, placenta']};
    s+=T(rx,ry+(N?176:182),CMP[G][0],'t-sm',INK)+T(rx,ry+(N?193:199),CMP[G][1],'t-xs')+T(rx,ry+(N?210:216),`${GN[G]} encodes one of these chains`,'t-xs');
    return {svg:s,read:`<span>mRNA copies <b>${prod[0]+prod[1]}</b></span>`}}

  /* ---- step 2: three pro-α chains grow on ribosomes ---- */
  function s2(B,u,t,N){let s='';const x0=B.x+(N?24:44),len=B.w-(N?62:110),n=N?25:40,cols=COLS(),lb=LBL(),subI=Math.round(n/6)*3,gap=N?38:36;
    for(let i=0;i<3;i++){const y=B.y+30+i*gap,sh=ramp(u,i*.07,.62+i*.07),o={n,col:cols[i],show:sh,pro:true,wave:1.4},vv=V==='v'&&i===2;if(vv)o.sub=subI;
      s+=T(x0+8,y-11,lb[i]+(vv?' · from the changed copy':''),'t-xs',vv?OR:'');
      s+=chain(x0,y,len,o);
      if(sh>0&&sh<1){const k=Math.round(n*sh);s+=ribo(x0+Math.max(0,k-1)*len/(n-1),y)}}
    const y3=B.y+30+2*gap+24;
    s+=T(x0-6,y3,'N-end','t-xs')+T(x0+len+8,y3,'C-end','t-xs t-end')+T(x0+len/2,y3,N?'built N → C on the rough ER':'built from N to C on ribosomes of the rough ER','t-xs t-mid');
    const zy=N?B.y+196:B.y+178,nt=N?3:4,sp=N?38:40,zx=x0+12;
    s+=T(x0,zy-30,'ZOOM · THE REPEAT: Gly-X-Y','t-sm',INK);
    for(let j=0;j<nt*3;j++){const ty=j%3,ap=ramp(u,.12+j*.035,.17+j*.035);if(ap<=0)continue;const cx=zx+j*sp,bad=V==='v'&&ty===0&&j===(nt-1)*3;
      const r=(bad?13:ty===0?8:12)*(.4+.6*ap),fill=bad?'var(--variant)':ty===0?'var(--chain-b)':'var(--chain-a)';
      s+=`<circle cx="${f1(cx)}" cy="${zy}" r="${f1(r)}" style="fill:${fill};opacity:${f1(ap)}"/>`;
      if(ap>.6)s+=T(cx,zy+3.5,bad?'!':['G','X','Y'][ty],'t-xs t-mid','fill:var(--panel);font-weight:700');
      if(j<3)s+=T(cx,zy+28,['Gly','X','Y'][ty],'t-xs t-mid',INK)}
    const c1=N?['X: proline about 28% of the time','Y: hydroxyproline about 38%','Pro-Hyp-Gly is the commonest triplet: 10.5%']:['X is proline about 28% of the time · Y is 4-hydroxyproline about 38%','Pro-Hyp-Gly is the commonest triplet: 10.5% of all triplets'];
    c1.forEach((l,i)=>s+=T(x0,zy+50+i*16,l,'t-xs'));
    if(V==='v'){const ly=zy+50+c1.length*16;
      (N?['vEDS: a bulkier amino acid replaces glycine;','it does not fit the centre of the helix']:['vEDS: a bulkier amino acid replaces glycine and does not fit the centre of the helix']).forEach((l,i)=>s+=T(x0,ly+i*16,l,'t-xs',OR))}
    return {svg:s,read:`<span>triplets per chain <b>${Math.floor(Math.round(n*ramp(u,0,.62))/3)}</b></span>`}}

  /* ---- step 3: hydroxylation, then three chains zip into a helix from the C-end ---- */
  function s3(B,u,t,N){let s='';const x0=B.x+(N?26:52),len=B.w-(N?70:124),n=N?25:40,cols=COLS(),yc=B.y+(N?84:82),
      aa=ramp(u,0,.4),bb=ramp(u,.38,1),fa=1-ramp(u,.38,.46),fb=ramp(u,.38,.46),sp=26,amp=N?9:11,subI=Math.round(n/6)*3;
    const zb=V==='v'?(bb<.45?bb/.45*.55:bb<.72?.55:.55+(bb-.72)/.28*.45):bb;
    if(fa>0){s+=`<g style="opacity:${f1(fa)}">`;
      for(let i=0;i<3;i++){const y=yc+(i-1)*sp,o={n,col:cols[i],pro:true,hyd:aa,wave:1.2};if(V==='v'&&i===2)o.sub=subI;s+=chain(x0,y,len,o);
        [5,14,23,32].forEach(j=>{if(j>=n||j/n>=aa)return;const bx=x0+j*len/(n-1),by=y+Math.sin(j*.7)*1.2;
          s+=V==='k'?cross(bx,by+9,2.6,1.6):`<rect x="${f1(bx-3)}" y="${f1(by+5)}" width="6" height="6" rx="1" style="fill:var(--gold)"/>`})}
      const pill=(x,y,txt,bad)=>`<rect x="${f1(x-26)}" y="${f1(y-9)}" width="52" height="17" rx="8.5" style="fill:${bad?'var(--bad-soft)':'var(--panel)'};stroke:${bad?'var(--variant)':'var(--muted)'};stroke-width:1.2"/>`+T(x,y+3.5,txt,'t-xs t-mid',bad?OR:INK);
      const px=x0+clamp(len*aa,26,len-26);
      s+=pill(px,yc-sp-20,'P4H',false)+pill(px,yc+sp+22,'LH1',V==='k');
      if(V==='k')s+=`<line x1="${f1(px-24)}" y1="${f1(yc+sp+22)}" x2="${f1(px+24)}" y2="${f1(yc+sp+22)}" style="stroke:var(--variant);stroke-width:1.6"/>`;
      s+='</g>'}
    if(fb>0){s+=`<g style="opacity:${f1(fb)}">`;
      s+=helix(x0,yc,len,{amp,zip:zb,phase:t*3,w:3,cols,kink:V==='v'?.45:undefined});
      const cm=ramp(bb,0,.15),nm=ramp(zb,.92,1);
      for(let k=0;k<3;k++){s+=blob(x0+len+15,yc+(k-1)*amp*2.1*(1-cm),cm>=1?12:7,cols[k]);s+=blob(x0-11,yc+(k-1)*amp*2.1*(1-nm),4.5,cols[k])}
      if(bb<.35)s+=T(x0+len+28,yc-amp*2.1-14,'C-propeptides line the chains up','t-xs t-end',INK);
      if(zb<1){const fx=x0+len*(1-zb);s+=`<path d="M${f1(Math.min(fx+44,x0+len))} ${f1(yc+amp*2.1+14)}H${f1(fx+4)}" class="arrow" marker-end="url(#coArr)"/>`}
      if(V==='v'&&bb>=.45&&bb<.72)s+=T(x0+len*.45,yc+amp*2.1+32,'folding stalls at the substitution · chains over-modified','t-xs t-mid',OR);
      s+='</g>'}
    const iy=yc+(N?78:76);
    s+=T(x0,iy,`hydroxylated ${Math.round(aa*100)}% · helix wound ${Math.round(zb*100)}% (from the C-end)`,'t-sm',INK);
    const L=N?['small dot above a bead = hydroxyproline','gold square = hydroxylysine (sugar and cross-link site)','left-handed chains → right-handed triple helix','one-residue stagger · 28.6 Å axial repeat']
             :['small dot above a bead = hydroxyproline · gold square below = hydroxylysine (sugar and cross-link site)','three left-handed chains coil into one right-handed triple helix · one-residue stagger · 28.6 Å repeat'];
    L.forEach((l,i)=>s+=T(x0,iy+18+i*15,l,'t-xs'));
    const vy=iy+18+L.length*15+4;
    if(V==='k')s+=T(x0,vy,N?'kEDS: LH1 (PLOD1) missing: no hydroxylysine':'kEDS: lysyl hydroxylase 1 (PLOD1) missing, so no hydroxylysine forms','t-xs',OR);
    else if(V==='v')s+=T(x0,vy,N?'vEDS: the orange kink is the glycine substitution':'vEDS: the orange kink marks the glycine substitution; changed and normal chains mix','t-xs',OR);
    else if(G==='3'&&V==='n')s+=T(x0,vy,'FKBP14 speeds the folding of type III collagen','t-xs');
    return {svg:s,read:`<span>hydroxylated <b>${Math.round(aa*100)}%</b></span><span>wound <b>${Math.round(zb*100)}%</b></span>`}}

  /* ---- step 4: secretion, then the two propeptides are cut off ---- */
  function s4(B,u,t,N){let s='';const L=N?190:300,amp=N?7:8,mx=B.x+(N?44:140),my=B.y+(N?84:88),cols=COLS(),
      pos=ease(ramp(u,0,.36)),xm=lerp(mx-L-40,mx+(N?70:60),pos),blk=V==='d'||V==='a',cutN=blk?0:ramp(u,.42,.6),cutC=ramp(u,.6,.78),mh=N?110:116;
    s+=`<rect x="${mx-5}" y="${B.y}" width="10" height="${mh}" style="fill:var(--panel-2)"/>`;
    for(let yy=B.y+3;yy<B.y+mh;yy+=7)s+=`<circle cx="${mx-4}" cy="${yy}" r="2" style="fill:var(--cell-line)"/><circle cx="${mx+4}" cy="${yy}" r="2" style="fill:var(--cell-line)"/>`;
    s+=T(mx-12,B.y+12,'inside','t-xs t-end')+T(mx+12,B.y+12,N?'outside':'outside the cell','t-xs');
    const ve=1-ramp(u,.22,.36);if(ve>0)s+=`<rect x="${f1(xm-24)}" y="${my-24}" width="${L+56}" height="48" rx="24" style="fill:none;stroke:var(--cell-line);stroke-width:1.3;stroke-dasharray:4 3;opacity:${f1(ve)}"/>`;
    s+=helix(xm,my,L,{amp,zip:1,phase:t*2,w:2.6,cols,kink:V==='v'?.45:undefined});
    s+=blob(xm-10-cutN*26,my-cutN*14,7,cols[0],1-cutN*.9)+blob(xm+L+14+cutC*26,my+cutC*12,12,cols[2],1-cutC*.9);
    const scis=(x,y,l1,l2,bad)=>{let g=`<path d="M${f1(x-7)} ${f1(y-9)}L${f1(x+7)} ${f1(y+7)}M${f1(x+7)} ${f1(y-9)}L${f1(x-7)} ${f1(y+7)}" style="stroke:var(--ink);stroke-width:1.8;stroke-linecap:round"/><circle cx="${f1(x-8)}" cy="${f1(y-11)}" r="3" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><circle cx="${f1(x+8)}" cy="${f1(y-11)}" r="3" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
      if(bad)g+=`<circle cx="${f1(x)}" cy="${f1(y-2)}" r="12" style="fill:none;stroke:var(--variant);stroke-width:2"/><line x1="${f1(x-8)}" y1="${f1(y+6)}" x2="${f1(x+8)}" y2="${f1(y-10)}" style="stroke:var(--variant);stroke-width:2"/>`;
      return g+T(x,y-34,l1,'t-xs t-mid',bad?OR:INK)+T(x,y-22,l2,'t-xs t-mid',bad?OR:'')};
    if(u>.36&&u<.9){const sy=my-amp-16;
      s+=scis(xm-4,sy,V==='d'?'ADAMTS2 missing':V==='a'?'no cut site':'ADAMTS2',V==='a'?'(exon 6 skipped)':'N-proteinase',blk);
      s+=scis(xm+L+4,sy,'BMP-1','C-proteinase',false)}
    const st=(c,b)=>b?'stays on':c>=1?'cut off':c>0?'being cut':'on';
    const yS=my+(N?44:48);
    s+=T(B.x+(N?6:10),yS,`N-propeptide: ${st(cutN,blk)} · C-propeptide: ${st(cutC,false)}`,'t-sm',blk?OR:INK);
    const y2=yS+40,x1=B.x+30;
    if(!blk){s+=T(x1-10,y2-16,'one chain alone, before and after trimming','t-xs');
      s+=chain(x1,y2,N?280:400,{n:N?21:30,pro:true,cut:Math.min(cutN,cutC),col:cols[0],wave:1.2})}
    else (N?['Same step, blocked from two sides:','dEDS lacks the enzyme (ADAMTS2);','aEDS lacks the cut site (exon 6).']:['Same step, blocked from two sides: dEDS lacks the enzyme (ADAMTS2),','aEDS lacks the cut site in the substrate (exon 6 of COL1A1 or COL1A2).']).forEach((l,i)=>s+=T(x1-10,y2-12+i*16,l,'t-xs',OR));
    const fy=B.y+(N?250:222);
    (N?['Before trimming, C-propeptides keep','procollagen soluble. Fibrils form only','after both ends are cut off.']:['Before trimming, C-propeptides keep procollagen soluble;','fibrils can form only after both ends are cut off.']).forEach((l,i)=>s+=T(B.x+(N?6:20),fy+i*15,l,'t-xs'));
    return {svg:s,read:`<span>N-propeptide <b>${st(cutN,blk)}</b></span><span>C-propeptide <b>${st(cutC,false)}</b></span>`}}

  /* ---- step 5: molecules join a quarter-staggered fibril ---- */
  function s5(B,u,t,N){let s='';const x=B.x+8,len=B.w-16,rows=N?10:8,rh=N?10:11,fy=B.y+(N?70:62),irr=V==='c'||V==='d'||V==='a',
      gr=ramp(u,.06,.9)*(V==='v'?.72:1),mol=len*.34,gp=mol*.12,D=(mol+gp)/5;
    s+=T(x+len,B.y+10,'gold = type V collagen','t-xs t-end');
    for(let j=0;j<2;j++){const p=ramp(u,.1+j*.32,.42+j*.32);if(p<=0||p>=1)continue;const hx=x+len*(.16+.42*j),hy=lerp(B.y+24,fy-6,ease(p));
      s+=`<g style="opacity:${f1(1-ramp(p,.8,1))}">`+helix(hx,hy,mol*.8,{amp:3.5,zip:1,phase:t*4,w:1.8,cols:COLS(),kink:V==='v'&&j===1?.5:undefined})+'</g>'}
    s+=fibril(x,fy,len,{rows,rh,grow:gr,irregular:irr,seed:V==='c'?23:irr?31:11}).svg;
    const rr=rng(77),nV=V==='c'?3:7;
    for(let i=0;i<nV;i++){const xx=x+len*(.04+rr()*.86),r=Math.floor(rr()*rows);if((xx-x)/len*.7+r/rows*.3>gr)continue;
      s+=`<rect x="${f1(xx)}" y="${f1(fy+r*rh+rh*.12)}" width="12" height="${f1(rh*.5)}" rx="2" style="fill:var(--gold)"/>`}
    const r2=rng(5);
    if(V==='v')for(let i=0;i<8;i++){const xx=x+len*(.04+r2()*.9),r=Math.floor(r2()*rows);if((xx-x)/len*.7+r/rows*.3>gr)continue;s+=`<circle cx="${f1(xx)}" cy="${f1(fy+r*rh+rh*.36)}" r="3.2" style="fill:var(--variant)"/>`}
    if(V==='d'||V==='a')for(let i=0;i<10;i++){const xx=x+len*(.04+r2()*.9),r=Math.floor(r2()*rows);if((xx-x)/len*.7+r/rows*.3>gr)continue;s+=blob(xx,fy+r*rh+rh*.4,3.6,'var(--muted)')}
    const ay=fy+rows*rh+18,op=ramp(gr,.5,.8);
    if(!irr&&op>0){const xa=x+D/2,xb=xa+D;s+=`<g style="opacity:${f1(op)}">`;
      s+=`<path d="M${f1(xa)} ${ay-7}V${ay}H${f1(xb)}V${ay-7}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`+T((xa+xb)/2,ay+14,'D = 67 nm','t-sm t-mid',INK);
      s+=T(N?x:xb+40,N?ay+32:ay+4,'each D = gap zone 0.54 D + overlap zone 0.46 D','t-xs');
      const ma=x+len*(N?.3:.28),my2=N?ay+52:ay+30;
      s+=`<path d="M${f1(ma)} ${my2-6}V${my2}H${f1(ma+mol)}V${my2-6}" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
      s+=T(N?x:ma+mol+10,N?my2+16:my2+4,N?'one molecule ≈ 300 nm = 4.46 D, under 2 nm wide':'one molecule ≈ 300 nm = 4.46 D','t-xs');
      if(!N)s+=T(ma+mol+10,my2+18,'and under 2 nm wide','t-xs');
      s+='</g>'}
    else if(irr)(V==='c'?(N?['cEDS: too little type V, so fewer fibrils start,','and some grow large and irregular (schematic)']:['cEDS: too little type V, so fewer fibrils start, and some grow large and irregular (schematic)'])
      :(N?['N-propeptides that stay on change','fibril shape (schematic)']:['N-propeptides that stay on (grey) change fibril shape (schematic)'])).forEach((l,i)=>s+=T(x,ay+4+i*16,l,'t-xs',OR));
    if(V==='v')s+=T(x,N?ay+86:ay+62,N?'vEDS: fewer molecules; orange = faulty chain':'vEDS: fewer molecules join, and some carry a faulty chain (orange)','t-xs',OR);
    const fy2=B.y+(N?300:226);
    (N?['Purified collagen can assemble on its own;','in tissue, cells steer where fibrils start,','which way they point and how thick they grow.']:['Purified collagen can assemble on its own; in tissue, cells steer where fibrils start,','which way they point and how thick they grow.']).forEach((l,i)=>s+=T(x,fy2+i*15,l,'t-xs'));
    return {svg:s,read:`<span>molecules joined <b>${Math.round(gr*100)}%</b></span><span>D-period <b>67 nm</b></span>`}}

  /* ---- step 6: cross-links, and a cross-section showing fibril number and width ---- */
  function s6(B,u,t,N){let s='';const fx=B.x+8,fl=N?B.w-16:340,fy=B.y+(N?34:36),rows=N?7:8,rh=10,irr=V==='c'||V==='d'||V==='a';
    s+=T(fx,fy-14,N?'LOX: lysine → aldehyde → cross-link':'LOX: lysine → aldehyde → covalent cross-link','t-xs',INK);
    s+=fibril(fx,fy,fl,{rows,rh,grow:1,irregular:irr,seed:V==='c'?23:irr?31:11}).svg;
    const rr=rng(19),nx=Math.floor(fl/18),cnt=Math.floor(ramp(u,.08,.55)*nx);
    for(let i=0;i<cnt;i++){const xx=fx+9+i*18,r=Math.floor(rr()*(rows-1)),y1=fy+r*rh+rh*.6,y2=fy+(r+1)*rh+rh*.2;
      s+=`<line x1="${f1(xx)}" x2="${f1(xx+2)}" y1="${f1(y1)}" y2="${f1(y2)}" style="stroke:${V==='k'?'var(--variant)':'var(--accent)'};stroke-width:1.9;stroke-linecap:round${V==='k'?';stroke-dasharray:2 1.6':''}"/>`}
    /* cross-section */
    const cx0=N?B.x:B.x+372,cy0=N?fy+rows*rh+34:B.y+26,cw=N?B.w:B.w-372,ch=N?168:150,gw=ease(ramp(u,.15,.75));
    s+=T(cx0+4,cy0-8,'CROSS-SECTION OF A BUNDLE (schematic)','t-xs',INK);
    s+=`<rect x="${f1(cx0)}" y="${f1(cy0)}" width="${f1(cw)}" height="${ch}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const g=rng(41),spx=27,spy=24,nc=Math.floor((cw-30)/spx),nr=Math.floor((ch-24)/spy);
    for(let r=0;r<nr;r++)for(let c=0;c<nc;c++){const px=cx0+22+c*spx+(r%2)*spx/2,py=cy0+22+r*spy,j1=g(),j2=g(),j3=g();if(px>cx0+cw-16)continue;
      let R=10+(j2-.5),shape='c';
      if(V==='c'){if(j1<.5)continue;R=8+j2*13;shape='f'}else if(V==='v'){if(j1<.3)continue;R=5+j2*1.5}else if(V==='d'||V==='a'){R=9+j2*2;shape='p'}
      R*=gw;if(R<.6)continue;
      if(shape==='c')s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(R)}" style="fill:var(--fibril);stroke:var(--fibril-line);stroke-width:1"/>`;
      else{const lob=5+Math.floor(j3*3),m=shape==='f'?.2:0;let d='';
        for(let q=0;q<=36;q++){const a=q/36*Math.PI*2,rr2=shape==='f'?R*(1+m*Math.sin(lob*a)):R*(.72+.5*Math.abs(Math.sin(a*2.5+j3*6))*(.6+j1*.4));d+=(q?'L':'M')+f1(px+Math.cos(a)*rr2)+' '+f1(py+Math.sin(a)*rr2)}
        s+=`<path d="${d}Z" style="fill:var(--fibril);stroke:${shape==='f'?'var(--variant)':'var(--fibril-line)'};stroke-width:1"/>`}}
    if(gw>.5)for(let i=0;i<5;i++){const px=cx0+22+spx*(1+i*1.6)+spx/4,py=cy0+22+spy*((i%3)+.5);if(px>cx0+cw-12||py>cy0+ch-10)continue;
      let d='';for(let k=0;k<3;k++){const a=k*Math.PI/3;d+=`M${f1(px-Math.cos(a)*5)} ${f1(py-Math.sin(a)*5)}L${f1(px+Math.cos(a)*5)} ${f1(py+Math.sin(a)*5)}`}
      s+=`<path d="${d}" style="stroke:var(--nerve);stroke-width:1.4;stroke-linecap:round;opacity:${f1(ramp(gw,.5,1))}"/>`}
    const LG={n:'even, round fibrils of similar width',c:'fewer fibrils, some large with flower-like outlines',v:'small-diameter fibrils, as reported in vEDS skin',
      a:'irregular outlines where N-propeptides stay on',d:'irregular outlines where N-propeptides stay on',k:'normal size and shape; the cross-link chemistry differs'};
    s+=T(cx0+4,cy0+ch+16,LG[V],'t-xs',V==='n'||V==='k'?INK:OR)+T(cx0+4,cy0+ch+31,'violet asterisks = tenascin-X (regulates deposition)','t-xs');
    /* urinary cross-link ratio, from a published comparison */
    const by=N?cy0+ch+62:fy+rows*rh+30,bx=fx+(N?118:132),bw=N?150:150,gb=ramp(u,.25,.85);
    s+=T(fx,by,'URINE LP/HP CROSS-LINK RATIO','t-xs',INK);
    [{l:'controls',v:.2,k:0},{l:'SLC39A13 spEDS',v:1,k:0},{l:'PLOD1-kEDS',v:6,k:1}].forEach((b,i)=>{const yy=by+18+i*18,hot=b.k&&V==='k';
      s+=T(fx,yy+4,b.l,'t-xs',hot?'fill:var(--variant);font-weight:700':'');
      s+=`<rect x="${f1(bx)}" y="${yy-5}" width="${f1(Math.max(1.5,bw*b.v/6*gb))}" height="10" rx="2" style="fill:${b.k?'var(--variant)':'var(--muted)'};opacity:${hot||!b.k?1:.55}"/>`;
      if(gb>.3)s+=T(bx+bw*b.v/6+6,yy+4,'≈ '+b.v,'t-xs',INK)});
    s+=T(fx,by+(N?78:76),'Cross-links add strength; fibrils form without them.','t-xs');
    return {svg:s,read:`<span>cross-links <b>${cnt} of ${nx}</b></span>`}}

  const SC=[s1,s2,s3,s4,s5,s6];
  function draw(t){
    const N=vb(svg,'720 380','400 600'),W=N?400:720;
    const B=N?{x:14,y:92,w:372,h:470}:{x:20,y:88,w:680,h:250};
    const ph=phaseOf(CO_STEPS,t),a=CO_STEPS[ph].from,b=ph<5?CO_STEPS[ph+1].from:1,u=clamp((t-a)/(b-a));
    let s=`<defs>${marker('coArr','var(--muted)')}<clipPath id="coClip"><rect x="${B.x-6}" y="${B.y-8}" width="${B.w+12}" height="${B.h+14}"/></clipPath></defs>`;
    s+=ov(W,10,ph,N);
    const r=SC[ph](B,u,t,N);
    s+=`<g clip-path="url(#coClip)">${r.svg}</g>`;
    const hr=hl&&hl.c!=null?CO_MX[hl.i]:null;
    let cap=`${VN[V]} · step ${ph+1} of 6: ${CO_STEPS[ph].t}`;
    if(hr)cap+=N?` · ring: ${hr.ab}`:` · orange ring: where ${hr.ab} (${hr.gene.split(' (')[0]}) acts`;
    else if(FAULT[V].includes(ph))cap+=' · the faulty step';
    s+=T(N?14:20,N?590:368,cap,'t-sm',FAULT[V].includes(ph)||hr?OR:INK);
    svg.innerHTML=s;
    setSt(ph);
    const P=CO_STEPS[ph],vt=V!=='n'?`</p><p class="covar"><b class="vl">${VN[V]}</b>${CO_VN[V][ph]}`:'';
    $('#coNote').innerHTML=noteHTML(Object.assign({},P,{txt:P.txt+vt}));
    $('#coRead').innerHTML=`<span>gene <b>${GN[G]}</b></span><span>showing <b>${VN[V]}</b></span><span>step <b>${ph+1} of 6</b></span>${r.read}`;
  }
  const stop=playWire(rg,$('#coPlay'),draw,26000,'Replay','collagen');
  setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);

  function setGene(g){G=g;$$('[data-cog]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.cog===G))}
  function setVar(v,keepHl){V=v;$$('[data-cov]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.cov===V));
    const lock={c:'5',v:'3',a:'1'}[V];if(lock)setGene(lock);
    if(!keepHl){hl=null;$$('#coMx [aria-pressed]').forEach(b=>b.setAttribute('aria-pressed','false'));$$('#coMx tr.hl').forEach(tr=>tr.classList.remove('hl'))}}
  $$('[data-cov]').forEach(b=>b.addEventListener('click',()=>{setVar(b.dataset.cov,false);draw(+rg.value)}));
  $$('[data-cog]').forEach(b=>b.addEventListener('click',()=>{const g=b.dataset.cog;if({c:'5',v:'3',a:'1'}[V]&&{c:'5',v:'3',a:'1'}[V]!==g)setVar('n',false);setGene(g);draw(+rg.value)}));

  /* ---- "which step breaks" matrix ---- */
  const HD=['1 Gene → mRNA','2 Gly-X-Y chain','3 Modify &amp; fold','4 Cut the ends','5 Assemble fibril','6 Cross-link &amp; size','Outside collagen'];
  let h='<table><thead><tr><th scope="col">Type · gene</th>'+HD.map(x=>`<th scope="col">${x}</th>`).join('')+'</tr></thead><tbody>';
  CO_MX.forEach((r,i)=>{h+=`<tr data-cmrow="${i}"><th scope="row"><button data-cmr="${i}" aria-pressed="false"><b>${r.ab}<span class="inh">${r.inh}</span></b><small>${r.gene}</small></button></th>`;
    if(!r.c)h+=`<td colspan="7" class="none">${r.none}</td>`;
    else for(let c=0;c<7;c++){const l=r.c[c];h+=l?`<td><button class="${l===2?'p':''}" data-cmc="${i}:${c}" aria-pressed="false" aria-label="${r.name}, ${HD[c].replace('&amp;','and')}: ${l===2?'main step':'also involved'}">${l===2?'●':'○'}</button></td>`:'<td></td>'}
    h+='</tr>'});
  $('#coMx').innerHTML=h+'</tbody></table>';
  const INH={AD:'Autosomal dominant',AR:'Autosomal recessive','AD/AR':'Dominant or recessive','?':'No gene known'};
  function pick(i,c){const r=CO_MX[i];
    if(c==null&&r.c)c=+Object.keys(r.c).find(k=>r.c[k]===2);
    if(c===undefined)c=null;
    setVar(r.v||'n',true);hl={i,c};
    $$('#coMx [data-cmr]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.cmr===i));
    $$('#coMx [data-cmc]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cmc===i+':'+c));
    $$('#coMx tr[data-cmrow]').forEach(tr=>tr.classList.toggle('hl',+tr.dataset.cmrow===i));
    if(c!=null&&c<6){stop();rg.value=CO_STEPS[c].at}
    draw(+rg.value);
    const where=c==null?'':c<6?` <b>Shown:</b> step ${c+1}, ${HD[c].replace(/^\d /,'').replace('&amp;','and').toLowerCase()}${r.v?', with this type switched on':', drawn as the typical step'}.`:' <b>Outside the six steps:</b> the animation stays where it is.';
    $('#coMxOut').innerHTML=noteHTML({k:`${INH[r.inh]} · ${r.gene}`,t:r.name,txt:r.txt+where,
      pt:r.c?null:`Doctors diagnose hypermobile EDS from a careful examination; a gene test cannot confirm it yet.`});
  }
  $('#coMx').addEventListener('click',e=>{const a=e.target.closest('[data-cmr]'),b=e.target.closest('[data-cmc]');
    if(a)pick(+a.dataset.cmr,null);else if(b){const p=b.dataset.cmc.split(':');pick(+p[0],+p[1])}});
  $('#coMxOut').innerHTML=noteHTML({k:'Which step breaks',t:'Pick a type or a dot',
    txt:`Each row is one type in the 2017 classification, plus classical-like EDS type 2. A filled dot is the step its gene mainly affects. Picking one switches the animation to that step, and for cEDS, vEDS, aEDS, dEDS and PLOD1-kEDS also switches the type on. <sup class="c" data-ref="Malfait2017,Malfait2020" title="Source 291,292">291,292</sup>`,
    hook:`Same step, two sides: dEDS lacks the N-proteinase (ADAMTS2); aEDS lacks its cut site (exon 6). <sup class="c" data-ref="Colige1999,Byers1997" title="Source 66,99">66,99</sup>`});

  draw(+rg.value);
};
/* =============== 1.3 The 13 types (2017) =============== */
/* one row per type; n = rough rarity for sorting (1 in n; reported-case counts sort as rarest) */
const TY_ROWS={
 cEDS:{ab:'cEDS',name:'Classical EDS',genes:'COL5A1, COL5A2 (rarely COL1A1)',inh:'AD',grp:0,tis:'skin',n:2e4,
  maj:`Generalised joint hypermobility; skin hyperextensibility with atrophic scarring. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
  freq:`About 1 in 20,000. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,risk:`Arterial complications in 7 of 154 people (4.5%) in a UK cohort, mostly medium-sized vessels. <sup class="c" data-ref="Angwin2020" title="Source 12">12</sup>`},
 vEDS:{ab:'vEDS',name:'Vascular EDS',genes:'COL3A1',inh:'AD',grp:0,tis:'vessels',n:5e4,
  maj:`Arterial aneurysm and/or dissection; sigmoid colon perforation without diverticular or other colon disease; uterine rupture in the third trimester without a previous caesarean or severe perineal tear; carotid-cavernous sinus fistula without trauma. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
  freq:`1 in 50,000 to 1 in 200,000. <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>`,risk:`Arterial, bowel and uterine rupture. Median survival was 51 years in 1,231 people, lower in men: a population figure, not a prediction. <sup class="c" data-ref="Pepin2014" title="Source 364">364</sup> See <a href="#vascular" data-go="vascular">Vascular EDS</a>.`},
 aEDS:{ab:'aEDS',name:'Arthrochalasia EDS',genes:'COL1A1, COL1A2 (exon 6)',inh:'AD',grp:0,tis:'joints',n:1e6,
  maj:`Hallmark: congenital bilateral hip dislocation with severe generalised joint hypermobility and recurrent subluxations. <sup class="c" data-ref="VanDijk2024,Ayoub2020" title="Source 21,480">21,480</sup>`,
  freq:`Fewer than 1 in 1,000,000; about 42 people published by 2020. <sup class="c" data-ref="VanDijk2024,Ayoub2020" title="Source 21,480">21,480</sup>`,risk:`In 12 UK patients, 9 had fractures and 4 used a wheelchair or could not walk unaided. <sup class="c" data-ref="Ayoub2020" title="Source 21">21</sup>`},
 dEDS:{ab:'dEDS',name:'Dermatosparaxis EDS',genes:'ADAMTS2',inh:'AR',grp:0,tis:'skin',n:1.5e6,
  maj:`An updated set of 9 major criteria; extreme skin fragility with redundant, almost lax skin. <sup class="c" data-ref="VanDijk2024,VanDamme2016" title="Source 474,480">474,480</sup>`,
  freq:`Fewer than 1 in 1,000,000; 15 people reported by 2025. <sup class="c" data-ref="VanDijk2024,Angwin2025" title="Source 16,480">16,480</sup>`,risk:`Skin injury, redundant skin folds often needing resection, and fractures in 5 adults. <sup class="c" data-ref="Angwin2025" title="Source 16">16</sup>`},
 cvEDS:{ab:'cvEDS',name:'Cardiac-valvular EDS',genes:'COL1A2 (both copies)',inh:'AR',grp:0,tis:'vessels',n:1e8,
  maj:`Heart-valve disease, first affecting the mitral valve. <sup class="c" data-ref="Guarnieri2019" title="Source 190">190</sup>`,
  freq:`7 people reported, aged 6 to 65. <sup class="c" data-ref="VanDijk2024,Guarnieri2019" title="Source 190,480">190,480</sup>`,risk:`Valve disease without the bone fragility of other COL1A2 conditions. <sup class="c" data-ref="Schwarze2004" title="Source 425">425</sup>`},
 kEDS:{ab:'kEDS',name:'Kyphoscoliotic EDS',genes:'PLOD1, FKBP14',inh:'AR',grp:1,tis:'muscle',n:1e5,
  maj:`Congenital muscle hypotonia; congenital or early-onset kyphoscoliosis; generalised joint hypermobility with dislocations or subluxations. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
  freq:`About 1 in 100,000. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,risk:`PLOD1: rupture or dissection of medium-sized arteries. <sup class="c" data-ref="RohrbachGR-kEDS" title="Source 390">390</sup> FKBP14: hearing loss common, vascular complications rare. <sup class="c" data-ref="Baumann2012,Giunta2018" title="Source 30,183">30,183</sup>`},
 clEDS:{ab:'clEDS',name:'Classical-like EDS (type 1)',genes:'TNXB',inh:'AR',grp:2,tis:'skin',n:2e6,
  maj:`Key features (no formal criteria quoted here): hyperextensible skin without atrophic scars, joint hypermobility, easy bruising. <sup class="c" data-ref="Schalkwijk2001,Demirdas2017" title="Source 117,413">117,413</sup>`,
  freq:`Fewer than 1 in 1,000,000. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,risk:`In the literature, gastrointestinal rupture in 16% and major vascular events in 5%; foot abnormalities in 81%. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`},
 clEDS2:{ab:'clEDS2',name:'Classical-like EDS type 2 (after 2017)',genes:'AEBP1',inh:'AR',grp:2,tis:'skin',n:1e9,post:1,
  maj:`No formal diagnostic criteria yet. Described with joint laxity, hyperextensible skin, poor wound healing and osteoporosis. <sup class="c" data-ref="VanDijk2024,Blackburn2018" title="Source 47,480">47,480</sup>`,
  freq:`About 11 to 15 people described. <sup class="c" data-ref="Angwin2023,VanDijk2024" title="Source 14,480">14,480</sup>`,risk:`Arterial aneurysm or dissection in 3 of 15; bowel rupture in 2 of 15. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`},
 mEDS:{ab:'mEDS',name:'Myopathic EDS',genes:'COL12A1',inh:'AD/AR',grp:2,tis:'muscle',n:3e6,
  maj:`Congenital hypotonia that improves with age. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
  freq:`Fewer than 1 in 1,000,000; 25 people from 16 families. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,risk:`Muscle weakness; some argue it is better classed as a congenital myopathy. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`},
 spEDS:{ab:'spEDS',name:'Spondylodysplastic EDS',genes:'B4GALT7, B3GALT6, SLC39A13',inh:'AR',grp:3,tis:'bones',n:4e6,
  maj:`Short stature; muscle hypotonia; bowing of the limbs. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
  freq:`Fewer than 1 in 1,000,000. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,risk:`In 12 people with B3GALT6 variants, some had aortic dilatation or aneurysm, cervical spine instability or respiratory insufficiency. <sup class="c" data-ref="VanDamme2018" title="Source 475">475</sup>`},
 mcEDS:{ab:'mcEDS',name:'Musculocontractural EDS',genes:'CHST14, DSE',inh:'AR',grp:3,tis:'joints',n:5e6,
  maj:`Characteristic craniofacial, skeletal, skin and eye features, present in over 90% of 66 people. <sup class="c" data-ref="Minatogawa2022" title="Source 305">305</sup>`,
  freq:`Fewer than 1 in 1,000,000; 66 people from 48 families with CHST14 variants. <sup class="c" data-ref="VanDijk2024,Minatogawa2022" title="Source 305,480">305,480</sup>`,risk:`Median age 6 at the first dislocation and at the first large subcutaneous haematoma. <sup class="c" data-ref="Minatogawa2022" title="Source 305">305</sup>`},
 pEDS:{ab:'pEDS',name:'Periodontal EDS',genes:'C1R, C1S',inh:'AD',grp:4,tis:'teeth',n:1e7,
  maj:`Generalised lack of attached gingiva (pathognomonic); periodontitis starting young. <sup class="c" data-ref="KapfererSeebacher2021,VanDijk2024" title="Source 239,480">239,480</sup>`,
  freq:`148 people reported since the 1970s. <sup class="c" data-ref="KapfererSeebacherGR-pEDS" title="Source 240">240</sup>`,risk:`On average, all teeth are lost by about age 20. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`},
 BCS:{ab:'BCS',name:'Brittle cornea syndrome',genes:'ZNF469, PRDM5',inh:'AR',grp:5,tis:'eyes',n:2e7,
  maj:`Thin cornea with or without rupture; early progressive keratoconus or keratoglobus; blue sclerae. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
  freq:`85 people in a literature review (53 ZNF469, 32 PRDM5). <sup class="c" data-ref="Dhooge2021" title="Source 125">125</sup>`,risk:`Corneal rupture; musculoskeletal signs can come before it. <sup class="c" data-ref="Dhooge2021" title="Source 125">125</sup>`},
 hEDS:{ab:'hEDS',name:'Hypermobile EDS',genes:'no gene known',inh:'AD*',grp:6,tis:'joints',n:0,
  maj:`Clinical diagnosis: Criterion 1 (generalised joint hypermobility), Criterion 2 (two or more of features A, B and C) and Criterion 3 (exclusions) must all be met. <sup class="c" data-ref="Malfait2017,Fairweather2025" title="Source 147,291">147,291</sup> See <a href="#criteria" data-go="criteria">The 2017 hEDS criteria</a>.`,
  freq:`No type-specific figure. Diagnosed EDS or joint hypermobility syndrome in Wales: 194.2 per 100,000, mostly hypermobility. Likely the most common heritable connective tissue disorder. <sup class="c" data-ref="Demmler2019,Tinkle2017" title="Source 119,461">119,461</sup>`,risk:`Joint instability, pain and fatigue are covered in Part 3. No gene test can confirm it. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup>`}
};
const TY_GRP=[
 {w:['Collagen','structure and','processing'],n:'Collagen primary structure and processing'},
 {w:['Collagen','folding and','cross-linking'],n:'Collagen folding and cross-linking'},
 {w:['Myomatrix','structure and','function'],n:'Structure and function of myomatrix'},
 {w:['Glycosamino-','glycan','synthesis'],n:'Glycosaminoglycan biosynthesis'},
 {w:['Complement','pathway'],n:'Complement pathway'},
 {w:['Intracellular','processes'],n:'Intracellular processes'},
 {w:['Unresolved'],n:'Unresolved'}
];
/* leaves on the map: spEDS sits in two groups because its genes do */
const TY_LEAF=[
 {k:'cEDS',g:0,gl:['COL5A1','COL5A2']},{k:'vEDS',g:0,gl:['COL3A1']},{k:'aEDS',g:0,gl:['COL1A1/A2','exon 6']},{k:'dEDS',g:0,gl:['ADAMTS2']},{k:'cvEDS',g:0,gl:['COL1A2','both copies']},
 {k:'kEDS',g:1,gl:['PLOD1','FKBP14']},
 {k:'clEDS',g:2,gl:['TNXB']},{k:'mEDS',g:2,gl:['COL12A1']},{k:'clEDS2',g:2,gl:['AEBP1','after 2017']},
 {k:'spEDS',g:3,gl:['B4GALT7','B3GALT6']},{k:'mcEDS',g:3,gl:['CHST14','DSE']},
 {k:'pEDS',g:4,gl:['C1R','C1S']},
 {k:'spEDS',g:5,gl:['SLC39A13'],again:1},{k:'BCS',g:5,gl:['ZNF469','PRDM5']},
 {k:'hEDS',g:6,gl:['no gene','clinical']}
];
const TY_STEPS=[
 {k:'Group 1 of 7',t:'Collagen primary structure and processing',
  txt:`Five types whose gene makes a fibrillar collagen chain, or the enzyme that trims one. Classical EDS is mostly too little type V collagen <sup class="c" data-ref="Symoens2012" title="Source 456">456</sup>; vascular EDS changes type III procollagen <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>; arthrochalasia EDS removes the N-proteinase cut site in exon 6 of COL1A1 or COL1A2 <sup class="c" data-ref="Byers1997" title="Source 66">66</sup>; dermatosparaxis EDS removes the enzyme, ADAMTS2 <sup class="c" data-ref="Colige1999" title="Source 99">99</sup>; and cardiac-valvular EDS makes no proα2(I) chains at all. <sup class="c" data-ref="Schwarze2004" title="Source 425">425</sup> The 2017 scheme groups types whose proteins work in the same pathway. <sup class="c" data-ref="Malfait2017" title="Source 291">291</sup>`,
  pt:`These types all come from a fault in collagen itself, or in the enzyme that finishes it.`,
  hook:`aEDS and dEDS block the same step: aEDS loses the cut site in the substrate (exon 6), dEDS loses the enzyme (ADAMTS2). <sup class="c" data-ref="Byers1997,Colige1999" title="Source 66,99">66,99</sup>`},
 {k:'Group 2 of 7',t:'Collagen folding and cross-linking',
  txt:`Kyphoscoliotic EDS has two genes. PLOD1 makes lysyl hydroxylase 1, needed for hydroxylysine and its cross-links <sup class="c" data-ref="Yeowell2000" title="Source 512">512</sup>; FKBP14 is a folding catalyst in the endoplasmic reticulum. The two forms look almost the same, but in FKBP14-kEDS urinary pyridinolines are normal and hearing loss is common. <sup class="c" data-ref="Baumann2012" title="Source 30">30</sup> Both are recessive, with a reported prevalence of about 1 in 100,000. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
  pt:`Here collagen is made but not finished properly: it is folded or tied together badly.`,
  hook:`PLOD1-kEDS: raised urinary deoxypyridinoline-to-pyridinoline ratio. FKBP14-kEDS: normal ratio, often hearing loss. <sup class="c" data-ref="RohrbachGR-kEDS,Baumann2012" title="Source 30,390">30,390</sup>`},
 {k:'Group 3 of 7',t:'Structure and function of myomatrix',
  txt:`Tenascin-X (TNXB) regulates how collagen is deposited; its recessive loss causes classical-like EDS, with hyperextensible skin but no atrophic scars. <sup class="c" data-ref="Mao2002,Schalkwijk2001" title="Source 295,413">295,413</sup> Myopathic EDS (COL12A1) has been found with both dominant and recessive variants. <sup class="c" data-ref="Zou2014COL12A1" title="Source 517">517</sup> Classical-like EDS type 2 (AEBP1) was described in 2018, after the 2017 classification, which is why a 2020 primer counts 14 types. <sup class="c" data-ref="Blackburn2018,Malfait2020" title="Source 47,292">47,292</sup>`,
  pt:`These proteins help organise collagen in the tissue around cells and muscles.`,
  hook:`clEDS (TNXB) is recessive: stretchy skin, easy bruising, no atrophic scars. <sup class="c" data-ref="Schalkwijk2001,Demirdas2017" title="Source 117,413">117,413</sup>`},
 {k:'Group 4 of 7',t:'Glycosaminoglycan biosynthesis',
  txt:`Proteoglycans carry long sugar chains called glycosaminoglycans. B4GALT7 and B3GALT6 build the linker that attaches those chains (spondylodysplastic EDS). <sup class="c" data-ref="Malfait2013B3GALT6,FaiyazUlHaque2004" title="Source 148,290">148,290</sup> CHST14 and DSE make dermatan sulfate; without them, musculocontractural EDS results. <sup class="c" data-ref="Dundar2009,Muller2013" title="Source 134,319">134,319</sup>`,
  pt:`Collagen needs sugar-coated helper proteins to bundle properly. These types break the sugar chains.`,
  hook:`Musculocontractural EDS = a dermatan sulfate defect (CHST14 or DSE). <sup class="c" data-ref="Dundar2009,Muller2013" title="Source 134,319">134,319</sup>`},
 {k:'Group 5 of 7',t:'Complement pathway',
  txt:`Periodontal EDS is caused by heterozygous gain-of-function variants in C1R or C1S, subunits of the first complement component: the one type outside the collagen and proteoglycan pathways. <sup class="c" data-ref="KapfererSeebacherGR-pEDS,KapfererSeebacher2016" title="Source 238,240">238,240</sup> A generalised lack of attached gingiva was present in all 12 children carrying the familial variant and in none of the 7 who did not. <sup class="c" data-ref="KapfererSeebacher2021" title="Source 239">239</sup>`,
  pt:`A part of the immune system, not collagen, causes this type. It shows first in the gums.`,
  hook:`pEDS: complement genes C1R/C1S; lack of attached gingiva is pathognomonic. <sup class="c" data-ref="KapfererSeebacher2016,KapfererSeebacher2021" title="Source 238,239">238,239</sup>`},
 {k:'Group 6 of 7',t:'Intracellular processes',
  txt:`SLC39A13, an ER zinc transporter, is the third spondylodysplastic EDS gene: lysine and proline end up under-hydroxylated. <sup class="c" data-ref="Giunta2008" title="Source 182">182</sup> Brittle cornea syndrome (ZNF469, PRDM5) probably involves transcription factors for matrix components. <sup class="c" data-ref="Dhooge2021,BurkittWright2011" title="Source 63,125">63,125</sup> Its genes should be on connective-tissue panels, because people can present with joint findings before any corneal rupture. <sup class="c" data-ref="Dhooge2021" title="Source 125">125</sup>`,
  pt:`These faults are inside the cell, in the machinery that controls or supports collagen making.`,
  hook:`Brittle cornea syndrome: thin cornea, keratoconus or keratoglobus, blue sclerae. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`},
 {k:'Group 7 of 7',t:'Unresolved: hypermobile EDS',
  txt:`For every type except hEDS, a definite diagnosis needs molecular confirmation: finding the causative variant(s). <sup class="c" data-ref="Malfait2017" title="Source 291">291</sup> hEDS has no known genetic, epigenetic or metabolomic cause and is diagnosed with the 2017 clinical criteria. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> It is likely the most common heritable connective tissue disorder. <sup class="c" data-ref="Tinkle2017" title="Source 461">461</sup> At publication the 13 types were linked to 19 genes; by 2020 the count was 20. <sup class="c" data-ref="Ritelli2019,Malfait2020" title="Source 292,383">292,383</sup>`,
  pt:`Twelve types can be confirmed with a gene test. Hypermobile EDS cannot yet, so doctors diagnose it from a careful examination.`,
  hook:`13 types, 12 with a known gene. hEDS is the exception: clinical diagnosis, no gene test. <sup class="c" data-ref="Malfait2017,Hakim2024GeneReviews" title="Source 199,291">199,291</sup>`}
].map((s,i)=>Object.assign({from:i/7,at:(i+.85)/7},s));
const TY_FLIP=[
 {f:'EDS type I (gravis) and type II (mitis)',b:`Classical EDS (cEDS). Mostly COL5A1 or COL5A2 variants. <sup class="c" data-ref="Malek2021,Symoens2012" title="Source 287,456">287,456</sup>`},
 {f:'EDS type III',b:`Hypermobile EDS (hEDS): Berlin type III = Villefranche hypermobility type = 2017 hEDS. <sup class="c" data-ref="Malek2021" title="Source 287">287</sup>`},
 {f:'EDS type IV (arterial-ecchymotic)',b:`Vascular EDS (vEDS), caused by COL3A1. <sup class="c" data-ref="Malek2021,Pepin2000" title="Source 287,363">287,363</sup>`},
 {f:'EDS type VI',b:`Kyphoscoliotic EDS, PLOD1 form (lysyl hydroxylase 1 deficiency). <sup class="c" data-ref="Yeowell2000" title="Source 512">512</sup>`},
 {f:'EDS type VIIA and VIIB',b:`Arthrochalasia EDS: exon 6 of COL1A1 or COL1A2. <sup class="c" data-ref="Byers1997" title="Source 66">66</sup>`},
 {f:'EDS type VIIC',b:`Dermatosparaxis EDS: ADAMTS2, the procollagen N-proteinase. <sup class="c" data-ref="Colige1999" title="Source 99">99</sup>`},
 {f:'Types V, IX, X and XI',b:`Dropped from EDS: X-linked type V, occipital horn syndrome (IX), fibronectin-deficient type X and familial hypermobility type XI. <sup class="c" data-ref="Malek2021" title="Source 287">287</sup>`},
 {f:'Joint hypermobility syndrome (Brighton criteria)',b:`Folded with Villefranche hEDS into the 2017 hEDS; people who do not meet the stricter criteria are diagnosed with hypermobility spectrum disorder. <sup class="c" data-ref="Tinkle2017,Castori2017,Carroll2023" title="Source 72,78,461">72,78,461</sup>`}
];

inits.types=()=>{
  const svg=$('#tySvg'),rg=$('#tyT');let mode='inh',setSt=()=>{};
  const T=(x,y,s,c='t-xs',st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INHC={AD:'var(--dx)',AR:'var(--gold)','AD/AR':'var(--accent)','AD*':'var(--muted)'};
  const TIS={skin:['skin','var(--skin-line)'],joints:['joints','var(--dx)'],vessels:['vessels and heart','var(--vas)'],eyes:['eyes','var(--nerve)'],muscle:['muscle','var(--muscle)'],teeth:['teeth and gums','var(--gold)'],bones:['bones','var(--bone-line)']};
  const col=r=>mode==='inh'?INHC[r.inh]:TIS[r.tis][1];
  function leg(){$('#tyLeg').innerHTML=mode==='inh'
    ?`<span><i style="background:var(--dx)"></i>autosomal dominant (AD)</span><span><i style="background:var(--gold)"></i>autosomal recessive (AR)</span><span><i style="background:var(--accent)"></i>either</span><span><i style="background:var(--muted)"></i>hEDS: dominant pattern, no gene</span>`
    :Object.values(TIS).map(v=>`<span><i style="background:${v[1]}"></i>${v[0]}</span>`).join('')}
  function leaf(x,y,w,h,L,a,hot,N){const r=TY_ROWS[L.k],c=col(r),dash=L.k==='hEDS'||r.post;let s=`<g style="opacity:${f1(.13+.87*a)}">`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="7" style="fill:var(--panel);stroke:${c};stroke-width:${hot?2.2:1.3}${dash?';stroke-dasharray:4 3':''}"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y+4)}" width="4.5" height="${h-8}" rx="2" style="fill:${c}"/>`;
    s+=T(x+10,y+15,r.ab,'t-lbl');
    L.gl.forEach((g,i)=>s+=T(x+10,y+28+i*11,g,'t-xs',i&&(L.k==='hEDS'||r.post||L.k==='cvEDS'||L.k==='aEDS')?'font-style:italic':''));
    const lab=r.inh==='AD*'?'AD?':r.inh,bw=lab.length>3?38:27,bx=N?x+9:x+w-bw-4,by=N?y+h-15:y+4;
    s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${bw}" height="12" rx="3" style="fill:${INHC[r.inh]}"/>`+T(bx+bw/2,by+9,lab,'t-xs t-mid','fill:var(--panel);font-weight:700;font-size:8.5px');
    if(L.k!=='hEDS')s+=`<path d="M${f1(x+w-14)} ${f1(y+h-10)}l3.5 4 6-8" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
    return s+'</g>'}
  function draw(t){
    const N=vb(svg,'720 380','400 670'),ph=phaseOf(TY_STEPS,t);
    const prog=g=>g<ph?1:g>ph?0:ramp(t,TY_STEPS[g].from,TY_STEPS[g].from+(1/7)*.8);
    let s='',shown=new Set();
    if(!N){
      s+=`<rect x="250" y="8" width="220" height="30" rx="9" style="fill:var(--brand);"/>`+T(360,27,'Ehlers-Danlos syndromes · 2017','t-sm t-mid','fill:var(--on-brand);font-weight:600');
      s+=`<path d="M360 38V48M${f1(20+97/2)} 48H${f1(20+6*97+97/2)}" style="fill:none;stroke:var(--line);stroke-width:1.4"/>`;
      TY_GRP.forEach((G,g)=>{const cx=20+g*97+97/2,a=prog(g),hot=g===ph;
        s+=`<path d="M${f1(cx)} 48V56" style="stroke:var(--line);stroke-width:1.4"/>`;
        G.w.forEach((l,i)=>s+=T(cx,66+i*11,l,'t-xs t-mid',hot?'fill:var(--ink);font-weight:700':''));
        TY_LEAF.filter(L=>L.g===g).forEach((L,i,arr)=>{const la=clamp(a*arr.length-i);if(la>0&&!L.again)shown.add(L.k);
          s+=leaf(20+g*97+3.5,104+i*52,90,46,L,la,hot&&la>0,false)})});
    }else{
      s+=`<rect x="110" y="6" width="180" height="26" rx="8" style="fill:var(--brand)"/>`+T(200,23,'EDS · 2017 classification','t-sm t-mid','fill:var(--on-brand);font-weight:600');
      let y=46;
      TY_GRP.forEach((G,g)=>{const a=prog(g),hot=g===ph,lv=TY_LEAF.filter(L=>L.g===g);
        s+=T(14,y+12,`${String.fromCharCode(65+g)} · ${G.n}`,'t-xs',hot?'fill:var(--ink);font-weight:700':'');
        lv.forEach((L,i)=>{const la=clamp(a*lv.length-i);if(la>0&&!L.again)shown.add(L.k);s+=leaf(14+i*75,y+18,70,58,L,la,hot&&la>0,true)});
        y+=86});
    }
    svg.innerHTML=s;setSt(ph);
    $('#tyNote').innerHTML=noteHTML(TY_STEPS[ph]);
    const n13=[...shown].filter(k=>k!=='clEDS2').length;
    rg.setAttribute('aria-valuetext',`${TY_STEPS[ph].t}: ${n13} of 13 types shown`);
  }
  const stop=playWire(rg,$('#tyPlay'),draw,16000,'Replay','types');
  setSt=stepWire($('#tySteps'),TY_STEPS,rg,draw,stop);
  $$('[data-tycol]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.tycol;$$('[data-tycol]').forEach(x=>x.setAttribute('aria-pressed',x===b));leg();draw(+rg.value)}));
  leg();draw(+rg.value);

  /* ---- comparator ---- */
  const KEYS=Object.keys(TY_ROWS),A=$('#tyA'),B=$('#tyB');
  const opt=KEYS.map(k=>`<option value="${k}">${TY_ROWS[k].ab} · ${TY_ROWS[k].name}</option>`).join('');
  A.innerHTML=opt;B.innerHTML=opt;A.value='cEDS';B.value='vEDS';
  const INH={AD:'Autosomal dominant',AR:'Autosomal recessive','AD/AR':'Dominant or recessive','AD*':'Dominant pattern; no gene known'};
  function card(k){const r=TY_ROWS[k];
    return `<div class="card tycard"><div class="tags"><span class="tag ${r.inh==='AR'?'warn':r.inh==='AD'?'dx':''}">${INH[r.inh]}</span>${k==='hEDS'?'<span class="tag">Clinical diagnosis</span>':'<span class="tag good">Molecular confirmation</span>'}${r.post?'<span class="tag">After 2017</span>':''}</div>
      <h4>${r.name}</h4><dl class="kv"><div><dt>Gene(s)</dt><dd>${r.genes}</dd></div><div><dt>Pathway group</dt><dd>${TY_GRP[r.grp].n}</dd></div><div><dt>Main tissue</dt><dd>${TIS[r.tis][0]}</dd></div>
      <div><dt>${k==='clEDS'||r.post||k==='mEDS'||k==='mcEDS'||k==='cvEDS'?'Key features':'Major criteria'}</dt><dd>${r.maj}</dd></div><div><dt>How common</dt><dd>${r.freq}</dd></div><div><dt>Key risk</dt><dd>${r.risk}</dd></div></dl></div>`}
  function cmp(){$('#tyCmp').innerHTML=card(A.value)+card(B.value)}
  A.addEventListener('change',cmp);B.addEventListener('change',cmp);cmp();

  /* ---- sortable table ---- */
  const COLS=[{k:'ab',l:'Type'},{k:'genes',l:'Gene(s)'},{k:'inh',l:'Inheritance'},{k:'grp',l:'Pathway group'},{k:'tis',l:'Main tissue'},{k:'n',l:'How common'}];
  let sk='grp',dir=1;
  function tbl(){const rows=KEYS.map(k=>Object.assign({key:k},TY_ROWS[k])).sort((a,b)=>{const x=a[sk],y=b[sk];return (typeof x==='number'?x-y:String(x).localeCompare(String(y)))*dir||a.grp-b.grp});
    let h='<table><thead><tr>'+COLS.map(c=>`<th scope="col" aria-sort="${c.k===sk?(dir>0?'ascending':'descending'):'none'}"><button data-tysort="${c.k}">${c.l}</button></th>`).join('')+'</tr></thead><tbody>';
    rows.forEach(r=>{h+=`<tr class="${r.post?'post':''}"><th scope="row">${r.ab}<br><small style="font-weight:400;color:var(--muted)">${r.name}</small></th><td>${r.genes}</td><td>${r.inh==='AD*'?'AD pattern, no gene':r.inh}</td><td>${TY_GRP[r.grp].n}</td><td>${TIS[r.tis][0]}</td><td>${r.freq}</td></tr>`});
    $('#tyTbl').innerHTML=h+'</tbody></table>'}
  $('#tyTbl').addEventListener('click',e=>{const b=e.target.closest('[data-tysort]');if(!b)return;const k=b.dataset.tysort;if(k===sk)dir=-dir;else{sk=k;dir=1}tbl()});
  tbl();

  /* ---- old names to new: flip cards ---- */
  $('#tyFlip').innerHTML=TY_FLIP.map((c,i)=>`<div class="fc-wrap"><button class="fc" data-tyfl="${i}" aria-pressed="false" aria-label="${c.f}: turn the card over"><div class="face front"><small>Old name</small><p>${c.f}</p><small>Tap for the 2017 name</small></div><div class="face back"><small>Today</small><p>${c.b}</p></div></button></div>`).join('');
  $('#tyFlip').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('[data-tyfl]');if(!b)return;const on=!b.classList.contains('flip');b.classList.toggle('flip',on);b.setAttribute('aria-pressed',on)});
};
/* =============== 1.4 Inheritance & genetic testing =============== */
const GE_STEPS={
 ad:[
  {k:'Step 1 · the family',t:'An affected parent',
   txt:`Vascular, classical and hypermobile EDS are autosomal dominant: one changed copy of the gene is enough. <sup class="c" data-ref="Byers2025GeneReviews,Malfait2024GeneReviews" title="Source 68,293">68,293</sup> Here the grandfather (I-1) and two of his three children are affected. The father in generation II (II-2) has one changed copy (V) and one usual copy (+); his partner has two usual copies.`,
   pt:`Everyone has two copies of each gene, one from each parent. In a dominant type, one changed copy causes the condition.`,
   hook:`Autosomal dominant: affected people in every generation, males and females alike, passed on by either sex.`},
  {k:'Step 2 · copies',t:'Each parent passes on one copy',
   txt:`Each egg or sperm carries one of the parent's two copies, chosen by chance. The father's sperm carry V or + equally often; all of the mother's eggs carry +.`,
   pt:`It is like a coin toss for each child: heads, the changed copy; tails, the usual one.`},
  {k:'Step 3 · the children',t:'A 50% chance for each child',
   txt:`Two of the four boxes contain V, so each child of an affected parent has a 50% chance of inheriting the variant. <sup class="c" data-ref="Malfait2024GeneReviews,Byers2025GeneReviews" title="Source 68,293">68,293</sup> The chance is the same for every pregnancy; press <b>Draw the children again</b> to see how one family can differ from the odds.`,
   pt:`Each child has a 1-in-2 chance, whatever happened with brothers or sisters before.`,
   hook:`Dominant: 50% per child, every pregnancy. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`},
  {k:'Step 4 · a new variant',t:'When neither parent is affected',
   txt:`About 50% of people with vEDS have an affected parent; in the other 50% the variant is new (de novo), arising in the person or coming from an apparently unaffected parent with mosaicism. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> The same 50:50 split is reported for cEDS. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup> So a negative family history does not exclude vEDS.`,
   pt:`Sometimes the change happens for the first time in a child. From then on, that person can pass it on.`,
   hook:`About half of vEDS is de novo: no family history does not mean no vEDS. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`},
  {k:'Step 5 · testing relatives',t:'Cascade testing',
   txt:`Once the family's variant is known, relatives can be tested for it. For vEDS, first-degree relatives are evaluated clinically and then, even without signs, tested for the familial COL3A1 variant. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> In a London cohort of 63 people diagnosed with vEDS before 18, 55% were found through family testing. <sup class="c" data-ref="Wilkinson2025" title="Source 506">506</sup> A known variant also makes prenatal and preimplantation testing possible. <sup class="c" data-ref="Byers2025GeneReviews,Malfait2024GeneReviews" title="Source 68,293">68,293</sup>`,
   pt:`Finding the exact change in one person lets the family check who else carries it.`,
   hook:`About 60% of people diagnosed with vEDS before 18 are found through a positive family history. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`}],
 ar:[
  {k:'Step 1 · the family',t:'Two healthy carriers',
   txt:`Kyphoscoliotic, dermatosparaxis, spondylodysplastic and most rare types are autosomal recessive: a person is affected only with two changed copies. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup> Here both parents in generation II carry one changed copy (v), shown half-shaded; nobody in the family has the condition yet.`,
   pt:`A carrier has one changed copy and one working copy. The working copy is enough, so carriers are not affected.`,
   hook:`Autosomal recessive: affected children usually have unaffected carrier parents; the condition can seem to appear from nowhere.`},
  {k:'Step 2 · copies',t:'Each parent passes on one copy',
   txt:`Each parent's eggs or sperm carry either v or + by chance, so a child can receive two, one or no changed copies.`,
   pt:`Both parents toss a coin. A child is affected only if both coins come up with the changed copy.`},
  {k:'Step 3 · the children',t:'25% affected, 50% carriers',
   txt:`When both parents are carriers, each child has a 25% chance of being affected, a 50% chance of being a carrier and a 25% chance of neither. <sup class="c" data-ref="RohrbachGR-kEDS,vanDijkGR-clEDS,KoshoGR-mcEDS" title="Source 250,390,481">250,390,481</sup> The chances are the same for every pregnancy.`,
   pt:`One in four children affected, two in four carriers like the parents, one in four with two working copies.`,
   hook:`Recessive: 25% affected, 50% carrier, 25% neither, when both parents are carriers. <sup class="c" data-ref="RohrbachGR-kEDS" title="Source 390">390</sup>`},
  {k:'Step 4 · related parents',t:'Carriers in the same family',
   txt:`Two carriers of the same rare variant are more likely to meet when the parents are related. Van Dijk and colleagues note that recessive types may be more common where consanguinity is more frequent, and that recorded numbers for rare types are probably too low. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
   pt:`Cousins can share the same family gene change, so recessive conditions show up more often when relatives have children together.`},
  {k:'Step 5 · testing relatives',t:'Testing brothers, sisters and partners',
   txt:`Once both variants are known, relatives can learn whether they are carriers. For PLOD1-kEDS, a markedly raised ratio of urinary deoxypyridinoline to pyridinoline cross-links can confirm the diagnosis when genetic testing finds only one variant or a variant of uncertain significance. <sup class="c" data-ref="RohrbachGR-kEDS" title="Source 390">390</sup>`,
   pt:`A sibling who is a carrier will not have the condition, but may want to know before having children.`,
   hook:`PLOD1-kEDS: a raised urinary LP/HP ratio can settle a single-variant or VUS result. <sup class="c" data-ref="RohrbachGR-kEDS,Giunta2008" title="Source 182,390">182,390</sup>`}],
 h:[
  {k:'Step 1 · the family',t:'A dominant pattern, no known gene',
   txt:`GeneReviews describes hEDS as autosomal dominant with variable expression, and most people with hEDS have an affected parent. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> But no genetic, epigenetic or metabolomic cause has been found, so no test can confirm it. <sup class="c" data-ref="Hakim2024GeneReviews,Malfait2020" title="Source 199,292">199,292</sup>`,
   pt:`hEDS tends to run in families like a dominant condition, but the gene or genes behind it are not yet known.`,
   hook:`hEDS is the only one of the 13 types without a known gene; diagnosis is clinical. <sup class="c" data-ref="Malfait2017,Hakim2024GeneReviews" title="Source 199,291">199,291</sup>`},
  {k:'Step 2 · copies',t:'Copies we cannot name',
   txt:`Because no gene is known, the copies here are marked "?". Van Dijk and colleagues expect most people with hEDS not to have a single-gene cause and suggest it may be multifactorial. <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
   pt:`We cannot follow a single gene through this family, because nobody knows which gene, or genes, to follow.`},
  {k:'Step 3 · the children',t:'Each child: a 50% chance',
   txt:`Under the autosomal dominant description, each child of an affected parent has a 50% chance of inheriting the condition. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> How strongly it shows varies, even within one family.`,
   pt:`Children of a parent with hEDS have about a 1-in-2 chance of having it too, but it can be milder or stronger than in the parent.`,
   hook:`Family history is part of the hEDS criteria: Feature B is a first-degree relative who independently meets them. <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>`},
  {k:'Step 4 · subtle signs',t:'Variable expression',
   txt:`Recognising that a parent is affected often needs a detailed history and examination, because the parent's signs may be subtle (ringed). <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> In one clinic, family history was the only predictor of a good outcome after coordinated physiotherapy. <sup class="c" data-ref="AubryRozier2021" title="Source 20">20</sup>`,
   pt:`A parent may never have been diagnosed. Their signs can be mild and easy to miss.`},
  {k:'Step 5 · relatives',t:'Clinical assessment, not a gene test',
   txt:`Without a gene, relatives are assessed clinically, and prenatal or preimplantation genetic testing is not possible. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> At one US clinic, 47 of 178 people meeting the 2017 hEDS criteria (26.4%) had an alternative or additional diagnosis found by genetic testing, though referral bias may inflate this. <sup class="c" data-ref="Forghani2025" title="Source 167">167</sup>`,
   pt:`There is no test to check family members for hEDS; doctors examine them instead. A genetics review can still find another condition.`,
   hook:`No prenatal or preimplantation testing for hEDS: no gene to test. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup>`}]
};
const GE_PATH={
 a:{t:'Signs of vEDS, cEDS or a rare type',test:['Gene panel','(massively parallel','sequencing)'],
  txt:`For every type except hEDS, a definite diagnosis needs the causative variant. <sup class="c" data-ref="Malfait2017" title="Source 291">291</sup> In 177 unrelated people with EDS tested on a 12-gene panel, 28 pathogenic and 4 likely pathogenic variants were found; 7 were new diagnoses that changed the clinical picture, including aortopathy genes (TGFBR1/2, SMAD3). <sup class="c" data-ref="Weerakkody2016" title="Source 498">498</sup> For vEDS, the consensus recommends confirming a COL3A1 variant before applying the diagnosis. <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>`},
 b:{t:'A typical hEDS picture',test:['2017 clinical','criteria','(no gene test)'],
  txt:`hEDS is diagnosed with the 2017 clinical criteria; there is no gene test. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> Of 907 people referred to one clinic for suspected hEDS, 178 (19.6%) met the criteria, and 47 of those (26.4%) had an alternative or additional diagnosis found by genetic testing; the authors note referral bias may inflate this. <sup class="c" data-ref="Forghani2025" title="Source 167">167</sup> Features that suggest another condition send the path to a panel (dashed line).`},
 c:{t:'A relative has a known variant',test:['Test for the','family’s variant'],
  txt:`When the family's variant is known, relatives can be tested for that one variant. For vEDS, first-degree relatives are evaluated clinically and tested for the familial COL3A1 variant even without signs. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> In a London cohort, 55% of people diagnosed with vEDS before 18 were found through family testing. <sup class="c" data-ref="Wilkinson2025" title="Source 506">506</sup>`}
};
const GE_RES={
 p:{t:'Pathogenic or likely pathogenic',txt:`A pathogenic variant confirms the type and opens cascade testing for relatives and, if wanted, prenatal or preimplantation testing. <sup class="c" data-ref="Malfait2017,Byers2025GeneReviews,Malfait2024GeneReviews" title="Source 68,291,293">68,291,293</sup> In vEDS, confirming the variant and its nature helps families estimate risk. <sup class="c" data-ref="Pepin2014" title="Source 364">364</sup>`,
  pt:`The test found the cause. That answer also helps relatives.`},
 v:{t:'Variant of uncertain significance (VUS)',txt:`A VUS means "we don't know yet", not "this is the cause". In the 177-person panel study there were 22 VUS, 7 in aortopathy genes needing clinical follow-up. <sup class="c" data-ref="Weerakkody2016" title="Source 498">498</sup> Classifications change: COL3A1 glutamic acid-to-lysine variants moved from VUS to pathogenic. <sup class="c" data-ref="Ghali2019GenetMed" title="Source 181">181</sup> For PLOD1-kEDS, a urine cross-link test can help settle a VUS. <sup class="c" data-ref="RohrbachGR-kEDS" title="Source 390">390</sup>`,
  pt:`An uncertain result is not a diagnosis. It may be looked at again as more is learned.`},
 n:{t:'No variant found',txt:`A negative panel argues against the types it covers but cannot test for hEDS, which has no known gene. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> Gene choice matters: brittle cornea genes should be on connective-tissue panels <sup class="c" data-ref="Dhooge2021" title="Source 125">125</sup>, and exome sequencing helps when features overlap. <sup class="c" data-ref="Yang2022" title="Source 511">511</sup> Clinical assessment stays central. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
  pt:`Nothing was found in the genes tested. That is not the same as proving there is nothing.`},
 h:{t:'A clinical diagnosis',txt:`hEDS is confirmed or not by the 2017 criteria: Criterion 1, Criterion 2 and Criterion 3 must all be met. <sup class="c" data-ref="Malfait2017,Fairweather2025" title="Source 147,291">147,291</sup> People with symptomatic hypermobility who do not meet them are diagnosed with hypermobility spectrum disorder. <sup class="c" data-ref="Castori2017" title="Source 78">78</sup> See <a href="#criteria" data-go="criteria">The 2017 hEDS criteria</a>.`,
  pt:`The checklist is for a specialist assessment, not a home test.`}
};

inits.genes=()=>{
  const svg=$('#geSvg'),rg=$('#geT');let mode='ad',seed=3,setSt=()=>{};
  const T=(x,y,s,c='t-xs',st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const AL={ad:{f:['V','+'],m:['+','+']},ar:{f:['v','+'],m:['v','+']},h:{f:['?','+'],m:['+','+']}};
  const FAM={ad:{I1:1,I2:0,II1:0,II4:1,II2:1,II3:0},ar:{I1:.5,I2:0,II1:0,II4:.5,II2:.5,II3:.5},h:{I1:1,I2:0,II1:0,II4:1,II2:1,II3:0}};
  const status=(a,b)=>{const n=(a!=='+')+(b!=='+');return mode==='ar'?(n===2?1:n===1?.5:0):(n>=1?1:0)};
  function kids(){const r=rng(seed*97+(mode==='ar'?5:mode==='h'?9:1)),A=AL[mode];
    return [0,1,2,3].map(i=>{const a=A.f[r()<.5?0:1],b=A.m[r()<.5?0:1];return {a,b,s:status(a,b),sex:i%2?'f':'m'}})}
  function steps(){return GE_STEPS[mode].map((s,i)=>Object.assign({from:i/5,at:(i+.8)/5},s))}
  let ST=steps();
  function draw(t){
    const N=vb(svg,'720 400','400 690'),ph=phaseOf(ST,t),u=clamp((t-ST[ph].from)*5),K=kids(),F=FAM[mode],A=AL[mode];
    const X=x=>N?x-40:x,Y=y=>y;
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    /* pedigree lines */
    const ln=(d)=>`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    const P={I1:[200,70,'m'],I2:[280,70,'f'],II1:[80,170,'f'],II4:[150,170,'m'],II2:[230,170,'m'],II3:[320,170,'f']};
    const kx=[170,250,330,410];
    s+=ln(`M${X(213)} 70H${X(267)}M${X(240)} 70V120M${X(80)} 120H${X(240)}M${X(80)} 120V157M${X(150)} 120V157M${X(230)} 120V157M${X(243)} 170H${X(307)}`);
    if(mode==='ar'&&ph===3)s+=ln(`M${X(243)} 175H${X(307)}`);
    ['I','II','III'].forEach((g,i)=>s+=T(N?8:24,[74,174,284][i],g,'t-sm','fill:var(--ink);font-weight:700'));
    Object.entries(P).forEach(([k,p])=>{const sub=mode==='h'&&k==='I1'&&ph===3;s+=ped(X(p[0]),p[1],p[2],F[k],{proband:k==='II2'&&ph<2,r:13});
      if(sub)s+=`<circle cx="${X(p[0])}" cy="${p[1]}" r="21" style="fill:none;stroke:var(--variant);stroke-width:2;stroke-dasharray:4 3"/>`+T(X(p[0]),p[1]-26,'subtle signs?','t-xs t-mid','fill:var(--variant)');
      if(k==='II2'||k==='II3'){const al=k==='II2'?A.f:A.m;s+=T(X(p[0]),p[1]+30,al.join(' '),'t-sm t-mid','fill:var(--ink)')}});
    s+=T(X(275),N?150:152,mode==='ar'?'both carriers':mode==='h'?'father affected':'father affected','t-xs t-mid');
    /* children */
    const kA=ph<2?0:ph===2?u:1;
    if(kA>0){s+=ln(`M${X(275)} 170V225M${X(170)} 225H${X(410)}`);
      K.forEach((c,i)=>{const a=clamp(kA*4-i);if(a<=0)return;s+=`<g style="opacity:${f1(a)}">`+ln(`M${X(kx[i])} 225V267`)+ped(X(kx[i]),280,c.sex,c.s,{r:13})+T(X(kx[i]),310,c.a+' '+c.b,'t-sm t-mid','fill:var(--ink)')+'</g>'})}
    else s+=T(X(275),262,'generation III comes at step 3','t-xs t-mid');
    /* cascade testing badges */
    if(ph===4){const who=mode==='h'?['II1','II4','k0','k1','k2','k3']:['II1','II4','k0','k1','k2','k3'];
      who.forEach((w,i)=>{const a=clamp(u*7-i);if(a<=0)return;let x,y,st;
        if(w[0]==='k'){const c=K[+w[1]];x=kx[+w[1]];y=280;st=c.s}else{x=P[w][0];y=P[w][1];st=F[w]}
        const lab=mode==='h'?'exam':mode==='ar'?(st===1?'affected':st===.5?'carrier':'clear'):(st?'variant':'no variant');
        const good=mode==='h'?null:(st===0);
        s+=`<g style="opacity:${f1(a)}"><rect x="${f1(X(x)-26)}" y="${y+(w[0]==='k'?36:-38)}" width="52" height="14" rx="7" style="fill:${good===null?'var(--panel-2)':good?'var(--good-soft)':'var(--warn-soft)'};stroke:var(--line)"/>`+T(X(x),y+(w[0]==='k'?46:-28),lab,'t-xs t-mid','fill:var(--ink)')+'</g>'})}
    /* right panel (below on phones) */
    const px=N?24:490,py=N?350:40,pw=N?352:210;
    s+=`<rect x="${px-10}" y="${py-14}" width="${pw+20}" height="${N?330:350}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=T(px,py+4,['THE PARENTS','EACH PASSES ON ONE COPY','THE ODDS FOR EACH CHILD',mode==='ad'?'A NEW (DE NOVO) VARIANT':mode==='ar'?'RELATED PARENTS':'VARIABLE EXPRESSION','TESTING RELATIVES'][ph],'t-sm','fill:var(--ink);font-weight:600');
    const cs=N?60:58,gx=px+(N?110:56),gy=py+(N?62:58);
    if(ph<=2){
      /* Punnett square: rows = father's copies, columns = mother's */
      const hdr=ph>=1?(ph===1?ease(u):1):0;
      s+=T(gx-14,gy-24,'father ↓  mother →','t-xs t-end');
      for(let j=0;j<2;j++){
        const fx0=X(P.II2[0]),fy0=P.II2[1],tx=gx-18,ty=gy+cs*j+cs/2,mx0=X(P.II3[0]),my0=P.II3[1],tx2=gx+cs*j+cs/2,ty2=gy-12;
        if(hdr>0){s+=`<circle cx="${f1(lerp(fx0,tx,hdr))}" cy="${f1(lerp(fy0,ty,hdr))}" r="10" style="fill:var(--dx-soft);stroke:var(--dx)"/>`+T(lerp(fx0,tx,hdr),lerp(fy0,ty,hdr)+4,A.f[j],'t-sm t-mid','fill:var(--ink);font-weight:700');
          s+=`<circle cx="${f1(lerp(mx0,tx2,hdr))}" cy="${f1(lerp(my0,ty2,hdr))}" r="10" style="fill:var(--vas-soft);stroke:var(--vas)"/>`+T(lerp(mx0,tx2,hdr),lerp(my0,ty2,hdr)+4,A.m[j],'t-sm t-mid','fill:var(--ink);font-weight:700')}}
      for(let i=0;i<2;i++)for(let j=0;j<2;j++){const a=ph===2?clamp(u*5-(i*2+j)*.6):0,st=status(A.f[i],A.m[j]),x=gx+cs*j,y=gy+cs*i;
        s+=`<rect x="${x}" y="${y}" width="${cs}" height="${cs}" style="fill:${a>0?(st===1?'var(--warn-soft)':st===.5?'var(--gold-soft)':'var(--panel)'):'var(--panel)'};stroke:var(--line);stroke-width:1.2"/>`;
        if(a>0)s+=`<g style="opacity:${f1(a)}">`+T(x+cs/2,y+cs/2-2,A.f[i]+' '+A.m[j],'t-sm t-mid','fill:var(--ink);font-weight:700')+T(x+cs/2,y+cs/2+12,mode==='ar'?(st===1?'affected':st===.5?'carrier':'neither'):(st?'affected':'not'),'t-xs t-mid')+'</g>'}
      const oy=gy+cs*2+26;
      if(ph===2){const bars=mode==='ar'?[['affected',25,'var(--warn)'],['carrier',50,'var(--gold)'],['neither',25,'var(--muted)']]:[['inherits',50,'var(--warn)'],['does not',50,'var(--muted)']];
        bars.forEach((b,i)=>{const w=(pw-90)*b[1]/100*ramp(u,.3,.8);s+=T(px,oy+i*20+4,b[0],'t-xs')+`<rect x="${px+66}" y="${oy+i*20-5}" width="${f1(w)}" height="11" rx="2" style="fill:${b[2]}"/>`+(u>.5?T(px+70+w,oy+i*20+4,b[1]+'%','t-xs','fill:var(--ink);font-weight:700'):'')});
        const na=K.filter(c=>c.s===1).length,nc=K.filter(c=>c.s===.5).length;
        if(u>.8)s+=T(px,oy+(mode==='ar'?72:52),`this family: ${na} of 4 affected${mode==='ar'?', '+nc+(nc===1?' carrier':' carriers'):''}`,'t-xs','fill:var(--ink)')+T(px,oy+(mode==='ar'?86:66),'the odds start fresh for each child','t-xs')}
      else if(ph===1)s+=T(px,oy,'one copy from each parent, by chance','t-xs')+(mode==='h'?T(px,oy+15,'? = a gene no one has found yet','t-xs','fill:var(--variant)'):'');
      else s+=T(px,oy,mode==='ar'?'v = changed copy · + = usual copy':mode==='h'?'? = unknown gene(s)':'V = changed copy · + = usual copy','t-xs');
    }else if(ph===3){
      const cx=px+pw/2,cy=py+60;
      if(mode==='ad'){s+=ped(cx-30,cy,'m',0,{r:12})+ped(cx+30,cy,'f',0,{r:12})+ln(`M${cx-18} ${cy}H${cx+18}M${cx} ${cy}V${cy+38}`)+ped(cx,cy+52,'f',ramp(u,.2,.4)>0?1:0,{r:12});
        if(u>.3)s+=T(cx+20,cy+56,'★ new variant','t-xs','fill:var(--variant);font-weight:700');
        ['About 50% of people with vEDS','have an affected parent; in the','other 50% the variant is new, or','comes from a mosaic parent.','cEDS: the same 50:50 split.'].forEach((l,i)=>s+=T(px,cy+92+i*15,l,'t-xs'))}
      else if(mode==='ar'){s+=ped(cx-30,cy,'m',.5,{r:12})+ped(cx+30,cy,'f',.5,{r:12})+ln(`M${cx-18} ${cy-2}H${cx+18}M${cx-18} ${cy+3}H${cx+18}`);
        ['Double line = parents who are','related to each other.','Recessive types may be more','common where this is frequent,','and rare-type counts are','probably too low.'].forEach((l,i)=>s+=T(px,cy+40+i*15,l,'t-xs'))}
      else{['Signs can be subtle in a parent','and found only with a detailed','history and examination.','','Family history counts in the','criteria: a first-degree relative','who independently meets them','(Feature B).'].forEach((l,i)=>s+=T(px,py+34+i*15,l,'t-xs'))}
    }else{
      const L=mode==='ad'?['First-degree relatives: clinical','check, then a test for the','family’s variant, even without','signs.','','London: 55% of childhood vEDS','diagnoses came through','family testing.','','A known variant makes prenatal','and preimplantation testing','possible.']
        :mode==='ar'?['Brothers and sisters can learn','whether they are carriers.','Carriers are not affected.','','Partners can be tested if a','couple wants to know their','own chances.']
        :['No variant to test: relatives','are examined clinically.','','No prenatal or preimplantation','testing for hEDS.','','A genetics review can still find','a different condition.'];
      L.forEach((l,i)=>s+=T(px,py+30+i*15,l,'t-xs'));
    }
    svg.innerHTML=s;setSt(ph);
    $('#geNote').innerHTML=noteHTML(ST[ph]);
    const na=K.filter(c=>c.s===1).length;
    $('#geRead').innerHTML=`<span>pattern <b>${{ad:'autosomal dominant',ar:'autosomal recessive',h:'hEDS (no gene)'}[mode]}</b></span><span>chance per child <b>${mode==='ar'?'25% affected, 50% carrier':'50%'}</b></span>${ph>=2?`<span>this family <b>${na} of 4 affected</b></span>`:''}`;
  }
  const stop=playWire(rg,$('#gePlay'),draw,20000,'Replay','genes');
  function wire(){const o=$('#geSteps'),nu=o.cloneNode(false);o.replaceWith(nu);setSt=stepWire(nu,ST,rg,draw,stop)}
  $$('[data-gemode]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.gemode;$$('[data-gemode]').forEach(x=>x.setAttribute('aria-pressed',x===b));ST=steps();wire();draw(+rg.value)}));
  $('#geReroll').addEventListener('click',()=>{seed++;draw(+rg.value)});
  wire();draw(+rg.value);

  /* ---- decision tree ---- */
  const tr=$('#geTree');let gp='a',gr='p';
  function box(x,y,w,h,lines,on,dash,cls){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="9" style="fill:${on?'var(--accent-soft)':'var(--panel)'};stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?2:1.2}${dash?';stroke-dasharray:5 3':''};opacity:${on?1:.75}"/>`;
    lines.forEach((l,i)=>s+=T(x+w/2,y+h/2+4+(i-(lines.length-1)/2)*13,l,(cls||'t-xs')+' t-mid',on?'fill:var(--ink);font-weight:700':''));return s}
  const arw=(x1,y1,x2,y2,on,dash)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="fill:none;stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?2.2:1.3}${dash?';stroke-dasharray:5 3':''}" marker-end="url(#geTA${on?1:0})"/>`;
  const RL={p:['Pathogenic /','likely pathogenic'],v:['Uncertain','(VUS)'],n:['No variant','found']};
  function drawTree(){const N=vb(tr,'720 300','400 300');let s=`<defs>${marker('geTA1','var(--accent)')}${marker('geTA0','var(--line)')}</defs>`;
    const keys=['a','b','c'],OPT={a:['Signs of vEDS, cEDS','or a rare type'],b:['A typical','hEDS picture'],c:['A relative has','a known variant']};
    if(!N){s+=box(250,8,220,34,['Who is being assessed?'],true,false,'t-sm');
      keys.forEach((k,i)=>{const cx=120+i*240,on=gp===k;s+=arw(360,42,cx,72,on)+box(cx-100,74,200,40,OPT[k],on)+arw(cx,114,cx,140,on)+box(cx-100,142,200,48,GE_PATH[k].test,on,k==='b')});
      if(gp==='b')s+=arw(320,166,226,166,true,true)+T(272,158,'other features?','t-xs t-mid','fill:var(--accent)');
      const src=gp==='b'?null:(gp==='a'?120:600);
      ['p','v','n'].forEach((r,i)=>{const cx=170+i*190,on=src!=null&&gr===r;if(src!=null)s+=arw(src,190,cx,232,on);s+=box(cx-80,234,160,44,RL[r],on)});
      if(gp==='b')s+=box(250,234,220,44,['Clinical diagnosis','(criteria met or not)'],true);
    }else{s+=box(100,6,200,30,['Who is being assessed?'],true,false,'t-sm');
      keys.forEach((k,i)=>{const on=gp===k;s+=box(20+i*124,52,112,44,OPT[k],on)+arw(200,36,76+i*124,50,on)});
      const ci=keys.indexOf(gp);s+=arw(76+ci*124,96,200,128,true)+box(100,130,200,52,GE_PATH[gp].test,true,gp==='b');
      if(gp==='b'){s+=box(100,212,200,44,['Clinical diagnosis','(criteria met or not)'],true)+arw(200,182,200,210,true);
        s+=T(200,286,'other features? → gene panel','t-xs t-mid','fill:var(--accent)')}
      else ['p','v','n'].forEach((r,i)=>{const on=gr===r;s+=arw(200,182,76+i*124,222,on)+box(20+i*124,224,112,44,RL[r],on)});
    }
    tr.innerHTML=s;
    const R=gp==='b'?GE_RES.h:GE_RES[gr],Pth=GE_PATH[gp];
    $('#geTreeNote').innerHTML=noteHTML({k:Pth.t,t:R.t,txt:Pth.txt+'</p><p>'+R.txt,pt:R.pt,hook:gp==='b'?`hEDS is the only type diagnosed without molecular confirmation. <sup class="c" data-ref="Malfait2017" title="Source 291">291</sup>`:null});
  }
  $$('[data-gep]').forEach(b=>b.addEventListener('click',()=>{gp=b.dataset.gep;$$('[data-gep]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawTree()}));
  $$('[data-ger]').forEach(b=>b.addEventListener('click',()=>{gr=b.dataset.ger;$$('[data-ger]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawTree()}));
  drawTree();

  /* ---- vEDS variant classes ---- */
  const ic=$('#geIcons');let cl='all';
  const CL=[{k:'gly',n:71,l:'glycine substitution',c:'var(--variant)'},{k:'spl',n:36,l:'splice-site or in-frame',c:'var(--vas)'},{k:'hap',n:7,l:'null (haploinsufficient)',c:'var(--accent)'},{k:'oth',n:4,l:'other missense in the helix',c:'var(--gold)'},{k:'oth',n:8,l:'change in an end region',c:'var(--dx)'}];
  const AGE=[{k:'spl',l:'splice / in-frame',m:30,a:21,b:45},{k:'gly',l:'glycine substitution',m:40.5,a:31,b:53.25},{k:'hap',l:'null (haploinsufficient)',m:53,a:43,b:58}];
  function drawIcons(){const N=vb(ic,'720 270','400 500');let s='';
    const cols=N?18:21,cz=N?19:15,x0=N?16:20,y0=30;
    s+=T(x0,16,'126 COL3A1 VARIANTS (FRENCH COHORT)','t-xs','fill:var(--ink);font-weight:600');
    let i=0;CL.forEach(c=>{for(let j=0;j<c.n;j++,i++){const x=x0+(i%cols)*cz,y=y0+Math.floor(i/cols)*cz,on=cl==='all'||cl===c.k;
      s+=`<rect x="${x}" y="${y}" width="${cz-3}" height="${cz-3}" rx="2.5" style="fill:${c.c};opacity:${on?1:.15}"/>`}});
    const ly=y0+Math.ceil(126/cols)*cz+16;
    CL.forEach((c,j)=>{const lx=x0+(N?(j%2)*180:0),yy=ly+(N?Math.floor(j/2):j)*15;s+=`<rect x="${lx}" y="${yy-8}" width="9" height="9" rx="2" style="fill:${c.c}"/>`+T(lx+14,yy,`${c.n} ${c.l}`,'t-xs',cl===c.k?'fill:var(--ink);font-weight:700':'')});
    /* age bars */
    const bx=N?16:380,by=N?ly+64:30,bw=N?300:300,Xa=v=>bx+bw*v/70;
    s+=T(bx,by-14,'MEDIAN AGE AT FIRST MAJOR EVENT (DUTCH COHORT)','t-xs','fill:var(--ink);font-weight:600');
    [0,20,40,60].forEach(v=>s+=`<line x1="${f1(Xa(v))}" x2="${f1(Xa(v))}" y1="${by}" y2="${by+150}" class="grid"/>`+T(Xa(v),by+164,v,'t-xs t-mid'));
    s+=T(bx+bw,by+178,'years','t-xs t-end');
    AGE.forEach((a,j)=>{const y=by+16+j*44,on=cl==='all'||cl===a.k,c=CL.find(q=>q.k===a.k).c;
      s+=T(bx,y,a.l,'t-xs',on?'fill:var(--ink);font-weight:700':'');
      s+=`<g style="opacity:${on?1:.25}"><line x1="${f1(Xa(a.a))}" x2="${f1(Xa(a.b))}" y1="${y+14}" y2="${y+14}" style="stroke:${c};stroke-width:3"/><rect x="${f1(Xa(0))}" y="${y+9}" width="${f1(Xa(a.m)-Xa(0))}" height="10" rx="2" style="fill:${c};opacity:.35"/><circle cx="${f1(Xa(a.m))}" cy="${y+14}" r="5" style="fill:${c};stroke:var(--panel);stroke-width:1.5"/></g>`+T(Xa(a.m)+8,y+4,a.m,'t-xs','fill:var(--ink);font-weight:700')});
    s+=`<line x1="${f1(Xa(41))}" x2="${f1(Xa(41))}" y1="${by+4}" y2="${by+144}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`+T(Xa(41)+4,by+150,'all: 41.0','t-xs','fill:var(--ink)');
    ic.innerHTML=s;
    const NT={all:{t:'Two ways a variant can act',txt:`Glycine substitutions were the commonest class (71 of 126), and glycine-substitution and splice-site variants were more severe than the rest; median age at first complication across the cohort was 29 years. <sup class="c" data-ref="Frank2015" title="Source 169">169</sup> In the Dutch cohort, 43 of 56 variants (76.8%) were predicted to act in a dominant-negative way, and men had more major events than women (odds ratio 3.61). <sup class="c" data-ref="Demirdas2024" title="Source 118">118</sup>`},
      gly:{t:'Glycine substitutions',txt:`A bulkier amino acid replaces a glycine in the Gly-X-Y repeat and the faulty chain is built into molecules with normal ones. Median age at first major event: 40.5 years (IQR 31.0–53.25). <sup class="c" data-ref="Demirdas2024" title="Source 118">118</sup> See <a href="#collagen" data-go="collagen">Collagen, gene to fibril</a>.`},
      spl:{t:'Splice-site and in-frame changes',txt:`These remove or alter a stretch of the chain. In the Dutch cohort they had the earliest median age at first major event: 30.0 years (IQR 21.0–45.0). <sup class="c" data-ref="Demirdas2024" title="Source 118">118</sup> In the French cohort they were among the more severe groups. <sup class="c" data-ref="Frank2015" title="Source 169">169</sup>`},
      hap:{t:'Null (haploinsufficient) variants',txt:`Less type III collagen is made, but no faulty chains. Median age at first major event: 53.0 years (IQR 43.0–58.0). <sup class="c" data-ref="Demirdas2024" title="Source 118">118</sup> In 54 people from 19 families, the first complication came almost 15 years later than with missense or exon-skipping variants, and only 28% of relatives had a complication. <sup class="c" data-ref="Leistritz2011" title="Source 262">262</sup>`},
      oth:{t:'Other missense and end-region changes',txt:`Non-glycine changes in the helix (4) and in the N- or C-terminal regions (8) were, with null variants, the milder groups: a less typical appearance and no digestive events. <sup class="c" data-ref="Frank2015" title="Source 169">169</sup> The Dutch study gave no separate age for them.`}};
    $('#geIconNote').innerHTML=noteHTML({k:'vEDS · COL3A1 variant classes',t:NT[cl].t,txt:NT[cl].txt,pt:`The exact spelling mistake in the gene matters: some kinds tend to cause problems earlier than others. These are averages for groups.`,hook:`Null COL3A1 variants delay the first complication by almost 15 years. <sup class="c" data-ref="Leistritz2011" title="Source 262">262</sup>`});
  }
  $$('[data-gecl]').forEach(b=>b.addEventListener('click',()=>{cl=b.dataset.gecl;$$('[data-gecl]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawIcons()}));
  drawIcons();
  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();drawTree();drawIcons()};
};
/* =============== 2.1 Beighton score =============== */
inits.beighton=()=>{
  const svg=$('#beSvg'),rg=$('#beT');

  /* ---- the illustrative adult: one value per side (degrees for limb items; the thumb is "folded" degrees) ----
     pass = 1 when that side reaches the published threshold. Total 7 of 9. */
  const ITEMS=[
    {k:'finger',n:'Little finger',thr:'≥ 90° back',sides:[{a:-100,p:1},{a:-94,p:1}],lim:-90,len:74,len2:52,w:10},
    {k:'thumb',n:'Thumb to forearm',thr:'touches the forearm',sides:[{a:171,p:1},{a:136,p:0}],len:96,len2:44,w:11},
    {k:'elbow',n:'Elbow',thr:'≥ 10° hyperextension',sides:[{a:-14,p:1},{a:-12,p:1}],lim:-10,len:92,len2:88,w:17},
    {k:'knee',n:'Knee',thr:'≥ 10° hyperextension',sides:[{a:-6,p:0},{a:-13,p:1}],lim:-10,len:98,len2:94,w:22},
    {k:'trunk',n:'Palms flat',thr:'palms flat, knees straight',sides:[{a:1,p:1}]}];
  const SEG=.17;
  const segOf=t=>Math.min(5,Math.floor(t/SEG+1e-9));
  /* progress of each side's sweep inside an item's segment */
  function sweep(i,t,side){const a=i*SEG,u=(t-a)/SEG;
    if(ITEMS[i].k==='trunk')return clamp(ramp(u,.08,.8));
    return side===0?ramp(u,.06,.44):ramp(u,.52,.9)}
  function state(t){const cells=ITEMS.map((it,i)=>it.sides.map((s,sd)=>{const p=sweep(i,t,sd);return p>=1?s.p:null}));
    let tot=0;cells.forEach(r=>r.forEach(c=>{if(c)tot++}));return {cells,tot}}

  const STEPS=[
    {from:0,at:.165,k:'Manoeuvre 1 · 2 points',t:'Little finger',
     txt:`The examiner bends the little finger back at the knuckle (the metacarpophalangeal joint), passively. Reaching 90° or more scores 1 point for that side; Malek's review words it as "beyond 90°", and the figure redrawn from the 2017 criteria gives "≥ 90°". Here both sides pass: 100° on the left, 94° on the right. This item had the lowest agreement between examiners in one three-phase study (kappa 0.60 or more, against above 0.80 for most items). <sup class="c" data-ref="Thwaites2022,Malek2021C,Malfait2017,Juul-Kristensen2007" title="Source 230,288,291,460">230,288,291,460</sup>`,
     pt:`The little finger is gently bent backwards. If it goes back to a right angle or further, that side scores a point.`,
     hook:`Beighton = 9 points from 5 manoeuvres: little finger, thumb, elbow and knee on each side (8), plus palms flat (1). <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>`},
    {from:.17,at:.335,k:'Manoeuvre 2 · 2 points',t:'Thumb to forearm',
     txt:`The thumb is pressed passively towards the flexor (palm-side) surface of the same forearm. A point is scored only if it touches. The left thumb folds flat against the forearm; the right stops with a gap, so the right side scores nothing. Only one plane of movement is tested, and the score says whether hypermobility is there, not how severe it is. <sup class="c" data-ref="Thwaites2022,Carroll2023,Malek2021C" title="Source 72,288,460">72,288,460</sup>`,
     pt:`Each side is scored on its own. One thumb can reach the arm while the other cannot.`,
     hook:`Thumb item = apposition of the thumb to the volar (flexor) forearm, scored left and right. <sup class="c" data-ref="Thwaites2022" title="Source 460">460</sup>`},
    {from:.34,at:.505,k:'Manoeuvre 3 · 2 points',t:'Elbow beyond straight',
     txt:`The elbow scores when it straightens 10° or more past a straight line (hyperextension). The dashed ray marks the 10° threshold. Ten degrees is hard to judge by eye: in children the score was shown valid "when goniometry is used", and with a structured protocol in degrees raters agreed within 5°. <sup class="c" data-ref="Thwaites2022,Carroll2023,Smits-Engelsman2011,Schlager2018" title="Source 72,418,438,460">72,418,438,460</sup>`,
     pt:`The arm is straightened. If it bends backwards past straight by a small but definite angle, it counts.`,
     hook:`Elbow and knee: ≥ 10° hyperextension, each side scored separately. <sup class="c" data-ref="Thwaites2022" title="Source 460">460</sup>`},
    {from:.51,at:.675,k:'Manoeuvre 4 · 2 points',t:'Knee beyond straight',
     txt:`The knee uses the same 10° rule. Here the left knee goes 6° past straight, which looks "very straight" but misses; the right reaches 13° and scores. Major joints such as the shoulders, hips and ankles are not scored at all, and two-thirds of the scored joints are in the upper limbs. <sup class="c" data-ref="Thwaites2022,Carroll2023,Malek2021C" title="Source 72,288,460">72,288,460</sup>`,
     pt:`A knee can look very straight and still miss the 10° mark. That is one reason careful measuring matters.`,
     hook:`The Beighton score does not test the shoulders, hips or ankles. <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>`},
    {from:.68,at:.845,k:'Manoeuvre 5 · 1 point',t:'Palms flat on the floor',
     txt:`With knees locked straight and feet together, the person bends forward until both palms rest flat on the floor: 1 point, the only unpaired item. It can be trained (as in ballet) and is limited by short hamstrings: in one study, 84.2% of over 200 hypermobile people (score 5 or more) could not do it. <sup class="c" data-ref="Thwaites2022,Carroll2023,Malek2021C" title="Source 72,288,460">72,288,460</sup>`,
     pt:`Bending to put both hands flat on the floor, without bending the knees, adds one point.`,
     hook:`Trunk flexion is the single 1-point item; the score runs 0 to 9. <sup class="c" data-ref="Thwaites2022" title="Source 460">460</sup>`},
    {from:.85,at:.97,k:'Total · compare with the cut-off',t:'7 of 9, then the age cut-off',
     txt:`This person scores 7. The 2017 hEDS criteria judge generalised joint hypermobility with a cut-off that falls with age: 6 or more for prepubertal children and adolescents, 5 or more from puberty to age 50, and 4 or more over 50. A score one point below the cut-off can still count if the five-part questionnaire is positive (2 or more "yes"). Open reproductions print the cut-offs as ">6, >5, >4" while others give "≥"; this guide follows the "≥" sources. <sup class="c" data-ref="Tofts2023,Fairweather2025,Thwaites2022,AubryRozier2021" title="Source 20,147,460,464">20,147,460,464</sup>`,
     pt:`Seven meets every age cut-off. But that only shows bendy joints. It is one part of three for hypermobile EDS, and many healthy people score this high.`,
     hook:`Cut-offs ≥6 / ≥5 / ≥4 by age. One point short + 5PQ ≥2 still meets Criterion 1. <sup class="c" data-ref="Thwaites2022,Tofts2023" title="Source 460,464">460,464</sup>`}];

  /* ---- drawing ---- */
  const badge=(x,y,p,r=11)=>p==null?'':`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${p?'var(--dx)':'var(--panel)'};stroke:${p?'var(--dx)':'var(--muted)'};stroke-width:1.5"/>`+
    (p?`<path d="M${f1(x-5)} ${f1(y)}l3.6 3.8l6.6-7.4" style="fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round"/>`:`<path d="M${f1(x-4.5)} ${f1(y)}h9" style="stroke:var(--muted);stroke-width:2;stroke-linecap:round"/>`);
  const N_W=()=>svg.dataset.mode==='n';
  function limbPanel(it,side,cx,cy,S,p){
    S=S*(N_W()?165:200)/(it.len+it.len2);
    const s=it.sides[side],flip=side===0,len=it.len*S,l2=it.len2*S,deg=s.a*ease(p);
    const j=flip?cx-(len-l2)/2:cx+(len-l2)/2;let g='';
    if(it.k==='finger'){/* the back of the hand behind the knuckle */
      const hx=flip?j:j-len;g+=`<rect x="${f1(hx-(flip?0:0))}" y="${f1(cy-3*S)}" width="${f1(len)}" height="${f1(22*S)}" rx="${f1(10*S)}" style="fill:var(--skin-epi);stroke:var(--skin-line);stroke-width:1.2;opacity:.85"/>`}
    if(it.k==='knee'){/* floor and heel support */}
    if(it.k==='thumb'){const L=limb(j,cy,len,deg,{len2:l2,w:it.w*S,arc:false,flip});g+=L.svg;
      const tipY=L.end[1],gap=Math.max(0,tipY-cy-(it.w*S)*.5-(it.w*S)*.5);
      g+=`<line x1="${f1(flip?j+8:j-8)}" x2="${f1(flip?j+len:j-len)}" y1="${f1(cy+it.w*S*.5+1)}" y2="${f1(cy+it.w*S*.5+1)}" style="stroke:var(--accent);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      if(p>.05){const txt=gap<6?'touches':'gap';g+=`<text x="${f1(L.end[0])}" y="${f1(Math.max(tipY,cy+it.w*S)+22)}" class="t-sm t-mid" style="fill:${gap<6?'var(--dx)':'var(--muted)'}">${txt}</text>`}
      return g}
    const L=limb(j,cy,len,deg,{len2:l2,w:it.w*S,limit:it.lim,flip});g+=L.svg;
    return g}
  function trunkPanel(cx,F,S,p){/* side view, facing right; bends at the hip */
    const hipY=F-104*S,th=ease(p)*Math.PI*.86,T=82*S;
    const sh=[cx+Math.sin(th)*T,hipY-Math.cos(th)*T];
    const head=[cx+Math.sin(th)*(T+17*S),hipY-Math.cos(th)*(T+17*S)];
    const reach=sh[1]+70*S,flat=reach>=F-4;const hand=[sh[0]+(flat?4*S:-4*S*Math.cos(th)),Math.min(F-4,reach)];
    let g=`<line x1="${f1(cx-110*S)}" x2="${f1(cx+130*S)}" y1="${f1(F)}" y2="${f1(F)}" style="stroke:var(--muted);stroke-width:2"/>`;
    const st=(a,b,w,c='var(--skin-epi)')=>`<path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" style="stroke:var(--skin-line);stroke-width:${f1(w+2.4)};stroke-linecap:round"/><path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" style="stroke:${c};stroke-width:${f1(w)};stroke-linecap:round"/>`;
    g+=st([cx,hipY],[cx,F-6*S],15*S)+`<path d="M${f1(cx-4*S)} ${f1(F-3*S)}h${f1(22*S)}" style="stroke:var(--skin-line);stroke-width:${f1(7*S)};stroke-linecap:round"/>`;
    g+=st([cx,hipY],sh,22*S)+`<circle cx="${f1(head[0])}" cy="${f1(head[1])}" r="${f1(12*S)}" style="fill:var(--skin-epi);stroke:var(--skin-line);stroke-width:1.2"/>`;
    g+=st(sh,hand,9*S);
    if(flat)g+=`<path d="M${f1(hand[0]-2*S)} ${f1(F-3)}h${f1(20*S)}" style="stroke:var(--dx);stroke-width:${f1(6*S)};stroke-linecap:round"/>`;
    /* straight-knee marker */
    g+=`<text x="${f1(cx-12*S)}" y="${f1(F-40*S)}" class="t-xs t-end">knees locked</text>`;
    return {svg:g,flat}}

  function draw(t){
    const N=vb(svg,'720 380','400 560');const i=segOf(t),st=state(t),it=ITEMS[Math.min(i,4)];
    const L=N?{sx:[100,300],sy:160,S:1,top:26,cap:78,sbx:16,sby:334,rh:34,cL:300,cR:352,tot:[200,548],W:400}
             :{sx:[120,340],sy:200,S:1,top:30,cap:92,sbx:478,sby:72,rh:44,cL:640,cR:690,tot:[594,330],W:720};
    let s='';
    /* scene */
    if(i<5){
      s+=`<text x="${N?16:20}" y="${L.top}" class="t-sm">MANOEUVRE ${i+1} OF 5</text><text x="${N?16:20}" y="${L.top+22}" class="t-big">${it.n}</text>`;
      s+=`<text x="${N?16:20}" y="${L.top+40}" class="t-xs">threshold: ${it.thr}${it.lim!=null?' (dashed ray)':''}</text>`;
      if(it.k==='trunk'){const p=sweep(i,t,0),T=trunkPanel(N?150:200,N?290:330,L.S*(N?1:1.05),p);s+=T.svg;
        s+=`<text x="${N?300:350}" y="${N?180:210}" class="t-lbl t-mid">${T.flat?'palms flat':'bending…'}</text>`+badge(N?300:350,N?204:236,st.cells[4][0]);}
      else [0,1].forEach(sd=>{const p=sweep(i,t,sd),cx=L.sx[sd];
        s+=`<g style="opacity:${p>0?1:.45}">${limbPanel(it,sd,cx,L.sy,L.S,p)}</g>`;
        const deg=Math.round(Math.abs(it.sides[sd].a*ease(p)));
        s+=`<text x="${cx}" y="${L.sy+(N?96:112)}" class="t-lbl t-mid">${sd?'Right':'Left'}<tspan class="t-sm" dx="6">${it.k==='thumb'?(p<=0?'waiting':''):(p>0?deg+'°':'waiting')}</tspan></text>`;
        s+=badge(cx,L.sy+(N?120:140),st.cells[i][sd])});
    }else{/* summary: ruler and cut-offs */
      const u=ramp(t,.86,.95),v=7*ease(u),x0=N?30:40,x1=N?370:430,ry=N?150:190,X=k=>lerp(x0,x1,k/9);
      s+=`<text x="${N?16:20}" y="${L.top}" class="t-sm">TOTAL</text><text x="${N?16:20}" y="${L.top+30}" style="font:400 30px var(--display);fill:var(--dx)">${Math.round(v)} of 9</text>`;
      const cuts=[{c:6,l:'≥6 child or adolescent'},{c:5,l:'≥5 puberty to 50'},{c:4,l:'≥4 over 50'}];
      cuts.forEach((c,k)=>{const yy=ry-26-k*22,on=v>=c.c-.01;
        s+=`<line x1="${f1(X(c.c))}" x2="${f1(X(9))}" y1="${yy}" y2="${yy}" style="stroke:${on?'var(--good)':'var(--line)'};stroke-width:6;stroke-linecap:round"/>`;
        s+=`<text x="${f1(X(c.c)-8)}" y="${yy+4}" class="t-xs t-end" style="${on?'fill:var(--good)':''}">${c.l}</text>`});
      s+=`<line x1="${x0}" x2="${x1}" y1="${ry}" y2="${ry}" class="axis" style="stroke:var(--muted);stroke-width:1.5"/>`;
      for(let k=0;k<=9;k++)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ry}" y2="${ry+7}" style="stroke:var(--muted)"/><text x="${f1(X(k))}" y="${ry+22}" class="t-sm t-mid">${k}</text>`;
      s+=`<path d="M${f1(X(v)-8)} ${ry+38}L${f1(X(v)+8)} ${ry+38}L${f1(X(v))} ${ry+28}Z" style="fill:var(--dx)"/>`;
      const lines=N?['7 meets every age cut-off','for generalised joint hypermobility.','That is Criterion 1 of 3 for hEDS:','not a diagnosis of EDS.']
                   :['7 meets every age cut-off for generalised joint hypermobility.','That is Criterion 1 of 3 for hEDS, not a diagnosis of EDS.'];
      if(u>.6)lines.forEach((l,k)=>s+=`<text x="${N?16:20}" y="${ry+70+k*18}" class="t-lbl" style="opacity:${f1(ramp(u,.6,1))}">${l}</text>`);
    }
    /* scoreboard */
    const B=L.sbx,Y=L.sby;
    s+=`<rect x="${B-8}" y="${Y-40}" width="${N?384:236}" height="${N?240:300}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${B}" y="${Y-18}" class="t-sm">SCOREBOARD</text><text x="${L.cL}" y="${Y-18}" class="t-sm t-mid">L</text><text x="${L.cR}" y="${Y-18}" class="t-sm t-mid">R</text>`;
    ITEMS.forEach((itm,k)=>{const yy=Y+k*L.rh,cur=k===i;
      s+=`<text x="${B}" y="${yy+4}" class="t-lbl" style="${cur?'fill:var(--dx)':''};font-size:${N?12:12.5}px">${itm.n}</text>`;
      const cell=(x,c)=>c==null?`<circle cx="${x}" cy="${yy}" r="11" style="fill:none;stroke:var(--line);stroke-width:1.5;stroke-dasharray:3 2"/>`:badge(x,yy,c);
      if(itm.sides.length===2)s+=cell(L.cL,st.cells[k][0])+cell(L.cR,st.cells[k][1]);
      else s+=cell((L.cL+L.cR)/2,st.cells[k][0]);});
    const ty=Y+5*L.rh+(N?8:12);
    s+=`<line x1="${B}" x2="${B+(N?370:222)}" y1="${ty-22}" y2="${ty-22}" style="stroke:var(--line)"/>`;
    s+=`<text x="${B}" y="${ty+4}" class="t-lbl">Total</text><text x="${(L.cL+L.cR)/2}" y="${ty+10}" class="t-mid" style="font:400 28px var(--display);fill:var(--dx)">${st.tot}<tspan class="t-sm" dx="3">/9</tspan></text>`;
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);setSt(p);
    const sideTxt=sd=>{if(i>=5||it.k==='trunk')return '';const pr=sweep(i,t,sd);return pr<=0?'—':it.k==='thumb'?(pr>=1?(it.sides[sd].p?'touches':'gap'):'folding'):Math.round(Math.abs(it.sides[sd].a*ease(pr)))+'°'};
    $('#beRead').innerHTML=i<5?`<span>Manoeuvre <b>${i+1} of 5 · ${it.n}</b></span>${it.k==='trunk'?`<span>Palms <b>${st.cells[4][0]==null?'bending':'flat'}</b></span>`:`<span>Left <b>${sideTxt(0)}</b></span><span>Right <b>${sideTxt(1)}</b></span>`}<span>Running total <b>${st.tot} / 9</b></span>`
      :`<span>Total <b>7 / 9</b></span><span>Cut-offs <b>≥6 · ≥5 · ≥4</b></span><span>Generalised hypermobility <b>met at every age</b></span>`;
    $('#beNote').innerHTML=noteHTML(STEPS[p]);
  }
  const stop=playWire(rg,$('#bePlay'),draw,20000,'Replay','beighton');
  const setSt=stepWire($('#beSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= teaching calculator ================= */
  const CI=[{k:'f',n:'Little finger',s:'bends back to 90° or more'},{k:'t',n:'Thumb',s:'touches the forearm'},
    {k:'e',n:'Elbow',s:'10° or more past straight'},{k:'k',n:'Knee',s:'10° or more past straight'}];
  const PQ=['Do you consider yourself double-jointed?',
    'Can you now (or could you ever) place your hands flat on the floor without bending your knees?',
    'Can you now (or could you ever) bend your thumb to touch your forearm?',
    'As a child, did you amuse your friends by contorting your body into strange shapes, or could you do the splits?',
    'As a child or teenager, did your shoulder or kneecap dislocate on more than one occasion?'];
  const saved=store.get('beCalc',null);
  const C=saved&&saved.c?saved:{c:{},pq:[0,0,0,0,0],age:'5',tab:'bs'};
  const btnTxt=(sd,on)=>`${on?'✓ ':''}${sd}${on?'':': no'}`;
  let gh=`<span class="kicker">Manoeuvre</span><span class="kicker">Left</span><span class="kicker">Right</span>`;
  CI.forEach(c=>{gh+=`<div class="lbl">${c.n}<small>${c.s}</small></div>`+['0','1'].map(sd=>{const id=c.k+sd,on=!!C.c[id];
    return `<button class="btn" data-bek="${id}" aria-pressed="${on}" aria-label="${c.n}, ${sd==='0'?'left':'right'}">${btnTxt(sd==='0'?'Left':'Right',on)}</button>`}).join('')});
  gh+=`<div class="lbl">Palms flat<small>knees straight, feet together</small></div><button class="btn span2" data-bek="p" aria-pressed="${!!C.c.p}" aria-label="Palms flat on the floor">${btnTxt('Trunk',!!C.c.p)}</button>`;
  $('#beGrid').innerHTML=gh;
  $('#bePq').innerHTML=PQ.map((q,k)=>`<button class="btn" data-bepq="${k}" aria-pressed="${!!C.pq[k]}"><b>Q${k+1}${C.pq[k]?' ✓':''}</b><span>${q}</span></button>`).join('');
  $('#beAge').value=C.age;
  const cs=$('#beCalcSvg');
  function calc(){
    const score=Object.keys(C.c).filter(k=>C.c[k]).length,cut=+C.age,pq=C.pq.reduce((a,b)=>a+b,0);
    store.set('beCalc',C);
    const N=vb(cs,'720 120','400 170');let s='';
    const x0=N?24:30,x1=N?376:450,ry=N?52:58,X=k=>lerp(x0,x1,k/9);
    s+=`<text x="${x0}" y="${N?16:18}" class="t-sm">BEIGHTON TOTAL</text>`;
    s+=`<rect x="${f1(X(cut)-((x1-x0)/18))}" y="${ry-14}" width="${f1(X(9)-X(cut)+(x1-x0)/18)}" height="14" rx="4" style="fill:var(--good-soft)"/>`;
    if(cut>0)s+=`<rect x="${f1(X(cut-1)-(x1-x0)/18)}" y="${ry-14}" width="${f1((x1-x0)/9)}" height="14" rx="4" style="fill:var(--warn-soft)"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${ry}" y2="${ry}" style="stroke:var(--muted);stroke-width:1.5"/>`;
    for(let k=0;k<=9;k++)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ry}" y2="${ry+6}" style="stroke:var(--muted)"/><text x="${f1(X(k))}" y="${ry+20}" class="t-sm t-mid" style="${k===score?'fill:var(--ink);font-weight:700':''}">${k}</text>`;
    s+=`<text x="${f1(X(cut))}" y="${ry-20}" class="t-xs t-mid" style="fill:var(--good)">cut-off ≥${cut}</text>`;
    s+=`<path d="M${f1(X(score)-8)} ${ry+38}L${f1(X(score)+8)} ${ry+38}L${f1(X(score))} ${ry+28}Z" style="fill:var(--dx)"/>`;
    const px=N?24:520,py=N?132:40;
    s+=`<text x="${px}" y="${N?py-14:18}" class="t-sm">5PQ "YES" ANSWERS</text>`;
    for(let k=0;k<5;k++){const cx=px+10+k*(N?30:34),on=k<pq;s+=`<circle cx="${cx}" cy="${py+12}" r="10" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:${k<2?'var(--dx)':'var(--muted)'};stroke-width:1.5"/>`}
    s+=`<text x="${px+(N?165:180)}" y="${py+16}" class="t-xs" style="${pq>=2?'fill:var(--good)':''}">${pq>=2?'positive (2+)':'2 needed'}</text>`;
    cs.innerHTML=s;
    let v,cls;
    if(score>=cut){cls='yes';v=`Score ${score} of 9 reaches the cut-off of ${cut}: the generalised joint hypermobility part (Criterion 1) of the 2017 hEDS criteria is met.`}
    else if(score===cut-1&&pq>=2){cls='yes';v=`Score ${score} is one point below ${cut}, and the questionnaire has ${pq} "yes" answers: under the 2017 rule this still meets Criterion 1.`}
    else if(score===cut-1){cls='maybe';v=`Score ${score} is one point below ${cut}. The 2017 rule lets a positive five-part questionnaire (2 or more "yes") count: open the 5PQ tab.`}
    else {cls='no';v=`Score ${score} is below the cut-off of ${cut}: Criterion 1 is not met on the Beighton score.`}
    const ageNote=cut===6?`<p>The paediatric working group proposes that children should not be assessed with the 2017 hEDS criteria, or diagnosed with hEDS, until they are biologically mature; it uses a score of 6 or more to define generalised hypermobility in children. <sup class="c" data-ref="Tofts2023" title="Source 464">464</sup></p>`:cut===4?`<p>Scores fall with age: in one dataset the chance of meeting the cut-off fell by 5.5% per year, which is why the cut-off drops after 50. <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup></p>`:'';
    const hist=score<cut-1&&pq>=2?`<p>A negative score on examination with a positive questionnaire is what the 2017 framework calls <b>historical</b> joint hypermobility. With symptoms, that can fit historical HSD: see <a href="#hsd" data-go="hsd">hEDS or HSD?</a> <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup></p>`:'';
    $('#beCalcNote').innerHTML=`<div class="kicker">Teaching calculator</div><div class="be-big"><span class="big-num">${score}</span><span>of 9 · cut-off ≥${cut} · 5PQ ${pq} of 5</span></div><div class="verdict ${cls}">${v}</div>${ageNote}${hist}
      <p>Generalised joint hypermobility on its own is common and is not a disease. A full hEDS assessment also needs Criteria 2 and 3: see <a href="#criteria" data-go="criteria">the 2017 hEDS criteria</a>. <sup class="c" data-ref="Castori2017,Fairweather2025" title="Source 78,147">78,147</sup></p>
      <div class="pt"><b>In plain words</b>This shows how the published rule adds up. It is not an examination and cannot tell you whether you have EDS or HSD; bring questions to a clinician.</div>`;
  }
  $('#beGrid').addEventListener('click',e=>{const b=e.target.closest('[data-bek]');if(!b)return;const id=b.dataset.bek;C.c[id]=!C.c[id];
    b.setAttribute('aria-pressed',C.c[id]);b.textContent=id==='p'?btnTxt('Trunk',C.c[id]):btnTxt(id[1]==='0'?'Left':'Right',C.c[id]);calc()});
  $('#bePq').addEventListener('click',e=>{const b=e.target.closest('[data-bepq]');if(!b)return;const k=+b.dataset.bepq;C.pq[k]=C.pq[k]?0:1;
    b.setAttribute('aria-pressed',!!C.pq[k]);b.querySelector('b').textContent=`Q${k+1}${C.pq[k]?' ✓':''}`;calc()});
  $('#beAge').addEventListener('change',e=>{C.age=e.target.value;calc()});
  $('#beReset').addEventListener('click',()=>{C.c={};C.pq=[0,0,0,0,0];
    $$('[data-bek]').forEach(b=>{b.setAttribute('aria-pressed','false');const id=b.dataset.bek;b.textContent=id==='p'?btnTxt('Trunk',false):btnTxt(id[1]==='0'?'Left':'Right',false)});
    $$('[data-bepq]').forEach((b,k)=>{b.setAttribute('aria-pressed','false');b.querySelector('b').textContent=`Q${k+1}`});calc()});
  function tab(k){C.tab=k;$$('[data-betab]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.betab===k));$('#bePaneBs').hidden=k!=='bs';$('#bePanePq').hidden=k!=='pq'}
  $$('[data-betab]').forEach(b=>b.addEventListener('click',()=>{tab(b.dataset.betab);calc()}));
  tab(C.tab||'bs');calc();

  /* ================= population icon array ================= */
  const POP=[
    {id:'c47',b:'Ages 4–7',sets:[{n:'Children aged 4–7',p:64.6}],cut:'Beighton ≥4',
     txt:`A review lists generalised joint hypermobility (score 4 or more) in 64.6% of children aged 4–7. Young children are the most flexible group. <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>`},
    {id:'c10',b:'Age 10',sets:[{n:'Children aged 10',p:35.6}],cut:'Beighton ≥4',
     txt:`At age 10 the same review lists 35.6%. Flexibility falls quickly through childhood. <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>`},
    {id:'c12',b:'Ages 12–13',sets:[{n:'Children aged 12–13',p:9.4}],cut:'Beighton ≥4',
     txt:`At ages 12–13 the review lists 9.4%. In 207 Swedish 11-year-olds the median score was 1, and 6 or more sat near the 95th percentile, which supports the paediatric cut-off of 6. <sup class="c" data-ref="Malek2021C,Glans2025" title="Source 186,288">186,288</sup>`},
    {id:'t13',b:'Ages 13–19',sets:[{n:'Teenagers 13–19',p:11.7}],cut:'Beighton ≥4',
     txt:`At ages 13–19 the review lists 11.7%. Studies differ in method and cut-off, so the steps between ages are rough. <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>`},
    {id:'uk',b:'UK 14-year-olds by sex',sets:[{n:'Girls',p:27.5},{n:'Boys',p:10.6}],cut:'Beighton ≥4',
     txt:`In 6,022 UK 14-year-olds (the ALSPAC cohort), 27.5% of girls and 10.6% of boys scored 4 or more. GJH is more common in females at every age, and the gap widens around 14. <sup class="c" data-ref="Clinch2011,Malek2021C" title="Source 98,288">98,288</sup>`},
    {id:'us',b:'US students 17–26 by sex',sets:[{n:'Women',p:36.7},{n:'Men',p:13.7}],cut:'Beighton ≥5',
     txt:`Among 267 US college students aged 17–26, with a cut-off of 5, 36.7% of women and 13.7% of men met generalised joint hypermobility (26.2% overall). <sup class="c" data-ref="Russek2016" title="Source 404">404</sup>`},
    {id:'o70',b:'Over 70',sets:[{n:'People over 70',p:0}],cut:'none scored above 2',
     txt:`In one population dataset the chance of meeting the cut-off fell by 5.5% for each extra year of age, and among 200 people over 70 nobody scored above 2. <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>`}];
  const SERIES=[{l:'4–7',p:64.6,id:'c47'},{l:'10',p:35.6,id:'c10'},{l:'12–13',p:9.4,id:'c12'},{l:'13–19',p:11.7,id:'t13'},{l:'>70',p:0,id:'o70'}];
  let pop='uk';
  $('#bePopBtns').innerHTML=`<span class="kicker">Population</span>`+POP.map(o=>`<button class="btn" data-bepop="${o.id}" aria-pressed="${o.id===pop}">${o.b}</button>`).join('');
  const ps=$('#bePopSvg');
  function drawPop(){const N=vb(ps,'720 300','400 560'),o=POP.find(q=>q.id===pop);let s='';
    const two=o.sets.length===2,cw=N?18:20,chh=N?21:23;
    o.sets.forEach((st,k)=>{const ox=N?(two?(k?208:12):100):(two?(k?236:16):16),oy=N?30:34,fill=Math.round(st.p);
      s+=`<text x="${ox}" y="${oy-12}" class="t-lbl">${st.n}</text>`;
      for(let r=0;r<10;r++)for(let c=0;c<10;c++){const idx=r*10+c,on=idx<fill;
        s+=person(ox+c*cw,oy+r*chh,N?16:18,on?'var(--dx)':'var(--line)')}
      s+=`<text x="${ox}" y="${oy+10*chh+22}" style="font:400 24px var(--display);fill:var(--dx)">${st.p}%</text><text x="${ox+(N?66:74)}" y="${oy+10*chh+20}" class="t-xs">≈ ${fill} in 100</text>`});
    if(!two&&!N){s+=`<text x="250" y="80" class="t-sm">${o.cut.toUpperCase()}</text><text x="250" y="122" style="font:400 40px var(--display);fill:var(--dx)">${o.sets[0].p}%</text>`;
      s+=`<text x="250" y="148" class="t-xs">about ${Math.round(o.sets[0].p)} in every 100</text>`}
    else s+=`<text x="${N?12:16}" y="${N?296:296}" class="t-xs">${o.cut}</text>`;
    /* review series by age */
    const gx=N?40:490,gy=N?330:40,gw=N?330:210,gh=N?190:200,bw=gw/SERIES.length;
    s+=`<text x="${gx-(N?28:10)}" y="${gy-12}" class="t-sm">REVIEW SERIES · BEIGHTON ≥4 BY AGE</text>`;
    [0,25,50,75].forEach(v=>{const y=gy+gh-gh*v/75;s+=`<line x1="${gx}" x2="${gx+gw}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${gx-4}" y="${f1(y+3)}" class="t-xs t-end">${v}%</text>`});
    SERIES.forEach((q,k)=>{const h=gh*q.p/75,x=gx+k*bw+bw*.18,on=q.id===pop;
      s+=`<rect x="${f1(x)}" y="${f1(gy+gh-h)}" width="${f1(bw*.64)}" height="${f1(Math.max(h,1.5))}" rx="3" style="fill:${on?'var(--dx)':'var(--dx-soft)'};stroke:var(--dx);stroke-width:${on?1.5:.6}"/>`;
      s+=`<text x="${f1(x+bw*.32)}" y="${f1(gy+gh-h-5)}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.p}</text><text x="${f1(x+bw*.32)}" y="${gy+gh+15}" class="t-xs t-mid">${q.l}</text>`});
    s+=`<text x="${gx+gw/2}" y="${gy+gh+32}" class="t-xs t-mid">age (years); ">70": nobody above 2</text>`;
    ps.innerHTML=s;
    $('#bePopNote').innerHTML=`<div class="kicker">${o.cut}</div><h4>${o.sets.map(q=>q.n+': '+q.p+'%').join(' · ')}</h4><p>${o.txt}</p><div class="pt"><b>In plain words</b>Being bendy is common, especially in children and girls, and on its own it is not a disease. <sup class="c" data-ref="Clinch2011,Castori2017" title="Source 78,98">78,98</sup></div><div class="hook"><b>Exam hook</b>Population statistics from different studies, cut-offs and methods: compare within a study, not across them. <sup class="c" data-ref="Malek2021C,Remvig2007" title="Source 288,378">288,378</sup></div>`}
  $('#bePopBtns').addEventListener('click',e=>{const b=e.target.closest('[data-bepop]');if(!b)return;pop=b.dataset.bepop;$$('[data-bepop]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.bepop===pop));drawPop()});
  drawPop();
  const prevR=redraws.beighton;redraws.beighton=()=>{prevR&&prevR();calc();drawPop()};
};
/* =============== 2.2 The 2017 hEDS criteria =============== */
inits.criteria=()=>{
  const svg=$('#crSvg'),rg=$('#crT');
  /* Feature A: short label for the animation, longer wording for the checklist */
  const A=[
    ['Soft skin','Unusually soft or velvety skin'],
    ['Skin stretch','Mild skin hyperextensibility','over 1.5 cm forearm or back of hand; over 3 cm neck, elbow, knee; over 1 cm palm'],
    ['Striae','Unexplained striae','back, groins, thighs, breasts or abdomen; no significant weight change'],
    ['Heel papules','Bilateral piezogenic papules of the heel'],
    ['Hernias','Recurrent or multiple abdominal hernias'],
    ['Atrophic scars','Atrophic scarring at 2 or more sites','not truly paper-thin or haemosiderotic'],
    ['Prolapse','Pelvic floor, rectal or uterine prolapse','only in children, men or nulliparous women, without other cause'],
    ['Palate, teeth','Dental crowding with a high or narrow palate'],
    ['Long fingers','Arachnodactyly','positive wrist or thumb sign on both sides'],
    ['Span ≥1.05','Arm span-to-height ratio ≥ 1.05'],
    ['MVP','Mitral valve prolapse','mild or greater on strict echo criteria'],
    ['Aortic root','Aortic root dilatation, Z-score above +2']];
  const CC=[['Pain in 2+ limbs','Musculoskeletal pain in two or more limbs, recurring daily for at least 3 months'],
    ['Widespread pain','Chronic widespread pain for 3 months or more'],
    ['Dislocations','Recurrent joint dislocations or frank joint instability without trauma']];
  const EX=[['No skin fragility','No unusual skin fragility'],
    ['No other CTD','Other heritable and acquired connective tissue disorders excluded','including autoimmune rheumatological conditions'],
    ['No alternative','Alternative diagnoses excluded','hypermobility from hypotonia or tissue laxity: neuromuscular disorders, other EDS types, Marfan, Loeys-Dietz, skeletal dysplasias']];
  const AFILL=[0,1,2,3,7];/* the illustrative person's five Feature A items, in the order they are found */

  const STEPS=[
    {from:0,at:.12,k:'The rule',t:'Three gates, all required',
     txt:`A diagnosis of hEDS needs Criterion 1, Criterion 2 and Criterion 3 all to be met. hEDS is the only one of the 13 types of the 2017 classification without a known gene, so no genetic test can confirm it; for every other type a definite diagnosis "relies on molecular confirmation". The 2017 consortium revised the hEDS criteria "to allow for a better distinction from other joint hypermobility disorders". <sup class="c" data-ref="Fairweather2025,Malfait2017,Yew2021" title="Source 147,291,513">147,291,513</sup>`,
     pt:`There is no blood or gene test for hypermobile EDS yet. Doctors use a three-part checklist, and every part has to be met.`,
     hook:`hEDS = Criterion 1 (GJH) + Criterion 2 (2 of Features A, B, C) + Criterion 3 (exclusions). <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>`},
    {from:.14,at:.31,k:'Gate 1 · Criterion 1',t:'Generalised joint hypermobility',
     txt:`The Beighton score is compared with an age cut-off: 6 or more for prepubertal children and adolescents, 5 or more from puberty to age 50, 4 or more over 50. Our illustrative adult, aged 26, scores 6, so the gate opens. A score one point below the cut-off also counts if the five-part questionnaire has 2 or more "yes" answers. See <a href="#beighton" data-go="beighton">Beighton score</a>. <sup class="c" data-ref="Tofts2023,Fairweather2025,Thwaites2022" title="Source 147,460,464">147,460,464</sup>`,
     pt:`The first check is whether joints in many parts of the body bend further than usual, judged against what is expected for the person's age.`,
     hook:`One point short + 5PQ ≥ 2 still passes Criterion 1. <sup class="c" data-ref="Thwaites2022" title="Source 460">460</sup>`},
    {from:.32,at:.5,k:'Gate 2 · Feature A',t:'Feature A: 5 of 12 systemic signs',
     txt:`Feature A looks for signs of a more generalised connective tissue disorder: skin, hernias, scars, prolapse, palate, long fingers, body proportions, heart valve and aortic root. At least 5 of the 12 are needed, and several carry conditions: striae count only at set sites and without significant weight change, and prolapse only in children, men or women who have never given birth. Here 5 cells fill, so Feature A is met. <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>`,
     pt:`Doctors check the skin, the mouth, the hands, body proportions and a heart scan for small signs that the body's connective tissue is different. Five of twelve are needed.`,
     hook:`Feature A threshold: ≥ 5 of 12 items. Heel piezogenic papules were added in 2017. <sup class="c" data-ref="Fairweather2025,AubryRozier2021" title="Source 20,147">20,147</sup>`},
    {from:.52,at:.66,k:'Gate 2 · Features B and C',t:'Two of A, B and C',
     txt:`Feature B is a first-degree relative who independently meets the current hEDS criteria. Feature C is musculoskeletal complications: daily pain in two or more limbs for at least 3 months, chronic widespread pain for 3 months or more, or recurrent atraumatic dislocations or instability. Criterion 2 needs any two of A, B and C; this person has all three, so the gate opens. <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>`,
     pt:`The second gate asks about body signs, close family and long-lasting pain or unstable joints. Two of these three are enough.`,
     hook:`Criterion 2 = 2 of 3 Features. Feature C needs only 1 of its 3 items. <sup class="c" data-ref="Thwaites2022" title="Source 460">460</sup>`},
    {from:.68,at:.86,k:'Gate 3 · Criterion 3',t:'Excluding other causes',
     txt:`Three exclusions must all hold: no unusual skin fragility (which should prompt consideration of other EDS types); other heritable and acquired connective tissue disorders excluded, including autoimmune rheumatological conditions; and alternative diagnoses that cause hypermobility through hypotonia or tissue laxity excluded, such as myopathic EDS, Bethlem myopathy, Marfan or Loeys-Dietz syndrome and osteogenesis imperfecta. Exclusion can rest on history, examination and molecular testing "as indicated". <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>`,
     pt:`Last, the doctor makes sure nothing else explains the picture, including other types of EDS that a gene test can find.`,
     hook:`With an acquired autoimmune disease (e.g. lupus), hEDS needs Features A and B; Feature C cannot count. <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>`},
    {from:.88,at:.98,k:'The exits',t:'All three met, and the other doors',
     txt:`This illustrative person meets all three criteria. The side exits matter as much: people with symptomatic hypermobility who miss Criterion 1 or 2 are described as having a hypermobility spectrum disorder, and unusual skin fragility at gate 3 points to genetic testing for other types. In a Swiss centre, 61 of 97 adults with symptomatic hypermobility met hEDS criteria and 36 were classed as HSD; at a US clinic only 18.3% of 2,695 adults met them. <sup class="c" data-ref="Castori2017,Fairweather2025,AubryRozier2021" title="Source 20,78,147">20,78,147</sup>`,
     pt:`Meeting the checklist gives the name hEDS. Missing it does not mean nothing is wrong: the name may be HSD, or a gene test may be the next step.`,
     hook:`Fail Criterion 2 with symptomatic GJH → generalised HSD. Skin fragility → think of other EDS types and test. <sup class="c" data-ref="Carroll2023,Fairweather2025" title="Source 72,147">72,147</sup>`}];

  const kf=[[0,0],[.1,1],[.28,1],[.36,2],[.62,2],[.68,3],[.82,3],[.94,4]];
  function tokP(t,G){const pts=[G.s,G.g[0]-30,G.g[1]-30,G.g[2]-30,G.e];
    for(let i=1;i<kf.length;i++)if(t<=kf[i][0]){const a=kf[i-1],b=kf[i],u=ease(ramp(t,a[0],b[0]));return lerp(pts[a[1]],pts[b[1]],u)}return G.e}
  const tick=(x,y,on,r=8)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:1.4"/>`+(on?`<path d="M${f1(x-r*.45)} ${f1(y)}l${f1(r*.32)} ${f1(r*.35)}l${f1(r*.6)} ${f1(-r*.68)}" style="fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/>`:'');
  function gate(N,pos,o,cross){/* two posts and a door swinging open by o (0..1) */
    let g='';const a=o*78*Math.PI/180;
    if(!N){const x=pos,y0=cross-24,y1=cross+24;
      g+=`<rect x="${x-3}" y="${y0-6}" width="6" height="6" rx="1" style="fill:var(--muted)"/><rect x="${x-3}" y="${y1}" width="6" height="6" rx="1" style="fill:var(--muted)"/>`;
      g+=`<line x1="${x}" y1="${y0}" x2="${f1(x+Math.sin(a)*48)}" y2="${f1(y0+Math.cos(a)*48)}" style="stroke:${o>=1?'var(--good)':'var(--dx)'};stroke-width:5;stroke-linecap:round"/>`}
    else{const y=pos,x0=cross-22,x1=cross+22;
      g+=`<rect x="${x0-6}" y="${y-3}" width="6" height="6" rx="1" style="fill:var(--muted)"/><rect x="${x1}" y="${y-3}" width="6" height="6" rx="1" style="fill:var(--muted)"/>`;
      g+=`<line x1="${x0}" y1="${y}" x2="${f1(x0+Math.cos(a)*44)}" y2="${f1(y+Math.sin(a)*44)}" style="stroke:${o>=1?'var(--good)':'var(--dx)'};stroke-width:5;stroke-linecap:round"/>`}
    return g}
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const G=N?{s:24,g:[134,360,494],e:546,cross:26,box:[[54,8,338,112],[54,146,338,200],[54,382,338,98]]}
             :{s:30,g:[111,360,611],e:700,cross:318,box:[[16,22,190,244],[222,22,276,244],[514,22,194,244]]};
    const o=[ramp(t,.26,.29),ramp(t,.61,.64),ramp(t,.79,.82)];
    const bs=Math.round(6*ease(ramp(t,.15,.26))),aN=Math.floor(clamp((t-.33)/.03,0,5)),bOn=t>=.55,cOn=t>=.59,exN=t>=.79?3:t>=.75?2:t>=.71?1:0;
    let s='';
    /* track */
    s+=N?`<line x1="${G.cross}" x2="${G.cross}" y1="10" y2="${G.e}" style="stroke:var(--line);stroke-width:10;stroke-linecap:round"/>`
        :`<line x1="20" x2="${G.e}" y1="${G.cross}" y2="${G.cross}" style="stroke:var(--line);stroke-width:10;stroke-linecap:round"/>`;
    /* boxes */
    const act=t<.32?0:t<.67?1:t<.87?2:3;
    G.box.forEach((b,i)=>s+=`<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" rx="12" style="fill:var(--field);stroke:${act===i?'var(--dx)':'var(--line)'};stroke-width:${act===i?1.6:1}"/>`);
    /* box 1: Beighton bar */
    {const [bx,by,bw]=G.box[0],x0=bx+14,x1=bx+bw-14,X=v=>lerp(x0,x1,v/9),yb=by+(N?62:86);
      s+=`<text x="${bx+14}" y="${by+22}" class="t-sm" style="fill:var(--dx)">GATE 1 · CRITERION 1</text><text x="${bx+14}" y="${by+(N?40:44)}" class="t-lbl">Generalised hypermobility</text>`;
      s+=`<rect x="${x0}" y="${yb-8}" width="${f1(x1-x0)}" height="16" rx="8" style="fill:var(--panel-2)"/>`;
      if(bs>0)s+=`<rect x="${x0}" y="${yb-8}" width="${f1(X(bs)-x0)}" height="16" rx="8" style="fill:var(--dx)"/>`;
      s+=`<line x1="${f1(X(5))}" x2="${f1(X(5))}" y1="${yb-14}" y2="${yb+14}" style="stroke:var(--good);stroke-width:2;stroke-dasharray:3 2"/>`;
      for(let k=0;k<=9;k+=3)if(!N||k!==6)s+=`<text x="${f1(X(k))}" y="${yb+(N?26:28)}" class="t-xs t-mid">${k}</text>`;
      s+=`<text x="${f1(X(5))}" y="${N?yb+26:yb-18}" class="t-xs t-mid" style="fill:var(--good)">≥5</text>`;
      if(!N){s+=`<text x="${bx+14}" y="${yb+56}" class="t-lbl">Beighton ${bs} of 9</text><text x="${bx+14}" y="${yb+74}" class="t-xs">age 26 → cut-off ≥5</text><text x="${bx+14}" y="${yb+90}" class="t-xs">or 1 short + 5PQ ≥2</text>`;
        s+=tick(bx+bw-26,yb+52,o[0]>=1,10)}
      else{s+=`<text x="${bx+bw-14}" y="${by+40}" class="t-sm t-end">${bs}/9 · age 26</text>`+tick(bx+bw-22,by+20,o[0]>=1,9)}}
    /* box 2: 12-cell grid and A, B, C */
    {const [bx,by,bw,bh]=G.box[1],cols=N?4:3,cw=(bw-28)/cols,ch=N?28:26,gx=bx+14,gy=by+(N?48:54);
      s+=`<text x="${bx+14}" y="${by+22}" class="t-sm" style="fill:var(--dx)">GATE 2 · CRITERION 2</text><text x="${bx+14}" y="${by+40}" class="t-lbl">Feature A: ${Math.min(aN,5)} of 5 needed</text>`;
      A.forEach((a,k)=>{const r=Math.floor(k/cols),c=k%cols,x=gx+c*cw,y=gy+r*(ch+4),ord=AFILL.indexOf(k),on=ord>=0&&ord<aN;
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(cw-4)}" height="${ch}" rx="5" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.4:1}"/>`;
        s+=`<text x="${f1(x+(cw-4)/2)}" y="${f1(y+ch/2+3.5)}" class="t-xs t-mid" style="font-size:8.6px;${on?'fill:var(--ink);font-weight:600':''}">${a[0]}</text>`});
      const py=gy+(12/cols)*(ch+4)+(N?18:16),pw=(bw-28)/3;
      [['A',aN>=5],['B',bOn],['C',cOn]].forEach(([l,on],k)=>{const x=gx+k*pw;
        s+=`<rect x="${f1(x)}" y="${f1(py-14)}" width="${f1(pw-6)}" height="26" rx="13" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:var(--dx);stroke-width:1.2"/>`;
        s+=`<text x="${f1(x+(pw-6)/2)}" y="${f1(py+4)}" class="t-lbl t-mid" style="fill:${on?'#fff':'var(--dx)'}">${l}${on?' ✓':''}</text>`});
      const sub=[['A','5+ of 12'],['B','relative'],['C','pain, instability']];
      if(!N)sub.forEach((q,k)=>s+=`<text x="${f1(gx+k*pw+(pw-6)/2)}" y="${f1(py+28)}" class="t-xs t-mid">${q[1]}</text>`);}
    /* box 3: exclusions */
    {const [bx,by,bw]=G.box[2];
      s+=`<text x="${bx+14}" y="${by+22}" class="t-sm" style="fill:var(--dx)">GATE 3 · CRITERION 3</text>`;
      if(!N)s+=`<text x="${bx+14}" y="${by+44}" class="t-lbl">Exclusions, all 3</text>`;
      EX.forEach((e,k)=>{const y=N?by+44+k*20:by+80+k*44;s+=tick(bx+24,y-4,k<exN,8)+`<text x="${bx+40}" y="${y}" class="t-lbl" style="font-size:${N?12:12.5}px;${k<exN?'':'fill:var(--muted)'}">${N?e[1].replace('Other heritable and acquired connective tissue disorders excluded','Other connective tissue disorders excluded'):e[0]}</text>`;
        if(!N)s+=`<text x="${bx+40}" y="${y+15}" class="t-xs">${['else think other types','incl. autoimmune','e.g. Marfan, myopathy'][k]}</text>`});}
    /* gates and exits */
    const ex=[['not hEDS','if not met'],['HSD?','if not met'],['gene tests','skin fragile']];
    G.g.forEach((p,i)=>{s+=gate(N,p,o[i],G.cross);
      const hi=t>=.88;
      if(!N){const x=p-30;s+=`<path d="M${x} ${G.cross+10}V${G.cross+34}" style="stroke:${hi?'var(--warn)':'var(--line)'};stroke-width:1.6;stroke-dasharray:3 3"/>`;
        s+=`<text x="${x}" y="${G.cross+50}" class="t-xs t-mid" style="${hi?'fill:var(--warn)':''}">${ex[i][1]} → ${ex[i][0]}</text>`}
      else s+=`<text x="${G.cross+30}" y="${p+4}" class="t-xs" style="${hi?'fill:var(--warn)':''}">${'gate '+(i+1)+' · '+ex[i][1]+' → '+ex[i][0]}</text>`});
    /* the end */
    if(t>=.9){const fin=ramp(t,.9,.96);
      s+=N?`<text x="${G.cross+24}" y="${G.e+6}" class="t-lbl" style="fill:var(--good);opacity:${f1(fin)}">All 3 met: hEDS criteria as published</text>`
          :`<text x="${G.e+6}" y="${G.cross-20}" class="t-lbl t-end" style="fill:var(--good);opacity:${f1(fin)}">all 3 met</text>`}
    /* token: the zebra */
    const p=tokP(t,G);s+=N?zebra(G.cross,p,13,{id:'crTok'}):zebra(p,G.cross,15,{id:'crTok'});
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);setSt(ph);
    $('#crRead').innerHTML=`<span>Gate 1 <b>${o[0]>=1?'open':'closed'}</b></span><span>Feature A <b>${Math.min(aN,5)}/12</b></span><span>A·B·C <b>${(aN>=5)+bOn+cOn} of 3</b></span><span>Gate 2 <b>${o[1]>=1?'open':'closed'}</b></span><span>Exclusions <b>${exN}/3</b></span><span>Gate 3 <b>${o[2]>=1?'open':'closed'}</b></span>`;
    $('#crNote').innerHTML=noteHTML(STEPS[ph]);
  }
  const stop=playWire(rg,$('#crPlay'),draw,22000,'Replay','criteria');
  const setSt=stepWire($('#crSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= the teaching checklist ================= */
  const ck=(attr,i,item)=>`<label class="cr-ck"><input type="checkbox" ${attr}="${i}"><span>${item[1]}${item[2]?`<small>${item[2]}</small>`:''}</span></label>`;
  $('#crA').innerHTML=A.map((a,i)=>ck('data-cra',i,a)).join('');
  $('#crC').innerHTML=CC.map((a,i)=>ck('data-crc',i,a)).join('');
  $('#cr3').innerHTML=EX.map((a,i)=>ck('data-cr3',i,a)).join('');
  const CASES={
    heds:{v:`<b>Ana, 26 · fictional</b>Beighton 6 of 9. Soft, velvety skin; forearm skin stretches 2 cm; stretch marks on the lower back with no weight change; heel papules on both feet; crowded teeth with a high, narrow palate. Her mother has been assessed and independently meets the criteria. Daily pain in both arms and both legs for two years. No unusual skin fragility, and other conditions have been excluded.`,
      c1:'met',a:[0,1,2,3,7],b:1,c:[0],ex:[1,1,1],ai:0},
    hsd:{v:`<b>Sam, 31 · fictional</b>Beighton 7 of 9. Stretch marks on the thighs with no weight change, and heel papules on both feet; no other Feature A signs. No first-degree relative has been assessed. Four dislocations of the same shoulder without injury. No unusual skin fragility, and other conditions have been excluded.`,
      c1:'met',a:[2,3],b:0,c:[2],ex:[1,1,1],ai:0},
    gen:{v:`<b>Leo, 22 · fictional</b>Beighton 5 of 9. Very stretchy, soft skin that splits after minor bumps, leaving wide, paper-thin scars on the shins and forehead (so they do not count as the hEDS scar item); he bruises easily. Daily knee and wrist pain for a year. No relatives assessed.`,
      c1:'met',a:[0,1],b:0,c:[0],ex:[0,1,1],ai:0},
    free:{v:`<b>Free mode</b>Tick the findings yourself. Remember that each item has a published definition, and that in real life a clinician examines, measures and excludes.`,
      c1:'met',a:[],b:0,c:[],ex:[0,0,0],ai:0}};
  let cs='heds';
  function load(k){cs=k;const c=CASES[k];$('#crVig').innerHTML=c.v;$('#crC1').value=c.c1;
    $$('[data-cra]').forEach(x=>x.checked=c.a.includes(+x.dataset.cra));
    $$('[data-crc]').forEach(x=>x.checked=c.c.includes(+x.dataset.crc));
    $$('[data-cr3]').forEach(x=>x.checked=!!c.ex[+x.dataset.cr3]);
    $('#crB').checked=!!c.b;$('#crAI').checked=!!c.ai;
    $$('[data-crcase]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.crcase===k));evalCk()}
  const csv=$('#crCalcSvg');
  function evalCk(){
    const c1=$('#crC1').value,g1=c1!=='no',an=$$('[data-cra]').filter(x=>x.checked).length,Aok=an>=5,Bok=$('#crB').checked,
      cn=$$('[data-crc]').filter(x=>x.checked).length,ai=$('#crAI').checked,Cok=cn>=1&&!ai,ex=$$('[data-cr3]').map(x=>x.checked),
      nF=Aok+Bok+Cok,g2=ai?(Aok&&Bok):nF>=2,g3=ex.every(Boolean);
    $('#crACount').innerHTML=`Feature A: <b>${an} of 12</b> ticked · ${Aok?'met (5 or more)':'not met (5 needed)'}`;
    /* gate summary */
    const N=vb(csv,'720 110','400 130');let s='';const W=N?400:720,cw=W/3;
    [['1 · GJH',g1,c1==='pq'?'met via 5PQ rule':g1?'met':'not met'],['2 · A, B, C',g2,`${ai?'A+B needed':nF+' of 3 features'}`],['3 · Exclusions',g3,`${ex.filter(Boolean).length} of 3`]].forEach(([l,ok,sub],i)=>{
      const cx=cw*i+cw/2,cy=N?40:42;
      if(i)s+=`<path d="M${f1(cw*i-cw*.18)} ${cy}H${f1(cw*i+cw*.18)}" class="arrow" marker-end="url(#crAr)"/>`;
      s+=`<circle cx="${f1(cx)}" cy="${cy}" r="${N?18:20}" style="fill:${ok?'var(--good-soft)':'var(--bad-soft)'};stroke:${ok?'var(--good)':'var(--bad)'};stroke-width:2"/>`;
      s+=ok?`<path d="M${f1(cx-8)} ${cy}l5.5 6l10-11" style="fill:none;stroke:var(--good);stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`:`<path d="M${f1(cx-6)} ${cy-6}l12 12M${f1(cx+6)} ${cy-6}l-12 12" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
      s+=`<text x="${f1(cx)}" y="${cy+(N?36:40)}" class="t-lbl t-mid" style="font-size:${N?12:13}px">${l}</text><text x="${f1(cx)}" y="${cy+(N?52:58)}" class="t-xs t-mid">${sub}</text>`});
    csv.innerHTML=`<defs>${marker('crAr')}</defs>`+s;
    let cls,v,more='';
    if(!ex[0]){cls='maybe';v=`Criterion 3 is not met: unusual skin fragility. Under the 2017 criteria this should prompt consideration of other EDS types, which are confirmed by genetic testing.`;
      more=`<p>In classical EDS, skin hyperextensibility with atrophic scarring is the first major criterion, and fragile skin and easy bruising were among the commonest minor features in 75 genetically confirmed patients. See <a href="#differential" data-go="differential">Look-alikes &amp; red flags</a>. <sup class="c" data-ref="Fairweather2025,Malfait2017,Ritelli2020C" title="Source 147,291,385">147,291,385</sup></p>`}
    else if(!g1){cls='no';v=`Criterion 1 is not met, so the hEDS criteria are not met as published.`;
      more=`<p>If hypermobility is limited to some joints, to the hands and feet, or is reported only from the past, and causes symptoms, the 2017 framework describes localised, peripheral or historical HSD. <sup class="c" data-ref="Carroll2023,Castori2017" title="Source 72,78">72,78</sup></p>`}
    else if(!g2){cls='no';v=`Criterion 2 is not met (${ai?'with an autoimmune disease both A and B are needed':nF+' of the 3 features'}), so the hEDS criteria are not met as published.`;
      more=`<p>In the 2017 framework, symptomatic generalised hypermobility that does not meet the criteria for hEDS or another syndrome is described as generalised hypermobility spectrum disorder (G-HSD). Its main differential diagnosis is hEDS. <sup class="c" data-ref="Castori2017,Carroll2023" title="Source 72,78">72,78</sup></p>`}
    else if(!g3){cls='maybe';v=`Criteria 1 and 2 are met, but other causes have not all been excluded, so Criterion 3 is not yet met.`;
      more=`<p>Exclusion can rest on history, examination and molecular genetic testing "as indicated". <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup></p>`}
    else{cls='yes';v=`These findings meet all three of the 2017 criteria for hEDS as published.`;
      more=`<p>On a real person this would also need a clinician to confirm each finding by examination and, where needed, tests. ${ai?'Here Feature C was not counted because an autoimmune disease is present; Features A and B carried Criterion 2. ':''}<sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup></p>`}
    $('#crCalcNote').innerHTML=`<div class="kicker">${cs==='free'?'Free mode':'Worked example'} · teaching checklist</div><div class="cr-gates">
      <div>${g1?'✓':'✕'} <span><b>Criterion 1</b> ${g1?(c1==='pq'?'met by the one-point-short + 5PQ rule':'met'):'not met'}</span></div>
      <div>${g2?'✓':'✕'} <span><b>Criterion 2</b> A ${Aok?'✓':'✕'} · B ${Bok?'✓':'✕'} · C ${ai?'not counted':Cok?'✓':'✕'}</span></div>
      <div>${g3?'✓':'✕'} <span><b>Criterion 3</b> ${ex.filter(Boolean).length} of 3 exclusions</span></div></div>
      <div class="verdict ${cls}">${v}</div>${more}
      <div class="pt"><b>In plain words</b>This checklist is for learning how the rules fit together. It cannot tell anyone whether they have hEDS or HSD.</div>`}
  $('#crCases').addEventListener('click',e=>{const b=e.target.closest('[data-crcase]');if(b){stop();load(b.dataset.crcase)}});
  $('#m-criteria .cr-list').addEventListener('change',evalCk);
  $('#crMiss').addEventListener('click',e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',on);
    $('#m-criteria').classList.toggle('cr-show',on);$('#crMissList').hidden=!on});
  load('heds');
  const prevR=redraws.criteria;redraws.criteria=()=>{prevR&&prevR();evalCk()};
};
/* =============== 2.3 hEDS or HSD? =============== */
inits.hsd=()=>{
  const svg=$('#hsSvg'),rg=$('#hsT');let view='label';
  /* regions: wide (720x380) and narrow (400x560) rectangles [x,y,w,h] */
  const RW={jh:[10,10,470,360],asym:[22,58,136,300],hsd:[168,58,180,300],G:[178,104,160,58],P:[178,168,160,58],L:[178,232,160,58],H:[178,296,160,56],
    heds:[358,58,112,300],oth:[492,10,218,360],o1:[502,64,198,84],o2:[502,156,198,84],o3:[502,248,198,84]};
  const RN={jh:[6,6,388,384],asym:[16,46,368,60],hsd:[16,114,368,184],G:[24,142,174,72],P:[202,142,174,72],L:[24,218,174,72],H:[202,218,174,72],
    heds:[16,306,368,76],oth:[6,400,388,154],o1:[16,430,368,36],o2:[16,470,368,36],o3:[16,510,368,36]};
  const TXT={
    asym:['Asymptomatic','JH without','symptoms'],
    G:['G-HSD','generalised: GJH','on Beighton'],P:['P-HSD','peripheral: hands','and/or feet'],L:['L-HSD','localised: single','joints or groups'],H:['H-HSD','historical: 5PQ +,','Beighton negative'],
    heds:['hEDS','all 3 of the','2017 criteria'],
    o1:['12 other EDS types','each confirmed by','genetic testing'],o2:['Marfan, Loeys-Dietz','own criteria and','genes'],o3:['Myopathies, OI','neuromuscular and','skeletal conditions']};
  const CARE={asym:['Nothing to treat:','hypermobility alone','is not a disease']};

  const STEPS=[
    {from:0,at:.12,k:'Age 8 · no symptoms',t:'Joint hypermobility is a descriptor',
     txt:`Maya can do the splits and bend her thumbs to her forearms, and nothing hurts. Joint hypermobility on its own is a descriptor, not a diagnosis. Generalised joint hypermobility (GJH) involves 5 or more joints across all four limbs and the spine; localised hypermobility affects one or a few joints. In one review, 64.6% of children aged 4–7 met GJH. <sup class="c" data-ref="Carroll2023,Malek2021C" title="Source 72,288">72,288</sup>`,
     pt:`Being bendy is common, especially in children and girls, and on its own it is not a disease.`,
     hook:`Asymptomatic JH, HSD and hEDS lie on one spectrum, and a person may move between categories as symptoms change. <sup class="c" data-ref="Carroll2023,Malek2021C" title="Source 72,288">72,288</sup>`,
     lab:`None needed: asymptomatic generalised joint hypermobility. <sup class="c" data-ref="Castori2017" title="Source 78">78</sup>`,care:`Nothing to treat: hypermobility alone is common and is not a disease. <sup class="c" data-ref="Clinch2011,Castori2017" title="Source 78,98">78,98</sup>`},
    {from:.2,at:.32,k:'Age 14 · sprains and knee pain',t:'Generalised HSD',
     txt:`At 14 Maya has repeated ankle sprains and knee pain. HSD needs joint hypermobility plus at least one secondary musculoskeletal manifestation: trauma (macro- or microtrauma), chronic pain, disturbed proprioception, or traits such as flat feet, valgus deformities or mild scoliosis. With GJH on the Beighton score this is generalised HSD, whose main differential diagnosis is hEDS. The paediatric working group proposes that children should not be diagnosed with hEDS until biologically mature. <sup class="c" data-ref="Carroll2023,Castori2017,Tofts2023" title="Source 72,78,464">72,78,464</sup>`,
     pt:`Once flexible joints start causing problems, such as pain or repeated sprains, doctors may call it a hypermobility spectrum disorder.`,
     hook:`HSD = JH + ≥ 1 secondary musculoskeletal manifestation. G-HSD's main differential is hEDS. <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>`,
     lab:`Generalised HSD (children have their own paediatric framework, with 8 subgroups). <sup class="c" data-ref="Carroll2023,Tofts2023" title="Source 72,464">72,464</sup>`,
     care:`Driven by symptoms. In the Bendy Study of 119 children, education and positive messages about healthy exercise and self-management gave "significant benefit" for most. <sup class="c" data-ref="Bale2019" title="Source 25">25</sup>`},
    {from:.4,at:.52,k:'Elsewhere on the map',t:'The other three HSD subtypes',
     txt:`Not everyone's hypermobility is generalised. Peripheral HSD is limited to the hands and/or feet (and peripheral hypermobility may be a clue to vascular EDS). Localised HSD is hypermobility at single joints or groups, with a problem in the same region. Historical HSD is GJH reported on the five-part questionnaire with a negative Beighton score, as when people stiffen with age. Clinics apply these differently: one US clinic defines historical HSD as a score of zero with a positive 5PQ. <sup class="c" data-ref="Carroll2023,Fairweather2025" title="Source 72,147">72,147</sup>`,
     pt:`The HSD subtype says where the bendy joints are, or that they used to be bendy. It does not say how much someone is struggling.`,
     hook:`Four HSD subtypes: G (generalised), P (peripheral), L (localised), H (historical). <sup class="c" data-ref="Carroll2023,Castori2017" title="Source 72,78">72,78</sup>`,
     lab:`P-HSD, L-HSD or H-HSD; none has its own ICD-10 code. <sup class="c" data-ref="Carroll2023,Fairweather2025" title="Source 72,147">72,147</sup>`,
     care:`At a US clinic, people with localised or historical HSD reported more symptoms than controls on 62 of 100 items, much like HSD (58 of 100). <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>`},
    {from:.6,at:.74,k:'Age 22 · assessed as an adult',t:'Now the hEDS criteria are met',
     txt:`At 22 Maya meets all three 2017 criteria: generalised hypermobility, Features A (5 systemic signs), B (her mother meets the criteria) and C (daily limb pain), and no other cause. Her label changes from HSD to hEDS. Her body has not changed overnight, and studies so far find the two groups much alike: in a Swiss centre they differed on only 3 of 16 severity items. See <a href="#criteria" data-go="criteria">the 2017 hEDS criteria</a>. <sup class="c" data-ref="Fairweather2025,AubryRozier2021" title="Source 20,147">20,147</sup>`,
     pt:`Getting the hEDS name can matter a lot to people. But in studies so far, people with HSD and hEDS have needed much the same kind of help.`,
     hook:`hEDS vs HSD after coordinated physiotherapy: 56% vs 50% improved (no significant difference). <sup class="c" data-ref="AubryRozier2021" title="Source 20">20</sup>`,
     lab:`hEDS; one clinic codes it Q79.62 and HSD M35.7. <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>`,
     care:`Largely the same core approach so far. Exercise trials enrol hEDS and HSD together, and the Swiss authors propose treating them as one entity. <sup class="c" data-ref="AubryRozier2021,Spanhove2023,Susanne2025" title="Source 20,445,455">20,445,455</sup>`},
    {from:.8,at:.95,k:'A door to the right',t:'When it is another type',
     txt:`Some findings point off this map toward a heritable connective tissue disorder: arachnodactyly, a span-to-height ratio of 1.05 or more, unusually soft skin, skin stretch, piezogenic papules, atrophic scars, or mitral valve prolapse or aortic root dilatation. Unusual skin fragility excludes hEDS. The other 12 types are confirmed by finding the causative variant. Among 72 children referred for suspected EDS, 25% met clinical criteria for a type, and 22% of the rest later had a molecular diagnosis. <sup class="c" data-ref="Carroll2023,Fairweather2025,Malfait2017,Damseh2022" title="Source 72,111,147,291">72,111,147,291</sup>`,
     pt:`If the skin is very fragile, or a relative had a tear in a blood vessel, a gene test may find a different type of EDS.`,
     hook:`HSD and hEDS are diagnoses of exclusion against the other heritable types; those need molecular confirmation. <sup class="c" data-ref="Malfait2017,Castori2017" title="Source 78,291">78,291</sup>`,
     lab:`A type-specific diagnosis, such as classical or vascular EDS, after genetic testing. <sup class="c" data-ref="Malfait2017" title="Source 291">291</sup>`,
     care:`Type-specific: for vascular EDS the consensus recommends an emergency plan, blood pressure in the normal range and yearly imaging where feasible. <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>`}];

  const KF=[[0,'asym'],[.2,'asym'],[.27,'G'],[.6,'G'],[.67,'heds'],[1,'heds']];
  function spot(R,id,N){const r=R[id];if(id==='asym')return N?[r[0]+r[2]-34,r[1]+10]:[r[0]+r[2]/2,r[1]+r[3]-110];
    if(id==='heds')return N?[r[0]+r[2]-40,r[1]+18]:[r[0]+r[2]/2,r[1]+r[3]-110];
    return [r[0]+r[2]-24,r[1]+r[3]/2-15]}
  function maya(t,R,N){for(let i=1;i<KF.length;i++)if(t<=KF[i][0]){const a=spot(R,KF[i-1][1],N),b=spot(R,KF[i][1],N),u=ease(ramp(t,KF[i-1][0],KF[i][0]));
      return [lerp(a[0],b[0],u),lerp(a[1],b[1],u)]}return spot(R,'heds',N)}
  const ages=t=>t<.2?8:t<.27?Math.round(lerp(8,14,ramp(t,.2,.27))):t<.6?14:t<.67?Math.round(lerp(14,22,ramp(t,.6,.67))):22;
  function rect(r,o){return `<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="${o.rx||12}" style="fill:${o.fill||'none'};stroke:${o.st||'var(--line)'};stroke-width:${o.sw||1.2};${o.dash?'stroke-dasharray:5 4;':''}${o.op!=null?'opacity:'+o.op:''}"/>`}
  function lines(r,arr,o={}){const x=r[0]+10,y=r[1]+(o.dy||20);let s=`<text x="${x}" y="${y}" class="t-lbl" style="${o.col?'fill:'+o.col:''}">${arr[0]}</text>`;
    for(let k=1;k<arr.length;k++)s+=`<text x="${x}" y="${y+k*14}" class="t-xs" style="${o.subcol?'fill:'+o.subcol:''}">${arr[k]}</text>`;return s}
  function draw(t){
    const N=vb(svg,'720 380','400 560'),R=N?RN:RW,ph=phaseOf(STEPS,t),care=view==='care';
    const here=t<.24?'asym':t<.64?'G':'heds';let s='';
    s+=rect(R.jh,{fill:'var(--field)'})+`<text x="${R.jh[0]+12}" y="${R.jh[1]+22}" class="t-sm">JOINT HYPERMOBILITY · A DESCRIPTOR</text>`;
    s+=rect(R.oth,{fill:'var(--field)',dash:1})+`<text x="${R.oth[0]+12}" y="${R.oth[1]+22}" class="t-sm">JH AS PART OF ANOTHER SYNDROME</text>`;
    /* regions */
    const hot=id=>here===id||(id==='hsd'&&here==='G');
    s+=rect(R.asym,{fill:hot('asym')?'var(--dx-soft)':'var(--panel)',st:hot('asym')?'var(--dx)':'var(--line)'});
    s+=rect(R.hsd,{fill:'var(--panel)',st:here==='G'?'var(--dx)':'var(--line)'})+`<text x="${R.hsd[0]+10}" y="${R.hsd[1]+20}" class="t-lbl">HSD</text><text x="${R.hsd[0]+(N?50:10)}" y="${R.hsd[1]+(N?20:36)}" class="t-xs">JH + ≥1 musculoskeletal issue</text>`;
    const ghost=t>=.4&&t<.6?['P','L','H'][Math.min(2,Math.floor((t-.4)/.0667))]:null;
    ['G','P','L','H'].forEach(id=>{const on=here===id||ghost===id;s+=rect(R[id],{rx:8,fill:on?'var(--dx-soft)':'var(--panel-2)',st:on?'var(--dx)':'var(--line)',sw:on?1.6:1})+lines(R[id],TXT[id],{dy:18,col:on?'var(--dx)':''})});
    s+=rect(R.heds,{fill:here==='heds'?'var(--dx-soft)':'var(--panel)',st:here==='heds'?'var(--dx)':'var(--line)'})+lines(R.heds,TXT.heds,{col:here==='heds'?'var(--dx)':''});
    s+=lines(R.asym,care?CARE.asym:TXT.asym,{col:hot('asym')?'var(--dx)':''});
    const otherHot=t>=.82;
    ['o1','o2','o3'].forEach(id=>s+=rect(R[id],{rx:8,fill:otherHot&&id==='o1'?'var(--warn-soft)':'var(--panel)',st:otherHot&&id==='o1'?'var(--warn)':'var(--line)'})+(N?`<text x="${R[id][0]+10}" y="${R[id][1]+23}" class="t-lbl" style="font-size:12px">${TXT[id][0]}<tspan class="t-xs" dx="8">${TXT[id][1]} ${TXT[id][2]}</tspan></text>`:lines(R[id],TXT[id],{dy:24})));
    /* management overlay: one band across HSD and hEDS */
    if(care){const x0=R.hsd[0]-4,y0=N?R.hsd[1]-4:R.hsd[1]-4,w=N?R.hsd[2]+8:(R.heds[0]+R.heds[2])-x0+4,h=N?(R.heds[1]+R.heds[3])-y0+4:R.hsd[3]+8;
      s+=`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="14" style="fill:var(--accent-soft);opacity:.88;stroke:var(--accent);stroke-width:2;stroke-dasharray:6 4"/>`;
      const cx=R.hsd[0]+R.hsd[2]/2,cy=R.hsd[1]+R.hsd[3]/2+(N?8:0),L=['Shared core approach','for HSD and hEDS:','exercise and physio,','pain care, education','','improved after physio','hEDS 56% · HSD 50%'];
      L.forEach((l,k)=>s+=`<text x="${f1(cx)}" y="${f1(cy-52+k*(N?17:19))}" class="${k<2||k>5?'t-lbl':'t-sm'} t-mid" style="${k>5?'fill:var(--accent)':k<2?'':'fill:var(--ink)'}">${l}</text>`);}
    if(care&&N)s+=`<text x="${R.oth[0]+12}" y="${R.oth[1]+R.oth[3]-4}" class="t-xs" style="fill:var(--accent)">care: type-specific (e.g. vEDS plan)</text>`;
    if(care&&!N)s+=`<text x="${R.oth[0]+12}" y="${R.oth[1]+352}" class="t-xs" style="fill:var(--accent)">care: type-specific (e.g. vEDS plan)</text>`;
    /* ghost path to another type */
    if(otherHot){const a=spot(R,'heds',N),b=N?[R.o1[0]+R.o1[2]-30,R.o1[1]+4]:[R.o1[0]+R.o1[2]-34,R.o1[1]+R.o1[3]/2-15],u=ease(ramp(t,.82,.9));
      s+=`<path d="M${f1(a[0])} ${f1(a[1]+14)}Q${f1((a[0]+b[0])/2)} ${f1(Math.min(a[1],b[1])-(N?-30:40))} ${f1(b[0])} ${f1(b[1]+14)}" style="fill:none;stroke:var(--warn);stroke-width:1.6;stroke-dasharray:4 4" marker-end="url(#hsAr)"/>`;
      s+=`<g style="opacity:${f1(.25+.4*u)}">${person(lerp(a[0],b[0],u),lerp(a[1],b[1],u),28,'var(--warn)')}</g>`;
      s+=`<text x="${f1(N?b[0]-30:b[0]+18)}" y="${f1(N?b[1]-6:b[1]+48)}" class="t-xs t-mid" style="fill:var(--warn)">if skin fragile → test</text>`}
    /* Maya */
    const m=maya(t,R,N);
    s+=`<circle cx="${f1(m[0])}" cy="${f1(m[1]+14)}" r="19" style="fill:var(--panel);stroke:var(--dx);stroke-width:2"/>`+person(m[0],m[1],28,'var(--dx)');
    if(t<.2||t>.66||(t>.27&&t<.6)===false)s+=`<text x="${f1(m[0])}" y="${f1(m[1]+46)}" class="t-xs t-mid" style="fill:var(--dx);font-weight:600">Maya, ${ages(t)}</text>`;
    if(ghost){const gp=spot(R,ghost,N);s+=`<g style="opacity:.35">${person(gp[0],gp[1],28,'var(--dx)')}</g>`}
    svg.innerHTML=`<defs>${marker('hsAr','var(--warn)')}</defs>`+s;
    setSt(ph);const P=STEPS[ph];
    $('#hsRead').innerHTML=`<span>Maya <b>age ${ages(t)}</b></span><span>Region <b>${{asym:'asymptomatic JH',G:'generalised HSD',heds:'hEDS'}[here]}</b></span><span>Overlay <b>${care?'management':'label'}</b></span>`;
    $('#hsNote').innerHTML=noteHTML(P)+`<div class="kv"><div><dt>${care?'What changes in care':'The label'}</dt><dd>${care?P.care:P.lab}</dd></div><div><dt>${care?'The label':'What changes in care'}</dt><dd>${care?P.lab:P.care}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#hsPlay'),draw,22000,'Replay','hsd');
  const setSt=stepWire($('#hsSteps'),STEPS,rg,draw,stop);
  $$('[data-hsview]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.hsview;$$('[data-hsview]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ================= sorting game ================= */
  const BINS=[['asym','Asymptomatic JH'],['hsd','HSD'],['heds','hEDS'],['gen','Genetic testing']];
  const SUBS=[['G','Generalised'],['P','Peripheral'],['L','Localised'],['H','Historical']];
  const CASES=[
    {v:`A 9-year-old gymnast scores 7 of 9 on the Beighton score. She has no pain, no injuries and no other problems.`,a:'asym',
     why:`Hypermobility with no secondary musculoskeletal manifestation is asymptomatic joint hypermobility: a descriptor, not a diagnosis. Hypermobility is commonest in young children. <sup class="c" data-ref="Carroll2023,Malek2021C" title="Source 72,288">72,288</sup>`},
    {v:`A 28-year-old man scores 6 of 9, has had daily knee and shoulder pain for a year and recurrent ankle sprains. He has 2 Feature A signs, and no relative has been assessed.`,a:'hsd',s:'G',
     why:`Generalised hypermobility plus pain and injuries. Criterion 2 is not met (Feature A needs 5 signs, and there is no Feature B), so this is generalised HSD. <sup class="c" data-ref="Carroll2023,Fairweather2025" title="Source 72,147">72,147</sup>`},
    {v:`A 35-year-old scores 2 of 9 (both little fingers). Her fingers and toes are very lax and she has painful flat feet.`,a:'hsd',s:'P',
     why:`Hypermobility limited to the hands and feet, with a secondary manifestation (flat feet, pain), fits peripheral HSD. Peripheral hypermobility may also be a clue to vascular EDS, so the whole picture matters. <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>`},
    {v:`A 40-year-old violinist scores 1 of 9. One very lax shoulder slips partly out of joint when she plays.`,a:'hsd',s:'L',
     why:`Hypermobility at a single joint with a problem in the same region is localised HSD. <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>`},
    {v:`A 55-year-old scores 2 of 9 now (the cut-off over 50 is 4). He answers "yes" to 3 of the 5 questions about past flexibility and has chronic widespread pain.`,a:'hsd',s:'H',
     why:`A negative Beighton score with a positive five-part questionnaire is historical hypermobility; with pain it fits historical HSD. A score of 2 is two points short, so the one-point 5PQ rule for hEDS cannot apply. <sup class="c" data-ref="Carroll2023,Thwaites2022" title="Source 72,460">72,460</sup>`},
    {v:`A 26-year-old scores 7 of 9. She has 5 Feature A signs, her mother independently meets the hEDS criteria, she has had daily pain in her arms and legs for two years, and other causes have been excluded.`,a:'heds',
     why:`Criterion 1 (7 ≥ 5), Criterion 2 (Features A, B and C) and Criterion 3 are all met, so the 2017 hEDS criteria are met as published. <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>`},
    {v:`A 22-year-old scores 6 of 9. His skin is very stretchy and splits after minor bumps, leaving wide paper-thin scars; he bruises easily.`,a:'gen',
     why:`Unusual skin fragility excludes hEDS and should prompt consideration of other EDS types. Skin hyperextensibility with atrophic scarring is the first major criterion for classical EDS, which is confirmed by genetic testing. <sup class="c" data-ref="Fairweather2025,Ritelli2020C,Malfait2017" title="Source 147,291,385">147,291,385</sup>`},
    {v:`A 31-year-old has lax finger joints, thin translucent skin with visible veins and easy bruising. Her brother has been diagnosed with vascular EDS.`,a:'gen',
     why:`A family history of vascular EDS is one of the minimal criteria that should prompt COL3A1 testing; the international consensus recommends identifying the variant before applying the diagnosis. Small-joint hypermobility, easy bruising and thin translucent skin are vEDS minor criteria. <sup class="c" data-ref="Wang2026OJRD,Byers2017,Shalhub2020" title="Source 67,430,496">67,430,496</sup>`}];
  const ans=CASES.map(()=>({b:null,s:null}));
  function cardHTML(i){const c=CASES[i],A=ans[i];
    const binB=BINS.map(([k,l])=>`<button class="btn" data-hsbin="${i}:${k}" aria-pressed="${A.b===k}">${l}</button>`).join('');
    const subB=A.b==='hsd'&&c.a==='hsd'?`<div class="hs-sub"><span class="kicker">Subtype</span>${SUBS.map(([k,l])=>`<button class="btn" data-hssub="${i}:${k}" aria-pressed="${A.s===k}">${l}</button>`).join('')}</div>`:'';
    let fb='';
    if(A.b){if(A.b!==c.a)fb=`<div class="hs-fb bad"><b>Not quite.</b> ${c.why}</div>`;
      else if(c.a==='hsd'&&!A.s)fb=`<div class="hs-fb mid"><b>HSD is right.</b> Now pick the subtype.</div>`;
      else if(c.a==='hsd'&&A.s!==c.s)fb=`<div class="hs-fb bad"><b>HSD, but not that subtype.</b> ${c.why}</div>`;
      else fb=`<div class="hs-fb ok"><b>Yes.</b> ${c.why}</div>`}
    return `<span class="tag dx">Case ${i+1}</span><p class="v">${c.v}</p><div class="ctrls">${binB}</div>${subB}${fb}`}
  const box=$('#hsCards');
  box.innerHTML=CASES.map((c,i)=>`<div class="card" data-hscard="${i}"></div>`).join('');
  function render(i){$(`[data-hscard="${i}"]`,box).innerHTML=cardHTML(i)}
  function score(){const n=ans.filter((a,i)=>a.b===CASES[i].a&&(CASES[i].a!=='hsd'||a.s===CASES[i].s)).length;$('#hsScore').textContent=`${n} / 8`}
  CASES.forEach((c,i)=>render(i));score();
  box.addEventListener('click',e=>{const b=e.target.closest('[data-hsbin],[data-hssub]');if(!b)return;
    if(b.dataset.hsbin){const [i,k]=b.dataset.hsbin.split(':');ans[+i].b=k;ans[+i].s=null;render(+i)}
    else{const [i,k]=b.dataset.hssub.split(':');ans[+i].s=k;render(+i)}
    score()});
  $('#hsReset').addEventListener('click',()=>{ans.forEach(a=>{a.b=null;a.s=null});CASES.forEach((c,i)=>render(i));score()});

  /* ================= who gets which label ================= */
  const CO={
    mayo:{n:'US adult EDS clinic · 2,695 adults',parts:[['HSD',60.6,'var(--dx)'],['hEDS',18.3,'var(--chain-a)'],['Localised or historical HSD',10.7,'var(--dx-soft)'],['None of these',10.4,'var(--panel-2)']],
      txt:`At the Mayo Clinic Florida EDS clinic (November 2019 to August 2024), the 2017 criteria gave these diagnoses. Fewer than 1 in 5 people referred met the hEDS criteria. <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>`},
    swiss:{n:'Swiss reference centre · 97 adults',parts:[['hEDS',62.9,'var(--chain-a)'],['HSD',37.1,'var(--dx)']],
      txt:`In 97 adults with symptomatic hypermobility (median age 40, 92.7% women), 61 met hEDS criteria and 36 were classed as HSD. In the HSD group, 22% had another diagnosis that could confound the picture, such as psoriatic arthritis or Sjögren syndrome. <sup class="c" data-ref="AubryRozier2021" title="Source 20">20</sup>`},
    spain:{n:'Spanish paediatric genetics clinic · 41 children',parts:[['hEDS or HSD',61,'var(--dx)'],['Classical EDS',22,'var(--chain-c)'],['Vascular EDS',7.3,'var(--vas)'],['Other types',9.7,'var(--panel-2)']],
      txt:`In a paediatric genetics clinic (2018–2024), 61% were classified hEDS/HSD, 22% classical EDS, 7.3% vascular EDS and 9.7% other types. Clinical exome testing found the cause in every gene-defined type, but no clear candidate variant in the children compatible with hEDS/HSD. <sup class="c" data-ref="FozFelipe2025" title="Source 168">168</sup>`}};
  let co='mayo';const csv=$('#hsCoSvg');
  function drawCo(){const N=vb(csv,'720 150','400 210'),C=CO[co];let s='',x=N?12:20;const W=N?376:680,y=N?38:40;
    s+=`<text x="${N?12:20}" y="20" class="t-sm">${C.n.toUpperCase()}</text>`;
    let lgx=20;C.parts.forEach(([l,v,c],k)=>{const w=W*v/100;s+=`<rect x="${f1(x)}" y="${y}" width="${f1(Math.max(w-2,1))}" height="34" rx="5" style="fill:${c};stroke:var(--line)"/>`;
      if(w>44)s+=`<text x="${f1(x+w/2)}" y="${y+22}" class="t-lbl t-mid" style="fill:${c==='var(--dx)'||c==='var(--vas)'?'#fff':'var(--ink)'};font-size:12px">${v}%</text>`;
      const lx=N?12:lgx;if(!N)lgx+=(l.length+8)*5.9+28;const ly=N?y+62+k*22:y+64;
      s+=`<rect x="${lx}" y="${ly-10}" width="12" height="12" rx="3" style="fill:${c};stroke:var(--line)"/><text x="${lx+18}" y="${ly}" class="t-xs" style="fill:var(--ink)">${l} · ${v}%</text>`;x+=w});
    csv.innerHTML=s;
    $('#hsCoNote').innerHTML=`<div class="kicker">${C.n}</div><h4>${C.parts.map(p=>p[0]+' '+p[1]+'%').slice(0,2).join(' · ')}</h4><p>${C.txt}</p><div class="hook"><b>Exam hook</b>Referral-centre shares depend on who is referred and on how each clinic applies the definitions. <sup class="c" data-ref="Fairweather2025,Carroll2023" title="Source 72,147">72,147</sup></div>`}
  $('#hsCoBtns').addEventListener('click',e=>{const b=e.target.closest('[data-hsco]');if(!b)return;co=b.dataset.hsco;$$('[data-hsco]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCo()});
  drawCo();
  const prevR=redraws.hsd;redraws.hsd=()=>{prevR&&prevR();drawCo()};
};
/* =============== 2.4 Look-alikes & red flags =============== */
inits.differential=()=>{
  const T=(x,y,s,cls='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const R=(x,y,w,h,st,rx=0)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const press=(sel,attr,val)=>$$(sel).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[attr]===val)));

  /* ================= 1. feature matrix ================= */
  const svg=$('#dfSvg'),rg=$('#dfT');let flag=false;
  const ROWS=[['Vascular EDS','vEDS',1],['Classical EDS','cEDS',0],['Hypermobile EDS','hEDS',0],['Marfan','Marfan',1],['Loeys-Dietz','Loeys-Dietz',1],
    ['Osteogenesis imp.','OI',0],['Cutis laxa','Cutis laxa',0],['Stickler','Stickler',0],['Fibromyalgia','Fibromyalgia',0],['Inflamm. arthritis','Infl. arthritis',0]];
  const COLS=[['joint','hypermob.','joint hypermobility',0],['skin','stretch','skin hyperextensibility',0],['atrophic','scars','atrophic scars',0],['aortic','root','aortic root dilation',1],
    ['arterial','tortuosity','arterial tortuosity',1],['lens','disloc.','lens dislocation',0],['fractures','','fractures',0],['blue','sclerae','blue sclerae',0],['bifid uvula','/ cleft','bifid uvula or cleft palate',0]];
  /* cells: row -> {col:[level,label]}; level 3 hallmark/criterion, 2 published frequency, 1 reported/minor */
  const CELL=[{0:[2,'40.7%'],1:[1,'minor'],4:[1,'early']},{0:[3,'58.7%'],1:[3,''],2:[3,''],3:[2,'33%']},{0:[3,''],1:[1,'mild'],2:[1,''],3:[2,'21%'],6:[1,'']},
    {3:[3,''],5:[3,'≈60%']},{3:[3,''],4:[3,''],8:[3,'']},{6:[3,'']},{1:[1,'no recoil']},{8:[1,'cleft']},{},{}];
  const STEPS=[
    {from:0,at:.06,k:'Feature 1 of 9',t:'Joint hypermobility',
     txt:`Generalised joint hypermobility is Criterion 1 of hEDS and a major criterion of classical EDS, yet only 58.66% of 75 molecularly confirmed cEDS patients had a Beighton score of 5 or more. In confirmed vEDS, 40.7% had joint hypermobility, against 68.4% of people diagnosed on clinical grounds alone, many of whom turned out not to have vEDS. Peripheral (hands and feet) hypermobility may be a clue to vEDS. <sup class="c" data-ref="Fairweather2025,Ritelli2020C,Shalhub2020,Carroll2023" title="Source 72,147,385,430">72,147,385,430</sup>`,
     pt:`Bendy joints are common and appear in many conditions, so on their own they do not point to one diagnosis.`,
     hook:`A low Beighton score does not exclude classical EDS. <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>`},
    {from:.1,at:.16,k:'Feature 2 of 9',t:'Skin hyperextensibility',
     txt:`Stretchy skin with atrophic scarring is the first major criterion of classical EDS: the skin stretches easily and snaps back. hEDS allows only mild hyperextensibility (over 1.5 cm at the distal forearm or back of the hand, over 3 cm at the neck, elbow or knee). In cutis laxa the skin is loose and redundant from fragmented elastic fibres and hangs in folds. Skin hyperextensibility was a minor criterion in a US vEDS study. <sup class="c" data-ref="Malfait2024GeneReviews,Thwaites2022,Beyens2021,Shalhub2020" title="Source 46,293,430,460">46,293,430,460</sup>`,
     pt:`Skin that stretches and springs back suggests classical EDS. Skin that hangs loose suggests cutis laxa.`,
     hook:`Stretch and snap back = classical EDS; loose folds without recoil = cutis laxa. <sup class="c" data-ref="Malfait2024GeneReviews,Beyens2021" title="Source 46,293">46,293</sup>`},
    {from:.2,at:.26,k:'Feature 3 of 9',t:'Atrophic scars',
     txt:`In 126 people with suspected classical EDS, every type V collagen defect was in someone with dystrophic scarring; none of the 24 without it had one. hEDS counts atrophic scars at 2 or more sites only when they are not the truly papyraceous (paper-thin) or haemosiderotic (iron-stained) scars of classical EDS. <sup class="c" data-ref="Symoens2012,Fairweather2025" title="Source 147,456">147,456</sup>`,
     pt:`Wide, thin, shiny scars that stretch out over time point toward classical EDS.`,
     hook:`No dystrophic scarring: no type V collagen defect in 24 of 24. <sup class="c" data-ref="Symoens2012" title="Source 456">456</sup>`},
    {from:.3,at:.36,k:'Feature 4 of 9',t:'Aortic root dilation',
     txt:`Aortic root aneurysm is a cardinal feature of Marfan syndrome. In 71 consecutive people with EDS, 28% had aortic root dilation above +2 SD (14 of 42 classical, 6 of 29 hypermobile), and it is item 12 of hEDS Feature A. In Loeys-Dietz syndrome, dissection has occurred at root diameters of 3.9–4.0 cm. In vEDS, arteries can rupture "even without significant dilation". <sup class="c" data-ref="Loeys2010,Wenstrup2002,Fairweather2025,MacCarrick2014,Isselbacher2022" title="Source 147,219,276,284,501">147,219,276,284,501</sup>`,
     pt:`A widened aorta near the heart is the key sign of Marfan syndrome, but it is also found in some people with EDS.`,
     hook:`Marfan cardinal features: aortic root aneurysm + ectopia lentis. <sup class="c" data-ref="Loeys2010" title="Source 276">276</sup>`},
    {from:.4,at:.46,k:'Feature 5 of 9',t:'Arterial tortuosity',
     txt:`Twisting arteries with aneurysms are part of the Loeys-Dietz triad. In vEDS, a height-adjusted vertebral tortuosity index of 15.5 or more was associated with cardiovascular events (<span class="ev early">Early evidence</span>). Across 1,780 people with aortopathy genes, arterial events beyond the aorta were most common with COL3A1 (20.8%) and rarest with FBN1 (1.5%). <sup class="c" data-ref="Loeys2006,Stephens2023,CalderonMartinez2025" title="Source 69,275,451">69,275,451</sup>`,
     pt:`Twisty arteries on a scan are a clue to Loeys-Dietz syndrome.`,
     hook:`Loeys-Dietz triad: arterial tortuosity and aneurysms, hypertelorism, bifid uvula or cleft palate. <sup class="c" data-ref="Loeys2006" title="Source 275">275</sup>`},
    {from:.5,at:.56,k:'Feature 6 of 9',t:'Lens dislocation',
     txt:`Ectopia lentis occurs in about 60% of people with Marfan syndrome, and with aortic root aneurysm it is enough for the diagnosis when there is no family history. Its absence is one clue that separates Loeys-Dietz from Marfan syndrome. <sup class="c" data-ref="DietzGR-Marfan,Loeys2010,MacCarrick2014" title="Source 127,276,284">127,276,284</sup>`,
     pt:`A slipped lens in the eye is a strong pointer to Marfan syndrome, not EDS.`,
     hook:`Lens dislocation: Marfan yes, Loeys-Dietz no. <sup class="c" data-ref="MacCarrick2014" title="Source 284">284</sup>`},
    {from:.6,at:.66,k:'Feature 7 of 9',t:'Fractures',
     txt:`Bone fragility is the hallmark of osteogenesis imperfecta, caused by COL1A1 or COL1A2 variants in about 85%. In hEDS and cEDS, bone density is at most mildly lower and higher fracture rates are not clearly shown (<span class="ev est">Established</span>), although one study found vertebral fractures in 32% vs 8% of controls. EDS as an explanation for infant fractures remains unproven (<span class="ev hyp">Hypothesis</span>). <sup class="c" data-ref="Marini2017,Basalom2020,EllerVainicher2016,Castori2015" title="Source 27,77,141,297">27,77,141,297</sup>`,
     pt:`Bones that break easily point toward osteogenesis imperfecta rather than EDS.`,
     hook:`OI = bone fragility, mostly COL1A1/COL1A2; hEDS lists skeletal dysplasias such as OI as exclusions. <sup class="c" data-ref="Marini2017,Fairweather2025" title="Source 147,297">147,297</sup>`},
    {from:.7,at:.76,k:'Feature 8 of 9',t:'Blue sclerae',
     txt:`The research behind this guide has no citable frequency of blue sclerae for any of these ten conditions, so this column stays empty. That is a gap in this guide's sources, not evidence that the sign never occurs.`,
     pt:`An empty column here means "not covered by our sources", not "never seen".`,
     hook:`Read an empty cell as missing evidence in this guide, not as a negative finding.`},
    {from:.8,at:.86,k:'Feature 9 of 9',t:'Bifid uvula or cleft palate',
     txt:`A bifid uvula or cleft palate is part of the Loeys-Dietz triad. Stickler syndrome, a type II/XI collagenopathy, also causes cleft palate, with myopia, retinal detachment, hearing loss and early joint disease. hEDS Feature A includes dental crowding with a high or narrow palate, which is different. <sup class="c" data-ref="Loeys2006,MortierGR-Stickler,Fairweather2025" title="Source 147,275,317">147,275,317</sup>`,
     pt:`A split uvula at the back of the mouth is an easy-to-check clue to Loeys-Dietz syndrome.`,
     hook:`Stickler: the commonest inherited cause of rhegmatogenous retinal detachment. <sup class="c" data-ref="Snead2011" title="Source 439">439</sup>`},
    {from:.9,at:.98,k:'All features',t:'The pattern, not one sign',
     txt:`No single feature decides. hEDS is the only type without a known gene; the rest need molecular confirmation. In 72 children referred for suspected EDS, 25% met clinical criteria for a subtype and 83% of those were confirmed molecularly; a gene panel still found a variant in 28% of those who did not meet criteria. Fibromyalgia and inflammatory arthritis share none of these signs, but their pain overlaps with hEDS Feature C. <sup class="c" data-ref="Malfait2017,Damseh2022,Thwaites2022" title="Source 111,291,460">111,291,460</sup>`,
     pt:`Doctors look at the whole pattern of signs, the family history and often a gene test.`,
     hook:`Children should not be diagnosed with hEDS before biological maturity. <sup class="c" data-ref="Tofts2023" title="Source 464">464</sup>`}
  ];
  function draw(t){
    const N=vb(svg,'720 420','400 566');
    const L=N?{lx:10,cx:110,cw:31.5,hy:34,ry:56,rh:30,rmax:9}:{lx:16,cx:150,cw:62,hy:30,ry:70,rh:29,rmax:11};
    const p=phaseOf(STEPS,t);let s='';
    const shown=k=>clamp((t-k*.1)/.06);
    /* column headers and current band */
    COLS.forEach((c,k)=>{const x=L.cx+k*L.cw+L.cw/2,cur=p===k,op=shown(k)>0?1:.4;
      if(cur)s+=R(L.cx+k*L.cw+1,L.hy-(N?18:22),L.cw-2,L.ry+10*L.rh-L.hy+(N?14:18),'fill:var(--dx-soft)',6);
      if(flag&&c[3])s+=R(L.cx+k*L.cw+2,L.hy-(N?16:20),L.cw-4,L.ry+10*L.rh-L.hy+(N?12:16),'fill:none;stroke:var(--vas);stroke-width:1.6;stroke-dasharray:4 3',6);
      if(N)s+=T(x,L.hy,k+1,'t-sm t-mid',`opacity:${op};${cur?'fill:var(--dx);font-weight:700':''}`);
      else{s+=T(x,L.hy,c[0],'t-xs t-mid',`opacity:${op};${cur?'fill:var(--dx);font-weight:700':''}`);if(c[1])s+=T(x,L.hy+12,c[1],'t-xs t-mid',`opacity:${op};${cur?'fill:var(--dx);font-weight:700':''}`)}});
    ROWS.forEach((r,i)=>{const y=L.ry+i*L.rh;
      if(i%2===0)s+=R(L.lx-4,y-L.rh/2,L.cx+9*L.cw-L.lx+4,L.rh,'fill:var(--panel-2);opacity:.45',4);
      if(flag&&r[2])s+=R(L.lx-6,y-L.rh/2+1,L.cx+9*L.cw-L.lx+8,L.rh-2,'fill:none;stroke:var(--vas);stroke-width:1.8',6);
      s+=T(L.lx,y+4,N?r[1]:r[0],N?'t-sm':'t-lbl',flag&&r[2]?'fill:var(--vas);font-weight:700':'fill:var(--ink)');
      COLS.forEach((c,k)=>{const v=CELL[i][k],x=L.cx+k*L.cw+L.cw/2,a=shown(k);if(!v||a<=0){if(a>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.4" style="fill:var(--line)"/>`;return}
        const rad=[0,L.rmax*.42,L.rmax*.68,L.rmax][v[0]]*ease(a),op=[0,.45,.7,1][v[0]],col=flag&&(r[2]||c[3])?'var(--vas)':'var(--dx)';
        const dx=!N&&v[1]?-15:0;
        s+=`<circle cx="${f1(x+dx)}" cy="${f1(y)}" r="${f1(rad)}" style="fill:${col};opacity:${op}"/>`;
        if(!N&&v[1]&&a>.6)s+=T(x+dx+rad+3,y+4,v[1],'t-xs','fill:var(--ink)')})});
    if(N){const ly=L.ry+10*L.rh+10;s+=T(L.lx,ly,'COLUMNS','t-xs','font-weight:600');
      COLS.forEach((c,k)=>{const y=ly+18+k*17;s+=T(L.lx,y,(k+1)+'  '+c[2],'t-sm',p===k?'fill:var(--dx);font-weight:700':'fill:var(--ink)')})}
    const capY=N?552:398;
    if(flag)s+=T(L.lx,capY,N?'Red outline: vascular rows and columns':'Red outline: conditions and features that raise a heritable vascular disorder','t-sm','fill:var(--vas);font-weight:600');
    else s+=T(L.lx,capY,p<9?(N?'Showing: ':'Revealing column: ')+COLS[p][2]:'All nine features shown','t-sm','fill:var(--dx);font-weight:600');
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',STEPS[p].t);
    $('#dfNote').innerHTML=noteHTML(STEPS[p])+(flag?`<div class="kv"><div><dt>Red flags on</dt><dd>Arterial rupture or dissection under 40, spontaneous sigmoid perforation, third-trimester uterine rupture or carotid-cavernous fistula raise vEDS; tortuosity with a bifid uvula raises Loeys-Dietz; aortic root plus lens raises Marfan. <sup class="c" data-ref="Demirdas2024,Loeys2006,Loeys2010" title="Source 118,275,276">118,275,276</sup></dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#dfPlay'),draw,24000,'Replay','differential');
  const setSt=stepWire($('#dfSteps'),STEPS,rg,draw,stop);
  $('#dfFlag').addEventListener('click',()=>{flag=!flag;$('#dfFlag').setAttribute('aria-pressed',String(flag));draw(+rg.value)});
  draw(+rg.value);

  /* ================= 2. teaching decision tree ================= */
  const tree=$('#dfTree');let pic='vas',ref={aor:'no',jh:'yes'};
  const PICS=[['vas','Rupture: artery, bowel, uterus',['Rupture: artery,','bowel or uterus']],['aor','Aortic root or lens',['Aortic root','or lens']],['skin','Stretchy skin + scars',['Stretchy skin','+ scars']],
    ['jh','Hypermobility, no fragility',['Hypermobility,','no fragility']],['pain','Widespread pain only',['Widespread','pain only']],['syn','Inflamed joints',['Swollen,','inflamed joints']],['bone','Fractures',['Fractures','']]];
  const OUT={
    vas:{l:'COL3A1 test (often a gene panel)',n:['COL3A1 test','(gene panel)'],h:'Suspected vascular EDS: confirm the gene',tag:'tag vas',
      li:[`The consensus recommends identifying the causative COL3A1 variant before applying the diagnosis. <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>`,
        `Minimal criteria prompting testing: family history, arterial rupture or dissection under 40, unexplained sigmoid colon rupture, or spontaneous pneumothorax with other features. <sup class="c" data-ref="Wang2026OJRD,Malfait2017" title="Source 291,496">291,496</sup>`,
        `A clinical diagnosis alone "cannot be trusted": 9.8% had non-pathogenic changes. <sup class="c" data-ref="Shalhub2020" title="Source 430">430</sup>`,
        `Atypical COL3A1 variants once called uncertain were reclassified as pathogenic, which supports multigene panels; without a COL3A1 variant, 12 of 40 vEDS-like people had TGFBR1/2 variants. <sup class="c" data-ref="Ghali2019GenetMed,Loeys2006" title="Source 181,275">181,275</sup>`]},
    aor_no:{l:'Revised Ghent nosology + FBN1',n:['Ghent nosology','+ FBN1'],h:'Marfan pathway: revised Ghent nosology',tag:'tag',
      li:[`Without a family history: aortic Z-score of 2 or more plus ectopia lentis, an FBN1 variant, or a systemic score of 7 or more; or ectopia lentis plus an FBN1 variant linked to aortic dilation. <sup class="c" data-ref="Pollock2021,Loeys2010" title="Source 276,368">276,368</sup>`,
        `These rules apply only when nothing points to Shprintzen-Goldberg, Loeys-Dietz or vascular EDS. <sup class="c" data-ref="Pollock2021" title="Source 368">368</sup>`,
        `FBN1 testing has more weight since 2010 but is not mandatory; molecular confirmation is possible in over 95%. <sup class="c" data-ref="Pollock2021,Loeys2010" title="Source 276,368">276,368</sup>`]},
    aor_yes:{l:'Loeys-Dietz gene panel (TGF-β)',n:['Loeys-Dietz','gene panel'],h:'Loeys-Dietz pathway: TGF-β pathway genes',tag:'tag',
      li:[`Classic triad: arterial tortuosity and aneurysms, hypertelorism, bifid uvula or cleft palate. <sup class="c" data-ref="Loeys2006" title="Source 275">275</sup>`,
        `Genes: TGFBR1, TGFBR2, SMAD2, SMAD3, TGFB2, TGFB3 (dominant) and IPO8 (recessive). <sup class="c" data-ref="LoeysGR-LDS" title="Source 277">277</sup>`,
        `Baseline head-to-pelvis vascular imaging is recommended; dissection has occurred at root diameters of 3.9–4.0 cm. <sup class="c" data-ref="MacCarrick2014" title="Source 284">284</sup>`]},
    skin:{l:'cEDS molecular test (COL5A1/2)',n:['cEDS test','COL5A1/2'],h:'Classical EDS: molecular testing',tag:'tag dx',
      li:[`Testing is prompted by major criterion 1 (skin hyperextensibility plus atrophic scarring) plus either major criterion 2 (joint hypermobility) or 3 minor criteria. <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>`,
        `Over 90% of people meeting all major criteria had a type V collagen defect. <sup class="c" data-ref="Symoens2012" title="Source 456">456</sup>`,
        `Fragile skin in someone with hypermobility points away from hEDS, which requires no unusual skin fragility. <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>`]},
    jh_yes:{l:'2017 hEDS criteria (clinical)',n:['2017 hEDS','criteria'],h:'Hypermobile EDS: clinical criteria',tag:'tag dx',
      li:[`All three criteria are needed: generalised joint hypermobility, two of Features A–C, and exclusion of other causes. <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>`,
        `There is no gene test: clinical exome found no candidate variant in children compatible with hEDS or HSD. <sup class="c" data-ref="FozFelipe2025" title="Source 168">168</sup>`,
        `A teaching checklist is in <a href="#" data-go="criteria">The 2017 hEDS criteria</a>.`]},
    jh_no:{l:'Hypermobility spectrum disorder',n:['HSD','framework'],h:'Hypermobility spectrum disorder (HSD)',tag:'tag dx',
      li:[`HSD is joint hypermobility (generalised, peripheral, localised or historical) plus at least one secondary musculoskeletal manifestation. <sup class="c" data-ref="Carroll2023,Castori2017" title="Source 72,78">72,78</sup>`,
        `Arachnodactyly, arm span to height of 1.05 or more, soft or stretchy skin, piezogenic papules, atrophic scars, mitral valve prolapse or aortic root dilatation point toward a heritable connective tissue disorder instead. <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>`,
        `See <a href="#" data-go="hsd">hEDS or HSD?</a>`]},
    pain:{l:'Fibromyalgia criteria (2016)',n:['Fibromyalgia','criteria 2016'],h:'Widespread pain: fibromyalgia criteria',tag:'tag',
      li:[`The physician-based 2016 criteria are valid for individual diagnosis; the 2010/2011 criteria had a median sensitivity of 86% and specificity of 90%. <sup class="c" data-ref="Wolfe2016" title="Source 508">508</sup>`,
        `Fibromyalgia can now be diagnosed alongside another condition. <sup class="c" data-ref="Wolfe2016" title="Source 508">508</sup>`,
        `About 70% of patients at one EDS clinic had previously been diagnosed with fibromyalgia. <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>`]},
    syn:{l:'ACR/EULAR 2010 arthritis criteria',n:['ACR/EULAR','2010'],h:'Inflamed joints: inflammatory arthritis criteria',tag:'tag',
      li:[`"Definite rheumatoid arthritis" needs confirmed synovitis in at least one joint, no better explanation, and a score of 6 or more out of 10. <sup class="c" data-ref="Aletaha2010" title="Source 5">5</sup>`,
        `Overt synovitis is unusual in HSD, though small effusions occur. <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>`,
        `With an autoimmune rheumatic disease present, hEDS needs Features A and B; Feature C cannot be counted. <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>`]},
    bone:{l:'OI testing (COL1A1/COL1A2)',n:['OI test','COL1A1/2'],h:'Bone fragility: osteogenesis imperfecta',tag:'tag',
      li:[`Dominant COL1A1 or COL1A2 variants cause about 85% of OI. <sup class="c" data-ref="Marini2017" title="Source 297">297</sup>`,
        `In hEDS and cEDS, higher fracture rates are not clearly shown. <sup class="c" data-ref="Basalom2020" title="Source 27">27</sup>`,
        `Bruising in a child: EDS belongs on the differential, but EDS as an explanation for infant fractures is unproven. <sup class="c" data-ref="Castori2015" title="Source 77">77</sup>`]}
  };
  const outKey=k=>k==='aor'?'aor_'+ref.aor:k==='jh'?'jh_'+ref.jh:k;
  function drawTree(){
    const N=vb(tree,'720 330','400 560');let s='';
    if(!N){const rx=16,ry=150;s+=R(rx,ry,118,36,'fill:var(--ink)',10)+T(rx+59,ry+15,'Presenting','t-xs t-mid','fill:var(--bg);font-weight:700')+T(rx+59,ry+28,'picture','t-xs t-mid','fill:var(--bg);font-weight:700');
      PICS.forEach(([k,l],i)=>{const y=14+i*44,on=k===pic,o=OUT[outKey(k)];
        s+=`<path d="M${rx+118} ${ry+18}C${rx+140} ${ry+18} ${150} ${y+15} 168 ${y+15}" style="fill:none;stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2.4:1.2}"/>`;
        s+=R(168,y,190,30,`fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2:1}`,8)+T(178,y+19,l,'t-xs',on?'fill:var(--dx);font-weight:700':'fill:var(--ink)');
        s+=`<path d="M358 ${y+15}H392" style="stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2.4:1.2}"/>`;
        s+=R(392,y,312,30,`fill:${on?'var(--dx)':'var(--panel-2)'};opacity:${on?1:.7}`,8)+T(404,y+19,o.l,'t-xs',on?'fill:var(--bg);font-weight:700':'fill:var(--muted)')});}
    else{s+=R(12,8,376,30,'fill:var(--ink)',10)+T(200,28,'Presenting picture → published pathway','t-sm t-mid','fill:var(--bg);font-weight:700');
      PICS.forEach(([k,l,n2],i)=>{const y=52+i*72,on=k===pic,o=OUT[outKey(k)];
        s+=R(12,y,170,56,`fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2:1}`,8);
        n2.forEach((ln,j)=>s+=T(22,y+24+j*16,ln,'t-sm',on?'fill:var(--dx);font-weight:700':'fill:var(--ink)'));
        s+=`<path d="M182 ${y+28}H206" style="stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2.4:1.2}"/>`;
        s+=R(206,y,182,56,`fill:${on?'var(--dx)':'var(--panel-2)'};opacity:${on?1:.7}`,8);
        o.n.forEach((ln,j)=>s+=T(216,y+24+j*16,ln,'t-sm',on?'fill:var(--bg);font-weight:700':'fill:var(--muted)'))});}
    tree.innerHTML=s;
    const o=OUT[outKey(pic)];
    $('#dfOut').innerHTML=`<span class="${o.tag}" style="align-self:flex-start">Teaching pathway</span><h4>${o.h}</h4><ul>${o.li.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    const rf=$('#dfRefine');
    if(pic==='aor')rf.innerHTML=`<span class="kicker">Also tortuous arteries, wide-set eyes or bifid uvula?</span><button class="btn" data-dfref="yes" aria-pressed="${ref.aor==='yes'}">Yes</button><button class="btn" data-dfref="no" aria-pressed="${ref.aor==='no'}">No</button>`;
    else if(pic==='jh')rf.innerHTML=`<span class="kicker">All three 2017 hEDS criteria met?</span><button class="btn" data-dfref="yes" aria-pressed="${ref.jh==='yes'}">Yes</button><button class="btn" data-dfref="no" aria-pressed="${ref.jh==='no'}">No</button>`;
    else rf.innerHTML=`<span class="kicker">No refining question for this picture</span>`;
  }
  $$('[data-dfpic]').forEach(b=>b.addEventListener('click',()=>{pic=b.dataset.dfpic;press('[data-dfpic]','dfpic',pic);drawTree()}));
  $('#dfRefine').addEventListener('click',e=>{const b=e.target.closest('[data-dfref]');if(!b)return;ref[pic]=b.dataset.dfref;drawTree()});
  redraws.differential=(prev=>()=>{prev&&prev();drawTree()})(redraws.differential);
  drawTree();
};
/* =============== 3.1 Joints & dislocations =============== */
inits.joints=()=>{
  const svg=$('#joSvg'),rg=$('#joT'),mu=$('#joM');
  let jt='shoulder';

  /* ---------- per-joint labels and facts (every number cited in the readout) ---------- */
  const JOINTS={
    shoulder:{n:'Shoulder',prox:'humeral head',dist:'glenoid socket',s:1,ang:14,dir:'downward and forward',
      read:`<span>HSD shoulder trial: <b>25%</b> of those with mechanical symptoms had dislocated before; <b>64%</b> said it felt loose <sup class="c" data-ref="Liaghat2022APMR" title="Source 267">267</sup></span><span>WOSI <b>49.9</b> in JHS/hEDS vs <b>83.3</b> in controls (higher is better) <sup class="c" data-ref="Johannessen2016" title="Source 227">227</sup></span>`},
    knee:{n:'Knee',prox:'femur',dist:'tibia',s:1,ang:-10,dir:'sideways and into extension',
      read:`<span>knee movement noticed later than controls at <b>30°</b> and <b>5°</b> of flexion <sup class="c" data-ref="Hall1995" title="Source 202">202</sup></span><span>commonest presenting site in children with EDS: <b>43.4%</b> <sup class="c" data-ref="Stern2017" title="Source 452">452</sup></span>`},
    patella:{n:'Kneecap',prox:'femoral groove',dist:'patella',s:1,ang:0,dir:'outward (laterally)',
      read:`<span>patellofemoral instability with a joint hypermobility syndrome diagnosis: <b>aOR 11.40</b> at 1 year <sup class="c" data-ref="Kutschke2024" title="Source 258">258</sup></span><span>with an EDS diagnosis: <b>aOR 16.32</b> <sup class="c" data-ref="Kutschke2024" title="Source 258">258</sup></span>`},
    finger:{n:'Finger',prox:'proximal phalanx',dist:'middle phalanx',s:.72,ang:-18,dir:'backward (into hyperextension)',
      read:`<span>finger position-matching errors larger than controls at <b>every angle</b> <sup class="c" data-ref="Mallik1994" title="Source 294">294</sup></span><span>digits among the commonest dislocation sites in cEDS <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup></span>`}};

  const STEPS=[
    {from:0,at:.12,k:'Phase 1 · load',t:'Load arrives',
     txt:`A joint is held by its shape, by passive restraints (the capsule and ligaments) and by active ones (muscles). In EDS these passive tissues are built from connective tissue that is looser or weaker than usual, and the molecular cause of hEDS is still unknown. Tendons are measurably softer: in 25 women with hEDS, Achilles tendon stiffness was lower than in 25 matched controls, and in classical EDS patellar tendon stiffness was about half that of controls. <sup class="c" data-ref="Malfait2020,Rombaut2012Tendon,Nielsen2014" title="Source 292,343,397">292,343,397</sup>`,
     pt:`Joints are held together by "straps" (ligaments and the joint capsule) and by muscles. In EDS the straps are stretchier, so the muscles have more work to do.`,
     hook:`hEDS: lower Achilles tendon stiffness and lower passive muscle tension than controls (25 vs 25 women). <sup class="c" data-ref="Rombaut2012Tendon" title="Source 397">397</sup>`},
    {from:.2,at:.32,k:'Phase 2 · end of range',t:'End of range',
     txt:`With typical tissue the capsule and ligaments come taut near the end of range and stop the movement while the joint surfaces stay centred. With lax tissue the capsule is longer and thinner, so it takes up slack later: in 100 hip-arthroscopy patients a Beighton score of 4 or more went with a capsule thinner than 10 mm. The brain also gets a blurrier signal: in women with hypermobility syndrome, knee movements had to be larger before they were noticed, and the usual sharpening of position sense near full extension was missing. <sup class="c" data-ref="Devitt2017,Hall1995" title="Source 121,202">121,202</sup>`,
     pt:`Loose straps tighten late, and loose joints send a fuzzy "where am I?" signal to the brain. So a joint can drift too far before anything stops it.`,
     hook:`Proprioception: poorer lower-limb joint position sense in benign joint hypermobility syndrome (meta-analysis, 5 studies, 254 people). <sup class="c" data-ref="Smith2013BJHS" title="Source 436">436</sup>`},
    {from:.4,at:.52,k:'Phase 3 · subluxation',t:'Subluxation',
     txt:`Under more load the lax joint keeps sliding: the surfaces move partly apart but keep some contact. In imaging studies of hEDS/HSD with multidirectional shoulder instability, the humeral head moved more than in controls during simple exercises, and holding a 2 kg dumbbell or rotating the arm outward translated it downward. Subluxations were reported by 29.3% of 75 people with classical EDS. <sup class="c" data-ref="Spanhove2020,Ritelli2020C" title="Source 385,443">385,443</sup>`,
     pt:`A subluxation is a partial slip: the joint shifts part of the way out and usually slides back. People often describe a clunk or a feeling that the joint "gave way".`,
     hook:`Multidirectional shoulder instability in hEDS/HSD: lower scapular upward rotation and higher infraspinatus, middle trapezius and posterior deltoid activity. <sup class="c" data-ref="Spanhove2022" title="Source 444">444</sup>`},
    {from:.6,at:.74,k:'Phase 4 · dislocation',t:'Dislocation',
     txt:`If the load keeps going, contact is lost: a dislocation. In 75 people with classical EDS, 21.3% had dislocated a joint (34.1% of adults, 3.2% of children), mostly the shoulder, digits, hip, radius and clavicle. Joint hypermobility, subluxations and dislocations are the core of the hEDS picture, and in an Italian hEDS/JHS cohort the rate and sites of instability did not change with age. <sup class="c" data-ref="Ritelli2020C,Tinkle2017,Morlino2017" title="Source 314,385,461">314,385,461</sup>`,
     pt:`A dislocation means the joint has come fully out. In EDS this can happen with much less force than people expect.`,
     hook:`Patellofemoral instability: aOR 11.40 with a joint hypermobility syndrome diagnosis and 16.32 with EDS at 1 year (US claims, 91,747 people). <sup class="c" data-ref="Kutschke2024" title="Source 258">258</sup>`},
    {from:.8,at:.95,k:'Phase 5 · reduction',t:'Reduction, and what muscles add',
     txt:`In classical EDS most dislocations went back by themselves; 6.7% had a fixed dislocation that did not. Muscles are the restraint that can be trained. Women with hEDS had 30% to 49% lower knee strength than controls with similar muscle mass, and strength tracked chair-rise, walking and daily function. Drag the muscle slider up and replay: the lax joint stops at a subluxation. That is the rationale for strength and control programmes, shown here as an illustration, not a measured effect. <sup class="c" data-ref="Ritelli2020C,Rombaut2012Strength,Scheper2017Strength" title="Source 385,396,416">385,396,416</sup>`,
     pt:`Most slipped joints in EDS go back on their own. Stronger, better-controlled muscles act like extra straps, which is why exercise with a physiotherapist who knows hypermobility is the main treatment.`,
     hook:`Women with hEDS: 30–49% lower knee strength with normal muscle mass, suggesting muscle dysfunction rather than reduced mass. <sup class="c" data-ref="Rombaut2012Strength" title="Source 396">396</sup>`}];
  const setSt=stepWire($('#joSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* ---------- the timeline: load, and how far the lax joint would slide with no muscle help ---------- */
  const loadOf=t=>ease(ramp(t,0,.16))*(1-ease(ramp(t,.82,.92)));
  function baseSlip(t){
    if(t<.2)return .06*ramp(t,0,.2);
    if(t<.4)return lerp(.06,.22,ramp(t,.2,.4));
    if(t<.6)return lerp(.22,.55,ease(ramp(t,.4,.58)));
    if(t<.8)return lerp(.55,1,ease(ramp(t,.6,.74)));
    return lerp(1,0,ease(ramp(t,.82,.96)))}
  const stateOf=(sl,red)=>sl<.1?['centred','var(--good)']:sl<.32?[red?'back in place':'shifting','var(--warn)']:sl<.72?[red?'reducing':'subluxed','var(--variant)']:[red?'reducing':'dislocated','var(--bad)'];

  /* ---------- kneecap seen from below (axial view) ---------- */
  function patella(x,y,s,o){const sl=clamp(o.slip||0),lax=clamp(o.lax||0),m=clamp(o.muscle||0),S=v=>f1(v*s);
    const px=x+sl*64*s,py=y-30*s-10*s*Math.sin(Math.PI*Math.min(1,sl*1.4))+sl*6*s,rot=sl*28;let g='';
    /* femoral condyles with the trochlear groove; lateral side (right) is higher */
    g+=`<path d="M${f1(x-72*s)} ${f1(y+46*s)}L${f1(x-70*s)} ${f1(y-4*s)}Q${f1(x-58*s)} ${f1(y-22*s)} ${f1(x-34*s)} ${f1(y-16*s)}Q${f1(x-12*s)} ${f1(y-8*s)} ${f1(x)} ${f1(y+2*s)}Q${f1(x+14*s)} ${f1(y-12*s)} ${f1(x+38*s)} ${f1(y-24*s)}Q${f1(x+62*s)} ${f1(y-26*s)} ${f1(x+72*s)} ${f1(y-4*s)}L${f1(x+74*s)} ${f1(y+46*s)}Q${f1(x)} ${f1(y+62*s)} ${f1(x-72*s)} ${f1(y+46*s)}Z" style="fill:var(--bone);stroke:var(--bone-line);stroke-width:1.3"/>`;
    g+=`<path d="M${f1(x-62*s)} ${f1(y-15*s)}Q${f1(x-40*s)} ${f1(y-20*s)} ${f1(x-34*s)} ${f1(y-15*s)}Q${f1(x-12*s)} ${f1(y-6*s)} ${f1(x)} ${f1(y+3*s)}Q${f1(x+14*s)} ${f1(y-10*s)} ${f1(x+38*s)} ${f1(y-22*s)}Q${f1(x+58*s)} ${f1(y-24*s)} ${f1(x+66*s)} ${f1(y-14*s)}" style="fill:none;stroke:var(--cartilage);stroke-width:${S(3.4)}"/>`;
    /* medial vastus pulling medially */
    if(m>0)g+=`<path d="M${f1(x-96*s)} ${f1(y-74*s)}Q${f1(x-60*s)} ${f1(y-52*s)} ${f1(px-20*s)} ${f1(py-6*s)}" style="fill:none;stroke:var(--muscle);stroke-width:${f1((4+m*10)*s)};stroke-linecap:round;opacity:.6"/>`;
    /* retinacula: medial (left) stretches as the patella slides out */
    [[-1,x-70*s,y-2*s],[1,x+72*s,y-2*s]].forEach(([sd,ax,ay])=>{const bx=px+sd*24*s,by=py+2*s,mx=(ax+bx)/2,my=Math.min(ay,by)-(sd<0?(8+lax*16)*(1-sl*.7):6+lax*10)*s;
      g+=`<path d="M${f1(ax)} ${f1(ay)}Q${f1(mx)} ${f1(my)} ${f1(bx)} ${f1(by)}" style="fill:none;stroke:var(--capsule);stroke-width:${f1(2.4*s+.4)};stroke-linecap:round;${lax>.3?`stroke-dasharray:${f1(5*s)} ${f1(2.2*s*lax)}`:''}"/>`});
    g+=`<g transform="translate(${f1(px)} ${f1(py)}) rotate(${f1(rot)})"><path d="M${S(-26)} ${S(6)}Q${S(-22)} ${S(-20)} 0 ${S(-22)}Q${S(22)} ${S(-20)} ${S(26)} ${S(6)}Q${S(0)} ${S(-4)} ${S(-26)} ${S(6)}Z" style="fill:var(--bone);stroke:var(--bone-line);stroke-width:1.3"/><path d="M${S(-22)} ${S(4)}Q0 ${S(-5)} ${S(22)} ${S(4)}" style="fill:none;stroke:var(--cartilage);stroke-width:${S(3)}"/></g>`;
    if(o.hl)g+=`<circle cx="${f1(x+sl*32*s)}" cy="${f1(y-16*s)}" r="${S(46)}" style="fill:none;stroke:var(--variant);stroke-width:2;stroke-dasharray:4 3"/>`;
    g+=`<text x="${f1(x-70*s)}" y="${f1(y+62*s)}" class="t-xs">medial</text><text x="${f1(x+74*s)}" y="${f1(y+62*s)}" class="t-xs t-end">lateral</text>`;
    return g}

  /* ---------- one joint panel ---------- */
  function panel(cx,cy,s,o,J,load,title,lax,N){let g='';const sc=s*J.s;
    if(jt==='patella')g+=patella(cx,cy+20*s,s,o);
    else g+=joint(cx,cy,sc,o);
    /* load arrow on the distal part */
    if(load>.02){let ax,ay,dx,dy;
      if(jt==='patella'){ax=cx+o.slip*64*s+14*s;ay=cy-14*s;dx=1;dy=0}
      else{const tx=o.slip*30*sc,rad=(o.ang||0)*Math.PI/180;ax=cx+tx-Math.sin(rad)*82*sc;ay=cy+Math.cos(rad)*82*sc;dx=jt==='finger'?0:.8;dy=jt==='finger'?-1:.6}
      const L=(14+34*load)*s;g+=`<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(ax+dx*L)}" y2="${f1(ay+dy*L)}" style="stroke:var(--vas);stroke-width:3;stroke-linecap:round" marker-end="url(#joArr)"/>`}
    const hy=cy-(jt==='patella'?92:104)*s,st=stateOf(o.slip,o.red);
    g+=`<text x="${cx}" y="${f1(hy)}" class="t-lbl t-mid" style="fill:${lax?'var(--variant)':'var(--ink)'}">${title}</text>`;
    const by=cy+(jt==='patella'?110:116)*s;
    g+=`<rect x="${f1(cx-58)}" y="${f1(by-14)}" width="116" height="20" rx="10" style="fill:var(--panel);stroke:${st[1]};stroke-width:1.4"/><text x="${cx}" y="${f1(by)}" class="t-sm t-mid" style="fill:${st[1]};font-weight:600">${st[0]}</text>`;
    if(jt!=='patella'&&!N){g+=`<text x="${f1(cx+24*sc)}" y="${f1(cy-60*sc)}" class="t-xs">${J.prox}</text><text x="${f1(cx+20*sc+o.slip*30*sc)}" y="${f1(cy+70*sc)}" class="t-xs">${J.dist}</text>`}
    return g}
  function bar(x,y,w,v,lbl,col,txt){return `<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${lbl}</text><rect x="${x}" y="${y+5}" width="${w}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${x}" y="${y+5}" width="${f1(Math.max(0,w*clamp(v)))}" height="10" rx="5" style="fill:${col}"/><text x="${x+w}" y="${y}" class="t-sm t-end" style="fill:var(--ink);font-weight:600">${txt}</text>`}

  /* ---------- the scene ---------- */
  function draw(t){const N=vb(svg,'720 380','400 560'),W=N?400:720,J=JOINTS[jt],m=+mu.value;
    const ph=phaseOf(STEPS,t),load=loadOf(t),base=baseSlip(t),red=t>=.8;
    const slipLax=base*(1-.62*m),slipTyp=.05*load;
    const oT={slip:slipTyp,lax:.3*(1-load),ang:J.ang*load,muscle:.45,red};
    const oL={slip:slipLax,lax:.6+.35*ramp(base,0,1),ang:J.ang*load+(jt==='finger'?-14:8)*base*(1-.5*m),muscle:m,red,hl:slipLax>.5};
    let s=`<defs>${marker('joArr','var(--vas)')}</defs>`;
    s+=`<text x="16" y="28" class="t-big">${STEPS[ph].t}</text><text x="${W-16}" y="28" class="t-sm t-end">${J.n} · ${ph+1} / 5</text>`;
    if(N){
      s+=`<line x1="200" y1="56" x2="200" y2="318" class="grid"/>`;
      s+=panel(102,196,1,oT,J,load,'Typical tissue',false,N)+panel(298,196,1,oL,J,load,'Lax tissue',true,N);
      const gx=24,gw=352;let y=372;
      s+=`<text x="${gx}" y="${y-14}" class="t-sm" style="font-weight:600">LOAD ${J.dir.toUpperCase()}</text>`;
      s+=bar(gx,y,gw,load,'load (schematic)','var(--vas)',Math.round(load*100)+'%');y+=38;
      s+=bar(gx,y,gw,1-slipTyp*1.05,'joint-surface contact · typical','var(--good)',Math.round(clamp(1-slipTyp*1.05)*100)+'%');y+=38;
      s+=bar(gx,y,gw,1-slipLax*1.05,'joint-surface contact · lax','var(--variant)',Math.round(clamp(1-slipLax*1.05)*100)+'%');y+=38;
      s+=bar(gx,y,gw,m,'muscle co-contraction (slider)','var(--muscle)',Math.round(m*100)+'%');y+=40;
      s+=`<text x="${gx}" y="${y}" class="t-sm">Illustrative values. Muscle help shrinks</text><text x="${gx}" y="${y+15}" class="t-sm">the lax joint's slide.</text>`;
    }else{
      s+=`<line x1="270" y1="52" x2="270" y2="352" class="grid"/><line x1="510" y1="52" x2="510" y2="352" class="grid"/>`;
      s+=panel(140,200,1.1,oT,J,load,'Typical tissue',false,N)+panel(390,200,1.1,oL,J,load,'Lax tissue',true,N);
      const gx=532,gw=170;let y=74;
      s+=`<text x="${gx}" y="${y-14}" class="t-sm" style="font-weight:600">GAUGES</text>`;
      s+=bar(gx,y,gw,load,'load','var(--vas)',Math.round(load*100)+'%');y+=44;
      s+=bar(gx,y,gw,1-slipTyp*1.05,'contact · typical','var(--good)',Math.round(clamp(1-slipTyp*1.05)*100)+'%');y+=44;
      s+=bar(gx,y,gw,1-slipLax*1.05,'contact · lax','var(--variant)',Math.round(clamp(1-slipLax*1.05)*100)+'%');y+=44;
      s+=bar(gx,y,gw,m,'muscle co-contraction','var(--muscle)',Math.round(m*100)+'%');y+=50;
      s+=`<text x="${gx}" y="${y}" class="t-xs" style="fill:var(--ink)">Load pulls ${J.dir.split(' (')[0]}.</text>`;
      s+=`<text x="${gx}" y="${y+16}" class="t-xs">Values are illustrative.</text>`;
      s+=`<text x="${gx}" y="${y+32}" class="t-xs">Raise muscle control and</text><text x="${gx}" y="${y+46}" class="t-xs">replay: the lax joint stops</text><text x="${gx}" y="${y+60}" class="t-xs">at a subluxation.</text>`;
    }
    svg.innerHTML=s;setSt(ph);
    $('#joNote').innerHTML=noteHTML(STEPS[ph]);
    $('#joRead').innerHTML=J.read;
    $('#joMv').textContent=m<.34?'low':m<.67?'moderate':'trained';
  }
  const stop=playWire(rg,$('#joPlay'),draw,16000,'Replay','joints');
  mu.addEventListener('input',()=>draw(+rg.value));
  $$('[data-jojoint]').forEach(b=>b.addEventListener('click',()=>{jt=b.dataset.jojoint;$$('[data-jojoint]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- body map ---------- */
  const map=$('#joMap');let layer='disl',sel='shoulder';
  /* v: value for shading (0..1), lbl: short value label; d: detail html */
  const SITES=[
    {id:'jaw',n:'Jaw (TMJ)',x:180,y:66,disl:{v:.6,l:'reported'},pain:null,kids:null,
     d:`Among 42 people with hypermobility from inherited connective tissue disease (Marfan or EDS), 71.4% had temporomandibular disorder symptoms and 85.7% had disc displacement with reduction. Recurrent jaw dislocations were more frequent than in controls (P &lt; .01). <sup class="c" data-ref="DeCoster2005" title="Source 116">116</sup>`},
    {id:'neck',n:'Neck',x:180,y:90,disl:null,pain:{v:.76,l:'76%'},kids:null,
     d:`Neck pain was reported by 76% in an online survey of 396 people (80% hEDS) and by 90% vs 27% of controls in a Norwegian survey. Claims about craniocervical instability lack agreed imaging criteria; the evidence is level III–V. <sup class="c" data-ref="TeranWodzinski2023,Johannessen2016,Lohkamp2022" title="Source 227,278,459">227,278,459</sup>`},
    {id:'shoulder',n:'Shoulder',x:136,y:112,mirror:1,disl:{v:1,l:'main site'},pain:{v:.6,l:'60%'},kids:{v:.312,l:'31.2%'},
     d:`A main dislocation site in classical EDS. In 100 adults with HSD and shoulder complaints, 67 had mechanical symptoms; of those, 25% had dislocated before and 64% said the shoulder felt loose. Shoulder pain: 60% in an adult survey; 31.2% of children with EDS presented with it. <sup class="c" data-ref="Ritelli2020C,Liaghat2022APMR,TeranWodzinski2023,Stern2017" title="Source 267,385,452,459">267,385,452,459</sup>`},
    {id:'clav',n:'Collarbone (clavicle)',x:158,y:98,disl:{v:1,l:'main site'},pain:null,kids:null,
     d:`The clavicle is named among the main dislocation sites in 75 people with classical EDS. <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>`},
    {id:'upback',n:'Upper back',x:180,y:136,disl:null,pain:{v:.66,l:'66%'},kids:null,
     d:`Upper-back pain: 66% in the 2023 online survey (396 analysed, self-selected). <sup class="c" data-ref="TeranWodzinski2023" title="Source 459">459</sup>`},
    {id:'elbow',n:'Elbow and radius',x:120,y:172,mirror:1,disl:{v:1,l:'main site'},pain:null,kids:null,
     d:`The radius is named among the main dislocation sites in classical EDS. <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>`},
    {id:'lowback',n:'Lower back',x:180,y:190,disl:{v:.45,l:'described'},pain:{v:.76,l:'76%'},kids:{v:.322,l:'32.2%'},
     d:`Lower-back pain: 76% in the adult survey; the back was the presenting site for 32.2% of 205 children with EDS. Early disc degeneration and segmental instability are described in a consensus review without epidemiological data (Hypothesis). <sup class="c" data-ref="TeranWodzinski2023,Stern2017,Henderson2017" title="Source 207,452,459">207,452,459</sup>`},
    {id:'fingers',n:'Fingers and thumb',x:104,y:246,mirror:1,disl:{v:1,l:'main site'},pain:null,kids:null,
     d:`Digits are among the main dislocation sites in classical EDS. Finger position sense is impaired, and thumb-base osteoarthritis is the clearest osteoarthritis link with hypermobility. <sup class="c" data-ref="Ritelli2020C,Mallik1994,Jonsson1996" title="Source 229,294,385">229,294,385</sup>`},
    {id:'hip',n:'Hip',x:160,y:224,mirror:1,disl:{v:1,l:'main site'},pain:{v:.6,l:'60%'},kids:null,
     d:`A main dislocation site in classical EDS; hip pain was reported by 60% in the adult survey. After total hip replacement, 2 of 13 people with EDS dislocated vs 5.1% of controls (very small sample). <sup class="c" data-ref="Ritelli2020C,TeranWodzinski2023,Guier2020" title="Source 192,385,459">192,385,459</sup>`},
    {id:'knee',n:'Knee',x:160,y:318,mirror:1,disl:{v:.55,l:'instability'},pain:{v:.64,l:'64%'},kids:{v:.434,l:'43.4%'},
     d:`The commonest presenting site in 205 children with EDS (43.4%). Knee pain: 64% in the adult survey. Hypermobility at 13.8 years predicted knee pain at 17.8 years (OR 1.83), more so with obesity. Knee position sense is reduced. <sup class="c" data-ref="Stern2017,TeranWodzinski2023,Tobias2013,Hall1995" title="Source 202,452,459,463">202,452,459,463</sup>`},
    {id:'patella',n:'Kneecap (patella)',x:200,y:298,disl:{v:1,l:'aOR 16.3'},pain:null,kids:null,
     d:`In a US claims database of 91,747 people, patellofemoral instability had aOR 11.40 with a joint hypermobility syndrome diagnosis and 16.32 with EDS at 1 year. <sup class="c" data-ref="Kutschke2024" title="Source 258">258</sup>`},
    {id:'ankle',n:'Ankle and foot',x:158,y:404,mirror:1,disl:{v:.35,l:'sprains'},pain:null,kids:null,
     d:`Sprains were reported by 59.1% of adults and 25.8% of children with classical EDS, and 82.7% had bilateral flat feet. Hypermobility at 13.8 years predicted ankle/foot pain at 17.8 years (OR 1.82). <sup class="c" data-ref="Ritelli2020C,Tobias2013" title="Source 385,463">385,463</sup>`}];
  const LAY={disl:{t:'Instability & dislocation',lo:'reported',hi:'main site',src:`Dark: named among the main dislocation sites in 75 people with classical EDS; lighter: instability or dislocation reported in other studies. <sup class="c" data-ref="Ritelli2020C,Kutschke2024,DeCoster2005" title="Source 116,258,385">116,258,385</sup>`},
             pain:{t:'Pain sites, adults',lo:'0%',hi:'100%',src:`Share reporting pain at each site in an online survey of 396 people, 80% with hEDS (self-selected). <sup class="c" data-ref="TeranWodzinski2023" title="Source 459">459</sup>`},
             kids:{t:'Presenting sites, children',lo:'0%',hi:'50%',src:`Presenting site in 205 children with EDS aged 6–19 seen in orthopaedic or sports clinics. <sup class="c" data-ref="Stern2017" title="Source 452">452</sup>`}};
  function bodyPath(){const P=(x,y)=>x+' '+y;
    return `<circle cx="180" cy="44" r="24" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>
      <path d="M${P(170,66)}L${P(170,80)}L${P(190,80)}L${P(190,66)}Z" style="fill:var(--panel-2)"/>
      <path d="M${P(132,96)}Q${P(180,84)} ${P(228,96)}L${P(214,226)}Q${P(180,236)} ${P(146,226)}Z" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`+
      [[`M134 104L118 172L104 246`],[`M226 104L242 172L256 246`],[`M162 228L160 318L158 404`],[`M198 228L200 318L202 404`]].map(d=>`<path d="${d}" style="fill:none;stroke:var(--line);stroke-width:24;stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:20;stroke-linecap:round;stroke-linejoin:round"/>`).join('')}
  function drawMap(){let s=bodyPath();
    const pts=[];SITES.forEach(S=>{pts.push({S,x:S.x,y:S.y});if(S.mirror)pts.push({S,x:360-S.x,y:S.y})});
    pts.forEach(({S,x,y})=>{const L=S[layer],v=L?L.v:0,on=S.id===sel,r=on?13:10;
      const fill=L?`color-mix(in srgb, var(--vas) ${Math.round(18+v*82)}%, var(--panel))`:'var(--panel)';
      s+=`<g class="clk" data-josite="${S.id}" tabindex="0" role="button" aria-label="${S.n}${L?': '+L.l:': no data in this layer'}" aria-pressed="${on}">`;
      s+=`<circle class="ring" cx="${x}" cy="${y}" r="${r}" style="fill:${fill};stroke:${on?'var(--ink)':L?'var(--vas)':'var(--muted)'};stroke-width:${on?2.4:1.3};${L?'':'stroke-dasharray:3 2'}"/>`;
      s+=`</g>`});
    /* value labels for the selected layer, once per site */
    SITES.forEach(S=>{const L=S[layer];if(!L)return;const px=S.mirror?360-S.x:S.x,r=S.id===sel?13:10;
      s+=`<line x1="${px+r}" y1="${S.y}" x2="282" y2="${S.y}" style="stroke:var(--muted);stroke-width:.8;stroke-dasharray:2 2"/><text x="286" y="${S.y+4}" class="t-xs" style="fill:var(--ink);font-weight:600">${L.l}</text>`});
    map.innerHTML=s;
    const S=SITES.find(z=>z.id===sel),L=S[layer];
    $('#joMapNote').innerHTML=`<div class="kicker">${LAY[layer].t}</div><h4>${S.n}</h4><p><b>${L?L.l:'No figure in this layer'}</b></p><p>${S.d}</p><p class="stage-cap">${LAY[layer].src}</p>`;
    $('#joScale').innerHTML=`<span>${LAY[layer].lo}</span><i></i><span>${LAY[layer].hi}</span><span>· dashed ring: no data in this layer</span>`}
  map.addEventListener('click',e=>{const g=e.target.closest('[data-josite]');if(!g)return;sel=g.dataset.josite;drawMap();const f=map.querySelector(`[data-josite="${sel}"]`);f&&f.focus()});
  map.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest('[data-josite]');if(!g)return;e.preventDefault();sel=g.dataset.josite;drawMap();const f=map.querySelector(`[data-josite="${sel}"]`);f&&f.focus()});
  $$('[data-jolayer]').forEach(b=>b.addEventListener('click',()=>{layer=b.dataset.jolayer;$$('[data-jolayer]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMap()}));
  drawMap();
};
/* =============== 3.2 Pain & fatigue =============== */
inits.pain=()=>{
  const svg=$('#paSvg'),rg=$('#paT'),mb=$('#paMech');
  let mech=false;

  /* ---------- schematic curves over age 0..60 (shapes follow the descriptive phase model) ---------- */
  const AGE=60;
  const hyp=a=>.95-.72*ease(ramp(a,8,48));
  const pain=a=>.1+.62*ease(ramp(a,9,28))+.1*ramp(a,28,60);
  const stiff=a=>.06+.2*ramp(a,12,30)+.56*ease(ramp(a,28,56));
  /* illustrative split of the pain curve: nociceptive share falls, nociplastic share rises */
  const shares=a=>{const c=ramp(a,10,45);const no=.72-.32*c,ne=.12+.06*c;return [no,ne,1-no-ne]};
  const PHASES=[{a0:0,a1:10,t:'HYPERMOBILITY',c:'var(--dx)'},{a0:10,a1:30,t:'PAIN',c:'var(--vas)'},{a0:30,a1:60,t:'STIFFNESS',c:'var(--gold)'}];

  const STEPS=[
    {from:0,at:.08,k:'0–10 years',t:'Childhood: the hypermobility phase',
     txt:`In the descriptive natural-history model of hEDS, the first decade is a "hypermobility" phase: very flexible joints, with sprains and strains in about 40%. Pain at this stage is mostly linked to activity and injury. The model is based on clinical description and the authors' experience, not on a long-term cohort. <sup class="c" data-ref="Malek2021C,Castori2013" title="Source 76,288">76,288</sup>`,
     pt:`Children with hEDS are often very bendy. They may have more sprains than other children, but many do not yet have constant pain.`,
     hook:`hEDS phases: hypermobility (decade 1), then pain (decade 2), then stiffness (later adulthood). <sup class="c" data-ref="Malek2021C,Castori2013" title="Source 76,288">76,288</sup>`},
    {from:.17,at:.25,k:'10–20 years',t:'Adolescence: pain arrives',
     txt:`The second decade is the "pain" phase: widespread chronic pain begins, instability rises and hypermobility starts to fall. In the ALSPAC cohort of 2,901 teenagers, hypermobility at 13.8 years predicted at least moderately troublesome pain at 17.8 years in the shoulder (OR 1.68), knee (OR 1.83) and ankle/foot (OR 1.82). Pressure-pain thresholds in children with hypermobility syndrome/hEDS were 22% to 59% below normative values. <sup class="c" data-ref="Malek2021C,Tobias2013,Scheper2017Hyperalgesia" title="Source 288,415,463">288,415,463</sup>`,
     pt:`In the teenage years pain often becomes more frequent and spreads to more places. The body's pain alarm can start to go off more easily.`,
     hook:`ALSPAC: Beighton ≥ 6 at 13.8 y predicted knee pain at 17.8 y (OR 1.83; OR 11.01 with obesity). <sup class="c" data-ref="Tobias2013" title="Source 463">463</sup>`},
    {from:.34,at:.45,k:'20–30 years',t:'Young adults: pain and fatigue together',
     txt:`By adulthood pain is usually widespread and joined by fatigue. Women with hEDS had a mean pressure-pain threshold of 2.9 kg/cm² vs 5.2 in controls, lower even at sites where they had no pain: generalised hyperalgesia. More than three-quarters of 273 people with EDS reported severe fatigue, and orthostatic intolerance affected 74.4% of people with hEDS vs 34.3% of controls. <sup class="c" data-ref="Rombaut2015,Voermans2010Fatigue,DeWandele2016" title="Source 124,398,491">124,398,491</sup>`,
     pt:`Pain can be felt even in places that are not hurt, because the nervous system has become more sensitive. Tiredness is very common and has many causes, many of which can be worked on.`,
     hook:`Generalised hyperalgesia in hEDS: pressure-pain threshold 2.9 vs 5.2 kg/cm², even at pain-free sites. <sup class="c" data-ref="Rombaut2015" title="Source 398">398</sup>`},
    {from:.5,at:.7,k:'30–60 years',t:'Later: the stiffness phase',
     txt:`A later "stiffness" phase brings a marked loss of hypermobility and lower quality of life. After about age 33, most people diagnosed with hypermobility no longer reach a Beighton score of 4; in the general population, the chance of meeting the hypermobility cut-off falls about 5.5% per year of age. At diagnosis in an Italian registry, older age predicted moderate-to-severe pain (OR 1.06 per year). <sup class="c" data-ref="Malek2021C,Morri2026" title="Source 288,316">288,316</sup>`,
     pt:`Joints often get stiffer with age, so an adult may score low on flexibility tests even though they were very bendy as a child. Pain and tiredness can still be high.`,
     hook:`After about age 33, most people with diagnosed hypermobility no longer score ≥ 4 on the Beighton scale, so ask about past hypermobility. <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>`},
    {from:.84,at:.95,k:'Every age',t:'Not one path',
     txt:`The phase model is a teaching scaffold, not a forecast. Adults with hEDS/HSD fell into two severity clusters that did not mirror either the old or the 2017 criteria, and hEDS was more severe than HSD on only 3 of 16 items (pain, motricity problems and bleeding). Pain severity in a Dutch survey correlated with hypermobility, dislocations, previous surgery and poor sleep. <sup class="c" data-ref="Copetti2019,AubryRozier2021,Voermans2010" title="Source 20,104,490">20,104,490</sup>`,
     pt:`These curves describe groups of people, not what will happen to any one person. Some people have mild symptoms all their lives.`,
     hook:`hEDS vs HSD: different only on pain, motricity and bleeding (3 of 16 severity items) in 97 people. <sup class="c" data-ref="AubryRozier2021" title="Source 20">20</sup>`}];
  const setSt=stepWire($('#paSteps'),STEPS,rg,t=>draw(t),()=>stop());

  function draw(t){const N=vb(svg,'720 380','400 560'),W=N?400:720,ph=phaseOf(STEPS,t),age=t*AGE;
    const X0=N?44:60,X1=N?384:486,Y0=N?64:58,Y1=N?300:262;
    const xa=a=>X0+(X1-X0)*a/AGE,yv=v=>Y1-(Y1-Y0)*v;
    let s=`<text x="16" y="28" class="t-big">${STEPS[ph].t}</text>`;
    if(!N)s+=`<text x="${W-16}" y="28" class="t-sm t-end">age ${Math.round(age)} · ${ph+1} / 5</text>`;
    /* phase bands */
    PHASES.forEach(P=>{const on=age>=P.a0&&age<P.a1;s+=`<rect x="${f1(xa(P.a0))}" y="${Y0}" width="${f1(xa(P.a1)-xa(P.a0))}" height="${Y1-Y0}" style="fill:${P.c};opacity:${on?.12:.05}"/>`;
      s+=`<text x="${f1((xa(P.a0)+xa(P.a1))/2)}" y="${f1((Y0+Y1)/2+4)}" class="t-xs t-mid" style="fill:${P.c};font-weight:600;opacity:.8">${P.t}</text>`});
    /* axes */
    s+=`<line x1="${X0}" y1="${Y1}" x2="${X1}" y2="${Y1}" class="axis"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y1}" class="axis"/>`;
    for(let a=0;a<=60;a+=10)s+=`<line x1="${f1(xa(a))}" y1="${Y1}" x2="${f1(xa(a))}" y2="${Y1+4}" class="axis"/><text x="${f1(xa(a))}" y="${Y1+16}" class="t-xs t-mid">${a}</text>`;
    s+=`<text x="${X1}" y="${Y1+30}" class="t-xs t-end">age (years)</text><text x="${X0-6}" y="${Y0+4}" class="t-xs t-end">more</text><text x="${X0-6}" y="${Y1}" class="t-xs t-end">less</text>`;
    /* mechanisms overlay under the pain curve */
    if(mech){const L=[[],[],[]];for(let i=0;i<=60;i++){const a=i,p=pain(a),sh=shares(a);let acc=0;sh.forEach((v,k)=>{L[k].push([a,acc*p,(acc+v)*p]);acc+=v})}
      const cols=['var(--muscle)','var(--nerve)','var(--dx)'];
      L.forEach((pts,k)=>{let d='';pts.forEach((q,i)=>{d+=(i?'L':'M')+f1(xa(q[0]))+' '+f1(yv(q[2]))});for(let i=pts.length-1;i>=0;i--)d+='L'+f1(xa(pts[i][0]))+' '+f1(yv(pts[i][1]));
        s+=`<path d="${d}Z" style="fill:${cols[k]};opacity:.32"/>`})}
    /* the three curves, drawn up to the current age, faint beyond */
    const C=[[hyp,'var(--dx)','hypermobility'],[pain,'var(--vas)','pain'],[stiff,'var(--gold)','stiffness & fatigue']];
    const cut=clamp(age/AGE);
    C.forEach(([fn,col])=>{s+=`<path d="${pathFn(u=>1-fn(u*AGE),X0,X1,Y0,Y1)}" style="fill:none;stroke:${col};stroke-width:2;opacity:.22"/>`;
      if(cut>.005)s+=`<path d="${pathFn(u=>1-fn(u*cut*AGE),X0,xa(age),Y0,Y1,Math.max(4,Math.round(120*cut)))}" style="fill:none;stroke:${col};stroke-width:3;stroke-linecap:round"/>`});
    /* Beighton-at-33 marker */
    if(age>26){const op=ramp(age,26,33);s+=`<line x1="${f1(xa(33))}" y1="${f1(yv(hyp(33)))}" x2="${f1(xa(33))}" y2="${Y1}" style="stroke:var(--dx);stroke-width:1.2;stroke-dasharray:3 3;opacity:${f1(op)}"/><text x="${f1(xa(33)+4)}" y="${f1(yv(hyp(33))-8)}" class="t-xs" style="fill:var(--dx);opacity:${f1(op)}">~33 y: most score &lt; 4</text>`}
    /* now cursor and dots */
    s+=`<line x1="${f1(xa(age))}" y1="${Y0}" x2="${f1(xa(age))}" y2="${Y1}" style="stroke:var(--ink);stroke-width:1;opacity:.5"/>`;
    C.forEach(([fn,col])=>{s+=`<circle cx="${f1(xa(age))}" cy="${f1(yv(fn(age)))}" r="5" style="fill:${col};stroke:var(--panel);stroke-width:1.5"/>`});
    /* curve end labels */
    if(!N)C.forEach(([fn,col,l],i)=>{s+=`<text x="${X1+6}" y="${f1(yv(fn(60))+4+(i===2?-8:i===1?9:0))}" class="t-xs" style="fill:${col};font-weight:600">${l.split(' ')[0]}</text>`});
    /* side panel / lower panel with levels */
    const lv=v=>v<.3?'low':v<.55?'moderate':v<.75?'high':'very high';
    const rows=[['Hypermobility',hyp(age),'var(--dx)'],['Pain',pain(age),'var(--vas)'],['Stiffness, fatigue',stiff(age),'var(--gold)']];
    if(N){let y=362;s+=`<text x="24" y="${y-8}" class="t-sm" style="font-weight:600">AGE ${Math.round(age)} · ${ph+1} / 5</text>`;
      rows.forEach((r,i)=>{const yy=y+i*30;s+=`<text x="24" y="${yy+14}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><rect x="170" y="${yy+4}" width="150" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="170" y="${yy+4}" width="${f1(150*r[1])}" height="12" rx="6" style="fill:${r[2]}"/><text x="376" y="${yy+14}" class="t-sm t-end" style="fill:var(--ink)">${lv(r[1])}</text>`})}
    else{const px=588;s+=`<text x="${px}" y="76" class="t-sm" style="font-weight:600">AT AGE ${Math.round(age)}</text>`;
      rows.forEach((r,i)=>{const yy=92+i*44;s+=`<text x="${px}" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><rect x="${px}" y="${yy+16}" width="116" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${px}" y="${yy+16}" width="${f1(116*r[1])}" height="10" rx="5" style="fill:${r[2]}"/><text x="${px+116}" y="${yy+10}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${lv(r[1])}</text>`});
      if(mech){const sh=shares(age),nm=['nociceptive','neuropathic','nociplastic'],cl=['var(--muscle)','var(--nerve)','var(--dx)'];
        s+=`<text x="${px}" y="236" class="t-xs" style="fill:var(--ink)">pain mix (illustrative)</text>`;let xx=px;
        sh.forEach((v,k)=>{s+=`<rect x="${f1(xx)}" y="242" width="${f1(116*v)}" height="12" style="fill:${cl[k]};opacity:.75"/>`;xx+=116*v});
        nm.forEach((n,k)=>{s+=`<text x="${px}" y="${270+k*13}" class="t-xs" style="fill:${cl[k]}">■ ${n} ${Math.round(sh[k]*100)}%</text>`})}}
    /* the person walking along the bottom, growing up */
    const py=N?478:300,sz=lerp(N?30:24,N?52:44,ease(ramp(age,0,18))),pxp=N?lerp(30,370,cut):xa(age);
    s+=`<line x1="${N?16:X0}" y1="${py+sz+1}" x2="${N?384:X1}" y2="${py+sz+1}" style="stroke:var(--line);stroke-width:1"/>`;
    const stoop=ramp(age,45,60)*3;
    s+=`<g transform="translate(${f1(pxp-sz*.2)} 0) rotate(${f1(stoop)} ${f1(sz*.2)} ${f1(py+sz)})">${person(0,py,sz,'var(--ink)')}</g>`;
    if(pain(age)>.35){const n=Math.round(pain(age)*4);for(let i=0;i<n;i++){const a=-1.2+i*.7;s+=`<line x1="${f1(pxp+Math.cos(a)*sz*.38)}" y1="${f1(py+sz*.5+Math.sin(a)*sz*.38)}" x2="${f1(pxp+Math.cos(a)*sz*.52)}" y2="${f1(py+sz*.5+Math.sin(a)*sz*.52)}" style="stroke:var(--vas);stroke-width:2;stroke-linecap:round"/>`}}
    if(N)s+=`<text x="16" y="${py-10}" class="t-xs">0</text><text x="384" y="${py-10}" class="t-xs t-end">60 y</text>`;
    svg.innerHTML=s;setSt(ph);
    $('#paNote').innerHTML=noteHTML(STEPS[ph]);
  }
  function legend(){let h=`<span><i style="background:var(--dx)"></i>hypermobility</span><span><i style="background:var(--vas)"></i>pain</span><span><i style="background:var(--gold)"></i>stiffness &amp; fatigue</span>`;
    if(mech)h+=`<span><i style="background:var(--muscle)"></i>nociceptive (joint, tissue)<span class="ev est">Established</span></span><span><i style="background:var(--nerve)"></i>neuropathic<span class="ev early">Early evidence</span></span><span><i style="background:var(--dx);opacity:.5"></i>nociplastic / central sensitisation<span class="ev early">Early evidence</span></span><span>band sizes: <span class="ev hyp">Hypothesis</span>, illustrative only</span>`;
    $('#paLegend').innerHTML=h}
  const stop=playWire(rg,$('#paPlay'),draw,18000,'Replay','pain');
  mb.addEventListener('click',()=>{mech=!mech;mb.setAttribute('aria-pressed',mech);legend();draw(+rg.value)});
  legend();draw(+rg.value);

  /* ---------- mechanism loops ---------- */
  const MECH={
    tissue:{t:'Tissue injury (nociceptive)',ev:'<span class="ev est">Established</span>',col:'var(--muscle)',
      nodes:['Lax joint slips','Capsule, tendon, muscle strain','Nociceptors fire','Guarding, less use','Weaker, less control'],
      txt:`Pain is multifactorial. The 2017 pain consensus lists subluxations and dislocations, previous surgery, muscle weakness, proprioceptive disorders and spinal instability, as well as gut, jaw, menstrual and pelvic pain. In 273 Dutch people with EDS, pain severity correlated with hypermobility, dislocations, previous surgery and poor sleep. The weight of each cause is unknown. <sup class="c" data-ref="Chopra2017,Voermans2010" title="Source 90,490">90,490</sup>`,
      pt:`Joints that slip strain the tissues around them, and that hurts. Then people often protect the joint by using it less, which makes the muscles weaker and the joint less stable.`},
    central:{t:'Central sensitisation (nociplastic)',ev:'<span class="ev early">Early evidence</span> for the signs · <span class="ev hyp">Hypothesis</span> for the trigger',col:'var(--dx)',
      nodes:['Ongoing joint input','Spinal cord amplifies (wind-up)','Thresholds fall everywhere','Pain from less input'],
      txt:`In 27 people with JHS/hEDS, cold and heat pain thresholds were lower, wind-up was higher and fibromyalgia screening was positive, with no nerve damage on conduction studies or laser-evoked potentials; the authors propose that ongoing joint input "probably triggers" central sensitisation. Pressure-pain thresholds were 2.9 vs 5.2 kg/cm² in women with hEDS vs controls, and lower in children and adolescents too. Classical EDS showed weaker conditioned pain modulation. <sup class="c" data-ref="DiStefano2016,Rombaut2015,Scheper2017Hyperalgesia,SchubertHjalmarsson2025,Colman2023" title="Source 102,128,398,415,423">102,128,398,415,423</sup>`,
      pt:`After a long time in pain, the nervous system can turn its volume up. Then ordinary pressure or movement hurts more than it should, even in places that are not injured.`},
    sfn:{t:'Small-fibre neuropathy (neuropathic)',ev:'<span class="ev early">Early evidence</span> · disputed',col:'var(--nerve)',
      nodes:['Small nerve fibres in skin','Fewer fibres on biopsy','Burning, tingling','Less heat and touch feeling'],
      txt:`In a prospective controlled study, 19 of 31 people with hEDS (61%) met criteria for small-fibre neuropathy, with reduced nerve-fibre density at thigh and lower leg and generalised thermal and tactile hypoaesthesia; the authors call it "an important, but not the only" mechanism. All 24 adults with EDS in a smaller, selected biopsy series had reduced fibre density. Another study found no somatosensory nerve damage and favours central sensitisation. Status: unresolved. <sup class="c" data-ref="Igharo2023,Cazzato2016,DiStefano2016" title="Source 80,128,218">80,128,218</sup>`,
      pt:`Some people with hEDS have damage to the tiny nerves in the skin, which can cause burning or tingling. Not every study finds this, so doctors are still working out how common it is.`},
    sleep:{t:'The sleep and fatigue loop',ev:'<span class="ev early">Early evidence</span>',col:'var(--gold)',
      nodes:['Pain','Poor sleep','Fatigue','Less activity, deconditioning','Weakness'],
      txt:`More than three-quarters of 273 people with EDS had severe fatigue, linked to sleep disturbance, concentration problems, social functioning, low self-efficacy and pain. Weakness and pain each predicted fatigue. Obstructive sleep apnoea affected 32% vs 6% of matched controls, and orthostatic intolerance raised fatigue during tilt (+3.1 vs +0.5 points). Five predictors, four of them modifiable, explained 52.3% of fatigue variance in one sample. <sup class="c" data-ref="Voermans2010Fatigue,Voermans2011Fatigue,Gaisl2017,DeWandele2016,Krahe2018" title="Source 124,173,252,491,492">124,173,252,491,492</sup>`,
      pt:`Pain spoils sleep, poor sleep makes you tired, tiredness makes you move less, and moving less makes muscles weaker, which can mean more pain. Breaking the loop at any point can help.`}};
  const loop=$('#paLoop');let mk='tissue';
  function drawLoop(){const M=MECH[mk],n=M.nodes.length,cx=200,cy=138,rx=128,ry=88;let s=`<defs>${marker('paArr','var(--muted)')}</defs>`;
    const P=M.nodes.map((_,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return [cx+rx*Math.cos(a),cy+ry*Math.sin(a)]});
    /* the loop track */
    let d=`M${f1(cx)} ${f1(cy-ry)}A${rx} ${ry} 0 1 1 ${f1(cx-.1)} ${f1(cy-ry)}Z`;
    s+=`<path id="paTrack" d="${d}" style="fill:none;stroke:${M.col};stroke-width:2;opacity:.35"/>`;
    for(let i=0;i<n;i++){const a0=-Math.PI/2+(i+.32)*2*Math.PI/n,a1=-Math.PI/2+(i+.68)*2*Math.PI/n;
      s+=`<path d="M${f1(cx+rx*Math.cos(a0))} ${f1(cy+ry*Math.sin(a0))}A${rx} ${ry} 0 0 1 ${f1(cx+rx*Math.cos(a1))} ${f1(cy+ry*Math.sin(a1))}" class="arrow" marker-end="url(#paArr)"/>`}
    if(!RM)s+=`<circle r="6" style="fill:${M.col}"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#paTrack"/></animateMotion></circle>`;
    M.nodes.forEach((t,i)=>{const [x,y]=P[i],words=t.split(' '),lines=[];let cur='';words.forEach(w=>{if((cur+' '+w).trim().length>16){lines.push(cur.trim());cur=w}else cur+=' '+w});lines.push(cur.trim());
      const w=Math.max(...lines.map(l=>l.length))*7.3+18,h=lines.length*14+12;
      s+=`<rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${f1(w)}" height="${h}" rx="8" style="fill:var(--panel);stroke:${M.col};stroke-width:1.6"/>`;
      lines.forEach((l,k)=>{s+=`<text x="${f1(x)}" y="${f1(y-h/2+17+k*14)}" class="t-xs t-mid" style="fill:var(--ink);font-size:12px">${l}</text>`})});
    loop.innerHTML=s;
    $('#paMechTxt').innerHTML=`<div class="kicker">Mechanism</div><h4>${M.t}</h4><div>${M.ev}</div><p>${M.txt}</p><div class="pt"><b>In plain words</b>${M.pt}</div>`}
  $$('[data-pamech]').forEach(b=>b.addEventListener('click',()=>{mk=b.dataset.pamech;$$('[data-pamech]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawLoop()}));
  drawLoop();

  /* ---------- boom-bust vs paced (illustrative) ---------- */
  const pace=$('#paPace'),dr=$('#paD');let show='both';
  const BOOM=[88,28,18,38,92,24,14,34,86,30,20,46,90,26,18],PACED=[48,50,50,52,52,53,54,55,56,57,58,59,60,61,62];
  const ENV=d=>62+d*.5;
  function drawPace(t){const N=vb(pace,'720 300','400 400'),W=N?400:720,X0=N?40:56,X1=W-(N?16:150),Y0=N?40:34,Y1=N?250:236,days=14,cur=t*days;
    const xd=d=>X0+(X1-X0)*d/days,yv=v=>Y1-(Y1-Y0)*v/100;let s='';
    s+=`<line x1="${X0}" y1="${Y1}" x2="${X1}" y2="${Y1}" class="axis"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y1}" class="axis"/>`;
    for(let d=0;d<=days;d+=N?2:1)s+=`<text x="${f1(xd(d))}" y="${Y1+15}" class="t-xs t-mid">${d+1}</text>`;
    s+=`<text x="${X1}" y="${Y1+30}" class="t-xs t-end">day</text><text x="${X0-6}" y="${Y0+4}" class="t-xs t-end">high</text><text x="${X0-6}" y="${Y1}" class="t-xs t-end">low</text><text x="${X0+4}" y="${Y0-10}" class="t-xs">activity (schematic)</text>`;
    s+=`<path d="M${f1(xd(0))} ${f1(yv(ENV(0)))}L${f1(xd(days))} ${f1(yv(ENV(days)))}" style="stroke:var(--accent);stroke-width:1.6;stroke-dasharray:6 4"/><text x="${f1(xd(1.6))}" y="${f1(yv(ENV(1.6))-6)}" class="t-xs" style="fill:var(--accent)">comfort envelope</text>`;
    const series=(arr,col,on)=>{let d='';const k=Math.floor(cur),fr=cur-k;for(let i=0;i<=Math.min(k,days);i++)d+=(i?'L':'M')+f1(xd(i))+' '+f1(yv(arr[i]));
      if(k<days&&fr>0)d+='L'+f1(xd(k+fr))+' '+f1(yv(lerp(arr[k],arr[k+1],fr)));
      return `<path d="M${arr.map((v,i)=>f1(xd(i))+' '+f1(yv(v))).join('L')}" style="fill:none;stroke:${col};stroke-width:1.5;opacity:${on?.18:.08}"/><path d="${d}" style="fill:none;stroke:${col};stroke-width:${on?3:1.6};stroke-linejoin:round;opacity:${on?1:.3}"/>`};
    const bOn=show!=='paced',pOn=show!=='boom';
    s+=series(BOOM,'var(--vas)',bOn)+series(PACED,'var(--rx)',pOn);
    /* flares: a day over the envelope, followed by crash days */
    let flares=0,tb=0,tp=0;const k=Math.min(days,Math.floor(cur));
    for(let i=0;i<=k;i++){tb+=BOOM[i];tp+=PACED[i];if(BOOM[i]>ENV(i)){flares++;if(bOn)s+=`<circle cx="${f1(xd(i))}" cy="${f1(yv(BOOM[i]))}" r="6" style="fill:none;stroke:var(--vas);stroke-width:2"/><text x="${f1(xd(i))}" y="${f1(yv(BOOM[i])-10)}" class="t-xs t-mid" style="fill:var(--vas)">over</text>`}
      if(i>0&&BOOM[i]<30&&bOn)s+=`<text x="${f1(xd(i))}" y="${f1(yv(BOOM[i])+16)}" class="t-xs t-mid" style="fill:var(--vas)">crash</text>`}
    s+=`<line x1="${f1(xd(cur))}" y1="${Y0}" x2="${f1(xd(cur))}" y2="${Y1}" style="stroke:var(--ink);opacity:.4"/>`;
    const crash=BOOM.slice(0,k+1).filter((v,i)=>i>0&&v<30).length;
    const lx=N?X0:X1+16,ly=N?Y1+50:Y0+20;
    const L=[[`Boom-bust`,'var(--vas)',`${tb} units · ${flares} over · ${crash} crash days`],[`Paced`,'var(--rx)',`${tp} units · 0 over · 0 crash days`]];
    L.forEach((r,i)=>{if(N){s+=`<text x="${lx}" y="${ly+i*36}" class="t-sm" style="fill:${r[1]};font-weight:600">${r[0]}</text><text x="${lx}" y="${ly+i*36+15}" class="t-sm" style="fill:var(--ink)">${r[2]}</text>`}
      else{const p=r[2].split(' · ');s+=`<text x="${lx}" y="${ly+i*70}" class="t-sm" style="fill:${r[1]};font-weight:600">${r[0]}</text>`;p.forEach((q,j)=>{s+=`<text x="${lx}" y="${ly+i*70+15+j*14}" class="t-xs" style="fill:var(--ink)">${q}</text>`})}});
    pace.innerHTML=s;
    $('#paPaceRead').innerHTML=`<span>day <b>${Math.min(15,Math.floor(cur)+1)} of 15</b></span><span>boom-bust total <b>${tb}</b></span><span>paced total <b>${tp}</b></span><span>schematic units, <b>not trial data</b></span>`}
  playWire(dr,$('#paPlay2'),drawPace,9000,'Replay','pain');
  $$('[data-papace]').forEach(b=>b.addEventListener('click',()=>{show=b.dataset.papace;$$('[data-papace]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawPace(+dr.value)}));
  drawPace(+dr.value);
};
/* =============== 3.3 Skin, scars & bruising =============== */
inits.skin=()=>{
  const svg=$('#skSvg'),rg=$('#skT');
  let ty='c';

  /* ---------- the four skins (lifts are illustrative; cut-offs and features cited in the notes) ---------- */
  const TYPES={
    typ:{n:'Typical skin',col:'var(--good)',lift:1.0,thin:false,cut:6,scar:.05,bruise:.22,recoil:1,
      f:['stops below the cut-off','heals to a fine line','bruises only with real knocks']},
    h:{n:'Hypermobile EDS',col:'var(--dx)',lift:1.6,thin:false,cut:9,scar:.32,bruise:.45,recoil:1,
      f:['soft, velvety, mildly stretchy','atrophic scars possible, not papyraceous','true fragility is not typical']},
    c:{n:'Classical EDS',col:'var(--variant)',lift:3.0,thin:false,cut:22,scar:1,bruise:.72,recoil:1.25,
      f:['stretches far, snaps back','splits after minor trauma','wide, thin atrophic scars']},
    v:{n:'Vascular EDS',col:'var(--vas)',lift:.8,thin:true,cut:8,scar:.22,bruise:1,recoil:1,
      f:['thin, translucent, veins visible','not markedly stretchy','bruises without trauma']}};

  const STEPS=[
    {from:0,at:.08,k:'Step 1 · pinch',t:'Pinch',
     txt:`Skin hyperextensibility is measured by lifting the skin between finger and thumb. The cut-offs restated from the 2017 criteria are 1.5 cm at the distal forearms and the back of the hands, and 3 cm at the neck, elbows and knees. A dermatology review describes lifting from the back of the non-dominant distal forearm. <sup class="c" data-ref="Ritelli2020C,Stembridge2023,Malfait2017" title="Source 291,385,449">291,385,449</sup>`,
     pt:`A doctor gently pinches and lifts the skin on the back of the forearm or hand to see how far it stretches. Stretchy skin on its own does not mean EDS, and this is not a test to do on yourself.`,
     hook:`Skin hyperextensibility cut-offs: 1.5 cm at the distal forearm and back of the hand; 3 cm at the neck, elbows and knees. <sup class="c" data-ref="Ritelli2020C,Stembridge2023" title="Source 385,449">385,449</sup>`},
    {from:.15,at:.28,k:'Step 2 · stretch',t:'Stretch',
     txt:`Classical EDS skin is soft, velvety or doughy and hyperextensible, lifting well past the cut-off. hEDS skin is milder in every respect: soft or velvety with mild hyperextensibility. vEDS usually lacks marked hyperextensibility. Stretchiness rises with joint hypermobility: in benign joint hypermobility, forearm skin extensibility was 3.6 cm vs 1.3 cm in controls. <sup class="c" data-ref="Malfait2024GeneReviews,Stembridge2023,Magnusson2001" title="Source 286,293,449">286,293,449</sup>`,
     pt:`In classical EDS the skin can be pulled much further than usual. In hypermobile EDS it is a little stretchy and feels soft. In vascular EDS it hardly stretches, but it is thin.`,
     hook:`cEDS major criteria: generalised joint hypermobility plus skin hyperextensibility with atrophic scarring. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`},
    {from:.34,at:.42,k:'Step 3 · release',t:'Release',
     txt:`Let go, and classical EDS skin snaps back: it is elastic, not loose. That is the difference from the sagging, redundant skin of dermatosparaxis EDS, or the acquired cutis laxa and premature ageing seen in 41.3% of a cEDS cohort. On 20-MHz ultrasound, skin was thinner than normal in cEDS and hEDS. <sup class="c" data-ref="Malfait2024GeneReviews,Stembridge2023,Ritelli2020C,Eisenbeiss2003" title="Source 140,293,385,449">140,293,385,449</sup>`,
     pt:`Stretchy skin in classical EDS springs straight back when you let go, like a rubber band, rather than hanging loose.`,
     hook:`dEDS: ADAMTS-2 deficiency, extreme fragility and redundant, sagging skin at wrists and ankles. <sup class="c" data-ref="VanDamme2016,Stembridge2023" title="Source 449,474">449,474</sup>`},
    {from:.48,at:.56,k:'Step 4 · minor cut',t:'A minor injury',
     txt:`cEDS skin splits after minor trauma, especially over pressure points and the shins, and the wound gapes. In the col5a1+/− mouse model of cEDS, both normal and wounded skin had lower tensile strength. True skin fragility, such as an open wound from trivial trauma, is not a typical feature of hEDS. <sup class="c" data-ref="Malfait2024GeneReviews,Wenstrup2006,Stembridge2023" title="Source 293,449,503">293,449,503</sup>`,
     pt:`In classical EDS a small knock can split the skin open, often on the shins, knees or elbows. In hypermobile EDS this kind of splitting is not usual.`,
     hook:`Skin fragility (an open wound from trivial trauma) points away from hEDS and towards cEDS or other types. <sup class="c" data-ref="Stembridge2023" title="Source 449">449</sup>`},
    {from:.62,at:.72,k:'Step 5 · healing',t:'Healing: a fine line or a wide scar',
     txt:`Delayed healing with atrophic scars is a hallmark of cEDS: 92% of 75 confirmed people had extensive, widened atrophic scars, papyraceous in 65.3%, haemosiderotic in 54.7% and "cigarette paper" in 40%. The hEDS checklist allows atrophic scars at two or more sites without papyraceous or haemosiderin scars. vEDS scars are narrower than in cEDS. <sup class="c" data-ref="Malfait2020,Ritelli2020C,Stembridge2023,Malfait2017" title="Source 291,292,385,449">291,292,385,449</sup>`,
     pt:`Cuts in classical EDS often heal into wide, thin, shiny scars that look like crumpled paper, so wounds need extra care.`,
     hook:`cEDS signature: hyperextensible skin plus widened atrophic (papyraceous, haemosiderotic) scars, in 92% of confirmed cases. <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>`},
    {from:.8,at:.92,k:'Step 6 · bruise',t:'Bruising',
     txt:`Easy bruising occurs to a variable degree in all types, from fragile capillaries and perivascular tissue; clotting tests are usually normal. vEDS bruising occurs without trauma and at unusual sites such as the cheeks and back, and its thin, translucent skin shows the veins beneath, most on the backs of the hands, upper chest and shoulders. In a bleeding-score study, 62% of people with EDS scored abnormal vs 0% of controls. <sup class="c" data-ref="DePaepe2004,Stembridge2023,Kumskova2023" title="Source 120,257,449">120,257,449</sup>`,
     pt:`Bruises come easily because tiny blood vessels and the tissue around them are fragile, even though blood clotting tests are usually normal.`,
     hook:`EDS bruising: normal clotting factors, platelets and bleeding time; only the Hess (Rumpel-Leede) test may be abnormal. <sup class="c" data-ref="DePaepe2004" title="Source 120">120</sup>`}];
  const setSt=stepWire($('#skSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* ---------- timeline ---------- */
  function pullOf(t,T){if(t<.15)return .25*ease(ramp(t,0,.12));if(t<.34)return lerp(.25,1,ease(ramp(t,.15,.3)));
    /* release: overshoot below zero for elastic cEDS skin */
    const r=ramp(t,.34,.46);return Math.max(0,(1-ease(r))+(T.recoil>1?-.04*Math.sin(r*Math.PI*2)*(1-r):0))}

  function draw(t){const N=vb(svg,'720 380','400 560'),W=N?400:720,T=TYPES[ty],ph=phaseOf(STEPS,t);
    const x0=N?16:24,w=N?368:440,y0=N?280:262,H=N?118:96,ppc=N?40:38;
    const pull=pullOf(t,T),maxPx=T.lift*ppc,liftCm=T.lift*clamp(pull);
    const cutO=ease(ramp(t,.49,.56))*(1-ease(ramp(t,.63,.74))),heal=ease(ramp(t,.63,.76)),br=ease(ramp(t,.8,.92));
    let s=`<text x="16" y="28" class="t-big">${STEPS[ph].t}</text>`;
    if(!N)s+=`<text x="${W-16}" y="28" class="t-sm t-end">${T.n} · ${ph+1} / 6</text>`;
    /* ruler and threshold */
    const rx=x0+w/2+(N?70:84);
    for(let c=0;c<=3;c+=.5){const yy=y0-c*ppc;if(yy<52)break;s+=`<line x1="${rx}" y1="${f1(yy)}" x2="${rx+(c%1?5:9)}" y2="${f1(yy)}" style="stroke:var(--muted);stroke-width:1"/>`;if(c%1===0&&c>0)s+=`<text x="${rx+12}" y="${f1(yy+4)}" class="t-xs">${c} cm</text>`}
    s+=`<line x1="${rx}" y1="${y0}" x2="${rx}" y2="${f1(y0-3*ppc)}" style="stroke:var(--muted);stroke-width:1"/>`;
    const thY=y0-1.5*ppc;s+=`<line x1="${x0}" y1="${f1(thY)}" x2="${x0+w}" y2="${f1(thY)}" style="stroke:var(--accent);stroke-width:1.4;stroke-dasharray:6 4"/><text x="${x0+4}" y="${f1(thY-6)}" class="t-xs" style="fill:var(--accent);font-weight:600">1.5 cm cut-off</text>`;
    /* the skin */
    const sk=skin(x0,y0,w,{h:H,pull:clamp(pull),max:maxPx,thin:T.thin,fingers:pull>.02,scar:heal>0?Math.max(.001,heal*T.scar):0,bruise:br*T.bruise});
    s+=sk.svg;
    /* the cut: a V notch that gapes by type, then fills in as the scar forms */
    if(cutO>.01){const cx=x0+w*.75,g=T.cut*cutO,dep=H*(T.thin?.28:.42)*cutO;
      s+=`<path d="M${f1(cx-g/2-2)} ${y0}L${f1(cx)} ${f1(y0+dep)}L${f1(cx+g/2+2)} ${y0}Z" style="fill:var(--blood);opacity:.8;stroke:var(--skin-line);stroke-width:1"/>`;
      for(let i=0;i<3;i++)s+=`<circle cx="${f1(cx-4+i*4)}" cy="${f1(y0-3-i%2*3)}" r="${f1(1.6+cutO)}" style="fill:var(--blood);opacity:${f1(cutO*.8)}"/>`}
    if(heal>.6&&ty==='typ'){const cx=x0+w*.75;s+=`<line x1="${f1(cx-6)}" y1="${y0+.5}" x2="${f1(cx+6)}" y2="${y0+.5}" style="stroke:var(--skin-line);stroke-width:1.6"/>`}
    /* labels */
    const lx=x0+w+(N?0:12);
    if(!N){s+=`<text x="${x0+w+8}" y="${y0+8}" class="t-xs">epidermis</text><text x="${x0+w+8}" y="${f1(y0+H*(T.thin?.22:.36))}" class="t-xs">dermis</text><text x="${x0+w+8}" y="${f1(y0+H*.8)}" class="t-xs">fat</text>`}
    if(T.thin)s+=`<text x="${x0+8}" y="${f1(y0+H*.3+4)}" class="t-xs" style="fill:var(--vessel)">vein shows through</text>`;
    if(heal>.3)s+=`<text x="${f1(x0+w*.75)}" y="${f1(y0+H+16)}" class="t-xs t-mid" style="fill:var(--ink)">${ty==='typ'?'fine scar':ty==='c'?'widened atrophic scar':'atrophic scar'}</text>`;
    if(br>.3)s+=`<text x="${f1(x0+w*.25)}" y="${f1(y0+H+16)}" class="t-xs t-mid" style="fill:var(--nerve)">bruise${ty==='v'?' (no trauma)':''}</text>`;
    /* lift readout bubble at the apex */
    if(pull>.05){const ay=sk.top,over=liftCm>1.5;s+=`<rect x="${f1(x0+w/2-34)}" y="${f1(ay-62)}" width="68" height="20" rx="10" style="fill:var(--panel);stroke:${over?'var(--variant)':'var(--line)'};stroke-width:1.4"/><text x="${f1(x0+w/2)}" y="${f1(ay-48)}" class="t-sm t-mid" style="fill:${over?'var(--variant)':'var(--ink)'};font-weight:600">${liftCm.toFixed(1)} cm</text>`}
    /* side panel (wide) or lower panel (narrow) */
    const px=N?16:530,py=N?416:64,pw=N?368:174;
    s+=`<rect x="${px}" y="${py}" width="${pw}" height="${N?142:270}" rx="12" style="fill:var(--field);stroke:${T.col};stroke-width:1.4"/>`;
    s+=`<text x="${px+14}" y="${py+24}" class="t-lbl" style="fill:${T.col}">${T.n}</text>`;
    const maxNow=Math.max(liftCm,0);
    s+=`<text x="${px+14}" y="${py+44}" class="t-xs">lift now / at full stretch</text><text x="${px+14}" y="${py+64}" class="t-big" style="font-size:20px">${maxNow.toFixed(1)} / ${T.lift.toFixed(1)} cm</text>`;
    const over=T.lift>1.5;s+=`<text x="${px+14}" y="${py+82}" class="t-xs" style="fill:${over?'var(--variant)':'var(--good)'};font-weight:600">${over?'past':'below'} the 1.5 cm cut-off</text>`;
    if(N){T.f.forEach((f,i)=>{s+=`<text x="${px+14}" y="${py+104+i*14}" class="t-sm" style="fill:var(--ink)">· ${f}</text>`})}
    else{T.f.forEach((f,i)=>{const words=f.split(' ');let l1='',l2='';words.forEach(wd=>{(l1+' '+wd).trim().length<=26&&!l2?l1=(l1+' '+wd).trim():l2=(l2+' '+wd).trim()});
      const yy=py+112+i*44;s+=`<text x="${px+14}" y="${yy}" class="t-xs" style="fill:var(--ink)">· ${l1}</text>`;if(l2)s+=`<text x="${px+22}" y="${yy+13}" class="t-xs" style="fill:var(--ink)">${l2}</text>`});
      s+=`<text x="${px+14}" y="${py+256}" class="t-xs">illustrative lift</text>`}
    svg.innerHTML=s;setSt(ph);
    $('#skNote').innerHTML=noteHTML(STEPS[ph]);
    $('#skRead').innerHTML=`<span>skin <b>${T.n}</b></span><span>lift <b>${liftCm.toFixed(1)} cm</b></span><span>scar <b>${heal>.3?(ty==='typ'?'fine line':ty==='c'?'widened, atrophic':'atrophic, narrower'):'none yet'}</b></span><span>bruise <b>${br>.3?(ty==='v'?'large, spontaneous':ty==='typ'?'small':'moderate'):'none yet'}</b></span>`}
  const stop=playWire(rg,$('#skPlay'),draw,20000,'Replay','skin');
  $$('[data-sktype]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.sktype;$$('[data-sktype]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- flip cards ---------- */
  $$('#skCards .fc').forEach(c=>c.addEventListener('click',()=>{const on=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',on);c.classList.toggle('flip',on)}));

  /* ---------- matching exercise ---------- */
  const OPTS=[['typ','Not specific (common without EDS)'],['h','Hypermobile EDS'],['c','Classical EDS'],['v','Vascular EDS'],['d','Dermatosparaxis EDS']];
  const Q=[
    {q:'Thin, translucent skin with veins visible on the chest and backs of the hands',a:'v',why:`Typical of vEDS, which usually lacks marked hyperextensibility. <sup class="c" data-ref="Stembridge2023" title="Source 449">449</sup>`},
    {q:'Wide, paper-thin (papyraceous) or brown-stained (haemosiderotic) scars',a:'c',why:`Widened atrophic scars were present in 92% of confirmed cEDS; the hEDS checklist excludes papyraceous and haemosiderin scars. <sup class="c" data-ref="Ritelli2020C,Stembridge2023" title="Source 385,449">385,449</sup>`},
    {q:'Tears at or after birth, with redundant, sagging skin at the wrists and ankles',a:'d',why:`Extreme, premature fragility and redundant skin mark dEDS (ADAMTS-2 deficiency). <sup class="c" data-ref="Stembridge2023,VanDamme2016" title="Source 449,474">449,474</sup>`},
    {q:'Soft, velvety skin, only mildly stretchy, with unexplained stretch marks',a:'h',why:`These are 2017 hEDS skin items; hEDS skin is milder than cEDS in every respect. <sup class="c" data-ref="Stembridge2023,Malfait2017" title="Source 291,449">291,449</sup>`},
    {q:'Fleshy nodules with scars over the elbows and knees (molluscoid pseudotumours)',a:'c',why:`Rare, but highly diagnostic of cEDS. <sup class="c" data-ref="Ritelli2020C,Stembridge2023" title="Source 385,449">385,449</sup>`},
    {q:'Bruises on the cheeks and back without any injury',a:'v',why:`vEDS bruising occurs without trauma and at unusual sites. <sup class="c" data-ref="Stembridge2023" title="Source 449">449</sup>`},
    {q:'Soft bumps on the heels that appear on standing (piezogenic papules)',a:'typ',why:`72% of healthy children had at least one, and hypermobile children had no more than others, so the sign is not specific, though it is frequent in cEDS (86.7%). <sup class="c" data-ref="vanStraaten1991,Ritelli2020C" title="Source 385,483">385,483</sup>`}];
  const box=$('#skMatch');
  box.innerHTML=Q.map((x,i)=>`<div class="sk-row" id="skRow${i}"><p id="skQ${i}l">${i+1}. ${x.q}</p><select id="skQ${i}" aria-labelledby="skQ${i}l"><option value="">Choose a type…</option>${OPTS.map(o=>`<option value="${o[0]}">${o[1]}</option>`).join('')}</select><div class="fb" id="skFb${i}"></div></div>`).join('');
  function score(){let right=0,done=0;Q.forEach((x,i)=>{const v=$('#skQ'+i).value,row=$('#skRow'+i);row.classList.remove('ok','no');
      if(!v){$('#skFb'+i).innerHTML='';return}done++;const ok=v===x.a;if(ok)right++;row.classList.add(ok?'ok':'no');
      $('#skFb'+i).innerHTML=`<b>${ok?'Right.':'Not quite: '+OPTS.find(o=>o[0]===x.a)[1]+'.'}</b> ${x.why}`});
    $('#skScore').innerHTML=`<span>answered <b>${done} of ${Q.length}</b></span><span>correct <b>${right}</b></span>`}
  Q.forEach((x,i)=>$('#skQ'+i).addEventListener('change',score));
  score();
};
/* =============== 3.4 POTS & the autonomic link =============== */
/* Illustrative tilt-table curves. Only the thresholds are published values:
   POTS = sustained HR rise >=30 bpm within 10 min of standing or head-up tilt (>=40 bpm at ages 12-19),
   without orthostatic hypotension (sustained systolic fall >=20 mmHg); Vernino 2021, Sheldon 2015. */
const AU_P={
 typical:{n:'Typical response',hr0:68,rise:11,tau:.45,sb0:116,fall:2,ftau:.6,pool:.35},
 pots:{n:'POTS pattern',hr0:72,rise:43,tau:1.5,sb0:112,fall:3,ftau:.8,pool:.95},
 oh:{n:'Orthostatic hypotension',hr0:70,rise:15,tau:1,sb0:128,fall:31,ftau:1.4,pool:.8}
};
const auHR=(P,m)=>m<=0?P.hr0+Math.sin(m*5.1)*.8:P.hr0+P.rise*(1-Math.exp(-m/P.tau))+Math.sin(m*4.3)*1.1;
const auSB=(P,m)=>m<=0?P.sb0+Math.sin(m*3.7)*.7:P.sb0-P.fall*(1-Math.exp(-m/P.ftau))+Math.sin(m*3.1)*.9;
const auMin=t=>-2+12*t;
const AU_STEPS=[
 {from:0,at:.08,k:'Minutes −2 to 0',t:'Lying flat: the baseline',
  txt:`A head-up tilt test starts with the person resting flat on the table while heart rate and blood pressure settle. Every later number is read as a change from this lying baseline. An active stand test does the same with the person simply standing up from lying. <sup class="c" data-ref="Sheldon2015,Vernino2021" title="Source 431,488">431,488</sup>`,
  pt:`The lying numbers are the yardstick. What matters is how much they change when the person is brought upright.`,
  hook:`POTS is defined by a <b>change</b> in heart rate (lying to upright), not by a single fast pulse.`},
 {from:.155,at:.2,k:'Minute 0',t:'Tilt to 70°',
  txt:`The table swings the person to about 70°, nearly upright, with their feet on the footplate. Gravity now pulls blood down into the veins of the legs and abdomen, so less returns to the heart. The HRS 2015 consensus explains why EDS may add to this: abnormal connective tissue in the dependent veins can let them distend excessively under ordinary hydrostatic pressure. <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Sheldon2015" title="Source 431">431</sup>`,
  pt:`Standing up sends blood toward the legs. If the vein walls stretch more than usual, more of it stays there.`,
  hook:`The venous-compliance idea: lax connective tissue → veins distend → venous pooling → less return to the heart.`},
 {from:.3,at:.42,k:'Minutes 1–4',t:'Pooling, and the heart answers',
  txt:`With less blood coming back, the body speeds the heart to keep blood pressure up. In most people the rise is modest and settles. In the POTS pattern it climbs and stays high; in orthostatic hypotension the blood pressure itself falls. Symptoms reported on standing include light-headedness, palpitations, tremor, generalised weakness, blurred vision, exercise intolerance and fatigue. <sup class="c" data-ref="Sheldon2015" title="Source 431">431</sup>`,
  pt:`A racing heart on standing is the body trying to make up for blood pooling in the legs.`,
  hook:`Orthostatic symptoms: light-headedness, palpitations, tremor, weakness, blurred vision, exercise intolerance, fatigue.`},
 {from:.55,at:.75,k:'Minutes 5–10',t:'Sustained, or not?',
  txt:`The definition asks for a <b>sustained</b> rise within 10 minutes, not a brief spike as the table moves. A typical patient with POTS is female and aged 12 to 50 (female-to-male ratio over 4:1), and symptoms often begin in adolescence. Prevalence has not been properly studied: estimates, based largely on clinical experience, are 0.2% to 1% of the US population. <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>`,
  pt:`One quick jump in pulse is normal. POTS is about a rise that stays up while the person stays upright.`,
  hook:`POTS: mostly women aged 12–50, F:M over 4:1; estimated 0.2–1% of the US population (not properly studied).`},
 {from:.9,at:1,k:'Minute 10',t:'Reading the result',
  txt:`POTS: a sustained heart-rate rise of at least 30 beats/min within 10 minutes of standing or tilt (at least 40 at ages 12–19), <b>without</b> orthostatic hypotension (no sustained systolic fall of 20 mmHg or more), plus frequent orthostatic symptoms that improve rapidly on lying down. The Canadian Cardiovascular Society 2020 statement warns that many people without true POTS (symptoms without tachycardia, tachycardia without symptoms, or another overt cause) are given the label anyway. <sup class="c" data-ref="Vernino2021,Sheldon2015,Raj2020CCS" title="Source 374,431,488">374,431,488</sup>`,
  pt:`The numbers are only one part. Symptoms that ease when lying down, and ruling out other causes, matter as much.`,
  hook:`≥30 bpm (≥40 at 12–19) within 10 min, no systolic fall ≥20 mmHg, with symptoms. Orthostatic hypotension excludes POTS.`}
];
/* the illustrative cohort bars (published percentages) */
const AU_COH=[
 {g:0,l:'Joint hypermobility syndrome',s:'orthostatic intolerance · 27 vs 21',v:78,c:10,k:'Gazit2003'},
 {g:0,l:'Women with EDS-HT',s:'orthostatic intolerance · 39 vs 35',v:74,c:34,k:'DeWandele2014Mech'},
 {g:0,l:'hEDS/HSD adults',s:'POTS on autonomic testing · 102',v:48,c:null,k:'Celletti2020'},
 {g:0,l:'EDS-HT, tilt subsample',s:'postural tachycardia',v:41,c:null,k:'DeWandele2016'},
 {g:1,l:'Adults with POTS',s:'met 2017 hEDS criteria · 91',v:31,c:null,k:'Miller2020'},
 {g:1,l:'Children with POTS',s:'hEDS · 708',v:22.4,c:null,k:'Boris2018'},
 {g:1,l:'Children with POTS',s:'HSD · 708',v:34.9,c:null,k:'Boris2018'}
];
inits.autonomic=()=>{
  const svg=$('#auSvg'),rg=$('#auT');let P=AU_P.typical,pk='typical',teen=false;
  const thr=()=>teen?40:30;
  function chart(o){/* o: x0,x1,y0,y1,lo,hi,f,base,line,lineLbl,m,col,unit,ticks,name */
    let s=`<rect x="${o.x0}" y="${o.y0}" width="${o.x1-o.x0}" height="${o.y1-o.y0}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    const X=m=>lerp(o.x0,o.x1,(m+2)/12),Y=v=>lerp(o.y1,o.y0,(v-o.lo)/(o.hi-o.lo));
    o.ticks.forEach(v=>{s+=`<line x1="${o.x0}" x2="${o.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${o.x0-5}" y="${f1(Y(v)+3.5)}" class="t-xs t-end">${v}</text>`});
    [0,2,4,6,8,10].forEach(m=>s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${o.y1}" y2="${o.y1+4}" class="axis"/>`);
    s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${o.y0}" y2="${o.y1}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
    s+=`<line x1="${o.x0}" x2="${o.x1}" y1="${f1(Y(o.base))}" y2="${f1(Y(o.base))}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:1 3"/>`;
    s+=`<line x1="${f1(X(0))}" x2="${o.x1}" y1="${f1(Y(o.line))}" y2="${f1(Y(o.line))}" style="stroke:var(--vas);stroke-width:1.6;stroke-dasharray:6 4"/>`;
    s+=`<line x1="${o.x1-o.lineLbl.length*5.75-30}" x2="${o.x1-o.lineLbl.length*5.75-12}" y1="${o.y0+11}" y2="${o.y0+11}" style="stroke:var(--vas);stroke-width:1.6;stroke-dasharray:5 3"/><text x="${o.x1-6}" y="${o.y0+14}" class="t-xs t-end" style="fill:var(--vas);font-weight:600">${o.lineLbl}</text>`;
    s+=`<text x="${o.x0+8}" y="${o.y0+15}" class="t-lbl">${o.name}</text>`;
    let d='';for(let m=-2;m<=o.m+1e-6;m+=.05)d+=(d?'L':'M')+f1(X(m))+' '+f1(Y(clamp(o.f(m),o.lo,o.hi)));
    if(o.m>-2){const mm=Math.min(o.m,10),v=o.f(mm);d+='L'+f1(X(mm))+' '+f1(Y(clamp(v,o.lo,o.hi)));
      s+=`<path d="${d}" style="fill:none;stroke:${o.col};stroke-width:2.4;stroke-linejoin:round"/>`;
      const cx=X(mm),cy=Y(clamp(v,o.lo,o.hi));
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="4.5" style="fill:${o.col};stroke:var(--panel);stroke-width:1.5"/>`;
      const tx=cx>o.x1-70?cx-8:cx+8;s+=`<text x="${f1(tx)}" y="${f1(cy<o.y0+34?cy+17:cy-8)}" class="t-lbl ${cx>o.x1-70?'t-end':''}" style="fill:${o.col}">${Math.round(v)} ${o.unit}</text>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 620'),m=auMin(t),ang=70*ease(ramp(m,0,.35)),up=ang/70;
    const L=N?{fx:8,fy:8,fw:384,fh:262,px:232,py:128,s:1.45,floor:210,tx:20,ecg:[20,250,360],hrl:230,pl:[262,122],
               hr:[48,390,292,422],sb:[48,390,458,588],xl:606}
             :{fx:8,fy:8,fw:252,fh:364,px:140,py:196,s:1.45,floor:276,tx:22,ecg:[22,350,224],hrl:326,pl:[22,298],
               hr:[300,708,20,178],sb:[300,708,206,350],xl:368};
    let s=`<defs>${marker('auArr','var(--blood)')}</defs>`;
    s+=`<rect x="${L.fx}" y="${L.fy}" width="${L.fw}" height="${L.fh}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${L.tx}" y="${L.fy+22}" class="t-sm">HEAD-UP TILT</text>`;
    s+=`<text x="${L.tx}" y="${L.fy+48}" style="font:400 26px var(--display);fill:var(--ink)">${Math.round(ang)}°</text>`;
    s+=`<text x="${L.tx}" y="${L.fy+66}" class="t-xs">${m<0?'lying, baseline':'upright'} · min ${m<0?'−'+f1(-m):f1(m)}</text>`;
    s+=`<text x="${L.tx}" y="${L.fy+80}" class="t-xs" style="fill:var(--vas)">${P.n}</text>`;
    /* pedestal, floor, table and person */
    s+=`<rect x="${f1(L.px-8)}" y="${f1(L.py+46*L.s)}" width="16" height="${f1(L.floor-L.py-46*L.s)}" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
    s+=`<line x1="${L.fx+10}" x2="${L.fx+L.fw-10}" y1="${L.floor}" y2="${L.floor}" class="axis"/>`;
    const pool=P.pool*ramp(m,.1,2.2);
    s+=tilt(L.px,L.py,L.s,ang,{pool,col:'var(--ink)'});
    /* blood drifting from chest toward the legs while upright */
    if(up>.5){const Lb=120*L.s,by=-11*L.s;let dr='';
      for(let i=0;i<6;i++){const u=((m*.55+i/6)%1+1)%1,x=lerp(-.32,.36,u)*Lb;dr+=`<circle cx="${f1(x)}" cy="${f1(by+(i%2?1.5:-1.5)*L.s)}" r="${f1(1.9*L.s)}" style="fill:var(--blood);opacity:${f1(.9*bump(u,0,1)*P.pool)}"/>`}
      s+=`<g transform="translate(${L.px} ${L.py}) rotate(${f1(ang)})">${dr}</g>`;
      const a=ang*Math.PI/180,fx=L.px+Math.cos(a)*Lb*.28+10,fy=L.py+Math.sin(a)*Lb*.28,op=f1(ramp(m,.3,1)),[lx,ly]=L.pl;
      s+=`<path d="M${f1(lx+30)} ${f1(N?ly+8:ly-12)}Q${f1((lx+30+fx)/2)} ${f1(N?fy:ly-12)} ${f1(fx)} ${f1(fy)}" style="fill:none;stroke:var(--blood);stroke-width:1.4;opacity:${op}" marker-end="url(#auArr)"/>`;
      s+=`<text x="${lx}" y="${N?ly:ly+2}" class="t-xs" style="fill:var(--blood);opacity:${op}">venous pooling: ${P.pool>.9?'marked':P.pool>.5?'clear':'mild'}</text>`}
    /* ECG-style strip at the current heart rate */
    const hr=auHR(P,Math.min(m,10)),sb=auSB(P,Math.min(m,10));
    s+=`<text x="${L.tx}" y="${L.hrl}" class="t-sm">PULSE</text><text x="${L.tx+46}" y="${L.hrl}" class="t-lbl" style="fill:var(--vas)">${Math.round(hr)} bpm</text>`;
    s+=pulse(L.ecg[0],L.ecg[1],L.ecg[2],20,{bpm:hr,secs:5,phase:t*60,col:'var(--vas)'});
    /* charts */
    const [hx0,hx1,hy0,hy1]=L.hr,[bx0,bx1,by0,by1]=L.sb;
    s+=chart({x0:hx0,x1:hx1,y0:hy0,y1:hy1,lo:50,hi:140,ticks:[60,80,100,120],f:mm=>auHR(P,mm),base:P.hr0,line:P.hr0+thr(),
      lineLbl:N?`+${thr()} bpm (POTS${teen?', 12–19':''})`:`baseline +${thr()} bpm (POTS${teen?', age 12–19':''})`,m,col:'var(--vas)',unit:'bpm',name:'Heart rate'});
    s+=chart({x0:bx0,x1:bx1,y0:by0,y1:by1,lo:80,hi:140,ticks:[90,110,130],f:mm=>auSB(P,mm),base:P.sb0,line:P.sb0-20,lblBelow:true,
      lineLbl:N?'−20 mmHg (OH)':'baseline −20 mmHg (orthostatic hypotension)',m,col:'var(--dx)',unit:'mmHg',name:'Systolic BP'});
    [-2,0,2,4,6,8,10].forEach(mm=>s+=`<text x="${f1(lerp(bx0,bx1,(mm+2)/12))}" y="${L.xl}" class="t-xs ${mm===10?'t-end':'t-mid'}">${mm<0?'−2':mm}${mm===10?' min':''}</text>`);
    s+=`<text x="${f1(lerp(hx0,hx1,2/12)+4)}" y="${hy1-6}" class="t-xs">tilt</text>`;
    svg.innerHTML=s;
    /* readout and verdict */
    const rise=hr-P.hr0,fall=P.sb0-sb;
    let v='';if(m<.5)v='Baseline: nothing to judge yet.';
    else if(fall>=20)v=`Systolic fall of ${Math.round(fall)} mmHg: orthostatic hypotension, which excludes POTS.`;
    else if(rise>=thr())v=`Heart-rate rise +${Math.round(rise)} bpm with no systolic fall ≥20: the heart-rate pattern of POTS${m<3?' (it must stay up to count)':''}.`;
    else v=`Rise +${Math.round(rise)} bpm, below the ${thr()} bpm threshold; systolic change ${fall>=0?'−':'+'}${Math.abs(Math.round(fall))} mmHg.`;
    $('#auRead').innerHTML=`<span>Minute <b>${m<0?'−'+f1(-m):f1(m)}</b></span><span>HR <b>${Math.round(hr)}</b> (${rise>=0?'+':'−'}${Math.abs(Math.round(rise))})</span><span>Systolic <b>${Math.round(sb)}</b> (${fall>=0?'−':'+'}${Math.abs(Math.round(fall))})</span><span>${v}</span>`;
    const p=phaseOf(AU_STEPS,t);$('#auNote').innerHTML=noteHTML(AU_STEPS[p]);setSt(p);
  }
  const stop=playWire(rg,$('#auPlay'),draw,16000,'Replay','autonomic');
  const setSt=stepWire($('#auSteps'),AU_STEPS,rg,draw,stop);
  $$('[data-aup]').forEach(b=>b.addEventListener('click',()=>{pk=b.dataset.aup;P=AU_P[pk];
    $$('[data-aup]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#auTeen').addEventListener('click',e=>{teen=!teen;e.currentTarget.setAttribute('aria-pressed',teen);draw(+rg.value)});
  draw(+rg.value);

  /* ---- active stand teaching calculator ---- */
  const AU_T=[1,3,5,10],csvg=$('#auCalcSvg');
  const AU_EX={typical:{hr0:66,sb0:118,hr:[80,76,75,76],sb:[114,117,116,117],sym:false},
    pots:{hr0:70,sb0:110,hr:[98,104,106,109],sb:[108,109,107,108],sym:true},
    oh:{hr0:72,sb0:132,hr:[86,88,88,90],sb:[110,106,104,103],sym:true},
    brief:{hr0:68,sb0:116,hr:[101,84,80,79],sb:[110,114,115,115],sym:true}};
  const num=id=>{const v=parseFloat($('#'+id).value);return isFinite(v)?v:null};
  function load(k){const E=AU_EX[k];$('#auCHr0').value=E.hr0;$('#auCSb0').value=E.sb0;
    AU_T.forEach((tt,i)=>{$('#auCHr'+tt).value=E.hr[i];$('#auCSb'+tt).value=E.sb[i]});$('#auCSym').checked=E.sym;calc()}
  function calc(){
    const teenC=$('#auCAge').value==='teen',T=teenC?40:30,hr0=num('auCHr0'),sb0=num('auCSb0'),sym=$('#auCSym').checked;
    const rows=AU_T.map(tt=>{const h=num('auCHr'+tt),b=num('auCSb'+tt);return{tt,rise:h!=null&&hr0!=null?h-hr0:null,fall:b!=null&&sb0!=null?sb0-b:null}});
    const hrMet=rows.filter(r=>r.rise!=null&&r.rise>=T).length,ohMet=rows.filter(r=>r.fall!=null&&r.fall>=20).length;
    const nH=rows.filter(r=>r.rise!=null).length;
    const maxR=rows.reduce((a,r)=>r.rise!=null&&(a==null||r.rise>a.rise)?r:a,null),maxF=rows.reduce((a,r)=>r.fall!=null&&(a==null||r.fall>a.fall)?r:a,null);
    let cls='maybe',txt;
    if(hr0==null||nH===0)txt='Enter a lying heart rate and at least one standing reading.';
    else if(ohMet>=2){cls='no';txt=`Sustained systolic fall of 20 mmHg or more (largest ${Math.round(maxF.fall)} mmHg). These numbers fit orthostatic hypotension, and the published POTS definition requires its absence.`}
    else if(hrMet>=2&&sym){cls='yes';txt=`A rise of ${T} beats/min or more at ${hrMet} of ${nH} standing readings (largest +${Math.round(maxR.rise)} at ${maxR.tt} min), without a sustained systolic fall of 20 mmHg, and symptoms ticked. These numbers would meet the measurement part of the published definition. A diagnosis still needs a clinician: other causes must be ruled out.`}
    else if(hrMet>=2){txt=`The heart-rate rise reaches ${T} beats/min at ${hrMet} readings, but no orthostatic symptoms are ticked. Tachycardia without symptoms does not meet the definition.`}
    else if(hrMet===1){txt=`The rise reaches ${T} beats/min at only one reading (${rows.find(r=>r.rise!=null&&r.rise>=T).tt} min). This tool asks for it at two or more readings to call it sustained.`}
    else{cls='no';txt=`The largest rise is +${Math.round(maxR.rise)} beats/min, below the ${T} beats/min threshold${teenC?' for ages 12–19':''}.`}
    if(ohMet===1&&cls!=='no')txt+=' One reading shows a systolic fall of 20 mmHg or more; watch whether it is sustained.';
    $('#auCalcOut').innerHTML=`<div class="verdict ${cls}">${txt}</div>`;
    /* chart: rise bars up, fall bars down */
    const N=vb(csvg,'440 262','400 262'),x0=40,x1=N?390:430,yM=132,k=2.0;
    let s=`<line x1="${x0}" x2="${x1}" y1="${yM}" y2="${yM}" class="axis"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(yM-T*k)}" y2="${f1(yM-T*k)}" style="stroke:var(--vas);stroke-width:1.4;stroke-dasharray:6 4"/><line x1="${x0}" x2="${x0+22}" y1="252" y2="252" style="stroke:var(--vas);stroke-width:1.4;stroke-dasharray:5 3"/><text x="${x0+28}" y="255" class="t-xs" style="fill:var(--vas)">HR rise +${T}</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(yM+20*k)}" y2="${f1(yM+20*k)}" style="stroke:var(--dx);stroke-width:1.4;stroke-dasharray:6 4"/><line x1="${x0+150}" x2="${x0+172}" y1="252" y2="252" style="stroke:var(--dx);stroke-width:1.4;stroke-dasharray:5 3"/><text x="${x0+178}" y="255" class="t-xs" style="fill:var(--dx)">systolic fall 20 mmHg</text>`;
    
    const gw=(x1-x0)/4;
    rows.forEach((r,i)=>{const cx=x0+gw*(i+.5),bw=24;
      if(r.rise!=null){const h=clamp(r.rise,-10,48)*k;s+=`<rect x="${f1(cx-bw-2)}" y="${f1(Math.min(yM,yM-h))}" width="${bw}" height="${f1(Math.abs(h))}" rx="3" style="fill:var(--vas);opacity:${r.rise>=T?1:.45}"/><text x="${f1(cx-bw/2-2)}" y="${f1(Math.min(yM,yM-h)-4)}" class="t-xs t-mid" style="fill:var(--ink)">${r.rise>=0?'+':''}${Math.round(r.rise)}</text>`}
      if(r.fall!=null){const h=clamp(r.fall,-10,45)*k;s+=`<rect x="${f1(cx+2)}" y="${f1(Math.min(yM,yM+h))}" width="${bw}" height="${f1(Math.abs(h))}" rx="3" style="fill:var(--dx);opacity:${r.fall>=20?1:.45}"/><text x="${f1(cx+bw/2+2)}" y="${f1(Math.max(yM,yM+h)+12)}" class="t-xs t-mid" style="fill:var(--ink)">${r.fall>=0?'−':'+'}${Math.abs(Math.round(r.fall))}</text>`}
      s+=`<text x="${f1(cx)}" y="14" class="t-sm t-mid">${r.tt} min</text>`});
    csvg.innerHTML=s}
  $$('#m-autonomic .auc input,#auCAge').forEach(el=>el.addEventListener('input',calc));
  $('#auCAge').addEventListener('change',calc);$('#auCSym').addEventListener('change',calc);
  $$('[data-auex]').forEach(b=>b.addEventListener('click',()=>{load(b.dataset.auex);$$('[data-auex]').forEach(x=>x.setAttribute('aria-pressed',x===b))}));
  $('#auCReset').addEventListener('click',()=>{$$('#m-autonomic .auc input[type=number]').forEach(i=>i.value='');$('#auCSym').checked=false;$$('[data-auex]').forEach(x=>x.setAttribute('aria-pressed','false'));calc()});
  load('pots');$('[data-auex="pots"]').setAttribute('aria-pressed','true');

  /* ---- cohort bars ---- */
  const hsvg=$('#auCohSvg');let showC=false;
  function drawC(){const N=vb(hsvg,'720 330','400 520');
    const lx=N?14:20,bx=N?14:300,bw=N?300:330,rh=N?60:34;let s='',y=N?24:26;
    [[0,'Orthostatic problems in people with hypermobility'],[1,'Hypermobility in people with POTS']].forEach(([g,h])=>{
      s+=`<text x="${lx}" y="${y}" class="t-lbl">${h}</text>`;y+=12;
      AU_COH.filter(r=>r.g===g).forEach(r=>{
        if(N){s+=`<text x="${lx}" y="${y+14}" class="t-xs" style="fill:var(--ink);font-weight:600">${r.l}</text><text x="${lx}" y="${y+27}" class="t-xs">${r.s}</text>`}
        else{s+=`<text x="${lx}" y="${y+13}" class="t-xs" style="fill:var(--ink);font-weight:600">${r.l}</text><text x="${lx}" y="${y+25}" class="t-xs">${r.s}</text>`}
        const yy=N?y+33:y+5,hh=showC&&r.c!=null?11:(N?13:16);
        s+=`<rect x="${bx}" y="${yy}" width="${bw}" height="${hh}" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${yy}" width="${f1(bw*r.v/100)}" height="${hh}" rx="3" style="fill:${g?'var(--dx)':'var(--vas)'}"/>`;
        s+=`<text x="${f1(bx+bw*r.v/100+6)}" y="${yy+hh-2}" class="t-sm" style="fill:var(--ink)">${r.v}%</text>`;
        if(showC&&r.c!=null){s+=`<rect x="${bx}" y="${yy+13}" width="${f1(bw*r.c/100)}" height="9" rx="3" style="fill:var(--muted);opacity:.6"/><text x="${f1(bx+bw*r.c/100+6)}" y="${yy+21}" class="t-xs">${r.c}% controls</text>`}
        y+=rh});
      y+=10});
    s+=N?`<text x="${lx}" y="${y+2}" class="t-xs">Clinic and programme cohorts:</text><text x="${lx}" y="${y+15}" class="t-xs">percentages are not population prevalence.</text>`:`<text x="${lx}" y="${y+2}" class="t-xs">Clinic and programme cohorts; percentages are not population prevalence.</text>`;
    hsvg.innerHTML=s}
  $('#auCohCtl').addEventListener('click',e=>{showC=!showC;e.currentTarget.setAttribute('aria-pressed',showC);drawC()});
  drawC();
  const prevR=redraws.autonomic;redraws.autonomic=()=>{prevR&&prevR();calc();drawC()};
};
/* =============== 3.5 Gut, bladder & MCAS =============== */
/* evidence label colours: est = Established, early = Early evidence, hyp = Hypothesis */
const GU_EV={est:{n:'Established',c:'var(--good)',s:'var(--good-soft)'},early:{n:'Early evidence',c:'var(--warn)',s:'var(--warn-soft)'},hyp:{n:'Hypothesis',c:'var(--rx)',s:'var(--rx-soft)'}};
/* the seven stops. Numbers are published figures from clinic cohorts (see the note text for each source). */
const GU_S=[
 {o:'oes',n:'Oesophagus',tt:['Reflux, heartburn','and swallowing problems'],big:37.6,u:'%',bl:['had heartburn: 687 people with EDS,','Mayo Clinic, over 20 years'],ex:['GI clinic: undiagnosed hypermobility','raised the odds of heartburn (OR 1.66)'],ev:'early',p:[121,55]},
 {o:'sto',n:'Stomach',tt:['Slow or fast','stomach emptying'],big:22.3,u:'%',bl:['abnormal gastric emptying in those tested','(11.8% delayed, 10.5% accelerated)'],ex:['Delayed emptying is the most common','gut motility finding in POTS'],ev:'early',p:[166,126]},
 {o:'sb',n:'Small bowel',tt:['IBS-type symptoms','and functional dyspepsia'],big:39.0,u:'%',bl:['had joint hypermobility syndrome among','people with functional GI disorders'],cmp:[39.0,27.5,'functional GI','organic GI disease'],ex:['adjusted OR 1.51 (95% CI 1.07–2.12)'],ev:'est',p:[126,206]},
 {o:'col',n:'Colon',tt:['Constipation and','slow colonic transit'],big:38.6,u:'%',bl:['had constipation (Mayo EDS cohort);','61% of 435 children and young adults'],ex:['Colonic transit was abnormal in 28.3%','of those tested'],ev:'early',p:[188,222]},
 {o:'rec',n:'Rectum',tt:['Evacuatory dysfunction:','hard to empty the rectum'],big:32,u:'%',bl:['had joint hypermobility among 200 people','with rectal evacuatory dysfunction'],cmp:[32,14,'patients','controls'],ex:['Confirmed in 18 of 30 who had','anorectal manometry (Mayo)'],ev:'est',p:[138,300]},
 {o:'pf',n:'Pelvic floor',tt:['Pelvic organ','prolapse'],big:2.37,u:'×',pre:'OR ',bl:['pooled odds of prolapse with joint','hypermobility, 14 studies'],ex:['High heterogeneity (I² 77%);','six studies at high risk of bias'],ev:'est',p:[150,319]},
 {o:'bl',n:'Bladder',tt:['Urinary','incontinence'],big:73.3,u:'%',bl:['of 60 women with benign joint','hypermobility syndrome'],cmp:[73.3,48.3,'hypermobility','matched controls'],ex:['Anterior vaginal wall prolapse','was also more severe'],ev:'early',p:[102,292]}
];
const GU_AT=[.08,.22,.36,.51,.66,.8,.95];
/* routes between stops, in the body's own coordinates */
const GU_R=[
 [[120,4],[121,55]],
 [[121,55],[124,88],[129,104],[150,100],[166,126]],
 [[166,126],[160,146],[132,154],[114,152],[110,172],[130,186],[150,196],[126,206]],
 [[126,206],[96,216],[124,230],[148,240],[110,252],[72,264],[64,226],[66,190],[84,172],[168,172],[188,190],[188,222]],
 [[188,222],[188,252],[164,276],[138,280],[138,300]],
 [[138,300],[150,319]],
 [[150,319],[122,323],[102,292]]
];
function guAlong(pts,u){let tot=0;const seg=[];for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(l);tot+=l}
  let d=u*tot;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const f=seg[i]?clamp(d/seg[i]):0;return[lerp(pts[i][0],pts[i+1][0],f),lerp(pts[i][1],pts[i+1][1],f)]}d-=seg[i]}return pts[pts.length-1]}
const GU_STEPS=[
 {from:0,at:GU_AT[0],k:'Stop 1 of 7 · oesophagus',t:'Oesophagus',
  txt:`Of 687 people with EDS seen at Mayo Clinic over 20 years, 56% had gastrointestinal symptoms; heartburn was reported by 37.6%. In 552 new GI-clinic patients, a third had previously undiagnosed joint hypermobility syndrome, and they reported more heartburn (OR 1.66) and water brash (OR 2.02). In 435 children and young adults with hEDS or JHS, 32% had dysphagia and 21% eosinophilic oesophagitis. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Nelson2015Mayo,Fikree2014,Sood2024" title="Source 161,340,442">161,340,442</sup>`,
  pt:`These are problems seen more often in EDS clinics. They are associations, not features everyone with EDS has.`},
 {from:GU_AT[1]-.06,at:GU_AT[1],k:'Stop 2 of 7 · stomach',t:'Stomach',
  txt:`At Mayo, gastric emptying was abnormal in 22.3% of those tested: 11.8% delayed and 10.5% accelerated. In 12 of 17 hypermobility-syndrome patients with upper GI symptoms at a tertiary centre, emptying was delayed. Delayed gastric emptying is the most commonly reported GI motility abnormality in POTS, and the AGA (2025) advises timely gastric-function testing in hEDS/HSD with POTS and chronic upper GI symptoms. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Nelson2015Mayo,Zarate2010,Mehr2018,Aziz2025" title="Source 22,301,340,515">22,301,340,515</sup>`,
  pt:`The stomach can empty too slowly or too fast. Tests are advised when someone has POTS and ongoing upper-gut symptoms.`,
  hook:`Gastric emptying in EDS can be delayed <b>or</b> accelerated (Mayo: 11.8% vs 10.5% of those tested).`},
 {from:GU_AT[2]-.06,at:GU_AT[2],k:'Stop 3 of 7 · small bowel',t:'Small bowel',
  txt:`Joint hypermobility syndrome was more common in functional GI disorders than in organic GI disease (39.0% vs 27.5%; adjusted OR 1.51), and in 51% of those with postprandial distress syndrome. In 1,044 people with hEDS/HSD, 466 had functional foregut disorders plus IBS, 180 IBS alone and 337 no disorder of gut-brain interaction. The AGA suggests considering coeliac testing earlier in hEDS/HSD. <span class="ev est">Established</span> in clinic populations. <sup class="c" data-ref="Fikree2015,Choudhary2025,Aziz2025" title="Source 22,91,162">22,91,162</sup>`,
  pt:`Pain, bloating and fullness after meals without a visible cause on tests are common. The gut is real and sensitive, not imagined.`,
  hook:`Hypermobility is more common in functional than organic GI disorders: 39.0% vs 27.5%, aOR 1.51.`},
 {from:GU_AT[3]-.06,at:GU_AT[3],k:'Stop 4 of 7 · colon',t:'Colon',
  txt:`At Mayo, 38.6% of people with EDS had constipation and colonic transit was abnormal in 28.3% of those tested. In 435 children and young adults with hEDS or JHS, constipation was present in 61%. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Nelson2015Mayo,Sood2024" title="Source 340,442">340,442</sup>`,
  pt:`Constipation is one of the most common gut problems reported, especially in children and young people.`},
 {from:GU_AT[4]-.06,at:GU_AT[4],k:'Stop 5 of 7 · rectum',t:'Rectum',
  txt:`Joint hypermobility was found in 32% of 200 patients with rectal evacuatory dysfunction vs 14% of controls; on proctography, 86% of the hypermobile patients had structural abnormalities vs 64% without hypermobility. At Mayo, a rectal evacuation disorder was confirmed in 18 of 30 who had anorectal manometry. The AGA advises testing for functional defecation disorders in hEDS/HSD with lower GI symptoms, "given the high prevalence of pelvic floor dysfunction". <span class="ev est">Established</span> <sup class="c" data-ref="Mohammed2010,Nelson2015Mayo,Aziz2025" title="Source 22,310,340">22,310,340</sup>`,
  pt:`Sometimes the problem is not a slow bowel but difficulty emptying at the end. That needs different tests and treatment.`,
  hook:`AGA 2025: test for a functional defecation disorder in hEDS/HSD with lower GI symptoms (rectal hyposensitivity is common).`},
 {from:GU_AT[5]-.06,at:GU_AT[5],k:'Stop 6 of 7 · pelvic floor',t:'Pelvic floor',
  txt:`A meta-analysis of 14 studies found joint hypermobility associated with pelvic organ prolapse (pooled OR 2.37, 95% CI 1.54–3.64). Heterogeneity was high (I² 77%) and six studies were at high risk of bias, so the size of the effect is uncertain even though the direction is consistent. <span class="ev est">Established</span> <sup class="c" data-ref="VeitRubin2016" title="Source 486">486</sup>`,
  pt:`The pelvic floor is a sling of muscle and connective tissue. When the tissue is more stretchy, organs can sag more easily.`,
  hook:`Joint hypermobility and pelvic organ prolapse: pooled OR 2.37 (14 studies, I² 77%).`},
 {from:GU_AT[6]-.06,at:GU_AT[6],k:'Stop 7 of 7 · bladder',t:'Bladder',
  txt:`Urinary incontinence affected 73.3% of 60 women with benign joint hypermobility syndrome vs 48.3% of matched controls, and anterior vaginal wall prolapse was more severe. A pilot study of 21 people with EDS hypermobility type described gastrointestinal and pelvic dysfunction as characteristic additional features. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Mastoroudes2013,Castori2010" title="Source 74,299">74,299</sup>`,
  pt:`Leaking urine is more common, and it is worth mentioning: pelvic-floor assessment and treatment exist.`,
  hook:`Urinary incontinence: 73.3% in women with BJHS vs 48.3% of controls.`}
];
/* the MCAS scale: original studies are weights sized by participants; reviews and guidance hang as tags with no weight */
const GU_W=[
 {s:0,k:'Wang2021AAP',lab:'Wang 2021',n:195,nl:'195 people',ev:'early',d:`A retrospective coded-records study: MCAS was recorded in 31% of people with POTS plus EDS vs 2% of others (OR 32.46). Coding-based ascertainment limits the finding. <sup class="c" data-ref="Wang2021AAP" title="Source 493">493</sup>`},
 {s:0,k:'Lyons2016',lab:'Lyons 2016',n:35,nl:'35 families',ev:'early',d:`Hereditary alpha-tryptasemia (extra TPSAB1 copies) was first linked to raised basal tryptase, dysautonomia, IBS-like symptoms and joint hypermobility in 35 families. Raised basal tryptase is present in 4–6% of the general population. <sup class="c" data-ref="Lyons2016" title="Source 281">281</sup>`},
 {s:1,k:'Vazquez2022',lab:'Vazquez 2022',n:266,nl:'266 people',ev:'early',d:`132 people with HSD, 78 with hEDS and 56 with axial hypermobility were genotyped. Hereditary alpha-tryptasemia was no more common than in the general population (5–7% of Western populations); it was linked to dysphagia and retained primary teeth. <sup class="c" data-ref="Vazquez2022" title="Source 485">485</sup>`},
 {s:1,k:'Valdez2026',lab:'Valdez 2026',n:0,nl:'numbers not checked',ev:'early',d:`A 2026 Mayo Clinic study titled "Lack of evidence for increased mast cell activation syndrome prevalence in POTS and/or hEDS". No abstract was available to check its numbers, so it carries no weight here. <sup class="c" data-ref="Valdez2026" title="Source 472">472</sup>`},
 {s:0,k:'Seneviratne2017',lab:'Seneviratne 2017',rv:1,ev:'hyp',d:`An EDS consortium review of mast-cell biology. It proposes mast-cell dysregulation as a factor in a cluster of EDS, non-IgE hypersensitivity and dysautonomia. <sup class="c" data-ref="Seneviratne2017" title="Source 428">428</sup>`},
 {s:0,k:'Monaco2022',lab:'Monaco 2022',rv:1,ev:'hyp',d:`A supportive review proposing that mast-cell mediators could disrupt connective tissue and explain multisystem symptoms in hEDS/HSD. <sup class="c" data-ref="Monaco2022" title="Source 312">312</sup>`},
 {s:0,k:'Hakim2024GeneReviews',lab:'GeneReviews',rv:1,ev:'hyp',d:`The GeneReviews hEDS chapter lists inflammation from mast cell activation disorders among common features of hEDS: expert-level guidance, not a controlled study. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup>`},
 {s:1,k:'Kucharik2020',lab:'Kucharik 2020',rv:1,ev:'hyp',d:`A systematic search on the hEDS-POTS-MCAS "triad" found only 4 (narrow) to 9 (broad) original research articles, none studying all three together. It judged the evidence inadequate: overlapping vague symptoms and biased or outdated-criteria studies. <sup class="c" data-ref="Kucharik2020" title="Source 254">254</sup>`},
 {s:1,k:'Aziz2025',lab:'AGA 2025',rv:1,ev:'hyp',d:`The American Gastroenterological Association calls mechanistic evidence linking hEDS/HSD with POTS and MCAS limited and evolving, and does not support universal POTS or MCAS testing in hEDS/HSD. <sup class="c" data-ref="Aziz2025" title="Source 22">22</sup>`}
];
inits.gut=()=>{
  const svg=$('#guSvg'),rg=$('#guT');let cert=false;
  const idxAt=t=>{let i=-1;GU_AT.forEach((a,k)=>{if(t>=a)i=k});return i};
  function bolus(t){if(t<GU_AT[0])return guAlong(GU_R[0],ease(ramp(t,0,GU_AT[0])));
    const i=idxAt(t);if(i>=GU_AT.length-1)return GU_S[6].p;
    const a=GU_AT[i],b=GU_AT[i+1];return guAlong(GU_R[i+1],ease(ramp(t,a+(b-a)*.35,b)))}
  function organ(i,cur,vis){const S=GU_S[i],E=GU_EV[S.ev];
    if(cert)return{st:E.c,fi:E.s,w:cur?1.25:1};
    if(cur)return{st:'var(--vas)',fi:'var(--vas-soft)',w:1.25};
    return{st:vis?'var(--vas)':'var(--muted)',fi:vis?'var(--vas-soft)':'var(--panel-2)',w:1,op:vis?.75:1}}
  function tube(d,w,c,extra=''){return `<path d="${d}" style="fill:none;stroke:${c.st};stroke-width:${f1(w*c.w+2.4)};stroke-linecap:round;stroke-linejoin:round;opacity:${c.op||1}"/><path d="${d}" style="fill:none;stroke:${c.fi};stroke-width:${f1(w*c.w)};stroke-linecap:round;stroke-linejoin:round"/>${extra}`}
  function body(ci){const C=i=>organ(i,i===ci,i<ci);let s='';
    s+=`<path d="M100 0L100 18Q60 22 26 40Q14 46 16 70L22 170Q30 210 34 250Q22 290 34 342L206 342Q218 290 206 250Q210 210 218 170L224 70Q226 46 214 40Q180 22 140 18L140 0" style="fill:var(--panel);stroke:var(--line);stroke-width:1.4"/>`;
    s+=tube('M120 2C121 40 118 70 128 104',8,C(0));
    s+=tube('M130 106C160 94 182 112 174 138C166 158 134 160 114 150',18,C(1));
    s+=tube('M114 150C104 166 112 182 130 186C156 190 162 200 146 206C116 214 90 206 94 220C98 232 150 224 152 238C154 252 104 246 100 256C98 262 84 266 70 264',7,C(2));
    s+=tube('M66 268L64 190Q64 172 82 172L168 172Q188 172 188 190L188 252Q188 274 162 276L136 278',13,C(3));
    s+=tube('M136 278C141 288 140 300 134 314',11,C(4));
    const pf=C(5);s+=`<path d="M58 304Q120 346 182 304" style="fill:none;stroke:${pf.st};stroke-width:${f1(5*pf.w)};stroke-linecap:round;opacity:${pf.op||1}"/>`;
    const bl=C(6);s+=`<ellipse cx="102" cy="292" rx="21" ry="13" style="fill:${bl.fi};stroke:${bl.st};stroke-width:${f1(1.8*bl.w)};opacity:.92"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 690'),ci=Math.max(0,idxAt(t+1e-6)),p=phaseOf(GU_STEPS,t),S=GU_S[p],E=GU_EV[S.ev];
    const B=N?{x:80,y:14,k:1}:{x:34,y:20,k:1},P=N?{x:14,y:396,w:372,h:288}:{x:300,y:14,w:408,h:352};
    let s=`<rect x="${N?6:8}" y="${N?6:8}" width="${N?388:282}" height="${N?380:364}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<g transform="translate(${B.x} ${B.y}) scale(${B.k})">${body(t>=GU_AT[0]-.001?p:-1)}`;
    /* the travelling marker and stop dots */
    GU_S.forEach((st,i)=>{const on=i<=p&&t>=GU_AT[0]-.06;s+=`<circle cx="${st.p[0]}" cy="${st.p[1]}" r="3" style="fill:${on?(cert?GU_EV[st.ev].c:'var(--vas)'):'var(--muted)'};opacity:${on?1:.5}"/>`});
    const bp=bolus(t);s+=`<circle cx="${f1(bp[0])}" cy="${f1(bp[1])}" r="7" style="fill:var(--gold);stroke:var(--panel);stroke-width:2"/>`;
    /* label for the current stop beside the body */
    const lx=S.p[0]>130?S.p[0]+24:S.p[0]-24;
    s+=`<text x="${f1(lx)}" y="${f1(S.p[1]+4)}" class="t-lbl ${S.p[0]>130?'':'t-end'}" style="fill:${cert?E.c:'var(--vas)'}">${S.n}</text>`;
    s+=`</g>`;
    if(cert)s+=guLegend(N?16:20,N?376:362);
    /* the panel */
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="10" style="fill:var(--panel-2);opacity:.55"/>`;
    let y=P.y+24;const x=P.x+16;
    s+=`<text x="${x}" y="${y}" class="t-sm">STOP ${p+1} OF 7 · ${S.n.toUpperCase()}</text>`;y+=26;
    S.tt.forEach(l=>{s+=`<text x="${x}" y="${y}" style="font:400 ${N?19:21}px var(--display);fill:var(--ink)">${l}</text>`;y+=N?22:25});
    const f=ramp(t,GU_STEPS[p].from,GU_STEPS[p].at),val=S.big*ease(f);
    y+=N?24:30;s+=`<text x="${x}" y="${y}" style="font:400 ${N?36:42}px var(--display);fill:${cert?E.c:'var(--vas)'}">${S.pre||''}${S.big<10?val.toFixed(2):val.toFixed(1).replace(/\.0$/,'')}${S.u==='%'?'%':''}</text>`;
    y+=N?18:20;S.bl.forEach(l=>{s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${l}</text>`;y+=14});
    if(S.cmp){y+=6;const bw=P.w-32-(N?110:120),[a,b,la,lb]=S.cmp;
      [[a,la,cert?E.c:'var(--vas)'],[b,lb,'var(--muted)']].forEach(([v,l,c])=>{const w=bw*v/100*ease(f);
        s+=`<text x="${x}" y="${y+10}" class="t-xs">${l}</text><rect x="${x+(N?110:120)}" y="${y}" width="${f1(bw)}" height="12" rx="3" style="fill:var(--panel)"/><rect x="${x+(N?110:120)}" y="${y}" width="${f1(w)}" height="12" rx="3" style="fill:${c}"/><text x="${f1(x+(N?110:120)+w+5)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${(v*ease(f)).toFixed(1)}%</text>`;y+=18})}
    y+=8;S.ex.forEach(l=>{s+=`<text x="${x}" y="${y}" class="t-xs">${l}</text>`;y+=13});
    const cw=E.n.length*7.2+18,cy=P.y+P.h-34;
    s+=`<rect x="${x}" y="${cy}" width="${f1(cw)}" height="22" rx="5" style="fill:${E.s}"/><text x="${f1(x+cw/2)}" y="${cy+15}" class="t-sm t-mid" style="fill:${E.c};font-weight:600">${E.n.toUpperCase()}</text>`;
    s+=`<text x="${f1(x+cw+10)}" y="${cy+15}" class="t-xs">association in clinic cohorts</text>`;
    svg.innerHTML=s;
    $('#guNote').innerHTML=noteHTML(GU_STEPS[p]);setSt(p)}
  function guLegend(x,y){let s='';let xx=x;[['est','Established'],['early','Early evidence']].forEach(([k,l])=>{const E=GU_EV[k];
    s+=`<rect x="${xx}" y="${y-9}" width="12" height="10" rx="2" style="fill:${E.s};stroke:${E.c}"/><text x="${xx+16}" y="${y}" class="t-xs" style="fill:${E.c}">${l}</text>`;xx+=l.length*6.2+34});return s}
  const stop=playWire(rg,$('#guPlay'),draw,22000,'Replay','gut');
  const setSt=stepWire($('#guSteps'),GU_STEPS,rg,draw,stop);
  $('#guCert').addEventListener('click',e=>{cert=!cert;e.currentTarget.setAttribute('aria-pressed',cert);draw(+rg.value)});
  draw(+rg.value);

  /* ---- MCAS balance ---- */
  const msvg=$('#guScaleSvg');let showRv=false,sel=0,ang=0;
  const mass=s=>GU_W.filter(w=>w.s===s&&!w.rv).reduce((a,w)=>a+w.n,0);
  const target=()=>clamp((mass(1)-mass(0))/(mass(0)+mass(1))*30,-12,12);
  function drawS(){const N=vb(msvg,'720 340','400 400');
    const cx=N?200:360,py=N?150:118,half=N?150:250,a=ang*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a);
    const end=sd=>[cx+sd*half*ca,py+sd*half*sa];
    let s=`<path d="M${cx-20} ${N?300:290}L${cx} ${py+6}L${cx+20} ${N?300:290}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><line x1="${cx-(N?30:60)}" x2="${cx+(N?30:60)}" y1="${N?300:290}" y2="${N?300:290}" class="axis"/>`;
    s+=`<line x1="${f1(end(-1)[0])}" y1="${f1(end(-1)[1])}" x2="${f1(end(1)[0])}" y2="${f1(end(1)[1])}" style="stroke:var(--ink);stroke-width:4;stroke-linecap:round"/><circle cx="${cx}" cy="${py}" r="5" style="fill:var(--ink)"/>`;
    const heads=[['Reports a link','var(--vas)'],['No link, or evidence inadequate','var(--dx)']];
    [-1,1].forEach((sd,si)=>{const [ex,ey]=end(sd),pw=N?120:180,pyy=ey+(N?54:58);
      s+=`<line x1="${f1(ex)}" y1="${f1(ey)}" x2="${f1(ex-pw/2+8)}" y2="${f1(pyy)}" style="stroke:var(--muted)"/><line x1="${f1(ex)}" y1="${f1(ey)}" x2="${f1(ex+pw/2-8)}" y2="${f1(pyy)}" style="stroke:var(--muted)"/>`;
      s+=`<path d="M${f1(ex-pw/2)} ${f1(pyy)}Q${f1(ex)} ${f1(pyy+16)} ${f1(ex+pw/2)} ${f1(pyy)}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
      const hx=clamp(ex,N?70:110,N?330:610);
      s+=`<text x="${f1(hx)}" y="${N?22:22}" class="t-lbl t-mid" style="fill:${heads[si][1]}">${N&&si?'No link / inadequate':heads[si][0]}</text>`;
      /* weights on the pan */
      let wx=ex-pw/2+10;GU_W.filter(w=>w.s===si&&!w.rv).forEach(w=>{const i=GU_W.indexOf(w),sz=w.n?Math.max(18,Math.sqrt(w.n)*(N?2.6:3.3)):22,on=i===sel;
        s+=`<g class="clk" data-gw="${i}"><rect x="${f1(wx)}" y="${f1(pyy-sz)}" width="${f1(sz)}" height="${f1(sz)}" rx="4" style="fill:${w.n?(si?'var(--dx-soft)':'var(--vas-soft)'):'none'};stroke:${on?'var(--ink)':si?'var(--dx)':'var(--vas)'};stroke-width:${on?2.4:1.4};${w.n?'':'stroke-dasharray:3 3'}"/>`;
        s+=`<text x="${f1(wx+sz/2)}" y="${f1(pyy-sz/2+4)}" class="t-xs t-mid" style="fill:var(--ink)">${w.n||'?'}</text></g>`;
        s+=`<text x="${f1(wx+sz/2)}" y="${f1(pyy+(N?28:30))}" class="t-xs t-mid" style="fill:var(--ink)">${w.lab.split(' ')[0]}</text>`;wx+=sz+(N?16:12)});
      /* review tags hang from the beam, adding no weight */
      if(showRv){let k=0;GU_W.filter(w=>w.s===si&&w.rv).forEach(w=>{const i=GU_W.indexOf(w),tx=N?cx+sd*(k%2?118:72):lerp(cx,ex,.2+k*.22),ty=py+(tx-cx)*Math.tan(a),on=i===sel,ly=N?262+k*24:ty+44+k*26;
        s+=`<line x1="${f1(tx)}" y1="${f1(ty)}" x2="${f1(tx)}" y2="${f1(ly-12)}" style="stroke:var(--muted);stroke-dasharray:2 2"/>`;
        const tw=w.lab.length*(N?5.6:6.4)+12;s+=`<g class="clk" data-gw="${i}"><rect x="${f1(tx-tw/2)}" y="${f1(ly-12)}" width="${f1(tw)}" height="17" rx="8" style="fill:var(--panel);stroke:${on?'var(--ink)':'var(--rx)'};stroke-width:${on?2:1}"/><text x="${f1(tx)}" y="${f1(ly)}" class="t-xs t-mid" style="fill:var(--rx)">${w.lab}</text></g>`;k++})}
    });
    const lab=Math.abs(ang)<4?'Nearly level: unsettled':'Tilted';
    s+=`<text x="${cx}" y="${N?348:316}" class="t-lbl t-mid">${lab}</text>`;
    s+=`<text x="${cx}" y="${N?366:332}" class="t-xs t-mid">Weights = participants only; the scale ignores study quality.</text>`;
    if(N)s+=`<text x="${cx}" y="${382}" class="t-xs t-mid">Tap a weight${showRv?' or tag':''} for details.</text>`;
    msvg.innerHTML=s;
    const W=GU_W[sel];$('#guScaleNote').innerHTML=`<div class="kicker">${W.rv?'Review or guidance · adds no participants':'Original study · '+W.nl}</div><h4>${W.lab}</h4><p><span class="ev ${W.ev}">${GU_EV[W.ev].n}</span></p><p>${W.d}</p>`;
    $$('[data-gwb]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.gwb===sel))}
  msvg.addEventListener('click',e=>{const g=e.target.closest('[data-gw]');if(!g)return;sel=+g.dataset.gw;drawS()});
  $('#guRv').addEventListener('click',e=>{showRv=!showRv;e.currentTarget.setAttribute('aria-pressed',showRv);drawS()});
  $('#guWts').innerHTML=GU_W.map((w,i)=>`<button class="btn ${w.rv?'ghost':''}" data-gwb="${i}" aria-pressed="${i===sel}">${w.lab}</button>`).join('');
  $('#guWts').addEventListener('click',e=>{const b=e.target.closest('[data-gwb]');if(!b)return;sel=+b.dataset.gwb;if(GU_W[sel].rv&&!showRv){showRv=true;$('#guRv').setAttribute('aria-pressed','true')}drawS()});
  ang=target();drawS();

  /* ---- the 20% + 2 tryptase formula ---- */
  function tr(){const b=parseFloat($('#guTry').value);const o=$('#guTryOut');
    if(!isFinite(b)||b<0){o.innerHTML='Enter a baseline tryptase in ng/mL.';return}
    const th=b*1.2+2;o.innerHTML=`Baseline <b>${f1(b)}</b> ng/mL → an event-related level of at least <b class="big-num" style="font-size:30px">${th.toFixed(1)}</b> ng/mL would meet the consensus rise (${f1(b)} × 1.2 + 2).`}
  $('#guTry').addEventListener('input',tr);tr();
  const prevR=redraws.gut;redraws.gut=()=>{prevR&&prevR();drawS()};
};
/* =============== 3.6 Vascular EDS =============== */
inits.vascular=()=>{
  /* small text helpers (local to this module) */
  const T=(x,y,s,cls='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const TL=(x,y,lines,cls,lh,st)=>lines.map((l,i)=>T(x,y+i*lh,l,cls,st)).join('');
  const R=(x,y,w,h,st,rx=0)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const press=(sel,attr,val)=>$$(sel).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[attr]===val)));

  /* ================= 1. the artery: wall, fault, tear, dissection, rupture ================= */
  let wall='veds';
  const svg=$('#vaSvg'),rg=$('#vaT');
  const STEPS=[
    {from:0,at:.1,k:'Step 1 · anatomy',t:'Three wall layers',
     txt:`A medium artery has three layers: the intima lining the channel (lumen), the muscular media, and the outer adventitia. Type III collagen, built from three identical α1(III) chains, is found in skin, blood vessels and the intestine, and is a major protein of vessel walls and hollow organs. <sup class="c" data-ref="Shoulders2009,Byers2017" title="Source 67,432">67,432</sup>`,
     pt:`Type III collagen is part of the scaffolding that keeps artery walls and the bowel strong.`,
     hook:`Type III collagen = α1(III)<sub>3</sub>, encoded by <i>COL3A1</i>; vascular EDS is the <i>COL3A1</i> type.`},
    {from:.18,at:.32,k:'Step 2 · the fault',t:'Faulty or too little type III collagen',
     txt:`vEDS is autosomal dominant: one copy of <i>COL3A1</i> is changed. In a Dutch cohort, 76.8% of variants were predicted to act dominant-negatively, where faulty chains are built into the molecule. The commonest kind replaces a glycine, the residue needed at every third position of the helix. Null variants work differently: they reduce the amount of protein. In the vEDS setting of the animation, the media thins (schematic). <sup class="c" data-ref="Byers2017,Demirdas2024,Shoulders2009,Schwarze2001" title="Source 67,118,424,432">67,118,424,432</sup>`,
     pt:`In vEDS the body builds artery walls with weak or too little collagen III, so the walls are fragile.`,
     hook:`Gly-X-Y: glycine every third residue. Glycine substitutions are the commonest vEDS variant class. <sup class="c" data-ref="Shoulders2009,Frank2015" title="Source 169,432">169,432</sup>`},
    {from:.38,at:.49,k:'Step 3 · tear',t:'An intimal tear',
     txt:`Arterial rupture may be preceded by aneurysm, arteriovenous fistula or dissection, or may happen without warning. In vEDS the aorta and its branches can rupture or dissect "even without significant dilation", so a normal-sized artery is not proof of safety. Across 11 US institutions, 61.6% of people with confirmed vEDS had arterial pathology, at a median age of 33. <sup class="c" data-ref="Byers2025GeneReviews,Isselbacher2022,Shalhub2019JVS" title="Source 68,219,429">68,219,429</sup>`,
     pt:`A small split in the inner lining lets blood push into the wall of the artery.`,
     hook:`The most commonly affected arterial bed in confirmed vEDS: mesenteric arteries (31.7%). <sup class="c" data-ref="Shalhub2019JVS" title="Source 429">429</sup>`},
    {from:.56,at:.67,k:'Step 4 · dissection',t:'Dissection: a false lumen',
     txt:`Blood tracking along the media splits the wall and opens a false channel beside the true one. vEDS favours medium-sized arteries: after the mesenteric arteries come cerebrovascular (16.5%), iliac (16.5%) and renal (12.2%) arteries. Most arterial disease in that cohort was managed medically; when intervention was needed, embolisation (13.4%) and stenting (2.5%) were the main approaches. <sup class="c" data-ref="Shalhub2019JVS" title="Source 429">429</sup>`,
     pt:`The blood digs a second channel inside the wall, which weakens it further.`,
     hook:`Arterial rupture or dissection under 40 is among the major criteria proposed as indications for vEDS testing. <sup class="c" data-ref="Demirdas2024" title="Source 118">118</sup>`},
    {from:.74,at:.84,k:'Step 5 · rupture',t:'Rupture',
     txt:`Most deaths in vEDS result from arterial rupture. Bowel rupture, often of the sigmoid colon, makes up about a quarter of complications but rarely causes death. In France the first events were arterial in 48% and digestive in 24%, at a median age of 29. 37.4% of arterial events presented as emergencies. <sup class="c" data-ref="Pepin2000,Frank2015,Shalhub2019JVS" title="Source 169,363,429">169,363,429</sup>`,
     pt:`When the wall gives way, blood escapes from the artery. This is life-threatening and needs a hospital at once.`,
     hook:`vEDS deaths: mostly arterial rupture. Classic gut event: spontaneous sigmoid colon perforation. <sup class="c" data-ref="Pepin2000,ElMasri2018" title="Source 142,363">142,363</sup>`},
    {from:.9,at:.98,k:'Step 6 · act',t:'Emergency: act on sudden pain',
     txt:`Dissection or rupture of a vessel, perforation of the gut or rupture of an organ is how most adults with vEDS present. GeneReviews advises immediate medical attention for sudden, unexplained pain, and carrying documentation of the diagnosis. A 2026 review describes emergency care in vEDS as "deliberately counter-intuitive": it avoids catheter angiography, elective endoscopy and unnecessary surgery. <sup class="c" data-ref="Byers2025GeneReviews,Byers2017,Corrao2026" title="Source 67,68,106">67,68,106</sup>`,
     pt:`For someone with vEDS, sudden severe pain is an emergency. Get help straight away and show the vEDS card.`,
     hook:`Avoid diagnostic arteriography in vEDS: one historical series reported a 67% complication rate. <sup class="c" data-ref="Cikrit1987,Byers2025GeneReviews" title="Source 68,94">68,94</sup>`}
  ];
  const SITES=[['mesenteric',31.7],['cerebrovascular',16.5],['iliac',16.5],['renal',12.2]];
  function panel(L,t,p,V){
    const x=L.px,y=L.py,w=L.pw;let s=R(x,y,w,L.ph,'fill:var(--field);stroke:var(--line)',12);
    const ix=x+14,iw=w-28;let yy=y+24;
    const head=(a,c='var(--ink)')=>{s+=T(ix,yy,a,'t-lbl',`fill:${c}`);yy+=20};
    if(!V&&p>=2){head('Typical wall');
      s+=TL(ix,yy,['Shown for comparison: a thicker','media between the blood and','the outside (schematic).','','The tear sequence is drawn on','the vEDS wall. Press','"vEDS wall" to see it.'],'t-sm',16);
      s+=helix(ix,y+L.ph-34,iw,{amp:7,phase:t*3});return s}
    if(p===0){head('Type III collagen');
      s+=TL(ix,yy,['three identical α1(III) chains','in skin, blood vessels and','the intestine'],'t-sm',15);yy+=58;
      s+=helix(ix,yy,iw,{amp:7,phase:t*3});yy+=26;
      s+=fibril(ix,yy,iw,{rows:5,rh:6,grow:1,seed:7}).svg;yy+=44;
      s+=T(ix,yy,'molecules pack into fibrils','t-xs');return s}
    if(p===1){if(!V){head('Typical type III collagen');s+=TL(ix,yy,['every third residue glycine;','fibrils pack tightly'],'t-sm',15);yy+=44;s+=helix(ix,yy,iw,{amp:7,phase:t*3});yy+=30;s+=fibril(ix,yy,iw,{rows:5,grow:1,seed:7}).svg;return s}
      head('One changed COL3A1 copy','var(--vas)');
      s+=T(ix,yy,'Glycine substitution','t-xs','fill:var(--ink)');yy+=22;
      s+=helix(ix,yy,iw,{amp:7,phase:t*3,kink:.5});yy+=26;
      s+=T(ix,yy,'76.8% dominant-negative (Dutch cohort)','t-xs');yy+=22;
      s+=T(ix,yy,'Null variant: less protein made','t-xs','fill:var(--ink)');yy+=8;
      s+=fibril(ix,yy,iw,{rows:4,rh:6,grow:.5+.5*(1-ramp(t,.2,.34)),seed:7}).svg;yy+=36;
      s+=T(ix,yy,'→ a thinner, weaker media','t-sm','fill:var(--vas)');return s}
    if(p===2||p===3){head(p===2?'Intimal tear':'Dissection','var(--vas)');
      s+=TL(ix,yy,p===2?['blood enters the wall through','a split in the lining']:['blood splits the media and','opens a false lumen'],'t-sm',15);yy+=38;
      s+=T(ix,yy,'Arterial sites, % of 139 pathologies','t-xs');yy+=14;
      const gr=ramp(t,.4,.7);SITES.forEach(([n,v],i)=>{const bw=(iw-40)*v/31.7*clamp(gr*1.6-i*.15);
        s+=T(ix,yy+10,n,'t-xs','fill:var(--ink)');s+=R(ix,yy+14,bw,9,'fill:var(--vas);opacity:.8',3);s+=T(ix+bw+4,yy+22,v+'%','t-xs');yy+=31});
      return s}
    if(p===4){head('Rupture','var(--vas)');
      s+=TL(ix,yy,['most vEDS deaths are from','arterial rupture'],'t-sm',15);yy+=36;
      s+=T(ix,yy,'First events, French cohort (215)','t-xs');yy+=8;
      const gr=ramp(t,.74,.86);[['arterial',48],['digestive',24]].forEach(([n,v])=>{const bw=(iw-40)*v/48*gr;
        s+=T(ix,yy+12,n,'t-xs','fill:var(--ink)');s+=R(ix,yy+16,bw,10,'fill:var(--vas);opacity:.8',3);s+=T(ix+bw+4,yy+25,v+'%','t-xs');yy+=34});
      yy+=4;s+=TL(ix,yy,['37.4% of arterial events','presented as emergencies'],'t-sm',15,'fill:var(--ink)');return s}
    /* p===5: the emergency card */
    const cx=ix,cy=yy-6,cw=iw,ch=L.ph-44;
    s+=R(cx,cy,cw,ch,'fill:var(--panel);stroke:var(--vas);stroke-width:2',10);
    s+=zebra(cx+22,cy+24,13,{id:'vaZb'+(L.N?'n':'w')});
    s+=T(cx+42,cy+20,'VASCULAR EDS','t-lbl','fill:var(--vas)');s+=T(cx+42,cy+34,'COL3A1 confirmed · see plan','t-xs');
    const EL=[['Sudden, unexplained pain:','immediate medical attention'],['Arteriography only to find','life-threatening bleeding'],['No elective surgery unless','the benefit is substantial'],['Specialist team and','management plan enclosed']];
    EL.forEach((pr,i)=>{const y=cy+60+i*(ch>200?40:32);s+=`<circle cx="${f1(cx+15)}" cy="${f1(y-3)}" r="2.4" style="fill:var(--vas)"/>`+TL(cx+24,y,pr,'t-xs',13,'fill:var(--ink)')});
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 600');
    const L=N?{N,ax:16,al:368,ay:104,r:24,m:26,px:16,py:236,pw:368,ph:236,bY:488,bH:96,W:400}
             :{N,ax:24,al:424,ay:132,r:30,m:32,px:466,py:34,pw:238,ph:244,bY:296,bH:72,W:720};
    const p=phaseOf(STEPS,t),V=wall==='veds';
    const thin=V?ease(ramp(t,.2,.34)):0,m=lerp(L.m,L.m*.42,thin);
    const tear=V?ramp(t,.4,.54)*.3+ramp(t,.58,.72)*.7:0,rup=V?ramp(t,.76,.88):0;
    let s=`<defs>${marker('vaAr','var(--muted)')}</defs>`;
    s+=T(L.ax,22,'MEDIUM ARTERY · LONG SECTION','t-sm');
    s+=T(L.ax+L.al,22,V?(thin>.5?'vEDS wall: thin media':'vEDS wall'):'typical wall','t-sm t-end',`fill:${V?'var(--vas)':'var(--ink)'};font-weight:600`);
    s+=artery(L.ax,L.ay,L.al,{r:L.r,media:m,flow:(t*14)%1,tear:0,rupture:0});
    const top=L.ay-L.r,tx=L.ax+L.al*.42,rx=L.ax+L.al*.62;
    /* intimal tear and false lumen, drawn larger than the glyph's own */
    if(tear>0){const fl=L.al*.38*tear,fy=top-m*.5,fh=m*.36*Math.min(1,tear*2.2);
      s+=`<path d="M${f1(tx)} ${f1(top+1)}L${f1(tx+4)} ${f1(fy)}" style="stroke:var(--variant);stroke-width:2.6;stroke-linecap:round"/>`;
      s+=`<path d="M${f1(tx+3)} ${f1(fy)}Q${f1(tx+fl*.5)} ${f1(fy-fh)} ${f1(tx+fl)} ${f1(fy)}Q${f1(tx+fl*.5)} ${f1(fy+fh)} ${f1(tx+3)} ${f1(fy)}Z" style="fill:var(--blood);opacity:.8"/>`;
      s+=`<path d="M${f1(tx-26)} ${f1(L.ay-4)}Q${f1(tx-8)} ${f1(top+6)} ${f1(tx+1)} ${f1(top+3)}" class="arrow" marker-end="url(#vaAr)"/>`;
      const ly=L.ay+L.r+m+26;
      if(tear<.32)s+=LN(tx,top+2,tx,ly-12,'stroke:var(--variant);stroke-width:1;stroke-dasharray:2 3')+T(tx,ly,'intimal tear','t-sm t-mid','fill:var(--variant);font-weight:600');
      else if(rup<=0){const fx=tx+fl*.55;s+=LN(fx,fy-fh-2,fx,fy-fh-16,'stroke:var(--vas);stroke-width:1')+T(fx,fy-fh-20,'false lumen','t-sm t-mid','fill:var(--vas);font-weight:600')}}
    if(rup>0){const oy=top-m-4,rr=rng(3);
      s+=`<path d="M${f1(rx-6)} ${f1(top-m*.4)}L${f1(rx-1)} ${f1(oy-2)}L${f1(rx+3)} ${f1(top-m*.5)}L${f1(rx+7)} ${f1(oy-1)}" style="fill:none;stroke:var(--variant);stroke-width:2.4"/>`;
      for(let i=0;i<14;i++){const a=-Math.PI*(.15+.7*rr()),d=(8+rr()*34)*rup;s+=`<circle cx="${f1(rx+Math.cos(a)*d*1.3)}" cy="${f1(oy+Math.sin(a)*d)}" r="${f1(2+rr()*3*rup)}" style="fill:var(--blood);opacity:${f1(.35+.5*rup)}"/>`}
      s+=`<ellipse cx="${f1(rx)}" cy="${f1(oy-10*rup)}" rx="${f1(10+30*rup)}" ry="${f1(5+12*rup)}" style="fill:var(--blood);opacity:${f1(.18*rup)}"/>`;
      if(rup>.3)s+=T(Math.min(rx+46,L.ax+L.al-4),oy-26,'rupture','t-sm '+(rx+46>L.ax+L.al-60?'t-end':''),'fill:var(--vas);font-weight:700')}
    /* layer labels on the lower wall (anatomy and fault steps) */
    const lo=L.ay+L.r,lop=p<=1||!V?1:.0;
    if(lop>0){const ly=lo+m+4+24,xs=N?[L.ax+20,L.ax+130,L.ax+268]:[L.ax+40,L.ax+170,L.ax+320];
      const lay=[[lo+1,'intima','lining'],[lo+m*.5,'media',V&&thin>.5?'thin (schematic)':'muscle + collagen'],[lo+m+2,'adventitia','outer coat']];
      lay.forEach(([yy,a,b],i)=>{s+=LN(xs[i],yy,xs[i],ly-12,'stroke:var(--muted);stroke-width:1');s+=`<circle cx="${f1(xs[i])}" cy="${f1(yy)}" r="2" style="fill:var(--ink)"/>`;
        s+=T(xs[i],ly,a,'t-lbl t-mid')+T(xs[i],ly+14,b,'t-xs t-mid',i===1&&V&&thin>.5?'fill:var(--vas)':'')});
      s+=T(L.ax+10,L.ay+4,'lumen · blood flow →','t-xs','fill:var(--ink)')}
    /* media thickness bracket at the right end of the upper wall */
    const bx=L.ax+L.al+(N?-12:8);if(!N)s+=`<path d="M${f1(bx)} ${f1(top)}h4v${f1(-m)}h-4" style="fill:none;stroke:var(--ink);stroke-width:1"/>`;
    if(V&&p>=2){const ev=['tear','dissection','rupture','act'],ty=lo+m+4+(N?30:40),tw=(L.al-20)/4;
      ev.forEach((e,i)=>{const on=p-2>=i,x=L.ax+10+i*tw;s+=R(x,ty,tw-10,24,`fill:${on?'var(--vas-soft)':'var(--panel-2)'};stroke:${on?'var(--vas)':'var(--line)'}`,12)+T(x+(tw-10)/2,ty+16,(N?'':(i+1)+' · ')+e,'t-sm t-mid',on?'fill:var(--vas);font-weight:700':'');
});}
    s+=panel(L,t,p,V);
    /* emergency banner */
    const ba=ramp(t,.9,.95);
    if(ba>0){const y=L.bY,h=L.bH;s+=`<g style="opacity:${f1(ba)}">`+R(L.ax,y,L.W-2*L.ax,h,'fill:var(--vas-soft);stroke:var(--vas);stroke-width:2',12);
      s+=`<circle cx="${f1(L.ax+28)}" cy="${f1(y+h/2)}" r="14" style="fill:var(--vas)"/>`+R(L.ax+26,y+h/2-9,4,11,'fill:var(--panel)',2)+`<circle cx="${f1(L.ax+28)}" cy="${f1(y+h/2+7)}" r="2.2" style="fill:var(--panel)"/>`;
      const lines=N?['Sudden, severe or unexplained pain','in someone with vEDS is an emergency.','Get emergency care now and','show the vEDS card or passport.']
                   :['Sudden, severe or unexplained pain in someone with vEDS is an emergency.','Get emergency care now, and show the vEDS card or passport.'];
      s+=TL(L.ax+52,y+(N?24:30),lines,'t-lbl',N?18:20,'fill:var(--vas)')+'</g>'}
    else if(!N){s+=T(L.ax,L.bY+44,V?'Scrub or press Play: tear → dissection → rupture → what to do':'Typical wall: compare the thickness of the media','t-sm')}
    else s+=T(L.ax,L.bY+40,V?'Scrub: tear → dissection → rupture':'Typical wall for comparison','t-sm');
    svg.innerHTML=s;
    setSt(p);
    $('#vaNote').innerHTML=noteHTML(STEPS[p]);
  }
  const stop=playWire(rg,$('#vaPlay'),draw,22000,'Replay','vascular');
  const setSt=stepWire($('#vaSteps'),STEPS,rg,draw,stop);
  $$('[data-vawall]').forEach(b=>b.addEventListener('click',()=>{wall=b.dataset.vawall;press('[data-vawall]','vawall',wall);draw(+rg.value)}));
  draw(+rg.value);

  /* ================= 2. course by age ================= */
  let vvar='all';
  const ag=$('#vaAge'),arg=$('#vaAgeT');
  const COMP=[[0,0],[20,25],[40,80]];          /* first complication, index patients <sup class="c" data-ref="Pepin2000" title="Source 363">363</sup> */
  const FREE=[[0,100],[20,90],[40,39],[60,20]]; /* free of vascular complications, Mayo <sup class="c" data-ref="Oderich2005" title="Source 344">344</sup> */
  const SURV=[{a:48,v:50,l:'median 48 y (2000)'},{a:50,v:68,l:'68% alive at 50 (Mayo)'},{a:51,v:50,l:'median 51 y (2014)'}];
  const VAR={
    all:{bars:[{l:'Dutch · first major event',med:41,q1:31,q3:55},{l:'French · first complication',med:29,q1:22,q3:39}],
      txt:`Dutch national cohort: median age at first major event 41.0 years (IQR 31.0–55.0). French cohort: median age at first complication 29 (IQR 22–39). <sup class="c" data-ref="Demirdas2024,Frank2015" title="Source 118,169">118,169</sup>`},
    gly:{bars:[{l:'Glycine substitution · Dutch',med:40.5,q1:31,q3:53.25}],
      txt:`Glycine substitutions: median 40.5 years (IQR 31.0–53.25) to first major event in the Dutch cohort. In France, glycine substitutions were among the more severe groups. Substitutions by a large amino acid had earlier arterial pathology (30 vs 36 years), but this was not statistically significant (P=0.065). <sup class="c" data-ref="Demirdas2024,Frank2015,Shalhub2019JVS" title="Source 118,169,429">118,169,429</sup>`},
    spl:{bars:[{l:'Splice / delins / deletion · Dutch',med:30,q1:21,q3:45}],
      txt:`Splice-site, delins or deletion variants: median 30.0 years (IQR 21.0–45.0) to first major event, the earliest group in the Dutch cohort. Splice and in-frame variants were also among the more severe groups in France. <sup class="c" data-ref="Demirdas2024,Frank2015" title="Source 118,169">118,169</sup>`},
    null:{bars:[{l:'Haploinsufficient (null) · Dutch',med:53,q1:43,q3:58}],
      txt:`Predicted haploinsufficient (null) variants: median 53.0 years (IQR 43.0–58.0). The first complication came almost 15 years later than with missense or exon-skipping variants, and complications were almost all vascular. Only 28% of relatives carrying a null variant had a complication; some reached their seventies or eighties without incident. <sup class="c" data-ref="Demirdas2024,Leistritz2011" title="Source 118,262">118,262</sup>`}
  };
  const ASTEPS=[
    {from:0,at:.12,k:'Age 0–17',t:'Childhood',
     txt:`Complications are rare in childhood. In London's national service, 13 of 63 people diagnosed as children had 18 events in childhood, the first at a median age of 11. In the UK cohort the youngest vascular event was an axillary artery rupture in a 12-year-old, and the youngest pneumothorax happened at one day old. Newborns may have clubfoot or hip dislocation. <sup class="c" data-ref="Pepin2000,Wilkinson2025,Bowen2023vEDS,Byers2025GeneReviews" title="Source 58,68,363,506">58,68,363,506</sup>`,
     pt:`Most children with vEDS have no major problems, but a few do, which is why families are offered testing.`,
     hook:`About 60% of people diagnosed with vEDS before 18 are found through a family history. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`},
    {from:.3,at:.334,k:'Age 20',t:'One in four by 20',
     txt:`By age 20, 25% of 220 index patients had had a first complication. In the Mayo Clinic series, 90% were still free of vascular complications at 20. In the UK, bowel perforations peaked in the mid-teens and early twenties. <sup class="c" data-ref="Pepin2000,Oderich2005,Bowen2023vEDS" title="Source 58,344,363">58,344,363</sup>`,
     pt:`By 20, about 1 in 4 people diagnosed because of symptoms have had a serious problem.`,
     hook:`vEDS: first complication in about 25% by 20 and more than 80% by 40. <sup class="c" data-ref="Pepin2000" title="Source 363">363</sup>`},
    {from:.45,at:.484,k:'Age 29',t:'The median first complication',
     txt:`In 215 people with molecularly proven vEDS in France, the median age at first complication was 29 (IQR 22–39); first events were arterial in 48% and digestive in 24%. Medians across variant groups ranged from 23 to 47 years. In the US multi-institution cohort, arterial pathology appeared at a median age of 33. <sup class="c" data-ref="Frank2015,Shalhub2019JVS" title="Source 169,429">169,429</sup>`,
     pt:`In the French study, half of people had their first serious problem before about age 30. Try the variant buttons to see how the gene change shifts this.`,
     hook:`Glycine-substitution and splice variants are more severe; null (haploinsufficient) variants are milder and later. <sup class="c" data-ref="Frank2015,Leistritz2011" title="Source 169,262">169,262</sup>`},
    {from:.62,at:.667,k:'Age 40',t:'More than 8 in 10 by 40',
     txt:`More than 80% of index patients had at least one complication by 40, and survival free of vascular complications in the Mayo series fell to 39%. The Dutch national cohort, which includes relatives found by family testing, found a major event in 52%, at a median age of 41.0. Men had major events more often and younger (OR 3.61, 95% CI 1.82–7.14). <sup class="c" data-ref="Pepin2000,Oderich2005,Demirdas2024" title="Source 118,344,363">118,344,363</sup>`,
     pt:`By 40 most people diagnosed because of symptoms have had a serious problem. Men tend to be affected earlier.`,
     hook:`Men with vEDS have major events earlier and more often, and lower survival. <sup class="c" data-ref="Demirdas2024,Pepin2014" title="Source 118,364">118,364</sup>`},
    {from:.78,at:.85,k:'Age 48–51',t:'Median survival around 50',
     txt:`Calculated median survival was 48 years in the 2000 series and 51 years in the 2014 series of 1,231 people, lower in men and varying with variant type. In the Mayo series, 68% were alive at 50. In the Dutch cohort, median age at death was 43 for index patients and 65 for relatives. In the UK national service, 90.53% were alive 5 years after their first visit. <sup class="c" data-ref="Pepin2000,Pepin2014,Oderich2005,Demirdas2024,Bowen2023vEDS" title="Source 58,118,344,363,364">58,118,344,363,364</sup>`,
     pt:`These are averages from groups of people, not a prediction for anyone. Recent clinics report that about 9 in 10 people are alive 5 years after joining care.`,
     hook:`vEDS median survival: 48 years (2000) and 51 years (2014). <sup class="c" data-ref="Pepin2000,Pepin2014" title="Source 363,364">363,364</sup>`}
  ];
  const interp=(pts,a)=>{for(let i=1;i<pts.length;i++)if(a<=pts[i][0]){const[a0,v0]=pts[i-1],[a1,v1]=pts[i];return lerp(v0,v1,(a-a0)/(a1-a0))}return null};
  function drawAge(t){
    const N=vb(ag,'720 360','400 600');
    const L=N?{x0:46,x1:380,y0:30,y1:220,ax:236,vb:268,lg:{x:16,y:392},rd:{x:16,y:500},W:400}
             :{x0:58,x1:450,y0:28,y1:210,ax:226,vb:258,lg:{x:478,y:40},rd:{x:478,y:200},W:720};
    const age=t*60,X=a=>L.x0+(L.x1-L.x0)*a/60,Y=v=>L.y1-(L.y1-L.y0)*v/100;
    let s='';
    [0,25,50,75,100].forEach(v=>{s+=LN(L.x0,Y(v),L.x1,Y(v),v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--muted)');s+=T(L.x0-6,Y(v)+4,v+'%','t-xs t-end')});
    [0,10,20,30,40,50,60].forEach(a=>{s+=LN(X(a),L.y1,X(a),L.y1+4,'stroke:var(--muted)');s+=T(X(a),L.y1+16,a,'t-xs t-mid')});
    s+=T(L.x1,L.y1+30,'age (years)','t-xs t-end');
    /* reveal each line up to the cursor */
    const part=(pts,col,dash,w=2.6)=>{let d='';for(let i=0;i<pts.length;i++){const[a,v]=pts[i];if(a<=age)d+=(i?'L':'M')+f1(X(a))+' '+f1(Y(v));else{if(i>0){const v2=interp(pts,age);d+='L'+f1(X(age))+' '+f1(Y(v2))}break}}
      return d?`<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linejoin:round;${dash?'stroke-dasharray:'+dash:''}"/>`:''};
    s+=part(FREE,'var(--ink)','6 4',2.2);
    s+=part(COMP,'var(--vas)','',3);
    if(age>40)s+=`<path d="M${f1(X(40))} ${f1(Y(80))}L${f1(X(Math.min(age,46)))} ${f1(Y(80+Math.min(age-40,6)*1.2))}" style="fill:none;stroke:var(--vas);stroke-width:2;stroke-dasharray:2 4"/>`;
    COMP.slice(1).forEach(([a,v])=>{if(age>=a){s+=`<circle cx="${f1(X(a))}" cy="${f1(Y(v))}" r="5" style="fill:var(--vas)"/>`;s+=T(X(a)-8,Y(v)-9,(a===40?'>':'')+v+'%','t-sm t-end','fill:var(--vas);font-weight:700')}});
    FREE.slice(1).forEach(([a,v])=>{if(age>=a){s+=`<circle cx="${f1(X(a))}" cy="${f1(Y(v))}" r="4.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:2"/>`;s+=T(X(a)+8,Y(v)+(a===20?14:-8),v+'%','t-sm','fill:var(--ink);font-weight:700')}});
    SURV.forEach((o,i)=>{if(age>=o.a){s+=`<rect x="${f1(X(o.a)-4.5)}" y="${f1(Y(o.v)-4.5)}" width="9" height="9" transform="rotate(45 ${f1(X(o.a))} ${f1(Y(o.v))})" style="fill:var(--accent)"/>`;
      if(i===1)s+=T(X(o.a),Y(o.v)-10,'Mayo: 68% at 50','t-xs t-mid','fill:var(--accent);font-weight:600')}});
    if(age>=51)s+=T(X(49.5),Y(50)-10,'median 48 · 51 y','t-xs t-mid','fill:var(--accent);font-weight:600');
    /* cursor */
    s+=LN(X(age),L.y0-6,X(age),L.y1,'stroke:var(--muted);stroke-width:1.2');
    s+=`<rect x="${f1(clamp(X(age)-24,L.x0-20,L.x1-28))}" y="${f1(L.y0-24)}" width="48" height="16" rx="8" style="fill:var(--ink)"/>`+T(clamp(X(age),L.x0+4,L.x1-4),L.y0-12,'age '+Math.round(age),'t-xs t-mid','fill:var(--bg);font-weight:700');
    /* variant-class bars on the same age axis */
    const VB=VAR[vvar].bars;s+=T(L.x0-(N?30:40),L.vb,'Age at first event by variant class: median (IQR)','t-xs','fill:var(--ink);font-weight:600');
    VB.forEach((b,i)=>{const y=L.vb+18+i*44,inn=age>=b.q1&&age<=b.q3;
      s+=R(X(b.q1),y,X(b.q3)-X(b.q1),12,`fill:var(--vas-soft);stroke:var(--vas);stroke-width:${inn?2:1}`,6);
      s+=LN(X(b.med),y-3,X(b.med),y+15,'stroke:var(--vas);stroke-width:3');
      s+=T(X(b.med),y+28,b.l+' · '+b.med,'t-xs t-mid','fill:var(--ink)')});
    if(vvar==='null'){const y=L.vb+20;s+=`<path d="M${f1(X(38))} ${f1(y+6)}L${f1(X(42))} ${f1(y+6)}" class="arrow" marker-end="url(#vaAr2)"/>`+T(X(37),y+10,'≈15 y later','t-xs t-end')}
    /* legend */
    const lg=L.lg;const items=[['var(--vas)','','had a first complication','index patients, Pepin 2000'],['var(--ink)','6 4','free of vascular complications','Mayo series, Oderich 2005'],['var(--accent)','','survival points','Pepin 2000/2014, Mayo']];
    items.forEach(([c,d,a,b],i)=>{const y=lg.y+i*(N?34:38);s+=i<2?`<path d="M${lg.x} ${y}h24" style="stroke:${c};stroke-width:3;${d?'stroke-dasharray:'+d:''}"/>`:`<rect x="${lg.x+8}" y="${y-4}" width="8" height="8" transform="rotate(45 ${lg.x+12} ${y})" style="fill:${c}"/>`;
      s+=T(lg.x+32,y+4,a,'t-sm','fill:var(--ink)')+T(lg.x+32,y+18,b,'t-xs')});
    /* what has been passed */
    const rd=L.rd,c=interp(COMP,Math.min(age,40)),fr=interp(FREE,age);
    s+=T(rd.x,rd.y,'AT AGE '+Math.round(age)+' (joined points)','t-xs','font-weight:600');
    s+=T(rd.x,rd.y+20,age<=40?`≈${Math.round(c)}% first complication`:'>80% first complication','t-sm','fill:var(--vas)');
    s+=T(rd.x,rd.y+38,`≈${Math.round(fr)}% free of vascular events`,'t-sm','fill:var(--ink)');
    s+=TL(rd.x,rd.y+60,['between published points the','lines are straight joins, not data'],'t-xs',13);
    ag.innerHTML=`<defs>${marker('vaAr2','var(--muted)')}</defs>`+s;
    const p=phaseOf(ASTEPS,t);setASt(p);
    arg.setAttribute('aria-valuetext',`Age ${Math.round(age)}: ${ASTEPS[p].t}`);
    $('#vaAgeRead').innerHTML=`<span>age <b>${Math.round(age)}</b></span><span>variant class <b>${{all:'all',gly:'glycine substitution',spl:'splice / in-frame',null:'null'}[vvar]}</b></span>`;
    $('#vaAgeNote').innerHTML=noteHTML(ASTEPS[p])+`<div class="kv"><div><dt>Variant class</dt><dd>${VAR[vvar].txt}</dd></div></div>`;
  }
  const astop=playWire(arg,$('#vaAgePlay'),drawAge,16000,'Replay','vascular');
  const setASt=stepWire($('#vaAgeSteps'),ASTEPS,arg,drawAge,astop);
  $$('[data-vavar]').forEach(b=>b.addEventListener('click',()=>{vvar=b.dataset.vavar;press('[data-vavar]','vavar',vvar);drawAge(+arg.value)}));
  drawAge(+arg.value);

  /* ================= 3. icon array: first complication by 20 / 40 ================= */
  const ic=$('#vaIcons');let icN=25,icStop=null;
  function drawIcons(n){
    const N=vb(ic,'720 230','400 450');
    const cols=N?10:20,sp=N?28:24,sz=N?22:19,x0=N?60:24,y0=N?16:22;let s='';
    for(let i=0;i<100;i++){const c=i%cols,r=Math.floor(i/cols),on=i<Math.round(n);
      s+=person(x0+c*sp+sp/2,y0+r*(sz+(N?6:12)),sz,on?'var(--vas)':'var(--line)')}
    const bx=N?20:530,by=N?330:58,age=icTarget===25?20:40;
    s+=T(bx,by,(age===40?'>':'')+Math.round(n),'t-big','font:400 46px var(--display);fill:var(--vas)');
    s+=T(bx+(N?(age===40?76:56):(age===40?82:62)),by,'in 100','t-lbl');
    s+=TL(bx,by+28,N?[`index patients had a first`,`complication by age ${age}`]:['index patients had a',`first complication by ${age}`],'t-sm',16,'fill:var(--ink)');
    s+=TL(bx,by+70,N?['220 index patients, Pepin 2000.','Relatives found through family','testing tend to do better.']:['220 index patients,','Pepin 2000. Relatives found','by family testing tend','to do better.'],N?'t-sm':'t-xs',N?16:14);
    ic.innerHTML=s}
  let icTarget=25;
  $$('[data-vaicon]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.vaicon;press('[data-vaicon]','vaicon',a);
    const from=icN;icTarget=a==='20'?25:80;icStop&&icStop();icStop=animate(900,q=>{icN=lerp(from,icTarget,ease(q));drawIcons(icN)})}));
  drawIcons(icN);
  redraws.vascular=(prev=>()=>{prev&&prev();drawIcons(icN);drawTrial(trial,1)})(redraws.vascular);

  /* ================= 4. trials as icon arrays ================= */
  const tr=$('#vaTrial');let trial='bbest',trStop=null;
  const TRIALS={
    bbest:{arms:[{l:'Celiprolol',n:25,e:5},{l:'No treatment',n:28,e:14}],foot:'HR 0.36 (95% CI 0.15–0.88) · open-label, blinded endpoints · stopped early for benefit',out:'arterial rupture or dissection, mean 47 months',
      note:{k:'BBEST · Lancet 2010',t:'Celiprolol: 20% vs 50%',txt:`53 people with clinical vEDS were randomised to celiprolol or no treatment for a planned 5 years. Arterial rupture or dissection occurred in 5 of 25 on celiprolol and 14 of 28 controls (HR 0.36, 95% CI 0.15–0.88, p=0.040). The trial was open-label and stopped early for benefit; only 33 participants had a confirmed <i>COL3A1</i> variant. Side effects: severe fatigue in 1 and mild fatigue in 2. <sup class="c" data-ref="Ong2010,Shalhub2020" title="Source 345,430">345,430</sup>`,
       pt:`In one small trial, fewer people taking celiprolol had an artery tear. It is not approved in the US.`,hook:`BBEST: 20% vs 50%, HR 0.36; celiprolol = β1 antagonist + β2 agonist. <sup class="c" data-ref="Ong2010,Isselbacher2022" title="Source 219,345">219,345</sup>`}},
    arcade:{arms:[{l:'Irbesartan + celiprolol',n:29,e:8},{l:'Placebo + celiprolol',n:28,e:15}],foot:'HR 0.42 (95% CI 0.17–0.99) · double-blind, placebo-controlled · 2 years',out:'any arterial event or new or worsening lesion on imaging',
      note:{k:'ARCADE · Circulation 2025',t:'Adding irbesartan: 27.6% vs 53.6%',txt:`57 adults with vEDS on stable celiprolol were randomised to irbesartan (150 mg/day titrated to 300 mg/day in the protocol) or placebo for 2 years. The composite outcome, any vEDS-related arterial event or a new or worsening arterial lesion on systematic imaging, occurred in 8 of 29 vs 15 of 28 (HR 0.42, 95% CI 0.17–0.99). Systolic pressure fell 5.4 mm Hg, which did not explain the benefit; 11 episodes of low blood pressure led to dose reduction in 4 people. <sup class="c" data-ref="Jeunemaitre2025,NCT02597361" title="Source 226,328">226,328</sup>`,
       pt:`A second, blinded trial found fewer artery problems when a blood-pressure medicine was added to celiprolol.`,hook:`The 2022 ACC/AHA guideline, written before ARCADE, said no studies showed a benefit of ARBs in vEDS. <sup class="c" data-ref="Isselbacher2022" title="Source 219">219</sup>`}}
  };
  function drawTrial(k,q){
    const N=vb(tr,'720 250','400 370'),D=TRIALS[k];let s='';
    const per=N?10:29,sp=N?24:17,sz=N?20:16,ix=N?24:196;
    D.arms.forEach((a,ai)=>{const y0=N?20+ai*150:34+ai*92,iy=N?y0+30:y0;
      s+=T(N?ix:24,N?y0+8:y0+12,a.l,'t-lbl');
      s+=T(N?ix:24,N?y0+24:y0+30,`${a.e} of ${a.n} · ${f1(a.e/a.n*100).replace('.0','')}%`,'t-sm',`fill:${ai?'var(--ink)':'var(--accent)'};font-weight:700`);
      for(let i=0;i<a.n;i++){const c=i%per,r=Math.floor(i/per),on=i<Math.round(a.e*q);
        s+=person(ix+c*sp+sp/2,iy+r*(sz+8)-2,sz,on?'var(--vas)':'var(--line)')}});
    const fy=N?334:222;s+=TL(N?16:24,fy,N?[D.out,D.foot.split(' · ')[0]]:[D.foot],'t-xs',14,'fill:var(--ink)');
    if(!N)s+=T(24,fy+18,'outcome: '+D.out,'t-xs');
    tr.innerHTML=s;$('#vaTrialNote').innerHTML=noteHTML(D.note)}
  $$('[data-vatrial]').forEach(b=>b.addEventListener('click',()=>{trial=b.dataset.vatrial;press('[data-vatrial]','vatrial',trial);trStop&&trStop();trStop=animate(900,q=>drawTrial(trial,ease(q)))}));
  drawTrial(trial,1);
};
/* =============== 4.1 Exercise & physiotherapy =============== */
inits.physio=()=>{
  const svg=$('#phSvg'),rg=$('#phT'),note=$('#phNote'),read=$('#phRead');
  let mode='paced';

  /* published load of the HEAVY arm, Liaghat 2022 (full text): weeks 1-3 familiarisation 3x10 at 50/70/90% of the
     estimated 10RM, weeks 4-9 3 sets of 10RM, weeks 10-15 4 sets of 8RM, week 16 taper */
  const LOAD=[50,70,90,100,100,100,100,100,100,100,100,100,100,100,100,null];
  const loadTxt=w=>w<=3?`3 × 10 at ${LOAD[w-1]}% of 10RM`:w<=9?'3 sets of 10RM':w<=15?'4 sets of 8RM':'taper';
  /* illustrative stage names (not from the trial) */
  const STAGE=[[0,'Isometric & control'],[3,'Closed-chain'],[8,'Functional'],[13,'Task- & sport-specific']];
  const stageOf=wk=>{let s=STAGE[0][1];STAGE.forEach(([a,n])=>{if(wk>=a)s=n});return s};

  const STEPS=[
    {from:0,at:.09,k:'Weeks 1–3',t:'Learn the moves first',
     txt:`In the Danish high-load shoulder trial (100 adults with HSD), the first 3 weeks were familiarisation: 3 sets of 10 repetitions at 50%, then 70%, then 90% of the estimated 10-repetition maximum (10RM). Trials share this pattern: start supervised and below symptom thresholds, then progress by load or by competency, as in a children's trial that advanced exercises only when each was done well. Muscle weakness matters in its own right: in 30 people with EDS, measured weakness correlated with fatigue (r=0.461). <sup class="c" data-ref="Liaghat2022BJSM,Pacey2013,Voermans2011Fatigue" title="Source 268,351,492">268,351,492</sup>`,
     pt:`Start gently. People in one trial spent 3 weeks learning the exercises with light weights before using heavier ones.`,
     hook:`HEAVY arm: weeks 1–3 at 50/70/90% of 10RM, then 3×10RM (weeks 4–9), 4×8RM (weeks 10–15), taper (week 16). <sup class="c" data-ref="Liaghat2022BJSM" title="Source 268">268</sup>`},
    {from:.19,at:.27,k:'Weeks 4–9',t:'Closed-chain strength and control',
     txt:`From week 4 the trial used 3 sets of the full 10RM. Proprioception, the sense of where a joint is, is often impaired in hypermobility. In an 8-week home programme of progressive closed kinetic chain exercise (feet or hands fixed, as in a squat), knee proprioceptive acuity improved in 16 of 18 people with JHS, with better balance, strength and pain, though there was no control group. A 4-week RCT of combined closed-chain and proprioceptive exercise (24 people) improved proprioception, pain and quality of life compared with no intervention. <sup class="c" data-ref="Liaghat2022BJSM,Ferrell2004,Daman2019" title="Source 110,160,268">110,160,268</sup>`,
     pt:`Exercises with the foot or hand planted, like a squat or a wall push, help the joint and brain work together again.`,
     hook:`Ferrell 2004: 8 weeks of closed kinetic chain exercise, knee proprioception better in 16/18 (no control group). <sup class="c" data-ref="Ferrell2004" title="Source 160">160</sup>`},
    {from:.33,at:.38,k:'A flare',t:'Flare: adjust, don\'t stop',
     txt:`Soreness is expected. In the trial, transient muscle soreness affected 56% on HEAVY vs 37% on LIGHT, and headaches 40% vs 20%; there were no serious adverse events. Pain below 5/10 was allowed during exercise. Activity pacing, spreading activity evenly instead of pushing hard on good days and crashing afterwards, is recommended by patients and clinicians, but no trial has tested pacing alone in hEDS or HSD <span class="ev hyp">Hypothesis</span>. Switch the lower chart to compare the two patterns. <sup class="c" data-ref="Liaghat2022BJSM,Bennett2022" title="Source 40,268">40,268</sup>`,
     pt:`Some soreness after exercise is common and usually passes. On a bad day, do a little less rather than nothing, then build back up.`,
     hook:`HEAVY vs LIGHT harms: soreness 56% vs 37%, headache 40% vs 20%, no serious adverse events. <sup class="c" data-ref="Liaghat2022BJSM" title="Source 268">268</sup>`},
    {from:.56,at:.75,k:'Weeks 10–15',t:'Heavier, then functional',
     txt:`Weeks 10–15 used 4 sets of 8RM. Over the 16 weeks, shoulder pain fell by 0.89 points (0–10 scale) with HEAVY and 0.33 with LIGHT, with no difference between groups, and pain caused by the exercise itself stayed below 0.5 throughout, "challenging previous beliefs" that heavy loading flares pain <span class="ev early">Early evidence</span>. In a 12-person feasibility study, shoulder strength rose 28–31%. Lower fear of movement and higher self-efficacy at the start predicted better results. <sup class="c" data-ref="Liaghat2025,Liaghat2020,Dolso2023" title="Source 131,265,271">131,265,271</sup>`,
     pt:`In one trial, heavier training did not make pain worse during exercise, and pain eased a little over 16 weeks.`,
     hook:`Exercise-induced pain stayed below 0.5/10 during high-load shoulder training in HSD. <sup class="c" data-ref="Liaghat2025" title="Source 271">271</sup>`},
    {from:.92,at:1,k:'Week 16 and after',t:'Taper, then keep going',
     txt:`At 16 weeks the function score (WOSI) favoured HEAVY by −174.5 points, smaller than the 252-point minimal important difference; more than two-thirds on HEAVY improved by more than that difference. At 1 year the gap (−92.9) was no longer significant. Children show the same pattern of improvement in both arms: 8 weeks of exercise into the hypermobile range or only to neutral cut knee pain by 14.5 mm on a VAS either way. Gains need maintaining. <sup class="c" data-ref="Liaghat2022BJSM,Liaghat2024BJSM,Pacey2013" title="Source 268,269,351">268,269,351</sup>`,
     pt:`Most people in exercise trials improve, whichever programme they get. The hard part is keeping the habit going.`,
     hook:`High-load beat low-load at 16 weeks (WOSI −174.5, below the MID of 252) but not at 1 year. <sup class="c" data-ref="Liaghat2022BJSM,Liaghat2024BJSM" title="Source 268,269">268,269</sup>`}
  ];
  const setActive=stepWire($('#phSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* schematic activity and pain curves over the 16 weeks (u = 0..1) */
  const FL=[.31,.45];
  const CURVE={
    paced:{a:u=>.3+.42*u-.1*bump(u,FL[0]+.02,FL[1]+.03),p:u=>.3-.12*u+.32*bump(u,FL[0],FL[1])},
    boom:{a:u=>.24+.6*Math.pow(Math.max(0,Math.sin(u*Math.PI*2*3.4)),2)-.12*Math.pow(Math.max(0,Math.sin(u*Math.PI*2*3.4-1.9)),2),
          p:u=>.22+.5*Math.pow(Math.max(0,Math.sin(u*Math.PI*2*3.4-1.25)),2)}};

  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const wk=t*16,W=Math.min(16,Math.max(1,Math.ceil(wk))),u=t;
    const prop=.12+.78*ease(ramp(wk,0,12)),str=.12+.8*ease(ramp(wk,1,15)),mus=.12+.88*ease(ramp(wk,0,15));
    const L=N?{jp:[10,10,380,232],jx:96,jy:122,js:.74,st:[22,32],gx:190,gw:178,g1:150,g2:198,
               lc:{x0:42,x1:386,top:300,base:388,ttl:276},ac:{x0:42,x1:386,top:452,base:560,ttl:428},lg:600}
             :{jp:[10,10,212,360],jx:111,jy:156,js:1.0,st:[24,34],gx:24,gw:174,g1:298,g2:334,
               lc:{x0:262,x1:706,top:44,base:160,ttl:22},ac:{x0:262,x1:706,top:218,base:330,ttl:196},lg:360};
    let s=`<defs>${marker('phArr','var(--muted)')}</defs>`;
    /* joint panel */
    const [px,py,pw,ph]=L.jp;
    s+=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${L.st[0]}" y="${L.st[1]}" class="t-xs">ILLUSTRATIVE STAGE</text><text x="${L.st[0]}" y="${L.st[1]+17}" class="t-lbl" style="fill:var(--rx)">${stageOf(wk)}</text>`;
    const wob=Math.sin(t*90)*(1-prop)*.42;
    s+=joint(L.jx,L.jy+(N?14:0),L.js,{lax:.62,muscle:mus,slip:Math.abs(wob),ang:wob*9});
    const jy2=L.jy+(N?14:0);
    if(1-prop>.3)s+=`<text x="${L.jx}" y="${f1(jy2+L.js*112)}" class="t-xs t-mid" style="fill:var(--variant)">joint wobbles</text>`;
    else s+=`<text x="${L.jx}" y="${f1(jy2+L.js*112)}" class="t-xs t-mid" style="fill:var(--rx)">steadier</text>`;
    /* gauges */
    const gauge=(y,lab,v,col)=>`<text x="${L.gx}" y="${y-8}" class="t-sm">${lab}</text><rect x="${L.gx}" y="${y}" width="${L.gw}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${L.gx}" y="${y}" width="${f1(L.gw*v)}" height="12" rx="6" style="fill:${col}"/>`;
    s+=gauge(L.g1,'Muscle strength',str,'var(--muscle)');
    s+=gauge(L.g2,'Joint control',prop,'var(--rx)');
    s+=`<text x="${L.gx}" y="${L.g2+28}" class="t-xs">gauges schematic</text>`;
    /* load chart: published weekly load */
    const C=L.lc,bw=(C.x1-C.x0)/16,yv=v=>C.base-(C.base-C.top)*v/100;
    s+=`<text x="${C.x0-(N?30:0)}" y="${C.ttl}" class="t-sm">LOAD, % OF 10-REP MAX (HEAVY ARM, AS PUBLISHED)</text>`;
    [0,50,100].forEach(v=>{s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-5}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}</text>`});
    for(let i=0;i<16;i++){const w=i+1,x=C.x0+i*bw+bw*.12,done=w<=W,cur=w===W;
      const v=LOAD[i]==null?55:LOAD[i],col=w<=3?'var(--rx-soft)':w<=9?'var(--rx)':w<=15?'var(--accent)':'var(--panel-2)';
      s+=done?`<rect x="${f1(x)}" y="${f1(yv(v))}" width="${f1(bw*.76)}" height="${f1(C.base-yv(v))}" rx="2" style="fill:${col};stroke:${cur?'var(--ink)':w===16?'var(--muted)':'none'};stroke-width:${cur?1.6:1};${w===16?'stroke-dasharray:3 2':''}"/>`
        :`<rect x="${f1(x+.5)}" y="${f1(yv(v)+.5)}" width="${f1(bw*.76-1)}" height="${f1(C.base-yv(v)-1)}" rx="2" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`;
      if(w>=10&&w<=15&&done)for(let r=1;r<4;r++)s+=`<line x1="${f1(x+1)}" x2="${f1(x+bw*.76-1)}" y1="${f1(yv(v)+r*(C.base-yv(v))/4)}" y2="${f1(yv(v)+r*(C.base-yv(v))/4)}" style="stroke:var(--panel);stroke-width:1;opacity:.7"/>`;
      if(!N||w%2===1||w===16)s+=`<text x="${f1(x+bw*.38)}" y="${C.base+12}" class="t-xs t-mid" style="${cur?'fill:var(--ink);font-weight:700':''}">${w}</text>`}
    const br=(a,b,lab,lab2)=>{const xa=C.x0+(a-1)*bw+2,xb=C.x0+b*bw-2,yb=C.top-6;
      return `<path d="M${f1(xa)} ${yb+4}V${yb}H${f1(xb)}V${yb+4}" style="fill:none;stroke:var(--muted)"/><text x="${f1((xa+xb)/2)}" y="${yb-4}" class="t-xs t-mid">${N&&lab2?lab2:lab}</text>`};
    s+=br(1,3,'familiarise','famil.')+br(4,9,'3 × 10RM')+br(10,15,'4 × 8RM')+br(16,16,'taper','');
    s+=`<text x="${C.x1}" y="${C.base+24}" class="t-xs t-end">week</text>`;
    /* activity and pain chart (schematic) */
    const A=L.ac,cv=CURVE[mode];
    s+=`<text x="${A.x0-(N?30:0)}" y="${A.ttl}" class="t-sm">${mode==='paced'?'PACED: STEADY BUILD, ONE FLARE, ADJUST':'BOOM-BUST: PUSH, CRASH, REPEAT'} (SCHEMATIC)</text>`;
    s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${A.base}" y2="${A.base}" class="axis"/><line x1="${A.x0}" x2="${A.x0}" y1="${A.top}" y2="${A.base}" class="axis"/>`;
    s+=`<text x="${A.x0-6}" y="${A.top+8}" class="t-xs t-end">high</text><text x="${A.x0-6}" y="${A.base}" class="t-xs t-end">low</text>`;
    const xu=v=>A.x0+(A.x1-A.x0)*v;
    const seg=(fn,col,w,dash)=>{const full=pathFn(fn,A.x0,A.x1,A.base,A.top,160);const done=pathFn(v=>fn(v*u),A.x0,xu(u),A.base,A.top,Math.max(2,Math.round(160*u)));
      return `<path d="${full}" style="fill:none;stroke:${col};stroke-width:${w};opacity:.18;${dash?'stroke-dasharray:4 3':''}"/>`+(u>.005?`<path d="${done}" style="fill:none;stroke:${col};stroke-width:${w};${dash?'stroke-dasharray:4 3':''}"/>`:'')};
    s+=seg(cv.a,'var(--rx)',2.6)+seg(cv.p,'var(--vas)',2,true);
    s+=`<line x1="${f1(xu(u))}" x2="${f1(xu(u))}" y1="${A.top-4}" y2="${A.base}" style="stroke:var(--ink);stroke-width:1;opacity:.5"/>`;
    s+=`<circle cx="${f1(xu(u))}" cy="${f1(A.base-(A.base-A.top)*clamp(cv.a(u)))}" r="4" style="fill:var(--rx)"/><circle cx="${f1(xu(u))}" cy="${f1(A.base-(A.base-A.top)*clamp(cv.p(u)))}" r="3.5" style="fill:var(--vas)"/>`;
    if(mode==='paced'&&u>FL[0]){const fx=xu((FL[0]+FL[1])/2),fy=A.base-(A.base-A.top)*cv.p((FL[0]+FL[1])/2);
      s+=`<text x="${f1(fx+8)}" y="${f1(fy-10)}" class="t-xs" style="fill:var(--vas)">flare → trim load, keep moving</text>`}
    if(mode==='boom'&&u>.1){const bx=xu(.073);s+=`<text x="${f1(bx+6)}" y="${A.top+4}" class="t-xs" style="fill:var(--rx)">good day: overdo it</text>`;
      if(u>.17)s+=`<text x="${f1(xu(.13)+4)}" y="${A.base-6}" class="t-xs" style="fill:var(--vas)">then a crash</text>`}
    /* legend */
    const lx=N?42:262;
    s+=`<line x1="${lx}" x2="${lx+20}" y1="${L.lg+6}" y2="${L.lg+6}" style="stroke:var(--rx);stroke-width:2.6"/><text x="${lx+26}" y="${L.lg+10}" class="t-xs">activity</text>`;
    s+=`<line x1="${lx+92}" x2="${lx+112}" y1="${L.lg+6}" y2="${L.lg+6}" style="stroke:var(--vas);stroke-width:2;stroke-dasharray:4 3"/><text x="${lx+118}" y="${L.lg+10}" class="t-xs">pain</text>`;
    s+=`<text x="${N?386:706}" y="${L.lg+(N?28:10)}" class="t-xs t-end">pacing alone untested (hypothesis)</text>`;
    svg.innerHTML=s;
    const i=phaseOf(STEPS,t);note.innerHTML=noteHTML(STEPS[i]);setActive(i);
    read.innerHTML=`<span>Week <b>${W}</b> of 16</span><span>Load <b>${loadTxt(W)}</b></span><span>Pain allowed in exercise <b>&lt; 5/10</b></span>`;
  }
  const stop=playWire(rg,$('#phPlay'),draw,9000,'Replay','physio');
  $$('[data-phm]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.phm;$$('[data-phm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- forest plot: WOSI between-group differences ---------- */
  const fsvg=$('#phForest');
  function drawForest(){
    const N=vb(fsvg,'720 170','400 250');
    const x0=N?40:150,x1=N?380:690,lo=-400,hi=150,X=v=>x0+(x1-x0)*(v-lo)/(hi-lo);
    const rows=[{l:'16 weeks',m:-174.5,a:-341.4,b:-7.7,col:'var(--rx)'},{l:'1 year',m:-92.9,a:-257.4,b:71.5,col:'var(--muted)'}];
    const top=N?50:30,rh=N?62:44;
    let s='';
    s+=`<rect x="${f1(X(lo))}" y="${top-14}" width="${f1(X(-252)-X(lo))}" height="${rows.length*rh+8}" style="fill:var(--rx-soft);opacity:.55"/>`;
    s+=`<line x1="${f1(X(-252))}" x2="${f1(X(-252))}" y1="${top-18}" y2="${top+rows.length*rh}" style="stroke:var(--rx);stroke-width:1.4;stroke-dasharray:4 3"/>`;
    s+=`<text x="${f1(X(-252)-4)}" y="${top-20}" class="t-xs t-end" style="fill:var(--rx)">MID −252: beyond here = important</text>`;
    s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${top-18}" y2="${top+rows.length*rh}" style="stroke:var(--ink);stroke-width:1.2"/><text x="${f1(X(0)+4)}" y="${top-20}" class="t-xs">no difference</text>`;
    rows.forEach((r,i)=>{const y=top+i*rh+12;
      s+=`<text x="${N?x0:x0-12}" y="${N?y-12:y+4}" class="t-lbl ${N?'':'t-end'}">${r.l}</text>`;
      s+=`<line x1="${f1(X(r.a))}" x2="${f1(X(r.b))}" y1="${y}" y2="${y}" style="stroke:${r.col};stroke-width:2.4"/>`;
      [r.a,r.b].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y-6}" y2="${y+6}" style="stroke:${r.col};stroke-width:2"/>`);
      s+=`<rect x="${f1(X(r.m)-6)}" y="${y-6}" width="12" height="12" style="fill:${r.col}"/>`;
      s+=`<text x="${f1(X(r.m))}" y="${y+22}" class="t-xs t-mid" style="fill:var(--ink)">${r.m} (${r.a} to ${r.b})</text>`});
    const ay=top+rows.length*rh+6;
    s+=`<line x1="${x0}" x2="${x1}" y1="${ay}" y2="${ay}" class="axis"/>`;
    [-400,-300,-200,-100,0,100].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ay}" y2="${ay+4}" class="axis"/><text x="${f1(X(v))}" y="${ay+15}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${x0}" y="${ay+30}" class="t-xs">← favours HEAVY</text><text x="${x1}" y="${ay+30}" class="t-xs t-end">favours LIGHT →</text>`;
    fsvg.innerHTML=s}
  drawForest();
  {const prev=redraws.physio;redraws.physio=()=>{prev&&prev();drawForest()}}

  /* ---------- trial comparator ---------- */
  const T=[
    {n:'Liaghat 2022 · high vs low load',d:'RCT',o:['fn','pain','str'],ev:'early',pop:'100 adults with HSD and shoulder pain or instability',iv:'HEAVY (full range, high load, supervised twice a week) vs LIGHT (mid-range, low load), 3 times a week',du:'16 weeks (1-year follow-up)',ef:'WOSI −174.5 (95% CI −341.4 to −7.7) favouring HEAVY, below the MID of 252; at 1 year −92.9 (−257.4 to 71.5), not significant. Pain fell 0.89 vs 0.33 points, no between-group difference.',c:'<sup class="c" data-ref="Liaghat2022BJSM,Liaghat2024BJSM,Liaghat2025" title="Source 268,269,271">268,269,271</sup>'},
    {n:'Spanhove 2023 · home programmes',d:'RCT',o:['fn'],ev:'early',pop:'21 people with hEDS/HSD and multidirectional shoulder instability',iv:'Two home exercise programmes',du:'6 months',ef:'No difference between programmes; both improved WOSI by 240 points at 12 weeks and 325 at 24 weeks. Fear of movement (Tampa) did not change.',c:'<sup class="c" data-ref="Spanhove2023" title="Source 445">445</sup>'},
    {n:'Pacey 2013 · into range or to neutral',d:'RCT',o:['pain'],ev:'early',pop:'26 children aged 7–16 with JHS and knee pain',iv:'Exercise into the hypermobile range vs only to neutral knee extension',du:'8 weeks',ef:'Worst knee pain fell by a mean 14.5 mm on a VAS (95% CI 5.2 to 23.8) whichever group; no adverse events.',c:'<sup class="c" data-ref="Pacey2013" title="Source 351">351</sup>'},
    {n:'Kemp 2010 · generalised vs targeted',d:'RCT',o:['pain','fn'],ev:'early',pop:'57 children aged 7–16',iv:'Generalised fitness vs targeted joint-control physiotherapy',du:'6 weeks',ef:'Both cut child and parent pain scores, no difference between them; parental global assessment favoured targeted (−21.29; 95% CI −40.03 to −2.55).',c:'<sup class="c" data-ref="Kemp2010" title="Source 243">243</sup>'},
    {n:'Bale 2019 · the Bendy Study',d:'RCT',o:['pain','fn'],ev:'early',pop:'119 children aged 5–16',iv:'Tailored physiotherapy plus OT with a school visit vs standard advice',du:'8 weeks (12-month outcome)',ef:'No additional benefit at 12 months; pain, coordination and grip strength improved in both arms.',c:'<sup class="c" data-ref="Bale2019" title="Source 25">25</sup>'},
    {n:'Ferrell 2004 · closed-chain proprioception',d:'Cohort',o:['prop','pain','str'],ev:'early',pop:'18 people with JHS',iv:'Progressive closed kinetic chain home exercise',du:'8 weeks',ef:'Knee proprioception improved in 16 of 18 (P<0.001); balance, strength and pain (P=0.003) also improved. No control group.',c:'<sup class="c" data-ref="Ferrell2004" title="Source 160">160</sup>'},
    {n:'Sahin 2008 · proprioceptive exercise',d:'Controlled',o:['prop','pain'],ev:'early',pop:'40 people with BJHS (15 exercise, 25 controls)',iv:'Clinic-based proprioceptive exercise',du:'8 weeks',ef:'Pain fell and occupational activity improved only in the exercise group.',c:'<sup class="c" data-ref="Sahin2008" title="Source 411">411</sup>'},
    {n:'Daman 2019 · combined exercise',d:'RCT',o:['prop','pain'],ev:'early',pop:'24 people with hypermobility syndrome',iv:'Closed-chain plus proprioceptive exercise, 3 days a week',du:'4 weeks',ef:'Knee proprioception, pain and quality of life improved compared with no intervention.',c:'<sup class="c" data-ref="Daman2019" title="Source 110">110</sup>'},
    {n:'Toprak Celenay 2017 · spinal stabilisation',d:'RCT',o:['pain','prop'],ev:'early',pop:'38 women with BJHS (20 exercise, 18 control)',iv:'Lumbar stabilisation exercise, 3 days a week',du:'8 weeks',ef:'Pain, trunk muscle endurance and dynamic stability (eyes open) improved compared with controls.',c:'<sup class="c" data-ref="ToprakCelenay2017" title="Source 466">466</sup>'},
    {n:'Luder 2021 · self-guided resistance',d:'RCT',o:['str'],ev:'early',pop:'51 women with Beighton ≥6/9',iv:'Self-guided leg and trunk resistance training twice a week',du:'12 weeks',ef:'No improvement in strength or muscle mass compared with controls; 63% did more than 80% of sessions.',c:'<sup class="c" data-ref="Luder2021" title="Source 280">280</sup>'},
    {n:'Benistan 2024 · compression garments',d:'RCT',o:['prop','pain'],ev:'early',pop:'36 people with hEDS',iv:'12 physiotherapy sessions with or without daily compression garments',du:'4 weeks',ef:'Dynamic balance improved more with garments (sway velocity effect size 0.93); pain fell in both groups, no difference.',c:'<sup class="c" data-ref="Benistan2024" title="Source 38">38</sup>'},
    {n:'Susanne 2025 · exercise vs orthosis',d:'RCT',o:['fn','pain','str'],ev:'early',pop:'169 adults with HSD/hEDS and hand pain or paraesthesia',iv:'Progressive wrist-stabilising exercise vs a hand orthosis',du:'12 weeks',ef:'No difference in DASH, grip, EQ-5D, pain or paraesthesia; 116 completed.',c:'<sup class="c" data-ref="Susanne2025" title="Source 455">455</sup>'},
    {n:'Reychler 2019 · inspiratory muscle training',d:'RCT',o:['str','fn'],ev:'early',pop:'40 women with hEDS (20 per group)',iv:'Inspiratory muscle training',du:'6 weeks',ef:'SNIP 41 to 49 cmH2O; 6-minute walk 455 to 515 m; FEV1 94% to 103% predicted.',c:'<sup class="c" data-ref="Reychler2019" title="Source 379">379</sup>'},
    {n:'Chew 2025 · HOPE online programme',d:'Pilot RCT',o:['pain','fn'],ev:'early',pop:'70 people with hEDS/HSD (36 vs 34 usual care)',iv:'Online, self-paced pain-management programme, 12 modules',du:'8 weeks',ef:'81–91% rated it feasible; at 3 months worst pain d 0.63 and impact of hypermobility (BIoH) d 0.32.',c:'<sup class="c" data-ref="Chew2025" title="Source 87">87</sup>'},
    {n:'Russek 2026 · online Pilates',d:'Pragmatic trial',o:['fn'],ev:'early',pop:'420 people with symptomatic hypermobility (200 Pilates vs 220 waitlist)',iv:'Online modified Pilates, ~25-minute modules, at least 3 days a week',du:'8 weeks (6-month follow-up)',ef:'BIoH, body awareness and kinesiophobia improved (p<0.001 each), "modest" changes, held at 6 months; physical activity unchanged; high dropout; declared conflict of interest.',c:'<sup class="c" data-ref="Russek2026" title="Source 407">407</sup>'},
    {n:'Rahman 2014 · CBT pain programme',d:'Open study',o:['pain'],ev:'early',pop:'87 people with JHS (96% female)',iv:'Cognitive behavioural pain-management programme, 8 days',du:'6 weeks (5-month follow-up)',ef:'All outcomes improved at 1 month (P<0.001); by 5 months scores drifted back, though all except average pain stayed significantly better. No control group.',c:'<sup class="c" data-ref="Rahman2014" title="Source 371">371</sup>'},
    {n:'Palmer 2021 · systematic review',d:'Review',o:['pain','fn','prop','str'],ev:'est',pop:'11 exercise-based studies (8 controlled trials, 3 cohorts)',iv:'Conservative, exercise-based care',du:'Varied',ef:'Only 3 small controlled studies beat a control; evidence of superiority "weak", improvement over time consistent; attrition 0–44%.',c:'<sup class="c" data-ref="Palmer2021" title="Source 357">357</sup>'},
    {n:'Reychler 2021 · systematic review',d:'Review',o:['pain','prop'],ev:'early',pop:'6 RCTs, 20–57 patients each',iv:'Physical therapy of any type',du:'4–8 weeks',ef:'Pain or proprioception improved in intervention groups whatever the type; quality of life "was systematically improved".',c:'<sup class="c" data-ref="Reychler2021" title="Source 380">380</sup>'},
    {n:'Buryk-Iggers 2022 · systematic review',d:'Review',o:['pain','fn','str'],ev:'early',pop:'10 studies, 330 adults, all EDS types plus HSD',iv:'Exercise and rehabilitation',du:'Varied',ef:'Every study showed some physical or psychological improvement; 1 non-serious adverse event possibly linked (<1% of participants).',c:'<sup class="c" data-ref="BurykIggers2022" title="Source 64">64</sup>'}
  ];
  const EVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
  const OL={pain:'pain',fn:'function',prop:'proprioception & balance',str:'strength & fitness'};
  function renderTrials(f){
    const list=T.filter(x=>f==='all'||x.o.includes(f));
    $('#phTrials').innerHTML=list.map(x=>`<article class="phtrial"><div class="chips"><span class="tag rx">${x.d}</span>${EVL[x.ev]}</div><h4>${x.n}</h4><dl><dt>Who</dt><dd>${x.pop}</dd><dt>What</dt><dd>${x.iv}</dd><dt>How long</dt><dd>${x.du}</dd><dt>Result</dt><dd>${x.ef} ${x.c}</dd></dl><div class="chips">${x.o.map(o=>`<span class="tag">${OL[o]}</span>`).join('')}</div></article>`).join('');
    $('#phCount').textContent=`${list.length} of ${T.length} studies`}
  $$('[data-phf]').forEach(b=>b.addEventListener('click',()=>{$$('[data-phf]').forEach(x=>x.setAttribute('aria-pressed',x===b));renderTrials(b.dataset.phf)}));
  renderTrials('all');

  /* ---------- "is it safe to...?" ---------- */
  const NONE={g:'',l:'No statement found',x:'The sources reviewed for this guide make no specific statement for this type. Ask the team that knows you.'};
  const S=[
    {q:'Lift heavier weights?',
     h:{g:'good',l:'Studied: supervised, progressive',x:'In a 100-person RCT in HSD with shoulder symptoms, supervised high-load training (pain below 5/10 allowed) caused no serious adverse events; soreness (56% vs 37%) and headaches (40% vs 20%) were more common than with low load. Many clinicians have avoided high loads; the question is not settled. <sup class="c" data-ref="Liaghat2022BJSM,Liaghat2024BJSM" title="Source 268,269">268,269</sup>'},
     c:{g:'warn',l:'Caution',x:'GeneReviews lists "sports with heavy joint strain" to avoid in classical EDS, and says non-weight-bearing exercise promotes muscle strength and coordination. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>'},
     v:{g:'bad',l:'Avoid, as published',x:'GeneReviews lists heavy lifting and weight training with extreme lifting among the things to avoid in vascular EDS. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>'}},
    {q:'Play contact or collision sport?',
     h:{g:'warn',l:'Higher injury risk',x:'Generalised joint hypermobility raised the odds of knee injury in contact sport (OR 4.69; 95% CI 1.33–16.52), not ankle injury. For upper cervical instability, consensus advises sport-specific training "with precautions such as avoiding contact sports such as football", or changes such as no heading the ball. <sup class="c" data-ref="Pacey2010,Russek2022UCI" title="Source 350,406">350,406</sup>'},
     c:{g:'warn',l:'Caution',x:'Sports with heavy joint strain are listed to avoid. Children with fragile skin can wear soccer pads or ski stockings with shin padding during activities. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>'},
     v:{g:'bad',l:'Avoid, as published',x:'Collision sports are listed to avoid, and the Orphanet review states that "violent sports are inadvisable". <sup class="c" data-ref="Byers2025GeneReviews,Germain2007" title="Source 68,180">68,180</sup>'}},
    {q:'Go scuba diving?',h:NONE,c:NONE,
     v:{g:'bad',l:'Inadvisable, as published',x:'"Intense physical activity, scuba diving and violent sports are inadvisable." <sup class="c" data-ref="Germain2007" title="Source 180">180</sup>'}},
    {q:'Do yoga or see a chiropractor?',
     h:{g:'warn',l:'Not contraindicated, with care',x:'GeneReviews says chiropractic adjustment and yoga are "not contraindicated", but, like all physical treatments, must avoid causing subluxations or dislocations. Many people with HSD/hEDS report injuries "due to inappropriate interventions". <sup class="c" data-ref="Hakim2024GeneReviews,Russek2019" title="Source 199,405">199,405</sup>'},
     c:NONE,
     v:{g:'warn',l:'Caution',x:'No trial defines a safe dose of stretching in vEDS. One case report describes bleeding into muscle during passive hamstring stretching after a stroke and urges caution. <sup class="c" data-ref="Izumi2025" title="Source 220">220</sup>'}},
    {q:'Have neck manipulation or strong neck exercises?',
     h:{g:'bad',l:'Specialist only',x:'For upper cervical instability, the consensus advises highly irritable patients to avoid moderate to large neck movements, isometrics with more than minimal force, and axial loading or distraction. "If in doubt", avoid touching the cervical spine; only clinicians with specific expertise should do cervical manual therapy. <sup class="c" data-ref="Russek2022UCI" title="Source 406">406</sup>'},
     c:{g:'bad',l:'Specialist only',x:'The upper cervical instability consensus covers symptomatic generalised hypermobility: "if in doubt", avoid touching the cervical spine. <sup class="c" data-ref="Russek2022UCI" title="Source 406">406</sup>'},
     v:{g:'warn',l:'Minimise injury',x:'No neck-specific statement was found. The vEDS consensus recommends adapting lifestyle "to minimize injury, risk of vessel/organ rupture". <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>'}},
    {q:'Do high-impact activity, like jumping?',
     h:{g:'warn',l:'May raise risk',x:'GeneReviews says high-impact activity may increase the risk of acute subluxation or dislocation and of pain. A 10-week group running programme for 8 hypermobile children was feasible, with one minor adverse event. <sup class="c" data-ref="Hakim2024GeneReviews,Chappell2026" title="Source 85,199">85,199</sup>'},
     c:{g:'warn',l:'Caution',x:'Sports with heavy joint strain are listed to avoid; non-weight-bearing exercise is suggested instead. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>'},
     v:{g:'bad',l:'Inadvisable, as published',x:'"Intense physical activity" is inadvisable. <sup class="c" data-ref="Germain2007" title="Source 180">180</sup>'}},
    {q:'Keep up regular, gentle exercise?',
     h:{g:'good',l:'The cornerstone',x:'Exercise-based physiotherapy is the cornerstone of care; improvement over time is consistent, even though superiority over comparators is weakly shown. People given exercise advice by a physiotherapist were more likely to exercise a lot each week (OR 1.75). <sup class="c" data-ref="Palmer2021,Simmonds2019" title="Source 357,433">357,433</sup>'},
     c:{g:'good',l:'Encouraged',x:'Non-weight-bearing exercise promotes muscle strength and coordination. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>'},
     v:{g:'good',l:'Encouraged, low intensity',x:'The UK national service advises that "regular, low-intensity exercise should be maintained for health and psychological wellbeing". <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup>'}},
    {q:'Exercise when POTS makes standing hard?',
     h:{g:'good',l:'Guideline-supported',x:'The heart rhythm consensus gives a structured, progressive exercise programme Class IIa and advises starting in non-upright forms (rowing machine, recumbent bike, swimming). In POTS generally, about 3 months of endurance then resistance training, moving from lying to upright, reduced symptoms; evidence in hypermobility is early. <sup class="c" data-ref="Sheldon2015,Peebles2024" title="Source 362,431">362,431</sup>'},
     c:{g:'good',l:'Guideline-supported',x:'The POTS exercise advice is not type-specific: start non-upright and build gradually. <sup class="c" data-ref="Sheldon2015" title="Source 431">431</sup>'},
     v:{g:'warn',l:'Low intensity',x:'Build gently and keep intensity low: intense physical activity is inadvisable in vEDS. <sup class="c" data-ref="Germain2007,Bowen2023vEDS" title="Source 58,180">58,180</sup>'}}
  ];
  let ty='h';const open=new Set();
  function renderSafe(){
    $('#phSafe').innerHTML=S.map((x,i)=>{const a=x[ty],on=open.has(i);
      return `<div class="phq"><button aria-pressed="${on}" data-phq="${i}" aria-controls="phAns${i}">${x.q}</button><div class="ans" id="phAns${i}" ${on?'':'hidden'}><span class="tag ${a.g}">${a.l}</span><p>${a.x}</p></div></div>`}).join('')}
  $('#phSafe').addEventListener('click',e=>{const b=e.target.closest('[data-phq]');if(!b)return;const i=+b.dataset.phq;open.has(i)?open.delete(i):open.add(i);renderSafe();const nb=$(`[data-phq="${i}"]`);nb&&nb.focus()});
  $$('[data-phty]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.phty;$$('[data-phty]').forEach(x=>x.setAttribute('aria-pressed',x===b));renderSafe()}));
  renderSafe();
};
/* =============== 4.2 Medicines =============== */
inits.meds=()=>{
  const svg=$('#meSvg'),rg=$('#meT'),note=$('#meNote'),read=$('#meRead');
  let track='pain';
  const CH={g:['var(--good-soft)','var(--good)'],w:['var(--warn-soft)','var(--warn)'],h:['var(--rx-soft)','var(--rx)'],m:['var(--panel-2)','var(--muted)'],b:['var(--bad-soft)','var(--bad)']};
  const chip=(x,y,l,c,anchorEnd)=>{const w=l.length*5.9+12,x0=anchorEnd?x-w:x,[bg,fg]=CH[c];
    return `<rect x="${f1(x0)}" y="${f1(y-11)}" width="${f1(w)}" height="15" rx="4" style="fill:${bg}"/><text x="${f1(x0+6)}" y="${f1(y)}" class="t-xs" style="fill:${fg};font-weight:600">${l}</text>`};
  const txt=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}" style="${st}">${s}</text>`;
  const bar=(x,y,w,v,max,col,lab,val)=>`${txt(x,y-4,lab,'t-xs')}<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*clamp(v/max))}" height="12" rx="3" style="fill:${col}"/>${txt(x+w*clamp(v/max)+5,y+10,val,'t-xs','fill:var(--ink);font-weight:600')}`;
  /* a vein in cross-section whose fill (blood volume) and calibre change */
  const vessel=(cx,cy,r,fill,lab)=>{let g=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r+5)}" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.4"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--panel)"/>`;
    const rr=rng(7),n=Math.round(10+fill*34);for(let i=0;i<n;i++){const a=rr()*6.283,d=Math.sqrt(rr())*(r-3);g+=`<circle cx="${f1(cx+Math.cos(a)*d)}" cy="${f1(cy+Math.sin(a)*d)}" r="2.2" style="fill:var(--blood);opacity:.8"/>`}
    return g+(lab?txt(cx,cy+r+20,lab,'t-xs t-mid'):'')};
  const hrStrip=(x,y,w,bpm,ph,lab)=>`<rect x="${f1(x)}" y="${f1(y-30)}" width="${f1(w)}" height="44" rx="6" style="fill:var(--panel);stroke:var(--line)"/>${pulse(x+4,y+6,w-8,30,{bpm,secs:5,phase:ph})}${txt(x+w,y-36,Math.round(bpm)+' bpm','t-lbl t-end','fill:var(--ink)')}${lab?txt(x,y-36,lab,'t-xs'):''}`;

  /* glyphs: g(x,y,w,h,f,t) draw inside a box; f = 0..1 progress within the rung */
  const R={
  pain:[
    {n:'Non-drug foundation',c:['Consensus','m'],g:(x,y,w,h,f)=>{let s=joint(x+70,y+h*.48,.62,{lax:.6,muscle:.2+.8*f});
      ['Physiotherapy','Occupational therapy','Braces, cushions, garments'].forEach((l,i)=>{const on=f>i*.25;s+=`<rect x="${f1(x+150)}" y="${f1(y+30+i*40)}" width="${f1(w-160)}" height="28" rx="8" style="fill:${on?'var(--rx-soft)':'var(--panel-2)'};stroke:${on?'var(--rx)':'var(--line)'}"/>`+txt(x+160,y+48+i*40,l,'t-sm',on?'fill:var(--ink)':'')});
      return s+txt(x+150,y+170,'OT and bracing: 70% improved','t-xs','fill:var(--rx)')+txt(x+150,y+184,'(98-person chart review)','t-xs')},
     k:'Rung 1 · pain',t:'Non-drug foundation',
     txt:`The international pain consensus groups management into physical therapy, medicines and "durable medical equipment such as cushions, compressive garments, and braces", treating both the cause (for example a dislocation) and the pain itself. Treatment studies "are few and insufficient to guide management". In a chart review of 98 people with EDS, occupational therapy and bracing were the most effective options, with 70% reporting improvement. <sup class="c" data-ref="Chopra2017,Song2020PainPhysician" title="Source 90,441">90,441</sup>`,
     pt:`Exercise, therapy and supports come first. Medicines are added on top, not instead.`,
     hook:`Pain care in EDS targets the cause (dislocation, poor proprioception) as well as the pain. <sup class="c" data-ref="Chopra2017" title="Source 90">90</sup>`},
    {n:'Simple analgesics, one at a time',c:['Expert opinion','m'],g:(x,y,w,h,f)=>{let s=txt(x,y+18,'ONE DRUG, LOW DOSE, THEN REASSESS','t-xs');
      for(let i=0;i<3;i++){const on=f>i*.3,xx=x+20+i*(w-40)/3;s+=`<rect x="${f1(xx)}" y="${f1(y+50)}" width="44" height="20" rx="10" style="fill:${on?'var(--rx)':'var(--panel-2)'};stroke:var(--line)"/><line x1="${f1(xx+22)}" x2="${f1(xx+22)}" y1="${f1(y+50)}" y2="${f1(y+70)}" style="stroke:var(--panel);stroke-width:1.4"/>`;
        if(f>i*.3+.15)s+=`<path d="M${f1(xx+8)} ${f1(y+96)}l8 8l16 -16" style="fill:none;stroke:var(--good);stroke-width:2.4"/>`+txt(xx+40,y+102,i<2?'review':'keep?','t-xs');
        if(i<2)s+=`<path d="M${f1(xx+52)} ${f1(y+60)}H${f1(xx+(w-40)/3-8)}" class="arrow" marker-end="url(#meArr)"/>`}
      return s+bar(x+10,y+150,w-90,92.4*ramp(f,0,.6),100,'var(--rx)','took medicines (79 people with hEDS)',(92.4*ramp(f,0,.6)).toFixed(1)+'%')},
     k:'Rung 2 · pain',t:'Simple analgesics, one at a time',
     txt:`A 2026 expert review found evidence for pain drugs in hypermobility "low-level", supporting no "disease-specific, repurposed, or novel drug". It advises one drug at a time, usually at a low dose, with benefit and side effects reassessed after a set trial. GeneReviews states that anti-inflammatory drugs may relieve joint pain in classical EDS. In 79 people with hEDS, 92.4% took medicines, mostly analgesics; heavier use went with more dysfunction, though the design cannot show which came first. The 2017 consensus's drug-by-drug advice is not reproduced here because its full text could not be read. <sup class="c" data-ref="Castori2026EOP,Malfait2024GeneReviews,Rombaut2011F" title="Source 79,293,395">79,293,395</sup>`,
     pt:`Doctors usually try one painkiller at a time, at a low dose, and check whether it really helps before adding anything else.`,
     hook:`No drug has good trial evidence for EDS pain; try one at a time and reassess. <sup class="c" data-ref="Castori2026EOP" title="Source 79">79</sup>`},
    {n:'Neuropathic agents',c:['Expert opinion','m'],g:(x,y,w,h,f)=>{let d='',s='';for(let i=0;i<=60;i++){const xx=x+10+(w-20)*i/60;d+=(i?'L':'M')+f1(xx)+' '+f1(y+60+Math.sin(i*.5)*8)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--nerve);stroke-width:3;opacity:.7"/>`;
      const n=Math.round(lerp(9,3,f));for(let i=0;i<n;i++){const u=((i/n)+f*.9)%1,xx=x+10+(w-20)*u;s+=`<circle cx="${f1(xx)}" cy="${f1(y+60+Math.sin(u*60*.5)*8)}" r="4" style="fill:var(--variant)"/>`}
      s+=txt(x+10,y+30,'pain signals damped (schematic)','t-xs');
      return s+bar(x+10,y+140,w-90,47*ramp(f,.2,.8),100,'var(--warn)','reported adverse effects (98-person review)',Math.round(47*ramp(f,.2,.8))+'%')},
     k:'Rung 3 · pain',t:'Neuropathic agents',
     txt:`GeneReviews describes chronic pain in hEDS as "often neuropathic in nature" and recommends "pain management tailored to cause and symptoms". It warns that autonomic and gut problems may limit choices: common analgesics in someone with slow gut transit, or vasodilators in someone with orthostatic intolerance. In a 98-person chart review, neuropathic modulators were the least well tolerated option, with 47% reporting adverse effects. <sup class="c" data-ref="Hakim2024GeneReviews,Song2020PainPhysician" title="Source 199,441">199,441</sup>`,
     pt:`Some EDS pain comes from irritated nerves. Nerve-pain medicines help some people, but side effects are common.`,
     hook:`Neuropathic modulators: least tolerated, 47% adverse effects in one EDS chart review. <sup class="c" data-ref="Song2020PainPhysician" title="Source 441">441</sup>`},
    {n:'Specialist pain service',c:['Consensus','m'],g:(x,y,w,h,f)=>{const cx=x+w/2,cy=y+h*.45,r=Math.min(w,h)*.33;let s=person(cx-9,cy-14,28,'var(--ink)');
      ['Physio','Psychology','Pain doctor','OT','Anaesthesia'].forEach((l,i)=>{const a=-Math.PI/2+i*2*Math.PI/5,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r*.8,on=f>i*.16;
        s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(px)}" y2="${f1(py)}" style="stroke:var(--rx);stroke-width:1.4;opacity:${on?.8:.12}"/><circle cx="${f1(px)}" cy="${f1(py)}" r="15" style="fill:${on?'var(--rx-soft)':'var(--panel-2)'};stroke:var(--rx)"/>`+txt(px,py+(py>cy?30:-20),l,'t-xs t-mid',on?'fill:var(--ink)':'')});
      return s},
     k:'Rung 4 · pain',t:'Specialist pain service',
     txt:`Multidisciplinary programmes combine physiotherapy with psychological approaches. A UK cognitive behavioural programme (87 people, 8 days over 6 weeks) improved self-efficacy, mood and pain at 1 month, though gains drifted by 5 months. For surgery, a 2026 Delphi panel recommends multimodal analgesia and regional anaesthesia in hEDS, and one team proposes opioid-free anaesthesia with lidocaine, ketamine and dexmedetomidine as opioid-sparing adjuncts <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Rahman2014,Amaral2026,RamirezPaesano2023" title="Source 8,371,375">8,371,375</sup>`,
     pt:`A pain team brings several kinds of help together: exercise, coping skills and careful use of medicines.`,
     hook:`Multimodal, opioid-sparing analgesia and regional techniques are the consensus for hEDS surgery. <sup class="c" data-ref="Amaral2026" title="Source 8">8</sup>`},
    {n:'Opioids: cautions',c:['Observational','w'],g:(x,y,w,h,f)=>{const v=ramp(f,0,.7),bw=w-110;let s=txt(x,y+18,'OPIOID PRESCRIPTION CLAIMS, US 2005–2014','t-xs');
      s+=bar(x,y+50,bw,62*v,100,'var(--vas)','adults with EDS',(62*v).toFixed(0)+'%')+bar(x,y+82,bw,34.1*v,100,'var(--muted)','matched controls',(34.1*v).toFixed(1)+'%');
      s+=bar(x,y+124,bw,27.5*v,100,'var(--vas)','children with EDS',(27.5*v).toFixed(1)+'%')+bar(x,y+156,bw,13.5*v,100,'var(--muted)','matched controls',(13.5*v).toFixed(1)+'%');
      return s},
     k:'Rung 5 · pain',t:'Opioids: what is published',
     txt:`In US claims data, 62% of adults with EDS had an opioid prescription vs 34.1% of matched controls (children 27.5% vs 13.5%), and those with EDS had higher cumulative doses. After hip replacement, 14.8% of people with EDS who received opioids had a hip dislocation vs 2.1% of those who did not (OR 8.13), an association the authors caution against reading as cause and effect. One surgical team describes opioid-induced hyperalgesia and central sensitisation in hEDS. <sup class="c" data-ref="Schubart2019Opioid,Kelly2024THA,RamirezPaesano2023" title="Source 242,375,420">242,375,420</sup>`,
     pt:`People with EDS are given strong opioid painkillers about twice as often as others. These carry real risks, so teams try other options first.`,
     hook:`EDS adults: opioid claims 62% vs 34.1% in controls (US claims). <sup class="c" data-ref="Schubart2019Opioid" title="Source 420">420</sup>`}
  ],
  pots:[
    {n:'Fluids and salt',c:['HRS IIb','w'],g:(x,y,w,h,f)=>{let s=vessel(x+60,y+80,lerp(26,38,f),f,'blood volume (schematic)');
      s+=txt(x+130,y+40,'HRS 2015: 2–3 L water,','t-sm','fill:var(--ink)')+txt(x+130,y+56,'10–12 g sodium chloride/day','t-sm','fill:var(--ink)');
      s+=txt(x+130,y+84,'NIH 2019: 2–3 L water,','t-sm')+txt(x+130,y+100,'3–10 g sodium/day','t-sm');
      s+=txt(x+130,y+130,'note the different units','t-xs','fill:var(--warn)');
      return s+txt(x+10,y+178,'High-sodium diet raised plasma volume in a 6-day study','t-xs','fill:var(--rx)')},
     k:'POTS · step 1',t:'Fluids and salt',
     txt:`The heart rhythm society (HRS 2015, Class IIb, level E) says up to 2–3 L of water and 10–12 g of sodium chloride daily "may be considered". The NIH 2019 consensus recommends at least 2–3 L of water and 3–10 g of sodium a day, adding that the true benefit and best dose of salt loading need research. In a 6-day crossover study, high versus low sodium increased plasma volume and reduced the standing heart-rate rise, though standing heart rate stayed higher than in controls (117 vs 85). <sup class="c" data-ref="Sheldon2015,Vernino2021,Garland2021JACC" title="Source 175,431,488">175,431,488</sup>`,
     pt:`Drinking more and, if your doctor agrees, eating more salt can raise blood volume so less blood pools in the legs.`,
     hook:`HRS gives grams of sodium chloride (10–12 g); NIH gives grams of sodium (3–10 g). <sup class="c" data-ref="Sheldon2015,Vernino2021" title="Source 431,488">431,488</sup>`},
    {n:'Compression',c:['RCT crossover','g'],g:(x,y,w,h,f)=>{const L=[['none',109],['leg',103],['abdomen + thigh',97],['full',92]],k=Math.min(3,Math.floor(f*4));
      let s='';L.forEach(([l,v],i)=>{s+=bar(x+10,y+28+i*30,w-100,v-60,60,i<=k?'var(--rx)':'var(--panel-2)',l,i<=k?v+' bpm':'')});
      return s+hrStrip(x+10,y+180,w-20,L[k][1],f*4%1,'heart rate on tilt')},
     k:'POTS · step 2',t:'Compression',
     txt:`In a randomised crossover tilt study of 30 adults with POTS, compression lowered heart rate in a dose-dependent way: 109 beats/min with none, 103 leg-only, 97 abdomen and thigh, 92 full abdominal-leg compression (p<0.001), and symptoms improved. An abdominal-only garment lowered standing heart rate (103 vs 118) until it was taken off. <sup class="c" data-ref="Bourne2021JACC,Bourne2026CJC" title="Source 52,53">52,53</sup>`,
     pt:`Tight garments over the tummy and legs stop blood pooling when you stand, so the heart does not have to race.`,
     hook:`Full abdominal-leg compression: tilt heart rate 109 → 92 bpm. <sup class="c" data-ref="Bourne2021JACC" title="Source 52">52</sup>`},
    {n:'Reconditioning',c:['HRS IIa','g'],g:(x,y,w,h,f)=>{let s=tilt(x+80,y+90,1,lerp(0,70,ease(f)),{pool:f*.25});
      s+=txt(x+170,y+30,f<.5?'start lying or sitting:':'build towards upright','t-sm','fill:var(--ink)')+txt(x+170,y+46,f<.5?'rowing, recumbent bike, swimming':'over about 3 months','t-xs');
      return s+bar(x+170,y+90,w-250,9*ramp(f,.3,1),12,'var(--rx)','upright HR fall after 3 months','−'+Math.round(9*ramp(f,.3,1))+' bpm')+bar(x+170,y+130,w-250,53*ramp(f,.4,1),100,'var(--rx)','no longer met POTS criteria',Math.round(10*ramp(f,.4,1))+' of 19')},
     k:'POTS · step 3',t:'Reconditioning',
     txt:`A regular, structured and progressive exercise programme "can be effective" (HRS 2015, Class IIa), starting in non-upright forms such as a rowing machine, recumbent bike or swimming. After 3 months of training, upright heart rate fell by 9 beats/min and 10 of 19 people no longer met POTS criteria. In another trial, training improved SF-36 physical functioning from 33 to 50, while propranolol did not improve quality of life. <sup class="c" data-ref="Sheldon2015,Fu2010JACC,Fu2011Hypertension" title="Source 171,172,431">171,172,431</sup>`,
     pt:`Exercise helps POTS, but start lying down or sitting (rowing, cycling on a recumbent bike, swimming) and build up slowly.`,
     hook:`3 months of training: 10 of 19 no longer met POTS criteria. <sup class="c" data-ref="Fu2010JACC" title="Source 171">171</sup>`},
    {n:'Fludrocortisone · midodrine',c:['HRS IIb','w'],g:(x,y,w,h,f)=>{const a=f<.5,ff=a?f*2:(f-.5)*2;
      let s=vessel(x+70,y+80,a?lerp(26,34,ff):lerp(34,22,ff),a?.4+.4*ff:.8,a?'volume ↑ ?':'vessel tightens');
      s+=txt(x+150,y+30,a?'FLUDROCORTISONE':'MIDODRINE','t-sm','fill:var(--ink);font-weight:600');
      const L=a?['retains sodium; effect may last only 1–2 days','no RCT in POTS; no evidence it raises','blood volume; needs a high-sodium diet','label: Addison\'s disease, 0.1 mg daily']
               :['constricts blood vessels; short-acting,','dosed 3 times a day','boxed warning: supine hypertension','label: 10 mg 3×/day, daytime only'];
      L.forEach((l,i)=>s+=txt(x+150,y+52+i*18,l,'t-xs',i===L.length-1?'fill:var(--warn)':''));
      return s+chip(x+150,y+150,a?'Hypothesis: untested in POTS':'Early evidence',a?'h':'w')},
     k:'POTS · step 4',t:'Volume and vessel drugs',
     txt:`HRS 2015 says it "seems reasonable" to use fludrocortisone (Class IIb), but notes it has not been tested in randomised trials in POTS and its effect on plasma volume might last 1–2 days; the NIH adds there is no evidence it actually increases blood volume and that it needs a high-sodium diet with potassium monitored. Midodrine "may be considered" (Class IIb); it acts briefly and its label carries a boxed warning that it "can cause marked elevation of supine blood pressure", with 10 mg three times daily in daytime, not after the evening meal or within 4 hours of bedtime. <sup class="c" data-ref="Sheldon2015,Vernino2021,FDA-Fludrocortisone,FDA-Midodrine" title="Source 152,156,431,488">152,156,431,488</sup>`,
     pt:`These medicines try to hold more fluid in the blood or tighten blood vessels. Neither is approved for POTS, and both need monitoring.`,
     hook:`Midodrine: boxed warning for supine hypertension; no dose after the evening meal. <sup class="c" data-ref="FDA-Midodrine" title="Source 156">156</sup>`},
    {n:'Propranolol · ivabradine',c:['Small RCTs','w'],g:(x,y,w,h,f)=>{const bpm=lerp(118,100,ease(ramp(f,.1,.9)));
      let s=hrStrip(x+10,y+44,w-20,bpm,f*6%1,'peak tilt heart rate');
      s+=txt(x+10,y+92,'28 WOMEN WITH POTS, 4 WEEKS PER PHASE','t-xs');
      [['placebo',118,'var(--muted)'],['propranolol',100,'var(--rx)'],['ivabradine',99,'var(--accent)']].forEach(([l,v,c],i)=>{const vv=i?lerp(118,v,ramp(f,.2,.9)):118;s+=bar(x+10,y+112+i*30,w-80,vv-60,60,c,l,Math.round(vv)+' bpm')});
      return s},
     k:'POTS · step 5',t:'Slowing the heart',
     txt:`Low-dose propranolol "may be considered" (HRS 2015, Class IIb). In 54 people, 20 mg lowered heart rate and symptoms; 80 mg lowered heart rate more, but symptoms improved more with 20 mg: "less is more". Ivabradine lowered heart rate and improved physical and social functioning in 22 people with hyperadrenergic POTS. In a 2026 crossover trial, peak tilt heart rate was 99 on ivabradine, 100 on propranolol and 118 on placebo. The ivabradine label (heart failure) warns of fetal toxicity and advises effective contraception, which matters because most people with POTS are women of childbearing age. <sup class="c" data-ref="Sheldon2015,Raj2009Circ,Taub2021JACC,Uppal2026,FDA-Corlanor,Vernino2021" title="Source 151,373,431,458,471,488">151,373,431,458,471,488</sup>`,
     pt:`Some heart medicines slow a racing heart. Small doses often work best. None is officially approved for POTS.`,
     hook:`Propranolol in POTS: 20 mg beat 80 mg for symptoms ("less is more"). <sup class="c" data-ref="Raj2009Circ" title="Source 373">373</sup>`},
    {n:'Pyridostigmine',c:['HRS IIb','w'],g:(x,y,w,h,f)=>{const hr=f<.5?lerp(119,104,f*2):lerp(104,100,(f-.5)*2),hrs=f*4;
      let s=hrStrip(x+10,y+44,w-20,hr,f*6%1,'standing HR, '+hrs.toFixed(1)+' h after 30 mg');
      const X=v=>x+30+(w-60)*v/4,Y=v=>y+180-(v-95)*3;s+=`<line x1="${f1(X(0))}" x2="${f1(X(4))}" y1="${f1(Y(95))}" y2="${f1(Y(95))}" class="axis"/>`;
      let d='';[[0,119],[2,104],[4,100]].forEach(([a,b],i)=>{d+=(i?'L':'M')+f1(X(a))+' '+f1(Y(b));s+=`<circle cx="${f1(X(a))}" cy="${f1(Y(b))}" r="3.5" style="fill:var(--rx)"/>`+txt(X(a),Y(b)-8,b,'t-xs t-mid','fill:var(--ink)')+txt(X(a),Y(95)+13,a+' h','t-xs t-mid')});
      s+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:2"/><circle cx="${f1(X(hrs))}" cy="${f1(Y(hr))}" r="5" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`;
      return s},
     k:'POTS · step 6',t:'Pyridostigmine',
     txt:`It "seems reasonable" to use pyridostigmine (HRS 2015, Class IIb). In 17 people, a single 30 mg dose cut standing heart rate from 119 to 104 at 2 hours and 100 at 4 hours, with no change in blood pressure. In a series of 203 people, 43% improved and 19% had gut side effects. In a 3-month factorial trial, adding pyridostigmine to propranolol or bisoprolol gave no clear extra benefit. Its label is for myasthenia gravis. <sup class="c" data-ref="Sheldon2015,Raj2005Circ,Kanjwal2011,Moon2018Neurotherapeutics,FDA-Mestinon" title="Source 155,237,313,372,431">155,237,313,372,431</sup>`,
     pt:`This medicine boosts a nerve signal that slows the heart. It helps some people; stomach upset is a common side effect.`,
     hook:`There are no FDA-approved medicines for POTS; all of these are off-label. <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>`}
  ],
  veds:[
    {n:'Confirm, plan, passport',c:['Consensus','m'],g:(x,y,w,h,f)=>{let s=`<rect x="${f1(x+20)}" y="${f1(y+20)}" width="190" height="120" rx="10" style="fill:var(--panel);stroke:var(--vas);stroke-width:1.6"/>`+zebra(x+50,y+50,16,{id:'meZb'});
      s+=txt(x+74,y+46,'vEDS EMERGENCY PASSPORT','t-xs','fill:var(--vas);font-weight:600')+txt(x+74,y+60,'COL3A1 variant confirmed','t-xs');
      ['Diagnosis & variant','Management plan','Emergency contacts','Avoid arteriography'].forEach((l,i)=>{if(f>i*.22)s+=txt(x+36,y+88+i*14,'✓ '+l,'t-xs','fill:var(--ink)')});
      s+=txt(x+230,y+40,'Sudden, unexplained','t-sm','fill:var(--ink)')+txt(x+230,y+56,'pain = urgent care','t-sm','fill:var(--ink)');
      return s+txt(x+230,y+84,'care centralised at','t-xs')+txt(x+230,y+98,'experienced centres','t-xs')},
     k:'vEDS · step 1',t:'Confirm, plan, carry a passport',
     txt:`The 2017 vEDS consensus recommends confirming the COL3A1 variant before applying the diagnosis, adapting lifestyle to minimise injury and rupture risk, building a care team, and carrying an individual emergency plan (a "vascular EDS passport"). GeneReviews advises a MedicAlert bracelet or emergency letter and immediate medical attention for sudden, unexplained pain. See <a href="#vascular" data-go="vascular">Vascular EDS</a>. <sup class="c" data-ref="Byers2017,Byers2025GeneReviews" title="Source 67,68">67,68</sup>`,
     pt:`Carry a card or letter that says you have vascular EDS. Sudden, unexplained pain needs urgent hospital care.`,
     hook:`vEDS passport: diagnosis + plan, carried at all times; sudden unexplained pain = emergency. <sup class="c" data-ref="Byers2017,Byers2025GeneReviews" title="Source 67,68">67,68</sup>`},
    {n:'Blood-pressure control',c:['Consensus','m'],g:(x,y,w,h,f)=>{const cx=x+100,cy=y+120,r=80,v=lerp(.85,.42,ease(f)),a=Math.PI*(1-v);
      let s='';[[0,.55,'var(--good)'],[.55,.75,'var(--warn)'],[.75,1,'var(--bad)']].forEach(([p,q,c])=>{const a0=Math.PI*(1-p),a1=Math.PI*(1-q);s+=`<path d="M${f1(cx+Math.cos(a0)*r)} ${f1(cy-Math.sin(a0)*r)}A${r} ${r} 0 0 1 ${f1(cx+Math.cos(a1)*r)} ${f1(cy-Math.sin(a1)*r)}" style="fill:none;stroke:${c};stroke-width:12;opacity:.7"/>`});
      s+=`<line x1="${cx}" y1="${cy}" x2="${f1(cx+Math.cos(a)*(r-16))}" y2="${f1(cy-Math.sin(a)*(r-16))}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><circle cx="${cx}" cy="${cy}" r="5" style="fill:var(--ink)"/>`;
      s+=txt(cx,cy+22,v<.55?'normal range':'raised','t-sm t-mid','fill:var(--ink)');
      return s+txt(x+200,y+60,'"maintain blood pressure in','t-sm','fill:var(--ink)')+txt(x+200,y+76,'the normal range and treat','t-sm','fill:var(--ink)')+txt(x+200,y+92,'hypertension aggressively"','t-sm','fill:var(--ink)')+txt(x+200,y+120,'2017 vEDS consensus','t-xs')},
     k:'vEDS · step 2',t:'Blood-pressure control',
     txt:`The consensus says to "maintain blood pressure in the normal range and treat hypertension aggressively", and GeneReviews advises regular blood-pressure monitoring so hypertension is treated early. In 1,780 people with heritable aortic disease genes, arterial events beyond the aorta were most common with COL3A1 (20.8% vs 1.5% with FBN1); the authors stress smoking cessation and blood-pressure control. <sup class="c" data-ref="Byers2017,Byers2025GeneReviews,CalderonMartinez2025" title="Source 67,68,69">67,68,69</sup>`,
     pt:`Keeping blood pressure normal lowers the strain on fragile artery walls.`,
     hook:`vEDS: treat hypertension aggressively; arteries can rupture "even without significant dilation". <sup class="c" data-ref="Byers2017,Isselbacher2022" title="Source 67,219">67,219</sup>`},
    {n:'Celiprolol',c:['Open RCT','g'],g:(x,y,w,h,f)=>{const X=m=>x+20+(w-40)*m/24,Y=d=>y+150-d*.28;let s=txt(x+20,y+18,'BBEST TITRATION: +100 mg EVERY 6 MONTHS','t-xs');
      let d='';[[0,100],[6,200],[12,300],[18,400]].forEach(([m,dz],i)=>{d+=(i?`L${f1(X(m))} ${f1(Y([0,100,200,300][i]))}`:`M${f1(X(m))} ${f1(Y(0))}`)+`L${f1(X(m))} ${f1(Y(dz))}`;if(f*24>=m)s+=txt(X(m)+4,Y(dz)-5,dz+' mg/day','t-xs','fill:var(--ink)')});
      d+=`L${f1(X(24))} ${f1(Y(400))}`;
      s+=`<path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:3"/>`;
      s+=`<clipPath id="meClipC"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(20+(w-40)*f)}" height="${h}"/></clipPath><path d="${d}" clip-path="url(#meClipC)" style="fill:none;stroke:var(--rx);stroke-width:3"/>`;
      s+=`<line x1="${f1(X(0))}" x2="${f1(X(24))}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" class="axis"/>`+[0,6,12,18,24].map(m=>txt(X(m),Y(0)+13,m+' mo','t-xs t-mid')).join('');
      s+=artery(x+20,y+190,w-40,{r:9,media:6,thin:true,flow:f*3});
      return s+txt(x+w-20,y+40,'β1 blocker + β2 agonist','t-xs t-end','fill:var(--rx)')},
     k:'vEDS · step 3',t:'Celiprolol',
     txt:`Celiprolol is a β1-adrenoceptor antagonist with β2-agonist action, chosen to lower arterial wall stress without excessive vasodilation or heart-rate slowing <span class="ev hyp">Hypothesis</span> for the mechanism. In BBEST, it was given twice daily and uptitrated by 100 mg every 6 months to a maximum of 400 mg/day. Arterial rupture or dissection occurred in 20% vs 50% (HR 0.36). In a French cohort of 144 people, celiprolol users survived longer, best at 400 mg/day (observational). The 2022 ACC/AHA guideline notes the data were judged insufficient for FDA approval, and celiprolol has no FDA approval for any indication. <sup class="c" data-ref="Ong2010,Buso2024,Frank2019JACC,Isselbacher2022,openFDA-Celiprolol" title="Source 65,170,219,345,346">65,170,219,345,346</sup>`,
     pt:`Celiprolol is a heart-and-artery medicine that lowered artery tears in one trial. It is not approved in the US and is not available in every country.`,
     hook:`BBEST: celiprolol 20% vs 50% arterial events, HR 0.36 (0.15–0.88); open-label, stopped early. <sup class="c" data-ref="Ong2010" title="Source 345">345</sup>`},
    {n:'Adding an ARB',c:['Small RCT','w'],g:(x,y,w,h,f)=>{const v=ramp(f,0,.8);let s=txt(x+10,y+18,'ARCADE, 2 YEARS, ALL ON CELIPROLOL','t-xs');
      s+=bar(x+10,y+50,w-110,53.6*v,100,'var(--muted)','placebo (28)',(53.6*v).toFixed(1)+'%')+bar(x+10,y+88,w-110,27.6*v,100,'var(--rx)','irbesartan (29)',(27.6*v).toFixed(1)+'%');
      s+=txt(x+10,y+132,'arterial event or new/worse lesion on imaging','t-xs');
      return s+(f>.8?txt(x+10,y+160,'HR 0.42 (95% CI 0.17–0.99)','t-lbl','fill:var(--rx)'):'')},
     k:'vEDS · step 4',t:'Adding an ARB',
     txt:`In ARCADE, 57 adults already on celiprolol were randomised to irbesartan (150 mg/day titrated to 300 mg/day) or placebo for 2 years. The composite of arterial events or new or worsening lesions on imaging occurred in 27.6% vs 53.6% (HR 0.42, 95% CI 0.17–0.99). Blood pressure fell 5.4 mm Hg, but this did not explain the benefit; 11 hypotension episodes led to down-titration in 4 people. The 2022 ACC/AHA guideline, written before ARCADE, said there were no studies showing ARB benefit. <span class="ev early">Early evidence</span> one small trial, not yet replicated. <sup class="c" data-ref="Jeunemaitre2025,Isselbacher2022" title="Source 219,226">219,226</sup>`,
     pt:`In one trial, adding a second blood-pressure medicine (irbesartan) to celiprolol halved new artery problems.`,
     hook:`ARCADE: irbesartan + celiprolol, 27.6% vs 53.6%, HR 0.42. <sup class="c" data-ref="Jeunemaitre2025" title="Source 226">226</sup>`},
    {n:'Surveillance, avoid harm',c:['Consensus','m'],g:(x,y,w,h,f)=>{const X=yr=>x+20+(w-40)*yr/6;let s=txt(x+20,y+18,'IMAGING (ACC/AHA TYPICAL PROTOCOL)','t-xs');
      [['abnormal: yearly',[0,1,2,3,4,5,6],'var(--vas)',50],['normal: every 2 years',[0,2,4,6],'var(--rx)',90]].forEach(([l,ys,c,yy])=>{s+=txt(x+20,y+yy-10,l,'t-xs')+`<line x1="${f1(X(0))}" x2="${f1(X(6))}" y1="${f1(y+yy)}" y2="${f1(y+yy)}" class="axis"/>`;
        ys.forEach(v=>{if(v<=f*6+.01)s+=`<circle cx="${f1(X(v))}" cy="${f1(y+yy)}" r="6" style="fill:${c}"/>`})});
      [0,2,4,6].forEach(v=>s+=txt(X(v),y+112,'year '+v,'t-xs t-mid'));
      s+=`<rect x="${f1(x+20)}" y="${f1(y+132)}" width="${f1(w-40)}" height="46" rx="8" style="fill:var(--bad-soft)"/>`+txt(x+32,y+152,'✕ diagnostic arteriography (historical series: 67% complications)','t-xs','fill:var(--bad)')+txt(x+32,y+168,'✕ routine colonoscopy, elective surgery unless clearly needed','t-xs','fill:var(--bad)');
      return s},
     k:'vEDS · step 5',t:'Surveillance and avoiding harm',
     txt:`The consensus suggests imaging the arteries "if feasible on an annual basis"; the ACC/AHA describes baseline head-to-pelvis CT or MR, then yearly imaging of abnormal segments or every 2 years if normal, while stating the right interval is uncertain; European centres differ. GeneReviews discourages arteriography except to locate life-threatening bleeding before surgery (one historical series reported 67% complications), and advises avoiding routine colonoscopy and elective surgery unless the benefit is substantial. <sup class="c" data-ref="Byers2017,Isselbacher2022,vanDeLaar2022,Byers2025GeneReviews,Cikrit1987" title="Source 67,68,94,219,477">67,68,94,219,477</sup>`,
     pt:`Regular scans watch the arteries. Tests that put a tube inside an artery are avoided unless they are needed to save a life.`,
     hook:`vEDS: avoid diagnostic arteriography (67% complications in a historical series). <sup class="c" data-ref="Cikrit1987,Byers2025GeneReviews" title="Source 68,94">68,94</sup>`}
  ]};
  const ST={};const SA={};
  ['pain','pots','veds'].forEach(k=>{const n=R[k].length;ST[k]=R[k].map((r,i)=>({from:i/n,at:(i+.55)/n,k:r.k,t:r.t,txt:r.txt,pt:r.pt,hook:r.hook}));
    const el=$('#meSteps'+k[0].toUpperCase()+k.slice(1));SA[k]=stepWire(el,ST[k],rg,t=>{if(track!==k)setTrack(k);draw(t)},()=>stop())});

  function draw(t){
    const N=vb(svg,'720 380','400 640');const rungs=R[track],n=rungs.length,pos=clamp(t*n,0,n-.0001),i=Math.floor(pos),f=pos-i;
    const L=N?{lx0:30,lx1:370,ly0:300,ly1:28,gx:20,gy:340,gw:360,gh:290}:{lx0:30,lx1:300,ly0:352,ly1:30,gx:330,gy:20,gw:378,gh:340};
    let s=`<defs>${marker('meArr','var(--muted)')}</defs>`;
    const sp=(L.ly0-L.ly1)/n,ry=k=>L.ly0-(k+.5)*sp;
    s+=`<line x1="${L.lx0}" x2="${L.lx0}" y1="${L.ly1-8}" y2="${L.ly0+8}" style="stroke:var(--muted);stroke-width:4;stroke-linecap:round"/><line x1="${L.lx1}" x2="${L.lx1}" y1="${L.ly1-8}" y2="${L.ly0+8}" style="stroke:var(--muted);stroke-width:4;stroke-linecap:round"/>`;
    rungs.forEach((r,k)=>{const y=ry(k)+sp*.3,cur=k===i,past=k<i;
      s+=`<line x1="${L.lx0}" x2="${L.lx1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${cur?'var(--rx)':past?'var(--ink)':'var(--line)'};stroke-width:${cur?5:3};stroke-linecap:round"/>`;
      s+=txt(L.lx0+12,y-8,(k+1)+'. '+r.n,cur?'t-lbl':'t-sm',cur?'fill:var(--rx)':past?'fill:var(--ink)':'');
      s+=chip(L.lx1-8,y+18,r.c[0],r.c[1],true)});
    const my=lerp(ry(i)+sp*.3,ry(Math.min(n-1,i+1))+sp*.3,i<n-1?ease(ramp(f,.85,1)):0);
    s+=`<circle cx="${L.lx0}" cy="${f1(my)}" r="8" style="fill:var(--rx);stroke:var(--panel);stroke-width:2"/>`;
    /* glyph panel */
    s+=`<rect x="${L.gx}" y="${L.gy}" width="${L.gw}" height="${L.gh}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=txt(L.gx+14,L.gy+26,rungs[i].n,'t-big')+chip(L.gx+L.gw-12,L.gy+24,rungs[i].c[0],rungs[i].c[1],true);
    const k=N?1:1.12,dy=N?52:62;s+=`<g transform="translate(${L.gx+14} ${L.gy+dy}) scale(${k})">${rungs[i].g(0,0,(L.gw-28)/k,(L.gh-dy-10)/k,f)}</g>`;
    svg.innerHTML=s;
    const st=ST[track],ph=phaseOf(st,t);note.innerHTML=noteHTML(st[ph]);SA[track](ph);
    read.innerHTML=`<span>Ladder <b>${{pain:'Pain',pots:'POTS',veds:'Vascular EDS'}[track]}</b></span><span>Rung <b>${i+1} of ${n}</b></span><span>Evidence <b>${rungs[i].c[0]}</b></span>`;
  }
  function setTrack(k){track=k;$$('[data-metr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.metr===k));
    ['Pain','Pots','Veds'].forEach(x=>$('#meSteps'+x).hidden=x.toLowerCase()!==k)}
  const stop=playWire(rg,$('#mePlay'),draw,11000,'Replay','meds');
  $$('[data-metr]').forEach(b=>b.addEventListener('click',()=>{stop();setTrack(b.dataset.metr);rg.value=.1;draw(.1)}));
  draw(+rg.value);

  /* ---------- icon array: BBEST / ARCADE ---------- */
  const bsvg=$('#meBb'),brg=$('#meBbT'),bnote=$('#meBbNote');
  const TRI={
    bbest:{mo:47,arms:[{l:'Celiprolol',n:25,e:5,c:'var(--rx)'},{l:'No treatment',n:28,e:14,c:'var(--muted)'}],hr:'HR 0.36 (95% CI 0.15–0.88), p=0.040',
      note:{k:'BBEST · Lancet 2010',t:'Celiprolol: 20% vs 50%',
        txt:`53 people with clinical vEDS (25 celiprolol, 28 untreated), at 8 centres in France and 1 in Belgium. Arterial rupture or dissection, fatal or not: 5 of 25 vs 14 of 28 over a mean 47 months (HR 0.36, 95% CI 0.15–0.88). Limitations: open-label (no placebo), small, only 33 of 53 had a confirmed COL3A1 variant, and stopped early for benefit, which can exaggerate an effect. Side effects: severe fatigue in 1 person, mild fatigue in 2 during uptitration. A placebo-controlled phase 3 trial, DiSCOVER (NCT05432466), is recruiting. <sup class="c" data-ref="Ong2010,NCT00190411,NCT05432466" title="Source 326,333,345">326,333,345</sup>`,
        pt:`Fewer people on celiprolol had an artery tear. But the trial was small and everyone knew who was getting the medicine.`,
        hook:`BBEST limitations: open, 53 patients (33 COL3A1-confirmed), stopped early. <sup class="c" data-ref="Ong2010" title="Source 345">345</sup>`}},
    arcade:{mo:24,arms:[{l:'Irbesartan',n:29,e:8,c:'var(--rx)'},{l:'Placebo',n:28,e:15,c:'var(--muted)'}],hr:'HR 0.42 (95% CI 0.17–0.99)',
      note:{k:'ARCADE · Circulation 2025',t:'Irbesartan on top of celiprolol: 27.6% vs 53.6%',
        txt:`Double-blind and placebo-controlled: 57 adults with vEDS on stable celiprolol, randomised to irbesartan (150 mg/day titrated to 300 mg/day) or placebo for 2 years. The composite outcome counted symptomatic arterial events and new or worsening lesions on systematic imaging: 8 of 29 vs 15 of 28 (HR 0.42, 95% CI 0.17–0.99). The upper limit of the interval is close to 1, the trial is small, and it is not yet replicated. <sup class="c" data-ref="Jeunemaitre2025,NCT02597361" title="Source 226,328">226,328</sup>`,
        pt:`Adding irbesartan to celiprolol roughly halved new artery problems found by symptoms or scans, in one small trial.`,
        hook:`ARCADE's outcome includes imaging findings, so it is not directly comparable with BBEST's clinical events. <sup class="c" data-ref="Jeunemaitre2025,Ong2010" title="Source 226,345">226,345</sup>`}}};
  let tri='bbest';
  function drawBb(t){
    const N=vb(bsvg,'720 330','400 560'),T=TRI[tri],m=t*T.mo;let s='';
    const cols=8,sz=N?24:26,gx=N?40:40,gy=N?40:40;
    T.arms.forEach((a,ai)=>{const ox=N?20:(ai?380:30),oy=N?(ai?212:24):24,rr=rng(ai?31:17);
      const times=[];for(let k=0;k<a.e;k++)times.push(T.mo*(k+.5+ (rr()-.5)*.6)/a.e);
      const pick=[];const r2=rng(ai?5:9);while(pick.length<a.e){const p=Math.floor(r2()*a.n);if(!pick.includes(p))pick.push(p)}
      let cnt=0;
      s+=txt(ox,oy+12,a.l.toUpperCase()+' · '+a.n,'t-sm','fill:var(--ink);font-weight:600');
      for(let p=0;p<a.n;p++){const ev=pick.indexOf(p),hit=ev>=0&&times[ev]<=m;if(hit)cnt++;
        const px=ox+(p%cols)*gx+6,py=oy+24+Math.floor(p/cols)*gy;
        s+=person(px,py,sz,hit?'var(--vas)':a.c,{op:hit?1:.75});if(hit)s+=`<circle cx="${f1(px+sz*.42)}" cy="${f1(py+4)}" r="4" style="fill:var(--vas);stroke:var(--panel)"/>`}
      s+=txt(N?380:ox+cols*gx-14,oy+12,`${cnt} event${cnt===1?'':'s'} · ${Math.round(cnt/a.n*100)}%`,'t-lbl t-end',`fill:${cnt?'var(--vas)':'var(--muted)'}`);
      a._cnt=cnt});
    /* cumulative chart */
    const cy0=N?410:208,ch=N?66:76,cx0=N?40:60,cx1=N?380:660;
    const X=v=>cx0+(cx1-cx0)*v/T.mo,Y=v=>cy0+ch-ch*v/60;
    s+=`<line x1="${cx0}" x2="${cx1}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" class="axis"/>`;
    [0,25,50].forEach(v=>s+=`<line x1="${cx0}" x2="${cx1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+txt(cx0-5,Y(v)+3,v+'%','t-xs t-end'));
    T.arms.forEach(a=>{const fin=a.e/a.n*100;s+=`<path d="${pathFn(u=>clamp(u*T.mo<=m?u*fin/60:m/T.mo*fin/60),cx0,cx1,Y(0),Y(60),60)}" style="fill:none;stroke:${a.c};stroke-width:2.4"/>`;
      if(m>=T.mo*.98)s+=txt(cx1+(N?-2:4),Y(fin)+(N?-6:4),fin.toFixed(N?0:1)+'%',N?'t-xs t-end':'t-xs','fill:var(--ink)')});
    s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${f1(Y(60))}" y2="${f1(Y(0))}" style="stroke:var(--ink);opacity:.5"/>`;
    s+=txt(cx0,Y(0)+14,'0','t-xs t-mid')+txt(cx1,Y(0)+14,T.mo+' months','t-xs t-end')+txt(X(m),Y(60)-4,'month '+Math.round(m),'t-xs t-mid','fill:var(--ink)');
    if(m>=T.mo*.98)s+=txt((cx0+cx1)/2,Y(0)+28,T.hr,'t-sm t-mid','fill:var(--rx);font-weight:600');
    bsvg.innerHTML=s;bnote.innerHTML=noteHTML(T.note)}
  playWire(brg,$('#meBbPlay'),drawBb,7000,'Replay','meds');
  $$('[data-mebb]').forEach(b=>b.addEventListener('click',()=>{tri=b.dataset.mebb;$$('[data-mebb]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawBb(+brg.value)}));
  drawBb(+brg.value);
};
/* =============== 4.3 Surgery & anaesthesia =============== */
inits.surgery=()=>{
  const T=(x,y,s,cls='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const R=(x,y,w,h,st,rx=0)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const press=(sel,attr,val)=>$$(sel).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[attr]===val)));
  const TN={h:'hEDS',c:'cEDS',v:'vEDS'};

  /* ================= 1. peri-operative pathway ================= */
  let ty='h';
  const svg=$('#suSvg'),rg=$('#suT');
  /* anchor points in the scene's own frame (470 x 300) */
  const A={mouth:[50,162],neck:[94,200],clip:[318,66],shoulder:[122,178],elbow:[180,194],hand:[238,190],upperArm:[150,188],abdomen:[206,166],abdomen2:[234,166],
    groin:[262,180],groin2:[270,192],thigh:[318,172],heel:[414,200],chest:[150,166],back:[196,204]};
  const ITEMS=[
    {s:0,ty:'hcv',a:'mouth',l:['Airway assessment','for every type'],x:`Comprehensive airway assessment for all EDS types, and planning around common comorbidities, reached consensus in the 2026 Delphi panel. <sup class="c" data-ref="Amaral2026" title="Source 8">8</sup>`},
    {s:0,ty:'hcv',a:'clip',l:['Ask: has numbing','failed before?'],x:`Record any history of failed local anaesthesia, for example during dental work, and earlier failed regional blocks. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:0,ty:'cv',a:'hand',l:['Bleeding work-up;','consider desmopressin'],x:`The Delphi panel recommends bleeding-risk evaluation, and considering desmopressin, in classical, classical-like, kyphoscoliotic and vascular EDS. <sup class="c" data-ref="Amaral2026" title="Source 8">8</sup>`},
    {s:0,ty:'h',a:'hand',l:['Bleeding history:','often multifactorial'],x:`In 17 adults (10 hEDS, 7 classical), bleeding scores were often high (90% in hEDS) yet ROTEM clotting tests were normal, suggesting bleeding in EDS is multifactorial (Early evidence). Desmopressin is recommended for people with a positive bleeding history. <sup class="c" data-ref="Lam2025CJA,Wiesmann2014" title="Source 259,505">259,505</sup>`},
    {s:0,ty:'v',a:'abdomen',l:['Is the operation','really needed?'],x:`GeneReviews discourages elective surgery in vEDS unless the benefit is expected to be substantial. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`},
    {s:0,ty:'hcv',a:'neck',l:['Neck instability','may be hidden'],x:`Subclinical cervical-spine instability may be present even when neck and jaw mobility seem normal. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:1,ty:'hcv',a:'heel',l:['Pad pressure','points'],x:`Padding reduces shear and pressure. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:1,ty:'hcv',a:'shoulder',l:['Move joints gently;','protect nerves, eyes'],x:`Position and mobilise carefully to avoid dislocation; careless positioning risks brachial plexus injury and visual loss from pressure on the eye. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:1,ty:'hcv',a:'neck',l:['Upper-neck','instability'],x:`Occipito-atlanto-axial instability, with TMJ dysfunction and early spondylosis, is one reason intubation is difficult more often than usual. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:1,ty:'hcv',a:'upperArm',l:['Blood-pressure cuff','can bruise'],x:`Repeated non-invasive blood-pressure cuff inflations can cause bruising and haematoma. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:1,ty:'hcv',a:'elbow',l:['Gentle tapes','and dressings'],x:`Adhesive tapes and dressings should be easy to remove, or avoided, because of the risk of severe skin damage. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:2,ty:'hcv',a:'mouth',l:['Jaw can dislocate;','fibreoptic option'],x:`Care is needed during mask ventilation to avoid dislocating the temporomandibular joint. Elective fibreoptic intubation should be considered when difficulty is anticipated. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:2,ty:'hcv',a:'chest',l:['Small tube, low cuff','and airway pressure'],x:`Repeated intubation attempts may cause bleeding and smaller tubes may reduce mucosal damage. Cuff pressure is kept as low as possible, and airway pressure minimised because of pneumothorax risk. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:2,ty:'v',a:'neck',l:['Avoid central and','arterial lines'],x:`In vEDS, avoid central venous access and arterial puncture whenever possible, and invasive blood-pressure monitoring in non-emergency surgery. If a central line is needed, ultrasound guidance is "mandatory", including seeing the wire inside the vessel. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:2,ty:'hc',a:'elbow',l:['Ultrasound for','venous access'],x:`Ultrasound may reduce repeated vascular punctures. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:2,ty:'v',a:'back',l:['Spinal or epidural:','avoid if possible'],x:`Wiesmann recommends avoiding neuraxial anaesthesia in vEDS; the Delphi panel advises cautious use with individual risk-benefit analysis because of haematoma risk. <sup class="c" data-ref="Wiesmann2014,Amaral2026" title="Source 8,505">8,505</sup>`},
    {s:2,ty:'hc',a:'back',l:['Regional blocks after','spinal assessment'],x:`Neuraxial blocks are considered feasible in other EDS types after spinal assessment, and for hEDS the Delphi panel recommends multimodal and regional strategies. <sup class="c" data-ref="Wiesmann2014,Amaral2026" title="Source 8,505">8,505</sup>`},
    {s:2,ty:'hcv',a:'hand',l:['Local anaesthetic','may wear off sooner'],x:`In a crossover trial, lidocaine worked equally at 5 minutes, but fewer people with EDS were still numb at 15 (60% vs 84%) and 30 minutes (53% vs 80%). <sup class="c" data-ref="Bourne2026RAPM" title="Source 54">54</sup>`},
    {s:3,ty:'c',a:'abdomen',l:['Two-layer closure;','stitches left 2× longer'],x:`GeneReviews (classic EDS): close dermal wounds without tension, preferably in two layers; apply deep stitches generously; leave skin stitches twice as long as usual; tape the adjacent skin edges to stop the scar stretching. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`},
    {s:3,ty:'hcv',a:'groin',l:['Bleeding plan:','DDAVP, tranexamic acid'],x:`In a retrospective series of 41 procedures in 26 patients, there were no bleeding complications when desmopressin was given before surgery, versus 30% when it was not. Prophylactic tranexamic acid may be considered, as in other bleeding disorders. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:3,ty:'h',a:'abdomen',l:['Type-specific plan,','not vEDS rules'],x:`The Delphi panel gives type-specific advice, so vEDS fragility precautions are not applied to every type by default. <sup class="c" data-ref="Amaral2026" title="Source 8">8</sup>`},
    {s:3,ty:'v',a:'thigh',l:['Tourniquets:','reported dangers'],x:`The review authors report anecdotal knowledge of severe and lethal complications from tourniquets in minor limb surgery in vEDS, including massive compartment bleeding and haemorrhagic shock. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:3,ty:'v',a:'groin2',l:['No unnecessary','arteriography'],x:`Arteriography is used only to find life-threatening bleeding before surgery; a historical series reported a 67% complication rate. <sup class="c" data-ref="Byers2025GeneReviews,Cikrit1987" title="Source 68,94">68,94</sup>`},
    {s:3,ty:'v',a:'abdomen2',l:['Open or endovascular:','a team decision'],x:`Published cases show 30% mortality after open surgery and 24% after endovascular procedures (likely publication bias); one series had 46% procedure-related morbidity. The ACC/AHA leaves decisions to a multidisciplinary aortic team, and a US cohort concluded vEDS "should not be a deterrent" when an operation is needed. <sup class="c" data-ref="Bergqvist2013,Oderich2005,Isselbacher2022,Shalhub2019JVS" title="Source 43,219,344,429">43,219,344,429</sup>`},
    {s:4,ty:'h',a:'clip',l:['Outcomes vary:','set expectations'],x:`In a hEDS cohort of 79, 70.9% had had surgery, mainly on the limbs and abdomen, and only 33.9% of those reported a positive outcome. <sup class="c" data-ref="Rombaut2011F" title="Source 395">395</sup>`},
    {s:4,ty:'hc',a:'abdomen',l:['Pain plan beyond','opioids'],x:`For hEDS the Delphi panel recommends multimodal strategies. After hip replacement, 14.8% of people with EDS who received opioids had a dislocation vs 2.1% without; the authors caution against reading this as cause and effect. <sup class="c" data-ref="Amaral2026,Kelly2024THA" title="Source 8,242">8,242</sup>`},
    {s:4,ty:'c',a:'abdomen2',l:['Tape wound edges;','late stitch removal'],x:`Skin stitches stay in about twice as long as usual, and the adjacent skin edges are taped so the scar does not stretch. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`},
    {s:4,ty:'hcv',a:'elbow',l:['Gentle removal of','tapes, dressings'],x:`Tapes and dressings that are easy to remove protect fragile skin. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {s:4,ty:'v',a:'abdomen2',l:['Sudden pain =','emergency'],x:`People with vEDS are advised to seek immediate medical attention for sudden, unexplained pain. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`},
    {s:4,ty:'hcv',a:'shoulder',l:['Mobilise','carefully'],x:`Mobilise carefully to avoid joint dislocation. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`}
  ];
  const STEPS=[
    {from:0,at:.1,k:'Stage 1 of 5',t:'Pre-operative assessment',
     txt:`EDS anaesthesia knowledge "is fragmented and consists mostly of case reports, small case series and expert opinion". The 2026 modified-Delphi survey (15 experts, 3 rounds) agreed 7 guidelines, the first consensus-based anaesthesia guidance for EDS. <sup class="c" data-ref="Wiesmann2014,Amaral2026" title="Source 8,505">8,505</sup>`,
     pt:`Before any operation, tell the team about EDS and its type. They may plan extra padding, gentle positioning, careful breathing-tube placement and steps to reduce bleeding.`,
     hook:`Delphi 2026: comprehensive airway assessment for all EDS types; type-specific advice for the rest. <sup class="c" data-ref="Amaral2026" title="Source 8">8</sup>`},
    {from:.2,at:.3,k:'Stage 2 of 5',t:'Positioning',
     txt:`Unstable joints, fragile skin and easily bruised tissue make positioning a step of its own. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`,
     pt:`Soft padding and slow, careful moves on the table protect joints, skin and nerves.`,
     hook:`Careless positioning: brachial plexus injury and visual loss from eye pressure. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {from:.4,at:.5,k:'Stage 3 of 5',t:'Anaesthesia and airway',
     txt:`Mask ventilation, intubation and laryngeal mask are all possible. Difficult intubation should be expected more often than in the general population. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`,
     pt:`Numbing injections often wear off faster in EDS. Tell your dentist or doctor if numbing has failed before.`,
     hook:`vEDS: avoid neuraxial blocks and invasive lines where possible; ultrasound if a central line is unavoidable. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
    {from:.6,at:.7,k:'Stage 4 of 5',t:'Incision and closure',
     txt:`Wound and vessel fragility differ by type: classical EDS needs meticulous closure, vascular EDS needs protection of the arteries, and hEDS should not be treated with vEDS rules by default. <sup class="c" data-ref="Malfait2024GeneReviews,Byers2025GeneReviews,Amaral2026" title="Source 8,68,293">8,68,293</sup>`,
     pt:`Cuts in classic EDS heal best with careful stitches that stay in longer than usual.`,
     hook:`cEDS: two-layer, tension-free closure; skin stitches left twice as long. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`},
    {from:.8,at:.9,k:'Stage 5 of 5',t:'Recovery',
     txt:`Recovery plans cover pain, skin, careful mobilisation and, in vEDS, a low threshold for urgent assessment. <sup class="c" data-ref="Wiesmann2014,Byers2025GeneReviews" title="Source 68,505">68,505</sup>`,
     pt:`After surgery, move gently, look after the skin, and in vascular EDS treat sudden new pain as an emergency.`,
     hook:`hEDS: 70.9% had surgery, only 33.9% reported a positive outcome. <sup class="c" data-ref="Rombaut2011F" title="Source 395">395</sup>`}
  ];
  const STAGES=['Pre-op','Position','Anaesthesia','Incision','Recovery'];
  function scene(p,t,f){
    let s='';
    /* table */
    s+=R(36,200,398,10,'fill:var(--panel-2);stroke:var(--muted);stroke-width:1',3)+R(222,210,26,70,'fill:var(--panel-2);stroke:var(--muted)')+R(170,280,130,10,'fill:var(--panel-2);stroke:var(--muted)',4);
    /* pads (positioning onwards) */
    if(p>=1){const o=f1(p===1?ease(ramp(t,.2,.26)):1);[[52,194,36],[168,196,30],[396,196,30]].forEach(([x,y,w])=>s+=R(x,y,w,7,`fill:var(--rx);opacity:${o*.55}`,3))}
    /* patient */
    const sk='fill:var(--skin-epi);stroke:var(--skin-line);stroke-width:1.2';
    s+=R(258,172,152,24,sk,10)+R(404,150,14,48,sk,5);
    s+=R(98,164,166,34,sk,14)+`<circle cx="70" cy="178" r="15" style="${sk}"/>`+R(82,174,20,14,sk,4);
    s+=`<path d="M122 182L180 192L238 190" style="fill:none;stroke:var(--skin-line);stroke-width:12;stroke-linecap:round;stroke-linejoin:round"/><path d="M122 182L180 192L238 190" style="fill:none;stroke:var(--skin-epi);stroke-width:9.6;stroke-linecap:round;stroke-linejoin:round"/>`;
    s+=`<circle cx="66" cy="172" r="1.8" style="fill:var(--ink)"/>`;
    /* gown */
    s+=R(110,164,140,34,'fill:var(--dx-soft);opacity:.75',12);
    /* BP cuff */
    if(p>=1)s+=R(140,181,22,13,`fill:var(--dx);opacity:.8`,3);
    /* clipboard or clock */
    if(p===0){s+=R(292,36,56,70,'fill:var(--panel);stroke:var(--ink);stroke-width:1.4',5)+R(308,30,24,10,'fill:var(--ink)',3);for(let i=0;i<4;i++){const on=ramp(t,.02+i*.03,.05+i*.03);s+=R(300,52+i*13,6,6,`fill:${on>0?'var(--rx)':'none'};stroke:var(--muted)`,1)+R(310,54+i*13,30*Math.max(.4,on),2.4,'fill:var(--muted)')}}
    if(p===4){s+=`<circle cx="320" cy="70" r="30" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`;const a=t*40;s+=`<path d="M320 70L${f1(320+Math.sin(a)*20)} ${f1(70-Math.cos(a)*20)}M320 70L${f1(320+Math.sin(a/12)*13)} ${f1(70-Math.cos(a/12)*13)}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/>`}
    /* airway and lines (anaesthesia onwards) */
    if(p>=2&&p<=3){s+=R(4,100,40,56,'fill:var(--panel-2);stroke:var(--muted)',4)+`<path d="M44 128C60 128 52 170 58 176" style="fill:none;stroke:var(--muted);stroke-width:3"/>`;
      s+=`<path d="M10 140${[0,1,2,3,4,5].map(i=>`L${14+i*5} ${140-Math.abs(Math.sin(t*30+i))*12}`).join('')}" style="fill:none;stroke:var(--accent);stroke-width:1.4"/>`}
    if(p>=2){s+=`<line x1="262" y1="20" x2="262" y2="196" style="stroke:var(--muted);stroke-width:2"/>`+R(250,24,24,32,'fill:var(--dx-soft);stroke:var(--dx)',6)+`<path d="M262 56C262 120 240 150 238 188" style="fill:none;stroke:var(--dx);stroke-width:1.4;stroke-dasharray:3 3"/>`}
    /* incision and stitches */
    if(p>=3){const k=p===3?ramp(t,.6,.68):1;s+=`<line x1="186" y1="165" x2="${f1(186+50*k)}" y2="165" style="stroke:var(--blood);stroke-width:2"/>`;
      const st=p===3?ramp(t,.68,.78):1;for(let i=0;i<Math.round(7*st);i++)s+=`<line x1="${189+i*7}" y1="160" x2="${189+i*7}" y2="170" style="stroke:var(--ink);stroke-width:1.2"/>`}
    if(p===3&&ty==='v')s+=R(306,168,14,32,'fill:var(--vas);opacity:.75',3);
    return s}
  function draw(t){
    const N=vb(svg,'720 390','400 640');
    const p=phaseOf(STEPS,t),f=ramp(t,STEPS[p].from,STEPS[p].from+.16);
    let s='';
    /* pathway bar */
    const bx=16,bw=(N?368:688)/5;
    STAGES.forEach((n,i)=>{const on=i===p,done=i<p,x=bx+i*bw;
      s+=R(x,10,bw-6,26,`fill:${on?'var(--rx-soft)':done?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--rx)':'var(--line)'};stroke-width:${on?2:1}`,13)+T(x+(bw-6)/2,27,N?(i+1):(i+1)+' · '+n,'t-sm t-mid',on?'fill:var(--rx);font-weight:700':'')});
    const sc=N?.84:1,ox=N?4:8,oy=N?44:56;
    const items=ITEMS.filter(o=>o.s===p&&o.ty.includes(ty));
    s+=`<g transform="translate(${ox} ${oy}) scale(${sc})">`+scene(p,t,f);
    items.forEach((o,i)=>{const a=ramp(f,i/(items.length+1),(i+1)/(items.length+1));if(a<=0)return;const[x,y]=A[o.a],col=o.ty==='v'?'var(--vas)':'var(--rx)',dy=-(i%2)*4;
      s+=`<circle cx="${x}" cy="${y+dy}" r="${f1(9+6*(1-a))}" style="fill:none;stroke:${col};stroke-width:1.5;opacity:${f1(1-a*.6)}"/><circle cx="${x}" cy="${y+dy}" r="8.5" style="fill:${col};opacity:${f1(a)}"/>`+T(x,y+dy+4,i+1,'t-sm t-mid',`fill:var(--bg);font-weight:700;opacity:${f1(a)}`)});
    s+='</g>';
    /* list */
    const lx=N?16:488,ly=N?316:66,lw=N?368:220;
    s+=R(lx-8,ly-24,lw+16,N?310:310,'fill:var(--field);stroke:var(--line)',12);
    s+=T(lx,ly-4,STEPS[p].t.toUpperCase()+' · '+TN[ty],'t-xs','font-weight:700;fill:var(--ink)');
    items.forEach((o,i)=>{const a=ramp(f,i/(items.length+1),(i+1)/(items.length+1)),y=ly+22+i*(N?54:54),col=o.ty==='v'?'var(--vas)':'var(--rx)';
      s+=`<g style="opacity:${f1(.25+.75*a)}"><circle cx="${lx+9}" cy="${y-4}" r="9" style="fill:${col}"/>`+T(lx+9,y,i+1,'t-sm t-mid','fill:var(--bg);font-weight:700');
      s+=T(lx+26,y,o.l[0],N?'t-lbl':'t-sm',N?'':'fill:var(--ink);font-weight:600')+T(lx+26,y+16,o.l[1],'t-sm')+(o.ty==='v'?T(lx+lw,y,'vEDS','t-xs t-end','fill:var(--vas);font-weight:700'):'')+'</g>'});
    if(!items.length)s+=T(lx,ly+22,'No type-specific items','t-sm');
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',STEPS[p].t+', '+TN[ty]);
    $('#suNote').innerHTML=noteHTML(STEPS[p])+`<div class="kv"><div><dt>${TN[ty]}: ${items.length} considerations</dt><dd><ol style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">${items.map(o=>`<li>${o.x}</li>`).join('')}</ol></dd></div></div>`;
  }
  const stop=playWire(rg,$('#suPlay'),draw,26000,'Replay','surgery');
  const setSt=stepWire($('#suSteps'),STEPS,rg,draw,stop);
  $$('[data-sutype]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.sutype;press('[data-sutype]','sutype',ty);draw(+rg.value)}));
  draw(+rg.value);

  /* ================= 2. local anaesthetic icon arrays ================= */
  const la=$('#suLa');let mode='t15',cur={a:60,b:84},laStop=null;
  const LA={
    t15:{a:60,b:84,la:'EDS',lb:'Controls',what:'still numb at 15 min',col:'var(--rx)',
      note:{k:'Crossover trial · 2026',t:'Numb at 15 minutes: 60% vs 84%',txt:`In a randomised crossover trial (91 people with EDS, 44 healthy controls), subcutaneous lidocaine numbed both groups similarly at 5 minutes (p=0.2). At 15 minutes fewer people with EDS had anaesthesia (60% vs 84%, p=0.006). The registered primary outcome was the pain score at 5 minutes; the positive findings were at later times. (<span class="ev early">Early evidence</span>) <sup class="c" data-ref="Bourne2026RAPM,NCT05603741" title="Source 54,335">54,335</sup>`,
       pt:`Numbing works at first in EDS, but in this trial it seemed to wear off sooner.`,hook:`Lidocaine in EDS: equal onset, shorter duration. <sup class="c" data-ref="Bourne2026RAPM" title="Source 54">54</sup>`}},
    t30:{a:53,b:80,la:'EDS',lb:'Controls',what:'still numb at 30 min',col:'var(--rx)',
      note:{k:'Crossover trial · 2026',t:'Numb at 30 minutes: 53% vs 80%',txt:`At 30 minutes, 53% of people with EDS and 80% of controls still had anaesthesia (p=0.003). The authors interpret this as a shorter duration of lidocaine effect. An older controlled study of 8 people with EDS found intradermal lidocaine worked at 5 minutes but only controls' skin was numb at 1 hour, and EMLA cream gave no patient sufficient analgesia. <sup class="c" data-ref="Bourne2026RAPM,ArendtNielsen1990" title="Source 17,54">17,54</sup>`,
       pt:`Tell the team if numbing has worn off early before, so they can plan.`,hook:`Older study: EMLA cream gave no EDS patient sufficient analgesia. <sup class="c" data-ref="ArendtNielsen1990" title="Source 17">17</sup>`}},
    sv:{a:88,b:33,la:'EDS (n=980)',lb:'No EDS (n=249)',what:'recalled inadequate dental numbing',col:'var(--vas)',
      note:{k:'Online survey · 2019',t:'Dental numbing failed: 88% vs 33%',txt:`In an online survey, 88% (860 of 980) of people with EDS who had dental local anaesthetic recalled inadequate pain prevention, against 33% (83 of 249) without EDS. Among named agents, articaine had the highest reported success (30%), then bupivacaine (25%) and mepivacaine (22%). The authors call it hypothesis-generating: recall and selection bias are likely. <sup class="c" data-ref="Schubart2019LA" title="Source 419">419</sup>`,
       pt:`Many people with EDS remember dental numbing not working. A survey like this cannot prove how often it happens.`,hook:`Survey: inadequate dental local anaesthesia recalled by 88% with EDS vs 33% without. <sup class="c" data-ref="Schubart2019LA" title="Source 419">419</sup>`}}
  };
  function drawLa(a,b){
    const N=vb(la,'720 300','400 600'),D=LA[mode];let s='';
    const arr=(x0,y0,n,lab)=>{let g=T(x0,y0-12,`${lab}: ${Math.round(n)}%`,'t-lbl')+T(x0,y0+2,D.what,'t-xs');
      for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10);g+=person(x0+c*22+11,y0+12+r*24,18,i<Math.round(n)?D.col:'var(--line)')}return g};
    if(N){s+=arr(90,30,a,D.la)+arr(90,320,b,D.lb)}
    else{s+=arr(40,30,a,D.la)+arr(400,30,b,D.lb);s+=T(320,150,'vs','t-big t-mid','fill:var(--muted)')}
    la.innerHTML=s}
  function setLa(m){mode=m;press('[data-sula]','sula',m);const D=LA[m],fa=cur.a,fb=cur.b;laStop&&laStop();
    laStop=animate(800,q=>{cur={a:lerp(fa,D.a,ease(q)),b:lerp(fb,D.b,ease(q))};drawLa(cur.a,cur.b)});$('#suLaNote').innerHTML=noteHTML(D.note)}
  $$('[data-sula]').forEach(b=>b.addEventListener('click',()=>setLa(b.dataset.sula)));
  drawLa(cur.a,cur.b);$('#suLaNote').innerHTML=noteHTML(LA[mode].note);
  redraws.surgery=(prev=>()=>{prev&&prev();drawLa(cur.a,cur.b)})(redraws.surgery);
};
/* =============== 4.4 Toward better treatment =============== */
inits.frontier=()=>{
  const svg=$('#reSvg'),rg=$('#reT'),note=$('#reNote'),hb=$('#reHuman');
  let human=false,pinned=null;
  const NOW=2026.82,Y0=2009,YB=2017,Y1=2030,BRK=.14;
  const LANES=['Genetics','Criteria','vEDS treatment','Mechanisms'];
  const EVC={est:'var(--good)',early:'var(--warn)',hyp:'var(--rx)'};
  /* y: decimal year; ln: lane; tr: interventional human trial; d: detail (cited) */
  const M=[
    {y:2010.75,ln:2,ev:'est',tr:1,l:'BBEST: celiprolol 20% vs 50%',d:'BBEST (Lancet 2010): open randomised trial, 53 people with clinical vEDS; arterial events 20% on celiprolol vs 50% untreated, HR 0.36; stopped early for benefit. <sup class="c" data-ref="Ong2010" title="Source 345">345</sup>'},
    {y:2015.5,ln:3,ev:'early',l:'MEDIC plasma biomarkers done',d:'MEDIC, a French plasma-biomarker study in 211 people with vEDS, completed in 2015; no results are posted on the registry. <sup class="c" data-ref="NCT02165085" title="Source 327">327</sup>'},
    {y:2017.2,ln:1,ev:'est',l:'2017 classification: 13 types',d:'The 2017 classification recognises 13 types; all except hEDS need molecular confirmation. Symptomatic hypermobility that meets no syndrome becomes hypermobility spectrum disorder. <sup class="c" data-ref="Malfait2017,Castori2017" title="Source 78,291">78,291</sup>'},
    {y:2018.3,ln:0,ev:'est',l:'HEDGE study begins',d:'The Ehlers-Danlos Society began HEDGE in 2018 to find the genetic basis of hEDS by whole-genome sequencing of 1,000 adults meeting the 2017 criteria. Experts expect most hEDS will not have a single-gene cause (Hypothesis). <sup class="c" data-ref="Douglas2026,VanDijk2024" title="Source 132,480">132,480</sup>'},
    {y:2019.3,ln:2,ev:'early',l:'French cohort: celiprolol survival',d:'In 144 people with confirmed vEDS followed for a median 5.3 years, those on celiprolol survived longer (p=0.0004), best at 400 mg/day. Observational, so open to confounding. <sup class="c" data-ref="Frank2019JACC" title="Source 170">170</sup>'},
    {y:2020.1,ln:3,ev:'early',l:'Mouse: ERK/PKCβ, hydralazine',d:'In Col3a1 glycine-substitution mice, ERK1/2 or PKCβ inhibitors prevented death from aortic rupture; hydralazine from birth kept 97% alive to 45 days vs 52% untreated. Celiprolol, losartan, propranolol and atenolol did not help these mice. Animal data only. <sup class="c" data-ref="Bowen2020JCI" title="Source 57">57</sup>'},
    {y:2020.13,ln:2,ev:'early',tr:1,l:'ARCADE completes',d:'ARCADE (irbesartan vs placebo on top of celiprolol) completed in February 2020 with 61 enrolled. <sup class="c" data-ref="NCT02597361" title="Source 328">328</sup>'},
    {y:2021.8,ln:3,ev:'early',l:'Doxycycline in hEDS cells',d:'In hEDS skin fibroblasts, blocking matrix metalloproteinases with doxycycline restored a control-like matrix in the dish. In vitro only, not a treatment recommendation. <sup class="c" data-ref="Chiarelli2021" title="Source 89">89</sup>'},
    {y:2022.0,ln:0,ev:'est',l:'Genetics appraisal: 11 of 304',d:'A critical appraisal found only 11 of 304 publications met its quality criteria; the hEDS genetic literature was "scant, dispersed and conflicting". <sup class="c" data-ref="Scicluna2022" title="Source 426">426</sup>'},
    {y:2022.9,ln:1,ev:'early',l:'hEDS and HSD: one entity?',d:'Skin-fibroblast RNA sequencing found the same matrix disarray and myofibroblast pattern in hEDS and HSD; the authors argue they are a single entity. <sup class="c" data-ref="Ritelli2022" title="Source 387">387</sup>'},
    {y:2022.85,ln:2,ev:'hyp',tr:1,l:'DiSCOVER phase 3 starts',d:'DiSCOVER (NCT05432466), a double-blind, placebo-controlled phase 3 trial of celiprolol 200 mg twice daily in COL3A1-positive vEDS, started on 7 November 2022, aiming for 150 people. <sup class="c" data-ref="NCT05432466" title="Source 333">333</sup>'},
    {y:2023.2,ln:0,ev:'est',l:'HEDGE: 1,021 enrolled',d:'HEDGE enrolment reached 1,021: 92% female, 95% White, 62% from the United States. <sup class="c" data-ref="Halverson2023" title="Source 204">204</sup>'},
    {y:2023.5,ln:2,ev:'early',l:'UK service: 5-year survival',d:'In the UK national vEDS service (126 patients), 5-year survival was 96.53% on medication vs 42.69% untreated: retrospective, observational and confounded. <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup>'},
    {y:2023.75,ln:3,ev:'early',l:'Vertebral tortuosity marker',d:'In 65 people with vEDS, a vertebral tortuosity index of at least 15.5 discriminated cardiovascular events (sensitivity 70%, specificity 76%). <sup class="c" data-ref="Stephens2023" title="Source 451">451</sup>'},
    {y:2024.1,ln:3,ev:'early',l:'vEDS stem-cell line',d:'Induced pluripotent stem cell lines have been made from people with vEDS (a COL3A1 nonsense variant) and musculocontractural EDS, for studying disease in human cells. <sup class="c" data-ref="Hopperger2024,Yue2023" title="Source 213,514">213,514</sup>'},
    {y:2024.18,ln:2,ev:'hyp',tr:1,l:'PREVEnt suspended',d:'PREVEnt, a phase 3 trial of the PKCβ inhibitor enzastaurin (260 planned), is suspended: "Indefinite hold by company" (last update March 2024). <sup class="c" data-ref="NCT05463679" title="Source 334">334</sup>'},
    {y:2024.3,ln:0,ev:'early',l:'Exome study: no single gene',d:'Exome sequencing of 174 unresolved EDS patients found candidate loci, none reaching genome-wide significance. <sup class="c" data-ref="Vandersteen2024" title="Source 479">479</sup>'},
    {y:2025.1,ln:2,ev:'early',tr:1,l:'ARCADE: HR 0.42',d:'ARCADE (Circulation 2025): irbesartan added to celiprolol cut arterial events or new lesions, 27.6% vs 53.6% (HR 0.42, 95% CI 0.17–0.99) in 57 adults. <sup class="c" data-ref="Jeunemaitre2025" title="Source 226">226</sup>'},
    {y:2025.2,ln:3,ev:'early',l:'Plasma ECM fragment pattern',d:'A plasma fibronectin and collagen-fragment pattern was shared by hEDS and HSD and differed from other EDS types and arthritis: a potential blood test, not validated. <sup class="c" data-ref="Ritelli2025" title="Source 389">389</sup>'},
    {y:2025.27,ln:0,ev:'hyp',tr:0,l:'Genotyping study completes',d:'A Boston University study genotyped 334 people with EDS and completed in April 2025; results are not yet posted. <sup class="c" data-ref="NCT03093493" title="Source 329">329</sup>'},
    {y:2025.6,ln:0,ev:'early',l:'KLK15 candidate gene',d:'Exome sequencing of 200 people with hEDS found rare kallikrein-gene variants, including a recurrent KLK15 variant segregating in families; a knock-in mouse showed hEDS-like tendon and valve changes. Not yet replicated, not a diagnostic test. <sup class="c" data-ref="Gensemer2025KLK15" title="Source 178">178</sup>'},
    {y:2025.75,ln:3,ev:'early',l:'Proteomics, AI face analysis',d:'Serum proteomics found complement proteins lower in women with hEDS; an AI facial model separated vEDS from controls and hEDS (AUC ≥0.97). Both need validation. <sup class="c" data-ref="Griggs2025,Murdock2025" title="Source 189,321">189,321</sup>'},
    {y:2026.15,ln:1,ev:'early',l:'Proteomics: hEDS ≈ HSD',d:'Serum proteomics in 88 hEDS, 88 HSD and 176 controls found no significant differences between hEDS and HSD; a 2026 review calls current criteria inadequate for the heterogeneity of hEDS/HSD. <sup class="c" data-ref="Cinquina2026,Motlak2026" title="Source 95,318">95,318</sup>'},
    {y:2026.4,ln:3,ev:'early',l:'Mouse: hormone blockade',d:'Combined androgen- and mineralocorticoid-receptor blockade gave "near-complete and durable protection" in vEDS mice of both sexes. Animal data only. <sup class="c" data-ref="Juzwiak2026" title="Source 232">232</sup>'},
    {y:2027.17,ln:2,ev:'hyp',tr:1,fut:1,l:'vEDS exercise programme starts',d:'A co-designed 12-week remote exercise and lifestyle programme for vEDS (40 planned, Sheffield Hallam University) is registered as not yet recruiting, with an estimated start of 1 March 2027. <sup class="c" data-ref="NCT07697573" title="Source 339">339</sup>'},
    {y:2028.0,ln:3,ev:'hyp',fut:1,l:'RaDiCo-SEDVasc ends (est.)',d:'The French national vEDS cohort (340 enrolled) has an estimated completion of January 2028. <sup class="c" data-ref="NCT05976841" title="Source 336">336</sup>'},
    {y:2029.17,ln:2,ev:'hyp',tr:1,fut:1,l:'DiSCOVER results (est.)',d:'DiSCOVER\'s estimated primary completion is 1 March 2029, per the registry record last updated in August 2025. Its primary outcome is time to the first vEDS-related clinical event. <sup class="c" data-ref="NCT05432466" title="Source 333">333</sup>'}
  ];
  const xOf=(y,x0,x1)=>{const bx=x0+(x1-x0)*BRK;return y<YB?lerp(x0,bx,ramp(y,Y0,YB)):lerp(bx,x1,ramp(y,YB,Y1))};
  const yrOf=t=>t<BRK?lerp(Y0,YB,t/BRK):lerp(YB,Y1,(t-BRK)/(1-BRK));
  const tOf=y=>y<YB?BRK*ramp(y,Y0,YB):BRK+(1-BRK)*ramp(y,YB,Y1);
  const STEPS=[
    {from:0,at:tOf(2017.4),k:'Up to 2017',t:'Where things stood',
     txt:`The 2017 classification defined 13 types, all but hEDS confirmed by a gene test. One drug trial existed for any type: BBEST, an open trial of celiprolol in vascular EDS. Management of every type remains supportive: "No specific medical or genetic therapies are available for any type of EDS". <sup class="c" data-ref="Malfait2017,Ong2010,Malfait2020" title="Source 291,292,345">291,292,345</sup>`,
     pt:`In 2017 there was no medicine made for EDS, and doctors could only treat its symptoms and complications.`,
     hook:`All 13 types except hEDS need molecular confirmation (2017). <sup class="c" data-ref="Malfait2017" title="Source 291">291</sup>`},
    {from:tOf(2018),at:tOf(2025.7),k:'2018–2025 · genetics',t:'Hunting for hEDS genes',
     txt:`HEDGE began in 2018, aiming to sequence 1,000 genomes; 1,021 people enrolled. A 2022 appraisal found the hEDS genetic literature "scant, dispersed and conflicting". In 2025 a KLK15 variant was reported in several families, with a mouse model, but it awaits replication <span class="ev early">Early evidence</span>. Reviews describe hEDS as likely genetically heterogeneous <span class="ev hyp">Hypothesis</span>. <sup class="c" data-ref="Douglas2026,Halverson2023,Scicluna2022,Gensemer2025KLK15,Gensemer2021" title="Source 132,177,178,204,426">132,177,178,204,426</sup>`,
     pt:`Scientists are searching for the genes behind hypermobile EDS. There is still no gene test for it.`,
     hook:`KLK15 is an early-evidence candidate gene for hEDS, not a diagnostic test. <sup class="c" data-ref="Gensemer2025KLK15" title="Source 178">178</sup>`},
    {from:tOf(2026.0),at:tOf(2026.3),k:'2020–2026 · mechanisms',t:'Mice, cells and markers',
     txt:`vEDS mice revealed a targetable signalling pathway (PLC/IP3/PKC/ERK): inhibitors, hydralazine and hormone blockade protected the mice <span class="ev early">Early evidence</span>. Human stem-cell lines, plasma fragment patterns and serum proteomics are being explored as models and markers. Several studies find no clear molecular line between hEDS and HSD. Animal and dish results are hypotheses for people, not treatments. <sup class="c" data-ref="Bowen2020JCI,Juzwiak2026,Hopperger2024,Ritelli2025,Cinquina2026" title="Source 57,95,213,232,389">57,95,213,232,389</sup>`,
     pt:`Some drugs protect mice with vascular EDS. That is a promising start, but they have not been proven in people.`,
     hook:`In vEDS mice, celiprolol accelerated aortic rupture in one model and strengthened the aorta in another. <sup class="c" data-ref="Bowen2020JCI,Dubacher2020" title="Source 57,133">57,133</sup>`},
    {from:tOf(2026.6),at:tOf(2026.8),k:'2010–2026 · vEDS trials',t:'From an open trial to placebo controls',
     txt:`After BBEST, observational cohorts supported celiprolol, and ARCADE showed a benefit of adding irbesartan (HR 0.42) <span class="ev early">Early evidence</span>. DiSCOVER, a placebo-controlled phase 3 trial of celiprolol, began in 2022; PREVEnt (enzastaurin) is suspended by its sponsor. Turn on "Show only human trials" to see this lane alone. <sup class="c" data-ref="Frank2019JACC,Jeunemaitre2025,NCT05432466,NCT05463679" title="Source 170,226,333,334">170,226,333,334</sup>`,
     pt:`Vascular EDS now has a few real drug trials in people. The biggest one will not report until about 2029.`,
     hook:`DiSCOVER: celiprolol vs placebo, phase 3, estimated primary completion March 2029. <sup class="c" data-ref="NCT05432466" title="Source 333">333</sup>`},
    {from:tOf(2026.86),at:1,k:'2027 and beyond',t:'What is announced next',
     txt:`Dates beyond October 2026 are as announced: a vEDS exercise programme is registered to start in 2027; the French vEDS cohort ends around 2028; DiSCOVER's primary completion is estimated for 2029; the Italian RED registry recruits through 2033. EDS trials are hard to run: an oxytocin trial for hEDS pain stopped after enrolling 2 people. <sup class="c" data-ref="NCT07697573,NCT05976841,NCT05432466,NCT04133272,NCT05405257" title="Source 330,332,333,336,339">330,332,333,336,339</sup>`,
     pt:`More answers are coming, but slowly. Dates in the future are plans, not promises.`,
     hook:`No medicine is approved for any EDS type; management is supportive. <sup class="c" data-ref="Malfait2020" title="Source 292">292</sup>`}
  ];
  const setActive=stepWire($('#reSteps'),STEPS,rg,t=>{pinned=null;draw(t)},()=>stop());
  const wrap=(s,n)=>{const w=s.replace(/\s*<sup[\s\S]*?<\/sup>/g,'').replace(/\s*\[\[[^\]]*\]\]/g,'').split(' ');const out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){out.push(l.trim());l=x}else l+=' '+x});if(l.trim())out.push(l.trim());return out};
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),yr=yrOf(t);
    const L=N?{x0:24,x1:384,lanes:[90,170,250,330],lab:-22,ax:372,cb:[12,406,376,184],cw:58}
             :{x0:150,x1:704,lanes:[44,104,164,224],lab:0,ax:262,cb:[12,286,696,86],cw:112};
    let s='';
    const X=y=>xOf(y,L.x0,L.x1);
    /* compressed segment and today */
    s+=`<rect x="${L.x0}" y="${L.lanes[0]-(N?36:22)}" width="${f1(X(YB)-L.x0)}" height="${f1(L.ax-L.lanes[0]+(N?36:22))}" style="fill:var(--panel-2);opacity:.5"/>`;
    s+=`<rect x="${f1(X(NOW))}" y="${L.lanes[0]-(N?36:22)}" width="${f1(L.x1-X(NOW))}" height="${f1(L.ax-L.lanes[0]+(N?36:22))}" style="fill:var(--rx-soft);opacity:.35"/>`;
    s+=`<line x1="${f1(X(NOW))}" x2="${f1(X(NOW))}" y1="${L.lanes[0]-(N?36:22)}" y2="${L.ax}" style="stroke:var(--rx);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(X(NOW)+4)}" y="${L.ax-4}" class="t-xs" style="fill:var(--rx)">Oct 2026</text>`;
    LANES.forEach((l,i)=>{const y=L.lanes[i];s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${y}" y2="${y}" class="grid"/>`;
      s+=N?`<text x="${L.x0}" y="${y+L.lab}" class="t-sm" style="fill:var(--ink)">${l.toUpperCase()}</text>`:`<text x="${L.x0-12}" y="${y+4}" class="t-sm t-end" style="fill:var(--ink)">${l}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    const ticks=N?[2009,2017,2020,2023,2026,2029]:[2009,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
    ticks.forEach(y=>s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${L.ax}" y2="${L.ax+4}" class="axis"/><text x="${f1(X(y))}" y="${L.ax+15}" class="t-xs t-mid">${y===2009?'earlier':N||y%2===1||y===2030?y:''}</text>`);
    s+=`<path d="M${f1(X(YB)-3)} ${L.ax-5}l3 10M${f1(X(YB)+1)} ${L.ax-5}l3 10" style="stroke:var(--muted)"/>`;
    /* milestones */
    let focus=null;
    M.forEach((m,i)=>{const on=yr>=m.y,x=X(m.y),y=L.lanes[m.ln]+((i%2)?5:-5),dim=human&&!m.tr,fut=m.fut||m.y>NOW,c=EVC[m.ev];
      if(on&&!dim)focus=i;
      const op=dim?.12:on?1:.22,r=on?(i===(pinned!=null?pinned:-1)?8:6):4;
      s+=`<g class="clk" data-rem="${i}" tabindex="${on&&!dim?0:-1}" role="button" aria-label="${esc(m.l)}" style="opacity:${op}">`;
      s+=fut?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--panel);stroke:${c};stroke-width:1.8;stroke-dasharray:3 2"/>`
            :m.ev==='hyp'?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--panel);stroke:${c};stroke-width:2.4"/>`
            :`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${c};stroke:var(--panel);stroke-width:1.2"/>`;
      if(m.tr)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r+3.5}" style="fill:none;stroke:var(--ink);stroke-width:.8;opacity:.5"/>`;
      s+=`</g>`});
    const fi=pinned!=null?pinned:focus;
    /* cursor */
    s+=`<line x1="${f1(X(yr))}" x2="${f1(X(yr))}" y1="${L.lanes[0]-(N?40:26)}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.4"/>`;
    s+=`<text x="${f1(clamp(X(yr),L.x0+20,L.x1-20))}" y="${L.lanes[0]-(N?44:28)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${yr<YB?'before 2017':Math.floor(yr)}</text>`;
    /* callout */
    const [cx,cy,cw,ch]=L.cb;
    s+=`<rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    if(fi!=null){const m=M[fi],mx=X(m.y),my=L.lanes[m.ln];
      s+=`<line x1="${f1(mx)}" y1="${f1(my+8)}" x2="${f1(clamp(mx,cx+20,cx+cw-20))}" y2="${cy}" style="stroke:var(--muted);stroke-dasharray:2 3"/>`;
      const ys=m.y<YB?Math.floor(m.y):(m.fut||m.y>NOW?'as announced, ':'')+Math.floor(m.y);
      s+=`<text x="${cx+12}" y="${cy+20}" class="t-lbl" style="fill:${EVC[m.ev]}">${esc(m.l)}</text><text x="${N?cx+12:cx+cw-12}" y="${N?cy+36:cy+20}" class="t-xs ${N?'':'t-end'}">${ys} · ${LANES[m.ln]}${m.tr?' · human trial':''}</text>`;
      wrap(m.d,L.cw).slice(0,N?9:4).forEach((l,k)=>s+=`<text x="${cx+12}" y="${cy+(N?56:38)+k*14}" class="t-xs" style="fill:var(--ink)">${esc(l)}</text>`)}
    else s+=`<text x="${cx+12}" y="${cy+24}" class="t-xs">No milestone shown: move the cursor or turn off the filter.</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);note.innerHTML=noteHTML(STEPS[ph]);setActive(ph);
  }
  const stop=playWire(rg,$('#rePlay'),t=>{pinned=null;draw(t)},12000,'Replay','frontier');
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-rem]');if(!g)return;pinned=+g.dataset.rem;draw(+rg.value);showDetail(pinned)});
  svg.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest('[data-rem]');if(!g)return;e.preventDefault();pinned=+g.dataset.rem;draw(+rg.value);const ng=svg.querySelector(`[data-rem="${pinned}"]`);ng&&ng.focus()});
  function showDetail(i){const m=M[i];note.innerHTML=noteHTML({k:(m.fut||m.y>NOW?'As announced · ':'')+LANES[m.ln],t:m.l,txt:m.d+(m.ev==='est'?' <span class="ev est">Established</span>':m.ev==='early'?' <span class="ev early">Early evidence</span>':' <span class="ev hyp">Unconfirmed</span>')})}
  hb.addEventListener('click',()=>{human=!human;hb.setAttribute('aria-pressed',human);pinned=null;draw(+rg.value)});
  draw(+rg.value);

  /* ---------- pipeline funnel ---------- */
  const fsvg=$('#reFun'),fnote=$('#reFunNote');
  const STG=['Lab & animal','Early human','Randomised trial','Phase 3','Approved for EDS'];
  const CA=[
    {n:'Hydralazine',s:'Hydralazine',st:0,w:'vEDS',ev:'early',d:'Given from birth, hydralazine kept 97% of Col3a1 G938D mice alive to 45 days, against 52% untreated. No human trial is registered in the sources reviewed. <sup class="c" data-ref="Bowen2020JCI" title="Source 57">57</sup>'},
    {n:'Cobimetinib (MEK/ERK)',s:'Cobimetinib',st:0,w:'vEDS',ev:'early',d:'This MEK/ERK inhibitor gave 90% survival at 45 days in vEDS mice vs 52% untreated. Animal data only. <sup class="c" data-ref="Bowen2020JCI" title="Source 57">57</sup>'},
    {n:'Ruboxistaurin (PKCβ)',s:'Ruboxistaurin',st:0,w:'vEDS',ev:'early',d:'This PKCβ inhibitor gave 94% survival at 45 days in vEDS mice vs 52% untreated. Animal data only. <sup class="c" data-ref="Bowen2020JCI" title="Source 57">57</sup>'},
    {n:'Hormone blockade',s:'Hormone block',st:0,w:'vEDS',ev:'early',d:'Blocking androgen signalling with bicalutamide raised survival through puberty in vEDS mice (70% vs 50% at 60 days); combined androgen- and mineralocorticoid-receptor blockade gave "near-complete and durable protection". Animal data only. <sup class="c" data-ref="Bowen2020JCI,Juzwiak2026" title="Source 57,232">57,232</sup>'},
    {n:'Doxycycline (hEDS cells)',s:'Doxycycline',st:0,w:'hEDS',ev:'early',d:'In hEDS skin fibroblasts, doxycycline restored a control-like matrix and partly reversed myofibroblast features. In vitro only; the authors pose it as a question, not a recommendation. <sup class="c" data-ref="Chiarelli2021" title="Source 89">89</sup>'},
    {n:'Oxytocin for hEDS pain',s:'Oxytocin',st:1,w:'hEDS',ev:'hyp',d:'EDS-OXY (NCT05405257) tested oxytocin for chronic pain in hEDS. Terminated 11 March 2025 after enrolling 2 participants, because of recruitment problems. <sup class="c" data-ref="NCT05405257" title="Source 332">332</sup>'},
    {n:'Heart-coherence training',s:'Heart coherence',st:1,w:'vEDS',ev:'hyp',d:'HEARTMATH (NCT05994664) tests heart-coherence training in vEDS, with change in systolic blood pressure as the primary outcome; 40 estimated, recruiting (record updated July 2024). <sup class="c" data-ref="NCT05994664" title="Source 337">337</sup>'},
    {n:'Exercise & lifestyle',s:'Exercise plan',st:1,w:'vEDS',ev:'hyp',d:'A co-designed 12-week remote exercise-based lifestyle programme for vEDS (NCT07697573; 40 planned) is not yet recruiting, with an estimated start of 1 March 2027. <sup class="c" data-ref="NCT07697573" title="Source 339">339</sup>'},
    {n:'Celiprolol (BBEST)',s:'Celiprolol',st:2,w:'vEDS',ev:'est',d:'BBEST (NCT00190411), completed 2011: open randomised trial, 53 people; arterial events 20% vs 50%, HR 0.36 (0.15–0.88). Not FDA-approved for any indication. <sup class="c" data-ref="Ong2010,NCT00190411,openFDA-Celiprolol" title="Source 326,345,346">326,345,346</sup>'},
    {n:'Irbesartan add-on (ARCADE)',s:'Irbesartan',st:2,w:'vEDS',ev:'early',d:'ARCADE (NCT02597361), completed February 2020, published 2025: double-blind, placebo-controlled, 57 adults on celiprolol; composite outcome 27.6% vs 53.6%, HR 0.42 (0.17–0.99). <sup class="c" data-ref="NCT02597361,Jeunemaitre2025" title="Source 226,328">226,328</sup>'},
    {n:'Celiprolol (DiSCOVER)',s:'Celiprolol',st:3,w:'vEDS',ev:'hyp',d:'DiSCOVER (NCT05432466): phase 3, double-blind, decentralised, celiprolol 200 mg twice daily vs placebo in COL3A1-positive vEDS aged 15–64; recruiting since 7 November 2022; 150 estimated; primary completion estimated 1 March 2029; record updated 24 August 2025. <sup class="c" data-ref="NCT05432466" title="Source 333">333</sup>'},
    {n:'Enzastaurin (PREVEnt)',s:'Enzastaurin',st:3,w:'vEDS',ev:'hyp',d:'PREVEnt (NCT05463679): phase 3, placebo-controlled trial of the PKCβ inhibitor enzastaurin 500 mg daily, 260 planned. Status: suspended, "Indefinite hold by company" (updated 8 March 2024). <sup class="c" data-ref="NCT05463679" title="Source 334">334</sup>'}
  ];
  let sel=10;
  $('#reCands').innerHTML=CA.map((c,i)=>`<button class="btn" data-recand="${i}" aria-pressed="${i===sel}">${c.n}</button>`).join('');
  function drawFun(){
    const N=vb(fsvg,'720 300','400 600');let s='';
    const EV={est:'Established',early:'Early evidence',hyp:'Unconfirmed'};
    if(!N){const x0=14,cw=(706-x0)/5,top=40,bot=280;
      STG.forEach((g,k)=>{const h0=(bot-top)*(1-k*.15),h1=(bot-top)*(1-(k+1)*.15),xa=x0+k*cw,xb=xa+cw-4,mid=(top+bot)/2;
        s+=`<path d="M${f1(xa)} ${f1(mid-h0/2)}L${f1(xb)} ${f1(mid-h1/2)}L${f1(xb)} ${f1(mid+h1/2)}L${f1(xa)} ${f1(mid+h0/2)}Z" style="fill:${k===4?'var(--panel-2)':'var(--rx-soft)'};opacity:${k===4?1:.75-k*.1}"/>`;
        s+=`<text x="${f1(xa+cw/2)}" y="24" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${g}</text>`;
        const list=CA.map((c,i)=>[c,i]).filter(([c])=>c.st===k);
        list.forEach(([c,i],j)=>{const cy=mid-(list.length-1)*17+j*34,cx=xa+16,on=i===sel;
          s+=`<g class="clk" data-refun="${i}" tabindex="0" role="button" aria-label="${c.n}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${on?8:6}" style="fill:${c.st>=1&&c.ev==='hyp'?'var(--panel)':EVC[c.ev]};stroke:${EVC[c.ev]};stroke-width:2"/><text x="${f1(cx+12)}" y="${f1(cy+4)}" class="t-xs" style="fill:var(--ink);${on?'font-weight:700':''}">${c.s}</text></g>`});
        if(k===4)s+=`<text x="${f1(xa+cw/2)}" y="${f1(mid-6)}" class="t-xs t-mid">none, for any</text><text x="${f1(xa+cw/2)}" y="${f1(mid+8)}" class="t-xs t-mid">EDS type</text>`});
    }else{const top=20,rh=112;
      STG.forEach((g,k)=>{const w0=360*(1-k*.13),w1=360*(1-(k+1)*.13),y=top+k*rh,cx=200;
        s+=`<path d="M${f1(cx-w0/2)} ${y}L${f1(cx+w0/2)} ${y}L${f1(cx+w1/2)} ${y+rh-6}L${f1(cx-w1/2)} ${y+rh-6}Z" style="fill:${k===4?'var(--panel-2)':'var(--rx-soft)'};opacity:${k===4?1:.75-k*.1}"/>`;
        s+=`<text x="${f1(cx-w0/2+10)}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:600">${g}</text>`;
        const list=CA.map((c,i)=>[c,i]).filter(([c])=>c.st===k);
        list.forEach(([c,i],j)=>{const col=j%2,row=Math.floor(j/2),px=cx-w1/2+14+col*(w1/2),py=y+36+row*22,on=i===sel;
          s+=`<g class="clk" data-refun="${i}" tabindex="0" role="button" aria-label="${c.n}"><circle cx="${f1(px)}" cy="${f1(py)}" r="${on?7:5}" style="fill:${c.st>=1&&c.ev==='hyp'?'var(--panel)':EVC[c.ev]};stroke:${EVC[c.ev]};stroke-width:2"/><text x="${f1(px+10)}" y="${f1(py+4)}" class="t-xs" style="fill:var(--ink);${on?'font-weight:700':''}">${c.s}</text></g>`});
        if(k===4)s+=`<text x="${cx}" y="${y+50}" class="t-xs t-mid">none, for any EDS type</text>`});
    }
    fsvg.innerHTML=s;
    const c=CA[sel];fnote.innerHTML=noteHTML({k:STG[c.st]+' · '+c.w,t:c.n,txt:c.d+` <span class="ev ${c.ev}">${EV[c.ev]}</span>`,
      pt:c.st===0?'This has only been tested in animals or cells. It is not a treatment for people.':c.st<3?'Small or early studies in people. Results need confirming.':'A large trial in people is under way or on hold. No result yet.',
      hook:'No specific medical or genetic therapy is available for any EDS type. <sup class="c" data-ref="Malfait2020" title="Source 292">292</sup>'})}
  function pick(i){sel=i;$$('[data-recand]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.recand===i));drawFun()}
  $('#reCands').addEventListener('click',e=>{const b=e.target.closest('[data-recand]');if(b)pick(+b.dataset.recand)});
  fsvg.addEventListener('click',e=>{const g=e.target.closest('[data-refun]');if(g)pick(+g.dataset.refun)});
  fsvg.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest('[data-refun]');if(!g)return;e.preventDefault();const i=+g.dataset.refun;pick(i);const ng=fsvg.querySelector(`[data-refun="${i}"]`);ng&&ng.focus()});
  drawFun();
  {const prev=redraws.frontier;redraws.frontier=()=>{prev&&prev();drawFun()}}
};
/* =============== 5.1 Living with EDS =============== */
inits.living=()=>{
  const svg=$('#liSvg'),rg=$('#liT');
  let ty='h';
  const SB=[0,.2,.4,.6,.8,1.0001];
  const AGE=['Age 8','Age 15','Age 30','Age 36','Any age'];
  const STAGE=['School','PE & sport','Work','Family','Support'];

  /* ---------- small glyphs (r ≈ 11), all from theme tokens ---------- */
  function G(g,x,y){const X=v=>f1(x+v),Y=v=>f1(y+v),st='style="fill:none;stroke:var(--accent);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"',fl='style="fill:var(--accent)"';
    switch(g){
    case 'pen':return `<path d="M${X(-7)} ${Y(7)}L${X(5)} ${Y(-5)}" style="stroke:var(--accent);stroke-width:5;stroke-linecap:round"/><path d="M${X(-7)} ${Y(7)}L${X(-9)} ${Y(9)}" ${st}/>`;
    case 'hand':return `<path d="M${X(-8)} ${Y(6)}Q${X(-4)} ${Y(-8)} ${X(0)} ${Y(2)}T${X(8)} ${Y(-3)}" ${st}/><path d="M${X(-9)} ${Y(9)}H${X(9)}" ${st}/>`;
    case 'school':return `<path d="M${X(-9)} ${Y(9)}V${Y(-1)}L${X(0)} ${Y(-8)}L${X(9)} ${Y(-1)}V${Y(9)}Z" ${st}/><rect x="${X(-2.5)}" y="${Y(3)}" width="5" height="6" ${fl}/>`;
    case 'clock':return `<circle cx="${X(0)}" cy="${Y(0)}" r="9" ${st}/><path d="M${X(0)} ${Y(-5)}V${Y(0)}L${X(4)} ${Y(3)}" ${st}/>`;
    case 'pad':return `<rect x="${X(-6)}" y="${Y(-9)}" width="12" height="18" rx="5" ${st}/><path d="M${X(-6)} ${Y(-2)}H${X(6)}M${X(-6)} ${Y(3)}H${X(6)}" ${st}/>`;
    case 'card':return `<rect x="${X(-10)}" y="${Y(-7)}" width="20" height="14" rx="2.5" ${st}/><path d="M${X(-1)} ${Y(-2)}V${Y(4)}M${X(-4)} ${Y(1)}H${X(2)}" style="stroke:var(--vas);stroke-width:2;stroke-linecap:round"/><path d="M${X(4)} ${Y(-2)}H${X(7)}M${X(4)} ${Y(2)}H${X(7)}" ${st}/>`;
    case 'ball':return `<circle cx="${X(0)}" cy="${Y(0)}" r="9" ${st}/><path d="M${X(-3)} ${Y(-2)}L${X(0)} ${Y(-4.5)}L${X(3)} ${Y(-2)}L${X(2)} ${Y(2)}H${X(-2)}Z" ${fl}/>`;
    case 'knee':return `<path d="M${X(-4)} ${Y(-10)}L${X(0)} ${Y(0)}L${X(-3)} ${Y(10)}" style="fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${X(0)}" cy="${Y(0)}" r="6" style="fill:none;stroke:var(--variant);stroke-width:1.6;stroke-dasharray:2 2"/>`;
    case 'run':return `<circle cx="${X(2)}" cy="${Y(-7)}" r="2.6" ${fl}/><path d="M${X(1)} ${Y(-3)}L${X(-1)} ${Y(3)}L${X(4)} ${Y(9)}M${X(-1)} ${Y(3)}L${X(-6)} ${Y(8)}M${X(-6)} ${Y(-1)}L${X(1)} ${Y(-3)}L${X(6)} ${Y(1)}" ${st}/>`;
    case 'yoga':return `<circle cx="${X(0)}" cy="${Y(-7)}" r="2.6" ${fl}/><path d="M${X(0)} ${Y(-3)}V${Y(4)}M${X(-8)} ${Y(-5)}L${X(0)} ${Y(-1)}L${X(8)} ${Y(-5)}M${X(-7)} ${Y(8)}Q${X(0)} ${Y(2)} ${X(7)} ${Y(8)}" ${st}/>`;
    case 'ban':return `<circle cx="${X(0)}" cy="${Y(0)}" r="9" style="fill:none;stroke:var(--vas);stroke-width:2"/><path d="M${X(-6.4)} ${Y(-6.4)}L${X(6.4)} ${Y(6.4)}" style="stroke:var(--vas);stroke-width:2"/>`;
    case 'swim':return `<path d="M${X(-9)} ${Y(4)}q2.25 -3 4.5 0t4.5 0t4.5 0t4.5 0M${X(-9)} ${Y(8)}q2.25 -3 4.5 0t4.5 0t4.5 0t4.5 0" ${st}/><circle cx="${X(3)}" cy="${Y(-5)}" r="2.6" ${fl}/><path d="M${X(-6)} ${Y(0)}L${X(1)} ${Y(-2)}" ${st}/>`;
    case 'scar':return `<path d="M${X(-9)} ${Y(0)}H${X(9)}" ${st}/><path d="M${X(-6)} ${Y(-4)}V${Y(4)}M${X(-2)} ${Y(-4)}V${Y(4)}M${X(2)} ${Y(-4)}V${Y(4)}M${X(6)} ${Y(-4)}V${Y(4)}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    case 'walk':return `<circle cx="${X(0)}" cy="${Y(-7)}" r="2.6" ${fl}/><path d="M${X(0)} ${Y(-3)}V${Y(3)}L${X(-4)} ${Y(9)}M${X(0)} ${Y(3)}L${X(4)} ${Y(9)}M${X(-5)} ${Y(1)}L${X(0)} ${Y(-2)}L${X(5)} ${Y(1)}" ${st}/>`;
    case 'heart':return `<path d="M${X(0)} ${Y(8)}C${X(-12)} ${Y(-1)} ${X(-5)} ${Y(-11)} ${X(0)} ${Y(-4)}C${X(5)} ${Y(-11)} ${X(12)} ${Y(-1)} ${X(0)} ${Y(8)}Z" ${st}/>`;
    case 'desk':return `<rect x="${X(-8)}" y="${Y(-8)}" width="16" height="10" rx="1.5" ${st}/><path d="M${X(0)} ${Y(2)}V${Y(6)}M${X(-10)} ${Y(8)}H${X(10)}" ${st}/>`;
    case 'scale':return `<path d="M${X(0)} ${Y(-8)}V${Y(8)}M${X(-8)} ${Y(-4)}H${X(8)}M${X(-8)} ${Y(-4)}L${X(-10)} ${Y(3)}H${X(-6)}ZM${X(8)} ${Y(-4)}L${X(6)} ${Y(3)}H${X(10)}Z" ${st}/>`;
    case 'bar':return `<path d="M${X(-9)} ${Y(9)}H${X(9)}" ${st}/><rect x="${X(-7)}" y="${Y(-1)}" width="4" height="10" ${fl}/><rect x="${X(-1)}" y="${Y(-8)}" width="4" height="17" ${fl}/><rect x="${X(5)}" y="${Y(3)}" width="4" height="6" ${fl}/>`;
    case 'ped':return `<rect x="${X(-10)}" y="${Y(-9)}" width="8" height="8" style="fill:var(--ink)"/><circle cx="${X(6)}" cy="${Y(-5)}" r="4" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><path d="M${X(-2)} ${Y(-5)}H${X(2)}M${X(0)} ${Y(-5)}V${Y(3)}" style="stroke:var(--ink);stroke-width:1.2"/><circle cx="${X(0)}" cy="${Y(7)}" r="3.5" style="fill:var(--variant)"/>`;
    case 'dna':return `<path d="M${X(-5)} ${Y(-9)}C${X(9)} ${Y(-3)} ${X(-9)} ${Y(3)} ${X(5)} ${Y(9)}M${X(5)} ${Y(-9)}C${X(-9)} ${Y(-3)} ${X(9)} ${Y(3)} ${X(-5)} ${Y(9)}" ${st}/>`;
    case 'baby':return `<circle cx="${X(0)}" cy="${Y(-3)}" r="5" ${st}/><path d="M${X(-7)} ${Y(9)}Q${X(0)} ${Y(1)} ${X(7)} ${Y(9)}" ${st}/>`;
    case 'note':return `<path d="M${X(-7)} ${Y(-9)}H${X(4)}L${X(8)} ${Y(-5)}V${Y(9)}H${X(-7)}Z" ${st}/><path d="M${X(-4)} ${Y(-2)}H${X(5)}M${X(-4)} ${Y(2)}H${X(5)}M${X(-4)} ${Y(6)}H${X(2)}" ${st}/>`;
    case 'family':return person(x-9,y-9,16,'var(--accent)')+person(x+1,y-5,12,'var(--accent)');
    case 'ear':return `<path d="M${X(-4)} ${Y(-8)}C${X(6)} ${Y(-12)} ${X(10)} ${Y(-2)} ${X(3)} ${Y(3)}Q${X(0)} ${Y(5)} ${X(1)} ${Y(9)}" ${st}/><path d="M${X(-1)} ${Y(-3)}Q${X(3)} ${Y(-5)} ${X(3)} ${Y(-1)}" ${st}/>`;
    case 'zebra':return zebra(x,y,10,{id:'lizb'+Math.round(x)+'_'+Math.round(y)});
    case 'laptop':return `<rect x="${X(-7)}" y="${Y(-7)}" width="14" height="10" rx="1.5" ${st}/><path d="M${X(-10)} ${Y(6)}H${X(10)}" style="stroke:var(--accent);stroke-width:2.4;stroke-linecap:round"/>`;
    }return ''}

  /* ---------- support chips per stage and type (labels shortened from the cited text in the note) ---------- */
  function chips(s){
    if(s===0)return [
      {g:'pen',a:'Wide-grip pens',b:'OT assistive devices'},
      {g:'hand',a:'Handwriting help',b:'71% find it hard to keep up'},
      {g:'school',a:'Physio + OT school visit',b:'mobility, PE, attendance'},
      ty==='c'?{g:'pad',a:'Pads: forehead, knees',b:'young children, fragile skin'}
      :ty==='v'?{g:'family',a:'Found by family testing',b:'55% of children diagnosed'}
      :{g:'clock',a:'Pain and fatigue',b:'73% and 68% affect daily life'}];
    if(s===1)return ty==='v'?[
      {g:'ban',a:'No collision sports',b:'or heavy, extreme lifting'},
      {g:'walk',a:'Regular gentle exercise',b:'for body and mind'},
      {g:'card',a:'Emergency card',b:'vEDS passport, MedicAlert'},
      {g:'heart',a:'Blood pressure normal',b:'consensus: treat high BP'}]
      :ty==='c'?[
      {g:'pad',a:'Shin pads, ski stockings',b:'during activities'},
      {g:'ban',a:'Avoid heavy joint strain',b:'sports that load joints'},
      {g:'swim',a:'Non-weight-bearing',b:'builds strength, control'},
      {g:'scar',a:'Skin splits easily',b:'knees, shins, forehead'}]
      :[
      {g:'ball',a:'Adapted PE',b:'high impact: subluxation risk'},
      {g:'knee',a:'Contact sport',b:'knee injury OR 4.69 (GJH)'},
      {g:'run',a:'Physio exercise advice',b:'linked to more exercise'},
      {g:'yoga',a:'Yoga not ruled out',b:'if no joint slips out'}];
    if(s===2)return [
      {g:'desk',a:'Ergonomic workstation',b:'OT: home and work'},
      {g:'clock',a:'Pacing',b:'energy conservation (OT)'},
      {g:'scale',a:'Demands match ability',b:'then work aids well-being'},
      ty==='v'?{g:'bar',a:'Stopped work: age 41',b:'median, Norway, LDS/vEDS'}:{g:'bar',a:'45.6% unemployed',b:'UK survey, hEDS/HSD'}];
    if(s===3)return [
      {g:'ped',a:'1 in 2 per child',b:'hEDS, cEDS, vEDS: dominant'},
      {g:'dna',a:'Genetic counselling',b:ty==='h'?'no prenatal test for hEDS':'prenatal/PGT: variant known'},
      {g:'baby',a:'Plan pregnancy early',b:'see module 5.2'},
      ty==='v'?{g:'family',a:'Test relatives',b:'for the familial COL3A1 variant'}:{g:'note',a:'Record infant bruising',b:'and its causes'}];
    return [
      {g:'heart',a:'Mental-health care',b:'alongside physiotherapy'},
      {g:'ear',a:'Being believed',b:'73% doubted their own pain'},
      {g:'zebra',a:'Peer support',b:'the zebra community'},
      {g:'laptop',a:'Online programmes',b:'pilots: early evidence'}];
  }

  /* ---------- notes ---------- */
  const N1={
    h:{txt:`In a meta-analysis of 18 studies, people with generalised joint hypermobility had a higher risk of knee injury in contact sport (combined OR 4.69, 95% CI 1.33–16.52) but not of ankle injury. <sup class="c" data-ref="Pacey2010" title="Source 350">350</sup> For hEDS, GeneReviews says high-impact activity may increase the risk of acute subluxation or dislocation and of pain, and that yoga and chiropractic adjustment are "not contraindicated" if done in ways that avoid causing subluxations. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> In a UK survey of 946 people, those who had exercise advice from a physiotherapist were more likely to report high weekly exercise (OR 1.75). <sup class="c" data-ref="Simmonds2019" title="Source 433">433</sup> More in <a href="#physio" data-go="physio">Exercise &amp; physiotherapy</a>.`,
       pt:`Moving is still good. The warnings in the sources are mainly about high-impact and contact sport, which can make joints slip out of place.`,
       hook:`Generalised joint hypermobility + contact sport: knee injury OR 4.69; ankle injury not increased. <sup class="c" data-ref="Pacey2010" title="Source 350">350</sup>`},
    c:{txt:`For classical EDS, GeneReviews lists "sports with heavy joint strain" among things to avoid and says non-weight-bearing exercise promotes muscle strength and coordination. Older children can wear soccer pads or ski stockings with shin padding during activities. The skin splits after relatively minor trauma, especially over the knees, elbows, shins, forehead and chin. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`,
       pt:`In classical EDS the skin tears and scars easily, so padding the shins and knees during sport protects it.`,
       hook:`cEDS: shin padding during activity; avoid sports with heavy joint strain; non-weight-bearing exercise. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`},
    v:{txt:`For vascular EDS, GeneReviews lists trauma to avoid, including collision sports, heavy lifting and weight training with extreme lifting. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> The UK national service advises that "regular, low-intensity exercise should be maintained for health and psychological wellbeing". <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup> The Orphanet review calls intense physical activity, scuba diving and violent sports inadvisable. <sup class="c" data-ref="Germain2007" title="Source 180">180</sup> No trial has defined a safe exercise dose; advice rests on consensus and expert opinion. <sup class="c" data-ref="Byers2017,Germain2007" title="Source 67,180">67,180</sup> <span class="ev early">Early evidence</span> A co-designed 12-week remote exercise programme for vEDS is registered, not yet recruiting. <sup class="c" data-ref="NCT07697573" title="Source 339">339</sup>`,
       pt:`People with vascular EDS should avoid collision sports and heavy lifting, but regular gentle exercise is good for the body and mind.`,
       hook:`vEDS: no collision sports, heavy lifting or extreme weight training; keep up regular low-intensity exercise. <sup class="c" data-ref="Byers2025GeneReviews,Bowen2023vEDS" title="Source 58,68">58,68</sup>`}};
  function steps(){return [
    {from:SB[0],at:.1,k:'Stage 1 · age 8',t:'Childhood: school',
     txt:`Among 100 parents of children aged 8–18 at a connective-tissue clinic (48% hEDS or joint hypermobility syndrome), pain (73%) and fatigue (68%) were the symptoms most often said to affect daily life. Parents were satisfied with school participation in only 33%; the commonest difficulties were keeping up with handwriting (71%) and gross motor activities (70%). <sup class="c" data-ref="Wesley2021" title="Source 504">504</sup> GeneReviews lists occupational therapy for assistive devices such as wide-grip writing utensils. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> In the Bendy Study a physiotherapist and an occupational therapist visited each child's school together to talk through mobility, handwriting, PE and attendance. <sup class="c" data-ref="Bale2019" title="Source 25">25</sup> `+
       (ty==='c'?`For classical EDS, young children with fragile skin can wear pads or bandages over the forehead, knees and shins. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`
       :ty==='v'?`For vascular EDS, 55% of 63 London children diagnosed before 18 were found through family genetic testing; 13 children had 18 events, the first at a median age of 11. <sup class="c" data-ref="Wilkinson2025" title="Source 506">506</sup>`
       :`The paediatric framework defines generalised joint hypermobility in children as a Beighton score of at least 6/9, and reserves hEDS for biologically mature adolescents. <sup class="c" data-ref="Tofts2023" title="Source 464">464</sup>`),
     pt:`Children with EDS may need help with handwriting and PE at school. A school plan can help. <sup class="c" data-ref="Wesley2021,Hakim2024GeneReviews" title="Source 199,504">199,504</sup>`,
     hook:`Children: generalised hypermobility = Beighton ≥6/9; hEDS is diagnosed only after biological maturity. <sup class="c" data-ref="Tofts2023" title="Source 464">464</sup>`},
    Object.assign({from:SB[1],at:.3,k:'Stage 2 · age 15',t:'Teenage years: PE and sport'},N1[ty]),
    {from:SB[2],at:.5,k:'Stage 3 · age 30',t:'Adulthood: work',
     txt:(ty==='v'?`In a Norwegian survey of 50 adults with Loeys-Dietz syndrome or vEDS, 66% received disability benefits and the median age at stopping work was 41; those still working were less fatigued and slept better. <sup class="c" data-ref="Johansen2022vEDS" title="Source 228">228</sup> `
       :`In a UK national survey of 2,002 people with hEDS or HSD, 45.6% reported unemployment, 47.9% dependence on benefits and 55.9% disrupted education. <sup class="c" data-ref="Berg2026" title="Source 41">41</sup> `)+
       `Interviews with people with hEDS found that work pressure, tasks and transport shape participation, and that work had positive effects on well-being when job demands matched ability. <sup class="c" data-ref="DeBaets2021" title="Source 114">114</sup> GeneReviews lists occupational therapy for home and work ergonomics. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> Occupational-therapy guidance for EDS with POTS covers energy conservation, pacing and adaptive equipment; <span class="ev hyp">Hypothesis</span> pacing is recommended by patients and clinicians but has not been tested on its own in a trial. <sup class="c" data-ref="Levine2022OT,Bennett2022" title="Source 40,264">40,264</sup>`,
     pt:`Work went better when the job's demands matched what the person could do. Pacing and an adapted workstation are the tools the sources describe.`,
     hook:`In hypermobility-related disorders, disability correlated with fatigue (r = .91) and distress (r = .86) more than with pain (r = .64). <sup class="c" data-ref="Scheper2016" title="Source 414">414</sup>`},
    {from:SB[3],at:.7,k:'Stage 4 · age 36',t:'Parenthood and family',
     txt:`vEDS, cEDS and hEDS are autosomal dominant: each child of an affected parent has a 50% chance of inheriting the condition. <sup class="c" data-ref="Byers2025GeneReviews,Malfait2024GeneReviews,Hakim2024GeneReviews" title="Source 68,199,293">68,199,293</sup> `+
       (ty==='h'?`Most people with hEDS have an affected parent, though the parent's signs may be subtle. Prenatal and preimplantation testing are not possible for hEDS because no causal gene is known. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> `
       :ty==='c'?`About half of people with cEDS have an affected parent and about half have a new (de novo) variant. Once the familial variant is known, prenatal and preimplantation testing are possible. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup> `
       :`About half of people with vEDS have a new (de novo) variant. Evaluating first-degree relatives is appropriate and, even without signs, proceeds to testing for the known familial COL3A1 variant. Prenatal and preimplantation testing are possible once it is known. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> `)+
       `Perinatal guidance recommends documenting early bruising in infants, and its causes, "to avoid false accusations of maltreatment". <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup> See <a href="#pregnancy" data-go="pregnancy">Pregnancy &amp; parenthood</a> and <a href="#genes" data-go="genes">Inheritance &amp; genetic testing</a>.`,
     pt:`Most EDS types pass from parent to child. Each child has a 1 in 2 chance. <sup class="c" data-ref="Byers2025GeneReviews,Hakim2024GeneReviews" title="Source 68,199">68,199</sup>`,
     hook:`Prenatal and preimplantation testing: possible for vEDS and cEDS once the familial variant is known, not for hEDS. <sup class="c" data-ref="Byers2025GeneReviews,Hakim2024GeneReviews" title="Source 68,199">68,199</sup>`},
    {from:SB[4],at:.9,k:'Stage 5 · any age',t:'Mind, belief and community',
     txt:`<span class="ev est">Established</span> In a Swedish cohort, EDS was associated with depression (RR 3.4), ADHD (RR 5.6) and autism (RR 7.4); the cause is unknown. <sup class="c" data-ref="Cederlof2016" title="Source 81">81</sup> A Consortium review describes a strong association with anxiety and recommends integrated psychological care alongside physiotherapy. <sup class="c" data-ref="Bulbena2017" title="Source 62">62</sup> In a study across Europe and North America, 73% questioned the reality of their own pain after repeated dismissal; the authors recommend clinicians practise "epistemic humility". <sup class="c" data-ref="Halverson2025" title="Source 205">205</sup> Members of EDS support groups mapped 448 social connections and discussed EDS daily. <sup class="c" data-ref="Callen2025" title="Source 70">70</sup> <span class="ev early">Early evidence</span> Online mindfulness and pain-management pilots were feasible. <sup class="c" data-ref="Lattimore2023,Chew2025H" title="Source 88,260">88,260</sup>`,
     pt:`If doctors have doubted you, it is common to start doubting yourself. Your pain is real. Meeting other "zebras" helps many people feel less alone. <sup class="c" data-ref="Halverson2025,Callen2025,Bennett2021" title="Source 39,70,205">39,70,205</sup>`,
     hook:`Psychiatric distress in EDS tracks pain (OR 9.68), not hypermobility itself. <sup class="c" data-ref="Hershenfeld2016" title="Source 210">210</sup>`}
  ]}
  let STEPS=steps();

  /* ---------- scene ---------- */
  function scene(s,u,ox,oy,W,H,N){
    let g='';const fl=oy+H-26,ap=ease(ramp(u,0,.25));
    g+=`<rect x="${ox}" y="${oy}" width="${W}" height="${H}" rx="12" style="fill:var(--panel-2)"/>`;
    g+=`<line x1="${ox+12}" x2="${ox+W-12}" y1="${fl}" y2="${fl}" style="stroke:var(--line);stroke-width:2"/>`;
    g+=`<text x="${ox+14}" y="${oy+22}" class="t-sm">${AGE[s].toUpperCase()} · ${STAGE[s].toUpperCase()}</text>`;
    const px=ox+W*(N?.3:.28);
    const sz=[78,100,112,112,104][s];
    if(s===0){/* school building, desk, paper, pen writing */
      const bx=ox+W-(N?120:150);g+=`<g style="opacity:${f1(.5+ap*.5)}"><path d="M${bx} ${fl}V${fl-110}L${bx+55} ${fl-150}L${bx+110} ${fl-110}V${fl}Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><rect x="${bx+44}" y="${fl-48}" width="22" height="48" style="fill:var(--brand-soft);stroke:var(--muted)"/><rect x="${bx+16}" y="${fl-96}" width="20" height="18" style="fill:var(--brand-soft)"/><rect x="${bx+74}" y="${fl-96}" width="20" height="18" style="fill:var(--brand-soft)"/><path d="M${bx+55} ${fl-150}V${fl-176}" style="stroke:var(--muted);stroke-width:1.4"/><path d="M${bx+55} ${fl-176}l16 5l-16 5z" style="fill:var(--accent)"/></g>`;
      const dx=px+30;g+=`<rect x="${dx}" y="${fl-44}" width="${N?84:110}" height="6" rx="2" style="fill:var(--bone-line)"/><path d="M${dx+8} ${fl-38}V${fl}M${dx+(N?76:102)} ${fl-38}V${fl}" style="stroke:var(--bone-line);stroke-width:3"/>`;
      g+=`<rect x="${dx+14}" y="${fl-52}" width="50" height="8" style="fill:var(--panel);stroke:var(--line)"/>`;
      const wl=ramp(u,.15,.9);let d=`M${f1(dx+18)} ${f1(fl-48)}`;const n=Math.round(wl*14);for(let i=1;i<=n;i++)d+=`L${f1(dx+18+i*3)} ${f1(fl-48+(i%2?-2.5:1.5))}`;
      if(n)g+=`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.1"/>`;
      g+=`<path d="M${f1(dx+20+n*3)} ${f1(fl-50)}l10 -14" style="stroke:var(--accent);stroke-width:5;stroke-linecap:round"/>`;
    }
    if(s===1){/* field, goal, ball, type-specific sign */
      g+=`<rect x="${ox+12}" y="${fl}" width="${W-24}" height="10" style="fill:var(--accent-soft)"/>`;
      const gx=ox+W-(N?70:90);g+=`<path d="M${gx} ${fl}V${fl-70}H${gx+50}V${fl}" style="fill:none;stroke:var(--muted);stroke-width:3"/>`;
      for(let i=1;i<5;i++)g+=`<line x1="${gx}" x2="${gx+50}" y1="${fl-i*14}" y2="${fl-i*14}" style="stroke:var(--line)"/>`;
      const bxx=lerp(px+50,gx-20,ease(ramp(u,.1,.7))),byy=fl-12-Math.sin(Math.PI*ramp(u,.1,.7))*60;
      g+=G('ball',bxx,byy);
      if(ty==='v'){const sx=ox+W*(N?.62:.56),sy=oy+150;g+=`<g style="opacity:${f1(ap)}"><circle cx="${sx}" cy="${sy}" r="30" style="fill:var(--panel);stroke:var(--vas);stroke-width:3"/>${person(sx-17,sy-14,26,'var(--muted)')}${person(sx+3,sy-14,26,'var(--muted)')}<path d="M${sx-21} ${sy-21}L${sx+21} ${sy+21}" style="stroke:var(--vas);stroke-width:3"/><text x="${sx}" y="${sy+46}" class="t-xs t-mid" style="fill:var(--vas)">no collision sport</text></g>`}
      if(ty==='c'){[0,1].forEach(k=>{g+=`<rect x="${f1(px+sz*(k?.04:-.22))}" y="${f1(fl-sz*.36)}" width="${f1(sz*.17)}" height="${f1(sz*.3)}" rx="3" style="fill:var(--accent);opacity:${f1(.85*ap)}"/>`});
        g+=`<text x="${f1(px+sz*.4)}" y="${f1(fl-sz*.2)}" class="t-xs" style="opacity:${f1(ap)}">shin pads</text>`}
      if(ty==='h'){g+=`<circle cx="${f1(px)}" cy="${f1(fl-sz*.22)}" r="${f1(sz*.2)}" style="fill:none;stroke:var(--variant);stroke-width:2;stroke-dasharray:4 3;opacity:${f1(ap)}"/><text x="${f1(px+sz*.26)}" y="${f1(fl-sz*.36)}" class="t-xs" style="opacity:${f1(ap)}">knee: contact sport</text>`}
    }
    if(s===2){/* desk, monitor, chair with lumbar support, clock (pacing) */
      const dx=px+34,dw=N?120:150;
      g+=`<rect x="${dx}" y="${fl-60}" width="${dw}" height="7" rx="2" style="fill:var(--bone-line)"/><path d="M${dx+8} ${fl-53}V${fl}M${dx+dw-8} ${fl-53}V${fl}" style="stroke:var(--bone-line);stroke-width:3"/>`;
      g+=`<rect x="${dx+dw*.35}" y="${fl-120}" width="${dw*.5}" height="${dw*.33}" rx="4" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/><path d="M${dx+dw*.6} ${fl-120+dw*.33}V${fl-60}" style="stroke:var(--ink);stroke-width:2"/>`;
      g+=`<path d="M${f1(dx+dw*.4)} ${f1(fl-120+dw*.24)}l8 -8l8 5l10 -12l10 6" style="fill:none;stroke:var(--accent);stroke-width:1.6;opacity:${f1(ap)}"/>`;
      g+=`<text x="${f1(dx+dw*.6)}" y="${fl-128}" class="t-xs t-mid" style="opacity:${f1(ap)}">screen at eye level</text>`;
      const cx=ox+W-(N?40:50),cy=oy+62,an=u*Math.PI*4;
      g+=`<circle cx="${cx}" cy="${cy}" r="22" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/><path d="M${cx} ${cy}L${f1(cx+Math.sin(an)*16)} ${f1(cy-Math.cos(an)*16)}M${cx} ${cy}L${f1(cx+Math.sin(an/12)*10)} ${f1(cy-Math.cos(an/12)*10)}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/>`;
      g+=`<path d="M${cx} ${cy}L${cx} ${cy-22}A22 22 0 0 1 ${f1(cx+22*Math.sin(Math.PI*.6))} ${f1(cy-22*Math.cos(Math.PI*.6))}Z" style="fill:var(--accent);opacity:.25"/><text x="${cx}" y="${cy+36}" class="t-xs t-mid">pacing</text>`;
      g+=`<path d="M${f1(px-sz*.32)} ${fl-58}Q${f1(px-sz*.42)} ${fl-34} ${f1(px-sz*.3)} ${fl-12}" style="fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round;opacity:${f1(ap)}"/>`;
    }
    if(s===3){/* parent and child, mini pedigree */
      const cx=px+sz*.55;g+=person(cx,fl-sz*.52,sz*.52,'var(--brand)',{op:.85});
      g+=`<path d="M${f1(px+sz*.22)} ${f1(fl-sz*.42)}Q${f1(px+sz*.42)} ${f1(fl-sz*.3)} ${f1(cx-sz*.1)} ${f1(fl-sz*.3)}" style="fill:none;stroke:var(--brand);stroke-width:3;stroke-linecap:round"/>`;
      const qx=ox+W-(N?110:150),qy=oy+60;
      g+=`<g style="opacity:${f1(ap)}">${ped(qx,qy,'m',1,{r:10})}${ped(qx+60,qy,'f',0,{r:10})}<path d="M${qx+10} ${qy}H${qx+50}M${qx+30} ${qy}V${qy+24}M${qx+6} ${qy+24}H${qx+54}M${qx+6} ${qy+24}V${qy+36}M${qx+54} ${qy+24}V${qy+36}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
      const fl2=ramp(u,.3,.8);g+=`${ped(qx+6,qy+46,'f',fl2>.5?1:0,{r:10})}${ped(qx+54,qy+46,'m',0,{r:10})}<text x="${qx+30}" y="${qy+80}" class="t-sm t-mid" style="fill:var(--ink)">each child: 50%</text></g>`;
    }
    if(s===4){/* zebra hub and a peer network */
      const zx=ox+W*(N?.66:.62),zy=oy+H*.48,R=N?78:92,k=8;
      const on=ramp(u,.1,.85);
      for(let i=0;i<k;i++){const a=-Math.PI/2+i*2*Math.PI/k,qx=zx+Math.cos(a)*R,qy=zy+Math.sin(a)*R*.8;const vis=on*k>i;
        const a2=-Math.PI/2+((i+3)%k)*2*Math.PI/k;
        if(vis){g+=`<line x1="${f1(qx)}" y1="${f1(qy)}" x2="${zx}" y2="${zy}" style="stroke:var(--line);stroke-width:1.2"/>`;
          if(on*k>i+1)g+=`<line x1="${f1(qx)}" y1="${f1(qy)}" x2="${f1(zx+Math.cos(a2)*R)}" y2="${f1(zy+Math.sin(a2)*R*.8)}" style="stroke:var(--accent);stroke-width:1;opacity:.5"/>`;
          g+=person(qx-7,qy-10,20,'var(--muted)')}}
      g+=zebra(zx,zy,N?30:36,{id:'liZb'});
      g+=`<text x="${zx}" y="${f1(zy+R*.8+28)}" class="t-xs t-mid">peer support network</text>`;
    }
    /* headline statistic for the stage, counting up */
    const ST=[{n:71,f:v=>Math.round(v)+'%',l:['of parents: handwriting','hard to keep up']},
      ty==='v'?{w:'No collision sport',l:['regular gentle exercise','is still advised']}:ty==='c'?{w:'Pad the shins',l:['skin splits over knees,','shins and forehead']}:{n:4.69,f:v=>'OR '+v.toFixed(2),l:['knee injury, contact sport','(generalised hypermobility)']},
      ty==='v'?{n:41,f:v=>Math.round(v)+' y',l:['median age stopping work','(Norway, LDS or vEDS)']}:{n:45.6,f:v=>v.toFixed(1)+'%',l:['unemployed in a UK survey','of hEDS/HSD (n = 2,002)']},
      {w:'1 in 2',l:['chance for each child','in the dominant types']},
      {n:73,f:v=>Math.round(v)+'%',l:['questioned the reality','of their own pain']}][s];
    const cu=ease(ramp(u,.05,.45)),hx=ox+16,hy=oy+(N?60:66);
    g+=`<text x="${hx}" y="${hy}" class="t-big" style="font-size:${ST.w?(N?20:24):(N?28:34)}px;fill:var(--accent);opacity:${f1(.3+cu*.7)}">${ST.w||ST.f(ST.n*cu)}</text>`;
    ST.l.forEach((l,i)=>g+=`<text x="${hx}" y="${hy+18+i*14}" class="t-xs" style="opacity:${f1(cu)}">${l}</text>`);
    /* the person, growing between stages */
    g+=person(px-sz*.26,fl-sz,sz,'var(--brand)');
    return g}

  function chip(c,x,y,w,h,vis){const sc=ease(clamp(vis*1.6));if(vis<=0)return '';
    return `<g style="opacity:${f1(clamp(vis*2))}" transform="translate(${f1(x+w/2)} ${f1(y+h/2)}) scale(${f1(.85+.15*sc)}) translate(${f1(-x-w/2)} ${f1(-y-h/2)})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:var(--panel);stroke:var(--line)"/><circle cx="${x+24}" cy="${y+h/2}" r="16" style="fill:var(--accent-soft)"/>${G(c.g,x+24,y+h/2)}<text x="${x+48}" y="${y+h/2-3}" class="t-lbl" style="font-size:12.5px">${c.a}</text><text x="${x+48}" y="${y+h/2+12}" class="t-xs">${c.b}</text></g>`}

  let setSt;
  function draw(t){const N=vb(svg,'720 380','400 560');const W=N?400:720;let s='';
    const st=Math.min(4,Math.floor(t/.2)),u=ramp(t,SB[st],SB[st+1]);
    /* life strip */
    const x0=N?20:24,x1=W-(N?20:24),sy=N?22:24,segw=(x1-x0)/5;
    for(let i=0;i<5;i++){const a=x0+i*segw;s+=`<rect x="${f1(a+2)}" y="${sy-8}" width="${f1(segw-4)}" height="16" rx="8" style="fill:${i===st?'var(--brand)':i<st?'var(--brand-soft)':'var(--panel-2)'}"/>`;
      s+=`<text x="${f1(a+segw/2)}" y="${sy+4}" class="t-xs t-mid" style="fill:${i===st?'var(--on-brand)':'var(--muted)'}">${N?STAGE[i].replace('PE & sport','PE'):STAGE[i]}</text>`}
    s+=`<circle cx="${f1(x0+t*(x1-x0))}" cy="${sy+13}" r="3.5" style="fill:var(--accent)"/>`;
    const C=chips(st);
    if(N){s+=scene(st,u,12,44,376,288,true);C.forEach((c,j)=>{s+=chip(c,12,344+j*53,376,47,ramp(u,.08+j*.13,.2+j*.13))})}
    else{s+=scene(st,u,20,44,438,322,false);
      s+=`<text x="478" y="62" class="t-sm">SUPPORTS IN THE SOURCES</text>`;
      C.forEach((c,j)=>{s+=chip(c,474,72+j*73,226,62,ramp(u,.08+j*.13,.2+j*.13))})}
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);$('#liNote').innerHTML=noteHTML(STEPS[p]);setSt&&setSt(p);
  }
  const stop=playWire(rg,$('#liPlay'),draw,26000,'Replay','living');
  function wire(){const old=$('#liSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS,rg,draw,stop)}
  $$('[data-lity]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.lity;$$('[data-lity]').forEach(x=>x.setAttribute('aria-pressed',x===b));STEPS=steps();wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---------- diagnostic delay and lived experience ---------- */
  const ds=$('#liDelay');let view='delay',grow=1,stopG=null;
  const DELAY=[
    {l:'US registry, hEDS (Miami)',s:'4 y to first visit, ~10 y to diagnosis',v:10,seg:4,c:'<sup class="c" data-ref="Wang2024AJMG" title="Source 494">494</sup>'},
    {l:'Global Registry, hEDS',s:'n = 505, mean',v:10.39,c:'<sup class="c" data-ref="Halverson2023" title="Source 204">204</sup>'},
    {l:'UK survey, hEDS/HSD',s:'n = 2,002, mean 19.0–21.7',v:21.7,lo:19.0,c:'<sup class="c" data-ref="Berg2026" title="Source 41">41</sup>'},
    {l:'International survey, hEDS',s:'n = 3,360, self-report',v:22.1,c:'<sup class="c" data-ref="Daylor2025" title="Source 113">113</sup>'},
    {l:'International survey, HSD',s:'n = 546, self-report',v:17.5,c:'<sup class="c" data-ref="Daylor2025" title="Source 113">113</sup>'},
    {l:'Children, London clinic',s:'onset 6.2 y, diagnosis 9.0 y',v:2.8,c:'<sup class="c" data-ref="Adib2005" title="Source 4">4</sup>'}];
  const LIFE=[
    {l:'Rated diagnosis important',s:'US registry, hEDS',v:95.2,good:1},
    {l:'Diagnosis helped coping',s:'US registry, hEDS',v:81.9,good:1},
    {l:'Questioned own pain',s:'43 surveyed, EU + N America',v:73},
    {l:'Disrupted education',s:'UK, n = 2,002',v:55.9},
    {l:'Work or school affected',s:'n = 466, hypermobility type',v:53},
    {l:'Constant pain',s:'n = 466, hypermobility type',v:46},
    {l:'Unemployed',s:'UK, n = 2,002',v:45.6}];
  function drawD(){const rows=view==='delay'?DELAY:LIFE,n=rows.length;
    const N=vb(ds,`720 ${n*40+50}`,`400 ${n*62+50}`);const W=N?400:720;let s='';
    const lx=N?16:20,bx=N?16:300,bw=N?(W-32-56):(W-bx-90),mx=view==='delay'?25:100,X=v=>bx+bw*v/mx;
    const top=24,rh=N?62:40;
    (view==='delay'?[0,.2,.4,.6,.8,1]:[0,.25,.5,.75,1]).forEach(f=>{const xx=bx+bw*f;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${top-6}" y2="${top+n*rh}" class="${f?'grid':'axis'}"/><text x="${f1(xx)}" y="${top+n*rh+16}" class="t-xs t-mid">${Math.round(mx*f)}${view==='delay'?'':'%'}</text>`});
    s+=`<text x="${W-16}" y="${top+n*rh+32}" class="t-xs t-end">${view==='delay'?'years to diagnosis':'% of respondents'}</text>`;
    rows.forEach((r,i)=>{const y=top+i*rh,by=N?y+30:y+8,bh=N?16:18,g=ease(clamp(grow*1.3-i*.06));
      s+=`<text x="${lx}" y="${N?y+14:y+17}" class="t-lbl" style="font-size:12.5px">${r.l}</text><text x="${lx}" y="${N?y+26:y+30}" class="t-xs">${r.s}</text>`;
      const col=view==='delay'?(r.l.startsWith('Children')?'var(--muted)':'var(--brand)'):(r.good?'var(--accent)':'var(--brand)');
      if(r.seg&&view==='delay'){s+=`<rect x="${bx}" y="${by}" width="${f1(bw*r.seg/mx*g)}" height="${bh}" rx="3" style="fill:var(--brand-soft);stroke:var(--brand)"/>`;
        s+=`<rect x="${f1(X(r.seg*g))}" y="${by}" width="${f1(bw*(r.v-r.seg)/mx*g)}" height="${bh}" rx="3" style="fill:${col}"/>`}
      else s+=`<rect x="${bx}" y="${by}" width="${f1(bw*r.v/mx*g)}" height="${bh}" rx="3" style="fill:${col}"/>`;
      if(r.lo&&g>.98)s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.lo))}" y1="${by-3}" y2="${by+bh+3}" style="stroke:var(--on-brand);stroke-width:2"/>`;
      s+=`<text x="${f1(bx+bw*r.v/mx*g+6)}" y="${by+bh-4}" class="t-sm" style="fill:var(--ink)">${(r.lo?r.lo.toFixed(1)+'–':'')+(view==='delay'?(r.v%1?r.v.toFixed(r.v===10.39?2:1):r.v)+' y':r.v+'%')}</text>`});
    ds.innerHTML=s;
    $('#liDelayCap').innerHTML=view==='delay'?`Means or medians as each study reports them; the light first segment is the 4-year median gap to a first medical evaluation in the Miami registry. Surveys recruit volunteers and differ in method, so the bars are not directly comparable. <sup class="c" data-ref="Wang2024AJMG,Halverson2023,Berg2026,Daylor2025,Adib2005" title="Source 4,41,113,204,494">4,41,113,204,494</sup>`
      :`Percentages of each survey's respondents. Green bars show what people said a diagnosis gave them. <sup class="c" data-ref="Wang2024AJMG,Halverson2025,Berg2026,Murray2013" title="Source 41,205,322,494">41,205,322,494</sup>`}
  function regrow(){if(stopG)stopG();grow=0;stopG=animate(900,p=>{grow=p;drawD()},()=>{stopG=null})}
  $$('[data-lid]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.lid;$$('[data-lid]').forEach(x=>x.setAttribute('aria-pressed',x===b));regrow()}));
  drawD();
  {const pr=redraws.living;redraws.living=()=>{pr&&pr();drawD()}}

  /* ---------- conversation planner ---------- */
  const CP={
    school:[
      {t:'Handwriting and fine motor tasks',s:'Parents of children at a connective-tissue clinic most often reported difficulty keeping up with handwriting (71%) and gross motor activities (70%). GeneReviews lists occupational therapy for assistive devices such as wide-grip writing utensils. <sup class="c" data-ref="Wesley2021,Hakim2024GeneReviews" title="Source 199,504">199,504</sup>',tag:'Participation'},
      {t:'PE and sport by type',s:'hEDS: high-impact activity may raise the risk of subluxation or dislocation. cEDS: shin padding, and avoid sports with heavy joint strain. vEDS: avoid collision sports and heavy lifting, but keep up regular low-intensity exercise. <sup class="c" data-ref="Hakim2024GeneReviews,Malfait2024GeneReviews,Byers2025GeneReviews,Bowen2023vEDS" title="Source 58,68,199,293">58,68,199,293</sup>',tag:'By type'},
      {t:'Pain, fatigue and attendance',s:'Pain (73%) and fatigue (68%) were the symptoms parents most often said affected daily activities. In a London clinic, 41% of children with joint hypermobility syndrome had missed significant school time. <sup class="c" data-ref="Wesley2021,Adib2005" title="Source 4,504">4,504</sup>',tag:'Attendance'},
      {t:'A joint visit from the care team',s:'In the Bendy Study, a physiotherapist and an occupational therapist visited each child\'s school together to discuss mobility, handwriting, PE and attendance with teachers. <sup class="c" data-ref="Bale2019" title="Source 25">25</sup>',tag:'Example'},
      {t:'Toilet access',s:'In 89 children with joint hypermobility syndrome, pain, fatigue and stress-incontinence symptoms together explained 75% of the variance in child-reported quality of life. <sup class="c" data-ref="Pacey2015" title="Source 353">353</sup>',tag:'Quality of life'},
      {t:'Being believed',s:'An Australian general-practice review says diagnosis, ideally by adolescence, gives children and parents validation, and directs management toward the educational impact. <sup class="c" data-ref="Nicholson2022" title="Source 342">342</sup>',tag:'Validation'}],
    work:[
      {t:'What shapes work participation',s:'Interviews with people with hEDS found that work pressure, tasks and transport to work shape participation, and that work helped well-being when job demands matched ability. <sup class="c" data-ref="DeBaets2021" title="Source 114">114</sup>',tag:'Participation'},
      {t:'Workstation and equipment',s:'GeneReviews lists occupational therapy for home and work ergonomics and assistive devices in hEDS. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup>',tag:'Ergonomics'},
      {t:'Pacing and energy',s:'Occupational-therapy guidance for EDS with POTS covers energy conservation, pacing, routines and adaptive equipment. It is a descriptive paper; pacing alone has not been tested in a trial. <sup class="c" data-ref="Levine2022OT,Bennett2022" title="Source 40,264">40,264</sup>',tag:'Hypothesis'},
      {t:'Fatigue, not only pain',s:'In a meta-analysis of hypermobility-related disorders, disability correlated with fatigue (r = .91) and psychological distress (r = .86) more strongly than with pain (r = .64). <sup class="c" data-ref="Scheper2016" title="Source 414">414</sup>',tag:'Evidence'},
      {t:'Heavy lifting (vascular EDS)',s:'GeneReviews lists heavy lifting and weight training with extreme lifting among the trauma to avoid in vEDS. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>',tag:'vEDS'},
      {t:'Communication skills',s:'Patients and clinicians ranked occupational-therapy support "to maintain independence at work and home" among self-management priorities, with pacing, assertiveness and communication skills. <sup class="c" data-ref="Bennett2022" title="Source 40">40</sup>',tag:'Priorities'}],
    clinic:[
      {t:'The whole story',s:'In the Global Registry survey, people with hEDS had received an average of 10.45 other diagnoses over a mean 10.39 years before diagnosis. <sup class="c" data-ref="Halverson2023" title="Source 204">204</sup>',tag:'History'},
      {t:'Anxiety and mood',s:'A Consortium review describes a strong association between anxiety and hEDS and recommends integrated psychiatric and psychological care alongside physiotherapy. <sup class="c" data-ref="Bulbena2017" title="Source 62">62</sup>',tag:'Mental health'},
      {t:'Numbing that wears off',s:'In a randomised crossover trial, fewer people with EDS were numb at 30 minutes after lidocaine (53% vs 80%). Anaesthesia guidance advises recording any history of failed local anaesthesia. <sup class="c" data-ref="Bourne2026RAPM,Wiesmann2014" title="Source 54,505">54,505</sup>',tag:'Procedures'},
      {t:'Dizziness on standing',s:'POTS can usually be identified by recording heart rate and blood pressure lying down and during a 10-minute stand. See <a href="#autonomic" data-go="autonomic">POTS &amp; the autonomic link</a>. <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>',tag:'Autonomic'},
      {t:'Emergency card (vascular EDS)',s:'GeneReviews advises carrying documentation of the diagnosis, such as a MedicAlert bracelet, an emergency letter or a vEDS "passport", and seeking immediate care for sudden, unexplained pain. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>',tag:'vEDS'},
      {t:'Talking about uncertainty',s:'Clinicians may reinforce self-doubt without meaning to when they discuss diagnostic uncertainty; authors recommend "epistemic humility". In a US survey, the most wanted change was more hEDS/HSD knowledge among professionals. <sup class="c" data-ref="Halverson2025,Estrella2024" title="Source 145,205">145,205</sup>',tag:'Communication'}]};
  function drawCp(k){$('#liCp').innerHTML=CP[k].map(c=>`<div class="card"><span class="tag ${c.tag==='vEDS'?'vas':c.tag==='Hypothesis'?'warn':'brand'}">${c.tag}</span><h4>${c.t}</h4><p>${c.s}</p></div>`).join('')}
  $$('[data-licp]').forEach(b=>b.addEventListener('click',()=>{$$('[data-licp]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCp(b.dataset.licp)}));
  drawCp('school');
};
/* =============== 5.2 Pregnancy & parenthood =============== */
inits.pregnancy=()=>{
  const svg=$('#prSvg'),rg=$('#prT');
  let ty='h',plan=false;
  const W0=-6,W1=46,wk=t=>lerp(W0,W1,t),tOf=w=>(w-W0)/(W1-W0);

  /* risk rows: weeks a..b where each published risk concentrates (schematic), with its published figure */
  const ROWS={
    h:[{l:'Hyperemesis (survey)',a:5,b:16,v:'25.5% vs 3% population'},
       {l:'Pelvic pain, instability',a:14,b:40,v:'26% vs 7% (EDS, Dutch)'},
       {l:'Preterm birth, PROM',a:24,b:37,v:'survey ↑ · Swedish register no ↑'},
       {l:'Rapid labour ≤3 h',a:38.5,b:41,v:'28–36% (guidance review)'},
       {l:'Postpartum haemorrhage',a:40,b:42.5,v:'20.6% vs 6.4% (survey)'},
       {l:'Wounds, pelvic health',a:40,b:46,v:'plan with the team'}],
    c:[{l:'Fetal EDS: fragile membranes',a:22,b:37,v:'preterm 40% if baby affected'},
       {l:'Pelvic pain, instability',a:14,b:40,v:'26% vs 7% (EDS, Dutch)'},
       {l:'Skin and wound healing',a:39,b:43,v:'two-layer, tension-free closure'},
       {l:'Bleeding risk review',a:36,b:41,v:'classical EDS: consensus'},
       {l:'Postpartum haemorrhage',a:40,b:42.5,v:'19% vs 7% (EDS, Dutch)'},
       {l:'Newborn bruising',a:40,b:46,v:'EDS is on the differential'}],
    v:[{l:'Miscarriage',a:4,b:20,v:'13.8% review · 19% Dutch'},
       {l:'Preterm birth',a:24,b:37,v:'8.8% review · 19.1% Dutch'},
       {l:'Planned birth ~37 weeks',a:36.5,b:37.5,v:'caesarean suggested (review)'},
       {l:'Arterial dissection, rupture',a:36,b:46,v:'9.2% of deliveries'},
       {l:'Uterine rupture',a:37,b:41,v:'2.6% of deliveries'},
       {l:'Maternal death',a:38,b:46,v:'5.3%/delivery · 0/121 Dutch'}]};
  const PLAN={
    h:['Genetic counselling: 1 in 2 per child','No prenatal or embryo test for hEDS','Preconception review: joints, medicines','POTS: ≥2.5 L fluid daily antenatally','Mast cell disease: an action plan','Birth plan across four phases'],
    c:['Genetic counselling: 1 in 2 per child','Prenatal or embryo test: variant known','About half are new (de novo) variants','Plan wound closure for delivery','Bleeding-risk evaluation','The baby\u2019s EDS status matters'],
    v:['High-risk obstetric programme','Delivery plan stratified by variant','Prenatal or embryo test (PGD, UK HFEA)','"5% mortality risk with each pregnancy"','Shared decision-making','Emergency card or vEDS passport']};

  const NOTES={
   h:[
    {k:'Before pregnancy',t:'Planning with hEDS or HSD',
     txt:`GeneReviews advises that hEDS pregnancy planning cover preconception (musculoskeletal health, medicines), antenatal (joint instability, pelvic strength, hernias, pain), intrapartum (birth choices, mobility, anaesthesia) and postpartum issues (wound healing, pelvic health, newborn care). Prenatal and preimplantation testing are not possible for hEDS because no causal gene is known. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> A Consortium-facilitated guideline, built from a scoping review and expert co-creation, recommends at least 2.5 L of fluid daily antenatally for people with POTS and action plans with premedication or prehydration for mast cell disease, and notes "limited high quality evidence". <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup> Press <b>Planning view</b> for the list.`,
     pt:`Many people with hypermobile EDS have uncomplicated pregnancies, but tell your midwife early so they can plan. <sup class="c" data-ref="Karthikeyan2018,Pezaro2024" title="Source 241,367">241,367</sup>`,
     hook:`hEDS planning in four phases: preconception, antenatal, intrapartum, postpartum. No prenatal test exists for hEDS. <sup class="c" data-ref="Hakim2024GeneReviews,Pezaro2024" title="Source 199,367">199,367</sup>`},
    {k:'Weeks 0–13 · first trimester',t:'Early pregnancy',
     txt:`<span class="ev early">Early evidence</span> In an international survey of 947 women with hEDS or HSD, hyperemesis gravidarum was reported in 25.48% of pregnancies against a quoted population figure of 3%. Volunteers recruited online may over-represent complicated pregnancies. <sup class="c" data-ref="Pearce2023" title="Source 360">360</sup> In 386 French women with hEDS seen in an expert centre, spontaneous abortion (28%) and multiple spontaneous abortion (13%) were higher than in the general population. <sup class="c" data-ref="HugonRodin2016" title="Source 216">216</sup>`,
     pt:`Survey answers point to more severe sickness, but people with harder pregnancies are more likely to answer surveys.`,
     hook:`Survey (self-report): hyperemesis 25.48% vs 3%. Treat volunteer-survey rates as upper estimates. <sup class="c" data-ref="Pearce2023" title="Source 360">360</sup>`},
    {k:'Weeks 14–27 · second trimester',t:'Joints and the pelvis',
     txt:`In a Dutch patient-association study of 46 women with EDS (128 pregnancies beyond 24 weeks), pelvic pain and instability were more frequent than in unaffected mothers (26% vs 7%). <sup class="c" data-ref="Lind2002" title="Source 272">272</sup> In most women with hEDS, joint dislocation, pain, autonomic symptoms and POTS are the issues to plan for. <sup class="c" data-ref="Karthikeyan2018" title="Source 241">241</sup> Perinatal guidance advises careful positioning of the head and neck, shoulders, back, hips, knees and ankles with wedges, balls, pillows and bed adaptations, anticipating joint pain or dysfunction. <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>`,
     pt:`Pregnancy loosens the pelvis in everyone. With EDS, pelvic pain and unstable joints are more common, so supports and careful positions help.`,
     hook:`Dutch EDS study: pelvic pain and instability 26% vs 7% in unaffected mothers. <sup class="c" data-ref="Lind2002" title="Source 272">272</sup>`},
    {k:'Weeks 28–39 · third trimester',t:'Preterm birth: the data disagree',
     txt:`The international survey reported preterm birth in 15.45% of babies (quoted population 7.8%) and preterm rupture of membranes in 7.03% (under 3%). <sup class="c" data-ref="Pearce2023" title="Source 360">360</sup> The Swedish nationwide register found no increase in preterm birth (aOR 0.6, 95% CI 0.3–1.2) or preterm premature rupture of membranes (aOR 0.8). <sup class="c" data-ref="Sundelin2017" title="Source 454">454</sup> In the French expert-centre cohort, premature birth (6.2%) was similar to the general population. <sup class="c" data-ref="HugonRodin2016" title="Source 216">216</sup> US inpatient data (all EDS types) found raised odds of prematurity (OR 1.47) and cervical incompetence (OR 3.11). <sup class="c" data-ref="Spiegel2022" title="Source 446">446</sup>`,
     pt:`Some studies find more early births, others find none. The answer depends on who was studied and how.`,
     hook:`Register vs survey: Swedish register, no excess preterm birth; volunteer survey, 15.45%. <sup class="c" data-ref="Sundelin2017,Pearce2023" title="Source 360,454">360,454</sup>`},
    {k:'Around week 40 · labour and birth',t:'Birth',
     txt:`The perinatal guidance reports rapid or precipitous birth (≤3 hours) at 28–36%, prefers physiological vaginal birth where there is no obstetric contraindication, and reserves caesarean for obstetric indications. It states that "higher doses of local anesthesia may be needed" and that epidural is preferred over spinal anaesthesia in hEDS/HSD. <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup> In the Swedish register, induction of labour (aOR 2.6) and amniotomy (aOR 3.8) were more common among births to women with an EDS code. <sup class="c" data-ref="Sundelin2017" title="Source 454">454</sup>`,
     pt:`Labour can be fast. Numbing medicine may not work as well, so tell the team if you can still feel things. <sup class="c" data-ref="Pezaro2024,Bourne2026RAPM" title="Source 54,367">54,367</sup>`,
     hook:`hEDS/HSD birth: precipitous labour 28–36%; vaginal birth preferred without obstetric contraindication; epidural over spinal. <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>`},
    {k:'Weeks after birth',t:'After birth',
     txt:`The survey reported postpartum haemorrhage in 20.60% (quoted population 6.38%); the Dutch EDS study 19% against 7%. <sup class="c" data-ref="Pearce2023,Lind2002" title="Source 272,360">272,360</sup> The perinatal guidance recommends gentle handling of fragile tissues, longer-lasting absorbable sutures and tension-free interrupted closure; checking an infant's latch with a mirror rather than straining the head and neck; and documenting early bruising in infants, and its causes, "to avoid false accusations of maltreatment". <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup> GeneReviews lists wound healing, pelvic health and newborn care for the postpartum plan. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup>`,
     pt:`After the birth, bleeding, healing and sore joints need watching. Feeding positions can be adapted so the parent's neck is not strained.`,
     hook:`Document infant bruising and its causes, to avoid false accusations of maltreatment. <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>`}],
   c:[
    {k:'Before pregnancy',t:'Planning with classical EDS',
     txt:`Classical EDS is autosomal dominant: each child of an affected parent has a 50% chance of inheriting it. About half of people with cEDS have an affected parent and about half have a new (de novo) variant. Once the familial variant is known, prenatal and preimplantation testing are possible. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup> Large cohorts giving cEDS-specific obstetric rates are lacking; the best-supported point is the fetal-membrane effect described later. <sup class="c" data-ref="Lind2002,Almheiri2026" title="Source 7,272">7,272</sup>`,
     pt:`A parent with classical EDS has a 1 in 2 chance of passing it on in each pregnancy. A gene test can be done before or during pregnancy once the family's gene change is known.`,
     hook:`cEDS: autosomal dominant, about 50% de novo; prenatal and PGT possible once the familial variant is known. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`},
    {k:'Weeks 0–13 · first trimester',t:'Whose EDS matters?',
     txt:`A 2026 review found that the baby's EDS status predicted complications more strongly than the mother's. <sup class="c" data-ref="Almheiri2026" title="Source 7">7</sup> In classical EDS, aortic root dilatation and mitral valve prolapse occur but are rarely clinically significant. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`,
     pt:`If the baby has EDS, the membranes around it may be more fragile, whichever parent passed it on.`,
     hook:`Fetal EDS status predicts complications more strongly than maternal disease. <sup class="c" data-ref="Almheiri2026" title="Source 7">7</sup>`},
    {k:'Weeks 14–27 · second trimester',t:'Joints and the pelvis',
     txt:`In the Dutch patient-association study (46 women with EDS, mixed types), pelvic pain and instability affected 26% against 7% of unaffected mothers. <sup class="c" data-ref="Lind2002" title="Source 272">272</sup>`,
     pt:`Pelvic pain and loose joints are more common in pregnancy with EDS.`,
     hook:`Pelvic pain and instability: 26% vs 7%. <sup class="c" data-ref="Lind2002" title="Source 272">272</sup>`},
    {k:'Weeks 28–39 · third trimester',t:'Fragile membranes',
     txt:`In the Dutch study, preterm delivery occurred in 21% of affected mothers but in 40% of unaffected mothers carrying an affected infant, which points to the baby's EDS (fragile membranes) as a driver of prematurity. Premature rupture of membranes was strongly associated with fetal EDS in a 2026 review. <sup class="c" data-ref="Lind2002,Almheiri2026" title="Source 7,272">7,272</sup> A 2026 systematic review found EDS studies of spontaneous preterm birth too heterogeneous to pool; the evidence is weaker than for Marfan syndrome. <sup class="c" data-ref="Treacy2026" title="Source 467">467</sup>`,
     pt:`When the baby has EDS, the waters may break early. That can happen even when the mother does not have EDS.`,
     hook:`Preterm delivery 40% when an unaffected mother carried an affected baby, vs 21% in affected mothers. <sup class="c" data-ref="Lind2002" title="Source 272">272</sup>`},
    {k:'Around week 40 · labour and birth',t:'Skin, wounds and bleeding',
     txt:`GeneReviews (classical EDS) advises closing dermal wounds without tension, preferably in two layers, with generous deep stitches, cutaneous stitches left in place twice as long as usual, and adjacent skin carefully taped to prevent the scar stretching. It states that desmopressin "may be useful to normalize bleeding time". <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup> A 2026 anaesthesia Delphi panel recommends bleeding-risk evaluation, and considering desmopressin, in classical, classical-like, kyphoscoliotic and vascular EDS. <sup class="c" data-ref="Amaral2026" title="Source 8">8</sup>`,
     pt:`Skin in classical EDS tears and scars easily, so stitches are placed in layers and left in longer.`,
     hook:`cEDS sutures: two layers, no tension, skin stitches left twice as long as usual. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`},
    {k:'Weeks after birth',t:'After birth and the newborn',
     txt:`Postpartum haemorrhage was more frequent in the Dutch EDS study (19% vs 7%). <sup class="c" data-ref="Lind2002" title="Source 272">272</sup> EDS is on the differential for bruising in suspected child abuse, especially in types with marked skin and capillary involvement; careful examination of the child and extended family is routine. <span class="ev hyp">Hypothesis</span> EDS as an explanation for infant fractures remains speculative. <sup class="c" data-ref="Castori2015" title="Source 77">77</sup> Young children with fragile skin can wear pads or bandages over the forehead, knees and shins. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>`,
     pt:`Babies and toddlers with classical EDS bruise and cut easily. Padding the forehead, knees and shins protects them.`,
     hook:`EDS belongs on the bruising differential in suspected abuse; as an explanation for infant fractures it is unproven. <sup class="c" data-ref="Castori2015" title="Source 77">77</sup>`}],
   v:[
    {k:'Before pregnancy',t:'Planning with vascular EDS',
     txt:`GeneReviews states that affected women have "a 5% mortality risk with each pregnancy" and advises follow-up in a high-risk obstetric programme, with delivery decisions stratified by the genetic variant. Prenatal and preimplantation testing are possible once the familial COL3A1 variant is known. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> The UK Human Fertilisation and Embryology Authority has approved vEDS for pre-implantation genetic diagnosis; a published case describes PGD with surrogacy. <sup class="c" data-ref="Angwin2023H" title="Source 15">15</sup> A Dutch cohort proposes shared decision-making rather than discouraging all pregnancies. <sup class="c" data-ref="vandenBersselaar2026" title="Source 478">478</sup>`,
     pt:`Pregnancy with vascular EDS needs planning with a high-risk pregnancy team before and during pregnancy. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`,
     hook:`GeneReviews: vEDS carries "a 5% mortality risk with each pregnancy"; high-risk obstetric care; delivery planned by variant. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`},
    {k:'Weeks 0–13 · first trimester',t:'Early pregnancy',
     txt:`A systematic review (6 studies, 412 pregnancies) reported 30% infertility and 13.8% miscarriage. <sup class="c" data-ref="Haem2024" title="Source 195">195</sup> In a Dutch multicentre cohort of 121 pregnancies in 43 women with a COL3A1 variant, miscarriage was 19% (23/121), clustered in women with glycine substitutions (19 of 23). <sup class="c" data-ref="vandenBersselaar2026" title="Source 478">478</sup>`,
     pt:`Miscarriage is more common with vascular EDS, especially with some kinds of gene change.`,
     hook:`vEDS miscarriage: 13.8% (review), 19% (Dutch cohort, mostly glycine substitutions). <sup class="c" data-ref="Haem2024,vandenBersselaar2026" title="Source 195,478">195,478</sup>`},
    {k:'Weeks 14–27 · second trimester',t:'Watching and waiting',
     txt:`The international consensus recommends keeping blood pressure in the normal range and treating hypertension aggressively. <sup class="c" data-ref="Byers2017" title="Source 67">67</sup> People with vEDS are told to seek immediate medical attention for sudden, unexplained pain. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> In pedigree data, Kaplan–Meier survival did not differ between parous and nulliparous women with vEDS. <sup class="c" data-ref="Murray2014GenetMed" title="Source 323">323</sup>`,
     pt:`With vascular EDS, sudden, unexplained pain is an emergency: go to hospital and show your emergency card. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`,
     hook:`vEDS: parous and nulliparous women had similar survival in pedigree data. <sup class="c" data-ref="Murray2014GenetMed" title="Source 323">323</sup>`},
    {k:'Weeks 28–39 · third trimester',t:'Timing the birth',
     txt:`The review reported that 8.8% of live births were preterm and suggested scheduling caesarean birth at 37 weeks to avoid expulsive efforts; this is the authors' conclusion, not a trial result. <sup class="c" data-ref="Haem2024" title="Source 195">195</sup> In the UK national service, women diagnosed before delivery all had early planned caesarean birth under general anaesthesia in a tertiary hospital. <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup> <span class="ev early">Early evidence</span> In 41 children with vEDS, preterm birth was more common than in the US population (48.8% vs 12.2%) whether or not the mother was affected, which suggests the baby's own diagnosis confers the risk. <sup class="c" data-ref="Stephens2022" title="Source 450">450</sup>`,
     pt:`Teams often plan an early caesarean birth for vascular EDS, so the body does not have to push.`,
     hook:`vEDS review: caesarean at 37 weeks suggested to avoid expulsive efforts. <sup class="c" data-ref="Haem2024" title="Source 195">195</sup>`},
    {k:'Around week 40 · delivery',t:'Delivery: arteries and uterus',
     txt:`In interviews covering 76 deliveries, 46% were uncomplicated. Life-threatening complications occurred in 14.5%: arterial dissection or rupture 9.2%, uterine rupture 2.6% and surgical complications 2.6%. Third- or fourth-degree lacerations (20%) and preterm delivery (19%) were commonest. <sup class="c" data-ref="Murray2014GenetMed" title="Source 323">323</sup> Anaesthesia guidance recommends avoiding spinal or epidural anaesthesia in vEDS and discussing cross-matched blood, cell salvage and prophylactic desmopressin. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup> vEDS should be considered in a young person presenting with uterine rupture in pregnancy. <sup class="c" data-ref="Pepin2000" title="Source 363">363</sup>`,
     pt:`Around the birth, the main danger is a tear in an artery or the womb. Planned care in a specialist hospital is meant to lower that risk.`,
     hook:`vEDS deliveries (n = 76): life-threatening 14.5%, arterial 9.2%, uterine rupture 2.6%. <sup class="c" data-ref="Murray2014GenetMed" title="Source 323">323</sup>`},
    {k:'Weeks after birth',t:'After birth',
     txt:`Pregnancy-related deaths occurred in 30 of 565 deliveries (5.3%) by pedigree review, and in 5.7% per pregnancy in the systematic review. <sup class="c" data-ref="Murray2014GenetMed,Haem2024" title="Source 195,323">195,323</sup> The Dutch cohort, with genetic diagnosis, found no pregnancy-related deaths, arterial dissections or uterine ruptures in the perinatal period. <sup class="c" data-ref="vandenBersselaar2026" title="Source 478">478</sup> In the UK service, 5 of 104 pregnancies had life-threatening or fatal events, all before diagnosis. <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup> <span class="ev early">Early evidence</span> In mice, blocking oxytocin signalling after birth improved postpartum survival to about 90% in a vEDS model. <sup class="c" data-ref="Bowen2020JCI" title="Source 57">57</sup>`,
     pt:`The weeks after birth still carry risk. Newer studies of people diagnosed before pregnancy show far better outcomes than older ones.`,
     hook:`vEDS pregnancy deaths: 30/565 deliveries (5.3%) in older pedigrees; 0/121 in a Dutch cohort diagnosed by gene test. <sup class="c" data-ref="Murray2014GenetMed,vandenBersselaar2026" title="Source 323,478">323,478</sup>`}]};
  const AT=[[0,tOf(-3)],[tOf(0),tOf(8)],[tOf(14),tOf(21)],[tOf(28),tOf(34)],[tOf(38.5),tOf(40)],[tOf(41.2),tOf(44)]];
  const mk=()=>NOTES[ty].map((n,i)=>Object.assign({from:AT[i][0],at:AT[i][1]},n));
  let STEPS=mk(),setSt;

  /* side-view silhouette facing right; (x,y) top of head, s scale (1 ≈ 200 tall); B belly 0..1; pp postpartum 0..1 */
  function body(x,y,s,B,pp,hl){const P=(a,b)=>f1(x+a*s)+' '+f1(y+b*s);let g='';
    const by=B*(1-pp);
    g+=`<path d="M${P(-6,30)}L${P(-15,40)}Q${P(-18,80)} ${P(-15,108)}Q${P(-22,122)} ${P(-12,130)}L${P(-11,198)}L${P(-1,198)}L${P(0,140)}L${P(3,198)}L${P(13,198)}L${P(10,128)}C${P(12+64*by,124)} ${P(12+64*by,82)} ${P(12,78)}Q${P(20,60)} ${P(14,40)}L${P(6,30)}Z" style="fill:var(--brand-soft);stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round"/>`;
    g+=`<circle cx="${f1(x)}" cy="${f1(y+16*s)}" r="${f1(14*s)}" style="fill:var(--brand-soft);stroke:var(--ink);stroke-width:1.5"/>`;
    if(by>.05){const cx=x+(12+26*by)*s,cy=y+103*s;g+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1((5+17*by)*s)}" ry="${f1((5+15*by)*s)}" style="fill:var(--skin-derm);stroke:var(--skin-line);stroke-width:1"/><circle cx="${f1(cx+(4+6*by)*s)}" cy="${f1(cy-(2+6*by)*s)}" r="${f1((2+5*by)*s)}" style="fill:var(--skin-epi)"/>`;
      if(hl)g+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1((12+20*by)*s)}" ry="${f1((12+18*by)*s)}" style="fill:none;stroke:var(--vas);stroke-width:2;stroke-dasharray:5 3"/>`}
    if(pp>0){g+=`<path d="M${P(4,44)}L${P(16,80)}L${P(34,70)}" style="fill:none;stroke:var(--ink);stroke-width:${f1(5*s)};stroke-linecap:round;stroke-linejoin:round;opacity:${f1(pp)}"/><g style="opacity:${f1(pp)}"><ellipse cx="${f1(x+30*s)}" cy="${f1(y+64*s)}" rx="${f1(13*s)}" ry="${f1(8*s)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/><circle cx="${f1(x+40*s)}" cy="${f1(y+60*s)}" r="${f1(5*s)}" style="fill:var(--skin-epi);stroke:var(--skin-line)"/></g>`}
    else g+=`<path d="M${P(4,44)}Q${P(10,72)} ${P(8,100)}" style="fill:none;stroke:var(--ink);stroke-width:${f1(5*s)};stroke-linecap:round"/>`;
    return g}
  function pelvis(x,y,s,gap){/* two iliac wings and the pubic symphysis, which widens */
    let g='';[-1,1].forEach(sd=>{const o=sd*gap/2;g+=`<path d="M${f1(x+o)} ${f1(y+18*s)}Q${f1(x+o+sd*8*s)} ${f1(y+4*s)} ${f1(x+o+sd*30*s)} ${f1(y-10*s)}Q${f1(x+o+sd*40*s)} ${f1(y+6*s)} ${f1(x+o+sd*26*s)} ${f1(y+24*s)}Q${f1(x+o+sd*12*s)} ${f1(y+30*s)} ${f1(x+o)} ${f1(y+18*s)}Z" style="fill:var(--bone);stroke:var(--bone-line);stroke-width:1.3"/>`});
    g+=`<line x1="${f1(x-gap/2)}" x2="${f1(x+gap/2)}" y1="${f1(y+20*s)}" y2="${f1(y+20*s)}" style="stroke:var(--variant);stroke-width:2"/>`;return g}

  function draw(t){const N=vb(svg,'720 380','400 640');const W=N?400:720;let s='';const w=wk(t);
    const rows=ROWS[ty];
    const x0=N?16:236,x1=W-(N?16:20),X=v=>x0+(v-W0)/(W1-W0)*(x1-x0);
    const bandY=N?268:46,rowY=N?308:92,rh=N?53:36;
    /* silhouette + type-specific tissue */
    const B=ease(ramp(w,6,40)),pp=ramp(w,40.3,41.5),hl=ty==='v'&&w>35&&w<46;
    if(N){s+=body(64,28,.95,B,pp,hl)}else s+=body(96,36,1.18,B,pp,hl);
    const tx=N?150:28,tyy=N?150:300;
    if(ty==='h'){const gp=lerp(3,14,ease(ramp(w,12,40)))*(1-.6*ramp(w,42,46));s+=pelvis(tx+(N?60:76),tyy+(N?12:2),N?1.2:1.3,gp);s+=`<text x="${tx+(N?60:76)}" y="${tyy+(N?60:56)}" class="t-xs t-mid">pelvic joints loosen</text>`}
    if(ty==='c'){const sk=skin(tx+(N?6:6),tyy+(N?4:-4),N?118:150,{h:N?40:44,scar:ramp(w,39,42),bruise:ramp(w,40,43)*.6});s+=sk.svg;s+=`<text x="${tx+(N?65:81)}" y="${tyy+(N?58:56)}" class="t-xs t-mid">skin: fragile, slow to heal</text>`}
    if(ty==='v'){const tr=ramp(w,36,41)*(w<46?1:0);s+=artery(tx+(N?6:6),tyy+(N?20:12),N?118:150,{r:13,media:13,thin:true,flow:t*6,tear:tr});s+=`<text x="${tx+(N?65:81)}" y="${tyy+(N?58:56)}" class="t-xs t-mid" style="fill:${tr>.2?'var(--vas)':'var(--muted)'}">thin-walled artery</text>`}
    /* readout */
    const ph=w<0?'Before pregnancy':w<14?'First trimester':w<28?'Second trimester':w<39.5?'Third trimester':w<41.2?'Labour and birth':'After birth';
    const wl=w<0?'Planning':w<=40?'Week '+Math.max(0,Math.round(w)):(Math.round(w-40))+' wk after birth';
    if(N){s+=`<text x="${W-16}" y="44" class="t-big t-end" style="font-size:24px">${wl}</text><text x="${W-16}" y="64" class="t-sm t-end">${ph.toUpperCase()}</text><text x="${W-16}" y="84" class="t-xs t-end">${{h:'hEDS / HSD',c:'classical EDS',v:'vascular EDS'}[ty]}</text>`}
    else{s+=`<text x="${x0}" y="24" class="t-big" style="font-size:22px">${wl}</text><text x="${x0+150}" y="24" class="t-sm">${ph.toUpperCase()} · ${{h:'hEDS / HSD',c:'CLASSICAL EDS',v:'VASCULAR EDS'}[ty]}</text>`}
    /* trimester bands */
    [[W0,0,'Plan','var(--panel-2)'],[0,14,'1st','var(--brand-soft)'],[14,28,'2nd','var(--accent-soft)'],[28,40,'3rd','var(--brand-soft)'],[40,W1,'After','var(--gold-soft)']].forEach(([a,b,l,c])=>{
      s+=`<rect x="${f1(X(a)+1)}" y="${bandY}" width="${f1(X(b)-X(a)-2)}" height="22" rx="5" style="fill:${c}"/><text x="${f1((X(a)+X(b))/2)}" y="${bandY+15}" class="t-xs t-mid" style="fill:var(--ink)">${l}</text>`});
    [0,14,28,40].forEach(v=>s+=`<text x="${f1(X(v))}" y="${bandY-4}" class="t-xs t-mid">${v}</text>`);
    s+=`<path d="M${f1(X(40))} ${bandY-2}l-5 -7h10z" style="fill:var(--accent)"/>`;
    /* rows or planning list */
    if(plan){const L=PLAN[ty],on=1;s+=`<rect x="${x0}" y="${rowY-8}" width="${x1-x0}" height="${rows.length*rh+4}" rx="10" style="fill:var(--panel-2)"/>`;
      s+=`<text x="${x0+12}" y="${rowY+10}" class="t-sm">BEFORE PREGNANCY · AS PUBLISHED</text>`;
      L.forEach((it,i)=>{const yy=rowY+26+i*((rows.length*rh-30)/L.length),vis=on;
        s+=`<circle cx="${x0+20}" cy="${f1(yy-4)}" r="7" style="fill:var(--accent);opacity:${f1(vis)}"/><path d="M${x0+16.5} ${f1(yy-4)}l2.5 2.5l4.5 -5" style="fill:none;stroke:var(--on-brand);stroke-width:1.6"/><text x="${x0+34}" y="${f1(yy)}" class="t-lbl" style="font-size:12.5px">${it}</text>`})}
    else rows.forEach((r,i)=>{const y=rowY+i*rh,act=w>=r.a&&w<=r.b,past=w>r.b,seen=w>=r.a;
      const col=ty==='v'&&i>=3?'var(--vas)':'var(--brand)';
      s+=`<text x="${x0}" y="${y+11}" class="t-lbl" style="font-size:12.5px;opacity:${seen?1:.55}">${r.l}</text>`;
      if(seen)s+=`<text x="${N?x0:x1}" y="${N?y+40:y+11}" class="t-xs${N?'':' t-end'}" style="fill:${act?'var(--ink)':'var(--muted)'}">${r.v}</text>`;
      s+=`<rect x="${f1(x0)}" y="${y+17}" width="${f1(x1-x0)}" height="${N?7:9}" rx="4" style="fill:var(--panel-2)"/>`;
      const fe=Math.min(w,r.b);if(fe>r.a||r.b-r.a<1.5)s+=`<rect x="${f1(X(r.a))}" y="${y+17}" width="${f1(Math.max(4,X(Math.max(fe,r.a+1))-X(r.a)))}" height="${N?7:9}" rx="4" style="fill:${col};opacity:${act?1:past?.45:.18}"/>`;
      else s+=`<rect x="${f1(X(r.a))}" y="${y+17}" width="${f1(X(r.b)-X(r.a))}" height="${N?7:9}" rx="4" style="fill:none;stroke:${col};stroke-dasharray:3 3;opacity:.5"/>`});
    /* cursor */
    const cx=X(w);if(!plan)s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${bandY-2}" y2="${rowY+rows.length*rh-6}" style="stroke:var(--ink);stroke-width:1.4;opacity:.55"/><circle cx="${f1(cx)}" cy="${bandY+11}" r="4" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);$('#prNote').innerHTML=noteHTML(STEPS[p]);setSt&&setSt(p);
  }
  const stop=playWire(rg,$('#prPlay'),draw,24000,'Replay','pregnancy');
  function wire(){const old=$('#prSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS,rg,draw,stop)}
  $$('[data-prty]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.prty;$$('[data-prty]').forEach(x=>x.setAttribute('aria-pressed',x===b));STEPS=mk();wire();draw(+rg.value)}));
  $('#prPlan').addEventListener('click',()=>{plan=!plan;$('#prPlan').setAttribute('aria-pressed',plan);if(plan){stop();rg.value=STEPS[0].at}draw(+rg.value)});
  wire();draw(+rg.value);

  /* ---------- inheritance odds ---------- */
  const ps=$('#prPed');let mode='ad',hist=[],seed=7;let R=rng(seed);
  const MODE={
    ad:{fa:1,mo:0,pa:['V','v'],pm:['v','v'],kids:[1,1,0,0],pA:.5,pC:0,lab:'affected',
      note:{k:'Autosomal dominant',t:'1 in 2, every pregnancy',
       txt:`vEDS, cEDS and hEDS are autosomal dominant: each child of an affected parent has a 50% chance of inheriting the condition. <sup class="c" data-ref="Byers2025GeneReviews,Malfait2024GeneReviews,Hakim2024GeneReviews" title="Source 68,199,293">68,199,293</sup> The chance is the same in every pregnancy; earlier children do not change it. About half of people diagnosed with vEDS, and about half with cEDS, have a new (de novo) variant, so a negative family history does not exclude them. <sup class="c" data-ref="Byers2025GeneReviews,Malfait2024GeneReviews" title="Source 68,293">68,293</sup> Once the familial variant is known, prenatal and preimplantation testing are possible for vEDS and cEDS. <sup class="c" data-ref="Byers2025GeneReviews,Malfait2024GeneReviews" title="Source 68,293">68,293</sup>`,
       pt:`Most EDS types pass from parent to child. Each child has a 1 in 2 chance. <sup class="c" data-ref="Byers2025GeneReviews,Hakim2024GeneReviews" title="Source 68,199">68,199</sup>`,
       hook:`Around half of vEDS cases are de novo: a negative family history does not exclude vEDS. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`}},
    ar:{fa:.5,mo:.5,pa:['A','a'],pm:['A','a'],kids:[0,.5,.5,1],pA:.25,pC:.5,lab:'affected',
      note:{k:'Autosomal recessive',t:'1 in 4 when both parents carry',
       txt:`In the recessive types (kyphoscoliotic, classical-like, musculocontractural and others), when both parents carry one changed copy, each child has a 25% chance of being affected, 50% of being a carrier like the parents, and 25% of inheriting neither. <sup class="c" data-ref="RohrbachGR-kEDS,vanDijkGR-clEDS,KoshoGR-mcEDS" title="Source 250,390,481">250,390,481</sup> Carriers usually have no signs. See <a href="#genes" data-go="genes">Inheritance &amp; genetic testing</a> and <a href="#types" data-go="types">The 13 types</a>.`,
       pt:`In the rarer recessive types, both parents usually carry the gene change without being affected. Each child then has a 1 in 4 chance.`,
       hook:`Recessive: 25% affected, 50% carriers, 25% neither, per pregnancy. <sup class="c" data-ref="RohrbachGR-kEDS" title="Source 390">390</sup>`}},
    heds:{fa:1,mo:0,pa:['?','?'],pm:['?','?'],kids:[1,1,0,0],pA:.5,pC:0,lab:'affected',subtle:true,
      note:{k:'Hypermobile EDS',t:'A family history without a gene',
       txt:`hEDS is autosomal dominant and most people with it have an affected parent. Recognising that often needs a detailed history and examination of the parents, because the parent's signs may be subtle. No causal gene has been identified, so prenatal and preimplantation testing are not possible. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> <span class="ev early">Early evidence</span> Researchers are studying candidate genes such as KLK15; none is a diagnostic test. <sup class="c" data-ref="Gensemer2025KLK15" title="Source 178">178</sup> The diagram's question marks stand for the unknown gene.`,
       pt:`Scientists are looking for the gene or genes behind hypermobile EDS. There is no gene test for it yet. <sup class="c" data-ref="Hakim2024GeneReviews,Gensemer2025KLK15" title="Source 178,199">178,199</sup>`,
       hook:`No prenatal or preimplantation testing for hEDS: no causal gene is known. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup>`}}};
  function drawP(){const M=MODE[mode],N=vb(ps,'720 330','400 540');const W=N?400:720;let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    /* pedigree */
    const ox=N?200:180,py=N?50:58,ky=N?160:170,r=N?14:15;
    s+=ped(ox-60,py,'m',M.fa,{r})+ped(ox+60,py,'f',M.mo,{r});
    s+=`<path d="M${ox-60+r} ${py}H${ox+60-r}M${ox} ${py}V${py+42}M${ox-120} ${py+42}H${ox+120}" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`;
    s+=`<text x="${ox-60}" y="${py-r-8}" class="t-xs t-mid">${M.pa.join(' ')}</text><text x="${ox+60}" y="${py-r-8}" class="t-xs t-mid">${M.pm.join(' ')}</text>`;
    if(M.subtle)s+=`<text x="${ox-60-r-6}" y="${py+4}" class="t-xs t-end">signs may be subtle</text>`;
    M.kids.forEach((a,i)=>{const kx=ox-120+i*80;s+=`<path d="M${kx} ${py+42}V${ky-r}" style="stroke:var(--ink);stroke-width:1.5"/>`+ped(kx,ky,i%2?'f':'m',a,{r});
      s+=`<text x="${kx}" y="${ky+r+16}" class="t-xs t-mid">${a>=1?'affected':a>0?'carrier':'unaffected'}</text>`});
    s+=`<text x="${ox}" y="${ky+r+36}" class="t-sm t-mid" style="fill:var(--ink)">expected in each pregnancy: ${Math.round(M.pA*100)}% affected${M.pC?` · ${Math.round(M.pC*100)}% carriers`:''}</text>`;
    /* Punnett square */
    const qx=N?110:470,qy=N?262:44,cs=N?60:62;
    s+=`<text x="${qx+cs}" y="${qy-8}" class="t-sm t-mid">${mode==='heds'?'gene unknown':'one copy from each parent'}</text>`;
    for(let i=0;i<2;i++){s+=`<text x="${qx-12}" y="${qy+22+i*cs+cs/2}" class="t-lbl t-mid">${M.pa[i]}</text><text x="${qx+cs/2+i*cs}" y="${qy+14}" class="t-lbl t-mid">${M.pm[i]}</text>`;
      for(let j=0;j<2;j++){const al=M.pa[i]+M.pm[j],aff=mode==='ar'?(al==='aa'?1:al==='AA'?0:.5):(mode==='heds'?(i===0?1:0):(M.pa[i]==='V'?1:0));
        s+=`<rect x="${qx+j*cs}" y="${qy+22+i*cs}" width="${cs-4}" height="${cs-4}" rx="6" style="fill:${aff>=1?'var(--variant)':aff>0?'var(--gold-soft)':'var(--panel-2)'};opacity:${aff>=1?.85:1}"/><text x="${qx+j*cs+cs/2-2}" y="${qy+22+i*cs+cs/2+3}" class="t-lbl t-mid" style="fill:${aff>=1?'#fff':'var(--ink)'}">${mode==='heds'?(aff?'aff.':'—'):al}</text>`}}
    /* simulation */
    const sy=N?430:252,sx=N?16:30,sw=W-(N?32:60);
    const n=hist.length,a=hist.filter(v=>v===1).length,c=hist.filter(v=>v===.5).length;
    s+=`<text x="${sx}" y="${sy-8}" class="t-sm">SIMULATED PREGNANCIES · ${n}</text>`;
    const per=N?14:24,last=hist.slice(-per*(N?2:1));last.forEach((v,i)=>{const row=Math.floor(i/per),col=i%per;s+=ped(sx+10+col*(N?26:27),sy+12+row*26,(i%2?'f':'m'),v,{r:8})});
    const by=sy+(N?72:40);s+=`<rect x="${sx}" y="${by}" width="${sw}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    if(n){s+=`<rect x="${sx}" y="${by}" width="${f1(sw*a/n)}" height="14" rx="7" style="fill:var(--variant)"/>`;
      if(c)s+=`<rect x="${f1(sx+sw*a/n)}" y="${by}" width="${f1(sw*c/n)}" height="14" style="fill:var(--gold-soft);stroke:var(--warn);stroke-width:.6"/>`}
    const ex=sx+sw*M.pA;s+=`<line x1="${f1(ex)}" x2="${f1(ex)}" y1="${by-6}" y2="${by+20}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(ex)}" y="${by+32}" class="t-xs t-mid">expected ${Math.round(M.pA*100)}%</text>`;
    ps.innerHTML=s;
    $('#prTally').innerHTML=`<span>Pregnancies <b>${n}</b></span><span>Affected <b>${a}</b>${n?` (${Math.round(a/n*100)}%)`:''}</span>${mode==='ar'?`<span>Carriers <b>${c}</b>${n?` (${Math.round(c/n*100)}%)`:''}</span>`:''}<span>Each pregnancy is independent: small runs wander, long runs settle near ${Math.round(M.pA*100)}%.</span>`;
    $('#prPedNote').innerHTML=noteHTML(M.note)}
  function sim(k){const M=MODE[mode];for(let i=0;i<k;i++){const u=R();hist.push(u<M.pA?1:u<M.pA+M.pC?.5:0)}drawP()}
  $('#prSim').addEventListener('click',()=>sim(1));$('#prSim20').addEventListener('click',()=>sim(20));
  $('#prReset').addEventListener('click',()=>{hist=[];R=rng(++seed);drawP()});
  $$('[data-prih]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.prih;$$('[data-prih]').forEach(x=>x.setAttribute('aria-pressed',x===b));hist=[];R=rng(++seed);drawP()}));
  drawP();
  {const pr=redraws.pregnancy;redraws.pregnancy=()=>{pr&&pr();drawP()}}
};
/* =============== 5.3 Nursing care =============== */
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');
  let ty='h';
  const ST=['Admission','Observations','Moving','Procedures','Deterioration','Discharge'];
  const n6=6;

  /* nursing points per station: [hEDS/HSD, vEDS] */
  const PTS=[
    [[{a:'Confirm the type',b:'precautions differ by type'},{a:'Ask about failed numbing',b:'record it before procedures'},{a:'Validate, then assess pain',b:'compassionate communication'},{a:'Ask about past dislocations',b:'common, even minimal trauma'}],
     [{a:'Ask for the emergency card',b:'vEDS passport, MedicAlert'},{a:'Confirm the type',b:'COL3A1: vascular precautions'},{a:'Ask about failed numbing',b:'record it before procedures'},{a:'Note usual blood pressure',b:'consensus: keep it normal'}]],
    [[{a:'Repeated cuff inflations',b:'can cause bruising, haematoma'},{a:'Lying and standing obs',b:'HR, BP over a 10-min stand'},{a:'Orthostatic intolerance',b:'74% vs 34% (small study)'},{a:'Record bruises found',b:'and their likely cause'}],
     [{a:'Repeated cuff inflations',b:'can cause bruising, haematoma'},{a:'Keep BP in normal range',b:'consensus target'},{a:'Avoid invasive BP lines',b:'in non-emergency surgery'},{a:'Thin, translucent skin',b:'bruises easily'}]],
    [[{a:'Position with care',b:'to avoid joint dislocation'},{a:'Pad pressure points',b:'less shear; protect the eyes'},{a:'Wedges, pillows, supports',b:'anticipate joint pain'},{a:'Jaw care with face masks',b:'the TMJ can dislocate'}],
     [{a:'Position with care',b:'to avoid joint dislocation'},{a:'Pad pressure points',b:'less shear; protect the eyes'},{a:'Gentle handling',b:'fragile vessels and skin'},{a:'Tourniquets in limb surgery',b:'severe bleeds reported'}]],
    [[{a:'Tape: easy-release or none',b:'adhesives can damage skin'},{a:'Numbing may wear off sooner',b:'53% vs 80% numb at 30 min'},{a:'Ultrasound for lines',b:'fewer repeated punctures'},{a:'Close wounds without tension',b:'longer-lasting sutures'}],
     [{a:'Tape: easy-release or none',b:'adhesives can damage skin'},{a:'Avoid arterial puncture',b:'and central lines if possible'},{a:'If a central line is needed',b:'ultrasound is "mandatory"'},{a:'Arteriography discouraged',b:'only for life-threatening bleed'}]],
    [[{a:'Dislocation or new pain',b:'assess; escalate per policy'},{a:'Validated pain tools',b:'children: parent proxy works'},{a:'Dizzy on standing?',b:'consider an active stand'},{a:'No EDS first-aid protocol',b:'none in validated sources'}],
     [{a:'Sudden unexplained pain',b:'treat as an emergency'},{a:'Escalate immediately',b:'per local policy'},{a:'Harm-avoidant care',b:'no elective scope or surgery'},{a:'Bowel perforation, young',b:'should prompt vEDS testing'}]],
    [[{a:'Numbing may fail',b:'tell the dentist or nurse'},{a:'Physical treatments',b:'must not cause subluxation'},{a:'Physio exercise advice',b:'linked to more exercise'},{a:'Mental-health support',b:'integrated care advised'}],
     [{a:'Carry the emergency card',b:'MedicAlert, vEDS passport'},{a:'Sudden pain: seek care now',b:'show the card'},{a:'No collision sport, lifting',b:'gentle exercise still good'},{a:'Vascular imaging',b:'"annual basis", if feasible'}]]];

  const NOTE=[
    [{k:'Station 1 · admission',t:'Admission: know the type',
      txt:`Surgical and anaesthetic risk differs by EDS type, so vEDS fragility precautions are not applied to every type by default; a 2026 Delphi panel gives type-specific advice and comprehensive airway assessment for all types. <sup class="c" data-ref="Amaral2026" title="Source 8">8</sup> Anaesthesia guidance advises recording any history of failed local anaesthesia, for example during dental work. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup> In hEDS, subluxations and dislocations are common and may occur spontaneously or with minimal trauma. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> Perinatal guidance calls for "compassionate communication validating hEDS/HSD experiences". <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>`,
      pt:`The first questions are which type of EDS, what has gone wrong in hospital before, and how the person usually manages.`,
      hook:`Precautions are type-specific: do not treat every EDS patient as vascular, and do not miss the one who is. <sup class="c" data-ref="Amaral2026" title="Source 8">8</sup>`},
     {k:'Station 1 · admission',t:'Admission: the emergency card',
      txt:`GeneReviews says people with vEDS should carry documentation of the diagnosis, such as a MedicAlert® bracelet or necklace, an emergency contact letter or a vEDS "passport". <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> In the UK national service every patient receives an emergency information card to show any clinician. <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup> The consensus recommends confirming the COL3A1 variant before applying the diagnosis, and keeping blood pressure in the normal range. <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>`,
      pt:`People with vascular EDS often carry a card that explains their condition. Ask to see it.`,
      hook:`vEDS: carry a MedicAlert, emergency letter or vEDS "passport". <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`}],
    [{k:'Station 2 · observations',t:'Observations: cuffs and standing',
      txt:`Repeated non-invasive blood-pressure cuff inflations can cause bruising and haematoma. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup> POTS can usually be identified by recording heart rate and blood pressure while lying and during a 10-minute stand; see the chart below. <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup> In 39 women with EDS hypermobility type, orthostatic intolerance was more common than in controls (74% vs 34%), most often as postural tachycardia. <sup class="c" data-ref="DeWandele2014Mech" title="Source 123">123</sup>`,
      pt:`Blood-pressure cuffs can bruise fragile skin when they pump up again and again.`,
      hook:`POTS heart-rate criterion: rise ≥30/min within 10 minutes standing (≥40 at 12–19), no sustained systolic fall ≥20 mmHg. <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>`},
     {k:'Station 2 · observations',t:'Observations: blood pressure in vEDS',
      txt:`The consensus says to "maintain blood pressure in the normal range and treat hypertension aggressively". <sup class="c" data-ref="Byers2017" title="Source 67">67</sup> Anaesthesia guidance recommends avoiding invasive blood-pressure monitoring in non-emergency surgery in vEDS, and notes that repeated cuff inflations can bruise. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup> vEDS is marked by thin, translucent skin and easy bruising. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`,
      pt:`Keeping blood pressure normal is part of protecting the arteries in vascular EDS.`,
      hook:`vEDS: keep blood pressure in the normal range; treat hypertension aggressively. <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>`}],
    [{k:'Station 3 · moving and positioning',t:'Moving the patient',
      txt:`Anaesthesia guidance advises padding to reduce shear and pressure, and careful positioning and mobilisation to avoid joint dislocation; careless positioning risks brachial plexus injury and visual loss from pressure on the eye. Care is needed during mask ventilation to avoid dislocating the temporomandibular joint. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup> Perinatal guidance advises positioning the head and neck, shoulders, back, hips, knees and ankles with wedges, balls, pillows and bed adaptations. <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup> GeneReviews warns that physical treatments must avoid causing subluxations or dislocations. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup>`,
      pt:`Joints can slip out with little force. Support the limbs, pad the pressure points and move slowly.`,
      hook:`Positioning in EDS: pad against shear, protect eyes and brachial plexus, mind the jaw with masks. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`},
     {k:'Station 3 · moving and positioning',t:'Moving a patient with vEDS',
      txt:`The same positioning and padding advice applies. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup> The authors also report anecdotal knowledge of severe and lethal complications from tourniquets in minor limb surgery in vEDS, including massive compartment bleeding and haemorrhagic shock. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup> One case report describes intramuscular haematomas during passive hamstring stretching in a man with vEDS; there are no established vEDS rehabilitation guidelines. <sup class="c" data-ref="Izumi2025" title="Source 220">220</sup> No validated source gives rules for tourniquets used for blood tests.`,
      pt:`In vascular EDS, squeezing and stretching can bleed into muscles. Handle gently and follow the team's plan.`,
      hook:`vEDS: tourniquet complications in limb surgery are reported anecdotally, including compartment bleeding. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>`}],
    [{k:'Station 4 · procedures and skin',t:'Cannulas, tape and numbing',
      txt:`Adhesive tapes and dressings should be easy to remove, or avoided, because of the risk of severe skin damage. Ultrasound may reduce repeated vascular punctures. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup> In a randomised crossover trial (91 people with EDS, 44 healthy), subcutaneous lidocaine numbed both groups similarly at 5 minutes, but fewer people with EDS were numb at 15 minutes (60% vs 84%) and 30 minutes (53% vs 80%). <sup class="c" data-ref="Bourne2026RAPM" title="Source 54">54</sup> Perinatal guidance recommends gentle handling of fragile tissues, longer-lasting absorbable sutures and tension-free interrupted closure. <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>`,
      pt:`Numbing injections may wear off sooner in EDS. Tell the nurse or dentist if you can still feel things. <sup class="c" data-ref="Bourne2026RAPM" title="Source 54">54</sup>`,
      hook:`Lidocaine in EDS: same at 5 min, then 53% vs 80% numb at 30 min, suggesting a shorter effect. <sup class="c" data-ref="Bourne2026RAPM" title="Source 54">54</sup>`},
     {k:'Station 4 · procedures and skin',t:'Lines and scans in vEDS',
      txt:`Anaesthesia guidance recommends avoiding central venous access and arterial puncture whenever possible in fragile-vessel subtypes; if a central line is needed, ultrasound guidance is "mandatory", including seeing the wire inside the vessel. Tapes should be easy to remove or avoided. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup> GeneReviews advises that "arteriography should be discouraged and used only to identify life-threatening sources of bleeding prior to surgical intervention because of the risk of vascular injury". <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`,
      pt:`In vascular EDS, needles into arteries and big veins are avoided unless they are truly needed.`,
      hook:`vEDS: arteriography only to find life-threatening bleeding before surgery. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`}],
    [{k:'Station 5 · deterioration',t:'New pain or a dislocation',
      txt:`Subluxations and dislocations are common in hEDS, and repeated injury can lead to degenerative joint and chronic soft-tissue disorders. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> Validated tools used in EDS research include the Multidimensional Pain Inventory and Sickness Impact Profile in adults, and the PedsQL 4.0 and Pediatric Pain Questionnaire in children, where parent and child reports correlated strongly (r = 0.6–0.84). <sup class="c" data-ref="Rombaut2011,Pacey2015" title="Source 353,393">353,393</sup> The research behind this guide found no validated EDS-specific dislocation first-aid protocol: assess, and escalate according to local policy.`,
      pt:`If a joint slips out or new pain starts, the nurse assesses it and calls the right team, as in any patient.`,
      hook:`Child pain in hypermobility: parent report is a reasonable proxy (r = 0.6–0.84). <sup class="c" data-ref="Pacey2015" title="Source 353">353</sup>`},
     {k:'Station 5 · deterioration',t:'Sudden pain in vEDS: an emergency',
      txt:`Arterial dissection or rupture, bowel perforation or organ rupture are the presenting signs in most adults with vEDS, and people are "instructed to seek immediate medical attention for sudden, unexplained pain". <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> The UK service notes that "fragile connective tissues make invasive procedures potentially dangerous, particularly in an emergency setting", and that spontaneous bowel perforation should prompt vEDS testing. <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup> A 2026 review calls emergency care "harm-avoidant": avoid catheter angiography, elective endoscopy and unnecessary surgery. <sup class="c" data-ref="Corrao2026" title="Source 106">106</sup> Escalate immediately, per local policy.`,
      pt:`With vascular EDS, sudden, unexplained pain is an emergency: go to hospital and show your emergency card. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`,
      hook:`Spontaneous bowel perforation in a young person should prompt vEDS genetic testing. <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup>`}],
    [{k:'Station 6 · discharge teaching',t:'Teaching for home',
      txt:`GeneReviews says chiropractic adjustment and yoga are "not contraindicated" if done in ways that avoid causing subluxations. <sup class="c" data-ref="Hakim2024GeneReviews" title="Source 199">199</sup> People who had exercise advice from a physiotherapist were more likely to report high weekly exercise (OR 1.75). <sup class="c" data-ref="Simmonds2019" title="Source 433">433</sup> A Consortium review recommends integrated psychiatric and psychological care alongside physiotherapy. <sup class="c" data-ref="Bulbena2017" title="Source 62">62</sup> In a dental survey, 88% of people with EDS recalled inadequate local anaesthesia, against 33% without EDS; this is a recall survey. <sup class="c" data-ref="Schubart2019LA" title="Source 419">419</sup>`,
      pt:`Before going home: how to move safely, what to tell the dentist about numbing, and where to get support.`,
      hook:`Dental survey: 88% of people with EDS recalled inadequate local anaesthesia vs 33% without. <sup class="c" data-ref="Schubart2019LA" title="Source 419">419</sup>`},
     {k:'Station 6 · discharge teaching',t:'Teaching for home with vEDS',
      txt:`Carry documentation of the diagnosis and seek immediate care for sudden, unexplained pain. Avoid collision sports, heavy lifting and weight training with extreme lifting. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup> The consensus recommends vascular surveillance with Doppler ultrasound, CTA or MRA "if feasible on an annual basis". <sup class="c" data-ref="Byers2017" title="Source 67">67</sup> The UK service advises that "regular, low-intensity exercise should be maintained for health and psychological wellbeing". <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup> First-degree relatives can be offered testing for the familial variant. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`,
      pt:`People with vascular EDS should avoid collision sports and heavy lifting, but regular gentle exercise is good for the body and mind. <sup class="c" data-ref="Byers2025GeneReviews,Bowen2023vEDS" title="Source 58,68">58,68</sup>`,
      hook:`vEDS teaching: emergency card, urgent care for sudden pain, no collision sport or heavy lifting. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>`}]];
  const mk=()=>NOTE.map((n,i)=>Object.assign({from:i/n6,at:(i+.5)/n6},n[ty==='v'?1:0]));
  let STEPS=mk(),setSt;

  /* ---------- station icons ---------- */
  function ico(i,x,y,on){const c=on?'var(--on-brand)':'var(--muted)',st=`style="fill:none;stroke:${c};stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round"`;
    const P=(a,b)=>f1(x+a)+' '+f1(y+b);
    return [`<rect x="${x-5}" y="${y-7}" width="10" height="13" rx="1.5" ${st}/><path d="M${P(-2.5,-2)}H${P(2.5,-2).split(' ')[0]}M${P(-2.5,1.5)}H${P(2.5,1.5).split(' ')[0]}" ${st}/>`,
      `<path d="M${P(-7,0)}H${P(-3,0).split(' ')[0]}L${P(-1,-5)}L${P(1,5)}L${P(3,0)}H${P(7,0).split(' ')[0]}" ${st}/>`,
      `<path d="M${P(-7,5)}H${P(7,5).split(' ')[0]}M${P(-7,5)}V${P(-7,-3).split(' ')[1]}M${P(-4,1)}H${P(6,1).split(' ')[0]}" ${st}/><circle cx="${x-3}" cy="${y-2}" r="2" style="fill:${c}"/>`,
      `<path d="M${P(-6,6)}L${P(4,-4)}M${P(2,-6)}L${P(6,-2)}M${P(-6,6)}L${P(-8,8)}" ${st}/>`,
      `<path d="M${P(0,-7)}L${P(7,6)}H${P(-7,6).split(' ')[0]}Z" ${st}/><path d="M${P(0,-2)}V${P(0,2).split(' ')[1]}" ${st}/>`,
      `<path d="M${P(-6,7)}V${P(-6,-2).split(' ')[1]}L${P(0,-7)}L${P(6,-2)}V${P(6,7).split(' ')[1]}Z" ${st}/>`][i]}
  function pts(L,u,x,y,w,h,gap){let g='';L.forEach((c,j)=>{const v=ramp(u,.08+j*.13,.2+j*.13);if(v<=0)return;const yy=y+j*(h+gap);
    g+=`<g style="opacity:${f1(clamp(v*1.5))}"><rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="9" style="fill:var(--panel);stroke:var(--line)"/><circle cx="${x+18}" cy="${f1(yy+h/2)}" r="9" style="fill:${ty==='v'&&/emergency|Escalate|unexplained/i.test(c.a)?'var(--vas)':'var(--accent)'}"/><path d="M${x+14} ${f1(yy+h/2)}l3 3l5 -6" style="fill:none;stroke:var(--on-brand);stroke-width:1.8"/><text x="${x+34}" y="${f1(yy+h/2-3)}" class="t-lbl" style="font-size:12.5px">${c.a}</text><text x="${x+34}" y="${f1(yy+h/2+11)}" class="t-xs">${c.b}</text></g>`});return g}

  /* ---------- vignettes ---------- */
  function vig(i,u,x,y,w,h){let g=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel-2)"/>`;const cx=x+w/2,cy=y+h/2;
    if(i===0){/* clipboard, ticking */
      const items=ty==='v'?['Emergency card seen','Type: vascular (COL3A1)','Failed local anaesthesia?','Usual blood pressure']:['Type: hEDS / HSD','Failed local anaesthesia?','Past dislocations','Pain: usual supports'];
      const bx=x+w*.12,bw=w*.76,by=y+28,bh=h-44;
      g+=`<rect x="${f1(bx)}" y="${by}" width="${f1(bw)}" height="${bh}" rx="8" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(cx-28)}" y="${by-8}" width="56" height="16" rx="4" style="fill:var(--bone-line)"/>`;
      g+=`<text x="${f1(bx+16)}" y="${by+30}" class="t-sm">ADMISSION CHECKS</text>`;
      items.forEach((it,j)=>{const yy=by+56+j*((bh-70)/4),d=ramp(u,.1+j*.18,.22+j*.18);
        g+=`<rect x="${f1(bx+16)}" y="${f1(yy-12)}" width="16" height="16" rx="3" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`;
        if(d>0)g+=`<path d="M${f1(bx+19)} ${f1(yy-4)}l4 4l${f1(7*d)} ${f1(-9*d)}" style="fill:none;stroke:${ty==='v'&&j===0?'var(--vas)':'var(--accent)'};stroke-width:2.4;stroke-linecap:round"/>`;
        g+=`<text x="${f1(bx+42)}" y="${f1(yy+1)}" class="t-lbl" style="font-size:13px">${it}</text>`})}
    if(i===1){/* arm with cuff: inflations bruise */
      const ax=x+w*.18,ay=cy+10,L=w*.34;const lb=limb(ax+L,ay,L,8,{len2:L*.9,w:26,arc:false});g+=lb.svg;
      const n=Math.min(6,Math.floor(u*7)),pr=(u*7)%1,inf=n<6?bump(pr,0,1):0;
      const cuffDraw=g;g='';
      for(let k=0;k<n;k++){const sd=k%2?1:-1,bxx=ax+L*.45+sd*(L*.3+(k>>1)*7),byy=ay+((k*7)%9)-4;g+=`<ellipse cx="${f1(bxx)}" cy="${f1(byy)}" rx="${f1(6+k*.8)}" ry="${f1(5+k*.3)}" style="fill:var(--nerve);opacity:${f1(.25+k*.08)}"/>`}
      g=cuffDraw+g;
      g+=`<rect x="${f1(ax+L*.2)}" y="${f1(ay-17-inf*4)}" width="${f1(L*.5)}" height="${f1(34+inf*8)}" rx="6" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:1.6;opacity:.9"/>`;
      g+=`<path d="M${f1(ax+L*.45)} ${f1(ay-17-inf*4)}Q${f1(ax+L*.6)} ${f1(y+30)} ${f1(x+w*.72)} ${f1(y+44)}" style="fill:none;stroke:var(--dx);stroke-width:1.6"/>`;
      const mx=x+w*.62,my=y+30,mw=w*.32;g+=`<rect x="${f1(mx)}" y="${my}" width="${f1(mw)}" height="70" rx="8" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`;
      g+=pulse(mx+8,my+52,mw-16,18,{bpm:ty==='v'?72:96,secs:4,phase:u*8});
      g+=`<text x="${f1(mx+10)}" y="${my+20}" class="t-sm" style="fill:var(--ink)">INFLATIONS ${n}</text>`;
      g+=`<text x="${f1(cx)}" y="${y+h-16}" class="t-xs t-mid">${n?'each repeat inflation can add bruising':'cuff on the upper arm'}</text>`}
    if(i===2){/* joint slips under traction, then supported */
      const sl=bump(u,.08,.55)*.55,sup=ease(ramp(u,.5,.85));
      g+=joint(cx-w*.12,cy-14,h/250,{ang:sl*18,slip:sl,lax:.75,hl:sl>.2});
      if(sl>.08)g+=`<text x="${f1(cx-w*.12)}" y="${y+22}" class="t-xs t-mid" style="fill:var(--variant)">pulled or poorly positioned: the joint slips</text>`;
      const jx=cx-w*.12;[-1,1].forEach(sd=>{const px=jx+sd*(46+60*(1-sup));g+=`<rect x="${f1(px-(sd<0?34:0))}" y="${f1(cy-30)}" width="34" height="96" rx="15" style="fill:var(--gold-soft);stroke:var(--warn);stroke-width:1.3;opacity:${f1(sup)}"/>`});
      if(sup>.2)g+=`<text x="${f1(x+w*.82)}" y="${f1(cy)}" class="t-lbl t-mid" style="font-size:13px;opacity:${f1(sup)}">pillows, padding</text><text x="${f1(x+w*.82)}" y="${f1(cy+16)}" class="t-xs t-mid" style="opacity:${f1(sup)}">limb supported</text>`}
    if(i===3){/* tape peeling skin + lidocaine bars */
      const sw=w*.5,pl=bump(u,.05,.5),sk=skin(x+14,y+h*.42,sw,{h:h*.48,pull:pl*.8,max:h*.22,fibres:true});g+=sk.svg;
      const tx=x+14+sw/2;g+=`<rect x="${f1(tx-36)}" y="${f1(sk.top-9)}" width="72" height="10" rx="3" style="fill:var(--gold);opacity:.9" transform="rotate(${f1(-pl*28)} ${f1(tx+36)} ${f1(sk.top)})"/>`;
      g+=`<text x="${f1(x+14+sw/2)}" y="${y+38}" class="t-xs t-mid">${pl>.2?'tape lifts the top layer':'adhesive tape on fragile skin'}</text>`;
      const bx=x+w*.6,bw=w*.36,b0=y+h-28,bh=h-90,lu=ramp(u,.45,.95);
      g+=`<text x="${f1(bx)}" y="${y+38}" class="t-xs">NUMB AFTER LIDOCAINE</text>`;
      [[5,null,null],[15,60,84],[30,53,80]].forEach(([m,e,c],k)=>{const gx=bx+k*bw/3+4,vis=ramp(lu,k*.3,k*.3+.3),bwid=bw/3*.4;
        if(e==null){g+=`<text x="${f1(gx+bwid)}" y="${f1(b0-bh*.5)}" class="t-xs t-mid" style="opacity:${f1(vis)}">same</text>`}
        else{g+=`<rect x="${f1(gx)}" y="${f1(b0-bh*e/100*vis)}" width="${f1(bwid)}" height="${f1(bh*e/100*vis)}" style="fill:var(--variant)"/><rect x="${f1(gx+bwid+2)}" y="${f1(b0-bh*c/100*vis)}" width="${f1(bwid)}" height="${f1(bh*c/100*vis)}" style="fill:var(--muted)"/>`;
          if(vis>.9)g+=`<text x="${f1(gx+bwid/2)}" y="${f1(b0-bh*e/100-4)}" class="t-xs t-mid" style="fill:var(--variant)">${e}</text><text x="${f1(gx+bwid*1.5+2)}" y="${f1(b0-bh*c/100-4)}" class="t-xs t-mid">${c}</text>`}
        g+=`<text x="${f1(gx+bwid)}" y="${b0+13}" class="t-xs t-mid">${m} min</text>`});
      g+=`<line x1="${f1(bx)}" x2="${f1(bx+bw)}" y1="${b0}" y2="${b0}" class="axis"/><text x="${f1(bx)}" y="${y+50}" class="t-xs"><tspan style="fill:var(--variant)">■ EDS</tspan> ■ controls, %</text>`}
    if(i===4){if(ty==='v'){/* artery tear + alarm */
        const tr=ramp(u,.1,.55),rp=ramp(u,.5,.85);g+=artery(x+20,cy+10,w-40,{r:26,media:16,thin:true,flow:u*5,tear:tr,rupture:rp});
        const al=rp>0?(Math.sin(u*60)>0?1:.4):0;
        g+=`<text x="${f1(cx)}" y="${y+30}" class="t-lbl t-mid" style="fill:var(--vas);opacity:${f1(.4+tr*.6)}">sudden, unexplained pain</text>`;
        g+=`<g style="opacity:${f1(al)}"><circle cx="${f1(x+w-34)}" cy="${y+28}" r="14" style="fill:var(--vas)"/><text x="${f1(x+w-34)}" y="${y+33}" class="t-lbl t-mid" style="fill:#fff">!</text><text x="${f1(cx)}" y="${y+h-14}" class="t-sm t-mid" style="fill:var(--vas)">ESCALATE NOW · LOCAL POLICY</text></g>`}
      else{const sl=ease(ramp(u,.1,.5));g+=joint(x+w*.32,cy-14,h/250,{slip:sl,ang:sl*22,lax:.9,hl:true});
        const px=x+w*.64,pw=w*.3,lvl=Math.round(lerp(2,8,ramp(u,.1,.55))*(1-.4*ramp(u,.7,1)));
        g+=`<text x="${f1(px)}" y="${y+40}" class="t-xs">PAIN 0–10 (example)</text>`;for(let k=0;k<=10;k++){g+=`<rect x="${f1(px+k*pw/11)}" y="${y+50}" width="${f1(pw/11-2)}" height="18" rx="2" style="fill:${k<=lvl?(k>6?'var(--bad)':k>3?'var(--warn)':'var(--good)'):'var(--panel)'};stroke:var(--line)"/>`}
        g+=`<text x="${f1(px+pw/2)}" y="${y+92}" class="t-big t-mid" style="font-size:26px">${lvl}</text>`;
        g+=`<text x="${f1(px+pw/2)}" y="${y+h-40}" class="t-xs t-mid">assess · believe · escalate</text><text x="${f1(px+pw/2)}" y="${y+h-26}" class="t-xs t-mid">per local policy</text>`}}
    if(i===5){/* emergency card / teaching card */
      const fl=ease(ramp(u,.05,.4)),cw=w*.62,ch=h*.56,kx=cx-cw/2,ky=cy-ch/2-6;
      g+=`<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(.7+.3*fl)}) translate(${f1(-cx)} ${f1(-cy)})" style="opacity:${f1(.3+fl*.7)}"><rect x="${f1(kx)}" y="${f1(ky)}" width="${f1(cw)}" height="${f1(ch)}" rx="12" style="fill:var(--panel);stroke:${ty==='v'?'var(--vas)':'var(--accent)'};stroke-width:2.4"/>`;
      g+=zebra(kx+30,ky+30,16,{id:'nuZb'});
      g+=`<text x="${f1(kx+56)}" y="${f1(ky+26)}" class="t-lbl" style="font-size:13px">${ty==='v'?'VASCULAR EDS · EMERGENCY':'hEDS · MY CARE NOTES'}</text>`;
      const L=ty==='v'?['Sudden pain: urgent care','Show this card','Avoid arterial punctures','Team contact: on file']:['Numbing may wear off','Joints slip: handle gently','Tape: easy-release','Dizzy on standing'];
      L.forEach((l,j)=>{if(fl>.3+j*.15)g+=`<text x="${f1(kx+20)}" y="${f1(ky+62+j*((ch-74)/4))}" class="t-sm" style="fill:var(--ink)">• ${l}</text>`});
      g+=`</g><text x="${f1(cx)}" y="${y+h-12}" class="t-xs t-mid">illustrative card, not a real template</text>`}
    return g}

  function draw(t){const N=vb(svg,'720 380','400 600');const W=N?400:720;let s='';
    const st=Math.min(5,Math.floor(t*n6)),u=ramp(t,st/n6,(st+1)/n6);
    /* pathway */
    const x0=N?30:40,x1=W-(N?30:40),py=N?34:34,sx=i=>x0+i*(x1-x0)/5;
    s+=`<line x1="${x0}" x2="${x1}" y1="${py}" y2="${py}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${x0}" x2="${f1(lerp(x0,x1,clamp(t*1.2-.1)))}" y1="${py}" y2="${py}" style="stroke:var(--brand);stroke-width:4;stroke-linecap:round"/>`;
    for(let i=0;i<6;i++){const on=i===st,dn=i<st;s+=`<circle cx="${f1(sx(i))}" cy="${py}" r="13" style="fill:${on?(ty==='v'&&i===4?'var(--vas)':'var(--brand)'):dn?'var(--brand-soft)':'var(--panel-2)'};stroke:var(--line)"/>${ico(i,sx(i),py,on)}`;
      s+=`<text x="${f1(sx(i))}" y="${py+28}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${N?String(i+1):ST[i]}</text>`}
    const fx=lerp(sx(Math.max(0,st-1)),sx(st),ease(clamp(u*4)))+(st?0:0);s+=person(f1(fx-6),py-36,20,'var(--accent)');
    const P=PTS[st][ty==='v'?1:0];
    if(N){s+=`<text x="16" y="88" class="t-sm" style="fill:var(--ink)">${ST[st].toUpperCase()}</text>`;s+=vig(st,u,12,96,376,260);s+=pts(P,u,12,370,376,50,6)}
    else{s+=vig(st,u,20,74,420,292);s+=`<text x="458" y="90" class="t-sm">${ST[st].toUpperCase()} · NURSING POINTS</text>`;s+=pts(P,u,456,100,246,58,8)}
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);$('#nuNote').innerHTML=noteHTML(STEPS[p]);setSt&&setSt(p)}
  const stop=playWire(rg,$('#nuPlay'),draw,30000,'Replay','nursing');
  function wire(){const old=$('#nuSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS,rg,draw,stop)}
  $$('[data-nuty]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.nuty;$$('[data-nuty]').forEach(x=>x.setAttribute('aria-pressed',x===b));STEPS=mk();wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---------- active stand chart ---------- */
  const ss=$('#nuStand');
  const EX={pots:{a:'a',hr:[72,98,106,110],sb:[112,110,108,109]},oh:{a:'a',hr:[70,84,86,88],sb:[124,100,98,96]},none:{a:'t',hr:[68,84,88,90],sb:[110,108,110,109]}};
  const IDS=['nuHr0','nuHr2','nuHr5','nuHr10'],SIDS=['nuSb0','nuSb2','nuSb5','nuSb10'];
  let reveal=1,stopR=null;
  const num=id=>{const v=parseFloat($('#'+id).value);return isFinite(v)?v:0};
  function drawS(){const N=vb(ss,'520 300','400 340');const W=N?400:520,H=N?340:300;let s='';
    const hr=IDS.map(num),sb=SIDS.map(num),teen=$('#nuAge').value==='t',th=teen?40:30;
    const xs=[-3,2,5,10],x0=48,x1=W-36,y0=26,y1=H-44,X=m=>x0+(m+5)/15*(x1-x0);
    const lo=Math.min(40,...hr,...sb)-10,hi=Math.max(160,...hr.map(v=>v+th),...sb)+10,Y=v=>y1-(v-lo)/(hi-lo)*(y1-y0);
    s+=`<rect x="${x0}" y="${y0}" width="${f1(X(0)-x0)}" height="${y1-y0}" style="fill:var(--panel-2)"/><text x="${f1((x0+X(0))/2)}" y="${y0+14}" class="t-xs t-mid">lying</text><text x="${f1((X(0)+x1)/2)}" y="${y0+14}" class="t-xs t-mid">standing</text>`;
    for(let v=Math.ceil(lo/20)*20;v<=hi;v+=20)s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`;
    [-5,0,2,5,10].forEach(m=>s+=`<text x="${f1(X(m))}" y="${y1+16}" class="t-xs t-mid">${m}</text>`);s+=`<text x="${x1}" y="${y1+32}" class="t-xs t-end">minutes</text>`;
    s+=`<line x1="${f1(X(0))}" x2="${x1}" y1="${f1(Y(hr[0]+th))}" y2="${f1(Y(hr[0]+th))}" style="stroke:var(--accent);stroke-dasharray:5 4;stroke-width:1.4"/><text x="${x1}" y="${f1(Y(hr[0]+th)-5)}" class="t-xs t-end" style="fill:var(--accent)">lying HR + ${th}</text>`;
    s+=`<line x1="${f1(X(0))}" x2="${x1}" y1="${f1(Y(sb[0]-20))}" y2="${f1(Y(sb[0]-20))}" style="stroke:var(--vas);stroke-dasharray:5 4;stroke-width:1.4"/><text x="${x1}" y="${f1(Y(sb[0]-20)+13)}" class="t-xs t-end" style="fill:var(--vas)">lying SBP − 20</text>`;
    const k=Math.max(1,Math.ceil(reveal*4));
    [[hr,'var(--accent)','HR'],[sb,'var(--vas)','SBP']].forEach(([a,c,l])=>{let d='';for(let i=0;i<k;i++)d+=(i?'L':'M')+f1(X(xs[i]))+' '+f1(Y(a[i]));
      s+=`<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.4"/>`;for(let i=0;i<k;i++)s+=`<circle cx="${f1(X(xs[i]))}" cy="${f1(Y(a[i]))}" r="4.5" style="fill:var(--panel);stroke:${c};stroke-width:2"/>`;
      s+=`<text x="${f1(X(xs[0])-9)}" y="${f1(Y(a[0])+4)}" class="t-xs t-end" style="fill:${c}">${l}</text>`});
    ss.innerHTML=s;
    const rises=hr.slice(1).map(v=>v-hr[0]),falls=sb.slice(1).map(v=>sb[0]-v);
    const nR=rises.filter(v=>v>=th).length,nF=falls.filter(v=>v>=20).length,mx=Math.max(...rises),mf=Math.max(...falls);
    let cls,msg;
    if(nF>=2){cls='no';msg=`<b>Sustained systolic fall of ${mf} mmHg.</b> The POTS definition requires no sustained systolic drop of 20 mmHg or more, so these readings point away from the POTS heart-rate pattern and toward orthostatic hypotension, which needs its own medical assessment.`}
    else if(nR>=2){cls='maybe';msg=`<b>Heart rate rose by up to ${mx} beats/min</b> (threshold ${th}${teen?', ages 12–19':''}) in ${nR} of 3 standing readings, without a sustained systolic fall. This matches the heart-rate part of the definition only: POTS also needs orthostatic symptoms for at least 3 months and is a clinician's diagnosis.`}
    else{cls='yes';msg=`<b>Threshold not met on these readings.</b> Largest heart-rate rise ${mx} beats/min (threshold ${th}); largest systolic fall ${Math.max(0,mf)} mmHg. One set of readings does not rule anything in or out.`}
    $('#nuVerdict').innerHTML=`<div class="verdict ${cls}">${msg} <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup></div><p class="stage-cap">Teaching simplification: "sustained" is read here as at least two of the three standing readings.</p>`}
  function setEx(k){const e=EX[k];$('#nuAge').value=e.a;IDS.forEach((id,i)=>$('#'+id).value=e.hr[i]);SIDS.forEach((id,i)=>$('#'+id).value=e.sb[i]);
    if(stopR)stopR();reveal=0;stopR=animate(1400,p=>{reveal=p;drawS()},()=>{stopR=null})}
  $$('[data-nuex]').forEach(b=>b.addEventListener('click',()=>{$$('[data-nuex]').forEach(x=>x.setAttribute('aria-pressed',x===b));setEx(b.dataset.nuex)}));
  $$('#nuCalc input,#nuCalc select').forEach(el=>el.addEventListener('input',()=>{$$('[data-nuex]').forEach(x=>x.setAttribute('aria-pressed','false'));reveal=1;drawS()}));
  $('#nuAge').addEventListener('change',drawS);
  drawS();
  {const pr=redraws.nursing;redraws.nursing=()=>{pr&&pr();drawS()}}

  /* ---------- flip cards ---------- */
  const FC=[
    {q:'Why ask about tape and dressings?',a:'Adhesive tapes and dressings should be easy to remove, or avoided, because of the risk of severe skin damage. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>'},
    {q:'What can repeated blood-pressure cuff inflations do?',a:'Repeated non-invasive cuff inflations can cause bruising and haematoma. <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>'},
    {q:'How are wounds closed in classical EDS?',a:'Without tension, preferably in two layers; deep stitches applied generously; skin stitches left twice as long as usual; adjacent skin taped to stop the scar stretching. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>'},
    {q:'An infant with EDS has bruises. What should be recorded?',a:'Early bruising and its causes, "to avoid false accusations of maltreatment". EDS belongs on the bruising differential; as an explanation for infant fractures it remains speculative. <sup class="c" data-ref="Pezaro2024,Castori2015" title="Source 77,367">77,367</sup>'},
    {q:'Does vitamin C help bruising in classical EDS?',a:'GeneReviews says ascorbic acid "may reduce bruising": an expert recommendation with low-level evidence. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>'},
    {q:'Thin, translucent skin with visible veins: which type?',a:'Vascular EDS: arterial, intestinal and uterine fragility, thin translucent skin, easy bruising and a characteristic face. <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>'},
    {q:'Which sutures does perinatal hEDS/HSD guidance prefer?',a:'Longer-lasting absorbable sutures, tension-free interrupted closure, gentle handling of fragile tissues, and additional adhesives where the skin is particularly fragile. <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>'},
    {q:'Where does classical EDS skin split most?',a:'After relatively minor trauma, especially over the knees, elbows, shins, forehead and chin. <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>'}];
  $('#nuFc').innerHTML=FC.map((c,i)=>`<div class="fc-wrap"><button class="fc" aria-pressed="false" aria-label="Flip card ${i+1}: ${c.q.replace(/"/g,'')}"><div class="face front"><small>Card ${i+1} · tap to turn</small><p>${c.q}</p></div><div class="face back"><small>Answer</small><p>${c.a}</p></div></button></div>`).join('');
  $$('#nuFc .fc').forEach(b=>b.addEventListener('click',()=>{const f=!b.classList.contains('flip');b.classList.toggle('flip',f);b.setAttribute('aria-pressed',f)}));
};
/* =============== 6.1 History & people =============== */
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  let names='now';

  /* ---------- the time scale: c. 400 BC sits on a stub at the left, 1885-1960 is compressed,
     1960-2027 is widened so the crowded modern decades can be read ---------- */
  const U0=.05,U1=.30;
  const uOf=y=>y<1885?.012:y<1960?U0+(U1-U0)*(y-1885)/75:U1+(1-U1)*(y-1960)/67;
  const yOf=u=>u<U0?null:u<U1?1885+(u-U0)/(U1-U0)*75:1960+(u-U1)/(1-U1)*67;

  /* ---------- events (each one cited in the line under the stage) ---------- */
  const EV=[
    {y:-400,chip:'Hippocrates',lbl:'c. 400 BC',who:'Hippocrates',role:'an ancient description',head:'Lax joints and many scars',g:'scar',
     txt:`A condition with joint laxity and multiple scars was described by Hippocrates in 400 BC. <sup class="c" data-ref="Parapia2008,Forghani2019" title="Source 166,358">166,358</sup>`},
    {y:1892,chip:'Tschernogubow',lbl:'1892',who:'Tschernogubow (Chernogubov)',role:'Russian dermatologist',head:'The first full description',g:'scar',
     txt:`The Russian dermatologist Tschernogubow (also spelled Chernogubov) published the first comprehensive description. One source dates his report to 1891. <sup class="c" data-ref="Forghani2019,Rauterberg2025" title="Source 166,376">166,376</sup>`},
    {y:1901,chip:'Ehlers',lbl:'1901',who:'Edvard Ehlers',role:'Danish dermatologist',head:'A distinct condition',g:'bruise',
     txt:`The Danish dermatologist Edvard Ehlers recognised the condition as a distinct entity. EDS is one of the oldest known causes of bruising and bleeding. <sup class="c" data-ref="Parapia2008,Forghani2019" title="Source 166,358">166,358</sup>`},
    {y:1908,chip:'Danlos',lbl:'1908',who:'Henri-Alexandre Danlos',role:'French dermatologist',head:'Stretchy, fragile skin',g:'pull',
     txt:`The French dermatologist Henri-Alexandre Danlos suggested that skin extensibility and fragility were the cardinal features. <sup class="c" data-ref="Parapia2008" title="Source 358">358</sup>`},
    {y:1936,chip:'Parkes-Weber',lbl:'1936',who:'Frederick Parkes-Weber',role:'English dermatologist',head:'A name: "Ehlers-Danlos syndrome"',g:'name',
     txt:`The English dermatologist Frederick Parkes-Weber suggested the name "Ehlers-Danlos syndrome". <sup class="c" data-ref="Forghani2019" title="Source 166">166</sup>`},
    {y:1964,chip:'Carter &amp; Wilkinson',lbl:'1964',who:'Carter and Wilkinson',role:'a score of joint laxity',head:'Counting lax joints',g:'limb',
     txt:`Carter and Wilkinson described a score of joint laxity in a study of persistent joint laxity and congenital dislocation of the hip. The Beighton score later adapted it. <sup class="c" data-ref="Carter1964,Clinch2011" title="Source 73,98">73,98</sup>`},
    {y:1967,chip:'Kirk',lbl:'1967',who:'Kirk, Ansell and Bywaters',role:'the hypermobility syndrome',head:'Joint hypermobility syndrome',g:'joint',
     txt:`The first description of joint hypermobility syndrome: musculoskeletal complaints associated with generalised joint hypermobility. <sup class="c" data-ref="Kirk1967,Forghani2019" title="Source 166,246">166,246</sup>`},
    {y:1969,chip:'Beighton &amp; Horan',lbl:'1969',who:'Beighton and Horan',role:'orthopaedic aspects of EDS',head:'One syndrome, several disorders',g:'joint',
     txt:`Beighton and Horan described joint involvement in EDS. In the 1960s it became clear that EDS was several disorders with different Mendelian inheritance, and classification began in the late 1960s. <sup class="c" data-ref="Beighton1969,VanDijk2024,Beighton1998" title="Source 32,35,480">32,35,480</sup>`},
    {y:1973,chip:'Beighton score',lbl:'1973',who:'Beighton, Solomon and Soskolne',role:'articular mobility in an African population',head:'The Beighton score',g:'limb',
     txt:`The nine-point Beighton score was devised in a study of 1,083 Tswana Africans, adults and children, in South Africa. It is a starting point, not a diagnosis. <sup class="c" data-ref="Beighton1973,Clinch2011,Juul-Kristensen2017" title="Source 33,98,231">33,98,231</sup>`},
    {y:1986,chip:'Berlin',lbl:'1986',who:'7th International Congress of Human Genetics',role:'Berlin; published 1988',head:'Berlin nosology: 11 types',k:'berlin',
     txt:`Proposed in Berlin in 1986 and published in 1988, the Berlin nosology defined 11 types numbered with Roman numerals, mainly by inheritance and clinical picture. <sup class="c" data-ref="Beighton1988,Forghani2019,Malek2021" title="Source 34,166,287">34,166,287</sup>`},
    {y:1997,chip:'Byers',lbl:'1997',who:'Byers and colleagues',role:'arthrochalasia (types VIIA and VIIB)',head:'A gene for arthrochalasia',g:'gene',gene:'COL1A1 · COL1A2',gsub:'exon 6, the cleavage site',
     txt:`EDS types VIIA and VIIB were shown to result from splice-junction variants or deletions involving exon 6 of COL1A1 and COL1A2, the site the procollagen N-proteinase cuts. <sup class="c" data-ref="Byers1997" title="Source 66">66</sup>`},
    {y:1997.4,chip:'Villefranche',lbl:'1997',who:'Beighton, De Paepe, Steinmann, Tsipouras, Wenstrup',role:'Villefranche-sur-Mer; published 1998',head:'Villefranche: 6 named types',k:'vf',
     txt:`Agreed at Villefranche-sur-Mer in 1997 and published in 1998, it defined 6 types mainly by cause, with major and minor criteria for each. It was sponsored by the Ehlers-Danlos National Foundation (USA) and the Ehlers-Danlos Support Group (UK). <sup class="c" data-ref="Beighton1998,Forghani2019,Brady2017" title="Source 35,59,166">35,59,166</sup>`},
    {y:1998,chip:'Brighton',lbl:'1998',who:'Grahame, Bird and Child',role:'published 2000',head:'Brighton criteria for JHS',g:'limb',
     txt:`The revised (Brighton 1998) criteria for benign joint hypermobility syndrome were published in 2000. <sup class="c" data-ref="Grahame2000" title="Source 187">187</sup>`},
    {y:1998.4,chip:'Michalickova',lbl:'1998',who:'Michalickova and colleagues',role:'type V collagen',head:'A gene for classical EDS',g:'gene',gene:'COL5A2',gsub:'α2(V) chain of type V collagen',
     txt:`Variants in the α2(V) chain of type V collagen were shown to impair matrix assembly and produce EDS type I, the classical type. <sup class="c" data-ref="Michalickova1998" title="Source 302">302</sup>`},
    {y:1999,chip:'Colige',lbl:'1999',who:'Colige and colleagues',role:'dermatosparaxis (type VIIC)',head:'The enzyme for dermatosparaxis',g:'gene',gene:'ADAMTS2',gsub:'procollagen I N-proteinase',
     txt:`Human EDS type VIIC (dermatosparaxis) and bovine dermatosparaxis were traced to variants in the procollagen I N-proteinase gene, ADAMTS2. <sup class="c" data-ref="Colige1999" title="Source 99">99</sup>`},
    {y:2000,chip:'Pepin',lbl:'2000',who:'Pepin, Schwarze, Superti-Furga and Byers',role:'the vascular type (type IV)',head:'Vascular EDS, counted',g:'gene',gene:'COL3A1',gsub:'type III procollagen',
     txt:`220 index patients with biochemically confirmed vascular EDS and 199 affected relatives: a calculated median survival of 48 years, most deaths from arterial rupture. A later series of 1,231 people found 51 years. These are population statistics, not a forecast for any one person. vEDS is caused by COL3A1. <sup class="c" data-ref="Pepin2000,Pepin2014,Byers2017" title="Source 67,363,364">67,363,364</sup>`},
    {y:2000.4,chip:'Wenstrup',lbl:'2000',who:'Wenstrup and colleagues',role:'classical EDS',head:'Half the type V collagen',g:'gene',gene:'COL5A1',gsub:'one allele not expressed',
     txt:`Loss of expression of one COL5A1 allele was found in 8 of 28 informative probands; about one-third of people with classical EDS were estimated to have COL5A1 haploinsufficiency. <sup class="c" data-ref="Wenstrup2000" title="Source 500">500</sup>`},
    {y:2017,chip:'13 types',lbl:'2017',who:'Malfait, Francomano, Byers and the International Consortium',role:'about two years of work',head:'Thirteen types',k:'y17',
     txt:`The 2017 International Classification recognises 13 types. All except hEDS need molecular confirmation, and hypermobility spectrum disorder (HSD) became the label for symptomatic joint hypermobility that fits no other syndrome. <sup class="c" data-ref="Bloom2017,Malfait2017,Castori2017" title="Source 48,78,291">48,78,291</sup>`},
    {y:2018,chip:'HEDGE',lbl:'2018',who:'The Ehlers-Danlos Society',role:'HEDGE study',head:'The search for an hEDS gene',g:'hedge',
     txt:`The Hypermobile Ehlers-Danlos Genetic Evaluation (HEDGE) study began in 2018 to find the genetic basis of hEDS by whole-genome sequencing, aiming for 1,000 adults who meet the 2017 criteria. Enrolment (N=1,021) was 92% female. No causal gene for hEDS has been confirmed. <sup class="c" data-ref="Douglas2026,VanDijk2024,Halverson2023,Forghani2025" title="Source 132,167,204,480">132,167,204,480</sup>`},
    {y:2020,chip:'14 types',lbl:'2020',who:'Malfait, Castori, Francomano, Giunta, Kosho and Byers',role:'Nature Reviews Disease Primers',head:'14 types, 20 genes',k:'y20',
     txt:`A primer counted 14 types caused by variants in 20 genes, because classical-like EDS type 2 (AEBP1) was described after 2017. <sup class="c" data-ref="Malfait2020,Malek2021" title="Source 287,292">287,292</sup>`},
    {y:2024,chip:'Ritelli',lbl:'2024',who:'Ritelli and colleagues',role:'an Italian reference centre',head:'Are the criteria too strict?',g:'crowd',
     txt:`327 people (213 families) previously diagnosed under the Villefranche or Brighton criteria were reassessed; the authors concluded that the 2017 criteria should be made less stringent. One genetics team finds adults rarely meet them when strictly applied. <sup class="c" data-ref="Ritelli2024,VanDijk2024" title="Source 388,480">388,480</sup>`},
    {y:2026,chip:'Criteria review',lbl:'today',who:'Clinicians, researchers and families',role:'criteria under review',head:'The next criteria',k:'rev',
     txt:`The debate continues. Until a revised version appears in a peer-reviewed journal, the 2017 International Classification remains the published standard. The latest on the revision is in <a href="#frontier" data-go="frontier">Toward better treatment</a>. <sup class="c" data-ref="Malfait2017,Ritelli2024,VanDijk2024" title="Source 291,388,480">291,388,480</sup>`}];
  /* positions: on the scale, then spread so neighbours are at least .011 apart */
  EV.forEach((e,i)=>{e.u=uOf(e.y);if(i&&e.u<EV[i-1].u+.011)e.u=EV[i-1].u+.011});
  EV[EV.length-1].u=Math.min(EV[EV.length-1].u,.985);
  const evAt=t=>{let k=0;EV.forEach((e,i)=>{if(t>=e.u-.0005)k=i});return k};
  const U=y=>EV.find(e=>e.y===y).u;

  const STEPS=[
    {from:0,at:U(1901)+.002,k:'Era 1 · c. 400 BC to 1908',t:'Before the name',
     txt:`Long before it had a name, a condition with lax joints and many scars was described by Hippocrates. In 1892 Tschernogubow gave the first comprehensive description; in 1901 Ehlers recognised it as a distinct condition, and in 1908 Danlos made stretchy, fragile skin its cardinal features. All three were dermatologists. <sup class="c" data-ref="Parapia2008,Forghani2019" title="Source 166,358">166,358</sup>`,
     pt:`The condition is named after two skin doctors: Edvard Ehlers from Denmark (1901) and Henri-Alexandre Danlos from France (1908). <sup class="c" data-ref="Parapia2008" title="Source 358">358</sup>`,
     hook:`Ehlers 1901 (Danish dermatologist), Danlos 1908 (French dermatologist). Tschernogubow 1892 (one source: 1891). <sup class="c" data-ref="Parapia2008,Forghani2019,Rauterberg2025" title="Source 166,358,376">166,358,376</sup>`},
    {from:U(1936)-.0005,at:U(1973)+.002,k:'Era 2 · 1936 to 1973',t:'A name, then a score',
     txt:`Parkes-Weber proposed the name "Ehlers-Danlos syndrome" in 1936. In 1967 Kirk, Ansell and Bywaters described joint hypermobility syndrome. By the late 1960s EDS was seen as several disorders with different inheritance, and in 1973 Beighton and colleagues published the nine-point score, adapted from Carter and Wilkinson's, in 1,083 Tswana Africans. <sup class="c" data-ref="Forghani2019,Kirk1967,VanDijk2024,Beighton1973,Clinch2011,Carter1964" title="Source 33,73,98,166,246,480">33,73,98,166,246,480</sup>`,
     pt:`The Beighton score is a quick bendiness check doctors use. It is a starting point, not a diagnosis, and a high score at home does not mean you have EDS. <sup class="c" data-ref="Juul-Kristensen2017,Singh2017" title="Source 231,435">231,435</sup>`,
     hook:`Beighton score: 9 points, devised on 1,083 Tswana Africans (1973). Name "Ehlers-Danlos syndrome": Parkes-Weber, 1936. <sup class="c" data-ref="Beighton1973,Clinch2011,Forghani2019" title="Source 33,98,166">33,98,166</sup>`},
    {from:U(1986)-.0005,at:U(1986)+.002,k:'Era 3 · 1986 to 1988',t:'Berlin: 11 types',
     txt:`At the 7th International Congress of Human Genetics in Berlin (1986, published 1988), EDS was split into 11 types numbered I to XI, mainly by inheritance and clinical picture: type I gravis, type II mitis, type III hypermobile, type IV arterial-ecchymotic, type VII arthrochalasis/dermatosparaxis and type XI familial hypermobility among them. Switch the names to "Then" to see the numerals. <sup class="c" data-ref="Beighton1988,Forghani2019,Malek2021" title="Source 34,166,287">34,166,287</sup>`,
     pt:`In 1986 experts agreed a numbered list of 11 kinds of EDS. Most of the numbers were later replaced by names.`,
     hook:`Berlin (1986, published 1988): 11 Roman-numeral types. EDS type III (Berlin) = hypermobility type (Villefranche) = hEDS (2017). <sup class="c" data-ref="Forghani2019,Malek2021" title="Source 166,287">166,287</sup>`},
    {from:U(1997)-.0005,at:U(1997.4)+.002,k:'Era 4 · 1997 to 2000',t:'Genes and Villefranche',
     txt:`The late 1990s brought the genes. Arthrochalasia was traced to exon 6 of COL1A1 and COL1A2 (1997), classical EDS to type V collagen (COL5A2 in 1998, COL5A1 haploinsufficiency in 2000) and dermatosparaxis to the ADAMTS2 enzyme (1999); in 2000 a series of 220 index patients described the natural history of vascular EDS. Villefranche (1997, published 1998) cut the list to 6 named types, mainly by cause, and the Brighton criteria (1998, published 2000) defined joint hypermobility syndrome. <sup class="c" data-ref="Byers1997,Michalickova1998,Wenstrup2000,Colige1999,Pepin2000,Beighton1998,Grahame2000" title="Source 35,66,99,187,302,363,500">35,66,99,187,302,363,500</sup>`,
     pt:`In the 1990s scientists began finding the gene changes behind several types, so the list could be sorted by cause rather than by appearance. <sup class="c" data-ref="Beighton1998,Byers1997,Colige1999" title="Source 35,66,99">35,66,99</sup>`,
     hook:`Villefranche (1997, published 1998): 6 named types: classical, hypermobility, vascular, kyphoscoliosis, arthrochalasia, dermatosparaxis. <sup class="c" data-ref="Beighton1998,Forghani2019" title="Source 35,166">35,166</sup>`},
    {from:U(2017)-.0005,at:U(2017)+.002,k:'Era 5 · 2017',t:'Thirteen types',
     txt:`After many newly described molecular types, and concern that the hypermobile type had inadequate criteria, the International Consortium spent about two years on a new classification. The 2017 version names 13 types; for all but hEDS the definite diagnosis "relies on molecular confirmation". Joint hypermobility syndrome and the hypermobility type were folded into hEDS, with hypermobility spectrum disorder for people who do not meet the stricter criteria. <sup class="c" data-ref="Bloom2017,Malfait2017,Tinkle2017,Castori2017" title="Source 48,78,291,461">48,78,291,461</sup>`,
     pt:`Since 2017 there are 13 kinds of EDS. Twelve can be confirmed with a gene test; hypermobile EDS is diagnosed with a checklist and an examination. <sup class="c" data-ref="Malfait2017" title="Source 291">291</sup>`,
     hook:`2017: 13 types; all except hEDS need a causative variant. HSD = symptomatic hypermobility that fits no syndrome. <sup class="c" data-ref="Malfait2017,Castori2017" title="Source 78,291">78,291</sup>`},
    {from:U(2018)-.0005,at:U(2018)+.002,k:'Era 6 · 2018 to today',t:'After 2017',
     txt:`The HEDGE study (from 2018) is sequencing the genomes of people with hEDS; most experts expect hEDS will not turn out to have a single-gene cause (<span class="ev hyp">Hypothesis</span>). By 2020 a primer counted 14 types and 20 genes. An Italian centre argued in 2024 that the 2017 hEDS criteria should be less stringent, and a revision is being worked on; until it is published, the 2017 criteria are the standard. <sup class="c" data-ref="Douglas2026,VanDijk2024,Malfait2020,Ritelli2024,Malfait2017" title="Source 132,291,292,388,480">132,291,292,388,480</sup>`,
     pt:`Researchers are reading the full genetic code of about 1,000 people with hypermobile EDS to look for its causes. <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>`,
     hook:`Malfait 2020 counts 14 types (20 genes): classical-like EDS type 2 (AEBP1) was added after 2017. HEDGE (begun 2018): 1,000 genomes. <sup class="c" data-ref="Malfait2020,Malek2021,Douglas2026,VanDijk2024" title="Source 132,287,292,480">132,287,292,480</sup>`}];
  const setSt=stepWire($('#hiSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* ---------- the lists of types: [then label, then sub, now label, now sub, style] ---------- */
  const BERLIN=[['I','gravis','cEDS','was type I'],['II','mitis','cEDS','was type II'],['III','hypermobile','hEDS','was type III','h'],['IV','arterial-|ecchymotic','vEDS','was type IV'],
    ['V','X-linked','left EDS','was type V','x'],['VI','','kEDS','was type VI'],['VII','arthrochalasis,|dermatosparaxis','aEDS · dEDS','was type VII'],['VIII','','VIII','not mapped','q'],
    ['IX','occipital horn','left EDS','was type IX','x'],['X','fibronectin-|deficient','left EDS','was type X','x'],['XI','familial|hypermobility','left EDS','was type XI','x']];
  const VF=[['classical','','cEDS','classical'],['hypermobility','','hEDS','hypermobile','h'],['vascular','','vEDS','vascular'],['kyphoscoliosis','','kEDS','kyphoscoliotic'],['arthrochalasia','','aEDS','arthrochalasia'],['dermatosparaxis','','dEDS','dermatosparaxis']];
  const Y17=[['classical','','cEDS','COL5A1/2'],['hypermobility','','hEDS','no gene known','h'],['vascular','','vEDS','COL3A1'],['kyphoscoliosis','','kEDS','PLOD1, FKBP14'],['arthrochalasia','','aEDS','COL1A1/2'],['dermatosparaxis','','dEDS','ADAMTS2'],
    ['not a 1997','type','clEDS','TNXB','n'],['not a 1997','type','cvEDS','COL1A2','n'],['not a 1997','type','spEDS','3 genes','n'],['not a 1997','type','mcEDS','CHST14, DSE','n'],['not a 1997','type','mEDS','COL12A1','n'],['not a 1997','type','pEDS','C1R, C1S','n'],['not a 1997','type','BCS','ZNF469, PRDM5','n']];
  const LISTS={berlin:{L:BERLIN,h:'BERLIN 1986/88 · 11 TYPES'},vf:{L:VF,h:'VILLEFRANCHE 1997/98 · 6 TYPES'},y17:{L:Y17,h:'2017 INTERNATIONAL CLASSIFICATION · 13 TYPES'},
    y20:{L:Y17.concat([['after 2017','','clEDS2','AEBP1','d']]),h:'2020 PRIMER · 14 TYPES'},rev:{L:Y17,h:'2017 · STILL THE PUBLISHED STANDARD'}};

  function chips(key,x,y,w,h,lp){const D=LISTS[key],L=D.L,n=L.length,cols=n<=6?3:4,gap=6,cw=(w-gap*(cols-1))/cols,rows=Math.ceil(n/cols),ch=Math.min(44,(h-22-gap*(rows-1))/rows);
    let g=`<text x="${f1(x)}" y="${f1(y+11)}" class="t-sm" style="fill:var(--accent);font-weight:600">${D.h}</text>`;
    L.forEach((c,i)=>{const cx=x+(i%cols)*(cw+gap),cy=y+20+Math.floor(i/cols)*(ch+gap),e=ease(ramp(lp,i*.025,.2+i*.025)),st=c[4]||'',now=names==='now';
      const main=now?c[2]:c[0],sub=(key==='rev'&&st==='h'&&now)?'under review':(now?c[3]:c[1])||'';
      const fs=Math.min(12.5,(cw-12)/(main.length*.6)),longest=Math.max(...sub.split('|').map(q=>q.length),1),ss=Math.min(9.5,(cw-12)/(longest*.6));
      const fill=st==='x'?'var(--panel)':st==='h'?'var(--accent-soft)':st==='n'||st==='d'?'var(--dx-soft)':st==='q'?'var(--panel-2)':'var(--brand-soft)';
      const stroke=st==='x'?'var(--muted)':st==='h'?'var(--accent)':st==='n'||st==='d'?'var(--dx)':'var(--line)';
      g+=`<g style="opacity:${f1(e)}" transform="translate(0 ${f1((1-e)*8)})"><rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cw)}" height="${f1(ch)}" rx="7" style="fill:${fill};stroke:${stroke};stroke-width:1.2;${st==='x'||st==='d'||(st==='h'&&key==='rev')?'stroke-dasharray:4 3':''}"/>`;
      if(st==='h'&&now)g+=`<path d="M${f1(cx+cw-22)} ${f1(cy+2)}l20 20M${f1(cx+cw-14)} ${f1(cy+2)}l12 12" style="stroke:var(--accent);stroke-width:1.2;opacity:.6"/>`;
      g+=`<text x="${f1(cx+7)}" y="${f1(cy+15)}" class="t-lbl" style="font-size:${f1(fs)}px;${st==='x'&&now?'fill:var(--muted);text-decoration:line-through':''}">${main}</text>`;
      sub.split('|').forEach((s,k)=>{if(s&&ch>26+k*10)g+=`<text x="${f1(cx+7)}" y="${f1(cy+27+k*10)}" class="t-xs" style="font-size:${f1(ss)}px">${s}</text>`});
      g+='</g>'});
    return g}

  /* ---------- small pictures for the non-classification events ---------- */
  function wrap(s,n){const w=s.split(' '),out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){out.push(l.trim());l=x}else l+=' '+x});if(l.trim())out.push(l.trim());return out}
  function glyph(e,x,y,w,h,lp){let g='';const cx=x+w/2,cy=y+h/2,ee=ease(lp);
    const cap=(s,yy)=>`<text x="${f1(cx)}" y="${f1(yy)}" class="t-xs t-mid" style="fill:var(--ink)">${s}</text>`;
    if(e.g==='scar'||e.g==='bruise'||e.g==='pull'){const sw=Math.min(w-30,350),sh=e.g==='pull'?80:Math.min(h-58,96),sx=cx-sw/2,sy=y+(e.g==='pull'?76:34);
      const o=e.g==='scar'?{h:sh,scar:.2+.8*ee}:e.g==='bruise'?{h:sh,bruise:ee,pull:.25*bump(lp,0,1)}:{h:sh,pull:bump(lp,0,.9)*.9+.1,max:32,fingers:true};
      g+=skin(sx,sy,sw,o).svg;
      g+=cap(e.g==='scar'?'skin that splits leaves widened, thin scars':e.g==='bruise'?'easy bruising, an old sign of EDS':'skin that stretches far, and tears easily',y+h-6)}
    if(e.g==='name'){const full='Ehlers-Danlos syndrome',k=Math.round(full.length*ramp(lp,0,.7));
      g+=zebra(cx,y+h*.36,Math.min(34,h*.2),{id:'hiZb'});
      g+=`<text x="${f1(cx)}" y="${f1(y+h*.36+Math.min(34,h*.2)+30)}" class="t-big t-mid" style="font-size:22px">${full.slice(0,k)}<tspan style="fill:var(--accent)">${k<full.length?'|':''}</tspan></text>`;
      [['Ehlers','1901',-1],['Danlos','1908',1]].forEach(p=>{const px=cx+p[2]*Math.min(w*.3,110);g+=`<text x="${f1(px)}" y="${f1(y+h-10)}" class="t-xs t-mid" style="opacity:${f1(ramp(lp,.5,.9))}">${p[0]} · ${p[1]}</text>`});
      }
    if(e.g==='limb'){const deg=-ee*24,L=Math.min(w*.3,110),r=limb(cx-10,cy+6,L,deg,{len2:L*.9,w:16,arc:true,limit:-10});g+=r.svg;
      g+=cap(e.y===1998?'hypermobility plus pain: a syndrome, not just a score':'a joint bending back beyond straight',y+h-6)}
    if(e.g==='joint'){const s=Math.min(.75,(h-30)/190);g+=joint(cx,y+h*.48,s,{lax:ee*.9,slip:ee*.35,ang:ee*12,muscle:.3,hl:lp>.6});
      g+=cap(e.y===1967?'hypermobile joints that hurt':'lax joints, several inheritance patterns',y+h-6)}
    if(e.g==='gene'){const hw=Math.min(w-40,300),hx=cx-hw/2;
      g+=`<text x="${f1(cx)}" y="${f1(y+28)}" class="t-big t-mid" style="font-size:22px;fill:var(--variant)">${e.gene}</text>`;
      g+=`<text x="${f1(cx)}" y="${f1(y+44)}" class="t-xs t-mid">${e.gsub}</text>`;
      g+=helix(hx,y+h*.64,hw,{amp:16,turns:hw/60,zip:1,phase:lp*1.5,kink:lp>.25?.5:null,w:3})}
    if(e.g==='hedge'){const rows=4,cw=Math.min(w-40,300),x0=cx-cw/2;
      for(let r=0;r<rows;r++)g+=chain(x0,y+30+r*((h-60)/rows),cw,{n:26,show:clamp(lp*1.6-r*.2,.04,1),pro:false,col:r%2?'var(--chain-c)':'var(--chain-a)'});
      g+=`<text x="${f1(cx)}" y="${f1(y+16)}" class="t-sm t-mid" style="fill:var(--accent)">TARGET: 1,000 WHOLE GENOMES</text>`;
      g+=cap('adults meeting the 2017 criteria · no causal gene yet',y+h-6)}
    if(e.g==='crowd'){const per=27,cs=Math.min((w-10)/per,10),tot=327,k=Math.round(tot*ee),x0=cx-per*cs/2;
      for(let i=0;i<tot;i++){const px=x0+(i%per)*cs,py=y+22+Math.floor(i/per)*cs;g+=`<rect x="${f1(px)}" y="${f1(py)}" width="${f1(cs-1.4)}" height="${f1(cs-1.4)}" rx="1.5" style="fill:${i<k?'var(--accent)':'var(--panel-2)'}"/>`}
      g+=`<text x="${f1(cx)}" y="${f1(y+14)}" class="t-sm t-mid" style="fill:var(--accent)">${k} OF 327 PEOPLE REASSESSED</text>`;
      g+=cap('diagnosed under older criteria, re-checked against 2017',y+h-6)}
    return g}

  /* ---------- the type-count step line ---------- */
  const COUNT=[[1988,11,'Berlin 11'],[1998,6,'Villefranche 6'],[2017,13,'2017: 13'],[2020,14,'2020 primer: 14']];

  function draw(t){const N=vb(svg,'720 380','400 560');const W=N?400:720;
    const ei=evAt(t),e=EV[ei],nu=ei<EV.length-1?EV[ei+1].u:1,lp=ramp(t,e.u,Math.max(e.u+.006,nu-.004));
    const ax0=N?22:26,ax1=W-(N?18:22),X=u=>ax0+u*(ax1-ax0);
    let s=`<defs>${marker('hiArr','var(--muted)')}</defs>`;
    /* header: year and headline */
    s+=`<text x="16" y="${N?36:38}" class="t-big" style="font-size:${N?28:32}px;fill:var(--ink)">${e.lbl}</text>`;
    s+=`<text x="16" y="${N?58:62}" class="t-big" style="font-size:${N?17:18}px;fill:var(--accent)">${e.head}</text>`;
    /* card: who and role */
    const cw=N?54:40,cy0=N?82:88;
    const wl=wrap(e.who,cw),rl=wrap(e.role,N?58:44);
    wl.forEach((l,i)=>s+=`<text x="16" y="${cy0+i*16}" class="t-lbl">${l}</text>`);
    rl.forEach((l,i)=>s+=`<text x="16" y="${cy0+wl.length*16+4+i*14}" class="t-sm">${l}</text>`);
    /* era counter */
    const eraY=N?cy0+wl.length*16+rl.length*14+18:200;
    if(!N){const eraTxt=e.k?'a classification':e.g==='gene'?'a gene found':e.g==='hedge'||e.g==='crowd'?'research':'a description';
      s+=`<text x="16" y="${eraY-24}" class="t-xs">EVENT ${ei+1} OF ${EV.length} · ${eraTxt.toUpperCase()}</text>`;
      s+=`<rect x="16" y="${eraY-16}" width="268" height="5" rx="2.5" style="fill:var(--panel-2)"/><rect x="16" y="${eraY-16}" width="${f1(268*(ei+1)/EV.length)}" height="5" rx="2.5" style="fill:var(--accent)"/>`}
    /* right panel: list of types, or a picture */
    const P=N?{x:16,y:eraY,w:368,h:186}:{x:312,y:12,w:392,h:192};
    s+=`<rect x="${P.x-6}" y="${P.y-4}" width="${P.w+12}" height="${P.h+8}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=e.k?chips(e.k,P.x+4,P.y+4,P.w-8,P.h-8,lp*2.2):glyph(e,P.x,P.y,P.w,P.h,lp);
    /* the count chart */
    const C=N?{y0:P.y+P.h+30,h:90}:{y0:228,h:78},CY=v=>C.y0+C.h-v/14*C.h,yr=yOf(t);
    s+=`<text x="${ax0}" y="${C.y0-10}" class="t-sm" style="fill:var(--accent)">TYPES RECOGNISED</text>`;
    [0,7,14].forEach(v=>{s+=`<line x1="${ax0}" x2="${ax1}" y1="${f1(CY(v))}" y2="${f1(CY(v))}" class="grid"/><text x="${ax0-4}" y="${f1(CY(v)+3)}" class="t-xs t-end">${v}</text>`});
    if(yr==null||yr<1988)s+=`<text x="${f1(X(uOf(1988))-4)}" y="${f1(CY(5))}" class="t-xs t-end">no agreed classification yet</text>`;
    let d='',lastX=null;
    COUNT.forEach((c,i)=>{if(yr==null||yr<c[0])return;const x0=X(uOf(c[0])),x1=X(uOf(i<COUNT.length-1?Math.min(COUNT[i+1][0],yr):Math.min(2027,yr))),yy=CY(c[1]);
      if(i===3){s+=`<path d="M${f1(x0)} ${f1(CY(13))}V${f1(yy)}H${f1(Math.max(x0,x1))}" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-dasharray:5 3"/>`;}
      else{d+=(lastX==null?`M${f1(x0)} ${f1(yy)}`:`V${f1(yy)}`)+`H${f1(Math.max(x0,x1))}`;lastX=x1}
      const P2=[[x0+3,yy-5,''],[x0+3,yy+13,''],[x0-4,yy+12,'t-end'],[ax1,yy-5,'t-end']][i];
      if(!(N&&i===3))s+=`<text x="${f1(P2[0])}" y="${f1(P2[1])}" class="t-xs ${P2[2]}" style="fill:var(--ink)">${N&&i===2?'13':c[2]}</text>`});
    if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linejoin:round"/>`;
    /* the axis */
    const ay=N?C.y0+C.h+48:338;
    s+=`<line x1="${f1(X(.035))}" x2="${ax1}" y1="${ay}" y2="${ay}" style="stroke:var(--muted);stroke-width:1.2"/><line x1="${ax0}" x2="${f1(X(.022))}" y1="${ay}" y2="${ay}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<path d="M${f1(X(.022)-1)} ${ay+5}l4 -10M${f1(X(.035)-3)} ${ay+5}l4 -10" style="stroke:var(--muted);stroke-width:1.2"/>`;
    const ticks=N?[1900,1930,1960,1990,2020]:[1890,1910,1930,1960,1970,1980,1990,2000,2010,2020];
    ticks.forEach(y=>s+=`<line x1="${f1(X(uOf(y)))}" x2="${f1(X(uOf(y)))}" y1="${ay}" y2="${ay+4}" style="stroke:var(--muted)"/><text x="${f1(X(uOf(y)))}" y="${ay+16}" class="t-xs t-mid">${y}</text>`);
    s+=`<text x="${f1(X(.012))}" y="${ay+16}" class="t-xs t-mid">BC</text>`;
    s+=`<line x1="${f1(X(U1))}" x2="${f1(X(U1))}" y1="${ay-8}" y2="${ay+4}" style="stroke:var(--muted);stroke-dasharray:2 2"/><text x="${f1(X(U1)+4)}" y="${ay-8}" class="t-xs">${N?'wider →':'scale widens →'}</text>`;
    /* event dots */
    EV.forEach((v,i)=>{const x=X(v.u),past=i<=ei,on=i===ei;
      s+=`<circle cx="${f1(x)}" cy="${ay}" r="${on?6:3.6}" style="fill:${on?'var(--accent)':past?'var(--ink)':'var(--panel)'};stroke:${on?'var(--accent)':'var(--muted)'};stroke-width:1.2"/>`});
    /* cursor */
    const cx=X(t);
    s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${C.y0-2}" y2="${ay-8}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:3 3;opacity:.8"/>`;
    const tag=yr==null?'c. 400 BC':String(Math.round(yr)),tw=tag.length*7+12,tx=clamp(cx-tw/2,ax0,ax1-tw);
    s+=`<rect x="${f1(tx)}" y="${ay+22}" width="${tw}" height="17" rx="8" style="fill:var(--accent)"/><text x="${f1(tx+tw/2)}" y="${ay+34}" class="t-xs t-mid" style="fill:var(--panel);font-weight:600">${tag}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);setSt(ph);
    $('#hiNote').innerHTML=noteHTML(STEPS[ph]);
    $('#hiEvent').innerHTML=`<b>${e.lbl} · ${e.who}</b> ${e.txt}`;
    $$('#hiYears [data-hiy]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.hiy===ei));
  }
  const stop=playWire(rg,$('#hiPlay'),draw,42000,'Replay','history');

  /* year chips: jump to an event */
  $('#hiYears').innerHTML=EV.map((v,i)=>`<button class="tag" data-hiy="${i}" aria-pressed="false" title="${v.head.replace(/"/g,'&quot;')}">${v.lbl} · ${v.chip}</button>`).join('');
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hiy]');if(!b)return;stop();const u=EV[+b.dataset.hiy].u+.003;rg.value=u;draw(u)});
  $$('[data-hinames]').forEach(b=>b.addEventListener('click',()=>{names=b.dataset.hinames;$$('[data-hinames]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const ei=evAt(+rg.value);if(!EV[ei].k){stop();const u=U(1986)+.003;rg.value=u}draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- who was who ---------- */
  const WHO=[
    ['Edvard Ehlers','1901 · Denmark','Danish dermatologist','In 1901 Ehlers recognised the condition as a distinct entity, the first half of its name. <sup class="c" data-ref="Parapia2008,Forghani2019" title="Source 166,358">166,358</sup>'],
    ['Henri-Alexandre Danlos','1908 · France','French dermatologist','In 1908 Danlos suggested that skin extensibility and fragility were the cardinal features. The name "Ehlers-Danlos syndrome" followed in 1936, proposed by Frederick Parkes-Weber. <sup class="c" data-ref="Parapia2008,Forghani2019" title="Source 166,358">166,358</sup>'],
    ['Beighton','1969 to 1998','first author of the score and of two classifications','Beighton\'s 1973 study of 1,083 Tswana Africans gave the nine-point Beighton score. Beighton was also first author of the Berlin (1988) and Villefranche (1998) nosologies. <sup class="c" data-ref="Beighton1973,Clinch2011,Beighton1988,Beighton1998" title="Source 33,34,35,98">33,34,35,98</sup>'],
    ['Byers','1997 to 2020','vascular EDS and collagen genes','Byers and colleagues traced arthrochalasia to exon 6 of COL1A1 and COL1A2 (1997) and described 220 index patients with vascular EDS (2000). Byers was first author of the 2017 vEDS consensus, which recommends confirming a COL3A1 variant before giving the diagnosis. <sup class="c" data-ref="Byers1997,Pepin2000,Byers2017" title="Source 66,67,363">66,67,363</sup>'],
    ['Malfait','2017 and 2020','the International Classification','Malfait was first author of the 2017 International Classification, which recognises 13 types, and of the 2020 primer that counts 14 types caused by variants in 20 genes. <sup class="c" data-ref="Malfait2017,Malfait2020" title="Source 291,292">291,292</sup>'],
    ['Grahame','1998 to 2003','joint hypermobility syndrome','Grahame was first author of the Brighton 1998 criteria for joint hypermobility syndrome (published 2000) and co-author of a five-part questionnaire: two or more "yes" answers had 84% sensitivity and 89% specificity for hypermobility. <sup class="c" data-ref="Grahame2000,Hakim2003" title="Source 187,196">187,196</sup>']];
  $('#hiWho').innerHTML=WHO.map((w,i)=>`<div class="fc-wrap"><button class="fc" aria-pressed="false" aria-label="${w[0]}: turn the card over"><div class="face front"><small>Card ${i+1} of ${WHO.length}</small><span class="yr">${w[1]}</span><p>${w[0]}</p><span class="stage-cap">${w[2]}</span><small class="flip">Tap to turn</small></div><div class="face back"><small>${w[0]}</small><p>${w[3]}</p></div></button></div>`).join('');
  $$('#hiWho .fc').forEach(c=>c.addEventListener('click',()=>{const on=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',on);c.classList.toggle('flip',on)}));

  /* the zebra emblem */
  $('#hiZebra').innerHTML=zebra(32,32,30,{id:'hiZbCard'});
};
/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · The syndromes",2:"Part 2 · Diagnosis",3:"Part 3 · Body systems",4:"Part 4 · Treatment",5:"Part 5 · Living with EDS"};
const RV_FC=[
 /* ---- Part 1: the syndromes, collagen, genes and history ---- */
 [1,`How many EDS types does the 2017 International Classification recognise, and what does a definite diagnosis need?`,`13 types. For every type except hypermobile EDS, a definite diagnosis needs the causative genetic variant <sup class="c" data-ref="Malfait2017" title="Source 291">291</sup>.`],
 [1,`Which EDS type has no known gene?`,`Hypermobile EDS (hEDS). It is a clinical diagnosis made with the 2017 criteria <sup class="c" data-ref="Malfait2017,Malfait2020" title="Source 291,292">291,292</sup>.`],
 [1,`How common is diagnosed EDS or joint hypermobility syndrome in Wales?`,`194.2 per 100,000 in 2016/17, about 1 in 500, or around 10 people in a GP practice of 5,000 <sup class="c" data-ref="Demmler2019" title="Source 119">119</sup>.`],
 [1,`How rare is vascular EDS, and which gene causes it?`,`About 1 in 50,000 to 1 in 200,000; heterozygous pathogenic variants in COL3A1, which encodes type III procollagen <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>.`],
 [1,`Classical EDS: how common, and which genes?`,`About 1 in 20,000; autosomal dominant, mostly COL5A1 or COL5A2 (type V collagen) <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>.`],
 [1,`Why must every third residue of a collagen chain be glycine?`,`Only glycine is small enough to fit in the crowded centre of the triple helix, giving the repeat Xaa-Yaa-Gly <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>.`],
 [1,`In which direction does the triple helix fold, and what does a glycine substitution do?`,`From the C-terminus toward the N-terminus. A glycine substitution stalls folding at that point, and delayed folding leads to overmodification of the chains <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>.`],
 [1,`Which enzymes cut the propeptides off procollagen?`,`BMP-1 is the procollagen C-proteinase <sup class="c" data-ref="Kessler1996" title="Source 244">244</sup>; ADAMTS-2 is the procollagen I N-proteinase, and its loss causes dermatosparaxis EDS <sup class="c" data-ref="Colige1999" title="Source 99">99</sup>.`],
 [1,`Arthrochalasia and dermatosparaxis EDS block the same step. How do they differ?`,`Arthrochalasia removes the N-proteinase cleavage site in the substrate (exon 6 of COL1A1 or COL1A2); dermatosparaxis removes the enzyme, ADAMTS-2 <sup class="c" data-ref="Byers1997,Colige1999" title="Source 66,99">66,99</sup>.`],
 [1,`What proportion of people meeting all major classical EDS criteria have a type V collagen defect?`,`Over 90% <sup class="c" data-ref="Symoens2012" title="Source 456">456</sup>.`],
 [1,`In vascular EDS, what is the commonest kind of COL3A1 variant?`,`A glycine substitution; vEDS is autosomal dominant <sup class="c" data-ref="Frank2015,Demirdas2024" title="Source 118,169">118,169</sup>.`],
 [1,`How do COL3A1 null (haploinsufficient) variants change the course of vEDS?`,`The first complication comes almost 15 years later than with missense or exon-skipping variants, and complications are almost all vascular <sup class="c" data-ref="Leistritz2011" title="Source 262">262</sup>.`],
 [1,`Which urine test helps confirm PLOD1-kyphoscoliotic EDS?`,`A raised urinary deoxypyridinoline to pyridinoline ratio. FKBP14-kEDS has normal pyridinolines and often hearing loss <sup class="c" data-ref="RohrbachGR-kEDS,Baumann2012" title="Source 30,390">30,390</sup>.`],
 [1,`Which genes cause periodontal EDS, and what sign is pathognomonic?`,`C1R or C1S, which encode subunits of complement C1; a lack of attached gingiva is pathognomonic <sup class="c" data-ref="KapfererSeebacher2016,KapfererSeebacher2021" title="Source 238,239">238,239</sup>.`],
 [1,`Classical-like EDS type 1 (TNXB): how is it inherited, and what is missing from the skin?`,`Autosomal recessive; the skin is hyperextensible but has no atrophic scars <sup class="c" data-ref="Schalkwijk2001,Demirdas2017" title="Source 117,413">117,413</sup>.`],
 [1,`What is the chance that a child inherits a dominant or a recessive type of EDS?`,`Dominant: 1 in 2 for each child of an affected parent. Recessive: 1 in 4 for each child of two carrier parents <sup class="c" data-ref="Malfait2024GeneReviews,RohrbachGR-kEDS" title="Source 293,390">293,390</sup>.`],
 [1,`Does a negative family history rule out vascular EDS?`,`No. Around half of cases arise from a new (de novo) variant <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>.`],
 [1,`Can prenatal or preimplantation testing be offered for hEDS?`,`No: no gene is known. It is possible for vEDS and cEDS once the familial variant is known <sup class="c" data-ref="Byers2025GeneReviews,Hakim2024GeneReviews" title="Source 68,199">68,199</sup>.`],
 [1,`At one US clinic, how many of 907 people referred for suspected hEDS met the 2017 criteria, and what did genetic testing add?`,`178 (19.6%) met the criteria, and 47 of those 178 (26.4%) had an alternative or additional diagnosis found by genetic testing; referral bias may inflate this <sup class="c" data-ref="Forghani2025" title="Source 167">167</sup>.`],
 [1,`Who were Ehlers and Danlos?`,`Edvard Ehlers, a Danish dermatologist (1901), and Henri-Alexandre Danlos, a French dermatologist (1908) <sup class="c" data-ref="Parapia2008" title="Source 358">358</sup>.`],
 [1,`Berlin and Villefranche: how many types did each recognise?`,`Berlin (1986, published 1988): 11 Roman-numeral types. Villefranche (1997, published 1998): 6 named types <sup class="c" data-ref="Forghani2019,Beighton1998" title="Source 35,166">35,166</sup>.`],
 [1,`Why is the zebra the EDS symbol?`,`From the teaching "when you hear hoofbeats, think of horses, not zebras": people with rare diseases use it to say the rare diagnosis is sometimes the right one <sup class="c" data-ref="Park2025,Bashe2025" title="Source 28,359">28,359</sup>.`],

 /* ---- Part 2: diagnosis ---- */
 [2,`What are the five Beighton manoeuvres?`,`Little finger back to 90° or more, thumb to the forearm, elbow and knee hyperextension of 10° or more (each scored on both sides), and palms flat on the floor with knees straight (1 point): 9 points <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>.`],
 [2,`What are the 2017 age cut-offs for generalised joint hypermobility?`,`6 or more for prepubertal children and adolescents, 5 or more from puberty to age 50, and 4 or more over 50 <sup class="c" data-ref="Tofts2023,Fairweather2025" title="Source 147,464">147,464</sup>.`],
 [2,`What is the five-part questionnaire (5PQ), and when is it positive?`,`Five yes/no questions about present and past hypermobility. Two or more "yes" answers gave 84% sensitivity and 89% specificity in its development cohort <sup class="c" data-ref="Hakim2003" title="Source 196">196</sup>.`],
 [2,`When can the 5PQ rescue Criterion 1?`,`When the Beighton score is one point below the age- and sex-specific cut-off and the 5PQ is 2 or more <sup class="c" data-ref="Thwaites2022,Malfait2017" title="Source 291,460">291,460</sup>.`],
 [2,`What does the 2017 hEDS diagnosis require?`,`All three criteria. Criterion 2 needs 2 of 3 features (A, B, C), and Feature A needs 5 of 12 items <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`],
 [2,`What are the three options for Feature C?`,`Pain in 2 or more limbs daily for 3 months or more; chronic widespread pain for 3 months or more; or atraumatic recurrent dislocations or frank instability <sup class="c" data-ref="Thwaites2022" title="Source 460">460</sup>.`],
 [2,`What does Criterion 3 exclude?`,`Unusual skin fragility; other heritable and acquired connective tissue disorders, including autoimmune rheumatological conditions; and alternative diagnoses that cause hypermobility through hypotonia or laxity <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`],
 [2,`Someone with lupus is assessed for hEDS. Which features may count?`,`Only Features A and B, and both are needed; Feature C cannot be counted <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>.`],
 [2,`Name the four subtypes of hypermobility spectrum disorder.`,`Generalised, peripheral, localised and historical. Each needs joint hypermobility plus at least one secondary musculoskeletal manifestation <sup class="c" data-ref="Carroll2023,Castori2017" title="Source 72,78">72,78</sup>.`],
 [2,`When can a child be diagnosed with hEDS?`,`Not before biological maturity, according to the paediatric working group; children's GJH uses a Beighton score of 6 or more <sup class="c" data-ref="Tofts2023" title="Source 464">464</sup>.`],
 [2,`What are the skin hyperextensibility cut-offs?`,`More than 1.5 cm at the distal forearm and back of the hand; 3 cm at the neck, elbows and knees <sup class="c" data-ref="Ritelli2020C,Stembridge2023" title="Source 385,449">385,449</sup>.`],
 [2,`What are the four vEDS "minimal criteria" that should prompt testing?`,`Family history of vEDS, arterial rupture or dissection under 40, unexplained sigmoid colon rupture, or spontaneous pneumothorax with other vEDS features <sup class="c" data-ref="Wang2026OJRD" title="Source 496">496</sup>.`],
 [2,`Why should vEDS not be diagnosed on clinical grounds alone?`,`In one multi-institution series, nearly 10% of people diagnosed with vEDS had non-pathogenic COL3A1 changes <sup class="c" data-ref="Shalhub2020" title="Source 430">430</sup>; the consensus asks for the causative variant first <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>.`],
 [2,`What are the cardinal features of Marfan syndrome?`,`Aortic root aneurysm and ectopia lentis; a systemic score of 7 or more out of 20 is significant <sup class="c" data-ref="Loeys2010,Pollock2021" title="Source 276,368">276,368</sup>.`],
 [2,`What is the Loeys-Dietz triad?`,`Arterial tortuosity and aneurysms, hypertelorism, and bifid uvula or cleft palate <sup class="c" data-ref="Loeys2006" title="Source 275">275</sup>.`],
 [2,`How reliable is the Beighton score between examiners?`,`Reported kappa ranges from about 0.4 to 0.8; a three-phase study found 0.74 for diagnosing GJH <sup class="c" data-ref="Malek2021C,Juul-Kristensen2007" title="Source 230,288">230,288</sup>.`],
 [2,`Which major joints does the Beighton score leave out?`,`Shoulders, hips and ankles. Two-thirds of the scored joints are in the upper limbs, and the score shows whether hypermobility is present, not how severe it is <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>.`],
 [2,`How common is a Beighton score of 4 or more in UK 14-year-olds?`,`27.5% of girls and 10.6% of boys, so joint hypermobility alone is common and is not a diagnosis <sup class="c" data-ref="Clinch2011" title="Source 98">98</sup>.`],

 /* ---- Part 3: body systems ---- */
 [3,`How strong are the knees of women with hEDS?`,`Knee strength and endurance were 30% to 49% lower than in controls, with similar muscle mass <sup class="c" data-ref="Rombaut2012Strength" title="Source 396">396</sup>.`],
 [3,`What did pressure-pain thresholds show in hEDS?`,`2.9 vs 5.2 kg/cm² in controls, even at pain-free sites: generalised hyperalgesia <sup class="c" data-ref="Rombaut2015" title="Source 398">398</sup>.`],
 [3,`What are the three proposed phases of hEDS natural history?`,`Hypermobility, then pain, then stiffness <sup class="c" data-ref="Castori2010" title="Source 74">74</sup>.`],
 [3,`How common is severe fatigue in EDS?`,`More than three-quarters of 273 people with EDS had severe fatigue <sup class="c" data-ref="Voermans2010Fatigue" title="Source 491">491</sup>.`],
 [3,`How common is orthostatic intolerance in hEDS?`,`74.4% vs 34.3% in controls; 41.0% of a tilt subsample had postural tachycardia <sup class="c" data-ref="DeWandele2016" title="Source 124">124</sup>.`],
 [3,`What did skin biopsy show in a prospective hEDS study?`,`Small-fibre neuropathy in 19 of 31 (61%) <sup class="c" data-ref="Igharo2023" title="Source 218">218</sup>. Another study found no nerve damage and favours central sensitisation, so this is unresolved <sup class="c" data-ref="DiStefano2016" title="Source 128">128</sup>.`],
 [3,`What is the skin signature of classical EDS?`,`Hyperextensible skin with widened atrophic scars, present in 92% of molecularly confirmed cases; papyraceous scars in 65.3% <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>.`],
 [3,`What does vascular EDS skin look like?`,`Thin and translucent with visible veins, and not markedly hyperextensible <sup class="c" data-ref="Stembridge2023" title="Source 449">449</sup>.`],
 [3,`Why do people with EDS bruise easily?`,`Fragile capillaries and perivascular tissue. Clotting tests are usually normal; only the Hess capillary fragility test may be abnormal <sup class="c" data-ref="DePaepe2004" title="Source 120">120</sup>.`],
 [3,`How is POTS defined?`,`A sustained heart-rate rise of at least 30 beats/min within 10 minutes of standing (at least 40 at ages 12 to 19), without orthostatic hypotension <sup class="c" data-ref="Sheldon2015,Vernino2021" title="Source 431,488">431,488</sup>.`],
 [3,`What share of a POTS cohort met the 2017 hEDS criteria?`,`31% of 91, and a further 24% had GJH without meeting them <sup class="c" data-ref="Miller2020" title="Source 304">304</sup>.`],
 [3,`What laboratory rise confirms mast-cell activation?`,`An event-related serum tryptase rise of at least 20% + 2 ng/mL over baseline <sup class="c" data-ref="Valent2019IAAI" title="Source 473">473</sup>.`],
 [3,`How common is joint hypermobility in functional versus organic GI disorders?`,`39.0% vs 27.5% in clinic patients (adjusted OR 1.51) <sup class="c" data-ref="Fikree2015" title="Source 162">162</sup>.`],
 [3,`When do complications start in vascular EDS?`,`25% of index patients had a first complication by age 20, and more than 80% by 40 <sup class="c" data-ref="Pepin2000" title="Source 363">363</sup>.`],
 [3,`What was median survival in vEDS in the two Pepin cohorts?`,`48 years (2000) and 51 years (2014), lower in men. These are population statistics, not a personal prognosis <sup class="c" data-ref="Pepin2000,Pepin2014" title="Source 363,364">363,364</sup>.`],
 [3,`Which arterial bed is most often affected in genetically confirmed vEDS?`,`The mesenteric arteries (31.7%), then cerebrovascular and iliac (16.5% each) <sup class="c" data-ref="Shalhub2019JVS" title="Source 429">429</sup>.`],
 [3,`What is the classic vEDS bowel event, and which emergency operation does the review favour?`,`Spontaneous sigmoid colon perforation; Hartmann's procedure, because reperforation was more frequent after anastomosis <sup class="c" data-ref="ElMasri2018" title="Source 142">142</sup>.`],
 [3,`What is the evidence for craniocervical instability surgery in EDS?`,`Weak: no validated imaging criteria, 78 surgical patients in 16 articles, evidence levels III to V <sup class="c" data-ref="Lohkamp2022" title="Source 278">278</sup>.`],
 [3,`Which neurodevelopmental diagnoses are more common with EDS in Swedish registers?`,`Autism (RR 7.4) and ADHD (RR 5.6); siblings without EDS also had raised ADHD risk <sup class="c" data-ref="Cederlof2016" title="Source 81">81</sup>.`],

 /* ---- Part 4: treatment ---- */
 [4,`What is the cornerstone of hEDS/HSD care, and how strong is the evidence?`,`Exercise-based physiotherapy; controlled-trial evidence of benefit over comparators is weak <sup class="c" data-ref="Palmer2021" title="Source 357">357</sup>.`],
 [4,`Is there a specific medical or genetic therapy for any EDS type?`,`No. Management is a care team plus integrated rehabilitation <sup class="c" data-ref="Malfait2020" title="Source 292">292</sup>.`],
 [4,`Heavy versus light shoulder training in HSD: what happened?`,`HEAVY beat LIGHT at 16 weeks (WOSI −174.5, smaller than the minimal important difference of 252) but not at 1 year <sup class="c" data-ref="Liaghat2022BJSM,Liaghat2024BJSM" title="Source 268,269">268,269</sup>.`],
 [4,`Did heavy shoulder loading flare pain in HSD?`,`No: exercise-induced pain stayed below 0.5/10 <sup class="c" data-ref="Liaghat2025" title="Source 271">271</sup>.`],
 [4,`What did the Bendy Study find in 119 hypermobile children?`,`An 8-week physiotherapy plus occupational therapy programme added no benefit over standard advice at 12 months <sup class="c" data-ref="Bale2019" title="Source 25">25</sup>.`],
 [4,`How common is fear of movement in JHS/hEDS?`,`93% of 42 people scored above the Tampa Scale cut-off <sup class="c" data-ref="Celletti2013" title="Source 82">82</sup>.`],
 [4,`What did inspiratory muscle training do in women with hEDS?`,`Six weeks raised 6-minute walk distance from 455 to 515 m <sup class="c" data-ref="Reychler2019" title="Source 379">379</sup>.`],
 [4,`What did the BBEST trial show?`,`Celiprolol in 53 people with vEDS: arterial events 20% vs 50% at a mean 47 months (HR 0.36). Open-label, stopped early for benefit <sup class="c" data-ref="Ong2010" title="Source 345">345</sup>.`],
 [4,`What did ARCADE add to celiprolol?`,`Irbesartan: the composite arterial outcome was 27.6% vs 53.6% at 2 years (HR 0.42) <sup class="c" data-ref="Jeunemaitre2025" title="Source 226">226</sup>.`],
 [4,`Is celiprolol FDA-approved?`,`No; the ACC/AHA judged the data insufficient for approval <sup class="c" data-ref="Isselbacher2022,openFDA-Celiprolol" title="Source 219,346">219,346</sup>.`],
 [4,`Why is diagnostic arteriography avoided in vEDS?`,`A historical series reported a 67% complication rate <sup class="c" data-ref="Cikrit1987" title="Source 94">94</sup>; GeneReviews keeps it for finding life-threatening bleeding before surgery <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>.`],
 [4,`What did the lidocaine trial show in EDS?`,`Equal numbness at 5 minutes, but at 30 minutes 53% vs 80% of controls were still numb, suggesting a shorter duration <sup class="c" data-ref="Bourne2026RAPM" title="Source 54">54</sup>.`],
 [4,`How often do people with EDS recall dental local anaesthetic failing?`,`88% vs 33% without EDS in a survey <sup class="c" data-ref="Schubart2019LA" title="Source 419">419</sup>.`],
 [4,`What does HRS 2015 say about fluid and salt in POTS?`,`Up to 2–3 L of water and 10–12 g NaCl daily "may be considered" (Class IIb) <sup class="c" data-ref="Sheldon2015" title="Source 431">431</sup>.`],
 [4,`Why "less is more" for propranolol in POTS?`,`20 mg improved symptoms more than 80 mg, although 80 mg lowered heart rate more <sup class="c" data-ref="Raj2009Circ" title="Source 373">373</sup>.`],
 [4,`How many medicines are FDA-approved for POTS?`,`None <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>.`],
 [4,`How are classical EDS wounds closed?`,`In two layers without tension, with skin stitches left in about twice as long as usual <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>.`],
 [4,`How often were opioids prescribed to adults with EDS in US claims?`,`62% vs 34.1% of controls <sup class="c" data-ref="Schubart2019Opioid" title="Source 420">420</sup>.`],

 /* ---- Part 5: living with EDS ---- */
 [5,`How long did people wait for an hEDS diagnosis in the Global Registry survey?`,`10.39 years on average, after seeing 15.6 clinicians <sup class="c" data-ref="Halverson2023" title="Source 204">204</sup>.`],
 [5,`How much later were women diagnosed than men in Wales?`,`8.5 years later on average <sup class="c" data-ref="Demmler2019" title="Source 119">119</sup>.`],
 [5,`What is the pregnancy-related death rate in vEDS pedigrees?`,`30 of 565 deliveries (5.3%), a population figure <sup class="c" data-ref="Murray2014GenetMed" title="Source 323">323</sup>.`],
 [5,`How common is precipitate (3 hours or less) birth in hEDS/HSD perinatal guidance?`,`28–36% <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>.`],
 [5,`What should someone with vEDS carry, and when should they seek care?`,`A MedicAlert, emergency letter or vEDS "passport"; sudden, unexplained pain means urgent care <sup class="c" data-ref="Byers2025GeneReviews,Byers2017" title="Source 67,68">67,68</sup>.`],
 [5,`What should a spontaneous bowel perforation in a young person prompt?`,`Genetic testing for vEDS <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup>.`],
 [5,`Which activities does GeneReviews advise avoiding in vEDS?`,`Collision sports, heavy lifting and weight training with extreme lifting <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>.`],
 [5,`Do hypermobile athletes get more knee injuries?`,`In contact sports, yes: combined OR 4.69; ankle injury risk was not raised <sup class="c" data-ref="Pacey2010" title="Source 350">350</sup>.`],
 [5,`Which school task was hardest for children with EDS, according to parents?`,`Keeping up with handwriting (71%) <sup class="c" data-ref="Wesley2021" title="Source 504">504</sup>.`],
 [5,`Why does perinatal guidance ask nurses to document early bruising in infants?`,`To avoid false accusations of maltreatment <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>.`],
 [5,`How can POTS usually be identified at the bedside?`,`By recording heart rate and blood pressure lying down and during a 10-minute stand <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>.`],
 [5,`How many people with EDS came to question the reality of their own pain?`,`73% of survey respondents in a Europe and North America study; the authors recommend "epistemic humility" from clinicians <sup class="c" data-ref="Halverson2025" title="Source 205">205</sup>.`]
];
const RV_MN=[
 ["Four pairs and a bow","memory aid",`Beighton: little finger, thumb, elbow and knee on both sides (4 pairs × 2 points) plus one forward bow with palms flat (1 point) = 9 <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>.`],
 ["6-5-4, count down with age","memory aid",`Criterion 1 cut-offs: 6 or more before puberty and in adolescents, 5 or more from puberty to 50, 4 or more over 50 <sup class="c" data-ref="Tofts2023,Fairweather2025" title="Source 147,464">147,464</sup>.`],
 ["3 gates · 2 of 3 · 5 of 12","memory aid",`hEDS needs all 3 criteria; Criterion 2 needs 2 of Features A, B and C; Feature A needs 5 of its 12 items <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`],
 ["A body, B blood relative, C complaints","memory aid",`Feature A: systemic signs of a connective tissue disorder. Feature B: a first-degree relative who meets the criteria. Feature C: pain or instability <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`],
 ["Horses, not zebras","well known",`The teaching saying the EDS community turned around: sometimes the rare diagnosis is the right one <sup class="c" data-ref="Park2025,Bashe2025" title="Source 28,359">28,359</sup>.`],
 ["Sudden pain, show the card","memory aid",`In vEDS, sudden unexplained pain needs immediate care, and the person carries a MedicAlert, emergency letter or vEDS passport <sup class="c" data-ref="Byers2025GeneReviews,Byers2017" title="Source 67,68">67,68</sup>.`],
 ["No pokes, no scopes, no needless knives","memory aid",`vEDS: arteriography only to find life-threatening bleeding before surgery; no routine colonoscopy without a clear reason; elective surgery only for substantial benefit <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>.`],
 ["30 standing, 40 if teen","memory aid",`POTS: heart rate up at least 30 beats/min within 10 minutes of standing, at least 40 at ages 12 to 19, without orthostatic hypotension <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>.`],
 ["20% + 2","well known",`The consensus mast-cell activation rule: an event-related tryptase rise of at least 20% plus 2 ng/mL over baseline <sup class="c" data-ref="Valent2019IAAI" title="Source 473">473</sup>.`],
 ["Bend, hurt, stiffen","memory aid",`The proposed hEDS natural history: a hypermobility phase, a pain phase, then a stiffness phase <sup class="c" data-ref="Castori2010" title="Source 74">74</sup>.`]
];
const RV_STEPS=[
 {from:0,at:.15,k:'Item 1 · 2 points',t:'Little fingers',txt:`Passive dorsiflexion of the little finger at the metacarpophalangeal joint to 90° or more scores 1 point per side <sup class="c" data-ref="Thwaites2022,Malek2021C" title="Source 288,460">288,460</sup>. The dashed line marks 90°; both fingers here pass it.`,pt:'Each little finger that bends back to a right angle or further scores 1 point.',hook:'Four pairs and a bow: four paired items at 2 points each, plus 1 for the forward bend, makes 9 <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>.'},
 {from:.18,at:.33,k:'Item 2 · 2 points',t:'Thumbs',txt:`Passive apposition of the thumb to the flexor surface of the same-side forearm <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>. Each side is scored separately: here the left thumb touches and scores, the right stops short and does not.`,pt:'Sides are scored one at a time, so a total can be any number from 0 to 9.',hook:`The score was devised in 1973 on 1,083 Tswana Africans, adapted from the 1964 Carter and Wilkinson score <sup class="c" data-ref="Beighton1973,Clinch2011" title="Source 33,98">33,98</sup>.`},
 {from:.36,at:.51,k:'Item 3 · 2 points',t:'Elbows',txt:`Elbow hyperextension of 10° or more scores 1 point per side <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>. In a three-phase reliability study, item kappas were mostly above 0.80, but the fifth fingers and elbows were lower (0.60 or more) <sup class="c" data-ref="Juul-Kristensen2007" title="Source 230">230</sup>.`,pt:'The arm straightens past a straight line by at least 10 degrees.',hook:'Across studies, Beighton kappa between examiners is about 0.4 to 0.8 <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>.'},
 {from:.54,at:.68,k:'Item 4 · 2 points',t:'Knees',txt:`Knee hyperextension of 10° or more <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>. The right knee here reaches about 7°, short of the dashed 10° line: no point. The score does not test shoulders, hips or ankles, and it shows whether hypermobility is present, not how severe it is <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>.`,pt:'Nearly is not enough: the line is 10 degrees.',hook:'Two-thirds of the scored joints are in the upper limbs <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>.'},
 {from:.71,at:.81,k:'Item 5 · 1 point',t:'Forward bend',txt:`Forward flexion of the trunk so that both palms rest flat on the floor, knees locked straight and feet together, scores a single point <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>. It can be trained, as in ballet, and short hamstrings limit it: in one study 84.2% of hypermobile people (Beighton 5 or more) could not do it <sup class="c" data-ref="Malek2021C" title="Source 288">288</sup>.`,pt:'The forward bend is the only item worth one point, not two.',hook:'Total here: 2 + 1 + 2 + 1 + 1 = 7 out of 9.'},
 {from:.84,at:.97,k:'Criterion 1',t:'6-5-4 by age',txt:`The 2017 hEDS criteria read the total against age: 6 or more for prepubertal children and adolescents, 5 or more from puberty to 50, 4 or more over 50 <sup class="c" data-ref="Tofts2023,Fairweather2025" title="Source 147,464">147,464</sup>. One point short, a 5PQ of 2 or more can count <sup class="c" data-ref="Thwaites2022" title="Source 460">460</sup>. Bendiness is common: a score of 4 or more was found in 27.5% of UK 14-year-old girls and 10.6% of boys <sup class="c" data-ref="Clinch2011" title="Source 98">98</sup>.`,pt:'A high score means bendy joints, not EDS. Criterion 1 is only the first of three gates, and only a clinician can put the whole picture together.',hook:'6-5-4, count down with age.'}
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

  /* ---- mnemonic in motion: four pairs and a bow (Beighton) ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  /* the example person: max angle reached per side, the threshold, and the window of t in which the item is examined */
  const IT=[
    {nm:'Little fingers',sh:'fingers',pts:2,a:.02,b:.16,L:100,R:96,lim:90},
    {nm:'Thumbs',sh:'thumbs',pts:2,a:.2,b:.34,L:168,R:122,lim:160},
    {nm:'Elbows',sh:'elbows',pts:2,a:.38,b:.52,L:15,R:12,lim:10},
    {nm:'Knees',sh:'knees',pts:2,a:.56,b:.69,L:13,R:7,lim:10},
    {nm:'Forward bend',sh:'bend',pts:1,a:.72,b:.82}
  ];
  const side=(p,s)=>ease(s?ramp(p,.5,.98):ramp(p,0,.48));
  const pass=(it,s)=>it.pts===1?true:(s?it.R:it.L)>=it.lim;
  const got=(it,p,s)=>(it.pts===1?(s===0&&p>=.98):(side(p,s)>=.999&&pass(it,s)))?1:0;
  const txt=(x,y,c,s,st='')=>`<text class="${c}" x="${f1(x)}" y="${f1(y)}"${st?` style="${st}"`:''}>${s}</text>`;
  /* a paired item: two limbs, left above right, each bending back toward its maximum */
  function pairTile(it,p,x,y,w,h){let g='';const big=it.lim>=90;
    if(big){[0,1].forEach(s=>{const u=side(p,s),deg=-(s?it.R:it.L)*u,jy=y+h*.9,jx=x+w*(s?.66:.34),L=limb(jx,jy,w*.24,deg,{len2:Math.min(h*.58,w*.4),w:7,limit:-it.lim,arc:false,flip:!!s});g+=L.svg;
        if(u>.05)g+=txt(L.end[0],L.end[1]-8,'t-sm t-mid',Math.round(-deg)+'°','fill:var(--ink)');
        const ok=got(it,p,s);g+=txt(s?x+w-6:x+6,jy+4,s?'t-lbl t-end':'t-lbl',s?'R':'L',ok?'fill:var(--good)':'');
        if(u>.999)g+=txt(s?x+w-6:x+6,jy-14,s?'t-xs t-end':'t-xs',ok?'+1':'0',ok?'fill:var(--good);font-weight:700':'')});
      return g}
    [0,1].forEach(s=>{const u=side(p,s),deg=-(s?it.R:it.L)*u,jy=y+h*(s?.86:.5),jx=x+w*(big?.52:.6),len=w*(big?.36:.44),l2=w*(big?.3:.34);
      const L=limb(jx,jy,len,deg,{len2:l2,w:big?7:11,limit:-it.lim,arc:big&&u>.05});g+=L.svg;
      if(!big&&u>.05)g+=txt(L.end[0]-4,L.end[1]-12,'t-sm t-end',Math.round(-deg)+'°','fill:var(--ink)');
      const ok=got(it,p,s);g+=txt(x+6,jy+4,'t-lbl',s?'R':'L',ok?'fill:var(--good)':'');
      if(u>.999)g+=txt(x+6,jy+(big?-14:-12),'t-xs',ok?'+1':'0',ok?'fill:var(--good);font-weight:700':'')});
    return g}
  /* thumbs: a forearm with a thumb rotating down and back toward its flexor surface */
  function thumbTile(it,p,x,y,w,h){let g='';
    [0,1].forEach(s=>{const u=side(p,s),th=60+((s?it.R:it.L)-60)*u,fy=y+h*(s?.8:.44),x0=x+w*.12,hx=x+w*.84,tl=w*.42;
      g+=`<path d="M${f1(x0)} ${f1(fy)}L${f1(hx)} ${f1(fy)}" style="fill:none;stroke:var(--skin-line);stroke-width:13.4;stroke-linecap:round"/><path d="M${f1(x0)} ${f1(fy)}L${f1(hx)} ${f1(fy)}" style="fill:none;stroke:var(--skin-epi);stroke-width:11;stroke-linecap:round"/>`;
      const a=th*Math.PI/180,bx=hx-8,by=fy+3,tx=bx+Math.cos(a)*tl,ty=by+Math.sin(a)*tl*.42;
      g+=`<path d="M${f1(bx)} ${f1(by)}L${f1(tx)} ${f1(ty)}" style="fill:none;stroke:var(--skin-line);stroke-width:8.4;stroke-linecap:round"/><path d="M${f1(bx)} ${f1(by)}L${f1(tx)} ${f1(ty)}" style="fill:none;stroke:var(--skin-epi);stroke-width:6;stroke-linecap:round"/>`;
      const ok=got(it,p,s);
      if(u>.999){g+=ok?`<circle cx="${f1(tx)}" cy="${f1(ty)}" r="5.5" style="fill:none;stroke:var(--good);stroke-width:2"/>`:`<path d="M${f1(tx)} ${f1(ty+3)}L${f1(tx)} ${f1(fy+8)}" style="stroke:var(--accent);stroke-width:1.4;stroke-dasharray:2 2"/>`;
        g+=txt(x+w-6,fy-12,'t-xs t-end',ok?'touches: +1':'gap: 0',ok?'fill:var(--good);font-weight:700':'')}
      g+=txt(x+6,fy+4,'t-lbl',s?'R':'L',ok?'fill:var(--good)':'')});
    return g}
  /* forward bend: straight legs, the trunk folds forward until the palms rest on the floor */
  function bendTile(it,p,x,y,w,h){const u=ease(ramp(p,0,.95)),fl=y+h-8,cx=x+w*.36,leg=Math.min(66,h*.42),hip=fl-leg,tr=leg*.66,a=(-90+130*u)*Math.PI/180;
    const sx=cx+Math.cos(a)*tr,sy=hip+Math.sin(a)*tr,hx=cx+Math.cos(a)*(tr+11),hy=hip+Math.sin(a)*(tr+11),arm=leg*.62,hand=Math.min(sy+arm,fl-2),flat=sy+arm>=fl-2;
    let g=`<line x1="${f1(x+8)}" x2="${f1(x+w-8)}" y1="${f1(fl)}" y2="${f1(fl)}" style="stroke:var(--line);stroke-width:2"/>`;
    const st='fill:none;stroke:var(--ink);stroke-width:4;stroke-linecap:round;stroke-linejoin:round';
    g+=`<path d="M${f1(cx)} ${f1(fl)}L${f1(cx)} ${f1(hip)}L${f1(sx)} ${f1(sy)}" style="${st}"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="6" style="fill:var(--ink)"/>`;
    g+=`<path d="M${f1(sx)} ${f1(sy)}L${f1(sx-4)} ${f1(hand)}" style="${st};stroke-width:3;stroke:var(--muted)"/><path d="M${f1(cx-2)} ${f1(fl)}L${f1(cx+9)} ${f1(fl)}" style="${st};stroke-width:3"/>`;
    if(flat)g+=`<path d="M${f1(sx-6)} ${f1(fl-1.5)}L${f1(sx+12)} ${f1(fl-1.5)}" style="stroke:var(--good);stroke-width:4;stroke-linecap:round"/>`;
    g+=txt(cx-7,fl-14,'t-xs t-end','knees');g+=txt(cx-7,fl-4,'t-xs t-end','straight');
    if(p>=.98)g+=txt(x+w-6,y+34,'t-xs t-end','palms flat: +1','fill:var(--good);font-weight:700');
    return g}
  function draw(t){
    const N=vb(svg,'720 380','400 662');
    const P=IT.map(it=>ramp(t,it.a,it.b));
    const pts=IT.map((it,k)=>got(it,P[k],0)+(it.pts===2?got(it,P[k],1):0)),score=pts.reduce((a,b)=>a+b,0);
    const cut=ramp(t,.84,.93);
    let s='';
    /* tiles */
    const TW=N?190:134,TH=N?150:172;
    IT.forEach((it,k)=>{const x=N?6+(k%2)*198:6+k*143,y=N?6+Math.floor(k/2)*158:8,act=P[k]>0&&P[k]<1;
      s+=`<rect x="${x}" y="${y}" width="${TW}" height="${TH}" rx="10" style="fill:var(${act?'--dx-soft':'--panel-2'});stroke:var(${act?'--dx':'--line'});stroke-width:${act?1.8:1}"/>`;
      s+=txt(x+8,y+17,'t-lbl',it.nm)+txt(x+TW-8,y+17,'t-xs t-end',`${pts[k]}/${it.pts}`,pts[k]?'fill:var(--good);font-weight:700':'');
      const sub=it.pts===1?'palms to floor':it.lim>=160?'thumb to forearm':it.lim>=90?`≥ ${it.lim}° back`:`≥ ${it.lim}° past straight`;
      s+=txt(x+8,y+31,'t-xs',sub);
      const iy=y+30,ih=TH-34;
      s+=k===1?thumbTile(it,P[k],x,iy,TW,ih):k===4?bendTile(it,P[k],x,iy,TW,ih):pairTile(it,P[k],x,iy,TW,ih)});
    /* score pips, grouped 2-2-2-2-1 */
    const px0=N?18:14,py=N?506:226,ps=N?21:27,gg=N?14:16,pr=N?8:10.5;let xx=px0;
    s+=txt(px0-4,py-20,'t-lbl','Beighton score');
    IT.forEach((it,k)=>{const x0=xx;for(let j=0;j<it.pts;j++){const on=j<pts[k];s+=`<circle cx="${f1(xx+pr)}" cy="${py}" r="${pr}" style="fill:var(${on?'--good':'--field'});stroke:var(${on?'--good':'--line'});stroke-width:1.6"/>`;xx+=ps}
      s+=txt((x0+xx-ps+2*pr)/2,py+pr+14,'t-xs t-mid',it.sh);xx+=gg});
    if(N){s+=`<rect x="204" y="322" width="190" height="150" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`+txt(299,360,'t-lbl t-mid','Total')+`<text class="t-big t-mid" x="299" y="412" style="font-size:44px">${score}/9</text>`+txt(299,446,'t-xs t-mid','4 pairs × 2 + 1 bow')}
    else s+=`<text class="t-big" x="${f1(xx+6)}" y="${py+12}" style="font-size:34px">${score}/9</text>`;
    if(!N)s+=txt(14,py+50,'t-sm','Four pairs and a bow: 4 × 2 + 1 = 9');
    /* the 6-5-4 ladder */
    const LX=N?14:420,LY=N?562:216,cw=N?20:17,lab=N?120:108;
    s+=`<g style="opacity:${f1(.45+.55*Math.max(cut,ramp(t,.02,.1)*.4))}">`+txt(LX,LY-12,'t-lbl','6-5-4: the Criterion 1 cut-off by age');
    [['Child or teen',6],['Puberty to 50',5],['Over 50',4]].forEach(([nm,th],r)=>{const y=LY+r*(N?30:34),ok=score>=th;
      s+=txt(LX,y+13,'t-sm',nm,cut>.5?'fill:var(--ink)':'');
      for(let j=0;j<9;j++){const on=j<score;s+=`<rect x="${f1(LX+lab+j*cw)}" y="${y}" width="${f1(cw-3)}" height="18" rx="3" style="fill:var(${on?(ok?'--good-soft':'--warn-soft'):'--field'});stroke:var(--line);stroke-width:.8"/>`}
      const tx=LX+lab+th*cw-1.5;s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${y-4}" y2="${y+22}" style="stroke:var(--dx);stroke-width:2.4"/>`+txt(tx+4,y-3,'t-xs',`≥${th}`,'fill:var(--dx);font-weight:700');
      if(cut>.5)s+=txt(LX+lab+9*cw+4,y+14,'t-xs',ok?'meets':'below',ok?'fill:var(--good);font-weight:700':'fill:var(--warn);font-weight:700')});
    s+='</g>';
    if(cut>0)s+=`<g style="opacity:${f1(cut)}">`+txt(14,N?654:py+80,'t-sm','Gate 1 of 3: a score alone is never a diagnosis','fill:var(--ink)')+'</g>';
    svg.innerHTML=s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const QZ_LIST=[
 /* ---- Part 1: the syndromes ---- */
 [1,`How many EDS types does the 2017 International Classification recognise?`,[`6`,`11`,`13`,`20`],2,`13. Villefranche (1998) had 6 and Berlin (1988) had 11 <sup class="c" data-ref="Malfait2017,Forghani2019" title="Source 166,291">166,291</sup>.`],
 [1,`For which EDS type is a definite diagnosis made on clinical criteria, with no molecular confirmation?`,[`Hypermobile EDS`,`Classical EDS`,`Vascular EDS`,`Kyphoscoliotic EDS`],0,`hEDS is the only type without a known gene; all the others need the causative variant <sup class="c" data-ref="Malfait2017,Malfait2020" title="Source 291,292">291,292</sup>.`],
 [1,`Vascular EDS is caused by variants in:`,[`COL5A1`,`FBN1`,`TNXB`,`COL3A1`],3,`COL3A1, which encodes type III procollagen, a major protein of vessel walls and hollow organs <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>.`],
 [1,`Most classical EDS is caused by defects in which collagen?`,[`Type I`,`Type V`,`Type III`,`Type XII`],1,`Type V (COL5A1 or COL5A2). Over 90% of people meeting all major criteria have a type V defect <sup class="c" data-ref="Symoens2012" title="Source 456">456</sup>.`],
 [1,`In collagen, every third residue is glycine because:`,[`Glycine carries the sugars`,`Glycine forms the cross-links`,`Only glycine fits in the crowded centre of the triple helix`,`Glycine is the cleavage site for BMP-1`],2,`The triple helix packs so tightly that only glycine fits at its centre, giving the Xaa-Yaa-Gly repeat <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>.`],
 [1,`The collagen triple helix folds:`,[`From the C-terminus toward the N-terminus`,`From the N-terminus toward the C-terminus`,`From both ends at once`,`Only after secretion`],0,`From C to N. A glycine substitution stalls folding at that point <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>.`],
 [1,`Loss of ADAMTS-2 causes which EDS type?`,[`Arthrochalasia EDS`,`Dermatosparaxis EDS`,`Classical-like EDS`,`Periodontal EDS`],1,`ADAMTS-2 is the procollagen I N-proteinase; its loss causes dermatosparaxis EDS <sup class="c" data-ref="Colige1999" title="Source 99">99</sup>.`],
 [1,`Arthrochalasia EDS is caused by variants that:`,[`Abolish lysyl hydroxylase 1`,`Remove complement C1 regulation`,`Delete exon 6 of COL1A1 or COL1A2, removing the N-proteinase cleavage site`,`Remove tenascin-X`],2,`Exon 6 holds the N-proteinase cleavage site, so aEDS blocks the same step as dEDS, at the substrate rather than the enzyme <sup class="c" data-ref="Byers1997" title="Source 66">66</sup>.`],
 [1,`Which EDS type has a raised urinary deoxypyridinoline to pyridinoline ratio?`,[`FKBP14-kyphoscoliotic EDS`,`Classical EDS`,`Vascular EDS`,`PLOD1-kyphoscoliotic EDS`],3,`PLOD1-kEDS (lysyl hydroxylase 1 deficiency); FKBP14-kEDS has normal urinary pyridinolines <sup class="c" data-ref="RohrbachGR-kEDS,Baumann2012" title="Source 30,390">30,390</sup>.`],
 [1,`Periodontal EDS is caused by variants in genes for:`,[`Complement C1 subunits (C1R, C1S)`,`Type V collagen`,`Dermatan sulfate enzymes`,`Zinc transport`],0,`C1R or C1S; it is the one type outside the collagen and proteoglycan pathways <sup class="c" data-ref="KapfererSeebacher2016" title="Source 238">238</sup>.`],
 [1,`A lack of attached gingiva is pathognomonic of:`,[`Classical EDS`,`Periodontal EDS`,`Brittle cornea syndrome`,`Hypermobile EDS`],1,`Periodontal EDS. In children of affected parents it was present in all 12 who carried the familial variant and none of 7 who did not <sup class="c" data-ref="KapfererSeebacher2021" title="Source 239">239</sup>.`],
 [1,`A parent has classical EDS. What is the chance that each child inherits it?`,[`50%`,`25%`,`100%`,`It cannot be estimated`],0,`cEDS is autosomal dominant: 50% for each child <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>.`],
 [1,`About what proportion of people with vascular EDS have a new (de novo) variant?`,[`Under 5%`,`About 50%`,`About 90%`,`All of them`],1,`About half, so a negative family history does not exclude vEDS <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>.`],
 [1,`Compared with missense or exon-skipping variants, COL3A1 null (haploinsufficient) variants:`,[`Bring the first complication about 15 years earlier`,`Cause mainly bowel rupture`,`Delay the first complication by almost 15 years`,`Make no difference`],2,`The first complication comes almost 15 years later, and complications are almost all vascular <sup class="c" data-ref="Leistritz2011" title="Source 262">262</sup>.`],
 [1,`Prenatal or preimplantation genetic testing is NOT possible for:`,[`Vascular EDS`,`Classical EDS`,`Any dominant type`,`Hypermobile EDS`],3,`No gene is known for hEDS. For vEDS and cEDS it is possible once the familial variant is known <sup class="c" data-ref="Hakim2024GeneReviews,Byers2025GeneReviews" title="Source 68,199">68,199</sup>.`],
 [1,`A COL3A1 result comes back as a "variant of uncertain significance". It means:`,[`We do not know yet whether it causes disease`,`vEDS is confirmed`,`vEDS is excluded`,`The test failed`],0,`A VUS is not a diagnosis; some are later reclassified, as COL3A1 Glu>Lys variants were <sup class="c" data-ref="Ghali2019GenetMed" title="Source 181">181</sup>.`],
 [1,`Who first recognised EDS as a distinct entity in 1901?`,[`Henri-Alexandre Danlos`,`Frederick Parkes-Weber`,`Peter Beighton`,`Edvard Ehlers`],3,`Edvard Ehlers, a Danish dermatologist; Danlos followed in 1908 <sup class="c" data-ref="Parapia2008" title="Source 358">358</sup>.`],
 [1,`Berlin EDS type III corresponds in 2017 to:`,[`Hypermobile EDS`,`Vascular EDS`,`Classical EDS`,`Arthrochalasia EDS`],0,`Type III (Berlin) = hypermobility type (Villefranche) = hEDS (2017) <sup class="c" data-ref="Malek2021" title="Source 287">287</sup>.`],
 [1,`The diagnosed prevalence of EDS or joint hypermobility syndrome in Wales was about:`,[`1 in 50,000`,`1 in 5,000`,`1 in 500`,`1 in 20`],2,`194.2 per 100,000 in 2016/17, about 1 in 500 <sup class="c" data-ref="Demmler2019" title="Source 119">119</sup>.`],
 [1,`The HEDGE study aims to:`,[`Test celiprolol in hEDS`,`Whole-genome sequence 1,000 adults meeting the 2017 hEDS criteria`,`Revise the Beighton score`,`Count POTS in children`],1,`HEDGE, begun by the Ehlers-Danlos Society in 2018, is searching for the genetic basis of hEDS <sup class="c" data-ref="Douglas2026,VanDijk2024" title="Source 132,480">132,480</sup>.`],

 /* ---- Part 2: diagnosis ---- */
 [2,`The Beighton score has a maximum of:`,[`5`,`9`,`10`,`12`],1,`9 points from 5 manoeuvres; 4 are scored on both sides and the forward bend scores 1 <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>.`],
 [2,`Which Beighton item scores only 1 point?`,[`Elbow hyperextension`,`Thumb to forearm`,`Palms flat on the floor with knees straight`,`Little finger dorsiflexion`],2,`Forward flexion of the trunk with palms flat scores 1; the other four items score 1 per side <sup class="c" data-ref="Thwaites2022,Carroll2023" title="Source 72,460">72,460</sup>.`],
 [2,`In the 2017 criteria, the Beighton cut-off for an adult aged 30 is:`,[`4 or more`,`6 or more`,`3 or more`,`5 or more`],3,`5 or more from puberty to 50; 6 or more for children and adolescents; 4 or more over 50 <sup class="c" data-ref="Tofts2023,Fairweather2025" title="Source 147,464">147,464</sup>.`],
 [2,`A 58-year-old scores 4/9 on the Beighton score. For Criterion 1 of the 2017 hEDS criteria, this:`,[`Meets the cut-off for over-50s`,`Falls short by one point`,`Is irrelevant after 50`,`Proves hEDS`],0,`The over-50 cut-off is 4 or more. Criterion 1 is only one of three criteria, and a score alone is never a diagnosis <sup class="c" data-ref="Tofts2023,Fairweather2025" title="Source 147,464">147,464</sup>.`],
 [2,`A 35-year-old scores 4/9 and answers "yes" to 3 of the 5PQ questions. Criterion 1:`,[`Cannot be met`,`Can be met, because the score is one point short and the 5PQ is 2 or more`,`Is met only with a genetic test`,`Needs a score of 6`],1,`When the score is one point below the cut-off, a 5PQ of 2 or more counts as evidence of joint hypermobility <sup class="c" data-ref="Thwaites2022,Malfait2017" title="Source 291,460">291,460</sup>.`],
 [2,`Criterion 2 of the 2017 hEDS criteria requires:`,[`All of Features A, B and C`,`Feature A only`,`Feature C only`,`At least 2 of Features A, B and C`],3,`Two or more of A, B and C <sup class="c" data-ref="Thwaites2022,Fairweather2025" title="Source 147,460">147,460</sup>.`],
 [2,`Feature A needs how many of its 12 systemic items?`,[`5`,`2`,`8`,`12`],0,`At least 5 of 12 <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`],
 [2,`Feature B is:`,[`Chronic widespread pain`,`A first-degree relative who independently meets the hEDS criteria`,`A positive genetic test`,`A Beighton score of 9`],1,`A positive family history in at least one first-degree relative <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`],
 [2,`Which is NOT one of the three Feature C options?`,[`Pain in 2 or more limbs daily for 3 months or more`,`Chronic widespread pain for 3 months or more`,`Easy bruising`,`Atraumatic recurrent dislocations or instability`],2,`Feature C is musculoskeletal: limb pain, widespread pain, or recurrent dislocation or instability <sup class="c" data-ref="Thwaites2022" title="Source 460">460</sup>.`],
 [2,`A woman with rheumatoid arthritis has GJH. Under the 2017 criteria she can be diagnosed with hEDS only if she has:`,[`Features A and B; Feature C cannot count`,`Feature C alone`,`Any one feature`,`A COL5A1 variant`],0,`With an acquired rheumatic connective tissue disorder, both A and B are needed and Feature C does not count <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`],
 [2,`Unusual skin fragility in someone being assessed for hEDS should prompt:`,[`A higher Feature A count`,`Nothing different`,`A diagnosis of HSD`,`Consideration of other EDS types (Criterion 3)`],3,`Criterion 3 requires no unusual skin fragility; its presence points to other types <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`],
 [2,`Hypermobility spectrum disorder (HSD) is diagnosed when there is:`,[`Joint hypermobility with no symptoms`,`Joint hypermobility plus at least one secondary musculoskeletal manifestation, not meeting another syndrome`,`A COL3A1 variant`,`A Beighton score of 9 only`],1,`HSD is symptomatic joint hypermobility that does not fit hEDS or another syndrome <sup class="c" data-ref="Castori2017,Carroll2023" title="Source 72,78">72,78</sup>.`],
 [2,`Historical HSD (H-HSD) is:`,[`HSD in people over 50 only`,`HSD limited to the hands and feet`,`HSD at a single joint`,`Self-reported GJH on the 5PQ with a negative Beighton score, plus a secondary manifestation`],3,`H-HSD uses the 5PQ for past hypermobility when the examination score is negative <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>.`],
 [2,`According to the paediatric working group, a 12-year-old with GJH and joint pain should be:`,[`Diagnosed with hEDS now`,`Given no label at all`,`Assessed in the paediatric framework, with hEDS deferred until biological maturity`,`Tested for KLK15`],2,`Children should not be diagnosed with hEDS before biological maturity; the framework uses a Beighton of 6 or more <sup class="c" data-ref="Tofts2023" title="Source 464">464</sup>.`],
 [2,`Case: a 24-year-old man has a spontaneous sigmoid colon perforation, thin translucent skin and a brother with an arterial dissection at 31. The most important next step for the diagnosis is:`,[`A Beighton score`,`COL3A1 genetic testing for vascular EDS`,`The 5PQ`,`A trial of physiotherapy`],1,`Unexplained sigmoid rupture and a family history are vEDS minimal criteria that should prompt testing <sup class="c" data-ref="Wang2026OJRD" title="Source 496">496</sup>; the consensus asks for the variant before the diagnosis is applied <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>.`],
 [2,`Case: a 27-year-old woman has Beighton 7/9, daily pain in both knees and shoulders for a year, soft skin, striae, a high palate and dental crowding, and her mother meets the hEDS criteria. Skin heals normally. Which statement fits the 2017 criteria best?`,[`She has vascular EDS`,`She cannot have hEDS without a gene test`,`A clinician could consider hEDS after excluding other conditions under Criterion 3`,`HSD is ruled out by the family history`],2,`Criterion 1 (5 or more under 50), Features B and C, and possibly A, could fit; Criterion 3 still needs other disorders excluded. Only a clinician can make this call <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`],
 [2,`Case: a 22-year-old has Beighton 6/9 and recurrent knee pain, but no family history, no systemic Feature A signs, and her assessment excludes other conditions. The likeliest 2017 label is:`,[`Generalised HSD`,`Hypermobile EDS`,`Classical EDS`,`Healthy hypermobility, with no label`],0,`With only Feature C, Criterion 2 is not met; symptomatic GJH that does not meet hEDS is G-HSD, whose main differential is hEDS <sup class="c" data-ref="Carroll2023,Castori2017" title="Source 72,78">72,78</sup>.`],
 [2,`Case: a 30-year-old has hyperextensible skin with wide, thin, shiny scars over the shins and Beighton 6/9. Which type should be considered and confirmed genetically?`,[`Hypermobile EDS`,`Periodontal EDS`,`Vascular EDS`,`Classical EDS`],3,`Hyperextensible skin with atrophic scarring plus GJH are the cEDS major criteria; papyraceous scars exclude the hEDS scar item <sup class="c" data-ref="VanDijk2024,Fairweather2025" title="Source 147,480">147,480</sup>.`],
 [2,`The cardinal features of Marfan syndrome in the revised Ghent nosology are:`,[`Skin hyperextensibility and atrophic scars`,`Aortic root aneurysm and ectopia lentis`,`Bifid uvula and hypertelorism`,`Blue sclerae and fractures`],1,`Aortic root aneurysm plus ectopia lentis are enough without a family history <sup class="c" data-ref="Loeys2010" title="Source 276">276</sup>.`],
 [2,`The Loeys-Dietz triad does NOT include:`,[`Ectopia lentis`,`Hypertelorism`,`Arterial tortuosity and aneurysms`,`Bifid uvula or cleft palate`],0,`Lens dislocation is absent in LDS, unlike Marfan syndrome <sup class="c" data-ref="Loeys2006,MacCarrick2014" title="Source 275,284">275,284</sup>.`],
 [2,`In one multi-institution study, how many people diagnosed with vEDS had non-pathogenic COL3A1 changes?`,[`None`,`About 50%`,`Nearly 10%`,`All clinically diagnosed people`],2,`11 of 173 (9.8%), so the authors judged that vEDS diagnosed without confirmatory testing cannot be trusted <sup class="c" data-ref="Shalhub2020" title="Source 430">430</sup>.`],
 [2,`In UK 14-year-olds, a Beighton score of 4 or more was found in:`,[`2% of girls`,`64.6% of boys`,`Nobody`,`27.5% of girls and 10.6% of boys`],3,`So GJH alone is common and is not a diagnosis <sup class="c" data-ref="Clinch2011" title="Source 98">98</sup>.`],

 /* ---- Part 3: body systems ---- */
 [3,`Women with hEDS had knee strength that was:`,[`Normal`,`30% to 49% lower, with similar muscle mass`,`Higher than controls`,`Lower only because of smaller muscles`],1,`Strength and endurance were 30–49% lower while DXA muscle mass was similar <sup class="c" data-ref="Rombaut2012Strength" title="Source 396">396</sup>.`],
 [3,`Pressure-pain thresholds in hEDS were lower than in controls:`,[`Only at painful joints`,`Only in children`,`Even at pain-free sites`,`Not at all`],2,`2.9 vs 5.2 kg/cm² even where patients reported no pain: generalised hyperalgesia <sup class="c" data-ref="Rombaut2015" title="Source 398">398</sup>.`],
 [3,`The proposed order of hEDS natural-history phases is:`,[`Pain, stiffness, hypermobility`,`Stiffness, hypermobility, pain`,`Hypermobility only`,`Hypermobility, pain, stiffness`],3,`Hypermobility, then pain, then stiffness <sup class="c" data-ref="Castori2010" title="Source 74">74</sup>.`],
 [3,`In EDS, standard clotting tests are usually:`,[`Normal, with fragile capillaries explaining the bruising`,`Prolonged`,`Showing factor VIII deficiency`,`Showing low platelets`],0,`Bruising comes from capillary and perivascular fragility; only the Hess test may be abnormal <sup class="c" data-ref="DePaepe2004" title="Source 120">120</sup>.`],
 [3,`Heel piezogenic papules were found in what share of healthy Dutch children?`,[`2%`,`72%`,`20%`,`None`],1,`72% of 322 children, so the sign is common and not specific <sup class="c" data-ref="vanStraaten1991" title="Source 483">483</sup>.`],
 [3,`Skin that is thin and translucent with visible veins, but not markedly stretchy, suggests:`,[`Classical EDS`,`Hypermobile EDS`,`Vascular EDS`,`Classical-like EDS`],2,`That is the vEDS skin picture <sup class="c" data-ref="Stembridge2023" title="Source 449">449</sup>.`],
 [3,`POTS in an adult is a sustained heart-rate rise within 10 minutes of standing of at least:`,[`20 beats/min`,`40 beats/min`,`10 beats/min`,`30 beats/min`],3,`30 beats/min in adults (40 at ages 12 to 19), without orthostatic hypotension <sup class="c" data-ref="Sheldon2015,Vernino2021" title="Source 431,488">431,488</sup>.`],
 [3,`In 91 people with POTS, the share meeting the 2017 hEDS criteria was:`,[`31%`,`3%`,`75%`,`100%`],0,`31%, with a further 24% having GJH without meeting the criteria <sup class="c" data-ref="Miller2020" title="Source 304">304</sup>.`],
 [3,`The consensus laboratory criterion for mast-cell activation is an event-related tryptase rise of:`,[`Any rise`,`At least 20% + 2 ng/mL over baseline`,`Above 100 ng/mL`,`A fall of 20%`],1,`The "20% + 2" formula <sup class="c" data-ref="Valent2019IAAI" title="Source 473">473</sup>. The AGA does not support universal MCAS testing in hEDS/HSD <sup class="c" data-ref="Aziz2025" title="Source 22">22</sup>.`],
 [3,`What is the best current evidence label for the hEDS-MCAS link?`,[`Established`,`Disproved`,`Hypothesis to early evidence`,`Proven by RCT`],2,`No controlled study using consensus MCAS criteria has shown it <sup class="c" data-ref="Kucharik2020,Aziz2025,Vazquez2022" title="Source 22,254,485">22,254,485</sup>.`],
 [3,`Hereditary alpha-tryptasemia in people with HSD or hEDS was:`,[`Ten times more common`,`Present in all`,`The cause of hEDS`,`No more prevalent than in the general population`],3,`About 5–7% in Western populations, and no higher in hypermobility disorders <sup class="c" data-ref="Vazquez2022" title="Source 485">485</sup>.`],
 [3,`In vascular EDS, more than 80% of index patients have had a complication by age:`,[`40`,`10`,`20`,`70`],0,`25% by 20 and more than 80% by 40 <sup class="c" data-ref="Pepin2000" title="Source 363">363</sup>.`],
 [3,`Most deaths in vascular EDS result from:`,[`Bowel rupture`,`Arterial rupture`,`Pneumothorax`,`Infection`],1,`Arterial rupture; bowel rupture is common but rarely fatal <sup class="c" data-ref="Pepin2000" title="Source 363">363</sup>.`],
 [3,`The arterial bed most often affected in genetically confirmed vEDS is:`,[`Coronary`,`Aortic root`,`Mesenteric`,`Radial`],2,`Mesenteric arteries, 31.7% <sup class="c" data-ref="Shalhub2019JVS" title="Source 429">429</sup>.`],
 [3,`After spontaneous sigmoid perforation in vEDS, the review favours which emergency operation?`,[`Primary anastomosis`,`Colonoscopic clipping`,`No surgery`,`Hartmann's procedure`],3,`Reperforation was considerably more frequent after partial colectomy with anastomosis <sup class="c" data-ref="ElMasri2018" title="Source 142">142</sup>.`],
 [3,`Median survival in vEDS in the 2014 cohort of 1,231 people was:`,[`51 years, lower in men`,`80 years`,`25 years`,`Not different from the general population`],0,`51 years, lower in men and varying with variant type; a population statistic, not an individual prognosis <sup class="c" data-ref="Pepin2014" title="Source 364">364</sup>.`],
 [3,`The evidence for craniocervical fusion in EDS is best described as:`,[`Several large RCTs`,`Established standard care`,`Weak: no validated imaging criteria and level III–V studies`,`Disproved`],2,`A systematic review found 78 surgical patients and evidence levels III to V <sup class="c" data-ref="Lohkamp2022" title="Source 278">278</sup>.`],
 [3,`In population studies, hypermobility is linked most clearly to which kind of osteoarthritis?`,[`Knee`,`Hip`,`Distal finger`,`Thumb base`],3,`Thumb-base (first carpometacarpal) OA; knee and hand OA are not increased <sup class="c" data-ref="Jonsson1996,Dolan2003,Kraus2004" title="Source 130,229,253">130,229,253</sup>.`],
 [3,`Joint hypermobility syndrome in GI clinic patients was more common in:`,[`Functional than organic GI disorders`,`Organic than functional disorders`,`Neither`,`Coeliac disease only`],0,`39.0% vs 27.5% (adjusted OR 1.51) <sup class="c" data-ref="Fikree2015" title="Source 162">162</sup>.`],
 [3,`In Swedish registers, EDS was associated with which relative risk of autism?`,[`1.1`,`7.4`,`0.5`,`50`],1,`RR 7.4; ADHD RR 5.6 <sup class="c" data-ref="Cederlof2016" title="Source 81">81</sup>.`],
 [3,`More than three-quarters of people with EDS in a Dutch study reported:`,[`No pain`,`Normal sleep`,`A diagnosis in childhood`,`Severe fatigue`],3,`Severe fatigue, linked to sleep, concentration, social functioning, self-efficacy and pain <sup class="c" data-ref="Voermans2010Fatigue" title="Source 491">491</sup>.`],

 /* ---- Part 4: treatment ---- */
 [4,`Which statement about exercise-based physiotherapy in hEDS/HSD is accurate?`,[`It is the cornerstone of care, but controlled-trial evidence of superiority is weak`,`It is proven in large RCTs`,`It is contraindicated`,`It cures hEDS`],0,`It is the cornerstone, yet only 3 small controlled studies showed benefit over a control <sup class="c" data-ref="Palmer2021" title="Source 357">357</sup>.`],
 [4,`In the Danish shoulder trial in HSD, heavy versus light training:`,[`Was worse at 16 weeks`,`Was better at 16 weeks but not significantly at 1 year`,`Caused frequent dislocations`,`Made no difference at any time`],1,`WOSI −174.5 at 16 weeks, smaller than the MID of 252; not significant at 1 year <sup class="c" data-ref="Liaghat2022BJSM,Liaghat2024BJSM" title="Source 268,269">268,269</sup>.`],
 [4,`During heavy shoulder training in HSD, exercise-induced pain:`,[`Rose above 7/10`,`Stopped the trial`,`Stayed below 0.5/10`,`Was not measured`],2,`It stayed below 0.5/10, "challenging previous beliefs" <sup class="c" data-ref="Liaghat2025" title="Source 271">271</sup>.`],
 [4,`In the Bendy Study (119 children), a tailored physiotherapy plus occupational therapy programme versus advice:`,[`Doubled the benefit`,`Caused harm`,`Was stopped early`,`Added no benefit at 12 months`],3,`Education and positive messages about exercise gave significant benefit without more complex interventions <sup class="c" data-ref="Bale2019" title="Source 25">25</sup>.`],
 [4,`Children's knee pain after 8 weeks of exercise into the hypermobile range versus only to neutral:`,[`Fell similarly in both groups`,`Rose in the hypermobile-range group`,`Fell only with neutral exercise`,`Did not change`],0,`Worst knee pain fell by a mean 14.5 mm on a VAS whichever group the child was in <sup class="c" data-ref="Pacey2013" title="Source 351">351</sup>.`],
 [4,`BBEST randomised 53 people with vEDS to celiprolol or no treatment. Arterial events occurred in:`,[`50% vs 20%`,`20% vs 50%`,`5% vs 6%`,`0% vs 100%`],1,`20% on celiprolol vs 50% of controls (HR 0.36); open-label and stopped early for benefit <sup class="c" data-ref="Ong2010" title="Source 345">345</sup>.`],
 [4,`Celiprolol is:`,[`A pure β1 blocker`,`An angiotensin receptor blocker`,`A β1 antagonist with β2 agonist action`,`A calcium channel blocker`],2,`A β1 antagonist with β2 agonist action, uptitrated to 400 mg/day in BBEST <sup class="c" data-ref="Ong2010" title="Source 345">345</sup>.`],
 [4,`In ARCADE, irbesartan added to celiprolol:`,[`Increased arterial events`,`Was stopped for harm`,`Was not tested in vEDS`,`Reduced the composite arterial outcome, 27.6% vs 53.6%`],3,`HR 0.42 over 2 years <sup class="c" data-ref="Jeunemaitre2025" title="Source 226">226</sup>.`],
 [4,`The US regulatory status of celiprolol is:`,[`Not FDA-approved`,`Approved for vEDS in 2010`,`Approved for POTS`,`Withdrawn for safety`],0,`It has no FDA approval; the ACC/AHA judged the data insufficient <sup class="c" data-ref="Isselbacher2022,openFDA-Celiprolol" title="Source 219,346">219,346</sup>.`],
 [4,`Why is diagnostic arteriography avoided in vEDS?`,[`It is too expensive`,`A historical series reported a 67% complication rate`,`It cannot show arteries`,`It requires general anaesthesia`],1,`Arteriography injured fragile vessels; GeneReviews keeps it for locating life-threatening bleeding before surgery <sup class="c" data-ref="Cikrit1987,Byers2025GeneReviews" title="Source 68,94">68,94</sup>.`],
 [4,`In vEDS, the ACC/AHA says the aorta and its branches may rupture:`,[`Only above 5.5 cm`,`Only after age 60`,`Even without significant dilation`,`Never during surveillance`],2,`So there is no safe diameter threshold <sup class="c" data-ref="Isselbacher2022" title="Source 219">219</sup>.`],
 [4,`In the lidocaine trial, the share of people with EDS still numb at 30 minutes was:`,[`80%, the same as controls`,`100%`,`0%`,`53%, versus 80% of controls`],3,`Equal effect at 5 minutes, but a shorter duration <sup class="c" data-ref="Bourne2026RAPM" title="Source 54">54</sup>.`],
 [4,`HRS 2015 grades 2–3 L of water and 10–12 g of salt daily for POTS as:`,[`Class IIb, "may be considered"`,`Class I, mandatory`,`Class III, harmful`,`Not mentioned`],0,`Class IIb, level E <sup class="c" data-ref="Sheldon2015" title="Source 431">431</sup>.`],
 [4,`For propranolol in POTS, "less is more" means:`,[`Lower doses cause more side effects`,`20 mg improved symptoms more than 80 mg`,`It should be taken less than weekly`,`No dose helps`],1,`80 mg lowered heart rate more, but 20 mg improved symptoms more <sup class="c" data-ref="Raj2009Circ" title="Source 373">373</sup>.`],
 [4,`The midodrine label's boxed warning concerns:`,[`Fetal toxicity`,`Liver failure`,`Supine hypertension`,`Bleeding`],2,`Marked supine hypertension; no doses after the evening meal or within 4 hours of bedtime <sup class="c" data-ref="FDA-Midodrine" title="Source 156">156</sup>.`],
 [4,`The ivabradine (Corlanor) label warns of fetal toxicity. Why does that matter in POTS?`,[`POTS only affects men`,`Ivabradine is approved for POTS`,`It does not matter`,`Most people with POTS are women of childbearing age`],3,`The label advises effective contraception; POTS is not a labelled use <sup class="c" data-ref="FDA-Corlanor,Vernino2021" title="Source 151,488">151,488</sup>.`],
 [4,`Classical EDS skin wounds are closed:`,[`In two layers without tension, with skin stitches left about twice as long`,`With staples removed at 3 days`,`Under tension for strength`,`Only with glue`],0,`GeneReviews' cEDS wound advice <sup class="c" data-ref="Malfait2024GeneReviews" title="Source 293">293</sup>.`],
 [4,`In vEDS, Wiesmann 2014 advises about neuraxial anaesthesia and invasive lines:`,[`Use them routinely`,`Avoid them where possible; if a central line is unavoidable, use ultrasound guidance`,`Prefer spinal anaesthesia`,`Use them only in children`],1,`Fragile vessels raise the risk; ultrasound guidance is mandatory for an unavoidable central line <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>.`],
 [4,`Desmopressin in children with EDS and bleeding symptoms:`,[`Prolonged bleeding time`,`Had no effect`,`Roughly halved bleeding time`,`Was contraindicated`],2,`11.26 to 5.95 minutes <sup class="c" data-ref="Mast2009" title="Source 298">298</sup>.`],
 [4,`How many medicines are FDA-approved specifically for POTS?`,[`Three`,`One`,`Five`,`None`],3,`None; the drugs used are off-label <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>.`],

 /* ---- Part 5: living with EDS ---- */
 [5,`In the Global Registry survey, the mean time to an hEDS diagnosis was about:`,[`10 years`,`6 months`,`2 years`,`40 years`],0,`10.39 years, after an average of 15.6 clinicians <sup class="c" data-ref="Halverson2023" title="Source 204">204</sup>.`],
 [5,`In Wales, women were diagnosed with EDS/JHS on average how much later than men?`,[`They were diagnosed earlier`,`8.5 years later`,`No difference`,`20 years later`],1,`8.5 years later; 72% of males but 41% of females were diagnosed in childhood <sup class="c" data-ref="Demmler2019" title="Source 119">119</sup>.`],
 [5,`A person with vEDS develops sudden, severe, unexplained abdominal pain. What does published guidance advise?`,[`Wait a day`,`Take a stronger painkiller at home`,`Seek immediate medical attention and show the emergency card`,`Book a routine colonoscopy`],2,`Sudden unexplained pain needs immediate care, with documentation such as a vEDS passport <sup class="c" data-ref="Byers2025GeneReviews,Byers2017" title="Source 67,68">67,68</sup>.`],
 [5,`Pregnancy-related deaths in vEDS pedigrees were about:`,[`0.01%`,`50%`,`25%`,`5% per delivery`],3,`30 of 565 deliveries (5.3%); GeneReviews summarises about 5% per pregnancy <sup class="c" data-ref="Murray2014GenetMed,Byers2025GeneReviews" title="Source 68,323">68,323</sup>.`],
 [5,`Most pregnancies in hypermobile EDS:`,[`Are uncomplicated`,`End in uterine rupture`,`Need caesarean at 30 weeks`,`Are not possible`],0,`Most go well; joint dislocation, pain and POTS are the issues to plan for <sup class="c" data-ref="Karthikeyan2018" title="Source 241">241</sup>.`],
 [5,`Hypermobile athletes have higher odds of which injury in contact sport?`,[`Ankle`,`Knee`,`Wrist`,`None`],1,`Knee (combined OR 4.69); ankle injury risk was not raised <sup class="c" data-ref="Pacey2010" title="Source 350">350</sup>.`],
 [5,`Which activities does GeneReviews list to avoid in vEDS?`,[`All exercise`,`Walking`,`Collision sports, heavy lifting and extreme weight training`,`Swimming`],2,`Regular low-intensity exercise is encouraged for health and wellbeing <sup class="c" data-ref="Byers2025GeneReviews,Bowen2023vEDS" title="Source 58,68">58,68</sup>.`],
 [5,`A spontaneous bowel perforation in a young person, according to the UK national vEDS service, should prompt:`,[`Reassurance`,`A Beighton score`,`Physiotherapy`,`Genetic testing for vEDS`],3,`74 of 180 patients in that service were diagnosed only after a vascular event or organ rupture <sup class="c" data-ref="Bowen2023vEDS" title="Source 58">58</sup>.`],
 [5,`Why does perinatal guidance recommend documenting early bruising in infants with hEDS/HSD?`,[`To avoid false accusations of maltreatment`,`To diagnose vEDS`,`For research only`,`It does not`],0,`EDS is on the differential for bruising in suspected abuse, and documentation protects families <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>.`],
 [5,`According to parents, which school task was hardest for children with EDS?`,[`Reading`,`Keeping up with handwriting`,`Music`,`Lunch`],1,`Handwriting (71%); school participation satisfied only 33% of parents <sup class="c" data-ref="Wesley2021" title="Source 504">504</sup>.`],
 [5,`POTS can usually be identified with:`,[`A genetic test`,`A skin biopsy`,`Heart rate and blood pressure lying down and during a 10-minute stand`,`A Beighton score`],2,`The active stand test; tilt testing is an alternative <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>.`],
 [5,`In a UK national survey of 2,002 people with hEDS/HSD, unemployment was reported by:`,[`5%`,`95%`,`20%`,`45.6%`],3,`45.6%, and 47.9% reported dependence on benefits <sup class="c" data-ref="Berg2026" title="Source 41">41</sup>.`],
 [5,`Each child of a parent with vascular EDS has what chance of inheriting it?`,[`50%`,`25%`,`10%`,`100%`],0,`vEDS is autosomal dominant <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>.`],
 [5,`In a qualitative study, 73% of survey respondents with EDS had come to question:`,[`Their diagnosis code`,`The extent or reality of their own pain`,`Their genetic test`,`Their exercise plan`],1,`Repeated dismissal fed self-doubt; the authors recommend "epistemic humility" from clinicians <sup class="c" data-ref="Halverson2025" title="Source 205">205</sup>.`]
];
inits.quiz=()=>{
  const F=[['mix','Mixed (20)'],...Object.keys(RV_PARTN).map(k=>[k,'Part '+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ_LIST.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
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
const GL_LIST=[
 ["5PQ (five-part questionnaire)",`Five yes/no questions about present and past hypermobility; 2 or more "yes" answers is positive (84% sensitivity, 89% specificity in its development cohort) <sup class="c" data-ref="Hakim2003" title="Source 196">196</sup>.`,"beighton"],
 ["Acrogeria",`Fine wrinkling of the face, hands and feet seen with thin, translucent skin in vascular EDS <sup class="c" data-ref="Stembridge2023" title="Source 449">449</sup>.`,"skin"],
 ["Active stand test",`Heart rate and blood pressure recorded lying down and then during a 10-minute stand; it usually identifies POTS <sup class="c" data-ref="Vernino2021" title="Source 488">488</sup>.`,"autonomic"],
 ["ADAMTS-2",`The procollagen I N-proteinase that trims the N-propeptide; biallelic loss of ADAMTS2 causes dermatosparaxis EDS <sup class="c" data-ref="Colige1999" title="Source 99">99</sup>.`,"collagen"],
 ["AEBP1 (ACLP)",`A protein that binds fibrillar collagens and enhances their polymerisation; biallelic variants cause classical-like EDS type 2 <sup class="c" data-ref="Blackburn2018" title="Source 47">47</sup>.`,"types"],
 ["Aneurysm",`A localised widening of an artery. In vEDS arteries may rupture or dissect even without significant dilation <sup class="c" data-ref="Isselbacher2022" title="Source 219">219</sup>.`,"vascular"],
 ["Arachnodactyly",`Long, slender fingers; in the hEDS criteria (Feature A item 9) it means a positive wrist or thumb sign on both sides <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>.`,"criteria"],
 ["ARCADE trial",`A double-blind RCT of irbesartan added to celiprolol in vEDS: composite arterial outcome 27.6% vs 53.6% over 2 years (HR 0.42) <sup class="c" data-ref="Jeunemaitre2025" title="Source 226">226</sup>.`,"vascular"],
 ["ARFID",`Avoidant/restrictive food intake disorder. In 680 people with hEDS/HSD, an ARFID fear-of-eating screen predicted needing nutrition support <sup class="c" data-ref="Topan2024" title="Source 465">465</sup>.`,"gut"],
 ["Arm span-to-height ratio",`A ratio of 1.05 or more is one of the 12 Feature A items of the hEDS criteria <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>.`,"criteria"],
 ["Arterial dissection",`A tear in an artery's inner lining that lets blood split the wall. Arterial rupture or dissection under 40 is a vEDS minimal criterion <sup class="c" data-ref="Wang2026OJRD" title="Source 496">496</sup>.`,"vascular"],
 ["Arteriography",`Imaging by catheter inside the arteries. In vEDS it is discouraged except to find life-threatening bleeding before surgery <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>.`,"vascular"],
 ["Arthrochalasia EDS (aEDS)",`Autosomal dominant type caused by COL1A1 or COL1A2 variants that delete exon 6; hallmark congenital bilateral hip dislocation <sup class="c" data-ref="VanDijk2024,Byers1997" title="Source 66,480">66,480</sup>.`,"types"],
 ["Articaine",`A dental local anaesthetic with the highest reported success rate (30%) among EDS survey respondents who named their agent <sup class="c" data-ref="Schubart2019LA" title="Source 419">419</sup>.`,"surgery"],
 ["Atrophic scar",`A thin, depressed scar. hEDS Feature A counts atrophic scars at 2 or more sites without the papyraceous or haemosiderotic scars of classical EDS <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>.`,"criteria"],
 ["Autosomal dominant",`One changed copy is enough; each child of an affected parent has a 50% chance of inheriting it (cEDS, vEDS, aEDS, pEDS) <sup class="c" data-ref="Malfait2024GeneReviews,Byers2025GeneReviews,KapfererSeebacherGR-pEDS" title="Source 68,240,293">68,240,293</sup>.`,"genes"],
 ["Autosomal recessive",`Two changed copies are needed; children of two carriers have a 25% chance of being affected (kEDS, clEDS, mcEDS and others) <sup class="c" data-ref="RohrbachGR-kEDS,vanDijkGR-clEDS,KoshoGR-mcEDS" title="Source 250,390,481">250,390,481</sup>.`,"genes"],
 ["BBEST trial",`The open, randomised celiprolol trial in 53 people with vEDS: arterial events 20% vs 50% (HR 0.36), stopped early for benefit <sup class="c" data-ref="Ong2010" title="Source 345">345</sup>.`,"vascular"],
 ["Beighton score",`A 9-point screen of joint hypermobility from 5 manoeuvres, devised in 1973 on 1,083 Tswana Africans; a screening tool, not a diagnostic test <sup class="c" data-ref="Beighton1973,Malek2021C" title="Source 33,288">33,288</sup>.`,"beighton"],
 ["Bendy Study",`An RCT in 119 hypermobile children: tailored physiotherapy plus occupational therapy added nothing over standard advice at 12 months <sup class="c" data-ref="Bale2019" title="Source 25">25</sup>.`,"physio"],
 ["Berlin nosology",`The 1986 EDS classification (published 1988) with 11 subtypes numbered in Roman numerals <sup class="c" data-ref="Beighton1988,Forghani2019" title="Source 34,166">34,166</sup>.`,"history"],
 ["Biallelic",`Affecting both copies of a gene, as in recessive types such as dermatosparaxis EDS <sup class="c" data-ref="Colige1999" title="Source 99">99</sup>.`,"genes"],
 ["BIoH (Bristol Impact of Hypermobility)",`A 55-item questionnaire developed with people with JHS; its smallest detectable change is 42 points <sup class="c" data-ref="Palmer2017BIoH,Palmer2017SDC" title="Source 355,356">355,356</sup>.`,"physio"],
 ["BMP-1",`Bone morphogenetic protein-1, the same protein as procollagen C-proteinase, which removes the C-propeptides <sup class="c" data-ref="Kessler1996" title="Source 244">244</sup>.`,"collagen"],
 ["Brighton criteria",`The 1998 criteria for benign joint hypermobility syndrome, published in 2000, folded into hEDS and HSD in 2017 <sup class="c" data-ref="Grahame2000,Tinkle2017" title="Source 187,461">187,461</sup>.`,"history"],
 ["Brittle cornea syndrome (BCS)",`Autosomal recessive type caused by ZNF469 or PRDM5: thin cornea that may rupture, keratoconus or keratoglobus, blue sclerae <sup class="c" data-ref="Dhooge2021,VanDijk2024" title="Source 125,480">125,480</sup>.`,"types"],
 ["Cardiac-valvular EDS (cvEDS)",`Autosomal recessive type from biallelic COL1A2 null variants: heart valve disease without bone involvement <sup class="c" data-ref="Schwarze2004" title="Source 425">425</sup>.`,"types"],
 ["Carotid-cavernous sinus fistula",`An abnormal connection between the carotid artery and the cavernous sinus; without trauma it is a vEDS major criterion <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>.`,"vascular"],
 ["Carter-Wilkinson score",`The 1964 joint laxity score that Beighton adapted in 1973 <sup class="c" data-ref="Carter1964,Malek2021C" title="Source 73,288">73,288</sup>.`,"beighton"],
 ["Cascade testing",`Testing relatives for a known familial variant; in vEDS, first-degree relatives can be tested even without clinical signs <sup class="c" data-ref="Byers2025GeneReviews" title="Source 68">68</sup>.`,"genes"],
 ["Celiprolol",`A β1 antagonist with β2 agonist action used in vEDS, uptitrated to 400 mg/day in BBEST; not FDA-approved <sup class="c" data-ref="Ong2010,Isselbacher2022" title="Source 219,345">219,345</sup>.`,"meds"],
 ["Central sensitisation",`An amplified pain response in the central nervous system; signs were found in people with JHS/hEDS without nerve damage (Early evidence) <sup class="c" data-ref="DiStefano2016" title="Source 128">128</sup>.`,"pain"],
 ["Chiari malformation type I",`Descent of the cerebellar tonsils. 12.7% of 2,813 people with Chiari I met criteria for EDS or a related disorder in a surgical series (Early evidence) <sup class="c" data-ref="Milhorat2007" title="Source 303">303</sup>.`,"pain"],
 ["CHST14",`Dermatan-4-sulfotransferase 1; its loss abolishes dermatan sulfate and causes musculocontractural EDS <sup class="c" data-ref="Dundar2009" title="Source 134">134</sup>.`,"types"],
 ["Classical EDS (cEDS)",`Autosomal dominant type, about 1 in 20,000, mostly COL5A1/COL5A2: hyperextensible skin, atrophic scarring and GJH <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>.`,"types"],
 ["Classical-like EDS (clEDS)",`Type 1 is recessive TNXB deficiency with hyperextensible skin but no atrophic scars; type 2 is caused by AEBP1 <sup class="c" data-ref="Schalkwijk2001,Blackburn2018" title="Source 47,413">47,413</sup>.`,"types"],
 ["Closed kinetic chain exercise",`Exercise with the foot or hand fixed against a surface; an 8-week home programme improved knee proprioception in 16 of 18 people with JHS <sup class="c" data-ref="Ferrell2004" title="Source 160">160</sup>.`,"physio"],
 ["COL1-related overlap disorder",`A proposed EDS-OI overlap phenotype in people with COL1A1/COL1A2 variants; not one of the 13 types <sup class="c" data-ref="Morlino2020,VanDijk2024" title="Source 315,480">315,480</sup>.`,"types"],
 ["COL3A1",`The gene for type III procollagen; heterozygous pathogenic variants cause vascular EDS <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>.`,"genes"],
 ["COL5A1 / COL5A2",`Genes for type V collagen chains; variants cause most classical EDS <sup class="c" data-ref="Symoens2012" title="Source 456">456</sup>.`,"genes"],
 ["Collagen",`The main structural protein: about one-third of human protein and three-quarters of the dry weight of skin; 28 types are known <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>.`,"collagen"],
 ["Compression garments",`Elastic clothing. Added to physiotherapy in hEDS, they improved dynamic balance more, while pain fell equally in both groups <sup class="c" data-ref="Benistan2024" title="Source 38">38</sup>.`,"physio"],
 ["Conditioned pain modulation",`The body's ability to dampen one pain with another; it was weaker in classical EDS than in controls (Early evidence) <sup class="c" data-ref="Colman2023" title="Source 102">102</sup>.`,"pain"],
 ["Craniocervical instability (CCI)",`Proposed instability between the skull and upper neck; it has no validated imaging criteria, and surgical evidence is level III–V <sup class="c" data-ref="Lohkamp2022" title="Source 278">278</sup>.`,"pain"],
 ["Criterion 1",`Generalised joint hypermobility on the Beighton score with age cut-offs of 6, 5 and 4, or one point short with a positive 5PQ <sup class="c" data-ref="Tofts2023,Thwaites2022" title="Source 460,464">460,464</sup>.`,"criteria"],
 ["Criterion 2",`Two or more of Features A, B and C in the 2017 hEDS criteria <sup class="c" data-ref="Thwaites2022,Fairweather2025" title="Source 147,460">147,460</sup>.`,"criteria"],
 ["Criterion 3",`No unusual skin fragility, and exclusion of other connective tissue disorders and alternative causes of hypermobility <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`,"criteria"],
 ["Cross-link",`A covalent bond between collagen molecules, made possible by lysyl oxidase; it gives fibrils strength <sup class="c" data-ref="Lucero2006,Shoulders2009" title="Source 279,432">279,432</sup>.`,"collagen"],
 ["Cutis laxa",`Loose, redundant skin from fragmented elastic fibres; unlike classical EDS skin, it does not snap back <sup class="c" data-ref="Beyens2021,Malfait2024GeneReviews" title="Source 46,293">46,293</sup>.`,"differential"],
 ["D-period",`The 67 nm repeating band of a collagen fibril, from quarter-staggered molecules 4.46 D long <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>.`,"collagen"],
 ["De novo variant",`A genetic change new in the person, not inherited; about half of vEDS and cEDS cases <sup class="c" data-ref="Byers2025GeneReviews,Malfait2024GeneReviews" title="Source 68,293">68,293</sup>.`,"genes"],
 ["Decorin",`A proteoglycan whose dermatan sulfate chain helps organise collagen; in CHST14 deficiency collagen bundles form poorly <sup class="c" data-ref="Miyake2010" title="Source 309">309</sup>.`,"collagen"],
 ["Dermatosparaxis EDS (dEDS)",`Autosomal recessive type from ADAMTS2 loss: extreme skin fragility and redundant skin; prevalence under 1 in 1,000,000 <sup class="c" data-ref="Colige1999,VanDijk2024" title="Source 99,480">99,480</sup>.`,"types"],
 ["Desmopressin (DDAVP)",`A drug that roughly halved bleeding time in children with EDS (11.26 to 5.95 minutes) <sup class="c" data-ref="Mast2009" title="Source 298">298</sup>.`,"meds"],
 ["DGBI (functional GI disorder)",`Disorders of gut-brain interaction such as functional dyspepsia and IBS; joint hypermobility is more common in them than in organic GI disease <sup class="c" data-ref="Fikree2015" title="Source 162">162</sup>.`,"gut"],
 ["DiSCOVER trial",`A recruiting phase 3, double-blind trial of celiprolol (ACER-002) versus placebo in COL3A1-positive vEDS <sup class="c" data-ref="NCT05432466" title="Source 333">333</sup>.`,"frontier"],
 ["Dislocation",`A joint fully out of place. In classical EDS, 34.1% of adults vs 3.2% of children had had one <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>.`,"joints"],
 ["Dominant-negative",`A variant whose faulty protein disrupts the normal one; 76.8% of variants in a Dutch vEDS cohort were predicted to act this way <sup class="c" data-ref="Demirdas2024" title="Source 118">118</sup>.`,"genes"],
 ["Ectopia lentis",`Dislocation of the eye's lens; with aortic root aneurysm it is a cardinal feature of Marfan syndrome <sup class="c" data-ref="Loeys2010" title="Source 276">276</sup>.`,"differential"],
 ["Ehlers-Danlos syndromes (EDS)",`A group of heritable connective tissue disorders with joint hypermobility, skin hyperextensibility and tissue fragility; 13 types in 2017 <sup class="c" data-ref="Malfait2017" title="Source 291">291</sup>.`,"what"],
 ["Embolisation",`Blocking a bleeding artery from inside; the main endovascular approach when vEDS arteries needed intervention (13.4%) <sup class="c" data-ref="Shalhub2019JVS" title="Source 429">429</sup>.`,"vascular"],
 ["Epistemic humility",`Clinicians acknowledging the limits of what is known; recommended after 73% of people with EDS reported doubting their own pain <sup class="c" data-ref="Halverson2025" title="Source 205">205</sup>.`,"living"],
 ["Exon skipping",`A splice change that drops an exon from the message; COL1A1/COL1A2 exon 6 skipping causes arthrochalasia EDS <sup class="c" data-ref="Klaassens2012" title="Source 247">247</sup>.`,"genes"],
 ["Feature A",`Systemic signs of a more generalised connective tissue disorder: at least 5 of 12 items, such as soft skin, striae and arachnodactyly <sup class="c" data-ref="Fairweather2025,Thwaites2022" title="Source 147,460">147,460</sup>.`,"criteria"],
 ["Feature B",`A first-degree relative who independently meets the hEDS criteria <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>.`,"criteria"],
 ["Feature C",`Musculoskeletal complications: limb pain daily for 3 months, chronic widespread pain, or atraumatic recurrent dislocation or instability <sup class="c" data-ref="Thwaites2022" title="Source 460">460</sup>.`,"criteria"],
 ["FBN1",`The fibrillin-1 gene; variants cause Marfan syndrome <sup class="c" data-ref="Dietz1991" title="Source 126">126</sup>.`,"differential"],
 ["Fibril",`The rope-like assembly of collagen molecules; tendon fibrils reach up to 1 cm long and about 500 nm across <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>.`,"collagen"],
 ["Fibromyalgia",`A chronic widespread pain condition; since 2016 it can be diagnosed alongside another condition, and pain alone cannot separate it from hEDS <sup class="c" data-ref="Wolfe2016,Fairweather2025" title="Source 147,508">147,508</sup>.`,"differential"],
 ["FKBP14",`An ER folding catalyst for type III collagen; biallelic variants cause kyphoscoliotic EDS with normal urinary pyridinolines <sup class="c" data-ref="Giunta2018,Baumann2012" title="Source 30,183">30,183</sup>.`,"collagen"],
 ["Fludrocortisone",`A mineralocorticoid used off-label in POTS; it has not been tested in randomised trials in POTS <sup class="c" data-ref="Sheldon2015" title="Source 431">431</sup>.`,"meds"],
 ["G-HSD (generalised HSD)",`GJH on an objective score plus at least one secondary musculoskeletal manifestation; its main differential is hEDS <sup class="c" data-ref="Carroll2023,Castori2017" title="Source 72,78">72,78</sup>.`,"hsd"],
 ["Generalised joint hypermobility (GJH)",`Hypermobility in 5 or more joints across the limbs and axial skeleton; common, and not a diagnosis on its own <sup class="c" data-ref="Carroll2023,Clinch2011" title="Source 72,98">72,98</sup>.`,"beighton"],
 ["Glycine substitution",`Replacement of a helix glycine by a bulkier residue, which stalls triple-helix folding; the commonest vEDS variant type <sup class="c" data-ref="Shoulders2009,Frank2015" title="Source 169,432">169,432</sup>.`,"genes"],
 ["Goniometer",`A protractor for measuring joint angles; Beighton scoring in children is valid "when goniometry is used" <sup class="c" data-ref="Smits-Engelsman2011" title="Source 438">438</sup>.`,"beighton"],
 ["H-HSD (historical HSD)",`GJH reported on the 5PQ with a negative Beighton score, plus a secondary musculoskeletal manifestation <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>.`,"hsd"],
 ["Haemosiderotic scar",`A brown, iron-stained scar typical of classical EDS (54.7% of confirmed cases) <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>.`,"skin"],
 ["Haploinsufficiency (null allele)",`One gene copy makes no protein, halving the amount; COL3A1 null variants delay vEDS complications by almost 15 years <sup class="c" data-ref="Leistritz2011" title="Source 262">262</sup>.`,"genes"],
 ["Hartmann's procedure",`Resection of the bowel with an end colostomy and no join; favoured after vEDS sigmoid perforation because reperforation was rarer <sup class="c" data-ref="ElMasri2018" title="Source 142">142</sup>.`,"vascular"],
 ["HEDGE study",`The Hypermobile Ehlers-Danlos Genetic Evaluation, begun in 2018 to whole-genome sequence 1,000 adults meeting the 2017 hEDS criteria <sup class="c" data-ref="Douglas2026,VanDijk2024" title="Source 132,480">132,480</sup>.`,"frontier"],
 ["Hereditary alpha-tryptasemia (HαT)",`Extra TPSAB1 copies raising basal tryptase; not more prevalent in hypermobility disorders than in the general population <sup class="c" data-ref="Vazquez2022" title="Source 485">485</sup>.`,"gut"],
 ["Hess test",`The Rumpel-Leede capillary fragility test; it may be abnormal in EDS when clotting tests are normal <sup class="c" data-ref="DePaepe2004" title="Source 120">120</sup>.`,"skin"],
 ["High-load training",`Strength training at high resistance; in HSD shoulders it beat low load at 16 weeks, with exercise pain below 0.5/10 <sup class="c" data-ref="Liaghat2022BJSM,Liaghat2025" title="Source 268,271">268,271</sup>.`,"physio"],
 ["Hypermobile EDS (hEDS)",`Likely the commonest heritable connective tissue disorder, and the only EDS type with no known gene; diagnosed clinically with the 2017 criteria <sup class="c" data-ref="Tinkle2017,Malfait2017" title="Source 291,461">291,461</sup>.`,"criteria"],
 ["Hypermobility spectrum disorders (HSD)",`The 2017 labels for symptomatic joint hypermobility that does not fit hEDS or another syndrome <sup class="c" data-ref="Castori2017" title="Source 78">78</sup>.`,"hsd"],
 ["Hyperalgesia",`Increased sensitivity to pain; in hEDS pressure-pain thresholds were low even at pain-free sites <sup class="c" data-ref="Rombaut2015" title="Source 398">398</sup>.`,"pain"],
 ["Hypertelorism",`Widely spaced eyes; part of the Loeys-Dietz triad <sup class="c" data-ref="Loeys2006" title="Source 275">275</sup>.`,"differential"],
 ["Inspiratory muscle training",`Breathing-muscle training; 6 weeks raised 6-minute walk distance from 455 to 515 m in women with hEDS <sup class="c" data-ref="Reychler2019" title="Source 379">379</sup>.`,"physio"],
 ["Irbesartan",`An angiotensin receptor blocker that reduced arterial events when added to celiprolol in ARCADE <sup class="c" data-ref="Jeunemaitre2025" title="Source 226">226</sup>.`,"meds"],
 ["Ivabradine",`A heart-rate-lowering drug labelled for heart failure, used off-label in POTS; its label warns of fetal toxicity <sup class="c" data-ref="FDA-Corlanor" title="Source 151">151</sup>.`,"meds"],
 ["Joint hypermobility syndrome (JHS)",`The pre-2017 label, with benign joint hypermobility syndrome (BJHS), now replaced by hEDS and HSD <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>.`,"hsd"],
 ["Kinesiophobia",`Fear of movement; 93% of 42 people with JHS/EDS-HT scored above the Tampa Scale cut-off <sup class="c" data-ref="Celletti2013" title="Source 82">82</sup>.`,"physio"],
 ["KLK15",`A kallikrein gene with a recurrent variant reported in hEDS families; Early evidence from one group and not a clinical test <sup class="c" data-ref="Gensemer2025KLK15" title="Source 178">178</sup>.`,"frontier"],
 ["Kyphoscoliotic EDS (kEDS)",`Autosomal recessive type from PLOD1 or FKBP14: congenital hypotonia, early kyphoscoliosis and GJH; about 1 in 100,000 <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>.`,"types"],
 ["L-HSD (localised HSD)",`Hypermobility at single joints or groups of joints, with a secondary manifestation in the same region <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>.`,"hsd"],
 ["Local anaesthetic failure",`Numbing that fails or wears off early. In a crossover trial, 53% of people with EDS vs 80% of controls were still numb 30 minutes after lidocaine <sup class="c" data-ref="Bourne2026RAPM" title="Source 54">54</sup>.`,"surgery"],
 ["Loeys-Dietz syndrome (LDS)",`A dominant TGF-β pathway aortopathy that can mimic vEDS but tolerates vascular surgery well <sup class="c" data-ref="Loeys2006,LoeysGR-LDS" title="Source 275,277">275,277</sup>.`,"differential"],
 ["Lysyl hydroxylase 1 (PLOD1)",`The enzyme that hydroxylates lysines for cross-links and sugars; its deficiency causes PLOD1-kyphoscoliotic EDS <sup class="c" data-ref="Yeowell2000" title="Source 512">512</sup>.`,"collagen"],
 ["Lysyl oxidase (LOX)",`The enzyme that oxidises lysines so collagen and elastin can cross-link <sup class="c" data-ref="Lucero2006" title="Source 279">279</sup>.`,"collagen"],
 ["Marfan syndrome",`An FBN1 disorder whose cardinal features are aortic root aneurysm and ectopia lentis; about 1 in 5,000–10,000 <sup class="c" data-ref="Loeys2010,Pollock2021" title="Source 276,368">276,368</sup>.`,"differential"],
 ["Mast cell activation syndrome (MCAS)",`Episodic mast-cell mediator symptoms confirmed by a tryptase rise; its link with hEDS is Hypothesis to Early evidence <sup class="c" data-ref="Valent2019IAAI,Kucharik2020" title="Source 254,473">254,473</sup>.`,"gut"],
 ["Mesenteric arteries",`The gut's arteries, the bed most often affected in genetically confirmed vEDS (31.7%) <sup class="c" data-ref="Shalhub2019JVS" title="Source 429">429</sup>.`,"vascular"],
 ["Midodrine",`An alpha-agonist labelled for orthostatic hypotension with a boxed warning for supine hypertension; off-label in POTS <sup class="c" data-ref="FDA-Midodrine" title="Source 156">156</sup>.`,"meds"],
 ["Mitral valve prolapse",`Billowing of the mitral valve; mild or greater on strict echocardiographic criteria counts as Feature A item 11 <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>.`,"criteria"],
 ["Molluscoid pseudotumour",`A fleshy, fibrotic nodule up to 3 cm at pressure points such as elbows and knees; highly diagnostic of classical EDS <sup class="c" data-ref="Stembridge2023,Ritelli2020C" title="Source 385,449">385,449</sup>.`,"skin"],
 ["Multidirectional instability",`Shoulder instability in several directions; common in hEDS/HSD, with altered scapular movement <sup class="c" data-ref="Spanhove2022" title="Source 444">444</sup>.`,"joints"],
 ["Musculocontractural EDS (mcEDS)",`Autosomal recessive type from CHST14 or DSE: a dermatan sulfate defect with dislocations and large haematomas <sup class="c" data-ref="KoshoGR-mcEDS,Minatogawa2022" title="Source 250,305">250,305</sup>.`,"types"],
 ["Myopathic EDS (mEDS)",`Caused by COL12A1 variants, dominant or recessive; congenital hypotonia improves with age <sup class="c" data-ref="Zou2014COL12A1,VanDijk2024" title="Source 480,517">480,517</sup>.`,"types"],
 ["Neuraxial anaesthesia",`Spinal or epidural anaesthesia; avoided in vEDS where possible <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>, while perinatal hEDS/HSD guidance prefers epidural over spinal <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>.`,"surgery"],
 ["Nociplastic pain",`Pain arising from altered pain processing rather than tissue or nerve damage; one of the mechanisms mixed in hypermobility-related pain <sup class="c" data-ref="Castori2026EOP" title="Source 79">79</sup>.`,"pain"],
 ["Obstructive sleep apnoea (OSA)",`Repeated airway collapse in sleep; 32% in EDS vs 6% in controls <sup class="c" data-ref="Gaisl2017" title="Source 173">173</sup>.`,"pain"],
 ["Occipitocervical fusion",`Surgery fixing the skull to the upper spine; uncontrolled series only, with a call for a prospective trial <sup class="c" data-ref="Henderson2024,Mao2022" title="Source 208,296">208,296</sup>.`,"pain"],
 ["Orthostatic intolerance",`Symptoms on standing that ease on lying down; 74.4% in hEDS vs 34.3% in controls <sup class="c" data-ref="DeWandele2016" title="Source 124">124</sup>.`,"autonomic"],
 ["Osteogenesis imperfecta (OI)",`A COL1A1/COL1A2 disorder whose hallmark is bone fragility, unlike EDS <sup class="c" data-ref="Marini2017" title="Source 297">297</sup>.`,"differential"],
 ["P-HSD (peripheral HSD)",`Hypermobility limited to the hands and/or feet with a secondary manifestation; peripheral JH may be a clue to vEDS <sup class="c" data-ref="Carroll2023" title="Source 72">72</sup>.`,"hsd"],
 ["Pacing",`Planning activity to avoid boom-and-bust; recommended by patients and clinicians but untested alone in hEDS/HSD (Hypothesis) <sup class="c" data-ref="Bennett2022" title="Source 40">40</sup>.`,"physio"],
 ["Papyraceous scar",`A paper-thin "cigarette paper" scar typical of classical EDS (65.3% of confirmed cases) <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>.`,"skin"],
 ["Pelvic organ prolapse",`Descent of pelvic organs; associated with joint hypermobility (pooled OR 2.37) <sup class="c" data-ref="VeitRubin2016" title="Source 486">486</sup>.`,"gut"],
 ["Periodontal EDS (pEDS)",`Autosomal dominant type from C1R or C1S: early severe periodontitis and lack of attached gingiva; first tooth loss at a median 21.5 years <sup class="c" data-ref="KapfererSeebacher2016,Lepperdinger2022" title="Source 238,263">238,263</sup>.`,"types"],
 ["Piezogenic papules",`Fat herniating into the heel skin on standing; common in healthy children (72%), so not specific <sup class="c" data-ref="vanStraaten1991" title="Source 483">483</sup>.`,"criteria"],
 ["POTS",`Postural orthostatic tachycardia syndrome: a sustained heart-rate rise of 30 beats/min or more on standing (40 at ages 12–19) without orthostatic hypotension <sup class="c" data-ref="Sheldon2015,Vernino2021" title="Source 431,488">431,488</sup>.`,"autonomic"],
 ["Precipitate labour",`Birth in 3 hours or less, reported in 28–36% in hEDS/HSD perinatal guidance <sup class="c" data-ref="Pezaro2024" title="Source 367">367</sup>.`,"pregnancy"],
 ["Preimplantation genetic diagnosis (PGD)",`Testing embryos for a known familial variant; possible in vEDS and cEDS, not in hEDS <sup class="c" data-ref="Byers2025GeneReviews,Hakim2024GeneReviews" title="Source 68,199">68,199</sup>.`,"pregnancy"],
 ["PREVEnt trial",`A phase 3 trial of the PKCβ inhibitor enzastaurin in vEDS, suspended on an "indefinite hold by company" <sup class="c" data-ref="NCT05463679" title="Source 334">334</sup>.`,"frontier"],
 ["Procollagen",`The precursor of collagen, with propeptides at both ends that keep it soluble until they are cut off <sup class="c" data-ref="Shoulders2009,Hulmes2002" title="Source 217,432">217,432</sup>.`,"collagen"],
 ["Prolyl 4-hydroxylase",`The ER enzyme that turns proline into 4-hydroxyproline in the Yaa position <sup class="c" data-ref="Shoulders2009,Myllyharju2003" title="Source 324,432">324,432</sup>.`,"collagen"],
 ["Propranolol (low dose)",`A beta-blocker used off-label in POTS; 20 mg improved symptoms more than 80 mg <sup class="c" data-ref="Raj2009Circ" title="Source 373">373</sup>.`,"meds"],
 ["Proprioception",`The sense of joint position and movement; poorer in the lower limbs in benign joint hypermobility syndrome (meta-analysis of 254 people) <sup class="c" data-ref="Smith2013BJHS" title="Source 436">436</sup>.`,"joints"],
 ["Pyridinoline ratio",`The urinary deoxypyridinoline to pyridinoline ratio, raised in PLOD1-kEDS <sup class="c" data-ref="RohrbachGR-kEDS" title="Source 390">390</sup>.`,"types"],
 ["Pyridostigmine",`An acetylcholinesterase inhibitor labelled for myasthenia gravis, used off-label in POTS <sup class="c" data-ref="FDA-Mestinon,Sheldon2015" title="Source 155,431">155,431</sup>.`,"meds"],
 ["Revised Ghent nosology",`The 2010 Marfan criteria built on aortic root aneurysm, ectopia lentis, FBN1 testing and a systemic score <sup class="c" data-ref="Loeys2010" title="Source 276">276</sup>.`,"differential"],
 ["Skin hyperextensibility",`Skin that stretches beyond 1.5 cm at the forearm and back of the hand, or 3 cm at the neck, elbows and knees <sup class="c" data-ref="Ritelli2020C,Stembridge2023" title="Source 385,449">385,449</sup>.`,"skin"],
 ["Small-fibre neuropathy",`Damage to thin sensory and autonomic nerve fibres; found on biopsy in 61% of 31 people with hEDS, though findings disagree <sup class="c" data-ref="Igharo2023,DiStefano2016" title="Source 128,218">128,218</sup>.`,"pain"],
 ["Spondylodysplastic EDS (spEDS)",`Autosomal recessive type from B4GALT7, B3GALT6 or SLC39A13: short stature, hypotonia and bowed limbs <sup class="c" data-ref="VanDijk2024" title="Source 480">480</sup>.`,"types"],
 ["Stickler syndrome",`A type II/XI collagenopathy with myopia, retinal detachment, hearing loss and cleft palate <sup class="c" data-ref="MortierGR-Stickler" title="Source 317">317</sup>.`,"differential"],
 ["Striae",`Stretch marks; in hEDS Feature A they count only at set sites and without major weight change <sup class="c" data-ref="Fairweather2025" title="Source 147">147</sup>.`,"criteria"],
 ["Subcutaneous spheroid",`A hard, pea-sized calcified fat lobule over the ulna or tibia, seen in classical EDS <sup class="c" data-ref="Stembridge2023" title="Source 449">449</sup>.`,"skin"],
 ["Subluxation",`A partial dislocation; reported in 29.3% of people with classical EDS <sup class="c" data-ref="Ritelli2020C" title="Source 385">385</sup>.`,"joints"],
 ["Systemic score (Ghent)",`A Marfan scoring system with a maximum of 20; 7 or more is significant <sup class="c" data-ref="Pollock2021" title="Source 368">368</sup>.`,"differential"],
 ["Tampa Scale for Kinesiophobia",`A questionnaire for fear of movement used in hypermobility trials <sup class="c" data-ref="Celletti2013,Spanhove2023" title="Source 82,445">82,445</sup>.`,"physio"],
 ["Tenascin-X",`A matrix protein that regulates collagen deposition; its recessive deficiency (TNXB) causes classical-like EDS type 1 <sup class="c" data-ref="Mao2002,Schalkwijk2001" title="Source 295,413">295,413</sup>.`,"collagen"],
 ["Thumb sign (Steinberg)",`The whole distal phalanx of the thumb sticks out past the clenched fist <sup class="c" data-ref="Pollock2021" title="Source 368">368</sup>.`,"criteria"],
 ["Tilt-table test",`Head-up tilt to provoke orthostatic changes; 41.0% of an hEDS subsample had postural tachycardia <sup class="c" data-ref="DeWandele2016" title="Source 124">124</sup>.`,"autonomic"],
 ["Tranexamic acid",`An antifibrinolytic that can be considered before surgery in EDS with a bleeding history <sup class="c" data-ref="Wiesmann2014" title="Source 505">505</sup>.`,"meds"],
 ["Triple helix",`Three left-handed chains coiled into a right-handed helix, with glycine at every third position <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>.`,"collagen"],
 ["Tryptase \"20% + 2\" rule",`An event-related tryptase rise of at least 20% plus 2 ng/mL over baseline, the consensus marker of mast-cell activation <sup class="c" data-ref="Valent2019IAAI" title="Source 473">473</sup>.`,"gut"],
 ["Type III collagen",`A homotrimer of α1(III) chains found in skin, blood vessels and intestine; its gene is COL3A1 <sup class="c" data-ref="Shoulders2009" title="Source 432">432</sup>.`,"collagen"],
 ["Type V collagen",`A minor fibrillar collagen that co-assembles with type I and controls fibril number; too little causes classical EDS <sup class="c" data-ref="Wenstrup2004,Wenstrup2006" title="Source 502,503">502,503</sup>.`,"collagen"],
 ["ULHAT",`The Upper Limb Hypermobility Assessment Tool: 12 items, cut-point 7 or more <sup class="c" data-ref="Nicholson2018" title="Source 341">341</sup>.`,"beighton"],
 ["Variant of uncertain significance (VUS)",`A genetic change whose effect is not yet known; some are later reclassified <sup class="c" data-ref="Ghali2019GenetMed,Weerakkody2016" title="Source 181,498">181,498</sup>.`,"genes"],
 ["Vascular EDS (vEDS)",`Autosomal dominant COL3A1 type, about 1 in 50,000 to 200,000, with arterial, bowel and uterine rupture <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>.`,"vascular"],
 ["vEDS passport",`An individual emergency plan with the diagnosis and management, recommended by the 2017 consensus <sup class="c" data-ref="Byers2017" title="Source 67">67</sup>.`,"nursing"],
 ["Villefranche nosology",`The 1997 classification (published 1998) with 6 named types and major and minor criteria <sup class="c" data-ref="Beighton1998" title="Source 35">35</sup>.`,"history"],
 ["Wrist sign (Walker-Murdoch)",`Thumb and little finger overlap when wrapped around the opposite wrist <sup class="c" data-ref="Pollock2021" title="Source 368">368</sup>.`,"criteria"],
 ["WOSI",`Western Ontario Shoulder Instability Index, 0–2100 with lower better; minimal important difference 252 <sup class="c" data-ref="Liaghat2022BJSM" title="Source 268">268</sup>.`,"physio"],
 ["Zebra",`The EDS community symbol, from "think horses, not zebras": the rare answer is sometimes right <sup class="c" data-ref="Park2025,Bashe2025" title="Source 28,359">28,359</sup>.`,"what"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold Greek letters and hyphens, so 'b1', 'alpha' and 'col3a1' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/β/g,'b').replace(/α/g,'a').replace(/[-–]/g,'');
  const L0=GL_LIST.slice().sort((a,b)=>a[0].localeCompare(b[0]));
  function render(){const q=norm(inp.value.trim());const L=L0.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2]).replace('&','&amp;')}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GL_LIST.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SR_AREAN={A:'Epidemiology, history & the classification',B:'Genetics, collagen biology & the 13 types',C:'Mechanisms: tissue, joints, skin, pain & fatigue',D:'Diagnosis, criteria, differential & assessment tools',E:'Treatment: physiotherapy, exercise & psychological care',F:'Treatment: medicines, surgery & anaesthesia',G:'Course, comorbidity & outcomes',H:'Living, family, nursing & research toward better care'};
const SR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const SR_svc=s=>s.unverified?[]:SR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const SR_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','All']].concat(Object.entries(SR_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l.replace('&','&amp;')}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>SR_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=SR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`${nAll} sources in all. ${nAll-nChk} were confirmed against a database before inclusion (some by more than one: ${svcTxt}). ${nChk} are marked <span class="tag warn">check</span>.`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=SR_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${SR_link(s)?`<a href="${esc(SR_link(s))}" target="_blank" rel="noopener">${esc(SR_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${esc(SR_AREAN[a]||a)}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">check</span>':''}</span></li>`}).join('');
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
