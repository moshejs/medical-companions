/* ---- drawing kit for the Stroke Companion ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string, or an object
   with .svg (and usually .at, named anchor points in the caller's SVG coordinates), to concatenate into an <svg>'s
   innerHTML. Everything is schematic: no glyph encodes a measured value unless the caller passes one in, and the
   kit holds no clinical numbers (no thresholds, doses, time windows, scores or trial results). Pass them in from
   the research, with the citation in the surrounding text. Clip paths use fresh ids on every call, so any number
   of glyphs can share a page. Text labels stay a fixed size whatever the scale.

   ORIENTATION. Side views face LEFT (frontal lobe at the viewer's left). Axial slices and Willis are drawn as a
   scan is read: FRONT is UP and the person's LEFT is on the VIEWER'S RIGHT. Every o.side is the PERSON's side:
   'L' or 'R'. A face or body seen from the front follows the same rule.

   ---- brain ----
   brainSide(x,y,s,o)   lateral view of a left hemisphere: frontal, parietal, temporal, occipital lobes with real
                        sulci, cerebellum with folia, brainstem. (x,y) = top left; s = scale, 1 = 300 wide, 250 tall.
     o.shade   {aca,mca,pca,cerebellum,brainstem: 0..1}  wash arterial territories, clipped to the surface.
     o.lobes   true: name the lobes (at s below about .7 the labels start to crowd).
     o.vessels true or {occl:'m1'|'sup'|'inf', ph, flow (0..1), op}: the MCA fanning over the surface. occl stops flow
               at that point: a clot is drawn and everything downstream goes pale. ph moves dashes along the branches.
     o.lesion  {at:[px,py] (local 0..300 / 0..250; default the MCA territory centre), core:r, penumbra:r (local units),
               saved (0..1 the penumbra turns from amber to teal), mca (true: also clip to the MCA territory)}.
     o.dim     0..1 greys the whole surface (a context brain behind other drawing). o.id optional id prefix.
     Returns {svg, at:{m1,bif,sup,inf,frontal,parietal,temporal,occipital,cerebellum,brainstem,lesion}, w, h}.

   brainAxial(x,y,s,o)  axial slice at the level of the basal ganglia: skull, CSF, cortical ribbon, white matter,
                        frontal horns, third ventricle, atria, caudate, lentiform, internal capsule, thalamus, insula.
                        (x,y) = top left; s = scale, 1 = 240 wide, 300 tall.
     o.mode    'plain' (default) | 'ct' (greys on black: bone white, CSF dark, core hypodense, blood white) |
               'dwi' (grey on black: only the core shows, bright; penumbra is invisible on DWI).
     o.side    'L' (default) | 'R': the affected hemisphere (person's side) for terr, core, penumbra and a default bleed.
     o.terr    {aca,mca,pca: 0..1, side:'L'|'R'|'both' (default 'both')}: territory washes.
     o.core, o.penumbra  0..1 radial growth from the insula outward, clipped to that hemisphere's MCA territory.
     o.saved   0..1 penumbra turns to --salvage.
     o.bleed   {x,y (local; default the putamen of o.side), r, oedema (0..1 a halo)}: intracerebral haemorrhage.
     o.shift   local px: the midline and deep structures are pushed this far away from o.side, as a mass does.
     o.ivh     0..1 blood in the ventricles.   o.sah 0..1 blood in the fissures and sulci.
     o.labels  true: names on the structures (use s >= 1).   o.orient true: R and L corner marks.   o.id.
     Returns {svg, at:{core,caudate,lentiform,capsule,thalamus,hornL,hornR,third,insula,midline,bleed}, w, h}.

   aspects(x,y,s,o)     the 10 ASPECTS regions on one hemisphere of two schematic slices: the ganglionic level
                        (C, IC, L, I, M1, M2, M3) and the supraganglionic level (M4, M5, M6), as the score is read.
                        s = scale, 1 = each slice 240 wide, 300 tall.
     o.side 'L' (default)|'R', o.layout 'row' (default, 500 wide) | 'col' (240 wide, 620 tall),
     o.marked  array or Set of region ids shown as affected, o.hl one id outlined, o.mode as brainAxial,
     o.clickable true: each region gets class="clk", tabindex="0", role="button", aria-pressed and data-asp="<id>",
     so the module can use one delegated click and keydown handler on the svg. o.labels false hides the region names.
     Returns {svg, regions:{C:{id,name,d,pts,c:[x,y]}, ...}, ids:[...10 ids], w, h}. Pts are closed polygons in caller
     coordinates. The module computes the score; the kit does not.

   ---- vessels ----
   willis(x,y,s,o)      circle of Willis seen from below, front up. (x,y) = top left; s = scale, 1 = 300 wide, 262 tall.
                        Segments: VA-R VA-L basilar P1-R P1-L P2-R P2-L PCom-R PCom-L ICA-R ICA-L M1-R M1-L A1-R A1-L ACom
                        A2-R A2-L. (-R is the person's right, on the viewer's left.)
     o.block   {name:0..1}: a clot in that segment, it pales and its flow stops as the value nears 1.
     o.dim     {name:0..1}: pale a segment with no clot (downstream of a block, or an absent ACom).
     o.flow    0..1 strength of moving dashes (none if absent), o.ph phase, o.rev {name:true} flow reversed in it
               (collateral flow through ACom or PCom).
     o.hl      array of names outlined in ember. o.labels true: short names beside each segment. o.minor false: no SCA and AICA.
     Returns {svg, at:{<each name>:[x,y] midpoint}, pts:{<each name>:[[..]] polyline}, w, h}.

   artery(x,y,w,o)      longitudinal cut of a straight vessel from x to x+w, top at y; o.h = outer height (46). Flow runs
                        left to right.
     o.flow 0..1 (speed and how many cells; default 1), o.ph phase (pass t times a speed), o.clot 0..1 occlusion
     (grows from the lower wall, 1 fills the lumen: cells pile up behind, none pass), o.at 0..1 clot position (.58),
     o.plaque 0..1 a fatty plaque on the lower wall at o.plaqueAt (.5), o.lysis 0..1 clot shrinks and sheds fragments
     while lytic drug particles arrive, o.rupture 0..1 a tear in the upper wall with a jet of blood at o.ruptureAt (.5),
     o.stopAt (px) with o.pass (0..1): how much of the red-cell stream gets past that x, for a clot you draw yourself,
     o.labels true. A rupture's plume rises above y: leave about 2*o.h of headroom. Returns {svg, at:{clot,plaque,rupture,top,bot,mid},
     lumenTop, lumenBot}.
   aneurysm(x,y,s,o)    berry aneurysm at the top of an arterial bifurcation. (x,y) = top left; s = scale, 1 = 200 wide,
                        190 tall. o.rupture 0..1 a jet from the dome and blood spreading, o.coil 0..1 a platinum coil
                        packs the sac (a microcatheter enters; blood leaves the sac), o.clip 0..1 a clip closes on the
                        neck, o.ph, o.flow, o.labels. A rupture's plume rises about 40 local units above y. Returns {svg, at:{sac,neck,
                        parent,dome,left,right}}.
   clot(x,y,s,o)        a thrombus centred at (x,y), s = length: fibrin mesh with red cells. o.ang (deg), o.kind 'red'
                        (default) | 'white' (platelet-rich), o.seed, o.op.
   carotidBif(x,y,s,o)  carotid bifurcation, cut lengthwise: CCA from below, ICA with its bulb up left, ECA up right.
                        (x,y) = top left; s = scale, 1 = 170 wide, 250 tall. o.stenosis 0..1 plaque narrows the ICA bulb.
                        o.nascet true: marks the narrowest lumen (N) and the normal distal ICA (D). o.ecst true: dashed
                        estimate of the original bulb width (E). o.flow, o.ph, o.labels. Returns {svg, at:{cca,bif,ica,eca,
                        plaque,narrow,distal}, n, d, e}: n, d, e are the drawn widths, so a module can show the geometry
                        of (1 - n/d) on the drawing, labelled as a drawing.
   catheterStent(x,y,w,o) a stent retriever in an artery from x to x+w, flow left to right (o.h 60). o.deploy 0..1 the
                        sheath pulls back and the mesh opens through the clot (flow restarts as it does), o.retract 0..1
                        the mesh draws the clot back into the catheter, o.ph, o.labels. Returns {svg, at:{clot,tip}}.

   ---- cells ----
   neuron(x,y,r,o)      a neuron with soma radius r at (x,y). o.state 'alive' (default) | 'stressed' (swollen, amber,
                        beaded dendrites) | 'dead' (shrunken, fragmented, dark), o.ca 0..1 calcium dots inside,
                        o.glu 0..1 glutamate dots around it, o.axon length in px (r*5; 0 for none), o.seed, o.ang (deg), o.op.

   ---- body ----
   heartAF(x,y,s,o)     front view of a heart with the left atrium and appendage opened. (x,y) = top left; s = scale,
                        1 = 200 wide, 220 tall. o.af 0..1 the atria quiver and fibrillation waves run, o.ph phase,
                        o.thrombus 0..1 a clot fills the appendage, o.embolus 0..1 a piece travels from it through the
                        left heart and out of the aorta, o.labels. Returns {svg, at:{laa,la,lv,aorta,exit,embolus}}.
   faceGlyph(x,y,s,o)   simple front face centred at (x,y), s = height. o.droop 0..1, o.side 'L' (person's left, the
                        viewer's right; default), o.smile 0..1 (.8).
   armsGlyph(x,y,s,o)   head and torso with both arms held out, centred at (x,y), s = height. o.drift 0..1 one arm sinks
                        and turns in (a dashed ghost shows where it began), o.side.
   bodyHemi(x,y,s,o)    a front body outline centred at (x,y), s = height. o.left, o.right 0..1 weakness wash on the
                        PERSON's left or right half, o.col (var(--accent)), o.labels true: 'right' and 'left' beneath.
                        sideFigure is the same function.

   ---- outcome ----
   mrsStack(x,y,w,h,dist,o) one horizontal stacked bar of modified Rankin scores: dist = 7 numbers for mRS 0..6, any
                        units; the bar shows their shares. Segments use --mrs0..--mrs6 with their own text colours. Each
                        segment wide enough carries its value (o.fmt(v), default rounded); every segment wide enough has
                        its mRS number above the bar. o.label text above the left end (leave 26 px above y);
                        o.digits false hides the numbers. Returns {svg, at(i)->[cx,y], X(share 0..1)->x}.
   mrsLegend(x,y,w,o)   the seven colours with their short names (MRS_NAMES), wrapped to w, o.size swatch.
                        Returns {svg, h}. MRS_NAMES holds the scale's level names.

   ---- generic (same as the other companions) ----
   clock(cx,cy,r,min,o) a clock face with hands at min minutes and a filled sector: o {full (60), col, label, ticks, h0}.
   icons(x,y,o)         an icon array (a 'hundred people' block): o {n (100), cols (10), k (highlighted), size, gap, col,
                        base, shape ('person'|'dot')}. Returns {svg, h, at(i)}.
   curve(x,y,w,h,f,o)   a plotted function in a box: o {x0,x1,y0,y1,upto,col,fill,bands,dot,lw,dash}. Returns {svg,X,Y,at}.
   monoFn(P)            monotone cubic through cited points (space nested arrays: see the brief). Returns f(x).
   tline(x,y,w,o)       a horizontal time axis: o {min,max,step,fmt,label,big}. Returns {svg,X}.
   gauge(cx,cy,r,v,max,o) a half-dial gauge: o {bands,label,big}.
   ladder(x,y,w,h,steps,o) rising stairs, one per label: o {at,col,done}. Returns {svg,top(i)}.
   pill(x,y,s,o)        a tablet: o {ang,col,txt,round}.
   person(x,y,s,fill,o) a person pictogram, (x,y) its top centre.
   smoothPath(P,closed) Catmull-Rom path through points.   inPoly(p,P) point in polygon.   ptsD(P) polyline path.
   bezPts(segs,N)       sample a chain of cubic Beziers.   marker(id,color) (core) an arrowhead for <defs>.
   kitLabel(x,y,text,o) a small label with a halo so it reads on any drawing: o {a:'m'|'e', halo (var(--panel))}.
   blob(cx,cy,r,seed,o) an irregular closed path string, for a lesion or clot of your own: o {n (18), rough (.16)}. */
function smoothPath(P,closed=true){const n=P.length;let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;
  for(let i=0;i<(closed?n:n-1);i++){const p0=P[closed?(i-1+n)%n:Math.max(0,i-1)],p1=P[i],p2=P[(i+1)%n],p3=P[closed?(i+2)%n:Math.min(n-1,i+2)];
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=`C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`}
  return d+(closed?'Z':'')}
