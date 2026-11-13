/* ---- drawing kit for the Depression Companion ----
   All colours come from CSS tokens (see the palette comment in 00-head.html), so they follow the theme. Every glyph
   function returns an object with .svg (and usually .at, named anchor points in the caller's SVG coordinates) to
   concatenate into an <svg>'s innerHTML; only transmitterDot(), arrow() and kitLabel() return a plain string.
   Everything is schematic: no glyph encodes a measured value unless the caller passes one in, and the kit holds no
   clinical numbers (no scores, cut-offs, doses, durations, trial results or risks). Pass them in from the research,
   with the citation in the surrounding text. Clip paths use fresh ids on every call, so any number of glyphs can
   share a page. Text labels stay a fixed size whatever the scale.

   PEOPLE AND SAFETY. person() draws every person in the same neutral --figure colour, upright, with no face: posture
   is never a cue for mood, effort or worth. Never draw a slumped or head-in-hands caricature, and never draw
   anything that shows or suggests a method of self-harm. A low mood is drawn with the mood line (--mood-low, a
   grey-blue, never red), not with a person's body.

   THE SEROTONIN QUESTION. synapse() can show a medicine blocking a transporter and the transmitter in the cleft
   rising (established pharmacology). Do not use o.level to draw "depression = too little serotonin": a simple
   deficiency is not supported. Show strain with the circuit (brainSide o.glow), with o.signal, or with neuron
   o.spines, and label a hypothesis as one.

   ORIENTATION. The brain is seen from the side, facing left (the forehead is on the left). Its deep structures are
   drawn as if the brain were see-through. A synapse is drawn with the sending (presynaptic) terminal on top.

   ---- brain and cells ----
   brainSide(x,y,s,o)   a brain from the side. (x,y) = top left; s = scale, 1 = 190 wide, 150 tall.
     Regions: prefrontal cortex (--pfc), subgenual cingulate (--cing), amygdala (--amyg), hippocampus (--hippo), the
     reward circuit (--reward: nucleus accumbens and VTA, joined), and two brainstem dots: the raphe nuclei (--sero,
     a circle) and the locus coeruleus (--nor, a triangle).
     o.glow     {pfc, cing, amyg, hippo, reward, raphe, lc: 0..1}: how active each is drawn (a halo and a stronger
                tint). A region not named is drawn at rest. o.regions false draws the plain brain.
     o.paths    0..1 the monoamine projections from the raphe and locus coeruleus up to the cortex (dashed lines).
     o.labels   true names the five regions; or an array of keys to name, from 'pfc','cing','reward','amyg','hippo',
                'raphe','lc'. Labels sit just outside the box: leave about 16px above, 30px below, and (for 'raphe'
                and 'lc') 90px to the right.
     o.dim      0..1 fades the whole drawing (context use).
     Returns {svg, at:{pfc, cing, nacc, vta, reward, amyg, hippo, raphe, lc, brainstem, c}, w, h}.
   neuron(x,y,s,o)      one neuron: soma centred at (x,y), dendrites fanning to the left, the axon running right and
                        ending in a terminal. s = scale, 1 = soma radius 11, dendrites reach about 46, axon 90.
     o.spines   0..1 (default .6) dendritic spine density: spines appear and vanish in a fixed order, so it can be
                animated (thinning and regrowth). o.dend number of dendrites (4). o.axon axon length before scaling
                (90; 0 = none). o.ang rotation in degrees. o.active 0..1 a glow round the soma. o.seed. o.op.
     Returns {svg, at:{soma, hillock, axonEnd, dend:[tip,...]}}.
   synapse(x,y,w,h,o)   a chemical synapse in the box (x,y,w,h): the presynaptic terminal with vesicles on top, the
                        cleft, and the postsynaptic membrane with receptors below. Reuptake transporters (--sert) sit
                        in the terminal's membrane beside the cleft; MAO (--mao) sits inside the terminal.
     o.kind     'sero' (default) | 'nor' | 'dopa' | 'glu' | 'gaba': which transmitter (shape and colour).
     o.release  0..1 how many vesicles are fusing with the membrane. o.level 0..1 transmitter in the cleft.
     o.block    0..1 the transporters blocked by a medicine (a --pill plug). o.maoBlock 0..1 MAO blocked likewise.
     o.mao      false hides MAO. o.autoreceptor 0..1 draws a presynaptic autoreceptor and how active it is (omit to
                leave it out). o.receptors how many postsynaptic receptors (4). o.bound 0..1 the share of them
                occupied (default: follows o.level). o.signal 0..1 the postsynaptic response (default: o.bound).
     o.drug     0..1 medicine molecules drifting in the cleft. o.labels true names the parts. o.seed.
     Returns {svg, at:{terminal, vesicles, release, cleft, transporters:[l,r], mao, autoreceptor, receptors:[...],
              post}}.
   transmitterDot(x,y,kind,o) one transmitter molecule (a string). Each kind has its own shape AND colour, so colour
                        is never the only cue: 'sero' circle, 'nor' triangle, 'dopa' diamond, 'glu' square, 'gaba'
                        hexagon, 'drug' (a medicine molecule) a small capsule. o.r radius (4), o.op, o.label true
                        writes its name beside it.
   TRANSMITTER_INFO     {kind:{name, col, shape}} for legends.
   hpaAxis(x,y,s,o)     the stress axis top to bottom: hypothalamus, pituitary, adrenal gland on its kidney, with
                        cortisol leaving to the right. (x,y) = top left; s = scale, 1 = 150 wide, 220 tall.
     o.crh, o.acth, o.cortisol 0..1 the strength of each signal (arrow weight; cortisol also as dots).
     o.feedback 0..1 cortisol's negative feedback on the pituitary and hypothalamus (blunt-ended lines; faint and
                dashed when weak). o.labels false hides the names.
     Returns {svg, at:{hypo, pit, adrenal, kidney, cortisol, feedback}, w, h}.

   ---- people and things ----
   person(x,y,s,o)      a neutral figure, (x,y) the top of the head, s its height (100). o.pose 'stand' (default,
                        front view) | 'sit' (side view, upright on a chair, facing right; o.flip true faces left;
                        o.chair false hides the chair). o.kid true child proportions (standing). o.col and o.line
                        override --figure and --figure-line. o.op. No face, always upright.
     Returns {svg, at:{head, chest, hand, hip, foot}, w}.
   pill(x,y,s,o)        a medicine centred at (x,y), s = its length (30). o.kind 'capsule' (default) | 'tablet'.
                        o.ang rotation, o.col (--pill), o.op. Returns {svg, at:{c}}.
   talkIcon(x,y,s,o)    two speech bubbles, the sign for talking therapy, centred at (x,y), s = width (34).
                        o.col (--tx), o.op. Returns {svg, at:{c}}.
   tmsCoil(x,y,s,o)     a figure-of-eight TMS coil seen face on, centred at (x,y), s = its width (80).
     o.ang rotation, o.handle false hides the handle, o.pulse 0..1 draws the magnetic field under the junction of
     the two loops. Returns {svg, at:{c, focus, handle}}.
   sunArc(x,y,w,h,o)    the sun's path over a horizon in the box (x,y,w,h): daylight, day length, light therapy.
     o.pos 0..1 where the sun is along its arc (0 sunrise at the left, .5 noon, 1 sunset; outside 0..1 it is below
     the horizon). o.height 0..1 how high the arc climbs (a low winter arc to a high summer one; default .8).
     o.night true or 0..1 darkens the sky and shows a moon and stars. o.rays false drops the rays. o.frame false
     drops the border. Returns {svg, at:{sun, horizon:[x0,y,x1], c}}.
   clock24(x,y,r,o)     a 24-hour dial centred at (x,y), midnight at the top. o.sleep [bedtime, wake] in hours draws
                        the night (--night) and the day (--sun) on the rim; o.arcs [{from, to, col, op}] draws other
                        spans; o.h an hour hand; o.marks [{h, col, label}] dots on the rim; o.small true drops the
                        00/06/12/18 numerals; o.label a caption underneath. Returns {svg, P:(h,rr)->[x,y]}.

   ---- charts ----
   moodLine(x,y,w,h,pts,o) mood over time in the box (x,y,w,h). pts = [[u,v],...]: u 0..1 along time, v 0..1 mood
                        (1 = top). The line is --mood where it is at or above the bottom of the well band and
                        --mood-low below it.
     o.well     [lo,hi] the well band in v units (default [.58,.92]: a schematic band, not a score). o.band false
                hides its shading. o.wellLabel / o.lowLabel text written at the left inside the band / below it.
     o.upto     0..1 draw the line only this far (animate it). o.dot true marks the end. o.smooth false joins the
                points with straight lines. o.lw line width (2.8). o.frame false drops the background and baseline.
     o.markers  [{u, label, col, line:true|false}]: a dot on the line at u, a dashed drop line and a label on top.
     Returns {svg, X:u->x, Y:v->y, f:u->v, end:[x,y]}.
   axes(x,y,w,h,o)      a chart frame: o {x0,x1,y0,y1, xt:[ticks], yt:[ticks], xfmt, yfmt, xlabel, ylabel, grid}.
                        (x,y) = top left of the plot area. Returns {svg, X, Y}.
   curve(P,X,Y,o)       a line through data points P [[x,y],...] in data units, with the X and Y that axes() returned.
                        o {col, lw, dash, upto (cut at this x, interpolating), dot (a dot at the end), fill (area
                        down to o.base, default 0), smooth (monotone curve)}. Returns {svg, end:[x,y]}.
   iconArray(x,y,n,o)   a block of n people or dots from (x,y): o {cols (10), k (highlighted count) or groups
                        [{k, col}, ...], size (12), gap (3), shape 'person' (default) | 'dot', col, base}.
                        Returns {svg, w, h, at:i->[x,y]}.

   ---- helpers ----
   kitLabel(x,y,text,o) a small label with a halo so it reads on any drawing: o {a:'m'|'e', halo (var(--panel))}.
   arrow(x1,y1,x2,y2,o) an arrow (a string): o {col, lw (1.6), bend (sideways bow of the curve), blunt (a flat end:
                        inhibition), dash, op, head (6)}.
   smoothPath(P,closed) Catmull-Rom path through points. ptsD(P) polyline path. polyAt(P) arc-length sampler:
   f(0..1) -> [x,y]. monoFn(P) monotone cubic through [[x,y],...] sorted by x; returns f(x).
   blob(cx,cy,r,seed,o) an irregular closed path string: o {n (18), rough (.16), sq}. kid(prefix) a fresh id. */

