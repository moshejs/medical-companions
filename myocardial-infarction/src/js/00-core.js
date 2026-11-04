<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('mi:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('mi:'+k,JSON.stringify(v))}catch(e){}}};
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
   numbers (no STEMI thresholds, no troponin cut-offs, no score bands, no door-to-balloon targets):
   callers pass them in from the research, with the citation in the surrounding text. The ECG shape
   defaults below are drawing proportions, not criteria.
   heart(x,y,s,o)             an anterior view of the heart centred on (x,y), apex to the lower RIGHT of the
                              viewer (the patient's left), with the aortic arch (with its three branches) and pulmonary trunk above and the
                              coronary arteries on its surface: rca (right coronary, down the right side and
                              round the inferior border, with an acute marginal branch), lm (left main), lad
                              (left anterior descending, down to the apex, with a diagonal), lcx (circumflex,
                              round to the lateral side, with an obtuse marginal). s = scale (1 = 200 wide,
                              about 200 tall). o: {terr:{lad,rca,lcx: 0..2} the territory each artery supplies
                              (0 healthy muscle, 1 fully ischaemic grey-violet, 2 necrotic dark; fractions
                              blend), occl:{a:'lad'|'rca'|'lcx'|'lm', at:0..1 along that artery, v:0..1} a
                              clot that greys the artery downstream as v rises, stent:{a, at, v} stent struts
                              at a point (v = opacity), hl:['lad',...] arteries drawn thicker, labels (true or
                              an array of artery keys: names beside them), id (unique clip id when two hearts
                              share an svg)}. Returns {svg, at:{rca,lad,lcx,lm,apex,lv,inf,lat}, along(a,u)}.
                              lv/inf/lat are the centres of the anterior, inferior and lateral territories.
   artery(x,y,w,h,o)          a coronary artery in long section, flow left to right, in the box: wall layers
                              (adventitia, media, intima) above and below a lumen of blood cells. o: {plaque
                              (0..1 size of a plaque bulging from the lower wall), px (0..1 its centre along
                              the box, .5), cap (0..1 fibrous cap thickness: 1 thick and stable, 0 thin),
                              ldl (0..1 LDL particles entering the wall), rupture (0..1 a crack in the cap with
                              core spilling), erode (0..1 surface erosion without rupture), clot (0..1 a
                              thrombus growing from the plaque; 1 blocks the lumen), flow (0..1 blood cells
                              upstream, 1), down (0..1 cells downstream; default 1 - clot), ph (0..1 phase of
                              the moving cells: pass t times a speed), balloon (0..1 a balloon on a wire
                              inflating at the plaque), stent (0..1 stent struts against the wall), squash
                              (0..1 the plaque pressed back; defaults to max(balloon, stent)), seed}.
                              Returns {svg, at:{plaque:[x,y] its top, top (lumen top y), bot (lumen bottom y),
                              cx (plaque centre x)}}.
   xsec(cx,cy,r,o)            the same artery in cross-section, r = outer radius: adventitia, media, intima,
                              an eccentric plaque with a lipid core, the lumen. o: {plaque (0..1 how much the
                              lumen is narrowed), cap (0..1), clot (0..1 thrombus filling the lumen), stent
                              (0..1 struts round the lumen), squash, rupture (0..1 a break in the cap)}.
                              Returns {svg, lumen:[x,y,r]}.
   platelet(x,y,s,o)          one platelet, s = width: a smooth disc at rest, a spiky activated cell as
                              o.act (0..1) rises. o: {act, rec (true: P2Y12 receptors drawn on its rim),
                              block (0..1 a drug sitting in those receptors), tx (0..1 thromboxane dots
                              released; aspirin lowers it), ang (degrees)}.
   ecgGrid(x,y,w,h,o)         ECG paper: pink background, 1 mm lines and bold 5 mm lines. o: {mm (px per mm,
                              4), minor (false hides the 1 mm lines, e.g. on phones)}.
   ecgBeat(u,o)               the height in mm of one schematic P-QRS-T beat at u seconds after its start
                              (P near 0.09 s, QRS near 0.22 s, T near 0.37 s). o (all in mm): {p (P wave,
                              1.5), q (Q wave depth, 0; deeper Q waves are also wider), r (R wave, 10), rloss
                              (0..1 R wave lost, as Q waves form), s (S wave, 2.5), st (ST shift at the J
                              point: + elevation, - depression; 0), t (T wave, 3; negative = inverted), hyper
                              (0..1 a tall, broad-based, peaked hyperacute T)}.
   ecgTrace(x,y,w,o)          a rhythm strip from x to x+w with its isoelectric baseline at y. o: {mm (4),
                              speed (mm per second, 25), hr (beats per minute, 70), from (seconds already
                              elapsed: scrolls the strip), upto (0..1 of the width drawn, for a writing pen),
                              per (k => beat parameters for beat k, merged over o; lets a strip evolve beat by
                              beat), col (var(--ecg-ink)), lw (1.6), cal (true: a calibration pulse at the
                              left), pen (true: a dot at the pen)} plus any ecgBeat parameter. Returns {svg, d,
                              penX, penY}.
   tropCurve(x,y,w,h,pts,o)   a biomarker time course through the caller's cited points pts [[t, value],...]
                              (monotone, never overshooting). o: {x0, x1 (time domain; default the first and
                              last t), y0, y1 (value range), log (true: log10 value axis; y0 must be > 0), url
                              (a reference line value, e.g. the assay's 99th percentile), urlLabel, upto (draw
                              to this t), col (var(--trop)), fill, dot, dash}. Returns {svg, X, Y, at, f}.
   clock(cx,cy,r,min,o)       a clock face with hands at min minutes past o.h0 (hours, 0) and a filled sector
                              for the time elapsed. o: {full (minutes for a full sector, 60), col
                              (var(--brand)), label (under the face), ticks (12)}.
   bodymap(x,y,s,o)           a front-view person outline (head, trunk, arms) with the regions where heart
                              attack pain or pressure can be felt: chest (centre), jaw, neck, lshoulder,
                              rshoulder, larm (the person's left arm: the viewer's RIGHT), rarm, epi (upper
                              belly), back (a dashed ring: felt behind). (x,y) = the top of the head; s = scale
                              (1 = about 150 wide, 185 tall). o: {hl:{region: 0..1 glow}, col (var(--pain)),
                              labels (true or an array of region keys)}. Returns {svg, at:{region:[x,y]}}.
   stent(x,y,w,h,o)           a stent in side view in the box: a diamond mesh, crimped at o.exp 0 and fully
                              open (h tall) at 1; o: {exp, balloon (0..1 a balloon inflating inside it), wire
                              (true)}.
   icons(x,y,o)               an icon array: o {n (100), cols (10), k (number highlighted), size (12), gap (3),
                              col (var(--brand)), base (var(--line)), shape ('person' or 'dot')}.
                              Returns {svg, h (height), at(i)->[x,y]}.
   curve(x,y,w,h,f,o)         a plotted function f(x) in the box with axes. o: {x0,x1 (domain, default 0..1),
                              y0,y1 (range, default 0..1), upto, col (var(--brand)), fill, bands ([{from,to,
                              col,label}] horizontal shaded bands in y units from the caller's source), dot,
                              lw (2.6), dash}. Returns {svg, X(xv)->px, Y(yv)->px, at(xv)->[px,py]}.
   tline(x,y,w,o)             a horizontal time axis: o {min, max, step, fmt(v)->label, label, big (ticks
                              above)}. Returns {svg, X(v)->x}.
   gauge(cx,cy,r,v,max,o)     a half-dial score gauge (0 at the left, max at the right) with a needle at v.
                              o: {bands ([{to, col, label}] from the caller's cited source; none by default),
                              label, big (true: the score as a large number)}.
   ladder(x,y,w,h,steps,o)    rising stairs from bottom-left, one step per label (a treatment ladder, a
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
/* sample a chain of cubic Bezier segments [[p0,c1,c2,p1],...] into points */
function bezPts(segs,N=22){const out=[];segs.forEach((g,j)=>{for(let i=j?1:0;i<=N;i++){const t=i/N,m=1-t;
  out.push([m*m*m*g[0][0]+3*m*m*t*g[1][0]+3*m*t*t*g[2][0]+t*t*t*g[3][0],m*m*m*g[0][1]+3*m*m*t*g[1][1]+3*m*t*t*g[2][1]+t*t*t*g[3][1]])}});return out}
/* heart: local 200 x 200 box, centred on (100,100) */
const HEART_OUT=[[50,62],[36,92],[36,126],[54,158],[92,180],[134,192],[158,172],[174,132],[174,94],[156,66],[124,56],[86,56]];
const HEART_ART={
  rca:bezPts([[[86,66],[62,70],[42,92],[41,122]],[[41,122],[42,150],[62,170],[96,182]]]),
  lm:bezPts([[[104,66],[108,70],[112,73],[118,77]]],8),
  lad:bezPts([[[118,77],[121,110],[128,150],[140,189]]]),
  lcx:bezPts([[[118,77],[140,80],[162,94],[171,118]]])};
const HEART_BR={rca:bezPts([[[43,138],[54,146],[64,150],[76,151]]],10),lad:bezPts([[[123,108],[134,114],[145,123],[153,135]]],10),lcx:bezPts([[[159,90],[166,102],[168,116],[165,134]]],10)};
const HEART_TERR={rca:[[16,138],[52,156],[96,178],[160,186],[160,214],[16,214]],lcx:[[136,70],[186,72],[186,152],[160,146],[147,100]],
  lad:[[98,84],[146,86],[166,140],[160,200],[100,200],[94,140]]};
function heart(x,y,s=1,o={}){const T=(p)=>[x+(p[0]-100)*s,y+(p[1]-100)*s],id=o.id||('hc'+Math.round(x)+'_'+Math.round(y)),terr=o.terr||{},sw=v=>f1(v/s);
  const along=(a,u)=>{const P=HEART_ART[a];return T(P[Math.round(clamp(u)*(P.length-1))])};
  let g=`<g transform="translate(${f1(x-100*s)} ${f1(y-100*s)}) scale(${s})">`;
  g+=`<path d="M102 13L99 1M114 10V-2M126 12L130 0" style="fill:none;stroke:var(--vessel);stroke-width:5;stroke-linecap:round"/><path d="M90 66C86 40 88 22 104 15C122 8 144 12 152 28L154 44" style="fill:none;stroke:var(--vessel);stroke-width:15;stroke-linecap:round"/>`;
  g+=`<path d="M114 70C116 56 122 46 138 40" style="fill:none;stroke:var(--panel);stroke-width:15;stroke-linecap:round"/><path d="M114 70C116 56 122 46 138 40" style="fill:none;stroke:var(--vessel);stroke-width:11.5;stroke-linecap:round"/>`;
  const out=smoothPath(HEART_OUT);
  g+=`<clipPath id="${id}"><path d="${out}"/></clipPath><path d="${out}" style="fill:var(--muscle);stroke:var(--muscle-dark);stroke-width:${sw(1.6)}"/>`;
  g+=`<path d="M52 70C60 88 58 104 46 116" style="fill:none;stroke:var(--muscle-dark);stroke-width:${sw(1.2)};opacity:.5"/>`;
  ['rca','lcx','lad'].forEach(k=>{const v=clamp(terr[k]||0,0,2);if(v<=0)return;const d=ptsD(HEART_TERR[k])+'Z';
    g+=`<path d="${d}" clip-path="url(#${id})" style="fill:var(--isch-fill);opacity:${f1(Math.min(1,v)*.92)}"/>`;
    if(v>1)g+=`<path d="${d}" clip-path="url(#${id})" style="fill:var(--necro-fill);opacity:${f1((v-1)*.95)}"/>`});
  const oc=o.occl||null,ocv=oc?clamp(oc.v==null?1:oc.v):0,hl=o.hl||[];
  const vessel=(P,w,dn)=>`<path d="${ptsD(P)}" style="fill:none;stroke:var(--cap);stroke-width:${f1(w+2.8)};stroke-linecap:round;stroke-linejoin:round"/><path d="${ptsD(P)}" style="fill:none;stroke:${dn?'var(--isch)':'var(--coronary)'};stroke-width:${f1(w)};stroke-linecap:round;stroke-linejoin:round${dn?';stroke-dasharray:3 2.4':''}"/>`;
  /* downstream of a clot: the artery, its branch and the next arteries in line lose flow */
  const downOf=a=>oc&&ocv>.45&&(oc.a===a||(oc.a==='lm'&&(a==='lad'||a==='lcx')));
  for(const k of ['rca','lcx','lad']){const br=HEART_BR[k];g+=vessel(br,1.7,downOf(k))}
  for(const k of ['rca','lm','lcx','lad']){const P=HEART_ART[k],w=hl.includes(k)?4.4:3.2;
    if(oc&&oc.a===k&&ocv>.45){const i=Math.round(clamp(oc.at)*(P.length-1));g+=vessel(P.slice(0,i+1),w,false)+vessel(P.slice(i),w,true)}
    else g+=vessel(P,w,downOf(k)&&oc.a!==k)}
  if(oc&&ocv>0){const P=HEART_ART[oc.a],p=P[Math.round(clamp(oc.at)*(P.length-1))];g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(2+ocv*3.2)}" style="fill:var(--clot);stroke:var(--cell);stroke-width:${sw(1.2)}"/>`}
  if(o.stent&&o.stent.v>0){const P=HEART_ART[o.stent.a],i=Math.round(clamp(o.stent.at)*(P.length-1)),a=P[Math.max(0,i-3)],b=P[Math.min(P.length-1,i+3)];
    g+=`<path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:var(--stent);stroke-width:6.4;stroke-dasharray:1.6 1.4;opacity:${f1(clamp(o.stent.v))}"/>`}
  g+='</g>';
  const at={rca:T([34,104]),lad:T([142,192]),lcx:T([176,112]),lm:T([108,70]),apex:T([140,190]),lv:T([132,138]),inf:T([96,190]),lat:T([170,100])};
  if(o.labels){const L=o.labels===true?['rca','lad','lcx']:o.labels,NM={rca:'RCA',lad:'LAD',lcx:'LCx',lm:'LM'},AN={rca:'t-end',lad:'',lcx:'',lm:'t-mid'},OF={rca:[-4,0],lad:[6,10],lcx:[6,0],lm:[0,-10]};
    L.forEach(k=>{const p=at[k];g+=`<text x="${f1(p[0]+OF[k][0])}" y="${f1(p[1]+OF[k][1])}" class="t-xs ${AN[k]}" style="fill:var(--ink);font-weight:600">${NM[k]}</text>`})}
  return {svg:g,at,along}}
function artery(x,y,w,h,o={}){const rr=rng(o.seed||7),wt=h*.24,yt=y+wt,yb=y+h-wt,lh=yb-yt,cx=x+w*(o.px==null?.5:o.px),L=w*.2;
  const sq=clamp(o.squash==null?Math.max(o.balloon||0,o.stent||0):o.squash),H=clamp(o.plaque||0)*lh*.62*(1-sq*.75),cap=clamp(o.cap==null?1:o.cap),cl=clamp(o.clot||0);
  const flow=o.flow==null?1:clamp(o.flow),down=o.down==null?1-cl:clamp(o.down),ph=o.ph||0;
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="4" style="fill:var(--adv)"/>`;
  s+=`<rect x="${f1(x)}" y="${f1(y+wt*.38)}" width="${f1(w)}" height="${f1(h-wt*.76)}" style="fill:var(--media)"/>`;
  s+=`<rect x="${f1(x)}" y="${f1(yt-wt*.18)}" width="${f1(w)}" height="${f1(lh+wt*.36)}" style="fill:var(--wall)"/>`;
  s+=`<rect x="${f1(x)}" y="${f1(yt)}" width="${f1(w)}" height="${f1(lh)}" style="fill:var(--blood-soft)"/>`;
  /* blood cells: upstream at o.flow, downstream of the plaque at o.down */
  const n=Math.max(4,Math.round(w/16));
  for(let i=0;i<n;i++){const u=((i/n)+ph*1.0+rr()*.04)%1,bx=x+6+u*(w-12),by=yt+lh*(.22+.56*rr());const dn=bx>cx+L*.5,f=dn?down:flow;
    if(f<=.02||(H>0&&Math.abs(bx-cx)<L&&by>yb-H*(1-Math.abs(bx-cx)/L)-3))continue;
    s+=`<ellipse cx="${f1(bx)}" cy="${f1(by)}" rx="${f1(Math.min(5,lh*.14))}" ry="${f1(Math.min(2.6,lh*.075))}" style="fill:var(--blood);opacity:${f1(.35+.65*f)}"/>`}
  /* LDL particles entering the wall */
  for(let i=0;i<Math.round(clamp(o.ldl||0)*12);i++){const lx=cx+(rr()-.5)*L*2.2,ly=i%2?yb-2-rr()*lh*.3:yb+2+rr()*wt*.5;s+=`<circle cx="${f1(lx)}" cy="${f1(ly)}" r="2.1" style="fill:var(--plaque);stroke:var(--core);stroke-width:.6"/>`}
  let top=[cx,yb];
  if(H>.5){const sp=`M${f1(cx-L)} ${f1(yb)}C${f1(cx-L*.5)} ${f1(yb)} ${f1(cx-L*.45)} ${f1(yb-H)} ${f1(cx)} ${f1(yb-H)}C${f1(cx+L*.45)} ${f1(yb-H)} ${f1(cx+L*.5)} ${f1(yb)} ${f1(cx+L)} ${f1(yb)}Z`;
    s+=`<path d="${sp}" style="fill:var(--cap);stroke:var(--media);stroke-width:1"/>`;
    const cy=yb-H*.42,ry=H*(.2+.18*(1-cap));s+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(L*.5)}" ry="${f1(ry)}" style="fill:var(--plaque)"/><ellipse cx="${f1(cx+L*.06)}" cy="${f1(cy+ry*.15)}" rx="${f1(L*.26)}" ry="${f1(ry*.5)}" style="fill:var(--core);opacity:.7"/>`;
    top=[cx,yb-H];
    const ru=clamp(o.rupture||0);if(ru>0){const kx=cx-L*.12;s+=`<path d="M${f1(kx-3)} ${f1(yb-H+1)}l3 ${f1(H*.14*ru+2)}l-2 ${f1(H*.1*ru)}l4 ${f1(H*.12*ru)}" style="fill:none;stroke:var(--clot);stroke-width:${f1(1+ru*1.4)};stroke-linecap:round;stroke-linejoin:round"/>`;
      for(let i=0;i<Math.round(ru*6);i++)s+=`<circle cx="${f1(kx+(rr()-.3)*14)}" cy="${f1(yb-H-2-rr()*10*ru)}" r="1.6" style="fill:var(--core);opacity:${f1(ru)}"/>`}
    const er=clamp(o.erode||0);if(er>0)for(let i=0;i<4;i++){const ex=cx-L*.4+i*L*.26;s+=`<path d="M${f1(ex)} ${f1(yb-H*(1-Math.pow(Math.abs(ex-cx)/L,2)*.9)-1)}h5" style="stroke:var(--clot);stroke-width:1.6;stroke-dasharray:1.5 1.5;opacity:${f1(er)}"/>`}}
  if(cl>0){const gap=top[1]-yt,ch=gap*cl+2,x0=top[0]-L*.62*(.5+cl*.5),x1=top[0]+L*.4*(.5+cl*.5);
    s+=`<path d="M${f1(x0)} ${f1(top[1]+3)}C${f1(x0)} ${f1(top[1]-ch*.7)} ${f1(x0+8)} ${f1(top[1]-ch)} ${f1((x0+x1)/2)} ${f1(top[1]-ch)}C${f1(x1-6)} ${f1(top[1]-ch)} ${f1(x1)} ${f1(top[1]-ch*.6)} ${f1(x1)} ${f1(top[1]+3)}Z" style="fill:var(--clot)"/>`;
    for(let i=0;i<Math.round(4+cl*8);i++)s+=`<circle cx="${f1(lerp(x0+3,x1-3,rr()))}" cy="${f1(top[1]-rr()*ch*.9)}" r="1.7" style="fill:var(--plt)"/>`;
    for(let i=0;i<3;i++){const fy=top[1]-ch*(.25+i*.25);s+=`<path d="M${f1(x0+2)} ${f1(fy)}Q${f1((x0+x1)/2)} ${f1(fy-4)} ${f1(x1-2)} ${f1(fy+2)}" style="fill:none;stroke:var(--cap);stroke-width:.7;opacity:.7"/>`}}
  const bl=clamp(o.balloon||0);if(bl>0){const my=(yt+yb)/2;s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(my)}" y2="${f1(my)}" style="stroke:var(--stent);stroke-width:1.2"/><ellipse cx="${f1(cx)}" cy="${f1(my)}" rx="${f1(L*.75)}" ry="${f1(1.5+lh*.46*bl)}" style="fill:var(--balloon);opacity:.5;stroke:var(--balloon);stroke-width:1"/>`}
  const st=clamp(o.stent||0);if(st>0){const a0=cx-L*.8,a1=cx+L*.8,k=10,zz=(yy,dir)=>{let d=`M${f1(a0)} ${f1(yy)}`;for(let i=1;i<=k;i++)d+=`L${f1(a0+(a1-a0)*i/k)} ${f1(yy+(i%2?dir*4:0))}`;return d};
    s+=`<path d="${zz(yt+1,1)}" style="fill:none;stroke:var(--stent);stroke-width:1.6;opacity:${f1(st)}"/><path d="${zz(Math.min(yb,top[1])-1,-1)}" style="fill:none;stroke:var(--stent);stroke-width:1.6;opacity:${f1(st)}"/>`}
  return {svg:s,at:{plaque:top,top:yt,bot:yb,cx}}}
function xsec(cx,cy,r,o={}){const sq=clamp(o.squash==null?(o.stent||0):o.squash),p=clamp(o.plaque||0)*(1-sq*.7),ri=r*.7,rl=r*.62*(1-p*.6),ly=cy-(ri-rl)*.92*Math.min(1,p*3),cl=clamp(o.clot||0),cap=clamp(o.cap==null?1:o.cap);
  let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--adv)"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.86)}" style="fill:var(--media)"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(ri)}" style="fill:var(--cap)"/>`;
  if(p>.05){const gy=(ly+rl+cy+ri)/2,gh=(cy+ri)-(ly+rl);s+=`<ellipse cx="${f1(cx)}" cy="${f1(gy)}" rx="${f1(ri*.55*Math.min(1,p*1.6))}" ry="${f1(gh*(.22+.16*(1-cap)))}" style="fill:var(--plaque)"/>`}
  s+=`<circle cx="${f1(cx)}" cy="${f1(ly)}" r="${f1(rl)}" style="fill:var(--blood-soft);stroke:var(--wall);stroke-width:1.4"/>`;
  if((o.rupture||0)>0)s+=`<path d="M${f1(cx-3)} ${f1(ly+rl-1)}l3 ${f1(4+o.rupture*5)}l2 -3" style="fill:none;stroke:var(--clot);stroke-width:1.8;stroke-linecap:round;opacity:${f1(clamp(o.rupture))}"/>`;
  if(cl>0){const cr=rl*cl;s+=`<circle cx="${f1(cx)}" cy="${f1(ly+rl-cr)}" r="${f1(cr)}" style="fill:var(--clot)"/>`}
  const st=clamp(o.stent||0);if(st>0)for(let i=0;i<10;i++){const a=i/10*Math.PI*2;s+=`<rect x="${f1(cx+Math.cos(a)*rl-1.8)}" y="${f1(ly+Math.sin(a)*rl-1.8)}" width="3.6" height="3.6" style="fill:var(--stent);opacity:${f1(st)}"/>`}
  return {svg:s,lumen:[cx,ly,rl]}}
function platelet(x,y,s=24,o={}){const a=clamp(o.act||0),n=14,R=s/2;let P=[];
  for(let i=0;i<n;i++){const t=i/n*Math.PI*2,spike=i%2?1+a*.55:1-a*.08,rx=R*spike,ry=R*lerp(.5,.92,a)*spike;P.push([Math.cos(t)*rx,Math.sin(t)*ry])}
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})"><path d="${a<.05?smoothPath(P):ptsD(P)+'Z'}" style="fill:var(--plt-soft);stroke:var(--plt);stroke-width:1.4;stroke-linejoin:round"/>`;
  for(let i=0;i<4;i++)g+=`<circle cx="${f1((i-1.5)*R*.32)}" cy="${f1((i%2-.5)*R*.22)}" r="${f1(R*.09)}" style="fill:var(--plt)"/>`;
  if(o.rec){const bk=clamp(o.block||0);for(let i=0;i<3;i++){const t=-Math.PI/2+(i-1)*.6,rx=Math.cos(t)*R*lerp(1,1.1,a),ry=Math.sin(t)*R*lerp(.5,.92,a);
    g+=`<path d="M${f1(rx-3)} ${f1(ry-3)}v3a3 3 0 0 0 6 0v-3" transform="rotate(${f1((t+Math.PI/2)*57.3)} ${f1(rx)} ${f1(ry)})" style="fill:none;stroke:var(--isch);stroke-width:1.4"/>`;
    if(bk>0)g+=`<circle cx="${f1(rx)}" cy="${f1(ry)}" r="2.4" style="fill:var(--rx);opacity:${f1(bk)}"/>`}}
  const tx=clamp(o.tx||0);for(let i=0;i<Math.round(tx*6);i++){const t=i/6*Math.PI*2+.4;g+=`<circle cx="${f1(Math.cos(t)*R*1.5)}" cy="${f1(Math.sin(t)*R*1.15)}" r="1.6" style="fill:var(--warn)"/>`}
  return g+'</g>'}