function inPoly(p,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
const ptsD=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
/* sample a chain of cubic Bezier segments [[p0,c1,c2,p1],...] into points */
function bezPts(segs,N=22){const out=[];segs.forEach((g,j)=>{for(let i=j?1:0;i<=N;i++){const t=i/N,m=1-t;
  out.push([m*m*m*g[0][0]+3*m*m*t*g[1][0]+3*m*t*t*g[2][0]+t*t*t*g[3][0],m*m*m*g[0][1]+3*m*m*t*g[1][1]+3*m*t*t*g[2][1]+t*t*t*g[3][1]])}});return out}
function monoFn(P){const n=P.length,dx=[],m=[],t=[];for(let i=0;i<n-1;i++){dx[i]=P[i+1][0]-P[i][0];m[i]=(P[i+1][1]-P[i][1])/dx[i]}
  t[0]=m[0];t[n-1]=m[n-2];for(let i=1;i<n-1;i++)t[i]=m[i-1]*m[i]<=0?0:3*(dx[i-1]+dx[i])/((2*dx[i]+dx[i-1])/m[i-1]+(dx[i]+2*dx[i-1])/m[i]);
  return v=>{if(v<=P[0][0])return P[0][1];if(v>=P[n-1][0])return P[n-1][1];let i=0;while(v>P[i+1][0])i++;const h=dx[i],u=(v-P[i][0])/h,u2=u*u,u3=u2*u;
    return (2*u3-3*u2+1)*P[i][1]+(u3-2*u2+u)*h*t[i]+(-2*u3+3*u2)*P[i+1][1]+(u3-u2)*h*t[i+1]}}
function clock(cx,cy,r,min,o={}){const full=o.full||60,u=clamp(min/full),col=o.col||'var(--brand)',A=v=>(v*360-90)*Math.PI/180,n=o.ticks||12;
  let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
  if(u>0){const a=A(u),large=u>.5?1:0;s+=u>=.999?`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r-3)}" style="fill:${col};opacity:.22"/>`:`<path d="M${f1(cx)} ${f1(cy)}L${f1(cx)} ${f1(cy-r+3)}A${f1(r-3)} ${f1(r-3)} 0 ${large} 1 ${f1(cx+(r-3)*Math.cos(a))} ${f1(cy+(r-3)*Math.sin(a))}Z" style="fill:${col};opacity:.22"/>`}
  for(let i=0;i<n;i++){const a=A(i/n);s+=`<line x1="${f1(cx+Math.cos(a)*r*.8)}" y1="${f1(cy+Math.sin(a)*r*.8)}" x2="${f1(cx+Math.cos(a)*r*.93)}" y2="${f1(cy+Math.sin(a)*r*.93)}" style="stroke:var(--muted);stroke-width:${i%3?1:1.8}"/>`}
  const mA=A((min%60)/60),hA=A((((o.h0||0)*60+min)/60%12)/12);
  s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(hA)*r*.5)}" y2="${f1(cy+Math.sin(hA)*r*.5)}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(mA)*r*.78)}" y2="${f1(cy+Math.sin(mA)*r*.78)}" style="stroke:${col};stroke-width:1.8;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" style="fill:var(--ink)"/>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+r+15)}" class="t-xs t-mid">${o.label}</text>`;
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
/* ---- kit internals ---- */
let _kid=0;
const kid=p=>p+'_'+(++_kid);
function kitLabel(x,y,t,o={}){return `<text x="${f1(x)}" y="${f1(y)}" class="t-xs${o.a==='m'?' t-mid':o.a==='e'?' t-end':''}" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:${o.halo||'var(--panel)'};stroke-width:3px;stroke-linejoin:round">${t}</text>`}
/* Catmull-Rom points through P, k per span */
function crPts(P,closed=true,k=6){const n=P.length,out=[],m=closed?n:n-1;
  for(let i=0;i<m;i++){const a=P[closed?(i-1+n)%n:Math.max(0,i-1)],b=P[i],c=P[(i+1)%n],d=P[closed?(i+2)%n:Math.min(n-1,i+2)];
    for(let j=0;j<k;j++){const t=j/k,u=t*t,v=u*t,f=q=>.5*(2*b[q]+(c[q]-a[q])*t+(2*a[q]-5*b[q]+4*c[q]-d[q])*u+(3*b[q]-a[q]-3*c[q]+d[q])*v);out.push([f(0),f(1)])}}
  if(!closed)out.push(P[n-1]);return out}
/* rolling bumps along a dense closed outline: rounded gyri meeting at narrow dips */
function gyrate(P,amp,per,seed=1){const n=P.length,rr=rng(seed),ph=[rr()*6,rr()*6];let s=0;const out=[];
  for(let i=0;i<n;i++){const a=P[(i-1+n)%n],b=P[i],c=P[(i+1)%n],dx=c[0]-a[0],dy=c[1]-a[1],l=Math.hypot(dx,dy)||1;s+=Math.hypot(b[0]-a[0],b[1]-a[1])/2;
    const w=s/per+.28*Math.sin(s/per*.9+ph[0]),h=Math.pow(Math.abs(Math.sin(Math.PI*w)),.55)-.55,k=amp*h*(1+.3*Math.sin(s/per*.37+ph[1]));
    out.push([b[0]+dy/l*k,b[1]-dx/l*k])}
  return out}
/* an irregular closed path, for lesions and clots */
function blob(cx,cy,r,seed=1,o={}){const n=o.n||18,ro=o.rough==null?.16:o.rough,rr=rng(seed),P=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(rr()-.5)*ro*2;P.push([cx+Math.cos(a)*r*k,cy+Math.sin(a)*r*k*(o.sq||1)])}
  return smoothPath(P)}

/* ---- brainSide: local box 300 x 250, facing left ---- */
const BS_CEREBRUM=[[15,118],[17,98],[26,76],[42,54],[64,35],[90,21],[120,11],[152,8],[184,11],[212,21],[238,37],[259,59],[275,85],[285,110],[286,130],[277,146],[259,155],[238,159],[215,165],[191,175],[166,186],[141,192],[117,190],[97,181],[86,167],[87,155],[99,145],[85,144],[64,147],[44,147],[25,137]];
const BS_CEREBELLUM=[[188,175],[214,166],[244,160],[268,166],[281,184],[270,206],[246,221],[218,226],[196,216],[183,197]];
const BS_STEM=[[140,186],[162,178],[190,176],[197,196],[192,212],[186,226],[184,250],[167,250],[166,230],[156,219],[143,206]];
/* sulci, each a polyline through the gyri: [width class, points] */
const BS_SULCI=[
  /* Sylvian fissure and its rami */
  [3,[[100,145],[120,136],[146,128],[170,120],[190,110],[204,95]]],[2,[[114,138],[104,128],[92,124]]],[2,[[120,136],[116,122],[108,110]]],
  /* central sulcus, then pre- and postcentral */
  [3,[[166,10],[160,24],[165,38],[153,54],[157,70],[144,86],[147,101],[133,120]]],
  [2,[[138,18],[131,31],[136,44],[125,58]]],[2,[[122,66],[116,80],[119,94],[107,112]]],
  [2,[[194,17],[187,31],[191,45],[179,60],[181,76],[169,92],[171,106],[160,118]]],
  /* frontal: superior and inferior frontal sulci with branches */
  [2,[[125,48],[108,48],[92,55],[76,60],[62,74],[50,86],[40,92]]],[2,[[117,84],[98,84],[82,92],[64,97],[48,108],[34,118]]],
  [1,[[106,24],[99,36],[108,42]]],[1,[[82,34],[76,48],[84,54]]],[1,[[58,50],[52,64],[60,70]]],[1,[[92,62],[84,74],[92,82]]],[1,[[66,76],[60,88],[68,94]]],
  [1,[[42,70],[34,84]]],[1,[[80,106],[70,110],[62,124],[72,134]]],[1,[[50,118],[42,130]]],[1,[[94,102],[88,114]]],[1,[[32,100],[26,108]]],
  /* parietal: intraparietal sulcus, branches */
  [2,[[180,60],[198,64],[213,60],[228,72],[245,78],[260,92]]],[1,[[214,28],[208,42],[218,52]]],[1,[[240,50],[234,62]]],[1,[[206,82],[220,92],[238,96]]],
  [2,[[204,95],[220,110],[238,108],[250,118]]],[1,[[190,84],[198,74]]],
  /* parieto-occipital notch and occipital */
  [2,[[240,38],[249,56],[244,66]]],[1,[[268,84],[256,100],[268,114]]],[2,[[277,120],[258,128],[240,136],[246,150]]],[1,[[258,142],[270,136]]],
  /* temporal: superior and inferior temporal sulci, branches */
  [2,[[106,164],[128,158],[152,150],[176,141],[198,128],[214,114]]],[2,[[120,180],[146,174],[170,164],[194,155],[218,146],[234,134]]],
  [1,[[138,142],[146,136]]],[1,[[170,130],[176,138]]],[1,[[132,168],[140,160]]],[1,[[164,158],[170,150]]],[1,[[204,140],[212,132]]],[1,[[100,172],[112,176]]]
];
/* territory polygons on the lateral surface (clipped to the cerebrum) */
const BS_ACA=[[0,112],[30,82],[66,56],[106,38],[150,30],[196,34],[228,46],[250,58],[300,30],[300,-10],[0,-10]];
const BS_PCA=[[250,58],[236,94],[224,128],[192,150],[150,168],[116,196],[300,260],[320,60]];
const BS_MCA=[[0,112],[30,82],[66,56],[106,38],[150,30],[196,34],[228,46],[250,58],[236,94],[224,128],[192,150],[150,168],[116,196],[60,220],[0,200]];
/* the MCA as seen on the surface: [name, division, width, points] */
const BS_MCA_V=[
  ['m1','t',4,[[110,206],[108,180],[101,158],[108,146],[126,136]]],
  ['s0','s',3,[[126,136],[128,124],[126,112]]],
  ['s1','s',2.1,[[126,112],[112,104],[94,102],[78,92],[58,84]]],
  ['s2','s',2.1,[[126,112],[116,86],[120,68],[112,48],[120,28]]],
  ['s3','s',2.1,[[126,112],[142,92],[146,70],[160,48],[158,26]]],
  ['s4','s',1.8,[[126,112],[158,106],[176,84],[192,62],[206,36]]],
  ['s5','s',1.3,[[94,102],[84,114],[68,116]]],
  ['s6','s',1.3,[[112,48],[96,40],[84,44]]],
  ['s7','s',1.3,[[192,62],[212,66],[232,58]]],
  ['i0','i',3,[[126,136],[148,131],[170,124]]],
  ['i1','i',2.1,[[170,124],[192,116],[212,106],[230,104],[252,106]]],
  ['i2','i',2.1,[[170,124],[182,134],[206,134],[226,124]]],
  ['i3','i',1.9,[[148,131],[146,146],[160,158],[182,152]]],
  ['i4','i',1.7,[[126,136],[122,150],[134,166],[116,172]]],
  ['i5','i',1.2,[[212,106],[222,88],[236,82]]]
];
let _BS=null;
function bsGeom(){if(_BS)return _BS;
  const dp=P=>ptsD(P)+'Z',outline=gyrate(crPts(BS_CEREBRUM,true,8),1.9,17,7);
  const cb=crPts(BS_CEREBELLUM,true,6),stem=crPts(BS_STEM,true,6);
  let major='',mid='',minor='';
  BS_SULCI.forEach(([w,P])=>{const d=smoothPath(P,false);if(w===3)major+=d;else if(w===2)mid+=d;else minor+=d});
  /* cerebellar folia: fine parallel arcs */
  let fol='';for(let i=0;i<9;i++){const u=i/8,yy=lerp(168,222,u),bow=10+6*Math.sin(u*Math.PI);fol+=`M${f1(180)} ${f1(yy+12)}Q${f1(232)} ${f1(yy+bow)} ${f1(286)} ${f1(yy-8)}`}
  const cbFiss='M186 182Q232 184 281 178';
  const v={};BS_MCA_V.forEach(([n,g,w,P])=>{v[n]={g,w,P:crPts(P,false,6),d:smoothPath(P,false)}});
  _BS={cer:dp(outline),cb:dp(gyrate(cb,1,10,3)),stem:dp(stem),major,mid,minor,fol,cbFiss,aca:dp(BS_ACA),mca:dp(BS_MCA),pca:dp(BS_PCA),v};return _BS}
