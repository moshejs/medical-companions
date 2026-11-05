(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('cir:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('cir:'+k,JSON.stringify(v))}catch(e){}}};
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
   numbers (no pressure thresholds, no score bands, no elastography cut-offs, no survival figures):
   callers pass them in from the research, with the citation in the surrounding text. Orientation is the
   anatomical convention for a person facing the reader: the liver's large right lobe is on the viewer's
   LEFT, the spleen on the viewer's RIGHT.
   liver(x,y,s,o)             a liver centred on (x,y): large right lobe on the viewer's left, falciform line,
                              gallbladder peeking below. s = scale (1 = about 175 wide, 105 tall). o: {fib (0..4,
                              continuous, a METAVIR-like scale: 0 smooth healthy red-brown tissue; 1-2 thin pale
                              collagen strands from the portal areas; 3 bridging septa; 4 cirrhosis: regenerative
                              nodules ringed by scar, a paler, shrunken, scalloped outline), regress (0..1: the
                              cause removed: strands thin and fade and the outline smooths, but nodules stay
                              faintly: regression is partial), gb (false hides the gallbladder), label, seed}.
                              Returns {svg, at:[x,y], pts (outline points)}.
   lobule(x,y,r,o)            a classic hexagonal liver lobule of radius r: a central vein in the middle, portal
                              triads at the six corners (portal vein blue, hepatic artery red, bile duct gold),
                              radial cords of hepatocytes with sinusoids between them. o: {flow (0..1 phase: blood
                              dots move from the triads toward the central vein; animate it), fib (0..1: scar along
                              the edges from triad to triad, then above .6 bridging septa from triads to the central
                              vein), act (0..1: stellate cells in the space of Disse drawn and activated, see
                              stellate()), labels (true: 'portal triad', 'central vein', 'sinusoid'), clip (true:
                              a round inset of radius 1.16 r around the lobule), id (unique clip id)}. Returns {svg, at:{cv:[x,y],
                              triads:[[x,y],...6]}}.
   hepatocyte(x,y,s,o)        one liver cell (rounded polygon, nucleus), s = width. o: {fat (0..1 lipid droplet
                              size: steatosis), iron (0..1 brown iron granules: haemochromatosis), glob (0..1
                              pink globules of misfolded protein: alpha-1 antitrypsin), copper (0..1 dark copper
                              dots: Wilson disease), hurt (0..1 a stressed, swollen cell with a red edge), label}.
   stellate(x,y,s,o)          a hepatic stellate cell, s = scale (1 = about 40 wide). o: {act (0..1): 0 quiescent,
                              a small star-shaped cell with gold vitamin A droplets; 1 activated myofibroblast,
                              a stretched spindle that has lost its droplets and lays down wavy collagen strands;
                              ang (degrees)}.
   collagen(x1,y1,x2,y2,o)    a bundle of three wavy collagen strands between two points. o: {w (stroke width,
                              1.4), op (0..1), amp (wave height, 3), n (strands, 3)}.
   nodule(x,y,r,o)            a regenerative nodule: a ball of liver tissue ringed by scar. o: {scar (0..1 ring
                              thickness), cells (true: hepatocyte dots inside)}.
   portalMap(x,y,s,o)         the portal circulation, centred on (x,y), s = scale (1 = about 240 wide, 210 tall):
                              liver (top left), oesophagus and stomach (top middle), spleen (right), the gut below,
                              the splenic and superior mesenteric veins joining into the portal vein, the left
                              gastric vein, and a navel with paraumbilical collaterals. o: {pressure (0..1: portal
                              vein drawn thicker and redder-edged; back-pressure), flow (0..1 phase: dots move toward
                              the liver; above pressure .6 some turn back toward the collaterals), spleen (0..1
                              enlargement), varix (0..1 oesophageal varices bulging), collat (0..1 paraumbilical
                              collaterals, caput medusae), bleed (0..1 drops from a varix), tips (0..1 a shunt stent
                              through the liver from portal to hepatic vein), labels (true)}. Returns {svg,
                              at:{liver,spleen,varix,pv,navel}}.
   abdomen(x,y,s,o)           a front-view trunk (shoulders to hips), (x,y) the top centre, s = scale (1 = about
                              130 wide, 210 tall). o: {fluid (0..1 ascites: the belly fills from the bottom and the
                              flanks bulge), tap (0..1: a paracentesis needle and drain line in the lower left of
                              the belly as the reader sees it), jaundice (0..1 a gold tint), liver (true: a small
                              liver outline under the right ribs), label}. Returns {svg, at:{navel, liver}}.
   gauge(cx,cy,r,v,max,o)     a half-dial gauge (0 at the left, max at the right) with a needle at v, e.g. portal
                              pressure or a score. o: {bands ([{to, col, label}] from the caller's cited source;
                              none by default), label (under the hub), big (true: v as a large number), ends
                              (false: hide the 0 and max numbers), lo/hi (words at the two ends, e.g. 'low'/'high'),
                              unit (small text after the big number)}.
   nh3(x,y,o)                 an ammonia molecule: N with three H; o: {r (radius of N, 7), op, ion (true: ammonium
                              NH4+, four H and a plus sign)}.
   brain(x,y,s,o)             a side-view brain, front to the LEFT, centred on (x,y); s = scale (1 = about 150 wide,
                              115 tall with the brainstem). o: {fog (0..1: a violet haze and swelling astrocytes,
                              for hepatic encephalopathy), label}. Returns {svg, at:[x,y]}.
   kidney(x,y,s,o)            a kidney (bean) with its ureter, s = scale (1 = about 46 tall). o: {injury (0..1: paler,
                              with a falling-flow arrow, for acute kidney injury and hepatorenal syndrome), label}.
   person(x,y,s,fill,o)       a person pictogram for icon arrays (s = height, (x,y) the top), fill a CSS colour; o.op.
   pill(x,y,s,o)              a tablet centred at (x,y), s = length; o: {ang (degrees), col (var(--rx)), txt (a short
                              label printed on it), round (true: a round tablet)}.
   curve(x,y,w,h,f,o)         a plotted course f(x) in the box, with axes. o: {x0,x1 (domain, default 0..1), y0,y1
                              (range, default 0..1), upto (draw to this x), col (var(--brand)), fill (true: soft area),
                              bands ([{from,to,col,label}] horizontal bands in y units, from the caller's cited
                              source), dot, lw (2.6), dash}. Returns {svg, X, Y, at}.
   ladder(x,y,w,h,steps,o)    rising stairs, one step per label (a treatment ladder, the transplant path). o: {at
                              (index highlighted), col (var(--rx)), done}. Returns {svg, top(i)->[x,y]}.
   tline(x,y,w,o)             a horizontal time axis: o {min, max, step, fmt(v)->label, label, big}. Returns {svg, X}.
   ped(x,y,sex,aff,o)         a pedigree symbol: sex 'm' square, 'f' circle; aff 0 unaffected, 1 affected (petrol
                              fill), .5 carrier (half gold, e.g. one HFE or ATP7B variant); o: {dead, proband, r}.
                              Needs marker('pedArrow') in <defs> for a proband.
   marker(id,color)           an arrowhead <marker> for <defs>.
   smoothPath(P,closed), inPoly(p,P)  helpers: a smooth closed path through points; point-in-polygon. */
function smoothPath(P,closed=true){const n=P.length;let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;
  for(let i=0;i<(closed?n:n-1);i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=`C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`}
  return d+(closed?'Z':'')}
function inPoly(p,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
let _uid=0;const uid=p=>p+(++_uid);
/* liver outline, about 175 x 105 at s=1, centred near (0,0) */
const LIVER=[[-84,-6],[-80,-30],[-60,-46],[-24,-52],[14,-50],[48,-44],[76,-34],[92,-22],[90,-10],[70,0],[42,12],[12,28],[-18,44],[-46,50],[-68,40],[-82,18]];
function liver(x,y,s=1,o={}){const fib=clamp(o.fib||0,0,4),reg=clamp(o.regress||0),rr=rng(o.seed||7);
  const nod=ramp(fib,3,4),bump=nod*(1-.55*reg),k=1-nod*.09*(1-.35*reg);
  /* subdivide, then scallop the edge as nodules form */
  const base=[];LIVER.forEach((p,i)=>{const q=LIVER[(i+1)%LIVER.length];base.push(p,[(p[0]+q[0])/2,(p[1]+q[1])/2])});
  const pts=base.map(([a,b],i)=>{const w=k*(1+bump*.05*(i%2?1:-1));return [x+a*s*w,y+b*s*w]});
  const id=uid('lv'),d=smoothPath(pts);let g='';
  if(o.gb!==false)g+=`<ellipse cx="${f1(x-34*s*k)}" cy="${f1(y+50*s*k)}" rx="${f1(9*s)}" ry="${f1(6*s)}" transform="rotate(-24 ${f1(x-34*s*k)} ${f1(y+50*s*k)})" style="fill:var(--bile);stroke:var(--accent);stroke-width:1"/>`;
  g+=`<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" style="fill:var(--liver-fill)"/>`;
  g+=`<g clip-path="url(#${id})">`;
  const pale=ramp(fib,.8,4)*(1-.45*reg);if(pale>0)g+=`<path d="${d}" style="fill:var(--scar);opacity:${f1(pale*.62)}"/>`;
  const P=[];let tries=0;while(P.length<70&&tries<900){tries++;const p=[x+(rr()*180-90)*s*k,y+(rr()*104-54)*s*k];if(inPoly(p,pts))P.push(p)}
  const strand=ramp(fib,.4,3)*(1-.6*reg),sw=(1.3+ramp(fib,1.5,3.6)*1.6)*s*(1-.45*reg);
  const ns=Math.round(strand*34);
  /* strands join near neighbours, so at high stages they mesh around the nodules */
  const near=i=>{const p=P[i];return P.map((q,j)=>[j,Math.hypot(q[0]-p[0],q[1]-p[1])]).filter(a=>a[0]!==i).sort((a,b)=>a[1]-b[1])[3+i%4][0]};
  for(let i=0;i<ns;i++){const p=P[i%P.length],q=P[near(i%P.length)],m=fib>2.6?1:.75;
    g+=`<path d="M${f1(p[0])} ${f1(p[1])}Q${f1((p[0]+q[0])/2+(rr()-.5)*6*s)} ${f1((p[1]+q[1])/2+(rr()-.5)*6*s)} ${f1(lerp(p[0],q[0],m))} ${f1(lerp(p[1],q[1],m))}" style="fill:none;stroke:var(--scar-line);stroke-width:${f1(sw)};opacity:${f1(.45+strand*.5)};stroke-linecap:round"/>`}
  if(nod>0){const nn=Math.round(nod*24),rs=(1-.5*reg);
    P.slice(30,30+nn).forEach((p,i)=>{const r=(6+(i%3)*1.6)*s;g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r)}" style="fill:var(--nodule);opacity:${f1(.55*nod)}"/><circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r)}" style="fill:none;stroke:var(--scar);stroke-width:${f1(2.2*s*rs)};opacity:${f1(.4+.5*nod*rs)}"/>`})}
  g+='</g>';
  g+=`<path d="${d}" style="fill:none;stroke:var(--liver);stroke-width:2;stroke-linejoin:round"/>`;
  g+=`<path d="M${f1(x+20*s*k)} ${f1(y-50*s*k)}Q${f1(x+12*s*k)} ${f1(y-16*s*k)} ${f1(x+4*s*k)} ${f1(y+22*s*k)}" style="fill:none;stroke:var(--liver);stroke-width:1.2;opacity:.55"/>`;
  if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+70*s)}" class="t-xs t-mid">${o.label}</text>`;
  return {svg:g,at:[x,y],pts}}
function lobule(x,y,r,o={}){const fl=o.flow||0,fib=clamp(o.fib||0),act=clamp(o.act||0);
  const V=[...Array(6)].map((_,i)=>{const a=Math.PI/3*i+Math.PI/6;return [x+r*Math.cos(a),y+r*Math.sin(a)]});
  const hex='M'+V.map(p=>f1(p[0])+' '+f1(p[1])).join('L')+'Z';const id=o.id||uid('lb');let g='';
  const cr=r*1.16;if(o.clip)g+=`<clipPath id="${id}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(cr)}"/></clipPath><g clip-path="url(#${id})"><rect x="${f1(x-cr)}" y="${f1(y-cr)}" width="${f1(2*cr)}" height="${f1(2*cr)}" style="fill:var(--liver-fill);opacity:.35"/>`;
  g+=`<path d="${hex}" style="fill:var(--liver-soft);stroke:var(--liver);stroke-width:1;opacity:.95"/>`;
  /* hepatocyte cords: radial bands, sinusoids are the gaps between them */
  for(let i=0;i<18;i++){const a=i/18*2*Math.PI,c=Math.cos(a),sn=Math.sin(a),rm=r*.84/Math.max(.87,Math.abs(Math.cos(((a-Math.PI/6)%(Math.PI/3)+Math.PI/3)%(Math.PI/3)-Math.PI/6)));
    g+=`<line x1="${f1(x+c*r*.2)}" y1="${f1(y+sn*r*.2)}" x2="${f1(x+c*rm)}" y2="${f1(y+sn*rm)}" style="stroke:var(--liver-fill);stroke-width:${f1(r*.085)};stroke-linecap:round;opacity:.6"/>`}
  /* blood flowing in the sinusoids, triads -> central vein */
  for(let i=0;i<18;i++){const a=(i+.5)/18*2*Math.PI,u=1-((fl+i*.137)%1),rad=r*(.2+.66*u);
    g+=`<circle cx="${f1(x+Math.cos(a)*rad)}" cy="${f1(y+Math.sin(a)*rad)}" r="${f1(r*.03+.6)}" style="fill:${i%4?'var(--portal)':'var(--artery)'};opacity:${f1(.35+.5*u)}"/>`}
  /* scar */
  if(fib>0){V.forEach((p,i)=>{const q=V[(i+1)%6];g+=`<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(lerp(p[0],q[0],ramp(fib,0,.5)))}" y2="${f1(lerp(p[1],q[1],ramp(fib,0,.5)))}" style="stroke:var(--scar-line);stroke-width:${f1(r*.03+r*.08*fib)};stroke-linecap:round;opacity:${f1(.4+.5*fib)}"/>`});
    const br=ramp(fib,.6,1);if(br>0)[0,2,4].forEach(i=>{const p=V[i];g+=collagen(p[0],p[1],lerp(p[0],x,br*.86),lerp(p[1],y,br*.86),{w:r*.03+1,op:.5+.4*br,amp:r*.03})})}
  if(act>0||o.act===0){[[.5,.62],[.5,2.72],[.55,4.8]].forEach(([rf,a],i)=>{g+=stellate(x+Math.cos(a)*r*rf,y+Math.sin(a)*r*rf,r/62,{act,ang:a*180/Math.PI+90})})}
  /* central vein and triads */
  g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.13)}" style="fill:var(--panel);stroke:var(--portal);stroke-width:1.8"/>`;
  V.forEach(p=>{const t=r*.1;g+=`<circle cx="${f1(p[0]-t*.4)}" cy="${f1(p[1])}" r="${f1(t)}" style="fill:var(--portal)"/><circle cx="${f1(p[0]+t*.75)}" cy="${f1(p[1]-t*.55)}" r="${f1(t*.5)}" style="fill:var(--artery)"/><circle cx="${f1(p[0]+t*.7)}" cy="${f1(p[1]+t*.7)}" r="${f1(t*.45)}" style="fill:var(--bile);stroke:var(--accent);stroke-width:.6"/>`});
  if(o.clip)g+=`</g><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(cr)}" style="fill:none;stroke:var(--muted);stroke-width:1.5"/>`;
  if(o.labels){const t=V[5];g+=`<text x="${f1(x)}" y="${f1(y+r*.13+12)}" class="t-xs t-mid">central vein</text><text x="${f1(t[0]+8)}" y="${f1(t[1]-8)}" class="t-xs">portal triad</text>`}
  return {svg:g,at:{cv:[x,y],triads:V}}}
function hepatocyte(x,y,s=40,o={}){const h=s/2,rr=rng(o.seed||3),hurt=clamp(o.hurt||0);
  const P=[...Array(6)].map((_,i)=>{const a=Math.PI/3*i;return [x+h*Math.cos(a)*(1+hurt*.1),y+h*.86*Math.sin(a)*(1+hurt*.1)]});
  let g=`<path d="${smoothPath(P)}" style="fill:var(--cell);stroke:${hurt>.3?'var(--bad)':'var(--liver)'};stroke-width:1.6"/>`;
  const fat=clamp(o.fat||0);if(fat>0)g+=`<circle cx="${f1(x+h*.18)}" cy="${f1(y-h*.05)}" r="${f1(h*.62*fat+1)}" style="fill:var(--accent-soft);stroke:var(--bile);stroke-width:1"/>`;
  const nx=fat>.5?x-h*.52:x-h*.1,ny=fat>.5?y+h*.3:y;
  g+=`<circle cx="${f1(nx)}" cy="${f1(ny)}" r="${f1(h*.24*(1-fat*.3))}" style="fill:var(--liver-fill);opacity:.85"/>`;
  [['iron','var(--liver)',.07],['copper','var(--ink)',.05],['glob','var(--nh3-fill)',.1]].forEach(([k,c,rf])=>{const v=clamp(o[k]||0);for(let i=0;i<Math.round(v*9);i++){const a=rr()*6.28,d=h*(.3+rr()*.4);g+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d*.8)}" r="${f1(h*rf+.5)}" style="fill:${c};opacity:.8"/>`}});
  if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+h+14)}" class="t-xs t-mid">${o.label}</text>`;
  return g}
function stellate(x,y,s=1,o={}){const a=clamp(o.act||0),L=14*s;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})">`;
  /* processes: short and branched when quiescent, two long poles when activated */
  for(let i=0;i<5;i++){const an=i/5*2*Math.PI+.3,len=L*(1-a*.5);g+=`<path d="M0 0Q${f1(Math.cos(an+.3)*len*.6)} ${f1(Math.sin(an+.3)*len*.6)} ${f1(Math.cos(an)*len)} ${f1(Math.sin(an)*len)}" style="fill:none;stroke:var(--stellate);stroke-width:${f1(1.4*s)};opacity:${f1(1-a*.8)};stroke-linecap:round"/>`}
  g+=`<ellipse rx="${f1((5+a*9)*s)}" ry="${f1((5-a*2)*s)}" style="fill:var(--stellate)"/>`;
  if(a>0)g+=`<ellipse rx="${f1((5+a*9)*s)}" ry="${f1((5-a*2)*s)}" style="fill:var(--liver);opacity:${f1(a*.75)}"/>`;
  if(a<1)[[-2.2,-1.6],[2,-1.2],[.2,2]].forEach(([dx,dy])=>{g+=`<circle cx="${f1(dx*s)}" cy="${f1(dy*s)}" r="${f1(1.5*s)}" style="fill:var(--vita);opacity:${f1(1-a)}"/>`});
  if(a>.2)g+=collagen(-(5+a*9)*s,3*s,(5+a*9)*s+L*a,6*s,{w:1.1*s,op:a,amp:2*s})+collagen(-(5+a*9)*s-L*a*.6,-4*s,(5+a*9)*s,-6*s,{w:1.1*s,op:a*.8,amp:2*s});
  return g+'</g>'}
function collagen(x1,y1,x2,y2,o={}){const n=o.n||3,amp=o.amp==null?3:o.amp,dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,w=Math.max(1,Math.round(L/10));let g='';
  for(let k=0;k<n;k++){let d='';for(let i=0;i<=w*4;i++){const u=i/(w*4),off=Math.sin(u*w*2*Math.PI+k*2.1)*amp+(k-(n-1)/2)*amp*.5;d+=(i?'L':'M')+f1(x1+dx*u+nx*off)+' '+f1(y1+dy*u+ny*off)}
    g+=`<path d="${d}" style="fill:none;stroke:var(--scar-line);stroke-width:${f1(o.w||1.4)};opacity:${f1(o.op==null?.85:o.op)};stroke-linecap:round"/>`}
  return g}
function nodule(x,y,r,o={}){const sc=clamp(o.scar==null?.6:o.scar),rr=rng(o.seed||9);
  let g=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--nodule)"/>`;
  if(o.cells!==false)for(let i=0;i<7;i++){const a=rr()*6.28,d=r*.55*rr();g+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" r="${f1(r*.09+.5)}" style="fill:var(--liver);opacity:.6"/>`}
  g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r+r*.15*sc)}" style="fill:none;stroke:var(--scar);stroke-width:${f1(r*.3*sc+1)}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r+r*.3*sc+.5)}" style="fill:none;stroke:var(--scar-line);stroke-width:1;opacity:.7"/>`;
  return g}
function portalMap(x,y,s=1,o={}){const pr=clamp(o.pressure||0),fl=o.flow||0,sp=clamp(o.spleen||0),vx=clamp(o.varix||0),co=clamp(o.collat||0),bl=clamp(o.bleed||0),tp=clamp(o.tips||0);
  const P=(a,b)=>[x+a*s,y+b*s],Q=(a,b)=>f1(x+a*s)+' '+f1(y+b*s);let g=`<defs>${marker('pmA','var(--portal)')}</defs>`;
  const at={liver:P(-62,-58),spleen:P(86,-20),varix:P(6,-82),pv:P(-24,-10),navel:P(-4,72)};
  /* oesophagus and stomach */
  g+=`<path d="M${Q(2,-104)}V${Q(2,-52)}M${Q(14,-104)}V${Q(14,-56)}" style="fill:none;stroke:var(--brain-line);stroke-width:${f1(1.6)}"/>`;
  g+=`<path d="M${Q(2,-52)}Q${Q(-4,-28)} ${Q(18,-18)}Q${Q(52,-10)} ${Q(56,-34)}Q${Q(56,-58)} ${Q(14,-56)}" style="fill:var(--panel-2);stroke:var(--brain-line);stroke-width:1.6"/>`;
  /* liver */
  g+=liver(at.liver[0],at.liver[1],.5*s,{fib:o.fib==null?pr*4:o.fib,gb:false,seed:4}).svg;
  /* spleen */
  const sr=1+sp*.55;g+=`<ellipse cx="${f1(at.spleen[0])}" cy="${f1(at.spleen[1])}" rx="${f1(16*s*sr)}" ry="${f1(26*s*sr)}" transform="rotate(20 ${f1(at.spleen[0])} ${f1(at.spleen[1])})" style="fill:var(--nh3-soft);stroke:var(--nh3);stroke-width:1.5"/>`;
  /* gut loops */
  g+=`<path d="M${Q(-40,40)}q14 -14 28 0t28 0t28 0M${Q(-40,58)}q14 -14 28 0t28 0t28 0" style="fill:none;stroke:var(--brain-line);stroke-width:5;opacity:.45;stroke-linecap:round"/>`;
  /* veins: splenic (spleen -> confluence), SMV (gut -> confluence), portal vein (confluence -> liver), left gastric (confluence -> oesophagus) */
  const vw=(3+pr*3)*s,cf=P(-14,6);
  const SPL=`M${Q(70,-12)}Q${Q(30,14)} ${Q(-14,6)}`,SMV=`M${Q(-2,34)}Q${Q(-8,18)} ${Q(-14,6)}`,PV=`M${Q(-14,6)}Q${Q(-30,-12)} ${Q(-48,-40)}`,LG=`M${Q(-6,2)}Q${Q(4,-34)} ${Q(8,-62)}`;
  [SPL,SMV,PV].forEach(d=>{g+=`<path d="${d}" style="fill:none;stroke:var(--portal);stroke-width:${f1(vw)};stroke-linecap:round"/>`});
  if(pr>.05)g+=`<path d="${PV}" style="fill:none;stroke:var(--bad);stroke-width:${f1(vw*.35)};stroke-linecap:round;opacity:${f1(pr*.7)}"/>`;
  g+=`<path d="${LG}" style="fill:none;stroke:var(--portal);stroke-width:${f1((1+vx*3)*s)};stroke-linecap:round;opacity:${f1(.35+vx*.65)}"/>`;
  /* varices along the lower oesophagus */
  if(vx>0)for(let i=0;i<4;i++){const vy=-60-i*10,vr=(1.5+vx*3.8)*s*(1-i*.12);g+=`<circle cx="${f1(x+(i%2?14:2)*s)}" cy="${f1(y+vy*s)}" r="${f1(vr)}" style="fill:var(--portal);opacity:${f1(.4+.6*vx)}"/>`}
  if(bl>0)for(let i=0;i<3;i++){const dy=(-60+i*9)*s+bl*14*s;g+=`<path d="M${f1(x+8*s)} ${f1(y+dy)}q3 4.5 0 6.5q-3 -2 0 -6.5Z" style="fill:var(--artery);opacity:${f1(bl*(1-i*.25))}"/>`}
  /* paraumbilical collaterals around the navel */
  g+=`<circle cx="${f1(at.navel[0])}" cy="${f1(at.navel[1])}" r="${f1(2.6*s)}" style="fill:var(--brain-line)"/>`;
  if(co>0)for(let i=0;i<7;i++){const a=i/7*2*Math.PI,r0=5*s,r1=r0+co*16*s;g+=`<path d="M${f1(at.navel[0]+Math.cos(a)*r0)} ${f1(at.navel[1]+Math.sin(a)*r0)}Q${f1(at.navel[0]+Math.cos(a+.4)*r1*.7)} ${f1(at.navel[1]+Math.sin(a+.4)*r1*.7)} ${f1(at.navel[0]+Math.cos(a)*r1)} ${f1(at.navel[1]+Math.sin(a)*r1)}" style="fill:none;stroke:var(--portal);stroke-width:${f1(1.4*s)};opacity:${f1(co)}"/>`}
  /* flow dots */
  const along=(t,a,b,c)=>[(1-t)*(1-t)*a[0]+2*(1-t)*t*b[0]+t*t*c[0],(1-t)*(1-t)*a[1]+2*(1-t)*t*b[1]+t*t*c[1]];
  for(let i=0;i<6;i++){const u=(fl+i/6)%1,back=pr>.6&&i%2;const p=back?along(u,P(-6,2),P(4,-34),P(8,-62)):along(u,P(-14,6),P(-30,-12),P(-48,-40));
    g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(1.8*s)}" style="fill:${back?'var(--bad)':'var(--panel)'};opacity:.9"/>`}
  /* TIPS stent */
  if(tp>0)g+=`<path d="M${Q(-40,-30)}L${Q(-40-34*tp,-30-36*tp)}" style="stroke:var(--bile);stroke-width:${f1(4*s)};stroke-dasharray:${f1(3*s)} ${f1(2*s)};stroke-linecap:round"/>`;
  if(o.labels){const L=(p,t,dx=0,dy=0,c='')=>`<text x="${f1(p[0]+dx*s)}" y="${f1(p[1]+dy*s)}" class="t-xs${c}">${t}</text>`;
    g+=L(at.liver,'liver',0,-36,' t-mid')+L(at.spleen,'spleen',0,(-36-sp*14),' t-mid')+L(P(16,-98),'oesophagus',4,0)+L(P(-40,-16),'portal vein',-4,4,' t-end')+L(at.navel,'navel',8,4)}
  return {svg:g,at}}
function abdomen(x,y,s=1,o={}){const fl=clamp(o.fluid||0),bul=fl*16,P=(a,b)=>f1(x+a*s)+' '+f1(y+b*s);
  const d=`M${P(-30,0)}Q${P(-62,4)} ${P(-64,26)}L${P(-58,92)}Q${P(-60-bul,140)} ${P(-54-bul*.6,182)}L${P(-50,210)}H${f1(x+50*s)}L${P(54+bul*.6,182)}Q${P(60+bul,140)} ${P(58,92)}L${P(64,26)}Q${P(62,4)} ${P(30,0)}Z`;
  const id=uid('ab');let g=`<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:1.6"/>`;
  if(o.jaundice>0)g+=`<path d="${d}" style="fill:var(--bile);opacity:${f1(clamp(o.jaundice)*.3)}"/>`;
  g+=`<path d="M${P(-40,84)}Q${P(0,98)} ${P(40,84)}" style="fill:none;stroke:var(--brain-line);stroke-width:1;opacity:.6"/>`;
  if(o.liver)g+=liver(x-14*s,y+70*s,.36*s,{fib:o.fib||0,gb:false}).svg;
  if(fl>0){const top=y+(205-fl*100)*s;let w=`M${f1(x-90*s)} ${f1(top)}`;for(let i=0;i<=12;i++)w+=`Q${f1(x+(-90+i*15-7.5)*s)} ${f1(top+(i%2?-3:3)*s)} ${f1(x+(-90+i*15)*s)} ${f1(top)}`;
    g+=`<g clip-path="url(#${id})"><path d="${w}V${f1(y+215*s)}H${f1(x-90*s)}Z" style="fill:var(--fluid-fill);opacity:.55"/></g>`}
  const nv=[x,y+128*s];g+=`<circle cx="${f1(nv[0])}" cy="${f1(nv[1])}" r="${f1(2.4*s)}" style="fill:var(--brain-line)"/>`;
  if(o.tap>0){const t=clamp(o.tap),nx=x-34*s,ny=y+166*s;g+=`<line x1="${f1(nx-26*s)}" y1="${f1(ny+18*s)}" x2="${f1(nx-26*s+20*s*t)}" y2="${f1(ny+18*s-14*s*t)}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/><path d="M${f1(nx-26*s)} ${f1(ny+18*s)}Q${f1(nx-50*s)} ${f1(ny+30*s)} ${f1(nx-48*s)} ${f1(ny+48*s)}" style="fill:none;stroke:var(--fluid);stroke-width:2;opacity:${f1(t)}"/>`}
  if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+228*s)}" class="t-xs t-mid">${o.label}</text>`;
  return {svg:g,at:{navel:nv,liver:[x-14*s,y+70*s]}}}
function gauge(cx,cy,r,v,max,o={}){const A=u=>Math.PI*(1-clamp(u)),P=(u,rr)=>[cx+rr*Math.cos(A(u)),cy-rr*Math.sin(A(u))],arc=(u0,u1,rr)=>{const p0=P(u0,rr),p1=P(u1,rr);return `M${f1(p0[0])} ${f1(p0[1])}A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}`};
  const rw=r*.2;let s=`<path d="${arc(0,1,r-rw/2)}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(rw)}"/>`;let u0=0;
  (o.bands||[]).forEach(b=>{const u1=clamp(b.to/max);s+=`<path d="${arc(u0,u1,r-rw/2)}" style="fill:none;stroke:${b.col};stroke-width:${f1(rw)};opacity:.75"/>`;u0=u1});
  const u=clamp(v/max),p=P(u,r-rw-4);s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="4" style="fill:var(--ink)"/>`;
  if(o.ends!==false)s+=`<text x="${f1(cx-r+rw/2)}" y="${f1(cy+14)}" class="t-xs t-mid">${o.lo||0}</text><text x="${f1(cx+r-rw/2)}" y="${f1(cy+14)}" class="t-xs t-mid">${o.hi||max}</text>`;
  if(o.big)s+=`<text x="${f1(cx)}" y="${f1(cy-r*.32)}" class="t-big t-mid" style="font-size:${f1(r*.38)}px">${Math.round(v)}${o.unit?`<tspan class="t-xs" style="font-size:${f1(r*.16)}px"> ${o.unit}</tspan>`:''}</text>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+(o.ends!==false?30:18))}" class="t-sm t-mid">${o.label}</text>`;
  return s}
function nh3(x,y,o={}){const r=o.r||7,n=o.ion?4:3;let g=`<g style="opacity:${o.op==null?1:o.op}">`;
  for(let i=0;i<n;i++){const a=(o.ion?i/4*2*Math.PI+Math.PI/4:Math.PI/2+(i-1)*2.1),hx=x+Math.cos(a)*r*1.35,hy=y+Math.sin(a)*r*1.35;g+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(hx)}" y2="${f1(hy)}" style="stroke:var(--nh3);stroke-width:1.2"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(r*.45)}" style="fill:var(--panel);stroke:var(--nh3);stroke-width:1"/>`}
  g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--nh3-fill)"/><text x="${f1(x)}" y="${f1(y+r*.42)}" class="t-mid" style="font:700 ${f1(r*1.15)}px var(--mono);fill:var(--panel)">N</text>`;
  if(o.ion)g+=`<text x="${f1(x+r*1.9)}" y="${f1(y-r*.9)}" style="font:700 ${f1(r*1.2)}px var(--mono);fill:var(--nh3)">+</text>`;
  return g+'</g>'}
function brain(x,y,s=1,o={}){const fog=clamp(o.fog||0),P=(a,b)=>f1(x+a*s)+' '+f1(y+b*s),rr=rng(o.seed||2);
  const d=`M${P(-70,8)}Q${P(-76,-34)} ${P(-34,-50)}Q${P(10,-62)} ${P(48,-40)}Q${P(76,-24)} ${P(70,10)}Q${P(66,30)} ${P(40,34)}Q${P(18,38)} ${P(6,30)}Q${P(-30,40)} ${P(-58,30)}Q${P(-70,22)} ${P(-70,8)}Z`;
  let g=`<path d="M${P(14,32)}Q${P(18,52)} ${P(10,62)}" style="fill:none;stroke:var(--brain-line);stroke-width:${f1(8*s)};stroke-linecap:round;opacity:.6"/>`;
  g+=`<ellipse cx="${f1(x+44*s)}" cy="${f1(y+34*s)}" rx="${f1(20*s)}" ry="${f1(11*s)}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.4"/>`;
  g+=`<path d="${d}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.8"/>`;
  [[-50,-20,-30,-34],[-20,-30,4,-46],[16,-36,40,-22],[-56,6,-30,-6],[-20,-8,8,-20],[20,-6,52,0],[-34,22,-6,12],[10,14,40,18]].forEach(([a,b,c,e])=>{g+=`<path d="M${P(a,b)}Q${P((a+c)/2+4,(b+e)/2-8)} ${P(c,e)}" style="fill:none;stroke:var(--brain-line);stroke-width:1.1;opacity:.7"/>`});
  if(fog>0){g+=`<path d="${d}" style="fill:var(--nh3-fill);opacity:${f1(fog*.38)}"/>`;
    for(let i=0;i<Math.round(fog*9);i++){const ax=x+(rr()*110-60)*s,ay=y+(rr()*60-38)*s,ar=(2+fog*3)*s;let st='';for(let k=0;k<6;k++){const a=k/6*6.28;st+=`<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(ax+Math.cos(a)*ar*1.8)}" y2="${f1(ay+Math.sin(a)*ar*1.8)}" style="stroke:var(--nh3);stroke-width:.9"/>`}
      g+=st+`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(ar)}" style="fill:var(--nh3-soft);stroke:var(--nh3);stroke-width:1"/>`}}
  if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+78*s)}" class="t-xs t-mid">${o.label}</text>`;
  return {svg:g,at:[x,y]}}
function kidney(x,y,s=1,o={}){const inj=clamp(o.injury||0),P=(a,b)=>f1(x+a*s)+' '+f1(y+b*s);
  const d=`M${P(4,-22)}Q${P(-18,-24)} ${P(-18,0)}Q${P(-18,24)} ${P(4,22)}Q${P(16,20)} ${P(12,8)}Q${P(6,0)} ${P(12,-8)}Q${P(16,-20)} ${P(4,-22)}Z`;
  let g=`<path d="M${P(10,4)}Q${P(22,14)} ${P(18,34)}" style="fill:none;stroke:var(--brain-line);stroke-width:2"/>`;
  g+=`<path d="${d}" style="fill:var(--kidney);opacity:${f1(.85-inj*.45)};stroke:var(--kidney);stroke-width:1.5"/>`;
  if(inj>0)g+=`<path d="M${P(26,-14)}L${P(26,6)}" style="stroke:var(--bad);stroke-width:2;opacity:${f1(inj)}"/><path d="M${P(21,0)}L${P(26,8)}L${P(31,0)}" style="fill:none;stroke:var(--bad);stroke-width:2;opacity:${f1(inj)}"/>`;
  if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+44*s)}" class="t-xs t-mid">${o.label}</text>`;
  return g}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
function pill(x,y,s=30,o={}){const col=o.col||'var(--rx)',r=s*.22;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})">`;
  if(o.round)g+=`<circle r="${f1(s/2)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><line x1="${f1(-s*.3)}" x2="${f1(s*.3)}" y1="0" y2="0" style="stroke:${col};stroke-width:1.2;opacity:.6"/>`;
  else g+=`<rect x="${f1(-s/2)}" y="${f1(-r)}" width="${f1(s)}" height="${f1(2*r)}" rx="${f1(r)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><path d="M0 ${f1(-r)}V${f1(r)}H${f1(s/2-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(s/2-r)} ${f1(-r)}Z" style="fill:${col};opacity:.75"/>`;
  if(o.txt)g+=`<text x="${o.round?0:f1(-s/4)}" y="${f1(r*.42)}" class="t-mid" style="font:700 ${f1(r*1.05)}px var(--mono);fill:var(--ink)">${o.txt}</text>`;
  return g+'</g>'}
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
  if(aff>0&&aff<1){const cid=uid('pc');g+=`<clipPath id="${cid}"><rect x="${f1(x-r)}" y="${f1(y-r)}" width="${r}" height="${2*r}"/></clipPath>${sh} clip-path="url(#${cid})" style="fill:var(--bile);stroke:none;opacity:.9"/>${sh} style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
  if(o.dead)g+=`<line x1="${f1(x-r*1.3)}" y1="${f1(y+r*1.3)}" x2="${f1(x+r*1.3)}" y2="${f1(y-r*1.3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
  if(o.proband)g+=`<path d="M${f1(x-r*2.2)} ${f1(y+r*1.9)}L${f1(x-r*1.15)} ${f1(y+r*.95)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#pedArrow)"/>`;
  return g}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What cirrhosis is',g:1,n:'1.1',d:'How common it is, who it affects, and the words we use'},
 {id:'liver',t:'The liver and what it does',g:1,n:'1.2',d:'The lobule, its blood supply, and the liver\'s many jobs'},
 {id:'fibrosis',t:'From injury to scar',g:1,n:'1.3',d:'Stellate cells, collagen, nodules, and whether scar can regress'},
 {id:'alcohol',t:'Alcohol-related liver disease',g:2,n:'2.1',d:'From fatty liver to hepatitis and cirrhosis, and what stopping does'},
 {id:'masld',t:'Fatty liver disease (MASLD & MASH)',g:2,n:'2.2',d:'MASLD, MASH and MetALD: fat, metabolism and fibrosis'},
 {id:'hepatitis',t:'Viral hepatitis B & C',g:2,n:'2.3',d:'Hepatitis B and C: progression, antivirals and cure'},
 {id:'othercauses',t:'Other causes: genes, immunity & bile ducts',g:2,n:'2.4',d:'Haemochromatosis, Wilson, alpha-1, autoimmune and bile-duct diseases'},
 {id:'tests',t:'Blood tests, scans & biopsy',g:3,n:'3.1',d:'Liver blood tests, ultrasound and biopsy, read as patterns'},
 {id:'noninvasive',t:'Measuring scarring without a biopsy',g:3,n:'3.2',d:'FIB-4 and elastography: a teaching calculator'},
 {id:'scores',t:'Child–Pugh & MELD scores',g:3,n:'3.3',d:'Child–Pugh, MELD, MELD-Na and MELD 3.0: teaching calculators'},
 {id:'portal',t:'Portal hypertension & varices',g:4,n:'4.1',d:'Portal pressure, varices, bleeding and their treatment'},
 {id:'ascites',t:'Ascites, infection & kidney injury',g:4,n:'4.2',d:'Fluid in the belly, SBP, hyponatraemia and hepatorenal syndrome'},
 {id:'encephalopathy',t:'Hepatic encephalopathy',g:4,n:'4.3',d:'Ammonia, confusion, West Haven grades, lactulose and rifaximin'},
 {id:'hcc',t:'Liver cancer surveillance',g:4,n:'4.4',d:'Liver cancer risk and six-monthly surveillance'},
 {id:'course',t:'Compensated to decompensated: the course',g:4,n:'4.5',d:'Compensated, decompensated, ACLF and recompensation'},
 {id:'transplant',t:'Liver transplant',g:5,n:'5.1',d:'Referral, MELD and the waiting list, surgery and life after'},
 {id:'nutrition',t:'Nutrition, muscle & medicine safety',g:5,n:'5.2',d:'Protein, the late evening snack, sarcopenia and safer medicines'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Assessments, paracentesis care, bleeding and confusion watch'},
 {id:'living',t:'Living with cirrhosis',g:5,n:'5.4',d:'Daily life, red flags, work, family and palliative care'},
 {id:'frontier',t:'Research toward better treatment',g:5,n:'5.5',d:'Antifibrotics, MASH drugs, statins, machine perfusion: evidence-labelled'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Laennec to MELD, transplant and hepatitis C cure'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards and memory aids by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];

/* group colours: 1 and 6 use the petrol brand; 2 causes liver red-brown (--liver), 3 plum (--dx), 4 bile gold (--accent), 5 green (--rx) */
const GROUPS={1:['Understanding cirrhosis','g-und','c-und'],2:['Causes','g-cause','c-cause'],3:['Diagnosis & staging','g-dx','c-dx'],4:['Complications','g-comp','c-comp'],5:['Treatment & living','g-rx','c-rx'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('cir:tab');sessionStorage.setItem('cir:tab','1')}catch(e){}
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
const SOURCES=[{"key": "AbouAlfa2022HIMALAYA", "text": "Abou-Alfa GK, Lau G, Kudo M, Chan SL, Kelley RK, Furuse J, et al. Tremelimumab plus Durvalumab in Unresectable Hepatocellular Carcinoma. NEJM Evid. 2022;1(8):EVIDoa2100070. PMID 38319892; doi:10.1056/EVIDoa2100070.", "link": "https://doi.org/10.1056/evidoa2100070", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Abraldes2016Anticipate", "text": "Abraldes JG, Bureau C, Stefanescu H, Augustin S, Ney M, Blasco H, et al. Noninvasive tools and risk of clinically significant portal hypertension and varices in compensated cirrhosis: The \"Anticipate\" study. Hepatology. 2016;64(6):2173-2184. PMID 27639071; doi:10.1002/hep.28824.", "link": "https://doi.org/10.1002/hep.28824", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Abraldes2016BLEPS", "text": "Abraldes JG, Villanueva C, Aracil C, Turnes J, Hernandez-Guerra M, Genesca J, et al. Addition of Simvastatin to Standard Therapy for the Prevention of Variceal Rebleeding Does Not Reduce Rebleeding but Increases Survival in Patients With Cirrhosis. Gastroenterology. 2016;150(5):1160-1170.e3. PMID 26774179; doi:10.1053/j.gastro.2016.01.004.", "link": "https://doi.org/10.1053/j.gastro.2016.01.004", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Abureesh2026", "text": "Abureesh O, Al-Shraideh A, Sleiman J, Lahoud C, Plann-Curley B, Deeb L. Global prevalence and predictors of depression and anxiety in patients with liver cirrhosis: a systematic review and meta-analysis. Front Epidemiol. 2026;6:1740227. PMID 42077634; PMCID PMC13133006; doi:10.3389/fepid.2026.1740227.", "link": "https://doi.org/10.3389/fepid.2026.1740227", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Aby2026Financial", "text": "Aby ES, Hundt M, Rice J, Kriss M, Zhou K, Nephew L, et al. Financial burden among liver transplant candidates is associated with financial distress and work impairment: A U.S. multicenter study. Hepatol Commun. 2026;10(7). PMID 42372189; PMCID PMC13313665; doi:10.1097/HC9.0000000000000985.", "link": "https://doi.org/10.1097/hc9.0000000000000985", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "ACLFConsensus2026", "text": "European Association for the Study of the Liver (EASL), American Association for the Study of Liver Diseases (AASLD), Asia-Pacific Association for the Study of the Liver (APASL), Latin American Association for the Study of the Liver (ALEH), Society on Liver Disease in Africa (SOLDA). Acute-on-chronic liver failure: A global multisociety consensus on definitions. J Hepatol. 2026 (online ahead of print). PMID 42962929; doi:10.1016/j.jhep.2026.09.005. Co-published in Hepatol Int 2026 (PMID 42961555).", "link": "https://doi.org/10.1016/j.jhep.2026.09.005", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Adams2005HEIRS", "text": "Adams PC, Reboussin DM, Barton JC, McLaren CE, Eckfeldt JH, McLaren GD, et al. Hemochromatosis and iron-overload screening in a racially diverse population. N Engl J Med. 2005;352(17):1769-78. PMID 15858186; doi:10.1056/NEJMoa041534.", "link": "https://doi.org/10.1056/nejmoa041534", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Addolorato2007Lancet", "text": "Addolorato G, Leggio L, Ferrulli A, Cardone S, Vonghia L, Mirijello A, et al. Effectiveness and safety of baclofen for maintenance of alcohol abstinence in alcohol-dependent patients with liver cirrhosis: randomised, double-blind controlled study. Lancet. 2007;370(9603):1915-1922. PMID 18068515; doi:10.1016/S0140-6736(07)61814-5.", "link": "https://doi.org/10.1016/s0140-6736(07)61814-5", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Afdhal2008Platelets", "text": "Afdhal N, McHutchison J, Brown R, Jacobson I, Manns M, Poordad F, et al. Thrombocytopenia associated with chronic liver disease. J Hepatol. 2008;48(6):1000-7. PMID 18433919; doi:10.1016/j.jhep.2008.03.009.", "link": "https://doi.org/10.1016/j.jhep.2008.03.009", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Akabane2025MELD3", "text": "Akabane M, Imaoka Y, Esquivel CO, Sasaki K. Has Sex-Based Disparity in Liver Transplantation Opportunities and Waitlist Mortality Improved in the MELD3.0 Era?: A Preliminary Study. Clin Transplant. 2025;39(1):e70064. PMID 39737609; doi:10.1111/ctr.70064.", "link": "https://doi.org/10.1111/ctr.70064", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Alfaiate2020HDV", "text": "Alfaiate D, Clément S, Gomes D, Goossens N, Negro F. Chronic hepatitis D and hepatocellular carcinoma: A systematic review and meta-analysis of observational studies. J Hepatol. 2020;73(3):533-539. PMID 32151618; doi:10.1016/j.jhep.2020.02.030.", "link": "https://doi.org/10.1016/j.jhep.2020.02.030", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Allen2008NEJM", "text": "Allen KJ, Gurrin LC, Constantine CC, Osborne NJ, Delatycki MB, Nicoll AJ, et al. Iron-overload-related disease in HFE hereditary hemochromatosis. N Engl J Med. 2008;358(3):221-30. PMID 18199861; doi:10.1056/NEJMoa073286.", "link": "https://doi.org/10.1056/nejmoa073286", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Aminian2021JAMA", "text": "Aminian A, Al-Kurd A, Wilson R, Bena J, Fayazzadeh H, Singh T, et al. Association of Bariatric Surgery With Major Adverse Liver and Cardiovascular Outcomes in Patients With Biopsy-Proven Nonalcoholic Steatohepatitis. JAMA. 2021;326(20):2031-2042. PMID 34762106; PMCID PMC8587225; doi:10.1001/jama.2021.19569.", "link": "https://doi.org/10.1001/jama.2021.19569", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Amodio2013ISHEN", "text": "Amodio P, Bemeur C, Butterworth R, Cordoba J, Kato A, Montagnese S, et al. The nutritional management of hepatic encephalopathy in patients with cirrhosis: International Society for Hepatic Encephalopathy and Nitrogen Metabolism Consensus. Hepatology. 2013;58(1):325-36. PMID 23471642; doi:10.1002/hep.26370.", "link": "https://doi.org/10.1002/hep.26370", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Andrade2019", "text": "Andrade RJ, Chalasani N, Björnsson ES, Suzuki A, Kullak-Ublick GA, Watkins PB, et al. Drug-induced liver injury. Nat Rev Dis Primers. 2019;5(1):58. PMID 31439850; doi:10.1038/s41572-019-0105-0.", "link": "https://doi.org/10.1038/s41572-019-0105-0", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Angeli2006Hepatology", "text": "Angeli P, Wong F, Watson H, Ginès P, CAPPS Investigators. Hyponatremia in cirrhosis: Results of a patient population survey. Hepatology. 2006;44(6):1535-42. PMID 17133458; doi:10.1002/hep.21412.", "link": "https://doi.org/10.1002/hep.21412", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Angeli2010Gut", "text": "Angeli P, Fasolato S, Mazza E, Okolicsanyi L, Maresio G, Velo E, et al. Combined versus sequential diuretic treatment of ascites in non-azotaemic patients with cirrhosis: results of an open randomised clinical trial. Gut. 2010;59(1):98-104. PMID 19570764; doi:10.1136/gut.2008.176495.", "link": "https://doi.org/10.1136/gut.2008.176495", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Angulo2015", "text": "Angulo P, Kleiner DE, Dam-Larsen S, Adams LA, Bjornsson ES, Charatcharoenwitthaya P, et al. Liver Fibrosis, but No Other Histologic Features, Is Associated With Long-term Outcomes of Patients With Nonalcoholic Fatty Liver Disease. Gastroenterology. 2015;149(2):389-97.e10. PMID 25935633; PMCID PMC4516664; doi:10.1053/j.gastro.2015.04.043.", "link": "https://doi.org/10.1053/j.gastro.2015.04.043", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Arvaniti2010Gastro", "text": "Arvaniti V, D'Amico G, Fede G, Manousou P, Tsochatzis E, Pleguezuelo M, et al. Infections in patients with cirrhosis increase mortality four-fold and should be used in determining prognosis. Gastroenterology. 2010;139(4):1246-56, 1256.e1-5. PMID 20558165; doi:10.1053/j.gastro.2010.06.019.", "link": "https://doi.org/10.1053/j.gastro.2010.06.019", "areas": ["F", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Arvaniti2010"]}, {"key": "Askgaard2015JHep", "text": "Askgaard G, Grønbæk M, Kjær MS, Tjønneland A, Tolstrup JS. Alcohol drinking pattern and risk of alcoholic liver cirrhosis: a prospective cohort study. J Hepatol. 2015;62(5):1061-7. PMID 25634330; doi:10.1016/j.jhep.2014.12.005.", "link": "https://doi.org/10.1016/j.jhep.2014.12.005", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Asrani2013Gastro", "text": "Asrani SK, Larson JJ, Yawn B, Therneau TM, Kim WR. Underestimation of liver-related mortality in the United States. Gastroenterology. 2013;145(2):375-82.e1-2. PMID 23583430; PMCID PMC3890240; doi:10.1053/j.gastro.2013.04.005.", "link": "https://doi.org/10.1053/j.gastro.2013.04.005", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Asrani2019JHep", "text": "Asrani SK, Devarbhavi H, Eaton J, Kamath PS. Burden of liver diseases in the world. J Hepatol. 2019;70(1):151-171. PMID 30266282; doi:10.1016/j.jhep.2018.09.014.", "link": "https://doi.org/10.1016/j.jhep.2018.09.014", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Ayyala2022", "text": "Ayyala D, Bottyan T, Tien C, Pimienta M, Yoo J, Stager K, et al. Naltrexone for alcohol use disorder: Hepatic safety in patients with and without liver disease. Hepatol Commun. 2022;6(12):3433-3442. PMID 36281979; PMCID PMC9701476; doi:10.1002/hep4.2080.", "link": "https://doi.org/10.1002/hep4.2080", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bajaj2009Crashes", "text": "Bajaj JS, Saeian K, Schubert CM, Hafeezullah M, Franco J, Varma RR, et al. Minimal hepatic encephalopathy is associated with motor vehicle crashes: the reality beyond the driving test. Hepatology. 2009;50(4):1175-83. PMID 19670416; PMCID PMC2757520; doi:10.1002/hep.23128.", "link": "https://doi.org/10.1002/hep.23128", "areas": ["G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Bajaj2009Driving"]}, {"key": "Bajaj2011Burden", "text": "Bajaj JS, Wade JB, Gibson DP, Heuman DM, Thacker LR, Sterling RK, et al. The multi-dimensional burden of cirrhosis and hepatic encephalopathy on patients and caregivers. Am J Gastroenterol. 2011;106(9):1646-53. PMID 21556040; PMCID PMC3989143; doi:10.1038/ajg.2011.157.", "link": "https://doi.org/10.1038/ajg.2011.157", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Banares2013RELIEF", "text": "Bañares R, Nevens F, Larsen FS, Jalan R, Albillos A, Dollinger M, et al. Extracorporeal albumin dialysis with the molecular adsorbent recirculating system in acute-on-chronic liver failure: the RELIEF trial. Hepatology. 2013;57(3):1153-62. PMID 23213075; doi:10.1002/hep.26185.", "link": "https://doi.org/10.1002/hep.26185", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bass2010Rifaximin", "text": "Bass NM, Mullen KD, Sanyal A, Poordad F, Neff G, Leevy CB, et al. Rifaximin treatment in hepatic encephalopathy. N Engl J Med. 2010;362(12):1071-81. PMID 20335583; doi:10.1056/NEJMoa0907893.", "link": "https://doi.org/10.1056/nejmoa0907893", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Bataller2005", "text": "Bataller R, Brenner DA. Liver fibrosis. J Clin Invest. 2005;115(2):209-18. PMID 15690074; PMCID PMC546435; doi:10.1172/JCI24282.", "link": "https://doi.org/10.1172/jci24282", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Becker1996Hepatology", "text": "Becker U, Deis A, Sørensen TI, Grønbaek M, Borch-Johnsen K, Müller CF, et al. Prediction of risk of liver disease by alcohol intake, sex, and age: a prospective population study. Hepatology. 1996;23(5):1025-9. PMID 8621128; doi:10.1002/hep.510230513.", "link": "https://doi.org/10.1002/hep.510230513", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bedossa1996", "text": "Bedossa P, Poynard T. An algorithm for the grading of activity in chronic hepatitis C. The METAVIR Cooperative Study Group. Hepatology. 1996;24(2):289-93. PMID 8690394; doi:10.1002/hep.510240201.", "link": "https://doi.org/10.1002/hep.510240201", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bedossa2003", "text": "Bedossa P, Dargère D, Paradis V. Sampling variability of liver fibrosis in chronic hepatitis C. Hepatology. 2003;38(6):1449-57. PMID 14647056; doi:10.1016/j.hep.2003.09.022.", "link": "https://doi.org/10.1016/j.hep.2003.09.022", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "BenMoshe2019", "text": "Ben-Moshe S, Itzkovitz S. Spatial heterogeneity in the mammalian liver. Nat Rev Gastroenterol Hepatol. 2019;16(7):395-410. PMID 30936469; doi:10.1038/s41575-019-0134-x.", "link": "https://doi.org/10.1038/s41575-019-0134-x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Berg2007A2ALL", "text": "Berg CL, Gillespie BW, Merion RM, Brown RS Jr, Abecassis MM, Trotter JF, et al. Improvement in survival associated with adult-to-adult living donor liver transplantation. Gastroenterology. 2007;133(6):1806-13. PMID 18054553; PMCID PMC3170913; doi:10.1053/j.gastro.2007.09.004.", "link": "https://doi.org/10.1053/j.gastro.2007.09.004", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Berman2011", "text": "Berman K, Tandra S, Forssell K, Vuppalanchi R, Burton JR Jr, Nguyen J, et al. Incidence and predictors of 30-day readmission among patients hospitalized for advanced liver disease. Clin Gastroenterol Hepatol. 2011;9(3):254-9. PMID 21092762; PMCID PMC3156473; doi:10.1016/j.cgh.2010.10.035.", "link": "https://doi.org/10.1016/j.cgh.2010.10.035", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bernard1999Hepatology", "text": "Bernard B, Grangé JD, Khac EN, Amiot X, Opolon P, Poynard T. Antibiotic prophylaxis for the prevention of bacterial infections in cirrhotic patients with gastrointestinal bleeding: a meta-analysis. Hepatology. 1999;29(6):1655-61. PMID 10347104; doi:10.1002/hep.510290608.", "link": "https://doi.org/10.1002/hep.510290608", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Bernardi2012Hepatology", "text": "Bernardi M, Caraceni P, Navickis RJ, Wilkes MM. Albumin infusion in patients undergoing large-volume paracentesis: a meta-analysis of randomized trials. Hepatology. 2012;55(4):1172-81. PMID 22095893; doi:10.1002/hep.24786.", "link": "https://doi.org/10.1002/hep.24786", "areas": ["F", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Bernardi2012"]}, {"key": "BersoffMatcha2017", "text": "Bersoff-Matcha SJ, Cao K, Jason M, Ajao A, Jones SC, Meyer T, et al. Hepatitis B Virus Reactivation Associated With Direct-Acting Antiviral Therapy for Chronic Hepatitis C Virus: A Review of Cases Reported to the U.S. Food and Drug Administration Adverse Event Reporting System. Ann Intern Med. 2017;166(11):792-798. PMID 28437794; doi:10.7326/M17-0377.", "link": "https://doi.org/10.7326/m17-0377", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Beutler2002Lancet", "text": "Beutler E, Felitti VJ, Koziol JA, Ho NJ, Gelbart T. Penetrance of 845G--> A (C282Y) HFE hereditary haemochromatosis mutation in the USA. Lancet. 2002;359(9302):211-8. PMID 11812557; doi:10.1016/S0140-6736(02)07447-0.", "link": "https://doi.org/10.1016/s0140-6736(02)07447-0", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bhattacharya2023HCV", "text": "Bhattacharya D, Aronsohn A, Price J, Lo Re V. Hepatitis C Guidance 2023 Update: AASLD-IDSA Recommendations for Testing, Managing, and Treating Hepatitis C Virus Infection. Clin Infect Dis. 2023. PMID 37229695; doi:10.1093/cid/ciad319.", "link": "https://doi.org/10.1093/cid/ciad319", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Biggins2006MELDNa", "text": "Biggins SW, Kim WR, Terrault NA, Saab S, Balan V, Schiano T, et al. Evidence-based incorporation of serum sodium concentration into MELD. Gastroenterology. 2006;130(6):1652-60. PMID 16697729; doi:10.1053/j.gastro.2006.02.010.", "link": "https://doi.org/10.1053/j.gastro.2006.02.010", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Biggins2021AASLD", "text": "Biggins SW, Angeli P, Garcia-Tsao G, Ginès P, Ling SC, Nadim MK, et al. Diagnosis, Evaluation, and Management of Ascites, Spontaneous Bacterial Peritonitis and Hepatorenal Syndrome: 2021 Practice Guidance by the American Association for the Study of Liver Diseases. Hepatology. 2021;74(2):1014-1048. PMID 33942342; doi:10.1002/hep.31884.", "link": "https://doi.org/10.1002/hep.31884", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Bilzer2006", "text": "Bilzer M, Roggel F, Gerbes AL. Role of Kupffer cells in host defense and liver disease. Liver Int. 2006;26(10):1175-86. PMID 17105582; doi:10.1111/j.1478-3231.2006.01342.x.", "link": "https://doi.org/10.1111/j.1478-3231.2006.01342.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bjornsson2013", "text": "Björnsson ES, Bergmann OM, Björnsson HK, Kvaran RB, Olafsson S. Incidence, presentation, and outcomes in patients with drug-induced liver injury in the general population of Iceland. Gastroenterology. 2013;144(7):1419-25, 1425.e1-3; quiz e19-20. PMID 23419359; doi:10.1053/j.gastro.2013.02.006.", "link": "https://doi.org/10.1053/j.gastro.2013.02.006", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Blumberg1965", "text": "Blumberg BS, Alter HJ, Visnich S. A \"new\" antigen in leukemia sera. JAMA. 1965;191:541-6. PMID 14239025; doi:10.1001/jama.1965.03080070025007.", "link": "https://doi.org/10.1001/jama.1965.03080070025007", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Boonstra2013", "text": "Boonstra K, Weersma RK, van Erpecum KJ, Rauws EA, Spanier BW, Poen AC, et al. Population-based epidemiology, malignancy risk, and outcome of primary sclerosing cholangitis. Hepatology. 2013;58(6):2045-55. PMID 23775876; doi:10.1002/hep.26565.", "link": "https://doi.org/10.1002/hep.26565", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Borzio2001DLD", "text": "Borzio M, Salerno F, Piantoni L, Cazzaniga M, Angeli P, Bissoli F, et al. Bacterial infection in patients with advanced cirrhosis: a multicentre prospective study. Dig Liver Dis. 2001;33(1):41-8. PMID 11303974; doi:10.1016/s1590-8658(01)80134-1.", "link": "https://doi.org/10.1016/s1590-8658(01)80134-1", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Boyer2013", "text": "Boyer JL. Bile formation and secretion. Compr Physiol. 2013;3(3):1035-78. PMID 23897680; PMCID PMC4091928; doi:10.1002/cphy.c120027.", "link": "https://doi.org/10.1002/cphy.c120027", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Boyer2016REVERSE", "text": "Boyer TD, Sanyal AJ, Wong F, Frederick RT, Lake JR, O'Leary JG, et al. Terlipressin Plus Albumin Is More Effective Than Albumin Alone in Improving Renal Function in Patients With Cirrhosis and Hepatorenal Syndrome Type 1. Gastroenterology. 2016;150(7):1579-1589.e2. PMID 26896734; doi:10.1053/j.gastro.2016.02.026.", "link": "https://doi.org/10.1053/j.gastro.2016.02.026", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Brennan2025MATCH", "text": "Brennan PN, MacMillan M, Manship T, Moroni F, Glover A, Troland D, et al. Autologous macrophage therapy for liver cirrhosis: a phase 2 open-label randomized controlled trial. Nat Med. 2025;31(3):979-987. PMID 39794616; PMCID PMC11922741; doi:10.1038/s41591-024-03406-8.", "link": "https://doi.org/10.1038/s41591-024-03406-8", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Brennan2026MATCHLTFU", "text": "Brennan PN, Kilpatrick AM, Glover A, Campana L, Turner ML, Elliott A, et al. Autologous macrophage therapy increases transplant-free survival in cirrhosis: Long-term follow-up of a phase 2 clinical trial. Cell Stem Cell. 2026;33(7):1098-1109.e3. PMID 42184827; doi:10.1016/j.stem.2026.04.016.", "link": "https://doi.org/10.1016/j.stem.2026.04.016", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Brustia2018", "text": "Brustia R, Savier E, Scatton O. Physical exercise in cirrhotic patients: Towards prehabilitation on waiting list for liver transplantation. A systematic review and meta-analysis. Clin Res Hepatol Gastroenterol. 2018;42(3):205-215. PMID 29162460; doi:10.1016/j.clinre.2017.09.005.", "link": "https://doi.org/10.1016/j.clinre.2017.09.005", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Buch2015NatGenet", "text": "Buch S, Stickel F, Trépo E, Way M, Herrmann A, Nischalke HD, et al. A genome-wide association study confirms PNPLA3 and identifies TM6SF2 and MBOAT7 as risk loci for alcohol-related cirrhosis. Nat Genet. 2015;47(12):1443-8. PMID 26482880; doi:10.1038/ng.3417.", "link": "https://doi.org/10.1038/ng.3417", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "BuganzaTorio2019", "text": "Buganza-Torio E, Mitchell N, Abraldes JG, Thomas L, Ma M, Bailey RJ, et al. Depression in cirrhosis - a prospective evaluation of the prevalence, predictors and development of a screening nomogram. Aliment Pharmacol Ther. 2019;49(2):194-201. PMID 30485460; doi:10.1111/apt.15068.", "link": "https://doi.org/10.1111/apt.15068", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bureau2017Gastro", "text": "Bureau C, Thabut D, Oberti F, Dharancy S, Carbonell N, Bouvier A, et al. Transjugular Intrahepatic Portosystemic Shunts With Covered Stents Increase Transplant-Free Survival of Patients With Cirrhosis and Recurrent Ascites. Gastroenterology. 2017;152(1):157-163. PMID 27663604; doi:10.1053/j.gastro.2016.09.016.", "link": "https://doi.org/10.1053/j.gastro.2016.09.016", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Burt2026", "text": "Burt AD, Behling C, Gouw ASH, Hytiroglou P, Lackner C, Alves VAF, et al. Fibrosis regression in chronic liver disease: The pathologist's view. J Hepatol. 2026;85(5):1033-1039. PMID 42497924; doi:10.1016/j.jhep.2026.07.018.", "link": "https://doi.org/10.1016/j.jhep.2026.07.018", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bustamante1999", "text": "Bustamante J, Rimola A, Ventura PJ, Navasa M, Cirera I, Reggiardo V, et al. Prognostic significance of hepatic encephalopathy in patients with cirrhosis. J Hepatol. 1999;30(5):890-5. PMID 10365817; doi:10.1016/s0168-8278(99)80144-5.", "link": "https://doi.org/10.1016/s0168-8278(99)80144-5", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Caldwell1999", "text": "Caldwell SH, Oelsner DH, Iezzoni JC, Hespenheide EE, Battle EH, Driscoll CJ. Cryptogenic cirrhosis: clinical characterization and risk factors for underlying disease. Hepatology. 1999;29(3):664-9. PMID 10051466; doi:10.1002/hep.510290347.", "link": "https://doi.org/10.1002/hep.510290347", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Calne1979", "text": "Calne RY, Rolles K, White DJ, Thiru S, Evans DB, McMaster P, et al. Cyclosporin A initially as the only immunosuppressant in 34 recipients of cadaveric organs: 32 kidneys, 2 pancreases, and 2 livers. Lancet. 1979;2(8151):1033-6. PMID 91781; doi:10.1016/s0140-6736(79)92440-1.", "link": "https://doi.org/10.1016/s0140-6736(79)92440-1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Calvaruso2018", "text": "Calvaruso V, Cabibbo G, Cacciola I, Petta S, Madonia S, Bellia A, et al. Incidence of Hepatocellular Carcinoma in Patients With HCV-Associated Cirrhosis Treated With Direct-Acting Antiviral Agents. Gastroenterology. 2018;155(2):411-421.e4. PMID 29655836; doi:10.1053/j.gastro.2018.04.008.", "link": "https://doi.org/10.1053/j.gastro.2018.04.008", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Campagna2017ANT", "text": "Campagna F, Montagnese S, Ridola L, Senzolo M, Schiff S, De Rui M, et al. The animal naming test: An easy tool for the assessment of hepatic encephalopathy. Hepatology. 2017;66(1):198-208. PMID 28271528; doi:10.1002/hep.29146.", "link": "https://doi.org/10.1002/hep.29146", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Caraceni2018ANSWER", "text": "Caraceni P, Riggio O, Angeli P, Alessandria C, Neri S, Foschi FG, et al. Long-term albumin administration in decompensated cirrhosis (ANSWER): an open-label randomised trial. Lancet. 2018;391(10138):2417-2429. PMID 29861076; doi:10.1016/S0140-6736(18)30840-7.", "link": "https://doi.org/10.1016/s0140-6736(18)30840-7", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Carbonell2004Hepatology", "text": "Carbonell N, Pauwels A, Serfaty L, Fourdan O, Lévy VG, Poupon R. Improved survival after variceal bleeding in patients with cirrhosis over the past two decades. Hepatology. 2004;40(3):652-9. PMID 15349904; doi:10.1002/hep.20339.", "link": "https://doi.org/10.1002/hep.20339", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Carey2017SMI", "text": "Carey EJ, Lai JC, Wang CW, Dasarathy S, Lobach I, Montano-Loza AJ, et al. A multicenter study to define sarcopenia in patients with end-stage liver disease. Liver Transpl. 2017;23(5):625-633. PMID 28240805; PMCID PMC5762612; doi:10.1002/lt.24750.", "link": "https://doi.org/10.1002/lt.24750", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Castera2010Pitfalls", "text": "Castéra L, Foucher J, Bernard PH, Carvalho F, Allaix D, Merrouche W, et al. Pitfalls of liver stiffness measurement: a 5-year prospective study of 13,369 examinations. Hepatology. 2010;51(3):828-35. PMID 20063276; doi:10.1002/hep.23425.", "link": "https://doi.org/10.1002/hep.23425", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Chalasani2021ACG", "text": "Chalasani NP, Maddur H, Russo MW, Wong RJ, Reddy KR. ACG Clinical Guideline: Diagnosis and Management of Idiosyncratic Drug-Induced Liver Injury. Am J Gastroenterol. 2021;116(5):878-898. PMID 33929376; doi:10.14309/ajg.0000000000001259.", "link": "https://doi.org/10.14309/ajg.0000000000001259", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chang1997NEJM", "text": "Chang MH, Chen CJ, Lai MS, Hsu HM, Wu TC, Kong MS, et al. Universal hepatitis B vaccination in Taiwan and the incidence of hepatocellular carcinoma in children. Taiwan Childhood Hepatoma Study Group. N Engl J Med. 1997;336(26):1855-9. PMID 9197213; doi:10.1056/NEJM199706263362602.", "link": "https://doi.org/10.1056/nejm199706263362602", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chang2009JNCI", "text": "Chang MH, You SL, Chen CJ, Liu CJ, Lee CM, Lin SM, et al. Decreased incidence of hepatocellular carcinoma in hepatitis B vaccinees: a 20-year follow-up study. J Natl Cancer Inst. 2009;101(19):1348-55. PMID 19759364; doi:10.1093/jnci/djp288.", "link": "https://doi.org/10.1093/jnci/djp288", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chang2010Entecavir", "text": "Chang TT, Liaw YF, Wu SS, Schiff E, Han KH, Lai CL, et al. Long-term entecavir therapy results in the reversal of fibrosis/cirrhosis and continued histological improvement in patients with chronic hepatitis B. Hepatology. 2010;52(3):886-93. PMID 20683932; doi:10.1002/hep.23785.", "link": "https://doi.org/10.1002/hep.23785", "areas": ["B", "D"], "unverified": false, "validated": "PubMed", "aliases": ["Chang2010ETV"]}, {"key": "Chang2024PIR", "text": "Chang X, Lv C, Wang B, Wang J, Song Z, An L, et al. The utility of P-I-R classification in predicting the on-treatment histological and clinical outcomes of patients with hepatitis B and advanced liver fibrosis. Hepatology. 2024;79(2):425-437. PMID 37611260; PMCID PMC10789381; doi:10.1097/HEP.0000000000000563.", "link": "https://doi.org/10.1097/hep.0000000000000563", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "ChavezTapia2010Cochrane", "text": "Chavez-Tapia NC, Barrientos-Gutierrez T, Tellez-Avila FI, Soares-Weiser K, Uribe M. Antibiotic prophylaxis for cirrhotic patients with upper gastrointestinal bleeding. Cochrane Database Syst Rev. 2010;2010(9):CD002907. PMID 20824832; PMCID PMC7138054; doi:10.1002/14651858.CD002907.pub2.", "link": "https://doi.org/10.1002/14651858.cd002907.pub2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Chen2006Ablation", "text": "Chen MS, Li JQ, Zheng Y, Guo RP, Liang HH, Zhang YQ, et al. A prospective randomized trial comparing percutaneous local ablative therapy and partial hepatectomy for small hepatocellular carcinoma. Ann Surg. 2006;243(3):321-8. PMID 16495695; PMCID PMC1448947; doi:10.1097/01.sla.0000201480.65519.b8.", "link": "https://doi.org/10.1097/01.sla.0000201480.65519.b8", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Chen2006JAMA", "text": "Chen CJ, Yang HI, Su J, Jen CL, You SL, Lu SN, et al. Risk of hepatocellular carcinoma across a biological gradient of serum hepatitis B virus DNA level. JAMA. 2006;295(1):65-73. PMID 16391218; doi:10.1001/jama.295.1.65.", "link": "https://doi.org/10.1001/jama.295.1.65", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chen2020HBPAP", "text": "Chen HW, Ferrando A, White MG, Dennis RA, Xie J, Pauly M, et al. Home-Based Physical Activity and Diet Intervention to Improve Physical Function in Advanced Liver Disease: A Randomized Pilot Trial. Dig Dis Sci. 2020;65(11):3350-3359. PMID 31907774; doi:10.1007/s10620-019-06034-2.", "link": "https://doi.org/10.1007/s10620-019-06034-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Cheng2022IMbrave150", "text": "Cheng AL, Qin S, Ikeda M, Galle PR, Ducreux M, Kim TY, et al. Updated efficacy and safety data from IMbrave150: Atezolizumab plus bevacizumab vs. sorafenib for unresectable hepatocellular carcinoma. J Hepatol. 2022;76(4):862-873. PMID 34902530; doi:10.1016/j.jhep.2021.11.030.", "link": "https://doi.org/10.1016/j.jhep.2021.11.030", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Chernyak2018LIRADS", "text": "Chernyak V, Fowler KJ, Kamaya A, Kielar AZ, Elsayes KM, Bashir MR, et al. Liver Imaging Reporting and Data System (LI-RADS) Version 2018: Imaging of Hepatocellular Carcinoma in At-Risk Patients. Radiology. 2018;289(3):816-830. PMID 30251931; PMCID PMC6677371; doi:10.1148/radiol.2018181494.", "link": "https://doi.org/10.1148/radiol.2018181494", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "ChildTurcotte1964", "text": "Child CG, Turcotte JG. Surgery and portal hypertension. Major Probl Clin Surg. 1964;1:1-85. PMID 4950264. No DOI listed in PubMed; no abstract.", "link": "https://pubmed.ncbi.nlm.nih.gov/4950264/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "China2021ATTIRE", "text": "China L, Freemantle N, Forrest E, Kallis Y, Ryder SD, Wright G, et al. A Randomized Trial of Albumin Infusions in Hospitalized Patients with Cirrhosis. N Engl J Med. 2021;384(9):808-817. PMID 33657293; doi:10.1056/NEJMoa2022166.", "link": "https://doi.org/10.1056/nejmoa2022166", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Cholongitas2006Biopsy", "text": "Cholongitas E, Senzolo M, Standish R, Marelli L, Quaglia A, Patch D, et al. A systematic review of the quality of liver biopsy specimens. Am J Clin Pathol. 2006;125(5):710-21. PMID 16707372; doi:10.1309/W3XC-NT4H-KFBN-2G0B.", "link": "https://doi.org/10.1309/w3xc-nt4h-kfbn-2g0b", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Choo1989", "text": "Choo QL, Kuo G, Weiner AJ, Overby LR, Bradley DW, Houghton M. Isolation of a cDNA clone derived from a blood-borne non-A, non-B viral hepatitis genome. Science. 1989;244(4902):359-62. PMID 2523562; doi:10.1126/science.2523562.", "link": "https://doi.org/10.1126/science.2523562", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Clark2024SEQUOIA", "text": "Clark VC, Strange C, Strnad P, Sanchez AJ, Kwo P, Pereira VM, et al. Fazirsiran for Adults With Alpha-1 Antitrypsin Deficiency Liver Disease: A Phase 2 Placebo Controlled Trial (SEQUOIA). Gastroenterology. 2024;167(5):1008-1018.e5. PMID 38964420; doi:10.1053/j.gastro.2024.06.028.", "link": "https://doi.org/10.1053/j.gastro.2024.06.028", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Coffey2013", "text": "Coffey AJ, Durkie M, Hague S, McLay K, Emmerson J, Lo C, et al. A genetic study of Wilson's disease in the United Kingdom. Brain. 2013;136(Pt 5):1476-87. PMID 23518715; PMCID PMC3634195; doi:10.1093/brain/awt035.", "link": "https://doi.org/10.1093/brain/awt035", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Colli2003US", "text": "Colli A, Fraquelli M, Andreoletti M, Marino B, Zuccoli E, Conte D. Severe liver fibrosis or cirrhosis: accuracy of US for detection--analysis of 300 cases. Radiology. 2003;227(1):89-94. PMID 12601199; doi:10.1148/radiol.2272020193.", "link": "https://doi.org/10.1148/radiol.2272020193", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Colli2006HCC", "text": "Colli A, Fraquelli M, Casazza G, Massironi S, Colucci A, Conte D, et al. Accuracy of ultrasonography, spiral CT, magnetic resonance, and alpha-fetoprotein in diagnosing hepatocellular carcinoma: a systematic review. Am J Gastroenterol. 2006;101(3):513-23. PMID 16542288; doi:10.1111/j.1572-0241.2006.00467.x.", "link": "https://doi.org/10.1111/j.1572-0241.2006.00467.x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Cooke2024Commission", "text": "Cooke GS, Flower B, Cunningham E, Marshall AD, Lazarus JV, Palayew A, et al. Progress towards elimination of viral hepatitis: a Lancet Gastroenterology & Hepatology Commission update. Lancet Gastroenterol Hepatol. 2024;9(4):346-365. PMID 38367629; doi:10.1016/S2468-1253(23)00321-7.", "link": "https://doi.org/10.1016/s2468-1253(23)00321-7", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Cordoba2004", "text": "Córdoba J, López-Hellín J, Planas M, Sabín P, Sanpedro F, Castro F, et al. Normal protein diet for episodic hepatic encephalopathy: results of a randomized study. J Hepatol. 2004;41(1):38-43. PMID 15246205; doi:10.1016/j.jhep.2004.03.023.", "link": "https://doi.org/10.1016/j.jhep.2004.03.023", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Costa2023ChildB", "text": "Costa F, Wiedenmann B, Roderburg C, Mohr R, Abou-Alfa GK. Systemic treatment in patients with Child-Pugh B liver dysfunction and advanced hepatocellular carcinoma. Cancer Med. 2023;12(13):13978-13990. PMID 37162288; PMCID PMC10358256; doi:10.1002/cam4.6033.", "link": "https://doi.org/10.1002/cam4.6033", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Crabb2016NIAAA", "text": "Crabb DW, Bataller R, Chalasani NP, Kamath PS, Lucey M, Mathurin P, et al. Standard Definitions and Common Data Elements for Clinical Trials in Patients With Alcoholic Hepatitis: Recommendation From the NIAAA Alcoholic Hepatitis Consortia. Gastroenterology. 2016;150(4):785-90. PMID 26921783; PMCID PMC5287362; doi:10.1053/j.gastro.2016.02.042. Full text read (PMC).", "link": "https://doi.org/10.1053/j.gastro.2016.02.042", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Crabb2020AASLD", "text": "Crabb DW, Im GY, Szabo G, Mellinger JL, Lucey MR. Diagnosis and Treatment of Alcohol-Associated Liver Diseases: 2019 Practice Guidance From the American Association for the Study of Liver Diseases. Hepatology. 2020;71(1):306-333. PMID 31314133; doi:10.1002/hep.30866.", "link": "https://doi.org/10.1002/hep.30866", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Curry2015ASTRAL4", "text": "Curry MP, O'Leary JG, Bzowej N, Muir AJ, Korenblat KM, Fenkel JM, et al. Sofosbuvir and Velpatasvir for HCV in Patients with Decompensated Cirrhosis. N Engl J Med. 2015;373(27):2618-28. PMID 26569658; doi:10.1056/NEJMoa1512614.", "link": "https://doi.org/10.1056/nejmoa1512614", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Czlonkowska2018", "text": "Członkowska A, Litwin T, Dusek P, Ferenci P, Lutsenko S, Medici V, et al. Wilson disease. Nat Rev Dis Primers. 2018;4(1):21. PMID 30190489; PMCID PMC6416051; doi:10.1038/s41572-018-0018-3. Leipzig score table and Kayser–Fleischer frequencies read from the PMC full text.", "link": "https://doi.org/10.1038/s41572-018-0018-3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dam2016PPI", "text": "Dam G, Vilstrup H, Watson H, Jepsen P. Proton pump inhibitors as a risk factor for hepatic encephalopathy and spontaneous bacterial peritonitis in patients with cirrhosis with ascites. Hepatology. 2016;64(4):1265-72. PMID 27474889; doi:10.1002/hep.28737.", "link": "https://doi.org/10.1002/hep.28737", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "DAmbrosio2012", "text": "D'Ambrosio R, Aghemo A, Rumi MG, Ronchi G, Donato MF, Paradis V, et al. A morphometric and immunohistochemical study to assess the benefit of a sustained virological response in hepatitis C virus patients with cirrhosis. Hepatology. 2012;56(2):532-43. PMID 22271347; doi:10.1002/hep.25606.", "link": "https://doi.org/10.1002/hep.25606", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "DAmico2006", "text": "D'Amico G, Garcia-Tsao G, Pagliaro L. Natural history and prognostic indicators of survival in cirrhosis: a systematic review of 118 studies. J Hepatol. 2006;44(1):217-31. PMID 16298014; doi:10.1016/j.jhep.2005.10.013. No abstract in PubMed and full text paywalled; stage figures taken from the restatement in Zipprich 2012.", "link": "https://doi.org/10.1016/j.jhep.2005.10.013", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "DAmico2014APT", "text": "D'Amico G, Pasta L, Morabito A, D'Amico M, Caltagirone M, Malizia G, et al. Competing risks and prognostic stages of cirrhosis: a 25-year inception cohort study of 494 patients. Aliment Pharmacol Ther. 2014;39(10):1180-93. PMID 24654740; doi:10.1111/apt.12721.", "link": "https://doi.org/10.1111/apt.12721", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "DAmico2018JHep", "text": "D'Amico G, Morabito A, D'Amico M, Pasta L, Malizia G, Rebora P, et al. Clinical states of cirrhosis and competing risks. J Hepatol. 2018;68(3):563-576. PMID 29111320; doi:10.1016/j.jhep.2017.10.020.", "link": "https://doi.org/10.1016/j.jhep.2017.10.020", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Dang2020AJG", "text": "Dang K, Hirode G, Singal AK, Sundaram V, Wong RJ. Alcoholic Liver Disease Epidemiology in the United States: A Retrospective Analysis of 3 US Databases. Am J Gastroenterol. 2020;115(1):96-104. PMID 31517639; doi:10.14309/ajg.0000000000000380.", "link": "https://doi.org/10.14309/ajg.0000000000000380", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "deFranchis2022BavenoVII", "text": "de Franchis R, Bosch J, Garcia-Tsao G, Reiberger T, Ripoll C, Baveno VII Faculty. Baveno VII - Renewing consensus in portal hypertension. J Hepatol. 2022;76(4):959-974. PMID 35120736; PMCID PMC11090185; doi:10.1016/j.jhep.2021.12.022. Statements read from the PMC author manuscript.", "link": "https://doi.org/10.1016/j.jhep.2021.12.022", "areas": ["A", "E", "F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "DeLeve2015", "text": "DeLeve LD. Liver sinusoidal endothelial cells in hepatic fibrosis. Hepatology. 2015;61(5):1740-6. PMID 25131509; PMCID PMC4333127; doi:10.1002/hep.27376.", "link": "https://doi.org/10.1002/hep.27376", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "DeutschLink2022", "text": "Deutsch-Link S, Jiang Y, Peery AF, Barritt AS, Bataller R, Moon AM. Alcohol-Associated Liver Disease Mortality Increased From 2017 to 2020 and Accelerated During the COVID-19 Pandemic. Clin Gastroenterol Hepatol. 2022;20(9):2142-2144.e2. PMID 35314353; PMCID PMC8933289; doi:10.1016/j.cgh.2022.03.017. Figures read from the PMC full text (research letter).", "link": "https://doi.org/10.1016/j.cgh.2022.03.017", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Devarbhavi2023", "text": "Devarbhavi H, Asrani SK, Arab JP, Nartey YA, Pose E, Kamath PS. Global burden of liver disease: 2023 update. J Hepatol. 2023;79(2):516-537. PMID 36990226; doi:10.1016/j.jhep.2023.03.017.", "link": "https://doi.org/10.1016/j.jhep.2023.03.017", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "DiazSoto2022TAG", "text": "Diaz-Soto MP, Garcia-Tsao G. Management of varices and variceal hemorrhage in liver cirrhosis: a recent update. Ther Adv Gastroenterol. 2022;15:17562848221101712. PMID 35757384; PMCID PMC9218432; doi:10.1177/17562848221101712.", "link": "https://doi.org/10.1177/17562848221101712", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Duffin1987", "text": "Duffin JM. Why does cirrhosis belong to Laennec? CMAJ. 1987;137(5):393-6. PMID 3304599; PMCID PMC1492806. No DOI listed in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/3304599/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Dulai2017", "text": "Dulai PS, Singh S, Patel J, Soni M, Prokop LJ, Younossi Z, et al. Increased risk of mortality by fibrosis stage in nonalcoholic fatty liver disease: Systematic review and meta-analysis. Hepatology. 2017;65(5):1557-1565. PMID 28130788; PMCID PMC5397356; doi:10.1002/hep.29085.", "link": "https://doi.org/10.1002/hep.29085", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Dunn2005MELD", "text": "Dunn W, Jamil LH, Brown LS, Wiesner RH, Kim WR, Menon KV, et al. MELD accurately predicts mortality in patients with alcoholic hepatitis. Hepatology. 2005;41(2):353-8. PMID 15660383; doi:10.1002/hep.20503.", "link": "https://doi.org/10.1002/hep.20503", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2017PBC", "text": "European Association for the Study of the Liver. EASL Clinical Practice Guidelines: The diagnosis and management of patients with primary biliary cholangitis. J Hepatol. 2017;67(1):145-172. PMID 28427765; doi:10.1016/j.jhep.2017.03.022.", "link": "https://doi.org/10.1016/j.jhep.2017.03.022", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2018Decomp", "text": "European Association for the Study of the Liver. EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis. J Hepatol. 2018;69(2):406-460. PMID 29653741; doi:10.1016/j.jhep.2018.03.024.", "link": "https://doi.org/10.1016/j.jhep.2018.03.024", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2019Nutrition", "text": "European Association for the Study of the Liver. EASL Clinical Practice Guidelines on nutrition in chronic liver disease. J Hepatol. 2019;70(1):172-193. PMID 30144956; PMCID PMC6657019; doi:10.1016/j.jhep.2018.06.024.", "link": "https://doi.org/10.1016/j.jhep.2018.06.024", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2022HH", "text": "European Association for the Study of the Liver. EASL Clinical Practice Guidelines on haemochromatosis. J Hepatol. 2022;77(2):479-502. PMID 35662478; doi:10.1016/j.jhep.2022.03.033.", "link": "https://doi.org/10.1016/j.jhep.2022.03.033", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2023ACLF", "text": "European Association for the Study of the Liver. EASL Clinical Practice Guidelines on acute-on-chronic liver failure. J Hepatol. 2023;79(2):461-491. PMID 37364789; doi:10.1016/j.jhep.2023.04.021.", "link": "https://doi.org/10.1016/j.jhep.2023.04.021", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2023HDV", "text": "European Association for the Study of the Liver. EASL Clinical Practice Guidelines on hepatitis delta virus. J Hepatol. 2023;79(2):433-460. PMID 37364791; doi:10.1016/j.jhep.2023.05.001.", "link": "https://doi.org/10.1016/j.jhep.2023.05.001", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2024MASLD", "text": "European Association for the Study of the Liver (EASL); European Association for the Study of Diabetes (EASD); European Association for the Study of Obesity (EASO). EASL-EASD-EASO Clinical Practice Guidelines on the management of metabolic dysfunction-associated steatotic liver disease (MASLD). J Hepatol. 2024;81(3):492-542. PMID 38851997; doi:10.1016/j.jhep.2024.04.031. Abstract only.", "link": "https://doi.org/10.1016/j.jhep.2024.04.031", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2025AIH", "text": "European Association for the Study of the Liver. EASL Clinical Practice Guidelines on the management of autoimmune hepatitis. J Hepatol. 2025;83(2):453-501. PMID 40348684; doi:10.1016/j.jhep.2025.03.017.", "link": "https://doi.org/10.1016/j.jhep.2025.03.017", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2025HBV", "text": "European Association for the Study of the Liver. EASL Clinical Practice Guidelines on the management of hepatitis B virus infection. J Hepatol. 2025;83(2):502-583. PMID 40348683; doi:10.1016/j.jhep.2025.03.018.", "link": "https://doi.org/10.1016/j.jhep.2025.03.018", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2025HCC", "text": "European Association for the Study of the Liver. EASL Clinical Practice Guidelines on the management of hepatocellular carcinoma. J Hepatol. 2025;82(2):315-374. PMID 39690085; doi:10.1016/j.jhep.2024.08.028.", "link": "https://doi.org/10.1016/j.jhep.2024.08.028", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "EASL2025Wilson", "text": "European Association for the Study of the Liver. EASL-ERN Clinical Practice Guidelines on Wilson's disease. J Hepatol. 2025. PMID 40089450; doi:10.1016/j.jhep.2024.11.007.", "link": "https://doi.org/10.1016/j.jhep.2024.11.007", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Eddowes2019FibroScan", "text": "Eddowes PJ, Sasso M, Allison M, Tsochatzis E, Anstee QM, Sheridan D, et al. Accuracy of FibroScan Controlled Attenuation Parameter and Liver Stiffness Measurement in Assessing Steatosis and Fibrosis in Patients With Nonalcoholic Fatty Liver Disease. Gastroenterology. 2019;156(6):1717-1730. PMID 30689971; doi:10.1053/j.gastro.2019.01.042.", "link": "https://doi.org/10.1053/j.gastro.2019.01.042", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Eipel2010", "text": "Eipel C, Abshagen K, Vollmar B. Regulation of hepatic blood flow: the hepatic arterial buffer response revisited. World J Gastroenterol. 2010;16(48):6046-57. PMID 21182219; PMCID PMC3012579; doi:10.3748/wjg.v16.i48.6046.", "link": "https://doi.org/10.3748/wjg.v16.i48.6046", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ekstedt2015", "text": "Ekstedt M, Hagström H, Nasr P, Fredrikson M, Stål P, Kechagias S, et al. Fibrosis stage is the strongest predictor for disease-specific mortality in NAFLD after up to 33 years of follow-up. Hepatology. 2015;61(5):1547-54. PMID 25125077; doi:10.1002/hep.27368.", "link": "https://doi.org/10.1002/hep.27368", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Escorsell2016Hepatology", "text": "Escorsell À, Pavel O, Cárdenas A, Morillas R, Llop E, Villanueva C, et al. Esophageal balloon tamponade versus esophageal stent in controlling acute refractory variceal bleeding: A multicenter randomized, controlled trial. Hepatology. 2016;63(6):1957-67. PMID 26600191; doi:10.1002/hep.28360.", "link": "https://doi.org/10.1002/hep.28360", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Evans2003Hepatology", "text": "Evans LT, Kim WR, Poterucha JJ, Kamath PS. Spontaneous bacterial peritonitis in asymptomatic outpatients with cirrhotic ascites. Hepatology. 2003;37(4):897-901. PMID 12668984; doi:10.1053/jhep.2003.50119.", "link": "https://doi.org/10.1053/jhep.2003.50119", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ezaz2018", "text": "Ezaz G, Murphy SL, Mellinger J, Tapper EB. Increased Morbidity and Mortality Associated with Falls Among Patients with Cirrhosis. Am J Med. 2018;131(6):645-650.e2. PMID 29453941; doi:10.1016/j.amjmed.2018.01.026.", "link": "https://doi.org/10.1016/j.amjmed.2018.01.026", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Fabrellas2020LiverHope", "text": "Fabrellas N, Carol M, Palacio E, Aban M, Lanzillotti T, Nicolao G, et al. Nursing Care of Patients With Cirrhosis: The LiverHope Nursing Project. Hepatology. 2020;71(3):1106-1116. PMID 31944340; PMCID PMC7154704; doi:10.1002/hep.31117.", "link": "https://doi.org/10.1002/hep.31117", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Fattovich1997", "text": "Fattovich G, Giustina G, Degos F, Tremolada F, Diodati G, Almasio P, et al. Morbidity and mortality in compensated cirrhosis type C: a retrospective follow-up study of 384 patients. Gastroenterology. 1997;112(2):463-72. PMID 9024300; doi:10.1053/gast.1997.v112.pm9024300.", "link": "https://doi.org/10.1053/gast.1997.v112.pm9024300", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Fattovich2004HCC", "text": "Fattovich G, Stroffolini T, Zagni I, Donato F. Hepatocellular carcinoma in cirrhosis: incidence and risk factors. Gastroenterology. 2004;127(5 Suppl 1):S35-50. PMID 15508101; doi:10.1053/j.gastro.2004.09.014.", "link": "https://doi.org/10.1053/j.gastro.2004.09.014", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Fattovich2008", "text": "Fattovich G, Bortolotti F, Donato F. Natural history of chronic hepatitis B: special emphasis on disease progression and prognostic factors. J Hepatol. 2008;48(2):335-52. PMID 18096267; doi:10.1016/j.jhep.2007.11.011.", "link": "https://doi.org/10.1016/j.jhep.2007.11.011", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "FDA-Advil", "text": "Haleon US Holdings LLC. Advil (ibuprofen) tablets, OTC Drug Facts label. DailyMed set ID 1f01c10a-9434-91a4-2ee4-352315a6b610, effective 2026-07-29.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Aldactone", "text": "Pfizer. ALDACTONE (spironolactone) tablets prescribing information, NDA012151, effective 2025-11-28, set id 0fed2822-3a03-4b64-9857-c682fcd462bc.", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Baraclude", "text": "E.R. Squibb & Sons, L.L.C. BARACLUDE (entecavir). US prescribing information (NDA021797, NDA021798; first approved 2005-03-29). Label effective 2019-11-06; set id 046e61c9-9298-4b2e-b76e-b26b81fecd20.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Campral", "text": "Glenmark Pharmaceuticals Inc., USA. Acamprosate calcium delayed-release tablets (generic of Campral). US prescribing information. openFDA drug label set_id 43e9ef60-2d85-4394-906b-93042fea099a, effective 2026-01-23. Sections 2, 4, 5, 8 and 12.3 read for this pass.", "link": "", "areas": ["C"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Coreg", "text": "Waylis Therapeutics LLC. COREG (carvedilol) tablets, US prescribing information. DailyMed set id 07c619c6-4a0c-445e-94fa-664a54f68a39; label effective 2026-07-31.", "link": "", "areas": ["H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Enulose", "text": "Actavis Pharma, Inc. Enulose (lactulose) oral solution, US prescribing information. DailyMed set ID 00c42c5c-d19e-4130-aa08-a8bbd47d3e5b, version 8, effective 2022-06-01.", "link": "", "areas": ["G", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Epclusa", "text": "Gilead Sciences, Inc. EPCLUSA (sofosbuvir and velpatasvir) tablets and oral pellets. US prescribing information (NDA208341, NDA214187). Label effective 2024-06-05; set id 7f30631a-ee3b-4cfe-866b-964df3f0a44f.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Harvoni", "text": "Gilead Sciences. HARVONI (ledipasvir and sofosbuvir) tablets. Drugs@FDA application NDA 205834; original (ORIG) approval 2014-10-10. Checked via the openFDA drugsfda endpoint.", "link": "", "areas": ["A"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-HarvoniD", "text": "Gilead Sciences, Inc. HARVONI (ledipasvir and sofosbuvir). US prescribing information (NDA205834, NDA212477). Label effective 2024-12-26; set id f4ec77e4-bae8-4db0-b3d5-bde09c5fa075.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Hepcludex", "text": "Gilead Sciences, Inc. HEPCLUDEX (bulevirtide) for injection. US prescribing information (BLA761468; original approval 2026-05-22, accelerated approval, orphan, priority review). Label effective 2026-05-22; set id 12391cc2-38c2-4cf5-86d3-2be9370127fc.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Iqirvo", "text": "Ipsen Biopharmaceuticals, Inc. IQIRVO (elafibranor) tablets. US prescribing information (NDA218860; original approval 2024-06-10). Label effective 2026-08-11; set id d78aa14f-6ec1-4b1d-a4ae-e48658137a25.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Lasix", "text": "Validus Pharmaceuticals LLC. LASIX (furosemide) tablets, US prescribing information. DailyMed set id 2c9b4d8f-0770-482d-a9e6-9c616a440b1a; label effective 2025-09-30.", "link": "", "areas": ["H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Livdelzi", "text": "Gilead Sciences, Inc. LIVDELZI (seladelpar) capsules. US prescribing information (NDA217899; original approval 2024-08-14). Label effective 2026-02-03; set id 89f79d98-135c-40b2-a585-6996c04e599c.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Mavyret", "text": "AbbVie Inc. MAVYRET (glecaprevir and pibrentasvir) tablets and oral pellets. US prescribing information (NDA209394, NDA215110; tablets first approved 2017-08-03). Label effective 2025-06-25; set id 7bf99777-0401-9095-8645-16c6e907fcc0.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Naltrexone", "text": "SpecGx LLC. Naltrexone Hydrochloride Tablets, USP. US prescribing information (generic of ReVia). openFDA drug label set_id 06ff2d5a-e62b-4fa4-bbdb-01938535bc65, effective 2026-09-04. Contraindications, warnings (hepatotoxicity), dosage and clinical pharmacology read; no boxed warning present.", "link": "", "areas": ["C"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Ocaliva", "text": "Intercept Pharmaceuticals. OCALIVA (obeticholic acid). Drugs@FDA application NDA207999: original approval 2016-05-27; both products listed with marketing status \"Discontinued\" (openFDA Drugs@FDA, data updated 2026-11-02). No current label in the openFDA label endpoint.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Prograf", "text": "Astellas Pharma US, Inc. PROGRAF (tacrolimus) capsules, injection and granules, US prescribing information. DailyMed set ID 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b, version 30, effective 2023-08-25.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Rezdiffra", "text": "Madrigal Pharmaceuticals. REZDIFFRA (resmetirom) tablets prescribing information, NDA217785, effective 2026-07-29, set id e67ea09f-a840-439c-86c8-f98585f978b2.", "link": "", "areas": ["B", "C"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Samsca", "text": "Otsuka America Pharmaceutical. SAMSCA (tolvaptan) tablets prescribing information, NDA022275, effective 2026-05-07, set id 5526617c-c7b9-4556-886d-729bbabbc566.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Sovaldi", "text": "Gilead Sciences. SOVALDI (sofosbuvir) tablets. Drugs@FDA application NDA 204671; original (ORIG) approval 2013-12-06. Checked via the openFDA drugsfda endpoint.", "link": "", "areas": ["A"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Terlivaz", "text": "Mallinckrodt. TERLIVAZ (terlipressin) for injection prescribing information, effective 2026-06-19, set id 3a35b86c-f451-4fac-8499-43019e4da354. Boxed warning, indication, dosage and contraindications read from the openFDA label record.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Tylenol", "text": "Kenvue Brands LLC. TYLENOL Extra Strength (acetaminophen) caplets, OTC Drug Facts label. DailyMed set ID 015a6179-bacb-452d-b594-4de628ddc11d, version 11, effective 2024-11-07.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Urso", "text": "Allergan, Inc. URSO 250 and URSO Forte (ursodiol) tablets. US prescribing information. Label effective 2023-01-12.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Vemlidy", "text": "Gilead Sciences, Inc. VEMLIDY (tenofovir alafenamide). US prescribing information (NDA208464; first approved 2016-11-10). Label effective 2025-07-14; set id 72e6b33c-0351-4070-9172-eeaa186c01d2.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Viread", "text": "Gilead Sciences, Inc. VIREAD (tenofovir disoproxil fumarate). US prescribing information (NDA021356, NDA022577). Label effective 2025-02-18; set id 33fd6418-fbdc-42ca-a50d-ce2a476a5418.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Wegovy", "text": "Novo Nordisk. WEGOVY (semaglutide) injection and tablets. US prescribing information. openFDA drug label set_id ee06186f-2aa3-4990-a760-757579d8f77b, effective 2026-06-18. Section 1 read; Drugs@FDA NDA 215256 efficacy supplement 24 approved 2025-08-15.", "link": "", "areas": ["C"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Xifaxan", "text": "Cardinal Health 107, LLC (labeler of record in openFDA). XIFAXAN (rifaximin) tablets, US prescribing information. DailyMed set ID 7afafa63-3236-4212-9589-045db6b01c0b, version 14, effective 2025-08-27.", "link": "", "areas": ["G", "H"], "unverified": false, "validated": "openFDA"}, {"key": "Feld2015ASTRAL1", "text": "Feld JJ, Jacobson IM, Hézode C, Asselah T, Ruane PJ, Gruener N, et al. Sofosbuvir and Velpatasvir for HCV Genotype 1, 2, 4, 5, and 6 Infection. N Engl J Med. 2015;373(27):2599-607. PMID 26571066; doi:10.1056/NEJMoa1512610.", "link": "https://doi.org/10.1056/nejmoa1512610", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ferenci2003Leipzig", "text": "Ferenci P, Caca K, Loudianos G, Mieli-Vergani G, Tanner S, Sternlieb I, et al. Diagnosis and phenotypic classification of Wilson disease. Liver Int. 2003;23(3):139-42. PMID 12955875; doi:10.1034/j.1600-0676.2003.00824.x.", "link": "https://doi.org/10.1034/j.1600-0676.2003.00824.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Fernandez2007Gastro", "text": "Fernández J, Navasa M, Planas R, Montoliu S, Monfort D, Soriano G, et al. Primary prophylaxis of spontaneous bacterial peritonitis delays hepatorenal syndrome and improves survival in cirrhosis. Gastroenterology. 2007;133(3):818-24. PMID 17854593; doi:10.1053/j.gastro.2007.06.065.", "link": "https://doi.org/10.1053/j.gastro.2007.06.065", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Fernandez2012MDR", "text": "Fernández J, Acevedo J, Castro M, Garcia O, de Lope CR, Roca D, et al. Prevalence and risk factors of infections by multiresistant bacteria in cirrhosis: a prospective study. Hepatology. 2012;55(5):1551-61. PMID 22183941; doi:10.1002/hep.25532.", "link": "https://doi.org/10.1002/hep.25532", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Feu1995Lancet", "text": "Feu F, García-Pagán JC, Bosch J, Luca A, Terés J, Escorsell A, et al. Relation between portal pressure response to pharmacotherapy and risk of recurrent variceal haemorrhage in patients with cirrhosis. Lancet. 1995;346(8982):1056-9. PMID 7564785; doi:10.1016/s0140-6736(95)91740-3.", "link": "https://doi.org/10.1016/s0140-6736(95)91740-3", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Finn2020IMbrave150", "text": "Finn RS, Qin S, Ikeda M, Galle PR, Ducreux M, Kim TY, et al. Atezolizumab plus Bevacizumab in Unresectable Hepatocellular Carcinoma. N Engl J Med. 2020;382(20):1894-1905. PMID 32402160; doi:10.1056/NEJMoa1915745.", "link": "https://doi.org/10.1056/nejmoa1915745", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Fiorucci2026OCA", "text": "Fiorucci S. Obeticholic acid: discovery, clinical translation, and regulatory withdrawal. Eur Rev Med Pharmacol Sci. 2026;30(10):375-395. PMID 42961163; doi:10.26355/eurrev_202610_38014.", "link": "https://doi.org/10.26355/eurrev_202610_38014", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Fleming2008UKIncidence", "text": "Fleming KM, Aithal GP, Solaymani-Dodaran M, Card TR, West J. Incidence and prevalence of cirrhosis in the United Kingdom, 1992-2001: a general population-based study. J Hepatol. 2008;49(5):732-8. PMID 18667256; doi:10.1016/j.jhep.2008.05.023.", "link": "https://doi.org/10.1016/j.jhep.2008.05.023", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Fleming2012Mortality", "text": "Fleming KM, Aithal GP, Card TR, West J. All-cause mortality in people with cirrhosis compared with the general population: a population-based cohort study. Liver Int. 2012;32(1):79-84. PMID 21745279; doi:10.1111/j.1478-3231.2011.02517.x.", "link": "https://doi.org/10.1111/j.1478-3231.2011.02517.x", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Forns2017EXPEDITION1", "text": "Forns X, Lee SS, Valdes J, Lens S, Ghalib R, Aguilar H, et al. Glecaprevir plus pibrentasvir for chronic hepatitis C virus genotype 1, 2, 4, 5, or 6 infection in adults with compensated cirrhosis (EXPEDITION-1): a single-arm, open-label, multicentre phase 3 trial. Lancet Infect Dis. 2017;17(10):1062-1068. PMID 28818546; doi:10.1016/S1473-3099(17)30496-6.", "link": "https://doi.org/10.1016/s1473-3099(17)30496-6", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Fox1998", "text": "Fox IJ, Chowdhury JR, Kaufman SS, Goertzen TC, Chowdhury NR, Warkentin PI, et al. Treatment of the Crigler-Najjar syndrome type I with hepatocyte transplantation. N Engl J Med. 1998;338(20):1422-6. PMID 9580649; doi:10.1056/NEJM199805143382004.", "link": "https://doi.org/10.1056/nejm199805143382004", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Francque2021NATIVE", "text": "Francque SM, Bedossa P, Ratziu V, Anstee QM, Bugianesi E, Sanyal AJ, et al. A Randomized, Controlled Trial of the Pan-PPAR Agonist Lanifibranor in NASH. N Engl J Med. 2021;385(17):1547-1558. PMID 34670042; doi:10.1056/NEJMoa2036205.", "link": "https://doi.org/10.1056/nejmoa2036205", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Friedman2008PhysiolRev", "text": "Friedman SL. Hepatic stellate cells: protean, multifunctional, and enigmatic cells of the liver. Physiol Rev. 2008;88(1):125-72. PMID 18195085; PMCID PMC2888531; doi:10.1152/physrev.00013.2007.", "link": "https://doi.org/10.1152/physrev.00013.2007", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "FriedrichRust2008TE", "text": "Friedrich-Rust M, Ong MF, Martens S, Sarrazin C, Bojunga J, Zeuzem S, et al. Performance of transient elastography for the staging of liver fibrosis: a meta-analysis. Gastroenterology. 2008;134(4):960-74. PMID 18395077; doi:10.1053/j.gastro.2008.01.034.", "link": "https://doi.org/10.1053/j.gastro.2008.01.034", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Ganapathy2017", "text": "Ganapathy D, Acharya C, Lachar J, Patidar K, Sterling RK, White MB, et al. The patient buddy app can potentially prevent hepatic encephalopathy-related readmissions. Liver Int. 2017;37(12):1843-1851. PMID 28618192; doi:10.1111/liv.13494.", "link": "https://doi.org/10.1111/liv.13494", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "GarciaPagan2010NEJM", "text": "García-Pagán JC, Caca K, Bureau C, Laleman W, Appenrodt B, Luca A, et al. Early use of TIPS in patients with cirrhosis and variceal bleeding. N Engl J Med. 2010;362(25):2370-9. PMID 20573925; doi:10.1056/NEJMoa0910102.", "link": "https://doi.org/10.1056/nejmoa0910102", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "GarciaTsao1985Hepatology", "text": "Garcia-Tsao G, Groszmann RJ, Fisher RL, Conn HO, Atterbury CE, Glickman M. Portal pressure, presence of gastroesophageal varices and variceal bleeding. Hepatology. 1985;5(3):419-24. PMID 3873388; doi:10.1002/hep.1840050313.", "link": "https://doi.org/10.1002/hep.1840050313", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "GarciaTsao2008AKI", "text": "Garcia-Tsao G, Parikh CR, Viola A. Acute kidney injury in cirrhosis. Hepatology. 2008;48(6):2064-77. PMID 19003880; doi:10.1002/hep.22605.", "link": "https://doi.org/10.1002/hep.22605", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "GarciaTsao2010", "text": "Garcia-Tsao G, Friedman S, Iredale J, Pinzani M. Now there are many (stages) where before there was one: In search of a pathophysiological classification of cirrhosis. Hepatology. 2010;51(4):1445-9. PMID 20077563; PMCID PMC2882065; doi:10.1002/hep.23478.", "link": "https://doi.org/10.1002/hep.23478", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "GBD2020Cirrhosis", "text": "GBD 2017 Cirrhosis Collaborators. The global, regional, and national burden of cirrhosis by cause in 195 countries and territories, 1990-2017: a systematic analysis for the Global Burden of Disease Study 2017. Lancet Gastroenterol Hepatol. 2020;5(3):245-266. PMID 31981519; PMCID PMC7026710; doi:10.1016/S2468-1253(19)30349-8. Same work as the AUD companion's GBD2017Cirrhosis.", "link": "https://doi.org/10.1016/s2468-1253(19)30349-8", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Ghabril2017", "text": "Ghabril M, Jackson M, Gotur R, Weber R, Orman E, Vuppalanchi R, et al. Most Individuals With Advanced Cirrhosis Have Sleep Disturbances, Which Are Associated With Poor Quality of Life. Clin Gastroenterol Hepatol. 2017;15(8):1271-1278.e6. PMID 28167158; PMCID PMC5872836; doi:10.1016/j.cgh.2017.01.027.", "link": "https://doi.org/10.1016/j.cgh.2017.01.027", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Giannini2003ASTALT", "text": "Giannini E, Risso D, Botta F, Chiarbonello B, Fasoli A, Malfatti F, et al. Validity and clinical utility of the aspartate aminotransferase-alanine aminotransferase ratio in assessing disease severity and prognosis in patients with hepatitis C virus-related chronic liver disease. Arch Intern Med. 2003;163(2):218-24. PMID 12546613; doi:10.1001/archinte.163.2.218.", "link": "https://doi.org/10.1001/archinte.163.2.218", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Gines1987", "text": "Ginés P, Quintero E, Arroyo V, Terés J, Bruguera M, Rimola A, et al. Compensated cirrhosis: natural history and prognostic factors. Hepatology. 1987;7(1):122-8. PMID 3804191; doi:10.1002/hep.1840070124.", "link": "https://doi.org/10.1002/hep.1840070124", "areas": ["A", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Gines1988Gastro", "text": "Ginès P, Titó L, Arroyo V, Planas R, Panés J, Viver J, et al. Randomized comparative study of therapeutic paracentesis with and without intravenous albumin in cirrhosis. Gastroenterology. 1988;94(6):1493-502. PMID 3360270; doi:10.1016/0016-5085(88)90691-9.", "link": "https://doi.org/10.1016/0016-5085(88)90691-9", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Gines1990Norfloxacin", "text": "Ginés P, Rimola A, Planas R, Vargas V, Marco F, Almela M, et al. Norfloxacin prevents spontaneous bacterial peritonitis recurrence in cirrhosis: results of a double-blind, placebo-controlled trial. Hepatology. 1990;12(4 Pt 1):716-24. PMID 2210673; doi:10.1002/hep.1840120416.", "link": "https://doi.org/10.1002/hep.1840120416", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Gines1993HRS", "text": "Ginès A, Escorsell A, Ginès P, Saló J, Jiménez W, Inglada L, et al. Incidence, predictive factors, and prognosis of the hepatorenal syndrome in cirrhosis with ascites. Gastroenterology. 1993;105(1):229-36. PMID 8514039; doi:10.1016/0016-5085(93)90031-7.", "link": "https://doi.org/10.1016/0016-5085(93)90031-7", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Gines2018HRS", "text": "Ginès P, Solà E, Angeli P, Wong F, Nadim MK, Kamath PS. Hepatorenal syndrome. Nat Rev Dis Primers. 2018;4(1):23. PMID 30213943; doi:10.1038/s41572-018-0022-7.", "link": "https://doi.org/10.1038/s41572-018-0022-7", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Gines2021Lancet", "text": "Ginès P, Krag A, Abraldes JG, Solà E, Fabrellas N, Kamath PS. Liver cirrhosis. Lancet. 2021;398(10308):1359-1376. PMID 34543610; doi:10.1016/S0140-6736(21)01374-X.", "link": "https://doi.org/10.1016/s0140-6736(21)01374-x", "areas": ["A", "B", "D", "E", "F", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Gluud2016NAD", "text": "Gluud LL, Vilstrup H, Morgan MY. Nonabsorbable disaccharides for hepatic encephalopathy: A systematic review and meta-analysis. Hepatology. 2016;64(3):908-22. PMID 27081787; doi:10.1002/hep.28598.", "link": "https://doi.org/10.1002/hep.28598", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Goh2018LOLA", "text": "Goh ET, Stokes CS, Sidhu SS, Vilstrup H, Gluud LL, Morgan MY. L-ornithine L-aspartate for prevention and treatment of hepatic encephalopathy in people with cirrhosis. Cochrane Database Syst Rev. 2018;5(5):CD012410. PMID 29762873; PMCID PMC6494563; doi:10.1002/14651858.CD012410.pub2.", "link": "https://doi.org/10.1002/14651858.cd012410.pub2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Gonzalez2008AnnIntern", "text": "Gonzalez R, Zamora J, Gomez-Camarero J, Molinero LM, Bañares R, Albillos A. Meta-analysis: Combination endoscopic and drug therapy to prevent variceal rebleeding in cirrhosis. Ann Intern Med. 2008;149(2):109-22. PMID 18626050; doi:10.7326/0003-4819-149-2-200807150-00007.", "link": "https://doi.org/10.7326/0003-4819-149-2-200807150-00007", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Goyes2026", "text": "Goyes D, Rabiee A, Chong-Lugon N, Mezzacappa C, Kaplan DE, Taddei TH, et al. Recompensation After Etiologic Cure in United States Veterans With Hepatitis C Virus-Related Decompensated Cirrhosis. Clin Gastroenterol Hepatol. 2026 (online ahead of print). PMID 42637171; doi:10.1016/j.cgh.2026.08.010.", "link": "https://doi.org/10.1016/j.cgh.2026.08.010", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "GraciaSancho2019", "text": "Gracia-Sancho J, Marrone G, Fernández-Iglesias A. Hepatic microcirculation and mechanisms of portal hypertension. Nat Rev Gastroenterol Hepatol. 2019;16(4):221-234. PMID 30568278; doi:10.1038/s41575-018-0097-3.", "link": "https://doi.org/10.1038/s41575-018-0097-3", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Groszmann2005NEJM", "text": "Groszmann RJ, Garcia-Tsao G, Bosch J, Grace ND, Burroughs AK, Planas R, et al. Beta-blockers to prevent gastroesophageal varices in patients with cirrhosis. N Engl J Med. 2005;353(21):2254-61. PMID 16306522; doi:10.1056/NEJMoa044456.", "link": "https://doi.org/10.1056/nejmoa044456", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Gustot2015", "text": "Gustot T, Fernandez J, Garcia E, Morando F, Caraceni P, Alessandria C, et al. Clinical Course of acute-on-chronic liver failure syndrome and effects on prognosis. Hepatology. 2015;62(1):243-52. PMID 25877702; doi:10.1002/hep.27849.", "link": "https://doi.org/10.1002/hep.27849", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hagstrom2024", "text": "Hagström H, Vessby J, Ekstedt M, Shang Y. 99% of patients with NAFLD meet MASLD criteria and natural history is therefore identical. J Hepatol. 2024;80(2):e76-e77. PMID 37678723; doi:10.1016/j.jhep.2023.08.026. Letter; title and record only.", "link": "https://doi.org/10.1016/j.jhep.2023.08.026", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hahn2023AIH", "text": "Hahn JW, Yang HR, Moon JS, Chang JY, Lee K, Kim GA, et al. Global incidence and prevalence of autoimmune hepatitis, 1970-2022: a systematic review and meta-analysis. EClinicalMedicine. 2023;65:102280. PMID 37876996; PMCID PMC10590724; doi:10.1016/j.eclinm.2023.102280.", "link": "https://doi.org/10.1016/j.eclinm.2023.102280", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Halpern2017", "text": "Halpern KB, Shenhav R, Matcovitch-Natan O, Toth B, Lemze D, Golan M, et al. Single-cell spatial reconstruction reveals global division of labour in the mammalian liver. Nature. 2017;542(7641):352-356. PMID 28166538; PMCID PMC5321580; doi:10.1038/nature21065.", "link": "https://doi.org/10.1038/nature21065", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Harbin1980Caudate", "text": "Harbin WP, Robert NJ, Ferrucci JT Jr. Diagnosis of cirrhosis based on regional changes in hepatic morphology: a radiological and pathological analysis. Radiology. 1980;135(2):273-83. PMID 7367613; doi:10.1148/radiology.135.2.7367613.", "link": "https://doi.org/10.1148/radiology.135.2.7367613", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Harrison2023HARMONY", "text": "Harrison SA, Frias JP, Neff G, Abrams GA, Lucas KJ, Sanchez W, et al. Safety and efficacy of once-weekly efruxifermin versus placebo in non-alcoholic steatohepatitis (HARMONY): a multicentre, randomised, double-blind, placebo-controlled, phase 2b trial. Lancet Gastroenterol Hepatol. 2023;8(12):1080-1093. PMID 37802088; doi:10.1016/S2468-1253(23)00272-8.", "link": "https://doi.org/10.1016/s2468-1253(23)00272-8", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Harrison2024MAESTRO", "text": "Harrison SA, Bedossa P, Guy CD, Schattenberg JM, Loomba R, Taub R, et al. A Phase 3, Randomized, Controlled Trial of Resmetirom in NASH with Liver Fibrosis. N Engl J Med. 2024;390(6):497-509. PMID 38324483; doi:10.1056/NEJMoa2309000.", "link": "https://doi.org/10.1056/nejmoa2309000", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Haugen2020", "text": "Haugen CE, McAdams-DeMarco M, Holscher CM, Ying H, Gurakar AO, Garonzik-Wang J, et al. Multicenter Study of Age, Frailty, and Waitlist Mortality Among Liver Transplant Candidates. Ann Surg. 2020;271(6):1132-1136. PMID 30672803; PMCID PMC6639152; doi:10.1097/SLA.0000000000003207.", "link": "https://doi.org/10.1097/sla.0000000000003207", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Hayward2020", "text": "Hayward KL, Valery PC, Patel PJ, Horsfall LU, Wright PL, Tallis CJ, et al. Effectiveness of patient-oriented education and medication management intervention in people with decompensated cirrhosis. Intern Med J. 2020;50(9):1142-1146. PMID 32929822; PMCID PMC7540524; doi:10.1111/imj.14986.", "link": "https://doi.org/10.1111/imj.14986", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hernaez2022Depression", "text": "Hernaez R, Kramer JR, Khan A, Phillips J, McCallister K, Chaffin K, et al. Depression and Anxiety Are Common Among Patients With Cirrhosis. Clin Gastroenterol Hepatol. 2022;20(1):194-203.e1. PMID 32835845; PMCID PMC8210475; doi:10.1016/j.cgh.2020.08.045.", "link": "https://doi.org/10.1016/j.cgh.2020.08.045", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "HernandezGea2019Hepatology", "text": "Hernández-Gea V, Procopet B, Giráldez Á, Amitrano L, Villanueva C, Thabut D, et al. Preemptive-TIPS Improves Outcome in High-Risk Variceal Bleeding: An Observational Study. Hepatology. 2019;69(1):282-293. PMID 30014519; doi:10.1002/hep.30182.", "link": "https://doi.org/10.1002/hep.30182", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Higashi2017", "text": "Higashi T, Friedman SL, Hoshida Y. Hepatic stellate cells as key target in liver fibrosis. Adv Drug Deliv Rev. 2017;121:27-42. PMID 28506744; PMCID PMC5682243; doi:10.1016/j.addr.2017.05.007.", "link": "https://doi.org/10.1016/j.addr.2017.05.007", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hirode2020", "text": "Hirode G, Saab S, Wong RJ. Trends in the Burden of Chronic Liver Disease Among Hospitalized US Adults. JAMA Netw Open. 2020;3(4):e201997. PMID 32239220; PMCID PMC7118516; doi:10.1001/jamanetworkopen.2020.1997.", "link": "https://doi.org/10.1001/jamanetworkopen.2020.1997", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hirschfield2024RESPONSE", "text": "Hirschfield GM, Bowlus CL, Mayo MJ, Kremer AE, Vierling JM, Kowdley KV, et al. A Phase 3 Trial of Seladelpar in Primary Biliary Cholangitis. N Engl J Med. 2024;390(9):783-794. PMID 38381664; doi:10.1056/NEJMoa2312100.", "link": "https://doi.org/10.1056/nejmoa2312100", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hitawala2024Fontan", "text": "Hitawala AA, Gopalakrishna H, Mironova M, Livinski AA, Wright EC, Downing T, et al. Meta-analysis: Incidence of cirrhosis and hepatocellular carcinoma in patients with Fontan palliation. Aliment Pharmacol Ther. 2024;59(9):1020-1032. PMID 38497159; doi:10.1111/apt.17952.", "link": "https://doi.org/10.1111/apt.17952", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hofer2026JHep", "text": "Hofer BS, Tonon M, Buttler L, Camões Neves J, Herms Q, Pompili E, et al. Incidence and implications of abstinence-induced recompensation in alcohol-related cirrhosis. J Hepatol. 2026;84(6):1077-1088. PMID 41580090; doi:10.1016/j.jhep.2026.01.007.", "link": "https://doi.org/10.1016/j.jhep.2026.01.007", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Huang2023NRGH", "text": "Huang DQ, Terrault NA, Tacke F, Gluud LL, Arrese M, Bugianesi E, et al. Global epidemiology of cirrhosis - aetiology, trends and predictions. Nat Rev Gastroenterol Hepatol. 2023;20(6):388-398. PMID 36977794; PMCID PMC10043867; doi:10.1038/s41575-023-00759-2.", "link": "https://doi.org/10.1038/s41575-023-00759-2", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Huelin2017CGH", "text": "Huelin P, Piano S, Solà E, Stanco M, Solé C, Moreira R, et al. Validation of a Staging System for Acute Kidney Injury in Patients With Cirrhosis and Association With Acute-on-Chronic Liver Failure. Clin Gastroenterol Hepatol. 2017;15(3):438-445.e5. PMID 27720915; doi:10.1016/j.cgh.2016.09.156.", "link": "https://doi.org/10.1016/j.cgh.2016.09.156", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Hytiroglou2018", "text": "Hytiroglou P, Theise ND. Regression of human cirrhosis: an update, 18 years after the pioneering article by Wanless et al. Virchows Arch. 2018;473(1):15-22. PMID 29589101; doi:10.1007/s00428-018-2340-2.", "link": "https://doi.org/10.1007/s00428-018-2340-2", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Iloeje2006", "text": "Iloeje UH, Yang HI, Su J, Jen CL, You SL, Chen CJ. Predicting cirrhosis risk based on the level of circulating hepatitis B viral load. Gastroenterology. 2006;130(3):678-86. PMID 16530509; doi:10.1053/j.gastro.2005.11.016.", "link": "https://doi.org/10.1053/j.gastro.2005.11.016", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "InfanteRivard1987", "text": "Infante-Rivard C, Esnaola S, Villeneuve JP. Clinical and statistical validity of conventional prognostic factors in predicting short-term survival among cirrhotics. Hepatology. 1987;7(4):660-4. PMID 3610046; doi:10.1002/hep.1840070408.", "link": "https://doi.org/10.1002/hep.1840070408", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Ioannou2007HCC", "text": "Ioannou GN, Splan MF, Weiss NS, McDonald GB, Beretta L, Lee SP. Incidence and predictors of hepatocellular carcinoma in patients with cirrhosis. Clin Gastroenterol Hepatol. 2007;5(8):938-45, 945.e1-4. PMID 17509946; doi:10.1016/j.cgh.2007.02.039.", "link": "https://doi.org/10.1016/j.cgh.2007.02.039", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Iredale1998", "text": "Iredale JP, Benyon RC, Pickering J, McCullen M, Northrop M, Pawley S, et al. Mechanisms of spontaneous resolution of rat liver fibrosis. Hepatic stellate cell apoptosis and reduced hepatic expression of metalloproteinase inhibitors. J Clin Invest. 1998;102(3):538-49. PMID 9691091; PMCID PMC508915; doi:10.1172/JCI1018.", "link": "https://doi.org/10.1172/jci1018", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ishak1995", "text": "Ishak K, Baptista A, Bianchi L, Callea F, De Groote J, Gudat F, et al. Histological grading and staging of chronic hepatitis. J Hepatol. 1995;22(6):696-9. PMID 7560864; doi:10.1016/0168-8278(95)80226-6.", "link": "https://doi.org/10.1016/0168-8278(95)80226-6", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Issa2004", "text": "Issa R, Zhou X, Constandinou CM, Fallowfield J, Millward-Sadler H, Gaca MD, et al. Spontaneous recovery from micronodular cirrhosis: evidence for incomplete resolution associated with matrix cross-linking. Gastroenterology. 2004;126(7):1795-808. PMID 15188175; doi:10.1053/j.gastro.2004.03.009.", "link": "https://doi.org/10.1053/j.gastro.2004.03.009", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jagdish2023Tadalafil", "text": "Jagdish RK, Kamaal A, Shasthry SM, Benjamin J, Maiwall R, Jindal A, et al. Tadalafil improves erectile dysfunction and quality of life in men with cirrhosis: a randomized double blind placebo controlled trial. Hepatol Int. 2023;17(2):434-451. PMID 34775577; doi:10.1007/s12072-021-10264-w.", "link": "https://doi.org/10.1007/s12072-021-10264-w", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Jalan2014JHepatol", "text": "Jalan R, Fernandez J, Wiest R, Schnabl B, Moreau R, Angeli P, et al. Bacterial infections in cirrhosis: a position statement based on the EASL Special Conference 2013. J Hepatol. 2014;60(6):1310-24. PMID 24530646; doi:10.1016/j.jhep.2014.01.024.", "link": "https://doi.org/10.1016/j.jhep.2014.01.024", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Jang2021Suicide", "text": "Jang SY, Rou WS, Kim SH, Lee BS, Eun HS. Association between new-onset liver cirrhosis and suicide risk in South Korea: A nationwide cohort study. Clin Mol Hepatol. 2021;27(2):283-294. PMID 33317246; PMCID PMC8046630; doi:10.3350/cmh.2020.0227.", "link": "https://doi.org/10.3350/cmh.2020.0227", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Jeng2023Lancet", "text": "Jeng WJ, Papatheodoridis GV, Lok ASF. Hepatitis B. Lancet. 2023;401(10381):1039-1052. PMID 36774930; doi:10.1016/S0140-6736(22)01468-4.", "link": "https://doi.org/10.1016/s0140-6736(22)01468-4", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Jepsen2010", "text": "Jepsen P, Ott P, Andersen PK, Sørensen HT, Vilstrup H. Clinical course of alcoholic liver cirrhosis: a Danish population-based cohort study. Hepatology. 2010;51(5):1675-82. PMID 20186844; doi:10.1002/hep.23500.", "link": "https://doi.org/10.1002/hep.23500", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2014GALAD", "text": "Johnson PJ, Pirrie SJ, Cox TF, Berhane S, Teng M, Palmer D, et al. The detection of hepatocellular carcinoma using a prospectively developed and validated model based on serological biomarkers. Cancer Epidemiol Biomarkers Prev. 2014;23(1):144-53. PMID 24220911; doi:10.1158/1055-9965.EPI-13-0870.", "link": "https://doi.org/10.1158/1055-9965.epi-13-0870", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2015ALBI", "text": "Johnson PJ, Berhane S, Kagebayashi C, Satomura S, Teng M, Reeves HL, et al. Assessment of liver function in patients with hepatocellular carcinoma: a new evidence-based approach-the ALBI grade. J Clin Oncol. 2015;33(6):550-8. PMID 25512453; PMCID PMC4322258; doi:10.1200/JCO.2014.57.9151.", "link": "https://doi.org/10.1200/jco.2014.57.9151", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Jophlin2024ACG", "text": "Jophlin LL, Singal AK, Bataller R, Wong RJ, Sauer BG, Terrault NA, et al. ACG Clinical Guideline: Alcohol-Associated Liver Disease. Am J Gastroenterol. 2024;119(1):30-54. PMID 38174913; PMCID PMC11040545; doi:10.14309/ajg.0000000000002572.", "link": "https://doi.org/10.14309/ajg.0000000000002572", "areas": ["C", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Kalambokis2007TJLB", "text": "Kalambokis G, Manousou P, Vibhakorn S, Marelli L, Cholongitas E, Senzolo M, et al. Transjugular liver biopsy--indications, adequacy, quality of specimens, and complications--a systematic review. J Hepatol. 2007;47(2):284-94. PMID 17561303; doi:10.1016/j.jhep.2007.05.001.", "link": "https://doi.org/10.1016/j.jhep.2007.05.001", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kamath2001MELD", "text": "Kamath PS, Wiesner RH, Malinchoc M, Kremers W, Therneau TM, Kosberg CL, et al. A model to predict survival in patients with end-stage liver disease. Hepatology. 2001;33(2):464-70. PMID 11172350; doi:10.1053/jhep.2001.22172.", "link": "https://doi.org/10.1053/jhep.2001.22172", "areas": ["A", "E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Kamath2007MELD", "text": "Kamath PS, Kim WR. The model for end-stage liver disease (MELD). Hepatology. 2007;45(3):797-805. PMID 17326206; doi:10.1002/hep.21563.", "link": "https://doi.org/10.1002/hep.21563", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kaner2018Cochrane", "text": "Kaner EF, Beyer FR, Muirhead C, Campbell F, Pienaar ED, Bertholet N, et al. Effectiveness of brief alcohol interventions in primary care populations. Cochrane Database Syst Rev. 2018;2(2):CD004148. PMID 29476653; PMCID PMC6491186; doi:10.1002/14651858.CD004148.pub4.", "link": "https://doi.org/10.1002/14651858.cd004148.pub4", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kanwal2010QI", "text": "Kanwal F, Kramer J, Asch SM, El-Serag H, Spiegel BM, Edmundowicz S, et al. An explicit quality indicator set for measurement of quality of care in patients with cirrhosis. Clin Gastroenterol Hepatol. 2010;8(8):709-17. PMID 20385251; doi:10.1016/j.cgh.2010.03.028.", "link": "https://doi.org/10.1016/j.cgh.2010.03.028", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kanwal2017", "text": "Kanwal F, Kramer J, Asch SM, Chayanupatkul M, Cao Y, El-Serag HB. Risk of Hepatocellular Cancer in HCV Patients Treated With Direct-Acting Antiviral Agents. Gastroenterology. 2017;153(4):996-1005.e1. PMID 28642197; doi:10.1053/j.gastro.2017.06.012.", "link": "https://doi.org/10.1053/j.gastro.2017.06.012", "areas": ["D", "E"], "unverified": false, "validated": "PubMed", "aliases": ["Kanwal2017DAA"]}, {"key": "Kanwal2018NAFLD", "text": "Kanwal F, Kramer JR, Mapakshi S, Natarajan Y, Chayanupatkul M, Richardson PA, et al. Risk of Hepatocellular Cancer in Patients With Non-Alcoholic Fatty Liver Disease. Gastroenterology. 2018;155(6):1828-1837.e2. PMID 30144434; PMCID PMC6279617; doi:10.1053/j.gastro.2018.08.024.", "link": "https://doi.org/10.1053/j.gastro.2018.08.024", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kanwal2019QM", "text": "Kanwal F, Tapper EB, Ho C, Asrani SK, Ovchinsky N, Poterucha J, et al. Development of Quality Measures in Cirrhosis by the Practice Metrics Committee of the American Association for the Study of Liver Diseases. Hepatology. 2019;69(4):1787-1797. PMID 30586188; doi:10.1002/hep.30489.", "link": "https://doi.org/10.1002/hep.30489", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kaplan2021SACRED", "text": "Kaplan DE, Mehta R, Garcia-Tsao G, Albrecht J, Aytaman A, Baffy G, et al. SACRED: Effect of simvastatin on hepatic decompensation and death in subjects with high-risk compensated cirrhosis: Statins and Cirrhosis: Reducing Events of Decompensation. Contemp Clin Trials. 2021;104:106367. PMID 33771685; PMCID PMC8422958; doi:10.1016/j.cct.2021.106367.", "link": "https://doi.org/10.1016/j.cct.2021.106367", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kardashian2021", "text": "Kardashian A, Ge J, McCulloch CE, Kappus MR, Dunn MA, Duarte-Rojo A, et al. Identifying an Optimal Liver Frailty Index Cutoff to Predict Waitlist Mortality in Liver Transplant Candidates. Hepatology. 2021;73(3):1132-1139. PMID 32491208; PMCID PMC7710552; doi:10.1002/hep.31406.", "link": "https://doi.org/10.1002/hep.31406", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Karlsen2017", "text": "Karlsen TH, Folseraas T, Thorburn D, Vesterhus M. Primary sclerosing cholangitis - a comprehensive review. J Hepatol. 2017;67(6):1298-1323. PMID 28802875; doi:10.1016/j.jhep.2017.07.022.", "link": "https://doi.org/10.1016/j.jhep.2017.07.022", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kathpalia2016", "text": "Kathpalia P, Smith A, Lai JC. Underutilization of palliative care services in the liver transplant population. World J Transplant. 2016;6(3):594-8. PMID 27683638; PMCID PMC5036129; doi:10.5500/wjt.v6.i3.594.", "link": "https://doi.org/10.5500/wjt.v6.i3.594", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kietzmann2017", "text": "Kietzmann T. Metabolic zonation of the liver: The oxygen gradient revisited. Redox Biol. 2017;11:622-630. PMID 28126520; PMCID PMC5257182; doi:10.1016/j.redox.2017.01.012.", "link": "https://doi.org/10.1016/j.redox.2017.01.012", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kim2008MELDNa", "text": "Kim WR, Biggins SW, Kremers WK, Wiesner RH, Kamath PS, Benson JT, et al. Hyponatremia and mortality among patients on the liver-transplant waiting list. N Engl J Med. 2008;359(10):1018-26. PMID 18768945; PMCID PMC4374557; doi:10.1056/NEJMoa0801209.", "link": "https://doi.org/10.1056/nejmoa0801209", "areas": ["A", "E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Kim2012Laennec", "text": "Kim SU, Oh HJ, Wanless IR, Lee S, Han KH, Park YN. The Laennec staging system for histological sub-classification of cirrhosis is useful for stratification of prognosis in patients with liver cirrhosis. J Hepatol. 2012;57(3):556-63. PMID 22617153; doi:10.1016/j.jhep.2012.04.029.", "link": "https://doi.org/10.1016/j.jhep.2012.04.029", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kim2021AMRI", "text": "Kim DH, Choi SH, Shim JH, Kim SY, Lee SS, Byun JH, et al. Meta-Analysis of the Accuracy of Abbreviated Magnetic Resonance Imaging for Hepatocellular Carcinoma Surveillance: Non-Contrast versus Hepatobiliary Phase-Abbreviated Magnetic Resonance Imaging. Cancers (Basel). 2021;13(12):2975. PMID 34198589; PMCID PMC8231787; doi:10.3390/cancers13122975.", "link": "https://doi.org/10.3390/cancers13122975", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kim2021MELD3", "text": "Kim WR, Mannalithara A, Heimbach JK, Kamath PS, Asrani SK, Biggins SW, et al. MELD 3.0: The Model for End-Stage Liver Disease Updated for the Modern Era. Gastroenterology. 2021;161(6):1887-1895.e4. PMID 34481845; PMCID PMC8608337; doi:10.1053/j.gastro.2021.08.050.", "link": "https://doi.org/10.1053/j.gastro.2021.08.050", "areas": ["A", "E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Kimbell2018", "text": "Kimbell B, Murray SA, Byrne H, Baird A, Hayes PC, MacGilchrist A, et al. Palliative care for people with advanced liver disease: A feasibility trial of a supportive care liver nurse specialist. Palliat Med. 2018;32(5):919-929. PMID 29516776; PMCID PMC5946657; doi:10.1177/0269216318760441.", "link": "https://doi.org/10.1177/0269216318760441", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kimer2014", "text": "Kimer N, Krag A, Møller S, Bendtsen F, Gluud LL. Systematic review with meta-analysis: the effects of rifaximin in hepatic encephalopathy. Aliment Pharmacol Ther. 2014;40(2):123-32. PMID 24849268; doi:10.1111/apt.12803.", "link": "https://doi.org/10.1111/apt.12803", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kisseleva2012", "text": "Kisseleva T, Cong M, Paik Y, Scholten D, Jiang C, Benner C, et al. Myofibroblasts revert to an inactive phenotype during regression of liver fibrosis. Proc Natl Acad Sci U S A. 2012;109(24):9448-53. PMID 22566629; PMCID PMC3386114; doi:10.1073/pnas.1201840109.", "link": "https://doi.org/10.1073/pnas.1201840109", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kisseleva2021", "text": "Kisseleva T, Brenner D. Molecular and cellular mechanisms of liver fibrosis and its regression. Nat Rev Gastroenterol Hepatol. 2021;18(3):151-166. PMID 33128017; doi:10.1038/s41575-020-00372-7.", "link": "https://doi.org/10.1038/s41575-020-00372-7", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kleiner2005", "text": "Kleiner DE, Brunt EM, Van Natta M, Behling C, Contos MJ, Cummings OW, et al. Design and validation of a histological scoring system for nonalcoholic fatty liver disease. Hepatology. 2005;41(6):1313-21. PMID 15915461; doi:10.1002/hep.20701.", "link": "https://doi.org/10.1002/hep.20701", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Knox2018Liver", "text": "Knox J, Wall M, Witkiewitz K, Kranzler HR, Falk D, Litten R, et al. Reduction in Nonabstinent WHO Drinking Risk Levels and Change in Risk for Liver Disease and Positive AUDIT-C Scores: Prospective 3-Year Follow-Up Results in the U.S. General Population. Alcohol Clin Exp Res. 2018;42(11):2256-2265. PMID 30204248; PMCID PMC6263142; doi:10.1111/acer.13884.", "link": "https://doi.org/10.1111/acer.13884", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kobayashi2022ACIP", "text": "Kobayashi M, Farrar JL, Gierke R, Britton A, Childs L, Leidner AJ, et al. Use of 15-Valent Pneumococcal Conjugate Vaccine and 20-Valent Pneumococcal Conjugate Vaccine Among U.S. Adults: Updated Recommendations of the Advisory Committee on Immunization Practices - United States, 2022. MMWR Morb Mortal Wkly Rep. 2022;71(4):109-117. PMID 35085226; PMCID PMC9351524; doi:10.15585/mmwr.mm7104a1.", "link": "https://doi.org/10.15585/mmwr.mm7104a1", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kowdley2019ACG", "text": "Kowdley KV, Brown KE, Ahn J, Sundaram V. ACG Clinical Guideline: Hereditary Hemochromatosis. Am J Gastroenterol. 2019;114(8):1202-1218. PMID 31335359; doi:10.14309/ajg.0000000000000315.", "link": "https://doi.org/10.14309/ajg.0000000000000315", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kowdley2024ELATIVE", "text": "Kowdley KV, Bowlus CL, Levy C, Akarca US, Alvares-da-Silva MR, Andreone P, et al. Efficacy and Safety of Elafibranor in Primary Biliary Cholangitis. N Engl J Med. 2024;390(9):795-805. PMID 37962077; doi:10.1056/NEJMoa2306185.", "link": "https://doi.org/10.1056/nejmoa2306185", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kowdley2025COBALT", "text": "Kowdley KV, Hirschfield GM, Coombs C, Malecha ES, Bessonova L, Li J, et al. COBALT: A Confirmatory Trial of Obeticholic Acid in Primary Biliary Cholangitis With Placebo and External Controls. Am J Gastroenterol. 2025;120(2):390-400. PMID 39140490; PMCID PMC11774195; doi:10.14309/ajg.0000000000003029.", "link": "https://doi.org/10.14309/ajg.0000000000003029", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Krenkel2017", "text": "Krenkel O, Tacke F. Liver macrophages in tissue homeostasis and disease. Nat Rev Immunol. 2017;17(5):306-321. PMID 28317925; doi:10.1038/nri.2017.11.", "link": "https://doi.org/10.1038/nri.2017.11", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kudo2018REFLECT", "text": "Kudo M, Finn RS, Qin S, Han KH, Ikeda K, Piscaglia F, et al. Lenvatinib versus sorafenib in first-line treatment of patients with unresectable hepatocellular carcinoma: a randomised phase 3 non-inferiority trial. Lancet. 2018;391(10126):1163-1173. PMID 29433850; doi:10.1016/S0140-6736(18)30207-1.", "link": "https://doi.org/10.1016/s0140-6736(18)30207-1", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kwo2017ACG", "text": "Kwo PY, Cohen SM, Lim JK. ACG Clinical Guideline: Evaluation of Abnormal Liver Chemistries. Am J Gastroenterol. 2017;112(1):18-35. PMID 27995906; doi:10.1038/ajg.2016.517.", "link": "https://doi.org/10.1038/ajg.2016.517", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kwong2025OPTN", "text": "Kwong AJ, Kim WR, Lake JR, Schladt DP, Handarova D, Howell J, et al. OPTN/SRTR 2023 Annual Data Report: Liver. Am J Transplant. 2025;25(2S1):S193-S287. PMID 39947804; PMCID PMC12334193; doi:10.1016/j.ajt.2025.01.022.", "link": "https://doi.org/10.1016/j.ajt.2025.01.022", "areas": ["A", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Kwong2025SRTR"]}, {"key": "Kwong2026SRTR", "text": "Kwong AJ, Lake JR, Schladt DP, Martinez A, Weiss S, Handarova D, et al. OPTN/SRTR 2024 Annual Data Report: Liver. Am J Transplant. 2026;26(8S1):S214-S320. PMID 42276697; doi:10.1016/j.ajt.2026.05.721.", "link": "https://doi.org/10.1016/j.ajt.2026.05.721", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lackner2017JHep", "text": "Lackner C, Spindelboeck W, Haybaeck J, Douschan P, Rainer F, Terracciano L, et al. Histological parameters and alcohol abstinence determine long-term prognosis in patients with alcoholic liver disease. J Hepatol. 2017;66(3):610-618. PMID 27894795; doi:10.1016/j.jhep.2016.11.011.", "link": "https://doi.org/10.1016/j.jhep.2016.11.011", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Lai2017LFI", "text": "Lai JC, Covinsky KE, Dodge JL, Boscardin WJ, Segev DL, Roberts JP, et al. Development of a novel frailty index to predict mortality in patients with end-stage liver disease. Hepatology. 2017;66(2):564-574. PMID 28422306; PMCID PMC5519430; doi:10.1002/hep.29219.", "link": "https://doi.org/10.1002/hep.29219", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lai2020DeltaLFI", "text": "Lai JC, Dodge JL, Kappus MR, Dunn MA, Volk ML, Duarte-Rojo A, et al. Changes in frailty are associated with waitlist mortality in patients with cirrhosis. J Hepatol. 2020;73(3):575-581. PMID 32240717; PMCID PMC7438309; doi:10.1016/j.jhep.2020.03.029.", "link": "https://doi.org/10.1016/j.jhep.2020.03.029", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lai2021AASLD", "text": "Lai JC, Tandon P, Bernal W, Tapper EB, Ekong U, Dasarathy S, et al. Malnutrition, Frailty, and Sarcopenia in Patients With Cirrhosis: 2021 Practice Guidance by the American Association for the Study of Liver Diseases. Hepatology. 2021;74(3):1611-1644. PMID 34233031; PMCID PMC9134787; doi:10.1002/hep.32049.", "link": "https://doi.org/10.1002/hep.32049", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Laine1995AnnIntern", "text": "Laine L, Cook D. Endoscopic ligation compared with sclerotherapy for treatment of esophageal variceal bleeding. A meta-analysis. Ann Intern Med. 1995;123(4):280-7. PMID 7611595; doi:10.7326/0003-4819-123-4-199508150-00007.", "link": "https://doi.org/10.7326/0003-4819-123-4-199508150-00007", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Lammers2014", "text": "Lammers WJ, van Buuren HR, Hirschfield GM, Janssen HL, Invernizzi P, Mason AL, et al. Levels of alkaline phosphatase and bilirubin are surrogate end points of outcomes of patients with primary biliary cirrhosis: an international follow-up study. Gastroenterology. 2014;147(6):1338-49.e5; quiz e15. PMID 25160979; doi:10.1053/j.gastro.2014.08.029.", "link": "https://doi.org/10.1053/j.gastro.2014.08.029", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lassailly2020", "text": "Lassailly G, Caiazzo R, Ntandja-Wandji LC, Gnemmi V, Baud G, Verkindt H, et al. Bariatric Surgery Provides Long-term Resolution of Nonalcoholic Steatohepatitis and Regression of Fibrosis. Gastroenterology. 2020;159(4):1290-1301.e5. PMID 32553765; doi:10.1053/j.gastro.2020.06.006.", "link": "https://doi.org/10.1053/j.gastro.2020.06.006", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Lawitz2013", "text": "Lawitz E, Mangia A, Wyles D, Rodriguez-Torres M, Hassanein T, Gordon SC, et al. Sofosbuvir for previously untreated chronic hepatitis C infection. N Engl J Med. 2013;368(20):1878-87. PMID 23607594; doi:10.1056/NEJMoa1214853.", "link": "https://doi.org/10.1056/nejmoa1214853", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Lee2014BZD", "text": "Lee PC, Yang YY, Lin MW, Hou MC, Huang CS, Lee KC, et al. Benzodiazepine-associated hepatic encephalopathy significantly increased healthcare utilization and medical costs of Chinese cirrhotic patients: 7-year experience. Dig Dis Sci. 2014;59(7):1603-16. PMID 24482035; doi:10.1007/s10620-013-3021-2.", "link": "https://doi.org/10.1007/s10620-013-3021-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lee2015Gut", "text": "Lee YA, Wallace MC, Friedman SL. Pathobiology of liver fibrosis: a translational success story. Gut. 2015;64(5):830-41. PMID 25681399; PMCID PMC4477794; doi:10.1136/gutjnl-2014-306842.", "link": "https://doi.org/10.1136/gutjnl-2014-306842", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lee2018Gastro", "text": "Lee BP, Mehta N, Platt L, Gurakar A, Rice JP, Lucey MR, et al. Outcomes of Early Liver Transplantation for Patients With Severe Alcoholic Hepatitis. Gastroenterology. 2018;155(2):422-430.e1. PMID 29655837; PMCID PMC6460480; doi:10.1053/j.gastro.2018.04.009.", "link": "https://doi.org/10.1053/j.gastro.2018.04.009", "areas": ["C", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Levitt2016", "text": "Levitt DG, Levitt MD. Human serum albumin homeostasis: a new look at the roles of synthesis, catabolism, renal and gastrointestinal excretion, and the clinical value of serum albumin measurements. Int J Gen Med. 2016;9:229-55. PMID 27486341; PMCID PMC4956071; doi:10.2147/IJGM.S102819.", "link": "https://doi.org/10.2147/ijgm.s102819", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lewis2013", "text": "Lewis JH, Stine JG. Review article: prescribing medications in patients with cirrhosis - a practical guide. Aliment Pharmacol Ther. 2013;37(12):1132-56. PMID 23638982; doi:10.1111/apt.12324.", "link": "https://doi.org/10.1111/apt.12324", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Li2026Caregivers", "text": "Li L, Donlan J, Nurhussien L, Horick N, Zeng C, Indriolo T, et al. Prognostic communication, psychological distress, and caregiving burden among caregivers of patients with decompensated cirrhosis. Liver Transpl. 2026;32(1):27-34. PMID 40637541; doi:10.1097/LVT.0000000000000683.", "link": "https://doi.org/10.1097/lvt.0000000000000683", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Liaw2004NEJM", "text": "Liaw YF, Sung JJ, Chow WC, Farrell G, Lee CZ, Yuen H, et al. Lamivudine for patients with chronic hepatitis B and advanced liver disease. N Engl J Med. 2004;351(15):1521-31. PMID 15470215; doi:10.1056/NEJMoa033364.", "link": "https://doi.org/10.1056/nejmoa033364", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lin2011APRI", "text": "Lin ZH, Xin YN, Dong QJ, Wang Q, Jiang XJ, Zhan SH, et al. Performance of the aspartate aminotransferase-to-platelet ratio index for the staging of hepatitis C-related fibrosis: an updated meta-analysis. Hepatology. 2011;53(3):726-36. PMID 21319189; doi:10.1002/hep.24105.", "link": "https://doi.org/10.1002/hep.24105", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lin2021Nobel", "text": "Lin CY, Chien RN, Sheen IS. The 2020 Nobel Prize in medicine for the discovery of hepatitis C virus: An epic saga of the fight against a troublesome virus. Biomed J. 2021;44(5):567-569. PMID 34245922; PMCID PMC8640543; doi:10.1016/j.bj.2021.07.001.", "link": "https://doi.org/10.1016/j.bj.2021.07.001", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Livraghi2008RFA", "text": "Livraghi T, Meloni F, Di Stasi M, Rolle E, Solbiati L, Tinelli C, et al. Sustained complete response and complications rates after radiofrequency ablation of very early hepatocellular carcinoma in cirrhosis: Is resection still the treatment of choice?. Hepatology. 2008;47(1):82-9. PMID 18008357; doi:10.1002/hep.21933.", "link": "https://doi.org/10.1002/hep.21933", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "LlamosasFalcon2023", "text": "Llamosas-Falcón L, Tran A, Jiang H, Rehm J. Liver holidays? A meta-analysis of drinking the same amount of alcohol daily or non-daily and the risk for cirrhosis. Drug Alcohol Rev. 2023;42(1):119-124. PMID 36274528; PMCID PMC10749115; doi:10.1111/dar.13563.", "link": "https://doi.org/10.1111/dar.13563", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Llovet2002TACE", "text": "Llovet JM, Real MI, Montaña X, Planas R, Coll S, Aponte J, et al. Arterial embolisation or chemoembolisation versus symptomatic treatment in patients with unresectable hepatocellular carcinoma: a randomised controlled trial. Lancet. 2002;359(9319):1734-9. PMID 12049862; doi:10.1016/S0140-6736(02)08649-X.", "link": "https://doi.org/10.1016/s0140-6736(02)08649-x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Llovet2008SHARP", "text": "Llovet JM, Ricci S, Mazzaferro V, Hilgard P, Gane E, Blanc JF, et al. Sorafenib in advanced hepatocellular carcinoma. N Engl J Med. 2008;359(4):378-90. PMID 18650514; doi:10.1056/NEJMoa0708857.", "link": "https://doi.org/10.1056/nejmoa0708857", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Llovet2021NRDP", "text": "Llovet JM, Kelley RK, Villanueva A, Singal AG, Pikarsky E, Roayaie S, et al. Hepatocellular carcinoma. Nat Rev Dis Primers. 2021;7(1):6. PMID 33479224; PMCID PMC13537433; doi:10.1038/s41572-020-00240-3.", "link": "https://doi.org/10.1038/s41572-020-00240-3", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lok2009HALTC", "text": "Lok AS, Seeff LB, Morgan TR, di Bisceglie AM, Sterling RK, Curto TM, et al. Incidence of hepatocellular carcinoma and associated risk factors in hepatitis C-related advanced liver disease. Gastroenterology. 2009;136(1):138-48. PMID 18848939; PMCID PMC3749922; doi:10.1053/j.gastro.2008.09.014.", "link": "https://doi.org/10.1053/j.gastro.2008.09.014", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lok2016", "text": "Lok AS, McMahon BJ, Brown RS Jr, Wong JB, Ahmed AT, Farah W, et al. Antiviral therapy for chronic hepatitis B viral infection in adults: A systematic review and meta-analysis. Hepatology. 2016;63(1):284-306. PMID 26566246; doi:10.1002/hep.28280.", "link": "https://doi.org/10.1002/hep.28280", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Loomba2023ENLIVEN", "text": "Loomba R, Sanyal AJ, Kowdley KV, Bhatt DL, Alkhouri N, Frias JP, et al. Randomized, Controlled Trial of the FGF21 Analogue Pegozafermin in NASH. N Engl J Med. 2023;389(11):998-1008. PMID 37356033; PMCID PMC10718287; doi:10.1056/NEJMoa2304286.", "link": "https://doi.org/10.1056/nejmoa2304286", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Loomba2023SemaCirrhosis", "text": "Loomba R, Abdelmalek MF, Armstrong MJ, Jara M, Kjær MS, Krarup N, et al. Semaglutide 2·4 mg once weekly in patients with non-alcoholic steatohepatitis-related cirrhosis: a randomised, placebo-controlled phase 2 trial. Lancet Gastroenterol Hepatol. 2023;8(6):511-522. PMID 36934740; PMCID PMC10792518; doi:10.1016/S2468-1253(23)00068-7.", "link": "https://doi.org/10.1016/s2468-1253(23)00068-7", "areas": ["B", "C"], "unverified": false, "validated": "PubMed", "aliases": ["Loomba2023Cirrhosis"]}, {"key": "Loomba2024SYNERGY", "text": "Loomba R, Hartman ML, Lawitz EJ, Vuppalanchi R, Boursier J, Bugianesi E, et al. Tirzepatide for Metabolic Dysfunction-Associated Steatohepatitis with Liver Fibrosis. N Engl J Med. 2024;391(4):299-310. PMID 38856224; doi:10.1056/NEJMoa2401943.", "link": "https://doi.org/10.1056/nejmoa2401943", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Louvet2007Lille", "text": "Louvet A, Naveau S, Abdelnour M, Ramond MJ, Diaz E, Fartoux L, et al. The Lille model: a new tool for therapeutic strategy in patients with severe alcoholic hepatitis treated with steroids. Hepatology. 2007;45(6):1348-54. PMID 17518367; doi:10.1002/hep.21607.", "link": "https://doi.org/10.1002/hep.21607", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Louvet2018Gastro", "text": "Louvet A, Thursz MR, Kim DJ, Labreuche J, Atkinson SR, Sidhu SS, et al. Corticosteroids Reduce Risk of Death Within 28 Days for Patients With Severe Alcoholic Hepatitis, Compared With Pentoxifylline or Placebo-a Meta-analysis of Individual Data From Controlled Trials. Gastroenterology. 2018;155(2):458-468.e8. PMID 29738698; doi:10.1053/j.gastro.2018.05.011.", "link": "https://doi.org/10.1053/j.gastro.2018.05.011", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Louvet2022Lancet", "text": "Louvet A, Labreuche J, Moreno C, Vanlemmens C, Moirand R, Féray C, et al. Early liver transplantation for severe alcohol-related hepatitis not responding to medical treatment: a prospective controlled study. Lancet Gastroenterol Hepatol. 2022;7(5):416-425. PMID 35202597; doi:10.1016/S2468-1253(21)00430-1.", "link": "https://doi.org/10.1016/s2468-1253(21)00430-1", "areas": ["C", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Louvet2022"]}, {"key": "Lui2026Asterixis", "text": "Lui F, John S. Asterixis. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2026 (updated 2026 Sep 13). PMID 30571066.", "link": "https://pubmed.ncbi.nlm.nih.gov/30571066/", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lv2019LGH", "text": "Lv Y, Yang Z, Liu L, Li K, He C, Wang Z, et al. Early TIPS with covered stents versus standard treatment for acute variceal bleeding in patients with advanced cirrhosis: a randomised controlled trial. Lancet Gastroenterol Hepatol. 2019;4(8):587-598. PMID 31153882; doi:10.1016/S2468-1253(19)30090-1.", "link": "https://doi.org/10.1016/s2468-1253(19)30090-1", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Lv2024CHE", "text": "Lv XH, Lu Q, Deng K, Yang JL, Yang L. Prevalence and Characteristics of Covert/Minimal Hepatic Encephalopathy in Patients With Liver Cirrhosis: A Systematic Review and Meta-Analysis. Am J Gastroenterol. 2024;119(4):690-699. PMID 37856206; doi:10.14309/ajg.0000000000002563.", "link": "https://doi.org/10.14309/ajg.0000000000002563", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Maddrey1978", "text": "Maddrey WC, Boitnott JK, Bedine MS, Weber FL Jr, Mezey E, White RI Jr. Corticosteroid therapy of alcoholic hepatitis. Gastroenterology. 1978;75(2):193-9. PMID 352788.", "link": "https://pubmed.ncbi.nlm.nih.gov/352788/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Malinchoc2000", "text": "Malinchoc M, Kamath PS, Gordon FD, Peine CJ, Rank J, ter Borg PC. A model to predict poor survival in patients undergoing transjugular intrahepatic portosystemic shunts. Hepatology. 2000;31(4):864-71. PMID 10733541; doi:10.1053/he.2000.5852.", "link": "https://doi.org/10.1053/he.2000.5852", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Mallet2008", "text": "Mallet V, Gilgenkrantz H, Serpaggi J, Verkarre V, Vallet-Pichard A, Fontaine H, et al. Brief communication: the relationship of regression of cirrhosis to outcome in chronic hepatitis C. Ann Intern Med. 2008;149(6):399-403. PMID 18794559; doi:10.7326/0003-4819-149-6-200809160-00006.", "link": "https://doi.org/10.7326/0003-4819-149-6-200809160-00006", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Manns2017NRDP", "text": "Manns MP, Buti M, Gane E, Pawlotsky JM, Razavi H, Terrault N, et al. Hepatitis C virus infection. Nat Rev Dis Primers. 2017;3:17006. PMID 28252637; doi:10.1038/nrdp.2017.6.", "link": "https://doi.org/10.1038/nrdp.2017.6", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Marcellin2013", "text": "Marcellin P, Gane E, Buti M, Afdhal N, Sievert W, Jacobson IM, et al. Regression of cirrhosis during treatment with tenofovir disoproxil fumarate for chronic hepatitis B: a 5-year open-label follow-up study. Lancet. 2013;381(9865):468-75. PMID 23234725; doi:10.1016/S0140-6736(12)61425-1.", "link": "https://doi.org/10.1016/s0140-6736(12)61425-1", "areas": ["A", "B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Markmann2022OCS", "text": "Markmann JF, Abouljoud MS, Ghobrial RM, Bhati CS, Pelletier SJ, Lu AD, et al. Impact of Portable Normothermic Blood-Based Machine Perfusion on Outcomes of Liver Transplant: The OCS Liver PROTECT Randomized Clinical Trial. JAMA Surg. 2022;157(3):189-198. PMID 34985503; PMCID PMC8733869; doi:10.1001/jamasurg.2021.6781.", "link": "https://doi.org/10.1001/jamasurg.2021.6781", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "MartinLlahi2011Gastro", "text": "Martín-Llahí M, Guevara M, Torre A, Fagundes C, Restuccia T, Gilabert R, et al. Prognostic importance of the cause of renal failure in patients with cirrhosis. Gastroenterology. 2011;140(2):488-496.e4. PMID 20682324; doi:10.1053/j.gastro.2010.07.043.", "link": "https://doi.org/10.1053/j.gastro.2010.07.043", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Mathurin2011Gut", "text": "Mathurin P, O'Grady J, Carithers RL, Phillips M, Louvet A, Mendenhall CL, et al. Corticosteroids improve short-term survival in patients with severe alcoholic hepatitis: meta-analysis of individual patient data. Gut. 2011;60(2):255-60. PMID 20940288; doi:10.1136/gut.2010.224097.", "link": "https://doi.org/10.1136/gut.2010.224097", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Mathurin2011NEJM", "text": "Mathurin P, Moreno C, Samuel D, Dumortier J, Salleron J, Durand F, et al. Early liver transplantation for severe alcoholic hepatitis. N Engl J Med. 2011;365(19):1790-800. PMID 22070476; doi:10.1056/NEJMoa1105703.", "link": "https://doi.org/10.1056/nejmoa1105703", "areas": ["C", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Mazeaud2023", "text": "Mazeaud S, Zupo R, Couret A, Panza F, Sardone R, Castellana F. Prevalence of Sarcopenia in Liver Cirrhosis: A Systematic Review and Meta-Analysis. Clin Transl Gastroenterol. 2023;14(7):e00584. PMID 37011140; PMCID PMC10371322; doi:10.14309/ctg.0000000000000584.", "link": "https://doi.org/10.14309/ctg.0000000000000584", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Mazzaferro1996Milan", "text": "Mazzaferro V, Regalia E, Doci R, Andreola S, Pulvirenti A, Bozzetti F, et al. Liver transplantation for the treatment of small hepatocellular carcinomas in patients with cirrhosis. N Engl J Med. 1996;334(11):693-9. PMID 8594428; doi:10.1056/NEJM199603143341104.", "link": "https://doi.org/10.1056/nejm199603143341104", "areas": ["E", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Mazzaferro1996"]}, {"key": "Mazzaferro2009UpToSeven", "text": "Mazzaferro V, Llovet JM, Miceli R, Bhoori S, Schiavo M, Mariani L, et al. Predicting survival after liver transplantation in patients with hepatocellular carcinoma beyond the Milan criteria: a retrospective, exploratory analysis. Lancet Oncol. 2009;10(1):35-43. PMID 19058754; doi:10.1016/S1470-2045(08)70284-5.", "link": "https://doi.org/10.1016/s1470-2045(08)70284-5", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "McAlister2006", "text": "McAlister VC, Haddad E, Renouf E, Malthaner RA, Kjaer MS, Gluud LL. Cyclosporin versus tacrolimus as primary immunosuppressant after liver transplantation: a meta-analysis. Am J Transplant. 2006;6(7):1578-85. PMID 16827858; doi:10.1111/j.1600-6143.2006.01360.x.", "link": "https://doi.org/10.1111/j.1600-6143.2006.01360.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "McPherson2017Age", "text": "McPherson S, Hardy T, Dufour JF, Petta S, Romero-Gomez M, Allison M, et al. Age as a Confounding Factor for the Accurate Non-Invasive Diagnosis of Advanced NAFLD Fibrosis. Am J Gastroenterol. 2017;112(5):740-751. PMID 27725647; PMCID PMC5418560; doi:10.1038/ajg.2016.453.", "link": "https://doi.org/10.1038/ajg.2016.453", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "McQueen2011", "text": "McQueen J, Howe TE, Allan L, Mains D, Hardy V. Brief interventions for heavy alcohol users admitted to general hospital wards. Cochrane Database Syst Rev. 2011;2011(8):CD005191. PMID 21833953; PMCID PMC10600352; doi:10.1002/14651858.CD005191.pub3.", "link": "https://doi.org/10.1002/14651858.cd005191.pub3", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Mederacke2013", "text": "Mederacke I, Hsu CC, Troeger JS, Huebener P, Mu X, Dapito DH, et al. Fate tracing reveals hepatic stellate cells as dominant contributors to liver fibrosis independent of its aetiology. Nat Commun. 2013;4:2823. PMID 24264436; PMCID PMC4059406; doi:10.1038/ncomms3823.", "link": "https://doi.org/10.1038/ncomms3823", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Meirelles2015", "text": "Meirelles Júnior RF, Salvalaggio P, Rezende MB, Evangelista AS, Guardia BD, Matielo CE, et al. Liver transplantation: history, outcomes and perspectives. Einstein (Sao Paulo). 2015;13(1):149-52. PMID 25993082; PMCID PMC4977591; doi:10.1590/S1679-45082015RW3164.", "link": "https://doi.org/10.1590/s1679-45082015rw3164", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Merion2005", "text": "Merion RM, Schaubel DE, Dykstra DM, Freeman RB, Port FK, Wolfe RA. The survival benefit of liver transplantation. Am J Transplant. 2005;5(2):307-13. PMID 15643990; doi:10.1111/j.1600-6143.2004.00703.x.", "link": "https://doi.org/10.1111/j.1600-6143.2004.00703.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Merli2003JHepatol", "text": "Merli M, Nicolini G, Angeloni S, Rinaldi V, De Santis A, Merkel C, et al. Incidence and natural history of small esophageal varices in cirrhotic patients. J Hepatol. 2003;38(3):266-72. PMID 12586291; doi:10.1016/s0168-8278(02)00420-8.", "link": "https://doi.org/10.1016/s0168-8278(02)00420-8", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Mezzano2022Gut", "text": "Mezzano G, Juanola A, Cardenas A, Mezey E, Hamilton JP, Pose E, et al. Global burden of disease: acute-on-chronic liver failure, a systematic review and meta-analysis. Gut. 2022;71(1):148-155. PMID 33436495; doi:10.1136/gutjnl-2020-322161.", "link": "https://doi.org/10.1136/gutjnl-2020-322161", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Micallef2006", "text": "Micallef JM, Kaldor JM, Dore GJ. Spontaneous viral clearance following acute hepatitis C infection: a systematic review of longitudinal studies. J Viral Hepat. 2006;13(1):34-41. PMID 16364080; doi:10.1111/j.1365-2893.2005.00651.x.", "link": "https://doi.org/10.1111/j.1365-2893.2005.00651.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Michalopoulos2021", "text": "Michalopoulos GK, Bhushan B. Liver regeneration: biological and pathological mechanisms and implications. Nat Rev Gastroenterol Hepatol. 2021;18(1):40-55. PMID 32764740; doi:10.1038/s41575-020-0342-4.", "link": "https://doi.org/10.1038/s41575-020-0342-4", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "MieliVergani2018", "text": "Mieli-Vergani G, Vergani D, Czaja AJ, Manns MP, Krawitt EL, Vierling JM, et al. Autoimmune hepatitis. Nat Rev Dis Primers. 2018;4:18017. PMID 29644994; doi:10.1038/nrdp.2018.17.", "link": "https://doi.org/10.1038/nrdp.2018.17", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "MontanoLoza2012", "text": "Montano-Loza AJ, Meza-Junco J, Prado CM, Lieffers JR, Baracos VE, Bain VG, et al. Muscle wasting is associated with mortality in patients with cirrhosis. Clin Gastroenterol Hepatol. 2012;10(2):166-73, 173.e1. PMID 21893129; doi:10.1016/j.cgh.2011.08.028.", "link": "https://doi.org/10.1016/j.cgh.2011.08.028", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Moon2020CGH", "text": "Moon AM, Singal AG, Tapper EB. Contemporary Epidemiology of Chronic Liver Disease and Cirrhosis. Clin Gastroenterol Hepatol. 2020;18(12):2650-2666. PMID 31401364; PMCID PMC7007353; doi:10.1016/j.cgh.2019.07.060.", "link": "https://doi.org/10.1016/j.cgh.2019.07.060", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Moon2020Opioids", "text": "Moon AM, Jiang Y, Rogal SS, Tapper EB, Lieber SR, Barritt AS 4th. Opioid prescriptions are associated with hepatic encephalopathy in a national cohort of patients with compensated cirrhosis. Aliment Pharmacol Ther. 2020;51(6):652-660. PMID 31960985; PMCID PMC7047528; doi:10.1111/apt.15639.", "link": "https://doi.org/10.1111/apt.15639", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Moore2003Hepatology", "text": "Moore KP, Wong F, Gines P, Bernardi M, Ochs A, Salerno F, et al. The management of ascites in cirrhosis: report on the consensus conference of the International Ascites Club. Hepatology. 2003;38(1):258-66. PMID 12830009; doi:10.1053/jhep.2003.50315.", "link": "https://doi.org/10.1053/jhep.2003.50315", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "MoralesArraez2022", "text": "Morales-Arráez D, Ventura-Cots M, Altamirano J, Abraldes JG, Cruz-Lemini M, Thursz MR, et al. The MELD Score Is Superior to the Maddrey Discriminant Function Score to Predict Short-Term Mortality in Alcohol-Associated Hepatitis: A Global Study. Am J Gastroenterol. 2022;117(2):301-310. PMID 34962498; PMCID PMC8999152; doi:10.14309/ajg.0000000000001596.", "link": "https://doi.org/10.14309/ajg.0000000000001596", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Morando2013", "text": "Morando F, Maresio G, Piano S, Fasolato S, Cavallin M, Romano A, et al. How to improve care in outpatients with cirrhosis and ascites: a new model of care coordination by consultant hepatologists. J Hepatol. 2013;59(2):257-64. PMID 23523582; doi:10.1016/j.jhep.2013.03.010.", "link": "https://doi.org/10.1016/j.jhep.2013.03.010", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Moreau2013CANONIC", "text": "Moreau R, Jalan R, Gines P, Pavesi M, Angeli P, Cordoba J, et al. Acute-on-chronic liver failure is a distinct syndrome that develops in patients with acute decompensation of cirrhosis. Gastroenterology. 2013;144(7):1426-37, 1437.e1-9. PMID 23474284; doi:10.1053/j.gastro.2013.02.042.", "link": "https://doi.org/10.1053/j.gastro.2013.02.042", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Morrison2003", "text": "Morrison ED, Brandhagen DJ, Phatak PD, Barton JC, Krawitt EL, El-Serag HB, et al. Serum ferritin level predicts advanced hepatic fibrosis among U.S. patients with phenotypic hemochromatosis. Ann Intern Med. 2003;138(8):627-33. PMID 12693884; doi:10.7326/0003-4819-138-8-200304150-00008.", "link": "https://doi.org/10.7326/0003-4819-138-8-200304150-00008", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Mozes2022IPD", "text": "Mózes FE, Lee JA, Selvaraj EA, Jayaswal ANA, Trauner M, Boursier J, et al. Diagnostic accuracy of non-invasive tests for advanced fibrosis in patients with NAFLD: an individual patient data meta-analysis. Gut. 2022;71(5):1006-1019. PMID 34001645; PMCID PMC8995830; doi:10.1136/gutjnl-2021-324243.", "link": "https://doi.org/10.1136/gutjnl-2021-324243", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Mullen2014", "text": "Mullen KD, Sanyal AJ, Bass NM, Poordad FF, Sheikh MY, Frederick RT, et al. Rifaximin is safe and well tolerated for long-term maintenance of remission from overt hepatic encephalopathy. Clin Gastroenterol Hepatol. 2014;12(8):1390-7.e2. PMID 24365449; doi:10.1016/j.cgh.2013.12.021.", "link": "https://doi.org/10.1016/j.cgh.2013.12.021", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nasralla2018", "text": "Nasralla D, Coussios CC, Mergental H, Akhtar MZ, Butler AJ, Ceresa CDL, et al. A randomized trial of normothermic preservation in liver transplantation. Nature. 2018;557(7703):50-56. PMID 29670285; doi:10.1038/s41586-018-0047-9.", "link": "https://doi.org/10.1038/s41586-018-0047-9", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "NCT03540771", "text": "Introducing Palliative Care (PC) Within the Treatment of End Stage Liver Disease (ESLD): A Cluster Randomized Controlled Trial (PAL-LIVER). Sponsor: Albert Einstein Healthcare Network. ClinicalTrials.gov NCT03540771; completed 2025-08-30; enrollment 1494 (actual); results first posted 2025-10-27 (accessed 2026-11-04).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT03654053", "text": "VA Office of Research and Development. Effect of Simvastatin on Hepatic Decompensation and Death in Subjects With High-risk Compensated Cirrhosis (SACRED). ClinicalTrials.gov NCT03654053; active, not recruiting; n=142; primary completion 2026-12-31.", "link": "", "areas": ["B"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT03900429", "text": "Madrigal Pharmaceuticals, Inc. A Phase 3 Study to Evaluate the Efficacy and Safety of MGL-3196 (Resmetirom) in Patients With NASH and Fibrosis (MAESTRO-NASH). ClinicalTrials.gov NCT03900429 (active, not recruiting; 1,759 enrolled; record read 2026-11-04).", "link": "", "areas": ["C"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04822181", "text": "Novo Nordisk A/S. The Effect of Semaglutide in Subjects With Non-cirrhotic Non-alcoholic Steatohepatitis (ESSENCE). ClinicalTrials.gov NCT04822181; active, not recruiting; n=1205; part 2 primary outcome cirrhosis-free survival; primary completion 2029-04-25.", "link": "", "areas": ["B", "C"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04849728", "text": "Inventiva Pharma. A Randomised, Double-blind, Placebo-controlled, Multicentre, Phase 3 Study Evaluating Efficacy and Safety of Lanifibranor Followed by an Active Treatment Extension in Adult Patients With Non-cirrhotic NASH and Fibrosis Stages F2 and F3 (NATiV3). ClinicalTrials.gov NCT04849728; active, not recruiting; n=1000; primary completion 2026-09-29.", "link": "", "areas": ["B"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05500222", "text": "Madrigal Pharmaceuticals. A Randomized Double-blind Placebo-controlled Phase 3 Study to Evaluate the Effect of Resmetirom on Liver-related Outcomes in Patients With Well-compensated (Child-Pugh A) NASH Cirrhosis (MAESTRO-NASH-OUTCOMES). ClinicalTrials.gov NCT05500222; active, not recruiting; n=845; primary completion 2026-12.", "link": "", "areas": ["B", "C"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05832229", "text": "National Institute of Diabetes and Digestive and Kidney Diseases. Liver Cirrhosis Network Rosuvastatin Efficacy and Safety for Cirrhosis in the United States (LCN RESCU): a phase 2 study. ClinicalTrials.gov NCT05832229; recruiting; n=260; primary completion 2029-08-31.", "link": "", "areas": ["B"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06419374", "text": "Hoffmann-La Roche. A Phase 3 Study to Evaluate the Efficacy and Safety of Pegozafermin in Subjects With Compensated Cirrhosis Due to MASH (ENLIGHTEN-Cirrhosis). ClinicalTrials.gov NCT06419374; recruiting; n=1800; primary completion 2028-06-30.", "link": "", "areas": ["B"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06528314", "text": "Akero Therapeutics. A Phase 3, Randomized, Double-Blind, Placebo-Controlled Study Evaluating the Safety and Efficacy of Efruxifermin in Subjects With Compensated Cirrhosis Due to NASH/MASH. ClinicalTrials.gov NCT06528314; recruiting; n=2150; primary completion 2030-02.", "link": "", "areas": ["B"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06632457", "text": "Boehringer Ingelheim. A Phase III Double-blind, Randomised, Placebo-controlled Trial to Evaluate Liver-related Clinical Outcomes and Safety of Once Weekly Injected Survodutide in Participants With Compensated NASH/MASH Cirrhosis (LIVERAGE-Cirrhosis). ClinicalTrials.gov NCT06632457; recruiting; n=1590; primary completion 2029-06-05.", "link": "", "areas": ["B"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "Nelson2020ACIP", "text": "Nelson NP, Weng MK, Hofmeister MG, Moore KL, Doshani M, Kamili S, et al. Prevention of Hepatitis A Virus Infection in the United States: Recommendations of the Advisory Committee on Immunization Practices, 2020. MMWR Recomm Rep. 2020;69(5):1-38. PMID 32614811; PMCID PMC8631741; doi:10.15585/mmwr.rr6905a1.", "link": "https://doi.org/10.15585/mmwr.rr6905a1", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nevens2016POISE", "text": "Nevens F, Andreone P, Mazzella G, Strasser SI, Bowlus C, Invernizzi P, et al. A Placebo-Controlled Trial of Obeticholic Acid in Primary Biliary Cholangitis. N Engl J Med. 2016;375(7):631-43. PMID 27532829; doi:10.1056/NEJMoa1509840.", "link": "https://doi.org/10.1056/nejmoa1509840", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Newsome2018REALISTIC", "text": "Newsome PN, Fox R, King AL, Barton D, Than NN, Moore J, et al. Granulocyte colony-stimulating factor and autologous CD133-positive stem-cell therapy in liver cirrhosis (REALISTIC): an open-label, randomised, controlled phase 2 trial. Lancet Gastroenterol Hepatol. 2018;3(1):25-36. PMID 29127060; PMCID PMC5738975; doi:10.1016/S2468-1253(17)30326-6.", "link": "https://doi.org/10.1016/s2468-1253(17)30326-6", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Newsome2021Sema", "text": "Newsome PN, Buchholtz K, Cusi K, Linder M, Okanoue T, Ratziu V, et al. A Placebo-Controlled Trial of Subcutaneous Semaglutide in Nonalcoholic Steatohepatitis. N Engl J Med. 2021;384(12):1113-1124. PMID 33185364; doi:10.1056/NEJMoa2028395.", "link": "https://doi.org/10.1056/nejmoa2028395", "areas": ["B", "C"], "unverified": false, "validated": "PubMed", "aliases": ["Newsome2021NEJM"]}, {"key": "Nguyen2020", "text": "Nguyen MP, Jain V, Iansante V, Mitry RR, Filippi C, Dhawan A. Clinical application of hepatocyte transplantation: current status, applicability, limitations, and future outlook. Expert Rev Gastroenterol Hepatol. 2020;14(3):185-196. PMID 32098516; doi:10.1080/17474124.2020.1733975.", "link": "https://doi.org/10.1080/17474124.2020.1733975", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "NicoaraFarcau2021Gastro", "text": "Nicoară-Farcău O, Han G, Rudler M, Angrisani D, Monescillo A, Torres F, et al. Effects of Early Placement of Transjugular Portosystemic Shunts in Patients With High-Risk Acute Variceal Bleeding: a Meta-analysis of Individual Patient Data. Gastroenterology. 2021;160(1):193-205.e10. PMID 32980344; doi:10.1053/j.gastro.2020.09.026.", "link": "https://doi.org/10.1053/j.gastro.2020.09.026", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "NIEC1988NEJM", "text": "North Italian Endoscopic Club for the Study and Treatment of Esophageal Varices. Prediction of the first variceal hemorrhage in patients with cirrhosis of the liver and esophageal varices. A prospective multicenter study. N Engl J Med. 1988;319(15):983-9. PMID 3262200; doi:10.1056/NEJM198810133191505.", "link": "https://doi.org/10.1056/nejm198810133191505", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "NIH1984LT", "text": "National Institutes of Health Consensus Development Conference Statement: liver transplantation--June 20-23, 1983. Hepatology. 1984;4(1 Suppl):107S-110S. PMID 6363254.", "link": "https://pubmed.ncbi.nlm.nih.gov/6363254/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Noureddin2025SYMMETRY", "text": "Noureddin M, Rinella ME, Chalasani NP, Neff GW, Lucas KJ, Rodriguez ME, et al. Efruxifermin in Compensated Liver Cirrhosis Caused by MASH. N Engl J Med. 2025;392(24):2413-2424. PMID 40341827; doi:10.1056/NEJMoa2502242.", "link": "https://doi.org/10.1056/nejmoa2502242", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Oeda2018", "text": "Oeda S, Takahashi H, Yoshida H, Ogawa Y, Imajo K, Yoneda M, et al. Prevalence of pruritus in patients with chronic liver disease: A multicenter study. Hepatol Res. 2018;48(3):E252-E262. PMID 28877392; doi:10.1111/hepr.12978.", "link": "https://doi.org/10.1111/hepr.12978", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Olthoff2011", "text": "Olthoff KM, Abecassis MM, Emond JC, Kam I, Merion RM, Gillespie BW, et al. Outcomes of adult living donor liver transplantation: comparison of the Adult-to-adult Living Donor Liver Transplantation Cohort Study and the national experience. Liver Transpl. 2011;17(7):789-97. PMID 21360649; PMCID PMC3116058; doi:10.1002/lt.22288.", "link": "https://doi.org/10.1002/lt.22288", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Orman2014CGH", "text": "Orman ES, Hayashi PH, Bataller R, Barritt AS 4th. Paracentesis is associated with reduced mortality in patients hospitalized with cirrhosis and ascites. Clin Gastroenterol Hepatol. 2014;12(3):496-503.e1. PMID 23978348; PMCID PMC3944409; doi:10.1016/j.cgh.2013.08.025.", "link": "https://doi.org/10.1016/j.cgh.2013.08.025", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Orman2026Caregiver", "text": "Orman ES, Johnson AW, Rockey DC, Serper M, Navarro V, Shaw LK, et al. Caregiver Involvement and Burden and Patient Quality of Life in Patients With Decompensated Cirrhosis. Am J Gastroenterol. 2026. PMID 42262375; doi:10.14309/ajg.0000000000004076.", "link": "https://doi.org/10.14309/ajg.0000000000004076", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pache2005", "text": "Pache I, Bilodeau M. Severe haemorrhage following abdominal paracentesis for ascites in patients with liver disease. Aliment Pharmacol Ther. 2005;21(5):525-9. PMID 15740535; doi:10.1111/j.1365-2036.2005.02387.x.", "link": "https://doi.org/10.1111/j.1365-2036.2005.02387.x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pan2016NEJM", "text": "Pan CQ, Duan Z, Dai E, Zhang S, Han G, Wang Y, et al. Tenofovir to Prevent Hepatitis B Transmission in Mothers with High Viral Load. N Engl J Med. 2016;374(24):2324-34. PMID 27305192; doi:10.1056/NEJMoa1508660.", "link": "https://doi.org/10.1056/nejmoa1508660", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Papatheodoridis2016PAGEB", "text": "Papatheodoridis G, Dalekos G, Sypsa V, Yurdaydin C, Buti M, Goulis J, et al. PAGE-B predicts the risk of developing hepatocellular carcinoma in Caucasians with chronic hepatitis B on 5-year antiviral therapy. J Hepatol. 2016;64(4):800-6. PMID 26678008; doi:10.1016/j.jhep.2015.11.035.", "link": "https://doi.org/10.1016/j.jhep.2015.11.035", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Pares1986", "text": "Parés A, Caballería J, Bruguera M, Torres M, Rodés J. Histological course of alcoholic hepatitis. Influence of abstinence, sex and extent of hepatic damage. J Hepatol. 1986;2(1):33-42. PMID 3950362; doi:10.1016/s0168-8278(86)80006-x.", "link": "https://doi.org/10.1016/s0168-8278(86)80006-x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Patel2017CGH", "text": "Patel AA, Walling AM, Ricks-Oddie J, May FP, Saab S, Wenger N. Palliative Care and Health Care Utilization for Patients With End-Stage Liver Disease at the End of Life. Clin Gastroenterol Hepatol. 2017;15(10):1612-1619.e4. PMID 28179192; PMCID PMC5544588; doi:10.1016/j.cgh.2017.01.030.", "link": "https://doi.org/10.1016/j.cgh.2017.01.030", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Patel2021ACP", "text": "Patel AA, Ryan GW, Tisnado D, Chuang E, Walling AM, Saab S, et al. Deficits in Advance Care Planning for Patients With Decompensated Cirrhosis at Liver Transplant Centers. JAMA Intern Med. 2021;181(5):652-660. PMID 33720273; PMCID PMC7961470; doi:10.1001/jamainternmed.2021.0152.", "link": "https://doi.org/10.1001/jamainternmed.2021.0152", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Patel2026GCD", "text": "Patel AA, O'Leary JG, Bajaj JS, Prause N, Hannum R, Noll A, et al. Increasing Goals of Care Discussions Among Veterans With Cirrhosis: A Veterans Health Administration Quality Improvement Initiative. Am J Gastroenterol. 2026;121(8):1875-1884. PMID 41020658; doi:10.14309/ajg.0000000000003781.", "link": "https://doi.org/10.14309/ajg.0000000000003781", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Patidar2014", "text": "Patidar KR, Thacker LR, Wade JB, Sterling RK, Sanyal AJ, Siddiqui MS, et al. Covert hepatic encephalopathy is independently associated with poor survival and increased risk of hospitalization. Am J Gastroenterol. 2014;109(11):1757-63. PMID 25178701; PMCID PMC4321782; doi:10.1038/ajg.2014.264.", "link": "https://doi.org/10.1038/ajg.2014.264", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Pavlov2016ALD", "text": "Pavlov CS, Casazza G, Nikolova D, Tsochatzis E, Gluud C. Systematic review with meta-analysis: diagnostic accuracy of transient elastography for staging of fibrosis in people with alcoholic liver disease. Aliment Pharmacol Ther. 2016;43(5):575-85. PMID 26791825; doi:10.1111/apt.13524.", "link": "https://doi.org/10.1111/apt.13524", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Peng2016ChildMELD", "text": "Peng Y, Qi X, Guo X. Child-Pugh Versus MELD Score for the Assessment of Prognosis in Liver Cirrhosis: A Systematic Review and Meta-Analysis of Observational Studies. Medicine (Baltimore). 2016;95(8):e2877. PMID 26937922; PMCID PMC4779019; doi:10.1097/MD.0000000000002877.", "link": "https://doi.org/10.1097/md.0000000000002877", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Peng2019", "text": "Peng JK, Hepgul N, Higginson IJ, Gao W. Symptom prevalence and quality of life of patients with end-stage liver disease: A systematic review and meta-analysis. Palliat Med. 2019;33(1):24-36. PMID 30345878; PMCID PMC6291907; doi:10.1177/0269216318807051.", "link": "https://doi.org/10.1177/0269216318807051", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Piccinino1986", "text": "Piccinino F, Sagnelli E, Pasquale G, Giusti G. Complications following percutaneous liver biopsy. A multicentre retrospective study on 68,276 biopsies. J Hepatol. 1986;2(2):165-73. PMID 3958472; doi:10.1016/s0168-8278(86)80075-7.", "link": "https://doi.org/10.1016/s0168-8278(86)80075-7", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Pilling2019BMJ", "text": "Pilling LC, Tamosauskaite J, Jones G, Wood AR, Jones L, Kuo CL, et al. Common conditions associated with hereditary haemochromatosis genetic variants: cohort study in UK Biobank. BMJ. 2019;364:k5222. PMID 30651232; PMCID PMC6334179; doi:10.1136/bmj.k5222.", "link": "https://doi.org/10.1136/bmj.k5222", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Planas2004", "text": "Planas R, Ballesté B, Alvarez MA, Rivera M, Montoliu S, Galeras JA, et al. Natural history of decompensated hepatitis C virus-related cirrhosis. A study of 200 patients. J Hepatol. 2004;40(5):823-30. PMID 15094231; doi:10.1016/j.jhep.2004.01.005.", "link": "https://doi.org/10.1016/j.jhep.2004.01.005", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Planas2006CGH", "text": "Planas R, Montoliu S, Ballesté B, Rivera M, Miquel M, Masnou H, et al. Natural history of patients hospitalized for management of cirrhotic ascites. Clin Gastroenterol Hepatol. 2006;4(11):1385-94. PMID 17081806; doi:10.1016/j.cgh.2006.08.007.", "link": "https://doi.org/10.1016/j.cgh.2006.08.007", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Plank2008", "text": "Plank LD, Gane EJ, Peng S, Muthu C, Mathur S, Gillanders L, et al. Nocturnal nutritional supplementation improves total body protein status of patients with liver cirrhosis: a randomized 12-month trial. Hepatology. 2008;48(2):557-66. PMID 18627001; doi:10.1002/hep.22367.", "link": "https://doi.org/10.1002/hep.22367", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Poisson2017", "text": "Poisson J, Lemoinne S, Boulanger C, Durand F, Moreau R, Valla D, et al. Liver sinusoidal endothelial cells: Physiology and role in liver diseases. J Hepatol. 2017;66(1):212-227. PMID 27423426; doi:10.1016/j.jhep.2016.07.009.", "link": "https://doi.org/10.1016/j.jhep.2016.07.009", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Polaris2022HCV", "text": "Polaris Observatory HCV Collaborators. Global change in hepatitis C virus prevalence and cascade of care between 2015 and 2020: a modelling study. Lancet Gastroenterol Hepatol. 2022;7(5):396-415. PMID 35180382; doi:10.1016/S2468-1253(21)00472-6.", "link": "https://doi.org/10.1016/s2468-1253(21)00472-6", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Polaris2023HBV", "text": "Polaris Observatory Collaborators. Global prevalence, cascade of care, and prophylaxis coverage of hepatitis B in 2022: a modelling study. Lancet Gastroenterol Hepatol. 2023;8(10):879-907. PMID 37517414; doi:10.1016/S2468-1253(23)00197-8.", "link": "https://doi.org/10.1016/s2468-1253(23)00197-8", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Polaris2024HDV", "text": "Polaris Observatory Collaborators. Adjusted estimate of the prevalence of hepatitis delta virus in 25 countries and territories. J Hepatol. 2024;80(2):232-242. PMID 38030035; doi:10.1016/j.jhep.2023.10.043.", "link": "https://doi.org/10.1016/j.jhep.2023.10.043", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Poonja2014", "text": "Poonja Z, Brisebois A, van Zanten SV, Tandon P, Meeberg G, Karvellas CJ. Patients with cirrhosis and denied liver transplants rarely receive adequate palliative care or appropriate management. Clin Gastroenterol Hepatol. 2014;12(4):692-8. PMID 23978345; doi:10.1016/j.cgh.2013.08.027.", "link": "https://doi.org/10.1016/j.cgh.2013.08.027", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pose2020LIVERHOPESafety", "text": "Pose E, Napoleone L, Amin A, Campion D, Jimenez C, Piano S, et al. Safety of two different doses of simvastatin plus rifaximin in decompensated cirrhosis (LIVERHOPE-SAFETY): a randomised, double-blind, placebo-controlled, phase 2 trial. Lancet Gastroenterol Hepatol. 2020;5(1):31-41. PMID 31607677; doi:10.1016/S2468-1253(19)30320-6.", "link": "https://doi.org/10.1016/s2468-1253(19)30320-6", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Pose2025LIVERHOPE", "text": "Pose E, Jiménez C, Zaccherini G, Campion D, Piano S, Uschner FE, et al. Simvastatin and Rifaximin in Decompensated Cirrhosis: A Randomized Clinical Trial. JAMA. 2025;333(10):864-874. PMID 39908052; PMCID PMC11800124; doi:10.1001/jama.2024.27441.", "link": "https://doi.org/10.1001/jama.2024.27441", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Poupon1991", "text": "Poupon RE, Balkau B, Eschwège E, Poupon R. A multicenter, controlled trial of ursodiol for the treatment of primary biliary cirrhosis. UDCA-PBC Study Group. N Engl J Med. 1991;324(22):1548-54. PMID 1674105; doi:10.1056/NEJM199105303242204.", "link": "https://doi.org/10.1056/nejm199105303242204", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Poynard1997", "text": "Poynard T, Bedossa P, Opolon P. Natural history of liver fibrosis progression in patients with chronic hepatitis C. The OBSVIRC, METAVIR, CLINIVIR, and DOSVIRC groups. Lancet. 1997;349(9055):825-32. PMID 9121257; doi:10.1016/s0140-6736(96)07642-8.", "link": "https://doi.org/10.1016/s0140-6736(96)07642-8", "areas": ["B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Pugh1973", "text": "Pugh RN, Murray-Lyon IM, Dawson JL, Pietroni MC, Williams R. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973;60(8):646-9. PMID 4541913; doi:10.1002/bjs.1800600817.", "link": "https://doi.org/10.1002/bjs.1800600817", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Rahimi2014HELP", "text": "Rahimi RS, Singal AG, Cuthbert JA, Rockey DC. Lactulose vs polyethylene glycol 3350--electrolyte solution for treatment of overt hepatic encephalopathy: the HELP randomized clinical trial. JAMA Intern Med. 2014;174(11):1727-33. PMID 25243839; PMCID PMC5609454; doi:10.1001/jamainternmed.2014.4746.", "link": "https://doi.org/10.1001/jamainternmed.2014.4746", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Ramachandran2019", "text": "Ramachandran P, Dobie R, Wilson-Kanamori JR, Dora EF, Henderson BEP, Luu NT, et al. Resolving the fibrotic niche of human liver cirrhosis at single-cell level. Nature. 2019;575(7783):512-518. PMID 31597160; PMCID PMC6876711; doi:10.1038/s41586-019-1631-3.", "link": "https://doi.org/10.1038/s41586-019-1631-3", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ramachandran2020CKQ", "text": "Ramachandran J, Woodman RJ, Muller KR, Wundke R, McCormick R, Kaambwa B, et al. Validation of Knowledge Questionnaire for Patients With Liver Cirrhosis. Clin Gastroenterol Hepatol. 2020;18(8):1867-1873.e1. PMID 31809918; doi:10.1016/j.cgh.2019.11.045.", "link": "https://doi.org/10.1016/j.cgh.2019.11.045", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Ratib2014", "text": "Ratib S, Fleming KM, Crooks CJ, Aithal GP, West J. 1 and 5 year survival estimates for people with cirrhosis of the liver in England, 1998-2009: a large population study. J Hepatol. 2014;60(2):282-9. PMID 24128415; doi:10.1016/j.jhep.2013.09.027.", "link": "https://doi.org/10.1016/j.jhep.2013.09.027", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Regev2002", "text": "Regev A, Berho M, Jeffers LJ, Milikowski C, Molina EG, Pyrsopoulos NT, et al. Sampling error and intraobserver variation in liver biopsy in patients with chronic HCV infection. Am J Gastroenterol. 2002;97(10):2614-8. PMID 12385448; doi:10.1111/j.1572-0241.2002.06038.x.", "link": "https://doi.org/10.1111/j.1572-0241.2002.06038.x", "areas": ["B", "E"], "unverified": false, "validated": "PubMed", "aliases": ["Regev2002Sampling"]}, {"key": "Rehm2010Cirrhosis", "text": "Rehm J, Taylor B, Mohapatra S, Irving H, Baliunas D, Patra J, et al. Alcohol as a risk factor for liver cirrhosis: a systematic review and meta-analysis. Drug Alcohol Rev. 2010;29(4):437-45. PMID 20636661; doi:10.1111/j.1465-3362.2009.00153.x.", "link": "https://doi.org/10.1111/j.1465-3362.2009.00153.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Reig2022BCLC", "text": "Reig M, Forner A, Rimola J, Ferrer-Fàbrega J, Burrel M, Garcia-Criado Á, et al. BCLC strategy for prognosis prediction and treatment recommendation: The 2022 update. J Hepatol. 2022;76(3):681-693. PMID 34801630; PMCID PMC8866082; doi:10.1016/j.jhep.2021.11.018.", "link": "https://doi.org/10.1016/j.jhep.2021.11.018", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Reverter2014Gastro", "text": "Reverter E, Tandon P, Augustin S, Turon F, Casu S, Bastiampillai R, et al. A MELD-based model to determine risk of mortality among patients with acute variceal bleeding. Gastroenterology. 2014;146(2):412-19.e3. PMID 24148622; doi:10.1053/j.gastro.2013.10.018.", "link": "https://doi.org/10.1053/j.gastro.2013.10.018", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Riazi2022", "text": "Riazi K, Azhari H, Charette JH, Underwood FE, King JA, Afshar EE, et al. The prevalence and incidence of NAFLD worldwide: a systematic review and meta-analysis. Lancet Gastroenterol Hepatol. 2022;7(9):851-861. PMID 35798021; doi:10.1016/S2468-1253(22)00165-0.", "link": "https://doi.org/10.1016/s2468-1253(22)00165-0", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Rich2026Discrimination", "text": "Rich NE, Kramer JR, Liu Y, Campos J, Quirk L, Smith D, et al. Experienced Discrimination and Medical Mistrust Among Patients With Cirrhosis: Survey Results From a Multicenter Cohort. Clin Gastroenterol Hepatol. 2026;24(7):1888-1896. PMID 41076045; doi:10.1016/j.cgh.2025.09.038.", "link": "https://doi.org/10.1016/j.cgh.2025.09.038", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Richter1989Radiologe", "text": "Richter GM, Palmaz JC, Nöldge G, Rössle M, Siegerstetter V, Franke M, et al. [The transjugular intrahepatic portosystemic stent-shunt. A new nonsurgical percutaneous method]. Radiologe. 1989;29(8):406-11. PMID 2798853. No DOI listed in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/2798853/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Richter1990CVIR", "text": "Richter GM, Noeldge G, Palmaz JC, Roessle M. The transjugular intrahepatic portosystemic stent-shunt (TIPSS): results of a pilot study. Cardiovasc Intervent Radiol. 1990;13(3):200-7. PMID 2121348; doi:10.1007/BF02575474.", "link": "https://doi.org/10.1007/bf02575474", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Rinella2015JAMA", "text": "Rinella ME. Nonalcoholic fatty liver disease: a systematic review. JAMA. 2015;313(22):2263-73. PMID 26057287; doi:10.1001/jama.2015.5370.", "link": "https://doi.org/10.1001/jama.2015.5370", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Rinella2023AASLD", "text": "Rinella ME, Neuschwander-Tetri BA, Siddiqui MS, Abdelmalek MF, Caldwell S, Barb D, et al. AASLD Practice Guidance on the clinical assessment and management of nonalcoholic fatty liver disease. Hepatology. 2023;77(5):1797-1835. PMID 36727674; PMCID PMC10735173; doi:10.1097/HEP.0000000000000323. Full text read (PMC).", "link": "https://doi.org/10.1097/hep.0000000000000323", "areas": ["C", "E"], "unverified": false, "validated": "PubMed", "aliases": ["Rinella2023AASLDNAFLD"]}, {"key": "Rinella2023MASLD", "text": "Rinella ME, Lazarus JV, Ratziu V, Francque SM, Sanyal AJ, Kanwal F, et al. A multisociety Delphi consensus statement on new fatty liver disease nomenclature. Hepatology. 2023;78(6):1966-1986. PMID 37363821; PMCID PMC10653297; doi:10.1097/HEP.0000000000000520. Co-published in J Hepatol 2023;79(6):1542-1556 (PMID 37364790).", "link": "https://doi.org/10.1097/hep.0000000000000520", "areas": ["A", "B", "C", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Rinella2023MASLDD", "text": "Rinella ME, Lazarus JV, Ratziu V, Francque SM, Sanyal AJ, Kanwal F, et al. A multisociety Delphi consensus statement on new fatty liver disease nomenclature. J Hepatol. 2023;79(6):1542-1556. PMID 37364790; doi:10.1016/j.jhep.2023.06.003.", "link": "https://doi.org/10.1016/j.jhep.2023.06.003", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ripoll2007Gastro", "text": "Ripoll C, Groszmann R, Garcia-Tsao G, Grace N, Burroughs A, Planas R, et al. Hepatic venous pressure gradient predicts clinical decompensation in patients with compensated cirrhosis. Gastroenterology. 2007;133(2):481-8. PMID 17681169; doi:10.1053/j.gastro.2007.05.024.", "link": "https://doi.org/10.1053/j.gastro.2007.05.024", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Roerecke2019Cirrhosis", "text": "Roerecke M, Vafaei A, Hasan OSM, Chrystoja BR, Cruz M, Lee R, et al. Alcohol Consumption and Risk of Liver Cirrhosis: A Systematic Review and Meta-Analysis. Am J Gastroenterol. 2019;114(10):1574-1586. PMID 31464740; PMCID PMC6776700; doi:10.14309/ajg.0000000000000340. Full text read (PMC).", "link": "https://doi.org/10.14309/ajg.0000000000000340", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Rogal2020Hepatology", "text": "Rogal S, Youk A, Zhang H, Gellad WF, Fine MJ, Good CB, et al. Impact of Alcohol Use Disorder Treatment on Clinical Outcomes Among Patients With Cirrhosis. Hepatology. 2020;71(6):2080-2092. PMID 31758811; PMCID PMC8032461; doi:10.1002/hep.31042.", "link": "https://doi.org/10.1002/hep.31042", "areas": ["C", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Rogal2020AUD"]}, {"key": "Rogal2022AASLD", "text": "Rogal SS, Hansen L, Patel A, Ufere NN, Verma M, Woodrell CD, et al. AASLD Practice Guidance: Palliative care and symptom-based management in decompensated cirrhosis. Hepatology. 2022;76(3):819-853. PMID 35103995; PMCID PMC9942270; doi:10.1002/hep.32378.", "link": "https://doi.org/10.1002/hep.32378", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Roman2011Falls", "text": "Román E, Córdoba J, Torrens M, Torras X, Villanueva C, Vargas V, et al. Minimal hepatic encephalopathy is associated with falls. Am J Gastroenterol. 2011;106(3):476-82. PMID 20978484; doi:10.1038/ajg.2010.413.", "link": "https://doi.org/10.1038/ajg.2010.413", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Roman2013Falls", "text": "Román E, Córdoba J, Torrens M, Guarner C, Soriano G. Falls and cognitive dysfunction impair health-related quality of life in patients with cirrhosis. Eur J Gastroenterol Hepatol. 2013;25(1):77-84. PMID 22954704; doi:10.1097/MEG.0b013e3283589f49.", "link": "https://doi.org/10.1097/meg.0b013e3283589f49", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Romeo2008PNPLA3", "text": "Romeo S, Kozlitina J, Xing C, Pertsemlidis A, Cox D, Pennacchio LA, et al. Genetic variation in PNPLA3 confers susceptibility to nonalcoholic fatty liver disease. Nat Genet. 2008;40(12):1461-5. PMID 18820647; PMCID PMC2597056; doi:10.1038/ng.257.", "link": "https://doi.org/10.1038/ng.257", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Rosch1969", "text": "Rösch J, Hanafee WN, Snow H. Transjugular portal venography and radiologic portacaval shunt: an experimental study. Radiology. 1969;92(5):1112-4. PMID 5771827; doi:10.1148/92.5.1112.", "link": "https://doi.org/10.1148/92.5.1112", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Rose2020", "text": "Rose CF, Amodio P, Bajaj JS, Dhiman RK, Montagnese S, Taylor-Robinson SD, et al. Hepatic encephalopathy: Novel insights into classification, pathophysiology and therapy. J Hepatol. 2020;73(6):1526-1547. PMID 33097308; doi:10.1016/j.jhep.2020.07.013.", "link": "https://doi.org/10.1016/j.jhep.2020.07.013", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Rosenberg2004ELF", "text": "Rosenberg WM, Voelker M, Thiel R, Becka M, Burt A, Schuppan D, et al. Serum markers detect the presence of liver fibrosis: a cohort study. Gastroenterology. 2004;127(6):1704-13. PMID 15578508; doi:10.1053/j.gastro.2004.08.052.", "link": "https://doi.org/10.1053/j.gastro.2004.08.052", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Rui2014", "text": "Rui L. Energy metabolism in the liver. Compr Physiol. 2014;4(1):177-97. PMID 24692138; PMCID PMC4050641; doi:10.1002/cphy.c130024.", "link": "https://doi.org/10.1002/cphy.c130024", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Runyon1992AnnIntern", "text": "Runyon BA, Montano AA, Akriviadis EA, Antillon MR, Irving MA, McHutchison JG. The serum-ascites albumin gradient is superior to the exudate-transudate concept in the differential diagnosis of ascites. Ann Intern Med. 1992;117(3):215-20. PMID 1616215; doi:10.7326/0003-4819-117-3-215.", "link": "https://doi.org/10.7326/0003-4819-117-3-215", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Rush2017", "text": "Rush B, Walley KR, Celi LA, Rajoriya N, Brahmania M. Palliative care access for hospitalized patients with end-stage liver disease across the United States. Hepatology. 2017;66(5):1585-1591. PMID 28660622; doi:10.1002/hep.29297.", "link": "https://doi.org/10.1002/hep.29297", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Rychik2019Fontan", "text": "Rychik J, Atz AM, Celermajer DS, Deal BJ, Gatzoulis MA, Gewillig MH, et al. Evaluation and Management of the Child and Adult With Fontan Circulation: A Scientific Statement From the American Heart Association. Circulation. 2019;140(6):e234-e284. PMID 31256636; doi:10.1161/cir.0000000000000696.", "link": "https://doi.org/10.1161/cir.0000000000000696", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Salerno2007Gastro", "text": "Salerno F, Cammà C, Enea M, Rössle M, Wong F. Transjugular intrahepatic portosystemic shunt for refractory ascites: a meta-analysis of individual patient data. Gastroenterology. 2007;133(3):825-34. PMID 17678653; doi:10.1053/j.gastro.2007.06.020.", "link": "https://doi.org/10.1053/j.gastro.2007.06.020", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sangro2024HIMALAYA", "text": "Sangro B, Chan SL, Kelley RK, Lau G, Kudo M, Sukeepaisarnjaroen W, et al. Four-year overall survival update from the phase III HIMALAYA study of tremelimumab plus durvalumab in unresectable hepatocellular carcinoma. Ann Oncol. 2024;35(5):448-457. PMID 38382875; doi:10.1016/j.annonc.2024.02.005.", "link": "https://doi.org/10.1016/j.annonc.2024.02.005", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Santos2003JHepatol", "text": "Santos J, Planas R, Pardo A, Durández R, Cabré E, Morillas RM, et al. Spironolactone alone or in combination with furosemide in the treatment of moderate ascites in nonazotemic cirrhosis. A randomized comparative study of efficacy and safety. J Hepatol. 2003;39(2):187-92. PMID 12873814; doi:10.1016/s0168-8278(03)00188-0.", "link": "https://doi.org/10.1016/s0168-8278(03)00188-0", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sanyal2008Gastro", "text": "Sanyal AJ, Boyer T, Garcia-Tsao G, Regenstein F, Rossaro L, Appenrodt B, et al. A randomized, prospective, double-blind, placebo-controlled trial of terlipressin for type 1 hepatorenal syndrome. Gastroenterology. 2008;134(5):1360-8. PMID 18471513; PMCID PMC3730280; doi:10.1053/j.gastro.2008.02.014.", "link": "https://doi.org/10.1053/j.gastro.2008.02.014", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sanyal2010PIVENS", "text": "Sanyal AJ, Chalasani N, Kowdley KV, McCullough A, Diehl AM, Bass NM, et al. Pioglitazone, vitamin E, or placebo for nonalcoholic steatohepatitis. N Engl J Med. 2010;362(18):1675-85. PMID 20427778; PMCID PMC2928471; doi:10.1056/NEJMoa0907929.", "link": "https://doi.org/10.1056/nejmoa0907929", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Sanyal2021NAFLD", "text": "Sanyal AJ, Van Natta ML, Clark J, Neuschwander-Tetri BA, Diehl A, Dasarathy S, et al. Prospective Study of Outcomes in Adults with Nonalcoholic Fatty Liver Disease. N Engl J Med. 2021;385(17):1559-1569. PMID 34670043; PMCID PMC8881985; doi:10.1056/NEJMoa2029349.", "link": "https://doi.org/10.1056/nejmoa2029349", "areas": ["B", "C"], "unverified": false, "validated": "PubMed", "aliases": ["Sanyal2021NEJM"]}, {"key": "Sanyal2025ESSENCE", "text": "Sanyal AJ, Newsome PN, Kliers I, Østergaard LH, Long MT, Kjær MS, et al. Phase 3 Trial of Semaglutide in Metabolic Dysfunction-Associated Steatohepatitis. N Engl J Med. 2025;392(21):2089-2099. PMID 40305708; doi:10.1056/NEJMoa2413258.", "link": "https://doi.org/10.1056/nejmoa2413258", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Sarin1992Hepatology", "text": "Sarin SK, Lahoti D, Saxena SP, Murthy NS, Makwana UK. Prevalence, classification and natural history of gastric varices: a long-term follow-up study in 568 portal hypertension patients. Hepatology. 1992;16(6):1343-9. PMID 1446890; doi:10.1002/hep.1840160607.", "link": "https://doi.org/10.1002/hep.1840160607", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Scaglione2015", "text": "Scaglione S, Kliethermes S, Cao G, Shoham D, Durazo R, Luke A, et al. The Epidemiology of Cirrhosis in the United States: A Population-based Study. J Clin Gastroenterol. 2015;49(8):690-6. PMID 25291348; doi:10.1097/MCG.0000000000000208.", "link": "https://doi.org/10.1097/mcg.0000000000000208", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Schilsky2022CHELATE", "text": "Schilsky ML, Czlonkowska A, Zuin M, Cassiman D, Twardowschy C, Poujois A, et al. Trientine tetrahydrochloride versus penicillamine for maintenance therapy in Wilson disease (CHELATE): a randomised, open-label, non-inferiority, phase 3 trial. Lancet Gastroenterol Hepatol. 2022;7(12):1092-1102. PMID 36183738; doi:10.1016/S2468-1253(22)00270-9.", "link": "https://doi.org/10.1016/s2468-1253(22)00270-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Schneider2020PiZ", "text": "Schneider CV, Hamesch K, Gross A, Mandorfer M, Moeller LS, Pereira V, et al. Liver Phenotypes of European Adults Heterozygous or Homozygous for Pi∗Z Variant of AAT (Pi∗MZ vs Pi∗ZZ genotype) and Noncarriers. Gastroenterology. 2020;159(2):534-548.e11. PMID 32376409; doi:10.1053/j.gastro.2020.04.058.", "link": "https://doi.org/10.1053/j.gastro.2020.04.058", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Schomerus2011", "text": "Schomerus G, Lucht M, Holzinger A, Matschinger H, Carta MG, Angermeyer MC. The stigma of alcohol dependence compared with other mental disorders: a review of population studies. Alcohol Alcohol. 2011;46(2):105-12. PMID 21169612; doi:10.1093/alcalc/agq089.", "link": "https://doi.org/10.1093/alcalc/agq089", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Schrier1988Hepatology", "text": "Schrier RW, Arroyo V, Bernardi M, Epstein M, Henriksen JH, Rodés J. Peripheral arterial vasodilation hypothesis: a proposal for the initiation of renal sodium and water retention in cirrhosis. Hepatology. 1988;8(5):1151-7. PMID 2971015; doi:10.1002/hep.1840080532.", "link": "https://doi.org/10.1002/hep.1840080532", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Schuppan2008", "text": "Schuppan D, Afdhal NH. Liver cirrhosis. Lancet. 2008;371(9615):838-51. PMID 18328931; PMCID PMC2271178; doi:10.1016/S0140-6736(08)60383-9.", "link": "https://doi.org/10.1016/s0140-6736(08)60383-9", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Schweighardt2018", "text": "Schweighardt AE, Juba KM. A Systematic Review of the Evidence Behind Use of Reduced Doses of Acetaminophen in Chronic Liver Disease. J Pain Palliat Care Pharmacother. 2018;32(4):226-239. PMID 31206302; doi:10.1080/15360288.2019.1611692.", "link": "https://doi.org/10.1080/15360288.2019.1611692", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Seeff2002", "text": "Seeff LB. Natural history of chronic hepatitis C. Hepatology. 2002;36(5 Suppl 1):S35-46. PMID 12407575; doi:10.1053/jhep.2002.36806.", "link": "https://doi.org/10.1053/jhep.2002.36806", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Seeff2010HALTC", "text": "Seeff LB, Everson GT, Morgan TR, Curto TM, Lee WM, Ghany MG, et al. Complication rate of percutaneous liver biopsies among persons with advanced chronic liver disease in the HALT-C trial. Clin Gastroenterol Hepatol. 2010;8(10):877-83. PMID 20362695; PMCID PMC3771318; doi:10.1016/j.cgh.2010.03.025.", "link": "https://doi.org/10.1016/j.cgh.2010.03.025", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Seitz2018NRDP", "text": "Seitz HK, Bataller R, Cortez-Pinto H, Gao B, Gual A, Lackner C, et al. Alcoholic liver disease. Nat Rev Dis Primers. 2018;4(1):16. PMID 30115921; doi:10.1038/s41572-018-0014-7.", "link": "https://doi.org/10.1038/s41572-018-0014-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Seki2007", "text": "Seki E, De Minicis S, Osterreicher CH, Kluwe J, Osawa Y, Brenner DA, et al. TLR4 enhances TGF-beta signaling and hepatic fibrosis. Nat Med. 2007;13(11):1324-32. PMID 17952090; doi:10.1038/nm1663.", "link": "https://doi.org/10.1038/nm1663", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Selvaraj2021NAFLD", "text": "Selvaraj EA, Mózes FE, Jayaswal ANA, Zafarmand MH, Vali Y, Lee JA, et al. Diagnostic accuracy of elastography and magnetic resonance imaging in patients with NAFLD: A systematic review and meta-analysis. J Hepatol. 2021;75(4):770-785. PMID 33991635; doi:10.1016/j.jhep.2021.04.044.", "link": "https://doi.org/10.1016/j.jhep.2021.04.044", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Seol2024FALD", "text": "Seol JH, Song J, Kim SJ, Ko H, Na JY, Cho MJ, et al. Clinical predictors and noninvasive imaging in Fontan-associated liver disease: A systematic review and meta-analysis. Hepatol Commun. 2024;8(12). PMID 39774692; PMCID PMC11567714; doi:10.1097/HC9.0000000000000580.", "link": "https://doi.org/10.1097/hc9.0000000000000580", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Seto2018Lancet", "text": "Seto WK, Lo YR, Pawlotsky JM, Yuen MF. Chronic hepatitis B virus infection. Lancet. 2018;392(10161):2313-2324. PMID 30496122; doi:10.1016/S0140-6736(18)31865-8.", "link": "https://doi.org/10.1016/s0140-6736(18)31865-8", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Shah2009FIB4", "text": "Shah AG, Lydecker A, Murray K, Tetri BN, Contos MJ, Sanyal AJ. Comparison of noninvasive markers of fibrosis in patients with nonalcoholic fatty liver disease. Clin Gastroenterol Hepatol. 2009;7(10):1104-12. PMID 19523535; PMCID PMC3079239; doi:10.1016/j.cgh.2009.05.033.", "link": "https://doi.org/10.1016/j.cgh.2009.05.033", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Sharma2009Lactulose", "text": "Sharma BC, Sharma P, Agrawal A, Sarin SK. Secondary prophylaxis of hepatic encephalopathy: an open-label randomized controlled trial of lactulose versus placebo. Gastroenterology. 2009;137(3):885-91, 891.e1. PMID 19501587; doi:10.1053/j.gastro.2009.05.056.", "link": "https://doi.org/10.1053/j.gastro.2009.05.056", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Sharma2012Primary", "text": "Sharma P, Sharma BC, Agrawal A, Sarin SK. Primary prophylaxis of overt hepatic encephalopathy in patients with cirrhosis: an open labeled randomized controlled trial of lactulose versus no lactulose. J Gastroenterol Hepatol. 2012;27(8):1329-35. PMID 22606978; doi:10.1111/j.1440-1746.2012.07186.x.", "link": "https://doi.org/10.1111/j.1440-1746.2012.07186.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Sharma2013RifaxLact", "text": "Sharma BC, Sharma P, Lunia MK, Srivastava S, Goyal R, Sarin SK. A randomized, double-blind, controlled trial comparing rifaximin plus lactulose with lactulose alone in treatment of overt hepatic encephalopathy. Am J Gastroenterol. 2013;108(9):1458-63. PMID 23877348; doi:10.1038/ajg.2013.219.", "link": "https://doi.org/10.1038/ajg.2013.219", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Shinall2019COMPASS", "text": "Shinall MC Jr, Karlekar M, Martin S, Gatto CL, Misra S, Chung CY, et al. COMPASS: A Pilot Trial of an Early Palliative Care Intervention for Patients With End-Stage Liver Disease. J Pain Symptom Manage. 2019;58(4):614-622.e3. PMID 31276810; PMCID PMC6754773; doi:10.1016/j.jpainsymman.2019.06.023.", "link": "https://doi.org/10.1016/j.jpainsymman.2019.06.023", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Simmons2017US", "text": "Simmons O, Fetzer DT, Yokoo T, Marrero JA, Yopp A, Kono Y, et al. Predictors of adequate ultrasound quality for hepatocellular carcinoma surveillance in patients with cirrhosis. Aliment Pharmacol Ther. 2017;45(1):169-177. PMID 27862091; PMCID PMC7207219; doi:10.1111/apt.13841.", "link": "https://doi.org/10.1111/apt.13841", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Simon2021Gut", "text": "Simon TG, Roelstraete B, Khalili H, Hagström H, Ludvigsson JF. Mortality in biopsy-confirmed nonalcoholic fatty liver disease: results from a nationwide cohort. Gut. 2021;70(7):1375-1382. PMID 33037056; PMCID PMC8185553; doi:10.1136/gutjnl-2020-322786.", "link": "https://doi.org/10.1136/gutjnl-2020-322786", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Singal2014PLoSMed", "text": "Singal AG, Pillai A, Tiro J. Early detection, curative treatment, and survival rates for hepatocellular carcinoma surveillance in patients with cirrhosis: a meta-analysis. PLoS Med. 2014;11(4):e1001624. PMID 24691105; PMCID PMC3972088; doi:10.1371/journal.pmed.1001624.", "link": "https://doi.org/10.1371/journal.pmed.1001624", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Singal2018ACG", "text": "Singal AK, Bataller R, Ahn J, Kamath PS, Shah VH. ACG Clinical Guideline: Alcoholic Liver Disease. Am J Gastroenterol. 2018;113(2):175-194. PMID 29336434; PMCID PMC6524956; doi:10.1038/ajg.2017.469. Full text read (PMC open access).", "link": "https://doi.org/10.1038/ajg.2017.469", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Singal2023AASLDHCC", "text": "Singal AG, Llovet JM, Yarchoan M, Mehta N, Heimbach JK, Dawson LA, et al. AASLD Practice Guidance on prevention, diagnosis, and treatment of hepatocellular carcinoma. Hepatology. 2023;78(6):1922-1965. PMID 37199193; PMCID PMC10663390; doi:10.1097/HEP.0000000000000466.", "link": "https://doi.org/10.1097/hep.0000000000000466", "areas": ["E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Singh2015", "text": "Singh S, Allen AM, Wang Z, Prokop LJ, Murad MH, Loomba R. Fibrosis progression in nonalcoholic fatty liver vs nonalcoholic steatohepatitis: a systematic review and meta-analysis of paired-biopsy studies. Clin Gastroenterol Hepatol. 2015;13(4):643-54.e1-9. PMID 24768810; PMCID PMC4208976; doi:10.1016/j.cgh.2014.04.014.", "link": "https://doi.org/10.1016/j.cgh.2014.04.014", "areas": ["B", "C"], "unverified": false, "validated": "PubMed", "aliases": ["Singh2015CGH"]}, {"key": "Singh2015MRE", "text": "Singh S, Venkatesh SK, Wang Z, Miller FH, Motosugi U, Low RN, et al. Diagnostic performance of magnetic resonance elastography in staging liver fibrosis: a systematic review and meta-analysis of individual participant data. Clin Gastroenterol Hepatol. 2015;13(3):440-451.e6. PMID 25305349; PMCID PMC4333001; doi:10.1016/j.cgh.2014.09.046.", "link": "https://doi.org/10.1016/j.cgh.2014.09.046", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Sola2018JHepatol", "text": "Solà E, Solé C, Simón-Talero M, Martín-Llahí M, Castellote J, Garcia-Martínez R, et al. Midodrine and albumin for prevention of complications in patients with cirrhosis awaiting liver transplantation. A randomized placebo-controlled trial. J Hepatol. 2018;69(6):1250-1259. PMID 30138685; doi:10.1016/j.jhep.2018.08.006.", "link": "https://doi.org/10.1016/j.jhep.2018.08.006", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Soriano2012", "text": "Soriano G, Román E, Córdoba J, Torrens M, Poca M, Torras X, et al. Cognitive dysfunction in cirrhosis is associated with falls: a prospective study. Hepatology. 2012;55(6):1922-30. PMID 22213000; doi:10.1002/hep.25554.", "link": "https://doi.org/10.1002/hep.25554", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sort1999NEJM", "text": "Sort P, Navasa M, Arroyo V, Aldeguer X, Planas R, Ruiz-del-Arbol L, et al. Effect of intravenous albumin on renal impairment and mortality in patients with cirrhosis and spontaneous bacterial peritonitis. N Engl J Med. 1999;341(6):403-9. PMID 10432325; doi:10.1056/NEJM199908053410603.", "link": "https://doi.org/10.1056/nejm199908053410603", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Starzl1963", "text": "Starzl TE, Marchioro TL, Vonkaulla KN, Hermann G, Brittain RS, Waddell WR. Homotransplantation of the liver in humans. Surg Gynecol Obstet. 1963;117:659-76. PMID 14100514; PMCID PMC2634660. No DOI or abstract in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/14100514/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Starzl1968Surgery", "text": "Starzl TE, Groth CG, Brettschneider L, Moon JB, Fulginiti VA, Cotton EK, et al. Extended survival in 3 cases of orthotopic homotransplantation of the human liver. Surgery. 1968;63(4):549-63. PMID 4171413; PMCID PMC2964132. No DOI or abstract in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/4171413/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Starzl1981NEJM", "text": "Starzl TE, Klintmalm GB, Porter KA, Iwatsuki S, Schröter GP. Liver transplantation with use of cyclosporin a and prednisone. N Engl J Med. 1981;305(5):266-9. PMID 7017414; PMCID PMC2772056; doi:10.1056/NEJM198107303050507.", "link": "https://doi.org/10.1056/nejm198107303050507", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Sterling2006FIB4", "text": "Sterling RK, Lissen E, Clumeck N, Sola R, Correa MC, Montaner J, et al. Development of a simple noninvasive index to predict significant fibrosis in patients with HIV/HCV coinfection. Hepatology. 2006;43(6):1317-25. PMID 16729309; doi:10.1002/hep.21178.", "link": "https://doi.org/10.1002/hep.21178", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Stockdale2020HDV", "text": "Stockdale AJ, Kreuels B, Henrion MYR, Giorgi E, Kyomuhangi I, de Martel C, et al. The global prevalence of hepatitis D virus infection: Systematic review and meta-analysis. J Hepatol. 2020;73(3):523-532. PMID 32335166; PMCID PMC7438974; doi:10.1016/j.jhep.2020.04.008.", "link": "https://doi.org/10.1016/j.jhep.2020.04.008", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Strnad2022Fazirsiran", "text": "Strnad P, Mandorfer M, Choudhury G, Griffiths W, Trautwein C, Loomba R, et al. Fazirsiran for Liver Disease Associated with Alpha(1)-Antitrypsin Deficiency. N Engl J Med. 2022;387(6):514-524. PMID 35748699; doi:10.1056/NEJMoa2205416.", "link": "https://doi.org/10.1056/nejmoa2205416", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sullivan1989CIWA", "text": "Sullivan JT, Sykora K, Schneiderman J, Naranjo CA, Sellers EM. Assessment of alcohol withdrawal: the revised clinical institute withdrawal assessment for alcohol scale (CIWA-Ar). Br J Addict. 1989;84(11):1353-7. PMID 2597811; doi:10.1111/j.1360-0443.1989.tb00737.x.", "link": "https://doi.org/10.1111/j.1360-0443.1989.tb00737.x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sung2021GLOBOCAN", "text": "Sung H, Ferlay J, Siegel RL, Laversanne M, Soerjomataram I, Jemal A, et al. Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and Mortality Worldwide for 36 Cancers in 185 Countries. CA Cancer J Clin. 2021;71(3):209-249. PMID 33538338; doi:10.3322/caac.21660.", "link": "https://doi.org/10.3322/caac.21660", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Sveger1976", "text": "Sveger T. Liver disease in alpha1-antitrypsin deficiency detected by screening of 200,000 infants. N Engl J Med. 1976;294(24):1316-21. PMID 1083485; doi:10.1056/NEJM197606102942404.", "link": "https://doi.org/10.1056/nejm197606102942404", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Tan2026PBC", "text": "Tan JJ, Chung AH, Loo JH, Quek JWE, Sharma S, Singh CL, et al. Global Epidemiology of Primary Biliary Cholangitis: An Updated Systematic Review and Meta-Analysis. Clin Gastroenterol Hepatol. 2026;24(3):621-632. PMID 40398833; doi:10.1016/j.cgh.2025.03.025.", "link": "https://doi.org/10.1016/j.cgh.2025.03.025", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Tandon2012", "text": "Tandon P, Ney M, Irwin I, Ma MM, Gramlich L, Bain VG, et al. Severe muscle depletion in patients on the liver transplant wait list: its prevalence and independent prognostic value. Liver Transpl. 2012;18(10):1209-16. PMID 22740290; doi:10.1002/lt.23495.", "link": "https://doi.org/10.1002/lt.23495", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Tao2025Xeno", "text": "Tao KS, Yang ZX, Zhang X, Zhang HT, Yue SQ, Yang YL, et al. Gene-modified pig-to-human liver xenotransplantation. Nature. 2025;641(8064):1029-1036. PMID 40140580; PMCID PMC12095057; doi:10.1038/s41586-025-08799-1.", "link": "https://doi.org/10.1038/s41586-025-08799-1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2016QI", "text": "Tapper EB, Finkelstein D, Mittleman MA, Piatkowski G, Chang M, Lai M. A Quality Improvement Initiative Reduces 30-Day Rate of Readmission for Patients With Cirrhosis. Clin Gastroenterol Hepatol. 2016;14(5):753-9. PMID 26407750; PMCID PMC5394424; doi:10.1016/j.cgh.2015.08.041.", "link": "https://doi.org/10.1016/j.cgh.2015.08.041", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2016QIReview", "text": "Tapper EB. Building Effective Quality Improvement Programs for Liver Disease: A Systematic Review of Quality Improvement Initiatives. Clin Gastroenterol Hepatol. 2016;14(9):1256-1265.e3. PMID 27103114; doi:10.1016/j.cgh.2016.04.020.", "link": "https://doi.org/10.1016/j.cgh.2016.04.020", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2016Readmit", "text": "Tapper EB, Halbert B, Mellinger J. Rates of and Reasons for Hospital Readmissions in Patients With Cirrhosis: A Multistate Population-based Cohort Study. Clin Gastroenterol Hepatol. 2016;14(8):1181-1188.e2. PMID 27085758; doi:10.1016/j.cgh.2016.04.009.", "link": "https://doi.org/10.1016/j.cgh.2016.04.009", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2018BMJ", "text": "Tapper EB, Parikh ND. Mortality due to cirrhosis and liver cancer in the United States, 1999-2016: observational study. BMJ. 2018;362:k2817. PMID 30021785; PMCID PMC6050518; doi:10.1136/bmj.k2817.", "link": "https://doi.org/10.1136/bmj.k2817", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2020OHE", "text": "Tapper EB, Zhao L, Nikirk S, Baki J, Parikh ND, Lok AS, et al. Incidence and Bedside Predictors of the First Episode of Overt Hepatic Encephalopathy in Patients With Cirrhosis. Am J Gastroenterol. 2020;115(12):2017-2025. PMID 32773463; PMCID PMC7853725; doi:10.14309/ajg.0000000000000762.", "link": "https://doi.org/10.14309/ajg.0000000000000762", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2022PICCLES", "text": "Tapper EB, Salim N, Baki J, Zhao Z, Sundaram V, Patwardhan V, et al. Pickle Juice Intervention for Cirrhotic Cramps Reduction: The PICCLES Randomized Controlled Trial. Am J Gastroenterol. 2022;117(6):895-901. PMID 35416793; PMCID PMC11214544; doi:10.14309/ajg.0000000000001781.", "link": "https://doi.org/10.14309/ajg.0000000000001781", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2023JAMA", "text": "Tapper EB, Parikh ND. Diagnosis and Management of Cirrhosis and Its Complications: A Review. JAMA. 2023;329(18):1589-1602. PMID 37159031; PMCID PMC10843851; doi:10.1001/jama.2023.5997.", "link": "https://doi.org/10.1001/jama.2023.5997", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2024RELAX", "text": "Tapper EB, Trivedi H, Simonetto DA, Patwardhan V, Ospina E, Martinez B, et al. The RELAX randomized controlled trial: Stretching versus meditation for nocturnal muscle cramps. Liver Int. 2024;44(9):2434-2441. PMID 38860445; PMCID PMC11369850; doi:10.1111/liv.16007.", "link": "https://doi.org/10.1111/liv.16007", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2026LiveSMART", "text": "Tapper EB, Asrani S, Weinberg E, Zhao L, Nikirk S, Mehta S, et al. Lactulose with or without TeleTai-Chi for the prevention of falls: A sequential multiple assignment randomized controlled trial (LiveSMART). Hepatology. 2026. PMID 42752551; doi:10.1097/HEP.0000000000001869.", "link": "https://doi.org/10.1097/hep.0000000000001869", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2026PALLIVER", "text": "Tapper EB, Woodrell CD, Rakoski M, Huang R, Kosinski AS, Verma M. Hepatic Encephalopathy is the Key Driver of Symptom Burden in a Longitudinal Cohort of Patients With Advanced Chronic Liver Disease: PAL-LIVER Substudy. Am J Gastroenterol. 2026;121(10):2441-2448. PMID 41685762; doi:10.14309/ajg.0000000000003964.", "link": "https://doi.org/10.14309/ajg.0000000000003964", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Taylor2020Gastro", "text": "Taylor RS, Taylor RJ, Bayliss S, Hagström H, Nasr P, Schattenberg JM, et al. Association Between Fibrosis Stage and Outcomes of Patients With Nonalcoholic Fatty Liver Disease: A Systematic Review and Meta-Analysis. Gastroenterology. 2020;158(6):1611-1625.e12. PMID 32027911; doi:10.1053/j.gastro.2020.01.043.", "link": "https://doi.org/10.1053/j.gastro.2020.01.043", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Teli1995Lancet", "text": "Teli MR, Day CP, Burt AD, Bennett MK, James OF. Determinants of progression to cirrhosis or fibrosis in pure alcoholic fatty liver. Lancet. 1995;346(8981):987-90. PMID 7475591; doi:10.1016/s0140-6736(95)91685-7.", "link": "https://doi.org/10.1016/s0140-6736(95)91685-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Terrault2018AASLD", "text": "Terrault NA, Lok ASF, McMahon BJ, Chang KM, Hwang JP, Jonas MM, et al. Update on prevention, diagnosis, and treatment of chronic hepatitis B: AASLD 2018 hepatitis B guidance. Hepatology. 2018;67(4):1560-1599. PMID 29405329; PMCID PMC5975958; doi:10.1002/hep.29800. Statements read from the PMC full text.", "link": "https://doi.org/10.1002/hep.29800", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Tham2025", "text": "Tham EKJ, Tan DJH, Danpanichkul P, Ng CH, Syn N, Koh B, et al. The Global Burden of Cirrhosis and Other Chronic Liver Diseases in 2021. Liver Int. 2025;45(3):e70001. PMID 39927433; PMCID PMC11808647; doi:10.1111/liv.70001.", "link": "https://doi.org/10.1111/liv.70001", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Thein2008", "text": "Thein HH, Yi Q, Dore GJ, Krahn MD. Estimation of stage-specific fibrosis progression rates in chronic hepatitis C virus infection: a meta-analysis and meta-regression. Hepatology. 2008;48(2):418-31. PMID 18563841; doi:10.1002/hep.22375.", "link": "https://doi.org/10.1002/hep.22375", "areas": ["B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Theise2018Beijing", "text": "Theise ND, Jia J, Sun Y, Wee A, You H. Progression and regression of fibrosis in viral hepatitis in the treatment era: the Beijing classification. Mod Pathol. 2018;31(8):1191-1200. PMID 29700417; doi:10.1038/s41379-018-0048-0.", "link": "https://doi.org/10.1038/s41379-018-0048-0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Thompson2018ELAD", "text": "Thompson J, Jones N, Al-Khafaji A, Malik S, Reich D, Munoz S, et al. Extracorporeal cellular therapy (ELAD) in severe alcoholic hepatitis: A multinational, prospective, controlled, randomized trial. Liver Transpl. 2018;24(3):380-393. PMID 29171941; PMCID PMC5873437; doi:10.1002/lt.24986.", "link": "https://doi.org/10.1002/lt.24986", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Thompson2024JHEP", "text": "Thompson R, Taddei T, Kaplan D, Rabiee A. Safety of naltrexone in patients with cirrhosis. JHEP Rep. 2024;6(7):101095. PMID 38961852; PMCID PMC11220533; doi:10.1016/j.jhepr.2024.101095.", "link": "https://doi.org/10.1016/j.jhepr.2024.101095", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Thursz2015STOPAH", "text": "Thursz MR, Richardson P, Allison M, Austin A, Bowers M, Day CP, et al. Prednisolone or pentoxifylline for alcoholic hepatitis. N Engl J Med. 2015;372(17):1619-28. PMID 25901427; doi:10.1056/NEJMoa1412278.", "link": "https://doi.org/10.1056/nejmoa1412278", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Trebicka2025Hepatology", "text": "Trebicka J, Garcia-Tsao G. Controversies regarding albumin therapy in cirrhosis. Hepatology. 2025;81(1):288-303. PMID 37540192; PMCID PMC11643133; doi:10.1097/HEP.0000000000000521.", "link": "https://doi.org/10.1097/hep.0000000000000521", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Trefts2017", "text": "Trefts E, Gannon M, Wasserman DH. The liver. Curr Biol. 2017;27(21):R1147-R1151. PMID 29112863; PMCID PMC5897118; doi:10.1016/j.cub.2017.09.019.", "link": "https://doi.org/10.1016/j.cub.2017.09.019", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tripathi2009Hepatology", "text": "Tripathi D, Ferguson JW, Kochar N, Leithead JA, Therapondos G, McAvoy NC, et al. Randomized controlled trial of carvedilol versus variceal band ligation for the prevention of the first variceal bleed. Hepatology. 2009;50(3):825-33. PMID 19610055; doi:10.1002/hep.23045.", "link": "https://doi.org/10.1002/hep.23045", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Tsien2012", "text": "Tsien CD, McCullough AJ, Dasarathy S. Late evening snack: exploiting a period of anabolic opportunity in cirrhosis. J Gastroenterol Hepatol. 2012;27(3):430-41. PMID 22004479; doi:10.1111/j.1440-1746.2011.06951.x.", "link": "https://doi.org/10.1111/j.1440-1746.2011.06951.x", "areas": ["G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Tsien2012LES"]}, {"key": "Tsochatzis2011TE", "text": "Tsochatzis EA, Gurusamy KS, Ntaoula S, Cholongitas E, Davidson BR, Burroughs AK. Elastography for the diagnosis of severity of fibrosis in chronic liver disease: a meta-analysis of diagnostic accuracy. J Hepatol. 2011;54(4):650-9. PMID 21146892; doi:10.1016/j.jhep.2010.07.033.", "link": "https://doi.org/10.1016/j.jhep.2010.07.033", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Tsuchida2017", "text": "Tsuchida T, Friedman SL. Mechanisms of hepatic stellate cell activation. Nat Rev Gastroenterol Hepatol. 2017;14(7):397-411. PMID 28487545; doi:10.1038/nrgastro.2017.38.", "link": "https://doi.org/10.1038/nrgastro.2017.38", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tzartzeva2018", "text": "Tzartzeva K, Obi J, Rich NE, Parikh ND, Marrero JA, Yopp A, et al. Surveillance Imaging and Alpha Fetoprotein for Early Detection of Hepatocellular Carcinoma in Patients With Cirrhosis: A Meta-analysis. Gastroenterology. 2018;154(6):1706-1718.e1. PMID 29425931; PMCID PMC5927818; doi:10.1053/j.gastro.2018.01.064.", "link": "https://doi.org/10.1053/j.gastro.2018.01.064", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Udell2012JAMA", "text": "Udell JA, Wang CS, Tinmouth J, FitzGerald JM, Ayas NT, Simel DL, et al. Does this patient with liver disease have cirrhosis?. JAMA. 2012;307(8):832-842. PMID 22357834; doi:10.1001/jama.2012.186.", "link": "https://doi.org/10.1001/jama.2012.186", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Ufere2019Barriers", "text": "Ufere NN, Donlan J, Waldman L, Dienstag JL, Friedman LS, Corey KE, et al. Barriers to Use of Palliative Care and Advance Care Planning Discussions for Patients With End-Stage Liver Disease. Clin Gastroenterol Hepatol. 2019;17(12):2592-2599. PMID 30885884; PMCID PMC6745282; doi:10.1016/j.cgh.2019.03.022.", "link": "https://doi.org/10.1016/j.cgh.2019.03.022", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Vali2020ELF", "text": "Vali Y, Lee J, Boursier J, Spijker R, Löffler J, Verheij J, et al. Enhanced liver fibrosis test for the non-invasive diagnosis of fibrosis in patients with NAFLD: A systematic review and meta-analysis. J Hepatol. 2020;73(2):252-262. PMID 32275982; doi:10.1016/j.jhep.2020.03.036.", "link": "https://doi.org/10.1016/j.jhep.2020.03.036", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "vanBoekel2013", "text": "van Boekel LC, Brouwers EP, van Weeghel J, Garretsen HF. Stigma among health professionals towards patients with substance use disorders and its consequences for healthcare delivery: systematic review. Drug Alcohol Depend. 2013;131(1-2):23-35. PMID 23490450; doi:10.1016/j.drugalcdep.2013.02.018.", "link": "https://doi.org/10.1016/j.drugalcdep.2013.02.018", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "vanderMeer2012", "text": "van der Meer AJ, Veldt BJ, Feld JJ, Wedemeyer H, Dufour JF, Lammert F, et al. Association between sustained virological response and all-cause mortality among patients with chronic hepatitis C and advanced hepatic fibrosis. JAMA. 2012;308(24):2584-93. PMID 23268517; doi:10.1001/jama.2012.144878.", "link": "https://doi.org/10.1001/jama.2012.144878", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Vannier2022", "text": "Vannier AGL, Shay JES, Fomin V, Patel SJ, Schaefer E, Goodman RP, et al. Incidence and Progression of Alcohol-Associated Liver Disease After Medical Therapy for Alcohol Use Disorder. JAMA Netw Open. 2022;5(5):e2213014. PMID 35594048; PMCID PMC9123494; doi:10.1001/jamanetworkopen.2022.13014.", "link": "https://doi.org/10.1001/jamanetworkopen.2022.13014", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "vanRijn2021DHOPE", "text": "van Rijn R, Schurink IJ, de Vries Y, van den Berg AP, Cortes Cerisuelo M, Darwish Murad S, et al. Hypothermic Machine Perfusion in Liver Transplantation - A Randomized Trial. N Engl J Med. 2021;384(15):1391-1401. PMID 33626248; doi:10.1056/NEJMoa2031532.", "link": "https://doi.org/10.1056/nejmoa2031532", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "VaughnSandler2014", "text": "Vaughn-Sandler V, Sherman C, Aronsohn A, Volk ML. Consequences of perceived stigma among patients with cirrhosis. Dig Dis Sci. 2014;59(3):681-6. PMID 24248421; PMCID PMC3944010; doi:10.1007/s10620-013-2942-0.", "link": "https://doi.org/10.1007/s10620-013-2942-0", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "VilarGomez2015", "text": "Vilar-Gomez E, Martinez-Perez Y, Calzadilla-Bertot L, Torres-Gonzalez A, Gra-Oramas B, Gonzalez-Fabian L, et al. Weight Loss Through Lifestyle Modification Significantly Reduces Features of Nonalcoholic Steatohepatitis. Gastroenterology. 2015;149(2):367-78.e5. PMID 25865049; doi:10.1053/j.gastro.2015.04.005.", "link": "https://doi.org/10.1053/j.gastro.2015.04.005", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Villanueva2013NEJM", "text": "Villanueva C, Colomo A, Bosch A, Concepción M, Hernandez-Gea V, Aracil C, et al. Transfusion strategies for acute upper gastrointestinal bleeding. N Engl J Med. 2013;368(1):11-21. PMID 23281973; doi:10.1056/NEJMoa1211801.", "link": "https://doi.org/10.1056/nejmoa1211801", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Villanueva2019PREDESCI", "text": "Villanueva C, Albillos A, Genescà J, Garcia-Pagan JC, Calleja JL, Aracil C, et al. β blockers to prevent decompensation of cirrhosis in patients with clinically significant portal hypertension (PREDESCI): a randomised, double-blind, placebo-controlled, multicentre trial. Lancet. 2019;393(10181):1597-1608. PMID 30910320; doi:10.1016/S0140-6736(18)31875-0.", "link": "https://doi.org/10.1016/s0140-6736(18)31875-0", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Villanueva2022Carvedilol", "text": "Villanueva C, Torres F, Sarin SK, Shah HA, Tripathi D, Brujats A, et al. Carvedilol reduces the risk of decompensation and mortality in patients with compensated cirrhosis in a competing-risk meta-analysis. J Hepatol. 2022;77(4):1014-1025. PMID 35661713; doi:10.1016/j.jhep.2022.05.021.", "link": "https://doi.org/10.1016/j.jhep.2022.05.021", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Vilstrup2014HE", "text": "Vilstrup H, Amodio P, Bajaj J, Cordoba J, Ferenci P, Mullen KD, et al. Hepatic encephalopathy in chronic liver disease: 2014 Practice Guideline by the American Association for the Study of Liver Diseases and the European Association for the Study of the Liver. Hepatology. 2014;60(2):715-35. PMID 25042402; doi:10.1002/hep.27210.", "link": "https://doi.org/10.1002/hep.27210", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Volk2012Readmit", "text": "Volk ML, Tocco RS, Bazick J, Rakoski MO, Lok AS. Hospital readmissions among patients with decompensated cirrhosis. Am J Gastroenterol. 2012;107(2):247-52. PMID 21931378; PMCID PMC3470789; doi:10.1038/ajg.2011.314.", "link": "https://doi.org/10.1038/ajg.2011.314", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Volk2013Knowledge", "text": "Volk ML, Fisher N, Fontana RJ. Patient knowledge about disease self-management in cirrhosis. Am J Gastroenterol. 2013;108(3):302-5. PMID 23459041; PMCID PMC3819196; doi:10.1038/ajg.2012.214.", "link": "https://doi.org/10.1038/ajg.2012.214", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Wai2003APRI", "text": "Wai CT, Greenson JK, Fontana RJ, Kalbfleisch JD, Marrero JA, Conjeevaram HS, et al. A simple noninvasive index can predict both significant fibrosis and cirrhosis in patients with chronic hepatitis C. Hepatology. 2003;38(2):518-26. PMID 12883497; doi:10.1053/jhep.2003.50346.", "link": "https://doi.org/10.1053/jhep.2003.50346", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Wang2022Recomp", "text": "Wang Q, Zhao H, Deng Y, Zheng H, Xiang H, Nan Y, et al. Validation of Baveno VII criteria for recompensation in entecavir-treated patients with hepatitis B-related decompensated cirrhosis. J Hepatol. 2022;77(6):1564-1572. PMID 36038017; doi:10.1016/j.jhep.2022.07.037.", "link": "https://doi.org/10.1016/j.jhep.2022.07.037", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Wanless2000", "text": "Wanless IR, Nakashima E, Sherman M. Regression of human cirrhosis. Morphologic features and the genesis of incomplete septal cirrhosis. Arch Pathol Lab Med. 2000;124(11):1599-607. PMID 11079009; doi:10.5858/2000-124-1599-ROHC.", "link": "https://doi.org/10.5858/2000-124-1599-rohc", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Wedemeyer2023MYR301", "text": "Wedemeyer H, Aleman S, Brunetto MR, Blank A, Andreone P, Bogomolov P, et al. A Phase 3, Randomized Trial of Bulevirtide in Chronic Hepatitis D. N Engl J Med. 2023;389(1):22-32. PMID 37345876; doi:10.1056/NEJMoa2213429.", "link": "https://doi.org/10.1056/nejmoa2213429", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Wells2012APT", "text": "Wells M, Chande N, Adams P, Beaton M, Levstik M, Boyce E, et al. Meta-analysis: vasoactive medications for the management of acute variceal bleeds. Aliment Pharmacol Ther. 2012;35(11):1267-78. PMID 22486630; doi:10.1111/j.1365-2036.2012.05088.x.", "link": "https://doi.org/10.1111/j.1365-2036.2012.05088.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Weng2022ACIP", "text": "Weng MK, Doshani M, Khan MA, Frey S, Ault K, Moore KL, et al. Universal Hepatitis B Vaccination in Adults Aged 19-59 Years: Updated Recommendations of the Advisory Committee on Immunization Practices - United States, 2022. MMWR Morb Mortal Wkly Rep. 2022;71(13):477-483. PMID 35358162; PMCID PMC8979596; doi:10.15585/mmwr.mm7113a1.", "link": "https://doi.org/10.15585/mmwr.mm7113a1", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "West2010Biopsy", "text": "West J, Card TR. Reduced mortality rates following elective percutaneous liver biopsies. Gastroenterology. 2010;139(4):1230-7. PMID 20547160; doi:10.1053/j.gastro.2010.06.015.", "link": "https://doi.org/10.1053/j.gastro.2010.06.015", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Westbrook2014", "text": "Westbrook RH, Dusheiko G. Natural history of hepatitis C. J Hepatol. 2014;61(1 Suppl):S58-68. PMID 25443346; doi:10.1016/j.jhep.2014.07.012.", "link": "https://doi.org/10.1016/j.jhep.2014.07.012", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Wiesner2003", "text": "Wiesner R, Edwards E, Freeman R, Harper A, Kim R, Kamath P, et al. Model for end-stage liver disease (MELD) and allocation of donor livers. Gastroenterology. 2003;124(1):91-6. PMID 12512033; doi:10.1053/gast.2003.50016.", "link": "https://doi.org/10.1053/gast.2003.50016", "areas": ["A", "E"], "unverified": false, "validated": "PubMed", "aliases": ["Wiesner2003MELD"]}, {"key": "Wigg2025ALFIE", "text": "Wigg AJ, Narayana S, Woodman RJ, Adams LA, Wundke R, Chinnaratha MA, et al. A randomized multicenter trial of a chronic disease management intervention for decompensated cirrhosis. The A ustra l ian L iver F a i lur e (ALFIE) trial. Hepatology. 2025;81(1):136-151. PMID 38825975; doi:10.1097/HEP.0000000000000862.", "link": "https://doi.org/10.1097/hep.0000000000000862", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Williams1988ASTALT", "text": "Williams AL, Hoofnagle JH. Ratio of serum aspartate to alanine aminotransferase in chronic hepatitis. Relationship to cirrhosis. Gastroenterology. 1988;95(3):734-9. PMID 3135226; doi:10.1016/s0016-5085(88)80022-2.", "link": "https://doi.org/10.1016/s0016-5085(88)80022-2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Williams2018LancetComm", "text": "Williams R, Alexander G, Armstrong I, Baker A, Bhala N, Camps-Walsh G, et al. Disease burden and costs from excess alcohol consumption, obesity, and viral hepatitis: fourth report of the Lancet Standing Commission on Liver Disease in the UK. Lancet. 2018;391(10125):1097-1107. PMID 29198562; doi:10.1016/S0140-6736(17)32866-0.", "link": "https://doi.org/10.1016/s0140-6736(17)32866-0", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Wolf2021Surveillance", "text": "Wolf E, Rich NE, Marrero JA, Parikh ND, Singal AG. Use of Hepatocellular Carcinoma Surveillance in Patients With Cirrhosis: A Systematic Review and Meta-Analysis. Hepatology. 2021;73(2):713-725. PMID 32383272; PMCID PMC7648722; doi:10.1002/hep.31309.", "link": "https://doi.org/10.1002/hep.31309", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Wong2021CONFIRM", "text": "Wong F, Pappas SC, Curry MP, Reddy KR, Rubin RA, Porayko MK, et al. Terlipressin plus Albumin for the Treatment of Type 1 Hepatorenal Syndrome. N Engl J Med. 2021;384(9):818-828. PMID 33657294; doi:10.1056/NEJMoa2008290.", "link": "https://doi.org/10.1056/nejmoa2008290", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Wong2022APT", "text": "Wong F, Pappas SC, Reddy KR, Vargas H, Curry MP, Sanyal A, et al. Terlipressin use and respiratory failure in patients with hepatorenal syndrome type 1 and severe acute-on-chronic liver failure. Aliment Pharmacol Ther. 2022;56(8):1284-1293. PMID 35995728; PMCID PMC9804971; doi:10.1111/apt.17195.", "link": "https://doi.org/10.1111/apt.17195", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Xie2014HepatolRes", "text": "Xie YD, Feng B, Gao Y, Wei L. Effect of abstinence from alcohol on survival of patients with alcoholic cirrhosis: A systematic review and meta-analysis. Hepatol Res. 2014;44(4):436-49. PMID 23607793; doi:10.1111/hepr.12131.", "link": "https://doi.org/10.1111/hepr.12131", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Yao2001UCSF", "text": "Yao FY, Ferrell L, Bass NM, Watson JJ, Bacchetti P, Venook A, et al. Liver transplantation for hepatocellular carcinoma: expansion of the tumor size limits does not adversely impact survival. Hepatology. 2001;33(6):1394-403. PMID 11391528; doi:10.1053/jhep.2001.24563.", "link": "https://doi.org/10.1053/jhep.2001.24563", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Yau2025CheckMate9DW", "text": "Yau T, Galle PR, Decaens T, Sangro B, Qin S, da Fonseca LG, et al. Nivolumab plus ipilimumab versus lenvatinib or sorafenib as first-line treatment for unresectable hepatocellular carcinoma (CheckMate 9DW): an open-label, randomised, phase 3 trial. Lancet. 2025;405(10492):1851-1864. PMID 40349714; doi:10.1016/S0140-6736(25)00403-9.", "link": "https://doi.org/10.1016/s0140-6736(25)00403-9", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Yoo2023ED", "text": "Yoo HJ, Lee B, Jung EA, Kim SG, Kim YS, Yoo JJ. Prevalence and risk factors of erectile dysfunction in patients with liver cirrhosis: a systematic review and meta-analysis. Hepatol Int. 2023;17(2):452-462. PMID 34799837; doi:10.1007/s12072-021-10270-y.", "link": "https://doi.org/10.1007/s12072-021-10270-y", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Younossi1999CLDQ", "text": "Younossi ZM, Guyatt G, Kiwi M, Boparai N, King D. Development of a disease specific questionnaire to measure health related quality of life in patients with chronic liver disease. Gut. 1999;45(2):295-300. PMID 10403745; PMCID PMC1727607; doi:10.1136/gut.45.2.295.", "link": "https://doi.org/10.1136/gut.45.2.295", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Younossi2019T2D", "text": "Younossi ZM, Golabi P, de Avila L, Paik JM, Srishord M, Fukui N, et al. The global epidemiology of NAFLD and NASH in patients with type 2 diabetes: A systematic review and meta-analysis. J Hepatol. 2019;71(4):793-801. PMID 31279902; doi:10.1016/j.jhep.2019.06.021.", "link": "https://doi.org/10.1016/j.jhep.2019.06.021", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Younossi2023Hepatology", "text": "Younossi ZM, Golabi P, Paik JM, Henry A, Van Dongen C, Henry L. The global epidemiology of nonalcoholic fatty liver disease (NAFLD) and nonalcoholic steatohepatitis (NASH): a systematic review. Hepatology. 2023;77(4):1335-1347. PMID 36626630; PMCID PMC10026948; doi:10.1097/HEP.0000000000000004.", "link": "https://doi.org/10.1097/hep.0000000000000004", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Younossi2025Prev", "text": "Younossi ZM, de Avila L, Racila A, Nader F, Paik J, Henry L, et al. Prevalence and predictors of cirrhosis and portal hypertension in the United States. Hepatology. 2025;82(5):1229-1240. PMID 39879587; doi:10.1097/HEP.0000000000001243.", "link": "https://doi.org/10.1097/hep.0000000000001243", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Yu2016PPI", "text": "Yu T, Tang Y, Jiang L, Zheng Y, Xiong W, Lin L. Proton pump inhibitor therapy and its association with spontaneous bacterial peritonitis incidence and mortality: A meta-analysis. Dig Liver Dis. 2016;48(4):353-9. PMID 26795544; doi:10.1016/j.dld.2015.12.009.", "link": "https://doi.org/10.1016/j.dld.2015.12.009", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Yuen2018NRDP", "text": "Yuen MF, Chen DS, Dusheiko GM, Janssen HLA, Lau DTY, Locarnini SA, et al. Hepatitis B virus infection. Nat Rev Dis Primers. 2018;4:18035. PMID 29877316; doi:10.1038/nrdp.2018.35.", "link": "https://doi.org/10.1038/nrdp.2018.35", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zanger2013", "text": "Zanger UM, Schwab M. Cytochrome P450 enzymes in drug metabolism: regulation of gene expression, enzyme activities, and impact of genetic variation. Pharmacol Ther. 2013;138(1):103-41. PMID 23333322; doi:10.1016/j.pharmthera.2012.12.007.", "link": "https://doi.org/10.1016/j.pharmthera.2012.12.007", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zeng2026COST", "text": "Zeng C, Aby ES, Bizup G, Zhu E, Hays RD, Edelen MO, et al. Evaluation of the comprehensive score for financial toxicity measure in a multicenter cohort of adults with advanced liver disease. J Patient Rep Outcomes. 2026;10(1). PMID 42295511; PMCID PMC13500444; doi:10.1186/s41687-026-01104-2.", "link": "https://doi.org/10.1186/s41687-026-01104-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Zhang2004Screening", "text": "Zhang BH, Yang BH, Tang ZY. Randomized controlled trial of screening for hepatocellular carcinoma. J Cancer Res Clin Oncol. 2004;130(7):417-22. PMID 15042359; PMCID PMC12161851; doi:10.1007/s00432-004-0552-0.", "link": "https://doi.org/10.1007/s00432-004-0552-0", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Zhang2022PSCIBD", "text": "Zhang Y, Gao X, He Z, Jia H, Chen M, Wang X, et al. Prevalence of inflammatory bowel disease in patients with primary sclerosing cholangitis: A systematic review and meta-analysis. Liver Int. 2022;42(8):1814-1822. PMID 35689520; doi:10.1111/liv.15339.", "link": "https://doi.org/10.1111/liv.15339", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zhang2025BMCGastro", "text": "Zhang Y, Luo M, Ming Y. Global burden of cirrhosis and other chronic liver diseases caused by specific etiologies from 1990 to 2021. BMC Gastroenterol. 2025;25(1):641. PMID 40973942; PMCID PMC12447626; doi:10.1186/s12876-025-04264-5.", "link": "https://doi.org/10.1186/s12876-025-04264-5", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Zhang2026Xeno", "text": "Zhang W, Xu Q, Xu K, Jiang R, Wang S, Zheng M, et al. Genetically engineered pig-to-human liver xenotransplantation. J Hepatol. 2026;84(3):587-598. PMID 41076089; doi:10.1016/j.jhep.2025.08.044.", "link": "https://doi.org/10.1016/j.jhep.2025.08.044", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zipprich2012", "text": "Zipprich A, Garcia-Tsao G, Rogowski S, Fleig WE, Seufferlein T, Dollinger MM. Prognostic indicators of survival in patients with compensated and decompensated cirrhosis. Liver Int. 2012;32(9):1407-14. PMID 22679906; PMCID PMC3713489; doi:10.1111/j.1478-3231.2012.02830.x.", "link": "https://doi.org/10.1111/j.1478-3231.2012.02830.x", "areas": ["A"], "unverified": false, "validated": "PubMed"}];
/* =============== home: a liver going from healthy, through scarring, to cirrhosis, and partly back =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of figures: a cited one can replace them once research exists.
   HERO_CAP[0] is the usual caption; HERO_CAP[1] is shown while the scene is in the 'cause removed' phase. */
const HERO_CAP=['Schematic, not to scale: the liver, the lobule and the gauge show a direction of change, not measurements. Module 1.3 tells the story with sources.',
  'Schematic, not to scale. How far scarring can regress once its cause is treated, and for whom, is set out with sources in module 1.3.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  /* five schematic phases along the scrubber */
  const PH=[{from:0,t:'Healthy liver',sub:'smooth tissue, quiet stellate cells',k:'healthy',kn:'healthy'},
    {from:.18,t:'Repeated injury',sub:'stellate cells switch on and make collagen',k:'injury',kn:'injury'},
    {from:.38,t:'Fibrosis',sub:'scar spreads out from the portal areas',k:'fibrosis',kn:'fibrosis'},
    {from:.6,t:'Cirrhosis',sub:'scar bridges the liver into nodules',k:'cirrhosis',kn:'cirrhosis'},
    {from:.8,t:'Cause removed',sub:'scar can thin and pressure ease, in part',k:'cause removed',kn:'cause gone'}];
  const phase=t=>phaseOf(PH,t);
  function state(t){const reg=ramp(t,.82,.98);
    const act=ramp(t,.16,.32)*(1-.65*reg);/* stellate activation, 0 quiescent .. 1 myofibroblast */
    const fib=ramp(t,.22,.72)*4;/* METAVIR-like 0..4 for the drawing only */
    const lob=ramp(t,.26,.7);
    const pr=clamp(.1+ramp(t,.36,.74)*.8-reg*.32);/* schematic pressure, 0..1 of the dial */
    return {reg,act,fib,lob,pr}}
  function draw(t){const N=vb(svg,'520 300','400 300');const S=state(t),p=phase(t),P=PH[p];
    const L=N?{lx:20,ly:30,vx:118,vy:156,vs:.95,bx:300,by:116,br:50,gx:300,gy:224,gr:34,tx:20,ty:268,tw:360}
             :{lx:24,ly:34,vx:150,vy:162,vs:1.2,bx:352,by:118,br:56,gx:466,gy:128,gr:40,tx:24,ty:264,tw:472};
    let s=`<defs>${marker('heroA','var(--muted)')}</defs>`;
    s+=`<text x="${L.lx}" y="${L.ly}" class="t-big" style="fill:${p===3?'var(--liver)':p===4?'var(--rx)':'var(--ink)'}">${P.t}</text>`;
    s+=`<text x="${L.lx}" y="${L.ly+18}" class="t-sm">${P.sub}</text>`;
    /* the liver */
    s+=liver(L.vx,L.vy,L.vs,{fib:S.fib,regress:S.reg,seed:11}).svg;
    /* leader to the magnified lobule */
    s+=`<path d="M${f1(L.vx+40*L.vs)} ${f1(L.vy-14*L.vs)}L${f1(L.bx-L.br-4)} ${f1(L.by+6)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 4"/><circle cx="${f1(L.vx+40*L.vs)}" cy="${f1(L.vy-14*L.vs)}" r="4" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    s+=lobule(L.bx,L.by,L.br/1.16,{flow:(t*26)%1,fib:S.lob*(1-.5*S.reg),act:S.act,clip:true,id:'heroLb'}).svg;
    if(!N)s+=`<text x="${L.bx}" y="${L.by+L.br+16}" class="t-xs t-mid">one lobule, magnified</text>`;
    /* the portal-pressure gauge: a direction, not a number */
    s+=gauge(L.gx,L.gy,L.gr,S.pr,1,{lo:'low',hi:'high',label:'portal pressure',bands:[{to:.45,col:'var(--panel-2)'},{to:1,col:'var(--bile)'}]});
    /* phase strip */
    const sw=L.tw/PH.length;
    PH.forEach((q,i)=>{const on=i===p,x=L.tx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.ty}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?(i===4?'var(--rx)':i===3?'var(--liver-fill)':'var(--brand)'):'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.ty+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${N?q.kn:q.k}</text>`});
    const mx=L.tx+L.tw*t;s+=`<circle cx="${f1(mx)}" cy="${L.ty+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const c=HERO_CAP[p===4?1:0];if(cap.textContent!==c)cap.textContent=c;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,15000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 What cirrhosis is =============== */
/* Main scrubber "Who has cirrhosis?": four scenes (worldwide burden, causes, silent at first, what it costs),
   every number from research pass A. Second interactive: a 'words matter' flip set. */
const WH_STEPS=[
 {from:0,at:.2,k:'Scene 1 · worldwide',t:'Worldwide',
  txt:`In 2017 an estimated 112 million people (95% UI 107–119 million) were living with compensated cirrhosis and 10.6 million with decompensated cirrhosis. That year cirrhosis and other chronic liver diseases caused more than 1.32 million deaths, up from fewer than 899,000 in 1990: 2.4% of all deaths, against 1.9% in 1990. Two-thirds of the deaths were in men. <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup> GBD 2021 counted 1,425,142 deaths. <sup class="c" data-ref="Tham2025" title="Source 460">460</sup> Death counts rose mainly because the world's population grew and aged: the age-standardised death rate actually fell, from 21.0 to 16.5 per 100,000. <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup>`,
  pt:`More than 100 million people around the world are estimated to live with early-stage cirrhosis, most of them without knowing it. <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup>`,
  hook:`GBD 2017: more than 1.32 million deaths, 2.4% of all deaths. Counts up, age-standardised rate down (21.0 → 16.5 per 100,000). <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup>`},
 {from:.25,at:.27,k:'Scene 2 · causes',t:'Causes',
  txt:`The ring shows which causes cirrhosis deaths were attributed to in 2017. In men: hepatitis B 31.5%, alcohol-related liver disease 27.3%, hepatitis C 25.5%, NASH 7.7%, other 8.0%. In women the NASH and "other" shares were higher (11.3% and 17.3%). In western sub-Saharan Africa hepatitis B caused 48.9% and hepatitis C 7.8%. NASH-related cirrhosis was the only cause whose age-standardised death rate did not fall from 1990 to 2017. <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup> By 2021, MASH accounted for 48.3 million of the 58.4 million new cases of cirrhosis and other chronic liver diseases, and was the only cause with a rising incidence rate. <sup class="c" data-ref="Tham2025" title="Source 460">460</sup>`,
  pt:`Which cause leads depends on where you live and what you count. Viruses still cause the most deaths worldwide; fatty liver disease is the fastest-growing cause. <sup class="c" data-ref="Huang2023NRGH,Tham2025" title="Source 203,460">203,460</sup>`,
  hook:`Hepatitis B caused the largest share of cirrhosis deaths in 2017; NASH/MASH is the fastest-growing cause. <sup class="c" data-ref="GBD2020Cirrhosis,Tham2025" title="Source 172,460">172,460</sup>`},
 {from:.5,at:.72,k:'Scene 3 · silent at first',t:'Silent at first',
  txt:`How many US adults have cirrhosis depends on the yardstick. NHANES 1999–2010, using an AST-to-platelet ratio above 2 plus abnormal liver tests, found 0.27% (about 3 in 1,000). <sup class="c" data-ref="Scaglione2015" title="Source 406">406</sup> NHANES 2017–2020, using liver stiffness or FIB-4, found 2.6% (about 26 in 1,000), most of them with MASLD. <sup class="c" data-ref="Younossi2025Prev" title="Source 510">510</sup> Either way, most people do not know: 69% of the adults with cirrhosis in the earlier survey said they were unaware of having liver disease. <sup class="c" data-ref="Scaglione2015" title="Source 406">406</sup>`,
  pt:`Most people with early cirrhosis feel well. In one US survey, about 7 in 10 did not know they had it. <sup class="c" data-ref="Scaglione2015" title="Source 406">406</sup>`,
  hook:`NHANES 1999–2010: 69% of US adults with cirrhosis were unaware of liver disease. Viral hepatitis, diabetes and alcohol together had a population-attributable fraction of 53.5%. <sup class="c" data-ref="Scaglione2015" title="Source 406">406</sup>`},
 {from:.78,at:.95,k:'Scene 4 · what it costs',t:'What it costs',
  txt:`From 1999 to 2016 yearly US deaths from cirrhosis rose by 65%, to 34,174, with the steepest rise (10.5% a year from 2009) in people aged 25–34, driven entirely by alcohol-related liver disease. <sup class="c" data-ref="Tapper2018BMJ" title="Source 450">450</sup> The age-adjusted death rate rose from 14.9 to 21.9 per 100,000 between 2010 and 2021. <sup class="c" data-ref="Tapper2023JAMA" title="Source 453">453</sup> US inpatient costs for chronic liver disease rose from $14.9 billion in 2012 to $18.8 billion in 2016. <sup class="c" data-ref="Hirode2020" title="Source 199">199</sup> In the UK, incidence rose 45% over 1992–2001. <sup class="c" data-ref="Fleming2008UKIncidence" title="Source 160">160</sup> Liver transplant is the second most common solid-organ transplant, yet less than 10% of global need is met. <sup class="c" data-ref="Asrani2019JHep" title="Source 22">22</sup>`,
  pt:`Cirrhosis is becoming more common in many countries, including among younger adults, and it costs health systems billions. Much of it can be prevented. <sup class="c" data-ref="Tapper2018BMJ,Scaglione2015" title="Source 406,450">406,450</sup>`,
  hook:`US cirrhosis deaths rose 65% from 1999 to 2016 (to 34,174 a year); the fastest rise was in ages 25–34. <sup class="c" data-ref="Tapper2018BMJ" title="Source 450">450</sup>`}
];
const WH_CAPS=[
 'Each square is one million people; bars are yearly deaths, drawn to scale. GBD 2017 and GBD 2021. <sup class="c" data-ref="GBD2020Cirrhosis,Tham2025" title="Source 172,460">172,460</sup>',
 'Share of cirrhosis deaths by attributed cause, 2017. For western sub-Saharan Africa the source splits out only hepatitis B and C. <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup>',
 'Each dot is one US adult; the two counts come from two surveys with different definitions. The 100 people are the earlier survey\'s adults with cirrhosis. <sup class="c" data-ref="Scaglione2015,Younossi2025Prev" title="Source 406,510">406,510</sup>',
 'Bars are drawn to scale within each panel; the 1999 deaths bar is drawn from the published 65% rise. <sup class="c" data-ref="Tapper2018BMJ,Tapper2023JAMA,Hirode2020,Fleming2008UKIncidence" title="Source 160,199,450,453">160,199,450,453</sup>'];
const WH_WORDS=[
 {old:'alcoholic',new:'person with alcohol use disorder',why:`A label turns a health condition into an identity. Population studies show people with alcohol dependence are held more responsible for their condition and face more social rejection and structural discrimination than people with other mental disorders. <sup class="c" data-ref="Schomerus2011" title="Source 409">409</sup>`},
 {old:'alcoholic liver disease',new:'alcohol-related (alcohol-associated) liver disease',why:`AASLD guidance uses "alcohol-associated liver diseases" in place of the older term. <sup class="c" data-ref="Crabb2020AASLD" title="Source 88">88</sup> It names the cause without naming the person.`},
 {old:'non-alcoholic fatty liver disease',new:'MASLD',why:`In the 2023 Delphi consensus, 61% of panellists felt "nonalcoholic" and 66% felt "fatty" were stigmatising. The new name describes the metabolic cause instead. <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>`},
 {old:'a cirrhotic',new:'a person with cirrhosis',why:`89% of people with cirrhosis in one survey agreed with at least one stigma statement, and more stigma went with less care-seeking. Person-first language keeps the person in view. <sup class="c" data-ref="VaughnSandler2014" title="Source 480">480</sup>`},
 {old:'drug abuser',new:'person who uses or injects drugs',why:`A review of 28 studies found negative attitudes among health professionals towards people with substance use disorders were common, and they reduced people's engagement in care. <sup class="c" data-ref="vanBoekel2013" title="Source 476">476</sup>`},
 {old:'self-inflicted',new:'a liver disease with many causes',why:`Cirrhosis follows fatty liver disease, viral hepatitis, alcohol, autoimmune, cholestatic and inherited conditions; it is not caused by alcohol alone. <sup class="c" data-ref="Gines2021Lancet" title="Source 180">180</sup> Blame is a barrier to care, not a medical fact. <sup class="c" data-ref="VaughnSandler2014" title="Source 480">480</sup>`}];

inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote'),cap=$('#whCap');
  const COL={hbv:'var(--portal)',hcv:'var(--nh3)',alc:'var(--liver-fill)',nash:'var(--bile)',oth:'var(--scar-line)'};
  const CAUSE=[['hbv','Hepatitis B'],['hcv','Hepatitis C'],['alc','Alcohol-related'],['nash','NASH (MASH)'],['oth','Other']];
  const DS={m:[31.5,25.5,27.3,7.7,8.0],f:[24.0,26.7,20.6,11.3,17.3],w:[48.9,7.8,0,0,43.3]};
  const T=(x,y,txt,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const arc=(cx,cy,r0,r1,a0,a1)=>{if(a1-a0<1e-4)return '';const lg=a1-a0>Math.PI?1:0,P=(r,a)=>f1(cx+r*Math.sin(a))+' '+f1(cy-r*Math.cos(a));
    return `M${P(r1,a0)}A${r1} ${r1} 0 ${lg} 1 ${P(r1,a1)}L${P(r0,a1)}A${r0} ${r0} 0 ${lg} 0 ${P(r0,a0)}Z`};
  const pick=(()=>{const r=rng(42),s=new Set();while(s.size<26)s.add(Math.floor(r()*1000));return [...s]})();
  const fmtK=n=>Math.round(n).toLocaleString('en-US');
  let setActive=()=>{};

  function sceneWorld(t,N){const u=ramp(t,.005,.17);let s='';
    const g=N?{x:72,y:78,c:16,d:16}:{x:28,y:80,c:16,d:16};
    s+=T(g.x,g.y-12,'People living with cirrhosis, 2017','t-sm','fill:var(--ink)');
    const fill=u*122.6;
    for(let i=0;i<123;i++){const cx=g.x+(i%g.c)*g.d,cy=g.y+Math.floor(i/g.c)*g.d,dec=i>=112,on=i<fill;
      const w=i===122?14*.6:14;
      s+=`<rect x="${cx}" y="${cy}" width="14" height="14" rx="2.5" style="fill:var(--panel-2)"/>`;
      if(on)s+=`<rect x="${cx}" y="${cy}" width="${f1(w)}" height="14" rx="2.5" style="fill:${dec?'var(--bile)':'var(--brand)'}"/>`}
    const ly=g.y+8*g.d+16;
    s+=`<rect x="${g.x}" y="${ly-9}" width="11" height="11" rx="2" style="fill:var(--brand)"/>`+T(g.x+17,ly,`${Math.round(Math.min(fill,112))} million compensated`,'t-sm','fill:var(--ink)');
    s+=`<rect x="${g.x}" y="${ly+9}" width="11" height="11" rx="2" style="fill:var(--bile)"/>`+T(g.x+17,ly+18,`${f1(clamp(fill-112,0,10.6))} million decompensated`,'t-sm','fill:var(--ink)');
    s+=T(g.x,ly+36,'one square = 1 million people','t-xs');
    /* deaths bars */
    const B=N?{x0:84,dx:96,w:58,base:500,h:150,ty:330}:{x0:410,dx:100,w:64,base:300,h:176,ty:68};
    s+=T(N?40:B.x0-14,B.ty,'Deaths per year','t-sm','fill:var(--ink)')+T(N?40:B.x0-14,B.ty+14,'cirrhosis and other chronic liver diseases','t-xs');
    const D=[['1990',.899,'< 0.90 M'],['2017',1.32,'> 1.32 M'],['2021',1.425,'1.43 M']];
    s+=`<line x1="${B.x0-14}" x2="${B.x0+2*B.dx+B.w+14}" y1="${B.base}" y2="${B.base}" class="axis"/>`;
    D.forEach(([yr,v,l],i)=>{const g2=ramp(t,.03+i*.045,.1+i*.045),h=B.h*v/1.5*g2,x=B.x0+i*B.dx;
      s+=`<rect x="${x}" y="${f1(B.base-h)}" width="${B.w}" height="${f1(h)}" rx="3" style="fill:var(--liver-fill);opacity:${i===2?.75:1}"/>`;
      s+=T(x+B.w/2,B.base+15,yr,'t-sm t-mid');
      if(g2>.05)s+=T(x+B.w/2,B.base-h-7,l,'t-lbl t-mid')});
    const sx=N?40:B.x0-14,sy=N?B.base+38:B.base+38;
    if(t>.08){s+=T(sx,sy,'2.4% of all deaths in 2017 (1.9% in 1990)','t-sm','fill:var(--ink)');
      s+=T(sx,sy+16,'age-standardised death rate fell: 21.0 → 16.5 per 100,000','t-xs')}
    return s}

  function sceneCauses(t,N){let s='';
    const a=ramp(t,.29,.33),b=ramp(t,.38,.42);
    const V=DS.m.map((m,i)=>lerp(lerp(m,DS.f[i],a),DS.w[i],b));
    const who=t<.31?['Men','worldwide, 2017']:t<.40?['Women','worldwide, 2017']:['Western','sub-Saharan Africa'];
    const D=N?{cx:200,cy:182,r1:104,r0:60}:{cx:178,cy:212,r1:118,r0:68};
    const tot=V.reduce((x,y)=>x+y,0);let ang=0;
    V.forEach((v,i)=>{const a1=ang+v/tot*2*Math.PI;s+=`<path d="${arc(D.cx,D.cy,D.r0,D.r1,ang,a1)}" style="fill:${COL[CAUSE[i][0]]};stroke:var(--panel);stroke-width:2${b>.5&&i===4?';opacity:.55':''}"/>`;
      if(v>6){const m=(ang+a1)/2,rr=(D.r0+D.r1)/2;s+=`<text x="${f1(D.cx+rr*Math.sin(m))}" y="${f1(D.cy-rr*Math.cos(m)+4)}" class="t-mid" style="font:700 12px var(--body);fill:var(--panel)">${Math.round(v)}%</text>`}
      ang=a1});
    s+=T(D.cx,D.cy-6,who[0],'t-big t-mid')+T(D.cx,D.cy+11,who[1],'t-xs t-mid')+T(D.cx,D.cy+24,'cirrhosis deaths','t-xs t-mid');
    const L=N?{x:40,y:318,dy:30,bw:2.6}:{x:338,y:96,dy:40,bw:3.6};
    s+=T(L.x,L.y-22,'Share of deaths by attributed cause','t-sm','fill:var(--ink)');
    CAUSE.forEach(([k,n],i)=>{const y=L.y+i*L.dy,v=V[i],w=b>.5;
      s+=`<rect x="${L.x}" y="${y-10}" width="12" height="12" rx="2" style="fill:${COL[k]}"/>`;
      s+=T(L.x+20,y,n,'t-lbl');
      const txt=w&&(i===2||i===3)?'—':w&&i===4?'43.3% (rest, not split)':f1(v)+'%';
      s+=T(L.x+(N?320:340),y,txt,'t-sm t-end','fill:var(--ink)');
      s+=`<rect x="${L.x+20}" y="${y+5}" width="${f1(Math.max(1,v*L.bw))}" height="5" rx="2.5" style="fill:${COL[k]};opacity:.7"/>`});
    /* the fastest-growing cause */
    const my=N?498:L.y+5*L.dy+22,mx=L.x,mw=N?320:340;
    s+=T(mx,my,'New cases, 2021: MASH 48.3 of 58.4 million','t-sm','fill:var(--ink)');
    s+=`<rect x="${mx}" y="${my+8}" width="${mw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${mx}" y="${my+8}" width="${f1(mw*48.3/58.4*ramp(t,.27,.4))}" height="10" rx="5" style="fill:var(--bile)"/>`;
    s+=T(mx,my+34,'the only cause with a rising incidence rate','t-xs');
    return s}

  function sceneSilent(t,N){let s='';
    const G=N?{x:34,y:76,d:8.4,r:2.9}:{x:28,y:84,d:7.7,r:2.7};
    const a=Math.round(ramp(t,.515,.575)*3),b=Math.round(ramp(t,.6,.66)*23);
    s+=T(G.x,G.y-14,'1,000 US adults','t-sm','fill:var(--ink)');
    for(let i=0;i<1000;i++){const x=G.x+(i%40)*G.d,y=G.y+Math.floor(i/40)*G.d,k=pick.indexOf(i);
      if(k>-1&&k<a)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(G.r+1.3)}" style="fill:var(--liver)"/>`;
      else if(k>=3&&k<3+b)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(G.r+.9)}" style="fill:var(--panel);stroke:var(--liver-fill);stroke-width:1.8"/>`;
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(G.r)}" style="fill:var(--scar-line);opacity:.35"/>`}
    const cy=G.y+25*G.d+12;
    s+=`<circle cx="${G.x+4}" cy="${cy-4}" r="4.5" style="fill:var(--liver)"/>`+T(G.x+14,cy,`${a} in 1,000 · blood-test definition, 1999–2010`,'t-sm','fill:var(--ink)');
    if(b>0)s+=`<circle cx="${G.x+4}" cy="${cy+14}" r="4" style="fill:var(--panel);stroke:var(--liver-fill);stroke-width:1.8"/>`+T(G.x+14,cy+18,`${3+b} in 1,000 · liver stiffness or FIB-4, 2017–2020`,'t-sm','fill:var(--ink)');
    if(b>=23)s+=T(G.x,cy+36,'about a 10-fold gap: different yardsticks, different eras','t-xs');
    /* 100 people with cirrhosis */
    const P=N?{x:24,y:398,d:17,s:14}:{x:410,y:84,d:25,s:19};
    const un=Math.round(ramp(t,.64,.745)*69);
    s+=T(P.x,P.y-14,N?'100 adults with cirrhosis, 1999–2010':'100 US adults with cirrhosis, 1999–2010','t-sm','fill:var(--ink)');
    for(let i=0;i<100;i++){const x=P.x+(i%10)*P.d+P.d/2,y=P.y+Math.floor(i/10)*P.d;s+=person(x,y,P.s,i<un?'var(--bile)':'var(--brand)')}
    const cx=N?P.x+10*P.d+20:P.x,cyy=N?P.y+30:P.y+10*P.d+24;
    s+=`<text x="${cx}" y="${cyy}" class="t-big" style="font-size:${N?34:30}px;fill:var(--accent)">${un}</text>`;
    s+=T(cx+(N?0:46),cyy+(N?20:-9),N?'did not know':'did not know they had','t-sm','fill:var(--ink)');
    s+=T(cx+(N?0:46),cyy+(N?36:4),N?'they had liver disease':'liver disease','t-sm','fill:var(--ink)');
    if(N){s+=`<rect x="${cx}" y="${cyy+56}" width="11" height="11" rx="2" style="fill:var(--brand)"/>`+T(cx+16,cyy+66,'knew','t-xs')+`<rect x="${cx}" y="${cyy+74}" width="11" height="11" rx="2" style="fill:var(--bile)"/>`+T(cx+16,cyy+84,'unaware','t-xs')}
    return s}

  function sceneCost(t,N){let s='';
    const PN=[
     {h:'US cirrhosis deaths per year',r:[['1999',34174/1.65,''],['2016',34174,'34,174 (+65%)']],max:36000},
     {h:'US age-adjusted cirrhosis deaths per 100,000',r:[['2010',14.9,'14.9'],['2021',21.9,'21.9']],max:24},
     {h:'US inpatient costs, chronic liver disease',r:[['2012',14.9,'$14.9 bn'],['2016',18.8,'$18.8 bn']],max:21},
     {h:'UK incidence per 100,000 person-years',r:[['1992',12.05,'12.05'],['2001',16.99,'16.99']],max:19}];
    PN.forEach((p,i)=>{const o=N?{x:24,y:72+i*112,w:352}:{x:i%2?372:28,y:i<2?80:212,w:320};
      const bw=o.w-128,g=ramp(t,.79+i*.03,.87+i*.03);
      s+=`<rect x="${o.x-10}" y="${o.y-22}" width="${o.w+20}" height="${N?100:118}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
      s+=T(o.x,o.y-4,p.h,'t-sm','fill:var(--ink)');
      p.r.forEach(([yr,v,l],j)=>{const y=o.y+14+j*(N?34:40),w=bw*v/p.max*g;
        s+=T(o.x,y+12,yr,'t-sm');
        s+=`<rect x="${o.x+40}" y="${y}" width="${f1(w)}" height="${N?16:18}" rx="3" style="fill:${j?'var(--liver-fill)':'var(--scar-line)'}"/>`;
        if(l&&g>.2)s+=T(o.x+46+w,y+13,l,'t-lbl')})});
    const fy=N?528:356;
    if(t>.86){if(N){s+=T(24,fy,'Liver transplant: the second most common solid-organ','t-xs')+T(24,fy+14,'transplant, yet less than 10% of global need is met','t-xs')}
      else s+=T(28,fy,'Liver transplant: the second most common solid-organ transplant, yet less than 10% of global need is met.','t-xs')}
    return s}

  function draw(t){const N=vb(svg,'720 380','400 560');const p=phaseOf(WH_STEPS,t),P=WH_STEPS[p];
    let s=T(N?24:28,N?30:30,P.t,'t-big','font-size:19px');
    s+=T(N?24:28,N?48:48,['How many people live with cirrhosis, and die of it','Which causes lie behind cirrhosis deaths','Most people with cirrhosis do not know they have it','Deaths, rates and costs are rising'][p],'t-sm');
    s+=[sceneWorld,sceneCauses,sceneSilent,sceneCost][p](t,N);
    svg.innerHTML=s;
    note.innerHTML=noteHTML(P);setActive(p);
    if(cap._p!==p){cap._p=p;cap.innerHTML=WH_CAPS[p]}}

  const stop=playWire(rg,$('#whPlay'),draw,26000,'Replay','what');
  setActive=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* words matter: flip cards */
  const wb=$('#whWords');
  wb.innerHTML=WH_WORDS.map((w,i)=>`<button class="wcard" aria-pressed="false" data-wi="${i}" aria-label="Instead of '${w.old}', say '${w.new}'. Press to read why."><span class="in"><span class="f"><small>Instead of</small><span class="old">${w.old}</span><span class="hint">Tap to turn</span></span><span class="b"><small>Say</small><span class="new">${w.new}</span><p>${w.why}</p></span></span></button>`).join('');
  wb.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('.wcard');if(!b)return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='true'?'false':'true')});
};
/* =============== 1.2 The liver and what it does =============== */
const LI_STEPS=[
 {k:'Step 1 · blood in',t:'Two blood supplies',
  txt:`The liver is about 2.5% of body weight yet receives nearly 25% of the heart's output: 800–1200 mL of blood a minute. About 75–80% arrives through the portal vein, partly deoxygenated blood draining the spleen, stomach, intestines, gallbladder and pancreas. The hepatic artery brings the remaining ~25%, well oxygenated. The portal vein is a valveless, low-pressure circuit; the artery is a high-pressure one. When portal flow falls, arterial flow rises and can buffer 25–60% of the loss: the hepatic arterial buffer response. <sup class="c" data-ref="Eipel2010" title="Source 117">117</sup>`,
  pt:`Most of the liver's blood comes straight from the gut through the portal vein, so the liver sees what is absorbed from food and medicines first. A smaller artery adds oxygen-rich blood.`,
  hook:`Portal vein ≈75%, hepatic artery ≈25% of inflow. The liver gets ≈25% of cardiac output at ≈2.5% of body weight. <sup class="c" data-ref="Eipel2010" title="Source 117">117</sup>`},
 {k:'Step 2 · the lobule',t:'Corners to centre, zone by zone',
  txt:`The classic unit is a hexagonal lobule: plates of hepatocytes radiate around a central vein, with portal triads (branches of the hepatic artery, portal vein and bile duct) at the corners. Arterial and portal blood mix in the sinusoids and flow toward the central vein. Oxygen, nutrients and hormones fall along the way, so work divides into zones, from periportal zone 1 to pericentral zone 3; in reality a continuum. <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup> In mice, about 50% of liver genes are zonated. <sup class="c" data-ref="Halpern2017" title="Source 190">190</sup> Bile runs the other way, in canaliculi about 1 µm wide. <sup class="c" data-ref="Boyer2013" title="Source 47">47</sup> Zonation is often lost in liver disease. <sup class="c" data-ref="Kietzmann2017" title="Source 232">232</sup>`,
  pt:`Blood enters at the corners and drains to the middle. Cells near the corners get the most oxygen, cells near the centre the least, and they share out the work accordingly.`,
  hook:`Zone 1 = periportal, most oxygen. Zone 3 = pericentral, least oxygen. <sup class="c" data-ref="Trefts2017,Kietzmann2017" title="Source 232,467">232,467</sup>`},
 {k:'Step 3 · the cells',t:'Four cells along one sinusoid',
  txt:`Hepatocytes make up most of the liver's volume and do most of its metabolic and synthetic work; cholangiocytes line the bile ducts. <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup> The sinusoid lining (LSECs) is a sieve with windows of 50–180 nm and no tight junctions, the most permeable endothelium in mammals; in health it keeps portal pressure low and stellate cells quiet. <sup class="c" data-ref="Trefts2017,Poisson2017" title="Source 358,467">358,467</sup> Stellate cells sit in the space of Disse, are about 15% of resident liver cells, and store 80–90% of the liver's vitamin A. <sup class="c" data-ref="Friedman2008PhysiolRev" title="Source 165">165</sup> Kupffer cells, 80–90% of the body's tissue macrophages, wait inside the sinusoids, exposed to gut bacteria and endotoxin. <sup class="c" data-ref="Bilzer2006" title="Source 42">42</sup>`,
  pt:`Each tiny blood channel is shared by working liver cells, a sieve-like lining, star-shaped vitamin A stores and resident clean-up cells that catch germs coming from the gut.`,
  hook:`Stellate cells: space of Disse, vitamin A, the future scar-makers. Kupffer cells: resident liver macrophages. <sup class="c" data-ref="Friedman2008PhysiolRev,Bilzer2006" title="Source 42,165">42,165</sup>`},
 {k:'Step 4 · protein factory',t:'Albumin and clotting proteins',
  txt:`The liver makes 85–90% of circulating protein volume, including albumin, the most abundant at about 55% of plasma protein. <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup> Healthy people make about 10.5 g of albumin a day, and it turns over in about 25 days. Reduced synthesis in liver disease is the best-understood cause of chronically low albumin. <sup class="c" data-ref="Levitt2016" title="Source 263">263</sup> Clotting tests sit beside albumin in the severity scores: Pugh's version of the Child score added prothrombin time/INR, and MELD uses INR. <sup class="c" data-ref="Peng2016ChildMELD,Kamath2001MELD" title="Source 221,351">221,351</sup>`,
  pt:`Liver cells are protein factories. Albumin, the commonest protein in blood, comes from here, so a falling level can be a sign the liver is struggling.`,
  hook:`Albumin ≈55% of plasma protein; ≈10.5 g made a day; turnover ≈25 days. <sup class="c" data-ref="Trefts2017,Levitt2016" title="Source 263,467">263,467</sup>`},
 {k:'Step 5 · bile',t:'Bile flows against the blood',
  txt:`Bile is secreted into canaliculi (about 1 µm wide) formed between neighbouring hepatocytes. It flows countercurrent to portal blood, then through the canals of Hering into the bile ducts at the portal triads. ATP-binding cassette export pumps on the canalicular membrane drive secretion; about 5% of bile is dissolved solutes. <sup class="c" data-ref="Boyer2013" title="Source 47">47</sup> Most bilirubin in the blood is unconjugated; a raised conjugated (direct) bilirubin implies liver-cell disease or blocked bile flow in most settings. <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>`,
  pt:`Liver cells pump bile into hair-thin channels between them. It runs the opposite way to the blood, out toward the bile ducts.`,
  hook:`Blood: triad → central vein. Bile: central → triad. A raised direct bilirubin points to liver-cell disease or obstruction. <sup class="c" data-ref="Boyer2013,Kwo2017ACG" title="Source 47,249">47,249</sup>`},
 {k:'Step 6 · fuel',t:'The sugar bank',
  txt:`After a meal the liver stores glucose as glycogen. During fasting it releases glucose by breaking glycogen down and by making new glucose (gluconeogenesis), which becomes the main source in a prolonged fast; it also turns fatty acids into ketone bodies to fuel other tissues. <sup class="c" data-ref="Rui2014,Trefts2017" title="Source 394,467">394,467</sup> In cirrhosis the store is small: the state is described as "accelerated starvation", with gluconeogenesis starting early after short fasts, which drives muscle breakdown. <sup class="c" data-ref="Tsien2012,Plank2008" title="Source 357,469">357,469</sup> More in <a href="#nutrition" data-go="nutrition">Nutrition, muscle &amp; medicine safety</a>.`,
  pt:`The liver saves sugar after meals and pays it out between them. A scarred liver runs out quickly, so overnight the body starts using muscle.`,
  hook:`Cirrhosis = "accelerated starvation": the reason a late evening snack is studied. <sup class="c" data-ref="Tsien2012,Plank2008" title="Source 357,469">357,469</sup>`},
 {k:'Step 7 · clearing',t:'Ammonia to urea, medicines broken down',
  txt:`Ammonia is made mainly in the gut, from protein digestion, amino acid breakdown and bacterial urease. A healthy liver with an intact urea cycle keeps blood ammonia in the low 35–50 µM range. <sup class="c" data-ref="Rose2020" title="Source 392">392</sup> The liver disposes of this nitrogen as urea. <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup> About a dozen cytochrome P450 enzymes metabolise 70–80% of drugs in clinical use; CYP3A4, 2C9, 2C8, 2E1 and 1A2 are the most abundant in the liver. <sup class="c" data-ref="Zanger2013" title="Source 513">513</sup> Most medicines have not been adequately studied in cirrhosis. <sup class="c" data-ref="Lewis2013" title="Source 264">264</sup>`,
  pt:`The liver turns ammonia, a waste from digesting protein, into urea, and it breaks down most medicines. When it fails, both can build up.`,
  hook:`Urea cycle: ammonia → urea (healthy ammonia ≈35–50 µM). About 12 CYPs handle 70–80% of drugs; CYP3A4 is the most abundant. <sup class="c" data-ref="Rose2020,Zanger2013" title="Source 392,513">392,513</sup>`}
].map((s,i,a)=>Object.assign(s,{from:i/a.length,at:i/a.length+.5/a.length}));

const LI_FAIL={
 alb:{n:'Albumin',col:'var(--fluid)',
  lost:'Making albumin',sign:'Fluid in the belly (ascites) and swelling, though albumin is only part of the cause.',test:'Low serum albumin.',
  txt:`Reduced synthesis in liver disease is the best-understood cause of chronically low albumin. <sup class="c" data-ref="Levitt2016" title="Source 263">263</sup> But ascites is driven mainly by the kidneys holding on to sodium, triggered by arterial vasodilation, with portal hypertension directing the fluid into the abdomen. <sup class="c" data-ref="EASL2018Decomp,Schrier1988Hepatology" title="Source 106,410">106,410</sup> Albumin is one of the five Child–Pugh items and is part of MELD 3.0. <sup class="c" data-ref="Peng2016ChildMELD,Kim2021MELD3" title="Source 236,351">236,351</sup>`,go:'ascites',goT:'Ascites, infection & kidney injury'},
 clot:{n:'Clotting proteins',col:'var(--artery)',
  lost:'Making clotting proteins',sign:'Bleeding risk changes, but not in a simple "thin blood" way.',test:'Raised INR (prothrombin time).',
  txt:`Pugh's version of the Child score uses prothrombin time/INR, and MELD uses INR. <sup class="c" data-ref="Peng2016ChildMELD,Kamath2001MELD" title="Source 221,351">221,351</sup> A high INR in cirrhosis does not simply mean the blood is "thin": Baveno VII does not recommend fresh frozen plasma during variceal bleeding, because it will not correct the coagulopathy and may worsen portal hypertension. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup> In 4,729 paracenteses, severe bleeding was not related to INR or platelets. <sup class="c" data-ref="Pache2005" title="Source 342">342</sup>`,go:'scores',goT:'Child–Pugh & MELD scores'},
 bili:{n:'Bilirubin & bile',col:'var(--bile)',
  lost:'Clearing bilirubin into bile',sign:'Yellow skin and eyes (jaundice).',test:'Raised bilirubin, especially conjugated (direct).',
  txt:`A raised conjugated bilirubin implies liver-cell disease or blocked bile flow in most settings. <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup> Jaundice is one of the visible signs of decompensated cirrhosis, alongside ascites, confusion and variceal bleeding. <sup class="c" data-ref="deFranchis2022BavenoVII,Tapper2023JAMA" title="Source 97,453">97,453</sup> Bilirubin is in Child–Pugh, MELD and MELD 3.0. <sup class="c" data-ref="Peng2016ChildMELD,Kamath2001MELD,Kim2021MELD3" title="Source 221,236,351">221,236,351</sup>`,go:'tests',goT:'Blood tests, scans & biopsy'},
 nh3:{n:'Ammonia clearance',col:'var(--nh3)',
  lost:'Turning ammonia into urea',sign:'Confusion, sleepiness, personality change: hepatic encephalopathy.',test:'Diagnosed clinically; an ammonia level alone does not diagnose or stage it.',
  txt:`Ammonia comes mainly from the gut. It passes freely into the brain, where astrocytes remove it; ammonia "remains the central player" in hepatic encephalopathy, with inflammation also contributing. When the liver fails, muscle becomes an alternative ammonia sink, which is why muscle loss raises the risk. <sup class="c" data-ref="Rose2020" title="Source 392">392</sup> "High blood-ammonia levels alone do not add any diagnostic, staging, or prognostic value." <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>`,go:'encephalopathy',goT:'Hepatic encephalopathy'},
 glu:{n:'Fuel store',col:'var(--vita)',
  lost:'Storing glucose as glycogen',sign:'Muscle wasting and weakness (sarcopenia).',test:'Muscle measures (for example CT muscle index), not a single blood test.',
  txt:`Cirrhosis is a state of "accelerated starvation": gluconeogenesis starts early after short fasts, which drives muscle breakdown. <sup class="c" data-ref="Tsien2012,Plank2008" title="Source 357,469">357,469</sup> Sarcopenia affects "30%-70% of patients with end-stage liver disease" in AASLD guidance; a meta-analysis pooled 33%. <sup class="c" data-ref="Lai2021AASLD,Mazeaud2023" title="Source 255,294">255,294</sup>`,go:'nutrition',goT:'Nutrition, muscle & medicine safety'},
 drug:{n:'Medicine handling',col:'var(--rx)',
  lost:'Breaking down medicines',sign:'Medicines can build up or tip someone into confusion.',test:'Clinical review of every medicine; drug levels for some.',
  txt:`About a dozen CYP enzymes metabolise 70–80% of drugs. <sup class="c" data-ref="Zanger2013" title="Source 513">513</sup> Most medicines "have not been adequately studied in cirrhosis", and lower or less frequent doses are often recommended. <sup class="c" data-ref="Lewis2013" title="Source 264">264</sup> Opioid prescriptions were linked with more hepatic encephalopathy (adjusted HR 1.44 short-term, 1.83 chronic), and long-acting or high-dose benzodiazepines with benzodiazepine-associated encephalopathy. <sup class="c" data-ref="Moon2020Opioids,Lee2014BZD" title="Source 260,310">260,310</sup>`,go:'nutrition',goT:'Nutrition, muscle & medicine safety'},
 flow:{n:'Blood flow through',col:'var(--portal)',
  lost:'Letting portal blood pass easily',sign:'Swollen veins (varices), an enlarged spleen, fluid.',test:'Low platelets; pressure (HVPG) or stiffness measures.',
  txt:`Scar and nodules distort the architecture and activated stellate cells contract, raising resistance to sinusoidal flow. <sup class="c" data-ref="Bataller2005,Schuppan2008" title="Source 28,411">28,411</sup> A hepatic venous pressure gradient above 10 mmHg defines clinically significant portal hypertension. <sup class="c" data-ref="GarciaTsao2010" title="Source 171">171</sup> Platelets fall partly because an enlarged spleen holds on to them and thrombopoietin falls. <sup class="c" data-ref="Afdhal2008Platelets" title="Source 9">9</sup>`,go:'portal',goT:'Portal hypertension & varices'}
};

inits.liver=()=>{
  const svg=$('#liSvg'),rg=$('#liT'),N=LI_STEPS.length,seg=1/N;
  const Q=(u,a,b,c)=>[(1-u)*(1-u)*a[0]+2*(1-u)*u*b[0]+u*u*c[0],(1-u)*(1-u)*a[1]+2*(1-u)*u*b[1]+u*u*c[1]];
  const T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const TH=(x,y,txt,c='t-xs t-mid')=>T(x,y,txt,c,'fill:var(--ink);font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3.5px;stroke-linejoin:round');
  const lead=(x1,y1,x2,y2)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--muted);stroke-width:.8;opacity:.8"/>`;
  const kup=(x,y,s=1)=>`<path d="M${f1(x-14*s)} ${f1(y)}q2 -10 12 -9q4 -8 12 -2q9 1 6 9q6 6 -2 10q-4 8 -12 4q-8 6 -12 -2q-9 -2 -4 -10z" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.4"/><circle cx="${f1(x)}" cy="${f1(y+1)}" r="${f1(3.4*s)}" style="fill:var(--accent);opacity:.75"/>`;
  const bug=(x,y,a=1)=>`<rect x="${f1(x-4)}" y="${f1(y-1.6)}" width="8" height="3.2" rx="1.6" style="fill:var(--good);opacity:${f1(a)}"/>`;
  /* ---------- the seven close-ups, drawn in a 360 x 340 box ---------- */
  const SC=[
   /* 1: two blood supplies */
   (u,fl)=>{let s='';
    s+=`<rect x="10" y="50" width="112" height="58" rx="8" style="fill:var(--portal-soft)"/>`+T(66,68,'from the gut,','t-xs t-mid','fill:var(--ink)')+T(66,82,'spleen, stomach','t-xs t-mid','fill:var(--ink)')+T(66,96,'and pancreas','t-xs t-mid','fill:var(--ink)');
    s+=`<rect x="10" y="214" width="112" height="34" rx="8" style="fill:var(--bad-soft)"/>`+T(66,235,'from the aorta','t-xs t-mid','fill:var(--ink)');
    const pa=[122,82],pb=[190,92],pc=[236,150],aa=[122,230],ab=[190,222],ac=[236,176];
    s+=`<path d="M${pa}Q${pb} ${pc}" style="fill:none;stroke:var(--portal);stroke-width:16;stroke-linecap:round;opacity:.9"/>`;
    s+=`<path d="M${aa}Q${ab} ${ac}" style="fill:none;stroke:var(--artery);stroke-width:5.5;stroke-linecap:round"/>`;
    s+=liver(286,160,.62,{gb:false}).svg;
    for(let i=0;i<9;i++){const p=Q((fl+i/9)%1,pa,pb,pc);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="2.6" style="fill:var(--panel)"/>`}
    for(let i=0;i<3;i++){const p=Q((fl+i/3)%1,aa,ab,ac);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="2" style="fill:var(--panel)"/>`}
    s+=T(150,70,'portal vein','t-sm')+T(150,250,'hepatic artery','t-sm');
    const g=ease(ramp(u,.05,.7)),bw=320;
    s+=T(20,284,'share of blood flowing into the liver','t-xs');
    s+=`<rect x="20" y="292" width="${bw}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="20" y="292" width="${f1(bw*.75*g)}" height="18" rx="4" style="fill:var(--portal)"/><rect x="${f1(20+bw*.75*g)}" y="292" width="${f1(bw*.25*g)}" height="18" rx="4" style="fill:var(--artery)"/>`;
    if(g>.3)s+=T(28,305,`portal ${Math.round(75*g)}%`,'t-xs','fill:#fff;font-weight:700');
    if(g>.9)s+=T(336,305,'artery 25%','t-xs t-end','fill:#fff;font-weight:700');
    s+=T(20,328,'≈25% of cardiac output · ≈2.5% of body weight','t-xs');
    return s},
   /* 2: zones along one sinusoid */
   (u,fl)=>{let s='';const x0=48,x1=318,y0=130,y1=186,w=(x1-x0)/3;
    [['var(--artery)',.26],['var(--artery)',.14],['var(--portal)',.16]].forEach(([c,o],i)=>{s+=`<rect x="${f1(x0+i*w)}" y="${y0}" width="${f1(w)}" height="${y1-y0}" style="fill:${c};opacity:${o}"/>`});
    s+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" style="fill:none;stroke:var(--line)"/>`;
    for(let i=0;i<5;i++){const cx=x0+16+i*58;s+=hepatocyte(cx,y0-22,40,{seed:i+2})+hepatocyte(cx+20,y1+22,40,{seed:i+9})}
    /* triad and central vein */
    s+=`<circle cx="${x0-18}" cy="${f1((y0+y1)/2-6)}" r="9" style="fill:var(--portal)"/><circle cx="${x0-26}" cy="${f1((y0+y1)/2+10)}" r="5" style="fill:var(--artery)"/><circle cx="${x0-10}" cy="${f1((y0+y1)/2+12)}" r="4.5" style="fill:var(--bile);stroke:var(--accent)"/>`;
    s+=`<circle cx="${x1+20}" cy="${(y0+y1)/2}" r="13" style="fill:var(--panel);stroke:var(--portal);stroke-width:2"/>`;
    s+=T(x0-18,y1+56,'portal triad','t-xs t-mid')+T(x1+20,y1+56,'central vein','t-xs t-mid');
    for(let i=0;i<12;i++){const p=(fl*1.4+i/12)%1,x=lerp(x0,x1,p),y=y0+10+((i*37)%36);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:${i%4?'var(--portal)':'var(--artery)'};opacity:.85"/>`}
    /* bile: canaliculus above the upper plate, flowing the other way */
    const by=y0-50;s+=`<line x1="${x0}" x2="${x1}" y1="${by}" y2="${by}" style="stroke:var(--bile);stroke-width:3;opacity:.6"/>`;
    for(let i=0;i<7;i++){const p=1-((fl+i/7)%1);s+=`<circle cx="${f1(lerp(x0,x1,p))}" cy="${by}" r="2.4" style="fill:var(--bile)"/>`}
    s+=T(x1,by-8,'← bile (countercurrent)','t-xs t-end','fill:var(--accent)')+TH(x0+30,y1-6,'blood →');
    const lab=['zone 1','zone 2','zone 3'];
    lab.forEach((l,i)=>{if(u>i*.15)s+=TH(x0+w*i+w/2,y0+13,l)});
    /* oxygen wedge */
    const wy=268;s+=`<path d="M${x0} ${wy-9}L${x1} ${wy-1}L${x1} ${wy+1}L${x0} ${wy+9}Z" style="fill:var(--artery);opacity:.55"/>`+T(x0,wy+24,'oxygen high','t-xs')+T(x1,wy+24,'oxygen low','t-xs t-end');
    if(u>.45)s+=T(180,318,'≈50% of liver genes are zonated (mice)','t-xs t-mid','fill:var(--ink)');
    return s},
   /* 3: the four cells */
   (u,fl)=>{let s='';const ly0=124,ly1=176;
    for(let i=0;i<6;i++){s+=hepatocyte(42+i*56,72,50,{seed:i+1})+hepatocyte(42+i*56,238,50,{seed:i+11})}
    s+=`<rect x="10" y="${ly0-18}" width="340" height="18" style="fill:var(--scar);opacity:.35"/><rect x="10" y="${ly1}" width="340" height="22" style="fill:var(--scar);opacity:.35"/>`;
    s+=`<rect x="10" y="${ly0}" width="340" height="${ly1-ly0}" style="fill:var(--portal-soft)"/>`;
    s+=`<line x1="10" x2="350" y1="${ly0}" y2="${ly0}" style="stroke:var(--brand);stroke-width:3.4;stroke-dasharray:15 4"/><line x1="10" x2="350" y1="${ly1}" y2="${ly1}" style="stroke:var(--brand);stroke-width:3.4;stroke-dasharray:15 4"/>`;
    for(let i=0;i<14;i++){const p=(fl*1.2+i/14)%1;s+=`<circle cx="${f1(10+p*340)}" cy="${f1(ly0+9+(i*19)%34)}" r="3.2" style="fill:${i%5?'var(--artery)':'var(--portal)'};opacity:.7"/>`}
    s+=kup(132,150,1.1);
    for(let i=0;i<4;i++){const p=(fl*1.2+i/4)%1,x=10+p*120;if(x<118)s+=bug(x,138+i*7)}
    s+=stellate(238,187,.82,{act:0,ang:6});
    const L=[[.05,'hepatocytes: most of the work',16,26,42,48],[.2,'LSEC sieve: 50–180 nm windows',146,112,250,124],[.4,'stellate cell (vitamin A store)',96,212,226,192],[.6,'Kupffer cell catching gut bacteria',120,322,132,166]];
    L.forEach(([a,txt,tx,ty,px,py])=>{if(u>=a)s+=lead(tx+(tx>200?0:4),ty-4,px,py)+T(tx,ty,txt,'t-xs','fill:var(--ink)')});
    return s},
   /* 4: albumin and clotting proteins */
   (u,fl)=>{let s='';const hx=104,hy=160;
    s+=`<rect x="250" y="20" width="70" height="300" rx="10" style="fill:var(--portal-soft)"/>`;
    s+=hepatocyte(hx,hy,170,{seed:5});
    s+=T(hx,hy+102,'hepatocyte','t-xs t-mid');
    for(let i=0;i<14;i++){const p=(fl*1.5+i/14)%1,ang=(i*47%60-30)*Math.PI/180,alb=i%3>0;
      let x,y;if(p<.5){const q=p/.5;x=lerp(hx+20,262,q);y=hy+Math.sin(ang)*60*q}else{const q=(p-.5)/.5;x=262+(i%4)*14;y=hy+Math.sin(ang)*60+q*150}
      if(y>318||y<22)continue;
      s+=alb?`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="4.6" ry="3" style="fill:var(--fluid-fill);stroke:var(--fluid)"/>`:`<path d="M${f1(x)} ${f1(y-4)}l4 4l-4 4l-4 -4z" style="fill:var(--artery)"/>`}
    s+=`<ellipse cx="30" cy="300" rx="5" ry="3.2" style="fill:var(--fluid-fill);stroke:var(--fluid)"/>`+T(40,304,'albumin','t-xs');
    s+=`<path d="M110 296l4 4l-4 4l-4 -4z" style="fill:var(--artery)"/>`+T(120,304,'clotting proteins','t-xs');
    s+=T(285,14,'sinusoid','t-xs t-mid');
    const g=ramp(u,.05,.85);s+=T(20,30,'ALBUMIN MADE TODAY','t-xs')+`<text x="20" y="56" class="t-big" style="font-size:24px">${f1(10.5*g)} g</text>`+T(20,72,'of ≈10.5 g a day','t-xs');
    s+=T(20,330,'albumin ≈55% of plasma protein','t-xs');
    return s},
   /* 5: bile */
   (u,fl)=>{let s='';
    s+=`<rect x="20" y="40" width="40" height="230" rx="8" style="fill:var(--portal-soft)"/><rect x="300" y="40" width="40" height="230" rx="8" style="fill:var(--portal-soft)"/>`;
    for(let r=0;r<2;r++){s+=hepatocyte(120,100+r*110,104,{seed:r+3})+hepatocyte(240,100+r*110,104,{seed:r+7})}
    s+=`<rect x="175" y="44" width="10" height="236" rx="5" style="fill:var(--accent-soft);stroke:var(--bile);stroke-width:1.4"/>`;
    for(let i=0;i<10;i++){const p=(fl*1.3+i/10)%1;s+=`<circle cx="180" cy="${f1(50+p*226)}" r="2.6" style="fill:var(--bile)"/>`}
    for(let i=0;i<4;i++){const p=(fl*2+i/4)%1,y=70+i*60,side=i%2?1:-1;s+=`<circle cx="${f1(180+side*(26-22*p))}" cy="${y}" r="2.2" style="fill:var(--bile);opacity:${f1(1-p*.4)}"/>`}
    s+=`<circle cx="180" cy="306" r="14" style="fill:var(--bile);stroke:var(--accent);stroke-width:1.4"/>`+T(200,310,'bile duct (at the triad)','t-xs','fill:var(--ink)');
    for(let i=0;i<8;i++){const p=1-((fl+i/8)%1);[40,320].forEach(x=>{s+=`<circle cx="${x}" cy="${f1(48+p*214)}" r="2.6" style="fill:var(--artery);opacity:.7"/>`})}
    s+=T(40,32,'blood ↑','t-xs t-mid')+T(320,32,'blood ↑','t-xs t-mid')+T(180,32,'bile ↓','t-xs t-mid','fill:var(--accent)');
    if(u>.25)s+=lead(186,160,224,146)+T(226,148,'canaliculus ≈1 µm','t-xs','fill:var(--ink)');
    if(u>.5)s+=T(20,332,'export pumps push bile into the canaliculus; ≈5% of bile is solutes','t-xs');
    return s},
   /* 6: fuel */
   (u,fl)=>{let s='';const meal=u<.4,fast=u>=.4&&u<.72,cx=150,cy=176;
    const store=u<.4?ramp(u,0,.36):u<.72?1-ramp(u,.4,.72)*.85:.15*(1-ramp(u,.72,1));
    const ph=meal?'AFTER A MEAL: store':fast?'OVERNIGHT FAST: release':'PROLONGED FAST: make new glucose';
    s+=`<rect x="300" y="30" width="44" height="290" rx="10" style="fill:var(--portal-soft)"/>`+T(322,24,'blood','t-xs t-mid');
    s+=hepatocyte(cx,cy,190,{seed:4});
    const rr=rng(31);for(let i=0;i<26;i++){const a=rr()*6.28,d=18+rr()*52,on=i<store*26;if(on)s+=`<g transform="translate(${f1(cx+Math.cos(a)*d)} ${f1(cy+Math.sin(a)*d*.8)})">${[0,1,2,3,4].map(k=>`<circle cx="${f1(Math.cos(k*1.26)*3.4)}" cy="${f1(Math.sin(k*1.26)*3.4)}" r="1.8" style="fill:var(--vita)"/>`).join('')}</g>`}
    for(let i=0;i<6;i++){const p=(fl*1.6+i/6)%1,inward=meal;const x=inward?lerp(322,cx+70,p):lerp(cx+70,322,p),y=70+i*40;
      s+=`<g transform="translate(${f1(x)} ${y})"><path d="M0 -5l5 3v5l-5 3l-5 -3v-5z" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.3"/></g>`}
    if(!meal&&!fast){s+=T(34,300,'amino acids, lactate → new glucose','t-xs','fill:var(--ink)');for(let i=0;i<3;i++){const p=(fl*1.4+i/3)%1;s+=`<circle cx="${f1(lerp(20,cx-60,p))}" cy="${f1(262+i*8)}" r="2.4" style="fill:var(--liver)"/>`}
      s+=T(34,318,'fatty acids → ketone bodies','t-xs','fill:var(--ink)')}
    s+=T(12,26,ph,'t-sm','fill:var(--ink)');
    s+=`<g transform="translate(26 50)"><path d="M0 -5l5 3v5l-5 3l-5 -3v-5z" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.3"/></g>`+T(36,54,'glucose','t-xs');
    s+=`<g transform="translate(100 50)">${[0,1,2,3,4].map(k=>`<circle cx="${f1(Math.cos(k*1.26)*3.4)}" cy="${f1(Math.sin(k*1.26)*3.4)}" r="1.8" style="fill:var(--vita)"/>`).join('')}</g>`+T(110,54,'glycogen','t-xs');
    s+=`<rect x="190" y="44" width="90" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="190" y="44" width="${f1(90*store)}" height="10" rx="3" style="fill:var(--vita)"/>`+T(235,68,'glycogen store','t-xs t-mid');
    return s},
   /* 7: ammonia and medicines */
   (u,fl)=>{let s='';const hx=170,hy=150;
    s+=`<rect x="10" y="40" width="40" height="230" rx="8" style="fill:var(--portal-soft)"/>`+T(30,32,'from gut','t-xs t-mid');
    s+=hepatocyte(hx,hy,210,{seed:6});
    /* urea cycle wheel */
    const wx=hx-50,wy=hy-34,wr=26,rot=fl*360;
    s+=`<circle cx="${wx}" cy="${wy}" r="${wr}" style="fill:none;stroke:var(--nh3);stroke-width:2.4;stroke-dasharray:46 8" transform="rotate(${f1(rot)} ${wx} ${wy})"/>`+T(wx,wy-2,'urea','t-xs t-mid','fill:var(--ink)')+T(wx,wy+10,'cycle','t-xs t-mid','fill:var(--ink)');
    for(let i=0;i<4;i++){const p=(fl*1.3+i/4)%1;if(p<.7){const q=p/.7;s+=nh3(lerp(30,wx-wr,q),lerp(70+i*50,wy,q),{r:5.5})}
      else{const q=(p-.7)/.3;s+=`<rect x="${f1(lerp(wx,250,q)-12)}" y="${f1(lerp(wy+wr,286,q)-6)}" width="24" height="12" rx="6" style="fill:var(--kidney);opacity:.85"/>`}}
    s+=kidney(276,292,.85)+T(300,300,'kidneys','t-xs');
    /* CYP enzyme chopping medicines */
    const ex=hx+44,ey=hy+26,mo=Math.abs(Math.sin(fl*Math.PI*6))*.5;
    s+=`<path d="M${ex} ${ey}L${f1(ex+20*Math.cos(mo))} ${f1(ey-20*Math.sin(mo))}A20 20 0 1 0 ${f1(ex+20*Math.cos(mo))} ${f1(ey+20*Math.sin(mo))}Z" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.6"/>`+T(ex-6,ey+4,'CYP','t-xs t-mid','fill:var(--rx);font-weight:700');
    for(let i=0;i<3;i++){const p=(fl*1.1+i/3)%1;if(p<.6)s+=pill(lerp(350,ex+24,p/.6),ey-50+i*40*(1-p/.6)+ (p/.6)*50,18,{ang:20});
      else{const q=(p-.6)/.4;s+=`<circle cx="${f1(ex-10-q*30)}" cy="${f1(ey+20+q*40)}" r="2.2" style="fill:var(--rx)"/><circle cx="${f1(ex+q*20)}" cy="${f1(ey+24+q*44)}" r="2.2" style="fill:var(--rx)"/>`}}
    s+=T(12,326,'NH₃ (ammonia) → urea','t-xs','fill:var(--nh3)')+T(190,326,'medicines → broken down','t-xs','fill:var(--rx)');
    s+=T(350,30,`CYPs: 70–80% of drugs`,'t-xs t-end','fill:var(--ink)');
    return s}
  ];
  let setSt=()=>{};
  function draw(t){
    const nr=vb(svg,'720 380','400 650'),ph=phaseOf(LI_STEPS,t),u=clamp((t-LI_STEPS[ph].from)/seg),fl=(t*24)%1;
    const L=nr?{x:200,y:136,r:98}:{x:176,y:194,r:128},D=nr?{x:20,y:286}:{x:346,y:22};
    let s='';
    s+=T(nr?20:20,nr?14:26,'ONE LIVER LOBULE','t-sm','fill:var(--ink)');
    s+=lobule(L.x,L.y,L.r,{flow:fl,clip:true,id:'liLob',act:ph===2?0:undefined}).svg;
    const V=[...Array(6)].map((_,i)=>{const a=Math.PI/3*i+Math.PI/6;return [L.x+L.r*Math.cos(a),L.y+L.r*Math.sin(a)]});
    if(ph===0){V.forEach((p,i)=>{const dx=p[0]-L.x,dy=p[1]-L.y,k=.22+.08*Math.sin(fl*6.28+i);s+=`<line x1="${f1(p[0]+dx*k*1.3)}" y1="${f1(p[1]+dy*k*1.3)}" x2="${f1(p[0]+dx*.06)}" y2="${f1(p[1]+dy*.06)}" style="stroke:var(--portal);stroke-width:2" marker-end="url(#liArr)"/>`})}
    if(ph===1){const zr=[[.98,'var(--artery)',.16],[.66,'var(--artery)',.08],[.36,'var(--portal)',.18]];zr.forEach(([k,c,o])=>{s+=`<circle cx="${L.x}" cy="${L.y}" r="${f1(L.r*k)}" style="fill:${c};opacity:${o}"/>`});
      s+=TH(L.x,L.y-L.r*.8,'zone 1')+TH(L.x,L.y-L.r*.5,'zone 2')+TH(L.x,L.y-L.r*.22,'zone 3')}
    if(ph<=1){const b=V[1],ly=L.y+L.r*1.16+14;s+=TH(L.x,L.y+L.r*.13+13,'central vein')+lead(b[0]-6,b[1]+8,b[0]-36,ly-8)+T(b[0]-38,ly,'portal triad','t-xs t-end','fill:var(--ink)')}
    /* magnifier from a sinusoid to the close-up */
    if(ph>=2){const mx=L.x+L.r*.5,my=L.y-L.r*.08;s+=`<rect x="${f1(mx-13)}" y="${f1(my-9)}" width="26" height="18" rx="3" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`;
      s+=nr?lead(mx,my+9,D.x+180,D.y):lead(mx+13,my-9,D.x,D.y+20)+lead(mx+13,my+9,D.x,D.y+320)}
    s+=`<defs>${marker('liArr','var(--portal)')}</defs>`;
    s+=`<g transform="translate(${D.x} ${D.y})"><rect x="0" y="0" width="360" height="340" rx="12" style="fill:var(--field);stroke:var(--line)"/>${SC[ph](u,fl)}</g>`;
    svg.innerHTML=s;
    setSt(ph);
    $('#liRead').innerHTML=`<span>step <b>${ph+1} of ${N}</b></span><span><b>${LI_STEPS[ph].t}</b></span>`;
    $('#liNote').innerHTML=noteHTML(LI_STEPS[ph]);
  }
  const stop=playWire(rg,$('#liPlay'),draw,42000,'Replay','liver');
  setSt=stepWire($('#liSteps'),LI_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- what goes wrong when it fails ---------- */
  const fs=$('#liFailSvg'),on={alb:true};
  const ROWS=[['Albumin','alb','↓'],['INR','clot','↑'],['Platelets','flow','↓'],['Bilirubin','bili','↑'],['Ammonia*','nh3','↑'],['Muscle mass','glu','↓'],['Medicine levels','drug','↑']];
  function drawF(){
    const nr=vb(fs,'720 360','400 660');let s='';
    const fluid=clamp((on.alb?.35:0)+(on.flow?.45:0)),jaun=on.bili?.95:0,fog=on.nh3?.95:0;
    const B=nr?{x:104,y:20,s:1.1}:{x:100,y:24,s:1.18},R=nr?{x:220,y:30,s:.95}:{x:318,y:96,s:.95},P=nr?{x:24,y:340,w:352}:{x:468,y:20,w:236};
    s+=abdomen(B.x,B.y,B.s,{fluid,jaundice:jaun,liver:true,fib:on.flow?4:2.4}).svg;
    if(on.glu){s+=T(B.x,B.y+(nr?256:274),'muscle loss (sarcopenia)','t-xs t-mid','fill:var(--ink)')}
    s+=brain(R.x+ (nr?60:0),R.y+(nr?50:0),R.s*(nr?.8:1),{fog}).svg;
    if(on.drug)s+=pill(R.x+(nr?118:84),R.y+(nr?104:92),26,{ang:-20})+T(R.x+(nr?112:84),R.y+(nr?126:120),'medicines build up','t-xs t-mid','fill:var(--ink)');
    if(on.nh3){{for(let i=0;i<4;i++)s+=nh3(R.x+(nr?-6:-92)+i*26,R.y+(nr?156:126),{r:5,op:.9});s+=T(R.x+(nr?33:-53),R.y+(nr?178:148),'ammonia reaches the brain','t-xs t-mid','fill:var(--nh3)')}}
    if(fluid>0)s+=T(B.x,B.y+(nr?212:228),on.flow&&on.alb?'ascites':'fluid builds up','t-xs t-mid','fill:var(--fluid)');
    /* lab sheet */
    const rh=nr?36:38;s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${rh*ROWS.length+56}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`+T(P.x+12,P.y+22,'LAB SHEET','t-sm','fill:var(--ink)');
    ROWS.forEach(([n,k,dir],i)=>{const y=P.y+44+i*rh,a=!!on[k],col=a?LI_FAIL[k].col:'var(--muted)';
      s+=`<line x1="${P.x+10}" x2="${P.x+P.w-10}" y1="${y-6}" y2="${y-6}" style="stroke:var(--line)"/>`;
      s+=`<text x="${P.x+14}" y="${y+rh/2}" class="t-lbl" style="font-size:13px;fill:${a?'var(--ink)':'var(--muted)'};opacity:${a?1:.7}">${n}</text>`;
      s+=`<text x="${P.x+P.w-18}" y="${y+rh/2+2}" class="t-end" style="font:700 ${a?20:14}px var(--body);fill:${col}">${a?dir:'–'}</text>`});
    s+=T(P.x+12,P.y+rh*ROWS.length+48,'*not needed to diagnose encephalopathy','t-xs');
    fs.innerHTML=s;
    const ks=Object.keys(LI_FAIL).filter(k=>on[k]);
    $('#liFailOut').innerHTML=ks.length?ks.map(k=>{const F=LI_FAIL[k];return `<div class="lfcard" style="border-left-color:${F.col}"><h4>${F.n}</h4><div class="row"><b>Lost job</b><span>${F.lost}</span><b>What people notice</b><span>${F.sign}</span><b>What tests show</b><span>${F.test}</span></div><p>${F.txt}</p><p><a href="#${F.go}" data-go="${F.go}">${F.goT} →</a></p></div>`}).join(''):`<div class="lfcard"><h4>All functions on</h4><p>Switch a function off with the buttons above to see what changes. A liver can lose a great deal of function before anything shows: many people feel well until cirrhosis is advanced. <sup class="c" data-ref="Gines2021Lancet" title="Source 180">180</sup></p></div>`;
  }
  $$('#liFail [data-lf]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.lf;on[k]=!on[k];b.setAttribute('aria-pressed',!!on[k]);drawF()}));
  drawF();
  const prevR=redraws.liver;redraws.liver=()=>{prevR&&prevR();drawF()};
};
/* =============== 1.3 From injury to scar =============== */
const FI_Y1=38,FI_RATE=.133,FI_STOP=30;
const fiT=y=>y/FI_Y1;
const FI_BASE=[
 {from:0,at:fiT(.05),k:'Year 0 · F0',t:'A healthy lobule',
  txt:`Stellate cells are quiet: small, star-shaped, full of vitamin A droplets. The sinusoid lining is a sieve with open windows, and in health it keeps stellate cells quiescent. <sup class="c" data-ref="Friedman2008PhysiolRev,Poisson2017" title="Source 165,358">165,358</sup> Scar can follow many causes: fatty liver disease linked to obesity (MASLD), high alcohol intake, hepatitis B or C, autoimmune and cholestatic diseases, and iron or copper overload. <sup class="c" data-ref="Gines2021Lancet,Rinella2023MASLD" title="Source 180,382">180,382</sup>`,
  pt:`A healthy liver has almost no scar. The cells that will later make scar are resting and storing vitamin A.`,
  hook:`Quiescent stellate cell = vitamin A store in the space of Disse. <sup class="c" data-ref="Friedman2008PhysiolRev" title="Source 165">165</sup>`},
 {from:fiT(.3),at:fiT(2.5),k:'Years 0–4 · injury',t:'Injury, again and again',
  txt:`Injured hepatocytes die, and their apoptosis stimulates stellate cells. <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup> Macrophages, sinusoid cells, platelets, NK and NKT cells and B cells all shape what happens next. <sup class="c" data-ref="Tsuchida2017" title="Source 471">471</sup> TGF-β1 is the strongest fibrogenic signal and PDGF the most potent stimulus for stellate cells to multiply. <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup> <span class="ev early">Early evidence</span> In mice, gut bacteria acting through TLR4 are needed for fibrosis: they sensitise stellate cells to TGF-β. <sup class="c" data-ref="Seki2007" title="Source 416">416</sup>`,
  pt:`Fat, a virus, alcohol, an immune attack or an inherited condition keeps hurting liver cells. Each hurt cell sends out alarm signals.`,
  hook:`TGF-β1 = key fibrogenic cytokine; PDGF = key stellate-cell mitogen. <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup>`},
 {from:fiT(4),at:fiT(9),k:'Years 4–12 · F1 → F2',t:'Stellate cells switch on',
  txt:`<span class="ev est">Established</span> Stellate-cell activation, quiescent vitamin A-storing cells turning into proliferative, fibrogenic myofibroblasts, is the central driver of fibrosis. <sup class="c" data-ref="Tsuchida2017" title="Source 471">471</sup> In mouse models of toxic, cholestatic and fatty liver disease, stellate cells gave rise to 82–96% of myofibroblasts. <sup class="c" data-ref="Mederacke2013" title="Source 300">300</sup> Matrix builds up because synthesis rises and breakdown falls: the enzymes that digest collagen (MMPs) are held back by their inhibitors, the TIMPs. <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup>`,
  pt:`The resting cells drop their vitamin A, stretch out and start laying down scar protein, collagen.`,
  hook:`Activated stellate cells (myofibroblasts) make most scar: 82–96% in mouse fate tracing. TIMPs block MMPs. <sup class="c" data-ref="Mederacke2013,Bataller2005" title="Source 28,300">28,300</sup>`},
 {from:fiT(12),at:fiT(18),k:'Years 12–22 · F2 → F3',t:'Windows close, septa bridge',
  txt:`The sinusoid lining loses its windows (fenestrae) and gains a basement membrane: capillarisation. It comes before fibrosis and lets activation proceed. <sup class="c" data-ref="DeLeve2015" title="Source 98">98</sup> Capillarised cells promote new vessels and vasoconstriction. <sup class="c" data-ref="Poisson2017" title="Source 358">358</sup> Scar runs from triad to triad, then bridges to the central vein. Activated stellate cells also contract, raising resistance to blood flow. <sup class="c" data-ref="Bataller2005,Schuppan2008" title="Source 28,411">28,411</sup> Septal thickness on biopsy correlates with portal pressure (HVPG). <sup class="c" data-ref="GarciaTsao2010" title="Source 171">171</sup>`,
  pt:`Scar spreads in strands that join up across the liver, and the tiny blood channels stiffen. Blood starts to meet resistance.`,
  hook:`Capillarisation (lost fenestrae + basement membrane) precedes fibrosis. <sup class="c" data-ref="DeLeve2015" title="Source 98">98</sup>`},
 {from:fiT(22),at:fiT(27),k:'Years 22–30 · F4',t:'Nodules: cirrhosis',
  txt:`Cirrhosis is defined under the microscope as regenerative nodules surrounded by fibrous bands, in response to chronic injury; it leads to portal hypertension and end-stage liver disease. <sup class="c" data-ref="Schuppan2008" title="Source 411">411</sup> Advanced fibrosis holds about 6 times the normal matrix: collagens I, III and IV, fibronectin, elastin, laminin, hyaluronan and proteoglycans. <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup> An HVPG above 10 mmHg defines clinically significant portal hypertension; some people reach it before biopsy shows cirrhosis. <sup class="c" data-ref="GarciaTsao2010" title="Source 171">171</sup> Next: <a href="#portal" data-go="portal">Portal hypertension &amp; varices</a>.`,
  pt:`Cirrhosis means scar has spread and the liver has broken into lumps (nodules). Blood cannot flow through easily, so pressure builds up behind the liver.`,
  hook:`Cirrhosis = regenerative nodules + fibrous bands. ≈6× normal ECM. HVPG >10 mmHg = CSPH. <sup class="c" data-ref="Schuppan2008,Bataller2005,GarciaTsao2010" title="Source 28,171,411">28,171,411</sup>`}
];
const FI_LAST={
 go:{from:fiT(30),at:fiT(34),k:'Years 30–38 · cause continues',t:'Cirrhosis keeps going',
  txt:`With the injury still present, scar and nodules stay and thicken. Cirrhosis moves from an asymptomatic compensated phase to a symptomatic decompensated phase. <sup class="c" data-ref="Gines2021Lancet" title="Source 180">180</sup> Thick septa on biopsy independently predict clinically significant portal hypertension and decompensation; total fibrosis area does not. <sup class="c" data-ref="GarciaTsao2010" title="Source 171">171</sup> Press <b>The cause is removed</b> to see the other path, and see <a href="#course" data-go="course">Compensated to decompensated: the course</a>.`,
  pt:`If the cause carries on, the scar keeps building. Many people feel well for years before problems start.`,
  hook:`Septal thickness, not total fibrosis area, predicts decompensation. <sup class="c" data-ref="GarciaTsao2010" title="Source 171">171</sup>`},
 stop:{from:fiT(30),at:fiT(35.5),k:'Years 30–38 · cause removed',t:'The scar can shrink',
  txt:`<span class="ev est">Established</span> When the cause is removed, activated myofibroblasts are eliminated and scar is resorbed. <sup class="c" data-ref="Kisseleva2021" title="Source 240">240</sup> In rats, activated stellate cells fell 12-fold by apoptosis within 28 days, as TIMPs dropped and collagenase activity rose. <sup class="c" data-ref="Iredale1998" title="Source 209">209</sup> In mice about half of myofibroblasts revert to an inactive state that reactivates faster with new injury. <sup class="c" data-ref="Kisseleva2012" title="Source 239">239</sup> In people: after 5 years of tenofovir for hepatitis B, 71 of 96 with cirrhosis (74%) no longer had it on biopsy; after hepatitis C cure, cirrhosis regressed in 61% and collagen fell in 89%, but capillarisation did not change. <sup class="c" data-ref="Marcellin2013,DAmbrosio2012" title="Source 92,289">92,289</sup> Cross-linked old scar resists: rat cirrhosis remodelled only to coarser nodules. <sup class="c" data-ref="Issa2004" title="Source 211">211</sup>`,
  pt:`When the cause is treated, the scar can shrink. In one hepatitis B study, about 3 in 4 people with cirrhosis no longer had cirrhosis on biopsy after 5 years. Some changes stay, so check-ups continue.`,
  hook:`Tenofovir 5 years: 74% lost cirrhosis. HCV SVR: 61% regressed, capillarisation persisted. Cross-linking (transglutaminase) limits regression. <sup class="c" data-ref="Marcellin2013,DAmbrosio2012,Issa2004" title="Source 92,211,289">92,211,289</sup>`}
};
const FI_SC={
 hcv:{n:'Untreated hepatitis C (median)',r:FI_RATE,col:'var(--brand)',src:'<sup class="c" data-ref="Poynard1997" title="Source 366">366</sup>'},
 hcvfast:{n:'HCV, men infected after 40',r:4/13,col:'var(--bad)',src:'<sup class="c" data-ref="Poynard1997" title="Source 366">366</sup>'},
 hcvslow:{n:'HCV, women before 40, no alcohol',r:4/42,col:'var(--good)',src:'<sup class="c" data-ref="Poynard1997" title="Source 366">366</sup>'},
 nash:{n:'MASH',r:1/7.1,col:'var(--liver)',src:'<sup class="c" data-ref="Singh2015" title="Source 430">430</sup>'},
 nafl:{n:'MASLD, steatosis only',r:1/14.3,col:'var(--accent)',src:'<sup class="c" data-ref="Singh2015" title="Source 430">430</sup>'}
};

inits.fibrosis=()=>{
  const svg=$('#fiSvg'),rg=$('#fiT');let mode='go',setSt=()=>{},steps=FI_BASE.concat([FI_LAST.go]);
  const T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const TH=(x,y,txt,c='t-xs t-mid',col='var(--ink)')=>T(x,y,txt,c,`fill:${col};font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3.5px;stroke-linejoin:round`);
  /* state of the liver at year y */
  function state(y){const st=mode==='stop'&&y>FI_STOP,reg=st?ease(ramp(y,FI_STOP,FI_STOP+6)):0;
    const raw=Math.min(4,FI_RATE*y),stage=raw-reg*1.1;
    const act=ramp(y,1.2,6)*(1-.82*reg),cap=ramp(y,4,16),ecm=Math.pow(ramp(raw,0,4),1.15)*(1-.55*reg);
    const injury=st?0:clamp(ramp(y,.2,1.2));
    return{y,raw,stage,reg,act,cap,ecm,injury,fold:1+5*ecm}}
  /* close-up of one sinusoid, 220 x 250 */
  function close(S,fl){let s='';const rr=rng(12);
    s+=`<rect x="0" y="0" width="220" height="250" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const hurtAt=(i)=>S.injury*clamp(Math.sin(fl*6.28*2+i*1.7)*.9+.2);
    [36,104,172].forEach((x,i)=>{s+=hepatocyte(x,50,62,{seed:i+1,hurt:hurtAt(i)})+hepatocyte(x+12,212,62,{seed:i+5,hurt:hurtAt(i+3)})});
    s+=`<rect x="4" y="82" width="212" height="16" style="fill:var(--scar);opacity:.4"/><rect x="4" y="150" width="212" height="34" style="fill:var(--scar);opacity:.4"/>`;
    s+=`<rect x="4" y="98" width="212" height="52" style="fill:var(--portal-soft)"/>`;
    const gap=f1(.2+5*(1-S.cap));
    [98,150].forEach(y=>{s+=`<line x1="4" x2="216" y1="${y}" y2="${y}" style="stroke:var(--brand);stroke-width:3;stroke-dasharray:14 ${gap}"/>`;
      if(S.cap>.05)s+=`<line x1="4" x2="216" y1="${y+(y<120?-3:3)}" y2="${y+(y<120?-3:3)}" style="stroke:var(--scar-line);stroke-width:1.6;opacity:${f1(S.cap)}"/>`});
    for(let i=0;i<10;i++){const p=(fl+i/10)%1;s+=`<circle cx="${f1(4+p*212)}" cy="${f1(106+(i*13)%36)}" r="2.8" style="fill:${i%4?'var(--artery)':'var(--portal)'};opacity:.7"/>`}
    /* collagen in the space of Disse */
    const nc=Math.round(S.ecm*7);for(let i=0;i<nc;i++){const y=i%2?90:158+((i*7)%22),x0=8+rr()*60,len=60+rr()*90;s+=collagen(x0,y,Math.min(212,x0+len),y+(rr()-.5)*4,{w:1.2,op:.85,amp:2})}
    s+=stellate(96,167,1.05,{act:S.act,ang:4});
    /* alarm signals from hurt cells to the stellate cell */
    if(S.injury>0&&S.raw<4.2)for(let i=0;i<5;i++){const p=(fl*1.5+i/5)%1,sx=[36,104,172,48,116][i],sy=i<3?60:204;s+=`<circle cx="${f1(lerp(sx,96,p))}" cy="${f1(lerp(sy,167,p))}" r="2.4" style="fill:var(--bad);opacity:${f1(S.injury*(1-p*.5))}"/>`}
    /* labels */
    if(S.act<.3)s+=TH(172,176,'vitamin A store','t-xs t-mid','var(--stellate)');
    else s+=TH(176,176,S.act>.6?'myofibroblast':'activating','t-xs t-mid','var(--stellate)');
    if(S.injury>0&&S.raw<2.5)s+=TH(110,30,'alarm signals: TGF-β1, PDGF','t-xs t-mid','var(--bad)');
    s+=TH(110,124,S.cap<.25?'open windows (fenestrae)':S.cap<.85?'windows closing':'capillarised lining','t-xs t-mid','var(--brand)');
    if(S.ecm>.15)s+=TH(110,244,`collagen I, III… ≈${f1(S.fold)}× matrix`,'t-xs t-mid','var(--scar-line)');
    return s}
  function draw(t){
    const nr=vb(svg,'720 400','400 570'),y=t*FI_Y1,S=state(y),ph=phaseOf(steps,t),fl=(t*30)%1;let s='';
    const Lb=nr?{x:98,y:296,r:72}:{x:118,y:180,r:88},Cl=nr?{x:192,y:206,k:.88}:{x:250,y:56,k:1},Lv=nr?{x:200,y:100,s:.95}:{x:596,y:180,s:1};
    s+=T(nr?20:20,nr?212:46,'ONE LOBULE','t-sm','fill:var(--ink)')+T(Cl.x,Cl.y-8,'CLOSE-UP: ONE SINUSOID','t-sm','fill:var(--ink)')+T(nr?20:510,nr?24:46,'WHOLE LIVER','t-sm','fill:var(--ink)');
    s+=lobule(Lb.x,Lb.y,Lb.r,{flow:fl,fib:clamp(S.raw/4*(1-.45*S.reg)),act:S.act,clip:true,id:'fiLob'}).svg;
    s+=`<g transform="translate(${Cl.x} ${Cl.y}) scale(${Cl.k})">${close(S,fl)}</g>`;
    s+=liver(Lv.x,Lv.y,Lv.s,{fib:Math.min(4,S.raw),regress:S.reg,seed:5}).svg;
    if(mode==='stop'&&y>FI_STOP)s+=TH(Lv.x,Lv.y+(nr?66:78),'cause removed: scar thinning','t-xs t-mid','var(--good)');
    else if(S.raw>=3.95)s+=TH(Lv.x,Lv.y+(nr?66:78),'nodules ringed by scar','t-xs t-mid','var(--liver)');
    /* METAVIR bar */
    const bx0=nr?30:70,bx1=nr?370:650,by=nr?482:338,bw=(bx1-bx0)/5;
    ['F0','F1','F2','F3','F4'].forEach((f,i)=>{const on=Math.min(4,Math.max(0,Math.floor(S.stage+.0001)))===i;s+=`<rect x="${f1(bx0+i*bw+1)}" y="${by}" width="${f1(bw-2)}" height="22" rx="5" style="fill:${on?'var(--brand)':'var(--panel-2)'};opacity:${f1(.35+.65*(i<=S.stage+.5?1:.4))}"/>`+T(bx0+i*bw+bw/2,by+15,f+(nr?'':i===4?' cirrhosis':i===0?' none':''),'t-xs t-mid',`fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700`)});
    const mx=lerp(bx0+bw/2,bx1-bw/2,clamp(S.stage/4));
    s+=`<path d="M${f1(mx)} ${by-2}l-6 -9h12z" style="fill:var(--ink)"/>`;
    s+=T(bx0,by-16,'METAVIR fibrosis stage (schematic pace)','t-xs')+T(bx1,by-16,`year ${f1(y)}`,'t-xs t-end','fill:var(--ink);font-weight:700');
    /* year ruler */
    const ry=by+40;s+=`<line x1="${bx0}" x2="${bx1}" y1="${ry}" y2="${ry}" class="axis"/>`;
    [0,10,20,30,38].forEach(v=>{const x=lerp(bx0,bx1,v/FI_Y1);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ry-3}" y2="${ry+3}" class="axis"/>`+T(x,ry+14,v,'t-xs t-mid')});
    s+=`<circle cx="${f1(lerp(bx0,bx1,y/FI_Y1))}" cy="${ry}" r="4.5" style="fill:var(--brand)"/>`;
    if(mode==='stop'){const x=lerp(bx0,bx1,FI_STOP/FI_Y1);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ry-8}" y2="${ry+8}" style="stroke:var(--good);stroke-width:2"/>`+T(x+4,ry-8,'cause removed','t-xs','fill:var(--good)')}
    svg.innerHTML=s;
    setSt(ph);
    const stg=S.reg>0?`F${Math.floor(S.stage+.0001)} (regressing from F4)`:`F${Math.min(4,Math.floor(S.raw+.0001))}`;
    $('#fiRead').innerHTML=`<span>year <b>${f1(y)}</b></span><span>stage <b>${stg}</b></span><span>matrix <b>≈${f1(S.fold)}×</b> normal</span><span>stellate cells <b>${S.act<.3?'quiescent':S.act>.6?'activated':'activating'}</b></span><span>lining <b>${S.cap<.25?'fenestrated':S.cap<.85?'closing':'capillarised'}</b></span>`;
    $('#fiNote').innerHTML=noteHTML(steps[ph]);
  }
  const stop=playWire(rg,$('#fiPlay'),draw,30000,'Replay','fibrosis');
  function wire(){const old=$('#fiSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,steps,rg,draw,stop)}
  $$('[data-fm]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.fm;steps=FI_BASE.concat([FI_LAST[mode]]);$$('[data-fm]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();
    if(mode==='stop'&&+rg.value<fiT(FI_STOP)){rg.value=fiT(FI_STOP);}draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---------- regression evidence bars ---------- */
  const ev=$('#fiEvSvg');
  const EV=[['Hepatitis B, tenofovir 5 y','no longer cirrhosis',74,'var(--good)'],['Hepatitis B, entecavir ~6 y','≥1 Ishak point better',88,'var(--good)'],['Hepatitis C cure (SVR), ~5 y','cirrhosis regressed',61,'var(--brand)'],['Hepatitis C cure (SVR), ~5 y','collagen fell',89,'var(--brand)'],['MASH, lifestyle, ≥10% weight loss','fibrosis regressed (52 wk)',45,'var(--accent)'],['MASH, bariatric surgery, 5 y','fibrosis decreased',70.2,'var(--accent)']];
  function drawEv(){const nr=vb(ev,'720 300','400 470');let s='';
    EV.forEach(([a,b,v,c],i)=>{const y=nr?18+i*74:26+i*44,x0=nr?20:300,w=nr?300:340,yb=nr?y+36:y;
      s+=T(nr?20:290,nr?y+4:y+8,a,nr?'t-sm':'t-sm t-end','fill:var(--ink)')+T(nr?20:290,nr?y+18:y+22,b,nr?'t-xs':'t-xs t-end');
      s+=`<rect x="${x0}" y="${yb-8}" width="${w}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${x0}" y="${yb-8}" width="${f1(w*v/100)}" height="18" rx="4" style="fill:${c};opacity:.85"/>`+T(x0+w*v/100+6,yb+6,v+'%','t-sm','fill:var(--ink);font-weight:700')});
    ev.innerHTML=s}
  drawEv();

  /* ---------- progression-rate explainer ---------- */
  const rs=$('#fiRate'),ag=$('#fiAge'),sc=$('#fiSc'),all=$('#fiAll');
  function drawR(){const nr=vb(rs,'560 300','400 340'),a0=+ag.value,k=sc.value,R=FI_SC[k];$('#fiAgeV').textContent=a0;
    const X0=nr?44:60,X1=nr?380:540,Y0=24,Y1=nr?280:250,A0=10,A1=100,X=a=>lerp(X0,X1,(a-A0)/(A1-A0)),Y=f=>lerp(Y1,Y0,f/4);let s='';
    [0,1,2,3,4].forEach(f=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(Y(f))}" y2="${f1(Y(f))}" class="${f?'grid':'axis'}"/>`+T(X0-6,Y(f)+3,'F'+f,'t-xs t-end')});
    for(let a=10;a<=100;a+=10)s+=T(X(a),Y1+16,a,'t-xs t-mid');s+=T(X1,Y1+32,'age (years)','t-xs t-end');
    const line=(r,col,w,op,dash)=>{const aF=a0+4/r,e=Math.min(A1,aF);return `<path d="M${f1(X(a0))} ${f1(Y(0))}L${f1(X(e))} ${f1(Y(Math.min(4,(e-a0)*r)))}${aF<A1?`L${f1(X(A1))} ${f1(Y(4))}`:''}" style="fill:none;stroke:${col};stroke-width:${w};opacity:${op}${dash?';stroke-dasharray:5 4':''}"/>`};
    if(all.checked)Object.keys(FI_SC).filter(q=>q!==k).forEach(q=>{s+=line(FI_SC[q].r,FI_SC[q].col,1.6,.5,true)});
    s+=`<rect x="${f1(X(a0))}" y="${Y0}" width="${f1(Math.max(0,X(Math.min(A1,a0+4/R.r))-X(a0)))}" height="${Y1-Y0}" style="fill:${R.col};opacity:.06"/>`;
    s+=line(R.r,R.col,3,1,false);
    const aF=a0+4/R.r;
    if(aF<=A1){s+=`<circle cx="${f1(X(aF))}" cy="${f1(Y(4))}" r="6" style="fill:${R.col};stroke:var(--panel);stroke-width:2"/>`+TH(Math.min(X(aF),X1-60),Y(4)-12,`F4 at about ${Math.round(aF)}`,'t-sm t-mid',R.col)}
    else s+=TH(X1-80,Y(Math.min(4,(A1-a0)*R.r))-12,'F4 not reached by 100','t-sm t-mid',R.col);
    s+=`<circle cx="${f1(X(a0))}" cy="${f1(Y(0))}" r="5" style="fill:var(--ink)"/>`+TH(X(a0)+6,Y(0)-10,'injury starts','t-xs');
    rs.innerHTML=s;
    const yrs=4/R.r;
    $('#fiRateOut').innerHTML=`<span class="big-num">${aF<=A1?Math.round(aF):'>100'}</span><span class="readout"><span>age at F4 if progressing exactly at the median</span><span><b>${f1(yrs)} years</b> from F0 · ${R.n}</span></span>`;
    $('#fiRateNote').innerHTML=noteHTML({k:'Illustrative only',t:k.startsWith('hcv')?'Hepatitis C: three decades, on average':'Fatty liver disease: slower, but not always',
      txt:k.startsWith('hcv')?`In 2235 people with untreated hepatitis C, the median fibrosis progression rate was 0.133 METAVIR units a year and the median time to cirrhosis 30 years, from 13 years in men infected after 40 to 42 years in women infected before 40 who did not drink. Infection after 40, drinking 50 g of alcohol or more a day and male sex sped progression; genotype did not. A third would reach cirrhosis in under 20 years, and 31% would never progress or would take 50 years or more. ${R.src} A meta-analysis estimated cirrhosis in 16% twenty years after infection. <sup class="c" data-ref="Thein2008" title="Source 461">461</sup>`
        :`In paired-biopsy studies of 411 people with MASLD, fibrosis progressed by 0.14 stages a year with steatohepatitis (one stage per 7.1 years) and 0.07 with steatosis alone (one stage per 14.3 years). Over follow-up 33.6% progressed, 43.1% stayed stable and 22.3% improved. ${R.src} Weight loss of 10% or more brought fibrosis regression in 45% within a year. <sup class="c" data-ref="VilarGomez2015" title="Source 481">481</sup>`,
      pt:`A straight line is a simplification. Real scarring speeds up, slows down or reverses, and treating the cause changes the line.`,
      hook:k.startsWith('hcv')?`HCV: ≈0.13 METAVIR units a year, median ≈30 years to cirrhosis. <sup class="c" data-ref="Poynard1997" title="Source 366">366</sup>`:`MASH ≈ one stage per 7 years; steatosis alone ≈ one per 14 years. <sup class="c" data-ref="Singh2015" title="Source 430">430</sup>`});
  }
  [ag,sc].forEach(e=>e.addEventListener('input',drawR));sc.addEventListener('change',drawR);all.addEventListener('change',drawR);
  drawR();
  const prevR=redraws.fibrosis;redraws.fibrosis=()=>{prevR&&prevR();drawEv();drawR()};
};
/* =============== 2.1 Alcohol-related liver disease =============== */
inits.alcohol=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;

  /* ---------- 1. the spectrum: 100 heavy drinkers ---------- */
  const STEPS=[
    {from:0,at:.08,k:'The starting point',t:'Heavy drinking',
     txt:`ACG 2018 defines a US standard drink as about 14 g of alcohol and describes heavy drinking as more than 3 drinks a day for men and more than 2 for women. Most people who drink more than 40 g a day develop a fatty liver, but only a subset go on to more advanced disease. The 100 icons are one group of people who drink heavily. <sup class="c" data-ref="Singal2018ACG,Seitz2018NRDP" title="Source 415,428">415,428</sup>`,
     pt:`A "standard drink" is a small can of beer, a small glass of wine or a single shot of spirits. Heavy drinking means more than 3 a day for men or 2 for women.`,
     hook:`ARLD spectrum: steatosis → steatohepatitis → fibrosis → cirrhosis (± HCC); alcohol-associated hepatitis can appear at any point on top of it. <sup class="c" data-ref="Seitz2018NRDP" title="Source 415">415</sup>`},
    {from:.18,at:.3,k:'Within weeks',t:'Fatty liver in about 9 in 10',
     txt:`ACG 2018: fatty liver, usually large droplets (macrovesicular), "develops in ~90% of heavy drinkers". It may appear within 2 weeks of heavy, regular drinking and "resolves rapidly following complete abstinence". The cells on the left fill with fat droplets. <sup class="c" data-ref="Singal2018ACG" title="Source 428">428</sup>`,
     pt:`Almost everyone who drinks heavily gets fat stored in the liver. This stage usually clears if drinking stops.`,
     hook:`About 90% of heavy drinkers develop steatosis; it reverses with abstinence. <sup class="c" data-ref="Singal2018ACG" title="Source 428">428</sup>`},
    {from:.4,at:.5,k:'Inflammation',t:'Steatohepatitis',
     txt:`In some people the fatty liver becomes inflamed: alcohol-related steatohepatitis, with swollen, injured cells. "Pure" fatty liver is not harmless either: of 88 people with biopsy-proven fatty liver and no fibrosis, followed for a median 10.5 years, 9 developed cirrhosis and 7 fibrosis; 8 of the 9 were still drinking more than 40 units a week. <sup class="c" data-ref="Seitz2018NRDP,Teli1995Lancet" title="Source 415,458">415,458</sup>`,
     pt:`The liver cells become irritated and swollen. Scar can start to form if drinking continues.`,
     hook:`Teli 1995: 9 of 88 people with "simple" alcohol-related fatty liver reached cirrhosis in about 10 years, mostly those who kept drinking.`},
    {from:.6,at:.72,k:'Years to decades',t:'Cirrhosis or severe hepatitis in 1–2 in 10',
     txt:`ACG 2018: "only about 10–20% of chronic heavy drinkers develop severe forms such as AH or cirrhosis", with behavioural, environmental and genetic cofactors as likely modifiers. People with ARLD progress faster than people with other causes and more often present late. Alcohol-related cirrhosis carries a lifetime liver-cancer risk of about 3–10% (about 1% a year). <sup class="c" data-ref="Singal2018ACG,Jophlin2024ACG" title="Source 219,428">219,428</sup>`,
     pt:`Most heavy drinkers never get cirrhosis, but no one can tell in advance who will. Genes, weight and drinking pattern all play a part.`,
     hook:`Only 10–20% of chronic heavy drinkers develop severe AH or cirrhosis (shaded icons: the lighter ten show the upper end of the range). <sup class="c" data-ref="Singal2018ACG" title="Source 428">428</sup>`},
    {from:.8,at:.93,k:'What stopping does',t:'Stopping drinking',
     txt:`Abstinence is "the best treatment for all stages". Fat clears quickly; scar can thin, though nodules may remain. Among 633 people with decompensated alcohol-related cirrhosis who stopped drinking, 31.1% regained compensation by Baveno VII criteria (33.8% cumulative by 5 years), and stopping within 1 month of decompensation raised the chance (aSHR 2.04). <sup class="c" data-ref="Seitz2018NRDP,Hofer2026JHep" title="Source 202,415">202,415</sup>`,
     pt:`Stopping helps at every stage. About 1 in 3 people with complications who stopped drinking recovered enough that the complications went away. These are averages, not a promise.`,
     hook:`Abstinence-induced recompensation: 12.3% at 1 year, 23.4% at 2 years, 33.8% at 5 years. <sup class="c" data-ref="Hofer2026JHep" title="Source 202">202</sup>`}
  ];
  const svg=$('#alSvg'),rg=$('#alT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const fat=ramp(t,.18,.34),hurt=ramp(t,.42,.56),fib=4*ease(ramp(t,.46,.76)),reg=ramp(t,.82,.97);
    const fatNow=fat*(1-.85*reg),hurtNow=hurt*(1-.8*reg);
    let s='';
    /* liver + cells */
    const L=N?{x:200,y:92,s:1.15}:{x:172,y:118,s:1.4};
    s+=liver(L.x,L.y,L.s,{fib,regress:reg,seed:11}).svg;
    if(fatNow>.05){/* fat speckles over the liver */const r=rng(5);for(let i=0;i<26;i++){const a=r()*6.28,d=r();const px=L.x+(r()*150-80)*L.s*.8,py=L.y+(r()*70-40)*L.s*.8;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1((1.4+2.4*d)*L.s*fatNow)}" style="fill:var(--accent-soft);stroke:var(--bile);stroke-width:.6;opacity:${f1(.85*fatNow)}"/>`}}
    s+=T(L.x,N?28:30,['Healthy liver','Fatty liver','Steatohepatitis','Cirrhosis','After stopping'][phaseOf(STEPS,t)],'t-lbl t-mid');
    const cy=N?218:292,cx=N?[110,200,290]:[92,172,252],cs=N?50:58;
    s+=`<line x1="${cx[0]-cs*.7}" x2="${cx[2]+cs*.7}" y1="${cy-cs*.72}" y2="${cy-cs*.72}" class="grid"/>`;
    cx.forEach((x,i)=>{const f=clamp(fatNow*(1.15-i*.12)),h=clamp(hurtNow*(.6+i*.25));s+=hepatocyte(x,cy,cs,{fat:f,hurt:h,seed:3+i});
      if(h>.3){/* inflammatory cells */for(let k=0;k<3;k++){const a=k*2.1+i;s+=`<circle cx="${f1(x+Math.cos(a)*cs*.62)}" cy="${f1(cy+Math.sin(a)*cs*.5)}" r="${f1(3)}" style="fill:var(--nh3-fill);opacity:${f1(h)}"/>`}}});
    if(fib>1.5)s+=collagen(cx[0]+cs*.45,cy+cs*.42,cx[2]-cs*.45,cy+cs*.42,{op:ramp(fib,1.5,3.5)*(1-.6*reg),amp:2.5});
    s+=T(cx[1],cy+cs*.62+14,'magnified liver cells','t-xs t-mid');
    /* icon array */
    const A=N?{x:86,y:300,dx:24,dy:24,s:19}:{x:396,y:50,dx:30,dy:28.5,s:22};
    s+=T(N?200:546,A.y-14,'100 people who drink heavily','t-sm t-mid','fill:var(--ink)');
    const nFat=Math.round(90*fat),sev=ramp(t,.62,.7),sev2=ramp(t,.66,.76);
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,x=A.x+c*A.dx,y=A.y+r*A.dy;
      let col='var(--muted)',op=.32;
      if(i<nFat){col='var(--bile)';op=1-.7*reg}
      if(i<10&&sev>0){col='var(--liver)';op=.35+.65*sev}
      else if(i>=10&&i<20&&sev2>0){col='var(--nodule)';op=(.25+.5*sev2)}
      s+=person(x,y,A.s,col,{op})}
    /* legend */
    const lg=N?[[40,552],[150,552],[268,552]]:[[396,350],[486,350],[594,350]];
    const lt=[['var(--bile)','fatty liver'],['var(--liver)','severe: 10'],['var(--nodule)','up to 20']];
    lt.forEach(([c,l],i)=>{s+=`<rect x="${lg[i][0]}" y="${lg[i][1]-8}" width="10" height="10" rx="2" style="fill:${c}"/>`+T(lg[i][0]+14,lg[i][1]+1,l,'t-xs')});
    if(reg>.05){const bx=N?200:546,by=N?432:210;
      s+=`<g style="opacity:${f1(reg)}"><rect x="${bx-(N?175:150)}" y="${by-30}" width="${N?350:300}" height="62" rx="10" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.5"/>`+T(bx,by-10,'After stopping, fat clears quickly.','t-sm t-mid','fill:var(--ink)')+T(bx,by+7,'Decompensated cirrhosis: about 1 in 3','t-sm t-mid','fill:var(--rx)')+T(bx,by+22,'regained compensation by 5 years','t-sm t-mid','fill:var(--rx)')+'</g>'}
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);$('#alNote').innerHTML=noteHTML(STEPS[p]);setSt(p);
    $('#alRead').innerHTML=`<span>Fatty liver: <b>${nFat} of 100</b></span><span>Severe hepatitis or cirrhosis: <b>${sev2>.5?'10–20':sev>.5?'10':'0'} of 100</b></span><span>Scar stage (schematic): <b>F${Math.min(4,Math.round(fib*(1-.3*reg)))}</b></span>`;
  }
  const stop=playWire(rg,$('#alPlay'),draw,22000,'Replay','alcohol');
  setSt=stepWire($('#alSteps'),STEPS,rg,draw,stop);draw(+rg.value);

  /* ---------- 2. dose–response (Roerecke 2019) ---------- */
  const CAT=[
    {x:0,n:'Long-term abstainers',sh:'abstain'},
    {x:1,n:'Occasional',sh:'occasional'},
    {x:2,n:'1 a day',sh:'1/day'},
    {x:4,n:'5–6 a day',sh:'5–6/day',f:[12.44,6.65,23.27],m:[3.80,.85,17.02]},
    {x:5,n:'7 or more a day',sh:'7+/day',f:[24.58,14.77,40.90],m:[6.93,1.07,44.99]}];
  const sex={f:true,m:true};
  const ds=$('#alDose'),dr=$('#alDoseT');
  const DNOTE=[
    {k:'Reference group',t:'Long-term abstainers',txt:`Every risk in this chart is relative to people who have not drunk for a long time (RR = 1). In a Danish cohort of 55,917 adults, no cases of alcohol-related cirrhosis occurred in lifetime abstainers. <sup class="c" data-ref="Roerecke2019Cirrhosis,Askgaard2015JHep" title="Source 20,385">20,385</sup>`,
     pt:`The chart compares each drinking level with people who do not drink.`},
    {k:'Occasional drinking',t:'No increase found',txt:`The meta-analysis found no increased cirrhosis risk for occasional drinkers compared with long-term abstainers. Whether any level is truly "safe" for the liver is unresolved: the data are observational and rely on self-report. <sup class="c" data-ref="Roerecke2019Cirrhosis" title="Source 385">385</sup>`,
     pt:`Drinking now and then did not raise the risk of cirrhosis in these studies.`},
    {k:'About 12 g a day',t:'One drink a day: women and men differ',txt:`One drink a day raised cirrhosis risk in women but not in men, compared with long-term abstainers. Women's risk was "consistently higher" than men's at every level. <sup class="c" data-ref="Roerecke2019Cirrhosis" title="Source 385">385</sup>`,
     pt:`For women, even one drink a day raised the risk a little. For men, it did not.`,
     hook:`Roerecke 2019: at 1 drink a day, cirrhosis risk rose in women only.`},
    {k:'5–6 drinks a day',t:'Risk climbs steeply',txt:`Relative risk of cirrhosis: women 12.44 (95% CI 6.65–23.27); men 3.80 (95% CI 0.85–17.02, which crosses 1). The authors describe risk as "increasing exponentially" with intake, and the spread between studies points to genes, body weight, metabolic factors and drinking pattern. <sup class="c" data-ref="Roerecke2019Cirrhosis" title="Source 385">385</sup>`,
     pt:`At 5 to 6 drinks a day a woman's risk is about 12 times that of a non-drinker.`,
     hook:`Women vs men at the same intake: RR 12.44 vs 3.80 at 5–6 drinks a day. <sup class="c" data-ref="Roerecke2019Cirrhosis" title="Source 385">385</sup>`},
    {k:'7 or more drinks a day',t:'The highest risk',txt:`Relative risk: women 24.58 (95% CI 14.77–40.90); men 6.93 (95% CI 1.07–44.99). The wide intervals for men reflect fewer cases at each level. <sup class="c" data-ref="Roerecke2019Cirrhosis" title="Source 385">385</sup>`,
     pt:`At 7 or more drinks a day the risk is many times higher, and highest for women.`,
     hook:`RR at ≥7 drinks a day: women 24.58, men 6.93. <sup class="c" data-ref="Roerecke2019Cirrhosis" title="Source 385">385</sup>`}];
  function drawDose(t){
    const N=vb(ds,'720 340','400 480');
    const B=N?{x:52,y:40,w:326,h:330}:{x:70,y:34,w:440,h:250};
    const X=v=>B.x+B.w*(v+.5)/6,Ylog=v=>B.y+B.h-B.h*(Math.log10(v)-Math.log10(.5))/(Math.log10(60)-Math.log10(.5));
    const xc=t*5.6-.3;let s=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" style="fill:var(--field)"/>`;
    [1,2,5,10,20,50].forEach(v=>{s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${f1(Ylog(v))}" y2="${f1(Ylog(v))}" class="${v===1?'axis':'grid'}"/>`+T(B.x-6,Ylog(v)+3,v,'t-xs t-end')});
    s+=`<text transform="translate(${N?14:22} ${B.y+B.h/2}) rotate(-90)" class="t-xs t-mid">relative risk of cirrhosis (log scale)</text>`;
    s+=`<rect x="${f1(X(2.5))}" y="${B.y}" width="${f1(X(3.5)-X(2.5))}" height="${B.h}" style="fill:var(--panel-2);opacity:.7"/>`+T(X(3),B.y+16,'2–4/day:','t-xs t-mid')+T(X(3),B.y+28,'in figures','t-xs t-mid')+T(X(3),B.y+40,'only','t-xs t-mid');
    CAT.forEach((c,i)=>{const on=xc>=c.x-.25;s+=`<line x1="${f1(X(c.x))}" x2="${f1(X(c.x))}" y1="${B.y+B.h}" y2="${B.y+B.h+5}" class="axis"/>`;
      s+=T(X(c.x),B.y+B.h+17,N?['none','occas.','1','5–6','7+'][i]:c.sh,'t-xs t-mid',on?'fill:var(--ink)':'')});
    s+=T(B.x+B.w,B.y+B.h+34,'drinks a day (≈12 g each) →','t-xs t-end');
    const SX={f:{col:'var(--liver)',dx:-7,lab:'women'},m:{col:'var(--portal)',dx:7,lab:'men'}};
    /* reference and qualitative points */
    if(xc>=-.1)s+=`<circle cx="${f1(X(0))}" cy="${f1(Ylog(1))}" r="5.5" style="fill:var(--ink)"/>`+T(X(0),Ylog(1)-10,'reference','t-xs t-mid');
    if(xc>=.75)s+=`<circle cx="${f1(X(1))}" cy="${f1(Ylog(1))}" r="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`+T(X(1),Ylog(1)+18,'no increase','t-xs t-mid');
    if(xc>=1.75){if(sex.f)s+=`<path d="M${f1(X(2)+SX.f.dx)} ${f1(Ylog(1)-4)}V${f1(Ylog(1.7))}" style="stroke:${SX.f.col};stroke-width:2.4" marker-end="url(#alUp)"/>`+T(X(2)-10,Ylog(1.9),'women: raised','t-xs t-end',`fill:${SX.f.col}`);
      if(sex.m)s+=`<circle cx="${f1(X(2)+SX.m.dx)}" cy="${f1(Ylog(1))}" r="4.5" style="fill:var(--panel);stroke:${SX.m.col};stroke-width:2"/>`+T(X(2)+2,Ylog(1)+18,'men: not raised','t-xs','fill:'+SX.m.col)}
    ['f','m'].forEach(k=>{if(!sex[k])return;const P=SX[k];const pts=CAT.filter(c=>c[k]&&xc>=c.x-.25);
      const line=[[X(0),Ylog(1)]].concat(pts.map(c=>[X(c.x)+P.dx,Ylog(c[k][0])]));
      if(pts.length)s+=`<path d="M${line.map(p=>f1(p[0])+' '+f1(p[1])).join('L')}" style="fill:none;stroke:${P.col};stroke-width:1.6;stroke-dasharray:4 4;opacity:.8"/>`;
      pts.forEach(c=>{const [v,lo,hi]=c[k],x=X(c.x)+P.dx;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(Ylog(lo))}" y2="${f1(Ylog(hi))}" style="stroke:${P.col};stroke-width:1.6"/><line x1="${f1(x-4)}" x2="${f1(x+4)}" y1="${f1(Ylog(lo))}" y2="${f1(Ylog(lo))}" style="stroke:${P.col};stroke-width:1.6"/><line x1="${f1(x-4)}" x2="${f1(x+4)}" y1="${f1(Ylog(hi))}" y2="${f1(Ylog(hi))}" style="stroke:${P.col};stroke-width:1.6"/><circle cx="${f1(x)}" cy="${f1(Ylog(v))}" r="5.5" style="fill:${P.col};stroke:var(--panel);stroke-width:1.5"/>`;
        s+=T(k==='f'?x-10:x+10,Ylog(v)+4,v.toFixed(2),'t-sm'+(k==='f'?' t-end':''),`fill:${P.col};font-weight:700`)})});
    s+=`<line x1="${f1(X(clamp(xc,-.3,5.3)))}" x2="${f1(X(clamp(xc,-.3,5.3)))}" y1="${B.y}" y2="${B.y+B.h}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    /* legend / side panel */
    const lx=N?B.x:540,ly=N?B.y-22:60;
    ['f','m'].forEach((k,i)=>{const P=SX[k];const xx=N?lx+i*110:lx,yy=N?ly:ly+i*22;s+=`<circle cx="${xx+6}" cy="${yy-4}" r="5" style="fill:${P.col};opacity:${sex[k]?1:.25}"/>`+T(xx+16,yy,P.lab+(sex[k]?'':' (hidden)'),'t-sm',sex[k]?'fill:var(--ink)':'')});
    if(!N){s+=T(lx,128,'Daily vs non-daily drinking,','t-sm','fill:var(--ink)')+T(lx,143,'same total amount:','t-sm','fill:var(--ink)')+T(lx,163,'men RR 1.71','t-sm','fill:var(--portal)')+T(lx,179,'women RR 1.56','t-sm','fill:var(--liver)')+T(lx,200,'(meta-analysis of 5 studies)','t-xs');}
    ds.innerHTML=`<defs>${marker('alUp','var(--liver)')}</defs>`+s;
    const ci=xc<.6?0:xc<1.6?1:xc<3.6?2:xc<4.6?3:4;$('#alDoseNote').innerHTML=noteHTML(Object.assign({},DNOTE[ci],ci===4||ci===3?{}:{}));
  }
  playWire(dr,$('#alDosePlay'),drawDose,9000,'Replay','alcohol');
  $$('[data-alsex]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.alsex;sex[k]=!sex[k];if(!sex.f&&!sex.m){sex[k==='f'?'m':'f']=true;$(`[data-alsex="${k==='f'?'m':'f'}"]`).setAttribute('aria-pressed','true')}b.setAttribute('aria-pressed',sex[k]);drawDose(+dr.value)}));
  drawDose(+dr.value);

  /* ---------- 3. alcohol-associated hepatitis ---------- */
  const AH=[
    {from:0,at:.08,k:'Recognising it',t:'A recognisable pattern',
     txt:`The NIAAA consortium criteria for trials: jaundice starting within the prior 8 weeks; ongoing intake of more than 40 g a day (women) or 60 g a day (men) for 6 months or more, with less than 60 days of abstinence before the jaundice; AST over 50 IU/L, AST/ALT over 1.5 and both under 400 IU/L; and total bilirubin over 3.0 mg/dL. An AST/ALT ratio below 1.5 is seen in under 2% of biopsy-proven cases, and biopsy is recommended when the picture is atypical. <sup class="c" data-ref="Crabb2016NIAAA" title="Source 87">87</sup>`,
     pt:`Yellow skin and eyes that came on over weeks, in someone who has been drinking heavily, with a typical pattern on liver blood tests.`,
     hook:`AH labs: AST >50 but <400 IU/L, AST/ALT >1.5, bilirubin >3 mg/dL. <sup class="c" data-ref="Crabb2016NIAAA" title="Source 87">87</sup>`},
    {from:.18,at:.3,k:'How severe?',t:'Grading severity: Maddrey and MELD',
     txt:`Maddrey's 1978 trial found that a prolonged prothrombin time and a high bilirubin independently predicted death: the basis of his discriminant function. ACG 2018 used Maddrey ≥32 to define severe disease. ACG 2024 names MELD "the most accurate score", with MELD over 20 defining severe disease. In a global cohort of 2,581 patients (median MELD 23.5), mortality was 20% at 28 days and 30.9% at 90 days, and the authors concluded Maddrey "should no longer be used" for prognosis. <sup class="c" data-ref="Maddrey1978,Singal2018ACG,Jophlin2024ACG,MoralesArraez2022" title="Source 219,285,312,428">219,285,312,428</sup>`,
     pt:`Doctors use blood-test scores to judge how dangerous the illness is. Higher scores mean higher risk.`,
     hook:`Severe AH: Maddrey DF ≥32 (older) or MELD >20 (ACG 2024 prefers MELD). <sup class="c" data-ref="Singal2018ACG,Jophlin2024ACG" title="Source 219,428">219,428</sup>`},
    {from:.4,at:.5,k:'Treatment trial',t:'Steroids: the STOPAH trial',
     txt:`STOPAH randomised 1,103 people with severe alcohol-associated hepatitis in a 2×2 design. 28-day mortality: placebo 17%, prednisolone 14%, pentoxifylline 19%, both 13%. Prednisolone's odds ratio was 0.72 (95% CI 0.52–1.01; P = 0.06), with no effect at 90 days or 1 year; pentoxifylline did not help. Serious infections: 13% on prednisolone vs 7% without. An individual-patient meta-analysis of 11 trials found a 28-day benefit (HR 0.64) but none at 6 months. <sup class="c" data-ref="Thursz2015STOPAH,Louvet2018Gastro" title="Source 280,465">280,465</sup>`,
     pt:`Steroid tablets may help some people survive the first month, but they raise the risk of infection and the benefit fades by 6 months.`,
     hook:`STOPAH: prednisolone OR 0.72 for 28-day death (P = 0.06), no 90-day benefit; pentoxifylline no benefit; infections 13% vs 7%. <sup class="c" data-ref="Thursz2015STOPAH" title="Source 465">465</sup>`},
    {from:.6,at:.72,k:'Day 7',t:'The Lille model: is it working?',
     txt:`The Lille model combines age, kidney function, albumin, prothrombin time, bilirubin and the change in bilirubin by day 7 of steroids. Its AUROC for 6-month death was 0.89, against 0.62 for Child–Pugh and 0.66 for Maddrey. Above 0.45 ("non-responders", about 40%), 6-month survival was 25%, against 85% below it. In pooled trials, 28-day survival on steroids was 91.1% in complete responders, 79.4% in partial and 53.3% in null responders. ACG 2018 places the score at 4–7 days. <sup class="c" data-ref="Louvet2007Lille,Mathurin2011Gut,Singal2018ACG" title="Source 279,292,428">279,292,428</sup>`,
     pt:`After about a week, a score checks whether the bilirubin (the yellow pigment) is coming down. If it is not, steroids are unlikely to help.`,
     hook:`Lille ≥0.45 at day 7 = non-response: 6-month survival 25% vs 85%. <sup class="c" data-ref="Louvet2007Lille" title="Source 279">279</sup>`},
    {from:.8,at:.93,k:'When medicine fails',t:'Early liver transplant',
     txt:`People not responding to medical therapy had about 30% 6-month survival, with most deaths in the first 2 months, so a 6-month abstinence rule excluded most of them. In a Franco-Belgian pilot, 26 highly selected people (fewer than 2% of admissions) had 6-month survival of 77% with early transplant vs 23% in matched controls. In ACCELERATE-AH (147 people, median 55 days' abstinence), survival was 94% at 1 year and 84% at 3 years. ACG 2024: transplant "should be considered in selected patients with AH, who are unresponsive to medical therapy and have a low risk of relapse". <sup class="c" data-ref="Mathurin2011NEJM,Lee2018Gastro,Jophlin2024ACG" title="Source 219,262,293">219,262,293</sup>`,
     pt:`For a small number of carefully chosen people who do not get better with medicine, a liver transplant can be life-saving.`,
     hook:`Mathurin 2011: early transplant, 6-month survival 77% vs 23%. <sup class="c" data-ref="Mathurin2011NEJM" title="Source 293">293</sup>`}];
  const ah=$('#alAh'),ar=$('#alAhT');let setAh=()=>{};
  function bar(x,y,w,h,v,max,col,lab,val,N){const bh=h*v/max;return `<rect x="${f1(x)}" y="${f1(y+h-bh)}" width="${f1(w)}" height="${f1(bh)}" rx="3" style="fill:${col}"/>`+T(x+w/2,y+h-bh-6,val,'t-sm t-mid','fill:var(--ink);font-weight:700')+T(x+w/2,y+h+14,lab,'t-xs t-mid')}
  function drawAh(t){
    const N=vb(ah,'720 360','400 600');const p=phaseOf(AH,t),u=ramp(t,AH[p].from,AH[p].from+.14);let s='';
    const W=N?400:720,cxm=W/2;
    s+=T(cxm,24,AH[p].t,'t-lbl t-mid');
    if(p===0){/* person with jaundice + lab bars */
      const ab=abdomen(N?200:130,N?46:52,N?.95:1.2,{jaundice:u,liver:true,fib:2});s+=ab.svg+T(N?200:130,N?268:330,'jaundice within 8 weeks','t-xs t-mid');
      const L=N?{x:40,y:310,w:320}:{x:290,y:60,w:400};const rows=[['AST','> 50 and < 400 IU/L',.55],['AST/ALT ratio','> 1.5',.5],['ALT','< 400 IU/L',.35],['Bilirubin','> 3.0 mg/dL',.7],['Alcohol','> 40 g/day (women) or > 60 g/day (men), ≥ 6 months',.9]];
      rows.forEach(([n,c,v],i)=>{const y=L.y+i*(N?52:56),bw=L.w*v*ease(ramp(u,i*.12,i*.12+.5));s+=T(L.x,y,n,'t-sm','fill:var(--ink);font-weight:700')+`<rect x="${L.x}" y="${y+6}" width="${L.w}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${L.x}" y="${y+6}" width="${f1(bw)}" height="12" rx="6" style="fill:${i===4?'var(--liver)':'var(--bile)'}"/>`+T(L.x,y+34,c,'t-xs')});
    }else if(p===1){const g1=N?{x:200,y:200,r:120}:{x:200,y:230,r:140},mv=lerp(6,23.5,ease(u));
      s+=gauge(g1.x,g1.y,g1.r,mv,40,{bands:[{to:20,col:'var(--good)'},{to:40,col:'var(--bad)'}],big:true,label:'MELD (median in global cohort: 23.5)',lo:'6',hi:'40'});
      s+=T(g1.x+g1.r*.35,g1.y-g1.r*1.02,'> 20 = severe','t-sm','fill:var(--bad);font-weight:700');
      const bx=N?40:400,by=N?300:80;const r28=20*ramp(u,.3,.8),r90=30.9*ramp(u,.5,1);
      s+=T(bx,by,'Global AH cohort, 2,581 people','t-sm','fill:var(--ink)');
      [['28 days',r28,20],['90 days',r90,30.9]].forEach(([l,v,full],i)=>{const y=by+24+i*44;s+=T(bx,y,l,'t-xs')+`<rect x="${bx}" y="${y+6}" width="${N?320:280}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+6}" width="${f1((N?320:280)*v/100)}" height="16" rx="4" style="fill:var(--bad)"/>`+T(bx+(N?320:280)*v/100+6,y+19,f1(v)+'% died','t-sm','fill:var(--ink)')});
      s+=T(bx,by+128,'Maddrey DF ≥ 32 (ACG 2018) also marks','t-xs')+T(bx,by+142,'severe disease, with about 20–50% 30-day','t-xs')+T(bx,by+156,'mortality; MELD predicted death better.','t-xs');
    }else if(p===2){const B=N?{x:50,y:70,w:300,h:220}:{x:60,y:60,w:380,h:230};const arms=[['placebo',17],[N?'pred.':'prednisolone',14],[N?'pentox.':'pentoxifylline',19],['both',13]];const bw=B.w/4*.6;
      s+=T(B.x,B.y-14,'STOPAH: 28-day mortality','t-sm','fill:var(--ink)')+`<line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+B.h}" y2="${B.y+B.h}" class="axis"/>`;
      arms.forEach(([n,v],i)=>{s+=bar(B.x+i*B.w/4+(B.w/4-bw)/2,B.y,bw,B.h,v*ease(ramp(u,i*.1,i*.1+.6)),25,n.startsWith('pred')||n==='both'?'var(--rx)':'var(--muted)',n,Math.round(v*ease(ramp(u,i*.1,i*.1+.6)))+'%')});
      const ix=N?50:490,iy=N?350:90;s+=T(ix,iy,'Serious infections','t-sm','fill:var(--ink)');
      [['prednisolone',13,'var(--bad)'],['no prednisolone',7,'var(--muted)']].forEach(([n,v,c],i)=>{const y=iy+16+i*34;s+=`<rect x="${ix}" y="${y}" width="${f1(10*v*ramp(u,.4,1))}" height="16" rx="3" style="fill:${c}"/>`+T(ix+10*v*ramp(u,.4,1)+6,y+12,Math.round(v*ramp(u,.4,1))+'% '+n,'t-xs','fill:var(--ink)')});
      s+=T(ix,iy+102,'Prednisolone OR 0.72','t-xs')+T(ix,iy+116,'(95% CI 0.52–1.01; P = 0.06)','t-xs')+T(ix,iy+130,'No benefit at 90 days or 1 year.','t-xs');
    }else if(p===3){const st=N?[200,70]:[110,180],a=N?[90,250]:[360,90],b=N?[310,250]:[360,270];
      const stc=`<circle cx="${st[0]}" cy="${st[1]}" r="34" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:2"/>`+T(st[0],st[1]-2,'steroids','t-sm t-mid','fill:var(--ink)')+T(st[0],st[1]+12,'days 1–7','t-xs t-mid');
      const k=ease(u);[[a,'var(--good)','Lille < 0.45','responders (~60%)','85%'],[b,'var(--bad)','Lille ≥ 0.45','non-responders (~40%)','25%']].forEach(([pt,col,l1,l2,sv])=>{const ex=lerp(st[0],pt[0],k),ey=lerp(st[1],pt[1],k);
        s+=`<path d="M${st[0]} ${st[1]}L${f1(ex)} ${f1(ey)}" style="stroke:${col};stroke-width:4;stroke-linecap:round;opacity:.8"/>`;
        if(k>.95)s+=`<rect x="${pt[0]-(N?82:70)}" y="${pt[1]-40}" width="${N?164:140}" height="${N?120:84}" rx="10" style="fill:var(--panel);stroke:${col};stroke-width:2"/>`+T(pt[0],pt[1]-20,l1,'t-sm t-mid','fill:var(--ink);font-weight:700')+T(pt[0],pt[1]-6,l2,'t-xs t-mid')+T(pt[0],pt[1]+24,sv,'t-big t-mid',`fill:${col};font-size:24px`)+T(pt[0],pt[1]+38,'6-month survival','t-xs t-mid')});
      s+=stc;if(!N){s+=T(520,120,'28-day survival on steroids','t-sm','fill:var(--ink)')+T(520,136,'by response (pooled trials):','t-sm','fill:var(--ink)');
        [['complete',91.1],['partial',79.4],['null',53.3]].forEach(([n,v],i)=>{const y=156+i*36;s+=`<rect x="520" y="${y}" width="${f1(1.6*v*ramp(u,.5,1))}" height="16" rx="3" style="fill:${i===2?'var(--bad)':'var(--good)'};opacity:${i===1?.7:1}"/>`+T(520,y+30,`${n}: ${v}%`,'t-xs','fill:var(--ink)')})}
      else s+=T(200,460,'28-day survival by response: complete 91.1%,','t-xs t-mid')+T(200,474,'partial 79.4%, null 53.3% (pooled trials)','t-xs t-mid');
    }else{const B=N?{x:60,y:80,w:280,h:200}:{x:70,y:70,w:300,h:220};const bw=B.w*.28;
      s+=T(B.x,B.y-16,'6-month survival, selected non-responders','t-sm','fill:var(--ink)')+`<line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+B.h}" y2="${B.y+B.h}" class="axis"/>`;
      s+=bar(B.x+B.w*.12,B.y,bw,B.h,77*ease(u),100,'var(--rx)','early transplant',Math.round(77*ease(u))+'%')+bar(B.x+B.w*.6,B.y,bw,B.h,23*ease(u),100,'var(--muted)','matched controls',Math.round(23*ease(u))+'%');
      const lx=N?40:440,ly=N?360:90;s+=T(lx,ly,'ACCELERATE-AH (147 early transplants)','t-sm','fill:var(--ink)');
      [['alive at 1 year',94,'var(--rx)'],['alive at 3 years',84,'var(--rx)'],['sustained drinking by 3 years',17,'var(--bad)']].forEach(([n,v,c],i)=>{const y=ly+18+i*40,w=(N?300:240)*v/100*ramp(u,.3+i*.15,.8+i*.07);s+=`<rect x="${lx}" y="${y}" width="${f1(w)}" height="14" rx="3" style="fill:${c}"/>`+T(lx,y+28,`${v}% ${n}`,'t-xs','fill:var(--ink)')});
      s+=T(lx,ly+148,'Fewer than 2% of people admitted with','t-xs')+T(lx,ly+162,'severe AH were selected in the pilot.','t-xs');
    }
    ah.innerHTML=s;$('#alAhNote').innerHTML=noteHTML(AH[p]);setAh(p);
  }
  const stopAh=playWire(ar,$('#alAhPlay'),drawAh,20000,'Replay','alcohol');
  setAh=stepWire($('#alAhSteps'),AH,ar,drawAh,stopAh);drawAh(+ar.value);

  /* ---------- 4. abstinence over five years ---------- */
  const XIE=[[.5,.48,0],[1,.58,0],[1.5,.51,1],[2,.55,1],[3,.54,1],[4,.60,1],[5,.63,1]];
  const HOF=[[0,0],[1,12.3],[2,23.4],[5,33.8]];
  const ab=$('#alAbs'),abr=$('#alAbsT');
  const hofAt=y=>{for(let i=1;i<HOF.length;i++)if(y<=HOF[i][0]){const a=HOF[i-1],b=HOF[i],u=(y-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*(u*(2-u)*.5+u*.5)}return HOF[HOF.length-1][1]};
  function drawAbs(t){
    const N=vb(ab,'720 330','400 560');const Y=t*5;let s='';
    const P1=N?{x:56,y:44,w:310,h:190}:{x:62,y:46,w:270,h:220},P2=N?{x:56,y:318,w:310,h:190}:{x:420,y:46,w:270,h:220};
    /* left: HR */
    const X1=v=>P1.x+P1.w*v/5,Y1=v=>P1.y+P1.h-P1.h*v/1.2;
    s+=T(P1.x,P1.y-16,'Death: abstinence vs continued drinking','t-sm','fill:var(--ink)')+`<rect x="${P1.x}" y="${P1.y}" width="${P1.w}" height="${P1.h}" style="fill:var(--field)"/>`;
    [0,.25,.5,.75,1].forEach(v=>{s+=`<line x1="${P1.x}" x2="${P1.x+P1.w}" y1="${f1(Y1(v))}" y2="${f1(Y1(v))}" class="${v===1?'axis':'grid'}"/>`+T(P1.x-5,Y1(v)+3,v,'t-xs t-end')});
    s+=T(P1.x+P1.w-4,Y1(1)+13,'HR 1 = no difference','t-xs t-end');
    for(let v=0;v<=5;v++)s+=T(X1(v),P1.y+P1.h+15,v,'t-xs t-mid');s+=T(P1.x+P1.w,P1.y+P1.h+30,'years','t-xs t-end');
    s+=`<text transform="translate(${P1.x-30} ${P1.y+P1.h/2}) rotate(-90)" class="t-xs t-mid">hazard ratio</text>`;
    const shown=XIE.filter(d=>d[0]<=Y+.01);
    if(shown.length>1)s+=`<path d="M${shown.map(d=>f1(X1(d[0]))+' '+f1(Y1(d[1]))).join('L')}" style="fill:none;stroke:var(--rx);stroke-width:2;opacity:.7"/>`;
    shown.forEach(d=>{const x=X1(d[0]),y=Y1(d[1]);if(d[0]===1.5)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(Y1(.33))}" y2="${f1(Y1(.81))}" style="stroke:var(--rx);stroke-width:1.5"/>`;if(d[0]===5)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(Y1(.52))}" y2="${f1(Y1(.76))}" style="stroke:var(--rx);stroke-width:1.5"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:${d[2]?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.8"/>`+T(x,y+([1,2,4].includes(d[0])?-9:17),d[1].toFixed(2),'t-xs t-mid','fill:var(--ink)')});
    if(Y>=1.5)s+=`<rect x="${f1(X1(1.5))}" y="${P1.y+4}" width="${f1(X1(5)-X1(1.5))}" height="16" rx="4" style="fill:var(--rx-soft)"/>`+T(X1(3.25),P1.y+16,'significant from 1.5 years','t-xs t-mid','fill:var(--rx)');
    s+=`<circle cx="${P1.x+8}" cy="${P1.y+P1.h-12}" r="4" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/>`+T(P1.x+16,P1.y+P1.h-8,'not significant','t-xs');
    /* right: recompensation */
    const X2=v=>P2.x+P2.w*v/5,Y2=v=>P2.y+P2.h-P2.h*v/40;
    s+=T(P2.x,P2.y-16,'Recompensation after stopping (cumulative %)','t-sm','fill:var(--ink)')+`<rect x="${P2.x}" y="${P2.y}" width="${P2.w}" height="${P2.h}" style="fill:var(--field)"/>`;
    [0,10,20,30,40].forEach(v=>{s+=`<line x1="${P2.x}" x2="${P2.x+P2.w}" y1="${f1(Y2(v))}" y2="${f1(Y2(v))}" class="${v?'grid':'axis'}"/>`+T(P2.x-5,Y2(v)+3,v+'%','t-xs t-end')});
    for(let v=0;v<=5;v++)s+=T(X2(v),P2.y+P2.h+15,v,'t-xs t-mid');s+=T(P2.x+P2.w,P2.y+P2.h+30,'years','t-xs t-end');
    let d='';const n=60;for(let i=0;i<=n;i++){const y=Y*i/n;d+=(i?'L':'M')+f1(X2(y))+' '+f1(Y2(hofAt(y)))}
    if(Y>0)s+=`<path d="${d}L${f1(X2(Y))} ${f1(Y2(0))}L${f1(X2(0))} ${f1(Y2(0))}Z" style="fill:var(--rx);opacity:.15"/><path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:2.6"/>`;
    HOF.slice(1).forEach(([y,v])=>{if(Y>=y-.01)s+=`<circle cx="${f1(X2(y))}" cy="${f1(Y2(v))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>`+T(X2(y)-(y===5?8:0),Y2(v)-10,v+'%','t-sm'+(y===5?' t-end':' t-mid'),'fill:var(--ink);font-weight:700')});
    s+=`<line x1="${f1(X2(Y))}" x2="${f1(X2(Y))}" y1="${P2.y}" y2="${P2.y+P2.h}" style="stroke:var(--ink);opacity:.3"/>`+`<line x1="${f1(X1(Y))}" x2="${f1(X1(Y))}" y1="${P1.y}" y2="${P1.y+P1.h}" style="stroke:var(--ink);opacity:.3"/>`;
    ab.innerHTML=s;
    const early=Y<1.5;
    $('#alAbsNote').innerHTML=noteHTML({k:`Year ${Y.toFixed(1)}`,t:early?'The benefit takes time to show':'Stopping keeps paying off',
      txt:early?`In a meta-analysis of 7 cohorts (1,235 people with alcohol-related cirrhosis), the hazard ratios at 0.5 and 1 year (0.48 and 0.58) were not statistically significant. Separately, among people with decompensated cirrhosis who stopped drinking, 12.3% had regained compensation by 1 year. <sup class="c" data-ref="Xie2014HepatolRes,Hofer2026JHep" title="Source 202,503">202,503</sup>`
        :`The survival benefit of abstinence reached significance from 1.5 years (HR 0.51; 95% CI 0.33–0.81) and persisted to 5 years (HR 0.63; 95% CI 0.52–0.76). Recompensation reached 33.8% by 5 years and was linked to lower all-cause mortality (aHR 0.255); no recompensated person who stayed abstinent died of liver causes or developed liver cancer. <sup class="c" data-ref="Xie2014HepatolRes,Hofer2026JHep" title="Source 202,503">202,503</sup>`,
      pt:early?`The benefit of stopping drinking can take a year or more to show up in the numbers. That is not a reason to wait.`:`People who stop drinking live longer on average, and some recover enough that their complications go away.`,
      hook:`Abstinence in alcohol-related cirrhosis: HR for death 0.51 at 1.5 years and 0.63 at 5 years. <sup class="c" data-ref="Xie2014HepatolRes" title="Source 503">503</sup>`});
  }
  playWire(abr,$('#alAbsPlay'),drawAbs,9000,'Replay','alcohol');drawAbs(+abr.value);
};
/* =============== 2.2 Fatty liver disease (MASLD & MASH) =============== */
inits.masld=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const MEAS={a:{n:'Death or liver transplant, hazard ratio vs F0',v:[1,1.88,2.89,3.76,10.9],max:12,ref:'Angulo 2015, 619 people'},
              d:{n:'Liver-related death, mortality rate ratio vs F0',v:[1,1.41,9.57,16.69,42.30],max:46,ref:'Dulai 2017, 1,495 people'}};
  let meas='a';
  const STEPS=[
    {from:0,at:.07,k:'Before the fat',t:'Metabolic risk builds',
     txt:`MASLD needs fat in the liver plus at least 1 of 5 cardiometabolic risk factors. The paper names body-mass index, waist circumference, blood pressure and HDL cholesterol among them. Type 2 diabetes is a strong link: 55.5% of people with type 2 diabetes had NAFLD in a meta-analysis of 80 studies. <sup class="c" data-ref="Rinella2023MASLD,Younossi2019T2D" title="Source 382,508">382,508</sup>`,
     pt:`Things like a large waist, high blood pressure, high blood sugar and low "good" cholesterol make fat build up in the liver.`,
     hook:`MASLD = steatosis + ≥1 of 5 cardiometabolic criteria. <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>`},
    {from:.15,at:.27,k:'Steatotic liver disease',t:'Fat builds up: MASLD',
     txt:`"Steatotic liver disease" (SLD) is the umbrella term; with a cardiometabolic risk factor it is metabolic dysfunction-associated steatotic liver disease (MASLD), formerly NAFLD. Global prevalence in 92 population studies was 30.05%, rising from 25.26% (1990–2006) to 38.00% (2016–2019). It was highest in Latin America (44.37%). <sup class="c" data-ref="Rinella2023MASLD,Younossi2023Hepatology" title="Source 382,509">382,509</sup>`,
     pt:`About 3 in 10 adults worldwide have extra fat in the liver linked to metabolism, and the number is growing.`,
     hook:`Global MASLD/NAFLD prevalence ≈ 30% (30.05%), up from 25% to 38% over three decades. <sup class="c" data-ref="Younossi2023Hepatology" title="Source 509">509</sup>`},
    {from:.35,at:.45,k:'Inflammation',t:'MASH: steatohepatitis',
     txt:`MASLD with inflammation and liver-cell injury is called MASH, formerly NASH. A 2015 review estimated NAFLD in about 30% and NASH in about 5% of the US population. On paired biopsies, fibrosis advanced about one stage every 14.3 years in simple steatosis but every 7.1 years in NASH. <sup class="c" data-ref="Rinella2023MASLD,Rinella2015JAMA,Singh2015" title="Source 380,382,430">380,382,430</sup>`,
     pt:`In some people the fatty liver becomes inflamed. This speeds up scarring.`,
     hook:`Fibrosis progression: about 1 stage per 14.3 years (steatosis) vs 7.1 years (steatohepatitis). <sup class="c" data-ref="Singh2015" title="Source 430">430</sup>`},
    {from:.52,at:.63,k:'Scar',t:'Fibrosis: the stage that predicts the future',
     txt:`In 619 people followed for a median 12.6 years, fibrosis stage, "but no other histologic features", predicted death or transplant. Over follow-up of paired biopsies, 33.6% of people progressed, 43.1% were stable and 22.3% improved. Press the buttons above the stepper to switch between all deaths and liver-related deaths. <sup class="c" data-ref="Angulo2015,Singh2015" title="Source 18,430">18,430</sup>`,
     pt:`What matters most for the future is how much scar the liver has, not how much fat it holds.`,
     hook:`In MASLD, fibrosis stage, not inflammation activity, is the strongest predictor of death. <sup class="c" data-ref="Angulo2015,Dulai2017" title="Source 18,103">18,103</sup>`},
    {from:.72,at:.81,k:'Stage F4',t:'Cirrhosis',
     txt:`At F4 the hazard of death or transplant was 10.9 times that at F0, and liver-related events 51.5 times. In a meta-analysis of 5 cohorts, liver-related mortality was 42.30 times that at F0. In the NASH CRN cohort, hepatic encephalopathy occurred at 2.39 and ascites at 1.20 per 100 person-years at F4, against 0.02 and 0.04 at F0–F2. <sup class="c" data-ref="Angulo2015,Dulai2017,Sanyal2021NAFLD" title="Source 18,103,403">18,103,403</sup>`,
     pt:`Once scarring reaches cirrhosis, the risk of serious liver problems climbs steeply.`,
     hook:`Liver-related mortality rate ratio vs F0: F2 9.57, F3 16.69, F4 42.30. <sup class="c" data-ref="Dulai2017" title="Source 103">103</sup>`},
    {from:.88,at:.95,k:'Two causes at once',t:'MetALD and the other names',
     txt:`MetALD is MASLD plus greater alcohol intake: 140–350 g a week for women and 210–420 g a week for men, with a continuum of how much each cause contributes. Steatosis with no metabolic risk factor and no known cause is "cryptogenic" SLD. Most people with alcohol-related liver disease also have cardiometabolic risk factors. <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>`,
     pt:`Some people have both a metabolic cause and a drinking cause. The new name MetALD covers that overlap.`,
     hook:`MetALD = MASLD + 140–350 g/week (women) or 210–420 g/week (men) of alcohol. <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>`}];
  const svg=$('#maSvg'),rg=$('#maT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 560');const p=phaseOf(STEPS,t);
    const risk=ramp(t,0,.12),fat=ramp(t,.14,.3),hurt=ramp(t,.35,.48),fib=4*ease(ramp(t,.5,.8));
    let s='';
    const L=N?{x:200,y:88,s:1.1}:{x:172,y:112,s:1.35};
    s+=liver(L.x,L.y,L.s,{fib,seed:21}).svg;
    if(fat>.05){const r=rng(9);for(let i=0;i<30;i++){const d=r(),px=L.x+(r()*150-80)*L.s*.8,py=L.y+(r()*70-40)*L.s*.8;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1((1.4+2.6*d)*L.s*fat)}" style="fill:var(--accent-soft);stroke:var(--bile);stroke-width:.6;opacity:${f1(.85*fat)}"/>`}}
    s+=T(L.x,N?26:28,['Liver at risk','MASLD','MASH','Fibrosis F'+Math.min(3,Math.max(1,Math.round(fib))),'Cirrhosis (F4)','MetALD: alcohol on top'][p],'t-lbl t-mid');
    const cy=N?208:286,cx=N?[110,200,290]:[92,172,252],cs=N?48:56;
    cx.forEach((x,i)=>{const h=clamp(hurt*(.55+i*.25));s+=hepatocyte(x,cy,cs,{fat:clamp(fat*(1.1-i*.1)),hurt:h,seed:7+i});
      if(h>.3)for(let k=0;k<3;k++){const a=k*2.1+i;s+=`<circle cx="${f1(x+Math.cos(a)*cs*.62)}" cy="${f1(cy+Math.sin(a)*cs*.5)}" r="3" style="fill:var(--nh3-fill);opacity:${f1(h)}"/>`}});
    if(fib>1)s+=collagen(cx[0]+cs*.45,cy+cs*.42,cx[2]-cs*.45,cy+cs*.42,{op:ramp(fib,1,3),amp:2.5});
    s+=T(cx[1],cy+cs*.62+14,'magnified liver cells','t-xs t-mid');
    /* risk badges around the liver */
    const RB=[['waist','var(--accent)'],['blood pressure','var(--bad)'],['blood sugar','var(--nh3)'],['HDL cholesterol','var(--portal)']];
    RB.forEach(([n,c],i)=>{const v=ramp(risk,i*.2,i*.2+.4);if(v<=0)return;const w=n.length*5.8+16,row=i>>1,pair=RB.slice(row*2,row*2+2).map(r=>r[0].length*5.8+16),tot=pair[0]+pair[1]+8,x0=L.x-tot/2+(i%2?pair[0]+8:0),y0=(N?L.y+62:L.y+78)+row*19;
      s+=`<g style="opacity:${f1(v)}"><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(w)}" height="16" rx="8" style="fill:var(--panel-2);stroke:${c};stroke-width:1.2"/>`+T(x0+w/2,y0+11.5,n,'t-xs t-mid','fill:var(--ink)')+'</g>'});
    /* right-hand panel */
    const R=N?{x:20,y:276,w:360,h:270}:{x:372,y:30,w:330,h:330};
    if(p===0){s+=T(R.x+R.w/2,R.y+14,'MASLD needs steatosis plus ≥ 1 of 5','t-sm t-mid','fill:var(--ink)')+T(R.x+R.w/2,R.y+30,'cardiometabolic risk factors','t-sm t-mid','fill:var(--ink)');
      const ab=abdomen(R.x+R.w/2,R.y+48,N?.95:1.05,{liver:true,fib:0});s+=ab.svg;
      s+=T(R.x+R.w/2,R.y+(N?262:290),'In type 2 diabetes: 55.5% had NAFLD','t-sm t-mid','fill:var(--nh3)');}
    else if(p<=2){const n=Math.round(30*ease(ramp(t,.16,.27)));const ox=R.x+(N?42:30),dx=N?28:28,dy=N?22:26,ps=N?17:20;
      s+=T(R.x+R.w/2,R.y+14,'100 adults worldwide','t-sm t-mid','fill:var(--ink)');
      for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10;s+=person(ox+c*dx,R.y+28+r*dy,ps,i<n?(p===2&&i<5?'var(--liver)':'var(--bile)'):'var(--muted)',{op:i<n?1:.3})}
      s+=T(R.x+R.w/2,R.y+28+10*dy+14,p===2?'about 30 with MASLD; in the US about 5 in 100 have MASH (red)':`${n} of 100 with MASLD (30.05%)`,'t-xs t-mid','fill:var(--ink)');}
    else if(p<=4){const M=MEAS[meas],B={x:R.x+34,y:R.y+40,w:R.w-50,h:R.h-90};const bw=B.w/5*.62,lit=p===3?Math.min(3,Math.max(1,Math.round(fib))):4;
      s+=T(R.x+R.w/2,R.y+14,M.n,'t-sm t-mid','fill:var(--ink)')+T(R.x+R.w/2,R.y+28,M.ref,'t-xs t-mid');
      s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+B.h}" y2="${B.y+B.h}" class="axis"/>`;
      const Yb=v=>B.y+B.h-B.h*v/M.max;s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${f1(Yb(1))}" y2="${f1(Yb(1))}" class="grid"/>`+T(B.x-4,Yb(1)+3,'1','t-xs t-end');
      M.v.forEach((v,i)=>{const on=i<=lit,x=B.x+i*B.w/5+(B.w/5-bw)/2,h=B.h*v/M.max*(i<4?ease(ramp(t,.52+i*.03,.6+i*.03)):ease(ramp(t,.72,.78)));
        if(on){s+=`<rect x="${f1(x)}" y="${f1(B.y+B.h-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:${i===4?'var(--liver)':'var(--scar-line)'}"/>`+T(x+bw/2,B.y+B.h-h-6,v,'t-sm t-mid','fill:var(--ink);font-weight:700')}
        s+=T(x+bw/2,B.y+B.h+15,'F'+i,'t-sm t-mid',on?'fill:var(--ink)':'')});}
    else{const cx0=R.x+R.w/2,y0=R.y+16;const node=(x,y,w,l1,l2,col)=>`<rect x="${f1(x-w/2)}" y="${f1(y)}" width="${f1(w)}" height="40" rx="9" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`+T(x,y+17,l1,'t-sm t-mid','fill:var(--ink);font-weight:700')+T(x,y+31,l2,'t-xs t-mid');
      const g=ease(ramp(t,.88,.94));s+=`<g style="opacity:${f1(.3+.7*g)}">`;
      s+=node(cx0,y0,200,'Steatotic liver disease','SLD: the umbrella','var(--muted)');
      const kids=[[cx0-R.w*.33,'MASLD','+ metabolic risk','var(--bile)'],[cx0,'MetALD','MASLD + alcohol','var(--liver)'],[cx0+R.w*.33,'Cryptogenic','no known cause','var(--muted)']];
      kids.forEach(([x,a,b,c])=>{s+=`<path d="M${f1(cx0)} ${y0+40}V${y0+62}H${f1(x)}V${y0+84}" style="fill:none;stroke:var(--line);stroke-width:1.5"/>`+node(x,y0+84,R.w*.31,a,b,c)});
      s+=`<path d="M${f1(kids[0][0])} ${y0+124}V${y0+150}" style="stroke:var(--line);stroke-width:1.5"/>`+node(kids[0][0],y0+150,R.w*.31,'MASH','steatohepatitis','var(--liver)');
      s+=`<rect x="${f1(cx0-R.w*.1)}" y="${y0+154}" width="${f1(R.w*.6)}" height="70" rx="9" style="fill:var(--liver-soft)"/>`;
      ['MetALD alcohol band:','women 140–350 g a week','men 210–420 g a week'].forEach((l,i)=>{if(l)s+=T(cx0+R.w*.2,y0+174+i*17,l,'t-sm t-mid','fill:var(--liver)')});
      s+='</g>';}
    svg.innerHTML=s;
    $('#maNote').innerHTML=noteHTML(STEPS[p]);setSt(p);
    $('#maRead').innerHTML=`<span>Fat: <b>${Math.round(fat*100)}%</b> (schematic)</span><span>Inflammation: <b>${hurt>.5?'yes':'no'}</b></span><span>Scar stage: <b>F${Math.round(fib)}</b></span>`;
  }
  const stop=playWire(rg,$('#maPlay'),draw,24000,'Replay','masld');
  setSt=stepWire($('#maSteps'),STEPS,rg,draw,stop);draw(+rg.value);
  $$('[data-mameas]').forEach(b=>b.addEventListener('click',()=>{meas=b.dataset.mameas;$$('[data-mameas]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));

  /* ---------- naming tool ---------- */
  const q={st:1,cm:1,al:0};
  function name(){let h;
    if(!q.st)h=['maybe','Not steatotic liver disease','Without fat in the liver, none of these names applies. Other causes of liver disease are covered in parts 2.1 to 2.4.'];
    else if(q.cm&&!q.al)h=['yes','MASLD','Steatosis with at least one cardiometabolic risk factor and little or no alcohol. With inflammation and liver-cell injury on biopsy it is MASH.'];
    else if(q.cm&&q.al)h=['maybe','MetALD','MASLD plus 140–350 g of alcohol a week (women) or 210–420 g (men). Each cause may contribute more or less: the paper describes a continuum.'];
    else if(!q.cm&&!q.al)h=['maybe','Cryptogenic steatotic liver disease','Steatosis with no metabolic risk factor and no known cause.'];
    else h=['no','Neither MASLD nor MetALD','Both need at least one cardiometabolic risk factor. With fat in the liver and this much alcohol, alcohol-related liver disease is the cause to think about: see 2.1.'];
    $('#maName').className='verdict '+h[0];$('#maName').innerHTML=`<b>${h[1]}</b>${h[2]} <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>`;}
  $$('[data-maq]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.maq;q[k]=+b.dataset.v;$$(`[data-maq="${k}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));name()}));
  name();

  /* ---------- weight loss bands ---------- */
  const ws=$('#maWl'),wr=$('#maWlT');
  const BAND=[
    {k:'Under 5% weight loss',t:'The whole programme',txt:`Across all 293 participants, whatever their weight loss, 25% had NASH resolution and 19% had fibrosis regression after 52 weeks. Only 30% of participants reached 5% or more. Results for the under-5% group alone are not given here. <sup class="c" data-ref="VilarGomez2015" title="Source 481">481</sup>`,
      pt:`Losing weight is hard, and most people in the programme lost less than 5%. Small changes still count toward heart health.`,res:25,reg:19,regLab:'19%',lab:'all participants'},
    {k:'5% or more',t:'NASH resolved in more than half',txt:`With at least 5% weight loss, NASH resolved in 58%. For an 80 kg person, 5% is 4 kg. The paper reports fibrosis regression for this band only as part of the overall result. <sup class="c" data-ref="VilarGomez2015" title="Source 481">481</sup>`,
      pt:`Losing about 1 in every 20 kg of body weight calmed the liver inflammation in more than half of people.`,hook:`≥5% weight loss: NASH resolution in 58%. <sup class="c" data-ref="VilarGomez2015" title="Source 481">481</sup>`,res:58,reg:null,lab:'≥5% loss'},
    {k:'10% or more',t:'Inflammation resolved in 9 in 10',txt:`Everyone who lost at least 10% of body weight had a lower NAFLD activity score: 90% had NASH resolution and 45% had fibrosis regression. EASL–EASD–EASO 2024 also names incretin-based medicines and bariatric surgery where they are indicated for diabetes or obesity. <sup class="c" data-ref="VilarGomez2015,EASL2024MASLD" title="Source 111,481">111,481</sup>`,
      pt:`Losing about 1 in every 10 kg of body weight calmed inflammation in 9 in 10 people and reduced scarring in almost half.`,hook:`≥10% weight loss: NASH resolution 90%, fibrosis regression 45%. <sup class="c" data-ref="VilarGomez2015" title="Source 481">481</sup>`,res:90,reg:45,regLab:'45%',lab:'≥10% loss'}];
  function drawWl(t){
    const N=vb(ws,'720 300','400 520');const wl=t*12,b=wl<5?0:wl<10?1:2,B=BAND[b];let s='';
    /* body outline slims */
    const bx=N?110:110,by=N?30:40,sc=N?.95:1.05,wid=1-wl/12*.22;
    s+=`<g transform="translate(${f1(bx)} ${f1(by)}) scale(${f1(wid*sc)} ${f1(sc)}) translate(${f1(-bx)} ${f1(-by)})">`+abdomen(bx,by,1,{liver:false}).svg+'</g>';
    const lv=liver(bx-4,by+92*sc,.48*sc,{fib:b===2?1:1.6,gb:false,seed:3});s+=lv.svg;
    const f=clamp(1-wl/12*.85);const r=rng(4);for(let i=0;i<14;i++){s+=`<circle cx="${f1(bx-4+(r()*70-38)*sc)}" cy="${f1(by+92*sc+(r()*30-18)*sc)}" r="${f1((1+r()*2.4)*f*sc*1.4)}" style="fill:var(--accent-soft);stroke:var(--bile);stroke-width:.6"/>`}
    s+=T(bx,by+248*sc,`${wl.toFixed(1)}% of body weight lost`,'t-sm t-mid','fill:var(--ink);font-weight:700');
    /* bars */
    const G=N?{x:40,y:330,w:320,h:150}:{x:270,y:40,w:410,h:200};
    s+=T(G.x,G.y-14,`Band: ${B.lab}`,'t-sm','fill:var(--ink);font-weight:700');
    [['NASH resolution',B.res,'var(--rx)',B.res+'%'],['Fibrosis regression',B.reg,'var(--scar-line)',B.reg==null?'not reported for this band':B.regLab]].forEach(([n,v,c,l],i)=>{const y=G.y+10+i*(G.h/2);
      s+=T(G.x,y,n,'t-sm','fill:var(--ink)')+`<rect x="${G.x}" y="${y+8}" width="${G.w}" height="26" rx="6" style="fill:var(--panel-2)"/>`;
      if(v!=null)s+=`<rect x="${G.x}" y="${y+8}" width="${f1(G.w*v/100)}" height="26" rx="6" style="fill:${c}"/>`;
      s+=T(v!=null&&v>70?G.x+G.w*v/100-8:G.x+(v||0)*G.w/100+8,y+26,l,'t-sm'+(v!=null&&v>70?' t-end':''),v!=null&&v>70?'fill:var(--panel);font-weight:700':'fill:var(--ink);font-weight:700')});
    /* band ticks */
    const TX=v=>G.x+G.w*v/12;s+=`<line x1="${G.x}" x2="${G.x+G.w}" y1="${G.y+G.h+18}" y2="${G.y+G.h+18}" class="axis"/>`;
    [0,5,10,12].forEach(v=>{s+=`<line x1="${f1(TX(v))}" x2="${f1(TX(v))}" y1="${G.y+G.h+14}" y2="${G.y+G.h+22}" class="axis"/>`+T(TX(v),G.y+G.h+34,v+'%','t-xs t-mid')});
    s+=`<circle cx="${f1(TX(wl))}" cy="${G.y+G.h+18}" r="6" style="fill:var(--liver)"/>`;
    ws.innerHTML=s;$('#maWlNote').innerHTML=noteHTML(B);
  }
  playWire(wr,$('#maWlPlay'),drawWl,8000,'Replay','masld');drawWl(+wr.value);
};
/* =============== 2.3 Viral hepatitis B & C =============== */
const HE_STEPS=[
 {from:0,at:.12,k:'Two viruses',t:'Who has hepatitis B and C',
  txt:`Hepatitis B and C were still the main causes of the global cirrhosis burden in GBD 2017, especially in low-income countries, although NASH (now MASH) was expected to overtake them "in the near future" <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup>. Modelling estimates 257.5 million people living with hepatitis B in 2022 (3.2%), of whom 36.0 million were diagnosed and only 6.8 million of the 83.3 million eligible were treated <sup class="c" data-ref="Polaris2023HBV" title="Source 360">360</sup>. For hepatitis C it estimates 56.8 million viraemic infections in 2020, down from 63.6 million in 2015 <sup class="c" data-ref="Polaris2022HCV" title="Source 359">359</sup>. Estimates differ by method: a 2023 seminar gives 296 million with chronic hepatitis B in 2019 <sup class="c" data-ref="Jeng2023Lancet" title="Source 215">215</sup>.`,
  pt:`Hepatitis B often passes from mother to baby at birth, and a vaccine given at birth protects babies <sup class="c" data-ref="Terrault2018AASLD,Jeng2023Lancet" title="Source 215,459">215,459</sup>. Hepatitis C spreads through blood: unsafe injection drug use and unsterile medical procedures are the major risk factors <sup class="c" data-ref="Manns2017NRDP" title="Source 288">288</sup>.`,
  hook:`Most people with hepatitis B are undiagnosed: 36.0 million of 257.5 million in 2022 <sup class="c" data-ref="Polaris2023HBV" title="Source 360">360</sup>.`},
 {from:.17,at:.28,k:'Hepatitis B',t:'Age decides who stays infected',
  txt:`After exposure, the chance that hepatitis B becomes chronic depends on age: 90% in newborns of HBeAg-positive mothers, 25–30% in infants and children under 5, and less than 5% in adults (AASLD 2018) <sup class="c" data-ref="Terrault2018AASLD" title="Source 459">459</sup>. Chronic infection then passes through phases that may each last decades <sup class="c" data-ref="Yuen2018NRDP" title="Source 512">512</sup>. Universal infant immunisation, including the birth dose, is described as the most effective prevention <sup class="c" data-ref="Jeng2023Lancet" title="Source 215">215</sup>, yet only 46% of infants had a timely birth dose in the most recent data <sup class="c" data-ref="Polaris2023HBV" title="Source 360">360</sup>.`,
  pt:`Babies who catch hepatitis B at birth usually keep it for life. Most adults who catch it clear it.`,
  hook:`Chronicity by age: 90% newborns of HBeAg+ mothers, 25–30% under-5s, &lt;5% adults <sup class="c" data-ref="Terrault2018AASLD" title="Source 459">459</sup>.`},
 {from:.33,at:.45,k:'REVEAL-HBV',t:'More virus, more scar',
  txt:`REVEAL-HBV followed 3,582 untreated people with hepatitis B in Taiwan for a mean of 11 years. Cumulative incidence of cirrhosis rose from 4.5% at HBV DNA below 300 copies/mL to 36.2% at 10<sup>6</sup> copies/mL or more. Adjusted for HBeAg and ALT, the relative risks were 2.5, 5.6 and 6.5 across the three highest bands <sup class="c" data-ref="Iloeje2006" title="Source 206">206</sup>. Liver cancer followed the same gradient, from 108 to 1,152 per 100,000 person-years <sup class="c" data-ref="Chen2006JAMA" title="Source 72">72</sup>.`,
  pt:`The more hepatitis B virus there is in the blood, the higher the chance of scarring and liver cancer <sup class="c" data-ref="Iloeje2006,Chen2006JAMA" title="Source 72,206">72,206</sup>.`,
  hook:`HBV DNA level predicts cirrhosis independently of HBeAg and ALT: RR 6.5 at ≥10<sup>6</sup> copies/mL <sup class="c" data-ref="Iloeje2006" title="Source 206">206</sup>.`},
 {from:.5,at:.63,k:'Treating hepatitis B',t:'Quiet the virus, scar recedes',
  txt:`Nucleos(t)ide analogues and peginterferon can prevent cirrhosis and HCC, but they do not eradicate HBV and rarely clear HBsAg <sup class="c" data-ref="Jeng2023Lancet" title="Source 215">215</sup>. In a lamivudine trial in advanced fibrosis or cirrhosis, disease progression fell from 17.7% on placebo to 7.8% <sup class="c" data-ref="Liaw2004NEJM" title="Source 266">266</sup>. On tenofovir DF, 71 of 96 people (74%) with cirrhosis at baseline no longer had cirrhosis on biopsy at year 5 <span class="ev est">Established</span> <sup class="c" data-ref="Marcellin2013" title="Source 289">289</sup>. The labels carry a boxed warning that stopping anti-hepatitis B therapy can cause severe acute flares <sup class="c" data-ref="FDA-Baraclude,FDA-Viread,FDA-Vemlidy" title="Source 128,149,150">128,149,150</sup>. AASLD 2018 states that HCC risk persists despite suppression, so surveillance should continue in people at risk <sup class="c" data-ref="Terrault2018AASLD" title="Source 459">459</sup>.`,
  pt:`Hepatitis B pills do not remove the virus, but they keep it quiet, and in many people the scarring gets better over years. Do not stop them without talking to your liver team <sup class="c" data-ref="Marcellin2013,FDA-Viread" title="Source 150,289">150,289</sup>.`,
  hook:`Long-term tenofovir: cirrhosis had regressed in 74% (71 of 96) on the 5-year biopsy <sup class="c" data-ref="Marcellin2013" title="Source 289">289</sup>.`},
 {from:.67,at:.82,k:'Hepatitis C',t:'Slow scarring over decades',
  txt:`About 26% of people clear hepatitis C on their own after acute infection <sup class="c" data-ref="Micallef2006" title="Source 305">305</sup>. For the rest, scarring is usually slow. In 2,235 untreated French patients the median fibrosis progression was 0.133 METAVIR units a year, a median of 30 years to cirrhosis: 13 years in men infected after 40, 42 years in women infected before 40 who did not drink <sup class="c" data-ref="Poynard1997" title="Source 366">366</sup>. A meta-analysis estimated 16% with cirrhosis 20 years after infection (7% in non-clinical, 18% in clinical settings) <sup class="c" data-ref="Thein2008" title="Source 461">461</sup>. Once cirrhosis is present, the yearly risk is 1–5% for HCC and 3–6% for decompensation <sup class="c" data-ref="Westbrook2014" title="Source 495">495</sup>.`,
  pt:`Hepatitis C usually scars the liver slowly, over decades. Older age at infection, drinking 50 g of alcohol a day or more, and male sex speed it up <sup class="c" data-ref="Poynard1997" title="Source 366">366</sup>.`,
  hook:`About 16% of people with chronic HCV have cirrhosis 20 years after infection <sup class="c" data-ref="Thein2008" title="Source 461">461</sup>.`},
 {from:.84,at:.97,k:'Cure',t:'DAA cure, and what follows',
  txt:`Direct-acting antivirals cure hepatitis C (SVR12) in more than 90% <sup class="c" data-ref="Manns2017NRDP" title="Source 288">288</sup>: 99% with 12 weeks of sofosbuvir–velpatasvir in ASTRAL-1 <sup class="c" data-ref="Feld2015ASTRAL1" title="Source 153">153</sup> and 99% with glecaprevir–pibrentasvir in compensated cirrhosis in EXPEDITION-1 <sup class="c" data-ref="Forns2017EXPEDITION1" title="Source 162">162</sup>. Cure changes outcomes. In 530 interferon-treated people with advanced fibrosis or cirrhosis, 10-year mortality was 8.9% with SVR versus 26.0% without, and HCC 5.1% versus 21.8% <span class="ev est">Established</span> <sup class="c" data-ref="vanderMeer2012" title="Source 477">477</sup>. In 22,500 US veterans treated with DAAs, SVR cut HCC from 3.45 to 0.90 per 100 person-years, but people with cirrhosis still had 1.82 per 100 person-years, so the authors advised ongoing surveillance <sup class="c" data-ref="Kanwal2017" title="Source 225">225</sup>.`,
  pt:`If you already have cirrhosis, keep having your liver cancer checks after hepatitis C is cured. The risk goes down but does not go away <sup class="c" data-ref="Kanwal2017" title="Source 225">225</sup>.`,
  hook:`After SVR, people with cirrhosis still need HCC surveillance (1.82 HCC per 100 person-years) <sup class="c" data-ref="Kanwal2017" title="Source 225">225</sup>.`}
];
const HE_CURE=[
 {k:'spont',lab:'No treatment',short:'no treatment: clear it alone',v:26,col:'var(--muted)',
  txt:`Not a treatment: in 31 studies of acute hepatitis C, a weighted mean of 26% cleared the virus spontaneously, more often women <sup class="c" data-ref="Micallef2006" title="Source 305">305</sup>. The other three in four go on to chronic infection.`},
 {k:'peg',lab:'2013: with peginterferon',short:'SOF + PEG-IFN + RBV, 2013',v:90,col:'var(--accent)',
  txt:`In the 2013 phase 3 sofosbuvir trials, 90% of previously untreated people (mainly genotype 1 or 4) given 12 weeks of sofosbuvir plus peginterferon–ribavirin reached SVR <sup class="c" data-ref="Lawitz2013" title="Source 259">259</sup>. Interferon still had to be injected. The first interferon-free combination, ledipasvir–sofosbuvir, was approved by the FDA on 10 October 2014 <sup class="c" data-ref="FDA-Harvoni" title="Source 133">133</sup>.`},
 {k:'astral1',lab:'ASTRAL-1',short:'ASTRAL-1 sof–vel, 12 wk',v:99,col:'var(--rx)',
  txt:`ASTRAL-1: sofosbuvir–velpatasvir for 12 weeks in genotypes 1, 2, 4, 5 and 6 (624 treated, 19% with cirrhosis). SVR12 was 99% (95% CI 98 to &gt;99), against 0 of 116 on placebo <sup class="c" data-ref="Feld2015ASTRAL1" title="Source 153">153</sup>.`},
 {k:'exp1',lab:'EXPEDITION-1',short:'EXPEDITION-1, compensated',v:99,col:'var(--rx)',
  txt:`EXPEDITION-1: glecaprevir–pibrentasvir for 12 weeks in 146 people with compensated cirrhosis. 145 (99%) reached SVR12 <sup class="c" data-ref="Forns2017EXPEDITION1" title="Source 162">162</sup>.`},
 {k:'astral4',lab:'ASTRAL-4',short:'ASTRAL-4 decomp., + RBV',v:94,col:'var(--rx)',
  txt:`ASTRAL-4: decompensated (Child–Pugh B) cirrhosis. SVR12 was 83% with 12 weeks of sofosbuvir–velpatasvir, 94% with ribavirin added, and 86% with 24 weeks <sup class="c" data-ref="Curry2015ASTRAL4" title="Source 89">89</sup>. Cure is still very likely, but less certain once the liver has decompensated.`}
];
inits.hepatitis=()=>{
  const svg=$('#heSvg'),rg=$('#heT'),S=HE_STEPS;
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const R4=(x,y,w,h,st,rx=2)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const vir=(x,y,r,col,op)=>{let g=`<g style="opacity:${f1(op)}">`;for(let i=0;i<6;i++){const a=i/6*6.283;g+=`<line x1="${f1(x+Math.cos(a)*r)}" y1="${f1(y+Math.sin(a)*r)}" x2="${f1(x+Math.cos(a)*r*1.55)}" y2="${f1(y+Math.sin(a)*r*1.55)}" style="stroke:${col};stroke-width:1.2"/>`}
    return g+`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.42)}" style="fill:${col}"/></g>`};
  const HBC='var(--portal)',HCC='var(--dx)';
  /* ---- chart panels, each drawn into a rectangle R={x,y,w,h} ---- */
  function hbvBurden(R,u){const v=257.5*ease(ramp(u,0,.3));let s='';
    s+=T(R.x,R.y+20,`${v.toFixed(1)} million`,'t-big',`font-size:22px;fill:${HBC}`);
    s+=T(R.x,R.y+36,'living with hepatitis B in 2022 · 3.2% of the world');
    const rows=[['living with HBV',257.5],['eligible for treatment',83.3],['diagnosed',36.0],['on treatment',6.8]],lw=136,bm=R.w-lw-64,y0=R.y+48,rh=(R.h-50)/4;
    rows.forEach(([l,val],i)=>{const g=ease(ramp(u,.05+i*.1,.3+i*.1)),yy=y0+i*rh,bw=Math.max(2,bm*val/257.5)*g;
      s+=T(R.x,yy+rh*.62,l)+R4(R.x+lw,yy+rh*.2,bw,rh*.56,`fill:${HBC};opacity:${f1(.35+.5*(1-i/4))}`)+(g>.05?T(R.x+lw+bw+6,yy+rh*.62,`${(val*g).toFixed(1)} M`,'t-xs','fill:var(--ink)'):'')});
    return s}
  function hcvBurden(R,u){const v=56.8*ease(ramp(u,0,.3));let s='';
    s+=T(R.x,R.y+20,`${v.toFixed(1)} million`,'t-big',`font-size:22px;fill:${HCC}`);
    s+=T(R.x,R.y+36,'viraemic hepatitis C infections, 1 January 2020');
    const rows=[['viraemic, 2015',63.6],['viraemic, 2020',56.8],['diagnosed, end 2020',12.9],['began treatment, 2020',.641]],lw=136,bm=R.w-lw-64,y0=R.y+48,rh=(R.h-50)/4;
    rows.forEach(([l,val],i)=>{const g=ease(ramp(u,.05+i*.1,.3+i*.1)),yy=y0+i*rh,bw=Math.max(2,bm*val/63.6)*g;
      s+=T(R.x,yy+rh*.62,l)+R4(R.x+lw,yy+rh*.2,bw,rh*.56,`fill:${HCC};opacity:${f1(.35+.5*(1-i/4))}`)+(g>.05?T(R.x+lw+bw+6,yy+rh*.62,val<1?`${Math.round(641*g)},000`:`${(val*g).toFixed(1)} M`,'t-xs','fill:var(--ink)'):'')});
    return s}
  function hbvChronic(R,u){let s=T(R.x,R.y+14,'How often infection becomes chronic','t-lbl')+T(R.x,R.y+28,'by age at infection (AASLD 2018)');
    const B=[{v:90,txt:'90%',l:['newborn of','HBeAg+ mother']},{v:25,v2:30,txt:'25–30%',l:['infant or','child under 5']},{v:5,lt:1,txt:'under 5%',l:['adult','']}];
    const yb=R.y+R.h-26,mh=R.h-72,bw=Math.min(54,R.w/6);
    s+=`<line x1="${f1(R.x)}" x2="${f1(R.x+R.w)}" y1="${f1(yb)}" y2="${f1(yb)}" class="axis"/>`;
    B.forEach((b,i)=>{const cx=R.x+R.w*(i+.5)/3,g=ease(ramp(u,.04+i*.16,.26+i*.16)),h=mh*b.v/100*g;
      if(b.v2)s+=R4(cx-bw/2,yb-mh*b.v2/100*g,bw,mh*b.v2/100*g,`fill:${HBC};opacity:.25`);
      s+=R4(cx-bw/2,yb-h,bw,h,`fill:${HBC};opacity:${b.lt?.4:.85}`);
      if(b.lt)s+=`<line x1="${f1(cx-bw/2)}" x2="${f1(cx+bw/2)}" y1="${f1(yb-h)}" y2="${f1(yb-h)}" style="stroke:${HBC};stroke-width:1.4;stroke-dasharray:3 2"/>`;
      if(g>.02)s+=T(cx,yb-mh*(b.v2||b.v)/100*g-6,b.txt,'t-lbl t-mid',`fill:${HBC}`);
      s+=T(cx,yb+12,b.l[0],'t-xs t-mid')+T(cx,yb+22,b.l[1],'t-xs t-mid')});
    return s}
  function hbvReveal(R,u,k){let s=T(R.x,R.y+14,'Cirrhosis risk by HBV DNA (REVEAL-HBV)','t-lbl')+T(R.x,R.y+28,'relative risk, adjusted for HBeAg and ALT');
    const RR=[1,2.5,5.6,6.5],L=['<10⁴','10⁴–10⁵','10⁵–10⁶','≥10⁶'],bwR=R.w*.6,yb=R.y+R.h-24,mh=R.h-78,step=bwR/4,bw=Math.min(34,step*.6);
    s+=`<line x1="${f1(R.x)}" x2="${f1(R.x+bwR)}" y1="${f1(yb)}" y2="${f1(yb)}" class="axis"/>`;
    RR.forEach((r,i)=>{const cx=R.x+step*(i+.5),g=ease(clamp((u*5.4-i)*1.7)),h=mh*r/6.5*g,on=i===k;
      s+=R4(cx-bw/2,yb-h,bw,h,`fill:${HBC};opacity:${on?.95:.45};stroke:${on?'var(--ink)':'none'};stroke-width:1.4`);
      if(g>.05)s+=T(cx,yb-h-6,i?r.toFixed(1):'ref 1.0','t-xs t-mid',`fill:var(--ink);font-weight:${on?700:500}`);
      s+=T(cx,yb+12,L[i],'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')});
    s+=T(R.x+bwR/2,yb+22,'HBV DNA, copies/mL','t-xs t-mid');
    const rx=R.x+bwR+14,c=ramp(u,.1,.7);
    s+=T(rx,R.y+56,'cumulative cirrhosis,','t-xs')+T(rx,R.y+68,'mean 11 years:','t-xs');
    s+=T(rx,R.y+92,'4.5%','t-big',`font-size:18px;fill:${HBC};opacity:${f1(.35+.65*(1-c))}`)+T(rx+50,R.y+92,'at <300','t-xs');
    s+=T(rx,R.y+118,'36.2%','t-big',`font-size:18px;fill:${HBC};opacity:${f1(.35+.65*c)}`)+T(rx+60,R.y+118,'at ≥10⁶','t-xs');
    return s}
  const HE_ORD=(()=>{const r=rng(11),a=[...Array(96).keys()];for(let i=95;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  function hbvTreat(R,u){let s=T(R.x,R.y+14,'Tenofovir DF for 5 years: repeat biopsy','t-lbl')+T(R.x,R.y+28,'96 people with cirrhosis at baseline (Ishak 5–6)');
    const n=Math.round(71*ease(ramp(u,.12,.66))),c=Math.min((R.h-48)/8,R.w*.5/12),gx=R.x,gy=R.y+40;
    for(let i=0;i<96;i++){const col=i%12,row=Math.floor(i/12),ok=HE_ORD[i]<n;
      s+=R4(gx+col*c+1,gy+row*c+1,c-2,c-2,`fill:${ok?'var(--rx)':'var(--scar-line)'};opacity:${ok?.9:.75}`,2)}
    const rx=gx+12*c+16;
    s+=T(rx,R.y+60,`${n} of 96`,'t-big','font-size:22px;fill:var(--rx)')+T(rx,R.y+76,`(${Math.round(n/96*100)}%) no longer cirrhotic`);
    s+=R4(rx,R.y+86,9,9,'fill:var(--rx)')+T(rx+14,R.y+94,'regressed')+R4(rx+76,R.y+86,9,9,'fill:var(--scar-line)')+T(rx+90,R.y+94,'still F4');
    const w=ramp(u,.5,.66);
    s+=`<g style="opacity:${f1(w)}">`+T(rx,R.y+R.h-26,'Boxed warning: stopping','t-xs','fill:var(--bad);font-weight:700')+T(rx,R.y+R.h-14,'can cause a severe flare','t-xs','fill:var(--bad);font-weight:700')+'</g>';
    return s}
  function hcvCourse(R,u){const Y=30*u,st=Math.min(4,.133*Y),fl=Math.min(4,Math.floor(st+1e-6));
    let s=T(R.x,R.y+14,`Year ${Math.round(Y)} after infection · METAVIR F${f1(st)}`,'t-lbl')+T(R.x,R.y+28,'one median path: 0.133 METAVIR units a year');
    const gap=16,bw=(R.w-4*gap)/5,by=R.y+38;
    for(let i=0;i<5;i++){const x=R.x+i*(bw+gap),on=i===fl,done=st>=i;
      s+=R4(x,by,bw,24,`fill:${done?(i===4?'var(--liver-soft)':'var(--dx-soft)'):'var(--panel-2)'};stroke:${on?(i===4?'var(--liver)':HCC):'var(--line)'};stroke-width:${on?2:1}`,6);
      s+=T(x+bw/2,by+16,`F${i}`,'t-lbl t-mid',on?`fill:${i===4?'var(--liver)':HCC}`:'');
      if(i<4)s+=T(x+bw+gap/2,by+40,['0.117','0.085','0.120','0.116'][i],'t-xs t-mid')+`<path d="M${f1(x+bw+2)} ${f1(by+12)}h${gap-4}" style="stroke:var(--muted);stroke-width:1.2" marker-end="url(#heArr)"/>`}
    s+=T(R.x,by+54,Y>29.5?'with cirrhosis: HCC 1–5% a year, decompensation 3–6%':'annual transition probabilities between stages (F4 = cirrhosis)','t-xs',Y>29.5?'fill:var(--bad)':'');
    const TY=R.y+R.h-34,x0=R.x+10,x1=R.x+R.w-10,X=v=>lerp(x0,x1,v/30);
    s+=`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(TY)}" y2="${f1(TY)}" class="axis"/>`;
    [0,10,20,30].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(TY-3)}" y2="${f1(TY+3)}" class="axis"/>`+T(X(v),TY+12,v===30?'30 y':v,'t-xs t-mid')});
    s+=`<line x1="${f1(x0)}" x2="${f1(X(Y))}" y1="${f1(TY)}" y2="${f1(TY)}" style="stroke:${HCC};stroke-width:3"/><circle cx="${f1(X(Y))}" cy="${f1(TY)}" r="5" style="fill:${HCC};stroke:var(--panel);stroke-width:2"/>`;
    if(Y>.4)s+=T(x0,TY+24,'26% clear it early','t-xs','fill:var(--ink)');
    if(Y>=20)s+=T(X(20),TY-9,'16% cirrhosis at 20 y','t-xs t-mid','fill:var(--ink)');
    if(Y>=29.5)s+=T(x1,TY+24,'median 30 y (13–42)','t-xs t-end','fill:var(--ink)');
    return s}
  function hcvCure(R,u){const a=ramp(u,0,.35),b=ramp(u,.35,1);let s='';
    if(b<=0){s+=T(R.x,R.y+14,'Direct-acting antivirals: cure (SVR12)','t-lbl');
      s+=T(R.x,R.y+66,`${Math.round(99*ease(a))}%`,'t-big',`font-size:40px;fill:var(--rx)`);
      const lx=R.x+(R.w>420?110:96);
      [['ASTRAL-1: sofosbuvir–velpatasvir,','12 weeks: 99%'],['EXPEDITION-1: glecaprevir–','pibrentasvir, compensated: 99%'],['ASTRAL-4, decompensated:','83–94%']].forEach((l,i)=>{const o=ramp(a,.2+i*.25,.45+i*.25);s+=`<g style="opacity:${f1(o)}">`+T(lx,R.y+42+i*34,l[0],'t-xs')+T(lx,R.y+54+i*34,l[1],'t-xs','fill:var(--ink)')+'</g>'});
      s+=T(R.x,R.y+90,'SVR12, trials','t-xs');
      return s}
    s+=T(R.x,R.y+14,'10 years later: cured (SVR) vs not','t-lbl')+T(R.x,R.y+28,'n=530, interferon era, advanced fibrosis');
    const lg=R.x+R.w-96;s+=R4(lg,R.y+20,9,9,'fill:var(--muted);opacity:.6')+T(lg+13,R.y+28,'no SVR')+R4(lg+56,R.y+20,9,9,'fill:var(--rx)')+T(lg+69,R.y+28,'SVR');
    const rows=[['death, any cause',26.0,8.9],['liver cancer (HCC)',21.8,5.1],['liver failure',29.9,2.1]],lw=116,bm=R.w-lw-44,y0=R.y+38,rh=(R.h-38-20)/3;
    rows.forEach(([l,n0,n1],i)=>{const g=ease(ramp(b,i*.12,.4+i*.12)),yy=y0+i*rh,bh=Math.min(10,rh*.32);
      s+=T(R.x,yy+bh+4,l,'t-xs','fill:var(--ink)');
      s+=R4(R.x+lw,yy,bm*n0/30*g,bh,'fill:var(--muted);opacity:.55')+R4(R.x+lw,yy+bh+2,bm*n1/30*g,bh,'fill:var(--rx)');
      if(g>.1)s+=T(R.x+lw+bm*n0/30*g+4,yy+bh-1,`${(n0*g).toFixed(1)}%`)+T(R.x+lw+bm*n1/30*g+4,yy+2*bh+1,`${(n1*g).toFixed(1)}%`,'t-xs','fill:var(--rx)')});
    s+=T(R.x,R.y+R.h-3,'with cirrhosis after DAA cure: HCC 1.82 /100 person-years','t-xs',`fill:var(--bad);opacity:${f1(ramp(b,.5,.75))}`);
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 700'),p=phaseOf(S,t);
    const U=i=>ramp(t,S[i].from,i+1<S.length?S[i+1].from:1);
    const lanes=N?[{y:6,h:340},{y:354,h:340}]:[{y:8,h:178},{y:194,h:178}],bx=N?6:8,bw=N?388:704;
    const act=[p<=3,p===0||p>=4];
    /* hepatitis B state */
    const hb={fib:1,reg:0,load:.6,pill:0,st:'',k:0};
    if(p===0)hb.st='often mother → baby at birth';
    else if(p===1)hb.st='age at infection decides';
    else if(p===2){const u=U(2);hb.k=clamp(Math.floor(u*5.4),0,3);hb.fib=1+3*ease(u);hb.load=.3+.7*u;hb.st=`HBV DNA ${['<10⁴','10⁴–10⁵','10⁵–10⁶','≥10⁶'][hb.k]} copies/mL`}
    else{const u=p===3?U(3):1;hb.fib=4;hb.reg=.9*ease(u);hb.load=lerp(1,.06,ease(ramp(u,0,.45)));hb.pill=ramp(u,0,.12);hb.st=u<.15?'antiviral tablets start':'virus suppressed, scar recedes'}
    /* hepatitis C state */
    const hc={fib:.5,reg:0,load:.7,pill:0,badge:0,st:''},Y=p===4?30*U(4):p>4?30:0;
    if(p===0)hc.st='spreads blood to blood';
    else if(p<4)hc.st='chronic, slowly scarring';
    else if(p===4){hc.fib=Math.max(.5,Math.min(4,.133*Y));hc.st=`year ${Math.round(Y)} · stage F${f1(Math.min(4,.133*Y))}`}
    else{const u=U(5),a=ramp(u,0,.35),b=ramp(u,.35,1);hc.fib=4;hc.load=.7*(1-a);hc.reg=.6*b;hc.pill=b<1?1-ramp(b,0,.3):0;hc.badge=ramp(b,0,.3);hc.st=a<1?'DAA tablets, 8–12 weeks':'cured: HCC checks continue'}
    let s=`<defs>${marker('heArr','var(--muted)')}</defs>`;
    [hb,hc].forEach((L,li)=>{const ln=lanes[li],col=li?HCC:HBC,on=act[li];
      s+=`<rect x="${bx}" y="${ln.y}" width="${bw}" height="${ln.h}" rx="12" style="fill:var(--field);stroke:${on?col:'var(--line)'};stroke-width:${on?1.6:1}"/>`;
      s+=T(bx+14,ln.y+22,li?'HEPATITIS C':'HEPATITIS B','t-lbl',`fill:${col};letter-spacing:.06em`);
      const sub=li?['curable with 8–12','weeks of tablets']:['vaccine-preventable;','treatable, rarely cleared'];
      s+=N?T(bx+14,ln.y+36,sub.join(' ')):T(bx+14,ln.y+36,sub[0])+T(bx+14,ln.y+48,sub[1]);
      const lx=N?100:112,ly=ln.y+(N?98:102),ls=.6;
      s+=`<g style="opacity:${on?1:.6}">`+liver(lx,ly,ls,{fib:L.fib,regress:L.reg,gb:false,seed:li?13:7}).svg;
      const n=Math.round(clamp(L.load)*16);
      for(let i=0;i<16;i++){const a=i/16*6.283+t*(li?-7:7)+li,rx=68,ry=42,op=i<n?1:0;if(!op)continue;
        s+=vir(lx+Math.cos(a)*rx,ly+Math.sin(a)*ry,3.4,col,.9)}
      if(L.pill>0)s+=`<g style="opacity:${f1(L.pill)}">`+pill(lx+56,ly-30,24,{ang:-24})+'</g>';
      if(L.badge>0)s+=`<g style="opacity:${f1(L.badge)}"><circle cx="${f1(lx-54)}" cy="${f1(ly-28)}" r="8" style="fill:var(--panel);stroke:var(--accent);stroke-width:2"/><line x1="${f1(lx-48)}" y1="${f1(ly-22)}" x2="${f1(lx-42)}" y2="${f1(ly-16)}" style="stroke:var(--accent);stroke-width:2.6;stroke-linecap:round"/></g>`;
      s+='</g>';
      if(N)s+=T(190,ln.y+72,L.st,'t-xs','fill:var(--ink);font-weight:700');
      else s+=T(lx,ln.y+ln.h-10,L.st,'t-xs t-mid','fill:var(--ink);font-weight:700');
      const R=N?{x:bx+14,y:ln.y+150,w:bw-28,h:ln.h-160}:{x:214,y:ln.y+14,w:486,h:ln.h-24};
      let c='';
      if(li===0){if(p===0)c=hbvBurden(R,U(0));else if(p===1)c=hbvChronic(R,U(1));else if(p===2)c=hbvReveal(R,U(2),hb.k);else if(p===3)c=hbvTreat(R,U(3));else c=`<g style="opacity:.3">${hbvTreat(R,1)}</g>`}
      else{if(p===0)c=hcvBurden(R,U(0));else if(p<4)c=`<g style="opacity:.3">${hcvBurden(R,1)}</g>`;else if(p===4)c=hcvCourse(R,U(4));else c=hcvCure(R,U(5))}
      s+=c});
    svg.innerHTML=s;
    setSt(p);
    $('#heRead').innerHTML=`<span>hepatitis B <b>${hb.st}</b></span><span>hepatitis C <b>${hc.st}</b></span>`;
    $('#heNote').innerHTML=noteHTML(S[p]);
  }
  const stop=playWire(rg,$('#hePlay'),draw,30000,'Replay','hepatitis');
  const setSt=stepWire($('#heSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- cure rates icon array ---- */
  const cs=$('#heCure');let sel=2,stopC=null;
  function drawCure(pr){const N=vb(cs,'720 300','400 590'),o=HE_CURE[sel],n=Math.round(o.v*pr);let s='';
    const ax=N?50:24,ay=N?20:22,c=N?30:24;
    for(let i=0;i<100;i++){const col=i%10,row=Math.floor(i/10),cured=i<n;
      s+=person(ax+col*c+c/2,ay+row*c+2,c*.82,cured?o.col:'var(--panel-2)',{op:cured?1:.9})}
    const ty=ay+10*c+(N?24:22);
    s+=T(ax,ty,`${n} in 100`,'t-big',`font-size:20px;fill:${o.col==='var(--muted)'?'var(--ink)':o.col}`)+T(ax+(N?104:100),ty,sel?'reached SVR (cure)':'cleared it without treatment','t-xs');
    const bx=N?20:330,by=N?ty+30:36,bw=N?360:370,rh=N?40:46,lw=N?0:0;
    s+=T(bx,by-10,'cure (or clearance) rate, as published','t-sm');
    HE_CURE.forEach((q,i)=>{const yy=by+i*rh,on=i===sel,L=(bw-46)*q.v/100*(on?pr:1);
      s+=T(bx+lw,yy+12,q.short,'t-xs',on?'fill:var(--ink);font-weight:700':'');
      s+=R4(bx+lw,yy+18,bw-46,12,'fill:var(--panel-2)',3)+R4(bx+lw,yy+18,L,12,`fill:${q.col};opacity:${on?1:.45}`,3);
      s+=T(bx+lw+L+6,yy+28,q.v+'%','t-xs','fill:var(--ink)')});
    cs.innerHTML=s;$('#heCureNote').innerHTML=`<div class="kicker">${o.lab}</div><h4>${o.v}% ${sel?'reached SVR':'cleared spontaneously'}</h4><p>${o.txt}</p>`}
  function pick(i){sel=i;$$('[data-cure]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.cure===i));stopC&&stopC();stopC=animate(900,p=>drawCure(ease(p)),()=>{stopC=null})}
  $$('[data-cure]').forEach(b=>b.addEventListener('click',()=>pick(+b.dataset.cure)));
  drawCure(1);
  const prevR=redraws.hepatitis;redraws.hepatitis=()=>{prevR&&prevR();drawCure(1);drawTw()};

  /* ---- Taiwan vaccine mini chart ---- */
  const tw=$('#heTw');
  function drawTw(){const D=[['1981–86',.70],['1986–90',.57],['1990–94',.36]];let s='';const yb=96,mh=70;
    D.forEach(([l,v],i)=>{const x=24+i*88,h=mh*v/.7;s+=R4(x,yb-h,46,h,`fill:${HBC};opacity:${f1(.9-i*.2)}`)+T(x+23,yb-h-5,v.toFixed(2),'t-xs t-mid','fill:var(--ink);font-weight:700')+T(x+23,yb+13,l,'t-xs t-mid')});
    s+=`<line x1="14" x2="290" y1="${yb}" y2="${yb}" class="axis"/>`;
    tw.innerHTML=s}
  drawTw();
};
/* =============== 2.4 Other causes: genes, immunity & bile ducts =============== */
const OC_STEPS=[
 {from:0,at:.07,k:'Genetic · iron',t:'Haemochromatosis',
  txt:`Two copies of the HFE C282Y variant are common: 0.44% (about 1 in 227) of non-Hispanic white people in HEIRS <sup class="c" data-ref="Adams2005HEIRS" title="Source 7">7</sup> and 1 in 156 people of European descent in UK Biobank <sup class="c" data-ref="Pilling2019BMJ" title="Source 354">354</sup>. Far fewer become ill, and men far more than women: iron-overload disease in 28.4% of homozygous men versus 1.2% of women in Melbourne <sup class="c" data-ref="Allen2008NEJM" title="Source 12">12</sup>. Ferritin tracks the danger: the adjusted probability of cirrhosis was 7.4% with ferritin below 1,000 µg/L and 72% above it <sup class="c" data-ref="Morrison2003" title="Source 315">315</sup>. Phlebotomy is the mainstay of treatment <sup class="c" data-ref="Kowdley2019ACG" title="Source 244">244</sup>; EASL 2022 targets ferritin below 50 µg/L during induction and below 100 during maintenance, and people with advanced fibrosis enter HCC screening <sup class="c" data-ref="EASL2022HH" title="Source 108">108</sup>.`,
  pt:`Haemochromatosis means the body stores too much iron. Regular blood removal, like giving blood, lowers the iron and can prevent liver damage <sup class="c" data-ref="EASL2022HH" title="Source 108">108</sup>.`,
  hook:`In HFE haemochromatosis, ferritin below 1,000 µg/L makes cirrhosis unlikely <sup class="c" data-ref="Morrison2003,Kowdley2019ACG" title="Source 244,315">244,315</sup>.`},
 {from:.125,at:.215,k:'Genetic · copper',t:'Wilson disease',
  txt:`Wilson disease is an autosomal recessive disorder of liver copper handling caused by variants in ATP7B <sup class="c" data-ref="Ferenci2003Leipzig" title="Source 154">154</sup>. Symptomatic disease affects about 1 in 30,000, usually starting between ages 5 and 35 <sup class="c" data-ref="Czlonkowska2018" title="Source 90">90</sup>, yet sequencing predicts about 1 in 7,026 people carry two pathogenic variants <sup class="c" data-ref="Coffey2013" title="Source 81">81</sup>. Kayser–Fleischer rings (copper in Descemet's membrane) are seen in almost 100% of people with neurological disease but only 40–50% with liver disease <sup class="c" data-ref="Czlonkowska2018" title="Source 90">90</sup>. EASL-ERN 2025 lists chelators (penicillamine, trientine) and zinc salts, with only chelators recommended for significant liver disease, and a defined role for transplant in Wilsonian acute liver failure <sup class="c" data-ref="EASL2025Wilson" title="Source 115">115</sup>.`,
  pt:`Wilson disease means copper builds up. Medicines that remove copper work well if they are started early <sup class="c" data-ref="Czlonkowska2018" title="Source 90">90</sup>.`,
  hook:`Kayser–Fleischer rings: almost all neurological Wilson disease, only 40–50% of hepatic cases. Leipzig score ≥4 establishes the diagnosis <sup class="c" data-ref="Czlonkowska2018" title="Source 90">90</sup>.`},
 {from:.25,at:.34,k:'Genetic · protein',t:'Alpha-1 antitrypsin',
  txt:`In the Pi*ZZ genotype, mutant Z-AAT accumulates inside hepatocytes and can cause progressive liver disease and fibrosis <sup class="c" data-ref="Strnad2022Fazirsiran" title="Source 440">440</sup>. Swedish screening of 200,000 newborns found 120 with Pi Z, 14 of them with prolonged obstructive jaundice <sup class="c" data-ref="Sveger1976" title="Source 443">443</sup>. Carriers matter too: up to 4% of Europeans are Pi*MZ, and 10% of them versus 4% of non-carriers had liver stiffness of 7.1 kPa or more <sup class="c" data-ref="Schneider2020PiZ" title="Source 408">408</sup>. The RNAi drug fazirsiran cut liver Z-AAT by a median of 93% in SEQUOIA, with no phase 3 outcome data yet <span class="ev early">Early evidence</span> <sup class="c" data-ref="Clark2024SEQUOIA" title="Source 80">80</sup>.`,
  pt:`In alpha-1 antitrypsin deficiency, a protein the liver makes folds the wrong way and gets stuck inside liver cells, which slowly harms them <sup class="c" data-ref="Strnad2022Fazirsiran" title="Source 440">440</sup>.`,
  hook:`AATD (Pi*ZZ) damages the liver by retained misfolded protein, not by low serum levels <sup class="c" data-ref="Strnad2022Fazirsiran" title="Source 440">440</sup>.`},
 {from:.375,at:.465,k:'Autoimmune',t:'Autoimmune hepatitis',
  txt:`A meta-analysis of 37 population studies pooled an AIH incidence of 1.28 per 100,000 person-years and a prevalence of 15.65 per 100,000; prevalence rose from 9.95 (1970–1999) to 27.91 per 100,000 (2015–2022) and was higher in women <sup class="c" data-ref="Hahn2023AIH" title="Source 189">189</sup>. Diagnosis rests on raised transaminases and IgG, autoantibodies, and interface hepatitis on biopsy. Treatment starts with fairly high doses of prednisone or prednisolone, tapered as azathioprine is introduced; transplant is an option for end-stage disease <sup class="c" data-ref="MieliVergani2018" title="Source 307">307</sup>. AIH can present anywhere from no symptoms to acute liver failure <sup class="c" data-ref="EASL2025AIH" title="Source 112">112</sup>.`,
  pt:`In autoimmune hepatitis, the body's defence system attacks the liver. Steroid and immune-calming medicines usually control it <sup class="c" data-ref="MieliVergani2018" title="Source 307">307</sup>.`,
  hook:`AIH: raised IgG + autoantibodies + interface hepatitis; prednisolone then azathioprine <sup class="c" data-ref="MieliVergani2018" title="Source 307">307</sup>.`},
 {from:.5,at:.59,k:'Bile ducts · small',t:'Primary biliary cholangitis',
  txt:`PBC is a chronic autoimmune disease of the small bile ducts that, untreated, leads to biliary cirrhosis. It is usually diagnosed from cholestatic liver tests plus antimitochondrial antibodies <sup class="c" data-ref="EASL2017PBC" title="Source 105">105</sup>. Global prevalence is about 18.1 per 100,000, higher in women <sup class="c" data-ref="Tan2026PBC" title="Source 444">444</sup>. Ursodiol reduced treatment failure in the 1991 trial <sup class="c" data-ref="Poupon1991" title="Source 365">365</sup>; the US label gives 13–15 mg/kg/day for adults with PBC <sup class="c" data-ref="FDA-Urso" title="Source 148">148</sup>. Response matters: 84% of people with ALP ≤2 × ULN after a year survived 10 years without transplant, against 62% above it <sup class="c" data-ref="Lammers2014" title="Source 257">257</sup>.`,
  pt:`PBC slowly damages the tiny bile ducts inside the liver, so bile backs up. A daily tablet (ursodiol) helps most people <sup class="c" data-ref="EASL2017PBC,Poupon1991" title="Source 105,365">105,365</sup>.`,
  hook:`PBC: antimitochondrial antibodies + cholestatic liver tests; first-line UDCA 13–15 mg/kg/day as labelled <sup class="c" data-ref="EASL2017PBC,FDA-Urso" title="Source 105,148">105,148</sup>.`},
 {from:.625,at:.715,k:'Bile ducts · large',t:'Primary sclerosing cholangitis',
  txt:`PSC causes multifocal bile-duct strictures and progressive liver disease; the risk of cholangiocarcinoma and colorectal cancer is high, and most patients eventually need a transplant <sup class="c" data-ref="Karlsen2017" title="Source 230">230</sup>. IBD is present in 71.1%, mostly ulcerative colitis (55.9%) <sup class="c" data-ref="Zhang2022PSCIBD" title="Source 516">516</sup>. In the Netherlands, incidence was 0.5 and prevalence 6.0 per 100,000; median survival to transplant or PSC-related death was 21.3 years in the population cohort. Colorectal cancer risk was 10-fold higher than in ulcerative colitis controls, so the authors advised colonoscopy from diagnosis <sup class="c" data-ref="Boonstra2013" title="Source 45">45</sup>.`,
  pt:`PSC narrows and scars the larger bile ducts. Many people with PSC also have bowel inflammation (colitis) <sup class="c" data-ref="Zhang2022PSCIBD" title="Source 516">516</sup>.`,
  hook:`PSC: about 70% also have IBD, mostly ulcerative colitis; colorectal cancer risk is high <sup class="c" data-ref="Zhang2022PSCIBD,Boonstra2013" title="Source 45,516">45,516</sup>.`},
 {from:.75,at:.86,k:'Medicines',t:'Drug-induced liver injury',
  txt:`In Iceland, the crude annual incidence of DILI (excluding paracetamol toxicity) was 19.1 per 100,000. Amoxicillin–clavulanate caused 22% of cases (1 in 2,350 users); azathioprine (1 in 133) and infliximab (1 in 148) had the highest per-user risk <sup class="c" data-ref="Bjornsson2013" title="Source 43">43</sup>. ACG 2021 names antimicrobials, herbal and dietary supplements and anticancer drugs as the commonest Western causes, calls DILI a diagnosis of exclusion, gives mortality up to 10% with hepatocellular jaundice, and advises tertiary referral for progressive jaundice <sup class="c" data-ref="Chalasani2021ACG" title="Source 65">65</sup>. There is no specific biomarker; causality scales such as RUCAM support the diagnosis <sup class="c" data-ref="Andrade2019" title="Source 15">15</sup>.`,
  pt:`Some medicines and herbal or dietary supplements can injure the liver, so tell your care team about everything you take <sup class="c" data-ref="Chalasani2021ACG" title="Source 65">65</sup>.`,
  hook:`Amoxicillin–clavulanate is the commonest single cause of DILI in population data <sup class="c" data-ref="Bjornsson2013" title="Source 43">43</sup>.`},
 {from:.875,at:.96,k:'Heart',t:'Congestive: the Fontan liver',
  txt:`The Fontan circulation, created by heart surgery, keeps systemic venous pressure chronically high. Up to 70,000 people may be alive with a Fontan circulation, and liver fibrosis is common and may progress <sup class="c" data-ref="Rychik2019Fontan" title="Source 397">397</sup>. A meta-analysis estimated cirrhosis at 0.97 per 100 patient-years, with a cumulative incidence of 32.2% 20 or more years after surgery; HCC reached 3.9%, and only about 70% of those cancers had cirrhosis <sup class="c" data-ref="Hitawala2024Fontan" title="Source 201">201</sup>. Platelets, APRI and FIB-4 were associated with severe fibrosis, and MR and shear-wave elastography correlated strongly with biopsy <sup class="c" data-ref="Seol2024FALD" title="Source 418">418</sup>.`,
  pt:`Long-term heart problems can raise the pressure in the veins that drain the liver, and over years that can scar it <sup class="c" data-ref="Rychik2019Fontan" title="Source 397">397</sup>.`,
  hook:`Fontan: cumulative cirrhosis 32.2% at ≥20 years; HCC can occur without cirrhosis <sup class="c" data-ref="Hitawala2024Fontan" title="Source 201">201</sup>.`}
];
const OC_INFO=[
 {tag:'GENETIC · IRON',col:'var(--liver)',name:'Haemochromatosis (HFE)',where:['Iron builds up in hepatocytes'],test:['Transferrin saturation and ferritin;','HFE C282Y genotype'],rx:['Phlebotomy (removing blood)'],num:{v:72,suf:'%'},cap:['probability of cirrhosis with ferritin','above 1,000 µg/L (7.4% below it)']},
 {tag:'GENETIC · COPPER',col:'var(--accent)',name:'Wilson disease',where:['Copper cannot leave hepatocytes','into bile (ATP7B)'],test:['Leipzig score: signs, copper tests,','mutations; slit-lamp for KF rings'],rx:['Chelators (penicillamine, trientine)','or zinc salts'],num:{txt:'1 in 30,000'},cap:['symptomatic; about 1 in 7,026','carry two pathogenic variants']},
 {tag:'GENETIC · PROTEIN',col:'var(--nh3)',name:'Alpha-1 antitrypsin deficiency',where:['Misfolded Z-AAT stays inside','hepatocytes'],test:['Pi*ZZ or Pi*MZ genotype;','AAT inclusions on biopsy'],rx:['Fazirsiran (RNAi) is investigational:','phase 2 data only'],num:{v:97,suf:'%'},cap:['of Pi*ZZ biopsies showed AAT','inclusions (63% of Pi*MZ)']},
 {tag:'AUTOIMMUNE',col:'var(--dx)',name:'Autoimmune hepatitis',where:['Immune cells attack hepatocytes','at the portal edge'],test:['Raised transaminases and IgG;','autoantibodies; biopsy'],rx:['Prednisone or prednisolone,','then azathioprine'],num:{v:27.91,dp:2},cap:['per 100,000 in 2015–22,','up from 9.95 in 1970–99']},
 {tag:'AUTOIMMUNE · SMALL DUCTS',col:'var(--accent)',name:'Primary biliary cholangitis',where:['Small bile ducts inside the','liver are destroyed'],test:['Cholestatic liver tests (ALP)','plus antimitochondrial antibodies'],rx:['Ursodiol first; elafibranor or','seladelpar after'],num:{v:18.1,dp:1},cap:['per 100,000 worldwide;','more common in women']},
 {tag:'LARGE BILE DUCTS',col:'var(--accent)',name:'Primary sclerosing cholangitis',where:['Multifocal strictures of the','bile ducts'],test:['Raised ALP prompts testing;','colonoscopy from diagnosis'],rx:['Most people eventually need','a liver transplant'],num:{v:71.1,suf:'%',dp:1},cap:['also have IBD, mostly','ulcerative colitis (55.9%)']},
 {tag:'MEDICINES & SUPPLEMENTS',col:'var(--bad)',name:'Drug-induced liver injury',where:['Medicines, herbs or supplements','injure hepatocytes'],test:['A diagnosis of exclusion;','causality scales such as RUCAM'],rx:['Tertiary referral for','progressive jaundice (ACG)'],num:{txt:'1 in 2,350'},cap:['amoxicillin–clavulanate users;','the commonest cause (22%)']},
 {tag:'HEART',col:'var(--portal)',name:'Fontan-associated liver disease',where:['High venous pressure backs','up into the liver'],test:['Platelets, APRI, FIB-4;','MR or shear-wave elastography'],rxl:'COURSE',rx:['Fibrosis is common and may','progress (AHA statement)'],num:{v:32.2,suf:'%',dp:1},cap:['cumulative cirrhosis 20 or more','years after Fontan surgery']}
];
const OC_MX={cols:['Iron studies','Copper tests, eye exam','Autoantibodies, IgG','ALP (cholestatic)','Genetic test','Biopsy','Elastography or MR','History'],
 rows:[
  {n:'Haemochromatosis',m:{0:'K',4:'K'},d:`Iron studies are the screen. EASL 2022 states that in C282Y homozygotes, TSAT above 45% with ferritin above 200 µg/L in females, or TSAT above 50% with ferritin above 300 µg/L in males and postmenopausal women, are enough to diagnose haemochromatosis <sup class="c" data-ref="EASL2022HH" title="Source 108">108</sup>. A ferritin below 1,000 ng/mL at diagnosis identifies people at low risk of advanced fibrosis (ACG 2019) <sup class="c" data-ref="Kowdley2019ACG" title="Source 244">244</sup>.`},
  {n:'Wilson disease',m:{1:'K',4:'S'},d:`The Leipzig score adds up clinical signs, copper tests and mutation analysis: 4 or more establishes the diagnosis, 3 makes it possible, 2 or less makes it very unlikely <sup class="c" data-ref="Czlonkowska2018,Ferenci2003Leipzig" title="Source 90,154">90,154</sup>. EASL-ERN 2025 adds relative exchangeable copper <sup class="c" data-ref="EASL2025Wilson" title="Source 115">115</sup>. Kayser–Fleischer rings need slit-lamp examination by an experienced observer <sup class="c" data-ref="Czlonkowska2018" title="Source 90">90</sup>.`},
  {n:'Alpha-1 antitrypsin',m:{4:'K',5:'S',6:'S'},d:`The genotype names the risk: Pi*ZZ, or the carrier state Pi*MZ in up to 4% of Europeans. AAT inclusions were seen on biopsy in 97% of Pi*ZZ and 63% of Pi*MZ livers, and 10% of Pi*MZ adults versus 4% of non-carriers had liver stiffness of 7.1 kPa or more <sup class="c" data-ref="Schneider2020PiZ" title="Source 408">408</sup>.`},
  {n:'Autoimmune hepatitis',m:{2:'K',5:'K'},d:`AIH is diagnosed from raised transaminases and IgG, autoantibodies, and interface hepatitis on biopsy <sup class="c" data-ref="MieliVergani2018" title="Source 307">307</sup>.`},
  {n:'Primary biliary cholangitis',m:{2:'K',3:'K'},d:`PBC is usually diagnosed from cholestatic liver tests plus antimitochondrial antibodies <sup class="c" data-ref="EASL2017PBC" title="Source 105">105</sup>. A raised liver alkaline phosphatase prompts testing for PBC and PSC <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>.`},
  {n:'Primary sclerosing cholangitis',m:{3:'K',7:'S'},d:`A raised liver alkaline phosphatase prompts testing for PBC and PSC <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>. PSC itself is defined by multifocal bile-duct strictures <sup class="c" data-ref="Karlsen2017" title="Source 230">230</sup>. About 71% also have IBD, and the Dutch authors advised colonoscopic surveillance from diagnosis <sup class="c" data-ref="Zhang2022PSCIBD,Boonstra2013" title="Source 45,516">45,516</sup>.`},
  {n:'Drug-induced liver injury',m:{7:'K'},d:`There is no specific biomarker. DILI is diagnosed by excluding other causes, supported by causality scales such as CIOMS/RUCAM <sup class="c" data-ref="Andrade2019" title="Source 15">15</sup>. ACG 2021 calls it a diagnosis of exclusion and names antimicrobials, herbal and dietary supplements and anticancer drugs as the commonest causes, so a full history of everything taken is central <sup class="c" data-ref="Chalasani2021ACG" title="Source 65">65</sup>.`},
  {n:'Fontan liver',m:{6:'K',7:'K'},d:`The history is the Fontan operation. Platelet count, APRI and FIB-4 were associated with severe fibrosis, and MR and shear-wave elastography correlated strongly with biopsy; time since surgery correlated only weakly (R=0.36) <sup class="c" data-ref="Seol2024FALD" title="Source 418">418</sup>.`}
 ]};
inits.othercauses=()=>{
  const svg=$('#ocSvg'),rg=$('#ocT'),S=OC_STEPS;
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const C=(x,y,r,st)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(0,r))}" style="${st}"/>`;
  const R4=(x,y,w,h,st,rx=2)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const AR=(x1,y1,x2,y2,col='var(--muted)',w=1.6)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="stroke:${col};stroke-width:${w};fill:none" marker-end="url(#ocArr)"/>`;
  const lymph=(x,y,r=5,op=1)=>`<g style="opacity:${f1(op)}">${C(x,y,r,'fill:var(--dx-soft);stroke:var(--dx);stroke-width:1.4')}${C(x,y,r*.55,'fill:var(--dx)')}</g>`;
  const anti=(x,y,s=6,op=1)=>`<path d="M${f1(x)} ${f1(y+s)}V${f1(y)}L${f1(x-s*.8)} ${f1(y-s*.8)}M${f1(x)} ${f1(y)}L${f1(x+s*.8)} ${f1(y-s*.8)}" style="stroke:var(--dx);stroke-width:1.6;fill:none;stroke-linecap:round;opacity:${f1(op)}"/>`;
  /* ---- one scene per cause; R={x,y,w,h}, u local 0..1, ph a running phase for motion ---- */
  function sHH(R,u,ph){const cx=R.x+R.w*.42,cy=R.y+R.h*.46;let s='';
    const fer=u<.6?lerp(150,2400,ease(u/.6)):lerp(2400,50,ease((u-.6)/.4)),iron=clamp((fer-100)/2300);
    s+=R4(R.x+10,R.y+52,22,R.h-122,'fill:var(--liver-soft);stroke:var(--liver)',8)+T(R.x+21,R.y+46,'gut','t-xs t-mid');
    s+=AR(R.x+36,cy,cx-62,cy,'var(--liver)');
    if(u<.6)for(let i=0;i<6;i++){const k=(ph*.6+i/6)%1;s+=C(lerp(R.x+36,cx-64,k),cy+Math.sin(k*9+i)*5,3,'fill:var(--liver);opacity:.9')}
    s+=T(R.x+12,R.y+20,u<.6?'too much iron absorbed and stored':'phlebotomy lowers iron stores','t-lbl');
    [[0,-38],[-30,16],[32,18]].forEach(([dx,dy],i)=>{s+=hepatocyte(cx+dx,cy+dy,62,{iron,seed:3+i})});
    s+=T(cx,cy+66,'hepatocytes fill with iron','t-xs t-mid');
    /* ferritin bar */
    const bx=R.x+R.w-46,top=R.y+44,bot=R.y+R.h-74,Y=v=>lerp(bot,top,clamp(v/2500));
    s+=R4(bx,top,18,bot-top,'fill:var(--panel-2);stroke:var(--line)',4)+R4(bx,Y(fer),18,bot-Y(fer),`fill:${fer>1000?'var(--bad)':'var(--liver)'};opacity:.85`,4);
    s+=`<line x1="${f1(bx-6)}" x2="${f1(bx+24)}" y1="${f1(Y(1000))}" y2="${f1(Y(1000))}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 2"/>`+T(bx-8,Y(1000)+3,'1,000','t-xs t-end','fill:var(--ink)');
    s+=T(bx+9,top-18,'ferritin','t-xs t-mid','fill:var(--ink);font-weight:700')+T(bx+9,top-7,'µg/L','t-xs t-mid');
    s+=T(bx+9,bot+14,`≈${Math.round(fer/10)*10}`,'t-xs t-mid','fill:var(--ink)')+T(bx+9,bot+25,'schematic','t-xs t-mid');
    if(u>=.6){const b=ramp(u,.6,.75),px=R.x+48,py=R.y+R.h-48;
      s+=`<g style="opacity:${f1(b)}">${R4(px-14,py-20,28,36,'fill:var(--panel);stroke:var(--artery);stroke-width:1.6',6)}${R4(px-12,py+14-30*ramp(u,.62,1),24,30*ramp(u,.62,1),'fill:var(--artery);opacity:.8',4)}`+T(px+22,py-4,'phlebotomy: blood removed,','t-xs','fill:var(--ink)')+T(px+22,py+8,u>.95?'ferritin target <50 (induction)':'iron stores fall','t-xs','fill:var(--ink)')+'</g>'}
    return s}
  function sWil(R,u,ph){const cx=R.x+R.w*.34,cy=R.y+R.h*.52;let s='';
    const cu=u<.75?ease(u/.75):lerp(1,.35,ease((u-.75)/.25));
    s+=hepatocyte(cx,cy,130,{copper:cu,seed:5});
    for(let i=0;i<Math.round(cu*16);i++){const a=i*2.4,d=14+(i*7)%34;s+=C(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.75,2.2,'fill:var(--ink);opacity:.85')}
    /* bile canaliculus with the broken ATP7B pump */
    const bx=cx+70;s+=R4(bx,cy-60,12,120,'fill:var(--bile);opacity:.7',6)+T(bx+6,cy+76,'bile','t-xs t-mid');
    s+=R4(bx-12,cy-8,12,16,'fill:var(--panel);stroke:var(--ink);stroke-width:1.2',2)+`<path d="M${f1(bx-10)} ${f1(cy-6)}l8 12M${f1(bx-2)} ${f1(cy-6)}l-8 12" style="stroke:var(--bad);stroke-width:1.8"/>`+T(bx-6,cy-14,'ATP7B','t-xs t-mid','fill:var(--ink)');
    s+=AR(R.x+12,cy-40,cx-60,cy-30,'var(--ink)')+T(R.x+12,cy-48,'copper in','t-xs');
    if(u<.75)for(let i=0;i<4;i++){const k=(ph*.7+i/4)%1;s+=C(lerp(R.x+14,cx-62,k),lerp(cy-40,cy-31,k),2.4,'fill:var(--ink)')}
    /* the eye */
    const ex=R.x+R.w-54,ey=R.y+66,kf=ramp(u,.3,.65);
    s+=`<path d="M${f1(ex-44)} ${f1(ey)}Q${f1(ex)} ${f1(ey-34)} ${f1(ex+44)} ${f1(ey)}Q${f1(ex)} ${f1(ey+34)} ${f1(ex-44)} ${f1(ey)}Z" style="fill:var(--panel);stroke:var(--brain-line);stroke-width:1.5"/>`;
    s+=C(ex,ey,19,'fill:var(--portal-soft);stroke:var(--portal);stroke-width:1.2')+C(ex,ey,7,'fill:var(--ink)');
    s+=C(ex,ey,18,`fill:none;stroke:var(--accent);stroke-width:5;opacity:${f1(kf*.9)}`);
    s+=T(ex,ey+38,'Kayser–Fleischer','t-xs t-mid',`opacity:${f1(.4+.6*kf)}`)+T(ex,ey+49,'ring (slit lamp)','t-xs t-mid',`opacity:${f1(.4+.6*kf)}`);
    if(u>.75){const o=ramp(u,.75,.85);s+=`<g style="opacity:${f1(o)}">`+pill(R.x+R.w-70,R.y+R.h-60,30,{ang:-15})+T(R.x+R.w-70,R.y+R.h-36,'chelator or zinc','t-xs t-mid','fill:var(--ink)')+'</g>'}
    s+=T(cx,cy+86,u>.75?'copper load falls with treatment':'copper piles up in the cell','t-xs t-mid');
    return s}
  function sAAT(R,u,ph){const cx=R.x+R.w*.5,cy=R.y+R.h*.4;let s='';
    const z=u<.25?0:u<.75?ease(ramp(u,.25,.7)):lerp(1,.17,ease(ramp(u,.75,.95)));
    s+=`<path d="${smoothPath([[cx-90,cy],[cx-70,cy-62],[cx,cy-80],[cx+76,cy-60],[cx+96,cy],[cx+72,cy+58],[cx,cy+74],[cx-72,cy+56]])}" style="fill:var(--cell);stroke:var(--liver);stroke-width:1.8"/>`;
    s+=C(cx-50,cy+10,14,'fill:var(--liver-fill);opacity:.8');
    for(let i=0;i<4;i++)s+=`<path d="M${f1(cx-20)} ${f1(cy-44+i*13)}q12 -6 24 0t24 0t24 0" style="fill:none;stroke:var(--nh3);stroke-width:1.1;opacity:.6"/>`;
    s+=T(cx+30,cy-52,'ER','t-xs t-mid');
    const G=[[cx+10,cy+18],[cx+44,cy+12],[cx+26,cy+42],[cx-8,cy+46],[cx+58,cy+38],[cx-24,cy-16],[cx+66,cy-12]];
    G.forEach(([x,y],i)=>{const r=(5+i%3*2)*z+(z>0?1:0);if(r>0)s+=C(x,y,r,'fill:var(--nh3-fill);stroke:var(--nh3);stroke-width:1;opacity:.9')});
    if(z>.1)for(let k=0;k<3;k++){const x0=cx-30+k*26,y0=cy+64-k*4;for(let j=0;j<4;j++)s+=C(x0+j*5,y0,2.2,`fill:var(--nh3);opacity:${f1(z)}`)}
    const vy=R.y+R.h-58;s+=R4(R.x+14,vy,R.w-28,22,'fill:var(--portal-soft);stroke:var(--portal)',11)+T(R.x+20,vy+36,'blood (sinusoid)','t-xs');
    const nOut=u<.25?8:2;for(let i=0;i<nOut;i++){const k=(ph*.5+i/nOut)%1;s+=R4(lerp(R.x+20,R.x+R.w-30,k),vy+7,10,8,'fill:var(--nh3)',4)}
    s+=AR(cx,cy+76,cx,vy-2,'var(--nh3)',u<.25?2.2:1);
    s+=T(cx,R.y+20,u<.25?'Pi*MM: AAT folds and is secreted':u<.75?'Pi*ZZ: Z-AAT misfolds, polymers stay':'fazirsiran (RNAi) cuts Z-AAT made','t-lbl t-mid');
    if(u>=.75)s+=T(cx,R.y+34,'phase 2 · Early evidence','t-xs t-mid','fill:var(--warn)');
    return s}
  function sAIH(R,u,ph){let s='';const tx=R.x+46,ty=R.y+R.h*.46,att=u<.62?ease(ramp(u,.05,.45)):1-.85*ease(ramp(u,.62,.95));
    s+=C(tx,ty,28,'fill:var(--panel-2);stroke:var(--line)')+C(tx-8,ty-4,10,'fill:var(--portal)')+C(tx+10,ty-10,5,'fill:var(--artery)')+C(tx+8,ty+12,5,'fill:var(--bile);stroke:var(--accent)');
    s+=T(tx,ty+44,'portal tract','t-xs t-mid');
    for(let c=0;c<3;c++)for(let r=0;r<4;r++){const x=R.x+120+c*72,y=R.y+60+r*64,edge=c===0;s+=hepatocyte(x,y,54,{hurt:edge?att:c===1?att*.4:0,seed:c*4+r})}
    s+=`<line x1="${f1(R.x+88)}" x2="${f1(R.x+88)}" y1="${f1(R.y+40)}" y2="${f1(R.y+R.h-40)}" style="stroke:var(--dx);stroke-width:1.2;stroke-dasharray:4 3;opacity:${f1(.3+.7*att)}"/>`;
    s+=T(R.x+88,R.y+R.h-26,'interface','t-xs t-mid','fill:var(--dx)');
    const n=Math.round(att*12);for(let i=0;i<n;i++){const k=((ph*.35+i/12)%1),yy=R.y+50+((i*53)%(R.h-100));s+=lymph(lerp(tx+20,R.x+150,k*att),yy,5)}
    for(let i=0;i<Math.round(att*4);i++)s+=anti(R.x+70+i*14,R.y+30,5,.8);
    if(u>.55){const o=ramp(u,.55,.66);s+=`<g style="opacity:${f1(o)}">`+pill(R.x+R.w-110,R.y+R.h-40,30,{ang:-12})+T(R.x+R.w-88,R.y+R.h-42,'steroid, then','t-xs','fill:var(--ink)')+T(R.x+R.w-88,R.y+R.h-31,'azathioprine','t-xs','fill:var(--ink)')+'</g>'}
    s+=T(R.x+12,R.y+20,u<.55?'immune cells cross into the lobule':'immune attack calmed','t-lbl');
    return s}
  function sPBC(R,u,ph){let s='';const d=ease(ramp(u,.05,.62)),fix=ramp(u,.7,1);
    const ducts=[[R.x+R.w*.25,R.y+92],[R.x+R.w*.52,R.y+70],[R.x+R.w*.75,R.y+100]];
    ducts.forEach(([x,y],i)=>{s+=C(x,y,26,'fill:var(--panel-2);stroke:var(--line)');
      const r=10*(1-.75*d),op=1-.7*d;s+=C(x,y,r+3,`fill:none;stroke:var(--accent);stroke-width:3;opacity:${f1(op)};stroke-dasharray:${d>.3?'5 4':'none'}`)+C(x,y,Math.max(1,r-1),`fill:var(--bile);opacity:${f1(op*.8)}`);
      for(let k=0;k<Math.round(d*5);k++){const a=k*1.3+ph*.6+i;s+=lymph(x+Math.cos(a)*19,y+Math.sin(a)*19,4)}
      if(d>.2)s+=anti(x+22,y-24,5,d)});
    s+=T(R.x+12,R.y+20,d<.5?'small bile ducts, ringed by immune cells':'ducts vanish; bile backs up','t-lbl');
    s+=T(R.x+R.w*.52,R.y+142,'portal tracts (each with a small bile duct)','t-xs t-mid');
    const back=d*(1-.5*fix);[0,1,2].forEach(i=>{const x=R.x+70+i*90,y=R.y+R.h-110;s+=hepatocyte(x,y,62,{seed:9+i});for(let k=0;k<Math.round(back*7);k++){const a=k*2.1+i;s+=C(x+Math.cos(a)*14,y+Math.sin(a)*10,2.6,'fill:var(--bile)')}});
    s+=T(R.x+160,R.y+R.h-62,'bile retained in hepatocytes (cholestasis)','t-xs t-mid');
    const bx=R.x+R.w-40,by=R.y+R.h-30,h=70*(.15+.85*back);s+=R4(bx,by-70,16,70,'fill:var(--panel-2);stroke:var(--line)',3)+R4(bx,by-h,16,h,'fill:var(--accent);opacity:.85',3)+T(bx+8,by+12,'ALP','t-xs t-mid','fill:var(--ink);font-weight:700');
    if(fix>0)s+=`<g style="opacity:${f1(ramp(u,.7,.78))}">`+pill(R.x+40,R.y+R.h-30,30,{ang:-10})+T(R.x+62,R.y+R.h-26,'ursodiol (UDCA)','t-xs','fill:var(--ink)')+'</g>';
    return s}
  function sPSC(R,u,ph){let s='';const b=ease(ramp(u,.05,.7)),cx=R.x+R.w*.42;
    s+=`<g style="opacity:.3">${liver(cx,R.y+R.h*.34,1.45,{fib:1+2*b,gb:false,seed:21}).svg}</g>`;
    const path=[[cx,R.y+R.h-48],[cx,R.y+R.h*.52]],L=[[[cx,R.y+R.h*.52],[cx-60,R.y+R.h*.3],[cx-100,R.y+R.h*.22]],[[cx,R.y+R.h*.52],[cx+50,R.y+R.h*.32],[cx+90,R.y+R.h*.2]],[[cx-60,R.y+R.h*.3],[cx-50,R.y+R.h*.14]],[[cx+50,R.y+R.h*.32],[cx+36,R.y+R.h*.14]]];
    const tube=(P,r0)=>{let g='';for(let k=0;k<P.length-1;k++){const [a,c]=[P[k],P[k+1]],n=Math.ceil(Math.hypot(c[0]-a[0],c[1]-a[1])/2.5);for(let i=0;i<=n;i++){const q=i/n,x=lerp(a[0],c[0],q),y=lerp(a[1],c[1],q),w=r0*(1+b*.75*Math.sin((x+y)*.16));g+=C(x,y,Math.max(.8,w),'fill:var(--bile)')}}return g};
    s+=tube(path,5)+L.map((P,i)=>tube(P,i<2?4:3)).join('');
    s+=R4(cx-26,R.y+R.h-48,52,16,'fill:var(--panel-2);stroke:var(--line)',8)+T(cx,R.y+R.h-20,'to the gut','t-xs t-mid');
    s+=T(R.x+12,R.y+20,b<.5?'bile ducts, smooth':'strictures and dilatations: "beaded" ducts','t-lbl');
    const co=ramp(u,.45,.75),kx=R.x+R.w-58,ky=R.y+R.h-92;
    s+=`<g style="opacity:${f1(.25+.75*co)}"><path d="M${f1(kx-32)} ${f1(ky+40)}V${f1(ky-20)}Q${f1(kx-32)} ${f1(ky-36)} ${f1(kx)} ${f1(ky-36)}Q${f1(kx+32)} ${f1(ky-36)} ${f1(kx+32)} ${f1(ky-20)}V${f1(ky+40)}" style="fill:none;stroke:var(--liver-fill);stroke-width:11;stroke-linecap:round;opacity:.55"/>`;
    for(let i=0;i<6;i++)s+=C(kx-32+(i%2)*64,ky+30-i*9,2.4,`fill:var(--bad);opacity:${f1(co)}`);
    s+=T(kx,ky+58,'colon: IBD','t-xs t-mid','fill:var(--ink)')+T(kx,ky+69,'in 71.1%','t-xs t-mid','fill:var(--ink)')+'</g>';
    return s}
  function sDILI(R,u,ph){let s='';const hx=R.x+R.w*.42,hy=R.y+R.h*.42,h=ease(ramp(u,.05,.4));
    s+=R4(R.x+16,R.y+44,30,40,'fill:var(--panel);stroke:var(--muted);stroke-width:1.4',5)+R4(R.x+14,R.y+38,34,9,'fill:var(--muted)',3)+pill(R.x+76,R.y+60,26,{ang:30})+`<path d="M${f1(R.x+44)} ${f1(R.y+112)}q16 -26 34 -12q-14 18 -34 12z" style="fill:var(--stellate);opacity:.85"/>`;
    s+=T(R.x+14,R.y+130,'medicines,','t-xs')+T(R.x+14,R.y+141,'herbs,','t-xs')+T(R.x+14,R.y+152,'supplements','t-xs');
    s+=AR(R.x+96,R.y+86,hx-40,hy-10,'var(--bad)');
    s+=hepatocyte(hx,hy,96,{hurt:h,seed:4});
    s+=T(hx,hy+64,'injured hepatocyte','t-xs t-mid');
    const items=['viral hepatitis','alcohol','autoimmune','bile ducts','other causes'],lx=R.x+R.w*.66,ly=R.y+60;
    s+=T(lx,ly-22,'rule out first:','t-xs','fill:var(--ink);font-weight:700');
    items.forEach((it,i)=>{const d=ramp(u,.35+i*.08,.42+i*.08),y=ly+i*24;s+=R4(lx,y-10,12,12,'fill:var(--panel);stroke:var(--muted)',2);
      if(d>0)s+=`<path d="M${f1(lx+2)} ${f1(y-4)}l3 4l6 -8" style="stroke:var(--rx);stroke-width:2;fill:none;opacity:${f1(d)}"/>`;
      s+=T(lx+18,y,it,'t-xs',d>0?'fill:var(--ink)':'')});
    const f=ramp(u,.8,.9);s+=`<g style="opacity:${f1(f)}">`+R4(lx-4,ly+118,R.x+R.w-lx-6,34,'fill:var(--bad-soft);stroke:var(--bad)',8)+T(lx+4,ly+132,'DILI likely,','t-xs','fill:var(--bad);font-weight:700')+T(lx+4,ly+144,'causality: RUCAM','t-xs','fill:var(--bad)')+'</g>';
    s+=T(R.x+12,R.y+20,'a diagnosis of exclusion','t-lbl');
    return s}
  function sFON(R,u,ph){let s='';const cx=R.x+R.w*.42,yr=Math.round(24*ramp(u,.05,.9)),fib=3.4*ramp(u,.1,.9);
    const hx=cx,hy=R.y+64;s+=`<path d="M${f1(hx)} ${f1(hy+30)}C${f1(hx-46)} ${f1(hy)} ${f1(hx-34)} ${f1(hy-34)} ${f1(hx)} ${f1(hy-14)}C${f1(hx+34)} ${f1(hy-34)} ${f1(hx+46)} ${f1(hy)} ${f1(hx)} ${f1(hy+30)}Z" style="fill:var(--artery);opacity:.75"/>`+T(hx+46,hy-4,'heart:','t-xs')+T(hx+46,hy+7,'Fontan circulation','t-xs');
    const vw=4+5*ramp(u,0,.4);s+=`<path d="M${f1(hx)} ${f1(hy+32)}V${f1(R.y+R.h*.5)}" style="stroke:var(--portal);stroke-width:${f1(vw)};stroke-linecap:round"/>`;
    for(let i=0;i<4;i++){const k=(1-((ph*.4+i/4)%1));s+=C(hx,lerp(hy+34,R.y+R.h*.5,k),2.4,'fill:var(--panel)')}
    s+=T(hx-10,R.y+R.h*.4,'high venous','t-xs t-end')+T(hx-10,R.y+R.h*.4+11,'pressure','t-xs t-end');
    s+=liver(cx,R.y+R.h*.64,1.05,{fib,gb:false,seed:17}).svg;
    const tx0=R.x+24,tx1=R.x+R.w-24,ty=R.y+R.h-22,X=v=>lerp(tx0,tx1,v/24);
    s+=`<line x1="${f1(tx0)}" x2="${f1(tx1)}" y1="${f1(ty)}" y2="${f1(ty)}" class="axis"/>`;
    [0,10,20].forEach(v=>s+=T(X(v),ty+12,v+' y','t-xs t-mid'));s+=C(X(yr),ty,5,'fill:var(--portal);stroke:var(--panel);stroke-width:2');
    s+=T(tx1,ty-8,`${yr} years after surgery`,'t-xs t-end','fill:var(--ink)');
    if(u>.85)s+=T(R.x+R.w-12,R.y+R.h*.5,'HCC 3.9% at ≥20 y','t-xs t-end',`fill:var(--bad);opacity:${f1(ramp(u,.85,.95))}`);
    return s}
  const SC=[sHH,sWil,sAAT,sAIH,sPBC,sPSC,sDILI,sFON];
  function info(R,I,u){let s=R4(R.x,R.y,R.w,R.h,'fill:var(--panel);stroke:var(--line)',12),x=R.x+16,y=R.y+26;
    s+=T(x,y,I.tag,'t-sm',`fill:${I.col};letter-spacing:.08em`);y+=24;
    s+=T(x,y,I.name,'t-big','font-size:19px');y+=12;
    const row=(lab,L)=>{y+=20;s+=T(x,y,lab,'t-xs','letter-spacing:.1em');L.forEach(l=>{y+=15;s+=T(x,y,l,'t-lbl','font-weight:500')})};
    row('WHERE',I.where);row('KEY TEST',I.test);row(I.rxl||'TREATMENT',I.rx);
    y+=36;const g=ease(ramp(u,.08,.45)),n=I.num;
    const big=n.txt?n.txt:`${(n.v*g).toFixed(n.dp||0)}${n.suf||''}`;
    s+=T(x,y,big,'t-big',`font-size:28px;fill:${I.col};opacity:${f1(n.txt?.3+.7*g:1)}`);
    I.cap.forEach((c,i)=>s+=T(x,y+16+i*12,c,'t-xs'));
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 650'),p=phaseOf(S,t),u=ramp(t,S[p].from,p+1<S.length?S[p+1].from:1);
    const SR=N?{x:8,y:8,w:384,h:330}:{x:12,y:12,w:346,h:356},IR=N?{x:8,y:346,w:384,h:298}:{x:372,y:12,w:336,h:356};
    let s=`<defs>${marker('ocArr','var(--muted)')}</defs>`+R4(SR.x,SR.y,SR.w,SR.h,'fill:var(--field);stroke:var(--line)',12);
    s+=SC[p](SR,u,t*40)+info(IR,OC_INFO[p],u);
    /* progress dots: where we are in the atlas */
    OC_INFO.forEach((I,i)=>{s+=C(IR.x+IR.w-16-(7-i)*12,IR.y+22,i===p?4.5:3,`fill:${i===p?I.col:'var(--line)'}`)});
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',`${p+1} of 8: ${OC_INFO[p].name}`);
    $('#ocNote').innerHTML=noteHTML(S[p]);
  }
  const stop=playWire(rg,$('#ocPlay'),draw,40000,'Replay','othercauses');
  const setSt=stepWire($('#ocSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- pedigree: autosomal recessive inheritance ---- */
  const ps=$('#ocPed');let gene='hfe',par='cc';
  const PAR={cc:[['v','+'],['v','+']],ca:[['v','+'],['v','v']],cn:[['v','+'],['+','+']],an:[['v','v'],['+','+']]};
  const GN={hfe:{v:'C282Y',name:'HFE',dis:'haemochromatosis'},wil:{v:'ATP7B*',name:'ATP7B',dis:'Wilson disease'}};
  function drawPed(){const N=vb(ps,'720 262','400 446'),G=GN[gene],[fa,mo]=PAR[par],al=a=>a==='v'?G.v:'+',cnt=g=>g.filter(a=>a==='v').length,aff=g=>[0,.5,1][cnt(g)];
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    const kids=[];fa.forEach(a=>mo.forEach(b=>kids.push([a,b])));
    const px=N?200:200,fx=px-70,mx=px+70,py=50;
    s+=`<line x1="${fx+12}" x2="${mx-12}" y1="${py}" y2="${py}" style="stroke:var(--ink);stroke-width:1.5"/><line x1="${px}" x2="${px}" y1="${py}" y2="${py+44}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    s+=ped(fx,py,'m',aff(fa),{r:13})+ped(mx,py,'f',aff(mo),{r:13});
    s+=T(fx,py-22,'father','t-xs t-mid')+T(mx,py-22,'mother','t-xs t-mid')+T(fx,py+28,fa.map(al).join(' / '),'t-xs t-mid','fill:var(--ink)')+T(mx,py+28,mo.map(al).join(' / '),'t-xs t-mid','fill:var(--ink)');
    const kx0=px-135,kw=90,ky=py+80;s+=`<line x1="${kx0}" x2="${kx0+3*kw}" y1="${py+44}" y2="${py+44}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    let pro=false;
    kids.forEach((k,i)=>{const x=kx0+i*kw,a=aff(k);s+=`<line x1="${x}" x2="${x}" y1="${py+44}" y2="${ky-13}" style="stroke:var(--ink);stroke-width:1.5"/>`;
      const pb=a===1&&!pro;if(pb)pro=true;
      s+=ped(x,ky,i%2?'f':'m',a,{r:13,proband:pb});
      s+=T(x,ky+28,k.map(al).join(' / '),'t-xs t-mid','fill:var(--ink)')+T(x,ky+40,['no copy','carrier','two copies'][cnt(k)],'t-xs t-mid',a===1?'fill:var(--brand);font-weight:700':'')+T(x,ky+52,'25% each','t-xs t-mid')});
    const two=kids.filter(k=>cnt(k)===2).length*25,one=kids.filter(k=>cnt(k)===1).length*25,none=100-two-one;
    const sy=ky+80;s+=T(px,sy,`Each child: ${two}% two copies · ${one}% carrier · ${none}% no copy`,'t-lbl t-mid');
    /* legend */
    const lgy=sy+26;s+=ped(px-120,lgy,'m',1,{r:7})+T(px-108,lgy+4,'two copies','t-xs')+ped(px-30,lgy,'m',.5,{r:7})+T(px-18,lgy+4,'carrier','t-xs')+ped(px+50,lgy,'m',0,{r:7})+T(px+62,lgy+4,'no copy','t-xs');
    /* Punnett square */
    const qx=N?110:470,qy=N?lgy+56:56,c=N?92:96;
    s+=T(qx+c,qy-28,'Punnett square','t-sm t-mid');
    s+=T(qx-12,qy+c*.5+4,'mother ↓','t-xs t-end')+T(qx+c,qy-12,'father →','t-xs t-mid');
    fa.forEach((a,i)=>s+=T(qx+c*(i+.5),qy-2,al(a),'t-xs t-mid','fill:var(--ink);font-weight:700'));
    mo.forEach((b,j)=>s+=T(qx-4,qy+c*(j+.5)+16,al(b),'t-xs t-end','fill:var(--ink);font-weight:700'));
    fa.forEach((a,i)=>mo.forEach((b,j)=>{const g=[a,b],n=cnt(g),x=qx+c*i,y=qy+c*j;
      s+=R4(x+2,y+2,c-4,c-4,`fill:${n===2?'var(--brand-soft)':n===1?'var(--accent-soft)':'var(--panel)'};stroke:var(--line)`,6);
      s+=ped(x+c/2,y+c*.38,'m',[0,.5,1][n],{r:10})+T(x+c/2,y+c*.72,g.map(al).join('/'),'t-xs t-mid','fill:var(--ink)')+T(x+c/2,y+c*.86,'25%','t-xs t-mid')}));
    ps.innerHTML=s;
    const pen=gene==='hfe'?`Two copies of C282Y are needed for HFE haemochromatosis to be diagnosed from raised iron indices <sup class="c" data-ref="EASL2022HH" title="Source 108">108</sup>, but two copies are not the disease: iron-overload disease developed in 28.4% of homozygous men and 1.2% of homozygous women followed for about 12 years in Melbourne <sup class="c" data-ref="Allen2008NEJM" title="Source 12">12</sup>, and by the end of UK Biobank follow-up haemochromatosis had been diagnosed in 21.7% of homozygous men and 9.8% of women <sup class="c" data-ref="Pilling2019BMJ" title="Source 354">354</sup>.`
      :`Wilson disease is autosomal recessive, caused by variants in ATP7B <sup class="c" data-ref="Ferenci2003Leipzig" title="Source 154">154</sup>. About 1 in 7,026 people are predicted to carry two pathogenic variants, far more than the 1 in 30,000 with symptomatic disease, which suggests reduced penetrance and missed diagnoses <sup class="c" data-ref="Coffey2013,Czlonkowska2018" title="Source 81,90">81,90</sup>.`;
    $('#ocPedNote').innerHTML=`<div class="kicker">${G.dis} · ${G.name}</div><h4>${two}% of children with two copies</h4><p>The chances come from Mendel's rules: each parent passes on one of their two copies at random, so each child is one square of the Punnett square. They are the same for every pregnancy, whatever happened to brothers or sisters.</p><p>${pen}</p>`}
  $$('[data-ocg]').forEach(b=>b.addEventListener('click',()=>{gene=b.dataset.ocg;$$('[data-ocg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawPed()}));
  $$('[data-ocp]').forEach(b=>b.addEventListener('click',()=>{par=b.dataset.ocp;$$('[data-ocp]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawPed()}));
  drawPed();
  const prevR=redraws.othercauses;redraws.othercauses=()=>{prevR&&prevR();drawPed()};

  /* ---- which test? matrix ---- */
  const mx=$('#ocMx');let selR=0,selC=-1;
  function drawMx(){let h='<thead><tr><th scope="col">Cause</th>'+OC_MX.cols.map((c,j)=>`<th scope="col"><button class="oc-colb" data-occ="${j}" aria-pressed="${j===selC}">${c}</button></th>`).join('')+'</tr></thead><tbody>';
    OC_MX.rows.forEach((r,i)=>{h+=`<tr class="${i===selR&&selC<0?'oc-on':''}"><th scope="row"><button class="oc-rowb" data-ocr="${i}" aria-pressed="${i===selR&&selC<0}">${r.n}</button></th>`+OC_MX.cols.map((_,j)=>{const m=r.m[j];return `<td class="${j===selC?'oc-colon':''}${m?' oc-'+m:''}">${m==='K'?'<span aria-label="key test">●</span>':m==='S'?'<span aria-label="supportive">○</span>':''}</td>`}).join('')+'</tr>'});
    mx.innerHTML=h+'</tbody>';
    let note;
    if(selC<0){const r=OC_MX.rows[selR];note=`<div class="kicker">Which test?</div><h4>${r.n}</h4><p>${r.d}</p>`}
    else{const K=OC_MX.rows.filter(r=>r.m[selC]==='K').map(r=>r.n),Sx=OC_MX.rows.filter(r=>r.m[selC]==='S').map(r=>r.n);
      note=`<div class="kicker">Which test?</div><h4>${OC_MX.cols[selC]}</h4><p>${K.length?'Key test here for: <b>'+K.join(', ')+'</b>.':''} ${Sx.length?'Supportive for: '+Sx.join(', ')+'.':''} Choose a cause on the left to read what its sources say.</p>`}
    $('#ocMxNote').innerHTML=note}
  mx.addEventListener('click',e=>{const r=e.target.closest('[data-ocr]'),c=e.target.closest('[data-occ]');if(r){selR=+r.dataset.ocr;selC=-1;drawMx()}else if(c){selC=+c.dataset.occ===selC?-1:+c.dataset.occ;drawMx()}});
  drawMx();
};
/* =============== 3.1 Blood tests, scans & biopsy =============== */
/* the seven tiles of the dashboard: dir = typical direction as cirrhosis advances (0 = no single direction shown) */
const TE_TILES=[
 {k:'ALT',sub:'leaks from injured cells',dir:0,txt:'read it beside AST',st:0},
 {k:'AST',sub:'also leaks from cells',dir:1,txt:'AST/ALT often above 1',st:0},
 {k:'ALP',sub:'bile-duct enzyme',dir:1,txt:'high in cholestatic causes',st:1},
 {k:'Bilirubin',sub:'yellow bile pigment',dir:1,txt:'conjugated part rises',st:1},
 {k:'Albumin',sub:'protein the liver makes',dir:-1,txt:'falls: less is made',st:2},
 {k:'INR',sub:'clotting-time ratio',dir:1,txt:'higher adds score points',st:2},
 {k:'Platelets',sub:'clotting cells',dir:-1,txt:'spleen holds them',st:2}
];
const TE_STEPS=[
 {from:0,at:.09,k:'Step 1 · liver-cell enzymes',t:'ALT and AST',
  txt:`ALT and AST leak from injured liver cells. ACG defines a hepatocellular pattern as AST and ALT raised out of proportion to alkaline phosphatase, and gives a "true healthy normal" ALT of 29–33 IU/L for males and 19–25 IU/L for females. In 100 people with chronic hepatitis B, the mean AST/ALT ratio was 0.59 without cirrhosis and 1.02 with it; the ratio often rose above 1.0 as cirrhosis first appeared. <sup class="c" data-ref="Kwo2017ACG,Williams1988ASTALT" title="Source 249,498">249,498</sup>`,
  pt:`ALT and AST show whether liver cells are being hurt. In cirrhosis the balance between them often shifts, so doctors look at the ratio, not just whether each is "high".`,
  hook:`AST/ALT ratio &gt;1 in non-alcohol-related chronic liver disease suggests cirrhosis; a ratio &gt;2 is usually seen in alcohol-related liver disease.`},
 {from:.2,at:.29,k:'Step 2 · bile flow',t:'ALP and bilirubin',
  txt:`A cholestatic pattern is alkaline phosphatase raised out of proportion to AST and ALT; a hepatic ALP rise prompts testing for primary biliary cholangitis (PBC) and primary sclerosing cholangitis (PSC). Most circulating bilirubin is unconjugated; a raised conjugated (direct) bilirubin implies hepatocellular disease or biliary obstruction in most settings. <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>`,
  pt:`Alkaline phosphatase and bilirubin rise when bile cannot flow freely or the liver cannot clear it. Bilirubin is the pigment that turns skin and eyes yellow.`,
  hook:`Hepatocellular = AST/ALT ≫ ALP. Cholestatic = ALP ≫ AST/ALT. Raised conjugated bilirubin = liver disease or obstruction.`},
 {from:.4,at:.5,k:'Step 3 · function and pressure',t:'Albumin, INR, platelets',
  txt:`Reduced synthesis in liver disease is the best-understood cause of a chronically low albumin. INR sits in both Child–Pugh and MELD, and a higher INR adds points. Platelets below 150,000/µL have been seen in up to 76% of people with chronic liver disease, from splenic sequestration, marrow suppression and less thrombopoietin; a count below 160 ×10³/µL raised the likelihood of cirrhosis (LR 6.3). <sup class="c" data-ref="Levitt2016,Peng2016ChildMELD,Kim2008MELDNa,Afdhal2008Platelets,Udell2012JAMA" title="Source 9,233,263,351,473">9,233,263,351,473</sup>`,
  pt:`When the liver scars, the spleen can grow and hold on to platelets, so a low platelet count can be a clue to cirrhosis. A low albumin can mean the liver is making less protein.`,
  hook:`Platelets &lt;160 ×10³/µL: LR 6.3 for cirrhosis. Platelets ≥160: LR 0.29.`},
 {from:.6,at:.7,k:'Step 4 · the scan',t:'Ultrasound features',
  txt:`In 300 people with raised aminotransferases who had both ultrasound and biopsy, liver surface nodularity was the most accurate sign of severe fibrosis or cirrhosis (specificity 95%, LR+ 11.6). It alone raised the post-test probability from 35% to 86%; adding caudate hypertrophy and hepatic-vein flow raised it only to 88%. The right lobe shrinks and the caudate lobe enlarges: a caudate-to-right-lobe ratio was 84% sensitive and 100% specific in a small 1980 series. Ascites on examination carries an LR of 7.2. <sup class="c" data-ref="Colli2003US,Harbin1980Caudate,Udell2012JAMA" title="Source 82,191,473">82,191,473</sup>`,
  pt:`An ultrasound can show a bumpy liver surface, a change in the shape of the liver's lobes, and fluid in the belly. A smooth scan does not fully rule cirrhosis out.`,
  hook:`Best single ultrasound sign of cirrhosis: surface nodularity (specificity 95%).`},
 {from:.8,at:.92,k:'Step 5 · tissue',t:'Biopsy: role and risks',
  txt:`An optimal specimen is 20–25 mm long and/or holds more than 11 complete portal tracts; published percutaneous series averaged 17.7 mm. Samples from the right and left lobes differed by at least one fibrosis stage in 33.1%, which the authors attribute to sampling error. In 61,187 elective biopsies in England, major bleeding was about 6 per 1000 and deaths directly due to biopsy at most about 1 in 10,000. <sup class="c" data-ref="Cholongitas2006Biopsy,Regev2002,West2010Biopsy" title="Source 78,372,494">78,372,494</sup>`,
  pt:`A liver biopsy takes a tiny piece of liver. Serious bleeding happens in about 6 in 1000 biopsies, which is why blood tests and scans are tried first.`,
  hook:`Biopsy can miss cirrhosis through sampling error: in 14.5% of paired-lobe biopsies one lobe read as cirrhosis and the other as stage 3.`}
];
/* practice cases for the sorter: d = directions for the seven tiles (1 up, -1 down, 0 not mentioned, 2 strongly up) */
const TE_CASES=[
 {txt:`<b>Case 1.</b> ALT and AST are both clearly raised; alkaline phosphatase is only slightly above its range. Bilirubin, albumin, INR and platelets are not mentioned as abnormal.`,d:[2,2,1,0,0,0,0],a:'h',
  why:`ALT and AST raised out of proportion to ALP is ACG's definition of a hepatocellular pattern. The ACG work-up for it covers hepatitis A, B and C, fatty liver disease, alcohol-related liver disease, haemochromatosis, autoimmune hepatitis, Wilson disease, alpha-1 antitrypsin deficiency and a medicine history. <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>`},
 {txt:`<b>Case 2.</b> Alkaline phosphatase is raised well out of proportion to ALT and AST, and the conjugated (direct) bilirubin is up.`,d:[1,1,2,1,0,0,0],a:'c',
  why:`ALP raised out of proportion to AST and ALT defines a cholestatic pattern, and a raised conjugated bilirubin implies hepatocellular disease or biliary obstruction in most settings. A hepatic ALP elevation prompts testing for PBC and PSC. <button class="btn ghost" data-go="othercauses">Bile-duct diseases →</button> <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>`},
 {txt:`<b>Case 3.</b> Albumin is low, INR and bilirubin are high and platelets are low, while ALT and AST are only mildly abnormal.`,d:[1,1,0,1,-1,1,-1],a:'a',
  why:`Bilirubin, albumin and INR are three of the five Child–Pugh items, and bilirubin and INR are in MELD: they describe how well the liver is working, not how much it is injured today. Reduced synthesis is the best-understood cause of a chronically low albumin, and low platelets point to the spleen holding them. <button class="btn ghost" data-go="scores">Child–Pugh &amp; MELD →</button> <sup class="c" data-ref="Peng2016ChildMELD,Kim2008MELDNa,Levitt2016,Afdhal2008Platelets" title="Source 9,233,263,351">9,233,263,351</sup>`},
 {txt:`<b>Case 4.</b> AST is more than twice ALT; both are raised. Alkaline phosphatase is near its range.`,d:[1,2,0,0,0,0,0],a:'h',
  why:`AST and ALT dominate, so this is a hepatocellular pattern. Williams and Hoofnagle noted that an AST/ALT ratio above 2.0 is usually seen in alcohol-related liver disease and below 1.0 in chronic hepatitis, though the ratio is less helpful for telling causes apart once cirrhosis is present. <sup class="c" data-ref="Kwo2017ACG,Williams1988ASTALT" title="Source 249,498">249,498</sup>`},
 {txt:`<b>Case 5.</b> A person with hepatitis C has an AST/ALT ratio of 1 or more and a low platelet count.`,d:[1,1,0,0,0,0,-1],a:'a',
  why:`In 252 people with hepatitis C-related chronic liver disease, an AST/ALT ratio ≥1 was more frequent in cirrhosis, and AST/ALT combined with the platelet count gave a 97.0% positive and 97.9% negative predictive value for cirrhosis in that cohort. Low platelets are also an HCC risk marker. <sup class="c" data-ref="Giannini2003ASTALT,Ioannou2007HCC" title="Source 174,208">174,208</sup>`},
 {txt:`<b>Case 6.</b> A woman's ALT is 45 IU/L. Her laboratory's printed range says "normal" up to 50; everything else is unremarkable.`,d:[1,0,0,0,0,0,0],a:'h',
  why:`ACG gives a "true healthy normal" ALT of 19–25 IU/L for females (29–33 for males) and says levels above this should be assessed; an elevated ALT has been associated with increased liver-related mortality. A mild, isolated ALT rise is still a hepatocellular pattern. <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>`}
];
const TE_ANS={h:'Hepatocellular',c:'Cholestatic',a:'Signs of advanced disease'};
function teArrow(x,y,dir,s=1,col='var(--dx)'){
  if(!dir)return `<line x1="${f1(x-6*s)}" x2="${f1(x+6*s)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--muted);stroke-width:${f1(2.2*s)};stroke-linecap:round"/>`;
  const d=dir>0?-1:1,n=Math.abs(dir)>1?2:1;let g='';
  for(let i=0;i<n;i++){const ox=(i-(n-1)/2)*9*s;g+=`<path d="M${f1(x+ox)} ${f1(y-d*7*s)}L${f1(x+ox)} ${f1(y+d*6*s)}M${f1(x+ox-4.5*s)} ${f1(y+d*1.5*s)}L${f1(x+ox)} ${f1(y+d*6.5*s)}L${f1(x+ox+4.5*s)} ${f1(y+d*1.5*s)}" style="fill:none;stroke:${col};stroke-width:${f1(2.2*s)};stroke-linecap:round;stroke-linejoin:round"/>`}
  return g}
inits.tests=()=>{
  const svg=$('#teSvg'),rg=$('#teT');
  /* one dashboard tile: lp = how far its marker has travelled (0..1) */
  function tile(T,x,y,w,h,lp,on,N){
    const act=lp>0,col=on?'var(--dx)':'var(--muted)';
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
    s+=`<text x="${f1(x+10)}" y="${f1(y+(N?16:19))}" class="t-lbl">${T.k}</text>`;
    s+=`<text x="${f1(x+10)}" y="${f1(y+(N?29:34))}" class="t-xs">${T.sub}</text>`;
    /* low-high track with a schematic marker */
    const tx0=x+10,tx1=x+w-34,ty=y+(N?42:50);
    s+=`<line x1="${f1(tx0)}" x2="${f1(tx1)}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    s+=`<text x="${f1(tx0)}" y="${f1(ty-5)}" class="t-xs" style="font-size:7.5px">low</text><text x="${f1(tx1)}" y="${f1(ty-5)}" class="t-xs t-end" style="font-size:7.5px">high</text>`;
    const m=.5+T.dir*.36*ease(clamp(lp));
    s+=`<circle cx="${f1(lerp(tx0,tx1,m))}" cy="${f1(ty)}" r="5" style="fill:${act&&T.dir?'var(--dx)':'var(--panel)'};stroke:${col};stroke-width:1.6"/>`;
    if(act)s+=`<g style="opacity:${f1(clamp(lp*2))}">${teArrow(x+w-16,y+h/2-2,T.dir,1.15,col)}</g>`;
    if(act)s+=`<text x="${f1(x+10)}" y="${f1(y+h-(N?7:10))}" class="t-xs" style="fill:${col};opacity:${f1(clamp(lp*2))}">${T.txt}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 640'),p=phaseOf(TE_STEPS,t),st=TE_STEPS[p],nx=p<TE_STEPS.length-1?TE_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx);
    let s=`<defs>${marker('teAr','var(--muted)')}</defs>`;
    /* ---- dashboard ---- */
    const D=N?{x:12,y:8,w:184,h:68,gx:8,gy:6}:{x:12,y:14,w:186,h:82,gx:8,gy:7};
    TE_TILES.forEach((T,i)=>{const c=i%2,r=Math.floor(i/2),x=D.x+c*(D.w+D.gx),y=D.y+r*(D.h+D.gy);
      const tp=TE_STEPS[T.st].from,tn=T.st<4?TE_STEPS[T.st+1].from:1,lp2=ramp(t,tp,tp+(tn-tp)*.55);
      s+=tile(T,x,y,D.w,D.h,lp2,p===T.st,N)});
    {const x=D.x+D.w+D.gx,y=D.y+3*(D.h+D.gy);
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(D.w)}" height="${f1(D.h)}" rx="10" style="fill:none;stroke:var(--line);stroke-dasharray:4 4"/>`;
      s+=teArrow(x+18,y+(N?20:24),1,1)+`<text x="${f1(x+32)}" y="${f1(y+(N?24:28))}" class="t-xs">typical direction</text>`;
      s+=`<text x="${f1(x+10)}" y="${f1(y+(N?42:50))}" class="t-xs">markers are schematic,</text><text x="${f1(x+10)}" y="${f1(y+(N?54:63))}" class="t-xs">not values</text>`}
    /* ---- scene panel ---- */
    const S=N?{x:12,y:310,w:376,h:322}:{x:404,y:14,w:304,h:352};
    s+=`<rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const cx=S.x+S.w/2;
    if(p<3){
      /* liver scarring as the panel is read; spleen and blood vessel with particles */
      const fib=lerp(0,4,ramp(t,0,.56)),lx=S.x+(N?104:96),ly=S.y+(N?84:96),ls=N?.82:.86;
      s+=liver(lx,ly,ls,{fib,seed:11}).svg;
      const stg=fib<.5?'healthy':fib<2.6?'fibrosis':fib<3.6?'bridging scar':'cirrhosis';
      s+=`<text x="${f1(lx)}" y="${f1(ly-(N?52:58))}" class="t-xs t-mid">liver: ${stg} (schematic)</text>`;
      const spg=ramp(t,.42,.6),spx=S.x+S.w-(N?64:62),spy=ly-4;
      s+=`<ellipse cx="${f1(spx)}" cy="${f1(spy)}" rx="${f1(16*(1+spg*.6))}" ry="${f1(26*(1+spg*.6))}" transform="rotate(20 ${f1(spx)} ${f1(spy)})" style="fill:var(--nh3-soft);stroke:var(--nh3);stroke-width:1.5"/>`;
      s+=`<text x="${f1(spx)}" y="${f1(spy-34-spg*16)}" class="t-xs t-mid">spleen${spg>.5?' (enlarged)':''}</text>`;
      /* blood vessel */
      const vy=S.y+(N?180:200),vx0=S.x+14,vx1=S.x+S.w-14;
      s+=`<path d="M${vx0} ${vy-11}H${vx1}M${vx0} ${vy+11}H${vx1}" style="stroke:var(--artery);stroke-width:1.4;opacity:.6"/>`;
      s+=`<text x="${f1(vx0)}" y="${f1(vy-16)}" class="t-xs">blood sample</text>`;
      /* leaks from liver into the vessel */
      const ph=(t*60)%1,rr=rng(5);
      const nEnz=p===0?Math.round(4+lp*8):6,nBil=p>=1?Math.round(3+ramp(t,.2,.4)*7):0,nAlb=Math.round(lerp(9,3,ramp(t,.4,.58))),nPlt=Math.round(lerp(10,3,ramp(t,.42,.6)));
      const dot=(i,n,col,r,off,lab)=>{let g='';for(let k=0;k<n;k++){const u=(ph+k/n+off)%1,x=lerp(vx0+6,vx1-30,u),y=vy+(rr()-.5)*14;g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${col};opacity:.85"/>`}return g};
      s+=dot(0,nEnz,'var(--dx)',2.6,0)+dot(1,nBil,'var(--bile)',2.6,.13)+dot(2,nAlb,'var(--brand)',2.2,.31);
      /* platelets: some drift up into the spleen */
      for(let k=0;k<nPlt;k++){const u=(ph+k/nPlt+.57)%1;s+=`<ellipse cx="${f1(lerp(vx0+6,vx1-30,u))}" cy="${f1(vy+(k%3-1)*4)}" rx="3.2" ry="1.8" style="fill:var(--artery);opacity:.8"/>`}
      if(spg>0)for(let k=0;k<Math.round(spg*7);k++){const a=k*1.7;s+=`<ellipse cx="${f1(spx+Math.cos(a)*9)}" cy="${f1(spy+Math.sin(a)*14)}" rx="3.2" ry="1.8" style="fill:var(--artery);opacity:.85"/>`}
      /* leak arrows */
      if(p===0)s+=`<path d="M${f1(lx+20)} ${f1(ly+30)}Q${f1(lx+40)} ${f1(vy-30)} ${f1(lx+70)} ${f1(vy-14)}" class="arrow" marker-end="url(#teAr)"/><text x="${f1(lx+76)}" y="${f1(vy-24)}" class="t-xs" style="fill:var(--dx)">AST, ALT leak</text>`;
      if(p===1)s+=`<path d="M${f1(lx-30)} ${f1(ly+34)}Q${f1(lx-10)} ${f1(vy-26)} ${f1(lx+30)} ${f1(vy-14)}" class="arrow" marker-end="url(#teAr)"/><text x="${f1(lx+34)}" y="${f1(vy-24)}" class="t-xs" style="fill:var(--accent)">bilirubin, ALP</text>`;
      if(p===2)s+=`<path d="M${f1(spx-20)} ${f1(vy-14)}Q${f1(spx-26)} ${f1(spy+50)} ${f1(spx-10)} ${f1(spy+30+spg*10)}" class="arrow" marker-end="url(#teAr)"/><text x="${f1(spx-30)}" y="${f1(vy-28)}" class="t-xs t-end" style="fill:var(--artery)">platelets held</text>`;
      /* legend */
      const lgY=vy+(N?30:32);[['var(--dx)','enzymes'],['var(--bile)','bilirubin'],['var(--brand)','albumin'],['var(--artery)','platelets']].forEach(([c,l],k)=>{const x=S.x+14+k*(N?90:72);s+=`<circle cx="${x+3}" cy="${lgY-3}" r="3" style="fill:${c}"/><text x="${x+10}" y="${lgY}" class="t-xs">${l}</text>`});
      /* key numbers per step */
      const K=[[`AST/ALT ratio, chronic hepatitis B:`,`no cirrhosis`,.59,`cirrhosis`,1.02],[`Hepatocellular: AST, ALT ≫ ALP`,`Cholestatic: ALP ≫ AST, ALT`],[`Platelets <150,000/µL:`,`up to 76% in chronic liver disease`]][p];
      const ky=S.y+S.h-(N?66:76);
      if(p===0){const bx=S.x+16,bx0=bx+78,bw=S.w-32-78,v1=.59*ramp(lp,0,.4),v2=1.02*ramp(lp,.3,.8),X=v=>bx0+bw*v/1.2;
        s+=`<text x="${bx}" y="${ky}" class="t-sm">${K[0]}</text>`;
        [[v1,K[1],.59,'var(--muted)'],[v2,K[3],1.02,'var(--dx)']].forEach(([v,l,full,c],k)=>{const y=ky+12+k*22;s+=`<text x="${bx}" y="${y+11}" class="t-xs">${l}</text><rect x="${bx0}" y="${y}" width="${f1(Math.max(0,X(v)-bx0))}" height="14" rx="3" style="fill:${c};opacity:.75"/><text x="${f1(X(v)-4)}" y="${y+11}" class="t-xs t-end" style="fill:var(--on-brand);font-weight:700">${v>.2?v.toFixed(2):''}</text>`});
        s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${ky+6}" y2="${ky+52}" style="stroke:var(--ink);stroke-dasharray:3 3"/><text x="${f1(X(1))}" y="${ky+62}" class="t-xs t-mid">ratio 1.0</text>`}
      else{K.forEach((l,k)=>{s+=`<text x="${S.x+16}" y="${ky+16+k*18}" class="${k?'t-xs':'t-sm'}" style="${k&&p===2?'fill:var(--artery)':''}">${l}</text>`});
        if(p===2){const bx=S.x+16,bw=S.w-32,v=76*ramp(lp,.1,.7);s+=`<rect x="${bx}" y="${ky+40}" width="${bw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${ky+40}" width="${f1(bw*v/100)}" height="12" rx="3" style="fill:var(--artery);opacity:.7"/><text x="${f1(bx+bw*v/100+4)}" y="${ky+50}" class="t-xs">${Math.round(v)}%</text>`}
        if(p===1){s+=`<text x="${S.x+16}" y="${ky+52}" class="t-xs" style="fill:var(--accent)">raised conjugated bilirubin: liver disease or obstruction</text>`}}
    }else if(p===3){
      /* ---- ultrasound fan ---- */
      const ax=cx,ay=S.y+(N?22:26),R=N?236:262,A=N?.62:.66,u=ease(lp);
      const fan=`M${ax} ${ay}L${f1(ax-Math.sin(A)*R)} ${f1(ay+Math.cos(A)*R)}A${R} ${R} 0 0 0 ${f1(ax+Math.sin(A)*R)} ${f1(ay+Math.cos(A)*R)}Z`;
      const fid=uid('tefan');
      s+=`<clipPath id="${fid}"><path d="${fan}"/></clipPath><path d="${fan}" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<rect x="${ax-26}" y="${ay-14}" width="52" height="14" rx="5" style="fill:var(--ink);opacity:.8"/><text x="${ax}" y="${ay-18}" class="t-xs t-mid">probe</text>`;
      s+=`<g clip-path="url(#${fid})">`;
      /* liver cross-section: surface becomes nodular, right lobe narrows, caudate grows */
      const top=ay+(N?48:52),xl=ax-lerp(118,94,u),xr=ax+120,amp=u*5.5,bot=top+(N?118:132);
      const P=[];for(let i=0;i<=24;i++){const x=lerp(xl,xr,i/24);P.push([x,top+Math.pow((x-ax)/150,2)*30+Math.sin(i*1.9)*amp*(i%2?1:.6)])}
      for(let i=0;i<=8;i++){const x=lerp(xr,xl,i/8);P.push([x,bot-Math.pow((x-ax)/160,2)*26])}
      const ld=smoothPath(P);s+=`<path d="${ld}" style="fill:var(--liver-soft);stroke:var(--liver);stroke-width:1.6"/>`;
      const rr=rng(21);for(let i=0;i<70;i++){const p2=[lerp(xl,xr,rr()),lerp(top+8,bot-8,rr())];if(inPoly(p2,P))s+=`<circle cx="${f1(p2[0])}" cy="${f1(p2[1])}" r="${f1(.8+rr()*1.4)}" style="fill:var(--scar-line);opacity:${f1(.3+u*.4)}"/>`}
      const cdx=ax+18,cdy=bot-30,crx=lerp(16,27,u),cry=lerp(10,17,u);
      s+=`<ellipse cx="${cdx}" cy="${cdy}" rx="${f1(crx)}" ry="${f1(cry)}" style="fill:var(--nodule);opacity:.45;stroke:var(--liver);stroke-dasharray:3 2"/>`;
      /* ascites: dark fluid crescent */
      const asc=ramp(lp,.55,.9);if(asc>0)s+=`<path d="M${f1(xl-8)} ${f1(top+20)}Q${f1(ax-40)} ${f1(top-22)} ${f1(xr+10)} ${f1(top+14)}" style="fill:none;stroke:var(--fluid-fill);stroke-width:${f1(3+asc*9)};opacity:${f1(.75*asc)};stroke-linecap:round"/>`;
      s+=`</g>`;
      s+=`<text x="${f1(ax-60)}" y="${f1(bot-16)}" class="t-xs t-mid">right lobe</text><text x="${f1(cdx)}" y="${f1(cdy+4)}" class="t-xs t-mid">caudate</text>`;
      s+=`<text x="${f1(xr-6)}" y="${f1(top-10)}" class="t-xs t-end" style="fill:var(--dx)">${u>.35?'nodular surface':'smooth surface'}</text>`;
      if(asc>.2)s+=`<text x="${f1(xl+6)}" y="${f1(top-18)}" class="t-xs" style="fill:var(--fluid)">fluid (ascites)</text>`;
      /* post-test probability bar */
      const by=S.y+S.h-(N?60:66),bx=S.x+16,bw=S.w-32,pr=lerp(35,86,ramp(lp,.15,.6))+2*ramp(lp,.7,.95);
      s+=`<text x="${bx}" y="${by-6}" class="t-sm">Post-test probability with nodularity</text>`;
      s+=`<rect x="${bx}" y="${by}" width="${bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*pr/100)}" height="14" rx="4" style="fill:var(--dx);opacity:.8"/>`;
      s+=`<line x1="${f1(bx+bw*.35)}" x2="${f1(bx+bw*.35)}" y1="${by-2}" y2="${by+16}" style="stroke:var(--ink);stroke-dasharray:2 2"/><text x="${f1(bx+bw*.35)}" y="${by+28}" class="t-xs t-mid">before 35%</text>`;
      s+=`<text x="${f1(Math.min(bx+bw*pr/100,bx+bw)-4)}" y="${by+11}" class="t-xs t-end" style="fill:var(--on-brand);font-weight:700">${Math.round(pr)}%</text>`;
      s+=`<text x="${f1(bx+bw)}" y="${by+28}" class="t-xs t-end">${lp>.7?'+ caudate, vein flow: 88%':'nodularity: spec 95%'}</text>`;
    }else{
      /* ---- biopsy ---- */
      const lx=S.x+(N?96:92),ly=S.y+(N?62:66),ls=N?.6:.62;
      s+=liver(lx,ly,ls,{fib:4,seed:11,gb:false}).svg;
      const ins=ramp(lp,0,.25),out=ramp(lp,.25,.45),nd=ins*(1-out);
      const nx0=lx+70,ny0=ly-28,nx1=lx+18,ny1=ly+2,nxx=lerp(nx0,nx1,nd),nyy=lerp(ny0,ny1,nd);
      s+=`<line x1="${f1(nxx+50)}" y1="${f1(nyy-34)}" x2="${f1(nxx)}" y2="${f1(nyy)}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/><rect x="${f1(nxx+44)}" y="${f1(nyy-44)}" width="18" height="10" rx="2" transform="rotate(-34 ${f1(nxx+53)} ${f1(nyy-39)})" style="fill:var(--dx)"/>`;
      s+=`<text x="${f1(nx0+40)}" y="${f1(ny0-24)}" class="t-xs t-end">needle</text>`;
      /* core sample and ruler */
      const ry=S.y+(N?122:132),rx=S.x+16,mm=N?6.6:5.4,cl=ramp(lp,.35,.55);
      s+=`<text x="${rx}" y="${ry-8}" class="t-sm">Core length (mm)</text>`;
      s+=`<rect x="${f1(rx+20*mm)}" y="${ry}" width="${f1(5*mm)}" height="12" style="fill:var(--good-soft);stroke:var(--good)"/><text x="${f1(rx+22.5*mm)}" y="${ry+24}" class="t-xs t-mid" style="fill:var(--good)">optimal 20–25</text>`;
      if(cl>0){s+=`<rect x="${rx}" y="${ry+2}" width="${f1(17.7*mm*cl)}" height="8" rx="3" style="fill:var(--nodule);stroke:var(--liver)"/>`;for(let k=0;k<Math.floor(17.7*cl/2.2);k++)s+=`<circle cx="${f1(rx+3+k*2.2*mm)}" cy="${ry+6}" r="2" style="fill:none;stroke:var(--scar-line)"/>`;
        s+=`<text x="${rx}" y="${ry+24}" class="t-xs">average 17.7</text>`}
      for(let m2=0;m2<=25;m2+=5)s+=`<line x1="${f1(rx+m2*mm)}" x2="${f1(rx+m2*mm)}" y1="${ry+12}" y2="${ry+16}" style="stroke:var(--muted)"/>`;
      /* 1000-dot grid: major bleeding about 6 per 1000 */
      const gy=S.y+(N?172:186),gx=S.x+16,sp=N?5.2:5,gl=ramp(lp,.45,.68),hit=[37,212,388,561,744,903];
      s+=`<text x="${gx}" y="${gy-8}" class="t-sm">1000 biopsies</text>`;
      for(let k=0;k<1000;k++){const c=k%40,r=Math.floor(k/40),on=hit.includes(k)&&gl>hit.indexOf(k)/6;s+=`<circle cx="${f1(gx+c*sp+2)}" cy="${f1(gy+r*sp+2)}" r="${on?2.3:1.25}" style="fill:${on?'var(--bad)':'var(--muted)'};opacity:${on?1:.35}"/>`}
      const tx=gx+40*sp+10,cnt=hit.filter((h,i)=>gl>i/6).length;
      if(N){s+=`<text x="${tx}" y="${gy+14}" class="t-big" style="fill:var(--bad)">≈${cnt}</text><text x="${tx}" y="${gy+30}" class="t-xs">major</text><text x="${tx}" y="${gy+42}" class="t-xs">bleeds</text><text x="${tx}" y="${gy+54}" class="t-xs">(England,</text><text x="${tx}" y="${gy+66}" class="t-xs">1998–2005)</text>`;
        s+=`<text x="${gx}" y="${gy+25*sp+18}" class="t-xs">Deaths directly due to biopsy: at most about 1 in 10,000</text>`}
      else{s+=`<text x="${tx}" y="${gy+16}" class="t-big" style="fill:var(--bad)">≈${cnt}</text><text x="${tx}" y="${gy+32}" class="t-xs">major</text><text x="${tx}" y="${gy+44}" class="t-xs">bleeds</text><text x="${tx}" y="${gy+62}" class="t-xs">England</text><text x="${tx}" y="${gy+74}" class="t-xs">1998–2005</text>`;
        s+=`<text x="${gx}" y="${gy+25*sp+16}" class="t-xs">Deaths directly due to biopsy:</text><text x="${gx}" y="${gy+25*sp+28}" class="t-xs">at most about 1 in 10,000</text>`}
      /* sampling error: two lobes, two stages */
      const sx=S.x+S.w-(N?124:118),sy=S.y+(N?64:70),se=ramp(lp,.15,.4);
      if(se>0){s+=`<g style="opacity:${f1(se)}"><text x="${sx}" y="${sy}" class="t-xs">one liver, two lobes:</text>`;
        [['right lobe','stage 4','var(--bad)'],['left lobe','stage 3','var(--warn)']].forEach(([l,v,c],k)=>{const y=sy+14+k*20;s+=`<rect x="${sx}" y="${y-8}" width="34" height="8" rx="3" style="fill:var(--nodule);stroke:var(--liver)"/><text x="${sx+40}" y="${y}" class="t-xs">${l}:</text><text x="${sx+40}" y="${y+10}" class="t-xs" style="fill:${c};font-weight:700">${v}</text>`});
        s+=`</g>`}
    }
    svg.innerHTML=s;
    setSt(p);
    $('#teRead').innerHTML=`<span>step <b>${p+1} of ${TE_STEPS.length}</b></span><span>focus <b>${st.t}</b></span>${p<3?`<span>tiles lit <b>${TE_TILES.filter(T=>T.st<=p).length} of 7</b></span>`:''}`;
    $('#teNote').innerHTML=noteHTML(st);
  }
  const stop=playWire(rg,$('#tePlay'),draw,30000,'Replay','tests');
  const setSt=stepWire($('#teSteps'),TE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- pattern sorter ---- */
  const cs=$('#teCaseSvg');let ci=0,pick=null;
  function drawCase(){const N=vb(cs,'720 120','400 200'),C=TE_CASES[ci];let s='';
    const cols=N?4:7,w=N?92:96,h=N?84:96,gx=N?4:6;
    TE_TILES.forEach((T,i)=>{const c=i%cols,r=Math.floor(i/cols),x=(N?6:8)+c*(w+gx),y=(N?6:12)+r*(h+8),d=C.d[i];
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${d?'var(--dx-soft)':'var(--panel)'};stroke:${d?'var(--dx)':'var(--line)'}"/>`;
      s+=`<text x="${f1(x+w/2)}" y="${y+20}" class="t-lbl t-mid">${T.k}</text>`;
      s+=teArrow(x+w/2,y+h/2+6,d===2?2:d,1.4,d?'var(--dx)':'var(--muted)');
      s+=`<text x="${f1(x+w/2)}" y="${y+h-10}" class="t-xs t-mid">${d===2?'strongly up':d>0?'up':d<0?'down':'not noted'}</text>`});
    cs.innerHTML=s}
  function showCase(){const C=TE_CASES[ci];
    $('#teProg').textContent=`Practice case ${ci+1} of ${TE_CASES.length}`;
    $('#teCase').innerHTML=C.txt;
    $$('[data-teans]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.teans===pick?'true':'false'));
    if(!pick)$('#teSortNote').innerHTML=`<div class="kicker">Your call</div><h4>Which pattern is this?</h4><p>Look at which tests lead. Injury enzymes far above alkaline phosphatase point one way; alkaline phosphatase far above the injury enzymes points another; low albumin, high INR or bilirubin and low platelets describe how advanced the disease is.</p><div class="pt"><b>In plain words</b>"Liver tests" mostly show whether liver cells are hurt (ALT, AST) or bile flow is blocked (alkaline phosphatase, bilirubin). They do not measure how well the liver works on their own. <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup></div>`;
    else{const ok=pick===C.a;
      $('#teSortNote').innerHTML=`<div class="kicker">Practice case ${ci+1}</div><div class="verdict ${ok?'yes':'no'}">${ok?'Yes: ':'Not quite: '}${TE_ANS[C.a]}${ok?'':` (you chose ${TE_ANS[pick].toLowerCase()})`}</div><p>${C.why}</p><div class="hook"><b>Exam hook</b>Hepatocellular = AST/ALT ≫ ALP. Cholestatic = ALP ≫ AST/ALT. Albumin, INR and bilirubin feed the severity scores.</div>`}
    drawCase()}
  $$('[data-teans]').forEach(b=>b.addEventListener('click',()=>{pick=b.dataset.teans;showCase()}));
  $('#teNext').addEventListener('click',()=>{ci=(ci+1)%TE_CASES.length;pick=null;showCase()});
  $('#tePrev').addEventListener('click',()=>{ci=(ci-1+TE_CASES.length)%TE_CASES.length;pick=null;showCase()});
  showCase();
  const prevR=redraws.tests;redraws.tests=()=>{prevR&&prevR();drawCase()};
};
/* =============== 3.2 Measuring scarring without a biopsy =============== */
const NI_STEPS=[
 {from:0,at:.15,k:'Step 1 · a blood-test score',t:'FIB-4: four numbers',
  txt:`FIB-4 as published is age [years] × AST [U/L] ÷ (platelets [10⁹/L] × √ALT [U/L]). It was developed in 832 people with HIV/HCV coinfection, with an AUROC of 0.765 for Ishak stages 0–3 versus 4–6. AASLD 2023 keeps it as the first-line test for general practitioners and endocrinologists because it is simple and adds little cost, while noting it is statistically inferior to ELF and elastography. <sup class="c" data-ref="Sterling2006FIB4,Rinella2023AASLD" title="Source 381,438">381,438</sup>`,
  pt:`FIB-4 is a free score made from your age and three routine blood tests. It helps decide who needs a liver scan, but it is not a diagnosis.`,
  hook:`FIB-4 = (age × AST) ÷ (platelets × √ALT).`},
 {from:.2,at:.36,k:'Step 2 · sorting by risk',t:'Three FIB-4 bands',
  txt:`AASLD 2023 describes FIB-4 bands of low risk (&lt;1.3), intermediate (1.3–2.67) and high (&gt;2.67). These cut-offs come from Shah 2009 in 541 adults with NAFLD, where ≤1.30 gave a 90% negative and ≥2.67 an 80% positive predictive value for advanced fibrosis. Sterling's original HIV/HCV cut-offs were &lt;1.45 and &gt;3.25. Age matters: at ≥65 years specificity fell to 35%, and McPherson proposed a cut-off of 2.0 for that group. <sup class="c" data-ref="Rinella2023AASLD,Shah2009FIB4,Sterling2006FIB4,McPherson2017Age" title="Source 298,381,420,438">298,381,420,438</sup>`,
  pt:`A low score makes serious scarring unlikely. A higher score does not mean cirrhosis: it means the next test is worth doing.`,
  hook:`NAFLD/MASLD cut-offs: &lt;1.3 low, ≥2.67 high (Shah 2009). Original HIV/HCV: 1.45 and 3.25 (Sterling 2006). Age ≥65: 2.0.`},
 {from:.42,at:.58,k:'Step 3 · liver stiffness',t:'Elastography',
  txt:`In the AASLD pathway, a FIB-4 of 1.3 or more leads to a secondary assessment with vibration-controlled transient elastography (VCTE, preferred over MR elastography in primary care for cost reasons) or ELF. Across 50 studies, transient elastography had a mean AUROC of 0.94 for cirrhosis. Baveno VII: LSM &lt;10 kPa, without other signs, rules out compensated advanced chronic liver disease (cACLD); 10–15 kPa is suggestive and &gt;15 kPa highly suggestive. <sup class="c" data-ref="Rinella2023AASLD,FriedrichRust2008TE,deFranchis2022BavenoVII" title="Source 97,166,381">97,166,381</sup>`,
  pt:`A FibroScan is like an ultrasound. A gentle pulse measures how stiff the liver is, and stiffer usually means more scarring.`,
  hook:`Baveno VII "rule of five": 10, 15, 20 and 25 kPa mark progressively higher risk of decompensation and liver-related death, whatever the cause.`},
 {from:.64,at:.8,k:'Step 4 · next steps',t:'Where people land',
  txt:`AASLD: refer to specialty care if risk stays intermediate or high; people with 2 or more metabolic risk factors, especially prediabetes or type 2 diabetes, should repeat FIB-4 every 1–2 years. Baveno VII rules out clinically significant portal hypertension (CSPH, HVPG ≥10 mmHg) with LSM ≤15 kPa plus platelets ≥150 ×10⁹/L, and rules it in with LSM ≥25 kPa. Even in sequence, FIB-4 then VCTE left 33% needing a biopsy in one meta-analysis. <sup class="c" data-ref="Rinella2023AASLD,deFranchis2022BavenoVII,Mozes2022IPD" title="Source 97,316,381">97,316,381</sup>`,
  pt:`Most people with a low score stay with their usual doctor and recheck in a year or two. A higher result means a referral to a liver specialist, not a diagnosis.`,
  hook:`CSPH ruled out: LSM ≤15 kPa + platelets ≥150 ×10⁹/L. Ruled in: LSM ≥25 kPa.`},
 {from:.84,at:.95,k:'Step 5 · pitfalls',t:'When a reading misleads',
  txt:`In 13,369 examinations, liver stiffness measurement failed in 3.1% and was unreliable in a further 15.8%, so nearly 1 in 5 results could not be interpreted; BMI &gt;30 (odds ratio 7.5 for failure) and operators with fewer than 500 exams were the main causes. Baveno VII says an index LSM ≥10 kPa should be repeated while fasting, because TE can give false-positive results. FIB-4 did poorly at age ≤35 (AUROC 0.60). <sup class="c" data-ref="Castera2010Pitfalls,deFranchis2022BavenoVII,McPherson2017Age" title="Source 64,97,298">64,97,298</sup>`,
  pt:`Scan results can be wrong if you have just eaten or if the scan is hard to do, so a high result is often repeated while fasting.`,
  hook:`FIB-4 is unreliable at age ≤35 (AUROC 0.60) and loses specificity at ≥65.`}
];
/* 24 schematic people: FIB-4 band (0 low, 1 intermediate, 2 high), and after VCTE whether they go back to primary care */
const NI_DOTS=[...Array(24)].map((_,i)=>{const b=i<12?0:i<19?1:2,back=b===0||(i>=12&&i<=16)||i===19;
  const kpa=b===0?0:back?[6.2,7.1,5.4,6.8,7.6,6.5][i===19?5:i-12]:{17:12.5,18:14,20:17.5,21:22,22:27,23:13}[i];return {b,back,kpa}});
const NI_CAP=[
 ['Derivation: 832 people with HIV/HCV coinfection','AUROC 0.765 for Ishak 0–3 versus 4–6','Biopsy avoidable in 71% of the validation group'],
 ['AASLD 2023: low <1.3 · intermediate 1.3–2.67 · high >2.67','Shah 2009: ≤1.30 gave 90% NPV, ≥2.67 an 80% PPV','Sterling 2006 original cut-offs: <1.45 and >3.25'],
 ['Baveno VII: <10 kPa rules out cACLD (no other signs)','10–15 kPa suggestive · >15 kPa highly suggestive','Rule of five: 10, 15, 20, 25 kPa = rising risk'],
 ['CSPH ruled out: ≤15 kPa and platelets ≥150 ×10⁹/L','CSPH ruled in: ≥25 kPa (viral, alcohol, non-obese MASH)','Refer if risk stays intermediate or high (AASLD 2023)'],
 ['Failed 3.1% + unreliable 15.8% of 13,369 exams','BMI >30: odds ratio 7.5 for a failed measurement','Baveno VII: repeat a reading ≥10 kPa while fasting']
];
const NI_BCOL=['var(--good)','var(--warn)','var(--bad)'];
const NI_R5=[{to:10,col:'var(--good)'},{to:15,col:'var(--bile)'},{to:20,col:'var(--warn)'},{to:25,col:'var(--artery)'},{to:30,col:'var(--bad)'}];
const niFib4=(a,ast,alt,plt)=>a*ast/(plt*Math.sqrt(alt));
inits.noninvasive=()=>{
  const svg=$('#niSvg'),rg=$('#niT');
  function draw(t){
    const N=vb(svg,'720 380','400 700'),p=phaseOf(NI_STEPS,t),st=NI_STEPS[p],nx=p<4?NI_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx);
    const L=N?{A:{x:12,y:8,w:376,h:140},B:[{x:12,y:158,w:120,h:86},{x:140,y:158,w:120,h:86},{x:268,y:158,w:120,h:86}],C:{x:12,y:254,w:376,h:198},D:[{x:12,y:462,w:184,h:118},{x:204,y:462,w:184,h:118}],cap:{x:12,y:590,w:376,h:102}}
             :{A:{x:12,y:14,w:176,h:300},B:[{x:204,y:214,w:150,h:100},{x:204,y:114,w:150,h:92},{x:204,y:14,w:150,h:92}],C:{x:370,y:14,w:180,h:300},D:[{x:566,y:14,w:142,h:146},{x:566,y:168,w:142,h:146}],cap:{x:12,y:322,w:696,h:52}};
    let s=`<defs>${marker('niAr','var(--muted)')}</defs>`;
    const box=(b,on,col)=>`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="12" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${col||(on?'var(--dx)':'var(--line)')};stroke-width:${on?1.6:1}"/>`;
    /* ---- A: the formula ---- */
    const A=L.A;s+=box(A,p===0);
    s+=`<text x="${A.x+12}" y="${A.y+20}" class="t-lbl" style="fill:var(--dx)">1 · FIB-4</text>`;
    const fx=N?A.x+96:A.x+A.w/2,fy=N?A.y+48:A.y+56;
    s+=`<text x="${fx}" y="${fy}" class="t-big t-mid">age × AST</text><line x1="${fx-74}" x2="${fx+74}" y1="${fy+9}" y2="${fy+9}" style="stroke:var(--ink);stroke-width:1.6"/><text x="${fx}" y="${fy+30}" class="t-big t-mid">platelets × √ALT</text>`;
    /* the example fills in during step 1 */
    const e1=ramp(t,.02,.06),e2=ramp(t,.05,.09),e3=ramp(t,.08,.12),e4=ramp(t,.11,.15),e5=ramp(t,.14,.18);
    const ex=N?A.x+290:A.x+A.w/2,ey=N?A.y+26:A.y+118;
    s+=`<text x="${ex}" y="${ey}" class="t-xs t-mid">example: age 58, AST 45,</text><text x="${ex}" y="${ey+12}" class="t-xs t-mid">ALT 38, platelets 180</text>`;
    const num=`<tspan style="opacity:${f1(e1)}">58</tspan><tspan style="opacity:${f1(e2)}"> × 45</tspan>`,den=`<tspan style="opacity:${f1(e3)}">180</tspan><tspan style="opacity:${f1(e4)}"> × √38</tspan>`;
    s+=`<text x="${ex}" y="${ey+34}" class="t-lbl t-mid">${num}</text><line x1="${ex-46}" x2="${ex+46}" y1="${ey+40}" y2="${ey+40}" style="stroke:var(--ink);stroke-width:1.2;opacity:${f1(e1)}"/><text x="${ex}" y="${ey+56}" class="t-lbl t-mid">${den}</text>`;
    const val=niFib4(58,45,38,180);
    s+=`<text x="${ex}" y="${ey+(N?78:86)}" class="t-big t-mid" style="font-size:22px;fill:var(--warn);opacity:${f1(e5)}">= ${(val*e5).toFixed(2)}</text>`;
    if(!N)s+=`<text x="${ex}" y="${ey+104}" class="t-xs t-mid" style="opacity:${f1(e5)}">intermediate band</text>`;
    /* ---- B: three bands ---- */
    const BL=[['Low','below 1.3'],['Intermediate','1.3 to 2.67'],['High','above 2.67']];
    L.B.forEach((b,k)=>{const on=p===1;s+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="12" style="fill:var(--panel);stroke:${NI_BCOL[k]};stroke-width:${on?2:1.2}"/>`;
      s+=`<text x="${b.x+10}" y="${b.y+18}" class="t-lbl" style="fill:${NI_BCOL[k]}">${BL[k][0]}</text><text x="${b.x+10}" y="${b.y+31}" class="t-xs">FIB-4 ${BL[k][1]}</text>`});
    if(!N)s+=`<path d="M${A.x+A.w+2} ${A.y+150}H${L.B[0].x-2}" class="arrow" marker-end="url(#niAr)"/>`;
    /* ---- C: elastography ---- */
    const C=L.C;s+=box(C,p===2);
    s+=`<text x="${C.x+12}" y="${C.y+20}" class="t-lbl" style="fill:var(--dx)">2 · Liver stiffness</text>`;
    const half=N?C.x+194:C.x+C.w,px=N?C.x+96:C.x+C.w/2,sTop=C.y+(N?52:58),sH=N?70:64,sx0=C.x+10,sx1=(N?half:C.x+C.w)-10;
    /* current reading */
    const mv=NI_DOTS.map((d,i)=>i).filter(i=>NI_DOTS[i].b>0);
    let kv=5,cur=-1;
    if(p===2){const q=lp*mv.length,ii=Math.min(mv.length-1,Math.floor(q)),fr=q-ii;cur=mv[ii];const a=ii?NI_DOTS[mv[ii-1]].kpa:5;kv=lerp(a,NI_DOTS[cur].kpa,ease(clamp(fr*2.2)))}
    else if(p>2)kv=NI_DOTS[mv[mv.length-1]].kpa;
    const cid=uid('nicl');
    s+=`<clipPath id="${cid}"><rect x="${sx0}" y="${sTop}" width="${sx1-sx0}" height="${sH}" rx="8"/></clipPath>`;
    s+=`<rect x="${sx0}" y="${sTop}" width="${sx1-sx0}" height="${sH}" rx="8" style="fill:var(--liver-soft);stroke:var(--liver)"/>`;
    s+=`<g clip-path="url(#${cid})">`;
    const sc=ramp(kv,5,27),rr=rng(31);for(let i=0;i<Math.round(4+sc*16);i++){const x=lerp(sx0,sx1,rr()),y=lerp(sTop,sTop+sH,rr());s+=collagen(x,y,x+16+rr()*18,y+(rr()-.5)*14,{w:1.1,op:.4+sc*.4,amp:2,n:2})}
    const ph=(t*90)%1;for(let k=0;k<4;k++){const r=((ph+k/4)%1)*(sH+16),op=1-r/(sH+16);s+=`<path d="M${f1(px-r)} ${sTop}A${f1(r)} ${f1(r)} 0 0 0 ${f1(px+r)} ${sTop}" style="fill:none;stroke:var(--dx);stroke-width:2;opacity:${f1(op*(p>=2?.9:.35))}"/>`}
    s+=`</g>`;
    s+=`<rect x="${px-16}" y="${sTop-16}" width="32" height="16" rx="5" style="fill:var(--dx)"/><rect x="${px-5}" y="${sTop-30}" width="10" height="14" rx="3" style="fill:var(--dx);opacity:.7"/>`;
    s+=`<text x="${px+22}" y="${sTop-6}" class="t-xs">probe</text>`;
    s+=`<text x="${sx0+6}" y="${sTop+sH+12}" class="t-xs">liver tissue (schematic)</text>`;
    /* gauge with the rule of five */
    const gcx=N?C.x+290:C.x+C.w/2,gcy=N?C.y+136:C.y+246,gr=N?72:66;
    s+=gauge(gcx,gcy,gr,kv,30,{bands:NI_R5,ends:false})+`<text x="${gcx}" y="${gcy+(N?26:24)}" class="t-big t-mid" style="font-size:20px">${kv.toFixed(1)}<tspan class="t-xs"> kPa</tspan></text>`;
    [10,15,20,25].forEach(v=>{const a=Math.PI*(1-v/30),x=gcx+(gr+9)*Math.cos(a),y=gcy-(gr+9)*Math.sin(a);s+=`<text x="${f1(x)}" y="${f1(y+3)}" class="t-xs t-mid" style="font-weight:700">${v}</text>`});
    const kl=kv<10?'<10: rules out cACLD*':kv<=15?'10–15: suggestive':kv<25?'>15: highly suggestive':'≥25: rules in CSPH*';
    s+=`<text x="${gcx}" y="${gcy+(N?40:37)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${p>=2?kl:'rule of five (kPa)'}</text>`;
    if(N&&p>=2)s+=`<text x="${gcx}" y="${gcy+52}" class="t-xs t-mid">*see the notes</text>`;
    /* ---- D: outcomes ---- */
    const DL=[['Low risk','stay in primary care;','recheck FIB-4 in 1–2 y','with ≥2 metabolic risks'],['Specialist','referred when risk','stays intermediate','or high']];
    L.D.forEach((b,k)=>{s+=box(b,p===3,k?'var(--bad)':'var(--good)');s+=`<text x="${b.x+10}" y="${b.y+18}" class="t-lbl" style="fill:${k?'var(--bad)':'var(--good)'}">${DL[k][0]}</text>`;
      DL[k].slice(1).forEach((l,j)=>{s+=`<text x="${b.x+10}" y="${b.y+32+j*11}" class="t-xs">${l}</text>`})});
    /* ---- dots ---- */
    const cnt=[0,0,0],c2=[0],cD=[0,0];
    const slot=NI_DOTS.map((d,i)=>{const j=cnt[d.b]++,bb=L.B[d.b],cols=5,sp=N?20:22,P1=[bb.x+(N?20:22)+(j%cols)*sp,bb.y+(N?46:50)+Math.floor(j/cols)*(N?14:16)];
      const P0=N?[A.x+16+i*15,A.y+128]:[A.x+20+(i%6)*27,A.y+246+Math.floor(i/6)*16];
      let P2=null;if(d.b>0){const m=c2[0]++;P2=N?[C.x+18+m*14,C.y+186]:[C.x+16+m*13.5,C.y+150]}
      const dk=d.back?0:1,m3=cD[dk]++,db=L.D[dk],c3=N?8:6,P3=[db.x+(N?18:16)+(m3%c3)*20,db.y+(N?78:84)+Math.floor(m3/c3)*(N?14:16)];
      return {P0,P1,P2,P3}});
    const bumpY=(a,b,u,h)=>[lerp(a[0],b[0],u),lerp(a[1],b[1],u)-Math.sin(Math.PI*u)*h];
    const unrel=[2,7,13,18,21];
    NI_DOTS.forEach((d,i)=>{const S=slot[i],sg=i/24*.05,app=ramp(t,i*.005,i*.005+.03);
      const u1=ease(ramp(t,.22+sg,.3+sg)),u2=d.b?ease(ramp(t,.44+sg*1.6,.47+sg*1.6)):0,u3=ease(ramp(t,.66+sg,.74+sg));
      let P=bumpY(S.P0,S.P1,u1,24);if(d.b&&u2>0)P=bumpY(S.P1,S.P2,u2,30);
      if(u3>0)P=bumpY(d.b?S.P2:S.P1,S.P3,u3,30);
      const col=u3>.5?(d.back?'var(--good)':'var(--bad)'):u1>.5?NI_BCOL[d.b]:'var(--muted)';
      s+=`<circle cx="${f1(P[0])}" cy="${f1(P[1])}" r="${i===cur?6:4.6}" style="fill:${col};stroke:${i===cur?'var(--ink)':'var(--panel)'};stroke-width:${i===cur?2:1};opacity:${f1(app)}"/>`;
      if(p===4&&unrel.includes(i)){const fl=ramp(lp,.1+unrel.indexOf(i)*.08,.2+unrel.indexOf(i)*.08);if(fl>0)s+=`<text x="${f1(P[0])}" y="${f1(P[1]+3.5)}" class="t-xs t-mid" style="fill:var(--on-brand);font-weight:700;opacity:${f1(fl)}">?</text>`}});
    if(p===2&&cur>=0){const P=slot[cur].P2;s+=`<path d="M${f1(P[0])} ${f1(P[1]-8)}L${f1(P[0])} ${f1(sTop+sH+16)}" style="stroke:var(--ink);stroke-dasharray:2 3;opacity:.5"/>`}
    /* ---- caption strip ---- */
    const K=L.cap,lines=NI_CAP[p];s+=`<rect x="${K.x}" y="${K.y}" width="${K.w}" height="${K.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    if(p===4){const bx=K.x+12,bw=N?K.w-24:300,by=K.y+(N?12:10),f=ramp(lp,0,.5);
      s+=`<rect x="${bx}" y="${by}" width="${bw}" height="14" rx="4" style="fill:var(--good-soft);stroke:var(--line)"/>`;
      s+=`<rect x="${bx}" y="${by}" width="${f1(bw*.031*f)}" height="14" style="fill:var(--bad)"/><rect x="${f1(bx+bw*.031*f)}" y="${by}" width="${f1(bw*.158*f)}" height="14" style="fill:var(--warn);opacity:.8"/>`;
      s+=`<text x="${f1(bx+bw*.189*f+6)}" y="${by+11}" class="t-xs">${f>.5?'≈1 in 5 uninterpretable':''}</text>`;
      s+=`<text x="${bx}" y="${by+28}" class="t-xs">13,369 liver stiffness exams</text>`;
      lines.forEach((l,j)=>{s+=N?`<text x="${K.x+12}" y="${K.y+56+j*14}" class="t-xs">${l}</text>`:`<text x="${K.x+332}" y="${K.y+15+j*14}" class="t-xs">${l}</text>`})}
    else lines.forEach((l,j)=>{s+=`<text x="${K.x+12}" y="${K.y+(N?24+j*24:15+j*14)}" class="${N?'t-xs':'t-sm'}" style="${j===0?'fill:var(--ink)':''}">${l}</text>`});
    svg.innerHTML=s;
    setSt(p);
    const nb=[0,0,0];NI_DOTS.forEach(d=>nb[d.b]++);
    $('#niRead').innerHTML=`<span>step <b>${p+1} of 5</b></span><span>example FIB-4 <b>${val.toFixed(2)}</b></span><span>stiffness shown <b>${kv.toFixed(1)} kPa</b></span>`;
    $('#niNote').innerHTML=noteHTML(st)+(p>=2?`<p class="stage-cap">* "Rules out cACLD" applies without other signs of advanced disease; the ≥25 kPa rule-in for CSPH was stated for virus- or alcohol-related and non-obese NASH-related cACLD. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup></p>`:'');
  }
  const stop=playWire(rg,$('#niPlay'),draw,32000,'Replay','noninvasive');
  const setSt=stepWire($('#niSteps'),NI_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- FIB-4 teaching calculator ---- */
  const SETS={
   nafld:{cuts:[1.3,2.67],z:[['Low risk','below 1.3','var(--good)'],['Intermediate','1.3 to 2.67','var(--warn)'],['High risk','above 2.67','var(--bad)']],
     src:`AASLD 2023 (NAFLD) bands: low &lt;1.3, intermediate 1.3–2.67, high &gt;2.67. In Shah 2009 (541 adults with NAFLD), ≤1.30 gave a 90% negative predictive value and ≥2.67 an 80% positive predictive value for advanced fibrosis. <sup class="c" data-ref="Rinella2023AASLD,Shah2009FIB4" title="Source 381,420">381,420</sup>`},
   age65:{cuts:[2.0],z:[['Below 2.0','proposed cut-off','var(--good)'],['2.0 or more','proposed cut-off','var(--warn)']],
     src:`For people aged 65 or over, McPherson proposed a FIB-4 cut-off of 2.0; at that cut-off specificity for advanced fibrosis was 70% with 77% sensitivity, against the 35% specificity reported for FIB-4 at that age. <sup class="c" data-ref="McPherson2017Age" title="Source 298">298</sup>`},
   orig:{cuts:[1.45,3.25],z:[['Below 1.45','90% NPV (sens 70%)','var(--good)'],['1.45 to 3.25','in between','var(--warn)'],['Above 3.25','65% PPV (spec 97%)','var(--bad)']],
     src:`Sterling 2006 derived FIB-4 in 832 people with HIV/HCV coinfection: &lt;1.45 had a 90% negative predictive value (sensitivity 70%) and &gt;3.25 a 65% positive predictive value (specificity 97%) for Ishak stage 4–6. <sup class="c" data-ref="Sterling2006FIB4" title="Source 438">438</sup>`},
   cirr:{cuts:[1.67,3.48],z:[['Below 1.67','rules out cirrhosis','var(--good)'],['1.67 to 3.48','in between','var(--warn)'],['3.48 or more','rules in cirrhosis','var(--bad)']],
     src:`For cirrhosis specifically, AASLD 2023 lists FIB-4 ≥3.48 to rule in (90% specificity) and &lt;1.67 to rule out (90% sensitivity). <sup class="c" data-ref="Rinella2023AASLD" title="Source 381">381</sup>`}};
  const fs=$('#niFibSvg'),DEF={niAge:58,niAst:45,niAlt:38,niPlt:180};
  function calc(){const g=id=>parseFloat($('#'+id).value),age=g('niAge'),ast=g('niAst'),alt=g('niAlt'),plt=g('niPlt'),S=SETS[$('#niSet').value];
    const ok=[age,ast,alt,plt].every(v=>isFinite(v)&&v>0);
    const v=ok?niFib4(age,ast,alt,plt):NaN;
    let zi=-1;if(ok){zi=0;S.cuts.forEach((c,k)=>{if($('#niSet').value==='cirr'||$('#niSet').value==='age65'?v>=c:(k===0?v>=c:v>c))zi=k+1})}
    drawFib(v,S,zi);
    if(!ok){$('#niFibNote').innerHTML=`<div class="kicker">Teaching result</div><h4>Enter all four numbers</h4><p>Age, AST, ALT and platelets must each be a positive number.</p>`;return}
    const Z=S.z[zi],ageN=age<=35?`<p><b>Age ${age}:</b> FIB-4 performed poorly in people aged 35 or under (AUROC 0.60). <sup class="c" data-ref="McPherson2017Age" title="Source 298">298</sup></p>`:age>=65&&$('#niSet').value!=='age65'?`<p><b>Age ${age}:</b> at 65 or over FIB-4 specificity for advanced fibrosis fell to 35%; try the "Age 65 or over" cut-off above. <sup class="c" data-ref="McPherson2017Age" title="Source 298">298</sup></p>`:'';
    $('#niFibNote').innerHTML=`<div class="kicker">Teaching result (not a diagnosis)</div><div class="big-num">${v.toFixed(2)}</div>
      <div class="niform">${age} × ${ast} ÷ (${plt} × √${alt}) = ${f1(age*ast)} ÷ ${(plt*Math.sqrt(alt)).toFixed(1)}</div>
      <div class="verdict ${zi===0?'yes':zi===S.z.length-1?'no':'maybe'}">${Z[0]}: ${Z[1]}</div><p>${S.src}</p>${ageN}
      <div class="pt"><b>In plain words</b>FIB-4 is a free score made from your age and three routine blood tests. It helps decide who needs a liver scan, but it is not a diagnosis. <sup class="c" data-ref="Sterling2006FIB4,Rinella2023AASLD" title="Source 381,438">381,438</sup></div>
      <div class="hook"><b>Exam hook</b>Same person, different cut-offs: the band depends on which published set is used, which is why age- and cause-specific cut-offs are still debated.</div>`}
  function drawFib(v,S,zi){const N=vb(fs,'720 120','400 140'),x0=N?16:24,x1=N?384:696,y=N?72:62,mx=5,X=u=>lerp(x0,x1,clamp(u/mx));let s='';
    const c=[0,...S.cuts,mx];
    S.z.forEach((z,k)=>{s+=`<rect x="${f1(X(c[k]))}" y="${y-12}" width="${f1(X(c[k+1])-X(c[k]))}" height="24" style="fill:${z[2]};opacity:${k===zi?.55:.2}"/>`;
      const mid=(X(c[k])+X(c[k+1]))/2;s+=`<text x="${f1(mid)}" y="${y+4}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${k===zi?700:500}">${N&&z[0].length>11?z[0].split(' ')[0]:z[0]}</text>`});
    S.cuts.forEach(cc=>{s+=`<line x1="${f1(X(cc))}" x2="${f1(X(cc))}" y1="${y-16}" y2="${y+16}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(X(cc))}" y="${y+30}" class="t-xs t-mid" style="font-weight:700">${cc}</text>`});
    for(let u=0;u<=mx;u++)s+=`<text x="${f1(X(u))}" y="${y+44}" class="t-xs t-mid">${u}${u===mx?'+':''}</text>`;
    if(isFinite(v)){const xv=X(v);s+=`<path d="M${f1(xv-7)} ${y-30}L${f1(xv+7)} ${y-30}L${f1(xv)} ${y-17}Z" style="fill:var(--ink)"/><text x="${f1(clamp(xv,x0+40,x1-40))}" y="${y-36}" class="t-lbl t-mid">FIB-4 ${v.toFixed(2)}${v>mx?' (off scale)':''}</text>`}
    fs.innerHTML=s}
  ['niAge','niAst','niAlt','niPlt'].forEach(id=>$('#'+id).addEventListener('input',calc));
  $('#niSet').addEventListener('change',calc);
  $('#niReset').addEventListener('click',()=>{Object.entries(DEF).forEach(([k,v])=>$('#'+k).value=v);$('#niSet').value='nafld';calc()});
  calc();

  /* ---- kPa band explainer ---- */
  const ks=$('#niKSvg');
  function kcalc(){const v=+$('#niKpa').value,hi=$('#niKPlt').value==='hi',cause=$('#niKCause').value;$('#niKpaOut').textContent=v.toFixed(1);
    drawK(v);
    const bav=v<10?`<b>Below 10 kPa:</b> without other signs, rules out cACLD; Baveno VII gives a negligible 3-year risk (≤1%) of decompensation and liver-related death at this level.`:v<=15?`<b>10–15 kPa:</b> suggestive of cACLD.`:`<b>Above 15 kPa:</b> highly suggestive of cACLD.`;
    const tier=v<10?'below the first':v<15?'between 10 and 15, the first':v<20?'between 15 and 20, the second':v<25?'between 20 and 25, the third':'at or above 25, the highest';
    let csph;
    if(v<=15&&hi)csph=`<div class="verdict yes">CSPH ruled out: LSM ≤15 kPa with platelets ≥150 ×10⁹/L (sensitivity and NPV &gt;90%).</div>`;
    else if(v>=25&&cause!=='ob')csph=`<div class="verdict no">CSPH ruled in: LSM ≥25 kPa (specificity and PPV &gt;90%) in ${cause==='va'?'virus- or alcohol-related':'non-obese NASH-related'} cACLD.</div>`;
    else if(v>=25)csph=`<div class="verdict maybe">≥25 kPa, but Baveno VII stated this rule-in for virus- or alcohol-related and non-obese NASH-related cACLD, not for people with obesity.</div>`;
    else csph=`<div class="verdict maybe">Neither Baveno VII rule for CSPH applies here${v<=15&&!hi?' (the rule-out needs platelets ≥150 ×10⁹/L too)':''}.</div>`;
    const aas=v<8?'below 8 kPa rules out advanced fibrosis':v<=12?'8–12 kPa may indicate fibrotic NASH':v<20?'above 12 kPa makes advanced fibrosis likely, though the PPV is low (0.34–0.71)':'20 kPa or more rules in cirrhosis';
    $('#niKNote').innerHTML=`<div class="kicker">Teaching result (not a diagnosis)</div><div class="big-num">${v.toFixed(1)} <span style="font-size:18px">kPa</span></div>
      <p>${bav} <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup></p>${csph}
      <p><b>Rule of five:</b> this reading is ${tier} threshold (10, 15, 20, 25 kPa), which Baveno VII uses to mark progressively higher relative risks of decompensation and liver-related death. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup></p>
      <p><b>AASLD 2023, fatty liver:</b> ${aas}.${cause==='va'?' These bands were written for NAFLD/MASLD; for alcohol-related disease a cut-off of about 12.5 kPa was suggested, with caution. <sup class="c" data-ref="Rinella2023AASLD,Pavlov2016ALD" title="Source 350,381">350,381</sup>':' <sup class="c" data-ref="Rinella2023AASLD" title="Source 381">381</sup>'}</p>
      ${v>=10?`<div class="hook"><b>Exam hook</b>Baveno VII: an index LSM ≥10 kPa should be repeated while fasting, because transient elastography can give false-positive results. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup></div>`:`<div class="pt"><b>In plain words</b>A FibroScan is like an ultrasound. A gentle pulse measures how stiff the liver is, and stiffer usually means more scarring. <sup class="c" data-ref="FriedrichRust2008TE,deFranchis2022BavenoVII" title="Source 97,166">97,166</sup></div>`}`}
  function drawK(v){const N=vb(ks,'720 150','400 170'),x0=N?14:24,x1=N?386:696,X=u=>lerp(x0,x1,(clamp(u,2,40)-2)/38);let s='';
    const r1=N?34:30,r2=N?96:88;
    s+=`<text x="${x0}" y="${r1-14}" class="t-sm" style="fill:var(--ink)">Baveno VII (any cause)</text>`;
    [[2,10,'var(--good)','<10'],[10,15,'var(--bile)','10–15'],[15,20,'var(--warn)','15–20'],[20,25,'var(--artery)','20–25'],[25,40,'var(--bad)','≥25']].forEach(([a,b,c,l])=>{const on=v>=a&&(v<b||b===40);s+=`<rect x="${f1(X(a))}" y="${r1-6}" width="${f1(X(b)-X(a))}" height="22" style="fill:${c};opacity:${on?.6:.22}"/><text x="${f1((X(a)+X(b))/2)}" y="${r1+9}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${l}</text>`});
    s+=`<text x="${x0}" y="${r2-14}" class="t-sm" style="fill:var(--ink)">AASLD 2023 (fatty liver)</text>`;
    [[2,8,'var(--good)','<8'],[8,12,'var(--warn)','8–12'],[12,20,'var(--artery)','>12'],[20,40,'var(--bad)','≥20: cirrhosis']].forEach(([a,b,c,l])=>{const on=v>=a&&(v<b||b===40);s+=`<rect x="${f1(X(a))}" y="${r2-6}" width="${f1(X(b)-X(a))}" height="22" style="fill:${c};opacity:${on?.6:.22}"/><text x="${f1((X(a)+X(b))/2)}" y="${r2+9}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${l}</text>`});
    [2,10,20,30,40].forEach(u=>s+=`<text x="${f1(X(u))}" y="${r2+32}" class="t-xs t-mid">${u}</text>`);
    s+=`<text x="${x1}" y="${r2+46}" class="t-xs t-end">kPa (transient elastography)</text>`;
    const xv=X(v);s+=`<line x1="${f1(xv)}" x2="${f1(xv)}" y1="${r1-10}" y2="${r2+20}" style="stroke:var(--ink);stroke-width:2"/><circle cx="${f1(xv)}" cy="${r1-10}" r="4" style="fill:var(--ink)"/>`;
    ks.innerHTML=s}
  $('#niKpa').addEventListener('input',kcalc);$('#niKPlt').addEventListener('change',kcalc);$('#niKCause').addEventListener('change',kcalc);
  kcalc();
  const prevR=redraws.noninvasive;redraws.noninvasive=()=>{prevR&&prevR();calc();kcalc()};
};
/* =============== 3.3 Child–Pugh & MELD scores =============== */
/* published formulas (Kim 2008 for MELD and its MELD-Na; Kim 2021 for the OPTN MELD-Na and MELD 3.0) */
function scMeldRaw(b,c,i,rrt){b=Math.max(1,b);i=Math.max(1,i);c=Math.max(1,c);if(rrt||c>4)c=4;return 11.2*Math.log(i)+9.57*Math.log(c)+3.78*Math.log(b)+6.43}
const scMeld=(b,c,i,rrt)=>clamp(Math.round(scMeldRaw(b,c,i,rrt)),6,40);
function scNaOptn(m,na){const n=clamp(na,125,137);return m>11?m+1.32*(137-n)-.033*m*(137-n):m}
function scNaKim(m,na){const n=clamp(na,125,140);return m-n-.025*m*(140-n)+140}
function scMeld3(b,c,i,na,alb,fem){b=Math.max(1,b);i=Math.max(1,i);c=clamp(Math.max(1,c),1,3);const n=clamp(na,125,137),a=clamp(alb,1.5,3.5),lb=Math.log(b),lc=Math.log(c);
  return (fem?1.33:0)+4.56*lb+.82*(137-n)-.24*(137-n)*lb+9.09*Math.log(i)+11.14*lc+1.85*(3.5-a)-1.83*(3.5-a)*lc+6}
const SC_ITEMS=[['Bilirubin','lab'],['Albumin','lab'],['INR (prothrombin time)','lab'],['Ascites','bedside'],['Encephalopathy','bedside']];
const SC_EX=[2,1,2,1,1];
const SC_CLS=[{c:'A',r:'5–6',lo:5,hi:6,col:'var(--good)'},{c:'B',r:'7–9',lo:7,hi:9,col:'var(--warn)'},{c:'C',r:'10–15',lo:10,hi:15,col:'var(--bad)'}];
const scCls=v=>v<=6?0:v<=9?1:2;
const SC_STEPS=[
 {from:0,at:.13,k:'Child–Pugh · 1964, 1973',t:'Five items, 1–3 points each',
  txt:`Child and Turcotte's classification, made to estimate surgical risk in portosystemic shunt surgery, used ascites, encephalopathy, nutritional status, bilirubin and albumin. Pugh and colleagues replaced nutritional status with prothrombin time/INR. Each of the five items scores 1 to 3 points. Two of them, ascites and encephalopathy, are judged at the bedside and so are partly subjective. <sup class="c" data-ref="Peng2016ChildMELD,Pugh1973,Costa2023ChildB,Johnson2015ALBI" title="Source 86,218,351,367">86,218,351,367</sup>`,
  pt:`Child–Pugh adds up points for three blood tests and two things a clinician sees: fluid in the belly and confusion. More points means the liver is struggling more.`,
  hook:`Child–Pugh = bilirubin, albumin, INR, ascites and encephalopathy: three lab values and two bedside findings.`},
 {from:.22,at:.33,k:'Child–Pugh · totals',t:'Classes A, B and C',
  txt:`The total gives Child–Pugh A (5–6 points), B (7–9) or C (10–15). In 177 people with cirrhosis, the three classes captured less survival variance than the continuous 5–15 score, which in turn captured less than the components in their original units. Child–Pugh class A is the usual requirement for surgical resection of liver cancer and for atezolizumab–bevacizumab. <sup class="c" data-ref="Costa2023ChildB,InfanteRivard1987,Singal2023AASLDHCC,Reig2022BCLC" title="Source 86,207,374,429">86,207,374,429</sup>`,
  pt:`Class A is the mildest and class C the most severe. The class is a rough grouping; two people in the same class can be quite different.`,
  hook:`Child–Pugh A 5–6, B 7–9, C 10–15.`},
 {from:.44,at:.57,k:'MELD · 2000, 2001',t:'MELD: three labs',
  txt:`MELD began as the Mayo TIPS model: in 231 elective TIPS patients, bilirubin, creatinine, INR and cause of liver disease predicted survival. Kamath 2001 validated it in 4 cohorts (c-statistics 0.78–0.87 for 3-month death). As used for US allocation: 11.2 × ln(INR) + 9.57 × ln(creatinine) + 3.78 × ln(bilirubin) + 6.43, each value floored at 1, creatinine capped at 4 (and set to 4 on renal replacement therapy), rounded to an integer from 6 to 40. <sup class="c" data-ref="Malinchoc2000,Kamath2001MELD,Kim2008MELDNa" title="Source 221,233,286">221,233,286</sup>`,
  pt:`MELD turns three blood tests (bilirubin, creatinine for the kidneys, and INR for clotting) into one number. A higher number means a sicker liver, on average.`,
  hook:`MELD = bilirubin, creatinine and INR. It was first built to predict survival after TIPS.`},
 {from:.66,at:.77,k:'MELD-Na · 2008',t:'Adding sodium',
  txt:`In 6769 US registrants in 2005, death risk rose 1.21-fold per MELD point and 1.05-fold per 1 mmol/L fall in sodium (125–140), and sodium mattered more when MELD was low. Kim 2008: MELD − Na − [0.025 × MELD × (140 − Na)] + 140, Na bounded 125–140; people with hyponatraemia could gain up to 13 points. The OPTN version quoted in Kim 2021: MELD + 1.32 × (137 − Na) − [0.033 × MELD × (137 − Na)], Na bounded 125–137, applied only when MELD &gt;11. <sup class="c" data-ref="Kim2008MELDNa,Kim2021MELD3" title="Source 233,236">233,236</sup>`,
  pt:`A low blood sodium level is a sign of more advanced liver disease, so MELD-Na adds points when sodium is low.`,
  hook:`Low sodium raises MELD-Na; the effect is biggest when MELD itself is low.`},
 {from:.84,at:.95,k:'MELD 3.0 · 2021',t:'Sex and albumin',
  txt:`MELD 3.0 adds female sex and serum albumin, interactions for bilirubin × sodium and albumin × creatinine, and caps creatinine at 3.0 mg/dL. It discriminated slightly better than MELD-Na (C 0.869 vs 0.862) and reclassified a net 8.8% of decedents to a higher tier, particularly women. Kim 2021's example woman (bilirubin 12, Na 128, INR 2.2, creatinine 2.8, albumin 2.0) scores MELD 35, MELD-Na 36 and MELD 3.0 39, with predicted 30-day mortality 41.8%, a population statistic. OPTN adopted MELD 3.0 in July 2023. <sup class="c" data-ref="Kim2021MELD3,Akabane2025MELD3" title="Source 10,236">10,236</sup>`,
  pt:`Older MELD versions tended to under-score women. MELD 3.0 adds sex and albumin to make the score fairer and slightly more accurate.`,
  hook:`MELD 3.0 adds sex and albumin to MELD-Na. US allocation adopted it in July 2023.`}
];
inits.scores=()=>{
  const svg=$('#scSvg'),rg=$('#scT');
  function draw(t){
    const N=vb(svg,'720 380','400 700'),p=phaseOf(SC_STEPS,t),st=SC_STEPS[p],nx=p<4?SC_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx);
    let s='';
    /* ---------- Child–Pugh card ---------- */
    const CP=N?{x:12,y:8,w:376,h:302}:{x:12,y:14,w:340,h:352},cpOn=p<2;
    s+=`<rect x="${CP.x}" y="${CP.y}" width="${CP.w}" height="${CP.h}" rx="12" style="fill:${cpOn?'var(--dx-soft)':'var(--panel)'};stroke:${cpOn?'var(--dx)':'var(--line)'};stroke-width:${cpOn?1.6:1}"/>`;
    s+=`<text x="${CP.x+14}" y="${CP.y+24}" class="t-lbl" style="fill:var(--dx)">Child–Pugh</text><text x="${CP.x+CP.w-14}" y="${CP.y+24}" class="t-xs t-end">points per item</text>`;
    /* points per item */
    let pts;
    if(p===0)pts=SC_EX.map((v,k)=>ramp(lp,k*.17,k*.17+.12)>0?v:0);
    else if(p===1){const tot=Math.round(lerp(5,15,ease(ramp(lp,.05,.9))));pts=[1,1,1,1,1];for(let j=0;j<tot-5;j++)pts[[0,2,3,1,4][j%5]]++}
    else pts=SC_EX.slice();
    const rh=N?34:40,ry0=CP.y+44,px0=CP.x+(N?210:178);
    SC_ITEMS.forEach(([n,kind],k)=>{const y=ry0+k*rh,v=pts[k],on=v>0;
      s+=`<text x="${CP.x+14}" y="${y+16}" class="t-lbl" style="opacity:${on?1:.45}">${n}</text><text x="${CP.x+14}" y="${y+28}" class="t-xs" style="fill:${kind==='bedside'?'var(--warn)':'var(--muted)'}">${kind==='bedside'?'judged at the bedside':'blood test'}</text>`;
      for(let q=1;q<=3;q++){const cx=px0+(q-1)*(N?50:46),fill=v>=q;
        s+=`<rect x="${cx}" y="${y+2}" width="${N?42:38}" height="22" rx="6" style="fill:${fill?SC_CLS[Math.min(2,v-1)].col:'var(--panel)'};stroke:${fill?SC_CLS[Math.min(2,v-1)].col:'var(--line)'};opacity:${fill?.85:1}"/><text x="${cx+(N?21:19)}" y="${y+17}" class="t-sm t-mid" style="fill:${fill?'var(--on-brand)':'var(--muted)'};font-weight:700">${q}</text>`}});
    const tot=pts.reduce((a,b)=>a+b,0),filled=pts.every(v=>v>0);
    /* total ruler 5..15 */
    const ty=ry0+5*rh+(N?30:36),tx0=CP.x+16,tx1=CP.x+CP.w-16,TX=v=>lerp(tx0,tx1,(v-4.5)/11);
    SC_CLS.forEach(C=>{const on=filled&&scCls(tot)===SC_CLS.indexOf(C);s+=`<rect x="${f1(TX(C.lo-.5))}" y="${ty}" width="${f1(TX(C.hi+.5)-TX(C.lo-.5))}" height="22" style="fill:${C.col};opacity:${on?.75:.22}"/><text x="${f1((TX(C.lo-.5)+TX(C.hi+.5))/2)}" y="${ty+15}" class="t-sm t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700">${C.c} ${C.r}</text>`});
    for(let v=5;v<=15;v++)s+=`<text x="${f1(TX(v))}" y="${ty+36}" class="t-xs t-mid">${v}</text>`;
    if(tot>0){const xv=TX(Math.max(5,tot));s+=`<path d="M${f1(xv-7)} ${ty-12}L${f1(xv+7)} ${ty-12}L${f1(xv)} ${ty-2}Z" style="fill:var(--ink)"/>`}
    const big=filled?`Total ${tot} · class ${SC_CLS[scCls(tot)].c}`:`Total so far ${tot}`;
    s+=`<text x="${CP.x+14}" y="${ty-14}" class="t-big">${big}</text>`;
    if(!N)s+=`<text x="${CP.x+14}" y="${CP.y+CP.h-12}" class="t-xs">thresholds for 2 and 3 points not shown (unverified)</text>`;
    else s+=`<text x="${CP.x+14}" y="${CP.y+CP.h-6}" class="t-xs">thresholds for 2 and 3 points not shown (unverified)</text>`;
    /* ---------- MELD panel ---------- */
    const M=N?{x:12,y:318,w:376,h:374}:{x:362,y:14,w:346,h:352},mOn=p>=2;
    s+=`<rect x="${M.x}" y="${M.y}" width="${M.w}" height="${M.h}" rx="12" style="fill:${mOn?'var(--dx-soft)':'var(--panel)'};stroke:${mOn?'var(--dx)':'var(--line)'};stroke-width:${mOn?1.6:1}"/>`;
    const title=p<=2?'MELD':p===3?'MELD-Na':'MELD 3.0';
    s+=`<text x="${M.x+14}" y="${M.y+24}" class="t-lbl" style="fill:var(--dx)">${title}</text>`;
    /* lab values over time */
    const u2=p<2?0:p===2?ease(ramp(lp,.05,.85)):1;
    let bili=Math.exp(lerp(0,Math.log(6),u2)),cr=lerp(1,2.2,u2),inr=lerp(1,2,u2),na=p<3?140:p===3?lerp(140,125,ease(ramp(lp,.05,.8))):128,alb=3.5,fem=false;
    if(p===4){bili=12;cr=2.8;inr=2.2;na=128;alb=2.0;fem=true}
    const labs=[['Bili',bili,'mg/dL','var(--bile)'],['Creat',cr,'mg/dL','var(--kidney)'],['INR',inr,'','var(--dx)']];
    if(p>=3)labs.push(['Na',na,'mmol/L','var(--fluid)']);
    if(p===4)labs.push(['Alb',alb,'g/dL','var(--brand)'],['Sex','female','','var(--nh3)']);
    const lx=M.x+12,ly0=M.y+40,lh=labs.length>4?(N?28:21):(N?30:26),lw=N?160:128;
    labs.forEach(([n,v,u,c],k)=>{const y=ly0+k*lh;
      s+=`<rect x="${lx}" y="${y}" width="${lw}" height="${lh-5}" rx="7" style="fill:var(--panel);stroke:${c}"/><circle cx="${lx+10}" cy="${f1(y+(lh-5)/2)}" r="4" style="fill:${c}"/>`;
      s+=`<text x="${lx+20}" y="${f1(y+(lh-5)/2+4)}" class="t-xs" style="fill:var(--ink)">${n}</text><text x="${lx+lw-8}" y="${f1(y+(lh-5)/2+4)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">${typeof v==='number'?(n==='Na'?Math.round(v):v.toFixed(1)):v}${u?' '+u:''}</text>`});
    /* formula box */
    const fx=lx+lw+(N?12:10),fw=M.x+M.w-12-fx,fy=ly0,fh=p===4?(N?164:150):(N?150:132);
    s+=`<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="8" style="fill:var(--field);stroke:var(--line)"/>`;
    const FL=p<=2?['MELD =','11.2 × ln(INR)','+ 9.57 × ln(creatinine)','+ 3.78 × ln(bilirubin)','+ 6.43','floor 1 · creat. cap 4 · 6–40']
           :p===3?['MELD-Na (OPTN) =','MELD + 1.32 × (137 − Na)','− 0.033 × MELD × (137 − Na)','Na bounded 125–137','only when MELD > 11','']
           :['MELD 3.0 =','1.33 if female','+ 4.56 ln(bili)','+ 0.82 (137−Na)','− 0.24 (137−Na) ln(bili)','+ 9.09 ln(INR)','+ 11.14 ln(cr)','+ 1.85 (3.5−alb)','− 1.83 (3.5−alb) ln(cr)','+ 6'];
    FL.forEach((l,k)=>{s+=`<text x="${fx+8}" y="${fy+16+k*(p===4?(N?15.6:13.6):(N?19:16.5))}" class="t-xs" style="${k===0?'fill:var(--dx);font-weight:700':'fill:var(--ink)'}">${l}</text>`});
    /* particles from the labs into the formula */
    if(p>=2){const ph=(t*50)%1;labs.forEach(([n,v,u,c],k)=>{const y=ly0+k*lh+(lh-5)/2;for(let j=0;j<2;j++){const q=(ph+j/2+k*.17)%1,x=lerp(lx+lw,fx,q),yy=lerp(y,fy+fh/2,q);s+=`<circle cx="${f1(x)}" cy="${f1(yy)}" r="2.4" style="fill:${c};opacity:${f1(.9*bump(q,0,1))}"/>`}})}
    /* score ruler 6..40 */
    const rx0=M.x+16,rx1=M.x+M.w-16,RX=v=>lerp(rx0,rx1,(clamp(v,6,44)-6)/38),rY=fy+fh+(N?58:44);
    const mRaw=scMeldRaw(bili,cr,inr,false),mR=scMeld(bili,cr,inr,false);
    if(p<4){
      /* stacked contributions */
      const terms=[['6.43',6.43,'var(--muted)'],['bilirubin',3.78*Math.log(Math.max(1,bili)),'var(--bile)'],['creatinine',9.57*Math.log(Math.max(1,cr)),'var(--kidney)'],['INR',11.2*Math.log(Math.max(1,inr)),'var(--dx)']];
      let acc=0;const bx=v=>lerp(rx0,rx1,v/44);
      s+=`<text x="${rx0}" y="${rY-36}" class="t-sm">How each term adds up</text>`;
      terms.forEach(([n,v,c])=>{s+=`<rect x="${f1(bx(acc))}" y="${rY-28}" width="${f1(Math.max(0,bx(acc+v)-bx(acc)))}" height="14" style="fill:${c};opacity:.8"/>`;acc+=v});
      let naAdd=0;if(p===3){naAdd=scNaOptn(mR,na)-mR;if(naAdd>0)s+=`<rect x="${f1(bx(acc))}" y="${rY-28}" width="${f1(bx(acc+naAdd)-bx(acc))}" height="14" style="fill:var(--fluid);opacity:.8"/>`}
      if(p>=2)s+=`<text x="${f1(Math.min(bx(acc+naAdd)+4,rx1-60))}" y="${rY-17}" class="t-xs">${p===3&&naAdd>0?'+ sodium':''}</text>`;
      /* the 6..40 ruler with published anchors */
      s+=`<rect x="${rx0}" y="${rY}" width="${rx1-rx0}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
      [6,10,20,30,40].forEach(v=>s+=`<text x="${f1(RX(v))}" y="${rY+24}" class="t-xs t-mid">${v}</text>`);
      const sc=p===3?Math.round(scNaOptn(mR,na)):mR;
      if(p>=2){const xv=RX(sc);s+=`<rect x="${rx0}" y="${rY}" width="${f1(xv-rx0)}" height="10" rx="5" style="fill:var(--dx);opacity:.75"/><circle cx="${f1(xv)}" cy="${rY+5}" r="7" style="fill:var(--dx);stroke:var(--panel);stroke-width:2"/>`;
        s+=`<text x="${M.x+M.w-14}" y="${M.y+26}" class="t-big t-end" style="font-size:22px;fill:var(--dx)">${sc}</text>`}
      s+=`<line x1="${f1(RX(9))}" x2="${f1(RX(9))}" y1="${rY-4}" y2="${rY+14}" style="stroke:var(--good);stroke-width:2"/><line x1="${f1(RX(40))}" x2="${f1(RX(40))}" y1="${rY-4}" y2="${rY+14}" style="stroke:var(--bad);stroke-width:2"/>`;
      s+=`<text x="${rx0}" y="${rY+40}" class="t-xs" style="fill:var(--good)">MELD &lt;9: 1.9% died in 3 months</text><text x="${rx1}" y="${rY+(N?54:40)}" class="t-xs t-end" style="fill:var(--bad)">≥40: 71.3%</text>`;
      s+=`<text x="${rx0}" y="${rY+(N?70:54)}" class="t-xs">US waiting list 1999–2001 (population statistics)</text>`;
      if(p===3&&N)s+=`<text x="${rx0}" y="${rY+86}" class="t-xs">MELD ${mR} → MELD-Na ${Math.round(scNaOptn(mR,na))} at sodium ${Math.round(na)}</text>`;
      if(p===3&&!N)s+=`<text x="${rx0}" y="${rY+68}" class="t-xs">MELD ${mR} → MELD-Na ${Math.round(scNaOptn(mR,na))} at sodium ${Math.round(na)}</text>`;
    }else{
      /* the published example: three scores */
      const vals=[['MELD',scMeld(12,2.8,2.2,false)],['MELD-Na',Math.round(scNaOptn(scMeld(12,2.8,2.2,false),128))],['MELD 3.0',Math.round(scMeld3(12,2.8,2.2,128,2.0,true))]];
      const by=fy+fh+(N?28:18);
      s+=`<text x="${rx0}" y="${by}" class="t-sm">Kim 2021 example woman</text>`;
      vals.forEach(([n,v],k)=>{const g=ease(ramp(lp,k*.18,k*.18+.3)),y=by+10+k*(N?30:26);
        s+=`<text x="${rx0}" y="${y+13}" class="t-xs" style="fill:var(--ink)">${n}</text><rect x="${rx0+64}" y="${y}" width="${f1((rx1-rx0-64)*v/44*g)}" height="18" rx="4" style="fill:${k===2?'var(--dx)':'var(--muted)'};opacity:${k===2?.85:.55}"/>`;
        if(g>.6)s+=`<text x="${f1(rx0+64+(rx1-rx0-64)*v/44*g-6)}" y="${y+13}" class="t-xs t-end" style="fill:var(--on-brand);font-weight:700">${v}</text>`});
      const yy=by+10+3*(N?30:26)+8;
      s+=`<text x="${rx0}" y="${yy}" class="t-xs" style="opacity:${f1(ramp(lp,.6,.8))}">predicted 30-day mortality 41.8% (population statistic)</text>`;
      s+=`<text x="${M.x+M.w-14}" y="${M.y+26}" class="t-big t-end" style="font-size:22px;fill:var(--dx)">${vals[2][1]}</text>`;
    }
    svg.innerHTML=s;
    setSt(p);
    $('#scRead').innerHTML=p<2?`<span>Child–Pugh total <b>${tot}</b></span><span>class <b>${filled?SC_CLS[scCls(tot)].c+' ('+SC_CLS[scCls(tot)].r+')':'…'}</b></span>`
      :`<span>bilirubin <b>${bili.toFixed(1)}</b></span><span>creatinine <b>${cr.toFixed(1)}</b></span><span>INR <b>${inr.toFixed(1)}</b></span><span>MELD <b>${mR}</b></span>${p>=3?`<span>sodium <b>${Math.round(na)}</b></span>`:''}`;
    $('#scNote').innerHTML=noteHTML(st);
  }
  const stop=playWire(rg,$('#scPlay'),draw,30000,'Replay','scores');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- teaching calculator ---------- */
  const cs=$('#scCalcSvg'),IDS=['scBili','scCr','scInr','scNa','scAlb'],DEF={scBili:2.0,scCr:1.2,scInr:1.5,scNa:132,scAlb:3.0},EX={scBili:12,scCr:2.8,scInr:2.2,scNa:128,scAlb:2.0};
  function calc(){const g=id=>parseFloat($('#'+id).value),b=g('scBili'),c=g('scCr'),i=g('scInr'),na=g('scNa'),al=g('scAlb'),fem=$('#scSex').value==='f',rrt=$('#scRrt').checked;
    const ok=[b,c,i,na,al].every(v=>isFinite(v)&&v>0);
    if(!ok){$('#scRes').innerHTML='';cs.innerHTML=`<text x="20" y="40" class="t-sm">Enter all five values</text>`;$('#scCalcNote').innerHTML=`<div class="kicker">Teaching result</div><h4>Enter all five values</h4><p>Each must be a positive number in the units shown.</p>`;return}
    const m=scMeld(b,c,i,rrt),mo=Math.round(scNaOptn(m,na)),mk=Math.round(scNaKim(m,na)),m3=Math.round(scMeld3(b,c,i,na,al,fem));
    const R=[['MELD',m],['MELD-Na · OPTN',mo],['MELD-Na · Kim 2008',mk],['MELD 3.0',m3]];
    $('#scRes').innerHTML=R.map(([n,v])=>`<div><small>${n}</small><b>${v}</b></div>`).join('');
    drawC(R);
    const used=`bilirubin ${Math.max(1,b).toFixed(1)}, INR ${Math.max(1,i).toFixed(1)}, creatinine ${(rrt||c>4?4:Math.max(1,c)).toFixed(1)} mg/dL`;
    const used3=`creatinine ${clamp(Math.max(1,c),1,3).toFixed(1)}, sodium ${clamp(na,125,137)}, albumin ${clamp(al,1.5,3.5).toFixed(1)}`;
    $('#scCalcNote').innerHTML=`<div class="kicker">Teaching result (not for clinical or allocation decisions)</div><h4>MELD ${m} · MELD&#8209;Na ${mo} · MELD&nbsp;3.0 ${m3}</h4>
      <dl class="kv"><div><dt>MELD</dt><dd>Values used after the published limits: ${used}. Rounded and kept between 6 and 40. <sup class="c" data-ref="Kim2008MELDNa" title="Source 233">233</sup></dd></div>
      <div><dt>MELD-Na</dt><dd>OPTN version: sodium bounded 125–137, applied only when MELD &gt;11${m<=11?' (here MELD is 11 or less, so MELD-Na equals MELD)':''}. Kim 2008 version: sodium bounded 125–140. This tool feeds the rounded MELD into both. <sup class="c" data-ref="Kim2021MELD3,Kim2008MELDNa" title="Source 233,236">233,236</sup></dd></div>
      <div><dt>MELD 3.0</dt><dd>Values used: ${used3}${fem?', female (+1.33)':''}. The 3.0 mg/dL creatinine bound and the floor of 1.0 for bilirubin, INR and creatinine are applied; our sources do not describe a separate dialysis rule for MELD 3.0, so the dialysis box changes only MELD and MELD-Na here. Rounded to the nearest integer. <sup class="c" data-ref="Kim2021MELD3" title="Source 236">236</sup></dd></div></dl>
      <div class="pt"><b>In plain words</b>Child–Pugh and MELD scores describe how sick the liver is for groups of people. They cannot tell any one person what will happen. <sup class="c" data-ref="Kim2021MELD3,Peng2016ChildMELD" title="Source 236,351">236,351</sup></div>
      <div class="hook"><b>Exam hook</b>Published anchors: MELD &lt;9 → 1.9% and ≥40 → 71.3% 3-month mortality on the 1999–2001 US list; Biggins' early sodium score of 20, 30 and 40 matched 6%, 16% and 37% at 6 months. <sup class="c" data-ref="Wiesner2003,Biggins2006MELDNa" title="Source 40,496">40,496</sup></div>`}
  function drawC(R){const N=vb(cs,'720 170','400 200'),x0=N?10:16,lab=N?112:150,x1=N?388:704,bx0=x0+lab,X=v=>lerp(bx0,x1,(clamp(v,6,44)-6)/38);let s='';
    const rh=N?34:30,y0=N?14:12;
    R.forEach(([n,v],k)=>{const y=y0+k*rh;s+=`<text x="${x0}" y="${y+14}" class="t-xs" style="fill:var(--ink)">${n}</text><rect x="${bx0}" y="${y}" width="${x1-bx0}" height="20" rx="5" style="fill:var(--panel-2)"/><rect x="${bx0}" y="${y}" width="${f1(X(v)-bx0)}" height="20" rx="5" style="fill:${k===3?'var(--dx)':'var(--muted)'};opacity:${k===3?.85:.55}"/><text x="${f1(X(v)-6)}" y="${y+14}" class="t-xs t-end" style="fill:var(--on-brand);font-weight:700">${v>44?'>44':v}</text>`});
    const ay=y0+4*rh+4;[6,9,20,30,40].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y0-4}" y2="${ay}" style="stroke:var(--ink);stroke-dasharray:2 3;opacity:.45"/><text x="${f1(X(v))}" y="${ay+12}" class="t-xs t-mid">${v}</text>`});
    (N?['anchors: MELD 9 and 40 (3-month, 1999–2001)','MELD 3.0 of 20: 5.4% at 90 days']:['anchors: MELD 9 and 40 (3-month mortality, 1999–2001); MELD 3.0 of 20: 5.4% at 90 days']).forEach((l,k)=>s+=`<text x="${x1}" y="${ay+26+k*12}" class="t-xs t-end">${l}</text>`);
    cs.innerHTML=s}
  [...IDS,'scSex'].forEach(id=>{$('#'+id).addEventListener('input',calc);$('#'+id).addEventListener('change',calc)});
  $('#scRrt').addEventListener('change',calc);
  $('#scEx').addEventListener('click',()=>{Object.entries(EX).forEach(([k,v])=>$('#'+k).value=v);$('#scSex').value='f';$('#scRrt').checked=false;calc()});
  $('#scReset').addEventListener('click',()=>{Object.entries(DEF).forEach(([k,v])=>$('#'+k).value=v);$('#scSex').value='m';$('#scRrt').checked=false;calc()});
  calc();
  const prevR=redraws.scores;redraws.scores=()=>{prevR&&prevR();calc()};
};
/* =============== 4.1 Portal hypertension & varices =============== */
/* main scrubber: five steps from scar to treatment */
const PO_STEPS=[
 {from:0,at:.12,k:'Step 1 · inside the liver',t:'Scar raises resistance',
  txt:`Cirrhosis replaces healthy tissue with scar and regenerative nodules, and that leads to portal hypertension <sup class="c" data-ref="Gines2021Lancet" title="Source 180">180</sup>. Scar and nodules account for about 70% of the extra resistance inside the liver. The rest is functional: the lining of the vessels makes less nitric oxide, so their tone rises <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>. Baveno VII states that "HVPG values >5 mmHg indicate sinusoidal portal hypertension" <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. Watch the lower bars: resistance grows first.`,
  pt:`Scar in the liver makes it hard for blood from the gut to pass through, so pressure builds up in the portal vein <sup class="c" data-ref="Gines2021Lancet,DiazSoto2022TAG" title="Source 101,180">101,180</sup>.`,
  hook:`Portal hypertension = HVPG above 5 mmHg. About 70% of the extra resistance is structural (scar and nodules) and the rest is vascular tone <sup class="c" data-ref="deFranchis2022BavenoVII,DiazSoto2022TAG" title="Source 97,101">97,101</sup>.`},
 {from:.2,at:.32,k:'Step 2 · in the gut',t:'Gut arteries widen',
  txt:`As collateral veins form, the splanchnic (gut) arteries widen. More blood pours into the portal system, and the wider circulation becomes hyperdynamic, with "effective hypovolaemia" <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>. Now the pressure is pushed from both ends: more resistance and more inflow. An HVPG of 10 mmHg or more is clinically significant portal hypertension (CSPH), and people with CSPH are at higher risk of decompensation <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. The spleen enlarges and holds on to platelets, so a low platelet count can be a clue <sup class="c" data-ref="Afdhal2008Platelets" title="Source 9">9</sup>.`,
  pt:`Blood vessels in the gut open wider and send even more blood towards the liver, which pushes the pressure higher still <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>.`,
  hook:`CSPH = HVPG ≥10 mmHg. HVPG is the gold standard in viral- and alcohol-related cirrhosis <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`},
 {from:.4,at:.52,k:'Step 3 · detours',t:'Varices form',
  txt:`Blood finds detours back to the heart that bypass the liver. Some run along the lower oesophagus and stomach and swell into varices; others spread around the navel. Oesophageal varices are present in 50–60% of people with compensated cirrhosis and up to 85% with decompensated cirrhosis <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>. In 206 people with no or small varices, new varices appeared in 5% at 1 year and 28% at 3 years <sup class="c" data-ref="Merli2003JHepatol" title="Source 303">303</sup>. In a 1985 series, all 72 people with varices had an HVPG above 12 mmHg <sup class="c" data-ref="GarciaTsao1985Hepatology" title="Source 169">169</sup>.`,
  pt:`When the pressure is high, blood finds detours. Some of these detours are swollen veins in the food pipe or stomach, called varices, and they can burst and bleed <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>.`,
  hook:`An HVPG above 10 mmHg is the strongest predictor of developing varices and of any decompensating event <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>.`},
 {from:.6,at:.68,k:'Step 4 · an emergency',t:'A varix bleeds',
  txt:`A first variceal bleed occurs at 10–15% a year, depending on risk factors <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>. In the NIEC study of 321 people with varices, bleeding risk rose with Child class, varix size and red wale marks on the varix, and the 1-year probability ranged from 6% to 76% across risk groups <sup class="c" data-ref="NIEC1988NEJM" title="Source 335">335</sup>. Mean HVPG was 20.4 mmHg in people who had bled versus 16.0 mmHg in those who had not <sup class="c" data-ref="GarciaTsao1985Hepatology" title="Source 169">169</sup>. Each bleed carries a 6-week mortality of about 15–25% in the EASL guideline (population figures) <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`,
  pt:`Vomiting blood or passing black, tarry stools can mean a varix is bleeding. That needs an emergency department straight away.`,
  hook:`No variceal bleeding occurred below an HVPG of 12 mmHg in the classic 1985 series <sup class="c" data-ref="GarciaTsao1985Hepatology" title="Source 169">169</sup>. NIEC risk factors: Child class, varix size, red wale marks <sup class="c" data-ref="NIEC1988NEJM" title="Source 335">335</sup>.`},
 {from:.75,at:.94,k:'Step 5 · bringing it down',t:'Treatment lowers the pressure',
  txt:`In hospital, a vasoactive drug, antibiotics, endoscopy within 12 hours with band ligation and restrictive transfusion form the bleeding bundle (scrub it below) <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. Without prevention, about 60–70% rebleed, usually within 1–2 years <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>. First-line prevention of rebleeding is an NSBB (or carvedilol) plus band ligation; TIPS, a stent that shunts portal blood straight into a hepatic vein, is the treatment of choice for rebleeding despite them <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. A fall in HVPG of 20% or more, or to 12 mmHg or less, protected against rebleeding <sup class="c" data-ref="Feu1995Lancet" title="Source 157">157</sup>.`,
  pt:`A blood-pressure pill from the beta-blocker family, bands placed on the swollen veins, and sometimes a stent inside the liver all help. Only your care team can decide what fits you <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,
  hook:`Rebleeding prevention = NSBB + band ligation; the combination beat endoscopy alone (RR 0.68) or a β-blocker alone (RR 0.71) for rebleeding <sup class="c" data-ref="deFranchis2022BavenoVII,Gonzalez2008AnnIntern" title="Source 97,183">97,183</sup>.`}
];
/* bleeding bundle: hours since arrival on a square-root clock */
const PO_BH=h=>Math.sqrt(h/120);
const PO_BUN=[
 {from:0,at:.03,h:0,k:'Arrival · hour 0',t:'Resuscitate, transfuse with restraint',
  txt:`Baveno VII advises conservative red-cell transfusion, with "a target haemoglobin level between 7–8 g/dl", adjusted for heart disease, age, haemodynamics and ongoing bleeding, and intubation before endoscopy for people with altered consciousness or active vomiting of blood <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. In a trial of 921 people with severe upper GI bleeding, a restrictive threshold (Hb &lt;7 g/dl) gave 6-week survival of 95% versus 91% with a liberal one (&lt;9 g/dl), and further bleeding of 10% versus 16% <sup class="c" data-ref="Villanueva2013NEJM" title="Source 482">482</sup>.`,
  pt:`More blood is not always better: giving too much can raise the pressure in the portal vein again <sup class="c" data-ref="Villanueva2013NEJM" title="Source 482">482</sup>.`,
  hook:`Transfuse to Hb 7–8 g/dl <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. Restrictive vs liberal: 6-week survival 95% vs 91% (HR for death 0.55) <sup class="c" data-ref="Villanueva2013NEJM" title="Source 482">482</sup>.`},
 {from:PO_BH(.4),at:PO_BH(.8),h:.5,k:'As soon as possible',t:'A vasoactive drug',
  txt:`Vasoactive drugs (terlipressin, somatostatin or octreotide) "should be started as soon as possible and continued for 2–5 days", in Baveno VII's words <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. EASL 2018 lists the doses as published, for example terlipressin 2 mg every 4 h for the first 48 h, then 1 mg every 4 h <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>. In a meta-analysis of 30 trials (3111 patients) they lowered 7-day mortality (RR 0.74) and improved bleeding control (RR 1.21) <sup class="c" data-ref="Wells2012APT" title="Source 492">492</sup>. Baveno VII warns of low sodium on terlipressin and advises monitoring it <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,
  pt:`A medicine given through a drip narrows the gut's blood vessels, so less blood reaches the varices.`,
  hook:`Vasoactive drug: start early, continue 2–5 days <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>; 7-day mortality RR 0.74 <sup class="c" data-ref="Wells2012APT" title="Source 492">492</sup>.`},
 {from:PO_BH(1.2),at:PO_BH(2),h:1.5,k:'From admission',t:'Antibiotics',
  txt:`Antibiotic prophylaxis "is an integral part of therapy" and starts from admission; Baveno VII suggests ceftriaxone 1 g/24 h in advanced cirrhosis or where quinolone resistance is common <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. Bacterial infections occur in more than half of people with variceal bleeding, and are already present at admission in 20% <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>. In a Cochrane review (12 trials, 1241 patients), prophylaxis reduced mortality (RR 0.79), bacterial infections (RR 0.36) and rebleeding (RR 0.53) <sup class="c" data-ref="ChavezTapia2010Cochrane" title="Source 70">70</sup>.`,
  pt:`People with cirrhosis who bleed pick up infections easily, and infection makes bleeding worse. Antibiotics are part of the standard treatment <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`,
  hook:`Antibiotics in a variceal bleed cut mortality (RR 0.79), infection (RR 0.36) and rebleeding (RR 0.53) <sup class="c" data-ref="ChavezTapia2010Cochrane" title="Source 70">70</sup>.`},
 {from:PO_BH(4.5),at:PO_BH(6.5),h:6,k:'Within 12 hours',t:'Endoscopy and band ligation',
  txt:`Endoscopy should be done within 12 h of presentation once the person is resuscitated, or as soon as safely possible if unstable. Baveno VII advises considering erythromycin 250 mg IV 30–120 min before, if there is no QT prolongation. Band ligation is the recommended treatment for bleeding oesophageal varices; tissue adhesive (cyanoacrylate) is used for isolated gastric varices and GOV2 <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. Against sclerotherapy, ligation lowered rebleeding (OR 0.52), death (OR 0.67) and strictures (OR 0.10): 4 people treated to avert one rebleed, 10 to prevent one death <sup class="c" data-ref="Laine1995AnnIntern" title="Source 256">256</sup>.`,
  pt:`A thin camera goes down the food pipe and small rubber bands are placed around the bleeding veins to close them off.`,
  hook:`Endoscopy within 12 h; band ligation for oesophageal varices, glue for isolated gastric varices <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`},
 {from:PO_BH(20),at:PO_BH(24),h:24,k:'Within 72 h, ideally under 24 h',t:'Pre-emptive TIPS for high risk',
  txt:`Baveno VII criteria for a pre-emptive covered TIPS within 72 h (ideally &lt;24 h): Child–Pugh C &lt;14 points, Child–Pugh B &gt;7 with active bleeding at endoscopy, or HVPG &gt;20 mmHg at the time of bleeding. Encephalopathy at admission, ACLF and high bilirubin should not be treated as contraindications, but TIPS may be futile with Child–Pugh ≥14, or MELD &gt;30 with lactate &gt;12 mmol/L, unless transplant is planned soon <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. In the original trial (63 high-risk patients), 1-year survival was 86% with early TIPS versus 61% with drugs plus band ligation <sup class="c" data-ref="GarciaPagan2010NEJM" title="Source 168">168</sup>.`,
  pt:`For people at the highest risk, doctors may place a stent inside the liver early, before another bleed happens <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,
  hook:`Pre-emptive TIPS ≤72 h: Child–Pugh C &lt;14 or B &gt;7 with active bleeding. 1-year survival 86% vs 61% <sup class="c" data-ref="GarciaPagan2010NEJM,deFranchis2022BavenoVII" title="Source 97,168">97,168</sup>.`},
 {from:.93,at:1,h:120,k:'Day 5 and after',t:'Checking and preventing',
  txt:`Five-day treatment failure means uncontrolled bleeding or rebleeding within 5 days; 6-week mortality is the main outcome <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>. Up to 10–15% keep bleeding despite the bundle, and salvage covered TIPS is the rescue <sup class="c" data-ref="EASL2018Decomp,deFranchis2022BavenoVII" title="Source 97,106">97,106</sup>. In a 178-patient cohort, a MELD of 19 or more predicted 6-week mortality of 20% or more, and a MELD below 11 under 5% <sup class="c" data-ref="Reverter2014Gastro" title="Source 375">375</sup>. Afterwards Baveno VII recommends contrast CT or MRI to look for vein thrombosis and liver cancer, and NSBB plus band ligation to prevent rebleeding <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,
  pt:`After the bleed stops, the plan turns to stopping the next one: tablets, repeat banding, and regular check-ups.`,
  hook:`Without secondary prophylaxis, 60–70% rebleed, usually within 1–2 years <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`}
];
/* icon arrays: outcome in 100 people per arm, from the cited trials */
const PO_ICO={
 predesci:{a:['β-blocker',16],b:['placebo',27],ev:'decompensation or death',
  cap:`PREDESCI enrolled 201 people with compensated cirrhosis and CSPH but no high-risk varices. Decompensation or death occurred in 16% with β-blockers (propranolol or carvedilol) versus 27% with placebo (HR 0.51), mainly because fewer people developed ascites; adverse events were similar <sup class="c" data-ref="Villanueva2019PREDESCI" title="Source 483">483</sup>. Baveno VII: NSBBs "should be considered" to prevent decompensation in CSPH <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`},
 tips:{a:['early TIPS',14],b:['drugs + banding',39],ev:'death within 1 year',
  cap:`In 63 high-risk patients (Child–Pugh C, or B with active bleeding), 1-year survival was 86% with TIPS within 72 h versus 61% with drugs plus band ligation, so 14 versus 39 in 100 died; freedom from rebleeding or failure to control bleeding was 97% versus 50% <sup class="c" data-ref="GarciaPagan2010NEJM" title="Source 168">168</sup>. A Chinese trial in 129 Child–Pugh B/C patients found 1-year transplant-free survival of 86% versus 73% <sup class="c" data-ref="Lv2019LGH" title="Source 283">283</sup>.`},
 trans:{a:['restrictive (Hb <7)',5],b:['liberal (Hb <9)',9],ev:'death within 6 weeks',
  cap:`In 921 people with severe upper GI bleeding, 6-week survival was 95% with a restrictive threshold versus 91% with a liberal one (HR for death 0.55), so about 5 versus 9 in 100 died. The benefit was significant in Child–Pugh A/B but not C <sup class="c" data-ref="Villanueva2013NEJM" title="Source 482">482</sup>.`},
 carv:{a:['carvedilol',10],b:['band ligation',23],ev:'first variceal bleed',
  cap:`In 152 people with grade II or larger varices, carvedilol 12.5 mg once daily was compared with band ligation: first bleeds 10% versus 23% (relative hazard 0.41). Mortality did not differ (35% vs 37%) <sup class="c" data-ref="Tripathi2009Hepatology" title="Source 468">468</sup>.`},
 era:{a:['2000',15],b:['1980',43],ev:'in-hospital death after a bleed',
  cap:`At one French centre, in-hospital mortality after variceal bleeding fell from 42.6% in 1980 to 14.5% in 2000 (shown rounded), as vasoactive drugs, endoscopy and antibiotic prophylaxis came into use. Rebleeding fell from 47% to 13% and bacterial infection from 38% to 14% <sup class="c" data-ref="Carbonell2004Hepatology" title="Source 62">62</sup>.`}
};
inits.portal=()=>{
  /* piecewise-linear through knots [[x,y],...] */
  const poPL=(k,x)=>{if(x<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(x<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return k[k.length-1][1]};
  /* ---------- main: portal map + gauge ---------- */
  const svg=$('#poSvg'),rg=$('#poT'),note=$('#poNote'),rd=$('#poRead');
  const HV=[[0,4],[.18,10.5],[.38,14],[.56,17],[.68,21],[.75,21],[.84,16.5],[.9,16.5],[.98,8],[1,8]];
  const BANDS=[{to:5,col:'var(--good)'},{to:10,col:'var(--bile)'},{to:12,col:'var(--nodule)'},{to:25,col:'var(--bad)'}];
  const ZONES=[[0,5,'≤5','below the threshold'],[5,10,'>5','portal hypertension'],[10,12,'≥10','clinically significant (CSPH)'],[12,20,'≥12','varices can bleed'],[20,99,'>20','at a bleed: early-TIPS criterion']];
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 700');
    const h=poPL(HV,t),fib=lerp(1.2,4,ease(ramp(t,0,.18))),res=lerp(.18,1,ramp(t,0,.2)),
      inflow=lerp(.25,1,ramp(t,.2,.38))*(1-.35*ramp(t,.76,.84)),spl=ramp(t,.2,.45),
      band=ramp(t,.84,.9),vx=ramp(t,.4,.56)*(1-.55*band)*(1-.5*ramp(t,.9,1)),
      co=ramp(t,.45,.6)*(1-.6*ramp(t,.92,1)),bl=ramp(t,.6,.66)*(1-ramp(t,.78,.88)),tp=ramp(t,.9,.97);
    const M=N?{x:212,y:186,s:1.5}:{x:240,y:204,s:1.56},G=N?{x:200,y:468,r:92}:{x:584,y:156,r:102};
    const P=(a,b)=>[M.x+a*M.s,M.y+b*M.s],F=p=>f1(p[0])+' '+f1(p[1]);
    const ph=phaseOf(PO_STEPS,t);let s='';
    s+=`<text x="${N?14:20}" y="${N?16:24}" class="t-lbl">${ph+1} · ${PO_STEPS[ph].t}</text>`;
    /* widened gut arteries feeding the portal system */
    const aw=(1.2+inflow*4.5)*M.s*.7;
    s+=`<path d="M${F(P(-84,96))}Q${F(P(-62,62))} ${F(P(-36,46))}" style="fill:none;stroke:var(--artery);stroke-width:${f1(aw)};stroke-linecap:round;opacity:.8"/>`;
    s+=`<text x="${f1(P(-74,108)[0])}" y="${f1(P(-74,108)[1])}" class="t-xs t-mid" style="fill:var(--artery)">${inflow>.6?'gut arteries widen':'gut arteries'}</text>`;
    /* the portal circulation from the drawing kit */
    const pm=portalMap(M.x,M.y,M.s,{pressure:clamp((h-4)/17),flow:(t*8)%1,spleen:spl,varix:vx,collat:co,bleed:bl,tips:tp,fib,labels:true});
    s+=pm.svg;
    /* bands on the varices */
    if(band>0)for(let i=0;i<4;i++){const cx=M.x+(i%2?14:2)*M.s,cy=M.y+(-60-i*10)*M.s,r=(1.5+vx*3.8)*M.s*(1-i*.12)+1.6;
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:none;stroke:var(--ink);stroke-width:1.8;opacity:${f1(band)}"/>`}
    if(vx>.15){const p=P(22,-85);s+=`<text x="${f1(p[0])}" y="${f1(p[1])}" class="t-xs" style="fill:${bl>.2?'var(--bad)':'var(--portal)'};font-weight:700">${bl>.2?'a varix bleeds':band>.5?'varices banded':'varices'}</text>`}
    if(spl>.3){const sp=pm.at.spleen;s+=`<text x="${f1(sp[0])}" y="${f1(sp[1]+(40+spl*14)*M.s)}" class="t-xs t-mid">enlarging</text>`}
    if(co>.3){const p=P(-4,104);s+=`<text x="${f1(p[0])}" y="${f1(p[1])}" class="t-xs t-mid" style="fill:var(--portal)">navel collaterals</text>`}
    if(tp>.2){const p=P(-84,-8);s+=`<text x="${f1(p[0])}" y="${f1(p[1])}" class="t-xs t-end" style="fill:var(--accent);font-weight:700">TIPS stent</text>`}
    if(t>=.75){const p=P(N?-104:-112,34);s+=pill(p[0],p[1],26*M.s*.8,{ang:-20})+`<text x="${f1(p[0])}" y="${f1(p[1]+22)}" class="t-xs t-mid" style="fill:var(--rx)">less inflow</text>`}
    /* gauge */
    s+=gauge(G.x,G.y,G.r,h,25,{bands:BANDS,big:true,unit:'mmHg',label:'HVPG (illustrative needle)',lo:'0',hi:'25'});
    [5,10,12,20].forEach(v=>{const a=Math.PI*(1-v/25),rr=G.r+11;s+=`<text x="${f1(G.x+rr*Math.cos(a))}" y="${f1(G.y-rr*Math.sin(a)+3)}" class="t-xs t-mid" style="font-weight:700">${v}</text>`});
    /* threshold rows */
    const rx=N?16:452,ry=N?G.y+54:G.y+54,rw=N?368:262,rh=N?20:19;
    ZONES.forEach(([a,b,v,d],i)=>{const on=h>a&&h<=b||(a===0&&h<=5),y=ry+i*rh;
      if(on)s+=`<rect x="${rx-4}" y="${f1(y-12)}" width="${rw}" height="${rh-1}" rx="5" style="fill:var(--accent-soft)"/>`;
      s+=`<rect x="${rx}" y="${f1(y-8)}" width="8" height="8" rx="2" style="fill:${BANDS[Math.min(i,3)].col}"/><text x="${rx+14}" y="${f1(y)}" class="t-sm" style="font-weight:700;fill:var(--ink)">${v}</text><text x="${rx+44}" y="${f1(y)}" class="t-sm"${on?' style="fill:var(--ink);font-weight:700"':''}>${d}</text>`});
    /* resistance and inflow bars */
    const bx=rx,by=N?ry+5*rh+16:ry+5*rh+14,bw=N?250:200;
    s+=`<text x="${bx}" y="${by}" class="t-sm">${res>.9?'resistance: 70% scar · 30% tone':'resistance inside the liver'}</text>`;
    s+=`<rect x="${bx}" y="${by+5}" width="${bw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by+5}" width="${f1(bw*res*.7)}" height="10" rx="3" style="fill:var(--scar-line)"/><rect x="${f1(bx+bw*res*.7)}" y="${by+5}" width="${f1(bw*res*.3)}" height="10" style="fill:var(--portal);opacity:.6"/>`;
        s+=`<text x="${bx}" y="${by+32}" class="t-sm">inflow from the gut</text>`;
    s+=`<rect x="${bx}" y="${by+37}" width="${bw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by+37}" width="${f1(bw*inflow)}" height="10" rx="3" style="fill:var(--artery);opacity:.75"/>`;
    if(N&&res>.9){/* the split label fits beside the bar only in the wide layout */}
    svg.innerHTML=s;
    const z=ZONES.find(([a,b])=>h>a&&h<=b)||ZONES[0];
    rd.innerHTML=`<span>HVPG <b>${Math.round(h)} mmHg</b> (illustrative)</span><span>Zone <b>${z[3]}</b></span><span>Varices <b>${vx<.05?'none yet':bl>.2?'bleeding':band>.5?'banded':'present'}</b></span>`;
    note.innerHTML=noteHTML(PO_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#poPlay'),draw,24000,'Replay','portal');
  setSt=stepWire($('#poSteps'),PO_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the bleeding bundle clock ---------- */
  const bs=$('#poBun'),br=$('#poBunT'),bn=$('#poBunNote');let setB=()=>{};
  const LANES=[
    {n:'Restrictive transfusion',d:'target Hb 7–8 g/dl',s:0,e:120,col:'var(--artery)'},
    {n:'Vasoactive drug',d:'start ASAP · 2–5 days',s:.5,e:48,e2:120,col:'var(--brand)'},
    {n:'Antibiotics',d:'from admission',s:1.5,e:72,fade:true,col:'var(--rx)'},
    {n:'Endoscopy + banding',d:'within 12 h · band ligation',s:6,win:[0,12],col:'var(--dx)',pt:6},
    {n:'Pre-emptive TIPS',d:'high risk · ≤72 h (ideal <24 h)',s:24,win:[0,72],ideal:24,col:'var(--accent)',pt:24}];
  function drawB(t){
    const N=vb(bs,'720 330','400 470');const hr=120*t*t;
    const x0=N?20:206,x1=N?384:700,X=hh=>x0+(x1-x0)*Math.sqrt(clamp(hh,0,120)/120);
    const ph=phaseOf(PO_BUN,t);let s=`<defs><linearGradient id="poFade" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="poFadeM" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#poFade)"/></mask></defs>`;
    const axY=N?406:282;
    LANES.forEach((L,i)=>{const ly=N?40+i*72:44+i*46,by=N?ly+10:ly-12,bh=N?16:18,on=hr>=L.s;
      /* label */
      if(N){s+=`<text x="${x0}" y="${ly}" class="t-lbl" style="font-size:12.5px${on?'':';fill:var(--muted)'}">${on?'✓ ':''}${L.n}</text><text x="${x1-8}" y="${ly}" class="t-sm t-end">${L.d}</text>`}
      else{s+=`<text x="16" y="${ly}" class="t-lbl" style="${on?'':'fill:var(--muted)'}">${on?'✓ ':''}${L.n}</text><text x="16" y="${ly+13}" class="t-xs">${L.d}</text>`}
      s+=`<rect x="${x0}" y="${by}" width="${x1-x0}" height="${bh}" rx="4" style="fill:var(--panel-2);opacity:.6"/>`;
      if(L.win){s+=`<rect x="${f1(X(L.win[0]))}" y="${by}" width="${f1(X(L.win[1])-X(L.win[0]))}" height="${bh}" rx="4" style="fill:${L.col};opacity:.14"/>`;
        if(L.ideal)s+=`<rect x="${f1(X(0))}" y="${by}" width="${f1(X(L.ideal)-X(0))}" height="${bh}" rx="4" style="fill:${L.col};opacity:.16"/>`;
        s+=`<line x1="${f1(X(L.win[1]))}" x2="${f1(X(L.win[1]))}" y1="${by-3}" y2="${by+bh+3}" style="stroke:${L.col};stroke-width:2"/>`}
      if(L.pt!=null){if(hr>=L.pt){const cx=X(L.pt);s+=`<circle cx="${f1(cx)}" cy="${f1(by+bh/2)}" r="${f1(bh/2+1)}" style="fill:${L.col}"/><path d="M${f1(cx-4)} ${f1(by+bh/2)}l3 3l5 -6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
          if(i===3&&!N)s+=`<text x="${f1(cx+12)}" y="${f1(by+bh/2+3)}" class="t-xs" style="fill:var(--dx)">bands placed</text>`;
          if(i===4&&!N)s+=`<text x="${f1(cx+12)}" y="${f1(by+bh/2+3)}" class="t-xs" style="fill:var(--accent)">if criteria met</text>`}
        if(i===3&&hr>=4.8){const ex=X(5);s+=`<line x1="${f1(ex)}" x2="${f1(ex)}" y1="${by+2}" y2="${by+bh-2}" style="stroke:var(--dx);stroke-width:2"/>`}}
      else if(on){const xe=X(Math.min(hr,L.e));
        s+=`<rect x="${f1(X(L.s))}" y="${by+3}" width="${f1(Math.max(2,xe-X(L.s)))}" height="${bh-6}" rx="3" style="fill:${L.col};opacity:.8"${L.fade?' mask="url(#poFadeM)"':''}/>`;
        if(L.e2&&hr>L.e){s+=`<rect x="${f1(X(L.e))}" y="${by+3}" width="${f1(X(Math.min(hr,L.e2))-X(L.e))}" height="${bh-6}" rx="3" style="fill:none;stroke:${L.col};stroke-width:1.4;stroke-dasharray:4 3"/>`}}
    });
    /* day 5 line and axis */
    s+=`<line x1="${f1(X(120))}" x2="${f1(X(120))}" y1="${N?28:24}" y2="${axY}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:3 3"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${axY}" y2="${axY}" class="axis"/>`;
    (N?[0,1,6,12,24,72,120]:[0,1,6,12,24,48,72,120]).forEach(v=>{const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${axY-4}" y2="${axY+4}" class="axis"/><text x="${f1(xx)}" y="${axY+16}" class="t-xs t-mid${v===120?' ':''}">${v===120?'day 5':v===0?'0':v+' h'}</text>`});
    s+=`<text x="${x1}" y="${axY+32}" class="t-xs t-end">hours since arrival (square-root scale)</text>`;
    if(hr>=110)s+=`<text x="${f1(X(120)-6)}" y="${N?axY-8:axY-8}" class="t-xs t-end" style="fill:var(--bad);font-weight:700">5-day treatment failure check</text>`;
    /* the clock hand */
    const cx=X(hr);if(N)LANES.forEach((L,i)=>{const by=40+i*72+10;s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${by-3}" y2="${by+19}" style="stroke:var(--ink);stroke-width:1.6"/>`});else s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="22" y2="${axY}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    const lab=hr<1?Math.round(hr*60)+' min':hr<48?f1(hr).replace('.0','')+' h':'day '+f1(hr/24).replace('.0','');
    s+=`<rect x="${f1(clamp(cx-30,x0-14,x1-46))}" y="${N?6:4}" width="60" height="17" rx="8" style="fill:var(--ink)"/><text x="${f1(clamp(cx-30,x0-14,x1-46)+30)}" y="${N?18:16}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${lab}</text>`;
    bs.innerHTML=s;bn.innerHTML=noteHTML(PO_BUN[ph]);setB(ph);
  }
  const stopB=playWire(br,$('#poBunPlay'),drawB,16000,'Replay','portal');
  setB=stepWire($('#poBunSteps'),PO_BUN,br,drawB,stopB);
  drawB(+br.value);

  /* ---------- icon arrays ---------- */
  const is=$('#poIco'),ic=$('#poIcoCap');let curI='predesci',stopI=()=>{};
  function grid(x,y,n,k,col,dx,dy,sz){let g='';for(let i=0;i<n;i++){const c=i%10,r=Math.floor(i/10);g+=person(x+c*dx,y+r*dy,sz,i<k?col:'var(--line)')}return g}
  function drawI(p){const N=vb(is,'720 300','400 590'),D=PO_ICO[curI];let s='';
    const cols=N?[[60,46],[60,340]]:[[64,56],[414,56]],dx=N?29:25,dy=N?22:22,sz=N?18:18;
    [D.a,D.b].forEach(([nm,v],j)=>{const [x,y]=cols[j],k=Math.round(v*p),col=j?'var(--muted)':'var(--accent)';
      s+=`<text x="${x-8}" y="${y-22}" class="t-lbl">${nm}</text><text x="${x+dx*10-14}" y="${y-20}" class="t-big t-end" style="font-size:24px;fill:${j?'var(--ink)':'var(--accent)'}">${k}<tspan class="t-xs" style="font-size:11px"> in 100</tspan></text>`;
      s+=grid(x,y-6,100,k,j?'var(--bad)':'var(--bad)',dx,dy,sz)});
    s+=`<text x="${N?200:360}" y="${N?574:292}" class="t-xs t-mid">highlighted: ${D.ev}</text>`;
    is.innerHTML=s}
  function pickI(k){curI=k;$$('[data-ic]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ic===k));ic.innerHTML=PO_ICO[k].cap;stopI();stopI=animate(900,p=>drawI(ease(p)))}
  $$('[data-ic]').forEach(b=>b.addEventListener('click',()=>pickI(b.dataset.ic)));
  ic.innerHTML=PO_ICO[curI].cap;drawI(1);
  redraws.portal=(()=>{const prev=redraws.portal;return()=>{prev&&prev();drawI(1);drawBav()}})();

  /* ---------- Baveno VII endoscopy rule ---------- */
  const ls=$('#poLsm'),pl=$('#poPlt'),nb=$('#poNsbb'),bv=$('#poBavV'),bc=$('#poBavC'),sv=$('#poBavSvg');
  function drawBav(){const L=+ls.value,Pl=+pl.value,on=nb.checked;
    $('#poLsmO').textContent=L+' kPa';$('#poPltO').textContent=Pl+' ×10⁹/L';
    const X=v=>52+(v-5)/55*330,Y=v=>250-(v-40)/310*226;let s='';
    s+=`<rect x="52" y="24" width="330" height="226" style="fill:var(--field)"/>`;
    s+=`<rect x="${f1(X(5))}" y="${f1(Y(350))}" width="${f1(X(20)-X(5))}" height="${f1(Y(150)-Y(350))}" style="fill:var(--good-soft)"/>`;
    s+=`<rect x="${f1(X(20))}" y="24" width="${f1(X(60)-X(20))}" height="226" style="fill:var(--bad-soft);opacity:.7"/><rect x="${f1(X(5))}" y="${f1(Y(150))}" width="${f1(X(20)-X(5))}" height="${f1(250-Y(150))}" style="fill:var(--bad-soft);opacity:.7"/>`;
    s+=`<text x="${f1((X(5)+X(20))/2)}" y="${f1(Y(260))}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">endoscopy</text><text x="${f1((X(5)+X(20))/2)}" y="${f1(Y(260)+12)}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">can be avoided</text>`;
    s+=`<text x="${f1((X(20)+X(60))/2)}" y="${f1(Y(330))}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">screening endoscopy</text>`;
    [[15,'15'],[25,'25']].forEach(([v,l])=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="24" y2="250" class="grid"/>`});
    s+=`<line x1="${f1(X(20))}" x2="${f1(X(20))}" y1="24" y2="250" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 3"/><line x1="52" x2="382" y1="${f1(Y(150))}" y2="${f1(Y(150))}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 3"/>`;
    s+=`<line x1="52" x2="382" y1="250" y2="250" class="axis"/><line x1="52" x2="52" y1="24" y2="250" class="axis"/>`;
    [5,10,15,20,25,40,60].forEach(v=>{s+=`<text x="${f1(X(v))}" y="264" class="t-xs t-mid">${v}</text>`});
    [50,100,150,200,250,300,350].forEach(v=>{s+=`<text x="46" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="382" y="282" class="t-xs t-end">liver stiffness, kPa (dotted: 15 and 25, the CSPH rules)</text><text x="12" y="16" class="t-xs">platelets ×10⁹/L</text>`;
    const px=X(L),py=Y(Pl);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="7" style="fill:var(--ink);stroke:var(--panel);stroke-width:2.5"/>`;
    if(on)s+=`<rect x="52" y="24" width="330" height="226" style="fill:var(--panel);opacity:.72"/><text x="217" y="132" class="t-lbl t-mid">On an NSBB: the result would</text><text x="217" y="150" class="t-lbl t-mid">not change management</text>`;
    sv.innerHTML=s;
    let v,c;
    if(on){v='No screening endoscopy needed: Baveno VII states the result would not change management for people on NSBBs.';c='yes'}
    else if(L<20&&Pl>150){v='Under this rule a screening endoscopy can be avoided; elastography and platelets are repeated yearly.';c='yes'}
    else{v=`Under this rule a screening endoscopy is indicated (${L>=20?'stiffness ≥20 kPa':''}${L>=20&&Pl<=150?' and ':''}${Pl<=150?'platelets ≤150×10⁹/L':''}).`;c='no'}
    bv.className='verdict '+c;bv.textContent=v;
    bc.innerHTML=(L<=15&&Pl>=150?'Stiffness ≤15 kPa with platelets ≥150×10⁹/L also rules out CSPH (sensitivity and negative predictive value &gt;90%).':L>=25?'Stiffness ≥25 kPa also rules in CSPH (specificity and positive predictive value &gt;90%) in viral, alcohol-related and non-obese NASH-related compensated advanced chronic liver disease.':'These values sit between the two Baveno VII rules for CSPH (≤15 kPa with platelets ≥150 rules it out; ≥25 kPa rules it in).')+' <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>';
  }
  [ls,pl,nb].forEach(e=>e.addEventListener('input',drawBav));nb.addEventListener('change',drawBav);
  drawBav();
};
/* =============== 4.2 Ascites, infection & kidney injury =============== */
const AS_STEPS=[
 {from:0,at:.1,k:'Step 1 · the pressure',t:'Portal pressure rises',
  txt:`Scar and nodules make it hard for blood from the gut to pass through the liver, so pressure builds in the portal vein. Baveno VII: a hepatic venous pressure gradient (HVPG) above 5 mmHg indicates sinusoidal portal hypertension, and 10 mmHg or more is clinically significant portal hypertension. Ascites is the most common decompensating event: 5–10% of people with compensated cirrhosis develop it each year. <sup class="c" data-ref="deFranchis2022BavenoVII,EASL2018Decomp" title="Source 97,106">97,106</sup> The pressure itself is the subject of <a href="#portal" data-go="portal">Portal hypertension &amp; varices</a>.`,
  pt:`Scarring makes it hard for blood from the gut to get through the liver, so pressure builds up in the portal vein. <sup class="c" data-ref="Gines2021Lancet,DiazSoto2022TAG" title="Source 101,180">101,180</sup>`,
  hook:`HVPG &gt;5 mmHg = portal hypertension; ≥10 mmHg = clinically significant portal hypertension (CSPH). <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`},
 {from:.16,at:.26,k:'Step 2 · the arteries',t:'Gut arteries widen',
  txt:`The peripheral arterial vasodilation hypothesis (Schrier, 1988): early widening of the splanchnic (gut) arteries "underfills" the arterial tree. The body reads this as too little circulating volume and switches on its salt- and water-saving systems. The same idea explains the continuum from compensated cirrhosis to decompensation to hepatorenal syndrome. <sup class="c" data-ref="Schrier1988Hepatology" title="Source 410">410</sup>`,
  pt:`The blood vessels of the gut relax and widen. The rest of the body then behaves as if it were short of blood. <sup class="c" data-ref="Schrier1988Hepatology" title="Source 410">410</sup>`,
  hook:`Splanchnic vasodilation → arterial underfilling → RAAS, sympathetic nerves and vasopressin → sodium and water retention. <sup class="c" data-ref="Schrier1988Hepatology" title="Source 410">410</sup>`},
 {from:.32,at:.47,k:'Step 3 · the kidneys',t:'Kidneys hold salt and water',
  txt:`EASL 2018: the mainstay of ascites formation is renal sodium retention from activation of the renin–angiotensin–aldosterone and sympathetic nervous systems; vasopressin adds water. Portal hypertension directs the retained fluid into the abdomen. EASL grades: grade 1 is seen only on ultrasound, grade 2 is moderate symmetrical distension, grade 3 is marked distension. <sup class="c" data-ref="EASL2018Decomp,Schrier1988Hepatology" title="Source 106,410">106,410</sup>`,
  pt:`The kidneys hold on to salt and water, and the high pressure pushes that fluid into the belly. <sup class="c" data-ref="EASL2018Decomp,Schrier1988Hepatology" title="Source 106,410">106,410</sup>`,
  hook:`SAAG ≥1.1 g/dl = portal-hypertensive ascites (correct in 96.7% of 901 samples). <sup class="c" data-ref="EASL2018Decomp,Runyon1992AnnIntern" title="Source 106,395">106,395</sup>`},
 {from:.52,at:.63,k:'Step 4 · treatment',t:'Less salt, then diuretics',
  txt:`EASL 2018, quoted as published and not as instructions: "a moderate restriction of sodium intake (80–120 mmol/day, corresponding to 4.6–6.9 g of salt)". For a first grade 2 ascites, an anti-mineralocorticoid such as spironolactone alone, "starting at 100 mg/day with stepwise increases every 72 h (in 100 mg steps) to a maximum of 400 mg/day". Furosemide is added if weight loss is &lt;2 kg/week or hyperkalaemia develops, "from 40 mg/day to a maximum of 160 mg/day (in 40 mg steps)"; long-standing or recurrent ascites gets the combination. <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>`,
  pt:`Less salt and water pills (diuretics) help the kidneys let go of salt and water. Only your care team sets the doses. <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>`,
  hook:`EASL steps: spironolactone 100 → 400 mg/day; furosemide 40 → 160 mg/day. Stop diuretics for Na⁺ &lt;125 mmol/L, AKI, worsening HE or incapacitating cramps. <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>`},
 {from:.68,at:.8,k:'Step 5 · treatment',t:'Drain, then give albumin',
  txt:`For grade 3 ascites, EASL calls large-volume paracentesis (LVP) first-line, removing all the fluid in one session. For more than 5 L, EASL: albumin "8 g/L of ascites removed"; 6–8 g per litre is the commonly cited AASLD and EASL figure, set by expert opinion. Without albumin, renal impairment or severe hyponatraemia developed in 11 patients vs 1 with albumin (RCT, 105 patients); across 17 trials albumin cut circulatory dysfunction (OR 0.39), hyponatraemia (OR 0.58) and death (OR 0.64). <sup class="c" data-ref="EASL2018Decomp,Trebicka2025Hepatology,Biggins2021AASLD,Gines1988Gastro,Bernardi2012Hepatology" title="Source 36,41,106,176,466">36,41,106,176,466</sup>`,
  pt:`A needle drains the fluid. Albumin, a protein given through a drip, helps protect the circulation and kidneys afterwards. <sup class="c" data-ref="EASL2018Decomp,Bernardi2012Hepatology" title="Source 36,106">36,106</sup>`,
  hook:`LVP &gt;5 L: albumin 8 g per litre removed (EASL); 6–8 g/L is the commonly cited range. <sup class="c" data-ref="EASL2018Decomp,Trebicka2025Hepatology" title="Source 106,466">106,466</sup>`},
 {from:.84,at:.95,k:'Step 6 · treatment',t:'TIPS for recurrent ascites',
  txt:`The fluid keeps coming back. Baveno VII: TIPS "should be considered in patients with recurrent ascites (requirement of ≥3 large-volume paracenteses within 1 year)". Covered-stent TIPS vs repeated LVP plus albumin (62 people): 1-year transplant-free survival 93% vs 52%, 32 vs 320 paracenteses in total, and 65% free of encephalopathy at 1 year in both groups. EASL notes that TIPS has not been shown to improve survival in fully refractory ascites, which carries a median survival of about 6 months and calls for immediate transplant referral. <sup class="c" data-ref="deFranchis2022BavenoVII,Bureau2017Gastro,EASL2018Decomp" title="Source 54,97,106">54,97,106</sup>`,
  pt:`TIPS stands for transjugular intrahepatic portosystemic shunt: a stent-supported channel inside the liver, placed by interventional radiology, that lets portal blood bypass the scar. In the first such case, in 1989, the pressure gradient fell from 38 to 18 mmHg. <sup class="c" data-ref="Richter1989Radiologe" title="Source 378">378</sup>`,
  hook:`Recurrent ascites (≥3 LVPs in a year) → consider TIPS (Baveno VII). Refractory ascites → transplant referral (EASL). <sup class="c" data-ref="deFranchis2022BavenoVII,EASL2018Decomp" title="Source 97,106">97,106</sup>`}
];
/* a grid of person icons: k of n coloured */
function asGrid(x,y,k,col,o={}){const n=o.n||100,cols=o.cols||10,s=o.s||15,gx=o.gx||s*1.2,gy=o.gy||s*1.25;let g='';
  for(let i=0;i<n;i++){const c=i%cols,r=Math.floor(i/cols);g+=person(x+c*gx+s*.3,y+r*gy,s,i<k?col:'var(--line)')}return g}
/* two arms side by side, for a trial outcome; p animates the fill 0..1 */
function asArms(svg,arms,row,p,good){
  const N=vb(svg,'440 330','400 330'),s=N?13.5:15,gx=N?16.6:18,gy=N?17.4:19,xs=N?[16,212]:[20,236],col=good?'var(--good)':'var(--bad)';let g='';
  [0,1].forEach(a=>{const v=a?row.b:row.a,k=Math.round(v*p),x=xs[a];
    g+=`<text x="${x}" y="20" class="t-lbl">${arms[a]}</text>`;
    g+=asGrid(x,34,k,col,{s,gx,gy});
    g+=`<text x="${x}" y="${34+10*gy+34}" class="t-big" style="font-size:28px;fill:${col}">${Math.round(v*p)}%</text>`});
  g+=`<text x="${N?200:220}" y="${34+10*gy+60}" class="t-sm t-mid">${row.n} · per 100 people</text>`;
  svg.innerHTML=g}
const AS_SORT=[{n:'Kidney impairment',a:33,b:10},{n:'Died in hospital',a:29,b:10},{n:'Died by 3 months',a:41,b:22}];
const AS_CONF=[{n:'HRS reversal (verified)',a:17,b:32,good:true},{n:'Death from respiratory disorders, 90 days',a:2,b:11},{n:'Died within 90 days',a:45,b:51}];

inits.ascites=()=>{
  const svg=$('#asSvg'),rg=$('#asT'),S=AS_STEPS;
  const lbl=(x,y,t,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}" style="paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round;${st}">${t}</text>`;
  /* the belly's fluid over the story */
  function fluid(t){
    if(t<.34)return 0;
    if(t<.52)return .88*ease(ramp(t,.34,.5));
    if(t<.7)return lerp(.88,.6,ease(ramp(t,.55,.67)));
    if(t<.83)return lerp(.6,.05,ease(ramp(t,.72,.81)));
    if(t<.89)return lerp(.05,.52,ease(ramp(t,.83,.88)));
    return lerp(.52,.1,ease(ramp(t,.9,.98)))}
  function grade(F){return F<.03?['no ascites','']:F<.28?['grade 1','seen only on ultrasound']:F<.58?['grade 2','moderate, symmetrical']:['grade 3','marked distension']}
  /* ---- the six scene panels, drawn in a 400 x 250 frame ---- */
  function sc0(u,t){let g=lbl(0,10,'SCARRED LIVER, RISING PRESSURE','t-sm');
    g+=liver(108,105,.95,{fib:3+u,gb:false,seed:5}).svg;
    const vw=5+u*5,d='M222 244Q192 198 142 146',q=(a,b,c,v)=>(1-v)*(1-v)*a+2*(1-v)*v*b+v*v*c;
    g+=`<path d="${d}" style="fill:none;stroke:var(--portal);stroke-width:${f1(vw)};stroke-linecap:round"/>`;
    if(u>0)g+=`<path d="${d}" style="fill:none;stroke:var(--bad);stroke-width:${f1(vw*.32)};stroke-linecap:round;opacity:${f1(u*.75)}"/>`;
    for(let i=0;i<5;i++){const v=(t*28*(1-.7*u)+i/5)%1;g+=`<circle cx="${f1(q(222,192,142,v))}" cy="${f1(q(244,198,146,v))}" r="2.2" style="fill:var(--panel)"/>`}
    g+=lbl(232,246,'portal vein');
    if(u>.45)g+=lbl(180,206,'back-pressure','t-xs t-end',`fill:var(--bad);opacity:${f1(ramp(u,.45,.7))}`);
    const hv=lerp(4,16,u);g+=gauge(322,128,66,hv,20,{bands:[{to:5,col:'var(--good)'},{to:10,col:'var(--warn)'},{to:20,col:'var(--bad)'}]});
    g+=lbl(322,164,Math.round(hv)+' mmHg','t-big t-mid','font-size:20px;fill:'+(hv>10?'var(--bad)':hv>5?'var(--warn)':'var(--good)'))+lbl(322,180,'HVPG, needle schematic','t-xs t-mid');
    g+=lbl(322,200,'&gt;5: portal hypertension','t-xs t-mid')+lbl(322,213,'≥10: clinically significant','t-xs t-mid');
    return g}
  function sc1(u,t){let g=lbl(0,10,'GUT ARTERIES WIDEN','t-sm');
    g+=`<rect x="26" y="24" width="16" height="220" rx="8" style="fill:var(--artery);opacity:.85"/>`+lbl(48,36,'aorta');
    [72,128,184].forEach((y,k)=>{const w=3+u*10,d=`M42 ${y}C96 ${y} 120 ${y+6} 196 ${y+4}`;
      g+=`<path d="${d}" style="fill:none;stroke:var(--artery);stroke-width:${f1(w)};stroke-linecap:round;opacity:.85"/>`;
      g+=`<path d="M198 ${y+4}q10 -16 20 0t20 0t20 0" style="fill:none;stroke:var(--brain-line);stroke-width:7;stroke-linecap:round;opacity:.5"/>`;
      for(let i=0;i<4;i++){const v=(t*22*(1-.5*u)+i/4+k*.13)%1;g+=`<circle cx="${f1(lerp(48,192,v))}" cy="${f1(y+v*v*4+(i%2?1:-1)*u*2.5)}" r="1.9" style="fill:var(--panel)"/>`}});
    g+=lbl(120,58,'splanchnic (gut) arteries','t-xs t-mid')+lbl(232,214,'gut','t-xs t-mid');
    g+=lbl(170,234,u>.5?'blood pools in the widened gut vessels':'the vessels relax and widen','t-xs t-mid');
    const H=150,fl=1-.55*u;
    g+=`<rect x="316" y="44" width="42" height="${H}" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    g+=`<rect x="316" y="${f1(44+H*(1-fl))}" width="42" height="${f1(H*fl)}" rx="8" style="fill:var(--artery);opacity:.7"/>`;
    g+=`<line x1="306" x2="368" y1="44" y2="44" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
    g+=lbl(337,212,'arterial filling','t-xs t-mid')+lbl(337,225,'as the body senses it','t-xs t-mid');
    if(u>.45)g+=lbl(337,34,'"underfilled"','t-xs t-mid',`fill:var(--bad);opacity:${f1(ramp(u,.45,.7))}`);
    return g}
  function sc2(u,t){let g=lbl(0,10,'KIDNEYS HOLD SALT AND WATER','t-sm');
    g+=kidney(66,112,2.3,{label:'kidney'});
    const R=[{y:26,a:'RAAS',b:'renin → angiotensin II → aldosterone',o:ramp(u,0,.25)},{y:76,a:'Sympathetic nervous system',b:'more active',o:ramp(u,.25,.5)},{y:126,a:'Vasopressin (ADH)',b:'more water kept',o:ramp(u,.5,.75)}];
    R.forEach(r=>{g+=`<rect x="140" y="${r.y}" width="256" height="38" rx="8" style="fill:${r.o>.5?'var(--accent-soft)':'var(--panel-2)'};stroke:${r.o>.5?'var(--accent)':'var(--line)'};stroke-width:1.2"/>`;
      g+=`<text x="150" y="${r.y+16}" class="t-lbl" style="font-size:11.5px;opacity:${f1(.45+.55*r.o)}">${r.a}</text><text x="150" y="${r.y+30}" class="t-xs" style="opacity:${f1(.45+.55*r.o)}">${r.b}</text>`;
      if(r.o>0)g+=`<line x1="138" y1="${r.y+19}" x2="${f1(lerp(138,112,r.o))}" y2="${f1(lerp(r.y+19,112,r.o*.6))}" style="stroke:var(--accent);stroke-width:1.6;opacity:${f1(r.o)}" marker-end="url(#asArA)"/>`});
    const n=Math.round(u*10),q=(a,b,c,v)=>(1-v)*(1-v)*a+2*(1-v)*v*b+v*v*c;
    for(let i=0;i<n;i++){const v=(t*14+i/10)%1,x=q(96,230,392,v),y=q(150,250,214,v);
      g+=i%2?`<path d="M${f1(x)} ${f1(y-5)}q4 5 0 8q-4 -3 0 -8Z" style="fill:var(--fluid-fill);stroke:var(--fluid);stroke-width:.8"/>`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:var(--bile)"/><text x="${f1(x)}" y="${f1(y+2.4)}" class="t-mid" style="font:700 6px var(--mono);fill:var(--ink)">Na</text>`}
    g+=lbl(258,184,'Na⁺ and water stay in the body','t-xs t-mid')+lbl(380,240,'→ belly','t-xs t-end');
    return g}
  function sc3(u){let g=lbl(0,10,'LESS SALT, THEN DIURETICS · EASL 2018','t-sm');
    /* salt shaker */
    g+=`<path d="M38 58h28l6 70h-40z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/><path d="M36 58q16 -22 32 0z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`;
    [[46,50],[52,46],[58,50]].forEach(([x,y])=>g+=`<circle cx="${x}" cy="${y}" r="1.4" style="fill:var(--muted)"/>`);
    g+=`<line x1="22" y1="40" x2="84" y2="140" style="stroke:var(--bad);stroke-width:2.2;opacity:${f1(.3+.7*ramp(u,0,.25))}"/>`;
    g+=lbl(0,160,'"moderate restriction"')+lbl(0,178,'80–120 mmol/day','t-lbl','font-size:12px')+lbl(0,193,'(4.6–6.9 g of salt)');
    const k1=Math.min(3,Math.floor(ramp(u,.12,.6)*4)),k2=u<.5?-1:Math.min(3,Math.floor(ramp(u,.5,.98)*4));
    const bars=(x0,w,step,max,k,name,unit,col)=>{let s=pill(x0+16,32,26,{col})+lbl(x0+34,36,name,'t-xs','font-weight:700;fill:var(--ink)');
      for(let i=0;i<4;i++){const d=step*(i+1),h=d/max*112,x=x0+i*(w+5),on=i<=k;
        s+=`<rect x="${x}" y="${f1(200-h)}" width="${w}" height="${f1(h)}" rx="3" style="fill:${on?col:'var(--panel-2)'};stroke:${on?col:'var(--line)'};opacity:${on?.9:1}"/>`;
        s+=`<text x="${f1(x+w/2)}" y="214" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${d}</text>`}
      return s+lbl(x0,228,unit)};
    g+=bars(126,26,100,400,k1,'spironolactone','mg/day','var(--rx)');
    g+=`<g style="opacity:${f1(.35+.65*ramp(u,.45,.55))}">`+bars(268,26,40,160,k2,'+ furosemide','mg/day','var(--fluid)')+'</g>';
    g+=lbl(0,246,u<.5?'spironolactone rises in 100 mg steps every 72 h':'furosemide added if weight loss &lt;2 kg/week · quoted, not instructions','t-xs');
    return g}
  function sc4(u){let g=lbl(0,10,'LARGE-VOLUME PARACENTESIS + ALBUMIN','t-sm');
    const L=u*8,H=176,y0=34,top=y0+H*(1-L/8);
    g+=`<rect x="20" y="${y0}" width="74" height="${H}" rx="10" style="fill:var(--panel);stroke:var(--fluid);stroke-width:1.6"/>`;
    if(L>0)g+=`<rect x="21" y="${f1(top)}" width="72" height="${f1(y0+H-top)}" rx="9" style="fill:var(--fluid-fill);opacity:.65"/>`;
    for(let l=2;l<=8;l+=2){const y=y0+H*(1-l/8);g+=`<line x1="94" x2="102" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--muted)"/>`+lbl(105,y+3,l+' L')}
    const y5=y0+H*(1-5/8);g+=`<line x1="14" x2="100" y1="${f1(y5)}" y2="${f1(y5)}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:4 3"/>`+lbl(130,y5+3,'5 L','t-xs',`fill:var(--bad)`);
    g+=lbl(57,236,f1(L)+' L drained','t-lbl t-mid');
    const X=160;
    if(L<=5){g+=lbl(X,52,'Up to 5 L:','t-lbl')+lbl(X,70,'EASL: the risk of circulatory')+lbl(X,83,'dysfunction after the drain is low')}
    else{const al=8*L;g+=lbl(X,52,'More than 5 L: EASL states','t-lbl')+lbl(X,70,'albumin "8 g/L of ascites removed"');
      g+=lbl(X,100,`8 × ${f1(L)} L ≈ ${Math.round(al)} g`,'t-big','font-size:20px;fill:var(--rx)');
      g+=lbl(X,118,`6–8 g/L range: ${Math.round(6*L)}–${Math.round(al)} g`);
      g+=`<rect x="${X}" y="128" width="${f1(230*al/64)}" height="12" rx="6" style="fill:var(--rx);opacity:.75"/>`}
    g+=lbl(X,176,'RCT, 105 people:','t-xs','font-weight:700;fill:var(--ink)')+lbl(X,190,'renal impairment or severe low')+lbl(X,203,'sodium in 11 without albumin')+lbl(X,216,'vs 1 with albumin');
    g+=lbl(X,240,'litres and grams: worked example only','t-xs','font-style:italic');
    return g}
  function sc5(u,t){let g=lbl(0,10,'TIPS FOR RECURRENT ASCITES','t-sm');
    g+=portalMap(102,138,.82,{pressure:.9-.6*u,flow:t*24,tips:u,spleen:.6,varix:.25,fib:4,labels:true}).svg;
    if(u>.25)g+=lbl(70,104,'TIPS stent','t-xs',`fill:var(--accent);font-weight:700;opacity:${f1(ramp(u,.25,.5))}`);
    const X=222,W=168,bar=(y,name,v,max,txt,col)=>lbl(X,y,name)+lbl(X+W,y,txt,'t-xs t-end','fill:var(--ink);font-weight:700')+`<rect x="${X}" y="${y+4}" width="${W}" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${X}" y="${y+4}" width="${f1(Math.max(0,W*v/max*u))}" height="9" rx="4.5" style="fill:${col}"/>`;
    g+=lbl(X,36,'1-year transplant-free survival','t-xs','font-weight:700;fill:var(--ink)');
    g+=bar(52,'covered TIPS',93,100,'93%','var(--rx)')+bar(78,'drain + albumin',52,100,'52%','var(--muted)');
    g+=lbl(X,116,'paracenteses, 62 people in all','t-xs','font-weight:700;fill:var(--ink)');
    g+=bar(132,'covered TIPS',32,320,'32','var(--rx)')+bar(158,'drain + albumin',320,320,'320','var(--muted)');
    g+=lbl(X,200,'Baveno VII: consider TIPS after','t-xs')+lbl(X,213,'≥3 large-volume paracenteses','t-xs')+lbl(X,226,'within 1 year','t-xs');
    return g}
  const SC=[sc0,sc1,sc2,sc3,sc4,sc5];
  const CL=[['Portal','pressure ↑'],['Gut arteries','widen'],['RAAS · SNS','· vasopressin'],['Kidneys keep','Na⁺ + water']];
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(S,t),F=fluid(t),G=grade(F);
    let s=`<defs>${marker('asArC','var(--muted)')}${marker('asArA','var(--accent)')}</defs>`;
    /* the chain */
    const CX=N?[52,149,246,343]:[352,456,560,664],CY=N?28:38,lit=[ramp(t,0,.06),ramp(t,.16,.2),ramp(t,.32,.36),ramp(t,.38,.44)];
    CX.forEach((x,i)=>{const on=lit[i]>.5;
      if(i<3)s+=`<line x1="${x+18}" y1="${CY}" x2="${CX[i+1]-21}" y2="${CY}" style="stroke:${lit[i+1]>.5?'var(--accent)':'var(--line)'};stroke-width:1.8" marker-end="url(#${lit[i+1]>.5?'asArA':'asArC'})"/>`;
      s+=`<circle cx="${x}" cy="${CY}" r="15" style="fill:${on?'var(--accent)':'var(--panel-2)'};stroke:var(--accent);stroke-width:1.4"/><text x="${x}" y="${CY+4.5}" class="t-mid" style="font:700 13px var(--mono);fill:${on?'var(--panel)':'var(--muted)'}">${i+1}</text>`;
      s+=`<text x="${x}" y="${CY+30}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${CL[i][0]}</text><text x="${x}" y="${CY+41}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${CL[i][1]}</text>`});
    /* the trunk */
    const tap=ramp(t,.69,.72)*(1-ramp(t,.82,.84)),A=N?{x:100,y:96,s:1}:{x:150,y:18,s:1.45};
    s+=abdomen(A.x,A.y,A.s,{fluid:F,tap,liver:true,fib:3+ramp(t,0,.12)}).svg;
    if(F>.03&&p>=2)s+=lbl(A.x,A.y+186*A.s,'ascites','t-xs t-mid','fill:var(--fluid);font-weight:700');
    if(tap>.5)s+=lbl(A.x-50*A.s,A.y+222*A.s,'drain','t-xs t-mid','fill:var(--fluid)');
    if(N){s+=lbl(200,118,'ASCITES (schematic)','t-sm')+lbl(200,146,G[0],'t-big','font-size:22px;fill:var(--fluid)')+lbl(200,164,G[1]);
      s+=`<rect x="200" y="182" width="180" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="200" y="182" width="${f1(180*F/.9)}" height="10" rx="5" style="fill:var(--fluid-fill)"/>`+lbl(200,206,'fluid in the belly');
      s+=lbl(200,240,'Step '+(p+1)+' of 6','t-xs','font-weight:700;fill:var(--ink)')+lbl(200,254,S[p].t)}
    else s+=lbl(A.x,350,F<.03?'No ascites yet':'Ascites: '+G[0],'t-lbl t-mid','fill:var(--fluid)')+lbl(A.x,366,G[1]||'fluid builds from step 3','t-xs t-mid');
    /* the scene for this step */
    const us=[ramp(t,0,.14),ramp(t,.16,.3),ramp(t,.32,.5),ramp(t,.52,.68),ramp(t,.7,.82),ramp(t,.86,.98)];
    s+=`<g transform="${N?'translate(10 330) scale(.95)':'translate(306 104)'}">`+SC[p](us[p],t)+'</g>';
    svg.innerHTML=s;setSt(p);
    $('#asRead').innerHTML=`<span>step <b>${p+1}/6</b></span><span>ascites <b>${G[0]}</b></span><span>${p<3?'mechanism':'treatment as published'}</span>`;
    $('#asNote').innerHTML=noteHTML(S[p]);
  }
  const stop=playWire(rg,$('#asPlay'),draw,26000,'Replay','ascites');
  const setSt=stepWire($('#asSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- SBP: the neutrophil threshold ---- */
  const pr=$('#asPmn'),ps=$('#asPmnSvg'),rr=rng(42),PTS=[],RBC=[];
  while(PTS.length<160){const a=rr()*6.283,d=Math.sqrt(rr());PTS.push([Math.cos(a)*d,Math.sin(a)*d,rr()*6.283])}
  for(let i=0;i<36;i++){const a=rr()*6.283,d=Math.sqrt(rr());RBC.push([Math.cos(a)*d,Math.sin(a)*d])}
  function drawPmn(){const N=vb(ps,'440 300','400 330'),v=clamp(+pr.value||0,0,1000),C=N?[120,118,94]:[128,124,104];
    const id='asClipPmn';let g=`<clipPath id="${id}"><circle cx="${C[0]}" cy="${C[1]}" r="${C[2]}"/></clipPath><circle cx="${C[0]}" cy="${C[1]}" r="${C[2]}" style="fill:var(--fluid-soft);stroke:var(--muted);stroke-width:3"/><g clip-path="url(#${id})">`;
    RBC.forEach(([x,y])=>g+=`<circle cx="${f1(C[0]+x*C[2]*.94)}" cy="${f1(C[1]+y*C[2]*.94)}" r="4.5" style="fill:var(--artery);opacity:.18"/>`);
    const n=Math.round(v/1000*150);
    for(let i=0;i<n;i++){const [x,y,a]=PTS[i],cx=C[0]+x*C[2]*.9,cy=C[1]+y*C[2]*.9;
      g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="6" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:.8"/>`;
      for(let k=0;k<3;k++){const b=a+k*2.1;g+=`<circle cx="${f1(cx+Math.cos(b)*2.4)}" cy="${f1(cy+Math.sin(b)*2.4)}" r="1.7" style="fill:var(--dx)"/>`}}
    g+='</g>';
    const R=N?[232,388]:[256,428],over=v>=250;
    g+=`<text x="${R[0]}" y="${N?66:62}" class="t-sm">NEUTROPHILS (PMN)</text><text x="${R[0]}" y="${N?100:98}" class="t-big" style="font-size:${N?30:34}px;fill:${over?'var(--bad)':'var(--ink)'}">${v}</text><text x="${R[0]}" y="${N?118:118}" class="t-xs">cells per mm³ of fluid</text>`;
    g+=`<text x="${R[0]}" y="150" class="t-lbl" style="fill:${over?'var(--bad)':'var(--good)'}">${over?'At or above 250:':'Below 250:'}</text><text x="${R[0]}" y="166" class="t-xs">${over?'meets the published':'does not meet the'}</text><text x="${R[0]}" y="179" class="t-xs">${over?'SBP threshold':'SBP threshold'}</text>`;
    const y=N?262:262,x0=20,x1=N?380:420,X=w=>lerp(x0,x1,w/1000);
    g+=`<rect x="${x0}" y="${y-6}" width="${f1(X(250)-x0)}" height="12" rx="3" style="fill:var(--good-soft)"/><rect x="${f1(X(250))}" y="${y-6}" width="${f1(x1-X(250))}" height="12" rx="3" style="fill:var(--bad-soft)"/>`;
    [0,250,500,750,1000].forEach(w=>g+=`<text x="${f1(X(w))}" y="${y+22}" class="t-xs t-mid" style="${w===250?'fill:var(--bad);font-weight:700':''}">${w}</text>`);
    g+=`<line x1="${f1(X(250))}" x2="${f1(X(250))}" y1="${y-12}" y2="${y+10}" style="stroke:var(--bad);stroke-width:2"/><path d="M${f1(X(v)-6)} ${y-16}L${f1(X(v)+6)} ${y-16}L${f1(X(v))} ${y-6}Z" style="fill:var(--ink)"/>`;
    g+=`<text x="${f1(X(250)+6)}" y="${y-14}" class="t-xs" style="fill:var(--bad)">threshold</text>`;
    ps.innerHTML=g;
    const V=$('#asPmnV');V.className='verdict '+(over?'no':'yes');
    V.innerHTML=over?`${v} cells/mm³: at or above 250, the published threshold for SBP. In real care this is a medical emergency that is treated straight away. <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>`:`${v} cells/mm³: below 250, so the count alone does not meet the SBP threshold. <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>`}
  pr.addEventListener('input',drawPmn);drawPmn();

  /* ---- trial icon arrays ---- */
  function wireArms(btnSel,svgEl,arms,data,attr){let cur=0,stopA=null;
    const run=()=>{stopA&&stopA();const row=data[cur];stopA=animate(700,p=>asArms(svgEl,arms,row,ease(p),row.good))};
    $$(btnSel).forEach(b=>b.addEventListener('click',()=>{cur=+b.dataset[attr];$$(btnSel).forEach(o=>o.setAttribute('aria-pressed',o===b));run()}));
    asArms(svgEl,arms,data[0],1,data[0].good);
    redraws.ascites=(f=>()=>{f&&f();asArms(svgEl,arms,data[cur],1,data[cur].good)})(redraws.ascites)}
  wireArms('#m-ascites [data-so]',$('#asSortSvg'),['Cefotaxime alone','Cefotaxime + albumin'],AS_SORT,'so');
  wireArms('#m-ascites [data-cf]',$('#asConfSvg'),['Placebo + albumin','Terlipressin + albumin'],AS_CONF,'cf');

  /* ---- AKI teaching calculator ---- */
  const ab=$('#asAkiB'),ac=$('#asAkiC'),aw=$('#asAkiW'),ar=$('#asAkiR'),as=$('#asAkiSvg');
  function aki(){const b=+ab.value,c=+ac.value,w=aw.value,rrt=ar.checked;
    if(!(b>0)||!(c>0))return{err:true,b,c};
    const rise=c-b,ratio=c/b;let is=false;
    if(rrt)is=true;else if(w==='48')is=rise>=.3||ratio>=1.5;else if(w==='7')is=ratio>=1.5;
    let st=0;if(is)st=(rrt||ratio>3||c>=4)?3:ratio>2?2:1;
    return{b,c,rise,ratio,is,st,w,rrt,sub:st===1?(c<1.5?'1A':'1B'):''}}
  function drawAki(){const N=vb(as,'440 300','400 300'),r=aki();let g='';
    if(r.err){as.innerHTML=`<text x="20" y="60" class="t-lbl">Enter both creatinine values above zero.</text>`;$('#asAkiOut').innerHTML='';return}
    const mx=Math.max(6,r.c*1.15,r.b*3.3),y0=262,y1=34,Y=v=>y0-(y0-y1)*clamp(v/mx),x0=50,xr=N?250:270;
    g+=`<line x1="${x0}" x2="${x0}" y1="${y1}" y2="${y0}" class="axis"/><line x1="${x0}" x2="${xr}" y1="${y0}" y2="${y0}" class="axis"/>`;
    for(let v=0;v<=mx;v+=mx>12?4:mx>8?2:1)g+=`<text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`;
    g+=`<text x="${x0-36}" y="24" class="t-xs">mg/dl</text>`;
    const lines=[{v:r.b*1.5,l:'×1.5'},{v:r.b*2,l:'×2'},{v:r.b*3,l:'×3'},{v:4,l:'4.0'}];let lastY=1e9;
    lines.sort((a,b)=>a.v-b.v).forEach(L=>{if(L.v>mx)return;const y=Y(L.v);g+=`<line x1="${x0}" x2="${xr}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${L.l==='4.0'?'var(--bad)':'var(--muted)'};stroke-dasharray:4 3;opacity:.8"/>`;
      if(lastY-y>11){g+=`<text x="${xr+4}" y="${f1(y+3)}" class="t-xs" style="${L.l==='4.0'?'fill:var(--bad)':''}">${L.l}</text>`;lastY=y}});
    const bar=(x,v,lab,col)=>`<rect x="${x}" y="${f1(Y(v))}" width="56" height="${f1(y0-Y(v))}" rx="4" style="fill:${col}"/><text x="${x+28}" y="${f1(Y(v)-6)}" class="t-lbl t-mid">${v.toFixed(1)}</text><text x="${x+28}" y="${y0+16}" class="t-xs t-mid">${lab}</text>`;
    g+=bar(x0+24,r.b,'baseline','var(--kidney)')+bar(x0+110,r.c,'now',r.is?'var(--bad)':'var(--kidney)');
    const X=N?300:322,col=r.st?'var(--bad)':'var(--good)';
    g+=`<text x="${X}" y="60" class="t-sm">ICA-AKI</text><text x="${X}" y="${N?96:100}" class="t-big" style="font-size:${N?28:34}px;fill:${col}">${r.st?'Stage '+r.st+(r.sub?'':''):'No AKI'}</text>`;
    if(r.sub)g+=`<text x="${X}" y="${N?118:124}" class="t-lbl" style="fill:${col}">(${r.sub})</text>`;
    g+=`<text x="${X}" y="150" class="t-xs">rise ${r.rise>=0?'+':''}${r.rise.toFixed(1)} mg/dl</text><text x="${X}" y="164" class="t-xs">${r.ratio.toFixed(2)} × baseline</text>`;
    as.innerHTML=g;
    let why;
    if(r.rrt)why='Renal replacement therapy places AKI at stage 3.';
    else if(!r.is)why=r.w==='0'?'The rise falls outside the 48-hour and 7-day windows of the definition, so this tool does not label it AKI.':'The rise does not reach ≥0.3 mg/dl within 48 hours or ≥50% within 7 days.';
    else why=r.st===3?'More than 3 times baseline, or 4.0 mg/dl or more.':r.st===2?'More than 2 and up to 3 times baseline.':`A rise of ≥0.3 mg/dl or 1.5–2 times baseline. ${r.sub==='1A'?'Creatinine below 1.5 mg/dl: stage 1A.':'Creatinine 1.5 mg/dl or more: stage 1B.'}`;
    $('#asAkiOut').innerHTML=`<div class="verdict ${r.st?'no':'yes'}">${r.st?'Stage '+r.st+(r.sub?' ('+r.sub+')':''):'No AKI by these criteria'}: ${why}</div><p class="stage-cap">ICA-AKI as reproduced in EASL 2018: AKI is a creatinine rise ≥0.3 mg/dl within 48 h or ≥50% within 7 days; stage 1 ≥0.3 mg/dl or 1.5–2-fold, stage 2 &gt;2–3-fold, stage 3 &gt;3-fold or ≥4.0 mg/dl, or renal replacement. 1A/1B split at 1.5 mg/dl. <sup class="c" data-ref="EASL2018Decomp,Huelin2017CGH" title="Source 106,204">106,204</sup></p>`}
  [ab,ac].forEach(e=>e.addEventListener('input',drawAki));[aw,ar].forEach(e=>e.addEventListener('change',drawAki));
  redraws.ascites=(f=>()=>{f&&f();drawPmn();drawAki()})(redraws.ascites);
  drawAki();
};
/* =============== 4.3 Hepatic encephalopathy =============== */
const EN_STEPS=[
 {from:0,at:.07,k:'Step 1 · the source',t:'Gut bacteria make ammonia',
  txt:`Ammonia "is primarily produced in the gut, as an end product of protein digestion, amino acid deamination and bacterial urease activity". From the bowel it is carried to the liver in the portal vein. <sup class="c" data-ref="Rose2020" title="Source 392">392</sup>`,
  pt:`Digestion and bacteria in the bowel make ammonia, a waste product, every day. <sup class="c" data-ref="Rose2020" title="Source 392">392</sup>`,
  hook:`Main source of ammonia: the gut (protein digestion, amino acid deamination, bacterial urease). <sup class="c" data-ref="Rose2020" title="Source 392">392</sup>`},
 {from:.17,at:.26,k:'Step 2 · the filter',t:'A healthy liver clears it',
  txt:`A healthy liver with an intact urea cycle turns ammonia into urea and keeps blood ammonia in "the low 35–50 μM range". Very little reaches the rest of the body. <sup class="c" data-ref="Rose2020" title="Source 392">392</sup>`,
  pt:`A healthy liver clears ammonia from the blood before it can reach the brain. <sup class="c" data-ref="Rose2020" title="Source 392">392</sup>`,
  hook:`Normal blood ammonia: the low 35–50 μM range, held there by the urea cycle. <sup class="c" data-ref="Rose2020" title="Source 392">392</sup>`},
 {from:.34,at:.45,k:'Step 3 · the bypass',t:'Scar and shunts let it past',
  txt:`AASLD/EASL 2014 defines HE as "a brain dysfunction caused by liver insufficiency and/or PSS [portosystemic shunting]". Scarred tissue clears less, and bypass veins carry gut blood around the liver. Muscle, which "houses GS" (glutamine synthetase), becomes a second ammonia sink, which is why muscle loss raises HE risk. After TIPS, a deliberate shunt, the median 1-year incidence of overt HE is 10–50%. <sup class="c" data-ref="Vilstrup2014HE,Rose2020" title="Source 392,485">392,485</sup>`,
  pt:`When the liver is scarred and blood takes detours around it, ammonia stays in the blood. <sup class="c" data-ref="Vilstrup2014HE,Rose2020" title="Source 392,485">392,485</sup>`,
  hook:`HE = brain dysfunction from liver insufficiency and/or portosystemic shunting; in cirrhosis it is "type C". <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>`},
 {from:.5,at:.58,k:'Step 4 · the brain',t:'Astrocytes swell',
  txt:`Ammonia "passes freely into the brain which is exclusively removed by astrocytes via glutamine synthetase". "The generation of glutamine renders the astrocyte hypertonic resulting in swelling and impaired function and brain oedema." Inflammation, oxidative stress, blood–brain barrier changes and increased GABAergic tone add to it. At first the change is covert: minimal HE shows only on tests, and grade I is a "trivial lack of awareness". <sup class="c" data-ref="Rose2020,Vilstrup2014HE" title="Source 392,485">392,485</sup>`,
  pt:`Support cells in the brain soak up ammonia and swell. At first the change is so slight that only special tests pick it up. <sup class="c" data-ref="Rose2020,Vilstrup2014HE" title="Source 392,485">392,485</sup>`,
  hook:`Astrocytes turn ammonia into glutamine → they swell. Covert HE = minimal HE + grade I. <sup class="c" data-ref="Rose2020,Vilstrup2014HE" title="Source 392,485">392,485</sup>`},
 {from:.64,at:.76,k:'Step 5 · overt HE',t:'Confusion deepens: grades II–IV',
  txt:`Overt HE runs from grade II (disoriented for time, asterixis) through grade III (also disoriented for place, somnolent) to grade IV (coma). Precipitating factors "can be identified in nearly all bouts of episodic HE type C". After a first bout, the cumulative risk of another within a year is 40%, "despite lactulose treatment". <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>`,
  pt:`The person may get muddled about the date, become very sleepy or act out of character, and in the most serious stage cannot be woken. New confusion or drowsiness needs urgent care. <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>`,
  hook:`Grade II: disoriented for time + asterixis. Grade III: also for place, somnolent. Grade IV: coma. <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>`},
 {from:.86,at:.95,k:'Step 6 · treatment',t:'Find the trigger, lower the ammonia',
  txt:`The guideline's four prongs: care for altered consciousness, look for other causes, find and correct precipitants, and start empirical HE treatment. "Lactulose is the first choice for treatment of episodic OHE"; rifaximin is an add-on to prevent recurrence. Here fewer molecules form and the grade eases. <span class="ev early">Early evidence</span> Lasting deficits after overt episodes are now being reported. <sup class="c" data-ref="Vilstrup2014HE,Rose2020" title="Source 392,485">392,485</sup>`,
  pt:`Treating the trigger, together with medicines such as lactulose and rifaximin, lowers the ammonia. <sup class="c" data-ref="Vilstrup2014HE,Bass2010Rifaximin" title="Source 27,485">27,485</sup>`,
  hook:`Lactulose first, titrated to 2–3 soft bowel movements a day; rifaximin added after a second episode. <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>`}
];
const EN_WH=[
 {n:'Minimal',s:'Min.',g:'covert',d:'abnormal psychometric or neurophysiological tests "without clinical evidence of mental change"'},
 {n:'Grade I',s:'I',g:'covert',d:'"trivial lack of awareness", euphoria or anxiety, shortened attention span, impaired addition or subtraction, altered sleep rhythm; still oriented in time and space'},
 {n:'Grade II',s:'II',g:'overt',d:'lethargy or apathy, disorientation for time, obvious personality change, inappropriate behaviour, dyspraxia, asterixis'},
 {n:'Grade III',s:'III',g:'overt',d:'somnolence to semistupor, responsive to stimuli, confused, gross disorientation, bizarre behaviour'},
 {n:'Grade IV',s:'IV',g:'overt',d:'coma: "does not respond even to painful stimuli"'}];
const EN_TR=[
 {n:'Overt HE came back, median 14 months',a:46.8,b:19.6,arms:['Placebo','Lactulose'],cap:'Sharma 2009, open-label RCT in people who had recovered from HE: recurrence in 30/64 on placebo vs 12/61 on lactulose (P = .001); deaths 11 vs 5 (P = .18, not significant). Population statistics. <sup class="c" data-ref="Sharma2009Lactulose" title="Source 421">421</sup>'},
 {n:'Breakthrough HE within 6 months',a:45.9,b:22.1,arms:['Placebo','Rifaximin'],cap:'Bass 2010: 299 people in remission from recurrent HE, rifaximin 550 mg twice daily vs placebo; HR 0.42 (95% CI 0.28–0.64). "More than 90%" were also taking lactulose. Population statistics. <sup class="c" data-ref="Bass2010Rifaximin" title="Source 27">27</sup>'},
 {n:'HE-related hospital stay within 6 months',a:22.6,b:13.6,arms:['Placebo','Rifaximin'],cap:'Bass 2010: HR 0.50 (0.29–0.87). In the 24-month open-label extension (392 people) the HE hospitalisation rate was 0.21 per person-year, and infections, including C. difficile, did not rise. <sup class="c" data-ref="Bass2010Rifaximin,Mullen2014" title="Source 27,317">27,317</sup>'}];
const EN_PC=[
 {n:'Infections',t:'Infection',x:`Infections head the guideline's list for episodic overt HE, and newer case series "confirm the dominant role of infections". Infection of ascitic fluid can be quiet, which is why a fluid sample is taken: see <a href="#ascites" data-go="ascites">Ascites, infection &amp; kidney injury</a>. <sup class="c" data-ref="Vilstrup2014HE,EASL2018Decomp" title="Source 106,485">106,485</sup>`},
 {n:'GI bleeding',t:'Bleeding into the gut',x:`Gastrointestinal bleeding is second for episodic HE. After variceal bleeding, Baveno VII says rapid removal of blood from the gut with lactulose (oral or enemas) should be used to prevent HE. <sup class="c" data-ref="Vilstrup2014HE,deFranchis2022BavenoVII" title="Source 97,485">97,485</sup>`},
 {n:'Constipation',t:'Constipation',x:`Constipation appears on both ranked lists. Lactulose is titrated to soft bowel movements, as published. <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>`},
 {n:'Diuretic overdose',t:'Dehydration or too much diuretic',x:`"Diuretic overdose" is third for episodic HE. The guideline also warns that too much lactulose can cause dehydration, "and overuse can even precipitate HE". <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>`},
 {n:'Electrolyte disorder',t:'Electrolyte problems',x:`Electrolyte disorder heads the list for recurrent HE. Low sodium (hyponatraemia) can cause encephalopathy on its own as well as precipitate HE. <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>`},
 {n:null,t:'Sedating medicines',x:`Not in the guideline's frequency table, but linked to HE in cohorts: opioids (HE within a year in 3.3% with none, 5.0% with short-term and 6.3% with chronic prescriptions), benzodiazepines (long-acting agents, high doses, use beyond 2 months) and proton pump inhibitors (adjusted HR 1.36). Never stop a prescribed medicine without advice. <sup class="c" data-ref="Moon2020Opioids,Lee2014BZD,Dam2016PPI" title="Source 91,260,310">91,260,310</sup>`}];
const EN_EP=['Infections','GI bleeding','Diuretic overdose','Electrolyte disorder','Constipation','Unidentified'],EN_RE=['Electrolyte disorder','Infections','Unidentified','Constipation','Diuretic overdose','GI bleeding'];
const enQ=(P,v)=>[(1-v)*(1-v)*P[0][0]+2*(1-v)*v*P[1][0]+v*v*P[2][0],(1-v)*(1-v)*P[0][1]+2*(1-v)*v*P[1][1]+v*v*P[2][1]];
const enQd=P=>`M${f1(P[0][0])} ${f1(P[0][1])}Q${f1(P[1][0])} ${f1(P[1][1])} ${f1(P[2][0])} ${f1(P[2][1])}`;
function enArms(svg,row,p){
  const N=vb(svg,'440 330','400 330'),s=N?13.5:15,gx=N?16.6:18,gy=N?17.4:19,xs=N?[16,212]:[20,236];let g='';
  [0,1].forEach(a=>{const v=a?row.b:row.a,k=Math.round(v*p),x=xs[a],col=a?'var(--rx)':'var(--bad)';
    g+=`<text x="${x}" y="20" class="t-lbl">${row.arms[a]}</text>`;
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10);g+=person(x+c*gx+s*.3,34+r*gy,s,i<k?col:'var(--line)')}
    g+=`<text x="${x}" y="${34+10*gy+34}" class="t-big" style="font-size:28px;fill:${col}">${(v*p).toFixed(1)}%</text>`});
  g+=`<text x="${N?200:220}" y="${34+10*gy+60}" class="t-sm t-mid">${row.n}</text>`;
  svg.innerHTML=g}

inits.encephalopathy=()=>{
  const svg=$('#enSvg'),rg=$('#enT'),S=EN_STEPS;
  const lbl=(x,y,t,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}" style="paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round;${st}">${t}</text>`;
  const R=rng(17),DOT=[...Array(16)].map((_,i)=>({r:R(),o:i/16,j:R()*6.28,gx:R(),gy:R()}));
  const BAC=[...Array(12)].map(()=>[R(),R(),R()*180]);
  function lev(t){if(t<.5)return -1;if(t<.64)return lerp(0,1.6,ramp(t,.5,.62));if(t<.86)return lerp(1.6,4.6,ramp(t,.64,.82));return lerp(4.6,.6,ramp(t,.86,.97))}
  const LW={gut:[100,262],gw:[30,170,232,292],liver:[290,116,.82],kid:[398,236,.9],brain:[592,110,1],astro:[604,254,40],meter:[468,206,300],
    P1:[[150,236],[186,172],[238,140]],P2:[[356,96],[452,30],[534,92]],P4:[[302,150],[332,200],[384,226]],P3:[[162,232],[410,190],[540,140]],wh:[20,330,680],
    L:{gut:[30,216],pv:[170,180,'t-end'],liv:[290,68],up:[452,24],sh:[200,252],kid:[398,280]}};
  const LN={gut:[95,214],gw:[25,165,184,244],liver:[285,104,.72],kid:[268,220,.8],brain:[180,362,1],astro:[332,370,40],meter:[34,312,420],
    P1:[[136,190],[166,140],[226,118]],P2:[[344,92],[392,258],[250,318]],P4:[[282,140],[276,178],[270,196]],P3:[[96,252],[96,300],[140,326]],wh:[10,476,380],
    L:{gut:[25,172],pv:[150,140,'t-end'],liv:[285,60],up:[392,190,'t-end'],sh:[112,278],kid:[296,248]}};
  function gut(L,treat,t){const [x0,x1,y0,y1]=L.gw;let g='';const w=x1-x0,rows=[y0+12,y0+38];
    rows.forEach((y,k)=>{const d=`M${x0} ${y}q${f1(w/8)} ${k?18:-18} ${f1(w/4)} 0t${f1(w/4)} 0t${f1(w/4)} 0t${f1(w/4)} 0`;
      g+=`<path d="${d}" style="fill:none;stroke:var(--brain-line);stroke-width:19;stroke-linecap:round;opacity:.55"/><path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:15;stroke-linecap:round"/>`});
    const nb=Math.round(12*(1-.6*treat));
    BAC.slice(0,nb).forEach(([a,b,ang],i)=>{const x=x0+8+a*(w-16),y=rows[i%2]+(b-.5)*6+Math.sin(t*40+i)*1.2;g+=`<rect x="${f1(x-4)}" y="${f1(y-1.4)}" width="8" height="2.8" rx="1.4" transform="rotate(${f1(ang)} ${f1(x)} ${f1(y)})" style="fill:var(--stellate)"/>`});
    return g}
  function astro(c,sw,t){const [x,y,r]=c,id='enAstroClip';let g=`<clipPath id="${id}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath><circle cx="${x}" cy="${y}" r="${r}" style="fill:var(--brain);stroke:var(--nh3);stroke-width:1.5"/><g clip-path="url(#${id})">`;
    const br=r*(.2+.2*sw);
    for(let k=0;k<7;k++){const a=k/7*6.283+.3,l=r*.85;g+=`<path d="M${f1(x)} ${f1(y)}Q${f1(x+Math.cos(a+.25)*l*.55)} ${f1(y+Math.sin(a+.25)*l*.55)} ${f1(x+Math.cos(a)*l)} ${f1(y+Math.sin(a)*l)}" style="fill:none;stroke:var(--nh3);stroke-width:${f1(2.2+sw*1.2)};stroke-linecap:round;opacity:.75"/>`}
    g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(br)}" style="fill:var(--nh3-soft);stroke:var(--nh3);stroke-width:1.4"/>`;
    for(let k=0;k<Math.round(sw*7);k++){const a=k*.9,d=br*.55;g+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" r="1.8" style="fill:var(--nh3-fill)"/>`}
    if(sw>.15)for(let k=0;k<4;k++){const a=k/4*6.283+.8,u=(t*8+k/4)%1,d=lerp(r*.95,br+3,u),px=x+Math.cos(a)*d,py=y+Math.sin(a)*d;g+=`<path d="M${f1(px)} ${f1(py-3.5)}q3 3.5 0 6q-3 -2.5 0 -6Z" style="fill:var(--fluid-fill);opacity:${f1(sw)}"/>`}
    return g+'</g>'+lbl(x,y+r+12,sw>.15?'astrocyte swelling':'astrocyte','t-xs t-mid')}
  function draw(t){
    const N=vb(svg,'720 380','400 536'),L=N?LN:LW,p=phaseOf(S,t),lv=lev(t),fog=lv<0?0:clamp((lv+.4)/5),treat=ramp(t,.86,.95);
    const fib=4*ramp(t,.34,.46),shunt=ramp(t,.36,.46),byp=.75*ramp(t,.36,.48),prod=ramp(t,0,.12)*(1-.55*treat);
    let s='';
    /* vessels */
    s+=`<path d="${enQd(L.P1)}" style="fill:none;stroke:var(--portal);stroke-width:7;stroke-linecap:round;opacity:.8"/>`;
    s+=`<path d="${enQd(L.P2)}" style="fill:none;stroke:var(--artery);stroke-width:5;stroke-linecap:round;opacity:${f1(.25+.6*ramp(t,.36,.46))}"/>`;
    s+=`<path d="${enQd(L.P4)}" style="fill:none;stroke:var(--good);stroke-width:3;stroke-dasharray:4 4;opacity:${f1(.8-.5*byp)}"/>`;
    if(shunt>0)s+=`<path d="${enQd(L.P3)}" style="fill:none;stroke:var(--portal);stroke-width:5;stroke-dasharray:7 4;stroke-linecap:round;opacity:${f1(shunt*.85)}"/>`;
    /* organs */
    s+=gut(L,treat,t);
    s+=liver(L.liver[0],L.liver[1],L.liver[2],{fib,gb:false,seed:11}).svg;
    s+=kidney(L.kid[0],L.kid[1],L.kid[2],{});
    s+=brain(L.brain[0],L.brain[1],L.brain[2],{fog,seed:5}).svg;
    const sw=lv<0?ramp(t,.44,.5)*.12:clamp((lv+.6)/5.2);
    s+=astro(L.astro,sw,t);
    /* ammonia and urea */
    const nA=Math.round(16*prod);
    DOT.slice(0,nA).forEach((d,i)=>{
      if(t<.15){const [x0,x1,y0,y1]=L.gw,x=x0+10+d.gx*(x1-x0-20),y=y0+8+d.gy*(y1-y0-16)-((t*30+d.o)%1)*8;s+=nh3(x,y,{r:4});return}
      const ph=(t*9+d.o)%1;let pt,urea=false;
      if(d.r<byp*.45)pt=enQ(L.P3,ph);
      else if(d.r<byp)pt=ph<.5?enQ(L.P1,ph*2):enQ(L.P2,(ph-.5)*2);
      else if(ph<.5)pt=enQ(L.P1,ph*2);else{pt=enQ(L.P4,(ph-.5)*2);urea=true}
      s+=urea?`<circle cx="${f1(pt[0])}" cy="${f1(pt[1])}" r="3.2" style="fill:var(--good);stroke:var(--panel);stroke-width:1"/>`:nh3(pt[0],pt[1],{r:4})});
    /* labels */
    const LL=L.L;s+=lbl(LL.gut[0],LL.gut[1],t<.5||treat>0?'gut bacteria':'gut','t-xs','fill:var(--stellate);font-weight:700')+lbl(LL.pv[0],LL.pv[1],'portal vein','t-xs '+(LL.pv[2]||''));
    s+=lbl(LL.liv[0],LL.liv[1],fib>2?'scarred liver':'liver','t-xs t-mid')+lbl(LL.kid[0],LL.kid[1],'urea','t-xs t-mid','fill:var(--good)');
    if(t>.34)s+=lbl(LL.up[0],LL.up[1],'to the brain','t-xs '+(LL.up[2]||'t-mid'),'fill:var(--artery)');
    if(shunt>.3)s+=lbl(LL.sh[0],LL.sh[1],'bypass vein (shunt)','t-xs','fill:var(--portal)');
    s+=lbl(L.brain[0],L.brain[1]-66,'brain','t-xs t-mid');
    /* blood ammonia meter */
    const [mx,m0,m1]=L.meter,lvl=clamp(.16+.72*(byp/.75)*(1-.55*treat)),H=m1-m0;
    s+=lbl(mx+7,m0-8,'blood NH₃','t-xs t-mid','font-weight:700;fill:var(--ink)');
    s+=`<rect x="${mx}" y="${m0}" width="14" height="${H}" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${mx}" y="${f1(m1-H*lvl)}" width="14" height="${f1(H*lvl)}" rx="7" style="fill:var(--nh3-fill)"/>`;
    s+=`<line x1="${mx-3}" x2="${mx+17}" y1="${f1(m1-H*.16)}" y2="${f1(m1-H*.16)}" style="stroke:var(--good);stroke-width:2"/>`+lbl(mx+21,m1-H*.16+3,'35–50 µM','t-xs','fill:var(--good)');
    /* West Haven bar */
    const [wx,wy,ww]=L.wh,sg=ww/5,cur=lv<0?-1:Math.min(4,Math.floor(lv));
    s+=lbl(wx,wy-14,'COVERT','t-xs','font-weight:700;fill:var(--nh3)')+lbl(wx+sg*2,wy-14,'OVERT','t-xs','font-weight:700;fill:var(--bad)');
    s+=`<path d="M${wx} ${wy-8}V${wy-4}H${f1(wx+sg*2-4)}V${wy-8}M${f1(wx+sg*2)} ${wy-8}V${wy-4}H${f1(wx+ww)}V${wy-8}" style="fill:none;stroke:var(--muted);stroke-width:1"/>`;
    EN_WH.forEach((w,i)=>{const on=i===cur,x=wx+i*sg;s+=`<rect x="${f1(x+1)}" y="${wy}" width="${f1(sg-2)}" height="24" rx="5" style="fill:${on?(i<2?'var(--nh3)':'var(--bad)'):i<2?'var(--nh3-soft)':'var(--bad-soft)'};stroke:${i<2?'var(--nh3)':'var(--bad)'};stroke-width:${on?1.6:.6}"/><text x="${f1(x+sg/2)}" y="${wy+16}" class="t-xs t-mid" style="font-weight:700;fill:${on?'var(--panel)':'var(--ink)'}">${N?w.s:w.n}</text>`});
    if(lv>=0){const mxp=wx+clamp(lv/5)*ww;s+=`<path d="M${f1(mxp-6)} ${wy+36}L${f1(mxp+6)} ${wy+36}L${f1(mxp)} ${wy+27}Z" style="fill:var(--ink)"/>`}
    s+=lbl(wx+ww,wy+46,lv<0?'no HE yet':'West Haven grade (marker schematic)','t-xs t-end');
    svg.innerHTML=s;setSt(p);
    const nhw=t<.17?'made in the gut':t<.34?'low (cleared by the liver)':treat>.3?'falling':byp>.4?'high':'rising';
    $('#enRead').innerHTML=`<span>step <b>${p+1}/6</b></span><span>blood ammonia <b>${nhw}</b></span><span>West Haven <b>${cur<0?'no HE':EN_WH[cur].n+' ('+EN_WH[cur].g+')'}</b></span>`;
    $('#enNote').innerHTML=noteHTML(S[p])+(cur>=0?`<div class="kv"><div><dt>${EN_WH[cur].n} · ${EN_WH[cur].g}, as published</dt><dd>${EN_WH[cur].d}. <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup></dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#enPlay'),draw,28000,'Replay','encephalopathy');
  const setSt=stepWire($('#enSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- lactulose and rifaximin toggles ---- */
  const ms=$('#enMech'),mt=$('#enMt'),bl=$('#enLac'),br=$('#enRif'),RM2=rng(5);
  const MB=[...Array(18)].map(()=>[RM2(),RM2(),RM2()*180]),MN=[...Array(14)].map((_,i)=>({o:i/14,r:RM2(),b:i}));
  function drawMech(t){const N=vb(ms,'440 300','400 300'),W=N?380:420,lac=bl.getAttribute('aria-pressed')==='true',rif=br.getAttribute('aria-pressed')==='true';
    const sp=lac?2.4:1,cross=lac?.35:.7,nb=rif?6:18,nn=rif?6:14,x0=20,top=78,bot=196;let g='';
    g+=`<rect x="${x0}" y="28" width="${W-x0}" height="28" rx="8" style="fill:var(--portal-soft);stroke:var(--portal)"/>`+lbl(x0+6,46,'portal blood → liver','t-xs','fill:var(--portal);font-weight:700');
    g+=`<rect x="${x0}" y="${top-6}" width="${W-x0}" height="${bot-top+12}" rx="14" style="fill:var(--panel-2);stroke:var(--brain-line);stroke-width:1.4"/>`;
    g+=`<line x1="${x0+10}" x2="${W-10}" y1="${top-6}" y2="${top-6}" style="stroke:var(--brain-line);stroke-width:3;stroke-dasharray:6 5"/>`+lbl(x0+8,top+10,'bowel wall','t-xs');
    for(let k=0;k<5;k++){const y=top+22+k*22,x=x0+((t*120*sp+k*70)%(W-x0-30))+10;g+=`<path d="M${f1(x)} ${y}h16l-4 -3m4 3l-4 3" style="fill:none;stroke:var(--muted);stroke-width:1;opacity:.5"/>`}
    MB.slice(0,nb).forEach(([a,b,ang],i)=>{const x=x0+14+((a*(W-x0-28)+t*60*sp)%(W-x0-28)),y=top+18+b*(bot-top-26);g+=`<rect x="${f1(x-6)}" y="${f1(y-2)}" width="12" height="4" rx="2" transform="rotate(${f1(ang)} ${f1(x)} ${f1(y)})" style="fill:var(--stellate)"/>`});
    let up=0;
    MN.slice(0,nn).forEach((d,i)=>{const bb=MB[d.b%nb],ph=(t*5+d.o)%1,bx=x0+14+((bb[0]*(W-x0-28)+t*60*sp)%(W-x0-28)),by=top+18+bb[1]*(bot-top-26);
      if(d.r<cross){up++;const y=ph<.6?lerp(by,top-6,ph/.6):42,x=ph<.6?bx:bx+(ph-.6)*180;if(x<W-8)g+=nh3(x,y,{r:4.4})}
      else{const x=bx+ph*200*sp;if(x<W-8)g+=nh3(x,by,{r:4.4})}});
    g+=lbl(W,bot+22,'out with the stool →','t-xs t-end','font-weight:700');
    const reach=(rif?.45:1)*(lac?.5:1);
    g+=lbl(x0,236,'ammonia reaching the blood (schematic)','t-xs','font-weight:700;fill:var(--ink)');
    g+=`<rect x="${x0}" y="244" width="${W-x0}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${x0}" y="244" width="${f1((W-x0)*reach)}" height="12" rx="6" style="fill:var(--nh3-fill)"/>`;
    g+=lbl(x0,278,lac&&rif?'both on: more out in the stool, fewer bacteria':lac?'lactulose: contents move out faster':rif?'rifaximin: fewer bacteria in the gut':'no treatment: bacteria make ammonia; much crosses the wall','t-xs');
    ms.innerHTML=g;
    $('#enMechNote').innerHTML=`<div class="expl">${lac||rif?'':'Press <b>Lactulose</b> or <b>Rifaximin</b> to see what each changes. '}${lac?'<b>Lactulose</b> is a syrup that helps the bowel move ammonia out; the usual aim, as published, is 2 to 3 soft bowel movements a day. The US label reports blood ammonia lowered "by 25 to 50%" and a clinical response in "about 75% of patients". <sup class="c" data-ref="Vilstrup2014HE,FDA-Enulose" title="Source 131,485">131,485</sup> ':''}${rif?'<b>Rifaximin</b> is an antibiotic tablet that acts mostly in the gut, where bacterial urease is one source of ammonia; in one trial it halved repeat episodes when added to lactulose. <sup class="c" data-ref="Bass2010Rifaximin,Rose2020" title="Source 27,392">27,392</sup>':''} The bars and molecule counts are schematic.</div>`}
  playWire(mt,$('#enMPlay'),drawMech,14000,'Replay','encephalopathy');
  [bl,br].forEach(b=>b.addEventListener('click',()=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');drawMech(+mt.value)}));
  drawMech(+mt.value);

  /* ---- trial arrays ---- */
  const ts=$('#enTrialSvg');let tc=0,tstop=null;
  const tcap=()=>{$('#enTrialCap').innerHTML=EN_TR[tc].cap};
  $$('#m-encephalopathy [data-tr]').forEach(b=>b.addEventListener('click',()=>{tc=+b.dataset.tr;$$('#m-encephalopathy [data-tr]').forEach(o=>o.setAttribute('aria-pressed',o===b));tcap();tstop&&tstop();tstop=animate(700,p=>enArms(ts,EN_TR[tc],ease(p)))}));
  enArms(ts,EN_TR[0],1);tcap();

  /* ---- precipitants ---- */
  const pcs=$('#enPcSvg'),boxes=$$('#m-encephalopathy [data-pc]');
  function drawPc(){const N=vb(pcs,'440 250','400 250'),on=boxes.filter(b=>b.checked).map(b=>+b.dataset.pc),hit=new Set(on.map(i=>EN_PC[i].n).filter(Boolean));
    const xl=N?14:20,xr=N?250:286,y0=50,dy=28;let g=lbl(xl,20,'EPISODIC OVERT HE','t-xs','font-weight:700;fill:var(--ink)')+lbl(xr,20,'RECURRENT HE','t-xs','font-weight:700;fill:var(--ink)')+lbl(xl,34,'most frequent first','t-xs')+lbl(xr,34,'most frequent first','t-xs');
    EN_EP.forEach((n,i)=>{const j=EN_RE.indexOf(n),h=hit.has(n);g+=`<path d="M${xl+(N?124:136)} ${y0+i*dy-3}C${(xl+xr)/2+30} ${y0+i*dy-3} ${(xl+xr)/2-10} ${y0+j*dy-3} ${xr-6} ${y0+j*dy-3}" style="fill:none;stroke:${h?'var(--accent)':'var(--line)'};stroke-width:${h?2.4:1.2}"/>`});
    const item=(x,y,i,n)=>{const h=hit.has(n);return `<text x="${x}" y="${y}" class="t-xs" style="${h?'fill:var(--accent);font-weight:700':'fill:var(--ink)'}">${i+1}. ${n}</text>`};
    EN_EP.forEach((n,i)=>g+=item(xl,y0+i*dy,i,n));EN_RE.forEach((n,i)=>g+=item(xr,y0+i*dy,i,n));
    g+=lbl(xl,y0+6*dy+4,on.includes(5)?'Sedating medicines: linked to HE in separate cohorts':'AASLD/EASL 2014, Table 3 (order only)','t-xs',on.includes(5)?'fill:var(--accent)':'');
    pcs.innerHTML=g;
    $('#enPcOut').innerHTML=`<div class="kicker">What the sources say</div>`+(on.length?on.map(i=>`<div class="expl"><b>${EN_PC[i].t}.</b> ${EN_PC[i].x}</div>`).join(''):`<p>Tick a possible trigger to read what the guideline and studies say about it.</p>`)+`<div class="hook"><b>Exam hook</b>Episodic overt HE: infections, then GI bleeding, then diuretic overdose. Recurrent HE: electrolyte disorder first. <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup></div>`}
  boxes.forEach(b=>b.addEventListener('change',drawPc));drawPc();

  /* ---- animal naming test ---- */
  const an=$('#enAnt'),asv=$('#enAntSvg'),go=$('#enAntGo'),tap=$('#enAntTap');let tm=null,t0=0,cnt=0;
  const score=n=>n>=15?0:n>=10?1:2;
  function drawAnt(){const N=vb(asv,'440 210','400 210'),n=+an.value,sc=score(n),x0=20,x1=N?380:420,X=v=>lerp(x0,x1,v/30),y=118,cols=['var(--good)','var(--warn)','var(--bad)'];
    let g=`<text x="${x0}" y="34" class="t-big" style="font-size:24px">${n} animal${n===1?'':'s'}</text><text x="${x0}" y="56" class="t-lbl" style="fill:${cols[sc]}">3-level score: ${sc} point${sc===1?'':'s'}</text>`;
    if(tm){const left=Math.max(0,60-Math.floor((Date.now()-t0)/1000));g+=`<text x="${x1}" y="34" class="t-big t-end" style="font-size:24px;fill:var(--accent)">${left} s</text><text x="${x1}" y="56" class="t-xs t-end">say animals aloud, tap +1</text>`}
    [[0,10,2,'bad'],[10,15,1,'warn'],[15,30,0,'good']].forEach(([a,b,p,c])=>{g+=`<rect x="${f1(X(a))}" y="${y-12}" width="${f1(X(b)-X(a))}" height="24" style="fill:var(--${c}-soft);stroke:var(--${c});stroke-width:${p===sc?1.6:.5}"/><text x="${f1((X(a)+X(b))/2)}" y="${y+4}" class="t-xs t-mid" style="fill:var(--${c});font-weight:700">${p} point${p===1?'':'s'}</text>`});
    [0,10,15,20,25,30].forEach(v=>g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y+12}" y2="${y+17}" class="axis"/><text x="${f1(X(v))}" y="${y+29}" class="t-xs t-mid">${v}</text>`);
    g+=`<path d="M${f1(X(n)-7)} ${y-26}L${f1(X(n)+7)} ${y-26}L${f1(X(n))} ${y-14}Z" style="fill:var(--ink)"/>`;
    g+=`<text x="${x0}" y="${y+56}" class="t-xs">fewer than 10 · 10 to 14 · 15 or more animals in 1 minute</text><text x="${x0}" y="${y+70}" class="t-xs">raw count only; the published S-ANT1 adjusts for age and education</text>`;
    asv.innerHTML=g;
    $('#enAntNote').innerHTML=`<div class="kicker">Campagna 2017 · 327 people with cirrhosis plus controls</div><h4>${sc===0?'15 or more: the unimpaired range':sc===1?'10 to 14: borderline':'Fewer than 10: abnormal'}</h4><p>The test is simple: name as many animals as you can in one minute. In the study, a simplified score (S-ANT1), adjusted for age and education, of fewer than 10 animals was abnormal; 15 best separated unimpaired people from those with minimal or grade 1 HE. The three-level score (0 for ≥15, 1 for 10–14, 2 for under 10) predicted the 1-year risk of overt HE and death. <sup class="c" data-ref="Campagna2017ANT" title="Source 60">60</sup></p><div class="pt"><b>In plain words</b>A quick word game can hint at slowed thinking that people do not notice in themselves. Only a clinician can say what a result means. <sup class="c" data-ref="Campagna2017ANT,Vilstrup2014HE" title="Source 60,485">60,485</sup></div><div class="hook"><b>Exam hook</b>Animal naming test: &lt;10 animals in 1 minute abnormal; ≥15 unimpaired. The PHES is the paper-and-pencil battery. <sup class="c" data-ref="Campagna2017ANT,Vilstrup2014HE" title="Source 60,485">60,485</sup></div>`}
  function stopT(){if(tm){clearInterval(tm);tm=null}go.textContent='Try it: start 60 seconds';tap.disabled=true;drawAnt()}
  go.addEventListener('click',()=>{if(tm){stopT();return}cnt=0;an.value=0;t0=Date.now();tap.disabled=false;go.textContent='Stop';tm=setInterval(()=>{if(Date.now()-t0>=60000)stopT();else drawAnt()},250);drawAnt()});
  tap.addEventListener('click',()=>{if(!tm)return;cnt=Math.min(30,cnt+1);an.value=cnt;drawAnt()});
  an.addEventListener('input',drawAnt);drawAnt();
  {const prev=onHide.encephalopathy;onHide.encephalopathy=()=>{prev&&prev();stopT()}}
  redraws.encephalopathy=(f=>()=>{f&&f();enArms(ts,EN_TR[tc],1);drawPc();drawAnt()})(redraws.encephalopathy);
};
/* =============== 4.4 Liver cancer surveillance =============== */
const HC_Y=6;/* years on the main timeline */
const HC_STEPS=[
 {from:0,at:.15,k:'Years 0–2 · the background risk',t:'Risk builds year by year',
  txt:`About 1% to 4% of people with cirrhosis develop hepatocellular carcinoma each year <sup class="c" data-ref="Tapper2023JAMA" title="Source 453">453</sup>. In a VA cirrhosis cohort the incidence was 1.3 per 100 patient-years, the rate the icons follow; hepatitis C, hepatitis B, obesity and low platelets were independent predictors <sup class="c" data-ref="Ioannou2007HCC" title="Source 208">208</sup>. AASLD 2023 recommends surveillance once the risk reaches 1.0% a year <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`,
  pt:`People with cirrhosis have a higher chance of liver cancer. Each year a small number of them develop it <sup class="c" data-ref="Tapper2023JAMA" title="Source 453">453</sup>.`,
  hook:`Surveillance threshold (AASLD 2023): HCC risk ≥1.0% a year, which covers Child–Pugh A–B cirrhosis of any cause <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`},
 {from:.34,at:.4,k:'Year 2 · no symptoms',t:'A tumour starts silently',
  txt:`An early liver cancer usually causes no symptoms, which is why surveillance is offered rather than waiting for them. AASLD 2023: "HCC surveillance should be performed using ultrasound and AFP at semiannual (approximately every 6 months) intervals" (Level 2, Strong Recommendation). It does not recommend routine CT- or MRI-based surveillance <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`,
  pt:`An ultrasound, often with an AFP blood test, every 6 months can find liver cancer early, when it is easier to treat <sup class="c" data-ref="Singal2023AASLDHCC,Singal2014PLoSMed" title="Source 427,429">427,429</sup>.`,
  hook:`HCC surveillance = ultrasound ± AFP every 6 months for people with cirrhosis <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`},
 {from:.48,at:.6,k:'Years 3–3.5 · the 6-monthly check',t:'A check finds it while small',
  txt:`No single scan is perfect. In a meta-analysis of 32 studies, ultrasound found HCC at any stage with 84% sensitivity but early-stage HCC with only 47%. Where both were compared, ultrasound plus AFP detected early HCC with 63% sensitivity versus 45% for ultrasound alone <sup class="c" data-ref="Tzartzeva2018" title="Source 472">472</sup>. That is why repeated checks matter: switch between the two buttons above to see one scan miss the tumour and the next one catch it. A new solid lesion of 1 cm or more, or a raised AFP, leads to multiphase CT or contrast MRI <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`,
  pt:`A check can miss a small tumour. Coming back every 6 months gives another chance to find it.`,
  hook:`Early HCC sensitivity: ultrasound alone 45–47%, ultrasound + AFP 63% <sup class="c" data-ref="Tzartzeva2018" title="Source 472">472</sup>.`},
 {from:.66,at:.82,k:'Years 4–5 · without checks',t:'Without checks: found late',
  txt:`Without surveillance the same tumour keeps growing until it causes symptoms, by which time it has often reached an advanced stage. In a Shanghai trial of 18,816 people with hepatitis B or chronic hepatitis, AFP plus ultrasound every 6 months cut HCC mortality by 37%, and resection was possible in 46.5% of screened versus 7.5% of control cancers; 5-year survival was 46.4% versus 0 <sup class="c" data-ref="Zhang2004Screening" title="Source 515">515</sup>. In 47 cohort studies in cirrhosis, surveillance went with early detection (OR 2.08) and longer survival (OR 1.90) <sup class="c" data-ref="Singal2014PLoSMed" title="Source 427">427</sup>.`,
  pt:`When liver cancer is found because it causes symptoms, it is usually bigger and harder to treat.`,
  hook:`Shanghai RCT: 6-monthly AFP + ultrasound reduced HCC mortality by 37% (rate ratio 0.63) <sup class="c" data-ref="Zhang2004Screening" title="Source 515">515</sup>.`},
 {from:.88,at:.97,k:'Year 6 · the stage sets the options',t:'Stage decides the treatment',
  txt:`BCLC 2022 links each stage to treatment and to expected median survival, a population statistic: more than 5 years for BCLC 0/A, 2.5 years for B, 2 years for C and 3 months for D <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>. Early tumours can be removed, ablated or treated with a transplant; intermediate ones with chemoembolisation; advanced ones with systemic therapy, with atezolizumab–bevacizumab as first-choice first line <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>. Explore each stage below.`,
  pt:`Liver cancer found early can often be removed, burned away (ablation) or treated with a transplant. Later stages have medicines that help many people live longer <sup class="c" data-ref="Reig2022BCLC,Finn2020IMbrave150" title="Source 158,374">158,374</sup>.`,
  hook:`BCLC median survival: 0/A >5 years, B 2.5 years, C 2 years, D 3 months <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`}
];
const HC_STAGE=[{n:'0',w:'very early',sv:'> 5 y',m:66},{n:'A',w:'early',sv:'> 5 y',m:66},{n:'B',w:'intermediate',sv:'2.5 y',m:30},{n:'C',w:'advanced',sv:'2 y',m:24},{n:'D',w:'end stage',sv:'3 mo',m:3}];
const HC_BC=[
 {t:'BCLC 0 · very early',def:`A single HCC ≤2 cm without vascular invasion or spread, with preserved liver function and no cancer symptoms <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`,
  rx:[`Ablation or resection: for HCC ≤2 cm they give the same survival benefit; if transplant is not feasible, ablation gives survival similar to resection <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`,
      `In 218 people with a single HCC ≤2 cm treated by radiofrequency ablation, sustained complete response was 97.2% and 5-year survival 68.5% in potentially operable patients <sup class="c" data-ref="Livraghi2008RFA" title="Source 269">269</sup>.`],
  sv:`Expected median survival more than 5 years (population statistic) <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`},
 {t:'BCLC A · early',def:`A single HCC of any size, or up to 3 nodules none larger than 3 cm, without macrovascular invasion or spread, performance status 0 and preserved liver function <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`,
  rx:[`Resection: AASLD 2023 reports 5-year survival above 70% with postoperative mortality below 3% in well-selected people without CSPH; it is generally limited to Child–Turcotte–Pugh A <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`,
      `Ablation: in a trial of 180 people with a solitary HCC ≤5 cm, 4-year survival was 67.9% after ablation versus 64.0% after resection, with fewer complications <sup class="c" data-ref="Chen2006Ablation" title="Source 71">71</sup>. Beyond 2 cm, ablation is less effective and resection is favoured; microwave ablation may be best up to 4 cm <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`,
      `Transplant within the Milan criteria (checker below): median survival of 10 years, and 5-year recurrence about 10% versus 50–60% after resection or ablation <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`],
  sv:`Expected median survival more than 5 years (population statistic) <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`},
 {t:'BCLC B · intermediate',def:`Multifocal HCC beyond BCLC A, with preserved liver function, performance status 0 and no vascular invasion or spread. BCLC 2022 splits it into 3 groups by tumour burden and liver function <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`,
  rx:[`Chemoembolisation (TACE): in a trial of 112 people with Child–Pugh A/B, 1- and 2-year survival was 82% and 63%, versus 63% and 27% with conservative treatment (HR 0.47) <sup class="c" data-ref="Llovet2002TACE" title="Source 271">271</sup>.`,
      `A systematic review of conventional TACE cited by AASLD found an objective response of 52.5% and a median survival of 19.4 months <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`,
      `Some tumours can be downstaged to within Milan, which allows a transplant exception score after 6 months under UNOS criteria <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`],
  sv:`Expected median survival 2.5 years (population statistic) <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`},
 {t:'BCLC C · advanced',def:`Vascular invasion or spread outside the liver, with performance status ≤2 and preserved liver function <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`,
  rx:[`Systemic therapy, with atezolizumab–bevacizumab as first-choice first line. It requires preserved liver function (Child–Pugh A if cirrhosis is present) and no high-risk bleeding signs on upper endoscopy (varices properly treated, no history of variceal bleeding) <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>: see <a href="#portal" data-go="portal">varices</a>.`,
      `IMbrave150 (501 people): HR for death 0.58 versus sorafenib; in the update, median overall survival 19.2 versus 13.4 months <sup class="c" data-ref="Finn2020IMbrave150,Cheng2022IMbrave150" title="Source 74,158">74,158</sup>. Doses as published: atezolizumab 1200 mg plus bevacizumab 15 mg/kg IV every 3 weeks <sup class="c" data-ref="Cheng2022IMbrave150" title="Source 74">74</sup>.`,
      `HIMALAYA (STRIDE: tremelimumab plus durvalumab): median OS 16.43 versus 13.77 months with sorafenib; 48-month OS 25.2% versus 15.1% <sup class="c" data-ref="AbouAlfa2022HIMALAYA,Sangro2024HIMALAYA" title="Source 1,399">1,399</sup>. Earlier, sorafenib (SHARP, 10.7 vs 7.9 months) and lenvatinib (non-inferior, 13.6 vs 12.3 months) <sup class="c" data-ref="Llovet2008SHARP,Kudo2018REFLECT" title="Source 248,272">248,272</sup>.`],
  sv:`Expected median survival 2 years (population statistic) <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`},
 {t:'BCLC D · end stage',def:`Major cancer-related symptoms (performance status above 2) and/or impaired liver function without a transplant option <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`,
  rx:[`Palliative care focuses on physical, spiritual and psychosocial needs for the person and their caregivers. AASLD states it can be considered at any stage of cirrhosis, alongside disease-directed treatment <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`,
      `AASLD notes that only 11% of people with cirrhosis receive specialty palliative care or hospice referrals, often very late <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>. Asking about it early is a reasonable question for any care team.`],
  sv:`Expected median survival 3 months (population statistic) <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`}
];
const HC_IV={
 3:{t:'Every 3 months',txt:`More often is not better: in a randomised trial, quarterly surveillance did not improve on semiannual surveillance <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`,pt:`Extra scans add appointments without finding cancers earlier in a way that helped.`},
 6:{t:'Every 6 months',txt:`AASLD 2023: "HCC surveillance should be performed using ultrasound and AFP at semiannual (approximately every 6 months) intervals" (Level 2, Strong Recommendation) <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>. The Shanghai trial that cut HCC mortality by 37% used a 6-monthly schedule <sup class="c" data-ref="Zhang2004Screening" title="Source 515">515</sup>.`,pt:`Twice a year is the schedule the guidelines recommend.`},
 12:{t:'Every 12 months',txt:`Semiannual surveillance was linked with earlier stage at diagnosis and longer survival than annual surveillance, even after adjusting for lead time (40.3 vs 30 months) <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`,pt:`Once a year leaves a longer gap in which a tumour can grow unseen.`}
};
inits.hcc=()=>{
  const svg=$('#hcSvg'),rg=$('#hcT'),note=$('#hcNote'),rd=$('#hcRead');let mode='usafp',setSt=()=>{};
  /* the illustrative tumour: appears at year 2.2, first visible at 2.8 */
  const ON=2.2,VIS=2.8;
  const tr=y=>y<ON?0:Math.min(22,1.6*Math.exp(.78*(y-ON)));
  const catchY=()=>mode==='us'?3.5:3.0;
  const stage2=y=>y<3.4?0:y<4.1?1:y<4.8?2:3;/* untreated track, schematic */
  const visits=[];for(let v=.5;v<=HC_Y+1e-9;v+=.5)visits.push(v);
  function draw(t){
    const N=vb(svg,'720 430','400 664'),Y=t*HC_Y,ph=phaseOf(HC_STEPS,t);let s='';
    /* ---- icon array: 100 people at 1.3 per 100 patient-years ---- */
    const k=Math.min(100,Math.floor(1.3*Y+.0001)),frac=1.3*Y-k;
    const A=N?{x:28,y:58,dx:19,dy:19}:{x:28,y:66,dx:19,dy:19};
    s+=`<text x="${A.x-8}" y="${A.y-24}" class="t-lbl">100 people with cirrhosis</text>`;
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),j=99-i;/* fill from the bottom right */
      const hit=j<k,glow=j===k&&frac>.5;s+=person(A.x+c*A.dx,A.y+r*A.dy-6,15,hit?'var(--bad)':glow?'var(--accent)':'var(--line)')}
    const cx=N?250:28,cy=N?96:A.y+10*A.dy+28;
    s+=`<text x="${cx}" y="${cy}" class="t-big" style="font-size:30px;fill:var(--bad)">${k}<tspan class="t-sm" style="font-size:12px;fill:var(--muted)"> in 100</tspan></text>`;
    s+=`<text x="${cx}" y="${cy+18}" class="t-sm">have developed HCC</text><text x="${cx}" y="${cy+34}" class="t-sm">after ${f1(Y)} years</text>${N?`<text x="${cx}" y="${cy+50}" class="t-xs">at 1.3 per 100</text><text x="${cx}" y="${cy+62}" class="t-xs">patient-years</text>`:`<text x="${cx}" y="${cy+50}" class="t-xs">at 1.3 per 100 patient-years</text>`}`;
    /* ---- the two tracks ---- */
    const T=N?{x0:20,x1:262,lx:334,y1:348,y2:470,l1:300,l2:422,ls:.5}:{x0:250,x1:560,lx:636,y1:118,y2:238,l1:48,l2:170,ls:.62};
    const X=y=>T.x0+(T.x1-T.x0)*y/HC_Y,cY=catchY(),caught=Y>=cY;
    s+=`<text x="${T.x0}" y="${T.l1}" class="t-lbl">With checks every 6 months</text><text x="${T.x0}" y="${T.l1+15}" class="t-xs">${mode==='us'?'ultrasound alone':'ultrasound + AFP'}</text>`;
    s+=`<text x="${T.x0}" y="${T.l2}" class="t-lbl">Without surveillance</text><text x="${T.x0}" y="${T.l2+15}" class="t-xs">found when it causes symptoms</text>`;
    [T.y1,T.y2].forEach((ty,j)=>{s+=`<line x1="${T.x0}" x2="${T.x1}" y1="${ty}" y2="${ty}" class="axis"/>`;
      for(let y=0;y<=HC_Y;y++)s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${ty-3}" y2="${ty+3}" class="axis"/><text x="${f1(X(y))}" y="${ty+16}" class="t-xs t-mid">${y}</text>`;
      /* tumour-present bar */
      if(Y>ON){const end=j===0&&caught?cY:Math.min(Y,j===1?5.3:HC_Y);s+=`<rect x="${f1(X(ON))}" y="${ty-12}" width="${f1(Math.max(0,X(end)-X(ON)))}" height="5" rx="2" style="fill:var(--bad);opacity:.55"/>`;
        if(Y>ON+.15&&j===1)s+=`<text x="${f1(X(ON))}" y="${ty-16}" class="t-xs" style="fill:var(--bad)">tumour present, unseen</text>`}
      s+=`<circle cx="${f1(X(Math.min(Y,HC_Y)))}" cy="${ty}" r="4" style="fill:var(--ink)"/>`});
    s+=`<text x="${T.x1}" y="${T.y2+30}" class="t-xs t-end">years</text>`;
    /* visits on track 1 */
    visits.forEach(v=>{if(v>Y+1e-9)return;const x=X(v),y=T.y1;
      if(caught&&v>cY)return;
      const miss=mode==='us'&&Math.abs(v-3.0)<.01,hit=Math.abs(v-cY)<.01;
      if(hit){s+=`<circle cx="${f1(x)}" cy="${y}" r="8" style="fill:var(--accent)"/><path d="M${f1(x-4)} ${y}l3 3l5 -6" style="fill:none;stroke:var(--panel);stroke-width:2"/><text x="${f1(x)}" y="${y-20}" class="t-xs t-mid" style="fill:var(--accent);font-weight:700">found</text>`}
      else if(miss){s+=`<circle cx="${f1(x)}" cy="${y}" r="7" style="fill:var(--panel);stroke:var(--bad);stroke-width:1.6"/><path d="M${f1(x-3)} ${y-3}l6 6M${f1(x+3)} ${y-3}l-6 6" style="stroke:var(--bad);stroke-width:1.6"/><text x="${f1(x)}" y="${y-20}" class="t-xs t-mid" style="fill:var(--bad)">missed</text>`}
      else s+=`<circle cx="${f1(x)}" cy="${y}" r="5" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.6"/>`});
    /* livers with the tumour */
    const r1=caught?tr(cY)*(1-ramp(Y,cY+.1,cY+.6)):tr(Y),r2=tr(Math.min(Y,5.3));
    [[T.y1,r1],[T.y2,r2]].forEach(([ty,r],j)=>{const lv=liver(T.lx,ty-8,T.ls,{fib:3.3,gb:false,seed:11});s+=lv.svg;
      if(r>.3){const tx=T.lx-14*T.ls*2,tyy=ty-12;s+=`<circle cx="${f1(tx)}" cy="${f1(tyy)}" r="${f1(Math.max(3.5,r*T.ls*1.8))}" style="fill:var(--bile);stroke:var(--bad);stroke-width:2.2"/>`;
        if(j===1&&Y>=4.8){s+=`<path d="M${f1(tx+r*.6)} ${f1(tyy+r*.4)}q14 10 22 26" style="fill:none;stroke:var(--bad);stroke-width:2;stroke-dasharray:3 2"/><circle cx="${f1(tx+r*.6+24)}" cy="${f1(tyy+r*.4+28)}" r="3" style="fill:var(--bad)"/>`}}
      if(j===0&&caught&&Y>cY+.1)s+=`<text x="${T.lx}" y="${ty+30}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">treated early</text>`;
      if(j===1&&Y>=5.3)s+=`<text x="${T.lx}" y="${ty+30}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">symptoms: found</text>`});
    /* ---- BCLC strip ---- */
    const B=N?{x:16,y:548,w:368,h:58}:{x:250,y:322,w:450,h:58};
    const bw=(B.w-16)/5,s1=caught?(cY<3.2?0:1):null,s2=Y>ON?stage2(Math.min(Y,5.3)):null;
    s+=`<text x="${B.x}" y="${B.y-12}" class="t-sm" style="fill:var(--ink);font-weight:700">BCLC stage · expected median survival</text>`;
    HC_STAGE.forEach((S,i)=>{const x=B.x+i*(bw+4),a=i===s1,b=i===s2&&Y>=3;
      s+=`<rect x="${f1(x)}" y="${B.y}" width="${f1(bw)}" height="${B.h}" rx="8" style="fill:${a?'var(--accent-soft)':b?'var(--bad-soft)':'var(--panel-2)'};stroke:${a?'var(--accent)':b?'var(--bad)':'var(--line)'};stroke-width:${a||b?2:1}"/>`;
      s+=`<text x="${f1(x+bw/2)}" y="${B.y+22}" class="t-big t-mid" style="font-size:19px">${S.n}</text><text x="${f1(x+bw/2)}" y="${B.y+36}" class="t-xs t-mid">${S.w}</text><text x="${f1(x+bw/2)}" y="${B.y+50}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${S.sv}</text>`;
      if(a)s+=`<path d="M${f1(x+bw/2-7)} ${B.y-4}h14l-7 7z" style="fill:var(--accent)"/>`;
      if(b)s+=`<path d="M${f1(x+bw/2-7)} ${B.y+B.h+11}h14l-7 -7z" style="fill:var(--bad)"/>`});
    s+=`<text x="${B.x}" y="${B.y+B.h+26}" class="t-xs"><tspan style="fill:var(--accent)">▲ with checks</tspan>   <tspan style="fill:var(--bad)">▼ without surveillance</tspan>${N?'':'   survival: population medians, BCLC 2022'}</text>`+(N?`<text x="${B.x}" y="${B.y+B.h+40}" class="t-xs">survival: population medians, BCLC 2022</text>`:'');
    svg.innerHTML=s;
    rd.innerHTML=`<span>Year <b>${f1(Y)}</b></span><span>With checks <b>${Y<ON?'no tumour':!caught?(Y>=VIS?'tumour visible, not yet found':'tumour too small to see'):'found at BCLC '+HC_STAGE[s1].n}</b></span><span>Without <b>${Y<ON?'no tumour':Y<5.3?'growing unseen':'found at BCLC C'}</b></span>`;
    note.innerHTML=noteHTML(HC_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#hcPlay'),draw,22000,'Replay','hcc');
  setSt=stepWire($('#hcSteps'),HC_STEPS,rg,draw,stop);
  $$('[data-hm]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.hm;$$('[data-hm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- why every 6 months ---------- */
  const iv=$('#hcIvSvg'),ivn=$('#hcIvNote');let curV=6;
  function drawIv(){let s='';const x0=78,x1=384,X=m=>x0+(x1-x0)*m/36;
    [3,6,12].forEach((m,i)=>{const y=40+i*44,on=m===curV;
      s+=`<text x="10" y="${y+4}" class="t-sm" style="${on?'fill:var(--ink);font-weight:700':''}">${m} months</text><line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" class="axis"/>`;
      for(let v=0;v<=36;v+=m)s+=`<circle cx="${f1(X(v))}" cy="${y}" r="${on?5:3.5}" style="fill:${on?'var(--accent)':'var(--muted)'};opacity:${on?1:.5}"/>`});
    [0,12,24,36].forEach(v=>{s+=`<text x="${f1(X(v))}" y="160" class="t-xs t-mid">${v?v/12+' y':'0'}</text>`});
    iv.innerHTML=s;const D=HC_IV[curV];ivn.innerHTML=noteHTML({k:'Surveillance interval',t:D.t,txt:D.txt,pt:D.pt})}
  $$('[data-iv]').forEach(b=>b.addEventListener('click',()=>{curV=+b.dataset.iv;$$('[data-iv]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawIv()}));
  drawIv();

  /* ---------- BCLC stage selector ---------- */
  const bs=$('#hcBc'),bn=$('#hcBcNote');let curB=0;
  const NOD=[[[-30,-6,8]],[[-30,-6,16]],[[-44,-14,9],[-12,4,8],[20,-18,7],[-54,10,6],[34,-6,6]],[[-36,-8,12],[6,0,9],[30,-16,7]],[[-38,-10,13],[4,2,10],[30,-16,8],[-58,10,7]]];
  function drawB(){const N=vb(bs,'520 300','400 360');let s='';
    const L=N?{x:200,y:120,s:1.35}:{x:130,y:130,s:1.25};
    const lv=liver(L.x,L.y,L.s,{fib:3.3,gb:false,seed:5});s+=lv.svg;
    if(curB>=3){/* tumour into the portal vein and spread beyond the liver */
      s+=`<path d="M${f1(L.x-10*L.s)} ${f1(L.y+30*L.s)}Q${f1(L.x-4*L.s)} ${f1(L.y+60*L.s)} ${f1(L.x+20*L.s)} ${f1(L.y+70*L.s)}" style="fill:none;stroke:var(--portal);stroke-width:${f1(6*L.s*.7)};stroke-linecap:round"/><path d="M${f1(L.x-10*L.s)} ${f1(L.y+30*L.s)}Q${f1(L.x-6*L.s)} ${f1(L.y+46*L.s)} ${f1(L.x)} ${f1(L.y+52*L.s)}" style="fill:none;stroke:var(--bad);stroke-width:${f1(3.4*L.s*.7)};stroke-linecap:round"/>`;
      s+=`<text x="${f1(L.x+24*L.s)}" y="${f1(L.y+74*L.s)}" class="t-xs">tumour in the portal vein</text>`;
      [[86,-40],[96,-28],[80,-24]].forEach(([a,b])=>{s+=`<circle cx="${f1(L.x+a*L.s)}" cy="${f1(L.y+b*L.s)}" r="3.5" style="fill:var(--bad)"/>`});
      s+=`<text x="${f1(L.x+80*L.s)}" y="${f1(L.y-48*L.s)}" class="t-xs t-mid">spread</text>`}
    NOD[curB].forEach(([a,b,r])=>{s+=`<circle cx="${f1(L.x+a*L.s)}" cy="${f1(L.y+b*L.s)}" r="${f1(r*L.s)}" style="fill:var(--bile);stroke:var(--bad);stroke-width:2.4"/>`});
    if(curB<=1){const [a,b,r]=NOD[curB][0],tx=L.x+a*L.s,ty=L.y+b*L.s;s+=`<path d="M${f1(tx-r*L.s*.7)} ${f1(ty+r*L.s*.7)}L${f1(tx-30)} ${f1(ty+64)}" style="stroke:var(--ink);stroke-width:1.2"/><text x="${f1(tx-30)}" y="${f1(ty+76)}" class="t-sm t-mid" style="fill:var(--ink)">${curB?'single tumour':'single tumour ≤2 cm'}</text>`}
    if(curB===4)s+=`<text x="${f1(L.x)}" y="${f1(L.y-60*L.s)}" class="t-xs t-mid" style="fill:var(--bad)">impaired liver function or major symptoms</text>`;
    /* survival bars */
    const by=N?250:226,bx=N?90:330,bw=N?250:140,mx=66;
    if(!N)s+=`<text x="${bx-70}" y="${by-104}" class="t-sm" style="fill:var(--ink);font-weight:700">median survival</text>`;
    else s+=`<text x="16" y="${by-10}" class="t-sm" style="fill:var(--ink);font-weight:700">median survival (population statistic)</text>`;
    const rows=[['0 / A','> 5 y',66,curB<=1],['B','2.5 y',30,curB===2],['C','2 y',24,curB===3],['D','3 mo',3,curB===4]];
    rows.forEach(([n,l,m,on],i)=>{const y=N?by+6+i*24:by-92+i*24;
      s+=`<text x="${bx-10}" y="${y+12}" class="t-sm t-end" style="${on?'fill:var(--ink);font-weight:700':''}">${n}</text><rect x="${bx}" y="${y}" width="${f1(bw*m/mx)}" height="16" rx="4" style="fill:${on?'var(--accent)':'var(--panel-2)'}"/><text x="${f1(bx+bw*m/mx+6)}" y="${y+12}" class="t-sm" style="${on?'fill:var(--ink);font-weight:700':''}">${l}</text>`});
    if(!N)s+=`<text x="${bx-70}" y="${by+12}" class="t-xs">population statistics, BCLC 2022</text>`;
    bs.innerHTML=s;
    const D=HC_BC[curB];bn.innerHTML=`<div class="kicker">BCLC 2022</div><h4>${D.t}</h4><p>${D.def}</p><ul>${D.rx.map(x=>`<li>${x}</li>`).join('')}</ul><p class="surv">${D.sv}</p>`}
  $$('[data-bc]').forEach(b=>b.addEventListener('click',()=>{curB=+b.dataset.bc;$$('[data-bc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawB()}));
  drawB();

  /* ---------- Milan checker ---------- */
  const mn=$('#hcMn'),ms=$('#hcMs'),mv=$('#hcMv'),mo=$('#hcMsO'),mV=$('#hcMV'),msv=$('#hcMilanSvg');
  function drawM(){const n=+mn.value,sz=+ms.value,inv=mv.checked;mo.textContent=sz.toFixed(1)+' cm';
    const px=15,cols=n===1?[200]:n===2?[120,280]:n===3?[72,200,328]:[60,150,250,340];let s='';
    const lim=n===1?5:3;
    cols.forEach((x,i)=>{const d=i===0?sz:Math.max(.5,sz*(.75-.12*i));
      if(n<=3)s+=`<circle cx="${x}" cy="100" r="${f1(lim*px/2)}" style="fill:none;stroke:var(--good);stroke-width:1.6;stroke-dasharray:5 4"/>`;
      s+=`<circle cx="${x}" cy="100" r="${f1(d*px/2)}" style="fill:var(--bile);stroke:var(--bad);stroke-width:1.8;opacity:.9"/><text x="${x}" y="${f1(100+Math.max(d,n<=3?lim:0)*px/2+14)}" class="t-xs t-mid">${d.toFixed(1)} cm</text>`});
    s+=`<text x="10" y="18" class="t-xs">dashed: Milan limit ${n===1?'5 cm (single tumour)':n<=3?'3 cm each (2–3 tumours)':'none: more than 3 tumours'}</text><line x1="10" x2="${10+px*2}" y1="200" y2="200" style="stroke:var(--ink);stroke-width:2"/><text x="${14+px*2}" y="203" class="t-xs">2 cm</text>`;
    if(inv)s+=`<text x="390" y="203" class="t-xs t-end" style="fill:var(--bad);font-weight:700">macrovascular invasion</text>`;
    msv.innerHTML=s;
    let ok=!inv&&n<=3&&sz<=lim,why=inv?'macrovascular invasion':n>3?'more than 3 tumours':sz>lim?(n===1?'a single tumour larger than 5 cm':'with 2–3 tumours, one is larger than 3 cm'):'';
    mV.className='verdict '+(ok?'yes':'no');mV.textContent=ok?'Within the Milan criteria (as published).':'Beyond the Milan criteria: '+why+'. Wider criteria (UCSF, up-to-seven) and downstaging exist.'}
  [mn,ms,mv].forEach(e=>{e.addEventListener('input',drawM);e.addEventListener('change',drawM)});
  drawM();
  redraws.hcc=(()=>{const prev=redraws.hcc;return()=>{prev&&prev();drawB()}})();
};
/* =============== 4.5 Compensated to decompensated: the course =============== */
/* Main scrubber: the D'Amico 5-stage staircase (25-year inception cohort) with 5-year mortality and 5-year
   transition rates, the compensated/decompensated survival cliff, and ACLF striking from any rung; a
   'cause removed' toggle draws recompensation. Second interactive: ACLF groups as 100-person icon arrays. */
const CO_RUNG=[
 {n:'Stage 1',l1:'Compensated',l2:'no varices',m5:1.5,tr:34.5,y1:'about 1% a year'},
 {n:'Stage 2',l1:'Compensated',l2:'varices',m5:10,tr:42,y1:'about 3% a year'},
 {n:'Stage 3',l1:'Bleeding',l2:'alone',m5:20,tr:65,y1:''},
 {n:'Stage 4',l1:'Ascites, HE',l2:'or jaundice',m5:30,tr:78,y1:'ascites: about 20% at 1 year'},
 {n:'Stage 5',l1:'Further',l2:'events',m5:88,tr:null,y1:''}];
const CO_STEPS=[
 {from:0,at:.08,k:'Stage 1 · compensated',t:'No varices yet',
  txt:`In D'Amico's 25-year inception cohort of 494 people (404 with hepatitis C), stage 1 was compensated cirrhosis without varices: 5-year mortality 1.5%, and 34.5% moved to a later stage within 5 years. <sup class="c" data-ref="DAmico2014APT" title="Source 94">94</sup> The classic review put 1-year mortality at about 1% in this stage. <sup class="c" data-ref="Zipprich2012,DAmico2006" title="Source 93,519">93,519</sup> Compensated means no present or past complications. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`,
  pt:`In the early stage the liver is scarred but still coping, and most people feel well. <sup class="c" data-ref="Gines2021Lancet" title="Source 180">180</sup>`,
  hook:`Median survival is over 12 years in compensated cirrhosis and under 2 years in decompensated cirrhosis. <sup class="c" data-ref="Zipprich2012,DAmico2006" title="Source 93,519">93,519</sup>`},
 {from:.17,at:.25,k:'Stage 2 · compensated',t:'Varices appear',
  txt:`Rising portal pressure opens varices, still without symptoms. 5-year mortality was 10%, and 42% moved on within 5 years. <sup class="c" data-ref="DAmico2014APT" title="Source 94">94</sup> In the 4-stage model, about 3% died each year. <sup class="c" data-ref="Zipprich2012,DAmico2006" title="Source 93,519">93,519</sup> Baveno VII splits compensated cirrhosis by clinically significant portal hypertension, which marks a higher risk of decompensation. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup> In 293 people with compensated cirrhosis, 58% had decompensated by 10 years. <sup class="c" data-ref="Gines1987" title="Source 175">175</sup>`,
  pt:`Swollen veins (varices) can form in the gullet before anything is felt. They are looked for so they can be treated early: see <a href="#portal" data-go="portal">Portal hypertension</a>.`,
  hook:`D'Amico 4-stage 1-year mortality: about 1% (no varices), 3% (varices), 20% (ascites), 57% (bleeding). <sup class="c" data-ref="Zipprich2012,DAmico2006" title="Source 93,519">93,519</sup>`},
 {from:.34,at:.42,k:'Stage 3 · decompensated',t:'Bleeding alone',
  txt:`Crossing the dashed line is the big change: decompensation. In the 5-stage model, a variceal bleed with no other complication carried 20% 5-year mortality, and 65% moved on within 5 years. <sup class="c" data-ref="DAmico2014APT" title="Source 94">94</sup> In a German cohort, 1-year mortality was 21.9% with ascites but 18.1% with bleeding, and ascites stratified risk better. <sup class="c" data-ref="Zipprich2012" title="Source 519">519</sup>`,
  pt:`Bleeding from varices shows as vomiting blood or black, tarry stools. It needs emergency care straight away.`,
  hook:`Baveno VII's three decompensating events: overt ascites, overt HE (West Haven grade II or higher) and variceal bleeding. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`},
 {from:.5,at:.58,k:'Stage 4 · decompensated',t:'Ascites, HE, jaundice',h:'Ascites, encephalopathy or jaundice',
  txt:`A first non-bleeding decompensation carried 30% 5-year mortality, and 78% moved on within 5 years. <sup class="c" data-ref="DAmico2014APT" title="Source 94">94</sup> Median survival after ascites develops is about 1.1 years, and after hepatic encephalopathy 0.92 years. <sup class="c" data-ref="Tapper2023JAMA" title="Source 453">453</sup> In a cohort of 443 people, 1-year mortality was 5.4% in compensated and 20.2% in decompensated cirrhosis. <sup class="c" data-ref="Zipprich2012" title="Source 519">519</sup>`,
  pt:`Fluid in the belly or new confusion means the liver can no longer keep up. Treatment can still help a great deal, and some people later recover a stable state.`,
  hook:`Ascites is the most common first decompensating event (48% in decompensated hepatitis C cirrhosis). <sup class="c" data-ref="Planas2004" title="Source 355">355</sup>`},
 {from:.67,at:.76,k:'Stage 5 · further decompensation',t:'Second event',h:'Further decompensation',
  txt:`Any second decompensating event: 5-year mortality 88% in D'Amico's cohort. <sup class="c" data-ref="DAmico2014APT" title="Source 94">94</sup> Baveno VII describes further decompensation as a stage with even higher mortality than the first, defined by a second portal hypertension-driven event or jaundice, recurrent bleeding, recurrent ascites (3 or more large-volume paracenteses in a year), recurrent encephalopathy, or SBP or HRS-AKI. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`,
  pt:`When problems keep coming back, it is a good time to talk about transplant assessment and about support for symptoms, side by side.`,
  hook:`D'Amico 5-stage 5-year mortality: 1.5%, 10%, 20%, 30% and 88%. <sup class="c" data-ref="DAmico2014APT" title="Source 94">94</sup>`},
 {from:.84,at:.94,k:'Any stage · ACLF',t:'ACLF',h:'Acute-on-chronic liver failure',
  txt:`ACLF can arise in compensated or decompensated cirrhosis. <sup class="c" data-ref="DAmico2018JHep" title="Source 95">95</sup> In CANONIC, 28-day mortality was 33.9% with ACLF at enrolment, 29.7% when it developed during the stay and 1.9% without it; ACLF was most severe in people with no prior decompensation. <sup class="c" data-ref="Moreau2013CANONIC" title="Source 314">314</sup> Across 30 cohorts, ACLF affected 35% of people admitted with decompensated cirrhosis, and pooled 90-day mortality was 58%. Infection was the commonest trigger (35%). <sup class="c" data-ref="Mezzano2022Gut" title="Source 304">304</sup>`,
  pt:`ACLF is a sudden, severe worsening, often set off by an infection, in which other organs such as the kidneys start to fail. It is treated in hospital, often in intensive care.`,
  hook:`CANONIC: ACLF 28-day mortality 33.9% vs 1.9% without ACLF. Globally about 35% of people admitted with decompensated cirrhosis have ACLF. <sup class="c" data-ref="Moreau2013CANONIC,Mezzano2022Gut" title="Source 304,314">304,314</sup>`}];
const CO_CAUSE_COMP=`<p><span class="ev est">Established</span> Removing or suppressing the cause lowers portal pressure (HVPG) in most people and substantially reduces the risk of decompensation. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup> In hepatitis C with advanced fibrosis, 10-year all-cause mortality was 8.9% after SVR vs 26.0% without, and liver failure 2.1% vs 29.9%. <sup class="c" data-ref="vanderMeer2012" title="Source 477">477</sup></p>`;
const CO_CAUSE_DEC=`<p><span class="ev est">Established</span> Baveno VII states that recompensation implies at least partial regression of the structural and functional changes of cirrhosis once the cause is removed. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup> <span class="ev early">Early evidence</span> Published rates vary by cause and definition: 56.2% by 120 weeks with entecavir for hepatitis B, <sup class="c" data-ref="Wang2022Recomp" title="Source 489">489</sup> 33.8% by 5 years with abstinence in alcohol-related cirrhosis (abstinence within a month of decompensation doubled the chance), <sup class="c" data-ref="Hofer2026JHep" title="Source 202">202</sup> and 13% within 24 months of antivirals in decompensated hepatitis C. <sup class="c" data-ref="Goyes2026" title="Source 184">184</sup> Because CSPH may persist, Baveno VII states that non-selective beta-blockers should not be stopped unless CSPH resolves. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup></p>`;
const CO_ACL={
 no:{t:'No ACLF',k:'CANONIC · 28 days',lo:1.9,hi:1.9,lab:'1.9%',
  txt:`Among people admitted with acute decompensation who never developed ACLF, 28-day mortality was 1.9%. <sup class="c" data-ref="Moreau2013CANONIC" title="Source 314">314</sup>`},
 yes:{t:'ACLF at admission',k:'CANONIC · 28 days',lo:33.9,hi:33.9,lab:'33.9%',
  txt:`303 of the 1,343 people had ACLF at enrolment and 112 developed it during the stay. 28-day mortality was 33.9% and 29.7%. People with ACLF were younger, more often had alcohol-related disease and bacterial infections, and had higher white cell counts and C-reactive protein. <sup class="c" data-ref="Moreau2013CANONIC" title="Source 314">314</sup>`},
 g01:{t:'Final grade: none or ACLF-1',k:'Gustot 2015 · 28 days, transplant-free',lo:6,hi:18,lab:'6–18%',
  txt:`ACLF moves. Of 388 people with ACLF, 49.2% resolved or improved, and 81% reached their final grade within 1 week. When the final grade was no ACLF or ACLF-1, 28-day transplant-free mortality was 6–18%. <sup class="c" data-ref="Gustot2015" title="Source 187">187</sup>`},
 g23:{t:'Final grade: ACLF-2 or ACLF-3',k:'Gustot 2015 · 28 days, transplant-free',lo:42,hi:92,lab:'42–92%',
  txt:`When the final grade was ACLF-2 or ACLF-3, 28-day transplant-free mortality was 42–92%. 75% of those who had an early transplant survived at least 1 year. <sup class="c" data-ref="Gustot2015" title="Source 187">187</sup>`},
 glob:{t:'Worldwide, 90 days',k:'Meta-analysis of 30 cohorts',lo:58,hi:58,lab:'58%',
  txt:`Across 30 cohorts (43,206 people with ACLF), pooled 90-day mortality was 58%, highest in South America (73%). Prevalence among admitted people with decompensated cirrhosis was 35%, and 65% in South Asia; kidney dysfunction was the commonest organ failure (49%). Definitions differ between regions, and a global multisociety consensus on definitions was published in 2026. <sup class="c" data-ref="Mezzano2022Gut,ACLFConsensus2026" title="Source 6,304">6,304</sup>`}};

inits.course=()=>{
  const svg=$('#coSvg'),rg=$('#coT'),note=$('#coNote'),cb=$('#coCause');let cause=false;
  const T=(x,y,txt,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  /* where the marker stands: rung index (fractional while climbing) */
  const pos=t=>{const F=CO_STEPS.map(s=>s.from);let r=0;for(let i=1;i<5;i++)r+=ramp(t,F[i]-.05,F[i]);return r};
  function icons(x,y,d,s,n,hi,col,hatch){let g='';for(let i=0;i<100;i++){const px=x+(i%10)*d+d/2,py=y+Math.floor(i/10)*d;
    g+=person(px,py,s,i<n?col:i<hi?hatch:'var(--panel-2)',{op:i>=n&&i<hi?.7:1})}return g}
  let setActive=()=>{};
  function draw(t){const N=vb(svg,'720 380','400 560'),p=phaseOf(CO_STEPS,t),P=CO_STEPS[p],r=pos(t),ri=Math.min(4,Math.round(r)),aclf=p===5;
    const L=N?{x0:20,w:72,base:290,dh:34,h0:66,lx:72,ly:104,ls:.4,ax:228,ay:44}:{x0:28,w:72,base:316,dh:36,h0:70,lx:92,ly:116,ls:.5,ax:244,ay:48};
    const top=i=>L.base-(L.h0+i*L.dh);
    let s=`<defs>${marker('coArG','var(--rx)')}${marker('coArB','var(--bad)')}</defs>`;
    s+=T(N?20:28,28,P.h||P.t,'t-big','font-size:19px')+T(N?20:28,46,P.k,'t-sm');
    /* the liver: more scarred as the stairs rise; regresses part way when the cause is removed */
    s+=liver(L.lx,L.ly,L.ls,{fib:3.3+Math.min(r,4)*.18,regress:cause?.85:0,seed:21,gb:false}).svg;
    s+=T(L.lx,L.ly+(N?34:40),cause?'scar thins, in part':'scarred liver','t-xs t-mid',cause?'fill:var(--rx)':'');
    /* the cliff between compensated and decompensated */
    const cx=L.x0+2*L.w-2;
    s+=`<line x1="${cx}" x2="${cx}" y1="${top(2)-8}" y2="${L.base+38}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:4 4;opacity:.8"/>`;
    s+=T(cx-6,L.base+34,'median survival >12 y','t-xs t-end','fill:var(--ink)')+T(cx+6,L.base+34,'<2 y','t-xs','fill:var(--bad)');
    /* rungs */
    CO_RUNG.forEach((g,i)=>{const x=L.x0+i*L.w,y=top(i),on=i===ri&&!aclf,past=i<r-.01,dec=i>=2;
      s+=`<rect x="${x}" y="${y}" width="${L.w-4}" height="${L.base-y}" rx="6" style="fill:${on?(dec?'var(--accent-soft)':'var(--brand-soft)'):past?'var(--panel-2)':'var(--field)'};stroke:${on?(dec?'var(--accent)':'var(--brand)'):'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=T(x+(L.w-4)/2,y+15,g.n,'t-xs t-mid','fill:var(--ink);font-weight:700')+T(x+(L.w-4)/2,y+28,g.l1,'t-xs t-mid')+T(x+(L.w-4)/2,y+(N?39:40),g.l2,'t-xs t-mid');
      if(!N||L.base-y>60)s+=T(x+(L.w-4)/2,L.base-8,g.m5+'%','t-lbl t-mid',`fill:${dec?'var(--accent)':'var(--brand)'}`);});
    s+=T(L.x0,L.base+18,'compensated','t-xs','fill:var(--brand)')+T(cx+6,L.base+18,'decompensated','t-xs','fill:var(--accent)');
    s+=T(L.x0+5*L.w-4,L.base+18,'5-year mortality','t-xs t-end');
    /* the marker climbs */
    const ix=Math.floor(Math.min(r,4)),fr=Math.min(r,4)-ix,j=Math.min(4,ix+1);
    const mx=lerp(L.x0+ix*L.w+(L.w-4)/2,L.x0+j*L.w+(L.w-4)/2,ease(fr)),my=lerp(top(ix),top(j),ease(fr))-10-bump(fr,0,1)*16;
    if(!aclf)s+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="7" style="fill:var(--ink);stroke:var(--panel);stroke-width:2.4"/>`;
    /* ACLF: from any rung */
    const ao=ramp(t,.82,.88);
    if(ao>0){const bw=N?150:150,bh=N?40:46;s+=`<g style="opacity:${f1(ao)}"><rect x="${L.ax}" y="${L.ay}" width="${bw}" height="${bh}" rx="8" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.6"/>`;
      s+=T(L.ax+bw/2,L.ay+18,'ACLF','t-lbl t-mid','fill:var(--bad)')+T(L.ax+bw/2,L.ay+32,'organ failure, any stage','t-xs t-mid');
      CO_RUNG.forEach((g,i)=>{const x=L.x0+i*L.w+(L.w-4)/2,y=top(i)-2;s+=`<path d="M${f1(x)} ${f1(y)}Q${f1(lerp(x,L.ax+bw/2,.5))} ${f1(Math.min(y,L.ay+bh)-20)} ${f1(L.ax+12+i*(bw-24)/4)} ${f1(L.ay+bh+2)}" style="fill:none;stroke:var(--bad);stroke-width:1.2;stroke-dasharray:3 3;opacity:.7" marker-end="url(#coArB)"/>`});
      s+='</g>'}
    /* cause removed: arrows back down */
    if(cause){[2,3,4].forEach(i=>{const x=L.x0+i*L.w+(L.w-4)/2,y=top(i)-4,tx=L.x0+1*L.w+(L.w-4)/2+((i-3)*10),ty=top(1)-8;
      s+=`<path d="M${f1(x)} ${f1(y)}Q${f1((x+tx)/2)} ${f1(Math.min(y,ty)-(N?24:34)-i*4)} ${f1(tx)} ${f1(ty)}" style="fill:none;stroke:var(--rx);stroke-width:2;opacity:.9" marker-end="url(#coArG)"/>`});
      s+=T(L.x0+L.w-2,top(1)-4,'recompensation','t-xs t-end','fill:var(--rx);font-weight:700')}
    /* right panel */
    const R=N?{x:20,y:362,d:15,s:12,bx:196,w:184}:{x:410,y:96,d:19,s:15,bx:614,w:290};
    if(cause){s+=T(R.x,R.y-10,p<2?'Removing the cause, compensated':'Recompensation after the cause is removed','t-sm','fill:var(--rx)');
      const B=p<2?[['Hep C, 10-y death, no SVR',26.0,'26.0%','var(--scar-line)'],['Hep C, 10-y death, SVR',8.9,'8.9%','var(--rx)'],['Hep C, liver failure, no SVR',29.9,'29.9%','var(--scar-line)'],['Hep C, liver failure, SVR',2.1,'2.1%','var(--rx)']]
        :[['Hep B, entecavir, 120 weeks',56.2,'56.2%','var(--rx)'],['Alcohol, abstinence, 5 years',33.8,'33.8%','var(--rx)'],['Alcohol, abstinence, 2 years',23.4,'23.4%','var(--rx-soft)'],['Hep C, antivirals, 24 months',13,'13%','var(--rx)']];
      const bw=N?250:200;B.forEach(([l,v,lab,c],i)=>{const y=R.y+12+i*(N?40:50);s+=T(R.x,y+8,l,'t-xs','fill:var(--ink)');
        s+=`<rect x="${R.x}" y="${y+14}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${R.x}" y="${y+14}" width="${f1(bw*v/100)}" height="12" rx="6" style="fill:${c};stroke:var(--rx);stroke-width:${c==='var(--rx-soft)'?1:0}"/>`+T(R.x+bw+8,y+24,lab,'t-lbl')});
      s+=T(R.x,R.y+12+4*(N?40:50)+6,p<2?'van der Meer 2012: interferon-treated cohort':'published rates; definitions and follow-up differ','t-xs')}
    else if(aclf){const n=Math.round(33.9*ramp(t,.86,.93));
      s+=T(R.x,R.y-10,'ACLF at admission: deaths by 28 days','t-sm','fill:var(--ink)');
      s+=icons(R.x,R.y,R.d,R.s,n,n,'var(--bad)','var(--bad)');
      const bx=N?R.bx:R.x+10*R.d+14;
      s+=`<text x="${bx}" y="${R.y+(N?34:40)}" class="t-big" style="font-size:${N?30:34}px;fill:var(--bad)">${n}%</text>`+T(bx,R.y+(N?52:60),'CANONIC','t-xs');
      s+=T(bx,R.y+(N?74:90),'no ACLF: 1.9%','t-sm','fill:var(--ink)')+T(bx,R.y+(N?92:110),'worldwide,','t-sm')+T(bx,R.y+(N?106:126),'90 days: 58%','t-sm','fill:var(--ink)')}
    else{const g=CO_RUNG[ri],u=ramp(t,CO_STEPS[ri].from+.01,CO_STEPS[ri].from+.06),n=Math.round(g.m5*u*10)/10,dec=ri>=2,col=dec?'var(--accent)':'var(--brand)';
      s+=T(R.x,R.y-10,`${g.n} · deaths within 5 years, per 100`,'t-sm','fill:var(--ink)');
      s+=icons(R.x,R.y,R.d,R.s,Math.floor(n),Math.ceil(n),dec?'var(--bile)':'var(--brand)',dec?'var(--bile)':'var(--brand)');
      const bx=N?R.bx:R.x+10*R.d+14;
      s+=`<text x="${bx}" y="${R.y+(N?34:40)}" class="t-big" style="font-size:${N?30:34}px;fill:${col}">${n%1?n.toFixed(1):n}%</text>`+T(bx,R.y+(N?52:60),'5-year mortality','t-xs');
      if(g.tr!=null){const bw=N?160:76,by=R.y+(N?80:96);s+=T(bx,by,'move on','t-xs','fill:var(--ink)')+T(bx,by+12,'within 5 years','t-xs');
        s+=`<rect x="${bx}" y="${by+20}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by+20}" width="${f1(bw*g.tr/100*u)}" height="10" rx="5" style="fill:var(--accent)"/>`+T(bx,by+46,g.tr+'%','t-lbl')}
      if(g.y1){const yy=N?R.y+168:R.y+10*R.d+14;s+=T(N?R.x:R.x,yy,`4-stage review: ${g.y1}`,'t-xs')}}
    svg.innerHTML=s;
    note.innerHTML=noteHTML(Object.assign({},P,{t:P.h||P.t,txt:P.txt+(cause?(p<2?CO_CAUSE_COMP:CO_CAUSE_DEC).replace(/^<p>/,'</p><p>').replace(/<\/p>$/,''):'')}));
    setActive(p)}
  const stop=playWire(rg,$('#coPlay'),draw,24000,'Replay','course');
  setActive=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  cb.addEventListener('click',()=>{cause=!cause;cb.setAttribute('aria-pressed',cause);draw(+rg.value)});
  draw(+rg.value);

  /* ACLF icon arrays */
  const as=$('#coAclf'),an=$('#coAclfNote');let ak='yes',shown={lo:0,hi:0},stopA=null;
  function drawA(lo,hi){const N=vb(as,'720 300','400 520'),G=CO_ACL[ak];
    const A=N?{x:20,y:44,d:20,s:16}:{x:28,y:44,d:22,s:18};let s='';
    s+=T(A.x,24,G.t+' · deaths per 100','t-sm','fill:var(--ink)');
    s+=icons(A.x,A.y,A.d,A.s,Math.round(lo),Math.round(hi),'var(--bad)','var(--bad-soft)');
    const bx=N?A.x+10*A.d+16:A.x+10*A.d+20,lab=G.lo===G.hi?f1(lo).replace(/\.0$/,'')+'%':Math.round(lo)+'–'+Math.round(hi)+'%';
    s+=`<text x="${bx}" y="${A.y+34}" class="t-big" style="font-size:${N?26:34}px;fill:var(--bad)">${lab}</text>`+T(bx,A.y+52,G.k.split(' · ')[0],'t-xs')+T(bx,A.y+65,G.k.split(' · ')[1]||'','t-xs');
    if(G.lo!==G.hi){s+=`<rect x="${bx}" y="${A.y+82}" width="12" height="12" rx="2" style="fill:var(--bad)"/>`+T(bx+18,A.y+92,'low end','t-xs')+`<rect x="${bx}" y="${A.y+100}" width="12" height="12" rx="2" style="fill:var(--bad-soft);stroke:var(--bad)"/>`+T(bx+18,A.y+110,'up to high end','t-xs')}
    /* how ACLF evolved (Gustot): always shown */
    const C=N?{x:20,y:330,w:360}:{x:300,y:178,w:390};
    s+=T(C.x,C.y,'How ACLF evolved in 388 people','t-sm','fill:var(--ink)');
    let x=C.x;[[49.2,'resolved or improved','var(--rx)'],[30.4,'steady or fluctuating','var(--bile)'],[20.4,'worsened','var(--bad)']].forEach(([v,l,c],i)=>{const w=C.w*v/100;
      s+=`<rect x="${f1(x)}" y="${C.y+10}" width="${f1(w-2)}" height="22" rx="4" style="fill:${c};opacity:.85"/>`+`<text x="${f1(x+6)}" y="${C.y+25}" style="font:700 11px var(--body);fill:var(--panel)">${v}%</text>`;
      s+=T(N?C.x:x,N?C.y+52+i*16:C.y+48+(i%2)*14,(N?v+'% ':'')+l,'t-xs');x+=w});
    s+=T(C.x,N?C.y+112:C.y+92,'81% reached their final grade within 1 week','t-xs','fill:var(--ink)');
    as.innerHTML=s;an.innerHTML=noteHTML({k:G.k,t:G.t,txt:G.txt,
      pt:ak==='g01'||ak==='g23'?'ACLF often changes over the first week, for better or worse, which is why it is reassessed day by day in hospital.':'ACLF is a medical emergency. Most people with it are cared for in hospital, often in intensive care.',
      hook:'CANONIC 28-day mortality: 33.9% with ACLF at enrolment vs 1.9% without. <sup class="c" data-ref="Moreau2013CANONIC" title="Source 314">314</sup>'})}
  function pick(k){ak=k;$$('[data-acl]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.acl===k));
    if(stopA)stopA();const G=CO_ACL[k],a={...shown};
    stopA=animate(700,q=>{const e=ease(q);shown={lo:lerp(a.lo,G.lo,e),hi:lerp(a.hi,G.hi,e)};drawA(shown.lo,shown.hi)},()=>{stopA=null})}
  $$('[data-acl]').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.acl)));
  shown={lo:CO_ACL.yes.lo,hi:CO_ACL.yes.hi};drawA(shown.lo,shown.hi);
  const prevR=redraws.course;redraws.course=()=>{prevR&&prevR();drawA(shown.lo,shown.hi)};
  const prevH=onHide.course;onHide.course=()=>{prevH&&prevH();if(stopA){stopA();stopA=null}};
};
/* =============== 5.1 Liver transplant =============== */
inits.transplant=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  let donor='dd';
  const STEPS=[
    {from:0,at:.07,k:'Station 1',t:'Referral',
     txt:`Transplant helps most when the liver is sickest. Among 12,996 US waitlist candidates, a deceased donor transplant cut mortality risk by 79% overall (HR 0.21). But at MELD 6–11 and 12–14, recipients had higher first-year mortality than people still waiting (HR 3.64 and 2.35); at MELD 40 the risk was 96% lower. This is the evidence behind referral once MELD reaches the mid-teens. <sup class="c" data-ref="Merion2005" title="Source 302">302</sup>`,
     pt:`A transplant is a big operation with its own risks. It is offered when the danger from the liver disease is greater than the danger of the surgery.`,
     hook:`Merion 2005: below MELD 15, transplant did not improve first-year survival (HR 3.64 at MELD 6–11). <sup class="c" data-ref="Merion2005" title="Source 302">302</sup>`},
    {from:.15,at:.24,k:'Station 2',t:'Evaluation',
     txt:`The team looks at the whole person: liver function and scores, heart and kidneys, any liver cancer against the Milan criteria, strength and frailty, nutrition, and support at home. The Liver Frailty Index combines grip strength, chair stands and balance; added to MELD-Na it predicted 3-month waitlist death better (C-statistic 0.82 vs 0.80). For severe alcohol-associated hepatitis, ACG 2024 asks for rigorous psychosocial evaluation. Goals-of-care discussions should be prioritised too. <sup class="c" data-ref="Lai2017LFI,Mazzaferro1996Milan,Jophlin2024ACG,Rogal2022AASLD" title="Source 219,253,295,387">219,253,295,387</sup>`,
     pt:`Many tests and conversations check that a transplant is safe and likely to work, and that the person has support afterwards.`,
     hook:`Liver Frailty Index = grip strength + chair stands + balance. <sup class="c" data-ref="Lai2017LFI" title="Source 253">253</sup>`},
    {from:.32,at:.42,k:'Station 3',t:'The waiting list',
     txt:`In 2023, 24,492 US adults were on the list at some point and a record 13,954 were newly added. Of adults listed in 2018–2020, after 3 years 58.3% had received a deceased donor liver, 3.3% a living donor liver, 8.6% had died, 22.8% were removed for other reasons and 7.0% were still waiting. Pretransplant mortality fell from 16.9 to 12.9 deaths per 100 patient-years over the decade; it was highest for alcohol-associated hepatitis (29.4) and MASH (16.5). MELD 3.0 replaced MELD-Na for US allocation in July 2023. <sup class="c" data-ref="Kwong2025OPTN" title="Source 250">250</sup>`,
     pt:`Waiting can take a long time, and not everyone reaches a transplant. The sickest people are offered livers first.`,
     hook:`US adults listed 2018–2020, at 3 years: 58.3% deceased donor LT, 3.3% living donor LT, 8.6% died. <sup class="c" data-ref="Kwong2025OPTN" title="Source 250">250</sup>`},
    {from:.5,at:.6,k:'Station 4',t:'Surgery',
     txt:`The scarred liver is removed and the donor liver put in its place. The US performed 10,659 liver transplants in 2023 and 11,458 in 2024, both records. Living donors provided 5.7% of adult and 14.6% of paediatric transplants in 2023. Five-year graft survival was 75.6% for livers donated after circulatory death and 79.2% for brain-death donors. Press <b>Living donor</b> to switch. <sup class="c" data-ref="Kwong2025OPTN,Kwong2026SRTR" title="Source 250,251">250,251</sup>`,
     pt:`The operation swaps the scarred liver for a healthy one, from a person who has died or from a living volunteer.`,
     hook:`Living donors: 5.7% of US adult and 14.6% of paediatric liver transplants (2023). <sup class="c" data-ref="Kwong2025OPTN" title="Source 250">250</sup>`},
    {from:.66,at:.75,k:'Station 5',t:'Recovery and anti-rejection medicine',
     txt:`At discharge in 2023, 66.6% of recipients took tacrolimus + mycophenolate + steroids, 18.7% tacrolimus + mycophenolate and 4.4% tacrolimus + steroids. Acute rejection by 1 year was 20.2% at ages 18–34 and 7.9% at 65 or over. The tacrolimus label carries a boxed warning for serious infections and cancers. <sup class="c" data-ref="Kwong2025OPTN,FDA-Prograf" title="Source 142,250">142,250</sup>`,
     pt:`After a transplant, people take medicines every day to stop the body rejecting the new liver, and have regular blood tests.`,
     hook:`Tacrolimus boxed warning: serious infections and malignancies; avoid grapefruit. <sup class="c" data-ref="FDA-Prograf" title="Source 142">142</sup>`},
    {from:.82,at:.97,k:'Station 6',t:'Years later',
     txt:`For adult deceased donor recipients, 1-year survival was 92.0% for the graft and 93.5% for the patient (2024 report). For those transplanted in 2016–2018, 5-year graft survival ranged from 75.0% (65 and over) to 82.2% (35–49), and patient survival exceeded 75.1% in every age group. For adult living donor transplants, graft failure was 6.6% at 1 year, 21.2% at 5 years and 40.8% at 10 years. <sup class="c" data-ref="Kwong2026SRTR,Kwong2025OPTN" title="Source 250,251">250,251</sup>`,
     pt:`In the US more than 9 in 10 adults are alive one year after a transplant, and about 3 in 4 or more at five years. These are averages for large groups, not a prediction for you.`,
     hook:`US 1-year patient survival after deceased donor LT: 93.5% (2024 report). <sup class="c" data-ref="Kwong2026SRTR" title="Source 251">251</sup>`}];
  const NAMES=['Referral','Evaluation','Waiting list','Surgery','Recovery','Years later'];
  const svg=$('#txSvg'),rg=$('#txT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 560');const p=phaseOf(STEPS,t),u=ramp(t,STEPS[p].from,Math.min(1,STEPS[p].at+.04));let s='';
    /* the path */
    const x0=N?36:60,x1=N?364:660,py=N?40:44,SX=i=>x0+(x1-x0)*i/5;
    s+=`<line x1="${x0}" x2="${x1}" y1="${py}" y2="${py}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    const pos=lerp(p,Math.min(5,p+1),0)+(p<5?ramp(t,STEPS[p].at,(STEPS[p+1]||{from:1}).from)*1:0);
    s+=`<line x1="${x0}" x2="${f1(SX(Math.min(5,pos)))}" y1="${py}" y2="${py}" style="stroke:var(--rx);stroke-width:4;stroke-linecap:round"/>`;
    NAMES.forEach((n,i)=>{const on=i<=p;s+=`<circle cx="${f1(SX(i))}" cy="${py}" r="${i===p?9:6}" style="fill:${on?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:2"/>`+T(SX(i),py+(N?22:24),N?String(i+1):n,'t-xs t-mid',i===p?'fill:var(--ink);font-weight:700':'')});
    s+=person(SX(Math.min(5,pos))-6,py-30,18,'var(--ink)');
    if(N)s+=T(200,py+40,NAMES[p],'t-lbl t-mid');
    const R=N?{x:20,y:100,w:360,h:440}:{x:30,y:88,w:660,h:280};
    if(p===0){/* survival benefit by MELD band: diverging log bars around HR 1 */
      const D=[['MELD 6–11',3.64],['MELD 12–14',2.35],['MELD 18–20',.62],['MELD 40',.04]];
      const cx=N?R.x+R.w*.5:R.x+R.w*.5,sc=N?110:200,L=v=>cx+Math.log10(v)*sc,rowH=N?70:54,top=R.y+(N?70:50);
      s+=N?T(cx,R.y+8,'Risk of death in the first year:','t-sm t-mid','fill:var(--ink)')+T(cx,R.y+24,'recipients vs people still waiting','t-sm t-mid','fill:var(--ink)'):T(cx,R.y+8,'Risk of death in the first year: transplant recipients vs people still waiting','t-sm t-mid','fill:var(--ink)');
      s+=`<line x1="${cx}" x2="${cx}" y1="${top-14}" y2="${top+rowH*4}" style="stroke:var(--ink);stroke-width:1.5"/>`+T(cx,top+rowH*4+14,'HR 1: no difference','t-xs t-mid');
      s+=T(L(.04),top-18,'← transplant lowered risk','t-xs','fill:var(--rx)')+T(L(3.64)+10,top-18,'raised →','t-xs t-end','fill:var(--bad)');
      D.forEach(([n,v],i)=>{const y=top+i*rowH,g=ease(ramp(u,i*.15,i*.15+.45)),xe=lerp(cx,L(v),g),col=v>1?'var(--bad)':'var(--rx)';
        s+=`<rect x="${f1(Math.min(cx,xe))}" y="${y}" width="${f1(Math.abs(xe-cx))}" height="${N?26:30}" rx="4" style="fill:${col};opacity:.85"/>`;
        s+=T(v>1?cx-8:cx+8,y+(N?17:19),n,'t-sm'+(v>1?' t-end':''),'fill:var(--ink)');
        if(g>.9)s+=T(v>1?xe+6:xe-6,y+(N?17:19),'HR '+v,'t-sm'+(v>1?'':' t-end'),`fill:${col};font-weight:700`)});
    }else if(p===1){const items=[['Liver','scores: MELD 3.0 adds sex and albumin','var(--dx)'],['Cancer','Milan: 1 tumour ≤5 cm or ≤3 each ≤3 cm','var(--accent)'],['Strength','Liver Frailty Index: grip, chairs, balance','var(--rx)'],['Heart & kidneys','fit for a long operation?','var(--artery)'],['Mind & support','psychosocial assessment, family, carers','var(--nh3)'],['Goals of care','what matters most, palliative support','var(--portal)']];
      const cols=N?1:2,cw=N?R.w:R.w/2-10,ch=N?62:76;
      items.forEach(([a,b,c],i)=>{const g=ease(ramp(u,i*.1,i*.1+.35));if(g<=0)return;const cx=R.x+(i%cols)*(cw+20),cy=R.y+Math.floor(i/cols)*(ch+(N?8:10));
        s+=`<g style="opacity:${f1(g)}"><rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cw)}" height="${ch}" rx="10" style="fill:var(--panel);stroke:${c};stroke-width:1.6"/><circle cx="${f1(cx+22)}" cy="${f1(cy+ch/2)}" r="10" style="fill:${c}"/><path d="M${f1(cx+17)} ${f1(cy+ch/2)}l4 4l7 -8" style="fill:none;stroke:var(--panel);stroke-width:2.2"/>`+T(cx+42,cy+ch/2-4,a,'t-lbl')+T(cx+42,cy+ch/2+13,b,'t-xs')+'</g>'});
    }else if(p===2){const F=[[58,'var(--rx)','deceased donor liver 58.3%'],[3,'var(--good)','living donor liver 3.3%'],[9,'var(--bad)','died 8.6%'],[23,'var(--muted)','removed, other reasons 22.8%'],[7,'var(--bile)','still waiting 7.0%']];
      const n=Math.round(100*ease(u));const A=N?{x:56,y:R.y+40,dx:29,dy:25,s:20}:{x:R.x+10,y:R.y+30,dx:30,dy:24,s:19};
      s+=T(N?200:R.x+150,R.y+(N?18:12),'100 adults listed 2018–2020, after 3 years','t-sm t-mid','fill:var(--ink)');
      let k=0;const col=[];F.forEach(([c,cl])=>{for(let i=0;i<c;i++)col.push(cl)});
      for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10;s+=person(A.x+c*A.dx,A.y+r*A.dy,A.s,i<n?col[i]:'var(--muted)',{op:i<n?1:.2})}
      const lx=N?40:R.x+340,ly=N?R.y+300:R.y+40;F.forEach(([c,cl,l],i)=>{s+=`<rect x="${lx}" y="${ly+i*24-10}" width="12" height="12" rx="3" style="fill:${cl}"/>`+T(lx+20,ly+i*24,l,'t-sm','fill:var(--ink)')});
      s+=T(lx,ly+5*24+12,'Pretransplant deaths: 12.9 per 100 patient-years','t-xs')+T(lx,ly+5*24+26,'(16.9 a decade earlier)','t-xs');
    }else if(p===3){const cx=N?200:R.x+200,cy=N?R.y+120:R.y+120,k=ease(u);
      const oldX=lerp(cx,cx-(N?150:220),ramp(k,0,.5)),newX=lerp(cx+(N?150:240),cx,ramp(k,.5,1));
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="${N?100:110}" ry="${N?70:76}" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:6 6"/>`+T(cx,cy+(N?92:98),'liver space','t-xs t-mid');
      s+=`<g style="opacity:${f1(1-ramp(k,.35,.55))}">`+liver(oldX,cy,N?.9:1,{fib:4,seed:2}).svg+T(oldX,cy-60,'scarred liver','t-xs t-mid')+'</g>';
      s+=`<g style="opacity:${f1(ramp(k,.45,.6))}">`+liver(newX,cy,N?.9:1,{fib:0,seed:5}).svg+T(newX,cy-60,'donor liver','t-xs t-mid','fill:var(--rx)')+'</g>';
      const dx=N?200:R.x+520,dy=N?R.y+230:R.y+30;
      if(donor==='dd'){s+=`<rect x="${dx-44}" y="${dy}" width="88" height="56" rx="8" style="fill:var(--portal-soft);stroke:var(--portal);stroke-width:1.6"/><rect x="${dx-30}" y="${dy-8}" width="60" height="10" rx="3" style="fill:var(--portal)"/>`+T(dx,dy+34,'organ box','t-xs t-mid','fill:var(--ink)')+T(dx,dy+76,'deceased donor','t-sm t-mid','fill:var(--ink);font-weight:700')+T(dx,dy+94,'5-y graft survival: 79.2% brain death,','t-xs t-mid')+T(dx,dy+108,'75.6% circulatory death','t-xs t-mid');}
      else{s+=person(dx-14,dy-6,46,'var(--rx)')+T(dx,dy+66,'living donor','t-sm t-mid','fill:var(--ink);font-weight:700')+T(dx,dy+84,'5.7% of adult, 14.6% of paediatric','t-xs t-mid')+T(dx,dy+98,'US liver transplants (2023)','t-xs t-mid')+T(dx,dy+112,'659 living donors, 7.5% paired','t-xs t-mid');}
      s+=T(N?200:R.x+520,N?R.y+380:R.y+200,'US liver transplants: 10,659 (2023), 11,458 (2024)','t-sm t-mid','fill:var(--ink)');
    }else if(p===4){const B=N?{x:40,y:R.y+30,w:300}:{x:R.x+20,y:R.y+30,w:360};
      s+=T(B.x,B.y-8,'Immunosuppression at discharge (2023)','t-sm','fill:var(--ink)');
      [['tacrolimus + mycophenolate + steroids',66.6],['tacrolimus + mycophenolate',18.7],['tacrolimus + steroids',4.4]].forEach(([n,v],i)=>{const y=B.y+10+i*44,w=B.w*v/100*ease(ramp(u,i*.12,i*.12+.5));s+=`<rect x="${B.x}" y="${y}" width="${B.w}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${y}" width="${f1(w)}" height="16" rx="4" style="fill:var(--rx)"/>`+T(B.x,y+30,`${v}% ${n}`,'t-xs','fill:var(--ink)')});
      const rx=N?40:R.x+430,ry=N?R.y+190:R.y+30;s+=T(rx,ry-8,'Acute rejection by 1 year','t-sm','fill:var(--ink)');
      [['ages 18–34',20.2],['65 or over',7.9]].forEach(([n,v],i)=>{const y=ry+10+i*44,w=(N?300:200)*v/25*ease(ramp(u,.3+i*.1,.8));s+=`<rect x="${rx}" y="${y}" width="${f1(w)}" height="16" rx="4" style="fill:var(--accent)"/>`+T(rx,y+30,`${v}% ${n}`,'t-xs','fill:var(--ink)')});
      const pxp=N?200:R.x+560,pyp=N?R.y+330:R.y+190;s+=pill(pxp-30,pyp,44,{ang:-20,txt:'Tac'})+pill(pxp+30,pyp+6,40,{ang:15,round:true});s+=T(pxp,pyp+44,'daily, with blood-level checks','t-xs t-mid');
    }else{const C=N?{x:56,y:R.y+30,w:300,h:250}:{x:R.x+50,y:R.y+20,w:400,h:220};
      const X=y=>C.x+C.w*y/10,Y=v=>C.y+C.h-C.h*(v-50)/50;
      s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" style="fill:var(--field)"/>`;
      [50,60,70,80,90,100].forEach(v=>{s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(C.x-5,Y(v)+3,v+'%','t-xs t-end')});
      [0,1,5,10].forEach(y=>{s+=T(X(y),C.y+C.h+15,y,'t-xs t-mid')});s+=T(C.x+C.w,C.y+C.h+30,'years after transplant','t-xs t-end');
      const yr=10*ease(u);
      const series=donor==='dd'?[{n:'patient',col:'var(--rx)',pts:[[0,100],[1,93.5],[5,75.1]],lab:['93.5%',N?'>75.1%, all ages':'over 75.1% in every age group'],dy:[-9,18]},{n:'graft',col:'var(--portal)',pts:[[0,100],[1,92.0],[5,78.6]],lab:['92.0%',N?'75.0–82.2%':'75.0–82.2% by age'],dy:[16,-14],band:[75.0,82.2]}]
        :[{n:'graft (living donor)',col:'var(--rx)',pts:[[0,100],[1,93.4],[5,78.8],[10,59.2]],lab:['failure 6.6%','failure 21.2%','failure 40.8%'],dy:[-9,-9,-9]}];
      series.forEach((S,si)=>{const last=S.pts[S.pts.length-1][0],up=Math.min(yr,last);let d='';const N2=60;
        const at=y=>{for(let i=1;i<S.pts.length;i++)if(y<=S.pts[i][0]){const a=S.pts[i-1],b=S.pts[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return S.pts[S.pts.length-1][1]};
        for(let i=0;i<=N2;i++){const y=up*i/N2;d+=(i?'L':'M')+f1(X(y))+' '+f1(Y(at(y)))}
        if(up>0)s+=`<path d="${d}" style="fill:none;stroke:${S.col};stroke-width:2.6;stroke-linejoin:round"/>`;
        if(S.band&&yr>=5)s+=`<line x1="${f1(X(5))}" x2="${f1(X(5))}" y1="${f1(Y(S.band[1]))}" y2="${f1(Y(S.band[0]))}" style="stroke:${S.col};stroke-width:6;opacity:.35;stroke-linecap:round"/>`;
        S.pts.slice(1).forEach(([y,v],i)=>{if(yr<y-.01)return;s+=`<circle cx="${f1(X(y))}" cy="${f1(Y(v))}" r="5" style="fill:var(--panel);stroke:${S.col};stroke-width:2"/>`+T(X(y)+(y===10?-8:8),Y(v)+S.dy[i],S.lab[i],'t-xs'+(y===10?' t-end':''),`fill:${S.col};font-weight:700`)})});
      const lx=N?40:C.x+C.w+30,ly=N?C.y+C.h+54:C.y+20;
      series.forEach((S,i)=>{s+=`<rect x="${lx}" y="${ly+i*22-9}" width="14" height="4" rx="2" style="fill:${S.col}"/>`+T(lx+20,ly+i*22-3,S.n+' survival','t-sm','fill:var(--ink)')});
      s+=T(lx,ly+56,donor==='dd'?'Adult deceased donor recipients.':'Adult living donor recipients.','t-xs')+T(lx,ly+70,donor==='dd'?'1 year: 2024 report; 5 years:':'Survival drawn from published','t-xs')+T(lx,ly+84,donor==='dd'?'transplanted 2016–2018. The graft':'graft failure at 1, 5 and 10 years.','t-xs')+T(lx,ly+98,donor==='dd'?'line is drawn to the middle of':'','t-xs')+T(lx,ly+112,donor==='dd'?'the age range at 5 years.':'','t-xs');
    }
    svg.innerHTML=s;
    $('#txNote').innerHTML=noteHTML(STEPS[p]);setSt(p);
    $('#txRead').innerHTML=`<span>Station: <b>${p+1} of 6 · ${NAMES[p]}</b></span><span>Donor: <b>${donor==='dd'?'deceased':'living'}</b></span>`;
  }
  const stop=playWire(rg,$('#txPlay'),draw,26000,'Replay','transplant');
  setSt=stepWire($('#txSteps'),STEPS,rg,draw,stop);draw(+rg.value);
  $$('[data-txdonor]').forEach(b=>b.addEventListener('click',()=>{donor=b.dataset.txdonor;$$('[data-txdonor]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));

  /* ---------- MELD bands as icon arrays ---------- */
  const MB=[
    {v:1.9,lab:'1.9 in 100',win:'within 3 months',score:'MELD under 9',src:'3,437 US waitlist adults, 1999–2001',
     txt:`At MELD under 9, 1.9% died within 3 months. Overall, 12% of these 3,437 waitlist adults died within 3 months, and MELD (C-statistic 0.83) predicted it better than Child–Turcotte–Pugh (0.76), which supported MELD-based allocation of donor livers. <sup class="c" data-ref="Wiesner2003" title="Source 496">496</sup>`,
     pt:`With a low score, very few people die while waiting over the next three months.`,hook:`Wiesner 2003: 3-month waitlist mortality 1.9% at MELD <9, 71.3% at MELD ≥40. <sup class="c" data-ref="Wiesner2003" title="Source 496">496</sup>`},
    {v:6,lab:'6 in 100',win:'within 6 months',score:'MELD-Na 20',src:'sodium-adjusted MELD, Biggins 2006',
     txt:`Adding sodium to MELD: scores of 20, 30 and 40 matched 6%, 16% and 37% mortality at 6 months. A low blood sodium adds risk that MELD alone missed: applied to 2006 data, MELD-Na would have ranked 7% of the people who died considerably higher. <sup class="c" data-ref="Biggins2006MELDNa,Kim2008MELDNa" title="Source 40,233">40,233</sup>`,
     pt:`Low blood salt (sodium) is a warning sign in cirrhosis, so it was added to the score.`},
    {v:16,lab:'16 in 100',win:'within 6 months',score:'MELD-Na 30',src:'sodium-adjusted MELD, Biggins 2006',
     txt:`At MELD-Na 30, 16% died within 6 months. MELD 3.0, adopted for US allocation in July 2023, adds female sex and albumin and caps creatinine at 3.0 mg/dL; it discriminated slightly better than MELD-Na (C-statistic 0.869 vs 0.862). <sup class="c" data-ref="Biggins2006MELDNa,Kim2021MELD3,Kwong2025OPTN" title="Source 40,236,250">40,236,250</sup>`,
     pt:`The newer MELD 3.0 score was designed partly so women, who often score lower on creatinine, are not disadvantaged.`,hook:`MELD 3.0 = MELD-Na + female sex + albumin, creatinine capped at 3.0 mg/dL. <sup class="c" data-ref="Kim2021MELD3" title="Source 236">236</sup>`},
    {v:37,lab:'37 in 100',win:'within 6 months',score:'MELD-Na 40',src:'sodium-adjusted MELD, Biggins 2006',
     txt:`At MELD-Na 40, 37% died within 6 months. At these scores transplant brings the largest survival benefit: at MELD 40 a deceased donor transplant lowered the risk of death by 96%. <sup class="c" data-ref="Biggins2006MELDNa,Merion2005" title="Source 40,302">40,302</sup>`,
     pt:`The higher the score, the more urgent the transplant and the more it helps.`},
    {v:71.3,lab:'71.3 in 100',win:'within 3 months',score:'MELD 40 or more',src:'3,437 US waitlist adults, 1999–2001',
     txt:`At MELD 40 or more, 71.3% died within 3 months. MELD cannot accurately predict survival in about 15–20% of patients, which is one reason teams look beyond the number. <sup class="c" data-ref="Wiesner2003,Kamath2007MELD" title="Source 222,496">222,496</sup>`,
     pt:`At the very highest scores most people die within a few months without a transplant.`,hook:`MELD misjudges survival in about 15–20% of patients. <sup class="c" data-ref="Kamath2007MELD" title="Source 222">222</sup>`}];
  const ms=$('#txMeld');let cur=2,shown=MB[2].v,stopA=null;
  function drawM(val){
    const N=vb(ms,'720 270','400 420');const B=MB[cur];let s='';
    const A=N?{x:52,y:40,dx:30,dy:28,s:21}:{x:40,y:30,dx:30,dy:23,s:19};
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,fr=clamp(val-i);const x=A.x+c*A.dx,y=A.y+r*A.dy;
      s+=person(x,y,A.s,'var(--muted)',{op:.28});
      if(fr>0){const id='txc'+i;s+=fr<1?`<clipPath id="${id}"><rect x="${f1(x-A.s*.3)}" y="${f1(y)}" width="${f1(A.s*.6*fr)}" height="${A.s}"/></clipPath><g clip-path="url(#${id})">${person(x,y,A.s,'var(--bad)')}</g>`:person(x,y,A.s,'var(--bad)')}}
    const tx=N?200:560,ty=N?340:80;
    s+=T(tx,ty,B.score,'t-lbl t-mid')+T(tx,ty+(N?34:46),(Math.round(val*10)/10)+' in 100','t-big t-mid','fill:var(--bad);font-size:'+(N?26:32)+'px')+T(tx,ty+(N?52:70),'died '+B.win,'t-sm t-mid','fill:var(--ink)')+T(tx,ty+(N?68:92),B.src,'t-xs t-mid');
    ms.innerHTML=s;
  }
  function setM(i){cur=i;$$('[data-txm]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.txm===i));const from=shown,to=MB[i].v;stopA&&stopA();
    stopA=animate(900,p=>{shown=lerp(from,to,ease(p));drawM(shown)},()=>{shown=to;stopA=null});
    $('#txMeldNote').innerHTML=noteHTML({k:'Published band',t:`${MB[i].score}: ${MB[i].lab} ${MB[i].win}`,txt:MB[i].txt,pt:MB[i].pt,hook:MB[i].hook});
    $('#txMeldCap').innerHTML=`<b>Population statistics.</b> The 3-month figures (MELD) and 6-month figures (MELD-Na) come from different studies and are not directly comparable. A partly filled icon shows a fraction of a person. <sup class="c" data-ref="Wiesner2003,Biggins2006MELDNa" title="Source 40,496">40,496</sup>`;}
  $$('[data-txm]').forEach(b=>b.addEventListener('click',()=>setM(+b.dataset.txm)));
  drawM(shown);setM(2);
  const prevR=redraws.transplant;redraws.transplant=()=>{prevR&&prevR();drawM(shown)};
};
/* =============== 5.2 Nutrition, muscle & medicine safety =============== */
/* the clock runs 08:00 -> 08:00 over t 0..0.84; the last step (t > .86) shows 12 months of night feeding */
const NT_END=.84, NT_H=t=>24*clamp(t/NT_END), NT_T=h=>h/24*NT_END;
const NT_STEPS=[
 {from:0,at:NT_T(2.2),k:'08:00 to 19:30 · the day',t:'Meals every 3 to 4 hours',
  txt:`Through the day each lane eats breakfast, lunch, an afternoon snack and dinner, so the gaps stay short and the body runs on food (green) and briefly on stored liver sugar, glycogen (gold). AASLD 2021: "Fasting time should be minimized, with a maximum interval of 3-4 hours between nutritional intake while awake". <sup class="c" data-ref="Lai2021AASLD" title="Source 255">255</sup> EASL 2019: "Optimal daily energy intake should not be lower than the recommended 35 kcal/kg.BW/d (in non-obese individuals)" and "Optimal daily protein intake should not be lower than the recommended 1.2–1.5 g/kg.BW/d". <sup class="c" data-ref="EASL2019Nutrition" title="Source 107">107</sup> Quoted as published, not as instructions.`,
  pt:`Eating little and often during the day keeps the gaps between meals short.`,
  hook:`EASL 2019 floors: energy 35 kcal/kg/day, protein 1.2–1.5 g/kg/day. AASLD 2021: no more than 3–4 hours between intakes while awake. <sup class="c" data-ref="EASL2019Nutrition,Lai2021AASLD" title="Source 107,255">107,255</sup>`},
 {from:NT_T(11.5),at:NT_T(15.6),k:'19:30 to 01:00 · the evening',t:'The last meal, then the long night',
  txt:`After dinner every lane lives on glycogen. In the healthy liver that store lasts the whole night. With cirrhosis it runs out much sooner: cirrhosis is described as a state of "accelerated starvation", in which the body starts making glucose from other fuels (gluconeogenesis) early after short fasts, and that drives muscle breakdown. <sup class="c" data-ref="Tsien2012,Plank2008" title="Source 357,469">357,469</sup> Malnutrition "has been reported in 20% of patients with compensated cirrhosis and in more than 50% of patients with decompensated liver disease". <sup class="c" data-ref="EASL2019Nutrition" title="Source 107">107</sup> The bottom lane has one more thing to eat at 22:30: a late evening snack.`,
  pt:`For a liver with cirrhosis, a night without food is like a much longer fast than it is for a healthy liver.`,
  hook:`Cirrhosis = "accelerated starvation": gluconeogenesis starts early after short fasts, and muscle pays for it. <sup class="c" data-ref="Tsien2012" title="Source 469">469</sup>`},
 {from:NT_T(17),at:NT_T(20.4),k:'01:00 to 08:00 · overnight',t:'Muscle becomes fuel',
  txt:`In the middle lane the glycogen phase is over and amino acids from muscle are broken down to make glucose: the red stretch, and the muscle circle on the right begins to shrink. Sarcopenia affects "30%-70% of patients with end-stage liver disease"; a meta-analysis of 36 studies (8,821 people) pooled 33%. <sup class="c" data-ref="Lai2021AASLD,Mazeaud2023" title="Source 255,294">255,294</sup> Muscle matters for the brain too: it "houses GS" (glutamine synthetase) and acts as a back-up ammonia sink when the liver cannot clear ammonia, which is why losing muscle raises the risk of <a href="#encephalopathy" data-go="encephalopathy">hepatic encephalopathy</a>. <sup class="c" data-ref="Rose2020" title="Source 392">392</sup>`,
  pt:`When the stored sugar runs out, the body breaks down muscle to make more. Night after night, that wears muscle away.`,
  hook:`Muscle is an alternative ammonia sink (glutamine synthetase), so sarcopenia raises the risk of hepatic encephalopathy. <sup class="c" data-ref="Rose2020" title="Source 392">392</sup>`},
 {from:NT_T(22.4),at:NT_T(24),k:'08:00 · next morning',t:'What the night cost',
  txt:`By breakfast the lane without a late snack spent the longest time burning muscle; the late snack shortened that stretch. One night is exaggerated here so the difference shows. Over months it adds up: sarcopenia independently predicted death on the transplant waiting list (HR 2.36, adjusted for age and MELD), and in 112 people evaluated for transplant median survival was 19 ± 6 months with sarcopenia against 34 ± 11 months without. <sup class="c" data-ref="Tandon2012,MontanoLoza2012" title="Source 308,445">308,445</sup> These are population statistics from those cohorts, not a forecast for any one person.`,
  pt:`A snack before bed and an early breakfast shorten the long overnight fast that wears down muscle.`,
  hook:`CT sarcopenia in end-stage liver disease: L3 skeletal muscle index under 50 cm²/m² (men) or under 39 cm²/m² (women). <sup class="c" data-ref="Carey2017SMI" title="Source 63">63</sup>`},
 {from:.86,at:1,k:'Twelve months later',t:'The late evening snack, measured',
  txt:`In a 12-month trial, 103 people with cirrhosis took a 710 kcal/day supplement either at night or in the daytime. Night feeding raised total body protein by 0.38 kg at 3 months, 0.48 kg at 6 months and 0.53 kg at 12 months, "about 2 kg of lean tissue"; the daytime group showed no gain. <sup class="c" data-ref="Plank2008" title="Source 357">357</sup> <span class="ev early">Early evidence</span> A review found better nitrogen balance and quality of life with a late evening snack, inconsistent effects on lean mass, and no shown survival benefit. <sup class="c" data-ref="Tsien2012" title="Source 469">469</sup> EASL 2019: "Include late evening oral nutritional supplementation and breakfast in dietary regime of malnourished decompensated cirrhotic patients". <sup class="c" data-ref="EASL2019Nutrition" title="Source 107">107</sup>`,
  pt:`The EASL patient section puts it simply: "The late-evening snack is the most important, as it covers the long interval between dinner and breakfast." <sup class="c" data-ref="EASL2019Nutrition" title="Source 107">107</sup>`,
  hook:`Plank 2008: the same 710 kcal supplement added about 2 kg of lean tissue in 12 months when taken at night, and nothing when taken by day. <sup class="c" data-ref="Plank2008" title="Source 357">357</sup>`}
];
const NT_LANES=[
 {n:'Healthy liver',sub:'no late snack',meals:[0,4.5,8,11.5],gly:13,cir:false},
 {n:'Cirrhosis',sub:'no late snack',meals:[0,4.5,8,11.5],gly:2.5,cir:true},
 {n:'Cirrhosis',sub:'+ late evening snack',meals:[0,4.5,8,11.5,14.5],gly:2.5,cir:true}
];
const NT_MEALN=['breakfast','lunch','snack','dinner','late snack'];
/* medicine sorter: ans = pref | care | avoid, from the cited framing */
const NT_MEDS=[
 {id:'para',n:'Paracetamol (acetaminophen)',s:'for pain or fever',ans:'pref',
  why:`AASLD 2022: "Acetaminophen, 500 mg every 6 h, up to a maximum dose of 2 g/d, is the preferred first-line pharmacotherapy" for pain in cirrhosis. <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup> A prescribing review quotes "relatively small doses (2-3 g or less/day) for short durations". <sup class="c" data-ref="Lewis2013" title="Source 264">264</sup> A systematic review found no high-quality trials supporting reduced doses in compensated cirrhosis, and the US over-the-counter label, written for everyone, warns of severe liver damage above 4,000 mg in 24 hours and says "Ask a doctor before use if you have liver disease". <sup class="c" data-ref="Schweighardt2018,FDA-Tylenol" title="Source 147,412">147,412</sup> Limits differ by source: practice varies.`},
 {id:'nsaid',n:'NSAIDs',s:'ibuprofen, naproxen, aspirin for pain',ans:'avoid',
  why:`AASLD 2022: "Systemic NSAIDs should be avoided". <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup> A prescribing review says they "should be used cautiously (or not at all) in advanced cirrhosis", because drugs that can precipitate "renal failure, gastrointestinal bleeding, SBP and encephalopathy should be identified and avoided". <sup class="c" data-ref="Lewis2013" title="Source 264">264</sup> The ibuprofen label says to ask a doctor first with "liver cirrhosis" and warns NSAIDs "may cause severe stomach bleeding". <sup class="c" data-ref="FDA-Advil" title="Source 126">126</sup>`},
 {id:'bzd',n:'Benzodiazepines',s:'for sleep or anxiety',ans:'avoid',
  why:`AASLD 2022: chronic benzodiazepines should generally be avoided in decompensated cirrhosis (end-of-life comfort is a possible exception), and they should not be used for sleep because of sedation, cognitive impairment and falls. <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup> In a Taiwanese cohort, hepatic encephalopathy linked to benzodiazepines went with long-acting drugs, high doses, use beyond 2 months and low albumin. <sup class="c" data-ref="Lee2014BZD" title="Source 260">260</sup> One exception is alcohol withdrawal, where ACG 2024 calls them the treatment of choice, used cautiously and preferably short- or intermediate-acting (lorazepam, oxazepam). <sup class="c" data-ref="Jophlin2024ACG" title="Source 219">219</sup>`},
 {id:'opi',n:'Opioids',s:'strong pain relievers',ans:'care',
  why:`AASLD 2022: avoid opioids for chronic pain when possible; codeine, morphine and tramadol should generally be avoided; if one is needed, low-dose oxycodone or hydromorphone, with a laxative such as lactulose started at the same time to prevent constipation and encephalopathy. <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup> In 6,451 people with compensated cirrhosis, hepatic encephalopathy within a year occurred in 3.3% with no opioid, 5.0% with short-term and 6.3% with chronic prescriptions. <sup class="c" data-ref="Moon2020Opioids" title="Source 310">310</sup>`},
 {id:'ppi',n:'Proton pump inhibitors',s:'omeprazole and similar acid reducers',ans:'care',
  why:`In 865 people with cirrhosis and ascites, PPI use was linked to hepatic encephalopathy (adjusted HR 1.36) and spontaneous bacterial peritonitis (adjusted HR 1.72). <sup class="c" data-ref="Dam2016PPI" title="Source 91">91</sup> A meta-analysis found the SBP link in case-control but not cohort studies and "could not establish causality". <sup class="c" data-ref="Yu2016PPI" title="Source 511">511</sup> A prescribing review says PPIs "should be used with care" in cirrhosis. <sup class="c" data-ref="Lewis2013" title="Source 264">264</sup> Association likely, cause uncertain.`},
 {id:'herb',n:'Herbal and dietary supplements',s:'including "liver" products',ans:'care',
  why:`ACG 2021 names herbal and dietary supplements, with antimicrobials and anticancer drugs, as the most common causes of drug-induced liver injury in the Western world. <sup class="c" data-ref="Chalasani2021ACG" title="Source 65">65</sup> No source used here rates any single product as safe in cirrhosis, so tell your care team about everything you take, including products bought without a prescription.`}
];
const NT_CH={pref:'Preferred, with a limit',care:'Use with care',avoid:'Generally avoid'};
inits.nutrition=()=>{
  const svg=$('#ntSvg'),rg=$('#ntT'),note=$('#ntNote');let setSt=()=>{};
  /* fuel segments for a lane: [from, to, state] with state 0 food, 1 glycogen, 2 muscle */
  const segs=L=>{const o=[],M=L.meals;M.forEach((m,i)=>{const nx=i+1<M.length?M[i+1]:24,f=Math.min(nx,m+3);o.push([m,f,0]);
    if(f<nx){const g=Math.min(nx,f+L.gly);o.push([f,g,1]);if(g<nx)o.push([g,nx,2])}});return o};
  const SEG=NT_LANES.map(segs);
  const musH=(i,h)=>SEG[i].reduce((a,s)=>a+(s[2]===2?Math.max(0,Math.min(h,s[1])-s[0]):0),0);
  const glyc=(i,h)=>{const s=SEG[i].find(q=>h>=q[0]&&h<=q[1])||SEG[i][SEG[i].length-1];return s[2]===0?1:s[2]===1?clamp(1-(h-s[0])/NT_LANES[i].gly):0};
  const stateAt=(i,h)=>{const s=SEG[i].find(q=>h>=q[0]&&h<q[1]);return s?s[2]:SEG[i][SEG[i].length-1][2]};
  const since=(i,h)=>{let l=0;NT_LANES[i].meals.forEach(m=>{if(m<=h)l=m});return h-l};
  const COL=['var(--rx)','var(--bile)','var(--bad)'],NAME=['food','liver glycogen','muscle as fuel'];
  const hhmm=h=>{const c=(8+h)%24,hh=Math.floor(c+1e-6),mm=Math.floor((c-hh)*60+1e-6);return String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')};
  function clock(cx,cy,r,h){const A=c=>c/24*2*Math.PI-Math.PI/2,P=(c,rr)=>[cx+rr*Math.cos(A(c)),cy+rr*Math.sin(A(c))];
    const wedge=(c0,c1,rr)=>{const p0=P(c0,rr),p1=P(c1,rr),lg=((c1-c0+24)%24)>12?1:0;return `M${f1(cx)} ${f1(cy)}L${f1(p0[0])} ${f1(p0[1])}A${rr} ${rr} 0 ${lg} 1 ${f1(p1[0])} ${f1(p1[1])}Z`};
    let s=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.5"/>`;
    s+=`<path d="${wedge(22,7,r-2)}" style="fill:var(--brand-soft);opacity:.9"/><text x="${f1(P(2.5,r*.62)[0])}" y="${f1(P(2.5,r*.62)[1]+3)}" class="t-xs t-mid">night</text>`;
    for(let k=0;k<24;k++){const a=P(k,r-2),b=P(k,r-(k%6?6:11));s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:var(--muted);stroke-width:${k%6?1:1.6}"/>`}
    [0,6,12,18].forEach(k=>{const p=P(k,r-22);s+=`<text x="${f1(p[0])}" y="${f1(p[1]+4)}" class="t-sm t-mid">${String(k).padStart(2,'0')}</text>`});
    /* elapsed ring */
    const c=(8+h)%24;if(h>.05){const p0=P(8,r+7),p1=P(c,r+7),lg=h>12?1:0;s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}A${r+7} ${r+7} 0 ${lg} 1 ${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--rx);stroke-width:3;stroke-linecap:round;opacity:.75"/>`}
    /* meals on the rim */
    NT_LANES[2].meals.forEach((m,i)=>{const cc=(8+m)%24,p=P(cc,r-2),late=i===4,done=h>=m;
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${late?6:5}" style="fill:${done?(late?'var(--brand)':'var(--rx)'):'var(--panel)'};stroke:${late?'var(--brand)':'var(--rx)'};stroke-width:1.8"/>`});
    const ph=P(c,r-16);s+=`<line x1="${cx}" y1="${cy}" x2="${f1(ph[0])}" y2="${f1(ph[1])}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><circle cx="${cx}" cy="${cy}" r="5" style="fill:var(--ink)"/>`;
    return s}
  function muscle(cx,cy,r0,mh){const r=r0*(1-.04*mh),rr=rng(5);let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r0)}" style="fill:none;stroke:var(--line);stroke-width:1;stroke-dasharray:2 3"/>`;
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--liver-soft);stroke:var(--liver);stroke-width:1.5"/>`;
    for(let k=0;k<7;k++){const a=rr()*6.28,d=r*.55*rr();s+=`<circle cx="${f1(cx+Math.cos(a)*d)}" cy="${f1(cy+Math.sin(a)*d)}" r="${f1(r*.14)}" style="fill:var(--liver-fill);opacity:.45"/>`}
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r0*.18)}" style="fill:var(--scar);stroke:var(--scar-line);stroke-width:1"/>`;
    return s}
  function lane(i,x0,x1,y,h,N){const L=NT_LANES[i],X=v=>lerp(x0,x1,v/24),sh=N?16:18;let s='';
    s+=`<text x="${x0}" y="${y-13}" class="t-lbl" style="${N?'font-size:12px':''}">${L.n}<tspan class="t-sm" style="font-weight:500" dx="6">${L.sub}</tspan></text>`;
    s+=`<rect x="${x0}" y="${y}" width="${x1-x0}" height="${sh}" rx="4" style="fill:var(--panel-2)"/>`;
    SEG[i].forEach(([a,b,st])=>{s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b)-X(a))}" height="${sh}" style="fill:${COL[st]};opacity:.16"/>`;
      if(h>a)s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(Math.min(b,h))-X(a))}" height="${sh}" style="fill:${COL[st]};opacity:.85"/>`});
    L.meals.forEach((m,k)=>{const late=k===4;s+=`<path d="M${f1(X(m))} ${y-2}l-4 -6h8z" style="fill:${late?'var(--brand)':'var(--rx)'}"/>`;
      if(late&&i===2)s+=`<text x="${f1(X(m))}" y="${y+sh+12}" class="t-xs t-mid" style="fill:var(--brand)">late snack</text>`});
    s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${y-4}" y2="${y+sh+4}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    /* glycogen tank and muscle */
    const tx=x1+(N?10:12),th=34,gl=glyc(i,h);
    s+=`<rect x="${tx}" y="${y+sh/2-th/2}" width="11" height="${th}" rx="3" style="fill:var(--panel);stroke:var(--line)"/><rect x="${tx+1.5}" y="${f1(y+sh/2+th/2-1.5-(th-3)*gl)}" width="8" height="${f1((th-3)*gl)}" rx="2" style="fill:var(--bile)"/>`;
    const mx=tx+(N?40:42),r0=N?17:18;
    if(i===0)s+=`<text x="${tx+11}" y="${y+sh/2-th/2-5}" class="t-xs t-end">glycogen</text><text x="${mx}" y="${y+sh/2-th/2-5}" class="t-xs t-mid">muscle</text>`;
    const mh=musH(i,h);s+=muscle(mx,y+sh/2,r0,mh);
    s+=`<text x="${mx}" y="${f1(y+sh/2+r0+12)}" class="t-xs t-mid" style="fill:${mh>.05?'var(--bad)':'var(--muted)'}">${f1(mh)} h on muscle</text>`;
    return s}
  function plank(bx,by,bw,bh,u){const X=m=>bx+bw*m/12,Y=k=>by+bh-bh*k/.6;let s=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" style="fill:var(--field)"/>`;
    [0,.2,.4,.6].forEach(k=>{s+=`<line x1="${bx}" x2="${bx+bw}" y1="${f1(Y(k))}" y2="${f1(Y(k))}" class="${k?'grid':'axis'}"/><text x="${bx-5}" y="${f1(Y(k)+3)}" class="t-xs t-end">${k.toFixed(1)}</text>`});
    [0,3,6,9,12].forEach(m=>{s+=`<text x="${f1(X(m))}" y="${by+bh+14}" class="t-xs t-mid">${m}</text>`});
    s+=`<text x="${bx+bw}" y="${by+bh+28}" class="t-xs t-end">months of supplement</text><text x="${bx}" y="${by-8}" class="t-sm">TOTAL BODY PROTEIN GAIN (kg)</text>`;
    const P=[[0,0],[3,.38],[6,.48],[12,.53]],mu=u*12;let d='',last=P[0];
    for(let k=0;k<P.length;k++){const p=P[k];if(p[0]<=mu){d+=(k?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1]));last=p}else{const q=P[k-1],f=(mu-q[0])/(p[0]-q[0]);d+='L'+f1(X(mu))+' '+f1(Y(lerp(q[1],p[1],f)));break}}
    s+=`<path d="M${f1(X(0))} ${f1(Y(0))}L${f1(X(mu))} ${f1(Y(0))}" style="stroke:var(--muted);stroke-width:2;stroke-dasharray:5 4"/>`;
    if(mu>6)s+=`<text x="${f1(X(12))}" y="${f1(Y(0)-6)}" class="t-xs t-end">daytime: no gain</text>`;
    s+=`<path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2.8;stroke-linejoin:round"/>`;
    P.slice(1).forEach(p=>{if(p[0]>mu)return;s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="4.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:1.5"/><text x="${f1(X(p[0])-(p[0]===12?6:0))}" y="${f1(Y(p[1])-9)}" class="t-xs ${p[0]===12?'t-end':'t-mid'}" style="fill:var(--brand)">+${p[1].toFixed(2)}</text>`});
    if(mu>=11.9)s+=`<text x="${f1(X(6))}" y="${f1(Y(.25))}" class="t-sm t-mid" style="fill:var(--brand)">night: ≈ 2 kg lean tissue</text>`;
    return s}
  function draw(t){const N=vb(svg,'720 400','400 650'),h=NT_H(t),late=t>NT_END+.01;let s='';
    if(!N){
      if(late)s+=plank(52,62,190,200,ramp(t,.86,.99));
      else{s+=clock(135,150,98,h);
        s+=`<text x="135" y="282" class="t-big t-mid" style="font-size:26px">${hhmm(h)}</text>`;
        s+=`<text x="135" y="304" class="t-xs t-mid">since last food</text><text x="135" y="320" class="t-sm t-mid">${f1(since(1,h))} h without late snack</text><text x="135" y="336" class="t-sm t-mid" style="fill:var(--brand)">${f1(since(2,h))} h with late snack</text>`}
      NT_LANES.forEach((L,i)=>{s+=lane(i,292,618,58+i*100,h,false)});
      const ax=tline(292,338,326,{min:0,max:24,step:4,fmt:v=>String((8+v)%24).padStart(2,'0')});s+=ax.svg;
      let lx=292;NAME.forEach((n,k)=>{s+=`<rect x="${lx}" y="372" width="12" height="9" rx="2" style="fill:${COL[k]}"/><text x="${lx+16}" y="380" class="t-xs">${n}</text>`;lx+=n.length*5.8+36});
    }else{
      if(late)s+=plank(60,44,300,190,ramp(t,.86,.99));
      else{s+=clock(130,124,90,h);
        s+=`<text x="300" y="96" class="t-big t-mid" style="font-size:26px">${hhmm(h)}</text><text x="300" y="122" class="t-xs t-mid">since last food</text><text x="300" y="140" class="t-sm t-mid">${f1(since(1,h))} h, no snack</text><text x="300" y="158" class="t-sm t-mid" style="fill:var(--brand)">${f1(since(2,h))} h, late snack</text>`}
      NT_LANES.forEach((L,i)=>{s+=lane(i,20,288,300+i*96,h,true)});
      const ax=tline(20,566,268,{min:0,max:24,step:6,fmt:v=>String((8+v)%24).padStart(2,'0')});s+=ax.svg;
      let ly=606;NAME.forEach((n,k)=>{const lx=20+k*128;s+=`<rect x="${lx}" y="${ly}" width="12" height="9" rx="2" style="fill:${COL[k]}"/><text x="${lx+16}" y="${ly+8}" class="t-xs">${n}</text>`});
    }
    svg.innerHTML=s;const p=phaseOf(NT_STEPS,t);note.innerHTML=noteHTML(NT_STEPS[p]);setSt(p);
    svg.setAttribute('aria-label',late?'Total body protein gain over 12 months: 0.38 kg at 3 months, 0.48 kg at 6 and 0.53 kg at 12 with a night-time supplement; no gain with the same supplement in the daytime.':`At ${hhmm(h)}: the healthy liver is using ${NAME[stateAt(0,h)]}; cirrhosis without a late snack is using ${NAME[stateAt(1,h)]}; cirrhosis with a late snack is using ${NAME[stateAt(2,h)]}.`)}
  const stop=playWire(rg,$('#ntPlay'),draw,16000,'Replay','nutrition');
  setSt=stepWire($('#ntSteps'),NT_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- sarcopenia by Child–Pugh ---- */
  const sv=$('#ntSarc'),DS={t:{n:'Waiting-list cohort',v:[10,34,54],k:'Tandon 2012'},m:{n:'Pooled, 36 studies',v:[33,36,46],k:'Mazeaud 2023'}};
  let ds='t',cur=DS.t.v.slice(),stopS=()=>{};
  function drawS(v){const N=vb(sv,'400 300','400 300')||true,x0=N?44:90,x1=N?384:650,y0=26,y1=N?236:206,Y=p=>lerp(y1,y0,p/60);let s='';
    [0,20,40,60].forEach(p=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(p))}" y2="${f1(Y(p))}" class="${p?'grid':'axis'}"/><text x="${x0-6}" y="${f1(Y(p)+3)}" class="t-xs t-end">${p}%</text>`});
    const gw=(x1-x0)/3,bw=gw*.46;['A','B','C'].forEach((c,i)=>{const cx=x0+gw*(i+.5),hgt=y1-Y(v[i]);
      s+=`<rect x="${f1(cx-bw/2)}" y="${f1(Y(v[i]))}" width="${f1(bw)}" height="${f1(hgt)}" rx="5" style="fill:var(--liver-fill);opacity:${f1(.55+i*.18)}"/>`;
      s+=`<text x="${f1(cx)}" y="${f1(Y(v[i])-8)}" class="t-big t-mid" style="font-size:${N?17:20}px">${Math.round(v[i])}%</text>`;
      s+=`<text x="${f1(cx)}" y="${y1+18}" class="t-sm t-mid">Child–Pugh ${c}</text>`});
    s+=`<text x="${x1}" y="${y0-10}" class="t-xs t-end">${DS[ds].n} · ${DS[ds].k}</text><text x="${x0}" y="${y0-10}" class="t-xs">SARCOPENIA</text>`;
    sv.innerHTML=s}
  $$('[data-ntds]').forEach(b=>b.addEventListener('click',()=>{ds=b.dataset.ntds;$$('[data-ntds]').forEach(q=>q.setAttribute('aria-pressed',q===b));
    const from=cur.slice(),to=DS[ds].v;stopS();stopS=animate(600,p=>{const e=ease(p);cur=from.map((f,i)=>lerp(f,to[i],e));drawS(cur)})}));
  drawS(cur);

  /* ---- Liver Frailty Index bands ---- */
  const lv=$('#ntLfi'),lr=$('#ntLfiR'),lo=$('#ntLfiOut');
  const BANDS=[{to:3.2,c:'var(--good)',n:'robust'},{to:4.4,c:'var(--warn)',n:'prefrail'},{to:6,c:'var(--bad)',n:'frail'}];
  function drawL(){const N=vb(lv,'400 190','400 190')||true,v=+lr.value,x0=N?20:40,x1=N?380:680,X=u=>lerp(x0,x1,(u-2)/4),y=N?70:58,hh=N?28:26;let s='',a=2;
    BANDS.forEach(b=>{s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b.to)-X(a))}" height="${hh}" style="fill:${b.c};opacity:.28"/><text x="${f1((X(a)+X(b.to))/2)}" y="${y+hh/2+4}" class="t-sm t-mid" style="fill:${b.c};font-weight:700">${b.n}</text>`;a=b.to});
    [2,3,3.2,4,4.4,5,6].forEach(u=>{s+=`<line x1="${f1(X(u))}" x2="${f1(X(u))}" y1="${y+hh}" y2="${y+hh+5}" class="axis"/><text x="${f1(X(u))}" y="${y+hh+17}" class="t-xs t-mid">${u}</text>`});
    s+=`<line x1="${f1(X(4.5))}" x2="${f1(X(4.5))}" y1="${y-4}" y2="${y+hh+4}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(X(4.5)+4)}" y="${y+hh+32}" class="t-xs">≥4.5 in some cohorts</text>`;
    s+=`<text x="${x0}" y="${y+hh+32}" class="t-xs">AASLD 2021 bands</text>`;
    const mx=X(v);s+=`<path d="M${f1(mx)} ${y-2}l-7 -12h14z" style="fill:var(--ink)"/><text x="${f1(clamp(mx,x0+24,x1-24))}" y="${y-18}" class="t-big t-mid">${v.toFixed(2)}</text>`;
    lv.innerHTML=s;const b=BANDS.find(q=>v<q.to)||BANDS[2];
    lo.innerHTML=`An LFI of <span class="lfiv">${v.toFixed(2)}</span> falls in the AASLD 2021 <b>${b.n}</b> band${v>=4.4&&v<4.5?'; studies that use 4.5 as the cut-off would not yet call it frail':''}. Teaching tool only. <sup class="c" data-ref="Lai2021AASLD,Haugen2020" title="Source 194,255">194,255</sup>`}
  lr.addEventListener('input',drawL);drawL();
  const rl=redraws.nutrition;redraws.nutrition=()=>{rl&&rl();drawS(cur);drawL()};

  /* ---- per-kilogram worked example ---- */
  const w=$('#ntW'),as=$('#ntAsc'),oe=$('#ntOed'),out=$('#ntOut');
  function calc(){const kg=clamp(+w.value||0,35,200),cut=(+as.value)+(oe.checked?5:0),dry=kg*(1-cut/100);
    out.innerHTML=`<div><small>Estimated dry weight</small><span class="big-num">${Math.round(dry)} kg</span><small>${cut?`${kg} kg minus ${cut}%`:'no adjustment'}</small></div>`+
      `<div><small>EASL 2019 energy floor (35 kcal/kg)</small><span class="big-num">${Math.round(dry*35).toLocaleString('en')}</span><small>kcal a day or more, in a non-obese person</small></div>`+
      `<div><small>Protein, 1.2–1.5 g/kg</small><span class="big-num">${Math.round(dry*1.2)}–${Math.round(dry*1.5)} g</span><small>a day (AASLD uses ideal body weight)</small></div>`}
  [w,as,oe].forEach(e=>{e.addEventListener('input',calc);e.addEventListener('change',calc)});calc();

  /* ---- medicine sorter ---- */
  const box=$('#ntMeds'),sc=$('#ntMedScore'),pick={};
  box.innerHTML=NT_MEDS.map(m=>`<div class="card med" data-ntmed="${m.id}"><h4>${m.n}</h4><p class="stage-cap" style="margin-top:-4px">${m.s}</p><div class="opts3" role="group" aria-label="How do the sources frame ${m.n}?">${Object.keys(NT_CH).map(c=>`<button class="btn" data-ntc="${c}" aria-pressed="false">${NT_CH[c]}</button>`).join('')}</div><div class="fb" aria-live="polite"></div></div>`).join('');
  function score(){const n=Object.keys(pick).length,ok=NT_MEDS.filter(m=>pick[m.id]===m.ans).length;sc.innerHTML=n?`<span>Sorted <b>${n}</b> of ${NT_MEDS.length}</span><span>Matching the sources: <b>${ok}</b></span>`:`<span>Choose an answer on each card.</span>`}
  box.addEventListener('click',e=>{const b=e.target.closest('[data-ntc]');if(!b)return;const card=b.closest('[data-ntmed]'),m=NT_MEDS.find(q=>q.id===card.dataset.ntmed);
    pick[m.id]=b.dataset.ntc;$$('[data-ntc]',card).forEach(q=>q.setAttribute('aria-pressed',q===b));
    const ok=pick[m.id]===m.ans,fb=$('.fb',card);fb.className='fb '+(ok?'ok':'off');
    fb.innerHTML=`<b>${ok?'Matches the sources':'The sources lean to: '+NT_CH[m.ans]}.</b> ${m.why}`;score()});
  score();

  /* ---- vaccine checklist (kept in this browser only) ---- */
  const vs=store.get('ntvax',{}),vo=$('#ntVaxOut');
  const vupd=()=>{const n=$$('[data-ntvax]').filter(c=>c.checked).length;vo.innerHTML=`<span>Ticked <b>${n}</b> of 3 to discuss</span>`};
  $$('[data-ntvax]').forEach(c=>{c.checked=!!vs[c.dataset.ntvax];c.addEventListener('change',()=>{vs[c.dataset.ntvax]=c.checked;store.set('ntvax',vs);vupd()})});vupd();
};
/* =============== 5.3 Nursing care =============== */
/* t 0..1 = the shift 07:00 -> 19:00 */
const NU_H=t=>7+12*clamp(t), NU_T=h=>(h-7)/12;
const NU_STEPS=[
 {from:0,at:NU_T(7.5),k:'07:00 · handover',t:'Baseline: weight, girth, balance',
  txt:`The day starts with the measurements everything else is compared against. LiverHope's decompensated-cirrhosis nursing measures: vital signs, weight and abdominal girth, nutrition counselling, adherence, and assessment of quality of life, frailty, sleep, depression and anxiety; in hospital, body weight and urine volume are monitored daily. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup> Its ascites table says to discuss diuretic changes with the physician if weight rises, does not fall, or falls by more than 500 g/day for 2 consecutive days without leg oedema, or by more than 1 kg with oedema (quoted as published). <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`,
  pt:`Weighing at the same time on the same scale each day shows whether fluid is building up or coming off.`,
  hook:`LiverHope: weight loss on diuretics above 500 g/day (no oedema) or above 1 kg/day (with oedema) for 2 days → discuss with the physician. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`},
 {from:NU_T(8.3),at:NU_T(9),k:'08:30 · mind and bowels',t:'Mental status, asterixis, stools',
  txt:`LiverHope's hepatic encephalopathy nursing care: mental status evaluation, aspiration prevention, looking for triggers (especially infection and GI bleeding), nutrition support, skin-breakdown prevention, accurate intake and output, and bowel cleansing. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup> Asterixis is a brief, irregular loss of muscle tone while a posture is held, first described as the "liver flap" in hepatic encephalopathy. <sup class="c" data-ref="Lui2026Asterixis" title="Source 282">282</sup> Stools are counted because lactulose is titrated to them: the US label to "2 or 3 soft stools daily", LiverHope's table to 3–4 bowel movements a day. Both are shown as published; the prescriber sets the target. <sup class="c" data-ref="FDA-Enulose,Fabrellas2020LiverHope" title="Source 122,131">122,131</sup> More in <a href="#encephalopathy" data-go="encephalopathy">hepatic encephalopathy</a>.`,
  pt:`A short check of how alert and oriented the person is, a look at the hands held out, and a count of bowel movements tell the team how the brain and the lactulose are doing.`,
  hook:`Lactulose targets differ by source: US label 2–3 soft stools a day; LiverHope 3–4 bowel movements a day. Know both, follow the prescriber. <sup class="c" data-ref="FDA-Enulose,Fabrellas2020LiverHope" title="Source 122,131">122,131</sup>`},
 {from:NU_T(10),at:NU_T(11.2),k:'10:00 · paracentesis',t:'Paracentesis care',
  txt:`Fluid is drained from the abdomen and the belly flattens. LiverHope, after large-volume paracentesis: blood pressure every 15 minutes for 2 hours, then every 30 minutes for 2 hours; 25% albumin as ordered; check the puncture site for leak or infection. If the site leaks, a wafer or urostomy bag can measure the fluid; if it leaks straight afterwards, the person can lie on the opposite side for a few hours (quoted as published). <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup> Albumin reduced post-paracentesis circulatory dysfunction (OR 0.39) and death (OR 0.64) in a meta-analysis of 17 trials, and severe bleeding after 4,729 paracenteses was 0.19%. <sup class="c" data-ref="Bernardi2012Hepatology,Pache2005" title="Source 36,342">36,342</sup>`,
  pt:`After the drain, blood pressure is checked often for a few hours, because removing a lot of fluid can make it drop.`,
  hook:`Post-paracentesis BP: every 15 min × 2 h, then every 30 min × 2 h (LiverHope). <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`},
 {from:NU_T(12.7),at:NU_T(13.4),k:'13:00 · bleeding watch',t:'Watching for bleeding',
  txt:`LiverHope's GI-bleeding nursing: monitor lying and standing blood pressure and heart rate, mental status, skin pallor and temperature, urine volume, and the colour of vomit or stool (black or bright red); know how severe the varices are before passing a nasogastric tube. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup> In clinic it suggests checking that a beta-blocker has an adequate effect (a 25% fall in heart rate, to about 55–60 bpm). Baveno VII 7.7: in people with ascites, beta-blockers or carvedilol are reduced or stopped if systolic pressure stays under 90 mmHg or mean arterial pressure under 65 mmHg and/or with HRS-AKI. <sup class="c" data-ref="Fabrellas2020LiverHope,deFranchis2022BavenoVII" title="Source 97,122">97,122</sup>`,
  pt:`Black, tarry stool (melaena) or vomiting blood can mean bleeding inside. It is an emergency.`,
  hook:`Black tarry stool = melaena = upper GI bleeding until proven otherwise: teach patients and caregivers to recognise it. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`},
 {from:NU_T(14.7),at:NU_T(15.4),k:'15:00 · infection and skin',t:'Infection screen and skin care',
  txt:`LiverHope's infection priorities: prevention (especially with encephalopathy or leg oedema), watching for signs of sepsis, minimising invasive procedures and timely antibiotics; avoid bladder catheters unless there is incontinence with skin breakdown or severe kidney injury needing exact output. Early signs to look for: fever, abdominal pain, early encephalopathy, painful urination and respiratory symptoms. Skin: prevent pressure injuries, especially in fragile, malnourished people, and care for the skin of swollen legs. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup> In a meta-analysis of 178 studies, infection raised the odds of death about fourfold (OR 3.75); 30.3% of infected patients died within a month (population figures). <sup class="c" data-ref="Arvaniti2010Gastro" title="Source 19">19</sup>`,
  pt:`Early signs of infection to look for include fever, belly pain and new confusion, so small changes are reported early.`,
  hook:`Infection raises the odds of death about fourfold in cirrhosis (OR 3.75). <sup class="c" data-ref="Arvaniti2010Gastro" title="Source 19">19</sup>`},
 {from:NU_T(16.6),at:NU_T(17.3),k:'17:00 · alcohol and food',t:'Withdrawal watch and nutrition',
  txt:`The CIWA-Ar is a shortened 10-item scale for quantifying alcohol withdrawal severity. <sup class="c" data-ref="Sullivan1989CIWA" title="Source 441">441</sup> ACG 2024: withdrawal in alcohol-related liver disease "should be assessed and managed as per the CIWA-Ar protocol", and clinicians should distinguish it from hepatic encephalopathy, recognising the two can coexist. Mild or moderate withdrawal usually begins 6–24 hours after the last drink; withdrawal scores are not validated in severe liver disease, a symptom-triggered approach is preferred, and short- or intermediate-acting benzodiazepines (lorazepam, oxazepam) are safer with poor liver function. <sup class="c" data-ref="Jophlin2024ACG" title="Source 219">219</sup> AASLD 2021: a dietitian within 24 hours of admission, and as little fasting and nil-by-mouth time as possible. <sup class="c" data-ref="Lai2021AASLD" title="Source 255">255</sup> In hospital, brief alcohol interventions reduced deaths at 6 months (RR 0.42). <sup class="c" data-ref="McQueen2011" title="Source 299">299</sup>`,
  pt:`Withdrawal and liver-related confusion can look alike and can happen together; the team checks for both.`,
  hook:`CIWA-Ar = 10 items. In liver disease ACG prefers symptom-triggered treatment and shorter-acting benzodiazepines (lorazepam, oxazepam). <sup class="c" data-ref="Sullivan1989CIWA,Jophlin2024ACG" title="Source 219,441">219,441</sup>`},
 {from:NU_T(18.2),at:NU_T(19),k:'18:30 · handover',t:'Teaching before home',
  txt:`LiverHope's three main teaching aims in decompensated cirrhosis: recognising and preventing complications, falls awareness and prevention, and the effects and side effects of medicines; the main caregiver should attend each visit. At home, people are taught to monitor their weight and to call when it rises by more than 500 g/day for at least 3 consecutive days, and that NSAIDs such as aspirin and ibuprofen must be avoided. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup> In 150 outpatients only 53% of self-management questions were answered correctly at baseline; a short booklet raised that to 67% at 3 months (Early evidence). <sup class="c" data-ref="Volk2013Knowledge" title="Source 487">487</sup> More in <a href="#living" data-go="living">living with cirrhosis</a>.`,
  pt:`Before going home, the person and their carer learn the warning signs, how to weigh daily, and what each medicine does.`,
  hook:`After a decompensation, 37% were readmitted within a month. <sup class="c" data-ref="Volk2012Readmit" title="Source 486">486</sup>`}
];
const NU_TODO=[
 ['Weigh: same time, same scale','Measure abdominal girth','Vital signs','Start intake and output chart','Check adherence and nutrition'],
 ['Mental status check','Look for asterixis (liver flap)','Count stools on lactulose','Aspiration and falls precautions','Look for triggers: infection, bleeding'],
 ['BP every 15 min for 2 h','then every 30 min for 2 h','25% albumin as ordered','Check puncture site for leak','Leak: bag to measure the fluid'],
 ['BP and pulse lying and standing','Pallor, temperature, mental status','Colour of vomit or stool','Urine volume','Beta-blocker: heart-rate effect'],
 ['Fever, belly pain, new confusion','Painful urination, cough','Avoid a bladder catheter if possible','Pressure areas, oedematous skin','Timely antibiotics if ordered'],
 ['Withdrawal: CIWA-Ar per protocol','Withdrawal vs HE: can coexist','Dietitian within 24 h','Avoid long nil-by-mouth','Offer a brief alcohol intervention'],
 ['Teach red flags, melaena','Teach daily weights at home','Medicines: effects, side effects','Main caregiver present','Follow-up arranged']
];
/* variceal bleed sorter: now | hours | no */
const NU_VB=[
 {n:'Large-bore peripheral IV (16–18 gauge)',a:'now',w:`LiverHope: insert a large-bore peripheral IV (16–18 gauge). <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`},
 {n:'Monitor BP, pulse, mental status, vomit and stool colour',a:'now',w:`LiverHope lists lying and standing BP and heart rate, mental status, pallor, temperature, urine volume and the colour of vomit or stool. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`},
 {n:'Start the vasoactive drug as ordered',a:'now',w:`Baveno VII: vasoactive drugs (terlipressin, somatostatin, octreotide) "should be started as soon as possible and continued for 2–5 days". <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`},
 {n:'Antibiotic prophylaxis as ordered',a:'now',w:`Baveno VII: antibiotic prophylaxis "is an integral part of therapy" and starts from admission. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup> In a Cochrane review it reduced mortality (RR 0.79). <sup class="c" data-ref="ChavezTapia2010Cochrane" title="Source 70">70</sup>`},
 {n:'Conservative red-cell transfusion (target Hb 7–8 g/dl)',a:'now',w:`Baveno VII 6.2: transfusion should be conservative, target haemoglobin 7–8 g/dl, adjusted for heart disease, age, haemodynamics and ongoing bleeding. LiverHope: transfuse if haemoglobin is under 7 g/dL. <sup class="c" data-ref="deFranchis2022BavenoVII,Fabrellas2020LiverHope" title="Source 97,122">97,122</sup>`},
 {n:'Upper endoscopy',a:'hours',w:`Baveno VII 6.17: after resuscitation, upper endoscopy within 12 hours of presentation. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`},
 {n:'Lactulose by mouth or enema to clear blood from the gut',a:'hours',alt:'now',w:`Baveno VII 6.33: rapid removal of blood from the gut with lactulose (oral or enemas) should be used to prevent hepatic encephalopathy; LiverHope lists it in the bleeding table. Early in the course, so "now" is also reasonable. <sup class="c" data-ref="deFranchis2022BavenoVII,Fabrellas2020LiverHope" title="Source 97,122">97,122</sup>`},
 {n:'Fresh frozen plasma to correct the INR',a:'no',w:`Baveno VII 6.36: fresh frozen plasma is not recommended: it will not correct the coagulopathy and may worsen portal hypertension. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`},
 {n:'Transfuse up to a normal haemoglobin',a:'no',w:`Baveno VII 6.2 calls for conservative transfusion with a target of 7–8 g/dl, not a normal level. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`}
];
const NU_VBC={now:'Now: first minutes',hours:'Within hours',no:'Not recommended'};
const NU_Q=[
 {q:'A person has had a large-volume paracentesis. Which blood-pressure schedule does the LiverHope nursing table give afterwards?',o:['Every 15 minutes for 2 hours, then every 30 minutes for 2 hours','Once an hour for 4 hours','Once, when the drain is removed','Every 4 hours for 24 hours'],a:0,
  e:`LiverHope: blood pressure every 15 minutes for 2 hours and then every 30 minutes for 2 hours, 25% albumin as ordered, and a check of the puncture site for leak or infection. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`},
 {q:'A person taking lactulose for hepatic encephalopathy has had one bowel movement in the last 24 hours. Which response fits the published targets?',o:['This is below both published targets; report it so the prescriber can review the dose','One bowel movement a day is the target, so no action is needed','Stop the lactulose, as it is not working','Give an antidiarrhoeal so the stools stay formed'],a:0,
  e:`The US label adjusts the dose "to produce 2 or 3 soft stools daily"; LiverHope's nursing table uses 3–4 bowel movements a day and considers cleansing enemas if there are none. One a day is below both. <sup class="c" data-ref="FDA-Enulose,Fabrellas2020LiverHope" title="Source 122,131">122,131</sup>`},
 {q:'A person with cirrhosis and ascites asks for something for back pain. Which medicine does AASLD 2022 call the preferred first-line choice?',o:['Ibuprofen','Paracetamol (acetaminophen), up to 2 g a day','Tramadol','Codeine'],a:1,
  e:`AASLD 2022: "Acetaminophen, 500 mg every 6 h, up to a maximum dose of 2 g/d, is the preferred first-line pharmacotherapy", and "Systemic NSAIDs should be avoided". Codeine, morphine and tramadol should generally be avoided. <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>`},
 {q:'On the afternoon round a person passes a black, tarry stool and their pulse is higher than at handover. What is the priority?',o:['Treat it as possible upper GI bleeding: check BP and pulse lying and standing, mental status and pallor, and escalate at once','Record it and recheck at the next routine round','Give a laxative to clear the bowel','Encourage oral fluids and review tomorrow'],a:0,
  e:`Black stool (melaena) is a sign of GI bleeding that patients and caregivers are taught to recognise. LiverHope's bleeding observations include lying and standing BP and heart rate, mental status, pallor and the colour of stool or vomit. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`},
 {q:'A person with covert hepatic encephalopathy asks for a sleeping tablet. Which statement is supported by the sources?',o:['Benzodiazepines should generally not be used for sleep in cirrhosis because of sedation, confusion and falls','Long-acting benzodiazepines are the safest choice in cirrhosis','Falls are no more common with cognitive problems','Sleep problems are rare in cirrhosis'],a:0,
  e:`AASLD 2022 advises against benzodiazepines for sleep (sedation, respiratory depression, cognitive impairment, falls) and describes short-term melatonin or hydroxyzine in Child–Pugh A and B. <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup> Falls within a year: 52.3% with cognitive dysfunction vs 6.5% without. <sup class="c" data-ref="Soriano2012" title="Source 433">433</sup>`},
 {q:'Spironolactone has just been started for ascites. Which blood test does the label say to check within one week?',o:['Ammonia','Potassium','Amylase','Cholesterol'],a:1,
  e:`The spironolactone label says to monitor potassium within one week of starting, and warns of hyperkalaemia, hyponatraemia and, in cirrhosis with ascites, fluid and electrolyte shifts that may worsen hepatic encephalopathy. <sup class="c" data-ref="FDA-Aldactone" title="Source 127">127</sup>`},
 {q:'A person with alcohol-related cirrhosis, admitted 10 hours after their last drink, is tremulous and muddled. Which statement fits ACG 2024?',o:['Confusion rules out alcohol withdrawal','Withdrawal and hepatic encephalopathy can coexist; assess per the CIWA-Ar protocol and look for encephalopathy too','Withdrawal never begins before 72 hours','Long-acting benzodiazepines are preferred in poor liver function'],a:1,
  e:`ACG 2024: assess withdrawal per the CIWA-Ar protocol and distinguish it from hepatic encephalopathy, recognising both can coexist; mild or moderate withdrawal usually starts 6–24 hours after the last drink; short- or intermediate-acting benzodiazepines (lorazepam, oxazepam) are safer in poor liver function. <sup class="c" data-ref="Jophlin2024ACG" title="Source 219">219</sup>`}
];
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT'),note=$('#nuNote');let setSt=()=>{};
  const BP=[];for(let k=1;k<=8;k++)BP.push(10.5+k*.25);for(let k=1;k<=4;k++)BP.push(12.5+k*.5);
  const STOOL=[8.2,12.6,16.4],INP=[[7.5,250],[8,200],[10.6,100],[12.5,300],[15,200],[17.5,300]],OUT=[[8.2,150],[9.5,300],[12.6,150],[13,250],[16.4,150],[16.8,300]];
  const hh=h=>String(Math.floor(h)).padStart(2,'0')+':'+String(Math.round((h%1)*60)%60).padStart(2,'0');
  function hand(x,y,a){return `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-46" y="-6" width="40" height="12" rx="6" style="fill:var(--skin);stroke:var(--brain-line)"/><g transform="rotate(${f1(a)} -6 0)"><path d="M-8 -9h18q6 0 6 6v6q0 6 -6 6h-18z" style="fill:var(--skin);stroke:var(--brain-line)"/>${[-6,-2,2,6].map(d=>`<rect x="14" y="${d-1.6}" width="16" height="3.4" rx="1.7" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:.8"/>`).join('')}</g></g>`}
  function draw(t){const N=vb(svg,'720 372','400 552'),h=NU_H(t),p=phaseOf(NU_STEPS,t);let s='';
    const W=N?400:720,tx0=N?20:30,tx1=W-(N?20:30),X=v=>lerp(tx0,tx1,(v-7)/12);
    /* shift timeline */
    s+=`<line x1="${tx0}" x2="${tx1}" y1="26" y2="26" class="axis"/>`;
    for(let k=7;k<=19;k++){const big=k%2===1;s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${big?20:23}" y2="29" class="axis"/>`;if(big&&(!N||k%4===3))s+=`<text x="${f1(X(k))}" y="14" class="t-xs t-mid">${String(k).padStart(2,'0')}:00</text>`}
    NU_STEPS.forEach((st,i)=>{const sx=X(NU_H(st.at));s+=`<circle cx="${f1(sx)}" cy="26" r="${i===p?6:4}" style="fill:${i<=p?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.6"/>`});
    s+=`<path d="M${f1(X(h))} 34l-5 8h10z" style="fill:var(--ink)"/>`;
    /* patient */
    const fl=lerp(.8,.32,ease(ramp(h,10,10.6))),tap=h>=10&&h<10.8?ramp(h,10,10.15):0;
    const px=N?82:122,py=N?58:52,ps=N?.74:1;
    s+=abdomen(px,py,ps,{fluid:fl,tap,jaundice:.25,liver:true,fib:4}).svg;
    s+=`<text x="${px}" y="${f1(py+228*ps)}" class="t-xs t-mid">${h<10?'ascites':h<10.8?'paracentesis':'after paracentesis'}</text>`;
    /* step badge under the patient */
    const bx=N?82:122,by=N?250:302;
    if(p===1){const a=-18*Math.abs(Math.sin(h*40));s+=hand(bx+6,by+10,a)+`<text x="${bx}" y="${by+42}" class="t-xs t-mid">arms out, wrists back:</text><text x="${bx}" y="${by+54}" class="t-xs t-mid">a flap = asterixis</text>`}
    else if(p===3){[['#7b5232','brown'],['#141414','black'],['var(--artery)','red']].forEach(([c,n],i)=>{const cx=bx-44+i*44;s+=`<circle cx="${cx}" cy="${by+8}" r="11" style="fill:${c};stroke:var(--line)"/><text x="${cx}" y="${by+34}" class="t-xs t-mid" style="${i?'fill:var(--bad)':''}">${n}</text>`});s+=`<text x="${bx}" y="${by+50}" class="t-xs t-mid">stool and vomit colour</text>`}
    else if(p===4){const tmp=lerp(36.8,37.4,ramp(h,14.7,15.6));s+=`<rect x="${bx-6}" y="${by-14}" width="12" height="40" rx="6" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${bx-3}" y="${f1(by+22-26*ramp(tmp,36,38))}" width="6" height="${f1(26*ramp(tmp,36,38))}" rx="3" style="fill:var(--bad)"/><circle cx="${bx}" cy="${by+26}" r="8" style="fill:var(--bad)"/><text x="${bx+16}" y="${by+10}" class="t-sm">${tmp.toFixed(1)} °C</text><text x="${bx}" y="${by+50}" class="t-xs t-mid">${N?'report small changes':'report small changes early'}</text>`}
    else if(p===5){s+=`<rect x="${bx-58}" y="${by-14}" width="116" height="46" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/><text x="${bx}" y="${by+4}" class="t-lbl t-mid">CIWA-Ar</text><text x="${bx}" y="${by+20}" class="t-xs t-mid">10 items · per protocol</text><text x="${bx}" y="${by+48}" class="t-xs t-mid">${N?'can coexist with HE':'withdrawal and HE can coexist'}</text>`}
    else if(p===2){s+=`<text x="${bx}" y="${by+6}" class="t-sm t-mid" style="fill:var(--fluid)">albumin 25% as ordered</text><text x="${bx}" y="${by+24}" class="t-xs t-mid">site: leak? infection?</text>`}
    else if(p===6){s+=`<text x="${bx}" y="${by+6}" class="t-sm t-mid" style="fill:var(--rx)">teach-back with the carer</text><text x="${bx}" y="${by+24}" class="t-xs t-mid">${N?'weights, red flags':'weights, red flags, medicines'}</text>`}
    else{s+=`<text x="${bx}" y="${by+6}" class="t-sm t-mid">same scale, same time</text><text x="${bx}" y="${by+24}" class="t-xs t-mid">girth at the navel</text>`}
    /* observation chart */
    const ox=N?172:262,ow=N?212:206,oy=N?54:52;let y=oy;const OX=v=>lerp(ox,ox+ow,(v-7)/12);
    s+=`<rect x="${ox-8}" y="${oy-6}" width="${ow+16}" height="280" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${ox}" y="${y+8}" class="t-sm">DAILY WEIGHT · GIRTH</text>`;
    if(h>=7.3){s+=`<text x="${ox}" y="${y+30}" class="t-big" style="font-size:20px">78.4 kg</text><text x="${ox}" y="${y+46}" class="t-xs">−0.7 kg since yesterday</text><text x="${ox}" y="${y+59}" class="t-xs">girth ${h>=10.8?'98 cm after drain (102 at 07:00)':'102 cm at the navel'}</text>`}
    y+=72;
    s+=`<text x="${ox}" y="${y+8}" class="t-sm">INTAKE / OUTPUT (mL)</text>`;
    const sum=A=>A.reduce((a,[tt,v])=>a+(h>=tt?v:0),0),iv=sum(INP),ovv=sum(OUT),bw=ow-60;
    [['in',iv,'var(--fluid)'],['out',ovv,'var(--bile)']].forEach(([n,v,c],i)=>{const yy=y+18+i*16;s+=`<text x="${ox}" y="${yy+9}" class="t-xs">${n}</text><rect x="${ox+26}" y="${yy}" width="${bw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${ox+26}" y="${yy}" width="${f1(bw*v/1500)}" height="10" rx="3" style="fill:${c}"/><text x="${ox+ow}" y="${yy+9}" class="t-xs t-end">${v}</text>`});
    y+=56;
    s+=`<text x="${ox}" y="${y+8}" class="t-sm">STOOLS ON LACTULOSE · TODAY</text>`;
    const ns=STOOL.filter(v=>h>=v).length;for(let k=0;k<4;k++){const sx=ox+k*24;s+=`<rect x="${sx}" y="${y+18}" width="18" height="18" rx="4" style="fill:${k<ns?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.4;opacity:${k<ns?1:.5}"/>`}
    s+=`<text x="${ox+102}" y="${y+31}" class="t-big" style="font-size:18px">${ns}</text><text x="${ox+118}" y="${y+31}" class="t-xs">so far</text>`;
    s+=`<text x="${ox}" y="${y+52}" class="t-xs">US label: 2 or 3 soft stools a day</text><text x="${ox}" y="${y+64}" class="t-xs">LiverHope: 3–4 bowel movements a day</text>`;
    y+=78;
    if(!N||true){s+=`<text x="${ox}" y="${y+8}" class="t-sm">BP AFTER PARACENTESIS</text>`;
      const BX=v=>lerp(ox+6,ox+ow-6,(v-10.5)/4);
      s+=`<line x1="${f1(BX(10.5))}" x2="${f1(BX(14.5))}" y1="${y+26}" y2="${y+26}" class="axis"/>`;
      BP.forEach(v=>{const on=h>=v;s+=`<circle cx="${f1(BX(v))}" cy="${y+26}" r="${on?4:3}" style="fill:${on?'var(--fluid)':'var(--panel)'};stroke:var(--fluid);stroke-width:1.3"/>`});
      [10.5,12.5,14.5].forEach((v,i)=>{s+=`<text x="${f1(BX(v))}" y="${y+56}" class="t-xs ${['','t-mid','t-end'][i]}" style="${''}">${hh(v)}</text>`});
      const done=BP.filter(v=>h>=v).length;s+=`<text x="${ox+ow}" y="${y+8}" class="t-xs t-end">${done}/12</text>`;
      s+=`<text x="${f1((BX(10.5)+BX(12.5))/2)}" y="${y+42}" class="t-xs t-mid">every 15 min</text><text x="${f1((BX(12.5)+BX(14.5))/2)}" y="${y+42}" class="t-xs t-mid">every 30 min</text>`}
    /* priorities */
    const cx0=N?20:490,cy0=N?352:52,cw=N?360:214;
    s+=`<text x="${cx0}" y="${cy0+8}" class="t-sm" style="fill:var(--rx)">PRIORITIES · ${hh(h)}</text>`;
    const st=NU_STEPS[p],u=ramp(t,st.from,Math.max(st.from+.001,(NU_STEPS[p+1]?NU_STEPS[p+1].from:1)-.02));
    NU_TODO[p].forEach((ln,i)=>{const yy=cy0+(N?28:34)+i*(N?30:40),done=u>=(i+1)/(NU_TODO[p].length+.5);
      s+=`<rect x="${cx0}" y="${yy-12}" width="16" height="16" rx="4" style="fill:${done?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.5"/>`;
      if(done)s+=`<path d="M${cx0+4} ${yy-4}l3.5 3.5l5.5 -7" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
      s+=`<text x="${cx0+24}" y="${yy+1}" class="t-lbl" style="font-weight:${done?700:500};font-size:${N?12.5:12.5}px">${ln}</text>`});
    s+=`<text x="${cx0}" y="${cy0+(N?28:34)+5*(N?30:40)+4}" class="t-xs">${NU_STEPS[p].k}</text>`;
    svg.innerHTML=s;note.innerHTML=noteHTML(NU_STEPS[p]);setSt(p);
    svg.setAttribute('aria-label',`Shift time ${hh(h)}. ${NU_STEPS[p].t}. Priorities: ${NU_TODO[p].join('; ')}.`)}
  const stop=playWire(rg,$('#nuPlay'),draw,22000,'Replay','nursing');
  setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- variceal bleed sorter ---- */
  const vbx=$('#nuVb'),vs=$('#nuVbScore'),pick={};
  vbx.innerHTML=NU_VB.map((v,i)=>`<div class="row" data-nuvb="${i}"><b>${v.n}</b><div class="opts3" role="group" aria-label="When: ${v.n}">${Object.keys(NU_VBC).map(c=>`<button class="btn" data-nuc="${c}" aria-pressed="false">${NU_VBC[c]}</button>`).join('')}</div><div class="fb" aria-live="polite"></div></div>`).join('');
  const vscore=()=>{const n=Object.keys(pick).length,ok=NU_VB.filter((v,i)=>pick[i]!=null&&(pick[i]===v.a||pick[i]===v.alt)).length;vs.innerHTML=n?`<span>Sorted <b>${n}</b> of ${NU_VB.length}</span><span>Matching the sources: <b>${ok}</b></span>`:'<span>Choose a time for each action.</span>'};
  vbx.addEventListener('click',e=>{const b=e.target.closest('[data-nuc]');if(!b)return;const row=b.closest('[data-nuvb]'),i=+row.dataset.nuvb,v=NU_VB[i];pick[i]=b.dataset.nuc;
    $$('[data-nuc]',row).forEach(q=>q.setAttribute('aria-pressed',q===b));const ok=pick[i]===v.a||pick[i]===v.alt,fb=$('.fb',row);fb.className='fb '+(ok?'ok':'off');
    fb.innerHTML=`<b>${ok?'Matches the sources.':'The sources place it: '+NU_VBC[v.a]+'.'}</b> ${v.w}`;vscore()});
  vscore();

  /* ---- exam-style scenarios ---- */
  const qc=$('#nuQ'),ans={};let qi=0;
  function q(){const Q=NU_Q[qi],L='ABCD',a=ans[qi];
    qc.innerHTML=`<div class="kicker">Scenario ${qi+1} of ${NU_Q.length}</div><p class="q">${Q.q}</p><div class="opts">${Q.o.map((o,i)=>`<button class="opt${a!=null?(i===Q.a?' right':i===a?' wrong':''):''}" data-nuo="${i}"${a!=null?' disabled':''}><span class="l">${L[i]}</span><span>${o}</span></button>`).join('')}</div>${a!=null?`<div class="expl"><b>${a===Q.a?'Correct.':'Not quite: the answer is '+L[Q.a]+'.'}</b> ${Q.e}</div>`:''}`;
    $('#nuBar').style.width=(100*Object.keys(ans).length/NU_Q.length)+'%';
    $('#nuQn').textContent=`${Object.keys(ans).filter(k=>ans[k]===NU_Q[k].a).length} correct of ${Object.keys(ans).length} answered`;
    $('#nuPrev').disabled=qi===0;$('#nuNext').disabled=qi===NU_Q.length-1}
  qc.addEventListener('click',e=>{const b=e.target.closest('[data-nuo]');if(!b||ans[qi]!=null)return;ans[qi]=+b.dataset.nuo;q()});
  $('#nuPrev').addEventListener('click',()=>{if(qi>0){qi--;q()}});$('#nuNext').addEventListener('click',()=>{if(qi<NU_Q.length-1){qi++;q()}});
  q();
};
/* =============== 5.4 Living with cirrhosis =============== */
/* t 0..1 = Monday 00:00 -> Sunday 24:00 */
const LV_DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const LV_W=[76.0,76.1,75.9,76.6,77.2,77.8,77.9];
const LV_STEPS=[
 {from:0,at:.07,k:'Monday',t:'Medicines and routine',
  txt:`The week starts with the routine: morning and evening medicines, here a diuretic, lactulose and a beta-blocker, and a weight on the same scale each morning. LiverHope's three main teaching aims are recognising and preventing complications, preventing falls, and knowing the effects and side effects of medicines, with the main caregiver at each visit. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup> In 150 outpatients only 53% of self-management questions were answered correctly at first; the most missed were the sodium in sea salt and the safety of paracetamol and statins. <sup class="c" data-ref="Volk2013Knowledge" title="Source 487">487</sup> Medicine details: <a href="#nursing" data-go="nursing">nursing care</a> and <a href="#nutrition" data-go="nutrition">medicine safety</a>.`,
  pt:`Ask before taking any new medicine, including pain relievers. Many people with cirrhosis are told to avoid ibuprofen and similar drugs, and paracetamol has a lower daily limit. <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>`,
  hook:`LiverHope's three teaching aims: complications, falls, medicines; and the main caregiver attends. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`},
 {from:1/7,at:1.55/7,k:'Tuesday',t:'Meals, salt and the late snack',
  txt:`Four meals and a late evening snack (the moon). AASLD 2021: fasting gaps of no more than 3–4 hours while awake, with an early breakfast and/or late evening snack, and protein not restricted. <sup class="c" data-ref="Lai2021AASLD" title="Source 255">255</sup> EASL 2019, patient section: "The late-evening snack is the most important, as it covers the long interval between dinner and breakfast". With ascites, EASL quotes about 80 mmol sodium a day (2 g sodium, 5 g salt), keeping food palatable; LiverHope uses under 100 mmol a day. <sup class="c" data-ref="EASL2019Nutrition,Fabrellas2020LiverHope" title="Source 107,122">107,122</sup> Only 31% of 120 outpatients kept to a 2-g sodium diet, and those who did ate 20% fewer calories. <sup class="c" data-ref="Lai2021AASLD" title="Source 255">255</sup>`,
  pt:`A small snack before bed, with some protein, can help protect your muscles overnight. <sup class="c" data-ref="EASL2019Nutrition,Plank2008" title="Source 107,357">107,357</sup>`,
  hook:`EASL 2019 salt in ascites: about 80 mmol sodium (2 g sodium, 5 g salt) a day. <sup class="c" data-ref="EASL2019Nutrition" title="Source 107">107</sup>`},
 {from:2/7,at:2.55/7,k:'Wednesday',t:'Clinic and the 6-monthly scan',
  txt:`Clinic day, with a carer along. AASLD 2023: "HCC surveillance should be performed using ultrasound and AFP at semiannual (approximately every 6 months) intervals". <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup> Many people miss these checks, and reminders help. <sup class="c" data-ref="Wolf2021Surveillance" title="Source 500">500</sup> AASLD 2021 suggests reassessing frailty at least yearly in compensated disease and as often as every 8–12 weeks in decompensated cirrhosis. <sup class="c" data-ref="Lai2021AASLD" title="Source 255">255</sup> More in <a href="#hcc" data-go="hcc">liver cancer surveillance</a>.`,
  pt:`It is fine to ask your care team when your next scan is due.`,
  hook:`HCC surveillance in cirrhosis: ultrasound ± AFP every 6 months. <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>`},
 {from:3/7,at:3.55/7,k:'Thursday',t:'Fatigue, itch and cramps',
  txt:`Symptoms come and go: tiredness, itch, cramps at night. A review of 80 studies found muscle cramps in 56–68% and insomnia in 26–77%; the JAMA review gives itch in about 39%. <sup class="c" data-ref="Peng2019,Tapper2023JAMA" title="Source 352,453">352,453</sup> AASLD 2022 reports fatigue in 50–86%. For cramps, checking and repleting potassium, magnesium and zinc is a first step. <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup> <span class="ev early">Early evidence</span> Sips of pickle brine at cramp onset reduced severity in a randomised trial. <sup class="c" data-ref="Tapper2022PICCLES" title="Source 452">452</sup> From today the weight starts to climb.`,
  pt:`Feeling tired, itchy, crampy or sleeping badly is common with cirrhosis. Tell your team: many of these can be helped. <sup class="c" data-ref="Peng2019,Rogal2022AASLD" title="Source 352,387">352,387</sup>`,
  hook:`First step for cramps in decompensated cirrhosis: check and replete potassium, magnesium and zinc. <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>`},
 {from:4.6/7,at:5.6/7,k:'Friday to Saturday',t:'Weight creeping up: call your team',
  txt:`The weight has risen by more than half a kilogram a day for three days running, and the belly feels tighter. LiverHope teaches people to monitor their weight and to call when it increases by more than 500 g/day for at least 3 consecutive days. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup> That is a call to the team (amber), not an emergency on its own. Among people with ascites, spontaneous bacterial peritonitis occurs in about 11% a year, so fever or belly pain with a swollen abdomen moves it to the red box. <sup class="c" data-ref="Tapper2023JAMA" title="Source 453">453</sup>`,
  pt:`If your team asks you to weigh yourself, do it at the same time each day and call if your weight goes up quickly, as your team has explained. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`,
  hook:`LiverHope home teaching: weight up >500 g/day for ≥3 consecutive days → call the team. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`},
 {from:6/7,at:6.6/7,k:'Sunday',t:'A red flag: urgent care',
  txt:`On Sunday the stool is black and tarry. LiverHope teaches patients and caregivers to recognise GI bleeding, particularly melaena (black stools), and to know early signs of infection (fever, abdominal pain, early confusion, painful urination, chest symptoms) and that less urine can signal kidney injury. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup> Complications can move fast: in a meta-analysis, 30.3% of people with an infection died within a month (a population figure). <sup class="c" data-ref="Arvaniti2010Gastro" title="Source 19">19</sup> Do not wait for Monday's clinic.`,
  pt:`Vomiting blood, black or tarry stools, new confusion or drowsiness, or fever or belly pain with a swollen abdomen need urgent care: call your local emergency number or go to an emergency department. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`,
  hook:`Black tarry stool = melaena = upper GI bleeding until proven otherwise. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>`}
];
const LV_FLAGS=['Vomiting blood','Black or tarry stools','New confusion or drowsiness','Fever or belly pain with a swollen abdomen'];
const LV_FLAGS2=[['Vomiting blood'],['Black or tarry','stools'],['New confusion','or drowsiness'],['Fever or belly pain','+ swollen abdomen']];
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT'),note=$('#lvNote');let setSt=()=>{};
  const amberOn=d=>d>=5.35,redOn=d=>d>=6.35;
  function draw(t){const N=vb(svg,'720 348','400 480'),d=7*clamp(t),p=phaseOf(LV_STEPS,t),di=Math.min(6,Math.floor(d));let s='';
    const lx=N?10:18,c0=N?74:112,cw=N?45:64,X=i=>c0+cw*(i+.5),vis=i=>clamp(d-i+.35);
    const R=N?{h:24,med:40,w:92,wB:166,meal:186,app:222,sym:266,sup:310,end:336}:{h:24,med:40,w:90,wB:162,meal:182,app:216,sym:262,sup:310,end:338};
    /* columns */
    for(let i=0;i<7;i++){const cx=c0+cw*i,on=i===di;
      s+=`<rect x="${f1(cx+2)}" y="${R.h-14}" width="${cw-4}" height="${R.end-R.h+14}" rx="8" style="fill:${on?'var(--rx-soft)':'var(--panel-2)'};opacity:${on?.9:.45}"/>`;
      s+=`<text x="${f1(X(i))}" y="${R.h}" class="t-sm t-mid" style="${on?'fill:var(--rx);font-weight:700':''}">${LV_DAYS[i]}</text>`}
    const rowL=(y,txt)=>`<text x="${lx}" y="${y}" class="t-xs" style="font-weight:700">${txt}</text>`;
    s+=rowL(R.med+14,'MEDICINES')+rowL(R.w+8,'WEIGHT')+rowL(R.w+20,'kg')+rowL(R.meal+12,'MEALS')+rowL(R.app+12,N?'VISITS':'APPOINTMENTS')+rowL(R.sym+12,'SYMPTOMS')+rowL(R.sup+12,'SUPPORT');
    for(let i=0;i<7;i++){const v=vis(i);if(v<=0)continue;const x=X(i);let g='';
      /* medicines: two morning, one evening */
      g+=pill(x-11,R.med+8,N?13:16,{ang:-20})+pill(x+10,R.med+8,N?13:16,{ang:20,col:'var(--brand)'})+pill(x,R.med+24,N?10:12,{round:true,col:'var(--accent)'});
      /* meals */
      for(let k=0;k<4;k++)g+=`<circle cx="${f1(x-(N?15:20)+k*(N?8:10))}" cy="${R.meal+8}" r="${N?2.6:3.2}" style="fill:var(--rx)"/>`;
      g+=`<path d="M${f1(x+(N?18:23))} ${R.meal+2}a6 6 0 1 0 5 9a5 5 0 1 1 -5 -9z" style="fill:var(--brand)"/>`;
      s+=`<g style="opacity:${f1(v)}">${g}</g>`}
    if(d<1.4)s+=`<text x="${f1(X(0)+cw*.55)}" y="${R.med+38}" class="t-xs">diuretic · lactulose · beta-blocker</text>`;
    if(d>=1&&d<2.4)s+=`<text x="${f1(X(1)-cw*.4)}" y="${R.meal+26}" class="t-xs">4 meals + late snack (moon)</text>`;
    /* weight line */
    const wy=v=>lerp(R.wB,R.w,(v-75.5)/2.8);let path='';
    for(let i=0;i<7;i++){if(vis(i)<.6)continue;path+=(path?'L':'M')+f1(X(i))+' '+f1(wy(LV_W[i]))}
    if(path)s+=`<path d="${path}" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>`;
    for(let i=0;i<7;i++){if(vis(i)<.6)continue;const up=i>0&&LV_W[i]-LV_W[i-1]>.5,c=up?'var(--warn)':'var(--ink)';
      s+=`<circle cx="${f1(X(i))}" cy="${f1(wy(LV_W[i]))}" r="${up?5:4}" style="fill:${up?'var(--warn)':'var(--panel)'};stroke:${c};stroke-width:1.8"/><text x="${f1(X(i))}" y="${f1(wy(LV_W[i])-9)}" class="t-xs t-mid" style="${up?'fill:var(--warn);font-weight:700':''}">${N?LV_W[i].toFixed(1).slice(-4):LV_W[i].toFixed(1)}</text>`;
      if(up)s+=`<text x="${f1(X(i))}" y="${R.wB+2}" class="t-xs t-mid" style="fill:var(--warn)">+${(LV_W[i]-LV_W[i-1]).toFixed(1)}</text>`}
    /* appointments */
    const app=(i,a,b,c)=>{if(vis(i)<=0)return;s+=`<g style="opacity:${f1(vis(i))}"><rect x="${f1(X(i)-cw/2+5)}" y="${R.app}" width="${cw-10}" height="${N?34:32}" rx="6" style="fill:var(--panel);stroke:${c};stroke-width:1.4"/><text x="${f1(X(i))}" y="${R.app+13}" class="t-xs t-mid" style="fill:${c};font-weight:700">${a}</text><text x="${f1(X(i))}" y="${R.app+25}" class="t-xs t-mid">${b}</text></g>`};
    app(2,'clinic','+ scan','var(--rx)');app(4,'nurse','call','var(--brand)');
    /* symptoms */
    const sym=(i,lab,c)=>{if(vis(i)<=0)return;s+=`<g style="opacity:${f1(vis(i))}"><rect x="${f1(X(i)-cw/2+6)}" y="${R.sym}" width="${cw-12}" height="18" rx="9" style="fill:${c};opacity:.22"/><text x="${f1(X(i))}" y="${R.sym+12.5}" class="t-xs t-mid" style="fill:var(--ink)">${lab}</text></g>`};
    sym(0,'tired','var(--muted)');sym(3,'itch','var(--bile)');sym(3,'','var(--bile)');sym(4,'cramps','var(--liver)');sym(5,'tight','var(--warn)');
    if(vis(6)>0)s+=`<g style="opacity:${f1(vis(6))}"><rect x="${f1(X(6)-cw/2+3)}" y="${R.sym-2}" width="${cw-6}" height="${N?34:22}" rx="9" style="fill:var(--bad)"/><text x="${f1(X(6))}" y="${R.sym+(N?11:12.5)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${N?'black':'black stool'}</text>${N?`<text x="${f1(X(6))}" y="${R.sym+24}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">stool</text>`:''}</g>`;
    if(d>=3&&d<4.4)s+=`<text x="${f1(X(3))}" y="${R.sym+32}" class="t-xs t-mid">cramps at night</text>`;
    /* support */
    for(let i=0;i<7;i++){if(vis(i)<=0)continue;const hi=i===2||i===6;s+=person(X(i)-6,R.sup,N?14:16,hi?'var(--rx)':'var(--muted)',{op:(hi?1:.35)*vis(i)})+person(X(i)+6,R.sup,N?14:16,'var(--brand)',{op:(hi?1:.35)*vis(i)})}
    if(d>=2&&d<3.4)s+=`<text x="${f1(X(2))}" y="${R.sup+30}" class="t-xs t-mid">carer at clinic</text>`;
    /* red-flag panel */
    const P=N?{x:12,y:368,w:376}:{x:574,y:10,w:136};
    const am=amberOn(d),rd=redOn(d);
    let py=P.y;s+=`<text x="${P.x}" y="${py+10}" class="t-sm" style="fill:var(--bad);font-weight:700">URGENT CARE IF</text>`;py+=20;
    LV_FLAGS2.forEach((L,i)=>{const lit=rd&&i===1,bh=N?40:46,bw=N?(P.w-8)/2:P.w,bx=N?P.x+(i%2)*(bw+8):P.x,by=N?py+Math.floor(i/2)*(bh+8):py+i*(bh+6);
      s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="${bh}" rx="8" style="fill:${lit?'var(--bad)':'var(--bad-soft)'};stroke:var(--bad);stroke-width:${lit?2.4:1}"/>`;
      L.forEach((ln,k)=>{s+=`<text x="${f1(bx+8)}" y="${f1(by+(L.length===1?bh/2+4:bh/2-3+k*13))}" class="t-xs" style="fill:${lit?'var(--panel)':'var(--ink)'};font-weight:${lit?700:500}">${ln}</text>`})});
    py+=N?2*(40+8):4*(46+6);
    s+=`<text x="${P.x}" y="${py+14}" class="t-xs" style="fill:${rd?'var(--bad)':'var(--muted)'};font-weight:700">${rd?(N?'→ call your emergency number or go to an emergency department':'→ emergency number'):'call emergency number'}</text>`;
    if(!N)s+=`<text x="${P.x}" y="${py+27}" class="t-xs" style="fill:${rd?'var(--bad)':'var(--muted)'};font-weight:700">${rd?'or emergency department':'or go to an ED'}</text>`;
    py+=N?28:40;
    s+=`<rect x="${P.x}" y="${py}" width="${P.w}" height="${N?40:58}" rx="8" style="fill:${am?'var(--warn-soft)':'var(--panel-2)'};stroke:var(--warn);stroke-width:${am?2.2:1}"/>`;
    const amL=N?['CALL YOUR TEAM IF','weight up >500 g/day for 3 days running']:['CALL YOUR TEAM IF','weight up >500 g/day','3 days running'];
    amL.forEach((ln,k)=>{s+=`<text x="${P.x+8}" y="${py+15+k*13}" class="t-xs" style="fill:${k?'var(--ink)':'var(--warn)'};font-weight:700">${ln}</text>`});
    svg.innerHTML=s;note.innerHTML=noteHTML(LV_STEPS[p]);setSt(p);
    svg.setAttribute('aria-label',`${LV_DAYS[di]}: weight ${LV_W[di].toFixed(1)} kg. ${redOn(d)?'Black, tarry stool: urgent care.':amberOn(d)?'Weight up more than 500 g a day for 3 days: call the team.':LV_STEPS[p].t}`)}
  const stop=playWire(rg,$('#lvPlay'),draw,18000,'Replay','living');
  setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- self-check log (this browser only) ---- */
  const lg=$('#lvLog'),al=$('#lvAlerts'),cnt=$('#lvCount'),exB=$('#lvEx'),fl=$$('[data-lvf]');
  const iso=dt=>dt.toISOString().slice(0,10);
  let log=store.get('lvlog',[]);if(!Array.isArray(log))log=[];let ex=false;
  const EX=(()=>{const o=[],t0=new Date();const W=[76.0,76.1,75.9,76.6,77.2,77.8,77.9],S=[3,2,3,2,1,2,3];for(let i=0;i<7;i++){const dt=new Date(t0);dt.setDate(t0.getDate()-6+i);o.push({d:iso(dt),w:W[i],s:S[i],f:i===6?[1]:[]})}return o})();
  $('#lvD').value=iso(new Date());
  const data=()=>(ex?EX:log).slice().sort((a,b)=>a.d<b.d?-1:1).slice(-14);
  function rises(D){/* longest run of consecutive-day rises above 0.5 kg in the last week of entries */
    let run=0,best=0;const R7=D.slice(-8);for(let i=1;i<R7.length;i++){const a=R7[i-1],b=R7[i],gap=(new Date(b.d)-new Date(a.d))/864e5;if(a.w!=null&&b.w!=null&&gap===1&&b.w-a.w>.5){run++;best=Math.max(best,run)}else run=0}return best}
  function alerts(){const D=data(),last=D[D.length-1],now=fl.filter(c=>c.checked).map(c=>+c.dataset.lvf),flags=new Set(now);
    if(last&&last.d===$('#lvD').value)(last.f||[]).forEach(k=>flags.add(k));if(ex&&last)(last.f||[]).forEach(k=>flags.add(k));
    let h='';if(flags.size)h+=`<p class="crisis" role="alert"><b>Urgent care</b><span>You marked: ${[...flags].map(k=>LV_FLAGS[k].toLowerCase()).join('; ')}. Vomiting blood, black or tarry stools, new confusion or drowsiness, or fever or belly pain with a swollen abdomen need urgent care: call your local emergency number or go to an emergency department.</span></p>`;
    const r=rises(D);if(r>=3)h+=`<p class="amber"><b>Call your team</b>In your recent entries the weight went up by more than 500 g a day for ${r} days in a row. LiverHope teaches people to call their team when this happens; follow the plan your own team gave you. <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup></p>`;
    al.innerHTML=h}
  function chart(){const N=vb(lg,'720 300','400 320'),D=data(),x0=N?40:56,x1=N?388:700,wT=26,wB=N?140:128,sT=N?182:170,sB=N?282:262;let s='';
    s+=`<text x="${x0}" y="14" class="t-sm">WEIGHT (kg)</text><text x="${x0}" y="${sT-10}" class="t-sm">BOWEL MOVEMENTS</text>`;
    if(!D.length){s+=`<rect x="${x0}" y="${wT}" width="${x1-x0}" height="${sB-wT}" rx="8" style="fill:var(--field)"/><text x="${(x0+x1)/2}" y="${(wT+sB)/2}" class="t-sm t-mid">No entries yet: save one above, or show the example week.</text>`;lg.innerHTML=s;cnt.textContent='';return}
    const ws=D.filter(e=>e.w!=null).map(e=>e.w),lo=Math.floor((Math.min(...ws,70)-.5)*2)/2,hi=Math.ceil((Math.max(...ws,70)+.5)*2)/2;
    const wmin=ws.length?Math.floor(Math.min(...ws)-1):70,wmax=ws.length?Math.ceil(Math.max(...ws)+1):80;
    const n=Math.max(D.length,2),X=i=>D.length===1?(x0+x1)/2:lerp(x0+16,x1-16,i/(n-1)),WY=v=>lerp(wB,wT,(v-wmin)/(wmax-wmin||1)),smax=Math.max(5,...D.map(e=>e.s||0)),SY=v=>lerp(sB,sT,v/smax);
    s+=`<rect x="${x0}" y="${wT}" width="${x1-x0}" height="${wB-wT}" style="fill:var(--field)"/><rect x="${x0}" y="${sT}" width="${x1-x0}" height="${sB-sT}" style="fill:var(--field)"/>`;
    [wmin,(wmin+wmax)/2,wmax].forEach(v=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(WY(v))}" y2="${f1(WY(v))}" class="grid"/><text x="${x0-5}" y="${f1(WY(v)+3)}" class="t-xs t-end">${f1(v)}</text>`});
    s+=`<rect x="${x0}" y="${f1(SY(3))}" width="${x1-x0}" height="${f1(SY(2)-SY(3))}" style="fill:var(--rx);opacity:.16"/><rect x="${x0}" y="${f1(SY(4))}" width="${x1-x0}" height="${f1(SY(3)-SY(4))}" style="fill:var(--brand);opacity:.13"/>`;
    s+=`<text x="${x1}" y="${sT-10}" class="t-xs t-end"><tspan style="fill:var(--rx)">■ 2–3 US label</tspan>  <tspan style="fill:var(--brand)">■ 3–4 LiverHope</tspan></text>`;
    for(let v=0;v<=smax;v+=smax>8?2:1)s+=`<text x="${x0-5}" y="${f1(SY(v)+3)}" class="t-xs t-end">${v}</text>`;
    let pth='';D.forEach((e,i)=>{if(e.w==null)return;pth+=(pth?'L':'M')+f1(X(i))+' '+f1(WY(e.w))});s+=`<path d="${pth}" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
    const bw=Math.min(22,(x1-x0)/n*.5);
    D.forEach((e,i)=>{const up=i>0&&e.w!=null&&D[i-1].w!=null&&e.w-D[i-1].w>.5&&(new Date(e.d)-new Date(D[i-1].d))/864e5===1,fl2=(e.f||[]).length;
      if(e.w!=null)s+=`<circle cx="${f1(X(i))}" cy="${f1(WY(e.w))}" r="4.5" style="fill:${up?'var(--warn)':'var(--panel)'};stroke:${up?'var(--warn)':'var(--ink)'};stroke-width:1.8"/>${N&&n>8?'':`<text x="${f1(X(i))}" y="${f1(WY(e.w)-9)}" class="t-xs t-mid">${e.w.toFixed(1)}</text>`}`;
      if(e.s!=null)s+=`<rect x="${f1(X(i)-bw/2)}" y="${f1(SY(e.s))}" width="${f1(bw)}" height="${f1(sB-SY(e.s))}" rx="3" style="fill:var(--rx);opacity:.85"/>`;
      if(fl2)s+=`<circle cx="${f1(X(i))}" cy="${wB+14}" r="6" style="fill:var(--bad)"/><text x="${f1(X(i))}" y="${wB+17.5}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">!</text>`;
      if(!N||n<=8||i%2===0)s+=`<text x="${f1(X(i))}" y="${sB+14}" class="t-xs t-mid">${e.d.slice(8,10)}/${e.d.slice(5,7)}</text>`});
    lg.innerHTML=s;cnt.textContent=ex?'Showing the example week (not your data).':`${log.length} saved ${log.length===1?'entry':'entries'} in this browser.`}
  function refresh(){chart();alerts()}
  $('#lvAdd').addEventListener('click',()=>{const d=$('#lvD').value,w=parseFloat($('#lvW').value),s=parseInt($('#lvS').value,10);if(!d)return;
    const e={d,w:isFinite(w)?Math.round(w*10)/10:null,s:isFinite(s)?s:null,f:fl.filter(c=>c.checked).map(c=>+c.dataset.lvf)};
    log=log.filter(q=>q.d!==d);log.push(e);log.sort((a,b)=>a.d<b.d?-1:1);if(log.length>120)log=log.slice(-120);store.set('lvlog',log);
    ex=false;exB.setAttribute('aria-pressed','false');refresh()});
  exB.addEventListener('click',()=>{ex=!ex;exB.setAttribute('aria-pressed',ex);refresh()});
  $('#lvClr').addEventListener('click',()=>{if(!log.length)return;if(!confirm('Delete every entry saved in this browser?'))return;log=[];store.set('lvlog',log);refresh()});
  fl.forEach(c=>c.addEventListener('change',alerts));$('#lvD').addEventListener('change',alerts);
  const rl=redraws.living;redraws.living=()=>{rl&&rl();chart()};
  refresh();
};
/* =============== 5.5 Research toward better treatment =============== */
const FR_COLS=['Lab & animal','First in humans','Phase 2 / small RCT','Phase 3 / outcomes','Approved'];
const FR_EV={est:['Established','est'],early:['Early evidence','early'],hyp:['Hypothesis','hyp']};
/* s: pipeline step, c: furthest stage reached, fail: did not meet its main goal */
const FR_P=[
 {s:1,c:4,n:'Resmetirom',sub:'THR-β agonist',ev:'est',tgt:'mash',nct:'NCT03900429',st:'Approved (accelerated), noncirrhotic MASH F2–F3; MAESTRO-NASH continues to outcomes, primary completion January 2028',
  txt:'MAESTRO-NASH (966 people, F1B–F3, 52 weeks): fibrosis improved by ≥1 stage in 24.2% (80 mg) and 25.9% (100 mg) vs 14.2% on placebo. <sup class="c" data-ref="Harrison2024MAESTRO,FDA-Rezdiffra,NCT03900429" title="Source 143,193,321">143,193,321</sup>'},
 {s:1,c:4,n:'Semaglutide',sub:'GLP-1 agonist',ev:'est',tgt:'mash',nct:'NCT04822181',st:'Wegovy label includes noncirrhotic MASH F2–F3 (accelerated approval); ESSENCE part 2 primary completion April 2029',
  txt:'ESSENCE (800 people, F2–F3, week 72): fibrosis reduction 36.8% vs 22.4%; steatohepatitis resolution 62.9% vs 34.3%; weight −10.5% vs −2.0%. <sup class="c" data-ref="Sanyal2025ESSENCE,FDA-Wegovy,NCT04822181" title="Source 151,322,404">151,322,404</sup>'},
 {s:1,c:2,n:'Tirzepatide',sub:'GIP/GLP-1 agonist',ev:'early',tgt:'mash',
  st:'Phase 2 (SYNERGY-NASH)',txt:'At 52 weeks, fibrosis improved by ≥1 stage in 55%, 51% and 51% (5, 10, 15 mg) vs 30% on placebo. <sup class="c" data-ref="Loomba2024SYNERGY" title="Source 278">278</sup>'},
 {s:1,c:3,n:'Lanifibranor',sub:'pan-PPAR agonist',ev:'early',tgt:'mash',nct:'NCT04849728',st:'Phase 3 NATiV3 (F2–F3, n=1000): active, not recruiting; primary completion listed 2026-09-29',
  txt:'Phase 2b NATIVE: fibrosis improved by ≥1 stage in 48% (1200 mg) vs 29%; side effects included weight gain, oedema and anaemia. <sup class="c" data-ref="Francque2021NATIVE,NCT04849728" title="Source 164,323">164,323</sup>'},
 {s:1,c:2,n:'Efruxifermin',sub:'FGF21 analogue',ev:'early',tgt:'mash',st:'Phase 2b (HARMONY, F2–F3)',
  txt:'At 24 weeks, fibrosis improved by ≥1 stage in 39% (28 mg) and 41% (50 mg) vs 20% on placebo. <sup class="c" data-ref="Harrison2023HARMONY" title="Source 192">192</sup>'},
 {s:1,c:2,n:'Pegozafermin',sub:'FGF21 analogue',ev:'early',tgt:'mash',st:'Phase 2b (ENLIVEN)',
  txt:'Fibrosis improved in 26% (30 mg) and 27% (44 mg) vs 7% on pooled placebo. <sup class="c" data-ref="Loomba2023ENLIVEN" title="Source 276">276</sup>'},
 {s:2,c:3,n:'Resmetirom (F4)',sub:'Child–Pugh A cirrhosis',ev:'early',tgt:'cirr',nct:'NCT05500222',st:'MAESTRO-NASH-OUTCOMES (n=845): active, not recruiting; primary completion listed 2026-12',
  txt:'Tests resmetirom on liver-related outcomes in well-compensated MASH cirrhosis. No results yet. <sup class="c" data-ref="NCT05500222" title="Source 324">324</sup>'},
 {s:2,c:2,n:'Semaglutide (F4)',sub:'phase 2, 48 weeks',ev:'early',fail:1,tgt:'cirr',st:'Phase 2, did not improve fibrosis',
  txt:'71 people with compensated MASH cirrhosis: fibrosis improved in 11% vs 29% on placebo, not significant; no decompensating events or deaths. <sup class="c" data-ref="Loomba2023SemaCirrhosis" title="Source 277">277</sup>'},
 {s:2,c:3,n:'Efruxifermin (F4)',sub:'SYMMETRY → phase 3',ev:'early',tgt:'cirr',nct:'NCT06528314',st:'Phase 3 outcomes trial (n=2150): recruiting; primary completion listed 2030-02',
  txt:'SYMMETRY (181 people): week 36 missed (19% vs 13%), week 96 29% vs 11% (difference 16 points; 95% CI 2–30). <sup class="c" data-ref="Noureddin2025SYMMETRY,NCT06528314" title="Source 327,337">327,337</sup>'},
 {s:2,c:3,n:'Pegozafermin (F4)',sub:'ENLIGHTEN-Cirrhosis',ev:'early',tgt:'cirr',nct:'NCT06419374',st:'Phase 3 (n=1800, sponsor Hoffmann-La Roche): recruiting; primary completion listed 2028-06-30',
  txt:'Phase 3 in compensated MASH cirrhosis, building on ENLIVEN. <sup class="c" data-ref="NCT06419374,Loomba2023ENLIVEN" title="Source 276,326">276,326</sup>'},
 {s:2,c:3,n:'Survodutide',sub:'glucagon/GLP-1 agonist',ev:'early',tgt:'cirr',nct:'NCT06632457',st:'Phase 3 LIVERAGE-Cirrhosis (n=1590): recruiting; primary completion listed 2029-06-05',
  txt:'Outcomes trial of a weekly injection in compensated MASH cirrhosis. <sup class="c" data-ref="NCT06632457" title="Source 328">328</sup>'},
 {s:2,c:0,n:'LSEC restoration',sub:'VEGF / nitric oxide',ev:'early',tgt:'cirr',st:'Animal studies',
  txt:'In animals, restoring LSEC differentiation promoted stellate-cell quiescence, enhanced regression and prevented progression to cirrhosis. <sup class="c" data-ref="DeLeve2015" title="Source 98">98</sup>'},
 {s:3,c:2,n:'Simvastatin, BLEPS',sub:'after a variceal bleed',ev:'early',tgt:'statin',st:'RCT: missed main goal, survival signal secondary',
  txt:'147 people: no reduction in rebleeding; deaths 9% vs 22% (HR 0.39), a secondary endpoint, with no benefit in Child–Pugh C and 2 cases of rhabdomyolysis. <sup class="c" data-ref="Abraldes2016BLEPS" title="Source 3">3</sup>'},
 {s:3,c:2,n:'LIVERHOPE',sub:'simvastatin + rifaximin',ev:'est',fail:1,tgt:'statin',st:'RCT in Child–Pugh B/C: no benefit',
  txt:'237 people: no reduction in ACLF (17.9% vs 14.2%) or transplant or death (18.8% vs 24.2%); 2.6% rhabdomyolysis. The 40 mg arm of the safety trial was stopped early for toxicity. <sup class="c" data-ref="Pose2025LIVERHOPE,Pose2020LIVERHOPESafety" title="Source 363,364">363,364</sup>'},
 {s:3,c:3,n:'Simvastatin, SACRED',sub:'compensated + CSPH',ev:'early',tgt:'statin',nct:'NCT03654053',st:'VA phase 3 (n=142): active, not recruiting; primary completion 2026-12-31; no results yet',
  txt:'Simvastatin 40 mg/day vs placebo for up to 24 months; primary endpoint decompensation-free survival. <sup class="c" data-ref="Kaplan2021SACRED,NCT03654053" title="Source 228,320">228,320</sup>'},
 {s:3,c:2,n:'Rosuvastatin, RESCU',sub:'phase 2, stiffness',ev:'early',tgt:'statin',nct:'NCT05832229',st:'Phase 2 (n=260): recruiting; primary completion listed 2029-08-31',
  txt:'Primary outcome: change in liver stiffness. <sup class="c" data-ref="NCT05832229" title="Source 325">325</sup>'},
 {s:4,c:2,n:'G-CSF ± stem cells',sub:'REALISTIC',ev:'est',fail:1,tgt:'cell',st:'Phase 2 RCT: no MELD benefit, more harm',
  txt:'81 people with compensated cirrhosis: no MELD improvement at day 90; serious adverse events 43% with G-CSF plus stem cells vs 12% with standard care. <sup class="c" data-ref="Newsome2018REALISTIC" title="Source 331">331</sup>'},
 {s:4,c:2,n:'Macrophage therapy',sub:'MATCH',ev:'early',tgt:'cell',st:'Phase 2, open-label: missed primary endpoint; long-term signal',
  txt:'51 people: ΔΔMELD −0.87 (P=0.06). Up to 4 years: death or transplant 30.8% vs 58.3%, in a small open-label trial. <sup class="c" data-ref="Brennan2025MATCH,Brennan2026MATCHLTFU" title="Source 49,50">49,50</sup>'},
 {s:4,c:1,n:'Hepatocyte transplant',sub:'cells, not organs',ev:'early',tgt:'cell',st:'Small series, mainly metabolic disease and acute liver failure',
  txt:'First reported for Crigler–Najjar type I in 1998; limited by tissue shortage, early cell loss and poor engraftment. <sup class="c" data-ref="Fox1998,Nguyen2020" title="Source 163,333">163,333</sup>'},
 {s:4,c:3,n:'ELAD device',sub:'C3A cell support',ev:'est',fail:1,tgt:'cell',st:'Randomised trial: no survival benefit',
  txt:'203 people with severe alcohol-related hepatitis: overall survival 51.0% vs 49.5%. <sup class="c" data-ref="Thompson2018ELAD" title="Source 463">463</sup>'},
 {s:4,c:3,n:'MARS dialysis',sub:'RELIEF',ev:'est',fail:1,tgt:'cell',st:'Randomised trial: no survival benefit',
  txt:'189 people with acute-on-chronic liver failure: 28-day survival 60.7% vs 58.9%. <sup class="c" data-ref="Banares2013RELIEF" title="Source 26">26</sup>'},
 {s:4,c:0,n:'Scar macrophages',sub:'TREM2+CD9+ cells',ev:'hyp',tgt:'cell',st:'Human tissue atlas; no treatment yet',
  txt:'A single-cell atlas of human cirrhosis identified pro-fibrogenic scar-associated macrophages and scar-confined endothelial and collagen-producing cells. <sup class="c" data-ref="Ramachandran2019" title="Source 369">369</sup>'},
 {s:5,c:3,n:'Warm perfusion (NMP)',sub:'normothermic machine',ev:'est',tgt:'organ',st:'Randomised trials',
  txt:'220 transplants: 50% lower graft injury and discard, 54% longer preservation, no difference in graft or patient survival. OCS PROTECT: early allograft dysfunction 18% vs 31%. <sup class="c" data-ref="Nasralla2018,Markmann2022OCS" title="Source 290,318">290,318</sup>'},
 {s:5,c:3,n:'Cold perfusion (HOPE)',sub:'DHOPE, DCD livers',ev:'est',tgt:'organ',st:'Randomised trial',
  txt:'160 people: non-anastomotic biliary strictures 6% vs 18% (risk ratio 0.36). <sup class="c" data-ref="vanRijn2021DHOPE" title="Source 479">479</sup>'},
 {s:5,c:1,n:'Gene-edited pig liver',sub:'auxiliary xenograft',ev:'hyp',tgt:'organ',st:'First human experiments',
  txt:'In a brain-dead recipient it made bile and pig albumin for 10 days; in the first living recipient it was removed on day 38 for thrombotic microangiopathy. <sup class="c" data-ref="Tao2025Xeno,Zhang2026Xeno" title="Source 446,518">446,518</sup>'}
];
const FR_STEPS=[
 {k:'The pipeline',t:'From idea to approval',
  txt:`Antifibrotic strategies fall into four groups: cure or control the primary disease, target receptor–ligand signalling, inhibit fibrogenesis, and promote resolution. <sup class="c" data-ref="Lee2015Gut" title="Source 261">261</sup> Validating non-invasive markers that could replace biopsy and shorten trials remains a key unmet need. <sup class="c" data-ref="Lee2015Gut" title="Source 261">261</sup> Each card sits at the furthest stage its programme has reached by November 2026. A crossed card did not meet its main goal: negative results are results too.`,
  pt:`New treatments go step by step: lab, a few volunteers, bigger trials, then approval. Many ideas stop along the way.`,
  hook:`Strategies: (1) treat the cause, (2) block signalling, (3) inhibit fibrogenesis, (4) promote resolution. <sup class="c" data-ref="Lee2015Gut" title="Source 261">261</sup>`},
 {k:'Step 2 · before cirrhosis',t:'Drugs for MASH scarring',
  txt:`<span class="ev est">Established</span> Resmetirom improved fibrosis by at least one stage in 24.2–25.9% vs 14.2% on placebo; the US label covers adults with noncirrhotic MASH and F2–F3 fibrosis under accelerated approval, at 80 mg daily under 100 kg and 100 mg at 100 kg or more, as published. <sup class="c" data-ref="Harrison2024MAESTRO,FDA-Rezdiffra" title="Source 143,193">143,193</sup> Semaglutide 2.4 mg reduced fibrosis in 36.8% vs 22.4% (ESSENCE), and the Wegovy label now includes noncirrhotic MASH F2–F3. <sup class="c" data-ref="Sanyal2025ESSENCE,FDA-Wegovy" title="Source 151,404">151,404</sup> <span class="ev early">Early evidence</span> Tirzepatide, lanifibranor and the FGF21 analogues efruxifermin and pegozafermin improved fibrosis in phase 2. <sup class="c" data-ref="Loomba2024SYNERGY,Francque2021NATIVE,Harrison2023HARMONY,Loomba2023ENLIVEN" title="Source 164,192,276,278">164,192,276,278</sup>`,
  pt:`Two medicines are now approved in the US for fatty-liver scarring before cirrhosis. Several more are in large trials.`,
  hook:`Resmetirom: noncirrhotic MASH F2–F3 only; the label says to avoid it in decompensated cirrhosis. <sup class="c" data-ref="FDA-Rezdiffra" title="Source 143">143</sup>`},
 {k:'Step 3 · in cirrhosis',t:'Cirrhosis is a harder target',
  txt:`<span class="ev early">Early evidence</span> Drugs that clearly reverse fibrosis at F2–F3 have so far shown smaller or delayed effects once cirrhosis is established. <sup class="c" data-ref="Loomba2023SemaCirrhosis,Noureddin2025SYMMETRY" title="Source 277,337">277,337</sup> Semaglutide did not improve fibrosis in compensated MASH cirrhosis at 48 weeks (11% vs 29%). Efruxifermin missed its week-36 goal (19% vs 13%) but separated at week 96 (29% vs 11%). <sup class="c" data-ref="Loomba2023SemaCirrhosis,Noureddin2025SYMMETRY" title="Source 277,337">277,337</sup> Outcome trials of resmetirom, efruxifermin, pegozafermin and survodutide report from about 2026 to 2030. <sup class="c" data-ref="NCT05500222,NCT06528314,NCT06419374,NCT06632457" title="Source 324,326,327,328">324,326,327,328</sup> EASL–EASD–EASO 2024: "No MASH-targeted pharmacotherapy can currently be recommended for the cirrhotic stage." <sup class="c" data-ref="EASL2024MASLD" title="Source 111">111</sup>`,
  pt:`Most proof so far is in people who do not yet have cirrhosis. Trials in people with cirrhosis are under way and will report over the next few years.`,
  hook:`F2–F3 biopsy gains ≠ benefit in cirrhosis: semaglutide 48 weeks, no fibrosis benefit; efruxifermin week 36 missed. <sup class="c" data-ref="Loomba2023SemaCirrhosis,Noureddin2025SYMMETRY" title="Source 277,337">277,337</sup>`},
 {k:'Step 4 · statins',t:'Statins: help or harm?',
  txt:`<span class="ev early">Early evidence</span> In BLEPS (147 people after variceal bleeding), simvastatin did not reduce rebleeding, but deaths were 9% vs 22%, a secondary endpoint, with no benefit in Child–Pugh C. <sup class="c" data-ref="Abraldes2016BLEPS" title="Source 3">3</sup> <span class="ev est">Established</span> In decompensated cirrhosis, simvastatin 40 mg plus rifaximin caused muscle and liver toxicity in 3 of 16 people, and LIVERHOPE-EFFICACY (20 mg plus rifaximin, 237 people) found no benefit. <sup class="c" data-ref="Pose2020LIVERHOPESafety,Pose2025LIVERHOPE" title="Source 363,364">363,364</sup> Trials in compensated cirrhosis are pending: SACRED (simvastatin, no results as of 4 November 2026) and RESCU (rosuvastatin). <sup class="c" data-ref="Kaplan2021SACRED,NCT03654053,NCT05832229" title="Source 228,320,325">228,320,325</sup> See <a href="#portal" data-go="portal">Portal hypertension &amp; varices</a>.`,
  pt:`Cholesterol pills (statins) were hoped to protect the liver. In advanced cirrhosis they did not help and could harm muscle; trials in earlier cirrhosis are still running.`,
  hook:`LIVERHOPE: simvastatin + rifaximin, no benefit in decompensated cirrhosis; 40 mg arm stopped for rhabdomyolysis. <sup class="c" data-ref="Pose2025LIVERHOPE,Pose2020LIVERHOPESafety" title="Source 363,364">363,364</sup>`},
 {k:'Step 5 · cells & devices',t:'Cell therapy and liver support',
  txt:`G-CSF with or without stem cells did not improve MELD and had more serious adverse events (43% vs 12%). <sup class="c" data-ref="Newsome2018REALISTIC" title="Source 331">331</sup> <span class="ev early">Early evidence</span> Autologous macrophages missed their primary endpoint (P=0.06), but at up to 4 years death or transplant was 30.8% vs 58.3% in a small open-label trial. <sup class="c" data-ref="Brennan2025MATCH,Brennan2026MATCHLTFU" title="Source 49,50">49,50</sup> Neither cell-based support (ELAD) nor albumin dialysis (MARS) improved survival in randomised trials. <sup class="c" data-ref="Thompson2018ELAD,Banares2013RELIEF" title="Source 26,463">26,463</sup> Hepatocyte transplantation is used mainly in metabolic disease and acute liver failure. <sup class="c" data-ref="Nguyen2020" title="Source 333">333</sup> <span class="ev hyp">Hypothesis</span> Scar-associated macrophages are a possible future target. <sup class="c" data-ref="Ramachandran2019" title="Source 369">369</sup>`,
  pt:`Putting cells or machines in place of a failing liver has mostly not worked yet. One small trial of a person's own immune cells looks hopeful and needs a bigger test.`,
  hook:`REALISTIC: stem cells failed and harmed. ELAD and MARS: no survival benefit. <sup class="c" data-ref="Newsome2018REALISTIC,Thompson2018ELAD,Banares2013RELIEF" title="Source 26,331,463">26,331,463</sup>`},
 {k:'Step 6 · donor livers',t:'Better donor livers, and pig livers',
  txt:`<span class="ev est">Established</span> Warm (normothermic) machine perfusion halved graft injury and organ discard and lengthened preservation by 54%, with no difference in graft or patient survival. Portable perfusion cut early allograft dysfunction to 18% vs 31%. <sup class="c" data-ref="Nasralla2018,Markmann2022OCS" title="Source 290,318">290,318</sup> Cold oxygenated perfusion of livers donated after circulatory death cut non-anastomotic strictures to 6% vs 18%. <sup class="c" data-ref="vanRijn2021DHOPE" title="Source 479">479</sup> <span class="ev hyp">Hypothesis</span> A gene-edited pig liver, attached as an auxiliary graft, made bile (66.5 mL by day 10) and pig albumin in a brain-dead recipient; in the first living recipient it was removed on day 38 for thrombotic microangiopathy, and the patient died on day 171. <sup class="c" data-ref="Tao2025Xeno,Zhang2026Xeno" title="Source 446,518">446,518</sup> See <a href="#transplant" data-go="transplant">Liver transplant</a>.`,
  pt:`Machines that keep a donor liver warm and fed help more livers be used safely. Pig livers are at the earliest experimental stage.`,
  hook:`Normothermic perfusion: −50% graft injury, −50% discard, +54% preservation time. <sup class="c" data-ref="Nasralla2018" title="Source 318">318</sup>`}
].map((s,i,a)=>Object.assign(s,{from:i/a.length,at:i/a.length+.62/a.length}));

inits.frontier=()=>{
  const svg=$('#frSvg'),rg=$('#frT'),N=FR_STEPS.length,seg=1/N;
  const T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const EVC={est:'var(--good)',early:'var(--warn)',hyp:'var(--rx)'},EVS={est:'var(--good-soft)',early:'var(--warn-soft)',hyp:'var(--rx-soft)'};
  let setSt=()=>{};
  function card(x,y,w,h,P,a,arrived,nr){const col=EVC[P.ev];let s=`<g style="opacity:${f1(a)}">`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="8" style="fill:var(--panel);stroke:${P.fail&&arrived?'var(--bad)':col};stroke-width:1.6${P.fail&&arrived?';stroke-dasharray:4 3':''}"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="5" height="${h}" rx="2" style="fill:${col}"/>`;
    s+=T(x+10,y+(nr?15:16),P.n,'t-lbl',`font-size:${nr?11:11.5}px`);
    if(!nr)s+=T(x+10,y+29,P.sub,'t-xs','font-size:8.8px');
    s+=`<rect x="${f1(x+10)}" y="${f1(y+h-15)}" width="${nr?78:84}" height="11" rx="3" style="fill:${EVS[P.ev]}"/>`+T(x+14,y+h-6.5,FR_EV[P.ev][0].toUpperCase(),'t-xs',`font-size:8px;font-weight:700;fill:${col};letter-spacing:.04em`);
    if(P.fail&&arrived)s+=`<path d="M${f1(x+w-20)} ${f1(y+h-18)}l12 12m0 -12l-12 12" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`;
    return s+'</g>'}
  function draw(t){
    const nr=vb(svg,'720 420','400 590'),ph=phaseOf(FR_STEPS,t),u=clamp((t-FR_STEPS[ph].from)/seg);let s='';
    const W=nr?{x0:8,w:384}:{x0:10,w:700},cw=W.w/5;
    if(!nr){FR_COLS.forEach((c,i)=>{const x=W.x0+i*cw;s+=`<rect x="${f1(x+2)}" y="10" width="${f1(cw-4)}" height="${nr?0:404}" rx="10" style="fill:${i===4?'var(--rx-soft)':'var(--panel-2)'};opacity:${i===4?.55:.45}"/>`+T(x+cw/2,30,c,'t-sm t-mid','fill:var(--ink);font-weight:700')+(i<4?`<path d="M${f1(x+cw-3)} 21l6 5l-6 5z" style="fill:var(--muted)"/>`:'')})}
    else{FR_COLS.forEach((c,i)=>{const y=34+i*112;s+=`<rect x="4" y="${y-22}" width="392" height="108" rx="10" style="fill:${i===4?'var(--rx-soft)':'var(--panel-2)'};opacity:${i===4?.55:.45}"/>`+T(14,y-7,`${i+1} · ${c}`,'t-sm','fill:var(--ink);font-weight:700')})}
    if(ph===0){/* overview: every programme as a chip in its column */
      const cnt=[0,0,0,0,0];
      FR_P.forEach((P,i)=>{const k=cnt[P.c]++,p=ease(clamp(u*2.2-i*.03)),col=EVC[P.ev];
        if(!nr){const x=W.x0+P.c*cw+6,y=46+k*30;s+=`<g style="opacity:${f1(.25+.75*p)}"><rect x="${f1(x)}" y="${y}" width="${f1(cw-12)}" height="24" rx="6" style="fill:var(--panel);stroke:${col};stroke-width:1.2${P.fail&&p>.98?';stroke-dasharray:3 3':''}"/><circle cx="${f1(x+9)}" cy="${y+12}" r="3.5" style="fill:${col}"/>${T(x+17,y+15.5,P.n.length>20?P.n.slice(0,19)+'…':P.n,'t-xs','fill:var(--ink)')}${P.fail&&p>.98?`<path d="M${f1(x+cw-24)} ${y+7}l9 10m0 -10l-9 10" style="stroke:var(--bad);stroke-width:1.8"/>`:''}</g>`}
        else{const y=34+P.c*112,x=12+(k%3)*128,yy=y+2+Math.floor(k/3)*21;s+=`<g style="opacity:${f1(.25+.75*p)}"><rect x="${x}" y="${f1(yy)}" width="122" height="20" rx="5" style="fill:var(--panel);stroke:${col};stroke-width:1.1"/><circle cx="${x+8}" cy="${f1(yy+10)}" r="3" style="fill:${col}"/>${T(x+15,yy+13.5,P.n.length>17?P.n.slice(0,16)+'…':P.n,'t-xs','fill:var(--ink);font-size:9.5px')}</g>`}});
    }else{
      const L=FR_P.filter(P=>P.s===ph),cnt=[0,0,0,0,0];
      L.forEach((P,i)=>{const k=cnt[P.c]++,p=ease(clamp((u-i*.06)/.3)),pos=p*P.c,arrived=p>.99;
        if(!nr){const w=cw-10,h=48,x=W.x0+pos*cw+5,y=48+i*60;s+=card(x,y,w,h,P,.35+.65*clamp(p*3),arrived,nr)}
        else{const w=124,h=36,y=34+pos*112+4+Math.floor(k/3)*40,x=8+(k%3)*128;s+=card(x,y,w,h,P,.35+.65*clamp(p*3),arrived,nr)}});
    }
    svg.innerHTML=s;setSt(ph);
    $('#frNote').innerHTML=noteHTML(FR_STEPS[ph]);
  }
  const stop=playWire(rg,$('#frPlay'),draw,36000,'Replay','frontier');
  setSt=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- filterable programme list ---------- */
  let fe='all';const tg=$('#frTgt'),nc=$('#frNct');
  const TG={mash:'MASH scarring, before cirrhosis',cirr:'Compensated cirrhosis',statin:'Statins & portal hypertension',cell:'Cell therapy & liver support',organ:'Donor livers & xenotransplant'};
  function list(){const L=FR_P.filter(P=>(fe==='all'||P.ev===fe)&&(tg.value==='all'||P.tgt===tg.value)&&(!nc.checked||P.nct));
    $('#frCount').textContent=`${L.length} of ${FR_P.length} programmes`;
    $('#frList').innerHTML=L.length?L.map(P=>`<div class="card"><div class="meta"><span class="ev ${FR_EV[P.ev][1]}">${FR_EV[P.ev][0]}</span>${P.fail?'<span class="tag bad">Did not meet goal</span>':''}<span class="tag">${FR_COLS[P.c]}</span></div><h4>${P.n} <small style="font:500 13px var(--body);color:var(--muted)">${P.sub}</small></h4><p class="st">${TG[P.tgt]} · ${P.st}</p><p>${P.txt}</p>${P.nct?`<p><a class="nct" href="https://clinicaltrials.gov/study/${P.nct}" target="_blank" rel="noopener">${P.nct} ↗</a></p>`:''}</div>`).join(''):`<div class="card"><h4>No programme matches</h4><p>Try another evidence level or target.</p></div>`}
  $$('[data-fe]').forEach(b=>b.addEventListener('click',()=>{fe=b.dataset.fe;$$('[data-fe]').forEach(x=>x.setAttribute('aria-pressed',x===b));list()}));
  tg.addEventListener('change',list);tg.addEventListener('input',list);nc.addEventListener('change',list);
  list();
};
/* =============== 6.1 History & people =============== */
/* Main scrubber: a four-lane timeline 1819–2024 (the stretch before 1950 compressed), vertical on phones; the
   current milestone shows in a card with a small picture from the kit. Second interactive: hepatitis C
   before and after cure, as 100-person icon arrays (van der Meer 2012). */
const HI_Y0=1819,HI_YB=1950,HI_Y1=2025,HI_UB=.12;
const hiU=y=>y<=HI_YB?(y-HI_Y0)/(HI_YB-HI_Y0)*HI_UB:HI_UB+(y-HI_YB)/(HI_Y1-HI_YB)*(1-HI_UB);
const hiYr=u=>u<=HI_UB?HI_Y0+u/HI_UB*(HI_YB-HI_Y0):HI_YB+(u-HI_UB)/(1-HI_UB)*(HI_Y1-HI_YB);
/* lane: 0 transplant, 1 scores, 2 viruses & medicines, 3 names, shunts & consensus; ic: picture in the card */
const HI_EV=[
 {y:1819,l:3,ic:'nm',t:'Laennec names cirrhosis',d:'From the Greek kirrhos, tawny, in a footnote to De l\'auscultation médiate.',c:`René Laennec named cirrhosis from the Greek <i>kirrhos</i> ("tawny") in a brief footnote to his treatise <i>De l'auscultation médiate</i>; the lesion had been recognised in England more than a century before. <sup class="c" data-ref="Duffin1987" title="Source 102">102</sup>`},
 {y:1958,l:0,ic:'tx',t:'Transplant technique in dogs',d:'Francis Moore describes orthotopic liver transplantation in dogs.',c:`Francis Moore described orthotopic liver transplantation in dogs. <sup class="c" data-ref="Meirelles2015" title="Source 301">301</sup>`},
 {y:1963,l:0,ic:'tx',t:'First human liver transplant',d:'Starzl and colleagues. None of the first five recipients lived beyond 23 days.',c:`Starzl and colleagues performed the first human liver transplant; none of the first five patients survived more than 23 days. <sup class="c" data-ref="Starzl1963,Meirelles2015" title="Source 301,435">301,435</sup>`},
 {y:1964,l:1,ic:'sc',t:'Child–Turcotte classification',d:'Made to stratify people facing surgery for portal hypertension.',c:`Child and Turcotte published their classification in the monograph <i>Surgery and portal hypertension</i>, to stratify patients facing portal-hypertension surgery. <sup class="c" data-ref="ChildTurcotte1964" title="Source 76">76</sup>`},
 {y:1965,l:2,ic:'vi',t:'A "new" antigen',d:'Blumberg, Alter and Visnich: later known as the Australia antigen of hepatitis B.',c:`Blumberg, Alter and Visnich described a "new" antigen in leukaemia sera, later known as the Australia antigen of hepatitis B. <sup class="c" data-ref="Blumberg1965" title="Source 44">44</sup>`},
 {y:1967,l:0,ic:'tx',t:'A successful series begins',d:'Encouraged by Calne\'s antilymphocyte serum; 3 recipients with extended survival reported in 1968.',c:`Starzl began a successful series, encouraged by Calne's use of antilymphocyte serum; a 1968 report described extended survival in 3 recipients. <sup class="c" data-ref="Meirelles2015,Starzl1968Surgery" title="Source 301,436">301,436</sup> By 1977 about 200 liver transplants had been performed worldwide. <sup class="c" data-ref="Meirelles2015" title="Source 301">301</sup>`},
 {y:1969,l:3,ic:'sh',t:'An experimental transjugular shunt',d:'Rösch, Hanafee and Snow, in an experimental study.',c:`Rösch, Hanafee and Snow described transjugular portal venography and an experimental radiologic portacaval shunt. <sup class="c" data-ref="Rosch1969" title="Source 391">391</sup>`},
 {y:1973,l:1,ic:'sc',t:'Child–Pugh',d:'Pugh and colleagues modify the classification, in a paper on bleeding varices.',c:`Pugh and colleagues' modification, the Child–Pugh score, appeared in a paper on oesophageal transection for bleeding oesophageal varices. <sup class="c" data-ref="Pugh1973" title="Source 367">367</sup>`},
 {y:1979,l:2,ic:'rx',t:'Cyclosporin A',d:'Calne: 34 recipients of cadaveric organs, 2 of them livers.',c:`Calne reported cyclosporin A as the first immunosuppressant in 34 recipients of cadaveric organs, including 2 livers that were working at the time of the report. <sup class="c" data-ref="Calne1979" title="Source 58">58</sup>`},
 {y:1981,l:0,ic:'tx',t:'Cyclosporin with prednisone',d:'Starzl reports liver transplantation using the combination.',c:`Starzl reported liver transplantation using cyclosporin A plus prednisone. <sup class="c" data-ref="Starzl1981NEJM" title="Source 437">437</sup>`},
 {y:1983,l:0,ic:'cs',t:'NIH consensus conference',d:'On liver transplantation, held in June 1983.',c:`A US NIH Consensus Development Conference on liver transplantation was held in June 1983. <sup class="c" data-ref="NIH1984LT" title="Source 336">336</sup>`},
 {y:1986,l:3,ic:'cs',t:'Groningen meeting',d:'The start of the consensus series on portal hypertension that became Baveno.',c:`The Baveno consensus series began with a meeting in Groningen; Baveno I followed in 1990. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`},
 {y:1989,l:2,ic:'vi',t:'Hepatitis C identified',d:'Choo, Houghton and colleagues clone the blood-borne non-A, non-B agent.',c:`Choo, Houghton and colleagues isolated a cDNA clone from the blood-borne non-A, non-B hepatitis agent, now known as hepatitis C virus. <sup class="c" data-ref="Choo1989" title="Source 79">79</sup>`},
 {y:1989.4,l:3,ic:'sh',t:'The first TIPS in a person',d:'Heidelberg: a stent shunt placed by interventional radiology; gradient 38 → 18 mmHg.',c:`Richter and colleagues in Heidelberg reported the first stent-supported transjugular intrahepatic portosystemic shunt done entirely by interventional radiology: a 49-year-old man with Child C cirrhosis whose gradient fell from 38 to 18 mmHg. Their 1990 pilot of 9 patients used Palmaz stents. <sup class="c" data-ref="Richter1989Radiologe,Richter1990CVIR" title="Source 378,379">378,379</sup>`},
 {y:1990,l:2,ic:'rx',t:'Tacrolimus',d:'Follows Starzl\'s 1989 report: 1,179 transplants, 73% alive at 1 year.',c:`In 1989 Starzl reported 1,179 consecutive liver transplants with 73% 1-year and 64% 5-year survival; tacrolimus followed in 1990. <sup class="c" data-ref="Meirelles2015" title="Source 301">301</sup>`},
 {y:2000,l:1,ic:'sc',t:'The Mayo TIPS model',d:'Bilirubin, creatinine, INR and cause predicted survival after TIPS: the seed of MELD.',c:`MELD began as the Mayo TIPS model: bilirubin, creatinine, INR and the cause of liver disease predicted survival in 231 patients having elective TIPS. <sup class="c" data-ref="Malinchoc2000" title="Source 286">286</sup>`},
 {y:2001,l:1,ic:'sc',t:'MELD validated',d:'In 4 independent groups; c-statistics 0.78–0.87 for death at 3 months.',c:`The model was validated as MELD in 4 independent groups, with c-statistics for 3-month death of 0.78 to 0.87. <sup class="c" data-ref="Kamath2001MELD" title="Source 221">221</sup>`},
 {y:2003,l:1,ic:'sc',t:'MELD and donor livers',d:'Among 3,437 waiting-list candidates, MELD beat Child–Turcotte–Pugh (0.83 vs 0.76).',c:`In 3,437 US waiting-list candidates, 3-month mortality was 1.9% at MELD below 9 and 71.3% at MELD 40 or above; the c-statistic of 0.83 against 0.76 for Child–Turcotte–Pugh supported MELD-based allocation of donor livers. <sup class="c" data-ref="Wiesner2003" title="Source 496">496</sup>`},
 {y:2008,l:1,ic:'sc',t:'MELD-Na',d:'Serum sodium adds to MELD in predicting death on the waiting list.',c:`Serum sodium predicted waiting-list death on top of MELD (HR 1.05 per 1 mmol/L fall between 125 and 140). <sup class="c" data-ref="Kim2008MELDNa" title="Source 233">233</sup>`},
 {y:2013,l:2,ic:'rx',t:'Sofosbuvir approved',d:'FDA approval on 6 December 2013. The same year, CANONIC defines ACLF.',c:`The FDA first approved sofosbuvir (Sovaldi) on 6 December 2013; in its phase 3 trials, 90% of untreated patients given 12 weeks with peginterferon–ribavirin had SVR. <sup class="c" data-ref="FDA-Sovaldi,Lawitz2013" title="Source 145,259">145,259</sup> The CANONIC study defined acute-on-chronic liver failure the same year. <sup class="c" data-ref="Moreau2013CANONIC" title="Source 314">314</sup>`},
 {y:2014,l:2,ic:'rx',t:'Interferon-free treatment',d:'Ledipasvir/sofosbuvir approved on 10 October 2014.',c:`The FDA first approved the interferon-free combination ledipasvir/sofosbuvir (Harvoni) on 10 October 2014. <sup class="c" data-ref="FDA-Harvoni" title="Source 133">133</sup>`},
 {y:2020,l:2,ic:'vi',t:'Nobel Prize for hepatitis C',d:'Harvey Alter, Michael Houghton and Charles Rice.',c:`Harvey Alter, Michael Houghton and Charles Rice shared the 2020 Nobel Prize in Physiology or Medicine for the discovery of hepatitis C virus; WHO set a goal of global elimination by 2030. <sup class="c" data-ref="Lin2021Nobel" title="Source 268">268</sup>`},
 {y:2021,l:1,ic:'sc',t:'MELD 3.0 and Baveno VII',d:'MELD adds female sex and albumin; Baveno VII meets in October.',c:`MELD 3.0 added female sex and albumin, interaction terms and a creatinine cap of 3.0 mg/dL (C-statistic 0.869 vs 0.862 for MELD-Na). <sup class="c" data-ref="Kim2021MELD3" title="Source 236">236</sup> The Baveno VII workshop met in October 2021. <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>`},
 {y:2023,l:3,ic:'nm',t:'MASLD, and MELD 3.0 in use',d:'NAFLD renamed MASLD; US allocation moves to MELD 3.0 in July.',c:`A multisociety Delphi consensus renamed NAFLD as MASLD and created MetALD. <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup> The US replaced MELD-Na with MELD 3.0 for allocation in July 2023, partly to narrow the sex gap in access; US liver transplants reached a record 10,659 that year. <sup class="c" data-ref="Kwong2025OPTN" title="Source 250">250</sup>`},
 {y:2024,l:2,ic:'rx',t:'Resmetirom',d:'Approved for noncirrhotic MASH with moderate to advanced fibrosis (F2–F3).',c:`Resmetirom received US accelerated approval, with diet and exercise, for adults with noncirrhotic MASH and F2–F3 fibrosis; the label says to avoid it in decompensated cirrhosis. <sup class="c" data-ref="FDA-Rezdiffra" title="Source 143">143</sup> In MAESTRO-NASH, fibrosis improved by at least one stage in 24.2–25.9% vs 14.2% on placebo at 52 weeks. <sup class="c" data-ref="Harrison2024MAESTRO" title="Source 193">193</sup>`}];
const HI_LANES=['Transplant','Scores','Viruses & medicines','Names, shunts, consensus'];
const HI_LN=[['transplant'],['scores'],['virus &','drugs'],['names &','shunts']];
const HI_STEPS=[
 {from:0,at:0,y0:1819,k:'1819',t:'A name',
  txt:`Laennec gave cirrhosis its name in 1819 in a footnote. <sup class="c" data-ref="Duffin1987" title="Source 102">102</sup> For more than a century after that, there was little to offer but description: the scale here is compressed until 1950.`,
  pt:`"Cirrhosis" comes from a Greek word for an orange-yellow, tawny colour: the colour of the scarred liver. <sup class="c" data-ref="Duffin1987" title="Source 102">102</sup>`,
  hook:`Laennec coined "cirrhosis" in 1819, from Greek <i>kirrhos</i>, "tawny". <sup class="c" data-ref="Duffin1987" title="Source 102">102</sup>`},
 {from:hiU(1955),at:hiU(1963.2),y0:1958,k:'1958–1969',t:'First transplants, first scores',
  txt:`Within a decade came the transplant technique in dogs (1958), Starzl's first human liver transplant (1963), the Child–Turcotte classification for surgery in portal hypertension (1964), the antigen later tied to hepatitis B (1965), the first successful transplant series (1967) and an experimental transjugular shunt (1969). <sup class="c" data-ref="Meirelles2015,Starzl1963,ChildTurcotte1964,Blumberg1965,Rosch1969" title="Source 44,76,301,391,435">44,76,301,391,435</sup>`,
  pt:`The first liver transplants did not succeed for long, but they showed it could be done. <sup class="c" data-ref="Meirelles2015" title="Source 301">301</sup>`,
  hook:`Starzl: first human liver transplant 1963, first successful series 1967. <sup class="c" data-ref="Meirelles2015" title="Source 301">301</sup>`},
 {from:hiU(1971),at:hiU(1973.2),y0:1973,k:'1973–1990',t:'Making it work',
  txt:`Pugh's modification gave Child–Pugh (1973). <sup class="c" data-ref="Pugh1973" title="Source 367">367</sup> Cyclosporin (1979, 1981) and then tacrolimus (1990) made transplant survivable for many: Starzl's 1,179 transplants reported in 1989 had 73% 1-year survival. <sup class="c" data-ref="Calne1979,Starzl1981NEJM,Meirelles2015" title="Source 58,301,437">58,301,437</sup> 1989 also brought the identification of hepatitis C and the first TIPS in a person. <sup class="c" data-ref="Choo1989,Richter1989Radiologe" title="Source 79,378">79,378</sup>`,
  pt:`Medicines that calm the immune system turned transplant from an experiment into a treatment. <sup class="c" data-ref="Meirelles2015" title="Source 301">301</sup>`,
  hook:`The first stent-supported TIPS was placed in Heidelberg in 1989 (Richter, Palmaz stents). <sup class="c" data-ref="Richter1989Radiologe" title="Source 378">378</sup>`},
 {from:hiU(1997),at:hiU(2000.2),y0:2000,k:'2000–2008',t:'MELD',
  txt:`A model built to predict survival after TIPS (2000) became the Model for End-Stage Liver Disease, validated in 2001, and was used to rank people for donor livers. Sodium was added in 2008. <sup class="c" data-ref="Malinchoc2000,Kamath2001MELD,Wiesner2003,Kim2008MELDNa" title="Source 221,233,286,496">221,233,286,496</sup> Across 119 studies, Child–Pugh and MELD had similar prognostic value in most settings. <sup class="c" data-ref="Peng2016ChildMELD" title="Source 351">351</sup>`,
  pt:`MELD is a number made from a few blood tests. It helps decide who most urgently needs a donor liver. Try the teaching calculator in <a href="#scores" data-go="scores">Child–Pugh &amp; MELD</a>.`,
  hook:`MELD was born from a TIPS survival model (2000) using bilirubin, creatinine and INR. <sup class="c" data-ref="Malinchoc2000,Kamath2001MELD" title="Source 221,286">221,286</sup>`},
 {from:hiU(2011),at:hiU(2013.2),y0:2013,k:'2013–2020',t:'Curing hepatitis C',
  txt:`Sofosbuvir (December 2013) and the interferon-free ledipasvir/sofosbuvir (October 2014) opened the era of tablet cures. <sup class="c" data-ref="FDA-Sovaldi,FDA-Harvoni" title="Source 133,145">133,145</sup> The 2020 Nobel Prize honoured the discovery of the virus; antivirals now clear it in up to 95% of those treated. <sup class="c" data-ref="Lin2021Nobel" title="Source 268">268</sup> ACLF was defined in 2013. <sup class="c" data-ref="Moreau2013CANONIC" title="Source 314">314</sup>`,
  pt:`Hepatitis C went from a lifelong infection to one that a course of tablets can cure in most people. <sup class="c" data-ref="Lin2021Nobel" title="Source 268">268</sup>`,
  hook:`Hepatitis C was discovered in 1989; the discovery won the 2020 Nobel Prize. <sup class="c" data-ref="Choo1989,Lin2021Nobel" title="Source 79,268">79,268</sup>`},
 {from:hiU(2020.6),at:hiU(2021.2),y0:2021,k:'2021–2024',t:'New names, new tools',
  txt:`MELD 3.0 (2021) added female sex and albumin and was adopted for US allocation in July 2023. Baveno VII (2021) renewed the consensus on portal hypertension. MASLD replaced NAFLD in 2023. Resmetirom was approved in 2024 for noncirrhotic MASH with F2–F3 fibrosis. <sup class="c" data-ref="Kim2021MELD3,Kwong2025OPTN,deFranchis2022BavenoVII,Rinella2023MASLD,FDA-Rezdiffra" title="Source 97,143,236,250,382">97,143,236,250,382</sup>`,
  pt:`Names and scores keep changing as the evidence grows, often to make care fairer, as MELD 3.0 did for women. <sup class="c" data-ref="Kwong2025OPTN" title="Source 250">250</sup>`,
  hook:`MELD-Na 2008; MELD 3.0 added female sex and albumin, US adoption July 2023. <sup class="c" data-ref="Kim2008MELDNa,Kim2021MELD3,Kwong2025OPTN" title="Source 233,236,250">233,236,250</sup>`}];
const HI_HCV={no:{t:'No cure (no SVR)',v:[26.0,29.9,21.8]},svr:{t:'Cured (SVR)',v:[8.9,2.1,5.1]}};

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),now=$('#hiNow'),chips=$('#hiYears');
  const T=(x,y,txt,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const wrap=(s,n)=>{const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c.trim());c=x}else c+=' '+x});if(c.trim())L.push(c.trim());return L};
  const LC=['var(--rx)','var(--dx)','var(--portal)','var(--liver)'];
  const yrTxt=y=>String(Math.floor(y));
  function virus(x,y,r){let g='';for(let i=0;i<10;i++){const a=i/10*2*Math.PI;g+=`<line x1="${f1(x+Math.cos(a)*r)}" y1="${f1(y+Math.sin(a)*r)}" x2="${f1(x+Math.cos(a)*r*1.35)}" y2="${f1(y+Math.sin(a)*r*1.35)}" style="stroke:var(--portal);stroke-width:2"/><circle cx="${f1(x+Math.cos(a)*r*1.4)}" cy="${f1(y+Math.sin(a)*r*1.4)}" r="${f1(r*.1+1)}" style="fill:var(--portal)"/>`}
    return g+`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--portal-soft);stroke:var(--portal);stroke-width:2"/><path d="M${f1(x-r*.5)} ${f1(y)}q${f1(r*.25)} ${f1(-r*.4)} ${f1(r*.5)} 0t${f1(r*.5)} 0" style="fill:none;stroke:var(--portal);stroke-width:1.5"/>`}
  function pic(e,x,y,s){/* (x,y) centre, s scale ~1 = 120 wide box */
    switch(e.ic){
      case 'nm':return e.y<1900?liver(x,y,.62*s,{fib:4,seed:3}).svg+T(x,y+50*s,'kirrhos: tawny','t-xs t-mid','fill:var(--accent)'):liver(x,y,.58*s,{fib:1.2,seed:5}).svg+T(x,y+48*s,'MASLD','t-xs t-mid','fill:var(--accent)');
      case 'tx':return liver(x-6*s,y-4*s,.5*s,{fib:0,seed:8}).svg+`<path d="M${f1(x+34*s)} ${f1(y-30*s)}v${f1(24*s)}M${f1(x+22*s)} ${f1(y-18*s)}h${f1(24*s)}" style="stroke:var(--rx);stroke-width:${f1(5*s)};stroke-linecap:round"/>`+T(x,y+44*s,'new liver','t-xs t-mid');
      case 'sc':return gauge(x,y+22*s,40*s,e.y<1990?2:e.y<2010?3:3.6,4,{ends:false,label:e.y<1990?'Child':'MELD',bands:[{to:1.5,col:'var(--rx-soft)'},{to:3,col:'var(--accent-soft)'},{to:4,col:'var(--bad-soft)'}]});
      case 'vi':return virus(x,y,20*s)+T(x,y+44*s,e.y<1980?'hepatitis B':'hepatitis C','t-xs t-mid');
      case 'rx':return pill(x-14*s,y-6*s,40*s,{ang:-24,col:'var(--rx)'})+pill(x+20*s,y+10*s,26*s,{round:true,col:'var(--rx)'})+T(x,y+44*s,e.y<1995?'anti-rejection':'antiviral','t-xs t-mid');
      case 'sh':return portalMap(x,y+6*s,.38*s,{pressure:.7,tips:e.y>1980?1:.5,labels:false,flow:.3}).svg;
      default:return `<rect x="${f1(x-30*s)}" y="${f1(y-30*s)}" width="${f1(48*s)}" height="${f1(60*s)}" rx="4" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${f1(x-18*s)}" y="${f1(y-24*s)}" width="${f1(48*s)}" height="${f1(60*s)}" rx="4" style="fill:var(--panel-2);stroke:var(--muted)"/>`+[0,1,2,3].map(i=>`<line x1="${f1(x-10*s)}" x2="${f1(x+22*s)}" y1="${f1(y-12*s+i*11*s)}" y2="${f1(y-12*s+i*11*s)}" style="stroke:var(--muted);stroke-width:1.5"/>`).join('')+T(x,y+46*s,'consensus','t-xs t-mid')}}
  const curIdx=t=>{let k=0;HI_EV.forEach((e,i)=>{if(hiU(e.y)<=t+1e-6)k=i});return k};
  let setActive=()=>{},lastK=-1;
  function draw(t){const N=vb(svg,'720 380','400 560'),p=phaseOf(HI_STEPS,t),P=HI_STEPS[p],k=curIdx(t),E=HI_EV[k],yr=hiYr(t);
    let s=T(N?20:28,26,P.t,'t-big','font-size:19px')+T(N?20:28,44,P.k,'t-sm');
    /* the card */
    const C=N?{x:16,y:56,w:368,h:166}:{x:28,y:58,w:664,h:148};
    const fresh=clamp((t-hiU(E.y))/.012);
    s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="12" style="fill:var(--field);stroke:${LC[E.l]};stroke-width:${f1(1+1.2*(1-fresh))}"/>`;
    s+=`<rect x="${C.x}" y="${C.y}" width="6" height="${C.h}" rx="3" style="fill:${LC[E.l]}"/>`;
    s+=`<g>`+pic(E,N?C.x+C.w-62:C.x+84,C.y+C.h/2-(N?14:6),N?.8:1)+'</g>';
    const tx=N?C.x+20:C.x+176,ml=N?34:62;
    s+=`<text x="${tx}" y="${C.y+(N?36:40)}" class="t-big" style="font-size:${N?28:32}px;fill:${LC[E.l]}">${yrTxt(E.y)}</text>`;
    s+=T(tx+(N?0:96),C.y+(N?60:36),E.t,'t-lbl',N?'':'font-size:15px');
    s+=T(tx+(N?0:96),C.y+(N?76:54),HI_LANES[E.l],'t-xs');
    wrap(E.d,N?ml:ml).forEach((l,i)=>{s+=T(tx,C.y+(N?98:84)+i*16,l,'t-sm','fill:var(--ink)')});
    if(N){/* vertical timeline: years run down the page */
      const Y0=262,Y1=546,X0=66,Y=u=>Y0+(Y1-Y0)*u,LX=[110,162,214,266];
      HI_STEPS.forEach((q,i)=>{const a=Y(hiU(q.y0)),b=i<5?Y(HI_STEPS[i+1].from):Y1;s+=`<rect x="${X0}" y="${f1(Y(q.from))}" width="${384-X0}" height="${f1(b-Y(q.from))}" style="fill:${i%2?'var(--panel-2)':'var(--field)'};opacity:.6"/>`+T(380,Y(q.from)+12,q.k,'t-xs t-end')});
      s+=`<line x1="${X0}" x2="${X0}" y1="${Y0}" y2="${Y1}" class="axis"/>`;
      [1819,1950,1960,1970,1980,1990,2000,2010,2020].forEach(v=>{const yy=Y(hiU(v));s+=`<line x1="${X0-4}" x2="${X0}" y1="${f1(yy)}" y2="${f1(yy)}" class="axis"/>`+T(X0-7,yy+3,v,'t-xs t-end')});
      s+=T(X0-7,Y(HI_UB/2)+3,'≈','t-sm t-end');
      HI_LN.forEach((l,i)=>{l.forEach((w,j)=>{s+=T(LX[i],Y0-14+j*10-(l.length-1)*10,w,'t-xs t-mid',`fill:${LC[i]}`)});s+=`<line x1="${LX[i]}" x2="${LX[i]}" y1="${Y0}" y2="${Y1}" style="stroke:${LC[i]};stroke-width:1;opacity:.25"/>`});
      HI_EV.forEach((e,i)=>{const yy=Y(hiU(e.y)),on=hiU(e.y)<=t+1e-6,c=i===k;s+=`<circle cx="${LX[e.l]}" cy="${f1(yy)}" r="${c?6.5:4}" style="fill:${on?LC[e.l]:'var(--panel)'};stroke:${LC[e.l]};stroke-width:1.6"/>`;
        if(c)s+=`<circle cx="${LX[e.l]}" cy="${f1(yy)}" r="11" style="fill:none;stroke:${LC[e.l]};stroke-width:1.4;opacity:.6"/>`});
      const py=Y(t);s+=`<line x1="${X0}" x2="384" y1="${f1(py)}" y2="${f1(py)}" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/><rect x="${X0+222}" y="${f1(py-9)}" width="40" height="16" rx="8" style="fill:var(--ink)"/>`+T(X0+242,py+3,Math.round(yr),'t-xs t-mid','fill:var(--bg);font-weight:700')}
    else{/* horizontal timeline in four lanes */
      const X0=162,X1=700,X=u=>X0+(X1-X0)*u,LY=[290,312,334,356],AY=258;
      HI_STEPS.forEach((q,i)=>{const b=i<5?X(HI_STEPS[i+1].from):X1;s+=`<rect x="${f1(X(q.from))}" y="226" width="${f1(b-X(q.from))}" height="20" style="fill:${i%2?'var(--panel-2)':'var(--brand-soft)'};opacity:.8"/>`;
        if(b-X(q.from)>40)s+=T((X(q.from)+b)/2,240,q.k,'t-xs t-mid','fill:var(--ink)')});
      s+=`<line x1="${X0}" x2="${X1}" y1="${AY}" y2="${AY}" class="axis"/>`;
      [1950,1960,1970,1980,1990,2000,2010,2020].forEach(v=>{const xx=X(hiU(v));s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${AY-3}" y2="${AY+3}" class="axis"/>`+T(xx,AY+14,v,'t-xs t-mid')});
      s+=T(X0,AY+14,'1819','t-xs t-mid')+T(X(HI_UB/2),AY-4,'≈ compressed','t-xs t-mid');
      HI_LANES.forEach((l,i)=>{s+=T(X0-10,LY[i]+3,l,'t-xs t-end',`fill:${LC[i]}`)+`<line x1="${X0}" x2="${X1}" y1="${LY[i]}" y2="${LY[i]}" style="stroke:${LC[i]};stroke-width:1;opacity:.25"/>`});
      HI_EV.forEach((e,i)=>{const xx=X(hiU(e.y)),on=hiU(e.y)<=t+1e-6,c=i===k;s+=`<circle cx="${f1(xx)}" cy="${LY[e.l]}" r="${c?6.5:4}" style="fill:${on?LC[e.l]:'var(--panel)'};stroke:${LC[e.l]};stroke-width:1.6"/>`;
        if(c)s+=`<circle cx="${f1(xx)}" cy="${LY[e.l]}" r="11" style="fill:none;stroke:${LC[e.l]};stroke-width:1.4;opacity:.6"/>`});
      const px=X(t);s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="222" y2="366" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/><rect x="${f1(px-20)}" y="208" width="40" height="16" rx="8" style="fill:var(--ink)"/>`+T(px,220,Math.round(yr),'t-xs t-mid','fill:var(--bg);font-weight:700')}
    svg.innerHTML=s;
    note.innerHTML=noteHTML(P);setActive(p);
    if(k!==lastK){lastK=k;now.innerHTML=`<b>${yrTxt(E.y)}</b>${E.c}`;$$('[data-hy]',chips).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.hy===k))}
    rg.setAttribute('aria-valuetext',`${Math.round(yr)}: ${E.t}`)}
  const stop=playWire(rg,$('#hiPlay'),draw,32000,'Replay','history');
  setActive=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  chips.innerHTML=HI_EV.map((e,i)=>`<button class="tag" data-hy="${i}" aria-pressed="false">${yrTxt(e.y)} · ${e.t}</button>`).join('');
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=hiU(HI_EV[+b.dataset.hy].y)+.0005;rg.value=v;draw(v)});
  draw(+rg.value);

  /* hepatitis C before and after cure */
  const hs=$('#hiHcv'),hn=$('#hiHcvNote');let hk='no',cur=HI_HCV.no.v.slice(),stopH=null;
  const LBL=[['Death from any cause','10 years'],['Liver failure','10 years'],['Liver cancer (HCC)','10 years']];
  function drawH(v){const N=vb(hs,'720 290','400 520');let s='';
    v.forEach((x,j)=>{const A=N?{x:20,y:20+j*168,d:13.5,s:11}:{x:24+j*236,y:44,d:19,s:15};
      const n=Math.round(x);
      s+=T(A.x,A.y-(N?6:22),LBL[j][0],'t-lbl')+(N?'':T(A.x,A.y-8,'per 100 people, '+LBL[j][1],'t-xs'));
      for(let i=0;i<100;i++){const px=A.x+(i%10)*A.d+A.d/2,py=A.y+(N?6:0)+Math.floor(i/10)*A.d;s+=person(px,py,A.s,i<n?(hk==='svr'?'var(--rx)':'var(--bad)'):'var(--panel-2)')}
      const bx=N?A.x+10*A.d+22:A.x,by=N?A.y+48:A.y+10*A.d+30;
      s+=`<text x="${f1(bx)}" y="${f1(by)}" class="t-big" style="font-size:${N?30:26}px;fill:${hk==='svr'?'var(--rx)':'var(--bad)'}">${f1(x)}</text>`+T(bx+(N?0:62),by+(N?18:-2),N?'per 100 at 10 years':'per 100','t-xs')});
    hs.innerHTML=s}
  function setH(k){hk=k;$$('[data-hc]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.hc===k));if(stopH)stopH();
    const a=cur.slice(),B=HI_HCV[k].v;stopH=animate(800,q=>{const e=ease(q);cur=a.map((x,i)=>lerp(x,B[i],e));drawH(cur)},()=>{stopH=null});
    hn.innerHTML=noteHTML({k:'Van der Meer 2012 · 530 people',t:HI_HCV[k].t,
      txt:k==='svr'?`With SVR, 10-year all-cause mortality was 8.9%, liver failure 2.1% and liver cancer 5.1%; liver-related death or transplant was 1.9% against 27.4% without SVR (HR 0.26 for all-cause death). <sup class="c" data-ref="vanderMeer2012" title="Source 477">477</sup>`:`Without SVR, 10-year all-cause mortality was 26.0%, liver failure 29.9% and liver cancer 21.8% in this cohort of people with advanced fibrosis or cirrhosis. <sup class="c" data-ref="vanderMeer2012" title="Source 477">477</sup>`,
      pt:k==='svr'?'Curing hepatitis C lowers the chance of liver failure and death a great deal. The risk of liver cancer goes down but does not go away, so checks continue. <sup class="c" data-ref="Kanwal2017" title="Source 225">225</sup>':'Before tablets that cure, many people with hepatitis C and advanced scarring went on to liver failure or cancer.',
      hook:'SVR in hepatitis C with advanced fibrosis cut 10-year all-cause mortality from 26.0% to 8.9%. <sup class="c" data-ref="vanderMeer2012" title="Source 477">477</sup>'})}
  $$('[data-hc]').forEach(b=>b.addEventListener('click',()=>setH(b.dataset.hc)));
  drawH(cur);setH('no');
  const prevR=redraws.history;redraws.history=()=>{prevR&&prevR();drawH(cur)};
  const prevH=onHide.history;onHide.history=()=>{prevH&&prevH();if(stopH){stopH();stopH=null}};
};
/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · Understanding cirrhosis",2:"Part 2 · Causes",3:"Part 3 · Diagnosis & staging",4:"Part 4 · Complications",5:"Part 5 · Treatment & living",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding cirrhosis ---- */
 [1,`What is cirrhosis?`,`A long period of inflammation replaces healthy liver tissue with fibrous scar and regenerative nodules, which leads to portal hypertension <sup class="c" data-ref="Gines2021Lancet" title="Source 180">180</sup>. Under the microscope: regenerative nodules surrounded by fibrous bands <sup class="c" data-ref="Schuppan2008" title="Source 411">411</sup>.`],
 [1,`Is cirrhosis an alcohol disease?`,`Not only. Causes include obesity and fatty liver disease, high alcohol intake, hepatitis B or C, autoimmune and cholestatic diseases, and iron or copper overload <sup class="c" data-ref="Gines2021Lancet" title="Source 180">180</sup>. In the US many people have more than one cause <sup class="c" data-ref="Tapper2023JAMA" title="Source 453">453</sup>.`],
 [1,`How many deaths did cirrhosis cause worldwide in 2017?`,`More than 1.32 million, or 2.4% of all deaths, up from fewer than 899,000 in 1990 <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup>.`],
 [1,`If deaths rose from 1990 to 2017, did the death rate rise too?`,`No. The age-standardised death rate fell from 21.0 to 16.5 per 100,000; counts rose mainly because the population grew and aged <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup>.`],
 [1,`How many US adults with laboratory evidence of cirrhosis knew they had liver disease?`,`Only about 3 in 10: 69% were unaware (NHANES 1999–2010) <sup class="c" data-ref="Scaglione2015" title="Source 406">406</sup>.`],
 [1,`How do compensated and decompensated cirrhosis differ in survival?`,`Median survival over 12 years when compensated, under 2 years when decompensated. These are population statistics <sup class="c" data-ref="Zipprich2012,DAmico2006" title="Source 93,519">93,519</sup>.`],
 [1,`Where does the liver's blood come from?`,`75–80% through the portal vein from the gut and spleen, about 25% from the hepatic artery. The liver gets nearly 25% of cardiac output at about 2.5% of body weight <sup class="c" data-ref="Eipel2010" title="Source 117">117</sup>.`],
 [1,`Which lobule zone gets the most oxygen?`,`Zone 1, periportal. Zone 3, around the central vein, gets the least <sup class="c" data-ref="Trefts2017,Kietzmann2017" title="Source 232,467">232,467</sup>.`],
 [1,`Where do stellate cells live, and what do they store?`,`In the space of Disse, between hepatocytes and sinusoidal cells. They hold 80–90% of the liver's vitamin A <sup class="c" data-ref="Friedman2008PhysiolRev" title="Source 165">165</sup>.`],
 [1,`Which cells make most of the scar?`,`Activated stellate cells (myofibroblasts): 82–96% of myofibroblasts in mouse fate-tracing <sup class="c" data-ref="Mederacke2013" title="Source 300">300</sup>.`],
 [1,`Can scar in the liver shrink?`,`Yes, when the cause is removed (Established) <sup class="c" data-ref="Kisseleva2021" title="Source 240">240</sup>. After 5 years of tenofovir, 74% of people with cirrhosis on biopsy no longer met criteria for cirrhosis <sup class="c" data-ref="Marcellin2013" title="Source 289">289</sup>.`],
 [1,`What limits regression?`,`Matrix cross-linking by tissue transglutaminase and failed stellate-cell apoptosis, in a rat model <sup class="c" data-ref="Issa2004" title="Source 211">211</sup>. When cirrhosis becomes truly irreversible is not established <sup class="c" data-ref="GarciaTsao2010" title="Source 171">171</sup>.`],
 [1,`How fast does untreated hepatitis C scar the liver?`,`A median 0.133 METAVIR units a year, about 30 years to cirrhosis, from 13 to 42 years depending on age, sex and alcohol <sup class="c" data-ref="Poynard1997" title="Source 366">366</sup>.`],
 /* ---- Part 2: causes ---- */
 [2,`How many heavy drinkers get fatty liver, and how many get severe disease?`,`Fatty liver in about 90%; only about 10–20% develop alcohol-associated hepatitis or cirrhosis (ACG 2018) <sup class="c" data-ref="Singal2018ACG" title="Source 428">428</sup>.`],
 [2,`At the same intake, who has the higher cirrhosis risk: women or men?`,`Women. One drink a day raised risk in women but not men, and women's risk was higher at every level <sup class="c" data-ref="Roerecke2019Cirrhosis" title="Source 385">385</sup>.`],
 [2,`Does drinking pattern matter?`,`Yes. At the same total intake, daily drinking raised cirrhosis risk (RR 1.71 in men, 1.56 in women) (Early evidence) <sup class="c" data-ref="LlamosasFalcon2023" title="Source 270">270</sup>.`],
 [2,`Which gene variant raises risk for both alcohol-related cirrhosis and MASLD?`,`PNPLA3 rs738409 (I148M), with TM6SF2 and MBOAT7 <sup class="c" data-ref="Buch2015NatGenet,Romeo2008PNPLA3" title="Source 52,390">52,390</sup>. AASLD does not recommend genetic testing, as it does not change management <sup class="c" data-ref="Rinella2023AASLD" title="Source 381">381</sup>.`],
 [2,`What lab pattern fits alcohol-associated hepatitis in the NIAAA criteria?`,`AST over 50 IU/L, AST/ALT over 1.5, both under 400 IU/L, and bilirubin over 3.0 mg/dL, with jaundice within 8 weeks <sup class="c" data-ref="Crabb2016NIAAA" title="Source 87">87</sup>.`],
 [2,`What did STOPAH show?`,`Prednisolone: 28-day mortality OR 0.72 (P = 0.06), no 90-day or 1-year benefit, and serious infections 13% vs 7%. Pentoxifylline did not help <sup class="c" data-ref="Thursz2015STOPAH" title="Source 465">465</sup>.`],
 [2,`What does a Lille score of 0.45 or more mean?`,`Non-response to steroids at about day 7: 6-month survival 25% vs 85% below it <sup class="c" data-ref="Louvet2007Lille" title="Source 279">279</sup>.`],
 [2,`What did the first early-transplant study in severe alcohol-associated hepatitis find?`,`6-month survival 77% vs 23% in matched controls, in 26 highly selected people (fewer than 2% of admissions) <sup class="c" data-ref="Mathurin2011NEJM" title="Source 293">293</sup>.`],
 [2,`How often does decompensated alcohol-related cirrhosis recompensate after stopping drinking?`,`12.3% at 1 year, 23.4% at 2 years and 33.8% at 5 years; stopping within a month doubled the chance <sup class="c" data-ref="Hofer2026JHep" title="Source 202">202</sup>.`],
 [2,`What is MASLD?`,`Steatotic liver disease plus at least 1 of 5 cardiometabolic risk factors; it replaced NAFLD in 2023, and MASH replaced NASH <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>.`],
 [2,`How much weight loss reversed MASH in the lifestyle biopsy study?`,`At 10% or more: NASH resolution in 90% and fibrosis regression in 45% <sup class="c" data-ref="VilarGomez2015" title="Source 481">481</sup>.`],
 [2,`What does the resmetirom label cover?`,`Adults with noncirrhotic MASH and F2–F3 fibrosis, with diet and exercise, under accelerated approval; avoid in decompensated cirrhosis <sup class="c" data-ref="FDA-Rezdiffra" title="Source 143">143</sup>.`],
 [2,`How likely is hepatitis B to become chronic?`,`90% in newborns of HBeAg-positive mothers, 25–30% in under-5s, under 5% in adults <sup class="c" data-ref="Terrault2018AASLD" title="Source 459">459</sup>.`],
 [2,`What did REVEAL-HBV show?`,`Cirrhosis risk rose with viral load: 4.5% at under 300 copies/mL to 36.2% at 10^6 or more; adjusted RR 6.5 <sup class="c" data-ref="Iloeje2006" title="Source 206">206</sup>.`],
 [2,`What happened after Taiwan's 1984 universal hepatitis B vaccination?`,`Liver cancer in children aged 6–14 fell from 0.70 to 0.36 per 100,000: a vaccine preventing cancer <sup class="c" data-ref="Chang1997NEJM" title="Source 66">66</sup>.`],
 [2,`Why test for hepatitis B before curing hepatitis C?`,`DAA labels carry a boxed warning: HBV can reactivate, sometimes fatally <sup class="c" data-ref="FDA-Epclusa,FDA-Mavyret" title="Source 132,139">132,139</sup>.`],
 [2,`How well do modern hepatitis C tablets work?`,`SVR12 about 99%, including compensated cirrhosis <sup class="c" data-ref="Feld2015ASTRAL1,Forns2017EXPEDITION1" title="Source 153,162">153,162</sup>.`],
 [2,`In haemochromatosis, which ferritin level makes cirrhosis unlikely?`,`Below 1,000 µg/L: probability about 7.4%, vs 72% above it <sup class="c" data-ref="Morrison2003,Kowdley2019ACG" title="Source 244,315">244,315</sup>.`],
 [2,`How often are Kayser–Fleischer rings seen in Wilson disease?`,`Almost 100% in neurological disease, 40–50% in hepatic disease, 20–30% before symptoms <sup class="c" data-ref="Czlonkowska2018" title="Source 90">90</sup>.`],
 /* ---- Part 3: diagnosis & staging ---- */
 [3,`Why do some call "liver function tests" a misnomer?`,`ALT, AST, ALP and bilirubin mostly show injury or blocked bile flow; ACG prefers "liver chemistries" or "liver tests" <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>.`],
 [3,`Why are platelets often low in cirrhosis?`,`Splenic sequestration, marrow suppression and less thrombopoietin <sup class="c" data-ref="Afdhal2008Platelets" title="Source 9">9</sup>. Platelets under 160 ×10³/µL raise the likelihood of cirrhosis (LR 6.3) <sup class="c" data-ref="Udell2012JAMA" title="Source 473">473</sup>.`],
 [3,`What is the best single ultrasound sign of cirrhosis?`,`Liver surface nodularity: specificity 95%, LR+ 11.6 <sup class="c" data-ref="Colli2003US" title="Source 82">82</sup>.`],
 [3,`How often do two biopsies from the same liver disagree?`,`33.1% differed by at least one stage; in 14.5% one lobe read as cirrhosis and the other as stage 3 <sup class="c" data-ref="Regev2002" title="Source 372">372</sup>.`],
 [3,`What is the FIB-4 formula?`,`Age × AST / (platelets × √ALT) <sup class="c" data-ref="Sterling2006FIB4" title="Source 438">438</sup>.`],
 [3,`Which FIB-4 cut-offs are used in MASLD?`,`Below 1.3 low risk, 1.3–2.67 intermediate, above 2.67 high <sup class="c" data-ref="Rinella2023AASLD,Shah2009FIB4" title="Source 381,420">381,420</sup>.`],
 [3,`How does age change FIB-4?`,`Unreliable at 35 or younger (AUROC 0.60); specificity falls to 35% at 65 or older, where 2.0 was proposed <sup class="c" data-ref="McPherson2017Age" title="Source 298">298</sup>.`],
 [3,`What is Baveno VII's "rule of 5"?`,`Liver stiffness of 10, 15, 20 and 25 kPa marks rising risk of decompensation and liver-related death; under 10 kPa rules out cACLD <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [3,`How can elastography rule clinically significant portal hypertension in or out?`,`Out: LSM 15 kPa or less with platelets 150 ×10⁹/L or more. In: LSM 25 kPa or more <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [3,`How often is a FibroScan result unusable?`,`Failure 3.1% and unreliable 15.8%: nearly 1 in 5, mostly with BMI over 30 or inexperienced operators <sup class="c" data-ref="Castera2010Pitfalls" title="Source 64">64</sup>.`],
 [3,`What goes into Child–Pugh?`,`Bilirubin, albumin, INR, ascites and encephalopathy, 1–3 points each: A 5–6, B 7–9, C 10–15 <sup class="c" data-ref="Costa2023ChildB,InfanteRivard1987" title="Source 86,207">86,207</sup>.`],
 [3,`What was MELD built for?`,`Predicting survival after elective TIPS (Mayo, 2000) from bilirubin, creatinine, INR and cause <sup class="c" data-ref="Malinchoc2000" title="Source 286">286</sup>, then validated as MELD in 2001 <sup class="c" data-ref="Kamath2001MELD" title="Source 221">221</sup>.`],
 [3,`MELD or Child–Pugh for 3-month waitlist death?`,`C-statistic 0.83 for MELD vs 0.76 for Child–Turcotte–Pugh <sup class="c" data-ref="Wiesner2003" title="Source 496">496</sup>.`],
 [3,`What did MELD 3.0 add?`,`Female sex and albumin, two interaction terms and a creatinine cap of 3.0 mg/dL; US allocation adopted it in July 2023 <sup class="c" data-ref="Kim2021MELD3,Akabane2025MELD3" title="Source 10,236">10,236</sup>.`],
 /* ---- Part 4: complications ---- */
 [4,`Which HVPG defines clinically significant portal hypertension?`,`10 mmHg or more; HVPG is the gold standard <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [4,`Below which HVPG was variceal bleeding not seen in the classic series?`,`12 mmHg <sup class="c" data-ref="GarciaTsao1985Hepatology" title="Source 169">169</sup>. A fall to 12 or less, or by 20%, protected against rebleeding <sup class="c" data-ref="Feu1995Lancet" title="Source 157">157</sup>.`],
 [4,`What did PREDESCI show?`,`β-blockers cut decompensation or death from 27% to 16%, mainly by preventing ascites <sup class="c" data-ref="Villanueva2019PREDESCI" title="Source 483">483</sup>.`],
 [4,`Which β-blocker does Baveno VII prefer in compensated cirrhosis?`,`Carvedilol, which adds α1-blocking vasodilation <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [4,`What is the acute variceal bleeding bundle?`,`Vasoactive drug as soon as possible for 2–5 days, antibiotics from admission, endoscopy within 12 h with band ligation, and transfusion to Hb 7–8 g/dl <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [4,`What did the early TIPS trial find?`,`1-year survival 86% vs 61% with TIPS within 72 h in high-risk patients <sup class="c" data-ref="GarciaPagan2010NEJM" title="Source 168">168</sup>.`],
 [4,`What does a SAAG of 1.1 g/dl or more mean?`,`Portal-hypertensive ascites, about 97% accuracy <sup class="c" data-ref="EASL2018Decomp,Runyon1992AnnIntern" title="Source 106,395">106,395</sup>.`],
 [4,`How is SBP diagnosed?`,`Ascitic neutrophils above 250 cells/µl; culture is negative in up to 60% <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`],
 [4,`Why give albumin in SBP?`,`In the Sort trial, albumin with cefotaxime cut renal impairment from 33% to 10% and in-hospital death from 29% to 10% <sup class="c" data-ref="Sort1999NEJM" title="Source 434">434</sup>.`],
 [4,`How much albumin does EASL quote after large-volume paracentesis?`,`8 g per litre removed when more than 5 L is drained, as published <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`],
 [4,`What did CONFIRM show for terlipressin in HRS?`,`HRS reversal 32% vs 17%, with more respiratory deaths; the label carries a boxed warning for respiratory failure <sup class="c" data-ref="Wong2021CONFIRM,FDA-Terlivaz" title="Source 146,501">146,501</sup>.`],
 [4,`What separates West Haven grade I from grade II?`,`Grade I: oriented, with trivial lack of awareness. Grade II: disorientation for time, and asterixis <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`],
 [4,`What most often triggers episodic overt HE?`,`Infection, then GI bleeding and diuretic overdose <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`],
 [4,`Does a high ammonia level diagnose HE?`,`No: alone it adds no diagnostic, staging or prognostic value <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`],
 [4,`How much did rifaximin cut breakthrough HE?`,`22.1% vs 45.9% over 6 months; more than 90% also took lactulose <sup class="c" data-ref="Bass2010Rifaximin" title="Source 27">27</sup>.`],
 [4,`What liver cancer surveillance does AASLD recommend?`,`Ultrasound and AFP about every 6 months <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`],
 [4,`How sensitive is ultrasound for early HCC?`,`47% alone, 63% with AFP <sup class="c" data-ref="Tzartzeva2018" title="Source 472">472</sup>. Only 24.0% of people with cirrhosis get surveillance <sup class="c" data-ref="Wolf2021Surveillance" title="Source 500">500</sup>.`],
 [4,`What are the Milan criteria?`,`One tumour 5 cm or less, or up to 3 each 3 cm or less, with no macrovascular invasion <sup class="c" data-ref="Mazzaferro1996Milan" title="Source 295">295</sup>.`],
 [4,`What 28-day mortality did CANONIC report for ACLF?`,`33.9% with ACLF at enrolment vs 1.9% without <sup class="c" data-ref="Moreau2013CANONIC" title="Source 314">314</sup>.`],
 [4,`What does Baveno VII require for recompensation?`,`Cause removed, no ascites, HE or variceal rebleeding off treatment for 12 months or more, and stable improvement in albumin, INR and bilirubin <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 /* ---- Part 5: treatment & living ---- */
 [5,`At what MELD does transplant start to beat waiting?`,`Not at low MELD: first-year mortality was higher with transplant at MELD 6–11 (HR 3.64); benefit rose with MELD <sup class="c" data-ref="Merion2005" title="Source 302">302</sup>.`],
 [5,`How many US liver transplants were done in 2023 and 2024?`,`10,659 and 11,458, both records; 1-year patient survival 93.5% (2024 report) <sup class="c" data-ref="Kwong2025OPTN,Kwong2026SRTR" title="Source 250,251">250,251</sup>.`],
 [5,`Is protein restricted in HE?`,`No. EASL: "Avoid protein restriction in patients with HE"; targets are 1.2–1.5 g/kg/day <sup class="c" data-ref="EASL2019Nutrition,Lai2021AASLD" title="Source 107,255">107,255</sup>.`],
 [5,`What did the late-evening snack trial show?`,`710 kcal at night added about 2 kg of lean tissue over 12 months; the same supplement by day did not <sup class="c" data-ref="Plank2008" title="Source 357">357</sup>.`],
 [5,`What maximum gap between meals while awake does AASLD give?`,`3–4 hours <sup class="c" data-ref="Lai2021AASLD" title="Source 255">255</sup>.`],
 [5,`What makes up the Liver Frailty Index?`,`Grip strength, chair stands and balance; frail at 4.4 or more (AASLD) <sup class="c" data-ref="Lai2017LFI,Lai2021AASLD" title="Source 253,255">253,255</sup>.`],
 [5,`Which painkiller does AASLD prefer first in cirrhosis?`,`Paracetamol (acetaminophen) up to 2 g a day, as published; systemic NSAIDs should be avoided <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`],
 [5,`Which acid-suppressing medicines are linked to HE and SBP?`,`Proton pump inhibitors: HE aHR 1.36, SBP aHR 1.72 in cirrhosis with ascites <sup class="c" data-ref="Dam2016PPI" title="Source 91">91</sup>.`],
 [5,`What does LiverHope ask nurses to do after large-volume paracentesis?`,`BP every 15 minutes for 2 hours, then every 30 minutes for 2 hours, and check the puncture site <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>.`],
 [5,`How strongly does covert HE predict falls?`,`1-year falls 52.3% with cognitive dysfunction vs 6.5% without <sup class="c" data-ref="Soriano2012" title="Source 433">433</sup>.`],
 [5,`How many people are readmitted after a decompensation?`,`37% within 1 month <sup class="c" data-ref="Volk2012Readmit" title="Source 486">486</sup>; HE is most strongly linked to readmission <sup class="c" data-ref="Tapper2016Readmit" title="Source 449">449</sup>.`],
 [5,`When can palliative care start?`,`At any stage, alongside disease-directed treatment; only 11% of people with cirrhosis are referred <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`],
 [5,`What is the first step for muscle cramps?`,`Check electrolytes and replete potassium, magnesium and zinc <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`],
 [5,`Did simvastatin with rifaximin prevent ACLF in LIVERHOPE-EFFICACY?`,`No (17.9% vs 14.2%), and 2.6% developed rhabdomyolysis <sup class="c" data-ref="Pose2025LIVERHOPE" title="Source 364">364</sup>.`],
 /* ---- Part 6: history ---- */
 [6,`Who named cirrhosis, and from what word?`,`René Laennec in 1819, from Greek kirrhos, "tawny", in a footnote <sup class="c" data-ref="Duffin1987" title="Source 102">102</sup>.`],
 [6,`When did the Child and Pugh scores appear?`,`Child–Turcotte in 1964 for portal hypertension surgery; Pugh's modification in 1973 <sup class="c" data-ref="ChildTurcotte1964,Pugh1973" title="Source 76,367">76,367</sup>.`],
 [6,`When was the first human liver transplant?`,`1963, by Starzl; none of the first five survived beyond 23 days. A successful series began in 1967 <sup class="c" data-ref="Starzl1963,Meirelles2015" title="Source 301,435">301,435</sup>.`],
 [6,`Which drug made transplant practical from 1979?`,`Cyclosporin A, reported by Calne <sup class="c" data-ref="Calne1979" title="Source 58">58</sup>.`],
 [6,`When and where was the first stent-supported TIPS?`,`1989, Heidelberg (Richter and colleagues), after an experimental shunt in 1969 <sup class="c" data-ref="Richter1989Radiologe,Rosch1969" title="Source 378,391">378,391</sup>.`],
 [6,`When was hepatitis C discovered?`,`1989 (Choo, Houghton and colleagues); the 2020 Nobel Prize honoured Alter, Houghton and Rice <sup class="c" data-ref="Choo1989,Lin2021Nobel" title="Source 79,268">79,268</sup>.`],
 [6,`When did the FDA first approve sofosbuvir?`,`6 December 2013 <sup class="c" data-ref="FDA-Sovaldi" title="Source 145">145</sup>.`],
 [6,`When did NAFLD become MASLD?`,`2023, through a multisociety Delphi process <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>.`]
];
const RV_MN=[
 ["ABCDE of Child–Pugh","memory aid",`<b>A</b>lbumin, <b>B</b>ilirubin, <b>C</b>lotting (PT/INR), <b>D</b>istension (ascites), <b>E</b>ncephalopathy: 1–3 points each, A 5–6, B 7–9, C 10–15 <sup class="c" data-ref="Costa2023ChildB,InfanteRivard1987" title="Source 86,207">86,207</sup>.`],
 ["Rule of 5","Baveno VII",`Liver stiffness of <b>10, 15, 20, 25</b> kPa marks rising risk. Under 10 rules out cACLD; over 15 is highly suggestive <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 ["Fluid, fog, bleed","memory aid",`The three Baveno VII decompensating events: overt <b>ascites</b>, overt <b>HE</b> (West Haven grade II or higher) and <b>variceal bleeding</b> <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 ["Drugs, bugs, scope, blood","memory aid",`The variceal bleed bundle: vasoactive <b>drugs</b> early for 2–5 days, antibiotics for <b>bugs</b> from admission, a <b>scope</b> within 12 h, and <b>blood</b> to Hb 7–8 g/dl <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 ["B-C-I, then sodium, then sex","memory aid",`MELD uses <b>B</b>ilirubin, <b>C</b>reatinine and <b>I</b>NR <sup class="c" data-ref="Kamath2001MELD" title="Source 221">221</sup>; MELD-Na added sodium in 2008 <sup class="c" data-ref="Kim2008MELDNa" title="Source 233">233</sup>; MELD 3.0 added female sex and albumin <sup class="c" data-ref="Kim2021MELD3" title="Source 236">236</sup>.`],
 ["One five, or three threes","memory aid",`Milan criteria: <b>one</b> tumour of 5 cm or less, or up to <b>three</b> each 3 cm or less, with no macrovascular invasion <sup class="c" data-ref="Mazzaferro1996Milan" title="Source 295">295</sup>.`],
 ["250 and 1.5–1","memory aid",`SBP when ascitic neutrophils exceed <b>250</b> cells/µl; albumin <b>1.5</b> g/kg on day 1 and <b>1</b> g/kg on day 3, as published <sup class="c" data-ref="EASL2018Decomp,Sort1999NEJM" title="Source 106,434">106,434</sup>.`],
 ["Two or three a day","memory aid",`Lactulose is titrated to 2–3 soft stools a day <sup class="c" data-ref="Vilstrup2014HE,FDA-Enulose" title="Source 131,485">131,485</sup>. Lactulose after the first episode; rifaximin added after the second <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`],
 ["Every six months","memory aid",`HCC surveillance: ultrasound with AFP about every 6 months in cirrhosis, continued after hepatitis C cure <sup class="c" data-ref="Singal2023AASLDHCC,Kanwal2017" title="Source 225,429">225,429</sup>.`],
 ["High gradient, high pressure","memory aid",`SAAG of <b>1.1</b> g/dl or more points to portal hypertension as the cause of ascites <sup class="c" data-ref="EASL2018Decomp,Runyon1992AnnIntern" title="Source 106,395">106,395</sup>.`]
];
/* the five Child–Pugh measures on the ABCDE memory aid, with illustrative example points */
const RV_CP=[
 ['A','Albumin','made by the liver',2],
 ['B','Bilirubin','cleared into bile',2],
 ['C','Clotting','prothrombin time / INR',1],
 ['D','Distension','ascites',2],
 ['E','Encephalopathy','confusion from liver failure',1]
];
const RV_STEPS=[
 {from:0,at:.1,k:'A and B',t:'The lab pair',txt:`Child–Pugh adds five measures, each scoring 1 to 3 points: bilirubin, albumin, prothrombin time or INR, ascites and encephalopathy <sup class="c" data-ref="Costa2023ChildB,InfanteRivard1987" title="Source 86,207">86,207</sup>. The ABCDE order is a memory aid, not the published layout. Albumin and bilirubin are plain lab values; the ALBI grade uses only these two and performed at least as well as Child–Pugh in more than 6,000 people with liver cancer <sup class="c" data-ref="Johnson2015ALBI" title="Source 218">218</sup>.`,pt:'Two of the five come from a blood test: how much albumin the liver makes, and how well it clears bilirubin.',hook:'ALBI = albumin + bilirubin only; it splits Child–Pugh A into two prognostic groups.'},
 {from:.2,at:.3,k:'C',t:'Clotting replaced nutrition',txt:`Child and Turcotte's 1964 classification, built to stratify people facing portal hypertension surgery, used nutritional status <sup class="c" data-ref="ChildTurcotte1964,Peng2016ChildMELD" title="Source 76,351">76,351</sup>. Pugh and colleagues replaced it with prothrombin time or INR in 1973 <sup class="c" data-ref="Pugh1973,Peng2016ChildMELD" title="Source 351,367">351,367</sup>.`,pt:'The liver makes clotting proteins, so a slow clotting test is one sign that it is struggling.',hook:'Pugh (1973) swapped nutritional status for PT/INR.'},
 {from:.4,at:.5,k:'D and E',t:'Two bedside judgements',txt:`Ascites and encephalopathy are the two subjective items in Child–Pugh <sup class="c" data-ref="Johnson2015ALBI" title="Source 218">218</sup>. Grading HE with the West Haven criteria has limited interobserver reliability, especially for grade I <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`,pt:'Two of the five depend on what the clinician sees and hears: fluid in the belly, and changes in thinking.',hook:'The subjective pair: ascites and encephalopathy.'},
 {from:.6,at:.7,k:'Add it up',t:'From 5 to 15',txt:`Each measure scores 1 to 3, so the total runs from 5 to 15 <sup class="c" data-ref="Costa2023ChildB,InfanteRivard1987" title="Source 86,207">86,207</sup>. In 177 people with cirrhosis, the three classes captured less survival variance than the continuous 5–15 score, which captured less than the component values in their original units <sup class="c" data-ref="InfanteRivard1987" title="Source 207">207</sup>.`,pt:'Everyone starts with 5 points; each problem that is worse adds more.',hook:'Minimum 5 (all 1s), maximum 15 (all 3s).'},
 {from:.8,at:.9,k:'Class',t:'A, B or C',txt:`The total gives class A (5–6), B (7–9) or C (10–15) <sup class="c" data-ref="Costa2023ChildB,InfanteRivard1987" title="Source 86,207">86,207</sup>. Class A is the usual requirement for HCC resection and for atezolizumab–bevacizumab <sup class="c" data-ref="Singal2023AASLDHCC,Reig2022BCLC" title="Source 374,429">374,429</sup>. For 3-month waitlist death, MELD's c-statistic was 0.83 vs 0.76 for Child–Turcotte–Pugh <sup class="c" data-ref="Wiesner2003" title="Source 496">496</sup>, though across 119 studies the two had similar prognostic value in most settings <sup class="c" data-ref="Peng2016ChildMELD" title="Source 351">351</sup>. A teaching tool, not for prognosis or transplant decisions.`,pt:'Scores describe groups of people, not one person\'s future. Your team reads them alongside everything else they know about you.',hook:'Child–Pugh A 5–6 · B 7–9 · C 10–15.'}
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

  /* ---- mnemonic in motion: ABCDE of Child–Pugh ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  function draw(t){
    const N=vb(svg,'720 380','400 620');
    const L=N?{x:16,y:44,w:368}:{x:16,y:48,w:330},R=N?{x:16,y:282,w:368,h:326}:{x:362,y:20,w:342,h:344};
    const RH=N?45:58,TH=N?39:48;
    const ph=[0,.2,.4,.6,.8,1.01];
    const vis=k=>{const a=ph[k],b=ph[k+1];return ramp(t,a,a+.035)*(k===4?1:1-ramp(t,b-.02,b+.015))};
    const v0=1-ramp(t,ph[1]-.02,ph[1]+.015);
    const revAt=[[.03,.08],[.08,.13],[.23,.29],[.43,.48],[.49,.54]];
    const rev=k=>ramp(t,revAt[k][0],revAt[k][1]);
    const shown=RV_CP.map((c,k)=>Math.round(c[3]*rev(k)));
    const total=shown.reduce((a,b)=>a+b,0);
    let s='';
    const ttl=t<.2?'A and B: the lab pair':t<.4?'C: clotting':t<.6?'D and E: bedside judgements':t<.8?`Points so far: ${total}`:`Total ${total}: class ${total<=6?'A':total<=9?'B':'C'}`;
    s+=`<text class="t-lbl" x="${L.x}" y="${L.y-16}">${ttl}</text>`;
    s+=`<text class="t-xs t-end" x="${L.x+L.w}" y="${L.y-16}">example points</text>`;
    RV_CP.forEach(([ch,w,sub,p],k)=>{
      const y=L.y+k*RH,on=rev(k),hot=on>.5;
      const op=f1(.25+.75*on);
      s+=`<g style="opacity:${op}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${TH}" rx="9" style="fill:var(${hot?'--brand-soft':'--panel'});stroke:var(${hot?'--brand':'--line'});stroke-width:${hot?1.8:1.1}"/>`;
      s+=`<circle cx="${L.x+22}" cy="${y+TH/2}" r="${N?13:14}" style="fill:var(--brand)"/><text class="t-lbl t-mid" x="${L.x+22}" y="${y+TH/2+5}" style="fill:var(--on-brand)">${ch}</text>`;
      s+=`<text class="t-sm" x="${L.x+46}" y="${y+(N?17:21)}" style="fill:var(--ink);font-weight:700;font-size:${N?13:12.5}px">${w}</text><text class="t-xs" x="${L.x+46}" y="${y+(N?32:37)}" style="font-size:${N?11:10.5}px">${sub}</text>`;
      for(let d=0;d<3;d++){const cx=L.x+L.w-62+d*20,f=d<shown[k];
        s+=`<circle cx="${cx}" cy="${y+TH/2}" r="7" style="fill:var(${f?'--accent':'--panel-2'});stroke:var(${f?'--accent':'--line'})"/>`}
      s+='</g>'});
    /* ---- explainer panel ---- */
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${R.w}" height="${R.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    const W=R.w;
    s+=`<text class="t-big t-end" x="${W-16}" y="34" style="fill:var(--accent);font-size:26px">${total}</text><text class="t-xs t-end" x="${W-16}" y="50">points</text>`;
    /* phase 0: albumin and bilirubin */
    if(v0>0){const bh=48,y1=70,y2=130,c1=rev(0),c2=rev(1);
      s+=`<g style="opacity:${f1(v0)}"><text class="t-lbl" x="16" y="30">Two lab values</text>`;
      [[y1,'Albumin','the liver makes it; low when it struggles',c1],[y2,'Bilirubin','the liver clears it; high when it struggles',c2]].forEach(([y,h,sub,c])=>{
        s+=`<rect x="16" y="${y}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--brand);stroke-width:${f1(1+c*1.2)};opacity:${f1(.35+.65*c)}"/>`;
        s+=`<text class="t-lbl" x="30" y="${y+20}">${h}</text><text class="t-xs" x="30" y="${y+37}">${sub}</text>`});
      s+=`<text class="t-sm" x="16" y="214" style="fill:var(--ink)">ALBI grade: these two alone</text><text class="t-xs" x="16" y="234">no bedside judgement needed</text><text class="t-xs" x="16" y="252">splits class A into two groups</text>`;
      s+='</g>'}
    /* phase 1: clotting replaced nutrition */
    const a1=vis(1);
    if(a1>0){const out=ramp(t,.24,.31),inn=ramp(t,.28,.35),bw=W-32;
      s+=`<g style="opacity:${f1(a1)}"><text class="t-lbl" x="16" y="30">The swap</text>`;
      s+=`<rect x="16" y="66" width="${bw}" height="46" rx="10" style="fill:var(--panel);stroke:var(--line);opacity:${f1(1-.55*out)}"/><text class="t-lbl" x="30" y="86" style="opacity:${f1(1-.5*out)}">1964 · Child–Turcotte</text><text class="t-xs" x="30" y="103" style="opacity:${f1(1-.5*out)}">used nutritional status</text>`;
      s+=`<line x1="24" x2="${f1(24+(bw-16)*out)}" y1="89" y2="89" style="stroke:var(--bad);stroke-width:2.2"/>`;
      s+=`<path d="M${W/2} 120 L${W/2} 140" style="stroke:var(--muted);stroke-width:1.6;opacity:${f1(inn)}" marker-end="url(#rvAr)"/>`;
      s+=`<rect x="16" y="150" width="${bw}" height="46" rx="10" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.8;opacity:${f1(inn)}"/><text class="t-lbl" x="30" y="170" style="opacity:${f1(inn)}">1973 · Pugh and colleagues</text><text class="t-xs" x="30" y="187" style="opacity:${f1(inn)}">prothrombin time / INR instead</text>`;
      s+=`<text class="t-xs" x="16" y="226">the liver makes clotting proteins</text><text class="t-xs" x="16" y="244">a lab value replaced a judgement</text></g>`}
    /* phase 2: the two subjective items */
    const a2=vis(2);
    if(a2>0){const c3=rev(3),c4=rev(4),bh=54;
      s+=`<g style="opacity:${f1(a2)}"><text class="t-lbl" x="16" y="30">Seen at the bedside</text>`;
      [[68,'Distension','ascites: fluid in the belly',c3],[136,'Encephalopathy','West Haven grades of confusion',c4]].forEach(([y,h,sub,c])=>{
        s+=`<rect x="16" y="${y}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--accent);stroke-width:${f1(1+c*1.2)};opacity:${f1(.35+.65*c)}"/>`;
        s+=`<text class="t-lbl" x="30" y="${y+22}">${h}</text><text class="t-xs" x="30" y="${y+40}">${sub}</text>`;
        s+=`<rect x="${W-118}" y="${y+12}" width="88" height="20" rx="10" style="fill:var(--accent-soft);opacity:${f1(c)}"/><text class="t-xs t-mid" x="${W-74}" y="${y+26}" style="fill:var(--accent);opacity:${f1(c)}">subjective</text>`});
      s+=`<text class="t-xs" x="16" y="226">grading HE has limited agreement</text><text class="t-xs" x="16" y="244">between observers, most for grade I</text></g>`}
    /* phase 3: add it up */
    const a3=vis(3);
    if(a3>0){const x0=20,x1=W-20,X=v=>x0+(x1-x0)*v/15,gr=ease(ramp(t,.61,.68)),yb=92;
      s+=`<g style="opacity:${f1(a3)}"><text class="t-lbl" x="16" y="30">Five measures, one total</text>`;
      let acc=0;RV_CP.forEach(([ch,,,p],k)=>{const w=(X(acc+p)-X(acc))*gr,xs=x0+(X(acc)-x0)*gr;
        s+=`<rect x="${f1(xs)}" y="${yb}" width="${f1(Math.max(0,w-2))}" height="34" rx="5" style="fill:var(${k%2?'--brand':'--fluid-fill'});opacity:.9"/>`;
        if(gr>.9)s+=`<text class="t-sm t-mid" x="${f1(xs+w/2)}" y="${yb+22}" style="fill:var(--on-brand);font-weight:700;font-size:${w>30?12:11}px">${w>30?ch+p:ch}</text><text class="t-xs t-mid" x="${f1(xs+w/2)}" y="${yb-4}">${w>30?'':p}</text>`;
        acc+=p});
      s+=`<line x1="${x0}" x2="${x1}" y1="${yb+44}" y2="${yb+44}" class="axis"/>`;
      [0,5,10,15].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${yb+44}" y2="${yb+49}" class="axis"/><text class="t-xs t-mid" x="${f1(X(v))}" y="${yb+62}">${v}</text>`});
      s+=`<line x1="${f1(X(5))}" x2="${f1(X(5))}" y1="${yb-12}" y2="${yb+44}" style="stroke:var(--good);stroke-width:1.6;stroke-dasharray:3 3"/><text class="t-xs" x="${f1(X(5)+4)}" y="${yb-16}" style="fill:var(--good)">all 1s = 5</text>`;
      s+=`<line x1="${f1(X(15))}" x2="${f1(X(15))}" y1="${yb-12}" y2="${yb+44}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:3 3"/><text class="t-xs t-end" x="${f1(X(15)-4)}" y="${yb-16}" style="fill:var(--bad)">all 3s = 15</text>`;
      s+=`<text class="t-sm" x="16" y="200" style="fill:var(--ink)">each measure: 1, 2 or 3 points</text><text class="t-xs" x="16" y="220">example points, not the real cut-offs</text><text class="t-xs" x="16" y="238">the continuous score holds more information</text></g>`}
    /* phase 4: the class */
    const a4=vis(4);
    if(a4>0){const x0=20,x1=W-20,X=v=>x0+(x1-x0)*(v-5)/10,yb=86,mv=lerp(5,total,ease(ramp(t,.81,.88)));
      s+=`<g style="opacity:${f1(a4)}"><text class="t-lbl" x="16" y="30">Class A, B or C</text>`;
      [[5,6.5,'A','5–6','--good'],[6.5,9.5,'B','7–9','--warn'],[9.5,15,'C','10–15','--bad']].forEach(([a,b,cl,rgL,col])=>{
        s+=`<rect x="${f1(X(a))}" y="${yb}" width="${f1(X(b)-X(a)-2)}" height="34" rx="6" style="fill:var(${col});opacity:.85"/><text class="t-lbl t-mid" x="${f1((X(a)+X(b))/2)}" y="${yb+22}" style="fill:var(--on-brand)">${cl}</text><text class="t-xs t-mid" x="${f1((X(a)+X(b))/2)}" y="${yb+52}">${rgL}</text>`});
      s+=`<path d="M${f1(X(mv))} ${yb-4} l-7 -12 h14 z" style="fill:var(--ink)"/><text class="t-xs t-mid" x="${f1(X(mv))}" y="${yb-20}" style="fill:var(--ink)">example ${Math.round(mv)}</text>`;
      const o1=ramp(t,.88,.92),o2=ramp(t,.92,.96);
      s+=`<g style="opacity:${f1(o1)}"><text class="t-sm" x="16" y="182" style="fill:var(--ink)">class A: usual requirement for</text><text class="t-xs" x="16" y="200">HCC resection and atezolizumab–bevacizumab</text></g>`;
      s+=`<g style="opacity:${f1(o2)}"><text class="t-sm" x="16" y="232" style="fill:var(--ink)">3-month waitlist death, c-statistic:</text><text class="t-xs" x="16" y="250">MELD 0.83 vs Child–Pugh 0.76</text></g>`;
      s+=`<text class="t-xs" x="16" y="${R.h-16}" style="fill:var(--muted)">a teaching tool, not a prognosis</text></g>`}
    s+='</g>';
    svg.innerHTML=`<defs>${marker('rvAr')}</defs>`+s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const QZ_Q=[
 /* ---- Part 1 ---- */
 [1,`In GBD 2017, cirrhosis and other chronic liver diseases caused about what share of all deaths worldwide?`,[`2.4%`,`0.2%`,`12%`,`24%`],0,`More than 1.32 million deaths, 2.4% of the total, up from 1.9% in 1990 <sup class="c" data-ref="GBD2020Cirrhosis" title="Source 172">172</sup>.`],
 [1,`Which statement about the causes of cirrhosis is correct?`,[`Only alcohol causes cirrhosis`,`Hepatitis C is the only viral cause`,`Causes include MASLD, alcohol, hepatitis B and C, autoimmune and cholestatic disease, and iron or copper overload`,`Cirrhosis is always inherited`],2,`Cirrhosis has many causes <sup class="c" data-ref="Gines2021Lancet" title="Source 180">180</sup>.`],
 [1,`In NHANES 1999–2010, what share of US adults with laboratory evidence of cirrhosis were unaware of liver disease?`,[`9%`,`29%`,`49%`,`69%`],3,`About 7 in 10 did not know <sup class="c" data-ref="Scaglione2015" title="Source 406">406</sup>.`],
 [1,`Median survival in compensated vs decompensated cirrhosis, as summarised from D'Amico's review, is about:`,[`Over 12 years vs under 2 years`,`2 years vs 12 years`,`6 months vs 1 month`,`The same in both`],0,`Population statistics, not individual predictions <sup class="c" data-ref="Zipprich2012,DAmico2006" title="Source 93,519">93,519</sup>.`],
 [1,`What share of the liver's blood inflow comes through the portal vein?`,[`10%`,`75–80%`,`25%`,`100%`],1,`The hepatic artery supplies the remaining ~25% <sup class="c" data-ref="Eipel2010" title="Source 117">117</sup>.`],
 [1,`Which cytokine is described as the strongest fibrogenic signal?`,[`Insulin`,`PDGF`,`Interleukin-2`,`TGF-β1`],3,`PDGF is the most potent stellate-cell mitogen; TGF-β1 drives matrix synthesis and blocks its breakdown <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup>.`],
 [1,`After 5 years of tenofovir, what share of people with cirrhosis on biopsy no longer had cirrhosis?`,[`4%`,`74%`,`24%`,`100%`],1,`71 of 96 people (Ishak 5–6 at baseline) <sup class="c" data-ref="Marcellin2013" title="Source 289">289</sup>.`],
 [1,`In untreated hepatitis C, which factor did NOT speed fibrosis progression in Poynard's cohort?`,[`Infection after age 40`,`Drinking 50 g of alcohol or more a day`,`HCV genotype`,`Male sex`],2,`Genotype had no effect <sup class="c" data-ref="Poynard1997" title="Source 366">366</sup>.`],
 [1,`Which feature limits regression of scar in experimental cirrhosis?`,[`Matrix cross-linking by tissue transglutaminase`,`Too many fenestrae`,`High vitamin A stores`,`Low bilirubin`],0,`Residual septa were hypocellular and cross-linked <sup class="c" data-ref="Issa2004" title="Source 211">211</sup>.`],
 /* ---- Part 2 ---- */
 [2,`About what share of chronic heavy drinkers develop severe forms such as alcohol-associated hepatitis or cirrhosis?`,[`90%`,`50%`,`10–20%`,`Under 1%`],2,`Fatty liver develops in about 90%, but only 10–20% develop severe disease <sup class="c" data-ref="Singal2018ACG" title="Source 428">428</sup>.`],
 [2,`At the same total intake, daily drinking compared with non-daily drinking:`,[`Raised cirrhosis risk (RR about 1.6–1.7)`,`Lowered cirrhosis risk`,`Made no difference`,`Only affected heart disease`],0,`RR 1.71 in men and 1.56 in women (Early evidence) <sup class="c" data-ref="LlamosasFalcon2023" title="Source 270">270</sup>.`],
 [2,`The genetic variant most strongly linked to both alcohol-related cirrhosis and MASLD is:`,[`HFE C282Y`,`PNPLA3 I148M (rs738409)`,`ATP7B`,`SERPINA1 Z`],1,`TM6SF2 and MBOAT7 are other lipid-handling loci <sup class="c" data-ref="Buch2015NatGenet,Romeo2008PNPLA3" title="Source 52,390">52,390</sup>.`],
 [2,`Which lab pattern fits the NIAAA criteria for alcohol-associated hepatitis?`,[`ALT over 1,000 IU/L`,`AST/ALT under 0.5`,`AST over 50, AST/ALT over 1.5, both under 400 IU/L, bilirubin over 3 mg/dL`,`Normal bilirubin`],2,`AST/ALT below 1.5 is seen in under 2% of biopsy-proven cases <sup class="c" data-ref="Crabb2016NIAAA" title="Source 87">87</sup>.`],
 [2,`A Lille score of 0.45 or more after about a week of steroids indicates:`,[`Non-response, with 6-month survival about 25%`,`Complete cure`,`Need for a higher steroid dose`,`Hepatitis C`],0,`Below 0.45, 6-month survival was 85% <sup class="c" data-ref="Louvet2007Lille" title="Source 279">279</sup>.`],
 [2,`ACG 2024 names which score as the most accurate for stratifying alcohol-associated hepatitis, with over 20 defining severe disease?`,[`Child–Pugh`,`MELD`,`FIB-4`,`APRI`],1,`A global cohort concluded Maddrey "should no longer be used" for prognosis <sup class="c" data-ref="Jophlin2024ACG,MoralesArraez2022" title="Source 219,312">219,312</sup>.`],
 [2,`Of people with decompensated alcohol-related cirrhosis who stopped drinking, about how many recompensated by 5 years?`,[`None`,`Almost all`,`About 1 in 3`,`About 1 in 100`],2,`33.8% at 5 years; earlier abstinence doubled the chance <sup class="c" data-ref="Hofer2026JHep" title="Source 202">202</sup>.`],
 [2,`Which AUD medicine has a randomised trial showing more abstinence in people with cirrhosis?`,[`Disulfiram`,`Topiramate`,`Naltrexone injection`,`Baclofen`],3,`71% vs 29% abstinent, with no hepatic side effects recorded <sup class="c" data-ref="Addolorato2007Lancet" title="Source 8">8</sup>.`],
 [2,`MASLD requires steatosis plus:`,[`At least 1 of 5 cardiometabolic risk factors`,`A positive hepatitis B test`,`Alcohol above 420 g a week`,`A liver biopsy`],0,`It replaced NAFLD in the 2023 Delphi nomenclature <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>.`],
 [2,`In the 52-week lifestyle study, people who lost 10% or more of body weight had NASH resolution in about:`,[`10%`,`30%`,`90%`,`50%`],2,`And fibrosis regression in 45% <sup class="c" data-ref="VilarGomez2015" title="Source 481">481</sup>.`],
 [2,`Which group does the resmetirom label cover?`,[`Decompensated cirrhosis`,`Child–Pugh C cirrhosis`,`Children with MASLD`,`Adults with noncirrhotic MASH and F2–F3 fibrosis`],3,`Accelerated approval; avoid in decompensated cirrhosis <sup class="c" data-ref="FDA-Rezdiffra" title="Source 143">143</sup>.`],
 [2,`The risk that acute hepatitis B becomes chronic is highest in:`,[`Newborns of HBeAg-positive mothers (about 90%)`,`Healthy adults`,`Older people`,`Teenagers`],0,`Under 5% in adults <sup class="c" data-ref="Terrault2018AASLD" title="Source 459">459</sup>.`],
 [2,`REVEAL-HBV showed that cirrhosis risk in untreated hepatitis B rises with:`,[`Age at vaccination`,`Baseline HBV DNA level`,`Blood group`,`Height`],1,`Adjusted RR 6.5 at 10^6 copies/mL or more <sup class="c" data-ref="Iloeje2006" title="Source 206">206</sup>.`],
 [2,`Why do HBV antiviral labels carry a boxed warning?`,[`They cause hair loss`,`They cure HBV in a week`,`Stopping them can cause severe flares of hepatitis B`,`They must be taken with alcohol`],2,`Monitoring is advised for months after stopping <sup class="c" data-ref="FDA-Baraclude,FDA-Viread,FDA-Vemlidy" title="Source 128,149,150">128,149,150</sup>.`],
 [2,`Before starting a direct-acting antiviral for hepatitis C, labels say to test for:`,[`Hepatitis B (HBsAg and anti-HBc)`,`Hepatitis A`,`HIV only`,`Iron`],0,`HBV reactivation has caused fulminant hepatitis and death <sup class="c" data-ref="FDA-Epclusa,FDA-Mavyret" title="Source 132,139">132,139</sup>.`],
 [2,`Hepatitis D infects only people who also have:`,[`Hepatitis C`,`Hepatitis B`,`Haemochromatosis`,`MASLD`],1,`EASL calls it the most aggressive viral hepatitis <sup class="c" data-ref="EASL2023HDV" title="Source 110">110</sup>.`],
 [2,`In Wilson disease, Kayser–Fleischer rings are found in almost all people with:`,[`Hepatic disease`,`No symptoms`,`Fatty liver`,`Neurological disease`],3,`Only 40–50% with hepatic disease <sup class="c" data-ref="Czlonkowska2018" title="Source 90">90</sup>.`],
 [2,`PBC is usually diagnosed from cholestatic liver tests plus:`,[`Antimitochondrial antibodies`,`A raised ferritin`,`HBsAg`,`Low caeruloplasmin`],0,`Untreated, it leads to biliary cirrhosis <sup class="c" data-ref="EASL2017PBC" title="Source 105">105</sup>.`],
 [2,`About what share of people with PSC also have inflammatory bowel disease?`,[`7%`,`71%`,`17%`,`100%`],1,`Mostly ulcerative colitis <sup class="c" data-ref="Zhang2022PSCIBD" title="Source 516">516</sup>.`],
 [2,`In population data, the most common single drug cause of drug-induced liver injury was:`,[`Paracetamol at labelled doses`,`Insulin`,`Amoxicillin–clavulanate`,`Vitamin D`],2,`22% of cases in Iceland <sup class="c" data-ref="Bjornsson2013" title="Source 43">43</sup>.`],
 /* ---- Part 3 ---- */
 [3,`ACG says "liver function tests" is a misnomer because ALT, AST, ALP and bilirubin:`,[`Are too expensive`,`Are never abnormal`,`Measure kidney function`,`Mostly reflect injury or blocked bile flow rather than function`],3,`ACG prefers "liver chemistries" or "liver tests" <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>.`],
 [3,`The most accurate single ultrasound sign of cirrhosis in Colli's study was:`,[`Gallbladder wall thickness`,`Liver surface nodularity`,`Spleen colour`,`Bile duct width`],1,`Specificity 95%, LR+ 11.6 <sup class="c" data-ref="Colli2003US" title="Source 82">82</sup>.`],
 [3,`Paired right- and left-lobe biopsies disagreed on cirrhosis vs stage 3 in about:`,[`0%`,`50%`,`14.5%`,`90%`],2,`Sampling error, not reader error <sup class="c" data-ref="Regev2002" title="Source 372">372</sup>.`],
 [3,`FIB-4 is calculated from:`,[`Bilirubin, albumin and INR`,`Sodium and creatinine`,`Ferritin and transferrin`,`Age, AST, ALT and platelets`],3,`Age × AST / (platelets × √ALT) <sup class="c" data-ref="Sterling2006FIB4" title="Source 438">438</sup>.`],
 [3,`In MASLD, a FIB-4 below 1.3 means:`,[`Low risk of advanced fibrosis`,`Cirrhosis is certain`,`High risk`,`Biopsy is mandatory`],0,`Above 2.67 is high risk <sup class="c" data-ref="Rinella2023AASLD,Shah2009FIB4" title="Source 381,420">381,420</sup>.`],
 [3,`FIB-4 specificity for advanced fibrosis falls at age 65 or older; the proposed cut-off there is:`,[`0.5`,`2.0`,`5.0`,`10`],1,`It raised specificity to 70% <sup class="c" data-ref="McPherson2017Age" title="Source 298">298</sup>.`],
 [3,`By Baveno VII, a liver stiffness under 10 kPa (without other signs):`,[`Confirms portal hypertension`,`Means transplant is needed`,`Rules out compensated advanced chronic liver disease`,`Is always a false result`],2,`3-year risk of decompensation or liver-related death is negligible (1% or less) <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [3,`Which combination rules out clinically significant portal hypertension in Baveno VII?`,[`LSM 30 kPa and low platelets`,`FIB-4 above 3.25`,`Bilirubin under 1 mg/dL`,`LSM 15 kPa or less plus platelets 150 ×10⁹/L or more`],3,`LSM 25 kPa or more rules it in <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [3,`Which is NOT one of the five Child–Pugh measures?`,[`Albumin`,`Creatinine`,`Ascites`,`Encephalopathy`],1,`Creatinine is in MELD, not Child–Pugh <sup class="c" data-ref="Costa2023ChildB,Kamath2001MELD" title="Source 86,221">86,221</sup>.`],
 [3,`A Child–Pugh total of 8 points is class:`,[`A`,`D`,`B`,`C`],2,`A 5–6, B 7–9, C 10–15 <sup class="c" data-ref="Costa2023ChildB,InfanteRivard1987" title="Source 86,207">86,207</sup>.`],
 [3,`MELD began as a model to predict survival after:`,[`Kidney transplant`,`Hepatitis C cure`,`Liver biopsy`,`Elective TIPS`],3,`Mayo TIPS model, 2000 <sup class="c" data-ref="Malinchoc2000" title="Source 286">286</sup>.`],
 [3,`The original MELD uses:`,[`Bilirubin, creatinine and INR (plus cause)`,`Albumin and ascites`,`Age and platelets`,`Sodium only`],0,`Validated in 4 cohorts with c-statistics 0.78–0.87 <sup class="c" data-ref="Kamath2001MELD" title="Source 221">221</sup>.`],
 [3,`MELD 3.0 added which variables to MELD-Na?`,[`Age and weight`,`Female sex and albumin`,`Platelets and AST`,`Ferritin`],1,`It also caps creatinine at 3.0 mg/dL <sup class="c" data-ref="Kim2021MELD3" title="Source 236">236</sup>.`],
 [3,`On the US waiting list, MELD's c-statistic for 3-month death compared with Child–Turcotte–Pugh was:`,[`0.50 vs 0.90`,`Equal at 0.60`,`0.70 vs 0.95`,`0.83 vs 0.76`],3,`This supported MELD-based allocation <sup class="c" data-ref="Wiesner2003" title="Source 496">496</sup>.`],
 [3,`Nearly 1 in 5 transient elastography results cannot be interpreted. The main cause is:`,[`BMI over 30`,`Low bilirubin`,`Young age`,`Female sex`],0,`Operator experience under 500 exams also mattered <sup class="c" data-ref="Castera2010Pitfalls" title="Source 64">64</sup>.`],
 /* ---- Part 4 ---- */
 [4,`Clinically significant portal hypertension is defined as an HVPG of:`,[`2 mmHg or more`,`10 mmHg or more`,`30 mmHg or more`,`Any value`],1,`HVPG is the gold standard <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [4,`In the classic 1985 series, variceal bleeding was not seen below an HVPG of:`,[`3 mmHg`,`25 mmHg`,`12 mmHg`,`40 mmHg`],2,`<sup class="c" data-ref="GarciaTsao1985Hepatology" title="Source 169">169</sup>.`],
 [4,`In PREDESCI, β-blockers reduced decompensation or death mainly by preventing:`,[`Bleeding`,`Encephalopathy`,`Liver cancer`,`Ascites`],3,`27% to 16% overall; ascites HR 0.44 <sup class="c" data-ref="Villanueva2019PREDESCI" title="Source 483">483</sup>.`],
 [4,`Which non-selective β-blocker does Baveno VII prefer in compensated cirrhosis?`,[`Carvedilol`,`Atenolol`,`Metoprolol`,`Bisoprolol`],0,`It adds anti-α1 vasodilation <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [4,`Baveno VII's target haemoglobin for transfusion in variceal bleeding is:`,[`12–14 g/dl`,`7–8 g/dl`,`10 g/dl always`,`No transfusion ever`],1,`Adjusted for heart disease, age and ongoing bleeding <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [4,`In acute variceal bleeding, endoscopy should be done:`,[`After 1 week`,`Only if bleeding recurs`,`Within 12 h once resuscitated`,`Never`],2,`<sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 [4,`Antibiotic prophylaxis during upper GI bleeding in cirrhosis:`,[`Raises mortality`,`Has no effect`,`Is only for children`,`Reduces mortality, infections and rebleeding`],3,`RR 0.79 for death in a Cochrane review <sup class="c" data-ref="ChavezTapia2010Cochrane" title="Source 70">70</sup>.`],
 [4,`Pre-emptive TIPS within 72 h in high-risk variceal bleeding improved 1-year survival in the original RCT from:`,[`61% to 86%`,`86% to 61%`,`10% to 12%`,`It made no difference`],0,`<sup class="c" data-ref="GarciaPagan2010NEJM" title="Source 168">168</sup>.`],
 [4,`The most common decompensating event in cirrhosis is:`,[`Liver cancer`,`Variceal bleeding`,`Ascites`,`Jaundice`],2,`5–10% of people with compensated cirrhosis develop it each year <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`],
 [4,`A serum–ascites albumin gradient (SAAG) of 1.1 g/dl or more indicates:`,[`Tuberculosis`,`Pancreatitis`,`Cancer of the ovary`,`Portal hypertension`],3,`About 97% accuracy <sup class="c" data-ref="EASL2018Decomp,Runyon1992AnnIntern" title="Source 106,395">106,395</sup>.`],
 [4,`Spontaneous bacterial peritonitis is diagnosed by an ascitic neutrophil count above:`,[`250 cells/µl`,`25 cells/µl`,`2,500 cells/µl`,`25,000 cells/µl`],0,`Cultures are negative in up to 60% <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`],
 [4,`In the Sort trial, adding albumin to cefotaxime for SBP:`,[`Raised mortality`,`Cut renal impairment and in-hospital death`,`Had no effect`,`Caused SBP`],1,`Renal impairment 33% to 10%; in-hospital death 29% to 10% <sup class="c" data-ref="Sort1999NEJM" title="Source 434">434</sup>.`],
 [4,`EASL quotes albumin after large-volume paracentesis of more than 5 L at:`,[`1 g per litre`,`100 g per litre`,`8 g per litre removed`,`None at all`],2,`As published, not an instruction <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`],
 [4,`The terlipressin (Terlivaz) label carries a boxed warning for:`,[`Serious or fatal respiratory failure`,`Hair loss`,`Hearing loss`,`Low blood sugar`],0,`Do not start if SpO₂ is under 90% <sup class="c" data-ref="FDA-Terlivaz" title="Source 146">146</sup>.`],
 [4,`West Haven grade II hepatic encephalopathy includes:`,[`Coma`,`Disorientation for time and asterixis`,`Only abnormal psychometric tests`,`No symptoms at all`],1,`Grade II is the first overt grade <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`],
 [4,`"Covert" hepatic encephalopathy groups together:`,[`Grades III and IV`,`Grade II only`,`Minimal HE and grade I`,`All grades`],2,`Overt HE is grades II–IV <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`],
 [4,`The most common precipitant of episodic overt HE is:`,[`High protein meals`,`Exercise`,`Sunlight`,`Infection`],3,`Then GI bleeding and diuretic overdose <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`],
 [4,`A raised blood ammonia level on its own in chronic liver disease:`,[`Adds no diagnostic, staging or prognostic value`,`Confirms HE`,`Sets the West Haven grade`,`Predicts death precisely`],0,`A normal level in overt HE questions the diagnosis <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`],
 [4,`In Bass 2010, rifaximin (mostly with lactulose) changed 6-month breakthrough HE from:`,[`10% to 90%`,`22% to 46%`,`45.9% to 22.1%`,`It had no effect`],2,`HE hospitalisation fell from 22.6% to 13.6% <sup class="c" data-ref="Bass2010Rifaximin" title="Source 27">27</sup>.`],
 [4,`AASLD 2023 recommends HCC surveillance in cirrhosis with:`,[`CT every month`,`AFP once`,`MRI every 5 years`,`Ultrasound and AFP about every 6 months`],3,`<sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`],
 [4,`Ultrasound alone detects early-stage HCC with a sensitivity of about:`,[`47%`,`99%`,`10%`,`84%`],0,`84% for any stage; 63% for early HCC with AFP <sup class="c" data-ref="Tzartzeva2018" title="Source 472">472</sup>.`],
 [4,`The Milan criteria for transplant in HCC are:`,[`Any tumour size`,`One tumour 5 cm or less, or up to 3 each 3 cm or less, no macrovascular invasion`,`Up to 10 tumours`,`Only tumours over 10 cm`],1,`<sup class="c" data-ref="Mazzaferro1996Milan" title="Source 295">295</sup>.`],
 [4,`First-line systemic therapy for BCLC C with preserved liver function, per BCLC 2022, is:`,[`Sorafenib alone`,`Liver transplant`,`Atezolizumab–bevacizumab`,`Radiofrequency ablation`],2,`IMbrave150: HR for death 0.58 vs sorafenib <sup class="c" data-ref="Reig2022BCLC,Finn2020IMbrave150" title="Source 158,374">158,374</sup>.`],
 [4,`After hepatitis C cure, HCC incidence in people with cirrhosis:`,[`Falls to zero`,`Rises tenfold`,`Is unknown`,`Falls but stays at about 1.82 per 100 person-years`],3,`So surveillance continues <sup class="c" data-ref="Kanwal2017" title="Source 225">225</sup>.`],
 [4,`In CANONIC, 28-day mortality in people with ACLF at enrolment was:`,[`33.9%`,`1.9%`,`99%`,`0%`],0,`1.9% without ACLF <sup class="c" data-ref="Moreau2013CANONIC" title="Source 314">314</sup>.`],
 [4,`Under Baveno VII, ascites controlled by TIPS without removing the cause and without better liver function is:`,[`Recompensation`,`Not recompensation`,`Cure`,`ACLF`],1,`Recompensation needs cause removal and stable improvement in albumin, INR and bilirubin <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`],
 /* ---- Part 5 ---- */
 [5,`In US data, deceased donor transplant at MELD 6–11, compared with waiting:`,[`Cut mortality by 96%`,`Had no data`,`Was linked to higher first-year mortality (HR 3.64)`,`Was not allowed`],2,`The benefit rose with MELD <sup class="c" data-ref="Merion2005" title="Source 302">302</sup>.`],
 [5,`A living donor liver transplant, compared with waiting for a deceased donor, was linked to:`,[`Higher mortality`,`No difference`,`Only paediatric benefit`,`Lower mortality (adjusted HR 0.56)`],3,`To be balanced against donor risk <sup class="c" data-ref="Berg2007A2ALL" title="Source 33">33</sup>.`],
 [5,`The tacrolimus label's boxed warning covers:`,[`Serious infections and malignancies`,`Weight gain`,`Hair growth`,`Low potassium`],0,`It also warns about grapefruit <sup class="c" data-ref="FDA-Prograf" title="Source 142">142</sup>.`],
 [5,`In hepatic encephalopathy, current guidelines say protein intake should be:`,[`Restricted to 0.5 g/kg`,`Not restricted: 1.2–1.5 g/kg/day`,`Stopped entirely`,`Only from supplements`],1,`Normal to high protein "does not precipitate HE" <sup class="c" data-ref="EASL2019Nutrition,Lai2021AASLD" title="Source 107,255">107,255</sup>.`],
 [5,`A 710 kcal supplement taken at night for 12 months, compared with daytime:`,[`Caused HE`,`Made no difference`,`Added about 2 kg of lean tissue`,`Lowered albumin`],2,`<sup class="c" data-ref="Plank2008" title="Source 357">357</sup>.`],
 [5,`AASLD 2021 suggests a maximum gap between meals while awake of:`,[`12 hours`,`8 hours`,`1 hour`,`3–4 hours`],3,`With an early breakfast or late-evening snack <sup class="c" data-ref="Lai2021AASLD" title="Source 255">255</sup>.`],
 [5,`The Liver Frailty Index combines:`,[`Grip strength, chair stands and balance`,`Bilirubin and INR`,`Height and weight`,`Ammonia and sodium`],0,`Frail at 4.4 or more <sup class="c" data-ref="Lai2017LFI,Lai2021AASLD" title="Source 253,255">253,255</sup>.`],
 [5,`AASLD palliative guidance names which painkiller as preferred first-line, as published?`,[`Ibuprofen`,`Paracetamol (acetaminophen) up to 2 g a day`,`Codeine`,`Tramadol`],1,`Systemic NSAIDs should be avoided <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`],
 [5,`In cirrhosis with ascites, proton pump inhibitor use was linked to:`,[`Fewer infections`,`Better sleep`,`More HE and SBP`,`Lower ammonia`],2,`HE aHR 1.36; SBP aHR 1.72 <sup class="c" data-ref="Dam2016PPI" title="Source 91">91</sup>.`],
 [5,`LiverHope advises blood pressure checks after large-volume paracentesis:`,[`Once a week`,`Only if the patient asks`,`Never`,`Every 15 minutes for 2 hours, then every 30 minutes for 2 hours`],3,`Quoted as published <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>.`],
 [5,`In LiverHope's nursing guidance, black tarry stools (melaena) should be taught as a sign of:`,[`Gastrointestinal bleeding`,`Good diet`,`Dehydration only`,`Normal lactulose effect`],0,`Melaena needs urgent care <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>.`],
 [5,`In outpatients with cirrhosis, cognitive dysfunction on PHES predicted 1-year falls of:`,[`6.5%`,`52.3%`,`99%`,`1%`],1,`6.5% without cognitive dysfunction <sup class="c" data-ref="Soriano2012" title="Source 433">433</sup>.`],
 [5,`According to AASLD, palliative care in cirrhosis:`,[`Means stopping all treatment`,`Is only for the last week of life`,`Can be considered at any stage alongside disease-directed treatment`,`Excludes transplant candidates`],2,`Only 11% are referred <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`],
 [5,`AASLD says advance care planning should start:`,[`Only after transplant`,`Only in intensive care`,`Never`,`At the diagnosis of cirrhosis, before decompensation`],3,`And before loss of decision-making capacity <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`],
 [5,`The first step AASLD gives for muscle cramps in decompensated cirrhosis is:`,[`Check electrolytes and replete potassium, magnesium and zinc`,`Start opioids`,`Stop all diuretics forever`,`Surgery`],0,`<sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`],
 [5,`Which vaccines does US ACIP list for people with chronic liver disease?`,[`None`,`Hepatitis A, hepatitis B and pneumococcal`,`Only influenza`,`Only BCG`],1,`<sup class="c" data-ref="Nelson2020ACIP,Weng2022ACIP,Kobayashi2022ACIP" title="Source 243,329,493">243,329,493</sup>.`],
 [5,`After a decompensation, about what share of people were readmitted within 1 month?`,[`3%`,`97%`,`37%`,`0%`],2,`22% of 30-day readmissions were possibly preventable <sup class="c" data-ref="Volk2012Readmit" title="Source 486">486</sup>.`],
 [5,`ACG 2024 prefers which benzodiazepines for alcohol withdrawal in poor liver function?`,[`Long-acting diazepam only`,`None ever`,`High-dose chlordiazepoxide`,`Short- and intermediate-acting agents such as lorazepam and oxazepam`],3,`With a symptom-triggered approach <sup class="c" data-ref="Jophlin2024ACG" title="Source 219">219</sup>.`],
 [5,`In ESSENCE, semaglutide 2.4 mg in MASH with F2–F3 fibrosis gave fibrosis reduction in:`,[`36.8% vs 22.4% on placebo`,`99% vs 1%`,`0% vs 50%`,`10% vs 10%`],0,`Steatohepatitis resolution 62.9% vs 34.3% (Established) <sup class="c" data-ref="Sanyal2025ESSENCE" title="Source 404">404</sup>.`],
 [5,`Normothermic machine perfusion compared with cold storage of donor livers gave:`,[`More discarded organs`,`50% lower graft injury and 50% lower discard`,`Worse survival`,`No change in anything`],1,`Survival and bile duct complications did not differ <sup class="c" data-ref="Nasralla2018" title="Source 318">318</sup>.`],
 /* ---- Part 6 ---- */
 [6,`Laennec named cirrhosis from the Greek kirrhos, meaning:`,[`Hard`,`Lumpy`,`Tawny`,`Small`],2,`In a footnote, 1819 <sup class="c" data-ref="Duffin1987" title="Source 102">102</sup>.`],
 [6,`The first human liver transplant was performed in 1963 by:`,[`Calne`,`Moore`,`Child`,`Starzl`],3,`None of the first five survived more than 23 days <sup class="c" data-ref="Starzl1963,Meirelles2015" title="Source 301,435">301,435</sup>.`],
 [6,`Calne reported which immunosuppressant in 1979?`,[`Cyclosporin A`,`Tacrolimus`,`Azathioprine`,`Prednisone`],0,`Tacrolimus followed in 1990 <sup class="c" data-ref="Calne1979,Meirelles2015" title="Source 58,301">58,301</sup>.`],
 [6,`The first stent-supported TIPS done entirely by interventional radiology was reported in:`,[`1819`,`1989, Heidelberg`,`2013`,`1964`],1,`<sup class="c" data-ref="Richter1989Radiologe" title="Source 378">378</sup>.`],
 [6,`Hepatitis C virus was identified in:`,[`1965`,`2001`,`1989`,`1950`],2,`The 2020 Nobel Prize recognised the discovery <sup class="c" data-ref="Choo1989,Lin2021Nobel" title="Source 79,268">79,268</sup>.`],
 [6,`The US adopted MELD 3.0 for liver allocation in:`,[`1999`,`2001`,`2008`,`July 2023`],3,`Partly to narrow the sex gap in access <sup class="c" data-ref="Kwong2025OPTN" title="Source 250">250</sup>.`],
 [6,`Pugh's 1973 modification of the Child classification appeared in a paper on:`,[`Oesophageal transection for bleeding varices`,`Hepatitis C`,`Liver transplant`,`Alcohol policy`],0,`<sup class="c" data-ref="Pugh1973" title="Source 367">367</sup>.`],
 [6,`The FDA first approved sofosbuvir (Sovaldi) on:`,[`10 October 2014`,`6 December 2013`,`22 May 2026`,`14 March 2024`],1,`Harvoni followed on 10 October 2014 <sup class="c" data-ref="FDA-Sovaldi,FDA-Harvoni" title="Source 133,145">133,145</sup>.`]
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
 ["ACLF (acute-on-chronic liver failure)",`A severe form of acutely decompensated cirrhosis with organ failure and high short-term mortality, driven by an excessive inflammatory response to triggers such as infection <sup class="c" data-ref="EASL2023ACLF" title="Source 109">109</sup>. 28-day mortality 33.9% in CANONIC <sup class="c" data-ref="Moreau2013CANONIC" title="Source 314">314</sup>.`,"course"],
 ["Acamprosate",`An AUD medicine that is not metabolised by the liver; contraindicated in severe renal impairment (creatinine clearance 30 mL/min or less) <sup class="c" data-ref="FDA-Campral" title="Source 129">129</sup>.`,"alcohol"],
 ["Advance care planning",`An iterative process that AASLD says should start at the diagnosis of cirrhosis, before decompensation and loss of capacity <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`,"living"],
 ["AFP (alpha-fetoprotein)",`A blood marker used with ultrasound for HCC surveillance; at 20 ng/mL it is about 60% sensitive, and over 40% of HCCs have normal AFP <sup class="c" data-ref="Singal2023AASLDHCC" title="Source 429">429</sup>.`,"hcc"],
 ["AKI (acute kidney injury)",`In cirrhosis, a creatinine rise of 0.3 mg/dl or more within 48 h, or 50% or more within 7 days <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>. It affects about 20% of people hospitalised with cirrhosis <sup class="c" data-ref="GarciaTsao2008AKI" title="Source 170">170</sup>.`,"ascites"],
 ["ALBI grade",`A score using only albumin and bilirubin; it performed at least as well as Child–Pugh in more than 6,000 people with HCC <sup class="c" data-ref="Johnson2015ALBI" title="Source 218">218</sup>.`,"scores"],
 ["Albumin",`The most abundant protein the liver secretes, about 55% of plasma protein; the liver makes about 10.5 g a day <sup class="c" data-ref="Trefts2017,Levitt2016" title="Source 263,467">263,467</sup>.`,"liver"],
 ["Albumin infusion",`Used for SBP, AKI beyond stage 1A, large-volume paracentesis and with terlipressin for HRS-AKI, per Baveno VII <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"ascites"],
 ["Alcohol-associated hepatitis",`An acute syndrome of jaundice and liver failure in people drinking heavily; severe cases carry 20–50% 1-month mortality (ACG 2024) <sup class="c" data-ref="Jophlin2024ACG" title="Source 219">219</sup>.`,"alcohol"],
 ["Alcohol-related liver disease (ARLD)",`A spectrum from fatty liver to steatohepatitis, fibrosis, cirrhosis and in some people HCC <sup class="c" data-ref="Seitz2018NRDP" title="Source 415">415</sup>. AASLD uses "alcohol-associated liver diseases" <sup class="c" data-ref="Crabb2020AASLD" title="Source 88">88</sup>.`,"alcohol"],
 ["Alpha-1 antitrypsin deficiency",`In Pi*ZZ, misfolded Z protein builds up in hepatocytes and can cause liver fibrosis <sup class="c" data-ref="Strnad2022Fazirsiran" title="Source 440">440</sup>.`,"othercauses"],
 ["ALT (alanine aminotransferase)",`A liver enzyme marking hepatocellular injury; ACG gives a "true healthy normal" of 29–33 IU/L for males and 19–25 IU/L for females <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>.`,"tests"],
 ["Ammonia",`Mostly made in the gut; cleared by the urea cycle, and in liver disease partly by muscle, which is why sarcopenia raises HE risk <sup class="c" data-ref="Rose2020" title="Source 392">392</sup>. A raised level alone does not diagnose HE <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`,"encephalopathy"],
 ["Animal naming test",`Naming animals in 1 minute: fewer than 10 (age- and education-adjusted) is abnormal and predicts overt HE <sup class="c" data-ref="Campagna2017ANT" title="Source 60">60</sup>.`,"encephalopathy"],
 ["APRI",`AST-to-platelet ratio index; at 1.0, 76% sensitive and 72% specific for cirrhosis in hepatitis C <sup class="c" data-ref="Lin2011APRI" title="Source 267">267</sup>.`,"noninvasive"],
 ["Ascites",`Fluid in the abdomen, the most common decompensating event, from renal sodium retention plus portal hypertension <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`,"ascites"],
 ["Asterixis",`A flapping tremor: brief loss of muscle tone while holding a posture, first called the "liver flap" <sup class="c" data-ref="Lui2026Asterixis" title="Source 282">282</sup>. A sign of West Haven grade II HE <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`,"encephalopathy"],
 ["AST/ALT ratio",`Often rises above 1 as cirrhosis develops in chronic hepatitis; above 2 is usual in alcohol-related liver disease <sup class="c" data-ref="Williams1988ASTALT" title="Source 498">498</sup>.`,"tests"],
 ["Atezolizumab–bevacizumab",`First-choice first-line systemic therapy for BCLC C HCC with preserved liver function <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>; HR for death 0.58 vs sorafenib in IMbrave150 <sup class="c" data-ref="Finn2020IMbrave150" title="Source 158">158</sup>.`,"hcc"],
 ["Autoimmune hepatitis",`Immune attack on the liver, diagnosed from transaminases, IgG, autoantibodies and interface hepatitis; treated with steroids and azathioprine <sup class="c" data-ref="MieliVergani2018" title="Source 307">307</sup>.`,"othercauses"],
 ["Baclofen",`An AUD medicine with an RCT in cirrhosis: abstinence 71% vs 29% <sup class="c" data-ref="Addolorato2007Lancet" title="Source 8">8</sup>.`,"alcohol"],
 ["Band ligation",`Endoscopic rubber bands on varices: the recommended endoscopic treatment for oesophageal variceal bleeding <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"portal"],
 ["Bariatric surgery",`In MASH, resolution without fibrosis worsening in 84% at 5 years <sup class="c" data-ref="Lassailly2020" title="Source 258">258</sup>; major adverse liver outcomes 2.3% vs 9.6% at 10 years in SPLENDOR <sup class="c" data-ref="Aminian2021JAMA" title="Source 13">13</sup>.`,"masld"],
 ["Baveno VII",`The 2021 consensus on portal hypertension, latest in a series begun in Groningen in 1986 <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"portal"],
 ["BCLC staging",`Barcelona Clinic Liver Cancer stages 0, A, B, C and D link HCC stage to treatment <sup class="c" data-ref="Reig2022BCLC" title="Source 374">374</sup>.`,"hcc"],
 ["Beta-blockers (NSBBs)",`Propranolol, nadolol or carvedilol lower portal pressure; PREDESCI cut decompensation or death from 27% to 16% <sup class="c" data-ref="Villanueva2019PREDESCI,deFranchis2022BavenoVII" title="Source 97,483">97,483</sup>.`,"portal"],
 ["Bilirubin",`A pigment the liver conjugates and excretes; a raised conjugated bilirubin implies liver disease or biliary obstruction <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>.`,"tests"],
 ["Bulevirtide",`An HDV entry inhibitor; FDA accelerated approval on 22 May 2026 for chronic HDV without cirrhosis or with compensated cirrhosis <sup class="c" data-ref="FDA-Hepcludex" title="Source 135">135</sup>.`,"hepatitis"],
 ["cACLD",`Compensated advanced chronic liver disease; liver stiffness under 10 kPa rules it out and over 15 kPa is highly suggestive <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"noninvasive"],
 ["Caput medusae",`Visible swollen veins around the navel from paraumbilical collaterals in portal hypertension. As collaterals form, gut blood flow rises <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>.`,"portal"],
 ["Carvedilol",`A non-selective β-blocker with anti-α1 vasodilation; Baveno VII's preferred NSBB in compensated cirrhosis <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"portal"],
 ["Caudate lobe hypertrophy",`In cirrhosis the right lobe shrinks and the caudate enlarges; the caudate-to-right-lobe ratio separated cirrhotic livers with 100% specificity in a small series <sup class="c" data-ref="Harbin1980Caudate" title="Source 191">191</sup>.`,"tests"],
 ["Child–Pugh score",`Bilirubin, albumin, INR, ascites and encephalopathy, 1–3 points each: A 5–6, B 7–9, C 10–15 <sup class="c" data-ref="Costa2023ChildB,InfanteRivard1987" title="Source 86,207">86,207</sup>.`,"scores"],
 ["Cholangiocytes",`The cells lining bile ducts, the second most abundant epithelial cell of the liver <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup>.`,"liver"],
 ["Cholestatic pattern",`Alkaline phosphatase raised out of proportion to AST and ALT <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>.`,"tests"],
 ["Cholestyramine",`First-line treatment for cholestatic itch in AASLD guidance <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`,"living"],
 ["CIWA-Ar",`A 10-item scale for alcohol withdrawal severity <sup class="c" data-ref="Sullivan1989CIWA" title="Source 441">441</sup>.`,"nursing"],
 ["CLDQ",`Chronic Liver Disease Questionnaire: 29 items in six domains of quality of life <sup class="c" data-ref="Younossi1999CLDQ" title="Source 507">507</sup>.`,"living"],
 ["Collagen",`Collagens I and III dominate the scar; advanced fibrosis holds about 6 times normal matrix <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup>.`,"fibrosis"],
 ["Compensated cirrhosis",`Cirrhosis with no present or past complications; split by the absence or presence of CSPH <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"course"],
 ["Covert hepatic encephalopathy",`Minimal HE plus grade I <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>; pooled prevalence 40.9% <sup class="c" data-ref="Lv2024CHE" title="Source 284">284</sup>.`,"encephalopathy"],
 ["Cryptogenic cirrhosis",`Cirrhosis without a known cause; 73% of one series had diabetes, obesity or both, pointing to MASH <sup class="c" data-ref="Caldwell1999" title="Source 57">57</sup>.`,"othercauses"],
 ["CSPH (clinically significant portal hypertension)",`HVPG 10 mmHg or more <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"portal"],
 ["Cyclosporin A",`The immunosuppressant Calne reported in 1979, which made transplant practical <sup class="c" data-ref="Calne1979" title="Source 58">58</sup>.`,"history"],
 ["DAAs (direct-acting antivirals)",`Hepatitis C tablets targeting NS3/4A, NS5A and NS5B; cure in more than 90% <sup class="c" data-ref="Manns2017NRDP" title="Source 288">288</sup>.`,"hepatitis"],
 ["Decompensation",`Overt ascites, overt HE (West Haven II or higher) or variceal bleeding <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"course"],
 ["Diuretics",`Spironolactone, then furosemide, for ascites; EASL quotes 100–400 mg and 40–160 mg a day, as published <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`,"ascites"],
 ["DILI (drug-induced liver injury)",`A diagnosis of exclusion; antimicrobials, supplements and anticancer drugs are the common causes in the West <sup class="c" data-ref="Chalasani2021ACG" title="Source 65">65</sup>.`,"othercauses"],
 ["Dry weight",`Body weight corrected for ascites (subtract 5%, 10% or 15%) and oedema, used for nutrition targets <sup class="c" data-ref="EASL2019Nutrition,Lai2021AASLD" title="Source 107,255">107,255</sup>.`,"nutrition"],
 ["Early liver transplant (alcohol-associated hepatitis)",`Transplant before 6 months of abstinence in highly selected people: 6-month survival 77% vs 23% <sup class="c" data-ref="Mathurin2011NEJM" title="Source 293">293</sup>.`,"transplant"],
 ["ELF test",`Enhanced Liver Fibrosis panel of hyaluronic acid, TIMP-1 and PIIINP; 9.8 or more marks higher risk in NAFLD <sup class="c" data-ref="Rinella2023AASLD,Rosenberg2004ELF" title="Source 381,393">381,393</sup>.`,"noninvasive"],
 ["Entecavir",`A preferred HBV antiviral; label 0.5 mg daily compensated, 1 mg decompensated, as published <sup class="c" data-ref="FDA-Baraclude,Terrault2018AASLD" title="Source 128,459">128,459</sup>.`,"hepatitis"],
 ["Erectile dysfunction",`Reported in 79% of men with cirrhosis in a meta-analysis <sup class="c" data-ref="Yoo2023ED" title="Source 506">506</sup>.`,"living"],
 ["Extracellular matrix (ECM)",`The protein scaffold, mainly collagen, that builds up in fibrosis <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup>.`,"fibrosis"],
 ["Fazirsiran",`An RNAi drug cutting liver Z-AAT in alpha-1 antitrypsin deficiency (Early evidence) <sup class="c" data-ref="Strnad2022Fazirsiran,Clark2024SEQUOIA" title="Source 80,440">80,440</sup>.`,"frontier"],
 ["Fenestrae",`Pores of 50–180 nm in sinusoidal endothelial cells that let plasma reach hepatocytes <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup>.`,"liver"],
 ["FIB-4",`Age × AST / (platelets × √ALT); in MASLD under 1.3 is low risk and over 2.67 high <sup class="c" data-ref="Sterling2006FIB4,Rinella2023AASLD" title="Source 381,438">381,438</sup>.`,"noninvasive"],
 ["Fibrosis",`Excessive build-up of extracellular matrix in chronic liver disease <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup>.`,"fibrosis"],
 ["Fontan-associated liver disease",`Liver fibrosis from chronically high venous pressure after Fontan surgery; cumulative cirrhosis 32.2% at 20 years or more <sup class="c" data-ref="Hitawala2024Fontan" title="Source 201">201</sup>.`,"othercauses"],
 ["Frailty",`Reduced physical function; 17–43% of outpatients with cirrhosis <sup class="c" data-ref="Lai2021AASLD" title="Source 255">255</sup>.`,"nutrition"],
 ["Further decompensation",`A second portal hypertension event or jaundice, recurrent bleeding, ascites or HE, SBP or HRS-AKI: a stage with higher mortality <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"course"],
 ["Gastric varices",`Present in about 20% of people with cirrhosis; they bleed less often than oesophageal varices but more severely <sup class="c" data-ref="EASL2018Decomp,Sarin1992Hepatology" title="Source 106,405">106,405</sup>.`,"portal"],
 ["GLP-1 receptor agonists",`Semaglutide and related drugs; ESSENCE showed MASH resolution 62.9% vs 34.3% <sup class="c" data-ref="Sanyal2025ESSENCE" title="Source 404">404</sup>.`,"masld"],
 ["Haemochromatosis (HFE)",`Iron overload; C282Y homozygosity in about 1 in 156 to 1 in 227 people of European descent <sup class="c" data-ref="Pilling2019BMJ,Adams2005HEIRS" title="Source 7,354">7,354</sup>. Phlebotomy is the mainstay <sup class="c" data-ref="Kowdley2019ACG" title="Source 244">244</sup>.`,"othercauses"],
 ["HBeAg",`Hepatitis B e antigen, a marker of the replicative phase <sup class="c" data-ref="Fattovich2008" title="Source 125">125</sup>.`,"hepatitis"],
 ["HBsAg",`Hepatitis B surface antigen; global prevalence 3.2% (257.5 million) in 2022 <sup class="c" data-ref="Polaris2023HBV" title="Source 360">360</sup>.`,"hepatitis"],
 ["HCC (hepatocellular carcinoma)",`The main primary liver cancer; about 1–4% of people with cirrhosis develop it each year <sup class="c" data-ref="Tapper2023JAMA" title="Source 453">453</sup>.`,"hcc"],
 ["Hepatic arterial buffer response",`When portal flow falls, arterial flow rises and can buffer 25–60% of the loss <sup class="c" data-ref="Eipel2010" title="Source 117">117</sup>.`,"liver"],
 ["Hepatic encephalopathy (HE)",`Brain dysfunction from liver insufficiency or portosystemic shunting, from subclinical change to coma <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`,"encephalopathy"],
 ["Hepatitis B",`A virus that can persist for life, especially when caught at birth; antivirals suppress it and can reverse cirrhosis <sup class="c" data-ref="Terrault2018AASLD,Marcellin2013" title="Source 289,459">289,459</sup>.`,"hepatitis"],
 ["Hepatitis C",`A virus now curable in about 99% with 8–12 weeks of tablets <sup class="c" data-ref="Feld2015ASTRAL1,FDA-Mavyret" title="Source 139,153">139,153</sup>.`,"hepatitis"],
 ["Hepatitis D (delta)",`A defective virus needing HBV; the most aggressive viral hepatitis <sup class="c" data-ref="EASL2023HDV" title="Source 110">110</sup>.`,"hepatitis"],
 ["Hepatocellular pattern",`AST and ALT raised out of proportion to alkaline phosphatase <sup class="c" data-ref="Kwo2017ACG" title="Source 249">249</sup>.`,"tests"],
 ["Hepatocytes",`The main liver cells, doing most of its metabolic and synthetic work <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup>.`,"liver"],
 ["Hepatostat",`The liver's ability to restore 100% of the liver-to-body-weight ratio after loss <sup class="c" data-ref="Michalopoulos2021" title="Source 306">306</sup>.`,"liver"],
 ["Hospice",`Comfort-focused care when life expectancy is measured in months; underused in cirrhosis <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`,"living"],
 ["HRS-AKI (hepatorenal syndrome)",`Kidney failure from renal vasoconstriction without major structural damage; treated with vasoconstrictors plus albumin, and ideally transplant <sup class="c" data-ref="Gines2018HRS" title="Source 179">179</sup>.`,"ascites"],
 ["HVPG (hepatic venous pressure gradient)",`Wedged minus free hepatic venous pressure, measured by a balloon catheter; the gold standard for portal pressure <sup class="c" data-ref="DiazSoto2022TAG,deFranchis2022BavenoVII" title="Source 97,101">97,101</sup>.`,"portal"],
 ["Hyponatraemia",`Low blood sodium: 130 mmol/L or less in 21.6% of people with cirrhosis <sup class="c" data-ref="Angeli2006Hepatology" title="Source 16">16</sup>.`,"ascites"],
 ["INR",`International normalised ratio, a clotting test; part of Child–Pugh and MELD <sup class="c" data-ref="Costa2023ChildB,Kamath2001MELD" title="Source 86,221">86,221</sup>.`,"scores"],
 ["Ishak score",`A fibrosis staging system from 0 to 6; 5–6 is cirrhosis <sup class="c" data-ref="Ishak1995,Marcellin2013" title="Source 210,289">210,289</sup>.`,"fibrosis"],
 ["Kayser–Fleischer rings",`Copper in Descemet's membrane of the eye in Wilson disease <sup class="c" data-ref="Czlonkowska2018" title="Source 90">90</sup>.`,"othercauses"],
 ["Kupffer cells",`The liver's resident macrophages, 80–90% of the body's tissue macrophages <sup class="c" data-ref="Bilzer2006" title="Source 42">42</sup>.`,"liver"],
 ["Lactulose",`A non-absorbable sugar, first choice for overt HE, titrated to 2–3 soft stools a day <sup class="c" data-ref="Vilstrup2014HE,FDA-Enulose" title="Source 131,485">131,485</sup>.`,"encephalopathy"],
 ["Large-volume paracentesis (LVP)",`Draining all the fluid in one session; first-line for grade 3 ascites <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`,"ascites"],
 ["Late-evening snack",`A bedtime snack that shortens the overnight fast; 710 kcal at night added about 2 kg of lean tissue in a year <sup class="c" data-ref="Plank2008" title="Source 357">357</sup>.`,"nutrition"],
 ["Leipzig score",`Combines signs, copper tests and mutations for Wilson disease; 4 or more establishes the diagnosis <sup class="c" data-ref="Czlonkowska2018,Ferenci2003Leipzig" title="Source 90,154">90,154</sup>.`,"othercauses"],
 ["LI-RADS",`A system grading liver nodules from LR-1 (benign) to LR-5 (HCC) <sup class="c" data-ref="Singal2023AASLDHCC,Chernyak2018LIRADS" title="Source 75,429">75,429</sup>.`,"hcc"],
 ["Lille model",`Bilirubin change after a week of steroids, with other variables; 0.45 or more means non-response <sup class="c" data-ref="Louvet2007Lille" title="Source 279">279</sup>.`,"alcohol"],
 ["Liver biopsy",`A tissue sample; prone to sampling error, with major bleeding about 6 per 1,000 <sup class="c" data-ref="Regev2002,West2010Biopsy" title="Source 372,494">372,494</sup>.`,"tests"],
 ["Liver Frailty Index",`Grip strength, chair stands and balance; frail at 4.4 or more <sup class="c" data-ref="Lai2017LFI,Lai2021AASLD" title="Source 253,255">253,255</sup>.`,"nutrition"],
 ["Liver stiffness measurement (LSM)",`Elastography reading in kPa; stiffer usually means more scar <sup class="c" data-ref="FriedrichRust2008TE" title="Source 166">166</sup>.`,"noninvasive"],
 ["Living donor liver transplant",`Part of a living person's liver; adjusted mortality HR 0.56 vs waiting <sup class="c" data-ref="Berg2007A2ALL" title="Source 33">33</sup>.`,"transplant"],
 ["Lobule",`The hexagonal unit with a central vein and portal triads at the corners <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup>.`,"liver"],
 ["LSEC (liver sinusoidal endothelial cell)",`The most permeable endothelial cells in mammals; they keep portal pressure low and stellate cells quiet <sup class="c" data-ref="Poisson2017" title="Source 358">358</sup>.`,"liver"],
 ["Maddrey discriminant function",`An older alcohol-associated hepatitis score; 32 or more defined severe disease <sup class="c" data-ref="Singal2018ACG,Maddrey1978" title="Source 285,428">285,428</sup>.`,"alcohol"],
 ["Machine perfusion",`Pumping blood or fluid through a donor liver; cut graft injury and discard by 50% vs cold storage <sup class="c" data-ref="Nasralla2018" title="Source 318">318</sup>.`,"frontier"],
 ["Malnutrition",`Reported in 20% of compensated and more than 50% of decompensated cirrhosis <sup class="c" data-ref="EASL2019Nutrition" title="Source 107">107</sup>.`,"nutrition"],
 ["MASH",`Metabolic dysfunction-associated steatohepatitis, formerly NASH <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>.`,"masld"],
 ["MASLD",`Metabolic dysfunction-associated steatotic liver disease: steatosis plus at least 1 of 5 cardiometabolic risk factors <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>.`,"masld"],
 ["MELD",`Model for End-stage Liver Disease: bilirubin, creatinine and INR <sup class="c" data-ref="Kamath2001MELD" title="Source 221">221</sup>.`,"scores"],
 ["MELD 3.0",`MELD-Na plus female sex and albumin, with a creatinine cap of 3.0 mg/dL; US allocation from July 2023 <sup class="c" data-ref="Kim2021MELD3,Kwong2025OPTN" title="Source 236,250">236,250</sup>.`,"scores"],
 ["MELD-Na",`MELD plus serum sodium (2008) <sup class="c" data-ref="Kim2008MELDNa" title="Source 233">233</sup>.`,"scores"],
 ["Melaena",`Black, tarry stools from upper GI bleeding; caregivers are taught to recognise it <sup class="c" data-ref="Fabrellas2020LiverHope" title="Source 122">122</sup>.`,"nursing"],
 ["METAVIR",`Fibrosis staging F0 to F4 (cirrhosis) and activity A0 to A3 <sup class="c" data-ref="Poynard1997,Bedossa1996" title="Source 30,366">30,366</sup>.`,"fibrosis"],
 ["MetALD",`MASLD plus 140–350 g a week of alcohol (women) or 210–420 g (men) <sup class="c" data-ref="Rinella2023MASLD" title="Source 382">382</sup>.`,"masld"],
 ["Metabolic zonation",`Division of liver functions along the lobule from periportal zone 1 to pericentral zone 3 <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup>.`,"liver"],
 ["Milan criteria",`One HCC 5 cm or less, or up to 3 each 3 cm or less, with no macrovascular invasion <sup class="c" data-ref="Mazzaferro1996Milan" title="Source 295">295</sup>.`,"transplant"],
 ["Minimal hepatic encephalopathy",`Abnormal psychometric tests without clinical signs <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>; linked to car crashes <sup class="c" data-ref="Bajaj2009Crashes" title="Source 24">24</sup>.`,"encephalopathy"],
 ["MMPs and TIMPs",`Matrix metalloproteinases break down scar; TIMPs block them. A fall in TIMP-1 permits regression <sup class="c" data-ref="Bataller2005,Iredale1998" title="Source 28,209">28,209</sup>.`,"fibrosis"],
 ["MR elastography",`Magnetic resonance stiffness imaging; 5 kPa or more suggests cirrhosis <sup class="c" data-ref="Rinella2023AASLD,Singh2015MRE" title="Source 381,431">381,431</sup>.`,"noninvasive"],
 ["Myofibroblast",`An activated, collagen-producing stellate cell <sup class="c" data-ref="Tsuchida2017" title="Source 471">471</sup>.`,"fibrosis"],
 ["Naltrexone",`An AUD medicine; a VA cohort found no probable drug-induced liver injury in cirrhosis (Early evidence) <sup class="c" data-ref="Thompson2024JHEP" title="Source 464">464</sup>.`,"alcohol"],
 ["Nodule (regenerative)",`A ball of regenerating liver tissue ringed by scar, the defining feature of cirrhosis <sup class="c" data-ref="Schuppan2008" title="Source 411">411</sup>.`,"fibrosis"],
 ["NSAIDs",`Ibuprofen-type medicines; AASLD advises avoiding systemic NSAIDs in cirrhosis <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`,"nutrition"],
 ["Oesophageal varices",`Swollen veins in the oesophagus from portal hypertension; first bleed at 10–15% a year <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>.`,"portal"],
 ["Overt hepatic encephalopathy",`West Haven grades II–IV; occurs in 30–40% during the course of cirrhosis <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`,"encephalopathy"],
 ["Palliative care",`Specialised care for symptoms and planning, possible at any stage alongside treatment <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`,"living"],
 ["Paracetamol (acetaminophen)",`AASLD's preferred first-line analgesic, up to 2 g a day in cirrhosis, as published <sup class="c" data-ref="Rogal2022AASLD" title="Source 387">387</sup>.`,"nutrition"],
 ["PBC (primary biliary cholangitis)",`Autoimmune small bile duct disease; antimitochondrial antibodies plus cholestatic tests <sup class="c" data-ref="EASL2017PBC" title="Source 105">105</sup>.`,"othercauses"],
 ["PNPLA3 I148M",`The strongest common genetic risk variant for alcohol-related cirrhosis and MASLD <sup class="c" data-ref="Buch2015NatGenet,Romeo2008PNPLA3" title="Source 52,390">52,390</sup>.`,"alcohol"],
 ["Portal hypertension",`Raised pressure in the portal vein from scar, nodules and vascular tone <sup class="c" data-ref="DiazSoto2022TAG" title="Source 101">101</sup>.`,"portal"],
 ["Portal triad",`A branch of the portal vein, hepatic artery and bile duct at each lobule corner <sup class="c" data-ref="Trefts2017" title="Source 467">467</sup>.`,"liver"],
 ["Pre-emptive TIPS",`A covered TIPS within 72 h of a variceal bleed in high-risk patients <sup class="c" data-ref="deFranchis2022BavenoVII,GarciaPagan2010NEJM" title="Source 97,168">97,168</sup>.`,"portal"],
 ["PSC (primary sclerosing cholangitis)",`Bile duct strictures, often with IBD; high cholangiocarcinoma and colorectal cancer risk <sup class="c" data-ref="Karlsen2017,Zhang2022PSCIBD" title="Source 230,516">230,516</sup>.`,"othercauses"],
 ["Recompensation",`Cause removed, complications resolved off treatment for 12 months, stable albumin, INR and bilirubin <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"course"],
 ["Regression",`Shrinkage of scar after the cause is removed (Established) <sup class="c" data-ref="Kisseleva2021" title="Source 240">240</sup>.`,"fibrosis"],
 ["Resmetirom",`A thyroid hormone receptor-β agonist approved for noncirrhotic MASH with F2–F3 fibrosis <sup class="c" data-ref="FDA-Rezdiffra,Harrison2024MAESTRO" title="Source 143,193">143,193</sup>.`,"masld"],
 ["Rifaximin",`A gut-acting antibiotic added to lactulose to prevent HE recurrence; 550 mg twice daily on the label <sup class="c" data-ref="FDA-Xifaxan,Bass2010Rifaximin" title="Source 27,152">27,152</sup>.`,"encephalopathy"],
 ["Rule of 5",`Baveno VII: liver stiffness of 10, 15, 20 and 25 kPa marks rising risk <sup class="c" data-ref="deFranchis2022BavenoVII" title="Source 97">97</sup>.`,"noninvasive"],
 ["SAAG",`Serum–ascites albumin gradient; 1.1 g/dl or more means portal hypertension <sup class="c" data-ref="EASL2018Decomp,Runyon1992AnnIntern" title="Source 106,395">106,395</sup>.`,"ascites"],
 ["Sarcopenia",`Loss of muscle mass; L3 skeletal muscle index under 50 cm²/m² in men and 39 cm²/m² in women <sup class="c" data-ref="Carey2017SMI" title="Source 63">63</sup>.`,"nutrition"],
 ["SBP (spontaneous bacterial peritonitis)",`Infection of ascites without a surgical source; ascitic neutrophils above 250 cells/µl <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`,"ascites"],
 ["Sinusoids",`Low-pressure capillaries where portal and arterial blood mix on the way to the central vein <sup class="c" data-ref="Trefts2017,Eipel2010" title="Source 117,467">117,467</sup>.`,"liver"],
 ["Space of Disse",`The gap between hepatocytes and sinusoidal cells where stellate cells live <sup class="c" data-ref="Friedman2008PhysiolRev" title="Source 165">165</sup>.`,"liver"],
 ["Spironolactone",`An aldosterone antagonist for ascites; the label advises starting in hospital in cirrhosis <sup class="c" data-ref="FDA-Aldactone" title="Source 127">127</sup>.`,"ascites"],
 ["Statins",`Safe for cardiovascular risk in MASLD including compensated cirrhosis <sup class="c" data-ref="Rinella2023AASLD" title="Source 381">381</sup>; LIVERHOPE-EFFICACY did not reduce ACLF <sup class="c" data-ref="Pose2025LIVERHOPE" title="Source 364">364</sup>.`,"frontier"],
 ["Stellate cell",`A vitamin A-storing cell that becomes the main scar-maker when activated <sup class="c" data-ref="Tsuchida2017,Friedman2008PhysiolRev" title="Source 165,471">165,471</sup>.`,"fibrosis"],
 ["Steatosis",`Fat in the liver; develops in about 90% of heavy drinkers <sup class="c" data-ref="Singal2018ACG" title="Source 428">428</sup>.`,"masld"],
 ["SVR (sustained virological response)",`Hepatitis C cure: no virus 12 weeks after treatment <sup class="c" data-ref="Manns2017NRDP" title="Source 288">288</sup>.`,"hepatitis"],
 ["Tacrolimus",`The main anti-rejection drug after liver transplant; boxed warning for serious infections and malignancies <sup class="c" data-ref="FDA-Prograf" title="Source 142">142</sup>.`,"transplant"],
 ["Tenofovir",`An HBV antiviral (TDF or TAF); 5 years of TDF reversed cirrhosis in 74% on biopsy <sup class="c" data-ref="Marcellin2013,FDA-Viread,FDA-Vemlidy" title="Source 149,150,289">149,150,289</sup>.`,"hepatitis"],
 ["Terlipressin",`A vasoconstrictor for variceal bleeding and HRS-AKI; boxed warning for respiratory failure <sup class="c" data-ref="FDA-Terlivaz,EASL2018Decomp" title="Source 106,146">106,146</sup>.`,"ascites"],
 ["TGF-β1",`The strongest fibrogenic cytokine <sup class="c" data-ref="Bataller2005" title="Source 28">28</sup>.`,"fibrosis"],
 ["Thrombocytopenia",`Low platelets, seen in up to 76% of people with chronic liver disease <sup class="c" data-ref="Afdhal2008Platelets" title="Source 9">9</sup>.`,"tests"],
 ["TIPS",`Transjugular intrahepatic portosystemic shunt, a stent through the liver that lowers portal pressure <sup class="c" data-ref="Richter1989Radiologe,deFranchis2022BavenoVII" title="Source 97,378">97,378</sup>.`,"portal"],
 ["Transient elastography (FibroScan)",`An ultrasound-based pulse measuring liver stiffness; AUROC 0.94 for cirrhosis <sup class="c" data-ref="FriedrichRust2008TE" title="Source 166">166</sup>.`,"noninvasive"],
 ["Ursodiol (UDCA)",`First-line PBC treatment; label 13–15 mg/kg/day, as published <sup class="c" data-ref="FDA-Urso" title="Source 148">148</sup>.`,"othercauses"],
 ["Variceal bleeding",`Bleeding from varices, with 15–25% 6-week mortality per episode <sup class="c" data-ref="EASL2018Decomp" title="Source 106">106</sup>.`,"portal"],
 ["West Haven criteria",`Grades of HE from minimal to grade IV coma <sup class="c" data-ref="Vilstrup2014HE" title="Source 485">485</sup>.`,"encephalopathy"],
 ["Wilson disease",`Autosomal recessive copper overload from ATP7B mutations <sup class="c" data-ref="Ferenci2003Leipzig,Czlonkowska2018" title="Source 90,154">90,154</sup>.`,"othercauses"],
 ["Xenotransplantation",`Using a gene-edited pig liver; first human cases are Hypothesis-stage <sup class="c" data-ref="Tao2025Xeno,Zhang2026Xeno" title="Source 446,518">446,518</sup>.`,"frontier"],
 ["Zone 3",`The pericentral zone of the lobule, with the least oxygen <sup class="c" data-ref="Trefts2017,Kietzmann2017" title="Source 232,467">232,467</sup>.`,"liver"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'meld 3.0' or 'childpugh' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐]/g,'');
  function render(){const q=norm(inp.value.trim());const L=GL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GL_T.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SO_AREAN={A:'Epidemiology, burden, natural history & history',B:'Liver biology, fibrosis mechanisms & regression',C:'Causes I: alcohol-related liver disease & MASLD',D:'Causes II: viral hepatitis & other causes',E:'Diagnosis, staging scores & liver cancer surveillance',F:'Portal hypertension, varices & bleeding, ascites, SBP & kidney injury',G:'Hepatic encephalopathy, nutrition & sarcopenia, medicine safety & liver transplant',H:'Living with cirrhosis, nursing care, palliative care & self-management'};
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
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${SO_link(s)?`<a href="${esc(SO_link(s))}" target="_blank" rel="noopener">${esc(SO_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${SO_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">not matched in a research database</span>':''}</span></li>`}).join('');
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