function ecgGrid(x,y,w,h,o={}){const mm=o.mm||4;let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--ecg-paper)"/>`,d1='',d5='';
  for(let i=0;i*mm<=w+.01;i++){const xx=f1(x+i*mm);(i%5?(d1+=`M${xx} ${f1(y)}V${f1(y+h)}`):(d5+=`M${xx} ${f1(y)}V${f1(y+h)}`))}
  for(let i=0;i*mm<=h+.01;i++){const yy=f1(y+h-i*mm);(i%5?(d1+=`M${f1(x)} ${yy}H${f1(x+w)}`):(d5+=`M${f1(x)} ${yy}H${f1(x+w)}`))}
  if(o.minor!==false&&mm>=2.5)s+=`<path d="${d1}" style="fill:none;stroke:var(--ecg-grid);stroke-width:.5"/>`;
  return s+`<path d="${d5}" style="fill:none;stroke:var(--ecg-major);stroke-width:.9"/>`}
function ecgBeat(u,o={}){const G=(c,w)=>Math.exp(-Math.pow((u-c)/w,2)),q=Math.max(0,o.q||0),hy=clamp(o.hyper||0),st=o.st||0;
  const pl=ramp(u,.245,.262)*(1-ramp(u,.38,.47));/* ST segment from the J point, merging into the T wave */
  return (o.p==null?1.5:o.p)*G(.09,.034)-q*G(.19,.012+.008*Math.min(q,6)/6)+(o.r==null?10:o.r)*(1-clamp(o.rloss||0))*G(.215,.011)
    -(o.s==null?2.5:o.s)*G(.24,.011)+st*pl+(o.t==null?3:o.t)*(1+hy*.9)*G(.37,.05+.02*hy)}