const BS_AT={m1:[108,158],bif:[126,136],sup:[126,112],inf:[170,124],frontal:[66,84],parietal:[216,50],temporal:[170,168],occipital:[264,118],cerebellum:[238,198],brainstem:[172,212]};
function polyLen(P){let L=0;for(let i=1;i<P.length;i++)L+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);return L}
function brainSide(x,y,s=1,o={}){const G=bsGeom(),T=p=>[x+p[0]*s,y+p[1]*s],id=kid(o.id||'bs'),sw=v=>f1(v);
  const dim=clamp(o.dim||0),sh=o.shade||{};
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"${dim?` style="opacity:${f1(1-dim*.65)}"`:''}>`;
  g+=`<defs><clipPath id="${id}c"><path d="${G.cer}"/></clipPath><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--wm);stop-opacity:.42"/><stop offset=".5" style="stop-color:var(--wm);stop-opacity:0"/><stop offset="1" style="stop-color:var(--brain-line);stop-opacity:.3"/></linearGradient></defs>`;
  /* cerebellum, then brainstem, then the cerebrum over them */
  g+=`<path d="${G.cb}" style="fill:var(--cerebellum);stroke:var(--brain-line);stroke-width:1.2"/>`;
  g+=`<clipPath id="${id}b"><path d="${G.cb}"/></clipPath><g clip-path="url(#${id}b)"><path d="${G.fol}" style="fill:none;stroke:var(--sulcus);stroke-width:.9;opacity:.85"/><path d="${G.cbFiss}" style="fill:none;stroke:var(--sulcus);stroke-width:2"/></g>`;
  if(sh.cerebellum)g+=`<path d="${G.cb}" style="fill:var(--vert);opacity:${f1(clamp(sh.cerebellum)*.62)}"/>`;
  g+=`<path d="${G.stem}" style="fill:var(--brainstem);stroke:var(--brain-line);stroke-width:1.2"/><path d="M146 202Q168 208 193 200M167 228Q176 231 186 228" style="fill:none;stroke:var(--sulcus);stroke-width:.9"/>`;
  if(sh.brainstem)g+=`<path d="${G.stem}" style="fill:var(--vert);opacity:${f1(clamp(sh.brainstem)*.62)}"/>`;
  g+=`<path d="${G.cer}" style="fill:var(--brain)"/>`;
  /* territory washes sit under the sulci, so the folds still read through them */
  if(sh.aca||sh.mca||sh.pca){g+=`<g clip-path="url(#${id}c)">`;
    [['aca','--aca'],['mca','--mca'],['pca','--pca']].forEach(([k,c])=>{if(sh[k])g+=`<path d="${G[k]}" style="fill:var(${c});opacity:${f1(clamp(sh[k])*.62)}"/>`});g+='</g>'}
  /* lesion */
  let lesAt=null;
  if(o.lesion){const L=o.lesion,a=L.at||[150,104],sv=clamp(L.saved||0);lesAt=a;
    g+=`<g clip-path="url(#${id}c)">${L.mca?`<clipPath id="${id}m"><path d="${G.mca}"/></clipPath><g clip-path="url(#${id}m)">`:''}`;
    if(L.penumbra){const d=blob(a[0],a[1],L.penumbra,5,{n:16,rough:.12});
      g+=`<path d="${d}" style="fill:var(--penumbra);opacity:${f1(.72*(1-sv))}"/>`;if(sv>0)g+=`<path d="${d}" style="fill:var(--salvage);opacity:${f1(.72*sv)}"/>`}
    if(L.core)g+=`<path d="${blob(a[0],a[1],L.core,9,{n:14,rough:.17})}" style="fill:var(--core);opacity:.9"/>`;
    g+=`${L.mca?'</g>':''}</g>`}
  /* folds: a soft shadow, a fine dark line and a highlight beside it give the gyri some relief */
  g+=`<g clip-path="url(#${id}c)" style="fill:none;stroke-linecap:round;stroke-linejoin:round">`;
  g+=`<g transform="translate(.8 1)" style="stroke:var(--wm);opacity:.55"><path d="${G.major}" style="stroke-width:2.4"/><path d="${G.mid}" style="stroke-width:1.8"/><path d="${G.minor}" style="stroke-width:1.2"/></g>`;
  g+=`<g style="stroke:var(--sulcus)"><path d="${G.major}" style="stroke-width:2.8"/><path d="${G.mid}" style="stroke-width:2"/><path d="${G.minor}" style="stroke-width:1.3"/></g>`;
  g+=`<g style="stroke:var(--brain-line);opacity:.8"><path d="${G.major}" style="stroke-width:1.1"/><path d="${G.mid}" style="stroke-width:.7"/></g>`;
  g+='</g>';
  g+=`<path d="${G.cer}" style="fill:url(#${id}g);stroke:var(--brain-line);stroke-width:1.5;stroke-linejoin:round"/>`;
  /* the middle cerebral artery */
  let vclot=null;
  if(o.vessels){const V=o.vessels===true?{}:o.vessels,occ=V.occl,flow=clamp(V.flow==null?(V.ph!=null?1:0):V.flow),ph=V.ph||0,op=V.op==null?1:V.op;
    const dead=n=>{const k=G.v[n];return occ==='m1'||(occ==='sup'&&k.g==='s')||(occ==='inf'&&k.g==='i')};
    g+=`<g style="fill:none;stroke-linecap:round;stroke-linejoin:round;opacity:${f1(op)}">`;
    /* draw the live vessels over the pale ones */
    [true,false].forEach(pale=>{Object.keys(G.v).forEach(n=>{const k=G.v[n],d=dead(n);if(d!==pale)return;
      const part=(n==='m1'&&occ==='m1')?null:k.d;
      if(part)g+=`<path d="${part}" style="stroke:var(--artery-line);stroke-width:${sw(k.w+1.1)};opacity:${pale?.45:1}"/><path d="${part}" style="stroke:var(--artery);stroke-width:${sw(k.w)};opacity:${pale?.28:1}"/>`;
      if(n==='m1'&&occ==='m1'){const i=Math.floor(k.P.length*.62),a=k.P.slice(0,i+1),b=k.P.slice(i);
        g+=`<path d="${ptsD(a)}" style="stroke:var(--artery-line);stroke-width:${sw(k.w+1.1)}"/><path d="${ptsD(a)}" style="stroke:var(--artery);stroke-width:${sw(k.w)}"/><path d="${ptsD(b)}" style="stroke:var(--artery-line);stroke-width:${sw(k.w+1.1)};opacity:.45"/><path d="${ptsD(b)}" style="stroke:var(--artery);stroke-width:${sw(k.w)};opacity:.28"/>`}
      if(flow>0&&!pale){const L=polyLen(k.P),dash=Math.max(3,k.w*2),off=-ph*60;const lim=(n==='m1'&&occ==='m1')?ptsD(k.P.slice(0,Math.floor(k.P.length*.62)+1)):k.d;
        g+=`<path d="${lim}" style="stroke:var(--wm);stroke-width:${sw(Math.max(.8,k.w*.42))};stroke-dasharray:${f1(dash)} ${f1(dash*2.2)};stroke-dashoffset:${f1(off)};opacity:${f1(flow*.9)}"/>`}
    })});g+='</g>';
    const at={m1:G.v.m1.P[Math.floor(G.v.m1.P.length*.62)],sup:[126,124],inf:[148,131]}[occ];
    if(at){vclot=at;g+=`</g>`+clot(x+at[0]*s,y+at[1]*s,Math.max(10,15*s),{seed:4,ang:-20})+`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`}
  }
  g+='</g>';
  if(o.lobes){const LB=[['frontal','frontal lobe'],['parietal','parietal lobe'],['temporal','temporal lobe'],['occipital','occipital']];
    LB.forEach(([k,t])=>{const p=T(BS_AT[k]);g+=kitLabel(p[0],p[1],t,{a:'m'})});
    const c=T([238,214]);g+=kitLabel(c[0],c[1],'cerebellum',{a:'m'});const b=T([175,246]);g+=kitLabel(b[0]-14*s,b[1],'brainstem',{a:'e'})}
  const at={};Object.keys(BS_AT).forEach(k=>at[k]=T(BS_AT[k]));if(lesAt)at.lesion=T(lesAt);if(vclot)at.clot=T(vclot);
  return {svg:g,at,w:300*s,h:250*s}}

/* ---- brainAxial: local box 240 x 300, centre (120,150) ---- */
const AX={cx:120,cy:150,rx:98.5,ry:128};
const axBase=phi=>{const a=phi*Math.PI/180;return 1/Math.sqrt(Math.pow(Math.sin(a)/AX.rx,2)+Math.pow(Math.cos(a)/AX.ry,2))};
function axBump(phi,seed){const w=phi/(seed?12.5:13.5)+(seed?.37:.11)+.22*Math.sin(phi*.031+seed*2);return Math.pow(Math.abs(Math.sin(Math.PI*w)),.6)-.6}
/* outer contour: phi 0 = front midline, 90 = lateral, 180 = back. sg=-1 viewer's left, +1 viewer's right */
function axR(phi,seed){return axBase(phi)+2.7*axBump(phi,seed)-axBase(phi)*.11*Math.exp(-Math.pow((phi-94)/2.6,2))-axBase(phi)*.06*Math.exp(-Math.pow((phi-92)/9,2))-3.5*Math.exp(-Math.pow(phi/5,2))-3.5*Math.exp(-Math.pow((180-phi)/5,2))}
const axPt=(phi,r,sg)=>{const a=phi*Math.PI/180;return [AX.cx+sg*Math.sin(a)*r,AX.cy-Math.cos(a)*r]};
const axM=(sg,P)=>P.map(p=>[AX.cx+sg*p[0],p[1]]);
const AX_HORN=[[2.2,114],[6,103],[14,98],[22,102],[23,110],[17,116],[12,126],[8,136],[3.5,140],[2.2,128]];
const AX_CAUD=[[23,110],[30,112],[35,122],[33,134],[25,144],[15,147],[8,139],[12,127],[17,117]];
const AX_LENT=[[39,122],[52,120],[64,128],[70,144],[71,162],[66,178],[56,186],[46,178],[36,166],[29,154],[31,140]];
const AX_GP=[[39,136],[45,146],[47,160],[46,174],[37,166],[29,154],[31,142]];
const AX_THAL=[[3.5,160],[11,153],[23,157],[31,170],[33,186],[27,200],[14,206],[5,200],[3.5,184]];
const AX_ATR=[[20,206],[29,204],[38,212],[43,226],[39,244],[33,246],[33,232],[26,218],[18,214]];
const AX_INS=[[75,118],[79,134],[80.5,150],[80,168],[75,186],[72.5,184],[76,168],[77,150],[76,134],[72,120]];
/* internal capsule: anterior limb, genu, posterior limb */
const AX_IC=[[38,118],[29,136],[24,147],[16,150],[24,157],[33,172],[37,192],[46,184],[38,170],[29,154],[31,140],[39,122]];
const AX_TERR={aca:[[0,-20],[60,-20],[62,28],[46,62],[26,92],[12,106],[0,108]],
  pca:[[0,150],[6,152],[24,154],[34,172],[40,196],[52,214],[72,250],[80,320],[0,320]],
  mca:[[12,106],[26,92],[46,62],[62,28],[60,-20],[130,-20],[130,320],[80,320],[72,250],[52,214],[40,196],[34,172],[24,154],[6,152],[8,136]]};
let _AX=null;
function axGeom(){if(_AX)return _AX;const mk=(sg,seed)=>{const O=[],W=[];
    for(let p=1.5;p<=178.5;p+=1.25){const r=axR(p,seed);O.push(axPt(p,r,sg))}
    for(let p=5;p<=175;p+=1.25){const r=axBase(p)-12.5+4.6*axBump(p,seed)-axBase(p)*.1*Math.exp(-Math.pow((p-94)/3.4,2));W.push(axPt(p,r,sg))}
    const mid=dx=>AX.cx+sg*dx;
    const oP=O.concat([[mid(1.5),AX.cy+AX.ry-6]],[[mid(1.5),AX.cy-AX.ry+6]]);
    const wP=W.concat(axM(sg,[[9,232],[9,222],[0,216],[0,86],[9,80],[9,66]]));
    return {o:ptsD(oP)+'Z',w:ptsD(wP)+'Z',pts:oP}};
  const L=mk(-1,0),R=mk(1,1);
  const poly=(sg,P,k=5)=>smoothPath(axM(sg,P));
  const pair=P=>[poly(-1,P),poly(1,P)];
  _AX={L,R,horn:pair(AX_HORN),caud:pair(AX_CAUD),lent:pair(AX_LENT),gp:pair(AX_GP),thal:pair(AX_THAL),atr:pair(AX_ATR),ins:pair(AX_INS),ic:pair(AX_IC),
    terr:{aca:[ptsD(axM(-1,AX_TERR.aca))+'Z',ptsD(axM(1,AX_TERR.aca))+'Z'],mca:[ptsD(axM(-1,AX_TERR.mca))+'Z',ptsD(axM(1,AX_TERR.mca))+'Z'],pca:[ptsD(axM(-1,AX_TERR.pca))+'Z',ptsD(axM(1,AX_TERR.pca))+'Z']}};
  return _AX}