/* ---- helpers ---- */
let _kid=0;
const kid=p=>'md'+p+'_'+(++_kid);
function kitLabel(x,y,t,o={}){return `<text x="${f1(x)}" y="${f1(y)}" class="t-xs${o.a==='m'?' t-mid':o.a==='e'?' t-end':''}" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:${o.halo||'var(--panel)'};stroke-width:3px;stroke-linejoin:round">${t}</text>`}
function smoothPath(P,closed=true){const n=P.length;let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;
  for(let i=0;i<(closed?n:n-1);i++){const p0=P[closed?(i-1+n)%n:Math.max(0,i-1)],p1=P[i],p2=P[(i+1)%n],p3=P[closed?(i+2)%n:Math.min(n-1,i+2)];
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=`C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`}
  return d+(closed?'Z':'')}
const ptsD=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
function polyAt(P){const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));const T=L[L.length-1]||1;
  return u=>{const d=clamp(u)*T;let i=1;while(i<L.length-1&&L[i]<d)i++;const s=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(P[i-1][0],P[i][0],s),lerp(P[i-1][1],P[i][1],s)]}}
function monoFn(P){const n=P.length,dx=[],m=[],t=[];if(n<2)return()=>P[0]?P[0][1]:0;
  for(let i=0;i<n-1;i++){dx[i]=P[i+1][0]-P[i][0];m[i]=(P[i+1][1]-P[i][1])/dx[i]}
  t[0]=m[0];t[n-1]=m[n-2];for(let i=1;i<n-1;i++)t[i]=m[i-1]*m[i]<=0?0:3*(dx[i-1]+dx[i])/((2*dx[i]+dx[i-1])/m[i-1]+(dx[i]+2*dx[i-1])/m[i]);
  return v=>{if(v<=P[0][0])return P[0][1];if(v>=P[n-1][0])return P[n-1][1];let i=0;while(v>P[i+1][0])i++;const h=dx[i],u=(v-P[i][0])/h,u2=u*u,u3=u2*u;
    return (2*u3-3*u2+1)*P[i][1]+(u3-2*u2+u)*h*t[i]+(-2*u3+3*u2)*P[i+1][1]+(u3-u2)*h*t[i+1]}}
function blob(cx,cy,r,seed=1,o={}){const n=o.n||18,ro=o.rough==null?.16:o.rough,rr=rng(seed),P=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(rr()-.5)*ro*2;P.push([cx+Math.cos(a)*r*k,cy+Math.sin(a)*r*k*(o.sq||1)])}
  return smoothPath(P)}
const _tr=(x,y,k)=>p=>[x+p[0]*k,y+p[1]*k];
function arrow(x1,y1,x2,y2,o={}){const col=o.col||'var(--muted)',lw=o.lw||1.6,b=o.bend||0,hd=o.head||6,op=o.op==null?1:o.op;
  const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,cx=(x1+x2)/2-dy/L*b,cy=(y1+y2)/2+dx/L*b;
  let tx=x2-cx,ty=y2-cy;const tl=Math.hypot(tx,ty)||1;tx/=tl;ty/=tl;const nx=-ty,ny=tx;
  const ex=o.blunt?x2:x2-tx*hd*.8,ey=o.blunt?y2:y2-ty*hd*.8;
  let s=`<g style="opacity:${f1(op)}"><path d="M${f1(x1)} ${f1(y1)}Q${f1(cx)} ${f1(cy)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:${col};stroke-width:${lw};stroke-linecap:round${o.dash?';stroke-dasharray:'+o.dash:''}"/>`;
  if(o.blunt)s+=`<path d="M${f1(x2+nx*hd*.75)} ${f1(y2+ny*hd*.75)}L${f1(x2-nx*hd*.75)} ${f1(y2-ny*hd*.75)}" style="stroke:${col};stroke-width:${f1(lw+1)};stroke-linecap:round"/>`;
  else s+=`<path d="M${f1(x2)} ${f1(y2)}L${f1(x2-tx*hd+nx*hd*.5)} ${f1(y2-ty*hd+ny*hd*.5)}L${f1(x2-tx*hd-nx*hd*.5)} ${f1(y2-ty*hd-ny*hd*.5)}Z" style="fill:${col}"/>`;
  return s+'</g>'}

/* ---- transmitters ---- */
const TRANSMITTER_INFO={sero:{name:'serotonin',col:'var(--sero)',shape:'circle'},nor:{name:'noradrenaline',col:'var(--nor)',shape:'triangle'},
  dopa:{name:'dopamine',col:'var(--dopa)',shape:'diamond'},glu:{name:'glutamate',col:'var(--glu)',shape:'square'},
  gaba:{name:'GABA',col:'var(--gaba)',shape:'hexagon'},drug:{name:'medicine',col:'var(--pill)',shape:'capsule'}};