function ecgTrace(x,y,w,o={}){const mm=o.mm||4,sp=o.speed||25,per=60/(o.hr||70),from=o.from||0,up=clamp(o.upto==null?1:o.upto),col=o.col||'var(--ecg-ink)';let s='';
  if(o.cal){s+=`<path d="M${f1(x)} ${f1(y)}h${f1(mm)}v${f1(-10*mm)}h${f1(5*mm)}v${f1(10*mm)}h${f1(mm)}" style="fill:none;stroke:${col};stroke-width:1.2"/>`;x+=7*mm;w-=7*mm}
  const dur=w/(mm*sp),N=Math.max(40,Math.round(w*1.2));let d='',px=x,py=y;
  for(let i=0;i<=Math.round(N*up);i++){const ts=from+dur*i/N,k=Math.floor(ts/per),u=ts-k*per,P=o.per?Object.assign({},o,o.per(k)):o;
    px=x+w*i/N;py=y-ecgBeat(u,P)*mm;d+=(i?'L':'M')+f1(px)+' '+f1(py)}
  s+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:${o.lw||1.6};stroke-linejoin:round;stroke-linecap:round"/>`;
  if(o.pen)s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3" style="fill:var(--brand)"/>`;
  return {svg:s,d,penX:px,penY:py}}