function axColors(mode){if(mode==='ct')return {bg:'var(--scan-bg)',bone:'var(--scan-bone)',bone2:'var(--scan-bone)',csf:'var(--scan-csf)',vent:'var(--scan-csf)',gm:'var(--scan-gm)',wm:'var(--scan-wm)',deep:'var(--scan-gm)',deep2:'var(--scan-gm)',ic:'var(--scan-wm)',core:'var(--scan-hypo)',blood:'var(--scan-blood)',oed:'var(--scan-hypo)',line:'none'};
  if(mode==='dwi')return {bg:'var(--scan-bg)',bone:'var(--scan-bg)',bone2:'var(--scan-bg)',csf:'var(--scan-bg)',vent:'var(--scan-bg)',gm:'var(--scan-dwibg)',wm:'var(--scan-dwibg)',deep:'var(--scan-dwibg)',deep2:'var(--scan-dwibg)',ic:'var(--scan-dwibg)',core:'var(--scan-dwi)',blood:'var(--scan-hypo)',oed:'var(--scan-dwibg)',line:'none'};
  return {bg:null,bone:'var(--skull)',bone2:'var(--bone)',csf:'var(--csf)',vent:'var(--ventricle)',gm:'var(--gm)',wm:'var(--wm)',deep:'var(--gm)',deep2:'var(--brain)',ic:'var(--wm)',core:'var(--core)',blood:'var(--blood)',oed:'var(--oedema)',line:'var(--brain-line)'}}
function axShell(id,C,o={}){const G=axGeom(),shift=o.shift||0;let g='';
  if(C.bg)g+=`<rect x="0" y="0" width="240" height="300" rx="10" style="fill:${C.bg}"/>`;
  g+=`<ellipse cx="120" cy="150" rx="110" ry="140" style="fill:${C.bone}${C.line!=='none'?';stroke:var(--bone);stroke-width:1':''}"/>`;
  if(C.line!=='none')g+=`<ellipse cx="120" cy="150" rx="106.5" ry="136.5" style="fill:none;stroke:var(--bone);stroke-width:1.2;stroke-dasharray:1.5 2.5"/>`;
  g+=`<ellipse cx="120" cy="150" rx="103" ry="133" style="fill:${C.csf}"/>`;
  [G.L,G.R].forEach(H=>{g+=`<path d="${H.o}" style="fill:${C.gm}${C.line!=='none'?`;stroke:${C.line};stroke-width:.9;stroke-linejoin:round`:''}"/><path d="${H.w}" style="fill:${C.wm}"/>`});
  return g}
function axDeep(C,o={}){const G=axGeom(),ivh=clamp(o.ivh||0);let g='';
  [0,1].forEach(i=>{g+=`<path d="${G.ic[i]}" style="fill:${C.ic}"/>`;
    g+=`<path d="${G.lent[i]}" style="fill:${C.deep}${C.line!=='none'?`;stroke:${C.line};stroke-width:.7`:''}"/><path d="${G.gp[i]}" style="fill:${C.deep2};opacity:.75"/>`;
    g+=`<path d="${G.thal[i]}" style="fill:${C.deep}${C.line!=='none'?`;stroke:${C.line};stroke-width:.7`:''}"/>`;
    g+=`<path d="${G.horn[i]}" style="fill:${C.vent}"/><path d="${G.caud[i]}" style="fill:${C.deep}${C.line!=='none'?`;stroke:${C.line};stroke-width:.7`:''}"/>`;
    g+=`<path d="${G.atr[i]}" style="fill:${C.vent}"/>`;
    g+=`<path d="${G.ins[i]}" style="fill:${C.gm}"/>`;
    if(ivh>0){g+=`<path d="${G.atr[i]}" style="fill:${C.blood};opacity:${f1(ivh)}"/><path d="${G.horn[i]}" style="fill:${C.blood};opacity:${f1(ivh*.7)}"/>`}});
  /* third ventricle and septum */
  g+=`<rect x="117.6" y="154" width="4.8" height="44" rx="2.4" style="fill:${ivh>.3?C.blood:C.vent}"/>`;
  return g}
function brainAxial(x,y,s=1,o={}){const mode=o.mode||'plain',C=axColors(mode),G=axGeom(),id=kid(o.id||'ax'),side=o.side||'L',sg=side==='L'?1:-1,hi=side==='L'?1:0,H=side==='L'?G.R:G.L,sft=-sg*(o.shift||0);
  const T=p=>[x+p[0]*s,y+p[1]*s];
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><defs><clipPath id="${id}a"><path d="${H.o}"/></clipPath><clipPath id="${id}m"><path d="${G.terr.mca[hi]}"/></clipPath><clipPath id="${id}L"><path d="${G.L.o}"/></clipPath><clipPath id="${id}R"><path d="${G.R.o}"/></clipPath></defs>`;
  g+=axShell(id,C,o);
  /* deep grey nuclei and ventricles shift together with the midline */
  g+=`<g${sft?` transform="translate(${f1(sft)} 0)"`:''}>${axDeep(C,o)}</g>`;
  if(sft){g+=`<path d="M120 22Q${f1(120+sft*1.15)} 150 120 278" style="fill:none;stroke:${C.csf};stroke-width:1.4"/>`}
  else g+=`<path d="M120 22V82M120 218V278" style="fill:none;stroke:${C.csf};stroke-width:1.6"/>`;
  /* territory washes */
  if(o.terr&&mode==='plain'){const te=o.terr,sd=te.side||'both',idx=sd==='both'?[0,1]:[te.side==='L'?1:0];
    idx.forEach(i=>{const cp=i?`${id}R`:`${id}L`;g+=`<g clip-path="url(#${cp})">`;[['aca','--aca'],['mca','--mca'],['pca','--pca']].forEach(([k,c])=>{if(te[k])g+=`<path d="${G.terr[k][i]}" style="fill:var(${c});opacity:${f1(clamp(te[k])*.6)}"/>`});g+='</g>'})}
  /* core and penumbra, growing from the insula within the MCA territory of that hemisphere */
  const cx0=120+sg*72,cy0=148,sv=clamp(o.saved||0);
  if(o.penumbra||o.core){g+=`<g clip-path="url(#${id}a)"><g clip-path="url(#${id}m)">`;
    if(o.penumbra&&mode==='plain'){const d=blob(cx0,cy0,clamp(o.penumbra)*118,6,{n:16,rough:.09,sq:1.08});
      g+=`<path d="${d}" style="fill:var(--penumbra);opacity:${f1(.75*(1-sv))}"/>`;if(sv>0)g+=`<path d="${d}" style="fill:var(--salvage);opacity:${f1(.75*sv)}"/>`}
    if(o.core)g+=`<path d="${blob(cx0,cy0,clamp(o.core)*118,11,{n:14,rough:.13,sq:1.08})}" style="fill:${C.core};opacity:${mode==='plain'?.92:mode==='ct'?.85:1}"/>`;
    g+='</g></g>'}
  /* a bleed */
  let bAt=null;
  if(o.bleed){const B=o.bleed,bx=B.x==null?120+sg*50:B.x,by=B.y==null?152:B.y,br=B.r==null?22:B.r;bAt=[bx,by];
    if(B.oedema)g+=`<path d="${blob(bx,by,br*(1.2+.55*clamp(B.oedema)),3,{n:14,rough:.1})}" style="fill:${C.oed};opacity:${mode==='plain'?.8:.85}"/>`;
    g+=`<path d="${blob(bx,by,br,8,{n:14,rough:.14})}" style="fill:${C.blood}${mode==='plain'?';stroke:var(--artery-line);stroke-width:1':''}"/>`}
  /* subarachnoid blood */
  if(o.sah){const a=clamp(o.sah);let d='M120 22V84M120 218V276',d2='';
    [[-1,0],[1,1]].forEach(([q,sd])=>{const base=120;/* the Sylvian cleft, then blood lying in the surface sulci */
      d+=ptsD([axPt(94,axR(94,sd)-1,q),axPt(92,axBase(92)*.86,q)]);
      let last=9;for(let p=10;p<172;p+=1){const b=axBump(p,sd);if(b<-.42&&p-last>7){last=p;const r=axR(p,sd);d2+=ptsD([axPt(p,r+2,q),axPt(p,r-6,q)])}}});
    g+=`<g style="fill:none;stroke:${C.blood};stroke-linecap:round;opacity:${f1(a)}"><path d="${d}" style="stroke-width:4"/><path d="${d2}" style="stroke-width:3"/></g>`}
  g+='</g>';
  const at={core:T([cx0,cy0]),caudate:T([120+sg*22,128]),lentiform:T([120+sg*52,152]),capsule:T([120+sg*26,150]),thalamus:T([120+sg*17,182]),hornL:T([120+14,112]),hornR:T([120-14,112]),third:T([120+sft,176]),insula:T([120+sg*78,150]),midline:T([120+sft,150])};
  if(bAt)at.bleed=T(bAt);
  if(o.labels){const lab=(dx,yy,t,a)=>{const p=T([120-dx,yy]);g+=kitLabel(p[0],p[1],t,{a:a||'m',halo:mode==='plain'?'var(--panel)':'var(--scan-bg)'})};
    lab(16,88,'frontal horn');lab(25,134,'caudate');lab(50,158,'lentiform');lab(18,184,'thalamus');lab(84,150,'insula','m');lab(62,112,'internal capsule');const a0=T([96,116]),a1=T([90,134]);g+=`<path d="M${f1(a0[0])} ${f1(a0[1])}L${f1(a1[0])} ${f1(a1[1])}" style="stroke:var(--ink);stroke-width:1"/>`}
  if(o.orient){const hl=mode==='plain'?'var(--panel)':'var(--scan-bg)',a=T([12,18]),b=T([228,18]);g+=kitLabel(a[0],a[1],'R',{a:'m',halo:hl})+kitLabel(b[0],b[1],'L',{a:'m',halo:hl})}
  return {svg:g,at,w:240*s,h:300*s}}

/* ---- aspects ---- */
const ASP_NAMES={C:'caudate',IC:'internal capsule',L:'lentiform',I:'insula',M1:'anterior MCA cortex',M2:'lateral MCA cortex',M3:'posterior MCA cortex',M4:'anterior MCA, upper level',M5:'lateral MCA, upper level',M6:'posterior MCA, upper level'};
function aspSector(a0,a1,in0,in1,seed,sg){const P=[];for(let p=a0;p<=a1;p+=1.5){P.push(axPt(p,axBase(p)-.8+1.6*axBump(p,seed)-axBase(p)*.07*Math.exp(-Math.pow((p-94)/2.6,2)),sg))}
  const N=[];for(let p=a1;p>=a0;p-=4){const u=(p-a0)/(a1-a0),f=lerp(in0,in1,u)*(1-.0*u);N.push(axPt(p,axBase(p)*f,sg))}return P.concat(N)}
const ASP_LAB={C:[24,130],IC:[34,178],L:[56,152],I:[77,136]};
let _ASP=null;
function aspGeom(side){_ASP=_ASP||{};if(_ASP[side])return _ASP[side];const sg=side==='L'?1:-1,seed=side==='L'?1:0;const dense=P=>crPts(axM(sg,P),true,4);
  const r={C:dense(AX_CAUD),L:dense(AX_LENT),IC:axM(sg,[[38,119],[29,136],[24,147],[17,150],[24,157],[33,172],[37,192],[45,184],[38,170],[29,154],[31,140],[38,121]]),I:dense(AX_INS),
    M1:aspSector(34,76,.62,.86,seed,sg),M2:aspSector(76,112,.88,.88,seed,sg),M3:aspSector(112,150,.86,.62,seed,sg),
    M4:aspSector(30,74,.5,.5,seed,sg),M5:aspSector(74,112,.5,.5,seed,sg),M6:aspSector(112,152,.5,.5,seed,sg)};
  return _ASP[side]=r}
function aspects(x,y,s=1,o={}){const side=o.side||'L',mode=o.mode||'plain',C=axColors(mode),G=axGeom(),col=o.layout==='col',gap=col?20:20,R=aspGeom(side);
  const mk=o.marked instanceof Set?o.marked:new Set(o.marked||[]),X2=col?x:x+(240+gap)*s,Y2=col?y+(300+gap)*s:y,regions={},ids=['C','IC','L','I','M1','M2','M3','M4','M5','M6'],lower=new Set(['M4','M5','M6']);
  const pl=(ox,oy,P)=>P.map(p=>[ox+p[0]*s,oy+p[1]*s]);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${axShell('',C)}${axDeep(C)}<path d="M120 22V82M120 218V278" style="fill:none;stroke:${C.csf};stroke-width:1.6"/></g>`;
  g+=`<g transform="translate(${f1(X2)} ${f1(Y2)}) scale(${s})">${axShell('',C)}`;
  [-1,1].forEach(q=>{g+=`<path d="${smoothPath(axM(q,[[2.5,112],[10,106],[18,118],[20,150],[17,186],[10,198],[2.5,192],[6,150]]))}" style="fill:${C.vent}"/>`});
  g+=`<path d="M120 22V100M120 200V278" style="fill:none;stroke:${C.csf};stroke-width:1.6"/></g>`;
  const lab=[];
  ids.forEach(k=>{const up=lower.has(k),P=pl(up?X2:x,up?Y2:y,R[k]),d=ptsD(P)+'Z',on=mk.has(k),hl=o.hl===k;let cx=0,cy=0;P.forEach(p=>{cx+=p[0];cy+=p[1]});cx/=P.length;cy/=P.length;
    regions[k]={id:k,name:ASP_NAMES[k],d,pts:P,c:[cx,cy]};
    const attrs=o.clickable?` class="clk" tabindex="0" role="button" data-asp="${k}" aria-pressed="${on}" aria-label="${k}: ${ASP_NAMES[k]}"`:'';
    g+=`<path d="${d}"${attrs} style="fill:${on?'var(--core)':'var(--accent-soft)'};fill-opacity:${on?.82:.42};stroke:${hl?'var(--ink)':'var(--accent)'};stroke-width:${hl?2.2:1.2};stroke-linejoin:round"/>`;
    if(o.labels!==false){const lp=ASP_LAB[k],sg=side==='L'?1:-1,lx=lp?(up?X2:x)+(120+sg*lp[0])*s:cx,ly=lp?(up?Y2:y)+lp[1]*s:cy;lab.push(kitLabel(lx,ly+3.4,k,{a:'m'}))}});
  /* labels go on last and take no clicks */
  g+=`<g style="pointer-events:none">${lab.join('')}</g>`;
  g+=`<g>${kitLabel(x+120*s,y+(300*s)+14,'ganglionic level',{a:'m'})}${kitLabel(X2+120*s,Y2+(300*s)+14,'supraganglionic level',{a:'m'})}</g>`;
  return {svg:g,regions,ids,w:col?240*s:(480+gap)*s,h:(col?(620+gap*.5):316)*s}}

