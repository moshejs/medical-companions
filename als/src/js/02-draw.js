/* ---- interface strings ----
   Interface text this companion's module scripts write (UI.replay, UI.stepOf ...), as whole
   phrases, so a translation replaces this block. Functions take the numbers they need, so
   word order can change with the language. The shared runtime (tools/core/) writes its own
   from the %t: UI strings. */
const UI={
  play:'Play',pause:'Pause',replay:'Replay',prev:'← Previous',next:'Next →',
  part:g=>`Part ${g}`,steps:'Steps',
  stepOf:(i,n,t)=>`Step ${i} of ${n}: ${t}`,
  plain:'In plain words',hook:'Exam hook',
  theme:{auto:'Theme: auto',light:'Theme: light',dark:'Theme: dark'}
};
/* piecewise-linear interpolation through anchor points [[x,y],...] sorted by x */
function interp(pts,x){if(x<=pts[0][0])return pts[0][1];for(let i=1;i<pts.length;i++){if(x<=pts[i][0]){const a=pts[i-1],b=pts[i];return lerp(a[1],b[1],(x-a[0])/(b[0]-a[0]))}}return pts[pts.length-1][1]}
/* ---- drawing kit for this subject ----
   umn(x,y,r,o,opts)   an upper motor neuron: pyramidal soma, apical dendrite up, basal dendrites,
                       axon heading off at opts.axon radians (default pi/2, downward)
   lmn(x,y,r,o,opts)   a lower motor neuron: multipolar anterior-horn cell, axon at opts.axon (default 0)
                       opts for both: {dead 0..1, col, fill, axonLen}; dead thins and fades the cell
   fibre(x,y,w,h,o,opts)  one muscle fibre (rounded bar) with striations; opts {col, atrophy 0..1, flick 0..1}
   tdp(x,y,s,o,agg)    TDP-43: a dimer of two lobes with a tail; agg>0 draws it clumped and tagged
   bodyMap(x,y,s,fill) the four ALS body regions (bulbar, cervical, thoracic, lumbosacral) on a figure;
                       fill is {bulbar:0..1,...} and each region is labelled; returns an SVG string
   All colours come from CSS tokens, so they follow the theme. */
function umn(x,y,r=12,o=1,opts={}){const a=opts.axon??Math.PI/2,dead=opts.dead||0,col=opts.col||'var(--umn)',fill=opts.fill||'var(--umn-soft)';
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${f1(o*(1-.55*dead))}">`;
  g+=`<path d="M0 ${f1(-r*.9)} L0 ${f1(-r*3.1*(1-.4*dead))}" style="stroke:${col};stroke-width:${f1(r*.2)};stroke-linecap:round"/>`;
  g+=`<path d="M0 ${f1(-r*2.4*(1-.4*dead))} l${f1(-r*.7)} ${f1(-r*.6)} M0 ${f1(-r*2.0*(1-.4*dead))} l${f1(r*.7)} ${f1(-r*.6)}" style="stroke:${col};stroke-width:${f1(r*.13)};stroke-linecap:round;fill:none"/>`;
  [-2.4,-0.7].forEach(t=>{const L=r*1.6*(1-.5*dead);g+=`<path d="M${f1(Math.cos(t)*r*.6)} ${f1(-Math.sin(t)*r*.6+r*.4)} l${f1(Math.cos(t)*L)} ${f1(-Math.sin(t)*L*.4+L*.5)}" style="stroke:${col};stroke-width:${f1(r*.14)};stroke-linecap:round"/>`});
  if(opts.axonLen!==0){const L=opts.axonLen??r*3;g+=`<path d="M${f1(Math.cos(a)*r*.8)} ${f1(Math.sin(a)*r*.8)} L${f1(Math.cos(a)*L)} ${f1(Math.sin(a)*L)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.18)};stroke-linecap:round;${dead?'stroke-dasharray:'+f1(r*.5)+' '+f1(r*.4*dead):''}"/>`}
  g+=`<path d="M0 ${f1(-r*1.05)} L${f1(r*.95)} ${f1(r*.7)} L${f1(-r*.95)} ${f1(r*.7)}Z" style="fill:${fill};stroke:${col};stroke-width:${f1(Math.max(1.2,r*.13))};stroke-linejoin:round"/>`;
  g+=`<circle cy="${f1(r*.15)}" r="${f1(r*.3)}" style="fill:var(--nuc)"/>`;
  return g+'</g>'}
