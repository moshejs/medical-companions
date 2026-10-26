<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('aut:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('aut:'+k,JSON.stringify(v))}catch(e){}}};
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
   (or an object with .svg) to concatenate into an <svg>'s innerHTML. Coordinates are SVG user units.
   brain(x,y,s,o)          a brain in side view, front to the left; (x,y) is the top-left of its box and s the
                           scale (1 = 200 wide, 150 tall). Lobes: frontal, parietal, temporal, occipital, plus
                           cerebellum, brainstem and amygdala (a dot inside the temporal lobe). o: {hl:['frontal',..]
                           regions tinted, hlCol (CSS colour, default var(--brand)), glow:{region:0..1} per-region
                           tint strength, labels (true: lobe names), id (unique clip id when two brains share an svg)}.
                           Returns {svg, at:{region:[x,y]}} with a label anchor for each region.
   neuron(x,y,s,o)         a neuron: soma at (x,y), dendrites branching to the left, axon to the right ending in
                           boutons. s = soma radius (default 10; the whole cell spans about 9s). o: {spines 0..1
                           (dendritic spine density), prune 0..1 (share of spines removed, drawn fading),
                           n (dendrites, default 5), seed, axon (false hides it), col (soma colour)}.
   synapse(x,y,s,o)        a synapse in section: presynaptic bouton above, cleft at (x,y), postsynaptic membrane
                           below; s = scale (1 = 80 wide). o: {kind 'e' (glutamate, --excite) | 'i' (GABA,
                           --inhibit), release 0..1 (vesicles cross the cleft), receptors (count, default 4)}.
   face(x,y,r,o)           a simple face, centre (x,y), radius r. o: {gaze (degrees; 0 = looking right, 90 =
                           down, null = at the viewer), mouth 'smile'|'flat'|'open'|'wavy', brows 'calm'|'tense',
                           ear (true: ear defenders), col (skin colour)}.
   bubble(x,y,w,h,o)       a speech bubble, top-left (x,y). o: {text (one line, centred), tail 'left'|'right'|
                           'down'|'none', col (stroke colour), fill, broken (dashed: a message that did not land),
                           think (rounder, a thought)}.
   wave(x,y,w,amp,o)       a wave path across [x, x+w] centred on y with amplitude amp. o: {freq (cycles across
                           w, default 4), phase (0..1), col (default var(--sense)), sw (stroke width), env (fn u->0..1
                           scaling the amplitude along the wave), fill (true: filled band, for a sensory lane)}.
   profile(x,y,r,vals,o)   a radar wheel ("spider" profile) centred at (x,y): vals 0..1 for each spoke. o: {labels
                           [...], col (default var(--brand)), ghost (an earlier vals array drawn dashed), rings
                           (default 3), lab (false hides labels), fs (label font class, default 't-xs')}.
                           Returns {svg, pt(i,v)->[x,y]}.
   dial(x,y,r,v,o)         a half-circle gauge, centre (x,y), value v 0..1 from calm (green) through amber to
                           overload (red). o: {label (under it), th (a threshold tick 0..1), battery (true: draw an
                           energy battery instead, full when v = 1, w = 2r)}.
   chrom(x,y,h,o)          a chromosome standing at (x,y) (top), height h, with bands. o: {cen 0..1 (centromere,
                           default .4), seg:[a,b] a highlighted segment (0..1 along it), kind 'del'|'dup'|'var'
                           (deletion drawn as a dashed gap, duplication doubled, variant a dot), label, w (width)}.
   tl(x,y,w,o)             a horizontal time axis. o: {min (0), max (36), step (6), unit ('mo'), labels (true),
                           minor (step for small ticks)}. Returns {svg, at(v)->x}.
   person(x,y,s,fill,o)    a person pictogram for icon arrays (s = height), fill a CSS colour; o: {op}.
   ped(x,y,sex,aff,o)      a pedigree symbol: sex 'm' square, 'f' circle; aff 0 unaffected, 1 autistic/affected
                           (--neuro), .5 carrier (half shaded, --gold); o: {dead, proband (arrow; needs
                           marker('pedArrow') in the svg's defs), r}.
   marker(id,color)        an arrowhead <marker> for <defs>. */
let _kid=0;
const BR_REG={
  frontal:'M0 0H96L89 60L60 79L0 112Z', parietal:'M96 0H162L151 63L89 60Z', occipital:'M162 0H200V125L151 63Z',
  temporal:'M0 112L60 79L89 60L151 63L200 125V150H0Z'};
const BR_AT={frontal:[52,46],parietal:[124,34],occipital:[176,62],temporal:[106,92],cerebellum:[152,124],brainstem:[124,140],amygdala:[86,96]};
function brain(x,y,s=1,o={}){const id=o.id||'brc'+(++_kid),hl=o.hl||[],gl=o.glow||{},hc=o.hlCol||'var(--brand)';
  const cer='M28 96C16 70 28 30 70 18C102 7 146 11 171 34C191 52 193 82 181 100C171 112 150 113 136 108C124 118 104 121 90 114C74 121 50 118 40 108C34 104 30 100 28 96Z';
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><clipPath id="${id}"><path d="${cer}"/></clipPath>`;
  /* cerebellum and brainstem sit behind the cerebrum */
  g+=`<path d="M118 106C120 124 120 138 122 150L134 150C133 136 134 122 138 108Z" style="fill:var(--cortex);stroke:var(--cortex-line);stroke-width:1.4"/>`;
  g+=`<path d="M132 110C140 102 168 100 180 108C188 116 182 132 166 134C150 136 136 128 132 110Z" style="fill:var(--cortex);stroke:var(--cortex-line);stroke-width:1.4"/>`;
  for(let i=0;i<4;i++)g+=`<path d="M${138+i*2} ${114+i*5}Q${160} ${108+i*6} ${180-i*3} ${112+i*5}" style="fill:none;stroke:var(--cortex-line);stroke-width:.8;opacity:.6"/>`;
  ['cerebellum','brainstem'].forEach(r=>{const k=hl.includes(r)?1:(gl[r]||0);if(k>0){const p=r==='cerebellum'?'M132 110C140 102 168 100 180 108C188 116 182 132 166 134C150 136 136 128 132 110Z':'M118 106C120 124 120 138 122 150L134 150C133 136 134 122 138 108Z';
    g+=`<path d="${p}" style="fill:${hc};opacity:${f1(.55*k)}"/>`}});
  g+=`<path d="${cer}" style="fill:var(--cortex);stroke:var(--cortex-line);stroke-width:1.6"/>`;
  g+=`<g clip-path="url(#${id})">`;
  for(const r in BR_REG){const k=hl.includes(r)?1:(gl[r]||0);if(k>0)g+=`<path d="${BR_REG[r]}" style="fill:${hc};opacity:${f1(.5*k)}"/>`}
  /* gyri for texture, then the three landmark sulci */
  const rr=rng(11);for(let i=0;i<16;i++){const gx=30+rr()*150,gy=24+rr()*80;g+=`<path d="M${f1(gx)} ${f1(gy)}q${f1(6+rr()*6)} ${f1(-6+rr()*4)} ${f1(12+rr()*8)} ${f1(rr()*6-3)}" style="fill:none;stroke:var(--cortex-line);stroke-width:.9;opacity:.45"/>`}
  g+=`</g><path d="M98 15C92 34 97 46 89 60" style="fill:none;stroke:var(--cortex-line);stroke-width:1.6"/><path d="M48 90C70 76 102 66 142 72" style="fill:none;stroke:var(--cortex-line);stroke-width:1.6"/><path d="M162 30C157 45 153 55 151 63" style="fill:none;stroke:var(--cortex-line);stroke-width:1.3"/>`;
  {const k=hl.includes('amygdala')?1:(gl.amygdala||0);g+=`<circle cx="86" cy="96" r="5" style="fill:${k>0?hc:'var(--cortex-line)'};opacity:${k>0?f1(.4+.6*k):.35}"/>`}
  if(o.labels){const nm={frontal:'Frontal',parietal:'Parietal',temporal:'Temporal',occipital:'Occipital',cerebellum:'Cerebellum'};for(const r in nm)g+=`<text x="${BR_AT[r][0]}" y="${BR_AT[r][1]}" class="t-xs t-mid" style="fill:var(--ink)">${nm[r]}</text>`}
  g+='</g>';const at={};for(const r in BR_AT)at[r]=[x+BR_AT[r][0]*s,y+BR_AT[r][1]*s];
  return {svg:g,at}}
function neuron(x,y,s=10,o={}){const rr=rng(o.seed||3),n=o.n||5,sp=clamp(o.spines==null?.6:o.spines),pr=clamp(o.prune||0);let g='';
  for(let i=0;i<n;i++){const a=Math.PI*(.62+.76*i/Math.max(1,n-1)),L=s*(3+rr()*1.4);
    const ex=x+Math.cos(a)*L,ey=y-Math.sin(a)*L*.9,mx=x+Math.cos(a)*L*.5+(rr()-.5)*s,my=y-Math.sin(a)*L*.45;
    g+=`<path d="M${f1(x)} ${f1(y)}Q${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--axon);stroke-width:${f1(s*.28)};stroke-linecap:round"/>`;
    const bx=lerp(x,ex,.6),by=lerp(y,ey,.6),ba=a+(rr()<.5?.5:-.5),bl=L*.4;
    g+=`<path d="M${f1(bx)} ${f1(by)}l${f1(Math.cos(ba)*bl)} ${f1(-Math.sin(ba)*bl)}" style="stroke:var(--axon);stroke-width:${f1(s*.18)};stroke-linecap:round"/>`;
    /* spines along the outer half of each dendrite */
    const ns=Math.round(10*sp);for(let k=0;k<ns;k++){const u=.35+.6*(k+.5)/ns,px=lerp(x,ex,u)+(rr()-.5)*s*.3,py=lerp(y,ey,u)+(rr()-.5)*s*.3,
      side=k%2?1:-1,qa=a+side*Math.PI/2,ln=s*.42,gone=rr()<pr;
      g+=`<path d="M${f1(px)} ${f1(py)}l${f1(Math.cos(qa)*ln)} ${f1(-Math.sin(qa)*ln)}" style="stroke:var(--spine);stroke-width:${f1(s*.13)};stroke-linecap:round;opacity:${gone?.12:1}"/><circle cx="${f1(px+Math.cos(qa)*ln)}" cy="${f1(py-Math.sin(qa)*ln)}" r="${f1(s*.14)}" style="fill:var(--spine);opacity:${gone?.12:1}"/>`}}
  if(o.axon!==false){const ax=x+s*5.5;g+=`<path d="M${f1(x+s)} ${f1(y)}C${f1(x+s*2.5)} ${f1(y+s*.8)} ${f1(x+s*3.8)} ${f1(y-s*.6)} ${f1(ax)} ${f1(y)}" style="fill:none;stroke:var(--axon);stroke-width:${f1(s*.24)}"/>`;
    for(let k=-1;k<=1;k++){g+=`<path d="M${f1(ax)} ${f1(y)}l${f1(s*.9)} ${f1(k*s*.7)}" style="stroke:var(--axon);stroke-width:${f1(s*.16)}"/><circle cx="${f1(ax+s*.9)}" cy="${f1(y+k*s*.7)}" r="${f1(s*.22)}" style="fill:var(--vesicle)"/>`}}
  g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s)}" style="fill:${o.col||'var(--soma)'};stroke:var(--axon);stroke-width:1.2"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s*.38)}" style="fill:var(--nuc);opacity:.7"/>`;
  return g}
function synapse(x,y,s=1,o={}){const col=o.kind==='i'?'var(--inhibit)':'var(--excite)',rel=clamp(o.release||0),nr=o.receptors||4,rr=rng(o.seed||9);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<path d="M-40 -6C-40 -40 -26 -58 0 -58C26 -58 40 -40 40 -6Z" style="fill:var(--cell);stroke:var(--axon);stroke-width:1.6"/>`;
  g+=`<path d="M-44 8C-30 6 30 6 44 8V30H-44Z" style="fill:var(--cell);stroke:var(--axon);stroke-width:1.6"/>`;
  for(let i=0;i<nr;i++){const rx=-30+i*60/Math.max(1,nr-1);g+=`<rect x="${f1(rx-3)}" y="5" width="6" height="7" rx="1.5" style="fill:${col};opacity:.85"/>`}
  for(let i=0;i<7;i++){const vx=-24+(i%4)*16+(i>3?8:0),vy=-38+(i>3?16:0);g+=`<circle cx="${vx}" cy="${vy}" r="5.5" style="fill:none;stroke:${col};stroke-width:1.3"/>`;
    for(let k=0;k<3;k++)g+=`<circle cx="${f1(vx+(rr()-.5)*5)}" cy="${f1(vy+(rr()-.5)*5)}" r="1.1" style="fill:${col}"/>`}
  /* released transmitter crosses the cleft */
  if(rel>0)for(let i=0;i<12;i++){const px=-26+rr()*52,py=lerp(-8,6,clamp(rel*1.2-rr()*.2));g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="1.5" style="fill:${col};opacity:${f1(.4+.6*rel)}"/>`}
  return g+'</g>'}
function face(x,y,r=20,o={}){let g=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${o.col||'var(--skin)'};stroke:var(--hair);stroke-width:1.2"/>`;
  g+=`<path d="M${f1(x-r*.96)} ${f1(y-r*.2)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x+r*.96)} ${f1(y-r*.2)}Q${f1(x)} ${f1(y-r*.72)} ${f1(x-r*.96)} ${f1(y-r*.2)}Z" style="fill:var(--hair)"/>`;
  const ga=o.gaze,dx=ga==null?0:Math.cos(ga*Math.PI/180)*r*.1,dy=ga==null?0:Math.sin(ga*Math.PI/180)*r*.1;
  [-1,1].forEach(k=>{const ex=x+k*r*.36,ey=y+r*.02;g+=`<ellipse cx="${f1(ex)}" cy="${f1(ey)}" rx="${f1(r*.17)}" ry="${f1(r*.13)}" style="fill:var(--bubble)"/><circle cx="${f1(ex+dx)}" cy="${f1(ey+dy)}" r="${f1(r*.08)}" style="fill:var(--ink)"/>`;
    const tense=o.brows==='tense',inner=ey-r*(tense?.2:.26),outer=ey-r*(tense?.32:.26);
    g+=`<path d="M${f1(ex-r*.17)} ${f1(k<0?outer:inner)}L${f1(ex+r*.17)} ${f1(k<0?inner:outer)}" style="stroke:var(--hair);stroke-width:${f1(r*.06)};stroke-linecap:round"/>`});
  const my=y+r*.45,m=o.mouth||'smile';
  g+=m==='open'?`<ellipse cx="${f1(x)}" cy="${f1(my)}" rx="${f1(r*.15)}" ry="${f1(r*.12)}" style="fill:var(--ink);opacity:.75"/>`:
     `<path d="${m==='flat'?`M${f1(x-r*.22)} ${f1(my)}H${f1(x+r*.22)}`:m==='wavy'?`M${f1(x-r*.26)} ${f1(my)}q${f1(r*.13)} ${f1(-r*.1)} ${f1(r*.26)} 0t${f1(r*.26)} 0`:`M${f1(x-r*.26)} ${f1(my-r*.05)}Q${f1(x)} ${f1(my+r*.18)} ${f1(x+r*.26)} ${f1(my-r*.05)}`}" style="fill:none;stroke:var(--ink);stroke-width:${f1(r*.07)};stroke-linecap:round"/>`;
  if(o.ear){g+=`<path d="M${f1(x-r*1.08)} ${f1(y)}A${f1(r*1.08)} ${f1(r*1.15)} 0 0 1 ${f1(x+r*1.08)} ${f1(y)}" style="fill:none;stroke:var(--accent);stroke-width:${f1(r*.14)}"/>`;
    [-1,1].forEach(k=>g+=`<rect x="${f1(x+k*r*1.08-r*.2)}" y="${f1(y-r*.28)}" width="${f1(r*.4)}" height="${f1(r*.56)}" rx="${f1(r*.12)}" style="fill:var(--accent)"/>`)}
  return g}
function bubble(x,y,w,h,o={}){const c=o.col||'var(--line)',fl=o.fill||'var(--bubble)',rad=o.think?h/2:Math.min(10,h/3),t=o.tail||'down';
  let g=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(rad)}" style="fill:${fl};stroke:${c};stroke-width:1.4${o.broken?';stroke-dasharray:4 3':''}"/>`;
  const tp=t==='left'?`M${f1(x+w*.2)} ${f1(y+h-1)}l-14 12l4 -12`:t==='right'?`M${f1(x+w*.8)} ${f1(y+h-1)}l14 12l-4 -12`:t==='down'?`M${f1(x+w*.45)} ${f1(y+h-1)}l4 12l8 -12`:'';
  if(tp&&!o.think)g+=`<path d="${tp}" style="fill:${fl};stroke:${c};stroke-width:1.4;stroke-linejoin:round${o.broken?';stroke-dasharray:4 3':''}"/>`;
  if(o.think&&t!=='none')[[.3,1.25,4],[.22,1.55,2.6]].forEach(([u,v,rr])=>g+=`<circle cx="${f1(x+w*u)}" cy="${f1(y+h*v)}" r="${rr}" style="fill:${fl};stroke:${c};stroke-width:1.2"/>`);
  if(o.text)g+=`<text x="${f1(x+w/2)}" y="${f1(y+h/2+4)}" class="t-sm t-mid" style="fill:var(--ink)">${o.text}</text>`;
  return g}
function wave(x,y,w,amp,o={}){const fq=o.freq||4,ph=(o.phase||0)*2*Math.PI,env=o.env||(()=>1),N=Math.max(40,Math.round(w/3));let d='';
  for(let i=0;i<=N;i++){const u=i/N,a=amp*env(u),v=Math.sin(u*fq*2*Math.PI+ph)*a;d+=(i?'L':'M')+f1(x+u*w)+' '+f1(y-v)}
  if(o.fill){let top='',bot='';for(let i=0;i<=N;i++){const u=i/N,a=amp*env(u);top+=(i?'L':'M')+f1(x+u*w)+' '+f1(y-a);bot=`L${f1(x+u*w)} ${f1(y+a)}`+bot}
    return `<path d="${top}${bot}Z" style="fill:${o.col||'var(--sense)'};opacity:.16"/><path d="${d}" style="fill:none;stroke:${o.col||'var(--sense)'};stroke-width:${o.sw||1.6};stroke-linejoin:round"/>`}
  return `<path d="${d}" style="fill:none;stroke:${o.col||'var(--sense)'};stroke-width:${o.sw||1.6};stroke-linejoin:round"/>`}
function profile(x,y,r,vals,o={}){const n=vals.length,col=o.col||'var(--brand)',rings=o.rings||3,lb=o.labels||[];
  const pt=(i,v)=>{const a=-Math.PI/2+i*2*Math.PI/n;return[x+Math.cos(a)*r*v,y+Math.sin(a)*r*v]};
  let g='';for(let k=1;k<=rings;k++){let d='';for(let i=0;i<n;i++){const p=pt(i,k/rings);d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}g+=`<path d="${d}Z" style="fill:none;stroke:var(--line);stroke-width:1"/>`}
  for(let i=0;i<n;i++){const p=pt(i,1);g+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:var(--line);stroke-width:1"/>`}
  const poly=v=>v.map((q,i)=>{const p=pt(i,clamp(q,.04,1));return(i?'L':'M')+f1(p[0])+' '+f1(p[1])}).join('')+'Z';
  if(o.ghost)g+=`<path d="${poly(o.ghost)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/>`;
  g+=`<path d="${poly(vals)}" style="fill:${col};fill-opacity:.22;stroke:${col};stroke-width:2;stroke-linejoin:round"/>`;
  vals.forEach((q,i)=>{const p=pt(i,clamp(q,.04,1));g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.2" style="fill:${col}"/>`});
  if(o.lab!==false)lb.forEach((t,i)=>{const p=pt(i,1.16),a=-Math.PI/2+i*2*Math.PI/n,c=Math.cos(a);const an=Math.abs(c)<.3?'t-mid':c>0?'':'t-end';
    g+=`<text x="${f1(p[0])}" y="${f1(p[1]+(Math.sin(a)>.5?9:Math.sin(a)<-.5?-2:4))}" class="${o.fs||'t-xs'} ${an}">${t}</text>`});
  return {svg:g,pt}}
function dial(x,y,r,v,o={}){v=clamp(v);let g='';
  if(o.battery){const w=2*r,h=r*.8,x0=x-r,y0=y-h;const col=v>.5?'var(--calm)':v>.2?'var(--warn)':'var(--bad)';
    g+=`<rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(w)}" height="${f1(h)}" rx="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/><rect x="${f1(x0+w)}" y="${f1(y0+h*.3)}" width="5" height="${f1(h*.4)}" rx="1.5" style="fill:var(--ink)"/>`;
    g+=`<rect x="${f1(x0+3)}" y="${f1(y0+3)}" width="${f1(Math.max(0,(w-6)*v))}" height="${f1(h-6)}" rx="3" style="fill:${col}"/>`;
    if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+14)}" class="t-xs t-mid">${o.label}</text>`;return g}
  const arc=(a0,a1,c)=>{const p0=[x-Math.cos(a0*Math.PI)*r,y-Math.sin(a0*Math.PI)*r],p1=[x-Math.cos(a1*Math.PI)*r,y-Math.sin(a1*Math.PI)*r];
    return `<path d="M${f1(p0[0])} ${f1(p0[1])}A${r} ${r} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:${c};stroke-width:${f1(r*.22)}"/>`};
  g+=arc(0,.5,'var(--calm)')+arc(.5,.78,'var(--warn)')+arc(.78,1,'var(--bad)');
  if(o.th!=null){const a=o.th*Math.PI;g+=`<line x1="${f1(x-Math.cos(a)*r*.7)}" y1="${f1(y-Math.sin(a)*r*.7)}" x2="${f1(x-Math.cos(a)*r*1.18)}" y2="${f1(y-Math.sin(a)*r*1.18)}" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:2 2"/>`}
  const a=v*Math.PI;g+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x-Math.cos(a)*r*.86)}" y2="${f1(y-Math.sin(a)*r*.86)}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.1)}" style="fill:var(--ink)"/>`;
  if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+16)}" class="t-xs t-mid">${o.label}</text>`;
  return g}