/* ---- clot ---- */
function clot(x,y,s=20,o={}){const seed=o.seed||2,rr=rng(seed),L=s/2,H=s*.34,white=o.kind==='white',P=[];
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2,k=1+(rr()-.5)*.34;P.push([Math.cos(a)*L*k,Math.sin(a)*H*k])}
  const d=smoothPath(P);let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})" style="opacity:${o.op==null?1:f1(o.op)}"><path d="${d}" style="fill:${white?'var(--plaque)':'var(--clot)'};stroke:var(--artery-line);stroke-width:${f1(Math.max(.7,s*.03))}"/>`;
  if(s>=14){const n=s>=26?7:4;for(let i=0;i<n;i++){const px=(rr()-.5)*L*1.35,py=(rr()-.5)*H*1.1,rx=Math.max(1.1,s*.055);g+=`<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="${f1(rx)}" ry="${f1(rx*.62)}" transform="rotate(${f1(rr()*180)} ${f1(px)} ${f1(py)})" style="fill:${white?'var(--blood)':'var(--blood)'};opacity:${white?.45:.85}"/>`}
    let m='';for(let i=0;i<(s>=26?6:3);i++){const a=(rr()-.5)*L*1.5,b=(rr()-.5)*H*1.3,c=(rr()-.5)*L*1.5,e=(rr()-.5)*H*1.3;m+=`M${f1(a)} ${f1(b)}L${f1(c)} ${f1(e)}`}
    g+=`<path d="${m}" style="fill:none;stroke:var(--artery-line);stroke-width:${f1(Math.max(.5,s*.018))};opacity:.75"/>`}
  return g+'</g>'}

/* ---- willis: local 300 x 262 ---- */
const WL=(()=>{const seg={};const add=(n,w,P,mirror=true)=>{if(mirror){seg[n+'-R']={w,P};seg[n+'-L']={w,P:P.map(p=>[300-p[0],p[1]])}}else seg[n]={w,P}};
  add('VA',4.2,[[126,258],[136,240],[148,224]]);
  add('ICA',5.6,[[90,134],[99,112],[108,90]]);
  add('M1',4.6,[[108,90],[84,84],[56,82],[30,72]]);
  add('A1',3.2,[[108,90],[124,76],[140,66]]);
  add('A2',3.2,[[140,66],[138,42],[134,12]]);
  add('PCom',2.2,[[108,90],[112,116],[122,146]]);
  add('P1',3,[[150,164],[136,154],[122,146]]);
  add('P2',3,[[122,146],[96,158],[72,170],[46,174]]);
  add('ACom',2.6,[[140,66],[160,66]],false);
  add('basilar',5,[[150,224],[150,194],[150,164]],false);
  return seg})();
const WL_MINOR=[[[150,172],[128,172],[108,180]],[[150,172],[172,172],[192,180]],[[150,204],[128,206],[106,212]],[[150,204],[172,206],[194,212]],[[30,72],[16,58]],[[30,72],[12,80]],[[270,72],[284,58]],[[270,72],[288,80]]];
const WL_LAB={'VA-R':[116,250,'e','VA'],'VA-L':[184,250,'s','VA'],'basilar':[158,200,'s','basilar'],'P1-R':[136,142,'m','P1'],'P1-L':[164,142,'m','P1'],'P2-R':[80,178,'m','P2'],'P2-L':[220,178,'m','P2'],'PCom-R':[120,116,'s','PCom'],'PCom-L':[180,116,'e','PCom'],'ICA-R':[88,136,'e','ICA'],'ICA-L':[212,136,'s','ICA'],'M1-R':[70,76,'m','M1'],'M1-L':[230,76,'m','M1'],'A1-R':[116,72,'e','A1'],'A1-L':[184,72,'s','A1'],'ACom':[150,58,'m','ACom'],'A2-R':[128,30,'e','A2'],'A2-L':[172,30,'s','A2']};
function willis(x,y,s=1,o={}){const bl=o.block||{},dm=o.dim||{},flow=clamp(o.flow||0),ph=o.ph||0,rv=o.rev||{},hl=new Set(o.hl||[]),T=p=>[x+p[0]*s,y+p[1]*s],at={},pts={};
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})" style="fill:none;stroke-linecap:round;stroke-linejoin:round">`;
  if(o.minor!==false)WL_MINOR.forEach(P=>{const d=smoothPath(P,false);g+=`<path d="${d}" style="stroke:var(--artery-line);stroke-width:2.2;opacity:.75"/><path d="${d}" style="stroke:var(--artery);stroke-width:1.2;opacity:.8"/>`});
  const names=Object.keys(WL);
  names.forEach(n=>{const k=WL[n];if(hl.has(n))g+=`<path d="${smoothPath(k.P,false)}" style="stroke:var(--accent);stroke-width:${f1(k.w+6)};opacity:.45"/>`});
  names.forEach(n=>{const k=WL[n],d=smoothPath(k.P,false),b=clamp(bl[n]||0),pale=Math.max(b,clamp(dm[n]||0));
    g+=`<path d="${d}" style="stroke:var(--artery-line);stroke-width:${f1(k.w+1.5)};opacity:${f1(1-pale*.55)}"/><path d="${d}" style="stroke:var(--artery);stroke-width:${f1(k.w)};opacity:${f1(1-pale*.78)}"/>`;
    if(flow>0&&pale<.9){const D=rv[n]?1:-1,dash=Math.max(3,k.w*1.4);g+=`<path d="${d}" style="stroke:var(--wm);stroke-width:${f1(Math.max(.9,k.w*.38))};stroke-dasharray:${f1(dash)} ${f1(dash*2.4)};stroke-dashoffset:${f1(D*ph*60)};opacity:${f1(flow*(1-pale)*.95)}"/>`}});
  g+='</g>';
  names.forEach(n=>{const k=WL[n],m=crPts(k.P,false,4),c=m[Math.floor(m.length/2)];at[n]=T(c);pts[n]=k.P.map(T);
    if(bl[n]>.02){const b=clamp(bl[n]);g+=clot(at[n][0],at[n][1],Math.max(9,(k.w*2.6+5)*s*b),{seed:3,ang:Math.atan2(k.P[k.P.length-1][1]-k.P[0][1],k.P[k.P.length-1][0]-k.P[0][0])*180/Math.PI})}});
  /* the ICA arrives from below the page: an end-on ring where it surfaces */
  [[108,90],[192,90]].forEach(p=>{const q=T(p);g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(3.6*s)}" style="fill:var(--artery);stroke:var(--artery-line);stroke-width:1"/>`});
  if(o.labels)Object.keys(WL_LAB).forEach(n=>{const [lx,ly,a,t]=WL_LAB[n],q=T([lx,ly]);g+=kitLabel(q[0],q[1],t,{a:a==='s'?'':a})});
  return {svg:g,at,pts,w:300*s,h:262*s}}

/* ---- artery: a longitudinal cut ---- */
function artery(x,y,w,o={}){const h=o.h||46,wt=Math.max(4,h*.14),lt=y+wt,lb=y+h-wt,lh=lb-lt,cy=(lt+lb)/2,flow=clamp(o.flow==null?1:o.flow),ph=o.ph||0,cl=clamp(o.clot||0),ly=clamp(o.lysis||0),cAt=o.at==null?.58:o.at,pq=clamp(o.plaque||0),pAt=o.plaqueAt==null?.5:o.plaqueAt,rp=clamp(o.rupture||0),rAt=o.ruptureAt==null?.5:o.ruptureAt,rr=rng(o.seed||17),id=kid('ar');
  const cx=x+w*cAt,cEff=cl*(1-ly),clotLen=lh*(1.25+.5*cl),block=cEff,px=x+w*pAt,rx=x+w*rAt,gap=rp>0?lh*.32*rp:0;
  let g=`<defs><clipPath id="${id}"><rect x="${f1(x)}" y="${f1(lt)}" width="${f1(w)}" height="${f1(lh)}"/></clipPath></defs>`;
  /* lumen: plasma tint */
  g+=`<rect x="${f1(x)}" y="${f1(lt)}" width="${f1(w)}" height="${f1(lh)}" style="fill:var(--blood);opacity:.13"/><g clip-path="url(#${id})">`;
  /* red cells: stop behind a clot, thin out beyond it */
  const n=Math.max(8,Math.round(w/(lh*.55))),sp=(flow*(1-block*block))*1;
  for(let i=0;i<n;i++){const j=rr(),lane=lt+lh*(.14+.72*rr()),rot=rr()*50-25,u=((i/n+j*.04+ph*sp*.5)%1+1)%1;let cxx=x+u*(w+20)-10;
    let op=.85;if(cl>0&&cEff>.02){const ge=cx-clotLen/2-5;if(cxx>cx-clotLen/2-3){if(cEff>=.97&&cxx<cx+clotLen/2){cxx=ge-(cxx-ge)*.28;op=.9}else if(cEff>=.97){op=0}else{const lane2=lane;op=.85*(1-cEff)}}
      if(cEff>.6&&cxx<ge){cxx=lerp(cxx,ge-(ge-cxx)*.62,cEff)}}
    if(o.stopAt!=null&&cxx>o.stopAt)op*=clamp(o.pass||0);
    const cr=Math.max(2.6,lh*.15);if(op>.01)g+=`<g transform="translate(${f1(cxx)} ${f1(lane)}) rotate(${f1(rot)})" style="opacity:${f1(op)}"><ellipse rx="${f1(cr)}" ry="${f1(cr*.62)}" style="fill:var(--blood)"/><ellipse rx="${f1(cr*.42)}" ry="${f1(cr*.26)}" style="fill:var(--artery-line);opacity:.5"/></g>`}
  /* plaque on the lower wall */
  if(pq>0){const ph2=lh*.82*pq,pw=lh*(1.1+pq);g+=`<path d="M${f1(px-pw)} ${f1(lb+.5)}C${f1(px-pw*.5)} ${f1(lb)} ${f1(px-pw*.42)} ${f1(lb-ph2)} ${f1(px)} ${f1(lb-ph2)}C${f1(px+pw*.42)} ${f1(lb-ph2)} ${f1(px+pw*.5)} ${f1(lb)} ${f1(px+pw)} ${f1(lb+.5)}Z" style="fill:var(--plaque);stroke:var(--artery-line);stroke-width:1"/>`}
  /* clot, from the lower wall up to full occlusion */
  if(cl>0){const vis=Math.max(.15,1-ly),ht=lh*Math.max(cl,.12)*(1-ly*.75),top=cl>=.95&&ly<.05?lt:lb-ht,len=clotLen*vis,P=[];
    for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const kk=1+(rng(i+9)()-.5)*.22;P.push([cx+Math.cos(a)*len*.5*kk,(top+lb)/2+Math.sin(a)*(lb-top)*.56*kk])}
    g+=`<path d="${smoothPath(P)}" style="fill:var(--clot);stroke:var(--artery-line);stroke-width:1"/>`;
    const R2=rng(21);for(let i=0;i<6;i++){const qx=cx+(R2()-.5)*len*.7,qy=lerp(top,lb,.2+R2()*.6);g+=`<ellipse cx="${f1(qx)}" cy="${f1(qy)}" rx="${f1(lh*.09)}" ry="${f1(lh*.055)}" transform="rotate(${f1(R2()*160)} ${f1(qx)} ${f1(qy)})" style="fill:var(--blood);opacity:.85"/>`}
    /* lysis: drug particles arrive from upstream, fragments leave downstream */
    if(ly>0){const R3=rng(33);for(let i=0;i<10;i++){const u=((i/10+ph*.6)%1+1)%1,qx=lerp(cx-len*.5-lh*2.4,cx-len*.42,u),qy=lt+lh*(.15+.7*R3());g+=`<rect x="${f1(qx-2.4)}" y="${f1(qy-2.4)}" width="4.8" height="4.8" transform="rotate(45 ${f1(qx)} ${f1(qy)})" style="fill:var(--tpa);opacity:${f1(Math.min(1,ly*3)*(.4+.6*u))}"/>`}
      const R4=rng(44);for(let i=0;i<8;i++){const u=((i/8+ph*.8+R4()*.2)%1+1)%1,qx=cx+len*.3+u*(x+w-cx-len*.3),qy=lt+lh*(.2+.6*R4());g+=`<circle cx="${f1(qx)}" cy="${f1(qy)}" r="${f1(Math.max(1,lh*.05*(1-u*.5)))}" style="fill:var(--clot);opacity:${f1(ly*(1-u*.7))}"/>`}}}
  g+='</g>';
  /* the wall: outer layer and a paler inner lining; a tear leaves a gap in the top */
  const wall=(x0,x1,yy,up)=>`<rect x="${f1(x0)}" y="${f1(yy)}" width="${f1(x1-x0)}" height="${f1(wt)}" style="fill:var(--artery);opacity:.9"/><line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(up?yy:yy+wt)}" y2="${f1(up?yy:yy+wt)}" style="stroke:var(--artery-line);stroke-width:1.2"/><line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(up?yy+wt-.6:yy+.6)}" y2="${f1(up?yy+wt-.6:yy+.6)}" style="stroke:var(--wm);stroke-width:1.1;opacity:.75"/>`;
  if(rp>0)g+=wall(x,rx-gap,y,true)+wall(rx+gap,x+w,y,true);else g+=wall(x,x+w,y,true);
  g+=wall(x,x+w,lb,false);
  if(rp>0){const reach=lh*(.5+1.5*rp),R5=rng(55),pr=lh*(.35+.75*rp);
    g+=`<path d="${blob(rx,y-reach,pr,12,{n:14,rough:.2,sq:.72})}" style="fill:var(--blood);opacity:${f1(.3+.25*rp)}"/>`;
    g+=`<path d="M${f1(rx-gap)} ${f1(lt)}C${f1(rx-gap*.5)} ${f1(y-reach*.3)} ${f1(rx-gap*.9)} ${f1(y-reach*.7)} ${f1(rx-gap*1.5)} ${f1(y-reach)}L${f1(rx+gap*1.5)} ${f1(y-reach)}C${f1(rx+gap*.9)} ${f1(y-reach*.7)} ${f1(rx+gap*.5)} ${f1(y-reach*.3)} ${f1(rx+gap)} ${f1(lt)}Z" style="fill:var(--blood);opacity:${f1(.7+.25*rp)}"/>`;
    for(let i=0;i<9;i++){const u=((i/9+ph)%1+1)%1,sx=rx+(R5()-.5)*(gap*2+pr*1.5*u),sy=lt-u*(reach+pr*.5);g+=`<circle cx="${f1(sx)}" cy="${f1(sy)}" r="${f1(1.1+lh*.035)}" style="fill:var(--blood);opacity:${f1((1-u)*rp+.1)}"/>`}}
  if(o.labels){g+=kitLabel(x+4,y-4,'artery wall')+kitLabel(x+w-4,cy+3,'blood flow',{a:'e'})}
  return {svg:g,at:{clot:[cx,cy],plaque:[px,lb],rupture:[rx,y],top:y,bot:y+h,mid:cy},lumenTop:lt,lumenBot:lb}}