function transmitterDot(x,y,kind='sero',o={}){const r=o.r||4,H=TRANSMITTER_INFO[kind]||TRANSMITTER_INFO.sero,c=H.col,op=o.op==null?1:o.op,st=`fill:${c};stroke:var(--panel);stroke-width:${f1(Math.max(.6,r*.2))};stroke-linejoin:round`;
  const poly=(n,rot,k=1)=>{let d='';for(let i=0;i<n;i++){const a=rot+i/n*Math.PI*2;d+=(i?'L':'M')+f1(x+Math.cos(a)*r*k)+' '+f1(y+Math.sin(a)*r*k)}return `<path d="${d}Z" style="${st}"/>`};
  let s=`<g style="opacity:${f1(op)}">`;
  if(kind==='nor')s+=poly(3,-Math.PI/2,1.25);
  else if(kind==='dopa')s+=poly(4,0,1.2);
  else if(kind==='glu')s+=`<rect x="${f1(x-r*.85)}" y="${f1(y-r*.85)}" width="${f1(r*1.7)}" height="${f1(r*1.7)}" rx="${f1(r*.25)}" style="${st}"/>`;
  else if(kind==='gaba')s+=poly(6,0,1.12);
  else if(kind==='drug')s+=`<rect x="${f1(x-r*1.35)}" y="${f1(y-r*.7)}" width="${f1(r*2.7)}" height="${f1(r*1.4)}" rx="${f1(r*.7)}" transform="rotate(-30 ${f1(x)} ${f1(y)})" style="${st}"/>`;
  else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="${st}"/>`;
  if(o.label)s+=`<text x="${f1(x+r+5)}" y="${f1(y+3.5)}" class="t-xs">${H.name}</text>`;
  return s+'</g>'}

/* ---- brain ---- */
const BS_OUT=[[10,74],[9,50],[20,30],[42,14],[74,6],[108,6],[140,13],[164,28],[178,50],[180,72],[170,90],[150,98],[134,96],[122,100],[110,110],[92,117],[72,114],[58,104],[40,100],[22,94]];
const BS_NAME={pfc:'prefrontal cortex',cing:'subgenual cingulate',reward:'reward circuit',amyg:'amygdala',hippo:'hippocampus',raphe:'raphe nuclei',lc:'locus coeruleus'};
/* label: [text x, text y, anchor, leader start x, leader start y]; the leader ends at the structure */
const BS_LAB={pfc:[0,-7,'',26,-3],reward:[100,-7,'',118,-3],amyg:[0,133,'',30,125],cing:[0,147,'',62,139],hippo:[112,147,'',134,139],lc:[186,104,'',184,101],raphe:[186,124,'',184,121]};
function brainSide(x,y,s=1,o={}){const T=_tr(x,y,s),gl=o.glow||{},G=k=>clamp(gl[k]||0),sw=v=>f1(Math.max(.8,v*Math.min(1.4,Math.max(.7,s))));
  const A={pfc:T([32,52]),cing:T([66,78]),nacc:T([80,90]),vta:T([114,98]),reward:T([97,90]),amyg:T([94,107]),hippo:T([116,110]),raphe:T([125,121]),lc:T([131,110]),brainstem:T([127,134]),c:T([95,60])};
  let g=`<g style="opacity:${f1(1-clamp(o.dim||0)*.75)}">`;
  /* brainstem and cerebellum sit behind the cerebrum */
  g+=`<path d="${smoothPath([[112,102],[126,98],[134,118],[137,146],[124,148],[118,126]].map(T))}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${sw(1.3)}"/>`;
  g+=`<path d="${smoothPath([[136,100],[156,94],[174,102],[177,118],[160,128],[142,124]].map(T))}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${sw(1.3)}"/>`;
  [[[142,106],[156,102],[170,108]],[[142,114],[157,111],[172,116]]].forEach(P=>{g+=`<path d="${smoothPath(P.map(T),false)}" style="fill:none;stroke:var(--brain-line);stroke-width:${sw(.9)};opacity:.55"/>`});
  g+=`<path d="${smoothPath(BS_OUT.map(T))}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${sw(1.6)}"/>`;
  [[[24,40],[40,28],[58,32],[72,20],[92,22]],[[108,18],[124,26],[142,22],[156,34]],[[150,52],[160,62],[166,76]],[[74,112],[90,104],[106,104]]].forEach(P=>{g+=`<path d="${smoothPath(P.map(T),false)}" style="fill:none;stroke:var(--brain-line);stroke-width:${sw(1.1)};opacity:.5;stroke-linecap:round"/>`});
  /* the corpus callosum, for orientation */
  g+=`<path d="${smoothPath([[60,70],[62,54],[80,43],[104,41],[124,47],[133,60]].map(T),false)}" style="fill:none;stroke:var(--brain-line);stroke-width:${f1(3.2*s)};opacity:.32;stroke-linecap:round"/>`;
  if(o.regions!==false){
    const pa=clamp(o.paths||0);
    if(pa>0){g+=`<path d="M${A.raphe.map(f1).join(' ')}C${T([112,58]).map(f1).join(' ')} ${T([74,30]).map(f1).join(' ')} ${T([36,48]).map(f1).join(' ')}" style="fill:none;stroke:var(--sero);stroke-width:${sw(1.5)};stroke-dasharray:3 3;opacity:${f1(.25+.7*pa)}"/>`;
      g+=`<path d="M${A.lc.map(f1).join(' ')}C${T([136,44]).map(f1).join(' ')} ${T([86,14]).map(f1).join(' ')} ${T([42,30]).map(f1).join(' ')}" style="fill:none;stroke:var(--nor);stroke-width:${sw(1.5)};stroke-dasharray:1 3;stroke-linecap:round;opacity:${f1(.25+.7*pa)}"/>`}
    const halo=(p,r,col,v)=>v>0?`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r*s*(1.5+v*.7))}" style="fill:${col};opacity:${f1(.1+v*.22)}"/>`:'';
    const tint=v=>f1(.5+.5*v),edge='stroke:var(--panel);stroke-width:'+sw(1);
    g+=halo(A.pfc,20,'var(--pfc)',G('pfc'))+`<path d="${smoothPath([[14,70],[14,50],[24,32],[40,22],[52,30],[51,52],[43,72],[28,84]].map(T))}" style="fill:var(--pfc);opacity:${tint(G('pfc'))}"/>`;
    /* the reward circuit: VTA to nucleus accumbens, and on to the prefrontal cortex */
    g+=halo(A.reward,13,'var(--reward)',G('reward'));
    g+=`<path d="M${A.vta.map(f1).join(' ')}Q${T([97,84]).map(f1).join(' ')} ${A.nacc.map(f1).join(' ')}" style="fill:none;stroke:var(--reward);stroke-width:${f1(2.6*s)};stroke-linecap:round;opacity:${tint(G('reward'))}"/>`;
    g+=`<path d="M${A.nacc.map(f1).join(' ')}Q${T([62,84]).map(f1).join(' ')} ${T([48,64]).map(f1).join(' ')}" style="fill:none;stroke:var(--reward);stroke-width:${f1(1.4*s)};stroke-dasharray:${f1(2.5*s)} ${f1(2.5*s)};opacity:${tint(G('reward'))}"/>`;
    g+=`<circle cx="${f1(A.nacc[0])}" cy="${f1(A.nacc[1])}" r="${f1(5.5*s)}" style="fill:var(--reward);${edge};opacity:${tint(G('reward'))}"/><circle cx="${f1(A.vta[0])}" cy="${f1(A.vta[1])}" r="${f1(4.5*s)}" style="fill:var(--reward);${edge};opacity:${tint(G('reward'))}"/>`;
    g+=halo(A.cing,8,'var(--cing)',G('cing'))+`<ellipse cx="${f1(A.cing[0])}" cy="${f1(A.cing[1])}" rx="${f1(8.5*s)}" ry="${f1(6*s)}" style="fill:var(--cing);${edge};opacity:${tint(G('cing'))}"/>`;
    g+=halo(A.hippo,10,'var(--hippo)',G('hippo'))+`<path d="${smoothPath([[103,112],[113,114],[122,108],[128,100]].map(T),false)}" style="fill:none;stroke:var(--hippo);stroke-width:${f1(6.5*s)};stroke-linecap:round;opacity:${tint(G('hippo'))}"/>`;
    g+=halo(A.amyg,8,'var(--amyg)',G('amyg'))+`<ellipse cx="${f1(A.amyg[0])}" cy="${f1(A.amyg[1])}" rx="${f1(7*s)}" ry="${f1(5.6*s)}" transform="rotate(-20 ${f1(A.amyg[0])} ${f1(A.amyg[1])})" style="fill:var(--amyg);${edge};opacity:${tint(G('amyg'))}"/>`;
    g+=halo(A.raphe,5,'var(--sero)',G('raphe'))+halo(A.lc,5,'var(--nor)',G('lc'));
    g+=transmitterDot(A.raphe[0],A.raphe[1],'sero',{r:Math.max(2.6,3.2*s)})+transmitterDot(A.lc[0],A.lc[1],'nor',{r:Math.max(2.6,3*s)})}
  g+='</g>';
  if(o.labels){const keys=Array.isArray(o.labels)?o.labels:['pfc','cing','reward','amyg','hippo'];
    const tgt={pfc:T([30,30]),reward:T([100,86]),amyg:T([92,112]),cing:T([65,84]),hippo:T([118,115]),lc:[A.lc[0]+4*s,A.lc[1]],raphe:[A.raphe[0]+4*s,A.raphe[1]]};
    keys.forEach(k=>{const L=BS_LAB[k];if(!L)return;const p=T([L[0],L[1]]),q=T([L[3],L[4]]),e=tgt[k];
      g+=`<path d="M${f1(q[0])} ${f1(q[1])}L${f1(e[0])} ${f1(e[1])}" style="stroke:var(--ink);stroke-width:.8;opacity:.6"/><circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="1.6" style="fill:var(--ink)"/>`+kitLabel(p[0],p[1],BS_NAME[k],{})})}
  return {svg:g,at:A,w:190*s,h:150*s}}