/* monotone cubic interpolation (Fritsch-Carlson) through sorted points */
function monoFn(P){const n=P.length,dx=[],m=[],t=[];for(let i=0;i<n-1;i++){dx[i]=P[i+1][0]-P[i][0];m[i]=(P[i+1][1]-P[i][1])/dx[i]}
  t[0]=m[0];t[n-1]=m[n-2];for(let i=1;i<n-1;i++)t[i]=m[i-1]*m[i]<=0?0:3*(dx[i-1]+dx[i])/((2*dx[i]+dx[i-1])/m[i-1]+(dx[i]+2*dx[i-1])/m[i]);
  return v=>{if(v<=P[0][0])return P[0][1];if(v>=P[n-1][0])return P[n-1][1];let i=0;while(v>P[i+1][0])i++;const h=dx[i],u=(v-P[i][0])/h,u2=u*u,u3=u2*u;
    return (2*u3-3*u2+1)*P[i][1]+(u3-2*u2+u)*h*t[i]+(-2*u3+3*u2)*P[i+1][1]+(u3-u2)*h*t[i+1]}}
function tropCurve(x,y,w,h,pts,o={}){const P=pts.slice().sort((a,b)=>a[0]-b[0]),lg=!!o.log,tv=v=>lg?Math.log10(Math.max(v,1e-9)):v;
  const x0=o.x0==null?P[0][0]:o.x0,x1=o.x1==null?P[P.length-1][0]:o.x1,ys=P.map(p=>p[1]);
  const y0=tv(o.y0==null?Math.min(...ys):o.y0),y1=tv(o.y1==null?Math.max(...ys):o.y1),g=monoFn(P.map(p=>[p[0],tv(p[1])]));
  const C=curve(x,y,w,h,g,{x0,x1,y0,y1,upto:o.upto,col:o.col||'var(--trop)',fill:o.fill,dot:o.dot,dash:o.dash,lw:o.lw});let s=C.svg;
  if(o.url!=null){const yy=C.Y(tv(o.url));s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--bad);stroke-width:1.3;stroke-dasharray:5 4"/><text x="${f1(x+w-4)}" y="${f1(yy-5)}" class="t-xs t-end" style="fill:var(--bad)">${o.urlLabel||'99th percentile'}</text>`}
  return {svg:s,X:C.X,Y:v=>C.Y(tv(v)),at:C.at,f:v=>lg?Math.pow(10,g(v)):g(v)}}