/* ---- aneurysm: local 200 x 190 ---- */
function aneurysm(x,y,s=1,o={}){const rp=clamp(o.rupture||0),co=clamp(o.coil||0),cp=clamp(o.clip||0),flow=clamp(o.flow||0),ph=o.ph||0,T=p=>[x+p[0]*s,y+p[1]*s],id=kid('an');
  const vd='M100 190C100 160 100 140 100 118C84 100 52 92 8 88M100 118C116 100 148 92 192 88';
  const sac='M91.5 104C78 94 66 76 70 56C73 40 84 30 94 32C96 24 106 21 110 28C122 31 133 42 134 58C136 78 122 96 108.5 104Z';
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><defs><clipPath id="${id}"><path d="${sac}"/></clipPath></defs>`;
  if(rp>0){g+=`<path d="${blob(103,8,10+44*rp,7,{n:18,rough:.2,sq:.62})}" style="fill:var(--blood);opacity:${f1(.28+.32*rp)}"/>`}
  g+=`<path d="${vd}" style="fill:none;stroke:var(--artery-line);stroke-width:21;stroke-linecap:butt;stroke-linejoin:round"/><path d="${sac}" style="fill:var(--artery-line)"/>`;
  g+=`<path d="${vd}" style="fill:none;stroke:var(--artery);stroke-width:18;stroke-linecap:butt;stroke-linejoin:round"/>`;
  g+=`<path d="${sac}" style="fill:var(--artery);stroke:var(--artery-line);stroke-width:1.4;opacity:${f1((1-co*.7)*(1-cp*.55))}"/>`;
  /* a thin wall, a bleb on the dome */
  g+=`<path d="M94 32C96 24 106 21 110 28" style="fill:none;stroke:var(--wm);stroke-width:1.2;opacity:.8"/><path d="M78 74C75 62 79 50 88 42" style="fill:none;stroke:var(--wm);stroke-width:1.6;opacity:.45;stroke-linecap:round"/>`;
  if(flow>0){const a=-ph*60;g+=`<path d="${vd}" style="fill:none;stroke:var(--wm);stroke-width:2.4;stroke-dasharray:6 14;stroke-dashoffset:${f1(a)};opacity:${f1(flow*.85)}"/>`}
  /* coil: a tangle of wire that lengthens with o.coil */
  if(co>0){const R=rng(12);let P=[[101,102]];const N=Math.round(70*co);for(let i=0;i<N;i++){const a=R()*6.283,rr=Math.sqrt(R())*29;P.push([101+Math.cos(a)*rr*.98,64+Math.sin(a)*rr*1.14])}
    g+=`<g clip-path="url(#${id})"><path d="${smoothPath(P,false)}" style="fill:none;stroke:var(--device);stroke-width:1.5;stroke-linejoin:round"/></g>`;
    g+=`<path d="M100 190V104" style="fill:none;stroke:var(--device);stroke-width:2.6;opacity:${f1(1-ramp(co,.85,1))}"/>`}
  /* clip: two blades close across the neck, from the upper right */
  if(cp>0){const off=(1-cp)*11;g+=`<g style="fill:var(--device);stroke:var(--ink);stroke-width:.8;stroke-linejoin:round"><path d="M76 ${f1(90-off)}H134L150 ${f1(72-off)}L156 ${f1(76-off)}L138 ${f1(95-off)}H76Z"/><path d="M76 ${f1(97+off)}H138L156 ${f1(114+off)}L150 ${f1(118+off)}L134 ${f1(102+off)}H76Z"/></g>`}
  /* rupture jet */
  if(rp>0){const R=rng(8),top=24-34*rp;g+=`<path d="M100 28C100 ${f1(top+14)} 96 ${f1(top+6)} 93 ${f1(top)}H113C110 ${f1(top+6)} 108 ${f1(top+14)} 108 28Z" style="fill:var(--blood);opacity:${f1(.72+.28*rp)}"/>`;
    for(let i=0;i<9;i++){const u=((i/9+ph)%1+1)%1,q=[104+(R()-.5)*(10+70*u),24-u*46*rp];g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="1.6" style="fill:var(--blood);opacity:${f1(rp*(1-u*.8))}"/>`}}
  g+='</g>';
  if(o.labels){const a=T([140,50]),b=T([146,110]),c=T([108,160]);g+=kitLabel(a[0],a[1],'sac')+kitLabel(b[0],b[1]+10,'neck')+kitLabel(c[0],c[1],'parent artery')}
  return {svg:g,at:{sac:T([101,64]),neck:T([100,106]),parent:T([100,160]),dome:T([102,28]),left:T([14,88]),right:T([186,88])}}}

/* ---- neuron ---- */
function neuron(x,y,r=12,o={}){const st=o.state||'alive',seed=o.seed||6,rr=rng(seed),ca=clamp(o.ca||0),glu=clamp(o.glu||0),ax=o.axon==null?r*5:o.axon,op=o.op==null?1:o.op,ang=o.ang||0,dead=st==='dead',str=st==='stressed';
  const R=r*(str?1.18:dead?.72:1),col=dead?'var(--core)':str?'var(--penumbra)':'var(--neuron)';let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})" style="opacity:${f1(op)}">`;
  /* dendrites */
  const nd=6;let den='',bead='';for(let i=0;i<nd;i++){const a=Math.PI*.42+i/(nd-1)*Math.PI*1.16+(rr()-.5)*.2;
    const L=r*(1.7+rr()*.9),e=[Math.cos(a)*(R*.8+L),Math.sin(a)*(R*.8+L)],m=[Math.cos(a+.12)*(R*.8+L*.5),Math.sin(a+.12)*(R*.8+L*.5)],s0=[Math.cos(a)*R*.85,Math.sin(a)*R*.85];
    const brk=dead?.45:1;den+=`M${f1(s0[0])} ${f1(s0[1])}L${f1(lerp(s0[0],m[0],brk*1.6>1?1:brk*1.6))} ${f1(lerp(s0[1],m[1],brk*1.6>1?1:brk*1.6))}`;
    if(!dead){den+=`M${f1(m[0])} ${f1(m[1])}L${f1(e[0])} ${f1(e[1])}`;const a2=a+.5*(rr()<.5?-1:1),e2=[m[0]+Math.cos(a2)*L*.5,m[1]+Math.sin(a2)*L*.5];den+=`M${f1(m[0])} ${f1(m[1])}L${f1(e2[0])} ${f1(e2[1])}`;
      if(str)[.3,.6,.9].forEach(u=>{bead+=`<circle cx="${f1(lerp(m[0],e[0],u))}" cy="${f1(lerp(m[1],e[1],u))}" r="${f1(Math.max(1,r*.11))}"/>`})}
    else{const p=[lerp(m[0],e[0],.5),lerp(m[1],e[1],.5)];bead+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(Math.max(.9,r*.09))}"/>`}}
  g+=`<path d="${den}" style="fill:none;stroke:${col};stroke-width:${f1(Math.max(1,r*.15))};stroke-linecap:round;opacity:${dead?.7:1}"/><g style="fill:${col}">${bead}</g>`;
  /* axon */
  if(ax>0){const end=dead?ax*.42:ax;g+=`<path d="M${f1(R*.8)} 0C${f1(R+end*.3)} ${f1(-r*.4)} ${f1(R+end*.6)} ${f1(r*.4)} ${f1(R+end)} 0" style="fill:none;stroke:${col};stroke-width:${f1(Math.max(1.1,r*.19))};stroke-linecap:round"${dead?' stroke-dasharray="4 4"':''}/>`;
    if(!dead){g+=`<g style="stroke:var(--panel);stroke-width:.6">`;}
    if(!dead){for(let k=0;k<3;k++){g+=`<ellipse cx="${f1(R+end*(.25+k*.26))}" cy="${f1(r*.12*(k===1?1:-.4))}" rx="${f1(Math.max(2.6,end*.09))}" ry="${f1(Math.max(1.5,r*.2))}" style="fill:var(--glia)"/>`}g+='</g>'}}
  /* soma and nucleus */
  const body=dead?blob(0,0,R,seed,{n:9,rough:.28}):`M${f1(-R)} 0A${f1(R)} ${f1(R)} 0 1 1 ${f1(R)} 0A${f1(R)} ${f1(R)} 0 1 1 ${f1(-R)} 0Z`;
  g+=`<path d="${body}" style="fill:${col};stroke:var(--panel);stroke-width:${f1(Math.max(.7,r*.07))}"/><circle r="${f1(R*(dead?.34:.4))}" style="fill:${dead?'var(--clot)':'var(--wm)'};opacity:${dead?1:.85}"/>`;
  if(ca>0){const n=Math.round(ca*9);for(let i=0;i<n;i++){const a=rr()*6.28,d=R*(.5+rr()*.38);g+=`<circle cx="${f1(Math.cos(a)*d)}" cy="${f1(Math.sin(a)*d)}" r="${f1(Math.max(1,r*.1))}" style="fill:var(--ca);stroke:var(--panel);stroke-width:.4"/>`}}
  if(glu>0){const n=Math.round(glu*12);for(let i=0;i<n;i++){const a=rr()*6.28,d=R*(1.5+rr()*1.3);g+=`<circle cx="${f1(Math.cos(a)*d)}" cy="${f1(Math.sin(a)*d)}" r="${f1(Math.max(1,r*.09))}" style="fill:var(--glu)"/>`}}
  return g+'</g>'}