function chrom(x,y,h,o={}){const w=o.w||h*.16,cen=o.cen==null?.4:o.cen,cy=y+h*cen,rr=rng(o.seed||5);
  let g=`<path d="M${f1(x-w/2)} ${f1(y+w/2)}A${f1(w/2)} ${f1(w/2)} 0 0 1 ${f1(x+w/2)} ${f1(y+w/2)}V${f1(cy-w*.3)}Q${f1(x+w*.15)} ${f1(cy)} ${f1(x+w/2)} ${f1(cy+w*.3)}V${f1(y+h-w/2)}A${f1(w/2)} ${f1(w/2)} 0 0 1 ${f1(x-w/2)} ${f1(y+h-w/2)}V${f1(cy+w*.3)}Q${f1(x-w*.15)} ${f1(cy)} ${f1(x-w/2)} ${f1(cy-w*.3)}Z" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.3"/>`;
  for(let i=0;i<9;i++){const u=.06+i*.1+rr()*.03;if(Math.abs(u-cen)<.05)continue;g+=`<rect x="${f1(x-w/2+1)}" y="${f1(y+h*u)}" width="${f1(w-2)}" height="${f1(h*(.02+rr()*.03))}" style="fill:var(--muted);opacity:.45"/>`}
  if(o.seg){const[a,b]=o.seg,y0=y+h*a,y1=y+h*b,k=o.kind||'var';
    if(k==='del')g+=`<rect x="${f1(x-w/2-1)}" y="${f1(y0)}" width="${f1(w+2)}" height="${f1(y1-y0)}" style="fill:var(--bg);stroke:var(--neuro);stroke-width:1.6;stroke-dasharray:3 2"/>`;
    else if(k==='dup')g+=`<rect x="${f1(x-w/2)}" y="${f1(y0)}" width="${f1(w)}" height="${f1(y1-y0)}" style="fill:var(--neuro);opacity:.8"/><rect x="${f1(x+w/2+3)}" y="${f1(y0)}" width="${f1(w*.6)}" height="${f1(y1-y0)}" rx="2" style="fill:var(--neuro);opacity:.8"/>`;
    else g+=`<circle cx="${f1(x)}" cy="${f1((y0+y1)/2)}" r="${f1(w*.32)}" style="fill:var(--neuro)"/>`;
    if(o.label)g+=`<text x="${f1(x+w/2+(k==='dup'?w*.6+8:6))}" y="${f1((y0+y1)/2+4)}" class="t-xs">${o.label}</text>`}
  return g}