function clock(cx,cy,r,min,o={}){const full=o.full||60,u=clamp(min/full),col=o.col||'var(--brand)',A=v=>(v*360-90)*Math.PI/180,n=o.ticks||12;
  let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
  if(u>0){const a=A(u),large=u>.5?1:0;s+=u>=.999?`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r-3)}" style="fill:${col};opacity:.22"/>`:`<path d="M${f1(cx)} ${f1(cy)}L${f1(cx)} ${f1(cy-r+3)}A${f1(r-3)} ${f1(r-3)} 0 ${large} 1 ${f1(cx+(r-3)*Math.cos(a))} ${f1(cy+(r-3)*Math.sin(a))}Z" style="fill:${col};opacity:.22"/>`}
  for(let i=0;i<n;i++){const a=A(i/n);s+=`<line x1="${f1(cx+Math.cos(a)*r*.8)}" y1="${f1(cy+Math.sin(a)*r*.8)}" x2="${f1(cx+Math.cos(a)*r*.93)}" y2="${f1(cy+Math.sin(a)*r*.93)}" style="stroke:var(--muted);stroke-width:${i%3?1:1.8}"/>`}
  const mA=A((min%60)/60),hA=A((((o.h0||0)*60+min)/60%12)/12);
  s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(hA)*r*.5)}" y2="${f1(cy+Math.sin(hA)*r*.5)}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(mA)*r*.78)}" y2="${f1(cy+Math.sin(mA)*r*.78)}" style="stroke:${col};stroke-width:1.8;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" style="fill:var(--ink)"/>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+r+15)}" class="t-xs t-mid">${o.label}</text>`;
  return s}
function bodymap(x,y,s=1,o={}){const hl=o.hl||{},P=(a,b)=>[x+a*s,y+b*s],col=o.col||'var(--pain)',sw=v=>f1(v/s);
  const A={jaw:[0,31],neck:[0,45],lshoulder:[38,60],rshoulder:[-38,60],chest:[0,84],larm:[60,112],rarm:[-60,112],epi:[0,124],back:[0,86]};
  const SZ={jaw:[12,6],neck:[8,5],lshoulder:[10,8],rshoulder:[10,8],chest:[24,18],larm:[8,22],rarm:[8,22],epi:[14,10],back:[30,26]};
  const NM={jaw:'jaw',neck:'neck',lshoulder:'shoulder',rshoulder:'shoulder',chest:'chest',larm:'left arm',rarm:'right arm',epi:'upper belly',back:'back'};
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})" style="stroke-linejoin:round">`;
  const arm=m=>smoothPath([[44*m,56],[56*m,62],[66*m,104],[72*m,150],[68*m,170],[60*m,168],[56*m,124],[44*m,88]]);
  g+=`<path d="${arm(1)}" style="fill:var(--skin);stroke:var(--muted);stroke-width:${sw(1.2)}"/><path d="${arm(-1)}" style="fill:var(--skin);stroke:var(--muted);stroke-width:${sw(1.2)}"/>`;
  g+=`<path d="${smoothPath([[-44,56],[0,52],[44,56],[50,74],[42,112],[38,150],[42,184],[-42,184],[-38,150],[-42,112],[-50,74]])}" style="fill:var(--skin);stroke:var(--muted);stroke-width:${sw(1.2)}"/>`;
  g+=`<rect x="-8" y="34" width="16" height="20" rx="5" style="fill:var(--skin);stroke:var(--muted);stroke-width:${sw(1.2)}"/><circle cx="0" cy="20" r="17" style="fill:var(--skin);stroke:var(--muted);stroke-width:${sw(1.2)}"/>`;
  const bk=clamp(hl.back||0);if(bk>0||(o.labels===true))g+=`<ellipse cx="0" cy="86" rx="30" ry="26" style="fill:none;stroke:${col};stroke-width:${sw(1.6)};stroke-dasharray:4 3;opacity:${f1(Math.max(bk,.25))}"/>`;
  for(const k of Object.keys(A)){if(k==='back')continue;const v=clamp(hl[k]||0);if(v<=0)continue;const[cx,cy]=A[k],[rx,ry]=SZ[k];
    g+=`<ellipse cx="${cx}" cy="${cy}" rx="${f1(rx*(1+v*.35))}" ry="${f1(ry*(1+v*.35))}" style="fill:${col};opacity:${f1(.12+v*.2)}"/><ellipse cx="${cx}" cy="${cy}" rx="${f1(rx*.55)}" ry="${f1(ry*.55)}" style="fill:${col};opacity:${f1(.3+v*.55)}"/>`}
  g+='</g>';const at={};for(const k of Object.keys(A))at[k]=P(A[k][0],A[k][1]);
  if(o.labels){const L=o.labels===true?Object.keys(A):o.labels;L.forEach(k=>{const p=at[k],right=A[k][0]>0||k==='jaw'||k==='neck';
    g+=`<text x="${f1(p[0]+(right?1:-1)*(SZ[k][0]*s+6))}" y="${f1(p[1]+3)}" class="t-xs ${right?'':'t-end'}" style="fill:var(--ink)">${NM[k]}</text>`})}
  return {svg:g,at}}