/* ---- neuron ---- */
function neuron(x,y,s=1,o={}){const rr=rng(o.seed||5),sp=clamp(o.spines==null?.6:o.spines),nd=o.dend||4,R=11*s,L=46*s,ax=(o.axon==null?90:o.axon)*s,
  ang=(o.ang||0)*Math.PI/180,ca=Math.cos(ang),sa=Math.sin(ang),act=clamp(o.active||0),G=(px,py)=>[x+px*ca-py*sa,y+px*sa+py*ca];
  const q=(a,c,b,t)=>[(1-t)*(1-t)*a[0]+2*(1-t)*t*c[0]+t*t*b[0],(1-t)*(1-t)*a[1]+2*(1-t)*t*c[1]+t*t*b[1]];
  let br='',spn='';const tips=[],lw=Math.max(1.2,2.4*Math.min(1.5,s)),sl=Math.max(3.2,4.4*s),sr=Math.max(1.3,1.6*Math.min(1.4,s));
  const limb=(a,c,b,w,n)=>{br+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(c[0])} ${f1(c[1])} ${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:var(--neuron-line);stroke-width:${f1(w)};stroke-linecap:round"/>`;
    for(let i=0;i<n;i++){const t=.22+.74*(i+.5)/n,p=q(a,c,b,t),p2=q(a,c,b,t+.02),side=i%2?1:-1,th=rr();let dx=p2[0]-p[0],dy=p2[1]-p[1];const dl=Math.hypot(dx,dy)||1;dx/=dl;dy/=dl;
      if(th<sp){const e=[p[0]-dy*side*sl,p[1]+dx*side*sl];spn+=`<path d="M${f1(p[0])} ${f1(p[1])}L${f1(e[0])} ${f1(e[1])}" style="stroke:var(--spine);stroke-width:${f1(Math.max(.9,1.1*s))};stroke-linecap:round"/><circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="${f1(sr)}" style="fill:var(--spine)"/>`}}};
  for(let i=0;i<nd;i++){const a=(nd===1?180:lerp(112,248,i/(nd-1)))*Math.PI/180+(rr()-.5)*.16,len=L*(.85+rr()*.3),bow=(rr()-.5)*L*.35;
    const a0=[Math.cos(a)*R*.9,Math.sin(a)*R*.9],b0=[Math.cos(a)*len,Math.sin(a)*len],c0=[Math.cos(a)*len*.55-Math.sin(a)*bow,Math.sin(a)*len*.55+Math.cos(a)*bow];
    limb(a0,c0,b0,lw,5);tips.push(G(b0[0],b0[1]));
    const m=q(a0,c0,b0,.5),a2=a+(i%2?.55:-.55),l2=len*.48,b2=[m[0]+Math.cos(a2)*l2,m[1]+Math.sin(a2)*l2],c2=[m[0]+Math.cos(a2)*l2*.5+Math.sin(a2)*3*s,m[1]+Math.sin(a2)*l2*.5-Math.cos(a2)*3*s];
    limb(m,c2,b2,lw*.7,3)}
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})" style="opacity:${o.op==null?1:o.op}">`;
  if(act>0)g+=`<circle r="${f1(R*(1.5+act*.6))}" style="fill:var(--spine);opacity:${f1(act*.28)}"/>`;
  if(ax>0)g+=`<path d="M${f1(R*.9)} 0C${f1(R+ax*.3)} ${f1(-6*s)} ${f1(R+ax*.62)} ${f1(6*s)} ${f1(R+ax)} 0" style="fill:none;stroke:var(--neuron-line);stroke-width:${f1(lw)};stroke-linecap:round"/><circle cx="${f1(R+ax+3*s)}" cy="0" r="${f1(4.2*s)}" style="fill:var(--neuron);stroke:var(--neuron-line);stroke-width:${f1(Math.max(1,1.3*s))}"/>`;
  g+=br+spn;
  g+=`<path d="${blob(0,0,R,o.seed||5,{rough:.07,n:10})}" style="fill:var(--neuron);stroke:var(--neuron-line);stroke-width:${f1(Math.max(1.1,1.5*Math.min(1.4,s)))}"/><circle cx="${f1(-R*.1)}" cy="${f1(R*.05)}" r="${f1(R*.38)}" style="fill:var(--neuron-line);opacity:.45"/>`;
  return {svg:g+'</g>',at:{soma:[x,y],hillock:G(R,0),axonEnd:G(R+ax+(ax>0?7*s:0),0),dend:tips}}}

