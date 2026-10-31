<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('tbc:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('tbc:'+k,JSON.stringify(v))}catch(e){}}};
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
   (or an object with .svg) to concatenate into an <svg>'s innerHTML. Sizes are in viewBox units.
   bacillus(x,y,len,ang,o)  one M. tuberculosis rod (a rounded capsule, carbol-fuchsin magenta, --tb) centred on
                            x,y, len long, rotated ang degrees. o: {w (thickness, default len*.3), dead (outline only,
                            faded), dormant (paler), res (true: a resistant mutant, drawn in --warn with a ring)}.
   clump(x,y,n,r,o)         n bacilli scattered in a radius r around x,y (seeded, so a redraw is stable).
                            o: {len, seed, dead:k (the first k drawn dead), res:k (the first k resistant), cord (true: rods
                            lined up end to end in a serpentine cord, as in a smear)}.
   droplet(x,y,r,o)         an airborne droplet nucleus (pale blue disc); o: {bac (true: carries a rod), op}.
   macrophage(x,y,r,o)      a macrophage: a wobbly amoeboid cell with a nucleus. o: {bac (n rods inside), kind:
                            'resting'|'epithelioid' (elongated, pale)|'giant' (Langhans: 1.6x, nuclei in a horseshoe)|
                            'foamy' (lipid vacuoles), seed, op}.
   tcell(x,y,r,o)           a small round lymphocyte (big nucleus, little cytoplasm); o: {op, act (true: IFN-γ dots)}.
   granuloma(x,y,r,stage,o) a granuloma in section, outer radius r. stage 0..1: 0 a loose cluster of macrophages,
                            .35 organised (epithelioid ring, giant cells, lymphocyte cuff), .6 caseous necrosis in the
                            centre, .8 fibrous capsule, 1 the centre liquefies and opens upward into an airway (a cavity).
                            o: {bac (rods in the centre), calc (0..1 calcifies the centre instead of opening), loose (0..1
                            disorganises it, as when TNF is blocked or CD4 cells are lost), seed}.
   alveolus(x,y,r,o)        a cluster of five air sacs with a capillary along its edge; r = outer radius.
                            Returns {svg, sacs:[[cx,cy,rr],...]} so cells can be placed inside a sac.
   lung(x,y,s,o)            both lungs, frontal (anatomical) view: the patient's right lung on the viewer's left, trachea
                            and main bronchi, heart notch on the left lung. s = scale (1 = 200 wide, 200 tall).
                            o: {hl:'upper'|'lower'|'right'|'left' (shades a zone), lesions:[{side:'R'|'L',u,v,r,kind:
                            'cavity'|'nodule'|'infiltrate'|'miliary'|'effusion'|'node'}], xray (true: dark film look)}.
                            Returns {svg, at(side,u,v)->[x,y]}: u 0 medial..1 lateral, v 0 apex..1 base.
   person(x,y,s,fill,o)     a person pictogram for icon arrays and scenes (s = height). o: {op, cough (arcs at the mouth,
                            facing o.face=1 right or -1 left), mask (a surgical mask), n95 (a respirator)}.
   pill(x,y,s,col,o)        a capsule (or o.tab: a round tablet) of length s in CSS colour col, rotated o.ang;
                            o.label: a letter drawn on it (when s >= 16). Drug colours: --dH --dR --dZ --dE --dNew.
   blister(x,y,cols,rows,taken,o)  a blister pack / dose calendar: cols x rows pockets of size o.s (default 14); the
                            first `taken` pockets are empty (dose taken, ticked), the rest hold a pill of o.col; o.miss:
                            [indices] drawn as missed doses (--bad outline).
   forearm(x,y,w,ind,o)     the inner forearm for a tuberculin skin test, w wide (120 mm long), induration ind mm drawn to
                            scale; o: {ery (mm of redness, drawn faint and NOT measured), bleb (0..1 the injection
                            bleb), ruler (true: a mm ruler under the induration)}.
   sputum(x,y,s,o)          a sputum specimen cup with a lid; o: {fill (0..1), label}.
   marker(id,color)         an arrowhead <marker> for <defs>.
   blob(x,y,r,seed,sx,sy,N,j)  helper: a smooth wobbly closed path (cells, lesions); returns a path d string. */
function bacillus(x,y,len=10,ang=0,o={}){const w=o.w||len*.3,op=o.dead?.4:o.dormant?.55:1,col=o.res?'var(--warn)':'var(--tb)';
  let g=`<rect x="${f1(x-len/2)}" y="${f1(y-w/2)}" width="${f1(len)}" height="${f1(w)}" rx="${f1(w/2)}" transform="rotate(${f1(ang)} ${f1(x)} ${f1(y)})" style="fill:${o.dead?'none':col};stroke:${col};stroke-width:${o.dead?1:.6};opacity:${op}"/>`;
  if(o.res)g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(len*.62)}" style="fill:none;stroke:var(--warn);stroke-width:.9;stroke-dasharray:2 2"/>`;
  return g}
