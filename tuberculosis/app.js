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
const SOURCES=[{"key": "AbdoolKarim2010", "text": "Abdool Karim SS, Naidoo K, Grobler A, Padayatchi N, Baxter C, Gray A, et al. Timing of initiation of antiretroviral drugs during tuberculosis therapy. N Engl J Med. 2010;362(8):697-706. PMID 20181971; PMCID PMC3076221; doi:10.1056/NEJMoa0905848.", "link": "https://doi.org/10.1056/nejmoa0905848", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "AbdoolKarim2011", "text": "Abdool Karim SS, Naidoo K, Grobler A, Padayatchi N, Baxter C, Gray AL, et al. Integration of antiretroviral therapy with tuberculosis treatment. N Engl J Med. 2011;365(16):1492-501. PMID 22010915; PMCID PMC3233684; doi:10.1056/NEJMoa1014181.", "link": "https://doi.org/10.1056/nejmoa1014181", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Abubakar2013", "text": "Abubakar I, Pimpin L, Ariti C, Beynon R, Mangtani P, Sterne JA, et al. Systematic review and meta-analysis of the current evidence on the duration of protection by bacillus Calmette-Guérin vaccination against tuberculosis. Health Technol Assess. 2013;17(37):1-372, v-vi. PMID 24021245; PMCID PMC4781620; doi:10.3310/hta17370.", "link": "https://doi.org/10.3310/hta17370", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Abubakar2018", "text": "Abubakar I, Drobniewski F, Southern J, Sitch AJ, Jackson C, Lipman M, et al. Prognostic value of interferon-γ release assays and tuberculin skin test in predicting the development of active tuberculosis (UK PREDICT TB): a prospective cohort study. Lancet Infect Dis. 2018;18(10):1077-1087. PMID 30174209; PMCID PMC6192014; doi:10.1016/S1473-3099(18)30355-4.", "link": "https://doi.org/10.1016/s1473-3099(18)30355-4", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ahmad2018Lancet", "text": "Collaborative Group for the Meta-Analysis of Individual Patient Data in MDR-TB treatment–2017; Ahmad N, Ahuja SD, Akkerman OW, Alffenaar JC, Anderson LF, Baghaei P, et al. Treatment correlates of successful outcomes in pulmonary multidrug-resistant tuberculosis: an individual patient data meta-analysis. Lancet. 2018;392(10150):821-834. PMID 30215381; PMCID PMC6463280; doi:10.1016/S0140-6736(18)31644-1.", "link": "https://doi.org/10.1016/s0140-6736(18)31644-1", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "AlEfraij2015", "text": "Al-Efraij K, Mota L, Lunny C, Schachter M, Cook V, Johnston J. Risk of active tuberculosis in chronic kidney disease: a systematic review and meta-analysis. Int J Tuberc Lung Dis. 2015;19(12):1493-9. PMID 26614191; doi:10.5588/ijtld.15.0081.", "link": "https://doi.org/10.5588/ijtld.15.0081", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Alipanah2018", "text": "Alipanah N, Jarlsberg L, Miller C, Linh NN, Falzon D, Jaramillo E, et al. Adherence interventions and outcomes of tuberculosis treatment: A systematic review and meta-analysis of trials and observational studies. PLoS Med. 2018;15(7):e1002595. PMID 29969463; PMCID PMC6029765; doi:10.1371/journal.pmed.1002595.", "link": "https://doi.org/10.1371/journal.pmed.1002595", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "AllixBeguec2018", "text": "Allix-Béguec C, Arandjelovic I, Bi L, Beckert P, Bonnet M, Bradley P, et al. Prediction of Susceptibility to First-Line Tuberculosis Drugs by DNA Sequencing. N Engl J Med. 2018;379(15):1403-1415. PMID 30280646; PMCID PMC6121966; doi:10.1056/NEJMoa1800474.", "link": "https://doi.org/10.1056/nejmoa1800474", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Allwood2021", "text": "Allwood BW, Byrne A, Meghji J, Rachow A, van der Zalm MM, Schoch OD. Post-Tuberculosis Lung Disease: Clinical Review of an Under-Recognised Global Challenge. Respiration. 2021;100(8):751-763. PMID 33401266; doi:10.1159/000512531.", "link": "https://doi.org/10.1159/000512531", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Amere2018", "text": "Amere GA, Nayak P, Salindri AD, Narayan KMV, Magee MJ. Contribution of smoking to tuberculosis incidence and mortality in high-tuberculosis-burden countries. Am J Epidemiol. 2018;187(9):1846-1855. PMID 29635332; PMCID PMC6888026; doi:10.1093/aje/kwy081.", "link": "https://doi.org/10.1093/aje/kwy081", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Andama2022", "text": "Andama A, Whitman GR, Crowder R, Reza TF, Jaganath D, Mulondo J, et al. Accuracy of Tongue Swab Testing Using Xpert MTB-RIF Ultra for Tuberculosis Diagnosis. J Clin Microbiol. 2022;60(7):e0042122. PMID 35758702; PMCID PMC9297831; doi:10.1128/jcm.00421-22.", "link": "https://doi.org/10.1128/jcm.00421-22", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Andersen2000", "text": "Andersen P, Munk ME, Pollock JM, Doherty TM. Specific immune-based diagnosis of tuberculosis. Lancet. 2000;356(9235):1099-104. PMID 11009160.", "link": "https://pubmed.ncbi.nlm.nih.gov/11009160/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Andrews2012Reinfection", "text": "Andrews JR, Noubary F, Walensky RP, Cerda R, Losina E, Horsburgh CR. Risk of progression to active tuberculosis following reinfection with Mycobacterium tuberculosis. Clin Infect Dis. 2012;54(6):784-91. PMID 22267721; PMCID PMC3284215; doi:10.1093/cid/cir951.", "link": "https://doi.org/10.1093/cid/cir951", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Andries2005", "text": "Andries K, Verhasselt P, Guillemont J, Göhlmann HW, Neefs JM, Winkler H, et al. A diarylquinoline drug active on the ATP synthase of Mycobacterium tuberculosis. Science. 2005;307(5707):223-227. PMID 15591164; doi:10.1126/science.1106753.", "link": "https://doi.org/10.1126/science.1106753", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Andries2014", "text": "Andries K, Villellas C, Coeck N, Thys K, Gevers T, Vranckx L, et al. Acquired resistance of Mycobacterium tuberculosis to bedaquiline. PLoS One. 2014;9(7):e102135. PMID 25010492; PMCID PMC4092087; doi:10.1371/journal.pone.0102135.", "link": "https://doi.org/10.1371/journal.pone.0102135", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Armstrong1971", "text": "Armstrong JA, Hart PD. Response of cultured macrophages to Mycobacterium tuberculosis, with observations on fusion of lysosomes with phagosomes. J Exp Med. 1971;134(3 Pt 1):713-740. PMID 15776571; PMCID PMC2139093; doi:10.1084/jem.134.3.713.", "link": "https://doi.org/10.1084/jem.134.3.713", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "ATS2000", "text": "American Thoracic Society; Centers for Disease Control and Prevention. Targeted tuberculin testing and treatment of latent tuberculosis infection. Am J Respir Crit Care Med. 2000;161(4 Pt 2):S221-S247. PMID 10764341; doi:10.1164/ajrccm.161.supplement_3.ats600. Co-published as MMWR Recomm Rep 2000;49(RR-6):1-51 (PMID 10881762), whose text was read on cdc.gov.", "link": "https://doi.org/10.1164/ajrccm.161.supplement_3.ats600", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Azuma2013", "text": "Azuma J, Ohno M, Kubota R, Yokota S, Nagai T, Tsuyuguchi K, et al. NAT2 genotype guided regimen reduces isoniazid-induced liver injury and early treatment failure in the 6-month four-drug standard treatment of tuberculosis: a randomized controlled trial for pharmacogenetics-based therapy. Eur J Clin Pharmacol. 2013;69(5):1091-101. PMID 23150149; PMCID PMC3641305; doi:10.1007/s00228-012-1429-9.", "link": "https://doi.org/10.1007/s00228-012-1429-9", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Baciewicz2013", "text": "Baciewicz AM, Chrisman CR, Finch CK, Self TH. Update on rifampin, rifabutin, and rifapentine drug interactions. Curr Med Res Opin. 2013;29(1):1-12. PMID 23136913; doi:10.1185/03007995.2012.747952.", "link": "https://doi.org/10.1185/03007995.2012.747952", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Badje2017", "text": "Badje A, Moh R, Gabillard D, Guéhi C, Kabran M, Ntakpé JB, et al. Effect of isoniazid preventive therapy on risk of death in west African, HIV-infected adults with high CD4 cell counts: long-term follow-up of the Temprano ANRS 12136 trial. Lancet Glob Health. 2017;5(11):e1080-e1089. PMID 29025631; doi:10.1016/S2214-109X(17)30372-8.", "link": "https://doi.org/10.1016/s2214-109x(17)30372-8", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Bahr2018", "text": "Bahr NC, Nuwagira E, Evans EE, Cresswell FV, Bystrom PV, Byamukama A, et al. Diagnostic accuracy of Xpert MTB/RIF Ultra for tuberculous meningitis in HIV-infected adults: a prospective cohort study. Lancet Infect Dis. 2018;18(1):68-75. PMID 28919338; PMCID PMC5739874; doi:10.1016/S1473-3099(17)30474-7.", "link": "https://doi.org/10.1016/s1473-3099(17)30474-7", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Baker2008Crowding", "text": "Baker M, Das D, Venugopal K, Howden-Chapman P. Tuberculosis associated with household crowding in a developed country. J Epidemiol Community Health. 2008;62(8):715-21. PMID 18621957; doi:10.1136/jech.2007.063610.", "link": "https://doi.org/10.1136/jech.2007.063610", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Baker2011", "text": "Baker MA, Harries AD, Jeon CY, Hart JE, Kapur A, Lönnroth K, et al. The impact of diabetes on tuberculosis treatment outcomes: a systematic review. BMC Med. 2011;9:81. PMID 21722362; PMCID PMC3155828; doi:10.1186/1741-7015-9-81.", "link": "https://doi.org/10.1186/1741-7015-9-81", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Balasubramanian1994", "text": "Balasubramanian V, Wiegeshaus EH, Taylor BT, Smith DW. Pathogenesis of tuberculosis: pathway to apical localization. Tuber Lung Dis. 1994;75(3):168-178. PMID 7919306; doi:10.1016/0962-8479(94)90002-7.", "link": "https://doi.org/10.1016/0962-8479(94)90002-7", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Banerjee1994", "text": "Banerjee A, Dubnau E, Quemard A, Balasubramanian V, Um KS, Wilson T, et al. inhA, a gene encoding a target for isoniazid and ethionamide in Mycobacterium tuberculosis. Science. 1994;263(5144):227-230. PMID 8284673; doi:10.1126/science.8284673.", "link": "https://doi.org/10.1126/science.8284673", "areas": ["C", "D", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Barberis2017", "text": "Barberis I, Bragazzi NL, Galluzzo L, Martini M. The history of tuberculosis: from the first historical records to the isolation of Koch's bacillus. J Prev Med Hyg. 2017;58(1):E9-E12. PMID 28515626; PMCID PMC5432783. Full text read on Europe PMC.", "link": "https://pubmed.ncbi.nlm.nih.gov/28515626/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Barcellini2016", "text": "Barcellini L, Borroni E, Brown J, Brunetti E, Campisi D, Castellotti PF, et al. First evaluation of QuantiFERON-TB Gold Plus performance in contact screening. Eur Respir J. 2016;48(5):1411-1419. PMID 27390280; doi:10.1183/13993003.00510-2016.", "link": "https://doi.org/10.1183/13993003.00510-2016", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Barry2009", "text": "Barry CE, Boshoff HI, Dartois V, Dick T, Ehrt S, Flynn J, et al. The spectrum of latent tuberculosis: rethinking the biology and intervention strategies. Nat Rev Microbiol. 2009;7(12):845-855. PMID 19855401; PMCID PMC4144869; doi:10.1038/nrmicro2236.", "link": "https://doi.org/10.1038/nrmicro2236", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bates2007", "text": "Bates MN, Khalakdina A, Pai M, Chang L, Lessa F, Smith KR. Risk of tuberculosis from exposure to tobacco smoke: a systematic review and meta-analysis. Arch Intern Med. 2007;167(4):335-42. PMID 17325294; doi:10.1001/archinte.167.4.335.", "link": "https://doi.org/10.1001/archinte.167.4.335", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Baussano2010", "text": "Baussano I, Williams BG, Nunn P, Beggiato M, Fedeli U, Scano F. Tuberculosis incidence in prisons: a systematic review. PLoS Med. 2010;7(12):e1000381. PMID 21203587; PMCID PMC3006353; doi:10.1371/journal.pmed.1000381.", "link": "https://doi.org/10.1371/journal.pmed.1000381", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Baussano2011", "text": "Baussano I, Nunn P, Williams B, Pivetta E, Bugiani M, Scano F. Tuberculosis among health care workers. Emerg Infect Dis. 2011;17(3):488-94. PMID 21392441; PMCID PMC3298382; doi:10.3201/eid1703.100947.", "link": "https://doi.org/10.3201/eid1703.100947", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Behr1999", "text": "Behr MA, Wilson MA, Gill WP, Salamon H, Schoolnik GK, Rane S, et al. Comparative genomics of BCG vaccines by whole-genome DNA microarray. Science. 1999;284(5419):1520-3. PMID 10348738.", "link": "https://pubmed.ncbi.nlm.nih.gov/10348738/", "areas": ["C", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Behr1999Lancet", "text": "Behr MA, Warren SA, Salamon H, Hopewell PC, Ponce de Leon A, Daley CL, et al. Transmission of Mycobacterium tuberculosis from patients smear-negative for acid-fast bacilli. Lancet. 1999;353(9151):444-9. PMID 9989714; doi:10.1016/s0140-6736(98)03406-0.", "link": "https://doi.org/10.1016/s0140-6736(98)03406-0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Behr2018", "text": "Behr MA, Edelstein PH, Ramakrishnan L. Revisiting the timetable of tuberculosis. BMJ. 2018;362:k2738. PMID 30139910; PMCID PMC6105930; doi:10.1136/bmj.k2738.", "link": "https://doi.org/10.1136/bmj.k2738", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Behr2019", "text": "Behr MA, Edelstein PH, Ramakrishnan L. Is Mycobacterium tuberculosis infection life long? BMJ. 2019;367:l5770. PMID 31649096; PMCID PMC6812595; doi:10.1136/bmj.l5770. Full text read on Europe PMC (no abstract in the record).", "link": "https://doi.org/10.1136/bmj.l5770", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Behr2021", "text": "Behr MA, Kaufmann E, Duffin J, Edelstein PH, Ramakrishnan L. Latent tuberculosis: two centuries of confusion. Am J Respir Crit Care Med. 2021;204(2):142-148. PMID 33761302; PMCID PMC8650795; doi:10.1164/rccm.202011-4239PP. No abstract in the record; cited only for the historical framing stated in its title and in Behr2018/Behr2019.", "link": "https://doi.org/10.1164/rccm.202011-4239pp", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Belknap2017", "text": "Belknap R, Holland D, Feng PJ, Millet JP, Caylà JA, Martinson NA, et al. Self-administered Versus Directly Observed Once-Weekly Isoniazid and Rifapentine Treatment of Latent Tuberculosis Infection: A Randomized Trial. Ann Intern Med. 2017;167(10):689-697. PMID 29114781; PMCID PMC5766341; doi:10.7326/M17-1150.", "link": "https://doi.org/10.7326/m17-1150", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Beste2007", "text": "Beste DJ, Hooper T, Stewart G, Bonde B, Avignone-Rossa C, Bushell ME, et al. GSMN-TB: a web-based genome-scale network model of Mycobacterium tuberculosis metabolism. Genome Biol. 2007;8(5):R89. PMID 17521419; PMCID PMC1929162; doi:10.1186/gb-2007-8-5-r89.", "link": "https://doi.org/10.1186/gb-2007-8-5-r89", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bhargava2023Lancet", "text": "Bhargava A, Bhargava M, Meher A, Benedetti A, Velayutham B, Sai Teja G, et al. Nutritional supplementation to prevent tuberculosis incidence in household contacts of patients with pulmonary tuberculosis in India (RATIONS): a field-based, open-label, cluster-randomised, controlled trial. Lancet. 2023;402(10402):627-640. PMID 37567200; doi:10.1016/S0140-6736(23)01231-X.", "link": "https://doi.org/10.1016/s0140-6736(23)01231-x", "areas": ["B", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Bhargava2023LGH", "text": "Bhargava A, Bhargava M, Meher A, Teja GS, Velayutham B, Watson B, et al. Nutritional support for adult patients with microbiologically confirmed pulmonary tuberculosis: outcomes in a programmatic cohort nested within the RATIONS trial in Jharkhand, India. Lancet Glob Health. 2023;11(9):e1402-e1411. PMID 37567210; doi:10.1016/S2214-109X(23)00324-8.", "link": "https://doi.org/10.1016/s2214-109x(23)00324-8", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "BieringSorensen2017", "text": "Biering-Sørensen S, Aaby P, Lund N, Monteiro I, Jensen KJ, Eriksen HB, et al. Early BCG-Denmark and Neonatal Mortality Among Infants Weighing <2500 g: A Randomized Controlled Trial. Clin Infect Dis. 2017;65(7):1183-1190. PMID 29579158; PMCID PMC5849087; doi:10.1093/cid/cix525.", "link": "https://doi.org/10.1093/cid/cix525", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bjerrum2019", "text": "Bjerrum S, Schiller I, Dendukuri N, Kohli M, Nathavitharana RR, Zwerling AA, et al. Lateral flow urine lipoarabinomannan assay for detecting active tuberculosis in people living with HIV. Cochrane Database Syst Rev. 2019;10(10):CD011420. PMID 31633805; PMCID PMC6802713; doi:10.1002/14651858.CD011420.pub3.", "link": "https://doi.org/10.1002/14651858.cd011420.pub3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Blanc2011", "text": "Blanc FX, Sok T, Laureillard D, Borand L, Rekacewicz C, Nerrienet E, et al. Earlier versus later start of antiretroviral therapy in HIV-infected adults with tuberculosis. N Engl J Med. 2011;365(16):1471-81. PMID 22010913; PMCID PMC4879711; doi:10.1056/NEJMoa1013911.", "link": "https://doi.org/10.1056/nejmoa1013911", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Boehme2010", "text": "Boehme CC, Nabeta P, Hillemann D, Nicol MP, Shenai S, Krapp F, et al. Rapid molecular detection of tuberculosis and rifampin resistance. N Engl J Med. 2010;363(11):1005-15. PMID 20825313; PMCID PMC2947799; doi:10.1056/NEJMoa0907847.", "link": "https://doi.org/10.1056/nejmoa0907847", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Boehme2011", "text": "Boehme CC, Nicol MP, Nabeta P, Michael JS, Gotuzzo E, Tahirli R, et al. Feasibility, diagnostic accuracy, and effectiveness of decentralised use of the Xpert MTB/RIF test for diagnosis of tuberculosis and multidrug resistance: a multicentre implementation study. Lancet. 2011;377(9776):1495-505. PMID 21507477; PMCID PMC3085933; doi:10.1016/S0140-6736(11)60438-8.", "link": "https://doi.org/10.1016/s0140-6736(11)60438-8", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Boeree2015", "text": "Boeree MJ, Diacon AH, Dawson R, Narunsky K, du Bois J, Venter A, et al. A dose-ranging trial to optimize the dose of rifampin in the treatment of tuberculosis. Am J Respir Crit Care Med. 2015;191(9):1058-65. PMID 25654354; doi:10.1164/rccm.201407-1264OC.", "link": "https://doi.org/10.1164/rccm.201407-1264oc", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "BoissonDupuis2018", "text": "Boisson-Dupuis S, Ramirez-Alejo N, Li Z, Patin E, Rao G, Kerner G, et al. Tuberculosis and impaired IL-23-dependent IFN-γ immunity in humans homozygous for a common TYK2 missense variant. Sci Immunol. 2018;3(30):eaau8714. PMID 30578352; PMCID PMC6341984; doi:10.1126/sciimmunol.aau8714.", "link": "https://doi.org/10.1126/sciimmunol.aau8714", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Brennan2003", "text": "Brennan PJ. Structure, function, and biogenesis of the cell wall of Mycobacterium tuberculosis. Tuberculosis (Edinb). 2003;83(1-3):91-97. PMID 12758196; doi:10.1016/S1472-9792(02)00089-6.", "link": "https://doi.org/10.1016/s1472-9792(02)00089-6", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Briken2004", "text": "Briken V, Porcelli SA, Besra GS, Kremer L. Mycobacterial lipoarabinomannan and related lipoglycans: from biogenesis to modulation of the immune response. Mol Microbiol. 2004;53(2):391-403. PMID 15228522; doi:10.1111/j.1365-2958.2004.04183.x.", "link": "https://doi.org/10.1111/j.1365-2958.2004.04183.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Brosch2002", "text": "Brosch R, Gordon SV, Marmiesse M, Brodin P, Buchrieser C, Eiglmeier K, et al. A new evolutionary scenario for the Mycobacterium tuberculosis complex. Proc Natl Acad Sci U S A. 2002;99(6):3684-9. PMID 11891304; PMCID PMC122584; doi:10.1073/pnas.052548299.", "link": "https://doi.org/10.1073/pnas.052548299", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Brosch2007", "text": "Brosch R, Gordon SV, Garnier T, Eiglmeier K, Frigui W, Valenti P, et al. Genome plasticity of BCG and impact on vaccine efficacy. Proc Natl Acad Sci U S A. 2007;104(13):5596-5601. PMID 17372194; PMCID PMC1838518; doi:10.1073/pnas.0700869104.", "link": "https://doi.org/10.1073/pnas.0700869104", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Burusie2020", "text": "Burusie A, Enquesilassie F, Addissie A, Dessalegn B, Lamaro T. Effect of smoking on tuberculosis treatment outcomes: A systematic review and meta-analysis. PLoS One. 2020;15(9):e0239333. PMID 32941508; PMCID PMC7498109; doi:10.1371/journal.pone.0239333.", "link": "https://doi.org/10.1371/journal.pone.0239333", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Burzynski2022", "text": "Burzynski J, Mangan JM, Lam CK, Macaraig M, Salerno MM, deCastro BR, et al. In-Person vs Electronic Directly Observed Therapy for Tuberculosis Treatment Adherence: A Randomized Noninferiority Trial. JAMA Netw Open. 2022;5(1):e2144210. PMID 35050357; PMCID PMC8777548; doi:10.1001/jamanetworkopen.2021.44210.", "link": "https://doi.org/10.1001/jamanetworkopen.2021.44210", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bussi2019", "text": "Bussi C, Gutierrez MG. Mycobacterium tuberculosis infection of host cells in space and time. FEMS Microbiol Rev. 2019;43(4):341-361. PMID 30916769; PMCID PMC6606852; doi:10.1093/femsre/fuz006.", "link": "https://doi.org/10.1093/femsre/fuz006", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bustamante2014", "text": "Bustamante J, Boisson-Dupuis S, Abel L, Casanova JL. Mendelian susceptibility to mycobacterial disease: genetic, immunological, and clinical features of inborn errors of IFN-γ immunity. Semin Immunol. 2014;26(6):454-70. PMID 25453225; PMCID PMC4357480; doi:10.1016/j.smim.2014.09.008.", "link": "https://doi.org/10.1016/j.smim.2014.09.008", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Buyinza2025", "text": "Buyinza N, Nkhoma K, Namisango E, Maddocks M, Downing J, Prevost AT, et al. Nurse-led palliative care for multidrug-resistant tuberculosis: a parallel, single-blind, pragmatic, randomised controlled trial in Uganda. Lancet Glob Health. 2025;13(8):e1448-e1457. PMID 40412430; doi:10.1016/S2214-109X(25)00173-1.", "link": "https://doi.org/10.1016/s2214-109x(25)00173-1", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Byrne2015", "text": "Byrne AL, Marais BJ, Mitnick CD, Lecca L, Marks GB. Tuberculosis and chronic respiratory disease: a systematic review. Int J Infect Dis. 2015;32:138-46. PMID 25809770; doi:10.1016/j.ijid.2014.12.016.", "link": "https://doi.org/10.1016/j.ijid.2014.12.016", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Cadena2017", "text": "Cadena AM, Fortune SM, Flynn JL. Heterogeneity in tuberculosis. Nat Rev Immunol. 2017;17(11):691-702. PMID 28736436; PMCID PMC6247113; doi:10.1038/nri.2017.69.", "link": "https://doi.org/10.1038/nri.2017.69", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Calderwood2021", "text": "Calderwood CJ, Wilson JP, Fielding KL, Harris RC, Karat AS, Mansukhani R, et al. Dynamics of sputum conversion during effective tuberculosis treatment: A systematic review and meta-analysis. PLoS Med. 2021;18(4):e1003566. PMID 33901173; PMCID PMC8109831; doi:10.1371/journal.pmed.1003566.", "link": "https://doi.org/10.1371/journal.pmed.1003566", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Cambau2014", "text": "Cambau E, Drancourt M. Steps towards the discovery of Mycobacterium tuberculosis by Robert Koch, 1882. Clin Microbiol Infect. 2014;20(3):196-201. PMID 24450600; doi:10.1111/1469-0691.12555.", "link": "https://doi.org/10.1111/1469-0691.12555", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Cambier2014", "text": "Cambier CJ, Falkow S, Ramakrishnan L. Host evasion and exploitation schemes of Mycobacterium tuberculosis. Cell. 2014;159(7):1497-1509. PMID 25525872; doi:10.1016/j.cell.2014.11.024.", "link": "https://doi.org/10.1016/j.cell.2014.11.024", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Campbell2001Rif", "text": "Campbell EA, Korzheva N, Mustaev A, Murakami K, Nair S, Goldfarb A, et al. Structural mechanism for rifampicin inhibition of bacterial rna polymerase. Cell. 2001;104(6):901-12. PMID 11290327; doi:10.1016/s0092-8674(01)00286-0.", "link": "https://doi.org/10.1016/s0092-8674(01)00286-0", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Capuano2003", "text": "Capuano SV, Croix DA, Pawar S, Zinovik A, Myers A, Lin PL, et al. Experimental Mycobacterium tuberculosis infection of cynomolgus macaques closely resembles the various manifestations of human M. tuberculosis infection. Infect Immun. 2003;71(10):5831-5844. PMID 14500505; PMCID PMC201048; doi:10.1128/IAI.71.10.5831-5844.2003.", "link": "https://doi.org/10.1128/iai.71.10.5831-5844.2003", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Carter2018LGH", "text": "Carter DJ, Glaziou P, Lönnroth K, Siroka A, Floyd K, Weil D, et al. The impact of social protection and poverty elimination on global tuberculosis incidence: a statistical modelling analysis of Sustainable Development Goal 1. Lancet Glob Health. 2018;6(5):e514-e522. PMID 29580761; PMCID PMC5968370; doi:10.1016/S2214-109X(18)30195-5.", "link": "https://doi.org/10.1016/s2214-109x(18)30195-5", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Carter2019BMJGH", "text": "J Carter D, Daniel R, Torrens AW, N Sanchez M, Maciel ELN, Bartholomay P, et al. The impact of a cash transfer programme on tuberculosis treatment success rate: a quasi-experimental study in Brazil. BMJ Glob Health. 2019;4(1):e001029. PMID 30740248; PMCID PMC6347926; doi:10.1136/bmjgh-2018-001029.", "link": "https://doi.org/10.1136/bmjgh-2018-001029", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "CDC2018WTBD", "text": "Centers for Disease Control and Prevention. World TB Day - March 24, 2018. MMWR Morb Mortal Wkly Rep. 2018;67(11):317. PMCID PMC5868207; doi:10.15585/mmwr.mm6711a1. No PMID in the Europe PMC record; DOI and pages confirmed on Crossref.", "link": "https://doi.org/10.15585/mmwr.mm6711a1", "areas": ["A"], "unverified": false, "validated": "Europe PMC"}, {"key": "Chackerian2002", "text": "Chackerian AA, Alt JM, Perera TV, Dascher CC, Behar SM. Dissemination of Mycobacterium tuberculosis is influenced by host factors and precedes the initiation of T-cell immunity. Infect Immun. 2002;70(8):4501-4509. PMID 12117962; PMCID PMC128141; doi:10.1128/IAI.70.8.4501-4509.2002.", "link": "https://doi.org/10.1128/iai.70.8.4501-4509.2002", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Chakaya2021", "text": "Chakaya J, Khan M, Ntoumi F, Aklillu E, Fatima R, Mwaba P, et al. Global Tuberculosis Report 2020 - reflections on the global TB burden, treatment and prevention efforts. Int J Infect Dis. 2021;113 Suppl 1:S7-S12. PMID 33716195; PMCID PMC8433257; doi:10.1016/j.ijid.2021.02.107.", "link": "https://doi.org/10.1016/j.ijid.2021.02.107", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Chakravorty2017", "text": "Chakravorty S, Simmons AM, Rowneki M, Parmar H, Cao Y, Ryan J, et al. The New Xpert MTB/RIF Ultra: Improving Detection of Mycobacterium tuberculosis and Resistance to Rifampin in an Assay Suitable for Point-of-Care Testing. mBio. 2017;8(4). PMID 28851844; PMCID PMC5574709; doi:10.1128/mBio.00812-17.", "link": "https://doi.org/10.1128/mbio.00812-17", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chang2014IJTLD", "text": "Chang SH, Cataldo JK. A systematic review of global cultural variations in knowledge, attitudes and health responses to tuberculosis stigma. Int J Tuberc Lung Dis. 2014;18(2):168-73, i-iv. PMID 24429308; doi:10.5588/ijtld.13.0181.", "link": "https://doi.org/10.5588/ijtld.13.0181", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Chen2011FQ", "text": "Chen TC, Lu PL, Lin CY, Lin WR, Chen YH. Fluoroquinolones are associated with delayed treatment and resistance in tuberculosis: a systematic review and meta-analysis. Int J Infect Dis. 2011;15(3):e211-6. PMID 21195001; doi:10.1016/j.ijid.2010.11.008.", "link": "https://doi.org/10.1016/j.ijid.2010.11.008", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chiang2014", "text": "Chiang SS, Khan FA, Milstein MB, Tolman AW, Benedetti A, Starke JR, et al. Treatment outcomes of childhood tuberculous meningitis: a systematic review and meta-analysis. Lancet Infect Dis. 2014;14(10):947-57. PMID 25108337; doi:10.1016/S1473-3099(14)70852-7.", "link": "https://doi.org/10.1016/s1473-3099(14)70852-7", "areas": ["D", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Chihota2010", "text": "Chihota VN, Grant AD, Fielding K, Ndibongo B, van Zyl A, Muirhead D, et al. Liquid vs. solid culture for tuberculosis: performance and cost in a resource-constrained setting. Int J Tuberc Lung Dis. 2010;14(8):1024-31. PMID 20626948.", "link": "https://pubmed.ncbi.nlm.nih.gov/20626948/", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chikovore2020", "text": "Chikovore J, Pai M, Horton KC, Daftary A, Kumwenda MK, Hart G, et al. Missing men with tuberculosis: the need to address structural influences and implement targeted and multidimensional interventions. BMJ Glob Health. 2020;5(5):e002255. PMID 32371568; PMCID PMC7223013; doi:10.1136/bmjgh-2019-002255.", "link": "https://doi.org/10.1136/bmjgh-2019-002255", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Church2024", "text": "Church EC, Steingart KR, Cangelosi GA, Ruhwald M, Kohli M, Shapiro AE. Oral swabs with a rapid molecular diagnostic test for pulmonary tuberculosis in adults and children: a systematic review. Lancet Glob Health. 2024;12(1):e45-e54. PMID 38097297; PMCID PMC10733129; doi:10.1016/S2214-109X(23)00469-2.", "link": "https://doi.org/10.1016/s2214-109x(23)00469-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Codlin2021", "text": "Codlin AJ, Dao TP, Vo LNQ, Forse RJ, Van Truong V, Dang HM, et al. Independent evaluation of 12 artificial intelligence solutions for the detection of tuberculosis. Sci Rep. 2021;11(1):23895. PMID 34903808; PMCID PMC8668935; doi:10.1038/s41598-021-03265-0.", "link": "https://doi.org/10.1038/s41598-021-03265-0", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Cohen2018", "text": "Cohen SB, Gern BH, Delahaye JL, Adams KN, Plumlee CR, Winkler JK, et al. Alveolar macrophages provide an early Mycobacterium tuberculosis niche and initiate dissemination. Cell Host Microbe. 2018;24(3):439-446.e4. PMID 30146391; PMCID PMC6152889; doi:10.1016/j.chom.2018.08.001.", "link": "https://doi.org/10.1016/j.chom.2018.08.001", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Cohen2019ERJ", "text": "Cohen A, Mathiasen VD, Schön T, Wejse C. The global prevalence of latent tuberculosis: a systematic review and meta-analysis. Eur Respir J. 2019;54(3):1900655. PMID 31221810; doi:10.1183/13993003.00655-2019.", "link": "https://doi.org/10.1183/13993003.00655-2019", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Colditz1994", "text": "Colditz GA, Brewer TF, Berkey CS, Wilson ME, Burdick E, Fineberg HV, et al. Efficacy of BCG vaccine in the prevention of tuberculosis. Meta-analysis of the published literature. JAMA. 1994;271(9):698-702. PMID 8309034.", "link": "https://pubmed.ncbi.nlm.nih.gov/8309034/", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Colditz1995", "text": "Colditz GA, Berkey CS, Mosteller F, Brewer TF, Wilson ME, Burdick E, et al. The efficacy of bacillus Calmette-Guérin vaccination of newborns and infants in the prevention of tuberculosis: meta-analyses of the published literature. Pediatrics. 1995;96(1 Pt 1):29-35. PMID 7596718.", "link": "https://pubmed.ncbi.nlm.nih.gov/7596718/", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Cole1998", "text": "Cole ST, Brosch R, Parkhill J, Garnier T, Churcher C, Harris D, et al. Deciphering the biology of Mycobacterium tuberculosis from the complete genome sequence. Nature. 1998;393(6685):537-44. PMID 9634230; doi:10.1038/31159. Erratum Nature 1998;396(6707):190.", "link": "https://doi.org/10.1038/31159", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Comas2013", "text": "Comas I, Coscolla M, Luo T, Borrell S, Holt KE, Kato-Maeda M, et al. Out-of-Africa migration and Neolithic coexpansion of Mycobacterium tuberculosis with modern humans. Nat Genet. 2013;45(10):1176-82. PMID 23995134; PMCID PMC3800747; doi:10.1038/ng.2744.", "link": "https://doi.org/10.1038/ng.2744", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Comstock1978", "text": "Comstock GW. Tuberculosis in twins: a re-analysis of the Prophit survey. Am Rev Respir Dis. 1978;117(4):621-4. PMID 565607; doi:10.1164/arrd.1978.117.4.621. No abstract in PubMed; cited only for the zygosity comparison stated in the title and in later reviews.", "link": "https://doi.org/10.1164/arrd.1978.117.4.621", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Comstock1979", "text": "Comstock GW, Baum C, Snider DE. Isoniazid prophylaxis among Alaskan Eskimos: a final report of the Bethel isoniazid studies. Am Rev Respir Dis. 1979;119(5):827-830. PMID 453704; doi:10.1164/arrd.1979.119.5.827.", "link": "https://doi.org/10.1164/arrd.1979.119.5.827", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Conradie2020", "text": "Conradie F, Diacon AH, Ngubane N, Howell P, Everitt D, Crook AM, et al. Treatment of Highly Drug-Resistant Pulmonary Tuberculosis. N Engl J Med. 2020;382(10):893-902. PMID 32130813; PMCID PMC6955640; doi:10.1056/NEJMoa1901814.", "link": "https://doi.org/10.1056/nejmoa1901814", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Conradie2022", "text": "Conradie F, Bagdasaryan TR, Borisov S, Howell P, Mikiashvili L, Ngubane N, et al. Bedaquiline-Pretomanid-Linezolid Regimens for Drug-Resistant Tuberculosis. N Engl J Med. 2022;387(9):810-823. PMID 36053506; PMCID PMC9490302; doi:10.1056/NEJMoa2119430.", "link": "https://doi.org/10.1056/nejmoa2119430", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Conradie2026", "text": "Conradie F, Badat T, Poswa A, Rajaram S, Kooverjee S, Maartens G, et al. A Pragmatic Trial of a 6-Month Strategy for Rifampicin-Resistant Tuberculosis. N Engl J Med. 2026;394(24):2429-2439. PMID 42341301; doi:10.1056/NEJMoa2503687.", "link": "https://doi.org/10.1056/nejmoa2503687", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Cooper1993", "text": "Cooper AM, Dalton DK, Stewart TA, Griffin JP, Russell DG, Orme IM. Disseminated tuberculosis in interferon gamma gene-disrupted mice. J Exp Med. 1993;178(6):2243-2247. PMID 8245795; PMCID PMC2191280; doi:10.1084/jem.178.6.2243.", "link": "https://doi.org/10.1084/jem.178.6.2243", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Corbett2003", "text": "Corbett EL, Watt CJ, Walker N, Maher D, Williams BG, Raviglione MC, et al. The growing burden of tuberculosis: global trends and interactions with the HIV epidemic. Arch Intern Med. 2003;163(9):1009-21. PMID 12742798; doi:10.1001/archinte.163.9.1009.", "link": "https://doi.org/10.1001/archinte.163.9.1009", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Cords2021", "text": "Cords O, Martinez L, Warren JL, O'Marr JM, Walter KS, Cohen T, et al. Incidence and prevalence of tuberculosis in incarcerated populations: a systematic review and meta-analysis. Lancet Public Health. 2021;6(5):e300-e308. PMID 33765455; PMCID PMC8168455; doi:10.1016/S2468-2667(21)00025-6.", "link": "https://doi.org/10.1016/s2468-2667(21)00025-6", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Coscolla2021", "text": "Coscolla M, Gagneux S, Menardo F, Loiseau C, Ruiz-Rodriguez P, Borrell S, et al. Phylogenomics of Mycobacterium africanum reveals a new lineage and a complex evolutionary history. Microb Genom. 2021;7(2):000477. PMID 33555243; doi:10.1099/mgen.0.000477.", "link": "https://doi.org/10.1099/mgen.0.000477", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Courtwright2010", "text": "Courtwright A, Turner AN. Tuberculosis and stigmatization: pathways and interventions. Public Health Rep. 2010;125 Suppl 4(Suppl 4):34-42. PMID 20626191; PMCID PMC2882973; doi:10.1177/00333549101250S407.", "link": "https://doi.org/10.1177/00333549101250s407", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Coussens2024", "text": "Coussens AK, Zaidi SMA, Allwood BW, Dewan PK, Gray G, Kohli M, et al. Classification of early tuberculosis states to guide research for improved care and prevention: an international Delphi consensus exercise. Lancet Respir Med. 2024;12(6):484-498. PMID 38527485; PMCID PMC7616323; doi:10.1016/S2213-2600(24)00028-6.", "link": "https://doi.org/10.1016/s2213-2600(24)00028-6", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Cox2014", "text": "Cox E, Laessig K. FDA approval of bedaquiline--the benefit-risk balance for drug-resistant tuberculosis. N Engl J Med. 2014;371(8):689-91. PMID 25140952; doi:10.1056/NEJMp1314385.", "link": "https://doi.org/10.1056/nejmp1314385", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Cremers2015", "text": "Cremers AL, de Laat MM, Kapata N, Gerrets R, Klipstein-Grobusch K, Grobusch MP. Assessing the consequences of stigma for tuberculosis patients in urban Zambia. PLoS One. 2015;10(3):e0119861. PMID 25806955; PMCID PMC4373828; doi:10.1371/journal.pone.0119861.", "link": "https://doi.org/10.1371/journal.pone.0119861", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Crofton2006", "text": "Crofton J. The MRC randomized trial of streptomycin and its legacy: a view from the clinical front line. J R Soc Med. 2006;99(10):531-4. PMID 17021304; PMCID PMC1592068; doi:10.1177/014107680609901017. Full text read on PMC.", "link": "https://doi.org/10.1177/014107680609901017", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Crouser2020", "text": "Crouser ED, Maier LA, Wilson KC, Bonham CA, Morgenthau AS, Patterson KC, et al. Diagnosis and Detection of Sarcoidosis. An Official American Thoracic Society Clinical Practice Guideline. Am J Respir Crit Care Med. 2020;201(8):e26-e51. PMID 32293205; PMCID PMC7159433; doi:10.1164/rccm.202002-0251ST.", "link": "https://doi.org/10.1164/rccm.202002-0251st", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Crowder2026", "text": "Crowder R, Thangakunam B, Andama A, Christopher DJ, Dalay V, Nwamba W, et al. Diagnostic Accuracy of Tuberculosis Screening Tests in a Prospective Multinational Cohort: Chest Radiography With Computer-Aided Detection, Xpert Tuberculosis Host Response, and C-Reactive Protein. Clin Infect Dis. 2026;82(2):e239-e247. PMID 39509711; PMCID PMC13016676; doi:10.1093/cid/ciae549.", "link": "https://doi.org/10.1093/cid/ciae549", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Cruciani2004", "text": "Cruciani M, Scarparo C, Malena M, Bosco O, Serpelloni G, Mengoli C. Meta-analysis of BACTEC MGIT 960 and BACTEC 460 TB, with or without solid media, for detection of mycobacteria. J Clin Microbiol. 2004;42(5):2321-5. PMID 15131224; PMCID PMC404614; doi:10.1128/JCM.42.5.2321-2325.2004.", "link": "https://doi.org/10.1128/jcm.42.5.2321-2325.2004", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "daCosta2027", "text": "da Costa C, Marais BJ, Goletti D, Onyebujoh P, Chakaya J, Walzl G, et al. Advances in development of tuberculosis vaccines and preventive drug therapies: current pipeline, evidence, and access. Lancet Microbe. 2027:101443 (online 26 April 2026). PMID 42526489; doi:10.1016/j.lanmic.2026.101443.", "link": "https://doi.org/10.1016/j.lanmic.2026.101443", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dagnew2026", "text": "Dagnew AF, Noble R, Cinar A, Burhan E, Churchyard G, Fairlie L, et al. Design and feasibility considerations for a phase 3 efficacy trial of the M72/AS01(E-4) tuberculosis vaccine. Vaccine. 2026;85:128690. PMID 42119392; doi:10.1016/j.vaccine.2026.128690.", "link": "https://doi.org/10.1016/j.vaccine.2026.128690", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Daley2020", "text": "Daley CL, Iaccarino JM, Lange C, Cambau E, Wallace RJ, Andrejak C, et al. Treatment of Nontuberculous Mycobacterial Pulmonary Disease: An Official ATS/ERS/ESCMID/IDSA Clinical Practice Guideline. Clin Infect Dis. 2020;71(4):905-913. PMID 32797222; PMCID PMC7768745; doi:10.1093/cid/ciaa1125.", "link": "https://doi.org/10.1093/cid/ciaa1125", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Daniel2006", "text": "Daniel TM. The history of tuberculosis. Respir Med. 2006;100(11):1862-70. PMID 16949809; doi:10.1016/j.rmed.2006.08.006.", "link": "https://doi.org/10.1016/j.rmed.2006.08.006", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Darpo2026", "text": "Darpo B, Nedelman J, Bruning-Barry R, Hickman D, Kleiman R, Lombardi A, et al. Cardiodynamic evaluation of sorfequiline (TBAJ-876): results from a first-in-human study. Antimicrob Agents Chemother. 2026;70(3):e0127325. PMID 41616265; PMCID PMC12959150; doi:10.1128/aac.01273-25.", "link": "https://doi.org/10.1128/aac.01273-25", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Darrah2020", "text": "Darrah PA, Zeppa JJ, Maiello P, Hackney JA, Wadsworth MH 2nd, Hughes TK, et al. Prevention of tuberculosis in macaques after intravenous BCG immunization. Nature. 2020;577(7788):95-102. PMID 31894150; PMCID PMC7015856; doi:10.1038/s41586-019-1817-8.", "link": "https://doi.org/10.1038/s41586-019-1817-8", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dartois2014", "text": "Dartois V. The path of anti-tuberculosis drugs: from blood to lesions to mycobacterial cells. Nat Rev Microbiol. 2014;12(3):159-167. PMID 24487820; PMCID PMC4341982; doi:10.1038/nrmicro3200.", "link": "https://doi.org/10.1038/nrmicro3200", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dartois2022", "text": "Dartois VA, Rubin EJ. Anti-tuberculosis treatment strategies and drug development: challenges and priorities. Nat Rev Microbiol. 2022;20(11):685-701. PMID 35478222; PMCID PMC9045034; doi:10.1038/s41579-022-00731-y.", "link": "https://doi.org/10.1038/s41579-022-00731-y", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Datiko2020", "text": "Datiko DG, Jerene D, Suarez P. Stigma matters in ending tuberculosis: Nationwide survey of stigma in Ethiopia. BMC Public Health. 2020;20(1):190. PMID 32028914; PMCID PMC7006204; doi:10.1186/s12889-019-7915-6.", "link": "https://doi.org/10.1186/s12889-019-7915-6", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Datta2017LGH", "text": "Datta S, Shah L, Gilman RH, Evans CA. Comparison of sputum collection methods for tuberculosis diagnosis: a systematic review and pairwise and network meta-analysis. Lancet Glob Health. 2017;5(8):e760-e771. PMID 28625793; PMCID PMC5567202; doi:10.1016/S2214-109X(17)30201-2.", "link": "https://doi.org/10.1016/s2214-109x(17)30201-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "David1970", "text": "David HL. Probability distribution of drug-resistant mutants in unselected populations of Mycobacterium tuberculosis. Appl Microbiol. 1970;20(5):810-814. PMID 4991927; PMCID PMC377053; doi:10.1128/am.20.5.810-814.1970.", "link": "https://doi.org/10.1128/am.20.5.810-814.1970", "areas": ["C", "F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Davies1999", "text": "Davies RP, Tocque K, Bellis MA, Rimmington T, Davies PD. Historical declines in tuberculosis in England and Wales: improving social conditions or natural selection? Int J Tuberc Lung Dis. 1999;3(12):1051-4. PMID 10599006.", "link": "https://pubmed.ncbi.nlm.nih.gov/10599006/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Davis2009", "text": "Davis JM, Ramakrishnan L. The role of the granuloma in expansion and dissemination of early tuberculous infection. Cell. 2009;136(1):37-49. PMID 19135887; PMCID PMC3134310; doi:10.1016/j.cell.2008.11.014.", "link": "https://doi.org/10.1016/j.cell.2008.11.014", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dawson2025", "text": "Dawson R, Diacon AH, De Jager V, Narunsky K, Moodley VM, Stinson KW, et al. Safety, pharmacokinetics, and early bactericidal activity of quabodepistat in combination with delamanid, bedaquiline, or both in adults with pulmonary tuberculosis: a randomised, active-controlled, open-label trial. Lancet Infect Dis. 2025;25(4):435-444. PMID 39612928; PMCID PMC11946933; doi:10.1016/S1473-3099(24)00601-7.", "link": "https://doi.org/10.1016/s1473-3099(24)00601-7", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dean2022", "text": "Dean AS, Tosas Auguet O, Glaziou P, Zignol M, Ismail N, Kasaeva T, et al. 25 years of surveillance of drug-resistant tuberculosis: achievements, challenges, and way forward. Lancet Infect Dis. 2022;22(7):e191-e196. PMID 35248168; PMCID PMC8893725; doi:10.1016/S1473-3099(21)00808-2.", "link": "https://doi.org/10.1016/s1473-3099(21)00808-2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "deBeaucoudrey2010", "text": "de Beaucoudrey L, Samarina A, Bustamante J, Cobat A, Boisson-Dupuis S, Feinberg J, et al. Revisiting human IL-12Rβ1 deficiency: a survey of 141 patients from 30 countries. Medicine (Baltimore). 2010;89(6):381-402. PMID 21057261; PMCID PMC3129625; doi:10.1097/MD.0b013e3181fdd832.", "link": "https://doi.org/10.1097/md.0b013e3181fdd832", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Denning2016", "text": "Denning DW, Cadranel J, Beigelman-Aubry C, Ader F, Chakrabarti A, Blot S, et al. Chronic pulmonary aspergillosis: rationale and clinical guidelines for diagnosis and management. Eur Respir J. 2016;47(1):45-68. PMID 26699723; doi:10.1183/13993003.00583-2015.", "link": "https://doi.org/10.1183/13993003.00583-2015", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Detjen2015", "text": "Detjen AK, DiNardo AR, Leyden J, Steingart KR, Menzies D, Schiller I, et al. Xpert MTB/RIF assay for the diagnosis of pulmonary tuberculosis in children: a systematic review and meta-analysis. Lancet Respir Med. 2015;3(6):451-61. PMID 25812968; PMCID PMC4756280; doi:10.1016/S2213-2600(15)00095-8.", "link": "https://doi.org/10.1016/s2213-2600(15)00095-8", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dhana2022", "text": "Dhana A, Hamada Y, Kengne AP, Kerkhoff AD, Rangaka MX, Kredo T, et al. Tuberculosis screening among ambulatory people living with HIV: a systematic review and individual participant data meta-analysis. Lancet Infect Dis. 2022;22(4):507-518. PMID 34800394; PMCID PMC8942858; doi:10.1016/S1473-3099(21)00387-X.", "link": "https://doi.org/10.1016/s1473-3099(21)00387-x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dharmadhikari2012", "text": "Dharmadhikari AS, Mphahlele M, Stoltz A, Venter K, Mathebula R, Masotla T, et al. Surgical face masks worn by patients with multidrug-resistant tuberculosis: impact on infectivity of air on a hospital ward. Am J Respir Crit Care Med. 2012;185(10):1104-9. PMID 22323300; PMCID PMC3359891; doi:10.1164/rccm.201107-1190OC.", "link": "https://doi.org/10.1164/rccm.201107-1190oc", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Dharmadhikari2014", "text": "Dharmadhikari AS, Mphahlele M, Venter K, Stoltz A, Mathebula R, Masotla T, et al. Rapid impact of effective treatment on transmission of multidrug-resistant tuberculosis. Int J Tuberc Lung Dis. 2014;18(9):1019-25. PMID 25189547; PMCID PMC4692272; doi:10.5588/ijtld.13.0834.", "link": "https://doi.org/10.5588/ijtld.13.0834", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Dheda2024", "text": "Dheda K, Mirzayev F, Cirillo DM, Udwadia Z, Dooley KE, Chang KC, et al. Multidrug-resistant tuberculosis. Nat Rev Dis Primers. 2024;10(1):22. PMID 38523140; PMCID PMC13335523; doi:10.1038/s41572-024-00504-2.", "link": "https://doi.org/10.1038/s41572-024-00504-2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Diacon2014", "text": "Diacon AH, Pym A, Grobusch MP, de los Rios JM, Gotuzzo E, Vasilyeva I, et al. Multidrug-resistant tuberculosis and culture conversion with bedaquiline. N Engl J Med. 2014;371(8):723-32. PMID 25140958; doi:10.1056/NEJMoa1313865.", "link": "https://doi.org/10.1056/nejmoa1313865", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Diacon2024", "text": "Diacon AH, Barry CE 3rd, Carlton A, Chen RY, Davies M, de Jager V, et al. A first-in-class leucyl-tRNA synthetase inhibitor, ganfeborole, for rifampicin-susceptible tuberculosis: a phase 2a open-label, randomized trial. Nat Med. 2024;30(3):896-904. PMID 38365949; PMCID PMC10957473; doi:10.1038/s41591-024-02829-7.", "link": "https://doi.org/10.1038/s41591-024-02829-7", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Diallo2018", "text": "Diallo T, Adjobimey M, Ruslami R, Trajman A, Sow O, Obeng Baah J, et al. Safety and Side Effects of Rifampin versus Isoniazid in Children. N Engl J Med. 2018;379(5):454-463. PMID 30067928; doi:10.1056/NEJMoa1714284.", "link": "https://doi.org/10.1056/nejmoa1714284", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Diedrich2011", "text": "Diedrich CR, Flynn JL. HIV-1/Mycobacterium tuberculosis coinfection immunology: how does HIV-1 exacerbate tuberculosis? Infect Immun. 2011;79(4):1407-1417. PMID 21245275; PMCID PMC3067569; doi:10.1128/IAI.01126-10.", "link": "https://doi.org/10.1128/iai.01126-10", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Diel2012", "text": "Diel R, Loddenkemper R, Nienhaus A. Predictive value of interferon-γ release assays and tuberculin skin testing for progression from latent TB infection to disease state: a meta-analysis. Chest. 2012;142(1):63-75. PMID 22490872; doi:10.1378/chest.11-3157.", "link": "https://doi.org/10.1378/chest.11-3157", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dillard2021", "text": "Dillard LK, Martinez RX, Perez LL, Fullerton AM, Chadha S, McMahon CM. Prevalence of aminoglycoside-induced hearing loss in drug-resistant tuberculosis patients: A systematic review. J Infect. 2021;83(1):27-36. PMID 34015383; doi:10.1016/j.jinf.2021.05.010.", "link": "https://doi.org/10.1016/j.jinf.2021.05.010", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "DiTanna2019", "text": "Di Tanna GL, Khaki AR, Theron G, McCarthy K, Cox H, Mupfumi L, et al. Effect of Xpert MTB/RIF on clinical outcomes in routine care settings: individual patient data meta-analysis. Lancet Glob Health. 2019;7(2):e191-e199. PMID 30683238; PMCID PMC6366854; doi:10.1016/S2214-109X(18)30458-3.", "link": "https://doi.org/10.1016/s2214-109x(18)30458-3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Divangahi2013", "text": "Divangahi M, Behar SM, Remold H. Dying to live: how the death modality of the infected macrophage affects immunity to tuberculosis. Adv Exp Med Biol. 2013;783:103-120. PMID 23468106; PMCID PMC4678885; doi:10.1007/978-1-4614-6111-1_6.", "link": "https://doi.org/10.1007/978-1-4614-6111-1_6", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dodd2017", "text": "Dodd PJ, Yuen CM, Sismanidis C, Seddon JA, Jenkins HE. The global burden of tuberculosis mortality in children: a mathematical modelling study. Lancet Glob Health. 2017;5(9):e898-e906. PMID 28807188; PMCID PMC5556253; doi:10.1016/S2214-109X(17)30289-9.", "link": "https://doi.org/10.1016/s2214-109x(17)30289-9", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Dogar2020", "text": "Dogar O, Keding A, Gabe R, Marshall AM, Huque R, Barua D, et al. Cytisine for smoking cessation in patients with tuberculosis: a multicentre, randomised, double-blind, placebo-controlled phase 3 trial. Lancet Glob Health. 2020;8(11):e1408-e1417. PMID 33069301; doi:10.1016/S2214-109X(20)30312-0.", "link": "https://doi.org/10.1016/s2214-109x(20)30312-0", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Domaszewska2025", "text": "Domaszewska T, Koch A, Jackson S, Häcker B, Jonsson J, Langholz Kristensen K, et al. Tuberculosis rates in migrants in low-incidence European countries, according to country of origin, reporting country and recency of immigration, 2014 to 2020. Euro Surveill. 2025;30(11):2400489. PMID 40116030; PMCID PMC11927070; doi:10.2807/1560-7917.ES.2025.30.11.2400489.", "link": "https://doi.org/10.2807/1560-7917.es.2025.30.11.2400489", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Dommergues2009", "text": "Dommergues MA, de La Rocque F, Guy C, Lécuyer A, Jacquet A, Guérin N, et al. Local and regional adverse reactions to BCG-SSI vaccination: a 12-month cohort follow-up study. Vaccine. 2009;27(50):6967-73. PMID 19800440; doi:10.1016/j.vaccine.2009.09.073.", "link": "https://doi.org/10.1016/j.vaccine.2009.09.073", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dooley2013", "text": "Dooley KE, Sayre P, Borland J, Purdy E, Chen S, Song I, et al. Safety, tolerability, and pharmacokinetics of the HIV integrase inhibitor dolutegravir given twice daily with rifampin or once daily with rifabutin: results of a phase 1 study among healthy subjects. J Acquir Immune Defic Syndr. 2013;62(1):21-7. PMID 23075918; doi:10.1097/QAI.0b013e318276cda9.", "link": "https://doi.org/10.1097/qai.0b013e318276cda9", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Dooley2020CID", "text": "Dooley KE, Kaplan R, Mwelase N, Grinsztejn B, Ticona E, Lacerda M, et al. Dolutegravir-based Antiretroviral Therapy for Patients Coinfected With Tuberculosis and Human Immunodeficiency Virus: A Multicenter, Noncomparative, Open-label, Randomized Trial. Clin Infect Dis. 2020;70(4):549-556. PMID 30918967; doi:10.1093/cid/ciz256.", "link": "https://doi.org/10.1093/cid/ciz256", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Dooley2020LancetHIV", "text": "Dooley KE, Savic R, Gupte A, Marzinke MA, Zhang N, Edward VA, et al. Once-weekly rifapentine and isoniazid for tuberculosis prevention in patients with HIV taking dolutegravir-based antiretroviral therapy: a phase 1/2 trial. Lancet HIV. 2020;7(6):e401-e409. PMID 32240629; doi:10.1016/S2352-3018(20)30032-1.", "link": "https://doi.org/10.1016/s2352-3018(20)30032-1", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Dooley2021LID", "text": "Dooley KE, Rosenkranz SL, Conradie F, Moran L, Hafner R, von Groote-Bidlingmaier F, et al. QT effects of bedaquiline, delamanid, or both in patients with rifampicin-resistant tuberculosis: a phase 2, open-label, randomised, controlled trial. Lancet Infect Dis. 2021;21(7):975-983. PMID 33587897; PMCID PMC8312310; doi:10.1016/S1473-3099(20)30770-2.", "link": "https://doi.org/10.1016/s1473-3099(20)30770-2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Dorhoi2016", "text": "Dorhoi A, Kaufmann SH. Pathology and immune reactivity: understanding multidimensionality in pulmonary tuberculosis. Semin Immunopathol. 2016;38(2):153-166. PMID 26438324; doi:10.1007/s00281-015-0531-3.", "link": "https://doi.org/10.1007/s00281-015-0531-3", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dorman2014HCW", "text": "Dorman SE, Belknap R, Graviss EA, Reves R, Schluger N, Weinfurter P, et al. Interferon-γ release assays and tuberculin skin testing for diagnosis of latent tuberculosis infection in healthcare workers in the United States. Am J Respir Crit Care Med. 2014;189(1):77-87. PMID 24299555; doi:10.1164/rccm.201302-0365OC.", "link": "https://doi.org/10.1164/rccm.201302-0365oc", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dorman2018Ultra", "text": "Dorman SE, Schumacher SG, Alland D, Nabeta P, Armstrong DT, King B, et al. Xpert MTB/RIF Ultra for detection of Mycobacterium tuberculosis and rifampicin resistance: a prospective multicentre diagnostic accuracy study. Lancet Infect Dis. 2018;18(1):76-84. PMID 29198911; PMCID PMC6168783; doi:10.1016/S1473-3099(17)30691-6.", "link": "https://doi.org/10.1016/s1473-3099(17)30691-6", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dorman2021", "text": "Dorman SE, Nahid P, Kurbatova EV, Phillips PPJ, Bryant K, Dooley KE, et al. Four-Month Rifapentine Regimens with or without Moxifloxacin for Tuberculosis. N Engl J Med. 2021;384(18):1705-1718. PMID 33951360; PMCID PMC8282329; doi:10.1056/NEJMoa2033400.", "link": "https://doi.org/10.1056/nejmoa2033400", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Drain2018", "text": "Drain PK, Bajema KL, Dowdy D, Dheda K, Naidoo K, Schumacher SG, et al. Incipient and subclinical tuberculosis: a clinical review of early stages and progression of infection. Clin Microbiol Rev. 2018;31(4):e00021-18. PMID 30021818; PMCID PMC6148193; doi:10.1128/CMR.00021-18.", "link": "https://doi.org/10.1128/cmr.00021-18", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Duko2020", "text": "Duko B, Bedaso A, Ayano G. The prevalence of depression among patients with tuberculosis: a systematic review and meta-analysis. Ann Gen Psychiatry. 2020;19:30. PMID 32419837; PMCID PMC7206806; doi:10.1186/s12991-020-00281-8.", "link": "https://doi.org/10.1186/s12991-020-00281-8", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Dulberger2020", "text": "Dulberger CL, Rubin EJ, Boutte CC. The mycobacterial cell envelope - a moving target. Nat Rev Microbiol. 2020;18(1):47-59. PMID 31728063; doi:10.1038/s41579-019-0273-7.", "link": "https://doi.org/10.1038/s41579-019-0273-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "EastAfricaBMRC1972", "text": "East African/British Medical Research Council. Controlled clinical trial of short-course (6-month) regimens of chemotherapy for treatment of pulmonary tuberculosis. Lancet. 1972;1(7760):1079-85. PMID 4112569. No authors listed in PubMed and no abstract; cited for the date only.", "link": "https://pubmed.ncbi.nlm.nih.gov/4112569/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Ehlers2012", "text": "Ehlers S, Schaible UE. The granuloma in tuberculosis: dynamics of a host-pathogen collusion. Front Immunol. 2012;3:411. PMID 23308075; PMCID PMC3538277; doi:10.3389/fimmu.2012.00411.", "link": "https://doi.org/10.3389/fimmu.2012.00411", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Elkington2011", "text": "Elkington P, Shiomi T, Breen R, Nuttall RK, Ugarte-Gil CA, Walker NF, et al. MMP-1 drives immunopathology in human tuberculosis and transgenic mice. J Clin Invest. 2011;121(5):1827-1833. PMID 21519144; PMCID PMC3083790; doi:10.1172/JCI45666.", "link": "https://doi.org/10.1172/jci45666", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Emery2021", "text": "Emery JC, Richards AS, Dale KD, McQuaid CF, White RG, Denholm JT, et al. Self-clearance of Mycobacterium tuberculosis infection: implications for lifetime risk and population at-risk of tuberculosis disease. Proc Biol Sci. 2021;288(1943):20201635. PMID 33467995; PMCID PMC7893269; doi:10.1098/rspb.2020.1635.", "link": "https://doi.org/10.1098/rspb.2020.1635", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Ernst2012", "text": "Ernst JD. The immunological life cycle of tuberculosis. Nat Rev Immunol. 2012;12(8):581-591. PMID 22790178; doi:10.1038/nri3259.", "link": "https://doi.org/10.1038/nri3259", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Escombe2007", "text": "Escombe AR, Oeser CC, Gilman RH, Navincopa M, Ticona E, Pan W, et al. Natural ventilation for the prevention of airborne contagion. PLoS Med. 2007;4(2):e68. PMID 17326709; PMCID PMC1808096; doi:10.1371/journal.pmed.0040068.", "link": "https://doi.org/10.1371/journal.pmed.0040068", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Escombe2007CID", "text": "Escombe AR, Oeser C, Gilman RH, Navincopa M, Ticona E, Martínez C, et al. The detection of airborne transmission of tuberculosis from HIV-infected patients, using an in vivo air sampling model. Clin Infect Dis. 2007;44(10):1349-57. PMID 17443474; PMCID PMC2912511; doi:10.1086/515397.", "link": "https://doi.org/10.1086/515397", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Escombe2008", "text": "Escombe AR, Moore DA, Gilman RH, Pan W, Navincopa M, Ticona E, et al. The infectiousness of tuberculosis patients coinfected with HIV. PLoS Med. 2008;5(9):e188. PMID 18798687; PMCID PMC2535657; doi:10.1371/journal.pmed.0050188.", "link": "https://doi.org/10.1371/journal.pmed.0050188", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Escombe2009", "text": "Escombe AR, Moore DA, Gilman RH, Navincopa M, Ticona E, Mitchell B, et al. Upper-room ultraviolet light and negative air ionization to prevent tuberculosis transmission. PLoS Med. 2009;6(3):e43. PMID 19296717; PMCID PMC2656548; doi:10.1371/journal.pmed.1000043.", "link": "https://doi.org/10.1371/journal.pmed.1000043", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Esmail2016", "text": "Esmail H, Lai RP, Lesosky M, Wilkinson KA, Graham CM, Coussens AK, et al. Characterization of progressive HIV-associated tuberculosis using 2-deoxy-2-[18F]fluoro-D-glucose positron emission and computed tomography. Nat Med. 2016;22(10):1090-1093. PMID 27595321; PMCID PMC5055809; doi:10.1038/nm.4161.", "link": "https://doi.org/10.1038/nm.4161", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ettehad2012", "text": "Ettehad D, Schaaf HS, Seddon JA, Cooke GS, Ford N. Treatment outcomes for children with multidrug-resistant tuberculosis: a systematic review and meta-analysis. Lancet Infect Dis. 2012;12(6):449-56. PMID 22373593; doi:10.1016/S1473-3099(12)70033-6.", "link": "https://doi.org/10.1016/s1473-3099(12)70033-6", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Eum2010", "text": "Eum SY, Kong JH, Hong MS, Lee YJ, Kim JH, Hwang SH, et al. Neutrophils are the predominant infected phagocytic cells in the airways of patients with active pulmonary TB. Chest. 2010;137(1):122-128. PMID 19749004; PMCID PMC2803122; doi:10.1378/chest.09-0903.", "link": "https://doi.org/10.1378/chest.09-0903", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ezer2013", "text": "Ezer N, Benedetti A, Darvish-Zargar M, Menzies D. Incidence of ethambutol-related visual impairment during treatment of active tuberculosis. Int J Tuberc Lung Dis. 2013;17(4):447-55. PMID 23394767; doi:10.5588/ijtld.11.0766.", "link": "https://doi.org/10.5588/ijtld.11.0766", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Farhat2006", "text": "Farhat M, Greenaway C, Pai M, Menzies D. False-positive tuberculin skin tests: what is the absolute effect of BCG and non-tuberculous mycobacteria? Int J Tuberc Lung Dis. 2006;10(11):1192-204. PMID 17131776.", "link": "https://pubmed.ncbi.nlm.nih.gov/17131776/", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "FDA-Ethambutol", "text": "Ethambutol hydrochloride tablets. US prescribing information (Epic Pharma). openFDA drug label set_id 08decdf3-a397-42e7-8ac3-e489c0cc7085; effective 2023-11-08.", "link": "", "areas": ["E", "G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Isoniazid", "text": "Isoniazid tablets. US prescribing information (Bryant Ranch Prepack). openFDA drug label set_id 03bf3bd5-64f9-4491-89fd-96c5c10d0129; effective 2026-02-16.", "link": "", "areas": ["E", "G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Moxifloxacin", "text": "Moxifloxacin hydrochloride tablets. US prescribing information (A-S Medication Solutions). openFDA drug label set_id 02c29e8e-8346-4e28-b7fc-2f4cb61ad37d; effective 2024-09-18.", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-NDA204384", "text": "US Food and Drug Administration. Drugs@FDA: SIRTURO (bedaquiline), NDA 204384, original approval 28 December 2012 (priority review). Record read through the openFDA drugsfda endpoint on 2026-10-30.", "link": "", "areas": ["A"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-NDA212862", "text": "US Food and Drug Administration. Drugs@FDA: Pretomanid, NDA 212862 (sponsor Mylan Ireland Ltd), original approval 14 August 2019. Record read through the openFDA drugsfda endpoint on 2026-10-30.", "link": "", "areas": ["A"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Pretomanid", "text": "Pretomanid tablets. US prescribing information (Viatris Specialty LLC). openFDA drug label set_id f1906fc9-cb3c-4e13-8a4a-da76100c1bf3; effective 2024-11-15.", "link": "", "areas": ["E", "F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Priftin", "text": "PRIFTIN (rifapentine) tablets. US prescribing information (sanofi-aventis U.S. LLC). openFDA drug label set_id 3a64fb70-b85e-43d9-8bcd-7e893f568ae1; effective 2026-02-06.", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Pyrazinamide", "text": "Pyrazinamide tablets. US prescribing information (ANI Pharmaceuticals). openFDA drug label set_id 262d8829-728c-48db-b89b-88d13b87e684; effective 2026-03-02.", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-QFTPlus", "text": "US Food and Drug Administration. Premarket approval P010033/S031: QuantiFERON-TB Gold Plus (Qiagen), decision date 7 June 2017, \"approval for a design change to the device TB Antigen blood collection tubes\". openFDA device PMA endpoint.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Rifampin", "text": "Rifampin capsules, oral. US prescribing information (Bryant Ranch Prepack). openFDA drug label set_id 0cb75e95-d165-4580-9340-42d7a9fd546e; effective 2026-03-12.", "link": "", "areas": ["E", "G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Sirturo", "text": "SIRTURO (bedaquiline) tablets. US prescribing information (Janssen Products, LP). openFDA drug label set_id 1534c9ae-4948-4cf4-9f66-222a99db6d0e; effective 2025-10-17.", "link": "", "areas": ["E", "F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Tivicay", "text": "TIVICAY and TIVICAY PD (dolutegravir) tablets, US prescribing information (repackager listing). Label effective 2026-05-22; openFDA set_id 485bc9db-8665-9f5a-e063-6394a90a7921.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Zyvox", "text": "ZYVOX (linezolid). US prescribing information (Pharmacia & Upjohn Company LLC). openFDA drug label set_id 3e5e9975-6f36-42e4-ab46-0e75dda83592; effective 2026-07-09.", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "Fennelly2004", "text": "Fennelly KP, Martyny JW, Fulton KE, Orme IM, Cave DM, Heifets LB. Cough-generated aerosols of Mycobacterium tuberculosis: a new method to study infectiousness. Am J Respir Crit Care Med. 2004;169(5):604-9. PMID 14656754; doi:10.1164/rccm.200308-1101OC.", "link": "https://doi.org/10.1164/rccm.200308-1101oc", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Fennelly2012", "text": "Fennelly KP, Jones-López EC, Ayakaka I, Kim S, Menyha H, Kirenga B, et al. Variability of infectious aerosols produced during coughing by patients with pulmonary tuberculosis. Am J Respir Crit Care Med. 2012;186(5):450-7. PMID 22798319; PMCID PMC3443801; doi:10.1164/rccm.201203-0444OC.", "link": "https://doi.org/10.1164/rccm.201203-0444oc", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Fennelly2020", "text": "Fennelly KP. Particle sizes of infectious aerosols: implications for infection control. Lancet Respir Med. 2020;8(9):914-924. PMID 32717211; PMCID PMC7380927; doi:10.1016/S2213-2600(20)30323-4.", "link": "https://doi.org/10.1016/s2213-2600(20)30323-4", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Filardo2022", "text": "Filardo TD, Feng PJ, Pratt RH, Price SF, Self JL. Tuberculosis - United States, 2021. MMWR Morb Mortal Wkly Rep. 2022;71(12):441-446. PMID 35324877; PMCID PMC8956339; doi:10.15585/mmwr.mm7112a1.", "link": "https://doi.org/10.15585/mmwr.mm7112a1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Fine1995", "text": "Fine PE. Variation in protection by BCG: implications of and for heterologous immunity. Lancet. 1995;346(8986):1339-45. PMID 7475776; doi:10.1016/s0140-6736(95)92348-9.", "link": "https://doi.org/10.1016/s0140-6736(95)92348-9", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Finken1993", "text": "Finken M, Kirschner P, Meier A, Wrede A, Böttger EC. Molecular basis of streptomycin resistance in Mycobacterium tuberculosis: alterations of the ribosomal protein S12 gene and point mutations within a functional 16S ribosomal RNA pseudoknot. Mol Microbiol. 1993;9(6):1239-1246. PMID 7934937; doi:10.1111/j.1365-2958.1993.tb01253.x.", "link": "https://doi.org/10.1111/j.1365-2958.1993.tb01253.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Floyd2018", "text": "Floyd K, Glaziou P, Houben RMGJ, Sumner T, White RG, Raviglione M. Global tuberculosis targets and milestones set for 2016-2035: definition and rationale. Int J Tuberc Lung Dis. 2018;22(7):723-730. PMID 29914597; PMCID PMC6005124; doi:10.5588/ijtld.17.0835.", "link": "https://doi.org/10.5588/ijtld.17.0835", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Flynn1993", "text": "Flynn JL, Chan J, Triebold KJ, Dalton DK, Stewart TA, Bloom BR. An essential role for interferon gamma in resistance to Mycobacterium tuberculosis infection. J Exp Med. 1993;178(6):2249-2254. PMID 7504064; PMCID PMC2191274; doi:10.1084/jem.178.6.2249.", "link": "https://doi.org/10.1084/jem.178.6.2249", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Flynn1995", "text": "Flynn JL, Goldstein MM, Chan J, Triebold KJ, Pfeffer K, Lowenstein CJ, et al. Tumor necrosis factor-alpha is required in the protective immune response against Mycobacterium tuberculosis in mice. Immunity. 1995;2(6):561-572. PMID 7540941; doi:10.1016/1074-7613(95)90001-2.", "link": "https://doi.org/10.1016/1074-7613(95)90001-2", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Flynn2001", "text": "Flynn JL, Chan J. Immunology of tuberculosis. Annu Rev Immunol. 2001;19:93-129. PMID 11244032; doi:10.1146/annurev.immunol.19.1.93.", "link": "https://doi.org/10.1146/annurev.immunol.19.1.93", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Flynn2011", "text": "Flynn JL, Chan J, Lin PL. Macrophages and control of granulomatous inflammation in tuberculosis. Mucosal Immunol. 2011;4(3):271-278. PMID 21430653; PMCID PMC3311958; doi:10.1038/mi.2011.14.", "link": "https://doi.org/10.1038/mi.2011.14", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fontanilla2011", "text": "Fontanilla JM, Barnes A, von Reyn CF. Current diagnosis and management of peripheral tuberculous lymphadenitis. Clin Infect Dis. 2011;53(6):555-62. PMID 21865192; doi:10.1093/cid/cir454.", "link": "https://doi.org/10.1093/cid/cir454", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ford2011", "text": "Ford CB, Lin PL, Chase MR, Shah RR, Iartchouk O, Galagan J, et al. Use of whole genome sequencing to estimate the mutation rate of Mycobacterium tuberculosis during latent infection. Nat Genet. 2011;43(5):482-486. PMID 21516081; PMCID PMC3101871; doi:10.1038/ng.811.", "link": "https://doi.org/10.1038/ng.811", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fox2013", "text": "Fox GJ, Barry SE, Britton WJ, Marks GB. Contact investigation for tuberculosis: a systematic review and meta-analysis. Eur Respir J. 2013;41(1):140-56. PMID 22936710; PMCID PMC3533588; doi:10.1183/09031936.00070812.", "link": "https://doi.org/10.1183/09031936.00070812", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Fox2018NEJM", "text": "Fox GJ, Nhung NV, Sy DN, Hoa NLP, Anh LTN, Anh NT, et al. Household-Contact Investigation for Detection of Tuberculosis in Vietnam. N Engl J Med. 2018;378(3):221-229. PMID 29342390; doi:10.1056/NEJMoa1700209.", "link": "https://doi.org/10.1056/nejmoa1700209", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Fox2024VQUIN", "text": "Fox GJ, Nhung NV, Cam Binh N, Hoa NB, Garden FL, Benedetti A, et al. Levofloxacin for the Prevention of Multidrug-Resistant Tuberculosis in Vietnam. N Engl J Med. 2024;391(24):2304-2314. PMID 39693541; doi:10.1056/NEJMoa2314325.", "link": "https://doi.org/10.1056/nejmoa2314325", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Frascella2021", "text": "Frascella B, Richards AS, Sossen B, Emery JC, Odone A, Law I, et al. Subclinical tuberculosis disease - a review and analysis of prevalence surveys to inform definitions, burden, associations, and screening methodology. Clin Infect Dis. 2021;73(3):e830-e841. PMID 32936877; PMCID PMC8326537; doi:10.1093/cid/ciaa1402.", "link": "https://doi.org/10.1093/cid/ciaa1402", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fregonese2018", "text": "Fregonese F, Ahuja SD, Akkerman OW, Arakaki-Sanchez D, Ayakaka I, Baghaei P, et al. Comparison of different treatments for isoniazid-resistant tuberculosis: an individual patient data meta-analysis. Lancet Respir Med. 2018;6(4):265-275. PMID 29595509; PMCID PMC9017096; doi:10.1016/S2213-2600(18)30078-X.", "link": "https://doi.org/10.1016/s2213-2600(18)30078-x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Frieden1995", "text": "Frieden TR, Fujiwara PI, Washko RM, Hamburg MA. Tuberculosis in New York City--turning the tide. N Engl J Med. 1995;333(4):229-33. PMID 7791840; doi:10.1056/NEJM199507273330406.", "link": "https://doi.org/10.1056/nejm199507273330406", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gagneux2018", "text": "Gagneux S. Ecology and evolution of Mycobacterium tuberculosis. Nat Rev Microbiol. 2018;16(4):202-213. PMID 29456241; doi:10.1038/nrmicro.2018.8.", "link": "https://doi.org/10.1038/nrmicro.2018.8", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gandhi2006", "text": "Gandhi NR, Moll A, Sturm AW, Pawinski R, Govender T, Lalloo U, et al. Extensively drug-resistant tuberculosis as a cause of death in patients co-infected with tuberculosis and HIV in a rural area of South Africa. Lancet. 2006;368(9547):1575-80. PMID 17084757; doi:10.1016/S0140-6736(06)69573-1.", "link": "https://doi.org/10.1016/s0140-6736(06)69573-1", "areas": ["B", "F"], "unverified": false, "validated": "PubMed"}, {"key": "GarciaPrats2025", "text": "Garcia-Prats AJ, Garcia-Cremades M, Cox V, Kredo T, Dunbar R, Schaaf HS, et al. Characteristics of children and adolescents with multidrug-resistant and rifampicin-resistant tuberculosis and their association with treatment outcomes: a systematic review and individual participant data meta-analysis. Lancet Child Adolesc Health. 2025;9(2):100-111. PMID 39855750; PMCID PMC13289721; doi:10.1016/S2352-4642(24)00330-4.", "link": "https://doi.org/10.1016/s2352-4642(24)00330-4", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "GBD2021TB2024", "text": "GBD 2021 Tuberculosis Collaborators. Global, regional, and national age-specific progress towards the 2020 milestones of the WHO End TB Strategy: a systematic analysis for the Global Burden of Disease Study 2021. Lancet Infect Dis. 2024;24(7):698-725. PMID 38518787; PMCID PMC11187709; doi:10.1016/S1473-3099(24)00007-0.", "link": "https://doi.org/10.1016/s1473-3099(24)00007-0", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Geldmacher2010", "text": "Geldmacher C, Ngwenyama N, Schuetz A, Petrovas C, Reither K, Heeregrave EJ, et al. Preferential infection and depletion of Mycobacterium tuberculosis-specific CD4 T cells after HIV-1 infection. J Exp Med. 2010;207(13):2869-2881. PMID 21115690; PMCID PMC3005236; doi:10.1084/jem.20100090.", "link": "https://doi.org/10.1084/jem.20100090", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gengenbacher2012", "text": "Gengenbacher M, Kaufmann SH. Mycobacterium tuberculosis: success through dormancy. FEMS Microbiol Rev. 2012;36(3):514-532. PMID 22320122; PMCID PMC3319523; doi:10.1111/j.1574-6976.2012.00331.x.", "link": "https://doi.org/10.1111/j.1574-6976.2012.00331.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Getahun2011", "text": "Getahun H, Kittikraisak W, Heilig CM, Corbett EL, Ayles H, Cain KP, et al. Development of a standardized screening rule for tuberculosis in people living with HIV in resource-constrained settings: individual participant data meta-analysis of observational studies. PLoS Med. 2011;8(1):e1000391. PMID 21267059; PMCID PMC3022524; doi:10.1371/journal.pmed.1000391.", "link": "https://doi.org/10.1371/journal.pmed.1000391", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gideon2015", "text": "Gideon HP, Phuah J, Myers AJ, Bryson BD, Rodgers MA, Coleman MT, et al. Variability in tuberculosis granuloma T cell responses exists, but a balance of pro- and anti-inflammatory cytokines is associated with sterilization. PLoS Pathog. 2015;11(1):e1004603. PMID 25611466; PMCID PMC4303275; doi:10.1371/journal.ppat.1004603.", "link": "https://doi.org/10.1371/journal.ppat.1004603", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gill2009", "text": "Gill WP, Harik NS, Whiddon MR, Liao RP, Mittler JE, Sherman DR. A replication clock for Mycobacterium tuberculosis. Nat Med. 2009;15(2):211-214. PMID 19182798; PMCID PMC2779834; doi:10.1038/nm.1915.", "link": "https://doi.org/10.1038/nm.1915", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gillespie2014", "text": "Gillespie SH, Crook AM, McHugh TD, Mendel CM, Meredith SK, Murray SR, et al. Four-month moxifloxacin-based regimens for drug-sensitive tuberculosis. N Engl J Med. 2014;371(17):1577-87. PMID 25196020; PMCID PMC4277680; doi:10.1056/NEJMoa1407426.", "link": "https://doi.org/10.1056/nejmoa1407426", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Glaziou2018", "text": "Glaziou P, Floyd K, Raviglione MC. Global epidemiology of tuberculosis. Semin Respir Crit Care Med. 2018;39(3):271-285. PMID 30071543; doi:10.1055/s-0038-1651492.", "link": "https://doi.org/10.1055/s-0038-1651492", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Goodall2022", "text": "Goodall RL, Meredith SK, Nunn AJ, Bayissa A, Bhatnagar AK, Bronson G, et al. Evaluation of two short standardised regimens for the treatment of rifampicin-resistant tuberculosis (STREAM stage 2): an open-label, multicentre, randomised, non-inferiority trial. Lancet. 2022;400(10366):1858-1868. PMID 36368336; PMCID PMC7614824; doi:10.1016/S0140-6736(22)02078-5.", "link": "https://doi.org/10.1016/s0140-6736(22)02078-5", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Goodall2024", "text": "Goodall RL, Nunn AJ, Meredith SK, Bayissa A, Bhatnagar AK, Chiang CY, et al. Long-term efficacy and safety of two short standardised regimens for the treatment of rifampicin-resistant tuberculosis (STREAM stage 2): extended follow-up of an open-label, multicentre, randomised, non-inferiority trial. Lancet Respir Med. 2024;12(12):975-987. PMID 39366400; doi:10.1016/S2213-2600(24)00186-3.", "link": "https://doi.org/10.1016/s2213-2600(24)00186-3", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Gradmann2006", "text": "Gradmann C. Robert Koch and the white death: from tuberculosis to tuberculin. Microbes Infect. 2006;8(1):294-301. PMID 16126424; doi:10.1016/j.micinf.2005.06.004.", "link": "https://doi.org/10.1016/j.micinf.2005.06.004", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Graham2015", "text": "Graham SM, Cuevas LE, Jean-Philippe P, Browning R, Casenghi M, Detjen AK, et al. Clinical Case Definitions for Classification of Intrathoracic Tuberculosis in Children: An Update. Clin Infect Dis. 2015;61(Suppl 3):S179-87. PMID 26409281; PMCID PMC4583568; doi:10.1093/cid/civ581.", "link": "https://doi.org/10.1093/cid/civ581", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Groschel2016", "text": "Gröschel MI, Sayes F, Simeone R, Majlessi L, Brosch R. ESX secretion systems: mycobacterial evolution to counter host immunity. Nat Rev Microbiol. 2016;14(11):677-691. PMID 27665717; doi:10.1038/nrmicro.2016.131.", "link": "https://doi.org/10.1038/nrmicro.2016.131", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Guglielmetti2025LRM", "text": "Guglielmetti L, Khan U, Velásquez GE, Gouillou M, Ali MH, Amjad S, et al. Bedaquiline, delamanid, linezolid, and clofazimine for rifampicin-resistant and fluoroquinolone-resistant tuberculosis (endTB-Q): an open-label, multicentre, stratified, non-inferiority, randomised, controlled, phase 3 trial. Lancet Respir Med. 2025;13(9):809-820. PMID 40683298; PMCID PMC13508822; doi:10.1016/S2213-2600(25)00194-8.", "link": "https://doi.org/10.1016/s2213-2600(25)00194-8", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Guglielmetti2025NEJM", "text": "Guglielmetti L, Khan U, Velásquez GE, Gouillou M, Abubakirov A, Baudin E, et al. Oral Regimens for Rifampin-Resistant, Fluoroquinolone-Susceptible Tuberculosis. N Engl J Med. 2025;392(5):468-482. PMID 39879593; PMCID PMC7617355; doi:10.1056/NEJMoa2400327.", "link": "https://doi.org/10.1056/nejmoa2400327", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Guirado2013", "text": "Guirado E, Schlesinger LS. Modeling the Mycobacterium tuberculosis granuloma - the critical battlefield in host immunity and disease. Front Immunol. 2013;4:98. PMID 23626591; PMCID PMC3631743; doi:10.3389/fimmu.2013.00098.", "link": "https://doi.org/10.3389/fimmu.2013.00098", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gunasekera2023", "text": "Gunasekera KS, Marcy O, Muñoz J, Lopez-Varela E, Sekadde MP, Franke MF, et al. Development of treatment-decision algorithms for children evaluated for pulmonary tuberculosis: an individual participant data meta-analysis. Lancet Child Adolesc Health. 2023;7(5):336-346. PMID 36924781; PMCID PMC10127218; doi:10.1016/S2352-4642(23)00004-4.", "link": "https://doi.org/10.1016/s2352-4642(23)00004-4", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gupta2019NEJM", "text": "Gupta A, Montepiedra G, Aaron L, Theron G, McCarthy K, Bradford S, et al. Isoniazid Preventive Therapy in HIV-Infected Pregnant and Postpartum Women. N Engl J Med. 2019;381(14):1333-1346. PMID 31577875; PMCID PMC7051859; doi:10.1056/NEJMoa1813060.", "link": "https://doi.org/10.1056/nejmoa1813060", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "GuptaRK2015AIDS", "text": "Gupta RK, Lucas SB, Fielding KL, Lawn SD. Prevalence of tuberculosis in post-mortem studies of HIV-infected adults and children in resource-limited settings: a systematic review and meta-analysis. AIDS. 2015;29(15):1987-2002. PMID 26266773; PMCID PMC4568896; doi:10.1097/QAD.0000000000000802.", "link": "https://doi.org/10.1097/qad.0000000000000802", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "GuptaWright2018", "text": "Gupta-Wright A, Corbett EL, van Oosterhout JJ, Wilson D, Grint D, Alufandika-Moyo M, et al. Rapid urine-based screening for tuberculosis in HIV-positive patients admitted to hospital in Africa (STAMP): a pragmatic, multicentre, parallel-group, double-blind, randomised controlled trial. Lancet. 2018;392(10144):292-301. PMID 30032978; PMCID PMC6078909; doi:10.1016/S0140-6736(18)31267-4.", "link": "https://doi.org/10.1016/s0140-6736(18)31267-4", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gutierrez2004", "text": "Gutierrez MG, Master SS, Singh SB, Taylor GA, Colombo MI, Deretic V. Autophagy is a defense mechanism inhibiting BCG and Mycobacterium tuberculosis survival in infected macrophages. Cell. 2004;119(6):753-766. PMID 15607973; doi:10.1016/j.cell.2004.11.038.", "link": "https://doi.org/10.1016/j.cell.2004.11.038", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hamada2018", "text": "Hamada Y, Lujan J, Schenkel K, Ford N, Getahun H. Sensitivity and specificity of WHO's recommended four-symptom screening rule for tuberculosis in people living with HIV: a systematic review and meta-analysis. Lancet HIV. 2018;5(9):e515-e523. PMID 30139576; doi:10.1016/S2352-3018(18)30137-1.", "link": "https://doi.org/10.1016/s2352-3018(18)30137-1", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hamada2021", "text": "Hamada Y, Cirillo DM, Matteelli A, Penn-Nicholson A, Rangaka MX, Ruhwald M. Tests for tuberculosis infection: landscape analysis. Eur Respir J. 2021;58(5). PMID 33875495; doi:10.1183/13993003.00167-2021.", "link": "https://doi.org/10.1183/13993003.00167-2021", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hamada2023", "text": "Hamada Y, Gupta RK, Quartagno M, Izzard A, Acuna-Villaorduna C, Altet N, et al. Predictive performance of interferon-gamma release assays and the tuberculin skin test for incident tuberculosis: an individual participant data meta-analysis. EClinicalMedicine. 2023;56:101815. PMID 36636295; PMCID PMC9829704; doi:10.1016/j.eclinm.2022.101815.", "link": "https://doi.org/10.1016/j.eclinm.2022.101815", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Harboe1996", "text": "Harboe M, Oettinger T, Wiker HG, Rosenkrands I, Andersen P. Evidence for occurrence of the ESAT-6 protein in Mycobacterium tuberculosis and virulent Mycobacterium bovis and for its absence in Mycobacterium bovis BCG. Infect Immun. 1996;64(1):16-22. PMID 8557334; PMCID PMC173721; doi:10.1128/iai.64.1.16-22.1996.", "link": "https://doi.org/10.1128/iai.64.1.16-22.1996", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Harris2019", "text": "Harris M, Qi A, Jeagal L, Torabi N, Menzies D, Korobitsyn A, et al. A systematic review of the diagnostic accuracy of artificial intelligence-based computer programs to analyze chest x-rays for pulmonary tuberculosis. PLoS One. 2019;14(9):e0221339. PMID 31479448; PMCID PMC6719854; doi:10.1371/journal.pone.0221339.", "link": "https://doi.org/10.1371/journal.pone.0221339", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Harrison2025", "text": "Harrison LJ, Velásquez GE, Kempker RR, Imperial MZ, Nuermberger E, Dorman SE, et al. ACTG A5409 (RAD-TB): Study protocol for a phase 2 randomized, adaptive, dose-ranging, open-label trial of novel regimens for the treatment of pulmonary tuberculosis. Trials. 2025;26(1):291. PMID 40817073; PMCID PMC12357366; doi:10.1186/s13063-025-08973-w.", "link": "https://doi.org/10.1186/s13063-025-08973-w", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hartkoorn2014", "text": "Hartkoorn RC, Uplekar S, Cole ST. Cross-resistance between clofazimine and bedaquiline through upregulation of MmpL5 in Mycobacterium tuberculosis. Antimicrob Agents Chemother. 2014;58(5):2979-81. PMID 24590481; PMCID PMC3993252; doi:10.1128/AAC.00037-14.", "link": "https://doi.org/10.1128/aac.00037-14", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Havlir2011", "text": "Havlir DV, Kendall MA, Ive P, Kumwenda J, Swindells S, Qasba SS, et al. Timing of antiretroviral therapy for HIV-1 infection and tuberculosis. N Engl J Med. 2011;365(16):1482-91. PMID 22010914; PMCID PMC3327101; doi:10.1056/NEJMoa1013607.", "link": "https://doi.org/10.1056/nejmoa1013607", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Heemskerk2016", "text": "Heemskerk AD, Bang ND, Mai NT, Chau TT, Phu NH, Loc PP, et al. Intensified Antituberculosis Therapy in Adults with Tuberculous Meningitis. N Engl J Med. 2016;374(2):124-34. PMID 26760084; doi:10.1056/NEJMoa1507062.", "link": "https://doi.org/10.1056/nejmoa1507062", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Heinrich2025", "text": "Heinrich N, Manyama C, Koele SE, Mpagama S, Mhimbira F, Sebe M, et al. Sutezolid in combination with bedaquiline, delamanid, and moxifloxacin for pulmonary tuberculosis (PanACEA-SUDOCU-01): a prospective, open-label, randomised, phase 2b dose-finding trial. Lancet Infect Dis. 2025;25(11):1208-1218. PMID 40645196; doi:10.1016/S1473-3099(25)00213-0.", "link": "https://doi.org/10.1016/s1473-3099(25)00213-0", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hepple2012", "text": "Hepple P, Ford N, McNerney R. Microscopy compared to culture for the diagnosis of tuberculosis in induced sputum samples: a systematic review. Int J Tuberc Lung Dis. 2012;16(5):579-88. PMID 22410498; doi:10.5588/ijtld.11.0617.", "link": "https://doi.org/10.5588/ijtld.11.0617", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Hermans2015", "text": "Hermans S, Horsburgh CR Jr, Wood R. A century of tuberculosis epidemiology in the northern and southern hemisphere: the differential impact of control interventions. PLoS One. 2015;10(8):e0135179. PMID 26288079; PMCID PMC4545605; doi:10.1371/journal.pone.0135179.", "link": "https://doi.org/10.1371/journal.pone.0135179", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hershkovitz2008", "text": "Hershkovitz I, Donoghue HD, Minnikin DE, Besra GS, Lee OY, Gernaey AM, et al. Detection and molecular characterization of 9,000-year-old Mycobacterium tuberculosis from a Neolithic settlement in the Eastern Mediterranean. PLoS One. 2008;3(10):e3426. PMID 18923677; PMCID PMC2565837; doi:10.1371/journal.pone.0003426.", "link": "https://doi.org/10.1371/journal.pone.0003426", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hesseling2006CID", "text": "Hesseling AC, Rabie H, Marais BJ, Manders M, Lips M, Schaaf HS, et al. Bacille Calmette-Guérin vaccine-induced disease in HIV-infected and HIV-uninfected children. Clin Infect Dis. 2006;42(4):548-58. PMID 16421800; doi:10.1086/499953.", "link": "https://doi.org/10.1086/499953", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hesseling2007Vaccine", "text": "Hesseling AC, Marais BJ, Gie RP, Schaaf HS, Fine PE, Godfrey-Faussett P, et al. The risk of disseminated Bacille Calmette-Guerin (BCG) disease in HIV-infected children. Vaccine. 2007;25(1):14-8. PMID 16959383; doi:10.1016/j.vaccine.2006.07.020.", "link": "https://doi.org/10.1016/j.vaccine.2006.07.020", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hesseling2009BWHO", "text": "Hesseling AC, Johnson LF, Jaspan H, Cotton MF, Whitelaw A, Schaaf HS, et al. Disseminated bacille Calmette-Guérin disease in HIV-infected South African infants. Bull World Health Organ. 2009;87(7):505-11. PMID 19649364; PMCID PMC2704039; doi:10.2471/blt.08.055657.", "link": "https://doi.org/10.2471/blt.08.055657", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hesseling2024", "text": "Hesseling AC, Purchase SE, Martinson NA, Fairlie L, Schaaf HS, Brigden J, et al. Levofloxacin Preventive Treatment in Children Exposed to MDR Tuberculosis. N Engl J Med. 2024;391(24):2315-2326. PMID 39693542; doi:10.1056/NEJMoa2314318.", "link": "https://doi.org/10.1056/nejmoa2314318", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Hett2008", "text": "Hett EC, Rubin EJ. Bacterial growth and cell division: a mycobacterial perspective. Microbiol Mol Biol Rev. 2008;72(1):126-156. PMID 18322037; PMCID PMC2268284; doi:10.1128/MMBR.00028-07.", "link": "https://doi.org/10.1128/mmbr.00028-07", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hillemann2008", "text": "Hillemann D, Rüsch-Gerdes S, Richter E. In vitro-selected linezolid-resistant Mycobacterium tuberculosis mutants. Antimicrob Agents Chemother. 2008;52(2):800-801. PMID 18070973; PMCID PMC2224755; doi:10.1128/AAC.01189-07. No abstract in the record (short report); cited only for the existence of in vitro-selected linezolid resistance.", "link": "https://doi.org/10.1128/aac.01189-07", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hnizdo1998", "text": "Hnizdo E, Murray J. Risk of pulmonary tuberculosis relative to silicosis and exposure to silica dust in South African gold miners. Occup Environ Med. 1998;55(7):496-502. PMID 9816385; PMCID PMC1757613; doi:10.1136/oem.55.7.496.", "link": "https://doi.org/10.1136/oem.55.7.496", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hobby1973", "text": "Hobby GL, Holman AP, Iseman MD, Jones JM. Enumeration of tubercle bacilli in sputum of patients with pulmonary tuberculosis. Antimicrob Agents Chemother. 1973;4(2):94-104. PMID 4208508; PMCID PMC444512; doi:10.1128/aac.4.2.94.", "link": "https://doi.org/10.1128/aac.4.2.94", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Horne2010", "text": "Horne DJ, Royce SE, Gooze L, Narita M, Hopewell PC, Nahid P, et al. Sputum monitoring during tuberculosis treatment for predicting outcome: systematic review and meta-analysis. Lancet Infect Dis. 2010;10(6):387-94. PMID 20510279; PMCID PMC3046810; doi:10.1016/S1473-3099(10)70071-2.", "link": "https://doi.org/10.1016/s1473-3099(10)70071-2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Horsburgh2004", "text": "Horsburgh CR. Priorities for the treatment of latent tuberculosis infection in the United States. N Engl J Med. 2004;350(20):2060-2067. PMID 15141044; doi:10.1056/NEJMsa031667.", "link": "https://doi.org/10.1056/nejmsa031667", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Horton2016", "text": "Horton KC, MacPherson P, Houben RM, White RG, Corbett EL. Sex differences in tuberculosis burden and notifications in low- and middle-income countries: a systematic review and meta-analysis. PLoS Med. 2016;13(9):e1002119. PMID 27598345; PMCID PMC5012571; doi:10.1371/journal.pmed.1002119.", "link": "https://doi.org/10.1371/journal.pmed.1002119", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Houben2016", "text": "Houben RM, Dodd PJ. The global burden of latent tuberculosis infection: a re-estimation using mathematical modelling. PLoS Med. 2016;13(10):e1002152. PMID 27780211; PMCID PMC5079585; doi:10.1371/journal.pmed.1002152.", "link": "https://doi.org/10.1371/journal.pmed.1002152", "areas": ["A", "B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Hsu2003", "text": "Hsu T, Hingley-Wilson SM, Chen B, Chen M, Dai AZ, Morin PM, et al. The primary mechanism of attenuation of bacillus Calmette-Guerin is a loss of secreted lytic function required for invasion of lung interstitial tissue. Proc Natl Acad Sci U S A. 2003;100(21):12420-12425. PMID 14557547; PMCID PMC218773; doi:10.1073/pnas.1635213100.", "link": "https://doi.org/10.1073/pnas.1635213100", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hunter2011", "text": "Hunter RL. Pathology of post primary tuberculosis of the lung: an illustrated critical review. Tuberculosis (Edinb). 2011;91(6):497-509. PMID 21733755; PMCID PMC3215852; doi:10.1016/j.tube.2011.03.007.", "link": "https://doi.org/10.1016/j.tube.2011.03.007", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hunter2016", "text": "Hunter RL. Tuberculosis as a three-act play: a new paradigm for the pathogenesis of pulmonary tuberculosis. Tuberculosis (Edinb). 2016;97:8-17. PMID 26980490; PMCID PMC4795183; doi:10.1016/j.tube.2015.11.010.", "link": "https://doi.org/10.1016/j.tube.2015.11.010", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Huynh2022", "text": "Huynh J, Donovan J, Phu NH, Nghia HDT, Thuong NTT, Thwaites GE. Tuberculous meningitis: progress and remaining questions. Lancet Neurol. 2022;21(5):450-464. PMID 35429482; doi:10.1016/S1474-4422(21)00435-X.", "link": "https://doi.org/10.1016/s1474-4422(21)00435-x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Imtiaz2017", "text": "Imtiaz S, Shield KD, Roerecke M, Samokhvalov AV, Lönnroth K, Rehm J. Alcohol consumption as a risk factor for tuberculosis: meta-analyses and burden of disease. Eur Respir J. 2017;50(1):1700216. PMID 28705945; PMCID PMC5540679; doi:10.1183/13993003.00216-2017.", "link": "https://doi.org/10.1183/13993003.00216-2017", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Iseman2002", "text": "Iseman MD. Tuberculosis therapy: past, present and future. Eur Respir J Suppl. 2002;36:87s-94s. PMID 12168751; doi:10.1183/09031936.02.00309102.", "link": "https://doi.org/10.1183/09031936.02.00309102", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "IUAT1982", "text": "International Union Against Tuberculosis Committee on Prophylaxis. Efficacy of various durations of isoniazid preventive therapy for tuberculosis: five years of follow-up in the IUAT trial. International Union Against Tuberculosis Committee on Prophylaxis. Bull World Health Organ. 1982;60(4):555-64. PMID 6754120; PMCID PMC2536088.", "link": "https://pubmed.ncbi.nlm.nih.gov/6754120/", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Jeeves2015", "text": "Jeeves RE, Marriott AA, Pullan ST, Hatch KA, Allnutt JC, Freire-Martin I, et al. Mycobacterium tuberculosis is resistant to isoniazid at a slow growth rate by single nucleotide polymorphisms in katG codon Ser315. PLoS One. 2015;10(9):e0138253. PMID 26382066; PMCID PMC4575197; doi:10.1371/journal.pone.0138253.", "link": "https://doi.org/10.1371/journal.pone.0138253", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Jenkins2017", "text": "Jenkins HE, Yuen CM, Rodriguez CA, Nathavitharana RR, McLaughlin MM, Donald P, et al. Mortality in children diagnosed with tuberculosis: a systematic review and meta-analysis. Lancet Infect Dis. 2017;17(3):285-295. PMID 27964822; PMCID PMC5330933; doi:10.1016/S1473-3099(16)30474-1.", "link": "https://doi.org/10.1016/s1473-3099(16)30474-1", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Jensen2005", "text": "Jensen PA, Lambert LA, Iademarco MF, Ridzon R. Guidelines for preventing the transmission of Mycobacterium tuberculosis in health-care settings, 2005. MMWR Recomm Rep. 2005;54(RR-17):1-141. PMID 16382216.", "link": "https://pubmed.ncbi.nlm.nih.gov/16382216/", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Jeon2008", "text": "Jeon CY, Murray MB. Diabetes mellitus increases the risk of active tuberculosis: a systematic review of 13 observational studies. PLoS Med. 2008;5(7):e152. PMID 18630984; PMCID PMC2459204; doi:10.1371/journal.pmed.0050152.", "link": "https://doi.org/10.1371/journal.pmed.0050152", "areas": ["B", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Jerene2025", "text": "Jerene D, van Kalmthout K, Levy J, Alacapa J, Deyanova N, Dube T, et al. Effect of digital adherence technologies on treatment outcomes in people with drug-susceptible tuberculosis: four pragmatic, cluster-randomised trials. Lancet. 2025;405(10485):1155-1166. PMID 40086457; doi:10.1016/S0140-6736(24)02847-2.", "link": "https://doi.org/10.1016/s0140-6736(24)02847-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Jindani1980", "text": "Jindani A, Aber VR, Edwards EA, Mitchison DA. The early bactericidal activity of drugs in patients with pulmonary tuberculosis. Am Rev Respir Dis. 1980;121(6):939-949. PMID 6774638; doi:10.1164/arrd.1980.121.6.939. No abstract available; cited only for the existence of the early bactericidal activity measurement, as restated in Mitchison2000.", "link": "https://doi.org/10.1164/arrd.1980.121.6.939", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Jindani2003", "text": "Jindani A, Doré CJ, Mitchison DA. Bactericidal and sterilizing activities of antituberculosis drugs during the first 14 days. Am J Respir Crit Care Med. 2003;167(10):1348-54. PMID 12519740; doi:10.1164/rccm.200210-1125OC.", "link": "https://doi.org/10.1164/rccm.200210-1125oc", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Jindani2004", "text": "Jindani A, Nunn AJ, Enarson DA. Two 8-month regimens of chemotherapy for treatment of newly diagnosed pulmonary tuberculosis: international multicentre randomised trial. Lancet. 2004;364(9441):1244-51. PMID 15464185; doi:10.1016/S0140-6736(04)17141-9.", "link": "https://doi.org/10.1016/s0140-6736(04)17141-9", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Jindani2014", "text": "Jindani A, Harrison TS, Nunn AJ, Phillips PP, Churchyard GJ, Charalambous S, et al. High-dose rifapentine with moxifloxacin for pulmonary tuberculosis. N Engl J Med. 2014;371(17):1599-608. PMID 25337749; PMCID PMC4233406; doi:10.1056/NEJMoa1314210.", "link": "https://doi.org/10.1056/nejmoa1314210", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "John2013", "text": "John TJ, Vashishtha VM, John SM. 50 years of tuberculosis control in India: progress, pitfalls and the way forward. Indian Pediatr. 2013;50(1):93-8. PMID 23396780; doi:10.1007/s13312-013-0021-4.", "link": "https://doi.org/10.1007/s13312-013-0021-4", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "JonesLopez2013", "text": "Jones-López EC, Namugga O, Mumbowa F, Ssebidandi M, Mbabazi O, Moine S, et al. Cough aerosols of Mycobacterium tuberculosis predict new infection: a household contact study. Am J Respir Crit Care Med. 2013;187(9):1007-15. PMID 23306539; PMCID PMC3707366; doi:10.1164/rccm.201208-1422OC.", "link": "https://doi.org/10.1164/rccm.201208-1422oc", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jonsson2020", "text": "Jonsson J, Kühlmann-Berenzon S, Berggren I, Bruchfeld J. Increased risk of active tuberculosis during pregnancy and postpartum: a register-based cohort study in Sweden. Eur Respir J. 2020;55(3):1901886. PMID 31862768; PMCID PMC7083553; doi:10.1183/13993003.01886-2019.", "link": "https://doi.org/10.1183/13993003.01886-2019", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Joshi2006", "text": "Joshi R, Reingold AL, Menzies D, Pai M. Tuberculosis among health-care workers in low- and middle-income countries: a systematic review. PLoS Med. 2006;3(12):e494. PMID 17194191; PMCID PMC1716189; doi:10.1371/journal.pmed.0030494.", "link": "https://doi.org/10.1371/journal.pmed.0030494", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kaplan2003", "text": "Kaplan G, Post FA, Moreira AL, Wainwright H, Kreiswirth BN, Tanverdi M, et al. Mycobacterium tuberculosis growth at the cavity surface: a microenvironment with failed immunity. Infect Immun. 2003;71(12):7099-7108. PMID 14638800; PMCID PMC308931; doi:10.1128/IAI.71.12.7099-7108.2003.", "link": "https://doi.org/10.1128/iai.71.12.7099-7108.2003", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Karumbi2015", "text": "Karumbi J, Garner P. Directly observed therapy for treating tuberculosis. Cochrane Database Syst Rev. 2015;2015(5):CD003343. PMID 26022367; PMCID PMC4460720; doi:10.1002/14651858.CD003343.pub4.", "link": "https://doi.org/10.1002/14651858.cd003343.pub4", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kaufmann2001", "text": "Kaufmann SH. How can immunology contribute to the control of tuberculosis? Nat Rev Immunol. 2001;1(1):20-30. PMID 11905811; doi:10.1038/35095558.", "link": "https://doi.org/10.1038/35095558", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kaufmann2026", "text": "Kaufmann SHE. The Paediatric BCG Vaccine Century: From Historical Success to Future Innovations. Acta Paediatr. 2026;115(11):2433-2440. PMID 40548838; PMCID PMC13659359; doi:10.1111/apa.70182.", "link": "https://doi.org/10.1111/apa.70182", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kay2025", "text": "Kay AW, Madison M, Scandrett K, Ness T, Amuge P, Inbaraj LR, et al. Xpert MTB/RIF Ultra assay for tuberculosis disease and rifampicin resistance in children. Cochrane Database Syst Rev. 2025;10(10):CD013359. PMID 41128098; PMCID PMC12548016; doi:10.1002/14651858.CD013359.pub4.", "link": "https://doi.org/10.1002/14651858.cd013359.pub4", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Keam2019", "text": "Keam SJ. Pretomanid: first approval. Drugs. 2019;79(16):1797-1803. PMID 31583606; doi:10.1007/s40265-019-01207-9.", "link": "https://doi.org/10.1007/s40265-019-01207-9", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Keane2001", "text": "Keane J, Gershon S, Wise RP, Mirabile-Levens E, Kasznica J, Schwieterman WD, et al. Tuberculosis associated with infliximab, a tumor necrosis factor alpha-neutralizing agent. N Engl J Med. 2001;345(15):1098-1104. PMID 11596589; doi:10.1056/NEJMoa011110.", "link": "https://doi.org/10.1056/nejmoa011110", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Keeratichananont2015", "text": "Keeratichananont W, Nilmoje T, Keeratichananont S, Rittatorn J. Diagnostic yield and safety of sputum induction with nebulized racemic salbutamol versus hypertonic saline in smear-negative pulmonary tuberculosis. Ther Adv Respir Dis. 2015;9(5):217-23. PMID 26206666; doi:10.1177/1753465815594529.", "link": "https://doi.org/10.1177/1753465815594529", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kendall2015", "text": "Kendall EA, Fofana MO, Dowdy DW. Burden of transmitted multidrug resistance in epidemics of tuberculosis: a transmission modelling analysis. Lancet Respir Med. 2015;3(12):963-72. PMID 26597127; PMCID PMC4684734; doi:10.1016/S2213-2600(15)00458-0.", "link": "https://doi.org/10.1016/s2213-2600(15)00458-0", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kenyon1996", "text": "Kenyon TA, Valway SE, Ihle WW, Onorato IM, Castro KG. Transmission of multidrug-resistant Mycobacterium tuberculosis during a long airplane flight. N Engl J Med. 1996;334(15):933-8. PMID 8596593; doi:10.1056/NEJM199604113341501.", "link": "https://doi.org/10.1056/nejm199604113341501", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kerner2019", "text": "Kerner G, Ramirez-Alejo N, Seeleuthner Y, Yang R, Ogishi M, Cobat A, et al. Homozygosity for TYK2 P1104A underlies tuberculosis in about 1% of patients in a cohort of European ancestry. Proc Natl Acad Sci U S A. 2019;116(21):10430-10434. PMID 31068474; PMCID PMC6534977; doi:10.1073/pnas.1903561116.", "link": "https://doi.org/10.1073/pnas.1903561116", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Khan2007Lancet", "text": "Khan MS, Dar O, Sismanidis C, Shah K, Godfrey-Faussett P. Improvement of tuberculosis case detection and reduction of discrepancies between men and women by simple sputum-submission instructions: a pragmatic randomised controlled trial. Lancet. 2007;369(9577):1955-60. PMID 17560448; doi:10.1016/S0140-6736(07)60916-7.", "link": "https://doi.org/10.1016/s0140-6736(07)60916-7", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kilic2025", "text": "Kılıç A, Zhou X, Moon Z, Hamada Y, Duong T, Layton C, et al. A systematic review exploring the role of tuberculosis stigma on test and treatment uptake for tuberculosis infection. BMC Public Health. 2025;25(1):628. PMID 39953433; PMCID PMC11829483; doi:10.1186/s12889-024-20868-0.", "link": "https://doi.org/10.1186/s12889-024-20868-0", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kleinnijenhuis2012", "text": "Kleinnijenhuis J, Quintin J, Preijers F, Joosten LA, Ifrim DC, Saeed S, et al. Bacille Calmette-Guerin induces NOD2-dependent nonspecific protection from reinfection via epigenetic reprogramming of monocytes. Proc Natl Acad Sci U S A. 2012;109(43):17537-42. PMID 22988082; PMCID PMC3491454; doi:10.1073/pnas.1202870109.", "link": "https://doi.org/10.1073/pnas.1202870109", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Koele2025", "text": "Koele SE, Heinrich N, De Jager VR, Dreisbach J, Phillips PPJ, Gross-Demel P, et al. Population pharmacokinetics and exposure-response relationship of the antituberculosis drug BTZ-043. J Antimicrob Chemother. 2025;80(5):1315-1323. PMID 40155063; PMCID PMC12046392; doi:10.1093/jac/dkaf076.", "link": "https://doi.org/10.1093/jac/dkaf076", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kohli2021", "text": "Kohli M, Schiller I, Dendukuri N, Yao M, Dheda K, Denkinger CM, et al. Xpert MTB/RIF Ultra and Xpert MTB/RIF assays for extrapulmonary tuberculosis and rifampicin resistance in adults. Cochrane Database Syst Rev. 2021;1(1):CD012768. PMID 33448348; PMCID PMC8078545; doi:10.1002/14651858.CD012768.pub3.", "link": "https://doi.org/10.1002/14651858.cd012768.pub3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Krutikov2022", "text": "Krutikov M, Faust L, Nikolayevskyy V, Hamada Y, Gupta RK, Cirillo D, et al. The diagnostic performance of novel skin-based in-vivo tests for tuberculosis infection compared with purified protein derivative tuberculin skin tests and blood-based in vitro interferon-γ release assays: a systematic review and meta-analysis. Lancet Infect Dis. 2022;22(2):250-264. PMID 34606768; doi:10.1016/S1473-3099(21)00261-9.", "link": "https://doi.org/10.1016/s1473-3099(21)00261-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kurbatova2025", "text": "Kurbatova EV, Dooley KE, Carr W, Stout JE, Nuermberger EL, Phillips PPJ, et al. Phase 2C clinical trial of novel short-course regimens for the treatment of pulmonary tuberculosis: TBTC study 38/CRUSH-TB design. Contemp Clin Trials. 2025;158:108075. PMID 40915316; PMCID PMC12668207; doi:10.1016/j.cct.2025.108075.", "link": "https://doi.org/10.1016/j.cct.2025.108075", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lange2022", "text": "Lange C, Aaby P, Behr MA, Donald PR, Kaufmann SHE, Netea MG, et al. 100 years of Mycobacterium bovis bacille Calmette-Guérin. Lancet Infect Dis. 2022;22(1):e2-e12. PMID 34506734; PMCID PMC11967564; doi:10.1016/S1473-3099(21)00403-5.", "link": "https://doi.org/10.1016/s1473-3099(21)00403-5", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Larson2023", "text": "Larson EC, Ellis-Connell AL, Rodgers MA, Gubernat AK, Gleim JL, Moriarty RV, et al. Intravenous Bacille Calmette-Guérin vaccination protects simian immunodeficiency virus-infected macaques from tuberculosis. Nat Microbiol. 2023;8(11):2080-2092. PMID 37814073; PMCID PMC10627825; doi:10.1038/s41564-023-01503-x.", "link": "https://doi.org/10.1038/s41564-023-01503-x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lawn2011Xpert", "text": "Lawn SD, Nicol MP. Xpert® MTB/RIF assay: development, evaluation and implementation of a new rapid molecular diagnostic for tuberculosis and rifampicin resistance. Future Microbiol. 2011;6(9):1067-82. PMID 21958145; PMCID PMC3252681; doi:10.2217/fmb.11.84.", "link": "https://doi.org/10.2217/fmb.11.84", "areas": ["D", "A"], "unverified": false, "validated": "PubMed", "aliases": ["Lawn2011"]}, {"key": "Le2019IJTLD", "text": "Le H, Nguyen N, Tran P, Hoa N, Hung N, Moran A, et al. Process measure of FAST tuberculosis infection control demonstrates delay in likely effective treatment. Int J Tuberc Lung Dis. 2019;23(2):140-146. PMID 30621813; doi:10.5588/ijtld.18.0268.", "link": "https://doi.org/10.5588/ijtld.18.0268", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lehmann1946", "text": "Lehmann J. Para-aminosalicylic acid in the treatment of tuberculosis. Lancet. 1946;1(6384):15. PMID 21008766; doi:10.1016/s0140-6736(46)91185-3. No abstract; cited for the date only.", "link": "https://doi.org/10.1016/s0140-6736(46)91185-3", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Lerner2015", "text": "Lerner TR, Borel S, Gutierrez MG. The innate immune response in human tuberculosis. Cell Microbiol. 2015;17(9):1277-1285. PMID 26135005; PMCID PMC4832344; doi:10.1111/cmi.12480.", "link": "https://doi.org/10.1111/cmi.12480", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lewinsohn2017", "text": "Lewinsohn DM, Leonard MK, LoBue PA, Cohn DL, Daley CL, Desmond E, et al. Official American Thoracic Society/Infectious Diseases Society of America/Centers for Disease Control and Prevention clinical practice guidelines: diagnosis of tuberculosis in adults and children. Clin Infect Dis. 2017;64(2):e1-e33. PMID 27932390; doi:10.1093/cid/ciw694.", "link": "https://doi.org/10.1093/cid/ciw694", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lewis2003", "text": "Lewis KN, Liao R, Guinn KM, Hickey MJ, Smith S, Behr MA, et al. Deletion of RD1 from Mycobacterium tuberculosis mimics bacille Calmette-Guérin attenuation. J Infect Dis. 2003;187(1):117-23. PMID 12508154.", "link": "https://pubmed.ncbi.nlm.nih.gov/12508154/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Liang2008", "text": "Liang QL, Shi HZ, Wang K, Qin SM, Qin XJ. Diagnostic accuracy of adenosine deaminase in tuberculous pleurisy: a meta-analysis. Respir Med. 2008;102(5):744-54. PMID 18222681; doi:10.1016/j.rmed.2007.12.007.", "link": "https://doi.org/10.1016/j.rmed.2007.12.007", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lienhardt2011", "text": "Lienhardt C, Cook SV, Burgos M, Yorke-Edwards V, Rigouts L, Anyo G, et al. Efficacy and safety of a 4-drug fixed-dose combination regimen compared with separate drugs for treatment of pulmonary tuberculosis: the Study C randomized controlled trial. JAMA. 2011;305(14):1415-23. PMID 21486974; doi:10.1001/jama.2011.436.", "link": "https://doi.org/10.1001/jama.2011.436", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lin2007PLoSMed", "text": "Lin HH, Ezzati M, Murray M. Tobacco smoke, indoor air pollution and tuberculosis: a systematic review and meta-analysis. PLoS Med. 2007;4(1):e20. PMID 17227135; PMCID PMC1769410; doi:10.1371/journal.pmed.0040020. Abstract gives no pooled risk ratios; cited only for the direction of the passive-smoking and biomass-fuel associations.", "link": "https://doi.org/10.1371/journal.pmed.0040020", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lin2009", "text": "Lin PL, Rodgers M, Smith L, Bigbee M, Myers A, Bigbee C, et al. Quantitative comparison of active and latent tuberculosis in the cynomolgus macaque model. Infect Immun. 2009;77(10):4631-4642. PMID 19620341; PMCID PMC2747916; doi:10.1128/IAI.00592-09.", "link": "https://doi.org/10.1128/iai.00592-09", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lin2010", "text": "Lin PL, Myers A, Smith L, Bigbee C, Bigbee M, Fuhrman C, et al. Tumor necrosis factor neutralization results in disseminated disease in acute and latent Mycobacterium tuberculosis infection with normal granuloma structure in a cynomolgus macaque model. Arthritis Rheum. 2010;62(2):340-350. PMID 20112395; PMCID PMC3047004; doi:10.1002/art.27271.", "link": "https://doi.org/10.1002/art.27271", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lin2014", "text": "Lin PL, Ford CB, Coleman MT, Myers AJ, Gawande R, Ioerger T, et al. Sterilization of granulomas is common in active and latent tuberculosis despite within-host variability in bacterial killing. Nat Med. 2014;20(1):75-79. PMID 24336248; PMCID PMC3947310; doi:10.1038/nm.3412.", "link": "https://doi.org/10.1038/nm.3412", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Liu2015PLoSMed", "text": "Liu X, Lewis JJ, Zhang H, Lu W, Zhang S, Zheng G, et al. Effectiveness of Electronic Reminders to Improve Medication Adherence in Tuberculosis Patients: A Cluster-Randomised Trial. PLoS Med. 2015;12(9):e1001876. PMID 26372470; PMCID PMC4570796; doi:10.1371/journal.pmed.1001876.", "link": "https://doi.org/10.1371/journal.pmed.1001876", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lonnroth2009", "text": "Lönnroth K, Jaramillo E, Williams BG, Dye C, Raviglione M. Drivers of tuberculosis epidemics: the role of risk factors and social determinants. Soc Sci Med. 2009;68(12):2240-6. PMID 19394122; doi:10.1016/j.socscimed.2009.03.041.", "link": "https://doi.org/10.1016/j.socscimed.2009.03.041", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lonnroth2010BMI", "text": "Lönnroth K, Williams BG, Cegielski P, Dye C. A consistent log-linear relationship between tuberculosis incidence and body mass index. Int J Epidemiol. 2010;39(1):149-55. PMID 19820104; doi:10.1093/ije/dyp308.", "link": "https://doi.org/10.1093/ije/dyp308", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lonnroth2010Lancet", "text": "Lönnroth K, Castro KG, Chakaya JM, Chauhan LS, Floyd K, Glaziou P, et al. Tuberculosis control and elimination 2010-50: cure, care, and social development. Lancet. 2010;375(9728):1814-29. PMID 20488524; doi:10.1016/S0140-6736(10)60483-7.", "link": "https://doi.org/10.1016/s0140-6736(10)60483-7", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lonnroth2014DM", "text": "Lönnroth K, Roglic G, Harries AD. Improving tuberculosis prevention and care through addressing the global diabetes epidemic: from evidence to policy and practice. Lancet Diabetes Endocrinol. 2014;2(9):730-9. PMID 25194886; doi:10.1016/S2213-8587(14)70109-3.", "link": "https://doi.org/10.1016/s2213-8587(14)70109-3", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lowe2012", "text": "Lowe DM, Redford PS, Wilkinson RJ, O'Garra A, Martineau AR. Neutrophils in tuberculosis: friend or foe? Trends Immunol. 2012;33(1):14-25. PMID 22094048; doi:10.1016/j.it.2011.10.003.", "link": "https://doi.org/10.1016/j.it.2011.10.003", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Luabeya2025", "text": "Luabeya AKK, Rozot V, Imbratta C, Ratangee F, Shenje J, Tameris M, et al. Live-attenuated Mycobacterium tuberculosis vaccine, MTBVAC, in adults with or without M tuberculosis sensitisation: a single-centre, phase 1b-2a, double-blind, dose-escalation, randomised controlled trial. Lancet Glob Health. 2025;13(6):e1030-e1042. PMID 40250461; PMCID PMC12780950; doi:10.1016/S2214-109X(25)00046-4.", "link": "https://doi.org/10.1016/s2214-109x(25)00046-4", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Luca2013", "text": "Luca S, Mihaescu T. History of BCG vaccine. Maedica (Bucur). 2013;8(1):53-8. PMID 24023600; PMCID PMC3749764. Full text read on PMC.", "link": "https://pubmed.ncbi.nlm.nih.gov/24023600/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Lutchmun2025", "text": "Lutchmun W, Heinrich N, Svensson EM, Kloss F, Konsten S, Dreisbach J, et al. First-in-human study of the benzothiazinone and DprE1 inhibitor BTZ-043, a novel drug candidate for the treatment of Tuberculosis. JAC Antimicrob Resist. 2025;7(4):dlaf127. PMID 40831749; PMCID PMC12359132; doi:10.1093/jacamr/dlaf127.", "link": "https://doi.org/10.1093/jacamr/dlaf127", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Mahairas1996", "text": "Mahairas GG, Sabo PJ, Hickey MJ, Singh DC, Stover CK. Molecular analysis of genetic differences between Mycobacterium bovis BCG and virulent M. bovis. J Bacteriol. 1996;178(5):1274-82. PMID 8631702.", "link": "https://pubmed.ncbi.nlm.nih.gov/8631702/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Mangtani2014", "text": "Mangtani P, Abubakar I, Ariti C, Beynon R, Pimpin L, Fine PE, et al. Protection by BCG vaccine against tuberculosis: a systematic review of randomized controlled trials. Clin Infect Dis. 2014;58(4):470-80. PMID 24336911; doi:10.1093/cid/cit790.", "link": "https://doi.org/10.1093/cid/cit790", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Manzoor2026", "text": "Manzoor F, Rhee C, Baker MA, Klompas M. Mycobacterium tuberculosis Transmission in Healthcare Settings: A Systematic Review of Frequency, Risk Factors, and Exposure Conditions. Clin Infect Dis. 2026;82(5):799-807. PMID 41615662; doi:10.1093/cid/ciag053.", "link": "https://doi.org/10.1093/cid/ciag053", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Marais2004", "text": "Marais BJ, Gie RP, Schaaf HS, Hesseling AC, Obihara CC, Starke JJ, et al. The natural history of childhood intra-thoracic tuberculosis: a critical review of literature from the pre-chemotherapy era. Int J Tuberc Lung Dis. 2004;8(4):392-402. PMID 15141729.", "link": "https://pubmed.ncbi.nlm.nih.gov/15141729/", "areas": ["C", "F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Marais2006", "text": "Marais BJ, Gie RP, Hesseling AC, Schaaf HS, Lombard C, Enarson DA, et al. A refined symptom-based approach to diagnose pulmonary tuberculosis in children. Pediatrics. 2006;118(5):e1350-9. PMID 17079536; doi:10.1542/peds.2006-0519.", "link": "https://doi.org/10.1542/peds.2006-0519", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Marais2010LID", "text": "Marais S, Thwaites G, Schoeman JF, Török ME, Misra UK, Prasad K, et al. Tuberculous meningitis: a uniform case definition for use in clinical research. Lancet Infect Dis. 2010;10(11):803-12. PMID 20822958; doi:10.1016/S1473-3099(10)70138-9.", "link": "https://doi.org/10.1016/s1473-3099(10)70138-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Marais2027Microbe", "text": "Marais BJ, Goletti D, McHugh TD, Tiberi S, Aklillu E, Yeboah-Manu D, et al. Advances in tuberculosis treatment: novel regimens, new drug pipelines, host-directed therapies, and updated management guidelines. Lancet Microbe. 2027:101442 (online 26 April 2026). PMID 42526491; doi:10.1016/j.lanmic.2026.101442.", "link": "https://doi.org/10.1016/j.lanmic.2026.101442", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Marakalala2016", "text": "Marakalala MJ, Raju RM, Sharma K, Zhang YJ, Eugenin EA, Prideaux B, et al. Inflammatory signaling in human tuberculosis granulomas is spatially organized. Nat Med. 2016;22(5):531-538. PMID 27043495; PMCID PMC4860068; doi:10.1038/nm.4073.", "link": "https://doi.org/10.1038/nm.4073", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Marks2019", "text": "Marks GB, Nguyen NV, Nguyen PTB, Nguyen TA, Nguyen HB, Tran KH, et al. Community-wide screening for tuberculosis in a high-prevalence setting. N Engl J Med. 2019;381(14):1347-1357. PMID 31577876; doi:10.1056/NEJMoa1902129.", "link": "https://doi.org/10.1056/nejmoa1902129", "areas": ["B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Marrakchi2014", "text": "Marrakchi H, Lanéelle MA, Daffé M. Mycolic acids: structures, biosynthesis, and beyond. Chem Biol. 2014;21(1):67-85. PMID 24374164; doi:10.1016/j.chembiol.2013.11.011.", "link": "https://doi.org/10.1016/j.chembiol.2013.11.011", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Martinez2020Lancet", "text": "Martinez L, Cords O, Horsburgh CR, Andrews JR. The risk of tuberculosis in children after close exposure: a systematic review and individual-participant meta-analysis. Lancet. 2020;395(10228):973-984. PMID 32199484; PMCID PMC7289654; doi:10.1016/S0140-6736(20)30166-5.", "link": "https://doi.org/10.1016/s0140-6736(20)30166-5", "areas": ["B", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Martinson2011", "text": "Martinson NA, Barnes GL, Moulton LH, Msandiwa R, Hausler H, Ram M, et al. New regimens to prevent tuberculosis in adults with HIV infection. N Engl J Med. 2011;365(1):11-20. PMID 21732833; PMCID PMC3407678; doi:10.1056/NEJMoa1005136.", "link": "https://doi.org/10.1056/nejmoa1005136", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Matsumoto2006", "text": "Matsumoto M, Hashizume H, Tomishige T, Kawasaki M, Tsubouchi H, Sasaki H, et al. OPC-67683, a nitro-dihydro-imidazooxazole derivative with promising action against tuberculosis in vitro and in mice. PLoS Med. 2006;3(11):e466. PMID 17132069; PMCID PMC1664607; doi:10.1371/journal.pmed.0030466.", "link": "https://doi.org/10.1371/journal.pmed.0030466", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Maugans2023", "text": "Maugans C, Loveday M, Hlangu S, Waitt C, Van Schalkwyk M, van de Water B, et al. Best practices for the care of pregnant people living with TB. Int J Tuberc Lung Dis. 2023;27(5):357-366. PMID 37143222; PMCID PMC10171489; doi:10.5588/ijtld.23.0031.", "link": "https://doi.org/10.5588/ijtld.23.0031", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Mayosi2014", "text": "Mayosi BM, Ntsekhe M, Bosch J, Pandie S, Jung H, Gumedze F, et al. Prednisolone and Mycobacterium indicus pranii in tuberculous pericarditis. N Engl J Med. 2014;371(12):1121-30. PMID 25178809; PMCID PMC4912834; doi:10.1056/NEJMoa1407380.", "link": "https://doi.org/10.1056/nejmoa1407380", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Mazurek2010", "text": "Mazurek GH, Jereb J, Vernon A, LoBue P, Goldberg S, Castro K. Updated guidelines for using Interferon Gamma Release Assays to detect Mycobacterium tuberculosis infection - United States, 2010. MMWR Recomm Rep. 2010;59(RR-5):1-25. PMID 20577159. Interpretation tables read from the MMWR text on cdc.gov (rr5905a1).", "link": "https://pubmed.ncbi.nlm.nih.gov/20577159/", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "McQuaid2021", "text": "McQuaid CF, Vassall A, Cohen T, Fiekert K, White RG. The impact of COVID-19 on TB: a review of the data. Int J Tuberc Lung Dis. 2021;25(6):436-446. PMID 34049605; PMCID PMC8171247; doi:10.5588/ijtld.21.0148.", "link": "https://doi.org/10.5588/ijtld.21.0148", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "McQuaid2025", "text": "McQuaid CF, Clark RA, White RG, Bakker R, Alexander P, Henry R, et al. Estimating the epidemiological and economic impact of providing nutritional care for tuberculosis-affected households across India: a modelling study. Lancet Glob Health. 2025;13(3):e488-e496. PMID 39824201; PMCID PMC11865009; doi:10.1016/S2214-109X(24)00505-9.", "link": "https://doi.org/10.1016/s2214-109x(24)00505-9", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Meintjes2018", "text": "Meintjes G, Stek C, Blumenthal L, Thienemann F, Schutz C, Buyze J, et al. Prednisone for the Prevention of Paradoxical Tuberculosis-Associated IRIS. N Engl J Med. 2018;379(20):1915-1925. PMID 30428290; doi:10.1056/NEJMoa1800762.", "link": "https://doi.org/10.1056/nejmoa1800762", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Menzies2009", "text": "Menzies D, Benedetti A, Paydar A, Martin I, Royce S, Pai M, et al. Effect of duration and intermittency of rifampin on tuberculosis treatment outcomes: a systematic review and meta-analysis. PLoS Med. 2009;6(9):e1000146. PMID 19753109; PMCID PMC2736385; doi:10.1371/journal.pmed.1000146.", "link": "https://doi.org/10.1371/journal.pmed.1000146", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Menzies2018", "text": "Menzies D, Adjobimey M, Ruslami R, Trajman A, Sow O, Kim H, et al. Four Months of Rifampin or Nine Months of Isoniazid for Latent Tuberculosis in Adults. N Engl J Med. 2018;379(5):440-453. PMID 30067931; doi:10.1056/NEJMoa1714283.", "link": "https://doi.org/10.1056/nejmoa1714283", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Menzies2021LGH", "text": "Menzies NA, Quaife M, Allwood BW, Byrne AL, Coussens AK, Harries AD, et al. Lifetime burden of disease due to incident tuberculosis: a global reappraisal including post-tuberculosis sequelae. Lancet Glob Health. 2021;9(12):e1679-e1687. PMID 34798027; PMCID PMC8609280; doi:10.1016/S2214-109X(21)00367-3.", "link": "https://doi.org/10.1016/s2214-109x(21)00367-3", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Merle2014", "text": "Merle CS, Fielding K, Sow OB, Gninafon M, Lo MB, Mthiyane T, et al. A four-month gatifloxacin-containing regimen for treating tuberculosis. N Engl J Med. 2014;371(17):1588-98. PMID 25337748; doi:10.1056/NEJMoa1315817.", "link": "https://doi.org/10.1056/nejmoa1315817", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Migliori2021PTLD", "text": "Migliori GB, Marx FM, Ambrosino N, Zampogna E, Schaaf HS, van der Zalm MM, et al. Clinical standards for the assessment, management and rehabilitation of post-TB lung disease. Int J Tuberc Lung Dis. 2021;25(10):797-813. PMID 34615577; PMCID PMC8504493; doi:10.5588/ijtld.21.0425.", "link": "https://doi.org/10.5588/ijtld.21.0425", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Mishra2010", "text": "Mishra BB, Moura-Alves P, Sonawane A, Hacohen N, Griffiths G, Moita LF, et al. Mycobacterium tuberculosis protein ESAT-6 is a potent activator of the NLRP3/ASC inflammasome. Cell Microbiol. 2010;12(8):1046-1063. PMID 20148899; doi:10.1111/j.1462-5822.2010.01450.x.", "link": "https://doi.org/10.1111/j.1462-5822.2010.01450.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mitchison1979", "text": "Mitchison DA. Basic mechanisms of chemotherapy. Chest. 1979;76(6 Suppl):771-781. PMID 92392; doi:10.1378/chest.76.6_supplement.771. No abstract available; cited only for the subpopulation framework as restated in Mitchison2000.", "link": "https://doi.org/10.1378/chest.76.6_supplement.771", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mitchison1985", "text": "Mitchison DA. The action of antituberculosis drugs in short-course chemotherapy. Tubercle. 1985;66(3):219-225. PMID 3931319; doi:10.1016/0041-3879(85)90040-6. No abstract available; cited only for the subpopulation framework as restated in Mitchison2000.", "link": "https://doi.org/10.1016/0041-3879(85)90040-6", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mitchison2000", "text": "Mitchison DA. Role of individual drugs in the chemotherapy of tuberculosis. Int J Tuberc Lung Dis. 2000;4(9):796-806. PMID 10985648.", "link": "https://pubmed.ncbi.nlm.nih.gov/10985648/", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mitchison2005", "text": "Mitchison DA. The diagnosis and therapy of tuberculosis during the past 100 years. Am J Respir Crit Care Med. 2005;171(7):699-706. PMID 15709048; doi:10.1164/rccm.200411-1603OE.", "link": "https://doi.org/10.1164/rccm.200411-1603oe", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Mohamed2025", "text": "Mohamed MS, Zary M, Kafie C, Chilala CI, Bahukudumbi S, Foster N, et al. The impact of digital adherence technologies on treatment outcomes, adherence, and patient-reported outcomes in tuberculosis: a systematic review and meta-analysis. BMC Infect Dis. 2025;25(1):1314. PMID 41087928; PMCID PMC12523041; doi:10.1186/s12879-025-11503-3.", "link": "https://doi.org/10.1186/s12879-025-11503-3", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Morrison2008", "text": "Morrison J, Pai M, Hopewell PC. Tuberculosis and latent tuberculosis infection in close contacts of people with pulmonary tuberculosis in low-income and middle-income countries: a systematic review and meta-analysis. Lancet Infect Dis. 2008;8(6):359-68. PMID 18450516; doi:10.1016/S1473-3099(08)70071-9.", "link": "https://doi.org/10.1016/s1473-3099(08)70071-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "MRC1948", "text": "Medical Research Council. Streptomycin treatment of pulmonary tuberculosis. Br Med J. 1948;2(4582):769-82. PMID 18890300; PMCID PMC2091872. No abstract in PubMed; trial numbers are quoted from Crofton2006.", "link": "https://pubmed.ncbi.nlm.nih.gov/18890300/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "MRC1952", "text": "Medical Research Council Tuberculosis Chemotherapy Trials Committee. Treatment of pulmonary tuberculosis with isoniazid; an interim report to the Medical Research Council by their Tuberculosis Chemotherapy Trials Committee. Br Med J. 1952;2(4787):735-46. PMID 12978309; PMCID PMC2021603. No abstract; cited for the date only.", "link": "https://pubmed.ncbi.nlm.nih.gov/12978309/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Mudzengi2026", "text": "Mudzengi D, Mashatole S, Xiang Q, Adrion C, Glover N, Ngwanto T, et al. panTB-HM: a multi-arm clinical trial of a pan-TB regimen targeting both host and microbe. Trials. 2026;27(1):271. PMID 41749341; PMCID PMC13049951; doi:10.1186/s13063-026-09568-9.", "link": "https://doi.org/10.1186/s13063-026-09568-9", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Muller2018", "text": "Müller AM, Osório CS, Silva DR, Sbruzzi G, de Tarso P, Dalcin R. Interventions to improve adherence to tuberculosis treatment: systematic review and meta-analysis. Int J Tuberc Lung Dis. 2018;22(7):731-740. PMID 29914598; doi:10.5588/ijtld.17.0596.", "link": "https://doi.org/10.5588/ijtld.17.0596", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Murray2015", "text": "Murray JF, Schraufnagel DE, Hopewell PC. Treatment of tuberculosis. A historical perspective. Ann Am Thorac Soc. 2015;12(12):1749-59. PMID 26653188; doi:10.1513/AnnalsATS.201509-632PS.", "link": "https://doi.org/10.1513/annalsats.201509-632ps", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Nachiappan2017", "text": "Nachiappan AC, Rahbar K, Shi X, Guy ES, Mortani Barbosa EJ, Shroff GS, et al. Pulmonary tuberculosis: role of radiology in diagnosis and management. Radiographics. 2017;37(1):52-72. PMID 28076011; doi:10.1148/rg.2017160032.", "link": "https://doi.org/10.1148/rg.2017160032", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Nahid2016", "text": "Nahid P, Dorman SE, Alipanah N, Barry PM, Brozek JL, Cattamanchi A, et al. Official American Thoracic Society/Centers for Disease Control and Prevention/Infectious Diseases Society of America clinical practice guidelines: treatment of drug-susceptible tuberculosis. Clin Infect Dis. 2016;63(7):e147-e195. PMID 27516382; PMCID PMC6590850; doi:10.1093/cid/ciw376.", "link": "https://doi.org/10.1093/cid/ciw376", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Namale2015", "text": "Namale PE, Abdullahi LH, Fine S, Kamkuemah M, Wilkinson RJ, Meintjes G. Paradoxical TB-IRIS in HIV-infected adults: a systematic review and meta-analysis. Future Microbiol. 2015;10(6):1077-99. PMID 26059627; doi:10.2217/fmb.15.9.", "link": "https://doi.org/10.2217/fmb.15.9", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Nardell1991", "text": "Nardell EA, Keegan J, Cheney SA, Etkind SC. Airborne infection. Theoretical limits of protection achievable by building ventilation. Am Rev Respir Dis. 1991;144(2):302-6. PMID 1907115; doi:10.1164/ajrccm/144.2.302.", "link": "https://doi.org/10.1164/ajrccm/144.2.302", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Nathavitharana2017LPA", "text": "Nathavitharana RR, Cudahy PG, Schumacher SG, Steingart KR, Pai M, Denkinger CM. Accuracy of line probe assays for the diagnosis of pulmonary and multidrug-resistant tuberculosis: a systematic review and meta-analysis. Eur Respir J. 2017;49(1). PMID 28100546; PMCID PMC5898952; doi:10.1183/13993003.01075-2016.", "link": "https://doi.org/10.1183/13993003.01075-2016", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Nathavitharana2021LAM", "text": "Nathavitharana RR, Lederer P, Chaplin M, Bjerrum S, Steingart KR, Shah M. Impact of diagnostic strategies for tuberculosis using lateral flow urine lipoarabinomannan assay in people living with HIV. Cochrane Database Syst Rev. 2021;8(8):CD014641. PMID 34416013; PMCID PMC8407503; doi:10.1002/14651858.CD014641.", "link": "https://doi.org/10.1002/14651858.cd014641", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "NCT04975178", "text": "Biofabri, S.L. Randomised, Double-Blind, Controlled Phase 3 Trial to Evaluate the Efficacy, Safety and Immunogenicity of MTBVAC in Healthy HIV Unexposed and HIV Exposed Uninfected Newborns in Tuberculosis-Endemic Regions of Sub-Saharan Africa (MTBVACN3). ClinicalTrials.gov. Start 2022-10-17; enrolment 7,120; status recruiting. NCT04975178.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05330884", "text": "Tuberculosis Research Centre, India. Efficacy of BCG Revaccination Compared With Oral Chemoprophylaxis in Household Contacts Aged 6-18 Years for Prevention of Tuberculosis Disease (BRiC). ClinicalTrials.gov. Start 2024-07-15; status suspended. NCT05330884.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05971602", "text": "Gates Medical Research Institute. A Phase 2b/c, Multi-Arm, 2-Stage, Duration Randomized Trial of the Efficacy and Safety of Two to Four Months Treatment With Regimens Containing Bedaquiline, OPC-167832, and Sutezolid, Plus Either Pretomanid or Delamanid, in Adults With Pulmonary Tuberculosis (PAN-TB). ClinicalTrials.gov. Start 2023-07-26; status terminated. NCT05971602.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06062238", "text": "Gates Medical Research Institute. Study to Assess Efficacy and Safety of M72/AS01E-4 Mycobacterium Tuberculosis (Mtb) Vaccine in Adolescents and Adults. ClinicalTrials.gov. Phase 3; start 2024-03-05; enrolment 20,080; status active, not recruiting. NCT06062238.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06114628", "text": "University College London (UNITE4TB consortium). A Seamless Phase 2B/C Platform Trial to Evaluate Multiple Regimens and Durations of Treatment in Pulmonary Tuberculosis (PARADIGM4TB). ClinicalTrials.gov. Start 2024-01-09; enrolment 2,500; status recruiting. NCT06114628.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06272812", "text": "International AIDS Vaccine Initiative. A Phase 2b, Double-blind, Randomized, Placebo-controlled Study to Evaluate the Efficacy, Safety and Immunogenicity of MTBVAC Against TB Disease in Adolescents and Adults Aged 14-45 Years. ClinicalTrials.gov. Start 2025-02-19; enrolment 5,500; status active, not recruiting. NCT06272812.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07209761", "text": "Otsuka Pharmaceutical Development & Commercialization, Inc. A Phase 3, Randomized, Open-label, Multicenter Trial to Evaluate the Efficacy, Safety, and Tolerability of 4-month and 6-month Quabodepistat-containing Regimens for Rifampicin-resistant/Multidrug-resistant Pulmonary Tuberculosis (QUANTUM-TB). ClinicalTrials.gov. Start 2025-10-16; enrolment 532; status recruiting. NCT07209761.", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "Nduba2026", "text": "Nduba V, Mathebula M, Nankabirwa V, Dempster M, Mhimbira F, Sabi I, et al. Comparison of VPM1002 with BCG in the prevention of tuberculosis in newborn infants: a multicentre, double-blind, randomised, phase 3, non-inferiority trial. Lancet Infect Dis. 2026 (online ahead of print):S1473-3099(26)00374-9. PMID 42612668; doi:10.1016/S1473-3099(26)00374-9.", "link": "https://doi.org/10.1016/s1473-3099(26)00374-9", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Nemes2018", "text": "Nemes E, Geldenhuys H, Rozot V, Rutkowski KT, Ratangee F, Bilek N, et al. Prevention of M. tuberculosis Infection with H4:IC31 Vaccine or BCG Revaccination. N Engl J Med. 2018;379(2):138-149. PMID 29996082; PMCID PMC5937161; doi:10.1056/NEJMoa1714021.", "link": "https://doi.org/10.1056/nejmoa1714021", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Ngabonziza2020", "text": "Ngabonziza JCS, Loiseau C, Marceau M, Jouet A, Menardo F, Tzfadia O, et al. A sister lineage of the Mycobacterium tuberculosis complex discovered in the African Great Lakes region. Nat Commun. 2020;11(1):2917. PMID 32518235; PMCID PMC7283319; doi:10.1038/s41467-020-16626-6.", "link": "https://doi.org/10.1038/s41467-020-16626-6", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Niemi2003", "text": "Niemi M, Backman JT, Fromm MF, Neuvonen PJ, Kivistö KT. Pharmacokinetic interactions with rifampicin : clinical relevance. Clin Pharmacokinet. 2003;42(9):819-50. PMID 12882588; doi:10.2165/00003088-200342090-00003.", "link": "https://doi.org/10.2165/00003088-200342090-00003", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Nolan1999", "text": "Nolan CM, Goldberg SV, Buskin SE. Hepatotoxicity associated with isoniazid preventive therapy: a 7-year survey from a public health tuberculosis clinic. JAMA. 1999;281(11):1014-8. PMID 10086436; doi:10.1001/jama.281.11.1014.", "link": "https://doi.org/10.1001/jama.281.11.1014", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "NTCA2005", "text": "National Tuberculosis Controllers Association; Centers for Disease Control and Prevention (CDC). Guidelines for the investigation of contacts of persons with infectious tuberculosis. Recommendations from the National Tuberculosis Controllers Association and CDC. MMWR Recomm Rep. 2005;54(RR-15):1-47. PMID 16357823.", "link": "https://pubmed.ncbi.nlm.nih.gov/16357823/", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nunn2019", "text": "Nunn AJ, Phillips PPJ, Meredith SK, Chiang CY, Conradie F, Dalai D, et al. A Trial of a Shorter Regimen for Rifampin-Resistant Tuberculosis. N Engl J Med. 2019;380(13):1201-1213. PMID 30865791; doi:10.1056/NEJMoa1811867.", "link": "https://doi.org/10.1056/nejmoa1811867", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Nyamathi2021", "text": "Nyamathi A, Salem BE, Shin SS, Jones AA, Garfin DR, Yadav K, et al. Effect of a Nurse-Led Community Health Worker Intervention on Latent Tuberculosis Medication Completion Among Homeless Adults. Nurs Res. 2021;70(6):433-442. PMID 34380979; PMCID PMC8563379; doi:10.1097/NNR.0000000000000545.", "link": "https://doi.org/10.1097/nnr.0000000000000545", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nyangwa2022", "text": "Nyang'wa BT, Berry C, Kazounis E, Motta I, Parpieva N, Tigay Z, et al. A 24-Week, All-Oral Regimen for Rifampin-Resistant Tuberculosis. N Engl J Med. 2022;387(25):2331-2343. PMID 36546625; doi:10.1056/NEJMoa2117166.", "link": "https://doi.org/10.1056/nejmoa2117166", "areas": ["A", "E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "OGarra2013", "text": "O'Garra A, Redford PS, McNab FW, Bloom CI, Wilkinson RJ, Berry MP. The immune response in tuberculosis. Annu Rev Immunol. 2013;31:475-527. PMID 23516984; doi:10.1146/annurev-immunol-032712-095939.", "link": "https://doi.org/10.1146/annurev-immunol-032712-095939", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "OleaPopelka2017", "text": "Olea-Popelka F, Muwonge A, Perera A, Dean AS, Mumford E, Erlacher-Vindel E, et al. Zoonotic tuberculosis in human beings caused by Mycobacterium bovis - a call for action. Lancet Infect Dis. 2017;17(1):e21-e25. PMID 27697390; doi:10.1016/S1473-3099(16)30139-6.", "link": "https://doi.org/10.1016/s1473-3099(16)30139-6", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Oliosi2019", "text": "Oliosi JGN, Reis-Santos B, Locatelli RL, Sales CMM, da Silva Filho WG, da Silva KC, et al. Effect of the Bolsa Familia Programme on the outcome of tuberculosis treatment: a prospective cohort study. Lancet Glob Health. 2019;7(2):e219-e226. PMID 30584050; doi:10.1016/S2214-109X(18)30478-9.", "link": "https://doi.org/10.1016/s2214-109x(18)30478-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Olugbosi2026", "text": "Olugbosi M, Beumont M, Lombard L, Nedelman J, Timm J, Black T, et al. Protocol for a phase 2, partially blinded, randomized trial assessing the safety and efficacy of sorfequiline or bedaquiline in combination with pretomanid and linezolid in adult participants with newly diagnosed, drug-sensitive, smear-positive pulmonary tuberculosis (NC-009). Trials. 2026;27(1):102. PMID 41495827; PMCID PMC12869905; doi:10.1186/s13063-025-09413-5.", "link": "https://doi.org/10.1186/s13063-025-09413-5", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Orme2014", "text": "Orme IM, Basaraba RJ. The formation of the granuloma in tuberculosis infection. Semin Immunol. 2014;26(6):601-609. PMID 25453231; doi:10.1016/j.smim.2014.09.009.", "link": "https://doi.org/10.1016/j.smim.2014.09.009", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Pagan2018", "text": "Pagán AJ, Ramakrishnan L. The formation and function of granulomas. Annu Rev Immunol. 2018;36:639-665. PMID 29400999; doi:10.1146/annurev-immunol-032712-100022.", "link": "https://doi.org/10.1146/annurev-immunol-032712-100022", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Pai2006HCW", "text": "Pai M, Joshi R, Dogra S, Mendiratta DK, Narang P, Kalantri S, et al. Serial testing of health care workers for tuberculosis using interferon-gamma assay. Am J Respir Crit Care Med. 2006;174(3):349-55. PMID 16690977; PMCID PMC2648116; doi:10.1164/rccm.200604-472OC.", "link": "https://doi.org/10.1164/rccm.200604-472oc", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Pai2008", "text": "Pai M, Zwerling A, Menzies D. Systematic review: T-cell-based assays for the diagnosis of latent tuberculosis infection: an update. Ann Intern Med. 2008;149(3):177-184. PMID 18593687; PMCID PMC2951987; doi:10.7326/0003-4819-149-3-200808050-00241.", "link": "https://doi.org/10.7326/0003-4819-149-3-200808050-00241", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Pai2016", "text": "Pai M, Behr MA, Dowdy D, Dheda K, Divangahi M, Boehme CC, et al. Tuberculosis. Nat Rev Dis Primers. 2016;2:16076. PMID 27784885; doi:10.1038/nrdp.2016.76.", "link": "https://doi.org/10.1038/nrdp.2016.76", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Paton2023", "text": "Paton NI, Cousins C, Suresh C, Burhan E, Chew KL, Dalay VB, et al. Treatment Strategy for Rifampin-Susceptible Tuberculosis. N Engl J Med. 2023;388(10):873-887. PMID 36808186; PMCID PMC7616851; doi:10.1056/NEJMoa2212537.", "link": "https://doi.org/10.1056/nejmoa2212537", "areas": ["E", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Peloquin1999", "text": "Peloquin CA, Namdar R, Singleton MD, Nix DE. Pharmacokinetics of rifampin under fasting conditions, with food, and with antacids. Chest. 1999;115(1):12-8. PMID 9925057; doi:10.1378/chest.115.1.12.", "link": "https://doi.org/10.1378/chest.115.1.12", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "PennNicholson2021", "text": "Penn-Nicholson A, Gomathi SN, Ugarte-Gil C, Meaza A, Lavu E, Patel P, et al. A prospective multicentre diagnostic accuracy study for the Truenat tuberculosis assays. Eur Respir J. 2021;58(5). PMID 34049948; PMCID PMC8607906; doi:10.1183/13993003.00526-2021.", "link": "https://doi.org/10.1183/13993003.00526-2021", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Peter2016", "text": "Peter JG, Zijenah LS, Chanda D, Clowes P, Lesosky M, Gina P, et al. Effect on mortality of point-of-care, urine-based lipoarabinomannan testing to guide tuberculosis treatment initiation in HIV-positive hospital inpatients: a pragmatic, parallel-group, multicountry, open-label, randomised controlled trial. Lancet. 2016;387(10024):1187-97. PMID 26970721; doi:10.1016/S0140-6736(15)01092-2.", "link": "https://doi.org/10.1016/s0140-6736(15)01092-2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Peto2009", "text": "Peto HM, Pratt RH, Harrington TA, LoBue PA, Armstrong LR. Epidemiology of extrapulmonary tuberculosis in the United States, 1993-2006. Clin Infect Dis. 2009;49(9):1350-7. PMID 19793000; doi:10.1086/605559.", "link": "https://doi.org/10.1086/605559", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Peyron2008", "text": "Peyron P, Vaubourgeix J, Poquet Y, Levillain F, Botanch C, Bardou F, et al. Foamy macrophages from tuberculous patients' granulomas constitute a nutrient-rich reservoir for M. tuberculosis persistence. PLoS Pathog. 2008;4(11):e1000204. PMID 19002241; PMCID PMC2575403; doi:10.1371/journal.ppat.1000204.", "link": "https://doi.org/10.1371/journal.ppat.1000204", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Pillay2022", "text": "Pillay S, Steingart KR, Davies GR, Chaplin M, De Vos M, Schumacher SG, et al. Xpert MTB/XDR for detection of pulmonary tuberculosis and resistance to isoniazid, fluoroquinolones, ethionamide, and amikacin. Cochrane Database Syst Rev. 2022;5(5):CD014841. PMID 35583175; PMCID PMC9115865; doi:10.1002/14651858.CD014841.pub2.", "link": "https://doi.org/10.1002/14651858.cd014841.pub2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Portnoy2023", "text": "Portnoy A, Yamanaka T, Nguhiu P, Nishikiori N, Garcia Baena I, Floyd K, et al. Costs incurred by people receiving tuberculosis treatment in low-income and middle-income countries: a meta-regression analysis. Lancet Glob Health. 2023;11(10):e1640-e1647. PMID 37734806; PMCID PMC10522775; doi:10.1016/S2214-109X(23)00369-8.", "link": "https://doi.org/10.1016/s2214-109x(23)00369-8", "areas": ["F", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Portnoy2023LGH"]}, {"key": "Portnoy2023BMJGH", "text": "Portnoy A, Clark RA, Weerasuriya CK, Mukandavire C, Quaife M, Bakker R, et al. The potential impact of novel tuberculosis vaccines on health equity and financial protection in low-income and middle-income countries. BMJ Glob Health. 2023;8(7):e012466. PMID 37438049; PMCID PMC10347450; doi:10.1136/bmjgh-2023-012466.", "link": "https://doi.org/10.1136/bmjgh-2023-012466", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Poulsen1950", "text": "Poulsen A. Some clinical features of tuberculosis. 1. Incubation period. Acta Tuberc Scand. 1950;24(3-4):311-346. PMID 14783027. No abstract or full text available; the Faroe Islands incubation-period figures are quoted as reported in Behr2018.", "link": "https://pubmed.ncbi.nlm.nih.gov/14783027/", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Prasad2016", "text": "Prasad K, Singh MB, Ryan H. Corticosteroids for managing tuberculous meningitis. Cochrane Database Syst Rev. 2016;4(4):CD002244. PMID 27121755; PMCID PMC4916936; doi:10.1002/14651858.CD002244.pub4.", "link": "https://doi.org/10.1002/14651858.cd002244.pub4", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Prideaux2015", "text": "Prideaux B, Via LE, Zimmerman MD, Eum S, Sarathy J, O'Brien P, et al. The association between sterilizing activity and drug distribution into tuberculosis lesions. Nat Med. 2015;21(10):1223-1227. PMID 26343800; PMCID PMC4598290; doi:10.1038/nm.3937.", "link": "https://doi.org/10.1038/nm.3937", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Proano2018", "text": "Proaño A, Bui DP, López JW, Vu NM, Bravard MA, Lee GO, et al. Cough frequency during treatment associated with baseline cavitary volume and proximity to the airway in pulmonary TB. Chest. 2018;153(6):1358-1367. PMID 29559307; PMCID PMC6026292; doi:10.1016/j.chest.2018.03.006.", "link": "https://doi.org/10.1016/j.chest.2018.03.006", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Pym2002", "text": "Pym AS, Brodin P, Brosch R, Huerre M, Cole ST. Loss of RD1 contributed to the attenuation of the live tuberculosis vaccines Mycobacterium bovis BCG and Mycobacterium microti. Mol Microbiol. 2002;46(3):709-17. PMID 12410828; doi:10.1046/j.1365-2958.2002.03237.x.", "link": "https://doi.org/10.1046/j.1365-2958.2002.03237.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Qin2021", "text": "Qin ZZ, Ahmed S, Sarker MS, Paul K, Adel ASS, Naheyan T, et al. Tuberculosis detection from chest x-rays for triaging in a high tuberculosis-burden setting: an evaluation of five artificial intelligence algorithms. Lancet Digit Health. 2021;3(9):e543-e554. PMID 34446265; doi:10.1016/S2589-7500(21)00116-3.", "link": "https://doi.org/10.1016/s2589-7500(21)00116-3", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Queval2017", "text": "Queval CJ, Brosch R, Simeone R. The macrophage: a disputed fortress in the battle against Mycobacterium tuberculosis. Front Microbiol. 2017;8:2284. PMID 29218036; PMCID PMC5703847; doi:10.3389/fmicb.2017.02284.", "link": "https://doi.org/10.3389/fmicb.2017.02284", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ragan2020", "text": "Ragan EJ, Kleinman MB, Sweigart B, Gnatienko N, Parry CD, Horsburgh CR, et al. The impact of alcohol use on tuberculosis treatment outcomes: a systematic review and meta-analysis. Int J Tuberc Lung Dis. 2020;24(1):73-82. PMID 32005309; PMCID PMC7491444; doi:10.5588/ijtld.19.0080.", "link": "https://doi.org/10.5588/ijtld.19.0080", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Ragonnet2021", "text": "Ragonnet R, Flegg JA, Brilleman SL, Tiemersma EW, Melsew YA, McBryde ES, et al. Revisiting the Natural History of Pulmonary Tuberculosis: A Bayesian Estimation of Natural Recovery and Mortality Rates. Clin Infect Dis. 2021;73(1):e88-e96. PMID 32766718; doi:10.1093/cid/ciaa602.", "link": "https://doi.org/10.1093/cid/ciaa602", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ramakrishnan2012", "text": "Ramakrishnan L. Revisiting the role of the granuloma in tuberculosis. Nat Rev Immunol. 2012;12(5):352-366. PMID 22517424; doi:10.1038/nri3211.", "link": "https://doi.org/10.1038/nri3211", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rangaka2012", "text": "Rangaka MX, Wilkinson KA, Glynn JR, Ling D, Menzies D, Mwansa-Kambafwile J, et al. Predictive value of interferon-γ release assays for incident active tuberculosis: a systematic review and meta-analysis. Lancet Infect Dis. 2012;12(1):45-55. PMID 21846592; PMCID PMC3568693; doi:10.1016/S1473-3099(11)70210-9.", "link": "https://doi.org/10.1016/s1473-3099(11)70210-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ravenscroft2020", "text": "Ravenscroft L, Kettle S, Persian R, Ruda S, Severin L, Doltu S, et al. Video-observed therapy and medication adherence for tuberculosis patients: randomised controlled trial in Moldova. Eur Respir J. 2020;56(2). PMID 32381495; doi:10.1183/13993003.00493-2020.", "link": "https://doi.org/10.1183/13993003.00493-2020", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Raviglione1995", "text": "Raviglione MC, Snider DE Jr, Kochi A. Global epidemiology of tuberculosis. Morbidity and mortality of a worldwide epidemic. JAMA. 1995;273(3):220-6. PMID 7807661. No DOI listed in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/7807661/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Raviglione2002", "text": "Raviglione MC, Pio A. Evolution of WHO policies for tuberculosis control, 1948-2001. Lancet. 2002;359(9308):775-80. PMID 11888605; doi:10.1016/s0140-6736(02)07880-7.", "link": "https://doi.org/10.1016/s0140-6736(02)07880-7", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Raviglione2006", "text": "Raviglione MC, Uplekar MW. WHO's new Stop TB Strategy. Lancet. 2006;367(9514):952-5. PMID 16546550; doi:10.1016/S0140-6736(06)68392-X. No abstract; cited for the date only.", "link": "https://doi.org/10.1016/s0140-6736(06)68392-x", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Rehm2009", "text": "Rehm J, Samokhvalov AV, Neuman MG, Room R, Parry C, Lönnroth K, et al. The association between alcohol use, alcohol use disorders and tuberculosis (TB). A systematic review. BMC Public Health. 2009;9:450. PMID 19961618; PMCID PMC2796667; doi:10.1186/1471-2458-9-450.", "link": "https://doi.org/10.1186/1471-2458-9-450", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Reichler2018", "text": "Reichler MR, Khan A, Sterling TR, Zhao H, Moran J, McAuley J, et al. Risk and Timing of Tuberculosis Among Close Contacts of Persons with Infectious Tuberculosis. J Infect Dis. 2018;218(6):1000-1008. PMID 29767733; PMCID PMC6534268; doi:10.1093/infdis/jiy265.", "link": "https://doi.org/10.1093/infdis/jiy265", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Reichler2020Hours", "text": "Reichler MR, Khan A, Yuan Y, Chen B, McAuley J, Mangura B, et al. Duration of Exposure Among Close Contacts of Patients With Infectious Tuberculosis and Risk of Latent Tuberculosis Infection. Clin Infect Dis. 2020;71(7):1627-1634. PMID 32044987; PMCID PMC8851607; doi:10.1093/cid/ciz1044.", "link": "https://doi.org/10.1093/cid/ciz1044", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Reichler2020Risk", "text": "Reichler MR, Khan A, Sterling TR, Zhao H, Chen B, Yuan Y, et al. Risk Factors for Tuberculosis and Effect of Preventive Therapy Among Close Contacts of Persons With Infectious Tuberculosis. Clin Infect Dis. 2020;70(8):1562-1572. PMID 31127813; PMCID PMC7011200; doi:10.1093/cid/ciz438.", "link": "https://doi.org/10.1093/cid/ciz438", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Reiley2008", "text": "Reiley WW, Calayag MD, Wittmer ST, Huntington JL, Pearl JE, Fountain JJ, et al. ESAT-6-specific CD4 T cell responses to aerosol Mycobacterium tuberculosis infection are initiated in the mediastinal lymph nodes. Proc Natl Acad Sci U S A. 2008;105(31):10961-10966. PMID 18667699; doi:10.1073/pnas.0801496105.", "link": "https://doi.org/10.1073/pnas.0801496105", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Rifat2026", "text": "Rifat M, Silva DR, Mahmud AM, Bennoor KS, D'Ambrosio L, Centis R, et al. Feasibility and efficacy of a population-based pulmonary rehabilitation for post-tuberculosis lung disease in Bangladesh. Int J Infect Dis. 2026;167:108477. PMID 41690506; doi:10.1016/j.ijid.2026.108477.", "link": "https://doi.org/10.1016/j.ijid.2026.108477", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Riley1957", "text": "Riley RL, Wells WF, Mills CC, Nyka W, McLean RL. Air hygiene in tuberculosis: quantitative studies of infectivity and control in a pilot ward. Am Rev Tuberc. 1957;75(3):420-31. PMID 13403171; doi:10.1164/artpd.1957.75.3.420. No abstract in PubMed or Europe PMC; cited only for what the study did.", "link": "https://doi.org/10.1164/artpd.1957.75.3.420", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Riley1962", "text": "Riley RL, Mills CC, O'Grady F, Sultan LU, Wittstadt F, Shivpuri DN. Infectiousness of air from a tuberculosis ward. Ultraviolet irradiation of infected air: comparative infectiousness of different patients. Am Rev Respir Dis. 1962;85:511-25. PMID 14492300; doi:10.1164/arrd.1962.85.4.511. No abstract in PubMed or Europe PMC; cited only for what the study did.", "link": "https://doi.org/10.1164/arrd.1962.85.4.511", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Riley2001", "text": "Riley RL. What nobody needs to know about airborne infection. Am J Respir Crit Care Med. 2001;163(1):7-8. PMID 11208616; doi:10.1164/ajrccm.163.1.hh11-00. Editorial, no abstract.", "link": "https://doi.org/10.1164/ajrccm.163.1.hh11-00", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Rodi2022", "text": "Rodi P, Obermeyer W, Pablos-Mendez A, Gori A, Raviglione MC. Political rationale, aims, and outcomes of health-related high-level meetings and special sessions at the UN General Assembly: a policy research observational study. PLoS Med. 2022;19(1):e1003873. PMID 35025880; PMCID PMC8757909; doi:10.1371/journal.pmed.1003873.", "link": "https://doi.org/10.1371/journal.pmed.1003873", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Romanowski2019", "text": "Romanowski K, Baumann B, Basham CA, Ahmad Khan F, Fox GJ, Johnston JC. Long-term all-cause mortality in people treated for tuberculosis: a systematic review and meta-analysis. Lancet Infect Dis. 2019;19(10):1129-1137. PMID 31324519; doi:10.1016/S1473-3099(19)30309-3.", "link": "https://doi.org/10.1016/s1473-3099(19)30309-3", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Roy2014", "text": "Roy A, Eisenhut M, Harris RJ, Rodrigues LC, Sridhar S, Habermann S, et al. Effect of BCG vaccination against Mycobacterium tuberculosis infection in children: systematic review and meta-analysis. BMJ. 2014;349:g4643. PMID 25097193; PMCID PMC4122754; doi:10.1136/bmj.g4643.", "link": "https://doi.org/10.1136/bmj.g4643", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Rubinstein2026", "text": "Rubinstein F, Moraes Morelli D, Palma I, Sanjurjo M, Morales R, Bornengo F, et al. Evaluation of patient centred digital adherence technology for tuberculosis treatment outcomes: pragmatic randomised controlled trial. BMJ. 2026;394:e100195. PMID 42562413; doi:10.1136/bmj-2026-100195.", "link": "https://doi.org/10.1136/bmj-2026-100195", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Ruhwald2017", "text": "Ruhwald M, Aggerbeck H, Gallardo RV, Hoff ST, Villate JI, Borregaard B, et al. Safety and efficacy of the C-Tb skin test to diagnose Mycobacterium tuberculosis infection, compared with an interferon γ release assay and the tuberculin skin test: a phase 3, double-blind, randomised, controlled trial. Lancet Respir Med. 2017;5(4):259-268. PMID 28159608; doi:10.1016/S2213-2600(16)30436-2.", "link": "https://doi.org/10.1016/s2213-2600(16)30436-2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "RuizGrosso2020", "text": "Ruiz-Grosso P, Cachay R, de la Flor A, Schwalb A, Ugarte-Gil C. Association between tuberculosis and depression on negative outcomes of tuberculosis treatment: A systematic review and meta-analysis. PLoS One. 2020;15(1):e0227472. PMID 31923280; PMCID PMC6953784; doi:10.1371/journal.pone.0227472.", "link": "https://doi.org/10.1371/journal.pone.0227472", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Russell2007", "text": "Russell DG. Who puts the tubercle in tuberculosis? Nat Rev Microbiol. 2007;5(1):39-47. PMID 17160001; doi:10.1038/nrmicro1538.", "link": "https://doi.org/10.1038/nrmicro1538", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Russell2009", "text": "Russell DG, Cardona PJ, Kim MJ, Allain S, Altare F. Foamy macrophages and the progression of the human tuberculosis granuloma. Nat Immunol. 2009;10(9):943-948. PMID 19692995; PMCID PMC2759071; doi:10.1038/ni.1781.", "link": "https://doi.org/10.1038/ni.1781", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sakula1982", "text": "Sakula A. Robert Koch: centenary of the discovery of the tubercle bacillus, 1882. Thorax. 1982;37(4):246-51. PMID 6180494; PMCID PMC459292; doi:10.1136/thx.37.4.246.", "link": "https://doi.org/10.1136/thx.37.4.246", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Samandari2011", "text": "Samandari T, Agizew TB, Nyirenda S, Tedla Z, Sibanda T, Shang N, et al. 6-month versus 36-month isoniazid preventive treatment for tuberculosis in adults with HIV infection in Botswana: a randomised, double-blind, placebo-controlled trial. Lancet. 2011;377(9777):1588-98. PMID 21492926; doi:10.1016/S0140-6736(11)60204-3.", "link": "https://doi.org/10.1016/s0140-6736(11)60204-3", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Sarathy2018", "text": "Sarathy JP, Via LE, Weiner D, Blanc L, Boshoff H, Eugenin EA, et al. Extreme drug tolerance of Mycobacterium tuberculosis in caseum. Antimicrob Agents Chemother. 2018;62(2):e02266-17. PMID 29203492; PMCID PMC5786764; doi:10.1128/AAC.02266-17.", "link": "https://doi.org/10.1128/aac.02266-17", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Saukkonen2006", "text": "Saukkonen JJ, Cohn DL, Jasmer RM, Schenker S, Jereb JA, Nolan CM, et al. An official ATS statement: hepatotoxicity of antituberculosis therapy. Am J Respir Crit Care Med. 2006;174(8):935-52. PMID 17021358; doi:10.1164/rccm.200510-1666ST.", "link": "https://doi.org/10.1164/rccm.200510-1666st", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Saukkonen2025", "text": "Saukkonen JJ, Duarte R, Munsiff SS, Winston CA, Mammen MJ, Abubakar I, et al. Updates on the treatment of drug-susceptible and drug-resistant tuberculosis: an official ATS/CDC/ERS/IDSA clinical practice guideline. Am J Respir Crit Care Med. 2025;211(1):15-33. PMID 40693952; PMCID PMC11755361; doi:10.1164/rccm.202410-2096ST.", "link": "https://doi.org/10.1164/rccm.202410-2096st", "areas": ["C", "E", "F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Schatz1944", "text": "Schatz A, Bugie E, Waksman SA. Streptomycin, a substance exhibiting antibiotic activity against gram-positive and gram-negative bacteria. 1944. Clin Orthop Relat Res. 2005;(437):3-6 (reprint of Proc Soc Exp Biol Med 1944). PMID 16056018; doi:10.1097/01.blo.0000175887.98112.fe. No abstract; cited for the date and discoverers only.", "link": "https://doi.org/10.1097/01.blo.0000175887.98112.fe", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Schmidt2025", "text": "Schmidt AC, Fairlie L, Hellström E, Luabeya Kany Kany A, Middelkoop K, Naidoo K, et al. BCG Revaccination for the Prevention of Mycobacterium tuberculosis Infection. N Engl J Med. 2025;392(18):1789-1800. PMID 40334156; PMCID PMC12061034; doi:10.1056/NEJMoa2412381.", "link": "https://doi.org/10.1056/nejmoa2412381", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Schwab2024", "text": "Schwab TC, Perrig L, Göller PC, Guebely De la Hoz FF, Lahousse AP, Minder B, et al. Targeted next-generation sequencing to diagnose drug-resistant tuberculosis: a systematic review and meta-analysis. Lancet Infect Dis. 2024;24(10):1162-1176. PMID 38795712; PMCID PMC11881551; doi:10.1016/S1473-3099(24)00263-9.", "link": "https://doi.org/10.1016/s1473-3099(24)00263-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Scorpio1996", "text": "Scorpio A, Zhang Y. Mutations in pncA, a gene encoding pyrazinamidase/nicotinamidase, cause resistance to the antituberculous drug pyrazinamide in tubercle bacillus. Nat Med. 1996;2(6):662-667. PMID 8640557; doi:10.1038/nm0696-662.", "link": "https://doi.org/10.1038/nm0696-662", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Scriba2017", "text": "Scriba TJ, Penn-Nicholson A, Shankar S, Hraha T, Thompson EG, Sterling D, et al. Sequential inflammatory processes define human progression from M. tuberculosis infection to tuberculosis disease. PLoS Pathog. 2017;13(11):e1006687. PMID 29145483; PMCID PMC5689825; doi:10.1371/journal.ppat.1006687.", "link": "https://doi.org/10.1371/journal.ppat.1006687", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Seifert2015", "text": "Seifert M, Catanzaro D, Catanzaro A, Rodwell TC. Genetic mutations associated with isoniazid resistance in Mycobacterium tuberculosis: a systematic review. PLoS One. 2015;10(3):e0119628. PMID 25799046; PMCID PMC4370653; doi:10.1371/journal.pone.0119628.", "link": "https://doi.org/10.1371/journal.pone.0119628", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Selwyn1989", "text": "Selwyn PA, Hartel D, Lewis VA, Schoenbaum EE, Vermund SH, Klein RS, et al. A prospective study of the risk of tuberculosis among intravenous drug users with human immunodeficiency virus infection. N Engl J Med. 1989;320(9):545-50. PMID 2915665; doi:10.1056/NEJM198903023200901.", "link": "https://doi.org/10.1056/nejm198903023200901", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Sensi1983", "text": "Sensi P. History of the development of rifampin. Rev Infect Dis. 1983;5 Suppl 3:S402-6. PMID 6635432; doi:10.1093/clinids/5.supplement_3.s402.", "link": "https://doi.org/10.1093/clinids/5.supplement_3.s402", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Shah2017NEJM", "text": "Shah NS, Auld SC, Brust JC, Mathema B, Ismail N, Moodley P, et al. Transmission of Extensively Drug-Resistant Tuberculosis in South Africa. N Engl J Med. 2017;376(3):243-253. PMID 28099825; PMCID PMC5330208; doi:10.1056/NEJMoa1604544.", "link": "https://doi.org/10.1056/nejmoa1604544", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Shaku2026", "text": "Shaku MT, Bishai WR. Advances in host-directed therapies for tuberculosis. Expert Rev Anti Infect Ther. 2026 (online ahead of print). PMID 42911652; doi:10.1080/14787210.2026.2750203.", "link": "https://doi.org/10.1080/14787210.2026.2750203", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sharma2005", "text": "Sharma SK, Mohan A, Sharma A, Mitra DK. Miliary tuberculosis: new insights into an old disease. Lancet Infect Dis. 2005;5(7):415-430. PMID 15978528; doi:10.1016/S1473-3099(05)70163-8.", "link": "https://doi.org/10.1016/s1473-3099(05)70163-8", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sharma2010DILI", "text": "Sharma SK, Singla R, Sarda P, Mohan A, Makharia G, Jayaswal A, et al. Safety of 3 different reintroduction regimens of antituberculosis drugs after development of antituberculosis treatment-induced hepatotoxicity. Clin Infect Dis. 2010;50(6):833-9. PMID 20156055; doi:10.1086/650576.", "link": "https://doi.org/10.1086/650576", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Sharma2013Cochrane", "text": "Sharma SK, Sharma A, Kadhiravan T, Tharyan P. Rifamycins (rifampicin, rifabutin and rifapentine) compared to isoniazid for preventing tuberculosis in HIV-negative people at risk of active TB. Cochrane Database Syst Rev. 2013;2013(7):CD007545. PMID 23828580; PMCID PMC6532682; doi:10.1002/14651858.CD007545.pub2.", "link": "https://doi.org/10.1002/14651858.cd007545.pub2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Silva2025PTLD", "text": "Silva DR, Mello FCQ, Galvão TS, Dalcolmo M, Dos Santos APC, Torres DFM, et al. Pulmonary Rehabilitation in Patients With Post-Tuberculosis Lung Disease: A Prospective Multicentre Study. Arch Bronconeumol. 2025;61(10):603-609. PMID 40055036; doi:10.1016/j.arbres.2025.02.007.", "link": "https://doi.org/10.1016/j.arbres.2025.02.007", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Simeone2012", "text": "Simeone R, Bobard A, Lippmann J, Bitter W, Majlessi L, Brosch R, et al. Phagosomal rupture by Mycobacterium tuberculosis results in toxicity and host cell death. PLoS Pathog. 2012;8(2):e1002507. PMID 22319448; PMCID PMC3271072; doi:10.1371/journal.ppat.1002507.", "link": "https://doi.org/10.1371/journal.ppat.1002507", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Singh2008", "text": "Singh R, Manjunatha U, Boshoff HI, Ha YH, Niyomrattanakit P, Ledwidge R, et al. PA-824 kills nonreplicating Mycobacterium tuberculosis by intracellular NO release. Science. 2008;322(5906):1392-1395. PMID 19039139; PMCID PMC2723733; doi:10.1126/science.1164571.", "link": "https://doi.org/10.1126/science.1164571", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Singh2026BMJ", "text": "Singh M, Joshi S, Vohra V, Sarin R, Kamble SV, Velayutham B, et al. Efficacy and safety of VPM1002 and Immuvac in preventing tuberculosis: phase 3 randomised clinical trial (PreVenTB trial). BMJ. 2026;393:e085716. PMID 41962942; PMCID PMC13063398; doi:10.1136/bmj-2025-085716.", "link": "https://doi.org/10.1136/bmj-2025-085716", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sinha2026", "text": "Sinha P, Bhargava M, Dauphinais MR, Carwile ME, Horsburgh CR Jr, Singh UB, et al. In-kind Nutritional Supplementation for Persons With Drug-susceptible Tuberculosis and Their Household Contacts Would be Cost-effective for Reducing Tuberculosis Incidence and Mortality in Jharkhand, India: A Modeling Study. Clin Infect Dis. 2026;81(6):1126-1134. PMID 40833109; PMCID PMC12893795; doi:10.1093/cid/ciaf400.", "link": "https://doi.org/10.1093/cid/ciaf400", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Siroka2016", "text": "Siroka A, Ponce NA, Lönnroth K. Association between spending on social protection and tuberculosis burden: a global analysis. Lancet Infect Dis. 2016;16(4):473-9. PMID 26725446; PMCID PMC4834192; doi:10.1016/S1473-3099(15)00401-6.", "link": "https://doi.org/10.1016/s1473-3099(15)00401-6", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Sloot2014", "text": "Sloot R, Schim van der Loeff MF, Kouw PM, Borgdorff MW. Risk of tuberculosis after recent exposure. A 10-year follow-up study of contacts in Amsterdam. Am J Respir Crit Care Med. 2014;190(9):1044-52. PMID 25265362; doi:10.1164/rccm.201406-1159OC.", "link": "https://doi.org/10.1164/rccm.201406-1159oc", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Smieja2000", "text": "Smieja MJ, Marchetti CA, Cook DJ, Smaill FM. Isoniazid for preventing tuberculosis in non-HIV infected persons. Cochrane Database Syst Rev. 2000;1999(2):CD001363. PMID 10796642; PMCID PMC6532737; doi:10.1002/14651858.CD001363.", "link": "https://doi.org/10.1002/14651858.cd001363", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Smith2003", "text": "Smith I. Mycobacterium tuberculosis pathogenesis and molecular determinants of virulence. Clin Microbiol Rev. 2003;16(3):463-496. PMID 12857778; PMCID PMC164219; doi:10.1128/CMR.16.3.463-496.2003.", "link": "https://doi.org/10.1128/cmr.16.3.463-496.2003", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sobhy2017", "text": "Sobhy S, Babiker Z, Zamora J, Khan KS, Kunst H. Maternal and perinatal mortality and morbidity associated with tuberculosis during pregnancy and the postpartum period: a systematic review and meta-analysis. BJOG. 2017;124(5):727-733. PMID 27862893; doi:10.1111/1471-0528.14408.", "link": "https://doi.org/10.1111/1471-0528.14408", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sonnenberg2005", "text": "Sonnenberg P, Glynn JR, Fielding K, Murray J, Godfrey-Faussett P, Shearer S. How soon after infection with HIV does the risk of tuberculosis start to increase? A retrospective cohort study in South African gold miners. J Infect Dis. 2005;191(2):150-158. PMID 15609223; doi:10.1086/426827.", "link": "https://doi.org/10.1086/426827", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sosa2019", "text": "Sosa LE, Njie GJ, Lobato MN, Bamrah Morris S, Buchta W, Casey ML, et al. Tuberculosis Screening, Testing, and Treatment of U.S. Health Care Personnel: Recommendations from the National Tuberculosis Controllers Association and CDC, 2019. MMWR Morb Mortal Wkly Rep. 2019;68(19):439-443. PMID 31099768; PMCID PMC6522077; doi:10.15585/mmwr.mm6819a3.", "link": "https://doi.org/10.15585/mmwr.mm6819a3", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Srivastava2014", "text": "Srivastava S, Ernst JD, Desvignes L. Beyond macrophages: the diversity of mononuclear cells in tuberculosis. Immunol Rev. 2014;262(1):179-192. PMID 25319335; PMCID PMC4203409; doi:10.1111/imr.12217.", "link": "https://doi.org/10.1111/imr.12217", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Stadelman2020", "text": "Stadelman AM, Ellis J, Samuels THA, Mutengesa E, Dobbin J, Ssebambulidde K, et al. Treatment Outcomes in Adult Tuberculous Meningitis: A Systematic Review and Meta-analysis. Open Forum Infect Dis. 2020;7(8):ofaa257. PMID 32818138; PMCID PMC7423296; doi:10.1093/ofid/ofaa257.", "link": "https://doi.org/10.1093/ofid/ofaa257", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Steadman2025", "text": "Steadman A, Kumar KM, Asege L, Kato-Maeda M, Mukwatamundu J, Shah K, et al. Diagnostic accuracy of swab-based molecular tests for tuberculosis using near-point-of-care platforms: a multi-country evaluation. EBioMedicine. 2025;121:105991. PMID 41175672; PMCID PMC12617638; doi:10.1016/j.ebiom.2025.105991.", "link": "https://doi.org/10.1016/j.ebiom.2025.105991", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Steingart2006Fluor", "text": "Steingart KR, Henry M, Ng V, Hopewell PC, Ramsay A, Cunningham J, et al. Fluorescence versus conventional sputum smear microscopy for tuberculosis: a systematic review. Lancet Infect Dis. 2006;6(9):570-81. PMID 16931408; doi:10.1016/S1473-3099(06)70578-3.", "link": "https://doi.org/10.1016/s1473-3099(06)70578-3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sterling2011", "text": "Sterling TR, Villarino ME, Borisov AS, Shang N, Gordin F, Bliven-Sizemore E, et al. Three months of rifapentine and isoniazid for latent tuberculosis infection. N Engl J Med. 2011;365(23):2155-66. PMID 22150035; doi:10.1056/NEJMoa1104875.", "link": "https://doi.org/10.1056/nejmoa1104875", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Sterling2015", "text": "Sterling TR, Moro RN, Borisov AS, Phillips E, Shepherd G, Adkinson NF, et al. Flu-like and Other Systemic Drug Reactions Among Persons Receiving Weekly Rifapentine Plus Isoniazid or Daily Isoniazid for Treatment of Latent Tuberculosis Infection in the PREVENT Tuberculosis Study. Clin Infect Dis. 2015;61(4):527-35. PMID 25904367; PMCID PMC4560029; doi:10.1093/cid/civ323.", "link": "https://doi.org/10.1093/cid/civ323", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Sterling2020", "text": "Sterling TR, Njie G, Zenner D, Cohn DL, Reves R, Ahmed A, et al. Guidelines for the Treatment of Latent Tuberculosis Infection: Recommendations from the National Tuberculosis Controllers Association and CDC, 2020. MMWR Recomm Rep. 2020;69(1):1-11. PMID 32053584; PMCID PMC7041302; doi:10.15585/mmwr.rr6901a1.", "link": "https://doi.org/10.15585/mmwr.rr6901a1", "areas": ["B", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Story2019", "text": "Story A, Aldridge RW, Smith CM, Garber E, Hall J, Ferenando G, et al. Smartphone-enabled video-observed versus directly observed treatment for tuberculosis: a multicentre, analyst-blinded, randomised, controlled superiority trial. Lancet. 2019;393(10177):1216-1224. PMID 30799062; PMCID PMC6429626; doi:10.1016/S0140-6736(18)32993-3.", "link": "https://doi.org/10.1016/s0140-6736(18)32993-3", "areas": ["E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Stover2000", "text": "Stover CK, Warrener P, VanDevanter DR, Sherman DR, Arain TM, Langhorne MH, et al. A small-molecule nitroimidazopyran drug candidate for the treatment of tuberculosis. Nature. 2000;405(6789):962-966. PMID 10879539; doi:10.1038/35016103.", "link": "https://doi.org/10.1038/35016103", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Stucki2016", "text": "Stucki D, Brites D, Jeljeli L, Coscolla M, Liu Q, Trauner A, et al. Mycobacterium tuberculosis lineage 4 comprises globally distributed and geographically restricted sublineages. Nat Genet. 2016;48(12):1535-1543. PMID 27798628; PMCID PMC5238942; doi:10.1038/ng.3704.", "link": "https://doi.org/10.1038/ng.3704", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "SturgillKoszycki1994", "text": "Sturgill-Koszycki S, Schlesinger PH, Chakraborty P, Haddix PL, Collins HL, Fok AK, et al. Lack of acidification in Mycobacterium phagosomes produced by exclusion of the vesicular proton-ATPase. Science. 1994;263(5147):678-681. PMID 8303277; doi:10.1126/science.8303277.", "link": "https://doi.org/10.1126/science.8303277", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Subbaraman2018", "text": "Subbaraman R, de Mondesert L, Musiimenta A, Pai M, Mayer KH, Thomas BE, et al. Digital adherence technologies for the management of tuberculosis therapy: mapping the landscape and research priorities. BMJ Glob Health. 2018;3(5):e001018. PMID 30364330; PMCID PMC6195152; doi:10.1136/bmjgh-2018-001018.", "link": "https://doi.org/10.1136/bmjgh-2018-001018", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Sugarman2014", "text": "Sugarman J, Colvin C, Moran AC, Oxlade O. Tuberculosis in pregnancy: an estimate of the global burden of disease. Lancet Glob Health. 2014;2(12):e710-6. PMID 25433626; doi:10.1016/S2214-109X(14)70330-4.", "link": "https://doi.org/10.1016/s2214-109x(14)70330-4", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Suthar2012", "text": "Suthar AB, Lawn SD, del Amo J, Getahun H, Dye C, Sculier D, et al. Antiretroviral therapy for prevention of tuberculosis in adults with HIV: a systematic review and meta-analysis. PLoS Med. 2012;9(7):e1001270. PMID 22911011; PMCID PMC3404110; doi:10.1371/journal.pmed.1001270.", "link": "https://doi.org/10.1371/journal.pmed.1001270", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Sweetland2017", "text": "Sweetland AC, Kritski A, Oquendo MA, Sublette ME, Norcini Pala A, Silva LRB, et al. Addressing the tuberculosis-depression syndemic to end the tuberculosis epidemic. Int J Tuberc Lung Dis. 2017;21(8):852-861. PMID 28786792; PMCID PMC5759333; doi:10.5588/ijtld.16.0584.", "link": "https://doi.org/10.5588/ijtld.16.0584", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Swindells2019", "text": "Swindells S, Ramchandani R, Gupta A, Benson CA, Leon-Cruz J, Mwelase N, et al. One Month of Rifapentine plus Isoniazid to Prevent HIV-Related Tuberculosis. N Engl J Med. 2019;380(11):1001-1011. PMID 30865794; PMCID PMC6563914; doi:10.1056/NEJMoa1806808.", "link": "https://doi.org/10.1056/nejmoa1806808", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Tadesse2025LDH", "text": "Tadesse AW, Sahile M, Foster N, McQuaid CF, Weldemichael GT, Abdurhman T, et al. Digital adherence technology interventions to reduce poor end-of-treatment outcomes and recurrence among adults with drug-sensitive tuberculosis in Ethiopia: a three-arm, pragmatic, cluster-randomised, controlled trial. Lancet Digit Health. 2025:100895 (online ahead of print). PMID 41027822; doi:10.1016/j.landig.2025.100895.", "link": "https://doi.org/10.1016/j.landig.2025.100895", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Tait2019", "text": "Tait DR, Hatherill M, Van Der Meeren O, Ginsberg AM, Van Brakel E, Salaun B, et al. Final Analysis of a Trial of M72/AS01(E) Vaccine to Prevent Tuberculosis. N Engl J Med. 2019;381(25):2429-2439. PMID 31661198; doi:10.1056/NEJMoa1909953.", "link": "https://doi.org/10.1056/nejmoa1909953", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Takiff1994", "text": "Takiff HE, Salazar L, Guerrero C, Philipp W, Huang WM, Kreiswirth B, et al. Cloning and nucleotide sequence of Mycobacterium tuberculosis gyrA and gyrB genes and detection of quinolone resistance mutations. Antimicrob Agents Chemother. 1994;38(4):773-780. PMID 8031045; PMCID PMC284541; doi:10.1128/AAC.38.4.773.", "link": "https://doi.org/10.1128/aac.38.4.773", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Tameris2025", "text": "Tameris M, Rozot V, Imbratta C, Geldenhuys H, Mendelsohn SC, Kany Luabeya AK, et al. Safety, reactogenicity, and immunogenicity of MTBVAC in infants: a phase 2a randomised, double-blind, dose-defining trial in a TB endemic setting. EBioMedicine. 2025;114:105628. PMID 40101388; PMCID PMC12121429; doi:10.1016/j.ebiom.2025.105628.", "link": "https://doi.org/10.1016/j.ebiom.2025.105628", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tanimura2014", "text": "Tanimura T, Jaramillo E, Weil D, Raviglione M, Lönnroth K. Financial burden for tuberculosis patients in low- and middle-income countries: a systematic review. Eur Respir J. 2014;43(6):1763-75. PMID 24525439; PMCID PMC4040181; doi:10.1183/09031936.00193413.", "link": "https://doi.org/10.1183/09031936.00193413", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Taye2025", "text": "Taye B, Tesfaye H, Churiso G. FujiLAM assays for tuberculosis detection in people with HIV: a systematic review and meta-analysis. BMC Infect Dis. 2025;25(1):1710. PMID 41388257; PMCID PMC12699939; doi:10.1186/s12879-025-12055-2.", "link": "https://doi.org/10.1186/s12879-025-12055-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "TCCMadras1959", "text": "Tuberculosis Chemotherapy Centre, Madras. A concurrent comparison of home and sanatorium treatment of pulmonary tuberculosis in South India. Bull World Health Organ. 1959;21(1):51-144. PMID 20604054; PMCID PMC2537809.", "link": "https://pubmed.ncbi.nlm.nih.gov/20604054/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Telenti1993", "text": "Telenti A, Imboden P, Marchesi F, Lowrie D, Cole S, Colston MJ, et al. Detection of rifampicin-resistance mutations in Mycobacterium tuberculosis. Lancet. 1993;341(8846):647-650. PMID 8095569; doi:10.1016/0140-6736(93)90417-F.", "link": "https://doi.org/10.1016/0140-6736(93)90417-f", "areas": ["C", "D"], "unverified": false, "validated": "Europe PMC"}, {"key": "Telenti1997", "text": "Telenti A, Philipp WJ, Sreevatsan S, Bernasconi C, Stockbauer KE, Wieles B, et al. The emb operon, a gene cluster of Mycobacterium tuberculosis involved in resistance to ethambutol. Nat Med. 1997;3(5):567-570. PMID 9142129; doi:10.1038/nm0597-567.", "link": "https://doi.org/10.1038/nm0597-567", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Thao2018", "text": "Thao LTP, Heemskerk AD, Geskus RB, Mai NTH, Ha DTM, Chau TTH, et al. Prognostic Models for 9-Month Mortality in Tuberculous Meningitis. Clin Infect Dis. 2018;66(4):523-532. PMID 29029055; PMCID PMC5850565; doi:10.1093/cid/cix849.", "link": "https://doi.org/10.1093/cid/cix849", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Theron2014", "text": "Theron G, Zijenah L, Chanda D, Clowes P, Rachow A, Lesosky M, et al. Feasibility, accuracy, and clinical effect of point-of-care Xpert MTB/RIF testing for tuberculosis in primary-care settings in Africa: a multicentre, randomised, controlled trial. Lancet. 2014;383(9915):424-35. PMID 24176144; doi:10.1016/S0140-6736(13)62073-5.", "link": "https://doi.org/10.1016/s0140-6736(13)62073-5", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Thomas2019PLoSOne", "text": "Thomas BE, Thiruvengadam K, S R, Kadam D, Ovung S, Sivakumar S, et al. Smoking, alcohol use disorder and tuberculosis treatment outcomes: A dual co-morbidity burden that cannot be ignored. PLoS One. 2019;14(7):e0220507. PMID 31365583; PMCID PMC6668833; doi:10.1371/journal.pone.0220507.", "link": "https://doi.org/10.1371/journal.pone.0220507", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Thomas2020CID", "text": "Thomas BE, Kumar JV, Chiranjeevi M, Shah D, Khandewale A, Thiruvengadam K, et al. Evaluation of the Accuracy of 99DOTS, a Novel Cellphone-based Strategy for Monitoring Adherence to Tuberculosis Medications: Comparison of DigitalAdherence Data With Urine Isoniazid Testing. Clin Infect Dis. 2020;71(9):e513-e516. PMID 32221550; PMCID PMC7713673; doi:10.1093/cid/ciaa333.", "link": "https://doi.org/10.1093/cid/ciaa333", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Thwaites2002", "text": "Thwaites GE, Chau TT, Stepniewska K, Phu NH, Chuong LV, Sinh DX, et al. Diagnosis of adult tuberculous meningitis by use of clinical and laboratory features. Lancet. 2002;360(9342):1287-92. PMID 12414204; doi:10.1016/s0140-6736(02)11318-3.", "link": "https://doi.org/10.1016/s0140-6736(02)11318-3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Thwaites2004", "text": "Thwaites GE, Nguyen DB, Nguyen HD, Hoang TQ, Do TT, Nguyen TC, et al. Dexamethasone for the treatment of tuberculous meningitis in adolescents and adults. N Engl J Med. 2004;351(17):1741-51. PMID 15496623; doi:10.1056/NEJMoa040573.", "link": "https://doi.org/10.1056/nejmoa040573", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Tiemersma2011", "text": "Tiemersma EW, van der Werf MJ, Borgdorff MW, Williams BG, Nagelkerke NJ. Natural history of tuberculosis: duration and fatality of untreated pulmonary tuberculosis in HIV negative patients: a systematic review. PLoS One. 2011;6(4):e17601. PMID 21483732; PMCID PMC3070694; doi:10.1371/journal.pone.0017601.", "link": "https://doi.org/10.1371/journal.pone.0017601", "areas": ["B", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Tierney2022", "text": "Tierney DB, Orvis E, Nathavitharana RR, Hurwitz S, Tintaya K, Vargas D, et al. FAST tuberculosis transmission control strategy speeds the start of tuberculosis treatment at a general hospital in Lima, Peru. Infect Control Hosp Epidemiol. 2022;43(10):1459-1465. PMID 34612182; PMCID PMC8983787; doi:10.1017/ice.2021.422.", "link": "https://doi.org/10.1017/ice.2021.422", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Torok2011", "text": "Török ME, Yen NT, Chau TT, Mai NT, Phu NH, Mai PP, et al. Timing of initiation of antiretroviral therapy in human immunodeficiency virus (HIV)--associated tuberculous meningitis. Clin Infect Dis. 2011;52(11):1374-83. PMID 21596680; PMCID PMC4340579; doi:10.1093/cid/cir230.", "link": "https://doi.org/10.1093/cid/cir230", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Tostmann2008", "text": "Tostmann A, Boeree MJ, Aarnoutse RE, de Lange WC, van der Ven AJ, Dekhuijzen R. Antituberculosis drug-induced hepatotoxicity: concise up-to-date review. J Gastroenterol Hepatol. 2008;23(2):192-202. PMID 17995946; doi:10.1111/j.1440-1746.2007.05207.x.", "link": "https://doi.org/10.1111/j.1440-1746.2007.05207.x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Trunz2006", "text": "Trunz BB, Fine P, Dye C. Effect of BCG vaccination on childhood tuberculous meningitis and miliary tuberculosis worldwide: a meta-analysis and assessment of cost-effectiveness. Lancet. 2006;367(9517):1173-80. PMID 16616560; doi:10.1016/S0140-6736(06)68507-3.", "link": "https://doi.org/10.1016/s0140-6736(06)68507-3", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tubach2009", "text": "Tubach F, Salmon D, Ravaud P, Allanore Y, Goupille P, Bréban M, et al. Risk of tuberculosis is higher with anti-tumor necrosis factor monoclonal antibody therapy than with soluble tumor necrosis factor receptor therapy: the three-year prospective French Research Axed on Tolerance of Biotherapies registry. Arthritis Rheum. 2009;60(7):1884-94. PMID 19565495; PMCID PMC2921546; doi:10.1002/art.24632.", "link": "https://doi.org/10.1002/art.24632", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tufariello2003", "text": "Tufariello JM, Chan J, Flynn JL. Latent tuberculosis: mechanisms of host and bacillus that contribute to persistent infection. Lancet Infect Dis. 2003;3(9):578-590. PMID 12954564; doi:10.1016/S1473-3099(03)00741-2.", "link": "https://doi.org/10.1016/s1473-3099(03)00741-2", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Turkova2022", "text": "Turkova A, Wills GH, Wobudeya E, Chabala C, Palmer M, Kinikar A, et al. Shorter Treatment for Nonsevere Tuberculosis in African and Indian Children. N Engl J Med. 2022;386(10):911-922. PMID 35263517; PMCID PMC7612496; doi:10.1056/NEJMoa2104535.", "link": "https://doi.org/10.1056/nejmoa2104535", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Uden2017", "text": "Uden L, Barber E, Ford N, Cooke GS. Risk of Tuberculosis Infection and Disease for Health Care Workers: An Updated Meta-Analysis. Open Forum Infect Dis. 2017;4(3):ofx137. PMID 28875155; PMCID PMC5575844; doi:10.1093/ofid/ofx137.", "link": "https://doi.org/10.1093/ofid/ofx137", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Urbanowski2020", "text": "Urbanowski ME, Ordonez AA, Ruiz-Bedoya CA, Jain SK, Bishai WR. Cavitary tuberculosis: the gateway of disease transmission. Lancet Infect Dis. 2020;20(6):e117-e128. PMID 32482293; PMCID PMC7357333; doi:10.1016/S1473-3099(20)30148-1.", "link": "https://doi.org/10.1016/s1473-3099(20)30148-1", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Urdahl2011", "text": "Urdahl KB, Shafiani S, Ernst JD. Initiation and regulation of T-cell responses in tuberculosis. Mucosal Immunol. 2011;4(3):288-293. PMID 21451503; PMCID PMC3206635; doi:10.1038/mi.2011.10.", "link": "https://doi.org/10.1038/mi.2011.10", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "vanderWel2007", "text": "van der Wel N, Hava D, Houben D, Fluitsma D, van Zon M, Pierson J, et al. M. tuberculosis and M. leprae translocate from the phagolysosome to the cytosol in myeloid cells. Cell. 2007;129(7):1287-1298. PMID 17604718; doi:10.1016/j.cell.2007.05.059.", "link": "https://doi.org/10.1016/j.cell.2007.05.059", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "VanDeun2010", "text": "Van Deun A, Maug AK, Salim MA, Das PK, Sarker MR, Daru P, et al. Short, highly effective, and inexpensive standardized treatment of multidrug-resistant tuberculosis. Am J Respir Crit Care Med. 2010;182(5):684-92. PMID 20442432; doi:10.1164/rccm.201001-0077OC.", "link": "https://doi.org/10.1164/rccm.201001-0077oc", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "VanDeun2015", "text": "Van Deun A, Aung KJ, Hossain A, de Rijk P, Gumusboga M, Rigouts L, et al. Disputed rpoB mutations can frequently cause important rifampicin resistance among new tuberculosis patients. Int J Tuberc Lung Dis. 2015;19(2):185-90. PMID 25574917; doi:10.5588/ijtld.14.0651.", "link": "https://doi.org/10.5588/ijtld.14.0651", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "vanHoorn2016", "text": "van Hoorn R, Jaramillo E, Collins D, Gebhard A, van den Hof S. The Effects of Psycho-Emotional and Socio-Economic Support for Tuberculosis Patients on Treatment Adherence and Treatment Outcomes - A Systematic Review and Meta-Analysis. PLoS One. 2016;11(4):e0154095. PMID 27123848; PMCID PMC4849661; doi:10.1371/journal.pone.0154095.", "link": "https://doi.org/10.1371/journal.pone.0154095", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "vanIngen2012", "text": "van Ingen J, Rahim Z, Mulder A, Boeree MJ, Simeone R, Brosch R, et al. Characterization of Mycobacterium orygis as M. tuberculosis complex subspecies. Emerg Infect Dis. 2012;18(4):653-655. PMID 22469053; PMCID PMC3309669; doi:10.3201/eid1804.110888.", "link": "https://doi.org/10.3201/eid1804.110888", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Vanino2023", "text": "Vanino E, Granozzi B, Akkerman OW, Munoz-Torrico M, Palmieri F, Seaworth B, et al. Update of drug-resistant tuberculosis treatment guidelines: a turning point. Int J Infect Dis. 2023;130 Suppl 1:S12-S15. PMID 36918080; doi:10.1016/j.ijid.2023.03.013.", "link": "https://doi.org/10.1016/j.ijid.2023.03.013", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "vanRiet2026", "text": "van Riet E, Corleis B, Giersing BK, Hatherill M, Burhan E, Jassat W, et al. Accelerating research and development of new vaccines against tuberculosis: 5-year progress on the global roadmap. Lancet Infect Dis. 2026;26(7):e289-e301. PMID 41864213; doi:10.1016/S1473-3099(26)00019-8.", "link": "https://doi.org/10.1016/s1473-3099(26)00019-8", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "VantHoog2022", "text": "Van't Hoog A, Viney K, Biermann O, Yang B, Leeflang MM, Langendam MW. Symptom- and chest-radiography screening for active pulmonary tuberculosis in HIV-negative adults and adults with unknown HIV status. Cochrane Database Syst Rev. 2022;3(3):CD010890. PMID 35320584; PMCID PMC9109771; doi:10.1002/14651858.CD010890.pub2.", "link": "https://doi.org/10.1002/14651858.cd010890.pub2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Vashishtha2026", "text": "Vashishtha VM. BCG at 100: The Paradox of an Indispensable Vaccine. Indian Pediatr. 2026 (online ahead of print). PMID 42911367; doi:10.1007/s13312-026-00433-1.", "link": "https://doi.org/10.1007/s13312-026-00433-1", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Vasiliu2025", "text": "Vasiliu A, Cristea V, Stoycheva K, Rosales-Klintz S, Lange C, Zenner D, et al. Shifting tuberculosis dynamics in the EU/EEA: geographical and drug resistance trends among people of foreign origin, 2019 to 2023. Euro Surveill. 2025;30(11):2500173. PMID 40116035; PMCID PMC11927073; doi:10.2807/1560-7917.ES.2025.30.11.2500173.", "link": "https://doi.org/10.2807/1560-7917.es.2025.30.11.2500173", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Vega2021", "text": "Vega V, Rodríguez S, Van der Stuyft P, Seas C, Otero L. Recurrent TB: a systematic review and meta-analysis of the incidence rates and the proportions of relapses and reinfections. Thorax. 2021;76(5):494-502. PMID 33547088; PMCID PMC8225554; doi:10.1136/thoraxjnl-2020-215449.", "link": "https://doi.org/10.1136/thoraxjnl-2020-215449", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Velen2021", "text": "Velen K, Shingde RV, Ho J, Fox GJ. The effectiveness of contact investigation among contacts of tuberculosis patients: a systematic review and meta-analysis. Eur Respir J. 2021;58(6). PMID 34016621; doi:10.1183/13993003.00266-2021.", "link": "https://doi.org/10.1183/13993003.00266-2021", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Vergne2005", "text": "Vergne I, Chua J, Lee HH, Lucas M, Belisle J, Deretic V. Mechanism of phagolysosome biogenesis block by viable Mycobacterium tuberculosis. Proc Natl Acad Sci U S A. 2005;102(11):4033-4038. PMID 15753315; PMCID PMC554822; doi:10.1073/pnas.0409716102.", "link": "https://doi.org/10.1073/pnas.0409716102", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Verrall2014", "text": "Verrall AJ, Netea MG, Alisjahbana B, Hill PC, van Crevel R. Early clearance of Mycobacterium tuberculosis: a new frontier in prevention. Immunology. 2014;141(4):506-513. PMID 24754048; doi:10.1111/imm.12223.", "link": "https://doi.org/10.1111/imm.12223", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Verver2005", "text": "Verver S, Warren RM, Beyers N, Richardson M, van der Spuy GD, Borgdorff MW, et al. Rate of reinfection tuberculosis after successful treatment is higher than rate of new tuberculosis. Am J Respir Crit Care Med. 2005;171(12):1430-5. PMID 15831840; doi:10.1164/rccm.200409-1200OC.", "link": "https://doi.org/10.1164/rccm.200409-1200oc", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Via2008", "text": "Via LE, Lin PL, Ray SM, Carrillo J, Allen SS, Eum SY, et al. Tuberculous granulomas are hypoxic in guinea pigs, rabbits, and nonhuman primates. Infect Immun. 2008;76(6):2333-2340. PMID 18347040; PMCID PMC2423064; doi:10.1128/IAI.01515-07.", "link": "https://doi.org/10.1128/iai.01515-07", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Villarino2015", "text": "Villarino ME, Scott NA, Weis SE, Weiner M, Conde MB, Jones B, et al. Treatment for preventing tuberculosis in children and adolescents: a randomized clinical trial of a 3-month, 12-dose regimen of a combination of rifapentine and isoniazid. JAMA Pediatr. 2015;169(3):247-55. PMID 25580725; PMCID PMC6624831; doi:10.1001/jamapediatrics.2014.3158.", "link": "https://doi.org/10.1001/jamapediatrics.2014.3158", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Viney2021", "text": "Viney K, Linh NN, Gegia M, Zignol M, Glaziou P, Ismail N, et al. New definitions of pre-extensively and extensively drug-resistant tuberculosis: update from the World Health Organization. Eur Respir J. 2021;57(4):2100361. PMID 33833074; doi:10.1183/13993003.00361-2021.", "link": "https://doi.org/10.1183/13993003.00361-2021", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "VonGroote2019", "text": "von Groote-Bidlingmaier F, Patientia R, Sanchez E, Balanag V Jr, Ticona E, Segura P, et al. Efficacy and safety of delamanid in combination with an optimised background regimen for treatment of multidrug-resistant tuberculosis: a multicentre, randomised, double-blind, placebo-controlled, parallel group phase 3 trial. Lancet Respir Med. 2019;7(3):249-259. PMID 30630778; doi:10.1016/S2213-2600(18)30426-0.", "link": "https://doi.org/10.1016/s2213-2600(18)30426-0", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Vynnycky1999", "text": "Vynnycky E, Fine PE. Interpreting the decline in tuberculosis: the role of secular trends in effective contact. Int J Epidemiol. 1999;28(2):327-34. PMID 10342699; doi:10.1093/ije/28.2.327.", "link": "https://doi.org/10.1093/ije/28.2.327", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Vynnycky2000", "text": "Vynnycky E, Fine PE. Lifetime risks, incubation period, and serial interval of tuberculosis. Am J Epidemiol. 2000;152(3):247-263. PMID 10933272; doi:10.1093/aje/152.3.247.", "link": "https://doi.org/10.1093/aje/152.3.247", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Vynnycky2015Thibela", "text": "Vynnycky E, Sumner T, Fielding KL, Lewis JJ, Cox AP, Hayes RJ, et al. Tuberculosis control in South African gold mines: mathematical modeling of a trial of community-wide isoniazid preventive therapy. Am J Epidemiol. 2015;181(8):619-32. PMID 25792607; PMCID PMC4388015; doi:10.1093/aje/kwu320.", "link": "https://doi.org/10.1093/aje/kwu320", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Walker2022", "text": "Walker TM, Miotto P, Köser CU, Fowler PW, Knaggs J, Iqbal Z, et al. The 2021 WHO catalogue of Mycobacterium tuberculosis complex mutations associated with drug resistance: A genotypic analysis. Lancet Microbe. 2022;3(4):e265-e273. PMID 35373160; PMCID PMC7612554; doi:10.1016/S2666-5247(21)00301-3.", "link": "https://doi.org/10.1016/s2666-5247(21)00301-3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Wallgren1948", "text": "Wallgren A. The time-table of tuberculosis. Tubercle. 1948;29(11):245-251. PMID 18101320; doi:10.1016/S0041-3879(48)80033-4. No abstract or full text available; the Stockholm 1-2 year interval is quoted as reported in Behr2018.", "link": "https://doi.org/10.1016/s0041-3879(48)80033-4", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Wallis2021", "text": "Wallis RS, Ginindza S, Beattie T, Arjun N, Likoti M, Edward VA, et al. Adjunctive host-directed therapies for pulmonary tuberculosis: a prospective, open-label, phase 2, randomised controlled trial. Lancet Respir Med. 2021;9(8):897-908. PMID 33740465; PMCID PMC8332197; doi:10.1016/S2213-2600(20)30448-3.", "link": "https://doi.org/10.1016/s2213-2600(20)30448-3", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Wang2020IJTLD", "text": "Wang EY, Arrazola RA, Mathema B, Ahluwalia IB, Mase SR. The impact of smoking on tuberculosis treatment outcomes: a meta-analysis. Int J Tuberc Lung Dis. 2020;24(2):170-175. PMID 32127100; PMCID PMC7232866; doi:10.5588/ijtld.19.0002.", "link": "https://doi.org/10.5588/ijtld.19.0002", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Watson2015", "text": "Watson RO, Bell SL, MacDuff DA, Kimmey JM, Diner EJ, Olivas J, et al. The cytosolic sensor cGAS detects Mycobacterium tuberculosis DNA to induce type I interferons and activate autophagy. Cell Host Microbe. 2015;17(6):811-819. PMID 26048136; PMCID PMC4466081; doi:10.1016/j.chom.2015.05.004.", "link": "https://doi.org/10.1016/j.chom.2015.05.004", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Wayne1996", "text": "Wayne LG, Hayes LG. An in vitro model for sequential study of shiftdown of Mycobacterium tuberculosis through two stages of nonreplicating persistence. Infect Immun. 1996;64(6):2062-2069. PMID 8675308; PMCID PMC174037; doi:10.1128/iai.64.6.2062-2069.1996.", "link": "https://doi.org/10.1128/iai.64.6.2062-2069.1996", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Wells1948", "text": "Wells WF, Ratcliffe HL, Grumb C. On the mechanics of droplet nuclei infection; quantitative experimental air-borne tuberculosis in rabbits. Am J Hyg. 1948;47(1):11-28. PMID 18921435; doi:10.1093/oxfordjournals.aje.a119179. No abstract in PubMed or Europe PMC; cited only for what the study did.", "link": "https://doi.org/10.1093/oxfordjournals.aje.a119179", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "WHO-GTR2025", "text": "World Health Organization. Global tuberculosis report 2025. Geneva: World Health Organization; 2025. ISBN 9789240116924 (electronic version). WHO IRIS hdl:10665/383364. 2024 data; web chapters read on who.int. (validated: WHO IRIS)", "link": "https://iris.who.int/handle/10665/383364", "areas": ["A", "B", "D", "F", "H"], "unverified": false, "validated": "WHO IRIS"}, {"key": "WHO-IPC2019", "text": "World Health Organization. WHO guidelines on tuberculosis infection prevention and control: 2019 update. Geneva: World Health Organization; 2019. ISBN 9789241550512. NCBI Bookshelf NBK539297; PMID 30933444. Read from the WHO IRIS PDF (handle 10665/311259) via its Internet Archive copy.", "link": "https://pubmed.ncbi.nlm.nih.gov/30933444/", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "WHO-Mod1-2024", "text": "World Health Organization. WHO consolidated guidelines on tuberculosis: Module 1: prevention – tuberculosis preventive treatment, second edition. Geneva: World Health Organization; 2024. ISBN 9789240096196 (electronic). NCBI Bookshelf NBK607290; PMID 39298638.", "link": "https://pubmed.ncbi.nlm.nih.gov/39298638/", "areas": ["B", "D", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "WHO-Mod3-2022TBI", "text": "World Health Organization. WHO consolidated guidelines on tuberculosis: Module 3: Diagnosis – Tests for tuberculosis infection. Geneva: World Health Organization; 2022. PMID 36441853; NCBI Bookshelf NBK586676. TBST recommendation wording read from the BIGG recommendations database (bigg-rec.bvsalud.org).", "link": "https://pubmed.ncbi.nlm.nih.gov/36441853/", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "WHO-Mod3-2024", "text": "World Health Organization. WHO consolidated guidelines on tuberculosis: Module 3: Diagnosis – Rapid diagnostics for tuberculosis detection, third edition. Geneva: World Health Organization; 2024. PMID 38527162; NCBI Bookshelf NBK602005. Recommendation wording read from its Web Annex C, Evidence-to-decision tables (ISBN 978-92-4-009046-0), downloaded from tbksp.who.int.", "link": "https://pubmed.ncbi.nlm.nih.gov/38527162/", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "WHO-Mod4-2025", "text": "World Health Organization. WHO consolidated guidelines on tuberculosis: Module 4: treatment and care. Geneva: World Health Organization; 2025. ISBN 9789240107243 (electronic). NCBI Bookshelf NBK613092; PMID 40163610. Read from the WHO IRIS PDF.", "link": "https://pubmed.ncbi.nlm.nih.gov/40163610/", "areas": ["E", "F", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "WHO-Mod5-2022", "text": "World Health Organization. WHO consolidated guidelines on tuberculosis: Module 5: Management of tuberculosis in children and adolescents. Geneva: World Health Organization; 2022. PMID 35404556; NCBI Bookshelf NBK579387. Text read from WHO IRIS handles 10665/352522 (guidelines) and 10665/352523 (operational handbook).", "link": "https://pubmed.ncbi.nlm.nih.gov/35404556/", "areas": ["D", "F"], "unverified": false, "validated": "PubMed"}, {"key": "WHO-Mod6-2025", "text": "World Health Organization. WHO consolidated guidelines on tuberculosis: Module 6: Tuberculosis and comorbidities, second edition. Geneva: World Health Organization; 2025. ISBN 9789240111974. NCBI Bookshelf NBK619218; PMID 41264753. Undernutrition recommendation wording read from the WHO news release of 8 October 2025; guideline full text not read.", "link": "https://pubmed.ncbi.nlm.nih.gov/41264753/", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "WHO-MutCat3-2026", "text": "World Health Organization. Catalogue of mutations in Mycobacterium tuberculosis complex and their association with drug resistance, third edition. Geneva: World Health Organization; 2026 (published 30 Oct 2026). ISBN 978-92-4-012465-3 (electronic); https://www.who.int/publications/i/item/9789240124653. Validated: WHO publication page and PDF (p.13, Table 10 p.48), 2026-10-31.", "link": "https://www.who.int/publications/i/item/9789240124653", "areas": ["D"], "unverified": true}, {"key": "WHO2018BCG", "text": "World Health Organization. BCG vaccine: WHO position paper, February 2018 - Recommendations. Vaccine. 2018;36(24):3408-3410. PMID 29609965; doi:10.1016/j.vaccine.2018.03.009. Excerpted from Wkly Epidemiol Rec. 2018;93(8):73-96 (PMID 29474026).", "link": "https://doi.org/10.1016/j.vaccine.2018.03.009", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Wiktor1999", "text": "Wiktor SZ, Sassan-Morokro M, Grant AD, Abouya L, Karon JM, Maurice C, et al. Efficacy of trimethoprim-sulphamethoxazole prophylaxis to decrease morbidity and mortality in HIV-1-infected patients with tuberculosis in Abidjan, Côte d'Ivoire: a randomised controlled trial. Lancet. 1999;353(9163):1469-75. PMID 10232312; doi:10.1016/s0140-6736(99)03465-0.", "link": "https://doi.org/10.1016/s0140-6736(99)03465-0", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Wilkinson2017", "text": "Wilkinson RJ, Rohlwink U, Misra UK, van Crevel R, Mai NTH, Dooley KE, et al. Tuberculous meningitis. Nat Rev Neurol. 2017;13(10):581-598. PMID 28884751; doi:10.1038/nrneurol.2017.120.", "link": "https://doi.org/10.1038/nrneurol.2017.120", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Williams2024", "text": "Williams PM, Pratt RH, Walker WL, Price SF, Stewart RJ, Feng PI. Tuberculosis - United States, 2023. MMWR Morb Mortal Wkly Rep. 2024;73(12):265-270. PMID 38547024; PMCID PMC10986816; doi:10.15585/mmwr.mm7312a4.", "link": "https://doi.org/10.15585/mmwr.mm7312a4", "areas": ["A", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Williams2024MMWR"]}, {"key": "Wingfield2017", "text": "Wingfield T, Tovar MA, Huff D, Boccia D, Montoya R, Ramos E, et al. A randomized controlled study of socioeconomic support to enhance tuberculosis prevention and treatment, Peru. Bull World Health Organ. 2017;95(4):270-280. PMID 28479622; PMCID PMC5407248; doi:10.2471/BLT.16.170167.", "link": "https://doi.org/10.2471/blt.16.170167", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Wolf2008", "text": "Wolf AJ, Desvignes L, Linas B, Banaiee N, Tamura T, Takatsu K, et al. Initiation of the adaptive immune response to Mycobacterium tuberculosis depends on antigen production in the local lymph node, not the lungs. J Exp Med. 2008;205(1):105-115. PMID 18158321; PMCID PMC2234384; doi:10.1084/jem.20071367.", "link": "https://doi.org/10.1084/jem.20071367", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Yee2003", "text": "Yee D, Valiquette C, Pelletier M, Parisien I, Rocher I, Menzies D. Incidence of serious side effects from first-line antituberculosis drugs among patients treated for active tuberculosis. Am J Respir Crit Care Med. 2003;167(11):1472-7. PMID 12569078; doi:10.1164/rccm.200206-626OC.", "link": "https://doi.org/10.1164/rccm.200206-626oc", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Yerlikaya2026", "text": "Yerlikaya S, Chirwa M, Ajide B, Castro MDM, Ha H, Kato-Maeda M, et al. Pulmonary Tuberculosis Detection with MiniDock MTB Using Swab Samples. N Engl J Med. 2026;394(17):1710-1722. PMID 42054680; PMCID PMC13132025; doi:10.1056/NEJMoa2509761.", "link": "https://doi.org/10.1056/nejmoa2509761", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Yoon2017", "text": "Yoon C, Semitala FC, Atuhumuza E, Katende J, Mwebe S, Asege L, et al. Point-of-care C-reactive protein-based tuberculosis screening for people living with HIV: a diagnostic accuracy study. Lancet Infect Dis. 2017;17(12):1285-1292. PMID 28847636; PMCID PMC5705273; doi:10.1016/S1473-3099(17)30488-7.", "link": "https://doi.org/10.1016/s1473-3099(17)30488-7", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Yoshioka1998", "text": "Yoshioka A. Use of randomisation in the Medical Research Council's clinical trial of streptomycin in pulmonary tuberculosis in the 1940s. BMJ. 1998;317(7167):1220-3. PMID 9794865; PMCID PMC1114162; doi:10.1136/bmj.317.7167.1220.", "link": "https://doi.org/10.1136/bmj.317.7167.1220", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Yulanda2026", "text": "Yulanda NA, Arifin H, Ligita T, Makmuriana L, Syahri A, Susanti S, et al. Nurse-led interventions in enhancing outcomes for patients with tuberculosis: a scoping review. J Res Nurs. 2026:17449871261421174 (online ahead of print). PMID 41929615; PMCID PMC13038489; doi:10.1177/17449871261421174.", "link": "https://doi.org/10.1177/17449871261421174", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Zachariah2012", "text": "Zachariah R, Harries AD, Srinath S, Ram S, Viney K, Singogo E, et al. Language in tuberculosis services: can we change to patient-centred terminology and stop the paradigm of blaming the patients? Int J Tuberc Lung Dis. 2012;16(6):714-7. PMID 22613683; doi:10.5588/ijtld.11.0635.", "link": "https://doi.org/10.5588/ijtld.11.0635", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Zak2016", "text": "Zak DE, Penn-Nicholson A, Scriba TJ, Thompson E, Suliman S, Amon LM, et al. A blood RNA signature for tuberculosis disease risk: a prospective cohort study. Lancet. 2016;387(10035):2312-2322. PMID 27017310; PMCID PMC5392204; doi:10.1016/S0140-6736(15)01316-1.", "link": "https://doi.org/10.1016/s0140-6736(15)01316-1", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Zenner2012", "text": "Zenner D, Kruijshaar ME, Andrews N, Abubakar I. Risk of tuberculosis in pregnancy: a national, primary care-based cohort and self-controlled case series study. Am J Respir Crit Care Med. 2012;185(7):779-84. PMID 22161161; doi:10.1164/rccm.201106-1083OC.", "link": "https://doi.org/10.1164/rccm.201106-1083oc", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Zenner2017", "text": "Zenner D, Beer N, Harris RJ, Lipman MC, Stagg HR, van der Werf MJ. Treatment of Latent Tuberculosis Infection: An Updated Network Meta-analysis. Ann Intern Med. 2017;167(4):248-255. PMID 28761946; doi:10.7326/M17-0609.", "link": "https://doi.org/10.7326/m17-0609", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Zenner2027", "text": "Zenner D, Hui DS, Sahu S, Ditiu L, Yeboah-Manu D, Ntoumi F, et al. State of the global tuberculosis epidemic: burden, progress towards WHO End TB Strategy targets and systemic challenges. Lancet Microbe. 2027:101433 (online 26 April 2026). PMID 42526488; doi:10.1016/j.lanmic.2026.101433.", "link": "https://doi.org/10.1016/j.lanmic.2026.101433", "areas": ["B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Zhang1992", "text": "Zhang Y, Heym B, Allen B, Young D, Cole S. The catalase-peroxidase gene and isoniazid resistance of Mycobacterium tuberculosis. Nature. 1992;358(6387):591-593. PMID 1501713; doi:10.1038/358591a0.", "link": "https://doi.org/10.1038/358591a0", "areas": ["C", "D", "E"], "unverified": false, "validated": "Europe PMC", "aliases": ["Zhang1992katG"]}, {"key": "Zhang2003PZA", "text": "Zhang Y, Mitchison D. The curious characteristics of pyrazinamide: a review. Int J Tuberc Lung Dis. 2003;7(1):6-21. PMID 12701830.", "link": "https://pubmed.ncbi.nlm.nih.gov/12701830/", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Zhang2023QFT", "text": "Zhang Y, Zhou G, Shi W, Shi W, Hu M, Kong D, et al. Comparing the diagnostic performance of QuantiFERON-TB Gold Plus with QFT-GIT, T-SPOT.TB and TST: a systematic review and meta-analysis. BMC Infect Dis. 2023;23(1):40. PMID 36670347; PMCID PMC9862551; doi:10.1186/s12879-023-08008-2.", "link": "https://doi.org/10.1186/s12879-023-08008-2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zifodya2021", "text": "Zifodya JS, Kreniske JS, Schiller I, Kohli M, Dendukuri N, Schumacher SG, et al. Xpert Ultra versus Xpert MTB/RIF for pulmonary tuberculosis and rifampicin resistance in adults with presumptive pulmonary tuberculosis. Cochrane Database Syst Rev. 2021;2(2):CD009593. PMID 33616229; PMCID PMC12045032; doi:10.1002/14651858.CD009593.pub5.", "link": "https://doi.org/10.1002/14651858.cd009593.pub5", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zink2003", "text": "Zink AR, Sola C, Reischl U, Grabner W, Rastogi N, Wolf H, et al. Characterization of Mycobacterium tuberculosis complex DNAs from Egyptian mummies by spoligotyping. J Clin Microbiol. 2003;41(1):359-67. PMID 12517873; PMCID PMC149558; doi:10.1128/JCM.41.1.359-367.2003.", "link": "https://doi.org/10.1128/jcm.41.1.359-367.2003", "areas": ["A"], "unverified": false, "validated": "PubMed"}];

/* =============== home: from a shared breath to a granuloma, contained or breaking down =============== */
/* Fact-free until the research passes land: the epidemiology builder may add a cited sentence to HERO_CAP. */
const HERO_CAP=['Schematic, not to scale; the timing is illustrative. About a quarter of the world is estimated to have TB infection, and most never develop TB disease. <sup class="c" data-ref="Houben2016,Cohen2019ERJ,Drain2018" title="Source 78,142,239">78,142,239</sup> Press Weakened immunity to see the other ending.','Schematic, not to scale; the timing is illustrative. This ending shows a granuloma breaking down.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),ab=$('#heroAlt'),cap=$('#heroCap');let weak=false;
  /* the story runs t 0..1: exposure (0-.28), bacteria reach an air sac (.24-.42), a macrophage swallows them
     (.36-.52), a granuloma organises (.5-.8), then held in check or breaking down (.8-1). Timing is schematic. */
  const DROPS=Array.from({length:16},(_,i)=>{const r=rng(40+i);return{d:r()*.12,dy:(r()-.5)*36,w:r()*Math.PI*2,bac:i%4===1,r:2.6+r()*2.2}});
  function draw(t){const N=vb(svg,'520 300','400 400');let s=`<defs>${marker('heroArr','var(--muted)')}</defs>`;
    /* layout: two people (air) and a zoomed panel (lung) */
    const L=N?{ax:110,bx:290,py:56,ps:84,zx:20,zy:172,zw:360,zh:178,ry:386}:{ax:52,bx:196,py:112,ps:92,zx:256,zy:58,zw:250,zh:198,ry:286};
    const cx=L.zx+L.zw/2,cy=L.zy+L.zh/2+(N?8:10),R=Math.min(L.zw,L.zh)*.42;
    /* stage labels */
    const ph=t<.24?0:t<.36?1:t<.5?2:t<.8?3:4;
    const TT=['Breathing shared air','Bacteria reach an air sac','A macrophage swallows them','A granuloma walls them off',weak?'Breaking down: TB disease':'Held in check: TB infection'];
    const ST=['A person with TB disease in the lungs coughs','Tiny droplets carry a few rods deep into the lung','The bacteria survive inside it and multiply','Immune cells build a wall around them',weak?'The centre liquefies and opens into an airway':'The bacteria are held in check'];
    const col=ph<4?'var(--ink)':weak?'var(--tb)':'var(--good)';
    s+=`<text x="${N?20:18}" y="${N?26:24}" class="t-big" style="fill:${col}">${TT[ph]}</text><text x="${N?20:18}" y="${N?44:42}" class="t-sm">${ST[ph]}</text>`;
    /* people */
    const by=L.py,bs=L.ps,mouthA=[L.ax+bs*.2,by+bs*.2],noseB=[L.bx-bs*.16,by+bs*.2];
    const coughing=t<.26;
    s+=person(L.ax,by,bs,'var(--brand)',{cough:coughing&&Math.sin(t*90)>-.2,face:1});
    const sick=weak&&t>.88;
    s+=person(L.bx,by,bs,'var(--muted)',{cough:sick,face:-1});
    s+=`<text x="${L.ax}" y="${by+bs+16}" class="t-xs t-mid">has TB disease</text><text x="${L.bx}" y="${by+bs+16}" class="t-xs t-mid">${t<.24?'breathes in':ph<4?'TB infection':weak?'now TB disease':'TB infection'}</text>`;
    /* droplets drift across */
    DROPS.forEach(d=>{const k=ramp(t,d.d,d.d+.16);if(k<=0||k>=1)return;
      const px=lerp(mouthA[0],noseB[0],k),py=lerp(mouthA[1],noseB[1],k)+Math.sin(k*Math.PI)*d.dy+Math.sin(k*8+d.w)*3;
      s+=droplet(px,py,d.r,{bac:d.bac,op:1-ramp(k,.85,1)})});
    /* zoom ring at person B's chest, with guide lines to the panel */
    const zr=[L.bx+(N?0:2),by+bs*.66];
    s+=`<circle cx="${zr[0]}" cy="${f1(zr[1])}" r="9" style="fill:none;stroke:var(--brand);stroke-width:1.6"/>`;
    s+=N?`<path d="M${zr[0]-4} ${by+bs+22}L${L.zx+L.zw-150} ${L.zy}M${zr[0]+4} ${by+bs+22}L${L.zx+L.zw-24} ${L.zy}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`
         :`<path d="M${zr[0]+6} ${f1(zr[1]-7)}L${L.zx} ${L.zy+20}M${zr[0]+6} ${f1(zr[1]+7)}L${L.zx} ${f1(L.zy+L.zh*.55)}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`;
    s+=`<rect x="${L.zx}" y="${L.zy}" width="${L.zw}" height="${L.zh}" rx="14" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${L.zx+12}" y="${L.zy+18}" class="t-xs">Inside the lung, magnified</text>`;
    /* the air sac fades back as the granuloma grows */
    const gk=ramp(t,.5,.8),al=alveolus(cx,cy,R*.95);
    s+=`<g style="opacity:${f1(1-.6*gk)}">${al.svg}</g>`;
    const sac=al.sacs[1],tx=sac[0],ty=sac[1];
    /* one droplet arrives in the sac and releases three rods */
    const ar=ramp(t,.24,.34);
    if(ar>0&&ar<1)s+=droplet(lerp(cx-R*.2,tx,ar),lerp(L.zy+16,ty,ar),5,{bac:true});
    const mk=ramp(t,.36,.46),inside=t>=.44;
    if(t>=.34&&t<.5&&!inside)s+=clump(tx,ty,3,R*.16,{len:R*.12,seed:8});
    /* the macrophage crawls to the rods, engulfs them; they multiply inside */
    if(t>=.3&&t<.66){const mx=lerp(tx+R*.5,tx,mk),my=lerp(ty+R*.4,ty,mk),n=inside?Math.round(3+ramp(t,.44,.52)*5):0;
      s+=macrophage(mx,my,R*.3,{bac:n,seed:6,op:1-ramp(t,.55,.66)})}
    /* granuloma, then held in check (calcifies) or breaking down (cavity, rods escape up the airway) */
    if(gk>0){const end=ramp(t,.82,1);
      const st=weak?lerp(gk*.82,1,end):gk*.82;
      s+=`<g style="opacity:${f1(ramp(t,.5,.6))}">`+granuloma(cx,cy+(N?6:4),R*.92,st,{calc:weak?0:end,loose:weak?end*.35:0,bac:weak?0:undefined})+'</g>';
      if(weak&&end>.25){const q=rng(77);for(let i=0;i<10;i++){const k=clamp((end-.25)/.75-q()*.3),ex=cx+(q()-.5)*R*.3,ey=lerp(cy,L.zy+8,k);if(k>0)s+=bacillus(ex+(q()-.5)*R*.4*k,ey,R*.1,q()*180)}}}
    /* a ruler of the story */
    const rx0=N?20:18,rw=N?360:484,ry=L.ry;
    s+=`<line x1="${rx0}" x2="${rx0+rw}" y1="${ry}" y2="${ry}" class="axis"/>`;
    const TK=[[0,'exposure'],[.3,'infection'],[.62,'granuloma'],[1,weak?'disease':'contained']];
    TK.forEach(([u,l],i)=>{const xx=rx0+rw*u;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${ry-4}" y2="${ry+4}" class="axis"/><text x="${f1(xx)}" y="${ry-8}" class="t-xs ${i===0?'':i===TK.length-1?'t-end':'t-mid'}">${l}</text>`});
    s+=`<circle cx="${f1(rx0+rw*t)}" cy="${ry}" r="5" style="fill:${weak&&t>.8?'var(--tb)':'var(--brand)'}"/>`;
    svg.innerHTML=s}
  ab.addEventListener('click',()=>{weak=!weak;ab.setAttribute('aria-pressed',weak);cap.innerHTML=weak?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  cap.innerHTML=HERO_CAP[0];
  playWire(rg,$('#heroPlay'),draw,11000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 What TB is =============== */
const WH_STEPS=[
 {from:0,at:.16,k:'Scene 1 · 2024',t:'Fell ill, found, died',
  txt:`In 2024 an estimated 10.7 million people (95% UI 9.9–11.5 million) fell ill with TB, 131 per 100,000 people. 8.3 million were diagnosed and notified: 78% of the estimate. The gap of about 2.4 million people who were not diagnosed or not reported was down from 2.6 million in 2023, and from 4.5 million in 2020. About 1.23 million people died: 1.08 million HIV-negative people and 150,000 people with HIV. WHO counts TB deaths in people with HIV as HIV deaths, which is why some totals leave out the 150,000. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`,
  pt:`About 11 million people get sick with TB each year, and about 1 in 5 of them are never found or reported. Finding people early helps them and protects their families.`,
  hook:`2024: 10.7 million ill (131/100,000), 8.3 million notified (78%), 1.23 million deaths including 150,000 people with HIV.`},
 {from:.25,at:.4,k:'Scene 2 · WHO regions',t:'Where TB occurs',
  txt:`By WHO region, new cases in 2024 were 34% South-East Asia, 27% Western Pacific, 25% Africa, 8.6% Eastern Mediterranean, 3.3% the Americas and 1.9% Europe. In WHO's grouping Indonesia is in the Western Pacific. The rate per 100,000 is highest in Africa. HIV-negative TB deaths were 40% in South-East Asia and 29% in Africa, and most deaths of people with HIV were in Africa (108,000 of 150,000). <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`,
  pt:`Most people who get TB live in Asia and Africa. In Africa, many of the people who die of TB also have HIV.`,
  hook:`Cases: SEA 34% > W Pacific 27% > Africa 25%. Highest rate: Africa (about 207/100,000, database sum).`},
 {from:.5,at:.66,k:'Scene 3 · countries',t:'Eight countries, two-thirds of cases',
  txt:`Eight countries had 67% of the world's cases in 2024: India 25%, Indonesia 10%, the Philippines 6.8%, China 6.5%, Pakistan 6.3%, Nigeria 4.8%, the Democratic Republic of the Congo 3.9% and Bangladesh 3.6%. The top five had 55%, and the 30 high TB burden countries 87%. Ten countries also had 63% of the global gap between estimated and notified cases. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`,
  pt:`A handful of countries carry most of the world's TB. Progress there decides whether TB falls worldwide.`,
  hook:`Two-thirds of cases in 8 countries; India alone 25%. 30 high-burden countries = 87%.`},
 {from:.74,at:1,k:'Scene 4 · 2000–2024',t:'25 years, the COVID-19 dip and End TB',
  txt:`Progress has been slow: about 11.6 million cases (188 per 100,000) in 2000 against about 10.6 million (130 per 100,000) in 2024, and deaths from about 2.9 million to 1.2 million (database sums). Notifications fell from 7.1 million in 2019 to 5.8 million in 2020 as COVID-19 disrupted services, and WHO assumes the missed diagnoses raised transmission and incidence in 2021–2023. Against 2015, the incidence rate was down a net 12.3% and deaths 29% by 2024, far from the End TB milestones of 50% and 75% for 2025. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup> The targets were endorsed by all WHO Member States in 2014. <sup class="c" data-ref="Floyd2018" title="Source 178">178</sup>`,
  pt:`TB is falling, but far too slowly. When COVID-19 closed clinics in 2020, fewer people were diagnosed, and more people fell ill in the years after.`,
  hook:`End TB by 2024: incidence −12.3% and deaths −29% vs 2015, against 2025 milestones of −50% and −75%. Notifications 7.1 → 5.8 million (2019 → 2020).`}
];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');let meas='ill',pop='all',setSt=()=>{};
  const REG=[{n:'South-East Asia',c:34,r:194,d:433,dh:13,ds:40},{n:'Western Pacific',c:27,r:131,d:211,dh:17,ds:19},{n:'Africa',c:25,r:207,d:315,dh:108,ds:29},
    {n:'Eastern Mediterranean',c:8.6,r:112,d:85,dh:1.3,ds:7.9},{n:'Americas',c:3.3,r:34,d:22,dh:7.8,ds:2.1},{n:'Europe',c:1.9,r:22,d:15,dh:3.8,ds:1.4}];
  /* squares are rounded shares (largest remainder) so the 8 countries fill 67 of 100 */
  const CT=[['India',25,25,'var(--tb)'],['Indonesia',10,10,'var(--brand)'],['Philippines',6.8,7,'var(--accent)'],['China',6.5,6,'var(--rx)'],
    ['Pakistan',6.3,6,'var(--vax)'],['Nigeria',4.8,5,'var(--gold)'],['DR Congo',3.9,4,'var(--dH)'],['Bangladesh',3.6,4,'var(--dE)']];
  const INC=[[2000,11.57],[2005,12.05],[2010,11.67],[2015,11.02],[2019,10.31],[2020,10.17],[2021,10.32],[2022,10.6],[2023,10.65],[2024,10.55]];
  const NOT=[[2000,3.75],[2005,5.15],[2010,5.79],[2015,6.16],[2019,7.1],[2020,5.8],[2021,6.4],[2022,7.49],[2023,8.2],[2024,8.3]];
  const DN=[[2000,2.07],[2010,1.49],[2015,1.32],[2019,1.15],[2021,1.2],[2024,1.05]];
  const DH=[[2000,.878],[2010,.619],[2015,.411],[2019,.247],[2024,.149]];
  const fmtM=v=>v>=1?f1(v)+' million':Math.round(v*1000).toLocaleString('en')+',000';
  const fmtK=v=>v>=1000?f1(v/1000)+' million':(v>=10?Math.round(v):f1(v))+(v<1000?',000':'');
  /* rows for scene 1, by toggle */
  function cascade(){
    if(pop==='hiv')return{t:'TB and HIV, 2024',s:'People with HIV who fell ill with TB, and who died',max:.619,rows:[
      {l:'Fell ill with TB',v:.619,c:'var(--tb)',val:'about 619,000 · 5.8% of all cases',hi:meas==='ill'},
      {l:'Died of TB',v:.15,c:'var(--bad)',val:'150,000 (95% UI 120,000–183,000)',hi:meas==='deaths'}],
      pct:[{l:'On ART, of those notified and known to have HIV',s:'On ART: notified, known HIV',p:91,c:'var(--rx)'},{l:'On ART, of everyone estimated to have HIV and TB',s:'On ART: all estimated',p:61,c:'var(--warn)'},{l:'Treatment success, people with HIV (2023 cohort)',s:'Treatment success (2023)',p:79,c:'var(--good)'}]};
    if(meas==='deaths')return{t:'Who died of TB, 2024',s:'1.23 million deaths, by group',max:1.23,rows:[
      {l:'All TB deaths',v:1.08,v2:.15,c:'var(--bad)',val:'1.23 million · 1.08 HIV-negative + 0.15 with HIV',hi:true},
      {l:'Adult men',v:.614,c:'var(--bad)',val:'614,000'},{l:'Adult women',v:.442,c:'var(--bad)',val:'442,000'},{l:'Children under 15',v:.174,c:'var(--bad)',val:'174,000'}],
      pct:[{l:'Case fatality: share of everyone who fell ill who died',s:'Case fatality, all who fell ill',p:11.5,c:'var(--bad)'}]};
    return{t:'A year of TB worldwide, 2024',s:'Estimated people who fell ill, were notified, and died',max:10.7,rows:[
      {l:'Fell ill with TB',v:10.7,c:'var(--tb)',val:'10.7 million · 131 per 100,000',hi:true},
      {l:'Diagnosed and notified',v:8.3,gap:2.4,c:'var(--accent)',val:'8.3 million · 78%'},
      {l:'Died of TB',v:1.08,v2:.15,c:'var(--bad)',val:'1.23 million'}],
      pct:[{l:'Treatment success, drug-susceptible TB (2023 cohort)',s:'Treatment success, 2023 cohort',p:88,c:'var(--good)'}]};
  }
  function bars(L,k,N){const C=cascade();let s=hdr(C.t,C.s,N),y=L.y0;const W=L.w,x0=L.x0;
    C.rows.forEach((r,i)=>{const g=ease(ramp(k,i*.16,i*.16+.4));const w=W*r.v/C.max*g,w2=r.v2?W*r.v2/C.max*g:0;
      s+=`<text x="${x0}" y="${y}" class="t-lbl" style="${r.hi?'':'font-weight:500'}">${r.l}</text><text x="${x0+W}" y="${N?y+44:y}" class="t-sm t-end" style="fill:var(--ink)">${g>.05?r.val:''}</text>`;
      s+=`<rect x="${x0}" y="${y+6}" width="${W}" height="22" rx="4" style="fill:var(--panel-2)"/>`;
      if(w>0)s+=`<rect x="${x0}" y="${y+6}" width="${f1(w)}" height="22" rx="4" style="fill:${r.c};opacity:${r.hi||!N?.95:.85}"/>`;
      if(w2>0)s+=`<rect x="${f1(x0+w)}" y="${y+6}" width="${f1(w2)}" height="22" style="fill:${r.c};opacity:.45"/><text x="${f1(x0+w+w2+4)}" y="${y+21}" class="t-xs">${pop==='hiv'?'':'with HIV'}</text>`;
      if(r.gap){const gk=ease(ramp(k,.42,.7)),gw=W*r.gap/C.max*gk;
        if(gw>0){s+=`<rect x="${f1(x0+w)}" y="${y+6}" width="${f1(gw)}" height="22" style="fill:url(#whHatch);stroke:var(--tb);stroke-width:1;stroke-dasharray:3 2"/>`;
          if(gk>.6)s+=`<text x="${N?x0:f1(x0+W)}" y="${y+46}" class="t-sm ${N?'':'t-end'}" style="fill:var(--tb)">${N?'2.4 million missing':'2.4 million missing: not diagnosed or not reported'}</text>`}}
      y+=(r.gap?76:62)+(N?14:0)});
    y+=6;s+=`<line x1="${x0}" x2="${x0+W}" y1="${y-14}" y2="${y-14}" class="grid"/>`;
    C.pct.forEach((p,i)=>{const g=ease(ramp(k,.55+i*.1,.85+i*.05));
      const pv=(g>.05?f1(p.p*g).replace('.0',''):'0')+'%';
      s+=`<text x="${x0}" y="${y}" class="t-sm" style="fill:var(--ink)">${N?p.s||p.l:p.l}</text><text x="${x0+W}" y="${N?y+34:y}" class="t-lbl t-end" style="fill:${p.c}">${pv}</text>`;
      s+=`<rect x="${x0}" y="${y+6}" width="${W}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y+6}" width="${f1(W*p.p/100*g)}" height="10" rx="5" style="fill:${p.c}"/>`;
      y+=N?58:48});
    return s}
  function hdr(t,sub,N){return `<text x="${N?20:30}" y="30" class="t-big">${t}</text><text x="${N?20:30}" y="48" class="t-sm">${sub}</text>`}
  function regions(L,k,N){const dh=pop==='hiv',dd=meas==='deaths'||dh;
    const T=dh?'TB deaths of people with HIV, by WHO region':dd?'HIV-negative TB deaths, by WHO region':'New TB cases, by WHO region';
    const S=dh?'2024, thousands of deaths (no regional split of cases in people with HIV here)':dd?'2024, share of 1.08 million deaths':'2024, share of 10.7 million cases · rate per 100,000';
    let s=hdr(T,N&&!dh?(dd?'2024, share of HIV-negative deaths':'2024, share of cases · rate per 100,000'):N?'2024, thousands of deaths':S,N);
    const vals=REG.map(r=>dh?r.dh:dd?r.ds:r.c),mx=dh?120:dd?48:40;
    REG.forEach((r,i)=>{const g=ease(ramp(k,i*.08,i*.08+.45)),v=vals[i];
      const y=N?L.y0+i*72:L.y0+i*46,lx=N?L.x0:L.x0,bx=N?L.x0:L.x0+170,bw=N?L.w-70:L.w-260,w=bw*v/mx*g;
      s+=`<text x="${lx}" y="${N?y:y+16}" class="t-lbl">${r.n}</text>`;
      const by=N?y+8:y;
      s+=`<rect x="${bx}" y="${by}" width="${f1(w)}" height="22" rx="4" style="fill:${dd?'var(--bad)':'var(--tb)'};opacity:${f1(.55+.4*v/mx)}"/>`;
      s+=`<text x="${f1(bx+w+6)}" y="${by+16}" class="t-lbl">${g>.05?(dh?fmtK(v*g):f1(v*g).replace('.0','')+'%'):''}</text>`;
      if(!dd&&g>.6){const rx=N?L.x0+L.w:L.x0+L.w;s+=`<text x="${rx}" y="${by+16}" class="t-sm t-end">${r.r}/100k</text>`}
      if(dd&&!dh&&g>.6){s+=`<text x="${N?L.x0+L.w:L.x0+L.w}" y="${by+16}" class="t-sm t-end">${r.d}k · HIV ${r.dh}k</text>`}});
    if(!dd)s+=`<text x="${L.x0+L.w}" y="${N?L.y0-20:L.y0-14}" class="t-xs t-end">rate (database sum)</text>`;
    return s}
  function countries(L,k,N){let s=hdr('Eight countries, two-thirds of cases',N?'2024 · each square ≈ 1% of cases':'2024 · each square ≈ 1% of the world\'s new cases (rounded)',N);
    const cols=10,sz=N?27:24,gp=N?3:3,gx=L.gx,gy=L.gy,nf=Math.floor(ease(k)*100.5);
    const own=[];CT.forEach((c,ci)=>{for(let j=0;j<c[2];j++)own.push(ci)});
    for(let i=0;i<100;i++){const x=gx+(i%cols)*(sz+gp),y=gy+Math.floor(i/cols)*(sz+gp);let f='var(--panel-2)',st='var(--line)',op=1;
      if(i<nf){if(i<67)f=CT[own[i]][3];else if(i<87){f='var(--tb-soft)';st='var(--tb)'}else{f='var(--panel-2)'}}
      else op=.5;
      s+=`<rect x="${x}" y="${y}" width="${sz}" height="${sz}" rx="3" style="fill:${f};stroke:${st};stroke-width:${i>=67&&i<87&&i<nf?1.2:.8};opacity:${op}"/>`}
    let acc=0;const lx=L.lx,ly=L.ly;
    CT.forEach((c,i)=>{acc+=c[2];const on=nf>=acc-c[2]+1;const px=N?lx+(i%2)*180:lx,py=N?ly+Math.floor(i/2)*24:ly+i*25;
      s+=`<g style="opacity:${on?1:.3}"><rect x="${px}" y="${py-11}" width="13" height="13" rx="2" style="fill:${c[3]}"/><text x="${px+20}" y="${py}" class="t-lbl" style="font-weight:${on?700:500}">${c[0]}</text><text x="${px+(N?160:200)}" y="${py}" class="t-sm t-end" style="fill:var(--ink)">${c[1]}%</text></g>`});
    const py2=N?ly+4*24+8:ly+8*25+6;
    s+=`<g style="opacity:${nf>67?1:.3}"><rect x="${lx}" y="${py2-11}" width="13" height="13" rx="2" style="fill:var(--tb-soft);stroke:var(--tb)"/><text x="${lx+20}" y="${py2}" class="t-sm" style="fill:var(--ink)">22 other high-burden countries: 30 together = 87%</text></g>`;
    s+=`<g style="opacity:${nf>87?1:.3}"><rect x="${lx}" y="${py2+14}" width="13" height="13" rx="2" style="fill:var(--panel-2);stroke:var(--line)"/><text x="${lx+20}" y="${py2+25}" class="t-sm" style="fill:var(--ink)">rest of the world: 13%</text></g>`;
    const tot=Math.min(67,nf);s+=`<text x="${lx}" y="${py2+60}" class="t-big" style="fill:var(--tb)">${tot}%</text><text x="${lx+50}" y="${py2+60}" class="t-sm">of cases in the 8 countries so far</text>`;
    return s}
  function trends(L,k,N){const dh=pop==='hiv',dd=meas==='deaths'||dh;
    let s=hdr(dh?'TB deaths of people with HIV, 2000–2024':dd?'TB deaths, 2000–2024':'Cases and notifications, 2000–2024',N?'millions · WHO database sums':'millions · WHO database country sums (2019–21, 2023–24 notifications: report)',N);
    const Y=lerp(2000,2024,ease(ramp(k,0,.62))),x0=L.cx0,x1=L.cx1,y0=L.cy0,y1=L.cy1,ymax=dd?(dh?1:2.5):13;
    const X=yr=>lerp(x0,x1,(yr-2000)/24),V=v=>lerp(y1,y0,v/ymax);
    const ticks=dd?(dh?[0,.25,.5,.75,1]:[0,.5,1,1.5,2,2.5]):[0,2,4,6,8,10,12];
    ticks.forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}</text>`);
    [2000,2005,2010,2015,2020,2024].forEach(yr=>s+=`<text x="${f1(X(yr))}" y="${y1+15}" class="t-xs t-mid">${yr}</text>`);
    /* the 2015 End TB baseline and the COVID-19 year */
    s+=`<line x1="${f1(X(2015))}" x2="${f1(X(2015))}" y1="${y0}" y2="${y1}" style="stroke:var(--vax);stroke-dasharray:4 3;opacity:.8"/><text x="${f1(X(2015)-4)}" y="${y0+10}" class="t-xs t-end" style="fill:var(--vax)">2015 baseline</text>`;
    if(Y>=2019.5)s+=`<rect x="${f1(X(2019.6))}" y="${y0}" width="${f1(X(2021)-X(2019.6))}" height="${y1-y0}" style="fill:var(--warn-soft);opacity:.7"/><text x="${f1(X(2020.3))}" y="${y0+10}" class="t-xs t-mid" style="fill:var(--warn)">COVID-19</text>`;
    const seg=(P)=>{let d='';P.forEach(([yr,v],i)=>{if(yr>Y&&i>0){const [py,pv]=P[i-1];if(py<Y){const u=(Y-py)/(yr-py);d+=`L${f1(X(Y))} ${f1(V(lerp(pv,v,u)))}`}return}d+=(d?'L':'M')+f1(X(yr))+' '+f1(V(v))});return d};
    const at=(P,yr)=>{for(let i=1;i<P.length;i++)if(yr<=P[i][0]){const a=P[i-1],b=P[i];return lerp(a[1],b[1],(yr-a[0])/(b[0]-a[0]))}return P[P.length-1][1]};
    if(!dd){/* shaded gap between estimated cases and notifications */
      let d='';const ys=[];for(let yr=2000;yr<=Y+1e-6;yr+=.25)ys.push(yr);if(ys[ys.length-1]<Y)ys.push(Y);
      if(ys.length>1){ys.forEach((yr,i)=>d+=(i?'L':'M')+f1(X(yr))+' '+f1(V(at(INC,yr))));ys.slice().reverse().forEach(yr=>d+='L'+f1(X(yr))+' '+f1(V(at(NOT,yr))));s+=`<path d="${d}Z" style="fill:url(#whHatch);opacity:.8"/>`}
      s+=`<path d="${seg(INC)}" style="fill:none;stroke:var(--tb);stroke-width:2.6"/><path d="${seg(NOT)}" style="fill:none;stroke:var(--accent);stroke-width:2.6"/>`;
      const e=Y;s+=`<circle cx="${f1(X(e))}" cy="${f1(V(at(INC,e)))}" r="4" style="fill:var(--tb)"/><circle cx="${f1(X(e))}" cy="${f1(V(at(NOT,e)))}" r="4" style="fill:var(--accent)"/>`;
      s+=`<text x="${f1(X(e)>x1-120?X(e)-8:X(e)+6)}" y="${f1(V(at(INC,e))-8)}" class="t-sm ${X(e)>x1-120?'t-end':''}" style="fill:var(--tb)">fell ill ${f1(at(INC,e))}</text><text x="${f1(X(e)>x1-120?X(e)-8:X(e)+6)}" y="${f1(V(at(NOT,e))+16)}" class="t-sm ${X(e)>x1-120?'t-end':''}" style="fill:var(--accent)">notified ${f1(at(NOT,e))}</text>`;
      if(Y>=2020)s+=`<circle cx="${f1(X(2020))}" cy="${f1(V(5.8))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.5"/><text x="${f1(X(2020))}" y="${f1(V(5.8)+20)}" class="t-xs t-mid" style="fill:var(--ink)">5.8 (2020)</text>`}
    else{if(!dh)s+=`<path d="${seg(DN)}" style="fill:none;stroke:var(--bad);stroke-width:2.6"/>`;
      s+=`<path d="${seg(DH)}" style="fill:none;stroke:var(--warn);stroke-width:2.6;stroke-dasharray:${dh?'0':'6 3'}"/>`;
      const e=Y;if(!dh)s+=`<circle cx="${f1(X(e))}" cy="${f1(V(at(DN,e)))}" r="4" style="fill:var(--bad)"/><text x="${f1(X(e)>x1-120?X(e)-8:X(e)+6)}" y="${f1(V(at(DN,e))-8)}" class="t-sm ${X(e)>x1-120?'t-end':''}" style="fill:var(--bad)">HIV-negative ${f1(at(DN,e)*100/100)}</text>`;
      s+=`<circle cx="${f1(X(e))}" cy="${f1(V(at(DH,e)))}" r="4" style="fill:var(--warn)"/><text x="${f1(X(e)>x1-120?X(e)-8:X(e)+6)}" y="${f1(V(at(DH,e))+(dh?-8:16))}" class="t-sm ${X(e)>x1-120?'t-end':''}" style="fill:var(--warn)">with HIV ${(at(DH,e)).toFixed(2)}</text>`;
      if(dh)s+=`<text x="${x1}" y="${y0+26}" class="t-sm t-end" style="fill:var(--ink)">share of new TB in people with HIV: 17% (2000) → 5.8% (2024)</text>`}
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${y0}" y2="${y1}" style="stroke:var(--ink);opacity:.3"/><text x="${f1(X(Y))}" y="${y1+30}" class="t-sm t-mid" style="fill:var(--ink)">${Math.round(Y)}</text>`;
    /* End TB scorecard */
    const sk=ease(ramp(k,.6,.95));
    if(sk>0){const bx=L.sx,by=L.sy,bw=L.sw;s+=`<g style="opacity:${f1(ramp(k,.6,.7))}"><text x="${bx}" y="${by}" class="t-lbl" style="fill:var(--vax)">End TB: 2015 → 2024</text><text x="${bx}" y="${by+16}" class="t-xs">fall achieved vs 2025 milestone</text>`;
      [['Incidence rate',12.3,50],['Deaths',29,75]].forEach(([l,a,m],i)=>{const y=by+40+i*58;
        s+=`<text x="${bx}" y="${y}" class="t-sm" style="fill:var(--ink)">${l}</text>`;
        s+=`<rect x="${bx}" y="${y+6}" width="${bw}" height="16" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+6}" width="${f1(bw*m/100)}" height="16" rx="3" style="fill:none;stroke:var(--vax);stroke-width:1.4;stroke-dasharray:4 2"/>`;
        s+=`<rect x="${bx}" y="${y+6}" width="${f1(bw*a/100*sk)}" height="16" rx="3" style="fill:var(--vax)"/>`;
        s+=`<text x="${bx}" y="${y+36}" class="t-xs" style="fill:var(--ink)">−${f1(a*sk).replace('.0','')}% achieved · milestone −${m}%</text>`});
      s+='</g>'}
    return s}
  function draw(t){const N=vb(svg,'720 400','400 560');const ph=phaseOf(WH_STEPS,t);
    const nx=[.25,.5,.74,1],f0=WH_STEPS[ph].from,k=ramp(t,f0,f0+(nx[ph]-f0)*.72);
    let s=`<defs><pattern id="whHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" style="fill:var(--tb-soft)"/><line x1="0" y1="0" x2="0" y2="7" style="stroke:var(--tb);stroke-width:2.2;opacity:.45"/></pattern></defs>`;
    if(ph===0)s+=bars(N?{x0:20,w:360,y0:92}:{x0:30,w:600,y0:88},k,N);
    else if(ph===1)s+=regions(N?{x0:20,w:360,y0:100}:{x0:30,w:660,y0:84},k,N);
    else if(ph===2)s+=countries(N?{gx:50,gy:66,lx:20,ly:385}:{gx:36,gy:72,lx:340,ly:92},k,N);
    else s+=trends(N?{cx0:44,cx1:380,cy0:70,cy1:300,sx:20,sy:368,sw:360}:{cx0:56,cx1:470,cy0:70,cy1:340,sx:500,sy:120,sw:190},k,N);
    /* scene dots */
    WH_STEPS.forEach((st,i)=>{const cx=(N?400:720)-20-(3-i)*16;s+=`<circle cx="${cx}" cy="22" r="5" style="fill:${i===ph?'var(--tb)':'var(--line)'}"/>`});
    svg.innerHTML=s;setSt(ph);
    const R=[
      pop==='hiv'?`<span>people with HIV who fell ill <b>≈619,000</b></span><span>died <b>150,000</b></span><span>on ART (all estimated) <b>61%</b></span>`:meas==='deaths'?`<span>deaths <b>1.23 million</b></span><span>case fatality <b>11.5%</b> (13.6% in 2019)</span>`:`<span>fell ill <b>10.7 million</b></span><span>notified <b>8.3 million</b></span><span>missing <b>2.4 million</b></span><span>died <b>1.23 million</b></span>`,
      `<span>highest share <b>South-East Asia 34%</b></span><span>highest rate <b>Africa ≈207/100k</b></span><span>lowest rate <b>Europe ≈22/100k</b></span>`,
      `<span>8 countries <b>67%</b></span><span>top 5 <b>55%</b></span><span>30 high-burden <b>87%</b></span>`,
      `<span>incidence rate 2015→2024 <b>−12.3%</b></span><span>deaths <b>−29%</b></span><span>COVID-19 notifications <b>7.1 → 5.8 million</b></span>`];
    $('#whRead').innerHTML=R[ph];
    $('#whNote').innerHTML=noteHTML(WH_STEPS[ph]);
  }
  const stop=playWire(rg,$('#whPlay'),draw,24000,'Replay','what');
  setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $$('[data-wm]').forEach(b=>b.addEventListener('click',()=>{meas=b.dataset.wm;$$('[data-wm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-wp]').forEach(b=>b.addEventListener('click',()=>{pop=b.dataset.wp;$$('[data-wp]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- TB infection in 100 people ---- */
  const ico=$('#whIco'),ir=$('#whIT');let est='h',clear=false;
  const EST={h:{p:23.0,n:'2014 model of 131 surveys',c:`<sup class="c" data-ref="Houben2016" title="Source 239">239</sup>`},ig:{p:24.8,n:'meta-analysis, IGRA studies',c:`<sup class="c" data-ref="Cohen2019ERJ" title="Source 78">78</sup>`},
    ts:{p:21.2,n:'meta-analysis, 10 mm skin test',c:`<sup class="c" data-ref="Cohen2019ERJ" title="Source 78">78</sup>`},w:{p:33.3,n:'WHO 1999, later revised',c:`<sup class="c" data-ref="Cohen2019ERJ" title="Source 78">78</sup>`}};
  const ORD=(()=>{const q=rng(1950),a=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(q()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  function drawI(t){const N=vb(ico,'720 330','400 600'),E=EST[est];
    const n=Math.round(E.p),k1=ramp(t,0,.32),k2=ramp(t,.36,.62),k3=ramp(t,.68,.92);
    const nInf=Math.round(n*k1),nClrAll=clear?Math.round(n*.731):0,nClr=Math.round(nClrAll*k2);
    const live=E.p*(clear?1-.731:1),risk=clear?.17:.075,dis=live*risk,nDis=k3>0?Math.max(1,Math.round(dis)):0,nDisNow=Math.round(nDis*Math.min(1,k3*1.6));
    const rank={};ORD.forEach((p,i)=>rank[p]=i);
    /* infected = first n in ORD; cleared = first nClr of them; disease = last of the infected who are not cleared */
    let s='';const cols=10,cw=N?34:28,ch=N?40:30,gx=N?30:28,gy=N?24:22,ps=N?28:22;
    for(let i=0;i<100;i++){const x=gx+(i%cols)*cw+cw/2,y=gy+Math.floor(i/cols)*ch,r=rank[i];let f='var(--fibro)',op=.38,o={};
      if(r<nInf){f='var(--tb)';op=.62}
      if(r<n&&r<nClr){f='var(--accent)';op=.5}
      if(r<n&&r>=n-nDisNow&&r>=nClrAll){f='var(--tb)';op=1;o.cough=true}
      if(r<n&&r>=n-nDisNow&&r>=nClrAll)s+=`<circle cx="${f1(x)}" cy="${f1(y+ps*.55)}" r="${f1(ps*.62)}" style="fill:none;stroke:var(--tb);stroke-width:1.6"/>`;
      o.op=op;s+=person(x,y,ps,f,o)}
    const tx=N?20:340,ty=N?448:40;
    const L=[[`${nInf}`,'in 100 have TB infection','var(--tb)',k1>0],
      [clear?`${nClr}`:'—',clear?'have cleared it (test may stay positive)':'self-clearance not modelled','var(--accent)',clear&&k2>0],
      [k3>0?`≈${dis<1.5?f1(dis):Math.round(dis)}`:'·','develop TB disease over a lifetime','var(--tb)',k3>0]];
    L.forEach(([a,b,c,on],i)=>{const y=ty+(N?i*40:i*58)+(N?0:24);s+=`<g style="opacity:${on?1:.35}"><text x="${tx}" y="${y}" class="t-big" style="fill:${c};font-size:${N?22:28}px">${a}</text><text x="${tx+(N?62:70)}" y="${y-(N?3:6)}" class="t-sm" style="fill:var(--ink)">${b}</text></g>`});
    const why=clear?`17.0% lifetime risk for each truly infected person (2021 model)`:`5–10% lifetime risk, as WHO has quoted it (7.5% used)`;
    s+=`<text x="${tx}" y="${N?ty+128:ty+220}" class="t-xs">${E.n}: ${E.p}%</text><text x="${tx}" y="${N?ty+144:ty+236}" class="t-xs">${why}</text>`;
    s+=`<text x="${tx}" y="${N?ty+160:ty+252}" class="t-xs" style="fill:var(--warn)">ILLUSTRATIVE ARITHMETIC · population figures</text>`;
    if(!N)s+=`<text x="${tx}" y="${ty}" class="t-sm" style="fill:var(--muted)">${k3>0?'LIFETIME':k2>0&&clear?'CLEARING':'INFECTED'}</text>`;
    ico.innerHTML=s;
    $('#whICap').innerHTML=`Each figure is 1 in 100 people. The infection share is from ${E.n} ${E.c}; the lifetime risk is ${clear?'from the self-clearance model <sup class="c" data-ref="Emery2021" title="Source 148">148</sup>':'the WHO figure quoted by Behr and colleagues <sup class="c" data-ref="Behr2018" title="Source 34">34</sup>'}. Combining figures from different studies is a teaching device, not an estimate.`;
    const ph=k3>0?2:(k2>0&&clear)?1:0;
    const NOTES=[{k:'TB infection',t:`About ${E.p>30?'one in three':'one in four'} people`,
      txt:`A model of 131 infection surveys (1950–2011) estimated that 23.0% of the world's population, about 1.7 billion people, had TB infection in 2014; about 80% of them lived in the South-East Asia, Western Pacific and African regions, and 0.8% of the world had been infected in the past 2 years, the group at highest risk. A meta-analysis of 88 studies found 24.8% by IGRA and 21.2% by a 10 mm skin test. WHO's 1999 estimate was one-third. <sup class="c" data-ref="Houben2016,Cohen2019ERJ" title="Source 78,239">78,239</sup>`,
      pt:`About 1 in 4 people in the world may have met the TB germ without being sick. This is TB infection, and it is not contagious.`,
      hook:`≈ a quarter of humanity: 23.0% (≈1.7 billion) by model, 24.8% by IGRA meta-analysis.`},
     {k:'Self-clearance',t:'Many may have cleared it',
      txt:`<span class="ev early">Early evidence</span> Modelling that allows the immune system to clear the bacteria estimates that 24.4% of infected people clear it within 10 years and 73.1% over a lifetime. Skin and blood tests can stay positive after the bacteria are gone: in one trial, people stayed tuberculin-positive up to 9 years after treatment. <sup class="c" data-ref="Emery2021,Behr2019" title="Source 35,148">35,148</sup>`,
      pt:`A positive TB test shows the body remembers the germ. It does not prove the germ is still alive.`,
      hook:`Tests measure immune memory, not live bacteria. Self-clearance model: 73.1% clear over a lifetime.`},
     {k:'Progression',t:'Only a few ever fall ill',
      txt:`WHO's resource page has stated that "on average, 5-10%" of infected people develop TB disease over their lifetime. If self-clearance is real, fewer people are truly infected but each faces a higher risk, 17.0% rather than 12.6%: the number who fall ill changes far less than the number "infected". Most disease appears within two years of infection, which is why recent contacts are a priority for <a href="#tpt" data-go="tpt">preventive treatment</a>. <sup class="c" data-ref="Behr2018,Emery2021" title="Source 34,148">34,148</sup>`,
      pt:`Most people with TB infection never get sick. The risk is highest in the first year or two, and short preventive treatment lowers it further.`,
      hook:`Lifetime risk after infection: "5–10%" (WHO, as quoted); 17.0% of the truly infected once self-clearance is allowed for. Risk is front-loaded: most disease within 2 years.`}];
    $('#whINote').innerHTML=noteHTML(NOTES[ph]);
  }
  playWire(ir,$('#whIPlay'),drawI,9000,'Replay','what');
  $$('[data-wi]').forEach(b=>b.addEventListener('click',()=>{est=b.dataset.wi;$$('[data-wi]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawI(+ir.value)}));
  $('#whClear').addEventListener('click',()=>{clear=!clear;$('#whClear').setAttribute('aria-pressed',clear);drawI(+ir.value)});
  drawI(+ir.value);
};
/* =============== 1.2 the TB bacterium =============== */
const BA_LAYERS=[
 {n:'Cytoplasm',c:'var(--cell)',s:'var(--mac-line)',
  d:`The genome — 4,411,529 base pairs, about 4,000 genes — and the RNA polymerase that reads it. An unusually large part of that coding capacity builds and breaks down lipids. <sup class="c" data-ref="Cole1998" title="Source 81">81</sup>`},
 {n:'Plasma membrane',c:'var(--nuc)',s:'var(--nuc)',
  d:`The living boundary of the cell, where the ATP synthase sits. Everything outside it is wall that the cell builds around itself. <sup class="c" data-ref="Brennan2003,Andries2005" title="Source 14,48">14,48</sup>`},
 {n:'Peptidoglycan',c:'var(--fibro)',s:'var(--fibro)',
  d:`The inner mesh, joined through an L-Rha-D-GlcNAc-P linker unit to the sugar layer above it. Ligating the whole core to peptidoglycan is predicted to be an excellent drug target. <sup class="c" data-ref="Brennan2003" title="Source 48">48</sup>`},
 {n:'Arabinogalactan',c:'var(--mac)',s:'var(--mac-line)',
  d:`A linear galactofuran carrying several strands of highly branched arabinofuran. Both chains are extended while the intermediate is carried out through the membrane. <sup class="c" data-ref="Brennan2003" title="Source 48">48</sup>`},
 {n:'Mycolic acids',c:'var(--tb)',s:'var(--tb)',
  d:`Very long fatty acids standing perpendicular to the membrane plane: the major, species-specific lipids of the envelope, essential for survival of the whole genus, and recognised by CD1-restricted T cells. <sup class="c" data-ref="Brennan2003,Marrakchi2014" title="Source 48,310">48,310</sup>`},
 {n:'Outer lipids',c:'var(--gold)',s:'var(--gold)',
  d:`Phthiocerol dimycocerosate, cord factor (dimycolyltrehalose), sulfolipids and phosphatidylinositol mannosides are intercalated in the lipid layer. Lipoarabinomannan from here blocks phagosome maturation inside macrophages. <sup class="c" data-ref="Brennan2003,Briken2004" title="Source 48,49">48,49</sup>`}];
const BA_R=[40,58,76,96,120,150];
const BA_DRUGS=[
 {n:'Isoniazid',l:'H',li:4,c:'var(--dH)',t:'stops mycolic acids being made',
  d:`Isoniazid is a prodrug activated by the catalase-peroxidase KatG, then inhibits InhA, the enoyl reductase of mycolic acid synthesis. A single <i>katG</i> gene restored isoniazid sensitivity to a resistant mutant, and a missense mutation in <i>inhA</i> confers resistance to isoniazid and ethionamide. <sup class="c" data-ref="Zhang1992,Banerjee1994" title="Source 25,535">25,535</sup>`},
 {n:'Ethambutol',l:'E',li:3,c:'var(--dE)',t:'stops arabinan being polymerised',
  d:`Ethambutol inhibits polymerisation of cell-wall arabinan, so decaprenol phosphoarabinose accumulates. Resistance comes from overexpression of Emb protein(s), structural mutation in EmbB, or both, in the <i>embCAB</i> cluster of arabinosyl transferases. <sup class="c" data-ref="Telenti1997" title="Source 463">463</sup>`},
 {n:'Rifampicin',l:'R',li:0,c:'var(--dR)',t:'blocks RNA polymerase, deep inside',
  d:`Rifampicin binds the β subunit of RNA polymerase. In 122 isolates, mutations at 8 conserved amino acids were found in 64 of 66 rifampicin-resistant isolates and in none of 56 susceptible ones, all inside a 23-amino-acid stretch of <i>rpoB</i> — the basis of rapid molecular resistance testing. <sup class="c" data-ref="Telenti1993" title="Source 462">462</sup>`},
 {n:'Bedaquiline',l:'B',li:1,c:'var(--dNew)',t:'jams the ATP synthase',
  d:`Bedaquiline inhibits mycobacterial ATP synthase in the plasma membrane, with an MIC of 0.06 µg/mL against drug-susceptible and drug-resistant strains, and bactericidal activity in mice exceeding isoniazid and rifampicin by at least 1 log. <sup class="c" data-ref="Andries2005" title="Source 14">14</sup>`}];
const BA_STEPS=[
 {from:0,at:.1,k:'Scene 1 · the smear',t:'Acid-fast rods on a blue field',
  txt:`In a Ziehl–Neelsen sputum smear the bacillus keeps the red carbol-fuchsin stain through an acid-alcohol wash — it is <b>acid-fast</b> — while everything else loses it and takes the methylene-blue counterstain. Rods often lie end to end in serpentine <b>cords</b>, an effect of the trehalose dimycolate (cord factor) in the outer envelope. Bacillary length differs with where the specimen came from: 1.9 ± 0.1 µm inside cavities, 2.9 ± 0.1 µm in sputum and 3.6 ± 0.2 µm in lavage fluid. <sup class="c" data-ref="Brennan2003,Eum2010" title="Source 48,156">48,156</sup>`,
  pt:`The red stain is the oldest TB test there is: a sample of spit, a slide and a microscope can show the germ the same day.`,
  hook:`Counting bacilli under the microscope agreed well with culturable counts before or very early in treatment in 27 of 28 people — a same-day measure of how many bacilli are left. <sup class="c" data-ref="Hobby1973" title="Source 235">235</sup>`},
 {from:.26,at:.4,k:'Scene 2 · the envelope',t:'A waxy wall, built in layers',
  txt:`Cut the bacillus across and the wall is one massive covalent core: peptidoglycan, linked through a short linker unit to a linear galactofuran, attached to branched arabinofuran, attached in turn to mycolic acids standing perpendicular to the membrane — "a truly special lipid barrier", with further lipids intercalated in it. That wall is impermeable to many compounds, which is part of the organism's inherent resistance to numerous drugs, and it is complex enough that the cell needs specialised machinery to divide at all. <sup class="c" data-ref="Brennan2003,Hett2008" title="Source 48,232">48,232</sup>`,
  pt:`The germ wears a thick, waxy coat. It keeps medicines out, holds the red stain in, and has to be rebuilt every time the cell divides.`,
  hook:`Order from the inside out: plasma membrane → peptidoglycan → linker unit → galactofuran → arabinofuran → mycolic acids → outer lipids. <sup class="c" data-ref="Brennan2003" title="Source 48">48</sup>`},
 {from:.54,at:.66,k:'Scene 3 · drug targets',t:'Four drugs, four targets',
  txt:`Each of these drugs attacks a different part of the structure. Isoniazid stops mycolic acids being made; ethambutol stops arabinan being polymerised; rifampicin reaches past the wall to RNA polymerase; bedaquiline jams the ATP synthase in the membrane. Mycolic acid biosynthesis, and the attachment of mycolic acids to the core, are long-established routes to new antimycobacterial agents. <sup class="c" data-ref="Banerjee1994,Telenti1997,Telenti1993,Andries2005,Marrakchi2014" title="Source 14,25,310,462,463">14,25,310,462,463</sup>`,
  pt:`Different TB medicines break different parts of the coat, or the machinery inside it. That is one reason several are always given together.`,
  hook:`Resistance arises by chromosomal mutation, at very different rates: 2.25 × 10⁻¹⁰ per bacterium per generation for rifampicin, 2.56 × 10⁻⁸ for isoniazid, 2.95 × 10⁻⁸ for streptomycin and 10⁻⁷ for ethambutol. One drug alone would select the mutants that are already there. <sup class="c" data-ref="David1970" title="Source 110">110</sup>`},
 {from:.76,at:.92,k:'Scene 4 · slow growth',t:'A day to double, weeks to report',
  txt:`In carbon-limited chemostat culture a "fast-growing" <i>M. tuberculosis</i> population was held at a mean generation time of 23.1 hours and a slow-growing population at 69.3 hours, and the two differed in how they responded to isoniazid. Slow growth is not an artefact of the flask: in a chemostat model it switched on genes of the dormancy survival regulon, and the transcriptome overlapped strikingly with that of bacteria living inside macrophages. In the laboratory that slowness sets the clock — liquid culture reports growth in 10–14 days, solid culture in 3–4 weeks. <sup class="c" data-ref="Jeeves2015,Beste2007,Lewinsohn2017" title="Source 38,247,284">38,247,284</sup>`,
  pt:`TB germs take about a day to double, while many common bacteria double in under an hour. That is why a TB culture takes weeks, and part of why treatment takes months rather than days.`,
  hook:`Slow growth, a near-impermeable wall and subpopulations that barely metabolise are the standing explanation for multi-drug, multi-month treatment. <sup class="c" data-ref="Jeeves2015,Hett2008" title="Source 232,247">232,247</sup>`}];
const BA_REGS=['Americas','Europe','Africa','Asia','Oceania'];
const BA_MTBC=[
 {id:'mtb',n:'M. tuberculosis',it:1,sub:'the human lineages',regs:['Americas','Europe','Africa','Asia','Oceania'],br:'mtb',
  t:'Human-adapted, and clonal',
  txt:`The complex has a clonal population structure, with such low DNA sequence diversity that standard bacterial typing methods are uninformative; whole-genome sequencing of large clinical collections is what opened up its ecology and evolution. Presence or absence of the TbD1 deletion divides <i>M. tuberculosis</i> into "ancestral" and "modern" strains, the latter including the Beijing, Haarlem and African clusters. <sup class="c" data-ref="Gagneux2018,Brosch2002" title="Source 50,191">50,191</sup>`,
  pt:`All the TB germs that infect people are close relatives — close enough that the usual ways of telling bacteria apart do not work on them.`,
  hook:`TbD1 separates ancestral from modern <i>M. tuberculosis</i>; the modern group includes the Beijing, Haarlem and African clusters. <sup class="c" data-ref="Brosch2002" title="Source 50">50</sup>`},
 {id:'l4',n:'Lineage 4',it:0,sub:'the most widespread',regs:['Americas','Europe','Africa'],br:'mtb',
  t:'Generalists and specialists',
  txt:`Lineage 4 is the most geographically widespread cause of human TB. It contains both globally distributed "generalist" and geographically restricted "specialist" sublineages. Most human T-cell epitopes were conserved across sublineages, but the proportion of variable epitopes was higher in the generalists, and the data support a European origin for the commonest generalist sublineage. <sup class="c" data-ref="Stucki2016" title="Source 448">448</sup>`,
  pt:`Some TB strains have travelled the world; others have stayed in one region. The travellers carry slightly more variable targets for the immune system.`,
  hook:`Lineage 4 generalist sublineages are globally distributed and carry more variable T-cell epitopes; a European origin is supported for the commonest one. <sup class="c" data-ref="Stucki2016" title="Source 448">448</sup>`},
 {id:'l8',n:'Lineage 8',it:0,sub:'described in 2020',regs:['Africa'],br:'root',
  t:'A sister clade to everything else',
  txt:`Lineage 8 was described in 2020 from two strains isolated in the African Great Lakes region, and is a sister clade to all previously known lineages of the complex. Its divergence preceded the loss of the <i>cobF</i> region — cobalamin, or vitamin B12, synthesis — in the common ancestor of the other lineages, which further supports an East African origin for the whole complex. <sup class="c" data-ref="Ngabonziza2020" title="Source 352">352</sup>`,
  pt:`The family tree of TB is still gaining branches: a new one was added in 2020 from two samples in central Africa.`,
  hook:`Lineage 8 branches off before the <i>cobF</i> deletion shared by all other lineages — evidence for an East African origin of the complex. <sup class="c" data-ref="Ngabonziza2020" title="Source 352">352</sup>`},
 {id:'afr',n:'M. africanum',it:1,sub:'lineages 5, 6 and 9',regs:['Africa'],br:'anim',
  t:'West Africa has its own lineages',
  txt:`<i>M. africanum</i> causes human TB and sits on the branch that leads on to <i>M. microti</i> and <i>M. bovis</i>. Phylogenomic analysis revealed a further new lineage, L9, and a complex evolutionary history inside the human-adapted complex. <sup class="c" data-ref="Coscolla2021,Brosch2002" title="Source 50,91">50,91</sup>`,
  pt:`In parts of West Africa a sizeable share of human TB is caused by a different member of the same family.`,
  hook:`The <i>africanum</i> → <i>microti</i> → <i>bovis</i> branch split from the ancestor of present-day <i>M. tuberculosis</i> before TbD1 arose. <sup class="c" data-ref="Brosch2002" title="Source 50">50</sup>`},
 {id:'bovis',n:'M. bovis',it:1,sub:'zoonotic TB',regs:[],br:'anim',
  t:'TB that comes from animals',
  txt:`<i>M. bovis</i> causes zoonotic TB in people. The burden is likely underestimated, especially where bovine TB is endemic and people have direct contact with infected animals or animal products, and that review calls for accurate diagnosis and treatment of <i>M. bovis</i> disease in people. It is naturally resistant to pyrazinamide: mutations in <i>pncA</i> account for the natural resistance of <i>M. bovis</i>, which cannot activate the prodrug. <sup class="c" data-ref="OleaPopelka2017,Scorpio1996" title="Source 360,417">360,417</sup>`,
  pt:`People can catch TB from infected cattle or unpasteurised milk. It is treated much like other TB, but one of the four standard drugs does not work against it.`,
  hook:`<i>M. bovis</i> is intrinsically pyrazinamide-resistant through <i>pncA</i> — and <i>M. tuberculosis</i> did <b>not</b> evolve from <i>M. bovis</i>. <sup class="c" data-ref="Scorpio1996,Brosch2002" title="Source 50,417">50,417</sup>`},
 {id:'bcg',n:'M. bovis BCG',it:1,sub:'the vaccine strain',regs:[],br:'bcg',
  t:'The strain that became a vaccine',
  txt:`BCG is a live <i>M. bovis</i> strain attenuated by repeated subculture, and it lacks RD1 — the region of difference that encodes ESAT-6 and CFP-10. Its genome is 4,374,522 base pairs with 3,954 protein-coding genes, 58 of them duplicated in two independent tandem duplications; amplification is ongoing even within vaccine preparations, which affects gene expression, immunogenicity and possibly protection. Whole-genome comparison showed that the daughter strains have lost further regions since 1921, so BCG substrains differ from one another as well as from virulent <i>M. bovis</i>. <sup class="c" data-ref="Mahairas1996,Brosch2007,Behr1999" title="Source 32,51,301">32,51,301</sup>`,
  pt:`The BCG vaccine is a weakened cattle strain. The piece of genome it lost is exactly the piece that modern TB blood tests look for.`,
  hook:`RD1 is deleted from every BCG substrain — hence BCG's attenuation and the specificity of RD1-based IGRAs after vaccination. <sup class="c" data-ref="Mahairas1996,Pai2008" title="Source 301,366">301,366</sup>`},
 {id:'orygis',n:'M. orygis',it:1,sub:'a proposed subspecies',regs:['Africa','Asia'],br:'anim',
  t:'Animals and people, Africa and South Asia',
  txt:`<i>M. orygis</i> was characterised from 22 isolates and proposed as a subspecies of the complex. It causes TB in animals and in people in Africa and South Asia. <sup class="c" data-ref="vanIngen2012" title="Source 485">485</sup>`,
  pt:`Another animal-adapted member of the family that also infects people, recognised only recently.`,
  hook:`<i>M. orygis</i>: a complex subspecies causing disease in animals and in people in Africa and South Asia. <sup class="c" data-ref="vanIngen2012" title="Source 485">485</sup>`},
 {id:'microti',n:'M. microti',it:1,sub:'the other live vaccine',regs:[],br:'anim',
  t:'A vaccine before BCG took over',
  txt:`<i>M. microti</i> was used historically as a live TB vaccine. Loss of RD1 contributed to its attenuation as well, and reintroducing RD1 into BCG restored part of the virulent phenotype — evidence that this one region carries much of the difference between a pathogen and a vaccine. <sup class="c" data-ref="Pym2002" title="Source 381">381</sup>`,
  pt:`A second weakened member of the family was once used as a vaccine, and it had lost the same piece of genome as BCG.`,
  hook:`RD1 loss attenuated <i>M. microti</i> too; putting RD1 back into BCG restored part of its virulence. <sup class="c" data-ref="Pym2002" title="Source 381">381</sup>`}];
inits.bacillus=()=>{
  const svg=$('#baSvg'),rg=$('#baT'),read=$('#baRead');let baLog=true;
  const baF=(d,T)=>Math.pow(2,d*24/T);                    /* bacilli from one, after d days at generation time T hours */
  const baFmt=v=>v>=1e9?(v/1e9).toFixed(1)+' billion':v>=1e6?(v/1e6).toFixed(1)+' million':v>=1000?Math.round(v/1000)+' thousand':Math.round(v).toString();
  const baWrap=(t,n)=>{const out=[];let cur='';t.split(' ').forEach(w=>{if((cur+' '+w).length>n){out.push(cur);cur=w}else cur=cur?cur+' '+w:w});out.push(cur);return out};
  /* ---- scene 1: the smear ---- */
  function baSmear(L,a){
    const cx=L.fx,cy=L.fy,r=L.fr,id='baFld'+(L.wide?'w':'n'),z=lerp(1,3.1,ease(a));
    let s=`<defs><clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--accent-soft)"/><g clip-path="url(#${id})">`;
    for(let i=0;i<5;i++){const q=rng(i*17+3);s+=`<circle cx="${f1(cx+(q()-.5)*r*1.6)}" cy="${f1(cy+(q()-.5)*r*1.6)}" r="${f1(9*z*(.7+q()*.7))}" style="fill:var(--accent);opacity:.12"/>`}
    for(let i=0;i<9;i++){const q=rng(i*31+5),px=cx+(q()-.5)*r*1.45,py=cy+(q()-.5)*r*1.45;
      if(i%3===0)s+=clump(px,py,5,6.5*z,{len:5.2*z,seed:i+2,cord:true});
      else s+=clump(px,py,2+(i%3),8*z,{len:5.2*z,seed:i+7})}
    s+='</g>';
    s+=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--line);stroke-width:7"/>`;
    s+=`<text x="${cx}" y="${f1(cy+r+24)}" class="t-sm t-mid">ZIEHL–NEELSEN SMEAR · ×${Math.round(lerp(100,1000,ease(a))/10)*10}</text>`;
    [['Carbol fuchsin','keeps its red stain through the acid-alcohol wash: acid-fast'],
     ['Methylene blue','the counterstain: everything that is not acid-fast'],
     ['Cords','rods end to end, an effect of cord factor in the envelope'],
     ['Size','1.9 µm in cavities, 2.9 µm in sputum, 3.6 µm in lavage fluid']].forEach(([h,d],i)=>{
      const y=L.tx1+i*L.txd,op=f1(ramp(a,i*.18,i*.18+.1));
      s+=`<rect x="${f1(L.tx0-10)}" y="${f1(y-17)}" width="${f1(L.tw)}" height="${f1(L.txd-8)}" rx="9" style="fill:var(--panel-2);opacity:${op}"/>`;
      s+=`<text x="${L.tx0}" y="${y}" class="t-lbl" style="opacity:${op}">${h}</text>`;
      baWrap(d,L.tc).slice(0,2).forEach((t2,k)=>s+=`<text x="${L.tx0}" y="${f1(y+16+k*13)}" class="t-xs" style="opacity:${op}">${t2}</text>`)});
    return s}
  /* ---- scenes 2 and 3: the envelope, then the drug targets ---- */
  function baCell(L,a,drugs){
    const cx=L.cx,cy=L.cy,sc=L.sc;let s='';
    for(let i=BA_LAYERS.length-1;i>=0;i--){const Ly=BA_LAYERS[i],r=BA_R[i]*sc,on=drugs?1:ramp(a,i*.13,i*.13+.3);
      if(on<=0)continue;
      s+=`<path d="M${f1(cx)} ${f1(cy-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(cx)} ${f1(cy+r)}Z" style="fill:${Ly.c};fill-opacity:${i===4?.7:.92};stroke:${Ly.s};stroke-width:1.3;opacity:${f1(on)}"/>`;
      if(i===4)for(let k=0;k<22;k++){const an=Math.PI/2+Math.PI*(k+.5)/22;
        s+=`<line x1="${f1(cx+Math.cos(an)*BA_R[3]*sc)}" y1="${f1(cy+Math.sin(an)*BA_R[3]*sc)}" x2="${f1(cx+Math.cos(an)*r)}" y2="${f1(cy+Math.sin(an)*r)}" style="stroke:var(--tb);stroke-width:1.1;opacity:${f1(.6*on)}"/>`}
      if(i===5)for(let k=0;k<13;k++){const an=Math.PI/2+Math.PI*(k+.5)/13,rr=(BA_R[4]+BA_R[5])/2*sc;
        s+=`<circle cx="${f1(cx+Math.cos(an)*rr)}" cy="${f1(cy+Math.sin(an)*rr)}" r="2.6" style="fill:var(--gold);opacity:${f1(.9*on)}"/>`}}
    const r0=BA_R[0]*sc,op0=drugs?1:ramp(a,0,.3);
    s+=`<path d="M${f1(cx-r0*.8)} ${f1(cy-r0*.34)}q${f1(r0*.52)} ${f1(-r0*.42)} ${f1(r0*.28)} ${f1(r0*.3)}q${f1(-r0*.44)} ${f1(r0*.58)} ${f1(r0*.1)} ${f1(r0*.52)}" style="fill:none;stroke:var(--nuc);stroke-width:2;opacity:${f1(.8*op0)}"/>`;
    s+=`<text x="${f1(cx-r0*.72)}" y="${f1(cy+r0*.86)}" class="t-xs" style="opacity:${f1(op0)}">rpoB</text>`;
    s+=`<line x1="${f1(cx)}" y1="${f1(cy-BA_R[5]*sc)}" x2="${f1(cx)}" y2="${f1(cy+BA_R[5]*sc)}" style="stroke:var(--line);stroke-width:1.4"/>`;
    s+=`<text x="${f1(cx-BA_R[5]*sc*.52)}" y="${f1(cy+BA_R[5]*sc+22)}" class="t-sm t-mid">HALF CROSS-SECTION</text>`;
    if(!drugs){
      if(L.wide)BA_LAYERS.forEach((Ly,i)=>{const r=BA_R[i]*sc,y=cy-r,on=ramp(a,i*.13,i*.13+.3);if(on<=0)return;
        s+=`<line x1="${f1(cx+2)}" y1="${f1(y)}" x2="${f1(L.lx-10)}" y2="${f1(y)}" style="stroke:${Ly.s};stroke-width:1;stroke-dasharray:3 3;opacity:${f1(on)}"/>`;
        s+=`<rect x="${f1(L.lx-8)}" y="${f1(y-7)}" width="12" height="12" rx="3" style="fill:${Ly.c};stroke:${Ly.s};opacity:${f1(on)}"/>`;
        s+=`<text x="${f1(L.lx+11)}" y="${f1(y+4)}" class="t-lbl" style="opacity:${f1(on)}">${i+1}. ${Ly.n}</text>`});
      if(L.wide){const W=[['Keeps compounds out','part of the organism\u2019s inherent resistance to numerous drugs'],
          ['Holds the red stain','through the acid-alcohol wash: acid-fast'],
          ['Hard to build','so complex that the cell needs specialised machinery to divide']];
        W.forEach(([h,d],i)=>{const y=L.wy+i*72,op=f1(ramp(a,.45+i*.14,.6+i*.14));
          s+=`<rect x="${L.wx-10}" y="${f1(y-18)}" width="214" height="62" rx="9" style="fill:var(--panel-2);opacity:${op}"/>`;
          s+=`<text x="${L.wx}" y="${y}" class="t-lbl" style="opacity:${op}">${h}</text>`;
          baWrap(d,34).slice(0,3).forEach((t2,k)=>s+=`<text x="${L.wx}" y="${f1(y+16+k*13)}" class="t-xs" style="opacity:${op}">${t2}</text>`)})}
      else BA_LAYERS.forEach((Ly,i)=>{const y=L.lgy+i*L.lgd,on=ramp(a,i*.13,i*.13+.3);if(on<=0)return;
        s+=`<rect x="${L.lgx}" y="${f1(y-10)}" width="13" height="13" rx="3" style="fill:${Ly.c};stroke:${Ly.s};opacity:${f1(on)}"/>`;
        s+=`<text x="${f1(L.lgx+20)}" y="${f1(y)}" class="t-lbl" style="opacity:${f1(on)}">${i+1}. ${Ly.n}</text>`});
    }else{
      BA_DRUGS.forEach((D,i)=>{const on=ramp(drugs,i*.17,i*.17+.33);if(on<=0)return;
        const r=BA_R[D.li]*sc,an=Math.PI/2+Math.PI*(.82-i*.21),k=D.li===0?.55:.94;
        const px=cx+Math.cos(an)*r*k,py=cy+Math.sin(an)*r*k,tx=L.dx,ty=L.dy+i*L.dd;
        s+=`<path d="M${f1(tx+4)} ${f1(ty)}Q${f1((tx+px)/2)} ${f1((ty+py)/2)} ${f1(px)} ${f1(py)}" style="fill:none;stroke:${D.c};stroke-width:1.4;opacity:${f1(.7*on)}"/>`;
        s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="4.5" style="fill:${D.c};opacity:${f1(on)}"/>`;
        s+=`<g style="opacity:${f1(on)}">${pill(tx+14,ty,22,D.c,{label:D.l,ang:-18})}`;
        s+=`<text x="${f1(tx+32)}" y="${f1(ty-3)}" class="t-lbl" style="fill:${D.c}">${D.n}</text>`;
        s+=`<text x="${f1(tx+32)}" y="${f1(ty+11)}" class="t-xs">${D.t}</text></g>`})}
    return s}
  /* ---- scene 4: the growth race ---- */
  function baRace(L,a){
    const days=lerp(0,30,a),x0=L.gx0,x1=L.gx1,y0=L.gy0,y1=L.gy1,X=d=>lerp(x0,x1,d/30);
    const LT=12,LIN=2.5e9,Y=v=>baLog?lerp(y1,y0,clamp(Math.log10(Math.max(v,1))/LT)):lerp(y1,y0,clamp(v/LIN));
    let s='';
    [[10,14,'liquid culture reports','var(--accent)'],[21,28,'solid culture reports','var(--fibro)']].forEach(([d0,d1,lab,c],i)=>{
      s+=`<rect x="${f1(X(d0))}" y="${y0}" width="${f1(X(d1)-X(d0))}" height="${f1(y1-y0)}" style="fill:${c};opacity:.14"/>`;
      s+=`<text x="${f1(X(d0)+3)}" y="${f1(y0+12+i*(L.wide?0:14))}" class="t-xs" style="fill:${c}">${lab}</text>`});
    for(let d=0;d<=30;d+=5)s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${y0}" y2="${y1}" class="grid"/><text x="${f1(X(d))}" y="${f1(y1+17)}" class="t-xs t-mid">${d}</text>`;
    s+=`<text x="${f1(x1)}" y="${f1(y1+33)}" class="t-xs t-end">days in culture</text>`;
    const SUP=['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','¹⁰','¹¹','¹²'];
    if(baLog)for(let e=0;e<=LT;e+=3){const y=lerp(y1,y0,e/LT);
      s+=`<line x1="${x0}" x2="${x1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${f1(x0-7)}" y="${f1(y+3)}" class="t-xs t-end">10${SUP[e]}</text>`}
    else [0,.5,1,1.5,2,2.5].forEach(b=>{const y=lerp(y1,y0,b/2.5);
      s+=`<line x1="${x0}" x2="${x1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${f1(x0-7)}" y="${f1(y+3)}" class="t-xs t-end">${b?b+' bn':'0'}</text>`});
    s+=`<line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y1}" class="axis"/><line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    s+=`<text x="${x0}" y="${f1(y0-14)}" class="t-sm">ONE BACILLUS BECOMES… · ${baLog?'log scale':'linear scale'}</text>`;
    const CU=[{T:1,c:'var(--muted)',dash:'5 4',n:'a fast-growing bacterium, doubling in under an hour'},
              {T:23.1,c:'var(--tb)',dash:'',n:'M. tuberculosis, fast population: 23.1 h'},
              {T:69.3,c:'var(--accent)',dash:'',n:'M. tuberculosis, slow population: 69.3 h'}];
    CU.forEach(C=>{let d='',last=null,off=false;
      for(let i=0;i<=120;i++){const dd=days*i/120,v=baF(dd,C.T),y=Y(v);
        if((baLog&&Math.log10(Math.max(v,1))>LT)||(!baLog&&v>LIN)){d+=`L${f1(X(dd))} ${f1(y0)}`;off=true;break}
        d+=(i?'L':'M')+f1(X(dd))+' '+f1(y);last=[X(dd),y]}
      s+=`<path d="${d}" style="fill:none;stroke:${C.c};stroke-width:${C.dash?1.6:2.6};stroke-dasharray:${C.dash};stroke-linejoin:round"/>`;
      if(last&&!off&&last[1]>y0+6)s+=`<circle cx="${f1(last[0])}" cy="${f1(last[1])}" r="4" style="fill:${C.c}"/>`});
    CU.forEach((C,i)=>{const y=L.lgy2+i*15;
      s+=`<line x1="${L.lgx2}" x2="${f1(L.lgx2+16)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${C.c};stroke-width:2.4;stroke-dasharray:${C.dash}"/>`;
      s+=`<text x="${f1(L.lgx2+23)}" y="${f1(y+4)}" class="t-xs">${C.n}</text>`});
    s+=`<text x="${f1(clamp(X(days),x0+26,x1-26))}" y="${f1(y1-6)}" class="t-sm t-mid" style="fill:var(--ink)">day ${Math.round(days)}</text>`;
    if(!baLog&&days<23)s+=`<text x="${f1((x0+x1)/2)}" y="${f1(lerp(y1,y0,.42))}" class="t-lbl t-mid" style="fill:var(--muted)">on a linear scale, nothing seems to happen…</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const L=N?{wide:false,fx:200,fy:160,fr:126,tx0:26,tx1:330,txd:56,tw:348,tc:46,
               cx:188,cy:168,sc:.78,lgx:26,lgy:336,lgd:30,dx:22,dy:338,dd:52,
               wx:0,wy:0,gx0:60,gx1:384,gy0:90,gy1:420,lgy2:468,lgx2:22}
            :{wide:true,fx:208,fy:184,fr:142,tx0:420,tx1:76,txd:84,tw:288,tc:40,
               cx:206,cy:190,sc:1,lx:286,dx:462,dy:116,dd:62,
               wx:470,wy:96,gx0:86,gx1:688,gy0:64,gy1:292,lgy2:320,lgx2:86};
    let s='';
    if(t<.26)s=baSmear(L,ramp(t,0,.24));
    else if(t<.54)s=baCell(L,ramp(t,.27,.53),0);
    else if(t<.76)s=baCell(L,1,ramp(t,.55,.75));
    else s=baRace(L,ramp(t,.77,1));
    svg.innerHTML=s;
    const p=phaseOf(BA_STEPS,t);setSt(p);
    $('#baNote').innerHTML=noteHTML(BA_STEPS[p])
      +(p===2?`<div class="kv"><div><dt>Each target in full</dt><dd>${BA_DRUGS.map(D=>`<b>${D.n}:</b> ${D.d}`).join('<br>')} <button class="btn ghost" data-go="drugs">How TB drugs work</button></dd></div></div>`:'')
      +(p===3?`<div class="kv"><div><dt>Why the laboratory is slow</dt><dd>Liquid culture detects growth in an average of 10–14 days and solid culture in 3–4 weeks; liquid culture sensitivity is 88–90% against 76% for solid. <button class="btn ghost" data-go="diagnose">Diagnosing TB disease</button> <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup></dd></div></div>`:'');
    if(t<.76){
      read.innerHTML=`<span>scene <b>${['the smear','the envelope','drug targets','growth'][p]}</b></span>`
        +(p===0?`<span>magnification <b>×${Math.round(lerp(100,1000,ease(ramp(t,0,.24)))/10)*10}</b></span>`:'')
        +(p===1?`<span>layers drawn <b>${clamp(1+Math.floor(ramp(t,.27,.53)*6.6),1,6)} of 6</b></span>`:'')
        +(p===2?`<span>targets shown <b>${clamp(Math.ceil(ramp(t,.55,.75)*5.2),1,4)} of 4</b></span>`:'');
    }else{const d=lerp(0,30,ramp(t,.77,1));
      read.innerHTML=`<span>day <b>${Math.round(d)}</b></span><span>doublings <b>${(d*24/23.1).toFixed(1)}</b></span><span>fast population <b>${baFmt(baF(d,23.1))}</b></span><span>slow population <b>${baFmt(baF(d,69.3))}</b></span>`}
  }
  const stop=playWire(rg,$('#baPlay'),draw,26000,'Replay','bacillus');
  const setSt=stepWire($('#baSteps'),BA_STEPS,rg,draw,stop);
  $('#baLog').addEventListener('click',()=>{baLog=!baLog;
    $('#baLog').setAttribute('aria-pressed',baLog);
    $('#baLog').textContent=(baLog?'Log scale':'Linear scale')+' (growth scene)';
    if(+rg.value<.78){stop();rg.value=.95}
    draw(+rg.value)});
  draw(+rg.value);

  /* ---- the envelope, layer by layer ---- */
  $('#baLayers').innerHTML=BA_LAYERS.map((L,i)=>`<div><b><i style="background:${L.c};border:1px solid ${L.s}"></i>${i+1}. ${L.n}</b>${L.d}</div>`).join('');

  /* ---- the complex: chips, a schematic region strip and a branch diagram ---- */
  const ws=$('#baWorld');let baSel=0;
  $('#baMtbc').innerHTML=BA_MTBC.map((M,i)=>`<button data-mt="${i}" aria-pressed="${i===0}">${M.it?`<i>${M.n}</i>`:M.n}<i class="s">${M.sub}</i></button>`).join('');
  function drawW(){
    const N=vb(ws,'720 300','400 330'),M=BA_MTBC[baSel];
    const x0=N?16:22,w=N?368:676,by=N?42:46,bh=N?70:84,bw=w/5;let s='';
    s+=`<text x="${x0}" y="${N?24:26}" class="t-sm">WHERE THE CITED DESCRIPTION PLACES IT</text>`;
    BA_REGS.forEach((rn,i)=>{const on=M.regs.includes(rn),bx=x0+i*bw+bw/2;
      s+=`<path d="${blob(bx,by+bh/2,Math.min(bw,bh)*.44,11+i*5,1.3,.95,12,.3)}" style="fill:${on?'var(--tb)':'var(--panel-2)'};fill-opacity:${on?.3:1};stroke:${on?'var(--tb)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(bx)}" y="${f1(by+bh+17)}" class="t-xs t-mid" style="${on?'fill:var(--tb);font-weight:700':''}">${rn}</text>`});
    if(!M.regs.length)s+=`<text x="${f1(x0+w/2)}" y="${f1(by+bh/2+4)}" class="t-lbl t-mid">no single region named in the cited source</text>`;
    const T=N?188:196,ind=N?16:28;
    s+=`<text x="${x0}" y="${f1(T-26)}" class="t-sm">AND WHERE IT SITS ON THE TREE</text>`;
    s+=`<path d="M${f1(x0+6)} ${f1(T+4)}V${f1(T+52)}M${f1(x0+6)} ${f1(T+28)}H${f1(x0+ind-6)}M${f1(x0+6)} ${f1(T+52)}H${f1(x0+ind-6)}M${f1(x0+ind)} ${f1(T+56)}V${f1(T+76)}H${f1(x0+ind*2-6)}" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
    const put=(x,y,id,label)=>{const on=M.br===id;
      return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?6:4}" style="fill:${on?'var(--tb)':'var(--muted)'}"/><text x="${f1(x+11)}" y="${f1(y+4)}" class="${on?'t-lbl':'t-xs'}" style="${on?'fill:var(--tb)':''}">${label}</text>`};
    s+=put(x0+6,T,'root','common ancestor · lineage 8 branches first');
    s+=put(x0+ind,T+28,'mtb','M. tuberculosis (TbD1: ancestral / modern)');
    s+=put(x0+ind,T+52,'anim','M. africanum → M. microti → M. bovis');
    s+=put(x0+ind*2,T+76,'bcg','BCG (RD1 deleted)');
    ws.innerHTML=s;
    $('#baMtbcNote').innerHTML=noteHTML({k:M.n+' · '+M.sub,t:M.t,txt:M.txt,pt:M.pt,hook:M.hook});
  }
  $('#baMtbc').addEventListener('click',e=>{const b=e.target.closest('[data-mt]');if(!b)return;
    baSel=+b.dataset.mt;$$('[data-mt]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawW()});
  drawW();
  const prevR=redraws.bacillus;redraws.bacillus=()=>{prevR&&prevR();drawW()};
};
/* =============== 1.3 How TB spreads =============== */
/* Ventilation presets: air changes per hour (Escombe 2007 Lima measurements; closed = 28/18, derived) */
const SP_VENT={closed:{ach:1.6,n:'closed room'},mech:{ach:12,n:'mechanical ventilation'},open:{ach:28,n:'windows and door open'}};
const SP_Q0=13,SP_V=30,SP_P=.6;           /* source quanta/h (Nardell 1991), room m³ and breathing m³/h (model inputs) */
const SP_STEPS=[
 {from:0,at:.06,k:'Second 0 · one cough',t:'A cough makes droplet nuclei',pre:{vent:'closed',tx:false},
  txt:`A person with TB disease in the lungs coughs. The big droplets fall to the floor within seconds; what matters is what is left in the air. Of the cough particles that carried culturable <i>M. tuberculosis</i> in Kampala, 96.4% were 0.65–4.7 µm across: small enough to stay airborne and be breathed deep into the lung. Across respiratory infections, the pathogens ride mostly in particles under 5 µm. <sup class="c" data-ref="Fennelly2012,Fennelly2020" title="Source 173,174">173,174</sup>`,
  pt:`A cough throws out big drops that fall, and tiny dried specks that float. The specks carry TB.`,
  hook:`Droplet nuclei: culturable TB particles 0.65–4.7 µm in 96.4% of cases. Respirable, not large droplets. <sup class="c" data-ref="Fennelly2012" title="Source 173">173</sup>`},
 {from:.12,at:.3,k:'Hours 0–8 · closed room',t:'Shared air, for hours',pre:{vent:'closed',tx:false},
  txt:`With windows and doors shut, the Lima rooms changed their air about 1.6 times an hour (28 ÷ 18, derived), so the nuclei build up. The Wells–Riley model counts infectious doses as <b>quanta</b>: in an office outbreak, one coworker with cavitary TB was estimated to add about 13 quanta an hour, and 27 of 67 workers (40%) converted their skin test over about 4 weeks. Time matters as much as distance. <sup class="c" data-ref="Escombe2007,Nardell1991" title="Source 150,340">150,340</sup>`,
  pt:`In a closed room the specks keep piling up. The longer two people share that air, the higher the chance of passing TB on.`,
  hook:`Wells–Riley: P = 1 − e^(−I·q·p·t/Q). Infection rises with quanta (q), breathing (p) and time (t); falls with fresh-air flow (Q).`},
 {from:.4,at:.47,k:'Hours 8–10 · the other person',t:'Breathing is not catching',pre:{vent:'closed',tx:false},
  txt:`The second person breathes the haze, but infection is a probability, not a certainty. Only 28 of 101 people with culture-confirmed TB in Kampala (27.7%) produced any culturable cough aerosol; in households, 69% of contacts of high-aerosol producers were newly infected, against 25–30% for the rest. And most people who become infected never develop TB disease: about a quarter of the world has been infected. <sup class="c" data-ref="Fennelly2012,JonesLopez2013,Houben2016" title="Source 173,239,257">173,239,257</sup>`,
  pt:`Sharing air with someone who has TB does not mean you will get it. Many people with TB give off very little.`,
  hook:`High-aerosol index case: the only predictor of new household infection, adjusted OR 4.81 (95% CI 1.20–19.23). <sup class="c" data-ref="JonesLopez2013" title="Source 257">257</sup>`},
 {from:.55,at:.62,k:'Hours 10–12 · windows open',t:'Fresh air',pre:{vent:'open',tx:false},
  txt:`Opening windows and doors in Lima hospitals gave a median 28 air changes per hour: more than double the 12 ACH recommended for mechanically ventilated high-risk rooms, and 18 times the closed rate. Pre-1950 rooms with big windows and high ceilings reached 40 ACH. Modelled over 24 hours with the office-outbreak source, 39% of susceptible people would be infected in mechanically ventilated rooms against 11% in old rooms with windows open. With fast air change, the haze clears within minutes. <sup class="c" data-ref="Escombe2007" title="Source 150">150</sup>`,
  pt:`Opening windows and doors swaps the room's air quickly, and it costs nothing.`,
  hook:`Windows and doors open: median 28 ACH vs 12 ACH for mechanical negative-pressure rooms. <sup class="c" data-ref="Escombe2007" title="Source 150">150</sup>`},
 {from:.75,at:.95,k:'Days 0–21 · effective treatment',t:'Treatment started',pre:{vent:'open',tx:true},
  txt:`The biggest lever is the source. In guinea-pig studies, transmission was minimal from 27 people with MDR-TB newly started on <i>effective</i> treatment, and cough-aerosol cultures fell within the first 3 weeks. Sputum smears and cultures turn negative much later, so "still smear-positive" is not the same as "still infectious". Here the source is drawn as a steep fall: the studies say "minimal", not a number. <sup class="c" data-ref="Dharmadhikari2014,Fennelly2004" title="Source 120,172">120,172</sup>`,
  pt:`Once someone takes TB medicine that works against their germ, they stop spreading it quickly, long before their tests turn negative.`,
  hook:`Drug susceptibility, not smear status, governs how fast infectiousness falls: rapid DST is an infection-control measure. <sup class="c" data-ref="Dharmadhikari2014,Escombe2008" title="Source 120,152">120,152</sup>`}
];
inits.spread=()=>{
  const svg=$('#spSvg'),rg=$('#spT');
  const S={vent:'closed',uv:false,mask:false,tx:false};let lastPh=-1,setSt=()=>{};
  const R=rng(1303),PT=[];for(let i=0;i<110;i++)PT.push({u:R(),v:R(),ph:R()*6.28,sp:.5+R(),bac:R()<.22,r:1.6+R()*1.4});
  const BIG=[],SM=[];for(let i=0;i<12;i++)BIG.push({vx:.25+R()*.55,vy:-.15+R()*.3,r:3.5+R()*2.5});for(let i=0;i<26;i++)SM.push({d:.18+R()*.5,a:(R()-.5)*1.1,r:3+R()*1.5,bac:R()<.3});
  function sync(){$$('[data-spv]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.spv===S.vent));$('#spUv').setAttribute('aria-pressed',S.uv);$('#spMask').setAttribute('aria-pressed',S.mask);$('#spTx').setAttribute('aria-pressed',S.tx)}
  /* time model: hours of shared air and days of treatment from t */
  function clock(t){if(t<.12)return{h:0,lab:'the cough'};if(t<.4){const h=lerp(0,8,ramp(t,.12,.4));return{h,lab:'hour '+f1(h)}}
    if(t<.55){const h=lerp(8,10,ramp(t,.4,.55));return{h,lab:'hour '+f1(h)}}if(t<.75){const h=lerp(10,12,ramp(t,.55,.75));return{h,lab:'hour '+f1(h)}}
    const d=lerp(0,21,ramp(t,.75,1));return{h:12,d,lab:'day '+Math.round(d)+' of treatment'}}
  function model(t){const c=clock(t),ach=SP_VENT[S.vent].ach;
    let txF=1;if(S.tx)txF=c.d!=null?Math.max(.02,Math.exp(-c.d/4)):.05;
    const q=SP_Q0*(S.mask?.44:1)*txF,uvF=S.uv?.3:1;
    const build=t<.12?0:1-Math.exp(-ach*Math.max(c.h,0));
    const C=q/(SP_V*ach)*build,Ceff=C*uvF,risk8=1-Math.exp(-SP_P*8*q*uvF/(SP_V*ach));
    return{c,ach,q,C,Ceff,risk8,build,txF}}
  const Cref=SP_Q0/(SP_V*1.6);
  function draw(t){
    const N=vb(svg,'720 400','400 560');
    const ph=phaseOf(SP_STEPS,t);if(ph!==lastPh){lastPh=ph;const p=SP_STEPS[ph].pre;if(p){S.vent=p.vent;S.tx=p.tx;sync()}}
    const M=model(t),dens=clamp(Math.sqrt(M.Ceff/Cref));
    const L=N?{x0:14,x1:386,y0:44,y1:332,s:112,meter:{x:20,y:394,w:360}}:{x0:24,x1:560,y0:44,y1:338,s:130,meter:{x:590,y:60,w:110}};
    const W=L.x1-L.x0,H=L.y1-L.y0,X=u=>L.x0+u*W,Y=v=>L.y0+v*H;
    const pA={x:X(.2),y:L.y1-L.s},pB={x:X(.8),y:L.y1-L.s},rH=L.s*.17,mA=[pA.x+rH*1.2,pA.y+rH*1.25],mB=[pB.x-rH*1.2,pB.y+rH*1.25];
    let s=`<defs>${marker('spAr','var(--air)')}<clipPath id="spClip"><rect x="${L.x0}" y="${L.y0}" width="${W}" height="${H}"/></clipPath></defs>`;
    /* room shell */
    s+=`<rect x="${L.x0}" y="${L.y0}" width="${W}" height="${H}" style="fill:var(--field);stroke:none"/>`;
    /* haze: grid shading, densest near the source until the air is mixed */
    const mix=t<.12?0:ramp(M.c.h,0,1.2),GX=N?14:22,GY=N?11:10;let hz='';
    for(let i=0;i<GX;i++)for(let j=0;j<GY;j++){const u=(i+.5)/GX,v=(j+.5)/GY,d=Math.hypot((u-.2)*W,(v-.42)*H)/W;
      let f=dens*(lerp(1.6*Math.exp(-d/.18),.75+.5*Math.exp(-d/.5),mix));
      if(S.vent!=='closed')f*=lerp(.8,1.2,u);if(S.uv&&v<.26)f*=.45;
      if(f>.02)hz+=`<rect x="${f1(X(i/GX))}" y="${f1(Y(j/GY))}" width="${f1(W/GX)}" height="${f1(H/GY)}" style="fill:var(--tb);opacity:${f1(clamp(f)*.3*100)/100}"/>`}
    s+=`<g clip-path="url(#spClip)" shape-rendering="crispEdges">${hz}</g>`;
    /* UV band */
    if(S.uv){s+=`<rect x="${L.x0}" y="${L.y0}" width="${W}" height="${f1(H*.26)}" style="fill:var(--vax);opacity:.12"/><line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(.26))}" y2="${f1(Y(.26))}" style="stroke:var(--vax);stroke-width:1;stroke-dasharray:4 4"/>`;
      [L.x0+4,L.x1-22].forEach((x,i)=>{s+=`<rect x="${f1(x)}" y="${f1(Y(.1))}" width="18" height="10" rx="2" style="fill:var(--vax)"/>`;for(let k=0;k<3;k++)s+=`<line x1="${f1(i?x:x+18)}" y1="${f1(Y(.1)+5)}" x2="${f1(i?x-26:x+44)}" y2="${f1(Y(.1)+5+(k-1)*9)}" style="stroke:var(--vax);stroke-width:1.2;opacity:.6"/>`});
      s+=`<text x="${f1(X(.5))}" y="${f1(Y(.26)-6)}" class="t-xs t-mid" style="fill:var(--vax)">upper-room UV zone: nuclei carried up by mixing are killed</text>`}
    /* airflow */
    const tau=t*420;
    if(S.vent==='open'){for(let k=0;k<3;k++){const yy=Y(.4+k*.18),off=(tau*3+k*40)%80;
        s+=`<path d="M${f1(L.x0-14)} ${f1(yy)}H${f1(L.x1+16)}" style="stroke:var(--air);stroke-width:1.6;fill:none;stroke-dasharray:18 62;stroke-dashoffset:${f1(-off)};opacity:.5"/>`}
      s+=`<path d="M${f1(L.x1-30)} ${f1(Y(.48))}h44" style="stroke:var(--air);stroke-width:2;fill:none" marker-end="url(#spAr)"/><path d="M${f1(L.x0-14)} ${f1(Y(.8))}h44" style="stroke:var(--air);stroke-width:2;fill:none" marker-end="url(#spAr)"/>`}
    else if(S.vent==='mech'){const sx=X(.12),ex=X(.88),off=(tau*2)%40;
      s+=`<rect x="${f1(sx-16)}" y="${L.y0}" width="32" height="6" style="fill:var(--muted)"/><rect x="${f1(ex-16)}" y="${L.y0}" width="32" height="6" style="fill:var(--muted)"/>`;
      s+=`<path d="M${f1(sx)} ${L.y0+8}C${f1(sx)} ${f1(Y(.7))} ${f1(ex)} ${f1(Y(.7))} ${f1(ex)} ${L.y0+10}" style="stroke:var(--air);stroke-width:1.6;fill:none;stroke-dasharray:10 30;stroke-dashoffset:${f1(-off)};opacity:.7" marker-end="url(#spAr)"/>`;
      s+=`<text x="${f1(sx)}" y="${L.y0+18}" class="t-xs t-mid">supply</text><text x="${f1(ex)}" y="${L.y0+18}" class="t-xs t-mid">exhaust</text>`}
    /* walls, window, door */
    const wy0=Y(.3),wy1=Y(.62),dy0=Y(.42);
    s+=`<path d="M${L.x0} ${L.y0}H${L.x1}V${f1(wy0)}M${L.x1} ${f1(wy1)}V${L.y1}H${L.x0}V${f1(dy0)}M${L.x0} ${f1(Y(.3))}V${L.y0}" style="fill:none;stroke:var(--ink);stroke-width:2.4"/>`;
    s+=S.vent==='open'?`<line x1="${L.x1}" y1="${f1(wy0)}" x2="${L.x1+16}" y2="${f1(wy0-10)}" style="stroke:var(--ink);stroke-width:2"/><line x1="${L.x0}" y1="${f1(dy0)}" x2="${L.x0-12}" y2="${f1(dy0+30)}" style="stroke:var(--ink);stroke-width:2"/>`
      :`<line x1="${L.x1}" y1="${f1(wy0)}" x2="${L.x1}" y2="${f1(wy1)}" style="stroke:var(--accent);stroke-width:3;opacity:.7"/><line x1="${L.x0}" y1="${f1(Y(.3))}" x2="${L.x0}" y2="${f1(dy0)}" style="stroke:var(--line);stroke-width:2.4"/><line x1="${L.x0}" y1="${f1(dy0)}" x2="${L.x0}" y2="${L.y1}" style="stroke:var(--muted);stroke-width:3"/>`;
    s+=`<text x="${f1(L.x1-4)}" y="${f1(wy1+12)}" class="t-xs t-end">window</text><text x="${f1(L.x0+4)}" y="${f1(dy0-6)}" class="t-xs">door</text>`;
    /* people */
    const coughing=t<.12||(Math.sin(tau*.9)>.93&&M.txF>.3);
    s+=person(pA.x,pA.y,L.s,'var(--tb)',{cough:coughing&&!S.mask,face:1,mask:S.mask});
    s+=person(pB.x,pB.y,L.s,'var(--muted)',{face:-1});
    s+=`<text x="${f1(pA.x)}" y="${L.y1+16}" class="t-xs t-mid" style="fill:var(--tb)">${N?'person with TB':'person with TB of the lungs'}</text><text x="${f1(pB.x)}" y="${L.y1+16}" class="t-xs t-mid">${N?'shares the air':'another person sharing the air'}</text>`;
    if(S.tx){s+=pill(pA.x-L.s*.42,pA.y+L.s*.55,18,'var(--dR)',{ang:-30});s+=`<text x="${f1(pA.x-L.s*.42)}" y="${f1(pA.y+L.s*.55-12)}" class="t-xs t-mid" style="fill:var(--rx)">${M.c.d!=null?'day '+Math.round(M.c.d):'on Rx'}</text>`}
    /* cough burst */
    if(t<.16){const k=ramp(t,0,.12),fade=1-ramp(t,.12,.16);
      BIG.forEach(b=>{const x=mA[0]+b.vx*k*W*.5,y=Math.min(L.y1-b.r,mA[1]+b.vy*k*H*.3+k*k*H*1.2);s+=droplet(x,y,b.r,{op:fade*(y>=L.y1-b.r-1?.5:1)})});
      SM.forEach(d=>{const e=1-Math.exp(-4*k),x=mA[0]+e*d.d*W*.55,y=mA[1]+Math.sin(d.a)*e*d.d*H*.5-k*8;s+=droplet(x,y,lerp(d.r,1.8,k),{bac:d.bac&&k>.4,op:fade})});
      if(k>.3)s+=`<text x="${f1(mA[0]+W*.1)}" y="${f1(L.y1-24)}" class="t-xs" style="fill:var(--air)">big droplets fall</text><text x="${f1(mA[0]+W*.16)}" y="${f1(mA[1]-H*.2)}" class="t-xs" style="fill:var(--air)">tiny nuclei float</text>`}
    /* floating droplet nuclei */
    const nVis=t<.12?0:Math.round(PT.length*dens*.9),flow=S.vent==='open'?.0035:S.vent==='mech'?.0016:.0003;
    let pts='';for(let i=0;i<nVis;i++){const p=PT[i];let u=((p.u+tau*flow*p.sp)%1+1)%1,v=p.v+.05*Math.sin(tau*.03*p.sp+p.ph);
      u=lerp(.2+(u-.2)*.25,u,mix);v=lerp(.42+(v-.42)*.3,v,mix);v=clamp(v,.03,.97);
      const dead=S.uv&&v<.26;pts+=droplet(X(u),Y(v),p.r,{bac:p.bac&&!dead,op:dead?.35:.95});
      if(dead)pts+=bacillus(X(u),Y(v),p.r*1.3,35,{w:p.r*.45,dead:true})}
    s+=`<g clip-path="url(#spClip)">${pts}</g>`;
    /* breathing in */
    if(t>=.12&&dens>.05){const br=.5+.5*Math.sin(tau*.12);s+=`<path d="M${f1(mB[0]-30)} ${f1(mB[1]-4)}Q${f1(mB[0]-14)} ${f1(mB[1]+2)} ${f1(mB[0]-2)} ${f1(mB[1])}" style="fill:none;stroke:var(--air);stroke-width:1.4;opacity:${f1(.3+.6*br)}" marker-end="url(#spAr)"/>`}
    /* labels: clock and ACH */
    s+=`<text x="${L.x0}" y="${L.y0-24}" class="t-lbl">${M.c.lab}</text><text x="${L.x0}" y="${L.y0-9}" class="t-xs">${SP_VENT[S.vent].n} · ${M.ach} air changes/hour</text>`;
    /* meter: modelled 8-hour risk for the other person */
    const m=L.meter,pc=Math.round(M.risk8*100);
    if(N){s+=`<text x="${m.x}" y="${m.y-14}" class="t-sm">IF THIS LASTED 8 HOURS · WELLS–RILEY ESTIMATE</text><rect x="${m.x}" y="${m.y}" width="${m.w}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${m.x}" y="${m.y}" width="${f1(m.w*M.risk8)}" height="18" rx="4" style="fill:var(--tb)"/><text x="${m.x+m.w}" y="${m.y+36}" class="t-big t-end">${pc}%</text><text x="${m.x}" y="${m.y+34}" class="t-xs">of susceptible people infected</text>`;
      s+=`<text x="${m.x}" y="${m.y+64}" class="t-sm">ROOM CONCENTRATION vs CLOSED</text><rect x="${m.x}" y="${m.y+72}" width="${m.w}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${m.x}" y="${m.y+72}" width="${f1(m.w*clamp(M.Ceff/Cref))}" height="12" rx="3" style="fill:var(--air)"/><text x="${m.x+m.w}" y="${m.y+100}" class="t-xs t-end">${Math.round(M.Ceff/Cref*100)}% of the closed-room level</text>`;
      s+=`<text x="${m.x}" y="${m.y+128}" class="t-xs" style="fill:var(--warn)">TEACHING MODEL · not a prediction for anyone</text>`}
    else{const mh=200,my=m.y+40;s+=`<text x="${m.x}" y="${m.y}" class="t-sm">8-HOUR</text><text x="${m.x}" y="${m.y+13}" class="t-sm">ESTIMATE</text><text x="${m.x}" y="${m.y+26}" class="t-xs">Wells–Riley</text>`;
      s+=`<rect x="${m.x+6}" y="${my}" width="28" height="${mh}" rx="5" style="fill:var(--panel-2)"/><rect x="${m.x+6}" y="${f1(my+mh*(1-M.risk8))}" width="28" height="${f1(mh*M.risk8)}" rx="5" style="fill:var(--tb)"/>`;
      s+=`<rect x="${m.x+60}" y="${my}" width="28" height="${mh}" rx="5" style="fill:var(--panel-2)"/><rect x="${m.x+60}" y="${f1(my+mh*(1-clamp(M.Ceff/Cref)))}" width="28" height="${f1(mh*clamp(M.Ceff/Cref))}" rx="5" style="fill:var(--air)"/>`;
      s+=`<text x="${m.x+20}" y="${my+mh+18}" class="t-big t-mid">${pc}%</text><text x="${m.x+20}" y="${my+mh+32}" class="t-xs t-mid">infected</text><text x="${m.x+74}" y="${my+mh+18}" class="t-big t-mid">${Math.round(M.Ceff/Cref*100)}</text><text x="${m.x+74}" y="${my+mh+32}" class="t-xs t-mid">% haze</text>`;
      s+=`<text x="${L.x0}" y="${L.y1+40}" class="t-xs" style="fill:var(--warn)">TEACHING MODEL · haze relative to the closed room; not a prediction for anyone</text>`}
    svg.innerHTML=s;setSt(ph);
    $('#spRead').innerHTML=`<span>source <b>${f1(M.q)} quanta/h</b>${S.mask?' (mask −56%)':''}${S.tx?' (on effective treatment)':''}</span><span>air changes <b>${M.ach}/h</b></span>${S.uv?'<span>UV <b>−70%</b> infectious doses</span>':''}<span>8-hour estimate <b>${pc}%</b></span>`;
    $('#spNote').innerHTML=noteHTML(SP_STEPS[ph]);
  }
  const stop=playWire(rg,$('#spPlay'),draw,24000,'Replay','spread');
  setSt=stepWire($('#spSteps'),SP_STEPS,rg,draw,stop);
  $$('[data-spv]').forEach(b=>b.addEventListener('click',()=>{S.vent=b.dataset.spv;sync();draw(+rg.value)}));
  [['#spUv','uv'],['#spMask','mask'],['#spTx','tx']].forEach(([id,k])=>$(id).addEventListener('click',()=>{S[k]=!S[k];sync();draw(+rg.value)}));
  draw(+rg.value);

  /* ---- Wells–Riley calculator ---- */
  const wsv=$('#wrSvg'),ACHS=[1.6,6,12,17,28,40];
  const wr=(q,p,h,ach,V)=>1-Math.exp(-q*p*h/(ach*V));
  function drawW(){const N=vb(wsv,'720 300','400 330');
    const q=+$('#wrQ').value,ach=+$('#wrAch').value,H=+$('#wrH').value,V=+$('#wrV').value,p=+$('#wrP').value;
    $('#wrHo').textContent=H+' h';$('#wrVo').textContent=V+' m³';$('#wrPo').textContent=p.toFixed(2);
    const xm=H<=24?24:40,C=N?{x0:44,x1:384,y0:30,y1:266}:{x0:60,x1:600,y0:26,y1:252};
    const X=h=>lerp(C.x0,C.x1,h/xm),Yv=v=>lerp(C.y1,C.y0,v);let s='';
    [0,.25,.5,.75,1].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Yv(v))}" y2="${f1(Yv(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Yv(v)+3)}" class="t-xs t-end">${v*100}%</text>`);
    (xm===24?[0,4,8,12,16,20,24]:[0,8,16,24,32,40]).forEach(h=>s+=`<text x="${f1(X(h))}" y="${C.y1+14}" class="t-xs t-mid">${h}</text>`);
    s+=`<text x="${C.x1}" y="${C.y1+28}" class="t-xs t-end">hours of shared air</text><text x="${C.x0}" y="${C.y0-12}" class="t-sm">SHARE OF SUSCEPTIBLE PEOPLE INFECTED (MODEL)</text>`;
    ACHS.forEach(a=>{const sel=a===ach;const d=pathFn(u=>1-wr(q,p,u*xm,a,V),C.x0,C.x1,C.y0,C.y1,80);
      s+=`<path d="${d}" style="fill:none;stroke:${sel?'var(--tb)':'var(--muted)'};stroke-width:${sel?2.8:1.1};opacity:${sel?1:.45}"/>`;
      if(!N||sel){const yv=wr(q,p,xm,a,V);s+=`<text x="${C.x1+6}" y="${f1(Yv(yv)+3)}" class="t-xs" style="fill:${sel?'var(--tb)':'var(--muted)'}">${a} ACH</text>`}});
    const P=wr(q,p,H,ach,V);s+=`<line x1="${f1(X(H))}" x2="${f1(X(H))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/><circle cx="${f1(X(H))}" cy="${f1(Yv(P))}" r="6" style="fill:var(--tb);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<text x="${f1(X(H)+(H>xm*.7?-10:10))}" y="${f1(Yv(P)-10)}" class="t-lbl${H>xm*.7?' t-end':''}">${(P*100).toFixed(P<.1?1:0)}%</text>`;
    if(N)s+=`<text x="${C.x0}" y="${C.y1+44}" class="t-xs">faint lines: the other ventilation rates</text>`;
    wsv.innerHTML=s;
    const P24=ACHS.map(a=>wr(q,p,24,a,V));
    $('#wrOut').innerHTML=`<div><div class="big-num">${(P*100).toFixed(P<.1?1:0)}%</div><small>predicted infected after ${H} h</small></div><div><b>${f1(q*H)}</b><small>quanta released into the room</small></div><div><b>${f1(ach*V*H)} m³</b><small>fresh air supplied</small></div><div><b>${Math.round(P24[2]*100)}% → ${Math.round(P24[5]*100)}%</b><small>24 h at 12 ACH vs 40 ACH</small></div>`;
    const big=q>=40;
    $('#wrNote').innerHTML=noteHTML({k:'Reading the model',t:big?'A very strong source beats ventilation':ach<6?'Little fresh air, fast build-up':'Diminishing returns',
      txt:big?`With a source like the most infectious patients on the Lima HIV–TB ward (226, 52 and 40 quanta per hour), even good ventilation leaves a high predicted risk. The office-outbreak model shows the same limit: as a source's infectiousness rises, building ventilation offers progressively less protection. That is why finding the source and starting effective treatment comes first. <sup class="c" data-ref="Escombe2008,Nardell1991" title="Source 152,340">152,340</sup>`
        :`Each extra unit of fresh air helps less than the last. In the office-outbreak model, raising outdoor air from about 15 to 25 cubic feet per minute per person cut infections by 33%, and going to 35 cut them by a further 19%. Mean monthly infectiousness on the Lima ward ranged from 0 to 44 quanta per hour, so the risk to someone breathing that air varied just as widely. <sup class="c" data-ref="Nardell1991,Escombe2007CID" title="Source 151,340">151,340</sup>`,
      pt:`More fresh air and less time together both lower the odds. A very infectious person, though, needs treatment, not just an open window.`,
      hook:`Quanta: HIV-positive patients in Lima averaged 8.2/h vs 1.25/h for HIV-negative patients in the 1950s studies. <sup class="c" data-ref="Escombe2007CID" title="Source 151">151</sup>`});
  }
  ['#wrQ','#wrAch'].forEach(id=>$(id).addEventListener('change',drawW));['#wrH','#wrV','#wrP'].forEach(id=>$(id).addEventListener('input',drawW));
  drawW();redraws.spread=(f=>()=>{f&&f();drawW()})(redraws.spread);

  /* ---- flip cards ---- */
  $$('#spFlips .flip').forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')));
};
/* =============== 1.4 infection to granuloma =============== */
const GR_IM=[
 {n:'Intact immunity',loose:0,c:'var(--good)',
  s:`Interferon-gamma and TNF hold the structure together. Mice lacking either still form granulomas, but cannot restrict bacillary growth and develop necrosis. <sup class="c" data-ref="Flynn1993,Flynn1995" title="Source 179,180">179,180</sup>`},
 {n:'TNF blocked',loose:.62,c:'var(--bad)',
  s:`Neutralising TNF unmasks TB. Of 70 cases reported after infliximab (median 12 weeks of therapy), 48 occurred after three or fewer infusions and 40 were extrapulmonary, 17 of them disseminated. In macaques, TNF neutralisation before infection produced fulminant disseminated disease by 8 weeks, and in animals with contained infection it caused reactivation in the majority. <sup class="c" data-ref="Keane2001,Lin2010" title="Source 266,290">266,290</sup>`},
 {n:'Low CD4 (HIV)',loose:.45,c:'var(--warn)',
  s:`HIV depletes exactly the cells TB control needs: <i>M. tuberculosis</i>-specific CD4 T cells were lost rapidly after HIV-1 infection while cytomegalovirus-specific cells persisted. TB risk rises unexpectedly early after HIV seroconversion, and HIV co-infection is associated with less cavitation. <sup class="c" data-ref="Geldmacher2010,Sonnenberg2005,Flynn2001" title="Source 181,195,437">181,195,437</sup>`}];
const GR_STEPS=[
 {from:0,at:.04,k:'Day 0 · the air sac',t:'One to five bacilli land',
  txt:`TB begins with deposition of <i>M. tuberculosis</i> in aerosol droplets onto alveolar surfaces; what happens next is determined largely by the host immune response, with contributions from host genetics, insults to immunity, nutrition and strain-to-strain differences in virulence. Review of the pathogenesis literature plus a guinea-pig airborne model concluded that the infecting dose is very low, usually 1–5 bacilli, and that the first implant can occur anywhere in the lung. <sup class="c" data-ref="Smith2003,Balasubramanian1994" title="Source 24,435">24,435</sup>`,
  pt:`It takes astonishingly few germs — often just one to five — to start an infection, and they have to reach the smallest air sacs to do it.`,
  hook:`Usual infecting dose 1–5 bacilli; first implant anywhere in the lung; cavitary disease characteristically apical. <sup class="c" data-ref="Balasubramanian1994" title="Source 24">24</sup>`},
 {from:.16,at:.21,k:'Days 0–4 · inside the macrophage',t:'Swallowed, but not digested',
  txt:`Early productive infection in mice happens almost exclusively inside airway-resident alveolar macrophages. Classic electron microscopy showed that phagosomes holding intact, multiplying bacilli rarely fused with lysosomes, while phagosomes holding damaged bacilli did. The vacuole fails to acidify below pH 6.3–6.5 and acquires the lysosomal membrane protein LAMP-1 but <b>not</b> the proton-ATPase that would acidify it; the block is an active, lipid-mediated subversion of PI3-phosphate-dependent trafficking rather than a passive failure. Infected — but not uninfected — alveolar macrophages then relocate to the lung interstitium, a step that requires an intact ESX-1 secretion system. <sup class="c" data-ref="Cohen2018,Armstrong1971,SturgillKoszycki1994,Vergne2005" title="Source 16,77,449,493">16,77,449,493</sup>`,
  pt:`The cell that is supposed to destroy the germ swallows it, but the digestion never finishes. The germ lives and multiplies inside the very cell sent to kill it.`,
  hook:`Mycobacterial phagosomes stall at pH 6.3–6.5, acquire LAMP-1 and exclude the vesicular proton-ATPase. <sup class="c" data-ref="SturgillKoszycki1994" title="Source 449">449</sup>`},
 {from:.34,at:.39,k:'Day ~10 · the lymph node',t:'A ten-day head start',
  txt:`Dissemination precedes immunity. In mice, bacteria reach the pulmonary lymph nodes 9–11 days after aerosol inoculation, specific T cells appear there 2–3 days later, and spread to spleen and liver occurs 11–14 days after infection — always before specific T cells arrive in that organ. Initial CD4 activation happens in the lung-draining mediastinal node and depends on bacteria producing antigen in the node itself, despite 100-fold more bacteria in the lungs. With ESAT-6-specific transgenic CD4 cells, priming began only after 10 days of infection; a larger inoculum advanced it by two days. Proposed reasons for the delay include inhibition of apoptosis, slow dendritic-cell migration and regulatory T cells. <sup class="c" data-ref="Chackerian2002,Wolf2008,Reiley2008,Urdahl2011" title="Source 67,396,480,524">67,396,480,524</sup>`,
  pt:`The body needs a few weeks to learn to recognise the germ. That gap is why a skin test or blood test done straight after exposure can still be negative, and why contacts are re-tested later.`,
  hook:`Priming starts in the mediastinal node, only after about 10 days in mice — the biological reason for the window before tuberculin or IGRA conversion. <sup class="c" data-ref="Reiley2008,Wolf2008" title="Source 396,524">396,524</sup>`},
 {from:.52,at:.57,k:'Weeks 2–6 · T cells answer',t:'Interferon-gamma and TNF arrive',
  txt:`CD4 and CD8 T cells, interferon-gamma, IL-12, TNF and IL-6, and macrophages are the core of the protective response. Mice with a disrupted interferon-gamma gene still form granulomas but make no reactive nitrogen intermediates, cannot restrict bacillary growth, show heightened tissue necrosis and die rapidly; exogenous interferon-gamma delayed but did not prevent that course. TNF is equally required: neutralising it, or deleting the 55 kDa receptor, abolished protection, and granulomas formed in equal numbers in control and TNF-deficient mice — but necrosis occurred only in the TNF-deficient animals. <sup class="c" data-ref="Flynn2001,Flynn1993,Cooper1993,Flynn1995" title="Source 88,179,180,181">88,179,180,181</sup>`,
  pt:`Immune cells arrive and send chemical signals that switch the swallowing cells into a more aggressive state. The signals matter more than the wall itself.`,
  hook:`Interferon-gamma and TNF are each essential in mice; granulomas still form without them, but necrosis and uncontrolled growth follow. <sup class="c" data-ref="Flynn1993,Flynn1995" title="Source 179,180">179,180</sup>`},
 {from:.68,at:.74,k:'Weeks to months · the granuloma',t:'The tubercle organises',
  txt:`Macrophages flatten into an epithelioid ring, some fuse into multinucleated Langhans giant cells, a cuff of lymphocytes gathers at the edge, a fibrous capsule forms and the centre turns to caseous necrosis. A lipid-laden "foamy" population appears: in a human in-vitro model, oxygenated mycolic acids drove monocyte-derived macrophages to become foamy, and inside them mycobacteria stopped replicating and switched to a dormant state. The centre is severely hypoxic — direct measurement in living infected rabbits found even 3 mm lesions at 1.6 ± 0.7 mm Hg — which is why metronidazole, active only at low oxygen, works in that model. <sup class="c" data-ref="Pagan2018,Peyron2008,Russell2009,Via2008" title="Source 364,373,408,496">364,373,408,496</sup>`,
  pt:`The body builds a tight ball of cells around the germs. Inside there is almost no oxygen and the centre can turn into soft, cheese-like material that both the immune system and medicines struggle to reach.`,
  hook:`Granuloma anatomy: caseous centre → epithelioid macrophages and Langhans giant cells → lymphocyte cuff → fibrous capsule. Rabbit lesions measured 1.6 ± 0.7 mm Hg. <sup class="c" data-ref="Via2008" title="Source 496">496</sup>`},
 {from:.86,at:.94,k:'Months to years · two endings',t:'Contained, or broken open',
  txt:`Most granulomas hold. Pre-antibiotic autopsy series found 96–98% of visible calcified tuberculous lung lesions in people who died of other causes to be sterile, and in macaques some lesions are sterilised by the host even while others progress in the same animal. Where containment fails, the caseous centre liquefies and empties into an airway. In lungs removed for incurable TB, numerous bacilli were found only at the surface of cavities — granulomas with a patent connection to an airway — and additional drug resistance was acquired preferentially there; CD4 and CD8 T cells were selectively absent from the cavity's luminal surface. Matrix metalloproteinase-1 drives that tissue destruction. Cavitation is associated with poor outcomes, relapse, higher transmission and the development of drug resistance. <sup class="c" data-ref="Behr2018,Lin2014,Kaplan2003,Elkington2011,Urbanowski2020" title="Source 34,147,260,291,479">34,147,260,291,479</sup>`,
  pt:`If the ball of cells holds, the lesion can shrink, scar and turn chalky, and most people never know. If it breaks into an airway it leaves a hole full of germs — and that is what makes TB contagious.`,
  hook:`Neutrophils, not macrophages, dominate the airways in active TB: 86.6% ± 2.2% of sputum cells, with 67.6% ± 5.6% of intracellular bacilli inside them. Bacilli in cavities are the shortest (1.9 µm), consistent with rapid replication just before transmission. <sup class="c" data-ref="Eum2010" title="Source 156">156</sup>`}];
const GR_PARTS=[
 {id:'cas',n:'Caseous centre',s:'soft, cheese-like necrosis',
  t:'Caseous necrosis, and almost no oxygen',
  txt:`The centre of an established granuloma dies and turns into a soft, cheese-like mass. Pimonidazole imaging in guinea pigs, rabbits and non-human primates showed discrete hypoxia around necrotic and caseous regions, and direct fibre-optic measurement in living infected rabbits found even small 3 mm lesions severely hypoxic at 1.6 ± 0.7 mm Hg. Metronidazole, which is active in vitro only at low oxygen, markedly reduced lung bacterial burden in rabbits. <sup class="c" data-ref="Via2008" title="Source 496">496</sup>`,
  pt:`The middle of the lump has almost no oxygen and no blood supply, which is exactly where medicines struggle to reach.`,
  hook:`Only the rifamycins fully sterilised caseum ex vivo; moxifloxacin penetrates it poorly, matching its failure to shorten treatment in trials. <sup class="c" data-ref="Sarathy2018,Prideaux2015" title="Source 379,411">379,411</sup>`},
 {id:'epi',n:'Epithelioid macrophages',s:'flattened, interlocking cells',
  t:'Macrophages that change shape',
  txt:`Granulomas are organised aggregates of macrophages, often with characteristic morphological changes, plus other immune cells, forming in response to persistent stimuli that a single macrophage cannot eradicate. They unfold as a stepwise programme of macrophage activations and transformations that recruit further cells and change the structure. The lung holds two distinct macrophage lineages — embryonically derived alveolar and recruited monocyte-derived interstitial — and the two respond divergently inside the same granuloma. <sup class="c" data-ref="Pagan2018,Flynn2011" title="Source 182,364">182,364</sup>`,
  pt:`The swallowing cells flatten out and interlock like paving stones, forming the wall of the ball.`,
  hook:`Granuloma formation and maintenance depend on macrophage–T cell cross-talk. <sup class="c" data-ref="Flynn2011" title="Source 182">182</sup>`},
 {id:'giant',n:'Langhans giant cells',s:'fused cells, nuclei in a horseshoe',
  t:'Several macrophages fused into one',
  txt:`Multinucleated giant cells are one of the characteristic morphological changes of granulomatous inflammation, in which macrophages fuse rather than remaining separate cells. Granuloma development, degeneration and necrosis is the hallmark of <i>M. tuberculosis</i> infection, and formation is facilitated by the emerging acquired response, with cytokines and chemokines controlling integrity. <sup class="c" data-ref="Pagan2018,Orme2014" title="Source 363,364">363,364</sup>`,
  pt:`Some of the cells merge into one very large cell with its nuclei pushed around the edge — a classic sight under the microscope.`,
  hook:`Multinucleated giant cells with peripheral nuclei in a horseshoe are the named Langhans type seen in tuberculous granulomas. <sup class="c" data-ref="Pagan2018" title="Source 364">364</sup>`},
 {id:'lymph',n:'Lymphocyte cuff',s:'T cells around the rim',
  t:'The ring of T cells',
  txt:`T cells gather at the margin of the granuloma, and the local response is far smaller than the blood suggests: on average only about 8% of granuloma T cells produce cytokine after stimulation with <i>M. tuberculosis</i> antigens. Sterile granulomas had modestly higher frequencies of T cells making IL-17, TNF and type-1 cytokines; bacterial burden correlated inversely with TNF and those responses; and blood responses did not reflect granuloma responses. <sup class="c" data-ref="Gideon2015" title="Source 198">198</sup>`,
  pt:`A ring of immune cells surrounds the lump. A blood test cannot tell you what that ring is doing.`,
  hook:`About 8% of granuloma T cells are cytokine-positive; blood responses do not mirror granuloma responses. <sup class="c" data-ref="Gideon2015" title="Source 198">198</sup>`},
 {id:'fib',n:'Fibrous capsule',s:'the scar that walls it off',
  t:'Walling the lesion off',
  txt:`A fibrous rim closes the structure. Human granulomas are spatially organised rather than uniform: laser-capture microdissection with mass spectrometry and confocal microscopy across six people with TB found a pro-inflammatory centre — antimicrobial peptides, reactive oxygen species, pro-inflammatory eicosanoids — and a comparatively anti-inflammatory rim around the caseum. Pre-antibiotic autopsy series found 96–98% of visible calcified lung lesions in people who died of other causes to be sterile. <sup class="c" data-ref="Marakalala2016,Behr2018" title="Source 34,308">34,308</sup>`,
  pt:`Scar tissue closes around the lump. Over years it can turn chalky with calcium, and most such old lesions hold no living germs at all.`,
  hook:`96–98% of calcified tuberculous lung lesions in pre-antibiotic autopsy series were sterile. <sup class="c" data-ref="Behr2018" title="Source 34">34</sup>`},
 {id:'foam',n:'Foamy macrophages',s:'lipid-laden, and useful to the bacillus',
  t:'Lipid droplets, and a dormant bacillus',
  txt:`Foamy macrophages are a granuloma-specific lipid-laden population, and a key participant both in sustaining persistent bacteria and in the tissue pathology that leads to cavitation and release of infectious bacilli. In a human in-vitro granuloma model, oxygenated mycolic acids from <i>M. tuberculosis</i> triggered monocyte-derived macrophages to become foamy; inside them the mycobacteria stopped replicating, switched to a dormant non-replicative state, and the bacterium-containing phagosomes migrated to and were engulfed by host lipid bodies. <sup class="c" data-ref="Russell2009,Peyron2008" title="Source 373,408">373,408</sup>`,
  pt:`Some cells fill up with fat droplets, and the germs move in and go quiet — fed and sheltered at the same time.`,
  hook:`Foamy macrophages sustain persistent bacteria and contribute to the pathology that produces cavities. <sup class="c" data-ref="Russell2009" title="Source 408">408</sup>`}];
inits.granuloma=()=>{
  const svg=$('#grSvg'),rg=$('#grT');let grIm=0;
  const INK='stroke:var(--ink);stroke-width:1.6;fill:none';
  function grDend(x,y,r,op){let s=`<g style="opacity:${op==null?1:op}">`;
    for(let i=0;i<9;i++){const a=i/9*Math.PI*2;s+=`<line x1="${f1(x+Math.cos(a)*r*.7)}" y1="${f1(y+Math.sin(a)*r*.7)}" x2="${f1(x+Math.cos(a)*r*1.5)}" y2="${f1(y+Math.sin(a)*r*1.5)}" style="stroke:var(--mac-line);stroke-width:1.3"/>`}
    s+=`<path d="${blob(x,y,r,13,1,1,12,.2)}" style="fill:var(--mac);fill-opacity:.85;stroke:var(--mac-line);stroke-width:1.2"/>`;
    s+=`<ellipse cx="${f1(x-r*.2)}" cy="${f1(y)}" rx="${f1(r*.3)}" ry="${f1(r*.24)}" style="fill:var(--nuc);opacity:.75"/>`;
    return s+'</g>'}
  function grTag(x,y,txt,col,op,anchor){
    return `<text x="${f1(x)}" y="${f1(y)}" class="t-xs${anchor?' '+anchor:''}" style="fill:${col};opacity:${op==null?1:f1(op)}">${txt}</text>`}
  /* ---- scene 1: the air sac ---- */
  function grAlv(L,a){
    const A=alveolus(L.cx,L.cy,L.sc*104);let s=A.svg;
    const [sx,sy,sr]=A.sacs[0],dy=lerp(L.y0-10,sy,ease(clamp(a*1.6)));
    if(a<.62)s+=droplet(sx,dy,9,{bac:true});
    else{const n=Math.min(5,1+Math.floor((a-.62)*12));
      for(let i=0;i<n;i++){const q=rng(i*9+4);s+=bacillus(sx+(q()-.5)*sr*.9,sy+(q()-.5)*sr*.9,7,q()*180)}
      s+=grTag(sx,sy-sr-8,n+' bacilli','var(--tb)',1,'t-mid')}
    s+=grTag(L.cx,L.y0+34,'an alveolus: five air sacs and a capillary','var(--muted)',1,'t-mid');
    s+=grTag(L.cx,L.y1-10,a<.62?'a droplet nucleus settles into a sac':'the usual infecting dose is 1–5 bacilli','var(--ink)',1,'t-mid');
    return s}
  /* ---- scene 2: the macrophage ---- */
  function grMac(L,a){
    const out=ramp(a,.66,1),mx=L.x0+L.sc*136,cy=L.cy+out*L.sc*50;let s='';
    s+=`<circle cx="${f1(mx)}" cy="${f1(L.cy-L.sc*12)}" r="${f1(L.sc*86)}" style="fill:var(--field);stroke:var(--lung-line);stroke-width:1.8"/>`;
    s+=grTag(mx,L.cy-L.sc*104,'one air sac','var(--muted)',1,'t-mid');
    s+=`<rect x="${L.x0+8}" y="${f1(L.cy+L.sc*84)}" width="${f1(L.x1-L.x0-16)}" height="${f1(L.y1-14-(L.cy+L.sc*84))}" rx="10" style="fill:var(--lung);fill-opacity:.35;stroke:var(--lung-line);stroke-dasharray:4 3"/>`;
    s+=grTag(L.x0+18,L.cy+L.sc*100,'lung interstitium','var(--lung-line)');
    const n=1+Math.floor(clamp(a*1.7)*7);
    s+=macrophage(mx,cy,L.sc*44,{bac:n,seed:5});
    s+=`<circle cx="${f1(mx+L.sc*7)}" cy="${f1(cy)}" r="${f1(L.sc*25)}" style="fill:none;stroke:var(--mac-line);stroke-width:1.4;stroke-dasharray:3 2"/>`;
    s+=grTag(mx+L.sc*7,cy-L.sc*29,'phagosome','var(--mac-line)',1,'t-mid');
    const gx=L.gx,gy0=L.gy0,gy1=L.gy1,pH=lerp(7.4,6.4,ease(clamp(a*1.5))),Y=p=>lerp(gy0,gy1,(7.4-p)/(7.4-4.3));
    s+=`<rect x="${gx}" y="${gy0}" width="14" height="${f1(gy1-gy0)}" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${gx}" y="${gy0}" width="14" height="${f1(Y(pH)-gy0)}" rx="7" style="fill:var(--accent);opacity:.5"/>`;
    [7.4,6.4,5,4.3].forEach(p=>s+=`<line x1="${gx-4}" x2="${gx+18}" y1="${f1(Y(p))}" y2="${f1(Y(p))}" style="stroke:var(--muted);stroke-width:${p===6.4?1.6:.8}"/>`+grTag(gx+22,Y(p)+4,'pH '+p.toFixed(1),p===6.4?'var(--tb)':'var(--muted)'));
    s+=`<path d="M${gx-10} ${f1(Y(pH))}l8 -4v8Z" style="fill:var(--ink)"/>`;
    s+=grTag(gx-4,gy0-10,'phagosome pH','var(--muted)');
    ['stalls here:','no proton-ATPase,','LAMP-1 present'].forEach((t2,k)=>s+=grTag(gx+22,Y(6.4)+18+k*13,t2,'var(--tb)'));
    s+=grTag(gx+22,Y(4.3)+18,'a normal phagolysosome','var(--muted)');
    s+=grTag((L.x0+L.x1)/2,L.y1-22,out>.5?'the infected macrophage moves into the interstitium (needs ESX-1)':'bacilli multiply inside the cell: '+n,'var(--ink)',1,'t-mid');
    return s}
  /* ---- scene 3: priming in the node ---- */
  function grNode(L,a){
    const lx=L.x0+L.sc*56,ly=L.cy+L.sc*22,nx=L.x1-L.sc*104,ny=L.cy-L.sc*44,day=Math.round(lerp(0,12,a));let s='';
    s+=`<path d="M${f1(lx)} ${f1(ly)}Q${f1((lx+nx)/2)} ${f1(ly-L.sc*72)} ${f1(nx)} ${f1(ny)}" style="fill:none;stroke:var(--accent);stroke-width:7;opacity:.25"/>`;
    s+=grTag((lx+nx)/2,ly-L.sc*46,'lymphatic','var(--accent)',1,'t-mid');
    s+=macrophage(lx,ly,L.sc*24,{bac:3,seed:5});
    s+=grTag(lx,ly+L.sc*38,'the lung focus','var(--muted)',1,'t-mid');
    s+=`<path d="${blob(nx,ny,L.sc*42,7,1.15,.85,14,.14)}" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.6"/>`;
    s+=grTag(L.x1-10,ny-L.sc*54,'draining (mediastinal)','var(--accent)',1,'t-end');
    s+=grTag(L.x1-10,ny-L.sc*54+13,'lymph node','var(--accent)',1,'t-end');
    const p=ease(clamp(a*1.25)),dx=lerp(lx,nx,p),dyy=lerp(ly,ny,p)-Math.sin(Math.PI*p)*L.sc*42;
    s+=grDend(dx,dyy,L.sc*12,1);
    s+=grTag(clamp(dx,L.x0+90,L.x1-90),dyy-L.sc*22,'dendritic cell with antigen','var(--mac-line)',1,'t-mid');
    const prime=ramp(a,.72,1);
    for(let i=0;i<7;i++){const an=i/7*Math.PI*2;s+=tcell(nx+Math.cos(an)*L.sc*24,ny+Math.sin(an)*L.sc*17,L.sc*7,{op:f1(prime),act:prime>.6})}
    s+=`<rect x="${L.x0+10}" y="${L.y1-52}" width="${f1(L.x1-L.x0-20)}" height="20" rx="10" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${L.x0+10}" y="${L.y1-52}" width="${f1((L.x1-L.x0-20)*clamp(day/12))}" height="20" rx="10" style="fill:var(--accent);opacity:.35"/>`;
    s+=grTag((L.x0+L.x1)/2,L.y1-38,'day '+day+' after infection (mouse aerosol model)','var(--ink)',1,'t-mid');
    s+=grTag((L.x0+L.x1)/2,L.y1-18,prime>.6?'T cells primed → a skin test or IGRA can now turn positive':'no primed T cells yet → a skin test or IGRA can still be negative',prime>.6?'var(--good)':'var(--warn)',1,'t-mid');
    return s}
  /* ---- scene 4: the T-cell answer ---- */
  function grTh1(L,a){
    const lx=L.cx-L.sc*40,ly=L.cy,nx=L.x1-L.sc*58;let s='';
    s+=`<path d="${blob(nx,L.cy-L.sc*54,L.sc*34,7,1.15,.85,14,.14)}" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.4"/>`;
    s+=grTag(nx,L.cy-L.sc*96,'lymph node','var(--accent)',1,'t-mid');
    for(let i=0;i<5;i++){const an=i/5*Math.PI*2;s+=tcell(nx+Math.cos(an)*L.sc*20,L.cy-L.sc*54+Math.sin(an)*L.sc*15,L.sc*6,{act:true})}
    const act=ease(clamp(a*1.2));
    for(let i=0;i<4;i++){const p=clamp(act*1.3-i*.12),tx=lerp(nx-L.sc*30,lx+L.sc*30,p),ty=lerp(L.cy-L.sc*46,ly-L.sc*10+i*L.sc*16,p);
      if(p>0)s+=tcell(tx,ty,L.sc*8,{act:true,op:f1(clamp(p*2))})}
    for(let i=0;i<6;i++){const an=i/6*Math.PI*2,d=L.sc*(34+28*act);
      s+=macrophage(lx+Math.cos(an)*d,ly+Math.sin(an)*d*.78,L.sc*17,{kind:act>.55?'epithelioid':'resting',seed:i+2,bac:act>.55?0:1})}
    s+=clump(lx,ly,4,L.sc*12,{len:L.sc*7,seed:4});
    s+=grTag(lx,ly-L.sc*78,act>.55?'macrophages activated: epithelioid':'macrophages, not yet activated','var(--mac-line)',1,'t-mid');
    [['IFN-γ',-1],['TNF',1]].forEach(([n,k],i)=>{const op=f1(ramp(a,.3+i*.15,.6+i*.15));
      s+=`<rect x="${f1(L.cx+L.sc*16)}" y="${f1(L.cy+k*L.sc*34-11)}" width="58" height="22" rx="11" style="fill:var(--tcell);opacity:${op*.25}"/>`;
      s+=grTag(L.cx+L.sc*16+29,L.cy+k*L.sc*34+4,n,'var(--tcell)',op,'t-mid')});
    s+=grTag((L.x0+L.x1)/2,L.y1-8,'without interferon-gamma or TNF, granulomas still form — but necrosis and uncontrolled growth follow','var(--ink)',1,'t-mid');
    return s}
  /* ---- scene 5: the granuloma organises ---- */
  function grGran(L,a){
    const st=lerp(.08,.86,ease(a)),lo=GR_IM[grIm].loose*ramp(a,.25,.7),r=L.sc*96;let s='';
    s+=granuloma(L.cx,L.cy,r,st,{loose:lo,seed:21});
    const LB=[[.2,'macrophages gather',-1,-1.12],[.38,'epithelioid ring, giant cells',1,-.85],[.5,'lymphocyte cuff',-1,.5],[.62,'caseous centre',1,.2],[.78,'fibrous capsule',1,.95]];
    LB.forEach(([k,n,ux,uy])=>{if(st<k)return;const op=f1(ramp(st,k,k+.06));
      const px=ux>0?L.x1-12:L.x0+12,py=L.cy+uy*r*.98;
      s+=`<line x1="${f1(L.cx+ux*r*.72)}" y1="${f1(L.cy+uy*r*.7)}" x2="${f1(px+(ux>0?-4:4))}" y2="${f1(py)}" style="stroke:var(--muted);stroke-width:.9;opacity:${op*.7}"/>`;
      s+=grTag(px,py+3,n,'var(--ink)',op,ux>0?'t-end':'')});
    if(st>.6)s+=grTag(L.cx,L.cy+4,'1.6 mm Hg','var(--ink)',f1(ramp(st,.6,.7)),'t-mid');
    if(lo>.1){s+=`<rect x="${f1(L.cx-96)}" y="${f1(L.y1-30)}" width="192" height="22" rx="11" style="fill:${GR_IM[grIm].c};opacity:.18"/>`;
      s+=grTag(L.cx,L.y1-15,GR_IM[grIm].n+': the structure loosens',GR_IM[grIm].c,1,'t-mid')}
    else s+=grTag(L.cx,L.y1-15,'an organised granuloma: container and niche at once','var(--ink)',1,'t-mid');
    return s}
  /* ---- scene 6: two endings ---- */
  function grEnd(L,a){
    const r=L.sc*56,ax=L.cx-L.sc*106,bx=L.cx+L.sc*106,cy=L.cy-L.sc*2,lo=GR_IM[grIm].loose;let s='';
    s+=granuloma(ax,cy,r,.9,{calc:ease(clamp(a*1.4)),loose:lo*.4,seed:21,bac:0});
    s+=granuloma(bx,cy,r,lerp(.86,1,ease(clamp(a*1.3))),{loose:lo,seed:33});
    s+=grTag(ax,cy-r-30,'CONTAINED','var(--good)',1,'t-mid');
    s+=grTag(ax,cy-r-16,'scarred, then calcified','var(--muted)',1,'t-mid');
    s+=grTag(bx,cy-r-30,'CAVITY','var(--bad)',1,'t-mid');
    s+=grTag(bx,cy-r-16,'opens into an airway','var(--muted)',1,'t-mid');
    ['96–98% of calcified','lesions were sterile','at autopsy'].forEach((t2,k)=>s+=grTag(ax,cy+r+20+k*13,t2,'var(--ink)',1,'t-mid'));
    ['bacilli only at the','cavity surface; T cells','are absent there'].forEach((t2,k)=>s+=grTag(bx,cy+r+20+k*13,t2,'var(--ink)',1,'t-mid'));
    const V=[['Both endings occur in the same person, lesion by lesion.','var(--good)'],
             ['TNF blocked: TB often appears early; 40 of 70 reported cases were extrapulmonary.','var(--bad)'],
             ['Low CD4: TB risk rises early after HIV infection, with less cavitation.','var(--warn)']][grIm];
    s+=`<rect x="${L.x0+10}" y="${L.y1-34}" width="${f1(L.x1-L.x0-20)}" height="24" rx="12" style="fill:${V[1]};opacity:.16"/>`;
    s+=grTag((L.x0+L.x1)/2,L.y1-18,V[0],V[1],1,'t-mid');
    return s}
  /* ---- the lung inset ---- */
  function grLung(L,p){
    const les=[{side:'R',u:.45,v:.52,r:6,kind:'nodule'}];
    if(p>=2)les.push({side:'R',u:.08,v:.3,r:7,kind:'node'});
    if(p>=4)les.push({side:'R',u:.45,v:.52,r:8,kind:'infiltrate'});
    if(p>=5)les.push({side:'R',u:.42,v:.12,r:8,kind:'cavity'});
    let s=lung(L.lx,L.ly,L.ls,{lesions:les}).svg;
    const KEY=[['first focus in the lung','var(--caseum)',0],['draining hilar node','var(--caseum)',2],['apical cavity','var(--tb)',5]];
    let k=0;KEY.forEach(([n,c,from])=>{if(p<from)return;const y=L.ly+L.ls*206+k*14;k++;
      s+=`<circle cx="${f1(L.lx+6)}" cy="${f1(y-4)}" r="4" style="fill:${c};stroke:var(--mac-line);stroke-width:.8"/>`;
      s+=grTag(L.lx+16,y,n,'var(--muted)')});
    s+=grTag(L.lx,L.ly-8,'THE SAME EVENTS, SEEN FROM OUTSIDE','var(--muted)');
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const L=N?{sc:.74,x0:10,y0:208,x1:390,y1:552,cx:200,cy:382,gx:286,gy0:250,gy1:366,lx:112,ly:28,ls:.56}
            :{sc:1,x0:20,y0:28,x1:470,y1:352,cx:238,cy:178,gx:316,gy0:70,gy1:236,lx:506,ly:44,ls:.76};
    const p=phaseOf(GR_STEPS,t);
    let s=grLung(L,p);
    s+=`<rect x="${L.x0}" y="${L.y0}" width="${f1(L.x1-L.x0)}" height="${f1(L.y1-L.y0)}" rx="14" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=grTag(L.x0+12,L.y0+18,GR_STEPS[p].k.toUpperCase(),'var(--tb)');
    if(p===0)s+=grAlv(L,ramp(t,0,.15));
    else if(p===1)s+=grMac(L,ramp(t,.17,.33));
    else if(p===2)s+=grNode(L,ramp(t,.35,.51));
    else if(p===3)s+=grTh1(L,ramp(t,.53,.67));
    else if(p===4)s+=grGran(L,ramp(t,.69,.85));
    else s+=grEnd(L,ramp(t,.87,1));
    svg.innerHTML=s;
    setSt(p);
    $('#grRead').innerHTML=`<span>step <b>${p+1} of 6</b></span><span>when <b>${GR_STEPS[p].k.split(' · ')[0]}</b></span><span>immune state <b>${GR_IM[grIm].n}</b></span>`;
    $('#grNote').innerHTML=noteHTML(GR_STEPS[p])+`<div class="kv"><div><dt>${GR_IM[grIm].n}</dt><dd>${GR_IM[grIm].s}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#grPlay'),draw,34000,'Replay','granuloma');
  const setSt=stepWire($('#grSteps'),GR_STEPS,rg,draw,stop);
  $$('[data-gi]').forEach(b=>b.addEventListener('click',()=>{grIm=+b.dataset.gi;
    $$('[data-gi]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(+rg.value<.68){stop();rg.value=.78}
    draw(+rg.value)}));
  draw(+rg.value);

  /* ---- pick a part ---- */
  const ps=$('#grPartSvg');let grSel=0;
  $('#grParts').innerHTML=GR_PARTS.map((P,i)=>`<button data-gp="${i}" aria-pressed="${i===0}"><b>${P.n}</b><small>${P.s}</small></button>`).join('');
  function drawP(){
    const N=vb(ps,'520 330','400 330'),P=GR_PARTS[grSel];
    const cx=N?190:214,cy=168,r=N?124:136;let s='';
    s+=granuloma(cx,cy,r,.82,{seed:21,bac:4});
    s+=grTag(N?14:20,26,P.n.toUpperCase(),'var(--tb)');
    if(P.id==='cas')s+=`<circle cx="${cx}" cy="${cy}" r="${f1(r*.4)}" style="fill:none;stroke:var(--tb);stroke-width:2.6"/>`;
    if(P.id==='epi')s+=`<circle cx="${cx}" cy="${cy}" r="${f1(r*.6)}" style="fill:none;stroke:var(--tb);stroke-width:2.6;stroke-dasharray:7 5"/>`;
    if(P.id==='giant')[[-.8,-.25],[.7,.45]].forEach(([u2,v])=>s+=`<circle cx="${f1(cx+u2*r*.42)}" cy="${f1(cy+v*r*.42)}" r="${f1(r*.2)}" style="fill:none;stroke:var(--tb);stroke-width:2.6"/>`);
    if(P.id==='lymph')s+=`<circle cx="${cx}" cy="${cy}" r="${f1(r*.88)}" style="fill:none;stroke:var(--tb);stroke-width:2.6;stroke-dasharray:4 4"/>`;
    if(P.id==='fib')s+=`<circle cx="${cx}" cy="${cy}" r="${f1(r)}" style="fill:none;stroke:var(--tb);stroke-width:3"/>`;
    if(P.id==='foam')[[.1,-.62],[-.5,.5]].forEach(([u2,v],i)=>{s+=macrophage(cx+u2*r,cy+v*r,r*.14,{kind:'foamy',seed:40+i});
        s+=`<circle cx="${f1(cx+u2*r)}" cy="${f1(cy+v*r)}" r="${f1(r*.2)}" style="fill:none;stroke:var(--tb);stroke-width:2.4"/>`});
    s+=grTag(cx,cy+r+26,'a granuloma in section · '+P.s,'var(--muted)',1,'t-mid');
    ps.innerHTML=s;
    $('#grPartNote').innerHTML=noteHTML({k:P.n,t:P.t,txt:P.txt,pt:P.pt,hook:P.hook});
  }
  $('#grParts').addEventListener('click',e=>{const b=e.target.closest('[data-gp]');if(!b)return;
    grSel=+b.dataset.gp;$$('[data-gp]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP()});
  drawP();
  const prevR=redraws.granuloma;redraws.granuloma=()=>{prevR&&prevR();drawP()};
};
/* =============== 1.5 TB infection vs TB disease =============== */
/* The grid combines separate published estimates. Cumulative disease is the published
   lifetime risk for the group, distributed over time with the published shares of cases
   by 1, 2 and 5 years; self-clearance follows Emery 2021; the subclinical share of
   prevalent disease follows Frascella 2021. Each is cited where it is shown. */
const SC_RISK=[
 {id:'base',n:'No extra risk factor',tot:7.5,ymax:12,pts:[[0,0],[1,.45],[2,.62],[5,.83],[20,.97]],
  lab:'5–10% over a lifetime',
  src:`WHO's TB resource page stated that "on average, 5–10% of those who are infected will develop active TB disease over their lifetime"; a model of TB in England and Wales gave an age-weighted average of about 12%. The timing comes from contact and fingerprinting studies: 45% of cases by one year, 62% by two and 83% by five. <sup class="c" data-ref="Behr2018,Vynnycky2000" title="Source 34,501">34,501</sup>`},
 {id:'recent',n:'Recently infected',tot:15,ymax:25,pts:[[0,0],[1,.45],[2,.62],[5,.83],[20,.97]],
  lab:'10–20% over a lifetime',
  src:`Modelling the lifetime risk of reactivation among people with a positive tuberculin skin test put it at 10–20% in people with recent skin-test conversion, and at 20% or more in most people with induration ≥10 mm who also have HIV or evidence of old healed TB. <sup class="c" data-ref="Horsburgh2004" title="Source 237">237</sup>`},
 {id:'hiv',n:'Living with HIV, untreated',haz:.079,ymax:100,
  lab:'7.9 cases per 100 person-years',
  src:`In the founding prospective cohort, TB occurred at 7.9 cases per 100 person-years among people who were HIV-seropositive <b>and</b> tuberculin-positive, versus 0.3 per 100 person-years among seropositive people without a positive tuberculin test (rate ratio 24.0). Tuberculin positivity itself was no commoner in the HIV-positive group, so HIV raises the risk of <b>disease</b>, not of becoming infected. Antiretroviral therapy lowers TB incidence at every CD4 stratum (hazard ratio 0.35 overall), so this curve is the untreated case. <sup class="c" data-ref="Selwyn1989,Suthar2012" title="Source 420,452">420,452</sup>`},
 {id:'child',n:'Children under 5, household contacts',tot:20,ymax:25,pts:[[0,0],[.25,.79],[2,.95],[20,1]],
  lab:'19.0% within 2 years',
  src:`In an individual-participant meta-analysis of children after close exposure, 2-year cumulative TB incidence among untreated child contacts with a positive infection test was highest under 5 years of age, at 19.0% (95% CI 8.4–37.4). 83% of all children under 5 who developed TB were diagnosed within 90 days of the baseline contact visit, so much of that risk is already present when the household is first screened. <sup class="c" data-ref="Martinez2020Lancet" title="Source 311">311</sup>`}];
const SC_STEPS=[
 {from:0,at:.04,k:'Year 0',t:'100 people, one positive test',
  txt:`Everyone in this grid has a positive test for TB infection on the day we start. None of them is ill, none is infectious, and the test says only that their immune system has met the bacillus. Globally this group is enormous: modelling of 131 infection surveys put the burden of TB infection in 2014 at 23.0% of the world's population (95% UI 20.4–26.4), about 1.7 billion people, of whom 55.5 million had been infected within the previous two years. <sup class="c" data-ref="Houben2016,Coussens2024" title="Source 93,239">93,239</sup>`,
  pt:`A positive TB test is not a diagnosis of TB. It means the body has met the germ at some point. Most people with a positive test never become unwell and cannot pass anything on.`,
  hook:`Global TB infection burden 2014: 23.0% of the world population, about 1.7 billion people; 55.5 million infected within 2 years. <sup class="c" data-ref="Houben2016" title="Source 239">239</sup>`},
 {from:.14,at:.2,k:'Years 0–2',t:'The first two years do most of the work',
  txt:`Among untreated tuberculin-positive contacts in Amsterdam, 75% of TB cases occurred within one year of the index diagnosis and 97% within two, with the same timeline in every age group even though children and adolescents were at greater risk. Molecular fingerprinting gave a median incubation period of 1.3 years (95% CI 1.1–1.4), with 45%, 62% and 83% of cases occurring within one, two and five years. Poulsen, working in the Faroe Islands where exposure could be pinned to a two-week period, found the same: typically 3–9 months, almost always under two years. <sup class="c" data-ref="Behr2018" title="Source 34">34</sup>`,
  pt:`If TB is going to develop, it usually does so soon — most often in the first year or two after infection. That is why contacts are followed up and offered preventive treatment quickly.`,
  hook:`75% of contact cases within 1 year, 97% within 2; median incubation 1.3 years; 45%/62%/83% by 1, 2 and 5 years. <sup class="c" data-ref="Behr2018" title="Source 34">34</sup>`},
 {from:.36,at:.44,k:'Years 2–10',t:'Most never develop TB disease',
  txt:`The curve flattens hard. The commonly quoted lifetime risk is 5–10%; a model of TB in England and Wales over the last 50 years of the 20th century gave an age-weighted average of about 12%, highest after infection in early adulthood. Behr and colleagues conclude that there is no evidence of a bimodal curve separating primary progressive from reactivation TB, and that most cases occur within 18–24 months of infection. Very long intervals do happen — the most dramatic documented example is father-to-son transmission in Denmark with 33 years between infection and disease, confirmed by genome sequencing. <sup class="c" data-ref="Behr2018,Vynnycky2000" title="Source 34,501">34,501</sup>`,
  pt:`Nine or more people in every ten with a positive test will never develop TB disease at all.`,
  hook:`No bimodal curve: most TB occurs within 18–24 months of infection, and the "5–10% lifetime" figure is an average across a lifetime, not a yearly risk. <sup class="c" data-ref="Behr2018" title="Source 34">34</sup>`},
 {from:.58,at:.66,k:'Years 10–20',t:'And many clear the infection',
  txt:`A positive test can outlast the bacteria. In the large US isoniazid chemoprophylaxis trial, one year of treatment lowered TB incidence by 60–70% over the next nine years, yet treated people stayed tuberculin-positive up to nine years later — reactivity persisting at least nine years after the infection was eliminated. Pooling those experiments, Behr and colleagues estimate that between 1% and 11% of people with TB immunoreactivity still harbour viable bacteria capable of causing disease. Inferring self-clearance from post-mortem and tuberculin-reversion data gave 24.4% self-clearing within 10 years and 73.1% over a lifetime. <sup class="c" data-ref="Behr2019,Emery2021" title="Source 35,148">35,148</sup>`,
  pt:`In many people the germs die out and only the immune memory remains, so the test stays positive while there is nothing left to treat.`,
  hook:`Pre-antibiotic autopsy series: 96–98% of calcified tuberculous lung lesions were sterile. Behr 2019: only 1–11% of people with immunoreactivity still harbour viable bacteria. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Behr2018,Behr2019" title="Source 34,35">34,35</sup>`},
 {from:.82,at:.92,k:'The whole 20 years',t:'Who these people are changes everything',
  txt:`Switch the group above the grid. HIV is the strongest known risk factor for progression; in the founding cohort, TB occurred at 7.9 cases per 100 person-years in people who were both HIV-positive and tuberculin-positive. Children under 5 who are household contacts carry a 2-year cumulative incidence of 19.0%, most of it within 90 days of the first contact visit. Recent conversion puts lifetime risk at 10–20%. And of the people who do have TB disease at any moment, roughly half would not report symptoms at all: across prevalence surveys a median 50.4% of bacteriologically confirmed TB was subclinical. <sup class="c" data-ref="Selwyn1989,Martinez2020Lancet,Horsburgh2004,Frascella2021" title="Source 188,237,311,420">188,237,311,420</sup>`,
  pt:`The chance of becoming ill depends enormously on who you are. Young children and people with untreated HIV are at the highest risk, which is why they are offered preventive treatment first.`,
  hook:`Risk anchors: HIV + positive tuberculin test 7.9/100 person-years; child under 5 contact 19.0% at 2 years; recent conversion 10–20% lifetime; no extra risk 5–10% lifetime. <sup class="c" data-ref="Selwyn1989,Martinez2020Lancet,Horsburgh2004,Behr2018" title="Source 34,237,311,420">34,237,311,420</sup>`}];
const SC_BAR=[
 {n:'Cleared',c:'var(--muted)',w:28,sv:'no viable bacteria left; the test can stay positive',d:'No viable bacteria left. Reactivity can outlast infection by at least nine years, and self-clearance is estimated at 24.4% within 10 years and 73.1% over a lifetime. <sup class="c" data-ref="Behr2019,Emery2021" title="Source 35,148">35,148</sup>'},
 {n:'TB infection',c:'var(--accent)',w:40,sv:'viable bacteria, no pathology, not infectious',d:'Viable bacteria and a host response, but no macroscopic pathology: no symptoms, nothing to find in sputum, not infectious. <sup class="c" data-ref="Coussens2024,Drain2018" title="Source 93,142">93,142</sup>'},
 {n:'Incipient',c:'var(--gold)',w:12,sv:'a changing immune signature before any disease',d:'Proposed between infection and disease: a blood transcriptomic signature predicted progression with 66.1% sensitivity and 80.6% specificity in the 12 months before diagnosis, and interferon signalling was already raised 18 months out. <sup class="c" data-ref="Drain2018,Zak2016,Scriba2017" title="Source 142,418,531">142,418,531</sup>'},
 {n:'Subclinical TB',c:'var(--warn)',w:10,sv:'disease without reported symptoms',d:'Disease without reported symptoms. A median 50.4% of prevalent bacteriologically confirmed TB in national surveys was subclinical, and PET-CT found subclinical pulmonary abnormalities in 10 of 35 asymptomatic adults with HIV and TB infection, who were much likelier to progress. <sup class="c" data-ref="Frascella2021,Esmail2016" title="Source 154,188">154,188</sup>'},
 {n:'TB disease',c:'var(--tb)',w:10,sv:'symptoms or signs, and likely infectious',d:'Symptoms or signs, and likely infectiousness. The consensus defines two subclinical and two clinical states, all requiring viable bacteria and a host response. <sup class="c" data-ref="Coussens2024" title="Source 93">93</sup>'}];
const SC_VG=[
 {q:'A household contact of someone with pulmonary TB. No cough, no fever, feels completely well. IGRA positive, chest X-ray normal.',a:'inf',
  e:'<b>TB infection.</b> Disease is separated from infection by the presence of macroscopic pathology; here there is none. This person is not infectious and is a candidate for preventive treatment. <sup class="c" data-ref="Coussens2024,Drain2018" title="Source 93,142">93,142</sup>'},
 {q:'Three weeks of cough, drenching night sweats and 6 kg of weight loss. Sputum Xpert MTB/RIF positive.',a:'dis',
  e:'<b>TB disease.</b> Symptoms plus bacteriological confirmation. Treatment is a multi-drug regimen, and the person is infectious until effective treatment takes hold. <sup class="c" data-ref="Coussens2024,Lewinsohn2017" title="Source 93,284">93,284</sup>'},
 {q:'Found during a national prevalence survey by chest X-ray screening. Reports no symptoms at all. Sputum culture grows <i>M. tuberculosis</i>.',a:'dis',
  e:'<b>TB disease — subclinical.</b> Across national prevalence surveys a median 50.4% (36.1–79.7%) of bacteriologically confirmed TB was negative on symptom screening, and chest radiography detected 89% of it. Asking about symptoms alone would have missed this person. <sup class="c" data-ref="Frascella2021" title="Source 188">188</sup>'},
 {q:'A person with HIV, not yet on antiretroviral therapy, with no symptoms. PET-CT shows pulmonary abnormalities.',a:'dis',
  e:'<b>TB disease — subclinical.</b> Among 35 asymptomatic, antiretroviral-naive adults with HIV-1 and TB infection, combined PET-CT identified 10 with abnormalities suggesting subclinical active disease, and those 10 were substantially more likely to progress to clinical disease. <sup class="c" data-ref="Esmail2016" title="Source 154">154</sup>'},
 {q:'A tuberculin skin test is still positive nine years after a full year of isoniazid taken in the 1960s chemoprophylaxis trial.',a:'inf',
  e:'<b>Recorded as TB infection — but the test may be remembering only.</b> That year of isoniazid lowered TB incidence by 60–70% over the next nine years, yet people stayed tuberculin-positive throughout: reactivity persists at least nine years after the infection is eliminated. An estimated 1–11% of people with immunoreactivity still harbour viable bacteria. <sup class="c" data-ref="Behr2019" title="Source 35">35</sup>'},
 {q:'A chest X-ray taken for another reason shows a small calcified nodule in the upper zone. The person feels well and has no symptoms.',a:'inf',
  e:'<b>TB infection, or an old healed lesion.</b> Inactive sequelae show as fibronodular opacities in the apical and upper zones, and stability over 6 months distinguishes inactive from active disease. In pre-antibiotic autopsy series, 96–98% of visible calcified tuberculous lung lesions were sterile. <sup class="c" data-ref="Nachiappan2017,Behr2018" title="Source 34,337">34,337</sup>'}];
inits.spectrum=()=>{
  const svg=$('#scSvg'),rg=$('#scT');let scR=0,scSpec=true;
  const scYr=t=>20*t*t;
  const scPct=(R,y)=>{if(R.haz)return 100*(1-Math.exp(-R.haz*y));
    const P=R.pts;let f=1;for(let i=0;i<P.length-1;i++)if(y<=P[i+1][0]){f=lerp(P[i][1],P[i+1][1],(y-P[i][0])/(P[i+1][0]-P[i][0]));break}
    if(y>P[P.length-1][0])f=P[P.length-1][1];return R.tot*f};
  const scClear=y=>y<=10?lerp(0,24.4,y/10):lerp(24.4,73.1,clamp((y-10)/30));
  function draw(t){
    const N=vb(svg,'720 380','400 620'),R=SC_RISK[scR],y=scYr(t);
    const dis=scPct(R,y),sub=dis*.504,cle=Math.min(100-dis,scClear(y)*(100-dis)/100);
    const nD=Math.round(dis),nS=Math.round(sub),nC=Math.round(cle);
    const L=N?{gx:28,gy:72,cell:32,ps:23,lgy:418,lgw:186,cx0:56,cx1:380,cy0:470,cy1:558}
            :{gx:26,gy:68,cell:24,ps:17,lgy:344,lgw:176,cx0:366,cx1:694,cy0:96,cy1:296};
    let s='';
    s+=`<text x="${L.gx}" y="${N?34:30}" class="t-sm">100 PEOPLE WITH TB INFECTION AT YEAR 0</text>`;
    s+=`<text x="${L.gx}" y="${N?52:48}" class="t-lbl">${R.n} · year ${y<1?y.toFixed(1):Math.round(y)}</text>`;
    for(let i=0;i<100;i++){const col=i%10,row=Math.floor(i/10);
      const x=L.gx+col*L.cell+L.cell*.34,yy=L.gy+row*L.cell;
      let c='var(--accent)',op=1;
      if(i<nD-nS)c='var(--tb)';
      else if(i<nD)c='var(--warn)';
      else if(i>=100-nC){c='var(--muted)';op=.32}
      s+=person(x,yy,L.ps,c,{op:op})}
    const KEY=[['TB disease, symptoms','var(--tb)',nD-nS],['TB disease, subclinical','var(--warn)',nS],['TB infection','var(--accent)',100-nD-nC],['cleared','var(--muted)',nC]];
    KEY.forEach(([n,c,v],i)=>{const yy=L.lgy+(i%2)*19,xx=L.gx+Math.floor(i/2)*L.lgw;
      s+=`<circle cx="${f1(xx+6)}" cy="${f1(yy-4)}" r="5" style="fill:${c};opacity:${c==='var(--muted)'?.4:1}"/>`;
      s+=`<text x="${f1(xx+18)}" y="${f1(yy)}" class="t-xs">${n} · <tspan style="fill:var(--ink);font-weight:700">${Math.max(0,v)}</tspan></text>`});
    /* the cumulative curve */
    const X=yy=>lerp(L.cx0,L.cx1,Math.sqrt(yy/20)),Y=p=>lerp(L.cy1,L.cy0,clamp(p/R.ymax));
    s+=`<rect x="${f1(L.cx0)}" y="${f1(L.cy0)}" width="${f1(X(2)-L.cx0)}" height="${f1(L.cy1-L.cy0)}" style="fill:var(--tb);opacity:.08"/>`;
    s+=`<text x="${f1((L.cx0+X(2))/2)}" y="${f1(L.cy0+12)}" class="t-xs t-mid" style="fill:var(--tb)">first 2 years</text>`;
    [0,1,2,5,10,20].forEach(yy=>{s+=`<line x1="${f1(X(yy))}" x2="${f1(X(yy))}" y1="${L.cy0}" y2="${L.cy1}" class="grid"/><text x="${f1(X(yy))}" y="${f1(L.cy1+16)}" class="t-xs t-mid">${yy}</text>`});
    s+=`<text x="${f1(L.cx1)}" y="${f1(L.cy1+32)}" class="t-xs t-end">years since infection</text>`;
    const ticks=R.ymax>50?[0,25,50,75,100]:R.ymax>15?[0,5,10,15,20,25]:[0,3,6,9,12];
    ticks.forEach(p=>{if(p>R.ymax)return;s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(Y(p))}" y2="${f1(Y(p))}" class="grid"/><text x="${f1(L.cx0-6)}" y="${f1(Y(p)+3)}" class="t-xs t-end">${p}%</text>`});
    s+=`<line x1="${L.cx0}" x2="${L.cx0}" y1="${L.cy0}" y2="${L.cy1}" class="axis"/><line x1="${L.cx0}" x2="${L.cx1}" y1="${L.cy1}" y2="${L.cy1}" class="axis"/>`;
    s+=`<text x="${L.cx0}" y="${f1(L.cy0-26)}" class="t-sm">CUMULATIVE TB DISEASE</text>`;
    s+=`<text x="${L.cx0}" y="${f1(L.cy0-12)}" class="t-xs">${R.lab}</text>`;
    if(scR!==0){let d0='';for(let i=0;i<=60;i++){const yy=20*i/60;d0+=(i?'L':'M')+f1(X(yy))+' '+f1(Y(scPct(SC_RISK[0],yy)))}
      s+=`<path d="${d0}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3;opacity:.7"/>`;
      s+=`<text x="${f1(X(20))}" y="${f1(Y(scPct(SC_RISK[0],20))-6)}" class="t-xs t-end" style="fill:var(--muted)">no extra risk</text>`}
    let d='';for(let i=0;i<=60;i++){const yy=y*i/60;d+=(i?'L':'M')+f1(X(yy))+' '+f1(Y(scPct(R,yy)))}
    s+=`<path d="${d}" style="fill:none;stroke:var(--tb);stroke-width:2.6;stroke-linejoin:round"/>`;
    s+=`<circle cx="${f1(X(y))}" cy="${f1(Y(dis))}" r="5" style="fill:var(--tb)"/>`;
    s+=`<text x="${f1(clamp(X(y),L.cx0+30,L.cx1-30))}" y="${f1(Y(dis)-12)}" class="t-lbl t-mid" style="fill:var(--tb)">${dis.toFixed(1)}%</text>`;
    svg.innerHTML=s;
    const p=phaseOf(SC_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`year ${y.toFixed(1)}: ${dis.toFixed(1)}% with TB disease`);
    $('#scRead').innerHTML=`<span>year <b>${y<1?y.toFixed(1):Math.round(y)}</b></span><span>TB disease <b>${nD} of 100</b></span><span>of them subclinical <b>${nS}</b></span><span>infection cleared <b>${nC}</b></span>`;
    $('#scNote').innerHTML=noteHTML(SC_STEPS[p])
      +`<div class="kv"><div><dt>${R.n}</dt><dd>${R.src}</dd></div>
        <div><dt>How this grid is built</dt><dd>The magenta and amber icons together are the published cumulative risk of TB disease for this group, spread over time by the published shares of cases at 1, 2 and 5 years; amber is the median 50.4% of confirmed TB that is subclinical in prevalence surveys; grey is self-clearance from Emery 2021 <span class="ev early">Early evidence</span>. Each estimate comes from a different study, so the grid is a teaching composite, not one cohort. <sup class="c" data-ref="Behr2018,Frascella2021,Emery2021" title="Source 34,148,188">34,148,188</sup></dd></div></div>`;
  }
  const stop=playWire(rg,$('#scPlay'),draw,24000,'Replay','spectrum');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  $$('[data-sr]').forEach(b=>b.addEventListener('click',()=>{scR=+b.dataset.sr;
    $$('[data-sr]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- two boxes, or a spectrum? ---- */
  const bs=$('#scBar');
  function drawB(){
    const N=vb(bs,'720 330','400 420'),x0=N?16:24,x1=N?384:696,by=N?40:54,bh=N?34:40;
    let s='',s2='';
    s+=`<text x="${x0}" y="${N?22:26}" class="t-sm">${scSpec?'THE SPECTRUM AS DESCRIBED IN THE LITERATURE':'THE OLD TWO-BOX MODEL'}</text>`;
    if(!scSpec){
      [['"Latent TB"','var(--accent)',62],['"Active TB"','var(--tb)',38]].forEach(([n,c,w],i)=>{
        const bx=x0+(i?(x1-x0)*.62:0),bw=(x1-x0)*w/100-4;
        s+=`<rect x="${f1(bx)}" y="${by}" width="${f1(bw)}" height="${bh}" rx="8" style="fill:${c};fill-opacity:.25;stroke:${c};stroke-width:1.6"/>`;
        s+=`<text x="${f1(bx+bw/2)}" y="${f1(by+bh/2+5)}" class="t-lbl t-mid" style="fill:${c}">${n}</text>`});
      ['Everyone is in one box or the other.','No room for someone who has cleared the bacteria, for someone whose immune signature is already changing,','or for someone with culture-positive TB who reports no symptoms at all.'].forEach((t2,k)=>
        s+=`<text x="${x0}" y="${f1(by+bh+34+k*18)}" class="t-lbl">${t2}</text>`);
      s2=`<div class="kicker">The two-box model</div><h4>Latent or active</h4><p>The active-versus-latent dichotomy has been replaced by a continuum of metabolic bacterial activity and antagonistic immune responses, for which two further clinical states — incipient TB and subclinical TB — have been proposed between TB infection and TB disease. <sup class="c" data-ref="Drain2018" title="Source 142">142</sup></p><div class="pt"><b>In plain words</b>Being infected and being ill are not two neat boxes. People move along a range, and can move back along it.</div>`;
    }else{
      let acc=0;const tot=SC_BAR.reduce((a,b)=>a+b.w,0);
      SC_BAR.forEach((B,i)=>{const bx=x0+(x1-x0)*acc/tot,bw=(x1-x0)*B.w/tot-3;acc+=B.w;
        s+=`<rect x="${f1(bx)}" y="${by}" width="${f1(bw)}" height="${bh}" rx="8" style="fill:${B.c};fill-opacity:.25;stroke:${B.c};stroke-width:1.6"/>`;
        s+=`<text x="${f1(bx+bw/2)}" y="${f1(by+bh+16+(i%2)*14)}" class="t-xs t-mid" style="fill:${B.c};font-weight:700">${B.n}</text>`;
        if(i<2)s+=`<text x="${f1(bx+bw/2)}" y="${f1(by+bh/2+5)}" class="t-lbl t-mid" style="fill:${B.c}">${i?'no pathology':'no bacteria'}</text>`});
      s+=`<path d="M${x0} ${f1(by+bh+44)}H${x1}" style="stroke:var(--line)"/>`;
      s+=`<text x="${x0}" y="${f1(by+bh+62)}" class="t-xs">no viable bacteria</text>`;
      s+=`<text x="${f1(x1)}" y="${f1(by+bh+62)}" class="t-xs t-end">symptoms, and likely infectious</text>`;
      SC_BAR.forEach((B,i)=>{const yy=by+bh+90+i*(N?44:32);
        s+=`<circle cx="${x0+6}" cy="${f1(yy-4)}" r="5" style="fill:${B.c}"/>`;
        s+=`<text x="${x0+18}" y="${f1(yy)}" class="t-lbl" style="fill:${B.c}">${B.n}</text>`;
        s+=`<text x="${x0+(N?18:150)}" y="${f1(yy+(N?16:0))}" class="t-xs">${B.sv}</text>`});
      s2=`<div class="kicker">The spectrum</div><h4>Five states, not two</h4>`+SC_BAR.map(B=>`<p><b style="color:${B.c}">${B.n}.</b> ${B.d}</p>`).join('')
        +`<div class="hook"><b>Exam hook</b>The ICE-TB Delphi consensus (71 participants) distinguishes disease from infection by macroscopic pathology, defines two subclinical and two clinical states differentiated by reported symptoms or signs and by likely infectiousness, and requires viable <i>M. tuberculosis</i> plus a host response for every state. <sup class="c" data-ref="Coussens2024" title="Source 93">93</sup></div>`;
    }
    bs.innerHTML=s;$('#scBarNote').innerHTML=s2;
  }
  $('#scSpec').addEventListener('click',()=>{scSpec=!scSpec;
    $('#scSpec').setAttribute('aria-pressed',scSpec);
    $('#scSpec').textContent=scSpec?'Show the two-box model':'Show the spectrum';drawB()});
  drawB();
  const prevR=redraws.spectrum;redraws.spectrum=()=>{prevR&&prevR();drawB()};

  /* ---- which is it? ---- */
  $('#scQuiz').innerHTML=SC_VG.map((V,i)=>`<div class="card"><span class="kicker">Vignette ${i+1}</span><p class="q">${V.q}</p>
    <div class="ctrls"><button class="btn" data-sq="${i}" data-sa="inf" aria-pressed="false">TB infection</button><button class="btn" data-sq="${i}" data-sa="dis" aria-pressed="false">TB disease</button></div>
    <div class="ans" id="scA${i}" hidden></div></div>`).join('');
  $('#scQuiz').addEventListener('click',e=>{const b=e.target.closest('[data-sq]');if(!b)return;
    const i=+b.dataset.sq,V=SC_VG[i],ok=b.dataset.sa===V.a,el=$('#scA'+i);
    $$(`[data-sq="${i}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));
    el.hidden=false;el.className='ans '+(ok?'right':'wrong');
    el.innerHTML=`<b>${ok?'Yes.':'Not quite.'}</b>${V.e}`});
};
/* =============== 1.6 Who is at risk =============== */
/* forest rows: label, short label (phones), estimate, lo, hi (null = no CI in the source), note, colour */
const RK_MED=[
 {l:'HIV with TB infection (vs HIV without)',s:'HIV + TB infection',e:24,lo:null,hi:null,n:'rate ratio',c:'var(--bad)'},
 {l:'Anti-TNF antibody therapy',s:'Anti-TNF antibodies',e:12.2,lo:9.7,hi:15.5,n:'SIR',c:'var(--vax)'},
 {l:'Transplant recipients',s:'Transplant',e:11.35,lo:2.97,hi:43.41,n:'RR, unadjusted',c:'var(--vax)'},
 {l:'Prior TB: reinfection after cure',s:'Prior TB (Cape Town)',e:4,lo:null,hi:null,n:'≈4× new TB',c:'var(--warn)'},
 {l:'Silicosis',s:'Silicosis',e:3.96,lo:2.59,hi:6.06,n:'rate ratio',c:'var(--fibro)'},
 {l:'Dialysis (end-stage kidney disease)',s:'Dialysis',e:3.62,lo:1.79,hi:7.33,n:'adj. rate ratio',c:'var(--vax)'},
 {l:'Alcohol use disorders',s:'Alcohol use disorders',e:3.33,lo:2.14,hi:5.19,n:'RR',c:'var(--warn)'},
 {l:'Undernutrition: BMI 17 vs 25 (derived)',s:'BMI 17 vs 25 (derived)',e:3.28,lo:3.16,hi:3.4,n:'derived',c:'var(--gold)',der:1},
 {l:'Diabetes',s:'Diabetes',e:3.11,lo:2.27,hi:4.26,n:'RR',c:'var(--accent)'},
 {l:'Smoking: TB disease',s:'Smoking (disease)',e:2.33,lo:1.97,hi:2.75,n:'RR, to 2.66',c:'var(--muted)'},
 {l:'Smoking: TB infection',s:'Smoking (infection)',e:1.73,lo:1.46,hi:2.04,n:'RR',c:'var(--muted)'},
 {l:'Any alcohol use',s:'Any alcohol use',e:1.35,lo:1.09,hi:1.68,n:'RR',c:'var(--warn)'}];
const RK_DRUG=[
 {l:'Adalimumab (antibody)',s:'Adalimumab',e:29.3,lo:20.3,hi:42.4,n:'SIR',c:'var(--vax)'},
 {l:'Infliximab (antibody)',s:'Infliximab',e:18.6,lo:13.4,hi:25.8,n:'SIR',c:'var(--vax)'},
 {l:'All anti-TNF antibodies',s:'All anti-TNF antibodies',e:12.2,lo:9.7,hi:15.5,n:'SIR',c:'var(--vax)'},
 {l:'Transplant recipients',s:'Transplant',e:11.35,lo:2.97,hi:43.41,n:'RR',c:'var(--vax)'},
 {l:'Dialysis',s:'Dialysis',e:3.62,lo:1.79,hi:7.33,n:'adj. RR',c:'var(--vax)'},
 {l:'Etanercept (soluble receptor)',s:'Etanercept',e:1.8,lo:.7,hi:4.3,n:'SIR',c:'var(--rx)'}];
const RK_PREV=[
 {l:'Food rations for household contacts',s:'Food rations (RATIONS)',e:.61,lo:.43,hi:.85,n:'adj. IRR',c:'var(--gold)'},
 {l:'ART, CD4 above 350',s:'ART, CD4 >350',e:.43,lo:.3,hi:.63,n:'HR',c:'var(--rx)'},
 {l:'TPT, all exposed children',s:'TPT, all exposed children',e:.37,lo:.3,hi:.47,n:'adj. HR',c:'var(--vax)'},
 {l:'ART, any CD4 count',s:'ART, any CD4',e:.35,lo:.28,hi:.44,n:'HR',c:'var(--rx)'},
 {l:'ART, CD4 200–350',s:'ART, CD4 200–350',e:.34,lo:.19,hi:.6,n:'HR',c:'var(--rx)'},
 {l:'Prior infection, then re-exposed',s:'Prior infection, re-exposed',e:.21,lo:.14,hi:.3,n:'adj. IRR',c:'var(--muted)'},
 {l:'ART, CD4 below 200',s:'ART, CD4 <200',e:.16,lo:.07,hi:.36,n:'HR',c:'var(--rx)'},
 {l:'TPT, infection-test-positive children',s:'TPT, infection-positive children',e:.09,lo:.05,hi:.15,n:'adj. HR',c:'var(--vax)'}];
const RK_PAF=[
 {l:'Undernutrition (global)',s:'Undernutrition',v:20,ext:33,el:'>⅓ in India',c:'var(--gold)'},
 {l:'Smoking (32 high-burden countries)',s:'Smoking',v:17.6,lo:8.4,hi:21.4,ext:30.3,el:'men 30.3%',c:'var(--muted)'},
 {l:'Alcohol (global)',s:'Alcohol',v:10,c:'var(--warn)'},
 {l:'HIV (adults, 2000)',s:'HIV',v:9,lo:7,hi:12,ext:31,el:'WHO Africa 31%',c:'var(--bad)'},
 {l:'Transmission inside prisons',s:'Prisons',v:6.3,ext:8.5,el:'high-income 8.5%',c:'var(--accent)'}];
const RK_ABS=[
 {l:'Under-5 child contacts, infected, untreated (2 y)',s:'Under-5 infected contacts, 2 y',v:19,lo:8.4,hi:37.4},
 {l:'Infected contacts, Amsterdam (5 y, all TB)',s:'Infected contacts, 5 y',v:9.5,lo:7.5,hi:11.9},
 {l:'…of which incident after 180 days (5 y)',s:'…incident after 180 days',v:2.4,lo:1.2,hi:4.7},
 {l:'Close contacts, US and Canada (year 1)',s:'Close contacts, year 1',v:2.644,lo:null,hi:null}];
const RK_STEPS=[
 {from:0,at:.07,k:'Exposure → infection → disease',t:'Most infected people stay well',view:'abs',
  txt:`About a quarter of the world has immune evidence of TB infection, yet in 2024 about 10.7 million people developed TB disease. Among 739 infected contacts in Amsterdam the 5-year risk was 9.5%, but most of it was disease already present at screening: incident TB after 180 days was 2.4%. Risk is front-loaded: among close contacts in the US and Canada, the TB rate was 2644 per 100,000 in year 1 and 115 in year 2. The highest absolute risk is in young children. <sup class="c" data-ref="Houben2016,Zenner2027,Sloot2014,Reichler2018,Martinez2020Lancet" title="Source 239,311,393,433,534">239,311,393,433,534</sup>`,
  pt:`Being infected is common. Getting sick is not, and when it happens it is usually within the first year or two.`,
  hook:`Under-5 child contacts with a positive infection test and no preventive treatment: 19.0% developed TB within 2 years; 83% were diagnosed within 90 days. <sup class="c" data-ref="Martinez2020Lancet" title="Source 311">311</sup>`},
 {from:.15,at:.4,k:'Medical risk factors',t:'What weakens the defence',view:'med',
  txt:`HIV is the strongest known risk factor. In the founding cohort, people with HIV and a positive tuberculin test developed TB at 7.9 per 100 person-years against 0.3 without one; HIV raised the risk of disease, not of becoming infected. Diabetes roughly triples risk, as do silicosis, dialysis and alcohol use disorders. Undernutrition follows a steady gradient: about 13.8% lower incidence per BMI unit, which makes BMI 17 about 3.3 times BMI 25 (derived). <sup class="c" data-ref="Suthar2012,Selwyn1989,Jeon2008,Hnizdo1998,AlEfraij2015,Imtiaz2017,Lonnroth2010BMI" title="Source 6,234,244,250,294,420,452">6,234,244,250,294,420,452</sup>`,
  pt:`HIV, diabetes, being underweight, heavy drinking, smoking, dust disease of the lungs and kidney failure all make TB more likely.`,
  hook:`Diabetes RR 3.11 · silicosis 3.96 · dialysis 3.62 · alcohol use disorders 3.33 · smoking 2.33–2.66 for disease. <sup class="c" data-ref="Jeon2008,Hnizdo1998,AlEfraij2015,Imtiaz2017,Bates2007" title="Source 6,29,234,244,250">6,29,234,244,250</sup>`},
 {from:.45,at:.53,k:'Medicines that block TNF',t:'Not all biologics are equal',view:'drug',
  txt:`TNF holds granulomas together. In the French RATIO registry, TB incidence on anti-TNF monoclonal antibodies was 116.7 per 100,000 patient-years, 12.2 times the general population; for adalimumab it was 29.3 and infliximab 18.6, against 1.8 for etanercept, a soluble receptor whose interval crosses 1. Transplant recipients carried a pooled unadjusted risk ratio of 11.35. <sup class="c" data-ref="Tubach2009,AlEfraij2015,Keane2001" title="Source 6,266,475">6,266,475</sup>`,
  pt:`Some arthritis and bowel-disease medicines can wake up a sleeping TB infection. Doctors test for TB infection before starting them.`,
  hook:`Anti-TNF SIR: adalimumab 29.3, infliximab 18.6, etanercept 1.8. Median onset after infliximab: 12 weeks; 40 of 70 cases extrapulmonary. <sup class="c" data-ref="Tubach2009,Keane2001" title="Source 266,475">266,475</sup>`},
 {from:.6,at:.68,k:'Population view',t:'Cases attributable worldwide',view:'paf',
  txt:`A modest risk ratio applied to many people causes many cases. About 20% of global TB incidence is attributed to undernutrition (more than a third in India), 17.6% to smoking in 32 high-burden countries (30.3% in men, 4.3% in women), about 10% to alcohol, and 9% of adult cases in 2000 to HIV (31% in the WHO African region). WHO tracks five such factors each year: undernutrition, HIV, alcohol use disorders, smoking and diabetes. These shares come from different years and methods and overlap in the same people, so they are never added up. <sup class="c" data-ref="McQuaid2025,Amere2018,Rehm2009,Corbett2003,WHO-GTR2025,Lonnroth2009" title="Source 10,89,293,318,392,510">10,89,293,318,392,510</sup>`,
  pt:`Hunger and smoking cause more TB worldwide than any rare condition, because so many people are affected by them.`,
  hook:`Attributable fractions overlap and are not additive: undernutrition ~20%, smoking 17.6%, alcohol ~10%, HIV 9% (2000). <sup class="c" data-ref="Lonnroth2009" title="Source 293">293</sup>`},
 {from:.78,at:.92,k:'What lowers risk',t:'Prevention works',view:'prev',
  txt:`Antiretroviral therapy cut TB incidence at every CD4 level (HR 0.35 overall). Preventive treatment was 91% effective in child contacts with a positive infection test (HR 0.09) and 63% in all exposed children. Food rations for household contacts in RATIONS cut incidence by 39–48%. Prior infection gave partial protection after re-exposure (IRR 0.21), but in high-transmission Cape Town reinfection after cure still ran at 2.2 per 100 person-years. <sup class="c" data-ref="Suthar2012,Martinez2020Lancet,Bhargava2023Lancet,Andrews2012Reinfection,Verver2005" title="Source 13,39,311,452,495">13,39,311,452,495</sup>`,
  pt:`HIV treatment, TB preventive medicine and enough food all lower the chance of getting TB.`,
  hook:`ART lowers TB risk by about two thirds at any CD4 count (HR 0.35, 95% CI 0.28–0.44). <sup class="c" data-ref="Suthar2012" title="Source 452">452</sup>`}
];
inits.risk=()=>{
  const svg=$('#rkSvg'),rg=$('#rkT');let view='med',lastPh=-1,setSt=()=>{};
  const sync=()=>$$('[data-rkv]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.rkv===(view==='paf'?'paf':'rr')));
  const LG=v=>Math.log10(v),A=.05,B=50;
  function forest(rows,N,k,title,sub){
    const L=N?{x0:18,x1:300,v:312,top:58,rh:38,lab:-7}:{lab0:12,x0:296,x1:598,v:608,top:62,rh:Math.min(30,330/rows.length)};
    const X=v=>lerp(L.x0,L.x1,(LG(clamp(v,A,B))-LG(A))/(LG(B)-LG(A)));let s='';
    const H=L.top+rows.length*L.rh+6;
    s+=`<text x="${N?18:12}" y="22" class="t-sm" style="fill:var(--tb)">${title}</text><text x="${N?18:12}" y="38" class="t-xs">${sub}</text>`;
    (N?[.1,.5,1,2,5,10,50]:[.05,.1,.25,.5,1,2,5,10,25,50]).forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.top-8}" y2="${H}" class="${v===1?'axis':'grid'}" ${v===1?'style="stroke:var(--ink);stroke-width:1.4;opacity:.6"':''}/><text x="${f1(X(v))}" y="${H+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(1)-6)}" y="${H+28}" class="t-xs t-end" style="fill:var(--rx)">◀ lower risk</text><text x="${f1(X(1)+6)}" y="${H+28}" class="t-xs" style="fill:var(--bad)">higher risk ▶</text>`;
    rows.forEach((r,i)=>{const a=ramp(k,i/rows.length*.75,i/rows.length*.75+.25);if(a<=0)return;const y=L.top+i*L.rh+L.rh/2+(N?6:0),e=Math.exp(lerp(0,Math.log(r.e),ease(a)));
      if(i%2===0)s+=`<rect x="${N?14:6}" y="${f1(y-L.rh/2-(N?8:0))}" width="${N?372:708}" height="${L.rh}" style="fill:var(--panel-2);opacity:.45"/>`;
      s+=N?`<text x="${L.x0}" y="${f1(y+L.lab)}" class="t-xs" style="fill:var(--ink);opacity:${f1(a)}">${r.s}</text>`:`<text x="${L.x0-12}" y="${f1(y+4)}" class="t-xs t-end" style="fill:var(--ink);font-size:10.5px;opacity:${f1(a)}">${r.l}</text>`;
      if(r.lo!=null){const lo=Math.exp(lerp(Math.log(r.e),Math.log(r.lo),a)),hi=Math.exp(lerp(Math.log(r.e),Math.log(r.hi),a));
        s+=`<line x1="${f1(X(lo))}" x2="${f1(X(hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${r.c};stroke-width:2;${r.der?'stroke-dasharray:3 2':''}"/>`;
        if(r.hi>B)s+=`<path d="M${f1(X(B))} ${f1(y-4)}l6 4l-6 4" style="fill:${r.c}"/>`}
      s+=r.lo==null?`<circle cx="${f1(X(e))}" cy="${f1(y)}" r="5" style="fill:var(--panel);stroke:${r.c};stroke-width:2"/>`:`<rect x="${f1(X(e)-4.5)}" y="${f1(y-4.5)}" width="9" height="9" style="fill:${r.c}"/>`;
      s+=`<text x="${L.v}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);opacity:${f1(a)}"><tspan style="font-weight:700">${r.e<1?r.e.toFixed(2):String(+r.e.toFixed(2))}</tspan>${N?'':' '+r.n}</text>`});
    return {s,h:H+34}}
  function bars(rows,N,k,title,sub,max,unit,abs){
    const L=N?{x0:18,x1:360,top:62,rh:52}:{x0:330,x1:650,top:66,rh:Math.min(56,320/rows.length)};
    const X=v=>lerp(L.x0,L.x1,v/max);let s=`<text x="${N?18:12}" y="22" class="t-sm" style="fill:var(--tb)">${title}</text><text x="${N?18:12}" y="38" class="t-xs">${sub}</text>`;
    const H=L.top+rows.length*L.rh;
    (max>30?[0,10,20,30,40]:[0,5,10,15,20,25]).filter(v=>v<=max).forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.top-6}" y2="${H}" class="${v?'grid':'axis'}"/><text x="${f1(X(v))}" y="${H+14}" class="t-xs t-mid">${v}%</text>`);
    rows.forEach((r,i)=>{const a=ramp(k,i/rows.length*.7,i/rows.length*.7+.3);const y=L.top+i*L.rh+L.rh*(N?.62:.5),bh=N?14:16;
      s+=N?`<text x="${L.x0}" y="${f1(y-bh/2-5)}" class="t-xs" style="fill:var(--ink)">${r.s}</text>`:`<text x="${L.x0-12}" y="${f1(y+4)}" class="t-xs t-end" style="fill:var(--ink);font-size:10.5px">${r.l}</text>`;
      const v=r.v*ease(a);s+=`<rect x="${L.x0}" y="${f1(y-bh/2)}" width="${f1(X(v)-L.x0)}" height="${bh}" rx="3" style="fill:${r.c||'var(--tb)'};opacity:.85"/>`;
      if(r.ext&&a>=1)s+=`<line x1="${f1(X(r.v))}" x2="${f1(X(r.ext))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${r.c};stroke-width:2;stroke-dasharray:3 3"/><circle cx="${f1(X(r.ext))}" cy="${f1(y)}" r="3.5" style="fill:var(--panel);stroke:${r.c};stroke-width:1.6"/><text x="${f1(X(r.ext)+6)}" y="${f1(y+(N?16:-6))}" class="t-xs${N&&X(r.ext)>250?' t-end':''}" ${N&&X(r.ext)>250?`x="${f1(X(r.ext))}"`:''}>${r.el}</text>`;
      if(r.lo!=null&&a>=1)s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(Math.min(r.hi,max)))}" y1="${f1(y+bh/2+3)}" y2="${f1(y+bh/2+3)}" style="stroke:var(--ink);stroke-width:1.2;opacity:.6"/>`;
      s+=`<text x="${f1(X(v)+5)}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);font-weight:700">${a>0?(abs&&r.v<3?f1(v):r.v%1?f1(v):Math.round(v))+unit:''}</text>`});
    return {s,h:H+30}}
  function draw(t){
    const ph=phaseOf(RK_STEPS,t);if(ph!==lastPh){lastPh=ph;view=RK_STEPS[ph].view;sync()}
    const st=RK_STEPS[ph],nx=ph<RK_STEPS.length-1?RK_STEPS[ph+1].from:1.0001,k=ramp(t,st.from,lerp(st.from,nx,.75));
    const N=NARROW();let out;
    const v=view==='paf'?'paf':view;
    if(v==='abs')out=bars(RK_ABS,N,k,N?'ABSOLUTE RISK AFTER EXPOSURE':'ABSOLUTE RISK AFTER EXPOSURE · % who develop TB disease',N?'% who develop TB disease, published cohorts':'Published cohorts of contacts; bars show 95% CI where given',25,'%',1);
    else if(v==='paf')out=bars(RK_PAF,N,k,N?'SHARE OF TB CASES ATTRIBUTABLE':'SHARE OF TB CASES ATTRIBUTABLE TO EACH FACTOR',N?'overlapping estimates · never add them up':'Separate studies, years and populations · they overlap · never add them up',40,'%');
    else if(v==='drug')out=forest(RK_DRUG,N,k,N?'IMMUNE-SUPPRESSING TREATMENT':'IMMUNE-SUPPRESSING TREATMENT · risk of TB vs the general population',N?'log scale · line at 1 = no difference':'Standardised incidence or risk ratios · log scale');
    else if(v==='prev')out=forest(RK_PREV,N,k,N?'WHAT LOWERS RISK':'WHAT LOWERS RISK · hazard or incidence rate ratios',N?'left of 1 = fewer TB cases':'Left of the line = fewer TB cases · log scale');
    else out=forest(RK_MED,N,k,N?'RISK FACTORS FOR TB DISEASE':'RISK FACTORS FOR TB DISEASE · relative risk',N?'log scale · line at 1 = no difference':'Each from its own study and comparison · log scale · line at 1 = no difference');
    svg.setAttribute('viewBox',`0 0 ${N?400:720} ${Math.max(N?300:300,Math.ceil(out.h))}`);svg.dataset.mode=N?'n':'w';
    svg.innerHTML=out.s;setSt(ph);
    $('#rkNote').innerHTML=noteHTML(st);
  }
  const stop=playWire(rg,$('#rkPlay'),draw,22000,'Replay','risk');
  setSt=stepWire($('#rkSteps'),RK_STEPS,rg,draw,stop);
  $$('[data-rkv]').forEach(b=>b.addEventListener('click',()=>{const w=b.dataset.rkv;view=w==='paf'?'paf':(RK_STEPS[phaseOf(RK_STEPS,+rg.value)].view==='paf'?'med':RK_STEPS[phaseOf(RK_STEPS,+rg.value)].view);sync();draw(+rg.value)}));
  draw(+rg.value);

  /* ---- BMI dose-response ---- */
  const bs=$('#rkBmiSvg'),br=$('#rkBmi'),rel=b=>Math.pow(1-.138,b-25);
  function drawB(){const N=vb(bs,'720 280','400 300'),b=+br.value,C=N?{x0:44,x1:384,y0:30,y1:240}:{x0:60,x1:690,y0:30,y1:228},ym=5;
    const X=v=>lerp(C.x0,C.x1,(v-16)/16),Y=v=>lerp(C.y1,C.y0,v/ym);let s='';
    s+=`<rect x="${f1(X(16))}" y="${C.y0}" width="${f1(X(18.5)-X(16))}" height="${C.y1-C.y0}" style="fill:var(--warn-soft);opacity:.6"/><rect x="${f1(X(30))}" y="${C.y0}" width="${f1(X(32)-X(30))}" height="${C.y1-C.y0}" style="fill:var(--warn-soft);opacity:.6"/>`;
    s+=`<text x="${f1((X(16)+X(18.5))/2)}" y="${C.y0+12}" class="t-xs t-mid" style="fill:var(--warn)">sparse data</text><text x="${f1((X(30)+X(32))/2)}" y="${C.y0+12}" class="t-xs t-mid" style="fill:var(--warn)">sparse</text>`;
    [0,1,2,3,4,5].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}×</text>`);
    (N?[16,20,24,28,32]:[16,18,20,22,24,26,28,30,32]).forEach(v=>s+=`<text x="${f1(X(v))}" y="${C.y1+14}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${C.x1}" y="${C.y1+28}" class="t-xs t-end">body-mass index, kg/m²</text><text x="${C.x0}" y="${C.y0-12}" class="t-sm">TB INCIDENCE RELATIVE TO BMI 25</text>`;
    const seg=(a,c,dash)=>`<path d="${pathFn(u=>rel(lerp(a,c,u))/ym,X(a),X(c),C.y1,C.y0,40)}" style="fill:none;stroke:var(--tb);stroke-width:2.6;${dash?'stroke-dasharray:5 4;opacity:.7':''}"/>`;
    s+=seg(16,18.5,1)+seg(18.5,30)+seg(30,32,1);
    s+=`<line x1="${f1(X(25))}" x2="${f1(X(25))}" y1="${f1(Y(1))}" y2="${C.y1}" style="stroke:var(--muted);stroke-dasharray:2 3"/><circle cx="${f1(X(25))}" cy="${f1(Y(1))}" r="3.5" style="fill:var(--muted)"/>`;
    const r=rel(b);s+=`<line x1="${f1(X(b))}" x2="${f1(X(b))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/><circle cx="${f1(X(b))}" cy="${f1(Y(Math.min(r,ym)))}" r="6.5" style="fill:var(--tb);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<text x="${f1(X(b)+(b>27?-10:10))}" y="${f1(Y(Math.min(r,ym))-10)}" class="t-lbl${b>27?' t-end':''}">${r.toFixed(2)}×</text>`;
    bs.innerHTML=s;
    const cat=b<18.5?'below 18.5: underweight range, where the published curve is less certain':b<25?'18.5–25':b<30?'25–30':'30 or more: data sparse';
    $('#rkBmiOut').innerHTML=`<div><div class="big-num">${r.toFixed(2)}×</div><small>TB incidence vs BMI 25</small></div><div><b>BMI ${b}</b><small>${cat}</small></div><div><b>13.8% per unit</b><small>published gradient</small></div>`}
  br.addEventListener('input',drawB);drawB();

  /* ---- RATIONS icon arrays ---- */
  const ra=$('#rkRat');
  function drawR(){const N=vb(ra,'720 316','400 420');let s='';
    const grids=N?[{x:20,y:46,lab:'Control contacts',n:13,c:'var(--bad)'},{x:20,y:240,lab:'Contacts given food rations',n:8,c:'var(--gold)'}]:[{x:20,y:56,lab:'Control contacts',n:13,c:'var(--bad)'},{x:370,y:56,lab:'Contacts given food rations',n:8,c:'var(--gold)'}];
    const cols=N?50:40,rows=N?20:25,sz=N?6:7,gp=N?1.2:1.4,R=rng(616);
    grids.forEach(g=>{const pick=new Set();while(pick.size<g.n)pick.add(Math.floor(R()*cols*rows));
      s+=`<text x="${g.x}" y="${g.y-22}" class="t-lbl">${g.lab}</text><text x="${g.x}" y="${g.y-8}" class="t-xs">${g.n} TB cases per 1,000 person-years</text><g>`;
      for(let i=0;i<cols*rows;i++){const x=g.x+(i%cols)*(sz+gp),y=g.y+Math.floor(i/cols)*(sz+gp),hit=pick.has(i);
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${sz}" height="${sz}" style="fill:${hit?g.c:'var(--panel-2)'}"/>`}
      s+='</g>'});
    s+=`<text x="${N?20:20}" y="${N?400:286}" class="t-xs">one square = one person-year of follow-up · filled = a TB case</text><text x="20" y="${N?414:302}" class="t-xs" style="fill:var(--gold)">adjusted IRR 0.61: a 39% lower rate</text>`;
    ra.innerHTML=s}
  drawR();
  redraws.risk=(f=>()=>{f&&f();draw(+rg.value);drawB();drawR()})(redraws.risk);
};
/* =============== 2.1 Symptoms & where TB strikes =============== */
/* extrapulmonary sites, in the order they light up. p: share of extrapulmonary TB, US 1993–2006 (Peto2009) */
const SY_SITES=[
 {id:'lymph',n:'Lymph nodes',p:40.4,t0:.40,sg:'painless neck swelling'},
 {id:'pleural',n:'Pleura',p:19.8,t0:.46,sg:'fluid around the lung'},
 {id:'bone',n:'Bone &amp; joint',p:11.3,t0:.54,sg:'spine: Pott’s disease'},
 {id:'gu',n:'Genitourinary',p:6.5,t0:.59,sg:'kidney, bladder, genitals'},
 {id:'perit',n:'Peritoneum',p:4.9,t0:.635,sg:'lining of the abdomen'},
 {id:'mening',n:'Meninges',p:5.4,t0:.69,sg:'the most lethal form'},
 {id:'mil',n:'Miliary',p:null,t0:.83,sg:'spread through the blood'}];
/* what each profile shows: P lung chips, C whole-body chips, st summary chips, lesions in the lungs */
const SY_PRO={
 adult:{name:'an adult',sc:1,
  P:[{l:'Cough ≥ 2 weeks',s:'sens 42% · spec 94%',t:.02},{l:'Any cough',s:'sens 51% · spec 88%',t:.08}],
  C:[{l:'Fever',t:.2},{l:'Night sweats',t:.25},{l:'Weight loss',t:.3}],
  st:[{l:'Any TB symptom: sens 71% · spec 65%',t:.34},{l:'~Half of people with TB in surveys: no symptoms',t:.37}],
  les:[{side:'R',u:.42,v:.13,r:10,kind:'cavity'},{side:'R',u:.52,v:.22,r:15,kind:'infiltrate'}],lesN:'cavity'},
 child:{name:'a child',sc:.76,
  P:[{l:'Cough > 2 wk, not improving',t:.02},{l:'Swollen chest lymph nodes',s:'primary TB pattern',t:.09}],
  C:[{l:'Failure to thrive',s:'documented, past 3 months',t:.2},{l:'Fatigue',t:.27}],
  st:[{l:'All three: sens 63% · spec 90%',t:.33},{l:'Weaker under age 3 (sens 52%)',t:.36}],
  les:[{side:'R',u:.04,v:.3,r:9,kind:'node'},{side:'R',u:.45,v:.62,r:16,kind:'infiltrate'}],lesN:'hilar node'},
 hiv:{name:'a person with HIV',sc:1,
  P:[{l:'Current cough, any length',t:.02},{l:'Fewer cavities',s:'less cavitation with HIV',t:.09}],
  C:[{l:'Fever',t:.2},{l:'Night sweats',t:.25},{l:'Weight loss',t:.3}],
  st:[{l:'Any 1 of 4: sens 79% · spec 50%',t:.34},{l:'On ART: sens falls to 51%',t:.37}],
  les:[{side:'R',u:.5,v:.6,r:16,kind:'infiltrate'},{side:'L',u:.5,v:.55,r:14,kind:'infiltrate'}],lesN:'no cavity'}};
const SY_COMMON=[
 {from:.39,at:.5,k:'Outside the lungs · 1',t:'Lymph nodes and pleura',
  txt:`In 2024, 16% of the 8.3 million people notified with a new episode of TB had extrapulmonary TB. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup> In US data the commonest sites were the lymph nodes (40.4%) and the pleura (19.8%). <sup class="c" data-ref="Peto2009" title="Source 372">372</sup> TB lymphadenitis typically means 1–2 months of painless swelling of one group of neck nodes; excision biopsy is the most sensitive test (80%). <sup class="c" data-ref="Fontanilla2011" title="Source 183">183</sup> Pleural fluid adenosine deaminase had a pooled sensitivity of 0.92 and specificity of 0.90. <sup class="c" data-ref="Liang2008" title="Source 286">286</sup>`,
  pt:`TB can settle outside the lungs. The neck glands are the most common place: a lump that grows slowly and usually does not hurt.`,
  hook:`Commonest extrapulmonary site: lymph nodes (40.4%), then pleura (19.8%). Pleural ADA: sensitivity 92%, specificity 90%.`},
 {from:.53,at:.61,k:'Outside the lungs · 2',t:'Bone, kidneys and abdomen',
  txt:`Bone and joint TB made up 11.3% of US extrapulmonary cases, genitourinary 6.5% and peritoneal 4.9%. Extrapulmonary TB was more common in women (OR 1.7) and in people born outside the US (OR 1.5), and its share rose from 15.7% of cases in 1993 to 21.0% in 2006. <sup class="c" data-ref="Peto2009" title="Source 372">372</sup> Spinal TB, Pott's disease, leaves a deformity seen in Egyptian remains from about 2400 BC. <sup class="c" data-ref="Barberis2017" title="Source 26">26</sup> Samples from these sites hold few bacilli: smear sensitivity runs from under 10% to 42% and culture from 23% to 90%. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`,
  pt:`TB of the spine, kidneys or belly is less common. It is harder to confirm because samples contain few germs, so doctors often need a biopsy.`,
  hook:`Pott's disease = TB of the spine. Extrapulmonary samples: smear sensitivity under 10% to 42%.`},
 {from:.68,at:.75,k:'Outside the lungs · 3',t:'Meninges: the most dangerous',
  txt:`TB meningitis is the most lethal and disabling form of TB, with more than 100,000 new cases a year. <sup class="c" data-ref="Wilkinson2017" title="Source 521">521</sup> Across 39 studies of adults, 6-month mortality was 16% without HIV and 57% with HIV; 32% of survivors had a physical disability. These are population averages. <sup class="c" data-ref="Stadelman2020" title="Source 440">440</sup> In children, 19.3% died and only 36.7% survived without neurological sequelae; 47% were diagnosed at the most advanced stage. <sup class="c" data-ref="Chiang2014" title="Source 72">72</sup> In 1,699 Vietnamese adults, 9-month mortality was 23.0% without HIV and 51.3% with HIV. <sup class="c" data-ref="Thao2018" title="Source 464">464</sup> On CSF, Xpert Ultra was 89.4% sensitive against culture, but a negative result cannot rule TB meningitis out. <sup class="c" data-ref="Kohli2021,Huynh2022" title="Source 243,275">243,275</sup>`,
  pt:`TB of the lining of the brain is rare but serious. Headache, fever and confusion that build over days need urgent care.`,
  hook:`TB meningitis, 6-month mortality in adults: 16% without HIV, 57% with HIV (population averages).`},
 {from:.82,at:.94,k:'Everywhere at once',t:'Miliary TB',
  txt:`Miliary TB comes from massive spread of bacilli through lymph and blood, seeding many organs with tiny lesions. Its symptoms are non-specific and the typical chest X-ray pattern may appear only late, which delays diagnosis. <sup class="c" data-ref="Sharma2005" title="Source 424">424</sup> It is more common in immunocompromised people. <sup class="c" data-ref="Nachiappan2017" title="Source 337">337</sup> BCG given to infants protects strongly against miliary and meningeal TB (RR 0.1 in randomised trials). <sup class="c" data-ref="Mangtani2014" title="Source 302">302</sup> Treatment for these forms is covered in <a href="#regimen" data-go="regimen">Treating TB disease</a>.`,
  pt:`Sometimes TB spreads through the blood to many organs at once. It can be hard to spot because the person just feels very unwell.`,
  hook:`Miliary and meningeal TB are the forms BCG prevents best in young children.`}];
/* a pleural effusion clipped to the patient's right lung (same outline as lung() in the kit) */
function syEffusion(x,y,s,a){const X=v=>f1(x+v*s),Y=v=>f1(y+v*s),id='sye'+Math.round(x)+'_'+Math.round(y);
  return `<clipPath id="${id}"><path d="M${X(92)} ${Y(42)}C${X(62)} ${Y(26)} ${X(30)} ${Y(40)} ${X(18)} ${Y(92)}C${X(8)} ${Y(132)} ${X(6)} ${Y(176)} ${X(20)} ${Y(190)}C${X(44)} ${Y(199)} ${X(76)} ${Y(193)} ${X(92)} ${Y(181)}Z"/></clipPath><path clip-path="url(#${id})" d="M${X(0)} ${Y(lerp(196,146,a))}Q${X(50)} ${Y(lerp(198,160,a))} ${X(100)} ${Y(lerp(196,144,a))}V${Y(205)}H${X(0)}Z" style="fill:var(--air);opacity:.5"/>`}
const SY_STEPS={
 adult:[
  {from:0,at:.07,k:'Lungs · post-primary TB',t:'A cough that lingers',
   txt:`In adults, TB disease usually develops in the lungs long after infection, with cavities, consolidation and small nodules on imaging. <sup class="c" data-ref="Nachiappan2017" title="Source 337">337</sup> Cavities typically form at the apex of the lung. <sup class="c" data-ref="Balasubramanian1994" title="Source 24">24</sup> In community screening of adults, cough for 2 weeks or more had a summary sensitivity of 42.1% and specificity of 94.4% (41 studies); any cough, 51.3% and 87.6%. <sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup>`,
   pt:`A cough lasting 2 weeks or more is a reason to get checked. But many people with TB do not cough that long, so a short cough does not rule it out.`,
   hook:`Cough ≥ 2 weeks is specific (94%) but misses more than half of TB (sensitivity 42%) in community screening.`},
  {from:.18,at:.3,k:'The whole body',t:'Fever, night sweats, weight loss',
   txt:`Any TB symptom had a sensitivity of 70.6% and specificity of 65.1% in community screening (29 studies). <sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup> In national prevalence surveys a median 50.4% of people with confirmed TB had no symptoms on screening, while a chest X-ray detected 89%. That is why screening pairs symptoms with an X-ray. <sup class="c" data-ref="Frascella2021,VantHoog2022" title="Source 188,488">188,488</sup>`,
   pt:`TB can make the whole body unwell: fever, sweating at night and losing weight without trying. Some people with TB feel completely well.`,
   hook:`About half of TB found in surveys is subclinical: symptom screens miss it, and chest X-ray finds most of it (89%).`}],
 child:[
  {from:0,at:.07,k:'Lungs · primary TB',t:'A cough that will not settle',
   txt:`Primary TB, shortly after infection, is commonest in children and shows as enlarged lymph nodes, consolidation and pleural effusion. <sup class="c" data-ref="Nachiappan2017" title="Source 337">337</sup> In HIV-negative children in Cape Town, a persistent cough not improving over 2 weeks, documented failure to thrive and fatigue together had a sensitivity of 62.6% and specificity of 89.8%. <sup class="c" data-ref="Marais2006" title="Source 305">305</sup> Young children rarely cough up sputum; see <a href="#diagnose" data-go="diagnose">Diagnosing TB disease</a> for gastric, stool and nasal samples.`,
   pt:`In children, watch for a cough that goes on for more than 2 weeks and does not get better.`,
   hook:`Marais 2006: persistent cough + failure to thrive + fatigue: sensitivity 62.6%, specificity 89.8%.`},
  {from:.18,at:.3,k:'The whole body',t:'Failure to thrive and tiredness',
   txt:`The same symptom approach worked better from age 3 (sensitivity 82.3%) than under 3 (51.8%), and it added little in children with HIV. <sup class="c" data-ref="Marais2006" title="Source 305">305</sup> WHO estimates that children under 15 make up about 11% of people with TB: 1.1 million fall ill each year and more than 225,000 die. <sup class="c" data-ref="WHO-Mod5-2022" title="Source 516">516</sup> Only 29.9% of children classified as having pulmonary TB in 13 studies were bacteriologically confirmed. <sup class="c" data-ref="Gunasekera2023" title="Source 210">210</sup>`,
   pt:`A child who stops growing or gaining weight, or is unusually tired, may need checking for TB, especially after contact with someone who has it.`,
   hook:`About 70% of children treated for pulmonary TB are never bacteriologically confirmed. <sup class="c" data-ref="Gunasekera2023" title="Source 210">210</sup>`}],
 hiv:[
  {from:0,at:.07,k:'Lungs · advanced HIV',t:'Any cough counts',
   txt:`For people living with HIV, the WHO four-symptom screen is positive with any one of current cough (of any length), fever, night sweats or weight loss. It came from 12 studies of 9,626 people with HIV: sensitivity 78.9%, specificity 49.6%. <sup class="c" data-ref="Getahun2011" title="Source 197">197</sup> HIV co-infection is associated with less cavitation. <sup class="c" data-ref="Pai2016" title="Source 367">367</sup> TB in advanced HIV often presents outside the lungs, sputum may be impossible to produce and samples hold few bacilli. <sup class="c" data-ref="Peter2016" title="Source 371">371</sup>`,
   pt:`For people with HIV, a cough of any length, fever, night sweats or weight loss is enough to check for TB.`,
   hook:`WHO four-symptom screen (W4SS): cough, fever, night sweats, weight loss. Any one = positive.`},
  {from:.18,at:.3,k:'The whole body',t:'The four-symptom screen',
   txt:`The screen loses sensitivity on antiretroviral therapy: 51.0% on ART versus 89.4% not on ART (18 studies). <sup class="c" data-ref="Hamada2018" title="Source 215">215</sup> Its negative predictive value was 97.7% at 5% TB prevalence but 90.0% at 20%, so a negative screen rules TB out well only where TB is uncommon. <sup class="c" data-ref="Getahun2011" title="Source 197">197</sup> CRP of 10 mg/L or more had a sensitivity of 77% and specificity of 74%. <sup class="c" data-ref="Dhana2022" title="Source 118">118</sup> Try it in the icon array below.`,
   pt:`HIV medicines can make TB quieter, so a screen with no symptoms is less reassuring for someone on treatment.`,
   hook:`W4SS sensitivity: 89% not on ART, 51% on ART. Add a chest X-ray or CRP.`}]};

inits.symptoms=()=>{
  const svg=$('#sySvg'),rg=$('#syT');let pro='adult',setSt=()=>{};
  const steps=()=>SY_STEPS[pro].concat(SY_COMMON);
  /* a front-view body silhouette; w slims the torso (weight loss) */
  function body(cx,top,H,w){const R=[[.03,.125,0],[.08,.15,0],[.14,.175,0],[.165,.22,0],[.18,.34,0],[.185,.47,0],[.168,.505,0],[.15,.47,0],[.145,.34,0],[.128,.25,0],[.124,.36,1],[.112,.44,1],[.13,.53,1],[.115,.75,0],[.1,.955,0],[.105,.99,0],[.035,.99,0],[.035,.955,0],[.03,.75,0],[.012,.585,0]];
    const pt=(p,sg)=>f1(cx+sg*p[0]*H*(p[2]?w:1))+' '+f1(top+p[1]*H);
    let d='M'+R.map(p=>pt(p,1)).join('L');for(let i=R.length-1;i>=0;i--)d+='L'+pt(R[i],-1);
    return `<path d="${d}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2;stroke-linejoin:round;opacity:.95"/><circle cx="${f1(cx)}" cy="${f1(top+.065*H)}" r="${f1(.055*H)}" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`}
  function chip(x,y,w,c,o,a){if(a<=0)return '';const h=o.s?30:20;
    return `<g style="opacity:${f1(a)}" transform="translate(${f1((1-a)*14)} 0)"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="10" style="fill:var(--${c}-soft);stroke:var(--${c});stroke-width:1"/><text x="${f1(x+10)}" y="${f1(y+14)}" class="t-lbl" style="font-size:12px;fill:var(--${c})">${o.l}</text>${o.s?`<text x="${f1(x+10)}" y="${f1(y+25)}" class="t-xs">${o.s}</text>`:''}</g>`}
  function draw(t){
    const N=vb(svg,'720 430','400 640'),P=SY_PRO[pro],ST=steps(),ph=phaseOf(ST,t);
    const L=N?{cx:96,top:18,H:290,cx0:194,cw:198,cy:20,bx:12,by:336,bw:376,rh:41}:{cx:180,top:22,H:392,cx0:372,cw:330,cy:24,bx:372,by:234,bw:330,rh:27};
    const H=L.H*P.sc,top=L.top+L.H-H,cx=L.cx,X=u=>cx+u*H,Y=v=>top+v*H;
    const slim=1-.15*ramp(t,.28,.36)*(pro==='child'?.6:1);
    const act=id=>{const s=SY_SITES.find(q=>q.id===id);return ramp(t,s.t0,s.t0+.04)};
    const curS=(()=>{let c=null;SY_SITES.forEach(s=>{if(t>=s.t0)c=s.id});return c})();
    let s=`<defs><radialGradient id="syGlow"><stop offset="0" style="stop-color:var(--tb);stop-opacity:.55"/><stop offset="1" style="stop-color:var(--tb);stop-opacity:0"/></radialGradient></defs>`;
    s+=body(cx,top,H,slim);
    /* spine, kidneys, bladder, abdomen: drawn faintly, strong when their site is active */
    const aB=act('bone'),aG=act('gu'),aP=act('perit'),aM=act('mening'),aL=act('lymph'),aPl=act('pleural'),aMi=act('mil');
    for(let i=0;i<9;i++){const vy=.205+i*.036,hot=i===6&&aB>0,wd=.028*H;
      s+=`<rect x="${f1(cx-wd/2)}" y="${f1(Y(vy))}" width="${f1(wd)}" height="${f1(.03*H*(hot?.6:1))}" rx="2" style="fill:${hot?'var(--tb)':'var(--fibro)'};opacity:${f1(hot?.4+.6*aB:.12+.5*aB)}"/>`}
    [[-1],[1]].forEach(q=>{const sg=q[0];s+=`<ellipse cx="${f1(X(sg*.055))}" cy="${f1(Y(.435))}" rx="${f1(.018*H)}" ry="${f1(.028*H)}" style="fill:${aG>0?'var(--tb)':'var(--fibro)'};opacity:${f1(.12+.55*aG)}"/>`});
    s+=`<ellipse cx="${f1(cx)}" cy="${f1(Y(.548))}" rx="${f1(.024*H)}" ry="${f1(.016*H)}" style="fill:${aG>0?'var(--tb)':'var(--fibro)'};opacity:${f1(.12+.5*aG)}"/>`;
    if(aP>0)s+=`<ellipse cx="${f1(cx)}" cy="${f1(Y(.485))}" rx="${f1(.085*H*slim)}" ry="${f1(.045*H)}" style="fill:var(--tb);fill-opacity:${f1(.12*aP)};stroke:var(--tb);stroke-width:1.4;stroke-dasharray:4 3;opacity:${f1(aP)}"/>`;
    /* lungs with this profile's lesions */
    const ls=.00118*H,lx=cx-100*ls,ly=top+.145*H;
    const grow=ramp(t,.0,.12),les=P.les.map(l=>Object.assign({},l,{r:l.r*Math.max(.05,grow)}));
    if(aMi>0)les.push({kind:'miliary',side:'R',u:0,v:0});
    const lg=lung(lx,ly,ls,{hl:t<.18&&pro==='adult'?'upper':null,lesions:les});s+=lg.svg;if(aPl>0)s+=syEffusion(lx,ly,ls,aPl);
    /* lymph nodes at the neck */
    [[-1],[1]].forEach(q=>{const sg=q[0];for(let i=0;i<3;i++)s+=`<circle cx="${f1(X(sg*(.032+i*.009)))}" cy="${f1(Y(.128+i*.012))}" r="${f1(.008*H*(1+aL*.7))}" style="fill:${aL>0?'var(--tb)':'var(--fibro)'};opacity:${f1(.25+.7*aL)}"/>`});
    /* meninges: a ring over the brain */
    if(aM>0)s+=`<path d="M${f1(X(-.06))} ${f1(Y(.07))}A${f1(.062*H)} ${f1(.062*H)} 0 0 1 ${f1(X(.06))} ${f1(Y(.07))}" style="fill:none;stroke:var(--tb);stroke-width:${f1(2+2*bump(t,.69,.8))};opacity:${f1(aM)}"/>`;
    /* miliary: seeded dots across the body */
    if(aMi>0){const q=rng(77);for(let i=0;i<46;i++){const u=(q()-.5)*.24,v=.12+q()*.5;if(Math.abs(u)>.11&&v>.2&&v<.5)continue;s+=`<circle cx="${f1(X(u*slim))}" cy="${f1(Y(v))}" r="${f1(Math.max(1,.0045*H))}" style="fill:var(--tb);opacity:${f1(.7*ramp(t,.83+i*.002,.88+i*.002))}"/>`}}
    /* fever thermometer and night sweats drops */
    const aF=ramp(t,.2,.24),aS=ramp(t,.25,.29);
    if(P.C.some(c=>c.l==='Fever')&&aF>0){const tx=X(.11),ty=Y(.005),th=.09*H;
      s+=`<g style="opacity:${f1(aF)}"><rect x="${f1(tx-3.5)}" y="${f1(ty)}" width="7" height="${f1(th)}" rx="3.5" style="fill:var(--panel);stroke:var(--muted)"/><circle cx="${f1(tx)}" cy="${f1(ty+th+3)}" r="5.5" style="fill:var(--bad)"/><rect x="${f1(tx-1.8)}" y="${f1(ty+th*(1-.85*ramp(t,.2,.3)))}" width="3.6" height="${f1(th*.85*ramp(t,.2,.3)+2)}" style="fill:var(--bad)"/></g>`}
    if(P.C.some(c=>c.l==='Night sweats')&&aS>0)[[-.085,.03],[-.1,.075],[-.075,.1]].forEach((d,i)=>{const dx=X(d[0]),dy=Y(d[1])+((t*900+i*7)%9);s+=`<path d="M${f1(dx)} ${f1(dy-5)}Q${f1(dx+4)} ${f1(dy+1)} ${f1(dx)} ${f1(dy+3)}Q${f1(dx-4)} ${f1(dy+1)} ${f1(dx)} ${f1(dy-5)}Z" style="fill:var(--air);opacity:${f1(.8*aS)}"/>`});
    if(slim<.99){s+=`<path d="M${f1(X(-.2))} ${f1(Y(.46))}h${f1(.05*H)}M${f1(X(.2))} ${f1(Y(.46))}h${f1(-.05*H)}" style="stroke:var(--warn);stroke-width:1.5" marker-end="url(#syArr)"/><defs>${marker('syArr','var(--warn)')}</defs>`}
    /* lesion label */
    if(grow>.5&&t<.4){const [lx2,ly2]=lg.at(P.les[0].side,P.les[0].u,P.les[0].v),ex=cx-.2*H;s+=`<line x1="${f1(lx2)}" y1="${f1(ly2)}" x2="${f1(ex+2)}" y2="${f1(ly2-14)}" style="stroke:var(--tb);stroke-width:1"/><text x="${f1(ex)}" y="${f1(ly2-11)}" class="t-xs t-end" style="fill:var(--tb)">${P.lesN}</text>`}
    /* site number badges on the body */
    const SP={lymph:[.07,.13],pleural:[-.12,.36],bone:[.03,.43],gu:[.085,.45],perit:[-.05,.5],mening:[.0,-.005],mil:[-.16,.25]};
    SY_SITES.forEach((st,i)=>{const a=act(st.id);if(a<=0)return;let [u,v]=SP[st.id];if(st.id==='pleural'){const p=lg.at('R',1,.9);u=(p[0]-cx)/H-.03;v=(p[1]-top)/H}
      const bx=X(u),by=Y(v),hot=curS===st.id;
      if(hot)s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="${f1(16+6*bump((t*6)%1,0,1))}" style="fill:url(#syGlow)"/>`;
      s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="8" style="fill:${hot?'var(--tb)':'var(--panel)'};stroke:var(--tb);stroke-width:1.4;opacity:${f1(a)}"/><text x="${f1(bx)}" y="${f1(by+3.5)}" class="t-xs t-mid" style="fill:${hot?'#fff':'var(--tb)'};font-weight:700;opacity:${f1(a)}">${i+1}</text>`});
    /* chips */
    let y=L.cy;
    s+=`<text x="${L.cx0}" y="${y+8}" class="t-sm" style="fill:var(--tb)">IN THE LUNGS</text>`;y+=16;
    P.P.forEach(c=>{s+=chip(L.cx0,y,L.cw,'tb',c,ramp(t,c.t,c.t+.04));y+=(c.s?36:26)});
    y+=4;s+=`<text x="${L.cx0}" y="${y+8}" class="t-sm" style="fill:var(--gold);opacity:${f1(.35+.65*ramp(t,.18,.2))}">THE WHOLE BODY</text>`;y+=16;
    if(N){P.C.forEach(c=>{s+=chip(L.cx0,y,L.cw,'gold',c,ramp(t,c.t,c.t+.04));y+=(c.s?36:26)})}
    else{let x=L.cx0;P.C.forEach(c=>{const w=c.s?160:Math.max(70,c.l.length*7.4+24);if(x+w>L.cx0+L.cw){x=L.cx0;y+=36}s+=chip(x,y,w,'gold',c,ramp(t,c.t,c.t+.04));x+=w+8});y+=36}
    P.st.forEach(c=>{const a=ramp(t,c.t,c.t+.03);if(a<=0)return;s+=`<text x="${L.cx0}" y="${f1(y+10)}" class="t-xs" style="fill:var(--ink);opacity:${f1(a)}">${N?c.l.replace('~Half of people with TB in surveys','~Half in surveys'):c.l}</text>`;y+=15});
    /* site bars */
    const aT=ramp(t,.38,.41);
    if(aT>0){s+=`<text x="${L.bx}" y="${L.by-10}" class="t-sm" style="fill:var(--accent);opacity:${f1(aT)}">${N?'OUTSIDE THE LUNGS · share, US 1993–2006':'OUTSIDE THE LUNGS · % of extrapulmonary TB, US'}</text>`;
      SY_SITES.forEach((st,i)=>{const a=act(st.id),ry=L.by+i*L.rh;if(a<=0)return;const hot=curS===st.id;
        const nx=L.bx+10,bx0=N?L.bx+150:L.bx+132,bwM=N?150:120,bw=st.p?st.p/40.4*bwM*ease(a):0;
        s+=`<g style="opacity:${f1(.35+.65*a)}"><circle cx="${nx}" cy="${ry+6}" r="7.5" style="fill:${hot?'var(--tb)':'var(--panel)'};stroke:var(--tb)"/><text x="${nx}" y="${ry+9.5}" class="t-xs t-mid" style="fill:${hot?'#fff':'var(--tb)'};font-weight:700">${i+1}</text>`;
        s+=`<text x="${nx+14}" y="${ry+10}" class="t-lbl" style="font-size:12.5px">${st.n}</text><text x="${nx+14}" y="${ry+(N?24:22)}" class="t-xs">${st.sg}</text>`;
        if(st.p){s+=`<rect x="${bx0}" y="${ry}" width="${f1(bw)}" height="11" rx="3" style="fill:var(--tb);opacity:${hot?.9:.5}"/><text x="${f1(bx0+bw+5)}" y="${ry+9.5}" class="t-xs" style="fill:var(--ink)">${(st.p*a).toFixed(1)}%</text>`}
        else s+=`<text x="${bx0}" y="${ry+9.5}" class="t-xs">not counted separately</text>`;
        s+='</g>'})}
    svg.innerHTML=s;setSt(ph);
    const shown=SY_SITES.filter(q=>t>=q.t0).length;
    $('#syRead').innerHTML=`<span>presentation in <b>${P.name}</b></span><span>stage <b>${t<.18?'lung symptoms':t<.38?'whole-body symptoms':'sites outside the lungs'}</b></span><span>sites lit <b>${shown} of 7</b></span><span>worldwide 2024 <b>84% pulmonary · 16% extrapulmonary</b> <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup></span>`;
    $('#syNote').innerHTML=noteHTML(ST[ph]);
  }
  const stop=playWire(rg,$('#syPlay'),draw,20000,'Replay','symptoms');
  function wire(){const old=$('#sySteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,steps(),rg,draw,stop)}
  $$('[data-sy]').forEach(b=>b.addEventListener('click',()=>{stop();pro=b.dataset.sy;$$('[data-sy]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- screening on 1,000 people ---- */
  const T={
   w4ss:{n:'WHO four-symptom screen',g:'people with HIV (12 studies)',se:78.9,sp:49.6,c:`<sup class="c" data-ref="Getahun2011" title="Source 197">197</sup>`,x:`Developed from an individual-participant meta-analysis; adding any chest X-ray abnormality raised sensitivity to 90.6% and lowered specificity to 38.9%.`},
   w4noart:{n:'Four-symptom screen, not on ART',g:'people with HIV not yet on ART',se:89.4,sp:28.1,c:`<sup class="c" data-ref="Hamada2018" title="Source 215">215</sup>`,x:`Sensitive, but it flags most people without TB too, so many confirmatory tests are needed.`},
   w4art:{n:'Four-symptom screen, on ART',g:'people with HIV taking ART',se:51.0,sp:70.7,c:`<sup class="c" data-ref="Hamada2018" title="Source 215">215</sup>`,x:`On ART, TB is quieter and the screen misses about half of it. Adding a chest X-ray raised sensitivity from 52.2% to 84.6% in two studies.`},
   crp:{n:'CRP of 10 mg/L or more',g:'ambulatory people with HIV',se:77,sp:74,c:`<sup class="c" data-ref="Dhana2022" title="Source 118">118</sup>`,x:`A finger-prick blood test. At 10% prevalence, CRP strategies needed 244–272 fewer confirmatory tests per 1,000 than the symptom screen, at the cost of missing 1–2 more cases.`},
   cough2:{n:'Cough for 2 weeks or more',g:'HIV-negative or unknown-status adults (41 studies)',se:42.1,sp:94.4,c:`<sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup>`,x:`Specific but insensitive: most people it flags need testing, but it misses more than half of TB.`},
   anysym:{n:'Any TB symptom',g:'community adults (29 studies)',se:70.6,sp:65.1,c:`<sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup>`,x:`Asking about any symptom catches more TB than cough alone, but flags many more people without it.`},
   cxr:{n:'Any chest X-ray abnormality',g:'community adults (23 studies)',se:94.7,sp:89.1,c:`<sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup>`,x:`An X-ray finds TB that causes no symptoms. It cannot prove TB, so a flagged person still needs a bacteriological test.`},
   cxrs:{n:'X-ray abnormality suggestive of TB',g:'community adults (19 studies)',se:84.8,sp:95.6,c:`<sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup>`,x:`A stricter reading: fewer false alarms, more missed cases.`},
   combo:{n:'Cough ≥ 2 weeks or abnormal X-ray',g:'community adults (15 studies)',se:99.2,sp:84.9,c:`<sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup>`,x:`Either test positive counts as positive. This pairing is why X-ray-based screening is used alongside symptoms.`},
   cad:{n:'Computer-aided detection (CAD4TB v7)',g:'adults with cough ≥ 2 weeks, multinational cohort',se:90,sp:70.3,c:`<sup class="c" data-ref="Crowder2026" title="Source 98">98</sup>`,x:`Software reads a digital chest X-ray and gives an abnormality score; here the threshold is set for 90% sensitivity. CAD performs worse in people over 60 and after previous TB. <sup class="c" data-ref="Qin2021" title="Source 382">382</sup>`}};
  const ic=$('#syIcons'),sel=$('#syTest'),pr=$('#syPrev');
  function drawIco(){const N=vb(ic,'720 316','400 640'),k=T[sel.value],prev=+pr.value/100;
    const nTB=Math.round(1000*prev),TP=Math.round(nTB*k.se/100),FN=nTB-TP,nNo=1000-nTB,FP=Math.round(nNo*(1-k.sp/100)),TN=nNo-FP;
    const cols=N?25:50,cell=N?15:13.6,x0=N?13:13,y0=N?18:16;let s='';
    s+=`<text x="${x0}" y="${y0-5}" class="t-xs">${N?'1,000 people · reading left to right':'1,000 people, reading left to right: people with TB first, then people without TB'}</text>`;
    for(let i=0;i<1000;i++){const cx=x0+(i%cols)*cell+cell/2,cy=y0+Math.floor(i/cols)*cell+cell/2,r=cell*.36;
      let st;if(i<TP)st='fill:var(--tb)';else if(i<nTB)st='fill:none;stroke:var(--tb);stroke-width:1.6';else if(i<nTB+FP)st='fill:var(--warn);opacity:.85';else st='fill:var(--line)';
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(i<nTB&&i>=TP?r-.8:r)}" style="${st}"/>`}
    const by=y0+Math.ceil(1000/cols)*cell+16;
    s+=`<text x="${x0}" y="${by}" class="t-sm" style="fill:var(--ink)">${N?'':'Flagged for a confirmatory test: '}<tspan style="fill:var(--tb);font-weight:700">${TP} with TB</tspan> + <tspan style="fill:var(--warn);font-weight:700">${FP} without</tspan>${N?' flagged':''} · <tspan style="fill:var(--tb)">${FN} missed</tspan></text>`;
    ic.innerHTML=s;
    const ppv=TP+FP?TP/(TP+FP)*100:0,npv=TN+FN?TN/(TN+FN)*100:100;
    $('#syPrevV').textContent=(+pr.value).toFixed(1).replace('.0','')+'%';
    $('#syRes').innerHTML=`Of 1,000 people, <b>${nTB}</b> have TB. The screen flags <b>${TP}</b> of them and misses <b>${FN}</b>; it also flags <b>${FP}</b> people without TB. So <b>${TP+FP}</b> people would go on to a confirmatory test. Of those flagged, ${f1(ppv)}% have TB; of those cleared, ${f1(npv)}% truly do not. <br><b>Anyone with symptoms should see a clinician, whatever a screen shows.</b>`;
    $('#syIcoNote').innerHTML=noteHTML({k:'Screen · '+k.g,t:k.n,txt:`Sensitivity ${k.se}%, specificity ${k.sp}%. ${k.c} ${k.x}`,
      pt:`A screen sorts people into "test further" and "probably not TB". It is never a diagnosis, and its results change with how common TB is in the group.`,
      hook:prev<=.05?`Where TB is rare, a negative screen is reassuring (high NPV) but most positives are false alarms (low PPV).`:`As prevalence rises, a negative screen becomes less reassuring: the four-symptom screen's NPV fell from 97.7% at 5% to 90.0% at 20%. <sup class="c" data-ref="Getahun2011" title="Source 197">197</sup>`})}
  sel.addEventListener('change',drawIco);pr.addEventListener('input',drawIco);
  redraws.symptoms=(()=>{const prv=redraws.symptoms;return()=>{prv&&prv();drawIco()}})();
  drawIco();
};
/* =============== 2.2 TB infection tests: TST & IGRA =============== */
/* illustrative values per person: ind/ery mm, QFT IU/mL (tb1, tb2, mitogen, nil), T-SPOT spots (a, b, mitogen, nil) */
const TS_PEOPLE={
 'inf':{ind:14,ery:21,tb1:1.6,tb2:2.2,mit:9,nil:.08,sa:18,sb:12,sm:40,sn:1},
 'inf+bcg':{ind:17,ery:25,tb1:1.6,tb2:2.2,mit:9,nil:.08,sa:18,sb:12,sm:40,sn:1},
 'no':{ind:0,ery:4,tb1:.1,tb2:.13,mit:8.5,nil:.08,sa:1,sb:0,sm:38,sn:0},
 'no+bcg':{ind:11,ery:17,tb1:.1,tb2:.13,mit:8.5,nil:.08,sa:1,sb:0,sm:38,sn:0}};
const TS_HOURS=t=>t<.08?t/.08*.5:.5+(t-.08)/.92*71.5;
const TS_STEPS=[
 {from:0,at:.03,k:'Hour 0 · one visit for blood, the first of two for the skin',t:'Injection and blood draw',
  txt:`The Mantoux TST is 0.1 mL of 5 tuberculin units (TU) of purified protein derivative (PPD), injected into the skin of the forearm, which raises a small pale bleb. It is read 48–72 hours later. <sup class="c" data-ref="ATS2000" title="Source 17">17</sup> For an IGRA, blood is drawn into tubes at the same visit; no second visit is needed. <sup class="c" data-ref="Mazurek2010" title="Source 316">316</sup>`,
  pt:`The skin test is a tiny injection just under the skin, and you come back 2 or 3 days later. The blood test is one ordinary blood sample.`,
  hook:`Mantoux: 0.1 mL of 5 TU PPD intradermally; read at 48–72 h.`},
 {from:.08,at:.18,k:'Hours 1–20',t:'The immune system remembers',
  txt:`Both tests show whether the body has met the TB bacterium. Neither can tell TB infection from TB disease. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup> In someone infected, T cells gather where the tuberculin was injected and a firm swelling builds over the next 2–3 days (drawn schematically here). Meanwhile the IGRA tubes incubate for 16–24 hours with TB antigens. <sup class="c" data-ref="Mazurek2010" title="Source 316">316</sup>`,
  pt:`If your body has met TB before, its defence cells recognise the test material and react. That reaction is what both tests detect.`,
  hook:`TST and IGRA detect immune memory, not live bacteria. A positive test never proves TB disease.`},
 {from:.3,at:.35,k:'Hour 24 · QuantiFERON',t:'Interferon-γ in the tubes',
  txt:`QuantiFERON is positive when the TB antigen response minus Nil is at least 0.35 IU/mL and at least 25% of the Nil value, with Nil at 8.0 IU/mL or less. It is indeterminate if Nil is above 8.0, or if the TB response is negative and the mitogen control is below 0.5 IU/mL. <sup class="c" data-ref="Mazurek2010" title="Source 316">316</sup> QFT-Plus adds a second antigen tube (TB2) that stimulates CD8+ as well as CD4+ T cells; the first FDA record naming it is dated 7 June 2017. <sup class="c" data-ref="Barcellini2016,FDA-QFTPlus" title="Source 27,167">27,167</sup> The antigens, ESAT-6 and CFP-10, are absent from BCG. <sup class="c" data-ref="Andersen2000" title="Source 12">12</sup>`,
  pt:`In the lab, your blood is mixed with pieces of the TB germ. If your defence cells know TB, they release a chemical signal, interferon-gamma, that the test measures.`,
  hook:`QFT positive: TB − Nil ≥ 0.35 IU/mL (and ≥ 25% of Nil). The mitogen tube is the positive control.`},
 {from:.4,at:.47,k:'Hour 24–30 · T-SPOT.TB',t:'Counting spots',
  txt:`T-SPOT.TB counts the cells that release interferon-γ, one spot each. It is positive at 8 spots or more, borderline at 5–7 and negative at 4 or fewer, provided Nil is 10 spots or fewer; a mitogen well under 20 spots with a negative TB response is indeterminate. <sup class="c" data-ref="Mazurek2010" title="Source 316">316</sup> Pooled sensitivity in confirmed TB was 90% for T-SPOT.TB and 70% for QFT-GIT. <sup class="c" data-ref="Pai2008" title="Source 366">366</sup>`,
  pt:`This version of the blood test counts reacting cells one by one, as dots in a tiny well.`,
  hook:`T-SPOT.TB: ≥ 8 spots positive, 5–7 borderline, ≤ 4 negative.`},
 {from:.62,at:.74,k:'Hours 48–72 · the return visit',t:'Measuring the induration',
  txt:`Only the raised, firm part, the induration, is measured across the forearm, never the redness around it. <sup class="c" data-ref="ATS2000" title="Source 17">17</sup> A result of 5 mm or more is positive in close contacts, immunosuppressed people (including people with HIV), people with evidence of current or past TB and people taking TNF blockers; 10 mm in other risk groups; 15 mm in everyone else. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup> TST specificity is about 97% without BCG but about 60% with a BCG history. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`,
  pt:`A nurse feels for the firm bump and measures it in millimetres with a ruler. Redness alone does not count.`,
  hook:`Measure induration, not erythema. Cut-offs: 5, 10 or 15 mm by risk group.`},
 {from:.86,at:.97,k:'After the result',t:'What a positive result means',
  txt:`A positive test shows infection, not illness, so TB disease must be excluded (usually with symptoms and a chest X-ray) before preventive treatment. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup> Most people with a positive test never develop TB disease: positive predictive values for progression were 2.7% for commercial IGRAs and 1.5% for the TST, with negative predictive values of 99.7% and 99.4%. <sup class="c" data-ref="Diel2012" title="Source 126">126</sup> Next: <a href="#tpt" data-go="tpt">Treating TB infection</a>.`,
  pt:`Most people with a positive skin or blood test never get sick with TB. Preventive treatment lowers the risk further.`,
  hook:`PPV for progression under 3% for both tests; NPV over 99%. <sup class="c" data-ref="Diel2012,Hamada2023" title="Source 126,217">126,217</sup>`}];

inits.tests=()=>{
  const svg=$('#tsSvg'),rg=$('#tsT');let view='both',inf=true,bcg=false,setSt=()=>{};
  const who=()=>TS_PEOPLE[(inf?'inf':'no')+(bcg?'+bcg':'')];
  const sq=v=>Math.sqrt(clamp(v/10,0,1));/* square-root scale for interferon-γ, 0–10 IU/mL */
  function tst(B,h,P){let s='';const fw=Math.min(B.w-20,440),fx=B.x+(B.w-fw)/2,fy=B.y+34,fh=fw*.3,mm=fw/120,cx=fx+fw*.55,cy=fy+fh*.48;
    s+=`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--accent)">SKIN TEST · TST (MANTOUX)</text>`;
    const g=ease(ramp(h,6,48)),ind=P.ind*g,ery=P.ery*ease(ramp(h,4,40)),bleb=ramp(h,.05,.3)*(1-ramp(h,.6,8));
    s+=forearm(fx,fy,fw,ind,{ery,bleb,ruler:h>=48});
    /* the syringe comes in at a shallow angle, then leaves */
    const sa=h<.5?1:1-ramp(h,.5,1.5);
    if(sa>0){const nx=cx+4+(1-ramp(h,0,.12))*40;s+=`<g style="opacity:${f1(sa)}" transform="rotate(-12 ${f1(nx)} ${f1(cy)})"><line x1="${f1(nx)}" y1="${f1(cy)}" x2="${f1(nx+30)}" y2="${f1(cy)}" style="stroke:var(--muted);stroke-width:1.4"/><rect x="${f1(nx+30)}" y="${f1(cy-6)}" width="70" height="12" rx="2" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${f1(nx+32)}" y="${f1(cy-4)}" width="${f1(40*(1-ramp(h,.12,.4)))}" height="8" style="fill:var(--accent);opacity:.35"/><rect x="${f1(nx+100)}" y="${f1(cy-9)}" width="5" height="18" style="fill:var(--muted)"/></g>`}
    if(h>=48){const ok=ind>=.5;s+=`<text x="${f1(cx)}" y="${f1(fy-6)}" class="t-lbl t-mid" style="fill:var(--accent)">${ok?'induration '+Math.round(ind)+' mm':'no induration (0 mm)'}</text>`;
      if(P.ery>ind+3)s+=`<text x="${f1(fx+fw)}" y="${f1(fy+fh+(h>=48?44:16))}" class="t-xs t-end">redness ${Math.round(ery)} mm: not measured</text>`}
    /* under the skin: an inset of T cells gathering */
    const R=Math.min(58,B.w*.17),ix=B.x+B.w/2,iy=fy+fh+56+R;
    s+=`<line x1="${f1(cx)}" y1="${f1(cy+4)}" x2="${f1(ix)}" y2="${f1(iy-R)}" style="stroke:var(--line);stroke-width:1;stroke-dasharray:3 3"/>`;
    s+=`<clipPath id="tsClip"><circle cx="${f1(ix)}" cy="${f1(iy)}" r="${f1(R)}"/></clipPath><circle cx="${f1(ix)}" cy="${f1(iy)}" r="${f1(R)}" style="fill:var(--skin);fill-opacity:.35;stroke:var(--skin-line)"/>`;
    s+=`<g clip-path="url(#tsClip)"><path d="M${f1(ix-R)} ${f1(iy+R*.55)}Q${f1(ix)} ${f1(iy+R*.35)} ${f1(ix+R)} ${f1(iy+R*.6)}" style="fill:none;stroke:var(--vessel);stroke-width:5;opacity:.35"/>`;
    const q=rng(41),nT=Math.round((P.ind?16:2)*ramp(h,2,40)),pull=ramp(h,2,46);
    for(let i=0;i<16;i++){const a=q()*Math.PI*2,d=R*(.2+q()*.55),sx=ix+(q()-.5)*R*1.6,sy=iy+R*.5;if(i>=Math.max(nT,P.ind?0:2))continue;
      const tx=ix+Math.cos(a)*d*.75,ty=iy-R*.15+Math.sin(a)*d*.5,k=P.ind?pull:ramp(h,2,30)*.4;s+=tcell(lerp(sx,tx,k),lerp(sy,ty,k),4.2,{act:P.ind>0&&h>20})}
    s+='</g>';
    s+=`<text x="${f1(ix)}" y="${f1(iy+R+14)}" class="t-xs t-mid">${N0?'under the skin (schematic)':'under the skin: T cells gather (schematic)'}</text>`;
    return s}
  let N0=false;
  function igra(B,h,P){let s='';s+=`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--accent)">BLOOD TEST · IGRA (QFT-PLUS, T-SPOT.TB)</text>`;
    const tubes=[['Nil',P.nil,'var(--fibro)'],['TB1',P.tb1,'var(--accent)'],['TB2',P.tb2,'var(--accent)'],['Mitogen',P.mit,'var(--gold)']];
    const gap=Math.min(70,(B.w-20)/4),tx0=B.x+(B.w-gap*4)/2+gap/2,ty=B.y+30,th=62,fill=ramp(h,0,.4);
    tubes.forEach((tb,i)=>{const x=tx0+i*gap;s+=`<rect x="${f1(x-10)}" y="${ty+8}" width="20" height="${th}" rx="8" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${f1(x-8.5)}" y="${f1(ty+8+th-2-(th-6)*.8*fill)}" width="17" height="${f1((th-6)*.8*fill)}" rx="6" style="fill:var(--blood);opacity:.75"/><rect x="${f1(x-12)}" y="${ty}" width="24" height="10" rx="3" style="fill:${tb[2]}"/><text x="${f1(x)}" y="${ty+th+22}" class="t-xs t-mid" style="fill:var(--ink)">${tb[0]}</text>`});
    const inc=ramp(h,.5,24),py=ty+th+32;
    s+=`<rect x="${f1(tx0-gap/2+4)}" y="${py}" width="${f1(gap*4-8)}" height="6" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(tx0-gap/2+4)}" y="${py}" width="${f1((gap*4-8)*inc)}" height="6" rx="3" style="fill:var(--accent)"/><text x="${f1(tx0-gap/2+4)}" y="${py+18}" class="t-xs">${h<24?'incubating with TB antigens · 16–24 h':'incubation done · interferon-γ measured'}</text>`;
    /* bars: response minus Nil, square-root scale */
    const by=py+46,bh=96,bx0=tx0-gap/2+30,bw=gap*4-40,Y=v=>by+bh-bh*sq(v),grow=ease(ramp(h,24,28));
    s+=`<line x1="${f1(bx0)}" x2="${f1(bx0+bw)}" y1="${by+bh}" y2="${by+bh}" class="axis"/>`;
    [0,.35,1,4,10].forEach(v=>{s+=`<text x="${f1(bx0-5)}" y="${f1(Y(v)+3)}" class="t-xs t-end"${v===.35?' style="fill:var(--bad)"':''}>${v}</text>`});
    s+=`<line x1="${f1(bx0)}" x2="${f1(bx0+bw)}" y1="${f1(Y(.35))}" y2="${f1(Y(.35))}" style="stroke:var(--bad);stroke-width:1.3;stroke-dasharray:5 3"/><text x="${f1(bx0)}" y="${by+bh+27}" class="t-xs" style="fill:var(--bad)">- - - cut-off: TB − Nil ≥ 0.35 IU/mL</text>`;
    const bars=[['TB1 − Nil',P.tb1-P.nil],['TB2 − Nil',P.tb2-P.nil],['Mitogen − Nil',P.mit-P.nil]];
    bars.forEach((b,i)=>{const w=bw/3*.5,x=bx0+bw/3*(i+.25),v=Math.max(0,b[1])*grow;s+=`<rect x="${f1(x)}" y="${f1(Y(v))}" width="${f1(w)}" height="${f1(by+bh-Y(v))}" style="fill:${i===2?'var(--gold)':'var(--accent)'};opacity:.85"/><text x="${f1(x+w/2)}" y="${by+bh+12}" class="t-xs t-mid">${b[0]}</text>`;
      if(grow>.95)s+=`<text x="${f1(x+w/2)}" y="${f1(Y(v)-4)}" class="t-xs t-mid" style="fill:var(--ink)">${b[1].toFixed(2)}</text>`});
    s+=`<text x="${f1(bx0-28)}" y="${f1(by-12)}" class="t-xs">IU/mL (√ scale)</text>`;
    if(h>=26){const pos=Math.max(P.tb1,P.tb2)-P.nil>=.35;s+=`<text x="${f1(bx0+bw)}" y="${f1(by-12)}" class="t-lbl t-end" style="fill:${pos?'var(--tb)':'var(--good)'}">QFT ${pos?'positive':'negative'}</text>`}
    /* T-SPOT wells */
    const wy=by+bh+64,wr=Math.min(19,gap*.3),sp=ramp(h,26,34),W=[['Nil',P.sn],['Panel A',P.sa],['Panel B',P.sb],['Control',P.sm]];
    s+=`<text x="${f1(tx0-gap/2+4)}" y="${f1(wy-wr-8)}" class="t-xs" style="fill:var(--accent)">T-SPOT.TB wells · ≥ 8 spots positive</text>`;
    W.forEach((w,i)=>{const x=tx0+i*gap,q=rng(60+i),n=Math.round(Math.min(w[1],40)*sp);s+=`<circle cx="${f1(x)}" cy="${f1(wy)}" r="${f1(wr)}" style="fill:var(--field);stroke:var(--muted)"/>`;
      for(let k=0;k<n;k++){const a=q()*Math.PI*2,d=Math.sqrt(q())*wr*.82;s+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(wy+Math.sin(a)*d)}" r="1.5" style="fill:var(--nuc)"/>`}
      s+=`<text x="${f1(x)}" y="${f1(wy+wr+12)}" class="t-xs t-mid" style="fill:var(--ink)">${w[0]}</text>`;if(sp>0)s+=`<text x="${f1(x)}" y="${f1(wy+wr+24)}" class="t-xs t-mid">${w[1]>=40&&sp>=1?'≥ 20':n} spots</text>`});
    return s}
  function draw(t){const P=who(),h=TS_HOURS(t);
    let s='',W,Hh,boxes;
    N0=NARROW();
    if(N0){if(view==='both'){W=400;Hh=780;boxes={tst:{x:10,y:44,w:380},igra:{x:10,y:392,w:380}}}else if(view==='tst'){W=400;Hh=390;boxes={tst:{x:10,y:44,w:380}}}else{W=400;Hh=440;boxes={igra:{x:10,y:44,w:380}}}}
    else{if(view==='both'){W=720;Hh=440;boxes={tst:{x:12,y:44,w:350},igra:{x:378,y:44,w:330}}}else if(view==='tst'){W=720;Hh=412;boxes={tst:{x:40,y:44,w:640}}}else{W=720;Hh=440;boxes={igra:{x:120,y:44,w:480}}}}
    svg.setAttribute('viewBox',`0 0 ${W} ${Hh}`);svg.dataset.mode=N0?'n':'w';
    /* hours axis with milestones */
    const ax0=40,ax1=W-20,X=v=>lerp(ax0,ax1,v/72);
    s+=`<line x1="${ax0}" x2="${ax1}" y1="20" y2="20" class="axis"/>`;
    [0,12,24,36,48,60,72].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="16" y2="24" class="axis"/><text x="${f1(X(v))}" y="34" class="t-xs t-mid">${v} h</text>`});
    s+=`<rect x="${f1(X(48))}" y="15" width="${f1(X(72)-X(48))}" height="10" rx="3" style="fill:var(--accent);opacity:.15"/><text x="${f1(X(60))}" y="12" class="t-xs t-mid" style="fill:var(--accent)">TST reading window</text>`;
    if(!N0)s+=`<text x="${f1(X(24))}" y="12" class="t-xs t-mid" style="fill:var(--accent)">IGRA result</text>`;
    s+=`<circle cx="${f1(X(h))}" cy="20" r="5" style="fill:var(--accent)"/>`;
    if(view==='both'&&!N0)s+=`<line x1="370" x2="370" y1="50" y2="${Hh-10}" style="stroke:var(--line)"/>`;
    if(boxes.tst)s+=tst(boxes.tst,h,P);
    if(boxes.igra)s+=igra(boxes.igra,h,P);
    svg.innerHTML=s;
    const ph=phaseOf(TS_STEPS,t);setSt(ph);
    const ind=Math.round(P.ind*ease(ramp(h,6,48)));
    const cut=c=>h>=48?(P.ind>=c?'<b style="color:var(--tb)">+</b>':'<b>−</b>'):'…';
    $('#tsRead').innerHTML=`<span>hour <b>${h<1?h.toFixed(1):Math.round(h)}</b></span><span>person <b>${inf?'TB infection':'no TB infection'}${bcg?', BCG after age 1':''}</b></span><span>TST <b>${h>=48?ind+' mm':'not yet readable'}</b> · at 5 mm ${cut(5)} 10 mm ${cut(10)} 15 mm ${cut(15)}</span><span>IGRA <b>${h>=26?(Math.max(P.tb1,P.tb2)-P.nil>=.35?'positive':'negative'):'pending'}</b></span>`;
    const st=Object.assign({},TS_STEPS[ph]);
    if(ph===4){const P2=P;st.txt+=` <b>This person:</b> ${P2.ind?P2.ind+' mm':'0 mm'}${!inf&&bcg?`. This is BCG, not infection: after BCG given past age 1, 41.8% had a TST of 10 mm or more. Positive at the 5 and 10 mm cut-offs, negative at 15 mm, while the IGRA stays negative. <sup class="c" data-ref="Farhat2006,Pai2008" title="Source 158,366">158,366</sup>`:inf?`, positive at every cut-off.`:`, negative.`}`}
    $('#tsNote').innerHTML=noteHTML(st)}
  const stop=playWire(rg,$('#tsPlay'),draw,18000,'Replay','tests');
  setSt=stepWire($('#tsSteps'),TS_STEPS,rg,draw,stop);
  $$('[data-tsv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.tsv;$$('[data-tsv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#tsInf').addEventListener('click',()=>{inf=!inf;$('#tsInf').setAttribute('aria-pressed',inf);draw(+rg.value)});
  $('#tsBcg').addEventListener('click',()=>{bcg=!bcg;$('#tsBcg').setAttribute('aria-pressed',bcg);draw(+rg.value)});
  draw(+rg.value);

  /* ---- TST cut-off calculator ---- */
  const GRP={'5a':[5,'a close contact of a person with TB'],'5b':[5,'immunosuppressed, including people with HIV'],'5c':[5,'someone with evidence of current or past TB'],'5d':[5,'someone taking TNF blockers'],
    '10a':[10,'someone born in a high-incidence country'],'10b':[10,'someone with occupational exposure'],'10c':[10,'someone with medical risk factors for progression'],'15':[15,'someone with no risk factors']};
  const cs=$('#tsCalc'),iR=$('#tsInd'),gS=$('#tsGrp'),pOn=$('#tsPrevOn'),pR=$('#tsPrev');
  function calc(){const N=vb(cs,'720 232','400 200'),ind=+iR.value,g=GRP[gS.value],cut=g[0],prev=+pR.value;
    const fw=N?360:440,fx=N?20:140,fy=24,mm=fw/120,cx=fx+fw*.55;
    let s=forearm(fx,fy,fw,ind,{ery:ind?ind+6:0,ruler:true});
    const ry=fy+fw*.3+10,x0=cx-15*mm;
    if(cut<=30){const xc=x0+(15-cut/2)*mm,xc2=x0+(15+cut/2)*mm;s+=`<path d="M${f1(xc)} ${f1(ry+18)}V${f1(ry+26)}M${f1(xc2)} ${f1(ry+18)}V${f1(ry+26)}M${f1(xc)} ${f1(ry+22)}H${f1(xc2)}" style="stroke:var(--bad);stroke-width:1.4"/><text x="${f1(cx)}" y="${f1(ry+38)}" class="t-xs t-mid" style="fill:var(--bad)">cut-off for this group: ${cut} mm</text>`}
    s+=`<text x="${f1(cx)}" y="${f1(fy-8)}" class="t-lbl t-mid" style="fill:var(--accent)">${ind} mm induration</text>`;
    cs.innerHTML=s;
    $('#tsIndV').textContent=ind+' mm';$('#tsPrevV').textContent=prev+' mm';pR.disabled=!pOn.checked;
    const pos=ind>=cut,conv=pOn.checked&&ind-prev>=10;
    const v=$('#tsVerdict');v.className='verdict '+(pos?'no':'yes');
    v.innerHTML=`${ind} mm in ${g[1]}: <b>${pos?'positive':'negative'}</b> at the ${cut} mm cut-off.${pOn.checked?` ${conv?`An increase of ${ind-prev} mm within 2 years: <b>this meets the conversion rule</b> (10 mm or more), which suggests recent infection.`:`An increase of ${Math.max(0,ind-prev)} mm within 2 years does not meet the 10 mm conversion rule.`}`:''}<small>A teaching tool, not an interpretation of your result. A positive TST shows infection, not disease; a clinician checks for TB disease next. <sup class="c" data-ref="Lewinsohn2017,ATS2000" title="Source 17,284">17,284</sup></small>`;
    const other=[5,10,15].filter(c=>c!==cut).map(c=>`${c} mm: ${ind>=c?'positive':'negative'}`).join(', ');
    $('#tsCalcNote').innerHTML=noteHTML({k:'TST cut-offs',t:pos?'Positive for this group':'Negative for this group',
      txt:`The same ${ind} mm would read ${other} in the other groups. The 5 mm groups are close contacts, immunosuppressed people (including people with HIV), people with evidence of current or past TB and people taking TNF blockers; the 10 mm groups are other people at increased risk, such as people born in high-incidence countries, with occupational exposure or with medical risk factors for progression; 15 mm applies to everyone else. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup> In a BCG-vaccinated person at increased risk, a positive TST is taken to show infection, because no method reliably tells a BCG reaction apart. <sup class="c" data-ref="ATS2000" title="Source 17">17</sup>`,
      pt:`The lower the cut-off, the more seriously a small reaction is taken. That is because TB would be more likely, or more dangerous, for people in those groups.`,
      hook:`5 mm: contacts, HIV/immunosuppression, TNF blockers, prior TB on X-ray. 10 mm: other risk groups. 15 mm: no risk factors. Conversion: ≥ 10 mm rise in 2 years.`})}
  [iR,pR].forEach(e=>e.addEventListener('input',calc));[gS,pOn].forEach(e=>e.addEventListener('change',calc));
  calc();

  /* ---- TST or IGRA decision tree ---- */
  const tr=$('#tsTree'),Q={age:$('#tsQAge'),risk:$('#tsQRisk'),bcg:$('#tsQBcg'),ret:$('#tsQRet'),ser:$('#tsQSer')};
  function tree(){const N=vb(tr,'720 300','400 520'),u5=Q.age.value==='u5',hi=Q.risk.value==='hi',b=Q.bcg.value==='y',noRet=Q.ret.value==='n',ser=Q.ser.value==='y';
    /* nodes: id, x, y, label lines, kind (q question, a answer) */
    const W=N?{q1:[200,30],q2:[260,120],q3:[290,220],a1:[90,120],a2:[100,220],a3:[120,320],a4:[300,320]}:{q1:[120,40],q2:[330,40],q3:[540,40],a1:[120,170],a2:[330,170],a3:[540,170],a4:[630,262]};
    const nodes={q1:['Under 5','and healthy?'],q2:['High risk of','progression?'],q3:['BCG, or unlikely','to return?'],
      a1:['TST suggested','conditional · very low'],a2:['Insufficient data','to prefer either test'],a3:['IGRA recommended','strong · moderate quality'],a4:['Strong IGRA rec.','does not apply']};
    const path=u5?['q1','a1']:hi?['q1','q2','a2']:(b||noRet)?['q1','q2','q3','a3']:['q1','q2','q3','a4'];
    const edges=[['q1','a1','yes'],['q1','q2','no'],['q2','a2','yes'],['q2','q3','no'],['q3','a3','yes'],['q3','a4','no']];
    let s=`<defs>${marker('tsAr','var(--muted)')}${marker('tsArH','var(--accent)')}</defs>`;const bw=N?150:170,bh=40;
    edges.forEach(e=>{const A=W[e[0]],Bn=W[e[1]],on=path.includes(e[0])&&path.includes(e[1]);
      const x1=A[0],y1=A[1]+bh/2,x2=Bn[0],y2=Bn[1]-bh/2;let d;
      if(!N&&A[1]===Bn[1])d=`M${A[0]+bw/2} ${A[1]}H${Bn[0]-bw/2-4}`;else if(!N&&e[1]==='a4')d=`M${A[0]+bw/2} ${A[1]}H${Bn[0]}V${Bn[1]-bh/2-4}`;else d=`M${x1} ${y1}C${x1} ${(y1+y2)/2} ${x2} ${(y1+y2)/2} ${x2} ${y2-4}`;
      s+=`<path d="${d}" style="fill:none;stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?2.4:1.4}" marker-end="url(#${on?'tsArH':'tsAr'})"/>`;
      const m=(!N&&A[1]===Bn[1])?[(A[0]+Bn[0])/2,A[1]-9]:(!N&&e[1]==='a4')?[Bn[0]+8,A[1]+40]:[(x1+x2)/2+(x2<x1?-12:12),(y1+y2)/2];
      s+=`<text x="${f1(m[0])}" y="${f1(m[1])}" class="t-xs t-mid" style="fill:${on?'var(--accent)':'var(--muted)'}">${e[2]}</text>`});
    Object.keys(nodes).forEach(k=>{const [x,y]=W[k],on=path.includes(k),isA=k[0]==='a',L=nodes[k];
      s+=`<rect x="${x-bw/2}" y="${y-bh/2}" width="${bw}" height="${bh}" rx="${isA?6:18}" style="fill:${on?(isA?'var(--accent)':'var(--accent-soft)'):'var(--panel)'};stroke:${on?'var(--accent)':'var(--line)'};stroke-width:1.4"/>`;
      s+=`<text x="${x}" y="${y-3}" class="t-lbl t-mid" style="font-size:12px;fill:${on&&isA?'var(--panel)':'var(--ink)'}">${L[0]}</text><text x="${x}" y="${y+12}" class="t-xs t-mid" style="fill:${on&&isA?'var(--panel)':'var(--muted)'}">${L[1]}</text>`});
    if(ser){const sx=20,sy=N?380:232;s+=`<rect x="${sx}" y="${sy}" width="${N?360:420}" height="${N?120:58}" rx="8" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      const lines=N?['Serial testing: most IGRA conversions','in low-incidence settings were false','positives (76% of QFT converters were','negative again at 6 months). Retest.','Repeated TSTs can boost BCG reactivity.']:['Serial testing: 76% of QFT and 77% of T-SPOT.TB converters','were negative again 6 months later. Retest apparent converters.','Repeated TSTs can boost BCG reactivity.'];
      lines.forEach((l,i)=>s+=`<text x="${sx+10}" y="${sy+16+i*(N?20:15)}" class="t-xs" style="fill:var(--ink)">${l}</text>`)}
    tr.innerHTML=s;
    const end=path[path.length-1];
    const TX={a1:`For healthy children under 5, the guideline suggests a TST over an IGRA (conditional recommendation; very low-quality evidence). <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`,
      a2:`For people at high risk of progression, there were insufficient data to recommend one test over the other. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup> TST sensitivity is about 43% in people with HIV. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`,
      a3:`The guideline strongly recommends an IGRA over the TST for people aged 5 or older who are likely infected, at low or intermediate risk of progression, and either BCG-vaccinated or unlikely to return for a TST reading (moderate-quality evidence). <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`,
      a4:`Not BCG-vaccinated and likely to return: the strong IGRA recommendation quoted here does not cover this case; the full guideline has the details. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`};
    $('#tsTreeNote').innerHTML=noteHTML({k:'Choosing a test',t:nodes[end][0],txt:TX[end]+(ser?` In 2,418 US healthcare workers tested every 6 months, 6.1% converted on QFT-GIT, 8.3% on T-SPOT.TB and 0.9% on the TST, and most IGRA converters reverted; repeat draws 2 weeks apart disagreed in 8.8–12.6%. <sup class="c" data-ref="Dorman2014HCW" title="Source 139">139</sup>`:''),
      pt:`Both tests answer the same question. The choice depends on age, BCG, and whether coming back in 2–3 days is realistic.`,
      hook:`IGRA preferred after BCG and for people unlikely to return; TST suggested for healthy children under 5. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`})}
  Object.values(Q).forEach(e=>e.addEventListener('change',tree));
  redraws.tests=(()=>{const prv=redraws.tests;return()=>{prv&&prv();calc();tree()}})();
  tree();
};
/* =============== 2.3 Diagnosing TB disease =============== */
/* time axis: log10 hours from 0.5 h to 120 days */
const DX_L0=Math.log10(.5),DX_L1=Math.log10(2880);
/* a pleural effusion clipped to the patient's right lung (same outline as lung() in the kit) */
function dxEffusion(x,y,s,a){const X=v=>f1(x+v*s),Y=v=>f1(y+v*s),id='dxe'+Math.round(x)+'_'+Math.round(y);
  return `<clipPath id="${id}"><path d="M${X(92)} ${Y(42)}C${X(62)} ${Y(26)} ${X(30)} ${Y(40)} ${X(18)} ${Y(92)}C${X(8)} ${Y(132)} ${X(6)} ${Y(176)} ${X(20)} ${Y(190)}C${X(44)} ${Y(199)} ${X(76)} ${Y(193)} ${X(92)} ${Y(181)}Z"/></clipPath><path clip-path="url(#${id})" d="M${X(0)} ${Y(lerp(196,146,a))}Q${X(50)} ${Y(lerp(198,160,a))} ${X(100)} ${Y(lerp(196,144,a))}V${Y(205)}H${X(0)}Z" style="fill:var(--air);opacity:.5"/>`}
const dxHours=t=>Math.pow(10,lerp(DX_L0,DX_L1,t));
const dxT=h=>(Math.log10(h)-DX_L0)/(DX_L1-DX_L0);
const dxFmt=h=>h<1?Math.round(h*60)+' min':h<36?(h<10?h.toFixed(1):Math.round(h))+' h':h<24*14?(h/24).toFixed(h<72?1:0)+' days':(h/168).toFixed(1)+' weeks';
/* lanes: ready = hours until the result; r = result per scenario: [text, positive?] or null (not done) */
const DX_SC={
 pos:{name:'adult, smear-positive',sample:'sputum',xp:['MTB detected · RIF resistance not detected',1],lam:null,sm:['acid-fast bacilli seen',1],lc:[288,['growth: M. tuberculosis',1]],sc:[600,['colonies: M. tuberculosis',1]],dst:['susceptible to first-line drugs',1]},
 neg:{name:'adult, smear-negative',sample:'sputum',xp:['MTB detected (low) · RIF resistance not detected',1],lam:null,sm:['no acid-fast bacilli seen',0],lc:[336,['growth: M. tuberculosis',1]],sc:[600,['colonies: M. tuberculosis',1]],dst:['susceptible to first-line drugs',1]},
 child:{name:'young child',sample:'gastric aspirate or stool',xp:['MTB not detected',0],lam:null,sm:['no acid-fast bacilli seen',0],lc:[336,['no growth so far',0]],sc:[600,['no growth so far',0]],dst:null},
 hiv:{name:'adult with advanced HIV',sample:'sputum, if possible, and urine',xp:['MTB detected · RIF resistance not detected',1],lam:['LAM positive',1],sm:['no acid-fast bacilli seen',0],lc:[336,['growth: M. tuberculosis',1]],sc:[600,['colonies: M. tuberculosis',1]],dst:['susceptible to first-line drugs',1]}};
const DX_STEPS=[
 {from:0,at:.03,k:'Before any test',t:'The sample',
  txt:{all:`The guideline asks for at least 3 mL of sputum, 5–10 mL being optimal; a first-morning specimen is 12% more sensitive than a spot specimen. Every specimen should go to liquid culture, ideally with solid culture too. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`,
   child:` Young children rarely produce sputum. Three morning gastric aspirates yield up to 40–50% (up to 90% in infants); nasopharyngeal aspirate or induced sputum 20–30%. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup> Stool can be tested with Xpert Ultra (68.0% sensitivity against a microbiological reference). <sup class="c" data-ref="Kay2025" title="Source 264">264</sup>`,
   hiv:` In advanced HIV, sputum may be impossible to produce and holds few bacilli. Urine LF-LAM detects a cell-wall glycolipid at the bedside, with no sputum needed. <sup class="c" data-ref="Peter2016,Bjerrum2019" title="Source 42,371">42,371</sup>`},
  pt:`To check for TB disease you are usually asked to cough up sputum, ideally first thing in the morning. It is phlegm from deep in the chest, not saliva.`,
  hook:`≥ 3 mL sputum (5–10 mL optimal); an early-morning sample is 12% more sensitive than a spot sample.`},
 {from:.08,at:.17,k:'Under 2 hours · molecular test',t:'Xpert: TB and rifampicin resistance at once',
  txt:{all:`Xpert MTB/RIF is an automated cartridge PCR that detects M. tuberculosis and rifampicin resistance in under 2 hours. A single test found 98.2% of smear-positive and 72.5% of smear-negative culture-positive TB, with 99.2% specificity; three tests raised smear-negative sensitivity to 90.2%. <sup class="c" data-ref="Boehme2010" title="Source 44">44</sup> Ultra detects fewer bacilli (15.6 vs 112.6 CFU/mL): 63% vs 46% in smear-negative TB and 90% vs 77% in people with HIV. <sup class="c" data-ref="Chakravorty2017,Dorman2018Ultra" title="Source 69,140">69,140</sup> WHO strongly recommends Ultra as the initial test for adults with symptoms. <sup class="c" data-ref="WHO-Mod3-2024" title="Source 514">514</sup>`,
   child:` In children, Ultra sensitivity was 75.3% on sputum, 69.6% on gastric aspirate, 68.0% on stool and 46.2% on nasopharyngeal aspirate. <sup class="c" data-ref="Kay2025" title="Source 264">264</sup> Here, as for most children, it is negative.`,
   hiv:` In district use, Xpert sensitivity was not significantly lower in people with HIV. <sup class="c" data-ref="Boehme2011" title="Source 45">45</sup>`},
  pt:`A rapid machine test called Xpert can find TB, and an important kind of drug resistance, in about 2 hours.`,
  hook:`Xpert MTB/RIF: ~98% sensitive in smear-positive, ~72% in smear-negative TB, in under 2 hours. <sup class="c" data-ref="Boehme2010" title="Source 44">44</sup>`},
 {from:.3,at:.46,k:'About 1 day · microscopy',t:'Smear: acid-fast rods',
  txt:{all:`A stained smear shows magenta acid-fast rods. Three smears find about 70% of culture-confirmed TB: the first 53.8%, the second about 11.1% more, the third only 2–5%. Fluorescence microscopy is about 10% more sensitive, and specificity is 90% or more. A negative smear does not exclude pulmonary TB. <sup class="c" data-ref="Lewinsohn2017,Steingart2006Fluor" title="Source 284,442">284,442</sup> Acid-fast bacilli on a smear can also be non-tuberculous mycobacteria. <sup class="c" data-ref="Chihota2010" title="Source 73">73</sup>`},
  pt:`Under the microscope, TB germs show up as tiny red rods. If they are seen, there are many germs in the sample; if not, TB is still possible.`,
  hook:`Smear: 3 specimens ≈ 70% sensitive; a negative smear never rules TB out.`},
 {from:.62,at:.74,k:'About 2 weeks · liquid culture',t:'Liquid culture grows it',
  txt:{all:`Liquid culture detects growth in an average of 10–14 days and solid culture in 3–4 weeks; liquid culture sensitivity is 88–90% versus 76% for solid. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup> In smear-negative specimens, the median time to positivity was 14 days in MGIT liquid culture versus 25 days on Löwenstein–Jensen. MGIT grew more, but 77.3% of smear-negative specimens positive only in MGIT grew non-tuberculous mycobacteria, so what grows must be identified. <sup class="c" data-ref="Chihota2010" title="Source 73">73</sup>`,
   child:` In this child nothing grows, as for most children treated for TB: only 29.9% of children classified as having pulmonary TB in 13 studies were bacteriologically confirmed. WHO treatment-decision algorithms let health workers start treatment on symptoms and X-ray. <sup class="c" data-ref="Gunasekera2023,WHO-Mod5-2022" title="Source 210,516">210,516</sup>`},
  pt:`A culture grows the germ in the lab. It is slower, 2 to 6 weeks, but it finds more TB and shows which medicines will work.`,
  hook:`Liquid culture: 10–14 days, 88–90% sensitive. Solid: 3–4 weeks, 76%.`},
 {from:.78,at:.82,k:'3–4 weeks · solid culture',t:'Colonies on a slope',
  txt:{all:`On solid medium, colonies take 3–4 weeks to appear. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup> In district use the median time to detection was 0 days for Xpert, 1 day for microscopy, 16 days for liquid and 30 days for solid culture, and Xpert cut the median time to treatment for smear-negative TB from 56 days to 5. <sup class="c" data-ref="Boehme2011" title="Source 45">45</sup> Adding solid media to MGIT raised sensitivity from 81.5% to 87.7% in one meta-analysis. <sup class="c" data-ref="Cruciani2004" title="Source 99">99</sup>`},
  pt:`On a solid jelly, TB grows into small cream-coloured colonies. It takes weeks because TB divides very slowly.`,
  hook:`Xpert cut time to treatment in smear-negative TB from a median 56 days to 5. <sup class="c" data-ref="Boehme2011" title="Source 45">45</sup>`},
 {from:.84,at:.97,k:'Weeks to months · drug susceptibility',t:'Which drugs will work?',
  txt:{all:`First-line phenotypic drug-susceptibility testing (DST) takes 1–2 weeks after growth; second-line and newer drugs on solid medium take 3–4 weeks. <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup> In district practice the median time to a resistance result was 20 days by line probe assay and 106 days by conventional DST, against hours for Xpert's rifampicin result. <sup class="c" data-ref="Boehme2011" title="Source 45">45</sup> Rifampicin resistance maps to one short stretch of the rpoB gene in over 95% of resistant isolates, which is why a single PCR target can stand in for rifampicin DST. <sup class="c" data-ref="Seifert2015" title="Source 419">419</sup> More in <a href="#resistance" data-go="resistance">Drug resistance</a>.`,
   child:` Without growth, no isolate is available for DST; treatment follows the guidance for children. <sup class="c" data-ref="WHO-Mod5-2022" title="Source 516">516</sup>`},
  pt:`Lab tests on the grown germ show which medicines it can resist. A rapid test already gives the most important answer, rifampicin, on the first day.`,
  hook:`Rifampicin result: < 2 hours by Xpert vs a median 106 days by conventional DST in routine practice. <sup class="c" data-ref="Boehme2010,Boehme2011" title="Source 44,45">44,45</sup>`}];

inits.diagnose=()=>{
  const svg=$('#dxSvg'),rg=$('#dxT');let sc='pos',setSt=()=>{};
  function cart(x,y,p,col){return `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-11" y="-16" width="22" height="32" rx="4" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.4"/><rect x="-8" y="-20" width="16" height="6" rx="2" style="fill:var(--accent)"/><rect x="-7" y="${f1(12-22*p)}" width="14" height="${f1(22*p)}" rx="2" style="fill:${col};opacity:.55"/><circle cx="0" cy="-6" r="3" style="fill:var(--panel-2);stroke:var(--accent)"/></g>`}
  function strip(x,y,pos,p){return `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-22" y="-5" width="44" height="10" rx="3" style="fill:var(--panel);stroke:var(--accent)"/><line x1="4" x2="4" y1="-4" y2="4" style="stroke:var(--tb);stroke-width:2;opacity:${f1(p)}"/><line x1="12" x2="12" y1="-4" y2="4" style="stroke:var(--tb);stroke-width:2;opacity:${f1(pos?p:0)}"/></g>`}
  function slide(x,y,pos,p){let g=`<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-20" y="-7" width="40" height="14" rx="1.5" style="fill:var(--panel);stroke:var(--muted)"/><ellipse cx="2" cy="0" rx="11" ry="4" style="fill:var(--air);opacity:${f1(.25+.4*p)}"/>`;
    if(p>=1){g+=`<line x1="20" y1="0" x2="24" y2="1" style="stroke:var(--accent)"/><circle cx="40" cy="2" r="16" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.2"/>`;if(pos)g+=clump(40,2,6,9,{len:6,seed:9})}
    return g+'</g>'}
  function tube(x,y,kind,grow,p){let g=`<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-7" y="-17" width="14" height="34" rx="6" style="fill:var(--panel);stroke:var(--muted)"/><rect x="-8" y="-21" width="16" height="6" rx="2" style="fill:var(--muted)"/>`;
    if(kind==='liq')g+=`<rect x="-5.5" y="-5" width="11" height="20" rx="4" style="fill:var(--air);opacity:.3"/>`+(grow?`<rect x="-5.5" y="7" width="11" height="8" rx="4" style="fill:var(--tb);opacity:${f1(.8*grow)}"/><circle cx="0" cy="8" r="${f1(12*grow)}" style="fill:var(--tb);opacity:${f1(.15*grow)}"/>`:'');
    else{g+=`<path d="M-5.5 15V-2L5.5 -12V15Z" style="fill:var(--dE);opacity:.45"/>`;if(grow){const q=rng(5);for(let i=0;i<7;i++)g+=`<circle cx="${f1(-3+q()*7)}" cy="${f1(-4+q()*16)}" r="${f1(1.6*grow)}" style="fill:var(--caseum);stroke:var(--mac-line);stroke-width:.5"/>`}}
    return g+'</g>'}
  function dstG(x,y,done,sus){let g=`<g transform="translate(${f1(x)} ${f1(y)})">`;['--dH','--dR','--dZ','--dE'].forEach((c,i)=>{g+=`<rect x="${-22+i*11}" y="-9" width="9" height="18" rx="3" style="fill:var(${c});opacity:${done?.85:.3}"/>`;});return g+'</g>'}
  function flag(x,y,txt,pos,right,N){const w=txt.length*6.05+14,col=pos?'var(--tb)':'var(--muted)',bx=right?x-w+6:x-6,top=y-34;
    return `<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y-14)}" y2="${f1(top+14)}" style="stroke:${col};stroke-width:1.4"/><rect x="${f1(bx)}" y="${f1(top)}" width="${f1(w)}" height="16" rx="4" style="fill:${pos?'var(--tb-soft)':'var(--panel-2)'};stroke:${col}"/><text x="${f1(bx+7)}" y="${f1(top+11.5)}" class="t-xs" style="fill:${pos?'var(--tb)':'var(--ink)'};font-weight:700">${txt}</text>`}
  function draw(t){
    const N=vb(svg,'720 430','400 660'),S=DX_SC[sc],now=dxHours(t);
    const L=N?{x0:26,x1:384,ly:110,lh:86,ax:640,lab:'top'}:{x0:170,x1:704,ly:92,lh:54,ax:410,lab:'left'};
    const X=h=>lerp(L.x0,L.x1,dxT(clamp(h,.5,2880))),xn=X(now);
    let s='';
    /* header: the sample */
    s+=sputum(N?24:30,N?34:36,.9,{fill:.6*(1-ramp(t,.02,.08))+.15});
    s+=`<text x="${N?48:52}" y="${N?30:30}" class="t-lbl" style="font-size:12.5px">Sample: ${S.sample}</text><text x="${N?48:52}" y="${N?45:45}" class="t-xs">${S.name}${N?'':' · split between the tests'}</text>`;
    if(sc==='child'&&now>=24)s+=`<g><rect x="${N?200:376}" y="${N?52:22}" width="${N?186:330}" height="${N?36:26}" rx="6" style="fill:var(--rx-soft);stroke:var(--rx)"/><text x="${N?208:386}" y="${N?67:39}" class="t-xs" style="fill:var(--rx);font-weight:700">${N?'Treatment decision: symptoms ± X-ray':'Treatment decision algorithm: symptoms ± X-ray → treat'}</text>${N?`<text x="208" y="81" class="t-xs" style="fill:var(--rx);font-weight:700">→ treat without confirmation</text>`:''}</g>`;
    /* time axis */
    const ticks=[[1,'1 h'],[2,'2 h'],[24,'1 day'],[168,'1 wk'],[336,'2 wk'],[672,'4 wk'],[1344,'8 wk'],[2688,'16 wk']];
    const top=L.ly-30,bot=L.ly+5*L.lh+24;
    ticks.forEach(([h,l],i)=>{if(N&&(h===2||h===1344))return;s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${top}" y2="${L.ax}" class="grid"/><text x="${f1(X(h))}" y="${L.ax+14}" class="t-xs t-mid">${l}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis"/><text x="${L.x1}" y="${L.ax+28}" class="t-xs t-end">time since the sample (log scale)</text>`;
    s+=`<rect x="${L.x0}" y="${top}" width="${f1(Math.max(0,xn-L.x0))}" height="${L.ax-top}" style="fill:var(--accent);opacity:.05"/><line x1="${f1(xn)}" x2="${f1(xn)}" y1="${top}" y2="${L.ax}" style="stroke:var(--accent);stroke-width:1.4;opacity:.6"/>`;
    /* lanes */
    const lanes=[
      {n:'Xpert MTB/RIF · Ultra',tm:'< 2 h',ready:1.8,r:S.xp,g:(x,y,p,d)=>cart(x,y,p,d&&S.xp[1]?'var(--tb)':'var(--accent)')},
      {n:'Urine LF-LAM',tm:'bedside',ready:.6,r:S.lam,g:(x,y,p,d)=>strip(x,y,S.lam&&S.lam[1],p)},
      {n:'Smear microscopy',tm:'about 1 day',ready:24,r:S.sm,g:(x,y,p,d)=>slide(x,y,S.sm[1],d?1:0)},
      {n:'Liquid culture (MGIT)',tm:sc==='pos'?'10–14 days':'median 14 days',ready:S.lc[0],r:S.lc[1],g:(x,y,p,d)=>tube(x,y,'liq',d&&S.lc[1][1]?1:0,p)},
      {n:'Solid culture (LJ)',tm:sc==='pos'?'3–4 weeks':'median 25 days',ready:S.sc[0],r:S.sc[1],g:(x,y,p,d)=>tube(x,y,'sol',d&&S.sc[1][1]?ramp(now,S.sc[0],S.sc[0]*1.3)*.5+.5:0,p)},
      {n:'Phenotypic DST',tm:'1–2 wk after growth',ready:S.lc[0]+336,start:S.lc[0],r:S.dst,g:(x,y,p,d)=>dstG(x,y,d,1)}];
    lanes.forEach((ln,i)=>{const y=L.ly+i*L.lh,off=!ln.r,st=ln.start||.5,x0=X(st),xr=X(ln.ready),p=clamp((Math.log10(now)-Math.log10(st))/(Math.log10(ln.ready)-Math.log10(st))),done=now>=ln.ready&&!off,started=now>=st;
      if(L.lab==='left'){s+=`<text x="12" y="${y-2}" class="t-lbl" style="font-size:12.5px;${off?'opacity:.45':''}">${ln.n}</text><text x="12" y="${y+12}" class="t-xs">${ln.tm}</text>`}
      else s+=`<text x="${L.x0}" y="${y-44}" class="t-lbl" style="font-size:12px;${off?'opacity:.45':''}">${ln.n} <tspan class="t-xs" style="font-weight:400">· ${ln.tm}</tspan></text>`;
      s+=`<line x1="${f1(x0)}" x2="${L.x1}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"/>`;
      if(off){s+=`<text x="${f1(X(4))}" y="${y-6}" class="t-xs">${i===1?'used in people with HIV':'no isolate to test'}</text>`;return}
      s+=`<line x1="${f1(xr)}" x2="${f1(xr)}" y1="${y-8}" y2="${y+8}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:2 2"/>`;
      if(started)s+=`<line x1="${f1(x0)}" x2="${f1(lerp(x0,xr,p))}" y1="${y}" y2="${y}" style="stroke:var(--accent);stroke-width:3;stroke-linecap:round;opacity:.7"/>`;
      if(i===5&&started){[[480,'LPA 20 d'],[2544,N?'106 d':'routine DST 106 d']].forEach(([h,l],k)=>{s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${y-6}" y2="${y+12}" style="stroke:var(--warn);stroke-width:1.6"/><text x="${f1(X(h)+(k?2:-3))}" y="${y+22}" class="t-xs t-end" style="fill:var(--warn)">${l}</text>`})}
      if(!started){s+=`<text x="${f1(x0-4)}" y="${y-6}" class="t-xs t-end">starts when culture grows</text>`;return}
      const gx=lerp(x0,xr,p);s+=ln.g(gx,y,p,done);
      if(done){const right=gx>(N?250:560);s+=flag(gx,y,ln.r[0],ln.r[1],right,N)}});
    svg.innerHTML=s;
    const ph=phaseOf(DX_STEPS,t);setSt(ph);
    const ready=lanes.filter(l=>l.r&&now>=l.ready).map(l=>l.n.split(' ')[0]+(l.r[1]?' +':' −'));
    $('#dxRead').innerHTML=`<span>time since sample <b>${dxFmt(now)}</b></span><span>results in <b>${ready.length?ready.join(' · '):'none yet'}</b></span>`;
    const P=DX_STEPS[ph];
    $('#dxNote').innerHTML=noteHTML({k:P.k,t:P.t,txt:P.txt.all+(P.txt[sc]||''),pt:P.pt,hook:P.hook});
  }
  const stop=playWire(rg,$('#dxPlay'),draw,22000,'Replay','diagnose');
  setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  $$('[data-dxs]').forEach(b=>b.addEventListener('click',()=>{sc=b.dataset.dxs;$$('[data-dxs]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- icon array: 100 people ---- */
  const TT={
   smear1:{n:'One sputum smear',se:53.8,sp:90,spL:'90% or more',c:`<sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`,x:`The first specimen finds 53.8% of culture-confirmed TB. Specificity is 90% or more; here 90 is drawn.`},
   smear3:{n:'Three sputum smears',se:70,sp:90,spL:'90% or more',c:`<sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>`,x:`Three specimens find about 70%; the third adds only 2–5%. Fluorescence microscopy adds about 10%. <sup class="c" data-ref="Steingart2006Fluor" title="Source 442">442</sup>`},
   xpert:{n:'Xpert MTB/RIF',se:84.7,sp:98.4,c:`<sup class="c" data-ref="Zifodya2021" title="Source 538">538</sup>`,x:`Per 1,000 people with symptoms at 10% prevalence, Xpert MTB/RIF would miss 15 cases and wrongly diagnose 14.`},
   ultra:{n:'Xpert Ultra',se:90.9,sp:95.6,c:`<sup class="c" data-ref="Zifodya2021" title="Source 538">538</sup>`,x:`Ultra trades a little specificity for sensitivity: per 1,000 people with symptoms at 10% prevalence it would miss 9 and wrongly diagnose 40. In people with previous TB its specificity was 88.2%.`},
   culture:{n:'Liquid culture',se:88,sp:99.6,seL:'88–90%',c:`<sup class="c" data-ref="Lewinsohn2017,Cruciani2004" title="Source 99,284">99,284</sup>`,x:`Culture is the usual reference standard. The guideline gives liquid culture 88–90% sensitivity (88 drawn); MGIT 960 was 99.6% specific for mycobacteria, but growth must be identified, because some is non-tuberculous. <sup class="c" data-ref="Chihota2010" title="Source 73">73</sup>`},
   lam:{n:'Urine LF-LAM',se:42,sp:91,c:`<sup class="c" data-ref="Bjerrum2019" title="Source 42">42</sup>`,x:`In adults with HIV and TB symptoms. Sensitivity was 52% in inpatients and 29% in outpatients, and rose as CD4 fell; it is an add-on to other tests, not a stand-alone. <sup class="c" data-ref="WHO-Mod3-2024" title="Source 514">514</sup>`}};
  const ic=$('#dxIco');let tk='xpert',grp='tb',stopI=null;
  function drawI(p){const N=vb(ic,'720 236','400 486'),k=TT[tk],v=grp==='tb'?k.se:100-k.sp,n=Math.round(v),shown=Math.round(n*p);
    const cols=N?10:20,dx=N?37:34,dy=N?44:40,s0=N?30:28,x0=N?20:20,y0=N?36:30;let s='';
    s+=`<text x="${x0}" y="${y0-12}" class="t-sm" style="fill:var(--ink)">${grp==='tb'?`${k.n}: finds ${shown} of 100 people with TB`:`${k.n}: wrongly flags ${shown} of 100 without TB`}</text>`;
    for(let i=0;i<100;i++){const x=x0+(i%cols)*dx+dx/2-8,y=y0+Math.floor(i/cols)*dy,hit=i<shown;
      const col=grp==='tb'?(hit?'var(--tb)':'var(--line)'):(hit?'var(--warn)':'var(--line)');
      s+=person(x+8,y,s0,col,{op:hit?1:.9});
      if(grp==='tb'&&!hit)s+=`<circle cx="${f1(x+8)}" cy="${f1(y+s0*.17)}" r="${f1(s0*.17+2)}" style="fill:none;stroke:var(--tb);stroke-width:1;opacity:.5"/>`}
    ic.innerHTML=s;
    $('#dxIcoCap').innerHTML=grp==='tb'?`Magenta: people with TB the test finds. Grey (ringed): people with TB it misses. Sensitivity ${k.seL||k.se+'%'}. ${k.c}`:`Amber: people without TB the test wrongly calls positive. Specificity ${k.spL||k.sp+'%'}. ${k.c}`;
    $('#dxIcoNote').innerHTML=noteHTML({k:grp==='tb'?'Sensitivity':'Specificity',t:k.n,txt:`Sensitivity ${k.seL||k.se+'%'}, specificity ${k.spL||k.sp+'%'}. ${k.c} ${k.x}`,
      pt:grp==='tb'?`Every grey figure is a person with TB whose test came back negative. That is why a negative test does not always mean no TB.`:`Every amber figure is a person without TB whose test came back positive. Doctors weigh a result with the whole picture.`,
      hook:`Ultra vs Xpert MTB/RIF: sensitivity 90.9% vs 84.7%, specificity 95.6% vs 98.4% (Cochrane). <sup class="c" data-ref="Zifodya2021" title="Source 538">538</sup>`})}
  let tI=0;function runI(){if(stopI)stopI();clearTimeout(tI);drawI(0);stopI=animate(700,p=>drawI(ease(p)));tI=setTimeout(()=>{if(stopI)stopI();drawI(1)},760)}
  $$('[data-dxt]').forEach(b=>b.addEventListener('click',()=>{tk=b.dataset.dxt;$$('[data-dxt]').forEach(x=>x.setAttribute('aria-pressed',x===b));runI()}));
  $$('[data-dxv]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.dxv;$$('[data-dxv]').forEach(x=>x.setAttribute('aria-pressed',x===b));runI()}));
  drawI(1);

  /* ---- chest X-ray patterns ---- */
  const CX={
   cavity:{t:'Upper-lobe cavity',les:[{side:'R',u:.45,v:.12,r:13,kind:'cavity'},{side:'R',u:.58,v:.22,r:20,kind:'infiltrate'},{side:'L',u:.42,v:.14,r:7,kind:'nodule'}],lab:[['R',.45,.12,'cavity'],['R',.6,.25,'consolidation']],
    txt:`Post-primary TB, which develops long after infection, shows cavities, consolidation and small centrilobular nodules. <sup class="c" data-ref="Nachiappan2017" title="Source 337">337</sup> Cavities characteristically form at the apex. <sup class="c" data-ref="Balasubramanian1994" title="Source 24">24</sup> Cavitation is associated with poor outcomes, relapse, more transmission and drug resistance, and imaging findings such as cavitation feed into decisions like treatment length. <sup class="c" data-ref="Urbanowski2020,Nachiappan2017" title="Source 337,479">337,479</sup> Diabetes goes with more cavitation; HIV with less. <sup class="c" data-ref="Pai2016" title="Source 367">367</sup>`,
    pt:`A cavity is a hole where lung tissue has broken down. It holds huge numbers of germs, so people with cavities are usually more infectious.`,hook:`Upper-lobe cavity = classic post-primary (reactivation) TB in adults.`},
   miliary:{t:'Miliary pattern',les:[{kind:'miliary',side:'R',u:0,v:0}],lab:[['L',.7,.55,'tiny nodules, both lungs']],
    txt:`Miliary TB is haematogenously disseminated disease with tiny nodules throughout both lungs and involvement of many organs, more common in immunocompromised people. <sup class="c" data-ref="Nachiappan2017" title="Source 337">337</sup> Clinical features are non-specific and the typical X-ray findings may appear only late, so a normal early film does not exclude it. <sup class="c" data-ref="Sharma2005" title="Source 424">424</sup>`,
    pt:`Tiny spots scattered evenly through both lungs show that TB has spread through the blood.`,hook:`Miliary: uniform tiny nodules in both lungs; can be absent on the first film.`},
   effusion:{t:'Pleural effusion',eff:1,les:[{side:'R',u:.4,v:.5,r:10,kind:'infiltrate'}],lab:[['R',.55,.93,'fluid at the base']],
    txt:`Pleural effusion is part of primary TB, which follows soon after infection and is commonest in children and immunocompromised people. <sup class="c" data-ref="Nachiappan2017" title="Source 337">337</sup> The pleura was the second commonest extrapulmonary site in US data (19.8%). <sup class="c" data-ref="Peto2009" title="Source 372">372</sup> Pleural fluid ADA had a pooled sensitivity of 0.92 and specificity of 0.90; Xpert MTB/RIF on pleural fluid only 49.5% (Ultra 75.0%). <sup class="c" data-ref="Liang2008,Kohli2021" title="Source 275,286">275,286</sup>`,
    pt:`Fluid collects between the lung and the chest wall. It shows as a white area at the bottom of the lung.`,hook:`TB pleural effusion: test the fluid for ADA; Xpert on pleural fluid is insensitive.`},
   nodes:{t:'Hilar lymph nodes',les:[{side:'R',u:.03,v:.3,r:10,kind:'node'},{side:'R',u:.1,v:.42,r:7,kind:'node'},{side:'R',u:.5,v:.6,r:17,kind:'infiltrate'}],lab:[['R',.05,.33,'enlarged hilar nodes'],['R',.55,.62,'consolidation']],
    txt:`Primary TB shows as lymphadenopathy, pulmonary consolidation and pleural effusion, and is commonest in children and immunocompromised people. <sup class="c" data-ref="Nachiappan2017" title="Source 337">337</sup> In children, WHO treatment-decision algorithms score symptoms with or without an X-ray (sensitivity 0.86, specificity 0.37 with X-ray). <sup class="c" data-ref="Gunasekera2023" title="Source 210">210</sup>`,
    pt:`In children, TB often shows as swollen glands in the middle of the chest, where the airways enter the lungs.`,hook:`Hilar nodes + consolidation = primary TB, typical in children.`},
   scar:{t:'Old, healed TB',les:[{side:'R',u:.4,v:.07,r:5,kind:'nodule'},{side:'R',u:.58,v:.12,r:4,kind:'nodule'},{side:'L',u:.48,v:.09,r:4,kind:'nodule'}],lab:[['R',.5,.09,'fibronodular scars']],scar:1,
    txt:`Inactive sequelae of previous TB show as fibronodular opacities in the apical and upper zones; radiographic stability over 6 months distinguishes inactive from active disease. <sup class="c" data-ref="Nachiappan2017" title="Source 337">337</sup> Old scars confuse screening: X-ray software performs worse in people with previous TB, and Xpert Ultra specificity falls to 88.2%. <sup class="c" data-ref="Qin2021,Zifodya2021" title="Source 382,538">382,538</sup>`,
    pt:`Healed TB can leave scars that stay on X-rays for life. Comparing with an older film helps show whether anything has changed.`,hook:`Stable for 6 months = inactive. Prior TB lowers CAD and Ultra specificity.`}};
  const cx=$('#dxCxr');let cur='cavity',stopC=null,tC=0;
  function drawC(p){const N=vb(cx,'520 330','400 330'),C=CX[cur],sc=N?1.3:1.38,lx=N?200-100*sc:260-100*sc,ly=22;
    let s=`<rect x="${N?6:40}" y="6" width="${N?388:440}" height="318" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const les=C.les.map(l=>Object.assign({},l,{r:(l.r||8)*Math.max(.05,p)}));
    const lg=lung(lx,ly,sc,{lesions:p>.05?les:[]});s+=lg.svg;if(C.eff)s+=dxEffusion(lx,ly,sc,p);
    if(C.scar&&p>.3)[[.35,.05,.6,.15],[.5,.04,.7,.2]].forEach(a=>{const [x1,y1]=lg.at('R',a[0],a[1]),[x2,y2]=lg.at('R',a[2],a[3]);s+=`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="stroke:var(--fibro);stroke-width:2;opacity:${f1(p)}"/>`});
    s+=`<text x="${N?16:52}" y="26" class="t-sm" style="fill:var(--ink)">R</text><text x="${N?384:468}" y="26" class="t-sm t-end" style="fill:var(--ink)">L</text>`;
    let lastY=-99;if(p>.6)C.lab.forEach(([sd,u,v,l],i)=>{const [px,py]=lg.at(sd,u,v),R=sd==='L',tx=R?(N?388:472):(N?12:46),ty=Math.max(py+3,lastY+16);lastY=ty;const ex=R?tx-l.length*5.7-3:tx+l.length*5.7+3,op=f1(ramp(p,.6,1));
      s+=`<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(ex)}" y2="${f1(ty-3)}" style="stroke:var(--tb);stroke-width:1;opacity:${op}"/><rect x="${f1(R?ex:tx-2)}" y="${f1(ty-10)}" width="${f1(l.length*5.7+5)}" height="13" rx="3" style="fill:var(--panel-2);opacity:${op}"/><text x="${tx}" y="${f1(ty)}" class="t-xs${R?' t-end':''}" style="fill:var(--tb);opacity:${op}">${l}</text>`});
    s+=`<text x="${N?386:470}" y="316" class="t-xs t-end">schematic</text>`;
    cx.innerHTML=s;
    $('#dxCxrNote').innerHTML=noteHTML({k:'Chest X-ray',t:C.t,txt:C.txt,pt:C.pt,hook:C.hook})}
  $$('[data-cx]').forEach(b=>b.addEventListener('click',()=>{cur=b.dataset.cx;$$('[data-cx]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(stopC)stopC();clearTimeout(tC);drawC(0);stopC=animate(900,p=>drawC(ease(p)));tC=setTimeout(()=>{if(stopC)stopC();drawC(1)},960)}));
  drawC(1);
  redraws.diagnose=(()=>{const prv=redraws.diagnose;return()=>{prv&&prv();drawI(1);drawC(1)}})();
};
/* =============== 2.4 Drug resistance =============== */
/* a resistant mutant rod: ty 'h' isoniazid-resistant (--dH), 'r' rifampicin-resistant (--dR), 'm' both (MDR) */
function rsRod(x,y,len,ang,ty,op=1){
  if(ty==='s')return `<g style="opacity:${f1(op)}">${bacillus(x,y,len,ang)}</g>`;
  const col=ty==='h'?'var(--dH)':ty==='r'?'var(--dR)':'var(--dR)',ring=ty==='m'?'var(--dH)':col,L=len*1.12,w=L*.34;
  return `<g style="opacity:${f1(op)}"><rect x="${f1(x-L/2)}" y="${f1(y-w/2)}" width="${f1(L)}" height="${f1(w)}" rx="${f1(w/2)}" transform="rotate(${f1(ang)} ${f1(x)} ${f1(y)})" style="fill:${col};stroke:var(--ink);stroke-width:.7"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(L*.66)}" style="fill:none;stroke:${ring};stroke-width:1.3;stroke-dasharray:2.5 2"/></g>`}
const RS_DRUG={H:['var(--dH)','isoniazid'],R:['var(--dR)','rifampicin'],Z:['var(--dZ)','pyrazinamide'],E:['var(--dE)','ethambutol']};
const RS_ON=.17,RS_STOP=.31;
/* scaled-down population: 96 rods, 3 isoniazid-resistant and 1 rifampicin-resistant mutant at fixed spots */
const RS_O=(()=>{const r=rng(2404),P=[ [-.52,-.34],[.38,.46],[.62,-.18],[-.08,.12]];
  let guard=0;while(P.length<96&&guard++<20000){const a=r()*Math.PI*2,d=Math.sqrt(r())*.9,u=Math.cos(a)*d,v=Math.sin(a)*d;
    if(P.every(p=>Math.hypot(p[0]-u,(p[1]-v)*1.25)>.115))P.push([u,v])}
  return P.map((p,i)=>({u:p[0],v:p[1],a:r()*180,i}))})();
const RS_G=(()=>{const r=rng(818),P=[];let guard=0;while(P.length<100&&guard++<20000){const a=r()*Math.PI*2,d=Math.sqrt(r())*.9,u=Math.cos(a)*d,v=Math.sin(a)*d;
    if(RS_O.every(p=>Math.hypot(p.u-u,(p.v-v)*1.25)>.05)&&P.every(p=>Math.hypot(p[0]-u,(p[1]-v)*1.25)>.075))P.push([u,v])}
  /* regrowth spreads outward from the middle */
  return P.map(p=>({u:p[0],v:p[1],a:r()*180})).sort((A,B)=>Math.hypot(A.u,A.v)-Math.hypot(B.u,B.v))})();
function rsModel(sc){const r=rng(sc==='single'?5:sc==='combo'?6:7);
  const O=RS_O.map((p,i)=>{const ty=i<3?'h':i===3?'r':'s',dorm=ty==='s'&&i%17===5;let d=Infinity;
    const tk=ty==='s'?.19+r()*.15:.27+r()*.12;
    if(sc==='single'){if(ty!=='h')d=tk}
    else if(sc==='combo'){d=dorm?.44+r()*.14:tk}
    else{if(!dorm&&tk<RS_STOP)d=tk}
    return Object.assign({},p,{ty,d,dorm})});
  const surv=O.filter(o=>o.d===Infinity);
  const G=RS_G.map((p,j)=>{let ty=null,b=Infinity;
    if(sc==='single'){ty='h';b=.4+j/RS_G.length*.2}
    else if(sc==='interrupt'&&surv.length){ty=surv[j%surv.length].ty;b=.42+j/RS_G.length*.2}
    return Object.assign({},p,{ty,b})});
  return {O,G,regs:sc==='single'?['H']:['H','R','Z','E']}}
function rsCount(M,t){const c={s:0,h:0,r:0};M.O.forEach(o=>{if(o.d>t)c[o.ty]++});M.G.forEach(g=>{if(g.b<=t)c[g.ty]++});return c}

const RS_S0={from:0,at:.08,k:'Before any drug',t:'A few mutants, already there',
  txt:`In fluctuation tests, <i>M. tuberculosis</i> mutated to drug resistance spontaneously and at random, before any drug was given. Average rates per bacterium per generation were 2.56 × 10⁻⁸ for isoniazid, 2.95 × 10⁻⁸ for streptomycin, 10⁻⁷ for ethambutol and 2.25 × 10⁻¹⁰ for rifampicin <sup class="c" data-ref="David1970" title="Source 110">110</sup>. That is about 1 in 39 million divisions for isoniazid and 1 in 4.4 billion for rifampicin (calculated here). The drawing is scaled down: 96 rods with 3 isoniazid-resistant and 1 rifampicin-resistant mutant, far more than the real ratio, so you can see them. In people operated on for TB, numerous bacilli were found at the surface of cavities, and additional drug resistance was preferentially acquired there <sup class="c" data-ref="Kaplan2003" title="Source 260">260</sup>.`,
  pt:`Among billions of TB germs, a tiny number are born able to survive one medicine. Nobody caused this: it happens by chance.`,
  hook:`Rifampicin has the lowest spontaneous mutation rate of the first-line drugs: about 2.25 × 10⁻¹⁰ per bacterium per generation <sup class="c" data-ref="David1970" title="Source 110">110</sup>.`};
const RS_S4={from:.8,at:.93,k:'Person to person',t:'Resistance can be passed on',
  txt:`<span class="ev est">Established</span> A resistant strain spreads like any other: drug-resistant TB can be as transmissible as drug-susceptible TB <sup class="c" data-ref="Dheda2024" title="Source 121">121</sup>. A transmission model fitted to national data put the share of incident MDR-TB caused by transmission, not by treatment, at a median 95.9% (95% uncertainty range 68.0–99.6), and 61.3% even among previously treated people <sup class="c" data-ref="Kendall2015" title="Source 268">268</sup>. In KwaZulu-Natal, 69% of 404 people with XDR-TB had never been treated for MDR-TB, and 84% of genotyped isolates fell into clusters <sup class="c" data-ref="Shah2017NEJM" title="Source 422">422</sup>. In Tugela Ferry (2005–2006), 52 of 53 people with XDR-TB died, 55% had never been treated for TB, and 67% had recently been in hospital <sup class="c" data-ref="Gandhi2006" title="Source 192">192</sup>.`,
  pt:`Most people with drug-resistant TB caught it from someone else. Having it does not mean anyone did something wrong.`,
  hook:`Most MDR-TB is transmitted, not acquired: a median 95.9% in a global model. Finding and treating MDR-TB matters more than better first-line treatment alone <sup class="c" data-ref="Kendall2015" title="Source 268">268</sup>.`};
const RS_STEPS={
 single:[RS_S0,
  {from:.15,at:.27,k:'Isoniazid alone',t:'One drug kills almost everything',
   txt:`Isoniazid alone kills the susceptible rods quickly, and the person may feel better. The 3 isoniazid-resistant mutants are untouched. The rifampicin-resistant mutant is still killed, because isoniazid works on it. Giving one drug, or one effective drug in a failing regimen, is the classic way resistance is selected: the drug does not create the mutants, it removes their competition <sup class="c" data-ref="David1970,Dheda2024" title="Source 110,121">110,121</sup>.`,
   pt:`The medicine clears most germs, but the few it cannot kill are left behind.`,
   hook:`A single drug selects mutants that were already there. It does not cause the mutation.`},
  {from:.36,at:.5,k:'Weeks later',t:'The resistant clone takes over',
   txt:`With isoniazid still the only drug, the survivors multiply and refill the cavity. Now every rod is isoniazid-resistant: this is <b>acquired</b> resistance. WHO lists three causes of acquired resistance: incorrect prescribing, poor-quality drugs and people stopping treatment early <sup class="c" data-ref="WHO-GTR2025,Kendall2015" title="Source 268,510">268,510</sup>.`,
   pt:`The germs that grow back are all the kind the medicine cannot touch.`,
   hook:`Acquired resistance = selected during treatment. Transmitted (primary) resistance = caught already resistant.`},
  {from:.6,at:.7,k:'A new label',t:'Isoniazid-resistant TB (Hr-TB)',
   txt:`Isoniazid-resistant, rifampicin-susceptible TB is Hr-TB. WHO recommends rifampicin, ethambutol, pyrazinamide and levofloxacin for 6 months for it <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>. If the same selection happened again with rifampicin, the strain would resist both drugs: by WHO definition, MDR-TB <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>. Resistance to each drug arises independently, so a strain collects resistances one at a time <sup class="c" data-ref="David1970" title="Source 110">110</sup>.`,
   pt:`Hr-TB is still curable with a different mix of medicines.`,
   hook:`Hr-TB regimen (WHO): 6 months of rifampicin, ethambutol, pyrazinamide and levofloxacin <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`},
  RS_S4],
 combo:[RS_S0,
  {from:.15,at:.29,k:'Four drugs together',t:'Every mutant meets a drug that works',
   txt:`<span class="ev est">Established</span> With isoniazid, rifampicin, pyrazinamide and ethambutol together, an isoniazid-resistant mutant is killed by rifampicin and a rifampicin-resistant one by isoniazid. Because resistance to each drug arises independently, the chance of one bacillus resisting two drugs at once is roughly the product of the single-drug rates <sup class="c" data-ref="David1970,Dheda2024" title="Source 110,121">110,121</sup>: for isoniazid and rifampicin about 5.8 × 10⁻¹⁸, or 1 in 170 million billion (calculated here). That is the logic of combination therapy.`,
   pt:`Each medicine covers the gaps of the others, so no germ survives all of them.`,
   hook:`Combination therapy works because double-resistant mutants are a product of two tiny probabilities.`},
  {from:.36,at:.5,k:'The slow last phase',t:'Mopping up the survivors',
   txt:`A few slow, dormant rods (drawn pale) outlast the first wave. In 100 people given 22 regimens, the fast killing of the first 2 days came mainly from isoniazid and rifampicin, while sterilising activity on days 2 to 14 came from rifampicin and streptomycin, not from isoniazid or pyrazinamide <sup class="c" data-ref="Jindani2003" title="Source 253">253</sup>. This is why treatment continues long after symptoms fade.`,
   pt:`Feeling better comes early. The last germs take months to clear, so the full course matters.`,
   hook:`Early bactericidal activity: isoniazid. Sterilising activity: rifampicin <sup class="c" data-ref="Jindani2003" title="Source 253">253</sup>.`},
  {from:.6,at:.7,k:'End of treatment',t:'Cleared, with no resistance selected',
   txt:`The cavity is empty and no mutant had the chance to take over. Treatment success for drug-susceptible TB was 88% in the 2023 cohort worldwide, a population figure that includes people lost to follow-up and deaths <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>. For the regimens themselves, see <a href="#regimen" data-go="regimen">Treating TB disease</a>.`,
   pt:`Taking all the medicines together, for the whole course, is what keeps resistance from appearing.`,
   hook:`Drug-susceptible TB treatment success: 88% (2023 cohort) <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`},
  RS_S4],
 interrupt:[RS_S0,
  {from:.15,at:.27,k:'Treatment starts, then stops',t:'Stopping early leaves survivors',
   txt:`The four drugs start well, but treatment stops at the dashed line. Most susceptible rods are already gone, yet the mutants (which die later in the drawing because a single drug covers each) and the dormant rods are still there. WHO lists people stopping treatment early as one of the three causes of acquired resistance, with incorrect prescribing and poor-quality drugs <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`,
   pt:`Stopping when you feel better leaves germs behind. Clinics offer support to help people finish: see <a href="#living" data-go="living">Living with TB</a>.`,
   hook:`Causes of acquired resistance (WHO): incorrect prescribing, poor-quality drugs, stopping treatment early <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`},
  {from:.36,at:.5,k:'Weeks after stopping',t:'The population rebounds',
   txt:`With no drug pressure, the survivors multiply and TB disease returns. In this drawing the mutants are a larger share of what grows back than they were at the start, because the susceptible rods were cleared first. Recurrence after treatment is more common in high-incidence settings (4.10 per 100 person-years, against 1.47 in low-incidence settings, after successful treatment) <sup class="c" data-ref="Vega2021" title="Source 491">491</sup>.`,
   pt:`The illness can come back, sometimes harder to treat than before.`,
   hook:`Interrupted treatment risks relapse and selects mutants among the survivors.`},
  {from:.6,at:.7,k:'Restarting',t:'Testing before treating again',
   txt:`When TB returns, drug-susceptibility testing comes first. Among previously treated people, 16% had MDR/RR-TB in 2024, against 3.2% of people never treated before <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>. In 2024, 83% of people with bacteriologically confirmed TB were tested for rifampicin resistance <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`,
   pt:`Before starting medicines again, the clinic checks which ones still work.`,
   hook:`Previous TB treatment is a red flag for resistance: MDR/RR-TB in 16% of previously treated vs 3.2% of new patients (2024) <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`},
  RS_S4]};

inits.resistance=()=>{
  const svg=$('#rsSvg'),rg=$('#rsT');let sc='single',M=rsModel(sc),setSt=()=>{};
  const TT={single:['A few mutants, already there','Isoniazid alone','The resistant clone regrows','Now isoniazid-resistant TB','Passed on to a contact'],
    combo:['A few mutants, already there','Four drugs together','Mopping up the survivors','Cleared: no resistance selected','Passed on to a contact'],
    interrupt:['A few mutants, already there','Treatment starts, then stops','The population rebounds','Test before treating again','Passed on to a contact']};
  const SUB={single:['96 rods drawn; 4 are resistant mutants','susceptible rods die; mutants survive','acquired resistance','Hr-TB: isoniazid no longer works','transmitted resistance'],
    combo:['96 rods drawn; 4 are resistant mutants','each mutant is killed by another drug','dormant rods clear slowly','the cavity heals','someone else\'s strain can still spread'],
    interrupt:['96 rods drawn; 4 are resistant mutants','the drugs stop too soon','survivors refill the cavity','mutants are a bigger share now','resistant strains spread too']};
  function draw(t){const N=vb(svg,'720 400','400 600');const ph=phaseOf(RS_STEPS[sc],t);
    const L=N?{cx:200,cy:172,rx:166,ry:106,len:10,lgY:300,lgX:16,chX0:16,chY:344,cX0:46,cX1:384,cY0:400,cY1:460,tY:482,pS:54,pA:66,pB:300}
             :{cx:222,cy:204,rx:188,ry:126,len:12,lgY:356,lgX:34,chX0:452,chY:64,cX0:478,cX1:700,cY0:138,cY1:222,tY:246,pS:62,pA:490,pB:668};
    let s=`<defs>${marker('rsArr','var(--muted)')}</defs>`;
    s+=`<text x="${N?16:24}" y="24" class="t-big">${TT[sc][ph]}</text><text x="${N?16:24}" y="42" class="t-sm">${SUB[sc][ph]}</text>`;
    /* the cavity: a caseous wall around an air-filled space, open to an airway at the top */
    const heal=sc==='combo'?ramp(t,.58,.78):0;
    s+=`<path d="${blob(L.cx,L.cy,L.ry+14,31,L.rx/L.ry*.97,1,16,.12)}" style="fill:var(--caseum);fill-opacity:${f1(.35-.2*heal)};stroke:${heal>.5?'var(--fibro)':'var(--mac-line)'};stroke-width:${f1(1.5+2*heal)}"/>`;
    s+=`<path d="${blob(L.cx,L.cy,L.ry,32,L.rx/L.ry,1,16,.1)}" style="fill:var(--field);stroke:var(--mac-line);stroke-width:1"/>`;
    s+=`<path d="M${f1(L.cx-12)} ${f1(L.cy-L.ry+2)}L${f1(L.cx-9)} ${f1(L.cy-L.ry-18)}M${f1(L.cx+12)} ${f1(L.cy-L.ry+2)}L${f1(L.cx+9)} ${f1(L.cy-L.ry-18)}" style="stroke:var(--airway);stroke-width:2.4;stroke-linecap:round"/>`;
    s+=`<text x="${f1(L.cx-18)}" y="${f1(L.cy-L.ry-10)}" class="t-xs t-end">airway</text><text x="${f1(L.cx+L.rx-4)}" y="${f1(L.cy+L.ry+11)}" class="t-xs t-end">cavity wall (caseum)</text>`;
    const P=p=>[L.cx+p.u*L.rx,L.cy+p.v*L.ry];
    /* original rods */
    M.O.forEach(o=>{const [x,y]=P(o);
      if(t<o.d)s+=o.dorm?`<g style="opacity:.8">${bacillus(x,y,L.len,o.a,{dormant:true})}</g>`:rsRod(x,y,L.len,o.a,o.ty);
      else if(t<o.d+.1)s+=`<g style="opacity:${f1(1-(t-o.d)/.1)}">${bacillus(x,y,L.len,o.a,{dead:true})}</g>`});
    /* regrowth */
    M.G.forEach(g=>{if(t<g.b)return;const [x,y]=P(g),k=ramp(t,g.b,g.b+.025);s+=rsRod(x,y,L.len*(.4+.6*k),g.a,g.ty,k)});
    /* labels for the first mutants */
    if(t<.17){const op=1-ramp(t,.13,.17);const [hx,hy]=P(M.O[0]),[rx,ry]=P(M.O[3]);
      s+=`<g style="opacity:${f1(op)}"><path d="M${f1(hx-8)} ${f1(hy-8)}L${f1(hx-30)} ${f1(hy-30)}" class="arrow" style="stroke:var(--dH)"/><text x="${f1(hx-32)}" y="${f1(hy-34)}" class="t-xs t-mid" style="fill:var(--ink);paint-order:stroke;stroke:var(--field);stroke-width:3">isoniazid-resistant</text>`;
      s+=`<path d="M${f1(rx+8)} ${f1(ry+8)}L${f1(rx+28)} ${f1(ry+28)}" class="arrow" style="stroke:var(--dR)"/><text x="${f1(rx+30)}" y="${f1(ry+40)}" class="t-xs t-mid" style="fill:var(--ink);paint-order:stroke;stroke:var(--field);stroke-width:3">rifampicin-resistant</text></g>`}
    /* legend */
    const lg=[ ['s','susceptible'],['h','isoniazid-resistant'],['r','rifampicin-resistant'],['d','killed']];
    let lx=L.lgX,ly=L.lgY;const lmax=N?384:430;
    lg.forEach(it=>{const wdt=it[1].length*5.8+28;if(lx+wdt>lmax){lx=L.lgX;ly+=15}
      s+=(it[0]==='d'?bacillus(lx+6,ly-3,11,0,{dead:true}):rsRod(lx+6,ly-3,10,0,it[0]))+`<text x="${lx+16}" y="${ly+1}" class="t-xs">${it[1]}</text>`;lx+=wdt});
    /* drugs */
    const on=t>=RS_ON&&(sc!=='interrupt'||t<RS_STOP),stopped=sc==='interrupt'&&t>=RS_STOP;
    s+=`<text x="${L.chX0}" y="${L.chY-8}" class="t-sm">${t<RS_ON?'NO TREATMENT YET':stopped?'TREATMENT STOPPED':'DRUGS ACTING'}</text>`;
    M.regs.forEach((d,i)=>{const x=L.chX0+i*52,y=L.chY;const op=t<RS_ON?.25:stopped?.3:1;
      s+=`<g style="opacity:${op}"><rect x="${x}" y="${y}" width="46" height="22" rx="11" style="fill:${RS_DRUG[d][0]};stroke:var(--ink);stroke-opacity:.35"/><text x="${x+23}" y="${y+15}" class="t-lbl t-mid" style="fill:#1a1a1a">${d}</text></g>`;
      if(stopped)s+=`<line x1="${x+4}" x2="${x+42}" y1="${y+20}" y2="${y+2}" style="stroke:var(--bad);stroke-width:2"/>`});
    if(!N)s+=`<text x="${L.chX0+M.regs.length*52+4}" y="${L.chY+15}" class="t-xs">${M.regs.length===1?'isoniazid only':'H R Z E'}</text>`;
    /* population chart */
    const ymax=130,X=u=>lerp(L.cX0,L.cX1,u),Y=v=>lerp(L.cY1,L.cY0,v/ymax);
    s+=`<text x="${L.cX0-30}" y="${L.cY0-10}" class="t-sm">${N?'RODS IN THE DRAWING':'RODS ALIVE IN THE DRAWING'}</text>`;
    [0,50,100].forEach(v=>s+=`<line x1="${L.cX0}" x2="${L.cX1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.cX0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<line x1="${f1(X(RS_ON))}" x2="${f1(X(RS_ON))}" y1="${L.cY0}" y2="${L.cY1}" style="stroke:var(--rx);stroke-width:1.2"/><text x="${f1(X(RS_ON)+3)}" y="${L.cY0+8}" class="t-xs" style="fill:var(--rx)">drugs start</text>`;
    if(sc==='interrupt')s+=`<line x1="${f1(X(RS_STOP))}" x2="${f1(X(RS_STOP))}" y1="${L.cY0}" y2="${L.cY1}" style="stroke:var(--bad);stroke-width:1.2;stroke-dasharray:4 3"/><text x="${f1(X(RS_STOP)+3)}" y="${L.cY0+30}" class="t-xs" style="fill:var(--bad)">stopped</text>`;
    const series=[ ['s','var(--tb)'],['h','var(--dH)'],['r','var(--dR)']];
    series.forEach(([k,c])=>{let d='';const n=Math.max(2,Math.round(t*90));for(let i=0;i<=n;i++){const u=t*i/n;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(rsCount(M,u)[k]))}
      s+=`<path d="${d}" style="fill:none;stroke:${c};stroke-width:${k==='s'?2:2.4}"/>`});
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${L.cY0}" y2="${L.cY1}" style="stroke:var(--ink);opacity:.35"/><text x="${L.cX1}" y="${L.cY1+12}" class="t-xs t-end">time (schematic)</text>`;
    /* bottom-right: the ratio box, then transmission */
    const tr=ramp(t,.8,.86);
    if(tr<1){const op=1-tr,bx=N?16:452,by=L.tY;
      s+=`<g style="opacity:${f1(op)}"><rect x="${bx}" y="${by}" width="${N?368:252}" height="${N?114:122}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<text x="${bx+12}" y="${by+20}" class="t-sm" style="fill:var(--warn)">NOT TO SCALE</text>`;
      [ ['Drawn: 4 mutants in 96 rods.','var(--ink)'],['Real mutation odds per division:','var(--muted)'],['isoniazid  ~1 in 39 million','var(--dH)'],['rifampicin ~1 in 4.4 billion','var(--dR)'],['both       ~1 in 170 million billion','var(--good)'] ].forEach(([l,c],k)=>{s+=`<text x="${bx+12}" y="${by+40+k*16}" class="t-xs" style="fill:${c};white-space:pre">${l}</text>`});
      s+=`</g>`}
    if(tr>0){const ax=L.pA,bxp=L.pB,py=L.tY+8,ps=L.pS,mty=sc==='single'?'h':'m';
      s+=`<g style="opacity:${f1(tr)}">`;
      s+=person(ax,py,ps,'var(--tb)',{cough:Math.sin(t*120)>0,face:1})+person(bxp,py,ps,'var(--muted)',{face:-1});
      s+=`<text x="${ax}" y="${py+ps+13}" class="t-xs t-mid">${sc==='single'?'this person, Hr-TB':'someone with MDR-TB'}</text><text x="${bxp}" y="${py+ps+13}" class="t-xs t-mid">${sc==='single'?'Hr-TB from day one':'MDR-TB from day one'}</text>`;
      for(let i=0;i<5;i++){const k=ramp(t,.83+i*.025,.93+i*.015);if(k<=0||k>=1)continue;
        const x=lerp(ax+ps*.25,bxp-ps*.2,k),y=py+ps*.22+Math.sin(k*Math.PI)*(-14+i*7);s+=droplet(x,y,6.5)+rsRod(x,y,7,30+i*20,mty)}
      const sy=py+ps+24,sw=bxp-ax+40,sx=ax-20;
      s+=`<rect x="${sx}" y="${sy}" width="${f1(sw)}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${sx}" y="${sy}" width="${f1(sw*.959*ramp(t,.86,.95))}" height="12" rx="6" style="fill:var(--warn)"/>`;
      s+=`<text x="${sx}" y="${sy+26}" class="t-xs" style="fill:var(--ink)">MDR-TB from transmission: median 95.9%</text></g>`}
    svg.innerHTML=s;setSt(ph);
    const c=rsCount(M,t);
    $('#rsRead').innerHTML=`<span>scenario <b>${{single:'one drug',combo:'four drugs',interrupt:'stopped early'}[sc]}</b></span><span>susceptible <b>${c.s}</b></span><span>isoniazid-resistant <b>${c.h}</b></span><span>rifampicin-resistant <b>${c.r}</b></span><span>drawn rods, not real counts</span>`;
    $('#rsNote').innerHTML=noteHTML(RS_STEPS[sc][ph]);
  }
  const stop=playWire(rg,$('#rsPlay'),draw,22000,'Replay','resistance');
  function wire(){const old=$('#rsSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,RS_STEPS[sc],rg,draw,stop)}
  $$('[data-rs]').forEach(b=>b.addEventListener('click',()=>{stop();sc=b.dataset.rs;M=rsModel(sc);$$('[data-rs]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- the arithmetic of combinations ---- */
  const sel=$('#rsPop');
  function calc(){const n=Math.pow(10,+sel.value),rows=[ ['isoniazid',2.56e-8,'2.56 × 10⁻⁸'],['rifampicin',2.25e-10,'2.25 × 10⁻¹⁰'],['ethambutol',1e-7,'10⁻⁷'],['isoniazid and rifampicin together',2.56e-8*2.25e-10,'≈ 5.8 × 10⁻¹⁸, the product (calculated here)']];
    const fmt=x=>x>=100?Math.round(x).toLocaleString('en-GB'):x>=1?x.toFixed(1):x>=1e-3?x.toPrecision(2):x.toExponential(1).replace('e-',' × 10^-').replace(/\^-(\d+)/,(m,d)=>'⁻'+[...d].map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join(''));
    $('#rsCalcOut').innerHTML=rows.map(([k,r,rs],i)=>`<div class="card"><span class="kicker">${k}</span><b class="big-num" style="font-size:30px;${i===3?'color:var(--good)':''}">${fmt(n*r)}</b><p>new mutants expected per generation in 10<sup>${sel.value}</sup> dividing bacilli (rate ${rs})</p></div>`).join('');
  }
  sel.addEventListener('change',calc);calc();

  /* ---- WHO 2021 category classifier ---- */
  const lad=$('#rsLad');
  const CAT=[{id:'none',n:'Rifampicin-susceptible',d:'no resistance, or Hr-TB'},{id:'rr',n:'RR-TB / MDR-TB',d:'rifampicin (± isoniazid)'},{id:'pre',n:'pre-XDR-TB',d:'+ a fluoroquinolone'},{id:'xdr',n:'XDR-TB',d:'+ bedaquiline or linezolid'}];
  function classify(){const v=k=>$('#rsC'+k).checked,R=v('R'),H=v('H'),F=v('F'),B=v('B'),Lz=v('L');
    let lvl=0,name,txt,cls='maybe';
    if(R){if(F&&(B||Lz)){lvl=3;name='XDR-TB';cls='no';txt=`Rifampicin-resistant, resistant to at least one fluoroquinolone (levofloxacin or moxifloxacin), and to at least one other Group A drug (bedaquiline or linezolid) <sup class="c" data-ref="WHO-Mod4-2025,Viney2021" title="Source 498,515">498,515</sup>. Treatment is individualised by specialists; WHO keeps longer regimens (18–20 months for most people) as a last resort <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`}
      else if(F){lvl=2;name='pre-XDR-TB';cls='no';txt=`Rifampicin-resistant (possibly also isoniazid-resistant) and resistant to at least one fluoroquinolone <sup class="c" data-ref="WHO-Mod4-2025,Viney2021" title="Source 498,515">498,515</sup>. An estimated 18% of MDR/RR-TB in 2024 was pre-XDR <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>. WHO uses BPaL, without moxifloxacin, when fluoroquinolone resistance is documented <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`}
      else{lvl=1;name=H?'MDR-TB':'RR-TB';cls='maybe';txt=(H?`Resistant to both rifampicin and isoniazid. `:`Resistant to rifampicin, with or without isoniazid resistance. `)+`MDR-TB and RR-TB are reported together as MDR/RR-TB <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>. For fluoroquinolone-susceptible MDR/RR-TB, WHO suggests the 6-month BPaLM regimen <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`+((B||Lz)?` Resistance to bedaquiline or linezolid without a fluoroquinolone does not move it up a category: XDR needs both.`:'')}}
    else if(H){lvl=0;name='Hr-TB';cls='maybe';txt=`Isoniazid-resistant, rifampicin-susceptible TB <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>. WHO recommends rifampicin, ethambutol, pyrazinamide and levofloxacin for 6 months <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`+((F||B||Lz)?` The other ticks do not create a named WHO category: pre-XDR and XDR both start from rifampicin resistance.`:'')}
    else if(F||B||Lz){lvl=0;name='Not a named category';cls='maybe';txt=`Without rifampicin resistance, resistance to a fluoroquinolone, bedaquiline or linezolid is not pre-XDR or XDR: both definitions start from rifampicin resistance <sup class="c" data-ref="WHO-Mod4-2025,Viney2021" title="Source 498,515">498,515</sup>. Treatment choices still depend on the full drug-susceptibility result.`}
    else{lvl=-1;name='No resistance ticked';cls='yes';txt=`Tick the drugs the strain resists. Rifampicin is the gate: every category above Hr-TB starts with it.`}
    $('#rsVerdict').className='verdict '+cls;$('#rsVerdict').innerHTML=`${name}`;
    $('#rsCatTxt').innerHTML=txt+` See <a href="#drtb" data-go="drtb">Treating drug-resistant TB</a>.`;
    const NL=vb(lad,'720 230','400 400');let s='';
    CAT.forEach((c,i)=>{const on=i===lvl||(lvl<0&&false),past=i<lvl;
      const g=NL?{x:20+i*22,y:326-i*78,w:280,h:62}:{x:20+i*172,y:150-i*36,w:160,h:58};
      const col=i===0?'var(--accent)':i===1?'var(--warn)':i===2?'var(--dR)':'var(--bad)';
      s+=`<rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="10" style="fill:${on?col:'var(--panel-2)'};fill-opacity:${on?.9:1};stroke:${on||past?col:'var(--line)'};stroke-width:${on?2.4:1.2}"/>`;
      s+=`<text x="${g.x+12}" y="${g.y+24}" class="t-lbl" style="fill:${on?'#141414':'var(--ink)'}">${c.n}</text><text x="${g.x+12}" y="${g.y+44}" class="t-xs" style="fill:${on?'#141414':'var(--muted)'}">${c.d}</text>`;
      if(i<3){const a=NL?{x1:g.x+g.w-30,y1:g.y,x2:g.x+g.w-8,y2:g.y-20}:{x1:g.x+g.w/2,y1:g.y,x2:g.x+g.w+30,y2:g.y-12};s+=`<path d="M${a.x1} ${a.y1}L${a.x2} ${a.y2}" class="arrow" marker-end="url(#rsArr2)"/>`}});
    s=`<defs>${marker('rsArr2','var(--muted)')}</defs><text x="20" y="${NL?24:24}" class="t-sm">WHO 2021 DEFINITIONS · each step adds a resistance</text>`+s;
    s+=`<text x="20" y="62" class="t-big" style="fill:${lvl<0?'var(--muted)':'var(--ink)'}">${name}</text>`;
    lad.innerHTML=s;
  }
  $$('#rsClass input').forEach(i=>i.addEventListener('change',classify));classify();
  redraws.resistance=(p=>()=>{p&&p();classify()})(redraws.resistance);
};
/* =============== 3.1 How TB drugs work =============== */
const DR_COL={H:'var(--dH)',R:'var(--dR)',Z:'var(--dZ)',E:'var(--dE)'};
const DR_NM={H:'isoniazid',R:'rifampicin',Z:'pyrazinamide',E:'ethambutol'};
/* Schematic kill rates (log10 per day) for each drug in each of Mitchison's places.
   A: cavity wall, fast-growing extracellular bacilli. B: acid-inhibited bacilli in inflamed tissue and macrophages.
   C: near-dormant bacilli in solid caseum. Drawn to show the idea, not measured. */
const DR_K={A:{H:.62,R:.18,E:.045,Z:0},B:{H:.01,R:.05,E:0,Z:.11},C:{H:0,R:.028,E:0,Z:.012}};
const DR_L0={A:8,B:5.6,C:4.8};
const DR_DAYS=182;
/* the time axis: the first 14 days take 22% of the width */
const drT2d=t=>t<=.22?14*t/.22:14+168*(t-.22)/.78;
const drD2t=d=>d<=14?.22*d/14:.22+.78*(d-14)/168;
/* daily simulation of the three places plus two resistant mutant lines in the cavity wall */
function drSim(on,stopZE){
  const S=[];let a=DR_L0.A,rh=.6,rr=-1.4,b=DR_L0.B,c=DR_L0.C;
  const add=(x,y)=>Math.max(x,y)+Math.log10(1+Math.pow(10,-Math.abs(x-y)));
  for(let d=0;d<=DR_DAYS;d++){
    const A=add(add(a,rh),rr);S.push({d,a,rh,rr,A,b,c});
    const act=k=>on[k]&&!(stopZE&&(k==='Z'||k==='E')&&d>=56);
    const kill=(P,skip)=>['H','R','Z','E'].reduce((s,k)=>s+(act(k)&&k!==skip?DR_K[P][k]:0),0);
    const kA=kill('A'),kAh=kill('A','H'),kAr=kill('A','R'),kB=kill('B'),kC=kill('C');
    const grow=(x,k,cap,g)=>k>0?x-k:Math.min(cap,x+g);
    a=a>-1?grow(a,kA,8.4,.08):a;
    rh=rh>-2?grow(rh,kAh,8.4,.12):rh;
    rr=rr>-3?grow(rr,kAr,8.4,.12):rr;
    b=b>-1?grow(b,kB,6,.02):b;
    c=c>-1?(kC>0?c-kC:c):c;
  }
  return S}
function drAt(S,d){const i=clamp(Math.floor(d),0,DR_DAYS-1),f=clamp(d-i,0,1),p=S[i],q=S[Math.min(DR_DAYS,i+1)],o={};
  ['a','rh','rr','A','b','c'].forEach(k=>o[k]=lerp(p[k],q[k],f));o.d=d;return o}
const drFmtD=d=>d<14?(d<1.95?f1(d)+' days':Math.round(d)+' days'):'week '+Math.round(d/7);

const DR_STEPS=[
 {from:0,at:drD2t(1),k:'Days 0–2',t:'Isoniazid strikes first',
  txt:`The cavity wall holds the most bacilli, growing fast in air-filled tissue where the immune response has failed locally. Isoniazid, a prodrug switched on by the bacterium's own KatG enzyme, is bactericidal against actively growing organisms, so it does most of the early killing: about 95% of organisms in the first two days. In a study of 100 people given 22 regimens, the fast kill of the first 2 days was driven mainly by isoniazid and rifampin. <sup class="c" data-ref="Kaplan2003,Eum2010,FDA-Isoniazid,Mitchison2000,Jindani2003" title="Source 156,160,253,260,328">156,160,253,260,328</sup>`,
  pt:`In the first two days most of the germs die, mainly from isoniazid. That is why people often stop being infectious quite soon, but it is far from a cure.`,
  hook:`Early bactericidal activity (EBA): the fall in viable sputum bacilli over the first days. Isoniazid dominates it. <sup class="c" data-ref="Mitchison2000,Jindani2003" title="Source 253,328">253,328</sup>`},
 {from:drD2t(2),at:drD2t(8),k:'Days 2–14',t:'Rifampicin and pyrazinamide take over',
  txt:`After the first days, rifampicin and pyrazinamide take over the bactericidal role through the intensive phase. On days 2 to 14 the sterilising activity came from rifampin, not from isoniazid or pyrazinamide. Rifampicin binds the β subunit of RNA polymerase and blocks the growing RNA once it is 2 to 3 nucleotides long. On its own at 10 mg/kg it lowered sputum bacterial load by 0.176 log10 CFU/mL a day over 14 days. <sup class="c" data-ref="Mitchison2000,Jindani2003,Campbell2001Rif,Boeree2015" title="Source 46,62,253,328">46,62,253,328</sup>`,
  pt:`Once the easy germs are gone, the slower ones are left. Rifampicin is the medicine that keeps killing those.`,
  hook:`Isoniazid = main early bactericidal drug. Rifampicin = key sterilising drug. <sup class="c" data-ref="Jindani2003" title="Source 253">253</sup>`},
 {from:drD2t(16),at:drD2t(35),k:'Weeks 2–8',t:'The acid niche: pyrazinamide',
  txt:`Mitchison's framework separates actively growing, slowly or intermittently metabolising, acid-inhibited and near-dormant bacilli, each with different drug susceptibility. Pyrazinamide enters by passive diffusion and is turned into pyrazinoic acid by pyrazinamidase (pncA). Under acid conditions the protonated acid builds up inside, because efflux is weak, and the drug is more active against old, slow bacilli than against growing cultures. It acts with rifampicin as a sterilising agent. Note that the bacillus's own phagosome resists full acidification, stopping at about pH 6.3 to 6.5. Turn Z off to see this middle line clear more slowly. <sup class="c" data-ref="Mitchison2000,Zhang2003PZA,SturgillKoszycki1994" title="Source 328,449,536">328,449,536</sup>`,
  pt:`Some germs sit in sour, inflamed pockets. Pyrazinamide works best exactly there, which is why it is in the first two months.`,
  hook:`Pyrazinamide needs pyrazinamidase (pncA) and acid pH. pncA mutations cause resistance. <sup class="c" data-ref="Zhang2003PZA,Scorpio1996" title="Source 417,536">417,536</sup>`},
 {from:drD2t(50),at:drD2t(56),k:'Week 8',t:'Two months: sputum turns negative',
  txt:`What reaches the sputum comes mostly from the cavity wall, so cultures turn negative long before the last bacilli die. With daily dosing, 85% of people (700/828) were culture-negative at 2 months, against 77% with a thrice-weekly intensive phase. In the standard regimen, pyrazinamide and ethambutol stop here. <sup class="c" data-ref="Jindani2004,WHO-Mod4-2025" title="Source 254,515">254,515</sup>`,
  pt:`A negative sputum test at two months is good news, but germs are still hiding where the test cannot see them.`,
  hook:`A positive 2-month culture predicts relapse poorly: sensitivity 40%, specificity 85%. <sup class="c" data-ref="Horne2010" title="Source 236">236</sup>`},
 {from:drD2t(63),at:drD2t(140),k:'Months 3–6',t:'Persisters: why treatment lasts months',
  txt:`In an isoniazid-rifampicin continuation phase, rifampicin is the only drug that acts on persisters: people whose strain was isoniazid-resistant at the start did about as well as those whose strain was not. In rabbit cavity caseum, bacilli were largely non-replicating and only the rifamycins fully sterilised it; pyrazinamide also killed there. Rifampicin accumulates in caseum. Turn R off: the lowest line stalls and bacilli survive to the end. <sup class="c" data-ref="Mitchison2000,Sarathy2018,Prideaux2015" title="Source 328,379,411">328,379,411</sup>`,
  pt:`The last germs are almost asleep inside dead, cheesy tissue. Only a long course of rifampicin reliably finishes them off, which is why you keep taking it after you feel well.`,
  hook:`Rifampicin for 6 months, not 2: relapse 3.1% vs 8.2% with fully susceptible TB, and 5.5% vs 38% with isoniazid resistance at the start. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`},
 {from:drD2t(168),at:1,k:'Week 26',t:'Why one drug is never enough',
  txt:`Resistance arises by chance chromosomal mutation, not by passing genes between bacteria. Mutation rates per bacterium per generation were 2.56 × 10⁻⁸ for isoniazid, 10⁻⁷ for ethambutol and 2.25 × 10⁻¹⁰ for rifampicin. In a large population a few resistant mutants are already present before treatment starts; one drug alone kills the rest and lets them take over. Press <b>Isoniazid alone</b> to watch it happen. A bacillus resistant to two drugs at once would need two independent rare mutations, so a combination covers both. <sup class="c" data-ref="David1970,Mitchison2000" title="Source 110,328">110,328</sup>`,
  pt:`A few germs are born resistant to any one medicine. A second medicine kills those few, which is why TB is always treated with several medicines at once.`,
  hook:`Combination therapy exists because resistance mutations are rare and independent. The mutation rate to rifampicin resistance is the lowest: 2.25 × 10⁻¹⁰ per bacterium per generation. <sup class="c" data-ref="David1970,Mitchison2000" title="Source 110,328">110,328</sup>`}
];

/* ---- mechanism cards ---- */
const DR_MX=[
 {id:'H',lt:'H',c:'var(--dH)',n:'Isoniazid',cl:'Hydrazide prodrug',tg:'myc',bk:'Activated by KatG, then blocks InhA: no mycolic acids for the waxy coat.',
  txt:`<b>Isoniazid</b> is a prodrug. A single gene, katG (catalase-peroxidase), restored isoniazid sensitivity in a resistant mutant, and deleting katG went with resistance in patient isolates. Its target, InhA, is an enoyl reductase in mycolic acid synthesis; a missense mutation in inhA gave resistance to both isoniazid and ethionamide. The US label lists resistance mutations in katG, inhA, kasA and ahpC. <sup class="c" data-ref="Zhang1992,Banerjee1994,FDA-Isoniazid" title="Source 25,160,535">25,160,535</sup>`},
 {id:'R',lt:'R',c:'var(--dR)',n:'Rifampicin',cl:'Rifamycin',tg:'rnap',bk:'Plugs RNA polymerase (β subunit): genes cannot be read.',
  txt:`<b>Rifampicin</b> binds a pocket of the RNA polymerase β subunit more than 12 Å from the active site and blocks the path of the growing RNA once it is 2 to 3 nucleotides long. Resistance maps to a 23-amino-acid hot spot of rpoB: mutations there were found in 64 of 66 resistant isolates and in none of 56 susceptible ones, which is what rapid molecular tests read. <sup class="c" data-ref="Campbell2001Rif,Telenti1993" title="Source 62,462">62,462</sup>`},
 {id:'Z',lt:'Z',c:'var(--dZ)',n:'Pyrazinamide',cl:'Prodrug (pyrazinoic acid)',tg:'cyto',bk:'Turned into pyrazinoic acid by pncA; builds up under acid conditions.',
  txt:`<b>Pyrazinamide</b> enters by passive diffusion and is converted to pyrazinoic acid by pyrazinamidase (pncA). Protonated pyrazinoic acid accumulates under acid conditions because efflux is weak. Resistance comes from highly diverse pncA mutations that remove the enzyme, and a functional pncA restored susceptibility in resistant strains. <sup class="c" data-ref="Zhang2003PZA,Scorpio1996" title="Source 417,536">417,536</sup>`},
 {id:'E',lt:'E',c:'var(--dE)',n:'Ethambutol',cl:'Arabinan synthesis inhibitor',tg:'ara',bk:'Blocks arabinan polymerisation in the arabinogalactan layer (embCAB).',
  txt:`<b>Ethambutol</b> inhibits polymerisation of cell-wall arabinan. Resistance comes from overexpression of Emb proteins, structural mutations in EmbB, or both, in the embCAB cluster that encodes arabinosyl transferases; it was found in up to 4% of clinical isolates at the time. <sup class="c" data-ref="Telenti1997" title="Source 463">463</sup>`},
 {id:'FQ',lt:'FQ',c:'var(--dNew)',n:'Fluoroquinolones',cl:'Moxifloxacin, levofloxacin',tg:'dna',bk:'Target DNA gyrase: the DNA cannot be unwound and copied.',
  txt:`<b>Fluoroquinolones</b> target DNA gyrase. gyrA mutations were found in all 14 isolates with a ciprofloxacin MIC above 2 µg/mL, and resistant mutants arose at a frequency of 1 in 10⁷ to 10⁸. Moxifloxacin speeds early culture conversion but diffuses poorly into caseum. <sup class="c" data-ref="Takiff1994,Dorman2021,Prideaux2015" title="Source 141,379,457">141,379,457</sup>`},
 {id:'B',lt:'B',c:'var(--dNew)',n:'Bedaquiline',cl:'Diarylquinoline',tg:'atp',bk:'Jams ATP synthase in the membrane: the bacillus runs out of energy.',
  txt:`<b>Bedaquiline</b> inhibits mycobacterial ATP synthase. In early work its MIC was 0.06 µg/mL against both drug-susceptible and drug-resistant strains, and resistant mutants pointed to the ATP synthase proton pump. In the C208 trial it shortened median time to culture conversion from 125 to 83 days. <sup class="c" data-ref="Andries2005,Diacon2014" title="Source 14,122">14,122</sup>`},
 {id:'Pa',lt:'Pa',c:'var(--dNew)',n:'Pretomanid',cl:'Nitroimidazooxazine',tg:'myc2',bk:'Activated by Ddn; blocks mycolic acid synthesis and releases nitric oxide.',
  txt:`<b>Pretomanid</b> is activated by Ddn, an F420-dependent nitroreductase. Its main metabolite generates reactive nitrogen species including nitric oxide, and the label says it inhibits mycolic acid biosynthesis. Unlike older drugs it killed both replicating and static bacilli. <sup class="c" data-ref="Singh2008,FDA-Pretomanid,Stover2000" title="Source 164,429,447">164,429,447</sup>`},
 {id:'L',lt:'Lzd',c:'var(--dNew)',n:'Linezolid',cl:'Oxazolidinone',tg:'none',bk:'Resistant mutants can be selected in the lab, so resistance is monitored.',
  txt:`<b>Linezolid</b> is an oxazolidinone, a core drug of the 6-month regimens for drug-resistant TB. Resistant mutants can be selected in vitro, so emergent resistance is monitored. Its molecular target is not drawn here because it is outside the sources gathered for this guide. Its toxicity is well documented: see <a href="#safety" data-go="safety">Side effects</a>. <sup class="c" data-ref="Hillemann2008,WHO-Mod4-2025" title="Source 233,515">233,515</sup>`}
];

inits.drugs=()=>{
  const svg=$('#drSvg'),rg=$('#drT');
  const on={H:true,R:true,Z:true,E:true};let stopZE=true,S=drSim(on,stopZE),setSt=()=>{};
  const PL=[{k:'A',n:'Cavity wall',n2:'fast-growing, outside cells',col:'var(--tb)'},{k:'B',n:'Acid pockets',n2:'inflamed tissue, macrophages',col:'var(--gold)'},{k:'C',n:'Caseum',n2:'near-dormant, solid lesion',col:'var(--accent)'}];
  const val=(P,o)=>P==='A'?o.A:P==='B'?o.b:o.c;
  const act=(k,d)=>on[k]&&!(stopZE&&(k==='Z'||k==='E')&&d>=56);
  function status(P,o){const v=val(P,o),d=o.d;if(v<0)return['cleared','var(--good)'];
    if(P==='A'&&Math.max(o.rh,o.rr)>o.a&&Math.max(o.rh,o.rr)>1.5&&d>4)return['resistant mutants','var(--bad)'];
    const prev=drAt(S,Math.max(0,d-2));if(d>.5&&prev[P==='A'?'A':P.toLowerCase()]<=v+.002&&d>1)return[v>=(P==='A'?7.9:P==='B'?5.5:4.7)?'untouched':'stalled','var(--warn)'];
    return['falling','var(--muted)']}
  function panel(P,x,y,w,h,o,N){const v=val(P,o),L0=DR_L0[P],d=o.d;
    let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const p=PL.find(q=>q.k===P);
    s+=`<text x="${x+10}" y="${y+18}" class="t-lbl" style="fill:${p.col}">${p.n}</text>`;
    if(!N)s+=`<text x="${x+10}" y="${y+31}" class="t-xs">${p.n2}</text>`;
    else s+=`<text x="${x+10}" y="${y+31}" class="t-xs">${p.n2.split(',')[0]}</text>`;
    const cx=x+w/2,cy=y+h*.52,r=Math.min(w,h)*(N?.3:.27);
    const alive=Math.round(clamp(v/L0,0,1.08)*14),dead=Math.max(0,14-alive);
    const rr=rng(P.charCodeAt(0)*7);
    if(P==='A'){s+=granuloma(cx,cy+r*.18,r,1,{bac:0,seed:4});
      const resShare=o.A>-1?Math.pow(10,Math.max(o.rh,o.rr)-o.A):0;
      for(let i=0;i<14;i++){const ang=Math.PI*(1.05+i/13*.9),rad=r*.42;const bx=cx+Math.cos(ang)*rad*1.3,by=cy+r*.18+Math.sin(ang)*rad*.9-r*.1;
        const isA=i<alive,isRes=isA&&i<Math.round(alive*resShare);
        s+=bacillus(bx+(rr()-.5)*4,by+(rr()-.5)*4,r*.15,rr()*180,{dead:!isA,res:isRes})}}
    else if(P==='B'){[[-.5,-.15],[.48,-.2],[0,.42]].forEach((q,i)=>{s+=macrophage(cx+q[0]*r,cy+q[1]*r,r*.42,{seed:i+5,kind:i===2?'foamy':'resting'})});
      for(let i=0;i<14;i++){const m=i%3,q=[[-.5,-.15],[.48,-.2],[0,.42]][m],a=rr()*Math.PI*2,dd=r*.12+rr()*r*.2;
        s+=bacillus(cx+q[0]*r+r*.1+Math.cos(a)*dd,cy+q[1]*r+Math.sin(a)*dd*.8,r*.14,rr()*180,{dead:i>=alive})}}
    else{s+=granuloma(cx,cy,r,.72,{bac:0,seed:8});
      for(let i=0;i<14;i++){const a=rr()*Math.PI*2,dd=Math.sqrt(rr())*r*.26;s+=bacillus(cx+Math.cos(a)*dd,cy+Math.sin(a)*dd,r*.13,rr()*180,{dormant:i<alive,dead:i>=alive})}}
    /* drug pills that act here now */
    let px=x+10;const py=y+h-36;
    ['H','R','Z','E'].forEach(k=>{if(DR_K[P][k]<=0)return;const a2=act(k,d);
      s+=pill(px+9,py,18,DR_COL[k],{label:k,op:a2?1:.18});px+=22});
    const st=status(P,o);
    s+=`<text x="${x+10}" y="${y+h-10}" class="t-sm" style="fill:${st[1]};font-weight:700">${st[0].toUpperCase()}</text>`;
    s+=`<text x="${x+w-10}" y="${y+h-10}" class="t-xs t-end">${v<0?'&lt;1':'10^'+f1(v)}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 410','400 640');const d=drT2d(t),o=drAt(S,d);let s=`<defs>${marker('drAr','var(--muted)')}</defs>`;
    /* panels */
    if(!N){PL.forEach((p,i)=>{s+=panel(p.k,12+i*236,8,224,178,o,false)})}
    else{PL.forEach((p,i)=>{s+=panel(p.k,6+i*130,8,126,214,o,true)})}
    /* chart */
    const C=N?{x0:44,x1:388,y0:262,y1:540,ax:556}:{x0:58,x1:700,y0:212,y1:368,ax:384};
    const X=dd=>C.x0+(C.x1-C.x0)*drD2t(dd),Y=v=>lerp(C.y1,C.y0,(clamp(v,-.6,9)+.6)/9.6);
    for(let v=0;v<=8;v+=2)s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v?'10'+['','','²','','⁴','','⁶','','⁸'][v]:'1'}</text>`;
    s+=`<text x="${C.x0}" y="${C.y0-8}" class="t-xs">viable bacilli · log scale · schematic</text>`;
    /* detection line and 2-month band */
    s+=`<rect x="${f1(X(52))}" y="${C.y0}" width="${f1(X(60)-X(52))}" height="${C.y1-C.y0}" style="fill:var(--rx);opacity:.09"/>`;
    s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(1.5))}" y2="${f1(Y(1.5))}" style="stroke:var(--rx);stroke-width:1;stroke-dasharray:5 4"/><text x="${C.x1}" y="${f1(Y(1.5)-4)}" class="t-xs t-end" style="fill:var(--rx)">${N?'culture limit (schematic)':'below this, sputum culture is negative (schematic)'}</text>`;
    [[0,'0'],[2,'2 d'],[7,'1 wk'],[14,'2 wk'],[56,'8 wk'],[112,'16 wk'],[182,'26 wk']].forEach(q=>{s+=`<line x1="${f1(X(q[0]))}" x2="${f1(X(q[0]))}" y1="${C.y1}" y2="${C.y1+4}" class="axis"/><text x="${f1(X(q[0]))}" y="${C.ax}" class="t-xs t-mid">${q[1]}</text>`});
    s+=`<line x1="${f1(X(14))}" x2="${f1(X(14))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--line);stroke-dasharray:1 3"/>`;
    if(!N)s+=`<text x="${f1(X(7))}" y="${C.y1-4}" class="t-xs t-mid" style="opacity:.7">days stretched</text>`;
    /* lines, drawn up to d */
    const line=(key,col,w,dash)=>{let p='';const end=d;const pts=[];
      for(let dd=0;dd<=end+1e-9;dd+=(dd<14?.25:1)){pts.push(dd)}pts.push(end);
      pts.forEach((dd,i)=>{const q=drAt(S,dd);p+=(i?'L':'M')+f1(X(dd))+' '+f1(Y(q[key]))});
      return `<path d="${p}" style="fill:none;stroke:${col};stroke-width:${w};${dash?'stroke-dasharray:'+dash:''};stroke-linejoin:round"/>`};
    s+=line('c','var(--accent)',2.4)+line('b','var(--gold)',2.4)+line('A','var(--tb)',2.8);
    if(Math.max(o.rh,o.rr)>1&&Math.max(o.rh,o.rr)>o.a)s+=line(o.rh>o.rr?'rh':'rr','var(--bad)',1.4,'3 3');
    /* playhead + dots */
    s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    [['c','var(--accent)'],['b','var(--gold)'],['A','var(--tb)']].forEach(q=>{s+=`<circle cx="${f1(X(d))}" cy="${f1(Y(o[q[0]]))}" r="3.6" style="fill:${q[1]}"/>`});
    /* anchors */
    if(on.H&&d>=2){const q=drAt(S,2);s+=`<circle cx="${f1(X(2))}" cy="${f1(Y(q.A))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(2)+8)}" y="${f1(Y(q.A)-6)}" class="t-xs" style="fill:var(--ink)">≈95% killed by day 2</text>`}
    if(d>=56&&on.H&&on.R){s+=`<text x="${f1(X(56)+4)}" y="${C.y1-6}" class="t-xs" style="fill:var(--rx)">${N?'2 mo: 85% culture-neg.':'2 months: 85% culture-negative (daily treatment)'}</text>`}
    /* legend */
    const lg=[['var(--tb)','cavity wall'],['var(--gold)','acid pockets'],['var(--accent)','caseum'],['var(--bad)','resistant mutants']];
    if(N)lg.forEach((q,i)=>{const lx=44+(i%2)*170,ly=588+Math.floor(i/2)*18;s+=`<line x1="${lx}" x2="${lx+18}" y1="${ly-3}" y2="${ly-3}" style="stroke:${q[0]};stroke-width:3;${i===3?'stroke-dasharray:3 3':''}"/><text x="${lx+24}" y="${ly}" class="t-xs">${q[1]}</text>`});
    else lg.forEach((q,i)=>{const lx=150+i*130;s+=`<line x1="${lx}" x2="${lx+18}" y1="${401}" y2="${401}" style="stroke:${q[0]};stroke-width:3;${i===3?'stroke-dasharray:3 3':''}"/><text x="${lx+24}" y="${404}" class="t-xs">${q[1]}</text>`});
    if(N)s+=`<text x="200" y="630" class="t-xs t-mid">time on treatment (first 2 weeks stretched)</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(DR_STEPS,t);setSt(ph);
    $('#drNote').innerHTML=noteHTML(DR_STEPS[ph]);
    const now=['H','R','Z','E'].filter(k=>act(k,d));
    $('#drRead').innerHTML=`<span>time <b>${drFmtD(d)}</b></span><span>drugs now <b>${now.length?now.join(''):'none'}</b></span><span>cavity wall <b>${o.A<0?'cleared':'10^'+f1(o.A)}</b></span><span>acid pockets <b>${o.b<0?'cleared':'10^'+f1(o.b)}</b></span><span>caseum <b>${o.c<0?'cleared':'10^'+f1(o.c)}</b></span>`;
  }
  function verdict(){const v=$('#drVerdict'),E=S[DR_DAYS];const minA=Math.min(...S.map(q=>q.A));
    const list=['H','R','Z','E'].filter(k=>on[k]);
    if(!list.length){v.className='verdict no';v.textContent='No drugs: the bacilli keep growing in the cavity wall and nothing clears.';return}
    if(E.A>minA+1){v.className='verdict no';v.textContent=`${list.join('')}${stopZE&&(on.Z||on.E)?' (Z/E stopped at 2 months)':''}: the cavity wall falls, then climbs back. Mutants resistant to the one drug acting there took over. Schematic.`;return}
    const left=[];if(E.A>=0)left.push('cavity wall');if(E.b>=0)left.push('acid pockets');if(E.c>=0)left.push('caseum');
    if(left.length){v.className='verdict maybe';v.textContent=`${list.join('')}: bacilli still survive at 6 months in the ${left.join(' and ')}. Sputum may look clear, but this is the set-up for relapse. Schematic.`;return}
    const day=S.find(q=>q.A<0&&q.b<0&&q.c<0);v.className='verdict yes';v.textContent=`${list.join('')}: all three places cleared by about week ${Math.ceil(day.d/7)} in this sketch. In real life no test can see the last bacilli, which is why the full course is given.`}
  const stop=playWire(rg,$('#drPlay'),draw,22000,'Replay','drugs');
  setSt=stepWire($('#drSteps'),DR_STEPS,rg,draw,stop);
  const sync=()=>{$$('[data-drd]').forEach(b=>b.setAttribute('aria-pressed',on[b.dataset.drd]));$('#drStop').setAttribute('aria-pressed',stopZE);
    const key=['H','R','Z','E'].filter(k=>on[k]).join('');$$('[data-drp]').forEach(b=>b.setAttribute('aria-current',b.dataset.drp===key?'true':'false'));
    S=drSim(on,stopZE);verdict();draw(+rg.value)};
  $$('[data-drd]').forEach(b=>b.addEventListener('click',()=>{on[b.dataset.drd]=!on[b.dataset.drd];sync()}));
  $('#drStop').addEventListener('click',()=>{stopZE=!stopZE;sync()});
  $$('[data-drp]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.drp;['H','R','Z','E'].forEach(x=>on[x]=k.includes(x));stopZE=true;sync();if(+rg.value<.5){rg.value=1;draw(1)}}));
  sync();

  /* ---- mechanism glyph ---- */
  const ms=$('#drMech');let sel='H';
  function drawM(){const N=vb(ms,'720 330','400 560');const m=DR_MX.find(q=>q.id===sel);
    const B=N?{x:20,y:16,w:360,h:300}:{x:16,y:24,w:420,h:282};
    let s='';const lay=[{k:'myc',n:'Mycolic acids (waxy outer layer)',w:20,c:'var(--caseum)',l:'var(--gold)'},{k:'ara',n:'Arabinogalactan',w:13,c:'var(--mac)',l:'var(--mac-line)'},{k:'pg',n:'Peptidoglycan',w:9,c:'var(--fibro)',l:'var(--fibro)'},{k:'mem',n:'Cell membrane',w:7,c:'var(--accent-soft)',l:'var(--accent)'}];
    const hl=k=>m.tg===k||(m.tg==='myc2'&&(k==='myc'||k==='ribo'))||(m.tg==='atp'&&k==='mem');
    let off=0;const rx0=B.h/2;
    lay.forEach((L,i)=>{const H=hl(L.k);s+=`<rect x="${f1(B.x+off)}" y="${f1(B.y+off)}" width="${f1(B.w-2*off)}" height="${f1(B.h-2*off)}" rx="${f1(rx0-off)}" style="fill:${L.c};stroke:${H?'var(--rx)':L.l};stroke-width:${H?3:1};opacity:${m.tg==='none'||H||m.tg==='cyto'?1:.55}"/>`;off+=L.w});
    const ix=B.x+off,iy=B.y+off,iw=B.w-2*off,ih=B.h-2*off;
    s+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" rx="${f1(rx0-off)}" style="fill:${m.tg==='cyto'?'var(--gold-soft)':'var(--cell)'};stroke:${m.tg==='cyto'?'var(--rx)':'none'};stroke-width:3"/>`;
    const cx=B.x+B.w/2,cy=B.y+B.h/2;
    /* DNA coil */
    let dp='';for(let i=0;i<=80;i++){const u=i/80,xx=lerp(cx-iw*.32,cx+iw*.3,u),yy=cy-ih*.02+Math.sin(u*Math.PI*7)*ih*.09+Math.sin(u*Math.PI*2)*ih*.06;dp+=(i?'L':'M')+f1(xx)+' '+f1(yy)}
    s+=`<path d="${dp}" style="fill:none;stroke:${hl('dna')?'var(--rx)':'var(--nuc)'};stroke-width:${hl('dna')?3.4:2};opacity:${hl('dna')?1:.6}"/>`;
    /* RNA polymerase on the DNA */
    const rp=[cx+iw*.08,cy-ih*.08];s+=`<ellipse cx="${f1(rp[0])}" cy="${f1(rp[1])}" rx="${f1(iw*.07)}" ry="${f1(ih*.11)}" style="fill:${hl('rnap')?'var(--dR)':'var(--panel-2)'};stroke:${hl('rnap')?'var(--rx)':'var(--muted)'};stroke-width:${hl('rnap')?3:1}"/>`;
    /* ribosomes */
    const rr=rng(5);for(let i=0;i<9;i++){const a=rr(),b2=rr();const px=cx-iw*.38+a*iw*.76,py=cy+ih*.18+b2*ih*.14;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${hl('ribo')?4.2:3.2}" style="fill:${hl('ribo')?'var(--dNew)':'var(--muted)'};opacity:${hl('ribo')?.9:.45}"/>`}
    /* ATP synthase in the membrane, bottom */
    const ax=cx-iw*.22,ay=B.y+B.h-off+3;
    s+=`<rect x="${f1(ax-7)}" y="${f1(ay-14)}" width="14" height="16" rx="3" style="fill:${hl('atp')?'var(--dNew)':'var(--accent)'};stroke:${hl('atp')?'var(--rx)':'none'};stroke-width:2.5"/><circle cx="${f1(ax)}" cy="${f1(ay-22)}" r="9" style="fill:${hl('atp')?'var(--dNew)':'var(--accent)'};stroke:${hl('atp')?'var(--rx)':'none'};stroke-width:2.5"/>`;
    /* KatG and InhA for isoniazid */
    if(sel==='H'){const kx=cx-iw*.3,ky=cy-ih*.3,ix2=cx-iw*.05,iy2=B.y+off+6;
      s+=`<circle cx="${f1(kx)}" cy="${f1(ky)}" r="8" style="fill:var(--dH)"/><text x="${f1(kx)}" y="${f1(ky+20)}" class="t-xs t-mid" style="fill:var(--ink)">KatG</text>`;
      s+=`<rect x="${f1(ix2-9)}" y="${f1(iy2)}" width="18" height="11" rx="3" style="fill:var(--dH)"/><text x="${f1(ix2+14)}" y="${f1(iy2+10)}" class="t-xs" style="fill:var(--ink)">InhA</text>`;
      s+=`<path d="M${f1(kx+8)} ${f1(ky-4)}Q${f1((kx+ix2)/2)} ${f1(ky-20)} ${f1(ix2-6)} ${f1(iy2+14)}" class="arrow" marker-end="url(#drAr2)"/>`}
    if(sel==='Z'){const rr2=rng(9);for(let i=0;i<14;i++)s+=`<circle cx="${f1(cx-iw*.4+rr2()*iw*.8)}" cy="${f1(cy-ih*.36+rr2()*ih*.2)}" r="2.6" style="fill:var(--dZ)"/>`;
      s+=`<text x="${f1(cx-iw*.38)}" y="${f1(cy-ih*.38)}" class="t-xs" style="fill:var(--ink)">pyrazinoic acid builds up</text>`}
    if(sel==='Pa')s+=`<text x="${f1(cx+iw*.05)}" y="${f1(cy+ih*.42)}" class="t-xs t-mid" style="fill:var(--ink)">NO released</text>`;
    /* numbered labels */
    const tags=[{k:'myc',n:'Mycolic acids',p:[B.x+8,B.y+B.h*.5]},{k:'ara',n:'Arabinogalactan',p:[B.x+24,B.y+B.h*.32]},{k:'pg',n:'Peptidoglycan',p:[B.x+36,B.y+B.h*.68]},{k:'mem',n:'Membrane + ATP synthase',p:[ax+14,ay-22]},{k:'dna',n:'DNA (gyrase acts here)',p:[cx-iw*.32,cy+ih*.08]},{k:'rnap',n:'RNA polymerase',p:[rp[0]+iw*.08,rp[1]-ih*.1]},{k:'ribo',n:'Ribosomes (protein synthesis)',p:[cx+iw*.38,cy+ih*.3]}];
    tags.forEach((g,i)=>{const H=hl(g.k)||(g.k==='mem'&&hl('atp'));s+=`<circle cx="${f1(g.p[0])}" cy="${f1(g.p[1])}" r="8" style="fill:${H?'var(--rx)':'var(--panel)'};stroke:var(--ink);stroke-width:.8"/><text x="${f1(g.p[0])}" y="${f1(g.p[1]+3.5)}" class="t-xs t-mid" style="fill:${H?'#fff':'var(--ink)'};font-weight:700">${i+1}</text>`});
    const LX=N?24:456,LY=N?340:40,dy=N?20:21;
    s+=`<text x="${LX}" y="${LY}" class="t-sm" style="fill:${m.c};font-weight:700">${m.n.toUpperCase()}</text>`;
    tags.forEach((g,i)=>{const H=hl(g.k)||(g.k==='mem'&&hl('atp'));s+=`<text x="${LX}" y="${LY+22+i*dy}" class="${N?'t-sm':'t-xs'}" style="fill:${H?'var(--rx)':'var(--muted)'};font-weight:${H?700:500}">${i+1}  ${g.n}</text>`});
    const msg=m.tg==='none'?'target not drawn (see note)':m.bk;
    const words=msg.split(' ');let line='',lines=[];words.forEach(w=>{if((line+' '+w).length>(N?52:42)){lines.push(line);line=w}else line=(line?line+' ':'')+w});lines.push(line);
    lines.forEach((l,i)=>s+=`<text x="${LX}" y="${LY+22+tags.length*dy+12+i*15}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    ms.innerHTML=`<defs>${marker('drAr2','var(--dH)')}</defs>`+s;
    $('#drMechNote').innerHTML=`<p>${m.txt}</p>`;
  }
  const fl=$('#drFlip');
  fl.innerHTML=DR_MX.map(m=>`<button data-drm="${m.id}" aria-pressed="false"><span class="lt" style="background:${m.c}">${m.lt}</span><b>${m.n}</b><small class="fr">${m.cl} · tap to flip</small><span class="bk">${m.bk}</span></button>`).join('');
  fl.addEventListener('click',e=>{const b=e.target.closest('[data-drm]');if(!b)return;const was=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',!was);sel=b.dataset.drm;drawM()});
  drawM();
  redraws.drugs=(()=>{const p=redraws.drugs;return()=>{p&&p();drawM()}})();
};
/* =============== 3.2 Treating TB disease =============== */
const RG_DC={H:'var(--dH)',R:'var(--dR)',Z:'var(--dZ)',E:'var(--dE)',P:'var(--dR)',M:'var(--dNew)'};
const RG_REG={
 std:{n:'6 months · 2HRZE/4HR',W:26,conv:{k:-Math.log(1-.634)/8,a:63.4,lbl:'63.4% at 8 wk'},
  ph:[{n:'Intensive',w:8,d:['H','R','Z','E'],c:'var(--rx)'},{n:'Continuation',w:18,d:['H','R'],c:'var(--accent)'}]},
 hpzm:{n:'4 months · 2HPMZ/2HPM',W:17,conv:{k:-Math.log(1-.785)/8,a:78.5,lbl:'78.5% at 8 wk'},
  ph:[{n:'Intensive',w:8,d:['H','P','M','Z'],c:'var(--rx)'},{n:'Continuation',w:9,d:['H','P','M'],c:'var(--accent)'}]},
 shine:{n:'4 months · 2HRZ(E)/2HR',W:16,conv:null,
  ph:[{n:'Intensive',w:8,d:['H','R','Z','E'],c:'var(--rx)',opt:'E'},{n:'Continuation',w:8,d:['H','R'],c:'var(--accent)'}]}
};
const RG_ST={
 std:[
  {from:0,at:.3/26,k:'Week 0',t:'Starting treatment',
   txt:`WHO recommends that new patients with pulmonary TB receive a regimen with 6 months of rifampicin, 2HRZE/4HR (strong recommendation, high certainty), given daily. It also applies to most extrapulmonary TB. ATS/CDC/IDSA recommends starting empiric multidrug treatment in almost all situations where active TB is suspected. People with HIV should start antiretroviral therapy as soon as possible, within 2 weeks of starting TB treatment, whatever the CD4 count. <sup class="c" data-ref="WHO-Mod4-2025,Nahid2016" title="Source 338,515">338,515</sup>`,
   pt:`Treatment starts with four medicines every day, often combined into a few tablets. In most countries it is free through the national TB programme.`,
   hook:`2HRZE/4HR: numbers are months, letters are drugs. 2 months of H, R, Z and E, then 4 months of H and R. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`},
  {from:1/26,at:4/26,k:'Weeks 1–8',t:'Intensive phase: four drugs',
   txt:`The intensive phase kills most bacilli and protects against resistance while the bacterial load is high (see <a href="#drugs" data-go="drugs">How TB drugs work</a>). Daily dosing matters: WHO advises against thrice-weekly dosing, and in Union Study A, 85% of people were culture-negative at 2 months with daily dosing against 77% with a thrice-weekly intensive phase. <sup class="c" data-ref="WHO-Mod4-2025,Jindani2004" title="Source 254,515">254,515</sup>`,
   pt:`Most people start to feel better within a few weeks. That is the medicine working, not a sign that it can stop.`,
   hook:`WHO: daily dosing throughout (strong, high certainty). Thrice-weekly throughout carried 3.3 times the acquired-resistance rate. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`},
  {from:7.5/26,at:8.2/26,k:'Week 8',t:'The two-month check',
   txt:`Sputum is checked again around the end of the intensive phase. On the 6-month control in Study 31, 63.4% had a negative liquid culture by 8 weeks; on solid media with daily dosing in Union Study A, 85% did at 2 months. A positive 2-month culture predicts relapse poorly: pooled sensitivity 40%, specificity 85%. WHO recommends against extending the intensive phase when the smear is still positive at its end (strong, high certainty). <sup class="c" data-ref="Dorman2021,Jindani2004,Horne2010,WHO-Mod4-2025" title="Source 141,236,254,515">141,236,254,515</sup>`,
   pt:`A sputum test at about two months shows whether the germs are clearing. A positive result is a reason to look closer, not proof that treatment is failing.`,
   hook:`2-month culture: specific but insensitive for relapse (sensitivity 40%, specificity 85%). <sup class="c" data-ref="Horne2010" title="Source 236">236</sup>`},
  {from:9/26,at:17/26,k:'Weeks 9–26',t:'Continuation: isoniazid and rifampicin',
   txt:`Pyrazinamide and ethambutol stop. Isoniazid and rifampicin continue for 4 months to kill the slow persisters. Across 57 trials (21,472 people), using rifampicin only for the first 1 to 2 months meant more failure, relapse and acquired resistance. Relapse with fully susceptible TB was 8.2% after 2-month rifampicin regimens and 3.1% after 6-month ones. In Union Study A, 2EHRZ/6HE (no rifampicin after month 2) had 10% unfavourable outcomes against 5% with 2EHRZ/4HR. <sup class="c" data-ref="Menzies2009,WHO-Mod4-2025,Jindani2004" title="Source 254,320,515">254,320,515</sup>`,
   pt:`Feeling well is not the same as being cured. The last months clear the germs that are still hiding; stopping early can bring TB back.`,
   hook:`Rifampicin for the full 6 months: about 112 relapses averted per 1,000 people treated. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`},
  {from:25.6/26,at:1,k:'Week 26',t:'Treatment completed',
   txt:`Worldwide, treatment success for drug-susceptible TB on first-line regimens was 88% in the 2023 cohort, up from 81% in 2016. In Union Study A, 5% of people on 2EHRZ/4HR had an unfavourable outcome 12 months after treatment ended. These are population figures, not a prediction for any one person. <sup class="c" data-ref="WHO-GTR2025,Jindani2004" title="Source 254,510">254,510</sup>`,
   pt:`About 9 in 10 people treated for TB finish treatment successfully. Finishing the full course is what cures it.`,
   hook:`Global treatment success: 88% for drug-susceptible TB, 71% for MDR/RR-TB. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`}],
 hpzm:[
  {from:0,at:.3/17,k:'Week 0',t:'Who can take 4 months',
   txt:`WHO recommendation 2.1: people aged 12 years or older with drug-susceptible pulmonary TB may receive 2HPMZ/2HPM (conditional, moderate certainty), and ATS/CDC/ERS/IDSA adopted it in 2025. Not covered, because Study 31 did not include them: people under 40 kg; TB meningitis, disseminated, osteoarticular or abdominal TB; HIV with CD4 below 100 cells/mm³; children under 12; and pregnant, breastfeeding or postpartum women. Fluoroquinolone susceptibility testing should come first. A baseline ECG is not required unless clinically indicated. <sup class="c" data-ref="WHO-Mod4-2025,Saukkonen2025" title="Source 413,515">413,515</sup>`,
   pt:`Some people aged 12 and over can take a 4-month treatment instead of 6. The team first checks that the germ is not resistant to moxifloxacin.`,
   hook:`2HPMZ/2HPM: age ≥12, weight ≥40 kg; not for CD4 &lt;100, pregnancy, or meningitis, bone or disseminated TB. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`},
  {from:1/17,at:4/17,k:'Weeks 1–8',t:'Intensive phase: H, P, M and Z',
   txt:`As tabulated by ATS/CDC/ERS/IDSA for adults: isoniazid 300 mg, rifapentine 1,200 mg and moxifloxacin 400 mg daily for 17 weeks, and pyrazinamide daily for 8 weeks by weight (1,000 mg at 40 to &lt;55 kg, 1,500 mg at ≥55 to 75 kg, 2,000 mg above 75 kg), 7 days a week with food, avoiding milk, antacids and other cations. Pyridoxine 25 to 50 mg/day is listed with isoniazid. WHO explains the flat 1,200 mg rifapentine dose: weight does not significantly change its clearance, and food raises absorption. <sup class="c" data-ref="Saukkonen2025,WHO-Mod4-2025" title="Source 413,515">413,515</sup>`,
   pt:`Rifapentine is a long-acting cousin of rifampicin and is taken with food. Rifampicin and rifapentine are different medicines and are not swapped for each other.`,
   hook:`Rifapentine with food; rifampin on an empty stomach. Rifapentine half-life 13.19 h, rifampin 3.35 h. <sup class="c" data-ref="FDA-Priftin,FDA-Rifampin" title="Source 165,168">165,168</sup>`},
  {from:7.5/17,at:8.2/17,k:'Week 8',t:'Faster culture conversion',
   txt:`By 8 weeks, liquid cultures were negative in 78.5% on rifapentine-moxifloxacin, 74.2% on rifapentine without moxifloxacin and 63.4% on the 6-month control. Faster conversion did not guarantee cure: both rifapentine arms converted faster, but only the one with moxifloxacin was non-inferior. In REMoxTB, moxifloxacin regimens also cut bacterial load faster yet failed non-inferiority at 4 months. <sup class="c" data-ref="Dorman2021,Gillespie2014" title="Source 141,200">141,200</sup>`,
   pt:`The germs disappeared from sputum faster with this treatment. But a quick early result is not enough on its own: what counts is whether TB stays away.`,
   hook:`Culture conversion is a surrogate. Study 31's rifapentine-only arm converted faster but was not non-inferior. <sup class="c" data-ref="Dorman2021" title="Source 141">141</sup>`},
  {from:9/17,at:13/17,k:'Weeks 9–17',t:'Continuation: H, P and M',
   txt:`Pyrazinamide stops at week 8; isoniazid, rifapentine and moxifloxacin continue for 9 more weeks. Grade 3 or higher adverse events were similar: 18.8% against 19.3% on control. Grade 3 or higher bilirubin rises were more frequent (3.3% vs 1.0%), while cases meeting Hy's law were spread evenly. About 90% of the medicine cost is rifapentine, and with no fixed-dose combination the daily pill count is higher than with the 6-month regimen. <sup class="c" data-ref="Dorman2021,WHO-Mod4-2025" title="Source 141,515">141,515</sup>`,
   pt:`Shorter treatment means more tablets each day and a more expensive medicine, which is one reason it is not yet used everywhere.`,
   hook:`WHO's recommendation is conditional because of cost, pill burden, the need for fluoroquinolone testing and untested groups. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`},
  {from:16.6/17,at:1,k:'Week 17',t:'Treatment completed: 9 weeks sooner',
   txt:`Study 31 randomised 2,516 people in 13 countries. Unfavourable outcomes were 15.5% with rifapentine-moxifloxacin against 14.6% with the 6-month control: a difference of 1.0 point (95% CI −2.6 to 4.5), inside the 6.6-point non-inferiority margin. WHO's review found cure in 84.5% against 85.4% (RR 0.99). The trial used in-person DOT at least 5 days a week. <sup class="c" data-ref="Dorman2021,WHO-Mod4-2025" title="Source 141,515">141,515</sup>`,
   pt:`For people who can take it, the 4-month treatment worked about as well as the 6-month one.`,
   hook:`Study 31: 15.5% vs 14.6% unfavourable; margin 6.6 points. Non-inferior. <sup class="c" data-ref="Dorman2021" title="Source 141">141</sup>`}],
 shine:[
  {from:0,at:.3/16,k:'Week 0',t:'Non-severe TB in children',
   txt:`WHO recommendation 2.2: children and adolescents aged 3 months to 16 years with non-severe TB, without suspected or confirmed drug resistance, should receive 2HRZ(E)/2HR (strong, moderate certainty); ATS/CDC/ERS/IDSA made the same strong recommendation. Non-severe means peripheral lymph node TB, intrathoracic lymph node TB without airway obstruction, uncomplicated pleural effusion, or paucibacillary non-cavitary disease confined to one lobe without a miliary pattern. Other children receive 2HRZE/4HR or the regimens for severe extrapulmonary TB. <sup class="c" data-ref="WHO-Mod4-2025,Saukkonen2025" title="Source 413,515">413,515</sup>`,
   pt:`Many children with mild TB need only 4 months of treatment instead of 6.`,
   hook:`SHINE regimen: 3 months to 16 years, non-severe TB only. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`},
  {from:1/16,at:4/16,k:'Weeks 1–8',t:'Intensive phase: H, R, Z (± E)',
   txt:`As tabulated by ATS/CDC/ERS/IDSA for children: isoniazid 10 to 15 mg/kg and rifampin 10 to 20 mg/kg for 16 weeks, with pyrazinamide 35 (30 to 40) mg/kg and ethambutol 20 (15 to 25) mg/kg for the first 8 weeks, ethambutol included or not according to local guidelines. WHO recommends it in settings with high HIV prevalence or high isoniazid resistance. The US ethambutol label does not recommend it under 13 years; WHO and ATS/CDC/ERS/IDSA dose it for children. <sup class="c" data-ref="Saukkonen2025,WHO-Mod4-2025,FDA-Ethambutol" title="Source 159,413,515">159,413,515</sup>`,
   pt:`Children take child-friendly combined tablets, dosed by weight.`,
   hook:`Ethambutol in young children: label says not under 13; guidelines include it where HIV or isoniazid resistance is common. <sup class="c" data-ref="FDA-Ethambutol,WHO-Mod4-2025" title="Source 159,515">159,515</sup>`},
  {from:7.5/16,at:8.2/16,k:'Week 8',t:'Most side effects come early',
   txt:`In SHINE, 95 children (8%) had a grade 3 or higher adverse event, including 15 adverse drug reactions, 11 of them affecting the liver. All but 2 of the liver events happened in the first 8 weeks, when both groups were on the same treatment. <sup class="c" data-ref="Turkova2022" title="Source 477">477</sup>`,
   pt:`If a medicine upsets a child's liver, it is usually in the first two months. Yellow eyes, dark urine or tummy pain should be reported straight away.`,
   hook:`SHINE: 11 of 15 adverse drug reactions were hepatic, almost all in the first 8 weeks. <sup class="c" data-ref="Turkova2022" title="Source 477">477</sup>`},
  {from:9/16,at:12/16,k:'Weeks 9–16',t:'Continuation: H and R',
   txt:`SHINE randomised 1,204 children under 16 (median age 3.5 years; 11% with HIV) in African countries and India to 16 or 24 weeks of standard first-line treatment, using WHO paediatric fixed-dose combinations. The 4-month group stops here, at 16 weeks. <sup class="c" data-ref="Turkova2022" title="Source 477">477</sup>`,
   pt:`Two more months of two medicines, then the course is complete.`,
   hook:`SHINE: 16 vs 24 weeks, 1,204 children, median age 3.5 years. <sup class="c" data-ref="Turkova2022" title="Source 477">477</sup>`},
  {from:15.6/16,at:1,k:'Week 16',t:'Treatment completed',
   txt:`Primary events (an unfavourable outcome) occurred in 16 children (3%) in the 4-month group and 18 (3%) in the 6-month group: an adjusted difference of −0.4 points (95% CI −2.2 to 1.5). Four months was as good as six for non-severe TB. <sup class="c" data-ref="Turkova2022" title="Source 477">477</sup>`,
   pt:`Children with mild TB did as well with 4 months as with 6.`,
   hook:`SHINE: 3% events in both arms. <sup class="c" data-ref="Turkova2022" title="Source 477">477</sup>`}]
};
const RG_SUP={
 sat:`<p><b>Self-administered treatment.</b> In a Cochrane review of 11 trials (5,662 people), cure with self-administered treatment ranged from 41% to 67%, and direct observation did not substantially improve cure (RR 1.08, 95% CI 0.91 to 1.27) or completion (RR 1.07). A broader meta-analysis of 129 studies, including cohort studies, linked self-administration with lower treatment success (randomised trials: RR 0.94) and, in cohort studies, with more acquired drug resistance (RR 4.19). <sup class="c" data-ref="Karumbi2015,Alipanah2018" title="Source 7,261">7,261</sup></p><p class="stage-cap">Status: unresolved. Practice is moving toward person-centred support chosen with the person.</p>`,
 dot:`<p><b>Directly observed treatment (DOT).</b> ATS/CDC/ERS/IDSA says DOT and integrated case management remain the standard of care, and Study 31 used in-person DOT at least 5 of 7 days a week. WHO conditionally recommends community- or home-based treatment support over facility-based or unsupported treatment. <sup class="c" data-ref="Saukkonen2025,Dorman2021,WHO-Mod4-2025" title="Source 141,413,515">141,413,515</sup></p><p class="stage-cap">A health worker may watch the doses being taken. This is support, not suspicion.</p>`,
 vot:`<p><b>Video-observed treatment (VOT).</b> In an English trial of 226 people (58% with a history of homelessness, prison, drug or alcohol use or mental illness), 70% on smartphone VOT completed at least 80% of scheduled observations in the first 2 months, against 31% on DOT (adjusted OR 5.48). WHO says video-supported treatment can replace in-person support when the technology can be run well. <sup class="c" data-ref="Story2019,WHO-Mod4-2025" title="Source 446,515">446,515</sup></p><p class="stage-cap">Doses are recorded on a phone at a time that suits the person, without a daily trip to a clinic.</p>`
};
const RG_TR={
 s31:{t:'Study 31 / A5349',sub:'2,516 randomised in 13 countries; microbiologically eligible population',ci:'95% CI',mg:6.6,mx:25,
  arms:[{n:'6-month control (2HRZE/4HR)',v:14.6},{n:'4-month rifapentine + moxifloxacin',v:15.5,d:1.0,lo:-2.6,hi:4.5},{n:'4-month rifapentine, no moxifloxacin',v:17.7,d:3.0,lo:-.6,hi:6.6}],
  note:{k:'Dorman 2021, NEJM',t:'Non-inferior with moxifloxacin',txt:`Unfavourable outcomes were 15.5% with rifapentine-moxifloxacin against 14.6% with control: 1.0 point (95% CI −2.6 to 4.5), entirely below the 6.6-point margin. Without moxifloxacin, 17.7%: 3.0 points (−0.6 to 6.6), with the upper limit touching the margin, so non-inferiority was not shown. Grade 3 or higher adverse events were 18.8%, 19.3% and 14.3%. <sup class="c" data-ref="Dorman2021" title="Source 141">141</sup>`,
   pt:`Adding moxifloxacin made the difference between a 4-month treatment that worked as well as 6 months and one that did not.`,hook:`Non-inferiority needs the <b>upper</b> limit of the CI below the margin. <sup class="c" data-ref="Dorman2021" title="Source 141">141</sup>`}},
 shine:{t:'SHINE',sub:'1,204 children under 16 with non-severe TB',ci:'95% CI',mg:null,mx:25,
  arms:[{n:'6 months (24 weeks)',v:18/6.02,l:'18 children (3%)'},{n:'4 months (16 weeks)',v:16/6.02,l:'16 children (3%)',d:-.4,lo:-2.2,hi:1.5}],
  note:{k:'Turkova 2022, NEJM',t:'Four months for mild TB in children',txt:`Primary events: 16 children (3%) with 4 months and 18 (3%) with 6 months, an adjusted difference of −0.4 points (95% CI −2.2 to 1.5). The trial used WHO paediatric fixed-dose combinations; median age was 3.5 years and 11% had HIV. The margin is not drawn because the sources used for this guide do not quote it. <sup class="c" data-ref="Turkova2022" title="Source 477">477</sup>`,
   pt:`In children with mild TB, the shorter course gave the same results.`,hook:`SHINE: 2HRZ(E)/2HR, WHO strong recommendation for 3 months to 16 years. <sup class="c" data-ref="WHO-Mod4-2025,Turkova2022" title="Source 477,515">477,515</sup>`}},
 trunc:{t:'TRUNCATE-TB',sub:'674 participants; a strategy of 8 weeks first, then extend or retreat as needed',ci:'97.5% CI',mg:12,mx:25,
  arms:[{n:'Standard 24 weeks',v:3.9,l:'3.9% · mean 180 days'},{n:'Bedaquiline-linezolid strategy',v:5.8,l:'5.8% · mean 85 days',d:.8,lo:-3.4,hi:5.1},{n:'High-dose rifampin-linezolid strategy',v:11.4,l:'11.4% · mean 106 days',d:7.4,lo:1.7,hi:13.2}],
  note:{k:'Paton 2023, NEJM',t:'Shorter on average, more retreatment',txt:`Primary events (death, ongoing treatment or active disease at week 96) were 3.9% with standard treatment and 5.8% with the bedaquiline-linezolid strategy, which met non-inferiority (0.8 points, 97.5% CI −3.4 to 5.1; margin 12). The rifampin-linezolid strategy did not (7.4 points, 1.7 to 13.2). Across the strategy groups, 17.0% needed retreatment, against 3.3% with standard treatment. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Paton2023" title="Source 368">368</sup>`,
   pt:`Most people did well with about 3 months, but some needed a second course. It is a research strategy, not a standard regimen.`,hook:`TRUNCATE-TB tests a strategy, not a fixed regimen; not in WHO Module 4 (2025). <sup class="c" data-ref="Paton2023" title="Source 368">368</sup>`}},
 fail:{t:'Earlier 4-month trials',sub:'REMoxTB, OFLOTUB and RIFAQUIN: per-protocol or primary results',ci:'95% CI',mg:null,mx:25,
  arms:[{n:'REMoxTB · control',v:8},{n:'REMoxTB · moxifloxacin for ethambutol',v:15},{n:'REMoxTB · moxifloxacin for isoniazid',v:20},{n:'OFLOTUB · control',v:17.2},{n:'OFLOTUB · 4-month gatifloxacin',v:21.0,d:3.5,lo:-.7,hi:7.7},{n:'RIFAQUIN · control',v:4.9},{n:'RIFAQUIN · 4-month moxifloxacin + rifapentine',v:18.2}],
  note:{k:'The background to Study 31',t:'Why 4 months took so long',txt:`REMoxTB (1,931 people): favourable outcomes were 85% and 80% in the moxifloxacin arms against 92% with control, so the bars show 15%, 20% and 8% unfavourable; non-inferiority was not shown. OFLOTUB (1,836): 21.0% vs 17.2% unfavourable, with recurrence 14.6% vs 7.1%. RIFAQUIN (827): 18.2% vs 4.9%, although a 6-month weekly rifapentine-moxifloxacin arm was non-inferior at 3.2%. <sup class="c" data-ref="Gillespie2014,Merle2014,Jindani2014" title="Source 200,255,323">200,255,323</sup>`,
   pt:`Several earlier attempts to shorten treatment to 4 months failed before Study 31 succeeded.`,hook:`REMoxTB: moxifloxacin sped up bacterial kill but did not allow 4 months. Moxifloxacin reaches caseum poorly. <sup class="c" data-ref="Gillespie2014,Prideaux2015" title="Source 200,379">200,379</sup>`}}
};

inits.regimen=()=>{
  const svg=$('#rgSvg'),rg=$('#rgT');let reg='std',sup='dot',setSt=()=>{};
  function phone(x,y,s){return `<rect x="${f1(x-s*.3)}" y="${f1(y-s*.5)}" width="${f1(s*.6)}" height="${f1(s)}" rx="${f1(s*.08)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/><rect x="${f1(x-s*.24)}" y="${f1(y-s*.4)}" width="${f1(s*.48)}" height="${f1(s*.7)}" style="fill:var(--accent-soft)"/><circle cx="${f1(x)}" cy="${f1(y-s*.08)}" r="${f1(s*.1)}" style="fill:var(--accent)"/>`}
  function draw(t){
    const N=vb(svg,'720 410','400 386');const R=RG_REG[reg],W=R.W,w=t*W;let s='';
    const L=N?{x0:36,P:13.4,ty:18,by:28,cy:58,Y:186,ax:198,c0:216,c1:356,ry:388}:{x0:60,P:16.4,ty:22,by:32,cy:64,Y:204,ax:218,c0:236,c1:388,ry:0};
    const X=wk=>L.x0+wk*L.P;
    s+=`<text x="${L.x0}" y="${L.ty}" class="t-big">${R.n}</text>`;
    /* ghost of the 6-month length, for comparison */
    if(reg!=='std')s+=`<rect x="${f1(X(W))}" y="${L.by}" width="${f1(X(26)-X(W))}" height="${f1(L.Y-L.by+4)}" rx="6" style="fill:none;stroke:var(--line);stroke-dasharray:4 4"/><text x="${f1((X(W)+X(26))/2)}" y="${f1(L.Y-50)}" class="t-xs t-mid">${N?'':'6-month '}standard</text><text x="${f1((X(W)+X(26))/2)}" y="${f1(L.Y-38)}" class="t-xs t-mid">ends wk 26</text>`;
    let w0=0;R.ph.forEach((p,pi)=>{const xa=X(w0),xb=X(w0+p.w),act=w>=w0&&w<w0+p.w;
      s+=`<rect x="${f1(xa)}" y="${L.by}" width="${f1(xb-xa-2)}" height="14" rx="4" style="fill:${p.c};opacity:${act||w>=W?1:.45}"/><text x="${f1(xa+6)}" y="${L.by+10.5}" class="t-xs" style="fill:#fff;font-weight:700">${(p.n+' · '+p.w+' wk').toUpperCase()}</text>`;
      p.d.forEach((d,i)=>{s+=pill(xa+11+i*(N?19:22),L.cy-4,N?16:19,RG_DC[d],{label:d,op:(p.opt===d?.55:1)*(act?1:.5)})});
      if(p.opt)s+=`<text x="${f1(xa+11+p.d.length*(N?19:22))}" y="${L.cy}" class="t-xs">(E: local policy)</text>`;
      const taken=clamp(Math.floor((w-w0)*7+1e-6),0,p.w*7),s2=L.P/1.28;
      s+=`<g transform="translate(${f1(xa+2)} ${L.Y}) rotate(-90)">${blister(0,0,7,p.w,taken,{s:s2,col:p.c})}</g>`;
      w0+=p.w});
    s+=`<text x="${L.x0-6}" y="${L.Y-4}" class="t-xs t-end">Mon</text><text x="${L.x0-6}" y="${f1(L.Y-6.5*L.P)}" class="t-xs t-end">Sun</text>`;
    for(let k=0;k<=26;k+=2){if(k>W&&k!==26)continue;s+=`<text x="${f1(X(k))}" y="${L.ax}" class="t-xs t-mid" style="${k>W?'opacity:.5':''}">${k}</text>`}
    s+=`<text x="${f1(X(26))}" y="${L.ax+12}" class="t-xs t-end">weeks</text>`;
    /* chart */
    const V=v=>lerp(L.c1,L.c0,v/100);
    [0,50,100].forEach(v=>s+=`<line x1="${L.x0}" x2="${f1(X(26))}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
    const sym=u=>100*Math.exp(-u/3.2)*(u<W?1:0)+(u<W?0:0);
    const pth=(f,end)=>{let p='';const n=Math.max(2,Math.round(end*4));for(let i=0;i<=n;i++){const u=end*i/n;p+=(i?'L':'M')+f1(X(u))+' '+f1(V(f(u)))}return p};
    s+=`<path d="${pth(u=>100*Math.exp(-u/3.2),Math.min(w,W))}" style="fill:none;stroke:var(--brand);stroke-width:2.4"/>`;
    if(R.conv){const cf=u=>100*(1-Math.exp(-R.conv.k*u));s+=`<path d="${pth(cf,Math.min(w,W))}" style="fill:none;stroke:var(--rx);stroke-width:2.8"/>`;
      if(w>=8)s+=`<circle cx="${f1(X(8))}" cy="${f1(V(R.conv.a))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(8)+9)}" y="${f1(V(R.conv.a)+12)}" class="t-xs" style="fill:var(--ink)">${R.conv.lbl}</text>`;
      if(reg==='hpzm'&&w>=8){const k0=-Math.log(1-.634)/8;s+=`<path d="${pth(u=>100*(1-Math.exp(-k0*u)),Math.min(w,W))}" style="fill:none;stroke:var(--rx);stroke-width:1.2;stroke-dasharray:3 3;opacity:.7"/><circle cx="${f1(X(8))}" cy="${f1(V(63.4))}" r="4" style="fill:none;stroke:var(--muted);stroke-width:1.2"/><text x="${f1(X(8)+9)}" y="${f1(V(63.4)+12)}" class="t-xs">control 63.4%</text>`}}
    else s+=`<text x="${f1(X(1))}" y="${f1(V(72))}" class="t-xs">${N?'few bacilli: no culture curve':'paucibacillary disease: no culture curve drawn'}</text>`;
    s+=`<line x1="${f1(X(Math.min(w,W)))}" x2="${f1(X(Math.min(w,W)))}" y1="${L.by}" y2="${L.c1}" style="stroke:var(--ink);opacity:.3"/>`;
    /* legend */
    const lgy=N?L.c1+16:L.c1+18;
    s+=`<line x1="${L.x0}" x2="${L.x0+16}" y1="${lgy-3}" y2="${lgy-3}" style="stroke:var(--brand);stroke-width:2.4"/><text x="${L.x0+22}" y="${lgy}" class="t-xs">symptoms (schematic)</text>`;
    s+=`<line x1="${L.x0+(N?160:170)}" x2="${L.x0+(N?176:186)}" y1="${lgy-3}" y2="${lgy-3}" style="stroke:var(--rx);stroke-width:2.8"/><text x="${L.x0+(N?182:192)}" y="${lgy}" class="t-xs">culture-negative (Study 31)</text>`;
    /* side panel: progress, support */
    const done=w>=W-.001,days=Math.min(W*7,Math.floor(w*7+1e-6));
    const PX=N?18:500,PY=N?L.ry+8:250;
    if(!N){s+=`<rect x="${PX}" y="${L.by}" width="208" height="${L.Y-L.by+4}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<text x="${PX+14}" y="${L.by+24}" class="t-sm">WEEK</text><text x="${PX+14}" y="${L.by+58}" style="font:800 34px var(--display);fill:var(--ink)">${Math.min(W,Math.floor(w)+(done?0:1))}<tspan class="t-sm" dx="6">of ${W}</tspan></text>`;
      s+=`<text x="${PX+14}" y="${L.by+84}" class="t-sm">daily doses taken: <tspan style="fill:var(--ink);font-weight:700">${days}</tspan> / ${W*7}</text>`;
      if(R.conv)s+=`<text x="${PX+14}" y="${L.by+102}" class="t-sm">culture-negative: <tspan style="fill:var(--rx);font-weight:700">${Math.round(100*(1-Math.exp(-R.conv.k*Math.min(w,W))))}%</tspan></text>`;
      const sx=PX+40,sy=L.by+118;s+=person(sx,sy,40,'var(--brand)');
      if(sup==='dot')s+=person(sx+46,sy,40,'var(--rx)',{face:-1})+`<text x="${sx+23}" y="${sy+54}" class="t-xs t-mid">health worker watches</text>`;
      else if(sup==='vot')s+=phone(sx+46,sy+18,30)+`<text x="${sx+23}" y="${sy+54}" class="t-xs t-mid">dose filmed on a phone</text>`;
      else s+=pill(sx+40,sy+22,20,'var(--rx)',{ang:-30})+`<text x="${sx+23}" y="${sy+54}" class="t-xs t-mid">takes doses at home</text>`}
    if(done){const bx=N?200:X(W/2),by=N?L.Y-58:L.Y-60;
      s+=`<g transform="rotate(-6 ${f1(bx)} ${f1(by)})"><rect x="${f1(bx-(N?120:132))}" y="${f1(by-20)}" width="${N?240:264}" height="40" rx="8" style="fill:var(--panel);stroke:var(--good);stroke-width:3;opacity:.95"/><text x="${f1(bx)}" y="${f1(by+7)}" class="t-big t-mid" style="fill:var(--good)">TREATMENT COMPLETED</text></g>`}
    svg.innerHTML=s;
    const ph=phaseOf(RG_ST[reg],t);setSt(ph);$('#rgNote').innerHTML=noteHTML(RG_ST[reg][ph]);
    const cur=R.ph[w<R.ph[0].w?0:1];
    $('#rgRead').innerHTML=`<span>week <b>${f1(Math.min(w,W))}</b> of ${W}</span><span>phase <b>${done?'completed':cur.n.toLowerCase()}</b></span><span>drugs <b>${done?'none':cur.d.join(' ')}</b></span><span>doses taken <b>${days}</b> / ${W*7}</span>${N&&R.conv?`<span>culture-negative <b>${Math.round(100*(1-Math.exp(-R.conv.k*Math.min(w,W))))}%</b></span>`:''}`;
  }
  const stop=playWire(rg,$('#rgPlay'),draw,20000,'Replay','regimen');
  function wire(){const old=$('#rgSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,RG_ST[reg],rg,draw,stop)}
  $$('[data-rgr]').forEach(b=>b.addEventListener('click',()=>{stop();reg=b.dataset.rgr;$$('[data-rgr]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  const supW=()=>{$('#rgSup').innerHTML=RG_SUP[sup]};
  $$('[data-rgs]').forEach(b=>b.addEventListener('click',()=>{sup=b.dataset.rgs;$$('[data-rgs]').forEach(x=>x.setAttribute('aria-pressed',x===b));supW();draw(+rg.value)}));
  wire();supW();draw(+rg.value);

  /* ---- trial comparator ---- */
  const ts=$('#rgTrial');let tr='s31';
  function drawT(){const N=vb(ts,'720 300','400 560');const T=RG_TR[tr],n=T.arms.length;let s='';
    const B=N?{x0:16,x1:384,y0:44,y1:290}:{x0:16,x1:350,y0:44,y1:288};
    const F=N?{x0:40,x1:370,y0:338,y1:530}:{x0:400,x1:700,y0:44,y1:258};
    s+=`<text x="${B.x0}" y="18" class="t-lbl">${T.t}</text><text x="${B.x0}" y="33" class="t-xs">${T.sub}</text>`;
    const rh=Math.min(66,(B.y1-B.y0)/n),bx=v=>B.x0+(B.x1-B.x0-60)*v/T.mx;
    T.arms.forEach((a,i)=>{const y=B.y0+i*rh+12,ctl=a.d==null;
      s+=`<text x="${B.x0}" y="${f1(y)}" class="t-xs" style="fill:var(--ink)">${a.n}</text>`;
      s+=`<rect x="${B.x0}" y="${f1(y+5)}" width="${f1(bx(a.v)-B.x0)}" height="${f1(Math.min(16,rh-24))}" rx="3" style="fill:${ctl?'var(--muted)':'var(--rx)'};opacity:${ctl?.55:.9}"/>`;
      s+=`<text x="${f1(bx(a.v)+6)}" y="${f1(y+5+Math.min(16,rh-24)/2+3.5)}" class="t-xs" style="fill:var(--ink)">${a.l||f1(a.v)+'%'}</text>`});
    s+=`<text x="${B.x0}" y="${N?B.y1+8:B.y1+8}" class="t-xs">unfavourable outcome, % of arm</text>`;
    /* forest */
    const fx=v=>lerp(F.x0,F.x1,(v+5)/20);
    s+=`<text x="${F.x0}" y="${F.y0-24}" class="t-sm">DIFFERENCE vs STANDARD · ${T.ci}</text>`;
    [-5,0,5,10,15].forEach(v=>s+=`<line x1="${f1(fx(v))}" x2="${f1(fx(v))}" y1="${F.y0-6}" y2="${F.y1}" class="${v?'grid':'axis'}"/><text x="${f1(fx(v))}" y="${F.y1+14}" class="t-xs t-mid">${v>0?'+':''}${v}</text>`);
    s+=`<text x="${f1(fx(-5))}" y="${F.y1+28}" class="t-xs">← better</text><text x="${f1(fx(15))}" y="${F.y1+28}" class="t-xs t-end">worse →  percentage points</text>`;
    if(T.mg!=null)s+=`<line x1="${f1(fx(T.mg))}" x2="${f1(fx(T.mg))}" y1="${F.y0-10}" y2="${F.y1}" style="stroke:var(--bad);stroke-width:1.8;stroke-dasharray:6 4"/><text x="${f1(fx(T.mg)+4)}" y="${F.y0-12}" class="t-xs" style="fill:var(--bad)">margin +${T.mg}</text>`;
    else s+=`<text x="${f1(F.x1)}" y="${F.y0-12}" class="t-xs t-end">margin not quoted in sources</text>`;
    const cmp=T.arms.filter(a=>a.d!=null),fr=(F.y1-F.y0)/Math.max(2,cmp.length);
    cmp.forEach((a,i)=>{const y=F.y0+fr*(i+.5),ok=T.mg!=null?a.hi<T.mg:null,col=ok===null?'var(--accent)':ok?'var(--good)':'var(--bad)';
      s+=`<line x1="${f1(fx(a.lo))}" x2="${f1(fx(a.hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${col};stroke-width:3;stroke-linecap:round"/><rect x="${f1(fx(a.d)-5)}" y="${f1(y-5)}" width="10" height="10" style="fill:${col}"/>`;
      s+=`<text x="${f1(F.x0)}" y="${f1(y-12)}" class="t-xs" style="fill:var(--ink)">${a.n}</text><text x="${f1(fx(a.hi)+8)}" y="${f1(y+4)}" class="t-xs" style="fill:${col}">${a.d>0?'+':''}${a.d} (${a.lo} to ${a.hi})</text>`;
      if(ok!==null)s+=`<text x="${f1(F.x0)}" y="${f1(y+18)}" class="t-xs" style="fill:${col};font-weight:700">${ok?'NON-INFERIOR':'NOT SHOWN'}</text>`});
    if(!cmp.length)s+=`<text x="${f1((F.x0+F.x1)/2)}" y="${f1((F.y0+F.y1)/2)}" class="t-xs t-mid">no difference with CI quoted</text>`;
    ts.innerHTML=s;
    $('#rgTrialNote').innerHTML=noteHTML(T.note);
    $('#rgTrialCap').innerHTML=`Outcome definitions and populations differ between trials, so compare arms within a trial, not across trials. Population statistics, not predictions for one person.`;
  }
  $$('[data-rgt]').forEach(b=>b.addEventListener('click',()=>{tr=b.dataset.rgt;$$('[data-rgt]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawT()}));
  drawT();
  redraws.regimen=(()=>{const p=redraws.regimen;return()=>{p&&p();drawT()}})();
};
/* =============== 3.3 Treating TB infection =============== */
/* the six regimens on one calendar. wk = length in weeks; doses as NTCA/CDC 2020 publishes them
   (9H and 3HR are worked out from months, so they carry approx). dr = drug strips, top to bottom. */
const TP_REG=[
 {id:'9H',s2:'isoniazid daily',sub:'isoniazid daily, 9 mo',wk:39,doses:270,approx:1,daily:1,dr:['--dH']},
 {id:'6H',s2:'isoniazid daily',sub:'isoniazid daily, 6 mo',wk:180/7,doses:180,daily:1,dr:['--dH']},
 {id:'4R',s2:'rifampicin daily',sub:'rifampicin daily, 4 mo',wk:120/7,doses:120,daily:1,dr:['--dR']},
 {id:'3HR',s2:'H + R daily',sub:'isoniazid + rifampicin, 3 mo',wk:13,doses:91,approx:1,daily:1,dr:['--dH','--dR']},
 {id:'3HP',s2:'H + P weekly',sub:'isoniazid + rifapentine weekly',wk:12,doses:12,daily:0,dr:['--dH','--dR']},
 {id:'1HP',s2:'H + P daily',sub:'isoniazid + rifapentine daily',wk:4,doses:28,daily:1,dr:['--dH','--dR']}
];
/* recommendation badges (WHO 2024 recs 19-20; NTCA/CDC 2020) */
const TP_REC={'9H':'WHO strong · CDC alt.','6H':'WHO strong · CDC alt.','4R':'WHO cond. · CDC pref.','3HR':'WHO strong · CDC pref.','3HP':'WHO strong · CDC pref.','1HP':'WHO conditional'};
/* trial outcomes per group. c = completion %, h = liver injury % (hl: what the second bar measures),
   ct/htx = text when only a difference or a different endpoint is published, src = trial, off = dimmed + why */
const TP_OUT={
 adult:{
  '9H':{c:69.0,h:2.7,hl:'liver injury',src:'PREVENT TB'},
  '6H':{h:.36,hl:'liver injury',ct:'no completion figure cited',src:'placebo trials (6 mo)'},
  '4R':{ct:'completion +15.1 pts vs 9H',htx:'liver (gr. 3–5) −1.2 pts vs 9H',src:'Menzies 2018'},
  '3HR':{ct:'no completion figure cited',htx:'',src:'—'},
  '3HP':{c:82.1,h:.4,hl:'liver injury',src:'PREVENT TB (DOT)'},
  '1HP':{c:97,h:6,hl:'serious AEs',src:'BRIEF TB (with HIV)'}},
 child:{
  '9H':{c:80.9,h:0,hl:'liver injury',src:'PREVENT TB, ages 2–17',x:'76.4% in the 4R trial'},
  '6H':{ct:'no paediatric figure cited',src:'—'},
  '4R':{c:85.3,src:'Diallo 2018',htx:'TB 0/422 vs 2/407 on 9H'},
  '3HR':{ct:'no paediatric figure cited',src:'—'},
  '3HP':{c:88.1,h:0,hl:'liver injury',src:'PREVENT TB, ages 2–17'},
  '1HP':{off:'no paediatric data in this guide’s sources'}},
 hiv:{
  '9H':{c:90,h:7,hl:'serious AEs',src:'BRIEF TB'},
  '6H':{ct:'TB or death 3.6 /100 py',src:'Martinson 2011 (no ART)'},
  '4R':{off:'CDC prefers 4R for HIV-negative people: rifampicin interacts with many antiretrovirals'},
  '3HR':{ct:'TB or death 2.9 /100 py',src:'Martinson 2011 (no ART)'},
  '3HP':{ct:'TB or death 3.1 /100 py',htx:'dolutegravir: no dose change',src:'Martinson 2011'},
  '1HP':{c:97,h:6,hl:'serious AEs',src:'BRIEF TB'}}
};
const TP_WK=40; /* the timeline runs 0..40 weeks */
const TP_GX={
 adult:'',
 child:` <b>Children:</b> in PREVENT TB's paediatric cohort (ages 2 to 17) no TB occurred among 471 children on 3HP against 3 of 434 on 9H, completion was 88.1% against 80.9%, and there was no liver injury in either arm. <sup class="c" data-ref="Villarino2015" title="Source 497">497</sup>`,
 hiv:` <b>People with HIV:</b> WHO strongly recommends TPT for adults and adolescents living with HIV who are unlikely to have TB disease, including people on ART, pregnant women and people treated for TB before, even where tests for TB infection are not available. <sup class="c" data-ref="WHO-Mod1-2024" title="Source 512">512</sup>`
};
const TP_STEPS=[
 {from:0,at:.01,k:'Before week 0',t:'Rule out TB disease',
  txt:`Preventive treatment is for TB infection only. Neither the skin test nor the blood test can tell infection from disease, so TB disease is excluded first: by symptoms and a chest X-ray, for example. <sup class="c" data-ref="Lewinsohn2017,WHO-Mod1-2024" title="Source 284,512">284,512</sup> It matters in practice: in VQUIN, 1.5% of the people screened (61 of 3,948) already had TB disease. <sup class="c" data-ref="Fox2024VQUIN" title="Source 187">187</sup> WHO 2024 lists 6H or 9H, 3HP and 3HR as strong recommendations, and 1HP or 4R as conditional alternatives, all regardless of HIV status. <sup class="c" data-ref="WHO-Mod1-2024" title="Source 512">512</sup>`,
  gx:1,pt:`Before this medicine, the team checks you are not already ill with TB. If you are, you need full treatment instead.`,
  hook:`TPT only after TB disease is excluded. A one-drug or two-drug course would be too weak for disease.`},
 {from:3.8/TP_WK,at:4.3/TP_WK,k:'Week 4 · 28 doses',t:'1HP is done',
  txt:`One month of daily rifapentine plus isoniazid. In BRIEF TB (3,000 people with HIV, median CD4 470), TB or death was 0.65 per 100 person-years with 1HP against 0.67 with 9H. Completion was 97% against 90%, and serious adverse events 6% against 7%. <sup class="c" data-ref="Swindells2019" title="Source 454">454</sup> No trial has compared 1HP with 3HP directly, and WHO lists 1HP as a conditional alternative. <sup class="c" data-ref="Swindells2019,WHO-Mod1-2024" title="Source 454,512">454,512</sup>`,
  gx:1,pt:`The shortest course: one month of daily tablets. Almost everyone in the big trial finished it.`,
  hook:`1HP = 28 daily doses of isoniazid + rifapentine. BRIEF TB: non-inferior to 9H in people with HIV, completion 97%.`},
 {from:11.6/TP_WK,at:12.3/TP_WK,k:'Week 12 · 12 doses',t:'3HP: once a week',
  txt:`Twelve weekly doses of isoniazid plus rifapentine. In PREVENT TB (3HP by directly observed therapy against 9 months of self-given isoniazid), TB developed in 0.19% against 0.43%, completion was 82.1% against 69.0%, and liver injury 0.4% against 2.7%, although stopping for adverse events was 4.9% against 3.7%. <sup class="c" data-ref="Sterling2011" title="Source 443">443</sup> Flu-like systemic reactions occurred in 3.5%, usually about 4 hours after a dose and after a median of 3 doses. <sup class="c" data-ref="Sterling2015" title="Source 444">444</sup>`,
  gx:1,pt:`One visit or one dose a week for 12 weeks. Some people feel flu-ish for a day after a dose: tell your TB team.`,
  hook:`3HP = 12 weekly doses. Less liver injury than 9H (0.4% vs 2.7%) but more flu-like reactions (3.5%). Rifapentine is not rifampicin.`},
 {from:12.8/TP_WK,at:17.4/TP_WK,k:'Weeks 13–17',t:'3HR and 4R finish',
  txt:`3HR is 3 months of daily isoniazid plus rifampicin; 4R is 120 daily doses of rifampicin. <sup class="c" data-ref="Sterling2020" title="Source 445">445</sup> In 6,859 adults in 9 countries, 4R was non-inferior to 9H for confirmed TB (rates differed by under 0.01 per 100 person-years), completion was 15.1 points higher and grade 3–5 liver injury 1.2 points lower. <sup class="c" data-ref="Menzies2018" title="Source 321">321</sup> In 829 children, 4R completion was 85.3% against 76.4%. <sup class="c" data-ref="Diallo2018" title="Source 124">124</sup> Across trials rifampicin caused less liver injury than isoniazid (RR 0.12). <sup class="c" data-ref="Sharma2013Cochrane" title="Source 426">426</sup>`,
  gx:1,pt:`Four months of one medicine, or three months of two. Rifampicin turns urine and tears orange; that is expected and harmless.`,
  hook:`4R vs 9H (Menzies 2018): non-inferior, better completion, less hepatotoxicity. Rifampicin is a strong CYP3A4 inducer: check every other medicine.`},
 {from:25/TP_WK,at:26.4/TP_WK,k:'Week 26 · 180 doses',t:'6H: half a year',
  txt:`Six months of daily isoniazid, 180 doses. Against placebo in 73,375 people without HIV, isoniazid lowered TB risk to 0.40 of placebo; 6 months (RR 0.44) and 12 months (RR 0.38) did not differ significantly, and liver injury was 0.36% against 0.52%. <sup class="c" data-ref="Smieja2000" title="Source 434">434</sup> In the IUAT trial, 24 weeks removed about two-thirds of the risk and prevented more cases per case of hepatitis caused than 52 weeks did. <sup class="c" data-ref="IUAT1982" title="Source 246">246</sup>`,
  gx:1,pt:`Isoniazid alone works too, but it takes much longer, and longer courses are harder to finish.`,
  hook:`Isoniazid vs placebo: RR 0.40 (Smieja). 6 months ≈ 12 months. Give vitamin B6 to protect the nerves.`},
 {from:38.6/TP_WK,at:1,k:'Week 39 · about 270 doses',t:'9H, and why shorter wins',
  txt:`Nine months of daily isoniazid is the old comparator. Every newer regimen was tested against it, and the rifamycin regimens kept efficacy while improving completion and liver safety. <sup class="c" data-ref="Sterling2011,Menzies2018,Swindells2019" title="Source 321,443,454">321,443,454</sup> In a network meta-analysis the odds ratios for TB against placebo were 0.65 for 6H, 0.53 for 3–4 months of rifampicin-isoniazid, 0.41 for rifampicin alone, and 0.36 for weekly rifapentine-isoniazid against no treatment. <sup class="c" data-ref="Zenner2017" title="Source 533">533</sup> The isoniazid label's hepatitis rate rises with age, to 23 per 1,000 at 50 to 64. <sup class="c" data-ref="FDA-Isoniazid" title="Source 160">160</sup>`,
  gx:1,pt:`All the courses work. The best one is the one a person can finish, with the fewest side effects for them.`,
  hook:`Shorter rifamycin TPT (3HP, 1HP, 4R, 3HR) ≈ isoniazid in efficacy, with higher completion and less liver injury.`}
];
/* cases-prevented calculator */
const TP_GRP={
 hh:{n:'adult household contact with TB infection',b:.024,per:'5 years',src:`5-year risk of incident TB (after co-prevalent disease found at screening) among 739 Amsterdam contacts with infection who did not start preventive treatment. <sup class="c" data-ref="Sloot2014" title="Source 433">433</sup>`},
 hiv:{n:'person with HIV and a positive skin test',b:.079,per:'1 year',src:`7.9 cases per 100 person-years among HIV-positive people with a prior positive tuberculin test, before ART (Selwyn 1989), taken here as about 7.9% over a year. ART lowered TB incidence with a hazard ratio of 0.35 at any CD4 count. <sup class="c" data-ref="Selwyn1989,Suthar2012" title="Source 420,452">420,452</sup>`},
 child:{n:'child under 5 with a positive infection test',b:.19,per:'2 years',src:`2-year cumulative TB incidence among child contacts under 5 with a positive infection test who were not given preventive treatment. <sup class="c" data-ref="Martinez2020Lancet" title="Source 311">311</sup>`}
};
const TP_RRS={
 none:{rr:1,n:'no preventive treatment',src:''},
 h:{rr:.40,n:'isoniazid (11 placebo-controlled trials)',src:`<sup class="c" data-ref="Smieja2000" title="Source 434">434</sup>`},
 h6:{rr:.65,n:'6H (network meta-analysis odds ratio)',src:`<sup class="c" data-ref="Zenner2017" title="Source 533">533</sup>`},
 rh:{rr:.53,n:'3–4 months of rifampicin-isoniazid (odds ratio)',src:`<sup class="c" data-ref="Zenner2017" title="Source 533">533</sup>`},
 r:{rr:.41,n:'rifampicin alone (odds ratio)',src:`<sup class="c" data-ref="Zenner2017" title="Source 533">533</sup>`},
 hp:{rr:.36,n:'weekly rifapentine-isoniazid (odds ratio vs no treatment)',src:`<sup class="c" data-ref="Zenner2017" title="Source 533">533</sup>`},
 obs:{rr:.09,n:'any preventive treatment in exposed children with a positive test (observational hazard ratio)',src:`<sup class="c" data-ref="Martinez2020Lancet" title="Source 311">311</sup>`},
 lfx:{rr:.38,n:'6 months of levofloxacin for MDR/RR-TB contacts (WHO pooled)',src:`<sup class="c" data-ref="WHO-Mod1-2024" title="Source 512">512</sup>`}
};

inits.tpt=()=>{
  const svg=$('#tpSvg'),rg=$('#tpT');let grp='adult';
  function rowOut(R,O,ox,y,N,s0){/* outcome bars or text for one finished regimen */
    let s='';const bw=N?150:70,lo=N?84:72;
    if(O.c!=null){s+=`<text x="${ox}" y="${y}" class="t-xs">completed</text><rect x="${ox+lo}" y="${y-8}" width="${bw}" height="9" rx="2" style="fill:var(--panel-2)"/><rect x="${ox+lo}" y="${y-8}" width="${f1(bw*O.c/100)}" height="9" rx="2" style="fill:var(--rx)"/><text x="${ox+lo+4+bw}" y="${y}" class="t-xs" style="fill:var(--ink)">${O.c}%</text>`}
    else if(O.ct)s+=`<text x="${ox}" y="${y}" class="t-xs" style="fill:var(--ink)">${O.ct}</text>`;
    const y2=y+(N?16:14);
    if(O.h!=null){const sc=O.hl==='serious AEs'?10:3;s+=`<text x="${ox}" y="${y2}" class="t-xs">${O.hl==='serious AEs'?'serious AE':'liver inj.'}</text><rect x="${ox+lo}" y="${y2-8}" width="${bw}" height="9" rx="2" style="fill:var(--panel-2)"/><rect x="${ox+lo}" y="${y2-8}" width="${f1(Math.max(O.h>0?1.5:0,bw*O.h/sc))}" height="9" rx="2" style="fill:var(--bad)"/><text x="${ox+lo+4+bw}" y="${y2}" class="t-xs" style="fill:var(--ink)">${O.h}%</text>`}
    else if(O.htx)s+=`<text x="${ox}" y="${y2}" class="t-xs">${O.htx}</text>`;
    if(O.src&&O.src!=='—')s+=`<text x="${ox}" y="${y2+(N?15:13)}" class="t-xs" style="font-style:italic">${O.src}${O.x?' · 9H '+O.x:''}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 410','400 790'),w=t*TP_WK;let s='';
    const L=N?{x0:16,x1:384,y0:56,dy:116}:{x0:150,x1:520,y0:62,dy:56};
    const X=k=>lerp(L.x0,L.x1,k/39.5);
    /* headers and week grid */
    if(!N)s+=`<text x="10" y="16" class="t-sm">REGIMEN</text><text x="${L.x0}" y="16" class="t-sm">CALENDAR · WEEKS</text><text x="534" y="16" class="t-sm">IN ITS TRIAL</text>`;
    else s+=`<text x="16" y="14" class="t-sm">ONE CALENDAR · WEEKS</text>`;
    const gy0=L.y0-(N?26:22),gy1=L.y0+L.dy*6-(N?10:24);
    [0,4,8,12,17,26,39].forEach(k=>{s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${gy0}" y2="${gy1}" class="grid"/><text x="${f1(X(k))}" y="${gy1+14}" class="t-xs t-mid">${k}</text>`});
    s+=`<text x="${L.x1}" y="${gy1+28}" class="t-xs t-end">weeks · ${N?'':'1 month ≈ 4.3 weeks · '}playhead = today</text>`;
    const OUT=TP_OUT[grp];let done=[],taking=[];
    TP_REG.forEach((R,i)=>{const O=OUT[R.id],off=!!O.off,y=L.y0+i*L.dy,ry=N?y+34:y,op=off?.3:1;
      const fin=w>=R.wk,wk=Math.min(w,R.wk);
      const nd=R.daily?Math.min(R.doses,Math.floor(wk*7+(w>0?1:0))):Math.min(R.doses,Math.floor(wk)+(w>0?1:0)),nds=fin?R.doses:nd;
      if(!off){if(fin)done.push(R.id);else taking.push(R.id)}
      s+=`<g style="opacity:${op}">`;
      /* label */
      if(N){s+=`<text x="16" y="${y}" class="t-big">${R.id}</text><text x="${16+R.id.length*13+8}" y="${y}" class="t-xs" style="fill:var(--rx)">${TP_REC[R.id]}</text><text x="16" y="${y+16}" class="t-xs">${R.sub}</text><text x="384" y="${y+16}" class="t-xs t-end" style="fill:var(--ink)">dose ${R.approx?'≈':''}${nds}/${R.approx?'≈':''}${R.doses}</text>`}
      else{s+=`<text x="10" y="${y+5}" class="t-big">${R.id}</text><text x="10" y="${y+18}" class="t-xs">${R.s2}</text><text x="10" y="${y+30}" class="t-xs" style="fill:var(--ink)">dose ${R.approx?'≈':''}${nds} / ${R.approx?'≈':''}${R.doses}</text>`;
        s+=`<text x="${L.x0}" y="${y+20}" class="t-xs" style="fill:var(--rx)">${TP_REC[R.id]}</text>`}
      /* ribbon */
      const h=14,xe=X(R.wk),xn=X(wk),n=R.dr.length;
      s+=`<rect x="${L.x0}" y="${ry-h/2}" width="${f1(xe-L.x0)}" height="${h}" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(R.daily){R.dr.forEach((c,j)=>{if(xn>L.x0)s+=`<rect x="${L.x0}" y="${f1(ry-h/2+j*h/n)}" width="${f1(xn-L.x0)}" height="${f1(h/n)}" style="fill:var(${c});opacity:.85"/>`});
        for(let k=1;k<R.wk;k++)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ry-h/2}" y2="${ry+h/2}" style="stroke:var(--panel);stroke-width:.7;opacity:.8"/>`}
      else{for(let k=0;k<R.doses;k++){const cx=X(k+.5),tk=w>=k;s+=tk?pill(cx,ry,9,'var(--dR)',{ang:-30}):`<circle cx="${f1(cx)}" cy="${ry}" r="3" style="fill:none;stroke:var(--muted);stroke-width:.8"/>`}}
      /* today's dose */
      if(!fin&&w>0&&!off)s+=pill(xn,ry-h/2-7,11,`var(${R.dr[R.dr.length-1]})`,{ang:-25});
      if(fin&&!off)s+=`<circle cx="${f1(xe)}" cy="${ry}" r="7" style="fill:var(--good)"/><path d="M${f1(xe-3.2)} ${ry}l2.2 2.4l4.2 -4.6" style="fill:none;stroke:var(--panel);stroke-width:1.8;stroke-linecap:round"/>`;
      /* outcome */
      const ox=N?16:534,oy=N?ry+24:y-4;
      if(off)s+=N?`<text x="${ox}" y="${oy}" class="t-xs" style="fill:var(--ink)">${O.off.length>64?O.off.slice(0,O.off.indexOf(':')):O.off}</text>`:wrapTp(O.off,ox,oy,27);
      else if(fin)s+=rowOut(R,O,ox,oy,N);
      else s+=`<text x="${ox}" y="${oy}" class="t-xs">${N?'':'finishes '}week ${Math.round(R.wk)}${N?' → outcome':''}</text>`;
      s+='</g>';
      if(off&&!N)s+=`<text x="${f1(L.x0+4)}" y="${ry+3}" class="t-xs" style="fill:var(--ink)">dimmed for this group</text>`});
    /* playhead */
    const xp=X(Math.min(w,39.5));
    s+=`<line x1="${f1(xp)}" x2="${f1(xp)}" y1="${gy0}" y2="${gy1}" style="stroke:var(--ink);stroke-width:1.3;opacity:.45"/><rect x="${f1(xp-23)}" y="${gy0-14}" width="46" height="13" rx="3" style="fill:var(--ink)"/><text x="${f1(xp)}" y="${gy0-4}" class="t-xs t-mid" style="fill:var(--bg)">wk ${f1(w)}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(TP_STEPS,t);setSt(ph);
    const P=Object.assign({},TP_STEPS[ph]);P.txt+=TP_GX[grp];$('#tpNote').innerHTML=noteHTML(P);
    $('#tpRead').innerHTML=`<span>week <b>${f1(w)}</b> · month <b>${f1(w/4.345)}</b></span><span>finished <b>${done.join(', ')||'none yet'}</b></span><span>still taking <b>${taking.join(', ')||'none'}</b></span><span>group <b>${{adult:'adults',child:'children',hiv:'people with HIV'}[grp]}</b></span>`;
  }
  function wrapTp(txt,x,y,n){const W=txt.split(' ');let line='',out='',k=0;W.forEach(wd=>{if((line+' '+wd).trim().length>n){out+=`<text x="${x}" y="${y+k*12}" class="t-xs" style="fill:var(--ink)">${line.trim()}</text>`;k++;line=wd}else line+=' '+wd});out+=`<text x="${x}" y="${y+k*12}" class="t-xs" style="fill:var(--ink)">${line.trim()}</text>`;return out}
  const stop=playWire(rg,$('#tpPlay'),draw,22000,'Replay','tpt');
  const setSt=stepWire($('#tpSteps'),TP_STEPS,rg,draw,stop);
  $$('[data-tpg]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.tpg;$$('[data-tpg]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- cases prevented, as an icon array of 1,000 ---- */
  const ic=$('#tpIcons'),sG=$('#tpG'),sR=$('#tpR'),cA=$('#tpArt');let shown={p:0,c:0},stopI=null;
  function calc(){const G=TP_GRP[sG.value],R=TP_RRS[sR.value],art=cA.checked&&sG.value==='hiv';
    const b=G.b*(art?.35:1),cases=Math.round(b*1000),left=Math.round(b*R.rr*1000),prev=cases-left;
    return {G,R,art,b,cases,left,prev,nnt:R.rr<1?1/(b*(1-R.rr)):null}}
  function drawI(p,c){const N=vb(ic,'720 312','400 620');let s='';
    const cols=N?25:50,cs=N?14.4:13.6,x0=N?20:22,y0=N?18:14;
    for(let i=0;i<1000;i++){const col=i%cols,row=Math.floor(i/cols),x=x0+col*cs,y=y0+row*cs;
      const f=i<p?'var(--rx)':i<p+c?'var(--tb)':'var(--fibro);opacity:.45';
      s+=`<circle cx="${f1(x+cs/2)}" cy="${f1(y+cs*.28)}" r="${f1(cs*.17)}" style="fill:${f}"/><rect x="${f1(x+cs*.26)}" y="${f1(y+cs*.48)}" width="${f1(cs*.48)}" height="${f1(cs*.42)}" rx="${f1(cs*.18)}" style="fill:${f}"/>`}
    const yb=y0+(1000/cols)*cs+16;
    s+=`<text x="${x0}" y="${yb}" class="t-xs">1,000 people · each figure = 1 person · ${N?'':'green first, then magenta, then grey'}</text>`;
    ic.innerHTML=s}
  function upd(e0){const r=calc();if(stopI)stopI();const p0=shown.p,c0=shown.c;
    if(e0===true){shown={p:r.prev,c:r.left};drawI(shown.p,shown.c)}else stopI=animate(700,k=>{const e=ease(k);shown={p:Math.round(lerp(p0,r.prev,e)),c:Math.round(lerp(c0,r.left,e))};drawI(shown.p,shown.c)},()=>{stopI=null});
    cA.disabled=sG.value!=='hiv';
    $('#tpRes').innerHTML=`<div class="mut"><small>Cases without TPT</small><span class="big-num">${r.cases}</span><span>per 1,000 over ${r.G.per}</span></div><div class="bad"><small>Cases with this regimen</small><span class="big-num">${r.left}</span><span>per 1,000</span></div><div><small>Cases prevented</small><span class="big-num">${r.prev}</span><span>per 1,000</span></div><div><small>Number needed to treat</small><span class="big-num">${r.nnt?Math.round(r.nnt):'—'}</span><span>${r.nnt?'to prevent one case':'no treatment chosen'}</span></div>`;
    $('#tpCalcCap').innerHTML=`<b>Baseline:</b> ${r.G.n}${r.art?', on ART (risk × 0.35)':''}: ${f1(r.b*100)}% over ${r.G.per}. ${r.G.src} <b>Effect:</b> ${r.R.n}${r.R.rr<1?', relative risk '+r.R.rr.toFixed(2):''}. ${r.R.src} Odds ratios are read as relative risks here, which is close when risk is low. Calculated for teaching, not reported by any one source.${sR.value==='obs'&&sG.value!=='child'?' <b>Note:</b> this effect size was measured in children, not in this group.':''}${sR.value==='lfx'?' <b>Note:</b> levofloxacin is for contacts of MDR/RR-TB; the baseline risks above come from contacts of drug-susceptible TB.':''}`}
  [sG,sR].forEach(e=>e.addEventListener('change',()=>upd()));cA.addEventListener('change',()=>upd());
  upd(true);
  const prevR=redraws.tpt;redraws.tpt=()=>{prevR&&prevR();drawI(shown.p,shown.c)};
};
/* =============== 3.4 Treating drug-resistant TB =============== */
/* a small syringe glyph (injectable), centred on x,y */
function mrSyringe(x,y,s=10,op=1){return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(-35)" style="opacity:${f1(op)}"><rect x="${f1(-s*.55)}" y="${f1(-s*.17)}" width="${f1(s*.8)}" height="${f1(s*.34)}" rx="1.5" style="fill:var(--panel);stroke:var(--bad);stroke-width:1"/><line x1="${f1(s*.25)}" x2="${f1(s*.7)}" y1="0" y2="0" style="stroke:var(--bad);stroke-width:1"/><line x1="${f1(-s*.55)}" x2="${f1(-s*.75)}" y1="0" y2="0" style="stroke:var(--bad);stroke-width:1.6"/></g>`}
/* an ear glyph for the hearing-loss icon array */
function mrEar(x,y,s,on){const c=on?'var(--bad)':'var(--line)';return `<path d="M${f1(x-s*.25)} ${f1(y+s*.1)}C${f1(x-s*.3)} ${f1(y-s*.45)} ${f1(x+s*.35)} ${f1(y-s*.5)} ${f1(x+s*.3)} ${f1(y)}C${f1(x+s*.28)} ${f1(y+s*.25)} ${f1(x+s*.05)} ${f1(y+s*.25)} ${f1(x)} ${f1(y+s*.45)}" style="fill:none;stroke:${c};stroke-width:${on?1.8:1.2};stroke-linecap:round"/>`}
const MR_STEPS=[
 {from:0,at:.1,k:'Before 2016 · 18–24 months',t:'The long injectable era',
  txt:`Treatment for MDR-TB used to take about two years, with daily injections that could damage hearing <sup class="c" data-ref="Dillard2021,WHO-Mod4-2025" title="Source 127,515">127,515</sup>. In an individual-patient meta-analysis of 12 030 people from 25 countries (studies 2009–2016), 61% had treatment success, 8% failure or relapse and 14% died. Kanamycin and capreomycin were linked to worse outcomes; linezolid, the later-generation fluoroquinolones and bedaquiline to better ones <sup class="c" data-ref="Ahmad2018Lancet" title="Source 5">5</sup>. In 18 studies, aminoglycoside hearing loss affected a pooled 40.62% of people treated for DR-TB: 49.65% with kanamycin, 38.93% with amikacin and 10.21% with capreomycin <sup class="c" data-ref="Dillard2021" title="Source 127">127</sup>.`,
  pt:`Two years of treatment and daily injections, and about 4 in 10 people lost some hearing.`,
  hook:`Aminoglycoside hearing loss ≈ 40% (kanamycin 50%, amikacin 39%) <sup class="c" data-ref="Dillard2021" title="Source 127">127</sup>. Global MDR/RR-TB success was only 50% in the 2012 cohort <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`},
 {from:.2,at:.27,k:'STREAM stage 1 · 9–11 months',t:'Shorter, still with an injectable',
  txt:`A Bangladesh regimen of at least 9 months gave 87.9% relapse-free cure in 206 people <sup class="c" data-ref="VanDeun2010" title="Source 482">482</sup>. STREAM stage 1 then randomised 424 people: favourable status at 132 weeks was 78.8% on the 9–11-month regimen and 79.8% on the 20-month 2011 WHO regimen, meeting noninferiority. QTcF prolongation to 500 ms occurred in 11.0% against 6.4% <sup class="c" data-ref="Nunn2019" title="Source 356">356</sup>.`,
  pt:`Half the time with similar results, but the injection was still part of it.`,
  hook:`STREAM 1: 9–11 months noninferior to 20 months (78.8% vs 79.8% favourable) <sup class="c" data-ref="Nunn2019" title="Source 356">356</sup>.`},
 {from:.36,at:.43,k:'STREAM stage 2 and endTB · 9 months',t:'All-oral 9-month regimens',
  txt:`Bedaquiline cut median time to culture conversion from 125 to 83 days in C208 <sup class="c" data-ref="Diacon2014" title="Source 122">122</sup>. In STREAM stage 2, a 9-month all-oral bedaquiline regimen gave 83% favourable outcomes against 71% on the 9-month injectable control, and grade 3–4 hearing loss fell from 9% to 2% <sup class="c" data-ref="Goodall2022" title="Source 202">202</sup>. In endTB (754 people, fluoroquinolone-susceptible), standard therapy gave 80.7% favourable outcomes and the best 9-month regimens added 8–10 points <sup class="c" data-ref="Guglielmetti2025NEJM" title="Source 208">208</sup>. WHO suggests BLMZ, BLLfxCZ and BDLLfxZ, in that order, when fluoroquinolone resistance has been excluded <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,
  pt:`Tablets only, for 9 months, and far less hearing damage.`,
  hook:`STREAM 2: oral bedaquiline regimen 83% vs injectable 71% favourable; grade 3–4 hearing loss 2% vs 9% <sup class="c" data-ref="Goodall2022" title="Source 202">202</sup>.`},
 {from:.52,at:.62,k:'Nix-TB, ZeNix, TB-PRACTECAL · 6 months',t:'BPaLM and BPaL',
  txt:`Bedaquiline, pretomanid and linezolid (BPaL), with moxifloxacin added for fluoroquinolone-susceptible TB (BPaLM), for 26 weeks. In TB-PRACTECAL, unfavourable outcomes at 72 weeks were 11% with BPaLM against 48% with 9–20-month standard care, and grade 3 or higher or serious adverse events 19% against 59% <sup class="c" data-ref="Nyangwa2022" title="Source 358">358</sup>. Nix-TB gave 90% favourable outcomes with linezolid 1200 mg, but peripheral neuropathy in 81% <sup class="c" data-ref="Conradie2020" title="Source 85">85</sup>; ZeNix showed that 600 mg for 26 weeks kept 91% favourable outcomes with neuropathy in 24% and myelosuppression in 2% <sup class="c" data-ref="Conradie2022" title="Source 86">86</sup>. WHO suggests BPaLM rather than 9-month or longer regimens (conditional, very low certainty); ATS/CDC/ERS/IDSA recommend it (strong, very low certainty) <sup class="c" data-ref="WHO-Mod4-2025,Saukkonen2025" title="Source 413,515">413,515</sup>.`,
  pt:`Four medicines by mouth for 6 months cured about nine in ten people in the trials.`,
  hook:`BPaLM = bedaquiline, pretomanid, linezolid 600 mg, moxifloxacin, 6 months, age 14 and over <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`},
 {from:.76,at:.9,k:'2024 · where things stand',t:'Better regimens, slow uptake',
  txt:`By 2024, 6-month regimens were used in 97 countries (41 at the end of 2022), and 34 256 people started one, against 1744 in 2022. Even so, 54% of people with MDR/RR-TB were still on 18–20-month regimens, 21% on 9-month and 21% on 6-month regimens <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>. Global MDR/RR-TB treatment success rose from 50% (2012 cohort) to 71% (2022 cohort), against 88% for drug-susceptible TB <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>. WHO 2025 also suggests a 6-month BDLLfxC regimen for all ages, including children and pregnant or breastfeeding people, based on BEAT Tuberculosis (86.1% vs 86.0% success) <sup class="c" data-ref="WHO-Mod4-2025,Conradie2026" title="Source 87,515">87,515</sup>.`,
  pt:`Short all-oral treatment exists, but most people in the world are not yet getting it.`,
  hook:`2024: only 21% of people with MDR/RR-TB were on 6-month regimens; 54% were still on 18–20-month ones <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`}];

inits.drtb=()=>{
  const svg=$('#mrSvg'),rg=$('#mrT');let fq='s',age='a',setSt=()=>{};
  function draw(t){const N=vb(svg,'720 362','400 640'),ph=phaseOf(MR_STEPS,t);
    const L=N?{x0:20,x1:380,ax:84,r0:104,rh:40,oX0:20,oX1:380,oY0:356,oY1:470,iX:24,iY:516,is:15}
             :{x0:24,x1:430,ax:76,r0:96,rh:44,oX0:478,oX1:700,oY0:74,oY1:206,iX:478,iY:272,is:9};
    const lw=N?0:150,bx0=L.x0+lw,mo=m=>lerp(bx0,L.x1,m/24);
    let s=`<text x="${L.x0}" y="24" class="t-big">${MR_STEPS[ph].t}</text><text x="${L.x0}" y="42" class="t-sm">${MR_STEPS[ph].k}</text>`;
    /* month axis */
    s+=`<text x="${L.x0}" y="${L.ax-12}" class="t-sm">DURATION</text>`;
    [0,6,9,12,18,24].forEach(m=>s+=`<line x1="${f1(mo(m))}" x2="${f1(mo(m))}" y1="${L.ax}" y2="${L.r0+L.rh*5-14}" class="${m?'grid':'axis'}"/><text x="${f1(mo(m))}" y="${L.ax-2}" class="t-xs t-mid">${m}</text>`);
    s+=`<text x="${L.x1}" y="${L.r0+L.rh*5-2}" class="t-xs t-end">months</text>`;
    const child=age==='c',fr=fq==='r';
    const ROWS=[
      {n:'Long injectable',sub:'18–20 (up to 24) months',m:20,m2:24,from:0,inj:true,chips:'injectable-based'},
      {n:'STREAM 1',sub:'9–11 months, injectable',m:9,m2:11,from:.2,inj:true,chips:'',na:fr?'needs FQ susceptibility':''},
      {n:'9-month all-oral',sub:'e.g. BLMZ',m:9,from:.36,chips:'B L M Z',na:fr?'only if FQ resistance excluded':''},
      {n:fr?'BPaL':'BPaLM',sub:fr?'FQ-resistant TB':'FQ-susceptible TB',m:6,from:.52,chips:fr?'B Pa L':'B Pa L M',na:child?'from age 14 only':''},
      {n:'BDLLfxC',sub:'WHO 2025 · all ages',m:6,from:.76,chips:'B D L Lfx C'}];
    ROWS.forEach((R,i)=>{const y=L.r0+i*L.rh,k=ramp(t,R.from,R.from+.08);if(k<=0)return;
      const cur=(ph===0&&i===0)||(ph===1&&i===1)||(ph===2&&i===2)||(ph===3&&i===3)||(ph===4&&i>=3&&(i===4||!child));
      const col=R.inj?'var(--bad)':i===4?'var(--vax)':'var(--rx)',op=R.na?.35:1;
      s+=`<g style="opacity:${f1(op*k)}">`;
      const by=N?y+14:y;
      if(N)s+=`<text x="${L.x0}" y="${y+8}" class="t-lbl" style="${cur?'':'fill:var(--muted)'}">${R.n}</text><text x="${f1(L.x0+R.n.length*8+8)}" y="${y+8}" class="t-xs" style="${R.na?'fill:var(--warn)':''}">${R.na||R.sub}</text>`;
      else s+=`<text x="${L.x0}" y="${y+12}" class="t-lbl" style="${cur?'':'fill:var(--muted)'}">${R.n}</text><text x="${L.x0}" y="${y+25}" class="t-xs">${R.sub}</text>`;
      if(R.m2)s+=`<rect x="${f1(bx0)}" y="${by+2}" width="${f1((mo(R.m2)-bx0)*k)}" height="18" rx="5" style="fill:${col};opacity:.18"/>`;
      s+=`<rect x="${f1(bx0)}" y="${by+2}" width="${f1((mo(R.m)-bx0)*k)}" height="18" rx="5" style="fill:${col};fill-opacity:${cur?.85:.45};stroke:${cur?'var(--ink)':'none'};stroke-width:1.2"/>`;
      if(R.inj){const n=R.m>12?7:3;for(let j=0;j<n;j++)s+=mrSyringe(mo(.6+j*(R.m>12?.9:.85)),by+11,10,k)}
      else if(R.chips&&k>.9)s+=`<text x="${f1(mo(R.m)+6)}" y="${by+15}" class="t-xs" style="fill:var(--ink)">${R.chips}</text>`;
      if(R.inj&&k>.9&&!R.na&&!N)s+=`<text x="${f1(bx0+4)}" y="${y+33}" class="t-xs" style="fill:var(--bad)">daily injections</text>`;
      s+=`</g>`;
      if(R.na&&k>.5&&!N)s+=`<text x="${f1(bx0+4)}" y="${y+34}" class="t-xs" style="fill:var(--warn)">${R.na}</text>`});
    /* outcomes */
    const O=[
      {h:'TREATMENT SUCCESS',bars:[ ['IPD 2009–16',61,'var(--bad)'],['global, 2012 cohort',50,'var(--muted)']],note:'legacy regimens'},
      {h:'FAVOURABLE AT 132 WK',bars:[ ['9–11 mo',78.8,'var(--warn)'],['20 mo',79.8,'var(--muted)']],note:'STREAM stage 1'},
      {h:'FAVOURABLE AT 76 WK',bars:[ ['oral 9 mo',83,'var(--rx)'],['injectable 9 mo',71,'var(--muted)']],note:'STREAM stage 2'},
      fr?{h:'FAVOURABLE OUTCOME',bars:[ ['Nix-TB',90,'var(--rx)'],['ZeNix 600 mg',91,'var(--rx)']],note:'BPaL, single-arm / dose arms'}
        :{h:'TREATMENT SUCCESS',bars:[ ['BPaLM',89,'var(--rx)'],['standard care',52,'var(--muted)']],note:'TB-PRACTECAL (WHO summary)'},
      child?{h:'SUCCESS, CHILDREN',bars:[ ['BEAT 6 mo (age ≥6)',86.1,'var(--vax)'],['IPD children',72,'var(--muted)']],note:'BEAT · MDR/RR-TB in children'}
        :{h:'GLOBAL SUCCESS',bars:[ ['2012',50,'var(--muted)'],['2020',64,'var(--warn)'],['2022',71,'var(--rx)']],note:'MDR/RR-TB cohorts (WHO)'}][ph];
    const kO=ramp(t,MR_STEPS[ph].from,MR_STEPS[ph].from+.07);
    s+=`<text x="${L.oX0}" y="${L.oY0-14}" class="t-sm">${O.h}</text>`;
    const nb=O.bars.length,bw=Math.min(54,(L.oX1-L.oX0-20)/nb-18),V=v=>lerp(L.oY1,L.oY0+6,v/100);
    [0,50,100].forEach(v=>s+=`<line x1="${L.oX0}" x2="${L.oX1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/>`);
    O.bars.forEach(([lab,v,c],i)=>{const cx=L.oX0+20+(i+.5)*(L.oX1-L.oX0-20)/nb,vv=v*kO;
      s+=`<rect x="${f1(cx-bw/2)}" y="${f1(V(vv))}" width="${f1(bw)}" height="${f1(L.oY1-V(vv))}" rx="4" style="fill:${c}"/><text x="${f1(cx)}" y="${f1(V(vv)-5)}" class="t-lbl t-mid">${kO>.98?(v%1?v.toFixed(1):v)+'%':''}</text><text x="${f1(cx)}" y="${L.oY1+13}" class="t-xs t-mid">${lab}</text>`});
    s+=`<text x="${L.oX1}" y="${L.oY1+27}" class="t-xs t-end" style="fill:var(--warn)">${O.note}</text>`;
    /* harms icon array */
    const H=[{h:'HEARING LOSS · aminoglycosides',n:41,lab:'40.62% pooled · 1 mark = 1%',ear:1},
      {h:'GRADE 3–4 HEARING LOSS',n:9,lab:'9-month injectable arm, STREAM 2',ear:1},
      {h:'GRADE 3–4 HEARING LOSS',n:2,lab:'9-month oral arm, STREAM 2',ear:1},
      {h:'LINEZOLID NEUROPATHY',n:24,lab:'ZeNix 600 mg × 26 wk (Nix-TB 1200 mg: 81%)',ear:0},
      {h:'REGIMEN IN USE, 2024',n:54,lab:'54 long · 21 nine-month · 21 six-month',ear:2}][ph];
    s+=`<text x="${L.iX}" y="${L.iY-10}" class="t-sm">${H.h}</text>`;
    for(let j=0;j<100;j++){const cx=L.iX+(j%20)*(L.is+(N?3:2.1))+L.is/2,cy=L.iY+Math.floor(j/20)*(L.is+4)+L.is/2,on=j<H.n*kO;
      if(H.ear===1)s+=mrEar(cx,cy,L.is,on);
      else if(H.ear===0)s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(L.is*.36)}" style="fill:${on?'var(--warn)':'none'};stroke:${on?'var(--warn)':'var(--line)'};stroke-width:1.2"/>`;
      else{const c=j<54?'var(--bad)':j<75?'var(--warn)':j<96?'var(--rx)':'var(--line)';s+=`<rect x="${f1(cx-L.is*.38)}" y="${f1(cy-L.is*.38)}" width="${f1(L.is*.76)}" height="${f1(L.is*.76)}" rx="2" style="fill:${j<100*kO?c:'none'};stroke:${c};stroke-width:1"/>`}}
    s+=`<text x="${L.iX}" y="${L.iY+5*(L.is+4)+12}" class="t-xs">${H.lab}</text>`;
    svg.innerHTML=s;setSt(ph);
    $('#mrNote').innerHTML=noteHTML(MR_STEPS[ph]);
    $('#mrCap').innerHTML=(fr?`<b>Fluoroquinolone-resistant (pre-XDR):</b> 9-month regimens and moxifloxacin need fluoroquinolone susceptibility, so BPaL replaces BPaLM. ATS/CDC/ERS/IDSA recommend 6-month BPaL when there is fluoroquinolone resistance or intolerance and less than 1 month of prior bedaquiline and linezolid exposure <sup class="c" data-ref="Saukkonen2025" title="Source 413">413</sup>. endTB-Q's shortened BDLC strategy did not show overall noninferiority (87% vs 89%), and its authors suggest fluoroquinolone-resistant TB may need longer, reinforced regimens <span class="ev early">Early evidence</span> <sup class="c" data-ref="Guglielmetti2025LRM" title="Source 207">207</sup>.`
      :`<b>Fluoroquinolone-susceptible:</b> BPaLM, or one of the 9-month all-oral regimens, as WHO 2025 suggests <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`)+' '+
      (child?`<b>Children:</b> WHO's BPaLM/BPaL eligibility starts at age 14 <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>. BDLLfxC covers all ages; BEAT Tuberculosis enrolled people aged 6 and older <sup class="c" data-ref="WHO-Mod4-2025,Conradie2026" title="Source 87,515">87,515</sup>. The bedaquiline label covers children aged 2 and older weighing at least 8 kg <sup class="c" data-ref="FDA-Sirturo" title="Source 169">169</sup>. In 23 369 children and adolescents with MDR/RR-TB (mostly older regimens), 72.0% were treated successfully; two or three Group A drugs were linked to better success <sup class="c" data-ref="GarciaPrats2025" title="Source 193">193</sup>.`
      :`<b>Adults:</b> BPaLM/BPaL apply from age 14, with or without HIV, for pulmonary TB and most extrapulmonary TB (not CNS, osteoarticular or disseminated disease), with less than 1 month of prior bedaquiline, linezolid, pretomanid or delamanid. They do not apply in pregnancy or breastfeeding <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`);
  }
  const stop=playWire(rg,$('#mrPlay'),draw,24000,'Replay','drtb');
  setSt=stepWire($('#mrSteps'),MR_STEPS,rg,draw,stop);
  $$('[data-fq]').forEach(b=>b.addEventListener('click',()=>{fq=b.dataset.fq;$$('[data-fq]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-age]').forEach(b=>b.addEventListener('click',()=>{age=b.dataset.age;$$('[data-age]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- trial comparator ---- */
  const fs=$('#mrForest'),pick=$('#mrPick');let view='rate';
  /* rate view: unfavourable outcome %, with a CI where the trial published one. calc: derived here as 100 − favourable */
  const TR=[
    {id:'nix',g:'Nix-TB (BPaL, 2020)',rows:[{l:'BPaL, linezolid 1200 mg',v:10,lo:5,hi:17,c:'var(--rx)',calc:1}],
     d:{v:null},txt:`Single-arm study of 109 people with XDR-TB (old definition) or treatment-intolerant or non-responsive MDR-TB. 90% (95% CI 83–95) had a favourable outcome 6 months after 26 weeks of treatment; the 11 unfavourable outcomes were 7 deaths, 1 withdrawal, 2 relapses and 1 loss to follow-up. Peripheral neuropathy 81%, myelosuppression 48% <sup class="c" data-ref="Conradie2020" title="Source 85">85</sup>.`},
    {id:'zenix',g:'ZeNix (BPaL linezolid arms, 2022)',rows:[{l:'1200 mg × 26 wk',v:7,c:'var(--rx)',calc:1},{l:'1200 mg × 9 wk',v:11,c:'var(--rx)',calc:1},{l:'600 mg × 26 wk',v:9,c:'var(--rx)',calc:1,best:1},{l:'600 mg × 9 wk',v:16,c:'var(--rx)',calc:1}],
     d:{v:null},txt:`181 people, 88% with XDR or pre-XDR-TB (old definitions). Favourable outcomes 93%, 89%, 91% and 84%; peripheral neuropathy 38%, 24%, 24% and 13%; myelosuppression 22%, 15%, 2% and 7%. Six of the seven unfavourable microbiological outcomes were in the 9-week arms. The authors judged 600 mg for 26 weeks the best balance, and WHO uses 600 mg, reducible to 300 mg for toxicity <sup class="c" data-ref="Conradie2022,WHO-Mod4-2025" title="Source 86,515">86,515</sup>.`},
    {id:'prac',g:'TB-PRACTECAL (BPaLM, 2022)',rows:[{l:'BPaLM 24 wk',v:11,c:'var(--rx)'},{l:'standard care 9–20 mo',v:48,c:'var(--muted)'}],
     d:{v:37,lo:22,hi:53,l:'BPaLM vs standard (mITT)',pp:{v:9,lo:-4,hi:22}},txt:`Aged 15 and older, Belarus, South Africa and Uzbekistan. Unfavourable outcomes at 72 weeks (modified ITT): 11% vs 48%, risk difference −37 points (96.6% CI −53 to −22). Per protocol: 4% vs 12% (−9; −22 to 4). Recruitment stopped early: 128 people in the modified ITT and 90 per protocol <sup class="c" data-ref="Nyangwa2022" title="Source 358">358</sup>. In the difference view the sign is flipped to favourable outcome.`},
    {id:'stream2',g:'STREAM stage 2 (2022)',rows:[{l:'9-month oral bedaquiline',v:17,c:'var(--rx)',calc:1},{l:'9-month injectable control',v:29,c:'var(--muted)',calc:1}],
     d:{v:11,lo:2.9,hi:19,l:'oral vs injectable'},txt:`Favourable outcome at 76 weeks: 83% (162/196) vs 71% (133/187), difference 11.0% (95% CI 2.9–19.0). At 132 weeks, unfavourable outcomes were 19.6% vs 29.3%, and earlier bedaquiline mortality concerns were not substantiated <sup class="c" data-ref="Goodall2022,Goodall2024" title="Source 202,203">202,203</sup>.`},
    {id:'endtb',g:'endTB (9-month regimens, 2025)',rows:[{l:'standard therapy',v:19.3,c:'var(--muted)',calc:1},{l:'BCLLfxZ',v:9.5,c:'var(--rx)',calc:1},{l:'BLMZ',v:11,c:'var(--rx)',calc:1},{l:'BDLLfxZ',v:14.7,c:'var(--rx)',calc:1},{l:'DCMZ',v:16.8,c:'var(--warn)',calc:1}],
     d:{multi:[ ['BCLLfxZ',9.8],['BLMZ',8.3],['BDLLfxZ',4.6],['DCMZ',2.5]]},txt:`754 people with rifampicin-resistant, fluoroquinolone-susceptible TB. Standard therapy gave 80.7% favourable outcomes at week 73. Risk differences for the regimens that met noninferiority: BCLLfxZ +9.8, BLMZ +8.3, BDLLfxZ +4.6 points; DCMZ +2.5 was not noninferior per protocol. Grade 3 or higher hepatotoxic events: 11.7% overall, 7.1% on standard therapy <sup class="c" data-ref="Guglielmetti2025NEJM" title="Source 208">208</sup>. Unfavourable rates here are 100 − (80.7 + difference), calculated.`},
    {id:'beat',g:'BEAT Tuberculosis (6 months, 2026)',rows:[{l:'6-month strategy',v:13.9,c:'var(--vax)',calc:1},{l:'9-month standard of care',v:14,c:'var(--muted)',calc:1}],
     d:{v:-.2,lo:-6.9,hi:6.5,l:'6-month vs 9-month'},txt:`South Africa, 403 people aged 6 or older, including people who were pregnant or breastfeeding and people with fluoroquinolone resistance. Success 86.1% (174/202) vs 86.0% (172/200), adjusted difference −0.2 points (95% CI −6.9 to 6.5). Grade 3 or higher adverse events 31.2% vs 37.0%; 10 deaths in each group <sup class="c" data-ref="Conradie2026" title="Source 87">87</sup>.`},
    {id:'endtbq',g:'endTB-Q (pre-XDR, 2025)',rows:[{l:'BDLC 6 or 9 months',v:13,c:'var(--warn)',calc:1},{l:'individualised longer',v:11,c:'var(--muted)',calc:1}],
     d:{v:-2,l:'BDLC vs control (calculated)'},txt:`324 people with fluoroquinolone-resistant TB. Favourable outcomes 87% vs 89%; overall noninferiority was not shown, and the authors suggest longer, reinforced regimens may be needed (Early evidence) <sup class="c" data-ref="Guglielmetti2025LRM" title="Source 207">207</sup>.`}];
  pick.innerHTML=TR.map(x=>`<option value="${x.id}">${x.g}</option>`).join('');
  function drawF(){const NN=NARROW(),nRows=TR.reduce((a,x)=>a+x.rows.length,0),nDiff=TR.reduce((a,x)=>a+(x.d.multi?x.d.multi.length:x.d.v!=null?(x.d.pp?2:1):0),0);
    const H=view==='rate'?(NN?48+TR.length*40+nRows*16+60:44+TR.length*36+nRows*15+56):(NN?48+nDiff*30+70:44+nDiff*24+70);
    const N=vb(fs,'720 '+H,'400 '+H),hl=pick.value;
    const lx=N?16:20,x0=N?150:300,x1=N?384:690;let s='',y=N?48:44;
    if(view==='rate'){const X=v=>lerp(x0,x1,v/(N?56:50));
      s+=`<text x="${lx}" y="20" class="t-sm">UNFAVOURABLE OUTCOME, % OF PARTICIPANTS</text>`;
      const rowsH=TR.reduce((a,x)=>a+x.rows.length*(N?16:15)+(N?40:36),0)-(N?26:24);
      [0,10,20,30,40,50].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y-6}" y2="${y+rowsH}" class="${v?'grid':'axis'}"/><text x="${f1(X(v))}" y="${y+rowsH+14}" class="t-xs t-mid">${v}%</text>`);
      TR.forEach(x=>{const on=x.id===hl;
        s+=`<text x="${lx}" y="${y+4}" class="t-lbl" style="${on?'fill:var(--rx)':''};font-size:${N?12:13}px">${x.g}</text>`;y+=N?14:12;
        x.rows.forEach(r=>{y+=N?16:15;
          s+=`<text x="${N?lx+8:x0-10}" y="${y+3}" class="t-xs${N?'':' t-end'}" style="${on?'fill:var(--ink)':''}">${r.l}${r.calc?'*':''}</text>`;
          if(r.lo!=null)s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${y}" y2="${y}" style="stroke:${r.c};stroke-width:2"/>`;
          const px=N?Math.max(X(r.v),x0):X(r.v);
          s+=`<circle cx="${f1(X(r.v))}" cy="${y}" r="${on?5.5:4.5}" style="fill:${r.c};stroke:var(--ink);stroke-width:${on?1.4:.6}"/><text x="${f1(X(r.v)+9)}" y="${y+3}" class="t-xs" style="fill:var(--ink)">${r.v}%${r.best?' ◂ chosen dose':''}</text>`});
        y+=N?26:24});
      s+=`<text x="${lx}" y="${y+12}" class="t-xs">* calculated here as 100 − the published favourable %.</text><text x="${lx}" y="${y+26}" class="t-xs">Bars: published 95% CI.</text>`;
    }else{const X=v=>lerp(x0,x1,(v+10)/70);
      s+=`<text x="${lx}" y="20" class="t-sm">DIFFERENCE IN FAVOURABLE OUTCOME vs CONTROL, POINTS</text>`;
      const rows=[];TR.forEach(x=>{if(x.d.multi)x.d.multi.forEach(([l,v])=>rows.push({id:x.id,l:'endTB '+l,v}));else if(x.d.v!=null){rows.push({id:x.id,l:x.g.split(' (')[0]+(N?'':' · '+x.d.l),v:x.d.v,lo:x.d.lo,hi:x.d.hi});if(x.d.pp)rows.push({id:x.id,l:'TB-PRACTECAL per protocol',v:x.d.pp.v,lo:x.d.pp.lo,hi:x.d.pp.hi})}});
      const h=rows.length*(N?30:24);
      [-10,0,10,20,30,40,50,60].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y-6}" y2="${y+h}" class="${v?'grid':'axis'}" style="${v?'':'stroke:var(--ink);stroke-width:1.4'}"/><text x="${f1(X(v))}" y="${y+h+14}" class="t-xs t-mid">${v>0?'+':''}${v}</text>`);
      s+=`<text x="${f1(X(-10))}" y="${y+h+30}" class="t-xs">← favours control</text><text x="${f1(X(60))}" y="${y+h+30}" class="t-xs t-end">favours new regimen →</text>`;
      rows.forEach(r=>{y+=N?30:24;const on=r.id===hl,yy=y-(N?14:10);
        s+=`<text x="${lx}" y="${N?yy-6:yy+3}" class="t-xs" style="${on?'fill:var(--rx);font-weight:700':'fill:var(--ink)'}">${r.l}</text>`;
        if(r.lo!=null)s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${yy}" y2="${yy}" style="stroke:var(--rx);stroke-width:2.2"/><line x1="${f1(X(r.lo))}" x2="${f1(X(r.lo))}" y1="${yy-4}" y2="${yy+4}" style="stroke:var(--rx);stroke-width:1.5"/><line x1="${f1(X(r.hi))}" x2="${f1(X(r.hi))}" y1="${yy-4}" y2="${yy+4}" style="stroke:var(--rx);stroke-width:1.5"/>`;
        s+=`<rect x="${f1(X(r.v)-5)}" y="${yy-5}" width="10" height="10" style="fill:${on?'var(--rx)':'var(--ink)'}"/><text x="${f1(r.hi!=null&&X(r.hi)>x1-90?X(r.v):X(r.v)+(r.hi!=null?Math.max(9,X(r.hi)-X(r.v)+6):9))}" y="${r.hi!=null&&X(r.hi)>x1-90?yy-9:yy+4}" ${r.hi!=null&&X(r.hi)>x1-90?'text-anchor="middle"':''} class="t-xs" style="fill:var(--ink)">${r.v>0?'+':''}${r.v}${r.lo!=null?` (${r.lo} to ${r.hi})`:''}</text>`});
      s+=`<text x="${lx}" y="${y+50}" class="t-xs">Squares: point estimates; bars: published CIs (TB-PRACTECAL 96.6%).</text><text x="${lx}" y="${y+64}" class="t-xs">Different trials, populations and controls.</text>`;}
    fs.innerHTML=s;
    const x=TR.find(z=>z.id===hl);$('#mrFNote').innerHTML=noteHTML({k:'Trial detail',t:x.g,txt:x.txt,pt:`Each trial compared different groups of people, so the numbers are not a league table.`,hook:x.id==='prac'?`TB-PRACTECAL: unfavourable 11% (BPaLM) vs 48% (standard care) <sup class="c" data-ref="Nyangwa2022" title="Source 358">358</sup>.`:x.id==='zenix'?`ZeNix: linezolid 600 mg × 26 weeks kept efficacy (91%) and cut myelosuppression to 2% <sup class="c" data-ref="Conradie2022" title="Source 86">86</sup>.`:null});
  }
  pick.addEventListener('change',drawF);
  $$('[data-fv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.fv;$$('[data-fv]').forEach(z=>z.setAttribute('aria-pressed',z===b));drawF()}));
  pick.value='prac';drawF();
  redraws.drtb=(p=>()=>{p&&p();drawF()})(redraws.drtb);
};
/* =============== 3.5 Side effects & monitoring =============== */
const SF_DC={H:'var(--dH)',R:'var(--dR)',Z:'var(--dZ)',E:'var(--dE)',P:'var(--dR)',M:'var(--dNew)',B:'var(--dNew)',Pa:'var(--dNew)',L:'var(--dNew)'};
const SF_DN={H:'isoniazid',R:'rifampicin',Z:'pyrazinamide',E:'ethambutol',P:'rifapentine',M:'moxifloxacin',B:'bedaquiline',Pa:'pretomanid',L:'linezolid'};
const SF_REG={std:{H:[0,26],R:[0,26],Z:[0,8],E:[0,8]},hpzm:{H:[0,17],P:[0,17],M:[0,17],Z:[0,8]},bpalm:{B:[0,24],Pa:[0,24],L:[0,24],M:[0,24]}};
/* side effects: org = organ lit on the body; typ = typical window in weeks (only where a source gives one); mon = check weeks */
const SF_AE=[
 {id:'orange',org:'fluids',d:['R'],n:'Orange body fluids',f:'expected, harmless',col:'var(--dR)'},
 {id:'liver',org:'liver',d:['H','R','Z','P','Pa'],n:'Liver injury',f:'2–28% in reported series',typ:[0,12],col:'var(--bad)',mon:'monthly'},
 {id:'neuroH',org:'nerves',d:['H'],n:'Neuropathy (isoniazid)',f:'pyridoxine listed with H',col:'var(--dH)'},
 {id:'eye',org:'eyes',d:['E'],n:'Optic neuritis',f:'22.5 per 1,000 treated',col:'var(--dE)',mon:'monthly'},
 {id:'urate',org:'joints',d:['Z'],n:'High urate, gout',f:'hyperuricaemia is common',col:'var(--dZ)'},
 {id:'rash',org:'skin',d:['Z'],n:'Rash (pyrazinamide)',f:'more than once thought',col:'var(--dZ)'},
 {id:'flu',org:'skin',d:['P'],n:'Hypersensitivity',f:'incl. flu-like syndrome',col:'var(--dR)'},
 {id:'tendon',org:'tendon',d:['M'],n:'Tendinitis, rupture',f:'boxed warning',col:'var(--dNew)'},
 {id:'qt',org:'heart',d:['B','M','Pa'],n:'QT prolongation',f:'stop B if QTc >500 ms',col:'var(--bad)',mon:'ecg'},
 {id:'marrow',org:'marrow',d:['L','Pa'],n:'Low blood counts',f:'2% (600 mg) to 22%',col:'var(--dNew)',mon:'weekly'},
 {id:'neuroL',org:'nerves',d:['L','Pa'],n:'Neuropathy (linezolid)',f:'24% (600 mg) to 38%',typ:[4,26],col:'var(--dNew)'},
 {id:'optic',org:'eyes',d:['L','Pa'],n:'Optic neuropathy',f:'9% at 1,200 mg, 26 wk',typ:[4,26],col:'var(--dNew)'}
];
const SF_ST=[
 {from:0,at:.002,k:'Week 0',t:'Baseline checks',
  txt:`Checks before the first dose set a baseline for later comparison. The rifampin label lists liver enzymes, bilirubin, creatinine, blood count and platelets for adults; the isoniazid label adds AST and ALT from age 35; the ethambutol label asks for visual acuity in each eye and colour discrimination; bedaquiline needs an ECG, liver enzymes and electrolytes. The table below has the full list. <sup class="c" data-ref="FDA-Rifampin,FDA-Isoniazid,FDA-Ethambutol,FDA-Sirturo" title="Source 159,160,168,169">159,160,168,169</sup>`,
  pt:`Before treatment starts you will usually have blood tests, an eye test if ethambutol is used, and a heart tracing (ECG) for some newer medicines. These are routine.`,
  hook:`Baseline LFTs for everyone on the rifampin label; AST/ALT from age 35 on the isoniazid label; vision for ethambutol; ECG for bedaquiline. <sup class="c" data-ref="FDA-Rifampin,FDA-Isoniazid,FDA-Ethambutol,FDA-Sirturo" title="Source 159,160,168,169">159,160,168,169</sup>`},
 {from:.01,at:.04,k:'From the first doses',t:'Orange fluids: expected',
  txt:`Rifampin can turn teeth, urine, sweat, sputum and tears yellow, orange, red or brown, and can permanently stain soft contact lenses. People should be told about this in advance. It is harmless, and it is a useful sign that the medicine is being taken. <sup class="c" data-ref="FDA-Rifampin" title="Source 168">168</sup>`,
  pt:`Orange urine, sweat and tears are expected with rifampicin and are not dangerous. Switch to glasses or daily disposable lenses if you wear soft contacts.`,
  hook:`Rifampicin = orange body fluids, stained soft contact lenses. <sup class="c" data-ref="FDA-Rifampin" title="Source 168">168</sup>`},
 {from:.08,at:.2,k:'Weeks 1–12',t:'The liver window',
  txt:`Isoniazid, rifampicin and pyrazinamide can all injure the liver; reported rates range from 2% to 28%. Isoniazid hepatitis usually occurs in the first 3 months, and in SHINE all but 2 of 11 liver reactions in children came in the first 8 weeks. Pyrazinamide caused the most major adverse events of the four first-line drugs (1.48 per 100 person-months). On the rifapentine regimen, grade 3 or higher bilirubin rises were 3.3% against 1.0%. <sup class="c" data-ref="Tostmann2008,FDA-Isoniazid,Turkova2022,Yee2003,Dorman2021" title="Source 141,160,473,477,525">141,160,473,477,525</sup>`,
  pt:`Tell the TB team straight away about yellow eyes or skin, dark urine, stomach pain, sickness or loss of appetite. Avoid alcohol during treatment.`,
  hook:`ATS: interrupt when ALT is >3× ULN with symptoms or jaundice, or >5× ULN without symptoms. <sup class="c" data-ref="Saukkonen2006" title="Source 412">412</sup>`},
 {from:.24,at:.28,k:'Weeks 0–8',t:'Eyes, joints and skin',
  txt:`Ethambutol can cause optic neuritis, usually reversible if stopped promptly, though irreversible blindness has been reported; visual impairment occurred in 22.5 per 1,000 people treated. The label asks for vision checks monthly at doses above 15 mg/kg/day. Pyrazinamide inhibits urate excretion and often raises uric acid, usually without symptoms; it is contraindicated in acute gout. Pyrazinamide rash was more common than previously recognised. In the standard regimen both drugs stop at 8 weeks. <sup class="c" data-ref="FDA-Ethambutol,Ezer2013,FDA-Pyrazinamide,Yee2003" title="Source 157,159,166,525">157,159,166,525</sup>`,
  pt:`Report blurred vision or trouble telling red from green at once. Joint pain or a rash should also be mentioned to the team.`,
  hook:`Ethambutol: check visual acuity and red-green colour vision. Not on the US label under 13 or in people who cannot report vision changes. <sup class="c" data-ref="FDA-Ethambutol" title="Source 159">159</sup>`},
 {from:.36,at:.55,k:'Months 2–6',t:'Nerves',
  txt:`Isoniazid can cause pyridoxine deficiency by competing with pyridoxal phosphate, leading to peripheral neuropathy; pre-existing neuropathy calls for closer monitoring, and ATS/CDC/ERS/IDSA lists pyridoxine (vitamin B6) 25 to 50 mg/day with isoniazid. Linezolid causes peripheral and optic neuropathy mainly after 28 days: in ZeNix, 24% at 600 mg for 26 weeks and 38% at 1,200 mg. Choose <b>BPaLM</b> to see it. <sup class="c" data-ref="FDA-Isoniazid,Saukkonen2025,FDA-Zyvox,Conradie2022" title="Source 86,160,171,413">86,160,171,413</sup>`,
  pt:`Tingling, numbness or burning in the hands or feet should be reported early. Vitamin B6 is often given with isoniazid to protect the nerves.`,
  hook:`Isoniazid neuropathy → pyridoxine (B6). Linezolid: neuropathy and myelosuppression, dose-related. <sup class="c" data-ref="FDA-Isoniazid,Conradie2022" title="Source 86,160">86,160</sup>`},
 {from:.68,at:.85,k:'Throughout',t:'Heart and blood: the newer drugs',
  txt:`Bedaquiline carries a boxed warning for QTc prolongation: ECGs are monitored and the drug stopped for significant ventricular arrhythmia or QTc above 500 ms. ATS/CDC/ERS/IDSA calls for ECGs at baseline and at 2, 12 and 24 weeks on BPaL, monthly if moxifloxacin is added. Linezolid needs weekly blood counts for myelosuppression, which was 2% at 600 mg for 26 weeks in ZeNix against 22% at 1,200 mg. Moxifloxacin adds a boxed warning for tendinitis and tendon rupture. <sup class="c" data-ref="FDA-Sirturo,Saukkonen2025,FDA-Zyvox,Conradie2022,FDA-Moxifloxacin" title="Source 86,161,169,171,413">86,161,169,171,413</sup>`,
  pt:`Heart tracings and blood tests during treatment are routine safety checks, not a sign that something is wrong.`,
  hook:`Bedaquiline = QT (ECG). Linezolid = bone marrow and nerves (weekly counts). <sup class="c" data-ref="FDA-Sirturo,FDA-Zyvox" title="Source 169,171">169,171</sup>`}
];
const SF_INT=[
 {id:'contra',n:'Hormonal contraception',sm:'pill, patch, implant',co:'contraceptive hormone',
  txt:`The rifampin label warns that the reliability of oral and other systemic hormonal contraceptives may be affected and that alternative contraception should be considered. The rifapentine label gives the same warning. <sup class="c" data-ref="FDA-Rifampin,FDA-Priftin" title="Source 165,168">165,168</sup>`,
  pt:`Hormonal contraception may not work reliably during rifampicin and for a while after it. Check with a pharmacist or the TB team which method to use.`},
 {id:'art',n:'HIV medicines (ART)',sm:'protease inhibitors, dolutegravir',co:'antiretroviral',
  txt:`Combining rifampicin with indinavir, nelfinavir or saquinavir is contraindicated. In INSPIRING, adults on rifampicin-based TB treatment took dolutegravir 50 mg twice daily during TB treatment and for 2 weeks after it; week-48 viral response was 75%, against 82% with efavirenz. In DOLPHIN, weekly rifapentine-isoniazid raised dolutegravir clearance by 36%, yet viral load stayed suppressed in all 60 people. See <a href="#special" data-go="special">TB with HIV</a>. <sup class="c" data-ref="Niemi2003,Dooley2020CID,Dooley2020LancetHIV" title="Source 135,136,353">135,136,353</sup>`,
  pt:`TB and HIV can be treated together. The HIV medicines or their doses may need adjusting, and the teams plan this together. Check with a pharmacist before changing anything.`},
 {id:'anti',n:'Anticoagulants',sm:'warfarin',co:'(S)-warfarin',
  txt:`Rifampicin also induces CYP2C, lowering (S)-warfarin levels, so the anticoagulant effect falls during treatment and rises again over the weeks after rifampicin stops. <sup class="c" data-ref="Niemi2003" title="Source 353">353</sup>`,
  pt:`Blood thinners can stop working properly during rifampicin. Check with a pharmacist or the clinic that manages your anticoagulant.`},
 {id:'meth',n:'Methadone',sm:'opioid substitution',co:'methadone',
  txt:`Rifampicin lowers methadone levels, leading to opioid withdrawal symptoms in most patients. <sup class="c" data-ref="Niemi2003" title="Source 353">353</sup>`,
  pt:`If you take methadone, tell both your TB team and your methadone service before starting, so the dose can be reviewed. Withdrawal symptoms are a reason to call, not to stop TB treatment.`},
 {id:'other',n:'Many others',sm:'statins, sedatives, diabetes, transplant',co:'co-prescribed drug',
  txt:`Oral midazolam, triazolam, simvastatin, verapamil and most dihydropyridine calcium-channel blockers become ineffective during rifampicin treatment. Sulfonylurea levels fall, and ciclosporin levels can drop enough to cause acute transplant rejection. Interactions reported between 2008 and 2012 included posaconazole, voriconazole, oxycodone and risperidone, and the list keeps growing. <sup class="c" data-ref="Niemi2003,Baciewicz2013" title="Source 19,353">19,353</sup>`,
  pt:`Tell every doctor, dentist and pharmacist that you take rifampicin, and check new medicines, including herbal and over-the-counter ones, with a pharmacist first.`}
];

inits.safety=()=>{
  const svg=$('#sfSvg'),rg=$('#sfT');let reg='std',setSt=()=>{};const off={};
  const drugsOf=()=>Object.keys(SF_REG[reg]);
  const given=(k,w)=>{const r=SF_REG[reg][k];return r&&!off[k]&&w>=r[0]&&w<r[1]};
  const rows=()=>SF_AE.filter(a=>a.d.some(k=>SF_REG[reg][k]&&!off[k]));
  function chips(){const el=$('#sfChips');el.innerHTML=`<span class="kicker">Show</span>`+drugsOf().map(k=>`<button class="btn" data-sfd="${k}" aria-pressed="${!off[k]}"><i style="background:${SF_DC[k]}"></i>${k} · ${SF_DN[k]}</button>`).join('')}
  $('#sfChips').addEventListener('click',e=>{const b=e.target.closest('[data-sfd]');if(!b)return;const k=b.dataset.sfd;off[k]=!off[k];b.setAttribute('aria-pressed',!off[k]);draw(+rg.value)});
  const typOf=a=>a.id==='liver'&&!a.d.some(k=>['H','R','Z'].includes(k)&&SF_REG[reg][k]&&!off[k])?null:a.typ;
  function level(a,w){if(!a.d.some(k=>given(k,w)))return 0;const ty=typOf(a);if(!ty)return a.id==='orange'?1:.8;return w>=ty[0]&&w<ty[1]?1:.4}
  function body(cx,top,H,lit){const X=u=>cx+u*H,Y=v=>top+v*H;let s='';
    const sk=lit.skin;
    s+=`<g style="fill:var(--panel-2);stroke:${sk?sk.col:'var(--muted)'};stroke-width:${sk?2.4:1.2};stroke-opacity:${sk?.9:.5}">`;
    s+=`<circle cx="${f1(X(0))}" cy="${f1(Y(.07))}" r="${f1(H*.062)}"/>`;
    s+=`<path d="M${f1(X(-.03))} ${f1(Y(.125))}L${f1(X(-.12))} ${f1(Y(.16))}Q${f1(X(-.15))} ${f1(Y(.17))} ${f1(X(-.155))} ${f1(Y(.21))}L${f1(X(-.2))} ${f1(Y(.5))}L${f1(X(-.17))} ${f1(Y(.51))}L${f1(X(-.11))} ${f1(Y(.27))}L${f1(X(-.1))} ${f1(Y(.52))}L${f1(X(-.085))} ${f1(Y(.97))}L${f1(X(-.025))} ${f1(Y(.97))}L${f1(X(0))} ${f1(Y(.57))}L${f1(X(.025))} ${f1(Y(.97))}L${f1(X(.085))} ${f1(Y(.97))}L${f1(X(.1))} ${f1(Y(.52))}L${f1(X(.11))} ${f1(Y(.27))}L${f1(X(.17))} ${f1(Y(.51))}L${f1(X(.2))} ${f1(Y(.5))}L${f1(X(.155))} ${f1(Y(.21))}Q${f1(X(.15))} ${f1(Y(.17))} ${f1(X(.12))} ${f1(Y(.16))}L${f1(X(.03))} ${f1(Y(.125))}Z"/></g>`;
    const o=(k,shape)=>{const L=lit[k];return shape(L?L.col:'var(--muted)',L?.25+.7*L.v:.12)};
    s+=o('eyes',(c,op)=>[-1,1].map(sg=>`<ellipse cx="${f1(X(sg*.022))}" cy="${f1(Y(.065))}" rx="${f1(H*.012)}" ry="${f1(H*.007)}" style="fill:${c};opacity:${f1(op)}"/>`).join(''));
    s+=o('heart',(c,op)=>`<path d="M${f1(X(.035))} ${f1(Y(.29))}C${f1(X(-.01))} ${f1(Y(.26))} ${f1(X(.0))} ${f1(Y(.215))} ${f1(X(.025))} ${f1(Y(.23))}C${f1(X(.05))} ${f1(Y(.21))} ${f1(X(.08))} ${f1(Y(.25))} ${f1(X(.035))} ${f1(Y(.29))}Z" style="fill:${c};opacity:${f1(op)}"/>`);
    s+=o('liver',(c,op)=>`<path d="M${f1(X(-.085))} ${f1(Y(.31))}Q${f1(X(-.02))} ${f1(Y(.295))} ${f1(X(.03))} ${f1(Y(.315))}Q${f1(X(-.02))} ${f1(Y(.36))} ${f1(X(-.08))} ${f1(Y(.355))}Z" style="fill:${c};opacity:${f1(op)}"/>`);
    s+=o('fluids',(c,op)=>[-1,1].map(sg=>`<ellipse cx="${f1(X(sg*.045))}" cy="${f1(Y(.39))}" rx="${f1(H*.013)}" ry="${f1(H*.022)}" style="fill:${c};opacity:${f1(op)}"/>`).join('')+`<ellipse cx="${f1(X(0))}" cy="${f1(Y(.5))}" rx="${f1(H*.022)}" ry="${f1(H*.016)}" style="fill:${c};opacity:${f1(op)}"/>`);
    s+=o('marrow',(c,op)=>[-1,1].map(sg=>`<rect x="${f1(X(sg*.055)-H*.009)}" y="${f1(Y(.58))}" width="${f1(H*.018)}" height="${f1(H*.14)}" rx="${f1(H*.009)}" style="fill:${c};opacity:${f1(op)}"/>`).join('')+`<rect x="${f1(X(0)-H*.008)}" y="${f1(Y(.17))}" width="${f1(H*.016)}" height="${f1(H*.08)}" rx="3" style="fill:${c};opacity:${f1(op*.8)}"/>`);
    s+=o('joints',(c,op)=>[-1,1].map(sg=>`<circle cx="${f1(X(sg*.055))}" cy="${f1(Y(.77))}" r="${f1(H*.016)}" style="fill:${c};opacity:${f1(op)}"/><circle cx="${f1(X(sg*.07))}" cy="${f1(Y(.965))}" r="${f1(H*.009)}" style="fill:${c};opacity:${f1(op)}"/>`).join(''));
    s+=o('nerves',(c,op)=>[-1,1].map(sg=>`<path d="M${f1(X(sg*.175))} ${f1(Y(.45))}L${f1(X(sg*.188))} ${f1(Y(.52))}M${f1(X(sg*.04))} ${f1(Y(.86))}L${f1(X(sg*.058))} ${f1(Y(.975))}" style="stroke:${c};stroke-width:${f1(H*.012)};stroke-linecap:round;opacity:${f1(op)}"/>`).join(''));
    s+=o('tendon',(c,op)=>[-1,1].map(sg=>`<line x1="${f1(X(sg*.06))}" x2="${f1(X(sg*.062))}" y1="${f1(Y(.9))}" y2="${f1(Y(.95))}" style="stroke:${c};stroke-width:${f1(H*.01)};stroke-linecap:round;opacity:${f1(op)}"/>`).join(''));
    return s}
  const ORG={eyes:{v:.065,u:.03,n:'Eyes'},heart:{v:.25,u:.06,n:'Heart'},liver:{v:.33,u:-.02,n:'Liver'},fluids:{v:.44,u:.06,n:'Urine, sweat, tears'},skin:{v:.4,u:.19,n:'Skin, whole body'},nerves:{v:.5,u:.19,n:'Nerves'},marrow:{v:.64,u:.07,n:'Bone marrow'},joints:{v:.77,u:.07,n:'Joints'},tendon:{v:.92,u:.07,n:'Tendons'}};
  const SLOT={eyes:.04,heart:.15,liver:.255,fluids:.36,skin:.465,nerves:.57,marrow:.675,joints:.78,tendon:.885};
  function draw(t){
    const N=vb(svg,'720 440','400 '+(372+rows().length*26+40));const w=t*26;let s='';
    const lit={};SF_AE.forEach(a=>{if(!a.d.some(k=>SF_REG[reg][k]&&!off[k]))return;const v=level(a,w);if(v>0&&(!lit[a.org]||lit[a.org].v<v))lit[a.org]={v,col:a.col,a}});
    const B=N?{cx:72,top:14,H:330,lx:150}:{cx:84,top:22,H:400,lx:162};
    s+=body(B.cx,B.top,B.H,lit);
    Object.keys(ORG).forEach(k=>{const O=ORG[k],L=lit[k],ox=B.cx+O.u*B.H,oy=B.top+O.v*B.H,sy=B.top+SLOT[k]*B.H;
      const ae=SF_AE.filter(a=>a.org===k&&a.d.some(d=>SF_REG[reg][d]&&!off[d]));if(!ae.length)return;
      const best=L?L.a:ae[0];
      s+=`<path d="M${f1(ox)} ${f1(oy)}L${f1(B.lx-6)} ${f1(sy-4)}" style="fill:none;stroke:${L?L.col:'var(--line)'};stroke-width:${L?1.2:.8};opacity:${L?.9:.6}"/>`;
      if(!N)s+=`<text x="${B.lx}" y="${f1(sy-6)}" class="t-xs" style="fill:${L?'var(--ink)':'var(--muted)'};font-weight:700;opacity:${L?1:.6}">${O.n.toUpperCase()}${L&&L.v<.5?' · less typical now':''}</text>`;
      s+=`<text x="${B.lx}" y="${f1(sy+(N?-2:6))}" class="t-xs" style="fill:${L?best.col:'var(--muted)'};opacity:${L?1:.5}">${best.n} · ${best.d.filter(d=>SF_REG[reg][d]).join(' ')}</text>`;
      if(L)s+=`<text x="${B.lx}" y="${f1(sy+(N?10:17))}" class="t-xs" style="opacity:.9">${best.f}${N&&L.v<.5?' · less typical now':''}</text>`});
    /* timeline */
    const R=rows(),T=N?{lx:8,x0:178,x1:390,y0:376,rh:26}:{lx:342,x0:500,x1:708,y0:40,rh:Math.min(40,340/Math.max(1,R.length))};
    const X=wk=>lerp(T.x0,T.x1,wk/26);
    s+=`<text x="${T.lx}" y="${T.y0-16}" class="t-sm">WHEN TO WATCH · ${reg==='std'?'2HRZE/4HR':reg==='hpzm'?'2HPMZ/2HPM':'BPaLM'}</text>`;
    R.forEach((a,i)=>{const y=T.y0+i*T.rh;const ds=a.d.filter(k=>SF_REG[reg][k]&&!off[k]);
      let ra=26,rb=0;ds.forEach(k=>{ra=Math.min(ra,SF_REG[reg][k][0]);rb=Math.max(rb,SF_REG[reg][k][1])});
      const now=level(a,w)>0;
      s+=`<text x="${T.lx}" y="${f1(y+T.rh*.5+3)}" class="t-xs" style="fill:${now?'var(--ink)':'var(--muted)'};font-weight:${now?700:500}">${a.n}</text>`;
      s+=`<rect x="${f1(X(ra))}" y="${f1(y+T.rh*.3)}" width="${f1(X(rb)-X(ra))}" height="${f1(T.rh*.4)}" rx="3" style="fill:${a.col};opacity:.22"/>`;
      const ty=typOf(a);if(ty){const ta=Math.max(ra,ty[0]),tb=Math.min(rb,ty[1]);if(tb>ta)s+=`<rect x="${f1(X(ta))}" y="${f1(y+T.rh*.3)}" width="${f1(X(tb)-X(ta))}" height="${f1(T.rh*.4)}" rx="3" style="fill:${a.col};opacity:.7"/>`}
      else s+=`<rect x="${f1(X(ra))}" y="${f1(y+T.rh*.3)}" width="${f1(X(rb)-X(ra))}" height="${f1(T.rh*.4)}" rx="3" style="fill:${a.col};opacity:.45"/>`;
      let mk=[];if(a.mon==='monthly'&&ds.some(k=>'HRE'.includes(k)&&k.length===1))for(let k=0;k<rb;k+=4)mk.push(k);if(a.mon==='weekly')for(let k=0;k<rb;k++)mk.push(k);if(a.mon==='ecg'&&reg==='bpalm')mk=[0,2,12,24];if(a.mon==='ecg'&&reg==='hpzm')mk=[];
      mk.forEach(k=>{const mx=X(k)+1,my=y+T.rh*.5;s+=a.mon==='ecg'?`<path d="M${f1(mx)} ${f1(my-5)}l4 5l-4 5l-4 -5z" style="fill:var(--ink)"/>`:`<circle cx="${f1(mx)}" cy="${f1(my)}" r="${a.mon==='weekly'?1.5:2.4}" style="fill:var(--ink);opacity:.75"/>`});
      let cxr=T.x0-6;ds.slice().reverse().forEach(k=>{s+=`<text x="${f1(cxr)}" y="${f1(y+T.rh*.5+3)}" class="t-xs t-end" style="fill:${SF_DC[k]};font-weight:700">${k}</text>`;cxr-=k.length*6.5+4})});
    const yb=T.y0+R.length*T.rh+4;
    [0,4,8,12,16,20,24].forEach(k=>s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${T.y0}" y2="${yb}" class="grid"/><text x="${f1(X(k))}" y="${yb+12}" class="t-xs t-mid">${k}</text>`);
    s+=`<text x="${T.x1}" y="${yb+24}" class="t-xs t-end">weeks</text>`;
    s+=`<text x="${T.lx}" y="${yb+24}" class="t-xs">● check  ◆ ECG  dark = typical window</text>`;
    s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${T.y0-6}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.4;opacity:.45"/>`;
    if(!R.length)s+=`<text x="${f1((T.x0+T.x1)/2)}" y="${T.y0+20}" class="t-xs t-mid">all drugs hidden</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(SF_ST,t);setSt(ph);$('#sfNote').innerHTML=noteHTML(SF_ST[ph]);
    const gv=drugsOf().filter(k=>given(k,w)),nowAE=R.filter(a=>level(a,w)>=.8).map(a=>a.n.toLowerCase());
    $('#sfRead').innerHTML=`<span>week <b>${f1(w)}</b></span><span>drugs given <b>${gv.length?gv.join(' '):'none'}</b></span><span>in typical window <b>${nowAE.length?nowAE.join(', '):'none'}</b></span>`;
  }
  const stop=playWire(rg,$('#sfPlay'),draw,22000,'Replay','safety');
  setSt=stepWire($('#sfSteps'),SF_ST,rg,draw,stop);
  $$('[data-sfr]').forEach(b=>b.addEventListener('click',()=>{reg=b.dataset.sfr;$$('[data-sfr]').forEach(x=>x.setAttribute('aria-pressed',x===b));Object.keys(off).forEach(k=>delete off[k]);chips();draw(+rg.value)}));
  chips();draw(+rg.value);

  /* ---- hepatotoxicity tree ---- */
  const tr=$('#sfTree'),ar=$('#sfAlt');let sym=false;
  function drawTree(){const N=vb(tr,'720 380','400 430');const alt=+ar.value;let s='';
    const lim=sym?3:5,stopIt=alt>lim;
    const tc=N?'t-xs':'t-sm';const box=(x,y,w,h,l1,l2,on,col)=>`<rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${w}" height="${h}" rx="9" style="fill:${on?(col||'var(--rx-soft)'):'var(--panel-2)'};stroke:${on?'var(--ink)':'var(--line)'};stroke-width:${on?1.6:1};opacity:${on?1:.6}"/><text x="${f1(x)}" y="${f1(y+(l2?-3:4))}" class="${tc} t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${l1}</text>${l2?`<text x="${f1(x)}" y="${f1(y+10)}" class="${tc} t-mid" style="fill:var(--ink)">${l2}</text>`:''}`;
    const ln=(x1,y1,x2,y2,on,lbl)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="stroke:${on?'var(--ink)':'var(--line)'};stroke-width:${on?2:1}"/>${lbl?`<text x="${f1((x1+x2)/2+(x2<x1?-6:6))}" y="${f1((y1+y2)/2)}" class="t-xs ${x2<x1?'t-end':''}" style="fill:${on?'var(--ink)':'var(--muted)'}">${lbl}</text>`:''}`;
    const G=N?{c:200,r0:28,q:88,b:156,l:232,rs:300,bw:176,lw:84,lx:[52,148,252,348],bx:[100,300],gy:390}:{c:360,r0:28,q:90,b:160,l:236,rs:304,bw:200,lw:150,lx:[95,265,455,625],bx:[180,540],gy:350};
    s+=box(G.c,G.r0,N?260:300,30,'ALT rise during TB treatment','',true,'var(--panel)');
    s+=ln(G.c,G.r0+15,G.c,G.q-16,true);
    s+=box(G.c,G.q,N?220:240,32,'Symptoms or jaundice?','',true,'var(--panel)');
    s+=ln(G.c-40,G.q+16,G.bx[0],G.b-16,sym,'yes')+ln(G.c+40,G.q+16,G.bx[1],G.b-16,!sym,'no');
    s+=box(G.bx[0],G.b,G.bw,32,'ALT more than 3× ULN?','',sym)+box(G.bx[1],G.b,G.bw,32,'ALT more than 5× ULN?','',!sym);
    const lf=[[0,true],[0,false],[1,true],[1,false]];
    lf.forEach((q,i)=>{const on=(q[0]===0?sym:!sym)&&(q[1]===stopIt);const x=G.lx[i];
      s+=ln(G.bx[q[0]],G.b+16,x,G.l-17,on,q[1]?'yes':'no');
      s+=box(x,G.l,G.lw,34,q[1]?(N?'Interrupt':'Interrupt treatment'):(N?'Rule not met':'Interruption rule'),q[1]?(N?'(ATS)':'(ATS statement)'):(N?'':'not met'),on,q[1]?'var(--bad-soft)':'var(--good-soft)')});
    s+=ln(G.lx[sym?0:2],G.l+17,G.c,G.rs-17,stopIt);
    s+=box(G.c,G.rs,N?370:520,34,N?'Then: usually a modified or alternative regimen':'Then: usually a modified or alternative regimen when restarting',N?'(clinician decides how to reintroduce)':'full-dose and stepwise reintroduction recurred at similar rates',stopIt,'var(--warn-soft)');
    /* gauge */
    const gx0=N?30:160,gx1=N?370:560,gy=G.gy,gX=v=>lerp(gx0,gx1,(v-1)/9);
    s+=`<rect x="${gx0}" y="${gy}" width="${gx1-gx0}" height="10" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${gx0}" y="${gy}" width="${f1(gX(alt)-gx0)}" height="10" rx="5" style="fill:${stopIt?'var(--bad)':'var(--warn)'}"/>`;
    [[3,'3×'],[5,'5×']].forEach(q=>s+=`<line x1="${f1(gX(q[0]))}" x2="${f1(gX(q[0]))}" y1="${gy-5}" y2="${gy+15}" style="stroke:var(--ink);stroke-width:${q[0]===lim?2:1};stroke-dasharray:${q[0]===lim?'none':'2 2'}"/><text x="${f1(gX(q[0]))}" y="${gy+27}" class="t-xs t-mid">${q[1]}</text>`);
    s+=`<text x="${gx0}" y="${gy-(N?22:8)}" class="t-xs" style="fill:var(--ink)">ALT ${f1(alt)} × upper limit of normal</text><text x="${N?gx0:gx1}" y="${gy-8}" class="t-xs ${N?'':'t-end'}">threshold ${lim}× ${sym?'(with symptoms)':'(no symptoms)'}</text>`;
    tr.innerHTML=s;
    const v=$('#sfVerdict');v.className='verdict '+(stopIt?'no':'yes');
    v.textContent=stopIt?`ALT ${f1(alt)}× ULN ${sym?'with symptoms or jaundice':'without symptoms'}: above the ATS threshold of ${lim}×. The statement says treatment should be interrupted.`:`ALT ${f1(alt)}× ULN ${sym?'with symptoms or jaundice':'without symptoms'}: below the ATS interruption threshold of ${lim}×. The clinician decides how closely to watch.`;
  }
  $('#sfTreeNote').innerHTML=noteHTML({k:'ATS statement, 2006',t:'3× with symptoms, 5× without',
    txt:`The ATS hepatotoxicity statement says treatment should be interrupted, and usually a modified or alternative regimen used, when ALT is more than 3 times the upper limit of normal with symptoms or jaundice, or more than 5 times without symptoms. The isoniazid label advises strongly considering stopping if enzymes exceed 3 to 5 times normal. After drug-induced hepatitis, restarting isoniazid, rifampicin and pyrazinamide all at full dose from day 1 led to recurrence at similar rates to two stepwise schemes: 19 of 175 people overall (10.9%). <sup class="c" data-ref="Saukkonen2006,FDA-Isoniazid,Sharma2010DILI" title="Source 160,412,425">160,412,425</sup>`,
    pt:`A small rise in a liver test is common and often settles. A bigger rise, or any rise with yellow eyes, dark urine or feeling sick, means the medicines are paused while the liver recovers. TB treatment then restarts, sometimes with different medicines.`,
    hook:`Interrupt at ALT >3× ULN with symptoms/jaundice, or >5× ULN without. <sup class="c" data-ref="Saukkonen2006" title="Source 412">412</sup>`});
  ar.addEventListener('input',drawTree);
  $('#sfSym').addEventListener('click',()=>{sym=!sym;$('#sfSym').setAttribute('aria-pressed',sym);drawTree()});
  drawTree();

  /* ---- rifampicin interactions ---- */
  const is=$('#sfInd'),ir=$('#sfIndT');let it='contra';
  $('#sfInt').innerHTML=SF_INT.map(c=>`<button data-sfi="${c.id}" aria-pressed="${c.id===it}"><b>${c.n}</b><small>${c.sm}</small></button>`).join('');
  const ind=w=>{const on=2,offW=10;if(w<on)return 0;if(w<offW)return 1-Math.exp(-(w-on)*3);const e0=1-Math.exp(-(offW-on)*3);return e0*Math.exp(-(w-offW)*1.5)};
  function drawInd(t){const N=vb(is,'720 260','400 300');const c=SF_INT.find(q=>q.id===it),W=16,w=t*W;let s='';
    const C=N?{x0:44,x1:388,y0:40,y1:240}:{x0:70,x1:700,y0:40,y1:210};const X=v=>lerp(C.x0,C.x1,v/W),V=v=>lerp(C.y1,C.y0,v);
    s+=`<rect x="${f1(X(2))}" y="${C.y0-22}" width="${f1(X(10)-X(2))}" height="16" rx="4" style="fill:var(--dR);opacity:.85"/><text x="${f1((X(2)+X(10))/2)}" y="${C.y0-10}" class="t-xs t-mid" style="fill:#fff;font-weight:700">RIFAMPICIN TAKEN</text>`;
    [0,.5,1].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/>`);
    for(let k=0;k<=W;k+=2)s+=`<text x="${f1(X(k))}" y="${C.y1+14}" class="t-xs t-mid">${k}</text>`;
    s+=`<text x="${C.x1}" y="${C.y1+26}" class="t-xs t-end">weeks</text><text x="${C.x0-6}" y="${f1(V(1)+3)}" class="t-xs t-end">high</text><text x="${C.x0-6}" y="${f1(V(0)+3)}" class="t-xs t-end">low</text>`;
    const p=f=>{let d='';const n=Math.max(2,Math.round(w*8));for(let i=0;i<=n;i++){const u=w*i/n;d+=(i?'L':'M')+f1(X(u))+' '+f1(V(f(u)))}return d};
    s+=`<path d="${p(u=>.1+.8*ind(u))}" style="fill:none;stroke:var(--dR);stroke-width:2.4;stroke-dasharray:6 3"/>`;
    s+=`<path d="${p(u=>.85-.65*ind(u))}" style="fill:none;stroke:var(--accent);stroke-width:3"/>`;
    s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    if(w>3)s+=`<text x="${f1(X(3.4))}" y="${f1(V(.6))}" class="t-xs" style="fill:var(--dR)">enzymes induced (~1 wk)</text>`;
    if(w>11)s+=`<text x="${f1(X(11.6))}" y="${f1(V(.5))}" class="t-xs" style="fill:var(--ink)">wears off (~2 wk)</text>`;
    s+=`<text x="${C.x0}" y="${C.y1+(N?40:42)}" class="t-xs" style="fill:var(--accent);font-weight:700">— level of ${c.co} (schematic)</text>`;
    is.innerHTML=s}
  function noteI(){const c=SF_INT.find(q=>q.id===it);$('#sfIntNote').innerHTML=noteHTML({k:'Rifampicin interaction',t:c.n,txt:c.txt,pt:c.pt+' Always check with a pharmacist.',hook:`Rifampicin is a strong CYP3A4 inducer: hormonal contraception may fail, methadone withdrawal follows, warfarin and protease inhibitor levels fall. <sup class="c" data-ref="Niemi2003,FDA-Rifampin" title="Source 168,353">168,353</sup>`})}
  $('#sfInt').addEventListener('click',e=>{const b=e.target.closest('[data-sfi]');if(!b)return;it=b.dataset.sfi;$$('[data-sfi]').forEach(x=>x.setAttribute('aria-pressed',x===b));noteI();drawInd(+ir.value)});
  playWire(ir,$('#sfIndPlay'),drawInd,7000,'Replay','safety');
  noteI();drawInd(+ir.value);
  redraws.safety=(()=>{const p=redraws.safety;return()=>{p&&p();drawTree();drawInd(+ir.value)}})();
};
/* =============== 3.6 TB with HIV, in children & pregnancy =============== */
const HV_STEPS=[
 {from:0,at:.1,k:'Years with untreated HIV',t:'HIV removes TB\'s defenders',
  txt:`HIV is the strongest known risk factor for progressing from TB infection to TB disease <sup class="c" data-ref="Suthar2012" title="Source 452">452</sup>. <i>M. tuberculosis</i>-specific CD4 T cells are depleted rapidly after HIV infection, while other memory T cells persist <sup class="c" data-ref="Geldmacher2010" title="Source 195">195</sup>, and in South African gold miners TB risk rose unexpectedly soon after HIV seroconversion <sup class="c" data-ref="Sonnenberg2005" title="Source 437">437</sup>. In a methadone-programme cohort, people with HIV and a positive tuberculin test developed TB at 7.9 per 100 person-years, against 0.3 for people with HIV and a negative test <sup class="c" data-ref="Selwyn1989" title="Source 420">420</sup>. The CD4 and risk curves here are drawn shapes, not data.`,
  pt:`HIV weakens exactly the immune cells that keep TB locked away, so TB can wake up.`,
  hook:`HIV raises the risk of TB disease, not of becoming infected: tuberculin positivity was similar with and without HIV <sup class="c" data-ref="Selwyn1989" title="Source 420">420</sup>.`},
 {from:.2,at:.3,k:'TB disease',t:'TB appears, often hidden',
  txt:`In 2024, an estimated 150 000 of the 1.23 million TB deaths were among people with HIV <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>. In autopsy studies of adults with HIV in resource-limited settings, TB was found in a pooled 39.7% of bodies, disseminated in 87.9% of those cases and undiagnosed at death in 45.8% <sup class="c" data-ref="GuptaRK2015AIDS" title="Source 212">212</sup>. ART lowers TB incidence at every CD4 level (hazard ratio 0.35 overall) <sup class="c" data-ref="Suthar2012" title="Source 452">452</sup>. A urine LAM test helps find TB in people with advanced HIV: see <a href="#diagnose" data-go="diagnose">Diagnosing TB disease</a>.`,
  pt:`TB is a leading cause of death in people with HIV, and it is often missed.`,
  hook:`Nearly half of TB found at autopsy in adults with HIV had not been diagnosed in life (45.8%) <sup class="c" data-ref="GuptaRK2015AIDS" title="Source 212">212</sup>.`},
 {from:.36,at:.44,k:'Week 0',t:'TB treatment starts',
  txt:`TB treatment comes first. Daily co-trimoxazole for people with HIV and smear-positive TB in Abidjan reduced deaths from 25.4 to 13.8 per 100 person-years <sup class="c" data-ref="Wiktor1999" title="Source 520">520</sup>. Rifampicin speeds up the breakdown of many drugs, including dolutegravir: the US label says to give dolutegravir twice daily with rifampin in INSTI-naive adults <sup class="c" data-ref="FDA-Tivicay" title="Source 170">170</sup>, based on a study in which 50 mg twice daily with rifampin matched once-daily exposure without it <sup class="c" data-ref="Dooley2013" title="Source 134">134</sup>.`,
  pt:`TB medicines start first. Some HIV medicines need a dose change while TB medicines are taken.`,
  hook:`Dolutegravir goes twice daily with rifampicin <sup class="c" data-ref="FDA-Tivicay,Dooley2013" title="Source 134,170">134,170</sup>.`},
 {from:.5,at:.62,k:'Weeks 2 to 8, or later',t:'When to start ART',
  txt:`WHO recommends starting ART as soon as possible within 2 weeks of starting TB treatment, regardless of CD4 count (strong recommendation), except when there are signs of meningitis <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>. Starting ART can unmask a burst of inflammation as the immune system recovers: paradoxical TB-IRIS, which affected a pooled 18% of people starting ART, with 25% of them admitted to hospital and 2% of deaths attributed to it <sup class="c" data-ref="Namale2015" title="Source 339">339</sup>. The window drawn after ART starts is schematic. Prednisone for 4 weeks in PredART (CD4 ≤100) lowered TB-IRIS from 46.7% to 32.5% <sup class="c" data-ref="Meintjes2018" title="Source 319">319</sup>.`,
  pt:`HIV medicines usually start within two weeks of TB medicines. A temporary flare of symptoms can follow, and it is usually manageable.`,
  hook:`TB-IRIS ≈ 18% after ART starts; prophylactic prednisone cut it by about 30% (RR 0.70) <sup class="c" data-ref="Namale2015,Meintjes2018" title="Source 319,339">319,339</sup>.`},
 {from:.76,at:.92,k:'SAPIT · CAMELIA · STRIDE',t:'Early ART saves lives',
  txt:`SAPIT: starting ART during TB treatment cut deaths from 12.1 to 5.4 per 100 person-years compared with waiting until it ended (HR 0.44) <sup class="c" data-ref="AbdoolKarim2010" title="Source 1">1</sup>. CAMELIA (median CD4 25): ART at 2 rather than 8 weeks reduced deaths from 27% to 18% (HR 0.62) but raised TB-IRIS (HR 2.51) <sup class="c" data-ref="Blanc2011" title="Source 43">43</sup>. STRIDE: overall, AIDS or death 12.9% vs 16.1% (not significant), but 15.5% vs 26.6% with CD4 below 50; TB-IRIS 11% vs 5% <sup class="c" data-ref="Havlir2011" title="Source 222">222</sup>. In SAPIT's CD4 below 50 group, AIDS or death was 8.5 vs 26.3 per 100 person-years, and IRIS 20.1 vs 7.7 <sup class="c" data-ref="AbdoolKarim2011" title="Source 2">2</sup>.`,
  pt:`Starting HIV medicines early during TB treatment saves lives, most of all for people with very low CD4 counts.`,
  hook:`CAMELIA: ART at 2 weeks vs 8 weeks cut mortality from 27% to 18% <sup class="c" data-ref="Blanc2011" title="Source 43">43</sup>. The lower the CD4, the bigger the benefit of early ART.`}];

inits.special=()=>{
  const svg=$('#hvSvg'),rg=$('#hvT');let art='early',cd='low',setSt=()=>{};
  /* schematic CD4 (cells/µL) and relative TB risk over years of untreated HIV */
  const cd4=y=>800*Math.exp(-y*.33);
  function draw(t){const N=vb(svg,'720 400','400 690'),ph=phaseOf(HV_STEPS,t);
    const A=N?{x0:46,x1:384,y0:70,y1:196}:{x0:56,x1:430,y0:72,y1:186};
    const B=N?{x0:46,x1:384,y0:252,y1:352}:{x0:56,x1:430,y0:250,y1:346};
    const C=N?{x0:20,x1:384,y0:404,y1:640}:{x0:470,x1:704,y0:56,y1:388};
    let s=`<defs>${marker('hvArr','var(--muted)')}</defs><text x="${N?16:24}" y="24" class="t-big">${HV_STEPS[ph].t}</text><text x="${N?16:24}" y="42" class="t-sm">${HV_STEPS[ph].k}</text>`;
    /* ---- panel A: years ---- */
    const yDx=cd==='low'?8.8:5,yr=lerp(0,yDx,ramp(t,0,.3)),X=y=>lerp(A.x0,A.x1,y/10),Yc=v=>lerp(A.y1,A.y0,Math.min(v,900)/900);
    s+=`<text x="${A.x0-40}" y="${A.y0-10}" class="t-sm">YEARS WITH HIV, NO ART (SCHEMATIC)</text>`;
    [0,200,500,800].forEach(v=>s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${f1(Yc(v))}" y2="${f1(Yc(v))}" class="${v?'grid':'axis'}"/><text x="${A.x0-5}" y="${f1(Yc(v)+3)}" class="t-xs t-end">${v}</text>`);
    [0,2,4,6,8,10].forEach(y=>s+=`<text x="${f1(X(y))}" y="${A.y1+12}" class="t-xs t-mid">${y}</text>`);
    s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${f1(Yc(50))}" y2="${f1(Yc(50))}" style="stroke:var(--bad);stroke-dasharray:4 3;opacity:.8"/><text x="${A.x1}" y="${f1(Yc(50)-3)}" class="t-xs t-end" style="fill:var(--bad)">CD4 50</text>`;
    if(yr>0){s+=`<path d="${pathFn(u=>Math.min(900,Math.max(0,cd4(u*yr)))/900,A.x0,X(yr),A.y1,A.y0,80)}" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>`;
      s+=`<path d="${pathFn(u=>.06+.88*Math.pow(u*yr/10,1.6)+.1*ramp(u*yr,0,.6),A.x0,X(yr),A.y1,A.y0,80)}" style="fill:none;stroke:var(--tb);stroke-width:2.4;stroke-dasharray:6 3"/>`;
      s+=`<circle cx="${f1(X(yr))}" cy="${f1(Yc(Math.max(0,cd4(yr))))}" r="4" style="fill:var(--accent)"/>`}
    s+=`<text x="${A.x0+6}" y="${A.y0+10}" class="t-xs" style="fill:var(--accent)">— CD4 count (cells/µL)</text><text x="${A.x0+6}" y="${A.y0+23}" class="t-xs" style="fill:var(--tb)">- - TB risk (relative, drawn)</text>`;
    if(t>=.2){const px=X(yDx),py=Yc(Math.max(0,cd4(yDx)));s+=`<g style="opacity:${f1(ramp(t,.2,.26))}"><circle cx="${f1(px)}" cy="${f1(py)}" r="9" style="fill:none;stroke:var(--tb);stroke-width:2"/><text x="${f1(px-12)}" y="${f1(py-16)}" class="t-lbl t-end" style="fill:var(--tb);paint-order:stroke;stroke:var(--panel);stroke-width:4">TB disease · CD4 ≈ ${Math.round(cd4(yDx)/10)*10}</text></g>`}
    s+=`<text x="${A.x1}" y="${A.y1+24}" class="t-xs t-end">years</text>`;
    /* ---- panel B: weeks from TB treatment start ---- */
    const kB=ramp(t,.34,.42),wk=lerp(0,32,ramp(t,.36,.74)),W=w=>lerp(B.x0,B.x1,w/32);
    s+=`<g style="opacity:${f1(.25+.75*kB)}"><text x="${B.x0-40}" y="${B.y0-12}" class="t-sm">WEEKS FROM STARTING TB TREATMENT</text>`;
    [0,2,8,26,32].forEach(w=>s+=`<line x1="${f1(W(w))}" x2="${f1(W(w))}" y1="${B.y0}" y2="${B.y1}" class="${w?'grid':'axis'}"/><text x="${f1(W(w))}" y="${B.y1+12}" class="t-xs t-mid">${w}</text>`);
    s+=`<rect x="${f1(W(0))}" y="${B.y0+6}" width="${f1(W(Math.min(wk,26))-W(0))}" height="20" rx="5" style="fill:var(--rx);opacity:.85"/><text x="${f1(W(0)+6)}" y="${B.y0+20}" class="t-xs" style="fill:#0f1f17">TB treatment (6 months)</text>`;
    const aw=art==='early'?2:8;
    [ [2,'early: week 2'],[8,'later: week 8'],[27,'SAPIT sequential: after TB treatment']].forEach(([w,l],i)=>{const sel=(art==='early'&&i===0)||(art==='late'&&i===1),x=W(w),ry=B.y0+36+i*(N?19:18);
      const show=wk>=w||sel&&t>=.5;
      s+=`<g style="opacity:${show?(sel?1:.4):.12}"><rect x="${f1(x)}" y="${ry}" width="${f1(Math.max(0,W(Math.min(32,Math.max(w,wk)))-x))}" height="12" rx="4" style="fill:var(--vax);opacity:${sel?.9:.5}"/><text x="${f1(i===2?x-4:x+4)}" y="${ry+10}" class="t-xs${i===2?' t-end':''}" style="fill:var(--ink)">ART ${l}</text></g>`});
    if(t>=.5&&wk>=aw){const k=ramp(wk,aw,aw+1);s+=`<rect x="${f1(W(aw))}" y="${B.y0}" width="${f1(W(aw+5)-W(aw))}" height="${B.y1-B.y0}" style="fill:var(--warn);opacity:${f1(.18*k)}"/><text x="${f1(W(aw))}" y="${B.y1+25}" class="t-xs" style="fill:var(--warn)">▲ TB-IRIS window after ART starts (drawn)</text>`}
    s+=`<line x1="${f1(W(wk))}" x2="${f1(W(wk))}" y1="${B.y0}" y2="${B.y1}" style="stroke:var(--ink);opacity:.35"/></g>`;
    /* ---- panel C: trial outcomes ---- */
    const kC=ramp(t,.76,.88),low=cd==='low';
    const D=low?[
      {tr:'SAPIT, CD4 <50',u:'AIDS/death per 100 py',e:8.5,l:26.3,lab:['earlier','later']},
      {tr:'STRIDE, CD4 <50',u:'AIDS or death, %',e:15.5,l:26.6,lab:['earlier','later']},
      {tr:'CAMELIA, median CD4 25',u:'deaths, %',e:18,l:27,lab:['week 2','week 8']}]
     :[{tr:'SAPIT, CD4 <500',u:'deaths per 100 py',e:5.4,l:12.1,lab:['during TB Rx','after']},
      {tr:'STRIDE, CD4 <250',u:'AIDS or death, % (n.s.)',e:12.9,l:16.1,lab:['earlier','later']},
      {tr:'CAMELIA, median CD4 25',u:'deaths, %',e:18,l:27,lab:['week 2','week 8']}];
    const I=low?[{tr:'SAPIT CD4 <50 (per 100 py)',e:20.1,l:7.7},{tr:'STRIDE (%)',e:11,l:5}]:[{tr:'STRIDE (%)',e:11,l:5},{tr:'pooled, 40 studies (%)',e:18,l:null}];
    s+=`<text x="${C.x0}" y="${C.y0+4}" class="t-sm">${low?'CD4 BELOW 50':'ALL CD4 LEVELS STUDIED'}</text>`;
    const gh=N?44:52,mx=30,BW=v=>v/mx*(C.x1-C.x0-96);
    D.forEach((d,i)=>{const y=C.y0+20+i*gh;s+=`<text x="${C.x0}" y="${y+8}" class="t-xs" style="fill:var(--ink)">${d.tr} · ${d.u}</text>`;
      [ ['e',d.e,d.lab[0]],['l',d.l,d.lab[1]]].forEach(([k,v,lb],j)=>{const sel=(art==='early')===(k==='e'),yy=y+13+j*14;
        s+=`<text x="${C.x0+60}" y="${yy+9}" class="t-xs t-end">${lb}</text><rect x="${C.x0+64}" y="${yy}" width="${f1(BW(v)*kC)}" height="11" rx="3" style="fill:${k==='e'?'var(--rx)':'var(--muted)'};opacity:${sel?1:.45};stroke:${sel?'var(--ink)':'none'}"/>`;
        if(kC>.95)s+=`<text x="${f1(C.x0+68+BW(v))}" y="${yy+9}" class="t-xs" style="fill:var(--ink)">${v}</text>`})});
    const iy=C.y0+20+D.length*gh+14;
    s+=`<text x="${C.x0}" y="${iy}" class="t-sm" style="fill:var(--warn)">THE TRADE-OFF: TB-IRIS</text>`;
    I.forEach((d,i)=>{const y=iy+12+i*(N?40:44);s+=`<text x="${C.x0}" y="${y+6}" class="t-xs" style="fill:var(--ink)">${d.tr}</text>`;
      [ ['e',d.e,'earlier'],['l',d.l,'later']].forEach(([k,v,lb],j)=>{if(v==null)return;const yy=y+11+j*14,sel=(art==='early')===(k==='e');
        s+=`<text x="${C.x0+60}" y="${yy+9}" class="t-xs t-end">${d.l==null?'starting ART':lb}</text><rect x="${C.x0+64}" y="${yy}" width="${f1(BW(v)*kC)}" height="11" rx="3" style="fill:${k==='e'?'var(--warn)':'var(--muted)'};opacity:${sel||d.l==null?1:.45}"/>`;
        if(kC>.95)s+=`<text x="${f1(C.x0+68+BW(v))}" y="${yy+9}" class="t-xs" style="fill:var(--ink)">${v}</text>`})});
    if(kC<.05)s+=`<text x="${C.x1}" y="${C.y0+4}" class="t-xs t-end" style="fill:var(--warn)">bars fill in at step 5</text>`;
    svg.innerHTML=s;setSt(ph);
    $('#hvNote').innerHTML=noteHTML(HV_STEPS[ph]);
    $('#hvRead').innerHTML=`<span>ART <b>${art==='early'?'early (within 2 weeks)':'deferred (week 8)'}</b></span><span>CD4 group <b>${low?'below 50':'all levels'}</b></span><span>highlighted bars <b>${art==='early'?'early-ART arms':'later-ART arms'}</b></span>`;
  }
  const stop=playWire(rg,$('#hvPlay'),draw,24000,'Replay','special');
  setSt=stepWire($('#hvSteps'),HV_STEPS,rg,draw,stop);
  $$('[data-art]').forEach(b=>b.addEventListener('click',()=>{art=b.dataset.art;$$('[data-art]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-cd]').forEach(b=>b.addEventListener('click',()=>{cd=b.dataset.cd;$$('[data-cd]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- children: age bands ---- */
  const kid=$('#hvKid');let ag=0,era='pre';
  const AG=[{n:'under 1',a:0,b:1,m:'often',u5:1},{n:'1–2 years',a:1,b:2,m:'often',u5:1},{n:'2–5 years',a:2,b:5,m:'rare',u5:1},{n:'5–10 years',a:5,b:10,m:'rare',u5:0},{n:'over 10',a:10,b:15,m:'adult',u5:0}];
  const MT={often:['Often serious, and fast','Before age 2, primary infection often progressed to serious disease within 12 months, with little warning'],rare:['Rarely progressed','Between ages 2 and 10, infection rarely progressed to serious disease'],adult:['Often adult-type disease','After age 10, infection often led to adult-type (cavitary) disease']};
  function drawK(){const N=vb(kid,'720 300','400 '+(AG[ag].u5?450:340)),g=AG[ag];let s='';
    const R=N?{x0:20,x1:380,y:40}:{x0:24,x1:696,y:40},BX=[0,1,2,5,10,15],XA=a=>{const i=Math.max(0,BX.findIndex(v=>v>=a)-1),j=Math.min(i+1,5);return lerp(R.x0,R.x1,(i+(a-BX[i])/(BX[j]-BX[i]||1))/5)};
    s+=`<text x="${R.x0}" y="18" class="t-sm">${N?'AGE AT INFECTION (MARAIS 2004)':'AGE AT INFECTION · PRE-TREATMENT-ERA PATTERN (MARAIS 2004)'}</text>`;
    AG.forEach((b,i)=>{const on=i===ag,c=b.m==='often'?'var(--bad)':b.m==='rare'?'var(--good)':'var(--warn)';
      s+=`<rect x="${f1(XA(b.a)+1)}" y="${R.y}" width="${f1(XA(b.b)-XA(b.a)-2)}" height="26" rx="5" style="fill:${c};fill-opacity:${on?.85:.22};stroke:${on?'var(--ink)':'none'};stroke-width:1.5"/>`;
      s+=`<text x="${f1((XA(b.a)+XA(b.b))/2)}" y="${R.y+17}" class="t-xs t-mid" style="fill:${on?'#141414':'var(--ink)'}">${b.n}</text>`});
    [0,1,2,5,10,15].forEach(a=>s+=`<text x="${f1(XA(a))}" y="${R.y+40}" class="t-xs t-mid">${a}</text>`);
    s+=`<text x="${R.x0}" y="${R.y+62}" class="t-lbl" style="fill:var(--ink)">${g.n}: ${MT[g.m][0]}</text>`;
    /* two icon arrays */
    const arr=(x,y,cols,sz,n,col,title,cap)=>{let o=`<text x="${x}" y="${y-8}" class="t-sm">${title}</text>`;
      for(let j=0;j<100;j++){const cx=x+(j%cols)*(sz+3)+sz/2,cy=y+Math.floor(j/cols)*(sz+3)+sz/2;o+=person(cx,cy-sz/2,sz,j<Math.round(n)?col:'var(--line)')}
      return o+`<text x="${x}" y="${y+Math.ceil(100/cols)*(sz+3)+12}" class="t-xs">${cap}</text>`};
    const P1=N?{x:20,y:142,cols:20,sz:14}:{x:24,y:140,cols:20,sz:12.5},P2=N?{x:20,y:g.u5?330:220,cols:20,sz:14}:{x:376,y:140,cols:20,sz:12.5};
    if(g.u5)s+=arr(P1.x,P1.y,P1.cols,P1.sz,19,'var(--tb)','TB WITHIN 2 YEARS · UNDER 5','19 in 100: infection-test positive, no preventive treatment');
    else s+=`<text x="${P1.x}" y="${P1.y-8}" class="t-sm">TB WITHIN 2 YEARS</text><text x="${P1.x}" y="${P1.y+14}" class="t-xs" style="fill:var(--ink)">The cited 19% figure is for children under 5.</text><text x="${P1.x}" y="${P1.y+30}" class="t-xs" style="fill:var(--ink)">No age-specific figure for this band</text><text x="${P1.x}" y="${P1.y+46}" class="t-xs" style="fill:var(--ink)">in this guide's sources.</text>`;
    const cf=era==='pre'?(g.b<=5?43.6:14.9):.9;
    s+=arr(P2.x,P2.y,P2.cols,P2.sz,cf,'var(--bad)',era==='pre'?`DIED · BEFORE TREATMENT EXISTED`:'DIED · WITH TREATMENT, RECENT ERA',era==='pre'?`${cf} in 100, ages ${g.b<=5?'0–4':'5–14'} (pooled)`:'0.9 in 100, ages 0–14 (pooled)');
    kid.innerHTML=s;
    $('#hvKidNote').innerHTML=noteHTML({k:'Children · '+g.n,t:MT[g.m][0],
      txt:`${MT[g.m][1]} in the pre-chemotherapy literature; children with HIV behaved like children under 2 <sup class="c" data-ref="Marais2004" title="Source 304">304</sup>. ${g.u5?`Among exposed children under 5 with a positive infection test and no preventive treatment, 2-year TB incidence was 19.0% (95% CI 8.4–37.4); preventive treatment was 91% effective in infection-test-positive children, and 83% of under-5s who developed TB were diagnosed within 90 days of the first visit <sup class="c" data-ref="Martinez2020Lancet" title="Source 311">311</sup>.`:'Infection after age 10 often leads to the adult form, with cavities and infectious cough <sup class="c" data-ref="Marais2004" title="Source 304">304</sup>.'} Before treatment existed, pooled case fatality was 43.6% at ages 0–4 and 14.9% at ages 5–14; with treatment it was 0.9% <sup class="c" data-ref="Jenkins2017" title="Source 248">248</sup>. Up to 15% of childhood TB may present as TB meningitis; in 1636 children with TB meningitis, 19.3% died and 53.9% of survivors had neurological sequelae <sup class="c" data-ref="WHO-Mod5-2022,Chiang2014" title="Source 72,516">72,516</sup>.`,
      pt:`Babies and young children who live with someone who has TB should be checked quickly, because they can get very sick fast. With treatment, almost all children survive.`,
      hook:`Under 2 (and children with HIV): highest risk of severe disease. 2–10: lowest. Over 10: adult-type disease <sup class="c" data-ref="Marais2004" title="Source 304">304</sup>.`});
  }
  $$('[data-ag]').forEach(b=>b.addEventListener('click',()=>{ag=+b.dataset.ag;$$('[data-ag]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawK()}));
  $$('[data-era]').forEach(b=>b.addEventListener('click',()=>{era=b.dataset.era;$$('[data-era]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawK()}));
  drawK();
  redraws.special=(p=>()=>{p&&p();drawK()})(redraws.special);
};
/* =============== 4.1 BCG & new vaccines =============== */
/* forest plot rows: h = a header line; rr with 95% CI; pop: inf | adu | all; blk groups rows for the latitude re-ordering */
const BC_ROWS=[
 {h:'MENINGEAL & MILIARY TB · Mangtani 2014',blk:'sev'},
 {n:'Infants',rr:.1,lo:.01,hi:.77,pop:'inf',blk:'sev'},
 {n:'Children, tuberculin-tested',rr:.08,lo:.03,hi:.25,pop:'inf',blk:'sev'},
 {h:'PULMONARY TB · Mangtani 2014',blk:'pul'},
 {n:'Infants',rr:.41,lo:.29,hi:.58,pop:'inf',blk:'pul'},
 {n:'Children, tuberculin-tested',rr:.26,lo:.18,hi:.37,pop:'inf',blk:'pul'},
 {n:'Children, not strictly tested',rr:.59,lo:.35,hi:1.01,pop:'inf',blk:'pul'},
 {n:'Older, tuberculin-tested',rr:.88,lo:.59,hi:1.31,pop:'adu',blk:'pul'},
 {n:'Older, not strictly tested',rr:.81,lo:.55,hi:1.22,pop:'adu',blk:'pul'},
 {h:'SINGLE TRIALS · Abubakar 2013',blk:'tri'},
 {n:'Chingleput, India (near equator)',rr:1.05,lo:.88,hi:1.25,pop:'adu',blk:'tri',lat:0},
 {n:'UK MRC (farther from equator)',rr:.22,lo:.16,hi:.31,pop:'adu',blk:'tri',lat:1},
 {h:'INFECTION · Roy 2014',blk:'inf'},
 {n:'Infection (IGRA), exposed children',rr:.81,lo:.71,hi:.92,pop:'inf',blk:'inf'},
 {n:'Progression once infected',rr:.42,lo:.23,hi:.77,pop:'inf',blk:'inf'},
 {h:'POOLED · Colditz 1994',blk:'pool'},
 {n:'All TB, 14 trials',rr:.49,lo:.34,hi:.70,pop:'all',blk:'pool',dia:1}
];
const BC_GX={
 inf:` <b>Infants and children:</b> this is where BCG works best. In newborns and infants, protection was 64% against TB meningitis and 78% against disseminated TB. <sup class="c" data-ref="Colditz1995" title="Source 80">80</sup>`,
 adu:` <b>Adolescents and adults:</b> protection against pulmonary TB ranged from strong in the UK MRC trial (rate ratio 0.22) to none of clinical importance in Chingleput, India (1.05), and in Mangtani's pooled trials it was absent in older people. <sup class="c" data-ref="Abubakar2013,Mangtani2014" title="Source 3,302">3,302</sup>`
};
const BC_STEPS=[
 {from:0,at:.06,k:'Day 0 · the injection',t:'A live, weakened bacterium',
  txt:`BCG (bacille Calmette-Guérin) is a live attenuated strain of <i>Mycobacterium bovis</i>, first given to a newborn in Paris in 1921 and still the only licensed TB vaccine. <sup class="c" data-ref="Lange2022" title="Source 278">278</sup> The standard route puts it into the skin (intradermal), forming a small pale bleb; intravenous and aerosol routes are research comparisons. <sup class="c" data-ref="Darrah2020" title="Source 105">105</sup> BCG lacks the RD1 region and so cannot make ESAT-6, the main reason it is attenuated. <sup class="c" data-ref="Mahairas1996,Hsu2003" title="Source 240,301">240,301</sup>`,
  pt:`A tiny injection into the skin raises a small bump. It contains a weakened cousin of the TB germ that teaches the immune system.`,
  hook:`BCG = live attenuated <i>M. bovis</i>; RD1 (ESAT-6, CFP-10) is deleted. That is why IGRAs stay specific after BCG.`},
 {from:.12,at:.2,k:'The local reaction',t:'A papule forms',
  txt:`Macrophages take up the bacteria and T cells gather around them: a small raised papule. In 2,435 French children followed for 12 months after BCG-SSI, erythema was reported in 12.4% and induration in 12.2%. Adverse events were less likely when a visible papule formed, when BCG was given before age 1, and with a lower dose. <sup class="c" data-ref="Dommergues2009" title="Source 133">133</sup>`,
  pt:`A small red bump at the injection site is the expected reaction, not a problem.`,
  hook:`Local reaction to BCG is expected; a visible papule went with fewer adverse events (Dommergues 2009).`},
 {from:.28,at:.34,k:'Ulcer, then healing',t:'A small sore',
  txt:`The centre of the papule can break down into a small sore that crusts and heals. Ulceration was reported as an adverse event in 0.9%, abscess in 2.5% and lymphadenitis (a swollen nearby lymph node) in 0.1%; reactions were frequent but rarely severe. <sup class="c" data-ref="Dommergues2009" title="Source 133">133</sup> As a live vaccine, BCG can cause local or disseminated infection when immunity is weak. <sup class="c" data-ref="Lange2022" title="Source 278">278</sup>`,
  pt:`Some babies get a small sore that heals by itself. A large abscess or a swollen gland in the armpit should be shown to a clinician.`,
  hook:`BCG adverse events (Dommergues 2009): abscess 2.5%, ulcer 0.9%, lymphadenitis 0.1%. Disseminated BCG: infants with HIV.`},
 {from:.42,at:.47,k:'Months later',t:'A scar, and primed T cells',
  txt:`The site heals, usually to a small flat scar. What matters is invisible: in 14 studies of 3,855 recently exposed children, vaccinated children were less often infected (RR 0.81, 19% protection), and among infected children BCG protected 58% against progression to disease (RR 0.42). <sup class="c" data-ref="Roy2014" title="Source 403">403</sup> In infants with HIV, disseminated BCG disease occurred in 992 per 100,000 vaccinated in multicentre surveillance. <sup class="c" data-ref="Hesseling2009BWHO" title="Source 230">230</sup>`,
  pt:`The scar is a sign of the vaccine, not a guarantee. BCG mostly stops infection from turning into serious illness.`,
  hook:`Roy 2014: BCG lowers infection by 19–27% and progression once infected by 58%.`},
 {from:.53,at:.66,k:'The evidence · severe TB',t:'Meningitis and miliary TB',
  txt:`In randomised trials, protection against meningeal and miliary TB was high in infants (RR 0.1; 95% CI 0.01–0.77) and in children tuberculin-tested before vaccination (RR 0.08). <sup class="c" data-ref="Mangtani2014" title="Source 302">302</sup> Trunz estimated that the 100.5 million infant doses given in 2002 would prevent 29,729 cases of TB meningitis in the first 5 years of life, one per 3,435 vaccinations, and 11,486 cases of miliary TB. <sup class="c" data-ref="Trunz2006" title="Source 474">474</sup>`,
  gx:1,pt:`BCG is very good at protecting babies and young children from the most dangerous kinds of TB.`,
  hook:`BCG's most consistent benefit: TB meningitis and miliary TB in young children (≈1 meningitis case prevented per 3,435 infant doses).`},
 {from:.78,at:1,k:'The evidence · lung TB',t:'Age, prior exposure, latitude',
  txt:`Against pulmonary TB, protection was greatest in children stringently tuberculin-tested (RR 0.26) and infants (RR 0.41), weaker in children not stringently tested (0.59) and absent in older people (0.81–0.88). Protection was higher further from the equator and in trials with less detection bias. <sup class="c" data-ref="Mangtani2014" title="Source 302">302</sup> Across 14 trials the pooled RR was 0.49, and latitude plus study validity explained 66% of the heterogeneity. <sup class="c" data-ref="Colditz1994" title="Source 79">79</sup> Press <b>Order trials by latitude</b>.`,
  gx:1,pt:`For lung TB in teenagers and adults, BCG helps much less, and how much depends on where people live.`,
  hook:`Prior sensitisation (infection or environmental mycobacteria) and nearness to the equator explain most of BCG's variable efficacy. Strain does not.`}
];

inits.bcg=()=>{
  const svg=$('#bcSvg'),rg=$('#bcT');let pop='inf',lat=false;
  /* skin cross-section in the box (x,y,w,h); st 0..1 = injection, papule, ulcer, scar */
  function skin(x,y,w,h,st,N){let s='';const cx=x+w*.46,top=y+h*.2;
    const bleb=bump(st,.02,.3)*.9,pap=bump(st,.18,.62),ulc=bump(st,.42,.82),scar=ramp(st,.75,.95);
    const dome=14*bleb+12*pap-6*ulc-2*scar,dw=w*.16*(1+pap*.5);
    const surf=xx=>{const d=(xx-cx)/dw;return top-dome*Math.exp(-d*d*2.2)};
    const pts=[];for(let i=0;i<=60;i++){const xx=x+w*i/60;pts.push([xx,surf(xx)])}
    const line=pts.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
    const eD=10,dB=top+h*.36;
    /* subcutis fat lobules */
    s+=`<rect x="${x}" y="${f1(dB)}" width="${w}" height="${f1(y+h-dB)}" style="fill:var(--caseum);opacity:.35"/>`;
    const q=rng(41);for(let i=0;i<14;i++){const fx=x+10+q()*(w-20),fy=dB+12+q()*(y+h-dB-24);s+=`<ellipse cx="${f1(fx)}" cy="${f1(fy)}" rx="${f1(10+q()*6)}" ry="${f1(7+q()*4)}" style="fill:var(--panel);stroke:var(--mac-line);stroke-width:.6;opacity:.75"/>`}
    /* dermis and epidermis */
    s+=`<path d="${line}L${x+w} ${f1(dB)}L${x} ${f1(dB)}Z" style="fill:var(--skin);opacity:.5"/>`;
    s+=`<path d="${line}" style="fill:none;stroke:var(--skin-line);stroke-width:${eD};stroke-linejoin:round;opacity:.55"/><path d="${line}" style="fill:none;stroke:var(--skin-line);stroke-width:1.4"/>`;
    /* a vessel and a lymphatic to the node */
    s+=`<path d="M${x} ${f1(dB-14)}Q${f1(x+w*.5)} ${f1(dB-4)} ${x+w} ${f1(dB-18)}" style="fill:none;stroke:var(--vessel);stroke-width:2;opacity:.4"/>`;
    const nx=x+w*.86,ny=dB+28,nr=13+5*ulc;
    s+=`<path d="M${f1(cx+20)} ${f1(top+30)}Q${f1(nx-20)} ${f1(top+40)} ${f1(nx)} ${f1(ny-nr)}" style="fill:none;stroke:var(--tcell);stroke-width:1.2;stroke-dasharray:3 3;opacity:.7"/><ellipse cx="${f1(nx)}" cy="${f1(ny)}" rx="${f1(nr)}" ry="${f1(nr*.7)}" style="fill:var(--tcell);fill-opacity:.25;stroke:var(--tcell)"/><text x="${f1(nx)}" y="${f1(ny+nr+12)}" class="t-xs t-mid">lymph node</text>`;
    /* inflammation tint */
    if(pap>.05)s+=`<ellipse cx="${f1(cx)}" cy="${f1(top+18)}" rx="${f1(dw*1.6)}" ry="${f1(22+10*pap)}" style="fill:var(--blood);opacity:${f1(.18*pap+.08*ulc)}"/>`;
    /* bacilli in the bleb, then fewer */
    const nb=Math.round(lerp(14,3,ramp(st,.2,.8)));if(st>.04&&scar<1)s+=clump(cx,top+16,nb,16,{len:7,seed:7});
    /* cells gather */
    const ncell=Math.round(10*ramp(st,.12,.4)*(1-.6*scar));const r2=rng(53);
    for(let i=0;i<ncell;i++){const a=i/10*Math.PI*2,d=26+r2()*10;s+=i%2?macrophage(cx+Math.cos(a)*d*1.2,top+18+Math.sin(a)*d*.6,8,{seed:i+2}):tcell(cx+Math.cos(a)*d*1.3,top+18+Math.sin(a)*d*.65,3.6,{act:pap>.4})}
    /* ulcer crater and crust; scar fibrosis */
    if(ulc>.1){s+=`<ellipse cx="${f1(cx)}" cy="${f1(surf(cx)+3)}" rx="${f1(9*ulc+2)}" ry="${f1(4*ulc+1)}" style="fill:var(--field);stroke:var(--tb);stroke-width:1"/>`;if(st>.6)s+=`<ellipse cx="${f1(cx)}" cy="${f1(surf(cx)+1)}" rx="${f1(8*ramp(st,.6,.8))}" ry="3" style="fill:var(--caseum);stroke:var(--mac-line);stroke-width:.8"/>`}
    if(scar>0)s+=`<path d="M${f1(cx-dw)} ${f1(top+8)}Q${f1(cx)} ${f1(top+14)} ${f1(cx+dw)} ${f1(top+8)}" style="fill:none;stroke:var(--fibro);stroke-width:${f1(6*scar)};stroke-linecap:round;opacity:.9"/>`;
    /* needle */
    const nd=ramp(st,0,.06)*(1-ramp(st,.08,.14));
    if(nd>0){const tipx=cx+8,tipy=top+14,ang=-.42,L=110,dx=Math.cos(ang),dy=Math.sin(ang),bx=tipx+(L+40*(1-nd))*dx*-1*-1;
      const sx=tipx+(40*(1-nd)),sy=tipy-(40*(1-nd))*.45;s+=`<g style="opacity:${f1(Math.min(1,nd*3))}"><line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(sx+L)}" y2="${f1(sy-L*.45)}" style="stroke:var(--muted);stroke-width:2.2;stroke-linecap:round"/><rect x="${f1(sx+L-4)}" y="${f1(sy-L*.45-9)}" width="44" height="16" rx="3" transform="rotate(-24 ${f1(sx+L)} ${f1(sy-L*.45)})" style="fill:var(--panel-2);stroke:var(--line)"/></g>`}
    /* layer labels */
    s+=`<text x="${x+4}" y="${f1(top-14)}" class="t-xs">${N?'skin surface':'epidermis'}</text><text x="${x+4}" y="${f1(dB-22)}" class="t-xs">dermis</text><text x="${x+4}" y="${f1(y+h-6)}" class="t-xs">fat (subcutis)</text>`;
    return s}
  function stageLbl(st){return st<.16?['Intradermal bleb','BCG placed in the dermis']:st<.42?['Papule','erythema 12.4% · induration 12.2%']:st<.74?['Ulcer, crust','ulceration 0.9% · abscess 2.5%']:['Scar','primed T cells, no live vaccine visible']}
  function rowsOrdered(){if(!lat)return BC_ROWS;const tri=BC_ROWS.filter(r=>r.blk==='tri'),rest=BC_ROWS.filter(r=>r.blk!=='tri');return tri.concat(rest)}
  function forest(x0,y0,w,rowH,t,N){let s='';const R=rowsOrdered();
    const lab=N?0:190,valW=N?0:80,px0=x0+lab,px1=x0+w-valW,lg=v=>Math.log10(v),X=v=>lerp(px0,px1,(lg(clamp(v,.01,2))+2)/(lg(2)+2));
    const yEnd=y0+R.length*rowH;
    s+=`<text x="${x0}" y="${y0-16}" class="t-sm" style="fill:var(--vax)">RELATIVE RISK OF TB, BCG vs NONE (log scale)</text>`;
    [.01,.1,.25,1,2].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y0-6}" y2="${f1(yEnd)}" class="${v===1?'axis':'grid'}" ${v===1?'style="stroke:var(--ink);opacity:.5"':''}/><text x="${f1(X(v))}" y="${f1(yEnd+13)}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(1)-4)}" y="${f1(yEnd+27)}" class="t-xs t-end" style="fill:var(--good)">← BCG protects</text><text x="${f1(X(1)+4)}" y="${f1(yEnd+27)}" class="t-xs">${N?'none →':'no effect →'}</text>`;
    let k=0;const nShow=Math.floor(ramp(t,.5,.97)*R.length+.001);
    R.forEach((r,i)=>{const y=y0+i*rowH+rowH*.6;if(i>=nShow&&!(t>=.995))return;
      if(r.h){s+=`<text x="${x0}" y="${f1(y+2)}" class="t-xs" style="fill:var(--vax);font-weight:700">${r.h}</text>`;
        if(lat&&r.blk==='tri')s+=`<text x="${x0+w}" y="${f1(y+2)}" class="t-xs t-end" style="fill:var(--accent)">near equator ↓ farther</text>`;return}
      const on=r.pop==='all'||r.pop===pop||(lat&&r.blk==='tri'),op=on?1:.25,col=r.blk==='tri'&&lat?'var(--accent)':r.rr<1&&r.hi<1?'var(--good)':'var(--muted)';
      const ly=N?y-6:y+3.5,by=N?y+4:y;
      s+=`<g style="opacity:${op}">`;
      s+=`<text x="${N?x0:x0+8}" y="${f1(ly)}" class="t-xs" style="fill:var(--ink)">${r.n}${N?'  ·  '+r.rr+' ('+r.lo+'–'+r.hi+')':''}</text>`;
      s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${f1(by)}" y2="${f1(by)}" style="stroke:${col};stroke-width:1.8"/>`;
      if(r.dia)s+=`<path d="M${f1(X(r.lo))} ${f1(by)}L${f1(X(r.rr))} ${f1(by-5)}L${f1(X(r.hi))} ${f1(by)}L${f1(X(r.rr))} ${f1(by+5)}Z" style="fill:${col}"/>`;
      else s+=`<rect x="${f1(X(r.rr)-4)}" y="${f1(by-4)}" width="8" height="8" style="fill:${col}"/>`;
      if(!N)s+=`<text x="${x0+w}" y="${f1(y+3.5)}" class="t-xs t-end">${r.rr} (${r.lo}–${r.hi})</text>`;
      s+='</g>'});
    return s}
  function draw(t){const N=vb(svg,'720 410','400 880');let s='';
    const st=ramp(t,0,.5),SL=stageLbl(st);
    if(N){s+=`<text x="12" y="20" class="t-sm" style="fill:var(--vax)">ONE BCG INJECTION, IN SECTION</text><text x="12" y="40" class="t-big">${SL[0]}</text><text x="12" y="56" class="t-xs" style="fill:var(--ink)">${SL[1]}</text>`;
      s+=skin(12,66,376,250,st,N);s+=forest(12,372,376,28.5,t,N)}
    else{s+=`<text x="12" y="20" class="t-sm" style="fill:var(--vax)">ONE BCG INJECTION, IN SECTION</text><text x="12" y="44" class="t-big">${SL[0]}</text><text x="12" y="60" class="t-xs" style="fill:var(--ink)">${SL[1]}</text>`;
      s+=skin(12,74,252,300,st,N);
      s+=`<line x1="276" x2="276" y1="10" y2="398" class="grid"/>`;
      s+=forest(288,48,424,18.2,t,N)}
    /* stage dots */
    const sx=12,sy=N?334:394;['bleb','papule','ulcer','scar'].forEach((n,i)=>{const a=st>=[0,.16,.42,.74][i];s+=`<circle cx="${sx+6+i*(N?92:62)}" cy="${sy-4}" r="4" style="fill:${a?'var(--vax)':'none'};stroke:var(--vax)"/><text x="${sx+14+i*(N?92:62)}" y="${sy}" class="t-xs">${n}</text>`});
    svg.innerHTML=s;
    const ph=phaseOf(BC_STEPS,t);setSt(ph);const P=Object.assign({},BC_STEPS[ph]);if(P.gx)P.txt+=BC_GX[pop];$('#bcNote').innerHTML=noteHTML(P);
    $('#bcRead').innerHTML=`<span>skin <b>${SL[0].toLowerCase()}</b></span><span>forest rows <b>${t>=.995?12:rowsOrdered().slice(0,Math.floor(ramp(t,.5,.97)*BC_ROWS.length+.001)).filter(r=>!r.h).length}</b> of 12</span><span>showing <b>${pop==='inf'?'infants & children':'adolescents & adults'}</b>${lat?' · <b>by latitude</b>':''}</span>`;
  }
  const stop=playWire(rg,$('#bcPlay'),draw,24000,'Replay','bcg');
  const setSt=stepWire($('#bcSteps'),BC_STEPS,rg,draw,stop);
  $$('[data-bcp]').forEach(b=>b.addEventListener('click',()=>{pop=b.dataset.bcp;$$('[data-bcp]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#bcLat').addEventListener('click',()=>{lat=!lat;$('#bcLat').setAttribute('aria-pressed',lat);if(lat&&+rg.value<.97){stop();rg.value=1}draw(+rg.value)});
  draw(+rg.value);

  /* ---- pipeline bars ---- */
  const pp=$('#bcPipe');
  function drawP(){const N=vb(pp,'720 120','400 170');let s='';const x0=N?12:90,x1=N?388:700,u=(x1-x0)/18;
    const bars=[{y:N?30:22,l:'2024',seg:[[15,'15 candidates','var(--vax)',.5]]},{y:N?96:66,l:'Aug 2025',seg:[[4,'phase 1: 4','var(--vax)',.35],[8,'phase 2: 8','var(--vax)',.6],[6,'phase 3: 6','var(--vax)',1]]}];
    bars.forEach(b=>{let x=x0;if(N)s+=`<text x="${x0}" y="${b.y-6}" class="t-xs" style="fill:var(--ink)">${b.l}</text>`;else s+=`<text x="${x0-10}" y="${b.y+17}" class="t-xs t-end" style="fill:var(--ink)">${b.l}</text>`;
      b.seg.forEach(g=>{const w=g[0]*u;s+=`<rect x="${f1(x)}" y="${b.y}" width="${f1(w-2)}" height="26" rx="4" style="fill:${g[2]};opacity:${g[3]}"/><text x="${f1(x+6)}" y="${b.y+17}" class="t-xs" style="fill:${g[3]>.55?'var(--bg)':'var(--ink)'}">${g[1]}</text>`;x+=w})});
    s+=`<text x="${x1}" y="${N?164:112}" class="t-xs t-end">TB vaccine candidates in clinical trials (WHO)</text>`;pp.innerHTML=s}
  drawP();const prevR=redraws.bcg;redraws.bcg=()=>{prevR&&prevR();drawP()};

  /* ---- board filters ---- */
  let fe='all',fw='all';
  function filt(){let n=0;$$('#bcBoard .card').forEach(c=>{const ok=(fe==='all'||c.dataset.ev===fe)&&(fw==='all'||c.dataset.who.split(' ').includes(fw));c.hidden=!ok;if(ok)n++});$('#bcCount').textContent=n+' of '+$$('#bcBoard .card').length+' shown'}
  $$('[data-bcf]').forEach(b=>b.addEventListener('click',()=>{fe=b.dataset.bcf;$$('[data-bcf]').forEach(x=>x.setAttribute('aria-pressed',x===b));filt()}));
  $$('[data-bcw]').forEach(b=>b.addEventListener('click',()=>{fw=b.dataset.bcw;$$('[data-bcw]').forEach(x=>x.setAttribute('aria-pressed',x===b));filt()}));
  filt();
};
/* =============== 4.2 Infection control & contacts =============== */
const IC_PRE=[{},{tri:1},{tri:1,iso:1},{tri:1,iso:1,tx:1},{tri:1,iso:1,tx:1,uv:1,n95:1},{tri:1,iso:1,tx:1,uv:1,n95:1}];
const IC_STEPS=[
 {from:0,at:.07,k:'09:00 · waiting room',t:'Not yet recognised',
  txt:`A person with a cough of several weeks sits in a closed waiting room. CDC credits its 1994 controls with fewer US outbreaks and says the remaining risk comes mainly from people with unsuspected, undiagnosed TB. A 2026 review of 86 studies found 7.1% of exposed people infected in health care (3.8% after the 2005 ventilation standards), linked to long contact, no respirator and no negative-pressure room. <sup class="c" data-ref="Jensen2005,Manzoor2026" title="Source 249,303">249,303</sup>`,
  pt:`The biggest risk in a clinic is TB nobody has noticed yet. Nobody here has done anything wrong.`,
  hook:`Hierarchy of TB infection control: administrative → environmental → respiratory protection. Administrative controls are "the first and most important level". <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>`},
 {from:.15,at:.24,k:'09:05 · triage',t:'Find: triage and a mask',
  txt:`FAST: <b>F</b>ind cases <b>A</b>ctively, <b>S</b>eparate safely, <b>T</b>reat effectively. A cough screen at the door fast-tracks people with presumed TB and cuts their time in the building. A surgical mask on the person with TB is source control: worn by people with MDR-TB, it cut guinea-pig infection from 76.6% to 40%, a 56% reduction. WHO's respiratory hygiene asks anyone coughing to cover the mouth and nose, then clean their hands. <sup class="c" data-ref="Tierney2022,WHO-IPC2019,Dharmadhikari2012" title="Source 119,471,511">119,471,511</sup>`,
  pt:`Someone at the entrance asks about cough and offers a mask. It protects everyone else, and it is offered to anyone coughing.`,
  hook:`FAST = Find cases Actively, Separate safely, Treat effectively. Patient surgical mask: −56% transmission. <sup class="c" data-ref="Tierney2022,Dharmadhikari2012" title="Source 119,471">119,471</sup>`},
 {from:.32,at:.43,k:'09:20 · isolation room',t:'Separate: negative pressure',
  txt:`CDC defines an airborne infection isolation room as under negative pressure, so air flows from the corridor into the room, preferably exhausted outside: at least 0.01 inch of water gauge, and at least 12 air changes an hour for construction since 2001 (6 for older rooms). ACH = exhaust airflow (ft³/min) ÷ room volume (ft³) × 60. Where mechanical rooms are lacking, opening windows and doors gave a median 28 ACH in Lima. <sup class="c" data-ref="Jensen2005,Escombe2007" title="Source 150,249">150,249</sup>`,
  pt:`A separate room pulls air in from the corridor and blows it outside, so nothing drifts back to the waiting room.`,
  hook:`AII room: negative pressure ≥0.01 in. w.g., ≥12 ACH (6 ACH if built before 2001), exhaust outside. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`},
 {from:.5,at:.58,k:'Same day · rapid test',t:'Treat effectively',
  txt:`Effective treatment is the strongest control. On an HIV–TB ward in Lima, 90% of transmission came from MDR-TB not yet on effective treatment. In a Lima hospital using FAST, drug-susceptibility testing rose from 57.8% to 98.7% and 73.3% against 51.3% started treatment in hospital. In Viet Nam, 79.0% of people whose first test was a positive Xpert started likely effective treatment within 2 days. <sup class="c" data-ref="Escombe2008,Tierney2022,Le2019IJTLD" title="Source 152,281,471">152,281,471</sup>`,
  pt:`A fast test shows which medicines will work. Starting them quickly is what stops the spread.`,
  hook:`WHO Rec. 3: prompt initiation of effective treatment (strong recommendation). Rapid DST is infection control. <sup class="c" data-ref="WHO-IPC2019,Dharmadhikari2014" title="Source 120,511">120,511</sup>`},
 {from:.66,at:.74,k:'During the stay',t:'Protect staff: respirators and UV',
  txt:`Staff wear at least an N95 respirator, fit-tested at first and periodically, with annual training; for bronchoscopy or autopsy a higher level such as a powered air-purifying respirator may be considered. Upper-room UV in Lima cut guinea-pig infection from 35% to 9.5% (70% prevented on model analysis), given adequate air mixing. In 2017, health workers' TB notification rate was twice that of the general adult population. <sup class="c" data-ref="Jensen2005,Escombe2009,WHO-IPC2019" title="Source 153,249,511">153,249,511</sup>`,
  pt:`Staff wear a fitted mask that filters the air they breathe. A UV lamp near the ceiling cleans the air above everyone's heads.`,
  hook:`Patients wear surgical masks (source control); staff wear fit-tested N95 or higher (respiratory protection). <sup class="c" data-ref="Jensen2005,Fennelly2020" title="Source 174,249">174,249</sup>`},
 {from:.82,at:.97,k:'Weeks 0–2+',t:'Ending precautions',
  txt:`For confirmed TB in hospital, CDC keeps airborne precautions until all three apply: three consecutive negative AFB smears collected 8–24 hours apart with at least one early-morning specimen, at least 2 weeks of standard multidrug treatment, and clinical improvement. Discharge home before smear conversion is possible with a TB-programme plan and DOT arranged, if no children under 4 or immunocompromised people live there. Quoted as published, for teaching. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`,
  pt:`Isolation ends once tests and your care team say it is safe, often after a few weeks of treatment.`,
  hook:`Confirmed TB, hospital release (CDC): 3 negative smears + ≥2 weeks of therapy + clinical improvement. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`}
];
const IC_CON=[
 {n:'Partner',d:'shares a bedroom',ring:0,a:-55,ref:'h',res:'inf',why:'Sharing a bedroom with the index person was a risk factor for TB in contacts.',c:'<sup class="c" data-ref="Reichler2020Risk" title="Source 395">395</sup>'},
 {n:'Daughter, 3',d:'household, under 5',ring:0,a:55,ref:'h',res:'win',why:'NTCA/CDC: contacts under 5 years are high priority.',c:'<sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>'},
 {n:'Son, 14',d:'household',ring:0,a:180,ref:'h',res:'dis',why:'Household contacts are the highest-yield group in every setting.',c:'<sup class="c" data-ref="Fox2013" title="Source 185">185</sup>'},
 {n:'Grandmother',d:'prednisone 20 mg for 2 months',ring:1,a:-120,ref:'h',res:'inf',why:'NTCA/CDC: more than 15 mg prednisone a day for over 4 weeks makes a contact high priority.',c:'<sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>'},
 {n:'Friend with HIV',d:'visits weekly',ring:1,a:0,ref:'h',res:'neg',why:'NTCA/CDC: people with HIV are high priority; WHO also recommends preventive treatment for people living with HIV once TB disease is excluded.',c:'<sup class="c" data-ref="NTCA2005,WHO-Mod1-2024" title="Source 355,512">355,512</sup>'},
 {n:'Coworker',d:'shared office, 40 h/week',ring:1,a:100,ref:'m',res:'inf',why:'Long exposure: infection prevalence rose 8.2% per 250 exposure hours.',c:'<sup class="c" data-ref="Reichler2020Hours" title="Source 394">394</sup>'},
 {n:'Carpool colleague',d:'1 h a day in a car',ring:1,a:150,ref:'m',res:'neg',why:'Regular shared air in a small space, fewer hours than the household.',c:'<sup class="c" data-ref="Reichler2020Hours" title="Source 394">394</sup>'},
 {n:'Teammate',d:'football, outdoors',ring:2,a:-75,ref:'l',res:'neg',why:'Brief or outdoor contact: evaluated only if the investigation expands.',c:'<sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>'},
 {n:'Neighbour',d:'chats at the door',ring:2,a:25,ref:'l',res:'neg',why:'Brief contact: evaluated only if the investigation expands.',c:'<sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>'},
 {n:'Bus passenger',d:'one 20-minute ride',ring:2,a:112,ref:'l',res:'neg',why:'Brief contact: evaluated only if the investigation expands.',c:'<sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>'}];
inits.control=()=>{
  const svg=$('#icSvg'),rg=$('#icT');const S={tri:0,iso:0,tx:0,uv:0,n95:0};let lastPh=-1,setSt=()=>{};
  const sync=()=>$$('[data-icl]').forEach(b=>b.setAttribute('aria-pressed',!!S[b.dataset.icl]));
  const R=rng(4242),DOTS=[];for(let i=0;i<40;i++)DOTS.push([R(),R(),R()*6.28,R()<.25]);
  function zones(N){return N?{A:[14,40,386,190],C:[14,190,386,250],W:[14,250,250,450],K:[250,250,386,450],T:[14,450,386,540]}
    :{W:[20,40,300,290],T:[20,290,300,400],C:[300,40,410,400],A:[410,40,700,210],K:[410,230,700,400]}}
  const at=(z,u,v)=>[lerp(z[0],z[2],u),lerp(z[1],z[3],v)];
  function draw(t){
    const N=vb(svg,'720 430','400 600'),Z=zones(N);
    const ph=phaseOf(IC_STEPS,t);if(ph!==lastPh){lastPh=ph;Object.keys(S).forEach(k=>S[k]=IC_PRE[ph][k]?1:0);sync()}
    const st=IC_STEPS[ph],nx=ph<IC_STEPS.length-1?IC_STEPS[ph+1].from:1,k=ramp(t,st.from,nx);
    /* source and concentrations (relative to an unrecognised source in the closed waiting room) */
    const txF=S.tx?(ph===3?lerp(1,.05,ease(k)):.05):1,q=(S.tri?.44:1)*txF,uvF=S.uv?.3:1,inA=!!S.iso;
    const rel={W:inA?0:q*uvF,T:inA?0:q*.7*uvF,C:inA?0:q*.35*uvF,K:inA?0:q*.08*uvF,A:inA?q*1.6/12*uvF:0};
    let s=`<defs>${marker('icAr','var(--air)')}${marker('icArO','var(--muted)')}</defs>`;
    /* haze per room */
    Object.keys(Z).forEach(n=>{const z=Z[n],o=Math.sqrt(clamp(rel[n]))*.42;s+=`<rect x="${z[0]}" y="${z[1]}" width="${z[2]-z[0]}" height="${z[3]-z[1]}" style="fill:var(--field)"/>`;
      if(o>.01)s+=`<rect x="${z[0]}" y="${z[1]}" width="${z[2]-z[0]}" height="${z[3]-z[1]}" style="fill:var(--tb);opacity:${f1(o*100)/100}"/>`;
      const nd=Math.round(Math.sqrt(clamp(rel[n]))*(n==='C'?10:16)),tau=t*300;
      for(let i=0;i<nd;i++){const d=DOTS[(i*7+n.charCodeAt(0))%DOTS.length];const u=((d[0]+tau*.002*(1+i%3))%1),v=clamp(d[1]+.06*Math.sin(tau*.04+d[2]),.05,.95);s+=droplet(lerp(z[0]+6,z[2]-6,u),lerp(z[1]+6,z[3]-6,v),2.4,{bac:d[3]})}
      if(S.uv&&n!=='A'&&n!=='K')s+=`<rect x="${z[0]}" y="${z[1]}" width="${z[2]-z[0]}" height="${N&&n==='T'?8:12}" style="fill:var(--vax);opacity:.35"/>`});
    /* walls with door gaps */
    Object.keys(Z).forEach(n=>{const z=Z[n];s+=`<rect x="${z[0]}" y="${z[1]}" width="${z[2]-z[0]}" height="${z[3]-z[1]}" style="fill:none;stroke:var(--ink);stroke-width:2"/>`});
    const gap=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--field);stroke-width:5"/>`;
    const dA=N?[200,190]:[410,150],dW=N?[150,250]:[300,170],dK=N?[318,250]:[410,320],dT=N?[150,450]:[160,290],dEx=N?[14,500]:[20,370];
    s+=N?gap(180,190,220,190)+gap(130,250,170,250)+gap(298,250,338,250)+gap(110,450,190,450)+gap(14,485,14,520)
        :gap(410,130,410,170)+gap(300,150,300,190)+gap(410,300,410,340)+gap(130,290,190,290)+gap(20,355,20,390);
    /* room labels */
    const lab=(n,txt)=>{const z=Z[n];s+=`<text x="${z[0]+6}" y="${z[3]-6}" class="t-xs">${txt}</text>`};
    lab('W','WAITING ROOM · windows closed');lab('T',N?'ENTRANCE · TRIAGE':'ENTRANCE · TRIAGE DESK');lab('C','CORRIDOR');lab('A',inA?'ISOLATION ROOM · ≥12 ACH':'ISOLATION ROOM');lab('K','CONSULTING');
    /* negative pressure and exhaust */
    if(inA){const off=(t*300)%24;
      s+=N?`<path d="M200 226V200" style="stroke:var(--air);stroke-width:2.2;fill:none;stroke-dasharray:6 6;stroke-dashoffset:${f1(off)}" marker-end="url(#icAr)"/><path d="M360 60V24" style="stroke:var(--air);stroke-width:2.2;fill:none" marker-end="url(#icAr)"/><text x="354" y="20" class="t-xs t-end" style="fill:var(--air)">exhaust outside</text><text x="210" y="216" class="t-xs" style="fill:var(--air)">air flows in (negative pressure)</text>`
         :`<path d="M372 150H404" style="stroke:var(--air);stroke-width:2.2;fill:none;stroke-dasharray:6 6;stroke-dashoffset:${f1(-off)}" marker-end="url(#icAr)"/><path d="M680 60V18" style="stroke:var(--air);stroke-width:2.2;fill:none" marker-end="url(#icAr)"/><text x="674" y="16" class="t-xs t-end" style="fill:var(--air)">exhaust outside</text><text x="318" y="140" class="t-xs" style="fill:var(--air)">air in</text>`}
    /* people in the waiting room */
    const sp=N?34:44,others=N?[[.45,.3],[.7,.32],[.62,.68],[.85,.7]]:[[.5,.25],[.75,.25],[.6,.62],[.85,.6],[.4,.62]];
    others.forEach(([u,v],i)=>{const[x,y]=at(Z.W,u,v);s+=person(x,y-sp/2,sp,'var(--muted)',{face:i%2?1:-1,op:.8})});
    /* staff */
    const[nx0,ny0]=at(Z.T,.55,.35);s+=`<rect x="${f1(nx0-22)}" y="${f1(ny0+sp*.55)}" width="44" height="8" rx="2" style="fill:var(--fibro)"/>`+person(nx0,ny0-6,sp,'var(--rx)',{n95:!!S.n95,face:-1});
    const[dx0,dy0]=at(Z.K,.86,.55);s+=person(dx0,dy0-sp/2,sp,'var(--rx)',{n95:!!S.n95,face:-1});
    if(ph>=4&&inA){const[ax,ay]=at(Z.A,.28,.5);s+=person(ax,ay-sp/2,sp,'var(--rx)',{n95:!!S.n95,face:1});if(S.n95)s+=`<text x="${f1(ax)}" y="${f1(ay+sp*.62)}" class="t-xs t-mid" style="fill:var(--rx)">fit-tested N95</text>`}
    /* the person with TB: path between places */
    const seatW=at(Z.W,.2,.4),seatApart=at(Z.W,.12,.18),desk=at(Z.T,.3,.4),bed=at(Z.A,.62,.5),exitP=N?[30,505]:[40,372];
    let P=seatW;
    const path=pts=>{const L=[];let tot=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(d);tot+=d}return u=>{let d=u*tot;for(let i=0;i<L.length;i++){if(d<=L[i])return[lerp(pts[i][0],pts[i+1][0],d/L[i]),lerp(pts[i][1],pts[i+1][1],d/L[i])];d-=L[i]}return pts[pts.length-1]}};
    if(inA){P=bed;if(ph===2&&k<.45)P=path([S.tri?seatApart:seatW,dW,N?[160,220]:[355,170],N?[200,220]:[355,150],dA,bed])(ease(k/.45));
      if(ph===5&&k>.8)P=path([bed,dA,N?[200,220]:[355,150],N?[30,220]:[355,372],exitP])(ease(ramp(k,.8,1)))}
    else if(S.tri){P=ph===1&&k<.4?path([seatW,dT,desk])(ease(k/.4)):ph===1&&k<.6?desk:ph===1?path([desk,dT,seatApart])(ease(ramp(k,.6,.85))):seatApart}
    const coughing=!S.tri&&txF>.5&&Math.sin(t*900)>.2;
    s+=person(P[0],P[1]-sp/2,sp,'var(--tb)',{cough:coughing,mask:!!S.tri,face:1});
    s+=`<text x="${f1(P[0])}" y="${f1(P[1]+sp*.62)}" class="t-xs t-mid" style="fill:var(--tb)">${S.tri?'masked':'coughing'}</text>`;
    if(S.tx){s+=pill(P[0]+sp*.55,P[1]-sp*.2,16,'var(--dR)',{ang:-30})}
    /* step-specific overlays */
    if(ph===1&&k<.7){const[x,y]=at(Z.T,.55,.85);s+=`<text x="${f1(x)}" y="${f1(y)}" class="t-xs t-mid" style="fill:var(--rx)">cough screen · mask offered</text>`}
    if(ph===3){const[x,y]=at(Z.A,.62,.18);s+=sputum(x-40,y+8,.7,{fill:.5})+`<text x="${f1(x-20)}" y="${f1(y+6)}" class="t-xs" style="fill:var(--accent)">${k>.3?'rapid test: drug-susceptible':'rapid molecular test…'}</text>`}
    if(ph===5){const z=Z.K,x=z[0]+10,y=z[1]+18;let c=`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:700">CDC release checklist</text>`;
      [['smear 1 negative',.1],['smear 2 negative',.25],['smear 3 negative (early morning)',.4],['≥2 weeks of standard treatment',.55],['clinical improvement',.7]].forEach(([l,a],i)=>{const on=k>a;c+=`<text x="${x}" y="${y+16+i*14}" class="t-xs" style="fill:${on?'var(--good)':'var(--muted)'}">${on?'✓':'○'} ${N&&l.length>22?l.replace(' (early morning)','').replace('of standard ',''):l}</text>`});
      s+=`<rect x="${z[0]+4}" y="${z[1]+4}" width="${N?128:196}" height="88" rx="6" style="fill:var(--panel);stroke:var(--line)"/>`+c}
    svg.innerHTML=s;setSt(ph);
    const pc=v=>Math.round(clamp(v)*100)+'%';
    $('#icRead').innerHTML=`<span>waiting room <b>${pc(rel.W)}</b></span><span>corridor <b>${pc(rel.C)}</b></span><span>isolation room <b>${pc(rel.A)}</b></span><span>staff respirators <b>${S.n95?'on':'off'}</b></span><span class="stage-cap">vs. the unrecognised start</span>`;
    $('#icNote').innerHTML=noteHTML(st);
  }
  const stop=playWire(rg,$('#icPlay'),draw,26000,'Replay','control');
  setSt=stepWire($('#icSteps'),IC_STEPS,rg,draw,stop);
  $$('[data-icl]').forEach(b=>b.addEventListener('click',()=>{const kk=b.dataset.icl;S[kk]=S[kk]?0:1;sync();draw(+rg.value)}));
  draw(+rg.value);

  /* ---- contact investigation ---- */
  const csv=$('#ciSvg'),cr=$('#ciT'),PR={h:'High',m:'Medium',l:'Low'};let check=false;
  $('#ciSel').innerHTML=IC_CON.map((c,i)=>`<label for="ciP${i}">${c.n}<small>${c.d}</small><select id="ciP${i}"><option value="">Choose…</option><option value="h">High</option><option value="m">Medium</option><option value="l">Low</option></select></label>`).join('');
  const pri=i=>$('#ciP'+i).value;
  const EXP=21;/* day the illustrative investigation expands (a secondary case is found) */
  function state(i,d){const c=IC_CON[i],p=pri(i);if(!p)return{s:'listed',l:'not yet prioritised'};
    const expand=d>=EXP&&IC_CON.some((x,j)=>x.res==='dis'&&pri(j)&&pri(j)!=='l');
    const tday=p==='h'?7:p==='m'?14:expand?EXP+7:null;
    if(tday==null)return d>=3?{s:'wait',l:'low priority: evaluated only if the investigation expands'}:{s:'listed',l:'listed'};
    if(d<Math.min(3,tday))return{s:'listed',l:'listed'};
    if(d<tday)return{s:'assessed',l:'assessed face to face'};
    if(d<tday+3)return{s:'tested',l:'tested'};
    if(c.res==='inf')return{s:'inf',l:'TB infection · disease excluded · preventive treatment offered'};
    if(c.res==='dis')return{s:'dis',l:'TB disease found · treatment started'};
    if(c.res==='win')return d>=63?{s:'neg',l:'retest at 8–10 weeks negative · window treatment stops'}:{s:'win',l:'first test negative · window prophylaxis until retest'};
    return{s:'neg',l:c.ref==='h'&&/HIV/.test(c.n)?'negative · TPT considered (HIV)':'negative · no further action'}}
  function drawC(){const N=vb(csv,'720 420','400 690'),d=+cr.value,setv=$('#ciSet').value;
    const O=N?{cx:200,cy:204,R:[80,138,190]}:{cx:200,cy:212,R:[80,138,192]};let s='';
    const ringC=['var(--tb)','var(--warn)','var(--accent)'],ringN=['household','close','casual'];
    for(let r=2;r>=0;r--)s+=`<circle cx="${O.cx}" cy="${O.cy}" r="${O.R[r]}" style="fill:${ringC[r]};fill-opacity:.06;stroke:var(--line);stroke-width:1.2"/><text x="${O.cx-O.R[r]+5}" y="${O.cy+4}" class="t-xs">${ringN[r]}</text>`;
    const exp=d>=EXP&&IC_CON.some((x,j)=>x.res==='dis'&&pri(j)&&pri(j)!=='l');
    if(exp)s+=`<circle cx="${O.cx}" cy="${O.cy}" r="${O.R[2]+6}" style="fill:none;stroke:var(--warn);stroke-width:2;stroke-dasharray:6 4"/>`;
    s+=person(O.cx,O.cy-18,34,'var(--tb)',{})+`<text x="${O.cx}" y="${O.cy+28}" class="t-xs t-mid" style="fill:var(--tb)">person with TB</text>`;
    const colP={h:'var(--bad)',m:'var(--warn)',l:'var(--accent)','':'var(--muted)'};
    IC_CON.forEach((c,i)=>{const ang=(c.a-90)*Math.PI/180;
      const rad=c.ring===0?54:c.ring===1?110:166;const x=O.cx+Math.cos(ang)*rad,y=O.cy+Math.sin(ang)*rad;
      const p=pri(i),st=state(i,d),sz=26;
      s+=person(x,y-sz/2,sz,colP[p],{});
      const bx=x+11,by=y-sz/2;
      if(st.s==='assessed')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/>`;
      if(st.s==='tested')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="5.5" style="fill:var(--accent)"/><text x="${f1(bx)}" y="${f1(by+3)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px">T</text>`;
      if(st.s==='inf')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="6.5" style="fill:var(--gold)"/><text x="${f1(bx)}" y="${f1(by+3)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px;font-weight:700">TPT</text>`;
      if(st.s==='dis')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="6.5" style="fill:var(--bad)"/><text x="${f1(bx)}" y="${f1(by+3)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px;font-weight:700">Rx</text>`;
      if(st.s==='win')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="6.5" style="fill:var(--vax)"/><text x="${f1(bx)}" y="${f1(by+3)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px;font-weight:700">W</text>`;
      if(st.s==='neg')s+=`<path d="M${f1(bx-4)} ${f1(by)}l3 3l6 -6" style="fill:none;stroke:var(--good);stroke-width:2"/>`;
      if(check&&p)s+=`<text x="${f1(x-12)}" y="${f1(by)}" class="t-xs t-end" style="fill:${p===c.ref?'var(--good)':'var(--warn)'};font-weight:700">${p===c.ref?'✓':'?'}</text>`;
      s+=`<text x="${f1(x)}" y="${f1(y+sz/2+10)}" class="t-xs t-mid" style="fill:var(--ink)">${c.n}</text>`});
    /* side panel: milestones and yield */
    const P=N?{x:20,y:410,w:360}:{x:410,y:24,w:296};
    s+=`<text x="${P.x}" y="${P.y}" class="t-sm" style="fill:var(--vax)">DAY ${d} · ${d<7?'week 1':'week '+Math.floor(d/7+1)}</text>`;
    const MS=[[0,'report to public health; interview'],[3,'first assessments (3 working days)'],[7,'high priority tested (7 working days)'],[14,'medium priority tested (14 days)'],[EXP,'secondary case → widen the circle'],[56,'under-5 retest at 8–10 weeks']];
    MS.forEach(([dd,l],i)=>{const on=d>=dd,y=P.y+18+i*16;s+=`<circle cx="${P.x+5}" cy="${y-3}" r="4" style="fill:${on?'var(--vax)':'var(--panel)'};stroke:var(--vax)"/><text x="${P.x+14}" y="${y}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">day ${dd}: ${l}</text>`});
    const Y={lmic:{dis:3.1,inf:51.5,n:'low- and middle-income settings'},hic:{dis:1.4,inf:28.1,n:'high-income settings'}}[setv];
    const gy=P.y+130,gs=N?13:11.5,nd=Math.round(Y.dis),ni=Math.round(Y.inf);
    s+=`<text x="${P.x}" y="${gy-10}" class="t-sm">OF 100 CONTACTS · ${N?'published average':'published average'}</text>`;
    for(let i=0;i<100;i++){const x=P.x+(i%20)*gs,y=gy+Math.floor(i/20)*gs,col=i<nd?'var(--bad)':i<nd+ni?'var(--gold)':'var(--panel-2)';s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(gs-2)}" height="${f1(gs-2)}" rx="2" style="fill:${col}"/>`}
    const ly=gy+5*gs+14;
    s+=`<text x="${P.x}" y="${ly}" class="t-xs"><tspan style="fill:var(--bad)">■ TB disease ${Y.dis}%</tspan>   <tspan style="fill:var(--gold)">■ TB infection ${Y.inf}%</tspan></text><text x="${P.x}" y="${ly+14}" class="t-xs">${Y.n}</text><text x="${P.x}" y="${ly+28}" class="t-xs">separate pooled figures, rounded</text>`;
    s+=`<text x="${P.x}" y="${ly+50}" class="t-xs"><tspan style="fill:var(--accent)">T</tspan> tested   <tspan style="fill:var(--gold)">TPT</tspan> preventive treatment</text><text x="${P.x}" y="${ly+64}" class="t-xs"><tspan style="fill:var(--vax)">W</tspan> window prophylaxis   <tspan style="fill:var(--bad)">Rx</tspan> TB treatment   <tspan style="fill:var(--good)">✓</tspan> negative</text>`;
    csv.innerHTML=s;
    /* select feedback */
    IC_CON.forEach((c,i)=>{const lb=$('#ciP'+i).parentElement,p=pri(i);lb.classList.toggle('ok',check&&p===c.ref);lb.classList.toggle('off',check&&!!p&&p!==c.ref)});
    /* note */
    const chosen=IC_CON.filter((c,i)=>pri(i)).length,kidLow=pri(1)==='l'||(!pri(1)&&d>=7);
    let txt,k2,t2;
    if(check){const ok=IC_CON.filter((c,i)=>pri(i)===c.ref).length;k2='Compared with the criteria';t2=`${ok} of 10 match`;
      txt=IC_CON.map((c,i)=>`<b>${c.n}</b>: ${PR[c.ref]}. ${c.why} ${c.c}`).join('<br>')}
    else if(chosen<10&&d<3){k2='Day 0';t2='Report, interview, list';txt=`Public health hears of the case the day it is reported and interviews the person in their own language, protecting confidentiality. The infectious period is set to start 3 months before diagnosis. Choose a priority for each contact above, then move the timeline. <sup class="c" data-ref="Jensen2005,NTCA2005" title="Source 249,355">249,355</sup>`}
    else if(kidLow){k2='A risk to watch';t2='The youngest contact waits';txt=`The 3-year-old has not been given high priority. NTCA/CDC makes contacts under 5 high priority, tested within 7 working days and, if the first test is negative and exposure was under 8 weeks ago, given window prophylaxis until a retest at 8–10 weeks. Among child contacts, 83% of TB in under-5s was diagnosed within 90 days of the first visit. <sup class="c" data-ref="NTCA2005,Martinez2020Lancet" title="Source 311,355">311,355</sup>`}
    else if(d<EXP){k2='Weeks 1–3';t2='Testing by priority';txt=`High-priority contacts should have a skin test within 7 working days and medium-priority within 14; an induration of 5 mm or more counts as positive for any contact. Infection or disease is looked for first, because contact investigation finds disease as much as it prevents it: in Amsterdam, 57 of 739 infected contacts had TB at screening against 14 who developed it later. <sup class="c" data-ref="NTCA2005,Sloot2014" title="Source 355,433">355,433</sup>`}
    else if(d<56){k2='Week 4 onward';t2=exp?'The circle widens':'Holding the line';txt=`${exp?'A secondary case (the son) is evidence of more transmission than expected, so the investigation expands to the next circle. ':''}NTCA/CDC expands beyond high- and medium-priority contacts only on such evidence: infection or disease in 10% of high-priority contacts (or twice the background), secondary cases, or infection in children under 5. Among 1406 skin-test-positive contacts, TB developed in 9.8% who never started preventive treatment and 0.2% who completed it. <sup class="c" data-ref="NTCA2005,Reichler2020Risk" title="Source 355,395">355,395</sup>`}
    else{k2='Weeks 8–12';t2='Retest and follow up';txt=`The window retest at 8–10 weeks decides whether the young child stops or completes preventive treatment. Among close contacts in the US and Canada, 51% of contact TB was diagnosed by 1 month, 75% by 3 months and 92% by 12 months, and the investigation itself found 77% of it. In Viet Nam's ACT2 trial, active household investigation registered 1788 TB cases per 100,000 contacts against 703 with passive case finding. <sup class="c" data-ref="NTCA2005,Reichler2018,Fox2018NEJM" title="Source 186,355,393">186,355,393</sup>`}
    $('#ciNote').innerHTML=noteHTML({k:k2,t:t2,txt,
      pt:`Health workers check the people who shared air with the person with TB, starting with young children and those with weaker immunity, and offer preventive medicine to those who need it.`,
      hook:`High priority (NTCA/CDC): under 5, HIV, >15 mg prednisone for >4 weeks or other immunosuppression. First assessment within 3 working days; window prophylaxis for under-5s. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`});
  }
  cr.addEventListener('input',drawC);$('#ciSet').addEventListener('change',drawC);
  $$('#ciSel select').forEach(x=>x.addEventListener('change',drawC));
  $('#ciCheck').addEventListener('click',()=>{check=!check;$('#ciCheck').setAttribute('aria-pressed',check);drawC()});
  drawC();
  redraws.control=(f=>()=>{f&&f();drawC()})(redraws.control);
};
/* =============== 4.3 Ending TB: targets & research =============== */
/* % change vs 2015. tg = End TB milestones/targets; act = the actual trajectory as published (p: a published
   point, d: derived here from a published year-on-year change); gbd = the independent GBD 2021 estimate for 2020 */
const RE_M={
 inc:{n:'TB incidence rate',tg:[[2015,0],[2020,-20],[2025,-50],[2030,-80],[2035,-90]],
  act:[[2015,0,'p'],[2020,-12.8,'p'],[2023,-10.8,'d'],[2024,-12.3,'p']],gbd:-6.26,
  cap:`Actual line: WHO database rates (148 per 100,000 in 2015, 129 in 2020) and the report's net −12.3% for 2024; 2023 is worked back from the 1.7% fall between 2023 and 2024. Years between these points are drawn straight. The hollow diamond is the independent GBD 2021 estimate for 2015–2020 (−6.26%). Dashed: the 2015–2024 average pace extended in a straight line, drawn here, not a WHO projection. <sup class="c" data-ref="WHO-GTR2025,GBD2021TB2024,Floyd2018" title="Source 178,194,510">178,194,510</sup>`},
 death:{n:'TB deaths',tg:[[2015,0],[2020,-35],[2025,-75],[2030,-90],[2035,-95]],
  act:[[2015,0,'p'],[2019,-19.3,'p'],[2021,-17.6,'d'],[2023,-26.8,'d'],[2024,-29,'p']],gbd:-11.9,
  cap:`Actual line: summed WHO database deaths (HIV-negative plus with HIV: 1.73 million in 2015, 1.40 million in 2019) and the report's net −29% for 2024; 2021 and 2023 are worked back from the published 13.8% and 3% falls to 2024. The hollow diamond is GBD 2021 for 2015–2020 (−11.9%). Dashed: the 2015–2024 pace extended, drawn here, not a WHO projection. <sup class="c" data-ref="WHO-GTR2025,GBD2021TB2024,Floyd2018" title="Source 178,194,510">178,194,510</sup>`},
 cost:{n:'Households facing catastrophic costs',
  cap:`Catastrophic costs are total costs above 20% of annual household income or expenditure. Survey estimates are weighted pooled results from national patient cost surveys (40 countries for all TB, 37 for drug-resistant TB); the modelled estimate covers 135 low- and middle-income countries. Survey years differ by country, so the points are placed at the latest report, not at one year. <sup class="c" data-ref="WHO-GTR2025,Portnoy2023" title="Source 375,510">375,510</sup>`}
};
const RE_Y0=2015,RE_Y1=2035,reYr=t=>lerp(RE_Y0,RE_Y1,t),reT=y=>(y-RE_Y0)/(RE_Y1-RE_Y0);
const RE_MX={
 inc:{1:` For incidence the 2020 milestone (−20%) was missed globally: the WHO database rate fell from 148 to 129 per 100,000 (about −13%); 101 countries passed it on their own. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`,3:` The incidence rate fell 1.7% between 2023 and 2024, back to the 2020 level, for a net −12.3% since 2015. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`},
 death:{1:` For deaths the 2020 milestone (−35%) was missed: 65 countries passed it. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`,3:` Deaths fell about 3% between 2023 and 2024 and 13.8% compared with 2021, a net −29% since 2015. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`},
 cost:{1:` For costs there is no milestone date to read off: the target is that no TB-affected household faces catastrophic costs. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`,3:` Pooled national surveys: 47% of people treated for TB and their households faced catastrophic costs, 82% with drug-resistant TB; country estimates ranged from 13% (El Salvador) to 92% (Solomon Islands). <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`}
};
const RE_STEPS=[
 {from:0,at:reT(2015.3),k:'2015 · the baseline',t:'The End TB Strategy',
  txt:`Adopted by all WHO Member States in 2014, the strategy measures everything against 2015. Its 2035 targets: a 90% lower TB incidence rate, 95% fewer TB deaths, and no TB-affected household facing catastrophic costs. The milestones on the way were −20% and −35% by 2020, and −50% and −75% by 2025. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup> The 2030 targets are −80% and −90%. <sup class="c" data-ref="Floyd2018" title="Source 178">178</sup>`,
  pt:`In 2014 the world agreed a plan: by 2035, 90% fewer people falling ill with TB and 95% fewer dying.`,
  hook:`End TB 2035: incidence −90%, deaths −95% vs 2015, zero catastrophic costs.`},
 {from:reT(2019.6),at:reT(2020.2),k:'2020 · first milestones',t:'Missed, globally',
  txt:`The independent GBD 2021 analysis also found the 2020 milestones missed, estimating incidence down 6.26% and deaths down 11.9% between 2015 and 2020. <sup class="c" data-ref="GBD2021TB2024" title="Source 194">194</sup>`,
  mx:1,pt:`The first checkpoint, in 2020, was missed for the world as a whole, though many countries met it.`,
  hook:`2020 milestones: −20% incidence, −35% deaths. Missed globally; met by 101 and 65 countries.`},
 {from:reT(2020.6),at:reT(2022.5),k:'2020–2023 · COVID-19',t:'The pandemic setback',
  txt:`Notifications of people newly diagnosed with TB fell from 7.1 million in 2019 to 5.8 million in 2020. WHO assumes that more people went undiagnosed and untreated, raising transmission and pushing incidence up in 2021–2023; deaths rose in 2020–2021. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup> A 2021 review confirmed large disruptions to TB services but limited evidence on transmission itself. <sup class="c" data-ref="McQuaid2021" title="Source 317">317</sup>`,
  pt:`During COVID-19, many people with TB were not diagnosed. More illness and more deaths followed.`,
  hook:`Notifications: 7.1 million (2019) → 5.8 million (2020). Incidence rose 2021–2023.`},
 {from:reT(2023.6),at:reT(2024.05),k:'2024 · the latest data',t:'10.7 million ill, 1.23 million deaths',
  txt:`In 2024 an estimated 10.7 million people fell ill with TB (131 per 100,000) and about 1.23 million died. <sup class="c" data-ref="WHO-GTR2025,Zenner2027" title="Source 510,534">510,534</sup> The European Region cut incidence by 39% and the African Region by 28% since 2015, while incidence rose in the Americas (+13%). <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`,
  mx:1,pt:`Things are improving again, but slowly: the TB rate is about 12% lower than in 2015, not the 50% planned for 2025.`,
  hook:`2015→2024: incidence −12.3%, deaths −29% (2025 milestones: −50%, −75%).`},
 {from:reT(2024.6),at:reT(2025.2),k:'2025 · second milestones',t:'Far off track',
  txt:`With 2024 data at −12.3% for incidence and −29% for deaths, the world is far from the 2025 milestones of −50% and −75%. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup> South Africa is the one high-burden country estimated to have reached the 2025 incidence milestone; Kenya, Tanzania and Zambia were close. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`,
  pt:`The 2025 checkpoint is being missed by a wide margin, though a few countries are close.`,
  hook:`South Africa: the only high-burden country estimated to reach the 2025 incidence milestone.`},
 {from:reT(2029),at:1,k:'2030–2035 · the targets',t:'Only a breakthrough closes the gap',
  txt:`WHO states that the 2035 targets can only be met with technological breakthroughs such as a new TB vaccine. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup> Even with no new infections after 2015, existing infection alone was modelled to produce about 16.5 cases per 100,000 a year in 2035 (Hypothesis: model projection). <sup class="c" data-ref="Houben2016" title="Source 239">239</sup> Scroll down for the research routes, each with its evidence label.`,
  pt:`At today's pace the 2035 goals will not be reached. New vaccines, shorter treatment and better tests are needed.`,
  hook:`End TB needs a vaccine-level breakthrough (WHO GTR 2025); M72/AS01E is in phase 3.`}
];

inits.frontier=()=>{
  const svg=$('#reSvg'),rg=$('#reT');let ms='inc';
  const tgAt=(M,y)=>{const g=M.tg;for(let i=1;i<g.length;i++)if(y<=g[i][0])return lerp(g[i-1][1],g[i][1],(y-g[i-1][0])/(g[i][0]-g[i-1][0]));return g[g.length-1][1]};
  const actAt=(M,y)=>{const a=M.act;if(y>=2024)return a[a.length-1][1];for(let i=1;i<a.length;i++)if(y<=a[i][0])return lerp(a[i-1][1],a[i][1],(y-a[i-1][0])/(a[i][0]-a[i-1][0]));return 0};
  function draw(t){const N=vb(svg,'720 400','400 495');const Y=reYr(t),M=RE_M[ms];let s='';
    const L=N?{x0:44,x1:384,y0:56,y1:430}:{x0:62,x1:600,y0:46,y1:340};
    const X=y=>lerp(L.x0,L.x1,(y-RE_Y0)/(RE_Y1-RE_Y0));
    s+=`<text x="${L.x0-34}" y="22" class="t-sm" style="fill:var(--vax)">${ms==='cost'?(N?'HOUSEHOLDS, CATASTROPHIC COSTS':'HOUSEHOLDS FACING CATASTROPHIC COSTS (%)'):(M.n.toUpperCase()+(N?' vs 2015':' · CHANGE vs 2015'))}</text>`;
    [2015,2020,2025,2030,2035].forEach(y=>s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${L.y0}" y2="${L.y1}" class="grid"/><text x="${f1(X(y))}" y="${L.y1+15}" class="t-xs t-mid">${y}</text>`);
    if(ms!=='cost'){const V=v=>lerp(L.y0,L.y1,-v/100);
      [0,-25,-50,-75,-100].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v?v+'%':'0'}</text>`);
      /* gap shading up to the playhead (to 2024 at most) */
      const ye=Math.min(Y,2024);if(ye>2015){let up='',dn='';for(let y=2015;y<=ye+1e-6;y+=.25){up+=(up?'L':'M')+f1(X(y))+' '+f1(V(actAt(M,y)))}for(let y=ye;y>=2015-1e-6;y-=.25)dn+='L'+f1(X(y))+' '+f1(V(tgAt(M,y)));s+=`<path d="${up}${dn}Z" style="fill:var(--bad);opacity:.12"/>`}
      /* target line, full, faint ahead of the playhead */
      let tp='';for(let y=2015;y<=2035;y+=.5)tp+=(tp?'L':'M')+f1(X(y))+' '+f1(V(tgAt(M,y)));
      s+=`<path d="${tp}" style="fill:none;stroke:var(--vax);stroke-width:2;stroke-dasharray:6 4"/>`;
      if(!N)s+=`<text x="${f1(X(2035)+6)}" y="${f1(V(M.tg[4][1])+4)}" class="t-xs" style="fill:var(--vax)">target ${M.tg[4][1]}%</text>`;
      /* actual */
      if(Y>2015){let ap='';const ye2=Math.min(Y,2024);for(let y=2015;y<=ye2+1e-6;y+=.1)ap+=(ap?'L':'M')+f1(X(y))+' '+f1(V(actAt(M,y)));s+=`<path d="${ap}" style="fill:none;stroke:var(--bad);stroke-width:2.8;stroke-linejoin:round"/>`;
        M.act.forEach(a=>{if(a[0]>Y)return;s+=a[2]==='p'?`<circle cx="${f1(X(a[0]))}" cy="${f1(V(a[1]))}" r="4.5" style="fill:var(--panel);stroke:var(--bad);stroke-width:2"/>`:`<rect x="${f1(X(a[0])-3.5)}" y="${f1(V(a[1])-3.5)}" width="7" height="7" style="fill:var(--panel);stroke:var(--bad);stroke-width:1.6"/>`});
        if(Y>=2020)s+=`<path d="M${f1(X(2020))} ${f1(V(M.gbd)-6)}l6 6l-6 6l-6 -6z" style="fill:none;stroke:var(--muted);stroke-width:1.4"/><text x="${f1(X(2020)+9)}" y="${f1(V(M.gbd)-4)}" class="t-xs">GBD</text>`;
        if(Y>2024){const last=M.act[M.act.length-1][1],pace=last/9,ye3=Math.min(Y,2035);s+=`<line x1="${f1(X(2024))}" y1="${f1(V(last))}" x2="${f1(X(ye3))}" y2="${f1(V(last+pace*(ye3-2024)))}" style="stroke:var(--bad);stroke-width:1.8;stroke-dasharray:3 4;opacity:.7"/>`;
          if(Y>=2034.5)s+=`<text x="${f1(N?X(2035)-6:X(2035)+6)}" y="${f1(V(last+pace*11)+(N?-8:4))}" class="t-xs${N?' t-end':''}" style="fill:var(--bad)">${N?'':'pace: '}${Math.round(last+pace*11)}%</text>`}}
      /* milestone markers */
      M.tg.slice(1).forEach(([y,v])=>{const x=X(y),cy=V(v),past=Y>=y-.05,data=y<=2024.5;
        let st,col;if(!past){st='ahead';col='var(--muted)'}else if(y===2020){st='missed';col='var(--bad)'}else if(y===2025){st='off track';col='var(--bad)'}else{st='needs breakthrough';col='var(--warn)'}
        s+=`<circle cx="${f1(x)}" cy="${f1(cy)}" r="7" style="fill:var(--panel);stroke:${col};stroke-width:2"/>`;
        if(past&&(y===2020||y===2025))s+=`<path d="M${f1(x-3.5)} ${f1(cy-3.5)}l7 7M${f1(x+3.5)} ${f1(cy-3.5)}l-7 7" style="stroke:var(--bad);stroke-width:2"/>`;
        const lx=y===2035?x-10:x+10,anc=y===2035?' t-end':'';
        s+=`<text x="${f1(lx)}" y="${f1(cy+(y===2035?-12:16))}" class="t-xs${anc}" style="fill:${col}">${v}%${past&&!N?' · '+st:''}</text>`});
      /* playhead readout */
      if(Y<2025){const a=actAt(M,Y);s+=`<text x="${f1(X(Y))}" y="${f1(V(a)-10)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">${a.toFixed(1)}%</text>`}
      /* legend */
      const lgY=N?L.y1+34:L.y1+34;s+=`<line x1="${L.x0}" x2="${L.x0+24}" y1="${lgY-4}" y2="${lgY-4}" style="stroke:var(--vax);stroke-width:2;stroke-dasharray:6 4"/><text x="${L.x0+30}" y="${lgY}" class="t-xs">End TB target</text><line x1="${L.x0+(N?120:130)}" x2="${L.x0+(N?144:154)}" y1="${lgY-4}" y2="${lgY-4}" style="stroke:var(--bad);stroke-width:2.8"/><text x="${L.x0+(N?150:160)}" y="${lgY}" class="t-xs">actual (WHO)</text>`;
      if(!N)s+=`<text x="${L.x0+260}" y="${lgY}" class="t-xs">○ published · □ worked back · shaded = the gap</text>`;
      else s+=`<text x="${L.x0}" y="${lgY+16}" class="t-xs">○ published · □ worked back · shaded = gap</text>`;
      if(!N){/* side panel: where the world stands at the playhead */
        const tv=tgAt(M,Y),av=Y<2025?actAt(M,Y):null;s+=`<text x="612" y="70" class="t-sm">AT ${Math.floor(Y)}</text><text x="612" y="92" class="t-xs">target</text><text x="612" y="112" class="t-big" style="fill:var(--vax)">${tv.toFixed(0)}%</text><text x="612" y="136" class="t-xs">actual</text><text x="612" y="156" class="t-big" style="fill:var(--bad)">${av==null?'no data':av.toFixed(1)+'%'}</text>`;
        if(av!=null)s+=`<text x="612" y="180" class="t-xs">gap</text><text x="612" y="200" class="t-big">${(av-tv).toFixed(1)} pts</text>`}
    }else{/* catastrophic costs */
      const V=v=>lerp(L.y1,L.y0,v/100);
      [0,25,50,75,100].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
      s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(V(0))}" y2="${f1(V(0))}" style="stroke:var(--vax);stroke-width:3;stroke-dasharray:6 4"/><text x="${L.x1}" y="${f1(V(0)-6)}" class="t-xs t-end" style="fill:var(--vax)">End TB target: 0 households</text>`;
      /* social protection coverage grows 43% → 52% */
      if(Y>2015){const ye=Math.min(Y,2024),v=lerp(43,52,(ye-2015)/9);s+=`<line x1="${f1(X(2015))}" y1="${f1(V(43))}" x2="${f1(X(ye))}" y2="${f1(V(v))}" style="stroke:var(--rx);stroke-width:2.4"/><circle cx="${f1(X(2015))}" cy="${f1(V(43))}" r="4" style="fill:var(--panel);stroke:var(--rx);stroke-width:2"/><text x="${f1(X(2015)+6)}" y="${f1(V(43)+16)}" class="t-xs" style="fill:var(--rx)">${N?'social protection':'social protection coverage'} 43%${ye>=2024?' → 52%':''}</text>`}
      const pts=[{y:2024,v:47,lo:37,hi:58,l:'all TB, surveys 47%',c:'var(--bad)',at:2023},{y:2024.8,v:82,lo:71,hi:93,l:'drug-resistant TB 82%',c:'var(--bad)',at:2024},{y:2023.2,v:54.9,lo:47,hi:63.2,l:'modelled, 135 LMICs 54.9%',c:'var(--warn)',at:2022},{y:N?2026.2:2027.6,v:75.2,l:'poorest fifth 75.2%',c:'var(--warn)',at:2025},{y:N?2026.2:2027.6,v:42.5,l:'richest fifth 42.5%',c:'var(--warn)',at:2025}];
      pts.forEach(p=>{if(Y<p.at)return;const x=X(p.y);if(p.lo!=null)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(V(p.lo))}" y2="${f1(V(p.hi))}" style="stroke:${p.c};stroke-width:1.6"/>`;
        s+=`<circle cx="${f1(x)}" cy="${f1(V(p.v))}" r="5" style="fill:${p.c}"/><text x="${f1(x+9)}" y="${f1(V(p.v)+4)}" class="t-xs" style="fill:var(--ink)">${p.l}</text>`});
      if(Y>=2025.5){const x=X(N?2030.3:2034);s+=`<rect x="${f1(x-5)}" y="${f1(V(92))}" width="10" height="${f1(V(13)-V(92))}" rx="4" style="fill:var(--bad);opacity:.25"/><text x="${f1(x)}" y="${f1(V(92)-6)}" class="t-xs t-mid">92%</text><text x="${f1(x)}" y="${f1(V(13)+14)}" class="t-xs t-mid">13%</text><text x="${f1(N?x+9:x-9)}" y="${f1(V(N?52:25))}" class="t-xs${N?'':' t-end'}">${N?'countries':'range across countries'}</text>`}
      if(!N)s+=`<text x="612" y="70" class="t-sm">TARGET</text><text x="612" y="92" class="t-big" style="fill:var(--vax)">0%</text><text x="612" y="120" class="t-sm">SURVEYS</text><text x="612" y="142" class="t-big" style="fill:var(--bad)">${Y>=2023?'47%':'—'}</text>`}
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${L.y0-6}" y2="${L.y1}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/><rect x="${f1(X(Y)-20)}" y="${L.y0-20}" width="40" height="14" rx="3" style="fill:var(--ink)"/><text x="${f1(X(Y))}" y="${L.y0-9}" class="t-xs t-mid" style="fill:var(--bg)">${Math.floor(Y)}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(RE_STEPS,t);setSt(ph);const P=Object.assign({},RE_STEPS[ph]);if(P.mx&&RE_MX[ms][ph])P.txt+=RE_MX[ms][ph];$('#reNote').innerHTML=noteHTML(P);
    $('#reCap').innerHTML=M.cap;
    if(ms==='cost')$('#reRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>target <b>no household</b></span><span>latest surveys <b>47%</b> (drug-resistant TB <b>82%</b>)</span>`;
    else{const tv=tgAt(M,Y);$('#reRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>target <b>${tv.toFixed(0)}%</b></span><span>actual <b>${Y<2025?actAt(M,Y).toFixed(1)+'%':'latest −'+Math.abs(M.act[M.act.length-1][1])+'% (2024)'}</b></span>`}
  }
  const stop=playWire(rg,$('#rePlay'),draw,20000,'Replay','frontier');
  const setSt=stepWire($('#reSteps'),RE_STEPS,rg,draw,stop);
  $$('[data-rem]').forEach(b=>b.addEventListener('click',()=>{ms=b.dataset.rem;$$('[data-rem]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- funding bars ---- */
  const fd=$('#reFund');
  function drawF(){const N=vb(fd,'720 170','400 250');let s='';const x0=N?12:200,x1=N?388:640;
    const B=[{l:'TB services, 2024',a:5.9,g:22,u:'US$ billion a year'},{l:'TB research, 2023',a:1.2,g:5,u:'US$ billion a year'}];
    B.forEach((b,i)=>{const y=N?30+i*104:36+i*62,X=v=>x0+(x1-x0)*v/b.g;
      s+=N?`<text x="${x0}" y="${y-8}" class="t-sm" style="fill:var(--ink)">${b.l}</text>`:`<text x="${x0-12}" y="${y+16}" class="t-sm t-end" style="fill:var(--ink)">${b.l}</text>`;
      s+=`<rect x="${x0}" y="${y}" width="${x1-x0}" height="24" rx="5" style="fill:none;stroke:var(--vax);stroke-width:1.4;stroke-dasharray:5 4"/><rect x="${x0}" y="${y}" width="${f1(X(b.a)-x0)}" height="24" rx="5" style="fill:var(--vax)"/>`;
      s+=`<text x="${f1(X(b.a)+8)}" y="${y+16}" class="t-xs" style="fill:var(--ink)">${b.a} available (${Math.round(b.a/b.g*100)}%)</text><text x="${x1}" y="${y+40}" class="t-xs t-end">2027 target ${b.g} · ${b.u}</text>`});
    fd.innerHTML=s}
  drawF();const prevR=redraws.frontier;redraws.frontier=()=>{prevR&&prevR();drawF()};

  /* ---- board filters ---- */
  let fe='all',fk='all';
  function filt(){let n=0;const C=$$('#reBoard .card');C.forEach(c=>{const ok=(fe==='all'||c.dataset.ev===fe)&&(fk==='all'||c.dataset.k===fk);c.hidden=!ok;if(ok)n++});$('#reCount').textContent=n+' of '+C.length+' shown'}
  $$('[data-ref]').forEach(b=>b.addEventListener('click',()=>{fe=b.dataset.ref;$$('[data-ref]').forEach(x=>x.setAttribute('aria-pressed',x===b));filt()}));
  $$('[data-rek]').forEach(b=>b.addEventListener('click',()=>{fk=b.dataset.rek;$$('[data-rek]').forEach(x=>x.setAttribute('aria-pressed',x===b));filt()}));
  filt();
};
/* =============== 5.1 Living with TB =============== */
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT');let sup=false,setSt=()=>{};
  const M0=-1.5,M1=7.5,mOf=t=>lerp(M0,M1,t),tOf=m=>(m-M0)/(M1-M0);
  const DPM=182/6;/* doses per month on a daily 6-month regimen */
  const RND=(()=>{const r=rng(5151);return Array.from({length:183},()=>r())})();
  const missP=(md,s)=>s?.015+.02*ramp(md,2,4.5):.03+.1*ramp(md,2,4.5);
  /* feelings and practical problems along the road; alt: the label when the support package is on */
  const FLAGS=[
    {m:-1.3,l:'weeks of cough',c:'muted'},
    {m:-.9,l:'lost work days',c:'bad'},
    {m:-.45,l:'travel to clinics',c:'warn'},
    {m:0,l:'diagnosis: fear',c:'bad'},
    {m:.12,l:'mask, stay home',c:'accent'},
    {m:.45,l:'who do I tell?',c:'bad'},
    {m:.8,l:'orange urine: expected',c:'warn'},
    {m:1.2,l:'feeling low',c:'warn',alt:'counselling',ac:'good'},
    {m:1.7,l:'feeling better',c:'good'},
    {m:2.4,l:'back to work?',c:'accent'},
    {m:3.3,l:'tempted to stop',c:'warn',alt:'video check-in',ac:'good'},
    {m:4.3,l:'income gap',c:'bad',alt:'cash + food help',ac:'good'},
    {m:5.2,l:'missed a dose',c:'bad',alt:'nurse follows up',ac:'good'},
    {m:6,l:'treatment complete',c:'good'},
    {m:6.8,l:'lung check-up',c:'accent'}];
  const SUPTXT=on=>on?` <b>Support is on.</b> The dose strip misses fewer doses and the flags change: counselling, a video check-in, cash and food help. In trials, cash transfers with home visits raised treatment success from 53% to 64% (Peru) and an interactive app with a supporter from 74% to 82% (Argentina). <sup class="c" data-ref="Wingfield2017,Rubinstein2026" title="Source 404,523">404,523</sup>`
    :` <b>Support is off.</b> Press the support toggle to see what changes. Without it, missed doses cluster in the long continuation phase, as they do in real cohorts. <sup class="c" data-ref="Liu2015PLoSMed" title="Source 292">292</sup>`;
  const STEPS=[
    {from:0,at:tOf(-.8),k:'Weeks before diagnosis',t:'Before anyone says "TB"',
     txt:`A cough that will not go away, tiredness, sweats at night. Costs start long before treatment: in low- and middle-income countries, half the total cost to people with TB came before treatment began, and lost income made up 60% of it. On average, total costs reached 58% of a year's individual income and 39% of household income. Even where treatment is free, a model across 135 countries put the mean cost at US$ 1253 per episode. <sup class="c" data-ref="Tanimura2014,Portnoy2023" title="Source 375,459">375,459</sup>`,
     pt:`TB is nobody's fault. It is caused by a germ in the air, and it can be cured. Seeing a clinician early saves money as well as health.`,
     hook:`Tanimura 2014: half of patient costs come before treatment; income loss is 60% of the total.`},
    {from:tOf(0),at:tOf(.22),k:'Weeks 0–2 · starting treatment',t:'Diagnosis and the first weeks',
     txt:`Starting effective treatment promptly is one of WHO's two strong infection-control recommendations. <sup class="c" data-ref="WHO-IPC2019" title="Source 511">511</sup> It works fast on transmission: in guinea-pig studies of air from an MDR-TB ward, transmission was minimal from people who had just started effective treatment. <sup class="c" data-ref="Dharmadhikari2014" title="Source 120">120</sup> Someone with TB of the lungs may be asked to stay home and wear a mask for a short time. Sputum turns negative more slowly: in pooled data only 9% had a negative smear at 2 weeks, so the test, not the calendar, decides when isolation ends. <sup class="c" data-ref="Calderwood2021,Jensen2005" title="Source 59,249">59,249</sup> WHO recommends health education and counselling for everyone on treatment (strong, moderate certainty). <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`,
     pt:`Once you are on the right medicines, you quickly become much less likely to pass TB on. A short time at home is to protect others, not a punishment.`,
     hook:`In hospital, CDC keeps airborne precautions until three negative smears, at least 2 weeks of standard treatment and clinical improvement. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`},
    {from:tOf(.6),at:tOf(1.1),k:'Months 1–2 · the intensive phase',t:'Side effects, and feelings',
     txt:`Four drugs every day. Rifampicin can turn urine, sweat, tears and sputum orange-red and can stain soft contact lenses: expected, and people should be told in advance. <sup class="c" data-ref="FDA-Rifampin" title="Source 168">168</sup> Changes in eyesight or colour vision on ethambutol should be reported straight away. <sup class="c" data-ref="FDA-Ethambutol" title="Source 159">159</sup> Feelings matter as much: pooled depression prevalence in people with TB was 45%, and depressive symptoms went with loss to follow-up (OR 8.70, few studies). Stigma is common too: 82% of people describing their experience in Lusaka reported it. <sup class="c" data-ref="Duko2020,RuizGrosso2020,Cremers2015" title="Source 95,143,406">95,143,406</sup>`,
     pt:`Orange urine is the medicine, not a problem. Feeling low or worried is common with TB: tell your nurse, because help is available and it makes treatment easier.`,
     hook:`Depression in about 45% of people with TB, 52% in MDR-TB (Duko 2020). Screen for it: its symptoms overlap with TB's. <sup class="c" data-ref="Sweetland2017" title="Source 453">453</sup>`},
    {from:tOf(1.6),at:tOf(2.3),k:'Month 2',t:'Feeling better, still treating',
     txt:`By 2 months, 82% had a negative smear and 88% a negative solid culture in a WHO-commissioned meta-analysis. <sup class="c" data-ref="Calderwood2021" title="Source 59">59</sup> The intensive phase ends and two drugs continue. Weight is a good sign to watch: in the RATIONS cohort, gaining 5% of body weight by 2 months went with a lower hazard of death (aHR 0.39). <sup class="c" data-ref="Bhargava2023LGH" title="Source 40">40</sup> Going back to work or school is the clinician's call, based on tests and the response to treatment; for health workers, CDC asks for three negative sputum samples, a probably effective treatment and a physician's judgement. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`,
     pt:`You will probably feel much better now. The germs that are left are the slow, stubborn ones, which is why the tablets carry on for months.`,
     hook:`Smear conversion: 9% at 2 weeks, 82% at 2 months; solid culture 5% and 88% (pooled). <sup class="c" data-ref="Calderwood2021" title="Source 59">59</sup>`},
    {from:tOf(2.8),at:tOf(4.4),k:'Months 3–6 · the continuation phase',t:'The long middle: where support matters',
     txt:`Feeling well, back at work, money tight: this is when doses slip. Across 22 trials, DOTS cut loss to follow-up by 49%, financial incentives by 26% and education by 13%. <sup class="c" data-ref="Muller2018" title="Source 335">335</sup> WHO suggests community- or home-based treatment support over clinic-only or unsupported treatment, and says video-supported treatment can replace in-person support where it can be run well. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`,
     pt:`A nurse or helper may watch you take your pills, in person or by video. This is support to help you finish, not a sign that anyone doubts you.`,
     hook:`WHO material support = food or money (meals, baskets, vouchers, transport, allowances). Pillboxes alone did not improve outcomes in ASCENT. <sup class="c" data-ref="WHO-Mod4-2025,Jerene2025" title="Source 251,515">251,515</sup>`},
    {from:tOf(5.8),at:tOf(6.45),k:'Month 6 and after',t:'Cure, and the years after',
     txt:`Treatment success for drug-susceptible TB was 88% in the 2023 cohort worldwide. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup> Clinical standards ask for everyone to be assessed for post-TB lung disease at the end of treatment, with rehabilitation for those who need it. <sup class="c" data-ref="Migliori2021PTLD" title="Source 324">324</sup> In Bangladesh, a 6-week programme raised 6-minute walk distance from 402.8 m to 456.7 m (no control group). <sup class="c" data-ref="Rifat2026" title="Source 397">397</sup> Recurrence after successful treatment was 2.26 per 100 person-years in pooled studies, so new symptoms deserve a new check. <sup class="c" data-ref="Vega2021" title="Source 491">491</sup>`,
     pt:`If breathing is still hard after treatment, lung rehabilitation exercises can help you walk further. These numbers describe groups of people, not what will happen to you.`,
     hook:`Post-TB: assess lungs at the end of treatment; rehabilitation, stopping smoking and vaccines rest on expert opinion. <sup class="c" data-ref="Migliori2021PTLD,Allwood2021" title="Source 9,324">9,324</sup>`}];
  const ico=(k,x,y,s)=>{/* small support glyphs, s ~ 14 */
    const c='var(--rx)';
    if(k===0)return `<path d="M${f1(x-s*.5)} ${f1(y-s*.1)}H${f1(x+s*.5)}Q${f1(x+s*.45)} ${f1(y+s*.45)} ${f1(x)} ${f1(y+s*.45)}Q${f1(x-s*.45)} ${f1(y+s*.45)} ${f1(x-s*.5)} ${f1(y-s*.1)}Z" style="fill:${c}"/><circle cx="${f1(x-s*.15)}" cy="${f1(y-s*.25)}" r="${f1(s*.16)}" style="fill:var(--dZ)"/><circle cx="${f1(x+s*.18)}" cy="${f1(y-s*.28)}" r="${f1(s*.14)}" style="fill:var(--dR)"/>`;
    if(k===1)return `<rect x="${f1(x-s*.5)}" y="${f1(y-s*.4)}" width="${f1(s)}" height="${f1(s*.65)}" rx="${f1(s*.12)}" style="fill:${c}"/><rect x="${f1(x-s*.38)}" y="${f1(y-s*.3)}" width="${f1(s*.76)}" height="${f1(s*.22)}" style="fill:var(--panel)"/><circle cx="${f1(x-s*.28)}" cy="${f1(y+s*.3)}" r="${f1(s*.12)}" style="fill:var(--ink)"/><circle cx="${f1(x+s*.28)}" cy="${f1(y+s*.3)}" r="${f1(s*.12)}" style="fill:var(--ink)"/>`;
    if(k===2)return `<rect x="${f1(x-s*.3)}" y="${f1(y-s*.5)}" width="${f1(s*.6)}" height="${f1(s)}" rx="${f1(s*.1)}" style="fill:${c}"/><rect x="${f1(x-s*.22)}" y="${f1(y-s*.38)}" width="${f1(s*.44)}" height="${f1(s*.66)}" style="fill:var(--panel)"/><path d="M${f1(x-s*.07)} ${f1(y-s*.17)}L${f1(x+s*.12)} ${f1(y-s*.05)}L${f1(x-s*.07)} ${f1(y+s*.07)}Z" style="fill:${c}"/>`;
    return `<rect x="${f1(x-s*.55)}" y="${f1(y-s*.3)}" width="${f1(s*1.1)}" height="${f1(s*.6)}" rx="${f1(s*.08)}" style="fill:${c}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s*.17)}" style="fill:none;stroke:var(--panel);stroke-width:1.2"/>`};
  function draw(t){
    const N=vb(svg,'720 460','400 492'),m=mOf(t);
    const L=N?{x0:40,x1:384,bn:14,fr:[30,47,64,81,98],py:116,ps:34,rd:152,dT:172,d0:178,d1:196,sT:218,s0:226,s1:300,cT:344,c0:352,c1:392,uT:414,u0:432,tk:464,ft:482,ch:5.6}
            :{x0:60,x1:700,bn:14,fr:[30,47,64,81],py:100,ps:38,rd:140,dT:162,d0:168,d1:186,sT:208,s0:216,s1:292,cT:322,c0:330,c1:366,uT:388,u0:406,tk:436,ft:452,ch:5.7};
    const X=v=>lerp(L.x0,L.x1,(v-M0)/(M1-M0)),xN=X(m);let s='';
    /* phase bands */
    [[M0,0,'var(--panel-2)',N?'before':'before diagnosis'],[0,2,'var(--tb-soft)',N?'intensive':'intensive · 4 drugs'],[2,6,'var(--rx-soft)',N?'continuation · 2 drugs':'continuation phase · 2 drugs'],[6,M1,'var(--good-soft)','after']].forEach(([a,b,c,n])=>{
      s+=`<rect x="${f1(X(a))}" y="${L.bn+6}" width="${f1(X(b)-X(a))}" height="${L.u0+22-L.bn}" style="fill:${c};opacity:.55"/><text x="${f1((X(a)+X(b))/2)}" y="${L.bn}" class="t-xs t-mid" style="fill:var(--ink)">${n}</text>`});
    /* the road */
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.rd}" y2="${L.rd}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/><line x1="${L.x0}" x2="${f1(xN)}" y1="${L.rd}" y2="${L.rd}" style="stroke:var(--brand);stroke-width:5;stroke-linecap:round;opacity:.55"/>`;
    /* flags: newest first get a label; older ones keep a dot if the rows are full */
    const vis=FLAGS.filter(f=>f.m<=m+1e-6),rows=L.fr.map(()=>[]);let fl='';
    for(let i=vis.length-1;i>=0;i--){const f=vis[i],lab=sup&&f.alt?f.alt:f.l,col=sup&&f.alt?f.ac:f.c,x=X(f.m),w=lab.length*L.ch+10;
      let x0=x-4;if(x0+w>L.x1+14)x0=L.x1+14-w;
      let r=rows.findIndex(R=>R.every(([a,b])=>x0+w+4<a||x0>b+4));
      const c=col==='muted'?'var(--muted)':'var(--'+col+')';
      fl+=`<circle cx="${f1(x)}" cy="${L.rd}" r="3.4" style="fill:${c};stroke:var(--panel);stroke-width:1"/>`;
      if(r<0||(N&&vis.length-i>5))continue;
      rows[r].push([x0,x0+w]);const y=L.fr[r],fresh=clamp((m-f.m)/.25);
      fl+=`<g style="opacity:${f1(.35+.65*fresh)}"><line x1="${f1(x)}" x2="${f1(x)}" y1="${y+14}" y2="${L.rd-3}" style="stroke:${c};stroke-width:1;stroke-dasharray:2 2"/><rect x="${f1(x0)}" y="${y}" width="${f1(w)}" height="15" rx="7.5" style="fill:var(--panel);stroke:${c};stroke-width:1.3"/><text x="${f1(x0+5)}" y="${y+11}" class="t-xs" style="fill:${c==='var(--muted)'?'var(--muted)':'var(--ink)'}">${lab}</text></g>`}
    /* the person: coughing before treatment, masked for the first couple of weeks */
    const bob=Math.abs(Math.sin(m*9))*2;
    s+=person(xN,L.py-bob,L.ps,'var(--brand)',{cough:m<.35,mask:m>=0&&m<.5,face:1});
    s+=fl;
    /* lane 1: doses */
    s+=`<text x="${L.x0}" y="${L.dT}" class="t-sm" style="fill:var(--rx)">${N?'DAILY DOSES':'DAILY DOSES · drawn, not measured'}</text>`;
    let tk=0,ms=0;const dw=(X(6)-X(0))/182;
    s+=`<rect x="${f1(X(0))}" y="${L.d0}" width="${f1(X(6)-X(0))}" height="${L.d1-L.d0}" rx="3" style="fill:var(--panel);stroke:var(--line)"/>`;
    for(let d=0;d<182;d++){const md=d/DPM;if(md>m)break;const miss=RND[d]<missP(md,sup);miss?ms++:tk++;
      s+=`<rect x="${f1(X(md)+.2)}" y="${f1(miss?L.d0+1:L.d0+3)}" width="${f1(Math.max(.8,dw-.4))}" height="${f1(miss?L.d1-L.d0-2:L.d1-L.d0-6)}" style="fill:${miss?'var(--bad)':'var(--rx)'};opacity:${miss?1:.75}"/>`}
    s+=`<text x="${L.x1}" y="${L.dT}" class="t-xs t-end"><tspan style="fill:var(--rx)">■ taken ${tk}</tspan>  <tspan style="fill:var(--bad)">■ missed ${ms}</tspan></text>`;
    /* lane 2: sputum conversion, pooled published points */
    const V=p=>lerp(L.s1,L.s0,p/100);
    s+=`<text x="${L.x0}" y="${L.sT}" class="t-sm" style="fill:var(--accent)">${N?'SPUTUM NEGATIVE · pooled %':'SPUTUM TURNS NEGATIVE · share of people, pooled'}</text>`;
    [0,50,100].forEach(p=>s+=`<line x1="${f1(X(0))}" x2="${f1(X(2.6))}" y1="${f1(V(p))}" y2="${f1(V(p))}" class="${p?'grid':'axis'}"/><text x="${f1(X(0)-4)}" y="${f1(V(p)+3)}" class="t-xs t-end">${p}%</text>`);
    const SM=[[0,0],[.46,9],[2,82]],CU=[[0,0],[.46,5],[2,88]];
    const seg=(P,col,lbl,dy)=>{if(m<=0)return '';let d='';const e=Math.min(m,2);
      for(let i=0;i<P.length;i++){const [a,v]=P[i];if(a>e){const [pa,pv]=P[i-1];d+='L'+f1(X(e))+' '+f1(V(lerp(pv,v,(e-pa)/(a-pa))));break}d+=(i?'L':'M')+f1(X(a))+' '+f1(V(v))}
      let o=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.2"/>`;
      P.slice(1).forEach(([a,v])=>{if(m>=a)o+=`<circle cx="${f1(X(a))}" cy="${f1(V(v))}" r="4.5" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`});
      if(m>=2&&lbl&&!N)o+=`<text x="${f1(X(2)+8)}" y="${f1(V(P[2][1])+dy)}" class="t-xs" style="fill:${col}">${lbl}</text>`;
      return o};
    s+=seg(SM,'var(--accent)',N?'smear 82%':'smear 82%',8)+seg(CU,'var(--rx)',N?'culture 88%':'culture 88%',-3);
    if(N){if(m>=.46)s+=`<text x="${L.x0}" y="${f1(V(0)+14)}" class="t-xs">2 wk: <tspan style="fill:var(--accent)">smear 9%</tspan> · <tspan style="fill:var(--rx)">culture 5%</tspan></text>`;
      if(m>=2)s+=`<text x="${L.x0}" y="${f1(V(0)+26)}" class="t-xs">2 mo: <tspan style="fill:var(--accent)">smear 82%</tspan> · <tspan style="fill:var(--rx)">culture 88%</tspan></text>`}
    else if(m>=.46)s+=`<text x="${f1(X(.46)+8)}" y="${f1(V(0)+13)}" class="t-xs">2 weeks: <tspan style="fill:var(--accent)">smear 9%</tspan> · <tspan style="fill:var(--rx)">solid culture 5%</tspan></text>`;
    /* inset: trial results for support (appears in the continuation phase) */
    if(m>=2.8){const ix=N?X(3.1):X(3.55),iw=L.x1+(N?6:20)-ix,op=ramp(m,2.8,3.3),bw=iw-(N?44:52),rh=N?23:23;
      s+=`<g style="opacity:${f1(op)}"><rect x="${f1(ix)}" y="${L.s0-12}" width="${f1(iw)}" height="${L.s1-L.s0+18}" rx="8" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<text x="${f1(ix+8)}" y="${L.s0+1}" class="t-xs" style="fill:var(--ink)">${N?'IN TRIALS: without / with':'IN TRIALS · grey: without support · green: with'}</text>`;
      [[N?'success · cash, Peru':'treatment success · cash + visits, Peru',53,64],[N?'success · app, Argentina':'treatment success · app + supporter, Argentina',74,82],[N?'months ≥20% doses missed':'months with ≥20% doses missed · pillbox, China',29.9,13.9]].forEach(([n,a,b],i)=>{const y=L.s0+8+i*rh,bx=ix+8;
        s+=`<text x="${f1(bx)}" y="${y+7}" class="t-xs">${n}</text>`;
        s+=`<rect x="${f1(bx)}" y="${y+10}" width="${f1(bw*a/100)}" height="4.5" rx="2" style="fill:var(--fibro);opacity:${sup?.45:1}"/><rect x="${f1(bx)}" y="${y+15.5}" width="${f1(bw*b/100)}" height="4.5" rx="2" style="fill:var(--rx);opacity:${sup?1:.4}"/>`;
        s+=`<text x="${f1(bx+bw*Math.max(a,b)/100+4)}" y="${y+19}" class="t-xs">${a}→${b}%</text>`});
      s+=`</g>`}
    /* lane 3: household costs, half spent before treatment starts */
    const cum=v=>v<=0?50*ramp(v,M0,0):50+50*ramp(v,0,6),C=p=>lerp(L.c1,L.c0,p/100);
    s+=`<text x="${L.x0}" y="${L.cT}" class="t-sm" style="fill:var(--warn)">${N?'HOUSEHOLD COSTS SO FAR':'HOUSEHOLD COSTS SPENT SO FAR · share of the episode total'}</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.c1}" y2="${L.c1}" class="axis"/><line x1="${L.x0}" x2="${f1(X(6))}" y1="${f1(C(100))}" y2="${f1(C(100))}" class="grid"/>`;
    {let d=`M${f1(X(M0))} ${L.c1}`;const e=Math.min(m,6);for(let v=M0;v<=e+1e-9;v+=.05)d+='L'+f1(X(v))+' '+f1(C(cum(v)));d+=`L${f1(X(e))} ${L.c1}Z`;
      s+=`<path d="${d}" style="fill:var(--warn);opacity:.35"/>`;
      s+=`<circle cx="${f1(X(Math.min(m,6)))}" cy="${f1(C(cum(Math.min(m,6))))}" r="3.5" style="fill:var(--warn)"/>`;
      if(m>=0)s+=`<circle cx="${f1(X(0))}" cy="${f1(C(50))}" r="4.5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(0)-7)}" y="${f1(C(50)-6)}" class="t-xs t-end" style="fill:var(--ink)">${N?'half':'half before treatment'}</text>`;
      if(m>=6)s+=`<text x="${f1(X(6)-7)}" y="${f1(N?C(100)-3:C(100)+13)}" class="t-xs t-end" style="fill:var(--ink)">${N?'≈39% of yearly income':'total ≈39% of yearly household income'}</text>`}
    /* lane 4: the support package */
    s+=`<text x="${L.x0}" y="${L.uT}" class="t-sm" style="fill:var(--rx)">${N?'SUPPORT PACKAGE':'SUPPORT PACKAGE · food · transport · video DOT · cash'}</text>`;
    if(sup){for(let k=0;k<24;k++){const v=k*(N?.5:.25);if(v>Math.min(m,6))break;s+=ico(k%4,X(v)+6,L.u0,N?10:13)}}
    else s+=`<text x="${f1(X(0))}" y="${L.u0+4}" class="t-xs">none: press "With a support package"</text>`;
    /* month ticks, playhead */
    for(let v=-1;v<=7;v++){if(N&&v%2&&v!==-1)continue;s+=`<text x="${f1(X(v))}" y="${L.tk}" class="t-xs t-mid">${v===0?'dx':v<0?'−1':v}</text>`}
    s+=`<text x="${L.x1}" y="${L.ft}" class="t-xs t-end">months from diagnosis (dx)</text><text x="${L.x0}" y="${L.ft}" class="t-xs" style="fill:var(--warn)">SCHEMATIC</text>`;
    s+=`<line x1="${f1(xN)}" x2="${f1(xN)}" y1="${L.rd+8}" y2="${L.u0+18}" style="stroke:var(--ink);stroke-width:1.1;opacity:.3"/>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);setSt(ph);
    const P=Object.assign({},STEPS[ph]);if(ph===4)P.txt+=SUPTXT(sup);
    $('#lvNote').innerHTML=noteHTML(P);
    const smv=m<=0?0:m<=.46?9*m/.46:m<=2?lerp(9,82,(m-.46)/1.54):82;
    $('#lvRead').innerHTML=`<span>month <b>${m<0?f1(m)+' (before diagnosis)':f1(Math.min(m,7.5))}</b></span><span>doses taken <b>${tk}</b> · missed <b>${ms}</b>${tk+ms?` (${Math.round(100*tk/(tk+ms))}%)`:''}</span><span>pooled smear-negative <b>${m>2?'82% (2-month value)':Math.round(smv)+'%'}</b></span><span>costs spent <b>${Math.round(cum(Math.min(m,6)))}%</b></span><span>support <b>${sup?'on':'off'}</b></span>`;
  }
  const stop=playWire(rg,$('#lvPlay'),draw,24000,'Replay','living');
  setSt=stepWire($('#lvSteps'),STEPS,rg,draw,stop);
  $('#lvSup').addEventListener('click',()=>{sup=!sup;$('#lvSup').setAttribute('aria-pressed',sup);draw(+rg.value)});
  draw(+rg.value);

  /* ---- after cure: mortality icon array, catastrophic costs, DALYs ---- */
  const ps=$('#lvPost');let lp='all',lc='all';
  const LP={all:{smr:2.91,n:29,l:'everyone treated',ci:'2.21–3.84'},cured:{smr:3.76,n:38,l:'cured or completed',ci:'3.04–4.66'}};
  const LC={all:{v:47,l:'all TB · 40 national surveys',src:'WHO 2025'},dr:{v:82,l:'drug-resistant TB',src:'WHO 2025'},poor:{v:75.2,l:'poorest fifth of households',src:'model, 135 countries'},rich:{v:42.5,l:'richest fifth of households',src:'model, 135 countries'}};
  const house=(x,y,s,on)=>`<path d="M${f1(x)} ${f1(y-s*.5)}L${f1(x+s*.5)} ${f1(y-s*.05)}V${f1(y+s*.45)}H${f1(x-s*.5)}V${f1(y-s*.05)}Z" style="fill:${on?'var(--warn)':'none'};stroke:${on?'var(--warn)':'var(--line)'};stroke-width:1"/>`;
  function drawP(){
    const N=vb(ps,'720 330','400 584');let s='';
    const A=N?{x:20,y:28,w:360}:{x:20,y:28,w:330},B=N?{x:20,y:258,w:360}:{x:390,y:28,w:320};
    const P=LP[lp],C=LC[lc];
    /* panel A: deaths icon array */
    s+=`<text x="${A.x}" y="${A.y-8}" class="t-sm" style="fill:var(--brand)">${N?'DEATHS AFTER TREATMENT (SMR)':'DEATHS AFTER TB TREATMENT (SMR)'}</text>`;
    const sz=N?18:17,gap=N?34:31;
    s+=`<text x="${A.x}" y="${A.y+14}" class="t-xs" style="fill:var(--ink)">same-age general population: 10 deaths</text>`;
    for(let i=0;i<10;i++)s+=person(A.x+i*gap*.98+6,A.y+22,sz,'var(--fibro)');
    s+=`<text x="${A.x}" y="${A.y+62}" class="t-xs" style="fill:var(--ink)">people treated for TB, ${P.l}: about ${P.n}</text>`;
    for(let i=0;i<40;i++){if(i>=P.n)break;const r=Math.floor(i/10),c=i%10;s+=person(A.x+c*gap*.98+6,A.y+70+r*(sz+6),sz,'var(--brand)')}
    s+=`<text x="${A.x}" y="${A.y+70+4*(sz+6)+10}" class="t-big" style="fill:var(--brand)">SMR ${P.smr}</text><text x="${A.x+86}" y="${A.y+70+4*(sz+6)+10}" class="t-xs">95% CI ${P.ci}</text><text x="${A.x}" y="${A.y+70+4*(sz+6)+26}" class="t-xs">most common cause of death: cardiovascular (20%)</text>`;
    /* panel B: catastrophic costs, 100 houses */
    s+=`<text x="${B.x}" y="${B.y-8}" class="t-sm" style="fill:var(--warn)">CATASTROPHIC COSTS · per 100 households</text>`;
    const hs=N?16:13,hg=N?34:24,on=Math.round(C.v);
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10;s+=house(B.x+10+c*hg,B.y+12+r*(hs+5),hs,i<on)}
    const yb=B.y+12+10*(hs+5)+4;
    s+=`<text x="${B.x}" y="${yb}" class="t-big" style="fill:var(--warn)">${C.v}%</text><text x="${B.x+(N?62:56)}" y="${yb}" class="t-xs">${C.l} (${C.src})</text>`;
    s+=`<text x="${B.x}" y="${yb+14}" class="t-xs">catastrophic: above 20% of yearly household income</text>`;
    /* DALY bar across the bottom */
    const D=N?{x:20,y:yb+50,w:360}:{x:20,y:262,w:680},k=D.w/12.1;
    s+=`<text x="${D.x}" y="${D.y-8}" class="t-sm" style="fill:var(--tb)">${N?'HEALTHY LIFE LOST PER TB EPISODE':'HEALTHY LIFE LOST PER TB EPISODE · 12.1 DALYs on average'}</text>`;
    s+=`<rect x="${D.x}" y="${D.y}" width="${f1(k*6.3)}" height="18" rx="4" style="fill:var(--tb);opacity:.85"/><rect x="${f1(D.x+k*6.3)}" y="${D.y}" width="${f1(k*5.8)}" height="18" rx="4" style="fill:var(--tb);opacity:.35"/>`;
    s+=`<text x="${D.x+6}" y="${D.y+13}" class="t-xs" style="fill:var(--panel)">${N?'the illness':'the illness and its deaths'}</text><text x="${f1(D.x+k*6.3+6)}" y="${D.y+13}" class="t-xs" style="fill:var(--ink)">${N?'after it: 5.8 (47%)':'after the episode: 5.8 DALYs (47%)'}</text>`;
    s+=`<text x="${D.x}" y="${D.y+32}" class="t-xs">${N?'28% of the total comes 15+ years later':'28% of the total accrues 15 or more years later (2019 estimate)'}</text>`;
    ps.innerHTML=s;
    $('#lvPostNote').innerHTML=noteHTML({k:'Life after TB',t:lp==='cured'?'Cure is not the end of the story':'TB leaves a long shadow',
      txt:`People treated for TB had higher all-cause mortality after treatment than the general population (pooled SMR 2.91); among those cured or who completed treatment it was 3.76, and cardiovascular disease was the most common cause of death (20%). <sup class="c" data-ref="Romanowski2019" title="Source 402">402</sup> A history of TB went with COPD in adults over 40 (OR 3.05), most strongly in never-smokers. <sup class="c" data-ref="Byrne2015" title="Source 57">57</sup> Post-TB lung disease includes bronchiectasis, airway obstruction, scarring and vascular and pleural disease; multiple episodes, drug-resistant TB and diagnostic delay raise its risk. <sup class="c" data-ref="Allwood2021" title="Source 9">9</sup> Of the 122 million DALYs from TB in 2019, 47% came after the episode. <sup class="c" data-ref="Menzies2021LGH" title="Source 322">322</sup> Money: a pooled 47% of TB-affected households faced catastrophic costs, 82% with drug-resistant TB; a model put it at 75.2% in the poorest fifth and 42.5% in the richest. <sup class="c" data-ref="WHO-GTR2025,Portnoy2023" title="Source 375,510">375,510</sup>`,
      pt:`Some people still have breathing problems after TB is cured. Lung check-ups, not smoking and rehabilitation help. Ask your clinic about money and food support early, not only when things are hard.`,
      hook:`TB survivors: about 3 times the mortality of the general population (SMR 2.91). Catastrophic costs: 47% of households overall, 82% with DR-TB.`});
  }
  $$('[data-lp]').forEach(b=>b.addEventListener('click',()=>{lp=b.dataset.lp;$$('[data-lp]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP()}));
  $$('[data-lc]').forEach(b=>b.addEventListener('click',()=>{lc=b.dataset.lc;$$('[data-lc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP()}));
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawP()};
  drawP();
};
/* =============== 5.2 Nursing care =============== */
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');let st='clinic',setSt=()=>{};
  const SET={clinic:'Outpatient clinic',ward:'Hospital ward',community:'Community and home'};
  const LANES=[{n:'Assess',c:'var(--accent)'},{n:'Isolate',c:'var(--air)'},{n:'Sample',c:'var(--gold)'},{n:'Medicines',c:'var(--rx)'},{n:'Monitor',c:'var(--tb)'},{n:'Teach',c:'var(--brand)'},{n:'Hand over',c:'var(--vax)'}];
  const COLS=['Day 0','Days 1–3','Week 2','Month 1','Month 2','Months 3–6'];
  /* tasks: [short label, full wording with its source]; null = nothing in that lane at that point */
  const CLINIC=[
   [['symptoms, weight, mood',`Ask about cough, fever, night sweats and weight loss, and weigh. Screen for low mood: pooled depression prevalence in people with TB was 45%, and its symptoms overlap with TB's. <sup class="c" data-ref="Duko2020,Sweetland2017" title="Source 143,453">143,453</sup>`],
    ['baseline bloods',`Rifampin label, adults: liver enzymes, bilirubin, creatinine, blood count and platelets. Isoniazid label: AST and ALT before starting from age 35. <sup class="c" data-ref="FDA-Rifampin,FDA-Isoniazid" title="Source 160,168">160,168</sup>`],
    ['is it working?',`Look for a clinical response: less cough, no fever. CDC links reduced infectiousness to standard therapy with documented clinical improvement, usually with smear conversion over several weeks. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`],
    ['monthly review',`Monitor and interview at least monthly, with specific questions about adverse reactions, as the isoniazid and rifampin labels state. <sup class="c" data-ref="FDA-Isoniazid,FDA-Rifampin" title="Source 160,168">160,168</sup>`],
    ['weight, nutrition',`WHO (2025) recommends nutritional assessment and counselling for everyone with TB. In RATIONS, gaining 5% of body weight by 2 months went with a lower hazard of death (aHR 0.39). <sup class="c" data-ref="WHO-Mod6-2025,Bhargava2023LGH" title="Source 40,517">40,517</sup>`],
    ['lung check at end',`Clinical standards: assess everyone for post-TB lung disease at the end of treatment and identify who needs pulmonary rehabilitation. <sup class="c" data-ref="Migliori2021PTLD" title="Source 324">324</sup>`]],
   [['mask, fast-track',`Triage fast-tracks people with presumed TB and keeps their time in the facility short. They wear a surgical or procedure mask if possible, away from others. <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>`],
    ['home, fresh air',`In 70 naturally ventilated rooms, opening windows and doors gave a median 28 air changes an hour, more than double the 12 of a negative-pressure room. Cough etiquette: cover with a mask, tissue or elbow, then hand hygiene. <sup class="c" data-ref="Escombe2007,WHO-IPC2019" title="Source 150,511">150,511</sup>`],
    ['still infectious?',`Effective treatment cuts transmission fast, yet only 9% have a negative smear at 2 weeks: ending precautions follows the tests and the clinical response, not a fixed date. <sup class="c" data-ref="Dharmadhikari2014,Calderwood2021,Jensen2005" title="Source 59,120,249">59,120,249</sup>`],null,null,null],
   [['coach the cough',`Explain how to cough up sputum, not saliva: simple instructions raised smear positivity in women 1.63-fold in a Pakistani trial. Collect away from others in a well-ventilated space; CDC places sputum induction in a ventilated booth or AII room. <sup class="c" data-ref="Khan2007Lancet,Jensen2005" title="Source 249,271">249,271</sup>`],
    ['3 specimens',`Three specimens 8 to 24 hours apart, at least one early in the morning, because secretions pool overnight. For suspected TB this usually allows a decision in about 2 days. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`],null,null,
    ['2-month sputum',`Pooled data: 82% smear-negative and 88% solid-culture-negative at 2 months. A positive 2-month culture predicts relapse poorly (sensitivity 40%). <sup class="c" data-ref="Calderwood2021,Horne2010" title="Source 59,236">59,236</sup>`],null],
   [['start promptly',`Prompt effective treatment is one of WHO's two strong infection-control recommendations. For new pulmonary TB, WHO recommends 2HRZE/4HR, daily throughout (strong, high certainty). <sup class="c" data-ref="WHO-IPC2019,WHO-Mod4-2025" title="Source 511,515">511,515</sup>`],
    ['DOT or VOT',`WHO suggests community- or home-based treatment support over facility-based or unsupported treatment, and says video-supported treatment can replace in-person support where it can be run well. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`],
    ['observe, record',`Record each dose. In Moldova, video-observed therapy cut unobserved days from 5.24 to 1.29 per 2 weeks. <sup class="c" data-ref="Ravenscroft2020" title="Source 388">388</sup>`],
    ['act on missed doses',`Follow up missed doses: the response may matter more than the device. Smart pillboxes and labels alone did not improve outcomes in the ASCENT trials. <sup class="c" data-ref="Mohamed2025,Jerene2025" title="Source 251,330">251,330</sup>`],
    ['to 2 drugs (4HR)',`The intensive phase ends at 2 months. WHO recommends against extending it just because the smear is still positive (strong, high certainty). <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`],
    ['complete the course',`Treatment success for drug-susceptible TB was 88% worldwide in the 2023 cohort. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`]],
   [['baseline vision',`Ethambutol label: visual acuity of each eye and both together (Snellen chart) and colour discrimination before starting. <sup class="c" data-ref="FDA-Ethambutol" title="Source 159">159</sup>`],
    ['who needs liver tests',`ATS lists people needing ALT monitoring: regular alcohol, liver disease or viral hepatitis, other liver-toxic drugs, previous isoniazid hepatitis, pregnancy or 3 months postpartum, and HIV; some experts add everyone over 35. <sup class="c" data-ref="Saukkonen2006" title="Source 412">412</sup>`],null,
    ['vision, liver',`Vision monthly at ethambutol doses above 15 mg/kg/day. Isoniazid hepatitis usually occurs in the first 3 months. ATS: interrupt treatment if ALT is above 3 times normal with symptoms or jaundice, or above 5 times without. <sup class="c" data-ref="FDA-Ethambutol,FDA-Isoniazid,Saukkonen2006" title="Source 159,160,412">159,160,412</sup>`],
    ['culture result',`Review the 2-month result. In Study 31, liquid culture conversion by 8 weeks was 63.4% on the 6-month control regimen. <sup class="c" data-ref="Dorman2021" title="Source 141">141</sup>`],
    ['monthly to the end',`Keep the monthly review with questions about side effects to the end of treatment. <sup class="c" data-ref="FDA-Rifampin" title="Source 168">168</sup>`]],
   [['TB is curable',`Health education and counselling for everyone on treatment (WHO, strong, moderate certainty). TB is caused by a germ in the air: nobody's fault, and curable. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`],
    ['orange fluids, coughs',`Rifampicin colours urine, sweat, sputum and tears and can stain soft lenses: say so before the first dose. Cover coughs, then wash hands. <sup class="c" data-ref="FDA-Rifampin,WHO-IPC2019" title="Source 168,511">168,511</sup>`],
    ['how to take it',`Rifampin label: 1 hour before or 2 hours after a meal, with a full glass of water; no new medicines or herbs without advice. <sup class="c" data-ref="FDA-Rifampin" title="Source 168">168</sup>`],
    ['alcohol, pill, eyes',`Avoid alcohol and liver-toxic drugs; hormonal contraception may be less reliable; report any change in vision at once. <sup class="c" data-ref="FDA-Rifampin,FDA-Ethambutol" title="Source 159,168">159,168</sup>`],
    ['keep going',`Feeling well is not cure: the rifampin label asks staff to stress the full course and not missing doses. <sup class="c" data-ref="FDA-Rifampin" title="Source 168">168</sup>`],
    ['after TB',`New symptoms after cure deserve a new check: recurrence was 2.26 per 100 person-years in pooled studies. Not smoking helps damaged lungs. <sup class="c" data-ref="Vega2021,Allwood2021" title="Source 9,491">9,491</sup>`]],
   [['notify public health',`Report suspected or confirmed TB to the local public-health authority immediately, so treatment can be tracked to completion, DOT arranged and contacts evaluated. TB is a notifiable disease. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`],
    ['list contacts',`The infectious period is set to start 3 months before diagnosis. Each contact's first face-to-face assessment should happen within 3 working days of being listed. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`],
    ['contacts tested',`High-priority contacts (under 5, HIV, immunosuppressants) tested within 7 working days, medium-priority within 14; an induration of 5 mm or more is positive for any contact. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`],
    ['case management',`Treatment is tracked to completion through case management with the public-health team. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`],null,
    ['record the outcome',`Record the outcome and check contacts' follow-up: three-quarters of TB among close contacts appeared within 3 months of the index diagnosis. <sup class="c" data-ref="Reichler2018" title="Source 393">393</sup>`]]];
  const cp=a=>a.map(r=>r.slice());
  const TASKS={clinic:CLINIC,ward:cp(CLINIC),community:cp(CLINIC)};
  const W=TASKS.ward,Cm=TASKS.community;
  W[0][0]=['triage, admit',`Triage on arrival, history and examination. Immunocompromised people with infectious TB, including people with HIV, should be physically separated from others, for their own sake and others'. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`];
  W[1]=[['AIIR, sign on door',`Airborne infection isolation room: negative pressure of at least 0.01 inch water gauge (air flows from the corridor in), at least 12 air changes an hour (6 for rooms built before 2001), exhaust preferably outside, signage at the door. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`],
    ['fit-tested N95',`Staff wear at least an N95 respirator within a respiratory protection programme: initial and periodic fit testing and annual training. Fit testing confirms the model and size and that it can be put on correctly. <sup class="c" data-ref="Jensen2005,WHO-IPC2019" title="Source 249,511">249,511</sup>`],
    ['3 negative + 2 weeks + better',`In hospital, CDC keeps airborne precautions until all three: three consecutive negative smears (8–24 h apart, one early morning), at least 2 weeks of standard treatment, and clinical improvement. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`],
    ['home before conversion?',`Discharge before smear conversion is possible with a TB-programme follow-up plan, DOT arranged, no children under 4 or immunocompromised people at home, all household members already exposed, and a willingness to stay home except for health-care visits. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`],null,null];
  W[2][1]=['3 specimens or induction',`Three specimens 8 to 24 hours apart, one early morning. If none comes: ultrasonic nebuliser, at least 30 mL of 3% saline, up to 15 minutes, in a ventilated booth or AII room with the nurse in at least an N95. Consider a bronchodilator first in asthma or COPD and keep one at hand. Label the clear, watery result as expectorated sputum. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`];
  W[2][2]=['smears for release',`Induction succeeded in 76.4% to 100% of attempts across 23 studies, with infrequent, mild adverse events. Nebulised salbutamol gave a similar yield with less bronchospasm in one trial (0% vs 11.3%). <sup class="c" data-ref="Hepple2012,Keeratichananont2015" title="Source 225,267">225,267</sup>`];
  W[3][1]=['first doses observed',`First doses given and observed on the ward; prompt effective treatment cuts transmission. On an HIV-TB ward, 90% of transmission came from people with MDR-TB not yet on effective treatment. <sup class="c" data-ref="Escombe2008" title="Source 152">152</sup>`];
  W[3][3]=['discharge with DOT',`CDC discharge planning: a specific follow-up plan with the local TB programme, treatment started and DOT arranged before discharge. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`];
  W[6][3]=['discharge handover',`Hand over to the TB programme: follow-up appointment, DOT plan, household details and contact list. <sup class="c" data-ref="Jensen2005,NTCA2005" title="Source 249,355">249,355</sup>`];
  Cm[0][0]=['home visit',`Assessment at home: symptoms, weight and food security. WHO recommends nutritional assessment and counselling for all people with TB and their household contacts. <sup class="c" data-ref="WHO-Mod6-2025" title="Source 517">517</sup>`];
  Cm[1]=[['windows open, mask',`Open windows and doors: a median 28 air changes an hour in naturally ventilated rooms. Surgical masks worn by people with MDR-TB cut guinea-pig infection from 76.6% to 40%. <sup class="c" data-ref="Escombe2007,Dharmadhikari2012" title="Source 119,150">119,150</sup>`],
    ['stay home for now',`CDC lists, for someone at home before smear conversion: no children under 4 or immunocompromised people in the home, all household members already exposed, and no travel outside except for health care. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`],
    ['still infectious?',CLINIC[1][2][1]],null,null,null];
  Cm[3][1]=['home DOT or VOT',`WHO suggests support by trained lay providers or health workers over family members or no support, and community- or home-based support over facility-based. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`];
  Cm[3][3]=['nurse-led outreach',`A nurse-led community health worker programme reached 91.8% completion of weekly observed 3HP among adults experiencing homelessness, against a 65% clinic benchmark (single arm). <sup class="c" data-ref="Nyamathi2021" title="Source 357">357</sup>`];
  Cm[6][2]=['household screened',`Contact investigation in randomised trials increased TB notification (RR 2.5) and cut mortality (RR 0.6). About half of household contacts in high-burden settings have TB infection and about 3% TB disease. <sup class="c" data-ref="Velen2021,Fox2013" title="Source 185,492">185,492</sup>`];
  const STEPS=[
    {k:'Day 0 · first contact',t:'Triage and assess',
     txt:{clinic:`A person coughing for weeks arrives. Administrative controls come first in both the WHO and CDC hierarchy of TB infection control: find people with presumed TB fast, mask them, separate them and move them on. <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>`,
       ward:`On admission, airborne precautions start as soon as TB is suspected. CDC says the remaining risk in health care comes mainly from people with unsuspected, undiagnosed TB. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`,
       community:`At home, the nurse or community health worker assesses the person and the household together: who lives there, who is young, who is unwell. <sup class="c" data-ref="NTCA2005,WHO-Mod6-2025" title="Source 355,517">355,517</sup>`},
     pt:`A mask and a short wait somewhere separate protect everyone in the room, including staff. They are not a judgement.`,
     hook:`Hierarchy of TB infection control: administrative, then environmental, then respiratory protection. Administrative controls matter most. <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>`},
    {k:'Days 1–3',t:'Isolate and collect sputum',
     txt:{clinic:`WHO suggests community- or home-based treatment support over facility-based care. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup> Three sputum specimens are collected 8 to 24 hours apart, one early in the morning. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup> Instructions improve yield; early-morning collection alone did not, across 23 studies. <sup class="c" data-ref="Datta2017LGH" title="Source 109">109</sup>`,
       ward:`An airborne infection isolation room is under negative pressure (at least 0.01 inch water gauge) with at least 12 air changes an hour; staff wear fit-tested N95 respirators. Sputum induction happens in a ventilated booth or the AII room, with bronchodilators at hand. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`,
       community:`At home, fresh air is the simplest control: opening windows and doors gave a median 28 air changes an hour. The person wears a mask around others while infectious. <sup class="c" data-ref="Escombe2007,Dharmadhikari2012" title="Source 119,150">119,150</sup>`},
     pt:`Coughing up sputum from deep in the chest, not saliva, gives the test its best chance. The nurse can show you how.`,
     hook:`AII room: negative pressure ≥0.01 inch w.g. and ≥12 ACH (6 ACH for pre-2001 rooms). Three sputum specimens 8–24 h apart, one early morning. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`},
    {k:'Week 2',t:'Is it working?',
     txt:{clinic:`Cough and fever should be easing. Most people are still culture-positive at 2 weeks (only 5% solid-culture-negative), which is why release from precautions follows the tests and clinical response. <sup class="c" data-ref="Calderwood2021,Jensen2005" title="Source 59,249">59,249</sup>`,
       ward:`Inpatients stay under airborne precautions until three consecutive negative smears, at least 2 weeks of standard treatment and clinical improvement. Guinea-pig studies suggest effective treatment makes people non-infectious quickly, long before culture conversion. <sup class="c" data-ref="Jensen2005,Dharmadhikari2014" title="Source 120,249">120,249</sup>`,
       community:`Daily observed doses continue at home or by video. In New York, electronic DOT was non-inferior to in-person DOT (89.8% vs 87.2% of doses completed). <sup class="c" data-ref="Burzynski2022" title="Source 53">53</sup>`},
     pt:`You will often feel better within a few weeks. That is the medicine working, and the reason to keep going.`,
     hook:`Pooled: smear-negative 9% and solid-culture-negative 5% at 2 weeks. <sup class="c" data-ref="Calderwood2021" title="Source 59">59</sup>`},
    {k:'Month 1',t:'Monitor and support',
     txt:{clinic:`A monthly visit with specific questions about side effects; vision checks on ethambutol; liver tests for people at risk. <sup class="c" data-ref="FDA-Rifampin,FDA-Ethambutol,Saukkonen2006" title="Source 159,168,412">159,168,412</sup> This is also when life catches up: work, money, mood. Material and psychological support are part of WHO's adherence package. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`,
       ward:`Discharge planning: a follow-up plan with the local TB programme, treatment started and DOT arranged before the person leaves. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`,
       community:`Nurse-led interventions in a scoping review covered health education, psychological support, breathing exercises, medication guidance, nutrition and discharge teaching, with better knowledge and adherence reported. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Yulanda2026" title="Source 529">529</sup>`},
     pt:`Tell your nurse about any new symptom, a change in your eyesight, or worries about money or mood. All of these can be helped.`,
     hook:`Ethambutol: visual acuity and colour testing, monthly above 15 mg/kg/day. Isoniazid hepatitis: mostly in the first 3 months. <sup class="c" data-ref="FDA-Ethambutol,FDA-Isoniazid" title="Source 159,160">159,160</sup>`},
    {k:'Month 2',t:'End of the intensive phase',
     txt:{clinic:`A sputum sample at 2 months; pooled, 82% are smear-negative. Pyrazinamide and ethambutol stop and isoniazid and rifampicin continue for 4 months. <sup class="c" data-ref="Calderwood2021,WHO-Mod4-2025" title="Source 59,515">59,515</sup>`,
       ward:`After discharge the same 2-month sputum and drug switch apply. CDC's conditions for going home before smear conversion included no children under 4 and no immunocompromised people in the household. <sup class="c" data-ref="Jensen2005,WHO-Mod4-2025" title="Source 249,515">249,515</sup>`,
       community:`Weight is a simple marker: in RATIONS, 5% weight gain by 2 months went with a lower hazard of death, yet 54.8% were still underweight at 6 months. <sup class="c" data-ref="Bhargava2023LGH" title="Source 40">40</sup>`},
     pt:`Halfway through the hardest part: fewer tablets from now on, but the course still has months to run.`,
     hook:`2HRZE/4HR: do not extend the intensive phase just because the 2-month smear is positive (WHO, strong). <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`},
    {k:'Months 3–6',t:'Complete and hand over',
     txt:{clinic:`The public-health team tracks treatment to completion and evaluates contacts. Contact investigation is second only to treating people with TB disease in the US elimination strategy. <sup class="c" data-ref="Jensen2005,NTCA2005" title="Source 249,355">249,355</sup> At the end, assess for post-TB lung disease. <sup class="c" data-ref="Migliori2021PTLD" title="Source 324">324</sup>`,
       ward:`After discharge, care continues in the community with the TB programme. A health worker with infectious TB returns to work only after three negative samples, a probably effective treatment and a physician's judgement. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`,
       community:`Completion is recorded and the household is followed up: among close contacts in the US and Canada, 51% of contact cases were diagnosed by 1 month and 92% by 12 months. <sup class="c" data-ref="Reichler2018" title="Source 393">393</sup>`},
     pt:`Finishing the course is the cure. Afterwards, a lung check is worth asking for if breathing is still hard.`,
     hook:`Contacts: infectious period from 3 months before diagnosis; first assessment ≤3 working days; high priority tested ≤7 working days. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`}];
  STEPS.forEach((s,i)=>{s.from=i/6;s.at=i/6+.07});
  const wrap=(txt,n)=>{const w=txt.split(' '),L=[''];w.forEach(x=>{const c=L[L.length-1];if(c&&(c+' '+x).length>n)L.push(x);else L[L.length-1]=c?c+' '+x:x});return L};
  /* ---------- scenes, drawn in a 360×150 box ---------- */
  const arr=(x1,y1,x2,y2,c='var(--muted)')=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:${c};stroke-width:1.6" marker-end="url(#nuAr)"/>`;
  const house=(x,y,w,h,win)=>`<path d="M${x} ${y+h*.35}L${x+w/2} ${y}L${x+w} ${y+h*.35}V${y+h}H${x}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`+(win?`<rect x="${x+w*.62}" y="${y+h*.48}" width="${w*.22}" height="${h*.24}" style="fill:var(--field);stroke:var(--muted)"/><path d="M${x+w*.84} ${y+h*.48}l${w*.1} ${-h*.08}v${h*.24}l${-w*.1} ${h*.08}" style="fill:var(--panel);stroke:var(--muted)"/>`:'');
  function scene(i,p){let s='';const fl=`<line x1="0" x2="360" y1="138" y2="138" style="stroke:var(--line);stroke-width:1.2"/>`;
    if(i===0){s+=fl;
      if(st==='community'){s+=house(14,52,120,86,true)+person(56,84,48,'var(--brand)',{mask:true,cough:true})+person(178,82,50,'var(--accent)',{n95:true,face:-1})+`<text x="74" y="46" class="t-xs t-mid">home visit</text>`;
        s+=`<text x="232" y="70" class="t-xs">assess the person</text><text x="232" y="83" class="t-xs">and the household:</text><text x="232" y="96" class="t-xs">children under 5,</text><text x="232" y="109" class="t-xs">HIV, food</text>`}
      else{[30,80,130].forEach(x=>s+=`<rect x="${x-16}" y="112" width="32" height="5" rx="2" style="fill:var(--line)"/><rect x="${x-14}" y="117" width="3" height="21" style="fill:var(--line)"/><rect x="${x+11}" y="117" width="3" height="21" style="fill:var(--line)"/>`);
        const px=lerp(80,250,ease(ramp(p,.35,1)));
        s+=person(30,80,40,'var(--fibro)',{op:.6})+person(130,80,40,'var(--fibro)',{op:.6})+person(px,78,44,'var(--brand)',{mask:p>.15,cough:true});
        if(p<=.15)s+=`<text x="80" y="62" class="t-xs t-mid">coughing for weeks</text>`;else s+=`<text x="${f1(px)}" y="64" class="t-xs t-mid" style="fill:var(--brand)">surgical mask</text>`;
        s+=`<rect x="276" y="44" width="70" height="94" rx="3" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="311" y="38" class="t-xs t-mid">${st==='ward'?'isolation':'separate room'}</text>`;
        s+=person(200,80,44,'var(--accent)',{n95:true,face:-1})+`<text x="200" y="150" class="t-xs t-mid" style="fill:var(--accent)">nurse: N95</text>`;
        s+=`<text x="160" y="20" class="t-sm t-mid" style="fill:var(--ink)">${st==='ward'?'admit straight to airborne precautions':'fast-track: mask, separate, move on'}</text>`}}
    if(i===1){s+=fl;
      if(st==='ward'){s+=`<rect x="10" y="30" width="170" height="108" style="fill:var(--air);fill-opacity:.08;stroke:var(--ink);stroke-width:1.6"/><rect x="10" y="98" width="4" height="40" style="fill:var(--panel)"/>`;
        s+=`<rect x="16" y="62" width="58" height="14" rx="2" style="fill:var(--bad)"/><text x="45" y="72" class="t-xs t-mid" style="fill:#fff;font-weight:700">AIRBORNE</text>`;
        const ph=p*3%1;[0,1,2].forEach(k=>{const x=-14+((ph+k/3)%1)*44;s+=`<circle cx="${f1(x)}" cy="128" r="2.2" style="fill:var(--air);opacity:${f1(bump((ph+k/3)%1,0,1))}"/>`});
        s+=arr(-18,118,26,118,'var(--air)')+arr(160,40,160,8,'var(--air)')+`<text x="140" y="12" class="t-xs t-end" style="fill:var(--air)">exhaust outside</text>`;
        s+=`<rect x="100" y="104" width="64" height="16" rx="3" style="fill:var(--panel-2);stroke:var(--muted)"/>`+person(132,72,36,'var(--brand)',{face:-1})+person(36,92,40,'var(--accent)',{n95:true});
        s+=`<text x="96" y="48" class="t-xs t-mid">−0.01 in. w.g. · ≥12 ACH</text>`}
      else{s+=house(10,40,170,98,false)+`<rect x="120" y="78" width="40" height="32" style="fill:var(--field);stroke:var(--muted)"/>`;
        const ph=p*3%1;[0,1,2].forEach(k=>{const u=(ph+k/3)%1;s+=`<path d="M${f1(196-u*60)} ${88+k*8}h-12" style="stroke:var(--air);stroke-width:1.6;opacity:${f1(bump(u,0,1))}" marker-end="url(#nuAr)"/>`});
        s+=person(70,90,44,'var(--brand)',{mask:true})+`<text x="95" y="30" class="t-xs t-mid">${st==='community'?'home: windows open':'home: fresh air'}</text><text x="95" y="150" class="t-xs t-mid" style="fill:var(--air)">median 28 ACH, windows open</text>`}
      /* three sputum cups, 8–24 h apart */
      [0,1,2].forEach(k=>{const x=230+k*52,f=clamp(p*3.2-k);s+=sputum(x,104,1,{fill:f*.7,label:String(k+1)});
        if(k)s+=`<path d="M${x-44} 70Q${x-26} 58 ${x-8} 70" style="fill:none;stroke:var(--muted);stroke-width:1" marker-end="url(#nuAr)"/><text x="${x-26}" y="56" class="t-xs t-mid">8–24 h</text>`});
      s+=`<circle cx="226" cy="24" r="5" style="fill:var(--gold)"/><text x="236" y="27" class="t-xs">one early in the morning</text><text x="282" y="150" class="t-xs t-mid" style="fill:var(--gold)">${st==='ward'?'deep cough or induction':'coach the deep cough'}</text>`}
    if(i===2){s+=fl+person(40,78,52,'var(--brand)',{face:1});
      s+=`<rect x="70" y="80" width="26" height="42" rx="4" style="fill:var(--ink)"/><rect x="73" y="85" width="20" height="30" style="fill:var(--panel)"/>`+person(83,90,18,'var(--accent)',{});
      s+=`<text x="60" y="30" class="t-xs t-mid">${st==='ward'?'dose observed on the ward':'video or in-person DOT'}</text>`;
      s+=blister(130,82,7,2,Math.round(14*clamp(p*1.15)),{s:16,col:'var(--dR)'})+`<text x="132" y="74" class="t-xs">14 days of doses</text>`;
      const v=Math.round(9*clamp(p*1.2));s+=`<text x="300" y="56" class="t-big t-mid" style="fill:var(--accent)">${v}%</text><text x="300" y="72" class="t-xs t-mid">smear-negative</text><text x="300" y="84" class="t-xs t-mid">at 2 weeks</text><text x="300" y="96" class="t-xs t-mid">(pooled)</text>`}
    if(i===3){const tiles=[['liver tests','tube'],['vision','eye'],['weight','scale'],['side effects?','talk']];
      tiles.forEach(([n,g],k)=>{const x=12+k*88,on=p*4.4>k;s+=`<rect x="${x}" y="30" width="76" height="92" rx="8" style="fill:${on?'var(--tb-soft)':'var(--panel-2)'};stroke:${on?'var(--tb)':'var(--line)'};stroke-width:1.3"/><text x="${x+38}" y="114" class="t-xs t-mid" style="fill:var(--ink)">${n}</text>`;
        const cx=x+38,cy=68;
        if(g==='tube')s+=`<rect x="${cx-6}" y="${cy-24}" width="12" height="44" rx="6" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${cx-6}" y="${cy-2}" width="12" height="22" rx="5" style="fill:var(--blood);opacity:.8"/>`;
        if(g==='eye')s+=`<text x="${cx}" y="${cy-8}" class="t-big t-mid">E</text><text x="${cx}" y="${cy+8}" class="t-sm t-mid" style="fill:var(--ink)">F P</text><text x="${cx}" y="${cy+20}" class="t-xs t-mid" style="fill:var(--ink)">T O Z</text>`;
        if(g==='scale')s+=`<rect x="${cx-22}" y="${cy+4}" width="44" height="14" rx="4" style="fill:var(--panel);stroke:var(--muted)"/><path d="M${cx-14} ${cy+4}A14 14 0 0 1 ${cx+14} ${cy+4}" style="fill:none;stroke:var(--muted)"/><line x1="${cx}" y1="${cy+4}" x2="${cx+8}" y2="${cy-6}" style="stroke:var(--tb);stroke-width:1.6"/>`;
        if(g==='talk')s+=`<path d="M${cx-24} ${cy-22}h48a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-30l-10 10v-10h-8a6 6 0 0 1-6-6v-20a6 6 0 0 1 6-6z" style="fill:var(--panel);stroke:var(--muted)"/><text x="${cx}" y="${cy-9}" class="t-xs t-mid" style="fill:var(--ink)">eyes?</text><text x="${cx}" y="${cy+2}" class="t-xs t-mid" style="fill:var(--ink)">skin?</text>`});
      s+=`<text x="180" y="18" class="t-sm t-mid" style="fill:var(--ink)">monthly review, as the labels state</text><text x="180" y="146" class="t-xs t-mid">${st==='ward'?'and a discharge plan with the TB programme':'plus mood, money and food'}</text>`}
    if(i===4){const dr=[['var(--dH)','H'],['var(--dR)','R'],['var(--dZ)','Z'],['var(--dE)','E']],k=ease(ramp(p,.2,.8));
      dr.forEach(([c,l],j)=>{const gone=j>1;s+=pill(30+j*36,70,28,c,{label:l,op:gone?1-k:1,ang:0})});
      s+=`<text x="84" y="40" class="t-xs t-mid">${k<.5?'2HRZE: four drugs':'4HR: two drugs'}</text>`+arr(30,100,150,100);
      s+=`<text x="90" y="118" class="t-xs t-mid">intensive → continuation</text>`;
      s+=sputum(214,84,1,{fill:.4,label:'2 mo'});
      const a=82*clamp(p*1.2),b=88*clamp(p*1.2);
      s+=`<text x="252" y="56" class="t-xs">smear −</text><rect x="252" y="60" width="${f1(a)}" height="9" rx="3" style="fill:var(--accent)"/><text x="${f1(256+a)}" y="68" class="t-xs">${Math.round(a)}%</text>`;
      s+=`<text x="252" y="88" class="t-xs">culture −</text><rect x="252" y="92" width="${f1(b*.9)}" height="9" rx="3" style="fill:var(--rx)"/><text x="${f1(256+b*.9)}" y="100" class="t-xs">${Math.round(b)}%</text><text x="252" y="120" class="t-xs">pooled, at 2 months</text>`}
    if(i===5){s+=fl;
      s+=`<rect x="10" y="66" width="70" height="72" style="fill:var(--panel-2);stroke:var(--muted)"/><path d="M45 78v20M35 88h20" style="stroke:var(--bad);stroke-width:4"/><text x="45" y="58" class="t-xs t-mid">${st==='ward'?'ward':st==='community'?'TB nurse':'clinic'}</text>`;
      s+=`<rect x="130" y="56" width="80" height="82" style="fill:var(--panel-2);stroke:var(--muted)"/><path d="M140 56V30l20 6-20 6" style="fill:var(--vax);stroke:var(--vax)"/><text x="170" y="104" class="t-xs t-mid">public</text><text x="170" y="116" class="t-xs t-mid">health</text>`;
      const a=ramp(p,0,.3),b=ramp(p,.3,.6);
      if(a>0)s+=arr(84,96,84+42*a,96,'var(--vax)');if(a>.9)s+=`<text x="105" y="88" class="t-xs t-mid" style="fill:var(--vax)">notify</text>`;
      if(b>0)s+=arr(214,96,214+30*b,96,'var(--vax)');
      [0,1,2].forEach(k=>{const x=266+k*32,on=p>.6+k*.1;s+=person(x,86,40,on?'var(--good)':'var(--fibro)',{op:on?1:.5});if(on)s+=`<path d="M${x-6} 76l4 4l8-8" style="fill:none;stroke:var(--good);stroke-width:2"/>`});
      s+=`<text x="298" y="150" class="t-xs t-mid" style="fill:var(--vax)">contacts seen ≤3 working days</text>`}
    return s}
  const FACTS=[
    {clinic:['Mask the person, separate them, fast-track','Administrative controls first (WHO, CDC)','Weigh; ask about mood, alcohol, smoking','Notify public health the same day'],
     ward:['Suspect TB → airborne precautions at once','Separate people with HIV or immunosuppression','Baseline bloods and vision before drugs','Notify public health immediately'],
     community:['Assess the person and the household','Who is under 5, has HIV, is unwell?','Nutrition for person and contacts (WHO 2025)','Link to the TB programme and notify']},
    {clinic:['3 sputum specimens, 8–24 h apart','At least one early in the morning','Instructions raise yield (women: ×1.63)','Home, fresh air, mask with others'],
     ward:['AIIR: ≥0.01 inch w.g., ≥12 ACH','Fit-tested N95 (or higher) for staff','Induction: 3% saline, booth or AIIR','Bronchodilator ready for bronchospasm'],
     community:['Windows open: median 28 ACH','Patient mask cut transmission 56%','No travel except health-care visits','3 sputum specimens, one early morning']},
    {clinic:['Smear-negative: 9% at 2 weeks (pooled)','Most still culture-positive at 2 weeks','Infectiousness falls fast on effective drugs','Release follows tests, not the calendar'],
     ward:['Release: 3 negative smears','+ at least 2 weeks of standard drugs','+ clinical improvement (CDC)','Then plan discharge with the programme'],
     community:['Daily observed doses, home or video','eDOT non-inferior: 89.8% vs 87.2%','Video DOT: unobserved days 5.24 → 1.29','Respond to every missed dose']},
    {clinic:['Monthly review with side-effect questions','Vision monthly if ethambutol >15 mg/kg','ALT if at risk; INH hepatitis early','Ask about money, food and mood'],
     ward:['Discharge: TB-programme follow-up plan','Treatment started, DOT arranged','Home: no child <4, no immunocompromised','All household members already exposed'],
     community:['Nurse-led care: education, nutrition','Psychological support, breathing exercises','Medication guidance, discharge teaching','Better knowledge and adherence (early)']},
    {clinic:['2-month sputum: 82% smear-negative','Solid culture: 88% negative (pooled)','2HRZE → 4HR: Z and E stop','Do not extend the intensive phase'],
     ward:['Care continues with the TB programme','Home rules: no child <4, no immunocompromised','Same 2-month sputum and drug switch','Keep the monthly review'],
     community:['Weight: +5% by 2 months, lower risk','54.8% still underweight at 6 months','Food support, if food-insecure','Same 2-month sputum and drug switch']},
    {clinic:['Treatment tracked to completion','Contacts: first seen ≤3 working days','High priority tested ≤7 working days','End: assess for post-TB lung disease'],
     ward:['Care continues with the TB programme','Health worker return: 3 negative samples','+ effective treatment + physician review','Outcome recorded by the programme'],
     community:['Completion recorded','Contact cases: 51% by 1 month','75% by 3 months, 92% by 12 months','Lung check if breathing is still hard']}];
  function draw(t){
    const N=vb(svg,'720 500','400 618'),c=t*6,idx=Math.min(5,Math.floor(c)),p=clamp(c-idx);let s=`<defs>${marker('nuAr','var(--muted)')}</defs>`;
    /* scene and facts */
    const SX=N?20:10,SY=N?14:24;
    s+=`<g transform="translate(${SX} ${SY})">${scene(idx,p)}</g>`;
    const F=FACTS[idx][st],fx=N?20:400,fy=N?186:44;
    s+=`<text x="${fx}" y="${fy-(N?2:0)}" class="t-sm" style="fill:var(--brand)">${COLS[idx].toUpperCase()} · ${SET[st].toUpperCase()}</text>`;
    F.forEach((l,j)=>{const on=p*5>j||idx<5&&t>=1;s+=`<circle cx="${fx+4}" cy="${fy+18+j*(N?15:24)-4}" r="3" style="fill:${on?'var(--brand)':'var(--line)'}"/><text x="${fx+14}" y="${fy+18+j*(N?15:24)}" class="t-lbl" style="font-size:${N?12:13}px;opacity:${on?1:.45}">${l}</text>`});
    /* lanes */
    const lx=N?8:12,cx0=N?82:122,cx1=N?394:710,hy=N?268:206,y0=hy+10,lh=N?44:37;
    let wts=COLS.map((_,i)=>N?1+4.2*clamp(1-Math.abs(c-(i+.5))):1);const tw=wts.reduce((a,b)=>a+b,0);
    const xs=[cx0];wts.forEach(w=>xs.push(xs[xs.length-1]+(cx1-cx0)*w/tw));
    COLS.forEach((n,i)=>{const w=xs[i+1]-xs[i],lab=N&&w<70?(i+1)+'':n;s+=`<text x="${f1((xs[i]+xs[i+1])/2)}" y="${hy}" class="t-xs t-mid" style="fill:${i===idx?'var(--ink)':'var(--muted)'};font-weight:${i===idx?700:500}">${lab}</text>`;
      if(i)s+=`<line x1="${f1(xs[i])}" x2="${f1(xs[i])}" y1="${hy+4}" y2="${y0+7*lh}" class="grid"/>`});
    LANES.forEach((L,r)=>{const y=y0+r*lh;
      s+=`<text x="${lx}" y="${y+lh/2+4}" class="t-sm" style="fill:${L.c};font-weight:700">${L.n}</text>`;
      s+=`<line x1="${cx0}" x2="${cx1}" y1="${y+lh/2}" y2="${y+lh/2}" style="stroke:${L.c};stroke-width:1;opacity:.25"/>`;
      TASKS[st][r].forEach((T,i)=>{if(!T)return;const x=xs[i]+3,w=xs[i+1]-xs[i]-6,h=lh-8,yy=y+4,state=i<idx?2:i===idx?1:0;
        const fill=state===2?`fill:${L.c};fill-opacity:.18`:state===1?`fill:${L.c};fill-opacity:${f1(.12+.2*p)}`:'fill:none';
        s+=`<rect x="${f1(x)}" y="${yy}" width="${f1(w)}" height="${h}" rx="6" style="${fill};stroke:${L.c};stroke-width:${state===1?1.8:1};${state?'':'stroke-dasharray:3 3;opacity:.5'}"/>`;
        const n=Math.floor((w-8)/5.7),lines=wrap(T[0],n);
        if(n>=6&&lines.length<=2&&lines.every(l=>l.length<=n))lines.forEach((l,j)=>s+=`<text x="${f1(x+5)}" y="${f1(yy+h/2+(lines.length===1?3.5:j?9:-2))}" class="t-xs" style="fill:${state?'var(--ink)':'var(--muted)'}">${l}</text>`);
        else s+=state===2?`<path d="M${f1(x+w/2-4)} ${yy+h/2}l3 3l6-6" style="fill:none;stroke:${L.c};stroke-width:1.8"/>`:`<circle cx="${f1(x+w/2)}" cy="${yy+h/2}" r="2.5" style="fill:${L.c};opacity:${state?1:.5}"/>`})});
    const ph=xs[idx]+(xs[idx+1]-xs[idx])*p;
    s+=`<line x1="${f1(ph)}" x2="${f1(ph)}" y1="${hy+4}" y2="${y0+7*lh}" style="stroke:var(--ink);stroke-width:1.4;opacity:.45"/>`;
    s+=`<text x="${cx1}" y="${y0+7*lh+16}" class="t-xs t-end" style="fill:var(--warn)">SCHEMATIC · drug-susceptible pulmonary TB</text>`;
    svg.innerHTML=s;
    const ph2=phaseOf(STEPS,t);setSt(ph2);const S=STEPS[ph2];
    $('#nuNote').innerHTML=noteHTML({k:S.k+' · '+SET[st],t:S.t,txt:S.txt[st],pt:S.pt,hook:S.hook});
    $('#nuNowK').textContent=`${COLS[idx]} · ${SET[st]}: every lane, in full`;
    $('#nuNow').innerHTML=TASKS[st].map((row,r)=>row[idx]?`<li style="border-left-color:${LANES[r].c}"><b>${LANES[r].n}</b>${row[idx][1]}</li>`:'').join('');
  }
  const stop=playWire(rg,$('#nuPlay'),draw,30000,'Replay','nursing');
  setSt=stepWire($('#nuSteps'),STEPS,rg,draw,stop);
  $$('[data-ns]').forEach(b=>b.addEventListener('click',()=>{st=b.dataset.ns;$$('[data-ns]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- care-plan builder ---------- */
  const PLAN={
   new:{tl:[['day 0','mask, start, notify',0],['days 1–2','3 sputum, 8–24 h apart',.13],['≤3 working days','contacts first seen',.27],['≥2 weeks','review precautions',.42],['month 2','sputum; 4HR starts',.66],['month 6','complete; lung check',.97]],
    cap:`Timings as published by CDC and NTCA/CDC; the 2HRZE/4HR schedule as WHO recommends it. <sup class="c" data-ref="Jensen2005,NTCA2005,WHO-Mod4-2025" title="Source 249,355,515">249,355,515</sup>`,
    A:[`Symptoms, weight and nutritional status; screen for depression, alcohol and tobacco use. <sup class="c" data-ref="WHO-Mod6-2025,Duko2020,Ragan2020" title="Source 143,384,517">143,384,517</sup>`,
      `Baseline liver enzymes, bilirubin, creatinine, blood count and platelets; AST/ALT from age 35. <sup class="c" data-ref="FDA-Rifampin,FDA-Isoniazid" title="Source 160,168">160,168</sup>`,
      `Visual acuity (each eye, Snellen) and colour discrimination before ethambutol. <sup class="c" data-ref="FDA-Ethambutol" title="Source 159">159</sup>`,
      `Signs of infectiousness: cough, cavity on X-ray, positive smear, lung or laryngeal disease, not covering coughs. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`,
      `Offer a pregnancy test and family-planning referral, free and without judgement. <sup class="c" data-ref="Maugans2023" title="Source 314">314</sup>`],
    I:[`Surgical mask and a separate area while waiting; fast-track through the clinic. <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>`,
      `Three sputum specimens 8–24 h apart, one early morning, after coaching on how to cough up sputum. <sup class="c" data-ref="Jensen2005,Khan2007Lancet" title="Source 249,271">249,271</sup>`,
      `Start effective treatment promptly; arrange home- or community-based DOT or video-supported treatment. <sup class="c" data-ref="WHO-IPC2019,WHO-Mod4-2025" title="Source 511,515">511,515</sup>`,
      `Offer the adherence package: education, material support (food, transport), psychological support. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`,
      `Report to public health and list contacts for a first assessment within 3 working days. <sup class="c" data-ref="Jensen2005,NTCA2005" title="Source 249,355">249,355</sup>`],
    T:[`TB is curable and nobody's fault; a mask and fresh air protect others while infectious. <sup class="c" data-ref="WHO-IPC2019,Escombe2007" title="Source 150,511">150,511</sup>`,
      `Orange body fluids are expected; rifampicin 1 h before or 2 h after food; full course, no missed doses. <sup class="c" data-ref="FDA-Rifampin" title="Source 168">168</sup>`,
      `Avoid alcohol; hormonal contraception may be less reliable; report any vision change at once. <sup class="c" data-ref="FDA-Rifampin,FDA-Ethambutol" title="Source 159,168">159,168</sup>`,
      `When isolation can end: by tests and clinical response, decided with the team. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`],
    D:[`Notification to the public-health authority, with the date. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`,
      `Specimen times (8–24 h apart; which was early morning) and results. <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>`,
      `Baseline labs, vision and weight; each dose observed or missed. <sup class="c" data-ref="FDA-Rifampin,FDA-Ethambutol,Ravenscroft2020" title="Source 159,168,388">159,168,388</sup>`,
      `Contact list and the infectious period (from 3 months before diagnosis). <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`,
      `Education given, in the person's own language, with an interpreter if needed. <sup class="c" data-ref="NTCA2005,WHO-Mod4-2025" title="Source 355,515">355,515</sup>`]},
   child:{tl:[['day 0','listed as a contact',0],['≤3 working days','first assessment',.2],['≤7 working days','infection test',.38],['disease excluded','window prophylaxis',.56],['8–10 weeks','repeat test',.78],['end','completion recorded',.97]],
    cap:`NTCA/CDC contact-investigation timings for a high-priority contact under 5. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup> Preventive regimens: see Treating TB infection.`,
    A:[`High-priority contact: under 5. First face-to-face assessment within 3 working days of being listed. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`,
      `TB disease must be excluded before window prophylaxis starts. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`,
      `Infection test within 7 working days; 5 mm or more is positive for any contact. A TST is suggested over an IGRA for healthy children under 5. <sup class="c" data-ref="NTCA2005,Lewinsohn2017" title="Source 284,355">284,355</sup>`,
      `Exposure: sharing a bedroom with the index person and age 5 or under raised TB risk among contacts. <sup class="c" data-ref="Reichler2020Risk" title="Source 395">395</sup>`],
    I:[`Window prophylaxis if the first test is negative and the last exposure was under 8 weeks ago, once disease is excluded. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`,
      `Repeat the test at 8 to 10 weeks to decide whether to stop or complete treatment. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`,
      `Family-centred, integrated care for the child and household (WHO, conditional). <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`,
      `Food assistance for household contacts in food-insecure settings: RATIONS cut TB in contacts by 39–48%. <sup class="c" data-ref="WHO-Mod6-2025,Bhargava2023Lancet" title="Source 39,517">39,517</sup>`],
    T:[`Why it matters: untreated under-5s with a positive test had a 19% two-year TB incidence; preventive therapy was 91% effective. <sup class="c" data-ref="Martinez2020Lancet" title="Source 311">311</sup>`,
      `Finishing counts: TB developed in 9.8% of contacts who never started treatment for TB infection, 1.8% with partial and 0.2% with complete treatment. <sup class="c" data-ref="Reichler2020Risk" title="Source 395">395</sup>`,
      `Come back early with any illness: 83% of under-5s who developed TB were diagnosed within 90 days of the first visit. <sup class="c" data-ref="Martinez2020Lancet" title="Source 311">311</sup>`],
    D:[`Dates: listed, first seen (≤3 working days), tested (≤7 working days). <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`,
      `Test type and result in mm. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`,
      `Date of last exposure and the date of the 8–10-week repeat test. <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>`,
      `Doses taken and completion. <sup class="c" data-ref="Reichler2020Risk" title="Source 395">395</sup>`]},
   bpalm:{tl:[['baseline','ECG, bloods, vision',0],['weekly','blood count',.1],['week 2','ECG',.24],['week 12','ECG',.52],['week 24','ECG',.82],['6 months','end of BPaLM',.97]],
    cap:`ECG schedule from ATS/CDC/ERS/IDSA 2025 (monthly when moxifloxacin is added); weekly blood counts from the linezolid label. <sup class="c" data-ref="Saukkonen2025,FDA-Zyvox" title="Source 171,413">171,413</sup>`,
    A:[`Eligibility as WHO publishes it: 14 years or older; pulmonary or most extrapulmonary TB; under 1 month of prior bedaquiline, linezolid, pretomanid or delamanid; not in pregnancy or breastfeeding. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`,
      `ECG before starting; potassium, calcium and magnesium when QTc is prolonged. <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`,
      `Liver tests and a complete blood count; vision and a neuropathy check. <sup class="c" data-ref="WHO-Mod4-2025,FDA-Pretomanid" title="Source 164,515">164,515</sup>`,
      `Pregnancy test and contraception, since BPaLM is not recommended in pregnancy. <sup class="c" data-ref="WHO-Mod4-2025,Maugans2023" title="Source 314,515">314,515</sup>`,
      `Mood, food and money: 82% of households affected by drug-resistant TB faced catastrophic costs. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`],
    I:[`Bedaquiline is taken with food and given by DOT, as the label states. <sup class="c" data-ref="FDA-Sirturo" title="Source 169">169</sup>`,
      `Linezolid 600 mg once daily in BPaLM (WHO), reduced to 300 mg or interrupted for toxicity. <sup class="c" data-ref="WHO-Mod4-2025,FDA-Pretomanid" title="Source 164,515">164,515</sup>`,
      `Ambulatory, decentralised care rather than hospital where possible (WHO, conditional). <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>`,
      `Nurse-led palliative care (symptom control, psychosocial support) improved patient-reported outcomes in MDR-TB in Uganda. <sup class="c" data-ref="Buyinza2025" title="Source 56">56</sup>`],
    T:[`Report tingling, numbness, blurred vision or colour change at once: these are linezolid's toxicities, and dose changes help. <sup class="c" data-ref="FDA-Zyvox,Conradie2022" title="Source 86,171">86,171</sup>`,
      `Why the ECGs: QTc prolongation is bedaquiline's boxed warning. <sup class="c" data-ref="FDA-Sirturo" title="Source 169">169</sup>`,
      `Tendon pain on moxifloxacin should be reported. <sup class="c" data-ref="FDA-Moxifloxacin" title="Source 161">161</sup>`,
      `It works: unfavourable outcomes were 11% on BPaLM against 48% on standard care in TB-PRACTECAL. <sup class="c" data-ref="Nyangwa2022" title="Source 358">358</sup>`],
    D:[`ECG and QTc at baseline and weeks 2, 12 and 24; monthly with moxifloxacin. <sup class="c" data-ref="Saukkonen2025" title="Source 413">413</sup>`,
      `Weekly blood counts. <sup class="c" data-ref="FDA-Zyvox" title="Source 171">171</sup>`,
      `Neuropathy and vision checks; any linezolid dose change and the reason. <sup class="c" data-ref="FDA-Pretomanid" title="Source 164">164</sup>`,
      `Each dose observed; household contacts listed. <sup class="c" data-ref="FDA-Sirturo,NTCA2005" title="Source 169,355">169,355</sup>`]}};
  const HEAD={A:'Assessments',I:'Interventions',T:'Teaching points',D:'Documentation'},HC={A:'var(--accent)',I:'var(--rx)',T:'var(--brand)',D:'var(--vax)'};
  const ps=$('#nuPlanSvg'),sel=$('#nuScen');
  function drawTL(){const P=PLAN[sel.value],N=NARROW(),n=P.tl.length;let s='';
    if(N){ps.setAttribute('viewBox',`0 0 300 ${30+n*40}`);s+=`<line x1="40" x2="40" y1="20" y2="${20+(n-1)*40}" style="stroke:var(--brand);stroke-width:2"/>`;
      P.tl.forEach(([a,l],i)=>{const y=20+i*40;s+=`<circle cx="40" cy="${y}" r="6" style="fill:var(--panel);stroke:var(--brand);stroke-width:2"/><text x="56" y="${y-2}" class="t-lbl">${a}</text><text x="56" y="${y+12}" class="t-xs">${l}</text>`})}
    else{ps.setAttribute('viewBox','0 0 720 150');const X=f=>lerp(80,640,f);s+=`<line x1="${X(0)}" x2="${X(1)}" y1="75" y2="75" style="stroke:var(--brand);stroke-width:2"/>`;
      P.tl.forEach(([a,l,f],i)=>{const x=X(f),up=i%2===0;s+=`<circle cx="${f1(x)}" cy="75" r="6" style="fill:var(--panel);stroke:var(--brand);stroke-width:2"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${up?69:81}" y2="${up?50:100}" style="stroke:var(--line)"/>`;
        s+=`<text x="${f1(x)}" y="${up?28:116}" class="t-lbl t-mid">${a}</text><text x="${f1(x)}" y="${up?42:130}" class="t-xs t-mid">${l}</text>`})}
    ps.innerHTML=s}
  function renderPlan(){const P=PLAN[sel.value];
    $('#nuPlan').innerHTML=['A','I','T','D'].map(k=>`<div class="card" style="border-top:3px solid ${HC[k]}"><h4>${HEAD[k]}</h4><ul>${P[k].map((x,i)=>`<li><label><input type="checkbox" data-np="${k}${i}"><span>${x}</span></label></li>`).join('')}</ul></div>`).join('');
    $('#nuPlanCap').innerHTML=P.cap;drawTL();count()}
  function count(){const b=$$('#nuPlan input'),d=b.filter(x=>x.checked).length;$('#nuPlanRead').innerHTML=`<span>items done <b>${d} of ${b.length}</b></span><span>${d===b.length?'<b>plan complete</b>: hand over and document':'tick items as you go'}</span>`}
  $('#nuPlan').addEventListener('change',count);
  sel.addEventListener('change',renderPlan);
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawTL()};
  renderPlan();
};
/* =============== 6.1 History & people =============== */
/* a stretched time axis: [year, position 0..1] knots */
const HI_SEG=[[-7000,0],[1700,.12],[1850,.27],[1940,.47],[1975,.66],[2000,.8],[2025,1]];
function hiU(y){const S=HI_SEG;if(y<=S[0][0])return 0;for(let i=1;i<S.length;i++)if(y<=S[i][0]){const a=S[i-1],b=S[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return 1}
function hiY(u){const S=HI_SEG;if(u<=0)return S[0][0];for(let i=1;i<S.length;i++)if(u<=S[i][1]){const a=S[i-1],b=S[i];return a[0]+(b[0]-a[0])*(u-a[1])/(b[1]-a[1])}return S[S.length-1][0]}
/* c: d = discoveries & tests, t = treatment, p = public health */
const HI_EV=[
 {y:-6750,d:'c. 7000 BCE',c:'d',t:'TB in Neolithic bones',s:'M. tuberculosis DNA and mycolic-acid markers in a woman and an infant buried at Atlit-Yam, a now-submerged village, 9,250–8,160 years ago.',
  txt:`<i>M. tuberculosis</i> DNA and mycolic acid markers were found in the bones of a woman and an infant buried at Atlit-Yam, a now-submerged Neolithic village in the Eastern Mediterranean, dated to 9,250–8,160 years ago. <sup class="c" data-ref="Hershkovitz2008" title="Source 227">227</sup>`},
 {y:-2400,d:'c. 2400 BCE',c:'d',t:'Pott\'s disease in Egypt',s:'Egyptian remains show the spinal deformity of TB of the spine; later mummies from Thebes carry human-type TB DNA.',
  txt:`Egyptian remains from about 2400 BC show the spinal deformity of Pott's disease. <sup class="c" data-ref="Barberis2017" title="Source 26">26</sup> In 85 mummies from Thebes (about 2050–500 BC), 25 samples carried <i>M. tuberculosis</i> complex DNA and none had an <i>M. bovis</i> pattern, which argues against the idea that human TB came from cattle TB. <sup class="c" data-ref="Zink2003" title="Source 539">539</sup>`},
 {y:-420,d:'Ancient Greece',c:'d',t:'Phthisis',s:'The Greeks called it phthisis. Hippocrates described a fatal disease, especially of young adults.',
  txt:`The ancient Greeks called TB "phthisis". Hippocrates described it as a fatal disease, especially of young adults. <sup class="c" data-ref="Barberis2017" title="Source 26">26</sup>`},
 {y:1720,d:'1720',c:'d',t:'"A new theory of Consumption"',s:'Benjamin Marten first suggests an infectious cause. TB mortality in Western Europe reaches up to 900 per 100,000 a year.',
  txt:`The English physician Benjamin Marten first suggested an infectious cause in "A new theory of Consumption". In 18th-century Western Europe, TB mortality reached as high as 900 deaths per 100,000 people a year, and in Europe and North America TB caused about one in four deaths. <sup class="c" data-ref="Barberis2017,Daniel2006" title="Source 26,103">26,103</sup>`},
 {y:1854,d:'1854',c:'t',t:'The sanatorium cure',s:'Hermann Brehmer: "Tuberculosis is a curable disease". Fresh air and good food at Görbersdorf; sanatoria spread.',
  txt:`The sanatorium cure began with Hermann Brehmer's 1854 dissertation, "Tuberculosis is a curable disease", and his institution in Görbersdorf built on fresh air and good food. <sup class="c" data-ref="Barberis2017" title="Source 26">26</sup> Sanatoria spread in the late 19th and early 20th centuries, combining rest with lung-collapse procedures to rest diseased lung and close cavities. <sup class="c" data-ref="Daniel2006" title="Source 103">103</sup>`},
 {y:1865,d:'1865',c:'d',t:'TB is transmissible',s:'Jean-Antoine Villemin shows that TB can be passed on. Laennec\'s work had already begun to map its pathology.',
  txt:`Laennec's early-19th-century work began the understanding of TB pathology. In 1865 Jean-Antoine Villemin showed that TB is transmissible. <sup class="c" data-ref="Daniel2006,Cambau2014" title="Source 60,103">60,103</sup>`},
 {y:1882,d:'24 March 1882',c:'d',t:'Koch: the tubercle bacillus',s:'Robert Koch presents the bacillus in Berlin, using a new stain and a solid culture medium. World TB Day marks the date.',
  txt:`Robert Koch presented his isolation of the tubercle bacillus to the Physiological Society in Berlin on 24 March 1882. <sup class="c" data-ref="Barberis2017" title="Source 26">26</sup> It built on Villemin's proof and on a new staining technique and a solid, serum-based culture medium; the organism was named <i>Mycobacterium tuberculosis</i> a year later. <sup class="c" data-ref="Cambau2014" title="Source 60">60</sup> World TB Day, 24 March, marks the announcement. <sup class="c" data-ref="CDC2018WTBD" title="Source 66">66</sup>`},
 {y:1890,d:'1890',c:'t',t:'Tuberculin fails as a cure',s:'Koch offers tuberculin as a cure in 1890–91. It fails in practice, but later becomes a diagnostic tool.',
  txt:`Koch's tuberculin, offered as a cure in 1890/91, failed spectacularly in practice. <sup class="c" data-ref="Gradmann2006" title="Source 204">204</sup> It later became important as a diagnostic tool. <sup class="c" data-ref="Sakula1982" title="Source 409">409</sup>`},
 {y:1905,d:'1905',c:'d',t:'Nobel Prize for Koch',s:'Koch receives the Nobel Prize in Physiology or Medicine.',
  txt:`Robert Koch received the Nobel Prize in Physiology or Medicine in 1905. <sup class="c" data-ref="Barberis2017" title="Source 26">26</sup>`},
 {y:1907,d:'1907',c:'d',t:'The tuberculin skin test',s:'Clemens von Pirquet develops the skin test, and three years later finds TB infection in children without symptoms.',
  txt:`Clemens von Pirquet developed the tuberculin skin test in 1907. Three years later he used it to show TB infection in children without symptoms. <sup class="c" data-ref="Daniel2006" title="Source 103">103</sup> Today's version is covered in <a href="#tests" data-go="tests">TST &amp; IGRA</a>.`},
 {y:1921,d:'18 July 1921',c:'p',t:'First human BCG',s:'After 230 passages over 11 years by Calmette and Guérin, BCG is given by mouth to a newborn in Paris.',
  txt:`From 1908 Albert Calmette and Camille Guérin subcultured a virulent bovine strain; after about 230 subcultures over 11 years it no longer caused progressive TB in animals. On 18 July 1921 Benjamin Weill-Hallé and Raymond Turpin gave the first human dose by mouth, to a newborn in Paris whose mother had died of TB. From 1924 to 1928, 114,000 infants were vaccinated without serious complications. <sup class="c" data-ref="Luca2013" title="Source 299">299</sup>`},
 {y:1930,d:'1930',c:'p',t:'The Lübeck disaster',s:'73 of 250 vaccinated infants die in their first year. The inquiry blames contamination in a local laboratory, not BCG.',
  txt:`In the 1930 Lübeck disaster, 73 of 250 vaccinated infants died in the first year. An inquiry blamed contamination of the vaccine with virulent bacilli in the local laboratory, not BCG itself. After World War II, UNICEF, the new WHO and Scandinavian Red Cross societies promoted BCG campaigns, which spread to low-income countries over the next decade. <sup class="c" data-ref="Luca2013" title="Source 299">299</sup>`},
 {y:1944,d:'1944',c:'t',t:'Streptomycin',s:'Albert Schatz, Elizabeth Bugie and Selman Waksman report streptomycin, from a soil actinomycete.',
  txt:`Streptomycin was reported in 1944 by Albert Schatz, Elizabeth Bugie and Selman Waksman, from a soil actinomycete. <sup class="c" data-ref="Schatz1944,Crofton2006" title="Source 96,414">96,414</sup>`},
 {y:1946,d:'1946',c:'t',t:'PAS',s:'Jörgen Lehmann reports para-aminosalicylic acid. With streptomycin it greatly reduces drug resistance.',
  txt:`Para-aminosalicylic acid (PAS) was reported by Jörgen Lehmann in The Lancet in January 1946. Combined with streptomycin, it greatly reduced drug resistance. <sup class="c" data-ref="Lehmann1946,Murray2015" title="Source 282,336">282,336</sup>`},
 {y:1948,d:'1948',c:'t',t:'The MRC streptomycin trial',s:'A landmark randomised trial: sealed envelopes, blinded X-ray readers. 4 of 55 died on streptomycin, 15 of 52 on bed rest.',
  txt:`The 1948 Medical Research Council trial was a landmark randomised controlled trial: allocation used sealed envelopes ordered by random numbers, and the X-ray readers did not know the treatment group. <sup class="c" data-ref="MRC1948,Crofton2006,Yoshioka1998" title="Source 96,332,528">96,332,528</sup> At 6 months, 4 of 55 people given streptomycin had died against 15 of 52 on bed rest alone, but 47 of 55 were still culture-positive and resistance emerged: one drug alone could not be relied on. <sup class="c" data-ref="Crofton2006" title="Source 96">96</sup> Explore it in <b>What changed the curve?</b> below.`},
 {y:1952,d:'1952',c:'t',t:'Isoniazid and triple therapy',s:'Isoniazid: cheap, well tolerated and safe. Streptomycin + PAS + isoniazid "assured cure".',
  txt:`Isoniazid, reported in 1952, opened the modern treatment era: cheap, well tolerated and safe. <sup class="c" data-ref="MRC1952,Murray2015,Daniel2006" title="Source 103,333,336">103,333,336</sup> "Triple therapy" with streptomycin, PAS and isoniazid, introduced in 1952, assured cure. <sup class="c" data-ref="Iseman2002" title="Source 245">245</sup>`},
 {y:1959,d:'1959',c:'t',t:'Madras: home is as good as a sanatorium',s:'Treatment at home works as well as sanatorium care. India then had about 2.5 million people with TB and 23,000 beds.',
  txt:`The 1959 Madras trial found domiciliary chemotherapy as effective as sanatorium care, despite the sanatorium's rest, diet, nursing and supervision. India then had about 2.5 million people with active TB and only 23,000 TB beds. <sup class="c" data-ref="TCCMadras1959" title="Source 461">461</sup> Home treatment also did not put family members at risk. <sup class="c" data-ref="Mitchison2005" title="Source 329">329</sup>`},
 {y:1962,d:'Early 1960s',c:'t',t:'Ethambutol',s:'Ethambutol is shown to be effective and replaces PAS.',
  txt:`Ethambutol was shown effective in the early 1960s and replaced PAS. <sup class="c" data-ref="Murray2015" title="Source 336">336</sup>`},
 {y:1968,d:'1968',c:'t',t:'Rifampicin',s:'From a chemical-modification programme in Milan, rifampicin enters clinical use.',
  txt:`Rifampicin came out of a Dow-Lepetit chemical-modification programme in Milan and entered clinical use in 1968. <sup class="c" data-ref="Sensi1983" title="Source 421">421</sup> In the 1970s isoniazid plus rifampicin cut treatment from 18 to 9 months. <sup class="c" data-ref="Iseman2002,Murray2015" title="Source 245,336">245,336</sup>`},
 {y:1972,d:'1972',c:'t',t:'Six-month regimens on trial',s:'The East African/British MRC trial of 6-month regimens is published. Adding pyrazinamide later makes 6-month cure standard.',
  txt:`The East African/British Medical Research Council trial of 6-month regimens was published in 1972. <sup class="c" data-ref="EastAfricaBMRC1972" title="Source 145">145</sup> In the 1980s adding pyrazinamide allowed cure in 6 months. <sup class="c" data-ref="Iseman2002,Murray2015" title="Source 245,336">245,336</sup> Supervised intermittent regimens can cure even far-advanced TB in as few as 62–78 doses over 26 weeks. <sup class="c" data-ref="Iseman2002" title="Source 245">245</sup>`},
 {y:1993,d:'1993',c:'p',t:'A global emergency',s:'WHO declares TB a global emergency, and builds a five-element control strategy branded DOTS (1989–98).',
  txt:`WHO declared TB a global emergency in 1993. <sup class="c" data-ref="John2013" title="Source 256">256</sup> Its first-phase policy (1948–63) worked in wealthier countries but largely failed in resource-poor settings; in 1989–98 WHO built a five-element strategy branded DOTS, yet by 1999 only 23% of infectious cases were managed under it. <sup class="c" data-ref="Raviglione2002" title="Source 390">390</sup> In New York City, cases fell 21% from 1992 to 1994 as directly observed therapy grew from under 100 people to nearly 1,300. <sup class="c" data-ref="Frieden1995" title="Source 190">190</sup>`},
 {y:2006,d:'2006',c:'p',t:'Stop TB Strategy',s:'WHO launches its Stop TB Strategy.',
  txt:`WHO launched its Stop TB Strategy in 2006. <sup class="c" data-ref="Raviglione2006" title="Source 391">391</sup>`},
 {y:2010,d:'2010',c:'d',t:'Xpert MTB/RIF',s:'A cartridge test finds TB and rifampicin resistance in about 2 hours. WHO endorses it the same year.',
  txt:`In 1,730 people in four countries, the Xpert MTB/RIF cartridge test detected 98.2% of smear-positive and 72.5% of smear-negative culture-positive TB in one test, with 99.2% specificity. <sup class="c" data-ref="Boehme2010" title="Source 44">44</sup> WHO endorsed it in 2010; it reports TB and rifampicin resistance within 2 hours. <sup class="c" data-ref="Lawn2011Xpert" title="Source 280">280</sup> See <a href="#diagnose" data-go="diagnose">Diagnosing TB disease</a>.`},
 {y:2012,d:'28 Dec 2012',c:'t',t:'Bedaquiline approved',s:'The FDA approves bedaquiline for MDR-TB, with priority review.',
  txt:`Bedaquiline (Sirturo, NDA 204384) received its original FDA approval on 28 December 2012, with priority review, for MDR-TB. <sup class="c" data-ref="FDA-NDA204384,Cox2014" title="Source 94,162">94,162</sup>`},
 {y:2014,d:'2014',c:'p',t:'End TB Strategy',s:'All WHO Member States endorse targets: 90% fewer deaths by 2030 and 95% by 2035, against 2015.',
  txt:`The End TB Strategy targets were endorsed by all WHO Member States at the World Health Assembly in 2014: 80% lower incidence and 90% fewer deaths by 2030, and 90% and 95% by 2035, compared with 2015. <sup class="c" data-ref="Floyd2018" title="Source 178">178</sup> Progress so far is in <a href="#what" data-go="what">What TB is</a> and <a href="#frontier" data-go="frontier">Ending TB</a>.`},
 {y:2018,d:'2018',c:'p',t:'First UN high-level meeting',s:'The UN General Assembly holds its first high-level meeting on TB, in New York.',
  txt:`The first UN General Assembly high-level meeting on TB was held in New York in September 2018. <sup class="c" data-ref="Chakaya2021,Rodi2022" title="Source 68,401">68,401</sup> A review found that financial investment afterwards remained insufficient for the burden. <sup class="c" data-ref="Rodi2022" title="Source 401">401</sup>`},
 {y:2019,d:'14 Aug 2019',c:'t',t:'Pretomanid approved',s:'The FDA approves pretomanid, as part of BPaL for highly drug-resistant TB.',
  txt:`Pretomanid was approved in the US on 14 August 2019 (NDA 212862), as part of BPaL under the Limited Population Pathway for highly drug-resistant TB. <sup class="c" data-ref="FDA-NDA212862,Keam2019" title="Source 163,265">163,265</sup>`},
 {y:2022,d:'Dec 2022',c:'t',t:'BPaLM: six months, all oral',s:'WHO recommends 6-month bedaquiline, pretomanid, linezolid and moxifloxacin for MDR/RR-TB.',
  txt:`In December 2022 WHO recommended the 6-month BPaLM regimen (bedaquiline, pretomanid, linezolid, moxifloxacin) in place of 9-month or longer regimens for MDR/RR-TB. <sup class="c" data-ref="Vanino2023,Nyangwa2022" title="Source 358,486">358,486</sup> People starting 6-month MDR/RR-TB regimens rose from 1,744 in 2022 to 34,256 in 2024, in 97 countries. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup> See <a href="#drtb" data-go="drtb">Treating drug-resistant TB</a>.`},
 {y:2023,d:'2023',c:'p',t:'Second UN high-level meeting',s:'Member States adopt a target: by 2027, at least 90% of people who develop TB get quality diagnosis and treatment.',
  txt:`At the second UN high-level meeting on TB, in 2023, Member States adopted a target that by 2027 at least 90% of people who develop TB receive quality-assured diagnosis and treatment. <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>`}
];
const HI_STEPS=[
 {from:0,at:hiU(-2300),k:'Before 1700',t:'An ancient disease',pt:`TB is very old. It has been found in bones about 9,000 years old.`,hook:`Atlit-Yam (9,250–8,160 years ago): the oldest <i>M. tuberculosis</i> DNA in this list. Egyptian mummies carry human-type, not bovine, TB DNA.`},
 {from:hiU(1700),at:hiU(1866),k:'1700–1880',t:'Consumption and contagion',pt:`For centuries people did not know TB was an infection. Sanatoria offered rest, food and fresh air.`,hook:`Villemin 1865: TB is transmissible. Brehmer 1854: the sanatorium cure.`},
 {from:hiU(1880),at:hiU(1883),k:'1882–1939',t:'Koch, tuberculin and BCG',pt:`Robert Koch found the TB germ in 1882. World TB Day, 24 March, marks that day.`,hook:`24 March 1882 = World TB Day. Tuberculin failed as a cure (1890) but became the skin test (von Pirquet 1907). First BCG: 18 July 1921.`},
 {from:hiU(1942),at:hiU(1948.5),k:'1944–1960',t:'The first drugs and trials',pt:`Doctors learned early that one medicine alone stops working, so TB is always treated with several medicines together.`,hook:`MRC 1948: randomised, blinded X-ray reading; 4/55 vs 15/52 deaths at 6 months, and resistance on a single drug.`},
 {from:hiU(1961),at:hiU(1973),k:'1960–1990',t:'Short-course treatment',pt:`Treatment went from years to 6 months once rifampicin and pyrazinamide were added.`,hook:`1970s: isoniazid + rifampicin cut treatment from 18 to 9 months; 1980s: + pyrazinamide = 6 months.`},
 {from:hiU(1990),at:hiU(2023.4),k:'1990–2023',t:'Global control and new tools',pt:`New tests give answers in hours, and drug-resistant TB can now be treated with tablets for 6 months.`,hook:`1993 global emergency → DOTS → 2010 Xpert → 2012 bedaquiline → 2019 pretomanid → 2022 BPaLM.`}
];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),chips=$('#hiYears');const on={d:true,t:true,p:true};let setSt=()=>{};
  const CAT={d:['Discoveries & tests','var(--accent)'],t:['Treatment','var(--rx)'],p:['Public health','var(--vax)']};
  const TOOLS=[{y:1907,l:'TST',c:'var(--accent)'},{y:1921,l:'BCG',c:'var(--vax)'},{y:1944,l:'S',n:'streptomycin',c:'var(--dNew)'},{y:1946,l:'PAS',c:'var(--muted)',gone:1962},
    {y:1952,l:'H',n:'isoniazid',c:'var(--dH)'},{y:1962,d:'1960s',l:'E',n:'ethambutol',c:'var(--dE)'},{y:1968,l:'R',n:'rifampicin',c:'var(--dR)'},{y:1980,d:'1980s',l:'Z',n:'pyrazinamide (6-month cure)',c:'var(--dZ)'},
    {y:2010,l:'Xpert',c:'var(--accent)'},{y:2012,l:'B',n:'bedaquiline',c:'var(--dNew)'},{y:2019,l:'Pa',n:'pretomanid',c:'var(--dNew)'},{y:2022,l:'BPaLM',c:'var(--rx)'}];
  const wrap=(s,n)=>{const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L};
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  function cur(Y){let e=null;HI_EV.forEach(v=>{if(on[v.c]&&v.y<=Y+.01)e=v});return e}
  function draw(t){const N=vb(svg,'720 390','400 600');const Y=hiY(t),ph=phaseOf(HI_STEPS,t),E=cur(Y);
    const L=N?{ax0:96,ax1:384,ly:[266,292,318],ty:342,cy:64,ch:176,tw:46,tb:380,tl:520}:{ax0:130,ax1:700,ly:[176,202,228],ty:252,cy:44,ch:104,tw:96,tb:292,tl:372};
    const X=u=>lerp(L.ax0,L.ax1,u),yrTxt=Y<0?Math.round(-Y/50)*50+' BCE':String(Math.round(Y));
    let s=`<text x="${N?16:30}" y="28" class="t-big">${HI_STEPS[ph].t}</text><text x="${N?16:690}" y="${N?50:28}" class="t-big ${N?'':'t-end'}" style="fill:var(--brand);font-family:var(--mono)">${yrTxt}</text>`;
    /* the milestone card */
    if(E){const age=t-hiU(E.y),op=clamp(.35+age*40),dx=(1-clamp(age*30))*14,cx=N?16:30,cw=N?368:660;
      s+=`<g style="opacity:${f1(op)}" transform="translate(${f1(dx)} 0)"><rect x="${cx}" y="${L.cy}" width="${cw}" height="${L.ch}" rx="12" style="fill:var(--panel-2);stroke:${CAT[E.c][1]};stroke-width:1.4"/>`;
      s+=`<rect x="${cx}" y="${L.cy}" width="6" height="${L.ch}" rx="3" style="fill:${CAT[E.c][1]}"/>`;
      s+=`<text x="${cx+18}" y="${L.cy+22}" class="t-sm" style="fill:${CAT[E.c][1]}">${E.d.toUpperCase()} · ${CAT[E.c][0].toUpperCase()}</text>`;
      const tl=wrap(E.t,N?34:80);tl.forEach((l,i)=>s+=`<text x="${cx+18}" y="${L.cy+44+i*19}" class="t-big" style="font-size:${N?17:18}px">${esc(l)}</text>`);
      const bl=wrap(E.s,L.tw).slice(0,N?6:2),by=L.cy+44+tl.length*19+4;
      bl.forEach((l,i)=>s+=`<text x="${cx+18}" y="${by+i*(N?17:18)}" class="t-lbl" style="font-weight:500;font-size:${N?12.5:13}px">${esc(l)}</text>`);
      s+='</g>'}
    else s+=`<text x="${N?16:30}" y="${L.cy+40}" class="t-sm">No milestone shown yet: switch a filter back on or scrub forward.</text>`;
    /* lanes */
    ['d','t','p'].forEach((c,i)=>{const y=L.ly[i];s+=`<text x="${N?16:30}" y="${y+3}" class="t-xs" style="fill:${CAT[c][1]};opacity:${on[c]?1:.35}">${['discoveries','treatment','public health'][i]}</text><line x1="${L.ax0}" x2="${L.ax1}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-dasharray:2 3"/>`;
      if(!on[c])return;
      HI_EV.filter(v=>v.c===c).forEach(v=>{const x=X(hiU(v.y)),past=v.y<=Y+.01,isE=v===E;
        s+=`<circle cx="${f1(x)}" cy="${y}" r="${isE?7:4.5}" style="fill:${past?CAT[c][1]:'var(--panel)'};stroke:${CAT[c][1]};stroke-width:1.4;opacity:${past?1:.6}"/>`})});
    /* axis */
    s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.ty-10}" y2="${L.ty-10}" class="axis"/>`;
    HI_SEG.forEach(([yr,u],i)=>{const x=X(u);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ty-14}" y2="${L.ty-6}" class="axis"/>`;
      if(!N||(i!==2&&i!==1))s+=`<text x="${f1(x)}" y="${L.ty+6}" class="t-xs ${i===0?'':i===HI_SEG.length-1?'t-end':'t-mid'}">${yr<0?(N?'7000 BC':'7000 BCE'):yr}</text>`});
    /* era bands under the axis */
    HI_STEPS.forEach((st,i)=>{const a=X(st.from),b=X(i<HI_STEPS.length-1?HI_STEPS[i+1].from:1);s+=`<rect x="${f1(a)}" y="${L.ty-12}" width="${f1(Math.max(0,b-a-1))}" height="4" style="fill:${i===ph?'var(--brand)':'var(--line)'}"/>`});
    /* playhead */
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${L.ly[0]-14}" y2="${L.ty-8}" style="stroke:var(--brand);stroke-width:2"/><circle cx="${f1(X(t))}" cy="${L.ty-10}" r="5" style="fill:var(--brand)"/>`;
    /* toolbox */
    s+=`<text x="${N?16:30}" y="${L.tb}" class="t-sm">TOOLBOX IN ${yrTxt}</text>`;
    const tw=N?58:52,gap=N?2:4;
    TOOLS.forEach((T,i)=>{const col=N?i%6:i,row=N?Math.floor(i/6):0,x=(N?16:30)+col*(tw+gap),y=L.tb+10+row*48,have=Y>=T.y,gone=T.gone&&Y>=T.gone;
      const o=have?(gone?.45:1):.22;
      s+=`<g style="opacity:${o}"><rect x="${x}" y="${y}" width="${tw}" height="26" rx="6" style="fill:${have?'var(--panel)':'none'};stroke:${T.c};stroke-width:${have?1.6:1};stroke-dasharray:${have?'0':'3 3'}"/>`;
      if(T.n)s+=pill(x+12,y+13,14,T.c,{tab:true});
      s+=`<text x="${T.n?x+34:x+tw/2}" y="${y+17}" class="t-lbl t-mid" style="font-size:12px;${gone?'text-decoration:line-through':''}">${T.l}</text><text x="${x+tw/2}" y="${y+38}" class="t-xs t-mid">${T.d||T.y}</text></g>`});
    const len=Y<1944?'no effective drug: rest, food, fresh air, lung collapse':Y<1952?'streptomycin alone, then with PAS: resistance a problem':Y<1970?'triple therapy: about 18 months':Y<1980?'isoniazid + rifampicin: 9 months':Y<2022?'6 months with pyrazinamide (drug-susceptible TB)':'6 months for drug-susceptible TB; 6-month BPaLM for MDR/RR-TB';
    if(N)s+=`<text x="16" y="${L.tl}" class="t-sm" style="fill:var(--ink)">Standard treatment then:</text>`+wrap(len,52).map((l,i)=>`<text x="16" y="${L.tl+18+i*16}" class="t-sm" style="fill:var(--rx);font-weight:700">${l}</text>`).join('');
    else s+=`<text x="30" y="${L.tl}" class="t-sm" style="fill:var(--ink)">Standard treatment then: <tspan style="fill:var(--rx);font-weight:700">${len}</tspan></text>`;
    svg.innerHTML=s;setSt(ph);
    const st=HI_STEPS[ph];
    $('#hiNote').innerHTML=noteHTML(E?{k:`${E.d} · ${CAT[E.c][0]}`,t:E.t,txt:E.txt,pt:st.pt,hook:st.hook}:{k:st.k,t:st.t,txt:'All milestones in this stretch are filtered out.',pt:st.pt,hook:st.hook});
    if(ph!==chipPh){chipPh=ph;chipsDraw()}
    $$('[data-hy]',chips).forEach(b=>b.classList.toggle('brand',HI_EV[+b.dataset.hy]===E));
  }
  let chipPh=-1;
  function chipsDraw(){const a=HI_STEPS[Math.max(0,chipPh)].from,b=chipPh>=0&&chipPh<HI_STEPS.length-1?HI_STEPS[chipPh+1].from:1.01;
    chips.innerHTML=HI_EV.map((v,i)=>{const u=hiU(v.y),show=on[v.c]&&u>=a-.001&&u<b-.001;return show?`<button class="tag" data-hy="${i}">${v.d.replace('Ancient Greece','Greece')} · ${esc(v.t)}</button>`:''}).join('')}
  const stop=playWire(rg,$('#hiPlay'),draw,40000,'Replay','history');
  setSt=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=HI_EV[+b.dataset.hy],u=Math.min(1,hiU(v.y)+.0015);rg.value=u;draw(u)});
  $$('[data-hf]').forEach(b=>b.addEventListener('click',()=>{const c=b.dataset.hf;on[c]=!on[c];b.setAttribute('aria-pressed',on[c]);chipsDraw();draw(+rg.value)}));
  chipsDraw();draw(+rg.value);

  /* ---- what changed the curve ---- */
  const ms=$('#hiMort'),mr=$('#hiMT');let lens='decline';
  const CITY=[['Cape Town'],['New York City'],['London']];
  const MN={
    decline:{lab:'Year',k:'England and Wales, 1853–1910',t:'Falling before any drug',
      txt:`TB mortality in England and Wales fell by an average of 1.71% a year (95% CI 0.77–2.63) from 1853 to 1910, before any effective drug. Over the same period total mortality, infant mortality and housing density did not fall significantly. The authors argue that social conditions alone do not explain the decline and propose a role for natural selection (<span class="ev hyp">Hypothesis</span>). <sup class="c" data-ref="Davies1999" title="Source 111">111</sup> Koch's 1882 discovery changed understanding, not treatment.`,
      pt:`TB was already becoming less deadly in Victorian England, decades before any medicine. Why is still debated.`,
      hook:`England and Wales 1853–1910: TB mortality −1.71%/year with no drugs; sanatoria from 1854.`},
    contacts:{lab:'Year',k:'England and Wales, model',t:'Fewer effective contacts',
      txt:`A model for England and Wales estimates that each infectious person effectively contacted about 22 people in 1900, about 10 by 1950 and about 1 by 1990; falling contact was a major driver of the decline. <sup class="c" data-ref="Vynnycky1999" title="Source 500">500</sup> Drugs came in the middle of this fall: streptomycin in 1944 and triple therapy in 1952. <sup class="c" data-ref="Schatz1944,Iseman2002" title="Source 245,414">245,414</sup> The circles are the model's values; the lines between them are drawn.`,
      pt:`As housing, work and health care changed, each person with TB passed it to fewer people. Treatment added to a fall that had already begun.`,
      hook:`Effective contacts per infectious case (E&W model): 22 (1900) → 10 (1950) → 1 (1990).`},
    fatality:{lab:'Year',k:'Three cities',t:'Drugs cut deaths, not always spread',
      txt:`In the pre-chemotherapy era, TB case fatality in Cape Town, New York City and London was 45–60% a year; after combination chemotherapy it fell below 10% in all three. But the cities had already diverged: rates fell steadily in New York and London and stayed high in Cape Town, where notification rates returned to pre-chemotherapy levels by 1980 and doubled again with HIV in the 1990s. Chemotherapy cut case fatality but not transmission. <sup class="c" data-ref="Hermans2015" title="Source 226">226</sup>`,
      pt:`Medicines turned TB from a disease that killed about half of the people who had it into one that can be cured. Stopping it spreading needed more than medicines.`,
      hook:`Case fatality 45–60%/year before drugs → under 10% after combination chemotherapy (Cape Town, New York, London). Before drugs, pulmonary TB had about 50% mortality. <sup class="c" data-ref="Mitchison2005" title="Source 329">329</sup>`},
    trial:{lab:'Month',k:'MRC 1948',t:'The first randomised trial of a TB drug',
      txt:`The trial enrolled people aged 15–30 with acute progressive bilateral pulmonary TB. At 6 months, 4 of 55 people given streptomycin had died, against 15 of 52 given bed rest alone. But 47 of 55 on streptomycin were still culture-positive, and resistance emerged, especially after month 4. <sup class="c" data-ref="Crofton2006" title="Source 96">96</sup> Allocation by sealed envelopes ordered by random numbers, with X-ray readers who did not know the group, made it a model for later trials. <sup class="c" data-ref="Yoshioka1998,MRC1948" title="Source 332,528">332,528</sup>`,
      pt:`The new medicine saved lives, but given alone the germs soon learned to resist it. That is why TB is treated with several medicines together.`,
      hook:`MRC 1948: deaths 4/55 (7%) vs 15/52 (29%) at 6 months; resistance after month 4 on monotherapy.`}};
  function drawM(t){const N=vb(ms,'720 330','400 460'),M=MN[lens];$('#hiMLab').textContent=M.lab;let s='';
    const C=N?{x0:46,x1:384,y0:40,y1:300}:{x0:60,x1:690,y0:40,y1:280};
    const axes=(xa,xb,ya,yb,yt,xt,fmt)=>{const X=v=>lerp(C.x0,C.x1,(v-xa)/(xb-xa)),V=v=>lerp(C.y1,C.y0,(v-ya)/(yb-ya));
      yt.forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v===ya?'axis':'grid'}"/><text x="${C.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${fmt(v)}</text>`);
      xt.forEach(v=>s+=`<text x="${f1(X(v))}" y="${C.y1+15}" class="t-xs t-mid">${v}</text>`);return[X,V]};
    if(lens==='decline'){const Y=lerp(1853,1910,t),f=y=>100*Math.pow(1-.0171,y-1853);const [X,V]=axes(1850,1915,0,100,[0,25,50,75,100],[1850,1870,1890,1910],v=>v+'%');
      s+=`<text x="${C.x0}" y="${C.y0-16}" class="t-sm" style="fill:var(--tb)">${N?'TB MORTALITY, % OF 1853':'TB MORTALITY IN ENGLAND AND WALES, % OF ITS 1853 LEVEL'}</text>`;
      [[1854,'sanatorium cure'],[1882,'Koch']].forEach(([yr,l])=>s+=`<line x1="${f1(X(yr))}" x2="${f1(X(yr))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--muted);stroke-dasharray:3 3;opacity:.6"/><text x="${f1(X(yr)+4)}" y="${C.y1-8}" class="t-xs">${l}</text>`);
      s+=`<path d="${pathFn(u=>1-f(lerp(1853,Y,u))/100,X(1853),X(Y),C.y0,C.y1,60)}" style="fill:none;stroke:var(--tb);stroke-width:2.8"/>`;
      s+=`<circle cx="${f1(X(Y))}" cy="${f1(V(f(Y)))}" r="5" style="fill:var(--tb)"/><text x="${f1(Math.min(X(Y)+8,C.x1-70))}" y="${f1(V(f(Y))-10)}" class="t-lbl" style="fill:var(--tb)">${Math.round(Y)}: ${Math.round(f(Y))}%</text>`;
      s+=`<text x="${C.x1}" y="${C.y0+4}" class="t-xs t-end">${N?'curve from the average rate':'drawn from the published average fall of 1.71% a year, not yearly data'}</text>`;
      s+=`<text x="${C.x1}" y="${C.y0+18}" class="t-xs t-end" style="fill:var(--warn)">no effective drug in this period</text>`}
    else if(lens==='contacts'){const Y=lerp(1900,1990,t),P=[[1900,22],[1950,10],[1990,1]];const [X,V]=axes(1900,1990,0,25,[0,5,10,15,20,25],[1900,1920,1940,1960,1980],v=>v);
      s+=`<text x="${C.x0}" y="${C.y0-16}" class="t-sm" style="fill:var(--accent)">${N?'EFFECTIVE CONTACTS PER CASE (MODEL)':'PEOPLE EACH INFECTIOUS PERSON EFFECTIVELY CONTACTED A YEAR · ENGLAND AND WALES MODEL'}</text>`;
      s+=`<rect x="${f1(X(1952))}" y="${C.y0}" width="${f1(C.x1-X(1952))}" height="${C.y1-C.y0}" style="fill:var(--rx-soft);opacity:.6"/><text x="${f1(X(1952)+6)}" y="${C.y0+14}" class="t-xs" style="fill:var(--rx)">combination chemotherapy from 1952</text>`;
      s+=`<line x1="${f1(X(1944))}" x2="${f1(X(1944))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--rx);stroke-dasharray:3 3"/><text x="${f1(X(1944)-4)}" y="${C.y0+30}" class="t-xs t-end" style="fill:var(--rx)">streptomycin 1944</text>`;
      let d='';const at=y=>y<=1950?lerp(22,10,(y-1900)/50):lerp(10,1,(y-1950)/40);for(let i=0;i<=60;i++){const y=lerp(1900,Y,i/60);d+=(i?'L':'M')+f1(X(y))+' '+f1(V(at(y)))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.8"/>`;
      P.forEach(([y,v])=>{if(Y>=y-.5)s+=`<circle cx="${f1(X(y))}" cy="${f1(V(v))}" r="6" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(y)+(y===1990?-10:10))}" y="${f1(V(v)-10)}" class="t-lbl ${y===1990?'t-end':''}">${v}${y===1900?' in 1900':''}</text>`});
      s+=`<circle cx="${f1(X(Y))}" cy="${f1(V(at(Y)))}" r="4.5" style="fill:var(--accent)"/>`}
    else if(lens==='fatality'){const Y=lerp(1930,1980,t),k=ease(ramp(Y,1952,1962));const [X,V]=[null,v=>lerp(C.y1,C.y0+20,v/70)];
      [0,10,20,30,40,50,60,70].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
      s+=`<text x="${C.x0}" y="${C.y0-16}" class="t-sm" style="fill:var(--bad)">${N?'TB CASE FATALITY PER YEAR':'TB CASE FATALITY PER YEAR, BEFORE AND AFTER COMBINATION CHEMOTHERAPY'}</text>`;
      s+=`<text x="${C.x1}" y="${C.y0+4}" class="t-big t-end" style="fill:${k>0?'var(--rx)':'var(--bad)'}">${Math.round(Y)}${Y<1952?' · before chemotherapy':k<1?' · drugs arrive':' · after'}</text>`;
      const gw=(C.x1-C.x0)/3;CITY.forEach(([n],i)=>{const cx=C.x0+gw*i+gw/2,bw=Math.min(70,gw*.5);
        const hi=lerp(60,10,k),lo=lerp(45,0,k);
        s+=`<rect x="${f1(cx-bw/2)}" y="${f1(V(hi))}" width="${f1(bw)}" height="${f1(V(lo)-V(hi))}" rx="4" style="fill:${k>.5?'var(--rx)':'var(--bad)'};opacity:${k>.5?.55:.35}"/>`;
        s+=`<rect x="${f1(cx-bw/2)}" y="${f1(V(hi))}" width="${f1(bw)}" height="${f1(V(0)-V(hi))}" rx="4" style="fill:none;stroke:${k>.5?'var(--rx)':'var(--bad)'};stroke-width:1.4"/>`;
        s+=`<text x="${f1(cx)}" y="${f1(V(hi)-8)}" class="t-lbl t-mid">${k<.05?'45–60%':k>.95?'< 10%':'falling'}</text><text x="${f1(cx)}" y="${C.y1+16}" class="t-sm t-mid" style="fill:var(--ink)">${n}</text>`;
        if(i===0&&Y>=1980-.5)s+=`<text x="${f1(cx)}" y="${C.y1+30}" class="t-xs t-mid" style="fill:var(--bad)">notifications back to</text><text x="${f1(cx)}" y="${C.y1+41}" class="t-xs t-mid" style="fill:var(--bad)">pre-drug levels by 1980</text>`});
      s+=`<text x="${C.x0+4}" y="${C.y0+24}" class="t-xs">${N?'shaded: published range; timing drawn':'shaded: published range; the fall\u2019s timing (1952–62) is drawn'}</text>`}
    else{const mo=t*6;const g=[{n:'Streptomycin + bed rest',tot:55,die:4,c:'var(--rx)'},{n:'Bed rest alone',tot:52,die:15,c:'var(--bad)'}];
      s+=`<text x="${N?16:30}" y="26" class="t-sm">MRC 1948 · MONTH ${f1(mo)} OF 6 · DEATHS SHOWN AS OUTLINED FIGURES</text>`;
      g.forEach((G,gi)=>{const ox=N?16:30+gi*345,oy=N?52+gi*196:52,cols=N?14:11,ps=N?17:19,cw=N?26:28,rh=N?27:30;
        const nd=Math.round(G.die*Math.min(1,t*1.0001));
        s+=`<text x="${ox}" y="${oy}" class="t-lbl" style="fill:${G.c}">${G.n}</text><text x="${ox+(N?368:310)}" y="${oy}" class="t-lbl t-end">${nd} of ${G.tot} died</text>`;
        for(let i=0;i<G.tot;i++){const x=ox+12+(i%cols)*cw,y=oy+10+Math.floor(i/cols)*rh,dead=i>=G.tot-nd;
          if(dead)s+=`<rect x="${f1(x-ps*.38)}" y="${f1(y-1)}" width="${f1(ps*.76)}" height="${f1(ps+2)}" rx="3" style="fill:none;stroke:var(--bad);stroke-width:1.2"/>`;
          s+=person(x,y,ps,dead?'var(--line)':G.c,{op:dead?1:.85})}});
      if(t>.99){const yy=N?440:262;s+=`<text x="${N?16:30}" y="${yy}" class="t-sm" style="fill:var(--warn)">${N?'47 of 55 still culture-positive at 6 months':'But 47 of 55 on streptomycin were still culture-positive at 6 months; resistance emerged.'}</text>`}
      s+=`<text x="${N?16:30}" y="${N?456:310}" class="t-xs">${N?'only 6-month totals are published; timing drawn':'Only the 6-month totals are published (as reported by Crofton); when each death happened is drawn, not measured.'}</text>`}
    ms.innerHTML=s;
    $('#hiMCap').innerHTML={decline:'Curve computed from the average annual decline reported by Davies and colleagues; it is not a yearly series. <sup class="c" data-ref="Davies1999" title="Source 111">111</sup>',contacts:'Model values for England and Wales; lines between the three published points are drawn. <sup class="c" data-ref="Vynnycky1999" title="Source 500">500</sup>',fatality:'Ranges as published for the three cities. <sup class="c" data-ref="Hermans2015" title="Source 226">226</sup>',trial:'Numbers from a first-hand account of the trial. <sup class="c" data-ref="Crofton2006" title="Source 96">96</sup>'}[lens];
    $('#hiMNote').innerHTML=noteHTML(M);
  }
  const stopM=playWire(mr,$('#hiMPlay'),drawM,9000,'Replay','history');
  $$('[data-hm]').forEach(b=>b.addEventListener('click',()=>{stopM();lens=b.dataset.hm;$$('[data-hm]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawM(+mr.value)}));
  drawM(+mr.value);
};
/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · The infection",2:"Part 2 · Diagnosis",3:"Part 3 · Treatment",4:"Part 4 · Prevention & control",5:"Part 5 · Living with TB",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: the infection ---- */
 [1,`How many people fell ill with TB, and how many died, in 2024?`,`10.7 million fell ill (131 per 100,000) and 1.23 million died, including 150,000 people with HIV <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>. These are population estimates.`],
 [1,`What share of the world's population has TB infection?`,`About a quarter: 23.0% (about 1.7 billion people) by modelling, and 24.8% by IGRA meta-analysis <sup class="c" data-ref="Houben2016,Cohen2019ERJ" title="Source 78,239">78,239</sup>.`],
 [1,`What separates TB infection from TB disease?`,`Macroscopic pathology. The ICE-TB consensus defines disease by visible pathology and splits it into subclinical and clinical states <sup class="c" data-ref="Coussens2024" title="Source 93">93</sup>. TB infection is not contagious <sup class="c" data-ref="Drain2018,Coussens2024" title="Source 93,142">93,142</sup>.`],
 [1,`How large are the cough particles that carry culturable M. tuberculosis?`,`Small enough to breathe deep into the lung: 0.65–4.7 µm in 96.4% of cases <sup class="c" data-ref="Fennelly2012" title="Source 173">173</sup>.`],
 [1,`How many bacilli does it take to start an infection?`,`Very few: usually 1–5 tubercle bacilli <sup class="c" data-ref="Balasubramanian1994" title="Source 24">24</sup>.`],
 [1,`Why does TB treatment take months rather than days?`,`Partly because the bacillus grows slowly: a mean generation time of 23.1 hours even in a "fast" chemostat population <sup class="c" data-ref="Jeeves2015" title="Source 247">247</sup>, and treatment must reach slow and non-replicating bacilli <sup class="c" data-ref="Mitchison2000" title="Source 328">328</sup>.`],
 [1,`What makes the bacillus acid-fast and hard for drugs to enter?`,`Its cell wall: peptidoglycan, arabinogalactan and a thick layer of mycolic acids, "a truly special lipid barrier" <sup class="c" data-ref="Brennan2003" title="Source 48">48</sup> that keeps many compounds out <sup class="c" data-ref="Hett2008" title="Source 232">232</sup>.`],
 [1,`Why do IGRAs stay specific after BCG vaccination?`,`Their antigens, ESAT-6 and CFP-10, are encoded in RD1, which is deleted from every BCG strain <sup class="c" data-ref="Harboe1996,Mahairas1996,Andersen2000" title="Source 12,218,301">12,218,301</sup>.`],
 [1,`How does M. tuberculosis survive inside a macrophage?`,`Its phagosome fails to acidify below pH 6.3–6.5 and excludes the proton-ATPase <sup class="c" data-ref="SturgillKoszycki1994" title="Source 449">449</sup>; later, ESX-1 lets it rupture into the cytosol <sup class="c" data-ref="vanderWel2007,Simeone2012" title="Source 428,481">428,481</sup>.`],
 [1,`Why is there a gap of weeks before a skin or blood test turns positive?`,`T-cell priming begins in the mediastinal lymph node only after about 10 days in mice, and the bacteria spread before T cells arrive <sup class="c" data-ref="Reiley2008,Wolf2008,Chackerian2002" title="Source 67,396,524">67,396,524</sup>.`],
 [1,`Which two cytokines are essential for containing TB in mice?`,`Interferon-γ and TNF. Granulomas still form without them, but necrosis and uncontrolled growth follow <sup class="c" data-ref="Flynn1993,Flynn1995" title="Source 179,180">179,180</sup>.`],
 [1,`How much oxygen is inside a granuloma?`,`Almost none: 1.6 ± 0.7 mm Hg measured in 3 mm rabbit lesions <sup class="c" data-ref="Via2008" title="Source 496">496</sup>.`],
 [1,`When does TB disease usually appear after infection?`,`Early: in Amsterdam contacts, 75% of cases within 1 year and 97% within 2 years <sup class="c" data-ref="Behr2018" title="Source 34">34</sup>.`],
 [1,`How much does diabetes raise the risk of TB disease?`,`About threefold (RR 3.11, 95% CI 2.27–4.26) <sup class="c" data-ref="Jeon2008" title="Source 250">250</sup>.`],
 [1,`Which anti-TNF drugs carry the highest TB risk?`,`The monoclonal antibodies: SIR 18.6 for infliximab and 29.3 for adalimumab, against 1.8 for the soluble receptor etanercept <sup class="c" data-ref="Tubach2009" title="Source 475">475</sup>.`],
 [1,`Does everyone with pulmonary TB spread it equally?`,`No. Only 28% of people with culture-confirmed TB produced culturable cough aerosols <sup class="c" data-ref="Fennelly2012" title="Source 173">173</sup>, and only high-aerosol producers predicted household infection (adjusted OR 4.81) <sup class="c" data-ref="JonesLopez2013" title="Source 257">257</sup>.`],
 /* ---- Part 2: diagnosis ---- */
 [2,`What is the WHO four-symptom screen for people with HIV?`,`Any one of current cough, fever, night sweats or weight loss: sensitivity 78.9%, specificity 49.6% <sup class="c" data-ref="Getahun2011" title="Source 197">197</sup>.`],
 [2,`How well does a cough of 2 weeks or more find TB in community screening?`,`It is specific (94%) but insensitive (42%), so it misses about half <sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup>.`],
 [2,`How sensitive is any chest X-ray abnormality for pulmonary TB in screening?`,`About 95% <sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup>.`],
 [2,`How is a Mantoux tuberculin skin test given and read?`,`0.1 mL of 5 TU PPD intradermally into the forearm, read at 48–72 hours, measuring induration only <sup class="c" data-ref="ATS2000" title="Source 17">17</sup>.`],
 [2,`Who counts as TST-positive at 5 mm?`,`Close contacts, people who are immunosuppressed (including HIV), people taking TNF blockers, and people with current or past TB on X-ray <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 [2,`Who counts as TST-positive at 10 mm, and at 15 mm?`,`10 mm: other people at increased risk, such as people born in high-incidence countries or with occupational exposure. 15 mm: everyone else <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 [2,`Does infant BCG make a later skin test positive?`,`Rarely after 10 years: only 1% had a TST of 10 mm or more 10 or more years after infant BCG <sup class="c" data-ref="Farhat2006" title="Source 158">158</sup>.`],
 [2,`What are the IGRA positive cut-offs?`,`QFT: 0.35 IU/mL or more. T-SPOT.TB: 8 spots or more, borderline at 5–7 <sup class="c" data-ref="Mazurek2010" title="Source 316">316</sup>.`],
 [2,`Can a TST or IGRA tell TB infection from TB disease?`,`No. Neither does, and both predict progression poorly: positive predictive values under about 3% <sup class="c" data-ref="Lewinsohn2017,Hamada2023" title="Source 217,284">217,284</sup>.`],
 [2,`How sensitive are sputum smears?`,`Three smears give about 70% sensitivity; fluorescence microscopy adds about 10% <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 [2,`What does a single Xpert MTB/RIF test detect, and how fast?`,`98.2% of smear-positive and 72.5% of smear-negative culture-positive TB, with rifampicin resistance, in under 2 hours <sup class="c" data-ref="Boehme2010" title="Source 44">44</sup>.`],
 [2,`Where does most rifampicin resistance lie in the genome?`,`In one short stretch of rpoB, the RRDR: more than 95% of rifampicin-resistant isolates <sup class="c" data-ref="Seifert2015,Telenti1993" title="Source 419,462">419,462</sup>.`],
 [2,`What are the two commonest isoniazid-resistance mutations?`,`katG315 (64%) and the inhA −15 promoter mutation (19%); inhA mutations can also cause ethionamide cross-resistance <sup class="c" data-ref="Seifert2015,Banerjee1994" title="Source 25,419">25,419</sup>.`],
 [2,`Who benefits most from the urine LF-LAM test?`,`Very sick inpatients with HIV and low CD4 counts. LAM-guided treatment cut 8-week mortality by 17% (relative) in a trial <sup class="c" data-ref="Peter2016,Bjerrum2019" title="Source 42,371">42,371</sup>.`],
 [2,`What is the most common site of extrapulmonary TB?`,`Lymph nodes (40.4% of US extrapulmonary cases), then pleura (19.8%) <sup class="c" data-ref="Peto2009" title="Source 372">372</sup>.`],
 [2,`Define MDR-TB, pre-XDR-TB and XDR-TB.`,`MDR: rifampicin plus isoniazid resistance. Pre-XDR: rifampicin resistance plus a fluoroquinolone. XDR: pre-XDR plus bedaquiline or linezolid <sup class="c" data-ref="WHO-Mod4-2025,Viney2021" title="Source 498,515">498,515</sup>.`],
 [2,`Is most MDR-TB acquired during treatment or transmitted?`,`Transmitted: a median 95.9% of incident MDR-TB in a global model <sup class="c" data-ref="Kendall2015" title="Source 268">268</sup>.`],
 /* ---- Part 3: treatment ---- */
 [3,`What does 2HRZE/4HR mean?`,`Two months of isoniazid, rifampicin, pyrazinamide and ethambutol, then four months of isoniazid and rifampicin, daily (WHO, strong, high certainty) <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 [3,`Which drug does the early killing, and which sterilises?`,`Isoniazid kills about 95% of organisms in the first two days <sup class="c" data-ref="Mitchison2000" title="Source 328">328</sup>; rifampicin is the key sterilising drug <sup class="c" data-ref="Jindani2003" title="Source 253">253</sup>.`],
 [3,`What does each of R, Z and E target?`,`Rifampicin blocks the RNA polymerase β subunit <sup class="c" data-ref="Campbell2001Rif" title="Source 62">62</sup>; pyrazinamide needs pncA and acid pH <sup class="c" data-ref="Zhang2003PZA" title="Source 536">536</sup>; ethambutol blocks arabinan synthesis via embCAB <sup class="c" data-ref="Telenti1997" title="Source 463">463</sup>.`],
 [3,`Who is eligible for the 4-month 2HPMZ/2HPM regimen?`,`WHO: age 12 or over with drug-susceptible pulmonary TB, weight at least 40 kg; not for CD4 below 100, pregnancy, or meningitis, bone or disseminated TB <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 [3,`What did SHINE show?`,`Four months is enough for children aged 3 months to 16 years with non-severe TB: 3% events in both arms <sup class="c" data-ref="Turkova2022,WHO-Mod4-2025" title="Source 477,515">477,515</sup>.`],
 [3,`Rifampin and rifapentine: with or without food?`,`The labels say rifampin on an empty stomach (1 hour before or 2 hours after a meal) and rifapentine with food <sup class="c" data-ref="FDA-Rifampin,FDA-Priftin" title="Source 165,168">165,168</sup>.`],
 [3,`Why does rifampicin cause so many interactions?`,`It strongly induces CYP3A4 and P-glycoprotein, so hormonal contraception, methadone, warfarin and some protease inhibitors lose effect <sup class="c" data-ref="Niemi2003,FDA-Rifampin" title="Source 168,353">168,353</sup>.`],
 [3,`What ALT level makes ATS advise interrupting TB treatment?`,`More than 3 times the upper limit of normal with symptoms or jaundice, or more than 5 times without symptoms <sup class="c" data-ref="Saukkonen2006" title="Source 412">412</sup>.`],
 [3,`Which first-line drug causes the most major adverse events?`,`Pyrazinamide: 1.48 major events per 100 person-months, mainly hepatotoxicity and rash <sup class="c" data-ref="Yee2003" title="Source 525">525</sup>.`],
 [3,`What is 3HP, and its typical reaction?`,`12 weekly doses of rifapentine plus isoniazid. A flu-like systemic reaction occurred in 3.5%, and hepatotoxicity was lower than with 9H <sup class="c" data-ref="Sterling2011,Sterling2015" title="Source 443,444">443,444</sup>.`],
 [3,`How does 4R compare with 9H?`,`Non-inferior for preventing TB, with completion 15.1 points higher and less hepatotoxicity <sup class="c" data-ref="Menzies2018" title="Source 321">321</sup>.`],
 [3,`What preventive treatment does WHO recommend for contacts of people with MDR/RR-TB?`,`Six months of daily levofloxacin (WHO 2024, strong) <sup class="c" data-ref="WHO-Mod1-2024" title="Source 512">512</sup>.`],
 [3,`What is BPaLM?`,`Bedaquiline, pretomanid, linezolid (600 mg) and moxifloxacin for 6 months, from age 14 <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>. In TB-PRACTECAL unfavourable outcomes were 11% against 48% with standard care <sup class="c" data-ref="Nyangwa2022" title="Source 358">358</sup>.`],
 [3,`What did ZeNix show about linezolid?`,`600 mg for 26 weeks kept efficacy (91% favourable) and cut myelosuppression to 2% <sup class="c" data-ref="Conradie2022" title="Source 86">86</sup>.`],
 [3,`What is bedaquiline's boxed warning?`,`QTc prolongation; the label calls for ECG monitoring <sup class="c" data-ref="FDA-Sirturo" title="Source 169">169</sup>.`],
 [3,`Why were injectable agents dropped from DR-TB treatment?`,`Aminoglycosides caused hearing loss in about 40% <sup class="c" data-ref="Dillard2021" title="Source 127">127</sup>; WHO no longer uses kanamycin or capreomycin <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 [3,`When should ART start in a person with HIV and TB?`,`Within 2 weeks of TB treatment, whatever the CD4 count, except in TB meningitis <sup class="c" data-ref="WHO-Mod4-2025,Torok2011" title="Source 472,515">472,515</sup>. In CAMELIA, ART at 2 rather than 8 weeks cut deaths from 27% to 18% <sup class="c" data-ref="Blanc2011" title="Source 43">43</sup>.`],
 [3,`Do steroids help in TB meningitis?`,`Yes: they cut deaths by almost a quarter (RR 0.75) <sup class="c" data-ref="Prasad2016" title="Source 378">378</sup>.`],
 [3,`How is isoniazid-resistant, rifampicin-susceptible TB (Hr-TB) treated?`,`WHO: rifampicin, ethambutol, pyrazinamide and levofloxacin for 6 months <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 [3,`Which age group is most likely to progress quickly after infection?`,`Children under 2: in pre-chemotherapy studies infection often progressed to serious disease within 12 months <sup class="c" data-ref="Marais2004" title="Source 304">304</sup>.`],
 /* ---- Part 4: prevention & control ---- */
 [4,`What is BCG?`,`A live attenuated M. bovis strain, first given to a baby in 1921, and still the only licensed TB vaccine <sup class="c" data-ref="Lange2022" title="Source 278">278</sup>.`],
 [4,`What does BCG protect against best?`,`TB meningitis and miliary TB in young children: about one meningitis case prevented per 3,435 infant vaccinations <sup class="c" data-ref="Trunz2006,Mangtani2014" title="Source 302,474">302,474</sup>.`],
 [4,`How variable is BCG against adult pulmonary TB?`,`From 78% protection in the UK MRC trial (RR 0.22) to none in Chingleput, India (RR 1.05) <sup class="c" data-ref="Abubakar2013" title="Source 3">3</sup>.`],
 [4,`Did BCG revaccination of adolescents work?`,`The 2018 signal (45.4% against sustained QFT conversion) was not confirmed in the 2025 phase 2b trial (efficacy −3.8%) <sup class="c" data-ref="Nemes2018,Schmidt2025" title="Source 351,415">351,415</sup>.`],
 [4,`Why is BCG risky for infants with HIV?`,`Disseminated BCG disease: a pooled 992 per 100,000 vaccinated infants with HIV <sup class="c" data-ref="Hesseling2009BWHO" title="Source 230">230</sup>.`],
 [4,`What did the M72/AS01E phase 2b trial show?`,`49.7% efficacy over 3 years against pulmonary TB in IGRA-positive adults <sup class="c" data-ref="Tait2019" title="Source 456">456</sup>. A phase 3 trial began in 2024 <sup class="c" data-ref="NCT06062238" title="Source 346">346</sup>.`],
 [4,`What is the hierarchy of TB infection control?`,`Administrative, then environmental, then respiratory protection. Administrative controls come first and matter most <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>.`],
 [4,`What does an airborne infection isolation (AII) room need?`,`Negative pressure of at least 0.01 inch water gauge and at least 12 air changes per hour (6 for rooms built before 2001) <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`],
 [4,`How much did surgical masks on people with MDR-TB cut transmission?`,`By 56%: guinea-pig infection fell from 76.6% to 40% <sup class="c" data-ref="Dharmadhikari2012" title="Source 119">119</sup>.`],
 [4,`What did upper-room UV light do in the Lima ward study?`,`Cut guinea-pig TB infection from 35% to 9.5% <sup class="c" data-ref="Escombe2009" title="Source 153">153</sup>.`],
 [4,`How well does opening windows ventilate a room?`,`A median 28 air changes per hour, more than twice the 12 ACH recommended for mechanically ventilated high-risk rooms <sup class="c" data-ref="Escombe2007" title="Source 150">150</sup>.`],
 [4,`When does a contact's infectious period start, and how fast is the first assessment?`,`Three months before the diagnosis; first contact assessment within 3 working days <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>.`],
 [4,`What is window prophylaxis?`,`Preventive treatment for contacts under 5 with a negative first test, once TB disease is excluded, until a retest at 8–10 weeks <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>.`],
 [4,`What are the End TB Strategy's 2035 targets?`,`A 90% fall in incidence and 95% fall in deaths against 2015, and no households facing catastrophic costs <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`],
 [4,`What did the RATIONS trial show?`,`Food rations for household contacts cut TB incidence by 39–48% <sup class="c" data-ref="Bhargava2023Lancet" title="Source 39">39</sup>.`],
 /* ---- Part 5: living with TB ---- */
 [5,`How often do TB-affected households face catastrophic costs?`,`47% overall in national surveys, and 82% for drug-resistant TB, even though treatment itself is usually free <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`],
 [5,`Which words replace "TB suspect" and "defaulter"?`,`"Person with presumptive TB" and "person lost to follow-up". The older terms were called coercive and blaming <sup class="c" data-ref="Zachariah2012" title="Source 530">530</sup>.`],
 [5,`Does direct observation improve cure over self-administered treatment?`,`Not substantially in a Cochrane review (RR 1.08, 95% CI 0.91–1.27) <sup class="c" data-ref="Karumbi2015" title="Source 261">261</sup>.`],
 [5,`How did video-observed treatment do in London?`,`70% completed at least 80% of observations in the first 2 months, against 31% on DOT <sup class="c" data-ref="Story2019" title="Source 446">446</sup>.`],
 [5,`Did smart pillboxes improve outcomes?`,`No: the 5-country ASCENT trials found no reduction in poor outcomes <sup class="c" data-ref="Jerene2025,Tadesse2025LDH" title="Source 251,455">251,455</sup>.`],
 [5,`How common is depression in people with TB?`,`A pooled 45%, and over half in people with MDR-TB <sup class="c" data-ref="Duko2020" title="Source 143">143</sup>.`],
 [5,`Can a parent breastfeed during TB treatment?`,`Guidance finds no absolute contraindication, and infection control should not usually separate a parent from their newborn <sup class="c" data-ref="Maugans2023" title="Source 314">314</sup>.`],
 [5,`What helps a person cough up a good sputum sample?`,`Instructions: they raised women's smear positivity 1.63-fold in a Pakistani trial <sup class="c" data-ref="Khan2007Lancet" title="Source 271">271</sup>.`],
 [5,`How is sputum induced safely?`,`Nebulised 3% hypertonic saline in a ventilated booth or AII room, with the health worker in at least an N95 respirator <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`],
 [5,`What eye checks does the ethambutol label ask for?`,`Visual acuity and colour discrimination before starting and periodically; monthly at doses above 15 mg/kg/day <sup class="c" data-ref="FDA-Ethambutol" title="Source 159">159</sup>.`],
 [5,`What happens after cure?`,`TB survivors have about 3 times the mortality of the general population (SMR 2.91) <sup class="c" data-ref="Romanowski2019" title="Source 402">402</sup>, and past TB is linked to COPD (OR 3.05) <sup class="c" data-ref="Byrne2015" title="Source 57">57</sup>.`],
 [5,`Should US health workers be retested every year?`,`No routine serial testing without a known exposure; a baseline test, and an annual symptom screen if TB infection is untreated <sup class="c" data-ref="Sosa2019" title="Source 438">438</sup>.`],
 /* ---- Part 6: history ---- */
 [6,`When did Koch announce the tubercle bacillus?`,`24 March 1882, the date now marked as World TB Day <sup class="c" data-ref="Barberis2017,CDC2018WTBD" title="Source 26,66">26,66</sup>.`],
 [6,`How old is the oldest TB DNA in human bones?`,`About 9,000 years, from Atlit-Yam, a submerged Neolithic village <sup class="c" data-ref="Hershkovitz2008" title="Source 227">227</sup>.`],
 [6,`Who showed TB was transmissible, and when?`,`Jean-Antoine Villemin, in 1865 <sup class="c" data-ref="Daniel2006,Cambau2014" title="Source 60,103">60,103</sup>.`],
 [6,`When and where was BCG first given to a baby?`,`In Paris on 18 July 1921, by mouth, to a newborn whose mother had died of TB <sup class="c" data-ref="Luca2013" title="Source 299">299</sup>.`],
 [6,`What happened at Lübeck in 1930?`,`73 of 250 vaccinated infants died; an inquiry blamed contamination with virulent bacilli in the local laboratory, not BCG itself <sup class="c" data-ref="Luca2013" title="Source 299">299</sup>.`],
 [6,`What made the 1948 MRC streptomycin trial a landmark?`,`Random allocation by sealed envelopes and blinded X-ray reading. It also showed resistance emerging on a single drug <sup class="c" data-ref="Crofton2006,MRC1948" title="Source 96,332">96,332</sup>.`],
 [6,`What did the 1959 Madras study show?`,`Treatment at home was as effective as sanatorium treatment <sup class="c" data-ref="TCCMadras1959" title="Source 461">461</sup>.`],
 [6,`When did isoniazid and rifampicin arrive?`,`Isoniazid in 1952; rifampicin entered clinical use in 1968 <sup class="c" data-ref="Murray2015,Sensi1983" title="Source 336,421">336,421</sup>.`],
 [6,`When did WHO declare TB a global emergency?`,`1993 <sup class="c" data-ref="John2013" title="Source 256">256</sup>.`],
 [6,`When did bedaquiline receive its first FDA approval?`,`28 December 2012, for MDR-TB <sup class="c" data-ref="FDA-NDA204384,Cox2014" title="Source 94,162">94,162</sup>.`]
];
const RV_MN=[
 ["RIPE","well known",`The four first-line drugs: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol, given as 2HRZE/4HR (WHO letters: R, H, Z, E) <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 ["R is for red-orange","memory aid",`Rifampin can turn urine, sweat, sputum and tears orange, red or brown and stain soft contact lenses <sup class="c" data-ref="FDA-Rifampin" title="Source 168">168</sup>; it also induces CYP3A4, so other drugs fall <sup class="c" data-ref="Niemi2003" title="Source 353">353</sup>.`],
 ["I for injured nerves, so add B6","memory aid",`Isoniazid can cause peripheral neuropathy through pyridoxine deficiency <sup class="c" data-ref="FDA-Isoniazid" title="Source 160">160</sup>; pyridoxine 25–50 mg/day is listed alongside it <sup class="c" data-ref="Saukkonen2025" title="Source 413">413</sup>.`],
 ["P for painful toe (and liver)","memory aid",`Pyrazinamide inhibits urate excretion and is contraindicated in acute gout <sup class="c" data-ref="FDA-Pyrazinamide" title="Source 166">166</sup>; it caused the most major adverse events of the four <sup class="c" data-ref="Yee2003" title="Source 525">525</sup>.`],
 ["E for eyes","memory aid",`Ethambutol causes optic neuritis; the label asks for acuity and colour testing, monthly above 15 mg/kg/day <sup class="c" data-ref="FDA-Ethambutol,Ezer2013" title="Source 157,159">157,159</sup>.`],
 ["5 · 10 · 15","well known",`TST cut-offs in mm of induration: 5 for contacts, HIV, immunosuppression and TNF blockers; 10 for other risk groups; 15 for no risk factors <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 ["3 with symptoms, 5 without","memory aid",`The ATS stop rule: ALT over 3 times normal with symptoms or jaundice, or over 5 times without <sup class="c" data-ref="Saukkonen2006" title="Source 412">412</sup>.`],
 ["FAST","well known",`Find cases Actively, Separate safely, Treat effectively: prompt, effective treatment at the centre of transmission control <sup class="c" data-ref="Tierney2022" title="Source 471">471</sup>.`],
 ["Three smears, 8 to 24, one at dawn","memory aid",`Ending precautions for suspected TB: three consecutive negative smears, 8–24 hours apart, at least one early-morning <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`],
 ["Rules before rooms before respirators","memory aid",`The hierarchy of controls: administrative first, then environmental, then respiratory protection <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>.`]
];
const RV_STEPS=[
 {from:0,at:.16,k:'R · rifampicin',t:'R: red-orange fluids',txt:`Rifampin can turn teeth, urine, sweat, sputum and tears yellow, orange, red or brown, and can permanently stain soft contact lenses; people should be told in advance <sup class="c" data-ref="FDA-Rifampin" title="Source 168">168</sup>. It strongly induces CYP3A4, so hormonal contraception, methadone and warfarin lose effect <sup class="c" data-ref="Niemi2003,FDA-Rifampin" title="Source 168,353">168,353</sup>.`,pt:'Orange pee and tears are expected and harmless. Tell every doctor and pharmacist you take rifampicin, because it changes how other medicines work.',hook:'Rifampicin is a strong CYP3A4 inducer: the pill fails, methadone withdrawal follows, warfarin levels fall.'},
 {from:.2,at:.36,k:'I · isoniazid',t:'I: injured nerves, so add B6',txt:`Isoniazid can cause pyridoxine deficiency by competing with pyridoxal phosphate, which shows up as peripheral neuropathy <sup class="c" data-ref="FDA-Isoniazid" title="Source 160">160</sup>. Pyridoxine (vitamin B6) 25–50 mg/day is listed with isoniazid <sup class="c" data-ref="Saukkonen2025" title="Source 413">413</sup>. The isoniazid label's hepatitis rate rises with age: 3 per 1,000 at 20–34, 23 per 1,000 at 50–64 <sup class="c" data-ref="FDA-Isoniazid" title="Source 160">160</sup>.`,pt:'Tingling or burning in the hands or feet is a reason to call your TB team. Vitamin B6 helps protect the nerves.',hook:'Isoniazid neuropathy is prevented with pyridoxine (B6).'},
 {from:.4,at:.56,k:'P · pyrazinamide',t:'P: painful toe and liver',txt:`Pyrazinamide inhibits renal urate excretion and often raises uric acid; it is contraindicated in acute gout <sup class="c" data-ref="FDA-Pyrazinamide" title="Source 166">166</sup>. In a Montreal cohort it caused the most major adverse events of the four drugs: 1.48 per 100 person-months, mostly hepatotoxicity and rash <sup class="c" data-ref="Yee2003" title="Source 525">525</sup>.`,pt:'Yellow eyes, dark urine, stomach pain or loss of appetite need a call to the TB team the same day.',hook:'Most hepatotoxic first-line drug: pyrazinamide (1.48 vs 0.49 isoniazid, 0.43 rifampin, 0.07 ethambutol per 100 person-months).'},
 {from:.6,at:.75,k:'E · ethambutol',t:'E: eyes',txt:`Ethambutol causes optic neuritis, usually reversible though irreversible blindness has been reported. The label asks for visual acuity testing before and during treatment, monthly above 15 mg/kg/day, with colour discrimination <sup class="c" data-ref="FDA-Ethambutol" title="Source 159">159</sup>. Any visual impairment occurred in 22.5 per 1,000 people treated, permanent in 4.3 per 1,000 <sup class="c" data-ref="Ezer2013" title="Source 157">157</sup>.`,pt:'Blurry vision or trouble telling red from green is a reason to call your TB team straight away.',hook:'Ethambutol: optic neuritis; check acuity and red-green colour vision.'},
 {from:.8,at:.97,k:'2HRZE/4HR',t:'Together: six months',txt:`The four drugs run together for 2 months, then isoniazid and rifampicin continue for 4 months, daily (WHO, strong recommendation, high certainty) <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>. One drug alone lets rare resistant mutants take over; combining drugs makes double resistance vanishingly rare <sup class="c" data-ref="David1970" title="Source 110">110</sup>.`,pt:'Most people feel better within weeks, but finishing the full course is what cures TB. Treatment is free in most national programmes.',hook:'2HRZE/4HR: 2 months of four drugs, then 4 months of two.'}
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

  /* ---- mnemonic in motion: RIPE, one drug and one warning sign at a time ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const DR=[
    {l:'R',w:'R',n:'Rifampicin',sub:'orange fluids, CYP3A4',c:'--dR'},
    {l:'I',w:'H',n:'Isoniazid',sub:'nerves (B6), liver',c:'--dH'},
    {l:'P',w:'Z',n:'Pyrazinamide',sub:'liver, uric acid',c:'--dZ'},
    {l:'E',w:'E',n:'Ethambutol',sub:'eyes: acuity, colour',c:'--dE'}];
  /* where each drug lands on the body (local body coordinates) */
  const TGT=[[70,196],[56,262],[55,124],[70,30]];
  const ZONE=[[0,.2],[.2,.4],[.4,.6],[.6,.78]];
  /* the body, drawn in a 140 x 330 local box; fx: effect strengths 0..1 */
  function body(fx){
    let s=`<path d="M30 76Q70 62 110 76L106 206Q70 218 34 206Z" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.4"/>`;
    s+=`<path d="M32 82L14 190M108 82L126 190" style="stroke:var(--skin);stroke-width:15;stroke-linecap:round"/><path d="M32 82L14 190M108 82L126 190" style="fill:none;stroke:var(--skin-line);stroke-width:1;opacity:.5"/>`;
    s+=`<rect x="40" y="204" width="22" height="102" rx="10" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.2"/><rect x="78" y="204" width="22" height="102" rx="10" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.2"/>`;
    s+=`<ellipse cx="46" cy="312" rx="17" ry="7" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.2"/><ellipse cx="94" cy="312" rx="17" ry="7" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.2"/>`;
    s+=`<rect x="62" y="54" width="16" height="16" style="fill:var(--skin)"/><circle cx="70" cy="34" r="26" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.4"/>`;
    /* eyes: the irises dim as ethambutol's effect builds */
    [60,80].forEach(x=>{s+=`<ellipse cx="${x}" cy="30" rx="6" ry="4.2" style="fill:var(--panel);stroke:var(--skin-line);stroke-width:.8"/><circle cx="${x}" cy="30" r="2.6" style="fill:var(--ink);opacity:${f1(1-.55*fx.eye)}"/>`;
      if(fx.eye>0)s+=`<circle cx="${x}" cy="30" r="${f1(6+5*fx.eye)}" style="fill:none;stroke:var(${'--dE'});stroke-width:1.6;opacity:${f1(fx.eye)}"/>`});
    /* orange tears from rifampicin */
    if(fx.tear>0)[58,82].forEach((x,k)=>{const d=fx.tear*16;s+=`<path d="M${x} ${f1(36+d)}q-2.4 4 0 5.4q2.4-1.4 0-5.4Z" style="fill:var(--dR);opacity:${f1(Math.min(1,fx.tear*2))}"/>`});
    /* liver: the person's right side, on the viewer's left */
    s+=`<path d="${blob(55,124,17,31,1.35,.72,12,.12)}" style="fill:var(--blood);fill-opacity:${f1(.18+.5*fx.liver)};stroke:var(--vessel);stroke-width:${f1(1+1.6*fx.liver)}"/>`;
    if(fx.liver>.05)s+=`<circle cx="55" cy="124" r="${f1(22+10*fx.liver)}" style="fill:none;stroke:var(--bad);stroke-width:1.5;stroke-dasharray:3 3;opacity:${f1(fx.liver*.9)}"/>`;
    /* bladder fills orange */
    s+=`<ellipse cx="70" cy="196" rx="11" ry="8" style="fill:var(--panel);stroke:var(--skin-line);stroke-width:1"/>`;
    if(fx.urine>0)s+=`<ellipse cx="70" cy="${f1(196+8*(1-fx.urine))}" rx="${f1(11*Math.min(1,.5+fx.urine))}" ry="${f1(8*fx.urine)}" style="fill:var(--dR);opacity:.85"/>`;
    /* nerves in the legs: they fizz with isoniazid, then calm as B6 arrives */
    const nz=fx.nerve*(1-.75*fx.b6);
    [51,89].forEach(x=>{let d=`M${x} 214`;for(let k=1;k<=12;k++){const y=214+k*7.5,j=(k%2?1:-1)*(1+5*nz);d+=`L${f1(x+j)} ${f1(y)}`}
      s+=`<path d="${d}" style="fill:none;stroke:var(${nz>.15?'--dH':'--skin-line'});stroke-width:${f1(1+.8*nz)};opacity:${f1(.35+.65*Math.max(nz,fx.nerve*.4))}"/>`});
    if(fx.b6>0)s+=`<g style="opacity:${f1(fx.b6)}"><circle cx="124" cy="252" r="11" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.4"/><text class="t-xs t-mid" x="124" y="255.5" style="fill:var(--good);font-weight:700">B6</text></g>`;
    /* urate crystals at the big toe */
    if(fx.toe>0){s+=`<circle cx="106" cy="311" r="${f1(5+3*fx.toe)}" style="fill:var(--dZ);opacity:${f1(.35*fx.toe)}"/>`;
      for(let k=0;k<5;k++){const a=k*.7-1.3;s+=`<line x1="106" y1="311" x2="${f1(106+Math.cos(a)*11*fx.toe)}" y2="${f1(311+Math.sin(a)*11*fx.toe)}" style="stroke:var(--dZ);stroke-width:1.6;stroke-linecap:round"/>`}}
    /* a red-green colour plate beside the head: the colours drain as optic neuritis builds */
    if(fx.eye>0){const g=fx.eye,rr=rng(7);let p=`<circle cx="128" cy="34" r="18" style="fill:var(--panel);stroke:var(--line)"/>`;
      for(let k=0;k<26;k++){const a=rr()*Math.PI*2,d=Math.sqrt(rr())*14,inner=d<7;
        p+=`<circle cx="${f1(128+Math.cos(a)*d)}" cy="${f1(34+Math.sin(a)*d)}" r="2.4" style="fill:var(${inner?'--bad':'--good'});opacity:${f1(.95-.6*Math.max(0,g-.4)/.6)}"/>`}
      s+=`<g style="opacity:${f1(Math.min(1,g*2))}">${p}</g>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 630');
    /* layout: drug list, body box (translate + scale), info panel */
    const L=N?{rows:DR.map((d,k)=>[12+(k%2)*196,10+Math.floor(k/2)*58])}:{rows:DR.map((d,k)=>[12,26+k*72])};
    const B=N?{x:124,y:136,s:.98}:{x:286,y:24,s:1};
    const P=N?{x:16,y:472}:{x:466,y:20};
    const act=ZONE.map(([a,b])=>ramp(t,a+.01,a+.07)),fly=ZONE.map(([a,b])=>ease(ramp(t,a+.02,a+.1)));
    const step=phaseOf(RV_STEPS,t),fin=ramp(t,.8,.84);
    const fx={tear:ramp(t,.08,.16),urine:ramp(t,.06,.17),nerve:ramp(t,.28,.33),b6:ramp(t,.32,.38),liver:Math.max(.25*ramp(t,.29,.34),ramp(t,.48,.56)),toe:ramp(t,.5,.58),eye:ramp(t,.68,.77)};
    let s='';
    /* drug rows */
    DR.forEach((d,k)=>{const [x,y]=L.rows[k],on=act[k],hot=step===k;
      s+=`<g style="opacity:${f1(.38+.62*Math.max(on,fin))}"><rect x="${x}" y="${y}" width="${N?184:252}" height="${N?52:62}" rx="10" style="fill:var(${hot?'--panel':'--field'});stroke:var(${hot?d.c:'--line'});stroke-width:${hot?2:1}"/>`;
      s+=pill(x+24,y+(N?26:31),28,`var(${d.c})`,{label:d.w,ang:-20});
      s+=`<text class="t-big" x="${x+48}" y="${y+(N?22:26)}" style="fill:var(${d.c})">${d.l}</text><text class="t-lbl" x="${x+64}" y="${y+(N?22:26)}">${d.n} (${d.w})</text>`;
      s+=`<text class="t-sm" x="${x+48}" y="${y+(N?40:46)}">${d.sub}</text></g>`});
    /* body */
    s+=`<g transform="translate(${B.x} ${B.y}) scale(${B.s})">${body(fx)}</g>`;
    /* flying pills: from each row to its target organ */
    DR.forEach((d,k)=>{const f=fly[k];if(act[k]<=0)return;const [x,y]=L.rows[k],sx=x+24,sy=y+(N?26:31);
      const tx=B.x+TGT[k][0]*B.s+(k===3?-30:12),ty=B.y+TGT[k][1]*B.s+(k===3?-4:0);
      const px=lerp(sx,tx,f),py=lerp(sy,ty,f)-Math.sin(f*Math.PI)*30;
      if(f<1)s+=pill(px,py,lerp(28,16,f),`var(${d.c})`,{ang:lerp(-20,0,f),op:.95});
      else s+=pill(tx,ty,16,`var(${d.c})`,{ang:0,op:.9})});
    /* info panel */
    s+=`<g transform="translate(${P.x} ${P.y})">`;
    const W=N?360:236;
    const head=['Rifampicin: levels of other drugs fall','Isoniazid: neuropathy and hepatitis','Pyrazinamide: uric acid and liver','Ethambutol: optic neuritis','2HRZE / 4HR: one regimen'][step];
    s+=`<text class="t-lbl" x="0" y="12">${head}</text>`;
    if(step===0){const items=['hormonal contraception','methadone','warfarin','some HIV protease inhibitors'];
      s+=`<text class="t-sm" x="0" y="32">induces CYP3A4, so these fall:</text>`;
      items.forEach((it,k)=>{const o=ramp(t,.05+k*.025,.08+k*.025);if(o<=0)return;
        s+=`<g style="opacity:${f1(o)}"><path d="M6 ${44+k*20}v9m-4-4l4 4l4-4" style="fill:none;stroke:var(--bad);stroke-width:1.6;stroke-linecap:round"/><text class="t-sm" x="18" y="${55+k*20}" style="fill:var(--ink)">${it}</text></g>`});
      s+=`<text class="t-sm" x="0" y="140" style="opacity:${f1(fx.tear)}">tears, urine, sweat turn orange</text>`}
    if(step===1){s+=`<text class="t-sm" x="0" y="32">hepatitis per 1,000 (label), by age:</text>`;
      [['20–34',3],['35–49',12],['50–64',23]].forEach(([a,v],k)=>{const o=ramp(t,.22+k*.03,.26+k*.03),w=(W-60)*v/23*o;
        s+=`<text class="t-xs" x="0" y="${54+k*20}">${a}</text><rect x="40" y="${45+k*20}" width="${f1(w)}" height="11" rx="3" style="fill:var(--dH);opacity:.8"/><text class="t-xs" x="${f1(44+w)}" y="${54+k*20}" style="fill:var(--ink)">${o>.5?v:''}</text>`});
      s+=`<text class="t-sm" x="0" y="124" style="opacity:${f1(fx.nerve)}">neuropathy: pyridoxine</text><text class="t-sm" x="0" y="140" style="opacity:${f1(fx.b6)}">B6 25–50 mg/day with H</text>`}
    if(step===2||step===3){const bars=[['Z',1.48,'--dZ'],['H',.49,'--dH'],['R',.43,'--dR'],['E',.07,'--dE']];
      s+=`<text class="t-sm" x="0" y="32">major events per 100 person-months</text>`;
      bars.forEach(([l,v,c],k)=>{const o=step===3?1:ramp(t,.43+k*.025,.48+k*.025),w=(W-56)*v/1.48*o;
        s+=`<text class="t-lbl" x="0" y="${56+k*20}" style="fill:var(${c})">${l}</text><rect x="20" y="${45+k*20}" width="${f1(Math.max(1,w))}" height="12" rx="3" style="fill:var(${c})"/><text class="t-xs" x="${f1(24+w)}" y="${55+k*20}" style="fill:var(--ink)">${o>.6?v.toFixed(2):''}</text>`});
      if(step===2)s+=`<text class="t-sm" x="0" y="140" style="opacity:${f1(fx.toe)}">urate up: avoid in acute gout</text>`;
      else s+=`<text class="t-sm" x="0" y="140" style="opacity:${f1(fx.eye)}">acuity + colour, monthly &gt;15 mg/kg</text>`}
    if(step===4){const m=6*ramp(t,.84,.97),bx=0,bw=W-6,y0=40;
      s+=`<text class="t-sm" x="0" y="30">month ${f1(m)} of 6</text>`;
      ['--dH','--dR','--dZ','--dE'].forEach((c,k)=>{const on=k<2;
        s+=`<rect x="${bx}" y="${y0+k*11}" width="${f1(on?bw:bw/3)}" height="8" rx="2" style="fill:var(${c});opacity:${f1(.3+.7*fin)}"/>`;
        s+=`<text class="t-xs" x="${f1(on?bw+4:bw/3+4)}" y="${y0+7+k*11}">${'HRZE'[k]}</text>`});
      s+=`<line x1="${f1(bw/3)}" x2="${f1(bw/3)}" y1="${y0-6}" y2="${y0+48}" style="stroke:var(--ink);stroke-dasharray:3 2"/>`;
      s+=`<text class="t-xs" x="2" y="${y0+62}">2 months: HRZE</text><text class="t-xs t-end" x="${f1(bw)}" y="${y0+62}">4 months: HR</text>`;
      const cx=bw*m/6;s+=`<path d="M${f1(cx)} ${y0-10}l-5-7h10Z" style="fill:var(--brand)"/><line x1="${f1(cx)}" x2="${f1(cx)}" y1="${y0-4}" y2="${y0+46}" style="stroke:var(--brand);stroke-width:2"/>`;
      s+=`<text class="t-sm" x="0" y="${y0+86}" style="opacity:${f1(ramp(t,.9,.95))}">finish the course: cure</text>`}
    s+='</g>';
    svg.innerHTML=s;
    setSt(step);$('#rvNote').innerHTML=noteHTML(RV_STEPS[step]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const RV_QZ=[
 /* ---- Part 1 ---- */
 [1,`In 2024, about how many people fell ill with TB worldwide?`,[`3.1 million`,`10.7 million`,`25 million`,`1.7 billion`],1,`10.7 million (131 per 100,000), with 1.23 million deaths <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>. 1.7 billion is the estimated number with TB infection <sup class="c" data-ref="Houben2016" title="Source 239">239</sup>.`],
 [1,`Which statement about TB infection (formerly "latent TB") is correct?`,[`It is not contagious`,`It always progresses to disease`,`It is diagnosed by sputum smear`,`It needs isolation`],0,`TB infection is not contagious; disease is defined by macroscopic pathology <sup class="c" data-ref="Drain2018,Coussens2024" title="Source 93,142">93,142</sup>.`],
 [1,`Culturable M. tuberculosis in cough aerosols is carried mostly in particles of:`,[`50–100 µm`,`20–40 µm`,`0.65–4.7 µm`,`Over 100 µm`],2,`96.4% of cultivable particles were 0.65–4.7 µm: respirable, not large droplets <sup class="c" data-ref="Fennelly2012" title="Source 173">173</sup>.`],
 [1,`The usual infecting dose of M. tuberculosis is:`,[`About 10,000 bacilli`,`About 1,000 bacilli`,`About 100 bacilli`,`1–5 bacilli`],3,`Usually 1–5 tubercle bacilli <sup class="c" data-ref="Balasubramanian1994" title="Source 24">24</sup>.`],
 [1,`IGRAs remain specific in people given BCG because ESAT-6 and CFP-10 are encoded in:`,[`RD1, deleted from all BCG strains`,`The katG gene`,`The rpoB gene`,`Plasmids lost in culture`],0,`RD1 is deleted from every BCG substrain, so IGRA antigens are absent from the vaccine <sup class="c" data-ref="Mahairas1996,Harboe1996,Pai2008" title="Source 218,301,366">218,301,366</sup>.`],
 [1,`Mycobacterial phagosomes survive partly because they:`,[`Fuse rapidly with lysosomes`,`Fail to acidify below pH 6.3–6.5`,`Are filled with neutrophil enzymes`,`Never form at all`],1,`They exclude the proton-ATPase and stay above pH 6.3–6.5 <sup class="c" data-ref="SturgillKoszycki1994" title="Source 449">449</sup>.`],
 [1,`Mice lacking interferon-γ, given M. tuberculosis:`,[`Clear the infection faster`,`Cannot form any granulomas`,`Form granulomas but cannot restrict growth`,`Are unaffected`],2,`Granulomas still form, but reactive nitrogen fails, necrosis increases and the mice die quickly <sup class="c" data-ref="Flynn1993,Cooper1993" title="Source 88,179">88,179</sup>.`],
 [1,`A man starting infliximab is screened for TB infection. Why?`,[`Infliximab causes false-positive IGRAs`,`TNF blockade unmasks TB, often extrapulmonary, after few infusions`,`Infliximab is itself a TB drug`,`It is a legal formality only`],1,`In 70 reported cases, 48 followed three or fewer infusions and 40 were extrapulmonary <sup class="c" data-ref="Keane2001" title="Source 266">266</sup>.`],
 [1,`Measured oxygen tension inside a 3 mm rabbit granuloma was about:`,[`1.6 mm Hg`,`40 mm Hg`,`100 mm Hg`,`160 mm Hg`],0,`1.6 ± 0.7 mm Hg: severely hypoxic, which is why metronidazole worked in that model <sup class="c" data-ref="Via2008" title="Source 496">496</sup>.`],
 [1,`Among infected contacts in Amsterdam, the share of TB cases appearing within 2 years was about:`,[`25%`,`50%`,`75%`,`97%`],3,`75% within 1 year and 97% within 2 <sup class="c" data-ref="Behr2018" title="Source 34">34</sup>.`],
 [1,`In national prevalence surveys, the median share of confirmed TB that is subclinical (no symptoms on screening) is about:`,[`5%`,`20%`,`50%`,`90%`],2,`A median 50.4% (range 36.1–79.7%) <sup class="c" data-ref="Frascella2021" title="Source 188">188</sup>.`],
 [1,`Diabetes raises the risk of TB disease by about:`,[`3 times`,`10 times`,`1.1 times`,`It lowers it`],0,`RR 3.11 (95% CI 2.27–4.26) in cohort studies <sup class="c" data-ref="Jeon2008" title="Source 250">250</sup>.`],
 [1,`Which anti-TNF therapy carries the lowest TB risk?`,[`Infliximab`,`Adalimumab`,`Etanercept`,`They are identical`],2,`SIR 1.8 for etanercept versus 18.6 for infliximab and 29.3 for adalimumab <sup class="c" data-ref="Tubach2009" title="Source 475">475</sup>.`],
 [1,`In Kampala, the best predictor of new infection in household contacts was:`,[`Index smear grade alone`,`A high cough-aerosol index case`,`Number of rooms in the house`,`The contact's BCG scar`],1,`High-aerosol index cases were the only predictor (adjusted OR 4.81) <sup class="c" data-ref="JonesLopez2013" title="Source 257">257</sup>.`],
 [1,`Antiretroviral therapy lowers TB incidence in people with HIV with an overall hazard ratio of about:`,[`1.35`,`0.95`,`0.65`,`0.35`],3,`HR 0.35 (95% CI 0.28–0.44), at every CD4 stratum <sup class="c" data-ref="Suthar2012" title="Source 452">452</sup>.`],
 /* ---- Part 2 ---- */
 [2,`The WHO four-symptom screen for people with HIV includes all EXCEPT:`,[`Haemoptysis`,`Night sweats`,`Fever`,`Weight loss`],0,`It is current cough, fever, night sweats or weight loss: sensitivity 78.9%, specificity 49.6% <sup class="c" data-ref="Getahun2011" title="Source 197">197</sup>.`],
 [2,`In community screening, a cough of 2 weeks or more is:`,[`Sensitive but not specific`,`Specific (94%) but insensitive (42%)`,`Both 95%`,`Useless`],1,`Summary sensitivity 42.1% and specificity 94.4% <sup class="c" data-ref="VantHoog2022" title="Source 488">488</sup>. Chest X-ray finds what cough misses <sup class="c" data-ref="Frascella2021" title="Source 188">188</sup>.`],
 [2,`Vignette (exam teaching): a household contact of a person with smear-positive TB has a TST of 7 mm. Under ATS/IDSA/CDC cut-offs this is:`,[`Negative: under 10 mm`,`Negative: under 15 mm`,`Positive: close contacts use 5 mm`,`Uninterpretable`],2,`5 mm or more is positive for close contacts, immunosuppression including HIV, TNF blockers and prior TB on X-ray <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 [2,`Vignette (exam teaching): a hospital nurse with occupational exposure and no other risk factors has a TST of 12 mm. Under ATS/IDSA/CDC cut-offs this is:`,[`Negative: under 15 mm`,`Positive only at 5 mm`,`Uninterpretable`,`Positive: 10 mm applies`],3,`10 mm applies to other people at increased risk, including occupational exposure; 15 mm to people with no risk factors <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 [2,`When reading a TST, the clinician measures:`,[`Induration only`,`Redness only`,`Redness plus induration`,`The bleb on day 0`],0,`Read at 48–72 hours and measure induration, not erythema <sup class="c" data-ref="ATS2000" title="Source 17">17</sup>.`],
 [2,`Vignette (exam teaching): an adult given BCG as an infant 25 years ago has a TST of 14 mm. The best reading is:`,[`It is surely due to BCG`,`Infant BCG rarely affects a TST 10 or more years later`,`BCG always gives over 15 mm`,`TST cannot be done after BCG`],1,`Only 1% had a TST of 10 mm or more from BCG 10 or more years after infant vaccination <sup class="c" data-ref="Farhat2006" title="Source 158">158</sup>; IGRA is preferred after BCG <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 [2,`A QuantiFERON result is positive at a TB antigen response (minus Nil) of at least:`,[`0.10 IU/mL`,`8.0 IU/mL`,`0.35 IU/mL`,`5 spots`],2,`0.35 IU/mL and at least 25% of Nil, with Nil 8.0 IU/mL or less <sup class="c" data-ref="Mazurek2010" title="Source 316">316</sup>.`],
 [2,`For a healthy 3-year-old contact, ATS/IDSA/CDC suggests which test for TB infection?`,[`IGRA only`,`Sputum culture`,`Chest CT`,`TST`],3,`A TST is suggested for healthy children under 5 (conditional, very low-quality evidence) <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 [2,`Vignette (exam teaching): a woman has a positive IGRA. What can be concluded?`,[`She has TB disease`,`She is infectious`,`Her body has met the TB germ; disease must be excluded before treatment decisions`,`She needs isolation`],2,`IGRAs cannot separate infection from disease, and their positive predictive value for progression is under about 3% <sup class="c" data-ref="Lewinsohn2017,Hamada2023" title="Source 217,284">217,284</sup>.`],
 [2,`Most IGRA conversions in serially tested US healthcare workers:`,[`Reverted on retesting`,`Progressed to disease`,`Were from BCG`,`Were missed TSTs`],0,`About 76–77% of converters were negative again 6 months later; retest before acting <sup class="c" data-ref="Dorman2014HCW" title="Source 139">139</sup>.`],
 [2,`Three sputum smears detect about what share of culture-confirmed TB?`,[`10%`,`70%`,`99%`,`40%`],1,`About 70%; the first specimen gives 53.8% <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 [2,`A single Xpert MTB/RIF detected what share of smear-negative, culture-positive TB?`,[`15%`,`45%`,`72.5%`,`100%`],2,`72.5%, and 98.2% of smear-positive TB, in under 2 hours <sup class="c" data-ref="Boehme2010" title="Source 44">44</sup>.`],
 [2,`Compared with Xpert MTB/RIF, Xpert Ultra has:`,[`Higher sensitivity, slightly lower specificity`,`Lower sensitivity, higher specificity`,`Identical accuracy`,`No rifampicin result`],0,`90.9% vs 84.7% sensitivity; 95.6% vs 98.4% specificity <sup class="c" data-ref="Zifodya2021" title="Source 538">538</sup>.`],
 [2,`Why can one PCR target stand in for rifampicin susceptibility testing?`,[`Rifampicin resistance is plasmid-borne`,`It is always caused by katG`,`Rifampicin resistance never occurs`,`Over 95% lies in the rpoB RRDR`],3,`Mutations in one rpoB stretch account for more than 95% of resistant isolates <sup class="c" data-ref="Seifert2015,Telenti1993" title="Source 419,462">419,462</sup>.`],
 [2,`An inhA promoter mutation can cause cross-resistance between isoniazid and:`,[`Rifampicin`,`Ethionamide`,`Bedaquiline`,`Ethambutol`],1,`InhA is a target of both isoniazid and ethionamide <sup class="c" data-ref="Banerjee1994" title="Source 25">25</sup>.`],
 [2,`Rv0678 mutations cause cross-resistance between bedaquiline and:`,[`Linezolid`,`Pretomanid`,`Clofazimine`,`Moxifloxacin`],2,`They upregulate the MmpS5–MmpL5 efflux pump <sup class="c" data-ref="Hartkoorn2014" title="Source 221">221</sup>.`],
 [2,`Urine LF-LAM is most useful in:`,[`Very sick inpatients with HIV and low CD4`,`Healthy contacts`,`Children with BCG scars`,`Screening health workers`],0,`Sensitivity rises as CD4 falls; LAM-guided treatment cut 8-week mortality by 17% (relative) <sup class="c" data-ref="Bjerrum2019,Peter2016" title="Source 42,371">42,371</sup>.`],
 [2,`Liquid culture typically detects growth in:`,[`2 hours`,`3–4 months`,`1 day`,`10–14 days`],3,`10–14 days for liquid, 3–4 weeks for solid culture <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`],
 [2,`The commonest site of extrapulmonary TB in the US series was:`,[`Meninges`,`Lymph nodes`,`Bone`,`Kidney`],1,`Lymphatic 40.4%, pleural 19.8%, bone or joint 11.3% <sup class="c" data-ref="Peto2009" title="Source 372">372</sup>.`],
 [2,`Pre-XDR-TB is rifampicin-resistant TB that is also resistant to:`,[`Isoniazid only`,`Bedaquiline only`,`At least one fluoroquinolone`,`Streptomycin`],2,`Adding bedaquiline or linezolid resistance makes it XDR-TB <sup class="c" data-ref="WHO-Mod4-2025,Viney2021" title="Source 498,515">498,515</sup>.`],
 [2,`In high-burden settings, most MDR-TB is:`,[`Transmitted from person to person`,`Acquired through poor adherence`,`Caused by BCG`,`Caused by poor-quality isoniazid`],0,`A median 95.9% of incident MDR-TB came from transmission in a global model <sup class="c" data-ref="Kendall2015" title="Source 268">268</sup>. Having it does not mean anyone did something wrong.`],
 [2,`Why is TB never treated with a single drug?`,[`Single drugs are too expensive`,`Resistant mutants arise at random and one drug selects them`,`Single drugs are too toxic`,`Labels forbid it`],1,`Mutation rates per generation are 10⁻⁸ to 10⁻¹⁰, so double resistance is vanishingly rare with combinations <sup class="c" data-ref="David1970" title="Source 110">110</sup>.`],
 /* ---- Part 3 ---- */
 [3,`In 2HRZE/4HR, the "4HR" refers to:`,[`4 weeks of high-dose rifampicin`,`4 drugs for 4 months`,`4 months of isoniazid and rifampicin`,`4 doses a week`],2,`Two months of four drugs, then four months of isoniazid and rifampicin, daily <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 [3,`Which drug is responsible for most of the early bactericidal kill in the first 2 days?`,[`Ethambutol`,`Pyrazinamide`,`Streptomycin`,`Isoniazid`],3,`Isoniazid kills about 95% of organisms in the first two days <sup class="c" data-ref="Mitchison2000,Jindani2003" title="Source 253,328">253,328</sup>.`],
 [3,`Isoniazid must be activated by:`,[`KatG (catalase-peroxidase)`,`Pyrazinamidase`,`CYP3A4`,`Gastric acid`],0,`It is a prodrug activated by KatG; its target InhA is in mycolic acid synthesis <sup class="c" data-ref="Zhang1992,Banerjee1994" title="Source 25,535">25,535</sup>.`],
 [3,`Pyrazinamide is most active:`,[`At alkaline pH`,`In acidic conditions against slow-metabolising bacilli`,`Only against growing cultures`,`Only outside cells`],1,`It needs pyrazinamidase (pncA) and acid pH, and acts with rifampicin as a sterilising agent <sup class="c" data-ref="Zhang2003PZA" title="Source 536">536</sup>.`],
 [3,`Vignette (exam teaching): a 30-year-old, 62 kg, HIV-negative, with drug-susceptible pulmonary TB, asks about the 4-month option. Which feature would exclude 2HPMZ/2HPM under WHO criteria?`,[`Age over 18`,`Weight over 40 kg`,`TB meningitis`,`Smear-positive sputum`],2,`Excluded: under 40 kg, under 12 years, CD4 below 100, pregnancy, and meningitis, bone or disseminated TB <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 [3,`SHINE showed that children with non-severe TB can be treated for:`,[`2 months`,`9 months`,`12 months`,`4 months`],3,`16 weeks was non-inferior to 24 weeks: 3% events in both arms <sup class="c" data-ref="Turkova2022" title="Source 477">477</sup>.`],
 [3,`The US labels say rifampin should be taken ___ and rifapentine ___:`,[`On an empty stomach; with food`,`With food; on an empty stomach`,`Both with milk`,`Both at night with antacids`],0,`Food lowers rifampin peaks but raises rifapentine exposure by 40–50% <sup class="c" data-ref="FDA-Rifampin,FDA-Priftin,Peloquin1999" title="Source 165,168,369">165,168,369</sup>.`],
 [3,`Vignette (exam teaching): a woman on rifampicin-based treatment uses a combined oral contraceptive. The key teaching point is:`,[`No interaction exists`,`Rifampicin may make hormonal contraception unreliable; consider another method`,`She must stop TB treatment`,`Double the TB dose`],1,`The rifampin label warns of this; rifampicin induces CYP3A4 <sup class="c" data-ref="FDA-Rifampin,Niemi2003" title="Source 168,353">168,353</sup>.`],
 [3,`Vignette (exam teaching): a man on methadone starts rifampicin. Without adjustment he is likely to experience:`,[`Methadone toxicity`,`No change`,`Opioid withdrawal`,`Hepatitis from methadone`],2,`Rifampicin lowers methadone levels, leading to withdrawal in most patients <sup class="c" data-ref="Niemi2003" title="Source 353">353</sup>.`],
 [3,`Vignette (exam teaching): week 5 of 2HRZE. ALT is 4 times the upper limit of normal and she has nausea and dark urine. Under the ATS statement:`,[`Continue and recheck in 3 months`,`Halve the pyrazinamide`,`Add ethambutol`,`Interrupt treatment`],3,`Interrupt when ALT exceeds 3 times normal with symptoms or jaundice, or 5 times without <sup class="c" data-ref="Saukkonen2006" title="Source 412">412</sup>.`],
 [3,`The first-line drug with the most major adverse events (Montreal cohort) was:`,[`Pyrazinamide`,`Isoniazid`,`Rifampin`,`Ethambutol`],0,`1.48 per 100 person-months, against 0.49 isoniazid, 0.43 rifampin and 0.07 ethambutol <sup class="c" data-ref="Yee2003" title="Source 525">525</sup>.`],
 [3,`Vignette (exam teaching): on treatment, a man reports that red and green look alike. The drug to suspect is:`,[`Isoniazid`,`Ethambutol`,`Pyrazinamide`,`Rifampicin`],1,`Ethambutol causes optic neuritis; the label asks for acuity and colour testing <sup class="c" data-ref="FDA-Ethambutol,Ezer2013" title="Source 157,159">157,159</sup>.`],
 [3,`Vignette (exam teaching): burning feet on isoniazid. The preventive measure the regimen tables list is:`,[`Vitamin K`,`Vitamin D`,`Pyridoxine (B6)`,`Allopurinol`],2,`Isoniazid causes pyridoxine deficiency; B6 25–50 mg/day is listed with it <sup class="c" data-ref="FDA-Isoniazid,Saukkonen2025" title="Source 160,413">160,413</sup>.`],
 [3,`Pyrazinamide is contraindicated in:`,[`Contact lens wearers`,`Hypertension`,`Asthma`,`Acute gout`],3,`It inhibits urate excretion and often causes hyperuricaemia <sup class="c" data-ref="FDA-Pyrazinamide" title="Source 166">166</sup>.`],
 [3,`3HP for TB infection consists of:`,[`12 weekly doses of rifapentine plus isoniazid`,`3 months of daily rifampicin`,`3 weeks of isoniazid`,`3 drugs for 6 months`],0,`In PREVENT TB completion was 82.1% vs 69.0% for 9H, with less hepatotoxicity <sup class="c" data-ref="Sterling2011" title="Source 443">443</sup>; flu-like reactions in 3.5% <sup class="c" data-ref="Sterling2015" title="Source 444">444</sup>.`],
 [3,`Compared with 9 months of isoniazid, 4 months of rifampin (4R):`,[`Was inferior`,`Was non-inferior, with better completion and less hepatotoxicity`,`Caused more liver injury`,`Was only tested in children`],1,`Completion 15.1 points higher; grade 3–5 hepatotoxicity 1.2 points lower <sup class="c" data-ref="Menzies2018" title="Source 321">321</sup>.`],
 [3,`Vignette (exam teaching): a household contact of a person with MDR-TB has TB infection and no disease. WHO 2024 recommends:`,[`3HP`,`4R`,`6 months of levofloxacin`,`No treatment`],2,`Strong recommendation, moderate certainty <sup class="c" data-ref="WHO-Mod1-2024" title="Source 512">512</sup>.`],
 [3,`The BPaLM regimen consists of bedaquiline, pretomanid, linezolid and:`,[`Clofazimine`,`Amikacin`,`Delamanid`,`Moxifloxacin`],3,`For 6 months, from age 14 <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 [3,`In TB-PRACTECAL, unfavourable outcomes at 72 weeks were:`,[`11% BPaLM vs 48% standard care`,`48% vs 11%`,`Equal at 30%`,`2% vs 5%`],0,`Grade 3 or higher or serious adverse events were 19% vs 59% <sup class="c" data-ref="Nyangwa2022" title="Source 358">358</sup>.`],
 [3,`The three classic linezolid toxicities are:`,[`QT, hearing loss, rash`,`Peripheral neuropathy, optic neuropathy, myelosuppression`,`Gout, hepatitis, orange urine`,`Tendon rupture, hypoglycaemia, seizures`],1,`ZeNix found 600 mg for 26 weeks kept efficacy and cut myelosuppression to 2% <sup class="c" data-ref="Conradie2022,FDA-Pretomanid" title="Source 86,164">86,164</sup>.`],
 [3,`Before starting bedaquiline, the label calls for:`,[`An audiogram`,`A visual field test`,`An ECG`,`A lumbar puncture`],2,`Its boxed warning is QTc prolongation <sup class="c" data-ref="FDA-Sirturo" title="Source 169">169</sup>.`],
 [3,`Aminoglycoside injectables were abandoned in DR-TB regimens mainly because of:`,[`Cost`,`Weekly dosing`,`Orange urine`,`Hearing loss in about 40%`],3,`Pooled prevalence 40.62% <sup class="c" data-ref="Dillard2021" title="Source 127">127</sup>; kanamycin and capreomycin are no longer used <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 [3,`Vignette (exam teaching): a man with HIV (CD4 40) starts TB treatment for pulmonary TB. WHO recommends ART:`,[`As soon as possible within 2 weeks`,`After TB treatment ends`,`After 8 weeks`,`Only if CD4 falls below 20`],0,`Strong recommendation <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>; in CAMELIA ART at 2 weeks cut deaths from 27% to 18% <sup class="c" data-ref="Blanc2011" title="Source 43">43</sup>.`],
 [3,`The exception to early ART in people with HIV and TB is:`,[`Pleural TB`,`TB meningitis`,`Lymph-node TB`,`Smear-negative TB`],1,`Immediate ART did not lower 9-month mortality in TB meningitis and caused more grade 4 events <sup class="c" data-ref="Torok2011" title="Source 472">472</sup>; WHO allows a 4–8-week delay <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`],
 [3,`Starting ART early raises the risk of TB-IRIS. Prophylactic prednisone (PredART) reduced it by about:`,[`90%`,`5%`,`30%`,`It increased it`],2,`46.7% to 32.5% (RR 0.70) <sup class="c" data-ref="Meintjes2018" title="Source 319">319</sup>.`],
 [3,`With rifampicin, dolutegravir is given:`,[`Once weekly`,`Unchanged`,`Not at all`,`Twice daily`],3,`The label adjusts dosing to twice daily with rifampin <sup class="c" data-ref="FDA-Tivicay,Dooley2013" title="Source 134,170">134,170</sup>.`],
 [3,`Adjuvant steroids in TB meningitis:`,[`Cut deaths by almost a quarter`,`Raise mortality`,`Have no effect`,`Are only for children`],0,`RR 0.75 (95% CI 0.65–0.87) <sup class="c" data-ref="Prasad2016" title="Source 378">378</sup>.`],
 [3,`WHO's regimen for Hr-TB (isoniazid-resistant, rifampicin-susceptible) is 6 months of:`,[`BPaLM`,`Rifampicin, ethambutol, pyrazinamide and levofloxacin`,`Isoniazid alone`,`Streptomycin and PAS`],1,`Adding a fluoroquinolone was associated with greater success <sup class="c" data-ref="WHO-Mod4-2025,Fregonese2018" title="Source 189,515">189,515</sup>.`],
 [3,`The 6-month regimen that WHO 2025 also covers for children and pregnancy is:`,[`BPaLM`,`BPaL`,`BDLLfxC`,`2HPMZ/2HPM`],2,`From BEAT Tuberculosis; BPaLM is not recommended in pregnancy or breastfeeding <sup class="c" data-ref="Conradie2026,WHO-Mod4-2025" title="Source 87,515">87,515</sup>.`],
 [3,`TB risk is highest in which period around pregnancy?`,[`First trimester`,`Second trimester`,`It is unchanged`,`Postpartum`],3,`Postpartum IRR about 1.9–2 <sup class="c" data-ref="Zenner2012,Jonsson2020" title="Source 258,532">258,532</sup>.`],
 [1,`Without treatment, about what share of people with smear-positive TB were dead at 10 years?`,[`70%`,`20%`,`5%`,`95%`],0,`About 70%; about 20% for smear-negative TB <sup class="c" data-ref="Tiemersma2011" title="Source 470">470</sup>. These are pre-chemotherapy population figures.`],
 /* ---- Part 4 ---- */
 [4,`BCG's most consistent benefit is against:`,[`Adult pulmonary TB everywhere`,`TB meningitis and miliary TB in young children`,`TB infection in adults`,`Drug-resistant TB`],1,`About one meningitis case prevented per 3,435 infant vaccinations <sup class="c" data-ref="Trunz2006,Mangtani2014" title="Source 302,474">302,474</sup>.`],
 [4,`BCG efficacy is greater:`,[`Near the equator`,`In people already sensitised to mycobacteria`,`At higher latitudes and in people not previously sensitised`,`With one particular strain`],2,`Latitude and prior sensitisation explain most variation; strain was not associated with efficacy <sup class="c" data-ref="Mangtani2014,Colditz1994" title="Source 79,302">79,302</sup>.`],
 [4,`Among exposed children, BCG reduced progression from infection to disease by about:`,[`5%`,`20%`,`100%`,`58%`],3,`RR 0.42; it also cut infection (IGRA) by 19–27% <sup class="c" data-ref="Roy2014" title="Source 403">403</sup>.`],
 [4,`BCG is a risk in infants with HIV mainly because of:`,[`Disseminated BCG disease`,`Hepatitis`,`QT prolongation`,`Rash`],0,`A pooled 992 per 100,000 vaccinated infants with HIV <sup class="c" data-ref="Hesseling2009BWHO" title="Source 230">230</sup>.`],
 [4,`The M72/AS01E phase 2b efficacy against pulmonary TB in IGRA-positive adults was:`,[`99%`,`49.7%`,`10%`,`Negative`],1,`49.7% over 3 years; a phase 3 trial began in 2024 <sup class="c" data-ref="Tait2019,NCT06062238" title="Source 346,456">346,456</sup>.`],
 [4,`In the hierarchy of TB infection control, the first and most important level is:`,[`Respirators`,`UV lights`,`Administrative controls`,`HEPA filters`],2,`Administrative, then environmental, then respiratory protection <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>.`],
 [4,`An airborne infection isolation room built since 2001 needs at least:`,[`2 air changes per hour`,`6 air changes per hour`,`50 air changes per hour`,`12 air changes per hour`],3,`With negative pressure of at least 0.01 inch water gauge <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`],
 [4,`Who wears a surgical mask and who wears an N95 respirator?`,[`The person with TB wears the surgical mask; health workers wear fit-tested N95s`,`Both wear surgical masks`,`Only visitors wear N95s`,`Neither helps`],0,`Patient masks cut MDR-TB transmission to guinea pigs by 56% <sup class="c" data-ref="Dharmadhikari2012,Jensen2005" title="Source 119,249">119,249</sup>.`],
 [4,`What most quickly ends a person's infectiousness?`,[`A negative smear`,`Effective treatment against their strain`,`Isolation alone`,`BCG`],1,`Minimal transmission from people on effective MDR-TB therapy; high transmission from unsuspected XDR-TB <sup class="c" data-ref="Dharmadhikari2014" title="Source 120">120</sup>.`],
 [4,`Vignette (exam teaching): a man is admitted with suspected TB. Under CDC 2005, airborne precautions can stop when TB is unlikely and he has:`,[`One negative smear`,`A negative chest X-ray`,`Three consecutive negative smears, 8–24 hours apart, one early-morning`,`A negative IGRA`],2,`Three consecutive negative smears with at least one early-morning specimen <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`],
 [4,`Vignette (exam teaching): a 3-year-old lives with her grandfather, newly diagnosed with smear-positive TB. Her first TST is negative and TB disease has been excluded. NTCA/CDC guidance is:`,[`Nothing until symptoms appear`,`BCG revaccination`,`Isolation of the child`,`Window prophylaxis, then a retest at 8–10 weeks`],3,`Children under 5 are high-priority contacts <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>; untreated infected under-5s had a 19.0% 2-year TB risk <sup class="c" data-ref="Martinez2020Lancet" title="Source 311">311</sup>.`],
 [4,`The infectious period used for contact tracing usually starts:`,[`3 months before diagnosis`,`On the day of diagnosis`,`2 years before diagnosis`,`At birth`],0,`Earlier if the illness was long; first contact assessment within 3 working days <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>.`],
 [4,`About what share of contacts in high-burden settings have TB disease?`,[`30%`,`3%`,`0.01%`,`50%`],1,`3.1% TB disease and about half with TB infection <sup class="c" data-ref="Fox2013" title="Source 185">185</sup>.`],
 [4,`The End TB Strategy targets for 2035, against 2015, are:`,[`50% fewer cases and 75% fewer deaths`,`Elimination`,`90% lower incidence, 95% fewer deaths, no catastrophic costs`,`10% fewer deaths`],2,`By 2024, incidence was down 12.3% and deaths 29% <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`],
 [4,`In RATIONS, food rations for household contacts cut TB incidence by about:`,[`5%`,`90%`,`0%`,`39–48%`],3,`Adjusted IRR 0.61 for all forms <sup class="c" data-ref="Bhargava2023Lancet" title="Source 39">39</sup>.`],
 [4,`ACT3 in Viet Nam (community-wide Xpert screening) cut pulmonary TB prevalence by:`,[`44%`,`4%`,`90%`,`It rose`],0,`Prevalence ratio 0.56 <sup class="c" data-ref="Marks2019" title="Source 309">309</sup>.`],
 /* ---- Part 5 ---- */
 [5,`Which wording follows person-first TB language?`,[`TB suspect`,`Person with presumptive TB`,`Defaulter`,`TB victim`],1,`Also "person lost to follow-up" for "defaulter" <sup class="c" data-ref="Zachariah2012" title="Source 530">530</sup>.`],
 [5,`About what share of TB-affected households face catastrophic costs in WHO surveys?`,[`1%`,`10%`,`47%`,`99%`],2,`82% for drug-resistant TB, even where treatment is free <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`],
 [5,`In a Cochrane review, direct observation compared with self-administered treatment:`,[`Doubled cure`,`Halved deaths`,`Was harmful`,`Did not substantially improve cure`],3,`RR 1.08 (95% CI 0.91–1.27) <sup class="c" data-ref="Karumbi2015" title="Source 261">261</sup>.`],
 [5,`In London, smartphone video-observed treatment compared with DOT:`,[`Doubled the share completing most observations (70% vs 31%)`,`Was worse`,`Was identical`,`Was not tested`],0,`Adjusted OR 5.48 <sup class="c" data-ref="Story2019" title="Source 446">446</sup>.`],
 [5,`Pooled depression prevalence among people with TB is about:`,[`5%`,`45%`,`90%`,`15%`],1,`Over half in MDR-TB <sup class="c" data-ref="Duko2020" title="Source 143">143</sup>; depressive symptoms are linked to loss to follow-up <sup class="c" data-ref="RuizGrosso2020" title="Source 406">406</sup>.`],
 [5,`Simple instructions on how to cough up sputum mainly raised smear positivity in:`,[`Men`,`Children`,`Women`,`No one`],2,`RR 1.63 in women; men's results did not change <sup class="c" data-ref="Khan2007Lancet" title="Source 271">271</sup>.`],
 [5,`During sputum induction the health worker wears at least:`,[`A surgical mask`,`A cloth mask`,`Nothing if windows are open`,`An N95 respirator`],3,`In a ventilated booth or AII room <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`],
 [5,`TB survivors' all-cause mortality compared with the general population is about:`,[`3 times higher`,`The same`,`Half`,`30 times higher`],0,`SMR 2.91 <sup class="c" data-ref="Romanowski2019" title="Source 402">402</sup>.`],
 /* ---- Part 6 ---- */
 [6,`World TB Day (24 March) marks:`,[`The first BCG dose`,`Koch's 1882 announcement of the tubercle bacillus`,`The 1948 streptomycin trial`,`WHO's 1993 emergency declaration`],1,`Koch presented it in Berlin on 24 March 1882 <sup class="c" data-ref="Barberis2017,CDC2018WTBD" title="Source 26,66">26,66</sup>.`],
 [6,`The 1948 MRC streptomycin trial is remembered for:`,[`Using no controls`,`Proving BCG works`,`Random allocation and blinded X-ray reading`,`Testing isoniazid`],2,`It also showed resistance on a single drug <sup class="c" data-ref="Crofton2006,MRC1948" title="Source 96,332">96,332</sup>.`],
 [6,`The 1959 Madras study showed that:`,[`Sanatoria were essential`,`Isoniazid was toxic`,`BCG failed`,`Home treatment was as effective as sanatorium treatment`],3,`India then had about 2.5 million people with active TB and 23,000 TB beds <sup class="c" data-ref="TCCMadras1959" title="Source 461">461</sup>.`],
 [6,`BCG was first given to a baby in:`,[`1921`,`1882`,`1952`,`1968`],0,`In Paris, by mouth, on 18 July 1921 <sup class="c" data-ref="Luca2013" title="Source 299">299</sup>.`],
 [6,`Rifampicin entered clinical use in:`,[`1944`,`1968`,`1993`,`2012`],1,`From a Dow-Lepetit programme in Milan <sup class="c" data-ref="Sensi1983" title="Source 421">421</sup>.`],
 [6,`Who first showed that TB is transmissible?`,[`Koch`,`Pirquet`,`Villemin`,`Waksman`],2,`Jean-Antoine Villemin, in 1865 <sup class="c" data-ref="Daniel2006,Cambau2014" title="Source 60,103">60,103</sup>.`]
];
inits.quiz=()=>{
  const F=[['mix','Mixed (20)'],...Object.keys(RV_PARTN).map(k=>[k,'Part '+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=RV_QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
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
const RV_GL=[
 ["2HRZE/4HR",`Shorthand for the standard 6-month regimen: 2 months of isoniazid (H), rifampicin (R), pyrazinamide (Z) and ethambutol (E), then 4 months of H and R <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"regimen"],
 ["2HPMZ/2HPM",`The 4-month regimen of isoniazid, rifapentine (P), moxifloxacin (M) and pyrazinamide for people aged 12 or over with drug-susceptible pulmonary TB <sup class="c" data-ref="WHO-Mod4-2025,Dorman2021" title="Source 141,515">141,515</sup>.`,"regimen"],
 ["1HP",`One month of daily rifapentine plus isoniazid for TB infection; non-inferior to 9H in BRIEF TB <sup class="c" data-ref="Swindells2019,WHO-Mod1-2024" title="Source 454,512">454,512</sup>.`,"tpt"],
 ["3HP",`Twelve weekly doses of rifapentine plus isoniazid for TB infection <sup class="c" data-ref="Sterling2011,Sterling2020" title="Source 443,445">443,445</sup>.`,"tpt"],
 ["3HR",`Three months of daily isoniazid plus rifampicin for TB infection <sup class="c" data-ref="WHO-Mod1-2024" title="Source 512">512</sup>.`,"tpt"],
 ["4R",`Four months of daily rifampicin for TB infection: 120 doses, non-inferior to 9H <sup class="c" data-ref="Menzies2018,Sterling2020" title="Source 321,445">321,445</sup>.`,"tpt"],
 ["5-10-15 mm rule",`The TST cut-offs for induration by risk group <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`,"tests"],
 ["Acid-fast bacilli (AFB)",`Bacteria that show up on the acid-fast stain because of their waxy mycolic acid wall <sup class="c" data-ref="Brennan2003,Hobby1973" title="Source 48,235">48,235</sup>; smear microscopy counts them <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`,"bacillus"],
 ["Active case finding",`Screening people who have not sought care. Community-wide Xpert screening in ACT3 cut pulmonary TB prevalence by 44% <sup class="c" data-ref="Marks2019" title="Source 309">309</sup>.`,"frontier"],
 ["Adherence support",`Education, counselling, material, psychological and digital support to help people finish treatment <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"living"],
 ["Adenosine deaminase (ADA)",`A pleural-fluid marker of TB pleurisy: pooled sensitivity 0.92 and specificity 0.90 <sup class="c" data-ref="Liang2008" title="Source 286">286</sup>.`,"symptoms"],
 ["Administrative controls",`The first and most important level of TB infection control: triage, separation and prompt treatment <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>.`,"control"],
 ["Air changes per hour (ACH)",`How many times a room's air volume is replaced each hour: exhaust airflow divided by room volume, times 60 <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`,"control"],
 ["Airborne infection isolation (AII) room",`A single room under negative pressure, at least 0.01 inch water gauge, with at least 12 ACH <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`,"control"],
 ["Alveolar macrophage",`The lung's resident phagocyte and the first cell infected <sup class="c" data-ref="Cohen2018" title="Source 77">77</sup>.`,"granuloma"],
 ["Aminoglycoside",`Injectable drugs such as kanamycin and amikacin; they caused hearing loss in about 40% of people treated for DR-TB <sup class="c" data-ref="Dillard2021" title="Source 127">127</sup>.`,"drtb"],
 ["Antigen-based skin test (TBST)",`A skin test using ESAT-6 and CFP-10 instead of PPD, so BCG does not affect it <sup class="c" data-ref="Krutikov2022,WHO-Mod3-2022TBI" title="Source 276,513">276,513</sup>.`,"tests"],
 ["Arabinogalactan",`The sugar layer of the cell wall linking peptidoglycan to mycolic acids; ethambutol blocks arabinan synthesis <sup class="c" data-ref="Brennan2003,Telenti1997" title="Source 48,463">48,463</sup>.`,"bacillus"],
 ["ART (antiretroviral therapy)",`HIV treatment. It lowers TB incidence (HR 0.35) and should start within 2 weeks of TB treatment <sup class="c" data-ref="Suthar2012,WHO-Mod4-2025" title="Source 452,515">452,515</sup>.`,"special"],
 ["BCG (bacille Calmette-Guérin)",`A live attenuated M. bovis vaccine, first given in 1921, still the only licensed TB vaccine <sup class="c" data-ref="Lange2022,Luca2013" title="Source 278,299">278,299</sup>.`,"bcg"],
 ["BCG revaccination",`A second BCG dose. The 2025 phase 2b trial in adolescents showed no protection against sustained infection <sup class="c" data-ref="Schmidt2025" title="Source 415">415</sup>.`,"bcg"],
 ["BDLLfxC",`A 6-month regimen of bedaquiline, delamanid, linezolid, levofloxacin and clofazimine for MDR/RR-TB, covering children and pregnancy <sup class="c" data-ref="WHO-Mod4-2025,Conradie2026" title="Source 87,515">87,515</sup>.`,"drtb"],
 ["Bedaquiline",`A diarylquinoline that inhibits mycobacterial ATP synthase; boxed warning for QTc prolongation <sup class="c" data-ref="Andries2005,FDA-Sirturo" title="Source 14,169">14,169</sup>.`,"drugs"],
 ["BPaL",`Bedaquiline, pretomanid and linezolid for 6 months, used when fluoroquinolone resistance is documented <sup class="c" data-ref="WHO-Mod4-2025,Conradie2020" title="Source 85,515">85,515</sup>.`,"drtb"],
 ["BPaLM",`BPaL plus moxifloxacin, the 6-month regimen for MDR/RR-TB from age 14 <sup class="c" data-ref="WHO-Mod4-2025,Nyangwa2022" title="Source 358,515">358,515</sup>.`,"drtb"],
 ["Bronchiectasis",`Damaged, widened airways: one form of post-TB lung disease <sup class="c" data-ref="Allwood2021" title="Source 9">9</sup>.`,"living"],
 ["CAD (computer-aided detection)",`Software that scores a chest X-ray for TB; some products meet WHO triage targets <sup class="c" data-ref="Qin2021" title="Source 382">382</sup>.`,"diagnose"],
 ["Caseous necrosis",`The soft, cheese-like dead centre of a granuloma, where drugs and oxygen reach poorly <sup class="c" data-ref="Via2008,Sarathy2018" title="Source 411,496">411,496</sup>.`,"granuloma"],
 ["Catastrophic costs",`TB costs above 20% of annual household income or expenditure; faced by about half of TB-affected households <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`,"living"],
 ["Cavity",`A hole left when a granuloma empties into an airway. Cavities hold huge numbers of bacilli and drive transmission <sup class="c" data-ref="Kaplan2003,Urbanowski2020" title="Source 260,479">260,479</sup>.`,"granuloma"],
 ["CFP-10",`A secreted M. tuberculosis protein encoded in RD1, used with ESAT-6 in IGRAs <sup class="c" data-ref="Hsu2003,Andersen2000" title="Source 12,240">12,240</sup>.`,"bacillus"],
 ["Clofazimine",`A WHO Group B drug for DR-TB; Rv0678 mutations cause cross-resistance with bedaquiline <sup class="c" data-ref="WHO-Mod4-2025,Hartkoorn2014" title="Source 221,515">221,515</sup>.`,"drtb"],
 ["Close contact",`A person who shared air with someone with infectious TB, for example in the same household <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>.`,"control"],
 ["Contact investigation",`Finding, assessing and testing people exposed to someone with TB; it raised case notification (RR 2.5) and cut mortality (RR 0.6) <sup class="c" data-ref="Velen2021" title="Source 492">492</sup>.`,"control"],
 ["Culture conversion",`When sputum cultures turn negative on treatment. A positive culture at 2 months predicts relapse poorly (sensitivity 40%) <sup class="c" data-ref="Horne2010" title="Source 236">236</sup>.`,"regimen"],
 ["CYP3A4 induction",`Rifampicin's speeding-up of drug metabolism, which lowers levels of many other drugs <sup class="c" data-ref="Niemi2003" title="Source 353">353</sup>.`,"drugs"],
 ["Delamanid",`A nitroimidazole prodrug that inhibits mycolic acid synthesis <sup class="c" data-ref="Matsumoto2006" title="Source 313">313</sup>.`,"drugs"],
 ["Digital adherence technology (DAT)",`Phone-based tools, digital pillboxes or ingestible sensors that record doses <sup class="c" data-ref="Subbaraman2018" title="Source 450">450</sup>. Pillboxes did not improve outcomes in ASCENT <sup class="c" data-ref="Jerene2025" title="Source 251">251</sup>.`,"living"],
 ["Directly observed therapy (DOT)",`A health worker or supporter watches each dose, in person or by video. It is support, not suspicion <sup class="c" data-ref="Karumbi2015,Story2019" title="Source 261,446">261,446</sup>.`,"nursing"],
 ["Disseminated BCG disease",`Spread of the live vaccine through the body, mainly in infants with HIV or other immunodeficiency <sup class="c" data-ref="Hesseling2009BWHO" title="Source 230">230</sup>.`,"bcg"],
 ["Droplet nucleus",`The tiny dried residue of a respiratory droplet that floats in air and carries bacilli <sup class="c" data-ref="Wells1948,Fennelly2020" title="Source 174,509">174,509</sup>.`,"spread"],
 ["Drug-induced liver injury (DILI)",`Liver damage from TB drugs; reported in 2–28% of people treated <sup class="c" data-ref="Tostmann2008" title="Source 473">473</sup>.`,"safety"],
 ["Drug-susceptibility testing (DST)",`Testing which drugs work against a person's strain, by molecular or phenotypic methods <sup class="c" data-ref="WHO-Mod3-2024,Lewinsohn2017" title="Source 284,514">284,514</sup>.`,"resistance"],
 ["Early bactericidal activity",`The rapid early kill of growing bacilli, driven mainly by isoniazid <sup class="c" data-ref="Jindani2003,Mitchison2000" title="Source 253,328">253,328</sup>.`,"drugs"],
 ["End TB Strategy",`WHO's 2014 strategy: by 2035, 90% lower incidence and 95% fewer deaths than 2015, and no catastrophic costs <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`,"frontier"],
 ["Environmental controls",`Ventilation, upper-room UV and filtration: the second level of the hierarchy <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>.`,"control"],
 ["ESAT-6",`A 6 kDa secreted protein of virulent mycobacteria, absent from BCG <sup class="c" data-ref="Harboe1996" title="Source 218">218</sup>.`,"bacillus"],
 ["ESX-1",`A type VII secretion system that exports ESAT-6 and CFP-10 and lets the bacillus breach its phagosome <sup class="c" data-ref="Groschel2016,vanderWel2007" title="Source 206,481">206,481</sup>.`,"bacillus"],
 ["Ethambutol (E)",`A first-line drug that blocks arabinan synthesis; it can cause optic neuritis <sup class="c" data-ref="Telenti1997,FDA-Ethambutol" title="Source 159,463">159,463</sup>.`,"drugs"],
 ["Extensively drug-resistant TB (XDR-TB)",`Rifampicin-resistant TB also resistant to a fluoroquinolone and to bedaquiline or linezolid (2021 definition) <sup class="c" data-ref="WHO-Mod4-2025,Viney2021" title="Source 498,515">498,515</sup>.`,"resistance"],
 ["Extrapulmonary TB",`TB outside the lungs; 16% of notified TB in 2024 <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>, most often in lymph nodes <sup class="c" data-ref="Peto2009" title="Source 372">372</sup>.`,"symptoms"],
 ["FAST",`Find cases Actively, Separate safely, Treat effectively <sup class="c" data-ref="Tierney2022" title="Source 471">471</sup>.`,"control"],
 ["Fit testing",`Checking that a respirator model and size seals on the wearer's face <sup class="c" data-ref="Jensen2005,WHO-IPC2019" title="Source 249,511">249,511</sup>.`,"control"],
 ["Fixed-dose combination (FDC)",`Several TB drugs in one tablet; WHO recommends FDCs over separate drugs (conditional) <sup class="c" data-ref="WHO-Mod4-2025,Lienhardt2011" title="Source 287,515">287,515</sup>.`,"regimen"],
 ["Fluoroquinolone",`Levofloxacin or moxifloxacin; WHO Group A drugs. Resistance arises in gyrA <sup class="c" data-ref="WHO-Mod4-2025,Takiff1994" title="Source 457,515">457,515</sup>.`,"resistance"],
 ["Foamy macrophage",`A lipid-laden macrophage in granulomas that shelters dormant bacilli and feeds cavitation <sup class="c" data-ref="Russell2009,Peyron2008" title="Source 373,408">373,408</sup>.`,"granuloma"],
 ["Four-symptom screen",`Cough, fever, night sweats or weight loss: WHO's screen for TB in people with HIV <sup class="c" data-ref="Getahun2011" title="Source 197">197</sup>.`,"symptoms"],
 ["Gastric aspirate",`A stomach sample used to find TB in children who cannot cough up sputum <sup class="c" data-ref="Lewinsohn2017,Kay2025" title="Source 264,284">264,284</sup>.`,"diagnose"],
 ["Granuloma",`An organised ball of macrophages and lymphocytes around bacilli. It contains infection but can also shelter it <sup class="c" data-ref="Ramakrishnan2012,Pagan2018" title="Source 364,386">364,386</sup>.`,"granuloma"],
 ["Group A drugs",`WHO's most important DR-TB medicines: levofloxacin or moxifloxacin, bedaquiline and linezolid <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"drtb"],
 ["H37Rv",`The M. tuberculosis strain whose genome (4,411,529 bp, about 4,000 genes) was published in 1998 <sup class="c" data-ref="Cole1998" title="Source 81">81</sup>.`,"bacillus"],
 ["Hepatotoxicity",`Liver injury. ATS advises interrupting treatment at ALT over 3 times normal with symptoms, or over 5 times without <sup class="c" data-ref="Saukkonen2006" title="Source 412">412</sup>.`,"safety"],
 ["Hierarchy of controls",`Administrative, then environmental, then respiratory protection <sup class="c" data-ref="WHO-IPC2019,Jensen2005" title="Source 249,511">249,511</sup>.`,"control"],
 ["Hr-TB",`Isoniazid-resistant, rifampicin-susceptible TB <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"drtb"],
 ["Hyperuricaemia",`Raised uric acid; pyrazinamide causes it by blocking urate excretion <sup class="c" data-ref="FDA-Pyrazinamide" title="Source 166">166</sup>.`,"safety"],
 ["IGRA (interferon-γ release assay)",`A blood test for TB infection measuring interferon-γ released in response to ESAT-6 and CFP-10 <sup class="c" data-ref="Mazurek2010,Pai2008" title="Source 316,366">316,366</sup>.`,"tests"],
 ["Incipient TB",`A proposed state between infection and disease, with bacterial activity but no disease yet <sup class="c" data-ref="Drain2018" title="Source 142">142</sup>.`,"spectrum"],
 ["Indeterminate IGRA",`A result that cannot be read, for example when the Nil or mitogen control fails <sup class="c" data-ref="Mazurek2010" title="Source 316">316</sup>.`,"tests"],
 ["Induration",`The firm, raised area of a TST reaction; the only part measured <sup class="c" data-ref="ATS2000" title="Source 17">17</sup>.`,"tests"],
 ["Infection control (IPC)",`Measures that stop TB spreading in health care and other settings, worked as a package <sup class="c" data-ref="WHO-IPC2019" title="Source 511">511</sup>.`,"control"],
 ["Infectious period",`The time someone may have spread TB; usually taken to start 3 months before diagnosis <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>.`,"control"],
 ["inhA",`The gene for a mycolic acid enzyme targeted by isoniazid and ethionamide <sup class="c" data-ref="Banerjee1994" title="Source 25">25</sup>.`,"resistance"],
 ["Interferon-γ",`A T-cell cytokine that activates macrophages; essential for containing TB <sup class="c" data-ref="Flynn1993" title="Source 179">179</sup>.`,"granuloma"],
 ["IRIS (immune reconstitution inflammatory syndrome)",`Worsening inflammation after starting ART; paradoxical TB-IRIS affects about 18% <sup class="c" data-ref="Namale2015" title="Source 339">339</sup>.`,"special"],
 ["Isoniazid (H)",`A first-line prodrug activated by KatG, the main early killer <sup class="c" data-ref="Zhang1992,Mitchison2000" title="Source 328,535">328,535</sup>.`,"drugs"],
 ["katG",`The gene for the catalase-peroxidase that activates isoniazid; katG315 is the commonest resistance mutation <sup class="c" data-ref="Zhang1992,Seifert2015" title="Source 419,535">419,535</sup>.`,"resistance"],
 ["LAM (lipoarabinomannan)",`A mycobacterial cell-wall glycolipid detected in urine by the LF-LAM test <sup class="c" data-ref="Bjerrum2019" title="Source 42">42</sup>.`,"diagnose"],
 ["Levofloxacin",`A fluoroquinolone; 6 months is WHO's preventive treatment for contacts of people with MDR/RR-TB <sup class="c" data-ref="WHO-Mod1-2024" title="Source 512">512</sup>.`,"tpt"],
 ["Line probe assay",`A strip test that reads resistance mutations: 96.7% sensitive for rifampicin resistance <sup class="c" data-ref="Nathavitharana2017LPA" title="Source 341">341</sup>.`,"resistance"],
 ["Linezolid",`An oxazolidinone in BPaL(M); toxicities are neuropathy and myelosuppression, lower at 600 mg <sup class="c" data-ref="Conradie2022,FDA-Zyvox" title="Source 86,171">86,171</sup>.`,"drtb"],
  ["Lost to follow-up",`Language note: the person-first term replacing "defaulter" <sup class="c" data-ref="Zachariah2012" title="Source 530">530</sup>.`,"living"],
 ["M72/AS01E",`A protein-adjuvant vaccine candidate: 49.7% efficacy in a phase 2b trial; phase 3 began in 2024 <sup class="c" data-ref="Tait2019,NCT06062238" title="Source 346,456">346,456</sup>.`,"frontier"],
 ["Mantoux test",`The intradermal tuberculin skin test: 0.1 mL of 5 TU PPD, read at 48–72 hours <sup class="c" data-ref="ATS2000" title="Source 17">17</sup>.`,"tests"],
 ["Material support",`Food or financial help, such as food baskets, vouchers and transport money <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"living"],
 ["Mediastinal lymph node",`The lung-draining node where T cells are first primed against TB <sup class="c" data-ref="Wolf2008,Reiley2008" title="Source 396,524">396,524</sup>.`,"granuloma"],
 ["MGIT",`Mycobacteria Growth Indicator Tube, an automated liquid culture system <sup class="c" data-ref="Chihota2010,Cruciani2004" title="Source 73,99">73,99</sup>.`,"diagnose"],
 ["Miliary TB",`TB spread widely through the lymph and blood, with nodules throughout the lungs; more common with impaired cell-mediated immunity <sup class="c" data-ref="Sharma2005,Nachiappan2017" title="Source 337,424">337,424</sup>.`,"symptoms"],
 ["Moxifloxacin",`A fluoroquinolone in BPaLM and the 4-month regimen; boxed warnings include tendon rupture <sup class="c" data-ref="WHO-Mod4-2025,FDA-Moxifloxacin" title="Source 161,515">161,515</sup>.`,"drugs"],
 ["MTBC (M. tuberculosis complex)",`The closely related, clonal group of bacteria that cause TB, including M. bovis and M. africanum <sup class="c" data-ref="Gagneux2018,Brosch2002" title="Source 50,191">50,191</sup>.`,"bacillus"],
 ["MTBVAC",`A live-attenuated M. tuberculosis vaccine candidate in a phase 3 infant trial <sup class="c" data-ref="Tameris2025,NCT04975178" title="Source 343,458">343,458</sup>.`,"frontier"],
 ["Multidrug-resistant TB (MDR-TB)",`TB resistant to at least rifampicin and isoniazid <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"resistance"],
 ["Mycobacterium bovis",`The cattle TB bacillus; causes zoonotic TB in people and is the parent of BCG <sup class="c" data-ref="OleaPopelka2017,Luca2013" title="Source 299,360">299,360</sup>.`,"bacillus"],
 ["Mycobacterium tuberculosis",`The bacterium that causes TB, named the year after Koch's 1882 discovery <sup class="c" data-ref="Cambau2014" title="Source 60">60</sup>.`,"bacillus"],
 ["Mycolic acids",`Long fatty acids forming the waxy outer layer of the cell wall; isoniazid blocks their synthesis <sup class="c" data-ref="Brennan2003,Marrakchi2014" title="Source 48,310">48,310</sup>.`,"bacillus"],
 ["N95 respirator",`A fitted respirator that filters respirable particles; worn by health workers caring for people with infectious TB <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`,"control"],
 ["NAAT (nucleic acid amplification test)",`A molecular test such as Xpert or Truenat that detects TB DNA <sup class="c" data-ref="Lewinsohn2017,WHO-Mod3-2024" title="Source 284,514">284,514</sup>.`,"diagnose"],
 ["Negative pressure",`Air flowing into a room from the corridor, so contaminated air does not escape <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`,"control"],
 ["Non-severe TB (children)",`Peripheral or uncomplicated intrathoracic node TB, uncomplicated pleural effusion, or limited non-cavitary disease: eligible for 4 months <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"special"],
 ["Non-tuberculous mycobacteria (NTM)",`Over 190 environmental mycobacterial species; some cause TB-like lung disease <sup class="c" data-ref="Daley2020" title="Source 102">102</sup>.`,"diagnose"],
 ["Notifiable disease",`TB is notifiable: CDC asks that suspected or confirmed TB be reported to public health at once, so treatment can be tracked and contacts checked <sup class="c" data-ref="Jensen2005" title="Source 249">249</sup>.`,"control"],
 ["Optic neuritis",`Inflammation of the optic nerve, ethambutol's key toxicity <sup class="c" data-ref="FDA-Ethambutol,Ezer2013" title="Source 157,159">157,159</sup>.`,"safety"],
 ["Paradoxical reaction",`Temporary worsening despite effective treatment, seen in about 20% of TB lymphadenitis <sup class="c" data-ref="Fontanilla2011" title="Source 183">183</sup>.`,"symptoms"],
 ["Patient-centred care",`Care organised around the person's needs, including education, counselling and support <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"living"],
 ["Peripheral neuropathy",`Nerve damage causing tingling or burning; caused by isoniazid and linezolid <sup class="c" data-ref="FDA-Isoniazid,Conradie2022" title="Source 86,160">86,160</sup>.`,"safety"],
 ["Person-first language",`Words that name the person before the disease and avoid blame <sup class="c" data-ref="Zachariah2012" title="Source 530">530</sup>.`,"living"],
  ["Person with presumptive TB",`Language note: the term replacing "TB suspect" <sup class="c" data-ref="Zachariah2012" title="Source 530">530</sup>.`,"living"],
 ["Phagosome",`The membrane bubble a macrophage forms around a microbe; TB stops it maturing and acidifying <sup class="c" data-ref="SturgillKoszycki1994,Armstrong1971" title="Source 16,449">16,449</sup>.`,"granuloma"],
 ["Phthisis",`The ancient Greek name for TB, which Hippocrates described as a fatal disease of young adults <sup class="c" data-ref="Barberis2017" title="Source 26">26</sup>.`,"history"],
 ["Post-TB lung disease",`Lasting lung damage after cure: bronchiectasis, obstruction, fibrosis and vascular disease <sup class="c" data-ref="Allwood2021" title="Source 9">9</sup>.`,"living"],
 ["Pott's disease",`TB of the spine; seen in Egyptian remains from about 2400 BC <sup class="c" data-ref="Barberis2017" title="Source 26">26</sup>.`,"history"],
 ["PPD (purified protein derivative)",`The tuberculin used in the TST, given as 5 TU <sup class="c" data-ref="ATS2000" title="Source 17">17</sup>.`,"tests"],
 ["Pre-XDR-TB",`Rifampicin-resistant TB also resistant to at least one fluoroquinolone <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"resistance"],
 ["Pretomanid",`A nitroimidazooxazine in BPaL(M) that inhibits mycolic acid synthesis <sup class="c" data-ref="FDA-Pretomanid,Stover2000" title="Source 164,447">164,447</sup>.`,"drugs"],
 ["Primary TB",`Disease shortly after infection, commonest in children and immunocompromised people <sup class="c" data-ref="Nachiappan2017" title="Source 337">337</sup>.`,"spectrum"],
 ["Pulmonary rehabilitation",`Supervised exercise and education for people with post-TB lung disease <sup class="c" data-ref="Migliori2021PTLD,Silva2025PTLD" title="Source 324,427">324,427</sup>.`,"living"],
 ["Pyrazinamide (Z)",`A first-line sterilising prodrug activated by pyrazinamidase in acid conditions <sup class="c" data-ref="Zhang2003PZA" title="Source 536">536</sup>.`,"drugs"],
 ["Pyridoxine (vitamin B6)",`Given with isoniazid to prevent neuropathy <sup class="c" data-ref="Saukkonen2025,FDA-Isoniazid" title="Source 160,413">160,413</sup>.`,"safety"],
 ["QT prolongation",`A delay in heart repolarisation on the ECG; a warning for bedaquiline and moxifloxacin <sup class="c" data-ref="FDA-Sirturo,FDA-Moxifloxacin" title="Source 161,169">161,169</sup>.`,"safety"],
 ["Quantum (Wells-Riley)",`One infectious dose of airborne TB, used to model infection risk in a room <sup class="c" data-ref="Escombe2007,Nardell1991" title="Source 150,340">150,340</sup>.`,"spread"],
 ["QuantiFERON",`An IGRA read in IU/mL; positive at 0.35 IU/mL or more <sup class="c" data-ref="Mazurek2010" title="Source 316">316</sup>.`,"tests"],
 ["RD1 (region of difference 1)",`A genomic region deleted from all BCG strains, encoding ESAT-6 and CFP-10 <sup class="c" data-ref="Mahairas1996" title="Source 301">301</sup>.`,"bacillus"],
 ["Reinfection",`A new TB infection after a previous one or after cure; common where transmission is intense <sup class="c" data-ref="Verver2005" title="Source 495">495</sup>.`,"risk"],
 ["Relapse",`Return of TB with the same strain after cure; 70% of recurrences in pooled data <sup class="c" data-ref="Vega2021" title="Source 491">491</sup>.`,"spectrum"],
 ["Respiratory hygiene",`Covering the mouth and nose when coughing or sneezing, then hand hygiene; a strong WHO recommendation <sup class="c" data-ref="WHO-IPC2019" title="Source 511">511</sup>.`,"control"],
 ["Rifampicin (R, rifampin)",`The key sterilising first-line drug, which blocks RNA polymerase <sup class="c" data-ref="Campbell2001Rif,Jindani2003" title="Source 62,253">62,253</sup>.`,"drugs"],
 ["Rifampicin-resistant TB (RR-TB)",`TB resistant to rifampicin, with or without isoniazid resistance; reported with MDR as MDR/RR-TB <sup class="c" data-ref="WHO-Mod4-2025" title="Source 515">515</sup>.`,"resistance"],
 ["Rifapentine (P)",`A long-acting rifamycin taken with food, used in 3HP, 1HP and the 4-month regimen <sup class="c" data-ref="FDA-Priftin,Dorman2021" title="Source 141,165">141,165</sup>.`,"drugs"],
 ["rpoB",`The gene for the RNA polymerase β subunit; its RRDR holds over 95% of rifampicin-resistance mutations <sup class="c" data-ref="Telenti1993,Seifert2015" title="Source 419,462">419,462</sup>.`,"resistance"],
 ["Sanatorium",`A rest-and-fresh-air institution, from Brehmer's 1854 idea; the Madras study showed home treatment works as well <sup class="c" data-ref="Barberis2017,TCCMadras1959" title="Source 26,461">26,461</sup>.`,"history"],
 ["Smear microscopy",`Staining sputum for acid-fast bacilli; three smears find about 70% of culture-confirmed TB <sup class="c" data-ref="Lewinsohn2017" title="Source 284">284</sup>.`,"diagnose"],
 ["Source control",`Reducing what an infectious person releases, for example with a surgical mask <sup class="c" data-ref="Dharmadhikari2012" title="Source 119">119</sup>.`,"control"],
 ["Sputum induction",`Inhaling nebulised hypertonic saline to produce sputum <sup class="c" data-ref="Jensen2005,Hepple2012" title="Source 225,249">225,249</sup>.`,"nursing"],
 ["Sterilising activity",`Killing slow and persisting bacilli so TB does not relapse; rifampicin's key role <sup class="c" data-ref="Jindani2003,Mitchison2000" title="Source 253,328">253,328</sup>.`,"drugs"],
 ["Stigma",`Negative judgement of people with TB, mostly from fear of infection; it delays care and disrupts treatment <sup class="c" data-ref="Courtwright2010,Chang2014IJTLD" title="Source 70,92">70,92</sup>.`,"living"],
 ["Streptomycin",`The first anti-TB antibiotic, reported in 1944 <sup class="c" data-ref="Schatz1944" title="Source 414">414</sup> and tested in the 1948 MRC trial <sup class="c" data-ref="MRC1948" title="Source 332">332</sup>.`,"history"],
 ["Subclinical TB",`TB disease without reported symptoms; about half of confirmed TB in prevalence surveys <sup class="c" data-ref="Frascella2021,Coussens2024" title="Source 93,188">93,188</sup>.`,"spectrum"],
 ["T-SPOT.TB",`An IGRA that counts spots; positive at 8 or more, borderline at 5–7 <sup class="c" data-ref="Mazurek2010" title="Source 316">316</sup>.`,"tests"],
 ["TB disease",`Infection with macroscopic pathology, with or without symptoms <sup class="c" data-ref="Coussens2024" title="Source 93">93</sup>.`,"spectrum"],
 ["TB infection",`Immune evidence of M. tuberculosis without disease; it is not contagious. Formerly called latent TB <sup class="c" data-ref="Drain2018,Behr2021" title="Source 36,142">36,142</sup>.`,"spectrum"],
 ["TB meningitis",`TB of the brain lining, the most lethal form; 6-month mortality 57% with HIV and 16% without <sup class="c" data-ref="Stadelman2020" title="Source 440">440</sup>.`,"symptoms"],
 ["TB preventive treatment (TPT)",`Medicines given for TB infection to stop disease developing <sup class="c" data-ref="WHO-Mod1-2024" title="Source 512">512</sup>.`,"tpt"],
 ["Tuberculin skin test (TST)",`An intradermal PPD test read as mm of induration <sup class="c" data-ref="ATS2000,Lewinsohn2017" title="Source 17,284">17,284</sup>.`,"tests"],
 ["TNF (tumour necrosis factor)",`A cytokine needed to keep granulomas intact; blocking it unmasks TB <sup class="c" data-ref="Flynn1995,Keane2001" title="Source 180,266">180,266</sup>.`,"risk"],
 ["Trained immunity",`Non-specific boosting of innate immune cells, reported after BCG (Early evidence) <sup class="c" data-ref="Kleinnijenhuis2012" title="Source 273">273</sup>.`,"bcg"],
 ["Treatment success",`Cure or treatment completion: 88% for drug-susceptible and 71% for MDR/RR-TB <sup class="c" data-ref="WHO-GTR2025" title="Source 510">510</sup>.`,"regimen"],
 ["Truenat",`A chip-based molecular TB test conditionally recommended by WHO for initial diagnosis <sup class="c" data-ref="WHO-Mod3-2024,PennNicholson2021" title="Source 370,514">370,514</sup>.`,"diagnose"],
 ["Tubercle",`Another word for the granuloma the body builds around TB germs <sup class="c" data-ref="Ramakrishnan2012,Ehlers2012" title="Source 146,386">146,386</sup>.`,"granuloma"],
 ["Upper-room germicidal UV",`Ultraviolet lamps near the ceiling that kill airborne bacilli; cut guinea-pig infection from 35% to 9.5% <sup class="c" data-ref="Escombe2009" title="Source 153">153</sup>.`,"control"],
 ["Video-observed therapy (VOT)",`Watching doses by smartphone video instead of in person <sup class="c" data-ref="Story2019" title="Source 446">446</sup>.`,"nursing"],
 ["Window prophylaxis",`Preventive treatment for young contacts after a negative first test, until a retest at 8–10 weeks <sup class="c" data-ref="NTCA2005" title="Source 355">355</sup>.`,"control"],
 ["World TB Day",`24 March, marking Koch's 1882 announcement <sup class="c" data-ref="CDC2018WTBD" title="Source 66">66</sup>.`,"history"],
 ["Xpert MTB/RIF",`A cartridge PCR that detects TB and rifampicin resistance in under 2 hours <sup class="c" data-ref="Boehme2010" title="Source 44">44</sup>.`,"diagnose"],
 ["Xpert Ultra",`A more sensitive Xpert cartridge (90.9% vs 84.7%), with slightly lower specificity <sup class="c" data-ref="Zifodya2021" title="Source 538">538</sup>.`,"diagnose"],
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold γ to g and hyphens away, so 'interferon-g' and 'xdr' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/γ/g,'g').replace(/β/g,'b').replace(/[-–]/g,'');
  function render(){const q=norm(inp.value.trim());const L=RV_GL.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${RV_GL.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const RV_AREAN={A:'Epidemiology, global burden & history',B:'Transmission, risk factors & host susceptibility',C:'Microbiology, immunology & pathogenesis',D:'Clinical presentation & diagnosis',E:'Treatment of drug-susceptible TB disease & TB infection',F:'Drug-resistant TB, comorbidity & outcomes',G:'Living with TB, infection control & nursing',H:'Vaccines, the End TB Strategy & research'};
const RV_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const RV_svc=s=>s.unverified?[]:RV_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const RV_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','All']].concat(Object.entries(RV_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>RV_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=RV_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`${nAll} sources in all. ${nAll-nChk} were confirmed against a database before inclusion (some by more than one: ${svcTxt}). ${nChk} are marked <span class="tag warn">check</span>.`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=RV_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${RV_link(s)?`<a href="${esc(RV_link(s))}" target="_blank" rel="noopener">${esc(RV_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${RV_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">check</span>':''}</span></li>`}).join('');
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