/* ---- heartAF: local 200 x 220 ---- */
function heartAF(x,y,s=1,o={}){const af=clamp(o.af||0),ph=o.ph||0,th=clamp(o.thrombus||0),em=o.embolus==null?0:clamp(o.embolus),T=p=>[x+p[0]*s,y+p[1]*s],id=kid('hf');
  const q=(i,k=1)=>af*k*Math.sin(ph*80+i*2.1)*1.5;
  /* left atrium with its appendage, quivering */
  const LA=[[92,56+q(1)],[112,46+q(2)],[134,46+q(3)],[150,54+q(4)],[160,50+q(5)],[174,40+q(6)],[188,42+q(7)],[192,54+q(8)],[182,64+q(9)],[170,72+q(1)],[160,84+q(2)],[138,94+q(3)],[110,92+q(4)],[94,78+q(5)]];
  const RA=[[34,84+q(6)],[48,66+q(7)],[70,62+q(8)],[86,74+q(9)],[92,100+q(1)],[82,128+q(2)],[60,138+q(3)],[40,126+q(4)],[30,106+q(5)]];
  const VENT=[[54,122],[84,104],[120,94],[152,88],[170,106],[176,138],[166,170],[148,198],[128,212],[104,198],[78,172],[60,146]];
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><defs><clipPath id="${id}"><path d="${smoothPath(VENT)}"/></clipPath></defs>`;
  /* great vessels */
  g+=`<path d="M66 70V8" style="fill:none;stroke:var(--artery-line);stroke-width:19;stroke-linecap:butt;opacity:.35"/><path d="M66 70V8" style="fill:none;stroke:var(--vein);stroke-width:17;stroke-linecap:butt"/>`;
  g+=`<path d="M104 96C100 62 96 34 112 22C124 14 142 18 150 34" style="fill:none;stroke:var(--artery-line);stroke-width:24"/><path d="M104 96C100 62 96 34 112 22C124 14 142 18 150 34" style="fill:none;stroke:var(--artery);stroke-width:21"/>`;
  g+=`<path d="M112 22L104 0M124 17L124 0M138 20L146 2" style="fill:none;stroke:var(--artery);stroke-width:7"/>`;
  g+=`<path d="M126 96C130 74 138 66 158 62" style="fill:none;stroke:var(--vein);stroke-width:15;opacity:.85"/>`;
  g+=`<path d="${smoothPath(RA)}" style="fill:var(--heart);stroke:var(--artery-line);stroke-width:1.3"/>`;
  g+=`<path d="${smoothPath(LA)}" style="fill:var(--heart);stroke:var(--artery-line);stroke-width:1.3"/>`;
  g+=`<path d="${smoothPath(VENT)}" style="fill:var(--heart);stroke:var(--artery-line);stroke-width:1.5"/>`;
  g+=`<g clip-path="url(#${id})"><path d="M118 92C128 118 126 160 118 214" style="fill:none;stroke:var(--artery-line);stroke-width:2;opacity:.8"/><path d="M118 92C128 118 126 160 118 214" style="fill:none;stroke:var(--wm);stroke-width:7;opacity:.14"/><path d="M60 142C80 134 104 120 120 96" style="fill:none;stroke:var(--artery-line);stroke-width:1.2;opacity:.55"/></g>`;
  /* the opened left atrium and appendage, blood inside */
  const IN=[[108,62+q(2,.6)],[132,58+q(3,.6)],[150,64+q(4,.6)],[162,58+q(5,.6)],[176,50+q(6,.6)],[184,54+q(7,.6)],[178,62+q(8,.6)],[164,70+q(9,.6)],[150,80+q(1,.6)],[128,84+q(2,.6)],[108,78+q(3,.6)]];
  g+=`<path d="${smoothPath(IN)}" style="fill:var(--blood);opacity:.72"/>`;
  if(th>0){const c=[172,56+q(6,.6)];g+=`<g transform="translate(${f1(lerp(180,170,th))} ${f1(c[1])}) rotate(-28)"><path d="${blob(0,0,4+10*th,6,{n:10,rough:.16,sq:.72})}" style="fill:var(--clot);stroke:var(--artery-line);stroke-width:1"/></g>`}
  /* fibrillation: fine waves over the atria */
  if(af>0){let w='';[[46,84,42],[108,72,52]].forEach(([ax,ay,al],k)=>{let d=`M${ax} ${ay}`;for(let i=1;i<=14;i++){d+=`L${f1(ax+al*i/14)} ${f1(ay+Math.sin(ph*90+i*1.9+k)*3.6*af*(i%3?1:.5))}`}w+=d});
    g+=`<path d="${w}" style="fill:none;stroke:var(--wm);stroke-width:1.2;opacity:.85"/>`}
  /* an embolus leaves the appendage through the left ventricle and up the aorta */
  let eAt=null;if(em>0&&em<1){const P=crPts([[174,56],[132,70],[126,124],[122,150],[108,96],[100,50],[112,22],[104,-6]],false,8),i=Math.min(P.length-1,Math.floor(em*(P.length-1)));eAt=P[i];g+=`</g>`+clot(T(eAt)[0],T(eAt)[1],Math.max(8,12*s),{seed:3})+`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`}
  g+='</g>';
  if(o.labels){const a=T([184,36]),b=T([140,150]),c=T([44,110]),d=T([146,12]);g+=kitLabel(a[0],a[1],'appendage',{a:'m'})+kitLabel(b[0],b[1],'left ventricle',{a:'m'})+kitLabel(c[0],c[1],'right atrium',{a:'m'})+kitLabel(d[0]+6,d[1]+2,'aorta')}
  const at={laa:T([174,56]),la:T([130,70]),lv:T([140,150]),aorta:T([104,50]),exit:T([104,0])};if(eAt)at.embolus=T(eAt);
  return {svg:g,at}}

/* ---- carotidBif: local 170 x 250 ---- */
function carotidBif(x,y,s=1,o={}){const st=clamp(o.stenosis||0),flow=clamp(o.flow||0),ph=o.ph||0,T=p=>[x+p[0]*s,y+p[1]*s],id=kid('cb');
  const ICAc=crPts([[81,138],[74,108],[62,70],[53,32],[50,0]],false,8),ECAc=crPts([[95,138],[105,108],[122,70],[138,34],[148,0]],false,8),CCA=crPts([[85,250],[85,190],[85,136]],false,8);
  const width=(n,u)=>n==='i'?15+7*Math.exp(-Math.pow((u-.2)/.17,2)):n==='e'?11-1.5*u:21;
  const band=(C,n,inner=0,narrow=null)=>{const L=[],R=[];C.forEach((p,i)=>{const a=C[Math.max(0,i-1)],b=C[Math.min(C.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,nx=dy/l,ny=-dx/l,u=i/(C.length-1),hw=width(n,u)-inner;let rw=hw,lw=hw;if(narrow){const k=narrow(u);lw=hw-k}
      L.push([p[0]+nx*lw,p[1]+ny*lw]);R.push([p[0]-nx*rw,p[1]-ny*rw])});return {P:L.concat(R.slice().reverse()),L,R}};
  const wall=2.6;
  const nar=u=>st*2*(width('i',u)-wall)*.98*Math.exp(-Math.pow((u-.24)/.13,2));
  const bO=[band(CCA,'c'),band(ICAc,'i'),band(ECAc,'e')];
  const bI=[band(CCA,'c',wall),band(ICAc,'i',wall),band(ECAc,'e',wall)];
  const bN=band(ICAc,'i',wall,nar);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})" style="stroke-linejoin:round"><defs><clipPath id="${id}"><path d="${ptsD(bI[1].P)}Z"/></clipPath></defs>`;
  bO.forEach(b=>{g+=`<path d="${ptsD(b.P)}Z" style="fill:var(--wm);stroke:var(--artery-line);stroke-width:1.5"/>`});
  /* lumen */
  bI.forEach(b=>{g+=`<path d="${ptsD(b.P)}Z" style="fill:var(--blood)"/>`});
  /* plaque filling the far wall of the bulb */
  if(st>0){const bp=band(ICAc,'i',wall),inner=bN.L,outer=bI[1].L,P=[];for(let i=0;i<inner.length;i++)P.push(outer[i]);for(let i=inner.length-1;i>=0;i--)P.push(inner[i]);
    g+=`<path d="${ptsD(P)}Z" style="fill:var(--plaque);stroke:var(--artery-line);stroke-width:1"/>`}
  /* flow streaks */
  if(flow>0){const off=-ph*60;[CCA,ICAc,ECAc].forEach((C,k)=>{g+=`<path d="${ptsD(k===1?C:C)}" style="fill:none;stroke:var(--wm);stroke-width:1.6;stroke-dasharray:5 12;stroke-dashoffset:${f1(off)};opacity:${f1(flow*.85)}"/>`})}
  /* measures */
  let iN=0,best=1e9;bN.L.forEach((p,i)=>{const d=Math.hypot(p[0]-bN.R[i][0],p[1]-bN.R[i][1]);const u=i/(bN.L.length-1);if(u>.08&&u<.42&&d<best){best=d;iN=i}});
  const iD=Math.floor(bN.L.length*.72),dW=Math.hypot(bN.L[iD][0]-bN.R[iD][0],bN.L[iD][1]-bN.R[iD][1]),iB=Math.floor(bN.L.length*.24),eW=Math.hypot(bI[1].L[iB][0]-bI[1].R[iB][0],bI[1].L[iB][1]-bI[1].R[iB][1]);
  const bar=(a,b,col)=>`<path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" style="stroke:${col};stroke-width:2;stroke-linecap:butt"/>`;
  if(o.ecst)g+=`<path d="M${f1(bI[1].L[iB][0])} ${f1(bI[1].L[iB][1])}L${f1(bI[1].R[iB][0])} ${f1(bI[1].R[iB][1])}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 3"/>`;
  if(o.nascet){g+=bar(bN.L[iN],bN.R[iN],'var(--ink)')+bar(bN.L[iD],bN.R[iD],'var(--ink)')}
  g+='</g>';
  if(o.nascet){const a=T(bN.R[iN]),b=T(bN.R[iD]);g+=kitLabel(a[0]-7,a[1]+3,'N',{a:'e'})+kitLabel(b[0]-7,b[1]+3,'D',{a:'e'})}
  if(o.ecst){const a=T(bI[1].L[iB]);g+=kitLabel(a[0]+7,a[1]-2,'E')}
  if(o.labels){const a=T([34,22]),b=T([150,62]),c=T([116,220]),d=T(bI[1].L[iB]);g+=kitLabel(a[0],a[1],'ICA',{a:'e'})+kitLabel(b[0],b[1],'ECA')+kitLabel(c[0],c[1],'CCA');if(st>.1&&!o.ecst)g+=kitLabel(d[0]+6,d[1]+3,'plaque')}
  return {svg:g,at:{cca:T([85,210]),bif:T([85,132]),ica:T([52,30]),eca:T([138,34]),plaque:T(bN.L[iN]),narrow:T(bN.L[iN]),distal:T(bN.L[iD])},n:best*s,d:dW*s,e:eW*s}}