function clump(x,y,n=8,r=12,o={}){const rr=rng(o.seed||11),len=o.len||8;let g='';
  for(let i=0;i<n;i++){let px,py,a;
    if(o.cord){const k=i/(Math.max(1,n-1));px=x-r+2*r*k;py=y+Math.sin(k*Math.PI*2)*r*.35;a=Math.atan2(Math.cos(k*Math.PI*2)*r*.35*Math.PI*2,2*r)*180/Math.PI+(rr()-.5)*14}
    else{const t=rr()*Math.PI*2,d=Math.sqrt(rr())*r;px=x+Math.cos(t)*d;py=y+Math.sin(t)*d;a=rr()*180}
    g+=bacillus(px,py,len,a,{dead:i<(o.dead||0),res:i>=(o.dead||0)&&i<(o.dead||0)+(o.res||0)})}
  return g}
function droplet(x,y,r=4,o={}){let g=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--air);fill-opacity:.28;stroke:var(--air);stroke-width:.8;opacity:${o.op==null?1:o.op}"/>`;
  if(o.bac)g+=bacillus(x,y,r*1.3,35,{w:r*.45});return g}
function blob(x,y,r,seed,sx=1,sy=1,N=14,j=.22){const rr=rng(seed);const P=[];for(let i=0;i<N;i++){const a=i/N*Math.PI*2,k=1+(rr()-.5)*j*2;P.push([x+Math.cos(a)*r*k*sx,y+Math.sin(a)*r*k*sy])}
  let d=`M${f1((P[0][0]+P[N-1][0])/2)} ${f1((P[0][1]+P[N-1][1])/2)}`;for(let i=0;i<N;i++){const p=P[i],q=P[(i+1)%N];d+=`Q${f1(p[0])} ${f1(p[1])} ${f1((p[0]+q[0])/2)} ${f1((p[1]+q[1])/2)}`}return d+'Z'}