function tl(x,y,w,o={}){const mn=o.min||0,mx=o.max==null?36:o.max,st=o.step||6,u=o.unit==null?'mo':o.unit,at=v=>x+w*(v-mn)/(mx-mn);
  let g=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y)}" y2="${f1(y)}" class="axis" style="stroke:var(--muted)"/>`;
  if(o.minor)for(let v=mn;v<=mx+1e-9;v+=o.minor)g+=`<line x1="${f1(at(v))}" x2="${f1(at(v))}" y1="${f1(y-2)}" y2="${f1(y+2)}" class="axis"/>`;
  for(let v=mn;v<=mx+1e-9;v+=st){g+=`<line x1="${f1(at(v))}" x2="${f1(at(v))}" y1="${f1(y-5)}" y2="${f1(y+5)}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    if(o.labels!==false)g+=`<text x="${f1(at(v))}" y="${f1(y+17)}" class="t-xs t-mid">${+v.toFixed(2)}${u}</text>`}
  return {svg:g,at}}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
function ped(x,y,sex='m',aff=0,o={}){const r=o.r||11;let g='';const sh=sex==='m'?`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="1.5"`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}"`;
  g+=`${sh} style="fill:${aff>=1?'var(--neuro)':'var(--panel)'};stroke:var(--ink);stroke-width:1.5"/>`;
  if(aff>0&&aff<1){const cid='pc'+Math.round(x)+'_'+Math.round(y);g+=`<clipPath id="${cid}"><rect x="${f1(x-r)}" y="${f1(y-r)}" width="${r}" height="${2*r}"/></clipPath>${sh} clip-path="url(#${cid})" style="fill:var(--gold);stroke:none"/>${sh} style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
  if(o.dead)g+=`<line x1="${f1(x-r*1.3)}" y1="${f1(y+r*1.3)}" x2="${f1(x+r*1.3)}" y2="${f1(y-r*1.3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
  if(o.proband)g+=`<path d="M${f1(x-r*2.2)} ${f1(y+r*1.9)}L${f1(x-r*1.15)} ${f1(y+r*.95)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#pedArrow)"/>`;
  return g}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What autism is',g:1,n:'1.1',d:'Who is autistic, how many, and why the numbers rose'},
 {id:'words',t:'Words, identity & neurodiversity',g:1,n:'1.2',d:'Identity-first or person-first, double empathy, masking'},
 {id:'senses',t:'The sensory world',g:1,n:'1.3',d:'Hyper- and hypo-reactivity, overload, meltdown and shutdown'},
 {id:'genes',t:'Genes & heritability',g:2,n:'2.1',d:'Twins, common and rare variants, syndromes and a pedigree'},
 {id:'risk',t:'Risk factors & myths',g:2,n:'2.2',d:'Prenatal factors, absolute risk, and why vaccines are not a cause'},
 {id:'brain',t:'The developing brain',g:2,n:'2.3',d:'Growth, synapses, connectivity and the main hypotheses'},
 {id:'milestones',t:'Early signs & development',g:3,n:'3.1',d:'Social-communication milestones and red flags, 0–36 months'},
 {id:'screening',t:'Screening tools',g:3,n:'3.2',d:'M-CHAT-R/F logic, predictive value, and why a screen is not a diagnosis'},
 {id:'criteria',t:'DSM-5-TR & ICD-11 criteria',g:3,n:'3.3',d:'A criteria walk-through, specifiers and the three support levels'},
 {id:'assessment',t:'The diagnostic assessment',g:3,n:'3.4',d:'Who assesses, which tools, waiting times, adults and differentials'},
 {id:'cooccur',t:'Co-occurring conditions',g:3,n:'3.5',d:'ADHD, anxiety, depression, intellectual disability and more'},
 {id:'supports',t:'Supports & the evidence',g:4,n:'4.1',d:'Early intervention, what helps, and how sure we are'},
 {id:'aba',t:'ABA and the debate',g:4,n:'4.2',d:'Behavioural approaches, NDBIs and what autistic people say'},
 {id:'therapies',t:'Communication, AAC & therapies',g:4,n:'4.3',d:'Speech therapy, AAC, OT, social skills and adapted CBT'},
 {id:'meds',t:'Medication',g:4,n:'4.4',d:'What medicines can and cannot do: irritability, ADHD, sleep'},
 {id:'unproven',t:'Unproven & harmful treatments',g:4,n:'4.5',d:'Secretin, chelation, bleach, diets and how to judge a claim'},
 {id:'research',t:'Research toward better support',g:4,n:'4.6',d:'Trials, new diagnostics and what autistic people want studied'},
 {id:'school',t:'Family, school & play',g:5,n:'5.1',d:'A week with supports, education rights and caregiver wellbeing'},
 {id:'adult',t:'Autistic adults',g:5,n:'5.2',d:'Late diagnosis, work, relationships, burnout and ageing'},
 {id:'health',t:'Physical health, sleep & safety',g:5,n:'5.3',d:'Epilepsy, sleep, gut, feeding, mortality and safety'},
 {id:'nursing',t:'Nursing & healthcare visits',g:5,n:'5.4',d:'An autism-adapted visit, communication, pain and restraint'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Bleuler and Sukhareva to DSM-5 and neurodiversity'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1, 5 and 6 use the ochre brand; 2 violet (--neuro), 3 charcoal-blue (--accent), 4 green (--rx) */
const GROUPS={1:['Understanding autism','g-und','c-und'],2:['Causes & the brain','g-cause','c-cause'],3:['Signs & diagnosis','g-dx','c-dx'],4:['Supports & interventions','g-rx','c-rx'],5:['Living & lifespan','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('aut:tab');sessionStorage.setItem('aut:tab','1')}catch(e){}
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
