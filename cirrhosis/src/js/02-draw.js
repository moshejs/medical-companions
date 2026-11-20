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