function macrophage(x,y,r=14,o={}){const kind=o.kind||'resting',seed=o.seed||3,rr=rng(seed+7);
  const R=kind==='giant'?r*1.6:r,sx=kind==='epithelioid'?1.35:1,sy=kind==='epithelioid'?.72:1;
  let g=`<g style="opacity:${o.op==null?1:o.op}"><path d="${blob(x,y,R,seed,sx,sy,kind==='epithelioid'?10:14,kind==='epithelioid'?.1:.24)}" style="fill:var(--mac);fill-opacity:${kind==='epithelioid'?.7:.9};stroke:var(--mac-line);stroke-width:1.1"/>`;
  if(kind==='foamy')for(let i=0;i<6;i++){const a=rr()*Math.PI*2,d=R*(.35+rr()*.4);g+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" r="${f1(R*.13)}" style="fill:var(--field);stroke:var(--mac-line);stroke-width:.5"/>`}
  if(kind==='giant'){for(let i=0;i<9;i++){const a=Math.PI*(.15+i/8*.7)+Math.PI*.5,d=R*.66;g+=`<ellipse cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" rx="${f1(R*.1)}" ry="${f1(R*.14)}" style="fill:var(--nuc);opacity:.8"/>`}}
  else g+=`<ellipse cx="${f1(x-R*.18*sx)}" cy="${f1(y+R*.05)}" rx="${f1(R*.34*sx)}" ry="${f1(R*.27*sy)}" style="fill:var(--nuc);opacity:.75"/>`;
  const n=o.bac||0;for(let i=0;i<n;i++){const a=rr()*Math.PI*2,d=R*.25+rr()*R*.38;g+=bacillus(x+R*.15+Math.cos(a)*d*.8,y+Math.sin(a)*d*.75*sy,R*.34,rr()*180)}
  return g+'</g>'}
function tcell(x,y,r=5,o={}){let g=`<g style="opacity:${o.op==null?1:o.op}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--tcell);fill-opacity:.35;stroke:var(--tcell);stroke-width:.9"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.7)}" style="fill:var(--tcell)"/>`;
  if(o.act)for(let i=0;i<4;i++){const a=i*Math.PI/2+.6;g+=`<circle cx="${f1(x+Math.cos(a)*r*1.6)}" cy="${f1(y+Math.sin(a)*r*1.6)}" r="${f1(r*.22)}" style="fill:var(--tcell)"/>`}
  return g+'</g>'}
function granuloma(x,y,r=60,stage=1,o={}){const k=clamp(stage),loose=clamp(o.loose||0),calc=clamp(o.calc||0),rr=rng(o.seed||21);
  const jig=()=>(rr()-.5)*r*.22*loose;let g='';
  /* fibrous capsule */
  const cap=ramp(k,.6,.85)*(1-loose*.8);
  if(cap>0)g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--fibro);fill-opacity:${f1(.18*cap)};stroke:var(--fibro);stroke-width:${f1(1+3*cap)};opacity:${f1(.4+.6*cap)}"/>`;
  /* lymphocyte cuff */
  const nl=Math.round(ramp(k,.15,.45)*22);for(let i=0;i<nl;i++){const a=i/22*Math.PI*2+rr()*.12,d=r*(.84+rr()*.08);g+=tcell(x+Math.cos(a)*d+jig(),y+Math.sin(a)*d+jig(),r*.055)}
  /* macrophages: loose cluster early, an epithelioid ring later */
  const org=ramp(k,.1,.4)*(1-loose);
  const nm=10;for(let i=0;i<nm;i++){const a=i/nm*Math.PI*2+.3,d=lerp(r*(.15+rr()*.45),r*.6,org);
    g+=macrophage(x+Math.cos(a)*d+jig(),y+Math.sin(a)*d+jig(),r*.12,{kind:org>.5?'epithelioid':'resting',seed:i+3,bac:k<.3?1:0})}
  if(org>.3){[[-.8,-.25],[.7,.45]].forEach(([u,v],i)=>{g+=macrophage(x+u*r*.42,y+v*r*.42,r*.11,{kind:'giant',seed:30+i,op:ramp(org,.3,.7)})})}
  /* caseous centre, then a cavity or a calcified core */
  const cs=ramp(k,.45,.7);
  if(cs>0){const cr=r*.36*cs;
    if(k>.85&&calc<.5){const op=ramp(k,.85,1);
      g+=`<path d="${blob(x,y,cr,9,1,1,12,.2)}" style="fill:var(--caseum);stroke:var(--mac-line);stroke-width:.8"/>`;
      g+=`<path d="M${f1(x-cr*.5)} ${f1(y-cr*.2)}L${f1(x-r*.18*op)} ${f1(y-r*1.05)}L${f1(x+r*.18*op)} ${f1(y-r*1.05)}L${f1(x+cr*.5)} ${f1(y-cr*.2)}Z" style="fill:var(--field);opacity:${f1(op)}"/>`;
      g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(cr*.75*op)}" style="fill:var(--field)"/>`;
    }else g+=`<path d="${blob(x,y,cr,9,1,1,12,.2)}" style="fill:${calc>0?'var(--fibro)':'var(--caseum)'};fill-opacity:${calc>0?f1(.4+.6*calc):1};stroke:var(--mac-line);stroke-width:.8"/>`;
    if(calc>0)for(let i=0;i<10;i++){const a=rr()*Math.PI*2,d=rr()*cr*.8;g+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" r="${f1(1.2)}" style="fill:var(--ink);opacity:${f1(.35*calc)}"/>`}
    const nb=o.bac==null?Math.round(6*cs):o.bac;if(nb)g+=clump(x,y,nb,cr*.7,{len:r*.09,seed:5})}
  return g}