/* ---- synapse ---- */
function synapse(x,y,w,h,o={}){const kind=TRANSMITTER_INFO[o.kind]&&o.kind!=='drug'?o.kind:'sero',col=TRANSMITTER_INFO[kind].col,rr=rng(o.seed||9);
  const rel=clamp(o.release||0),lv=clamp(o.level==null?.4:o.level),bl=clamp(o.block||0),mb=clamp(o.maoBlock||0),nr=o.receptors||4,
    bd=clamp(o.bound==null?lv:o.bound),sg=clamp(o.signal==null?bd:o.signal),dr=clamp(o.drug||0),hasAuto=o.autoreceptor!=null,au=clamp(o.autoreceptor||0);
  const cx=x+w/2,yb=y+h*.46,yp=y+h*.66,u=Math.min(w,h),lw=Math.max(1.2,Math.min(2,u*.014)),dR=clamp(u*.024,1.8,4);
  let g='';
  /* postsynaptic cell */
  if(sg>0)g+=`<rect x="${f1(x+w*.08)}" y="${f1(yp)}" width="${f1(w*.84)}" height="${f1(y+h-yp)}" rx="${f1(w*.06)}" style="fill:var(--receptor);opacity:${f1(sg*.22)}"/>`;
  g+=`<path d="M${f1(x+w*.05)} ${f1(y+h)}V${f1(yp+h*.07)}Q${f1(x+w*.05)} ${f1(yp)} ${f1(x+w*.14)} ${f1(yp)}H${f1(x+w*.86)}Q${f1(x+w*.95)} ${f1(yp)} ${f1(x+w*.95)} ${f1(yp+h*.07)}V${f1(y+h)}" style="fill:var(--neuron);fill-opacity:.8;stroke:var(--neuron-line);stroke-width:${f1(lw)}"/>`;
  /* presynaptic terminal */
  g+=`<path d="M${f1(cx-w*.13)} ${f1(y)}V${f1(y+h*.07)}C${f1(cx-w*.5)} ${f1(y+h*.1)} ${f1(cx-w*.5)} ${f1(yb)} ${f1(cx-w*.33)} ${f1(yb)}H${f1(cx+w*.33)}C${f1(cx+w*.5)} ${f1(yb)} ${f1(cx+w*.5)} ${f1(y+h*.1)} ${f1(cx+w*.13)} ${f1(y+h*.07)}V${f1(y)}" style="fill:var(--neuron);stroke:var(--neuron-line);stroke-width:${f1(lw)}"/>`;
  /* MAO on a mitochondrion */
  const mao=[cx-w*.25,y+h*.2];
  if(o.mao!==false){const mr=u*.062;g+=`<ellipse cx="${f1(mao[0])}" cy="${f1(mao[1])}" rx="${f1(mr*1.7)}" ry="${f1(mr)}" style="fill:var(--mao);opacity:.28"/><path d="M${f1(mao[0])} ${f1(mao[1])}L${f1(mao[0]+mr*.9)} ${f1(mao[1]-mr*.5)}A${f1(mr)} ${f1(mr)} 0 1 0 ${f1(mao[0]+mr*.9)} ${f1(mao[1]+mr*.5)}Z" style="fill:var(--mao);stroke:var(--panel);stroke-width:.8"/>`;
    if(mb>0)g+=`<g style="opacity:${f1(mb)}">${transmitterDot(mao[0]+mr*.75,mao[1],'drug',{r:mr*.55})}</g>`}
  /* vesicles: the first ones dock and open as release rises */
  const vr=u*.058,ves=[[-.2,.3],[.02,.2],[.22,.29],[-.08,.36],[.13,.37],[.3,.18]],nf=Math.round(rel*3),sites=[-.1,.1,0];
  ves.forEach((v,i)=>{let vx=cx+v[0]*w,vy=y+v[1]*h;
    if(i<nf){vx=cx+sites[i]*w;vy=yb;g+=`<path d="M${f1(vx-vr)} ${f1(vy)}A${f1(vr)} ${f1(vr)} 0 0 1 ${f1(vx+vr)} ${f1(vy)}" style="fill:var(--panel);stroke:var(--neuron-line);stroke-width:${f1(lw*.8)}"/>`;
      for(let k=0;k<3;k++)g+=transmitterDot(vx+(k-1)*dR*1.6,vy+dR*(1.2+(k%2)*1.3),kind,{r:dR*.9})}
    else{g+=`<circle cx="${f1(vx)}" cy="${f1(vy)}" r="${f1(vr)}" style="fill:var(--panel);stroke:var(--neuron-line);stroke-width:${f1(lw*.8)}"/>`;
      [[-.38,.22],[.36,.12],[0,-.36]].forEach(d=>{g+=transmitterDot(vx+d[0]*vr,vy+d[1]*vr,kind,{r:Math.max(1.1,vr*.3)})})}});
  /* reuptake transporters in the terminal's membrane, either side of the release sites */
  const tw=u*.05,th=u*.11,trs=[[cx-w*.27,yb],[cx+w*.27,yb]];
  trs.forEach(p=>{[-1,1].forEach(sd=>{g+=`<rect x="${f1(p[0]+sd*tw*.62-tw*.45)}" y="${f1(p[1]-th*.62)}" width="${f1(tw*.9)}" height="${f1(th)}" rx="${f1(tw*.4)}" style="fill:var(--sert);stroke:var(--panel);stroke-width:.8"/>`});
    if(bl>0)g+=`<g style="opacity:${f1(bl)}">${transmitterDot(p[0],p[1]+th*.42,'drug',{r:tw*.75})}</g>`;
    else if(lv>.05)g+=`<path d="M${f1(p[0])} ${f1(p[1]+th*.5)}V${f1(p[1]-th*.2)}" style="stroke:${col};stroke-width:1;stroke-dasharray:1.5 2;opacity:.8"/>`});
  /* autoreceptor on the terminal's flank */
  const ar=[cx+w*.415,y+h*.33];
  if(hasAuto){const k=u*.05;if(au>0)g+=`<circle cx="${f1(ar[0])}" cy="${f1(ar[1])}" r="${f1(k*(1.4+au))}" style="fill:var(--receptor);opacity:${f1(au*.3)}"/>`;
    g+=`<path d="M${f1(ar[0]-k*.3)} ${f1(ar[1])}H${f1(ar[0]+k*.6)}M${f1(ar[0]+k*1.5)} ${f1(ar[1]-k)}Q${f1(ar[0]+k*.4)} ${f1(ar[1]-k*.9)} ${f1(ar[0]+k*.6)} ${f1(ar[1])}Q${f1(ar[0]+k*.4)} ${f1(ar[1]+k*.9)} ${f1(ar[0]+k*1.5)} ${f1(ar[1]+k)}" style="fill:none;stroke:var(--receptor);stroke-width:${f1(Math.max(1.6,u*.022))};stroke-linecap:round"/>`;
    if(au>.3)g+=transmitterDot(ar[0]+k*1.25,ar[1],kind,{r:dR*.9})}
  /* transmitter (and medicine) in the cleft */
  const n=Math.round(lv*16),cy0=yb+h*.035,ch=yp-yb-h*.085;
  for(let i=0;i<16;i++){const px=x+w*(.16+rr()*.68),py=cy0+rr()*ch;if(i<n)g+=transmitterDot(px,py,kind,{r:dR})}
  const nd=Math.round(dr*5);for(let i=0;i<5;i++){const px=x+w*(.1+rr()*.8),py=cy0+rr()*ch;if(i<nd)g+=transmitterDot(px,py,'drug',{r:dR*.95})}
  /* postsynaptic receptors */
  const recs=[],nb=Math.round(bd*nr),k=u*.05;
  for(let i=0;i<nr;i++){const px=x+w*(.2+.6*(nr===1?.5:i/(nr-1))),on=i<nb;recs.push([px,yp]);
    g+=`<path d="M${f1(px)} ${f1(yp+k*.7)}V${f1(yp-k*.2)}M${f1(px-k)} ${f1(yp-k*1.25)}Q${f1(px-k*.9)} ${f1(yp-k*.2)} ${f1(px)} ${f1(yp-k*.2)}Q${f1(px+k*.9)} ${f1(yp-k*.2)} ${f1(px+k)} ${f1(yp-k*1.25)}" style="fill:none;stroke:var(--receptor);stroke-width:${f1(Math.max(1.6,u*.022))};stroke-linecap:round"/>`;
    if(on)g+=transmitterDot(px,yp-k*.95,kind,{r:dR})+`<path d="M${f1(px)} ${f1(yp+k*1.3)}v${f1(k*1.5)}" style="stroke:var(--receptor);stroke-width:${f1(Math.max(1.4,u*.02))};stroke-linecap:round;stroke-dasharray:1 ${f1(Math.max(2.4,u*.03))};opacity:${f1(.4+.6*sg)}"/>`}
  const at={terminal:[cx,y+h*.24],vesicles:[cx+.02*w,y+.2*h],release:[cx,yb],cleft:[cx,(yb+yp)/2],transporters:trs,mao,autoreceptor:hasAuto?ar:null,receptors:recs,post:[cx,yp+(y+h-yp)*.6]};
  if(o.labels){g+=kitLabel(cx,y+h*.115,'sending terminal',{a:'m'})+kitLabel(cx,y+h-4,'receiving cell',{a:'m'})+kitLabel(x+w*.97,(yb+yp)/2+3,'cleft',{a:'e'});
    g+=kitLabel(trs[0][0]-tw*1.4,yb-th*.2,'transporter',{a:'e'})+kitLabel(recs[nr-1][0]+k*1.5,yp+k*2.2,'receptor',{});
    if(o.mao!==false)g+=kitLabel(mao[0]-u*.12,mao[1]+3,'MAO',{a:'e'});
    if(hasAuto)g+=kitLabel(ar[0]+k*2.2,ar[1]-k*1.6,'autoreceptor',{})}
  return {svg:g,at}}

/* ---- the stress (HPA) axis ---- */
function hpaAxis(x,y,s=1,o={}){const T=_tr(x,y,s),crh=clamp(o.crh==null?.4:o.crh),acth=clamp(o.acth==null?.4:o.acth),co=clamp(o.cortisol==null?.4:o.cortisol),fb=clamp(o.feedback==null?1:o.feedback),lab=o.labels!==false;
  const H=T([56,26]),P=T([56,88]),Ad=T([56,150]),K=T([56,186]),C=T([112,156]);
  let g='';
  /* hypothalamus: part of the brain's base */
  g+=`<path d="${smoothPath([[14,8],[56,2],[98,8],[104,30],[80,46],[56,50],[32,46],[8,30]].map(T))}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.5"/>`;
  g+=`<ellipse cx="${f1(H[0])}" cy="${f1(H[1])}" rx="${f1(20*s)}" ry="${f1(12*s)}" style="fill:var(--cing);opacity:${f1(.3+.6*crh)}"/>`;
  /* pituitary on its stalk */
  g+=`<path d="M${f1(P[0])} ${f1(P[1]-26*s)}V${f1(P[1]-10*s)}" style="stroke:var(--brain-line);stroke-width:${f1(4*s)};stroke-linecap:round"/>`;
  g+=`<ellipse cx="${f1(P[0])}" cy="${f1(P[1])}" rx="${f1(15*s)}" ry="${f1(12*s)}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.5"/><ellipse cx="${f1(P[0])}" cy="${f1(P[1])}" rx="${f1(10*s)}" ry="${f1(7.5*s)}" style="fill:var(--brand);opacity:${f1(.2+.6*acth)}"/>`;
  /* kidney with the adrenal gland capping it */
  g+=`<path d="${smoothPath([[40,166],[60,160],[76,172],[78,196],[64,212],[46,208],[50,192],[42,182]].map(T))}" style="fill:var(--panel-2);stroke:var(--figure-line);stroke-width:1.3"/>`;
  g+=`<path d="${smoothPath([[36,160],[50,138],[68,140],[80,158],[60,152]].map(T))}" style="fill:var(--cortisol);fill-opacity:${f1(.35+.6*co)};stroke:var(--cortisol);stroke-width:1.5"/>`;
  /* the signals down the axis */
  const sig=(a,b,v,col)=>arrow(a[0],a[1],b[0],b[1],{col,lw:1.2+v*3,op:.3+.7*v,head:5+v*4});
  g+=sig(T([42,52]),T([42,72]),crh,'var(--hl)')+sig(T([42,104]),T([42,134]),acth,'var(--brand)')+sig(T([82,152]),T([108,152]),co,'var(--cortisol)');
  const nd=Math.round(co*6);for(let i=0;i<nd;i++){const p=T([114+(i%3)*10,146+Math.floor(i/3)*12+(i%2)*3]);g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(Math.max(2,2.6*s))}" style="fill:var(--cortisol);stroke:var(--panel);stroke-width:.8"/>`}
  /* negative feedback: cortisol back to the pituitary and the hypothalamus */
  const fbs={col:'var(--cortisol)',blunt:true,lw:1+fb*1.8,op:.25+.75*fb,dash:fb<.5?'3 3':null};
  g+=arrow(T([126,138])[0],T([126,138])[1],T([76,90])[0],T([76,90])[1],{...fbs,bend:22*s})+arrow(T([132,136])[0],T([132,136])[1],T([104,22])[0],T([104,22])[1],{...fbs,bend:26*s});
  if(lab){g+=kitLabel(H[0],H[1]+3.5,'hypothalamus',{a:'m'})+kitLabel(P[0]+20*s,P[1]+3.5,'pituitary',{})+kitLabel(Ad[0]-22*s,Ad[1]-6*s,'adrenal',{a:'e'})+kitLabel(K[0]+2*s,K[1]+4,'kidney',{a:'m'});
    g+=`<text x="${f1(T([36,64])[0])}" y="${f1(T([36,64])[1]+3)}" class="t-xs t-end">CRH</text><text x="${f1(T([36,120])[0])}" y="${f1(T([36,120])[1]+3)}" class="t-xs t-end">ACTH</text><text x="${f1(T([114,176])[0])}" y="${f1(T([114,176])[1]+4)}" class="t-xs">cortisol</text><text x="${f1(T([150,62])[0])}" y="${f1(T([150,62])[1])}" class="t-xs t-end">feedback</text>`}
  return {svg:g,at:{hypo:H,pit:P,adrenal:Ad,kidney:K,cortisol:C,feedback:T([134,84])},w:150*s,h:220*s}}