function stent(x,y,w,h,o={}){const e=clamp(o.exp==null?1:o.exp),hh=h*(.3+.7*e),y0=y+(h-hh)/2,k=8,cw=w/k;let s='';
  const bl=clamp(o.balloon||0);if(o.wire!==false)s+=`<line x1="${f1(x-14)}" x2="${f1(x+w+14)}" y1="${f1(y+h/2)}" y2="${f1(y+h/2)}" style="stroke:var(--muted);stroke-width:1.2"/>`;
  if(bl>0)s+=`<ellipse cx="${f1(x+w/2)}" cy="${f1(y+h/2)}" rx="${f1(w*.56)}" ry="${f1(hh/2*bl)}" style="fill:var(--balloon);opacity:.45"/>`;
  let d='';for(let i=0;i<k;i++){const a=x+i*cw,m=a+cw/2,b=a+cw;d+=`M${f1(a)} ${f1(y0)}L${f1(m)} ${f1(y0+hh/2)}L${f1(b)} ${f1(y0)}M${f1(a)} ${f1(y0+hh)}L${f1(m)} ${f1(y0+hh/2)}L${f1(b)} ${f1(y0+hh)}`}
  s+=`<path d="${d}" style="fill:none;stroke:var(--stent);stroke-width:1.6;stroke-linejoin:round"/><path d="M${f1(x)} ${f1(y0)}H${f1(x+w)}M${f1(x)} ${f1(y0+hh)}H${f1(x+w)}" style="stroke:var(--stent);stroke-width:1;opacity:.55"/>`;
  return s}
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
function gauge(cx,cy,r,v,max,o={}){const A=u=>Math.PI*(1-clamp(u)),P=(u,rr)=>[cx+rr*Math.cos(A(u)),cy-rr*Math.sin(A(u))],arc=(u0,u1,rr)=>{const p0=P(u0,rr),p1=P(u1,rr);return `M${f1(p0[0])} ${f1(p0[1])}A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}`};
  const rw=r*.2;let s=`<path d="${arc(0,1,r-rw/2)}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(rw)}"/>`;let u0=0;
  (o.bands||[]).forEach(b=>{const u1=clamp(b.to/max);s+=`<path d="${arc(u0,u1,r-rw/2)}" style="fill:none;stroke:${b.col};stroke-width:${f1(rw)};opacity:.75"/>`;u0=u1});
  const u=clamp(v/max),p=P(u,r-rw-4);s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="4" style="fill:var(--ink)"/>`;
  s+=`<text x="${f1(cx-r)}" y="${f1(cy+14)}" class="t-xs t-mid">0</text><text x="${f1(cx+r)}" y="${f1(cy+14)}" class="t-xs t-mid">${max}</text>`;
  if(o.big)s+=`<text x="${f1(cx)}" y="${f1(cy-r*.32)}" class="t-big t-mid" style="font-size:${f1(r*.38)}px">${Math.round(v)}</text>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+16)}" class="t-sm t-mid">${o.label}</text>`;
  return s}
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
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What a heart attack is',g:1,n:'1.1',d:'How common heart attacks are, STEMI and NSTEMI, and the five types'},
 {id:'plaque',t:'Plaque, rupture & clot',g:1,n:'1.2',d:'From fatty streak to ruptured plaque and the clot that blocks an artery'},
 {id:'ischaemia',t:'Ischaemia: time is muscle',g:1,n:'1.3',d:'How heart muscle dies hour by hour, and what reopening the artery saves'},
 {id:'risk',t:'Risk factors & prevention',g:1,n:'1.4',d:'INTERHEART, LDL, smoking, blood pressure, diabetes and family history'},
 {id:'symptoms',t:'Symptoms & who presents differently',g:2,n:'2.1',d:'Chest pain and other symptoms in women, men, older people and diabetes'},
 {id:'ecg',t:'The ECG: STEMI, NSTEMI & territories',g:2,n:'2.2',d:'ST elevation, Q waves and which artery each lead watches'},
 {id:'troponin',t:'Troponin & rapid rule-out',g:2,n:'2.3',d:'How troponin rises and falls, and the 0/1-hour algorithm'},
 {id:'scores',t:'Risk scores: HEART, TIMI & GRACE',g:2,n:'2.4',d:'What each score adds up and what it predicts: teaching calculators'},
 {id:'differential',t:'Chest pain: heart attack or something else?',g:2,n:'2.5',d:'Aortic dissection, pulmonary embolism, pericarditis, Takotsubo and SCAD'},
 {id:'call',t:'The first minutes: calling for help, CPR & defibrillators',g:3,n:'3.1',d:'Why to call at once, the chain of survival, CPR and AEDs'},
 {id:'reperfusion',t:'Reperfusion: PCI & clot-busting drugs',g:3,n:'3.2',d:'Primary PCI and fibrinolysis, and the clock targets'},
 {id:'antithrombotic',t:'Antiplatelets & anticoagulants',g:3,n:'3.3',d:'Aspirin, P2Y12 inhibitors, heparin, and the bleeding balance'},
 {id:'complications',t:'Complications & cardiogenic shock',g:3,n:'3.4',d:'Arrhythmias, heart failure, ruptures and shock, and the trials'},
 {id:'secondary',t:'Medicines after a heart attack',g:4,n:'4.1',d:'Antiplatelets, statins, beta-blockers, ACE inhibitors and more'},
 {id:'lipids',t:'Lowering LDL cholesterol',g:4,n:'4.2',d:'Statins, ezetimibe, PCSK9 inhibitors and LDL targets'},
 {id:'cabg',t:'Stents or bypass? Revascularisation choices',g:4,n:'4.3',d:'PCI or CABG for multivessel and left main disease'},
 {id:'rehab',t:'Cardiac rehabilitation',g:5,n:'5.1',d:'Exercise, education and support, and who misses out'},
 {id:'living',t:'Living after a heart attack',g:5,n:'5.2',d:'Going home, driving, work, sex, travel and emotions'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'From the ECG in 10 minutes to discharge teaching'},
 {id:'frontier',t:'Research toward better treatment',g:5,n:'5.4',d:'Inflammation, Lp(a), cardioprotection and more, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Heberden and Herrick to stents and troponin'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1, 3 and 6 use the red brand; 2 ink navy (--dx), 4 teal (--rx), 5 green (--rec) */
const GROUPS={1:['Understanding heart attack','g-und','c-und'],2:['Diagnosis','g-dx','c-dx'],3:['Emergency treatment','g-er','c-er'],4:['Medicines & revascularisation','g-rx','c-rx'],5:['Recovery & living','g-rec','c-rec'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('mi:tab');sessionStorage.setItem('mi:tab','1')}catch(e){}
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