function alveolus(x,y,r=40,o={}){const rr=r*.42,sacs=[];let g=`<path d="${blob(x,y,r*1.08,4,1,1,12,.12)}" style="fill:var(--lung);fill-opacity:.55;stroke:var(--lung-line);stroke-width:1"/>`;
  [[0,-.45],[-.5,-.1],[.5,-.1],[-.28,.45],[.3,.45]].forEach(([u,v])=>{const cx=x+u*r,cy=y+v*r;sacs.push([cx,cy,rr]);
    g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(rr)}" style="fill:var(--field);stroke:var(--lung-line);stroke-width:1.8"/>`});
  g+=`<path d="M${f1(x-r*1.05)} ${f1(y+r*.2)}Q${f1(x-r*.9)} ${f1(y+r*1.05)} ${f1(x)} ${f1(y+r*1.02)}T${f1(x+r*1.05)} ${f1(y+r*.15)}" style="fill:none;stroke:var(--blood);stroke-width:2.2;opacity:.55"/>`;
  g+=`<path d="M${f1(x-r*.08)} ${f1(y-r*.86)}V${f1(y-r*1.3)}M${f1(x+r*.08)} ${f1(y-r*.86)}V${f1(y-r*1.3)}" style="stroke:var(--lung-line);stroke-width:1.4"/>`;
  return {svg:g,sacs}}
function lung(x,y,s=1,o={}){const X=v=>x+v*s,Y=v=>y+v*s;
  const R=`M${X(92)} ${Y(42)}C${X(62)} ${Y(26)} ${X(30)} ${Y(40)} ${X(18)} ${Y(92)}C${X(8)} ${Y(132)} ${X(6)} ${Y(176)} ${X(20)} ${Y(190)}C${X(44)} ${Y(199)} ${X(76)} ${Y(193)} ${X(92)} ${Y(181)}Z`;
  const L=`M${X(108)} ${Y(42)}C${X(138)} ${Y(26)} ${X(170)} ${Y(40)} ${X(182)} ${Y(92)}C${X(192)} ${Y(132)} ${X(194)} ${Y(176)} ${X(180)} ${Y(190)}C${X(160)} ${Y(198)} ${X(136)} ${Y(195)} ${X(122)} ${Y(187)}C${X(128)} ${Y(166)} ${X(122)} ${Y(142)} ${X(108)} ${Y(132)}Z`;
  const fill=o.xray?'var(--ink)':'var(--lung)',op=o.xray?.12:.85;
  let g=`<path d="${R}" style="fill:${fill};fill-opacity:${op};stroke:var(--lung-line);stroke-width:1.5"/><path d="${L}" style="fill:${fill};fill-opacity:${op};stroke:var(--lung-line);stroke-width:1.5"/>`;
  /* fissures: horizontal and oblique on the right, oblique on the left */
  g+=`<path d="M${X(90)} ${Y(104)}Q${X(55)} ${Y(100)} ${X(17)} ${Y(108)}M${X(88)} ${Y(66)}Q${X(52)} ${Y(118)} ${X(30)} ${Y(186)}M${X(112)} ${Y(66)}Q${X(150)} ${Y(118)} ${X(170)} ${Y(186)}" style="fill:none;stroke:var(--lung-line);stroke-width:.8;opacity:.6;stroke-dasharray:3 3"/>`;
  if(o.hl){const zones={upper:[[`M${X(10)} ${Y(30)}H${X(190)}V${Y(100)}H${X(10)}Z`]],lower:[[`M${X(10)} ${Y(110)}H${X(190)}V${Y(200)}H${X(10)}Z`]],right:[[`M${X(0)} ${Y(20)}H${X(98)}V${Y(200)}H${X(0)}Z`]],left:[[`M${X(102)} ${Y(20)}H${X(200)}V${Y(200)}H${X(102)}Z`]]};
    const cid='lc'+Math.round(x)+'_'+Math.round(y);g+=`<clipPath id="${cid}"><path d="${R}"/><path d="${L}"/></clipPath>`;
    if(zones[o.hl])g+=`<path d="${zones[o.hl][0][0]}" clip-path="url(#${cid})" style="fill:var(--brand);opacity:.22"/>`}
  /* trachea and bronchi */
  g+=`<path d="M${X(100)} ${Y(0)}V${Y(58)}M${X(100)} ${Y(58)}L${X(80)} ${Y(76)}L${X(62)} ${Y(98)}M${X(80)} ${Y(76)}L${X(70)} ${Y(66)}M${X(100)} ${Y(58)}L${X(122)} ${Y(78)}L${X(140)} ${Y(102)}M${X(122)} ${Y(78)}L${X(132)} ${Y(66)}" style="fill:none;stroke:var(--airway);stroke-width:${f1(Math.max(1.5,6*s))};stroke-linecap:round;stroke-linejoin:round"/>`;
  const at=(side,u,v)=>[side==='R'?X(90-u*72):X(110+u*72),Y(48+v*136)];
  (o.lesions||[]).forEach(l=>{const [px,py]=at(l.side,l.u,l.v),r=(l.r||8)*s;
    if(l.kind==='cavity')g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(r)}" style="fill:var(--field);stroke:var(--tb);stroke-width:${f1(Math.max(1.2,2.4*s))}"/>`;
    else if(l.kind==='nodule'||l.kind==='node')g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(r)}" style="fill:var(--caseum);stroke:var(--mac-line);stroke-width:1"/>`;
    else if(l.kind==='infiltrate')g+=`<path d="${blob(px,py,r,17,1.3,1,10,.35)}" style="fill:var(--tb);opacity:.28"/>`;
    else if(l.kind==='miliary'){const q=rng(29);for(let i=0;i<70;i++){const sd=i%2?'R':'L',[mx,my]=at(sd,.1+q()*.75,.05+q()*.9);g+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="${f1(1.3*Math.max(.6,s))}" style="fill:var(--tb);opacity:.65"/>`}}
    else if(l.kind==='effusion'){const bx=l.side==='R'?X(8):X(122),bw=70*s;g+=`<path d="M${f1(bx)} ${f1(Y(150))}Q${f1(bx+bw/2)} ${f1(Y(162))} ${f1(bx+bw)} ${f1(Y(150))}V${f1(Y(192))}H${f1(bx)}Z" style="fill:var(--air);opacity:.45"/>`}});
  return {svg:g,at}}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17,f=o.face||1;let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/>`;
  if(o.mask||o.n95)g+=`<path d="M${f1(-r*.75)} ${f1(r*1.15)}Q0 ${f1(r*(o.n95?2.1:1.75))} ${f1(r*.75)} ${f1(r*1.15)}Z" style="fill:${o.n95?'var(--panel)':'var(--air)'};stroke:var(--ink);stroke-width:.6"/>`;
  if(o.cough)for(let i=1;i<=3;i++)g+=`<path d="M${f1(f*r*(1.1+i*.45))} ${f1(r*(1.25-i*.28))}q${f1(f*r*.35)} ${f1(r*.28*i/2)} 0 ${f1(r*.56*i/2+r*.1)}" style="fill:none;stroke:var(--muted);stroke-width:${f1(Math.max(.8,s*.025))};stroke-linecap:round"/>`;
  return g+'</g>'}
function pill(x,y,s=12,col='var(--dR)',o={}){const w=s*.42;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})" style="opacity:${o.op==null?1:o.op}">`;
  if(o.tab)g+=`<circle r="${f1(s/2)}" style="fill:${col};stroke:var(--ink);stroke-width:.6;stroke-opacity:.35"/><line x1="${f1(-s*.32)}" x2="${f1(s*.32)}" style="stroke:var(--panel);stroke-width:.9;opacity:.7"/>`;
  else g+=`<rect x="${f1(-s/2)}" y="${f1(-w/2)}" width="${f1(s)}" height="${f1(w)}" rx="${f1(w/2)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:.6;stroke-opacity:.35"/><path d="M0 ${f1(-w/2)}H${f1(-s/2+w/2)}A${f1(w/2)} ${f1(w/2)} 0 0 0 ${f1(-s/2+w/2)} ${f1(w/2)}H0Z" style="fill:${col}"/>`;
  if(o.label&&s>=16)g+=`<text y="${f1(o.tab?3.5:3)}" x="${o.tab?0:f1(s*.22)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${o.label}</text>`;
  return g+'</g>'}
function blister(x,y,cols=7,rows=4,taken=0,o={}){const s=o.s||14,gap=s*.28,col=o.col||'var(--dR)',miss=o.miss||[];
  let g=`<rect x="${f1(x-gap)}" y="${f1(y-gap)}" width="${f1(cols*(s+gap)+gap)}" height="${f1(rows*(s+gap)+gap)}" rx="${f1(gap*1.5)}" style="fill:var(--panel-2);stroke:var(--line)"/>`;
  for(let i=0;i<cols*rows;i++){const cx=x+(i%cols)*(s+gap)+s/2,cy=y+Math.floor(i/cols)*(s+gap)+s/2,m=miss.includes(i);
    g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(s/2)}" style="fill:var(--panel);stroke:${m?'var(--bad)':'var(--line)'};stroke-width:${m?1.6:1}"/>`;
    if(i>=taken&&!m)g+=pill(cx,cy,s*.8,col,{ang:-35});
    else if(!m)g+=`<path d="M${f1(cx-s*.2)} ${f1(cy)}l${f1(s*.14)} ${f1(s*.15)}l${f1(s*.26)} ${f1(-s*.3)}" style="fill:none;stroke:var(--good);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"/>`}
  return g}