/* ---- people and things ---- */
function person(x,y,s=100,o={}){const k=s/100,col=o.col||'var(--figure)',line=o.line||'var(--figure-line)',lw=Math.max(.8,1.1*k),op=o.op==null?1:o.op;
  if(o.pose==='sit'){const fl=o.flip?-1:1,P=(px,py)=>[x+fl*px*k,y+py*k];
    const rect=(x0,y0,x1,y1,r,rot)=>{const a=P(x0,y0),b=P(x1,y1),rx=Math.min(a[0],b[0]),ry=a[1],w=Math.abs(b[0]-a[0]),h=b[1]-a[1];return `x="${f1(rx)}" y="${f1(ry)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(r*k)}"${rot?` transform="rotate(${f1(fl*rot[0])} ${f1(P(rot[1],rot[2])[0])} ${f1(P(rot[1],rot[2])[1])})"`:''}`};
    const parts=[rect(-3.5,15,3.5,24,3),rect(-9,20,9,60,8.5),rect(-7,47,31,62,7.5),rect(19,50,31.5,97,6.2),rect(19,89.5,41,99,4.7),rect(-4.5,24,5.5,49,5),rect(-3,39,6.6,62,4.8,[-68,1.8,43.8])];
    const hd=P(1,8.5);let g=`<g style="opacity:${op}">`;
    if(o.chair!==false){const a=P(-15,22),b=P(-15,64),c=P(34,64);g+=`<path d="M${f1(a[0])} ${f1(a[1])}V${f1(P(0,99.5)[1])}M${f1(b[0])} ${f1(b[1])}H${f1(c[0])}M${f1(P(29,64)[0])} ${f1(b[1])}V${f1(P(0,99.5)[1])}" style="fill:none;stroke:var(--device);stroke-width:${f1(Math.max(1.4,2.6*k))};stroke-linecap:round;stroke-linejoin:round"/>`}
    /* outlines first, then the fills on top: one clean silhouette */
    parts.forEach(p=>{g+=`<rect ${p} style="fill:${col};stroke:${line};stroke-width:${f1(lw*2)}"/>`});g+=`<circle cx="${f1(hd[0])}" cy="${f1(hd[1])}" r="${f1(8.5*k)}" style="fill:${col};stroke:${line};stroke-width:${f1(lw*2)}"/>`;
    parts.forEach(p=>{g+=`<rect ${p} style="fill:${col}"/>`});g+=`<circle cx="${f1(hd[0])}" cy="${f1(hd[1])}" r="${f1(8.5*k)}" style="fill:${col}"/>`;
    return {svg:g+'</g>',at:{head:hd,chest:P(0,34),hand:P(24,46),hip:P(0,56),foot:P(30,99)},w:56*k}}
  const w=.22,kidF=!!o.kid,hr=kidF?11:8.5,hy=kidF?11.5:9,by=kidF?(v=>22+(v-19)*.82):(v=>v),bx=kidF?.9:1,B=(px,py)=>[px*bx,by(py)];
  const half=[B(3.6,18.5),B(11+3*w,23),B(9.5+5.5*w,31),B(8.6+9.4*w,45),B(10+9.6*w,54),B(9.6+8.4*w,64),B(6.4+3.6*w,77),B(5.4+3*w,86),B(4.2+1.4*w,95),B(6.6+1.4*w,99.4),B(1.6+.6*w,99.6),B(1.8+.7*w,95),B(2.3+1.5*w,78),B(1.4+1.3*w,66),B(0,61+1.5*w)];
  const full=[...half,...half.slice(0,-1).reverse().map(p=>[-p[0],p[1]])].map(p=>[x+p[0]*k,y+p[1]*k]);
  const arm=sg=>[B(11.4+3*w,22.6),B(13.6+5.6*w,31),B(14.6+7.4*w,45),B(14+6.2*w,57),B(13.4+5.6*w,62.6),B(11.2+5*w,62.2),B(11.2+5.4*w,56),B(11.6+6.4*w,45),B(10.4+5.6*w,32)].map(p=>[x+sg*p[0]*k,y+p[1]*k]);
  const st=`fill:${col};stroke:${line};stroke-width:${f1(lw)};stroke-linejoin:round`;
  let g=`<g style="opacity:${op}"><path d="${smoothPath(arm(1))}" style="${st}"/><path d="${smoothPath(arm(-1))}" style="${st}"/><path d="${smoothPath(full)}" style="${st}"/><circle cx="${f1(x)}" cy="${f1(y+hy*k)}" r="${f1(hr*k)}" style="${st}"/></g>`;
  const P=(px,py)=>[x+px*k,y+by(py)*k];
  return {svg:g,at:{head:[x,y+hy*k],chest:P(0,32),hand:P(14.6,60),hip:P(0,56),foot:P(0,99)},w:2*(14.6+7.4*w)*k}}

function pill(x,y,s=30,o={}){const col=o.col||'var(--pill)',r=s*.21,lw=Math.max(1,s*.045);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang==null?-28:o.ang)})" style="opacity:${o.op==null?1:o.op}">`;
  if(o.kind==='tablet'){const R=s*.42;g+=`<ellipse rx="${f1(R)}" ry="${f1(R*.8)}" style="fill:var(--panel);stroke:${col};stroke-width:${f1(lw)}"/><path d="M${f1(-R*.62)} 0H${f1(R*.62)}" style="stroke:${col};stroke-width:${f1(lw)};stroke-linecap:round"/>`}
  else{const h=s/2;g+=`<path d="M0 ${f1(-r)}H${f1(h-r)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(h-r)} ${f1(r)}H0Z" style="fill:var(--panel);stroke:${col};stroke-width:${f1(lw)};stroke-linejoin:round"/><path d="M0 ${f1(-r)}H${f1(-h+r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(-h+r)} ${f1(r)}H0Z" style="fill:${col};stroke:${col};stroke-width:${f1(lw)};stroke-linejoin:round"/><path d="M${f1(-h+r)} ${f1(-r*.45)}H${f1(-r*.6)}" style="stroke:var(--panel);stroke-width:${f1(lw)};stroke-linecap:round;opacity:.55"/>`}
  return {svg:g+'</g>',at:{c:[x,y]}}}

