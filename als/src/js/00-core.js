<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('alsc:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('alsc:'+k,JSON.stringify(v))}catch(e){}}};
/* ---- interface strings ----
   Every piece of interface text the shared code writes is here, as whole phrases, so a
   translation replaces this block and nothing else in the core. Functions take the
   numbers they need, so word order can change with the language. */
const UI={
  play:'Play',pause:'Pause',replay:'Replay',prev:'← Previous',next:'Next →',
  part:g=>`Part ${g}`,steps:'Steps',
  stepOf:(i,n,t)=>`Step ${i} of ${n}: ${t}`,
  plain:'In plain words',hook:'Exam hook',
  theme:{auto:'Theme: auto',light:'Theme: light',dark:'Theme: dark'}
};
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
/* piecewise-linear interpolation through anchor points [[x,y],...] sorted by x */
function interp(pts,x){if(x<=pts[0][0])return pts[0][1];for(let i=1;i<pts.length;i++){if(x<=pts[i][0]){const a=pts[i-1],b=pts[i];return lerp(a[1],b[1],(x-a[0])/(b[0]-a[0]))}}return pts[pts.length-1][1]}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

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

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What ALS is',g:1,n:'1.1',d:'Who gets it, the numbers, the ways it starts'},
 {id:'neurons',t:'Upper and lower motor neurons',g:1,n:'1.2',d:'Two neurons, two sets of signs, animated'},
 {id:'tdp43',t:'TDP-43 and what goes wrong',g:1,n:'1.3',d:'A protein leaves the nucleus and clumps'},
 {id:'genes',t:'Genes: C9orf72, SOD1 and more',g:1,n:'1.4',d:'Familial ALS, repeat expansions, testing'},
 {id:'dx',t:'Diagnosis & criteria',g:2,n:'2.1',d:'Gold Coast, revised El Escorial and Awaji, as a calculator'},
 {id:'ddx',t:'The differential: ALS mimics',g:2,n:'2.2',d:'Conditions that can look like ALS, and how they differ'},
 {id:'course',t:'ALSFRS-R and the course',g:2,n:'2.3',d:'Scoring the 12 items, the progression rate, the stages'},
 {id:'drugs',t:'Riluzole, edaravone and others',g:3,n:'3.1',d:'What each drug targets and what the trials found'},
 {id:'tofersen',t:'Tofersen, gene-targeted',g:3,n:'3.2',d:'An antisense drug for SOD1-ALS, molecule to months'},
 {id:'breathing',t:'Breathing and NIV',g:3,n:'3.3',d:'Weak breathing muscles, the tests, when ventilation is offered'},
 {id:'nutrition',t:'Swallowing and feeding tubes',g:3,n:'3.4',d:'Why weight matters and when a gastrostomy is discussed'},
 {id:'living',t:'Living with ALS',g:4,n:'4.1',d:'Communication, cognition, symptoms, planning, end of life'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.2',d:'Assessment, giving the medicines, teaching, documentation'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.3',d:'Every route, with the evidence for each'},
 {id:'history',t:'History & people',g:5,n:'5.1',d:'From Charcot to tofersen'},
 {id:'review',t:'Flashcards & mnemonics',g:5,n:'5.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Diagnosis & course','g-st','c-st'],3:['Treatment & care','g-tx','c-tx'],4:['Living & the future','g-st','c-st'],5:['Context & review','g-st','c-st']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('alsc:tab');sessionStorage.setItem('alsc:tab','1')}catch(e){}