function forearm(x,y,w=240,ind=0,o={}){const h=w*.3,mm=w/120,cx=x+w*.55,cy=y+h*.48;
  let g=`<path d="M${f1(x)} ${f1(y+h*.12)}Q${f1(x+w*.5)} ${f1(y-h*.04)} ${f1(x+w)} ${f1(y+h*.02)}V${f1(y+h*.98)}Q${f1(x+w*.5)} ${f1(y+h*1.04)} ${f1(x)} ${f1(y+h*.88)}Z" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.4"/>`;
  g+=`<path d="M${f1(x+w*.08)} ${f1(y+h*.5)}Q${f1(x+w*.45)} ${f1(y+h*.4)} ${f1(x+w*.92)} ${f1(y+h*.55)}" style="fill:none;stroke:var(--vessel);stroke-width:1.2;opacity:.35"/>`;
  if(o.ery)g+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(o.ery*mm/2)}" ry="${f1(o.ery*mm/2*.8)}" style="fill:var(--blood);opacity:.16"/>`;
  if(ind>0)g+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(ind*mm/2)}" ry="${f1(ind*mm/2*.8)}" style="fill:var(--skin-line);fill-opacity:.35;stroke:var(--skin-line);stroke-width:1.2"/>`;
  if(o.bleb)g+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(3.5*mm*o.bleb)}" ry="${f1(3*mm*o.bleb)}" style="fill:var(--field);fill-opacity:.8;stroke:var(--skin-line);stroke-width:.8"/>`;
  if(o.ruler){const ry=y+h+10,x0=cx-15*mm;g+=`<rect x="${f1(x0-4)}" y="${f1(ry)}" width="${f1(30*mm+8)}" height="18" rx="3" style="fill:var(--panel);stroke:var(--line)"/>`;
    for(let k=0;k<=30;k++){const tx=x0+k*mm;g+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${f1(ry)}" y2="${f1(ry+(k%5?4:8))}" style="stroke:var(--muted);stroke-width:.7"/>`;if(k%10===0)g+=`<text x="${f1(tx)}" y="${f1(ry+16)}" class="t-xs t-mid">${k}</text>`}
    if(ind>0)g+=`<path d="M${f1(cx-ind*mm/2)} ${f1(cy)}V${f1(ry)}M${f1(cx+ind*mm/2)} ${f1(cy)}V${f1(ry)}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:3 2"/>`}
  return g}