function talkIcon(x,y,s=34,o={}){const col=o.col||'var(--tx)',k=s/34,lw=Math.max(1.2,1.6*k);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k*10)/10})" style="opacity:${o.op==null?1:o.op}">`;
  g+=`<path d="M-15 -11h17a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-9l-6 5.5v-5.5h-2a4 4 0 0 1 -4 -4v-8a4 4 0 0 1 4 -4z" style="fill:${col};stroke:${col};stroke-width:${f1(lw/k)};stroke-linejoin:round"/>`;
  g+=`<path d="M0 -2h13a4 4 0 0 1 4 4v7a4 4 0 0 1 -4 4h-1v5l-5.5 -5h-6.5a4 4 0 0 1 -4 -4v-7a4 4 0 0 1 4 -4z" style="fill:var(--panel);stroke:${col};stroke-width:${f1(lw/k)};stroke-linejoin:round"/>`;
  g+=`<path d="M-11 -5.5h9M-11 -1.5h5" style="stroke:var(--panel);stroke-width:1.5;stroke-linecap:round;opacity:.8"/><path d="M1.5 4.2h9.5M1.5 8h6" style="stroke:${col};stroke-width:1.5;stroke-linecap:round"/>`;
  return {svg:g+'</g>',at:{c:[x,y]}}}

function tmsCoil(x,y,s=80,o={}){const ang=(o.ang||0)*Math.PI/180,ca=Math.cos(ang),sa=Math.sin(ang),G=(px,py)=>[x+px*ca-py*sa,y+px*sa+py*ca],pu=clamp(o.pulse||0),R=s*.25,d=s*.235,lw=Math.max(2,s*.06);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})" style="opacity:${o.op==null?1:o.op}">`;
  if(o.handle!==false)g+=`<path d="M0 ${f1(-R*.3)}V${f1(-s*.62)}" style="stroke:var(--device);stroke-width:${f1(s*.11)};stroke-linecap:round"/><path d="M0 ${f1(-R*.5)}V${f1(-s*.6)}" style="stroke:var(--panel);stroke-width:${f1(s*.025)};stroke-linecap:round;opacity:.5"/>`;
  [-1,1].forEach(sd=>{g+=`<circle cx="${f1(sd*d)}" cy="0" r="${f1(R)}" style="fill:var(--panel-2);stroke:var(--coil);stroke-width:${f1(lw)}"/><circle cx="${f1(sd*d)}" cy="0" r="${f1(R*.62)}" style="fill:none;stroke:var(--coil);stroke-width:${f1(lw*.45)};opacity:.7"/><circle cx="${f1(sd*d)}" cy="0" r="${f1(R*.3)}" style="fill:var(--panel);stroke:var(--coil);stroke-width:${f1(lw*.4)};opacity:.8"/>`});
  if(pu>0)for(let i=0;i<3;i++){const r=R*(.5+i*.42),yy=R*.55;g+=`<path d="M${f1(-r)} ${f1(yy)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(r)} ${f1(yy)}" style="fill:none;stroke:var(--accent);stroke-width:${f1(Math.max(1.4,s*.028))};stroke-linecap:round;stroke-dasharray:${i?'3 3':'none'};opacity:${f1(pu*(1-i*.25))}"/>`}
  return {svg:g+'</g>',at:{c:[x,y],focus:G(0,R*1.5),handle:G(0,-s*.62)}}}

function sunArc(x,y,w,h,o={}){const id=kid('sa'),nt=o.night===true?1:clamp(o.night||0),ht=clamp(o.height==null?.8:o.height),p=o.pos==null?.5:o.pos,rr=rng(o.seed||3);
  const gr=Math.max(6,h*.14),yh=y+h-gr,cx=x+w/2,rx=w*.42,ry=(yh-y-Math.max(8,h*.12))*lerp(.3,1,ht),r=o.r||Math.max(5,Math.min(w,h)*.09);
  const sx=cx-rx*Math.cos(Math.PI*p),sy=yh-ry*Math.sin(Math.PI*p);
  let g=`<defs><clipPath id="${id}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="8"/></clipPath></defs><g clip-path="url(#${id})">`;
  g+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--field)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--sun);opacity:${f1(.16*(1-nt))}"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--night);opacity:${f1(.3*nt)}"/>`;
  g+=`<path d="M${f1(cx-rx)} ${f1(yh)}A${f1(rx)} ${f1(ry)} 0 0 1 ${f1(cx+rx)} ${f1(yh)}" style="fill:none;stroke:var(--sun);stroke-width:1.4;stroke-dasharray:3 4;opacity:.9"/>`;
  if(nt>0){for(let i=0;i<7;i++){const px=x+w*(.08+rr()*.84),py=y+(yh-y)*(.1+rr()*.6);g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(1+rr()*.8)}" style="fill:var(--sun);opacity:${f1(nt)}"/>`}
    const mx=x+w*.78,my=y+(yh-y)*.3,mr=r*.9;g+=`<path d="M${f1(mx)} ${f1(my-mr)}A${f1(mr)} ${f1(mr)} 0 1 0 ${f1(mx+mr)} ${f1(my)}A${f1(mr*.78)} ${f1(mr*.78)} 0 0 1 ${f1(mx)} ${f1(my-mr)}Z" style="fill:var(--sun);opacity:${f1(nt)}"/>`}
  let sun=`<circle cx="${f1(sx)}" cy="${f1(sy)}" r="${f1(r)}" style="fill:var(--sun);stroke:var(--panel);stroke-width:1.2"/>`;
  if(o.rays!==false)for(let i=0;i<8;i++){const a=i/8*Math.PI*2;sun+=`<path d="M${f1(sx+Math.cos(a)*r*1.45)} ${f1(sy+Math.sin(a)*r*1.45)}L${f1(sx+Math.cos(a)*r*1.95)} ${f1(sy+Math.sin(a)*r*1.95)}" style="stroke:var(--sun);stroke-width:${f1(Math.max(1.4,r*.22))};stroke-linecap:round"/>`}
  g+=`<g style="opacity:${f1(1-nt*.85)}">${sun}</g>`;
  g+=`<rect x="${f1(x)}" y="${f1(yh)}" width="${f1(w)}" height="${f1(gr)}" style="fill:var(--panel-2)"/><path d="M${f1(x)} ${f1(yh)}H${f1(x+w)}" style="stroke:var(--figure-line);stroke-width:1.4"/></g>`;
  if(o.frame!==false)g+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="8" style="fill:none;stroke:var(--line)"/>`;
  return {svg:g,at:{sun:[sx,sy],horizon:[x,yh,x+w],c:[cx,yh]}}}

function clock24(cx,cy,r,o={}){const P=(h,rr=r)=>{const a=(h/24)*2*Math.PI-Math.PI/2;return [cx+rr*Math.cos(a),cy+rr*Math.sin(a)]};
  const arc=(h0,h1,rr)=>{let d=((h1-h0)%24+24)%24;if(d===0)d=23.99;const p0=P(h0,rr),p1=P(h0+d,rr);return `M${f1(p0[0])} ${f1(p0[1])}A${f1(rr)} ${f1(rr)} 0 ${d>12?1:0} 1 ${f1(p1[0])} ${f1(p1[1])}`};
  const rw=r*.22,rm=r-rw/2;let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--line);stroke-width:1.2"/>`;
  if(o.sleep){const [b,w]=o.sleep;s+=`<path d="${arc(w,b,rm)}" style="fill:none;stroke:var(--sun);stroke-width:${f1(rw)};opacity:.75"/><path d="${arc(b,w,rm)}" style="fill:none;stroke:var(--night);stroke-width:${f1(rw)}"/>`}
  else s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(rm)}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(rw)}"/>`;
  (o.arcs||[]).forEach(a=>{s+=`<path d="${arc(a.from,a.to,rm)}" style="fill:none;stroke:${a.col||'var(--brand)'};stroke-width:${f1(rw)};opacity:${a.op==null?1:a.op}"/>`});
  for(let h=0;h<24;h++){const a=P(h,r-rw-2),c=P(h,r-rw-(h%6?4:7));s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(c[0])}" y2="${f1(c[1])}" class="axis" style="stroke:var(--muted)"/>`}
  if(!o.small)[0,6,12,18].forEach(h=>{const p=P(h,r-rw-15);s+=`<text x="${f1(p[0])}" y="${f1(p[1]+3.5)}" class="t-xs t-mid">${String(h).padStart(2,'0')}</text>`});
  (o.marks||[]).forEach(m=>{const p=P(m.h,rm),q=P(m.h,r+11);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(Math.max(3,rw*.42))}" style="fill:${m.col||'var(--accent)'};stroke:var(--panel);stroke-width:1.4"/>`;
    if(m.label)s+=`<text x="${f1(q[0])}" y="${f1(q[1]+3.5)}" class="t-xs${Math.abs(q[0]-cx)<r*.3?' t-mid':q[0]<cx?' t-end':''}">${m.label}</text>`});
  if(o.h!=null){const p=P(o.h,r-rw-4);s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="3" style="fill:var(--ink)"/>`}
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+r+15)}" class="t-xs t-mid">${o.label}</text>`;
  return {svg:s,P}}