/* ---- catheterStent: an artery with a stent retriever ---- */
function catheterStent(x,y,w,o={}){const h=o.h||60,dp=clamp(o.deploy||0),rt=clamp(o.retract||0),ph=o.ph||0,wall=Math.max(5,h*.13),lt=y+wall,lb=y+h-wall,cy=(lt+lb)/2,lh=lb-lt;
  const cx0=x+w*.6,clen=lh*2,tipBase=x+w*.28,pull=rt*(cx0-clen*.5-tipBase+clen*.3),cx=cx0-pull,flowOn=Math.max(dp*.55,rt);
  /* the vessel: a clot-free artery, with flow beyond the clot only as the mesh opens a channel */
  let g=artery(x,y,w,{h,flow:Math.max(.08,flowOn),ph:ph*Math.max(.05,flowOn),seed:29,stopAt:cx-clen*.5,pass:Math.max(ramp(dp,.3,1),rt)}).svg;
  /* clot */
  const hc=lh*.5*(1-dp*.1);const C=[];for(let i=0;i<12;i++){const a=i/12*Math.PI*2,k=1+(rng(i+70)()-.5)*.2;C.push([cx+Math.cos(a)*clen*.5*k,cy+Math.sin(a)*hc*k])}
  const stLeft=lerp(cx0+clen*.62,cx0-clen*.62,1)-pull,stRight=cx0+clen*.62-pull;
  const open=Math.max(.0,dp),meshL=lerp(stRight-4,stLeft,open);
  g+=`<path d="${smoothPath(C)}" style="fill:var(--clot);stroke:var(--artery-line);stroke-width:1"/>`;
  const R=rng(61);for(let i=0;i<7;i++){const qx=cx+(R()-.5)*clen*.7,qy=cy+(R()-.5)*hc*1.2;g+=`<ellipse cx="${f1(qx)}" cy="${f1(qy)}" rx="${f1(lh*.07)}" ry="${f1(lh*.045)}" style="fill:var(--blood);opacity:.8"/>`}
  /* guide catheter and wire */
  const tip=tipBase+rt*2;g+=`<rect x="${f1(x)}" y="${f1(cy-lh*.17)}" width="${f1(tip-x)}" height="${f1(lh*.34)}" rx="2" style="fill:var(--device);stroke:var(--ink);stroke-width:.7;opacity:.95"/>`;
  g+=`<path d="M${f1(tip)} ${f1(cy)}L${f1(stRight)} ${f1(cy)}" style="stroke:var(--device);stroke-width:1.6"/>`;
  /* microcatheter sheath still covering the undeployed part of the stent */
  if(dp<1)g+=`<rect x="${f1(tip)}" y="${f1(cy-lh*.075)}" width="${f1(Math.max(0,meshL-tip))}" height="${f1(lh*.15)}" rx="1.5" style="fill:var(--ink);opacity:.7"/>`;
  /* the mesh: crossing struts between two envelope curves */
  if(dp>0&&stRight-meshL>2){const span=stRight-meshL,r=lh*.46*Math.min(1,dp*1.3),n=Math.max(4,Math.round(span/(lh*.26)));let d='';
    const env=u=>Math.sin(Math.PI*Math.min(1,Math.max(0,u))*.5+.2)*r*(u>.92?1-(u-.92)*8:1);
    for(let i=0;i<n;i++){const a=i/n,b=(i+1)/n,xa=lerp(meshL,stRight,a),xb=lerp(meshL,stRight,b);d+=`M${f1(xa)} ${f1(cy-env(1-a))}L${f1(xb)} ${f1(cy+env(1-b))}M${f1(xa)} ${f1(cy+env(1-a))}L${f1(xb)} ${f1(cy-env(1-b))}`}
    d+=`M${f1(meshL)} ${f1(cy)}L${f1(meshL+span*.04)} ${f1(cy-env(.96))}M${f1(meshL)} ${f1(cy)}L${f1(meshL+span*.04)} ${f1(cy+env(.96))}`;
    g+=`<path d="${d}" style="fill:none;stroke:var(--device);stroke-width:1.5;stroke-linejoin:round"/>`;
    g+=`<circle cx="${f1(stRight)}" cy="${f1(cy)}" r="2.2" style="fill:var(--ink)"/>`}
  if(o.labels){g+=kitLabel(x+4,y-4,'catheter');g+=kitLabel(cx,y+h+13,'clot',{a:'m'});if(dp>.4)g+=kitLabel(stRight,y-4,'stent retriever',{a:'e'})}
  return {svg:g,at:{clot:[cx,cy],tip:[tip,cy]}}}

/* ---- face, arms and body: follow the person's side ---- */
function faceGlyph(x,y,s=70,o={}){const dr=clamp(o.droop||0),sm=o.smile==null?.8:clamp(o.smile),person=o.side||'L',k=s/100,sg=person==='L'?1:-1;
  const P=(a,b)=>`${f1(x+a*k)} ${f1(y+b*k)}`,side=q=>q===sg?dr:0;
  let g=`<path d="M${P(-35,-6)}C${P(-37,-42)} ${P(-20,-48)} ${P(0,-48)}C${P(20,-48)} ${P(37,-42)} ${P(35,-6)}C${P(37,24)} ${P(20,46)} ${P(0,46)}C${P(-20,46)} ${P(-37,24)} ${P(-35,-6)}Z" style="fill:var(--skin);stroke:var(--ink);stroke-width:${f1(Math.max(1.2,s*.022))}"/>`;
  /* ears */
  g+=`<path d="M${P(-35,-12)}q${f1(-7*k)} ${f1(2*k)} ${f1(-6*k)} ${f1(10*k)}q${f1(1*k)} ${f1(6*k)} ${f1(6*k)} ${f1(6*k)}M${P(35,-12)}q${f1(7*k)} ${f1(2*k)} ${f1(6*k)} ${f1(10*k)}q${f1(-1*k)} ${f1(6*k)} ${f1(-6*k)} ${f1(6*k)}" style="fill:var(--skin);stroke:var(--ink);stroke-width:${f1(Math.max(1,s*.018))}"/>`;
  [-1,1].forEach(q=>{const d=side(q),ex=q*14;
    /* brow, eye with lid */
    g+=`<path d="M${P(ex-9,-17+d*4)}Q${P(ex,-22+d*5)} ${P(ex+9,-17+d*(q===1?5:3))}" style="fill:none;stroke:var(--ink);stroke-width:${f1(Math.max(1.3,s*.026))};stroke-linecap:round"/>`;
    g+=`<ellipse cx="${f1(x+ex*k)}" cy="${f1(y-7*k)}" rx="${f1(6.6*k)}" ry="${f1((4.4-d*1.6)*k)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:${f1(Math.max(.9,s*.016))}"/><circle cx="${f1(x+ex*k)}" cy="${f1(y-(6.6-d*.4)*k)}" r="${f1(2.6*k)}" style="fill:var(--ink)"/>`;
    /* crease beside the nose flattens on the weak side */
    g+=`<path d="M${P(q*11,9)}Q${P(q*17,14)} ${P(q*20,22+d*3)}" style="fill:none;stroke:var(--ink);stroke-width:${f1(Math.max(.7,s*.012))};opacity:${f1(.38*(1-d*.95))}"/>`});
  g+=`<path d="M${P(0,-8)}L${P(-3,8)}Q${P(0,11)} ${P(4,8)}" style="fill:none;stroke:var(--ink);stroke-width:${f1(Math.max(1,s*.018))};stroke-linecap:round;stroke-linejoin:round"/>`;
  /* the mouth: both corners lift in a smile; the weak side's stays low */
  const up=8*sm,cl=-1,cr=1,yc=q=>26-up+side(q)*(up+7),mid=26+sm*5+dr*1.5;
  g+=`<path d="M${P(-17,yc(cl))}Q${P(-7,mid+side(cl)*2)} ${P(0,mid)}Q${P(7,mid+side(cr)*2)} ${P(17,yc(cr))}" style="fill:none;stroke:var(--ink);stroke-width:${f1(Math.max(1.5,s*.03))};stroke-linecap:round"/>`;
  return g}
function armsGlyph(x,y,s=90,o={}){const dr=clamp(o.drift||0),person=o.side||'L',k=s/100,sg=person==='L'?1:-1,P=(a,b)=>[x+a*k,y+b*k],w=Math.max(5,8.5*k),sw=Math.max(1,1.8*k);
  const arm=(q,d)=>{const sh=P(q*13,-16),ang=lerp(-16,28,d)*Math.PI/180,L1=24,L2=22,el=[sh[0]+q*Math.cos(ang)*L1*k,sh[1]+Math.sin(ang)*L1*k],ang2=ang+d*.5,ha=[el[0]+q*Math.cos(ang2)*L2*k,el[1]+Math.sin(ang2)*L2*k];return {sh,el,ha}};
  let g='';
  const dA=arm(sg,0),dB=arm(sg,dr),oth=arm(-sg,0),stroke=(A,col,extra='')=>`<path d="M${f1(A.sh[0])} ${f1(A.sh[1])}L${f1(A.el[0])} ${f1(A.el[1])}L${f1(A.ha[0])} ${f1(A.ha[1])}" style="fill:none;stroke:${col};stroke-width:${f1(w)};stroke-linecap:round;stroke-linejoin:round${extra}"/>`;
  if(dr>.03)g+=`<path d="M${f1(dA.sh[0])} ${f1(dA.sh[1])}L${f1(dA.el[0])} ${f1(dA.el[1])}L${f1(dA.ha[0])} ${f1(dA.ha[1])}" style="fill:none;stroke:var(--muted);stroke-width:${f1(sw)};stroke-dasharray:3 3"/>`;
  /* arms with an outline, under the torso */
  [oth,dB].forEach(A=>{g+=stroke(A,'var(--ink)').replace(`stroke-width:${f1(w)}`,`stroke-width:${f1(w+sw*1.6)}`)+stroke(A,'var(--skin)')});
  const hand=A=>`<circle cx="${f1(A.ha[0])}" cy="${f1(A.ha[1])}" r="${f1(w*.72)}" style="fill:var(--skin);stroke:var(--ink);stroke-width:${f1(sw)}"/>`;g+=hand(oth)+hand(dB);
  const a=P(-18,-20),b=P(18,-20),c=P(15,40),d=P(-15,40),t1=P(0,-26);
  g+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(t1[0])} ${f1(t1[1])} ${f1(b[0])} ${f1(b[1])}L${f1(c[0])} ${f1(c[1])}L${f1(d[0])} ${f1(d[1])}Z" style="fill:var(--skin);stroke:var(--ink);stroke-width:${f1(sw)};stroke-linejoin:round"/>`;
  const h=P(0,-38);g+=`<circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="${f1(12*k)}" style="fill:var(--skin);stroke:var(--ink);stroke-width:${f1(sw)}"/>`;
  return g}
const BODY_PATH='M0 -50C7 -50 11 -45 11 -39C11 -35 9 -31 6 -29V-25C14 -24 21 -22 24 -16C26 -8 29 8 31 22C32 26 31 28 28 28C26 28 25 26 24 23L19 -2L17 6L18 24L18 52C18 60 15 72 14 90C14 94 12 96 8 96C4 96 3 94 3 90L2 52L0 34L-2 52L-3 90C-3 94 -4 96 -8 96C-12 96 -14 94 -14 90C-15 72 -18 60 -18 52L-18 24L-17 6L-19 -2L-24 23C-25 26 -26 28 -28 28C-31 28 -32 26 -31 22C-29 8 -26 -8 -24 -16C-21 -22 -14 -24 -6 -25V-29C-9 -31 -11 -35 -11 -39C-11 -45 -7 -50 0 -50Z';
function bodyHemi(x,y,s=120,o={}){const k=s/146,id=kid('bh'),col=o.col||'var(--accent)',L=clamp(o.left||0),R=clamp(o.right||0);
  let g=`<g transform="translate(${f1(x)} ${f1(y-23*k)}) scale(${k.toFixed(3)})"><clipPath id="${id}"><path d="${BODY_PATH}"/></clipPath><path d="${BODY_PATH}" style="fill:var(--skin)"/><g clip-path="url(#${id})">`;
  /* person's right is the viewer's left */
  if(R>0)g+=`<rect x="-40" y="-60" width="40" height="170" style="fill:${col};opacity:${f1(R*.72)}"/>`;
  if(L>0)g+=`<rect x="0" y="-60" width="40" height="170" style="fill:${col};opacity:${f1(L*.72)}"/>`;
  g+=`</g><path d="${BODY_PATH}" style="fill:none;stroke:var(--ink);stroke-width:${f1(1.3/k)};stroke-linejoin:round"/><line x1="0" x2="0" y1="-48" y2="34" style="stroke:var(--ink);stroke-width:${f1(.7/k)};stroke-dasharray:2 3;opacity:.5"/></g>`;
  if(o.labels)g+=kitLabel(x-20*k,y+k*88,'right',{a:'m'})+kitLabel(x+20*k,y+k*88,'left',{a:'m'});
  return g}
const sideFigure=bodyHemi;

/* ---- modified Rankin Scale ---- */
const MRS_NAMES=['no symptoms','no significant disability','slight disability','moderate disability','moderately severe disability','severe disability','dead'];
function mrsStack(x,y,w,h,dist,o={}){const tot=dist.reduce((a,b)=>a+b,0)||1,fmt=o.fmt||(v=>Math.round(v));let cx=x,s='';const mids=[];
  if(o.label)s+=`<text x="${f1(x)}" y="${f1(y-(o.digits===false?5:18))}" class="t-sm" style="fill:var(--ink);font-weight:700">${o.label}</text>`;
  dist.forEach((v,i)=>{const sw=v/tot*w;mids.push(cx+sw/2);
    s+=`<rect x="${f1(cx)}" y="${f1(y)}" width="${f1(Math.max(0,sw))}" height="${f1(h)}" style="fill:var(--mrs${i});stroke:var(--panel);stroke-width:1"/>`;
    if(sw>=24&&h>=16)s+=`<text x="${f1(cx+sw/2)}" y="${f1(y+h/2+4)}" class="t-mid" style="font:700 12px var(--mono);fill:var(--mrs-on${i})">${fmt(v)}</text>`;
    if(o.digits!==false&&sw>=9)s+=`<text x="${f1(cx+sw/2)}" y="${f1(y-4)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${i}</text>`;
    cx+=sw});
  return {svg:s,at:i=>[mids[i],y],X:u=>x+u*w}}
function mrsLegend(x,y,w,o={}){const sz=o.size||12,lh=sz+7;let cx=x,cy=y,s='';
  MRS_NAMES.forEach((t,i)=>{const lbl=`${i} ${t}`,tw=lbl.length*5.2+sz+14;if(cx+tw>x+w&&cx>x){cx=x;cy+=lh}
    s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${sz}" height="${sz}" rx="2" style="fill:var(--mrs${i})"/><text x="${f1(cx+sz+4)}" y="${f1(cy+sz-2)}" class="t-xs" style="fill:var(--ink)">${lbl}</text>`;cx+=tw});
  return {svg:s,h:cy-y+lh}}