function sputum(x,y,s=1,o={}){const f=clamp(o.fill==null?.5:o.fill);let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<path d="M-16 -18L-13 18Q-12 22 -8 22H8Q12 22 13 18L16 -18Z" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.6"/>`;
  if(f>0)g+=`<path d="M${f1(-13-3*f)} ${f1(18-34*f)}L-13 18Q-12 22 -8 22H8Q12 22 13 18L${f1(13+3*f)} ${f1(18-34*f)}Z" style="fill:var(--caseum);opacity:.85"/>`;
  g+=`<rect x="-19" y="-26" width="38" height="9" rx="2.5" style="fill:var(--accent)"/>`;
  if(o.label)g+=`<text y="6" class="t-xs t-mid">${o.label}</text>`;
  return g+'</g>'}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What TB is',g:1,n:'1.1',d:'Infection vs disease, the global numbers, who is affected'},
 {id:'bacillus',t:'The TB bacterium',g:1,n:'1.2',d:'A slow-growing, acid-fast rod with a waxy wall'},
 {id:'spread',t:'How TB spreads',g:1,n:'1.3',d:'Droplet nuclei, shared air, ventilation and who is infectious'},
 {id:'granuloma',t:'Infection to granuloma',g:1,n:'1.4',d:'Macrophages, T cells and the granuloma, step by step'},
 {id:'spectrum',t:'TB infection vs TB disease',g:1,n:'1.5',d:'From cleared to contained to disease, and how often'},
 {id:'risk',t:'Who is at risk',g:1,n:'1.6',d:'HIV, diabetes, undernutrition, smoking, age and more'},
 {id:'symptoms',t:'Symptoms & where TB strikes',g:2,n:'2.1',d:'Cough, fever, night sweats, weight loss, and TB outside the lungs'},
 {id:'tests',t:'TB infection tests: TST & IGRA',g:2,n:'2.2',d:'Skin test, blood test, the 5-10-15 mm rule and BCG'},
 {id:'diagnose',t:'Diagnosing TB disease',g:2,n:'2.3',d:'Smear, Xpert, culture, chest X-ray and urine LAM'},
 {id:'resistance',t:'Drug resistance',g:2,n:'2.4',d:'How resistance arises, MDR to XDR, and how it is detected'},
 {id:'drugs',t:'How TB drugs work',g:3,n:'3.1',d:'Why four drugs, which bacteria each kills, and their targets'},
 {id:'regimen',t:'Treating TB disease',g:3,n:'3.2',d:'The 6-month regimen, 4-month options and what cure looks like'},
 {id:'tpt',t:'Treating TB infection',g:3,n:'3.3',d:'3HP, 1HP, 3HR, 4R and isoniazid: preventive treatment compared'},
 {id:'drtb',t:'Treating drug-resistant TB',g:3,n:'3.4',d:'BPaLM, BPaL and the end of 2-year injectable regimens'},
 {id:'safety',t:'Side effects & monitoring',g:3,n:'3.5',d:'Liver, nerves, eyes, orange fluids and drug interactions'},
 {id:'special',t:'TB with HIV, in children & pregnancy',g:3,n:'3.6',d:'ART timing, IRIS, young children and pregnancy'},
 {id:'bcg',t:'BCG & new vaccines',g:4,n:'4.1',d:'What BCG protects against, and the M72 vaccine trial'},
 {id:'control',t:'Infection control & contacts',g:4,n:'4.2',d:'Isolation, masks, ventilation and contact tracing'},
 {id:'frontier',t:'Ending TB: targets & research',g:4,n:'4.3',d:'End TB targets, new drugs, tests and vaccines, with evidence labels'},
 {id:'living',t:'Living with TB',g:5,n:'5.1',d:'Treatment support, stigma, costs, work, family and life after TB'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.2',d:'Isolation, sputum collection, DOT, monitoring and teaching'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From consumption and Koch to streptomycin, BCG and BPaLM'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The infection','g-dz','c-dz'],2:['Diagnosis','g-dx','c-dx'],3:['Treatment','g-rx','c-rx'],4:['Prevention & control','g-pv','c-pv'],5:['Living with TB','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('tbc:tab');sessionStorage.setItem('tbc:tab','1')}catch(e){}
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