/* ---- charts ---- */
function moodLine(x,y,w,h,pts,o={}){const well=o.well||[.58,.92],up=o.upto==null?1:clamp(o.upto),lw=o.lw||2.8,id=kid('ml'),X=u=>x+w*u,Y=v=>y+h*(1-v);
  const P=(pts||[]).slice().sort((a,b)=>a[0]-b[0]),f=P.length>2&&o.smooth!==false?monoFn(P):(u=>{if(!P.length)return 0;if(u<=P[0][0])return P[0][1];for(let i=1;i<P.length;i++)if(u<=P[i][0])return lerp(P[i-1][1],P[i][1],(u-P[i-1][0])/((P[i][0]-P[i-1][0])||1));return P[P.length-1][1]});
  const yT=Y(well[0]),yH=Y(well[1]);let s='';
  if(o.frame!==false)s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="6" style="fill:var(--field)"/>`;
  if(o.band!==false)s+=`<rect x="${f1(x)}" y="${f1(yH)}" width="${f1(w)}" height="${f1(yT-yH)}" style="fill:var(--mood);opacity:.13"/><path d="M${f1(x)} ${f1(yT)}H${f1(x+w)}" style="stroke:var(--mood);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`;
  if(o.wellLabel)s+=`<text x="${f1(x+6)}" y="${f1(yH+12)}" class="t-xs">${o.wellLabel}</text>`;
  if(o.lowLabel)s+=`<text x="${f1(x+6)}" y="${f1(y+h-6)}" class="t-xs">${o.lowLabel}</text>`;
  if(o.frame!==false)s+=`<path d="M${f1(x)} ${f1(y+h)}H${f1(x+w)}" class="axis"/>`;
  let end=null;
  if(P.length){const u0=P[0][0],u1=Math.min(P[P.length-1][0],Math.max(u0,up)),N=Math.max(2,Math.round(140*(u1-u0)));let d='';
    for(let i=0;i<=N;i++){const u=lerp(u0,u1,i/N),px=X(u),py=Y(f(u));d+=(i?'L':'M')+f1(px)+' '+f1(py);end=[px,py]}
    s+=`<defs><clipPath id="${id}a"><rect x="${f1(x-6)}" y="${f1(y-8)}" width="${f1(w+12)}" height="${f1(yT-y+8)}"/></clipPath><clipPath id="${id}b"><rect x="${f1(x-6)}" y="${f1(yT)}" width="${f1(w+12)}" height="${f1(y+h+8-yT)}"/></clipPath></defs>`;
    const st=`fill:none;stroke-width:${lw};stroke-linejoin:round;stroke-linecap:round`;
    s+=`<path d="${d}" clip-path="url(#${id}b)" style="${st};stroke:var(--mood-low)"/><path d="${d}" clip-path="url(#${id}a)" style="${st};stroke:var(--mood)"/>`;
    (o.markers||[]).forEach(m=>{if(m.u>u1+1e-6)return;const px=X(m.u),py=Y(f(m.u)),c=m.col||'var(--ink)';
      if(m.line!==false)s+=`<path d="M${f1(px)} ${f1(y+12)}V${f1(y+h)}" style="stroke:${c};stroke-width:1;stroke-dasharray:2 3;opacity:.7"/>`;
      s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3.6" style="fill:${c};stroke:var(--panel);stroke-width:1.5"/>`;
      if(m.label)s+=kitLabel(clamp(px,x+4,x+w-4),y+9,m.label,{a:px>x+w*.8?'e':px<x+w*.2?'':'m',halo:'var(--field)'})});
    if(o.dot&&end)s+=`<circle cx="${f1(end[0])}" cy="${f1(end[1])}" r="4.6" style="fill:${end[1]<=yT+.01?'var(--mood)':'var(--mood-low)'};stroke:var(--panel);stroke-width:2"/>`}
  return {svg:s,X,Y,f,end}}

function axes(x,y,w,h,o={}){const x0=o.x0||0,x1=o.x1==null?1:o.x1,y0=o.y0||0,y1=o.y1==null?1:o.y1,xf=o.xfmt||(v=>v),yf=o.yfmt||(v=>v);
  const X=v=>x+w*(v-x0)/(x1-x0),Y=v=>y+h-h*(v-y0)/(y1-y0);
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--field)"/>`;
  (o.yt||[]).forEach(v=>{const yy=Y(v);if(o.grid!==false)s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(yy)}" y2="${f1(yy)}" class="grid"/>`;s+=`<text x="${f1(x-6)}" y="${f1(yy+3.5)}" class="t-xs t-end">${yf(v)}</text>`});
  (o.xt||[]).forEach(v=>{const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(y+h)}" y2="${f1(y+h+4)}" class="axis"/><text x="${f1(xx)}" y="${f1(y+h+16)}" class="t-xs t-mid">${xf(v)}</text>`});
  s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y+h)}" y2="${f1(y+h)}" class="axis"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y+h)}" class="axis"/>`;
  if(o.xlabel)s+=`<text x="${f1(x+w)}" y="${f1(y+h+30)}" class="t-xs t-end">${o.xlabel}</text>`;
  if(o.ylabel)s+=`<text x="${f1(x)}" y="${f1(y-8)}" class="t-xs">${o.ylabel}</text>`;
  return {svg:s,X,Y}}
function curve(P,X,Y,o={}){if(!P||!P.length)return {svg:'',end:null};const col=o.col||'var(--brand)';let Q=P.slice();
  const f=o.smooth&&P.length>2?monoFn(P):null;
  if(f){Q=[];const a=P[0][0],b=P[P.length-1][0];for(let i=0;i<=80;i++){const v=lerp(a,b,i/80);Q.push([v,f(v)])}}
  if(o.upto!=null){const u=o.upto,out=[];for(let i=0;i<Q.length;i++){if(Q[i][0]<=u)out.push(Q[i]);else{if(i>0){const p=Q[i-1],q=Q[i],t=(u-p[0])/((q[0]-p[0])||1);out.push([u,lerp(p[1],q[1],t)])}break}}Q=out}
  if(!Q.length)return {svg:'',end:null};
  const pts=Q.map(p=>[X(p[0]),Y(p[1])]);let s='';
  if(o.fill){const b=Y(o.base==null?0:o.base);s+=`<path d="${ptsD(pts)}L${f1(pts[pts.length-1][0])} ${f1(b)}L${f1(pts[0][0])} ${f1(b)}Z" style="fill:${col};opacity:.15"/>`}
  s+=`<path d="${ptsD(pts)}" style="fill:none;stroke:${col};stroke-width:${o.lw||2.6};stroke-linejoin:round;stroke-linecap:round${o.dash?';stroke-dasharray:'+o.dash:''}"/>`;
  const e=pts[pts.length-1];if(o.dot)s+=`<circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="4.5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`;
  return {svg:s,end:e}}
function iconArray(x,y,n=100,o={}){const c=o.cols||10,sz=o.size||12,gp=o.gap==null?3:o.gap,base=o.base||'var(--figure)';
  const groups=o.groups||[{k:o.k||0,col:o.col||'var(--brand)'}];const colOf=i=>{let acc=0;for(const g of groups){acc+=g.k;if(i<acc)return g.col}return base};
  const at=i=>[x+(i%c)*(sz+gp),y+Math.floor(i/c)*(sz+gp*1.4)];let s='';
  for(let i=0;i<n;i++){const[px,py]=at(i),f=colOf(i);
    if(o.shape==='dot')s+=`<circle cx="${f1(px+sz/2)}" cy="${f1(py+sz/2)}" r="${f1(sz*.42)}" style="fill:${f}"/>`;
    else{const r=sz*.18;s+=`<circle cx="${f1(px+sz/2)}" cy="${f1(py+r)}" r="${f1(r)}" style="fill:${f}"/><path d="M${f1(px+sz*.22)} ${f1(py+sz)}V${f1(py+sz*.62)}Q${f1(px+sz*.22)} ${f1(py+sz*.42)} ${f1(px+sz/2)} ${f1(py+sz*.42)}Q${f1(px+sz*.78)} ${f1(py+sz*.42)} ${f1(px+sz*.78)} ${f1(py+sz*.62)}V${f1(py+sz)}Z" style="fill:${f}"/>`}}
  return {svg:s,h:Math.ceil(n/c)*(sz+gp*1.4),w:c*(sz+gp)-gp,at}}