const amp=s=>s.replace(/&/g,'&amp;');
(function buildNav(){
  let h='';
  for(const g of Object.keys(GROUPS).map(Number)){
    h+=`<div class="navgroup ${GROUPS[g][1]}"><h3>${amp(GROUPS[g][0])}</h3><ol>`;
    MODS.filter(m=>m.g===g).forEach(m=>{h+=`<li><a class="navbtn" href="${href(m.id)}" data-go="${m.id}"><span class="n">${m.n}</span><span>${amp(m.t)}</span></a></li>`});
    h+='</ol></div>';
  }
  $('#navgroups').innerHTML=h;
  let u='';
  Object.keys(GROUPS).map(Number).forEach(g=>{
    u+=`<div class="unit"><p class="eyebrow">${UI.part(g)}</p><h2>${amp(GROUPS[g][0])}</h2><ol>`;
    MODS.filter(m=>m.g===g).forEach(m=>{u+=`<li><button data-go="${m.id}"><span class="n">${m.n}</span><b>${amp(m.t)}</b><small>${m.d}</small></button></li>`});
    u+='</ol></div>';
  });
  if($('#homeUnits'))$('#homeUnits').innerHTML=u;
  MODS.forEach((m,i)=>{
    const sec=$('#m-'+m.id);if(!sec)return;
    if(m.g)sec.classList.add(GROUPS[m.g][2]);
    if(m.id==='home')return;
    const p=MODS[i-1],n=MODS[i+1];
    const pg=document.createElement('div');pg.className='pager';
    pg.innerHTML=(p?`<button data-go="${p.id}"><small>${UI.prev}</small><span>${amp(p.t)}</span></button>`:'')+(n?`<button class="next" data-go="${n.id}"><small>${UI.next}</small><span>${amp(n.t)}</span></button>`:'');
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
/* language switch keeps the current module */
(function lang(){const a=$('#langBtn');if(!a)return;const base=a.getAttribute('href');
  const upd=()=>a.setAttribute('href',base+location.hash);['pointerdown','focus','click','mouseenter'].forEach(e=>a.addEventListener(e,upd));upd()})();
/* theme: auto → light → dark */
(function theme(){
  const btn=$('#themeBtn');const modes=['auto','light','dark'];let m=store.get('theme','auto');
  function apply(){if(m==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',m);btn.textContent=UI.theme[m]}
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
function playWire(rg,pb,draw,dur,doneLabel=UI.replay,hideKey){
  let stopA=null;function stop(){if(stopA)stopA();stopA=null;pb.textContent=UI.play}
  rg.addEventListener('input',()=>{stop();draw(+rg.value)});
  rg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pb.click()}});
  if(!rg.getAttribute('aria-keyshortcuts'))rg.setAttribute('aria-keyshortcuts','Enter Space');
  pb.addEventListener('click',()=>{if(stopA){stop();return}let t0=+rg.value;const mx=+rg.max||1,mn=+rg.min||0;if(t0>=mx-(mx-mn)*.01)t0=mn;pb.textContent=UI.pause;
    stopA=animate((mx-t0)/(mx-mn)*dur,p=>{const t=t0+(mx-t0)*p;rg.value=t;draw(t)},()=>{stopA=null;pb.textContent=doneLabel})});
  if(hideKey){const prev=onHide[hideKey];onHide[hideKey]=()=>{prev&&prev();stop()}}
  if(hideKey){const prevR=redraws[hideKey];redraws[hideKey]=()=>{prevR&&prevR();stop();draw(+rg.value)}}
  return stop;
}
/* stepper buttons that jump the timeline */
function stepWire(el,steps,rg,draw,stop){
  el.innerHTML=steps.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('');
  el.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop&&stop();const s=steps[+b.dataset.st];rg.value=s.at;draw(s.at)});
  el.setAttribute('role','group');el.setAttribute('aria-label',UI.steps);
  return i=>{$$('[data-st]',el).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
    /* screen readers hear the step name, not a bare number, when the slider moves */
    if(rg&&steps[i])rg.setAttribute('aria-valuetext',UI.stepOf(i+1,steps.length,steps[i].t))};
}
function phaseOf(steps,t){let p=0;steps.forEach((s,i)=>{if(t>=s.from)p=i});return p}
function noteHTML(P){return `<div class="kicker">${P.k||''}</div><h4>${P.t}</h4>${P.txt?`<p>${P.txt}</p>`:''}${P.pt?`<div class="pt"><b>${UI.plain}</b>${P.pt}</div>`:''}${P.hook?`<div class="hook"><b>${UI.hook}</b>${P.hook}</div>`:''}`}
/* a row of toggle buttons: opts [[value,label],...]; calls on(value) and keeps aria-pressed in step */
function toggleRow(el,opts,val,on){el.innerHTML=opts.map(([v,l])=>`<button class="btn" data-v="${v}" aria-pressed="${v===val}">${l}</button>`).join('');
  el.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;$$('[data-v]',el).forEach(x=>x.setAttribute('aria-pressed',x===b));on(b.dataset.v)})}