function lmn(x,y,r=12,o=1,opts={}){const a=opts.axon??0,dead=opts.dead||0,col=opts.col||'var(--lmn)',fill=opts.fill||'var(--lmn-soft)';
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${f1(o*(1-.55*dead))}">`;
  for(let i=0;i<5;i++){const t=a+Math.PI*.5+i*(Math.PI/4),L=r*(1.5+.4*Math.sin(i*2.1))*(1-.55*dead);
    g+=`<path d="M${f1(Math.cos(t)*r*.8)} ${f1(Math.sin(t)*r*.8)} Q${f1(Math.cos(t+.2)*L*.6)} ${f1(Math.sin(t+.2)*L*.6)} ${f1(Math.cos(t)*L)} ${f1(Math.sin(t)*L)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.15)};stroke-linecap:round"/>`}
  if(opts.axonLen!==0){const L=opts.axonLen??r*3.2;g+=`<path d="M${f1(Math.cos(a)*r*.85)} ${f1(Math.sin(a)*r*.85)} L${f1(Math.cos(a)*L)} ${f1(Math.sin(a)*L)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.2)};stroke-linecap:round;${dead?'stroke-dasharray:'+f1(r*.5)+' '+f1(r*.4*dead):''}"/>`}
  g+=`<polygon points="${[0,1,2,3,4,5].map(k=>{const t=k/6*Math.PI*2+.3,rr=r*(k%2?.92:1.05);return f1(Math.cos(t)*rr)+','+f1(Math.sin(t)*rr)}).join(' ')}" style="fill:${fill};stroke:${col};stroke-width:${f1(Math.max(1.2,r*.13))};stroke-linejoin:round"/>`;
  g+=`<circle r="${f1(r*.36)}" style="fill:var(--nuc)"/>`;
  return g+'</g>'}
function fibre(x,y,w,h,o=1,opts={}){const at=opts.atrophy||0,col=opts.col||'var(--muscle-line)',hh=h*(1-.55*at);
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${f1(o)}"><rect x="0" y="${f1(-hh/2)}" width="${f1(w)}" height="${f1(hh)}" rx="${f1(hh/2)}" style="fill:var(--muscle);stroke:${col};stroke-width:1.2"/>`;
  for(let i=1;i<6;i++)g+=`<line x1="${f1(w*i/6)}" x2="${f1(w*i/6)}" y1="${f1(-hh/2+2)}" y2="${f1(hh/2-2)}" style="stroke:${col};stroke-width:.8;opacity:.45"/>`;
  if(opts.flick)g+=`<rect x="0" y="${f1(-hh/2)}" width="${f1(w)}" height="${f1(hh)}" rx="${f1(hh/2)}" style="fill:var(--lmn);opacity:${f1(.55*opts.flick)}"/>`;
  return g+'</g>'}
function tdp(x,y,s=1,o=1,agg=0){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" style="opacity:${f1(o)}">`;
  if(agg>0){g+=`<path d="M-6 -4 q4 -6 9 -2 q6 -3 7 4 q2 6 -5 7 q-5 4 -9 -1 q-6 -2 -2 -8z" style="fill:var(--tdp);stroke:var(--tdp);stroke-width:1"/>`;
    if(agg>.5)g+=`<circle cx="7" cy="-6" r="2.4" style="fill:var(--warn)"/><circle cx="-7" cy="5" r="2.4" style="fill:var(--warn)"/>`}
  else g+=`<circle cx="-3" cy="0" r="3.2" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.2"/><circle cx="3.4" cy="0" r="3.2" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.2"/><path d="M6.4 0 q4 3 7 0" style="fill:none;stroke:var(--tdp);stroke-width:1.2"/>`;
  return g+'</g>'}
const REGIONS=['bulbar','cervical','thoracic','lumbosacral'];
function bodyMap(x,y,s=1,fill={},labels={}){const F=k=>clamp(fill[k]||0);
  const sh=(k,d)=>`<path d="${d}" style="fill:var(--tdp);fill-opacity:${f1(.12+.68*F(k))};stroke:var(--ink);stroke-width:${f1(1.2/s)};stroke-opacity:.55"/>`;
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">`;
  g+=sh('bulbar','M0 -112 a17 19 0 1 1 0.1 0z M-7 -78 h14 v8 h-14z');
  g+=sh('cervical','M-30 -68 h60 l4 10 h-68z M-34 -58 l-8 4 -14 64 10 3 16 -52z M34 -58 l8 4 14 64 -10 3 -16 -52z');
  g+=sh('thoracic','M-26 -58 h52 l-2 52 h-48z');
  g+=sh('lumbosacral','M-24 -6 h48 l2 20 -5 92 -12 0 -7 -76 -2 0 -7 76 -12 0 -5 -92z');
  const L=Object.assign({bulbar:'bulbar',cervical:'cervical (arms)',thoracic:'thoracic',lumbosacral:'lumbosacral (legs)'},labels);
  if(labels!==false&&!labels.hide){
    g+=`<text x="${f1(24)}" y="-104" class="t-xs">${L.bulbar}</text><text x="${f1(58)}" y="-30" class="t-xs">${L.cervical}</text><text x="${f1(-60)}" y="-30" class="t-xs t-end">${L.thoracic}</text><text x="${f1(28)}" y="60" class="t-xs">${L.lumbosacral}</text>`}
  return g+'</g>'}

/* a row of toggle buttons: opts [[value,label],...]; calls on(value) and keeps aria-pressed in step */
function toggleRow(el,opts,val,on){el.innerHTML=opts.map(([v,l])=>`<button class="btn" data-v="${v}" aria-pressed="${v===val}">${l}</button>`).join('');
  el.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;$$('[data-v]',el).forEach(x=>x.setAttribute('aria-pressed',x===b));on(b.dataset.v)})}
/* escape every & in a title (the module scripts use it; the shared nav has its own) */
const amp=s=>s.replace(/&/g,'&amp;');
