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
const SOURCES=[{"key": "Abe2014", "text": "Abe K, Itoyama Y, Sobue G, Tsuji S, Aoki M, Doyu M, et al. Confirmatory double-blind, parallel-group, placebo-controlled study of efficacy and safety of edaravone (MCI-186) in amyotrophic lateral sclerosis patients. Amyotroph Lateral Scler Frontotemporal Degener. 2014;15(7-8):610-617. PMID 25286015. PMCID PMC4266079. doi:10.3109/21678421.2014.959024. (Abstract read)", "link": "https://doi.org/10.3109/21678421.2014.959024", "areas": ["E"], "unverified": false}, {"key": "Abrahams2014", "text": "Abrahams S, Newton J, Niven E, Foley J, Bak TH. Screening for cognition and behaviour changes in ALS. Amyotroph Lateral Scler Frontotemporal Degener. 2014;15(1-2):9-14. PMID 23781974. doi:10.3109/21678421.2013.805784. (Abstract read)", "link": "https://doi.org/10.3109/21678421.2013.805784", "areas": ["G", "H"], "unverified": false}, {"key": "Aggarwal2002", "text": "Aggarwal A, Nicholson G. Detection of preclinical motor neurone loss in SOD1 mutation carriers using motor unit number estimation. J Neurol Neurosurg Psychiatry. 2002;73(2):199-201. PMID 12122184. PMCID PMC1737965. doi:10.1136/jnnp.73.2.199. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.73.2.199", "areas": ["B"], "unverified": false}, {"key": "Aiello2026", "text": "Aiello EN, De Luca G, Curti B, Torre S, Gendarini C, Cocuzza A, et al. Prevalence and determinants of anxiety in amyotrophic lateral sclerosis. BJPsych Open. 2026;12(3):e114. PMID 42027125. PMCID PMC13122346. doi:10.1192/bjo.2026.11025. (Abstract read)", "link": "https://doi.org/10.1192/bjo.2026.11025", "areas": ["G"], "unverified": false}, {"key": "Akimoto2014", "text": "Akimoto C, Volk AE, van Blitterswijk M, Van den Broeck M, Leblond CS, Lumbroso S, et al. A blinded international study on the reliability of genetic testing for GGGGCC-repeat expansions in C9orf72 reveals marked differences in results among 14 laboratories. J Med Genet. 2014;51(6):419-24. PMID 24706941. PMCID PMC4033024. doi:10.1136/jmedgenet-2014-102360. (Abstract read)", "link": "https://doi.org/10.1136/jmedgenet-2014-102360", "areas": ["C"], "unverified": false}, {"key": "Albanese2022", "text": "Albanese A, Ludolph AC, McDermott CJ, Corcia P, Van Damme P, et al. Tauroursodeoxycholic acid in patients with amyotrophic lateral sclerosis: The TUDCA-ALS trial protocol. Front Neurol. 2022;13:1009113. PMID 36237618. PMCID PMC9552801. doi:10.3389/fneur.2022.1009113. (Record only; Europe PMC listing, not separately checked on PubMed esummary)", "link": "https://doi.org/10.3389/fneur.2022.1009113", "areas": ["I"], "unverified": false}, {"key": "Albrecht1999", "text": "Albrecht GL, Devlieger PJ. The disability paradox: high quality of life against all odds. Soc Sci Med. 1999;48(8):977-988. PMID 10390038. doi:10.1016/s0277-9536(98)00411-0. (Abstract read)", "link": "https://doi.org/10.1016/s0277-9536(98)00411-0", "areas": ["G"], "unverified": false}, {"key": "AlChalabi2010", "text": "Al-Chalabi A, Fang F, Hanby MF, Leigh PN, Shaw CE, Ye W, et al. An estimate of amyotrophic lateral sclerosis heritability using twin data. J Neurol Neurosurg Psychiatry. 2010;81(12):1324-6. PMID 20861059. PMCID PMC2988617. doi:10.1136/jnnp.2010.207464. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.2010.207464", "areas": ["C"], "unverified": false}, {"key": "AlChalabi2021", "text": "Al-Chalabi A, Chiò A, Merrill C, Oster G, Bornheimer R, Agnese W, et al. Clinical staging in amyotrophic lateral sclerosis: analysis of Edaravone Study 19. J Neurol Neurosurg Psychiatry. 2021;92(2):165-171. PMID 33109706. PMCID PMC7841496. doi:10.1136/jnnp-2020-323271. (Full text read)", "link": "https://doi.org/10.1136/jnnp-2020-323271", "areas": ["A"], "unverified": false}, {"key": "Alencar2026", "text": "Alencar MA, Gonçalves JMW, D Allembert D, Rangel MFA, Gomes PCF, de Souza LC. Falls in people with amyotrophic lateral sclerosis: A prospective study. Braz J Phys Ther. 2026;30(5):101623. PMID 42585850. PMCID PMC13487603. doi:10.1016/j.bjpt.2026.101623. (Abstract read)", "link": "https://doi.org/10.1016/j.bjpt.2026.101623", "areas": ["H"], "unverified": false}, {"key": "Alexianu1994", "text": "Alexianu ME, Ho BK, Mohamed AH, La Bella V, Smith RG, Appel SH. The role of calcium-binding proteins in selective motoneuron vulnerability in amyotrophic lateral sclerosis. Ann Neurol. 1994;36(6):846-858. PMID 7998770. doi:10.1002/ana.410360608. (Abstract read)", "link": "https://doi.org/10.1002/ana.410360608", "areas": ["B"], "unverified": false}, {"key": "AlKhleifat2026", "text": "Al Khleifat A, Malaspina A, Kirby J, Tree T, Shaw PJ, Leigh PN, et al. TRICALS risk score augments but cannot replace neurofilament as a prognostic biomarker in ALS. J Neurol. 2026;273(10):643. PMID 42836993. PMCID PMC13642438. doi:10.1007/s00415-026-14040-4. (Abstract read)", "link": "https://doi.org/10.1007/s00415-026-14040-4", "areas": ["I"], "unverified": false}, {"key": "Alliance2020", "text": "International Alliance of ALS/MND Associations. Briefing Note: Off-Label/Unproven Treatments (PDF hosted by MND Australia). (unverified: seen only as a search-result summary, not opened)", "link": "", "areas": ["I"], "unverified": true}, {"key": "Alonso2009", "text": "Alonso A, Logroscino G, Jick SS, Hernán MA. Incidence and lifetime risk of motor neuron disease in the United Kingdom: a population-based study. Eur J Neurol. 2009;16(6):745-751. PMID 19475756. PMCID PMC3093130. doi:10.1111/j.1468-1331.2009.02586.x. (Abstract read)", "link": "https://doi.org/10.1111/j.1468-1331.2009.02586.x", "areas": ["A"], "unverified": false}, {"key": "Alqahtani2018", "text": "Alqahtani JS, Worsley P, Voegeli D. Effect of Humidified Noninvasive Ventilation on the Development of Facial Skin Breakdown. Respir Care. 2018;63(9):1102-1110. PMID 30166409. doi:10.4187/respcare.06087. (Abstract read)", "link": "https://doi.org/10.4187/respcare.06087", "areas": ["H"], "unverified": false}, {"key": "ALSNewsToday2025", "text": "ALS News Today (Shapiro L). AB Science to launch new Phase 3 trial of masitinib for ALS. 31 January 2025. (Web page read)", "link": "", "areas": ["I"], "unverified": false}, {"key": "Amylyx2024", "text": "Amylyx Pharmaceuticals. Press releases filed as SEC Form 8-K Exhibit 99.1: PHOENIX topline results (8 Mar 2024) and formal intention to remove RELYVRIO/ALBRIOZA from the market (4 Apr 2024). (Read; company statements, not peer reviewed)", "link": "", "areas": ["E"], "unverified": false}, {"key": "Andersen1995", "text": "Andersen PM, Nilsson P, Ala-Hurula V, Keränen ML, Tarvainen I, Haltia T, et al. Amyotrophic lateral sclerosis associated with homozygosity for an Asp90Ala mutation in CuZn-superoxide dismutase. Nat Genet. 1995;10(1):61-6. PMID 7647793. doi:10.1038/ng0595-61. (Abstract read)", "link": "https://doi.org/10.1038/ng0595-61", "areas": ["C"], "unverified": false}, {"key": "Andersen1996", "text": "Andersen PM, Forsgren L, Binzer M, Nilsson P, Ala-Hurula V, Keränen ML, et al. Autosomal recessive adult-onset amyotrophic lateral sclerosis associated with homozygosity for Asp90Ala CuZn-superoxide dismutase mutation. A clinical and genealogical study of 36 patients. Brain. 1996;119(Pt 4):1153-72. PMID 8813280. doi:10.1093/brain/119.4.1153. (Abstract read)", "link": "https://doi.org/10.1093/brain/119.4.1153", "areas": ["C"], "unverified": false}, {"key": "Andersen2012EFNS", "text": "EFNS Task Force on Diagnosis and Management of Amyotrophic Lateral Sclerosis; Andersen PM, Abrahams S, Borasio GD, de Carvalho M, Chio A, et al. EFNS guidelines on the clinical management of amyotrophic lateral sclerosis (MALS)--revised report of an EFNS task force. Eur J Neurol. 2012;19(3):360-375. PMID 21914052. doi:10.1111/j.1468-1331.2011.03501.x. (Abstract read; investigation list read as reproduced in Garnier2024)", "link": "https://doi.org/10.1111/j.1468-1331.2011.03501.x", "areas": ["D", "E", "F", "G", "H"], "unverified": false}, {"key": "Andrews2018", "text": "Andrews JA, Meng L, Kulke SF, Rudnicki SA, Wolff AA, Bozik ME, et al. Association Between Decline in Slow Vital Capacity and Respiratory Insufficiency, Use of Assisted Ventilation, Tracheostomy, or Death in Patients With Amyotrophic Lateral Sclerosis. JAMA Neurol. 2018;75(1):58-64. PMID 29181534. PMCID PMC5833488. doi:10.1001/jamaneurol.2017.3339. (Abstract read)", "link": "https://doi.org/10.1001/jamaneurol.2017.3339", "areas": ["F"], "unverified": false}, {"key": "Andrews2020", "text": "Andrews JA, Jackson CE, Heiman-Patterson TD, Bettica P, Brooks BR, Pioro EP. Real-world evidence of riluzole effectiveness in treating amyotrophic lateral sclerosis. Amyotroph Lateral Scler Frontotemporal Degener. 2020;21(7-8):509-518. PMID 32573277. doi:10.1080/21678421.2020.1771734. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2020.1771734", "areas": ["E"], "unverified": false}, {"key": "Aoun2012", "text": "Aoun SM, Connors SL, Priddis L, Breen LJ, Colyer S. Motor Neurone Disease family carers' experiences of caring, palliative care and bereavement: an exploratory qualitative study. Palliat Med. 2012;26(6):842-850. PMID 21775409. doi:10.1177/0269216311416036. (Abstract read)", "link": "https://doi.org/10.1177/0269216311416036", "areas": ["G"], "unverified": false}, {"key": "Aoun2016", "text": "Aoun SM, Breen LJ, Howting D, Edis R, Oliver D, Henderson R, et al. Receiving the news of a diagnosis of motor neuron disease: What does it take to make it better? Amyotroph Lateral Scler Frontotemporal Degener. 2016;17(3-4):168-178. PMID 26609553. doi:10.3109/21678421.2015.1111907. (Abstract read)", "link": "https://doi.org/10.3109/21678421.2015.1111907", "areas": ["D", "H"], "unverified": false}, {"key": "APM2015", "text": "Association for Palliative Medicine of Great Britain and Ireland. Withdrawal of Assisted Ventilation at the Request of a Patient with Motor Neurone Disease: Guidance for Professionals. Version 1.0, November 2015 (review date October 2017). PDF hosted by LOROS: https://loros.co.uk/assets/guidance-with-logos-updated-210316.pdf (Full text read: summary and position statement)", "link": "https://loros.co.uk/assets/guidance-with-logos-updated-210316.pdf", "areas": ["F"], "unverified": false}, {"key": "Arai2006", "text": "Arai T, Hasegawa M, Akiyama H, Ikeda K, Nonaka T, Mori H, et al. TDP-43 is a component of ubiquitin-positive tau-negative inclusions in frontotemporal lobar degeneration and amyotrophic lateral sclerosis. Biochem Biophys Res Commun. 2006;351(3):602-611. PMID 17084815. doi:10.1016/j.bbrc.2006.10.093. (Abstract read)", "link": "https://doi.org/10.1016/j.bbrc.2006.10.093", "areas": ["B"], "unverified": false}, {"key": "Arevalo2016", "text": "Arevalo-Rodriguez I, Ciapponi A, Roqué i Figuls M, Muñoz L, Bonfill Cosp X. Posture and fluids for preventing post-dural puncture headache. Cochrane Database Syst Rev. 2016;3(3):CD009199. PMID 26950232. PMCID PMC6682345. doi:10.1002/14651858.CD009199.pub3. (Abstract read)", "link": "https://doi.org/10.1002/14651858.cd009199.pub3", "areas": ["H"], "unverified": false}, {"key": "Arthur2016", "text": "Arthur KC, Calvo A, Price TR, Geiger JT, Chiò A, Traynor BJ. Projected increase in amyotrophic lateral sclerosis from 2015 to 2040. Nat Commun. 2016;7:12408. PMID 27510634. PMCID PMC4987527. doi:10.1038/ncomms12408. (Full text read)", "link": "https://doi.org/10.1038/ncomms12408", "areas": ["A"], "unverified": false}, {"key": "Atassi2014", "text": "Atassi N, Berry J, Shui A, Zach N, Sherman A, Sinani E, et al. The PRO-ACT database: design, initial analyses, and predictive features. Neurology. 2014;83(19):1719-1725. PMID 25298304. PMCID PMC4239834. doi:10.1212/WNL.0000000000000951. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0000000000000951", "areas": ["A"], "unverified": false}, {"key": "Atsuta2006", "text": "Atsuta N, Watanabe H, Ito M, Banno H, Suzuki K, Katsuno M, et al. Natural history of spinal and bulbar muscular atrophy (SBMA): a study of 223 Japanese patients. Brain. 2006;129(Pt 6):1446-1455. PMID 16621916. doi:10.1093/brain/awl096. (Abstract read)", "link": "https://doi.org/10.1093/brain/awl096", "areas": ["D"], "unverified": false}, {"key": "Audrain2023", "text": "Audrain M, Egesipe AL, Tentillier N, Font L, Ratnam M, Mottier L, et al. Targeting amyotrophic lateral sclerosis by neutralizing seeding-competent TDP-43 in CSF. Brain Commun. 2023;5(6):fcad306. PMID 38025276. PMCID PMC10644982. doi:10.1093/braincomms/fcad306. (Abstract read)", "link": "https://doi.org/10.1093/braincomms/fcad306", "areas": ["I"], "unverified": false}, {"key": "Ayala2008", "text": "Ayala YM, Zago P, D'Ambrogio A, Xu YF, Petrucelli L, Buratti E, et al. Structural determinants of the cellular localization and shuttling of TDP-43. J Cell Sci. 2008;121(Pt 22):3778-3785. PMID 18957508. doi:10.1242/jcs.038950. (Abstract read)", "link": "https://doi.org/10.1242/jcs.038950", "areas": ["B"], "unverified": false}, {"key": "Bach2002", "text": "Bach JR. Amyotrophic lateral sclerosis: prolongation of life by noninvasive respiratory AIDS. Chest. 2002;122(1):92-98. PMID 12114343. doi:10.1378/chest.122.1.92. (Abstract read)", "link": "https://doi.org/10.1378/chest.122.1.92", "areas": ["F"], "unverified": false}, {"key": "Balendra2014", "text": "Balendra R, Jones A, Jivraj N, Knights C, Ellis CM, Burman R, et al. Estimating clinical stage of amyotrophic lateral sclerosis from the ALS Functional Rating Scale. Amyotroph Lateral Scler Frontotemporal Degener. 2014;15(3-4):279-284. PMID 24720420. doi:10.3109/21678421.2014.897357. (Abstract read)", "link": "https://doi.org/10.3109/21678421.2014.897357", "areas": ["A"], "unverified": false}, {"key": "Balendra2018", "text": "Balendra R, Isaacs AM. C9orf72-mediated ALS and FTD: multiple pathways to disease. Nat Rev Neurol. 2018;14(9):544-558. PMID 30120348. PMCID PMC6417666. doi:10.1038/s41582-018-0047-2. (Abstract read)", "link": "https://doi.org/10.1038/s41582-018-0047-2", "areas": ["B", "C"], "unverified": false}, {"key": "Bali2017", "text": "Bali T, Self W, Liu J, Siddique T, Wang LH, Bird TD, et al. Defining SOD1 ALS natural history to guide therapeutic clinical trial design. J Neurol Neurosurg Psychiatry. 2017;88(2):99-105. PMID 27261500. PMCID PMC5136332. doi:10.1136/jnnp-2016-313521. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2016-313521", "areas": ["C"], "unverified": false}, {"key": "Ball2004", "text": "Ball LJ, Beukelman DR, Pattee GL. Acceptance of Augmentative and Alternative Communication Technology by Persons with Amyotrophic Lateral Sclerosis. Augment Altern Commun. 2004;20(2):113-122. No PMID found. doi:10.1080/0743461042000216596. (Full text read, author-hosted PDF at atia.org; metadata from Crossref)", "link": "https://doi.org/10.1080/0743461042000216596", "areas": ["G"], "unverified": false}, {"key": "Baloh2022", "text": "Baloh RH, Johnson JP, Avalos P, Allred P, Svendsen S, Gowing G, et al. Transplantation of human neural progenitor cells secreting GDNF into the spinal cord of patients with ALS: a phase 1/2a trial. Nat Med. 2022;28(9):1813-1822. PMID 36064599. PMCID PMC9499868. doi:10.1038/s41591-022-01956-3. (Abstract read)", "link": "https://doi.org/10.1038/s41591-022-01956-3", "areas": ["I"], "unverified": false}, {"key": "Bannwarth2014", "text": "Bannwarth S, Ait-El-Mkadem S, Chaussenot A, Genin EC, Lacas-Gervais S, Fragaki K, et al. A mitochondrial origin for frontotemporal dementia and amyotrophic lateral sclerosis through CHCHD10 involvement. Brain. 2014;137(Pt 8):2329-45. PMID 24934289. PMCID PMC4107737. doi:10.1093/brain/awu138. (Abstract read)", "link": "https://doi.org/10.1093/brain/awu138", "areas": ["C"], "unverified": false}, {"key": "Barber2010", "text": "Barber SC, Shaw PJ. Oxidative stress in ALS: key role in motor neuron injury and therapeutic target. Free Radic Biol Med. 2010;48(5):629-641. PMID 19969067. doi:10.1016/j.freeradbiomed.2009.11.018. (Abstract read)", "link": "https://doi.org/10.1016/j.freeradbiomed.2009.11.018", "areas": ["B"], "unverified": false}, {"key": "Barel2024", "text": "Barel D, Marom D, Ponger P, Kurolap A, Bar-Shira A, Kaplan-Ber I, et al. Genetic diagnosis and detection rates using C9orf72 repeat expansion and a multi-gene panel in amyotrophic lateral sclerosis. J Neurol. 2024;271(7):4258-4266. PMID 38625400. doi:10.1007/s00415-024-12368-3. (Abstract read)", "link": "https://doi.org/10.1007/s00415-024-12368-3", "areas": ["C"], "unverified": false}, {"key": "BaseballHallGehrig", "text": "National Baseball Hall of Fame and Museum. Lou Gehrig (Hall of Famer page). https://baseballhall.org/hall-of-famers/gehrig-lou (Web page read; streak of 2130 consecutive games ended 2 May 1939; died 2 June 1941)", "link": "https://baseballhall.org/hall-of-famers/gehrig-lou", "areas": ["A"], "unverified": false}, {"key": "Baughn2023", "text": "Baughn MW, Melamed Z, López-Erauskin J, Beccari MS, Ling K, Zuberi A, et al. Mechanism of STMN2 cryptic splice-polyadenylation and its correction for TDP-43 proteinopathies. Science. 2023;379(6637):1140-1149. PMID 36927019. PMCID PMC10148063. doi:10.1126/science.abq5622. (Abstract read)", "link": "https://doi.org/10.1126/science.abq5622", "areas": ["I"], "unverified": false}, {"key": "Becker2017", "text": "Becker LA, Huang B, Bieri G, Ma R, Knowles DA, Jafar-Nejad P, et al. Therapeutic reduction of ataxin-2 extends lifespan and reduces pathology in TDP-43 mice. Nature. 2017;544(7650):367-371. PMID 28405022. PMCID PMC5642042. doi:10.1038/nature22038. (Abstract read)", "link": "https://doi.org/10.1038/nature22038", "areas": ["I"], "unverified": false}, {"key": "Bede2011", "text": "Bede P, Oliver D, Stodart J, van den Berg L, Simmons Z, O Brannagáin D, et al. Palliative care in amyotrophic lateral sclerosis: a review of current international guidelines and initiatives. J Neurol Neurosurg Psychiatry. 2011;82(4):413-418. PMID 21297150. doi:10.1136/jnnp.2010.232637. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.2010.232637", "areas": ["G"], "unverified": false}, {"key": "Bedlack2016", "text": "Bedlack RS, Vaughan T, Wicks P, Heywood J, Sinani E, Selsov R, et al. How common are ALS plateaus and reversals? Neurology. 2016;86(9):808-812. PMID 26658909. PMCID PMC4793781. doi:10.1212/WNL.0000000000002251. (Full text read)", "link": "https://doi.org/10.1212/wnl.0000000000002251", "areas": ["A"], "unverified": false}, {"key": "Beers2019", "text": "Beers DR, Appel SH. Immune dysregulation in amyotrophic lateral sclerosis: mechanisms and emerging therapies. Lancet Neurol. 2019;18(2):211-220. PMID 30663610. doi:10.1016/S1474-4422(18)30394-6. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(18)30394-6", "areas": ["B"], "unverified": false}, {"key": "Benatar2016", "text": "Benatar M, Stanislaw C, Reyes E, Hussain S, Cooley A, Fernandez MC, et al. Presymptomatic ALS genetic counseling and testing: Experience and recommendations. Neurology. 2016;86(24):2295-302. PMID 27194384. PMCID PMC4909562. doi:10.1212/WNL.0000000000002773. (Abstract read; full text on the PMC article page read through a fetch tool that returned quoted passages)", "link": "https://doi.org/10.1212/wnl.0000000000002773", "areas": ["C"], "unverified": false}, {"key": "Benatar2018", "text": "Benatar M, Wuu J, Andersen PM, Lombardi V, Malaspina A. Neurofilament light: A candidate biomarker of presymptomatic amyotrophic lateral sclerosis and phenoconversion. Ann Neurol. 2018;84(1):130-139. PMID 30014505. PMCID PMC11348288. doi:10.1002/ana.25276. (Abstract read)", "link": "https://doi.org/10.1002/ana.25276", "areas": ["B", "I"], "unverified": false}, {"key": "Benatar2022a", "text": "Benatar M, Wuu J, Andersen PM, Bucelli RC, Andrews JA, Otto M, et al. Design of a Randomized, Placebo-Controlled, Phase 3 Trial of Tofersen Initiated in Clinically Presymptomatic SOD1 Variant Carriers: the ATLAS Study. Neurotherapeutics. 2022;19(4):1248-1258. PMID 35585374. PMCID PMC9587202. doi:10.1007/s13311-022-01237-4. (Full text read)", "link": "https://doi.org/10.1007/s13311-022-01237-4", "areas": ["I"], "unverified": false}, {"key": "Benatar2022b", "text": "Benatar M, Granit V, Andersen PM, Grignon AL, McHutchison C, Cosentino S, et al. Mild motor impairment as prodromal state in amyotrophic lateral sclerosis: a new diagnostic entity. Brain. 2022;145(10):3500-3508. PMID 35594156. PMCID PMC9586537. doi:10.1093/brain/awac185. (Abstract read)", "link": "https://doi.org/10.1093/brain/awac185", "areas": ["I"], "unverified": false}, {"key": "Benatar2025a", "text": "Benatar M, Cai X, McDermott MP, Granit V, Grignon AL, Colato D, et al. Proposed Research Criteria for Mild Motor Impairment as a Prodromal Syndrome in Amyotrophic Lateral Sclerosis. Neurology. 2025;105(4):e213917. PMID 40720712. PMCID PMC12296636. doi:10.1212/WNL.0000000000213917. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0000000000213917", "areas": ["I"], "unverified": false}, {"key": "Benatar2025b", "text": "Benatar M, Robertson J, Andersen PM. Amyotrophic lateral sclerosis caused by SOD1 variants: from genetic discovery to disease prevention. Lancet Neurol. 2025;24(1):77-86. PMID 39706636. doi:10.1016/S1474-4422(24)00479-4. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(24)00479-4", "areas": ["I"], "unverified": false}, {"key": "Benatar2025c", "text": "Benatar M, Heiman-Patterson TD, Cooper-Knock J, Brickman D, Casaletto KB, Goutman SA, et al. Guidance for clinical management of pathogenic variant carriers at elevated genetic risk for ALS/FTD. J Neurol Neurosurg Psychiatry. 2025;96(3):209-218. PMID 39572211. PMCID PMC12015018. doi:10.1136/jnnp-2024-334339. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2024-334339", "areas": ["I"], "unverified": false}, {"key": "Benatar2025d", "text": "Benatar M, Staffaroni AM, Wuu J, McDermott MP, Quintana M, Swidler J, et al. Design considerations for C9orf72 disease prevention trials. Brain. 2025;148(11):3844-3855. PMID 40794569. PMCID PMC12588679. doi:10.1093/brain/awaf290. (Abstract read)", "link": "https://doi.org/10.1093/brain/awaf290", "areas": ["I"], "unverified": false}, {"key": "Benatar2025e", "text": "Benatar M, McDermott C, Turner MR, van Eijk RPA. Rethinking phase 2 trials in amyotrophic lateral sclerosis. Brain. 2025;148(4):1106-1111. PMID 39657109. PMCID PMC11969460. doi:10.1093/brain/awae396. (Abstract read)", "link": "https://doi.org/10.1093/brain/awae396", "areas": ["I"], "unverified": false}, {"key": "Bensimon1994", "text": "Bensimon G, Lacomblez L, Meininger V. A controlled trial of riluzole in amyotrophic lateral sclerosis. ALS/Riluzole Study Group. N Engl J Med. 1994;330(9):585-591. PMID 8302340. doi:10.1056/NEJM199403033300901. (Abstract read)", "link": "https://doi.org/10.1056/nejm199403033300901", "areas": ["A", "B", "E"], "unverified": false}, {"key": "Bensimon2025", "text": "Bensimon G, Leigh PN, Tree T, Malaspina A, Payan CA, et al. Efficacy and safety of low-dose IL-2 as an add-on therapy to riluzole (MIROCALS): a phase 2b, double-blind, randomised, placebo-controlled trial. Lancet. 2025;405(10492):1837-1850. PMID 40354799. doi:10.1016/S0140-6736(25)00262-4. (Abstract read)", "link": "https://doi.org/10.1016/s0140-6736(25)00262-4", "areas": ["I"], "unverified": false}, {"key": "Bergstrom1987", "text": "Bergstrom N, Braden BJ, Laguzza A, Holman V. The Braden Scale for Predicting Pressure Sore Risk. Nurs Res. 1987;36(4):205-10. PMID 3299278. (no DOI in PubMed record) (Abstract read)", "link": "https://pubmed.ncbi.nlm.nih.gov/3299278/", "areas": ["H"], "unverified": false}, {"key": "Berlowitz2023", "text": "Berlowitz DJ, Mathers S, Hutchinson K, Hogden A, Carey KA, Graco M, et al. The complexity of multidisciplinary respiratory care in amyotrophic lateral sclerosis. Breathe (Sheff). 2023;19(3):220269. PMID 37830099. PMCID PMC10567075. doi:10.1183/20734735.0269-2022. (Full text read)", "link": "https://doi.org/10.1183/20734735.0269-2022", "areas": ["F"], "unverified": false}, {"key": "Biogen2023", "text": "Ionis/Biogen press release, 25 Apr 2023, \"FDA approves QALSODY (tofersen)...\" (via BioSpace). (Read; company statement)", "link": "", "areas": ["E"], "unverified": false}, {"key": "Biogen2024", "text": "Biogen and Ionis. Topline Phase 1/2 study results of investigational drug in ALS (BIIB105), 16 May 2024, reprinted on BioSpace. (Web page read)", "link": "", "areas": ["I"], "unverified": false}, {"key": "Bischoff2022", "text": "Bischoff SC, Austin P, Boeykens K, Chourdakis M, Cuerda C, Jonkers-Schuitema C, et al. ESPEN practical guideline: Home enteral nutrition. Clin Nutr. 2022;41(2):468-488. PMID 35007816. doi:10.1016/j.clnu.2021.10.018. (Full text read)", "link": "https://doi.org/10.1016/j.clnu.2021.10.018", "areas": ["H"], "unverified": false}, {"key": "Bleazard2025", "text": "Bleazard L, Palmer J, Wenzel D, Jeffery T, Faull C. Assisted ventilation withdrawal in motor neuron disease: updated results. BMJ Support Palliat Care. 2025;15(3):396-399 (article e005389). PMID 40127921. PMCID PMC12128755. doi:10.1136/spcare-2025-005389. (Full text read, via WebFetch)", "link": "https://doi.org/10.1136/spcare-2025-005389", "areas": ["F"], "unverified": false}, {"key": "Blexrud1993", "text": "Blexrud MD, Windebank AJ, Daube JR. Long-term follow-up of 121 patients with benign fasciculations. Ann Neurol. 1993;34(4):622-625. PMID 8215252. doi:10.1002/ana.410340419. (Abstract read)", "link": "https://doi.org/10.1002/ana.410340419", "areas": ["D", "H"], "unverified": false}, {"key": "Boddy2025", "text": "Boddy SL, Simpson RM, Walters SJ, Bamford H, Walsh T, McDermott CJ; PROSEC3 Study Group. Estimating the minimum important difference in the ALSFRS-R-instrument in people living with MND. Amyotroph Lateral Scler Frontotemporal Degener. 2025;26(3-4):249-258. PMID 39898446. PMCID PMC12011019. doi:10.1080/21678421.2024.2447916. (Full text read)", "link": "https://doi.org/10.1080/21678421.2024.2447916", "areas": ["A"], "unverified": false}, {"key": "Boillee2006", "text": "Boillee S, Yamanaka K, Lobsiger CS, Copeland NG, Jenkins NA, Kassiotis G, et al. Onset and progression in inherited ALS determined by motor neurons and microglia. Science. 2006;312(5778):1389-1392. PMID 16741123. doi:10.1126/science.1123511. (Abstract read)", "link": "https://doi.org/10.1126/science.1123511", "areas": ["B"], "unverified": false}, {"key": "Bonduelle1990", "text": "Bonduelle M. [Aran-Duchenne? Duchenne-Aran? The quarrel around progressive muscular atrophy]. Rev Neurol (Paris). 1990;146(2):97-106. PMID 2181591. (Abstract read; no DOI)", "link": "https://pubmed.ncbi.nlm.nih.gov/2181591/", "areas": ["A"], "unverified": false}, {"key": "Bosco2010", "text": "Bosco DA, Morfini G, Karabacak NM, Song Y, Gros-Louis F, Pasinelli P, et al. Wild-type and mutant SOD1 share an aberrant conformation and a common pathogenic pathway in ALS. Nat Neurosci. 2010;13(11):1396-1403. PMID 20953194. PMCID PMC2967729. doi:10.1038/nn.2660. (Abstract read)", "link": "https://doi.org/10.1038/nn.2660", "areas": ["B"], "unverified": false}, {"key": "Bourke2006", "text": "Bourke SC, Tomlinson M, Williams TL, Bullock RE, Shaw PJ, Gibson GJ. Effects of non-invasive ventilation on survival and quality of life in patients with amyotrophic lateral sclerosis: a randomised controlled trial. Lancet Neurol. 2006;5(2):140-147. PMID 16426990. doi:10.1016/S1474-4422(05)70326-4. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(05)70326-4", "areas": ["A", "F", "H"], "unverified": false}, {"key": "Bouteloup2009", "text": "Bouteloup C, Desport JC, Clavelou P, Guy N, Derumeaux-Burel H, Ferrier A, et al. Hypermetabolism in ALS patients: an early and persistent phenomenon. J Neurol. 2009;256(8):1236-1242. PMID 19306035. doi:10.1007/s00415-009-5100-z. (Abstract read)", "link": "https://doi.org/10.1007/s00415-009-5100-z", "areas": ["F"], "unverified": false}, {"key": "Bowman2015", "text": "Bowman M, Racke M, Kissel J, Imitola J. Responsibilities of Health Care Professionals in Counseling and Educating Patients With Incurable Neurological Diseases Regarding \"Stem Cell Tourism\": Caveat Emptor. JAMA Neurol. 2015;72(11):1342-1345. PMID 26322563. doi:10.1001/jamaneurol.2015.1891. (Abstract read)", "link": "https://doi.org/10.1001/jamaneurol.2015.1891", "areas": ["I"], "unverified": false}, {"key": "Brettschneider2013", "text": "Brettschneider J, Del Tredici K, Toledo JB, Robinson JL, Irwin DJ, Grossman M, et al. Stages of pTDP-43 pathology in amyotrophic lateral sclerosis. Ann Neurol. 2013;74(1):20-38. PMID 23686809. PMCID PMC3785076. doi:10.1002/ana.23937. (Full text read)", "link": "https://doi.org/10.1002/ana.23937", "areas": ["B"], "unverified": false}, {"key": "Brooks1994", "text": "Brooks BR. El Escorial World Federation of Neurology criteria for the diagnosis of amyotrophic lateral sclerosis. J Neurol Sci. 1994;124 Suppl:96-107. PMID 7807156. doi:10.1016/0022-510x(94)90191-0. (Record read; no abstract)", "link": "https://doi.org/10.1016/0022-510x(94)90191-0", "areas": ["A", "D"], "unverified": false}, {"key": "Brooks2000", "text": "Brooks BR, Miller RG, Swash M, Munsat TL; World Federation of Neurology Research Group on Motor Neuron Diseases. El Escorial revisited: revised criteria for the diagnosis of amyotrophic lateral sclerosis. Amyotroph Lateral Scler Other Motor Neuron Disord. 2000;1(5):293-299. PMID 11464847. doi:10.1080/146608200300079536. (Record read; no abstract)", "link": "https://doi.org/10.1080/146608200300079536", "areas": ["A", "D"], "unverified": false}, {"key": "Brooks2004", "text": "Brooks BR, Thisted RA, Appel SH, Bradley WG, Olney RK, Berg JE, et al. Treatment of pseudobulbar affect in ALS with dextromethorphan/quinidine: a randomized trial. Neurology. 2004;63(8):1364-1370. PMID 15505150. doi:10.1212/01.wnl.0000142042.50528.2f. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000142042.50528.2f", "areas": ["E", "F"], "unverified": false}, {"key": "Brooks2013", "text": "Brooks BR, Crumpacker D, Fellus J, Kantor D, Kaye RE. PRISM: a novel research tool to assess the prevalence of pseudobulbar affect symptoms across neurological conditions. PLoS One. 2013;8(8):e72232. PMID 23991068. PMCID PMC3749118. doi:10.1371/journal.pone.0072232. (Full text read)", "link": "https://doi.org/10.1371/journal.pone.0072232", "areas": ["H"], "unverified": false}, {"key": "Brooks2019", "text": "Brooks BR, Bettica P, Cazzaniga S. Riluzole Oral Suspension: Bioavailability Following Percutaneous Gastrostomy Tube-modeled Administration Versus Direct Oral Administration. Clin Ther. 2019;41(12):2490-2499. PMID 31635890. doi:10.1016/j.clinthera.2019.09.016. (Abstract read)", "link": "https://doi.org/10.1016/j.clinthera.2019.09.016", "areas": ["H"], "unverified": false}, {"key": "Brooks2022", "text": "Brooks BR, Pioro EP, Katz J, Takahashi F, Takei K, Zhang J, et al. Slowing the loss of physical function in amyotrophic lateral sclerosis with edaravone: Post hoc analysis of ALSFRS-R item scores in pivotal study MCI186-19. Muscle Nerve. 2022;65(2):180-186. PMID 34816454. PMCID PMC9299623. doi:10.1002/mus.27467. (Full text read)", "link": "https://doi.org/10.1002/mus.27467", "areas": ["A"], "unverified": false}, {"key": "Brown2022", "text": "Brown AL, Wilkins OG, Keuss MJ, Kargbo-Hill SE, Zanovello M, Lee WC, et al. TDP-43 loss and ALS-risk SNPs drive mis-splicing and depletion of UNC13A. Nature. 2022;603(7899):131-137. PMID 35197628. PMCID PMC8891020. doi:10.1038/s41586-022-04436-3. (Abstract read)", "link": "https://doi.org/10.1038/s41586-022-04436-3", "areas": ["B", "I"], "unverified": false}, {"key": "Bruijn1998", "text": "Bruijn LI, Houseweart MK, Kato S, Anderson KL, Anderson SD, Ohama E, et al. Aggregation and motor neuron toxicity of an ALS-linked SOD1 mutant independent from wild-type SOD1. Science. 1998;281(5384):1851-4. PMID 9743498. doi:10.1126/science.281.5384.1851. (Abstract read)", "link": "https://doi.org/10.1126/science.281.5384.1851", "areas": ["C"], "unverified": false}, {"key": "BTS2017template", "text": "British Thoracic Society. Web appendix 4: local oxygen policy template, \"Prescription and Administration of Oxygen in Adults\" (based on BTS Guideline 2017). https://www.brit-thoracic.org.uk/document-library/guidelines/emergency-oxygen/web-appendix-4-local-oxygen-policy-template (Full text read)", "link": "https://www.brit-thoracic.org.uk/document-library/guidelines/emergency-oxygen/web-appendix-4-local-oxygen-policy-template", "areas": ["H"], "unverified": false}, {"key": "Buratti2001", "text": "Buratti E, Dork T, Zuccato E, Pagani F, Romano M, Baralle FE. Nuclear factor TDP-43 and SR proteins promote in vitro and in vivo CFTR exon 9 skipping. EMBO J. 2001;20(7):1774-1784. PMID 11285240. PMCID PMC145463. doi:10.1093/emboj/20.7.1774. (Abstract read)", "link": "https://doi.org/10.1093/emboj/20.7.1774", "areas": ["B"], "unverified": false}, {"key": "Burgos2018ESPEN", "text": "Burgos R, Bretón I, Cereda E, Desport JC, Dziewas R, Genton L, et al. ESPEN guideline clinical nutrition in neurology. Clin Nutr. 2018;37(1):354-396. PMID 29274834. doi:10.1016/j.clnu.2017.09.003. (Full text read: ALS section, recommendations 1-22, from the University of Geneva open archive)", "link": "https://doi.org/10.1016/j.clnu.2017.09.003", "areas": ["F"], "unverified": false}, {"key": "Burke2017", "text": "Burke T, Pinto-Grau M, Lonergan K, Bede P, O'Sullivan M, Heverin M, et al. A Cross-sectional population-based investigation into behavioral change in amyotrophic lateral sclerosis: subphenotypes, staging, cognitive predictors, and survival. Ann Clin Transl Neurol. 2017;4(5):305-317. PMID 28491898. PMCID PMC5420811. doi:10.1002/acn3.407. (Abstract read)", "link": "https://doi.org/10.1002/acn3.407", "areas": ["G"], "unverified": false}, {"key": "Byrne2011", "text": "Byrne S, Walsh C, Lynch C, Bede P, Elamin M, Kenna K, et al. Rate of familial amyotrophic lateral sclerosis: a systematic review and meta-analysis. J Neurol Neurosurg Psychiatry. 2011;82(6):623-627. PMID 21047878. doi:10.1136/jnnp.2010.224501. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.2010.224501", "areas": ["A", "C"], "unverified": false}, {"key": "Byrne2012", "text": "Byrne S, Elamin M, Bede P, Shatunov A, Walsh C, Corr B, et al. Cognitive and clinical characteristics of patients with amyotrophic lateral sclerosis carrying a C9orf72 repeat expansion: a population-based cohort study. Lancet Neurol. 2012;11(3):232-240. PMID 22305801. PMCID PMC3315021. doi:10.1016/S1474-4422(12)70014-5. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(12)70014-5", "areas": ["A", "C"], "unverified": false}, {"key": "Caligari2013", "text": "Caligari M, Godi M, Guglielmetti S, Franchignoni F, Nardone A. Eye tracking communication devices in amyotrophic lateral sclerosis: impact on disability and quality of life. Amyotroph Lateral Scler Frontotemporal Degener. 2013;14(7-8):546-52. PMID 23834069. doi:10.3109/21678421.2013.803576. (Abstract read)", "link": "https://doi.org/10.3109/21678421.2013.803576", "areas": ["H"], "unverified": false}, {"key": "Card2024", "text": "Card NS, Wairagkar M, Iacobacci C, Hou X, Singer-Clark T, Willett FR, et al. An Accurate and Rapidly Calibrating Speech Neuroprosthesis. N Engl J Med. 2024;391(7):609-618. PMID 39141853. PMCID PMC11328962. doi:10.1056/NEJMoa2314132. (Abstract read)", "link": "https://doi.org/10.1056/nejmoa2314132", "areas": ["G"], "unverified": false}, {"key": "Casiraghi2023", "text": "Casiraghi A, Gentile A, Marjanovic I, Chiò A. Crushing riluzole tablets: evaluation of loss of powder and active principle in a home-simulation experiment. Amyotroph Lateral Scler Frontotemporal Degener. 2023;24(7-8):634-640. PMID 37584401. doi:10.1080/21678421.2023.2245860. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2023.2245860", "areas": ["H"], "unverified": false}, {"key": "CastrilloViguera2010", "text": "Castrillo-Viguera C, Grasso DL, Simpson E, Shefner J, Cudkowicz ME. Clinical significance in the change of decline in ALSFRS-R. Amyotroph Lateral Scler. 2010;11(1-2):178-180. PMID 19634063. doi:10.3109/17482960903093710. (Abstract read)", "link": "https://doi.org/10.3109/17482960903093710", "areas": ["A"], "unverified": false}, {"key": "Cave2021", "text": "Cave R, Bloch S. Voice banking for people living with motor neurone disease: Views and expectations. Int J Lang Commun Disord. 2021;56(1):116-129. PMID 33350040. doi:10.1111/1460-6984.12588. (Abstract read)", "link": "https://doi.org/10.1111/1460-6984.12588", "areas": ["G"], "unverified": false}, {"key": "CBS2016IceBucket", "text": "CBS News / Associated Press. Ice Bucket Challenge funds ALS gene discovery. 27 July 2016. https://www.cbsnews.com/news/ice-bucket-challenge-funds-als-gene-discovery/ (Web page read)", "link": "https://www.cbsnews.com/news/ice-bucket-challenge-funds-als-gene-discovery/", "areas": ["A"], "unverified": false}, {"key": "Cedarbaum1999", "text": "Cedarbaum JM, Stambler N, Malta E, Fuller C, Hilt D, Thurmond B, et al. The ALSFRS-R: a revised ALS functional rating scale that incorporates assessments of respiratory function. BDNF ALS Study Group (Phase III). J Neurol Sci. 1999;169(1-2):13-21. PMID 10540002. doi:10.1016/s0022-510x(99)00210-5. (Abstract read)", "link": "https://doi.org/10.1016/s0022-510x(99)00210-5", "areas": ["A", "H"], "unverified": false}, {"key": "CENTAURprotocol2019", "text": "Amylyx Pharmaceuticals. AMX0035 in Patients With Amyotrophic Lateral Sclerosis (CENTAUR), protocol AMX3500 version 6.0, 11 Jan 2019, Appendix I \"El Escorial World Federation of Neurology criteria for the diagnosis of ALS\" (text taken from www.wfnals.org). ClinicalTrials.gov NCT03127514. (Full text of appendix read)", "link": "", "areas": ["D"], "unverified": false}, {"key": "CGTLive2023", "text": "CGTLive. FDA AdComm votes down BrainStorm Cell Therapeutics' NurOwn. 27 September 2023. (Web page read)", "link": "", "areas": ["I"], "unverified": false}, {"key": "Chau2025", "text": "Chau I, Stoker E, Gill J, Newton J; United Kingdom Motor Neuron Disease Nurses and Allied Health Professionals Consortium. An Evaluation of the United Kingdom Motor Neuron Disease Nurses and Allied Health Professionals (UK MND NAHP) Workforce: A Census. PLoS One. 2025;20(7):e0319628. PMID 40644503. PMCID PMC12250277. doi:10.1371/journal.pone.0319628. (Abstract read)", "link": "https://doi.org/10.1371/journal.pone.0319628", "areas": ["H"], "unverified": false}, {"key": "Chaudhary2022", "text": "Chaudhary U, Vlachos I, Zimmermann JB, Espinosa A, Tonin A, Jaramillo-Gonzalez A, et al. Spelling interface using intracortical signals in a completely locked-in patient enabled via auditory neurofeedback training. Nat Commun. 2022;13(1):1236. PMID 35318316. PMCID PMC8941070. doi:10.1038/s41467-022-28859-8. (Abstract read)", "link": "https://doi.org/10.1038/s41467-022-28859-8", "areas": ["G"], "unverified": false}, {"key": "Chen2007", "text": "Chen H, Richard M, Sandler DP, Umbach DM, Kamel F. Head injury and amyotrophic lateral sclerosis. Am J Epidemiol. 2007;166(7):810-816. PMID 17641152. PMCID PMC2239342. doi:10.1093/aje/kwm153. (Abstract read)", "link": "https://doi.org/10.1093/aje/kwm153", "areas": ["A"], "unverified": false}, {"key": "Chen2018", "text": "Chen JH, Wu SC, Chen HJ, Kao CH, Tseng CH, Tsai CH. Risk of developing pressure sore in amyotrophic lateral sclerosis patients - a nationwide cohort study. J Eur Acad Dermatol Venereol. 2018;32(9):1589-1596. PMID 29512203. doi:10.1111/jdv.14911. (Abstract read)", "link": "https://doi.org/10.1111/jdv.14911", "areas": ["H"], "unverified": false}, {"key": "Chia2018", "text": "Chia R, Chiò A, Traynor BJ. Novel genes associated with amyotrophic lateral sclerosis: diagnostic and clinical implications. Lancet Neurol. 2018;17(1):94-102. PMID 29154141. PMCID PMC5901717. doi:10.1016/S1474-4422(17)30401-5. (Full text read, author manuscript)", "link": "https://doi.org/10.1016/s1474-4422(17)30401-5", "areas": ["C"], "unverified": false}, {"key": "Chio2004", "text": "Chiò A, Gauthier A, Montuschi A, Calvo A, Di Vito N, Ghiglione P, et al. A cross sectional study on determinants of quality of life in ALS. J Neurol Neurosurg Psychiatry. 2004;75(11):1597-1601. PMID 15489393. PMCID PMC1738825. doi:10.1136/jnnp.2003.033100. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.2003.033100", "areas": ["G"], "unverified": false}, {"key": "Chio2005", "text": "Chiò A, Gauthier A, Calvo A, Ghiglione P, Mutani R. Caregiver burden and patients' perception of being a burden in ALS. Neurology. 2005;64(10):1780-1782. PMID 15911811. doi:10.1212/01.WNL.0000162034.06268.37. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000162034.06268.37", "areas": ["G"], "unverified": false}, {"key": "Chio2009", "text": "Chiò A, Logroscino G, Hardiman O, Swingler R, Mitchell D, Beghi E, et al. Prognostic factors in ALS: A critical review. Amyotroph Lateral Scler. 2009;10(5-6):310-323. PMID 19922118. PMCID PMC3515205. doi:10.3109/17482960802566824. (Abstract read)", "link": "https://doi.org/10.3109/17482960802566824", "areas": ["A"], "unverified": false}, {"key": "Chio2009soccer", "text": "Chio A, Calvo A, Dossena M, Ghiglione P, Mutani R, Mora G. ALS in Italian professional soccer players: the risk is still present and could be soccer-specific. Amyotroph Lateral Scler. 2009;10(4):205-209. PMID 19267274. doi:10.1080/17482960902721634. (Abstract read)", "link": "https://doi.org/10.1080/17482960902721634", "areas": ["A"], "unverified": false}, {"key": "Chio2010", "text": "Chiò A, Calvo A, Ghiglione P, Mazzini L, Mutani R, Mora G; PARALS. Tracheostomy in amyotrophic lateral sclerosis: a 10-year population-based study in Italy. J Neurol Neurosurg Psychiatry. 2010;81(10):1141-1143. PMID 20660920. doi:10.1136/jnnp.2009.175984. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.2009.175984", "areas": ["G"], "unverified": false}, {"key": "Chio2011", "text": "Chiò A, Calvo A, Moglia C, Mazzini L, Mora G; PARALS study group. Phenotypic heterogeneity of amyotrophic lateral sclerosis: a population based study. J Neurol Neurosurg Psychiatry. 2011;82(7):740-746. PMID 21402743. doi:10.1136/jnnp.2010.235952. (Abstract read; full text blocked)", "link": "https://doi.org/10.1136/jnnp.2010.235952", "areas": ["A"], "unverified": false}, {"key": "Chio2012", "text": "Chiò A, Ilardi A, Cammarosano S, Moglia C, Montuschi A, Calvo A. Neurobehavioral dysfunction in ALS has a negative effect on outcome and use of PEG and NIV. Neurology. 2012;78(14):1085-1089. PMID 22442427. doi:10.1212/WNL.0b013e31824e8f53. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0b013e31824e8f53", "areas": ["G"], "unverified": false}, {"key": "Chio2012Pain", "text": "Chiò A, Canosa A, Gallo S, Moglia C, Ilardi A, Cammarosano S, et al. Pain in amyotrophic lateral sclerosis: a population-based controlled study. Eur J Neurol. 2012;19(4):551-5. PMID 21972798. doi:10.1111/j.1468-1331.2011.03540.x. (Abstract read)", "link": "https://doi.org/10.1111/j.1468-1331.2011.03540.x", "areas": ["H"], "unverified": false}, {"key": "Chio2013", "text": "Chiò A, Logroscino G, Traynor BJ, Collins J, Simeone JC, Goldstein LA, et al. Global epidemiology of amyotrophic lateral sclerosis: a systematic review of the published literature. Neuroepidemiology. 2013;41(2):118-130. PMID 23860588. PMCID PMC4049265. doi:10.1159/000351153. (Abstract read)", "link": "https://doi.org/10.1159/000351153", "areas": ["A"], "unverified": false}, {"key": "Chio2015MiToS", "text": "Chiò A, Hammond ER, Mora G, Bonito V, Filippini G. Development and evaluation of a clinical staging system for amyotrophic lateral sclerosis. J Neurol Neurosurg Psychiatry. 2015;86(1):38-44. PMID 24336810. doi:10.1136/jnnp-2013-306589. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2013-306589", "areas": ["A"], "unverified": false}, {"key": "ChioBorasio2004", "text": "Chiò A, Borasio GD. Breaking the news in amyotrophic lateral sclerosis. Amyotroph Lateral Scler Other Motor Neuron Disord. 2004;5(4):195-201. PMID 15799546. doi:10.1080/14660820310017326. (Abstract read)", "link": "https://doi.org/10.1080/14660820310017326", "areas": ["D"], "unverified": false}, {"key": "Cichero2017", "text": "Cichero JA, Lam P, Steele CM, Hanson B, Chen J, Dantas RO, et al. Development of International Terminology and Definitions for Texture-Modified Foods and Thickened Fluids Used in Dysphagia Management: The IDDSI Framework. Dysphagia. 2017;32(2):293-314. PMID 27913916. PMCID PMC5380696. doi:10.1007/s00455-016-9758-y. (Abstract read)", "link": "https://doi.org/10.1007/s00455-016-9758-y", "areas": ["F"], "unverified": false}, {"key": "Cirulli2015", "text": "Cirulli ET, Lasseigne BN, Petrovski S, Sapp PC, Dion PA, Leblond CS, et al. Exome sequencing in amyotrophic lateral sclerosis identifies risk genes and pathways. Science. 2015;347(6229):1436-41. PMID 25700176. PMCID PMC4437632. doi:10.1126/science.aaa3650. (Abstract read)", "link": "https://doi.org/10.1126/science.aaa3650", "areas": ["C"], "unverified": false}, {"key": "Clemens2008", "text": "Clemens KE, Klaschik E. Morphine in the management of dyspnoea in ALS. A pilot study. Eur J Neurol. 2008;15(5):445-450. PMID 18355309. doi:10.1111/j.1468-1331.2008.02102.x. (Abstract read)", "link": "https://doi.org/10.1111/j.1468-1331.2008.02102.x", "areas": ["G", "H"], "unverified": false}, {"key": "ClinGen2026", "text": "Clinical Genome Resource (ClinGen). Gene-Disease Validity curations, Amyotrophic Lateral Sclerosis Spectrum Disorders Gene Curation Expert Panel (affiliation 40096). CSV download from https://search.clinicalgenome.org/kb/gene-validity/download, file created 2026-10-20; accessed 2026-10-20. (Database record read)", "link": "https://search.clinicalgenome.org/kb/gene-validity/download,", "areas": ["C"], "unverified": false}, {"key": "Conte2012", "text": "Conte A, Lattante S, Zollino M, Marangi G, Luigetti M, Del Grande A, et al. P525L FUS mutation is consistently associated with a severe form of juvenile amyotrophic lateral sclerosis. Neuromuscul Disord. 2012;22(1):73-5. PMID 21907581. doi:10.1016/j.nmd.2011.08.003. (Abstract read)", "link": "https://doi.org/10.1016/j.nmd.2011.08.003", "areas": ["C"], "unverified": false}, {"key": "Corcia2008", "text": "Corcia P, Pradat PF, Salachas F, Bruneteau G, Forestier Nl, Seilhean D, et al. Causes of death in a post-mortem series of ALS patients. Amyotroph Lateral Scler. 2008;9(1):59-62. PMID 17924236. doi:10.1080/17482960701656940. (Abstract read)", "link": "https://doi.org/10.1080/17482960701656940", "areas": ["G"], "unverified": false}, {"key": "Costa2012", "text": "Costa J, Swash M, de Carvalho M. Awaji criteria for the diagnosis of amyotrophic lateral sclerosis: a systematic review. Arch Neurol. 2012;69(11):1410-1416. PMID 22892641. doi:10.1001/archneurol.2012.254. (Abstract read)", "link": "https://doi.org/10.1001/archneurol.2012.254", "areas": ["D"], "unverified": false}, {"key": "Cousin2026", "text": "Cousin MA, Dagli AI, Mignon L, Shah JS, Prudencio M, Gendron TF, et al. N-of-1 investigational study of a novel antisense oligonucleotide drug in CHCHD10-related ALS shows early signs of efficacy. Med. 2026;7(10):101295. PMID 42735682. PMCID PMC13580205. doi:10.1016/j.medj.2026.101295. (Abstract read)", "link": "https://doi.org/10.1016/j.medj.2026.101295", "areas": ["I"], "unverified": false}, {"key": "CoxSacks2002", "text": "Cox PA, Sacks OW. Cycad neurotoxins, consumption of flying foxes, and ALS-PDC disease in Guam. Neurology. 2002;58(6):956-959. PMID 11914415. doi:10.1212/wnl.58.6.956. (Abstract read)", "link": "https://doi.org/10.1212/wnl.58.6.956", "areas": ["A"], "unverified": false}, {"key": "CTgov_ADORE", "text": "ClinicalTrials.gov NCT05178810. A Multicenter, Randomized, Double-blind, Placebo-controlled Study to Investigate the Efficacy and Safety of FAB122 in Patients With ALS (ADORE). Posted results. (Record read)", "link": "https://clinicaltrials.gov/study/NCT05178810", "areas": ["E"], "unverified": false}, {"key": "CTgov_ATLAS", "text": "ClinicalTrials.gov NCT04856982. Phase 3 trial of BIIB067 (tofersen) in clinically presymptomatic adults with a SOD1 mutation (ATLAS). (Record read)", "link": "https://clinicaltrials.gov/study/NCT04856982", "areas": ["E"], "unverified": false}, {"key": "CTgov_MT1186A02", "text": "ClinicalTrials.gov NCT04569084. Phase 3b study of oral edaravone for 48 weeks (MT-1186-A02). Posted results; terminated for futility. (Record read)", "link": "https://clinicaltrials.gov/study/NCT04569084", "areas": ["E"], "unverified": false}, {"key": "CTgov_PHOENIX", "text": "ClinicalTrials.gov NCT05021536. Phase III trial of AMX0035 vs placebo for 48 weeks (PHOENIX). No posted results. (Record read)", "link": "https://clinicaltrials.gov/study/NCT05021536", "areas": ["E"], "unverified": false}, {"key": "Cudkowicz1997", "text": "Cudkowicz ME, McKenna-Yasek D, Sapp PE, Chin W, Geller B, Hayden DL, et al. Epidemiology of mutations in superoxide dismutase in amyotrophic lateral sclerosis. Ann Neurol. 1997;41(2):210-21. PMID 9029070. doi:10.1002/ana.410410212. (Abstract read)", "link": "https://doi.org/10.1002/ana.410410212", "areas": ["C"], "unverified": false}, {"key": "Cudkowicz2013", "text": "Cudkowicz ME, van den Berg LH, Shefner JM, Mitsumoto H, Mora JS, Ludolph A, et al. Dexpramipexole versus placebo for patients with amyotrophic lateral sclerosis (EMPOWER): a randomised, double-blind, phase 3 trial. Lancet Neurol. 2013;12(11):1059-1067. PMID 24067398. doi:10.1016/S1474-4422(13)70221-7. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(13)70221-7", "areas": ["E"], "unverified": false}, {"key": "Cudkowicz2014", "text": "Cudkowicz ME, Titus S, Kearney M, Yu H, Sherman A, Schoenfeld D, et al. Safety and efficacy of ceftriaxone for amyotrophic lateral sclerosis: a multi-stage, randomised, double-blind, placebo-controlled trial. Lancet Neurol. 2014;13(11):1083-1091. PMID 25297012. PMCID PMC4216315. doi:10.1016/S1474-4422(14)70222-4. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(14)70222-4", "areas": ["E"], "unverified": false}, {"key": "Cudkowicz2022", "text": "Cudkowicz ME, Lindborg SR, Goyal NA, Miller RG, Burford MJ, Berry JD, et al. A randomized placebo-controlled phase 3 study of mesenchymal stem cells induced to secrete high levels of neurotrophic factors in amyotrophic lateral sclerosis. Muscle Nerve. 2022;65(3):291-302. PMID 34890069. PMCID PMC9305113. doi:10.1002/mus.27472. (Abstract read)", "link": "https://doi.org/10.1002/mus.27472", "areas": ["I"], "unverified": false}, {"key": "Cudkowicz2026", "text": "Cudkowicz ME, Shefner J, van den Berg LH, Chio A, Fan D, Großkreutz J, et al. Safety, tolerability, and efficacy of RIPK1 inhibitor, SAR443820, in amyotrophic lateral sclerosis (HIMALAYA): a multicentre, randomised, double-blind, placebo-controlled, phase 2 trial. Lancet Neurol. 2026;25(10):900-910. PMID 42716044. doi:10.1016/S1474-4422(26)00277-2. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(26)00277-2", "areas": ["I"], "unverified": false}, {"key": "Czaplinski2006", "text": "Czaplinski A, Yen AA, Appel SH. Forced vital capacity (FVC) as an indicator of survival and disease progression in an ALS clinic population. J Neurol Neurosurg Psychiatry. 2006;77(3):390-392. PMID 16484652. PMCID PMC2077717. doi:10.1136/jnnp.2005.072660. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.2005.072660", "areas": ["A", "F"], "unverified": false}, {"key": "DaCruz2017", "text": "Da Cruz S, Bui A, Saberi S, Lee SK, Stauffer J, McAlonis-Downes M, et al. Misfolded SOD1 is not a primary component of sporadic ALS. Acta Neuropathol. 2017;134(1):97-111. PMID 28247063. PMCID PMC5472502. doi:10.1007/s00401-017-1688-8. (Abstract read)", "link": "https://doi.org/10.1007/s00401-017-1688-8", "areas": ["B"], "unverified": false}, {"key": "Davenport1996", "text": "Davenport RJ, Swingler RJ, Chancellor AM, Warlow CP. Avoiding false positive diagnoses of motor neuron disease: lessons from the Scottish Motor Neuron Disease Register. J Neurol Neurosurg Psychiatry. 1996;60(2):147-151. PMID 8708642. PMCID PMC1073793. doi:10.1136/jnnp.60.2.147. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.60.2.147", "areas": ["D"], "unverified": false}, {"key": "deCarvalho2008", "text": "de Carvalho M, Dengler R, Eisen A, England JD, Kaji R, Kimura J, et al. Electrodiagnostic criteria for diagnosis of ALS. Clin Neurophysiol. 2008;119(3):497-503. PMID 18164242. doi:10.1016/j.clinph.2007.09.143. (Abstract read)", "link": "https://doi.org/10.1016/j.clinph.2007.09.143", "areas": ["B", "D"], "unverified": false}, {"key": "deCarvalho2013", "text": "de Carvalho M, Swash M. Origin of fasciculations in amyotrophic lateral sclerosis and benign fasciculation syndrome. JAMA Neurol. 2013;70(12):1562-1565. PMID 24145758. doi:10.1001/jamaneurol.2013.4437. (Abstract read)", "link": "https://doi.org/10.1001/jamaneurol.2013.4437", "areas": ["B"], "unverified": false}, {"key": "deCarvalhoSwash2024", "text": "de Carvalho M, Swash M. Diagnosis and differential diagnosis of MND/ALS: IFCN handbook chapter. Clin Neurophysiol Pract. 2024;9:27-38. PMID 38249779. PMCID PMC10796809. doi:10.1016/j.cnp.2023.12.003. (Full text read)", "link": "https://doi.org/10.1016/j.cnp.2023.12.003", "areas": ["D"], "unverified": false}, {"key": "DeJesusHernandez2011", "text": "DeJesus-Hernandez M, Mackenzie IR, Boeve BF, Boxer AL, Baker M, Rutherford NJ, et al. Expanded GGGGCC hexanucleotide repeat in noncoding region of C9ORF72 causes chromosome 9p-linked FTD and ALS. Neuron. 2011;72(2):245-256. PMID 21944778. PMCID PMC3202986. doi:10.1016/j.neuron.2011.09.011. (Abstract read)", "link": "https://doi.org/10.1016/j.neuron.2011.09.011", "areas": ["A", "B", "C"], "unverified": false}, {"key": "deJongh2022", "text": "de Jongh AD, Braun N, Weber M, van Es MA, Masrori P, Veldink JH, et al. Characterising ALS disease progression according to El Escorial and Gold Coast criteria. J Neurol Neurosurg Psychiatry. 2022;93(8):865-870. PMID 35654584. doi:10.1136/jnnp-2022-328823. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2022-328823", "areas": ["D"], "unverified": false}, {"key": "Deng2011", "text": "Deng HX, Chen W, Hong ST, Boycott KM, Gorrie GH, Siddique N, et al. Mutations in UBQLN2 cause dominant X-linked juvenile and adult-onset ALS and ALS/dementia. Nature. 2011;477(7363):211-5. PMID 21857683. PMCID PMC3169705. doi:10.1038/nature10353. (Abstract read)", "link": "https://doi.org/10.1038/nature10353", "areas": ["C"], "unverified": false}, {"key": "Desnuelle2026", "text": "Desnuelle C, Couratier P, Corcia P, Arcelin T, Nevoret C, Duburcq A, et al. The economic burden of amyotrophic lateral sclerosis for patients and families: a survey on out-of-pocket expenses and income loss in France. Orphanet J Rare Dis. 2026;21(1):194. PMID 41917957. PMCID PMC13162408. doi:10.1186/s13023-026-04326-1. (Abstract read)", "link": "https://doi.org/10.1186/s13023-026-04326-1", "areas": ["G"], "unverified": false}, {"key": "Desport1999", "text": "Desport JC, Preux PM, Truong TC, Vallat JM, Sautereau D, Couratier P. Nutritional status is a prognostic factor for survival in ALS patients. Neurology. 1999;53(5):1059-1063. PMID 10496266. doi:10.1212/wnl.53.5.1059. (Abstract read)", "link": "https://doi.org/10.1212/wnl.53.5.1059", "areas": ["F"], "unverified": false}, {"key": "deWit2018", "text": "de Wit J, Bakker LA, van Groenestijn AC, van den Berg LH, Schröder CD, Visser-Meily JMA, et al. Caregiver burden in amyotrophic lateral sclerosis: A systematic review. Palliat Med. 2018;32(1):231-245. PMID 28671483. PMCID PMC5784458. doi:10.1177/0269216317709965. (Abstract read)", "link": "https://doi.org/10.1177/0269216317709965", "areas": ["G"], "unverified": false}, {"key": "DiPALS2015", "text": "DiPALS Writing Committee; DiPALS Study Group Collaborators. Safety and efficacy of diaphragm pacing in patients with respiratory insufficiency due to amyotrophic lateral sclerosis (DiPALS): a multicentre, open-label, randomised controlled trial. Lancet Neurol. 2015;14(9):883-892. PMID 26234554. doi:10.1016/S1474-4422(15)00152-0. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(15)00152-0", "areas": ["F"], "unverified": false}, {"key": "Doble1996", "text": "Doble A. The pharmacology and mechanism of action of riluzole. Neurology. 1996;47(6 Suppl 4):S233-S241. PMID 8959995. doi:10.1212/wnl.47.6_suppl_4.233s. (Abstract read)", "link": "https://doi.org/10.1212/wnl.47.6_suppl_4.233s", "areas": ["B"], "unverified": false}, {"key": "Dorst2019", "text": "Dorst J, Ludolph AC. Non-invasive ventilation in amyotrophic lateral sclerosis. Ther Adv Neurol Disord. 2019;12:1756286419857040. PMID 31258624. PMCID PMC6589990. doi:10.1177/1756286419857040. (Full text read)", "link": "https://doi.org/10.1177/1756286419857040", "areas": ["F"], "unverified": false}, {"key": "Dreyer2012", "text": "Dreyer PS, Felding M, Klitnæs CS, Lorenzen CK. Withdrawal of invasive home mechanical ventilation in patients with advanced amyotrophic lateral sclerosis: ten years of Danish experience. J Palliat Med. 2012;15(2):205-209. PMID 22283411. doi:10.1089/jpm.2011.0133. (Abstract read)", "link": "https://doi.org/10.1089/jpm.2011.0133", "areas": ["G"], "unverified": false}, {"key": "Drory2003", "text": "Drory VE, Birnbaum M, Peleg L, Goldman B, Korczyn AD. Hexosaminidase A deficiency is an uncommon cause of a syndrome mimicking amyotrophic lateral sclerosis. Muscle Nerve. 2003;28(1):109-112. PMID 12811781. doi:10.1002/mus.10371. (Abstract read)", "link": "https://doi.org/10.1002/mus.10371", "areas": ["D"], "unverified": false}, {"key": "Drory2007", "text": "Drory VE, Artmonov I. Earlier onset and shorter survival of amyotrophic lateral sclerosis in Jewish patients of North African origin. A clue to modifying genetic factors? J Neurol Sci. 2007;258(1-2):39-43. PMID 17408694. doi:10.1016/j.jns.2007.02.021. (Abstract read)", "link": "https://doi.org/10.1016/j.jns.2007.02.021", "areas": ["C"], "unverified": false}, {"key": "DrugsFDA", "text": "US FDA. Drugs@FDA database (api.fda.gov/drug/drugsfda): NDA 020599 Rilutek; 209080 Tiglutik; 212640 Exservan; 209176 Radicava; 215446 Radicava ORS; 216660 Relyvrio; 215887 Qalsody; 021879 Nuedexta (original approval dates and marketing status). (Registry read)", "link": "", "areas": ["E"], "unverified": false}, {"key": "DVLA2026", "text": "Driver and Vehicle Licensing Agency (GOV.UK). \"Motor neurone disease and driving\" (https://www.gov.uk/motor-neurone-disease-and-driving) and \"Assessing fitness to drive: neurological disorders - chronic neurological disorders\" (https://www.gov.uk/guidance/neurological-disorders-assessing-fitness-to-drive). Accessed 20 October 2026. (Web pages read)", "link": "https://www.gov.uk/motor-neurone-disease-and-driving", "areas": ["G"], "unverified": false}, {"key": "eCFR3318", "text": "38 CFR 3.318, Presumptive service connection for amyotrophic lateral sclerosis (source 73 FR 54693, 23 September 2008; amended 87 FR 26126, 3 May 2022). Cornell LII eCFR page. (Regulation text read)", "link": "", "areas": ["A"], "unverified": false}, {"key": "EdaravoneALS16Group2017", "text": "Edaravone (MCI-186) ALS 16 Study Group. A post-hoc subgroup analysis of outcomes in the first phase III clinical study of edaravone (MCI-186) in amyotrophic lateral sclerosis. Amyotroph Lateral Scler Frontotemporal Degener. 2017;18(sup1):11-19. PMID 28872917. doi:10.1080/21678421.2017.1363780. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2017.1363780", "areas": ["E"], "unverified": false}, {"key": "EdaravoneALS18Group2017", "text": "Writing Group on behalf of the Edaravone (MCI-186) ALS 18 Study Group. Exploratory double-blind, parallel-group, placebo-controlled study of edaravone (MCI-186) in amyotrophic lateral sclerosis (Japan ALS severity classification: Grade 3, requiring assistance for eating, excretion or ambulation). Amyotroph Lateral Scler Frontotemporal Degener. 2017;18(sup1):40-48. PMID 28872915. doi:10.1080/21678421.2017.1361441. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2017.1361441", "areas": ["E"], "unverified": false}, {"key": "Eisen2012", "text": "Eisen A, Kuwabara S. The split hand syndrome in amyotrophic lateral sclerosis. J Neurol Neurosurg Psychiatry. 2012;83(4):399-403. PMID 22100761. doi:10.1136/jnnp-2011-301456. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2011-301456", "areas": ["B"], "unverified": false}, {"key": "Eisen2017", "text": "Eisen A, Braak H, Del Tredici K, Lemon R, Ludolph AC, Kiernan MC. Cortical influences drive amyotrophic lateral sclerosis. J Neurol Neurosurg Psychiatry. 2017;88(11):917-924. PMID 28710326. doi:10.1136/jnnp-2017-315573. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2017-315573", "areas": ["B"], "unverified": false}, {"key": "Elamin2011", "text": "Elamin M, Phukan J, Bede P, Jordan N, Byrne S, Pender N, et al. Executive dysfunction is a negative prognostic indicator in patients with ALS without dementia. Neurology. 2011;76(14):1263-1269. PMID 21464431. doi:10.1212/WNL.0b013e318214359f. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0b013e318214359f", "areas": ["A", "G"], "unverified": false}, {"key": "Elden2010", "text": "Elden AC, Kim HJ, Hart MP, Chen-Plotkin AS, Johnson BS, Fang X, et al. Ataxin-2 intermediate-length polyglutamine expansions are associated with increased risk for ALS. Nature. 2010;466(7310):1069-75. PMID 20740007. PMCID PMC2965417. doi:10.1038/nature09320. (Full text read)", "link": "https://doi.org/10.1038/nature09320", "areas": ["C"], "unverified": false}, {"key": "EMA2019Radicava", "text": "European Medicines Agency. Radicava (edaravone): withdrawal of the marketing authorisation application, 24 May 2019. (Page read)", "link": "https://www.ema.europa.eu/en/medicines/human/withdrawn-applications/radicava", "areas": ["E"], "unverified": false}, {"key": "EMA2023Albrioza", "text": "European Medicines Agency. Albrioza (sodium phenylbutyrate / ursodoxicoltaurine): refusal of marketing authorisation (opinion 22 Jun 2023; re-examination 12 Oct 2023; refusal 5 Jan 2024). (Page read)", "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/albrioza", "areas": ["E"], "unverified": false}, {"key": "EMA2024Qalsody", "text": "European Medicines Agency. Qalsody (tofersen) EPAR: medicine overview page and public assessment report EMA/276404/2024 (181 pp). Authorised 29 May 2024. (Overview read; assessment report full text read)", "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/qalsody", "areas": ["E", "I"], "unverified": false, "aliases": ["EMA2024QalsodyI"]}, {"key": "EMA_Masitinib", "text": "European Medicines Agency. Alsitek (masitinib) EPAR, refused (opinion 18 Apr 2018; refusal 26 Jul 2018) and Masitinib AB Science EPAR, refused (opinion 27 Jun 2024; re-examination 17 Oct 2024; refusal 19 Dec 2024). (Pages read; Health Canada masitinib refusal from ALS News Today, secondary, unverified at regulator)", "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/alsitek", "areas": ["E"], "unverified": false}, {"key": "EMA_Rilutek", "text": "European Medicines Agency. Rilutek (riluzole) EPAR overview and Summary of Product Characteristics (product information PDF). (Overview and SmPC read)", "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/rilutek", "areas": ["E"], "unverified": false}, {"key": "EMA_RilutekSmPC", "text": "European Medicines Agency. Rilutek 50 mg film-coated tablets: EPAR product information (SmPC), downloaded 2026-10-20. https://www.ema.europa.eu/en/documents/product-information/rilutek-epar-product-information_en.pdf (Label read)", "link": "https://www.ema.europa.eu/en/documents/product-information/rilutek-epar-product-information_en.pdf", "areas": ["H"], "unverified": false}, {"key": "Erazo2026", "text": "Erazo D, Hesters A, Bruneteau G, De La Cruz E, Bernard E, Grapperon AM, et al. Tofersen Treatment in SOD1-ALS: Real-World Evidence from a Retrospective Multicenter Study in France (FORSLA Study). Mayo Clin Proc Innov Qual Outcomes. 2026;10(5):100739. PMID 42548788. PMCID PMC13429897. doi:10.1016/j.mayocpiqo.2026.100739. (Abstract read)", "link": "https://doi.org/10.1016/j.mayocpiqo.2026.100739", "areas": ["E"], "unverified": false}, {"key": "Escarrabill2014", "text": "Escarrabill J, Vianello A, Farrero E, Ambrosino N, Martínez Llorens J, Vitacca M. Place of death in patients with amyotrophic lateral sclerosis. Rev Port Pneumol. 2014;20(4):188-193. PMID 24785570. doi:10.1016/j.rppneu.2014.03.001. (Abstract read)", "link": "https://doi.org/10.1016/j.rppneu.2014.03.001", "areas": ["G"], "unverified": false}, {"key": "EstevezFraga2026", "text": "Estevez-Fraga C, Alvarez-Velasco R, Afroz T, Costa MR, Jovičić A, Yeh FL, et al. Targeting TDP-43 in sporadic amyotrophic lateral sclerosis. J Neurol. 2026;273(8):498. PMID 42541567. doi:10.1007/s00415-026-14023-5. (Abstract read)", "link": "https://doi.org/10.1007/s00415-026-14023-5", "areas": ["I"], "unverified": false}, {"key": "Fang2008", "text": "Fang F, Valdimarsdóttir U, Fürst CJ, Hultman C, Fall K, Sparén P, et al. Suicide among patients with amyotrophic lateral sclerosis. Brain. 2008;131(Pt 10):2729-2733. PMID 18669498. doi:10.1093/brain/awn161. (Abstract read)", "link": "https://doi.org/10.1093/brain/awn161", "areas": ["G"], "unverified": false}, {"key": "Fang2017", "text": "Fang T, Al Khleifat A, Stahl DR, Lazo La Torre C, Murphy C, Young C, et al. Comparison of the King's and MiToS staging systems for ALS. Amyotroph Lateral Scler Frontotemporal Degener. 2017;18(3-4):227-232. PMID 28054828. PMCID PMC5425622. doi:10.1080/21678421.2016.1265565. (Full text read)", "link": "https://doi.org/10.1080/21678421.2016.1265565", "areas": ["A"], "unverified": false}, {"key": "Fateh2022", "text": "Fateh HR, Askary-Kachoosangy R, Shirzad N, Akbarzadeh-Baghban A, Fatehi F. The effect of energy conservation strategies on fatigue, function, and quality of life in adults with motor neuron disease: Randomized controlled trial. Curr J Neurol. 2022;21(2):83-90. PMID 38011426. PMCID PMC9860213. doi:10.18502/cjn.v21i2.10491. (Abstract read)", "link": "https://doi.org/10.18502/cjn.v21i2.10491", "areas": ["H"], "unverified": false}, {"key": "Faull2022", "text": "Faull C, Wenzel D. Mechanical ventilation withdrawal in motor neuron disease: an evaluation of practice. BMJ Support Palliat Care. 2022;12(e6):e752-e758. PMID 32439630. PMCID PMC9726956. doi:10.1136/bmjspcare-2019-002170. (Abstract read)", "link": "https://doi.org/10.1136/bmjspcare-2019-002170", "areas": ["G"], "unverified": false}, {"key": "FDA2020Exservan", "text": "EXSERVAN (riluzole) oral film, US prescribing information, revised 5/2020. https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/212640s001lbl.pdf (Label read; page states it may not be the latest label)", "link": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/212640s001lbl.pdf", "areas": ["H"], "unverified": false}, {"key": "FDA2023Qalsody", "text": "Biogen. QALSODY (tofersen) injection, for intrathecal use. US prescribing information, DailyMed/openFDA set id 81356b45-1cb7-4eef-88ea-e44cc18b47c5, effective 13 Nov 2024. (Label read: sections 1, 2, 5, 6, 8, 11, 12, 14)", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=81356b45-1cb7-4eef-88ea-e44cc18b47c5", "areas": ["E", "I", "H"], "unverified": false, "aliases": ["FDA2023QalsodyI", "FDA2023QalsodyH"]}, {"key": "FDA2024Cuvposa", "text": "CUVPOSA (glycopyrrolate) oral solution, US prescribing information (Merz), openFDA set_id d200bd44-9856-4104-a29e-a4cca3db6737, effective 2024-12-19. (Label read)", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d200bd44-9856-4104-a29e-a4cca3db6737", "areas": ["H"], "unverified": false}, {"key": "FDA2025Nuedexta", "text": "Avanir Pharmaceuticals. NUEDEXTA (dextromethorphan hydrobromide and quinidine sulfate) prescribing information. DailyMed set ID 484e0918-3442-49dc-8ccf-177f1f3ee9f3, effective 2025-10-21. (Label read via openFDA)", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=484e0918-3442-49dc-8ccf-177f1f3ee9f3", "areas": ["F", "E"], "unverified": false, "aliases": ["FDA_NuedextaLabel"]}, {"key": "FDA2025RelyvrioFR", "text": "US Food and Drug Administration. Amylyx Pharmaceuticals, Inc.; Withdrawal of Approval of New Drug Application for RELYVRIO (Sodium Phenylbutyrate and Taurursodiol). Federal Register FR Doc. 2025-16646, published 29 August 2025. https://www.federalregister.gov/d/2025-16646 (Notice read)", "link": "https://www.federalregister.gov/d/2025-16646", "areas": ["A"], "unverified": false}, {"key": "FDA2026Radicava", "text": "RADICAVA (edaravone) injection and RADICAVA ORS oral suspension, US prescribing information (Shionogi), openFDA set_id 0ce2c1c4-2a40-485c-b7cb-96a9b85d9d11, effective 2026-05-05. (Label read)", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0ce2c1c4-2a40-485c-b7cb-96a9b85d9d11", "areas": ["H", "E", "B"], "unverified": false, "aliases": ["FDA_RadicavaLabel", "FDAEdaravoneLabel"]}, {"key": "FDA2026Riluzole", "text": "Riluzole tablets, US prescribing information (Ascend Laboratories), openFDA label set_id dd432c13-389e-46b3-8891-0cf1a58800ff, effective 2026-07-15. (Label read)", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dd432c13-389e-46b3-8891-0cf1a58800ff", "areas": ["H", "E"], "unverified": false, "aliases": ["FDA_RiluzoleLabel"]}, {"key": "FDA2026Tiglutik", "text": "TIGLUTIK (riluzole) oral suspension 50 mg/10 mL, US prescribing information (EDW Pharma/Italfarmaco), openFDA set_id 75d68f19-4208-109e-e053-2991aa0ac857, effective 2026-07-27. (Label read)", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=75d68f19-4208-109e-e053-2991aa0ac857", "areas": ["H", "E", "B"], "unverified": false, "aliases": ["FDA_TiglutikLabel", "FDARiluzoleLabel"]}, {"key": "FDA2026Xeomin", "text": "Merz North America. XEOMIN (incobotulinumtoxinA) prescribing information. DailyMed set ID 3f35d6e0-3450-4abc-a0da-cc7b277e7c6e, effective 2026-07-10. (Label read via openFDA)", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3f35d6e0-3450-4abc-a0da-cc7b277e7c6e", "areas": ["F"], "unverified": false}, {"key": "Feldman2022", "text": "Feldman EL, Goutman SA, Petri S, Mazzini L, Savelieff MG, Shaw PJ, et al. Amyotrophic lateral sclerosis. Lancet. 2022;400(10360):1363-1380. PMID 36116464. PMCID PMC10089700. doi:10.1016/S0140-6736(22)01272-7. (Full text read, first half, via PMC)", "link": "https://doi.org/10.1016/s0140-6736(22)01272-7", "areas": ["A", "B", "C", "I"], "unverified": false}, {"key": "Feneberg2018", "text": "Feneberg E, Oeckl P, Steinacker P, Verde F, Barro C, Van Damme P, et al. Multicenter evaluation of neurofilaments in early symptom onset amyotrophic lateral sclerosis. Neurology. 2018;90(1):e22-e30. PMID 29212830. doi:10.1212/WNL.0000000000004761. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0000000000004761", "areas": ["D"], "unverified": false}, {"key": "Ferullo2024", "text": "Ferullo L, Risi B, Caria F, Olivieri E, Poli L, Gazzina S, et al. Gold Coast Criteria in ALS Diagnosis: A Real-World Experience. Brain Sci. 2024;14(11):1055. PMID 39595818. PMCID PMC11592046. doi:10.3390/brainsci14111055. (Abstract and full text read)", "link": "https://doi.org/10.3390/brainsci14111055", "areas": ["D"], "unverified": false}, {"key": "Fidalgo2023", "text": "Fidalgo De Faria M, Bontempo De Azevedo L, Faria De Oliveira K, Guimarães Raponi MB, Da Silva Alves Filgueira V, Marques Dos Santos Felix M, et al. Respiratory device-related pressure injuries in hospitalised adults: An integrative review. J Clin Nurs. 2023;32(17-18):5923-5937. PMID 37038693. doi:10.1111/jocn.16717. (Abstract read)", "link": "https://doi.org/10.1111/jocn.16717", "areas": ["H"], "unverified": false}, {"key": "Finsterer2013", "text": "Finsterer J, Stöllberger C. Apply Awaji-shima Consensus Conference Criteria Before Diagnosing Amyotrophic Lateral Sclerosis. Open Neurol J. 2013;7:4-6. PMID 23407618. PMCID PMC3568883. doi:10.2174/1874205X01307010004. (Full text read; Table 1 reproduces the Awaji recommendations)", "link": "https://doi.org/10.2174/1874205x01307010004", "areas": ["D"], "unverified": false}, {"key": "Fischer2004", "text": "Fischer LR, Culver DG, Tennant P, Davis AA, Wang M, Castellano-Sanchez A, et al. Amyotrophic lateral sclerosis is a distal axonopathy: evidence in mice and man. Exp Neurol. 2004;185(2):232-240. PMID 14736504. doi:10.1016/j.expneurol.2003.10.004. (Abstract read)", "link": "https://doi.org/10.1016/j.expneurol.2003.10.004", "areas": ["B"], "unverified": false}, {"key": "Floeter2014", "text": "Floeter MK, Katipally R, Kim MP, Schanz O, Stephen M, Danielian L, et al. Impaired corticopontocerebellar tracts underlie pseudobulbar affect in motor neuron disorders. Neurology. 2014;83(7):620-627. PMID 25008395. PMCID PMC4141995. doi:10.1212/WNL.0000000000000693. (Full text read)", "link": "https://doi.org/10.1212/wnl.0000000000000693", "areas": ["B"], "unverified": false}, {"key": "Forgrave2019", "text": "Forgrave LM, Ma M, Best JR, DeMarco ML. The diagnostic performance of neurofilament light chain in CSF and blood for Alzheimer's disease, frontotemporal dementia, and amyotrophic lateral sclerosis: A systematic review and meta-analysis. Alzheimers Dement (Amst). 2019;11:730-743. PMID 31909174. PMCID PMC6939029. doi:10.1016/j.dadm.2019.08.009. (Full text read)", "link": "https://doi.org/10.1016/j.dadm.2019.08.009", "areas": ["D"], "unverified": false}, {"key": "Freischmidt2015", "text": "Freischmidt A, Wieland T, Richter B, Ruf W, Schaeffer V, Müller K, et al. Haploinsufficiency of TBK1 causes familial ALS and fronto-temporal dementia. Nat Neurosci. 2015;18(5):631-6. PMID 25803835. doi:10.1038/nn.4000. (Abstract read)", "link": "https://doi.org/10.1038/nn.4000", "areas": ["C"], "unverified": false}, {"key": "Fusco2019", "text": "Fusco AF, McCall AL, Dhindsa JS, Pucci LA, Strickland LM, Kahn AF, et al. The Respiratory Phenotype of Rodent Models of Amyotrophic Lateral Sclerosis and Spinocerebellar Ataxia. J Neuroinflamm Neurodegener Dis. 2019;3(1):100011. PMID 31893284. PMCID PMC6938301. No DOI in PubMed record. (Full text read, via WebFetch)", "link": "https://pubmed.ncbi.nlm.nih.gov/31893284/", "areas": ["F"], "unverified": false}, {"key": "Gagliardi2026", "text": "Gagliardi D, Villella C, Zanovello M, Iacobelli V, Corti S, Comi GP, et al. High Prevalence of SOD1 Pathogenic Variants in the UK Biobank: Implications for Early Intervention in Amyotrophic Lateral Sclerosis. Ann Neurol. 2026;99(6):1502-1515. PMID 41852184. PMCID PMC13206312. doi:10.1002/ana.78195. (Abstract read)", "link": "https://doi.org/10.1002/ana.78195", "areas": ["I"], "unverified": false}, {"key": "Gaiottino2013", "text": "Gaiottino J, Norgren N, Dobson R, Topping J, Nissim A, Malaspina A, et al. Increased neurofilament light chain blood levels in neurodegenerative neurological diseases. PLoS One. 2013;8(9):e75091. PMID 24073237. PMCID PMC3779219. doi:10.1371/journal.pone.0075091. (Full text read)", "link": "https://doi.org/10.1371/journal.pone.0075091", "areas": ["B"], "unverified": false}, {"key": "Galvin2016", "text": "Galvin M, Corr B, Madden C, Mays I, McQuillan R, Timonen V, et al. Caregiving in ALS - a mixed methods approach to the study of Burden. BMC Palliat Care. 2016;15(1):81. PMID 27596749. PMCID PMC5011853. doi:10.1186/s12904-016-0153-0. (Full text read)", "link": "https://doi.org/10.1186/s12904-016-0153-0", "areas": ["G"], "unverified": false}, {"key": "Gao2025", "text": "Gao J, Douglas AGL, Chalitsios CV, Scaber J, Talbot K, Turner MR, et al. Neurodegenerative disease in C9orf72 repeat expansion carriers: population risk and effect of UNC13A. Brain. 2025;148(11):3865-3871. PMID 40682810. PMCID PMC12588677. doi:10.1093/brain/awaf269. (Abstract read)", "link": "https://doi.org/10.1093/brain/awaf269", "areas": ["C"], "unverified": false}, {"key": "Garnier2024", "text": "Garnier M, Camdessanché JP, Cassereau J, Codron P. From suspicion to diagnosis: exploration strategy for suspected amyotrophic lateral sclerosis. Ann Med. 2024;56(1):2398199. PMID 39233624. PMCID PMC11378651. doi:10.1080/07853890.2024.2398199. (Full text read)", "link": "https://doi.org/10.1080/07853890.2024.2398199", "areas": ["D"], "unverified": false}, {"key": "GassetRosa2019", "text": "Gasset-Rosa F, Lu S, Yu H, Chen C, Melamed Z, Guo L, et al. Cytoplasmic TDP-43 De-mixing Independent of Stress Granules Drives Inhibition of Nuclear Import, Loss of Nuclear TDP-43, and Cell Death. Neuron. 2019;102(2):339-357.e7. PMID 30853299. PMCID PMC6548321. doi:10.1016/j.neuron.2019.02.038. (Abstract read)", "link": "https://doi.org/10.1016/j.neuron.2019.02.038", "areas": ["B"], "unverified": false}, {"key": "Gay1995", "text": "Gay PC, Edmonds LC. Severe hypercapnia after low-flow oxygen therapy in patients with neuromuscular disease and diaphragmatic dysfunction. Mayo Clin Proc. 1995;70(4):327-30. PMID 7898136. doi:10.4065/70.4.327. (Abstract read)", "link": "https://doi.org/10.4065/70.4.327", "areas": ["H"], "unverified": false}, {"key": "GBD2016MND2018", "text": "GBD 2016 Motor Neuron Disease Collaborators. Global, regional, and national burden of motor neuron diseases 1990-2016: a systematic analysis for the Global Burden of Disease Study 2016. Lancet Neurol. 2018;17(12):1083-1097. PMID 30409709. PMCID PMC6234315. doi:10.1016/S1474-4422(18)30404-6. (Full text read)", "link": "https://doi.org/10.1016/s1474-4422(18)30404-6", "areas": ["A"], "unverified": false}, {"key": "Geevasinga2016", "text": "Geevasinga N, Loy CT, Menon P, de Carvalho M, Swash M, Schrooten M, et al. Awaji criteria improves the diagnostic sensitivity in amyotrophic lateral sclerosis: A systematic review using individual patient data. Clin Neurophysiol. 2016;127(7):2684-2691. PMID 27212114. doi:10.1016/j.clinph.2016.04.005. (Abstract read)", "link": "https://doi.org/10.1016/j.clinph.2016.04.005", "areas": ["D"], "unverified": false}, {"key": "Genge2025", "text": "Genge A, Pattee GL, Sobue G, Aoki M, Yoshino H, Couratier P, et al. Safety Extension Study of Edaravone Oral Suspension in Patients With Amyotrophic Lateral Sclerosis for up to an Additional 96 Weeks of Treatment. Muscle Nerve. 2025;72(3):450-454. PMID 40485494. PMCID PMC12338009. doi:10.1002/mus.28451. (Abstract read)", "link": "https://doi.org/10.1002/mus.28451", "areas": ["E"], "unverified": false}, {"key": "Genge2026", "text": "Genge A, Rothstein J, De Silva S, Zinman L, Chum M, Chiò A, et al. Phase 3b Extension Study MT-1186-A04 to Evaluate the Continued Efficacy and Safety of Edaravone Oral Suspension for Up to an Additional 48 Weeks in Patients With Amyotrophic Lateral Sclerosis. Muscle Nerve. 2026;73(4):534-543. PMID 41432316. PMCID PMC12969958. doi:10.1002/mus.70120. (Abstract read)", "link": "https://doi.org/10.1002/mus.70120", "areas": ["E"], "unverified": false}, {"key": "Geva2026", "text": "Geva M, Goldberg YP, Leitner ML, Cruz-Herranz A, Hand R, et al. Pridopidine treatment in ALS: subgroup analyses from the HEALEY ALS Platform trial. Amyotroph Lateral Scler Frontotemporal Degener. 2026;27(3-4):432-444. PMID 41406304. doi:10.1080/21678421.2025.2597935. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2025.2597935", "areas": ["I"], "unverified": false}, {"key": "Ghasemi2016", "text": "Ghasemi M. Amyotrophic lateral sclerosis mimic syndromes. Iran J Neurol. 2016;15(2):85-91. PMID 27326363. PMCID PMC4912674. (Full text read; no DOI in the PubMed record)", "link": "https://pubmed.ncbi.nlm.nih.gov/27326363/", "areas": ["D"], "unverified": false}, {"key": "Gibbons2011", "text": "Gibbons CJ, Mills RJ, Thornton EW, Ealing J, Mitchell JD, Shaw PJ, et al. Rasch analysis of the hospital anxiety and depression scale (HADS) for use in motor neurone disease. Health Qual Life Outcomes. 2011;9:82. PMID 21955749. PMCID PMC3192662. doi:10.1186/1477-7525-9-82. (Abstract read)", "link": "https://doi.org/10.1186/1477-7525-9-82", "areas": ["H"], "unverified": false}, {"key": "Gil2008", "text": "Gil J, Funalot B, Verschueren A, Danel-Brunaud V, Camu W, Vandenberghe N, et al. Causes of death amongst French patients with amyotrophic lateral sclerosis: a prospective study. Eur J Neurol. 2008;15(11):1245-1251. PMID 18973614. doi:10.1111/j.1468-1331.2008.02307.x. (Abstract read)", "link": "https://doi.org/10.1111/j.1468-1331.2008.02307.x", "areas": ["G"], "unverified": false}, {"key": "Gkolfakis2021", "text": "Gkolfakis P, Arvanitakis M, Despott EJ, Ballarin A, Beyna T, Boeykens K, et al. Endoscopic management of enteral tubes in adult patients - Part 2: Peri- and post-procedural management. European Society of Gastrointestinal Endoscopy (ESGE) Guideline. Endoscopy. 2021;53(2):178-195. PMID 33348410. doi:10.1055/a-1331-8080. (Abstract read)", "link": "https://doi.org/10.1055/a-1331-8080", "areas": ["H"], "unverified": false}, {"key": "Gladman2014", "text": "Gladman M, Dharamshi C, Zinman L. Economic burden of amyotrophic lateral sclerosis: a Canadian study of out-of-pocket expenses. Amyotroph Lateral Scler Frontotemporal Degener. 2014;15(5-6):426-432. PMID 25025935. doi:10.3109/21678421.2014.932382. (Abstract read)", "link": "https://doi.org/10.3109/21678421.2014.932382", "areas": ["G"], "unverified": false}, {"key": "GladmanZinman2015", "text": "Gladman M, Zinman L. The economic impact of amyotrophic lateral sclerosis: a systematic review. Expert Rev Pharmacoecon Outcomes Res. 2015;15(3):439-450. PMID 25924979. doi:10.1586/14737167.2015.1039941. (Abstract read)", "link": "https://doi.org/10.1586/14737167.2015.1039941", "areas": ["G"], "unverified": false}, {"key": "Goetz2000", "text": "Goetz CG. Amyotrophic lateral sclerosis: early contributions of Jean-Martin Charcot. Muscle Nerve. 2000;23(3):336-343. PMID 10679709. doi:10.1002/(SICI)1097-4598(200003)23:3<336::AID-MUS4>3.0.CO;2-L. (Abstract read)", "link": "https://pubmed.ncbi.nlm.nih.gov/10679709/", "areas": ["A"], "unverified": false}, {"key": "Goldstein2018", "text": "Goldstein O, Gana-Weisz M, Nefussy B, Vainer B, Nayshool O, Bar-Shira A, et al. High frequency of C9orf72 hexanucleotide repeat expansion in amyotrophic lateral sclerosis patients from two founder populations sharing the same risk haplotype. Neurobiol Aging. 2018;64:160.e1-160.e7. PMID 29352617. PMCID PMC5931221. doi:10.1016/j.neurobiolaging.2017.12.015. (Abstract read)", "link": "https://doi.org/10.1016/j.neurobiolaging.2017.12.015", "areas": ["C"], "unverified": false}, {"key": "GonzalezBermejo2016", "text": "Gonzalez-Bermejo J, Morélot-Panzini C, Tanguy ML, Meininger V, Pradat PF, Lenglet T, et al. Early diaphragm pacing in patients with amyotrophic lateral sclerosis (RespiStimALS): a randomised controlled triple-blind trial. Lancet Neurol. 2016;15(12):1217-1227. PMID 27751553. doi:10.1016/S1474-4422(16)30233-2. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(16)30233-2", "areas": ["F"], "unverified": false}, {"key": "Gordon2006", "text": "Gordon PH, Cheng B, Katz IB, Pinto M, Hays AP, Mitsumoto H, et al. The natural history of primary lateral sclerosis. Neurology. 2006;66(5):647-653. PMID 16534101. doi:10.1212/01.wnl.0000200962.94777.71. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000200962.94777.71", "areas": ["A"], "unverified": false}, {"key": "Gordon2010", "text": "Gordon PH, Cheng B, Salachas F, Pradat PF, Bruneteau G, Corcia P, et al. Progression in ALS is not linear but is curvilinear. J Neurol. 2010;257(10):1713-1717. PMID 20532545. doi:10.1007/s00415-010-5609-1. (Abstract read)", "link": "https://doi.org/10.1007/s00415-010-5609-1", "areas": ["A"], "unverified": false}, {"key": "GossyeGeneReviews", "text": "Gossye H, Engelborghs S, Van Broeckhoven C, van der Zee J. C9orf72 Frontotemporal Dementia and/or Amyotrophic Lateral Sclerosis. In: Adam MP, et al., editors. GeneReviews. Seattle (WA): University of Washington, Seattle; 1993-. First posted 2015; current update date not confirmed. PMID 25577942. NBK268647. (Abstract read; Bookshelf page blocked by a reCAPTCHA)", "link": "https://pubmed.ncbi.nlm.nih.gov/25577942/", "areas": ["C"], "unverified": false}, {"key": "Goyal2024", "text": "Goyal NA, Bonar K, Savic N, Beau Lejdstrom R, Wright J, Mellor J, et al. Misdiagnosis of amyotrophic lateral sclerosis in clinical practice in Europe and the USA: a patient chart review and physician survey. Amyotroph Lateral Scler Frontotemporal Degener. 2024;25(1-2):16-25. PMID 37794794. doi:10.1080/21678421.2023.2260808. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2023.2260808", "areas": ["D"], "unverified": false}, {"key": "Gurney1994", "text": "Gurney ME, Pu H, Chiu AY, Dal Canto MC, Polchow CY, Alexander DD, et al. Motor neuron degeneration in mice that express a human Cu,Zn superoxide dismutase mutation. Science. 1994;264(5166):1772-5. PMID 8209258. doi:10.1126/science.8209258. (Abstract read)", "link": "https://doi.org/10.1126/science.8209258", "areas": ["C"], "unverified": false}, {"key": "Hamad2023", "text": "Hamad AA, Amer BE, Al Mawla AM, Goufa E, Abdelwahab MM, Serag I. Clinical characteristics, course, and outcomes of amyotrophic lateral sclerosis overlapping with pregnancy: a systematic review of 38 published cases. Neurol Sci. 2023;44(12):4219-4231. PMID 37587387. PMCID PMC10641051. doi:10.1007/s10072-023-06994-4. (Abstract read)", "link": "https://doi.org/10.1007/s10072-023-06994-4", "areas": ["G"], "unverified": false}, {"key": "Hamidou2017", "text": "Hamidou B, Marin B, Lautrette G, Nicol M, Camu W, Corcia P, et al. Exploring the diagnosis delay and ALS functional impairment at diagnosis as relevant criteria for clinical trial enrolment. Amyotroph Lateral Scler Frontotemporal Degener. 2017;18(7-8):519-527. PMID 28762856. doi:10.1080/21678421.2017.1353098. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2017.1353098", "areas": ["A"], "unverified": false}, {"key": "Hammer2008", "text": "Hammer EM, Häcker S, Hautzinger M, Meyer TD, Kübler A. Validity of the ALS-Depression-Inventory (ADI-12)--a new screening instrument for depressive disorders in patients with amyotrophic lateral sclerosis. J Affect Disord. 2008;109(1-2):213-9. PMID 18262283. doi:10.1016/j.jad.2007.11.012. (Abstract read)", "link": "https://doi.org/10.1016/j.jad.2007.11.012", "areas": ["H"], "unverified": false}, {"key": "Hannaford2021", "text": "Hannaford A, Pavey N, van den Bos M, Geevasinga N, Menon P, Shefner JM, et al. Diagnostic Utility of Gold Coast Criteria in Amyotrophic Lateral Sclerosis. Ann Neurol. 2021;89(5):979-986. PMID 33565111. doi:10.1002/ana.26045. (Abstract read)", "link": "https://doi.org/10.1002/ana.26045", "areas": ["D"], "unverified": false}, {"key": "Hasegawa2008", "text": "Hasegawa M, Arai T, Nonaka T, Kametani F, Yoshida M, Hashizume Y, et al. Phosphorylated TDP-43 in frontotemporal lobar degeneration and amyotrophic lateral sclerosis. Ann Neurol. 2008;64(1):60-70. PMID 18546284. PMCID PMC2674108. doi:10.1002/ana.21425. (Abstract read)", "link": "https://doi.org/10.1002/ana.21425", "areas": ["B"], "unverified": false}, {"key": "HawkingBiography", "text": "Stephen Hawking estate. Biography. https://www.hawking.org.uk/biography (Web page read)", "link": "https://www.hawking.org.uk/biography", "areas": ["A"], "unverified": false}, {"key": "Hayashi2003", "text": "Hayashi H, Oppenheimer EA. ALS patients on TPPV: totally locked-in state, neurologic findings and ethical implications. Neurology. 2003;61(1):135-137. PMID 12847177. doi:10.1212/01.wnl.0000069925.02052.1f. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000069925.02052.1f", "areas": ["G"], "unverified": false}, {"key": "Hayashi2020", "text": "Hayashi N, Atsuta N, Yokoi D, Nakamura R, Nakatochi M, Katsuno M, et al. Prognosis of amyotrophic lateral sclerosis patients undergoing tracheostomy invasive ventilation therapy in Japan. J Neurol Neurosurg Psychiatry. 2020;91(3):285-290. PMID 31937581. doi:10.1136/jnnp-2019-322213. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2019-322213", "areas": ["F", "G"], "unverified": false}, {"key": "HC2018Radicava", "text": "Health Canada. Summary Basis of Decision for Radicava (NOC 3 Oct 2018) and news release 4 Oct 2018. (Read via search summary only; pages not opened)", "link": "", "areas": ["E"], "unverified": true, "note": "Read only through search-engine summaries; the original page was not opened. Treat dates and figures with care."}, {"key": "HC2025Qalsody", "text": "Health Canada. Summary Basis of Decision for Qalsody (NOC/c 28 Feb 2025). (Read via search summary only; page not opened)", "link": "", "areas": ["E"], "unverified": true, "note": "Read only through search-engine summaries; the original page was not opened. Treat dates and figures with care."}, {"key": "HC_Albrioza", "text": "Amylyx Pharmaceuticals. ALBRIOZA Product Monograph (Health Canada; initial authorization 1 Jun 2022; revised 31 May 2024), and Health Canada Health Professional Risk Communication, 7 Jun 2024. (Monograph front matter and sections 1-4 read; notice read)", "link": "", "areas": ["E"], "unverified": false}, {"key": "HCDPD_Qalsody", "text": "Health Canada. Drug Product Database: QALSODY (tofersen), drug code 104447, DIN 02555735; status Marketed, original market date 14 May 2025, read via the DPD API. https://health-products.canada.ca/dpd-bdpp/ (Record read 20 Oct 2026, added during source validation)", "link": "https://health-products.canada.ca/dpd-bdpp/", "areas": ["E"], "unverified": false}, {"key": "HCDPD_Radicava", "text": "Health Canada. Drug Product Database: RADICAVA (edaravone), drug code 96585, DIN 02475472; status history read via the DPD API (original market date 29 October 2019; cancelled post market 1 April 2025). https://health-products.canada.ca/dpd-bdpp/ (Record read 20 Oct 2026, added during source validation)", "link": "https://health-products.canada.ca/dpd-bdpp/", "areas": ["E"], "unverified": false}, {"key": "HEALEY2025CNMAu8", "text": "Writing Committee for the HEALEY ALS Platform Trial (Berry JD, et al.). CNM-Au8 in Amyotrophic Lateral Sclerosis: The HEALEY ALS Platform Trial. JAMA. 2025;333(13):1138-1149. PMID 40067821. PMCID PMC11833661. doi:10.1001/jama.2024.27643. (Abstract read)", "link": "https://doi.org/10.1001/jama.2024.27643", "areas": ["I"], "unverified": false}, {"key": "HEALEY2025Pridopidine", "text": "Writing Committee for the HEALEY ALS Platform Trial (Shefner JM, et al.). Pridopidine in Amyotrophic Lateral Sclerosis: The HEALEY ALS Platform Trial. JAMA. 2025;333(13):1128-1137. PMID 40067755. PMCID PMC11833658. doi:10.1001/jama.2024.26429. (Abstract read)", "link": "https://doi.org/10.1001/jama.2024.26429", "areas": ["I"], "unverified": false}, {"key": "HEALEY2025Trehalose", "text": "HEALEY ALS Platform Trial Study Group (Crossref first author Ladha; Chibnik, Quintana, et al.). Safety and efficacy of trehalose in amyotrophic lateral sclerosis (HEALEY ALS Platform Trial): an adaptive, phase 2/3, double-blind, randomised, placebo-controlled trial. Lancet Neurol. 2025;24(6):500-511. PMID 40409314. doi:10.1016/S1474-4422(25)00173-5. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(25)00173-5", "areas": ["I"], "unverified": false}, {"key": "HEALEY2025Verdiperstat", "text": "Writing Committee for the HEALEY ALS Platform Trial (Andrews J, Paganoni S, Macklin EA, Chibnik LB, Quintana M, Saville BR, et al.). Verdiperstat in Amyotrophic Lateral Sclerosis: Results From the Randomized HEALEY ALS Platform Trial. JAMA Neurol. 2025;82(4):333-343. PMID 40067754. PMCID PMC11833655. doi:10.1001/jamaneurol.2024.5249. (Abstract read)", "link": "https://doi.org/10.1001/jamaneurol.2024.5249", "areas": ["I"], "unverified": false}, {"key": "HealthCanada2025", "text": "Health Canada. Sixth Annual Report on Medical Assistance in Dying in Canada, 2024. https://www.canada.ca/en/health-canada/services/publications/health-system-services/annual-report-medical-assistance-dying-2024.html. (Web page read through a summarising fetch tool, first 100,000 characters; publication date of November 2025 taken from search-result text)", "link": "https://www.canada.ca/en/health-canada/services/publications/health-system-services/annual-report-medical-assistance-dying-2024.html", "areas": ["G"], "unverified": false}, {"key": "Heidari2021", "text": "Heidari ME, Nadali J, Parouhan A, Azarafraz M, Tabatabai SM, Irvani SSN, et al. Prevalence of depression among amyotrophic lateral sclerosis (ALS) patients: A systematic review and meta-analysis. J Affect Disord. 2021;287:182-190. PMID 33799036. doi:10.1016/j.jad.2021.03.015. (Abstract read)", "link": "https://doi.org/10.1016/j.jad.2021.03.015", "areas": ["G"], "unverified": false}, {"key": "Heidinger2025", "text": "Heidinger B, Webber C, Chambaere K, Close E, Deliens L, Onwuteaka-Philipsen B, et al. International Comparison of Underlying Disease Among Recipients of Medical Assistance in Dying. JAMA Intern Med. 2025;185(2):235-237. PMID 39652339. PMCID PMC11791694. doi:10.1001/jamainternmed.2024.6643. (Full text read)", "link": "https://doi.org/10.1001/jamainternmed.2024.6643", "areas": ["G"], "unverified": false}, {"key": "Holdom2025", "text": "Holdom CJ, Pilkar R, Guo CC, van Eijk RPA, Sethi N, Henderson RD, et al. Identification of passive wrist-worn accelerometry outcomes for improved disease monitoring and trial design in motor neuron disease. EBioMedicine. 2025;117:105779. PMID 40446399. PMCID PMC12166790. doi:10.1016/j.ebiom.2025.105779. (Abstract read)", "link": "https://doi.org/10.1016/j.ebiom.2025.105779", "areas": ["I"], "unverified": false}, {"key": "Horton2026", "text": "Horton DK, Raymond J, Larson T, Weisskopf MG, Howard I, Mehta P. Military Service and Survival Among Persons With ALS in the U.S. National ALS Registry, 2011-2023. Muscle Nerve. 2026;74(5):1368-1374. PMCID PMC13636006. doi:10.1002/mus.70390. (Abstract read; PMID 42669596 per Europe PMC, not in the PubMed batch)", "link": "https://doi.org/10.1002/mus.70390", "areas": ["A"], "unverified": false}, {"key": "Hubers2015", "text": "Hübers A, Just W, Rosenbohm A, Müller K, Marroquin N, Goebel I, et al. De novo FUS mutations are the most frequent genetic cause in early-onset German ALS patients. Neurobiol Aging. 2015;36(11):3117.e1-3117.e6. PMID 26362943. doi:10.1016/j.neurobiolaging.2015.08.005. (Abstract read)", "link": "https://doi.org/10.1016/j.neurobiolaging.2015.08.005", "areas": ["C"], "unverified": false}, {"key": "Hung2023", "text": "Hung ST, Linares GR, Chang WH, Eoh Y, Krishnan G, Mendonca S, et al. PIKFYVE inhibition mitigates disease in models of diverse forms of ALS. Cell. 2023;186(4):786-802.e28. PMID 36754049. PMCID PMC10062012. doi:10.1016/j.cell.2023.01.005. (Abstract read)", "link": "https://doi.org/10.1016/j.cell.2023.01.005", "areas": ["I"], "unverified": false}, {"key": "Huynh2016", "text": "Huynh W, Simon NG, Grosskreutz J, Turner MR, Vucic S, Kiernan MC. Assessment of the upper motor neuron in amyotrophic lateral sclerosis. Clin Neurophysiol. 2016;127(7):2643-2660. PMID 27291884. doi:10.1016/j.clinph.2016.04.025. (Abstract read)", "link": "https://doi.org/10.1016/j.clinph.2016.04.025", "areas": ["B"], "unverified": false}, {"key": "Iacoangeli2019", "text": "Iacoangeli A, Al Khleifat A, Jones AR, Sproviero W, Shatunov A, Opie-Martin S, et al. C9orf72 intermediate expansions of 24-30 repeats are associated with ALS. Acta Neuropathol Commun. 2019;7(1):115. PMID 31315673. PMCID PMC6637621. doi:10.1186/s40478-019-0724-4. (Abstract read)", "link": "https://doi.org/10.1186/s40478-019-0724-4", "areas": ["C"], "unverified": false}, {"key": "Igaz2008", "text": "Igaz LM, Kwong LK, Xu Y, Truax AC, Uryu K, Neumann M, et al. Enrichment of C-terminal fragments in TAR DNA-binding protein-43 cytoplasmic inclusions in brain but not in spinal cord of frontotemporal lobar degeneration and amyotrophic lateral sclerosis. Am J Pathol. 2008;173(1):182-194. PMID 18535185. PMCID PMC2438296. doi:10.2353/ajpath.2008.080003. (Abstract read)", "link": "https://doi.org/10.2353/ajpath.2008.080003", "areas": ["B"], "unverified": false}, {"key": "Inoue2026", "text": "Inoue Y, Tanaka M, Oguchi T, Sasaki A, Saito K, Inoue A, et al. Selective neuroprotection in the ALS-FTD spectrum: Mechanisms of neuronal resilience and translational perspectives. Brain Res Bull. 2026;245:112111. PMID 42727710. doi:10.1016/j.brainresbull.2026.112111. (Abstract read; Europe PMC only, not separately checked on PubMed esummary)", "link": "https://doi.org/10.1016/j.brainresbull.2026.112111", "areas": ["I"], "unverified": false}, {"key": "ISSCR-Guide", "text": "International Society for Stem Cell Research. New ISSCR Guide to Stem Cell Treatments Promotes Patient Safety and Public Health (news page; year not shown on page). (Web page read)", "link": "", "areas": ["I"], "unverified": false}, {"key": "Ito2024", "text": "Ito D, Okada K. Rethinking antisense oligonucleotide therapeutics for amyotrophic lateral sclerosis. Ann Clin Transl Neurol. 2024;11(12):3054-3063. PMID 39473221. PMCID PMC11651183. doi:10.1002/acn3.52234. (Abstract read)", "link": "https://doi.org/10.1002/acn3.52234", "areas": ["I"], "unverified": false}, {"key": "Jacobs2016", "text": "Jacobs TL, Brown DL, Baek J, Migda EM, Funckes T, Gruis KL. Trial of early noninvasive ventilation for ALS: A pilot placebo-controlled study. Neurology. 2016;87(18):1878-1883. PMID 27581221. PMCID PMC5100714. doi:10.1212/WNL.0000000000003158. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0000000000003158", "areas": ["F"], "unverified": false}, {"key": "James2022", "text": "James E, Ellis C, Brassington R, Sathasivam S, Young CA. Treatment for sialorrhea (excessive saliva) in people with motor neuron disease/amyotrophic lateral sclerosis. Cochrane Database Syst Rev. 2022;5(5):CD006981. PMID 35593746. PMCID PMC9121913. doi:10.1002/14651858.CD006981.pub3. (Abstract read)", "link": "https://doi.org/10.1002/14651858.cd006981.pub3", "areas": ["F", "H"], "unverified": false}, {"key": "JangBae2015", "text": "Jang JS, Bae JS. AWAJI criteria are not always superior to the previous criteria: A meta-analysis. Muscle Nerve. 2015;51(6):822-829. PMID 25597926. doi:10.1002/mus.24575. (Abstract read; an erratum exists, PMID 26193804, not read)", "link": "https://doi.org/10.1002/mus.24575", "areas": ["D"], "unverified": false}, {"key": "Jewett2022", "text": "Jewett G, Khayambashi S, Frost GS, Beland B, Lee A, Hodgkinson V, et al. Gold Coast criteria expand clinical trial eligibility in amyotrophic lateral sclerosis. Muscle Nerve. 2022;66(4):397-403. PMID 35673968. doi:10.1002/mus.27660. (Abstract read)", "link": "https://doi.org/10.1002/mus.27660", "areas": ["D"], "unverified": false}, {"key": "Johnsen2019", "text": "Johnsen B, Pugdahl K, Fuglsang-Frederiksen A, Kollewe K, Paracka L, Dengler R, et al. Diagnostic criteria for amyotrophic lateral sclerosis: A multicentre study of inter-rater variation and sensitivity. Clin Neurophysiol. 2019;130(2):307-314. PMID 30573424. doi:10.1016/j.clinph.2018.11.021. (Abstract read)", "link": "https://doi.org/10.1016/j.clinph.2018.11.021", "areas": ["D"], "unverified": false}, {"key": "Johnson2010", "text": "Johnson JO, Mandrioli J, Benatar M, Abramzon Y, Van Deerlin VM, Trojanowski JQ, et al. Exome sequencing reveals VCP mutations as a cause of familial ALS. Neuron. 2010;68(5):857-64. PMID 21145000. PMCID PMC3032425. doi:10.1016/j.neuron.2010.11.036. (Abstract read)", "link": "https://doi.org/10.1016/j.neuron.2010.11.036", "areas": ["C"], "unverified": false}, {"key": "Joyce2013", "text": "Joyce NC, Carter GT. Electrodiagnosis in persons with amyotrophic lateral sclerosis. PM R. 2013;5(5 Suppl):S89-S95. PMID 23523708. PMCID PMC4590769. doi:10.1016/j.pmrj.2013.03.020. (Full text read)", "link": "https://doi.org/10.1016/j.pmrj.2013.03.020", "areas": ["B"], "unverified": false}, {"key": "Julian2021", "text": "Julian TH, Glascow N, Barry ADF, Moll T, Harvey C, Klimentidis YC, et al. Physical exercise is a risk factor for amyotrophic lateral sclerosis: Convergent evidence from Mendelian randomisation, transcriptomics and risk genotypes. EBioMedicine. 2021;68:103397. PMID 34051439. PMCID PMC8170114. doi:10.1016/j.ebiom.2021.103397. (Full text read)", "link": "https://doi.org/10.1016/j.ebiom.2021.103397", "areas": ["A"], "unverified": false}, {"key": "Kang2013", "text": "Kang SH, Li Y, Fukaya M, Lorenzini I, Cleveland DW, Ostrow LW, et al. Degeneration and impaired regeneration of gray matter oligodendrocytes in amyotrophic lateral sclerosis. Nat Neurosci. 2013;16(5):571-579. PMID 23542689. PMCID PMC3637847. doi:10.1038/nn.3357. (Abstract read)", "link": "https://doi.org/10.1038/nn.3357", "areas": ["B"], "unverified": false}, {"key": "Kanning2010", "text": "Kanning KC, Kaplan A, Henderson CE. Motor neuron diversity in development and disease. Annu Rev Neurosci. 2010;33:409-440. PMID 20367447. doi:10.1146/annurev.neuro.051508.135722. (Abstract read)", "link": "https://doi.org/10.1146/annurev.neuro.051508.135722", "areas": ["B"], "unverified": false}, {"key": "KaubWittemer2003", "text": "Kaub-Wittemer D, Steinbüchel Nv, Wasner M, Laier-Groeneveld G, Borasio GD. Quality of life and psychosocial issues in ventilated patients with amyotrophic lateral sclerosis and their caregivers. J Pain Symptom Manage. 2003;26(4):890-896. PMID 14527757. doi:10.1016/s0885-3924(03)00323-3. (Abstract read)", "link": "https://doi.org/10.1016/s0885-3924(03)00323-3", "areas": ["F"], "unverified": false}, {"key": "Kaufmann2007", "text": "Kaufmann P, Levy G, Montes J, Buchsbaum R, Barsdorf AI, Battista V, et al. Excellent inter-rater, intra-rater, and telephone-administered reliability of the ALSFRS-R in a multicenter clinical trial. Amyotroph Lateral Scler. 2007;8(1):42-6. PMID 17364435. doi:10.1080/17482960600888156. (Abstract read)", "link": "https://doi.org/10.1080/17482960600888156", "areas": ["H"], "unverified": false}, {"key": "Kawata2008", "text": "Kawata A, Mizoguchi K, Hayashi H. [A nationwide survey of ALS patients on trachoestomy positive pressure ventilation (TPPV) who developed a totally locked-in state (TLS) in Japan]. Rinsho Shinkeigaku. 2008;48(7):476-480. PMID 18717180. doi:10.5692/clinicalneurol.48.476. (Abstract read, English abstract of a Japanese article)", "link": "https://doi.org/10.5692/clinicalneurol.48.476", "areas": ["G"], "unverified": false}, {"key": "Kenna2016", "text": "Kenna KP, van Doormaal PT, Dekker AM, Ticozzi N, Kenna BJ, Diekstra FP, et al. NEK1 variants confer susceptibility to amyotrophic lateral sclerosis. Nat Genet. 2016;48(9):1037-1042. PMID 27455347. PMCID PMC5560030. doi:10.1038/ng.3626. (Abstract read)", "link": "https://doi.org/10.1038/ng.3626", "areas": ["A", "C"], "unverified": false}, {"key": "Ketabforoush2024", "text": "Ketabforoush A, Faghihi F, Azedi F, Ariaei A, Habibi MA, Khalili M, et al. Sodium Phenylbutyrate and Tauroursodeoxycholic Acid: A Story of Hope Turned to Disappointment in Amyotrophic Lateral Sclerosis Treatment. Clin Drug Investig. 2024;44(7):495-512. PMID 38909349. doi:10.1007/s40261-024-01371-1. (Abstract read)", "link": "https://doi.org/10.1007/s40261-024-01371-1", "areas": ["E"], "unverified": false}, {"key": "Keun2023", "text": "Keun CH, Choi SJ, Kim YJ, Kim SM, Hong YH, Sung JJ. Suicide Attempts in Patients With Amyotrophic Lateral Sclerosis: An Analysis of the Korean National Health Insurance Database. J Clin Psychiatry. 2023;84(6):22m14754. PMID 37728482. doi:10.4088/JCP.22m14754. (Abstract read)", "link": "https://doi.org/10.4088/jcp.22m14754", "areas": ["G"], "unverified": false}, {"key": "Khalil2018", "text": "Khalil M, Teunissen CE, Otto M, Piehl F, Sormani MP, Gattringer T, et al. Neurofilaments as biomarkers in neurological disorders. Nat Rev Neurol. 2018;14(10):577-589. PMID 30171200. doi:10.1038/s41582-018-0058-z. (Abstract read)", "link": "https://doi.org/10.1038/s41582-018-0058-z", "areas": ["B"], "unverified": false}, {"key": "Kihira2017", "text": "Kihira T, Okamoto K, Sakurai I, Arakawa Y, Wakayama I, Takamiya K, et al. Lifestyle Changes and Oxidative Stress in a High-incidence Area of Amyotrophic Lateral Sclerosis in the Southwestern Kii Peninsula, Japan. Intern Med. 2017;56(12):1497-1506. PMID 28626174. PMCID PMC5505904. doi:10.2169/internalmedicine.56.8038. (Abstract read; PMID per Europe PMC, not in the PubMed batch)", "link": "https://doi.org/10.2169/internalmedicine.56.8038", "areas": ["A"], "unverified": false}, {"key": "Kim2009", "text": "Kim WK, Liu X, Sandner J, Pasmantier M, Andrews J, Rowland LP, et al. Study of 962 patients indicates progressive muscular atrophy is a form of ALS. Neurology. 2009;73(20):1686-1692. PMID 19917992. PMCID PMC2788803. doi:10.1212/WNL.0b013e3181c1dea3. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0b013e3181c1dea3", "areas": ["A"], "unverified": false}, {"key": "Kimura2006", "text": "Kimura F, Fujimura C, Ishida S, Nakajima H, Furutama D, Uehara H, et al. Progression rate of ALSFRS-R at time of diagnosis predicts survival time in ALS. Neurology. 2006;66(2):265-267. PMID 16434671. doi:10.1212/01.wnl.0000194316.91908.8a. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000194316.91908.8a", "areas": ["A"], "unverified": false}, {"key": "Kleinerova2026", "text": "Kleinerova J, Tully J, Lope J, Tan EL, Toomey A, Siah WF, et al. Driving with Motor Neuron Disease: Disease-Specific Considerations, Multi-Domain Assessments and Support Strategies. Brain Sci. 2026;16(4):408. PMID 42041816. PMCID PMC13114675. doi:10.3390/brainsci16040408. (Abstract read)", "link": "https://doi.org/10.3390/brainsci16040408", "areas": ["G"], "unverified": false}, {"key": "Kleopa1999", "text": "Kleopa KA, Sherman M, Neal B, Romano GJ, Heiman-Patterson T. Bipap improves survival and rate of pulmonary function decline in patients with ALS. J Neurol Sci. 1999;164(1):82-88. PMID 10385053. doi:10.1016/s0022-510x(99)00045-3. (Abstract read)", "link": "https://doi.org/10.1016/s0022-510x(99)00045-3", "areas": ["F"], "unverified": false}, {"key": "Klim2019", "text": "Klim JR, Williams LA, Limone F, Guerra San Juan I, Davis-Dusenbery BN, Mordes DA, et al. ALS-implicated protein TDP-43 sustains levels of STMN2, a mediator of motor neuron growth and repair. Nat Neurosci. 2019;22(2):167-179. PMID 30643292. PMCID PMC7153761. doi:10.1038/s41593-018-0300-4. (Full text read)", "link": "https://doi.org/10.1038/s41593-018-0300-4", "areas": ["B", "I"], "unverified": false}, {"key": "Klyk2026", "text": "Klyk C, Wohnrade C, Petri S, Haghikia A, Körner S, Volk LH. Gold coast criteria but not neurofilaments improve diagnostic sensitivity in a specialized ALS university center. Clin Neurophysiol Pract. 2026;11:512-521. PMID 42583247. PMCID PMC13459124. doi:10.1016/j.cnp.2026.06.004. (Abstract read)", "link": "https://doi.org/10.1016/j.cnp.2026.06.004", "areas": ["D"], "unverified": false}, {"key": "Kollewe2008", "text": "Kollewe K, Mauss U, Krampfl K, Petri S, Dengler R, Mohammadi B. ALSFRS-R score and its ratio: a useful predictor for ALS-progression. J Neurol Sci. 2008;275(1-2):69-73. PMID 18721928. doi:10.1016/j.jns.2008.07.016. (Abstract read; PMID from Europe PMC record, not in the PubMed batch)", "link": "https://doi.org/10.1016/j.jns.2008.07.016", "areas": ["A"], "unverified": false}, {"key": "Korben2022", "text": "Korben VA, Lyashchenko AK, Blanco-Redondo B, Jafar-Nejad P, Shneider NA. Antisense oligonucleotide silencing of FUS expression as a therapeutic approach in amyotrophic lateral sclerosis. Nat Med. 2022;28(1):104-116. PMID 35075293. PMCID PMC8799464. doi:10.1038/s41591-021-01615-z. (Abstract read)", "link": "https://doi.org/10.1038/s41591-021-01615-z", "areas": ["I"], "unverified": false}, {"key": "Krivickas1997", "text": "Krivickas LS, Shockley L, Mitsumoto H. Home care of patients with amyotrophic lateral sclerosis (ALS). J Neurol Sci. 1997;152(Suppl 1):S82-S89. PMID 9419061. doi:10.1016/s0022-510x(97)00251-7. (Abstract read)", "link": "https://doi.org/10.1016/s0022-510x(97)00251-7", "areas": ["G"], "unverified": false}, {"key": "Kumar2004", "text": "Kumar N, Crum B, Petersen RC, Vernino SA, Ahlskog JE. Copper deficiency myelopathy. Arch Neurol. 2004;61(5):762-766. PMID 15148156. doi:10.1001/archneur.61.5.762. (Abstract read)", "link": "https://doi.org/10.1001/archneur.61.5.762", "areas": ["D"], "unverified": false}, {"key": "Kumar2006", "text": "Kumar N. Copper deficiency myelopathy (human swayback). Mayo Clin Proc. 2006;81(10):1371-1384. PMID 17036563. doi:10.4065/81.10.1371. (Abstract read)", "link": "https://doi.org/10.4065/81.10.1371", "areas": ["D"], "unverified": false}, {"key": "Kumar2011", "text": "Kumar DR, Aslinia F, Yale SH, Mazza JJ. Jean-Martin Charcot: the father of neurology. Clin Med Res. 2011;9(1):46-49. PMID 20739583. PMCID PMC3064755. doi:10.3121/cmr.2009.883. (Full text read via PMC)", "link": "https://doi.org/10.3121/cmr.2009.883", "areas": ["A"], "unverified": false}, {"key": "Kuroda1991", "text": "Kuroda Y, Sugihara H. Autopsy report of HTLV-I-associated myelopathy presenting with ALS-like manifestations. J Neurol Sci. 1991;106(2):199-205. PMID 1802968. doi:10.1016/0022-510x(91)90258-9. (Abstract read)", "link": "https://doi.org/10.1016/0022-510x(91)90258-9", "areas": ["D"], "unverified": false}, {"key": "Kurt2007", "text": "Kurt A, Nijboer F, Matuz T, Kübler A. Depression and anxiety in individuals with amyotrophic lateral sclerosis: epidemiology and management. CNS Drugs. 2007;21(4):279-291. PMID 17381183. doi:10.2165/00023210-200721040-00003. (Abstract read)", "link": "https://doi.org/10.2165/00023210-200721040-00003", "areas": ["G"], "unverified": false}, {"key": "KuzmaKozakiewicz2019", "text": "Kuzma-Kozakiewicz M, Andersen PM, Ciecwierska K, Vázquez C, Helczyk O, Loose M, et al. An observational study on quality of life and preferences to sustain life in locked-in state. Neurology. 2019;93(10):e938-e945. PMID 31391247. PMCID PMC6745736. doi:10.1212/WNL.0000000000008064. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0000000000008064", "areas": ["G"], "unverified": false}, {"key": "Kwiatkowski2009", "text": "Kwiatkowski TJ Jr, Bosco DA, Leclerc AL, Tamrazian E, Vanderburg CR, Russ C, et al. Mutations in the FUS/TLS gene on chromosome 16 cause familial amyotrophic lateral sclerosis. Science. 2009;323(5918):1205-8. PMID 19251627. doi:10.1126/science.1166066. (Abstract read)", "link": "https://doi.org/10.1126/science.1166066", "areas": ["C"], "unverified": false}, {"key": "Labra2016", "text": "Labra J, Menon P, Byth K, Morrison S, Vucic S. Rate of disease progression: a prognostic biomarker in ALS. J Neurol Neurosurg Psychiatry. 2016;87(6):628-632. PMID 26152368. doi:10.1136/jnnp-2015-310998. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2015-310998", "areas": ["A"], "unverified": false}, {"key": "Labra2020", "text": "Labra J, Hogden A, Power E, James N, Flood VM. Gastrostomy uptake in motor neurone disease: a mixed-methods study of patients' decision making. BMJ Open. 2020;10(2):e034751. PMID 32102824. PMCID PMC7045239. doi:10.1136/bmjopen-2019-034751. (Abstract read)", "link": "https://doi.org/10.1136/bmjopen-2019-034751", "areas": ["G"], "unverified": false}, {"key": "Lacomblez1996", "text": "Lacomblez L, Bensimon G, Leigh PN, Guillet P, Meininger V. Dose-ranging study of riluzole in amyotrophic lateral sclerosis. Amyotrophic Lateral Sclerosis/Riluzole Study Group II. Lancet. 1996;347(9013):1425-1431. PMID 8676624. doi:10.1016/s0140-6736(96)91680-3. (Abstract read)", "link": "https://doi.org/10.1016/s0140-6736(96)91680-3", "areas": ["E"], "unverified": false}, {"key": "Larkindale2014", "text": "Larkindale J, Yang W, Hogan PF, Simon CJ, Zhang Y, Jain A, et al. Cost of illness for neuromuscular diseases in the United States. Muscle Nerve. 2014;49(3):431-438. PMID 23836444. doi:10.1002/mus.23942. (Abstract read)", "link": "https://doi.org/10.1002/mus.23942", "areas": ["G"], "unverified": false}, {"key": "LaSpada_GeneReviews", "text": "La Spada A. Spinal and Bulbar Muscular Atrophy. In: Adam MP, et al., editors. GeneReviews. Seattle (WA): University of Washington; 1993-. PMID 20301508. (Summary read; revision date not captured)", "link": "https://pubmed.ncbi.nlm.nih.gov/20301508/", "areas": ["D"], "unverified": false}, {"key": "Lawson2014", "text": "Lawson VH, Arnold WD. Multifocal motor neuropathy: a review of pathogenesis, diagnosis, and treatment. Neuropsychiatr Dis Treat. 2014;10:567-576. PMID 24741315. PMCID PMC3983019. doi:10.2147/NDT.S39592. (Full text read; reproduces EFNS/PNS 2010 MMN criteria)", "link": "https://doi.org/10.2147/ndt.s39592", "areas": ["D"], "unverified": false}, {"key": "Lechtzin2002", "text": "Lechtzin N, Wiener CM, Shade DM, Clawson L, Diette GB. Spirometry in the supine position improves the detection of diaphragmatic weakness in patients with amyotrophic lateral sclerosis. Chest. 2002;121(2):436-442. PMID 11834654. doi:10.1378/chest.121.2.436. (Abstract read)", "link": "https://doi.org/10.1378/chest.121.2.436", "areas": ["F", "H"], "unverified": false}, {"key": "Lehman2012", "text": "Lehman EJ, Hein MJ, Baron SL, Gersic CM. Neurodegenerative causes of death among retired National Football League players. Neurology. 2012;79(19):1970-1974. PMID 22955124. PMCID PMC4098841. doi:10.1212/WNL.0b013e31826daf50. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0b013e31826daf50", "areas": ["A"], "unverified": false}, {"key": "Lemon2008", "text": "Lemon RN. Descending pathways in motor control. Annu Rev Neurosci. 2008;31:195-218. PMID 18558853. doi:10.1146/annurev.neuro.31.060407.125547. (Abstract read)", "link": "https://doi.org/10.1146/annurev.neuro.31.060407.125547", "areas": ["B"], "unverified": false}, {"key": "Lewis2007", "text": "Lewis M, Lewis M, Gordon PH. Lou Gehrig, rawhide, and 1938. Neurology. 2007;68(8):615-618. PMID 17310036. doi:10.1212/01.wnl.0000254623.04219.aa. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000254623.04219.aa", "areas": ["A"], "unverified": false}, {"key": "LiHiShing2019", "text": "Li Hi Shing S, Chipika RH, Finegan E, Murray D, Hardiman O, Bede P. Post-polio Syndrome: More Than Just a Lower Motor Neuron Disease. Front Neurol. 2019;10:773. PMID 31379723. PMCID PMC6646725. doi:10.3389/fneur.2019.00773. (Full text read)", "link": "https://doi.org/10.3389/fneur.2019.00773", "areas": ["D"], "unverified": false}, {"key": "Lilleker2017", "text": "Lilleker JB, Rietveld A, Pye SR, Mariampillai K, Benveniste O, Peeters MT, et al. Cytosolic 5'-nucleotidase 1A autoantibody profile and clinical characteristics in inclusion body myositis. Ann Rheum Dis. 2017;76(5):862-868. PMID 28122761. PMCID PMC5530338. doi:10.1136/annrheumdis-2016-210282. (Abstract read)", "link": "https://doi.org/10.1136/annrheumdis-2016-210282", "areas": ["D"], "unverified": false}, {"key": "Lillo2012", "text": "Lillo P, Mioshi E, Hodges JR. Caregiver burden in amyotrophic lateral sclerosis is more dependent on patients' behavioral changes than physical disability: a comparative study. BMC Neurol. 2012;12:156. PMID 23216745. PMCID PMC3541170. doi:10.1186/1471-2377-12-156. (Abstract read)", "link": "https://doi.org/10.1186/1471-2377-12-156", "areas": ["G"], "unverified": false}, {"key": "Lindberg2002", "text": "Lindberg MJ, Tibell L, Oliveberg M. Common denominator of Cu/Zn superoxide dismutase mutants associated with amyotrophic lateral sclerosis: decreased stability of the apo state. Proc Natl Acad Sci U S A. 2002;99(26):16607-12. PMID 12482932. PMCID PMC139191. doi:10.1073/pnas.262527099. (Abstract read)", "link": "https://doi.org/10.1073/pnas.262527099", "areas": ["C"], "unverified": false}, {"key": "Ling2013", "text": "Ling SC, Polymenidou M, Cleveland DW. Converging mechanisms in ALS and FTD: disrupted RNA and protein homeostasis. Neuron. 2013;79(3):416-438. PMID 23931993. PMCID PMC4411085. doi:10.1016/j.neuron.2013.07.033. (Full text read)", "link": "https://doi.org/10.1016/j.neuron.2013.07.033", "areas": ["B"], "unverified": false}, {"key": "Ling2015", "text": "Ling JP, Pletnikova O, Troncoso JC, Wong PC. TDP-43 repression of nonconserved cryptic exons is compromised in ALS-FTD. Science. 2015;349(6248):650-655. PMID 26250685. PMCID PMC4825810. doi:10.1126/science.aab0983. (Abstract read)", "link": "https://doi.org/10.1126/science.aab0983", "areas": ["B"], "unverified": false}, {"key": "Linse2018", "text": "Linse K, Rüger W, Joos M, Schmitz-Peiffer H, Storch A, Hermann A. Usability of eyetracking computer systems and impact on psychological wellbeing in patients with advanced amyotrophic lateral sclerosis. Amyotroph Lateral Scler Frontotemporal Degener. 2018;19(3-4):212-219. PMID 29092645. doi:10.1080/21678421.2017.1392576. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2017.1392576", "areas": ["G"], "unverified": false}, {"key": "LIPCALALSII", "text": "University of Ulm. Efficacy, Safety, and Tolerability of Ultra-high-caloric, Fatty Diet (UFD) in Amyotrophic Lateral Sclerosis (ALS) (LIPCAL-ALS II). ClinicalTrials.gov NCT06280079. (Registry record read, ClinicalTrials.gov API v2, October 2026)", "link": "", "areas": ["F"], "unverified": false}, {"key": "LiuYesucevitz2010", "text": "Liu-Yesucevitz L, Bilgutay A, Zhang YJ, Vanderweyde T, Citro A, Mehta T, et al. Tar DNA binding protein-43 (TDP-43) associates with stress granules: analysis of cultured cells and pathological brain tissue. PLoS One. 2010;5(10):e13250. PMID 20948999. PMCID PMC2952586. doi:10.1371/journal.pone.0013250. (Abstract read)", "link": "https://doi.org/10.1371/journal.pone.0013250", "areas": ["B"], "unverified": false}, {"key": "LoCoco2006", "text": "Lo Coco D, Marchese S, Pesco MC, La Bella V, Piccoli F, Lo Coco A. Noninvasive positive-pressure ventilation in ALS: predictors of tolerance and survival. Neurology. 2006;67(5):761-765. PMID 16899545. doi:10.1212/01.wnl.0000227785.73714.64. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000227785.73714.64", "areas": ["F"], "unverified": false}, {"key": "Logroscino2010", "text": "Logroscino G, Traynor BJ, Hardiman O, Chiò A, Mitchell D, Swingler RJ, et al. Incidence of amyotrophic lateral sclerosis in Europe. J Neurol Neurosurg Psychiatry. 2010;81(4):385-390. PMID 19710046. PMCID PMC2850819. doi:10.1136/jnnp.2009.183525. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.2009.183525", "areas": ["A"], "unverified": false}, {"key": "LongevityTech2025", "text": "Longevity.Technology. Calico misses endpoints in ALS drug trial. 6 January 2025. (Web page read)", "link": "", "areas": ["I"], "unverified": false}, {"key": "Lovett2025", "text": "Lovett A, Chary S, Babu S, Bruneteau G, Glass JD, Karlsborg M, et al. Serious Neurologic Adverse Events in Tofersen Clinical Trials for Amyotrophic Lateral Sclerosis. Muscle Nerve. 2025;71(6):1006-1015. PMID 40017137. PMCID PMC12060635. doi:10.1002/mus.28372. (Abstract read)", "link": "https://doi.org/10.1002/mus.28372", "areas": ["E"], "unverified": false}, {"key": "Lu2015", "text": "Lu CH, Macdonald-Wallis C, Gray E, Pearce N, Petzold A, Norgren N, et al. Neurofilament light chain: A prognostic biomarker in amyotrophic lateral sclerosis. Neurology. 2015;84(22):2247-2257. PMID 25934855. PMCID PMC4456658. doi:10.1212/WNL.0000000000001642. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0000000000001642", "areas": ["B"], "unverified": false}, {"key": "Ludolph2020", "text": "Ludolph AC, Dorst J, Dreyhaupt J, Weishaupt JH, Kassubek J, Weiland U, et al. Effect of High-Caloric Nutrition on Survival in Amyotrophic Lateral Sclerosis. Ann Neurol. 2020;87(2):206-216. PMID 31849093. doi:10.1002/ana.25661. (Abstract read)", "link": "https://doi.org/10.1002/ana.25661", "areas": ["F"], "unverified": false}, {"key": "Luna2019", "text": "Luna J, Diagana M, Ait Aissa L, Tazir M, Ali Pacha L, Kacem I, et al. Clinical features and prognosis of amyotrophic lateral sclerosis in Africa: the TROPALS study. J Neurol Neurosurg Psychiatry. 2019;90(1):20-29. PMID 30242088. doi:10.1136/jnnp-2018-318469. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2018-318469", "areas": ["A"], "unverified": false}, {"key": "Lyall2001", "text": "Lyall RA, Donaldson N, Polkey MI, Leigh PN, Moxham J. Respiratory muscle strength and ventilatory failure in amyotrophic lateral sclerosis. Brain. 2001;124(Pt 10):2000-13. PMID 11571218. doi:10.1093/brain/124.10.2000. (Abstract read)", "link": "https://doi.org/10.1093/brain/124.10.2000", "areas": ["H"], "unverified": false}, {"key": "Ma2022", "text": "Ma XR, Prudencio M, Koike Y, Vatsavayai SC, Kim G, Harbinski F, et al. TDP-43 represses cryptic exon inclusion in the FTD-ALS gene UNC13A. Nature. 2022;603(7899):124-130. PMID 35197626. PMCID PMC8891019. doi:10.1038/s41586-022-04424-7. (Abstract read)", "link": "https://doi.org/10.1038/s41586-022-04424-7", "areas": ["B", "I"], "unverified": false}, {"key": "Mackay2019", "text": "Mackay DF, Russell ER, Stewart K, MacLean JA, Pell JP, Stewart W. Neurodegenerative Disease Mortality among Former Professional Soccer Players. N Engl J Med. 2019;381(19):1801-1808. PMID 31633894. PMCID PMC8747032. doi:10.1056/NEJMoa1908483. (Abstract read)", "link": "https://doi.org/10.1056/nejmoa1908483", "areas": ["A"], "unverified": false}, {"key": "Mackenzie2007", "text": "Mackenzie IR, Bigio EH, Ince PG, Geser F, Neumann M, Cairns NJ, et al. Pathological TDP-43 distinguishes sporadic amyotrophic lateral sclerosis from amyotrophic lateral sclerosis with SOD1 mutations. Ann Neurol. 2007;61(5):427-434. PMID 17469116. doi:10.1002/ana.21147. (Abstract read)", "link": "https://doi.org/10.1002/ana.21147", "areas": ["B", "C"], "unverified": false}, {"key": "Macklin2026", "text": "Macklin EA, Berry JD, Harkey BA, Heyd L, Chase M, Yu H, et al. At-Home Versus in-Clinic Vital Capacity Measurement: Insights From the HEALEY ALS Platform Trial. Muscle Nerve. 2026;74(3):702-708. PMID 42366580. PMCID PMC13471965. doi:10.1002/mus.70322. (Abstract read)", "link": "https://doi.org/10.1002/mus.70322", "areas": ["I"], "unverified": false}, {"key": "Maessen2009", "text": "Maessen M, Veldink JH, Onwuteaka-Philipsen BD, de Vries JM, Wokke JH, van der Wal G, et al. Trends and determinants of end-of-life practices in ALS in the Netherlands. Neurology. 2009;73(12):954-961. PMID 19770471. doi:10.1212/WNL.0b013e3181b87983. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0b013e3181b87983", "areas": ["G"], "unverified": false}, {"key": "Maier2012", "text": "Maier A, Holm T, Wicks P, Steinfurth L, Linke P, Münch C, et al. Online assessment of ALS functional rating scale compares well to in-clinic evaluation: a prospective trial. Amyotroph Lateral Scler. 2012;13(2):210-6. PMID 22292842. PMCID PMC3310482. doi:10.3109/17482968.2011.633268. (Abstract read)", "link": "https://doi.org/10.3109/17482968.2011.633268", "areas": ["H"], "unverified": false}, {"key": "Majounie2012", "text": "Majounie E, Renton AE, Mok K, Dopper EG, Waite A, Rollinson S, et al. Frequency of the C9orf72 hexanucleotide repeat expansion in patients with amyotrophic lateral sclerosis and frontotemporal dementia: a cross-sectional study. Lancet Neurol. 2012;11(4):323-30. PMID 22406228. PMCID PMC3322422. doi:10.1016/S1474-4422(12)70043-1. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(12)70043-1", "areas": ["C"], "unverified": false}, {"key": "Makkonen2018", "text": "Makkonen T, Ruottinen H, Puhto R, Helminen M, Palmio J. Speech deterioration in amyotrophic lateral sclerosis (ALS) after manifestation of bulbar symptoms. Int J Lang Commun Disord. 2018;53(2):385-392. PMID 29159848. doi:10.1111/1460-6984.12357. (Abstract read)", "link": "https://doi.org/10.1111/1460-6984.12357", "areas": ["G"], "unverified": false}, {"key": "Malek2012", "text": "Malek AM, Barchowsky A, Bowser R, Youk A, Talbott EO. Pesticide exposure as a risk factor for amyotrophic lateral sclerosis: a meta-analysis of epidemiological studies: pesticide exposure as a risk factor for ALS. Environ Res. 2012;117:112-119. PMID 22819005. doi:10.1016/j.envres.2012.06.007. (Abstract read)", "link": "https://doi.org/10.1016/j.envres.2012.06.007", "areas": ["A"], "unverified": false}, {"key": "Mandrioli2023", "text": "Mandrioli J, D'Amico R, Zucchi E, De Biasi S, Banchelli F, Martinelli I, et al. Randomized, double-blind, placebo-controlled trial of rapamycin in amyotrophic lateral sclerosis. Nat Commun. 2023;14(1):4970. PMID 37591957. PMCID PMC10435464. doi:10.1038/s41467-023-40734-8. (Abstract read)", "link": "https://doi.org/10.1038/s41467-023-40734-8", "areas": ["I"], "unverified": false}, {"key": "Mangal2024", "text": "Mangal AL, Mücke M, Rolke R, Appelmann I. Advance directives in amyotrophic lateral sclerosis - a systematic review and meta-analysis. BMC Palliat Care. 2024;23(1):191. PMID 39075493. PMCID PMC11285133. doi:10.1186/s12904-024-01524-1. (Abstract read)", "link": "https://doi.org/10.1186/s12904-024-01524-1", "areas": ["G"], "unverified": false}, {"key": "Manjaly2010", "text": "Manjaly ZR, Scott KM, Abhinav K, Wijesekera L, Ganesalingam J, Goldstein LH, et al. The sex ratio in amyotrophic lateral sclerosis: A population based study. Amyotroph Lateral Scler. 2010;11(5):439-442. PMID 20225930. PMCID PMC6485484. doi:10.3109/17482961003610853. (Abstract read)", "link": "https://doi.org/10.3109/17482961003610853", "areas": ["A"], "unverified": false}, {"key": "Mannen1977", "text": "Mannen T, Iwata M, Toyokura Y, Nagashima K. Preservation of a certain motoneurone group of the sacral cord in amyotrophic lateral sclerosis: its clinical significance. J Neurol Neurosurg Psychiatry. 1977;40(5):464-469. PMID 894318. PMCID PMC492721. doi:10.1136/jnnp.40.5.464. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.40.5.464", "areas": ["B"], "unverified": false}, {"key": "Mantilla2008", "text": "Mantilla CB, Sieck GC. Trophic factor expression in phrenic motor neurons. Respir Physiol Neurobiol. 2008;164(1-2):252-262. PMID 18708170. PMCID PMC2642900. doi:10.1016/j.resp.2008.07.018. (Full text read)", "link": "https://doi.org/10.1016/j.resp.2008.07.018", "areas": ["B"], "unverified": false}, {"key": "Marin2011", "text": "Marin B, Desport JC, Kajeu P, Jesus P, Nicolaud B, Nicol M, et al. Alteration of nutritional status at diagnosis is a prognostic factor for survival of amyotrophic lateral sclerosis patients. J Neurol Neurosurg Psychiatry. 2011;82(6):628-634. PMID 21097551. doi:10.1136/jnnp.2010.211474. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.2010.211474", "areas": ["A", "F"], "unverified": false}, {"key": "Marin2017", "text": "Marin B, Boumédiene F, Logroscino G, Couratier P, Babron MC, Leutenegger AL, et al. Variation in worldwide incidence of amyotrophic lateral sclerosis: a meta-analysis. Int J Epidemiol. 2017;46(1):57-74. PMID 27185810. PMCID PMC5407171. doi:10.1093/ije/dyw061. (Abstract read)", "link": "https://doi.org/10.1093/ije/dyw061", "areas": ["A"], "unverified": false}, {"key": "Maruyama2010", "text": "Maruyama H, Morino H, Ito H, Izumi Y, Kato H, Watanabe Y, et al. Mutations of optineurin in amyotrophic lateral sclerosis. Nature. 2010;465(7295):223-6. PMID 20428114. doi:10.1038/nature08971. (Abstract read)", "link": "https://doi.org/10.1038/nature08971", "areas": ["C"], "unverified": false}, {"key": "McEachin2025", "text": "McEachin ZT, Chung M, Stratton SA, Han C, Kim WJ, Sheth U, et al. Molecular impact of antisense oligonucleotide therapy in C9orf72-associated ALS. Cell. 2025;188(23):6424-6435.e17. PMID 40865525. PMCID PMC13054592. doi:10.1016/j.cell.2025.07.045. (Abstract read)", "link": "https://doi.org/10.1016/j.cell.2025.07.045", "areas": ["I"], "unverified": false}, {"key": "MCI186Group2017", "text": "Writing Group; Edaravone (MCI-186) ALS 19 Study Group. Safety and efficacy of edaravone in well defined patients with amyotrophic lateral sclerosis: a randomised, double-blind, placebo-controlled trial. Lancet Neurol. 2017;16(7):505-512. PMID 28522181. doi:10.1016/S1474-4422(17)30115-1. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(17)30115-1", "areas": ["B", "E"], "unverified": false}, {"key": "Mehta2022", "text": "Mehta P, Raymond J, Punjani R, Larson T, Bove F, Kaye W, et al. Prevalence of amyotrophic lateral sclerosis (ALS), United States, 2016. Amyotroph Lateral Scler Frontotemporal Degener. 2022;23(3-4):220-225. PMID 34423697. doi:10.1080/21678421.2021.1949021. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2021.1949021", "areas": ["A"], "unverified": false}, {"key": "Mehta2022inc", "text": "Mehta P, Raymond J, Punjani R, Larson T, Han M, Bove F, et al. Incidence of amyotrophic lateral sclerosis in the United States, 2014-2016. Amyotroph Lateral Scler Frontotemporal Degener. 2022;23(5-6):378-382. PMID 35023792. doi:10.1080/21678421.2021.2023190. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2021.2023190", "areas": ["A"], "unverified": false}, {"key": "Melamed2019", "text": "Melamed Z, Lopez-Erauskin J, Baughn MW, Zhang O, Drenner K, Sun Y, et al. Premature polyadenylation-mediated loss of stathmin-2 is a hallmark of TDP-43-dependent neurodegeneration. Nat Neurosci. 2019;22(2):180-190. PMID 30643298. PMCID PMC6348009. doi:10.1038/s41593-018-0293-z. (Full text read)", "link": "https://doi.org/10.1038/s41593-018-0293-z", "areas": ["B"], "unverified": false}, {"key": "Meyer2023", "text": "Meyer T, Schumann P, Weydt P, Petri S, Koc Y, Spittel S, et al. Neurofilament light-chain response during therapy with antisense oligonucleotide tofersen in SOD1-related ALS: Treatment experience in clinical practice. Muscle Nerve. 2023;67(6):515-521. PMID 36928619. doi:10.1002/mus.27818. (Abstract read)", "link": "https://doi.org/10.1002/mus.27818", "areas": ["E"], "unverified": false}, {"key": "Meyer2026", "text": "Meyer T, Maier A, Grehl T, Weyen U, Rödiger A, Smesny U, et al. Minimum important slowing of disease progression as determined by the ALS functional rating scale - a survey of patient expectations toward disease-modifying drugs in ALS. Amyotroph Lateral Scler Frontotemporal Degener. 2026;27(3-4):457-468. PMID 41557593. doi:10.1080/21678421.2026.2615117. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2026.2615117", "areas": ["A"], "unverified": false}, {"key": "Miller1999AAN", "text": "Miller RG, Rosenberg JA, Gelinas DF, Mitsumoto H, Newman D, Sufit R, et al. Practice parameter: the care of the patient with amyotrophic lateral sclerosis (an evidence-based review) [RETIRED]: report of the Quality Standards Subcommittee of the American Academy of Neurology: ALS Practice Parameters Task Force. Neurology. 1999;52(7):1311-1323. PMID 10227612. doi:10.1212/wnl.52.7.1311. (Record only; no abstract; not cited for any fact)", "link": "https://doi.org/10.1212/wnl.52.7.1311", "areas": ["F"], "unverified": false}, {"key": "Miller2009AAN", "text": "Miller RG, Jackson CE, Kasarskis EJ, England JD, Forshew D, Johnston W, et al. Practice parameter update: the care of the patient with amyotrophic lateral sclerosis: drug, nutritional, and respiratory therapies (an evidence-based review): report of the Quality Standards Subcommittee of the American Academy of Neurology. Neurology. 2009;73(15):1218-1226. PMID 19822872. PMCID PMC2764727. doi:10.1212/WNL.0b013e3181bc0141. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0b013e3181bc0141", "areas": ["E", "F", "H"], "unverified": false}, {"key": "Miller2009AANb", "text": "Miller RG, Jackson CE, Kasarskis EJ, England JD, Forshew D, Johnston W, et al. Practice parameter update: the care of the patient with amyotrophic lateral sclerosis: multidisciplinary care, symptom management, and cognitive/behavioral impairment (an evidence-based review): report of the Quality Standards Subcommittee of the American Academy of Neurology. Neurology. 2009;73(15):1227-1233. PMID 19822873. PMCID PMC2764728. doi:10.1212/WNL.0b013e3181bc01a4. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0b013e3181bc01a4", "areas": ["F", "G", "H"], "unverified": false}, {"key": "Miller2012Cochrane", "text": "Miller RG, Mitchell JD, Moore DH. Riluzole for amyotrophic lateral sclerosis (ALS)/motor neuron disease (MND). Cochrane Database Syst Rev. 2012;(3):CD001447. PMID 22419278. PMCID PMC7055506. doi:10.1002/14651858.CD001447.pub3. (Abstract read)", "link": "https://doi.org/10.1002/14651858.cd001447.pub3", "areas": ["E"], "unverified": false}, {"key": "Miller2022", "text": "Miller TM, Cudkowicz ME, Genge A, Shaw PJ, Sobue G, Bucelli RC, et al. Trial of Antisense Oligonucleotide Tofersen for SOD1 ALS. N Engl J Med. 2022;387(12):1099-1110. PMID 36129998. doi:10.1056/NEJMoa2204705. (Abstract read)", "link": "https://doi.org/10.1056/nejmoa2204705", "areas": ["A", "B", "C", "E", "H", "I"], "unverified": false}, {"key": "Miller2026", "text": "Miller TM, Cudkowicz ME, Shaw PJ, Genge A, Sobue G, Bucelli RC, et al. Long-Term Tofersen in SOD1 Amyotrophic Lateral Sclerosis. JAMA Neurol. 2026;83(2):115-125. PMID 41661214. PMCID PMC12723595. doi:10.1001/jamaneurol.2025.4946. (Abstract read)", "link": "https://doi.org/10.1001/jamaneurol.2025.4946", "areas": ["E", "I"], "unverified": false}, {"key": "Mitchell2023", "text": "Mitchell P, Lee SCM, Yoo PE, Morokoff A, Sharma RP, Williams DL, et al. Assessment of Safety of a Fully Implanted Endovascular Brain-Computer Interface for Severe Paralysis in 4 Patients: The Stentrode With Thought-Controlled Digital Switch (SWITCH) Study. JAMA Neurol. 2023;80(3):270-278. PMID 36622685. PMCID PMC9857731. doi:10.1001/jamaneurol.2022.4847. (Abstract read)", "link": "https://doi.org/10.1001/jamaneurol.2022.4847", "areas": ["G"], "unverified": false}, {"key": "Mizielinska2025", "text": "Mizielinska S, Hautbergue GM, Gendron TF, van Blitterswijk M, Hardiman O, Ravits J, et al. Amyotrophic lateral sclerosis caused by hexanucleotide repeat expansions in C9orf72: from genetics to therapeutics. Lancet Neurol. 2025;24(3):261-274. PMID 39986312. PMCID PMC12010636. doi:10.1016/S1474-4422(25)00026-2. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(25)00026-2", "areas": ["I"], "unverified": false}, {"key": "MNDA2026acute", "text": "Motor Neurone Disease Association. MND in acute, urgent and emergency care (PX017). Version 1, created April 2026, next review April 2029. https://www.mndassociation.org/sites/default/files/public/2026-05/PX017-Acute-urgent-and-emergency-care.pdf (Full text read)", "link": "https://www.mndassociation.org/sites/default/files/public/2026-05/PX017-Acute-urgent-and-emergency-care.pdf", "areas": ["H"], "unverified": false}, {"key": "Moglia2023", "text": "Moglia C, Palumbo F, Veronese S; M.N.D. Italian Study Group; Calvo A. Withdrawal of mechanical ventilation in amyotrophic lateral sclerosis patients: a multicenter Italian survey. Neurol Sci. 2023;44(12):4349-4357. PMID 37418099. PMCID PMC10641048. doi:10.1007/s10072-023-06905-7. (Abstract read)", "link": "https://doi.org/10.1007/s10072-023-06905-7", "areas": ["G"], "unverified": false}, {"key": "Moloney2014", "text": "Moloney EB, de Winter F, Verhaagen J. ALS as a distal axonopathy: molecular mechanisms affecting neuromuscular junction stability in the presymptomatic stages of the disease. Front Neurosci. 2014;8:252. PMID 25177267. PMCID PMC4132373. doi:10.3389/fnins.2014.00252. (Full text read)", "link": "https://doi.org/10.3389/fnins.2014.00252", "areas": ["B"], "unverified": false}, {"key": "Montalvo2021", "text": "Montalvo A, Swash M, de Carvalho M. Benign fasciculations: A follow-up study with electrophysiological studies. Muscle Nerve. 2021;64(6):670-675. PMID 34472123. doi:10.1002/mus.27411. (Abstract read)", "link": "https://doi.org/10.1002/mus.27411", "areas": ["D"], "unverified": false}, {"key": "Montes2006", "text": "Montes J, Levy G, Albert S, Kaufmann P, Buchsbaum R, Gordon PH, et al. Development and evaluation of a self-administered version of the ALSFRS-R. Neurology. 2006;67(7):1294-6. PMID 17030772. doi:10.1212/01.wnl.0000238505.22066.fc. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000238505.22066.fc", "areas": ["H"], "unverified": false}, {"key": "Montine2005", "text": "Montine TJ, Li K, Perl DP, Galasko D. Lack of beta-methylamino-l-alanine in brain from controls, AD, or Chamorros with PDC. Neurology. 2005;65(5):768-769. PMID 16157919. doi:10.1212/01.wnl.0000174523.62022.52. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000174523.62022.52", "areas": ["A"], "unverified": false}, {"key": "Montuschi2015", "text": "Montuschi A, Iazzolino B, Calvo A, Moglia C, Lopiano L, Restagno G, et al. Cognitive correlates in amyotrophic lateral sclerosis: a population-based study in Italy. J Neurol Neurosurg Psychiatry. 2015;86(2):168-173. PMID 24769471. doi:10.1136/jnnp-2013-307223. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2013-307223", "areas": ["G"], "unverified": false}, {"key": "Moore1997", "text": "Moore SR, Gresham LS, Bromberg MB, Kasarkis EJ, Smith RA. A self report measure of affective lability. J Neurol Neurosurg Psychiatry. 1997;63(1):89-93. PMID 9221973. PMCID PMC2169647. doi:10.1136/jnnp.63.1.89. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.63.1.89", "areas": ["H"], "unverified": false}, {"key": "Mora2020", "text": "Mora JS, Genge A, Chio A, Estol CJ, Chaverri D, Hernández M, et al. Masitinib as an add-on therapy to riluzole in patients with amyotrophic lateral sclerosis: a randomized clinical trial. Amyotroph Lateral Scler Frontotemporal Degener. 2020;21(1-2):5-14. PMID 31280619. doi:10.1080/21678421.2019.1632346. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2019.1632346", "areas": ["E", "I"], "unverified": false}, {"key": "Morgan2005", "text": "Morgan RK, McNally S, Alexander M, Conroy R, Hardiman O, Costello RW. Use of Sniff nasal-inspiratory force to predict survival in amyotrophic lateral sclerosis. Am J Respir Crit Care Med. 2005;171(3):269-274. PMID 15516537. doi:10.1164/rccm.200403-314OC. (Abstract read)", "link": "https://doi.org/10.1164/rccm.200403-314oc", "areas": ["F"], "unverified": false}, {"key": "Mori2013", "text": "Mori K, Weng SM, Arzberger T, May S, Rentzsch K, Kremmer E, et al. The C9orf72 GGGGCC repeat is translated into aggregating dipeptide-repeat proteins in FTLD/ALS. Science. 2013;339(6125):1335-8. PMID 23393093. doi:10.1126/science.1232927. (Abstract read)", "link": "https://doi.org/10.1126/science.1232927", "areas": ["C"], "unverified": false}, {"key": "Morimoto2023", "text": "Morimoto S, Takahashi S, Ito D, Daté Y, Okada K, Kato C, et al. Phase 1/2a clinical trial in ALS with ropinirole, a drug candidate identified by iPSC drug discovery. Cell Stem Cell. 2023;30(6):766-780.e9. PMID 37267913. doi:10.1016/j.stem.2023.04.017. (Abstract read)", "link": "https://doi.org/10.1016/j.stem.2023.04.017", "areas": ["E"], "unverified": false}, {"key": "Morrison2013", "text": "UKMND-LiCALS Study Group; Morrison KE, Dhariwal S, Hornabrook R, Savage L, Burn DJ, et al. Lithium in patients with amyotrophic lateral sclerosis (LiCALS): a phase 3 multicentre, randomised, double-blind, placebo-controlled trial. Lancet Neurol. 2013;12(4):339-345. PMID 23453347. PMCID PMC3610091. doi:10.1016/S1474-4422(13)70037-1. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(13)70037-1", "areas": ["E"], "unverified": false}, {"key": "Mueller2020", "text": "Mueller C, Berry JD, McKenna-Yasek DM, Gernoux G, Owegi MA, Pothier LM, et al. SOD1 Suppression with Adeno-Associated Virus and MicroRNA in Familial ALS. N Engl J Med. 2020;383(2):151-158. PMID 32640133. PMCID PMC11836664. doi:10.1056/NEJMoa2005056. (Abstract read)", "link": "https://doi.org/10.1056/nejmoa2005056", "areas": ["I"], "unverified": false}, {"key": "Munch2011", "text": "Munch C, O'Brien J, Bertolotti A. Prion-like propagation of mutant superoxide dismutase-1 misfolding in neuronal cells. Proc Natl Acad Sci U S A. 2011;108(9):3548-3553. PMID 21321227. PMCID PMC3048161. doi:10.1073/pnas.1017275108. (Abstract read)", "link": "https://doi.org/10.1073/pnas.1017275108", "areas": ["B"], "unverified": false}, {"key": "Murphy2017", "text": "Murphy NA, Arthur KC, Tienari PJ, Houlden H, Chiò A, Traynor BJ. Age-related penetrance of the C9orf72 repeat expansion. Sci Rep. 2017;7(1):2116. PMID 28522837. PMCID PMC5437033. doi:10.1038/s41598-017-02364-1. (Full text read)", "link": "https://doi.org/10.1038/s41598-017-02364-1", "areas": ["C"], "unverified": false}, {"key": "Nagai2007", "text": "Nagai M, Re DB, Nagata T, Chalazonitis A, Jessell TM, Wichterle H, et al. Astrocytes expressing ALS-linked mutated SOD1 release factors selectively toxic to motor neurons. Nat Neurosci. 2007;10(5):615-622. PMID 17435755. PMCID PMC3799799. doi:10.1038/nn1876. (Abstract read)", "link": "https://doi.org/10.1038/nn1876", "areas": ["B"], "unverified": false}, {"key": "Naumann2019", "text": "Naumann M, Peikert K, Günther R, van der Kooi AJ, Aronica E, Hübers A, et al. Phenotypes and malignancy risk of different FUS mutations in genetic amyotrophic lateral sclerosis. Ann Clin Transl Neurol. 2019;6(12):2384-2394. PMID 31682085. PMCID PMC6917314. doi:10.1002/acn3.50930. (Abstract read)", "link": "https://doi.org/10.1002/acn3.50930", "areas": ["C"], "unverified": false}, {"key": "NCT00317616", "text": "ClinicalTrials.gov NCT00317616. The Pre-symptomatic Familial Amyotrophic Lateral Sclerosis (Pre-fALS) Study. Status recruiting, last update posted 2026-03-20 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT00317616", "areas": ["I"], "unverified": false}, {"key": "NCT02588677", "text": "ClinicalTrials.gov NCT02588677. Masitinib in Combination With Riluzole for the Treatment of Patients Suffering From Amyotrophic Lateral Sclerosis (ALS). Status completed, last update posted 2023-09-29 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT02588677", "areas": ["I"], "unverified": false}, {"key": "NCT02623699", "text": "ClinicalTrials.gov NCT02623699. An Efficacy, Safety, Tolerability, Pharmacokinetics and Pharmacodynamics Study of BIIB067 (Tofersen) in Adults With Inherited Amyotrophic Lateral Sclerosis (ALS) (VALOR (Part C)). Status completed, last update posted 2023-07-28 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT02623699", "areas": ["I"], "unverified": false}, {"key": "NCT02943850", "text": "ClinicalTrials.gov NCT02943850. CNS10-NPC-GDNF for the Treatment of ALS. Status completed, last update posted 2020-07-15 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT02943850", "areas": ["I"], "unverified": false}, {"key": "NCT03070119", "text": "ClinicalTrials.gov NCT03070119. Long-Term Evaluation of BIIB067 (Tofersen). Status completed, last update posted 2025-08-29 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT03070119", "areas": ["I"], "unverified": false}, {"key": "NCT03127267", "text": "ClinicalTrials.gov NCT03127267. Efficacy and Safety of Masitinib Versus Placebo in the Treatment of ALS Patients. Status recruiting, last update posted 2025-09-12 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT03127267", "areas": ["I"], "unverified": false}, {"key": "NCT03280056", "text": "ClinicalTrials.gov NCT03280056. Safety and Efficacy of Repeated Administrations of NurOwn® in ALS Patients. Status completed, last update posted 2024-02-29 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT03280056", "areas": ["I"], "unverified": false}, {"key": "NCT03548311", "text": "ClinicalTrials.gov NCT03548311. Clinical Trial of Ultra-high Dose Methylcobalamin for ALS (JETALS). Status completed, last update posted 2025-03-26 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT03548311", "areas": ["I"], "unverified": false}, {"key": "NCT03626012", "text": "ClinicalTrials.gov NCT03626012. A Study to Assess the Safety, Tolerability, and Pharmacokinetics of BIIB078 in Adults With C9ORF72-Associated Amyotrophic Lateral Sclerosis. Status completed, last update posted 2022-01-14 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT03626012", "areas": ["I"], "unverified": false}, {"key": "NCT03800524", "text": "ClinicalTrials.gov NCT03800524. Safety and Efficacy of TUDCA as add-on Treatment in Patients Affected by ALS (TUDCA-ALS). Status unknown, last update posted 2023-07-10 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT03800524", "areas": ["I"], "unverified": false}, {"key": "NCT04057898", "text": "ClinicalTrials.gov NCT04057898. Evaluation of MN-166 (Ibudilast) for 12 Months Followed by an Open-label Extension for 6 Months in Patients With ALS (COMBAT-ALS). Status active not recruiting, last update posted 2026-03-06 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT04057898", "areas": ["I"], "unverified": false}, {"key": "NCT04098406", "text": "ClinicalTrials.gov NCT04098406. Therapeutic Nanocatalysis to Slow Disease Progression of Amyotrophic Lateral Sclerosis (ALS) (RESCUE-ALS). Status completed, last update posted 2024-07-03 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT04098406", "areas": ["I"], "unverified": false}, {"key": "NCT04297683", "text": "ClinicalTrials.gov NCT04297683. HEALEY ALS Platform Trial - Master Protocol. Status active not recruiting, last update posted 2026-07-21 (record read 20 Oct 2026). Regimens: A zilucoplan NCT04436497 COMPLETED 2023-07-25; B verdiperstat NCT04436510 COMPLETED 2023-06-12; C CNM-Au8 NCT04414345 COMPLETED 2023-07-25; D pridopidine NCT04615923 COMPLETED 2023-08-23; E trehalose NCT05136885 COMPLETED 2025-05-14.", "link": "https://clinicaltrials.gov/study/NCT04297683", "areas": ["I"], "unverified": false}, {"key": "NCT04302870", "text": "ClinicalTrials.gov NCT04302870. Motor Neurone Disease - Systematic Multi-Arm Adaptive Randomised Trial (MND-SMART). Status recruiting, last update posted 2026-03-04 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT04302870", "areas": ["I"], "unverified": false}, {"key": "NCT04494256", "text": "ClinicalTrials.gov NCT04494256. A Study to Assess the Safety, Tolerability, and Effect on Disease Progression of BIIB105 in Participants With Amyotrophic Lateral Sclerosis (ALS) and Participants With the ALS Ataxin-2 (ATXN2) Genetic Mutation (ALSpire). Status terminated, last update posted 2025-10-09 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT04494256", "areas": ["I"], "unverified": false}, {"key": "NCT04768972", "text": "ClinicalTrials.gov NCT04768972. FUSION: A Study to Evaluate the Efficacy, Safety, Pharmacokinetics and Pharmacodynamics of ION363 in Amyotrophic Lateral Sclerosis Participants With Fused in Sarcoma Mutations (FUS-ALS). Status active not recruiting, last update posted 2026-07-21 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT04768972", "areas": ["I"], "unverified": false}, {"key": "NCT04856982", "text": "ClinicalTrials.gov NCT04856982. Study to Learn If Tofersen (BIIB067) Can Delay ALS Symptoms and About Its Safety in Adults With a SOD1 Gene Mutation Who Have Not Yet Developed ALS Symptoms (ATLAS). Status active not recruiting, last update posted 2026-10-20 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT04856982", "areas": ["I"], "unverified": false}, {"key": "NCT04931862", "text": "ClinicalTrials.gov NCT04931862. Study of WVE-004 in Patients With C9orf72-associated Amyotrophic Lateral Sclerosis (ALS) or Frontotemporal Dementia (FTD) (FOCUS-C9). Status terminated, last update posted 2023-10-23 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT04931862", "areas": ["I"], "unverified": false}, {"key": "NCT05163886", "text": "ClinicalTrials.gov NCT05163886. Study of Safety, Tolerability, and Biological Activity of LAM-002A in C9ORF72-Associated Amyotrophic Lateral Sclerosis. Status completed, last update posted 2026-09-29 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT05163886", "areas": ["I"], "unverified": false}, {"key": "NCT05237284", "text": "ClinicalTrials.gov NCT05237284. Phase 2 Study for SAR443820 in Participants With Amyotrophic Lateral Sclerosis (ALS) (HIMALAYA). Status terminated, last update posted 2025-03-21 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT05237284", "areas": ["I"], "unverified": false}, {"key": "NCT05633459", "text": "ClinicalTrials.gov NCT05633459. A Study Evaluating the Safety and Tolerability of QRL-201 in ALS. Status active not recruiting, last update posted 2026-05-15 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT05633459", "areas": ["I"], "unverified": false}, {"key": "NCT05740813", "text": "ClinicalTrials.gov NCT05740813. HEALEY ALS Platform Trial - Regimen F ABBV-CLS-7262. Status completed, last update posted 2025-11-14 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT05740813", "areas": ["I"], "unverified": false}, {"key": "NCT05842941", "text": "ClinicalTrials.gov NCT05842941. HEALEY ALS Platform Trial - Regimen G DNL343. Status completed, last update posted 2026-01-28 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT05842941", "areas": ["I"], "unverified": false}, {"key": "NCT06008249", "text": "ClinicalTrials.gov NCT06008249. Platform Trial to Assess the Efficacy of Multiple Drugs in Amyotrophic Lateral Sclerosis (ALS). Status terminated, last update posted 2026-05-13 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT06008249", "areas": ["I"], "unverified": false}, {"key": "NCT06100276", "text": "ClinicalTrials.gov NCT06100276. Safety, Tolerability, and Exploratory Efficacy Study of Intrathecally Administered Gene Therapy AMT-162 in Adult Participants With SOD1 Amyotrophic Lateral Sclerosis (SOD1-ALS). Status active not recruiting, last update posted 2025-10-22 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT06100276", "areas": ["I"], "unverified": false}, {"key": "NCT06215755", "text": "ClinicalTrials.gov NCT06215755. A Study of VRG50635 in Participants With Amyotrophic Lateral Sclerosis (ALS). Status terminated, last update posted 2025-12-15 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT06215755", "areas": ["I"], "unverified": false}, {"key": "NCT06392126", "text": "ClinicalTrials.gov NCT06392126. Personalized Antisense Oligonucleotide Therapy for A Single Participant With CHCHD10 ALS. Status active not recruiting, last update posted 2026-07-13 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT06392126", "areas": ["I"], "unverified": false}, {"key": "NCT06973629", "text": "ClinicalTrials.gov NCT06973629. Efficacy and Safety of MSC-NTF (NurOwn) in Participants With Early Symptomatic ALS and Moderate Disease Presentation in ALS (ENDURANCE STUDY). Status not yet recruiting, last update posted 2025-05-22 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT06973629", "areas": ["I"], "unverified": false}, {"key": "NCT07174492", "text": "ClinicalTrials.gov NCT07174492. Efficacy and Safety of Masitinib in Combination With SoC Versus Placebo in the Treatment of ALS Patients. Status not yet recruiting, last update posted 2025-10-03 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT07174492", "areas": ["I"], "unverified": false}, {"key": "NCT07287397", "text": "ClinicalTrials.gov NCT07287397. Study is to Assess the Safety and Tolerability of VTx-002 in Participants With ALS. Status recruiting, last update posted 2026-10-16 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT07287397", "areas": ["I"], "unverified": false}, {"key": "NCT07322003", "text": "ClinicalTrials.gov NCT07322003. Pridopidine Phase 3 Study to Evaluate Efficacy and Safety in ALS (PREVAiLS). Status recruiting, last update posted 2026-10-06 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT07322003", "areas": ["I"], "unverified": false}, {"key": "NCT07410806", "text": "ClinicalTrials.gov NCT07410806. HEALEY ALS Platform Trial - Regimen I NUZ-001. Status active not recruiting, last update posted 2026-07-20 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT07410806", "areas": ["I"], "unverified": false}, {"key": "NCT07862959", "text": "ClinicalTrials.gov NCT07862959. Early Access Program for Ulefnersen in Children, Adolescents and Adults With FUS-associated Amyotrophic Lateral Sclerosis (FUS-ALS). Status available, last update posted 2026-10-07 (record read 20 Oct 2026).", "link": "https://clinicaltrials.gov/study/NCT07862959", "areas": ["I"], "unverified": false}, {"key": "Nelson2019", "text": "Nelson PT, Dickson DW, Trojanowski JQ, Jack CR, Boyle PA, Arfanakis K, et al. Limbic-predominant age-related TDP-43 encephalopathy (LATE): consensus working group report. Brain. 2019;142(6):1503-1527. PMID 31039256. PMCID PMC6536849. doi:10.1093/brain/awz099. (Abstract read)", "link": "https://doi.org/10.1093/brain/awz099", "areas": ["B"], "unverified": false}, {"key": "Neudert2001", "text": "Neudert C, Oliver D, Wasner M, Borasio GD. The course of the terminal phase in patients with amyotrophic lateral sclerosis. J Neurol. 2001;248(7):612-616. PMID 11518004. doi:10.1007/s004150170140. (Abstract read)", "link": "https://doi.org/10.1007/s004150170140", "areas": ["G", "H"], "unverified": false}, {"key": "Neumann2006", "text": "Neumann M, Sampathu DM, Kwong LK, Truax AC, Micsenyi MC, Chou TT, et al. Ubiquitinated TDP-43 in frontotemporal lobar degeneration and amyotrophic lateral sclerosis. Science. 2006;314(5796):130-133. PMID 17023659. doi:10.1126/science.1134108. (Abstract read)", "link": "https://doi.org/10.1126/science.1134108", "areas": ["A", "B", "C"], "unverified": false}, {"key": "NeurologyLive2024", "text": "NeurologyLive. Tauroursodeoxycholic acid falls short in phase 3 study of ALS. 4 April 2024 (topline 7 March 2024). (Web page read)", "link": "", "areas": ["I"], "unverified": false}, {"key": "NeurologyLive2026", "text": "NeurologyLive. Ulefnersen meets primary end point in phase 3 FUSION trial of FUS-ALS. 22 September 2026. https://www.neurologylive.com/view/ulefnersen-meets-primary-end-point-phase-3-fusion-trial-fus-als (Web page read; the Ionis release itself returned HTTP 403)", "link": "https://www.neurologylive.com/view/ulefnersen-meets-primary-end-point-phase-3-fusion-trial-fus-als", "areas": ["I"], "unverified": false}, {"key": "News_AdcommAMX0035", "text": "NeurologyLive / Healio / BioSpace reports of the FDA PCNS advisory committee meetings on AMX0035, 30 Mar 2022 and 7 Sep 2022. (Search summaries only; unverified at FDA)", "link": "", "areas": ["E"], "unverified": true, "note": "Read only through search-engine summaries; the original page was not opened. Treat dates and figures with care."}, {"key": "News_AdcommTofersen", "text": "BioSpace / ALS Association reports of the FDA PCNS advisory committee on tofersen, 22 Mar 2023. (Search summaries only; unverified at FDA)", "link": "", "areas": ["E"], "unverified": true, "note": "Read only through search-engine summaries; the original page was not opened. Treat dates and figures with care."}, {"key": "Ng2009", "text": "Ng L, Khan F, Mathers S. Multidisciplinary care for adults with amyotrophic lateral sclerosis or motor neuron disease. Cochrane Database Syst Rev. 2009;2009(4):CD007425. PMID 19821416. PMCID PMC13508126. doi:10.1002/14651858.CD007425.pub2. (Abstract read)", "link": "https://doi.org/10.1002/14651858.cd007425.pub2", "areas": ["H"], "unverified": false}, {"key": "Ng2017", "text": "Ng L, Khan F, Young CA, Galea M. Symptomatic treatments for amyotrophic lateral sclerosis/motor neuron disease. Cochrane Database Syst Rev. 2017;1(1):CD011776. PMID 28072907. PMCID PMC6469543. doi:10.1002/14651858.CD011776.pub2. (Abstract read)", "link": "https://doi.org/10.1002/14651858.cd011776.pub2", "areas": ["F"], "unverified": false}, {"key": "Nguyen2020", "text": "Nguyen L, Montrasio F, Pattamatta A, Tusi SK, Bardhi O, Meyer KD, et al. Antibody Therapy Targeting RAN Proteins Rescues C9 ALS/FTD Phenotypes in C9orf72 Mouse Model. Neuron. 2020;105(4):645-662.e11. PMID 31831332. PMCID PMC7391607. doi:10.1016/j.neuron.2019.11.007. (Abstract read)", "link": "https://doi.org/10.1016/j.neuron.2019.11.007", "areas": ["I"], "unverified": false}, {"key": "NHSLothian2013", "text": "NHS Lothian Enteral Tube Feeding Best Practice Group. Lothian Enteral Tube Feeding Best Practice Statement: Medicine administration via the enteral feeding tube route. Authorised July 2013; review date July 2018 (past review date). https://policyonline.nhslothian.scot/ (PDF; full text read)", "link": "https://policyonline.nhslothian.scot/", "areas": ["H"], "unverified": false}, {"key": "NICE2016", "text": "National Institute for Health and Care Excellence. Motor neurone disease: assessment and management. NICE guideline NG42. Published 24 Feb 2016, last updated 23 Jul 2019. https://www.nice.org.uk/guidance/ng42/chapter/Recommendations (Recommendations 1.1-1.4 read)", "link": "https://www.nice.org.uk/guidance/ng42", "areas": ["D", "F", "H", "G"], "unverified": false, "aliases": ["NICE2016G"]}, {"key": "Nicolas2018", "text": "Nicolas A, Kenna KP, Renton AE, Ticozzi N, Faghri F, Chia R, et al. Genome-wide Analyses Identify KIF5A as a Novel ALS Gene. Neuron. 2018;97(6):1267-1288. PMID 29566793. PMCID PMC5867896. doi:10.1016/j.neuron.2018.02.027. (Abstract read)", "link": "https://doi.org/10.1016/j.neuron.2018.02.027", "areas": ["C"], "unverified": false}, {"key": "Niedermeyer2019", "text": "Niedermeyer S, Murn M, Choi PJ. Respiratory Failure in Amyotrophic Lateral Sclerosis. Chest. 2019;155(2):401-408. PMID 29990478. doi:10.1016/j.chest.2018.06.035. (Abstract read)", "link": "https://doi.org/10.1016/j.chest.2018.06.035", "areas": ["F"], "unverified": false}, {"key": "Nijssen2017", "text": "Nijssen J, Comley LH, Hedlund E. Motor neuron vulnerability and resistance in amyotrophic lateral sclerosis. Acta Neuropathol. 2017;133(6):863-885. PMID 28409282. PMCID PMC5427160. doi:10.1007/s00401-017-1708-8. (Full text read)", "link": "https://doi.org/10.1007/s00401-017-1708-8", "areas": ["B"], "unverified": false}, {"key": "ODriscoll2017", "text": "O'Driscoll BR, Howard LS, Earis J, Mak V; British Thoracic Society Emergency Oxygen Guideline Group; BTS Emergency Oxygen Guideline Development Group. BTS guideline for oxygen use in adults in healthcare and emergency settings. Thorax. 2017;72(Suppl 1):ii1-ii90. PMID 28507176. doi:10.1136/thoraxjnl-2016-209729. (Record verified; full text not accessible (403); content taken from the BTS template below)", "link": "https://doi.org/10.1136/thoraxjnl-2016-209729", "areas": ["H"], "unverified": false}, {"key": "OHA2026", "text": "Oregon Health Authority, Public Health Division, Center for Health Statistics. Oregon Death with Dignity Act: 2025 Data Summary (revised 17 June 2026). https://www.oregon.gov/oha/PH/PROVIDERPARTNERRESOURCES/EVALUATIONRESEARCH/DEATHWITHDIGNITYACT/Documents/year28.pdf. (Full report read; the 2024 Data Summary, year27.pdf, was also read for comparison)", "link": "https://www.oregon.gov/oha/PH/PROVIDERPARTNERRESOURCES/EVALUATIONRESEARCH/DEATHWITHDIGNITYACT/Documents/year28.pdf", "areas": ["G"], "unverified": false}, {"key": "Oki2022", "text": "Oki R, Izumi Y, Fujita K, Miyamoto R, Nodera H, Sato Y, et al. Efficacy and Safety of Ultrahigh-Dose Methylcobalamin in Early-Stage Amyotrophic Lateral Sclerosis: A Randomized Clinical Trial. JAMA Neurol. 2022;79(6):575-583. PMID 35532908. PMCID PMC9086935. doi:10.1001/jamaneurol.2022.0901. (Abstract read)", "link": "https://doi.org/10.1001/jamaneurol.2022.0901", "areas": ["E", "I"], "unverified": false}, {"key": "Onesti2017", "text": "Onesti E, Schettino I, Gori MC, Frasca V, Ceccanti M, Cambieri C, et al. Dysphagia in Amyotrophic Lateral Sclerosis: Impact on Patient Behavior, Diet Adaptation, and Riluzole Management. Front Neurol. 2017;8:94. PMID 28377742. PMCID PMC5359548. doi:10.3389/fneur.2017.00094. (Abstract read)", "link": "https://doi.org/10.3389/fneur.2017.00094", "areas": ["F", "H"], "unverified": false}, {"key": "Oosthuizen2018", "text": "Oosthuizen I, Dada S, Bornman J, Koul R. Message banking: Perceptions of persons with motor neuron disease, significant others and clinicians. Int J Speech Lang Pathol. 2018;20(7):756-765. PMID 28756688. doi:10.1080/17549507.2017.1356377. (Abstract read)", "link": "https://doi.org/10.1080/17549507.2017.1356377", "areas": ["G"], "unverified": false}, {"key": "OpieMartin2022", "text": "Opie-Martin S, Iacoangeli A, Topp SD, Abel O, Mayl K, Mehta PR, et al. The SOD1-mediated ALS phenotype shows a decoupling between age of symptom onset and disease duration. Nat Commun. 2022;13(1):6901. PMID 36371497. PMCID PMC9653399. doi:10.1038/s41467-022-34620-y. (Full text read; an Author Correction was published, Nat Commun 2024;15:5560, PMID 38956107, not read)", "link": "https://doi.org/10.1038/s41467-022-34620-y", "areas": ["C"], "unverified": false}, {"key": "Oskarsson2018", "text": "Oskarsson B, Moore D, Mozaffar T, Ravits J, Wiedau-Pazos M, Parziale N, et al. Mexiletine for muscle cramps in amyotrophic lateral sclerosis: A randomized, double-blind crossover trial. Muscle Nerve. 2018;58(1):42-48. PMID 29510461. PMCID PMC6126993. doi:10.1002/mus.26117. (Abstract read)", "link": "https://doi.org/10.1002/mus.26117", "areas": ["F"], "unverified": false}, {"key": "Oskarsson2021", "text": "Oskarsson B, Maragakis N, Bedlack RS, Goyal N, Meyer JA, Genge A, et al. MN-166 (ibudilast) in amyotrophic lateral sclerosis in a Phase IIb/III study: COMBAT-ALS study design. Neurodegener Dis Manag. 2021;11(6):431-443. PMID 34816762. doi:10.2217/nmt-2021-0042. (Abstract read)", "link": "https://doi.org/10.2217/nmt-2021-0042", "areas": ["I"], "unverified": false}, {"key": "Otani2024", "text": "Otani R, Shibuya K, Shimizu T, Kitaoji T, Noto YI, Bokuda K, et al. Diagnostic utility of Gold Coast criteria for amyotrophic lateral sclerosis in Asia. Amyotroph Lateral Scler Frontotemporal Degener. 2024;25(3-4):264-270. PMID 38226616. doi:10.1080/21678421.2024.2303062. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2024.2303062", "areas": ["D"], "unverified": false}, {"key": "Paganoni2014", "text": "Paganoni S, Macklin EA, Lee A, Murphy A, Chang J, Zipf A, et al. Diagnostic timelines and delays in diagnosing amyotrophic lateral sclerosis (ALS). Amyotroph Lateral Scler Frontotemporal Degener. 2014;15(5-6):453-456. PMID 24981792. PMCID PMC4433003. doi:10.3109/21678421.2014.903974. (Abstract read)", "link": "https://doi.org/10.3109/21678421.2014.903974", "areas": ["A", "D"], "unverified": false}, {"key": "Paganoni2020", "text": "Paganoni S, Macklin EA, Hendrix S, Berry JD, Elliott MA, Maiser S, et al. Trial of Sodium Phenylbutyrate-Taurursodiol for Amyotrophic Lateral Sclerosis. N Engl J Med. 2020;383(10):919-930. PMID 32877582. PMCID PMC9134321. doi:10.1056/NEJMoa1916945. (Abstract read)", "link": "https://doi.org/10.1056/nejmoa1916945", "areas": ["E"], "unverified": false}, {"key": "Paganoni2021", "text": "Paganoni S, Hendrix S, Dickson SP, Knowlton N, Macklin EA, Berry JD, et al. Long-term survival of participants in the CENTAUR trial of sodium phenylbutyrate-taurursodiol in amyotrophic lateral sclerosis. Muscle Nerve. 2021;63(1):31-39. PMID 33063909. PMCID PMC7820979. doi:10.1002/mus.27091. (Abstract read)", "link": "https://doi.org/10.1002/mus.27091", "areas": ["E"], "unverified": false}, {"key": "Paganoni2025", "text": "Paganoni S, Fournier CN, Macklin EA, Chibnik LB, Quintana M, Saville BR, et al. Efficacy and Safety of Zilucoplan in Amyotrophic Lateral Sclerosis: A Randomized Clinical Trial. JAMA Netw Open. 2025;8(2):e2459058. PMID 39960672. PMCID PMC11833520. doi:10.1001/jamanetworkopen.2024.59058. (Abstract read)", "link": "https://doi.org/10.1001/jamanetworkopen.2024.59058", "areas": ["I"], "unverified": false}, {"key": "Paganoni2026", "text": "Paganoni S, Chibnik LB, Quintana M, Macklin EA, Detry MA, et al. DNL343 and Disease Progression in Amyotrophic Lateral Sclerosis: A Randomized Clinical Trial. JAMA Netw Open. 2026;9(9):e2634809. PMID 42771346. PMCID PMC13598694. doi:10.1001/jamanetworkopen.2026.34809. (Abstract read)", "link": "https://doi.org/10.1001/jamanetworkopen.2026.34809", "areas": ["I"], "unverified": false}, {"key": "Pal2024", "text": "Pal S, Chataway J, Swingler R, Macleod MR, Carragher NO, et al. Safety and efficacy of memantine and trazodone versus placebo for motor neuron disease (MND SMART): stage two interim analysis from the first cycle of a phase 3, multiarm, multistage, randomised, adaptive platform trial. Lancet Neurol. 2024;23(11):1097-1107. PMID 39307154. doi:10.1016/S1474-4422(24)00326-0. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(24)00326-0", "areas": ["I"], "unverified": false}, {"key": "Peters2024", "text": "Peters B, O'Brien K, Fried-Oken M. A recent survey of augmentative and alternative communication use and service delivery experiences of people with amyotrophic lateral sclerosis in the United States. Disabil Rehabil Assist Technol. 2024;19(4):1121-1134. PMID 36448513. doi:10.1080/17483107.2022.2149866. (Abstract read)", "link": "https://doi.org/10.1080/17483107.2022.2149866", "areas": ["G"], "unverified": false}, {"key": "Phelps2017", "text": "Phelps K, Regen E, Oliver D, McDermott C, Faull C. Withdrawal of ventilation at the patient's request in MND: a retrospective exploration of the ethical and legal issues that have arisen for doctors in the UK. BMJ Support Palliat Care. 2017;7(2):189-196. PMID 26362794. PMCID PMC5502251. doi:10.1136/bmjspcare-2014-000826. (Abstract read)", "link": "https://doi.org/10.1136/bmjspcare-2014-000826", "areas": ["H"], "unverified": false}, {"key": "Phukan2012", "text": "Phukan J, Elamin M, Bede P, Jordan N, Gallagher L, Byrne S, et al. The syndrome of cognitive impairment in amyotrophic lateral sclerosis: a population-based study. J Neurol Neurosurg Psychiatry. 2012;83(1):102-108. PMID 21836033. doi:10.1136/jnnp-2011-300188. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2011-300188", "areas": ["G"], "unverified": false}, {"key": "Pioro2010", "text": "Pioro EP, Brooks BR, Cummings J, Schiffer R, Thisted RA, Wynn D, et al. Dextromethorphan plus ultra low-dose quinidine reduces pseudobulbar affect. Ann Neurol. 2010;68(5):693-702. PMID 20839238. doi:10.1002/ana.22093. (Abstract read)", "link": "https://doi.org/10.1002/ana.22093", "areas": ["F"], "unverified": false}, {"key": "Plato2002", "text": "Plato CC, Galasko D, Garruto RM, Plato M, Gamst A, Craig UK, et al. ALS and PDC of Guam: forty-year follow-up. Neurology. 2002;58(5):765-773. PMID 11889241. doi:10.1212/wnl.58.5.765. (Abstract read; PMID per Europe PMC, not in the PubMed batch)", "link": "https://doi.org/10.1212/wnl.58.5.765", "areas": ["A"], "unverified": false}, {"key": "Plato2003", "text": "Plato CC, Garruto RM, Galasko D, Craig UK, Plato M, Gamst A, et al. Amyotrophic lateral sclerosis and parkinsonism-dementia complex of Guam: changing incidence rates during the past 60 years. Am J Epidemiol. 2003;157(2):149-157. PMID 12522022. doi:10.1093/aje/kwf175. (Abstract read)", "link": "https://doi.org/10.1093/aje/kwf175", "areas": ["A"], "unverified": false}, {"key": "Plowman2016", "text": "Plowman EK, Tabor LC, Robison R, Gaziano J, Dion C, Watts SA, et al. Discriminant ability of the Eating Assessment Tool-10 to detect aspiration in individuals with amyotrophic lateral sclerosis. Neurogastroenterol Motil. 2016;28(1):85-90. PMID 26510823. PMCID PMC4688134. doi:10.1111/nmo.12700. (Abstract read)", "link": "https://doi.org/10.1111/nmo.12700", "areas": ["H"], "unverified": false}, {"key": "PMDA2015Radicut", "text": "PMDA/MHLW. Report on the Deliberation Results and Review Report: Radicut Injection 30 mg / Radicut Bag for Intravenous Infusion 30 mg (edaravone), ALS indication, 11 Jun 2015 (English translation). (Full text searched)", "link": "", "areas": ["E"], "unverified": false}, {"key": "PMDA2024Rozebalamin", "text": "PMDA/MHLW. Report on the Deliberation Results and Review Report: Rozebalamin for Injection 25 mg (mecobalamin), 3 Sep 2024 (English translation). (Front matter read)", "link": "", "areas": ["E"], "unverified": false}, {"key": "Polymenidou2011", "text": "Polymenidou M, Lagier-Tourenne C, Hutt KR, Huelga SC, Moran J, Liang TY, et al. Long pre-mRNA depletion and RNA missplicing contribute to neuronal vulnerability from loss of TDP-43. Nat Neurosci. 2011;14(4):459-468. PMID 21358643. PMCID PMC3094729. doi:10.1038/nn.2779. (Abstract read)", "link": "https://doi.org/10.1038/nn.2779", "areas": ["B"], "unverified": false}, {"key": "Prasad2019", "text": "Prasad A, Bharathi V, Sivalingam V, Girdhar A, Patel BK. Molecular Mechanisms of TDP-43 Misfolding and Pathology in Amyotrophic Lateral Sclerosis. Front Mol Neurosci. 2019;12:25. PMID 30837838. PMCID PMC6382748. doi:10.3389/fnmol.2019.00025. (Full text read)", "link": "https://doi.org/10.3389/fnmol.2019.00025", "areas": ["B"], "unverified": false}, {"key": "ProGas2015", "text": "ProGas Study Group. Gastrostomy in patients with amyotrophic lateral sclerosis (ProGas): a prospective cohort study. Lancet Neurol. 2015;14(7):702-709. PMID 26027943. PMCID PMC4578147. doi:10.1016/S1474-4422(15)00104-0. (Full text read)", "link": "https://doi.org/10.1016/s1474-4422(15)00104-0", "areas": ["F", "H"], "unverified": false}, {"key": "Pugdahl2021", "text": "Pugdahl K, Camdessanché JP, Cengiz B, de Carvalho M, Liguori R, Rossatto C, et al. Gold Coast diagnostic criteria increase sensitivity in amyotrophic lateral sclerosis. Clin Neurophysiol. 2021;132(12):3183-3189. PMID 34544646. doi:10.1016/j.clinph.2021.08.014. (Abstract read)", "link": "https://doi.org/10.1016/j.clinph.2021.08.014", "areas": ["D"], "unverified": false}, {"key": "Pupillo2014", "text": "Pupillo E, Messina P, Logroscino G, Beghi E; SLALOM Group. Long-term survival in amyotrophic lateral sclerosis: a population-based study. Ann Neurol. 2014;75(2):287-297. PMID 24382602. doi:10.1002/ana.24096. (Abstract read)", "link": "https://doi.org/10.1002/ana.24096", "areas": ["A", "G"], "unverified": false}, {"key": "Pupillo2014PA", "text": "Pupillo E, Messina P, Giussani G, Logroscino G, Zoccolella S, Chiò A, et al. Physical activity and amyotrophic lateral sclerosis: a European population-based case-control study. Ann Neurol. 2014;75(5):708-716. PMID 24706338. doi:10.1002/ana.24150. (Abstract read)", "link": "https://doi.org/10.1002/ana.24150", "areas": ["A"], "unverified": false}, {"key": "Pupillo2025", "text": "Pupillo E, Bianchi E, Leone MA, Corbo M, Filosto M, Padovani A, et al. Understanding Long-Term Survival in ALS: A Cohort Study on Subject Characteristics and Prognostic Factors. J Clin Med. 2025;14(20):7351. PMID 41156220. PMCID PMC12565721. doi:10.3390/jcm14207351. (Abstract read)", "link": "https://doi.org/10.3390/jcm14207351", "areas": ["A"], "unverified": false}, {"key": "Quail2025", "text": "Quail NPA, Leighton DJ, Newton J, Davidson S, Kelly L, McKeown A, et al. Influences of Specialist Palliative Care Team Input, Advance Care Planning, Non-Invasive Ventilation and Gastrostomy Status on Unscheduled Hospital Admissions and Place of Death for People with Motor Neuron Disease: A Retrospective Cohort Analysis. J Palliat Care. 2025;40(1):89-97. PMID 39344431. doi:10.1177/08258597241283179. (Abstract read)", "link": "https://doi.org/10.1177/08258597241283179", "areas": ["G"], "unverified": false}, {"key": "QurAlis2026", "text": "QurAlis. QRL-201 ANQUR interim results press release, 23-24 February 2026 (BioSpace reprint of Business Wire). (Web page read)", "link": "", "areas": ["I"], "unverified": false}, {"key": "Rabkin2005", "text": "Rabkin JG, Albert SM, Del Bene ML, O'Sullivan I, Tider T, Rowland LP, et al. Prevalence of depressive disorders and change over time in late-stage ALS. Neurology. 2005;65(1):62-67. PMID 16009886. PMCID PMC1201558. doi:10.1212/01.wnl.0000167187.14501.0c. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000167187.14501.0c", "areas": ["G"], "unverified": false}, {"key": "Rabkin2013", "text": "Rabkin J, Ogino M, Goetz R, McElhiney M, Marziliano A, Imai T, et al. Tracheostomy with invasive ventilation for ALS patients: neurologists' roles in the US and Japan. Amyotroph Lateral Scler Frontotemporal Degener. 2013;14(2):116-123. PMID 23039060. doi:10.3109/17482968.2012.726226. (Abstract read)", "link": "https://doi.org/10.3109/17482968.2012.726226", "areas": ["F"], "unverified": false}, {"key": "Radakovic2025", "text": "Radakovic R, Gray D, Trucco AP, Bregola A, Mioshi E, Copsey H, et al. Impact of apathy over the course of disease in amyotrophic lateral sclerosis. Amyotroph Lateral Scler Frontotemporal Degener. 2025;26(5-6):516-525. PMID 40298207. doi:10.1080/21678421.2025.2495020. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2025.2495020", "areas": ["G"], "unverified": false}, {"key": "Radunovic2017", "text": "Radunovic A, Annane D, Rafiq MK, Brassington R, Mustfa N. Mechanical ventilation for amyotrophic lateral sclerosis/motor neuron disease. Cochrane Database Syst Rev. 2017;10(10):CD004427. PMID 28982219. PMCID PMC6485636. doi:10.1002/14651858.CD004427.pub4. (Abstract read)", "link": "https://doi.org/10.1002/14651858.cd004427.pub4", "areas": ["F"], "unverified": false}, {"key": "Rafiq2015", "text": "Rafiq MK, Bradburn M, Proctor AR, Billings CG, Bianchi S, McDermott CJ, et al. A preliminary randomized trial of the mechanical insufflator-exsufflator versus breath-stacking technique in patients with amyotrophic lateral sclerosis. Amyotroph Lateral Scler Frontotemporal Degener. 2015;16(7-8):448-455. PMID 26140500. doi:10.3109/21678421.2015.1051992. (Abstract read)", "link": "https://doi.org/10.3109/21678421.2015.1051992", "areas": ["F"], "unverified": false}, {"key": "Rakhit2004", "text": "Rakhit R, Crow JP, Lepock JR, Kondejewski LH, Cashman NR, Chakrabartty A. Monomeric Cu,Zn-superoxide dismutase is a common misfolding intermediate in the oxidation models of sporadic and familial amyotrophic lateral sclerosis. J Biol Chem. 2004;279(15):15499-504. PMID 14734542. doi:10.1074/jbc.M313295200. (Abstract read)", "link": "https://doi.org/10.1074/jbc.m313295200", "areas": ["C"], "unverified": false}, {"key": "Ran2026", "text": "Ran X, Wuu J, Qin ZS, McDermott MP, Cooper-Knock J, Li Y, et al. Longitudinal plasma proteomics predict phenoconversion to clinically manifest ALS. Nat Med. 2026;32(9):3417-3429. PMID 42509371. PMCID PMC13577924. doi:10.1038/s41591-026-04528-x. (Abstract read)", "link": "https://doi.org/10.1038/s41591-026-04528-x", "areas": ["I"], "unverified": false}, {"key": "Ravits2009", "text": "Ravits JM, La Spada AR. ALS motor phenotype heterogeneity, focality, and spread: deconstructing motor neuron degeneration. Neurology. 2009;73(10):805-811. PMID 19738176. PMCID PMC2739608. doi:10.1212/WNL.0b013e3181b6bbbd. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0b013e3181b6bbbd", "areas": ["B"], "unverified": false}, {"key": "Raymond2026", "text": "Raymond J, Oskarsson B, Larson T, Mohidul S, Horton DK, Mehta P. Place of Death in Patients with Motor Neuron Disease and the Association with Comorbidities During the Coronavirus Disease 2019 Pandemic: A Population-Based Analysis. J Palliat Care. 2026;41(2):159-165. PMID 40530462. doi:10.1177/08258597251349627. (Abstract read)", "link": "https://doi.org/10.1177/08258597251349627", "areas": ["G"], "unverified": false}, {"key": "Reaume1996", "text": "Reaume AG, Elliott JL, Hoffman EK, Kowall NW, Ferrante RJ, Siwek DF, et al. Motor neurons in Cu/Zn superoxide dismutase-deficient mice develop normally but exhibit enhanced cell death after axonal injury. Nat Genet. 1996;13(1):43-7. PMID 8673102. doi:10.1038/ng0596-43. (Abstract read)", "link": "https://doi.org/10.1038/ng0596-43", "areas": ["C"], "unverified": false}, {"key": "Renton2011", "text": "Renton AE, Majounie E, Waite A, Simón-Sánchez J, Rollinson S, Gibbs JR, et al. A hexanucleotide repeat expansion in C9ORF72 is the cause of chromosome 9p21-linked ALS-FTD. Neuron. 2011;72(2):257-268. PMID 21944779. PMCID PMC3200438. doi:10.1016/j.neuron.2011.09.010. (Abstract read)", "link": "https://doi.org/10.1016/j.neuron.2011.09.010", "areas": ["A", "B", "C"], "unverified": false}, {"key": "Renton2014", "text": "Renton AE, Chiò A, Traynor BJ. State of play in amyotrophic lateral sclerosis genetics. Nat Neurosci. 2014;17(1):17-23. PMID 24369373. PMCID PMC4544832. doi:10.1038/nn.3584. (Full text read, author manuscript)", "link": "https://doi.org/10.1038/nn.3584", "areas": ["C"], "unverified": false}, {"key": "Robbins2001", "text": "Robbins RA, Simmons Z, Bremer BA, Walsh SM, Fischer S. Quality of life in ALS is maintained as physical function declines. Neurology. 2001;56(4):442-444. PMID 11222784. doi:10.1212/wnl.56.4.442. (Abstract read)", "link": "https://doi.org/10.1212/wnl.56.4.442", "areas": ["G"], "unverified": false}, {"key": "Roche2012", "text": "Roche JC, Rojas-Garcia R, Scott KM, Scotton W, Ellis CE, Burman R, et al. A proposed staging system for amyotrophic lateral sclerosis. Brain. 2012;135(Pt 3):847-852. PMID 22271664. PMCID PMC3286327. doi:10.1093/brain/awr351. (Full text read)", "link": "https://doi.org/10.1093/brain/awr351", "areas": ["A"], "unverified": false}, {"key": "Rochester2025", "text": "Rochester A. Quality improvement project to reduce the incidence of nasal bridge pressure sores in adults requiring acute non-invasive ventilation (NIV) and continuous positive airway pressure (CPAP). BMJ Open Qual. 2025;14(2). PMID 40180353. PMCID PMC11967000. doi:10.1136/bmjoq-2024-003238. (Abstract read)", "link": "https://doi.org/10.1136/bmjoq-2024-003238", "areas": ["H"], "unverified": false}, {"key": "Roggenbuck2023", "text": "Roggenbuck J, Eubank BHF, Wright J, Harms MB, Kolb SJ; ALS Genetic Testing and Counseling Guidelines Expert Panel. Evidence-based consensus guidelines for ALS genetic testing and counseling. Ann Clin Transl Neurol. 2023;10(11):2074-2091. PMID 37691292. PMCID PMC10646996. doi:10.1002/acn3.51895. (Full text read)", "link": "https://doi.org/10.1002/acn3.51895", "areas": ["C"], "unverified": false}, {"key": "Rooney2015", "text": "Rooney J, Byrne S, Heverin M, Tobin K, Dick A, Donaghy C, et al. A multidisciplinary clinic approach improves survival in ALS: a comparative study of ALS in Ireland and Northern Ireland. J Neurol Neurosurg Psychiatry. 2015;86(5):496-501. PMID 25550416. doi:10.1136/jnnp-2014-309601. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2014-309601", "areas": ["F", "G", "H"], "unverified": false}, {"key": "Rooney2017", "text": "Rooney J, Burke T, Vajda A, Heverin M, Hardiman O. What does the ALSFRS-R really measure? A longitudinal and survival analysis of functional dimension subscores in amyotrophic lateral sclerosis. J Neurol Neurosurg Psychiatry. 2017;88(5):381-385. PMID 27888187. doi:10.1136/jnnp-2016-314661. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2016-314661", "areas": ["A"], "unverified": false}, {"key": "Rosen1993", "text": "Rosen DR, Siddique T, Patterson D, Figlewicz DA, Sapp P, Hentati A, et al. Mutations in Cu/Zn superoxide dismutase gene are associated with familial amyotrophic lateral sclerosis. Nature. 1993;362(6415):59-62. PMID 8446170. doi:10.1038/362059a0. (Abstract read)", "link": "https://doi.org/10.1038/362059a0", "areas": ["A", "C"], "unverified": false}, {"key": "Rothstein1992", "text": "Rothstein JD, Martin LJ, Kuncl RW. Decreased glutamate transport by the brain and spinal cord in amyotrophic lateral sclerosis. N Engl J Med. 1992;326(22):1464-1468. PMID 1349424. doi:10.1056/NEJM199205283262204. (Abstract read)", "link": "https://doi.org/10.1056/nejm199205283262204", "areas": ["B"], "unverified": false}, {"key": "Rothstein1995", "text": "Rothstein JD, Van Kammen M, Levey AI, Martin LJ, Kuncl RW. Selective loss of glial glutamate transporter GLT-1 in amyotrophic lateral sclerosis. Ann Neurol. 1995;38(1):73-84. PMID 7611729. doi:10.1002/ana.410380114. (Abstract read)", "link": "https://doi.org/10.1002/ana.410380114", "areas": ["B"], "unverified": false}, {"key": "Ryan2019", "text": "Ryan M, Heverin M, McLaughlin RL, Hardiman O. Lifetime Risk and Heritability of Amyotrophic Lateral Sclerosis. JAMA Neurol. 2019;76(11):1367-1374. PMID 31329211. PMCID PMC6646974. doi:10.1001/jamaneurol.2019.2044. (Full text read via PMC)", "link": "https://doi.org/10.1001/jamaneurol.2019.2044", "areas": ["A", "C"], "unverified": false}, {"key": "Saeed2026", "text": "Saeed Y, Fatima M, Rehman MU, Aslam MH. Diagnostic Delay in Amyotrophic Lateral Sclerosis: A Systematic Review and Meta-Analysis Comparing Time From Symptom Onset to Diagnosis in Bulbar-Onset Versus Limb-Onset Disease. Cureus. 2026;18(7):e113188. PMCID PMC13498669. doi:10.7759/cureus.113188. (Abstract read; PMID 42632975 per Europe PMC, not in the PubMed batch)", "link": "https://doi.org/10.7759/cureus.113188", "areas": ["A", "D"], "unverified": false}, {"key": "Salmon2026", "text": "Salmon K, de Majo M, Basak N, Crook A, Cummings C, Dratch L, et al. Global best practice recommendations for genetic counselling and testing in amyotrophic lateral sclerosis. Brain. 2026 (online ahead of print 27 Oct 2026):awag375. PMID 42945473; doi:10.1093/brain/awag375. Validated: PubMed, 2026-10-29 (abstract only; added by research update U-2026-10-29).", "link": "https://doi.org/10.1093/brain/awag375", "areas": ["C"], "unverified": false}, {"key": "Sferruzza2022", "text": "Sferruzza G, Bosco L, Falzone YM, Russo T, Domi T, Quattrini A, et al. Neurofilament light chain as a biological marker for amyotrophic lateral sclerosis: a meta-analysis study. Amyotroph Lateral Scler Frontotemporal Degener. 2022;23(5-6):446-457. PMID 34874217. doi:10.1080/21678421.2021.2007952. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2021.2007952", "areas": ["D"], "unverified": false}, {"key": "Sheffield2026", "text": "University of Sheffield. Novel clinical trial platform could dramatically speed up search for Motor Neuron Disease treatments. 11 August 2026. (Web page read)", "link": "", "areas": ["I"], "unverified": false}, {"key": "Shefner2020", "text": "Shefner JM, Al-Chalabi A, Baker MR, Cui LY, de Carvalho M, Eisen A, et al. A proposal for new diagnostic criteria for ALS. Clin Neurophysiol. 2020;131(8):1975-1978. PMID 32387049. doi:10.1016/j.clinph.2020.04.005. (Record read; no abstract)", "link": "https://doi.org/10.1016/j.clinph.2020.04.005", "areas": ["A", "D"], "unverified": false}, {"key": "Shefner2025", "text": "Shefner JM, Cudkowicz ME, Genge A, Hardiman O, Al-Chalabi A, Andrews JA, et al. Reldesemtiv in Amyotrophic Lateral Sclerosis: Results From the COURAGE-ALS Randomized Clinical Trial. JAMA Neurol. 2025;82(5):477-485. PMID 40126464. PMCID PMC11933997. doi:10.1001/jamaneurol.2025.0241. (Abstract read)", "link": "https://doi.org/10.1001/jamaneurol.2025.0241", "areas": ["E"], "unverified": false}, {"key": "Shen2021", "text": "Shen D, Yang X, Wang Y, He D, Sun X, Cai Z, et al. The Gold Coast criteria increases the diagnostic sensitivity for amyotrophic lateral sclerosis in a Chinese population. Transl Neurodegener. 2021;10(1):28. PMID 34372918. PMCID PMC8351337. doi:10.1186/s40035-021-00253-2. (Abstract read; full text skimmed)", "link": "https://doi.org/10.1186/s40035-021-00253-2", "areas": ["D"], "unverified": false}, {"key": "Shepheard2021", "text": "Shepheard SR, Parker MD, Cooper-Knock J, Verber NS, Tuddenham L, Heath P, et al. Value of systematic genetic screening of patients with amyotrophic lateral sclerosis. J Neurol Neurosurg Psychiatry. 2021;92(5):510-518. PMID 33589474. PMCID PMC8053339. doi:10.1136/jnnp-2020-325014. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2020-325014", "areas": ["C"], "unverified": false}, {"key": "Shimizu2019", "text": "Shimizu T, Nakayama Y, Matsuda C, Haraguchi M, Bokuda K, Ishikawa-Takata K, et al. Prognostic significance of body weight variation after diagnosis in ALS: a single-centre prospective cohort study. J Neurol. 2019;266(6):1412-1420. PMID 30868220. doi:10.1007/s00415-019-09276-2. (Abstract read)", "link": "https://doi.org/10.1007/s00415-019-09276-2", "areas": ["F"], "unverified": false}, {"key": "Shneider2025", "text": "Shneider NA, Harms MB, Korobeynikov VA, Rifai OM, Hoover BN, Harrington EA, et al. Antisense oligonucleotide jacifusen for FUS-ALS: an investigator-initiated, multicentre, open-label case series. Lancet. 2025;405(10494):2075-2086. PMID 40414239. PMCID PMC12407188. doi:10.1016/S0140-6736(25)00513-6. (Abstract read)", "link": "https://doi.org/10.1016/s0140-6736(25)00513-6", "areas": ["I"], "unverified": false}, {"key": "Shoesmith2007", "text": "Shoesmith CL, Findlater K, Rowe A, Strong MJ. Prognosis of amyotrophic lateral sclerosis with respiratory onset. J Neurol Neurosurg Psychiatry. 2007;78(6):629-631. PMID 17088331. PMCID PMC2077959. doi:10.1136/jnnp.2006.103564. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.2006.103564", "areas": ["A"], "unverified": false}, {"key": "Shoesmith2020", "text": "Shoesmith C, Abrahao A, Benstead T, Chum M, Dupre N, Izenberg A, et al. Canadian best practice recommendations for the management of amyotrophic lateral sclerosis. CMAJ. 2020;192(46):E1453-E1468. PMID 33199452. PMCID PMC7683000. doi:10.1503/cmaj.191721. (Full text read: recommendation table, via WebFetch)", "link": "https://doi.org/10.1503/cmaj.191721", "areas": ["F"], "unverified": false}, {"key": "Shrestha2026", "text": "Shrestha N, Munn Z, Calma A, Pavey N, Tsuji Y, Menon P, et al. Gold Coast criteria for ALS diagnosis: individual participant data meta-analysis. J Neurol. 2026;273(9):532. PMID 42618698. PMCID PMC13489995. doi:10.1007/s00415-026-14046-y. (Full text read)", "link": "https://doi.org/10.1007/s00415-026-14046-y", "areas": ["D"], "unverified": false}, {"key": "Silverman2019", "text": "Silverman HE, Goldman JS, Huey ED. Links Between the C9orf72 Repeat Expansion and Psychiatric Symptoms. Curr Neurol Neurosci Rep. 2019;19(12):93. PMID 31773397. doi:10.1007/s11910-019-1017-9. (Abstract read)", "link": "https://doi.org/10.1007/s11910-019-1017-9", "areas": ["C"], "unverified": false}, {"key": "Simmons2000", "text": "Simmons Z, Bremer BA, Robbins RA, Walsh SM, Fischer S. Quality of life in ALS depends on factors other than strength and physical function. Neurology. 2000;55(3):388-392. PMID 10932273. doi:10.1212/wnl.55.3.388. (Abstract read)", "link": "https://doi.org/10.1212/wnl.55.3.388", "areas": ["G"], "unverified": false}, {"key": "Simone2018", "text": "Simone R, Balendra R, Moens TG, Preza E, Wilson KM, Heslegrave A, et al. G-quadruplex-binding small molecules ameliorate C9orf72 FTD/ALS pathology in vitro and in vivo. EMBO Mol Med. 2018;10(1):22-31. PMID 29113975. PMCID PMC5760849. doi:10.15252/emmm.201707850. (Abstract read)", "link": "https://doi.org/10.15252/emmm.201707850", "areas": ["I"], "unverified": false}, {"key": "Smith2017", "text": "Smith BN, Topp SD, Fallini C, Shibata H, Chen HJ, Troakes C, et al. Mutations in the vesicular trafficking protein annexin A11 are associated with amyotrophic lateral sclerosis. Sci Transl Med. 2017;9(388):eaad9157. PMID 28469040. PMCID PMC6599403. doi:10.1126/scitranslmed.aad9157. (Abstract read)", "link": "https://doi.org/10.1126/scitranslmed.aad9157", "areas": ["C"], "unverified": false}, {"key": "Smith2025", "text": "Smith SE, McCoy-Gross K, Malcolm A, Oranski J, Markway JW, Miller TM, et al. Tofersen treatment leads to sustained stabilization of disease in SOD1 ALS in a \"real-world\" setting. Ann Clin Transl Neurol. 2025;12(2):311-319. PMID 39783194. PMCID PMC11822806. doi:10.1002/acn3.52264. (Abstract read)", "link": "https://doi.org/10.1002/acn3.52264", "areas": ["E"], "unverified": false}, {"key": "Solazzo2011", "text": "Solazzo A, Del Vecchio L, Reginelli A, Monaco L, Sagnelli A, Monsorrò M, et al. Search for compensation postures with videofluoromanometric investigation in dysphagic patients affected by amyotrophic lateral sclerosis. Radiol Med. 2011;116(7):1083-94. PMID 21643631. doi:10.1007/s11547-011-0698-1. (Abstract read)", "link": "https://doi.org/10.1007/s11547-011-0698-1", "areas": ["H"], "unverified": false}, {"key": "Spataro2010", "text": "Spataro R, Lo Re M, Piccoli T, Piccoli F, La Bella V. Causes and place of death in Italian patients with amyotrophic lateral sclerosis. Acta Neurol Scand. 2010;122(3):217-223. PMID 20078446. doi:10.1111/j.1600-0404.2009.01290.x. (Abstract read)", "link": "https://doi.org/10.1111/j.1600-0404.2009.01290.x", "areas": ["A"], "unverified": false}, {"key": "Spataro2012", "text": "Spataro R, Bono V, Marchese S, La Bella V. Tracheostomy mechanical ventilation in patients with amyotrophic lateral sclerosis: clinical features and survival analysis. J Neurol Sci. 2012;323(1-2):66-70. PMID 22989611. doi:10.1016/j.jns.2012.08.011. (Abstract read)", "link": "https://doi.org/10.1016/j.jns.2012.08.011", "areas": ["F"], "unverified": false}, {"key": "Spencer1987", "text": "Spencer PS, Nunn PB, Hugon J, Ludolph AC, Ross SM, Roy DN, et al. Guam amyotrophic lateral sclerosis-parkinsonism-dementia linked to a plant excitant neurotoxin. Science. 1987;237(4814):517-522. PMID 3603037. doi:10.1126/science.3603037. (Abstract read)", "link": "https://doi.org/10.1126/science.3603037", "areas": ["A"], "unverified": false}, {"key": "Spittel2021", "text": "Spittel S, Maier A, Kettemann D, Walter B, Koch B, Krause K, et al. Non-invasive and tracheostomy invasive ventilation in amyotrophic lateral sclerosis: Utilization and survival rates in a cohort study over 12 years in Germany. Eur J Neurol. 2021;28(4):1160-1171. PMID 33210770. doi:10.1111/ene.14647. (Abstract read)", "link": "https://doi.org/10.1111/ene.14647", "areas": ["F"], "unverified": false}, {"key": "Sreedharan2008", "text": "Sreedharan J, Blair IP, Tripathi VB, Hu X, Vance C, Rogelj B, et al. TDP-43 mutations in familial and sporadic amyotrophic lateral sclerosis. Science. 2008;319(5870):1668-72. PMID 18309045. PMCID PMC7116650. doi:10.1126/science.1154584. (Abstract read)", "link": "https://doi.org/10.1126/science.1154584", "areas": ["C"], "unverified": false}, {"key": "Stavroulakis2013", "text": "Stavroulakis T, Walsh T, Shaw PJ, McDermott CJ; ProGas Study. Gastrostomy use in motor neurone disease (MND): a review, meta-analysis and survey of current practice. Amyotroph Lateral Scler Frontotemporal Degener. 2013;14(2):96-104. PMID 22985431. doi:10.3109/17482968.2012.723722. (Abstract read)", "link": "https://doi.org/10.3109/17482968.2012.723722", "areas": ["F"], "unverified": false}, {"key": "Steinacker2016", "text": "Steinacker P, Feneberg E, Weishaupt J, Brettschneider J, Tumani H, Andersen PM, et al. Neurofilaments in the diagnosis of motoneuron diseases: a prospective study on 455 patients. J Neurol Neurosurg Psychiatry. 2016;87(1):12-20. PMID 26296871. doi:10.1136/jnnp-2015-311387. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2015-311387", "areas": ["D"], "unverified": false}, {"key": "Steyn2018", "text": "Steyn FJ, Ioannides ZA, van Eijk RPA, Heggie S, Thorpe KA, Ceslis A, et al. Hypermetabolism in ALS is associated with greater functional decline and shorter survival. J Neurol Neurosurg Psychiatry. 2018;89(10):1016-1023. PMID 29706605. PMCID PMC6166607. doi:10.1136/jnnp-2017-317887. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2017-317887", "areas": ["F"], "unverified": false}, {"key": "Strong2017", "text": "Strong MJ, Abrahams S, Goldstein LH, Woolley S, Mclaughlin P, Snowden J, et al. Amyotrophic lateral sclerosis - frontotemporal spectrum disorder (ALS-FTSD): Revised diagnostic criteria. Amyotroph Lateral Scler Frontotemporal Degener. 2017;18(3-4):153-174. PMID 28054827. PMCID PMC7409990. doi:10.1080/21678421.2016.1267768. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2016.1267768", "areas": ["A", "D", "G"], "unverified": false}, {"key": "Sulistyo2023", "text": "Sulistyo A, Abrahao A, Freitas ME, Ritsma B, Zinman L. Enteral tube feeding for amyotrophic lateral sclerosis/motor neuron disease. Cochrane Database Syst Rev. 2023;8(8):CD004030. PMID 37579081. PMCID PMC10413437. doi:10.1002/14651858.CD004030.pub4. (Abstract read)", "link": "https://doi.org/10.1002/14651858.cd004030.pub4", "areas": ["F"], "unverified": false}, {"key": "Swash2012", "text": "Swash M. Why are upper motor neuron signs difficult to elicit in amyotrophic lateral sclerosis? J Neurol Neurosurg Psychiatry. 2012;83(6):659-662. PMID 22496581. doi:10.1136/jnnp-2012-302315. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2012-302315", "areas": ["B"], "unverified": false}, {"key": "Takacs2022", "text": "Takacs SM, Comer AR. Documentation of advance care planning forms in patients with amyotrophic lateral sclerosis. Muscle Nerve. 2022;65(2):187-192. PMID 34787317. doi:10.1002/mus.27462. (Abstract read)", "link": "https://doi.org/10.1002/mus.27462", "areas": ["G"], "unverified": false}, {"key": "Tang2021", "text": "Tang S, Li L, Xue H, Cao S, Li C, Han K, et al. Caregiver burden and associated factors among primary caregivers of patients with ALS in home care: a cross-sectional survey study. BMJ Open. 2021;11(9):e050185. PMID 34588253. PMCID PMC8480006. doi:10.1136/bmjopen-2021-050185. (Full text read)", "link": "https://doi.org/10.1136/bmjopen-2021-050185", "areas": ["H"], "unverified": false}, {"key": "Taule2025", "text": "Taule T, Tysnes OB, Aßmus J, Morland AS, Renså MA, Revheim T, et al. Early cognitive decline in amyotrophic lateral sclerosis and its relation to driving: an observational study. J Rehabil Med. 2025;57:jrm43483. PMID 40988501. PMCID PMC12490105. doi:10.2340/jrm.v57.43483. (Abstract read)", "link": "https://doi.org/10.2340/jrm.v57.43483", "areas": ["G"], "unverified": false}, {"key": "Taylor2016", "text": "Taylor JP, Brown RH, Cleveland DW. Decoding ALS: from genes to mechanism. Nature. 2016;539(7628):197-206. PMID 27830784. PMCID PMC5585017. doi:10.1038/nature20413. (Full text read)", "link": "https://doi.org/10.1038/nature20413", "areas": ["B"], "unverified": false}, {"key": "Testoni2023", "text": "Testoni I, Palazzo L, Ronconi L, Macelloni T, Calvo V. Strengths and Weaknesses of Children Witnessing Relatives with Amyotrophic Lateral Sclerosis. Children (Basel). 2023;10(1):140. PMID 36670690. PMCID PMC9856986. doi:10.3390/children10010140. (Abstract read)", "link": "https://doi.org/10.3390/children10010140", "areas": ["G"], "unverified": false}, {"key": "Tramacere2015", "text": "Tramacere I, Dalla Bella E, Chiò A, Mora G, Filippini G, Lauria G, et al. The MITOS system predicts long-term survival in amyotrophic lateral sclerosis. J Neurol Neurosurg Psychiatry. 2015;86(11):1180-1185. PMID 25886781. doi:10.1136/jnnp-2014-310176. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2014-310176", "areas": ["A"], "unverified": false}, {"key": "Tran2022", "text": "Tran H, Moazami MP, Yang H, McKenna-Yasek D, Douthwright CL, Pinto C, et al. Suppression of mutant C9orf72 expression by a potent mixed backbone antisense oligonucleotide. Nat Med. 2022;28(1):117-124. PMID 34949835. PMCID PMC8861976. doi:10.1038/s41591-021-01557-6. (Abstract read)", "link": "https://doi.org/10.1038/s41591-021-01557-6", "areas": ["I"], "unverified": false}, {"key": "Traynor2000criteria", "text": "Traynor BJ, Codd MB, Corr B, Forde C, Frost E, Hardiman OM. Clinical features of amyotrophic lateral sclerosis according to the El Escorial and Airlie House diagnostic criteria: A population-based study. Arch Neurol. 2000;57(8):1171-1176. PMID 10927797. doi:10.1001/archneur.57.8.1171. (Abstract read)", "link": "https://doi.org/10.1001/archneur.57.8.1171", "areas": ["D"], "unverified": false}, {"key": "Traynor2000mimic", "text": "Traynor BJ, Codd MB, Corr B, Forde C, Frost E, Hardiman O. Amyotrophic lateral sclerosis mimic syndromes: a population-based study. Arch Neurol. 2000;57(1):109-113. PMID 10634456. doi:10.1001/archneur.57.1.109. (Abstract read)", "link": "https://doi.org/10.1001/archneur.57.1.109", "areas": ["D"], "unverified": false}, {"key": "Traynor2003", "text": "Traynor BJ, Alexander M, Corr B, Frost E, Hardiman O. Effect of a multidisciplinary amyotrophic lateral sclerosis (ALS) clinic on ALS survival: a population based study, 1996-2000. J Neurol Neurosurg Psychiatry. 2003;74(9):1258-1261. PMID 12933930. PMCID PMC1738639. doi:10.1136/jnnp.74.9.1258. (Abstract read)", "link": "https://doi.org/10.1136/jnnp.74.9.1258", "areas": ["F", "G"], "unverified": false}, {"key": "Tsou2012", "text": "Tsou AY, Karlawish J, McCluskey L, Xie SX, Long JA. Predictors of emergent feeding tubes and tracheostomies in amyotrophic lateral sclerosis (ALS). Amyotroph Lateral Scler. 2012;13(3):318-25. PMID 22533463. PMCID PMC4104116. doi:10.3109/17482968.2012.662987. (Abstract read)", "link": "https://doi.org/10.3109/17482968.2012.662987", "areas": ["H"], "unverified": false}, {"key": "Turner2020PLS", "text": "Turner MR, Barohn RJ, Corcia P, Fink JK, Harms MB, Kiernan MC, et al. Primary lateral sclerosis: consensus diagnostic criteria. J Neurol Neurosurg Psychiatry. 2020;91(4):373-377. PMID 32029539. PMCID PMC7147236. doi:10.1136/jnnp-2019-322541. (Full text read; a correction exists, PMC7402448)", "link": "https://doi.org/10.1136/jnnp-2019-322541", "areas": ["D"], "unverified": false}, {"key": "Turner2022", "text": "Turner MR; UK MND Clinical Studies Group. Diagnosing ALS: the Gold Coast criteria and the role of EMG. Pract Neurol. 2022;22(3):176-178. PMID 34992096. PMCID PMC9120398. doi:10.1136/practneurol-2021-003256. (Full text read)", "link": "https://doi.org/10.1136/practneurol-2021-003256", "areas": ["D"], "unverified": false}, {"key": "TurnerTalbot2013", "text": "Turner MR, Talbot K. Mimics and chameleons in motor neurone disease. Pract Neurol. 2013;13(3):153-164. PMID 23616620. PMCID PMC3664389. doi:10.1136/practneurol-2013-000557. (Full text read)", "link": "https://doi.org/10.1136/practneurol-2013-000557", "areas": ["D"], "unverified": false}, {"key": "UNMC2014", "text": "University of Nebraska Medical Center Newsroom. ALS Association recognizes med center. 22 May 2014. https://unmc.edu/newsroom/?p=49484 (Full text read; institutional news, secondary)", "link": "https://unmc.edu/newsroom/?p=49484", "areas": ["H"], "unverified": false}, {"key": "Urbani2000", "text": "Urbani A, Belluzzi O. Riluzole inhibits the persistent sodium current in mammalian CNS neurons. Eur J Neurosci. 2000;12(10):3567-3574. PMID 11029626. doi:10.1046/j.1460-9568.2000.00242.x. (Abstract read)", "link": "https://doi.org/10.1046/j.1460-9568.2000.00242.x", "areas": ["B"], "unverified": false}, {"key": "vanBlitterswijk2012", "text": "van Blitterswijk M, van Es MA, Hennekam EA, Dooijes D, van Rheenen W, Medic J, et al. Evidence for an oligogenic basis of amyotrophic lateral sclerosis. Hum Mol Genet. 2012;21(17):3776-84. PMID 22645277. doi:10.1093/hmg/dds199. (Abstract read)", "link": "https://doi.org/10.1093/hmg/dds199", "areas": ["C"], "unverified": false}, {"key": "VanDamme2024EAN", "text": "Van Damme P, Al-Chalabi A, Andersen PM, Chiò A, Couratier P, De Carvalho M, et al. European Academy of Neurology (EAN) guideline on the management of amyotrophic lateral sclerosis in collaboration with European Reference Network for Neuromuscular Diseases (ERN EURO-NMD). Eur J Neurol. 2024;31(6):e16264. PMID 38470068. PMCID PMC11235832. doi:10.1111/ene.16264. (Full text read)", "link": "https://doi.org/10.1111/ene.16264", "areas": ["E", "F", "H", "G"], "unverified": false, "aliases": ["VanDamme2024"]}, {"key": "VandenBerg2005", "text": "Van den Berg JP, Kalmijn S, Lindeman E, Veldink JH, de Visser M, Van der Graaff MM, et al. Multidisciplinary ALS care improves quality of life in patients with ALS. Neurology. 2005;65(8):1264-1267. PMID 16247055. doi:10.1212/01.wnl.0000180717.29273.12. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000180717.29273.12", "areas": ["F"], "unverified": false}, {"key": "vandenBerg2024", "text": "van den Berg LH, Rothstein JD, Shaw PJ, Babu S, Benatar M, Bucelli RC, et al. Safety, tolerability, and pharmacokinetics of antisense oligonucleotide BIIB078 in adults with C9orf72-associated amyotrophic lateral sclerosis: a phase 1, randomised, double blinded, placebo-controlled, multiple ascending dose study. Lancet Neurol. 2024;23(9):901-912. PMID 39059407. doi:10.1016/S1474-4422(24)00216-3. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(24)00216-3", "areas": ["I"], "unverified": false}, {"key": "vanDoormaal2017", "text": "van Doormaal PTC, Ticozzi N, Weishaupt JH, Kenna K, Diekstra FP, Verde F, et al. The role of de novo mutations in the development of amyotrophic lateral sclerosis. Hum Mutat. 2017;38(11):1534-1541. PMID 28714244. PMCID PMC6599399. doi:10.1002/humu.23295. (Abstract read)", "link": "https://doi.org/10.1002/humu.23295", "areas": ["C"], "unverified": false}, {"key": "vanEenennaam2023", "text": "van Eenennaam RM, Kruithof W, Beelen A, Bakker LA, van Eijk RPA, Maessen M, et al. Frequency of euthanasia, factors associated with end-of-life practices, and quality of end-of-life care in patients with amyotrophic lateral sclerosis in the Netherlands: a population-based cohort study. Lancet Neurol. 2023;22(7):591-601. PMID 37353279. doi:10.1016/S1474-4422(23)00155-2. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(23)00155-2", "areas": ["G"], "unverified": false}, {"key": "vanEijk2017", "text": "van Eijk RPA, Jones AR, Sproviero W, Shatunov A, Shaw PJ, Leigh PN, et al. Meta-analysis of pharmacogenetic interactions in amyotrophic lateral sclerosis clinical trials. Neurology. 2017;89(18):1915-1922. PMID 28978660. PMCID PMC5664299. doi:10.1212/WNL.0000000000004606. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0000000000004606", "areas": ["E"], "unverified": false}, {"key": "vanEs2017", "text": "van Es MA, Hardiman O, Chio A, Al-Chalabi A, Pasterkamp RJ, Veldink JH, et al. Amyotrophic lateral sclerosis. Lancet. 2017;390(10107):2084-2098. PMID 28552366. doi:10.1016/S0140-6736(17)31287-4. (Abstract read)", "link": "https://doi.org/10.1016/s0140-6736(17)31287-4", "areas": ["A"], "unverified": false}, {"key": "vanRheenen2021", "text": "van Rheenen W, van der Spek RAA, Bakker MK, van Vugt JJFA, Hop PJ, Zwamborn RAJ, et al. Common and rare variant association analyses in amyotrophic lateral sclerosis identify 15 risk loci with distinct genetic architectures and neuron-specific biology. Nat Genet. 2021;53(12):1636-1648. PMID 34873335. PMCID PMC8648564. doi:10.1038/s41588-021-00973-1. (Abstract read)", "link": "https://doi.org/10.1038/s41588-021-00973-1", "areas": ["C"], "unverified": false}, {"key": "Vansteensel2016", "text": "Vansteensel MJ, Pels EGM, Bleichner MG, Branco MP, Denison T, Freudenburg ZV, et al. Fully Implanted Brain-Computer Interface in a Locked-In Patient with ALS. N Engl J Med. 2016;375(21):2060-2066. PMID 27959736. PMCID PMC5326682. doi:10.1056/NEJMoa1608085. (Abstract read)", "link": "https://doi.org/10.1056/nejmoa1608085", "areas": ["G"], "unverified": false}, {"key": "Vazquez2008", "text": "Vázquez MC, Ketzoián C, Legnani C, Rega I, Sánchez N, Perna A, et al. Incidence and prevalence of amyotrophic lateral sclerosis in Uruguay: a population-based study. Neuroepidemiology. 2008;30(2):105-111. PMID 18334826. doi:10.1159/000120023. (Abstract read)", "link": "https://doi.org/10.1159/000120023", "areas": ["A"], "unverified": false}, {"key": "Veldink2002", "text": "Veldink JH, Wokke JH, van der Wal G, Vianney de Jong JM, van den Berg LH. Euthanasia and physician-assisted suicide among patients with amyotrophic lateral sclerosis in the Netherlands. N Engl J Med. 2002;346(21):1638-1644. PMID 12023997. doi:10.1056/NEJMsa012739. (Abstract read)", "link": "https://doi.org/10.1056/nejmsa012739", "areas": ["G"], "unverified": false}, {"key": "Verde2019", "text": "Verde F, Steinacker P, Weishaupt JH, Kassubek J, Oeckl P, Halbgebauer S, et al. Neurofilament light chain in serum for the diagnosis of amyotrophic lateral sclerosis. J Neurol Neurosurg Psychiatry. 2019;90(2):157-164. PMID 30309882. doi:10.1136/jnnp-2018-318704. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2018-318704", "areas": ["B", "D"], "unverified": false}, {"key": "Vidovic2023", "text": "Vidovic M, Müschen LH, Brakemeier S, Machetanz G, Naumann M, Castro-Gomez S. Current State and Future Directions in the Diagnosis of Amyotrophic Lateral Sclerosis. Cells. 2023;12(5):736. PMID 36899872. PMCID PMC10000757. doi:10.3390/cells12050736. (Full text read)", "link": "https://doi.org/10.3390/cells12050736", "areas": ["D"], "unverified": false}, {"key": "Visser2018", "text": "Visser AE, Rooney JPK, D'Ovidio F, Westeneng HJ, Vermeulen RCH, Beghi E, et al. Multicentre, cross-cultural, population-based, case-control study of physical activity as risk factor for amyotrophic lateral sclerosis. J Neurol Neurosurg Psychiatry. 2018;89(8):797-803. PMID 29685899. doi:10.1136/jnnp-2017-317724. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2017-317724", "areas": ["A"], "unverified": false}, {"key": "vonQuednow2025", "text": "von Quednow E, Husain N, Łajczak P, Linha Secco G, Koppanatham A. Diagnostic accuracy of the Gold Coast Criteria for amyotrophic lateral sclerosis: a systematic review and meta-analysis. Clin Neurophysiol. 2025;179:2111005. PMID 40975951. doi:10.1016/j.clinph.2025.2111005. (Abstract read)", "link": "https://doi.org/10.1016/j.clinph.2025.2111005", "areas": ["D"], "unverified": false}, {"key": "Vucic2006", "text": "Vucic S, Kiernan MC. Novel threshold tracking techniques suggest that cortical hyperexcitability is an early feature of motor neuron disease. Brain. 2006;129(Pt 9):2436-2446. PMID 16835248. doi:10.1093/brain/awl172. (Abstract read)", "link": "https://doi.org/10.1093/brain/awl172", "areas": ["B"], "unverified": false}, {"key": "Vucic2008", "text": "Vucic S, Nicholson GA, Kiernan MC. Cortical hyperexcitability may precede the onset of familial amyotrophic lateral sclerosis. Brain. 2008;131(Pt 6):1540-1550. PMID 18469020. doi:10.1093/brain/awn071. (Abstract read)", "link": "https://doi.org/10.1093/brain/awn071", "areas": ["B"], "unverified": false}, {"key": "Vucic2021", "text": "Vucic S, Ferguson TA, Cummings C, Hotchkin MT, Genge A, Glanzman R, et al. Gold Coast diagnostic criteria: Implications for ALS diagnosis and clinical trial enrollment. Muscle Nerve. 2021;64(5):532-537. PMID 34378224. doi:10.1002/mus.27392. (Abstract read)", "link": "https://doi.org/10.1002/mus.27392", "areas": ["D"], "unverified": false}, {"key": "Vucic2023", "text": "Vucic S, Menon P, Huynh W, Mahoney C, Ho KS, Hartford A, et al. Efficacy and safety of CNM-Au8 in amyotrophic lateral sclerosis (RESCUE-ALS study): a phase 2, randomised, double-blind, placebo-controlled trial and open label extension. EClinicalMedicine. 2023;60:102036. PMID 37396808. PMCID PMC10314176. doi:10.1016/j.eclinm.2023.102036. (Abstract read)", "link": "https://doi.org/10.1016/j.eclinm.2023.102036", "areas": ["I"], "unverified": false}, {"key": "Wairagkar2025", "text": "Wairagkar M, Card NS, Singer-Clark T, Hou X, Iacobacci C, Miller LM, et al. An instantaneous voice-synthesis neuroprosthesis. Nature. 2025;644(8075):145-152. PMID 40506548. PMCID PMC12369848. doi:10.1038/s41586-025-09127-3. (Abstract read)", "link": "https://doi.org/10.1038/s41586-025-09127-3", "areas": ["G"], "unverified": false}, {"key": "Waito2017", "text": "Waito AA, Valenzano TJ, Peladeau-Pigeon M, Steele CM. Trends in Research Literature Describing Dysphagia in Motor Neuron Diseases (MND): A Scoping Review. Dysphagia. 2017;32(6):734-747. PMID 28664472. PMCID PMC5724560. doi:10.1007/s00455-017-9819-x. (Abstract read)", "link": "https://doi.org/10.1007/s00455-017-9819-x", "areas": ["H"], "unverified": false}, {"key": "Wang2011", "text": "Wang H, O'Reilly ÉJ, Weisskopf MG, Logroscino G, McCullough ML, Thun MJ, et al. Smoking and risk of amyotrophic lateral sclerosis: a pooled analysis of 5 prospective cohorts. Arch Neurol. 2011;68(2):207-213. PMID 21320987. PMCID PMC3319086. doi:10.1001/archneurol.2010.367. (Abstract read)", "link": "https://doi.org/10.1001/archneurol.2010.367", "areas": ["A"], "unverified": false}, {"key": "Wang2014lead", "text": "Wang MD, Gomes J, Cashman NR, Little J, Krewski D. A meta-analysis of observational studies of the association between chronic occupational exposure to lead and amyotrophic lateral sclerosis. J Occup Environ Med. 2014;56(12):1235-1242. PMID 25479292. PMCID PMC4243803. doi:10.1097/JOM.0000000000000323. (Abstract read)", "link": "https://doi.org/10.1097/jom.0000000000000323", "areas": ["A"], "unverified": false}, {"key": "Watanabe2018", "text": "Watanabe K, Tanaka M, Yuki S, Hirai M, Yamamoto Y. How is edaravone effective against acute ischemic stroke and amyotrophic lateral sclerosis? J Clin Biochem Nutr. 2018;62(1):20-38. PMID 29371752. PMCID PMC5773834. doi:10.3164/jcbn.17-62. (Abstract read)", "link": "https://doi.org/10.3164/jcbn.17-62", "areas": ["B"], "unverified": false}, {"key": "Wave2023", "text": "Wave Life Sciences. Press release on FOCUS-C9 topline data and discontinuation of WVE-004, 23 May 2023 (SEC Form 8-K Exhibit 99.1). (Web page read)", "link": "", "areas": ["I"], "unverified": false}, {"key": "Weiss2016", "text": "Weiss MD, Macklin EA, Simmons Z, Knox AS, Greenblatt DJ, Atassi N, et al. A randomized trial of mexiletine in ALS: Safety and effects on muscle cramps and progression. Neurology. 2016;86(16):1474-1481. PMID 26911633. PMCID PMC4836879. doi:10.1212/WNL.0000000000002507. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0000000000002507", "areas": ["F"], "unverified": false}, {"key": "Weisskopf2005", "text": "Weisskopf MG, O'Reilly EJ, McCullough ML, Calle EE, Thun MJ, Cudkowicz M, et al. Prospective study of military service and mortality from ALS. Neurology. 2005;64(1):32-37. PMID 15642900. doi:10.1212/01.WNL.0000148649.17706.D9. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000148649.17706.d9", "areas": ["A"], "unverified": false}, {"key": "Welniarz2017", "text": "Welniarz Q, Dusart I, Roze E. The corticospinal tract: Evolution, development, and human disorders. Dev Neurobiol. 2017;77(7):810-829. PMID 27706924. doi:10.1002/dneu.22455. (Abstract read)", "link": "https://doi.org/10.1002/dneu.22455", "areas": ["B"], "unverified": false}, {"key": "Westeneng2018", "text": "Westeneng HJ, Debray TPA, Visser AE, van Eijk RPA, Rooney JPK, Calvo A, et al. Prognosis for patients with amyotrophic lateral sclerosis: development and validation of a personalised prediction model. Lancet Neurol. 2018;17(5):423-433. PMID 29598923. doi:10.1016/S1474-4422(18)30089-9. (Abstract read)", "link": "https://doi.org/10.1016/s1474-4422(18)30089-9", "areas": ["A", "I"], "unverified": false}, {"key": "Wiesenfarth2024", "text": "Wiesenfarth M, Dorst J, Brenner D, Elmas Z, Parlak Ö, Uzelac Z, et al. Effects of tofersen treatment in patients with SOD1-ALS in a \"real-world\" setting - a 12-month multicenter cohort study from the German early access program. EClinicalMedicine. 2024;69:102495. PMID 38384337. PMCID PMC10878861. doi:10.1016/j.eclinm.2024.102495. (Abstract read)", "link": "https://doi.org/10.1016/j.eclinm.2024.102495", "areas": ["E"], "unverified": false}, {"key": "Wijesekera2009", "text": "Wijesekera LC, Mathers S, Talman P, Galtrey C, Parkinson MH, Ganesalingam J, et al. Natural history and clinical features of the flail arm and flail leg ALS variants. Neurology. 2009;72(12):1087-1094. PMID 19307543. PMCID PMC2821838. doi:10.1212/01.wnl.0000345041.83406.a2. (Abstract read)", "link": "https://doi.org/10.1212/01.wnl.0000345041.83406.a2", "areas": ["A"], "unverified": false}, {"key": "Willemse2022", "text": "Willemse SW, Roes KCB, Van Damme P, Hardiman O, Ingre C, Povedano M, et al. Lithium carbonate in amyotrophic lateral sclerosis patients homozygous for the C-allele at SNP rs12608932 in UNC13A: protocol for a confirmatory, randomized, group-sequential, event-driven, double-blind, placebo-controlled trial. Trials. 2022;23(1):978. PMID 36471413. PMCID PMC9721045. doi:10.1186/s13063-022-06906-5. (Abstract read)", "link": "https://doi.org/10.1186/s13063-022-06906-5", "areas": ["I"], "unverified": false}, {"key": "Willett2023", "text": "Willett FR, Kunz EM, Fan C, Avansino DT, Wilson GH, Choi EY, et al. A high-performance speech neuroprosthesis. Nature. 2023;620(7976):1031-1036. PMID 37612500. PMCID PMC10468393. doi:10.1038/s41586-023-06377-x. (Abstract read)", "link": "https://doi.org/10.1038/s41586-023-06377-x", "areas": ["G"], "unverified": false}, {"key": "Wills2014", "text": "Wills AM, Hubbard J, Macklin EA, Glass J, Tandan R, Simpson EP, et al. Hypercaloric enteral nutrition in patients with amyotrophic lateral sclerosis: a randomised, double-blind, placebo-controlled phase 2 trial. Lancet. 2014;383(9934):2065-2072. PMID 24582471. PMCID PMC4176708. doi:10.1016/S0140-6736(14)60222-1. (Abstract read)", "link": "https://doi.org/10.1016/s0140-6736(14)60222-1", "areas": ["F"], "unverified": false}, {"key": "Wiseman2026", "text": "Wiseman R, Jordan J, Storer M, Epton M. Incidence of MND in Canterbury, New Zealand and impact of a key worker role on hospital admissions. Amyotroph Lateral Scler Frontotemporal Degener. 2026;27(3-4):404-411. PMID 41428859. doi:10.1080/21678421.2025.2604231. (Abstract read)", "link": "https://doi.org/10.1080/21678421.2025.2604231", "areas": ["H"], "unverified": false}, {"key": "Witgert2010", "text": "Witgert M, Salamone AR, Strutt AM, Jawaid A, Massman PJ, Bradshaw M, et al. Frontal-lobe mediated behavioral dysfunction in amyotrophic lateral sclerosis. Eur J Neurol. 2010;17(1):103-110. PMID 19874396. doi:10.1111/j.1468-1331.2009.02801.x. (Abstract read)", "link": "https://doi.org/10.1111/j.1468-1331.2009.02801.x", "areas": ["G"], "unverified": false}, {"key": "Witzel2022", "text": "Witzel S, Maier A, Steinbach R, Grosskreutz J, Koch JC, Sarikidi A, et al. Safety and Effectiveness of Long-term Intravenous Administration of Edaravone for Treatment of Patients With Amyotrophic Lateral Sclerosis. JAMA Neurol. 2022;79(2):121-130. PMID 35006266. PMCID PMC8749709. doi:10.1001/jamaneurol.2021.4893. (Abstract read)", "link": "https://doi.org/10.1001/jamaneurol.2021.4893", "areas": ["E"], "unverified": false}, {"key": "Wolfe2021ONMAP", "text": "Wolfe LF, Benditt JO, Aboussouan L, Hess DR, Coleman JM 3rd; ONMAP Technical Expert Panel. Optimal NIV Medicare Access Promotion: Patients With Thoracic Restrictive Disorders: A Technical Expert Panel Report From the American College of Chest Physicians, the American Association for Respiratory Care, the American Academy of Sleep Medicine, and the American Thoracic Society. Chest. 2021;160(5):e399-e408. PMID 34339688. PMCID PMC8828932. doi:10.1016/j.chest.2021.05.075. (Full text read: Table 3 and text, via WebFetch)", "link": "https://doi.org/10.1016/j.chest.2021.05.075", "areas": ["F"], "unverified": false}, {"key": "Wu2012", "text": "Wu CH, Fallini C, Ticozzi N, Keagle PJ, Sapp PC, Piotrowska K, et al. Mutations in the profilin 1 gene cause familial amyotrophic lateral sclerosis. Nature. 2012;488(7412):499-503. PMID 22801503. PMCID PMC3575525. doi:10.1038/nature11280. (Abstract read)", "link": "https://doi.org/10.1038/nature11280", "areas": ["C"], "unverified": false}, {"key": "Wymer2023", "text": "Wymer J, Apple S, Harrison A, Hill BA. Pharmacokinetics, Bioavailability, and Swallowing Safety With Riluzole Oral Film. Clin Pharmacol Drug Dev. 2023;12(1):57-64. PMID 36168148. PMCID PMC10087659. doi:10.1002/cpdd.1168. (Abstract read)", "link": "https://doi.org/10.1002/cpdd.1168", "areas": ["H"], "unverified": false}, {"key": "Xu2016", "text": "Xu Z, Henderson RD, David M, McCombe PA. Neurofilaments as Biomarkers for Amyotrophic Lateral Sclerosis: A Systematic Review and Meta-Analysis. PLoS One. 2016;11(10):e0164625. PMID 27732645. PMCID PMC5061412. doi:10.1371/journal.pone.0164625. (Abstract read; sensitivity and specificity ranges quoted via deCarvalhoSwash2024)", "link": "https://doi.org/10.1371/journal.pone.0164625", "areas": ["D"], "unverified": false}, {"key": "Xu2020", "text": "Xu L, Liu T, Liu L, Yao X, Chen L, Fan D, et al. Global variation in prevalence and incidence of amyotrophic lateral sclerosis: a systematic review and meta-analysis. J Neurol. 2020;267(4):944-953. PMID 31797084. doi:10.1007/s00415-019-09652-y. (Abstract read)", "link": "https://doi.org/10.1007/s00415-019-09652-y", "areas": ["A"], "unverified": false}, {"key": "Xu2024", "text": "Xu W, Zhao X, Wang J, Guo Y, Ren Z, Cai L, et al. Different intensities of physical activity for amyotrophic lateral sclerosis and Parkinson disease: A Mendelian randomization study and meta-analysis. Medicine (Baltimore). 2024;103(44):e40141. PMCID PMC11537586. doi:10.1097/MD.0000000000040141. (Abstract read; PMID 39496035 per Europe PMC, not in the PubMed batch)", "link": "https://doi.org/10.1097/md.0000000000040141", "areas": ["A"], "unverified": false}, {"key": "Zarit1980", "text": "Zarit SH, Reever KE, Bach-Peterson J. Relatives of the impaired elderly: correlates of feelings of burden. Gerontologist. 1980;20(6):649-55. PMID 7203086. doi:10.1093/geront/20.6.649. (Record only; no abstract in PubMed; cited for origin of the instrument)", "link": "https://doi.org/10.1093/geront/20.6.649", "areas": ["H"], "unverified": false}, {"key": "Zhang2015", "text": "Zhang K, Donnelly CJ, Haeusler AR, Grima JC, Machamer JB, Steinwald P, et al. The C9orf72 repeat expansion disrupts nucleocytoplasmic transport. Nature. 2015;525(7567):56-61. PMID 26308891. PMCID PMC4800742. doi:10.1038/nature14973. (Abstract read)", "link": "https://doi.org/10.1038/nature14973", "areas": ["B"], "unverified": false}, {"key": "Zheng2026", "text": "Zheng Y, Bhalala OG, Chin KS, Watson R, Yassi N. Use of blood-based neurofilament light chain as an endpoint in clinical trials of neurodegenerative conditions: a scoping review. J Neurol. 2026;273(8):476. PMID 42474734. PMCID PMC13385163. doi:10.1007/s00415-026-14007-5. (Abstract read)", "link": "https://doi.org/10.1007/s00415-026-14007-5", "areas": ["I"], "unverified": false}, {"key": "Zhu2026", "text": "Zhu RH, Kalra S, Dobrowolski P, Fok D, DuVal M, Putko BN, et al. Medical Assistance in Dying in ALS: Frequency, Survival, and Associations With Patient Characteristics in a Canadian Clinic. Neurology. 2026;106(10):e218032. PMID 42081784. doi:10.1212/WNL.0000000000218032. (Abstract read)", "link": "https://doi.org/10.1212/wnl.0000000000218032", "areas": ["G"], "unverified": false}, {"key": "Zigmond1983", "text": "Zigmond AS, Snaith RP. The hospital anxiety and depression scale. Acta Psychiatr Scand. 1983;67(6):361-70. PMID 6880820. doi:10.1111/j.1600-0447.1983.tb09716.x. (Abstract read)", "link": "https://doi.org/10.1111/j.1600-0447.1983.tb09716.x", "areas": ["H"], "unverified": false}, {"key": "Zou2017", "text": "Zou ZY, Zhou ZR, Che CH, Liu CY, He RL, Huang HP. Genetic epidemiology of amyotrophic lateral sclerosis: a systematic review and meta-analysis. J Neurol Neurosurg Psychiatry. 2017;88(7):540-549. PMID 28057713. doi:10.1136/jnnp-2016-315018. (Abstract read)", "link": "https://doi.org/10.1136/jnnp-2016-315018", "areas": ["C"], "unverified": false}, {"key": "Zu2013", "text": "Zu T, Liu Y, Bañez-Coronel M, Reid T, Pletnikova O, Lewis J, et al. RAN proteins and RNA foci from antisense transcripts in C9ORF72 ALS and frontotemporal dementia. Proc Natl Acad Sci U S A. 2013;110(51):E4968-77. PMID 24248382. PMCID PMC3870665. doi:10.1073/pnas.1315438110. (Abstract read)", "link": "https://doi.org/10.1073/pnas.1315438110", "areas": ["C"], "unverified": false}];

/* =============== home: one message, two neurons =============== */
const HOME_TXT={
  healthy:'Healthy: every signal arrives',
  failing:'ALS: both neurons start to fail',
  late:'Later: fewer signals, a weaker, thinner muscle',
  cortex:'motor cortex',cord:'spinal cord',muscle:'muscle',
  umn:'upper motor neuron',lmn:'lower motor neuron',
  signals:'signals reaching the muscle'
};
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');
  function draw(t){const N=vb(svg,'520 300','400 410');
    const fail=ease(ramp(t,.3,.95));
    const L=N?{ux:200,uy:60,lx:200,ly:200,mx:80,my:320,mw:240,ax:'v'}:{ux:70,uy:70,lx:260,ly:170,mx:360,my:230,mw:130,ax:'h'};
    let s=`<rect x="0" y="0" width="100%" height="100%" rx="10" style="fill:var(--field)"/>`;
    /* regions */
    s+=`<text x="${N?20:16}" y="${N?24:24}" class="t-xs">${HOME_TXT.cortex.toUpperCase()}</text>`;
    s+=`<text x="${N?20:200}" y="${N?166:142}" class="t-xs">${HOME_TXT.cord.toUpperCase()}</text>`;
    s+=`<text x="${N?20:350}" y="${N?290:200}" class="t-xs">${HOME_TXT.muscle.toUpperCase()}</text>`;
    /* the two axons as paths */
    const pU=N?`M${L.ux} ${L.uy+34} C${L.ux} ${L.uy+90} ${L.lx} ${L.ly-90} ${L.lx} ${L.ly-16}`:`M${L.ux+10} ${L.uy+30} C${L.ux+60} ${L.uy+120} ${L.lx-120} ${L.ly} ${L.lx-18} ${L.ly}`;
    const pL=N?`M${L.lx} ${L.ly+20} C${L.lx} ${L.ly+70} ${L.mx+L.mw/2} ${L.my-80} ${L.mx+L.mw/2} ${L.my-26}`:`M${L.lx+18} ${L.ly} C${L.lx+60} ${L.ly} ${L.mx-40} ${L.my} ${L.mx-4} ${L.my}`;
    s+=`<path id="hpU" d="${pU}" style="fill:none;stroke:var(--umn);stroke-width:${f1(3.2-1.8*fail)};stroke-linecap:round;${fail>.3?`stroke-dasharray:10 ${f1(10*fail)}`:''}"/>`;
    s+=`<path id="hpL" d="${pL}" style="fill:none;stroke:var(--lmn);stroke-width:${f1(3.4-1.9*fail)};stroke-linecap:round;${fail>.4?`stroke-dasharray:12 ${f1(12*fail)}`:''}"/>`;
    s+=umn(L.ux,L.uy,15,1,{dead:fail*.8,axonLen:0});
    s+=lmn(L.lx,L.ly,14,1,{dead:fail*.85,axonLen:0});
    s+=`<text x="${L.ux+(N?28:22)}" y="${L.uy-(N?6:26)}" class="t-sm" style="fill:var(--umn)">${HOME_TXT.umn}</text>`;
    s+=`<text x="${L.lx+(N?26:-10)}" y="${L.ly+(N?4:34)}" class="t-sm ${N?'':'t-end'}" style="fill:var(--lmn)">${HOME_TXT.lmn}</text>`;
    /* muscle: rows of fibres */
    const rows=5;for(let k=0;k<rows;k++){s+=fibre(L.mx,L.my+k*(N?10:12)-(N?0:24),L.mw*(1-.08*fail),N?8:10,1,{atrophy:fail*(.5+.1*k)})}
    /* pulses travelling: fewer and fainter as neurons fail */
    svg.innerHTML=s;
    const PU=svg.querySelector('#hpU'),PL=svg.querySelector('#hpL');
    let p='';const lu=PU.getTotalLength(),ll=PL.getTotalLength();const r=rng(3);
    for(let k=0;k<6;k++){const ph=((t*9+k/6)%1);const drop=r()<fail*1.1;if(drop)continue;
      const a=PU.getPointAtLength(ph*lu),b=PL.getPointAtLength(ph*ll);
      p+=`<circle cx="${f1(a.x)}" cy="${f1(a.y)}" r="4" style="fill:var(--umn)"/><circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="4" style="fill:var(--lmn)"/>`}
    /* readout: share of signals arriving (schematic) */
    const arr=Math.round(100*(1-.85*fail));
    const bx=N?20:16,by=N?396:284,bw=N?360:200;
    p+=`<text x="${bx}" y="${by-14}" class="t-xs">${HOME_TXT.signals.toUpperCase()}</text><rect x="${bx}" y="${by-8}" width="${bw}" height="8" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by-8}" width="${f1(bw*arr/100)}" height="8" rx="4" style="fill:var(--steel)"/>`;
    svg.insertAdjacentHTML('beforeend',p);
    $('#heroCap').textContent=(t<.3?HOME_TXT.healthy:t<.7?HOME_TXT.failing:HOME_TXT.late)+'. Schematic, not to scale.';
  }
  playWire(rg,$('#heroPlay'),draw,10000,UI.replay,'home');draw(+rg.value);
};
/* =============== 1.1 what ALS is =============== */
/* The timeline runs over 36 schematic months: t = month / 36. The month marks are the
   mean times from onset in people who had died at one London clinic (Roche 2012). */
const WH_M=36;
const WH_STEPS=[
 {from:0,at:.04,k:'King\'s stage 1',t:'Onset in one region'},
 {from:10/36,at:13.5/36,k:'King\'s stage 2A',t:'Diagnosis'},
 {from:16.5/36,at:18.6/36,k:'King\'s stage 2B',t:'A second region'},
 {from:22.4/36,at:24.4/36,k:'King\'s stage 3',t:'A third region'},
 {from:29.4/36,at:33/36,k:'King\'s stage 4',t:'Late stage'}
];
/* onset-specific notes, one per step; the order says which region follows which */
const WH_ONSET={
 limb:{order:['cervical','lumbosacral','bulbar','thoracic'],steps:[
  {txt:`Weakness starts in one limb, often a hand, with wasting, twitching (fasciculations) or stiffness. Limb onset made up 74.6% of people at one London clinic <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>, and spinal onset is more common in men <sup class="c" data-ref="Logroscino2010" title="Source 300">300</sup>. Degeneration starts focally and spreads contiguously through the motor system, usually to the other side first <sup class="c" data-ref="Ravits2009,Feldman2022" title="Source 180,445">180,445</sup>.`,
   pt:'It usually starts in one hand, arm, foot or leg. Here it starts in one hand and then the other arm.',
   hook:'ALS = <b>upper plus lower</b> motor neuron signs. UMN: brisk reflexes, spasticity. LMN: weakness, wasting, fasciculations. <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>'},
  {txt:`At a US centre the median time from first symptom to confirmed diagnosis was 11.5 months. People saw an average of three physicians, and 52% were first given another diagnosis. The delay was longer with limb onset, age over 60 and sporadic disease <sup class="c" data-ref="Paganoni2014" title="Source 414">414</sup>. In London the mean time to diagnosis was 13.5 months in people who had died <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>.`,
   pt:'Getting the diagnosis often takes about a year, because early ALS can look like commoner problems.',
   hook:'Diagnostic delay is about <b>1 year</b>. A longer delay goes with slower disease (ENCALS HR 0.52). <sup class="c" data-ref="Paganoni2014,Westeneng2018" title="Source 414,535">414,535</sup>'},
  {txt:`Here the legs follow the arms. In the London cohort a second region was reached at a mean of 17.7 months from onset <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>. King's staging counts regions: bulbar, upper limb, lower limb and diaphragm <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>.`,
   pt:'The weakness spreads to another part of the body, here the legs.'},
  {txt:`The bulbar muscles, for speech and swallowing, become involved. A third region was reached at a mean of 23.3 months, and median survival from that point was 13 months in both limb and bulbar onset <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>.`,
   pt:'Speech and swallowing start to change.'},
  {txt:`The breathing muscles weaken. With limb onset, non-invasive ventilation was usually needed before a feeding tube (standardised 0.73 against 0.81 of the course) <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>. Respiratory failure, including pneumonia, caused 81.3% of deaths at one Italian centre <sup class="c" data-ref="Spataro2010" title="Source 479">479</sup>. Median survival from onset is 2 to 4 years, and 10-20% of people live more than 10 years <sup class="c" data-ref="Feldman2022,Chio2009" title="Source 104,180">104,180</sup>.`,
   pt:'Later the muscles for breathing weaken. Breathing support is one of the main parts of care.',
   hook:'Motor neurons for eye movement and the sphincters are relatively spared until late. <sup class="c" data-ref="Kanning2010,Mannen1977" title="Source 255,319">255,319</sup> <a href="#breathing" data-go="breathing">Breathing and NIV</a>'}]},
 bulbar:{order:['bulbar','cervical','lumbosacral','thoracic'],steps:[
  {txt:`The first symptoms are slurred speech or trouble swallowing. Bulbar onset made up 25.4% of people at a London clinic and 33.0% of a French incident cohort <sup class="c" data-ref="Roche2012,Hamidou2017" title="Source 217,451">217,451</sup>. The male-to-female ratio was 0.9 in bulbar onset against 1.9 in limb onset <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>.`,
   pt:'Here it starts with the voice or swallowing.',
   hook:'Bulbar onset: about <b>a quarter to a third</b> of people, and men and women about equally. <sup class="c" data-ref="Feldman2022,Roche2012" title="Source 180,451">180,451</sup>'},
  {txt:`Bulbar-onset ALS was diagnosed about 4.4 months faster than limb-onset ALS in a meta-analysis of 13 studies <sup class="c" data-ref="Saeed2026" title="Source 460">460</sup>.`,
   pt:'Speech changes tend to be noticed and checked sooner than a weak hand.'},
  {txt:`The arms are involved next in this example. A second region was reached at a mean of 17.7 months from onset in the London cohort, all onset types together <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>.`,
   pt:'The weakness spreads to the arms.'},
  {txt:`With bulbar onset the third region was reached earlier in the course (standardised 0.45 against 0.63 for limb onset) <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>.`,
   pt:'Now the legs are weaker too.'},
  {txt:`With bulbar onset a feeding tube (gastrostomy) was usually needed before non-invasive ventilation (0.71 against 0.81 of the course) <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>. Median survival from onset was 30.8 months for bulbar and 48.3 for limb onset in London <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>, and older age and bulbar onset consistently predict a worse outcome <sup class="c" data-ref="Chio2009" title="Source 104">104</sup>.`,
   pt:'Later the breathing muscles weaken. Feeding support often comes first with this kind of onset.',
   hook:'Bulbar onset: <b>gastrostomy before NIV</b>. Limb onset: <b>NIV before gastrostomy</b>. <sup class="c" data-ref="Roche2012" title="Source 451">451</sup> <a href="#nutrition" data-go="nutrition">Swallowing and feeding tubes</a>'}]},
 resp:{order:['thoracic','cervical','bulbar','lumbosacral'],steps:[
  {txt:`Weak breathing muscles are the first problem. Respiratory onset was 2.7% of people at a Canadian clinic and 2.1% of a French incident cohort <sup class="c" data-ref="Shoesmith2007,Hamidou2017" title="Source 217,470">217,470</sup>. No one in a London clinic cohort of 1459 people had diaphragmatic onset <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>.`,
   pt:'Rarely, it starts with the muscles for breathing.',
   hook:'Respiratory onset is <b>rare</b>: about 2-3% of people. <sup class="c" data-ref="Shoesmith2007,Hamidou2017" title="Source 217,470">217,470</sup>'},
  {txt:`In the Canadian series only 14% presented acutely, needing emergency intubation <sup class="c" data-ref="Shoesmith2007" title="Source 470">470</sup>.`,
   pt:'Most people with this kind of onset are not diagnosed in an emergency.'},
  {txt:`The arms follow in this example. Spread is usually contiguous, to neighbouring parts of the motor system <sup class="c" data-ref="Ravits2009" title="Source 445">445</sup>.`,
   pt:'The weakness spreads to the arms.'},
  {txt:`Speech and swallowing become involved. The month marks here are the London means for all onset types <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>.`,
   pt:'Speech and swallowing start to change.'},
  {txt:`Mean survival from onset to death or permanent ventilation was 27.0 months, not significantly different from bulbar onset <sup class="c" data-ref="Shoesmith2007" title="Source 470">470</sup>. In the Piedmont register, outcomes were worst in the respiratory and bulbar phenotypes <sup class="c" data-ref="Chio2011" title="Source 107">107</sup>.`,
   pt:'This kind of onset tends to progress about as fast as bulbar onset.'}]}
};
const WH_TXT={
 onsets:[['limb','Limb onset'],['bulbar','Bulbar onset'],['resp','Respiratory onset']],
 onsetName:{limb:'limb',bulbar:'bulbar',resp:'respiratory'},
 reg:{bulbar:['Bulbar','speech, swallowing'],cervical:['Cervical','arms and hands'],thoracic:['Thoracic','trunk, breathing'],lumbosacral:['Lumbosacral','legs and feet']},
 state:{no:'not yet',start:'starting',yes:'involved'},
 order:['ORDER OF SPREAD','illustrative, one common pattern'],
 axis:['MONTHS FROM ONSET','schematic: London means, people who had died'],
 ms:[[13.5,'diagnosis',0],[17.7,'2nd region',1],[23.3,'3rd region',0],[27.7,'gastrostomy',1],[30.3,'NIV',0]],
 ticks:[0,12,24,36],
 month:m=>`month ${m}`,
 read:(o,m,n,k)=>`<span>onset <b>${o}</b></span><span>month <b>${m}</b> (schematic)</span><span><b>${n} of ${k}</b> regions involved</span>`,
 /* key numbers */
 cards:[
  {k:'New cases each year',num:'1.6–2.2',u:'per 100,000',txt:`European registers give about 2.1-2.2 new cases per 100,000 person-years; worldwide meta-analyses 1.59-1.75 <sup class="c" data-ref="Logroscino2010,Chio2013,Marin2017,Xu2020" title="Source 110,300,322,548">110,300,322,548</sup>. Incidence rises with age up to 70-79 years <sup class="c" data-ref="Xu2020" title="Source 548">548</sup> and falls quickly after 80 <sup class="c" data-ref="Logroscino2010" title="Source 300">300</sup>.`},
  {k:'Living with ALS at one time',num:'4.4–5.4',u:'per 100,000',txt:`Prevalence was 5.2 in the US in 2016, a median 5.40 in Europe and 4.42 worldwide <sup class="c" data-ref="Mehta2022,Chio2013,Xu2020" title="Source 110,326,548">110,326,548</sup>. It is low compared with the lifetime risk because survival is short <sup class="c" data-ref="Fang2017" title="Source 168">168</sup>.`},
  {k:'Lifetime risk',num:'1 in 350',u:'men',txt:`In UK primary care data the lifetime risk of motor neuron disease was 1 in 350 men and 1 in 472 women <sup class="c" data-ref="Alonso2009" title="Source 14">14</sup>. An Irish register gives 1 in 347 men and 1 in 436 women <sup class="c" data-ref="Ryan2019" title="Source 459">459</sup>.`},
  {k:'Men to women',num:'1.35',u:'to 1',txt:`The overall standardised male-to-female ratio is 1.35 <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>. It depends on age: in south-east England the adjusted ratio fell from 2.5 under age 51 to 1.4 at older ages <sup class="c" data-ref="Manjaly2010" title="Source 318">318</sup>. It was 1.9 in limb onset and 0.9 in bulbar onset at a London clinic <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>.`},
  {k:'Age at onset',num:'57–64',u:'years, mean',txt:`Mean onset was 57.4 years at a London tertiary clinic, 58.7 in Uruguay and 63.9 in the Irish population register <sup class="c" data-ref="Roche2012,Vazquez2008,Ryan2019" title="Source 451,459,516">451,459,516</sup>. Clinics tend to see younger people than registers do <sup class="c" data-ref="Manjaly2010" title="Source 318">318</sup>.`},
  {k:'Median survival',num:'2–4',u:'years from onset',txt:`Median survival is 2-4 years <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>. Across studies, medians from onset to death range from 20 to 48 months <sup class="c" data-ref="Chio2009" title="Source 104">104</sup>. Older age and bulbar onset consistently predict a shorter course <sup class="c" data-ref="Chio2009" title="Source 104">104</sup>.`},
  {k:'Alive at 5 and 10 years',num:'23% · 12%',u:'from diagnosis',txt:`In the Lombardy register, 76.2% were alive 1 year after diagnosis, 23.4% at 5 years and 11.8% at 10 years <sup class="c" data-ref="Pupillo2014" title="Source 433">433</sup>. A later analysis of the same register found 7% at 10 years and 3% at 15 years <sup class="c" data-ref="Pupillo2025" title="Source 435">435</sup>.`},
  {k:'Time to diagnosis',num:'11.5',u:'months, median',txt:`Median time from first symptom to diagnosis was 11.5 months at a US centre <sup class="c" data-ref="Paganoni2014" title="Source 414">414</sup>, and 11-16 months at a London clinic depending on the group <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>. Bulbar onset was diagnosed about 4.4 months faster <sup class="c" data-ref="Saeed2026" title="Source 460">460</sup>.`}
 ],
 dis:[
  {t:'How many new cases a year?',txt:`European registers give about 2.1-2.2 per 100,000 person-years <sup class="c" data-ref="Logroscino2010,Chio2013" title="Source 110,300">110,300</sup>. Worldwide meta-analyses give 1.6-1.75 <sup class="c" data-ref="Marin2017,Xu2020" title="Source 322,548">322,548</sup>, the US Registry about 1.5-1.7 <sup class="c" data-ref="Mehta2022inc" title="Source 327">327</sup>, and the GBD model 0.78 <sup class="c" data-ref="GBD2016MND2018" title="Source 197">197</sup>. The US Registry calls its count conservative <sup class="c" data-ref="Mehta2022" title="Source 326">326</sup>, and GBD is a model that pools all motor neuron diseases.`},
  {t:'Familial: 5% or 10%?',txt:`A meta-analysis found familial ALS in 5.1% of people in prospective population registers and 4.6% across all studies, "not 10% as is often stated" <sup class="c" data-ref="Byrne2011" title="Source 86">86</sup>. The 1993 SOD1 paper said about 10% <sup class="c" data-ref="Rosen1993" title="Source 456">456</sup>, and a 2022 seminar says 10-15% <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>. Part of the gap is the definition: whether relatives with frontotemporal dementia count, and how many generations are asked about <sup class="c" data-ref="Feldman2022,Byrne2011" title="Source 86,180">86,180</sup>. <a href="#genes" data-go="genes">Genes</a>`},
  {t:'Ancestry or ascertainment?',txt:`Standardised incidence was 1.89 in North Europe against 0.83 in East Asia and 0.73 in South Asia <sup class="c" data-ref="Marin2017" title="Source 322">322</sup>. People in Germany had older onset (66.6 against 53.2 years) and more bulbar onset (35.9% against 22.8%) than people in China <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>. These gaps are put down variously to ancestry, environment or study design, and the authors of the meta-analysis call for an international consortium to test ancestry <sup class="c" data-ref="Marin2017" title="Source 322">322</sup>.`},
  {t:'How many live past 10 years?',txt:`A review says 10-20% survive more than 10 years <sup class="c" data-ref="Chio2009" title="Source 104">104</sup>. Population data from Lombardy give 11.8% at 10 years from diagnosis <sup class="c" data-ref="Pupillo2014" title="Source 433">433</sup> and, in a later analysis, 7% <sup class="c" data-ref="Pupillo2025" title="Source 435">435</sup>. The figures come from different settings and starting points.`}
 ],
 /* incidence and prevalence by source */
 meas:[['inc','New cases a year'],['prev','Living with ALS']],
 unit:{inc:'per 100,000 person-years (or population)',prev:'per 100,000 people'},
 model:'model',
 bars:{
  inc:[
   {n:'Europe, EURALS registers',s:'Ireland, UK, Italy · 1998-99',v:2.16,txt:`Crude incidence 2.16 per 100,000 person-years (95% CI 2.0-2.3) in adults, from 1028 new cases in a population of almost 24 million. It was 3.0 in men and 2.4 in women <sup class="c" data-ref="Logroscino2010" title="Source 300">300</sup>.`},
   {n:'Europe, systematic review',s:'1995-2011 · median',v:2.08,txt:`Median incidence 2.08 per 100,000 (IQR 1.47-2.43), about 15,355 new cases a year at 2010 populations <sup class="c" data-ref="Chio2013" title="Source 110">110</sup>.`},
   {n:'North Europe',s:'world meta-analysis · standardised',v:1.89,txt:`Standardised incidence 1.89 (1.46-2.32). Europe, North America and New Zealand together were homogeneous at 1.81 <sup class="c" data-ref="Marin2017" title="Source 322">322</sup>.`},
   {n:'World, 44 studies',s:'to 2015 · crude',v:1.75,txt:`Pooled crude incidence 1.75 per 100,000 person-years (1.55-1.96) from 13,146 cases, or 1.68 standardised to the 2010 US population <sup class="c" data-ref="Marin2017" title="Source 322">322</sup>.`},
   {n:'United States registry',s:'2014 · age-adjusted',v:1.7,txt:`1.7 in 2014, then 1.5 in 2015 and 2016. The Registry combines administrative data with voluntary self-enrolment <sup class="c" data-ref="Mehta2022inc" title="Source 327">327</sup> and calls its count conservative <sup class="c" data-ref="Mehta2022" title="Source 326">326</sup>.`},
   {n:'World, 110 studies',s:'to 2018 · crude',v:1.59,txt:`Overall crude incidence 1.59 per 100,000 person-years (1.39-1.81) <sup class="c" data-ref="Xu2020" title="Source 548">548</sup>.`},
   {n:'Uruguay, whole country',s:'2002-03',v:1.37,txt:`Mean annual incidence 1.37 per 100,000: 1.95 in men and 0.84 in women <sup class="c" data-ref="Vazquez2008" title="Source 516">516</sup>.`},
   {n:'East Asia',s:'China, Japan · standardised',v:.83,txt:`Standardised incidence 0.83 (0.42-1.24) <sup class="c" data-ref="Marin2017" title="Source 322">322</sup>.`},
   {n:'South Asia',s:'Iran · standardised',v:.73,txt:`Standardised incidence 0.73 (0.58-0.89) <sup class="c" data-ref="Marin2017" title="Source 322">322</sup>.`},
   {n:'World, GBD 2016',s:'all motor neuron diseases',v:.78,m:1,txt:`All-age incidence 0.78 per 100,000 person-years (0.71-0.86), about 57,452 new cases in 2016. This is a model that pools ALS with spinal muscular atrophy, hereditary spastic paraplegia and other motor neuron diseases <sup class="c" data-ref="GBD2016MND2018" title="Source 197">197</sup>.`}],
  prev:[
   {n:'Europe, systematic review',s:'1995-2011 · median',v:5.4,txt:`Median prevalence 5.40 per 100,000 (IQR 4.06-7.89), about 39,863 people <sup class="c" data-ref="Chio2013" title="Source 110">110</sup>.`},
   {n:'United States registry',s:'2016 · age-adjusted',v:5.2,txt:`16,424 adults met the Registry definition, an age-adjusted prevalence of 5.2 per 100,000. Men had higher prevalence than women in every data source <sup class="c" data-ref="Mehta2022" title="Source 326">326</sup>.`},
   {n:'World, 58 studies',s:'crude',v:4.42,txt:`Crude prevalence 4.42 per 100,000 (3.92-4.96) <sup class="c" data-ref="Xu2020" title="Source 548">548</sup>.`},
   {n:'Uruguay',s:'31 Dec 2002 · crude',v:1.9,txt:`Crude prevalence 1.9 per 100,000 <sup class="c" data-ref="Vazquez2008" title="Source 516">516</sup>.`},
   {n:'World, GBD 2016',s:'all-age, all MND',v:4.5,m:1,txt:`330,918 people had a motor neuron disease in 2016, an all-age prevalence of 4.5 per 100,000 <sup class="c" data-ref="GBD2016MND2018" title="Source 197">197</sup>.`},
   {n:'High-income North America',s:'GBD · age-standardised',v:16.8,m:1,txt:`GBD's age-standardised prevalence was 16.8 per 100,000 here, 14.7 in Australasia and 12.9 in western Europe. GBD pools all motor neuron diseases and uses a different method, so this is not directly comparable with the US Registry figure of 5.2 <sup class="c" data-ref="GBD2016MND2018,Mehta2022" title="Source 197,326">197,326</sup>.`}]},
 barsMax:{inc:2.4,prev:18},
 barIntro:{inc:'Tap a bar. Grey bars are model estimates.',prev:'Tap a bar. Grey bars are model estimates that pool all motor neuron diseases.'},
 /* phenotypes */
 sig:{yes:'present',no:'absent',later:'absent at first',few:'mild or absent'},
 umnL:'Upper motor neuron signs',lmnL:'Lower motor neuron signs',ftdL:'Frontotemporal dementia',ftdV:'yes',
 survT:['MEDIAN SURVIVAL FROM ONSET','London cohort, months'],
 survRow:{bulbar:'Bulbar onset',limb:'Limb onset',flailArm:'Flail arm',flailLeg:'Flail leg'},
 survV:(m,p)=>`${m} mo · ${p}% at 5 y`,
 survNone:'No median in this cohort for this pattern',
 frontal:'frontal lobes'
};
const WH_SURV=[['bulbar',27,8.8],['limb',35,20],['flailArm',61,52],['flailLeg',69,64]];
const WH_PH=[
 {id:'classic',n:'Classic limb onset',f:{cervical:1,lumbosacral:.55,bulbar:.25,thoracic:.25},u:'yes',l:'yes',sv:'limb',
  txt:`Weakness starts in an arm or a leg, with both upper and lower motor neuron signs. Limb onset was 74.6% of people at a London clinic <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>; in a French incident cohort, lumbar onset was 28.2% and cervical onset 23.1% <sup class="c" data-ref="Hamidou2017" title="Source 217">217</sup>. In another London cohort, median survival from onset was 35 months and 20% were alive at 5 years (31 months in Melbourne) <sup class="c" data-ref="Wijesekera2009" title="Source 537">537</sup>.`},
 {id:'bulbar',n:'Bulbar onset',f:{bulbar:1,cervical:.25,thoracic:.15,lumbosacral:.1},u:'yes',l:'yes',sv:'bulbar',
  txt:`Slurred speech or trouble swallowing comes first. Bulbar onset was 25.4% at a London clinic, 33.0% in France, 31% and 35.3% in Irish cohorts and 22.7% in an African hospital cohort <sup class="c" data-ref="Roche2012,Hamidou2017,Rooney2017,Elamin2011,Luna2019" title="Source 156,217,305,451,455">156,217,305,451,455</sup>. Median survival from onset was 27 months, with 8.8% alive at 5 years <sup class="c" data-ref="Wijesekera2009" title="Source 537">537</sup>. A less common form, pseudobulbar palsy, has mostly upper motor neuron bulbar features that spread slowly to the limbs <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>.`},
 {id:'pls',n:'Primary lateral sclerosis (PLS)',f:{lumbosacral:.85,cervical:.4,bulbar:.3,thoracic:.1},u:'yes',l:'later',sv:null,
  txt:`Only upper motor neuron signs at first: spasticity and brisk reflexes <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>. Of 29 people with only UMN signs at their first assessment, 13 later developed LMN signs, at about 3.2 to 3.7 years. Clinically pure PLS can be defined by isolated UMN signs 4 years after onset, and survival is longer than in ALS <sup class="c" data-ref="Gordon2006" title="Source 211">211</sup>. Pseudobulbar affect (uncontrolled laughing or crying) was recorded in 31 of 50 people with PLS at one clinic <sup class="c" data-ref="Floeter2014" title="Source 186">186</sup>.`},
 {id:'pma',n:'Progressive muscular atrophy (PMA)',f:{cervical:.8,lumbosacral:.6,bulbar:.15,thoracic:.15},u:'later',l:'yes',sv:null,
  txt:`Only lower motor neuron signs at first: weakness, wasting and fasciculations. In London, PMA not classed as flail arm or flail leg was 4% and had a prognosis similar to typical limb-onset ALS <sup class="c" data-ref="Wijesekera2009" title="Source 537">537</sup>. In a New York centre, people with PMA were more often male and older and lived longer; 22% developed UMN signs within 61 months, and the authors conclude that PMA should be considered a form of ALS <sup class="c" data-ref="Kim2009" title="Source 264">264</sup>.`},
 {id:'flailArm',n:'Flail arm',f:{cervical:1},u:'few',l:'yes',sv:'flailArm',
  txt:`Weakness and wasting stay mostly in both arms for a long time. Flail arm was 11% of a London cohort, with median survival of 61 months from onset (66 in Melbourne) and 52% alive at 5 years. Men outnumbered women 4 to 1 <sup class="c" data-ref="Wijesekera2009" title="Source 537">537</sup>. Possible flail arm was 4.0% of a French incident cohort <sup class="c" data-ref="Hamidou2017" title="Source 217">217</sup>.`},
 {id:'flailLeg',n:'Flail leg',f:{lumbosacral:1},u:'few',l:'yes',sv:'flailLeg',
  txt:`Weakness and wasting stay mostly in the legs for a long time. Flail leg was 6% of a London cohort, with median survival of 69 months from onset (71 in Melbourne) and 64% alive at 5 years <sup class="c" data-ref="Wijesekera2009" title="Source 537">537</sup>. It was 4.4% of a French incident cohort <sup class="c" data-ref="Hamidou2017" title="Source 217">217</sup>.`},
 {id:'resp',n:'Respiratory onset',f:{thoracic:1,cervical:.2},u:'yes',l:'yes',sv:null,
  txt:`The breathing muscles weaken first. Respiratory onset was 2.7% at a Canadian clinic and 2.1% in France. Only 14% presented acutely needing emergency intubation, and mean survival from onset to death or permanent ventilation was 27.0 months, close to bulbar onset <sup class="c" data-ref="Shoesmith2007,Hamidou2017" title="Source 217,470">217,470</sup>. Outcomes were worst in respiratory and bulbar phenotypes in the Piedmont register <sup class="c" data-ref="Chio2011" title="Source 107">107</sup>.`},
 {id:'ftd',n:'ALS with frontotemporal dementia',f:{cervical:.6,bulbar:.5,lumbosacral:.3,thoracic:.2},u:'yes',l:'yes',d:1,sv:null,
  txt:`About 15% of people with ALS meet criteria for frontotemporal dementia (FTD), and changes in thinking or behaviour occur in 35-50% <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>. FTD was found in about 14% of Irish incident cases <sup class="c" data-ref="Byrne2012" title="Source 87">87</sup>. Comorbid FTD went with shorter survival (HR 2.67) <sup class="c" data-ref="Elamin2011" title="Source 156">156</sup>. Half of C9orf72 expansion carriers had FTD, against 12% of non-carriers <sup class="c" data-ref="Byrne2012" title="Source 87">87</sup>. <a href="#genes" data-go="genes">Genes</a> · <a href="#living" data-go="living">Living with ALS</a>`}
];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');
  let onset='limb';
  const T=(x,y,c,st,v)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  /* anchor points of each region in bodyMap's own coordinates */
  const ANC={bulbar:[12,-126],cervical:[50,-10],thoracic:[16,-42],lumbosacral:[16,50]};
  const ARM='M34 -58 l8 4 14 64 -10 3 -16 -52z';
  const START=[0,17.7,23.3,30.3];
  /* how much of each region is affected at month m */
  function fills(m){const O=WH_ONSET[onset].order,F={};
    O.forEach((r,k)=>{F[r]=k===0&&onset==='limb'?ramp(m,3,11):ramp(m,START[k],START[k]+7)});
    return F}
  function draw(t){
    const N=vb(svg,'720 400','400 650');
    const L=N?{fig:[92,162,1.0],lx:186,ly:{bulbar:30,thoracic:104,cervical:150,lumbosacral:222},
        oT:[16,298],oR:k=>336+k*42,oC:28,oN:48,oB:[226,384],
        aT:[16,520],aY:584,aX:[30,380],aL:[562,628],aTk:602}
      :{fig:[100,205,1.3],lx:205,ly:{bulbar:68,thoracic:126,cervical:172,lumbosacral:270},
        oT:[364,40],oR:k=>79+k*42,oC:376,oN:396,oB:[522,700],
        aT:[364,252],aY:330,aX:[372,700],aL:[308,368],aTk:348};
    const m=t*WH_M,O=WH_ONSET[onset].order,F=fills(m),[fx,fy,fs]=L.fig;
    const P=r=>[fx+ANC[r][0]*fs,fy+ANC[r][1]*fs];
    let s=`<defs>${marker('whArr','var(--tdp)')}</defs>`;
    /* right-hand (or lower) panel backdrop */
    s+=N?`<rect x="6" y="276" width="388" height="200" rx="12" style="fill:var(--field);stroke:var(--line)"/><rect x="6" y="494" width="388" height="150" rx="12" style="fill:var(--field);stroke:var(--line)"/>`
        :`<rect x="350" y="16" width="364" height="210" rx="12" style="fill:var(--field);stroke:var(--line)"/><rect x="350" y="232" width="364" height="156" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    /* the body */
    s+=bodyMap(fx,fy,fs,F,{hide:true});
    if(onset==='limb'){const a=ramp(m,0,3.5)*(1-.6*ramp(m,8,11));
      s+=`<path d="${ARM}" transform="translate(${f1(fx)} ${f1(fy)}) scale(${f1(fs)})" style="fill:var(--tdp);opacity:${f1(.7*a)}"/>`}
    /* labels with leaders */
    ['bulbar','thoracic','cervical','lumbosacral'].forEach(r=>{const [ax,ay]=P(r),y=L.ly[r];
      s+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="2.6" style="fill:var(--ink)"/>`+LN(ax,ay,L.lx-6,y-4,'stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3');
      s+=T(L.lx,y,'t-lbl','',WH_TXT.reg[r][0])+T(L.lx,y+14,'t-xs','',WH_TXT.reg[r][1])});
    /* the newest region pulses; an arrow shows each step of spread */
    let cur=0;O.forEach((r,k)=>{if(m>=START[k])cur=k});
    const fr=F[O[cur]];
    if(fr<1){const ph=(m*0.9)%1,[ax,ay]=onset==='limb'&&cur===0?[fx+46*fs,fy-12*fs]:P(O[cur]);
      s+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(6+16*ph)}" style="fill:none;stroke:var(--tdp);stroke-width:2;opacity:${f1(.85*(1-ph))}"/>`}
    for(let k=1;k<4;k++){const o=bump(m,START[k]-2,START[k]+6);if(o<.02)continue;
      const Q=r=>[fx-ANC[r][0]*fs,fy+ANC[r][1]*fs],[x1,y1]=Q(O[k-1]),[x2,y2]=Q(O[k]),cx=fx-(Math.abs(y2-y1)>60?95:60)*fs,cy=(y1+y2)/2;
      s+=`<path d="M${f1(x1)} ${f1(y1)} Q${f1(cx)} ${f1(cy)} ${f1(x2)} ${f1(y2)}" style="fill:none;stroke:var(--tdp);stroke-width:2.2;opacity:${f1(o)}" marker-end="url(#whArr)"/>`}
    /* order of spread */
    s+=T(L.oT[0],L.oT[1],'t-sm','fill:var(--ink);font-weight:600',WH_TXT.order[0])+T(L.oT[0],L.oT[1]+14,'t-xs','',WH_TXT.order[1]);
    let inv=0;
    O.forEach((r,k)=>{const y=L.oR(k),v=F[r],st=v<=0?'no':v<1?'start':'yes';if(v>0)inv++;
      s+=`<circle cx="${L.oC}" cy="${y-4}" r="11" style="fill:${v>0?'var(--tdp-soft)':'var(--panel)'};stroke:${v>0?'var(--tdp)':'var(--line)'};stroke-width:1.6"/>`+T(L.oC,y,'t-sm t-mid','fill:var(--ink);font-weight:600',k+1);
      s+=T(L.oN,y-2,'t-lbl','',WH_TXT.reg[r][0])+T(L.oN,y+12,'t-xs',v>0?'fill:var(--tdp)':'',WH_TXT.state[st]);
      const bw=L.oB[1]-L.oB[0];
      s+=`<rect x="${L.oB[0]}" y="${y-9}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${L.oB[0]}" y="${y-9}" width="${f1(bw*v)}" height="10" rx="5" style="fill:var(--tdp)"/>`});
    /* month axis */
    const X=mm=>lerp(L.aX[0],L.aX[1],mm/WH_M);
    s+=T(L.aT[0],L.aT[1],'t-sm','fill:var(--ink);font-weight:600',WH_TXT.axis[0])+T(L.aT[0],L.aT[1]+14,'t-xs','',WH_TXT.axis[1]);
    s+=LN(L.aX[0],L.aY,L.aX[1],L.aY,'stroke:var(--muted);stroke-width:1.4');
    WH_TXT.ticks.forEach(k=>{const x=X(k);s+=LN(x,L.aY,x,L.aY+5,'stroke:var(--muted)')+T(x,L.aTk,'t-xs t-mid','',k)});
    WH_TXT.ms.forEach(([mm,lb,row])=>{const x=X(mm),pass=m>=mm-.05;
      s+=row?LN(x,L.aY,x,L.aL[1]-11,`stroke:${pass?'var(--ink)':'var(--line)'};stroke-width:1.4`):LN(x,L.aL[0]+4,x,L.aY,`stroke:${pass?'var(--ink)':'var(--line)'};stroke-width:1.4`);
      s+=T(x,L.aL[row],'t-xs t-mid',pass?'fill:var(--ink);font-weight:600':'',lb)});
    const xp=X(m);
    s+=`<rect x="${f1(L.aX[0])}" y="${L.aY-3}" width="${f1(Math.max(0,xp-L.aX[0]))}" height="6" rx="3" style="fill:var(--tdp);opacity:.55"/>`;
    s+=`<path d="M${f1(xp-6)} ${L.aY-15} L${f1(xp+6)} ${L.aY-15} L${f1(xp)} ${L.aY-5}Z" style="fill:var(--ink)"/>`;
    s+=T(L.aX[1],L.aT[1],'t-sm t-end','fill:var(--tdp);font-weight:600',WH_TXT.month(Math.round(m)));
    svg.innerHTML=s;
    const p=phaseOf(WH_STEPS,t);setSt(p);
    $('#whNote').innerHTML=noteHTML(Object.assign({},WH_STEPS[p],WH_ONSET[onset].steps[p]));
    $('#whRead').innerHTML=WH_TXT.read(WH_TXT.onsetName[onset],Math.round(m),inv,4);
  }
  const stop=playWire(rg,$('#whPlay'),draw,16000,UI.replay,'what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  toggleRow($('#whOnset'),WH_TXT.onsets,onset,v=>{onset=v;stop();draw(+rg.value)});
  draw(+rg.value);

  /* ---- key numbers and disagreements ---- */
  $('#whCards').innerHTML=WH_TXT.cards.map(c=>`<div class="card"><div class="kicker">${c.k}</div><div class="wh-num">${c.num}<small>${c.u}</small></div><p>${c.txt}</p></div>`).join('');
  $('#whDis').innerHTML=WH_TXT.dis.map(c=>`<div class="card wh-dis"><h4>${c.t}</h4><p>${c.txt}</p></div>`).join('');

  /* ---- incidence and prevalence by source ---- */
  let meas='inc';
  function bars(sel){const B=WH_TXT.bars[meas],mx=WH_TXT.barsMax[meas];
    $('#whBars').innerHTML=B.map((b,i)=>`<button class="wh-bar${b.m?' model':''}" data-b="${i}" aria-pressed="${i===sel}"><span>${b.n}<small>${b.s}${b.m?' · '+WH_TXT.model:''}</small></span><span class="tr"><i data-w="${f1(100*b.v/mx)}"></i></span><span class="v">${b.v}</span></button>`).join('');
    requestAnimationFrame(()=>$$('#whBars .tr i').forEach(i=>i.style.width=i.dataset.w+'%'));
    barNote(sel)}
  function barNote(i){const b=WH_TXT.bars[meas][i];
    $('#whBarNote').innerHTML=`<div class="kicker">${WH_TXT.unit[meas]}</div><h4>${b.n}: ${b.v}</h4><p>${b.txt}</p><p class="stage-cap">${WH_TXT.barIntro[meas]}</p>`}
  $('#whBars').addEventListener('click',e=>{const b=e.target.closest('[data-b]');if(!b)return;$$('#whBars [data-b]').forEach(x=>x.setAttribute('aria-pressed',x===b));barNote(+b.dataset.b)});
  toggleRow($('#whMeas'),WH_TXT.meas,meas,v=>{meas=v;bars(0)});
  bars(0);

  /* ---- phenotype explorer ---- */
  const ps=$('#whPhSvg');let ph=WH_PH[0],grow=1,stopG=null;
  function drawPh(){
    const N=vb(ps,'720 300','400 530');
    const L=N?{fig:[78,178,.95],pX:170,pW:222,pY:56,sT:[16,316],sR:k=>352+k*40,sB:[16,384],nY:512}
      :{fig:[100,170,.95],pX:210,pW:230,pY:40,sT:[470,40],sR:k=>78+k*46,sB:[470,710],nY:270};
    const F={};Object.keys(ph.f).forEach(k=>F[k]=ph.f[k]*grow);
    let s=bodyMap(L.fig[0],L.fig[1],L.fig[2],F,{hide:true});
    if(ph.d){const hx=L.fig[0],hy=L.fig[1]-138*L.fig[2];
      s+=`<ellipse cx="${f1(hx)}" cy="${f1(hy)}" rx="${f1(13*L.fig[2])}" ry="${f1(7*L.fig[2])}" style="fill:var(--umn);opacity:${f1(.75*grow)}"/>`;
      s+=T(hx+20,hy-6,'t-xs','fill:var(--umn)',WH_TXT.frontal)}
    const pill=(y,lb,val,col,on)=>`<rect x="${L.pX}" y="${y}" width="${L.pW}" height="34" rx="9" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${on?col:'var(--line)'};stroke-width:${on?2:1}"/>`
      +`<rect x="${L.pX}" y="${y}" width="6" height="34" rx="3" style="fill:${on?col:'var(--line)'}"/>`
      +T(L.pX+14,y+13,'t-xs','',lb)+T(L.pX+14,y+28,'t-lbl',on?'':'fill:var(--muted)',val);
    s+=pill(L.pY,WH_TXT.umnL,WH_TXT.sig[ph.u],'var(--umn)',ph.u==='yes');
    s+=pill(L.pY+42,WH_TXT.lmnL,WH_TXT.sig[ph.l],'var(--lmn)',ph.l==='yes');
    if(ph.d)s+=pill(L.pY+84,WH_TXT.ftdL,WH_TXT.ftdV,'var(--umn)',true);
    /* survival bars: label left, value right, bar underneath */
    s+=T(L.sT[0],L.sT[1],'t-sm','fill:var(--ink);font-weight:600',WH_TXT.survT[0])+T(L.sT[0],L.sT[1]+13,'t-xs','',WH_TXT.survT[1]);
    const bw=L.sB[1]-L.sB[0];
    WH_SURV.forEach(([id,mo,p5],k)=>{const y=L.sR(k),on=ph.sv===id,hi=on?'fill:var(--ink);font-weight:700':'';
      s+=T(L.sB[0],y,'t-xs',hi,WH_TXT.survRow[id])+T(L.sB[1],y,'t-xs t-end',hi,WH_TXT.survV(mo,p5));
      s+=`<rect x="${L.sB[0]}" y="${y+6}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${L.sB[0]}" y="${y+6}" width="${f1(bw*mo/72*(on?grow:1))}" height="10" rx="5" style="fill:${on?'var(--tdp)':'var(--muted)'};opacity:${on?1:.45}"/>`});
    if(!ph.sv)s+=T(L.sB[0],L.nY,'t-xs','fill:var(--ink)',WH_TXT.survNone);
    ps.innerHTML=s;
  }
  function pickPh(id){ph=WH_PH.find(p=>p.id===id);if(stopG)stopG();grow=.3;
    stopG=animate(650,q=>{grow=.3+.7*ease(q);drawPh()},()=>{stopG=null});
    $('#whPhNote').innerHTML=`<div class="kicker">${WH_TXT.umnL}: ${WH_TXT.sig[ph.u]} · ${WH_TXT.lmnL}: ${WH_TXT.sig[ph.l]}</div><h4>${ph.n}</h4><p>${ph.txt}</p>`}
  toggleRow($('#whPh'),WH_PH.map(p=>[p.id,p.n]),ph.id,pickPh);
  pickPh(ph.id);
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();drawPh()};
};

/* =============== 1.2 upper and lower motor neurons =============== */
const NE_STEPS=[
 {from:0,at:.05,k:'Step 1 · Healthy',t:'Cortex to cord to muscle',
  txt:'The upper motor neuron (UMN) is a Betz cell in layer 5 of the primary motor cortex. Its axon runs down the corticospinal tract, through the internal capsule and the brainstem. Most of these axons cross the midline at the pyramidal decussation, where the brainstem meets the spinal cord. <sup class="c" data-ref="Feldman2022,Welniarz2017" title="Source 180,534">180,534</sup> They contact lower motor neurons (LMN) in the anterior horn, directly or through interneurons. <sup class="c" data-ref="Lemon2008" title="Source 288">288</sup> Each LMN and all the muscle fibres it supplies form one motor unit; the impulse crosses the neuromuscular junction to contract them. <sup class="c" data-ref="Moloney2014" title="Source 341">341</sup>',
  pt:'Two nerve cells carry each command. The first runs from the brain to the spinal cord. The second runs from the spinal cord to the muscle.',
  hook:'UMN = Betz cell in the motor cortex and its corticospinal or corticobulbar axon. LMN = anterior horn cell or brainstem motor nucleus, with its axon. Motor unit = one LMN plus all the fibres it supplies.'},
 {from:.14,at:.28,k:'Step 2 · Upper neuron fails',t:'Losing the upper neuron: spasticity and brisk reflexes',
  txt:'When upper motor neurons degenerate, examination shows brisk reflexes that spread to nearby muscles, pathological reflexes such as Hoffmann and Babinski signs, a reflex kept in a weak limb, and spasticity: tone that rises with the speed of stretch. <sup class="c" data-ref="Feldman2022,Shefner2020" title="Source 180,464">180,464</sup> In the bulbar system, UMN loss can bring pseudobulbar affect, uncontrollable laughing or crying; one imaging study also found disrupted pathways to the cerebellum in people with it. <sup class="c" data-ref="Feldman2022,Floeter2014" title="Source 180,186">180,186</sup> Around symptom onset, brain stimulation (TMS) can already show an over-excitable motor cortex. <sup class="c" data-ref="Vucic2006,Vucic2008" title="Source 522,523">522,523</sup>',
  pt:'The command from the brain gets through less cleanly. Muscles feel stiff, and reflexes jump more than usual.',
  hook:'UMN signs: spasticity, brisk and spreading reflexes, Hoffmann, Babinski (extensor plantar), jaw jerk, pseudobulbar affect. UMN assessment is still clinical. <sup class="c" data-ref="Huynh2016" title="Source 240">240</sup>'},
 {from:.34,at:.47,k:'Step 3 · Lower neuron fails',t:'Losing the lower neuron: weakness, wasting, fasciculations',
  txt:'Lower motor neuron loss shows as weakness, wasting and fasciculations, visible twitches of muscle. <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup> Fast-fatigable units (unit B here) are lost first. <sup class="c" data-ref="Moloney2014,Kanning2010" title="Source 255,341">255,341</sup> In SOD1 mice the nerve terminals let go of the muscle before the cell bodies die, so loss may begin at the far end (mouse evidence). <sup class="c" data-ref="Fischer2004" title="Source 185">185</sup> Orphaned fibres fire on their own: needle EMG records fibrillations and positive sharp waves, and unstable motor axons produce fasciculation potentials. <sup class="c" data-ref="Joyce2013,deCarvalho2013" title="Source 135,252">135,252</sup>',
  pt:'When a lower nerve cell dies, its muscle fibres lose their nerve. They twitch on their own, and the muscle gets weaker.',
  hook:'EMG ongoing denervation = fibrillations and positive sharp waves. Under Awaji, fasciculation potentials count the same in suspected ALS. <sup class="c" data-ref="deCarvalho2008" title="Source 134">134</sup>'},
 {from:.52,at:.66,k:'Step 4 · Reinnervation',t:'Surviving neurons adopt orphaned fibres',
  txt:'Surviving motor neurons sprout new branches and adopt the orphaned fibres, so each surviving unit grows. Needle EMG sees large, long-duration, polyphasic motor unit potentials, with fewer units firing (reduced recruitment). <sup class="c" data-ref="Joyce2013,Garnier2024" title="Source 194,252">194,252</sup> This can keep strength near normal even when up to half the motor units are lost. <sup class="c" data-ref="Joyce2013" title="Source 252">252</sup> The new terminals are immature, so transmission is unstable (jitter and blocking on single-fibre EMG). <sup class="c" data-ref="Joyce2013" title="Source 252">252</sup> Slow units compensate for a while, then degenerate too. <sup class="c" data-ref="Nijssen2017" title="Source 404">404</sup>',
  pt:'Healthy nerve cells nearby grow new branches and take over the abandoned fibres. Strength can hold up for a while, even though nerve cells are being lost.',
  hook:'Chronic neurogenic change = large, long, polyphasic MUPs with reduced recruitment. A Gold Coast EMG LMN sign needs chronic neurogenic change AND ongoing denervation in the same muscle. <sup class="c" data-ref="Shefner2020,Turner2022" title="Source 464,502">464,502</sup>'},
 {from:.70,at:.84,k:'Step 5 · Both',t:'ALS: the mixture of both sets of signs',
  txt:'In ALS, UMN and LMN signs appear together and spread from the region where they began to neighbouring regions. <sup class="c" data-ref="Ravits2009,Feldman2022" title="Source 180,445">180,445</sup> When reinnervation can no longer keep up, weakness and wasting become clear. In 2 of 19 SOD1 carriers followed with motor unit counts, the count fell suddenly a few months before weakness began. <sup class="c" data-ref="Aggarwal2002" title="Source 3">3</sup> A reflex that stays brisk in a weak, wasted limb is itself a UMN sign, although UMN signs get harder to elicit as a limb wastes. <sup class="c" data-ref="Feldman2022,Swash2012" title="Source 180,489">180,489</sup>',
  pt:'ALS damages both nerve cells. A person can have stiff, jumpy muscles and weak, thin, twitching muscles, sometimes in the same limb.',
  hook:'ALS = UMN plus LMN signs that progress and spread, with other causes excluded. Pure LMN (PMA) in 2 or more regions counts as ALS under Gold Coast; pure UMN (PLS) does not. <sup class="c" data-ref="Shefner2020,deCarvalhoSwash2024" title="Source 136,464">136,464</sup>'},
 {from:.86,at:.96,k:'Step 6 · Split hand',t:'Why some muscles go first',
  txt:'In ALS the thumb side of the hand wastes first: abductor pollicis brevis (APB) and first dorsal interosseous (FDI). Abductor digiti minimi (ADM), on the little-finger side, is relatively spared, although all three are supplied from C8-T1 and FDI and ADM share the ulnar nerve. <sup class="c" data-ref="Eisen2012" title="Source 154">154</sup> Explanations are cortical (smaller motor evoked potentials from thenar muscles) and peripheral (more excitable APB and FDI axons). The sign is reported to have high specificity in early ALS. <sup class="c" data-ref="Eisen2012" title="Source 154">154</sup>',
  pt:'The muscles at the base of the thumb thin out early, while the muscle on the little-finger side stays fuller. Doctors look for this pattern.',
  hook:'Split hand: APB and FDI wasted, ADM relatively spared, although FDI and ADM share the ulnar nerve, so no single nerve or root explains it.'}
];
const NE_TXT={
  modeBtn:{als:'Both (ALS)',pls:'UMN only (PLS pattern)',pma:'LMN only (PMA pattern)'},
  arcBtn:{on:'Show',off:'Hide'},
  modeName:{als:['Both neurons fail','(ALS)'],pls:['Upper neurons only','(PLS pattern)'],pma:['Lower neurons only','(PMA pattern)']},
  pattern:'PATTERN SHOWN',
  modeLine:{als:'Pattern shown: both neurons fail, as in ALS.',pls:'Pattern shown: upper motor neurons only, as in primary lateral sclerosis (PLS).',pma:'Pattern shown: lower motor neurons only, as in progressive muscular atrophy (PMA).'},
  spared:{
    plsLow:'In this pattern the lower motor neurons survive, so the muscle keeps its nerve supply and EMG stays essentially normal. PLS consensus criteria allow only minimal EMG changes. <sup class="c" data-ref="Turner2020PLS" title="Source 501">501</sup>',
    plsLate:'No wasting or fasciculations in a UMN-only pattern. In one series, 13 of 29 people with pure UMN onset later developed EMG denervation and LMN signs, at an average of 3-4 years. <sup class="c" data-ref="Turner2020PLS" title="Source 501">501</sup>',
    pmaUp:'In this pattern the upper motor neurons stay, so there is no spasticity and no Babinski sign. In a New York series of 91 people with PMA, UMN signs appeared in 22% within 61 months of diagnosis. <sup class="c" data-ref="Kim2009" title="Source 264">264</sup>',
    pmaLate:'Reflexes are not brisk here, because the upper neurons are spared. Under the Gold Coast criteria a pure LMN syndrome in 2 or more regions counts as ALS. <sup class="c" data-ref="Shefner2020,Pugdahl2021" title="Source 432,464">432,464</sup>'
  },
  now:list=>`Signs shown now: ${list}.`,none:'No signs: every part of the circuit is working.',sep:', ',
  cortex:'MOTOR CORTEX',umnName:'UMN: Betz cell',layer:'layer 5',capsule:'internal capsule',
  stem:'BRAINSTEM',ocular:['eye-movement nuclei','III, IV, VI'],ocularSpared:'III, IV, VI: spared',bulbar:['bulbar nuclei','V, VII, X-XII'],
  pyr:['pyramids:','most fibres cross'],cord:'SPINAL CORD',lmnName:'LMN',horn:'anterior horn',
  muscle:'MUSCLE FIBRES',unit:u=>`unit ${u}`,
  leg:{umn:['upper motor','neuron (UMN)'],lmn:['lower motor','neuron (LMN)'],fib:['fibres lettered','by motor unit']},
  emgTitle:'NEEDLE EMG',
  emg:{normal:'small, brief units',fib:'fibrillations, sharp waves',big:'large, long, polyphasic units',bigFib:'large units + fibrillations'},
  hand:{title:'SPLIT HAND',apb:'APB',fdi:'FDI',adm:'ADM',wasting:'wasting',kept:'kept',none:'no wasting',thumb:'thumb side',little:'little-finger side'},
  spindle:'spindle',sensory:'sensory fibre',tap:'tap',
  reflex:{normal:'reflex: normal',brisk:'reflex: brisk',notBrisk:'reflex: not brisk',briskWeak:'brisk in a weak limb'},
  plantar:'plantar reflex',foot:{down:['toes curl','down'],up:['big toe up:','Babinski']},
  sgTitle:'Signs at this point',
  sg:{umnH:'UMN SIGNS',lmnH:'LMN SIGNS',emgH:'NEEDLE EMG',
    spas:'Spasticity',brisk:'Brisk reflexes',bab:'Babinski, Hoffmann',weakRef:'Reflex in a|weak limb',
    weak:'Weakness',waste:'Wasting',fasc:'Fasciculations',
    fib:'Fibrillations,|sharp waves',fp:'Fasciculation|potentials',big:'Large, long|units',rec:'Reduced|recruitment'},
  signLong:{spas:'spasticity',brisk:'brisk reflexes',bab:'Babinski and Hoffmann signs',weakRef:'a brisk reflex in a weak limb',
    weak:'weakness',waste:'wasting',fasc:'fasciculations',
    fib:'EMG fibrillations and positive sharp waves',fp:'EMG fasciculation potentials',big:'EMG large, long-duration, polyphasic motor unit potentials',rec:'EMG reduced recruitment'},
  units:(n,m)=>`Motor units: ${n} of ${m}`,
  largest:n=>`Largest unit: ${n} fibres`,
  strength:{normal:'Strength: normal',kept:'Strength: kept by reinnervation',reduced:'Strength: reduced'},
  on:'present',off:'absent'
};
inits.neurons=()=>{
  const svg=$('#neSvg'),rg=$('#neT'),T=NE_TXT;let mode='als',arc=true;
  const frac=x=>x-Math.floor(x);
  const OWN=['A','B','C','A','B','C','A','B','C'],ADOPT={1:'A',4:'A',7:'C'};
  const UCOL={A:'var(--lmn)',B:'var(--steel)',C:'var(--good)'};
  const LMNY={A:305,B:355,C:405},LX=158;
  const FY=i=>290+18*i;
  /* point at fraction f along a polyline */
  function along(P,f){let tot=0;const seg=[];for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(d);tot+=d}
    let r=clamp(f)*tot;for(let i=0;i<seg.length;i++){if(r<=seg[i]||i===seg.length-1){const u=seg[i]?clamp(r/seg[i]):0;return [lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u)]}r-=seg[i]}return P[P.length-1]}
  const poly=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
  const lines=(arr,x,y,cls,dy,st='')=>arr.map((l,i)=>`<text x="${f1(x)}" y="${f1(y+i*dy)}" class="${cls}"${st?` style="${st}"`:''}>${l}</text>`).join('');
  /* disease state at time t, for the chosen pattern */
  function state(t){
    const U=mode!=='pma',Lm=mode!=='pls';
    const u=U?ease(ramp(t,.15,.25)):0;
    const bN=Lm?ramp(t,.35,.40):0,bA=Lm?ramp(t,.38,.44):0,bS=Lm?ramp(t,.41,.47):0;
    const r=Lm?ease(ramp(t,.53,.63)):0;
    const cD=Lm?ease(ramp(t,.71,.78)):0,cW=Lm?ramp(t,.75,.83):0;
    const hand=Lm?ease(ramp(t,.87,.94)):0;
    /* each fibre: who supplies it, how denervated, how wasted */
    const F=OWN.map((o,i)=>{let own=o,den=0,at=0,sprout=0;
      if(o==='B'){den=bN*(1-r);sprout=r;if(r>.5)own=ADOPT[i]}
      if(own==='C'||(o==='B'&&ADOPT[i]==='C')){const d=cD*(o==='B'?r:1);den=Math.max(den,d);at=cW*(o==='B'?r:1)}
      return {o,own,den,at,sprout,adopter:o==='B'?ADOPT[i]:null}});
    const alive={A:1,B:1-bS,C:1-cD};
    const unitsN=1+(bS<.5?1:0)+(cD<.5?1:0);
    const sizes={A:0,B:0,C:0};F.forEach(f=>{if(f.den<.5)sizes[f.own]++});
    const strength=F.reduce((a,f)=>a+(1-f.den)*(1-.5*f.at),0)/F.length;
    const S={
      spas:u>.5,brisk:u>.5,bab:u>.6,weakRef:u>.5&&strength<.8,
      weak:strength<.8,waste:cW>.4,fasc:Lm&&bN>.5,
      fib:F.some(f=>f.den>.5),fp:Lm&&bN>.5,big:r>.5,rec:bS>.5};
    return {U,Lm,u,bN,bA,bS,r,cD,cW,hand,F,alive,unitsN,sizes,strength,S};
  }
  /* EMG trace: unit potentials (biphasic, wider and taller when enlarged), fibrillations, sharp waves */
  function emgPath(x0,w,y0,st,t){
    const sh=frac(t*7),N=180;let d='';
    const units=[];
    const bigA=lerp(1,2.3,st.r),wid=lerp(.012,.026,st.r);
    [['A',.12],['B',.45],['C',.76]].forEach(([k,c])=>{if(st.alive[k]>.5)units.push(c)});
    const den=st.F.reduce((a,f)=>Math.max(a,f.den),0);
    for(let k=0;k<=N;k++){const x=k/N;let v=0;
      units.forEach((c0,j)=>{const c=frac(c0-sh);const z=(x-c)/wid;v+=-z*Math.exp(-z*z)*2.2*bigA;
        if(st.r>.05)v+=st.r*.9*Math.sin(z*7)*Math.exp(-z*z*.35)*bigA*.5});
      if(den>.3){[.3,.58,.9].forEach((c0,j)=>{const c=frac(c0-sh*1.7);const z=(x-c)/.0035;v+=-z*Math.exp(-z*z)*.55*den});
        const c=frac(.66-sh*1.3),dz=x-c;if(dz>0&&dz<.08)v-=den*1.1*(dz<.004?dz/.004:Math.exp(-(dz-.004)/.018))}
      d+=(k?'L':'M')+f1(x0+x*w)+' '+f1(y0-clamp(v,-2.6,2.6)*13)}
    return d;
  }
  /* a schematic open hand, palm up, thumb on the left; w: wasting 0..1 of APB and FDI */
  function handG(x,y,s,w,o){
    let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" style="opacity:${f1(o)}">`;
    const st='fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6;stroke-linejoin:round';
    [[24,6],[39,0],[54,4],[69,14]].forEach(([fx,fy])=>{g+=`<rect x="${fx}" y="${fy}" width="13" height="${46-fy}" rx="6.5" style="${st}"/>`});
    g+=`<g transform="translate(30 96) rotate(-42)"><rect x="-8" y="-50" width="16" height="54" rx="8" style="${st}"/></g>`;
    g+=`<path d="M22 44 L84 44 Q88 44 88 52 L88 98 Q88 112 72 112 L40 112 Q24 112 22 98 Z" style="${st}"/>`;
    const m='fill:var(--muscle);stroke:var(--muscle-line);stroke-width:1.4';
    g+=`<ellipse cx="36" cy="88" rx="${f1(11*(1-.55*w))}" ry="${f1(17*(1-.35*w))}" transform="rotate(-18 36 88)" style="${m}"/>`;
    g+=`<ellipse cx="18" cy="62" rx="${f1(6*(1-.55*w))}" ry="${f1(12*(1-.35*w))}" transform="rotate(-40 18 62)" style="${m}"/>`;
    g+=`<ellipse cx="78" cy="86" rx="8" ry="17" style="${m}"/>`;
    return g+'</g>';
  }
  function draw(t){
    const N=vb(svg,'720 470','400 836');
    const L=N?{fx:240,fw:116,bx:204,box:{x:10,y:488,w:380,h:118},sg:{x:12,y:626,colW:194,two:true},leg:{x:250,y:20,two:true},refX:240}
             :{fx:318,fw:130,bx:262,box:{x:270,y:140,w:226,h:120},sg:{x:514,y:22,colW:200,two:false},leg:{x:254,y:24,two:false},refX:320};
    const st=state(t),P=phaseOf(NE_STEPS,t);
    const tx=L.fx+L.fw+14,ty=362;
    const cyc=frac(t*16);
    let s=`<rect x="0" y="0" width="100%" height="100%" rx="10" style="fill:var(--field)"/>`;
    /* ---- brain, brainstem, cord ---- */
    s+=`<ellipse cx="125" cy="80" rx="110" ry="60" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<path d="M125 20 Q122 28 125 34" style="fill:none;stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<text x="16" y="13" class="t-xs">${T.cortex}</text>`;
    s+=`<rect x="105" y="126" width="40" height="130" rx="14" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<rect x="96" y="250" width="90" height="192" rx="24" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<line x1="125" y1="132" x2="125" y2="436" style="stroke:var(--cell-line);stroke-width:1;stroke-dasharray:3 4;opacity:.7"/>`;
    s+=`<text x="152" y="145" class="t-xs">${T.stem}</text>`;
    s+=`<text x="90" y="264" class="t-xs t-end">${T.cord}</text>`;
    /* ---- UMN and corticospinal tract ---- */
    const u=st.u,tw=lerp(3.4,1.4,u);
    const TP=[ [74,68],[82,98],[100,116],[113,134],[113,224],[118,236],[132,244],[137,256],[137,412] ];
    s+=`<path d="${poly(TP)}" style="fill:none;stroke:var(--umn);stroke-width:${f1(tw)};stroke-linejoin:round;opacity:${f1(1-.45*u)};${u>.02?`stroke-dasharray:${f1(10-4*u)} ${f1(1+6*u)}`:''}"/>`;
    /* branches: to the bulbar nucleus and to each LMN */
    s+=`<path d="M113 198 H128" style="stroke:var(--umn);stroke-width:${f1(tw*.6)};opacity:${f1(1-.6*u)}"/>`;
    ['A','B','C'].forEach(k=>{const y=LMNY[k];s+=`<path d="M137 ${y} H${LX-14}" style="stroke:var(--umn);stroke-width:${f1(tw*.6)};opacity:${f1(1-.6*u)}"/><circle cx="${LX-14}" cy="${y}" r="2.4" style="fill:var(--umn);opacity:${f1(1-.6*u)}"/>`});
    /* lipofuscin left where Betz cells were lost */
    if(u>.6)[[56,72],[92,78],[64,84],[86,66]].forEach(([x,y])=>{s+=`<circle cx="${x}" cy="${y}" r="1.8" style="fill:var(--muted);opacity:${f1((u-.6)*2)}"/>`});
    s+=umn(74,60,11,1,{dead:u,axonLen:0});
    s+=`<text x="92" y="58" class="t-lbl" style="fill:var(--umn)">${T.umnName}</text><text x="92" y="71" class="t-xs">${T.layer}</text>`;
    s+=`<text x="118" y="110" class="t-xs">${T.capsule}</text>`;
    /* signals descending */
    for(let k=0;k<3;k++){const f=frac(t*9+k/3);if(u>.3&&k>=3*(1-u))continue;const [px,py]=along(TP,f);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3.4" style="fill:var(--umn);opacity:${f1(1-.6*u)}"/>`}
    /* brainstem nuclei */
    const bul=st.Lm?.5*st.bS+.5*st.cD:0;
    s+=lmn(133,160,5,1,{axonLen:0,dead:0});
    s+=lmn(133,198,5,1,{axonLen:0,dead:bul});
    s+=`<text x="152" y="158" class="t-xs">${T.ocular[0]}</text><text x="152" y="169" class="t-xs">${t>=.7&&st.Lm?T.ocularSpared:T.ocular[1]}</text>`;
    s+=`<text x="152" y="196" class="t-xs">${T.bulbar[0]}</text><text x="152" y="207" class="t-xs">${T.bulbar[1]}</text>`;
    s+=lines(T.pyr,152,236,'t-xs',11);
    /* ---- LMNs, axons, branches ---- */
    s+=`<text x="90" y="292" class="t-lbl t-end" style="fill:var(--lmn)">${T.lmnName}</text><text x="90" y="304" class="t-xs t-end">${T.horn}</text>`;
    const jerk=arc?bump(cyc,.6,.85)*(st.u>.5?6:3):0;
    ['A','B','C'].forEach(k=>{const y=LMNY[k],dead=k==='B'?st.bS:k==='C'?st.cD:0,ax=k==='B'?st.bA:dead,col=UCOL[k];
      s+=`<path d="M${LX+11} ${y} H${L.bx}" style="fill:none;stroke:${col};stroke-width:3;stroke-linecap:round;opacity:${f1(1-.75*ax)};${ax>.02?`stroke-dasharray:${f1(8-3*ax)} ${f1(2+7*ax)}`:''}"/>`;
      s+=lmn(LX,y,10,1,{axonLen:0,dead});
      s+=`<text x="${LX+16}" y="${y-8}" class="t-lbl">${k}</text>`;
      if(1-ax>.5){const f=frac(t*11+(k==='A'?0:k==='B'?.33:.66));s+=`<circle cx="${f1(lerp(LX+12,L.bx,f))}" cy="${y}" r="3" style="fill:${col}"/>`}
    });
    /* branches to fibres */
    st.F.forEach((f,i)=>{const yF=FY(i),ex=L.fx+5;
      const br=(k,frac0,op,dash)=>{const y0=LMNY[k],x1=lerp(L.bx,ex,frac0),y1=lerp(y0,yF,frac0);
        return `<path d="M${L.bx} ${y0} C${f1(L.bx+18*frac0)} ${y0} ${f1(x1-18*frac0)} ${f1(y1)} ${f1(x1)} ${f1(y1)}" style="fill:none;stroke:${UCOL[k]};stroke-width:1.7;opacity:${f1(op)};${dash?'stroke-dasharray:3 3':''}"/>`};
      if(f.o==='B'){const keep=1-.75*st.bN;if(st.bN<1)s+=br('B',keep,1-st.bN,false);
        if(f.sprout>0){const adopterDead=f.adopter==='C'?st.cD:0;s+=br(f.adopter,f.sprout,1-adopterDead,f.sprout<1||adopterDead>0)}}
      else{const dead=f.o==='C'?st.cD:0;s+=br(f.o,1-.75*dead,1-dead,dead>0)}
    });
    /* ---- muscle fibres ---- */
    s+=`<text x="${L.fx}" y="${FY(8)+26}" class="t-xs">${T.muscle}</text>`;
    s+=`<g transform="translate(${f1(-jerk)} 0)">`;
    st.F.forEach((f,i)=>{const yF=FY(i);
      const fl=f.den>.3?f.den*Math.pow(Math.max(0,Math.sin(t*240+i*2.7)),6):0;
      const innerv=f.den<.5;
      s+=fibre(L.fx,yF,L.fw,12,1,{col:innerv?UCOL[f.own]:'var(--muted)',atrophy:f.at,flick:fl});
      s+=`<ellipse cx="${L.fx+6}" cy="${yF}" rx="3.2" ry="4.4" style="fill:${innerv?UCOL[f.own]:'var(--panel)'};stroke:${innerv?UCOL[f.own]:'var(--muted)'};stroke-width:1.2"/>`;
      if(innerv)s+=`<text x="${L.fx+L.fw-11}" y="${yF+3.5}" class="t-xs" style="fill:var(--ink);font-weight:700">${f.own}</text>`;
    });
    /* tendon */
    st.F.forEach((f,i)=>{s+=`<path d="M${L.fx+L.fw} ${FY(i)} L${tx} ${ty}" style="stroke:var(--cell-line);stroke-width:1.2;opacity:.8"/>`});
    s+=`</g>`;
    s+=`<circle cx="${f1(tx-jerk)}" cy="${ty}" r="3.4" style="fill:var(--cell-line)"/>`;
    /* ---- reflex arc ---- */
    if(arc){
      const sx=L.fx+L.fw*.5,sy=278;
      const AP=[ [sx-16,sy],[L.fx-6,270],[222,270],[186,270],[172,280],[LX+6,LMNY.A-10] ];
      s+=`<ellipse cx="${f1(sx)}" cy="${sy}" rx="16" ry="3.6" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.4"/>`;
      s+=`<path d="${poly(AP)}" style="fill:none;stroke:var(--steel);stroke-width:1.8;stroke-linejoin:round"/>`;
      s+=`<circle cx="222" cy="270" r="5" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:1.4"/>`;
      if(!N)s+=`<text x="${f1(sx+20)}" y="${sy+3}" class="t-xs" style="fill:var(--steel)">${T.spindle}</text>`;
      s+=`<text x="${N?200:194}" y="${N?264:285}" class="t-xs" style="fill:var(--steel)">${T.sensory}</text>`;
      const pa=ramp(cyc,.1,.4);if(pa>0&&pa<1){const [px,py]=along(AP,pa);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3.4" style="fill:var(--steel)"/>`}
      const pe=ramp(cyc,.4,.6);if(pe>0&&pe<1)s+=`<circle cx="${f1(lerp(LX+12,L.bx,pe))}" cy="${LMNY.A}" r="4.2" style="fill:var(--lmn);stroke:var(--panel);stroke-width:1"/>`;
      /* hammer */
      const hit=1-bump(cyc,0,.16),hx=tx+5+9*hit;
      s+=`<g><path d="M${f1(hx+5)} ${ty-6} L${f1(hx+12)} ${ty-34}" style="stroke:var(--muted);stroke-width:2.6;stroke-linecap:round"/><rect x="${f1(hx)}" y="${ty-12}" width="9" height="20" rx="3" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/></g>`;
      if(!N)s+=`<text x="${f1(tx+10)}" y="${ty+24}" class="t-xs">${T.tap}</text>`;
      const weakLimb=st.u>.5&&st.strength<.8;
      const rf=st.u>.5?(weakLimb?T.reflex.briskWeak:T.reflex.brisk):(st.Lm&&st.bN>.5?T.reflex.notBrisk:T.reflex.normal);
      s+=`<text x="${L.refX+(N?0:96)}" y="${FY(8)+(N?42:26)}" class="t-sm" style="fill:var(--ink)">${rf}</text>`;
      /* plantar response */
      const fx=14,fy=436,up=st.u>.6,tg=bump(cyc,.4,.95)*(up?-34:22);
      s+=`<text x="${fx}" y="372" class="t-xs">${T.plantar}</text>`;
      s+=`<path d="M${fx} ${fy} L${fx} ${fy-16} Q${fx+2} ${fy-30} ${fx+14} ${fy-30} L${fx+22} ${fy-27} Q${fx+38} ${fy-12} ${fx+56} ${fy-8} L${fx+58} ${fy} Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.5;stroke-linejoin:round"/>`;
      s+=`<g transform="rotate(${f1(tg)} ${fx+56} ${fy-4})"><rect x="${fx+55}" y="${fy-9}" width="15" height="8" rx="4" style="fill:var(--cell);stroke:${up?'var(--umn)':'var(--cell-line)'};stroke-width:1.6"/></g>`;
      const so=ramp(cyc,.1,.4);if(so>0&&so<1)s+=`<circle cx="${f1(lerp(fx+4,fx+50,so))}" cy="${fy+3}" r="2.6" style="fill:var(--muted)"/>`;
      s+=lines(up?T.foot.up:T.foot.down,fx,fy+18,'t-xs',11,up?'fill:var(--umn)':'');
    }
    /* ---- EMG or split-hand box ---- */
    const B=L.box,hf=ramp(t,.86,.88);
    s+=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="10" style="fill:var(--panel);stroke:var(--line);stroke-width:1.2"/>`;
    if(hf<1){
      const y0=B.y+B.h*.52;
      s+=`<g style="opacity:${f1(1-hf)}"><text x="${B.x+10}" y="${B.y+16}" class="t-xs">${T.emgTitle}</text>`;
      s+=`<line x1="${B.x+10}" x2="${B.x+B.w-10}" y1="${f1(y0)}" y2="${f1(y0)}" class="grid"/>`;
      s+=`<path d="${emgPath(B.x+10,B.w-20,y0,st,t)}" style="fill:none;stroke:var(--ink);stroke-width:1.4;stroke-linejoin:round"/>`;
      const anyDen=st.S.fib,em=st.S.big?(anyDen?T.emg.bigFib:T.emg.big):(anyDen?T.emg.fib:T.emg.normal);
      s+=`<text x="${B.x+10}" y="${B.y+B.h-10}" class="t-sm" style="fill:var(--ink)">${em}</text></g>`;
    }
    if(hf>0){
      const w=st.hand,hs=.8,hx=B.x+(N?60:36),hy=B.y+22;
      s+=`<text x="${B.x+10}" y="${B.y+16}" class="t-xs" style="opacity:${f1(hf)}">${T.hand.title}</text>`;
      s+=handG(hx,hy,hs,w,hf);
      const lx=N?B.x+150:B.x+126,stat=st.Lm?(w>.5?T.hand.wasting:''):T.hand.none;
      const LB=[['apb',36,88,stat],['fdi',18,62,stat],['adm',78,86,st.Lm?(w>.5?T.hand.kept:''):T.hand.none]];
      const ly=N?[B.y+40,B.y+70,B.y+100]:[B.y+44,B.y+72,B.y+100];
      LB.forEach(([k,mx,my,txt],j)=>{const px=hx+mx*hs,py=hy+my*hs,yy=ly[[1,0,2][j]];
        s+=`<g style="opacity:${f1(hf)}"><path d="M${f1(px)} ${f1(py)} L${lx-6} ${yy-4}" style="stroke:var(--muted);stroke-width:1;fill:none"/><text x="${lx}" y="${yy}" class="t-sm" style="fill:var(--ink)">${T.hand[k]}</text>`;
        if(txt)s+=`<text x="${lx+(N?34:30)}" y="${yy}" class="t-xs" style="fill:${k==='adm'||!st.Lm?'var(--muted)':'var(--tdp)'}">${txt}</text>`;
        if(N)s+=`<text x="${lx+110}" y="${yy}" class="t-xs">${k==='adm'?T.hand.little:T.hand.thumb}</text>`;
        s+='</g>'});
    }
    /* ---- legend ---- */
    {const G=L.leg;let y=G.y;
      s+=`<text x="${G.x}" y="${y}" class="t-xs">${T.pattern}</text>`;y+=16;
      const mn=T.modeName[mode];
      if(G.two){s+=lines(mn,G.x,y,'t-lbl',15);y+=36}else{s+=`<text x="${G.x}" y="${y}" class="t-lbl">${mn.join(' ')}</text>`;y+=24}
      [['umn','var(--umn)'],['lmn','var(--lmn)'],['fib','var(--muscle-line)']].forEach(([k,c])=>{
        s+=`<line x1="${G.x}" x2="${G.x+18}" y1="${y-4}" y2="${y-4}" style="stroke:${c};stroke-width:3.2;stroke-linecap:round"/>`;
        if(G.two){s+=lines(T.leg[k],G.x+26,y,'t-xs',11);y+=28}else{s+=`<text x="${G.x+26}" y="${y}" class="t-xs">${T.leg[k].join(' ')}</text>`;y+=16}});
    }
    /* ---- signs panel ---- */
    const G=L.sg,SGR=[['umnH','var(--umn)',['spas','brisk','bab','weakRef']],['lmnH','var(--lmn)',['weak','waste','fasc']],['emgH','var(--steel)',['fib','fp','big','rec']]];
    let gx=G.x,gy=G.y;
    const sgAt=s.length;let col1end=0;
    s+=`<text x="${gx}" y="${gy+2}" class="t-lbl">${T.sgTitle}</text>`;gy+=24;
    const col2y=gy;
    SGR.forEach(([h,c,rows],gi)=>{
      if(G.two&&gi===2){col1end=gy;gx=G.x+G.colW;gy=col2y}
      const allowed=h==='umnH'?st.U:st.Lm;
      s+=`<rect x="${gx}" y="${gy-9}" width="4" height="11" style="fill:${c}"/><text x="${gx+9}" y="${gy}" class="t-xs" style="fill:${c};font-weight:600">${T.sg[h]}</text>`;gy+=18;
      rows.forEach(k=>{const on=st.S[k],ls=T.sg[k].split('|');
        s+=`<rect x="${gx}" y="${gy-10}" width="13" height="13" rx="3" style="fill:${on?c:'var(--panel)'};stroke:${on?c:'var(--muted)'};stroke-width:1.4;opacity:${allowed||on?1:.55}"/>`;
        if(on)s+=`<path d="M${gx+3} ${gy-3.5} l3 3 l5 -6.5" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
        s+=lines(ls,gx+21,gy,'t-sm',13,on?'fill:var(--ink);font-weight:600':'');
        gy+=ls.length*13+(N?6:7)});
      gy+=8});
    /* readouts */
    gy+=2;
    const big=Math.max(st.sizes.A,st.sizes.B,st.sizes.C);
    const strTxt=st.strength>.95?(st.unitsN<3?T.strength.kept:T.strength.normal):T.strength.reduced;
    const rd=[T.units(st.unitsN,3),T.largest(big),strTxt];
    if(G.two){rd.forEach(r=>{s+=lines(r.length>24?wrap2(r):[r],gx,gy,'t-xs',11,'fill:var(--ink)');gy+=r.length>24?24:14})}
    else rd.forEach(r=>{s+=`<text x="${gx}" y="${gy}" class="t-xs" style="fill:var(--ink)">${r}</text>`;gy+=15});
    const sgEnd=Math.max(gy,col1end)-4;
    s=s.slice(0,sgAt)+`<rect x="${G.x-8}" y="${G.y-16}" width="${G.two?380:G.colW+4}" height="${f1(N?sgEnd-G.y+16:440)}" rx="10" style="fill:var(--panel);stroke:var(--line);stroke-width:1.2"/>`+s.slice(sgAt);
    if(N)svg.setAttribute('viewBox','0 0 400 '+Math.ceil(sgEnd+10));
    svg.innerHTML=s;
    /* ---- note ---- */
    setSt(P);
    const on=Object.keys(T.signLong).filter(k=>st.S[k]).map(k=>T.signLong[k]);
    let extra='';
    if(mode==='pls'&&(P===2||P===3))extra=T.spared.plsLow;
    else if(mode==='pls'&&P>=4)extra=T.spared.plsLate;
    else if(mode==='pma'&&P===1)extra=T.spared.pmaUp;
    else if(mode==='pma'&&P===4)extra=T.spared.pmaLate;
    const S0=NE_STEPS[P];
    const txt=`${S0.txt}</p><p class="ne-now"><b>${T.modeLine[mode]}</b>${extra?' '+extra:''}</p><p class="ne-now sm">${on.length?T.now(on.join(T.sep)):T.none} ${rd.join(' · ')}.`;
    $('#neNote').innerHTML=noteHTML({k:S0.k,t:S0.t,txt,pt:S0.pt,hook:S0.hook});
  }
  /* split a long readout into two lines at the space nearest the middle */
  function wrap2(r){const m=r.length/2;let best=-1;for(let i=0;i<r.length;i++)if(r[i]===' '&&(best<0||Math.abs(i-m)<Math.abs(best-m)))best=i;return best<0?[r]:[r.slice(0,best),r.slice(best+1)]}
  const stop=playWire(rg,$('#nePlay'),draw,26000,UI.replay,'neurons');
  const setSt=stepWire($('#neSteps'),NE_STEPS,rg,draw,stop);
  toggleRow($('#neMode'),[['als',T.modeBtn.als],['pls',T.modeBtn.pls],['pma',T.modeBtn.pma]],'als',v=>{mode=v;draw(+rg.value)});
  toggleRow($('#neArc'),[['on',T.arcBtn.on],['off',T.arcBtn.off]],'on',v=>{arc=v==='on';draw(+rg.value)});
  draw(+rg.value);
};
/* =============== 1.3 TDP-43 and what goes wrong =============== */
/* Three step lists share one timeline grid, so the slider means the same moment in each pathology. */
const TD_STEPS={
 tdp:[
  {from:0,at:.06,k:'Normal',t:'TDP-43 works in the nucleus',
   txt:'TDP-43 is a 414-amino-acid RNA-binding protein made from the TARDBP gene on chromosome 1. At steady state most of it is in the nucleus, probably as a dimer held together head to head by its N-terminal domain. It shuttles out to the cytoplasm and back, and the shuttling depends on ongoing transcription. <sup class="c" data-ref="Prasad2019,Ling2013,Ayala2008" title="Source 32,294,430">32,294,430</sup>',
   pt:'TDP-43 is a helper protein that mostly stays in the cell\'s control centre, the nucleus. It slips out now and then and comes back.',
   hook:'TDP-43: TARDBP gene, chromosome 1, 414 amino acids, normally <b>nuclear</b>. TDP-43 is essential: mice cannot live without the gene. <sup class="c" data-ref="Prasad2019,Ling2013" title="Source 294,430">294,430</sup>'},
  {from:.16,at:.24,k:'Splicing',t:'It keeps cryptic exons out',
   txt:'In the nucleus TDP-43 binds UG/TG-rich RNA. In mouse brain it bound RNA from 6,304 genes, and removing it altered 965 splicing events; the hardest-hit RNAs came from long-intron genes for synapse proteins. It also limits its own production. A key job is keeping "cryptic" exons out of mature mRNA. Bound in STMN2 intron 1, it stops cryptic exon 2a and its early polyadenylation site from being used. <sup class="c" data-ref="Buratti2001,Polymenidou2011,Ling2015,Melamed2019" title="Source 83,295,328,429">83,295,328,429</sup>',
   pt:'A gene is first copied as a rough draft. TDP-43 acts like an editor that makes sure a piece of the STMN2 draft that should never be kept is left out.',
   hook:'Repressing cryptic exons is a core TDP-43 job. STMN2 cryptic exon 2a is the best-known example. <sup class="c" data-ref="Ling2015,Melamed2019" title="Source 295,328">295,328</sup>'},
  {from:.32,at:.40,k:'Stress',t:'It moves into stress granules',
   txt:'Under stress, TDP-43 joins stress granules: droplets without a membrane that form by phase separation, driven by low-complexity domains such as its C-terminal tail. In cultured cells most TDP-43 inclusions overlapped stress granules, and inclusions in patient tissue carried the stress granule markers TIA-1 and eIF3. ALS mutations often fall in these low-complexity domains. <sup class="c" data-ref="LiuYesucevitz2010,Taylor2016" title="Source 298,493">298,493</sup>',
   pt:'When the cell is under strain, TDP-43 gathers with other proteins into temporary blobs in the cell fluid.',
   hook:'Low-complexity (prion-like) domains drive phase separation of TDP-43, FUS and hnRNPA1. <sup class="c" data-ref="Taylor2016" title="Source 493">493</sup>'},
  {from:.48,at:.56,k:'Mislocalised',t:'It fails to return and clumps',
   txt:'With lasting stress or too much TDP-43 in the cytoplasm, its droplets can harden into gels and solids. In one cell study this happened without conventional stress granules, so whether stress granules are the seed is debated (see Open questions below). The nucleus empties, and TDP-43 builds up in cytoplasmic inclusions. These are hyperphosphorylated by casein kinases 1 and 2 at C-terminal sites, ubiquitinated, and cut into C-terminal fragments of 18-26 kDa. <sup class="c" data-ref="GassetRosa2019,LiuYesucevitz2010,Neumann2006,Hasegawa2008" title="Source 195,220,298,392">195,220,298,392</sup>',
   pt:'The protein leaks out of the nucleus, does not come back, and sticks together in clumps.',
   hook:'ALS inclusions hold TDP-43 that is <b>phosphorylated, ubiquitinated and cleaved</b>, and the nucleus is cleared. About 97% of ALS in Feldman 2022; "over 90%" in Ling 2013. <sup class="c" data-ref="Feldman2022,Ling2013" title="Source 180,294">180,294</sup>'},
  {from:.64,at:.72,k:'Loss of function',t:'Cryptic exons slip in: STMN2 falls',
   txt:'Without nuclear TDP-43, cryptic exon 2a enters the STMN2 transcript and its early polyadenylation site cuts the mRNA short, so stathmin-2 protein falls. Klim 2019 describes this as cryptic-exon splicing and Melamed 2019 as premature polyadenylation; both describe the same truncated transcript. It was seen in stem-cell-derived motor neurons and in motor cortex and spinal cord from people with sporadic and C9orf72 ALS. Stathmin-2 is needed for axon outgrowth and repair, and restoring it rescued regrowth in cell models. UNC13A, a synapse gene, also gains a cryptic exon and its mRNA is destroyed. Common ALS and FTD risk variants in that intron make this worse. <sup class="c" data-ref="Klim2019,Melamed2019,Ma2022,Brown2022" title="Source 80,268,307,328">80,268,307,328</sup>',
   pt:'With the editor gone, a wrong piece is kept in the copy. The cell stops making stathmin-2, which the nerve fibre needs to grow and repair itself.',
   hook:'Loss of nuclear TDP-43 lets cryptic exons into <b>STMN2</b> (axon growth and repair) and <b>UNC13A</b> (synapse function). <sup class="c" data-ref="Klim2019,Ma2022,Brown2022" title="Source 80,268,307">80,268,307</sup>'},
  {from:.80,at:.88,k:'Gain of toxicity',t:'Aggregates harm the cell',
   txt:'Hardened cytoplasmic TDP-43 pulled in nuclear transport factors (importin-α and Nup62) and displaced others (RanGap1, Ran and Nup107). Import into the nucleus was blocked, more nuclear TDP-43 was lost, and the cells died. Ling and colleagues conclude that loss of nuclear function and toxic gain of function both probably contribute. Not every model fits: some mutant TDP-43 mice lost motor neurons without clumps or nuclear loss. <sup class="c" data-ref="GassetRosa2019,Ling2013" title="Source 195,294">195,294</sup>',
   pt:'The clumps also do harm of their own. They catch the cell\'s transport helpers, so even less of the protein gets back into the nucleus.',
   hook:'Loss of function <b>and</b> gain of toxicity: both are thought to contribute. <sup class="c" data-ref="Ling2013" title="Source 294">294</sup>'}
 ],
 sod1:[
  {from:0,at:.06,k:'SOD1-ALS · Normal',t:'SOD1 is a copper-zinc enzyme',
   txt:'SOD1 is an enzyme in the cytoplasm made of two subunits that bind copper and zinc. It turns superoxide into oxygen and hydrogen peroxide. Its gene is on chromosome 21q, and it was the first ALS gene, found in 1993. TDP-43 does its normal work in the nucleus. <sup class="c" data-ref="Rosen1993,Taylor2016" title="Source 456,493">456,493</sup>',
   pt:'SOD1 is a cleaning enzyme in the cell fluid. In this form of ALS, a change in its gene makes the enzyme fold badly.'},
  {from:.16,at:.24,k:'SOD1-ALS · Unstable',t:'A variant destabilises it',
   txt:'Five ALS-linked SOD1 variants all made the metal-free (apo) protein much less stable, and the less stable the variant, the shorter the mean survival of people carrying it. Oxidised normal and mutant SOD1 both come apart from dimers into monomers before they aggregate. <sup class="c" data-ref="Lindberg2002,Rakhit2004" title="Source 293,443">293,443</sup>',
   pt:'The two halves of the enzyme lose their metal and fall apart.'},
  {from:.32,at:.40,k:'SOD1-ALS · Misfolding',t:'Misfolded SOD1 clumps',
   txt:'The misfolded monomers aggregate. SOD1-containing aggregates were common to different mutants in mice, and SOD1-ALS shows inclusions of abnormal SOD1. <sup class="c" data-ref="Bruijn1998,Taylor2016" title="Source 81,493">81,493</sup>',
   pt:'The broken halves stick together into clumps.'},
  {from:.48,at:.56,k:'SOD1-ALS · No TDP-43 clumps',t:'TDP-43 stays in the nucleus',
   txt:'In an autopsy series of 111 cases, all sporadic, dementia-associated and SOD1-negative familial cases had TDP-43-positive inclusions. None of the 15 SOD1 cases did, although they had ubiquitin-positive inclusions. The authors suggest SOD1-ALS "may not be the familial counterpart of sporadic ALS". So the drawing keeps TDP-43 in the nucleus and its STMN2 job intact. <sup class="c" data-ref="Mackenzie2007" title="Source 309">309</sup>',
   pt:'In this form of ALS, TDP-43 stays where it belongs. A different protein is the problem.',
   hook:'SOD1-ALS: ubiquitin-positive inclusions <b>without TDP-43</b>. <sup class="c" data-ref="Mackenzie2007,Taylor2016" title="Source 309,493">309,493</sup>'},
  {from:.64,at:.72,k:'SOD1-ALS · Toxic gain',t:'A new, harmful property',
   txt:'Mice carrying human G93A SOD1, a change with little effect on enzyme activity, became paralysed. SOD1 knockout mice do not get ALS, and adding or removing normal SOD1 did not change disease in mutant mice. The harm comes from a new property of the mutant protein, not from too little enzyme. Large aggregates alone are not enough: removing them did not change disease in mice. <sup class="c" data-ref="Gurney1994,Reaume1996,Bruijn1998,Taylor2016" title="Source 81,215,447,493">81,215,447,493</sup>',
   pt:'The problem is not that the enzyme stops cleaning. The badly folded protein itself does damage.',
   hook:'SOD1-ALS is a <b>toxic gain of function</b>, independent of dismutase activity. <sup class="c" data-ref="Taylor2016" title="Source 493">493</sup>'},
  {from:.80,at:.88,k:'SOD1-ALS · Axon and glia',t:'The axon, and the cells around it',
   txt:'In SOD1 models, axonal transport slows months before neurons die, and in SOD1 mice the nerve endings on muscle disconnect before cell bodies are lost (dying-back). Mutant SOD1 in microglia and astrocytes speeds progression or kills motor neurons in models. Because this route depends on the SOD1 protein itself, lowering SOD1 is a treatment target: see <a href="#tofersen" data-go="tofersen">Tofersen, gene-targeted</a>. <sup class="c" data-ref="Taylor2016,Fischer2004,Boillee2006,Nagai2007,Miller2022" title="Source 67,185,335,355,493">67,185,335,355,493</sup>',
   pt:'Supplies stop moving down the nerve fibre, its far end pulls back from the muscle, and nearby support cells add to the damage.'}
 ],
 fus:[
  {from:0,at:.06,k:'FUS-ALS · Normal',t:'FUS, another RNA-binding protein',
   txt:'FUS, like TDP-43, is an RNA-binding protein with a low-complexity, prion-like domain. FUS mutations on chromosome 16 were found in familial ALS in 2009. Both proteins are drawn mainly in the nucleus here. <sup class="c" data-ref="Taylor2016,Kwiatkowski2009" title="Source 279,493">279,493</sup>',
   pt:'FUS is a second helper protein of the same kind as TDP-43.'},
  {from:.16,at:.24,k:'FUS-ALS · Mutations',t:'Mutations cluster in two places',
   txt:'FUS mutations cluster in its low-complexity domain and in its C-terminal nuclear localisation signal (NLS), the tag that brings it into the nucleus. In a meta-analysis, 90% of FUS mutations were in the C-terminal domain. NLS mutations increase cytoplasmic FUS. <sup class="c" data-ref="Ling2013,Naumann2019" title="Source 294,356">294,356</sup>',
   pt:'Most changes hit the part of FUS that works as its entry ticket to the nucleus.'},
  {from:.32,at:.40,k:'FUS-ALS · Stress',t:'Phase separation under stress',
   txt:'Like TDP-43, FUS phase-separates into stress granules through its low-complexity domain, and ALS mutations are frequent in that domain. <sup class="c" data-ref="Taylor2016" title="Source 493">493</sup>',
   pt:'Under strain, FUS also gathers into temporary blobs in the cell fluid.'},
  {from:.48,at:.56,k:'FUS-ALS · Mislocalised',t:'FUS builds up in the cytoplasm',
   txt:'Mutant FUS accumulated in the cytoplasm of neurons. FUS-ALS shows FUS-positive cytoplasmic inclusions without TDP-43-positive aggregates, though one review notes that "some debate remains". <sup class="c" data-ref="Kwiatkowski2009,Renton2014,Taylor2016" title="Source 279,449,493">279,449,493</sup>',
   pt:'FUS leaks out of the nucleus and clumps, while TDP-43 stays put.',
   hook:'FUS-ALS: FUS inclusions, not TDP-43 inclusions. <sup class="c" data-ref="Taylor2016,Renton2014" title="Source 449,493">449,493</sup>'},
  {from:.64,at:.72,k:'FUS-ALS · TDP-43 intact',t:'TDP-43 stays in the nucleus',
   txt:'With no TDP-43 inclusions, the drawing keeps TDP-43 bound to STMN2 and the cryptic exon out. This follows from the drawing\'s logic; the sources used here did not measure STMN2 in FUS-ALS. <sup class="c" data-ref="Taylor2016" title="Source 493">493</sup>',
   pt:'Here TDP-43 is still doing its editing job.'},
  {from:.80,at:.88,k:'FUS-ALS · Who it affects',t:'Often young, often new',
   txt:'Among 14 people with sporadic ALS that began before age 35, 6 (43%) carried a FUS mutation, and in all 5 families where parents were tested it had arisen new (de novo). P525L and truncating variants most often caused juvenile onset and rapid progression. How FUS inclusions damage the axon is not drawn here. <sup class="c" data-ref="Hubers2015,Naumann2019,Conte2012" title="Source 117,238,356">117,238,356</sup>',
   pt:'FUS-ALS often starts young, and the gene change is often new in the person rather than inherited.',
   hook:'Young-onset sporadic ALS: think <b>FUS</b>, often de novo (P525L). <sup class="c" data-ref="Hubers2015,Conte2012" title="Source 117,238">117,238</sup>'}
 ]
};
const TD_TXT={
 modes:[ ['tdp','TDP-43 (most ALS)'],['sod1','SOD1-ALS'],['fus','FUS-ALS'] ],
 cap:{tdp:'Schematic, not to scale. Shares in the bars are drawn, not measured.',
      sod1:'Schematic. In SOD1-ALS TDP-43 stays in the nucleus, so its STMN2 job is drawn as normal.',
      fus:'Schematic. In FUS-ALS TDP-43 stays in the nucleus; the drawing stops at the FUS inclusions.'},
 tdpLoc:'TDP-43 location',fusLoc:'FUS location',stmnBar:'stathmin-2 protein',sodBar:'misfolded SOD1',
 nucW:'nucleus',cytW:'cytoplasm',
 loc:{hi:'mostly in the nucleus',mid:'leaving the nucleus',lo:'mostly in the cytoplasm'},
 lvl:{normal:'normal',falling:'falling',low:'low',none:'none',rising:'rising',high:'high'},
 NUC:'NUCLEUS',CYT:'CYTOPLASM',pore:'nuclear pore',sg:'stress granule',
 incl:{tdp:'pTDP-43 inclusion',sod1:'SOD1 inclusion',fus:'FUS inclusion'},
 tox:'blocks nuclear import',
 axon:'axon',axonSlow:'axon: transport slows',cone:'growth cone',coneOk:'extending',coneR:'retracting',
 strip:'STMN2 pre-mRNA',stripSub:'made in the nucleus',tdpB:'TDP-43',tdpGone:'no TDP-43',ce:'cryptic exon',
 mature:'mature mRNA',full:'full length: stathmin-2 made',cut:'cut short: no stathmin-2',polyA:'AAAA',
 ex1:'1',ex2a:'2a',ex2:'2',more:'…',unc:'UNC13A protein (synapse)',
 key:{tdp:'TDP-43',sg:'stress granule',P:'phosphate',Ub:'ubiquitin',imp:'import factor',sodN:'SOD1',sodM:'misfolded SOD1',fus:'FUS'},
 sodState:{native:'folded dimer',split:'coming apart',mis:'misfolded',agg:'in inclusions'},
 stmnState:{full:'full length',cut:'cryptic exon in'},
 state:{
  tdp:(loc,stmn,cone)=>`TDP-43: <b>${loc}</b> · STMN2 mRNA: <b>${stmn}</b> · growth cone: <b>${cone}</b>`,
  sod1:(loc,sod,cone)=>`TDP-43: <b>${loc}</b> · SOD1: <b>${sod}</b> · growth cone: <b>${cone}</b>`,
  fus:(loc,fus)=>`TDP-43: <b>${loc}</b> · FUS: <b>${fus}</b>`
 },
 dom:{title:'TDP-43, 414 amino acids',ntd:'N-terminal',rrm1:'RRM1',rrm2:'RRM2',ctd:'C-terminal low-complexity',ctdS:'C-terminal',
  nls:'NLS 82–98',nes:'NES 239–250',r1:'1–102',r2:'104–176',r3:'192–262',r4:'274–414',qn:'Q/N-rich 345–366',gly:'Gly-rich 366–414',
  mut:'over 40 ALS mutations in this domain',P:'P',
  role:['Highlighted: N-terminal domain (dimer) and NLS (the signal for entry into the nucleus)',
        'Highlighted: RRM1 and RRM2, the motifs that bind RNA',
        'Highlighted: the low-complexity tail, which drives phase separation',
        'Highlighted: the NLS, and the C-terminal tail where phosphorylation sites cluster',
        'Highlighted: RRM1 and RRM2, whose nuclear job is lost',
        'Highlighted: the C-terminal tail, cut into 18–26 kDa fragments in inclusions'],
  ref:'TDP-43 shown for reference: it keeps its normal domains and place in this form.'}
};
const TD_SPR={
 btn:n=>`Stage ${n}`,code:(n,i)=>`${n}${'abcd'[i]}`,kick:(n,m)=>`Stage ${n} of ${m}`,head:n=>`Stage ${n}`,
 regions:[
  {s:1,n:'Agranular motor cortex',p:[175,54]},
  {s:1,n:'Brainstem motor nuclei (V, VII, X–XII)',p:[222,252]},
  {s:1,n:'Spinal alpha-motor neurons',p:[224,300]},
  {s:2,n:'Prefrontal cortex (middle frontal gyrus)',p:[95,78]},
  {s:2,n:'Reticular formation',p:[220,228]},
  {s:2,n:'Precerebellar nuclei',p:[230,276]},
  {s:2,n:'Red nucleus',p:[216,204]},
  {s:3,n:'Prefrontal cortex (gyrus rectus, orbital gyri)',p:[64,170]},
  {s:3,n:'Postcentral cortex',p:[209,60]},
  {s:3,n:'Striatum',p:[150,135]},
  {s:4,n:'Anteromedial temporal lobe, with hippocampus',p:[135,204]}
 ],
 stages:[
  {t:'Motor system first',txt:'The 6 stage-1 cases had pTDP-43 in the agranular motor cortex, the brainstem motor nuclei of cranial nerves V, VII and X–XII, and spinal alpha-motor neurons: the upper and lower motor neurons of ALS. <sup class="c" data-ref="Brettschneider2013" title="Source 73">73</sup>',
   pt:'The clumps show up first in the nerve cells that control movement.'},
  {t:'Prefrontal cortex and brainstem',txt:'Stage 2 adds the prefrontal neocortex (middle frontal gyrus), the reticular formation, the precerebellar nuclei and the red nucleus. <sup class="c" data-ref="Brettschneider2013" title="Source 73">73</sup>',
   pt:'Next, parts of the front of the brain and more of the brainstem are involved.'},
  {t:'Orbital prefrontal, postcentral and striatum',txt:'Stage 3 adds prefrontal cortex in the gyrus rectus and orbital gyri, then the postcentral neocortex and the striatum. The authors suggest the frontal spread could underlie difficulties with planning and judgement (executive function). <sup class="c" data-ref="Brettschneider2013" title="Source 73">73</sup>',
   pt:'Areas that help with planning and judgement can now be affected.'},
  {t:'Temporal lobe and hippocampus',txt:'Stage 4 adds the anteromedial temporal lobe, including the hippocampus. The authors read the sequence as consistent with spread along axonal pathways; that reading is a hypothesis. In the clinic, weakness also usually starts in one place and spreads to neighbouring regions. <sup class="c" data-ref="Brettschneider2013,Ravits2009,Feldman2022" title="Source 73,180,445">73,180,445</sup>',
   pt:'Last, a memory area deep in the side of the brain is reached.',
   hook:'Brettschneider stages: 1 motor cortex, brainstem and spinal motor neurons; 2 prefrontal and brainstem; 3 orbital, postcentral, striatum; 4 temporal lobe and hippocampus. <sup class="c" data-ref="Brettschneider2013" title="Source 73">73</sup>'}
 ]
};
inits.tdp43=()=>{
  const svg=$('#tdSvg'),dom=$('#tdDom'),rg=$('#tdT');let mode='tdp';
  const P2=(a,b,c,u)=>u<.5?[lerp(a[0],b[0],u*2),lerp(a[1],b[1],u*2)]:[lerp(b[0],c[0],u*2-1),lerp(b[1],c[1],u*2-1)];
  const EP=(e,a,k=1)=>[e.cx+e.rx*k*Math.cos(a),e.cy+e.ry*k*Math.sin(a)];
  const CW={xs:5.8,sm:6.7,lbl:7.8};
  const tw=(s,c='xs')=>String(s).length*CW[c];
  /* wrap a label into tspans no wider than w (approximate widths, so translations rewrap themselves) */
  function wrapLines(s,w,c='xs'){const max=Math.max(8,Math.floor(w/CW[c]));const out=[];let line='';
    String(s).split(' ').forEach(wd=>{if(line&&(line+' '+wd).length>max){out.push(line);line=wd}else line=line?line+' '+wd:wd});if(line)out.push(line);return out}
  function wrapT(x,y,s,w,c,anchor,lh,style=''){const ls=wrapLines(s,w,c);return {n:ls.length,svg:`<text x="${f1(x)}" y="${f1(y)}" class="t-${c}${anchor?' '+anchor:''}" style="${style}">${ls.map((l,i)=>`<tspan x="${f1(x)}" dy="${i?lh:0}">${l}</tspan>`).join('')}</text>`}}
  /* glyphs: SOD1 (two diamonds, metal dots) and FUS (capsule with a wavy tail); TDP-43 comes from the kit */
  function sodG(x,y,s,split,mis,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" style="opacity:${f1(o)}">`;const d=5+split*5;
    [-1,1].forEach(k=>{const c=k*d;
      if(mis>.5)g+=`<path d="M${f1(c-5)} -3 l4 -3.5 l5.5 2 l.5 5 l-4.5 4 l-5 -1.5z" transform="rotate(${f1(k*25*mis)} ${f1(c)} 0)" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.3;stroke-linejoin:round"/>`;
      else g+=`<rect x="${f1(c-4.2)}" y="-4.2" width="8.4" height="8.4" rx="1.6" transform="rotate(45 ${f1(c)} 0)" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:1.3"/>`;
      if(split<1)g+=`<circle cx="${f1(c)}" cy="0" r="1.7" style="fill:var(--warn);opacity:${f1(1-split)}"/>`});
    return g+'</g>'}
  function fusG(x,y,s,mis,o=1){const c=mis?'var(--tdp)':'var(--steel)',f=mis?'var(--tdp-soft)':'var(--steel-soft)';
    return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" style="opacity:${f1(o)}"><rect x="-7" y="-3.8" width="13" height="7.6" rx="3.8" style="fill:${f};stroke:${c};stroke-width:1.3"/><path d="M6 0 q2.5 -3.4 5 0 t5 0" style="fill:none;stroke:${c};stroke-width:1.3"/></g>`}
  const pTag=(x,y,o=1)=>`<g style="opacity:${f1(o)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="6.5" style="fill:var(--warn);stroke:var(--panel);stroke-width:1"/><text x="${f1(x)}" y="${f1(y+3.3)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">P</text></g>`;
  const ubTag=(x,y,o=1)=>`<g style="opacity:${f1(o)}"><rect x="${f1(x-9)}" y="${f1(y-6)}" width="18" height="12" rx="3.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1"/><text x="${f1(x)}" y="${f1(y+3.3)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">Ub</text></g>`;
  const impG=(x,y,o=1)=>`<rect x="${f1(x-4)}" y="${f1(y-4)}" width="8" height="8" rx="1.5" transform="rotate(45 ${f1(x)} ${f1(y)})" style="fill:var(--steel);opacity:${f1(o)}"/>`;
  const sgG=(x,y,r,o=1)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--steel-soft);fill-opacity:.75;stroke:var(--steel);stroke-width:1.4;stroke-dasharray:4 3;opacity:${f1(o)}"/>`;
  /* the 14 TDP-43 slots in the nucleus, as fractions of its radii */
  const SLOT=[ [-.55,-.22],[-.18,-.22],[.2,-.22],[.52,-.22],[-.72,.12],[-.36,.12],[0,.12],[.36,.12],[-.55,.45],[-.18,.45],[.2,.45],[.52,.45],[-.25,.75],[.12,.75] ];
  const GA=[3,7,11],GB=[0,1,2,5,6,8,9,10,12],GC=[4,13],LOOP=7;          /* stress granule group, drained group, faint remainder */
  const FUS_SLOT=[1,3,5,9,11],FUS_A=[0,1,2],FUS_B=[3,4];
  const SG_OFF=[ [-10,-8],[-2,4],[-13,11] ];
  const PTAG=[-2.5,-.35,1.95],UBTAG=[-1.25,.85,2.85],IMP=[.1,.75,-.25];
  /* integral of ramp(x,a,b) from 0 to t: lets cargo slow smoothly as t moves */
  const iramp=(t,a,b)=>t<a?0:t<b?(t-a)*(t-a)/(2*(b-a)):(b-a)/2+(t-b);
  function keyItems(m){const K=TD_TXT.key;
    return m==='tdp'?[ ['tdp',K.tdp],['sg',K.sg],['P',K.P],['Ub',K.Ub],['imp',K.imp] ]
         :m==='sod1'?[ ['tdp',K.tdp],['sodN',K.sodN],['sodM',K.sodM],['Ub',K.Ub] ]
         :[ ['tdp',K.tdp],['fus',K.fus],['sg',K.sg] ]}
  function keyLayout(m,w){let x=0,row=0;const out=[];keyItems(m).forEach(([k,l])=>{const iw=26+tw(l,'xs');if(x>0&&x+iw>w){row++;x=0}out.push({k,l,x,row});x+=iw+14});return {items:out,rows:row+1}}
  function draw(t){
    const N0=NARROW(),KL=keyLayout(mode,N0?360:330);
    const keyY=N0?452:378,keyEnd=keyY+(KL.rows-1)*18+8;
    const nH=Math.round(keyEnd+64+8+232+12);
    const N=vb(svg,'720 460',`400 ${nH}`);
    const L=N?{bar:{x:20,y:26,w:360},cell:{cx:200,cy:215,rx:180,ry:136},nuc:{cx:135,cy:205,rx:80,ry:66},
               lNuc:[135,160],lCyt:[215,103],sg:[300,142],sgL:[300,184],inc:[292,242],incL:[255,301],
               pool:[ [50,252],[110,322] ],sod:[ [245,120],[305,128],[252,182],[335,190],[85,298] ],
               dend:[ [Math.PI+.25,18],[Math.PI-.55,16],[-1.9,14],[-1.15,14] ],
               axon:'M265 342 C265 372 250 392 220 392',ax0:220,ay:392,gF:42,gR:132,dir:-1,axL:[220,378,'t-end'],coneY:414,
               key:{x:20,y:keyY},mb:{x:20,y:keyEnd+24,w:360},st:{x:20,y:keyEnd+72,w:360,h:232}}
            :{bar:{x:24,y:26,w:360},cell:{cx:205,cy:215,rx:185,ry:140},nuc:{cx:145,cy:205,rx:80,ry:66},
               lNuc:[145,160],lCyt:[215,100],sg:[300,140],sgL:[300,182],inc:[298,245],incL:[265,304],
               pool:[ [60,250],[150,330] ],sod:[ [250,120],[312,130],[258,182],[338,190],[92,300] ],
               dend:[ [Math.PI+.25,20],[Math.PI-.5,18],[-1.9,14],[-1.2,14] ],
               axon:'M371 276 C400 320 405 395 440 395',ax0:440,ay:395,gF:688,gR:566,dir:1,axL:[448,381,''],coneY:420,
               key:{x:24,y:keyY},mb:{x:420,y:18,w:290},st:{x:420,y:75,w:290,h:232}};
    const T=TD_TXT,isT=mode==='tdp',isS=mode==='sod1',isF=mode==='fus';
    /* ---- timeline quantities ---- */
    const sgRise=ramp(t,.32,.37),sgFall=ramp(t,.52,.60);
    const harden=ramp(t,.50,.60),tox=isT?ease(ramp(t,.80,.92)):0;
    const ce=isT?ease(ramp(t,.64,.72)):0,bound=isT?1-ramp(t,.56,.66):1;
    const stmn=isT?1-.82*ramp(t,.66,.78):1,unc=isT?1-.7*ramp(t,.68,.80):1;
    const retract=isT?ease(ramp(t,.68,.86)):isS?ease(ramp(t,.84,.97)):0;
    const split=isS?ease(ramp(t,.17,.28)):0,mis=isS?ramp(t,.30,.42):0;
    const nuc=L.nuc,cell=L.cell,poreA=EP(nuc,-.45),poreB=EP(nuc,.5);
    const home=i=>[nuc.cx+SLOT[i][0]*nuc.rx,nuc.cy+SLOT[i][1]*nuc.ry];
    let s=`<defs>${marker('tdAr')}</defs>`;
    /* ---- the cell ---- */
    L.dend.forEach(([a,len])=>{const p=EP(cell,a),q=EP(cell,a,1+len/Math.max(cell.rx,cell.ry)*1.4);
      s+=`<path d="M${f1(p[0])} ${f1(p[1])} L${f1(q[0])} ${f1(q[1])}" style="stroke:var(--cell-line);stroke-width:7;stroke-linecap:round"/>`});
    s+=`<path d="${L.axon} L${f1(lerp(L.gF,L.gR,retract))} ${L.ay}" style="fill:none;stroke:var(--cell-line);stroke-width:8;stroke-linecap:round"/><path d="${L.axon} L${f1(lerp(L.gF,L.gR,retract))} ${L.ay}" style="fill:none;stroke:var(--cell);stroke-width:5;stroke-linecap:round"/>`;
    s+=`<ellipse cx="${cell.cx}" cy="${cell.cy}" rx="${cell.rx}" ry="${cell.ry}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2.2"/>`;
    const nGlow=isS?bump(t,.48,.64):isF?bump(t,.64,.80):0;
    s+=`<ellipse cx="${nuc.cx}" cy="${nuc.cy}" rx="${nuc.rx}" ry="${nuc.ry}" style="fill:var(--steel-soft);stroke:var(--nuc);stroke-width:${f1(2+2.5*nGlow)}"/>`;
    [-.45,.5,1.6,2.6,-2.1].forEach(a=>{const p=EP(nuc,a);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.6" style="fill:var(--cell);stroke:var(--nuc);stroke-width:1.4"/>`;
      if(tox>.5)s+=`<path d="M${f1(p[0]-4)} ${f1(p[1]-4)} l8 8 m0 -8 l-8 8" style="stroke:var(--tdp);stroke-width:1.8;opacity:${f1(ramp(tox,.5,.8))}"/>`});
    s+=`<text x="${L.lNuc[0]}" y="${L.lNuc[1]}" class="t-sm t-mid" style="fill:var(--nuc);font-weight:600">${T.NUC}</text><text x="${L.lCyt[0]}" y="${L.lCyt[1]}" class="t-sm t-mid">${T.CYT}</text>`;
    const pb=EP(nuc,1.6);s+=`<text x="${f1(pb[0])}" y="${f1(pb[1]+18)}" class="t-xs t-mid">${T.pore}</text>`;
    /* ---- stress granule ---- */
    const sgO=(isT||isF)?sgRise*(1-sgFall):0;
    if(sgO>0){s+=sgG(L.sg[0],L.sg[1],24,sgO);s+=`<text x="${L.sgL[0]}" y="${L.sgL[1]}" class="t-xs t-mid" style="fill:var(--steel);opacity:${f1(sgRise*(1-ramp(t,.46,.50)))}">${T.sg}</text>`}
    /* ---- inclusion (drawn under the molecules that join it) ---- */
    const incR=isS?6+16*ramp(t,.44,.6)+10*ramp(t,.6,.85):isT?6+14*harden+8*ramp(t,.60,.75)+8*tox:6+14*ramp(t,.50,.62)+10*ramp(t,.62,.85);
    const incO=isS?ramp(t,.42,.47):ramp(t,.49,.54);
    const ic=L.inc;
    if(incO>0){let d='';for(let k=0;k<11;k++){const a=k/11*Math.PI*2,rr=incR*(1+.16*Math.sin(k*2.3+1));d+=(k?'L':'M')+f1(ic[0]+Math.cos(a)*rr)+' '+f1(ic[1]+Math.sin(a)*rr)}
      s+=`<path d="${d}Z" style="fill:var(--tdp);fill-opacity:.82;stroke:var(--tdp);stroke-width:2;stroke-linejoin:round;opacity:${f1(incO)}"/>`;
      const tagO=isT?ramp(t,.61,.66):isS?ramp(t,.58,.64):0;
      if(isT)PTAG.forEach(a=>{s+=pTag(ic[0]+Math.cos(a)*(incR+2),ic[1]+Math.sin(a)*(incR+2),tagO)});
      if(isT||isS)UBTAG.forEach(a=>{s+=ubTag(ic[0]+Math.cos(a)*(incR+3),ic[1]+Math.sin(a)*(incR+3),tagO)});
      s+=`<text x="${L.incL[0]}" y="${L.incL[1]}" class="t-xs t-mid" style="fill:var(--tdp);font-weight:700;opacity:${f1(incO)}">${T.incl[mode]}</text>`;
      if(tox>0)s+=`<text x="${L.incL[0]}" y="${L.incL[1]+13}" class="t-xs t-mid" style="fill:var(--tdp);opacity:${f1(ramp(tox,.3,.7))}">${T.tox}</text>`}
    /* ---- import factors pulled into the inclusion (gain of toxicity) ---- */
    if(isT&&t>.78)IMP.forEach((a,j)=>{const p0=EP(nuc,a,1.13),u=ease(ramp(t,.82+.02*j,.9+.02*j)),ang=Math.PI+.6-j*.6,p1=[ic[0]+Math.cos(ang)*incR*.4,ic[1]+Math.sin(ang)*incR*.4];
      s+=impG(lerp(p0[0],p1[0],u),lerp(p0[1],p1[1],u),ramp(t,.78,.82))});
    /* ---- TDP-43 molecules ---- */
    let nucSum=0,tdpN=0;
    const showT=i=>!(isF&&FUS_SLOT.includes(i));
    SLOT.forEach((_,i)=>{if(!showT(i))return;tdpN++;
      const h=home(i);let p=h,o=1,w=1,agg=0;
      if(i===LOOP&&(!isT||t<.32)){const q=(t*6.25)%1,out=[poreB[0]+26,poreB[1]+16];p=P2(h,poreB,out,q<.5?q*2:2-q*2);w=1-ramp(q<.5?q*2:2-q*2,.4,.6)}
      if(isT){
        const ja=GA.indexOf(i),jb=GB.indexOf(i);
        if(ja>=0&&(i!==LOOP||t>=.32)){const u=ease(ramp(t,.33+.025*ja,.40+.025*ja)),sgp=[L.sg[0]+SG_OFF[ja][0],L.sg[1]+SG_OFF[ja][1]];
          p=P2(h,poreA,sgp,u);w=1-ramp(u,.4,.6);
          const v=ease(ramp(t,.50+.02*ja,.58+.02*ja));if(v>0){p=[lerp(sgp[0],ic[0],v),lerp(sgp[1],ic[1],v)];o=1-ramp(v,.7,1)}}
        if(jb>=0){const u=ease(ramp(t,.48+.012*jb,.54+.012*jb)),dst=[ic[0]-6+(jb%3)*5,ic[1]-5+(jb%2)*8];p=P2(h,poreB,dst,u);w=1-ramp(u,.4,.6);o=1-ramp(u,.8,1)}
        if(GC.includes(i)){o=1-.6*ramp(t,.55,.66);w=o}
      }
      nucSum+=w;
      if(o>.02)s+=tdp(p[0],p[1],1.15,o,agg)});
    /* cytoplasmic pool, always there: TDP-43 shuttles */
    L.pool.forEach(p=>{s+=tdp(p[0],p[1],1.15,1,0)});
    const share=nucSum/(tdpN+L.pool.length);
    /* ---- FUS molecules ---- */
    let fusSum=0;
    if(isF)FUS_SLOT.forEach((si,j)=>{const h=home(si);let p=h,o=1,w=1,m=0;
      const ja=FUS_A.indexOf(j),jb=FUS_B.indexOf(j);
      if(ja>=0){const sgp=[L.sg[0]+SG_OFF[ja][0],L.sg[1]+SG_OFF[ja][1]],u=ease(ramp(t,.30+.03*ja,.38+.03*ja));p=P2(h,poreA,sgp,u);w=1-ramp(u,.4,.6);m=u>.6?1:0;
        const v=ease(ramp(t,.50+.025*ja,.58+.025*ja));if(v>0){p=[lerp(sgp[0],ic[0],v),lerp(sgp[1],ic[1],v)];o=1-ramp(v,.7,1)}}
      if(jb>=0){const u=ease(ramp(t,.50+.04*jb,.60+.04*jb));p=P2(h,poreB,[ic[0]-4,ic[1]+2],u);w=1-ramp(u,.4,.6);o=1-ramp(u,.8,1);m=u>.5?1:0}
      fusSum+=w;if(o>.02)s+=fusG(p[0],p[1],1.1,m,o)});
    const fusShare=fusSum/5.6;
    /* ---- SOD1 dimers ---- */
    if(isS)L.sod.forEach((q,j)=>{const u=ease(ramp(t,.44+.03*j,.52+.03*j));const p=[lerp(q[0],ic[0],u),lerp(q[1],ic[1],u)];
      s+=sodG(p[0],p[1],1.15,split,mis,1-ramp(u,.75,1))});
    /* ---- growth cone and cargo ---- */
    const gx=lerp(L.gF,L.gR,retract),d=L.dir;
    const slowA=isS?.80:.82,slowK=isS?.75:isT?.5:0;
    const ph=(t-slowK*iramp(t,slowA,slowA+.08))*9;
    for(let k=0;k<5;k++){const q=((ph+k/5)%1+1)%1,x=lerp(L.ax0,gx-d*12,q);if((x-L.ax0)*d<6)continue;
      s+=`<circle cx="${f1(x)}" cy="${L.ay}" r="2.4" style="fill:var(--axon)"/>`}
    const fl=16*(1-.75*retract);
    [-.75,-.38,0,.38,.75].forEach(a=>{s+=`<path d="M${f1(gx)} ${L.ay} L${f1(gx+d*fl*Math.cos(a))} ${f1(L.ay+fl*Math.sin(a))}" style="stroke:var(--cell-line);stroke-width:2;stroke-linecap:round"/>`});
    s+=`<ellipse cx="${f1(gx+d*2)}" cy="${L.ay}" rx="${f1(6+3*retract)}" ry="${f1(7+2*retract)}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.8"/>`;
    const slowNow=slowK>0&&t>slowA+.04;
    s+=`<text x="${L.axL[0]}" y="${L.axL[1]}" class="t-xs ${L.axL[2]}">${slowNow?T.axonSlow:T.axon}</text>`;
    const cx=clamp(gx,N?40:0,N?400:670);
    s+=`<text x="${f1(cx)}" y="${L.coneY}" class="t-xs t-mid">${T.cone}</text><text x="${f1(cx)}" y="${L.coneY+13}" class="t-xs t-mid" style="${retract>.5?'fill:var(--tdp);font-weight:700':''}">${retract>.5?T.coneR:T.coneOk}</text>`;
    /* ---- TDP-43 location bar ---- */
    const bar=(B,title,stTxt,val,share2)=>{let g=`<text x="${B.x}" y="${B.y}" class="t-sm" style="fill:var(--ink);font-weight:600">${title}</text><text x="${B.x+B.w}" y="${B.y}" class="t-sm t-end">${stTxt}</text>`;
      g+=`<rect x="${B.x}" y="${B.y+8}" width="${B.w}" height="14" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(share2){g+=`<rect x="${B.x}" y="${B.y+8}" width="${f1(B.w*val)}" height="14" rx="7" style="fill:var(--steel)"/><rect x="${f1(B.x+B.w*val)}" y="${B.y+8}" width="${f1(B.w*(1-val))}" height="14" rx="7" style="fill:var(--tdp)"/>`;
        g+=`<text x="${B.x}" y="${B.y+36}" class="t-xs" style="fill:var(--steel)">${T.nucW}</text><text x="${B.x+B.w}" y="${B.y+36}" class="t-xs t-end" style="fill:var(--tdp)">${T.cytW}</text>`}
      else g+=`<rect x="${B.x}" y="${B.y+8}" width="${f1(B.w*val)}" height="14" rx="7" style="fill:${share2===false?'var(--steel)':'var(--tdp)'}"/>`;
      return g};
    const locK=v=>v>.7?'hi':v>.35?'mid':'lo';
    s+=bar({x:L.bar.x,y:L.bar.y-8,w:L.bar.w},T.tdpLoc,T.loc[locK(share)],share,true);
    let mbS,mbV,mbShare;
    if(isT){mbV=stmn;mbS=stmn>.95?T.lvl.normal:stmn>.45?T.lvl.falling:T.lvl.low;mbShare=false}
    else if(isS){mbV=ramp(t,.30,.6);mbS=mbV<.05?T.lvl.none:mbV<.95?T.lvl.rising:T.lvl.high;mbShare=0}
    else{mbV=fusShare;mbS=T.loc[locK(fusShare)];mbShare=true}
    s+=bar({x:L.mb.x,y:L.mb.y,w:L.mb.w},isT?T.stmnBar:isS?T.sodBar:T.fusLoc,mbS,mbV,mbShare);
    /* ---- key ---- */
    KL.items.forEach(it=>{const x=L.key.x+it.x,y=L.key.y+it.row*18;let ic2='';
      if(it.k==='tdp')ic2=tdp(x+8,y-3,1,1,0);else if(it.k==='sg')ic2=sgG(x+10,y-3,7);else if(it.k==='P')ic2=pTag(x+10,y-3);else if(it.k==='Ub')ic2=ubTag(x+10,y-3);
      else if(it.k==='imp')ic2=impG(x+10,y-3);else if(it.k==='sodN')ic2=sodG(x+10,y-3,.85,0,0);else if(it.k==='sodM')ic2=sodG(x+10,y-3,.85,.6,1);else if(it.k==='fus')ic2=fusG(x+8,y-3,1,0);
      s+=ic2+`<text x="${f1(x+26)}" y="${y}" class="t-xs">${it.l}</text>`});
    /* ---- STMN2 transcript strip ---- */
    const S=L.st,X=u=>S.x+u*S.w,ry=S.y+84,my=S.y+150;
    s+=`<rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${X(.04)}" y="${S.y+20}" class="t-lbl">${T.strip}</text><text x="${X(.04)}" y="${S.y+34}" class="t-xs">${T.stripSub}</text>`;
    const ex=(u0,u1,y,lbl,fill,stroke,dash)=>`<rect x="${f1(X(u0))}" y="${y-9}" width="${f1(X(u1)-X(u0))}" height="18" rx="3" style="fill:${fill};stroke:${stroke};stroke-width:1.5;${dash?'stroke-dasharray:3 2':''}"/><text x="${f1((X(u0)+X(u1))/2)}" y="${y+3.5}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${lbl}</text>`;
    s+=`<line x1="${f1(X(.17))}" x2="${f1(X(.79))}" y1="${ry}" y2="${ry}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=ex(.04,.17,ry,T.ex1,'var(--steel-soft)','var(--steel)');
    s+=ex(.36,.50,ry,T.ex2a,ce>.5?'var(--tdp-soft)':'var(--panel)','var(--tdp)',ce<=.5);
    s+=ex(.79,.88,ry,T.ex2,'var(--steel-soft)','var(--steel)');
    s+=`<text x="${f1(X(.94))}" y="${ry+4}" class="t-sm t-mid">${T.more}</text>`;
    const hl=isT?ramp(t,.18,.28):1,arcN=`M${f1(X(.17))} ${ry-9} C${f1(X(.17))} ${ry-46} ${f1(X(.79))} ${ry-46} ${f1(X(.79))} ${ry-9}`;
    s+=`<path d="${arcN}" style="fill:none;stroke:var(--steel);stroke-width:1.6;opacity:${f1(.3*(1-ce))}"/>`;
    s+=`<path d="${arcN}" pathLength="1" style="fill:none;stroke:var(--steel);stroke-width:2.4;stroke-dasharray:${f1(hl)} 1;opacity:${f1(1-ce)}"/>`;
    if(ce>0){s+=`<path d="M${f1(X(.17))} ${ry-9} C${f1(X(.17))} ${ry-32} ${f1(X(.36))} ${ry-32} ${f1(X(.36))} ${ry-9}" style="fill:none;stroke:var(--tdp);stroke-width:2.4;opacity:${f1(ce)}"/>`;
      s+=`<g style="opacity:${f1(ce)}"><line x1="${f1(X(.52))}" x2="${f1(X(.52))}" y1="${ry-12}" y2="${ry+12}" style="stroke:var(--tdp);stroke-width:2"/><text x="${f1(X(.54))}" y="${ry-12}" class="t-xs" style="fill:var(--tdp)">${T.polyA}</text></g>`}
    const tx=X(.23);
    s+=tdp(tx-3,ry-8,1.15,isT?.15+.85*bound:1,0);
    s+=`<text x="${f1(X(.21))}" y="${ry+24}" class="t-xs t-mid" style="${bound<.5?'fill:var(--tdp);font-weight:700':''}">${bound<.5?T.tdpGone:T.tdpB}</text>`;
    s+=`<text x="${f1(X(.36))}" y="${ry+24}" class="t-xs" style="fill:var(--tdp)">${T.ce}</text>`;
    s+=`<text x="${f1(X(.04))}" y="${my-22}" class="t-sm">${T.mature}</text>`;
    s+=`<g style="opacity:${f1(1-ce)}">${ex(.04,.17,my,T.ex1,'var(--steel-soft)','var(--steel)')}${ex(.17,.26,my,T.ex2,'var(--steel-soft)','var(--steel)')}<text x="${f1(X(.285))}" y="${my+4}" class="t-sm t-mid">${T.more}</text><text x="${f1(X(.34))}" y="${my+4}" class="t-xs" style="fill:var(--steel)">${T.full}</text></g>`;
    if(ce>0)s+=`<g style="opacity:${f1(ce)}">${ex(.04,.17,my,T.ex1,'var(--steel-soft)','var(--steel)')}${ex(.17,.31,my,T.ex2a,'var(--tdp-soft)','var(--tdp)')}<text x="${f1(X(.32))}" y="${my+4}" class="t-xs" style="fill:var(--tdp)">${T.polyA}</text><text x="${f1(X(.44))}" y="${my+4}" class="t-xs" style="fill:var(--tdp);font-weight:700">${T.cut}</text></g>`;
    const uy=S.y+192;
    s+=`<text x="${f1(X(.04))}" y="${uy}" class="t-sm">${T.unc}</text>`;
    s+=`<rect x="${f1(X(.04))}" y="${uy+10}" width="${f1(S.w*.6)}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${f1(X(.04))}" y="${uy+10}" width="${f1(S.w*.6*unc)}" height="12" rx="6" style="fill:var(--steel)"/>`;
    s+=`<text x="${f1(X(.68))}" y="${uy+20}" class="t-xs">${unc>.95?T.lvl.normal:unc>.5?T.lvl.falling:T.lvl.low}</text>`;
    svg.innerHTML=s;
    /* ---- domain map ---- */
    drawDom(t);
    /* ---- note ---- */
    const p=phaseOf(TD_STEPS[mode],t);setSt(p);
    const coneS=retract>.5?T.coneR:T.coneOk;
    let st;
    if(isT)st=T.state.tdp(T.loc[locK(share)],ce>.5?T.stmnState.cut:T.stmnState.full,coneS);
    else if(isS){const sk=t<.17?'native':t<.30?'split':t<.5?'mis':'agg';st=T.state.sod1(T.loc[locK(share)],T.sodState[sk],coneS)}
    else st=T.state.fus(T.loc[locK(share)],T.loc[locK(fusShare)]);
    $('#tdNote').innerHTML=noteHTML(TD_STEPS[mode][p])+`<p class="tdstate">${st}</p>`;
  }
  function drawDom(t){
    const N=NARROW(),W=N?400:720,x0=N?20:50,x1=N?380:690,A=a=>x0+(a-1)/(413)*(x1-x0);
    const D=TD_TXT.dom,isT=mode==='tdp',p=phaseOf(TD_STEPS[mode],t);
    const H={ntd:isT&&p===0,nls:isT&&(p===0||p===3),rrm:isT&&(p===1||p===4),ctd:isT&&(p===2||p===3||p===5)};
    const by=N?60:50,bh=22;
    const role=wrapLines(isT?D.role[p]:D.ref,N?360:620,'xs');
    const h=Math.round(by+bh+68+role.length*13);
    vb(dom,`720 ${h}`,`400 ${h}`);
    const box=(a,b,lbl,fill,on,extra='')=>`<rect x="${f1(A(a))}" y="${by}" width="${f1(A(b)-A(a))}" height="${bh}" rx="4" style="fill:${fill};stroke:${on?'var(--ink)':'var(--muted)'};stroke-width:${on?2.6:1.2};${extra}"/>`+(lbl?`<text x="${f1((A(a)+A(b))/2)}" y="${by+15}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${lbl}</text>`:'');
    let s=`<line x1="${x0}" x2="${x1}" y1="${by+bh/2}" y2="${by+bh/2}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=box(1,102,'','var(--panel-2)',H.ntd);
    s+=`<text x="${f1(A(N?42:46))}" y="${by+15}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${D.ntd}</text>`;
    s+=box(104,176,D.rrm1,'var(--steel-soft)',H.rrm);
    s+=box(192,262,D.rrm2,'var(--steel-soft)',H.rrm);
    s+=box(274,414,'','var(--tdp-soft)',H.ctd);
    s+=`<rect x="${f1(A(345))}" y="${by+1}" width="${f1(A(366)-A(345))}" height="${bh-2}" style="fill:var(--tdp);opacity:.35"/><rect x="${f1(A(366))}" y="${by+1}" width="${f1(A(414)-A(366)-1)}" height="${bh-2}" style="fill:var(--tdp);opacity:.6"/>`;
    s+=`<text x="${f1(A(N?312:330))}" y="${by+15}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${N?D.ctdS:D.ctd}</text>`;
    s+=`<rect x="${f1(A(82))}" y="${by-3}" width="${f1(A(98)-A(82))}" height="${bh+6}" rx="2" style="fill:var(--steel);opacity:${H.nls?.95:.6};stroke:${H.nls?'var(--ink)':'none'};stroke-width:2"/>`;
    s+=`<rect x="${f1(A(239))}" y="${by-3}" width="${f1(A(250)-A(239))}" height="${bh+6}" rx="2" style="fill:var(--muted);opacity:.7"/>`;
    s+=`<path d="M${f1(A(90))} ${by-4} V${by-12}" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(A(90))}" y="${by-16}" class="t-xs t-mid" style="${H.nls?'fill:var(--ink);font-weight:700':''}">${D.nls}</text>`;
    s+=`<path d="M${f1(A(244))} ${by-4} V${by-12}" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(A(244))}" y="${by-16}" class="t-xs t-mid">${D.nes}</text>`;
    if(N)s+=wrapT(x1,by-44,D.mut,x1-A(262),'xs','t-end',12,'fill:var(--tdp)').svg;
    else s+=wrapT(A(344),by-16,D.mut,A(414)-A(274)+40,'xs','t-mid',12,'fill:var(--tdp)').svg;
    if(isT&&(p===3||p===5))[380,396,410].forEach(a=>{s+=pTag(A(a),by+bh/2)});
    s+=`<text x="${f1((A(1)+A(102))/2)}" y="${by+bh+16}" class="t-xs t-mid">${D.r1}</text><text x="${f1((A(104)+A(176))/2)}" y="${by+bh+16}" class="t-xs t-mid">${D.r2}</text><text x="${f1((A(192)+A(262))/2)}" y="${by+bh+16}" class="t-xs t-mid">${D.r3}</text><text x="${f1((A(274)+A(414))/2)}" y="${by+bh+16}" class="t-xs t-mid">${D.r4}</text>`;
    s+=`<text x="${x1}" y="${by+bh+31}" class="t-xs t-end">${D.qn}</text><text x="${x1}" y="${by+bh+44}" class="t-xs t-end">${D.gly}</text>`;
    s+=`<text x="${x0}" y="${by+bh+31}" class="t-sm" style="fill:var(--ink);font-weight:600">${D.title}</text>`;
    s+=`<text x="${x0}" y="${by+bh+62}" class="t-xs" style="fill:${isT?'var(--ink)':'var(--muted)'}">${role.map((l,i)=>`<tspan x="${x0}" dy="${i?13:0}">${l}</tspan>`).join('')}</text>`;
    dom.innerHTML=s;
  }
  const stop=playWire(rg,$('#tdPlay'),draw,18000,UI.replay,'tdp43');
  let setSt=()=>{};
  function buildSteps(){const old=$('#tdSteps'),el=old.cloneNode(false);old.replaceWith(el);setSt=stepWire(el,TD_STEPS[mode],rg,draw,stop)}
  toggleRow($('#tdTog'),TD_TXT.modes,mode,v=>{mode=v;stop();buildSteps();$('#tdCap').textContent=TD_TXT.cap[mode];draw(+rg.value)});
  buildSteps();
  $('#tdCap').textContent=TD_TXT.cap[mode];
  draw(+rg.value);

  /* ---- Brettschneider staged spread ---- */
  const spr=$('#tdSpr');let stage=1;
  function drawSpread(){
    const R=TD_SPR.regions,n4=TD_SPR.stages.length;
    const N=NARROW();
    const sc=N?.98:1,ox=N?28:30,oy=N?4:4;
    const lx=N?20:380,ly0=N?332:28,lw=N?360:320;
    /* legend rows first, so the narrow height fits them */
    let rows=[],y=ly0;
    for(let st=1;st<=n4;st++){rows.push({h:true,st,y});y+=20;R.filter(r=>r.s===st).forEach(r=>{const ls=wrapLines(r.n,lw-28,'sm');rows.push({r,y,ls});y+=15*ls.length+5});y+=6}
    const H=Math.max(N?0:320,Math.round(y+4));
    const code=r=>{const same=R.filter(q=>q.s===r.s);return TD_SPR.code(r.s,same.indexOf(r))};
    vb(spr,`720 ${H}`,`400 ${H}`);
    const P=(p)=>[ox+p[0]*sc,oy+p[1]*sc];
    let s=`<g transform="translate(${ox} ${oy}) scale(${sc})">`;
    s+=`<path d="M40 150 C30 90 80 40 160 35 C240 30 300 70 310 130 C318 175 290 200 250 205 C230 230 190 235 160 225 C120 240 70 220 50 190 C40 178 40 165 40 150Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<ellipse cx="276" cy="232" rx="40" ry="25" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<path d="M204 196 C208 228 210 258 212 286 L236 286 C236 258 238 228 242 200 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<rect x="214" y="284" width="20" height="28" rx="6" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<path d="M175 37 C178 70 190 100 205 120" style="fill:none;stroke:var(--cell-line);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    s+='</g>';
    R.forEach(r=>{const [x,y2]=P(r.p),on=r.s<=stage,nw=r.s===stage;
      s+=`<circle cx="${f1(x)}" cy="${f1(y2)}" r="11" style="fill:${on?'var(--tdp)':'var(--panel)'};stroke:${nw?'var(--ink)':on?'var(--tdp)':'var(--muted)'};stroke-width:${nw?2.6:1.3}"/><text x="${f1(x)}" y="${f1(y2+3.4)}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${code(r)}</text>`});
    rows.forEach(o=>{
      if(o.h){const on=o.st<=stage;s+=`<text x="${lx}" y="${o.y+12}" class="t-lbl" style="fill:${on?'var(--ink)':'var(--muted)'}">${TD_SPR.head(o.st)}</text>`;return}
      const on=o.r.s<=stage,cy=o.y+8;
      s+=`<circle cx="${lx+10}" cy="${cy}" r="9" style="fill:${on?'var(--tdp)':'var(--panel)'};stroke:${on?'var(--tdp)':'var(--muted)'};stroke-width:1.2"/><text x="${lx+10}" y="${cy+3.2}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${code(o.r)}</text>`;
      s+=`<text x="${lx+26}" y="${cy+4}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'}">${o.ls.map((l,i)=>`<tspan x="${lx+26}" dy="${i?15:0}">${l}</tspan>`).join('')}</text>`});
    spr.innerHTML=s;
    const S=TD_SPR.stages[stage-1];
    $('#tdSprNote').innerHTML=noteHTML({k:TD_SPR.kick(stage,n4),t:S.t,txt:S.txt,pt:S.pt,hook:S.hook});
  }
  toggleRow($('#tdSprTog'),TD_SPR.stages.map((_,i)=>[String(i+1),TD_SPR.btn(i+1)]),'1',v=>{stage=+v;drawSpread()});
  drawSpread();
  const prevR=redraws.tdp43;redraws.tdp43=()=>{prevR&&prevR();drawSpread()};
};
/* =============== 1.4 genes: C9orf72, SOD1 and more =============== */
const GE_TXT={
  genes:[ ['c9','C9orf72'],['sod1','SOD1'],['tardbp','TARDBP'],['fus','FUS'] ],
  aria:{
    c9:`Animation: the GGGGCC repeat in intron 1 of C9orf72 grows from a few units to about a thousand while a dial shows the usual, disputed and expanded ranges; then a neuron shows three proposed routes to damage (less C9orf72 protein, RNA foci, dipeptide repeat proteins) converging on TDP-43 pathology.`,
    sod1:`Animation: the SOD1 copper-zinc dimer converts superoxide; an ALS variant makes the metal-free dimer split into monomers that misfold and clump into ubiquitin-tagged aggregates without TDP-43.`,
    tardbp:`Animation: TARDBP makes TDP-43; variants in its C-terminal region are marked, then TDP-43 leaves the nucleus and clumps in the cytoplasm.`,
    fus:`Animation: FUS, an RNA-binding protein of the nucleus, carries variants at its C-terminal end; the changed protein builds up in the cytoplasm as FUS inclusions, without TDP-43 clumps.`},
  c9:{title:`C9orf72 gene, chromosome 9`,band:`9p21`,unit:`GGGGCC`,unitLbl:`one repeat unit`,exon1:`exon 1`,intron:`intron 1`,later:`later exons`,more:`more units than drawn`},
  dial:{title:`Repeat units in one copy`,units:`repeat units`,zone:{good:`usual range`,warn:`disputed range`,bad:`expanded`},
    leg:{good:`under 20: usual`,warn:`20–29: disputed`,bad:`30 or more: expanded`,pt:`700–1600: first patients`,ia:`24–30: linked to ALS in one meta-analysis`,brk:`even steps up to 40, compressed above`}},
  cell:{cell:`one neuron (schematic)`,nuc:`nucleus`,cyt:`cytoplasm`,usual:`usual copy`,exp:`expanded copy`,prot1:`C9orf72 protein:`,prot2:`less is made`,foci:`RNA foci`,ribo:`ribosome`,agg:`DPR clumps`,tdp:`TDP-43`},
  routes:{title:`Three proposed routes`,r:[ [`Less C9orf72 protein`,`loss of function`],[`RNA foci`,`toxic repeat RNA, both strands`],[`Dipeptide repeat proteins`,`sense GA GP GR · antisense PR PA GP`],[`TDP-43 pathology`,`ALS, FTD or both`] ]},
  sod1:{title:`SOD1 gene, chromosome 21`,band:`21q`,a5v:`p.A5V (A4V)`,d91a:`p.D91A (D90A)`,g93a:`G93A (mouse model)`,n180:`over 180 variants reported`,
    head:[`SOD1 dimer: a copper-zinc enzyme`,`Variant: the metal-free dimer splits`,`Misfolded monomers clump`,`Clumps without TDP-43`],
    cu:`Cu`,zn:`Zn`,rx1:`superoxide`,rx2:`O₂ + H₂O₂`,variant:`variant`,apo:`metals lost (apo state)`,agg:`aggregate`,ub:`Ub`,noTdp:`no TDP-43`,target:`a separate route: SOD1 itself is the target`,
    pan:{h1:`Why a gain of function?`,ev:[ [`Knockout mice: no ALS`,`losing the enzyme is not enough`],[`G93A mice: paralysis`,`enzyme activity barely changed`],[`More or less normal SOD1`,`no change in mutant mice`],[`Homozygous p.D91A (D90A)`,`red-cell activity essentially normal`] ],
      h2:`Median survival by variant`,a5v:`p.A5V (A4V)`,oth:`other variants`,yrs:n=>`${n} years`,h3:`Pathology`,p1:`ubiquitin-positive inclusions`,p2:`no TDP-43 inclusions`}},
  pct:v=>`${v}%`,scale10:`bar scale: 0 to 10%`,
  ps:{prot:`protein`,variant:`changed protein`},
  ped:{title:`An example family with a C9orf72 expansion`,gen:[`I`,`II`,`III`],gf1:`carrier,`,gf2:`no symptoms`,aff:`ALS`,
    kids1:`each child: 50% chance of carrying it`,kids2:a=>`now aged ${a}`,
    iconsT:a=>`100 children of carrier parents, at age ${a}`,
    non:n=>`${n} without the expansion`,car:n=>`${n} carry it, no ALS or FTD yet`,aff2:n=>`${n} carry it and have ALS or FTD`,
    noPop:`UK Biobank gives a figure for age 80 only`,basisF:`family-based curve`,basisP:`UK Biobank, ALS or dementia by 80`,
    chart:`Penetrance: share of carriers affected`,ageAx:`age (years)`,p35:`none before 35`,p58:`50% by 58`,p83:`99.5% by 83`,
    ukb1:`66%`,ukb2:`58%`,legF:`family-based: dots published, line interpolated`,legP:`UK Biobank: by 80, and allowing for other deaths`,
    r1:`chance a child inherits the expansion`,r2:a=>`share of carriers affected by age ${a}`,r3:a=>`chance of ALS or FTD by age ${a}`,
    about:n=>`about ${n}%`,exact:n=>`${n}%`,none:`no figure`,
    nPub:`published point`,nInt:`interpolated between published points`,nPop80:`29% if deaths from other causes are allowed for`,nPopNo:`UK Biobank reports age 80 only`,
    eq:`child's chance = 50% × penetrance at that age`,
    vt:(a,st)=>`Age ${a}: ${st}`},
  anc:{opts:[ ['eu','Europe'],['as','Asia'] ],fam:v=>`familial ALS: ${v}%`,spo:v=>`sporadic ALS: ${v}%`}
};
const GE_STEPS={
 c9:[
  {from:0,at:.06,k:`Step 1 · Normal`,t:`A short GGGGCC repeat`,
   txt:`<i>C9orf72</i> sits on chromosome 9p21. Its first intron carries a run of the six DNA letters GGGGCC. In the discovery paper controls had 2 to 23 units; the second discovery paper split alleles into wild-type (fewer than 20) and expanded (more than 30), with controls averaging 2. <sup class="c" data-ref="DeJesusHernandez2011,Renton2011" title="Source 137,448">137,448</sup>`,
   pt:`Everyone has this short stutter of six DNA letters in the <i>C9orf72</i> gene. In most people it repeats only a few times.`,
   hook:`The <i>C9orf72</i> expansion is a <b>noncoding GGGGCC hexanucleotide repeat in intron 1</b>, on 9p21. <sup class="c" data-ref="DeJesusHernandez2011,Renton2011" title="Source 137,448">137,448</sup>`},
  {from:.2,at:.36,k:`Step 2 · Expansion`,t:`Hundreds to thousands of repeats`,
   txt:`In carriers the repeat has grown to hundreds or thousands of units: Southern blotting estimated about 700–1600 in the first patients measured. All 262 carriers haplotyped in a 2012 screen shared the Finnish founder haplotype, pointing to one expansion event about 1500 years ago. Repeat size varies between tissues and over time, yet blood DNA is judged enough for testing. <sup class="c" data-ref="DeJesusHernandez2011,Majounie2012,Roggenbuck2023" title="Source 137,313,453">137,313,453</sup> <span class="tag warn">Controversy</span> Alleles of 20–29 have contradictory evidence, and the 2023 consensus says no validated cut-off exists; a meta-analysis linked 24–30 to ALS and proposed 24 or more as pathogenic. <sup class="c" data-ref="Roggenbuck2023,Iacoangeli2019" title="Source 241,453">241,453</sup>`,
   pt:`In people with the expansion, the stutter repeats hundreds or thousands of times. The middle range, 20 to 29, is a grey zone that experts still disagree about.`,
   hook:`Commonest genetic cause of ALS and FTD in European ancestry: in white patients, 39.3% of familial and 7.0% of sporadic ALS; none of 360 sporadic cases from Asia and the Pacific. <sup class="c" data-ref="Majounie2012" title="Source 313">313</sup>`},
  {from:.4,at:.48,k:`Step 3 · Route 1`,t:`Less C9orf72 protein`,
   txt:`The expanded copy yields less of one <i>C9orf72</i> transcript, so less C9orf72 protein is made: loss of function through haploinsufficiency. <sup class="c" data-ref="DeJesusHernandez2011,Balendra2018" title="Source 35,137">35,137</sup> <span class="ev est">Established</span> finding: the reduced transcript. <span class="ev hyp">Hypothesis</span> how much this loss drives disease; it is one of three proposed mechanisms, and processes inside and outside the neuron probably both contribute. <sup class="c" data-ref="Balendra2018" title="Source 35">35</sup>`,
   pt:`The long repeat gets in the way, so the cell makes less of the normal C9orf72 protein.`,
   hook:`Three proposed <i>C9orf72</i> mechanisms: <b>loss of function</b>, <b>toxic repeat RNA</b>, <b>toxic dipeptide repeat proteins</b>. <sup class="c" data-ref="Balendra2018" title="Source 35">35</sup>`},
  {from:.55,at:.63,k:`Step 4 · Route 2`,t:`RNA foci in the nucleus`,
   txt:`The repeat is read in both directions, and repeat RNA from each strand (GGGGCC sense, GGCCCC antisense) gathers into nuclear foci: a toxic gain of function by RNA. <sup class="c" data-ref="DeJesusHernandez2011,Zu2013,Balendra2018" title="Source 35,137,556">35,137,556</sup> <span class="ev est">Established</span> foci are seen in patient tissue. <span class="ev hyp">Hypothesis</span> one proposed way they harm the cell, drawn here, is by holding RNA-binding proteins away from their normal work.`,
   pt:`Copies of the repeat message pile up in the nucleus as little clumps, which may soak up proteins the cell needs.`,
   hook:`RNA foci come from <b>both</b> strands: sense GGGGCC and antisense GGCCCC. <sup class="c" data-ref="Zu2013" title="Source 556">556</sup>`},
  {from:.68,at:.78,k:`Step 5 · Route 3`,t:`Dipeptide repeat proteins`,
   txt:`Repeat RNA is translated without a start codon (repeat-associated non-ATG, or RAN, translation) in every reading frame. The sense strand gives poly-GA, poly-GP and poly-GR; the antisense strand gives poly-PR, poly-PA and poly-GP. They aggregate in frontal and motor cortex, hippocampus and spinal cord, and most inclusions contain poly-GA. <sup class="c" data-ref="Mori2013,Zu2013" title="Source 349,556">349,556</sup> <span class="ev est">Established</span> in patient tissue; <span class="ev hyp">Hypothesis</span> how much each one contributes.`,
   pt:`The cell's protein-making machinery reads the repeat even though it should not, and makes short, sticky two-letter protein chains that clump.`,
   hook:`RAN translation: protein made <b>without a start codon</b>, giving <b>six</b> dipeptide repeat proteins from the two strands. <sup class="c" data-ref="Zu2013,Mori2013" title="Source 349,556">349,556</sup>`},
  {from:.84,at:.94,k:`Step 6 · Where the routes meet`,t:`TDP-43 pathology: ALS, FTD or both`,
   txt:`<i>C9orf72</i> cases, like most ALS, show TDP-43 pathology. <sup class="c" data-ref="DeJesusHernandez2011,Neumann2006" title="Source 137,392">137,392</sup> Carriers can develop ALS, FTD or both. In an Irish population cohort, carriers had earlier onset (mean 56.3 vs 61.3 years), more FTD (50% vs 12%) and shorter survival (20 vs 26 months; hazard ratio 1.9), and 86% had a family history of ALS or FTD. <sup class="c" data-ref="Byrne2012" title="Source 87">87</sup> Psychotic and other psychiatric symptoms are more common in carriers, though the expansion "does not appear to directly cause" primary psychiatric disorders. <sup class="c" data-ref="Silverman2019" title="Source 473">473</sup> More in <a href="#tdp43" data-go="tdp43">TDP-43 and what goes wrong</a>.`,
   pt:`All three routes end in the same protein trouble seen in most ALS. The same gene change can affect movement, thinking and behaviour, or both.`,
   hook:`<i>C9orf72</i> joins ALS and FTD: 24.8% of white Europeans with familial FTD carried the expansion. <sup class="c" data-ref="Majounie2012" title="Source 313">313</sup>`}
 ],
 sod1:[
  {from:0,at:.08,k:`Step 1 · The normal enzyme`,t:`A copper-zinc dimer`,
   txt:`<i>SOD1</i> was the first ALS gene: in 1993, linkage to chromosome 21q led to 11 different <i>SOD1</i> missense mutations in 13 families. The enzyme is a cytosolic copper-zinc homodimer that converts superoxide into oxygen and hydrogen peroxide. <sup class="c" data-ref="Rosen1993" title="Source 456">456</sup> Over 180 variants have now been reported across the gene; reliable evidence of pathogenicity exists for only some. <sup class="c" data-ref="OpieMartin2022" title="Source 410">410</sup>`,
   pt:`SOD1 is a clean-up enzyme made of two matching halves. It holds copper and zinc and neutralises a harmful form of oxygen.`,
   hook:`<i>SOD1</i>: the <b>first ALS gene (1993)</b>, on chromosome 21q. <sup class="c" data-ref="Rosen1993" title="Source 456">456</sup>`},
  {from:.25,at:.4,k:`Step 2 · A variant`,t:`The metal-free dimer comes apart`,
   txt:`Five ALS-linked mutants (A4V, C6F, D90A, G93A, G93C) all made the metal-free (apo) protein much less stable, and the greater the loss of stability, the shorter the survival of people carrying it. Oxidised normal and mutant SOD1 both split from dimers into monomers before aggregating. <sup class="c" data-ref="Lindberg2002,Rakhit2004" title="Source 293,443">293,443</sup> <span class="ev early">Early evidence</span> from laboratory protein studies. Names: modern numbering counts the first methionine, so legacy A4V is p.A5V and D90A is p.D91A. <sup class="c" data-ref="OpieMartin2022" title="Source 410">410</sup>`,
   pt:`A changed SOD1 is wobbly, especially before it picks up its metals, and the two halves fall apart.`,
   hook:`Legacy and HGVS names: <b>A4V = p.A5V</b>, <b>D90A = p.D91A</b>. Same variants, different counting. <sup class="c" data-ref="OpieMartin2022" title="Source 410">410</sup>`},
  {from:.5,at:.66,k:`Step 3 · Misfolding`,t:`Misfolded monomers clump: a toxic gain`,
   txt:`Mice carrying human G93A SOD1, a change with little effect on enzyme activity, lost motor neurons and died by 5–6 months. <sup class="c" data-ref="Gurney1994" title="Source 215">215</sup> Mice with no SOD1 at all developed normally, with no overt motor deficit by 6 months. <sup class="c" data-ref="Reaume1996" title="Source 447">447</sup> Adding or removing normal SOD1 did not change disease in mutant mice, and SOD1 aggregates were common to different mutants. <sup class="c" data-ref="Bruijn1998" title="Source 81">81</sup> People homozygous for D90A had essentially normal red-cell enzyme activity. <sup class="c" data-ref="Andersen1995" title="Source 18">18</sup> <span class="ev est">Established</span> in animal models.`,
   pt:`The problem is not too little enzyme. The bent protein itself does harm.`,
   hook:`<i>SOD1</i>-ALS is a <b>toxic gain of function</b>, not a loss of enzyme activity. <sup class="c" data-ref="Bruijn1998,Reaume1996" title="Source 81,447">81,447</sup>`},
  {from:.75,at:.9,k:`Step 4 · A separate path`,t:`Inclusions without TDP-43`,
   txt:`None of 15 <i>SOD1</i> cases had TDP-43 inclusions, although they had ubiquitin-positive ones, so <i>SOD1</i>-ALS "may not be the familial counterpart of sporadic ALS". <sup class="c" data-ref="Mackenzie2007" title="Source 309">309</sup> Survival depends on the variant: median 1.2 years with A4V against 6.8 years with other variants in North America. <sup class="c" data-ref="Bali2017" title="Source 36">36</sup> Homozygous D90A starts in the legs and spreads slowly (mean survival 13 years in 11 people who had died, which the authors call probably biased low). <sup class="c" data-ref="Andersen1996" title="Source 19">19</sup> Onset and duration are "decoupled": mean onset 48.9 vs 61.1 years, median duration 27.7 vs 35.1 months, or 45 months without p.A5V. <sup class="c" data-ref="OpieMartin2022" title="Source 410">410</sup> Because the pathway is gene-defined, SOD1 itself is a target: tofersen lowered CSF SOD1 and neurofilament light in VALOR but missed its primary end point. <sup class="c" data-ref="Miller2022" title="Source 335">335</sup> See <a href="#tofersen" data-go="tofersen">Tofersen, gene-targeted</a>.`,
   pt:`In SOD1-ALS the clumps are made of SOD1, not TDP-43. That is why a drug that lowers SOD1 could be tested.`,
   hook:`<i>SOD1</i>-ALS: <b>no TDP-43 inclusions</b>, unlike most ALS. p.A5V (A4V): median survival <b>1.2 years</b> against 6.8 with other variants. <sup class="c" data-ref="Mackenzie2007,Bali2017" title="Source 36,309">36,309</sup>`}
 ],
 tardbp:[
  {from:0,at:.08,k:`Step 1 · The protein`,t:`TARDBP makes TDP-43`,
   txt:`TDP-43 is the protein found in the inclusions of most ALS, identified in 2006. <sup class="c" data-ref="Neumann2006" title="Source 392">392</sup> In 2008, mutations in its gene, <i>TARDBP</i>, were found in sporadic and familial ALS, in a conserved region of the protein. <sup class="c" data-ref="Sreedharan2008" title="Source 483">483</sup>`,
   pt:`This gene makes TDP-43, the same protein that clumps in most people with ALS, with or without a gene change.`,
   hook:`<i>TARDBP</i> encodes <b>TDP-43</b>: the gene behind the protein seen in most ALS. <sup class="c" data-ref="Sreedharan2008,Neumann2006" title="Source 392,483">392,483</sup>`},
  {from:.33,at:.45,k:`Step 2 · Variants`,t:`Changes in the C-terminal region`,
   txt:`M337V segregated with disease in a family linked to chromosome 1p36. <sup class="c" data-ref="Sreedharan2008" title="Source 483">483</sup> Variants cluster in the C-terminal region, and A382T is frequent in Sardinia because of a founder effect; <i>TARDBP</i> families can have ALS or FTD. <sup class="c" data-ref="Renton2014" title="Source 449">449</sup> In Europe, 4.2% of familial and 0.8% of sporadic ALS carry a <i>TARDBP</i> variant, and the 2023 consensus gives about 1% overall. <sup class="c" data-ref="Zou2017,Roggenbuck2023" title="Source 453,555">453,555</sup>`,
   pt:`Most changes sit in the tail end of the protein.`,
   hook:`Founder variant: <b>A382T</b> in Sardinia. <sup class="c" data-ref="Renton2014" title="Source 449">449</sup>`},
  {from:.66,at:.85,k:`Step 3 · Pathology`,t:`TDP-43 leaves the nucleus and clumps`,
   txt:`As in most ALS, TDP-43 builds up outside the nucleus as inclusions; all <i>SOD1</i>-negative familial cases in one pathology series had TDP-43-positive inclusions. <sup class="c" data-ref="Mackenzie2007" title="Source 309">309</sup> ClinGen rates <i>TARDBP</i> as definitively linked to ALS. <sup class="c" data-ref="ClinGen2026" title="Source 116">116</sup> The step-by-step story is in <a href="#tdp43" data-go="tdp43">TDP-43 and what goes wrong</a>.`,
   pt:`The changed protein moves out of the cell's control centre and sticks together in the rest of the cell.`,
   hook:`Every minimum test panel includes four genes: <i>C9orf72</i>, <i>SOD1</i>, <i>FUS</i> and <i>TARDBP</i>. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup>`}
 ],
 fus:[
  {from:0,at:.08,k:`Step 1 · The protein`,t:`FUS, an RNA-binding protein`,
   txt:`<i>FUS</i> lies on chromosome 16; 13 mutations specific to familial ALS were reported in 2009. <sup class="c" data-ref="Kwiatkowski2009" title="Source 279">279</sup> FUS normally works mostly in the nucleus, handling RNA.`,
   pt:`FUS is a helper protein that works with the cell's messages, mostly inside the nucleus.`,
   hook:`<i>FUS</i>: chromosome 16, reported as an ALS gene in 2009. <sup class="c" data-ref="Kwiatkowski2009" title="Source 279">279</sup>`},
  {from:.33,at:.45,k:`Step 2 · Variants`,t:`Changes at the C-terminal end`,
   txt:`In a genotype-phenotype meta-analysis, 90% of <i>FUS</i> mutations lay in the C-terminal domain and median onset was 39 years (range 11–80). P525L and truncating or frameshift variants most often caused juvenile onset and rapid progression, often without a family history; R521 variants were linked to later onset and a pure spinal form. <sup class="c" data-ref="Naumann2019" title="Source 356">356</sup> An 11-year-old with a de novo P525L variant needed a tracheostomy 14 months after onset. <sup class="c" data-ref="Conte2012" title="Source 117">117</sup>`,
   pt:`Most changes sit at the very end of the protein. Some cause ALS in teenagers and young adults.`,
   hook:`Young person, no family history, fast course: <b><i>FUS</i></b> (P525L, often de novo). <sup class="c" data-ref="Naumann2019,Hubers2015" title="Source 238,356">238,356</sup>`},
  {from:.66,at:.85,k:`Step 3 · Pathology`,t:`FUS builds up in the cytoplasm`,
   txt:`Mutant FUS accumulated in the cytoplasm of neurons. <sup class="c" data-ref="Kwiatkowski2009" title="Source 279">279</sup> <i>FUS</i> cases show FUS-positive inclusions without TDP-43-positive aggregates, though "some debate remains". <sup class="c" data-ref="Renton2014" title="Source 449">449</sup> Share of ALS: Europe 2.8% of familial and 0.3% of sporadic; Asia 6.4% and 0.9%. <sup class="c" data-ref="Zou2017" title="Source 555">555</sup> Among 14 people with sporadic ALS starting before 35, 6 carried a <i>FUS</i> variant, and in all 5 families tested it was new in the child. <sup class="c" data-ref="Hubers2015" title="Source 238">238</sup>`,
   pt:`The changed FUS stays outside the nucleus and clumps. Here the clumps are FUS, not TDP-43.`,
   hook:`<i>FUS</i>-ALS: <b>FUS inclusions, not TDP-43</b> (some debate). <sup class="c" data-ref="Renton2014" title="Source 449">449</sup>`}
 ]
};
/* TARDBP and FUS share one drawing: a protein bar with variant pins, a neuron, a facts panel */
const GE_PS={
 tardbp:{title:`TARDBP (chromosome 1p36) makes TDP-43`,glyph:'tdp',
  seg:[ [0,.2,`N-terminal`,'var(--panel-2)'],[.24,.42,`RRM1`,'var(--steel-soft)'],[.45,.63,`RRM2`,'var(--steel-soft)'],[.67,1,`C-terminal region`,'var(--tdp-soft)'] ],
  pins:[ [.81,`M337V`,-1],[.92,`A382T`,-1] ],note:`variants cluster in the C-terminal region`,
  prot:`TDP-43`,agg:`TDP-43 clumps`,
  pan:{h1:`Share of ALS, 2017 meta-analysis`,bars:[ [`Europe, familial`,4.2],[`Europe, sporadic`,.8] ],h2:`Notes`,
   lines:[`about 1% of ALS overall`,`(2023 US consensus)`,`seen in ALS and FTD families`,`A382T: Sardinian founder`,`ClinGen: Definitive`]}},
 fus:{title:`FUS (chromosome 16) makes FUS`,glyph:'fus',
  seg:[ [0,.38,`N-terminal region`,'var(--panel-2)'],[.42,.66,`RNA-binding`,'var(--steel-soft)'],[.7,1,`C-terminal end`,'var(--tdp-soft)'] ],
  pins:[ [.99,`R521`,-1],[.998,`P525L`,1] ],note:`C-terminal domain: 90% of variants`,
  prot:`FUS`,agg:`FUS inclusions`,noTdp:`no TDP-43`,
  pan:{h1:`Share of ALS, 2017 meta-analysis`,bars:[ [`Europe, familial`,2.8],[`Europe, sporadic`,.3],[`Asia, familial`,6.4],[`Asia, sporadic`,.9] ],h2:`Notes`,
   lines:[`median onset 39 years`,`(range 11–80)`,`P525L: juvenile, rapid,`,`often new in the child (de novo)`,`R521: later onset, spinal`,`FUS inclusions, no TDP-43`,`(some debate remains)`]}}
};
/* the age slider runs 30 to 85; steps sit on the published ages */
const GE_PDS=[
 {from:0,at:0,k:`Age 30 · Inheritance`,t:`A 50:50 chance for each child`,
  txt:`"Each child of an individual with C9orf72-FTD/ALS has a 50% chance of inheriting" the expansion. Almost everyone with <i>C9orf72</i> disease inherited it from a parent, who may be unaffected because penetrance is age-dependent and reduced, as with the grandfather here. <sup class="c" data-ref="GossyeGeneReviews" title="Source 213">213</sup>`,
  pt:`Each child has a 1 in 2 chance of getting the changed copy. Getting it is not the same as getting ALS.`,
  hook:`A child of a carrier has a <b>50% chance of inheriting</b> the expansion, but a lower chance of ALS or FTD: <b>50% × penetrance</b> at that age. By 80 that is close to 50% with family-based figures and about 29–33% with UK Biobank figures (arithmetic from the cited numbers, not a published risk). <sup class="c" data-ref="GossyeGeneReviews,Majounie2012,Gao2025" title="Source 193,213,313">193,213,313</sup>`},
 {from:.07,at:.0909,k:`Age 35 · Early adulthood`,t:`Before 35: no carriers affected`,
  txt:`In a Kaplan-Meier analysis of 603 carriers, the expansion was non-penetrant before age 35. <sup class="c" data-ref="Majounie2012" title="Source 313">313</sup> The family-based curve stays flat until then.`,
  pt:`In the big family studies, nobody with the expansion became ill before 35.`,
  hook:`<i>C9orf72</i> penetrance: <b>0 before 35, 50% by 58</b>, almost complete by 80 in family-based data. <sup class="c" data-ref="Majounie2012" title="Source 313">313</sup>`},
 {from:.4,at:.5091,k:`Age 58 · Midlife`,t:`By 58: half of carriers`,
  txt:`The same analysis found 50% penetrance by 58. A 2017 pooled analysis of 1,170 carriers gave a median onset of 58.0 years (95% CI 57.0–59.0), the same in familial and sporadic cases; women, especially with bulbar onset, started later. <sup class="c" data-ref="Majounie2012,Murphy2017" title="Source 313,354">313,354</sup> So at 58, about 1 child in 4 of a carrier parent would be affected on these figures.`,
  pt:`By about 58, half of the people who carry the expansion have developed symptoms in these studies.`,
  hook:`Median onset with <i>C9orf72</i>: <b>58 years</b>. <sup class="c" data-ref="Murphy2017" title="Source 354">354</sup>`},
 {from:.8,at:.9091,k:`Age 80 · The controversy`,t:`By 80: nearly all, or about two-thirds?`,
  txt:`<span class="tag warn">Controversy</span> Family and clinic data give near-complete penetrance: "almost fully penetrant by 80", or 99.5% by 83 in the pooled analysis (90.9% if 20% of carriers are assumed never to show symptoms). <sup class="c" data-ref="Majounie2012,Murphy2017" title="Source 313,354">313,354</sup> In UK Biobank, 701 of 490,331 people had more than 100 repeats; by 80, 66% (95% CI 57–73%) had ALS or dementia against 5.8% of matched controls, or 58% (50–64%) allowing for death from other causes. <sup class="c" data-ref="Gao2025" title="Source 193">193</sup> The authors name family-based cohorts as a possible source of bias; the 2023 consensus describes <i>C9orf72</i> as carrying "much lower disease risk" than some <i>SOD1</i> and <i>FUS</i> variants. <sup class="c" data-ref="Gao2025,Roggenbuck2023" title="Source 193,453">193,453</sup>`,
  pt:`Studies of affected families say nearly every carrier becomes ill by 80. A study of half a million ordinary volunteers says about two in three. Families with many cases may make the gene look stronger than it is.`,
  hook:`Penetrance estimates depend on how carriers were found: <b>families</b> (near 100% by 80–83) versus a <b>population cohort</b> (58–66% by 80). <sup class="c" data-ref="Murphy2017,Gao2025" title="Source 193,354">193,354</sup>`}
];
const GE_ANC={
 eu:{rows:[ ['C9orf72',33.7,5.1],['SOD1',14.8,1.2],['TARDBP',4.2,.8],['FUS',2.8,.3] ],
  k:`Europe`,t:`C9orf72 leads`,
  txt:`In European studies <i>C9orf72</i> is the largest single cause, then <i>SOD1</i>. <sup class="c" data-ref="Zou2017" title="Source 555">555</sup> In Finland the expansion explained 46.0% of familial and 21.1% of sporadic ALS; together with <i>SOD1</i> D90A, 87% of Finnish familial ALS had a single-gene cause. <sup class="c" data-ref="Renton2011" title="Source 448">448</sup> In an Irish DNA bank it was 41% of familial and 5% of sporadic ALS. <sup class="c" data-ref="Byrne2012" title="Source 87">87</sup>`},
 as:{rows:[ ['C9orf72',2.3,.3],['SOD1',30.0,1.5],['TARDBP',1.5,.2],['FUS',6.4,.9] ],
  k:`Asia`,t:`SOD1 leads`,
  txt:`In Asian studies <i>SOD1</i> is the commonest cause, followed by <i>FUS</i>, <i>C9orf72</i> and <i>TARDBP</i>; the authors call the genetic architecture "distinct". <sup class="c" data-ref="Zou2017" title="Source 555">555</sup> None of 360 people with sporadic ALS from Asia or the Pacific Islands carried the <i>C9orf72</i> expansion in one screen. <sup class="c" data-ref="Majounie2012" title="Source 313">313</sup> <i>C9orf72</i> is rarer in Japan than in Europe, while <i>OPTN</i> variants show the reverse pattern. <sup class="c" data-ref="Renton2014" title="Source 449">449</sup>`}
};
const GE_RES=[
 {id:'p',n:`Pathogenic`,tag:'bad',h:`Pathogenic variant`,
  d:[ [`What the consensus says`,`People should be told that results may be "positive, negative, or uncertain". A pathogenic or likely pathogenic result usually does not predict how the illness will run. Counselling should convey the variable and uncertain penetrance of most ALS variants: high for some <i>SOD1</i> variants (the consensus cites A5V) and some <i>FUS</i> variants, lower for others, including <i>C9orf72</i>. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup>`],
   [`For relatives`,`Relatives' risks should be discussed, and adult relatives are candidates for presymptomatic testing, "a personal choice" made with genetic counselling. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup> For a dominant variant such as the <i>C9orf72</i> expansion, each child of a carrier has a 50% chance of inheriting it. <sup class="c" data-ref="GossyeGeneReviews" title="Source 213">213</sup>`],
   [`Follow-up as published`,`People should be told about gene-targeted trials, observational studies and approved therapies. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup> For <i>SOD1</i> that includes tofersen; see <a href="#tofersen" data-go="tofersen">Tofersen, gene-targeted</a>. <sup class="c" data-ref="Miller2022" title="Source 335">335</sup>`] ]},
 {id:'lp',n:`Likely pathogenic`,tag:'tdp',h:`Likely pathogenic variant`,
  d:[ [`What the consensus says`,`The consensus groups likely pathogenic with pathogenic: either result usually does not predict the course of the illness, and the same discussion of penetrance applies. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup> In standard variant classification, "likely pathogenic" means strong evidence that stops short of the level needed for "pathogenic".`],
   [`For relatives`,`As after a pathogenic result, relatives' risks should be discussed, and adult relatives may consider presymptomatic testing with counselling. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup>`],
   [`Follow-up as published`,`Interpretations can change over time, so periodic reevaluation may be appropriate. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup>`] ]},
 {id:'vus',n:`Variant of uncertain significance (VUS)`,tag:'warn',h:`Variant of uncertain significance`,
  d:[ [`What the consensus says`,`A VUS "may or may not be contributing" to the person's ALS. Interpretations can change over time, so periodic reevaluation may be appropriate. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup> In one UK clinic, 21 of 100 consecutive people with ALS carried only a VUS on a 44-gene panel. <sup class="c" data-ref="Shepheard2021" title="Source 467">467</sup>`],
   [`For relatives`,`The consensus ties presymptomatic testing of relatives to a pathogenic or likely pathogenic result, not to a VUS. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup>`],
   [`Follow-up as published`,`As evidence accumulates a VUS can be reclassified, so the result is worth revisiting rather than treating as final. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup>`] ]},
 {id:'int',n:`Intermediate C9orf72 repeat`,tag:'warn',h:`Intermediate C9orf72 repeat`,
  d:[ [`What the consensus says`,`No validated cut-off separates pathogenic from non-pathogenic alleles, and the clinical meaning of intermediate alleles is unknown. Alleles of 20–29 repeats have contradictory evidence of association with ALS, and any risk they carry is likely lower than with long expansions. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup>`],
   [`The other side`,`<span class="tag warn">Controversy</span> A 2019 meta-analysis (5071 cases, 3747 controls) linked 24–30 repeats to ALS (odds ratio 4.2, 95% CI 1.23–14.35) and proposed that 24 or more should be considered pathogenic. <sup class="c" data-ref="Iacoangeli2019" title="Source 241">241</sup>`],
   [`Laboratory notes`,`Reports should state the sizes of the non-expanded alleles and the largest repeat number the assay can detect. Southern blot is the gold standard for sizing large expansions; repeat-primed PCR detects only about 60 repeats at most. <sup class="c" data-ref="Roggenbuck2023,Renton2011" title="Source 448,453">448,453</sup> When 14 laboratories tested the same 78 samples blind, only 50 got the same result from all of them. <sup class="c" data-ref="Akimoto2014" title="Source 5">5</sup>`] ]},
 {id:'neg',n:`Negative`,tag:'steel',h:`No pathogenic variant found`,
  d:[ [`What the consensus says`,`A negative result "does not exclude a genetic form of ALS". <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup> About 70% of familial cases carry a variant in a known gene, so some familial ALS still has no identified cause. <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>`],
   [`For relatives`,`In European populations, first-degree relatives of people with apparently sporadic ALS have a lifetime risk of about 1–3%, according to the consensus. <sup class="c" data-ref="Roggenbuck2023" title="Source 453">453</sup> An Irish population study found 1.4%, against 0.3% in the general population. <sup class="c" data-ref="Ryan2019" title="Source 459">459</sup>`],
   [`Follow-up as published`,`More than 40 genes had been reported by 2022 and interpretations change, so reevaluation may be appropriate. <sup class="c" data-ref="Feldman2022,Roggenbuck2023" title="Source 180,453">180,453</sup>`] ]}
];
inits.genes=()=>{
  const T=(x,y,c,txt,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const G=(x,y,inner)=>`<g transform="translate(${f1(x)} ${f1(y)})">${inner}</g>`;
  const op=o=>`style="opacity:${f1(clamp(o))}"`;

  /* ---------- shared: a neuron with its nucleus (376 x 220 local frame) ---------- */
  function cellBody(){const C=GE_TXT.cell;
    return `<rect x="0" y="4" width="376" height="212" rx="36" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.5"/>`+
      `<ellipse cx="112" cy="116" rx="96" ry="80" style="fill:var(--panel);stroke:var(--nuc);stroke-width:2"/>`+
      T(22,24,'t-xs',C.cell)+T(112,52,'t-xs t-mid',C.nuc)+T(300,24,'t-xs t-mid',C.cyt)}

  /* ---------- C9orf72: gene with the repeat (376 x 165) ---------- */
  const reps=t=>t<.2?5:Math.round(Math.exp(lerp(Math.log(5),Math.log(1000),ease(ramp(t,.2,.38)))));
  const zcol=n=>n<20?'var(--good)':n<30?'var(--warn)':'var(--tdp)';
  function c9Gene(n,t){const X=GE_TXT.c9;let s=T(0,18,'t-lbl',X.title);
    s+=`<rect x="250" y="8" width="38" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--muted)"/><rect x="292" y="8" width="80" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
    s+=`<rect x="268" y="8" width="5" height="12" style="fill:var(--tdp)"/>`+T(270.5,34,'t-xs t-mid',X.band,'fill:var(--tdp);font-weight:700');
    s+=`<line x1="0" y1="140" x2="376" y2="140" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<rect x="4" y="131" width="24" height="18" rx="3" style="fill:var(--steel)"/>`;
    [296,316,336,356].forEach(x=>s+=`<rect x="${x}" y="131" width="14" height="18" rx="3" style="fill:var(--steel);opacity:.75"/>`);
    s+=T(16,164,'t-xs t-mid',X.exon1)+T(160,164,'t-xs t-mid',X.intron)+T(333,164,'t-xs t-mid',X.later);
    const col=n<20?'var(--steel)':zcol(n),R=31,dr=Math.min(n,R*5),rows=Math.ceil(dr/R);
    if(rows>1)s+=`<rect x="32" y="${130-(rows-1)*14}" width="256" height="${(rows-1)*14+20}" rx="6" style="fill:none;stroke:var(--tdp);stroke-dasharray:3 3;opacity:.6"/>`;
    for(let i=0;i<dr;i++){const r=Math.floor(i/R),c=i%R;s+=`<rect x="${36+c*8}" y="${134-r*14}" width="6" height="12" rx="1.5" style="fill:${col}"/>`}
    if(n>R*5)s+=T(36,70,'t-xs',X.more,'fill:var(--tdp);font-weight:700');
    const co=1-ramp(t,.18,.24);
    if(co>0)s+=`<g ${op(co)}><rect x="36" y="86" width="96" height="24" rx="4" style="fill:var(--panel);stroke:${col};stroke-width:1.5"/>`+T(84,103,'t-lbl t-mid',X.unit,'font-family:var(--mono);fill:'+col)+T(140,102,'t-xs',X.unitLbl)+`<path d="M40 110L39 133" style="stroke:${col};stroke-width:1.2"/></g>`;
    return s}

  /* ---------- the repeat-count dial (300 x 205) ---------- */
  const DX=100,DY=118,DR=66;
  const dv=n=>n<=40?.6*n/40:.6+.4*Math.log(n/40)/Math.log(2500/40);
  const dpt=(n,r)=>{const a=Math.PI*(1-clamp(dv(n)));return [DX+r*Math.cos(a),DY-r*Math.sin(a)]};
  const darc=(n0,n1,r)=>{const p=dpt(n0,r),q=dpt(n1,r);return `M${f1(p[0])} ${f1(p[1])}A${r} ${r} 0 0 1 ${f1(q[0])} ${f1(q[1])}`};
  function dial(n){const D=GE_TXT.dial,L=D.leg;let s=T(0,14,'t-lbl',D.title);
    s+=`<path d="${darc(0,20,DR)}" style="fill:none;stroke:var(--good);stroke-width:14;opacity:.8"/>`;
    s+=`<path d="${darc(20,30,DR)}" style="fill:none;stroke:var(--warn);stroke-width:14;opacity:.8"/><path d="${darc(20,30,DR)}" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-dasharray:2 3"/>`;
    s+=`<path d="${darc(30,2500,DR)}" style="fill:none;stroke:var(--tdp);stroke-width:14;opacity:.8"/>`;
    s+=`<path d="${darc(700,1600,DR-14)}" style="fill:none;stroke:var(--tdp);stroke-width:5"/><path d="${darc(24,30,DR-14)}" style="fill:none;stroke:var(--warn);stroke-width:4;stroke-dasharray:3 2"/>`;
    [0,20,30,100,1000].forEach(v=>{const a=dpt(v,DR+8),b=dpt(v,DR+12),c=dpt(v,DR+20),an=c[0]<DX-20?' t-end':c[0]>DX+20?'':' t-mid';
      s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:var(--muted);stroke-width:1.2"/>`+T(c[0],c[1]+3,'t-xs'+an,v)});
    [-1,1].forEach(k=>{const an=Math.PI*.4+k*.025,x0=DX+(DR-8)*Math.cos(an),y0=DY-(DR-8)*Math.sin(an),x1=DX+(DR+8)*Math.cos(an),y1=DY-(DR+8)*Math.sin(an);
      s+=`<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" style="stroke:var(--panel);stroke-width:2"/>`});
    const nd=dpt(n,DR-10);
    s+=`<line x1="${DX}" y1="${DY}" x2="${f1(nd[0])}" y2="${f1(nd[1])}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><circle cx="${DX}" cy="${DY}" r="6" style="fill:var(--ink)"/>`;
    const zk=n<20?'good':n<30?'warn':'bad';
    s+=T(214,66,'t-big',n,'font-size:22px')+T(214,82,'t-xs',D.units)+T(214,98,'t-xs',D.zone[zk],'font-weight:700;fill:'+zcol(n));
    const sw=(x,y,c,dash)=>`<rect x="${x}" y="${y-7}" width="12" height="${dash?4:8}" rx="2" style="fill:${c}${dash?';opacity:.9':''}"/>`;
    s+=sw(0,150,'var(--good)')+T(16,151,'t-xs',L.good)+sw(150,150,'var(--warn)')+T(166,151,'t-xs',L.warn);
    s+=sw(0,166,'var(--tdp)')+T(16,167,'t-xs',L.bad)+`<rect x="150" y="161" width="12" height="4" rx="2" style="fill:var(--tdp)"/>`+T(166,167,'t-xs',L.pt);
    s+=`<line x1="0" y1="181" x2="12" y2="181" style="stroke:var(--warn);stroke-width:4;stroke-dasharray:3 2"/>`+T(16,183,'t-xs',L.ia);
    s+=T(16,199,'t-xs',L.brk);
    return s}

  /* ---------- C9orf72: the neuron and its three routes ---------- */
  function c9Cell(t){const C=GE_TXT.cell;let s=cellBody();
    const r1=ramp(t,.4,.48),r2=ease(ramp(t,.55,.64)),r3=ramp(t,.68,.8),r4=t>=.84;
    /* the two copies */
    s+=`<line x1="30" y1="84" x2="110" y2="84" style="stroke:var(--steel);stroke-width:2"/>`;
    [50,57,64].forEach(x=>s+=`<rect x="${x}" y="80" width="5" height="8" rx="1" style="fill:var(--steel)"/>`);
    s+=`<line x1="30" y1="116" x2="110" y2="116" style="stroke:var(--tdp);stroke-width:2"/>`;
    for(let r=0;r<3;r++)for(let c=0;c<8;c++)s+=`<rect x="${44+c*6}" y="${112-r*7}" width="5" height="6" rx="1" style="fill:var(--tdp)"/>`;
    s+=T(116,88,'t-xs',C.usual,'fill:var(--steel)')+T(116,120,'t-xs',C.exp,'fill:var(--tdp)');
    /* route 1: messages leave; fewer from the expanded copy, so less protein */
    if(t>=.4&&t<.6){const mo=bump(t,.4,.6);
      [[110,84,0],[110,84,.33],[110,84,.66],[110,116,.2]].forEach(([x0,y0,ph])=>{const u=((t-.4)/.2*1.6+ph)%1,x=lerp(x0,224,u),y=lerp(y0,42,u);
        s+=`<path d="M${f1(x)} ${f1(y)}q3 -4 6 0t6 0t6 0" style="fill:none;stroke:${y0>100?'var(--tdp)':'var(--steel)'};stroke-width:1.6;opacity:${f1(mo)}"/>`})}
    if(r1>0){for(let i=0;i<8;i++){const x=236+i*16,on=i<Math.round(5*r1);
        s+=i<5?`<circle cx="${x}" cy="40" r="5" style="fill:${on?'var(--steel)':'none'};stroke:var(--steel);stroke-width:1.4;opacity:${on?1:.25}"/>`:`<circle cx="${x}" cy="40" r="5" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:2 2;opacity:${f1(r1)}"/>`}
      s+=`<g ${op(r1)}>`+T(292,58,'t-xs t-mid',C.prot1)+T(292,70,'t-xs t-mid',C.prot2,'fill:var(--ink);font-weight:700')+'</g>'}
    /* route 2: RNA foci hold RNA-binding proteins */
    if(r2>0){[[58,150],[150,156],[150,64]].forEach(([fx,fy])=>{
        [ [0,0],[5,-3],[-4,4],[3,5] ].forEach(([dx,dy])=>s+=`<circle cx="${fx+dx}" cy="${fy+dy}" r="3.4" style="fill:var(--tdp);opacity:${f1(r2)}"/>`);
        [ [-18,-10,-8,-4],[16,-14,8,-5],[4,18,1,9] ].forEach(([a,b,c,d])=>s+=`<circle cx="${f1(fx+lerp(a,c,r2))}" cy="${f1(fy+lerp(b,d,r2))}" r="2.6" style="fill:var(--warn);opacity:${f1(Math.min(1,r2*1.5))}"/>`)});
      s+=T(104,182,'t-xs t-mid',C.foci,'fill:var(--tdp);font-weight:700;opacity:'+f1(r2))}
    /* route 3: repeat RNA meets a ribosome; dipeptide chains come off and clump */
    if(r3>0){const ro=ramp(t,.68,.71);
      s+=`<path d="M200 128q5 -5 10 0t10 0t10 0t10 4" style="fill:none;stroke:var(--tdp);stroke-width:1.8;opacity:${f1(ro)}"/>`;
      s+=`<g ${op(ro)}><ellipse cx="252" cy="145" rx="15" ry="10" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/><ellipse cx="252" cy="160" rx="12" ry="6" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/>`+T(244,184,'t-xs t-end',C.ribo)+'</g>';
      [ ['GA',282,122],['GP',322,122],['PR',282,196],['GR',282,160] ].forEach(([l,fx,fy],i)=>{const u=ease(ramp(t,.71+i*.02,.77+i*.02));if(u<=0)return;
        const x=lerp(270,fx,u),y=lerp(146,fy,u);let g='';
        for(let b=0;b<4;b++)g+=`<circle cx="${f1(x+b*7)}" cy="${f1(y)}" r="3.2" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.2"/>`;
        s+=`<g ${op(u)}>${g}`+T(x+10.5,y-7,'t-xs t-mid',l,'fill:var(--tdp);font-weight:700')+'</g>'});
      const ag=ease(ramp(t,.74,.84));
      if(ag>0){const R=rng(3);for(let k=0;k<Math.round(18*ag);k++){const a=R()*Math.PI*2,rr=4+R()*10;s+=`<circle cx="${f1(344+Math.cos(a)*rr)}" cy="${f1(178+Math.sin(a)*rr*.8)}" r="3.4" style="fill:var(--tdp);stroke:var(--panel);stroke-width:.8"/>`}
        s+=T(344,154,'t-xs t-mid',C.agg,'fill:var(--tdp);font-weight:700;opacity:'+f1(ag))}}
    /* where the routes meet: TDP-43 leaves the nucleus and clumps */
    if(r4){[ [70,64,228,96],[120,138,220,204],[184,100,356,96] ].forEach(([x0,y0,x1,y1],i)=>{const u=ease(ramp(t,.86+i*.02,.95+i*.02)),x=lerp(x0,x1,u),y=lerp(y0,y1,u);
        s+=tdp(x,y,1,Math.min(1,ramp(t,.84,.87)),u>.6?1:0)});
      s+=T(228,82,'t-xs t-mid',C.tdp,'fill:var(--tdp);font-weight:700;opacity:'+f1(ramp(t,.93,.96)))}
    return s}
  function c9Routes(t){const R=GE_TXT.routes;let s=T(0,14,'t-lbl',R.title);
    const act=t<.4?-1:t<.55?0:t<.68?1:t<.84?2:3;
    R.r.forEach(([a,b],i)=>{const y=24+i*42,on=i<=act;
      if(i===act)s+=`<rect x="0" y="${y}" width="300" height="38" rx="8" style="fill:var(--tdp-soft)"/>`;
      s+=`<g style="opacity:${on?1:.4}"><circle cx="17" cy="${y+19}" r="11" style="fill:${on?'var(--tdp)':'var(--panel)'};stroke:var(--tdp);stroke-width:1.5"/>`+
        T(17,y+23,'t-xs t-mid',i<3?i+1:'→','font-weight:700;fill:'+(on?'var(--panel)':'var(--tdp)'))+T(36,y+16,'t-lbl',a)+T(36,y+31,'t-xs',b)+'</g>'});
    return s}

  /* ---------- SOD1 ---------- */
  function sodGene(t){const S=GE_TXT.sod1;let s=T(0,18,'t-lbl',S.title);
    s+=`<rect x="250" y="8" width="10" height="12" rx="4" style="fill:var(--panel-2);stroke:var(--muted)"/><rect x="264" y="8" width="108" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
    s+=`<rect x="348" y="8" width="5" height="12" style="fill:var(--tdp)"/>`+T(350.5,34,'t-xs t-mid',S.band,'fill:var(--tdp);font-weight:700');
    s+=`<line x1="0" y1="82" x2="376" y2="82" style="stroke:var(--muted);stroke-width:2"/>`;
    [ [8,40],[96,22],[166,20],[236,40],[318,50] ].forEach(([x,w])=>s+=`<rect x="${x}" y="73" width="${w}" height="18" rx="3" style="fill:var(--steel);opacity:.8"/>`);
    const hi=ramp(t,.25,.3);
    const pin=(x,y0,y1,c)=>`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" style="stroke:${c};stroke-width:1.6"/><circle cx="${x}" cy="${y1}" r="${f1(4.5+1.5*hi)}" style="fill:${c}"/>`;
    s+=pin(18,73,50,'var(--tdp)')+T(8,42,'t-xs',S.a5v,'fill:var(--tdp);font-weight:700');
    s+=pin(248,73,50,'var(--tdp)')+T(248,42,'t-xs t-mid',S.d91a,'fill:var(--tdp);font-weight:700');
    s+=pin(258,91,104,'var(--muted)')+T(258,120,'t-xs t-mid',S.g93a);
    s+=T(0,112,'t-sm',S.n180);
    return s}
  const NZ=a=>.22*Math.sin(3*a+1)+.15*Math.sin(5*a+2)+.1*Math.sin(2*a+.5);
  function sub(x,y,rot,m,sc,o){const bad=m>.5,col=bad?'var(--tdp)':'var(--steel)',fill=bad?'var(--tdp-soft)':'var(--steel-soft)';
    let d='';for(let k=0;k<=36;k++){const a=k/36*Math.PI*2,rr=1+m*NZ(a);d+=(k?'L':'M')+f1(Math.cos(a)*30*rr*sc)+' '+f1(Math.sin(a)*40*rr*sc)}
    let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" style="opacity:${f1(o)}"><path d="${d}Z" style="fill:${fill};stroke:${col};stroke-width:2;stroke-linejoin:round"/>`;
    if(m<1)[-12,0,12].forEach(sx=>g+=`<path d="M${f1(sx*sc)} ${f1(-24*sc)}l0 ${f1(48*sc)}" style="stroke:${col};stroke-width:2.4;stroke-linecap:round;opacity:${f1(.55*(1-m))}"/>`);
    return g+'</g>'}
  const metal=(x,y,l,c,o)=>`<g ${op(o)}><circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:${c}"/>`+T(x,y+3.3,'t-xs t-mid',l,'fill:var(--panel);font-weight:700')+'</g>';
  function sodProt(t){const S=GE_TXT.sod1;let s='';
    const hd=t<.25?0:t<.5?1:t<.75?2:3;s+=T(188,20,'t-lbl t-mid',S.head[hd]);
    const vr=ramp(t,.25,.3),met=ease(ramp(t,.3,.4)),sp=ease(ramp(t,.38,.48)),mf=ease(ramp(t,.5,.6)),ag=ease(ramp(t,.58,.7));
    const wob=Math.sin(t*140)*5*bump(t,.3,.44),cx=188,cy=118,d=31+sp*70,sc=lerp(1,.7,ag);
    /* superoxide in, products out (step 1) */
    const rx=1-ramp(t,.2,.26);
    if(rx>0){const u=(t*7)%1;
      s+=`<g ${op(rx)}>`+T(8,114,'t-xs',S.rx1)+`<path d="M70 110L112 114" class="arrow" marker-end="url(#geAr)"/><path d="M262 114L300 110" class="arrow" marker-end="url(#geAr)"/>`+T(306,114,'t-xs',S.rx2)+
        `<circle cx="${f1(lerp(70,112,u))}" cy="${f1(lerp(110,114,u))}" r="3" style="fill:var(--tdp)"/><circle cx="${f1(lerp(262,300,u))}" cy="${f1(lerp(114,110,u))}" r="3" style="fill:var(--steel)"/></g>`}
    const P=[0,1].map(i=>{const sg=i?1:-1;return [lerp(cx+sg*d,cx+sg*16,ag),lerp(cy,150-sg*6,ag)]});
    /* extra misfolded monomers join the clump */
    const EX=[ [-50,-18,-140,-70],[50,-20,140,-70],[-36,34,-140,70],[40,32,140,66] ];
    EX.forEach(([ox,oy,sx,sy],i)=>{const u=ease(ramp(t,.62+i*.02,.72+i*.02));if(u>0)s+=sub(lerp(cx+sx,cx+ox,u),lerp(150+sy,150+oy,u),i*40,1,.5,u)});
    P.forEach(([x,y],i)=>{s+=sub(x,y,(i?1:-1)*wob+ag*(i?30:-25),mf,sc,1)});
    /* metals leave (step 2) */
    P.forEach(([x,y],i)=>{const sg=i?1:-1,o=1-met;if(o<=0)return;
      s+=metal(x+sg*met*58,y-12-met*44,GE_TXT.sod1.cu,'var(--lmn)',o)+metal(x+sg*met*70,y+14-met*20,GE_TXT.sod1.zn,'var(--muted)',o)});
    if(vr>0&&mf<1){const [x,y]=P[1],o=vr*(1-mf);
      s+=`<g ${op(o)}><path d="M${f1(x+20)} ${f1(y-38)}l2.4 5 5.5 .8 -4 3.9 1 5.5 -4.9 -2.6 -4.9 2.6 1 -5.5 -4 -3.9 5.5 -.8z" style="fill:var(--warn)"/>`+T(x+30,y-36,'t-xs',S.variant,'fill:var(--warn);font-weight:700')+'</g>'}
    s+=T(188,200,'t-xs t-mid',S.apo,'opacity:'+f1(bump(t,.3,.52)));
    if(ag>0)s+=T(188,226,'t-xs t-mid',S.agg,'font-weight:700;fill:var(--tdp);opacity:'+f1(ag));
    /* step 4: ubiquitin tags, no TDP-43, the target */
    const ub=ramp(t,.76,.84);
    if(ub>0){[ [-80,-44],[82,-42],[-76,50],[78,48] ].forEach(([ox,oy],i)=>{const o=ramp(t,.76+i*.015,.8+i*.015);
        s+=`<g ${op(o)}><circle cx="${cx+ox}" cy="${150+oy}" r="9" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.4"/>`+T(cx+ox,153+oy,'t-xs t-mid',S.ub,'fill:var(--warn);font-weight:700')+'</g>'});
      const o=ramp(t,.82,.88);
      s+=`<g ${op(o)}>${tdp(326,150,1.4,.8,0)}<line x1="314" y1="138" x2="346" y2="162" style="stroke:var(--bad);stroke-width:2.4"/>`+T(330,180,'t-xs t-mid',S.noTdp,'font-weight:700')+'</g>';
      s+=T(188,256,'t-sm t-mid',S.target,'fill:var(--ink);opacity:'+f1(ramp(t,.86,.92)))}
    return s}
  function sodPanel(t){const Pn=GE_TXT.sod1.pan;let s=T(0,18,'t-lbl',Pn.h1);
    Pn.ev.forEach(([a,b],i)=>{const y=34+i*44,o=ramp(t,.55+i*.04,.6+i*.04);
      s+=`<g style="opacity:${f1(.35+.65*o)}"><circle cx="10" cy="${y+12}" r="8" style="fill:${o>.5?'var(--good)':'var(--panel)'};stroke:var(--good);stroke-width:1.5"/>`+(o>.5?`<path d="M6 ${y+12}l3 3 5 -6" style="fill:none;stroke:var(--panel);stroke-width:2"/>`:'')+T(26,y+10,'t-lbl',a)+T(26,y+25,'t-xs',b)+'</g>'});
    const o4=t>=.75?1:.35;
    s+=`<g style="opacity:${o4}">`+T(0,232,'t-lbl',Pn.h2);
    [ [Pn.a5v,1.2,'var(--tdp)'],[Pn.oth,6.8,'var(--steel)'] ].forEach(([l,v,c],i)=>{const y=252+i*36,w=v/6.8*210;
      s+=T(0,y,'t-xs',l)+`<rect x="0" y="${y+5}" width="${f1(w)}" height="14" rx="7" style="fill:${c}"/>`+T(w+6,y+16,'t-xs',Pn.yrs(v),'fill:var(--ink);font-weight:700')});
    s+=T(0,342,'t-lbl',Pn.h3);
    s+=`<circle cx="7" cy="357" r="6" style="fill:var(--warn-soft);stroke:var(--warn)"/>`+T(20,361,'t-xs',Pn.p1);
    s+=tdp(4,377,1,.8,0)+`<line x1="-1" y1="371" x2="17" y2="383" style="stroke:var(--bad);stroke-width:2"/>`+T(20,381,'t-xs',Pn.p2)+'</g>';
    return s}

  /* ---------- TARDBP and FUS ---------- */
  function psBar(C,t){let s=T(0,18,'t-lbl',C.title);const BY=62,pv=ramp(t,.33,.42);
    s+=`<rect x="0" y="${BY}" width="376" height="22" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    C.seg.forEach(([a,b,l,c])=>{const x=a*376,w=(b-a)*376;s+=`<rect x="${f1(x)}" y="${BY}" width="${f1(w)}" height="22" rx="4" style="fill:${c};stroke:var(--line)"/>`+T(x+w/2,BY+15,'t-xs t-mid',l,'fill:var(--ink)')});
    C.pins.forEach(([p,l,dir])=>{const x=Math.min(p*376,374),y0=dir<0?BY:BY+22,y1=dir<0?BY-16:BY+38,ly=dir<0?BY-26:BY+56,an=x>350?' t-end':' t-mid',lx=x>350?376:x;
      s+=`<g style="opacity:${f1(.25+.75*pv)}"><line x1="${f1(x)}" y1="${y0}" x2="${f1(x)}" y2="${y1}" style="stroke:var(--tdp);stroke-width:1.6"/><circle cx="${f1(x)}" cy="${y1}" r="${f1(4+1.5*pv)}" style="fill:var(--tdp)"/>`+T(lx,ly,'t-xs'+an,l,'fill:var(--tdp);font-weight:700')+'</g>'});
    s+=T(C.glyph==='fus'?336:376,BY+44,'t-xs t-end',C.note,'opacity:'+f1(.4+.6*pv));
    return s}
  const fusG=(x,y,agg,o)=>`<rect x="${f1(x-5)}" y="${f1(y-5)}" width="10" height="10" rx="2.5" style="fill:${agg?'var(--tdp)':'var(--steel-soft)'};stroke:${agg?'var(--tdp)':'var(--steel)'};stroke-width:1.4;opacity:${f1(o)}"/>`;
  const NP=[ [64,90],[150,96],[70,146],[132,150],[96,70],[170,140] ];
  const CP=[ [262,96],[282,112],[302,94],[262,170],[284,182],[304,166] ];
  function psCell(C,t){let s=cellBody();const fus=C.glyph==='fus',vr=ramp(t,.38,.45);
    NP.forEach(([x0,y0],i)=>{const mv=i<4,u=mv?ease(ramp(t,.66+i*.03,.8+i*.03)):0,x=lerp(x0,CP[i][0],u),y=lerp(y0,CP[i][1],u),agg=u>.7;
      if(u<.3)s+=`<path d="M${f1(x-7)} ${f1(y+7)}q3.5 3 7 0t7 0" style="fill:none;stroke:var(--muted);stroke-width:1.2;opacity:${f1(1-u/.3)}"/>`;
      s+=fus?fusG(x,y,agg,1):tdp(x,y,1,1,agg?1:0);
      if(mv&&vr>0&&!agg)s+=`<circle cx="${f1(x)}" cy="${f1(y-8)}" r="2.6" style="fill:var(--warn);opacity:${f1(vr)}"/>`});
    s+=T(100,177,'t-xs t-mid',C.prot,'font-weight:700');
    if(vr>0)s+=`<g ${op(vr*(1-ramp(t,.78,.84)))}><circle cx="214" cy="200" r="2.6" style="fill:var(--warn)"/>`+T(221,203,'t-xs',GE_TXT.ps.variant)+'</g>';
    const ao=ramp(t,.78,.84);
    if(ao>0){s+=T(282,143,'t-xs t-mid',C.agg,'fill:var(--tdp);font-weight:700;opacity:'+f1(ao));
      if(fus)s+=`<g ${op(ao)}>${tdp(330,56,1,.8,0)}<line x1="322" y1="49" x2="346" y2="63" style="stroke:var(--bad);stroke-width:2"/>`+T(336,78,'t-xs t-mid',C.noTdp,'font-weight:700')+'</g>'}
    return s}
  function psPanel(C){const Pn=C.pan;let s=T(0,18,'t-lbl',Pn.h1);
    Pn.bars.forEach(([l,v],i)=>{const y=40+i*34,w=v/10*220;
      s+=T(0,y,'t-xs',l)+`<rect x="0" y="${y+5}" width="220" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="0" y="${y+5}" width="${f1(Math.max(3,w))}" height="12" rx="6" style="fill:${l.indexOf('familial')>=0?'var(--tdp)':'var(--steel)'}"/>`+T(228,y+15,'t-xs',GE_TXT.pct(v),'fill:var(--ink);font-weight:700')});
    const y0=40+Pn.bars.length*34;s+=T(0,y0,'t-xs',GE_TXT.scale10);
    s+=T(0,y0+30,'t-lbl',Pn.h2);Pn.lines.forEach((l,i)=>s+=T(0,y0+50+i*16,'t-xs',l));
    return s}

  /* ---------- the main player ---------- */
  const svg=$('#geSvg'),rg=$('#geT');let GN='c9';
  const ST=GE_STEPS.c9.slice();
  const DIMS={c9:['720 410','400 815'],sod1:['720 410','400 800'],tardbp:['720 410','400 600'],fus:['720 410','400 700']};
  function draw(t){
    const N=vb(svg,DIMS[GN][0],DIMS[GN][1]);
    svg.setAttribute('aria-label',GE_TXT.aria[GN]);
    let s=`<defs>${marker('geAr')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    if(GN==='c9'){const n=reps(t),L=N?{g:[12,2],d:[50,176],c:[12,390],p:[50,616]}:{g:[16,2],d:[410,2],c:[16,184],p:[410,216]};
      s+=G(...L.g,c9Gene(n,t))+G(...L.d,dial(n))+G(...L.c,c9Cell(t))+G(...L.p,c9Routes(t))}
    else if(GN==='sod1'){const L=N?{g:[12,2],c:[12,128],p:[50,410]}:{g:[16,2],c:[16,132],p:[410,4]};
      s+=G(...L.g,sodGene(t))+G(...L.c,sodProt(t))+G(...L.p,sodPanel(t))}
    else{const C=GE_PS[GN],L=N?{g:[12,2],c:[12,132],p:[50,362]}:{g:[16,2],c:[16,160],p:[410,4]};
      s+=G(...L.g,psBar(C,t))+G(...L.c,psCell(C,t))+G(...L.p,psPanel(C))}
    svg.innerHTML=s;
    const p=phaseOf(ST,t);setSt(p);$('#geNote').innerHTML=noteHTML(ST[p]);
  }
  const stop=playWire(rg,$('#gePlay'),draw,16000,UI.replay,'genes');
  const stEl=$('#geSteps');
  const setSt=stepWire(stEl,ST,rg,draw,stop);
  toggleRow($('#geGene'),GE_TXT.genes,'c9',v=>{stop();GN=v;ST.length=0;GE_STEPS[v].forEach(x=>ST.push(x));
    stEl.innerHTML=ST.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('');
    rg.value=ST[0].at;draw(+rg.value)});
  draw(+rg.value);

  /* ---------- 2. dominant pedigree with age-dependent penetrance ---------- */
  const ps=$('#gpSvg'),rp=$('#gpT');let EST='fam';
  /* a logistic through the published points: 0 before 35, 50% at 58, 99.5% at 83 */
  const PEN=a=>a<35?0:1/(1+Math.exp(-(a-58)/4.72));
  const AGE=t=>Math.round(30+55*t);
  const RANK=(()=>{const r=rng(14),a=[];for(let i=0;i<100;i++)a.push(i);
    for(let i=99;i>0;i--){const j=Math.floor(r()*(i+1)),tmp=a[i];a[i]=a[j];a[j]=tmp}
    const rk=[];a.forEach((idx,pos)=>{rk[idx]=pos});return rk})();
  function pedSym(x,y,sq,st){const r=13,dash=st==='risk',fill=st==='aff'?'var(--tdp)':'var(--panel)',stk=dash?'var(--muted)':'var(--ink)';
    const sty=`fill:${fill};stroke:${stk};stroke-width:1.6${dash?';stroke-dasharray:3 2':''}`;
    let g=sq?`<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" style="${sty}"/>`:`<circle cx="${x}" cy="${y}" r="${r}" style="${sty}"/>`;
    if(st==='car')g+=`<circle cx="${x}" cy="${y}" r="3.5" style="fill:var(--ink)"/>`;
    if(dash)g+=T(x,y+3.5,'t-xs t-mid','50%','fill:var(--ink);font-weight:700');
    return g}
  function ped(a){const D=GE_TXT.ped;let s=T(0,14,'t-lbl',D.title);const ln=d=>`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    s+=T(4,48,'t-sm',D.gen[0])+T(4,114,'t-sm',D.gen[1])+T(4,180,'t-sm',D.gen[2]);
    s+=ln('M133 44H207M170 44V84M100 84H200M100 84V97M200 84V97M213 110H267M240 110V150M60 150H300M60 150V163M140 150V163M220 150V163M300 150V163');
    s+=pedSym(120,44,1,'car')+pedSym(220,44,0,'none')+T(104,42,'t-xs t-end',D.gf1)+T(104,53,'t-xs t-end',D.gf2);
    s+=pedSym(100,110,1,'none')+pedSym(200,110,0,'aff')+pedSym(280,110,1,'none')+T(200,138,'t-xs t-mid',D.aff,'fill:var(--tdp);font-weight:700');
    [60,140,220,300].forEach((x,i)=>s+=pedSym(x,176,i%2===0,'risk'));
    s+=T(180,206,'t-xs t-mid',D.kids1)+T(180,220,'t-xs t-mid',D.kids2(a),'fill:var(--ink);font-weight:700');
    return s}
  function icons(a,k,popNo){const D=GE_TXT.ped;let s=T(0,14,'t-lbl',D.iconsT(a));
    for(let i=0;i<100;i++){const x=8+(i%20)*16.4,y=34+Math.floor(i/20)*16.4,pos=RANK[i];
      if(pos>=50)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
      else if(pos<k)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:var(--tdp);stroke:var(--tdp);stroke-width:1.2"/>`;
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.4"/><circle cx="${f1(x)}" cy="${f1(y)}" r="2" style="fill:var(--steel)"/>`}
    s+=`<circle cx="7" cy="130" r="6" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`+T(20,134,'t-xs',D.non(50));
    s+=`<circle cx="7" cy="148" r="6" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.4"/><circle cx="7" cy="148" r="2" style="fill:var(--steel)"/>`+T(20,152,'t-xs',D.car(50-k));
    s+=`<circle cx="7" cy="166" r="6" style="fill:var(--tdp)"/>`+T(20,170,'t-xs',popNo?D.noPop:D.aff2(k),popNo?'':'fill:var(--ink);font-weight:700');
    s+=T(20,188,'t-xs',EST==='fam'?D.basisF:D.basisP);
    return s}
  const CX0=40,CX1=310,CY0=240,CY1=40,ax=a=>CX0+(a-30)/55*(CX1-CX0),ay=p=>CY0-p*(CY0-CY1);
  function chart(a){const D=GE_TXT.ped;let s=T(0,16,'t-lbl',D.chart);const fo=EST==='fam'?1:.3,po=EST==='pop'?1:.35;
    [0,.25,.5,.75,1].forEach(p=>s+=`<line x1="${CX0}" x2="${CX1}" y1="${f1(ay(p))}" y2="${f1(ay(p))}" class="grid"/>`+T(CX0-6,ay(p)+3,'t-xs t-end',GE_TXT.pct(Math.round(p*100))));
    [30,40,50,60,70,80].forEach(v=>s+=T(ax(v),CY0+16,'t-xs t-mid',v));
    s+=`<line x1="${CX0}" x2="${CX1}" y1="${CY0}" y2="${CY0}" class="axis"/><line x1="${CX0}" x2="${CX0}" y1="${CY1}" y2="${CY0}" class="axis"/>`+T((CX0+CX1)/2,CY0+34,'t-xs t-mid',D.ageAx);
    let d='';for(let v=30;v<=85;v+=.5)d+=(v>30?'L':'M')+f1(ax(v))+' '+f1(ay(PEN(v)));
    s+=`<g style="opacity:${fo}"><path d="${d}" style="fill:none;stroke:var(--steel);stroke-width:2.6"/>`;
    [ [35,0],[58,.5],[83,.995] ].forEach(([v,p])=>s+=`<circle cx="${f1(ax(v))}" cy="${f1(ay(p))}" r="4.5" style="fill:var(--steel);stroke:var(--panel);stroke-width:1.5"/>`);
    s+=T(44,215,'t-xs',D.p35)+T(184,152,'t-xs',D.p58)+T(294,29,'t-xs t-end',D.p83)+'</g>';
    s+=`<g style="opacity:${po}">`;
    [ [279,.66,.57,.73,D.ukb1,111],[291,.58,.50,.64,D.ukb2,128] ].forEach(([x,p,lo,hi,l,ly])=>{const y=ay(p);
      s+=`<line x1="${x}" x2="${x}" y1="${f1(ay(lo))}" y2="${f1(ay(hi))}" style="stroke:var(--warn);stroke-width:1.6"/><path d="M${x} ${f1(y-6)}l6 6 -6 6 -6 -6z" style="fill:var(--warn)"/>`});
    s+=T(272,111,'t-xs t-end',D.ukb1,'fill:var(--warn);font-weight:700')+T(272,128,'t-xs t-end',D.ukb2,'fill:var(--warn);font-weight:700')+'</g>';
    const x=ax(a);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${CY1}" y2="${CY0}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    if(EST==='fam')s+=`<circle cx="${f1(x)}" cy="${f1(ay(PEN(a)))}" r="6" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
    s+=`<line x1="0" y1="290" x2="16" y2="290" style="stroke:var(--steel);stroke-width:2.6"/><circle cx="8" cy="290" r="3.5" style="fill:var(--steel)"/>`+T(24,293,'t-xs',D.legF);
    s+=`<path d="M8 302l6 6 -6 6 -6 -6z" style="fill:var(--warn)"/>`+T(24,312,'t-xs',D.legP);
    return s}
  function readout(a){const D=GE_TXT.ped;let pen,kid,note;
    if(EST==='fam'){const P=PEN(a),pub=a<=35||a===58||a===83;
      pen=a<=35?D.exact(0):a===58?D.exact(50):a===83?D.exact(99.5):D.about(Math.round(P*100));
      kid=a<=35?D.exact(0):a===58?D.exact(25):D.about(Math.round(P*50));note=pub?D.nPub:D.nInt}
    else if(a>=80){pen=D.exact(66);kid=D.about(33);note=D.nPop80}
    else{pen=D.none;kid=D.none;note=D.nPopNo}
    let s=T(0,14,'t-xs',D.r1)+T(320,16,'t-big t-end','50%');
    const ra=EST==='pop'&&a>=80?80:a;
    s+=T(0,40,'t-xs',D.r2(ra))+T(320,42,'t-big t-end',pen);
    s+=T(0,66,'t-xs',D.r3(ra))+T(320,68,'t-big t-end',kid,'fill:var(--tdp)');
    s+=T(0,86,'t-xs',D.eq)+T(0,100,'t-xs',note,'fill:var(--ink)');
    return s}
  function drawP(t){
    const N=vb(ps,'720 440','400 896');const a=AGE(t);
    const popNo=EST==='pop'&&a<80,k=EST==='fam'?Math.round(50*PEN(a)):(a>=80?33:0);
    const L=N?{a:[30,0],b:[30,236],c:[40,446],d:[40,786]}:{a:[14,0],b:[14,236],c:[390,0],d:[390,334]};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=G(...L.a,ped(a))+G(...L.b,icons(a,k,popNo))+G(...L.c,chart(a))+G(...L.d,readout(a));
    ps.innerHTML=s;
    const p=phaseOf(GE_PDS,t);setP(p);$('#gpNote').innerHTML=noteHTML(GE_PDS[p]);
    rp.setAttribute('aria-valuetext',GE_TXT.ped.vt(a,GE_PDS[p].t));
  }
  const stopP=playWire(rp,$('#gpPlay'),drawP,14000,UI.replay,'genes');
  const setP=stepWire($('#gpSteps'),GE_PDS,rp,drawP,stopP);
  toggleRow($('#gpEst'),[ ['fam',`Family-based studies`],['pop',`Population cohort (UK Biobank)`] ],'fam',v=>{EST=v;drawP(+rp.value)});
  drawP(+rp.value);

  /* ---------- 3. share by ancestry ---------- */
  function bars(k){const A=GE_ANC[k],X=GE_TXT.anc,sc=v=>f1(v/35*100)+'%';
    $('#geBars').innerHTML=A.rows.map(([g,f,sp])=>`<div class="ge-bar"><b>${g}</b><div class="ge-trk"><div class="fam"><span>${X.fam(`<b>${f}</b>`)}</span><i style="width:${sc(f)}"></i></div><div class="spo"><span>${X.spo(`<b>${sp}</b>`)}</span><i style="width:${sc(sp)}"></i></div></div></div>`).join('');
    $('#geAncNote').innerHTML=`<div class="kicker">${A.k}</div><h4>${A.t}</h4><p>${A.txt}</p>`}
  toggleRow($('#geAnc'),GE_TXT.anc.opts,'eu',bars);bars('eu');

  /* ---------- 4. result reader ---------- */
  function res(id){const R=GE_RES.find(r=>r.id===id);
    $('#geOut').innerHTML=`<span class="tag ${R.tag}" style="align-self:flex-start">${R.n}</span><h4>${R.h}</h4><dl>${R.d.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>`}
  toggleRow($('#geRes'),GE_RES.map(r=>[r.id,r.n]),'p',res);res('p');
};
/* =============== 2.1 diagnosis & criteria =============== */
/* regions in rostral-to-caudal order: the index is what the "rostral" rules compare */
const DX_R=['bulbar','cervical','thoracic','lumbosacral'];
const DX_LIMB={cervical:true,lumbosacral:true};
const DX_TXT={
 reg:{bulbar:'Bulbar',cervical:'Cervical',thoracic:'Thoracic',lumbosacral:'Lumbosacral'},
 regLow:{bulbar:'bulbar',cervical:'cervical',thoracic:'thoracic',lumbosacral:'lumbosacral'},
 regEx:{bulbar:'Jaw, face, palate, tongue, larynx',cervical:'Neck, arms, hands, diaphragm',thoracic:'Back and abdomen',lumbosacral:'Back, abdomen, legs, feet'},
 list:a=>a.join(', '),
 /* calculator form */
 umnTag:'UMN',lmnTag:'LMN',
 umnBtn:'signs on examination',lmnBtn:'signs on examination',
 umnHint:{bulbar:'e.g. brisk jaw jerk, snout reflex, pseudobulbar features',cervical:'e.g. Hoffmann sign, spastic tone, a brisk reflex in a weak, wasted arm',thoracic:'e.g. loss of superficial abdominal reflexes',lumbosacral:'e.g. extensor plantar response, spastic tone'},
 lmnHint:{bulbar:'weakness and wasting, e.g. of the tongue (1 muscle is enough)',cervical:'weakness and wasting in 2 muscles with different roots and nerves',thoracic:'weakness and wasting of back or abdominal muscles (1 muscle is enough)',lumbosacral:'weakness and wasting in 2 muscles with different roots and nerves'},
 emgLbl:'Needle EMG: chronic neurogenic change, plus',
 emgGroup:r=>`Needle EMG findings, ${r} region`,
 emgOpt:['Nothing (normal or not done)','Fasciculation potentials only','Fibrillations or sharp waves'],
 two:'EMG change in 2 muscles with different roots and nerves',twoSub:'Needed for a limb region to count',
 both:'Both sides affected on EMG',bothSub:'Counts as 2 limbs for the laboratory-supported rule',
 ex:{arm:'UMN + LMN in the arm, EMG in arm and leg',caseEnd:'Composite case, month 14',pma:'LMN signs only, 2 regions',pls:'UMN signs only, 2 regions',fasc:'EMG shows fasciculations only',rost:'LMN in the arm, UMN in the leg',clr:'Clear all'},
 /* calculator results */
 gcName:'Gold Coast 2020',eecName:'Revised El Escorial 2000',awName:'Awaji 2008',
 gcMet:'Met: classified as ALS',gcNot:'Not met',
 r1ok:'R1 met: progressive motor impairment, preceded by normal motor function.',
 r1noP:'R1 not met: progression has not been documented by history or repeated examination.',
 r1noN:'R1 not met: the impairment has to follow a period of normal motor function.',
 r2same:rs=>`R2 met: UMN and LMN signs in the same region (${rs}).`,
 r2two:(n,rs)=>`R2 met: LMN signs in ${n} regions (${rs}).`,
 r2split:(u,l)=>`R2 met on the literal wording: UMN signs (${u}) and LMN signs (${l}) in different regions. See the note below.`,
 r2no:'R2 not met: needs UMN and LMN signs in 1 region, or LMN signs in at least 2 regions.',
 r3ok:'R3 met: investigations have excluded other disease processes.',
 r3no:'R3 not met yet: other disease processes still have to be excluded.',
 cat:{none:'No category',poss:'Clinically possible',lab:'Clinically probable, laboratory-supported',prob:'Clinically probable',def:'Clinically definite'},
 catAw:{none:'No category',poss:'Possible',prob:'Probable',def:'Definite'},
 catShort:{none:'No category',poss:'Possible',lab:'Probable (lab)',prob:'Probable',def:'Definite'},
 notYet:'Not classified yet',
 pend:c=>`The signs reach "${c}", but every category also needs progressive spread and other causes excluded.`,
 why:{
  def:rs=>`UMN and LMN signs together in 3 or more regions (${rs}).`,
  prob:(a,b)=>`UMN and LMN signs across at least 2 regions, with UMN signs (${a}) rostral to LMN signs (${b}).`,
  lab:()=>'Clinical UMN signs in 1 region, with or without LMN signs there, plus LMN signs on EMG in at least 2 limbs.',
  possUL:rs=>`UMN and LMN signs together in only 1 region (${rs}).`,
  possU2:rs=>`UMN signs alone in 2 or more regions (${rs}).`,
  possRost:(l,u)=>`LMN signs (${l}) are rostral to the UMN signs (${u}), so the rostral rule for "probable" is not met.`,
  noneU:()=>'The findings do not reach "possible".',
  noneNoU:()=>'Every category needs clinical UMN signs somewhere. LMN signs alone give no category.'
 },
 eecClin:'Only clinical signs count for these levels; EMG is used for the laboratory-supported level.',
 awEmg:rs=>`EMG counted as LMN evidence in: ${rs}.`,
 sum:(g,e,a)=>`Gold Coast: ${g} · Revised El Escorial: ${e} · Awaji: ${a}`,
 sumG:{met:'met (ALS)',not:'not met'},
 sumPend:c=>`${c} (pending)`,
 tagDiffer:'Readers differ',tagNote:'Note',
 n:{
  pma:'LMN signs only, in 2 or more regions: the progressive muscular atrophy (PMA) pattern. Gold Coast counts this as ALS for the first time, while revised El Escorial and Awaji give no category. El Escorial 1994 called it "suspected"; the 2000 revision removed that level. Much of the extra sensitivity of Gold Coast comes from such cases. <sup class="c" data-ref="deCarvalhoSwash2024,Pugdahl2021,Vidovic2023" title="Source 136,432,519">136,432,519</sup>',
  pls:'UMN signs only: the primary lateral sclerosis (PLS) pattern. Not enough for Gold Coast, while revised El Escorial and Awaji call UMN signs in 2 or more regions "possible". The 2020 PLS consensus criteria apply instead: progressive UMN symptoms for at least 2 years and no active LMN degeneration. <sup class="c" data-ref="Turner2022,Turner2020PLS,CENTAURprotocol2019" title="Source 95,501,502">95,501,502</sup>',
  fasc:rs=>`EMG shows fasciculation potentials but no fibrillations here: ${rs}. With chronic neurogenic change, Gold Coast and Awaji count this as denervation; the El Escorial EMG rules did not. <sup class="c" data-ref="Shefner2020,deCarvalho2008,deCarvalhoSwash2024" title="Source 134,136,464">134,136,464</sup>`,
  two:rs=>`EMG in the ${rs} region is not counted: a limb region needs changes in 2 muscles supplied by different roots and different nerves. The bulbar and thoracic regions need 1 muscle. <sup class="c" data-ref="Shefner2020,deCarvalhoSwash2024" title="Source 136,464">136,464</sup>`,
  limbs:'Laboratory-supported, "2 limbs" or "2 regions"? The WFN text asks for EMG signs in at least 2 limbs, which is met here. A summary by de Carvalho and Swash says at least 2 regions, which is not met. This tool follows the WFN text. <sup class="c" data-ref="CENTAURprotocol2019,deCarvalhoSwash2024" title="Source 95,136">95,136</sup>',
  regs:'Laboratory-supported, "2 limbs" or "2 regions"? EMG signs are in at least 2 regions but not in 2 limbs. On the "2 regions" wording of de Carvalho and Swash this would be "probable, laboratory-supported"; this tool follows the WFN text ("at least 2 limbs"). <sup class="c" data-ref="CENTAURprotocol2019,deCarvalhoSwash2024,Vidovic2023" title="Source 95,136,519">95,136,519</sup>',
  labU:'The WFN text describes UMN signs in 1 region for the laboratory-supported level. Here UMN signs are in more than 1 region; this tool still applies the level, which the text does not address. <sup class="c" data-ref="CENTAURprotocol2019" title="Source 95">95</sup>',
  strict:'Awaji "probable" is applied as worded: LMN and UMN signs in at least 2 regions, with some UMN signs rostral to the LMN signs. Some studies read it as needing UMN signs in 2 regions; on that reading this would be "possible". This is one reason Awaji moved 20% of laboratory-supported cases down to possible in a meta-analysis. <sup class="c" data-ref="Finsterer2013,JangBae2015" title="Source 184,248">184,248</sup>',
  split:'Gold Coast asks for UMN and LMN signs in the same region only "if only one body region is involved". It does not say what happens when they are in different regions. This tool follows that literal wording and counts it; a stricter reading would not. <sup class="c" data-ref="Shefner2020,Turner2022,Shrestha2026" title="Source 464,472,502">464,472,502</sup>'
 },
 /* animation */
 view:{gc:'Gold Coast',eec:'Revised El Escorial',aw:'Awaji'},
 mk:{u:'U',l:'L',e:'E'},
 legend:{u:'U: UMN signs on examination',l:'L: LMN signs on examination',e:'E: LMN signs on EMG'},
 month:m=>`Month ${m}`,
 caseTag:'Illustrative composite case',
 chipName:{gc:'Gold Coast',eec:'Revised El Escorial',aw:'Awaji'},
 chipGc:{met:'ALS',pend:'R3 pending',no:'Not met'},
 panelTitle:{gc:'GOLD COAST 2020: ALL 3 NEEDED',eec:'REVISED EL ESCORIAL 2000',aw:'AWAJI 2008'},
 pendTag:'causes not yet excluded',
 rung:{eec:['No category','Possible','Probable, lab-supported','Probable','Definite'],aw:['No category','Possible','Lab-supported','Probable','Definite']},
 rungDef:{eec:[ ['Findings do not reach','"possible"'],['UMN + LMN in 1 region,','or UMN alone in 2'],['UMN in 1 region, plus','EMG LMN in 2 limbs'],['2 regions, with UMN','signs rostral to LMN'],['UMN + LMN','in 3 regions'] ],
          aw:[ ['Findings do not reach','"possible"'],['UMN + LMN in 1 region,','or UMN alone in 2'],['Deleted in 2008:','EMG now counts directly'],['2 regions, with UMN','signs rostral to LMN'],['UMN + LMN','in 3 regions'] ]},
 strictLines:['A stricter reading','would stop here'],
 paceLines:['The ladder counts regions;','it does not predict pace.','Decline per month in one','register: rEEC 0.84,','Gold Coast 0.81 points'],
 gcReq:[ ['R1','Progressive motor impairment','after normal motor function'],['R2','UMN + LMN in 1 region,','or LMN signs in 2 regions'],['R3','Other causes excluded','by tests chosen for the case'] ],
 st:{met:'met',pend:'pending',no:'not yet'},
 gcRes:{met:'Result: ALS',not:'Result: not met yet'},
 gcResSub:{met:'No grades: ALS or not ALS',not:'All three are needed'},
 bar1:'US centre: median 11.5 months to diagnosis',bar2:'Irish register: median 12.9 months to trial entry',
 barN1:'Median to diagnosis: 11.5 months',barN2:'Median to trial entry: 12.9 months',
 axis:'months from first symptom',
 now:(g,e,a)=>`Gold Coast: ${g} · Revised El Escorial: ${e} · Awaji: ${a}`,
 nowG:{met:'met (ALS)',pend:'R1 and R2 met, R3 pending',no:'not met'},
 /* accuracy and delay */
 sets:['Gold Coast','Awaji','Revised El Escorial'],
 ci:(v,lo,hi)=>`${v}% (${lo}–${hi})`,
 ciAria:(n,v,lo,hi)=>`${n}: ${v}%, 95% confidence interval ${lo} to ${hi}%`,
 months:v=>`${v} months`,
 mAria:(n,v)=>`${n}: ${v} months`,
 delay:['US centre, median','Six countries, mean','Of these, 5 in Europe','Of these, the US','After a misdiagnosis','No misdiagnosis']
};
const DX_STEPS=[
 {from:0,at:.04,k:'Month 0',t:'First symptom, one region',
  txt:`Right-hand clumsiness from weakness and wasting of the first dorsal interosseous: clinical LMN signs in the cervical region only, with no UMN signs. Revised El Escorial gives no category, because the 2000 criteria have no "suspected" level (the 1994 "suspected" needed LMN signs in at least 2 regions). Gold Coast is not met: it needs documented progression, and UMN plus LMN signs in 1 region or LMN signs in 2. <sup class="c" data-ref="CENTAURprotocol2019,deCarvalhoSwash2024,Shefner2020,Turner2022" title="Source 95,136,464,502">95,136,464,502</sup>`,
  pt:'One weak hand is not enough for any of the criteria. Doctors need to see two kinds of nerve signs, and see them get worse or spread.'},
 {from:.12,at:.17,k:'Month 4',t:'First neurology visit',
  txt:`Progression is documented by history, and the examination adds UMN signs in the same arm: brisk reflexes in a weak, wasted arm and a Hoffmann sign. With UMN and LMN signs in 1 region, revised El Escorial and Awaji both give "possible". Gold Coast R1 and R2 are met; R3, the exclusion of other causes, is still pending. <sup class="c" data-ref="CENTAURprotocol2019,Finsterer2013,Turner2022" title="Source 95,184,502">95,184,502</sup>`,
  hook:`A brisk or preserved reflex in a <b>weak, wasted</b> limb is an upper motor neuron sign: LMN loss alone would make that reflex weak. <sup class="c" data-ref="CENTAURprotocol2019,Shefner2020" title="Source 95,464">95,464</sup>`},
 {from:.26,at:.31,k:'Month 5',t:'EMG in arm and leg',
  txt:`Needle EMG shows chronic neurogenic change with fibrillation potentials in the weak arm and in 2 right-leg muscles with different roots and nerves, so the lumbosacral region shows LMN signs on EMG. Nerve conduction is normal, with no conduction block. Revised El Escorial: "probable, laboratory-supported" (UMN and LMN signs in 1 region plus EMG signs in 2 limbs). Awaji has no laboratory-supported level, but counts EMG like a clinical sign: read as worded this reaches "probable"; on a stricter reading used in some studies it stays "possible". Gold Coast R2 is now met two ways. <sup class="c" data-ref="CENTAURprotocol2019,deCarvalho2008,Finsterer2013,JangBae2015,Johnsen2019,Turner2022" title="Source 95,134,184,248,250,502">95,134,184,248,250,502</sup>`,
  hook:`Awaji 2008: with chronic neurogenic change, <b>fasciculation potentials count like fibrillations</b>, and EMG evidence counts the same as clinical LMN signs. That made "probable laboratory-supported" obsolete. <sup class="c" data-ref="deCarvalho2008,Vidovic2023" title="Source 134,519">134,519</sup>`},
 {from:.38,at:.43,k:'Months 5 to 6',t:'Other causes excluded',
  txt:`Cervical and brain MRI, the blood panel (thyroid tests, calcium, B12, protein electrophoresis, creatine kinase and others) and, where relevant, anti-GM1 antibodies and CSF show no mimic. All three Gold Coast requirements are now met, so by Gold Coast the diagnosis is ALS. The revised El Escorial and Awaji levels do not change. <sup class="c" data-ref="Garnier2024,Andersen2012EFNS,Shefner2020" title="Source 20,194,464">20,194,464</sup>`,
  pt:'Gold Coast gives a yes-or-no answer: here, yes. The older systems still say "probable" or "possible", which many people found confusing and upsetting.'},
 {from:.51,at:.56,k:'Month 9',t:'Spread to the leg',
  txt:`Brisk knee jerks and an extensor plantar response appear in the weaker leg, now also weak and wasted: UMN and LMN signs in the lumbosacral region as well as the cervical. Revised El Escorial: "clinically probable" (2 regions, with UMN signs rostral to LMN signs). Awaji: "probable" on either reading. Gold Coast: still ALS. <sup class="c" data-ref="CENTAURprotocol2019,Finsterer2013" title="Source 95,184">95,184</sup>`},
 {from:.64,at:.69,k:'Month 14',t:'Bulbar signs',
  txt:`Tongue fasciculation and wasting with a brisk jaw jerk add UMN and LMN signs in the bulbar region. Revised El Escorial: "clinically definite" (bulbar plus 2 spinal regions, 3 in all). Awaji: "definite". Gold Coast: unchanged, because it has no grades. <sup class="c" data-ref="CENTAURprotocol2019,Finsterer2013" title="Source 95,184">95,184</sup>`,
  pt:'By now the signs are in three body regions. The older systems finally call it "definite", more than a year after the first symptom.'},
 {from:.78,at:.83,k:'Context',t:'How long this usually takes',
  txt:`In the Irish register, the median time from first symptom to trial eligibility (definite or probable) was about 12.9 months, and 10% of the people who died never left the trial-ineligible levels. In a US centre, the median time from first symptom to diagnosis was 11.5 months. <sup class="c" data-ref="Traynor2000criteria,Paganoni2014" title="Source 414,497">414,497</sup>`},
 {from:.9,at:.95,k:'Keep in mind',t:'Levels count regions, not pace',
  txt:`The ladder from possible to definite reflects how many regions are involved, not prognosis. In the Irish register the level at diagnosis did not predict prognosis, and in the Dutch and Belgian registers decline was 0.84 ALSFRS-R points a month in the revised El Escorial group against 0.81 in the Gold Coast group, with wide spread in each. <sup class="c" data-ref="Traynor2000criteria,deJongh2022,Turner2022" title="Source 138,497,502">138,497,502</sup>`,
  pt:'A higher level does not mean a faster or worse course. It only means the signs have been found in more places.',
  hook:`Gold Coast = progressive motor impairment + (UMN and LMN signs in 1 region, or LMN signs in 2 regions) + other causes excluded. It removed the El Escorial certainty levels. <sup class="c" data-ref="Shefner2020,Turner2022" title="Source 464,502">464,502</sup>`}
];
/* the case, one event per step 1 to 6; each adds findings to what came before */
const DX_CASE=[
 {l:['cervical'],normal:1},
 {u:['cervical'],prog:1},
 {emg:['cervical','lumbosacral']},
 {excl:1},
 {u:['lumbosacral'],l:['lumbosacral']},
 {u:['bulbar'],l:['bulbar']}
];
const DX_EVM=[0,4,5,6,9,14];
const DX_MON=[ [0,0],[.04,0],[.12,3.4],[.17,4],[.26,4.7],[.31,5],[.38,5.6],[.43,6],[.51,8.5],[.56,9],[.64,13.4],[.69,14],[1,16] ];
/* calculator examples: u, l = regions with clinical signs; e = {region: 0 none, 1 fasciculations, 2 fibrillations} */
const DX_EX={
 arm:{u:['cervical'],l:['cervical'],e:{cervical:2,lumbosacral:2},prog:1,normal:1,excl:1},
 caseEnd:{u:['bulbar','cervical','lumbosacral'],l:['bulbar','cervical','lumbosacral'],e:{cervical:2,lumbosacral:2},prog:1,normal:1,excl:1},
 pma:{u:[],l:['cervical','lumbosacral'],e:{cervical:2,lumbosacral:2},prog:1,normal:1,excl:1},
 pls:{u:['bulbar','cervical','lumbosacral'],l:[],e:{},prog:1,normal:1,excl:1},
 fasc:{u:['cervical'],l:['cervical'],e:{cervical:1,lumbosacral:1},prog:1,normal:1,excl:1},
 rost:{u:['lumbosacral'],l:['cervical'],e:{},prog:1,normal:1,excl:1},
 clr:{u:[],l:[],e:{},prog:0,normal:0,excl:0}
};
const DX_ACC={
 sens:[{v:96,lo:93,hi:98},{v:87,lo:78,hi:93},{v:87,lo:78,hi:92}],
 spec:[{v:68,lo:53,hi:81},{v:72,lo:57,hi:83},{v:73,lo:59,hi:83}]
};
const DX_DELAY=[11.5,8.2,9.6,5.0,10.4,6.9];

function dxBlank(){const o={u:{},l:{},emg:{},two:{},both:{},prog:false,normal:false,excl:false};
  DX_R.forEach(r=>{o.u[r]=false;o.l[r]=false;o.emg[r]=0;o.two[r]=true;o.both[r]=false});return o}
function dxClone(S){return JSON.parse(JSON.stringify(S))}
/* The three rule sets, as the research file states them (GC.*, rEEC.*, AW.*). */
function dxClassify(S){
  const R=DX_R,ix=r=>R.indexOf(r),limb=r=>!!DX_LIMB[r];
  const emgOK=(r,min)=>S.emg[r]>=min&&(!limb(r)||S.two[r]);
  const U=R.filter(r=>S.u[r]);
  const Lc=R.filter(r=>S.l[r]);                          /* clinical LMN signs */
  const Le=R.filter(r=>S.l[r]||emgOK(r,1));              /* clinical or EMG (fasciculation or fibrillation potentials) */
  const both=Ls=>U.filter(r=>Ls.includes(r));
  const rost=Ls=>{for(const a of U)for(const b of Ls)if(ix(a)<ix(b))return[a,b];return null};
  const lmnUp=Ls=>{for(const a of Ls)for(const b of U)if(ix(a)<ix(b))return[a,b];return null};
  const ok=!!(S.prog&&S.excl);
  function ladder(Ls,lab){
    const UL=both(Ls),rp=rost(Ls),lu=lmnUp(Ls);
    if(UL.length>=3)return{cat:'def',why:'def',a:[UL]};
    if(rp)return{cat:'prob',why:'prob',a:rp};
    if(lab&&lab())return{cat:'lab',why:'lab',a:[]};
    if(UL.length>=1)return{cat:'poss',why:'possUL',a:[UL]};
    if(U.length>=2)return{cat:'poss',why:'possU2',a:[U]};
    if(lu)return{cat:'poss',why:'possRost',a:lu};
    return{cat:'none',why:U.length?'noneU':'noneNoU',a:[]};
  }
  /* revised El Escorial: clinical signs for the ladder; EMG denervation must be fibrillations or sharp waves */
  const emgE=R.filter(r=>emgOK(r,2));
  const limbs=(emgE.includes('cervical')?(S.both.cervical?2:1):0)+(emgE.includes('lumbosacral')?(S.both.lumbosacral?2:1):0);
  const eec=ladder(Lc,()=>U.length>=1&&limbs>=2);eec.ok=ok;
  /* Awaji: EMG counts as clinical LMN evidence; no laboratory-supported level */
  const aw=ladder(Le,null);aw.ok=ok;
  aw.emg=Le.filter(r=>!Lc.includes(r));
  aw.strict=aw.cat==='prob'&&U.length<2;
  /* Gold Coast */
  const ULg=both(Le);
  let r2=null;
  if(ULg.length)r2={how:'same',a:ULg};
  else if(Le.length>=2)r2={how:'two',a:Le};
  else if(U.length&&Le.length)r2={how:'split',u:U,l:Le};
  const gc={r1:!!(S.prog&&S.normal),r2,r3:!!S.excl};gc.met=gc.r1&&!!gc.r2&&gc.r3;
  /* notes where the rules or their readers diverge */
  const notes=[];
  if(Le.length>=2&&!U.length)notes.push(['note','pma']);
  if(U.length>=2&&!Le.length)notes.push(['note','pls']);
  const fasc=R.filter(r=>S.emg[r]===1&&emgOK(r,1));
  if(fasc.length)notes.push(['note','fasc',fasc]);
  const bad2=R.filter(r=>limb(r)&&S.emg[r]>=1&&!S.two[r]);
  if(bad2.length)notes.push(['note','two',bad2]);
  if(eec.cat==='lab'&&emgE.length<2)notes.push(['differ','limbs']);
  if(U.length>=1&&limbs<2&&emgE.length>=2&&(eec.cat==='poss'||eec.cat==='none'))notes.push(['differ','regs']);
  if(eec.cat==='lab'&&U.length>=2)notes.push(['differ','labU']);
  if(aw.strict)notes.push(['differ','strict']);
  if(r2&&r2.how==='split')notes.push(['differ','split']);
  return{gc,eec,aw,notes,U,Lc,Le};
}
/* marker shapes: UMN a triangle, LMN a hexagon, EMG a rounded square, each with its letter */
function dxMk(k,x,y,o,on,R=8){
  const col=k==='u'?'var(--umn)':'var(--lmn)',fill=on?col:'var(--panel)',st=`style="fill:${fill};stroke:${col};stroke-width:1.6;${on?'':'stroke-dasharray:2.5 2;'}"`;
  let p;
  if(k==='u')p=`<path d="M${f1(x)} ${f1(y-R*1.05)} L${f1(x+R*1.05)} ${f1(y+R*.75)} L${f1(x-R*1.05)} ${f1(y+R*.75)}Z" ${st}/>`;
  else if(k==='l')p=`<polygon points="${[0,1,2,3,4,5].map(i=>{const a=i/6*Math.PI*2+Math.PI/6;return f1(x+Math.cos(a)*R)+','+f1(y+Math.sin(a)*R)}).join(' ')}" ${st}/>`;
  else p=`<rect x="${f1(x-R*.85)}" y="${f1(y-R*.85)}" width="${f1(R*1.7)}" height="${f1(R*1.7)}" rx="3" ${st}/>`;
  const ty=k==='u'?y+R*.55:y+R*.4;
  return `<g style="opacity:${f1(o)}">${p}<text x="${f1(x)}" y="${f1(ty)}" class="t-xs t-mid" style="fill:${on?'var(--panel)':col};font-weight:700">${DX_TXT.mk[k]}</text></g>`;
}
inits.dx=()=>{
  const T=DX_TXT,svg=$('#dxSvg'),rg=$('#dxT');
  let view=store.get('dxView','eec');if(!T.view[view])view='eec';
  /* ---------- the composite case ---------- */
  const ST=[],FIRST={u:{},l:{},e:{}};
  {let S=dxBlank();ST.push(dxClone(S));
   DX_CASE.forEach((ev,k)=>{(ev.u||[]).forEach(r=>{S.u[r]=true;FIRST.u[r]=k});(ev.l||[]).forEach(r=>{S.l[r]=true;FIRST.l[r]=k});
     (ev.emg||[]).forEach(r=>{S.emg[r]=2;FIRST.e[r]=k});if(ev.prog)S.prog=true;if(ev.normal)S.normal=true;if(ev.excl)S.excl=true;ST.push(dxClone(S))})}
  const RES=ST.map(dxClassify);
  const IDX={eec:{none:0,poss:1,lab:2,prob:3,def:4},aw:{none:0,poss:1,prob:3,def:4}};
  /* where each region's markers sit on the figure, and where its leader line ends (figure units) */
  const ANC={bulbar:{u:[-8,-137],l:[8,-137],e:[0,-121],end:[17,-131]},cervical:{u:[-41,-44],l:[-46,-26],e:[-51,-8],end:[46,-34]},
    thoracic:{u:[-10,-42],l:[10,-42],e:[0,-24],end:[24,-44]},lumbosacral:{u:[-13,22],l:[-13,46],e:[-13,70],end:[20,52]}};
  function gcState(r){return r.gc.met?'met':(r.gc.r1&&r.gc.r2)?'pend':'no'}
  function catTxt(set,r){const c=r[set];return set==='aw'?T.catAw[c.cat]:T.cat[c.cat]}
  function draw(t){
    const N=vb(svg,'720 400','400 742');
    const L=N?{fig:{cx:80,cy:172,s:.92},rx:166,ry:{bulbar:48,cervical:116,thoracic:176,lumbosacral:244},
               mx:8,my:16,chip:{x:8,y:290,w:384,h:30,dx:0,dy:36},px0:8,px1:392,ty:418,
               rung:{x:30,w:200,h:30,y0:600,dy:38},defX:240,gcY:[430,482,534],gcH:44,resY:590,
               tl:{x0:20,x1:380,l1:660,b1:664,l2:684,b2:688,ax:708,tk:722},bar1:T.barN1,bar2:T.barN2}
             :{fig:{cx:92,cy:226,s:1.25},rx:180,ry:{bulbar:60,cervical:142,thoracic:212,lumbosacral:292},
               mx:300,my:22,chip:{x:300,y:34,w:132,h:44,dx:138,dy:0},px0:300,px1:708,ty:104,
               rung:{x:320,w:226,h:30,y0:272,dy:38},defX:556,gcY:[114,166,218],gcH:44,resY:270,
               tl:{x0:304,x1:700,l1:326,b1:330,l2:348,b2:352,ax:372,tk:386},bar1:T.bar1,bar2:T.bar2};
    const e=DX_CASE.map((_,k)=>ramp(t,DX_STEPS[k].from,DX_STEPS[k].at));
    let n=0;while(n<e.length&&e[n]>=.5)n++;
    const res=RES[n],S=ST[n];
    const F=L.fig,X=fx=>F.cx+fx*F.s,Y=fy=>F.cy+fy*F.s;
    const op=(k,r)=>FIRST[k][r]==null?0:e[FIRST[k][r]];
    let s='';
    /* ---- body map with region shading ---- */
    const fill={};DX_R.forEach(r=>{fill[r]=.08+.3*op('u',r)+.36*op('l',r)+.18*op('e',r)});
    s+=bodyMap(F.cx,F.cy,F.s,fill,{hide:true});
    /* a soft pulse where the first symptom starts */
    if(e[0]>0&&e[0]<1&&!RM){const[ax,ay]=ANC.cervical.l;s+=`<circle cx="${f1(X(ax))}" cy="${f1(Y(ay))}" r="${f1(8+18*e[0])}" style="fill:none;stroke:var(--lmn);stroke-width:2;opacity:${f1(1-e[0])}"/>`}
    DX_R.forEach(r=>{const A=ANC[r],ry=L.ry[r];
      ['u','l','e'].forEach(k=>{const o=op(k,r);if(o>.02){const[ax,ay]=A[k];s+=dxMk(k,X(ax),Y(ay),o,true,7.5)}});
      /* region row: name, three slots, leader line */
      const[ex,ey]=A.end;s+=`<path d="M${L.rx-6} ${ry-4} L${f1(X(ex))} ${f1(Y(ey))}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;opacity:.7"/>`;
      s+=`<text x="${L.rx}" y="${ry}" class="t-lbl">${T.reg[r]}</text>`;
      ['u','l','e'].forEach((k,i)=>{const o=op(k,r);s+=dxMk(k,L.rx+10+i*26,ry+17,1,o>=.5,9)});
    });
    /* ---- month and case tag ---- */
    const mo=interp(DX_MON,t);
    s+=`<text x="${L.mx}" y="${L.my}" class="t-big">${T.month(Math.floor(mo+.001))}</text><text x="${L.px1}" y="${L.my}" class="t-xs t-end">${T.caseTag}</text>`;
    /* ---- summary chips ---- */
    const chipV={gc:T.chipGc[gcState(res)],eec:T.catShort[res.eec.cat],aw:T.catShort[res.aw.cat]};
    ['gc','eec','aw'].forEach((k,i)=>{const C=L.chip,x=C.x+i*C.dx,y=C.y+i*C.dy,sel=k===view;
      const good=k==='gc'?res.gc.met:res[k].cat!=='none';
      s+=`<rect x="${x}" y="${y}" width="${C.w}" height="${C.h}" rx="9" style="fill:${good?(k==='gc'?'var(--good-soft)':'var(--steel-soft)'):'var(--panel-2)'};stroke:${sel?'var(--ink)':'var(--line)'};stroke-width:${sel?2.2:1}"/>`;
      if(N)s+=`<text x="${x+10}" y="${y+19}" class="t-sm">${T.chipName[k]}</text><text x="${x+C.w-10}" y="${y+20}" class="t-lbl t-end">${chipV[k]}</text>`;
      else s+=`<text x="${x+10}" y="${y+16}" class="t-xs">${T.chipName[k]}</text><text x="${x+10}" y="${y+34}" class="t-lbl">${chipV[k]}</text>`});
    /* ---- detail panel for the chosen view ---- */
    const o8=ramp(t,DX_STEPS[7].from,DX_STEPS[7].at);
    s+=`<text x="${L.px0}" y="${L.ty}" class="t-sm" style="fill:var(--ink)">${T.panelTitle[view]}</text>`;
    if(view==='gc'){
      const st=[res.gc.r1?'met':'no',res.gc.r2?'met':'no',res.gc.r3?'met':(res.gc.r1&&res.gc.r2?'pend':'no')];
      T.gcReq.forEach((q,i)=>{const y=L.gcY[i],x0=L.px0,x1=L.px1,S0=st[i];
        const pc=S0==='met'?['var(--good-soft)','var(--good)']:S0==='pend'?['var(--warn-soft)','var(--warn)']:['var(--panel-2)','var(--muted)'];
        s+=`<rect x="${x0}" y="${y}" width="${x1-x0}" height="${L.gcH}" rx="9" style="fill:var(--panel);stroke:${S0==='met'?'var(--good)':'var(--line)'};stroke-width:${S0==='met'?1.8:1}"/>`;
        s+=`<text x="${x0+12}" y="${y+28}" class="t-big">${q[0]}</text><text x="${x0+50}" y="${y+19}" class="t-lbl">${q[1]}</text><text x="${x0+50}" y="${y+35}" class="t-xs">${q[2]}</text>`;
        s+=`<rect x="${x1-82}" y="${y+12}" width="72" height="20" rx="10" style="fill:${pc[0]}"/><text x="${x1-46}" y="${y+26}" class="t-xs t-mid" style="fill:${pc[1]};font-weight:700">${T.st[S0]}</text>`});
      const m=res.gc.met,y=L.resY;
      s+=`<rect x="${L.px0}" y="${y}" width="${L.px1-L.px0}" height="36" rx="9" style="fill:${m?'var(--good-soft)':'var(--panel-2)'};stroke:${m?'var(--good)':'var(--line)'};stroke-width:${m?2:1}"/>`;
      s+=`<text x="${L.px0+12}" y="${y+23}" class="t-lbl" style="fill:${m?'var(--good)':'var(--muted)'}">${m?T.gcRes.met:T.gcRes.not}</text><text x="${L.px1-12}" y="${y+23}" class="t-xs t-end">${m?T.gcResSub.met:T.gcResSub.not}</text>`;
    }else{
      const I=IDX[view],R=L.rung,ry=i=>R.y0-i*R.dy;
      if(res[view].cat!=='none'&&!res[view].ok)s+=`<text x="${L.px1}" y="${L.ty}" class="t-xs t-end" style="fill:var(--warn);font-weight:700">${T.pendTag}</text>`;
      let k=-1;e.forEach((v,i)=>{if(v>0)k=i});
      const pos=k<0?I[RES[0][view].cat]:lerp(I[RES[k][view].cat],I[RES[k+1][view].cat],ease(e[k]));
      const curI=I[res[view].cat];
      for(let i=0;i<5;i++){const y=ry(i),del=view==='aw'&&i===2,cur=i===curI;
        s+=`<rect x="${R.x}" y="${y}" width="${R.w}" height="${R.h}" rx="8" style="fill:${cur?'var(--steel-soft)':i<curI?'var(--panel-2)':'var(--panel)'};stroke:${cur?'var(--steel)':'var(--line)'};stroke-width:${cur?2.4:1};${del?'stroke-dasharray:4 3;':''}opacity:${del?.6:1}"/>`;
        s+=`<text x="${R.x+12}" y="${y+20}" class="t-lbl" style="fill:${cur?'var(--steel)':del?'var(--muted)':'var(--ink)'}">${T.rung[view][i]}</text>`;
        if(del)s+=`<line x1="${R.x+10}" x2="${R.x+R.w-10}" y1="${y+15}" y2="${y+15}" style="stroke:var(--muted);stroke-width:1.4"/>`;
        let lines=T.rungDef[view][i];
        if(view==='aw'&&i===1&&res.aw.strict)lines=T.strictLines;
        if(o8<.5)s+=`<text x="${L.defX}" y="${y+12}" class="t-xs" style="opacity:${f1(1-o8*2)};${view==='aw'&&i===1&&res.aw.strict?'fill:var(--warn);font-weight:700':''}"><tspan x="${L.defX}">${lines[0]}</tspan><tspan x="${L.defX}" dy="12">${lines[1]}</tspan></text>`;
        if(view==='aw'&&i===1&&res.aw.strict)s+=`<rect x="${R.x-4}" y="${y-4}" width="${R.w+8}" height="${R.h+8}" rx="10" style="fill:none;stroke:var(--warn);stroke-width:1.6;stroke-dasharray:5 3"/>`;
      }
      if(o8>0){s+=`<g style="opacity:${f1(o8)}">`;T.paceLines.forEach((ln,j)=>{s+=`<text x="${L.defX}" y="${ry(4)+12+j*16}" class="t-xs" style="${j<2?'fill:var(--ink);font-weight:700':''}">${ln}</text>`});s+='</g>'}
      const py=ry(pos)+R.h/2;
      s+=`<path d="M${R.x-16} ${f1(py-8)} L${R.x-4} ${f1(py)} L${R.x-16} ${f1(py+8)}Z" style="fill:var(--steel)"/>`;
    }
    /* ---- month timeline with the context bars ---- */
    const TL=L.tl,xm=m=>TL.x0+m/16*(TL.x1-TL.x0),o7=ramp(t,DX_STEPS[6].from,DX_STEPS[6].at);
    if(o7>0){s+=`<g style="opacity:${f1(o7)}">`;
      s+=`<text x="${TL.x0}" y="${TL.l1}" class="t-xs" style="fill:var(--ink)">${L.bar1}</text><rect x="${TL.x0}" y="${TL.b1}" width="${f1((xm(11.5)-TL.x0)*ease(o7))}" height="8" rx="4" style="fill:var(--steel);opacity:.8"/>`;
      s+=`<text x="${TL.x0}" y="${TL.l2}" class="t-xs" style="fill:var(--ink)">${L.bar2}</text><rect x="${TL.x0}" y="${TL.b2}" width="${f1((xm(12.9)-TL.x0)*ease(o7))}" height="8" rx="4" style="fill:var(--umn);opacity:.7"/>`;
      s+='</g>'}
    s+=`<line x1="${TL.x0}" x2="${TL.x1}" y1="${TL.ax}" y2="${TL.ax}" class="axis" style="stroke:var(--muted)"/>`;
    for(let m=0;m<=16;m+=2)s+=`<line x1="${f1(xm(m))}" x2="${f1(xm(m))}" y1="${TL.ax-3}" y2="${TL.ax+3}" style="stroke:var(--muted)"/><text x="${f1(xm(m))}" y="${TL.tk}" class="t-xs t-mid">${m}</text>`;
    s+=`<text x="${TL.x1}" y="${TL.tk+13}" class="t-xs t-end">${T.axis}</text>`;
    DX_EVM.forEach((m,i)=>{const on=e[i]>=.5;s+=`<circle cx="${f1(xm(m))}" cy="${TL.ax}" r="5" style="fill:${on?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1.2"/>`});
    s+=`<path d="M${f1(xm(mo)-6)} ${TL.ax-14} L${f1(xm(mo)+6)} ${TL.ax-14} L${f1(xm(mo))} ${TL.ax-5}Z" style="fill:var(--tdp)"/>`;
    svg.innerHTML=s;
    const p=phaseOf(DX_STEPS,t);setSt(p);
    const nowLine=T.now(T.nowG[gcState(res)],catTxt('eec',res),catTxt('aw',res));
    $('#dxNote').innerHTML=noteHTML(DX_STEPS[p])+`<p class="readout"><b>${nowLine}</b></p>`;
  }
  const stop=playWire(rg,$('#dxPlay'),draw,22000,UI.replay,'dx');
  const setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  toggleRow($('#dxView'),[['gc',T.view.gc],['eec',T.view.eec],['aw',T.view.aw]],view,v=>{view=v;store.set('dxView',v);draw(+rg.value)});
  $('#dxLegend').innerHTML=['u','l','e'].map(k=>`<span class="lg"><svg viewBox="0 0 20 20" aria-hidden="true">${dxMk(k,10,10,1,true,8)}</svg>${T.legend[k]}</span>`).join('');
  draw(+rg.value);

  /* ---------- calculator ---------- */
  const C=dxBlank();
  $('#dxRegs').innerHTML=DX_R.map(r=>`<fieldset data-r="${r}"><legend>${T.reg[r]}</legend><p class="dx-def">${T.regEx[r]}</p>
    <button class="btn dx-tg" data-k="u" aria-pressed="false"><span class="tag umn">${T.umnTag}</span><span>${T.umnBtn}<small>${T.umnHint[r]}</small></span></button>
    <button class="btn dx-tg" data-k="l" aria-pressed="false"><span class="tag lmn">${T.lmnTag}</span><span>${T.lmnBtn}<small>${T.lmnHint[r]}</small></span></button>
    <div role="group" aria-label="${T.emgGroup(T.regLow[r])}"><p class="dx-def">${T.emgLbl}</p><div class="dx-seg">${T.emgOpt.map((o,i)=>`<button class="btn" data-k="e" data-v="${i}" aria-pressed="${i===0}">${o}</button>`).join('')}</div></div>
    ${DX_LIMB[r]?`<label class="dx-ck"><input type="checkbox" data-k="two" checked><span>${T.two}<small>${T.twoSub}</small></span></label><label class="dx-ck"><input type="checkbox" data-k="both"><span>${T.both}<small>${T.bothSub}</small></span></label>`:''}
  </fieldset>`).join('');
  function sync(){
    $$('#dxRegs fieldset').forEach(fs=>{const r=fs.dataset.r;
      $('[data-k="u"]',fs).setAttribute('aria-pressed',C.u[r]);$('[data-k="l"]',fs).setAttribute('aria-pressed',C.l[r]);
      $$('[data-k="e"]',fs).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.v===C.emg[r]));
      const tw=$('[data-k="two"]',fs),bo=$('[data-k="both"]',fs);if(tw)tw.checked=C.two[r];if(bo)bo.checked=C.both[r]});
    $('#dxProg').checked=C.prog;$('#dxNorm').checked=C.normal;$('#dxExcl').checked=C.excl;
  }
  function verdict(set,R){const c=R[set],nm=set==='eec'?T.eecName:T.awName,names=set==='aw'?T.catAw:T.cat;
    const cls=c.cat==='none'?'':c.ok?'yes':'pend';
    const args=c.a.map(x=>Array.isArray(x)?T.list(x.map(r=>T.regLow[r])):T.regLow[x]);
    let h=`<div class="dx-v ${cls}"><span class="kicker">${nm}</span><strong>${c.cat==='none'||c.ok?names[c.cat]:T.notYet}</strong>`;
    if(c.cat!=='none'&&!c.ok)h+=`<p>${T.pend(names[c.cat])}</p>`;
    h+=`<p>${T.why[c.why](...args)}</p>`;
    if(set==='eec'&&(c.cat==='poss'||c.cat==='prob'||c.cat==='def'))h+=`<p class="dx-def">${T.eecClin}</p>`;
    if(set==='aw'&&c.emg.length)h+=`<p class="dx-def">${T.awEmg(T.list(c.emg.map(r=>T.regLow[r])))}</p>`;
    return h+'</div>'}
  function render(){
    const R=dxClassify(C),g=R.gc,rl=a=>T.list(a.map(r=>T.regLow[r]));
    let h=`<div class="dx-v ${g.met?'yes':''}"><span class="kicker">${T.gcName}</span><strong>${g.met?T.gcMet:T.gcNot}</strong><ul>`;
    h+=`<li>${g.r1?T.r1ok:!C.prog?T.r1noP:T.r1noN}</li>`;
    h+=`<li>${!g.r2?T.r2no:g.r2.how==='same'?T.r2same(rl(g.r2.a)):g.r2.how==='two'?T.r2two(g.r2.a.length,rl(g.r2.a)):T.r2split(rl(g.r2.u),rl(g.r2.l))}</li>`;
    h+=`<li>${g.r3?T.r3ok:T.r3no}</li></ul></div>`;
    h+=verdict('eec',R)+verdict('aw',R);
    if(R.notes.length)h+=`<div class="dx-notes">${R.notes.map(([kind,id,arg])=>{const v=T.n[id];
      return `<p><span class="tag ${kind==='differ'?'warn':'steel'}">${kind==='differ'?T.tagDiffer:T.tagNote}</span>${typeof v==='function'?v(rl(arg)):v}</p>`}).join('')}</div>`;
    $('#dxOut').innerHTML=h;
    const sh=set=>{const c=R[set],v=T.catShort[c.cat];return c.cat!=='none'&&!c.ok?T.sumPend(v):v};
    $('#dxSum').innerHTML=T.sum(g.met?T.sumG.met:T.sumG.not,sh('eec'),sh('aw'));
  }
  function load(id){const E=DX_EX[id];Object.assign(C,dxBlank());
    E.u.forEach(r=>C.u[r]=true);E.l.forEach(r=>C.l[r]=true);Object.keys(E.e).forEach(r=>C.emg[r]=E.e[r]);
    C.prog=!!E.prog;C.normal=!!E.normal;C.excl=!!E.excl;sync();render()}
  $('#dxEx').insertAdjacentHTML('beforeend',Object.keys(DX_EX).map(k=>`<button class="btn" data-dxex="${k}">${T.ex[k]}</button>`).join(''));
  $('#dxEx').addEventListener('click',ev=>{const b=ev.target.closest('[data-dxex]');if(b)load(b.dataset.dxex)});
  $('#dxRegs').addEventListener('click',ev=>{const b=ev.target.closest('button[data-k]');if(!b)return;const r=b.closest('fieldset').dataset.r,k=b.dataset.k;
    if(k==='u')C.u[r]=!C.u[r];else if(k==='l')C.l[r]=!C.l[r];else if(k==='e')C.emg[r]=+b.dataset.v;sync();render()});
  $('#dxRegs').addEventListener('change',ev=>{const i=ev.target.closest('input[data-k]');if(!i)return;const r=i.closest('fieldset').dataset.r;C[i.dataset.k][r]=i.checked;render()});
  [['dxProg','prog'],['dxNorm','normal'],['dxExcl','excl']].forEach(([id,k])=>$('#'+id).addEventListener('change',()=>{C[k]=$('#'+id).checked;render()}));
  load('arm');

  /* ---------- accuracy and delay bars ---------- */
  const fr=(nm,v,lo,hi)=>`<div class="dx-fr"><span class="nm">${nm}</span><span class="trk" role="img" aria-label="${T.ciAria(nm,v,lo,hi)}"><i style="width:${v}%;background:var(--steel)"></i><s style="left:${lo}%;width:${hi-lo}%"></s><b style="left:${v}%;background:var(--steel)"></b></span><span class="val">${T.ci(v,lo,hi)}</span></div>`;
  $('#dxSens').innerHTML=DX_ACC.sens.map((d,i)=>fr(T.sets[i],d.v,d.lo,d.hi)).join('');
  $('#dxSpec').innerHTML=DX_ACC.spec.map((d,i)=>fr(T.sets[i],d.v,d.lo,d.hi)).join('');
  $('#dxDelay').innerHTML=DX_DELAY.map((v,i)=>`<div class="dx-fr"><span class="nm">${T.delay[i]}</span><span class="trk" role="img" aria-label="${T.mAria(T.delay[i],v)}"><i style="width:${f1(v/12*100)}%;background:${i<2?'var(--steel)':'var(--muted)'};opacity:.75"></i></span><span class="val">${T.months(v)}</span></div>`).join('');
};
/* =============== 2.2 the differential =============== */
const DD_TXT={
 n0:['Progressive weakness','over weeks to months'],
 q1:['Sensory signs, or abnormal','sensory nerve tests?'],
 q2:['Conduction block or','demyelination on NCS?'],
 q3:['Which pattern of signs?','myopathy, cord, junction, LMN, UMN'],
 yes:'yes',no:'no',flag:'RED FLAG',
 sens:['Look beyond ALS','copper deficiency, motor CIDP,','Kennedy disease (low SNAPs)'],
 block:['Motor neuropathy','MMN, motor CIDP,','radiation plexopathy'],
 leaf:{myo:['Myopathy','IBM','muscle biopsy'],mye:['Myelopathy','neck spondylosis','cervical MRI'],nmj:['NMJ','bulbar myasthenia','RNS, antibodies'],
       ken:['LMN only','Kennedy disease','AR CAG repeats'],umn:['UMN only','PLS, HSP','time, family'],als:['UMN + LMN','spreading, no','red flags: ALS']},
 side:['Alongside every step','History: polio,','radiation, HIV risk','Bloods: thyroid,','calcium, copper','Normal EMG: benign','fasciculations','Rare: hexosaminidase A'],
 sideN:['Alongside every step','History: polio, radiation, HIV risk','Bloods: thyroid, calcium, copper','Normal EMG: benign fasciculations','Rare: hexosaminidase A deficiency'],
 strip:'Registers: 7.3% (Ireland) and 8% (Scotland) of people first diagnosed with ALS or MND later had another condition',
 stripN:['Registers: 7.3% (Ireland) and 8% (Scotland)','later had another condition'],
 selTag:n=>`Selected: ${n}`,
 cardNone:['No condition selected','Pick a condition above, or click a row in the table, to see where it branches off in the tree.'],
 dt:{feat:'What sets it apart',test:'Key test',where:'Where it branches off'},
 where:{sens:'Question 1: sensory signs',block:'Question 2: conduction block',myo:'Question 3: myopathy pattern',mye:'Question 3: myelopathy pattern',nmj:'Question 3: junction pattern',
        ken:'Question 3: LMN-only pattern',umn:'Question 3: UMN-only pattern',side:'History and blood tests, alongside every step',als:'Reference'},
 none:'None'
};
const DD_STEPS=[
 {from:0,at:.05,k:'Start',t:'Progressive weakness',
  txt:`ALS usually begins as steadily progressive, often asymmetric weakness without significant sensory symptoms. Population studies suggest that nearly 10% of people diagnosed with ALS turn out to have another condition, and a few conditions account for most of them, several of them treatable. <sup class="c" data-ref="TurnerTalbot2013,Ghasemi2016" title="Source 202,503">202,503</sup>`,
  pt:'Several other conditions can look like ALS early on, some of them treatable, so doctors check for them first.'},
 {from:.2,at:.28,k:'Question 1',t:'Sensory signs point elsewhere',
  txt:`Prominent sensory features are a red flag. Copper deficiency myelopathy brings sensory ataxia and dorsal-column signs, motor-predominant CIDP has mild sensory features, and Kennedy disease has low or absent sensory nerve action potentials. Since the 2000 revision, a mild sensory neuropathy on its own no longer excludes ALS. <sup class="c" data-ref="Ghasemi2016,Garnier2024,Kumar2004,TurnerTalbot2013,deCarvalhoSwash2024" title="Source 136,194,202,273,503">136,194,202,273,503</sup>`},
 {from:.4,at:.48,k:'Question 2',t:'Conduction block: think MMN',
  txt:`Conduction block or demyelination on nerve conduction studies argues against ALS. Multifocal motor neuropathy is pure motor, asymmetric and arm-predominant, with weakness greater than wasting, and it responds to IVIG; it was the commonest mimic (22%) in the Irish register. Motor CIDP shows slowed conduction, and radiation plexopathy shows myokymic discharges with a block that does not resolve. Denervation in one nerve's territory rather than a myotome also favours a neuropathy. <sup class="c" data-ref="TurnerTalbot2013,Lawson2014,Traynor2000mimic,deCarvalhoSwash2024" title="Source 136,285,498,503">136,285,498,503</sup>`,
  hook:`MMN: <b>conduction block</b> (diagnostic but not always found), anti-GM1 IgM in about half, response to <b>IVIG</b> but not to steroids or plasma exchange, no bulbar signs, normal life expectancy. <sup class="c" data-ref="TurnerTalbot2013,Lawson2014" title="Source 285,503">285,503</sup>`},
 {from:.6,at:.68,k:'Question 3',t:'Which pattern fits?',
  txt:`Myopathy: inclusion body myositis weakens quadriceps and finger flexors without fasciculations or UMN signs, and its EMG can look neurogenic. Myelopathy: cervical spondylosis can give UMN and LMN signs, but neck pain, sphincter change and no signs above the neck point to it. Junction: bulbar myasthenia fluctuates and often brings ptosis or double vision. LMN only and very slow, with gynaecomastia: Kennedy disease. UMN only: PLS and HSP, separated by time, family history and genes. <sup class="c" data-ref="TurnerTalbot2013,deCarvalhoSwash2024,Garnier2024,Turner2020PLS" title="Source 136,194,501,503">136,194,501,503</sup>`,
  hook:`Treatable mimics to exclude: MMN with conduction block (IVIG), cervical spondylotic myelopathy, bulbar myasthenia gravis, and Kennedy disease (low SNAPs, gynaecomastia, CAG expansion in <i>AR</i>). <sup class="c" data-ref="TurnerTalbot2013,Lawson2014,Garnier2024,LaSpada_GeneReviews" title="Source 194,284,285,503">194,284,285,503</sup>`},
 {from:.8,at:.88,k:'No red flags',t:'An ALS pattern, still reviewed',
  txt:`When UMN and LMN signs spread with no red flags, the criteria apply, and the diagnosis is still reviewed. In the Irish register 7.3% of referrals were later rediagnosed, and 84% of those mimics had met only the "suspected" or "possible" levels. In the Scottish register 8% had another diagnosis, half of them with a potentially helpful treatment; failure to progress, atypical features or test results prompted the change. <sup class="c" data-ref="Traynor2000mimic,Davenport1996" title="Source 133,498">133,498</sup>`,
  pt:'If the picture stops fitting, for example because it does not get worse, doctors think again.'}
];
/* cells: UMN, LMN, sensory, sphincters, eye movements, pace, key test. '–' = not described in the sources read */
const DD_MIM=[
 {id:'als',n:'ALS (reference)',full:'ALS, for reference',node:'als',
  c:['Yes','Yes','No significant sensory symptoms','Disturbance argues against ALS','Palsy argues against ALS','Steadily progressive, often asymmetric at first',`Criteria plus exclusion; EMG of all four regions <sup class="c" data-ref="TurnerTalbot2013,Garnier2024" title="Source 194,503">194,503</sup>`],
  feat:'Upper and lower motor neuron signs together, spreading between regions over time.'},
 {id:'mmn',n:'MMN',full:'Multifocal motor neuropathy (MMN)',node:'block',
  c:['No (a nerve disease)','Yes: distal, arm-predominant, weakness greater than wasting','No: normal sensory conduction across the blocked segments','–','–','Life expectancy normal; no bulbar involvement',`Conduction block on NCS (diagnostic, not always found); anti-GM1 IgM about 50%; responds to IVIG <sup class="c" data-ref="TurnerTalbot2013,Lawson2014" title="Source 285,503">285,503</sup>`],
  feat:`Pure motor and asymmetric, often finger or wrist extensors. Men outnumber women 3 to 1, mean onset is about 40, and no cases are reported over 70. It does not respond to steroids or plasma exchange. <sup class="c" data-ref="TurnerTalbot2013,Lawson2014" title="Source 285,503">285,503</sup>`},
 {id:'csm',n:'Cervical myelopathy',full:'Cervical spondylotic myelo-radiculopathy',node:'mye',
  c:['Yes','Yes','Can be absent: the picture can be pure motor','Involvement is a clue against ALS','–','–',`Cervical MRI read alongside EMG <sup class="c" data-ref="TurnerTalbot2013,Ghasemi2016,Garnier2024" title="Source 194,202,503">194,202,503</sup>`],
  feat:`Prominent neck pain and sphincter involvement point to it. Signs above the neck, fasciculations in bulbar or leg territory, and LMN signs wider than the lesion favour ALS. Incidental spondylosis is common at ALS ages, and avoiding unnecessary surgery is a stated concern. <sup class="c" data-ref="TurnerTalbot2013,Ghasemi2016" title="Source 202,503">202,503</sup>`},
 {id:'sbma',n:'Kennedy disease',full:'Kennedy disease (spinal and bulbar muscular atrophy, SBMA)',node:'ken',
  c:['No','Yes: bulbar and limb, chin or perioral fasciculation','Low or absent SNAPs (sensory ganglionopathy)','–','–','Very slow: median age 44 at weakness, 61 at wheelchair use',`CAG expansion in the androgen receptor gene <i>AR</i> (more than 35 repeats) <sup class="c" data-ref="LaSpada_GeneReviews,deCarvalhoSwash2024,Atsuta2006" title="Source 30,136,284">30,136,284</sup>`],
  feat:`X-linked, so it affects men. Postural tremor, gynaecomastia, testicular atrophy and a mildly raised CK. In 223 Japanese men, hand tremor began at a median 33 years, and onset age tracked CAG length while the rate of progression did not. <sup class="c" data-ref="deCarvalhoSwash2024,TurnerTalbot2013,Atsuta2006" title="Source 30,136,503">30,136,503</sup>`},
 {id:'ibm',n:'IBM',full:'Inclusion body myositis (IBM)',node:'myo',
  c:['No','Weakness and wasting from muscle disease; no fasciculations','–','–','–','Slow and painless; usually over 50',`Muscle biopsy (rimmed vacuoles) and muscle MRI; CK often over 1000 IU/L but can be normal <sup class="c" data-ref="TurnerTalbot2013,deCarvalhoSwash2024" title="Source 136,503">136,503</sup>`],
  feat:`Quadriceps and finger flexors, often asymmetric, with medial forearm wasting and swallowing problems in about a third; men outnumber women 3 to 1. EMG can look neurogenic, a known pitfall. Anti-cN1A antibodies were found in 33% of 311 European patients, so a negative test does not exclude IBM. <sup class="c" data-ref="TurnerTalbot2013,deCarvalhoSwash2024,Lilleker2017" title="Source 136,291,503">136,291,503</sup>`},
 {id:'mg',n:'Bulbar myasthenia',full:'Bulbar myasthenia gravis',node:'nmj',
  c:['No','Fatigable bulbar weakness; no fasciculation','–','–','Often ptosis or double vision','Fluctuating',`Repetitive nerve stimulation; AChR and MuSK antibodies <sup class="c" data-ref="Garnier2024,TurnerTalbot2013" title="Source 194,503">194,503</sup>`],
  feat:`Decrement on repetitive stimulation can also occur in ALS, and rare false-positive AChR antibodies are reported in MND, so neither test alone excludes ALS. Cholinesterase inhibitors can give brief relief in MND too. <sup class="c" data-ref="Garnier2024,TurnerTalbot2013,Ghasemi2016" title="Source 194,202,503">194,202,503</sup>`},
 {id:'pls',n:'PLS',full:'Primary lateral sclerosis (PLS)',node:'umn',
  c:['Yes, in at least 2 of 3 regions','No active LMN degeneration (minor EMG changes allowed)','No unexplained sensory symptoms','–','–','Slow: progressive UMN symptoms for at least 2 years',`Time and serial EMG: probable PLS at 2–4 years without active LMN degeneration, definite at 4 years or more <sup class="c" data-ref="Turner2020PLS" title="Source 501">501</sup>`],
  feat:`Rare (under 2–3% of MND) and part of the MND spectrum. It does not meet Gold Coast, but under revised El Escorial UMN signs alone in 2 regions are "possible ALS". In one series, 13 of 29 people with pure UMN onset later developed LMN signs, at an average of 3–4 years. <sup class="c" data-ref="Turner2020PLS,Turner2022,CENTAURprotocol2019" title="Source 95,501,502">95,501,502</sup>`},
 {id:'hsp',n:'HSP',full:'Hereditary spastic paraplegia (HSP)',node:'umn',
  c:['Yes: spastic paraparesis','–','Sometimes dorsal-column signs','Sometimes','–','Very slow, younger onset',`Family history and a genetic panel; <i>SPAST</i> variants in about 40% of familial cases <sup class="c" data-ref="TurnerTalbot2013,Ghasemi2016" title="Source 202,503">202,503</sup>`],
  feat:`Minimal arm and no severe bulbar involvement. The family history, often autosomal dominant, is the main clue. <sup class="c" data-ref="TurnerTalbot2013,Ghasemi2016" title="Source 202,503">202,503</sup>`},
 {id:'bfs',n:'Benign fasciculations',full:'Benign fasciculation syndrome',node:'side',
  c:['No','Fasciculations without weakness or EMG denervation','–','–','–','No progression: none of 121 people developed MND over 2–32 years',`Normal strength and normal EMG <sup class="c" data-ref="Blexrud1993,TurnerTalbot2013" title="Source 65,503">65,503</sup>`],
  feat:`In a 2021 series, minor chronic neurogenic EMG changes in some older men stayed stable. One tertiary clinic reassures people under 40 with fasciculations, no weakness and normal thyroid tests and electrolytes without EMG. <sup class="c" data-ref="Montalvo2021,TurnerTalbot2013" title="Source 342,503">342,503</sup>`},
 {id:'hexa',n:'Hexosaminidase A deficiency',full:'Adult hexosaminidase A deficiency (late-onset GM2 gangliosidosis)',node:'side',
  c:['Yes','Yes','SNAPs may be abnormal','–','–','–',`Hexosaminidase A enzyme assay or <i>HEXA</i> genotyping <sup class="c" data-ref="Ghasemi2016" title="Source 202">202</sup>`],
  feat:`Combined UMN and LMN involvement with cerebellar and extrapyramidal signs, psychosis or dementia; EMG may show complex repetitive discharges. Screening 115 Israeli people with sporadic ALS found only 2 carriers, so it is a very unlikely cause. <sup class="c" data-ref="Ghasemi2016,Drory2003" title="Source 147,202">147,202</sup>`},
 {id:'pps',n:'Post-polio syndrome',full:'Post-polio syndrome',node:'side',
  c:['Few or none','Yes: new weakness, wasting and fatigue','–','–','–','Slow, after usually 15 or more stable years; symptoms for at least 1 year',`History of paralytic polio (March of Dimes criteria) and exclusion of other causes <sup class="c" data-ref="LiHiShing2019,Ghasemi2016" title="Source 202,290">202,290</sup>`],
  feat:`MND arising in someone who had polio shows no more than a coincidental link. <sup class="c" data-ref="TurnerTalbot2013" title="Source 503">503</sup>`},
 {id:'cidp',n:'Motor CIDP',full:'Motor-predominant chronic inflammatory demyelinating polyneuropathy (CIDP)',node:'block',
  c:['No (a nerve disease)','Yes: symmetric weakness','Mild','–','–','Fluctuating or relapsing',`Demyelinating nerve conduction (slowed velocities) <sup class="c" data-ref="TurnerTalbot2013" title="Source 503">503</sup>`],
  feat:`Up to a third of CIDP is motor-predominant. It responds poorly to corticosteroids, which favours IVIG first. <sup class="c" data-ref="TurnerTalbot2013" title="Source 503">503</sup>`},
 {id:'rad',n:'Radiation plexopathy',full:'Radiation-induced plexopathy or radiculopathy',node:'block',
  c:['No (a nerve disease)','Yes, after pelvic or para-aortic radiotherapy','Often none','–','–','Very slow; latency can be decades (33 years in one case)',`Exposure history; myokymic discharges and non-resolving conduction block on EMG and NCS <sup class="c" data-ref="TurnerTalbot2013,Ghasemi2016" title="Source 202,503">202,503</sup>`],
  feat:`The brachial plexus form after breast cancer treatment usually has a shorter latency and pain. <sup class="c" data-ref="TurnerTalbot2013,Ghasemi2016" title="Source 202,503">202,503</sup>`},
 {id:'thy',n:'Thyroid and parathyroid',full:'Hyperthyroidism and hyperparathyroidism',node:'side',
  c:['Hyperreflexia','Fasciculations (florid in about 10% of thyrotoxic people), weakness, weight loss','–','–','–','Usually with heat intolerance, tremor, fast heart rate',`Thyroid function; serum calcium for hyperparathyroidism (both in the EFNS panel) <sup class="c" data-ref="Ghasemi2016,TurnerTalbot2013,Garnier2024" title="Source 194,202,503">194,202,503</sup>`],
  feat:`Hyperparathyroidism can mimic LMN-onset ALS. <sup class="c" data-ref="Ghasemi2016" title="Source 202">202</sup>`},
 {id:'cu',n:'Copper deficiency',full:'Copper deficiency myelopathy',node:'sens',
  c:['Yes: spastic gait','–','Prominent sensory ataxia, dorsal-column signs','–','–','–',`Serum copper and ceruloplasmin, with zinc <sup class="c" data-ref="Kumar2004,Kumar2006" title="Source 273,274">273,274</sup>`],
  feat:`Resembles B12 subacute combined degeneration. Causes include earlier gastric surgery, excess zinc and malabsorption. The sensory features usually separate it from ALS. <sup class="c" data-ref="Kumar2004,Kumar2006,TurnerTalbot2013" title="Source 273,274,503">273,274,503</sup>`},
 {id:'hiv',n:'HIV and HTLV-1',full:'HIV and HTLV-1-associated syndromes',node:'side',
  c:['HTLV-1 myelopathy can look like ALS','HIV: ALS-like, often one limb first','–','–','–','HIV: spread over weeks; stabilised or improved on antiretrovirals',`HIV or HTLV serology when there is a risk <sup class="c" data-ref="Ghasemi2016,Garnier2024,Kuroda1991" title="Source 194,202,276">194,202,276</sup>`],
  feat:`In a review of 1700 HIV-positive people with neurological symptoms, 6 had an ALS-like syndrome; they were younger. An autopsy report describes HTLV-1 myelopathy with ALS-like features. <sup class="c" data-ref="Ghasemi2016,Kuroda1991,deCarvalhoSwash2024" title="Source 136,202,276">136,202,276</sup>`}
];
inits.ddx=()=>{
  const T=DD_TXT,svg=$('#ddSvg'),rg=$('#ddT');let sel=null;
  const LEAVES=['myo','mye','nmj','ken','umn','als'];
  function box(x,y,w,h,lit,cur,hl,o=1,col='var(--steel)',soft='var(--steel-soft)'){
    return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:${lit?soft:'var(--panel)'};stroke:${hl?'var(--ink)':lit?col:'var(--line)'};stroke-width:${hl?3:cur?2.4:1.2};opacity:${f1(o)}"/>`}
  function lines(x,y,arr,first,mid){let s='';arr.forEach((ln,i)=>{s+=`<text x="${f1(x)}" y="${f1(y+(i?14+(i-1)*12:0))}" class="${i===0&&first?first:'t-xs'}${mid?' t-mid':''}">${ln}</text>`});return s}
  function draw(t){
    const N=vb(svg,'720 440','400 824');
    const L=N?{n0:[10,10,380,44],q1:[10,74,380,44],q2:[10,204,380,44],q3:[10,334,380,44],sens:[50,128,340,62],block:[50,258,340,62],
               leaf:i=>[10+(i%2)*195,402+Math.floor(i/2)*76,185,56],grp:[4,392,392,224],side:[10,630,380,112],strip:[10,762,380,50],spineX:24,yesX:120}
             :{n0:[214,10,236,44],q1:[214,80,236,44],q2:[214,150,236,44],q3:[214,220,236,44],sens:[474,74,238,62],block:[474,144,238,62],
               leaf:i=>[8+i*119,300,111,64],side:[8,74,186,196],strip:[8,388,704,40]};
    const lit={q1:ramp(t,.2,.28),sens:ramp(t,.24,.3),q2:ramp(t,.4,.48),block:ramp(t,.44,.5),q3:ramp(t,.6,.68),als:ramp(t,.8,.88),strip:ramp(t,.84,.9)};
    LEAVES.slice(0,5).forEach((k,i)=>lit[k]=ramp(t,.64+.03*i,.68+.03*i));
    const p=phaseOf(DD_STEPS,t),M=sel?DD_MIM.find(m=>m.id===sel):null,hn=M?M.node:null;
    /* the path to the selected condition: which spine steps it passes */
    const depth={sens:1,block:2,myo:3,mye:3,nmj:3,ken:3,umn:3,als:3,side:0}[hn]??-1;
    let s=`<defs>${marker('ddA')}${marker('ddB','var(--steel)')}${marker('ddC','var(--ink)')}</defs>`;
    const arrow=(d,on,hl)=>`<path d="${d}" class="arrow" style="${hl?'stroke:var(--ink);stroke-width:3':on?'stroke:var(--steel);stroke-width:2.2':''}" marker-end="url(#${hl?'ddC':on?'ddB':'ddA'})"/>`;
    const lbl=(x,y,txt,on,mid)=>`<text x="${f1(x)}" y="${f1(y)}" class="t-xs${mid?' t-mid':''}" style="fill:${on?'var(--steel)':'var(--muted)'};font-weight:700">${txt}</text>`;
    /* ---- connectors ---- */
    if(N){const X=L.spineX;
      s+=arrow(`M${X} 54 L${X} 72`,lit.q1>.5,depth>=1);
      s+=arrow(`M${X} 118 L${X} 202`,lit.q2>.5,depth>=2)+lbl(X+5,166,T.no,lit.q2>.5);
      s+=arrow(`M${X} 248 L${X} 332`,lit.q3>.5,depth>=3)+lbl(X+5,296,T.no,lit.q3>.5);
      s+=arrow(`M${L.yesX} 118 L${L.yesX} 126`,lit.sens>.5,hn==='sens')+lbl(L.yesX+8,125,T.yes,lit.sens>.5);
      s+=arrow(`M${L.yesX} 248 L${L.yesX} 256`,lit.block>.5,hn==='block')+lbl(L.yesX+8,255,T.yes,lit.block>.5);
      s+=arrow(`M200 378 L200 390`,lit.q3>.5,depth>=3);
      const G=L.grp;s+=`<rect x="${G[0]}" y="${G[1]}" width="${G[2]}" height="${G[3]}" rx="12" style="fill:none;stroke:var(--line);stroke-dasharray:4 3"/>`;
    }else{
      s+=arrow('M332 54 L332 78',lit.q1>.5,depth>=1);
      s+=arrow('M332 124 L332 148',lit.q2>.5,depth>=2)+lbl(340,140,T.no,lit.q2>.5);
      s+=arrow('M332 194 L332 218',lit.q3>.5,depth>=3)+lbl(340,210,T.no,lit.q3>.5);
      s+=arrow('M450 102 L472 102',lit.sens>.5,hn==='sens')+lbl(461,95,T.yes,lit.sens>.5,1);
      s+=arrow('M450 172 L472 172',lit.block>.5,hn==='block')+lbl(461,165,T.yes,lit.block>.5,1);
      LEAVES.forEach((k,i)=>{const B=L.leaf(i),x2=B[0]+B[2]/2;s+=arrow(`M332 264 C332 282 ${f1(x2)} 280 ${f1(x2)} 298`,lit[k]>.5,hn===k)});
      s+=`<path d="M194 172 L212 172" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    }
    /* ---- the travelling pulse ---- */
    if(!RM){const segs=N?[ [.05,.2,26,54,26,74],[.3,.4,26,118,26,204],[.5,.6,26,248,26,334],[.7,.8,200,378,300,400] ]
                       :[ [.05,.2,332,54,332,80],[.3,.4,332,124,332,150],[.5,.6,332,194,332,220],[.7,.8,332,264,f1(L.leaf(5)[0]+55),300] ];
      segs.forEach(([a,b,x1,y1,x2,y2])=>{if(t>a&&t<b){const u=ease(ramp(t,a,b));s+=`<circle cx="${f1(lerp(x1,+x2,u))}" cy="${f1(lerp(y1,+y2,u))}" r="6" style="fill:var(--steel)"/>`}})}
    /* ---- spine nodes ---- */
    const node=(B,txt,on,cur,hl)=>{let q=box(B[0],B[1],B[2],B[3],on,cur,hl);q+=`<text x="${f1(B[0]+B[2]/2)}" y="${B[1]+19}" class="t-lbl t-mid">${txt[0]}</text><text x="${f1(B[0]+B[2]/2)}" y="${B[1]+35}" class="t-xs t-mid">${txt[1]}</text>`;return q};
    s+=node(L.n0,T.n0,true,p===0,depth>=0&&hn!=='side');
    s+=node(L.q1,T.q1,lit.q1>.5,p===1,depth>=1);
    s+=node(L.q2,T.q2,lit.q2>.5,p===2,depth>=2);
    s+=node(L.q3,T.q3,lit.q3>.5,p===3,depth>=3);
    /* ---- exits with red-flag badges ---- */
    [['sens',T.sens],['block',T.block]].forEach(([k,txt])=>{const B=L[k],o=.25+.75*lit[k],on=lit[k]>.5;
      s+=box(B[0],B[1],B[2],B[3],on,false,hn===k,o,'var(--tdp)','var(--tdp-soft)');
      s+=`<g style="opacity:${f1(o)}">`+lines(B[0]+10,B[1]+18,txt,'t-lbl')+'</g>';
      if(lit[k]>0)s+=`<g style="opacity:${f1(lit[k])}"><rect x="${f1(B[0]+B[2]-66)}" y="${f1(B[1]-8)}" width="60" height="16" rx="8" style="fill:var(--tdp)"/><text x="${f1(B[0]+B[2]-36)}" y="${f1(B[1]+3.5)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${T.flag}</text></g>`});
    /* ---- pattern leaves ---- */
    LEAVES.forEach((k,i)=>{const B=L.leaf(i),o=.25+.75*lit[k],on=lit[k]>.5,isA=k==='als';
      s+=box(B[0],B[1],B[2],B[3],on,false,hn===k,o,isA?'var(--good)':'var(--tdp)',isA?'var(--good-soft)':'var(--tdp-soft)');
      const tx=T.leaf[k];s+=`<g style="opacity:${f1(o)}"><text x="${f1(B[0]+B[2]/2)}" y="${B[1]+20}" class="t-lbl t-mid">${tx[0]}</text><text x="${f1(B[0]+B[2]/2)}" y="${B[1]+36}" class="t-xs t-mid">${tx[1]}</text><text x="${f1(B[0]+B[2]/2)}" y="${B[1]+49}" class="t-xs t-mid">${tx[2]}</text></g>`});
    /* ---- the side box and the register strip ---- */
    {const B=L.side,ar=N?T.sideN:T.side;s+=box(B[0],B[1],B[2],B[3],true,false,hn==='side',1,'var(--line)','var(--panel-2)');
     ar.forEach((ln,i)=>{s+=`<text x="${B[0]+12}" y="${B[1]+22+i*(N?20:22)}" class="${i?'t-xs':'t-lbl'}" style="${i?'fill:var(--ink)':''}">${ln}</text>`})}
    {const B=L.strip,o=lit.strip;if(o>0){s+=`<g style="opacity:${f1(o)}"><rect x="${B[0]}" y="${B[1]}" width="${B[2]}" height="${B[3]}" rx="10" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      if(N)T.stripN.forEach((ln,i)=>{s+=`<text x="${B[0]+12}" y="${B[1]+20+i*16}" class="t-xs" style="fill:var(--ink);font-weight:${i?500:700}">${ln}</text>`});
      else s+=`<text x="${B[0]+B[2]/2}" y="${B[1]+25}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${T.strip}</text>`;
      s+='</g>'}}
    /* ---- selected-condition tag on its node ---- */
    if(M&&M.id!=='als'){const B=hn==='side'?L.side:hn==='sens'||hn==='block'?L[hn]:L.leaf(LEAVES.indexOf(hn));
      const tag=T.selTag(M.n),w=Math.min(N?370:300,tag.length*6.2+18);let x=B[0]+B[2]/2-w/2;x=clamp(x,4,(N?400:720)-w-4);const y=N&&LEAVES.includes(hn)?B[1]-19:B[1]+B[3]+4;
      s+=`<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="17" rx="8" style="fill:var(--ink)"/><text x="${f1(x+w/2)}" y="${y+12.5}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${tag}</text>`}
    svg.innerHTML=s;setSt(p);$('#ddNote').innerHTML=noteHTML(DD_STEPS[p]);
  }
  const stop=playWire(rg,$('#ddPlay'),draw,16000,UI.replay,'ddx');
  const setSt=stepWire($('#ddSteps'),DD_STEPS,rg,draw,stop);
  function card(){const c=$('#ddCard');
    if(!sel){c.innerHTML=`<span class="kicker">${T.cardNone[0]}</span><span>${T.cardNone[1]}</span>`;return}
    const M=DD_MIM.find(m=>m.id===sel);
    c.innerHTML=`<span class="kicker">${T.where[M.node]}</span><h4>${M.full}</h4><dl class="kv"><div><dt>${T.dt.feat}</dt><dd>${M.feat}</dd></div><div><dt>${T.dt.test}</dt><dd>${M.c[6]}</dd></div></dl>`}
  function pick(id){sel=sel===id||id==='none'?null:id;
    $$('#ddPick [data-ddp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ddp===(sel||'none')));
    $$('#ddTbl tr[data-dd]').forEach(r=>r.classList.toggle('hl',r.dataset.dd===sel));
    card();draw(+rg.value)}
  $('#ddPick').innerHTML=[['none',T.none],...DD_MIM.filter(m=>m.id!=='als').map(m=>[m.id,m.n])].map(([id,n])=>`<button class="btn" data-ddp="${id}" aria-pressed="${id==='none'}">${n}</button>`).join('');
  $('#ddPick').addEventListener('click',e=>{const b=e.target.closest('[data-ddp]');if(b)pick(b.dataset.ddp==='none'?'none':b.dataset.ddp===sel?'none':b.dataset.ddp)});
  $('#ddTbl').innerHTML=DD_MIM.map(M=>`<tr${M.id==='als'?' class="ref"':` data-dd="${M.id}"`}><th>${M.full}</th>${M.c.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('');
  $('#ddTbl').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const r=e.target.closest('tr[data-dd]');if(r){if(r.dataset.dd!==sel)pick(r.dataset.dd);$('#ddSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  card();draw(+rg.value);
};
/* =============== 2.3 ALSFRS-R and the course =============== */
const CO_STEPS=[
 {from:0,at:.03,k:`King's 1 · Month 0`,t:'Onset',
  txt:`Symptoms begin in one region: weakness, wasting, stiffness, slurred speech or trouble swallowing. King's stage 1 is the first region involved; the regions are bulbar, upper limb, lower limb and diaphragmatic. <sup class="c" data-ref="Roche2012" title="Source 451">451</sup> The ALSFRS-R starts at or near 48, the score for normal function. It has 12 items in four domains (bulbar, fine motor, gross motor, respiratory), each scored 0 to 4. <sup class="c" data-ref="Boddy2025,Brooks2022" title="Source 66,79">66,79</sup> Domain sub-scores may begin to fall before the date a person gives as onset. <sup class="c" data-ref="Rooney2017" title="Source 455">455</sup>`,
  pt:`The scale adds up 12 everyday abilities, each worth up to 4 points. 48 means no loss yet.`,
  hook:`ALSFRS-R: 12 items × 0-4 = 48 (normal). Four domains: bulbar, fine motor, gross motor, respiratory.`},
 {from:.08,at:.14,k:'Months 0-12',t:'Seeking a diagnosis',
  txt:`In one US centre, the median time from first symptom to confirmed diagnosis was 11.5 months; people saw an average of three physicians, and 52% first received another diagnosis. <sup class="c" data-ref="Paganoni2014" title="Source 414">414</sup> Bulbar onset is diagnosed about 4.4 months sooner on average. <sup class="c" data-ref="Saeed2026" title="Source 460">460</sup> The lines here are arithmetic, 48 minus rate × months: at 12 months they reach 42 (slow), 36 (intermediate) and 24 (fast).`,
  pt:`Finding the cause often takes about a year, because early ALS can look like many other conditions.`,
  hook:`A longer diagnostic delay goes with slower disease: it is a protective predictor in ENCALS (HR 0.52). <sup class="c" data-ref="Westeneng2018" title="Source 535">535</sup>`},
 {from:.2,at:.24,k:`King's 2A · Mean 13.5 months`,t:'Diagnosis',
  txt:`In the London cohort, diagnosis came at a mean of 13.5 months from onset in people who had died, about 35% of the way through the course. <sup class="c" data-ref="Roche2012" title="Source 451">451</sup> ΔFS uses the score at diagnosis: (48 − ALSFRS-R) / months from onset. <sup class="c" data-ref="Kimura2006,Hamidou2017" title="Source 217,265">217,265</sup> In a French cohort the median ΔFS at diagnosis was 1.0 (IQR 0.5-2.0), and those three values set the lines here. <sup class="c" data-ref="Hamidou2017" title="Source 217">217</sup> In a Sydney cohort of 203 people, ΔFS below 0.47 went with a median survival of 2.4 years, 0.47 to 1.11 with 1.6 years and above 1.11 with 0.7 years. <sup class="c" data-ref="Labra2016" title="Source 280">280</sup>`,
  pt:`How fast the score has fallen by the time of diagnosis says more about the future than the score itself.`,
  hook:`ΔFS = (48 − score) / months since onset. A higher ΔFS at diagnosis predicts shorter survival.`},
 {from:.3,at:.38,k:`King's 2B and 3`,t:'More regions involved',
  txt:`A second region was involved at a mean of 17.7 months (about 38% of the course) and a third at 23.3 months (about 61%). <sup class="c" data-ref="Roche2012" title="Source 451">451</sup> Trial participants lose about 1 point a month on average (PRO-ACT 1.02 ± 2.3), while vital capacity falls by 2.24% of predicted a month. <sup class="c" data-ref="Atassi2014" title="Source 29">29</sup> King's stage 3 most often matches MiToS stage 1, the first domain in which independence is lost. <sup class="c" data-ref="Fang2017" title="Source 168">168</sup> Median survival from the third-region milestone was 13 months with bulbar or limb onset. <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>`,
  pt:`The disease spreads from the first region to others. King's stage counts how many regions are involved.`,
  hook:`King's 1-3 = number of regions involved (bulbar, upper limb, lower limb, diaphragmatic). 4A = gastrostomy needed, 4B = NIV needed.`},
 {from:.46,at:.5,k:`King's 4A · Mean 27.7 months`,t:'Gastrostomy',
  txt:`The need for a gastrostomy came at a mean of 27.7 months, about 77% of the course. People with bulbar onset needed gastrostomy before NIV (at 0.71 against 0.81 of the course); people with limb onset needed NIV first (0.73 against 0.81). <sup class="c" data-ref="Roche2012" title="Source 451">451</sup> NICE NG42 recommends discussing gastrostomy early and at regular intervals, and accepts that some people will not want one. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup> In ProGas, weight loss of more than 10% from diagnosis to gastrostomy was linked to a higher hazard of death (HR 2.51). <sup class="c" data-ref="ProGas2015" title="Source 431">431</sup> More in <a href="#nutrition" data-go="nutrition">Swallowing and feeding tubes</a>.`,
  pt:`A feeding tube into the stomach is often discussed once swallowing or weight becomes a problem. It is a choice.`,
  hook:`King's 4A = need for gastrostomy. It comes before NIV more often with bulbar onset.`},
 {from:.54,at:.58,k:`King's 4B · Mean 30.3 months`,t:'Non-invasive ventilation',
  txt:`The need for NIV came at a mean of 30.3 months, about 80% of the course. <sup class="c" data-ref="Roche2012" title="Source 451">451</sup> In the one randomised trial, NIV improved quality of life and survival in people with normal to moderately impaired bulbar function, with a median survival benefit of 205 days. <sup class="c" data-ref="Bourke2006" title="Source 70">70</sup> Median survival from the NIV milestone in the London cohort was 3 months with bulbar onset and 8 months with limb onset. <sup class="c" data-ref="Roche2012" title="Source 451">451</sup> More in <a href="#breathing" data-go="breathing">Breathing and NIV</a>.`,
  pt:`A mask and a small machine support breathing, usually during sleep at first.`,
  hook:`King's 4B = need for NIV. Stage 4 is defined by an intervention being needed, not by a score.`},
 {from:.63,at:.7,k:'Late stage',t:'The range of survival',
  txt:`Median survival from onset is 2 to 4 years across cohorts <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>; in the London clinic it was 42.3 months (48.3 with limb onset, 30.8 with bulbar onset). <sup class="c" data-ref="Roche2012" title="Source 451">451</sup> A systematic review found that 10-20% live more than 10 years <sup class="c" data-ref="Chio2009" title="Source 104">104</sup>, while population registers report 11.8% alive 10 years after diagnosis <sup class="c" data-ref="Pupillo2014" title="Source 433">433</sup> and 7% at 10 years. <sup class="c" data-ref="Pupillo2025" title="Source 435">435</sup> Respiratory failure, including pneumonia, caused 81.3% of deaths in one Italian centre. <sup class="c" data-ref="Spataro2010" title="Source 479">479</sup> MiToS stage 5 is death. <sup class="c" data-ref="Chio2015MiToS" title="Source 111">111</sup>`,
  pt:`Averages hide a wide range. Some people live with ALS for more than ten years.`,
  hook:`Older age and bulbar onset consistently predict shorter survival. <sup class="c" data-ref="Chio2009" title="Source 104">104</sup>`},
 {from:.78,at:.9,k:'Not a straight line',t:'Curves and plateaus',
  txt:`So far the lines were straight, as trial analyses and ΔFS assume. <sup class="c" data-ref="Atassi2014,Hamidou2017" title="Source 29,217">29,217</sup> In 1884 people in Paris, ALSFRS-R decline was curvilinear: a quadratic fit described the data and a linear fit did not, and the early and late phases fell fastest. <sup class="c" data-ref="Gordon2010" title="Source 212">212</sup> In PRO-ACT, 25% of participants did not decline over 6 months, 16% over 12 months and 7% over 18 months; fewer than 1% ever improved by 4 points or more for at least 12 months. The authors caution that a short plateau should not be read as a treatment effect. <sup class="c" data-ref="Bedlack2016" title="Source 46">46</sup>`,
  pt:`The score can hold steady for months and then fall again. A pause does not by itself mean that a treatment worked.`,
  hook:`Decline is curvilinear, with plateaus; ΔFS assumes a straight line from 48 at onset.`}
];
const CO_TXT={
  traj:{slow:'Slow',mid:'Intermediate',fast:'Fast'},
  trajBtn:(n,r)=>`${n} · ${r} a month`,
  trajRo:(n,r)=>`${n}, ${r} a month`,
  onset:{limb:'Limb onset',bulb:'Bulbar onset'},
  dom:{bulbar:'Bulbar',fine:'Fine motor',gross:'Gross motor',resp:'Respiratory'},
  kingsHead:`King's stage, mean months from onset in people who had died (London)`,
  kingsHeadN:`King's stage, cohort means`,
  ev:{dx:m=>`Diagnosis (2A) · ${m} months`,g:m=>`Gastrostomy (4A) · ${m} months`,niv:m=>`NIV (4B) · ${m} months`},
  xTitle:'Months since symptom onset',yTitle:'ALSFRS-R total',
  plateau:'6-month plateau',straight:'dashed: straight line',
  ro:{month:'Months since onset',total:'ALSFRS-R total',kings:`King's stage (cohort means)`,kingsN:`King's stage`,doms:'Domain sub-scores'},
  of48:n=>`${n} / 48`, of12:n=>`${n}/12`,
  dfs:(lost,m,v)=>`ΔFS = ${lost} / ${m} = ${v}`, dfsNone:'ΔFS needs time since onset',
  kname:{'1':'First region','2A':'Diagnosis','2B':'Second region','3':'Third region','4A':'Gastrostomy needed','4B':'NIV needed'},
  live:(m,line,sc,st)=>`Month ${m}. ${line}: ALSFRS-R ${sc} of 48. King's stage by cohort means: ${st}.`,
  domOn:'Hide domain sub-scores',domOff:'Show domain sub-scores',
  legDom:'Shaded bands under the followed line split its total into the four domains (schematic).',
  /* ENCALS chart */
  enHead:'Median months from onset to the composite endpoint',
  enGroups:['Very short','Short','Intermediate','Long','Very long'],
  enVal:v=>`${v} months`, enValObs:(v,o)=>`${v} months · observed ${o}`,
  enObsOn:'Hide observed medians',enObsOff:'Show observed medians',
  /* calculator */
  domTot:(n,t)=>`${n} · ${t} / 12`,
  totLbl:'ALSFRS-R total', of48b:'/ 48',
  dfsHead:'Progression rate (ΔFS)',
  dfsCalc:(lost,m,v)=>`(48 − total) / months = ${lost} / ${m} = <b>${v}</b> points a month`,
  dfsNote:`ΔFS was defined with the score at diagnosis and the months from onset to diagnosis; it assumes a score of 48 at onset and a straight line since. <sup class="c" data-ref="Kimura2006,Hamidou2017" title="Source 217,265">217,265</sup>`,
  labHead:'Labra 2016 cut-offs (Sydney, 203 people)',
  labBands:[ ['Below 0.47','median survival 2.4 years'],['0.47 to 1.11','median survival 1.6 years'],['Above 1.11','median survival 0.7 years'] ],
  labNote:`Group medians in the cohort that derived the cut-offs, not a forecast for one person. <sup class="c" data-ref="Labra2016" title="Source 280">280</sup>`,
  oldHead:'The commonly quoted bands',
  oldBands:['slower (below 0.5)','intermediate (0.5 to 1.0)','faster (above 1.0)'],
  oldLine:b=>`On the bands of below 0.5, 0.5 to 1.0 and above 1.0 points a month, these inputs fall in the ${b} group. <sup class="c" data-ref="Hamidou2017,Meyer2026" title="Source 217,330">217,330</sup>`,
  oldNote:`These three bands are widely used, but who first proposed them could not be traced: Kimura 2006, which introduced ΔFS, gives no bands in its abstract, and later studies use them without naming an origin. <sup class="c" data-ref="Kimura2006,Hamidou2017,Labra2016" title="Source 217,265,280">217,265,280</sup>`,
  kHead:`King's stage estimated from ALSFRS-R`,
  kTag:'Cut-offs unverified',
  kStage:s=>`Stage ${s}`,
  kNone:'No mapped item below 4',
  kRegions:'Regions scored as involved',
  kReg:{bulbar:'bulbar',ul:'upper limb',ll:'lower limb'},
  kWhy:{a4:'item 5b in use (gastrostomy)',b4:'item 10 at 0 or item 12 at 3 or less (ventilatory support)'},
  kList:a=>a.join(', '),
  kNote:`Balendra and colleagues mapped ALSFRS-R domains to King's regions, with gastrostomy or NIV as the stage 4 proxy; agreement with clinical staging was excellent (ICC 0.92). <sup class="c" data-ref="Balendra2014" title="Source 34">34</sup> The items used are 1-3 (bulbar), 4 and 5a (upper limb), 8 (lower limb), 5b (gastrostomy) and 10 and 12 (breathing). <sup class="c" data-ref="AlChalabi2021" title="Source 9">9</sup> The exact cut-offs are in the Balendra paper, which could not be read for this guide. The cut-offs used here, any mapped item below 4 for a region, item 5b in use for 4A, and item 10 at 0 or item 12 at 3 or less for 4B, come from secondary descriptions in trial documents and have not been checked against the original paper. ALSFRS-R cannot tell stage 2A (diagnosis) from 2B, so two regions show as stage 2.`,
  mHead:'MiToS stage: not estimated',
  mNote:`MiToS counts the domains in which independence is lost: walking or self-care, swallowing, communicating and breathing. Stage 0 is involvement without loss of independence, stages 1-4 the number of domains lost, and stage 5 death. <sup class="c" data-ref="Chio2015MiToS" title="Source 111">111</sup> It uses items 1 and 4 (communicating), 3 (swallowing), 6 and 8 (movement), and 10 and 12 (breathing) <sup class="c" data-ref="AlChalabi2021" title="Source 9">9</sup>; one trial analysis plan combines them as walking or dressing, swallowing, speech and handwriting, and breathlessness or breathing support. <sup class="c" data-ref="CTgov_ADORE" title="Source 122">122</sup> The item cut-offs could not be verified from the original paper, so this calculator shows the mapped items and does not give a MiToS stage.`,
  mDom:[ ['Walking or self-care',[6,8]],['Swallowing',[3]],['Communicating',[1,4]],['Breathing',[10,12]] ],
  mItem:(n,v)=>`item ${n}: ${v}`,
  sum:(tot,dfs,st)=>`<span>ALSFRS-R <b>${tot} / 48</b></span><span>ΔFS <b>${dfs}</b></span><span>King's (estimate) <b>${st}</b></span>`,
  monthsBad:'Enter the months since symptom onset (1 or more) to calculate ΔFS.',
  scoreAria:(v,a)=>`${v}: ${a}`
};
/* ALSFRS-R items: topic and paraphrased levels 4..0 (own wording; the scale text itself is copyrighted) */
const CO_ITEMS=[
 {n:'1',d:'bulbar',t:'Speech',a:['speaks as before','speech sounds changed but is understood','has to repeat to be understood','speech plus other ways of communicating','speech no longer usable to communicate']},
 {n:'2',d:'bulbar',t:'Saliva',a:['no change','slightly more saliva, perhaps some at night','clearly more saliva, a little drooling','much more saliva, some drooling','drooling that needs constant wiping']},
 {n:'3',d:'bulbar',t:'Swallowing',a:['eats as before','eats, with occasional choking','food or drink texture has to be changed','a tube adds to what is eaten','nothing by mouth; all feeding by tube or drip']},
 {n:'4',d:'fine',t:'Handwriting',a:['writes as before','slower or untidier, still readable','some words cannot be read','holds a pen but cannot form words','cannot hold a pen']},
 {n:'5a',d:'fine',t:'Cutting food and using cutlery',a:['as before','slower or clumsier, manages alone','manages most foods with some help','someone else cuts the food; still feeds self slowly','needs to be fed']},
 {n:'5b',d:'fine',t:'Handling the feeding tube and fastenings',a:['as before','clumsy but does every step alone','needs some help with caps and fasteners','carer does most; person helps a little','cannot do any part']},
 {n:'6',d:'fine',t:'Dressing and washing',a:['as before','manages alone, with more effort','needs help now and then, or uses workarounds','needs a carer for self-care','fully reliant on others']},
 {n:'7',d:'gross',t:'Turning in bed and adjusting bedclothes',a:['as before','slower or clumsier, manages alone','manages alone, with great difficulty','starts but cannot finish without help','cannot do it without full help']},
 {n:'8',d:'gross',t:'Walking',a:['walks as before','early difficulty walking','walks with help from a person or an aid','moves but cannot walk usefully','no purposeful leg movement']},
 {n:'9',d:'gross',t:'Climbing stairs',a:['as before','slower','somewhat unsteady or tires','needs help','cannot climb stairs']},
 {n:'10',d:'resp',t:'Breathlessness',a:['none','when walking','with everyday tasks such as eating, washing or dressing','at rest, sitting or lying','severe; mechanical support being considered']},
 {n:'11',d:'resp',t:'Breathlessness lying flat',a:['none','some broken sleep from breathlessness','needs extra pillows to sleep','can sleep only sitting up','cannot sleep for breathlessness']},
 {n:'12',d:'resp',t:'Breathing support',a:['none','NIV used some of the time','NIV through the night','NIV day and night','invasive ventilation (intubation or tracheostomy)']}
];
const CO_EX={
 limb:{m:14,g:false,v:{'1':4,'2':4,'3':4,'4':2,'5':2,'6':3,'7':3,'8':2,'9':1,'10':4,'11':4,'12':4}},
 bulb:{m:8,g:false,v:{'1':2,'2':3,'3':2,'4':4,'5':4,'6':4,'7':4,'8':4,'9':3,'10':4,'11':4,'12':4}},
 late:{m:30,g:true,v:{'1':1,'2':2,'3':1,'4':1,'5':1,'6':1,'7':1,'8':0,'9':0,'10':2,'11':2,'12':3}},
 full:{m:12,g:false,v:{}}
};
/* trajectories (Hamidou 2017 ΔFS quartiles), King's milestones (Roche 2012 last-milestone means) */
const CO_R={slow:.5,mid:1,fast:2};
const CO_COL={slow:'var(--good)',mid:'var(--warn)',fast:'var(--bad)'};
const CO_DCOL={bulbar:'var(--food)',fine:'var(--umn)',gross:'var(--steel)',resp:'var(--air)'};
const CO_KINGS=[ {a:0,b:13.5,s:'1'},{a:13.5,b:17.7,s:'2A'},{a:17.7,b:23.3,s:'2B'},{a:23.3,b:27.7,s:'3'},{a:27.7,b:30.3,s:'4A'},{a:30.3,b:60,s:'4B'} ];
const CO_EV=[ {k:'dx',m:13.5,row:0},{k:'g',m:27.7,row:1},{k:'niv',m:30.3,row:2} ];
/* slider position to months since onset */
const CO_TM=[ [0,0],[.24,13.5],[.5,27.7],[.58,30.3],[.78,48],[1,60] ];
/* schematic domain split: loss in the 1st..4th domain to fall, at total losses 0,6,12,...,48 (each row sums to the total) */
const CO_SPLIT=[ [0,4,6.5,8,9,10,11,11.5,12],[0,1.5,4,6.5,8,9.5,10.5,11.5,12],[0,.5,1,2.5,5,7,9,10.5,12],[0,0,.5,1,2,3.5,5.5,8.5,12] ];
const CO_ORDER={limb:['fine','gross','bulbar','resp'],bulb:['bulbar','fine','gross','resp']};
const CO_EN={pred:[17.7,25.3,32.2,43.7,91.0],obs:[16.5,25.2,32.8,44.6,null]};

/* ALSFRS-R of an illustrative course: rate r a month, bend k (0 straight .. 1 curved with a plateau) */
function coScore(r,m,k){
  const me=m-k*clamp(m-16,0,6),H=48/r,u=me/H;
  if(u>=1)return 0;
  const loss=48*(u+k*.55*Math.sin(2*Math.PI*u)/(2*Math.PI));
  return clamp(48-loss,0,48);
}
function coDoms(score,onset){
  const loss=48-score,o=CO_ORDER[onset],out={};
  o.forEach((d,i)=>{const row=CO_SPLIT[i].map((v,j)=>[j*6,v]);out[d]=12-interp(row,loss)});
  return out;
}
function coKing(m){return CO_KINGS.find(b=>m>=b.a&&m<b.b)||CO_KINGS[CO_KINGS.length-1]}

inits.course=()=>{
  const svg=$('#coSvg'),rg=$('#coT');
  let traj='mid',dom=false,onset='limb';
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const L=N?{cx0:44,cx1:388,cy0:116,cy1:352,bandY:20,headY:12,rows:[54,70,86],xt:368,xtt:386,yt:12,
               ro:{x:8,y:404,w:384,h:276},head:CO_TXT.kingsHeadN}
             :{cx0:58,cx1:478,cy0:104,cy1:330,bandY:20,headY:12,rows:[54,68,82],xt:346,xtt:366,yt:16,
               ro:{x:494,y:20,w:218,h:352},head:CO_TXT.kingsHead};
    const m=interp(CO_TM,t),kb=ease(ramp(t,.8,.9));
    const X=mm=>L.cx0+mm/60*(L.cx1-L.cx0),Y=s=>L.cy0+(48-s)/48*(L.cy1-L.cy0);
    let s='';
    /* King's band strip */
    s+=`<text x="${L.cx0}" y="${L.headY}" class="t-xs">${L.head}</text>`;
    const kc=coKing(m);
    CO_KINGS.forEach(b=>{const on=b===kc,x0=X(b.a),x1=X(b.b);
      s+=`<rect x="${f1(x0+.5)}" y="${L.bandY}" width="${f1(x1-x0-1)}" height="18" rx="3" style="fill:${on?'var(--steel-soft)':'var(--panel-2)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
      s+=`<text x="${f1((x0+x1)/2)}" y="${L.bandY+12.5}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${b.s}</text>`});
    /* grid and axes */
    [0,12,24,36,48].forEach(v=>{s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.cx0-6}" y="${f1(Y(v)+3.5)}" class="t-xs t-end">${v}</text>`});
    [0,12,24,36,48,60].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.cy1}" y2="${L.cy1+4}" class="axis"/><text x="${f1(X(v))}" y="${L.xt}" class="t-xs t-mid">${v}</text>`});
    s+=`<line x1="${L.cx0}" x2="${L.cx0}" y1="${L.cy0}" y2="${L.cy1}" class="axis"/>`;
    s+=`<text x="${f1((L.cx0+L.cx1)/2)}" y="${L.xtt}" class="t-sm t-mid">${CO_TXT.xTitle}</text>`;
    s+=`<text transform="translate(${L.yt} ${f1((L.cy0+L.cy1)/2)}) rotate(-90)" class="t-xs t-mid">${CO_TXT.yTitle}</text>`;
    /* event markers */
    CO_EV.forEach(e=>{const x=X(e.m),y=L.rows[e.row],past=m>=e.m,lbl=CO_TXT.ev[e.k](e.m),w=lbl.length*5.8,right=x+3+w<=L.cx1;
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y+3}" y2="${L.cy1}" style="stroke:${past?'var(--ink)':'var(--muted)'};stroke-width:1.2;stroke-dasharray:3 3;opacity:${past?.7:.45}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${y-3}" r="3" style="fill:${past?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1.2"/>`;
      s+=`<text x="${f1(right?x+7:x-7)}" y="${y}" class="t-xs${right?'':' t-end'}" style="fill:${past?'var(--ink)':'var(--muted)'};font-weight:${past?600:500}">${lbl}</text>`});
    /* plateau window (last phase) */
    if(kb>0){const x0=X(16),x1=X(22);
      s+=`<rect x="${f1(x0)}" y="${L.cy0}" width="${f1(x1-x0)}" height="${L.cy1-L.cy0}" style="fill:var(--steel-soft);opacity:${f1(.8*kb)}"/>`;
      const pw=CO_TXT.plateau.length*5.8+10;
      s+=`<rect x="${f1((x0+x1)/2-pw/2)}" y="${L.cy0+2}" width="${f1(pw)}" height="14" rx="4" style="fill:var(--panel);opacity:${f1(.9*kb)}"/>`;
      s+=`<text x="${f1((x0+x1)/2)}" y="${L.cy0+12}" class="t-xs t-mid" style="fill:var(--steel);font-weight:600;opacity:${f1(kb)}">${CO_TXT.plateau}</text>`}
    /* domain stack under the followed line */
    const mEnd=Math.min(m,60),R=CO_R[traj];
    if(dom&&mEnd>0){const n=Math.max(2,Math.ceil(mEnd/.5)),pts=[];
      for(let i=0;i<=n;i++){const mm=mEnd*i/n,dd=coDoms(coScore(R,mm,kb),onset);pts.push([mm,dd])}
      let base=pts.map(()=>0);
      ['resp','gross','fine','bulbar'].forEach(d=>{const top=pts.map((p,i)=>base[i]+p[1][d]);
        let path='M'+pts.map((p,i)=>f1(X(p[0]))+' '+f1(Y(top[i]))).join('L');
        for(let i=pts.length-1;i>=0;i--)path+='L'+f1(X(pts[i][0]))+' '+f1(Y(base[i]));
        s+=`<path d="${path}Z" style="fill:${CO_DCOL[d]};opacity:.42"/>`;base=top})}
    /* the three lines */
    const LBL={slow:52,mid:34,fast:16},lbox=[];
    ['slow','mid','fast'].forEach(k=>{const r=CO_R[k],sel=k===traj,col=CO_COL[k];
      const path=(a,b)=>{let d='';for(let mm=a;mm<=b+1e-6;mm+=.5){const sc=coScore(r,mm,kb);d+=(d?'L':'M')+f1(X(mm))+' '+f1(Y(sc));if(sc<=0)break}return d};
      if(sel&&kb>0){let d='';for(let mm=0;mm<=60;mm+=1){const sc=coScore(r,mm,0);d+=(d?'L':'M')+f1(X(mm))+' '+f1(Y(sc));if(sc<=0)break}
        s+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:1.4;stroke-dasharray:5 4;opacity:${f1(.7*kb)}"/>`}
      s+=`<path d="${path(0,60)}" style="fill:none;stroke:${col};stroke-width:${sel?2:1.4};opacity:.28"/>`;
      if(mEnd>0)s+=`<path d="${path(0,mEnd)}" style="fill:none;stroke:${col};stroke-width:${sel?3.4:1.8};stroke-linecap:round;stroke-linejoin:round"/>`;
      const lm=LBL[k],ly=Y(coScore(r,lm,kb));lbox.push([X(lm)+6,ly-18,X(lm)+6+CO_TXT.traj[k].length*6.8,ly-5]);
      s+=`<text x="${f1(X(lm)+6)}" y="${f1(ly-8)}" class="t-sm" style="fill:${col};font-weight:${sel?700:500}">${CO_TXT.traj[k]}</text>`});
    if(kb>0)s+=`<text x="${L.cx1}" y="${L.cy0-6}" class="t-xs t-end" style="opacity:${f1(kb)}">${CO_TXT.straight}</text>`;
    /* cursor */
    const cx=X(mEnd);
    s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.cy0}" y2="${L.cy1}" style="stroke:var(--ink);stroke-width:1.5;opacity:.45"/>`;
    ['slow','mid','fast'].forEach(k=>{const sel=k===traj,sc=coScore(CO_R[k],mEnd,kb);
      s+=`<circle cx="${f1(cx)}" cy="${f1(Y(sc))}" r="${sel?5.5:3.5}" style="fill:${sel?CO_COL[k]:'var(--panel)'};stroke:${CO_COL[k]};stroke-width:2"/>`});
    const sc=coScore(R,mEnd,kb),dd=coDoms(sc,onset),dv={};let tot=0;
    Object.keys(dd).forEach(d=>{dv[d]=Math.round(dd[d]);tot+=dv[d]});
    {const ty=clamp(Y(sc)-9,L.cy0,L.cy1-18),hit=x=>lbox.some(q=>x<q[2]&&x+34>q[0]&&ty<q[3]&&ty+18>q[1]);
      const tx=(cx+10+34<=L.cx1&&!hit(cx+10))||hit(cx-44)?cx+10:cx-44;
      s+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="34" height="18" rx="9" style="fill:var(--ink)"/><text x="${f1(tx+17)}" y="${f1(ty+12.5)}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${tot}</text>`}
    /* readout */
    const o=L.ro,px=o.x+14;
    s+=`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" rx="12" style="fill:var(--panel-2)"/>`;
    const dfsT=mEnd>=1?CO_TXT.dfs(f1(48-sc),f1(mEnd),f1((48-sc)/mEnd)):CO_TXT.dfsNone;
    const bars=(x,y0,w,gap)=>{let g='';['bulbar','fine','gross','resp'].forEach((d,i)=>{const y=y0+i*gap;
      g+=`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--ink)">${CO_TXT.dom[d]}</text><text x="${x+w}" y="${y}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${CO_TXT.of12(dv[d])}</text>`;
      g+=`<rect x="${x}" y="${y+4}" width="${w}" height="8" rx="4" style="fill:var(--panel)"/><rect x="${x}" y="${y+4}" width="${f1(w*dv[d]/12)}" height="8" rx="4" style="fill:${CO_DCOL[d]}"/>`});return g};
    if(!N){
      s+=`<text x="${px}" y="${o.y+24}" class="t-sm">${CO_TXT.ro.month}</text><text x="${px}" y="${o.y+48}" class="t-big">${f1(mEnd)}</text>`;
      s+=`<text x="${px}" y="${o.y+74}" class="t-sm" style="fill:${CO_COL[traj]};font-weight:700">${CO_TXT.trajRo(CO_TXT.traj[traj],CO_R[traj].toFixed(1))}</text>`;
      s+=`<text x="${px}" y="${o.y+98}" class="t-sm">${CO_TXT.ro.total}</text><text x="${px}" y="${o.y+122}" class="t-big">${CO_TXT.of48(tot)}</text>`;
      s+=`<text x="${px}" y="${o.y+142}" class="t-xs">${dfsT}</text>`;
      s+=`<text x="${px}" y="${o.y+170}" class="t-sm">${CO_TXT.ro.kings}</text><text x="${px}" y="${o.y+194}" class="t-big">${kc.s}</text><text x="${px+40}" y="${o.y+193}" class="t-sm" style="fill:var(--ink)">${CO_TXT.kname[kc.s]}</text>`;
      s+=`<text x="${px}" y="${o.y+222}" class="t-sm">${CO_TXT.ro.doms}</text>`+bars(px,o.y+242,o.w-28,26);
    }else{
      const c2=o.x+200;
      s+=`<text x="${px}" y="${o.y+24}" class="t-sm">${CO_TXT.ro.month}</text><text x="${px}" y="${o.y+48}" class="t-big">${f1(mEnd)}</text>`;
      s+=`<text x="${c2}" y="${o.y+24}" class="t-sm">${CO_TXT.ro.kingsN}</text><text x="${c2}" y="${o.y+48}" class="t-big">${kc.s}</text><text x="${c2+36}" y="${o.y+47}" class="t-xs" style="fill:var(--ink)">${CO_TXT.kname[kc.s]}</text>`;
      s+=`<text x="${px}" y="${o.y+76}" class="t-sm" style="fill:${CO_COL[traj]};font-weight:700">${CO_TXT.trajRo(CO_TXT.traj[traj],CO_R[traj].toFixed(1))}</text>`;
      s+=`<text x="${px}" y="${o.y+100}" class="t-sm">${CO_TXT.ro.total}</text><text x="${px}" y="${o.y+124}" class="t-big">${CO_TXT.of48(tot)}</text>`;
      s+=`<text x="${c2}" y="${o.y+124}" class="t-xs">${dfsT}</text>`;
      s+=`<text x="${px}" y="${o.y+150}" class="t-sm">${CO_TXT.ro.doms}</text>`+bars(px,o.y+170,o.w-28,26);
    }
    svg.innerHTML=s;
    const p=phaseOf(CO_STEPS,t);setSt(p);
    $('#coNote').innerHTML=noteHTML(CO_STEPS[p])+`<p class="readout">${CO_TXT.live(Math.round(mEnd),CO_TXT.traj[traj],tot,kc.s)}</p>`;
  }
  const stop=playWire(rg,$('#coPlay'),draw,22000,UI.replay,'course');
  const setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  toggleRow($('#coTraj'),['slow','mid','fast'].map(k=>[k,CO_TXT.trajBtn(CO_TXT.traj[k],CO_R[k].toFixed(1))]),traj,v=>{traj=v;draw(+rg.value)});
  toggleRow($('#coOnset'),[ ['limb',CO_TXT.onset.limb],['bulb',CO_TXT.onset.bulb] ],onset,v=>{onset=v;draw(+rg.value)});
  const db=$('#coDom');
  const legend=()=>{$('#coLeg').innerHTML=dom?`<span>${CO_TXT.legDom}</span>`+['bulbar','fine','gross','resp'].map(d=>`<span><i style="background:${CO_DCOL[d]};height:10px;opacity:.6"></i>${CO_TXT.dom[d]}</span>`).join(''):''};
  db.addEventListener('click',()=>{dom=!dom;db.setAttribute('aria-pressed',dom);db.textContent=dom?CO_TXT.domOn:CO_TXT.domOff;legend();draw(+rg.value)});
  legend();
  draw(+rg.value);

  /* ---------- ENCALS risk groups ---------- */
  const es=$('#coEnSvg');let obs=true;
  function drawEn(){
    const N=vb(es,'720 260','400 350');
    const L=N?{x0:14,x1:386,y0:54,gap:58,bh:16,lblDy:-8,ax:334}:{x0:150,x1:690,y0:42,gap:38,bh:20,lblDy:null,ax:238};
    const X=v=>L.x0+v/110*(L.x1-L.x0);
    let s=`<text x="${N?L.x0:12}" y="18" class="t-sm">${CO_TXT.enHead}</text>`;
    [0,24,48,72,96].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-10}" y2="${L.ax-14}" class="grid"/><text x="${f1(X(v))}" y="${L.ax}" class="t-xs t-mid">${v}</text>`});
    CO_EN.pred.forEach((v,i)=>{const y=L.y0+i*L.gap,ob=CO_EN.obs[i],xe=X(v);
      s+=N?`<text x="${L.x0}" y="${y+L.lblDy}" class="t-sm" style="fill:var(--ink);font-weight:700">${CO_TXT.enGroups[i]}</text>`
          :`<text x="12" y="${f1(y+L.bh/2+4)}" class="t-sm" style="fill:var(--ink);font-weight:700">${CO_TXT.enGroups[i]}</text>`;
      s+=`<rect x="${L.x0}" y="${y}" width="${f1(xe-L.x0)}" height="${L.bh}" rx="4" style="fill:var(--steel);opacity:${f1(.45+.11*i)}"/>`;
      if(obs&&ob!=null)s+=`<line x1="${f1(X(ob))}" x2="${f1(X(ob))}" y1="${y-4}" y2="${y+L.bh+4}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/>`;
      const lbl=obs&&ob!=null?CO_TXT.enValObs(v.toFixed(1),ob.toFixed(1)):CO_TXT.enVal(v.toFixed(1)),w=lbl.length*5.8,
            ref=Math.max(xe,obs&&ob!=null?X(ob):0),out=ref+8+w<=L.x1+4;
      s+=out?`<text x="${f1(ref+8)}" y="${f1(y+L.bh/2+3.5)}" class="t-xs" style="fill:var(--ink)">${lbl}</text>`
            :`<text x="${f1(xe-6)}" y="${f1(y+L.bh/2+3.5)}" class="t-xs t-end" style="fill:var(--on-steel);font-weight:700">${lbl}</text>`});
    es.innerHTML=s;
  }
  const eb=$('#coEnObs');
  eb.addEventListener('click',()=>{obs=!obs;eb.setAttribute('aria-pressed',obs);eb.textContent=obs?CO_TXT.enObsOn:CO_TXT.enObsOff;drawEn()});
  eb.textContent=CO_TXT.enObsOn;
  const prevR=redraws.course;redraws.course=()=>{prevR&&prevR();drawEn()};
  drawEn();

  /* ---------- calculator ---------- */
  const sc={};CO_ITEMS.forEach(it=>{sc[it.n==='5a'||it.n==='5b'?'5':it.n]=4});
  let gas=false;
  const box=$('#coItems'),moI=$('#coMo');
  const itemOf=key=>CO_ITEMS.find(it=>key==='5'?it.n===(gas?'5b':'5a'):it.n===key);
  function buildItems(){
    let h='';
    ['bulbar','fine','gross','resp'].forEach(d=>{
      h+=`<fieldset data-dom="${d}"><legend><span class="co-sw" style="background:${CO_DCOL[d]}"></span><b data-dtot="${d}"></b></legend>`;
      CO_ITEMS.filter(it=>it.d===d&&!(it.n==='5a'&&gas)&&!(it.n==='5b'&&!gas)).forEach(it=>{const key=it.n==='5a'||it.n==='5b'?'5':it.n;
        h+=`<div class="co-it" role="group" aria-labelledby="coIt${it.n}"><div class="co-ih"><span class="n">${it.n}</span><span id="coIt${it.n}">${it.t}</span></div><div class="co-sc">`;
        [4,3,2,1,0].forEach(v=>{h+=`<button class="btn" data-it="${key}" data-v="${v}" aria-pressed="${sc[key]===v}" aria-label="${CO_TXT.scoreAria(v,it.a[4-v])}">${v}</button>`});
        h+=`</div><p class="co-an" data-an="${key}"></p></div>`});
      h+='</fieldset>'});
    box.innerHTML=h;
  }
  function calc(){
    $$('[data-it]',box).forEach(b=>b.setAttribute('aria-pressed',sc[b.dataset.it]===+b.dataset.v));
    $$('[data-an]',box).forEach(p=>{const it=itemOf(p.dataset.an),v=sc[p.dataset.an];p.innerHTML=`<b>${v}</b> · ${it.a[4-v]}`});
    const dsum={bulbar:0,fine:0,gross:0,resp:0};
    Object.keys(sc).forEach(k=>{dsum[itemOf(k).d]+=sc[k]});
    $$('[data-dtot]',box).forEach(b=>{const d=b.dataset.dtot;b.textContent=CO_TXT.domTot(CO_TXT.dom[d],dsum[d])});
    const tot=dsum.bulbar+dsum.fine+dsum.gross+dsum.resp,mo=Math.round(+moI.value);
    let h=`<div class="kicker">${CO_TXT.totLbl}</div><div class="co-tot"><strong>${tot}</strong><span class="kicker">${CO_TXT.of48b}</span></div>`;
    h+=`<div class="co-bars">`+['bulbar','fine','gross','resp'].map(d=>`<span>${CO_TXT.dom[d]}</span><i><b style="width:${f1(dsum[d]/12*100)}%;background:${CO_DCOL[d]}"></b></i><span class="v">${CO_TXT.of12(dsum[d])}</span>`).join('')+`</div>`;
    /* ΔFS and bands */
    h+=`<div class="co-box"><h5>${CO_TXT.dfsHead}</h5>`;
    if(!(mo>=1)){h+=`<p>${CO_TXT.monthsBad}</p></div>`}
    else{const v=(48-tot)/mo,vs=v.toFixed(2),lb=v<.47?0:v<=1.11?1:2,ob=v<.5?0:v<=1?1:2;
      h+=`<p>${CO_TXT.dfsCalc(48-tot,mo,vs)}</p><small>${CO_TXT.dfsNote}</small></div>`;
      h+=`<div class="co-box"><h5>${CO_TXT.labHead}</h5><div class="co-bands">`+CO_TXT.labBands.map((b,i)=>`<div class="${i===lb?'on':''}"><span>${b[0]}</span><span>${b[1]}</span></div>`).join('')+`</div><small>${CO_TXT.labNote}</small></div>`;
      h+=`<div class="co-box"><h5>${CO_TXT.oldHead}</h5><p>${CO_TXT.oldLine(CO_TXT.oldBands[ob])}</p><small>${CO_TXT.oldNote}</small></div>`}
    /* King's estimate (secondary-source cut-offs, flagged) */
    const reg=[];
    if(sc['1']<4||sc['2']<4||sc['3']<4)reg.push('bulbar');
    if(sc['4']<4||(!gas&&sc['5']<4))reg.push('ul');
    if(sc['8']<4)reg.push('ll');
    const b4=sc['10']===0||sc['12']<=3;
    const st=b4?'4B':gas?'4A':reg.length?String(reg.length):null;
    h+=`<div class="co-box"><h5>${CO_TXT.kHead} <span class="ev early">${CO_TXT.kTag}</span></h5>`;
    h+=`<div class="big">${st?CO_TXT.kStage(st):CO_TXT.kNone}</div>`;
    if(reg.length)h+=`<p>${CO_TXT.kRegions}: ${CO_TXT.kList(reg.map(r=>CO_TXT.kReg[r]))}</p>`;
    if(b4)h+=`<p>${CO_TXT.kWhy.b4}</p>`;else if(gas)h+=`<p>${CO_TXT.kWhy.a4}</p>`;
    h+=`<small>${CO_TXT.kNote}</small></div>`;
    /* MiToS: mapping only */
    h+=`<div class="co-box"><h5>${CO_TXT.mHead}</h5><div class="co-chips">`+CO_TXT.mDom.map(([n,its])=>`<span><b>${n}</b> · ${its.map(i=>CO_TXT.mItem(i,sc[String(i)])).join(', ')}</span>`).join('')+`</div><small>${CO_TXT.mNote}</small></div>`;
    $('#coOut').innerHTML=h;
    $('#coSum').innerHTML=CO_TXT.sum(tot,mo>=1?((48-tot)/mo).toFixed(2):'–',st||'–');
  }
  box.addEventListener('click',e=>{const b=e.target.closest('[data-it]');if(!b)return;sc[b.dataset.it]=+b.dataset.v;calc()});
  $('#coGas').addEventListener('change',e=>{gas=e.target.checked;buildItems();calc()});
  moI.addEventListener('input',calc);
  $('#coMoDn').addEventListener('click',()=>{moI.value=Math.max(1,(Math.round(+moI.value)||1)-1);calc()});
  $('#coMoUp').addEventListener('click',()=>{moI.value=Math.min(240,(Math.round(+moI.value)||0)+1);calc()});
  $$('[data-coex]').forEach(b=>b.addEventListener('click',()=>{const ex=CO_EX[b.dataset.coex];
    Object.keys(sc).forEach(k=>{sc[k]=ex.v[k]??4});gas=ex.g;$('#coGas').checked=gas;moI.value=ex.m;buildItems();calc()}));
  buildItems();calc();
};
/* =============== 3.1 riluzole, edaravone and others =============== */
const DR_STEPS=[
 {from:0,at:.06,k:'Step 1 · A normal signal',t:'Glutamate carries the signal',
  txt:'A glutamate-releasing nerve terminal excites the motor neuron. Glutamate opens AMPA and NMDA receptors on the motor neuron, and the astrocyte next to the synapse clears it from the cleft through its transporter EAAT2 (called GLT-1 in rodents). <sup class="c" data-ref="Taylor2016,Rothstein1995" title="Source 458,493">458,493</sup>',
  pt:'Nerve cells pass a signal with a chemical called glutamate. A helper cell, the astrocyte, mops it up after each signal.'},
 {from:.16,at:.24,k:'Step 2 · Excitotoxicity',t:'Too much glutamate',
  txt:'<span class="ev hyp">Hypothesis, causal role unproven</span> In tissue from people with ALS, high-affinity glutamate transport was reduced by 59% in spinal cord and 70% in motor cortex, but not in brain areas that ALS spares. <sup class="c" data-ref="Rothstein1992" title="Source 457">457</sup> EAAT2 itself was reduced by 71% in ALS motor cortex; the authors could not tell whether the loss is a cause or a consequence. <sup class="c" data-ref="Rothstein1995" title="Source 458">458</sup> In the drawing, three of four transporters fade, so glutamate lingers and keeps the receptors open. Ceftriaxone, given to raise EAAT2 uptake, did not slow ALS in a phase 3 trial of 513 people. <sup class="c" data-ref="Cudkowicz2014" title="Source 128">128</sup>',
  pt:'The mopping-up works less well, so glutamate builds up and keeps over-exciting the motor neuron.'},
 {from:.32,at:.4,k:'Step 3 · Calcium',t:'Calcium floods in',
  txt:'When glutamate is not cleared the neuron fires repeatedly and calcium flows in. <sup class="c" data-ref="Taylor2016" title="Source 493">493</sup> Spinal motor neurons are thought to be vulnerable because they have calcium-permeable AMPA receptors, little calcium buffering and a heavy reliance on mitochondria to soak calcium up. <sup class="c" data-ref="Nijssen2017" title="Source 404">404</sup> Astrocytes normally make motor neurons produce GluR2, which lowers AMPA-receptor calcium permeability; astrocytes carrying mutant SOD1 fail to. <sup class="c" data-ref="Taylor2016" title="Source 493">493</sup>',
  pt:'Too much calcium gets into the motor neuron, and motor neurons are poor at handling it.'},
 {from:.48,at:.56,k:'Step 4 · Oxidative stress',t:'Free radicals',
  txt:'Calcium overload stresses the endoplasmic reticulum and the mitochondria. <sup class="c" data-ref="Taylor2016" title="Source 493">493</sup> Markers of oxidative damage are raised in ALS spinal cord and CSF, but antioxidant trials in people have so far been disappointing. <sup class="c" data-ref="Barber2010" title="Source 40">40</sup>',
  pt:'The cell\'s power stations, the mitochondria, come under strain and leak damaging molecules called free radicals.'},
 {from:.68,at:.8,k:'Step 5 · The drugs',t:'Where the drugs are thought to act',
  txt:'Riluzole was developed as an anti-glutamate agent and edaravone as a free-radical scavenger. <sup class="c" data-ref="Doble1996,Watanabe2018" title="Source 144,530">144,530</sup> Both US labels say the mechanism by which the drug works in ALS is unknown. <sup class="c" data-ref="FDA2026Riluzole,FDA2026Radicava" title="Source 176,177">176,177</sup> Riluzole adds about 2 to 3 months of median survival in the trials. <sup class="c" data-ref="Miller2012Cochrane" title="Source 334">334</sup> Use the overlay buttons to see each drug\'s proposed site.',
  pt:'The approved drugs slow ALS a little; none stops it.',
  hook:'Riluzole: anti-glutamate (sodium channels, glutamate release, NMDA block). Edaravone: free-radical scavenger. For both, the US label says the mechanism in ALS is unknown.'}
];
const DR_DRUG={
 none:'',
 rilu:'<b>Riluzole overlay.</b> In laboratory studies riluzole inhibits glutamate release, partly by inactivating voltage-dependent sodium channels on glutamate-releasing terminals, and it blocks NMDA receptors noncompetitively. <sup class="c" data-ref="Doble1996" title="Source 144">144</sup> At therapeutic concentrations it blocks the persistent sodium current in rat cortical neurons. <sup class="c" data-ref="Urbani2000" title="Source 505">505</sup> The EU label describes it as "inhibiting glutamate processes"; the US label says its mechanism in ALS is unknown. <sup class="c" data-ref="EMA_Rilutek,FDA2026Riluzole" title="Source 162,177">162,177</sup>',
 eda:'<b>Edaravone overlay.</b> Edaravone is a free-radical scavenger, approved in Japan for acute ischaemic stroke since 2001. <sup class="c" data-ref="PMDA2015Radicut" title="Source 427">427</sup> It scavenges peroxyl radicals by donating an electron. <sup class="c" data-ref="Watanabe2018" title="Source 530">530</sup> The US label says the mechanism by which it works in ALS is unknown. <sup class="c" data-ref="FDA2026Radicava" title="Source 176">176</sup>'
};
const DR_TXT={
 drugs:[ ['none','No drug'],['rilu','Riluzole'],['eda','Edaravone'] ],
 pre:'glutamate terminal',post:'motor neuron',astro:'astrocyte',eaat:'EAAT2',ampa:'AMPA',nmda:'NMDA',
 mito:'mitochondrion',na:'Na⁺ channel',cleft:'cleft',ca:'Ca²⁺',ros:'free radicals',
 rilu:'riluzole',eda:'edaravone',
 gauges:['Glutamate in the cleft','Calcium in the neuron','Free radicals'],low:'low',high:'high',
 schem:'Direction only, no units',
 ovTitle:{none:'No drug shown',rilu:'Riluzole overlay',eda:'Edaravone overlay'},
 ovLines:{none:['Choose riluzole or edaravone','to see the proposed site.'],
  rilu:['Proposed: blocks Na⁺ channels,','less glutamate released,','NMDA receptor block.'],
  eda:['Proposed: scavenges','free radicals.']},
 unknown:['US label: mechanism','in ALS is unknown.'],
 cap:{none:'No drug overlay.',rilu:'Riluzole overlay: fewer glutamate packets per signal.',eda:'Edaravone overlay: free radicals neutralised.'},
 capTail:'Schematic, not to scale. The gauges show direction only, not measured amounts.',
 /* timeline */
 lanes:{fda:'FDA (US)',ema:'EMA (EU)',hc:'Health Canada',jp:'Japan',tr:'Trial results'},
 st:{ok:'Approved',cond:'Conditional, accelerated or exceptional approval',no:'Refused, or application withdrawn',out:'Withdrawn from the market',pos:'Trial: positive primary result',neg:'Trial: primary endpoint not met',none:'Where things stand'},
 codes:[ ['R','riluzole'],['E','edaravone'],['A','AMX0035'],['T','tofersen'],['M','masitinib'],['B','methylcobalamin'],['N','dextromethorphan-quinidine'] ],
 scale:'axis stretched after 2015',
 before:'Before the first approval',
 head:(date,lane)=>lane?`${date} · ${lane}`:date
};
const DR_EV=[
 {d:[1995,12,12],l:'fda',c:'R',s:'ok',date:'12 December 1995',h:'Rilutek (riluzole) tablets approved',
  txt:'The FDA approved riluzole tablets for ALS, the first drug for the disease. The US indication reads "treatment of amyotrophic lateral sclerosis (ALS)". <sup class="c" data-ref="DrugsFDA,FDA2026Riluzole" title="Source 149,177">149,177</sup>'},
 {d:[1996,6,10],l:'ema',c:'R',s:'ok',date:'10 June 1996',h:'Rilutek authorised in the EU',
  txt:'The EU indication is "to extend life or the time to mechanical ventilation". The CHMP opinion was dated 14 February 1996. <sup class="c" data-ref="EMA_Rilutek" title="Source 162">162</sup>'},
 {d:[2010,10,29],l:'fda',c:'N',s:'ok',date:'29 October 2010',h:'Nuedexta approved for pseudobulbar affect',
  txt:'Dextromethorphan-quinidine treats pseudobulbar affect (uncontrollable laughing or crying); it does not slow ALS. <sup class="c" data-ref="DrugsFDA,Brooks2004" title="Source 76,149">76,149</sup>'},
 {d:[2015,6,5],l:'jp',c:'E',s:'ok',date:'June 2015',h:'Edaravone (Radicut) for ALS in Japan',
  txt:'The PMDA First Committee on New Drugs backed the ALS indication on 5 June 2015, and edaravone was approved for ALS in Japan that year. <sup class="c" data-ref="PMDA2015Radicut,Watanabe2018" title="Source 427,530">427,530</sup> The exact approval date is not given here because it could not be checked at the regulator.'},
 {d:[2017,5,5],l:'fda',c:'E',s:'ok',date:'5 May 2017',h:'Radicava (edaravone) IV approved',
  txt:'Approved on one positive 137-person trial in a selected early-stage group (MCI186-19). The US indication is not restricted to that group. <sup class="c" data-ref="DrugsFDA,MCI186Group2017,FDA2026Radicava" title="Source 149,176,325">149,176,325</sup>'},
 {d:[2017,7,1],l:'tr',c:'E',s:'pos',date:'Published 2017',h:'MCI186-19: edaravone positive in a selected group',
  txt:'ALSFRS-R change at 24 weeks −5.01 vs −7.50, difference 2.49 (95% CI 0.99 to 3.98), in people chosen by criteria from a post hoc analysis of the earlier negative trial. <sup class="c" data-ref="MCI186Group2017,EdaravoneALS16Group2017" title="Source 152,325">152,325</sup>'},
 {d:[2018,7,26],l:'ema',c:'M',s:'no',date:'26 July 2018',h:'Alsitek (masitinib) refused in the EU',
  txt:'Negative opinion on 18 April 2018, refusal on 26 July 2018, citing inspection findings at two sites and an "arbitrary" patient grouping. <sup class="c" data-ref="EMA_Masitinib" title="Source 161">161</sup>'},
 {d:[2018,9,5],l:'fda',c:'R',s:'ok',date:'5 September 2018',h:'Tiglutik (riluzole oral suspension) approved',
  txt:'A liquid form, 5 mg/mL (50 mg = 10 mL twice daily), which can be given by mouth or through a PEG tube. <sup class="c" data-ref="DrugsFDA,FDA2026Tiglutik" title="Source 149,178">149,178</sup>'},
 {d:[2018,10,3],l:'hc',c:'E',s:'ok',date:'3 October 2018',h:'Radicava authorised in Canada',
  txt:'Health Canada issued a Notice of Compliance for Radicava. That date comes from Health Canada summaries that were not read in full; Health Canada\'s drug database lists it on the market from 29 October 2019. <sup class="c" data-ref="HC2018Radicava,HCDPD_Radicava" title="Source 224,228">224,228</sup>'},
 {d:[2019,5,24],l:'ema',c:'E',s:'no',date:'24 May 2019',h:'Radicava EU application withdrawn',
  txt:'The company withdrew its application. The CHMP\'s provisional view was that it "could not have been approved": one small main study, an imbalance favouring milder disease in the edaravone arm, 24 weeks too short to show lasting benefit, and an uninterpretable registry comparison. <sup class="c" data-ref="EMA2019Radicava" title="Source 158">158</sup>'},
 {d:[2019,11,22],l:'fda',c:'R',s:'ok',date:'22 November 2019',h:'Exservan (riluzole oral film) approved',
  txt:'An oral film form of riluzole. Drugs@FDA now lists it as discontinued. <sup class="c" data-ref="DrugsFDA" title="Source 149">149</sup>'},
 {d:[2020,9,1],l:'tr',c:'A',s:'pos',date:'Published 2020',h:'CENTAUR: AMX0035 positive in phase 2',
  txt:'137 people: ALSFRS-R slope −1.24 vs −1.66 points/month, difference 0.42 (95% CI 0.03 to 0.81; P = 0.03). Secondary outcomes did not differ. <sup class="c" data-ref="Paganoni2020" title="Source 415">415</sup>'},
 {d:[2022,5,12],l:'fda',c:'E',s:'ok',date:'12 May 2022',h:'Radicava ORS (oral edaravone) approved',
  txt:'Approved on a bioavailability bridge: 105 mg by mouth, fasting, gave the same exposure as 60 mg IV. <sup class="c" data-ref="DrugsFDA,FDA2026Radicava" title="Source 149,176">149,176</sup>'},
 {d:[2022,6,1],l:'hc',c:'A',s:'cond',date:'1 June 2022',h:'Albrioza (AMX0035) authorised with conditions in Canada',
  txt:'A Notice of Compliance with conditions, depending on a phase 3 confirmatory trial. <sup class="c" data-ref="HC_Albrioza" title="Source 226">226</sup>'},
 {d:[2022,9,22],l:'tr',c:'T',s:'neg',date:'Published 2022',h:'VALOR: tofersen misses its clinical endpoint',
  txt:'ALSFRS-R difference 1.2 points (95% CI −3.2 to 5.5; P = 0.97) at 28 weeks, while CSF SOD1 and plasma NfL fell. <sup class="c" data-ref="Miller2022" title="Source 335">335</sup> See <a href="#tofersen" data-go="tofersen">Tofersen, gene-targeted</a>.'},
 {d:[2022,9,29],l:'fda',c:'A',s:'ok',date:'29 September 2022',h:'Relyvrio (AMX0035) approved',
  txt:'Approved on the phase 2 CENTAUR data, before the phase 3 result. <sup class="c" data-ref="DrugsFDA,Paganoni2020" title="Source 149,415">149,415</sup>'},
 {d:[2023,4,25],l:'fda',c:'T',s:'cond',date:'25 April 2023',h:'Qalsody (tofersen): accelerated approval',
  txt:'For adults with SOD1-ALS, based on reduction in plasma neurofilament light chain; the presymptomatic ATLAS trial is the confirmatory study. <sup class="c" data-ref="DrugsFDA,FDA2023Qalsody,Biogen2023" title="Source 61,149,172">61,149,172</sup>'},
 {d:[2024,1,5],l:'ema',c:'A',s:'no',date:'5 January 2024',h:'Albrioza (AMX0035) refused in the EU',
  txt:'Negative opinion 22 June 2023, confirmed on re-examination 12 October 2023, refusal 5 January 2024. The main study did not convincingly show slowing, and the survival data were judged unreliable. <sup class="c" data-ref="EMA2023Albrioza" title="Source 159">159</sup>'},
 {d:[2024,3,8],l:'tr',c:'A',s:'neg',date:'8 March 2024',h:'PHOENIX: AMX0035 negative in phase 3',
  txt:'664 adults, 48 weeks: the primary endpoint (ALSFRS-R change, p = 0.667) and all secondary endpoints were missed. <sup class="c" data-ref="Amylyx2024,CTgov_PHOENIX" title="Source 17,125">17,125</sup>'},
 {d:[2024,4,4],l:'fda',c:'A',s:'out',date:'4 April 2024',h:'Relyvrio withdrawal begins in the US',
  txt:'Amylyx began voluntary withdrawal, stopped new starts that day and moved existing users to a free-drug programme. <sup class="c" data-ref="Amylyx2024" title="Source 17">17</sup>'},
 {d:[2024,4,7],l:'hc',c:'A',s:'out',date:'4 April 2024',h:'Albrioza withdrawal begins in Canada',
  txt:'Withdrawal began on the same day. Health Canada confirmed it would leave the Canadian market by 31 December 2024. <sup class="c" data-ref="Amylyx2024,HC_Albrioza" title="Source 17,226">17,226</sup>'},
 {d:[2024,5,29],l:'ema',c:'T',s:'cond',date:'29 May 2024',h:'Qalsody authorised in the EU, exceptional circumstances',
  txt:'Positive CHMP opinion 22 February 2024. Obligations include long-term data, a study in presymptomatic carriers and a registry with yearly reports. <sup class="c" data-ref="EMA2024Qalsody" title="Source 160">160</sup>'},
 {d:[2024,8,26],l:'jp',c:'B',s:'ok',date:'26 August 2024',h:'Ultra-high-dose methylcobalamin backed in Japan',
  txt:'The Japanese committee backed Rozebalamin for Injection 25 mg for slowing functional impairment in ALS (50 mg intramuscular twice weekly). <sup class="c" data-ref="PMDA2024Rozebalamin" title="Source 428">428</sup> The approval that followed is not dated here because its date could not be checked at the regulator. No FDA or EMA approval was found.'},
 {d:[2024,12,19],l:'ema',c:'M',s:'no',date:'19 December 2024',h:'Masitinib refused in the EU a second time',
  txt:'A new application got a negative opinion on 27 June 2024, confirmed on 17 October 2024, and was refused on 19 December 2024. <sup class="c" data-ref="EMA_Masitinib" title="Source 161">161</sup>'},
 {d:[2025,2,28],l:'hc',c:'T',s:'cond',date:'28 February 2025',h:'Qalsody authorised with conditions in Canada',
  txt:'Health Canada issued a Notice of Compliance with conditions. That date comes from Health Canada summaries that were not read in full; Health Canada\'s drug database lists it on the market from 14 May 2025. <sup class="c" data-ref="HC2025Qalsody,HCDPD_Qalsody" title="Source 225,227">225,227</sup>'},
 {d:[2026,10,1],l:null,c:'',s:'none',date:'October 2026',h:'No new FDA or EMA approval found',
  txt:'Through October 2026 no new disease-modifying ALS approval by the FDA or the EMA was found. The ATLAS trial of tofersen in presymptomatic SOD1 carriers has an estimated primary completion in August 2027. <sup class="c" data-ref="CTgov_ATLAS" title="Source 123">123</sup>'}
];
const DR_NEG=[
  ['Ceftriaxone (raises EAAT2 glutamate uptake)','NCT00349622','3-stage RCT; 513 in stage 3; 4 g/day IV','ALSFRS-R slope difference 0.09/month (−0.06 to 0.24); survival HR 0.90 (0.71 to 1.15); hepatobiliary adverse events 62% vs 11%','Cudkowicz2014'],
 ['Dexpramipexole (mitochondrial)','EMPOWER','943; 150 mg twice daily; 12 to 18 months','CAFS 441.76 vs 438.84 (p = 0.86); ALSFRS-R −13.34 vs −13.42; neutropenia 8% vs 2%','Cudkowicz2013'],
 ['Lithium (autophagy)','LiCALS (UK)','214 on riluzole; 18 months','18-month survival 50% vs 59%; odds ratio 0.71 (0.40 to 1.24)','Morrison2013'],
 ['Lithium, pooled by genotype','Individual-patient meta-analysis of 3 RCTs','518','Overall HR 1.0 (0.7 to 1.4); a post hoc signal in UNC13A carriers','vanEijk2017'],
 ['Edaravone IV, more advanced disease','MCI186-18','25; Japan ALS severity grade 3','−6.52 vs −6.00 (p = 0.835)','EdaravoneALS18Group2017'],
 ['Edaravone oral (FAB122)','ADORE','313; 48 weeks','ALSFRS-R −11.2 vs −10.8; primary not met','CTgov_ADORE'],
 ['Edaravone, daily vs on/off oral','MT-1186-A02','384; 48 weeks','CAFS p = 0.777; stopped for futility','CTgov_MT1186A02'],
 ['AMX0035','PHOENIX','664; 48 weeks','Primary p = 0.667; secondaries not met','Amylyx2024'],
 ['Reldesemtiv (troponin activator)','COURAGE-ALS','486 randomised; stopped for futility','ALSFRS-R −1.1 (favoured placebo); win ratio 0.91','Shefner2025']
];
/* the citation markers for the table, written out so the build can number them */
const DR_NEGC={Cudkowicz2014:'<sup class="c" data-ref="Cudkowicz2014" title="Source 128">128</sup>',Cudkowicz2013:'<sup class="c" data-ref="Cudkowicz2013" title="Source 127">127</sup>',Morrison2013:'<sup class="c" data-ref="Morrison2013" title="Source 351">351</sup>',vanEijk2017:'<sup class="c" data-ref="vanEijk2017" title="Source 512">512</sup>',EdaravoneALS18Group2017:'<sup class="c" data-ref="EdaravoneALS18Group2017" title="Source 153">153</sup>',CTgov_ADORE:'<sup class="c" data-ref="CTgov_ADORE" title="Source 122">122</sup>',CTgov_MT1186A02:'<sup class="c" data-ref="CTgov_MT1186A02" title="Source 124">124</sup>',Amylyx2024:'<sup class="c" data-ref="Amylyx2024" title="Source 17">17</sup>',Shefner2025:'<sup class="c" data-ref="Shefner2025" title="Source 465">465</sup>'};
const DR_ALT={
 rows:[ {n:'US label',m:[0,1,2,3],per:3},{n:'EU SmPC',m:[0,1,2,3,6,9,12],per:12}],
 ticks:[ [0,'start'],[1,'1'],[2,'2'],[3,'3'],[6,'6'],[9,'9'],[12,'12'] ],
 months:'months of treatment',later:'later',per:'periodically'
};
inits.drugs=()=>{
  /* ---------- player 1: the synapse ---------- */
  const svg=$('#drSvg'),rg=$('#drT');let drug='none';
  const R=rng(31);const JIT=Array.from({length:40},()=>[R()*2-1,R()*2-1,R()]);
  function gauge(x,y,w,lbl,v,col){
    let g=`<text x="${x}" y="${y}" class="t-sm">${lbl}</text>`;
    g+=`<rect x="${x}" y="${y+6}" width="${w}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    g+=`<rect x="${x}" y="${y+6}" width="${f1(Math.max(6,w*clamp(v)))}" height="12" rx="6" style="fill:${col}"/>`;
    g+=`<text x="${x}" y="${y+31}" class="t-xs">${DR_TXT.low}</text><text x="${x+w}" y="${y+31}" class="t-xs t-end">${DR_TXT.high}</text>`;
    return g}
  function draw(t){
    const N=vb(svg,'720 420','400 708');
    const L=N?{sx:10,sy:6,gx:20,gy:430,gw:360,gs:50,bx:20,by:590,bw:360}
             :{sx:40,sy:8,gx:470,gy:34,gw:240,gs:56,bx:470,by:226,bw:240};
    const rilu=drug==='rilu',eda=drug==='eda';
    const loss=ease(ramp(t,.16,.3)), caOn=ease(ramp(t,.3,.45)), rosOn=ease(ramp(t,.46,.6)), sum=ramp(t,.68,.76);
    const glut=(.18+.62*loss)*(rilu?.6:1);
    const ca=(.12+.75*caOn*(.3+.7*loss))*(rilu?.6:1);
    const rosRaw=(.08+.82*rosOn*(.3+.7*ca));const ros=rosRaw*(eda?.4:1);
    let s=`<defs>${marker('drA')}</defs>`;
    s+=`<g transform="translate(${L.sx} ${L.sy})">`;
    /* astrocyte (right, wrapping the cleft) */
    s+=`<path d="M262 18 C300 6 360 20 372 60 C384 110 376 200 356 250 C340 290 300 300 286 270 C276 246 290 214 280 186 C272 168 258 166 256 150 L256 124 C258 108 272 104 270 84 C268 60 246 36 262 18Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<text x="318" y="60" class="t-lbl t-mid">${DR_TXT.astro}</text>`;
    /* EAAT2 transporters on the astrocyte membrane facing the cleft */
    const TR=[124,134,144,154];
    TR.forEach((y,i)=>{const lost=i>0?loss:0;
      s+=`<rect x="251" y="${y-4}" width="12" height="8" rx="3" style="fill:var(--steel);opacity:${f1(1-.8*lost)};${lost>.5?'stroke:var(--steel);stroke-dasharray:2 2;fill-opacity:.2':''}"/>`});
    s+=`<text x="276" y="140" class="t-xs">${DR_TXT.eaat}</text>`;
    /* presynaptic terminal */
    s+=`<rect x="60" y="10" width="180" height="108" rx="40" style="fill:var(--umn-soft);stroke:var(--umn);stroke-width:1.8"/>`;
    s+=`<text x="150" y="34" class="t-lbl t-mid">${DR_TXT.pre}</text>`;
    /* Na+ channel on the left wall */
    s+=`<rect x="54" y="62" width="12" height="22" rx="3" style="fill:var(--panel);stroke:var(--umn);stroke-width:1.6"/><text x="72" y="70" class="t-xs">${DR_TXT.na}</text>`;
    const pulse=(t*30)%1;
    if(!rilu)s+=`<circle cx="${f1(lerp(36,62,pulse))}" cy="73" r="3" style="fill:var(--umn);opacity:${f1(1-pulse)}"/>`;
    if(rilu||(drug==='none'&&sum>0)){const o=rilu?1:.6*sum;
      s+=`<g style="opacity:${f1(o)}"><rect x="50" y="66" width="20" height="14" rx="4" style="fill:var(--treat);${rilu?'':'fill-opacity:.15;stroke:var(--treat);stroke-dasharray:3 2'}"/><text x="72" y="92" class="t-xs" style="fill:var(--treat)">${DR_TXT.rilu}</text></g>`}
    /* vesicles */
    [ [160,64],[188,58],[214,70],[172,90],[202,94] ].forEach(([x,y],i)=>{s+=`<circle cx="${x}" cy="${y}" r="9" style="fill:var(--panel);stroke:var(--umn);stroke-width:1.2"/>`;
      for(let k=0;k<3;k++)s+=`<circle cx="${f1(x-3+k*3)}" cy="${f1(y+(k%2?2:-2))}" r="1.6" style="fill:var(--steel)"/>`});
    /* motor neuron (postsynaptic) */
    s+=`<path d="M40 160 L250 160 L250 300 C250 360 200 392 140 392 C80 392 40 360 40 300Z" style="fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.8"/>`;
    s+=`<text x="150" y="374" class="t-lbl t-mid">${DR_TXT.post}</text>`;
    s+=`<text x="54" y="143" class="t-xs t-end">${DR_TXT.cleft}</text>`;
    /* receptors */
    const AM={x:100,y:160},NM={x:190,y:160};
    [ [AM,DR_TXT.ampa],[NM,DR_TXT.nmda] ].forEach(([p,l])=>{const open=.4+.6*Math.min(1,glut*1.4);
      s+=`<rect x="${p.x-12}" y="${p.y-6}" width="9" height="16" rx="3" style="fill:var(--lmn)"/><rect x="${p.x+3}" y="${p.y-6}" width="9" height="16" rx="3" style="fill:var(--lmn)"/>`;
      s+=`<rect x="${f1(p.x-3)}" y="${p.y-5}" width="6" height="14" style="fill:var(--panel);opacity:${f1(open)}"/>`;
      s+=`<text x="${p.x}" y="${p.y+24}" class="t-xs t-mid">${l}</text>`});
    if(rilu)s+=`<rect x="${NM.x-14}" y="${NM.y-10}" width="28" height="5" rx="2" style="fill:var(--treat)"/>`;
    /* glutamate quanta */
    const clock=t*30,pn=Math.floor(clock),nq=rilu?3:5,clearT=lerp(.35,2.8,loss);
    for(let k=0;k<5;k++){const age=clock-(pn-k);if(pn-k<0)continue;
      for(let q=0;q<nq;q++){const j=JIT[(q*7+((pn-k)%5)*3)%40];
        const sx=120+q*22,sy=116,rec=q%2?NM:AM,rx=rec.x+j[0]*10,ry=150;
        let x,y,o=1;
        if(age<.3){const u=ease(age/.3);x=lerp(sx,rx,u);y=lerp(sy,ry,u)}
        else if(age<.3+clearT){const w=age*6+j[2]*6;x=clamp(rx+Math.sin(w)*8+(age-.3)*14*j[1],66,244);y=144+Math.cos(w*1.3)*5}
        else if(age<.6+clearT){const u=(age-.3-clearT)/.3;x=lerp(clamp(rx+(clearT)*14*j[1],66,244),252,u);y=lerp(144,TR[q%4],u);o=1-u}
        else continue;
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.2" style="fill:var(--steel);opacity:${f1(o)}"/>`}}
    /* mitochondrion */
    const MX=150,MY=292;
    s+=`<ellipse cx="${MX}" cy="${MY}" rx="54" ry="22" style="fill:var(--panel);stroke:var(--lmn);stroke-width:1.6"/>`;
    s+=`<path d="M${MX-38} ${MY} q8 -14 16 0 t16 0 16 0 16 0 16 0" style="fill:none;stroke:var(--lmn);stroke-width:1.2;opacity:.7"/>`;
    s+=`<text x="${MX}" y="${MY+46}" class="t-xs t-mid">${DR_TXT.mito}</text>`;
    /* calcium ions: receptors -> mitochondrion */
    const nCa=Math.round(lerp(1,9,ca));
    for(let i=0;i<nCa;i++){const u=((t*9)+i/nCa)%1,src=i%2?NM:AM,j=JIT[i];
      const x=lerp(src.x,MX+j[0]*36,u),y=lerp(src.y+12,MY-16,u);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:var(--warn);opacity:${f1(bump(u,0,1)*.9+.1)}"/>`}
    if(ca>.3)s+=`<text x="232" y="210" class="t-xs t-end" style="fill:var(--warn)">${DR_TXT.ca}</text>`;
    /* free radicals */
    const nR=Math.round(lerp(0,9,rosRaw));
    for(let i=0;i<nR;i++){const a=i/9*Math.PI*2+t*2,rr=62+8*Math.sin(t*20+i),x=MX+Math.cos(a)*rr,y=MY+Math.sin(a)*rr*.45;
      const caught=eda&&i%5!==0;
      if(caught){s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--muted);opacity:.6"/><circle cx="${f1(x+6)}" cy="${f1(y-4)}" r="4.2" style="fill:var(--treat)"/>`}
      else s+=`<path d="M${f1(x)} ${f1(y-6)} L${f1(x+2)} ${f1(y-2)} L${f1(x+6)} ${f1(y)} L${f1(x+2)} ${f1(y+2)} L${f1(x)} ${f1(y+6)} L${f1(x-2)} ${f1(y+2)} L${f1(x-6)} ${f1(y)} L${f1(x-2)} ${f1(y-2)}Z" style="fill:var(--tdp)"/>`}
    if(rosRaw>.25)s+=`<text x="${MX}" y="${MY-46}" class="t-xs t-mid" style="fill:var(--tdp)">${DR_TXT.ros}</text>`;
    if(eda||(drug==='none'&&sum>0)){const o=eda?1:.6*sum;
      s+=`<g style="opacity:${f1(o)}">${eda?'':`<ellipse cx="${MX}" cy="${MY}" rx="76" ry="40" style="fill:none;stroke:var(--treat);stroke-dasharray:4 3"/>`}<text x="${MX}" y="${MY+60}" class="t-xs t-mid" style="fill:var(--treat)">${DR_TXT.eda}</text></g>`}
    s+='</g>';
    /* gauges */
    [ [glut,'var(--steel)'],[ca,'var(--warn)'],[ros,'var(--tdp)'] ].forEach(([v,c],i)=>{s+=gauge(L.gx,L.gy+i*L.gs,L.gw,DR_TXT.gauges[i],v,c)});
    s+=`<text x="${L.gx}" y="${L.gy+3*L.gs-6}" class="t-xs">${DR_TXT.schem}</text>`;
    /* drug box */
    const lines=DR_TXT.ovLines[drug],hasU=drug!=='none',bh=30+lines.length*15+(hasU?36:0);
    s+=`<rect x="${L.bx}" y="${L.by}" width="${L.bw}" height="${bh}" rx="10" style="fill:${drug==='none'?'var(--panel-2)':'var(--treat-soft)'};stroke:${drug==='none'?'var(--line)':'var(--treat)'}"/>`;
    s+=`<text x="${L.bx+12}" y="${L.by+20}" class="t-lbl" style="${drug==='none'?'':'fill:var(--treat)'}">${DR_TXT.ovTitle[drug]}</text>`;
    lines.forEach((l,i)=>{s+=`<text x="${L.bx+12}" y="${L.by+38+i*15}" class="t-sm">${l}</text>`});
    if(hasU)DR_TXT.unknown.forEach((l,i)=>{s+=`<text x="${L.bx+12}" y="${L.by+46+lines.length*15+i*15}" class="t-sm" style="fill:var(--ink);font-weight:600">${l}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(DR_STEPS,t);setSt(p);
    $('#drNote').innerHTML=noteHTML(DR_STEPS[p])+(DR_DRUG[drug]?`<p class="callout">${DR_DRUG[drug]}</p>`:'');
    $('#drCap').textContent=DR_TXT.cap[drug]+' '+DR_TXT.capTail;
  }
  const stop=playWire(rg,$('#drPlay'),draw,15000,UI.replay,'drugs');
  const setSt=stepWire($('#drSteps'),DR_STEPS,rg,draw,stop);
  toggleRow($('#drDrug'),DR_TXT.drugs,'none',v=>{drug=v;draw(+rg.value)});
  draw(+rg.value);

  /* ---------- player 2: approvals timeline ---------- */
  const tsv=$('#drTlSvg'),trg=$('#drTlT');
  const Y0=1995.6,Y1=2026.9,yr=d=>d[0]+(d[1]-1)/12+(d[2]-1)/365;
  const EV=DR_EV.map((e,i)=>Object.assign({},e,{y:yr(e.d),i}));
  const LANES=['fda','ema','hc','jp','tr'];
  const tY=v=>lerp(Y0,Y1,v),tV=y=>clamp((y-Y0)/(Y1-Y0));
  const curOf=y=>{let c=-1;EV.forEach((e,i)=>{if(e.y<=y+1e-6)c=i});return c};
  const glyph=(x,y,e,o,sel)=>{const r=8;let g=`<g style="opacity:${f1(o)}">`;
    if(sel)g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="13" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
    const col=e.s==='ok'||e.s==='cond'||e.s==='pos'?'var(--good)':'var(--bad)';
    if(e.s==='ok')g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${col}"/>`;
    else if(e.s==='cond')g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--panel);stroke:${col};stroke-width:2.6"/>`;
    else if(e.s==='no')g+=`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="2" style="fill:var(--panel);stroke:${col};stroke-width:2.4"/>`;
    else if(e.s==='out')g+=`<path d="M${f1(x-r-1)} ${f1(y-r+1)} H${f1(x+r+1)} L${f1(x)} ${f1(y+r+2)}Z" style="fill:${col}"/>`;
    else g+=`<path d="M${f1(x)} ${f1(y-r-2)} L${f1(x+r+2)} ${f1(y)} L${f1(x)} ${f1(y+r+2)} L${f1(x-r-2)} ${f1(y)}Z" style="fill:${e.s==='pos'?'var(--good-soft)':'var(--bad-soft)'};stroke:${col};stroke-width:2"/>`;
    const filled=e.s==='ok'||e.s==='out';
    g+=`<text x="${f1(x)}" y="${f1(y+(e.s==='out'?1:3.5))}" class="t-xs t-mid" style="font-weight:700;fill:${filled?'var(--panel)':'var(--ink)'}">${e.c}</text>`;
    return g+'</g>'};
  const wrap=(txt,n)=>{const w=txt.split(' ');const out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n&&l){out.push(l);l=x}else l=(l+' '+x).trim()});if(l)out.push(l);return out};
  function drawTl(v){
    const N=vb(tsv,'720 352','400 494');
    const L=N?{x0:22,x1:378,F:.22,lane0:96,lh:66,lab:4,rows:[18,34,50],sep:62,lx:22,ax:446,wrapN:44,band:[16,36]}
             :{x0:120,x1:704,F:.28,lane0:74,lh:44,lab:26,rows:[15,30,30],sep:42,lx:8,ax:306,wrapN:80,band:[16,36]};
    const X=y=>y<2015?L.x0+(y-Y0)/(2015-Y0)*L.F*(L.x1-L.x0):L.x0+L.F*(L.x1-L.x0)+(y-2015)/(Y1-2015)*(1-L.F)*(L.x1-L.x0);
    const y=tY(v),cur=curOf(y);
    /* row assignment inside each lane */
    const pos={};LANES.forEach(ln=>{const last=N?[-99,-99,-99]:[-99,-99];EV.filter(e=>e.l===ln).forEach(e=>{const x=X(e.y);let r=last.findIndex(lx=>x-lx>=18);if(r<0)r=last.indexOf(Math.min(...last));last[r]=x;pos[e.i]=[x,r]})});
    let s='';
    /* band: the selected event */
    const E=cur>=0?EV[cur]:null;
    if(E){s+=`<text x="${L.lx}" y="${L.band[0]}" class="t-sm">${DR_TXT.head(E.date,E.l?DR_TXT.lanes[E.l]:'')}</text>`;
      const tl=wrap(E.h,L.wrapN);tl.forEach((l,i)=>{s+=`<text x="${L.lx}" y="${L.band[1]+i*17}" class="t-lbl">${l}</text>`});
      s+=`<text x="${L.lx}" y="${L.band[1]+tl.length*17+2}" class="t-xs" style="fill:${E.s==='ok'||E.s==='cond'||E.s==='pos'?'var(--good)':E.s==='none'?'var(--muted)':'var(--bad)'}">${DR_TXT.st[E.s]}</text>`}
    else s+=`<text x="${L.lx}" y="${L.band[1]}" class="t-lbl">${DR_TXT.before}</text>`;
    /* lanes */
    LANES.forEach((ln,k)=>{const ly=L.lane0+k*L.lh;
      if(k<LANES.length-1)s+=`<line x1="${N?L.x0:L.lx}" x2="${L.x1}" y1="${ly+L.sep}" y2="${ly+L.sep}" class="grid"/>`;
      s+=`<text x="${N?L.x0:L.lx}" y="${ly+L.lab}" class="t-sm" style="fill:var(--ink)">${DR_TXT.lanes[ln]}</text>`;
      EV.filter(e=>e.l===ln).forEach(e=>{const [x,r]=pos[e.i];
        s+=glyph(x,ly+L.rows[r],e,e.y<=y+1e-6?1:.16,e.i===cur)})});
    /* axis */
    const ay=L.ax;s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${ay}" y2="${ay}" class="axis"/>`;
    (N?[1995,2005,2015,2018,2021,2024]:[1995,2000,2005,2010,2015,2017,2019,2021,2023,2025]).forEach(Y=>{const x=X(Math.max(Y,Y0));s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ay}" y2="${ay+5}" class="axis"/><text x="${f1(x)}" y="${ay+17}" class="t-xs t-mid">${Y}</text>`});
    const xb=X(2015);s+=`<text x="${f1(xb+4)}" y="${ay-5}" class="t-xs" style="opacity:.8">${DR_TXT.scale}</text>`;
    /* cursor */
    const cx=X(y);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.lane0-6}" y2="${ay}" style="stroke:var(--treat);stroke-width:2"/>`;
    const bxx=clamp(cx-22,L.x0-6,L.x1-38);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${ay}" y2="${ay+24}" style="stroke:var(--treat);stroke-width:2"/><rect x="${f1(bxx)}" y="${ay+24}" width="44" height="18" rx="9" style="fill:var(--treat)"/><text x="${f1(bxx+22)}" y="${ay+37}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${Math.floor(y)}</text>`;
    tsv.innerHTML=s;
    const n=E?noteHTML({k:DR_TXT.head(E.date,E.l?DR_TXT.lanes[E.l]:''),t:E.h,txt:`<span class="tag ${E.s==='ok'||E.s==='cond'||E.s==='pos'?'good':E.s==='none'?'':'bad'}">${DR_TXT.st[E.s]}</span> ${E.txt}`}):noteHTML({k:'1995',t:DR_TXT.before,txt:''});
    $('#drTlNote').innerHTML=n;
    $$('#drTlChips [data-ev]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ev===cur));
    trg.setAttribute('aria-valuetext',E?DR_TXT.head(E.date,E.h):DR_TXT.before);
  }
  const stopTl=playWire(trg,$('#drTlPlay'),drawTl,22000,UI.replay,'drugs');
  const jump=i=>{stopTl();const e=EV[clamp(i,0,EV.length-1)];trg.value=tV(e.y+.002);drawTl(+trg.value)};
  $('#drTlPrev').onclick=()=>{const c=curOf(tY(+trg.value));jump(c<=0?0:c-1)};
  $('#drTlNext').onclick=()=>{const c=curOf(tY(+trg.value));jump(c+1)};
  $('#drTlChips').innerHTML=EV.map(e=>`<button class="tag" data-ev="${e.i}" aria-pressed="false"><b>${e.d[0]}</b>${e.h}</button>`).join('');
  $('#drTlChips').addEventListener('click',ev=>{const b=ev.target.closest('[data-ev]');if(b)jump(+b.dataset.ev)});
  const sw=(sh)=>`<svg class="glyph" width="18" height="18" viewBox="-10 -10 20 20" aria-hidden="true">${sh}</svg>`;
  $('#drTlLegend').innerHTML=[
    [sw('<circle r="7" style="fill:var(--good)"/>'),DR_TXT.st.ok],
    [sw('<circle r="7" style="fill:var(--panel);stroke:var(--good);stroke-width:2.4"/>'),DR_TXT.st.cond],
    [sw('<rect x="-7" y="-7" width="14" height="14" rx="2" style="fill:var(--panel);stroke:var(--bad);stroke-width:2.2"/>'),DR_TXT.st.no],
    [sw('<path d="M-8 -6 H8 L0 8Z" style="fill:var(--bad)"/>'),DR_TXT.st.out],
    [sw('<path d="M0 -9 L9 0 L0 9 L-9 0Z" style="fill:var(--good-soft);stroke:var(--good);stroke-width:2"/>'),DR_TXT.st.pos],
    [sw('<path d="M0 -9 L9 0 L0 9 L-9 0Z" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/>'),DR_TXT.st.neg]
  ].map(([g,l])=>`<span>${g}${l}</span>`).join('')+DR_TXT.codes.map(([c,n])=>`<span><b>${c}</b>${n}</span>`).join('');
  drawTl(+trg.value);

  /* ---------- liver-test schedule chart ---------- */
  const asv=$('#drAltSvg');
  function drawAlt(){
    const N=vb(asv,'720 160','400 200');
    const L=N?{x0:24,x1:310,xe:380,rows:[52,118],lab:(r)=>[24,r-24],ax:174}
             :{x0:170,x1:600,xe:700,rows:[46,96],lab:(r)=>[10,r+4],ax:140};
    const X=m=>L.x0+m/12*(L.x1-L.x0);
    let s='';
    DR_ALT.rows.forEach((row,k)=>{const y=L.rows[k],[lx,ly]=L.lab(y);
      s+=`<text x="${lx}" y="${ly}" class="t-lbl">${row.n}</text>`;
      s+=`<line x1="${X(0)}" x2="${X(row.per)}" y1="${y}" y2="${y}" style="stroke:var(--treat);stroke-width:2"/>`;
      s+=`<line x1="${X(row.per)}" x2="${L.xe}" y1="${y}" y2="${y}" style="stroke:var(--treat);stroke-width:2;stroke-dasharray:5 5"/>`;
      s+=`<text x="${f1((X(row.per)+L.xe)/2)}" y="${y-11}" class="t-xs t-mid" style="fill:var(--treat)">${DR_ALT.per}</text>`;
      row.m.forEach(m=>{s+=`<circle cx="${f1(X(m))}" cy="${y}" r="7" style="fill:var(--treat)"/>`})});
    s+=`<line x1="${L.x0}" x2="${L.xe}" y1="${L.ax-14}" y2="${L.ax-14}" class="axis"/>`;
    DR_ALT.ticks.forEach(([m,l])=>{s+=`<text x="${f1(X(m))}" y="${L.ax}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${f1((X(12)+L.xe)/2)}" y="${L.ax}" class="t-xs t-mid">${DR_ALT.later}</text>`;
    s+=`<text x="${L.x0}" y="${L.ax+16}" class="t-xs">${DR_ALT.months}</text>`;
    asv.innerHTML=s}
  drawAlt();
  const prev=redraws.drugs;redraws.drugs=()=>{prev&&prev();drawAlt()};

  /* ---------- negative trials table ---------- */
  $('#drNeg').innerHTML=DR_NEG.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]} ${DR_NEGC[r[4]]}</td></tr>`).join('');
};
/* =============== 3.2 tofersen, gene-targeted =============== */
const TF_STEPS=[
 {from:0,at:.06,k:'Step 1 · SOD1-ALS',t:'A toxic SOD1 protein',
  txt:'In SOD1-ALS a disease-causing variant in the SOD1 gene is copied into pre-mRNA, spliced into mRNA and translated into SOD1 protein. Normal SOD1 is a copper-zinc enzyme that turns superoxide into oxygen and hydrogen peroxide. <sup class="c" data-ref="Rosen1993" title="Source 456">456</sup> ALS-linked variants destabilise the protein so it misfolds; the harm comes from a toxic gain of function, since mice lacking SOD1 do not get ALS. <sup class="c" data-ref="Lindberg2002,Reaume1996,Bruijn1998" title="Source 81,293,447">81,293,447</sup> The EMA assessment says the ALS-linked SOD1 variants are assumed to act this way, so the aim is to make less of the protein. <sup class="c" data-ref="EMA2024Qalsody" title="Source 160">160</sup>',
  pt:'A faulty gene makes a protein that harms motor neurons. Making less of that protein is the idea behind tofersen.'},
 {from:.16,at:.22,k:'Step 2 · Delivery',t:'Into the spinal fluid by lumbar puncture',
  txt:'The label dose is 100 mg (15 mL), injected into the lumbar CSF by lumbar puncture over 1 to 3 minutes after about 10 mL of CSF is removed. Three loading doses are given 14 days apart (days 1, 15 and 29), then one every 28 days. <sup class="c" data-ref="FDA2023Qalsody,EMA2024Qalsody" title="Source 160,172">160,172</sup> VALOR gave 8 doses over 24 weeks; the first one is lit on the dose row of the VALOR panel. <sup class="c" data-ref="Miller2022" title="Source 335">335</sup>',
  pt:'The medicine is injected into the fluid around the spinal cord, through a needle in the lower back.',
  hook:'Intrathecal 100 mg: 3 loading doses 14 days apart, then every 28 days.'},
 {from:.3,at:.36,k:'Step 3 · Binding',t:'Tofersen pairs with SOD1 mRNA',
  txt:'Tofersen is a 20-mer 5-10-5 2\'-O-methoxyethyl (MOE) gapmer: 10 central DNA nucleotides flanked by 5 MOE-modified nucleotides on each side, on a mixed phosphorothioate and phosphodiester backbone. <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup> It pairs base by base with SOD1 mRNA, forming an RNA:DNA hybrid at the gap. <sup class="c" data-ref="FDA2023Qalsody,EMA2024Qalsody" title="Source 160,172">160,172</sup>',
  pt:'Tofersen is a short strand of genetic code that sticks to the faulty gene\'s message.'},
 {from:.44,at:.5,k:'Step 4 · RNase H',t:'The message is cut',
  txt:'RNase H recognises the RNA:DNA hybrid and cuts the RNA strand, so the SOD1 message is destroyed and less SOD1 protein is made. <sup class="c" data-ref="EMA2024Qalsody,FDA2023Qalsody" title="Source 160,172">160,172</sup> The gene itself is not changed: the drug lowers how much protein is made from it, which is why it is given again every 28 days.',
  pt:'The cell throws the stuck message away, so it makes less of the harmful protein.',
  hook:'Gapmer antisense oligonucleotide → RNA:DNA hybrid → RNase H cuts SOD1 mRNA → less SOD1 protein.'},
 {from:.58,at:.68,k:'Step 5 · Weeks 0 to 28',t:'SOD1 and NfL fall',
  txt:g=>(g==='fast'
   ?`<span class="ev est">Established (biomarker)</span> Faster-progressing group, the primary analysis (n = 60): at week 28 CSF SOD1 was 0.71 times baseline on tofersen vs 1.16 on placebo (−29% vs +16%), and plasma neurofilament light (NfL) 0.40 vs 1.20 (−60% vs +20%). <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup>`
   :`<span class="ev est">Established (biomarker)</span> Slower-progressing group (n = 48): the EMA assessment gives CSF SOD1 26% lower and plasma NfL 48% lower than placebo at week 28 (nominal p = 0.0007 and p < 0.0001). It does not give each arm\'s change from baseline, so here the chart shows tofersen relative to placebo. <sup class="c" data-ref="EMA2024Qalsody" title="Source 160">160</sup>`)
   +` NfL fell until about day 113 (around week 16) and then stayed down. <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup> The label\'s headline figures are for everyone randomised (ITT, n = 108): SOD1 0.65 vs 0.98 (−35% vs −2%), NfL 0.45 vs 1.12 (−55% vs +12%). <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup> NfL is released when axons are damaged. <sup class="c" data-ref="Gaiottino2013" title="Source 191">191</sup>`,
  pt:'Within weeks, the harmful protein and a blood marker of nerve damage both went down.'},
 {from:.74,at:.8,k:'Step 6 · VALOR, week 28',t:'The clinical endpoint was missed',
  txt:g=>(g==='fast'
   ?`The primary endpoint was the change in ALSFRS-R to week 28 in the faster-progressing group: −6.98 on tofersen vs −8.14 on placebo, a difference of 1.2 points (95% CI −3.2 to 5.5; P = 0.97). It was not met. <sup class="c" data-ref="Miller2022" title="Source 335">335</sup>`
   :`In the slower-progressing group the change was −1.33 vs −2.73, difference 1.4 points (95% CI −1.1 to 3.9), not significant. <sup class="c" data-ref="EMA2024Qalsody" title="Source 160">160</sup> The primary endpoint, in the faster group, was not met (difference 1.2 points, 95% CI −3.2 to 5.5; P = 0.97). <sup class="c" data-ref="Miller2022" title="Source 335">335</sup>`)
   +` In everyone randomised: −4.5 vs −5.8, difference 1.4 (95% CI −1.3 to 4.1). <sup class="c" data-ref="EMA2024Qalsody" title="Source 160">160</sup> Death or permanent ventilation by week 28 in the faster group: 4 of 39 vs 2 of 21, too few to interpret. <sup class="c" data-ref="EMA2024Qalsody" title="Source 160">160</sup>`,
  pt:'Over the 28 weeks of the trial, people on tofersen did not lose clearly less function than people on placebo.',
  hook:'VALOR missed its 28-week ALSFRS-R primary endpoint: difference 1.2 points (95% CI −3.2 to 5.5), faster-progressing group.'},
 {from:.88,at:.96,k:'Step 7 · Week 52 and approval',t:'Earlier start, and approval on NfL',
  txt:'<span class="ev early">Open-label, nominal</span> 95 of 108 people (88%) entered the open-label extension, where everyone received tofersen. In the 52-week integrated analysis, ALSFRS-R changed by −6.0 with early start vs −9.5 with delayed start: a difference of 3.5 points (95% CI 0.4 to 6.7; nominal p = 0.027, not adjusted for multiplicity). <sup class="c" data-ref="Miller2022,EMA2024Qalsody" title="Source 160,335">160,335</sup> The label says open-label comparisons "should be interpreted with caution" because of possible confounding. <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup> The FDA gave accelerated approval on 25 April 2023, based on the fall in plasma NfL, with the presymptomatic ATLAS trial as confirmatory study; the EU followed on 29 May 2024 under exceptional circumstances. <sup class="c" data-ref="DrugsFDA,FDA2023Qalsody,Biogen2023,EMA2024Qalsody" title="Source 61,149,160,172">61,149,160,172</sup>',
  pt:'People who started earlier lost less function over a year, but this comparison was not blinded, so it is weaker evidence.',
  hook:'Accelerated approval rests on a surrogate endpoint; for tofersen the label names the reduction in plasma NfL. The 52-week difference of 3.5 points is nominal.'}
];
const TF_TXT={
 grp:[ ['fast','Faster-progressing (primary)'],['slow','Slower-progressing'] ],
 start:[ ['early','Early start (tofersen)'],['delayed','Delayed start (placebo first)'] ],
 grpLab:{fast:'Faster-progressing group (primary analysis, n = 60)',slow:'Slower-progressing group (n = 48)'},
 hl:{early:'Highlighted: early start, the group given tofersen from week 0.',delayed:'Highlighted: delayed start, the group given placebo for 28 weeks and then tofersen in the open-label extension.'},
 cap:(g,a)=>`${g} · highlighted: ${a}. Only the week-28 and week-52 values come from the trial; the line shapes between them are schematic.`,
 armShort:{early:'early start',delayed:'delayed start'},
 /* panel 1 */
 p1:'Inside a motor neuron',nucleus:'nucleus',gene:'SOD1 gene',pre:'pre-mRNA',mrna:'mRNA',mrnaC:'SOD1 mRNA',ribo:'ribosome',
 prot:'SOD1 protein',less:'less SOD1 made',tof:'tofersen',moe:'MOE',gap:'DNA gap',rnh:'RNase H',cut:'message cut',
 csf:'CSF (spinal fluid)',toMN:'to motor neurons',lp:'lumbar puncture',lp1:'100 mg in 15 mL, 1 to 3 min',lp2:'about 10 mL CSF removed first',
 /* panel 2 */
 p2:'VALOR: weeks after the first dose',legT:'tofersen (early start)',legP:'placebo (delayed start)',
 regA:'randomised, blinded',regB:'open-label',
 chartA:{fast:'CSF SOD1, × baseline',slow:'CSF SOD1, tofersen ÷ placebo'},
 chartB:{fast:'Plasma NfL, × baseline',slow:'Plasma NfL, tofersen ÷ placebo'},
 chartC:{fast:'ALSFRS-R change, primary endpoint',slow:'ALSFRS-R change',ole:'ALSFRS-R change, 52-week integrated'},
 xb:v=>`${v}×`,vsP:n=>`−${n}%`,pboRef:'placebo = 1',
 brk:{fast:['difference 1.2 points','95% CI −3.2 to 5.5, P = 0.97'],slow:['difference 1.4 points','95% CI −1.1 to 3.9'],ole:['week 52: difference 3.5','95% CI 0.4 to 6.7, nominal']},
 doses:'doses',weeks:'weeks',falls:'falls after the switch',wait:'The weeks start at step 5',
 appr:['FDA: accelerated approval 25 April 2023, on NfL','EU: 29 May 2024, exceptional circumstances','Confirmatory trial: ATLAS (presymptomatic)']
};
const TF_D={
 fast:{s:[.71,1.16],n:[.40,1.20],c:[-6.98,-8.14],lab:'xb'},
 slow:{s:[.74,1],n:[.52,1],c:[-1.33,-2.73],lab:'pct',pct:[26,48]},
 ole:[-6.0,-9.5],doseW:[0,2,4,8,12,16,20,24],xt:[0,4,16,28,52]
};
inits.tofersen=()=>{
  const svg=$('#tfSvg'),rg=$('#tfT');let grp='fast',start='early';
  const sh=u=>(1-Math.exp(-3*u))/(1-Math.exp(-3));
  const along=(P,u)=>{const seg=[];let tot=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(d);tot+=d}
    let r=u*tot;for(let i=0;i<seg.length;i++){if(r<=seg[i]||i===seg.length-1){const k=seg[i]?clamp(r/seg[i]):1;return[lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]}r-=seg[i]}return P[P.length-1]};
  const strand=(x,y,o,sc=1)=>{const w=50*sc;return `<g style="opacity:${f1(o)}"><rect x="${f1(x-w)}" y="${f1(y-3.5*sc)}" width="${f1(w/2)}" height="${f1(7*sc)}" rx="${f1(3*sc)}" style="fill:var(--treat)"/><rect x="${f1(x-w/2)}" y="${f1(y-2.5*sc)}" width="${f1(w)}" height="${f1(5*sc)}" style="fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.2"/><rect x="${f1(x+w/2)}" y="${f1(y-3.5*sc)}" width="${f1(w/2)}" height="${f1(7*sc)}" rx="${f1(3*sc)}" style="fill:var(--treat)"/></g>`};
  const prot=(x,y,o)=>`<g style="opacity:${f1(o)}"><circle cx="${f1(x-4)}" cy="${f1(y)}" r="5.5" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.3"/><path d="M${f1(x+1)} ${f1(y-4)} q7 -3 8 3 q2 6 -5 6 q-5 1 -3 -9z" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.3"/></g>`;
  function panel1(t){
    const tx=ramp(t,.01,.06),sp=ramp(t,.06,.09),ex=ease(ramp(t,.09,.14));
    const inj=ramp(t,.16,.21),trav=ease(ramp(t,.2,.31)),bind=ease(ramp(t,.31,.4));
    const rh=ease(ramp(t,.44,.49)),cut=ease(ramp(t,.49,.53)),frag=ramp(t,.53,.6);
    let s=`<text x="0" y="14" class="t-lbl">${TF_TXT.p1}</text>`;
    s+=`<rect x="0" y="24" width="350" height="238" rx="24" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    /* nucleus, DNA, gene */
    s+=`<ellipse cx="80" cy="140" rx="66" ry="84" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<rect x="141" y="122" width="10" height="16" rx="3" style="fill:var(--cell);stroke:var(--cell-line)"/>`;
    s+=`<text x="80" y="74" class="t-xs t-mid">${TF_TXT.nucleus}</text>`;
    s+=`<path d="${pathFn(u=>.5+.18*Math.sin(u*Math.PI*8),26,134,104,120,60)}" style="fill:none;stroke:var(--nuc);stroke-width:1.6"/>`;
    s+=`<path d="${pathFn(u=>.5-.18*Math.sin(u*Math.PI*8),26,134,104,120,60)}" style="fill:none;stroke:var(--nuc);stroke-width:1.6"/>`;
    s+=`<rect x="44" y="105" width="68" height="14" rx="4" style="fill:var(--tdp);fill-opacity:.18;stroke:var(--tdp);stroke-width:1.4"/>`;
    s+=`<text x="78" y="98" class="t-xs t-mid" style="fill:var(--tdp)">${TF_TXT.gene}</text>`;
    s+=`<path d="M90 106 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1z" style="fill:var(--tdp)"/>`;
    /* pre-mRNA → mRNA → out to the cytoplasm */
    if(ex<1){const len=lerp(68,56,sp),amp=10*(1-sp),x0=44,y0=140;
      const xs=lerp(x0,200,ex),ys=lerp(y0,122,ex),L=lerp(len*tx,130,ex);
      let d=`M${f1(xs)} ${f1(ys)}`;const k=amp*(1-ex);
      d+=` l${f1(L*.3)} 0 q${f1(L*.06)} ${f1(-k*2)} ${f1(L*.12)} 0 l${f1(L*.2)} 0 q${f1(L*.06)} ${f1(-k*2)} ${f1(L*.12)} 0 l${f1(L*.26)} 0`;
      if(tx>0)s+=`<path d="${d}" style="fill:none;stroke:var(--tdp);stroke-width:3;stroke-linecap:round"/>`;
      if(tx>.3&&ex<.4)s+=`<text x="78" y="164" class="t-xs t-mid" style="opacity:${f1(1-ex*2.5)}">${sp<.5?TF_TXT.pre:TF_TXT.mrna}</text>`;
      }
    /* mRNA in the cytoplasm (whole, or cut in two) */
    if(ex>=1){
      const dx1=-14*cut,dx2=12*cut,dy=10*frag,of=1-.85*frag;
      if(cut<=0)s+=`<line x1="200" x2="330" y1="122" y2="122" style="stroke:var(--tdp);stroke-width:3;stroke-linecap:round"/>`;
      else{s+=`<g style="opacity:${f1(of)}"><line x1="${f1(200+dx1)}" x2="${f1(262+dx1)}" y1="${f1(122+dy)}" y2="${f1(122+dy)}" style="stroke:var(--tdp);stroke-width:3;stroke-linecap:round"/><line x1="${f1(268+dx2)}" x2="${f1(330+dx2)}" y1="${f1(122+dy)}" y2="${f1(122+dy)}" style="stroke:var(--tdp);stroke-width:3;stroke-linecap:round"/></g>`}
      for(let i=0;i<20;i++){const x=217+i*5;if(cut>0&&Math.abs(x-265)<3)continue;s+=`<line x1="${x}" x2="${x}" y1="${f1(117+(cut>0?dy:0))}" y2="${f1(121+(cut>0?dy:0))}" style="stroke:var(--tdp);stroke-width:1;opacity:${f1(.6*of)}"/>`}
      if(cut<.3)s+=`<text x="262" y="144" class="t-xs t-mid">${TF_TXT.mrnaC}</text>`;
      else s+=`<text x="250" y="144" class="t-xs t-mid" style="fill:var(--bad)">${TF_TXT.cut}</text>`;
      /* ribosome */
      const ro=1-cut;
      s+=`<g style="opacity:${f1(.35+.65*ro)}"><ellipse cx="320" cy="128" rx="11" ry="7" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.3"/><ellipse cx="320" cy="117" rx="7" ry="5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.3"/></g>`;
      s+=`<text x="320" y="156" class="t-xs t-mid">${TF_TXT.ribo}</text>`}
    /* proteins */
    const nf=t<.52?lerp(3,9,ramp(t,.1,.18)):lerp(9,5,ramp(t,.52,.66)),nP=Math.ceil(nf-1e-6);
    s+=`<text x="196" y="184" class="t-xs">${TF_TXT.prot}</text>`;
    for(let i=0;i<10;i++){const x=206+(i%5)*28,y=202+Math.floor(i/5)*26;
      const o=i<Math.floor(nf)?1:i<nP?nf-Math.floor(nf):0;
      if(o>0)s+=prot(x,y,o);else s+=`<circle cx="${x}" cy="${y}" r="4" style="fill:none;stroke:var(--line);stroke-dasharray:2 2"/>`}
    if(cut>.5)s+=`<text x="336" y="254" class="t-xs t-end" style="fill:var(--treat)">${TF_TXT.less}</text>`;
    /* CSF and the lumbar puncture */
    s+=`<rect x="0" y="304" width="350" height="52" rx="26" style="fill:var(--csf);stroke:var(--air);stroke-width:1.4"/>`;
    s+=`<text x="16" y="322" class="t-sm" style="fill:var(--air)">${TF_TXT.csf}</text>`;
    s+=`<path d="M265 302 V270" class="arrow" marker-end="url(#tfA)"/><text x="257" y="292" class="t-xs t-end">${TF_TXT.toMN}</text>`;
    const pl=lerp(0,14,inj);
    s+=`<line x1="80" y1="398" x2="96" y2="350" style="stroke:var(--ink);stroke-width:1.6"/>`;
    s+=`<line x1="${f1(66-pl*.3)}" y1="${f1(430-pl*.9)}" x2="80" y2="398" style="stroke:var(--muted);stroke-width:10;stroke-linecap:round;opacity:.8"/>`;
    s+=`<line x1="${f1(60-pl*.3)}" y1="${f1(434-pl*.9)}" x2="${f1(56-pl*.3)}" y2="${f1(436-pl*.9)}" style="stroke:var(--ink);stroke-width:3"/>`;
    s+=`<text x="112" y="384" class="t-sm" style="fill:var(--ink)">${TF_TXT.lp}</text><text x="112" y="400" class="t-xs">${TF_TXT.lp1}</text><text x="112" y="414" class="t-xs">${TF_TXT.lp2}</text>`;
    /* drug copies spreading in the CSF */
    if(inj>0)for(let i=0;i<4;i++){const u=(i*.25+t*1.4)%1,x=110+u*200,y=338+Math.sin(u*9+i)*5;s+=strand(x,y,inj*.55*bump(u,0,1)+.1*inj,.4)}
    /* the followed molecule */
    if(inj>0){let x,y;
      if(trav<=0){x=96;y=lerp(350,330,inj)}else{[x,y]=along([ [96,330],[265,330],[265,262],[265,112] ],trav)}
      s+=strand(x,y,clamp(inj*2),1);
      if(trav>0&&trav<.98)s+=`<text x="${f1(x)}" y="${f1(y-9)}" class="t-xs t-mid" style="fill:var(--treat)">${TF_TXT.tof}</text>`;
      if(trav>=.98){s+=`<text x="210" y="116" class="t-sm t-end" style="fill:var(--treat)">${TF_TXT.tof}</text>`;
        if(bind>0){for(let i=0;i<20;i++){const xx=217+i*5;s+=`<line x1="${xx}" x2="${xx}" y1="115.5" y2="119" style="stroke:var(--treat);stroke-width:1.2;opacity:${f1(bind*(1-.8*frag))}"/>`}
          const lo=bind*(1-rh);if(lo>0)s+=`<g style="opacity:${f1(lo)}"><text x="227" y="104" class="t-xs t-mid">${TF_TXT.moe}</text><text x="265" y="104" class="t-xs t-mid">${TF_TXT.gap}</text><text x="303" y="104" class="t-xs t-mid">${TF_TXT.moe}</text></g>`}}}
    /* RNase H */
    if(rh>0){const o=1-ramp(t,.6,.68)*.6,x=lerp(345,265,rh),y=lerp(44,94,rh);
      s+=`<g style="opacity:${f1(o)}"><path d="M${f1(x-16)} ${f1(y+8)} C${f1(x-18)} ${f1(y-14)} ${f1(x+18)} ${f1(y-14)} ${f1(x+16)} ${f1(y+8)} L${f1(x+8)} ${f1(y+8)} C${f1(x+8)} ${f1(y-2)} ${f1(x-8)} ${f1(y-2)} ${f1(x-8)} ${f1(y+8)}Z" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:1.6"/>`;
      s+=`<text x="${f1(x)}" y="${f1(y-16)}" class="t-sm t-mid" style="fill:var(--steel)">${TF_TXT.rnh}</text></g>`;
      if(cut>0&&cut<1)s+=`<path d="M259 112 l12 18 M271 112 l-12 18" style="stroke:var(--bad);stroke-width:2;opacity:${f1(bump(cut,0,1))}"/>`}
    return s}
  function panel2(t){
    const x0=40,x1=280,X=w=>x0+w/52*(x1-x0),W28=X(28);
    const p=ramp(t,.58,.74),wk=28*p,cl=ease(ramp(t,.74,.8)),q=ease(ramp(t,.88,.96)),ap=ramp(t,.9,.97);
    const D=TF_D[grp],fast=grp==='fast',on=t>=.58;
    const swT=start==='early'?3.2:1.6,swP=start==='early'?1.6:3.2;
    let s=`<text x="0" y="14" class="t-lbl">${TF_TXT.p2}</text>`;
    s+=`<text x="0" y="30" class="t-xs" style="fill:var(--ink)">${TF_TXT.grpLab[grp]}</text>`;
    s+=`<line x1="0" x2="18" y1="41" y2="41" style="stroke:var(--treat);stroke-width:${swT}"/><text x="22" y="44" class="t-xs">${TF_TXT.legT}</text>`;
    s+=`<line x1="170" x2="188" y1="41" y2="41" style="stroke:var(--muted);stroke-width:${swP};stroke-dasharray:5 3"/><text x="192" y="44" class="t-xs">${TF_TXT.legP}</text>`;
    s+=`<rect x="${x0}" y="52" width="${f1(W28-x0)}" height="292" style="fill:var(--panel-2);opacity:.5"/><rect x="${f1(W28)}" y="52" width="${f1(x1-W28)}" height="292" style="fill:var(--treat-soft);opacity:.32"/>`;
    s+=`<text x="${f1(X(14))}" y="64" class="t-xs t-mid">${TF_TXT.regA}</text><text x="${f1(X(40))}" y="64" class="t-xs t-mid">${TF_TXT.regB}</text>`;
    const g=on?1:.5;
    /* biomarker charts */
    const chart=(top,title,vals,fT)=>{const bot=top+60,Y=v=>bot-(v-.2)/1.2*60;let c=`<g style="opacity:${f1(g)}">`;
      c+=`<text x="${x0}" y="${top-6}" class="t-sm">${title}</text>`;
      c+=`<line x1="${x0}" x2="${x1}" y1="${bot}" y2="${bot}" class="axis"/><line x1="${x0}" x2="${x0}" y1="${top}" y2="${bot}" class="axis"/>`;
      [1,.5].forEach(v=>{c+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-4}" y="${f1(Y(v)+3)}" class="t-xs t-end">${f1(v)}</text>`});
      c+='</g>';
      if(wk>0){const fP=w=>fast?1+(vals[1]-1)*w/28:1;
        let dT='',dP='';for(let w=0;w<=wk+1e-6;w+=.5){dT+=(w?'L':'M')+f1(X(w))+' '+f1(Y(fT(w)));dP+=(w?'L':'M')+f1(X(w))+' '+f1(Y(fP(w)))}
        c+=`<path d="${dP}" style="fill:none;stroke:var(--muted);stroke-width:${swP};stroke-dasharray:5 3"/><path d="${dT}" style="fill:none;stroke:var(--treat);stroke-width:${swT}"/>`;
        if(p>.98){const yT=Y(vals[0]),yP=Y(vals[1]);
          c+=`<circle cx="${f1(W28)}" cy="${f1(yT)}" r="3.5" style="fill:var(--treat)"/><circle cx="${f1(W28)}" cy="${f1(yP)}" r="3.5" style="fill:var(--muted)"/>`;
          c+=`<text x="${f1(W28+5)}" y="${f1(yP-4)}" class="t-xs" style="fill:var(--ink)">${fast?TF_TXT.xb(vals[1].toFixed(2)):TF_TXT.pboRef}</text>`;
          c+=`<text x="${f1(W28+5)}" y="${f1(yT+11)}" class="t-xs" style="fill:var(--treat);font-weight:700">${fast?TF_TXT.xb(vals[0].toFixed(2)):TF_TXT.vsP(Math.round((1-vals[0])*100))}</text>`;
          if(q>0&&fast&&start==='delayed'){c+=`<path d="M${f1(W28+2)} ${f1(yP+2)} L${f1(X(34))} ${f1(yP+12)}" class="arrow" marker-end="url(#tfA)" style="stroke:var(--treat);stroke-dasharray:4 3;opacity:${f1(q)}"/><text x="${f1(X(35))}" y="${f1(yP+16)}" class="t-xs" style="fill:var(--treat);opacity:${f1(q)}">${TF_TXT.falls}</text>`}}}
      return c};
    s+=chart(84,TF_TXT.chartA[grp],D.s,w=>1-(1-D.s[0])*sh(w/28));
    s+=chart(172,TF_TXT.chartB[grp],D.n,w=>1-(1-D.n[0])*ease(Math.min(w/16,1)));
    if(!on)s+=`<text x="${f1(X(26))}" y="122" class="t-sm t-mid" style="fill:var(--ink)">${TF_TXT.wait}</text>`;
    /* ALSFRS-R chart */
    const top=260,bot=340,Yc=v=>top-v*8;
    s+=`<g style="opacity:${f1(g)}"><text x="${x0}" y="254" class="t-sm">${q>0?TF_TXT.chartC.ole:TF_TXT.chartC[grp]}</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${top}" y2="${top}" class="axis"/><line x1="${x0}" x2="${x0}" y1="${top}" y2="${bot}" class="axis"/>`;
    [-5,-10].forEach(v=>{s+=`<line x1="${x0}" x2="${x1}" y1="${Yc(v)}" y2="${Yc(v)}" class="grid"/><text x="${x0-4}" y="${Yc(v)+3}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${x0-4}" y="${top+3}" class="t-xs t-end">0</text></g>`;
    if(cl>0){const o=1-.75*q,yT=Yc(D.c[0]*cl),yP=Yc(D.c[1]*cl),xe=X(28*cl);
      s+=`<g style="opacity:${f1(o)}"><line x1="${x0}" y1="${top}" x2="${f1(xe)}" y2="${f1(yP)}" style="stroke:var(--muted);stroke-width:${swP};stroke-dasharray:5 3"/><line x1="${x0}" y1="${top}" x2="${f1(xe)}" y2="${f1(yT)}" style="stroke:var(--treat);stroke-width:${swT}"/></g>`;
      if(cl>.98&&q<=0){s+=`<text x="${f1(W28+5)}" y="${f1(yT-3)}" class="t-xs" style="fill:var(--treat);font-weight:700">${D.c[0].toFixed(2)}</text><text x="${f1(W28+5)}" y="${f1(yP+11)}" class="t-xs" style="fill:var(--ink)">${D.c[1].toFixed(2)}</text>`;
        const by=fast?[272,284]:[312,324];TF_TXT.brk[grp].forEach((l,i)=>{s+=`<text x="176" y="${by[i]}" class="t-xs" style="fill:var(--ink)">${l}</text>`})}}
    if(q>0){const xe=X(52*q),yE=Yc(TF_D.ole[0]*q),yD=Yc(TF_D.ole[1]*q);
      s+=`<line x1="${x0}" y1="${top}" x2="${f1(xe)}" y2="${f1(yD)}" style="stroke:var(--muted);stroke-width:${swP};stroke-dasharray:5 3"/><line x1="${x0}" y1="${top}" x2="${f1(xe)}" y2="${f1(yE)}" style="stroke:var(--treat);stroke-width:${swT}"/>`;
      if(q>.98){s+=`<text x="${f1(X(52)+4)}" y="${f1(yE-3)}" class="t-xs" style="fill:var(--treat);font-weight:700">${TF_D.ole[0].toFixed(1)}</text><text x="${f1(X(52)+4)}" y="${f1(yD+11)}" class="t-xs" style="fill:var(--ink)">${TF_D.ole[1].toFixed(1)}</text>`;
        TF_TXT.brk.ole.forEach((l,i)=>{s+=`<text x="176" y="${268+i*12}" class="t-xs" style="fill:var(--ink)">${l}</text>`})}}
    /* dose row and the week axis */
    s+=`<text x="${x0-10}" y="359" class="t-xs t-end">${TF_TXT.doses}</text>`;
    TF_D.doseW.forEach((w,i)=>{const lit=(i===0&&t>=.16)||(on&&wk>=w);const x=X(w);
      s+=`<path d="M${f1(x-4)} 350 H${f1(x+4)} L${f1(x)} 358Z" style="fill:${lit?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:1.2"/>`;
      if(i===0&&t>=.16&&t<.3)s+=`<circle cx="${f1(x)}" cy="354" r="${f1(9+3*Math.sin(t*120))}" style="fill:none;stroke:var(--treat);stroke-width:1.6"/>`});
    TF_D.xt.forEach(w=>{s+=`<text x="${f1(X(w))}" y="376" class="t-xs t-mid">${w}</text>`});
    s+=`<text x="${x1+8}" y="376" class="t-xs">${TF_TXT.weeks}</text>`;
    if(ap>0)TF_TXT.appr.forEach((l,i)=>{s+=`<text x="0" y="${396+i*14}" class="t-xs" style="fill:${i<2?'var(--treat)':'var(--ink)'};opacity:${f1(ap)}">${l}</text>`});
    return s}
  function draw(t){
    const N=vb(svg,'720 440','400 880');
    const L=N?{a:[25,5],b:[25,445],div:'M10 438 H390'}:{a:[5,5],b:[365,5],div:'M360 10 V430'};
    let s=`<defs>${marker('tfA','var(--muted)')}</defs>`;
    s+=`<path d="${L.div}" style="stroke:var(--line);stroke-width:1.4"/>`;
    s+=`<g transform="translate(${L.a[0]} ${L.a[1]})">${panel1(t)}</g>`;
    s+=`<g transform="translate(${L.b[0]} ${L.b[1]})">${panel2(t)}</g>`;
    svg.innerHTML=s;
    const p=phaseOf(TF_STEPS,t);setSt(p);const S=TF_STEPS[p];
    const P=Object.assign({},S,{txt:typeof S.txt==='function'?S.txt(grp):S.txt});
    $('#tfNote').innerHTML=noteHTML(P)+(p>=4?`<p class="callout">${TF_TXT.hl[start]}</p>`:'');
    $('#tfCap').textContent=TF_TXT.cap(TF_TXT.grpLab[grp],TF_TXT.armShort[start]);
  }
  const stop=playWire(rg,$('#tfPlay'),draw,18000,UI.replay,'tofersen');
  const setSt=stepWire($('#tfSteps'),TF_STEPS,rg,draw,stop);
  toggleRow($('#tfGrp'),TF_TXT.grp,'fast',v=>{grp=v;draw(+rg.value)});
  toggleRow($('#tfStart'),TF_TXT.start,'early',v=>{start=v;draw(+rg.value)});
  draw(+rg.value);
};
/* =============== 3.3 breathing and NIV =============== */
const BR_STEPS=[
 {from:0,at:.04,k:'Healthy',t:'The diaphragm does most of the work',
  txt:`The diaphragm, described as the major muscle of breathing, is supplied by the phrenic nerve, whose motor neurons sit in the spinal cord at C3 to C5. When it weakens, accessory muscles in the neck and chest are recruited. NICE NG42 sets baseline tests at or soon after diagnosis: a resting room-air oxygen saturation (SpO2) plus FVC or VC and/or SNIP and/or MIP. <sup class="c" data-ref="Fusco2019,NICE2016" title="Source 189,401">189,401</sup>`,
  pt:'Breathing depends mostly on one muscle under the lungs, the diaphragm. Its nerve comes from the neck part of the spinal cord.',
  hook:`Phrenic motor neurons (C3-C5) are lower motor neurons and are lost in ALS like the others. Respiratory failure is described as the leading cause of death in ALS. <sup class="c" data-ref="Fusco2019,Niedermeyer2019,Radunovic2017" title="Source 189,403,441">189,403,441</sup>`},
 {from:.1,at:.14,k:'Gradual decline',t:'Tests repeated every few months',
  txt:`NICE repeats the tests every 2-3 months, more or less often depending on symptoms, rate of progression and the person\'s preference; the Canadian recommendations say every 3 months. In 893 placebo-treated trial participants, slow vital capacity fell on average 2.7 percentage points a month, and 3.6 after age 65. In one clinic of 1034 people, median survival was 2.91 years with a baseline FVC below 75% and 4.08 years above it. <sup class="c" data-ref="NICE2016,Shoesmith2020,Andrews2018,Czaplinski2006" title="Source 21,131,401,471">21,131,401,471</sup>`,
  pt:'Breathing tests are repeated every few months to see how fast the muscles are changing.'},
 {from:.22,at:.26,k:'Diaphragm weakness',t:'Breathless lying flat',
  txt:`As the diaphragm weakens, lying flat becomes hard (orthopnoea), the belly can move the wrong way on breathing in (abdominal paradox) and neck muscles join in. In 25 people whose diaphragm pressure was measured, supine FVC matched it best, and a supine FVC below 75% predicted was 100% sensitive and specific for a low pressure. <sup class="c" data-ref="NICE2016,Lechtzin2002" title="Source 286,401">286,401</sup>`,
  pt:'Lying flat lets the belly push up on a weak diaphragm, so people feel short of breath in bed and prop themselves up on pillows.',
  hook:'Orthopnoea is a diaphragm sign. AAN 2009 lists it on its own as a reason to consider NIV. <sup class="c" data-ref="Miller2009AAN" title="Source 332">332</sup>'},
 {from:.36,at:.4,k:'At night',t:'Hypoventilation during sleep',
  txt:`Breathing is weakest in sleep: CO2 rises and oxygen dips. People notice disturbed or unrefreshing sleep, nightmares, morning headaches, daytime sleepiness and poor concentration. In a cohort of 98 people, SNIP below 40 cmH2O went with night-time low oxygen, a hazard ratio for death of 9.1 and a median survival of 6 months. <sup class="c" data-ref="NICE2016,Miller2009AAN,Morgan2005" title="Source 332,348,401">332,348,401</sup>`,
  pt:'At night, weak breathing lets carbon dioxide build up. People wake tired, with headaches, and feel sleepy in the day.',
  hook:'Morning headache plus daytime sleepiness in a person with ALS points to hypoventilation during sleep.'},
 {from:.5,at:.55,k:'Triggers',t:'Published NIV thresholds crossed',
  txt:`FVC below 50% and SNIP of about 40 cmH2O are thresholds the documents share. EFNS, NICE, Canada and the US panel also count FVC below 80% with symptoms; AAN 2009 does not. NICE asks for urgent referral, to be seen within 1 week, if PaCO2 is above 6 kPa. All frame these as triggers for discussion and referral, not automatic treatment: try the checker below. <sup class="c" data-ref="Miller2009AAN,Dorst2019,NICE2016,Shoesmith2020,Wolfe2021ONMAP" title="Source 145,332,401,471,544">145,332,401,471,544</sup>`,
  pt:'Each guideline lists test results that mean it is time to talk about a breathing machine. The lists overlap but are not the same.',
  hook:'Shared triggers: FVC below 50% and SNIP about 40 cmH2O. AAN 2009 also counts orthopnoea on its own.'},
 {from:.64,at:.68,k:'NIV',t:'Support at night, then more',
  txt:`NICE describes getting used to NIV in the daytime, then regular use at night before and during sleep, building up hours as needed, and notes that NIV can be stopped at any time. In the Bourke 2006 trial (41 people), NIV improved survival and quality of life. With normal to moderately impaired bulbar function, the median survival benefit was 205 days (Cochrane medians 216 against 11 days); with poor bulbar function it improved some sleep-related quality of life but not survival. In that cohort FVC fell about 2.2% a month before NIV and 1.1% after. <sup class="c" data-ref="NICE2016,Bourke2006,Radunovic2017,Miller2009AAN" title="Source 70,332,401,441">70,332,401,441</sup>`,
  pt:'A mask and a small machine push air in with each breath, first at night. It helps people sleep, and for many it adds months of life.',
  hook:'Bourke 2006: NIV added a median 205 days of survival, with quality of life maintained, in people with normal to moderately impaired bulbar function. <sup class="c" data-ref="Bourke2006" title="Source 70">70</sup>'},
 {from:.78,at:.82,k:'Cough',t:'Cough assistance and secretions',
  txt:`A cough needs a deep breath in, brief closure of the glottis and a strong push out. AAN 2009 states that peak cough flow above 160 L/min is needed to clear secretions and that clinicians recommend assistive devices below 270 L/min. NICE lists breath stacking and manually assisted cough first, then assisted breath stacking, then a mechanical cough assist device. Diaphragm pacing shortened survival in DiPALS (11.0 against 22.5 months), and EAN 2024 recommends against it. <sup class="c" data-ref="Berlowitz2023,Miller2009AAN,NICE2016,DiPALS2015,VanDamme2024EAN" title="Source 60,143,332,401,507">60,143,332,401,507</sup>`,
  pt:'When the cough gets weak, breathing techniques and a machine that blows air in and then pulls it out help clear phlegm.',
  hook:'Peak cough flow: assistance is recommended below 270 L/min; more than 160 L/min is needed to clear secretions (AAN 2009). <sup class="c" data-ref="Miller2009AAN" title="Source 332">332</sup>'},
 {from:.9,at:.94,k:'Choices',t:'Tracheostomy or a palliative route',
  txt:`As NIV use extends toward the whole day, people and families talk about tracheostomy ventilation or a palliative route. In a German register 9.5% had tracheostomy ventilation, and most US neurologists reported it in fewer than 10% of their patients. In UK law a person with capacity can refuse or ask to withdraw ventilation, and the APM 2015 guidance states that this is not assisted suicide; in 95 UK accounts the median time from removal to death was 30 minutes, with titrated medication beforehand in 94%. <sup class="c" data-ref="Spittel2021,Rabkin2013,APM2015,Bleazard2025" title="Source 25,64,439,482">25,64,439,482</sup>`,
  pt:'Later, some people choose a breathing tube in the neck and others choose comfort care. A person can ask to stop a breathing machine, with medicines to keep them comfortable.',
  hook:'Withdrawing ventilation at the request of a person with capacity is lawful in the UK; the cause of death remains the motor neurone disease (APM 2015). <sup class="c" data-ref="APM2015" title="Source 25">25</sup>'}
];
const BR_TXT={
 niv:[ ['on','NIV on'],['off','NIV off'] ],
 bulb:[ ['mod','Bulbar function: normal to moderate'],['sev','Bulbar function: severe'] ],
 cord:'spinal cord',phrenic:['phrenic','nerve'],diaphragm:'diaphragm',acc:'neck muscles help',orth:'breathless lying flat',
 nivBox:'NIV',snip:'SNIP',pcf:'Peak cough flow',
 snipV:v=>`${Math.round(v)} cmH2O`,pcfV:v=>`${Math.round(v)} L/min`,below:n=>`below ${n}`,
 fvcTitle:'FVC, % predicted',months:'months',nivStart:'NIV starts',without:'without NIV',
 th:[ {v:80,l1:'80% · EFNS',l2:'others if symptoms'},{v:65,l1:'65% · Canada',l2:'upright FVC'},{v:50,l1:'50% · AAN, NICE',l2:'US panel'} ],
 night:m=>`One night asleep at month ${m}`,onNiv:'on NIV',spo2:'SpO2 %',co2:'CO2 mmHg',hours:'hours asleep',
 spoTh:['90%','US panel'],co2Th:['45 mmHg','EFNS, Canada'],hr:h=>`${h} h`,
 sv:{title:'Bourke 2006 RCT: median survival',mod:['normal to moderate','bulbar function (n=20)'],sev:['poor bulbar function','(n=21)'],
   niv:'with NIV',std:'standard care',days:d=>`${d} days`,diff:'difference 205 days, p=0.006',
   none:'No survival benefit',qol:['sleep-related quality of life','improved (p=0.018)'],all:'whole trial: 219 against 171 days'},
 read:(m,f,s,p,h)=>`<span>month <b>${m}</b></span><span>FVC <b>${f}%</b></span><span>SNIP <b>${s} cmH2O</b></span><span>peak cough flow <b>${p} L/min</b></span><span>NIV <b>${h}</b></span>`,
 hrs:{none:'not started',off:'switched off',night:'at night',more:'night and part of the day',most:'most of the day'},
 crossed:l=>`<b>Lines crossed so far:</b> ${l}.`,noneCrossed:'<b>No threshold line crossed yet.</b>',
 lines:{f80:'FVC 80%',f65:'FVC 65%',f50:'FVC 50%',s40:'SNIP 40 cmH2O',spo:'night SpO2 90%',p270:'peak cough flow 270 L/min',p160:'peak cough flow 160 L/min'},
 stateOn:'<b>NIV on:</b> the night traces settle and the FVC slope halves, as in the Bourke cohort. <sup class="c" data-ref="Miller2009AAN,Bourke2006" title="Source 70,332">70,332</sup>',
 stateOff:'<b>NIV off:</b> the night traces keep worsening and the FVC slope stays the same.',
 bulbNote:{mod:'<b>Normal to moderate bulbar function:</b> in Bourke 2006 the survival gain with NIV was 205 days. <sup class="c" data-ref="Bourke2006,Radunovic2017" title="Source 70,441">70,441</sup>',
   sev:'<b>Severe bulbar function:</b> in Bourke 2006 NIV improved some sleep-related quality of life but not survival; a full-face mask is drawn because nasal masks can leak through the mouth. EAN 2024 asks that every effort be made to allow NIV regardless of bulbar function. <sup class="c" data-ref="Bourke2006,Dorst2019,VanDamme2024EAN" title="Source 70,145,507">70,145,507</sup>'}
};
/* calculator: each guideline's published triggers, with a test that returns true, false, null (not entered) or 'dep' */
const BR_ST={met:'met',no:'not met',na:'not entered',dep:'depends on sex',pres:'entered',abs:'none entered'};
const BR_GL=[
 {id:'aan',n:'AAN 2009',d:'United States practice parameter. NIV is considered if any one is present.',
  r:[ {l:'Orthopnoea',f:S=>S.orth},
      {x:1,l:'SNP (sniff) below 40 cmH2O',f:S=>S.snip==null?null:S.snip<40},
      {x:1,l:'MIP weaker than −60 cmH2O',f:S=>S.mip==null?null:S.mip<60},
      {x:1,l:'Abnormal nocturnal oximetry (legend: "pO2 <4% from baseline")',f:S=>S.ox==='nd'?null:S.ox==='abn'||S.ox==='us'},
      {x:1,l:'FVC below 50% (supine or erect)',f:S=>S.fvc==null?null:S.fvc<50} ],
  flag:'CO2 is not a trigger here; on NIV the stated target is pCO2 below 50 mmHg. <sup class="c" data-ref="Miller2009AAN" title="Source 332">332</sup>'},
 {id:'efns',n:'EFNS 2012',d:'European guideline. NIV with at least one of these.',
  r:[ {l:'At least one respiratory symptom',f:S=>S.orth||S.noct},
      {x:1,l:'FVC below 80%',f:S=>S.fvc==null?null:S.fvc<80},
      {x:1,l:'SNIP below 40 cmH2O',f:S=>S.snip==null?null:S.snip<40},
      {x:1,l:'MIP below 60 cmH2O',f:S=>S.mip==null?null:S.mip<60},
      {x:1,l:'Significant nocturnal desaturation',f:S=>S.ox==='nd'?null:S.ox==='abn'||S.ox==='us'},
      {x:1,l:'Morning pCO2 above 45 mmHg (blood gas)',f:S=>S.co2==null||S.ct!=='bg'?null:S.co2>45} ],
  flag:'Second-hand: the EFNS full text could not be read, so these thresholds are as tabulated by Dorst and Ludolph 2019, who note they rest on expert opinion. <sup class="c" data-ref="Andersen2012EFNS,Dorst2019" title="Source 20,145">20,145</sup>'},
 {id:'nice',n:'NICE NG42 (2016)',d:'England and Wales. Results that should prompt a discussion and possible referral to a respiratory ventilation service.',
  r:[ {x:1,l:'FVC or VC below 50% predicted',f:S=>S.fvc==null?null:S.fvc<50},
      {l:'FVC or VC below 80% with symptoms or signs, particularly orthopnoea',f:S=>S.fvc==null?null:S.fvc<80&&S.any},
      {x:1,l:'SNIP or MIP below 40 cmH2O',f:S=>S.pmin==null?null:S.pmin<40},
      {l:'SNIP or MIP below 65 cmH2O (men) or 55 cmH2O (women) with symptoms or signs',f:S=>{if(S.pmin==null)return null;if(!S.any)return false;if(S.sex==='m')return S.pmin<65;if(S.sex==='f')return S.pmin<55;return S.pmin<55?true:S.pmin<65?'dep':false}},
      {x:1,l:'A fall in SNIP or MIP of more than 10 cmH2O per 3 months',f:S=>S.fall},
      {x:1,l:'PaCO2 above 6 kPa: urgent referral, to be seen within 1 week',f:S=>S.co2==null||S.ct!=='bg'?null:S.co2/7.50062>6} ],
  flag:'NICE also measures blood gases if resting SpO2 is 94% or lower, and uses overnight oximetry as a further test rather than a listed threshold. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>'},
 {id:'can',n:'Canada 2020',d:'Canadian best practice recommendations. Any one of these.',
  r:[ {l:'Symptoms of respiratory insufficiency, including orthopnoea',f:S=>S.orth||S.noct},
      {x:1,l:'SNIP or MIP 40 cmH2O or less',f:S=>S.pmin==null?null:S.pmin<=40},
      {x:1,l:'Reliable upright FVC below 65%',f:S=>S.fvc==null||S.pos!=='up'?null:S.fvc<65},
      {l:'Sitting or supine FVC below 80% with symptoms or signs',f:S=>S.fvc==null?null:S.fvc<80&&S.any},
      {x:1,l:'Daytime pCO2 above 45 mmHg (blood gas)',f:S=>S.co2==null||S.ct!=='bg'?null:S.co2>45},
      {x:1,l:'Abnormal nocturnal oximetry or symptomatic sleep-disordered breathing',f:S=>S.ox==='nd'?null:S.ox==='abn'||S.ox==='us'} ],
  flag:'<sup class="c" data-ref="Shoesmith2020" title="Source 471">471</sup>'},
 {id:'us',n:'US panel 2021 (ONMAP)',d:'Proposed bilevel NIV criteria for neuromuscular and other thoracic restrictive disorders. Any one of these.',
  r:[ {l:'Symptoms with VC below 80%',f:S=>S.fvc==null?null:S.fvc<80&&(S.orth||S.noct)},
      {x:1,l:'Awake PaCO2 45 mmHg or more, or end-tidal, transcutaneous or venous CO2 50 mmHg or more',f:S=>S.co2==null?null:S.ct==='bg'?S.co2>=45:S.co2>=50},
      {x:1,l:'Sleep SpO2 90% or less for 5% of the night, or 88% or less for 5 minutes',f:S=>S.ox==='nd'?null:S.ox==='us'},
      {x:1,l:'VC 50% predicted or less',f:S=>S.fvc==null?null:S.fvc<=50},
      {x:1,l:'MIP 60 or SNIP 40 cmH2O or less (size)',f:S=>S.mip==null&&S.snip==null?null:(S.mip!=null&&S.mip<=60)||(S.snip!=null&&S.snip<=40)} ],
  flag:'Proposals for US reimbursement criteria, with no ALS-specific cut-offs. <sup class="c" data-ref="Wolfe2021ONMAP" title="Source 544">544</sup>'},
 {id:'ean',n:'EAN 2024',d:'European Academy of Neurology (GRADE). Offers NIV to all people with ALS with symptoms, signs or investigations supportive of respiratory insufficiency, and asks that every effort be made to allow NIV regardless of bulbar function. It gives no numeric thresholds, so the checker only lists what was entered.',
  ean:true,
  r:[ {l:'Symptoms',f:S=>S.orth||S.noct},{l:'Signs',f:S=>S.signs},{l:'A test result that another guideline here lists',f:S=>S.otherTest} ],
  flag:'<sup class="c" data-ref="VanDamme2024EAN" title="Source 507">507</sup>'}
];
const BR_CALC={
 pos:[ ['up','Upright or sitting'],['sup','Supine'] ],
 sex:[ ['','Sex not given'],['m','Man'],['f','Woman'] ],
 unit:[ ['mmHg','mmHg'],['kPa','kPa'] ],
 ct:[ ['bg','Blood gas (arterial or capillary)'],['tc','Transcutaneous, end-tidal or venous'] ],
 sum:(n,m)=>`${n} of ${m} listed triggers met`,eanSum:n=>n?'Findings of the kind EAN describes were entered':'No supportive finding entered',
 empty:'Enter values on the left, or load an example.',
 ex:{a:{fvc:72,pos:'up',orth:1},b:{fvc:58,pos:'up',snip:60,sex:'f'},c:{fvc:85,pos:'up',snip:50,sex:'f',noct:1,co2:46,unit:'mmHg',ct:'bg'},clr:{}}
};
inits.breathing=()=>{
  const svg=$('#brSvg'),rg=$('#brT'),T=BR_TXT;let niv='on',bulb='mod';
  const NIV0=.64,MON=t=>t*30;
  const fvcOff=t=>97-2.2*Math.max(0,MON(t)-3);
  const fvc=t=>niv!=='on'||t<=NIV0?fvcOff(t):fvcOff(NIV0)-1.1*(MON(t)-MON(NIV0));
  const snip=t=>interp([ [0,96],[.12,90],[.55,40],[1,18] ],t);
  const pcf=t=>interp([ [0,430],[.3,390],[.78,266],[1,172] ],t);
  const hyp=t=>{let h=.75*ramp(t,.3,.62)+.25*ramp(t,.62,1);if(niv==='on')h*=1-.85*ramp(t,NIV0,NIV0+.06);return h};
  const tl=(x,y,arr,cls,dy,st)=>arr.map((s,i)=>`<text x="${f1(x)}" y="${f1(y+i*dy)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`).join('');
  const REM=[1.5,3.1,4.7,6.2,7.4];
  const g=(hh,h)=>REM.reduce((a,c)=>a+Math.exp(-Math.pow((hh-c)/(.16+.14*h),2)),0);
  const spo=(hh,h)=>96.5-1.5*h-h*(3+8*h)*g(hh,h)+.35*Math.sin(hh*9.1)+.25*Math.sin(hh*23.7);
  const co2=(hh,h)=>39+h*(3+hh)+h*4*g(hh,h)+.3*Math.sin(hh*7.3);
  function chest(t){
    const ph=(t*24)%1,b=(1-Math.cos(2*Math.PI*ph))/2,dead=ramp(t,.12,1)*.8;
    const on=niv==='on'&&t>=NIV0;let amp=clamp((fvc(t)-15)/82,.15,1);if(on)amp=lerp(amp,.85,ramp(t,NIV0,NIV0+.04));
    const dd=13*b*amp,acc=ramp(t,.22,.4)*(on?.5:1);
    let s='';
    // head, neck, accessory muscles
    s+=`<rect x="120" y="46" width="20" height="30" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.2"/>`;
    s+=`<circle cx="130" cy="28" r="20" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<path d="M122 42 L127 76 M138 42 L133 76" style="stroke:var(--warn);stroke-width:${f1(1.5+3*acc)};opacity:${f1(.25+.75*acc)};stroke-linecap:round"/>`;
    if(acc>.1)s+=`<text x="146" y="62" class="t-xs" style="fill:var(--warn);opacity:${f1(acc)}">${T.acc}</text>`;
    // torso, ribs, lungs, diaphragm
    s+=`<path d="M84 72 Q130 64 176 72 L190 232 Q130 248 70 232 Z" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1.4"/>`;
    [0,1,2,3].forEach(i=>{s+=`<path d="M${80+i*2} ${94+i*24} Q130 ${82+i*24} ${180-i*2} ${94+i*24}" style="fill:none;stroke:var(--cell-line);stroke-width:1.4;opacity:.45"/>`});
    [106,154].forEach(cx=>{s+=`<ellipse cx="${cx}" cy="${f1(134+dd*.5)}" rx="${f1(20+3*b*amp)}" ry="${f1(46+5*b*amp)}" style="fill:var(--air-soft);stroke:var(--air);stroke-width:1.5"/>`});
    s+=`<path d="M74 ${f1(206+dd*.3)} Q130 ${f1(160+2*dd)} 186 ${f1(206+dd*.3)}" style="fill:none;stroke:var(--muscle-line);stroke-width:${f1(5-3*dead)};stroke-linecap:round"/>`;
    s+=`<text x="130" y="226" class="t-xs t-mid">${T.diaphragm}</text>`;
    // spinal cord C3-C5 and phrenic nerve
    s+=`<rect x="8" y="76" width="44" height="90" rx="12" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.2"/><text x="30" y="70" class="t-xs t-mid">${T.cord}</text>`;
    ['C3','C4','C5'].forEach((c,i)=>{const y=98+i*20;s+=`<text x="12" y="${y+3}" class="t-xs">${c}</text>`+lmn(38,y,5.5,1,{dead:dead*(.7+.15*i),axonLen:16})});
    s+=`<path d="M54 98 Q60 104 62 118 M54 118 L62 118 M54 138 Q60 132 62 118 M62 118 Q66 178 96 ${f1(193+dd*.6)}" style="fill:none;stroke:var(--lmn);stroke-width:2;opacity:${f1(1-.6*dead)}"/>`;
    s+=tl(56,184,T.phrenic,'t-xs t-end',11);
    if(ph<.5){const u=ph*2,x=(1-u)*(1-u)*62+2*u*(1-u)*66+u*u*96,y=(1-u)*(1-u)*118+2*u*(1-u)*178+u*u*(193+dd*.6);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.5" style="fill:var(--lmn);opacity:${f1(1-.75*dead)}"/>`}
    // NIV mask and machine
    if(on){const full=bulb==='sev';
      s+=full?`<ellipse cx="130" cy="34" rx="13" ry="12" style="fill:var(--air);fill-opacity:.3;stroke:var(--air);stroke-width:1.6"/>`:`<ellipse cx="130" cy="31" rx="7" ry="7" style="fill:var(--air);fill-opacity:.3;stroke:var(--air);stroke-width:1.6"/>`;
      s+=`<path d="M${full?143:137} 36 Q170 50 202 24" style="fill:none;stroke:var(--air);stroke-width:3;stroke-linecap:round"/><rect x="200" y="6" width="40" height="22" rx="5" style="fill:var(--air-soft);stroke:var(--air);stroke-width:1.4"/><text x="220" y="21" class="t-sm t-mid" style="fill:var(--air)">${T.nivBox}</text>`;
      if(ph<.5)for(let k=0;k<3;k++){const u=clamp(1-((ph*2+k/3)%1)),x=(1-u)*(1-u)*(full?143:137)+2*u*(1-u)*170+u*u*202,y=(1-u)*(1-u)*36+2*u*(1-u)*50+u*u*24;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.2" style="fill:var(--air)"/>`}}
    if(t>=.22)s+=`<text x="130" y="254" class="t-sm t-mid" style="fill:var(--warn)">${T.orth}</text>`;
    // SNIP and peak cough flow bars
    const bar=(y,lbl,v,max,ticks,val,thr)=>{const w=230*clamp(v/max),low=v<thr;let r=`<text x="10" y="${y}" class="t-sm">${lbl}</text><text x="240" y="${y}" class="t-sm t-end"${low?' style="fill:var(--warn)"':''}>${val}</text>`+(low?`<text x="240" y="${y+30}" class="t-xs t-end" style="fill:var(--warn)">${T.below(thr)}</text>`:'');
      r+=`<rect x="10" y="${y+6}" width="230" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="10" y="${y+6}" width="${f1(w)}" height="10" rx="5" style="fill:${low?'var(--warn)':'var(--air)'}"/>`;
      ticks.forEach(k=>{const x=10+230*k/max;r+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y+2}" y2="${y+20}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(x)}" y="${y+30}" class="t-xs t-mid">${k}</text>`});return r};
    s+=bar(274,T.snip,snip(t),120,[40],T.snipV(snip(t)),40);
    s+=bar(320,T.pcf,pcf(t),500,[160,270],T.pcfV(pcf(t)),270);
    return s;
  }
  function survival(x,y,w){const S=T.sv,on=niv==='on';let s=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${S.title}</text>`;
    s+=tl(x,y+14,S[bulb],'t-xs',11);
    if(bulb==='mod'){const W=w-70,r=(yy,l,d,a,c)=>`<text x="${x}" y="${yy}" class="t-xs">${l}</text><rect x="${x}" y="${yy+4}" width="${f1(Math.max(3,W*d/216))}" height="12" rx="3" style="fill:${c};opacity:${a?1:.45}"/><text x="${f1(x+Math.max(3,W*d/216)+6)}" y="${yy+14}" class="t-sm"${a?' style="fill:var(--ink)"':''}>${S.days(d)}</text>`;
      s+=r(y+42,S.niv,216,on,'var(--air)')+r(y+72,S.std,11,!on,'var(--muted)');
      s+=`<text x="${x}" y="${y+104}" class="t-xs">${S.diff}</text>`;
    }else{s+=`<text x="${x}" y="${y+50}" class="t-lbl">${S.none}</text>`+tl(x,y+68,S.qol,'t-xs',11)+`<text x="${x}" y="${y+104}" class="t-xs">${S.all}</text>`}
    return s}
  function fvcChart(t,X0,X1,Y0,Y1,LX){const on=niv==='on',yv=v=>lerp(Y1,Y0,(v-20)/80),xt=u=>lerp(X0,X1,u);
    let s=`<text x="${X0}" y="${Y0-12}" class="t-sm" style="fill:var(--ink)">${T.fvcTitle}</text>`;
    [20,40,60,80,100].forEach(v=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${X0-5}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${X0}" x2="${X1}" y1="${Y1}" y2="${Y1}" class="axis"/>`;
    [0,6,12,18,24,30].forEach(m=>{s+=`<text x="${f1(xt(m/30))}" y="${Y1+14}" class="t-xs ${m===30?'t-end':m?'t-mid':''}">${m}</text>`});
    s+=`<text x="${LX}" y="${Y1+14}" class="t-xs">${T.months}</text>`;
    const cur=fvc(t);
    T.th.forEach(h=>{const c=cur<h.v,y=yv(h.v);s+=`<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c?'var(--warn)':'var(--muted)'};stroke-width:${c?1.8:1};${c?'':'stroke-dasharray:4 4'}"/>`;
      s+=`<text x="${LX}" y="${f1(y-1)}" class="t-sm"${c?' style="fill:var(--warn);font-weight:700"':''}>${h.l1}</text><text x="${LX}" y="${f1(y+10)}" class="t-xs">${h.l2}</text>`});
    if(on){const x=xt(NIV0);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${Y0}" y2="${Y1}" style="stroke:var(--air);stroke-width:1.4;stroke-dasharray:3 3"/><text x="${f1(x+4)}" y="${Y0+10}" class="t-xs" style="fill:var(--air)">${T.nivStart}</text>`;
      if(t>NIV0)s+=`<path d="${pathFn(u=>u<NIV0||u>t?NaN:(fvcOff(u)-20)/80,X0,X1,Y1,Y0).replace(/[ML][^ML]*NaN[^ML]*/g,'').replace(/^L/,'M')}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:5 4"/>`;
      if(t>.9)s+=`<text x="${f1(xt(t)-4)}" y="${f1(yv(fvcOff(t))+13)}" class="t-xs t-end">${T.without}</text>`}
    s+=`<path d="${pathFn(u=>(fvc(u)-20)/80,X0,X1,Y1,Y0)}" style="fill:none;stroke:var(--air);stroke-width:1.4;opacity:.28"/>`;
    s+=`<path d="${pathFn(u=>u<=t?(fvc(u)-20)/80:NaN,X0,X1,Y1,Y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--air);stroke-width:3"/>`;
    s+=`<circle cx="${f1(xt(t))}" cy="${f1(yv(cur))}" r="5" style="fill:var(--air);stroke:var(--panel);stroke-width:1.5"/>`;
    return s}
  function nightChart(t,X0,X1,Y0,LX){const h=hyp(t),on=niv==='on'&&t>=NIV0,S0=Y0+14,S1=S0+80,C0=S1+24,C1=C0+80,xh=hh=>lerp(X0,X1,hh/8);
    let s=`<text x="${X0}" y="${Y0}" class="t-sm" style="fill:var(--ink)">${T.night(Math.round(MON(t)))}</text>`;
    if(on)s+=`<text x="${LX}" y="${Y0}" class="t-lbl" style="fill:var(--air)">${T.onNiv}</text>`;
    const ys=v=>lerp(S1,S0,(v-80)/20),yc=v=>lerp(C1,C0,(v-35)/25);
    [100,90,80].forEach(v=>{s+=`<text x="${X0-5}" y="${f1(ys(v)+3)}" class="t-xs t-end">${v}</text>`});
    [60,45,35].forEach(v=>{s+=`<text x="${X0-5}" y="${f1(yc(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<rect x="${X0}" y="${S0}" width="${X1-X0}" height="80" style="fill:var(--field);stroke:var(--line)"/><rect x="${X0}" y="${C0}" width="${X1-X0}" height="80" style="fill:var(--field);stroke:var(--line)"/>`;
    const below=REM.some(c=>spo(c,h)<90),high=co2(8,h)>45;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ys(90))}" y2="${f1(ys(90))}" style="stroke:${below?'var(--warn)':'var(--muted)'};stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yc(45))}" y2="${f1(yc(45))}" style="stroke:${high?'var(--warn)':'var(--muted)'};stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=`<text x="${LX}" y="${S0+11}" class="t-lbl">${T.spo2}</text>`+tl(LX,ys(90)-1,T.spoTh,'t-xs',10,below?'fill:var(--warn)':'');
    s+=`<text x="${LX}" y="${C0+11}" class="t-lbl">${T.co2}</text>`+tl(LX,yc(45)-1,T.co2Th,'t-xs',10,high?'fill:var(--warn)':'');
    let ps='',pc='';for(let i=0;i<=160;i++){const hh=i/20;ps+=(i?'L':'M')+f1(xh(hh))+' '+f1(ys(clamp(spo(hh,h),80,100)));pc+=(i?'L':'M')+f1(xh(hh))+' '+f1(yc(clamp(co2(hh,h),35,60)))}
    s+=`<path d="${ps}" style="fill:none;stroke:var(--air);stroke-width:2"/><path d="${pc}" style="fill:none;stroke:var(--tdp);stroke-width:2"/>`;
    const cx=xh(((t*12)%1)*8);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${S0}" y2="${C1}" style="stroke:var(--ink);stroke-width:1;opacity:.18"/>`;
    [0,2,4,6,8].forEach(hh=>{s+=`<text x="${f1(xh(hh))}" y="${C1+14}" class="t-xs ${hh===8?'t-end':hh?'t-mid':''}">${T.hr(hh)}</text>`});
    s+=`<text x="${LX}" y="${C1+14}" class="t-xs">${T.hours}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 510','400 1090');
    let s='';
    if(N){s+=`<g transform="translate(48 6) scale(1.2)">${chest(t)}</g>`+survival(14,472,372)+fvcChart(t,40,262,612,790,270)+nightChart(t,40,262,846,270)}
    else{s+=`<g transform="translate(8 6)">${chest(t)}</g>`+survival(14,396,236)+fvcChart(t,300,580,30,212,590)+nightChart(t,300,580,256,590)}
    svg.innerHTML=s;
    const p=phaseOf(BR_STEPS,t);setSt(p);
    const on=niv==='on',f=fvc(t),sn=snip(t),pc=pcf(t),h=hyp(t);
    const hrs=t<NIV0?T.hrs.none:!on?T.hrs.off:t<.78?T.hrs.night:t<.9?T.hrs.more:T.hrs.most;
    $('#brRead').innerHTML=T.read(Math.round(MON(t)),Math.round(f),Math.round(sn),Math.round(pc),hrs);
    const L=T.lines,cr=[];if(f<80)cr.push(L.f80);if(f<65)cr.push(L.f65);if(f<50)cr.push(L.f50);if(sn<40)cr.push(L.s40);if(REM.some(c=>spo(c,h)<90))cr.push(L.spo);if(pc<270)cr.push(L.p270);if(pc<160)cr.push(L.p160);
    let ex=`<p>${cr.length?T.crossed(cr.join(', ')):T.noneCrossed}</p>`;
    if(t>=NIV0)ex+=`<p>${on?T.stateOn:T.stateOff}</p><p>${T.bulbNote[bulb]}</p>`;
    $('#brNote').innerHTML=noteHTML(BR_STEPS[p])+ex;
  }
  const stop=playWire(rg,$('#brPlay'),draw,24000,UI.replay,'breathing');
  const setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  toggleRow($('#brNiv'),T.niv,niv,v=>{niv=v;draw(+rg.value)});
  toggleRow($('#brBulb'),T.bulb,bulb,v=>{bulb=v;draw(+rg.value)});
  draw(+rg.value);

  /* ---- NIV trigger checker ---- */
  const C=BR_CALC;let pos='up',sex='',unit='mmHg',ct='bg';
  const num=id=>{const v=$(id).value.trim();if(v==='')return null;const n=+v;return isFinite(n)?n:null};
  const rows={};
  function calc(){
    const co=num('#brCo2');
    const S={fvc:num('#brFvc'),pos,snip:num('#brSnip'),mip:num('#brMip'),fall:$('#brFall').checked,sex,
      orth:$('#brOrth').checked,noct:$('#brNoct').checked,signs:$('#brSigns').checked,ox:$('#brOx').value,
      co2:co==null?null:unit==='kPa'?co*7.50062:co,ct};
    S.any=S.orth||S.noct||S.signs;
    const ps=[S.snip,S.mip].filter(v=>v!=null);S.pmin=ps.length?Math.min(...ps):null;
    S.otherTest=BR_GL.some(G=>!G.ean&&G.r.some(R=>R.x&&R.f(S)===true));
    const entered=S.fvc!=null||S.snip!=null||S.mip!=null||S.co2!=null||S.fall||S.any||S.ox!=='nd';
    let h='';
    BR_GL.forEach(G=>{const res=G.r.map(R=>R.f(S));const n=res.filter(v=>v===true).length;
      const lab=v=>G.ean?(v?`<span class="st met">${BR_ST.pres}</span>`:`<span class="st na">${BR_ST.abs}</span>`):v===true?`<span class="st met">${BR_ST.met}</span>`:v==='dep'?`<span class="st dep">${BR_ST.dep}</span>`:v===false?`<span class="st no">${BR_ST.no}</span>`:`<span class="st na">${BR_ST.na}</span>`;
      h+=`<div class="br-g${n?' hit':''}"><h4>${G.n}</h4><p style="font-size:13px;color:var(--muted)">${G.d}</p><p class="sum">${G.ean?C.eanSum(n):C.sum(n,G.r.length)}</p><ul>${G.r.map((R,i)=>`<li><span>${R.l}</span>${lab(res[i])}</li>`).join('')}</ul><p class="flag">${G.flag}</p></div>`});
    $('#brRes').innerHTML=(entered?'':`<p class="stage-cap" style="grid-column:1/-1">${C.empty}</p>`)+h;
  }
  const prs=(el,opts,val,set)=>toggleRow($(el),opts,val,v=>{set(v);calc()});
  prs('#brPos',C.pos,pos,v=>pos=v);prs('#brSex',C.sex,sex,v=>sex=v);prs('#brUnit',C.unit,unit,v=>unit=v);prs('#brCt',C.ct,ct,v=>ct=v);
  $$('#m-breathing .br-form input,#m-breathing .br-form select').forEach(el=>el.addEventListener(el.tagName==='SELECT'||el.type==='checkbox'?'change':'input',calc));
  const press=(el,v)=>$$('[data-v]',$(el)).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));
  $$('[data-brex]').forEach(b=>b.addEventListener('click',()=>{const E=C.ex[b.dataset.brex];
    $('#brFvc').value=E.fvc??'';$('#brSnip').value=E.snip??'';$('#brMip').value=E.mip??'';$('#brCo2').value=E.co2??'';
    $('#brOrth').checked=!!E.orth;$('#brNoct').checked=!!E.noct;$('#brSigns').checked=!!E.signs;$('#brFall').checked=!!E.fall;$('#brOx').value=E.ox||'nd';
    pos=E.pos||'up';sex=E.sex||'';unit=E.unit||'mmHg';ct=E.ct||'bg';press('#brPos',pos);press('#brSex',sex);press('#brUnit',unit);press('#brCt',ct);calc()}));
  calc();
};
/* =============== 3.4 swallowing and feeding tubes =============== */
const NU_STEPS=[
 {from:0,at:.04,k:'Swallow',t:'A safe swallow',
  txt:`In a swallow the tongue pushes the food back, the larynx lifts and the epiglottis tips over the airway, and the food passes behind it into the oesophagus. Throat, larynx and breathing muscles work together, so bulbar weakness affects swallowing, cough and the airway as well as speech. ESPEN 2018 recommends screening for malnutrition and dysphagia at diagnosis and about every 3 months. <sup class="c" data-ref="Berlowitz2023,Burgos2018ESPEN,NICE2016" title="Source 60,84,401">60,84,401</sup>`,
  pt:'Swallowing uses many small muscles in the mouth and throat. They also close the airway so food does not go the wrong way.'},
 {from:.12,at:.16,k:'Dysphagia',t:'Slow meals, coughing at meals',
  txt:`Dysphagia shows as slow, tiring meals and coughing or choking. In 145 people followed with endoscopic swallow studies (FEES) for about 2 years, dysphagia rose from 35% to 73% in spinal onset and from 95% to 98% in bulbar onset, and 8% of those with dysphagia on FEES did not notice it. It brings choking, aspiration, weight loss and dehydration, and aspiration pneumonia is a stated risk. <sup class="c" data-ref="Onesti2017,Miller2009AAN,Burgos2018ESPEN" title="Source 84,332,408">84,332,408</sup>`,
  pt:'When the throat muscles weaken, food and drink can slip toward the airway. Meals get slower and people may cough while eating.',
  hook:'Food entering the larynx above the vocal folds is penetration; below them it is aspiration. Some people with dysphagia do not notice it (8% on FEES). <sup class="c" data-ref="Onesti2017" title="Source 408">408</sup>'},
 {from:.26,at:.3,k:'Texture',t:'Adapting food and drink',
  txt:`Texture-modified food and thickened drinks are graded on the IDDSI framework, an 8-level scale from 0 to 7 with a number, label and colour for each level. ESPEN 2018 recommends texture adaptation and postures such as chin tuck in moderate dysphagia, and videofluoroscopy or FEES can show which textures are handled safely. <sup class="c" data-ref="Cichero2017,Burgos2018ESPEN,Miller2009AAN" title="Source 84,113,332">84,113,332</sup>`,
  pt:'Food can be made softer and drinks thicker, and a swallowing test can show which textures go down safely.'},
 {from:.36,at:.4,k:'Energy',t:'Weight loss and the energy gap',
  txt:`A 5% loss from usual weight at diagnosis carried a 30% higher risk of death in a cohort of 92 people. About 41-50% of people with ALS are hypermetabolic, using more energy at rest than predicted, while eating gets harder. ESPEN estimates needs at about 30 kcal/kg a day without ventilation and 25-30 kcal/kg on NIV. <sup class="c" data-ref="Marin2011,Steyn2018,Bouteloup2009,Burgos2018ESPEN" title="Source 71,84,321,486">71,84,321,486</sup>`,
  pt:'Many people with ALS burn more energy than usual while eating less, so weight falls. Keeping weight on matters.',
  hook:'Weight loss predicts shorter survival in ALS: 5% lost by diagnosis carried a 30% higher risk of death (Marin 2011). <sup class="c" data-ref="Marin2011" title="Source 321">321</sup>'},
 {from:.44,at:.48,k:'Window',t:'Gastrostomy while breathing allows',
  txt:`NICE recommends discussing gastrostomy early and at regular intervals, explaining the benefits of early placement and the risks of late placement. EFNS, as quoted by ProGas and Dorst, places it after 10% or more weight loss and before VC falls below 50% predicted; ESPEN before severe weight loss and before breathing is severely impaired; Canada names 5-10% weight loss, a 1-point BMI fall or BMI below 18.5, with referral as FVC approaches 50%. <sup class="c" data-ref="NICE2016,Andersen2012EFNS,ProGas2015,Dorst2019,Burgos2018ESPEN,Shoesmith2020" title="Source 20,84,145,401,431,471">20,84,145,401,431,471</sup>`,
  pt:'A feeding tube is easier and safer to place while breathing is still fairly strong, so teams raise it early.',
  hook:'Gastrostomy is discussed early and placed, in the guideline wording, before FVC falls to about 50% and before severe weight loss.'},
 {from:.54,at:.6,k:'Procedure',t:'PEG, RIG or PIG',
  txt:`In ProGas (24 UK centres, 330 gastrostomies: 49% PEG, 37% RIG, 13% PIG), 30-day mortality was 3% after PEG, 3% after RIG and 7% after PIG (p=0.46), 6% of procedures could not be completed in each group, and the method did not affect the hazard of death after adjustment. AAN 2009 grades risk by FVC: above 50% low, 30-50% moderate, below 30% high. EAN 2024 starts NIV first when breathing is weak. <sup class="c" data-ref="ProGas2015,Miller2009AAN,VanDamme2024EAN" title="Source 332,431,507">332,431,507</sup>`,
  pt:'There are three ways to place the tube. In a large UK study the risk in the first month was similar for all three.',
  hook:'ProGas: more than 10% weight loss before gastrostomy went with a hazard ratio for death of 2.51 and median survival of 7.7 against 12 months. <sup class="c" data-ref="ProGas2015" title="Source 431">431</sup>'},
 {from:.74,at:.8,k:'After',t:'Weight stabilises',
  txt:`In 7 Class III studies summarised by AAN 2009, weight stabilised or rose modestly over 2-24 months with tube feeding, and oral intake continues as tolerated. Survival benefit rests on observational data only: the 2023 Cochrane review found no randomised trials. High-calorie feeding is still being tested in LIPCAL-ALS II. <sup class="c" data-ref="Miller2009AAN,Sulistyo2023,LIPCALALSII" title="Source 297,332,488">297,332,488</sup>`,
  pt:'After the tube, weight usually stops falling. People can keep eating by mouth as far as they manage.',
  hook:'No randomised trial has compared tube feeding with continued oral feeding in ALS (Cochrane 2023). <sup class="c" data-ref="Sulistyo2023" title="Source 488">488</sup>'}
];
const NU_PG={PEG:{m:3,n:'5 of 163',fvc:65.4,surv:341},RIG:{m:3,n:'4 of 121',fvc:59,surv:361},PIG:{m:7,n:'3 of 43',fvc:52,surv:201}};
const NU_TXT={
 time:[ ['early','Timing: early'],['late','Timing: late'] ],
 proc:[ ['PEG','PEG (endoscopic)'],['RIG','RIG (radiological)'],['PIG','PIG (per-oral, image-guided)'] ],
 tongue:'tongue',epi:'epiglottis',airway:'airway',oes:'oesophagus',pen:'penetration',asp:'aspiration',
 thin:'thin drink',thick:'thickened drink (IDDSI)',
 energy:'Energy (schematic)',needs:'energy needed',eaten:'energy eaten',eatenTube:'eaten + tube',stomach:'stomach',
 pg:{title:'ProGas: 30-day mortality',val:(m,n)=>`${m}% (${n})`,p:'p=0.46: no significant difference',wl:'Weight loss before the tube:',
   hi:'>10%: median 7.7 months, HR 2.51',lo:'10% or less: median 12 months'},
 wTitle:'Weight, % of pre-illness',fTitle:'FVC, % predicted',months:'months',
 wTh:[ {v:95,l1:'95%',l2:'5% loss'},{v:90,l1:'90%',l2:'10% loss'} ],
 fTh:[ {v:50,l1:'50%',l2:'EFNS: before'},{v:30,l1:'30%',l2:'AAN high risk'} ],
 band:{low:'AAN: low risk',mod:'moderate risk',high:'high risk'},
 zone:['discuss early','window'],placed:p=>`${p} placed`,
 read:(m,w,f,sw,tb)=>`<span>month <b>${m}</b></span><span>weight <b>${w}%</b> of pre-illness</span><span>FVC <b>${f}%</b></span><span>swallow <b>${sw}</b></span><span>tube <b>${tb}</b></span>`,
 sw:{safe:'safe',slow:'slow, effortful',pen:'penetration',asp:'aspiration'},tb:{none:'not yet',on:p=>`${p} in place`},
 risk:{low:'low',mod:'moderate',high:'high'},
 placedNote:(p,m,l,f,r)=>`<b>${p} placed at month ${m}:</b> weight ${l}% below the weight at diagnosis, FVC ${f}%, AAN 2009 risk band ${r}. <sup class="c" data-ref="Miller2009AAN" title="Source 332">332</sup>`,
 lossNote:{hi:'In ProGas, more than 10% weight loss from diagnosis to gastrostomy went with median survival of 7.7 months against 12 months, and 10.7-fold higher odds of death within 30 days (95% CI 1.3-87.0). <sup class="c" data-ref="ProGas2015" title="Source 431">431</sup>',
   lo:'In ProGas, people with 10% weight loss or less from diagnosis to gastrostomy had a median survival of 12 months, against 7.7 months above 10%. <sup class="c" data-ref="ProGas2015" title="Source 431">431</sup>'},
 late:'<b>Late timing:</b> the tube is not yet placed, and weight and FVC keep falling. NICE lists the risks of late placement as low body mass, respiratory complications, dehydration and higher mortality. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>',
 lateNiv:'EAN 2024: with respiratory insufficiency, NIV is started first and the gastrostomy done with the person established on NIV; ESPEN suggests RIG by an expert team with moderate to severe respiratory impairment. <sup class="c" data-ref="VanDamme2024EAN,Burgos2018ESPEN" title="Source 84,507">84,507</sup>',
 procNote:(p,f,s)=>`<b>${p} in ProGas:</b> mean FVC at gastrostomy ${f}%, median survival after it ${s} days. The groups differed in breathing (p=0.004 for FVC), so these medians are not a fair comparison of methods. <sup class="c" data-ref="ProGas2015" title="Source 431">431</sup>`
};
inits.nutrition=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT'),T=NU_TXT;let timing='early',proc='PEG';
  const MON=t=>t*30;
  const W0=t=>interp([ [0,99],[.15,98.5],[.35,96],[.5,93.5],[.65,90],[.8,86.5],[1,82] ],t);
  const F=t=>interp([ [0,95],[.15,92],[1,28] ],t);
  const tgOf=()=>timing==='early'?.56:.86;
  const Wt=t=>{const tg=tgOf();return t<tg?W0(t):W0(tg)+1.2*ramp(t,tg,tg+.2)};
  const cross=(f,lv)=>{for(let i=0;i<=1000;i++){const u=i/1000;if(f(u)<lv)return u}return 1};
  const TW0=cross(W0,95),TW1=cross(F,50),TD=.12;
  const weak=t=>ramp(t,.08,.9);
  const tl=(x,y,arr,cls,dy,st)=>arr.map((s,i)=>`<text x="${f1(x)}" y="${f1(y+i*dy)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`).join('');
  const along=(P,u)=>{const n=P.length-1,k=Math.min(n-1,Math.floor(u*n)),f=u*n-k;return [lerp(P[k][0],P[k+1][0],f),lerp(P[k][1],P[k+1][1],f)]};
  const BP=[ [62,98],[100,96],[128,100],[146,114],[148,140],[147,164],[147,190],[147,238] ];
  function swState(t){const w=weak(t);return w>.65?'asp':w>.3?'pen':w>.1?'slow':'safe'}
  function swallow(t){
    const sw=(t*14)%1,w=weak(t),thick=t>=.26,close=bump(sw,.26,.62)*(1-.55*ramp(w,.3,.9)),lift=bump(sw,.26,.62)*(1-.5*w);
    const pen=ramp(w,.3,.8),asp=w>.65;
    let s=`<path d="M70 8 Q20 8 22 50 L12 68 L24 72 L22 84 Q16 90 26 94 Q20 104 32 108 Q38 126 70 130 L98 134 L100 246 L182 246 L180 126 Q200 96 192 56 Q178 4 70 8 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<path d="M126 84 Q150 70 168 76 L166 164 L134 164 L130 120 Z" style="fill:var(--bg);stroke:var(--cell-line);stroke-width:1"/>`;
    s+=`<path d="M30 78 Q80 70 128 78 L142 92" style="fill:none;stroke:var(--cell-line);stroke-width:3;stroke-linecap:round"/>`;
    const tb=92-12*bump(sw,0,.34);
    s+=`<path d="M40 100 Q70 ${f1(tb-4)} 112 ${f1(tb)} Q132 ${f1(tb+4)} 134 114 Q122 126 90 124 Q58 122 40 100Z" style="fill:var(--muscle);stroke:var(--muscle-line);stroke-width:1.4"/>`;
    s+=`<text x="76" y="116" class="t-xs t-mid" style="fill:var(--ink)">${T.tongue}</text>`;
    s+=`<rect x="136" y="164" width="22" height="82" style="fill:var(--food-soft);stroke:var(--food);stroke-width:1.4"/>`;
    // larynx moves up during the swallow
    const ly=-6*lift;s+=`<g transform="translate(0 ${f1(ly)})">`;
    s+=`<rect x="104" y="150" width="26" height="${f1(96+6*lift)}" style="fill:var(--air-soft);stroke:var(--air);stroke-width:1.4"/>`;
    s+=`<path d="M104 184 L113 188 L104 192 Z M130 184 L121 188 L130 192 Z" style="fill:var(--air)"/>`;
    const tx=lerp(124,140,close),ty=lerp(110,150,close);
    s+=`<path d="M112 142 L${f1(tx)} ${f1(ty)}" style="stroke:var(--muscle-line);stroke-width:4;stroke-linecap:round"/>`;
    // penetration / aspiration fragment
    if(pen>.02&&sw>.38&&sw<.95){const a=ramp(sw,.38,.5),b=asp?ramp(sw,.5,.7):0;const fx=lerp(146,118,a),fy=lerp(140,160,a)+b*(198-160);
      s+=`<circle cx="${f1(fx)}" cy="${f1(fy-ly)}" r="${f1(2+3*pen)}" style="fill:var(--food);stroke:var(--bad);stroke-width:1.2"/>`}
    s+='</g>';
    if(w>.4&&sw>.55)s+=`<ellipse cx="150" cy="156" rx="${f1(3+5*ramp(w,.4,1))}" ry="3" style="fill:var(--food);opacity:.8"/>`;
    if(sw<.8){const [bx,by]=along(BP,clamp(sw/.8));const r=thick?9:7;
      s+=thick?`<ellipse cx="${f1(bx)}" cy="${f1(by)}" rx="${r}" ry="${f1(r*.8)}" style="fill:var(--food);stroke:var(--food);stroke-width:2"/>`:`<circle cx="${f1(bx)}" cy="${f1(by)}" r="${r}" style="fill:var(--food);fill-opacity:.75;stroke:var(--food);stroke-width:1.2"/>`}
    s+=`<text x="96" y="148" class="t-xs t-end">${T.epi}</text><text x="98" y="232" class="t-xs t-end" style="fill:var(--air)">${T.airway}</text><text x="186" y="214" class="t-xs" style="fill:var(--food)">${T.oes}</text>`;
    if(pen>.05)s+=`<text x="96" y="176" class="t-sm t-end" style="fill:var(--bad)">${asp?T.asp:T.pen}</text>`;
    s+=`<text x="125" y="264" class="t-sm t-mid">${thick?T.thick:T.thin}</text>`;
    return s}
  function energy(t,x,y,w){const tg=tgOf(),need=1+.15*ramp(t,.3,.45);let eat=1-.3*ramp(t,.12,.7);const tube=t>=tg;if(tube)eat=lerp(eat,need,ramp(t,tg,tg+.06));
    const BW=w-120,sc=BW/1.2;let s=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${T.energy}</text>`;
    s+=`<text x="${x}" y="${y+16}" class="t-xs">${T.needs}</text><rect x="${x}" y="${y+20}" width="${f1(need*sc)}" height="10" rx="4" style="fill:var(--warn)"/>`;
    s+=`<text x="${x}" y="${y+42}" class="t-xs">${tube?T.eatenTube:T.eaten}</text><rect x="${x}" y="${y+46}" width="${f1(eat*sc)}" height="10" rx="4" style="fill:var(--food)"/>`;
    const cx=x+w-34,cy=y+34;
    s+=`<path d="M${cx-22} ${cy-8} Q${cx-10} ${cy-20} ${cx+8} ${cy-14} Q${cx+24} ${cy-6} ${cx+18} ${cy+10} Q${cx+4} ${cy+20} ${cx-14} ${cy+10} Q${cx-26} ${cy+2} ${cx-22} ${cy-8}Z" style="fill:var(--food-soft);stroke:var(--food);stroke-width:1.4"/>`;
    s+=`<text x="${cx}" y="${cy+32}" class="t-xs t-mid">${T.stomach}</text>`;
    if(tube)s+=`<path d="M${cx+4} ${cy-14} L${cx+4} ${y-6}" style="stroke:var(--food);stroke-width:3"/><circle cx="${cx+4}" cy="${y-6}" r="4" style="fill:var(--food)"/><text x="${cx-6}" y="${y-2}" class="t-sm t-end" style="fill:var(--food)">${proc}</text>`;
    return s}
  function progas(t,x,y,w){const tg=tgOf(),placed=t>=tg,loss=(W0(0)-W0(tg))/W0(0)*100,P=T.pg;
    let s=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${P.title}</text>`;
    const BW=w-150;
    ['PEG','RIG','PIG'].forEach((k,i)=>{const G=NU_PG[k],on=k===proc,yy=y+12+i*18;
      s+=`<text x="${x}" y="${yy+9}" class="t-sm"${on?' style="fill:var(--ink);font-weight:700"':''}>${k}</text><rect x="${x+34}" y="${yy}" width="${f1(BW*G.m/7)}" height="11" rx="3" style="fill:var(--food);opacity:${on?1:.4}"/><text x="${f1(x+40+BW*G.m/7)}" y="${yy+9}" class="t-xs"${on?' style="fill:var(--ink)"':''}>${P.val(G.m,G.n)}</text>`});
    s+=`<text x="${x}" y="${y+74}" class="t-xs">${P.p}</text><text x="${x}" y="${y+92}" class="t-xs" style="fill:var(--ink)">${P.wl}</text>`;
    const hi=placed&&loss>10,lo=placed&&loss<=10;
    s+=`<text x="${x}" y="${y+104}" class="t-xs" style="${hi?'fill:var(--bad);font-weight:700':''}">${P.hi}</text><text x="${x}" y="${y+116}" class="t-xs" style="${lo?'fill:var(--good);font-weight:700':''}">${P.lo}</text>`;
    return s}
  function charts(t,X0,X1,WY0,WY1,FY0,FY1,LX){const xt=u=>lerp(X0,X1,u),yw=v=>lerp(WY1,WY0,(v-78)/24),yf=v=>lerp(FY1,FY0,(v-20)/80),tg=tgOf();
    let s='';
    // discussion zone and window, through both plots
    s+=`<rect x="${f1(xt(TD))}" y="${WY0}" width="${f1(xt(TW0)-xt(TD))}" height="${FY1-WY0}" style="fill:var(--food-soft);opacity:.35"/>`;
    s+=`<rect x="${f1(xt(TW0))}" y="${WY0}" width="${f1(xt(TW1)-xt(TW0))}" height="${FY1-WY0}" style="fill:var(--food-soft);opacity:.9"/>`;
    const zy=(WY1+FY0)/2-4;
    s+=`<text x="${f1((xt(TD)+xt(TW0))/2)}" y="${f1(zy)}" class="t-xs t-mid" style="fill:var(--food)">${T.zone[0]}</text><text x="${f1((xt(TW0)+xt(TW1))/2)}" y="${f1(zy)}" class="t-xs t-mid" style="fill:var(--food);font-weight:700">${T.zone[1]}</text>`;
    s+=`<text x="${X0}" y="${WY0-8}" class="t-sm" style="fill:var(--ink)">${T.wTitle}</text><text x="${X0}" y="${FY0-8}" class="t-sm" style="fill:var(--ink)">${T.fTitle}</text>`;
    [80,85,90,95,100].forEach(v=>{s+=`<text x="${X0-5}" y="${f1(yw(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yw(100))}" y2="${f1(yw(100))}" class="grid"/>`;
    [20,40,60,80,100].forEach(v=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yf(v))}" y2="${f1(yf(v))}" class="grid"/><text x="${X0-5}" y="${f1(yf(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${X0}" x2="${X1}" y1="${WY1}" y2="${WY1}" class="axis"/><line x1="${X0}" x2="${X1}" y1="${FY1}" y2="${FY1}" class="axis"/>`;
    [0,6,12,18,24,30].forEach(m=>{s+=`<text x="${f1(xt(m/30))}" y="${FY1+14}" class="t-xs ${m===30?'t-end':m?'t-mid':''}">${m}</text>`});
    s+=`<text x="${LX}" y="${FY1+14}" class="t-xs">${T.months}</text>`;
    const w=Wt(t),f=F(t);
    T.wTh.forEach(h=>{const c=w<h.v,y=yw(h.v);s+=`<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c?'var(--warn)':'var(--muted)'};stroke-width:${c?1.8:1};${c?'':'stroke-dasharray:4 4'}"/>`+tl(LX,y-1,[h.l1,h.l2],'t-xs',10,c?'fill:var(--warn)':'')});
    T.fTh.forEach(h=>{const c=f<h.v,y=yf(h.v);s+=`<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c?'var(--warn)':'var(--muted)'};stroke-width:${c?1.8:1};${c?'':'stroke-dasharray:4 4'}"/>`+tl(LX,y-1,[h.l1,h.l2],'t-xs',10,c?'fill:var(--warn)':'')});
    s+=`<text x="${X0+4}" y="${f1(yf(50)-5)}" class="t-xs">${T.band.low}</text><text x="${X0+4}" y="${f1(yf(40)+3)}" class="t-xs">${T.band.mod}</text><text x="${X0+4}" y="${f1(yf(25)+3)}" class="t-xs">${T.band.high}</text>`;
    s+=`<path d="${pathFn(u=>(Wt(u)-78)/24,X0,X1,WY1,WY0)}" style="fill:none;stroke:var(--food);stroke-width:1.4;opacity:.3"/>`;
    s+=`<path d="${pathFn(u=>u<=t?(Wt(u)-78)/24:NaN,X0,X1,WY1,WY0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--food);stroke-width:3"/>`;
    s+=`<path d="${pathFn(u=>(F(u)-20)/80,X0,X1,FY1,FY0)}" style="fill:none;stroke:var(--air);stroke-width:1.4;opacity:.3"/>`;
    s+=`<path d="${pathFn(u=>u<=t?(F(u)-20)/80:NaN,X0,X1,FY1,FY0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--air);stroke-width:3"/>`;
    if(t>=tg){const x=xt(tg);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${WY0}" y2="${WY1}" style="stroke:var(--food);stroke-width:2"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${FY0}" y2="${FY1}" style="stroke:var(--food);stroke-width:2"/><circle cx="${f1(x)}" cy="${f1(yw(W0(tg)))}" r="5" style="fill:var(--panel);stroke:var(--food);stroke-width:2.5"/><circle cx="${f1(x)}" cy="${f1(yf(F(tg)))}" r="5" style="fill:var(--panel);stroke:var(--air);stroke-width:2.5"/>`;
      s+=`<text x="${f1(x-4)}" y="${f1(FY1-6)}" class="t-xs t-end" style="fill:var(--food);font-weight:700">${T.placed(proc)}</text>`}
    s+=`<circle cx="${f1(xt(t))}" cy="${f1(yw(w))}" r="5" style="fill:var(--food)"/><circle cx="${f1(xt(t))}" cy="${f1(yf(f))}" r="5" style="fill:var(--air)"/>`;
    s+=`<line x1="${f1(xt(t))}" x2="${f1(xt(t))}" y1="${WY0}" y2="${FY1}" style="stroke:var(--ink);stroke-width:1;opacity:.2"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 488','400 1030');let s='';
    if(N)s+=`<g transform="translate(38 4) scale(1.3)">${swallow(t)}</g>`+energy(t,24,374,352)+progas(t,24,454,352)+charts(t,44,262,612,762,806,986,272);
    else s+=`<g transform="translate(4 2)">${swallow(t)}</g>`+energy(t,12,286,240)+progas(t,12,364,240)+charts(t,300,580,30,190,234,414,590);
    svg.innerHTML=s;
    const p=phaseOf(NU_STEPS,t);setSt(p);
    const tg=tgOf(),placed=t>=tg,loss=(W0(0)-W0(tg))/W0(0)*100,fg=F(tg),band=fg>50?'low':fg>=30?'mod':'high';
    $('#nuRead').innerHTML=T.read(Math.round(MON(t)),Math.round(Wt(t)),Math.round(F(t)),T.sw[swState(t)],placed?T.tb.on(proc):T.tb.none);
    let ex='';
    if(placed)ex+=`<p>${T.placedNote(proc,Math.round(MON(tg)),Math.round(loss),Math.round(fg),T.risk[band])}</p><p>${loss>10?T.lossNote.hi:T.lossNote.lo}</p>`;
    else if(timing==='late'&&p>=5)ex+=`<p>${T.late}</p>`;
    if(timing==='late'&&p>=5)ex+=`<p>${T.lateNiv}</p>`;
    if(p>=5){const G=NU_PG[proc];ex+=`<p>${T.procNote(proc,G.fvc,G.surv)}</p>`}
    $('#nuNote').innerHTML=noteHTML(NU_STEPS[p])+ex;
  }
  const stop=playWire(rg,$('#nuPlay'),draw,22000,UI.replay,'nutrition');
  const setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  toggleRow($('#nuTime'),T.time,timing,v=>{timing=v;draw(+rg.value)});
  toggleRow($('#nuProc'),T.proc,proc,v=>{proc=v;draw(+rg.value)});
  draw(+rg.value);
};
/* =============== 4.1 living with ALS =============== */
const LV_STEPS=[
 {from:0,at:.04,k:'Early',t:'Natural speech, early bulbar change',
  txt:`More than 80% of people living with MND develop speech difficulties; this is background stated in secondary sources <sup class="c" data-ref="Cave2021,Ball2004" title="Source 37,92">37,92</sup>. In 30 people followed for 2 years, speech stayed adequate on average for 18 months from the first bulbar symptom. Then intelligibility and speaking rate fell in nearly all of them, faster in bulbar-onset disease, and 60% reached "poor" speech that needed alternative methods <sup class="c" data-ref="Makkonen2018" title="Source 314">314</sup>.`,
  pt:`For a while speech stays clear. Then it slows and gets harder for others to follow, sooner when ALS starts in the mouth and throat.`,
  hook:`AAC means <b>augmentative and alternative communication</b>: anything from a letter board to an eye-gaze computer.`},
 {from:.14,at:.18,k:'While speech is clear',t:'Voice and message banking',
  txt:`Voice banking builds a synthetic approximation of a person's own voice for later use in a speech-generating device. Message banking records whole words and phrases in the person's voice for playback. In interviews with 12 people with MND, preserving identity was the main motivation, and few understood how a banked voice is actually used <sup class="c" data-ref="Cave2021" title="Source 92">92</sup>. In one survey most people with MND, family members and clinicians had never heard of message banking, but all were interested <sup class="c" data-ref="Oosthuizen2018" title="Source 409">409</sup>. The EAN 2024 guideline names banking among the reasons to refer to a specialised AAC hub <sup class="c" data-ref="VanDamme2024EAN" title="Source 507">507</sup>.`,
  pt:`Recording one's own voice while it is still clear lets a later device speak with something close to it.`,
  hook:`<b>Voice banking</b> builds a synthetic voice; <b>message banking</b> stores whole recorded phrases. They are not the same thing.`},
 {from:.28,at:.32,k:'Assessment',t:'Assessment and low-tech AAC',
  txt:`NICE NG42 says speech and communication should be assessed by a speech and language therapist "without delay", and AAC equipment provided without delay: low-tech aids such as alphabet, word or picture boards, and high-tech voice-output aids on a PC or tablet, with needs reviewed as MND progresses <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>. In a US survey of 216 people with ALS, just over half of those with severe speech impairment also used low-tech AAC, and fewer than half said their family had received communication education or support <sup class="c" data-ref="Peters2024" title="Source 420">420</sup>.`,
  pt:`A speech and language therapist assesses early. Simple boards with letters, words or pictures work anywhere, even when a device is not at hand.`,
  hook:`NICE NG42: assessment and AAC equipment <b>without delay</b>, both low-tech and high-tech <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>.`},
 {from:.42,at:.46,k:'Middle',t:'Typing and text-to-speech',
  txt:`Tablet- or PC-based voice-output aids turn typed text into speech, and they can speak in a banked voice <sup class="c" data-ref="NICE2016,Cave2021" title="Source 92,401">92,401</sup>. In 50 people followed over 4 years at one US centre, 96% accepted AAC technology (90% straight away, 6% after a delay), 4% rejected it, and none stopped using it <sup class="c" data-ref="Ball2004" title="Source 37">37</sup>. Over 90% of US survey respondents with severe speech impairment used speech-generating devices <sup class="c" data-ref="Peters2024" title="Source 420">420</sup>.`,
  pt:`Typing on a tablet that speaks aloud takes over when speech no longer carries. Almost everyone offered this at one clinic took it up.`,
  hook:`Ball 2004: <b>96%</b> accepted AAC technology and none stopped using it <sup class="c" data-ref="Ball2004" title="Source 37">37</sup>.`},
 {from:.56,at:.60,k:'Later',t:'Eye-gaze',
  txt:`When hand use is lost, eye-tracking systems let a person select letters and phrases by looking at them. NICE says people who need complex technology such as eye-gaze access should be referred to a specialised NHS AAC hub <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>. In 11 people with advanced ALS (mean ALSFRS-R 5.3; 82% on invasive ventilation), mean daily use was 9.1 hours (range 0.5-16), satisfaction was high, and use was associated with higher psychological well-being <sup class="c" data-ref="Linse2018" title="Source 296">296</sup>.`,
  pt:`A camera follows the eyes. Holding the gaze on a letter or a phrase selects it, and the device speaks it.`,
  hook:`Eye-gaze access is a reason NICE gives for referral to a <b>specialised AAC hub</b> <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>.`},
 {from:.70,at:.74,k:'A minority',t:'Locked-in states on long-term ventilation',
  txt:`Among 70 people on tracheostomy ventilation in Japan, 11.4% developed a totally locked-in state, and among those ventilated for more than 5 years 18.2% did so and 33.1% reached a minimal communication state <sup class="c" data-ref="Hayashi2003" title="Source 222">222</sup>. A nationwide survey found it in 89 of 709 people on tracheostomy ventilation (13%) <sup class="c" data-ref="Kawata2008" title="Source 258">258</sup>. No source read for this guide gives a figure across all people with ALS: these numbers apply only to people on long-term tracheostomy ventilation. In 19 people in a locked-in state who answered by eye-tracking, most reported a positive quality of life <sup class="c" data-ref="KuzmaKozakiewicz2019" title="Source 278">278</sup>.`,
  pt:`A small share of people who live for years on a breathing machine through the neck lose eye movement as well. In one small study, most people in a locked-in state still rated their quality of life as positive.`,
  hook:`The 11-13% locked-in figures come from people on <b>tracheostomy ventilation</b>, not from all people with ALS <sup class="c" data-ref="Hayashi2003,Kawata2008" title="Source 222,258">222,258</sup>.`},
 {from:.84,at:.88,k:'Research',t:'Brain-computer interfaces',
  txt:`<span class="ev early">Early evidence</span> Results so far come from single participants or very small groups. In 2016 a fully implanted interface let one woman with late-stage ALS type at about 2 letters a minute <sup class="c" data-ref="Vansteensel2016" title="Source 515">515</sup>. In 2023 an intracortical speech interface decoded attempted speech at 62 words a minute (word error rate 9.1% on 50 words, 23.8% on 125,000 words) <sup class="c" data-ref="Willett2023" title="Source 539">539</sup>. In 2024 one man reached 97.5% accuracy over 8.4 months, at about 32 words a minute, in a voice designed to sound like his voice before ALS <sup class="c" data-ref="Card2024" title="Source 89">89</sup>. In 2025 voice was synthesised instantly from brain signals <sup class="c" data-ref="Wairagkar2025" title="Source 526">526</sup>. One person in a completely locked-in state spelled letter by letter <sup class="c" data-ref="Chaudhary2022" title="Source 98">98</sup>, and an endovascular device was implanted in 4 people with no device-related serious adverse events over 12 months <sup class="c" data-ref="Mitchell2023" title="Source 337">337</sup>.`,
  pt:`Sensors on or in the brain can turn attempted speech into text or voice. So far this works in research with one or a few people at a time.`,
  hook:`Brain-computer interfaces are <b>early evidence</b>: single participants or tiny series, not routine care.`}
];
const LV_TXT={
 title:'COMMUNICATION OVER THE COURSE',
 stepOf:(i,n)=>`Step ${i} of ${n}`,
 bars:['Speech intelligibility','Hand use','Eye movement'],
 speechW:['clear','slower, less clear','hard to understand','not usable for most needs'],
 handW:['typing and pointing','weaker, slower','little or no hand use'],
 eyeW:'usually kept',eyeMinor:'may be lost (minority, TPPV)',
 sch:'Bars are schematic, not measured values',
 courseW:'course of the illness →',courseN:'course of the illness ↓',
 stW:[ ['Natural','speech'],['Voice','banking'],['Letter and','word boards'],['Typing to','speech'],['Eye-gaze','access'],['Locked-in','(on TPPV)'],['Brain','interfaces'] ],
 stN:['Natural speech','Voice/message banking','Letter and word boards','Typing to speech','Eye-gaze access','Locked-in (on TPPV)','Brain interfaces'],
 evTag:'EARLY EVIDENCE',
 capW:'Each step: what studies and guidelines describe, not a recommendation.',
 capN:['What studies and guidelines','describe, not a recommendation.'],
 hello:'Good morning',s1:'clear at first, then slower and less clear',
 bank:'voice bank',vb:'voice banking: a synthetic voice',mb:'message banking: whole phrases',
 alpha:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',yes:'YES',no:'NO',spell:'TEA',spelled:s=>`spelled: ${s}`,
 kb:['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'],msg:'Please open the window',speaks:['speaks aloud','in a banked voice'],
 gazeKeys:['Yes','No','Water','Pain','Thank you','Later'],tracker:'eye tracker',
 tlsT:'Of 100 people on tracheostomy ventilation',tls:['about 11 to 13 of them','became totally','locked-in (Japan)'],tlsNot:['Not a figure for','all people with ALS'],
 dec:'decoder',out:'text or voice',
 ms:[ ['2016','about 2','letters/min'],['2023','62','words/min'],['2024','32 words/min','over 8 months'],['2025','instant','voice'] ],
 bciCap:'single participants or very small groups',
 /* ECAS */
 ecN:['ALS-Specific','ALS Non-specific','Total'],
 cut:c=>`cut-off ${c}`,
 score:(v,m,st)=>`${v} of ${m} · ${st}`,
 ecSt:{below:'below cut-off',at:'at the cut-off',above:'above cut-off'},
 ecK:'Original ECAS cut-offs',
 ecT:(n,m)=>n===0?'No score is below its original cut-off':`${n} of ${m} scores are below their original cut-offs`,
 ecLine:(name,v,m,c,st)=>`${name}: ${v} of ${m}, ${st} (${c})`,
 ecTxt:`The original cut-offs, derived from healthy controls, were 77 of 100 (ALS-Specific), 24 of 36 (ALS Non-specific) and 105 of 136 (Total) <sup class="c" data-ref="Abrahams2014" title="Source 2">2</sup>. In the development sample of 48 people with ALS without evident dementia, 29% had abnormal ALS-Specific scores, language deficits were the most frequent (35%), and carers reported behaviour change in at least one domain for 40% <sup class="c" data-ref="Abrahams2014" title="Source 2">2</sup>.`,
 ecPt:`The screen gives two part-scores and a total. A lower score means more difficulty. Falling below a cut-off is a reason to look closer, not a diagnosis.`,
 ecHook:`ECAS original cut-offs: <b>77/100</b> ALS-Specific, <b>24/36</b> ALS Non-specific, <b>105/136</b> Total <sup class="c" data-ref="Abrahams2014" title="Source 2">2</sup>.`
};
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT'),T=LV_TXT,S=LV_STEPS,FR=S.map(s=>s.from),NS=S.length;
  const uOf=(t,i)=>ramp(t,FR[i],i<NS-1?FR[i+1]:1);
  const speechV=t=>interp([ [0,1],[.14,.88],[.28,.62],[.42,.38],[.56,.18],[.70,.07],[1,.04] ],t);
  const handV=t=>interp([ [0,1],[.42,.9],[.50,.6],[.56,.3],[.70,.12],[1,.08] ],t);
  const WR=rng(41),WAVE=Array.from({length:6},()=>Array.from({length:9},()=>.25+.75*WR()));
  const P=(x,y)=>`${f1(x)} ${f1(y)}`;
  /* ---- the seven scenes, each in a 360 x 196 frame ---- */
  function scene(i,u,t,v){
    let g='';
    if(i===0){
      g+=`<circle cx="70" cy="92" r="38" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
      g+=`<circle cx="84" cy="80" r="3.6" style="fill:var(--nuc)"/>`;
      g+=`<path d="M88 106 q9 ${f1(3+6*v)} 18 0" style="fill:none;stroke:var(--nuc);stroke-width:2.4;stroke-linecap:round"/>`;
      for(let k=0;k<3;k++){const ph=(t*24+k/3)%1,r=12+k*11+ph*5,a=.62;
        g+=`<path d="M${P(108+r*Math.cos(-a),104+r*Math.sin(-a))} A${f1(r)} ${f1(r)} 0 0 1 ${P(108+r*Math.cos(a),104+r*Math.sin(a))}" style="fill:none;stroke:var(--steel);stroke-width:2.2;stroke-linecap:round;opacity:${f1(v*(1-ph*.6))}"/>`}
      g+=`<rect x="150" y="38" width="196" height="60" rx="16" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/><path d="M168 97 l-14 16 l30 -16z" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5;stroke-linejoin:round"/><path d="M167 96 h18" style="stroke:var(--panel);stroke-width:3"/>`;
      g+=`<text x="248" y="74" class="t-big t-mid" filter="url(#lvBlur)" style="opacity:${f1(.25+.75*v)}">${T.hello}</text>`;
      g+=`<text x="180" y="178" class="t-xs t-mid">${T.s1}</text>`;
    }else if(i===1){
      g+=`<rect x="48" y="40" width="24" height="46" rx="12" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.6"/>`;
      g+=`<path d="M38 70 q0 28 22 28 q22 0 22 -28 M60 98 v16 M46 114 h28" style="fill:none;stroke:var(--muted);stroke-width:1.8;stroke-linecap:round"/>`;
      g+=`<path d="M92 66 H140" class="arrow" marker-end="url(#lvA)"/>`;
      g+=`<rect x="150" y="24" width="196" height="96" rx="12" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.4"/>`;
      g+=`<text x="160" y="40" class="t-xs">${T.bank}</text>`;
      const n=Math.max(1,Math.ceil(u*6));
      for(let j=0;j<n;j++){const x0=162+(j%3)*60,y0=64+Math.floor(j/3)*30,a=j===n-1?ramp(u*6-j,0,1):1;
        g+=`<g style="opacity:${f1(.3+.7*a)}"><rect x="${x0-4}" y="${y0-12}" width="54" height="24" rx="6" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.2"/>`;
        WAVE[j].forEach((h,k)=>{const hh=h*16;g+=`<rect x="${x0+k*5}" y="${f1(y0-hh/2)}" width="3" height="${f1(hh)}" rx="1.5" style="fill:var(--steel)"/>`});
        g+='</g>'}
      g+=`<text x="20" y="150" class="t-xs" style="fill:var(--ink)">${T.vb}</text><text x="20" y="168" class="t-xs" style="fill:var(--ink)">${T.mb}</text>`;
    }else if(i===2){
      const cells=T.alpha.split('').concat([T.yes,T.no]);
      const seq=T.spell.split('').map(c=>T.alpha.indexOf(c)),k=Math.min(seq.length-1,Math.floor(u*seq.length));
      g+=`<rect x="30" y="10" width="300" height="140" rx="10" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/>`;
      cells.forEach((c,j)=>{const x=40+(j%7)*40,y=20+Math.floor(j/7)*30,on=j===seq[k];
        g+=`<rect x="${x+2}" y="${y+2}" width="36" height="26" rx="5" style="fill:${on?'var(--steel-soft)':'var(--panel-2)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:${on?2:1}"/>`;
        g+=`<text x="${x+20}" y="${y+20}" class="${c.length>1?'t-xs':'t-lbl'} t-mid" style="fill:var(--ink)">${c}</text>`});
      g+=`<text x="30" y="176" class="t-lbl">${T.spelled(T.spell.slice(0,k+1))}</text>`;
    }else if(i===3){
      const L=T.msg.length,k=Math.round(ramp(u,0,.7)*L),typed=T.msg.slice(0,k),ch=k>0?T.msg[k-1].toUpperCase():'';
      g+=`<rect x="14" y="14" width="222" height="168" rx="14" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.6"/>`;
      g+=`<rect x="26" y="26" width="198" height="36" rx="6" style="fill:var(--panel);stroke:var(--line)"/>`;
      g+=`<text x="34" y="48" class="t-xs" style="fill:var(--ink)">${typed}</text>`;
      if(k<L&&Math.floor(t*90)%2===0)g+=`<rect x="${f1(34+typed.length*5.75)}" y="37" width="1.6" height="14" style="fill:var(--ink)"/>`;
      T.kb.forEach((row,r)=>{const rw=row.length*21,x0=125-rw/2;row.split('').forEach((c,j)=>{const on=c===ch&&k<L;
        g+=`<rect x="${f1(x0+j*21)}" y="${72+r*24}" width="19" height="20" rx="4" style="fill:${on?'var(--steel)':'var(--panel)'};stroke:var(--line)"/>`;
        g+=`<text x="${f1(x0+j*21+9.5)}" y="${86+r*24}" class="t-xs t-mid" style="fill:${on?'var(--on-steel)':'var(--muted)'}">${c}</text>`})});
      g+=`<rect x="75" y="146" width="100" height="18" rx="4" style="fill:${ch===' '&&k<L?'var(--steel)':'var(--panel)'};stroke:var(--line)"/>`;
      const sp=ramp(u,.72,.8);
      g+=`<path d="M292 80 h10 l12 -12 v44 l-12 -12 h-10z" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round"/>`;
      for(let j=0;j<3;j++){const r=10+j*8,ph=(t*24+j/3)%1;g+=`<path d="M${P(318+r*Math.cos(-.7),90+r*Math.sin(-.7))} A${r} ${r} 0 0 1 ${P(318+r*Math.cos(.7),90+r*Math.sin(.7))}" style="fill:none;stroke:var(--steel);stroke-width:2;opacity:${f1(sp*(1-ph*.6))}"/>`}
      g+=`<text x="304" y="140" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(.35+.65*sp)}">${T.speaks[0]}</text><text x="304" y="154" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(.35+.65*sp)}">${T.speaks[1]}</text>`;
    }else if(i===4){
      const C=j=>({x:106+(j%3)*80+37,y:28+Math.floor(j/3)*66+18}),seq=[2,4,0];
      const s3=clamp(u*3,0,2.999),j=Math.floor(s3),d=s3-j,from=C(j?seq[j-1]:1),to=C(seq[j]),m=ease(ramp(d,0,.3));
      const gx=lerp(from.x,to.x,m),gy=lerp(from.y,to.y,m),dw=ramp(d,.3,.9),sel=d>.9;
      g+=`<rect x="96" y="14" width="252" height="146" rx="10" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
      T.gazeKeys.forEach((kk,q)=>{const c=C(q),on=q===seq[j]&&sel;
        g+=`<rect x="${c.x-37}" y="${c.y-18}" width="74" height="52" rx="8" style="fill:${on?'var(--steel-soft)':'var(--panel-2)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:${on?2:1}"/>`;
        g+=`<text x="${c.x}" y="${c.y+24}" class="t-xs t-mid" style="fill:var(--ink)">${kk}</text>`});
      const dx=clamp((gx-40)/120,-1,1)*4,dy=clamp((gy-92)/60,-1,1)*3;
      g+=`<path d="M52 92 L${P(gx,gy)}" style="stroke:var(--steel);stroke-width:1.2;stroke-dasharray:3 4;opacity:.6"/>`;
      g+=`<path d="M14 92 Q40 70 66 92 Q40 114 14 92Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
      g+=`<circle cx="${f1(40+dx)}" cy="${f1(92+dy)}" r="9" style="fill:var(--steel)"/><circle cx="${f1(40+dx)}" cy="${f1(92+dy)}" r="4" style="fill:var(--nuc)"/>`;
      g+=`<circle cx="${f1(gx)}" cy="${f1(gy)}" r="4" style="fill:var(--steel)"/>`;
      if(dw>0)g+=`<circle cx="${f1(gx)}" cy="${f1(gy)}" r="12" transform="rotate(-90 ${P(gx,gy)})" style="fill:none;stroke:var(--steel);stroke-width:3;stroke-dasharray:${f1(75.4*dw)} 200"/>`;
      g+=`<rect x="182" y="166" width="80" height="7" rx="3" style="fill:var(--muted)"/><text x="222" y="188" class="t-xs t-mid">${T.tracker}</text>`;
    }else if(i===5){
      const n=Math.round(13*ramp(u,.05,.5));
      g+=`<text x="14" y="16" class="t-xs" style="fill:var(--ink)">${T.tlsT}</text>`;
      for(let q=0;q<100;q++){const x=26+(q%10)*13,y=34+Math.floor(q/10)*13,on=q<n;
        g+=`<circle cx="${x}" cy="${y}" r="5" style="fill:${on?'var(--tdp)':'var(--panel-2)'};stroke:${on?'var(--tdp)':'var(--cell-line)'};stroke-width:1"/>`}
      T.tls.forEach((l,q)=>{g+=`<text x="176" y="${58+q*16}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
      T.tlsNot.forEach((l,q)=>{g+=`<text x="176" y="${128+q*16}" class="t-xs">${l}</text>`});
    }else{
      g+=`<rect x="236" y="2" width="118" height="22" rx="6" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.2"/><text x="295" y="17" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">${T.evTag}</text>`;
      g+=`<ellipse cx="60" cy="64" rx="46" ry="34" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
      g+=`<path d="M30 56 q12 -10 22 0 q10 10 22 0 M28 74 q14 8 26 0 q12 -8 26 2 M46 40 q4 12 -4 20" style="fill:none;stroke:var(--cell-line);stroke-width:1.4;opacity:.7"/>`;
      g+=`<rect x="64" y="34" width="16" height="10" rx="2" style="fill:var(--steel)"/>`;
      g+=`<path d="M80 39 C104 18 118 58 136 66" style="fill:none;stroke:var(--steel);stroke-width:1.6"/>`;
      for(let k=0;k<3;k++){const q=(t*14+k/3)%1,a=1-q;const x=a*a*a*80+3*a*a*q*104+3*a*q*q*118+q*q*q*136,y=a*a*a*39+3*a*a*q*18+3*a*q*q*58+q*q*q*66;
        g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--steel)"/>`}
      g+=`<rect x="136" y="50" width="72" height="34" rx="8" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.6"/><text x="172" y="71" class="t-xs t-mid" style="fill:var(--ink)">${T.dec}</text>`;
      g+=`<path d="M210 67 H234" class="arrow" marker-end="url(#lvA)"/><text x="240" y="71" class="t-xs" style="fill:var(--ink)">${T.out}</text>`;
      g+=`<line x1="18" x2="276" y1="106" y2="106" class="axis"/>`;
      T.ms.forEach((m,q)=>{const x=18+q*86,o=ramp(u,q*.18,q*.18+.1);
        g+=`<g style="opacity:${f1(.15+.85*o)}"><circle cx="${x}" cy="106" r="4" style="fill:var(--steel)"/><text x="${x}" y="126" class="t-lbl">${m[0]}</text><text x="${x}" y="142" class="t-xs" style="fill:var(--ink)">${m[1]}</text><text x="${x}" y="156" class="t-xs">${m[2]}</text></g>`});
      g+=`<text x="18" y="184" class="t-xs">${T.bciCap}</text>`;
    }
    return g;
  }
  function bar(x,y,w,label,v,word,minor){
    let g=`<text x="${x}" y="${y}" class="t-xs">${label}</text>`;
    g+=`<rect x="${x}" y="${y+7}" width="${w}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    g+=`<rect x="${x}" y="${y+7}" width="${f1(Math.max(6,w*v))}" height="14" rx="7" style="fill:var(--steel)"/>`;
    if(minor)g+=`<rect x="${f1(x+w*.55)}" y="${y+7}" width="${f1(w*.45)}" height="14" rx="7" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.4;stroke-dasharray:4 3"/>`;
    g+=`<text x="${x}" y="${y+36}" class="t-xs" style="fill:var(--ink)">${word}</text>`;
    return g;
  }
  function draw(t){
    const N=vb(svg,'720 400','400 790');
    const L=N?{W:400,bx:16,bw:368,by:46,bdy:56,schY:214,px:16,py:224,pw:368,ph:206,fx:20,fy:229}
             :{W:720,bx:16,bw:234,by:52,bdy:58,schY:232,px:268,py:40,pw:436,ph:210,fx:306,fy:46};
    const p=phaseOf(S,t),u=uOf(t,p),sv=speechV(t),hv=handV(t);
    let s=`<defs>${marker('lvA','var(--muted)')}<filter id="lvBlur" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="${f1((1-sv)*2.4)}"/></filter></defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="24" class="t-sm" style="fill:var(--steel)">${T.title}</text><text x="${L.W-16}" y="24" class="t-sm t-end">${T.stepOf(p+1,NS)}</text>`;
    /* ability bars */
    const sw=T.speechW[sv>.75?0:sv>.45?1:sv>.15?2:3],hw=T.handW[hv>.75?0:hv>.3?1:2],minor=p>=5;
    s+=bar(L.bx,L.by,L.bw,T.bars[0],sv,sw);
    s+=bar(L.bx,L.by+L.bdy,L.bw,T.bars[1],hv,hw);
    s+=bar(L.bx,L.by+2*L.bdy,L.bw,T.bars[2],1,minor?T.eyeMinor:T.eyeW,minor);
    s+=`<text x="${L.bx}" y="${L.schY}" class="t-xs">${T.sch}</text>`;
    /* scene panel, sliding in at each step */
    s+=`<rect x="${L.px}" y="${L.py}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--panel);stroke:var(--line);stroke-width:1.4"/>`;
    const sl=ramp(t,FR[p],FR[p]+.025);
    s+=`<g transform="translate(${f1(L.fx+24*(1-sl))} ${L.fy})" style="opacity:${f1(.2+.8*sl)}">${scene(p,u,t,sv)}</g>`;
    /* the course: stations */
    if(!N){
      const X=i=>60+i*100,TY=292,xp=interp(FR.map((f,i)=>[f,X(i)]),t);
      s+=`<text x="40" y="270" class="t-xs">${T.courseW}</text>`;
      s+=`<line x1="40" x2="680" y1="${TY}" y2="${TY}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
      s+=`<line x1="40" x2="${f1(xp)}" y1="${TY}" y2="${TY}" style="stroke:var(--steel);stroke-width:4;stroke-linecap:round"/>`;
      S.forEach((st,i)=>{const on=t>=FR[i],cu=i===p,x=X(i),res=i===NS-1;
        if(cu)s+=`<circle cx="${x}" cy="${TY}" r="18" style="fill:none;stroke:var(--steel);stroke-width:2"/>`;
        s+=`<circle cx="${x}" cy="${TY}" r="12" style="fill:${on?'var(--steel)':'var(--panel)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:1.6;${res?'stroke-dasharray:4 3':''}"/>`;
        s+=`<text x="${x}" y="${TY+3.5}" class="t-xs t-mid" style="fill:${on?'var(--on-steel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
        T.stW[i].forEach((l,q)=>{s+=`<text x="${x}" y="${TY+34+q*13}" class="t-xs t-mid" style="fill:${cu?'var(--ink)':'var(--muted)'}">${l}</text>`});
        if(res)s+=`<rect x="${x-50}" y="${TY+52}" width="100" height="18" rx="5" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="${x}" y="${TY+65}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">${T.evTag}</text>`});
      s+=`<text x="16" y="390" class="t-xs">${T.capW}</text>`;
    }else{
      const Y=i=>456+i*44,TX=40,yp=interp(FR.map((f,i)=>[f,Y(i)]),t);
      s+=`<text x="384" y="447" class="t-xs t-end">${T.courseN}</text>`;
      s+=`<line x1="${TX}" x2="${TX}" y1="${Y(0)}" y2="${Y(NS-1)}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
      s+=`<line x1="${TX}" x2="${TX}" y1="${Y(0)}" y2="${f1(yp)}" style="stroke:var(--steel);stroke-width:4;stroke-linecap:round"/>`;
      S.forEach((st,i)=>{const on=t>=FR[i],cu=i===p,y=Y(i),res=i===NS-1;
        if(cu)s+=`<circle cx="${TX}" cy="${y}" r="18" style="fill:none;stroke:var(--steel);stroke-width:2"/>`;
        s+=`<circle cx="${TX}" cy="${y}" r="12" style="fill:${on?'var(--steel)':'var(--panel)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:1.6;${res?'stroke-dasharray:4 3':''}"/>`;
        s+=`<text x="${TX}" y="${y+3.5}" class="t-xs t-mid" style="fill:${on?'var(--on-steel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
        s+=`<text x="66" y="${y+4.5}" class="t-lbl" style="fill:${cu?'var(--ink)':'var(--muted)'}">${T.stN[i]}</text>`;
        if(res)s+=`<rect x="266" y="${y-11}" width="118" height="20" rx="5" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="325" y="${y+3}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">${T.evTag}</text>`});
      T.capN.forEach((l,q)=>{s+=`<text x="16" y="${760+q*14}" class="t-xs">${l}</text>`});
    }
    svg.innerHTML=s;
    setSt(p);$('#lvNote').innerHTML=noteHTML(S[p]);
  }
  const stop=playWire(rg,$('#lvPlay'),draw,21000,UI.replay,'living');
  const setSt=stepWire($('#lvSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- ECAS cut-offs ---- */
  const es=$('#lvEcSvg'),sp=$('#lvSpec'),ns=$('#lvNon'),MX=[100,36,136],CUT=[77,24,105];
  function drawE(){
    const N=vb(es,'720 170','400 216');
    const v=[+sp.value,+ns.value];v.push(v[0]+v[1]);
    const st=v.map((x,i)=>x<CUT[i]?'below':x===CUT[i]?'at':'above');
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    v.forEach((x,i)=>{
      const R=N?{lx:16,ly:34+i*68-10,bx:16,by:34+i*68,bw:368,cy:34+i*68+34}:{lx:16,ly:30+i*48+14,bx:200,by:30+i*48,bw:480,cy:30+i*48-8};
      const below=st[i]==='below',cx=R.bx+R.bw*CUT[i]/MX[i];
      s+=`<text x="${R.lx}" y="${R.ly}" class="t-lbl">${T.ecN[i]}</text>`;
      s+=`<rect x="${R.bx}" y="${R.by}" width="${R.bw}" height="20" rx="5" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${R.bx}" y="${R.by}" width="${f1(Math.max(4,R.bw*x/MX[i]))}" height="20" rx="5" style="fill:${below?'var(--warn-soft)':'var(--good-soft)'};stroke:${below?'var(--warn)':'var(--good)'};stroke-width:1.4"/>`;
      s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${R.by-5}" y2="${R.by+25}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      s+=`<text x="${f1(cx)}" y="${R.cy}" class="t-xs t-mid" style="fill:var(--ink)">${T.cut(CUT[i])}</text>`;
      s+=`<text x="${R.bx+6}" y="${R.by+14}" class="t-xs" style="fill:var(--ink)">${T.score(x,MX[i],T.ecSt[st[i]])}</text>`;
    });
    es.innerHTML=s;
    const nb=st.filter(x=>x==='below').length;
    const ul='<ul>'+v.map((x,i)=>`<li>${T.ecLine(T.ecN[i],x,MX[i],T.cut(CUT[i]),T.ecSt[st[i]])}</li>`).join('')+'</ul>';
    $('#lvEcNote').innerHTML=noteHTML({k:T.ecK,t:T.ecT(nb,3),txt:T.ecTxt,pt:T.ecPt,hook:T.ecHook}).replace('</h4>','</h4>'+ul);
  }
  sp.addEventListener('input',drawE);ns.addEventListener('input',drawE);
  drawE();
  const prev=redraws.living;redraws.living=()=>{prev&&prev();drawE()};

  /* ---- topic tabs ---- */
  const tabs=$('#lvTabs'),keys=$$('[data-lt]',tabs).map(b=>b.dataset.lt);
  function sel(k){if(!keys.includes(k))k=keys[0];
    $$('[data-lt]',tabs).forEach(b=>b.setAttribute('aria-pressed',b.dataset.lt===k));
    $$('[data-lp]',$('#m-living')).forEach(pn=>pn.hidden=pn.dataset.lp!==k);store.set('lvTab',k)}
  tabs.addEventListener('click',e=>{const b=e.target.closest('[data-lt]');if(b)sel(b.dataset.lt)});
  sel(store.get('lvTab','cog'));
};
/* =============== 4.2 nursing care =============== */
/* The assessment round: seven segments in the order of the research summary (H, step sequence). */
const NC_RING=[
 {from:0,at:.035,k:'Assessment round · 1 of 7',t:'Breathing',col:'--air',soft:'--air-soft',lbl:['Breathing'],
  h:['Symptoms, SpO2,','FVC or SNIP, cough'],
  items:['Breathless? Orthopnoea?','Sleep, morning headache','Abdominal paradox','SpO2 at rest, room air','FVC or SNIP, with position','Peak cough flow'],
  txt:`NICE NG42 lists the symptoms to ask about: breathlessness, orthopnoea, disturbed or non-refreshing sleep, nightmares, morning headaches, daytime sleepiness, poor concentration, fatigue and poor appetite. The signs include a raised respiratory rate, shallow breathing, a weak cough or sniff, abdominal paradox and accessory-muscle use. At baseline it records a single SpO2 at rest on room air plus FVC or VC and/or SNIP or MIP, repeated every 2 to 3 months, and notes that a weak cough "could be assessed by measuring peak cough flow". <sup class="c" data-ref="NICE2016" title="Source 401">401</sup> Upright and supine FVC differ, so the position of each measurement matters when values are compared over time. <sup class="c" data-ref="Lechtzin2002,Miller2009AAN" title="Source 286,332">286,332</sup>`,
  pt:'The nurse asks how the person sleeps and whether lying flat makes breathing harder, watches the belly and neck as they breathe, and measures how hard they can blow out or sniff in.',
  hook:'In 25 people with ALS, supine FVC below 75% predicted was 100% sensitive and specific for a low transdiaphragmatic pressure, and accessory-muscle use was 84% sensitive and 100% specific. <sup class="c" data-ref="Lechtzin2002" title="Source 286">286</sup> Sniff nasal pressure predicted hypercapnia better than VC (sensitivity 81% vs 53%), but no test did so with marked bulbar weakness. <sup class="c" data-ref="Lyall2001" title="Source 306">306</sup>'},
 {from:1/7,at:1/7+.035,k:'Assessment round · 2 of 7',t:'Swallowing and nutrition',col:'--food',soft:'--food-soft',lbl:['Swallowing,','nutrition'],
  h:['Weight, meals,','a swallow screen'],
  items:['Weight against the trend','How long meals take','Coughing on swallowing','Fluid intake','EAT-10 screen','Swallow assessment if concern'],
  txt:`NICE expects weight, diet, fluid intake, hydration, oral health and swallowing to be assessed at diagnosis, at each MDT assessment and whenever there is concern, with a clinical swallowing assessment if problems are suspected. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup> The AAN nutrition algorithm adds prompts: prolonged meal times, meals ended early from fatigue, accelerated weight loss and family concern. <sup class="c" data-ref="Miller2009AAN" title="Source 332">332</sup> In 70 people with ALS who had videofluoroscopy, an EAT-10 score of 8 or more identified aspiration with 86% sensitivity and 72% specificity. <sup class="c" data-ref="Plowman2016" title="Source 426">426</sup>`,
  pt:'The nurse weighs the person, asks whether meals take longer or end in coughing, and uses a short questionnaire to spot unsafe swallowing early.',
  hook:'In 145 people followed with endoscopic swallow studies, 8% of those with dysphagia did not perceive it, and 44% of people with dysphagia refused thickeners or a gastrostomy. <sup class="c" data-ref="Onesti2017" title="Source 408">408</sup>'},
 {from:2/7,at:2/7+.035,k:'Assessment round · 3 of 7',t:'Skin under the mask',col:'--bad',soft:'--bad-soft',lbl:['Skin under','the mask'],
  h:['Nasal bridge, pressure','areas, mask fit'],
  items:['Nasal bridge','Cheeks under the interface','Other pressure areas','Mask fit','Positioning','Humidification'],
  txt:`No study of NIV-mask pressure injury in ALS was found for this guide. In hospitalised adults, an integrative review of 21 studies reported a 63.3% pressure-injury incidence with oronasal masks, most often on the nasal bridge. <sup class="c" data-ref="Fidalgo2023" title="Source 183">183</sup> In healthy volunteers on CPAP, interface pressure was highest at the nasal bridge, and humidification disrupted the skin barrier. <sup class="c" data-ref="Alqahtani2018" title="Source 15">15</sup> The Braden scale is a general pressure-sore risk tool; no validation in ALS was found. <sup class="c" data-ref="Bergstrom1987" title="Source 59">59</sup>`,
  pt:'A tight mask can damage the skin on the bridge of the nose. The nurse looks at the skin under it and checks how the mask fits.',
  hook:'Nasal masks allow easier speech but can leak through the mouth with bulbar weakness, and both nasal and full-face masks can cause facial pressure ulcers. <sup class="c" data-ref="Dorst2019" title="Source 145">145</sup>'},
 {from:3/7,at:3/7+.035,k:'Assessment round · 4 of 7',t:'Medicines',col:'--treat',soft:'--treat-soft',lbl:['Medicines'],
  h:['Timing, liver tests,','the form, the tube'],
  items:['Riluzole and meal timing','Date of last liver tests','Form: tablet, liquid, film','Edaravone or tofersen dates','Gastrostomy site','Flushes: 30 mL'],
  txt:`On the US label riluzole is taken at least 1 hour before or 2 hours after a meal, with liver tests every month for the first 3 months and periodically after that. <sup class="c" data-ref="FDA2026Riluzole" title="Source 177">177</sup> The form in use matters: tablet, oral suspension (which may go through a PEG) or oral film. <sup class="c" data-ref="FDA2026Tiglutik,FDA2020Exservan" title="Source 171,178">171,178</sup> Edaravone runs in 14-day dosing cycles and tofersen has its own intrathecal schedule. <sup class="c" data-ref="FDA2026Radicava,FDA2023Qalsody" title="Source 172,176">172,176</sup> ESPEN flushes the tube with 30 mL of water before, between and after each medicine, and checks the site daily. <sup class="c" data-ref="Bischoff2022" title="Source 63">63</sup> Part 2 takes each one in turn.`,
  pt:'The nurse checks that each medicine is in a form the person can swallow or put through the tube, given at the right time around meals, with blood tests up to date.'},
 {from:4/7,at:4/7+.035,k:'Assessment round · 5 of 7',t:'Communication',col:'--steel',soft:'--steel-soft',lbl:['Communication'],
  h:['Method, yes/no signal,','aid within reach'],
  items:['Method in use','The yes/no signal','Aid within reach','Change in speech'],
  txt:`Acute-care guidance asks staff to find out whether the person uses a yes/no code (any reliable movement, such as blinking), not to finish their sentences, and not to use family as translators unless the person asks. <sup class="c" data-ref="MNDA2026acute" title="Source 339">339</sup> NICE calls for prompt speech and language therapy assessment, low-tech and high-tech AAC, and alternative ways to contact services. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup> No published source on adapted nurse-call systems for people with weak hands in ALS was found.`,
  pt:'Before anything else, the nurse learns how this person says yes and no, and makes sure their board or device is where they can use it.',
  hook:'In 35 people with late-stage ALS and no speech, an eye-transfer (ETRAN) board improved communication over no aid, and eye-tracking devices improved it further. <sup class="c" data-ref="Caligari2013" title="Source 88">88</sup>'},
 {from:5/7,at:5/7+.035,k:'Assessment round · 6 of 7',t:'Mood and caregiver',col:'--warn',soft:'--warn-soft',lbl:['Mood and','caregiver'],
  h:['Mood, lability, cognition,','pain, the carer'],
  items:['Depression screen','Emotional lability','Cognition and behaviour','Pain','Carer burden'],
  txt:`Published screens include the ADI-12 for depression (30 or more identified every case of current major depression in 39 people), the CNS-LS for emotional lability (13 or more is the threshold used) and the ECAS for cognition and behaviour, designed for health care professionals and taking 15 to 20 minutes. <sup class="c" data-ref="Hammer2008,Brooks2013,Abrahams2014" title="Source 2,77,218">2,77,218</sup> Pain was reported by 56.9% of 160 people with ALS against 33.1% of controls, and the authors judged it under-recognised and undertreated. <sup class="c" data-ref="Chio2012Pain" title="Source 109">109</sup> NICE asks the team to tell carers about their right to a carer assessment and respite. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>`,
  pt:'The nurse asks how the person feels, whether laughing or crying comes on out of nowhere, whether anything hurts, and how the family carer is coping.',
  hook:'Emotional lability is not the same as depression: EAN asks for the two to be told apart, and both to be told apart from frontotemporal symptoms. <sup class="c" data-ref="VanDamme2024EAN" title="Source 507">507</sup>'},
 {from:6/7,at:6/7+.035,k:'Assessment round · 7 of 7',t:'Documentation',col:'--muted',soft:'--panel-2',lbl:['Documentation'],
  h:['Record, share,','alert'],
  items:['Measures, date, position','Weight trend, mask skin','Communication method','Medicines, liver tests','Advance decisions','Share with the team'],
  txt:`NICE asks that key decisions be shared with every professional involved, that the person and carers be offered a copy of the NIV care plan, and that services likely to see the person in a crisis be told they use NIV. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup> Acute-care guidance lists the documents to look for: an emergency healthcare plan, ReSPECT form, advance care plan, ADRT, DNACPR and an MND Alert Card. <sup class="c" data-ref="MNDA2026acute" title="Source 339">339</sup> No single published nursing documentation checklist for ALS was found; the note builder in part 4 gathers the items the guidelines and labels name.`,
  pt:'Writing down the numbers with the date and position lets the next nurse see the trend, and sharing the plan means an emergency team knows what the person wants.',
  hook:'Upright and supine FVC differ, yet no guideline found specifies recording the position. Recording it is inferred from those data, not stated in a guideline. <sup class="c" data-ref="Lechtzin2002,Miller2009AAN" title="Source 286,332">286,332</sup>'}
];

/* the screening tools; slider ranges are the tools' score ranges, cut-offs are the published ones */
const NC_SCR={
 eat:{b:'EAT-10 · swallowing',min:0,max:40,def:9,cuts:[3,8],
  means:[ [4.28,'mean, safe swallowers 4.28'],[7.10,'mean, penetration 7.10'],[20.50,'mean, aspiration 20.50'] ],
  zones:['Below 3: under both published cut-offs.',
   'At 3 or more: the cut-off that identified penetration or aspiration (sensitivity 88%, specificity 57%, AUC 0.77). <sup class="c" data-ref="Plowman2016" title="Source 426">426</sup>',
   'At 8 or more: the cut-off that identified aspiration (sensitivity 86%, specificity 72%, AUC 0.88, negative predictive value 95.5%). <sup class="c" data-ref="Plowman2016" title="Source 426">426</sup>'],
  txt:'The study: 70 people with ALS completed the EAT-10 and had videofluoroscopy. Mean scores were 4.28 in safe swallowers, 7.10 in those with penetration and 20.50 in those who aspirated. <sup class="c" data-ref="Plowman2016" title="Source 426">426</sup>',
  hook:'EAT-10 at 8 or more had a negative predictive value of 95.5% for aspiration in ALS: a low score made aspiration unlikely in that sample. <sup class="c" data-ref="Plowman2016" title="Source 426">426</sup>'},
 cns:{b:'CNS-LS · emotional lability',min:7,max:35,def:15,cuts:[13],means:[],
  zones:['Below 13, the threshold used for pseudobulbar affect symptoms.',
   'At 13 or more: in ALS (n=99) this cut-off matched neurologists\' diagnoses in 82% (sensitivity 0.84, specificity 0.81). <sup class="c" data-ref="Brooks2013" title="Source 77">77</sup>'],
  txt:'The CNS-LS is a 7-item self-report measure of laughing and crying lability developed in ALS, with 4 laughter and 3 tearfulness items. <sup class="c" data-ref="Moore1997" title="Source 346">346</sup> In the PRISM registry, 51.1% of women and 41.0% of men with ALS scored 13 or more (difference not significant). <sup class="c" data-ref="Brooks2013" title="Source 77">77</sup>',
  hook:'EAN lists SSRIs, tricyclics or dextromethorphan/quinidine for emotional lability, after it has been told apart from depression and frontotemporal symptoms. <sup class="c" data-ref="VanDamme2024EAN" title="Source 507">507</sup>'},
 adi:{b:'ADI-12 · depression',min:12,max:48,def:25,cuts:[23,30],means:[],
  zones:['Below both published cut-offs.',
   'At 23 or more: the cut-off that identified any depressive disorder (specificity 60%). <sup class="c" data-ref="Hammer2008" title="Source 218">218</sup>',
   'At 30 or more: the cut-off that identified everyone with current major depression (sensitivity 100%, specificity 83%). <sup class="c" data-ref="Hammer2008" title="Source 218">218</sup>'],
  txt:'The ALS Depression Inventory was validated in 39 people with ALS, correlating with the Beck Depression Inventory at r = 0.80. <sup class="c" data-ref="Hammer2008" title="Source 218">218</sup> The HADS, designed for hospital outpatients, fitted the Rasch model in 298 people with MND only after one item was removed from each subscale. <sup class="c" data-ref="Zigmond1983,Gibbons2011" title="Source 203,554">203,554</sup>',
  hook:'The AAN found depression prevalence in ALS reported from 0 to 44% and no controlled treatment trials (Level U). <sup class="c" data-ref="Miller2009AANb" title="Source 333">333</sup>'}
};

/* giving the medicines: each step names a small picture (g) drawn by the init below */
const NC_MEDS={
 tab:{b:'Riluzole tablet',n:'Riluzole tablet',
  pt:'Riluzole is a tablet taken twice a day, away from food on the US label, with blood tests to check the liver.',
  hook:'EAN recommends lifelong riluzole from diagnosis. If adverse events occur it suggests reducing the dose, then stopping if they persist. <sup class="c" data-ref="VanDamme2024EAN" title="Source 507">507</sup>',
  steps:[
   {t:'Time it around meals',g:'day',d:'US label: 50 mg twice daily, at least 1 hour before or 2 hours after a meal. <sup class="c" data-ref="FDA2026Riluzole" title="Source 177">177</sup> The EU SmPC does not make fasting part of the dosing, and reports that a high-fat meal lowers Cmax by 44% and AUC by 17%. <sup class="c" data-ref="EMA_RilutekSmPC" title="Source 163">163</sup>'},
   {t:'Check the liver tests',g:'lft',d:'Aminotransferases are measured before and during treatment. Riluzole is not recommended above 5 times the upper limit of normal on the US label, and is stopped at 5 times on the EU SmPC. On the US label ALT rose above 5 times the upper limit in 2%, with the highest rise within 3 months. The two schedules differ; the timeline below the player compares them. <sup class="c" data-ref="FDA2026Riluzole,EMA_RilutekSmPC" title="Source 163,177">163,177</sup>'},
   {t:'If tablets are hard to swallow',g:'crush',d:'No US or EU label statement on crushing riluzole tablets was found. In a home simulation, 15 inexperienced volunteers who crushed tablets lost a mean 6.27% of the powder and 8.53% of the active drug. <sup class="c" data-ref="Casiraghi2023" title="Source 90">90</sup> Authors of an observational study judged crushing into food inconsistent with safe and effective use. <sup class="c" data-ref="Onesti2017" title="Source 408">408</sup> A liquid and an oral film exist: the next two options.'},
   {t:'What to watch for',g:'lines',lines:['Fever: neutropenia, first 2 months','Interstitial lung disease','Pancreatitis: weeks to years later'],d:'Label warnings that call for observation: severe neutropenia within the first 2 months (patients are told to report a febrile illness), interstitial lung disease, and acute pancreatitis (abdominal pain, nausea, vomiting, anorexia) weeks to years after starting. <sup class="c" data-ref="FDA2026Riluzole" title="Source 177">177</sup> For a person on riluzole admitted with fever, acute-care guidance lists a full blood count and liver tests. <sup class="c" data-ref="MNDA2026acute" title="Source 339">339</sup>'}
  ]},
 liq:{b:'Riluzole liquid',n:'Riluzole oral suspension (Tiglutik)',
  pt:'The liquid form lets people who cannot swallow tablets, or who have a feeding tube, keep taking riluzole.',
  hook:'Tube materials named on the labels: silicone and polyurethane PEGs for Tiglutik; silicone, PVC or polyurethane NG or PEG tubes for edaravone oral suspension. <sup class="c" data-ref="FDA2026Tiglutik,FDA2026Radicava" title="Source 176,178">176,178</sup>',
  steps:[
   {t:'Shake the bottle',g:'shake',d:'Tiglutik is riluzole 50 mg in 10 mL. The bottle is shaken gently for at least 30 seconds before each dose. <sup class="c" data-ref="FDA2026Tiglutik" title="Source 178">178</sup>'},
   {t:'By mouth or through a PEG',g:'route',lbl:'PEG: silicone or polyurethane',d:'It may be taken by mouth or given through a PEG tube, and both silicone and polyurethane PEGs can be used. <sup class="c" data-ref="FDA2026Tiglutik" title="Source 178">178</sup> In healthy volunteers, suspension given by intragastric tube was bioequivalent to oral dosing (AUC ratio 90.6%, Cmax ratio 97.0%), in a manufacturer-linked study. <sup class="c" data-ref="Brooks2019" title="Source 78">78</sup>'},
   {t:'The same meal timing',g:'day',d:'The tablet timing applies: at least 1 hour before or 2 hours after a meal, which with tube feeding means fitting the dose around the feed. <sup class="c" data-ref="FDA2026Tiglutik" title="Source 178">178</sup> No published ALS nursing protocol joining these label rules with feeding regimens was found.'},
   {t:'Discard 15 days after opening',g:'discard',d:'Unused suspension is discarded 15 days after the bottle is opened. <sup class="c" data-ref="FDA2026Tiglutik" title="Source 178">178</sup>'}
  ]},
 film:{b:'Riluzole film',n:'Riluzole oral film (Exservan)',
  pt:'The film melts on the tongue, so there is no tablet to swallow and no water to drink with it.',
  hook:'In 9 people with ALS, videofluoroscopy before and after a dose of the film showed no worsening of swallowing; the study was manufacturer-linked. <sup class="c" data-ref="Wymer2023" title="Source 546">546</sup>',
  steps:[
   {t:'On top of the tongue',g:'tongue',lines:['On top of the tongue','Not cut','One film at a time'],d:'Exservan is riluzole 50 mg as an oral film. It is placed on top of the tongue, where it sticks and dissolves. It is not cut, and one film is taken at a time. <sup class="c" data-ref="FDA2020Exservan" title="Source 171">171</sup>'},
   {t:'Let it dissolve',g:'dissolve',lines:['No liquids','No chewing or spitting','No talking'],d:'It is not taken with liquids. Saliva is swallowed normally, and chewing, spitting and talking are avoided while it dissolves. In healthy subjects, 38% had oral hypoaesthesia on the film against none on tablets. <sup class="c" data-ref="FDA2020Exservan" title="Source 171">171</sup>'},
   {t:'The same meal timing',g:'day',d:'The film carries the same meal timing as the tablets. Taking it with food reduced AUC by 15% and Cmax by 45%. <sup class="c" data-ref="FDA2020Exservan,Wymer2023" title="Source 171,546">171,546</sup>'}
  ]},
 eiv:{b:'Edaravone IV',n:'Edaravone infusion (Radicava IV)',
  pt:'Edaravone by drip takes an hour, on set days of a four-week cycle.',
  hook:'EAN 2024 does not recommend IV or oral edaravone outside clinical trials (an interim recommendation). <sup class="c" data-ref="VanDamme2024EAN" title="Source 507">507</sup>',
  steps:[
   {t:'Check the overwrap',g:'lines',lines:['Indicator blue or purple: not used','Used within 24 h of opening','Nothing added to the bag'],d:'Radicava IV is not used if the oxygen indicator on the overwrap has turned blue or purple, and is used within 24 hours of opening the overwrap. No other medicines are added to the bag. <sup class="c" data-ref="FDA2026Radicava" title="Source 176">176</sup>'},
   {t:'Two 30 mg bags, 60 minutes',g:'bags',d:'The 60 mg dose is two consecutive 30 mg bags over a total of 60 minutes, about 1 mg per minute. <sup class="c" data-ref="FDA2026Radicava" title="Source 176">176</sup>'},
   {t:'Watch for hypersensitivity',g:'lines',lines:['Stopped at the first sign','Anaphylaxis can occur','Sulfite reactions: more in asthma'],d:'The infusion is stopped at the first sign of hypersensitivity. The label warns of anaphylaxis and of sulfite (sodium bisulfite) reactions, more frequent in people with asthma. The commonest IV adverse reactions were contusion (15% vs 9%), gait disturbance (13% vs 9%) and headache (10% vs 6%). <sup class="c" data-ref="FDA2026Radicava" title="Source 176">176</sup>'},
   {t:'The 28-day cycle',g:'cycle',d:'Cycle 1 is daily dosing for 14 days, then 14 drug-free days. Later cycles are dosing on 10 of 14 days, then 14 drug-free days. <sup class="c" data-ref="FDA2026Radicava" title="Source 176">176</sup>'}
  ]},
 eor:{b:'Edaravone oral',n:'Edaravone oral suspension (Radicava ORS)',
  pt:'Liquid edaravone is taken first thing in the morning on an empty stomach, with nothing to eat for an hour afterwards.',
  hook:'Riluzole and edaravone oral suspension both carry food-timing rules, so a tube-feeding schedule decides when they can be given. No published ALS protocol joining these rules with feeding regimens was found. <sup class="c" data-ref="FDA2026Tiglutik,FDA2026Radicava" title="Source 176,178">176,178</sup>',
  steps:[
   {t:'Morning, after an overnight fast',g:'fast',d:'Radicava ORS is 105 mg (5 mL), by mouth or feeding tube, in the morning after an overnight fast, with no food for 1 hour afterwards; water is allowed. <sup class="c" data-ref="FDA2026Radicava" title="Source 176">176</sup>'},
   {t:'If food was taken',g:'waits',d:'If food was eaten, the label sets how long to wait before the dose: 8 hours after a high-fat meal, 4 hours after a low-fat meal and 2 hours after a 250-calorie supplement, with no food for 1 hour after the dose in every case. <sup class="c" data-ref="FDA2026Radicava" title="Source 176">176</sup>'},
   {t:'Through the tube',g:'flushOne',d:'The bottle is shaken for at least 30 seconds. NG or PEG tubes of silicone, PVC or polyurethane may be used, flushed with at least 30 mL of water before and after. The supplied 5 mL syringe is used (a household teaspoon is not adequate), and the bottle is discarded 15 days after opening. <sup class="c" data-ref="FDA2026Radicava" title="Source 176">176</sup>'},
   {t:'The same 28-day cycle',g:'cycle',d:'The oral suspension follows the same cycles as the infusion: 14 days of dosing then 14 days off for cycle 1, then dosing on 10 of 14 days followed by 14 days off. <sup class="c" data-ref="FDA2026Radicava" title="Source 176">176</sup>'}
  ]},
 tof:{b:'Tofersen',n:'Tofersen, intrathecal (Qalsody)',
  pt:'Tofersen goes into the fluid around the spinal cord through a needle in the lower back: three doses two weeks apart, then one every four weeks.',
  hook:'In VALOR, lumbar-puncture-related adverse events were common and neurologic serious adverse events occurred in 7% of tofersen recipients. EAN recommends tofersen first-line for progressive SOD1-ALS and asks that the burden of repeated intrathecal dosing be discussed. <sup class="c" data-ref="Miller2022,VanDamme2024EAN" title="Source 335,507">335,507</sup>',
  steps:[
   {t:'Prepare the vial',g:'lines',lines:['Room temperature, no external heat','Not shaken','Given within 4 h of drawing up'],d:'Qalsody is 100 mg in 15 mL, given intrathecally by lumbar puncture by, or under the direction of, professionals experienced in lumbar puncture. The vial reaches room temperature without external heat and is not shaken, and the dose is given within 4 hours of being drawn up. <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup>'},
   {t:'Remove about 10 mL of CSF',g:'csf',d:'About 10 mL of cerebrospinal fluid is removed before the dose. Sedation and imaging guidance may be considered if indicated. <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup>'},
   {t:'Bolus over 1 to 3 minutes',g:'bolus',d:'The drug is injected undiluted as a bolus over 1 to 3 minutes. <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup>'},
   {t:'Evaluate before and after',g:'evalT',d:'Patients are evaluated before and after the injection for conditions related to lumbar puncture. The label gives no fixed observation period after the dose, so this guide does not give one. <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup> Routine bed rest after dural puncture did not prevent headache in a Cochrane review (not ALS-specific) and probably increased it (RR 1.24). <sup class="c" data-ref="Arevalo2016" title="Source 27">27</sup>'},
   {t:'Loading, then every 28 days',g:'tofSched',d:'Three loading doses are given at 14-day intervals, then one dose every 28 days. Label warnings include myelitis or radiculitis, papilloedema or raised intracranial pressure, and aseptic meningitis. Pain (42% vs 22%) and fatigue (17% vs 6%) were the commonest adverse reactions against placebo. <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup>'}
  ]},
 tube:{b:'Several via the tube',n:'Several medicines through one tube',
  pt:'Water before, between and after each medicine keeps the tube clear and stops medicines mixing in it.',
  hook:'Two sources, two volumes for the flush between medicines: 30 mL in ESPEN 2022, at least 5 mL in NHS Lothian 2013. <sup class="c" data-ref="Bischoff2022,NHSLothian2013" title="Source 63,400">63,400</sup>',
  steps:[
   {t:'Flush, one drug, flush',g:'flush',d:'ESPEN: medicines are given one at a time, flushing the tube with 30 mL of water before, between and after each one. <sup class="c" data-ref="Bischoff2022" title="Source 63">63</sup> An NHS Lothian best-practice statement (2013, past its review date) gives at least 30 mL before, at least 5 mL between each and at least 30 mL after, and medicines are not mixed with each other or with the feed. <sup class="c" data-ref="NHSLothian2013" title="Source 400">400</sup>'},
   {t:'Forms that are not crushed',g:'lines',lines:['Enteric-coated','Modified or slow release','Cytotoxic or hormonal'],d:'Enteric-coated, modified or slow-release, and cytotoxic or hormonal medicines are not crushed. <sup class="c" data-ref="NHSLothian2013" title="Source 400">400</sup> ESPEN says crushing "should be avoided whenever possible", warns that liquid medicines may carry sorbitol or a high osmolality, and asks for a pharmacist to be involved. <sup class="c" data-ref="Bischoff2022" title="Source 63">63</sup>'},
   {t:'Drugs for an empty stomach',g:'empty',d:'For drugs that need an empty stomach, feeds are stopped 15 to 30 minutes before and restarted 15 to 30 minutes after. <sup class="c" data-ref="NHSLothian2013" title="Source 400">400</sup> Riluzole and edaravone oral suspension have their own, longer label windows around food. <sup class="c" data-ref="FDA2026Tiglutik,FDA2026Radicava" title="Source 176,178">176,178</sup>'},
   {t:'Record it',g:'lines',lines:['Form and volume: prescription chart','Flushes: fluid balance chart','Blocked tube: no cola (ESPEN)'],d:'The dosage form and liquid volume go on the prescription chart, and flushes on the fluid balance chart where relevant. <sup class="c" data-ref="NHSLothian2013" title="Source 400">400</sup> For a blocked tube, ESPEN does not recommend cola, calls sodium bicarbonate "not evidence-based", and leaves a guide wire or declogger to an expert. <sup class="c" data-ref="Bischoff2022" title="Source 63">63</sup>'}
  ]}
};

const NC_MYTHS=[
 {m:'Twitching means ALS.',a:'Among 121 people diagnosed with benign fasciculations, with a normal examination and normal electrophysiology apart from the twitching, none developed motor neuron disease over 2 to 32 years. <sup class="c" data-ref="Blexrud1993" title="Source 65">65</sup> NICE does list muscle twitching among possible presenting features, alongside weakness and other signs. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>'},
 {m:'A feeding tube means no more eating.',a:'The AAN states that "PEG does not eliminate oral feeding", and describes it as a way to give medicines and fluids and to stabilise weight. <sup class="c" data-ref="Miller2009AAN" title="Source 332">332</sup>'},
 {m:'Once NIV starts, it cannot be stopped.',a:'NICE asks professionals to "explain that non-invasive ventilation can be stopped at any time", with support from professionals experienced in withdrawal. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup> In interviews with 24 UK doctors, colleagues were sometimes unclear about the difference between palliation, treatment withdrawal and assisted death. <sup class="c" data-ref="Phelps2017" title="Source 421">421</sup>'},
 {m:'People with ALS choke to death.',a:'In 121 German and 50 UK deaths, most people died peacefully (88% and 98%) and "no patient choked to death". The commonest symptoms in the last 24 hours were breathlessness, cough, anxiety and restlessness. <sup class="c" data-ref="Neudert2001" title="Source 391">391</sup> Acute-care guidance asks staff to reassure the person that death from choking is rare. <sup class="c" data-ref="MNDA2026acute" title="Source 339">339</sup>'},
 {m:'Oxygen relieves breathlessness in ALS.',a:'MND Association guidance states that "Oxygen does not help breathlessness". In a pilot of 6 people with terminal ALS, nasal oxygen beforehand did not significantly reduce breathlessness, while morphine did. <sup class="c" data-ref="MNDA2026acute,Clemens2008" title="Source 115,339">115,339</sup> Oxygen can also raise carbon dioxide: see the hospital oxygen panel above.'},
 {m:'Bed rest prevents headache after a lumbar puncture.',a:'A Cochrane review of 24 trials (2996 participants) found no evidence that routine bed rest prevents post-dural-puncture headache; bed rest probably increased it (RR 1.24). The review was not ALS-specific. <sup class="c" data-ref="Arevalo2016" title="Source 27">27</sup>'}
];

const NC_DOC=[
 {k:'resp',c:true,l:'Breathing measures, with date and position',v:'Breathing [date]: SpO2 ___% at rest on room air. FVC ___% predicted, position [upright / supine]. SNIP ___ cmH2O. Peak cough flow ___ L/min. Orthopnoea, sleep, morning headache: ___.'},
 {k:'food',c:true,l:'Weight and the trend',v:'Nutrition: weight ___ kg (last ___ kg on [date]). Meal length, coughing on swallowing, fluid intake: ___. EAT-10 ___.'},
 {k:'skin',c:true,l:'Skin under the mask',v:'Skin: nasal bridge and cheeks under the NIV interface [intact / marked]. Other pressure areas ___. Mask fit, positioning and humidification reviewed.'},
 {k:'meds',c:false,l:'Medicines and liver tests',v:'Medicines: riluzole as [tablet / suspension via PEG / film], timing around meals or feeds ___. Last liver tests [date]. Edaravone or tofersen dates, if prescribed ___. Changes ___.'},
 {k:'tube',c:false,l:'Gastrostomy site and flushes',v:'Gastrostomy: site ___; tube moves freely [yes / no]. Dosage form and volume on the prescription chart; flushes on the fluid balance chart.'},
 {k:'comm',c:true,l:'Communication method and yes/no signal',v:'Communication: method ___; yes/no signal ___; aid within reach [yes / no]. Change in speech ___.'},
 {k:'mood',c:false,l:'Mood, lability, cognition, pain and the carer',v:'Mood and cognition: [screen used and score]. Pain ___. Carer: [how they are coping; carer assessment offered].'},
 {k:'acp',c:false,l:'Advance decisions',v:'Advance decisions: ADRT, DNACPR, ventilation and feeding decisions, preferred place of care [where they are recorded].'},
 {k:'share',c:false,l:'Shared with the team and crisis services',v:'Shared with: [team members]. Services that may see the person in a crisis told about NIV [yes / no].'}
];

const NC_TXT={
 ofN:(i,n)=>`${i} of ${n}`,
 checks:'Published checks',
 /* breathing calculator */
 respLede:'NICE NG42 sets thresholds at which breathing results lead to discussion and possible referral to the respiratory service. Move the values and the switches to see which ones are reached. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>',
 fvcL:'FVC or VC, % predicted',snipL:'SNIP or MIP, cmH2O',spoL:'SpO2 at rest, %',
 fvcO:v=>`${v}% predicted`,snipO:v=>`${v} cmH2O`,spoO:v=>`${v}%`,
 symK:'Symptoms (especially orthopnoea)',sexK:'Sex (for the SNIP threshold)',fallK:'SNIP or MIP fell by more than 10 cmH2O in 3 months',lungK:'Known lung disease',
 yes:'Yes',no:'No',men:'Men',women:'Women',
 gFvc:'FVC or VC',gSnip:'SNIP or MIP',gSpo:'SpO2',
 crit:['FVC or VC below 50% predicted','SNIP or MIP below 40 cmH2O','FVC or VC below 80% predicted, with symptoms'],
 critSnip:{m:'SNIP or MIP below 65 cmH2O (men), with symptoms',f:'SNIP or MIP below 55 cmH2O (women), with symptoms'},
 critFall:'SNIP or MIP falling by more than 10 cmH2O per 3 months',
 critSpo:{n:'SpO2 94% or below: blood gases indicated',y:'SpO2 92% or below with known lung disease: blood gases indicated'},
 reached:'Reached',notReached:'Not reached',
 sumOn:'At these values, a NICE NG42 threshold for discussion and possible referral is reached.',
 sumOff:'At these values, no NICE NG42 threshold for discussion and referral is reached.',
 respK:'NICE NG42 thresholds',respH:'What the numbers reach',
 respMore:'NICE adds that a PaCO2 above 6 kPa calls for urgent referral, to be seen within 1 week. If bulbar or cognitive problems are severe, SpO2 is still measured, but FVC, VC, SNIP and MIP are not done if the interfaces are not suitable for the person. Some pulse oximeters over- or underestimate near borderline values, and overestimation has been reported in people with dark skin. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup>',
 respPt:'These tests show how strong the breathing muscles are. Crossing a line on them is a reason for the team to talk about breathing support, not a verdict.',
 respHook:'Peak cough flow above 160 L/min is needed to clear secretions, and clinicians recommend assistive devices below 270 L/min (Class III). <sup class="c" data-ref="Miller2009AAN" title="Source 332">332</sup>',
 respCap:'This shows how the published NICE NG42 thresholds classify the numbers entered. It does not diagnose, predict how anyone will do, or replace the respiratory team.',
 /* screens */
 scrLede:'Three screens that the research for this guide found validated or widely used in ALS. Pick one and move the example score to see where its published cut-offs fall.',
 scrL:'Example score',scrO:v=>`${v}`,
 cutsK:'Published cut-offs (vertical lines)',ex:v=>`example: ${v}`,
 scrCap:'A screen flags who may need a fuller assessment. It does not diagnose aspiration, lability or depression, and this tool says nothing about any one person.',
 /* visits */
 visRows:[ ['NICE NG42',2],['NICE NG42',3],['EAN 2024',3],['EAN 2024',6] ],
 every:(g,n)=>`${g}: every ${n} months`,
 mo:m=>`${m}`,months:'months from diagnosis',
 visCap:(m,a,b,c,d)=>`Month ${m}: NICE ${a} to ${b} reviews so far, EAN ${c} to ${d}.`,
 visNote:'<div class="kicker">Controversy</div><h4>Every 2 to 3 months, or every 3 to 6?</h4><p>NICE NG42 sets multidisciplinary assessments usually every 2 to 3 months, more or less often depending on symptoms, the rate of progression and the person\'s preference. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup> The EAN 2024 guideline sets reviews "usually every 3–6 months depending on disease progression", naming the ALSFRS-R as the functional assessment. <sup class="c" data-ref="VanDamme2024EAN" title="Source 507">507</sup> Neither gives a separate frequency for BMI: weight is tied to the visit in both.</p><div class="pt"><b>In plain words</b>The UK guideline asks for check-ups a little more often than the European one. Both say the timing should follow how fast things are changing.</div>',
 /* medicines */
 medLede:'Four questions recur for each ALS medicine: which form, when around food or feeds, how it goes in, and what to watch for. Pick a medicine and press Play; each step comes from its label or from enteral-feeding guidance. <sup class="c" data-ref="FDA2026Riluzole,EMA_RilutekSmPC,FDA2026Tiglutik,FDA2020Exservan,FDA2026Radicava,FDA2023Qalsody,Bischoff2022" title="Source 63,163,171,172,176,177,178">63,163,171,172,176,177,178</sup>',
 medCap:'Schematic. Steps as the labels and guidelines describe them, not a local procedure; the meal times shown are an example day.',
 hr:h=>`${h}:00`,dose:'dose',noDose:'no dose',meal:'meal',
 mBefore:'before',mN:m=>`month ${m}`,mPer:'then periodically',mAx:'months on riluzole',
 crush:'crushed at home: 8.53% of the active drug lost',
 shake:'shaken for at least 30 seconds',sec:s=>`${s} s`,
 stomach:'stomach',
 discard:'discard',dayN:d=>`day ${d}`,
 bags:'two bags back to back: 60 min in all',mg30:'30 mg',min:m=>`${m} min`,
 cyc1:'cycle 1',cycL:'later',cyc1T:'14 dosing days, then 14 without',cycLT:'dosing on 10 of 14 days, then 14 without',
 night:'overnight fast',noFood:'no food for 1 h, water allowed',
 waits:[ ['high-fat meal',8],['low-fat meal',4],['250-calorie supplement',2] ],h:n=>`${n} h`,
 water:v=>`${v} mL`,waterMin:v=>`≥${v} mL`,drugN:n=>`drug ${n}`,dose5:'5 mL',espen:'ESPEN',lothian:'NHS Lothian',
 syringe:'the supplied 5 mL syringe, not a teaspoon',
 csfOut:'CSF removed',csfV:'about 10 mL',qal:'Qalsody',qalV:'15 mL',
 bolus:'bolus over 1 to 3 minutes',
 evalB:'evaluate',evalA:'evaluate',noFixed:'no fixed observation time on the label',
 loading:'loading',every28:'every 28 days',
 feed:'feed',drug:'drug',gap:'15–30 min',
 /* liver tests */
 lftUS:'US label',lftEU:'EU SmPC',lftBefore:'before',lftPer:'then periodically',lftAfter:'after year 1',
 lftCap:(m,a,b)=>`Month ${m}: ${a} dated tests on the US schedule, ${b} on the EU schedule.`,
 lftNote:'<div class="kicker">Controversy: the labels differ</div><h4>Monthly for 3 months, then?</h4><p>The US label measures aminotransferases before and during treatment, monitoring for liver injury "every month for the first 3 months of treatment, and periodically thereafter". <sup class="c" data-ref="FDA2026Riluzole" title="Source 177">177</sup> The EU SmPC asks for ALT every month for the first 3 months, every 3 months for the rest of the first year, and periodically after that, and stops riluzole if ALT reaches 5 times the upper limit of normal. <sup class="c" data-ref="EMA_RilutekSmPC" title="Source 163">163</sup></p><div class="hook"><b>Exam hook</b>On the US label about 50% had at least one ALT above the upper limit of normal and 8% above 3 times, with the largest rise within 3 months. <sup class="c" data-ref="FDA2026Riluzole" title="Source 177">177</sup></div><div class="pt"><b>In plain words</b>Riluzole can irritate the liver, mostly early on, so blood tests are done monthly at first. Europe then asks for them every three months during the first year.</div>',
 lftDraw:'Only the US label\'s pre-treatment test is drawn; the EU wording on a baseline test was not part of this guide\'s research.',
 /* gastrostomy */
 pegModes:[ ['espen','ESPEN 2022'],['esge','ESGE 2021'] ],
 pegLbl:{stomach:'stomach',wall:'stomach wall',abd:'abdominal wall',skin:'skin',ib:'internal bumper',eb:'external bumper',turn:'turn',push:'push in, then back',pushE:'push in 2–10 cm',gap:'1–2 cm loose'},
 pegDay:d=>`Day ${d}`,pegH:(d,a)=>`Day ${d}: ${a}`,pegTurn:'turn',pegPush:'push in',pegBoth:'turn, and push in',
 pegHead:'A week after the site has healed',
 pegCap:'Schematic, not to scale. ESPEN gives the distance for the weekly inward movement; the ESGE abstract read for this guide gives the bumper gap.',
 pegNote:{
  espen:'ESPEN 2022: the exit site is checked daily and kept clean and dry, with aseptic care until it heals (usually up to 5 to 7 days). After about one week the tube "should be rotated daily", and moved inwards at least once a week, by at least 2 cm and up to 10 cm. Occlusive dressings are avoided. <sup class="c" data-ref="Bischoff2022" title="Source 63">63</sup>',
  esge:'ESGE 2021 recommends daily mobilisation of the tube (pushing it inward) and keeping the external bumper loose, 1 to 2 cm from the abdominal wall, to reduce the risk of a buried bumper (strong recommendation, low-quality evidence). <sup class="c" data-ref="Gkolfakis2021" title="Source 205">205</sup>'},
 pegCommon:'Controversy: ESPEN pairs daily turning with weekly inward movement, while ESGE asks for daily inward movement. <sup class="c" data-ref="Bischoff2022,Gkolfakis2021" title="Source 63,205">63,205</sup>',
 pegPt:'Moving the tube regularly helps stop the inner disc sinking into the stomach wall, which is called a buried bumper.',
 pegHook:'Buried-bumper warning signs on the ESPEN list: the tube is hard to move, leakage around the site on flushing, frequent pump alarms, abdominal pain, a chronic site infection, or resistance when giving feed or fluids. <sup class="c" data-ref="Bischoff2022" title="Source 63">63</sup>',
 /* oxygen */
 o2Bands:[ [94,98,'--steel','94–98%','Target for most acutely ill adults (BTS-based oxygen policy).'],
           [88,92,'--air','88–92%','Target for people at risk of hypercapnic respiratory failure, neuromuscular disorders among them (BTS-based policy); acceptable in MND unless other pathology is present (MND Association).'] ],
 o2Ax:'SpO2, %',o2Leg:(b,l)=>`${b}: ${l}`,
 o2Cap:'Target bands as published. Not a prescription.',
 o2Note:'<div class="kicker">Hospital admission</div><h4>Why the target is lower</h4><p>A BTS-based oxygen policy names neuromuscular disorders among the groups in whom oxygen may raise carbon dioxide. <sup class="c" data-ref="BTS2017template,ODriscoll2017" title="Source 82,405">82,405</sup> MND Association guidance says supplemental oxygen is used "only with extreme caution", because excess oxygen can cause acidaemic respiratory failure and death, with monitoring by arterial blood gas and the person\'s own NIV used for breathlessness and hypercapnia. Saline nebulisers are driven by air rather than oxygen. <sup class="c" data-ref="MNDA2026acute" title="Source 339">339</sup> In 8 people with neuromuscular disease and diaphragm weakness, low-flow oxygen (0.5 to 2 L/min) raised PaCO2 by a mean 28.2 mmHg. <sup class="c" data-ref="Gay1995" title="Source 196">196</sup></p><div class="hook"><b>Exam hook</b>NICE NG42 itself has no explicit oxygen-caution recommendation: the 88–92% target and the warning come from BTS and the MND Association. <sup class="c" data-ref="NICE2016,BTS2017template,MNDA2026acute" title="Source 82,339,401">82,339,401</sup></div><div class="pt"><b>In plain words</b>When breathing muscles are weak, extra oxygen can let carbon dioxide build up. Hospital teams aim a little lower and use the person\'s own breathing machine.</div>',
 /* myths and documentation */
 mythLede:'Six beliefs that published sources address directly. Choose one to see what the source says.',
 mythK:'Often believed',mythA:'What the source says',
 docLede:'NICE asks that key decisions be shared with everyone involved and that services seeing the person in a crisis know they use NIV. <sup class="c" data-ref="NICE2016" title="Source 401">401</sup> Tick what was assessed and the entry assembles below, with blanks to fill in.',
 docK:'Entry built from the ticked items',docAll:'Tick everything',docNone:'Clear',docEmpty:'Nothing ticked yet.',
 docCap:'No single published nursing documentation checklist for ALS was found. These items are gathered from what NICE, EAN, the MND Association, NHS Lothian and the drug labels say to assess, monitor or record. Your service decides the format.'
};

const NC_CARDS={
 assess:`
  <div class="card"><h4>Falls</h4><ul><li>In a prospective study of 66 people with ALS, 47% of those who walked had fallen by 3 months and 59% by 6 months; among wheelchair users the figures were 18% and 10%.</li><li>Lower-limb strength and fatigue predicted falls. NICE places "mobility and avoiding falls" in the occupational therapy and physiotherapy assessment.</li></ul><p class="stage-cap"><sup class="c" data-ref="Alencar2026,NICE2016" title="Source 10,401">10,401</sup></p></div>
  <div class="card"><h4>Pressure areas</h4><ul><li>Controversy: older small case series described few pressure sores in ALS, but a Taiwanese claims cohort (514 people with ALS, 2056 controls) found a higher risk, adjusted HR 8.82.</li><li>A hospital quality-improvement project measured 6.37 to 12.2 kPa on the nasal bridge under some oronasal masks tightened against leak, and reduced category 2 mask injuries over 1466 NIV days.</li><li>The Braden scale has six subscales (sensory perception, moisture, activity, mobility, friction and shear, nutrition); a cut-off of 16 had 100% sensitivity in two studies, but it has not been validated in ALS.</li><li>For acute settings: "Good skin pressure care is vital", and a person who cannot lie flat may be propped at 30 to 45 degrees or use their own NIV.</li></ul><p class="stage-cap"><sup class="c" data-ref="Chen2018,Rochester2025,Bergstrom1987,MNDA2026acute" title="Source 59,100,339,452">59,100,339,452</sup></p></div>
  <div class="card"><h4>Cognition and behaviour</h4><ul><li>The ECAS takes 15 to 20 minutes and was designed for health care professionals working with people with physical disability. Control-based cut-offs are 77/100 (ALS-specific), 24/36 (non-specific) and 105/136 (total).</li><li>In its development sample, 29% of 48 people had abnormal ALS-specific scores, and 40% of carers reported behaviour change.</li><li>Acute-care guidance describes about 50% of people with MND as cognitively unaffected, about 35% with mild change and up to 15% developing FTD.</li></ul><p class="stage-cap"><sup class="c" data-ref="Abrahams2014,MNDA2026acute" title="Source 2,339">2,339</sup></p></div>
  <div class="card"><h4>The carer</h4><ul><li>The Zarit Burden Interview comes from research on relatives of impaired older adults.</li><li>In one Chinese home-care study of 120 caregiver pairs, the 22-item ZBI averaged 63.63 of 88, classed by the authors as moderate to severe burden; caregiver anxiety predicted burden.</li><li>NICE asks the team to discuss the psychological impact with family and carers and to tell them about carer assessment and respite.</li></ul><p class="stage-cap"><sup class="c" data-ref="Zarit1980,Tang2021,NICE2016" title="Source 401,491,550">401,491,550</sup></p></div>
  <div class="card"><h4>The ALSFRS-R</h4><ul><li>The revision added dyspnoea, orthopnoea and the need for ventilatory support. Scores run from 0 to 48, higher meaning better function.</li><li>Inter-rater reliability ICC 0.93, telephone against in person 0.97; a self-administered version ICC 0.93; online self-rating r = 0.96 against on-site.</li><li>None of these studies tested nurse raters specifically.</li></ul><p class="stage-cap"><sup class="c" data-ref="Cedarbaum1999,Miller2022,Kaufmann2007,Montes2006,Maier2012" title="Source 94,257,312,335,343">94,257,312,335,343</sup></p></div>
  <div class="card"><h4>Where the evidence stops</h4><ul><li>No ALS-specific source was found on nasal-bridge pressure-injury rates under home NIV, on the Braden scale in ALS, or on nurse-led NIV set-up.</li><li>NICE names a specialist nurse in the core team but gives NIV decisions to the team with the respiratory ventilation service.</li><li>This module does not fill these gaps with numbers.</li></ul><p class="stage-cap"><sup class="c" data-ref="NICE2016,Fidalgo2023,Bergstrom1987" title="Source 59,183,401">59,183,401</sup></p></div>`,
 med:`
  <div class="card"><h4>Saliva medicines</h4><ul><li>NICE: consider an antimuscarinic first line, glycopyrronium first line with cognitive impairment "because it has fewer central nervous system side effects", and botulinum toxin A as a specialist option.</li><li>EAN lists amitriptyline, atropine, glycopyrrolate, oxybutynin and scopolamine first line, and says suction devices lack evidence and "may increase the saliva production".</li><li>On the glycopyrrolate oral solution label (a paediatric indication; adult ALS use is off-label), dry mouth, vomiting, constipation, flushing and nasal congestion each affected 30% or more.</li><li>Over-drying can make saliva thick and hard to clear, and NICE asks for saliva treatments to be reviewed then.</li></ul><p class="stage-cap"><sup class="c" data-ref="NICE2016,VanDamme2024EAN,FDA2024Cuvposa,MNDA2026acute" title="Source 173,339,401,507">173,339,401,507</sup></p></div>
  <div class="card"><h4>Breathlessness and the end of life</h4><ul><li>NICE suggests considering opioids for breathlessness and benzodiazepines when anxiety makes it worse (both off-label in 2016), as-needed supplies at home for people on NIV, and anticipatory medicines towards the end of life.</li><li>In a pilot of 6 people with terminal ALS, morphine lowered respiratory rate (42 to 29 per minute) and breathlessness (7.5 to 1.8 out of 10) at 120 minutes, without significant CO2 rise or desaturation.</li><li>Acute-care guidance: sedatives are "used with caution, but not withheld at end of life".</li></ul><p class="stage-cap"><sup class="c" data-ref="NICE2016,Clemens2008,MNDA2026acute" title="Source 115,339,401">115,339,401</sup></p></div>
  <div class="card"><h4>On admission to hospital</h4><ul><li>Drug routes depend on swallowing and on whether an enteral tube is present.</li><li>For a person on riluzole with fever, a full blood count (neutropenia) and liver tests are listed.</li><li>An MND alert wristband with an oxygen warning is among the alert tools described.</li></ul><p class="stage-cap"><sup class="c" data-ref="MNDA2026acute" title="Source 339">339</sup></p></div>`,
 teach:`
  <div class="card"><h4>If the ventilator fails</h4><ul><li>NICE asks for training in NIV use and interfaces, emergency procedures, help at night with removing or replacing the mask, use with wheelchairs, "what to do if the equipment fails", and secretion management.</li><li>The care plan covers device maintenance and 24-hour clinical and technical support; the risk assessment covers battery back-up, a humidifier, and compatibility with eye-gaze equipment.</li><li>No ALS-specific source on mask cleaning schedules or alarm-response teaching was found.</li></ul><p class="stage-cap"><sup class="c" data-ref="NICE2016" title="Source 401">401</sup></p></div>
  <div class="card"><h4>Cough: the published order</h4><ul><li>NICE and EAN: unassisted breath stacking and/or manually assisted cough first; assisted breath stacking with a lung-volume recruitment bag if bulbar function is poor or cough stays ineffective; then a mechanical cough assist device. EAN adds that a suction device may be considered.</li><li>Mechanical insufflation-exsufflation raised peak cough flow by 26% (bulbar) and 28% (non-bulbar), against 11% to 13% for manually assisted cough (Class III; Level C).</li></ul><p class="stage-cap"><sup class="c" data-ref="NICE2016,VanDamme2024EAN,Miller2009AAN" title="Source 332,401,507">332,401,507</sup></p></div>
  <div class="card"><h4>Swallowing safely: the chin tuck</h4><ul><li>In 81 people with ALS studied by videofluoromanometry, a chin tuck resolved aspiration in 13 of 24 people who aspirated, head rotation in 6, and neither in 5.</li><li>A scoping review of 157 MND dysphagia papers found very few that tested whether such strategies work.</li><li>ESPEN 2018 recommends texture changes and postures such as the chin tuck in moderate dysphagia (good-practice point). No ALS evidence on small boluses was found beyond NICE's general advice on posture, seating and texture.</li></ul><p class="stage-cap"><sup class="c" data-ref="Solazzo2011,Waito2017,Burgos2018ESPEN,NICE2016" title="Source 84,401,478,527">84,401,478,527</sup></p></div>
  <div class="card"><h4>Choking and laryngospasm</h4><ul><li>Acute-care guidance asks staff to clear the blockage (saliva, food or fluid), offer palliation for distress, and reassure the person "that death from choking is rare".</li><li>EAN lists laryngospasm triggers (liquid or saliva at the larynx, reflux, smoke, strong smells, emotion, alcohol, cold air, spicy food) and recommends explaining that it is self-limiting.</li><li>No validated ALS-specific choking first-aid protocol was found.</li></ul><p class="stage-cap"><sup class="c" data-ref="MNDA2026acute,VanDamme2024EAN" title="Source 339,507">339,507</sup></p></div>
  <div class="card"><h4>Yes/no codes and eye-gaze</h4><ul><li>Acute-care guidance asks staff to find out the person's yes/no code (any reliable movement, such as a blink), to use yes/no or single-word questions, not to finish the person's sentences, and not to use family as translators unless the person asks.</li><li>NICE and EAN call for low-tech boards and high-tech AAC, referral to a specialised AAC hub for eye-gaze, and ongoing training for carers. The AAN found no controlled studies of these aids (Level U).</li><li>No published source on adapted call bells for weak hands in ALS was found; NICE mentions environmental controls only in general.</li></ul><p class="stage-cap"><sup class="c" data-ref="MNDA2026acute,NICE2016,VanDamme2024EAN,Miller2009AANb" title="Source 333,339,401,507">333,339,401,507</sup></p></div>
  <div class="card"><h4>Energy and secretions</h4><ul><li>In a 28-person randomised trial in MND, three weekly one-hour occupational therapy sessions on energy conservation improved fatigue and occupational performance, but not quality of life.</li><li>NICE suggests humidification, nebulisers and carbocisteine for thick secretions, alongside advice on posture, oral care and suction when drooling is a problem.</li></ul><p class="stage-cap"><sup class="c" data-ref="Fateh2022,NICE2016" title="Source 169,401">169,401</sup></p></div>`,
 doc:`
  <div class="card"><h4>Advance care planning: what NICE lists</h4><ul><li>ADRT, DNACPR, Lasting Power of Attorney, preferred place of death, what the person does not want (for example hospital admission), who will speak for them, and plans for intercurrent illness.</li><li>How the plans will be available when needed, for example on the Summary Care Record, and a review when gastrostomy or NIV is planned.</li><li>EAN adds invasive ventilation, palliative sedation and treatment withdrawal.</li></ul><p class="stage-cap"><sup class="c" data-ref="NICE2016,VanDamme2024EAN" title="Source 401,507">401,507</sup></p></div>
  <div class="card"><h4>On admission</h4><ul><li>"An MND specialist (nurse, neurologist or care centre coordinator) should be alerted within 24 hours."</li><li>Extubation can be difficult, and a high NEWS-type score may be normal for the person.</li><li>In Pennsylvania, 32% of 1748 gastrostomies and 67% of 373 tracheostomies in ALS were placed during emergency admissions. EAN recommends discussing invasive ventilation in advance "to avoid emergency invasive ventilation".</li></ul><p class="stage-cap"><sup class="c" data-ref="MNDA2026acute,Tsou2012,VanDamme2024EAN" title="Source 339,500,507">339,500,507</sup></p></div>
  <div class="card"><h4>The specialist nurse and the team</h4><ul><li>NICE and EAN both name a specialist nurse in the core team.</li><li>A Cochrane review found no randomised trials of multidisciplinary care in MND, with low-quality evidence of fewer hospital admissions.</li><li>Controversy: in all 719 incident cases in Ireland and Northern Ireland, attending the central multidisciplinary clinic was linked to better survival (HR 0.59), and the authors judged it superior to community care supported by a specialist care worker. In New Zealand, unplanned admissions fell after a key-worker role began (before/after audit).</li><li>In a 2025 UK census of 64 MND nurses and therapists, 14% were at medium and 12% at high risk of burnout.</li></ul><p class="stage-cap"><sup class="c" data-ref="NICE2016,VanDamme2024EAN,Ng2009,Rooney2015,Wiseman2026,Chau2025" title="Source 97,397,401,454,507,541">97,397,401,454,507,541</sup></p></div>`
};

inits.nursing=()=>{
  const T=NC_TXT,bg=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
  /* split a label into lines of at most mx characters, at spaces, so any language wraps */
  const wrap=(s,mx)=>{const out=[];let ln='';String(s).split(' ').forEach(w=>{if(ln&&(ln+' '+w).length>mx){out.push(ln);ln=w}else ln=ln?ln+' '+w:w});if(ln)out.push(ln);return out};
  const txt=(x,y,lines,cls,dy=16,sty='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${sty?` style="${sty}"`:''}>${lines.map((l,i)=>`<tspan x="${f1(x)}" dy="${i?dy:0}">${l}</tspan>`).join('')}</text>`;
  const tick=(x,y,c='var(--good)',sw=2.4)=>`<path d="M${f1(x-5)} ${f1(y)} l3.5 4 7 -8" style="fill:none;stroke:${c};stroke-width:${sw};stroke-linecap:round;stroke-linejoin:round"/>`;
  $$('[data-nc-jump]').forEach(b=>b.addEventListener('click',()=>{const el=document.getElementById(b.dataset.ncJump);if(el)el.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})}));

  /* ============ 1a the assessment round ============ */
  const svg=$('#ncSvg'),rg=$('#ncT');
  const P=(cx,cy,r,a)=>[cx+r*Math.sin(a),cy-r*Math.cos(a)];
  function seg(cx,cy,r0,r1,a0,a1){const [x0,y0]=P(cx,cy,r1,a0),[x1,y1]=P(cx,cy,r1,a1),[x2,y2]=P(cx,cy,r0,a1),[x3,y3]=P(cx,cy,r0,a0),lg=a1-a0>Math.PI?1:0;
    return `M${f1(x0)} ${f1(y0)}A${r1} ${r1} 0 ${lg} 1 ${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}A${r0} ${r0} 0 ${lg} 0 ${f1(x3)} ${f1(y3)}Z`}
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const L=N?{cx:200,cy:188,kx:28,ky:400,dy:34}:{cx:196,cy:200,kx:398,ky:46,dy:36};
    const R1=166,R0=100,n=NC_RING.length,p=phaseOf(NC_RING,t),S=NC_RING[p],u=clamp((t-S.from)*n);
    let s=bg;
    NC_RING.forEach((g,i)=>{
      const a0=i*2*Math.PI/n+.022,a1=(i+1)*2*Math.PI/n-.022,am=(a0+a1)/2,cur=i===p,done=i<p;
      if(cur){const pulse=.35+.35*Math.sin(u*Math.PI*8);s+=`<path d="${seg(L.cx,L.cy,R1+3,R1+9,a0,a1)}" style="fill:var(${g.col});opacity:${f1(pulse+.2)}"/>`}
      s+=`<path d="${seg(L.cx,L.cy,R0,R1,a0,a1)}" style="fill:var(${cur||done?g.soft:'--panel-2'});stroke:var(${cur?g.col:'--line'});stroke-width:${cur?3:1.2}"/>`;
      const [lx,ly]=P(L.cx,L.cy,(R0+R1)/2+2,am),k=g.lbl.length,y0=ly+4-k*7,ink=`fill:var(${cur||done?'--ink':'--muted'})`;
      if(done)s+=tick(lx+1,y0-4,'var(--good)');
      else s+=`<text x="${f1(lx)}" y="${f1(y0)}" class="t-sm t-mid" style="font-weight:700;${ink}">${i+1}</text>`;
      s+=txt(lx,y0+14,g.lbl,g.lbl.some(l=>l.length>11)?'t-xs t-mid':'t-sm t-mid',14,`${ink};font-weight:${cur?700:500}`);
    });
    /* the round's progress: a track and a moving dot inside the ring */
    const ang=t*2*Math.PI,rt=R0-12;
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${rt}" style="fill:none;stroke:var(--line);stroke-width:3"/>`;
    if(t>.002){const [ex,ey]=P(L.cx,L.cy,rt,Math.min(ang,2*Math.PI-.001));s+=`<path d="M${L.cx} ${L.cy-rt}A${rt} ${rt} 0 ${ang>Math.PI?1:0} 1 ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--steel);stroke-width:4;stroke-linecap:round"/><circle cx="${f1(ex)}" cy="${f1(ey)}" r="6" style="fill:var(--steel);stroke:var(--panel);stroke-width:2"/>`}
    s+=`<text x="${L.cx}" y="${L.cy-26}" class="t-sm t-mid">${T.ofN(p+1,n)}</text>`;
    s+=txt(L.cx,L.cy+(S.lbl.length>1?-2:6),S.lbl,'t-big t-mid',20);
    /* the checklist for the lit segment */
    s+=`<text x="${L.kx}" y="${L.ky}" class="t-sm" style="letter-spacing:.1em">${T.checks.toUpperCase()}</text>`;
    s+=txt(L.kx,L.ky+26,S.h,'t-big',20);
    const m=S.items.length;
    S.items.forEach((it,k)=>{const y=L.ky+82+k*L.dy,on=u>=(k+1)/(m+1.2);
      s+=`<rect x="${L.kx}" y="${y-13}" width="18" height="18" rx="4" style="fill:${on?`var(${S.soft})`:'var(--panel)'};stroke:var(${on?S.col:'--line'});stroke-width:1.6"/>`;
      if(on)s+=tick(L.kx+9,y-4,`var(${S.col==='--muted'?'--ink':S.col})`,2.2);
      s+=`<text x="${L.kx+28}" y="${y+1}" class="t-lbl" style="opacity:${on?1:.5}">${it}</text>`});
    svg.innerHTML=s;
    setSt(p);$('#ncNote').innerHTML=noteHTML({k:S.k,t:S.h.join(' '),txt:S.txt,pt:S.pt,hook:S.hook});
  }
  const stop=playWire(rg,$('#ncPlay'),draw,22000,UI.replay,'nursing');
  const setSt=stepWire($('#ncSteps'),NC_RING,rg,draw,stop);

  /* ============ 1b breathing measures vs NICE ============ */
  $('#ncRespLede').innerHTML=`<p>${T.respLede}</p>`;$('#ncRespCap').textContent=T.respCap;
  $('#ncFvcL').textContent=T.fvcL;$('#ncSnipL').textContent=T.snipL;$('#ncSpoL').textContent=T.spoL;
  ['Sym','Sex','Fall','Lung'].forEach(k=>{$('#nc'+k+'K').textContent=T[k.toLowerCase()+'K'];$('#nc'+k).setAttribute('aria-label',T[k.toLowerCase()+'K'])});
  const R={sym:'y',sex:'m',fall:'n',lung:'n'};
  toggleRow($('#ncSym'),[ ['y',T.yes],['n',T.no] ],R.sym,v=>{R.sym=v;drawResp()});
  toggleRow($('#ncSex'),[ ['m',T.men],['f',T.women] ],R.sex,v=>{R.sex=v;drawResp()});
  toggleRow($('#ncFall'),[ ['y',T.yes],['n',T.no] ],R.fall,v=>{R.fall=v;drawResp()});
  toggleRow($('#ncLung'),[ ['y',T.yes],['n',T.no] ],R.lung,v=>{R.lung=v;drawResp()});
  ['#ncFvc','#ncSnip','#ncSpo'].forEach(id=>$(id).addEventListener('input',drawResp));
  const rsv=$('#ncRespSvg');
  function gauge(L,y,lbl,val,vtxt,lo,hi,zones,cuts){
    const X=v=>L.x0+L.w*(clamp(v,lo,hi)-lo)/(hi-lo);let s='';
    if(L.n){s+=`<text x="${L.x0}" y="${y-14}" class="t-lbl">${lbl}</text><text x="${L.x0+L.w}" y="${y-14}" class="t-lbl t-end" style="fill:var(--steel)">${vtxt}</text>`}
    else{s+=`<text x="20" y="${y+4}" class="t-lbl">${lbl}</text><text x="20" y="${y+21}" class="t-sm" style="fill:var(--steel);font-weight:700">${vtxt}</text>`}
    s+=`<rect x="${L.x0}" y="${y-6}" width="${L.w}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
    zones.forEach(([a,b,c])=>{if(b>a)s+=`<rect x="${f1(X(a))}" y="${y-6}" width="${f1(X(b)-X(a))}" height="12" style="fill:var(${c})"/>`});
    cuts.forEach(c=>{s+=`<line x1="${f1(X(c))}" x2="${f1(X(c))}" y1="${y-11}" y2="${y+11}" style="stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(c))}" y="${y+25}" class="t-xs t-mid" style="fill:var(--ink)">${c}</text>`});
    [lo,hi].forEach((e,i)=>s+=`<text x="${f1(X(e))}" y="${y+25}" class="t-xs ${i?'t-end':''}">${e}</text>`);
    s+=`<circle cx="${f1(X(val))}" cy="${y}" r="9" style="fill:var(--steel);stroke:var(--panel);stroke-width:2.5"/>`;
    return s}
  function drawResp(){
    const N=vb(rsv,'720 236','400 236');
    const L=N?{n:1,x0:24,w:352}:{n:0,x0:220,w:470};
    const fvc=+$('#ncFvc').value,snip=+$('#ncSnip').value,spo=+$('#ncSpo').value,sym=R.sym==='y',st=R.sex==='m'?65:55,so=R.lung==='y'?92:94;
    $('#ncFvcO').textContent=T.fvcO(fvc);$('#ncSnipO').textContent=T.snipO(snip);$('#ncSpoO').textContent=T.spoO(spo);
    let s=bg;
    s+=gauge(L,46,T.gFvc,fvc,T.fvcO(fvc),0,120,[ [0,50,'--bad-soft'],[50,80,sym?'--warn-soft':'--panel-2'] ],[50,80]);
    s+=gauge(L,122,T.gSnip,snip,T.snipO(snip),0,120,[ [0,40,'--bad-soft'],[40,st,sym?'--warn-soft':'--panel-2'] ],[40,st]);
    s+=gauge(L,198,T.gSpo,spo,T.spoO(spo),85,100,[ [85,so+.5,'--warn-soft'] ],[so]);
    rsv.innerHTML=s;
    const C=[ [T.crit[0],fvc<50],[T.crit[1],snip<40],[T.crit[2],fvc<80&&sym],[T.critSnip[R.sex],snip<st&&sym],[T.critFall,R.fall==='y'] ];
    const any=C.some(c=>c[1]),bg2=spo<=so;
    const li=([l,on])=>`<li><span class="tag ${on?'bad':''}">${on?T.reached:T.notReached}</span><span>${l}</span></li>`;
    $('#ncRespNote').innerHTML=`<div class="kicker">${T.respK}</div><h4>${T.respH}</h4><div class="nc-sum ${any?'on':'off'}">${any?T.sumOn:T.sumOff}</div><ul class="nc-crit">${C.map(li).join('')}${li([T.critSpo[R.lung],bg2])}</ul><p>${T.respMore}</p><div class="pt"><b>${UI.plain}</b>${T.respPt}</div><div class="hook"><b>${UI.hook}</b>${T.respHook}</div>`;
  }

  /* ============ 1c screening scores ============ */
  $('#ncScrLede').textContent=T.scrLede;$('#ncScrL').textContent=T.scrL;$('#ncScrCap').textContent=T.scrCap;
  let scr='eat';const ssv=$('#ncScrSvg'),sr=$('#ncScr');
  function setScr(k){scr=k;const D=NC_SCR[k];sr.min=D.min;sr.max=D.max;sr.value=D.def;drawScr()}
  toggleRow($('#ncScrBtns'),Object.entries(NC_SCR).map(([k,v])=>[k,v.b]),scr,setScr);
  sr.addEventListener('input',drawScr);
  function drawScr(){
    const D=NC_SCR[scr],v=+sr.value,N=NARROW();
    const H=D.means.length?(N?192:186):130;
    vb(ssv,`720 ${H}`,`400 ${H}`);
    const x0=N?24:40,w=N?352:640,X=a=>x0+w*(a-D.min)/(D.max-D.min),ay=86;
    let s=bg;
    s+=`<text x="${x0}" y="24" class="t-sm" style="letter-spacing:.06em">${T.cutsK.toUpperCase()}</text>`;
    D.cuts.forEach((c,i)=>{const nx=D.cuts[i+1]??D.max;s+=`<rect x="${f1(X(c))}" y="${ay-20}" width="${f1(X(nx)-X(c))}" height="20" style="fill:var(${i===D.cuts.length-1?'--bad-soft':'--warn-soft'})"/>`});
    s+=`<line x1="${x0}" x2="${x0+w}" y1="${ay}" y2="${ay}" style="stroke:var(--muted);stroke-width:2"/>`;
    D.cuts.forEach(c=>{s+=`<line x1="${f1(X(c))}" x2="${f1(X(c))}" y1="${ay-30}" y2="${ay+8}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(X(c))}" y="${ay-36}" class="t-lbl t-mid">${c}</text>`});
    D.means.slice().reverse().forEach(([m,l],i)=>{const mx=X(m),ly=ay+54+i*16;
      s+=`<path d="M${f1(mx)} ${ay+2} l-4 7 h8z" style="fill:var(--muted)"/><line x1="${f1(mx)}" x2="${f1(mx)}" y1="${ay+36}" y2="${ly-9}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 2"/>`;
      s+=`<text x="${f1(mx+3)}" y="${ly}" class="t-xs">${l}</text>`});
    s+=`<circle cx="${f1(X(v))}" cy="${ay}" r="9" style="fill:var(--steel);stroke:var(--panel);stroke-width:2.5"/>`;
    const ex=clamp(X(v),x0+30,x0+w-30);
    s+=`<text x="${f1(ex)}" y="${ay+28}" class="t-lbl t-mid" style="fill:var(--steel)">${T.ex(v)}</text>`;
    ssv.innerHTML=s;
    $('#ncScrO').textContent=T.scrO(v);
    let z=0;D.cuts.forEach((c,i)=>{if(v>=c)z=i+1});
    $('#ncScrNote').innerHTML=`<div class="kicker">${D.b}</div><h4>${T.ex(v)}</h4><div class="nc-sum ${z?'on':'off'}">${D.zones[z]}</div><p>${D.txt}</p><div class="hook"><b>${UI.hook}</b>${D.hook}</div>`;
  }

  /* ============ 1d visit intervals, NICE vs EAN ============ */
  const vsv=$('#ncVisSvg'),vr=$('#ncVisT');$('#ncVisNote').innerHTML=T.visNote;
  function drawVis(t){
    const N=vb(vsv,'720 230','400 262'),M=t*12;
    const L=N?{x0:24,w:352,y0:56,dy:50,lab:-14}:{x0:250,w:440,y0:44,dy:40,lab:4};
    const X=m=>L.x0+L.w*m/12;let s=bg;
    const cnt=[];
    T.visRows.forEach(([g,n],i)=>{const y=L.y0+i*L.dy,col=i<2?'--steel':'--warn';
      s+=`<text x="${N?L.x0:20}" y="${y+L.lab}" class="t-sm" style="fill:var(${col});font-weight:700">${T.every(g,n)}</text>`;
      s+=`<line x1="${X(0)}" x2="${X(12)}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:2"/>`;
      let c=0;for(let m=n;m<=12;m+=n){const on=m<=M+1e-6;if(on)c++;
        s+=`<circle cx="${f1(X(m))}" cy="${y}" r="${on?8:6}" style="fill:${on?`var(${col})`:'var(--panel)'};stroke:var(${col});stroke-width:2"/>`}
      cnt.push(c)});
    const ay=L.y0+3*L.dy+34;
    s+=`<line x1="${X(0)}" x2="${X(12)}" y1="${ay-14}" y2="${ay-14}" class="axis"/>`;
    for(let m=0;m<=12;m+=(N?3:1))s+=`<text x="${f1(X(m))}" y="${ay}" class="t-xs t-mid">${T.mo(m)}</text>`;
    s+=`<text x="${f1(X(12))}" y="${ay+16}" class="t-xs t-end">${T.months}</text>`;
    s+=`<line x1="${f1(X(M))}" x2="${f1(X(M))}" y1="${L.y0-18}" y2="${ay-14}" style="stroke:var(--ink);stroke-width:1.5;opacity:.45"/>`;
    vsv.innerHTML=s;
    $('#ncVisCap').textContent=T.visCap(Math.floor(M+1e-6),cnt[1],cnt[0],cnt[3],cnt[2]);
  }
  playWire(vr,$('#ncVisPlay'),drawVis,9000,UI.replay,'nursing');
  $('#ncAssessCards').innerHTML=NC_CARDS.assess;

  /* ============ 2a giving the medicines ============ */
  $('#ncMedLede').innerHTML=`<p>${T.medLede}</p>`;$('#ncMedCap').textContent=T.medCap;
  let med='tab',setMed=()=>{};
  const msv=$('#ncMedSvg'),mr=$('#ncMedT');
  const dayStrip=(u,x,y,w)=>{const hx=h=>x+w*(h-6)/18;let s=`<rect x="${x}" y="${y+20}" width="${w}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
    [9,13,18].forEach(m=>{s+=`<rect x="${f1(hx(m-1))}" y="${y+20}" width="${f1(hx(m+2)-hx(m-1))}" height="12" style="fill:var(--warn-soft);opacity:${f1(ramp(u,0,.3))}"/><rect x="${f1(hx(m-.25))}" y="${y+20}" width="${f1(w*.5/18)}" height="12" style="fill:var(--food)"/>`});
    s+=`<text x="${f1(hx(13.5))}" y="${y+14}" class="t-xs t-mid" style="opacity:${f1(ramp(u,.2,.3))}">${T.noDose}</text>`;
    [7.5,20.5].forEach(d=>{const dy=lerp(y+2,y+26,ease(ramp(u,.3,.7)));
      s+=`<circle cx="${f1(hx(d))}" cy="${f1(dy)}" r="6" style="fill:var(--treat);stroke:var(--panel);stroke-width:2;opacity:${f1(ramp(u,.25,.32))}"/><text x="${f1(hx(d))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700;opacity:${f1(ramp(u,.7,.8))}">${T.dose}</text>`});
    [6,12,18,24].forEach((h,i)=>s+=`<text x="${f1(hx(h))}" y="${y+50}" class="t-xs ${i===0?'':i===3?'t-end':'t-mid'}">${T.hr(h)}</text>`);
    s+=`<text x="${f1(hx(9))}" y="${y+50}" class="t-xs t-mid" style="fill:var(--food)">${T.meal}</text>`;return s};
  const lftMini=(u,x,y,w)=>{const mx=m=>x+16+(w-32)*m/6;let s=`<text x="${x}" y="${y+10}" class="t-xs">${T.mAx}</text><line x1="${f1(mx(0))}" x2="${f1(mx(3))}" y1="${y+28}" y2="${y+28}" style="stroke:var(--muted);stroke-width:2"/>`;
    [0,1,2,3].forEach((m,k)=>{const on=u>k/5;s+=`<circle cx="${f1(mx(m))}" cy="${y+28}" r="7" style="fill:${on?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:2"/><text x="${f1(mx(m))}" y="${y+50}" class="t-xs t-mid">${m?T.mN(m):T.mBefore}</text>`});
    const o=ramp(u,.78,.9);s+=`<line x1="${f1(mx(3.3))}" x2="${f1(mx(6))}" y1="${y+28}" y2="${y+28}" style="stroke:var(--treat);stroke-width:2.5;stroke-dasharray:5 5;opacity:${f1(o)}"/><text x="${f1(mx(6))}" y="${y+50}" class="t-xs t-end" style="opacity:${f1(o)}">${T.mPer}</text>`;return s};
  const crush=(u,x,y,w)=>{const bw=w*.92,k=1-.0853,e=ease(ramp(u,.15,.8));
    return `<rect x="${x}" y="${y+12}" width="${f1(bw*k)}" height="18" rx="4" style="fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.5"/><rect x="${f1(x+bw*k+2)}" y="${f1(y+12+e*14)}" width="${f1(bw*.0853)}" height="18" rx="3" style="fill:var(--bad);opacity:${f1(1-.45*e)}"/><text x="${x}" y="${y+52}" class="t-sm" style="opacity:${f1(ramp(u,.5,.7))}">${T.crush}</text>`};
  const lines=(u,x,y,w,st)=>st.lines.map((l,k)=>{const o=ramp(u,k*.22,k*.22+.2);return `<g style="opacity:${f1(o)}"><circle cx="${x+6}" cy="${y+10+k*19}" r="4" style="fill:var(--treat)"/><text x="${x+18}" y="${y+14+k*19}" class="t-sm" style="fill:var(--ink)">${l}</text></g>`}).join('');
  const shake=(u,x,y,w)=>{const a=u>0&&u<1?Math.sin(u*Math.PI*14)*14:0;
    return `<g transform="translate(${x+22} ${y+30}) rotate(${f1(a)})"><rect x="-11" y="-22" width="22" height="40" rx="5" style="fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.6"/><rect x="-7" y="-28" width="14" height="7" rx="2" style="fill:var(--treat)"/></g>`+
      `<text x="${x+62}" y="${y+16}" class="t-sm" style="fill:var(--ink)">${T.shake}</text><rect x="${x+62}" y="${y+24}" width="${w-72}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${x+62}" y="${y+24}" width="${f1((w-72)*ramp(u,0,.85))}" height="10" rx="5" style="fill:var(--treat)"/><text x="${x+62}" y="${y+50}" class="t-xs">${T.sec(0)}</text><text x="${x+w-10}" y="${y+50}" class="t-xs t-end">${T.sec(30)}</text>`};
  const route=(u,x,y,w,st)=>{const x1=x+46,x2=x+w-44,dx=lerp(x1,x2,ease(ramp(u,.1,.85)));
    return `<rect x="${x}" y="${y+18}" width="46" height="20" rx="4" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${x+4}" y="${y+22}" width="${f1(36*(1-ramp(u,.1,.85)))}" height="12" style="fill:var(--treat-soft)"/>`+
      `<line x1="${x1}" x2="${x2}" y1="${y+28}" y2="${y+28}" style="stroke:var(--muted);stroke-width:5;stroke-linecap:round"/><circle cx="${f1(dx)}" cy="${y+28}" r="5" style="fill:var(--treat)"/>`+
      `<ellipse cx="${x+w-22}" cy="${y+28}" rx="22" ry="17" style="fill:var(--food-soft);stroke:var(--food);stroke-width:1.5"/><text x="${f1((x1+x2)/2)}" y="${y+14}" class="t-xs t-mid">${st.lbl}</text><text x="${x+w-22}" y="${y+56}" class="t-xs t-mid">${T.stomach}</text>`};
  const discard=(u,x,y,w)=>{const cw=Math.min(20,(w-96)/15),c=Math.floor(ramp(u,0,.85)*15+1e-6);let s='';
    for(let i=0;i<15;i++)s+=`<rect x="${f1(x+i*cw)}" y="${y+14}" width="${f1(cw-3)}" height="18" rx="3" style="fill:${i<c?'var(--treat-soft)':'var(--panel)'};stroke:var(${i<c?'--treat':'--line'});stroke-width:1.2"/>`;
    s+=`<text x="${x}" y="${y+48}" class="t-xs">${T.dayN(1)}</text><text x="${f1(x+15*cw-3)}" y="${y+48}" class="t-xs t-end">${T.dayN(15)}</text>`;
    s+=`<text x="${f1(x+15*cw+8)}" y="${y+28}" class="t-lbl" style="fill:var(--bad);opacity:${c>=15?1:0}">${T.discard}</text>`;return s};
  const tongue=(u,x,y,w,st,mode)=>{const cx=x+80,fy=mode==='place'?lerp(y-2,y+25,ease(ramp(u,0,.7))):y+25,fo=mode==='place'?1:1-ramp(u,.1,.9),fw=mode==='place'?52:52*(1-.5*ramp(u,.1,.9));
    let s=`<path d="M${x+6} ${y+54} Q${cx} ${y+6} ${x+154} ${y+54}Z" style="fill:var(--muscle);stroke:var(--muscle-line);stroke-width:1.5"/>`;
    s+=`<rect x="${f1(cx-fw/2)}" y="${f1(fy)}" width="${f1(fw)}" height="6" rx="2" style="fill:var(--treat);opacity:${f1(fo)}"/>`;
    st.lines.forEach((l,k)=>s+=`<text x="${x+176}" y="${y+14+k*18}" class="t-xs" style="fill:var(--ink);opacity:${f1(ramp(u,k*.2,k*.2+.2))}">${l}</text>`);return s};
  const bags=(u,x,y,w)=>{let s='';[0,1].forEach(b=>{const bx=x+6+b*42,lv=1-ramp(u,b*.5,b*.5+.5);
      s+=`<rect x="${bx}" y="${y+4}" width="30" height="38" rx="7" style="fill:var(--panel);stroke:var(--treat);stroke-width:1.5"/><rect x="${bx+3}" y="${f1(y+7+32*(1-lv))}" width="24" height="${f1(32*lv)}" rx="4" style="fill:var(--treat-soft)"/><text x="${bx+15}" y="${y+54}" class="t-xs t-mid">${T.mg30}</text>`});
    const ax=x+100,aw=w-112;s+=`<text x="${ax}" y="${y+12}" class="t-xs" style="fill:var(--ink)">${T.bags}</text><rect x="${ax}" y="${y+20}" width="${aw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${ax}" y="${y+20}" width="${f1(aw*u)}" height="10" rx="5" style="fill:var(--treat)"/>`;
    [0,30,60].forEach((m,i)=>s+=`<text x="${f1(ax+aw*m/60)}" y="${y+46}" class="t-xs ${i===0?'':i===2?'t-end':'t-mid'}">${T.min(m)}</text>`);return s};
  const cycle=(u,x,y,w)=>{const lx=60,cw=(w-lx)/28,d=Math.floor(ramp(u,0,.9)*28+1e-6);let s='';
    [ [T.cyc1,T.cyc1T,i=>i<14],[T.cycL,T.cycLT,i=>i<10] ].forEach(([lb,lt,on],r)=>{const ry=y+r*31;
      s+=`<text x="${x}" y="${ry+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${lb}</text>`;
      for(let i=0;i<28;i++){const o=on(i),seen=i<d;s+=`<rect x="${f1(x+lx+i*cw)}" y="${ry}" width="${f1(cw-1.5)}" height="12" rx="2" style="fill:${o?'var(--treat)':'var(--panel)'};stroke:var(${o?'--treat':'--line'});opacity:${seen?1:.25}"/>`}
      if(r===1)s+=`<rect x="${f1(x+lx-1)}" y="${ry-1}" width="${f1(cw*14)}" height="14" rx="3" style="fill:none;stroke:var(--treat);stroke-width:1;stroke-dasharray:3 2;opacity:${f1(ramp(u,.3,.4))}"/>`;
      s+=`<text x="${x+lx}" y="${ry+22}" class="t-xs">${lt}</text>`});return s};
  const fast=(u,x,y,w)=>{const hx=h=>x+w*(h+10)/12,c=lerp(-10,2,u);
    let s=`<rect x="${x}" y="${y+22}" width="${w}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(hx(-10))}" y="${y+22}" width="${f1(hx(0)-hx(-10))}" height="12" rx="6" style="fill:var(--air-soft);stroke:var(--air)"/><rect x="${f1(hx(0))}" y="${y+22}" width="${f1(hx(1)-hx(0))}" height="12" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
    s+=`<text x="${f1(hx(-5))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--air)">${T.night}</text><circle cx="${f1(hx(0))}" cy="${y+28}" r="7" style="fill:var(--treat);stroke:var(--panel);stroke-width:2;opacity:${u>.5?1:.3}"/><text x="${f1(hx(0))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700">${T.dose}</text>`;
    s+=`<text x="${x+w}" y="${y+52}" class="t-xs t-end" style="fill:var(--warn)">${T.noFood}</text><line x1="${f1(hx(c))}" x2="${f1(hx(c))}" y1="${y+18}" y2="${y+38}" style="stroke:var(--ink);stroke-width:2"/>`;return s};
  const waits=(u,x,y,w)=>T.waits.map(([l,h],k)=>{const ry=y+4+k*18,bw=(w-186)*h/8*ease(ramp(u,k*.2,k*.2+.4));
    return `<text x="${x}" y="${ry+9}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${x+136}" y="${ry}" width="${f1(bw)}" height="11" rx="4" style="fill:var(--warn)"/><text x="${f1(x+142+bw)}" y="${ry+9}" class="t-xs">${T.h(h)}</text>`}).join('');
  const blocks=(u,x,y,list)=>{let s='',cx=x;const n=list.length;list.forEach(([kind,lbl,bw],i)=>{const o=ramp(u,i/n*.9,i/n*.9+.12);
      s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="${f1(cx)}" y="${y}" width="${bw-3}" height="20" rx="4" style="fill:var(${kind==='w'?'--air-soft':'--treat-soft'});stroke:var(${kind==='w'?'--air':'--treat'});stroke-width:1.2"/><text x="${f1(cx+(bw-3)/2)}" y="${y+14}" class="t-xs t-mid" style="fill:var(--ink)">${lbl}</text></g>`;cx+=bw});return s};
  const flush=(u,x,y,w)=>`<text x="${x}" y="${y+18}" class="t-xs" style="fill:var(--ink);font-weight:700">${T.espen}</text>`+blocks(u,x+72,y+4,[ ['w',T.water(30),60],['d',T.drugN(1),52],['w',T.water(30),60],['d',T.drugN(2),52],['w',T.water(30),60] ])+
      `<text x="${x}" y="${y+46}" class="t-xs" style="fill:var(--ink);font-weight:700">${T.lothian}</text>`+blocks(u,x+72,y+32,[ ['w',T.waterMin(30),60],['d',T.drugN(1),52],['w',T.waterMin(5),34],['d',T.drugN(2),52],['w',T.waterMin(30),60] ]);
  const flushOne=(u,x,y,w)=>blocks(u,x,y+8,[ ['w',T.waterMin(30),70],['d',T.dose5,56],['w',T.waterMin(30),70] ])+`<text x="${x}" y="${y+48}" class="t-xs">${T.syringe}</text>`;
  const csf=(u,x,y,w)=>{const bx=x+92,bw=w-170;let s='';
    [ [T.csfOut,T.csfV,10,'--air',ramp(u,0,.8)],[T.qal,T.qalV,15,'--treat',ramp(u,.85,1)] ].forEach(([l,vl,v,c,o],r)=>{const ry=y+8+r*24,ww=bw*v/15*o;
      s+=`<text x="${x}" y="${ry+10}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${bx}" y="${ry}" width="${bw}" height="13" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${ry}" width="${f1(ww)}" height="13" rx="4" style="fill:var(${c})"/><text x="${bx+bw+6}" y="${ry+10}" class="t-xs" style="opacity:${f1(o>0?1:.3)}">${vl}</text>`});return s};
  const bolus=(u,x,y,w)=>{const e=ramp(u,.1,.9),ax=x+150,aw=w-160;
    let s=`<rect x="${x}" y="${y+14}" width="110" height="22" rx="4" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(x+3+104*e)}" y="${y+17}" width="${f1(104*(1-e))}" height="16" style="fill:var(--treat-soft)"/><rect x="${f1(x-14+104*e)}" y="${y+12}" width="5" height="26" style="fill:var(--ink)"/><line x1="${x+110}" x2="${x+134}" y1="${y+25}" y2="${y+25}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    s+=`<text x="${ax}" y="${y+12}" class="t-xs" style="fill:var(--ink)">${T.bolus}</text><rect x="${ax}" y="${y+20}" width="${aw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${f1(ax+aw/3)}" y="${y+20}" width="${f1(aw*2/3)}" height="10" style="fill:var(--treat-soft);stroke:var(--treat)"/><line x1="${f1(ax+aw*e)}" x2="${f1(ax+aw*e)}" y1="${y+16}" y2="${y+34}" style="stroke:var(--ink);stroke-width:2"/>`;
    [0,1,2,3].forEach((m,i)=>s+=`<text x="${f1(ax+aw*m/3)}" y="${y+46}" class="t-xs ${i===0?'':i===3?'t-end':'t-mid'}">${T.min(m)}</text>`);return s};
  const evalT=(u,x,y,w)=>{const p=[x+24,x+100,x+176];
    let s=`<line x1="${p[0]}" x2="${p[2]}" y1="${y+26}" y2="${y+26}" style="stroke:var(--muted);stroke-width:2"/><line x1="${p[2]}" x2="${x+w}" y1="${y+26}" y2="${y+26}" style="stroke:var(--muted);stroke-width:2;stroke-dasharray:3 5;opacity:${f1(ramp(u,.6,.8))}"/>`;
    [ [p[0],T.evalB,'--steel',0],[p[1],T.dose,'--treat',.25],[p[2],T.evalA,'--steel',.5] ].forEach(([px,l,c,a])=>{const o=ramp(u,a,a+.15);s+=`<circle cx="${px}" cy="${y+26}" r="7" style="fill:var(${c});opacity:${f1(.2+.8*o)}"/><text x="${px}" y="${y+14}" class="t-xs t-mid" style="fill:var(${c});font-weight:700">${l}</text>`});
    s+=`<text x="${x}" y="${y+50}" class="t-xs" style="fill:var(--ink);opacity:${f1(ramp(u,.6,.8))}">${T.noFixed}</text>`;return s};
  const tofSched=(u,x,y,w)=>{const dx=d=>x+14+(w-28)*d/112,c=u*112;
    let s=`<line x1="${f1(dx(0))}" x2="${f1(dx(112))}" y1="${y+26}" y2="${y+26}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<text x="${f1(dx(14))}" y="${y+12}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700">${T.loading}</text><text x="${f1(dx(84))}" y="${y+12}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700">${T.every28}</text>`;
    [0,14,28,56,84,112].forEach((d,i)=>{const on=c>=d-1e-6;s+=`<circle cx="${f1(dx(d))}" cy="${y+26}" r="7" style="fill:${on?(i<3?'var(--treat)':'var(--treat-soft)'):'var(--panel)'};stroke:var(--treat);stroke-width:2"/><text x="${f1(dx(d))}" y="${y+48}" class="t-xs t-mid">${T.dayN(d)}</text>`});return s};
  const empty=(u,x,y,w)=>{const mx=m=>x+w*(m+60)/120,c=lerp(-60,60,u);
    let s=`<rect x="${x}" y="${y+22}" width="${w}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
    [ [-60,-30,1],[-30,-15,.4],[15,30,.4],[30,60,1] ].forEach(([a,b,o])=>{const bb=Math.min(b,c);if(bb>a)s+=`<rect x="${f1(mx(a))}" y="${y+22}" width="${f1(mx(bb)-mx(a))}" height="12" style="fill:var(--food);opacity:${o}"/>`});
    s+=`<circle cx="${f1(mx(0))}" cy="${y+28}" r="7" style="fill:var(--treat);stroke:var(--panel);stroke-width:2;opacity:${c>=0?1:.3}"/>`;
    s+=`<text x="${f1(mx(-45))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--food);font-weight:700">${T.feed}</text><text x="${f1(mx(0))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700">${T.drug}</text><text x="${f1(mx(45))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--food);font-weight:700">${T.feed}</text>`;
    s+=`<text x="${f1(mx(-22.5))}" y="${y+50}" class="t-xs t-mid">${T.gap}</text><text x="${f1(mx(22.5))}" y="${y+50}" class="t-xs t-mid">${T.gap}</text>`;return s};
  const G={day:dayStrip,lft:lftMini,crush,lines,shake,route,discard,tongue:(u,x,y,w,st)=>tongue(u,x,y,w,st,'place'),dissolve:(u,x,y,w,st)=>tongue(u,x,y,w,st,'dissolve'),bags,cycle,fast,waits,flushOne,flush,csf,bolus,evalT,tofSched,empty};
  function drawMed(t){
    const M=NC_MEDS[med],n=M.steps.length,N=NARROW();
    const rowH=N?106:Math.min(82,360/n);
    vb(msv,'720 400',`400 ${30+n*106}`);
    const p=phaseOf(M.steps,t);let s=bg;
    M.steps.forEach((st,i)=>{
      const u=i===p?clamp((t-st.from)*n):1,y=16+i*rowH,cur=i===p,done=i<p;
      s+=`<g style="opacity:${i>p?.3:1}">`;
      if(cur)s+=`<rect x="8" y="${f1(y)}" width="${N?384:704}" height="${f1(rowH-6)}" rx="10" style="fill:var(--treat-soft);opacity:.6"/>`;
      const bx=N?28:30,by=N?y+20:y+(rowH-6)/2;
      s+=`<circle cx="${bx}" cy="${f1(by)}" r="13" style="fill:${done?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:2"/>`;
      s+=done?tick(bx,by-1,'var(--panel)',2.6):`<text x="${bx}" y="${f1(by+4)}" class="t-sm t-mid" style="fill:var(--treat);font-weight:700">${i+1}</text>`;
      const tl=wrap(st.t,N?34:21);
      s+=txt(bx+22,by+5-(tl.length-1)*8,tl,'t-lbl',16);
      const gx=N?22:262,gy=N?y+40:y+(rowH-6)/2-28,gw=N?356:440;
      s+=G[st.g](u,gx,gy,gw,st);
      s+='</g>'});
    msv.innerHTML=s;
    setMed(p);const S=M.steps[p];
    $('#ncMedNote').innerHTML=noteHTML({k:M.n,t:S.t,txt:S.d,pt:M.pt,hook:M.hook});
  }
  const stopMed=playWire(mr,$('#ncMedPlay'),drawMed,16000,UI.replay,'nursing');
  function useMed(k){med=k;stopMed();const M=NC_MEDS[k],n=M.steps.length;
    M.steps.forEach((s,i)=>{s.from=i/n;s.at=i/n+.45/n});
    const old=$('#ncMedSteps'),nw=old.cloneNode(false);old.replaceWith(nw);setMed=stepWire(nw,M.steps,mr,drawMed,stopMed);
    mr.value=M.steps[0].at;drawMed(+mr.value)}
  toggleRow($('#ncMedBtns'),Object.entries(NC_MEDS).map(([k,v])=>[k,v.b]),med,useMed);

  /* ============ 2b liver tests, US vs EU ============ */
  const lsv=$('#ncLftSvg'),lr=$('#ncLftT');$('#ncLftNote').innerHTML=T.lftNote;
  const LFT=[ [T.lftUS,[0,1,2,3],3],[T.lftEU,[1,2,3,6,9,12],12] ];
  function drawLft(t){
    const N=vb(lsv,'720 210','400 204'),M=t*15;
    const L=N?{x0:24,w:352,y0:62,dy:66,lab:-20}:{x0:200,w:490,y0:56,dy:60,lab:4};
    const X=m=>L.x0+L.w*m/15;let s=bg,cnt=[];
    LFT.forEach(([lb,ds,last],r)=>{const y=L.y0+r*L.dy;
      s+=`<text x="${N?L.x0:20}" y="${y+L.lab}" class="t-lbl">${lb}</text>`;
      s+=`<line x1="${X(0)}" x2="${X(last)}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:2"/><line x1="${f1(X(last+.4))}" x2="${X(15)}" y1="${y}" y2="${y}" style="stroke:var(--treat);stroke-width:2.5;stroke-dasharray:5 5"/>`;
      s+=`<text x="${X(15)}" y="${y-12}" class="t-xs t-end" style="fill:var(--treat)">${T.lftPer}</text>`;
      let c=0;ds.forEach(m=>{const on=m<=M+1e-6;if(on)c++;s+=`<circle cx="${f1(X(m))}" cy="${y}" r="${on?8:6}" style="fill:${on?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:2"/>`;
        if(m===0)s+=`<text x="${f1(X(0))}" y="${y+22}" class="t-xs t-mid">${T.lftBefore}</text>`});
      cnt.push(c)});
    const ay=L.y0+L.dy+46;
    s+=`<line x1="${X(0)}" x2="${X(15)}" y1="${ay-14}" y2="${ay-14}" class="axis"/>`;
    for(let m=0;m<=12;m+=(N?3:1))s+=`<text x="${f1(X(m))}" y="${ay}" class="t-xs t-mid">${T.mo(m)}</text>`;
    s+=`<rect x="${f1(X(12.3))}" y="${ay-12}" width="${f1(X(15)-X(12.3))}" height="4" style="fill:var(--treat-soft)"/><text x="${X(15)}" y="${ay+16}" class="t-xs t-end">${T.lftAfter}</text><text x="${X(0)}" y="${ay+16}" class="t-xs">${T.mAx}</text>`;
    s+=`<line x1="${f1(X(M))}" x2="${f1(X(M))}" y1="${L.y0-24}" y2="${ay-14}" style="stroke:var(--ink);stroke-width:1.5;opacity:.45"/>`;
    lsv.innerHTML=s;
    $('#ncLftCap').textContent=T.lftCap(Math.floor(M+1e-6),cnt[0],cnt[1])+' '+T.lftDraw;
  }
  playWire(lr,$('#ncLftPlay'),drawLft,9000,UI.replay,'nursing');
  $('#ncMedCards').innerHTML=NC_CARDS.med;

  /* ============ 3a gastrostomy care, ESPEN vs ESGE ============ */
  let peg='espen';const psv=$('#ncPegSvg'),pr=$('#ncPegT');$('#ncPegCap').textContent=T.pegCap;
  const PL=T.pegLbl;
  function pegActs(d){return peg==='espen'?{turn:true,push:d===6}:{turn:false,push:true}}
  function drawPeg(t){
    const N=vb(psv,'720 300','400 520');
    const ox=N?20:24,oy=N?36:44,lx=N?24:430,ly=N?306:54,ldy=N?30:33,lw=N?352:266;
    const d=Math.min(6,Math.floor(t*7)),u=clamp(t*7-d),A=pegActs(d);
    const dx=A.push?-26*bump(u,.05,.55):0,rot=A.turn?ramp(u,A.push?.55:.1,A.push?.95:.8):0,gap=peg==='esge'?18:10;
    let s=bg;
    s+=`<text x="${ox}" y="${oy-16}" class="t-sm" style="letter-spacing:.06em">${T.pegHead.toUpperCase()}</text>`;
    s+=`<g transform="translate(${ox} ${oy})">`;
    s+=`<rect x="0" y="20" width="120" height="190" style="fill:var(--food-soft)"/><rect x="120" y="20" width="20" height="190" style="fill:var(--muscle)"/><rect x="140" y="20" width="70" height="190" style="fill:var(--cell)"/><rect x="210" y="20" width="4" height="190" style="fill:var(--muscle-line)"/>`;
    s+=`<text x="10" y="40" class="t-xs">${PL.stomach}</text><text x="175" y="14" class="t-xs t-mid">${PL.abd}</text><text x="128" y="226" class="t-xs t-mid">${PL.wall}</text><text x="214" y="226" class="t-xs t-mid">${PL.skin}</text>`;
    s+=`<rect x="${f1(60+dx)}" y="108" width="${f1(300-dx)}" height="14" rx="3" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.5"/>`;
    s+=`<rect x="${f1(100+dx)}" y="80" width="14" height="70" rx="7" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:2"/><text x="8" y="66" class="t-xs">${PL.ib}</text><path d="M60 70 L102 82" style="stroke:var(--muted);stroke-width:1"/>`;
    s+=`<rect x="${214+gap}" y="90" width="12" height="50" rx="4" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:2"/><text x="228" y="80" class="t-xs">${PL.eb}</text>`;
    if(peg==='esge')s+=`<path d="M214 152 v6 h${gap} v-6" style="fill:none;stroke:var(--ink);stroke-width:1.2"/><text x="216" y="172" class="t-xs" style="fill:var(--ink)">${PL.gap}</text>`;
    if(A.push){const o=bump(u,.02,.6);s+=`<g style="opacity:${f1(o)}"><path d="M340 180 h-60" style="stroke:var(--treat);stroke-width:2.5;fill:none" marker-end="url(#ncArr)"/><text x="350" y="198" class="t-xs t-end" style="fill:var(--treat);font-weight:700">${peg==='espen'?PL.pushE:PL.push}</text></g>`}
    if(A.turn){const a=Math.max(.15,rot*1.8*Math.PI),cx=300,cy=115,rx=9,ry=24,ex=cx+rx*Math.sin(a),ey=cy-ry*Math.cos(a);
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:none;stroke:var(--treat);stroke-width:1.2;stroke-dasharray:3 3;opacity:.45"/>`;
      if(rot>0)s+=`<path d="M${cx} ${cy-ry} A${rx} ${ry} 0 ${a>Math.PI?1:0} 1 ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--treat);stroke-width:2.5" marker-end="url(#ncArr)"/>`;
      s+=`<text x="${cx+16}" y="${cy-14}" class="t-xs" style="fill:var(--treat);font-weight:700">${PL.turn}</text>`}
    s+='</g>';
    s=s.replace(bg,bg+`<defs>${marker('ncArr','var(--treat)')}</defs>`);
    for(let i=0;i<7;i++){const y=ly+i*ldy,a=pegActs(i),on=i===d,past=i<d;
      if(on)s+=`<rect x="${lx-8}" y="${y-18}" width="${lw+16}" height="${ldy-4}" rx="8" style="fill:var(--treat-soft)"/>`;
      s+=`<text x="${lx}" y="${y}" class="t-lbl" style="opacity:${on||past?1:.55}">${T.pegDay(i+1)}</text>`;
      s+=`<text x="${lx+lw}" y="${y}" class="t-sm t-end" style="fill:var(${on?'--treat':'--muted'});font-weight:${on?700:500}">${a.turn&&a.push?T.pegBoth:a.turn?T.pegTurn:T.pegPush}</text>`;
      if(past)s+=tick(lx+lw*.45,y-5,'var(--good)')}
    psv.innerHTML=s;
    $('#ncPegNote').innerHTML=`<div class="kicker">${T.pegModes.find(m=>m[0]===peg)[1]}</div><h4>${T.pegH(d+1,A.turn&&A.push?T.pegBoth:A.turn?T.pegTurn:T.pegPush)}</h4><p>${T.pegNote[peg]}</p><p>${T.pegCommon}</p><div class="hook"><b>${UI.hook}</b>${T.pegHook}</div><div class="pt"><b>${UI.plain}</b>${T.pegPt}</div>`;
  }
  const stopPeg=playWire(pr,$('#ncPegPlay'),drawPeg,14000,UI.replay,'nursing');
  toggleRow($('#ncPegBtns'),T.pegModes,peg,v=>{peg=v;stopPeg();drawPeg(+pr.value)});

  /* ============ 3b oxygen targets ============ */
  const osv=$('#ncO2Svg');$('#ncO2Note').innerHTML=T.o2Note;$('#ncO2Cap').textContent=T.o2Cap;
  function drawO2(){
    const N=NARROW(),x0=N?24:40,w=N?352:640,X=v=>x0+w*(v-80)/20,ay=84,mx=N?50:92;
    const leg=T.o2Bands.map(b=>wrap(T.o2Leg(b[3],b[4]),mx));let hh=ay+44;leg.forEach(l=>hh+=l.length*15+10);
    vb(osv,`720 ${hh}`,`400 ${hh}`);
    let s=bg+`<text x="${x0}" y="26" class="t-sm" style="letter-spacing:.06em">${T.o2Ax}</text>`;
    T.o2Bands.forEach(([a,b,c,lb])=>{s+=`<rect x="${f1(X(a))}" y="${ay-30}" width="${f1(X(b)-X(a))}" height="30" rx="4" style="fill:var(${c}-soft);stroke:var(${c});stroke-width:1.5"/><text x="${f1((X(a)+X(b))/2)}" y="${ay-11}" class="t-sm t-mid" style="fill:var(${c});font-weight:700">${lb}</text>`});
    s+=`<line x1="${x0}" x2="${x0+w}" y1="${ay}" y2="${ay}" style="stroke:var(--muted);stroke-width:2"/>`;
    for(let v=80;v<=100;v+=2)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ay}" y2="${ay+5}" style="stroke:var(--muted)"/><text x="${f1(X(v))}" y="${ay+18}" class="t-xs t-mid">${v}</text>`;
    let y=ay+44;T.o2Bands.forEach(([a,b,c,lb],i)=>{s+=`<rect x="${x0}" y="${y-10}" width="12" height="12" rx="2" style="fill:var(${c}-soft);stroke:var(${c})"/>`+txt(x0+20,y,leg[i],'t-sm',15,'fill:var(--ink)');y+=leg[i].length*15+10});
    osv.innerHTML=s;
  }

  /* ============ 3c misunderstandings ============ */
  $('#ncMythLede').textContent=T.mythLede;let myth=0;
  $('#ncMyths').innerHTML=NC_MYTHS.map((m,i)=>`<button class="nc-q" data-nm="${i}" aria-pressed="${i===myth}"><span class="myth">${T.mythK}</span><b>${m.m}</b></button>`).join('');
  function renderMyth(){$$('#ncMyths [data-nm]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.nm===myth));const M=NC_MYTHS[myth];
    $('#ncMythNote').innerHTML=`<div class="kicker">${T.mythA}</div><h4>${M.m}</h4><p>${M.a}</p>`}
  $('#ncMyths').addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;myth=+b.dataset.nm;renderMyth()});
  renderMyth();
  $('#ncTeachCards').innerHTML=NC_CARDS.teach;

  /* ============ 4 the note builder ============ */
  $('#ncDocLede').innerHTML=`<p>${T.docLede}</p>`;$('#ncDocK').textContent=T.docK;$('#ncDocCap').textContent=T.docCap;$('#ncDocAll').textContent=T.docAll;$('#ncDocNone').textContent=T.docNone;
  const ds={};NC_DOC.forEach(f=>ds[f.k]=f.c);
  function renderDoc(){
    $('#ncDocFields').innerHTML=NC_DOC.map(f=>`<label><input type="checkbox" data-nd="${f.k}" ${ds[f.k]?'checked':''}><span>${f.l}</span></label>`).join('');
    const out=NC_DOC.filter(f=>ds[f.k]).map(f=>f.v);$('#ncDocOut').textContent=out.length?out.join('\n\n'):T.docEmpty}
  $('#ncDocFields').addEventListener('change',e=>{const i=e.target.closest('[data-nd]');if(!i)return;ds[i.dataset.nd]=i.checked;renderDoc()});
  $('#ncDocAll').onclick=()=>{NC_DOC.forEach(f=>ds[f.k]=true);renderDoc()};
  $('#ncDocNone').onclick=()=>{NC_DOC.forEach(f=>ds[f.k]=false);renderDoc()};
  renderDoc();
  $('#ncDocCards').innerHTML=NC_CARDS.doc;

  /* ---- first paint, and redraws when the layout flips ---- */
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawResp();drawScr();drawO2()};
  draw(+rg.value);drawResp();setScr('eat');drawVis(+vr.value);useMed('tab');drawLft(+lr.value);drawPeg(+pr.value);drawO2();
};
/* =============== 4.3 toward a cure =============== */
const CU_STEPS=[
 {from:0,at:.04,k:'Gene (DNA)',t:'Silence or edit the faulty gene',
  txt:`A gene therapy can deliver a microRNA that silences SOD1 from inside cells. In a first-in-human report, two people with SOD1-ALS received one intrathecal AAV infusion. In the first, spinal cord SOD1 at autopsy was lower than in untreated SOD1-ALS and meningoradiculitis occurred; the second, pretreated with immunosuppression, had stable function over 12 months <sup class="c" data-ref="Mueller2020" title="Source 352">352</sup>. AMT-162 uses the same idea and is in a phase 1/2 safety stage with no efficacy data <sup class="c" data-ref="NCT06100276" title="Source 381">381</sup>. Targeting the C9orf72 DNA repeat itself is a hypothesis <sup class="c" data-ref="Mizielinska2025" title="Source 338">338</sup>.`,
  pt:`The first point of attack is the faulty gene itself: switch it off before it makes anything harmful.`,
  hook:`Gene-level routes so far rest on a <b>two-patient report</b> and a safety-stage trial: early evidence at most <sup class="c" data-ref="Mueller2020,NCT06100276" title="Source 352,381">352,381</sup>.`},
 {from:.14,at:.18,k:'RNA',t:'Destroy the toxic message',
  txt:`Antisense oligonucleotides (ASOs) are given into the spinal fluid and lead to the breakdown of a target RNA. Tofersen lowers SOD1 and plasma NfL, and its US accelerated approval is based on that NfL reduction <sup class="c" data-ref="Miller2022,FDA2023Qalsody" title="Source 172,335">172,335</sup>. Ulefnersen for FUS-ALS has a positive phase 3 topline reported in the news on 22 September 2026, not yet peer reviewed <sup class="c" data-ref="NeurologyLive2026" title="Source 394">394</sup>. Two C9orf72 ASOs, BIIB078 and WVE-004, lowered their targets without clinical benefit <sup class="c" data-ref="vandenBerg2024,NCT04931862" title="Source 374,509">374,509</sup>. A 2024 review notes that ASOs in ALS have often shown proof of mechanism without proof of clinical benefit <sup class="c" data-ref="Ito2024" title="Source 245">245</sup>.`,
  pt:`Instead of fixing the gene, these drugs shred its message so less harmful protein is made. So far this has worked best for rarer genetic forms.`,
  hook:`Targeted therapy has worked first in <b>gene-specific ALS (SOD1, FUS)</b>. About 97% of ALS has TDP-43 accumulation, and routes for that majority are unproven <sup class="c" data-ref="EstevezFraga2026" title="Source 166">166</sup>.`},
 {from:.28,at:.32,k:'RNA splicing',t:'Repair what TDP-43 loss breaks',
  txt:`When TDP-43 is lost from the nucleus, some RNAs are spliced wrongly. STMN2, needed for axon growth and repair, falls <sup class="c" data-ref="Klim2019" title="Source 268">268</sup>, and a cryptic exon enters UNC13A <sup class="c" data-ref="Ma2022,Brown2022" title="Source 80,307">80,307</sup>. ASOs that block the faulty STMN2 splice site restored the protein in human motor neurons and in mice <sup class="c" data-ref="Baughn2023" title="Source 43">43</sup>. QRL-201, an STMN2-restoring ASO, has company interim data: a significant result only in a post hoc subgroup, with no numbers released <sup class="c" data-ref="QurAlis2026" title="Source 437">437</sup>. Lowering ataxin-2 helped TDP-43 mice <sup class="c" data-ref="Becker2017" title="Source 44">44</sup>, but BIIB105 lowered ATXN2 in people without improving NfL or function <sup class="c" data-ref="Biogen2024" title="Source 62">62</sup>. Lithium in UNC13A C/C carriers stopped when an interim analysis showed no survival benefit <sup class="c" data-ref="NCT06008249" title="Source 380">380</sup>.`,
  pt:`TDP-43 normally keeps some messages edited correctly. These routes try to repair the edits that go wrong when it is lost.`,
  hook:`Silencing TDP-43 itself is probably not appropriate given its cellular functions, so researchers target what it controls: <b>STMN2, UNC13A, ATXN2</b> <sup class="c" data-ref="Becker2017" title="Source 44">44</sup>.`},
 {from:.42,at:.46,k:'Protein and aggregation',t:'Clear misfolded protein',
  txt:`VTx-002, an AAV-delivered antibody against TDP-43, is in a first-in-human phase 1/2 <sup class="c" data-ref="NCT07287397" title="Source 386">386</sup>. ACI-5891.9 neutralised seeding-competent TDP-43 from patient CSF in the laboratory <sup class="c" data-ref="Audrain2023" title="Source 31">31</sup>. PIKFYVE inhibition helped cells expel aggregation-prone proteins and extended survival in several ALS models <sup class="c" data-ref="Hung2023" title="Source 239">239</sup>; one human phase 1b was terminated "due to lack of risk-benefit data" <sup class="c" data-ref="NCT06215755" title="Source 382">382</sup>. Drugs aimed at the integrated stress response (DNL343, fosigotifator) and trehalose did not slow disease in the HEALEY platform <sup class="c" data-ref="Paganoni2026,LongevityTech2025,HEALEY2025Trehalose" title="Source 231,301,418">231,301,418</sup>.`,
  pt:`Misfolded protein clumps inside motor neurons. These routes try to clear the clumps or help the cell cope; none has worked in people yet.`,
  hook:`HEALEY Regimen G: DNL343 gave a disease rate ratio of <b>1.04</b>, no evidence of slowing <sup class="c" data-ref="Paganoni2026" title="Source 418">418</sup>.`},
 {from:.56,at:.60,k:'Neurons and glia',t:'Protect neurons, calm glia',
  txt:`Many trials aim at inflammation and cell survival. Masitinib, low-dose IL-2 and ultra-high-dose methylcobalamin each have a positive analysis that is contested or limited to a selected group <sup class="c" data-ref="Mora2020,Bensimon2025,Oki2022" title="Source 58,347,407">58,347,407</sup>. Zilucoplan, verdiperstat, CNM-Au8, pridopidine, the RIPK1 inhibitor SAR443820, rapamycin, TUDCA, memantine and trazodone were negative on their primary endpoints <sup class="c" data-ref="Paganoni2025,HEALEY2025Verdiperstat,HEALEY2025CNMAu8,HEALEY2025Pridopidine,Cudkowicz2026,Mandrioli2023,NeurologyLive2024,Pal2024" title="Source 130,229,230,232,316,393,417,419">130,229,230,232,316,393,417,419</sup>. The cell therapy NurOwn missed its phase 3 primary endpoint <sup class="c" data-ref="Cudkowicz2022" title="Source 129">129</sup>. GDNF-secreting progenitor cells met a safety endpoint in a phase 1/2a <sup class="c" data-ref="Baloh2022" title="Source 38">38</sup>.`,
  pt:`Most drugs tried at this level have not slowed ALS in good trials. A few have mixed results that still need confirming.`,
  hook:`A recurring pattern: a <b>negative primary result</b> next to a positive subgroup or adjusted analysis that is used to justify further trials <sup class="c" data-ref="Benatar2025e" title="Source 56">56</sup>.`},
 {from:.70,at:.74,k:'Circuit and muscle',t:'Measuring the effect',
  txt:`Trials read out function (ALSFRS-R), breathing (vital capacity, now also coached at home), strength and survival, together with neurofilament light (NfL), a blood marker of nerve damage. At-home vital capacity agreed well with clinic values (Lin's rc 0.82) <sup class="c" data-ref="Macklin2026" title="Source 310">310</sup>. Wrist-worn accelerometry declined more slowly than ALSFRS-R and predicted smaller samples for trials longer than 12 months <sup class="c" data-ref="Holdom2025" title="Source 236">236</sup>. NfL is established as a prognostic marker <sup class="c" data-ref="Benatar2018" title="Source 49">49</sup>; as a surrogate endpoint it has supported approval only in SOD1-ALS <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup>, and a 2026 review found NfL changes did not always match clinical change <sup class="c" data-ref="Zheng2026" title="Source 552">552</sup>.`,
  pt:`To know whether a drug works, trials measure daily function, breathing, strength, survival and a nerve-damage marker in the blood.`,
  hook:`<b>NfL</b>: an established prognostic marker, and an accepted surrogate only for SOD1-ALS (tofersen accelerated approval) <sup class="c" data-ref="FDA2023Qalsody" title="Source 172">172</sup>.`},
 {from:.84,at:.88,k:'Before symptoms',t:'Treat carriers early',
  txt:`In carriers who later developed ALS, NfL was raised as far back as about 12 months before the first symptoms <sup class="c" data-ref="Benatar2018" title="Source 49">49</sup>. ATLAS monitors plasma NfL in presymptomatic carriers of high-penetrance, rapidly progressive SOD1 variants and randomises them to tofersen or placebo when NfL reaches at least 44 pg/mL and has risen by at least 10 pg/mL from baseline. Its primary endpoint is the proportion who develop clinically manifest ALS within 12 months <sup class="c" data-ref="Benatar2022a" title="Source 50">50</sup>. It has 158 people enrolled and no results yet <sup class="c" data-ref="NCT04856982" title="Source 373">373</sup>. Mild motor impairment and a 19-protein plasma panel are being developed to time treatment <sup class="c" data-ref="Benatar2025a,Ran2026" title="Source 52,444">52,444</sup>.`,
  pt:`Some people carry an ALS gene for years before any symptom. The idea is to treat when blood tests show the disease starting, before weakness.`,
  hook:`<b>ATLAS</b> (NCT04856982) is described by its designers as the first interventional trial in presymptomatic ALS <sup class="c" data-ref="Benatar2022a" title="Source 50">50</sup>.`}
];
const CU_TXT={
 head:'WHERE RESEARCH INTERVENES',stepOf:(i,n)=>`Step ${i} of ${n}`,
 nodesW:['gene (DNA)','RNA','protein','aggregation','neuron, glia','circuit','muscle'],
 nodesN:['Gene (DNA)','RNA','Protein','Aggregation','Neurons and glia','Circuit','Muscle'],
 splice:'splicing',
 listHead:['Routes acting on the gene','Routes acting on RNA','Routes repairing splicing','Routes acting on protein','Routes protecting cells','What trials measure','Treating before symptoms'],
 none:'No route in this step carries the chosen label.',
 evShort:{est:'established',early:'early evidence',hyp:'hypothesis',neg:'tested, negative',none:'measure'},
 evLong:{est:'Established',early:'Early evidence',hyp:'Hypothesis',neg:'Tested and negative',none:'Measure, no label'},
 filters:[ ['all','All routes'],['est','Established'],['early','Early evidence'],['hyp','Hypothesis'],['neg','Tested and negative'] ],
 st:{COMPLETED:'Completed',ACTIVE_NOT_RECRUITING:'Active, not recruiting',RECRUITING:'Recruiting',TERMINATED:'Terminated',NOT_YET_RECRUITING:'Not yet recruiting',UNKNOWN:'Unknown status',AVAILABLE:'Available (expanded access)'},
 reg:(n,id,s,d)=>`${n} · ${id} · ${s} · last update ${d}`,
 plot:{y:'plasma NfL',x:'time',onset:'symptoms begin',thr:'ATLAS threshold',rand:'randomised here'},
 foot:'Shape and word both give the evidence label. Schematic, not to scale.',
 footN:['Shape and word both give the','evidence label. Schematic.'],
 cap:(i,n,f)=>`Step ${i} of ${n}. Showing: ${f}. Schematic pathway, not to scale.`,
 noCards:'No route on this page carries the chosen label.'
};
/* route markers: n name, ev label, node (index on the pathway; 1.5 = the splicing step), step */
const CU_MK=[
 {n:'AAV microRNA (SOD1)',ev:'early',node:0,step:0},{n:'AMT-162 (SOD1)',ev:'hyp',node:0,step:0},{n:'C9orf72 DNA repeat',ev:'hyp',node:0,step:0},
 {n:'Tofersen (SOD1)',ev:'est',node:1,step:1},{n:'Ulefnersen (FUS)',ev:'early',node:1,step:1},{n:'BIIB078 (C9orf72)',ev:'neg',node:1,step:1},
 {n:'WVE-004 (C9orf72)',ev:'neg',node:1,step:1},{n:'C9orf72 ASO, 1 person',ev:'early',node:1,step:1},{n:'CHCHD10 ASO, 1 person',ev:'early',node:1,step:1},
 {n:'G-quadruplex binders',ev:'hyp',node:1,step:1},
 {n:'QRL-201 (STMN2)',ev:'early',node:1.5,step:2},{n:'UNC13A target',ev:'hyp',node:1.5,step:2},{n:'Lithium, UNC13A C/C',ev:'neg',node:1.5,step:2},{n:'BIIB105 (ATXN2)',ev:'neg',node:1.5,step:2},
 {n:'Poly-GA antibodies',ev:'hyp',node:2,step:3},{n:'DNL343',ev:'neg',node:2,step:3},{n:'Fosigotifator',ev:'neg',node:2,step:3},
 {n:'VTx-002 (TDP-43)',ev:'hyp',node:3,step:3},{n:'ACI-5891.9 (TDP-43)',ev:'hyp',node:3,step:3},{n:'PIKFYVE inhibition',ev:'hyp',node:3,step:3},
 {n:'Apilimod (C9orf72)',ev:'early',node:3,step:3},{n:'Trehalose',ev:'neg',node:3,step:3},
 {n:'Masitinib',ev:'early',node:4,step:4},{n:'Low-dose IL-2',ev:'early',node:4,step:4},{n:'Methylcobalamin',ev:'early',node:4,step:4},
 {n:'GDNF progenitor cells',ev:'early',node:4,step:4},{n:'Ibudilast',ev:'hyp',node:4,step:4},{n:'Zilucoplan',ev:'neg',node:4,step:4},
 {n:'Verdiperstat',ev:'neg',node:4,step:4},{n:'CNM-Au8',ev:'neg',node:4,step:4},{n:'Pridopidine',ev:'neg',node:4,step:4},
 {n:'RIPK1 inhibitor',ev:'neg',node:4,step:4},{n:'Rapamycin',ev:'neg',node:4,step:4},{n:'NurOwn (cells)',ev:'neg',node:4,step:4},
 {n:'TUDCA',ev:'neg',node:4,step:4},{n:'Memantine',ev:'neg',node:4,step:4},{n:'Trazodone',ev:'neg',node:4,step:4},
 {n:'Metformin, nifedipine',ev:'neg',node:4,step:4},
 {n:'NfL, prognosis',ev:'est',node:5,step:5},{n:'NfL surrogate, SOD1',ev:'est',node:5,step:5},{n:'NfL beyond SOD1',ev:'hyp',node:5,step:5},
 {n:'ALSFRS-R, survival',ev:'none',node:6,step:5},{n:'At-home vital capacity',ev:'early',node:6,step:5},{n:'Wrist accelerometry',ev:'early',node:6,step:5},
 {n:'ATLAS (presymptomatic)',ev:'early',node:null,step:6},{n:'Mild motor impairment',ev:'early',node:null,step:6},{n:'Plasma protein panel',ev:'early',node:null,step:6}
];
/* route cards: each item has an evidence label (ev), an optional label wording (w), a title (h), text, and registry records */
const CU_CARDS=[
 {t:'SOD1: tofersen, ATLAS and gene therapy',items:[
  {ev:'est',h:'Tofersen (Qalsody), intrathecal antisense',
   txt:`In VALOR, 108 adults with SOD1-ALS were randomised 2:1 to tofersen or placebo. In the faster-progression group the week-28 ALSFRS-R difference was 1.2 points (95% CI -3.2 to 5.5, P = 0.97), so the primary endpoint was not met, while CSF SOD1 and plasma NfL fell more with tofersen <sup class="c" data-ref="Miller2022,NCT02623699" title="Source 335,359">335,359</sup>. Over 148 weeks, early start was associated with numerically less decline than delayed start (ALSFRS-R -9.9 vs -13.5 points); survival was compared with natural history, not with a concurrent placebo group <sup class="c" data-ref="Miller2026,NCT03070119" title="Source 336,361">336,361</sup>. The US approval is accelerated, based on reduction in plasma NfL, and the EU authorisation of 29 May 2024 is under exceptional circumstances <sup class="c" data-ref="FDA2023Qalsody,EMA2024Qalsody" title="Source 160,172">160,172</sup>.`,
   reg:[{n:'VALOR',id:'NCT02623699',s:'COMPLETED',d:'2023-07-28'},{n:'Open-label extension',id:'NCT03070119',s:'COMPLETED',d:'2025-08-29'}]},
  {ev:'early',w:'Early evidence: design, no results',h:'ATLAS: tofersen before symptoms',
   txt:`A phase 3 trial in clinically presymptomatic adult carriers of high-penetrance, rapidly progressive SOD1 variants. Part A measures plasma NfL monthly. A carrier is randomised 1:1 to tofersen or placebo (Part B, about 28 planned) when NfL is at least 44 pg/mL and has risen by at least 10 pg/mL from baseline while still presymptomatic. The primary endpoint is the proportion who develop clinically manifest ALS within 12 months, and anyone who does receives open-label tofersen <sup class="c" data-ref="Benatar2022a" title="Source 50">50</sup>. 158 people are enrolled, estimated completion is 30 April 2028, and no efficacy results were found in any published or press source as of 20 October 2026 <sup class="c" data-ref="NCT04856982" title="Source 373">373</sup>.`,
   reg:[{n:'ATLAS',id:'NCT04856982',s:'ACTIVE_NOT_RECRUITING',d:'2026-10-20'}]},
  {ev:'early',h:'AAV microRNA against SOD1 (two patients)',
   txt:`Two people with SOD1-ALS received one intrathecal infusion of an AAV encoding a microRNA against SOD1. In patient 1, spinal cord SOD1 at autopsy was lower than in untreated SOD1-ALS, CSF SOD1 fell only slightly and briefly, and meningoradiculitis occurred. Patient 2, pretreated with immunosuppression, had stable function over 12 months <sup class="c" data-ref="Mueller2020" title="Source 352">352</sup>.`},
  {ev:'hyp',w:'Hypothesis to early evidence: safety stage',h:'AMT-162 (AAVrh10 microRNA)',
   txt:`EPISOD1 is a phase 1/2 single ascending dose study with 20 participants, started on 1 August 2024. No efficacy data were found <sup class="c" data-ref="NCT06100276" title="Source 381">381</sup>.`,
   reg:[{n:'EPISOD1',id:'NCT06100276',s:'ACTIVE_NOT_RECRUITING',d:'2025-10-22'}]}
 ]},
 {t:'C9orf72: the most common genetic cause',lede:`Why it has been hard: the G4C2 repeat is read in both directions, makes several dipeptide repeat proteins and causes a mix of loss and gain of function. A 2025 review suggests ASO trials may have failed because they targeted a single gain-of-function mechanism <sup class="c" data-ref="Mizielinska2025" title="Source 338">338</sup>.`,items:[
  {ev:'neg',h:'BIIB078 (sense-strand antisense)',
   txt:`106 adults with C9orf72-ALS received intrathecal BIIB078 (5-90 mg) or placebo. Serious adverse events occurred in 18% on BIIB078 and 33% on placebo. There was no reduction in neurofilament levels and no benefit on clinical outcomes, and development was discontinued <sup class="c" data-ref="vandenBerg2024,NCT03626012" title="Source 365,509">365,509</sup>. In tissue from treated people, CSF dipeptide repeat proteins fell, but these proteins and phosphorylated TDP-43 remained abundant in the brain <sup class="c" data-ref="McEachin2025" title="Source 324">324</sup>.`,
   reg:[{n:'BIIB078 phase 1',id:'NCT03626012',s:'COMPLETED',d:'2022-01-14'}]},
  {ev:'neg',h:'WVE-004 (FOCUS-C9)',
   txt:`Terminated with 35 enrolled. The registry reason reads "Despite robust, sustained reductions in poly(GP), no clinical benefit was seen at 24 weeks"; the company reported maximal mean poly(GP) reductions of 48-51% <sup class="c" data-ref="NCT04931862,Wave2023" title="Source 374,531">374,531</sup>.`,
   reg:[{n:'FOCUS-C9',id:'NCT04931862',s:'TERMINATED',d:'2023-10-23'}]},
  {ev:'early',w:'Early evidence: one person, biomarker only',h:'An optimised C9orf72 antisense in one person',
   txt:`Repeated intrathecal dosing was well tolerated with significant falls in CSF poly(GP). The authors state that further trials are needed to show safety and efficacy <sup class="c" data-ref="Tran2022" title="Source 496">496</sup>.`},
  {ev:'early',w:'Early evidence, pending',h:'Apilimod (PIKFYVE inhibitor) in C9orf72-ALS',
   txt:`A phase 2a with 15 enrolled; results are posted to the registry, and no peer-reviewed report was found <sup class="c" data-ref="NCT05163886" title="Source 375">375</sup>.`,
   reg:[{n:'LAM-002A',id:'NCT05163886',s:'COMPLETED',d:'2026-09-29'}]},
  {ev:'hyp',h:'Other C9 approaches',
   txt:`Targeting the DNA repeat itself, several repeat-derived RNAs at once, or downstream TDP-43 dysfunction are described as "on the horizon" <sup class="c" data-ref="Mizielinska2025" title="Source 338">338</sup>. Small molecules that stabilise the repeat RNA reduced RNA foci and repeat proteins in patient-derived neurons and flies <sup class="c" data-ref="Simone2018" title="Source 475">475</sup>, and antibodies against poly-GA improved behaviour and survival in mice <sup class="c" data-ref="Nguyen2020" title="Source 399">399</sup>.`}
 ]},
 {t:'ATXN2: lowering ataxin-2',items:[
  {ev:'hyp',h:'The idea, in mice',
   txt:`Reducing ataxin-2, by knockout or a single CNS dose of ASO, reduced TDP-43 aggregation and markedly extended survival in TDP-43 transgenic mice <sup class="c" data-ref="Becker2017" title="Source 44">44</sup>.`},
  {ev:'neg',h:'BIIB105 (ION541), ALSpire',
   txt:`In the companies' 16 May 2024 release, CSF ATXN2 fell significantly, but plasma NfL, function, breathing and strength did not improve, including in people with an ATXN2 poly-CAG expansion. Discontinuation for adverse events was 8.3% vs 3.6% on placebo. The trial was terminated by sponsor decision with 99 enrolled <sup class="c" data-ref="NCT04494256,Biogen2024" title="Source 62,371">62,371</sup>.`,
   reg:[{n:'ALSpire',id:'NCT04494256',s:'TERMINATED',d:'2025-10-09'}]}
 ]},
 {t:'FUS: ulefnersen',lede:`The same antisense drug appears as ION363, jacifusen and ulefnersen, depending on date and source <sup class="c" data-ref="Korben2022,Shneider2025,NCT07862959" title="Source 271,389,469">271,389,469</sup>.`,items:[
  {ev:'early',h:'From mice to a case series',
   txt:`In FUS knock-in mice the ASO silenced Fus and delayed motor neuron degeneration, and in one person with a FUS P525L variant repeated intrathecal dosing lowered FUS and markedly reduced aggregate burden <sup class="c" data-ref="Korben2022" title="Source 271">271</sup>. In an expanded-access series of 12 participants (median age 26), CSF NfL fell by up to 82.8% after 6 months. Most kept declining on ALSFRS-R, one showed objective functional recovery after 10 months and another stayed without symptoms; two deaths were judged unrelated <sup class="c" data-ref="Shneider2025" title="Source 469">469</sup>.`},
  {ev:'early',w:'Early evidence: topline from a news report, not peer reviewed',h:'FUSION phase 1-3',
   txt:`Randomised, double-blind and placebo-controlled for 72 weeks, then open-label, with 89 enrolled <sup class="c" data-ref="NCT04768972" title="Source 372">372</sup>. On 22 September 2026, a news report of the companies' announcement said the primary joint-rank endpoint (death or permanent ventilation, time to rescue, ALSFRS-R change through day 505) favoured ulefnersen over placebo (P = .0005), and that serum NfL and a time-to-event composite also favoured treatment. Effect sizes were not disclosed, the result is not peer reviewed, and the drug is not approved anywhere <sup class="c" data-ref="NeurologyLive2026" title="Source 394">394</sup>. An early access programme is listed for the period from the trial results until commercial availability <sup class="c" data-ref="NCT07862959" title="Source 389">389</sup>.`,
   reg:[{n:'FUSION',id:'NCT04768972',s:'ACTIVE_NOT_RECRUITING',d:'2026-07-21'},{n:'Early access',id:'NCT07862959',s:'AVAILABLE',d:'2026-10-07'}]}
 ]},
 {t:'STMN2: restoring a repair protein',items:[
  {ev:'hyp',h:'The target',
   txt:`Loss of nuclear TDP-43 causes mis-splicing that lowers STMN2, needed for axon outgrowth and regeneration; restoring it rescued these deficits in human motor neurons <sup class="c" data-ref="Klim2019" title="Source 268">268</sup>. ASOs that block the cryptic splice site restored stathmin-2 in human motor neurons and in gene-edited mice <sup class="c" data-ref="Baughn2023" title="Source 43">43</sup>.`},
  {ev:'early',w:'Early evidence: interim, post hoc, not peer reviewed',h:'QRL-201 (ANQUR)',
   txt:`A February 2026 company release reported a reduction in pNfH in the low-dose group, an ALSFRS-R "trend", and a significant result only in a post hoc subgroup. No numbers were released. The company plans a phase 3 in 2027. 69 are enrolled <sup class="c" data-ref="NCT05633459,QurAlis2026" title="Source 377,437">377,437</sup>.`,
   reg:[{n:'ANQUR',id:'NCT05633459',s:'ACTIVE_NOT_RECRUITING',d:'2026-05-15'}]}
 ]},
 {t:'Other TDP-43 routes: UNC13A, antibodies, PIKFYVE',lede:`Silencing TDP-43 itself is probably not appropriate given its critical cellular functions, which is why indirect routes were pursued <sup class="c" data-ref="Becker2017" title="Source 44">44</sup>.`,items:[
  {ev:'hyp',h:'UNC13A',
   txt:`TDP-43 loss lets a cryptic exon into UNC13A RNA and lowers the protein; the ALS and FTD risk variants sit in that intron and increase cryptic exon inclusion. Both 2022 papers name it a therapeutic target <sup class="c" data-ref="Ma2022,Brown2022" title="Source 80,307">80,307</sup>.`},
  {ev:'neg',w:'Tested and negative (interim analysis)',h:'Lithium in UNC13A C/C carriers (TRICALS)',
   txt:`The registry reason reads "The planned interim analysis showed no survival benefit", with 88 enrolled of a planned 171 selected by genotype and TRICALS risk score <sup class="c" data-ref="NCT06008249,Willemse2022" title="Source 380,538">380,538</sup>.`,
   reg:[{n:'Lithium, UNC13A',id:'NCT06008249',s:'TERMINATED',d:'2026-05-13'}]},
  {ev:'hyp',w:'Hypothesis: first-in-human safety stage',h:'VTx-002 (AAV-delivered antibody against TDP-43)',
   txt:`An open-label phase 1/2 given intracisternally, about 36 participants, started 19 December 2025. No results <sup class="c" data-ref="NCT07287397" title="Source 386">386</sup>.`,
   reg:[{n:'PIONEER-ALS',id:'NCT07287397',s:'RECRUITING',d:'2026-10-16'}]},
  {ev:'hyp',h:'ACI-5891.9',
   txt:`Neutralised seeding-competent TDP-43 from the CSF of people with sporadic ALS in a laboratory assay. No ClinicalTrials.gov entry in ALS was found <sup class="c" data-ref="Audrain2023" title="Source 31">31</sup>.`},
  {ev:'hyp',h:'PIKFYVE inhibition',
   txt:`Activated the expulsion of aggregation-prone proteins and extended survival in C9ORF72, TARDBP, FUS and sporadic ALS models <sup class="c" data-ref="Hung2023" title="Source 239">239</sup>. A phase 1b of VRG50635 was terminated "due to lack of risk-benefit data" with 54 enrolled <sup class="c" data-ref="NCT06215755" title="Source 382">382</sup>.`,
   reg:[{n:'VRG50635',id:'NCT06215755',s:'TERMINATED',d:'2025-12-15'}]}
 ]},
 {t:'Cell therapy',items:[
  {ev:'neg',h:'NurOwn (MSC-NTF), phase 3',
   txt:`196 enrolled. 33% on NurOwn and 28% on placebo met the responder definition at 28 weeks (OR 1.33, P = .45), so the primary endpoint was not met; a prespecified subgroup showed 35% vs 16% (P = .29) <sup class="c" data-ref="Cudkowicz2022,NCT03280056" title="Source 129,363">129,363</sup>. An FDA advisory committee voted 17 no, 1 yes and 1 abstention on 27 September 2023 on whether the data showed substantial evidence of effectiveness <sup class="c" data-ref="CGTLive2023" title="Source 96">96</sup>. A new phase 3b is registered but not yet recruiting <sup class="c" data-ref="NCT06973629" title="Source 384">384</sup>.`,
   reg:[{n:'NurOwn phase 3',id:'NCT03280056',s:'COMPLETED',d:'2024-02-29'},{n:'NurOwn phase 3b',id:'NCT06973629',s:'NOT_YET_RECRUITING',d:'2025-05-22'}]},
  {ev:'early',w:'Early evidence: safety and delivery only',h:'Neural progenitor cells secreting GDNF',
   txt:`18 people received one-sided lumbar spinal cord transplants. The 1-year safety endpoint was met, grafts survived and made GDNF for up to 42 months, and benign neuromas near delivery sites were common at post-mortem. The trial was not designed to show efficacy <sup class="c" data-ref="Baloh2022,NCT02943850" title="Source 38,360">38,360</sup>.`,
   reg:[{n:'CNS10-NPC-GDNF',id:'NCT02943850',s:'COMPLETED',d:'2020-07-15'}]}
 ]},
 {t:'Platform trials',lede:`A platform tests several drugs under one protocol, sharing placebo participants to save time.`,items:[
  {ev:'none',w:'Design',h:'HEALEY ALS Platform',
   txt:`Each regimen randomises 3:1 to drug or placebo and shares placebo participants across regimens. The primary endpoint, a joint model of ALSFRS-R and survival, is reported as a disease rate ratio (DRR), where below 1 favours the drug <sup class="c" data-ref="Paganoni2025,NCT04297683" title="Source 369,417">369,417</sup>. Regimen I (NUZ-001) started in February 2026 <sup class="c" data-ref="NCT07410806" title="Source 388">388</sup>.`,
   reg:[{n:'HEALEY master protocol',id:'NCT04297683',s:'ACTIVE_NOT_RECRUITING',d:'2026-07-21'},{n:'Regimen I, NUZ-001',id:'NCT07410806',s:'ACTIVE_NOT_RECRUITING',d:'2026-07-20'}]},
  {ev:'neg',h:'HEALEY regimens A to G',
   txt:`<ul><li>A, zilucoplan: DRR 1.08 (95% CrI 0.87-1.31), stopped early for futility <sup class="c" data-ref="Paganoni2025" title="Source 417">417</sup></li><li>B, verdiperstat: DRR 0.98 (0.77-1.24) <sup class="c" data-ref="HEALEY2025Verdiperstat" title="Source 232">232</sup></li><li>C, CNM-Au8: DRR 0.97 (0.783-1.175) <sup class="c" data-ref="HEALEY2025CNMAu8" title="Source 229">229</sup>; an earlier phase 2 missed its primary endpoint but reported an exploratory fall in deaths <sup class="c" data-ref="Vucic2023,NCT04098406" title="Source 368,525">368,525</sup></li><li>D, pridopidine: DRR 0.99 (0.80-1.21) <sup class="c" data-ref="HEALEY2025Pridopidine" title="Source 230">230</sup></li><li>E, trehalose: DRR 0.87 (0.665-1.102), serious adverse events 16% vs 7% <sup class="c" data-ref="HEALEY2025Trehalose" title="Source 231">231</sup></li><li>F, fosigotifator: primary endpoint not met at either dose, as reported in January 2025, no peer-reviewed report <sup class="c" data-ref="LongevityTech2025,NCT05740813" title="Source 301,378">301,378</sup></li><li>G, DNL343: DRR 1.04 (0.83-1.32) <sup class="c" data-ref="Paganoni2026,NCT05842941" title="Source 379,418">379,418</sup></li></ul>`,
   reg:[{n:'Regimen A',id:'NCT04436497',s:'COMPLETED',d:'2023-07-25'},{n:'Regimen B',id:'NCT04436510',s:'COMPLETED',d:'2023-06-12'},{n:'Regimen C',id:'NCT04414345',s:'COMPLETED',d:'2023-07-25'},{n:'Regimen D',id:'NCT04615923',s:'COMPLETED',d:'2023-08-23'},{n:'Regimen E',id:'NCT05136885',s:'COMPLETED',d:'2025-05-14'},{n:'Regimen F',id:'NCT05740813',s:'COMPLETED',d:'2025-11-14'},{n:'Regimen G',id:'NCT05842941',s:'COMPLETED',d:'2026-01-28'}]},
  {ev:'hyp',w:'Hypothesis: post hoc subgroup',h:'Pridopidine after HEALEY',
   txt:`A sponsor-authored post hoc subgroup of 72 participants reported slower ALSFRS-R decline (difference 2.90, nominal p = 0.03), and a 48-week phase 3, PREVAiLS, has started <sup class="c" data-ref="Geva2026,NCT07322003" title="Source 201,387">201,387</sup>.`,
   reg:[{n:'PREVAiLS',id:'NCT07322003',s:'RECRUITING',d:'2026-10-06'}]},
  {ev:'neg',h:'MND-SMART (UK): memantine and trazodone',
   txt:`At interim analysis 2 (530 analysed), monthly ALSFRS-R decline was -0.650 on memantine, -0.625 on trazodone and -0.655 on placebo; both arms were dropped <sup class="c" data-ref="Pal2024" title="Source 419">419</sup>. Amantadine and tacrolimus arms were added later, and no amantadine result was found <sup class="c" data-ref="NCT04302870" title="Source 370">370</sup>.`,
   reg:[{n:'MND-SMART',id:'NCT04302870',s:'RECRUITING',d:'2026-03-04'}]},
  {ev:'neg',w:'Tested and negative: screening stage, news report',h:'EXPERTS-ALS (UK): metformin and nifedipine',
   txt:`An NfL-based screening platform in which each participant takes one drug for about 18-24 weeks. The first two drugs did not lower NfL in about 30 participants, according to a University of Sheffield news item of 11 August 2026 (not peer reviewed). Its ISRCTN record (ISRCTN15525855) could not be read <sup class="c" data-ref="Sheffield2026" title="Source 463">463</sup>.`}
 ]},
 {t:'Other routes with trial results',items:[
  {ev:'early',w:'Early evidence, contested',h:'Masitinib',
   txt:`In the prespecified primary population (4.5 mg/kg/day), ALSFRS-R decline differed by 3.4 points (95% CI 0.65-6.13, P = 0.016); the broader cohort and the lower dose showed no significant effect, and serious adverse events were 31% vs 18% <sup class="c" data-ref="Mora2020,NCT02588677" title="Source 347,358">347,358</sup>. EU and Canadian conditional applications reportedly received negative opinions, and the confirmatory trial is being replaced by a new protocol <sup class="c" data-ref="ALSNewsToday2025,NCT03127267,NCT07174492" title="Source 16,362,385">16,362,385</sup>.`,
   reg:[{n:'AB10015',id:'NCT02588677',s:'COMPLETED',d:'2023-09-29'},{n:'AB19001',id:'NCT03127267',s:'RECRUITING',d:'2025-09-12'},{n:'AB23005',id:'NCT07174492',s:'NOT_YET_RECRUITING',d:'2025-10-03'}]},
  {ev:'early',w:'Early evidence, contested',h:'Low-dose IL-2 (MIROCALS)',
   txt:`220 randomised. The unadjusted primary analysis showed a non-significant 19% lower risk of death (HR 0.81, 95% CI 0.54-1.22, P = 0.33); the covariate-adjusted analysis was significant (HR 0.32), and in the 70% with low CSF pNFH the HR was 0.52 <sup class="c" data-ref="Bensimon2025" title="Source 58">58</sup>. A reanalysis found the TRICALS risk score cannot replace CSF pNFH for stratification <sup class="c" data-ref="AlKhleifat2026" title="Source 12">12</sup>.`,
   reg:[{n:'MIROCALS',id:'NCT03039673',s:'COMPLETED',d:'2025-12-04'}]},
  {ev:'early',w:'Early evidence: one trial, selected group',h:'Ultra-high-dose methylcobalamin (JETALS)',
   txt:`130 people with early-stage ALS and moderate progression in Japan. At week 16, ALSFRS-R decline was 1.97 points smaller than with placebo (-2.66 vs -4.63; 95% CI 0.44-3.50; P = .01) <sup class="c" data-ref="Oki2022,NCT03548311" title="Source 364,407">364,407</sup>.`,
   reg:[{n:'JETALS',id:'NCT03548311',s:'COMPLETED',d:'2025-03-26'}]},
  {ev:'neg',h:'TUDCA alone (TUDCA-ALS)',
   txt:`March 2024 topline results showed no separation from placebo on ALSFRS-R over 18 months and no difference in survival or NfL, with 337 enrolled of a planned 440. No peer-reviewed paper was found, and the registry still shows unknown status <sup class="c" data-ref="NeurologyLive2024,Albanese2022,NCT03800524" title="Source 6,366,393">6,366,393</sup>.`,
   reg:[{n:'TUDCA-ALS',id:'NCT03800524',s:'UNKNOWN',d:'2023-07-10'}]},
  {ev:'neg',h:'RIPK1 inhibitor SAR443820 (HIMALAYA)',
   txt:`305 randomised. Week-24 ALSFRS-R change was -6.73 vs -6.32 (difference -0.41, 95% CI -1.71 to 0.88), with more liver enzyme rises on the drug <sup class="c" data-ref="Cudkowicz2026,NCT05237284" title="Source 130,376">130,376</sup>.`,
   reg:[{n:'HIMALAYA',id:'NCT05237284',s:'TERMINATED',d:'2025-03-21'}]},
  {ev:'hyp',w:'Hypothesis to early evidence: result pending',h:'Ibudilast (COMBAT-ALS)',
   txt:`234 enrolled, 12 months double-blind then 6 months open-label, with a combined function-and-survival score (CAFS) as primary endpoint. No topline result had been reported as of 20 October 2026 <sup class="c" data-ref="Oskarsson2021,NCT04057898" title="Source 367,412">367,412</sup>.`,
   reg:[{n:'COMBAT-ALS',id:'NCT04057898',s:'ACTIVE_NOT_RECRUITING',d:'2026-03-06'}]},
  {ev:'neg',w:'Tested and negative on its biological endpoint',h:'Rapamycin (RAP-ALS)',
   txt:`63 randomised; the primary regulatory T-cell endpoint was not reached, and safety findings were reassuring <sup class="c" data-ref="Mandrioli2023" title="Source 316">316</sup>.`,
   reg:[{n:'RAP-ALS',id:'NCT03359538',s:'COMPLETED',d:'2024-09-19'}]},
  {ev:'early',w:'Early evidence: one person',h:'An individual antisense for CHCHD10-ALS',
   txt:`In one person, plasma NfL fell about 50% and ALSFRS-R rose from 33 to 36 over 12 months <sup class="c" data-ref="Cousin2026,NCT06392126" title="Source 120,383">120,383</sup>.`,
   reg:[{n:'CHCHD10 ASO',id:'NCT06392126',s:'ACTIVE_NOT_RECRUITING',d:'2026-07-13'}]}
 ]},
 {t:'Biomarkers and NfL as a surrogate',items:[
  {ev:'est',h:'NfL as a prognostic and early marker',
   txt:`In people carrying an ALS gene who later developed the disease, serum and CSF NfL were raised as far back as about 12 months before the first symptoms <sup class="c" data-ref="Benatar2018" title="Source 49">49</sup>. A 2025 review of SOD1-ALS calls NfL a risk biomarker that predicts phenoconversion <sup class="c" data-ref="Benatar2025b" title="Source 53">53</sup>.`},
  {ev:'est',w:'Established for SOD1-ALS only',h:'NfL as a surrogate endpoint',
   txt:`Tofersen lowered plasma NfL in VALOR, and the FDA based accelerated approval on that reduction, the first ALS indication where an NfL change supported approval <sup class="c" data-ref="Miller2022,FDA2023Qalsody" title="Source 172,335">172,335</sup>.`},
  {ev:'hyp',w:'Unresolved',h:'Limits of NfL',
   txt:`A 2026 scoping review of 49 trials (8 in ALS) found that NfL reductions often paralleled clinical benefit, but several studies showed a lack of concordance, and it calls for validation specific to each disease and intervention <sup class="c" data-ref="Zheng2026" title="Source 552">552</sup>. BIIB105 lowered its target but not NfL <sup class="c" data-ref="Biogen2024" title="Source 62">62</sup>, and in NurOwn the advisory committee reportedly linked greater NfL reduction with worse outcomes <sup class="c" data-ref="CGTLive2023" title="Source 96">96</sup>.`},
  {ev:'early',h:'Beyond NfL: a plasma protein panel',
   txt:`In 516 longitudinal samples, a 19-protein panel predicted conversion to clinical ALS over 0.5-5 years (cross-validated AUC 0.80-0.89) and outperformed NfL alone <sup class="c" data-ref="Ran2026" title="Source 444">444</sup>.`},
  {ev:'early',h:'Remote and digital measures',
   txt:`Video-coached at-home vital capacity agreed well with clinic measurement (Lin's rc 0.82) in 233 HEALEY participants <sup class="c" data-ref="Macklin2026" title="Source 310">310</sup>. Wrist-worn accelerometry in 95 people declined more slowly than ALSFRS-R and predicted smaller samples for trials longer than 12 months <sup class="c" data-ref="Holdom2025" title="Source 236">236</sup>.`},
  {ev:'none',w:'Trial design',h:'Stratification and phase 2 reform',
   txt:`The ENCALS model uses 8 predictors, including bulbar onset, age, progression rate, FTD and C9orf72, and was built for counselling and future trial design <sup class="c" data-ref="Westeneng2018" title="Source 535">535</sup>. In MIROCALS the unadjusted and prognosis-adjusted analyses of the same endpoint gave different conclusions <sup class="c" data-ref="Bensimon2025" title="Source 58">58</sup>. Experts propose NfL reduction as a better phase 2 go or no-go marker than short function-based outcomes <sup class="c" data-ref="Benatar2025e" title="Source 56">56</sup>.`}
 ]},
 {t:'Prevention in gene carriers',items:[
  {ev:'none',w:'Natural history study',h:'Pre-fALS',
   txt:`A natural-history and biomarker study of unaffected carriers of any ALS gene variant, about 500 planned and running to 2037; its data informed ATLAS <sup class="c" data-ref="NCT00317616,Benatar2022a" title="Source 50,357">50,357</sup>.`,
   reg:[{n:'Pre-fALS',id:'NCT00317616',s:'RECRUITING',d:'2026-03-20'}]},
  {ev:'early',h:'Mild motor impairment before diagnosis',
   txt:`Among 20 phenoconverters in Pre-fALS, 11 had a prodrome of mild motor signs <sup class="c" data-ref="Benatar2022b" title="Source 51">51</sup>. In the 2025 proposed research criteria, mild motor impairment was seen before diagnosis in 55% of phenoconverters, 43% of presymptomatic carriers and 14% of controls, and was linked with faster conversion (HR 5.1); the authors note it is nonspecific <sup class="c" data-ref="Benatar2025a" title="Source 52">52</sup>.`},
  {ev:'none',w:'Context',h:'Penetrance and planning',
   txt:`In UK Biobank exomes, 93.4% of the 122 people with SOD1 coding variants had no symptoms, and the estimated genetic prevalence of SOD1-ALS was four times the clinically reported figure <sup class="c" data-ref="Gagliardi2026" title="Source 190">190</sup>. Workshop guidance for at-risk carriers acknowledges that the evidence base is limited <sup class="c" data-ref="Benatar2025c" title="Source 54">54</sup>, and a 2024 workshop set out designs for C9orf72 prevention trials <sup class="c" data-ref="Benatar2025d" title="Source 55">55</sup>.`}
 ]}
];
const CU_QA=[
 {q:'Why are some motor neurons spared?',a:`Eye-movement nuclei, Onuf's nucleus and dorsal column pathways stay relatively preserved. A 2026 review calls their resilience mechanisms (antioxidant defence, calcium handling, glutamate receptor make-up, glial support) under-studied and a possible therapeutic avenue <sup class="c" data-ref="Inoue2026" title="Source 243">243</sup>.`},
 {q:'Can sporadic ALS be treated through TDP-43 itself?',a:`Silencing TDP-43 is probably not appropriate given its critical functions <sup class="c" data-ref="Becker2017" title="Source 44">44</sup>, and translating gain-of-function strategies into the clinic "has been challenging" <sup class="c" data-ref="EstevezFraga2026" title="Source 166">166</sup>.`},
 {q:'Is lowering a toxic product enough once nerve cells are dying?',a:`A review points to irreversible downstream cascades <sup class="c" data-ref="Ito2024" title="Source 245">245</sup>, and after BIIB078 the pathology "remained abundant" despite the drug reaching the tissue <sup class="c" data-ref="McEachin2025" title="Source 324">324</sup>.`},
 {q:'Is NfL a valid surrogate beyond SOD1-ALS?',a:`Unresolved. It supported approval only for tofersen, and NfL changes have not always matched clinical change <sup class="c" data-ref="FDA2023Qalsody,Zheng2026" title="Source 172,552">172,552</sup>.`},
 {q:'How should trials handle how differently ALS progresses?',a:`Heterogeneity still complicates trial design, and the field is moving toward biomarker-based stratification and markers of TDP-43 loss of function <sup class="c" data-ref="EstevezFraga2026,Westeneng2018" title="Source 166,535">166,535</sup>.`},
 {q:'Why do phase 2 signals so often fail in phase 3?',a:`A 2025 viewpoint names 6-month studies with function-based outcomes, multiplicity and over-interpretation of exploratory analyses as sources of "false hope" <sup class="c" data-ref="Benatar2025e" title="Source 56">56</sup>.`},
 {q:'When should a carrier start treatment, and who?',a:`Most SOD1 variant carriers in a population sample had no symptoms <sup class="c" data-ref="Gagliardi2026" title="Source 190">190</sup>, so prevention trials need markers of imminent onset such as rising NfL or mild motor impairment <sup class="c" data-ref="Benatar2022a,Benatar2025a" title="Source 50,52">50,52</sup>. ATLAS is designed to test this and has no results yet <sup class="c" data-ref="NCT04856982" title="Source 373">373</sup>.`}
];
inits.cure=()=>{
  const svg=$('#cuSvg'),rg=$('#cuT'),T=CU_TXT,S=CU_STEPS,FR=S.map(s=>s.from),NS=S.length;
  const HL=[ [0],[1],[1,2],[2,3],[4],[5,6],[0,1,2,3,4,5,6] ];
  const ACT=[0,1,1.5,3,4,5,null];
  let filter='all';
  const match=ev=>filter==='all'||ev===filter;
  const P=(x,y)=>`${f1(x)} ${f1(y)}`;
  function mk(x,y,ev,r,o){const st=`opacity:${f1(o)}`;
    if(ev==='est')return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--good);${st}"/>`;
    if(ev==='early')return `<path d="M${P(x,y-r*1.25)} L${P(x+r*1.25,y)} L${P(x,y+r*1.25)} L${P(x-r*1.25,y)}Z" style="fill:var(--warn);${st}"/>`;
    if(ev==='hyp')return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.85)}" style="fill:none;stroke:var(--umn);stroke-width:2;${st}"/>`;
    if(ev==='neg')return `<path d="M${P(x-r*.9,y-r*.9)} L${P(x+r*.9,y+r*.9)} M${P(x+r*.9,y-r*.9)} L${P(x-r*.9,y+r*.9)}" style="stroke:var(--bad);stroke-width:2.2;stroke-linecap:round;${st}"/>`;
    return `<rect x="${f1(x-r*.8)}" y="${f1(y-r*.8)}" width="${f1(r*1.6)}" height="${f1(r*1.6)}" style="fill:var(--muted);${st}"/>`}
  /* small pictures inside each pathway box, drawn around (0,0) */
  function glyph(k){
    if(k===0){let a='',b='',r='';for(let x=-24;x<=24;x+=2){const y=Math.sin(x/6)*9;a+=(x>-24?'L':'M')+P(x,y);b+=(x>-24?'L':'M')+P(x,-y)}
      for(let x=-21;x<=21;x+=6){const y=Math.sin(x/6)*9;r+=`M${P(x,y)}L${P(x,-y)}`}
      return `<path d="${r}" style="stroke:var(--muted);stroke-width:1.2"/><path d="${a}" style="fill:none;stroke:var(--steel);stroke-width:2.2"/><path d="${b}" style="fill:none;stroke:var(--tdp);stroke-width:2.2"/>`}
    if(k===1){let a='',r='';for(let x=-24;x<=24;x+=2){const y=Math.sin(x/5)*6;a+=(x>-24?'L':'M')+P(x,y)}
      for(let x=-22;x<=22;x+=5){const y=Math.sin(x/5)*6;r+=`M${P(x,y)}l0 8`}
      return `<path d="${r}" style="stroke:var(--muted);stroke-width:1.4"/><path d="${a}" style="fill:none;stroke:var(--tdp);stroke-width:2.2"/>`}
    if(k===2)return tdp(-3,0,1.8,1,0);
    if(k===3)return tdp(-5,-2,1.5,1,1)+tdp(10,7,.9,1,1);
    if(k===4)return lmn(-8,0,6.5,1,{axonLen:0})+`<g style="fill:none;stroke:var(--cell-line);stroke-width:1.4"><circle cx="15" cy="7" r="4" style="fill:var(--cell)"/><path d="M15 3 v-6 M19 7 h6 M15 11 v6 M11 7 h-5 M18 4 l4 -4 M18 10 l4 4"/></g>`;
    if(k===5)return umn(-15,5,5,1,{axonLen:0})+`<path d="M-15 9 Q-2 16 9 4" style="fill:none;stroke:var(--umn);stroke-width:1.8"/>`+lmn(14,3,5,1,{axonLen:0});
    return fibre(-24,-6,48,10,1)+fibre(-24,7,48,10,1);
  }
  function draw(t){
    const N=vb(svg,'720 400','400 760');
    const p=phaseOf(S,t),hl=HL[p];
    /* layout tables */
    const rowY=N?[40,90,176,226,276,326,376]:null;
    const L=N?{W:400,bw:60,bh:36,node:i=>({x:46,y:rowY[i]+18}),splice:{x:46,y:153},
               mkPos:(k,j)=>k===1.5?{x:236+j*12,y:153}:{x:236+(j%12)*12,y:rowY[k]+(j<12?11:25)},
               lh:438,lr:458,lc:1,colW:368,rows:16,foot:742}
             :{W:720,bw:70,bh:56,node:i=>({x:62+i*99.3,y:92}),splice:{x:(62+99.3+62+2*99.3)/2,y:52},
               mkPos:(k,j)=>k===1.5?{x:(62+99.3+62+2*99.3)/2-18+j*12,y:52}:{x:62+k*99.3-18+(j%4)*12,y:160+Math.floor(j/4)*12},
               lh:226,lr:248,lc:2,colW:352,rows:8,foot:390};
    let s=`<defs>${marker('cuA','var(--muted)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="22" class="t-sm" style="fill:var(--treat)">${T.head}</text><text x="${L.W-16}" y="22" class="t-sm t-end">${T.stepOf(p+1,NS)}</text>`;
    /* arrows between boxes, with a moving dash for the flow of disease */
    const off=f1(-t*260);
    for(let i=0;i<6;i++){const a=L.node(i),b=L.node(i+1);
      const d=N?`M${a.x} ${a.y+L.bh/2+2} V${b.y-L.bh/2-5}`:`M${a.x+L.bw/2+3} ${a.y} H${b.x-L.bw/2-6}`;
      s+=`<path d="${d}" class="arrow" marker-end="url(#cuA)" style="stroke-dasharray:5 4;stroke-dashoffset:${off}"/>`}
    /* the splicing point between RNA and protein */
    const spOn=p===2;
    if(N)s+=`<text x="88" y="157" class="t-xs" style="fill:${spOn?'var(--treat)':'var(--muted)'};font-weight:${spOn?700:500}">${T.splice}</text><circle cx="${L.splice.x}" cy="${L.splice.y}" r="${spOn?6:4}" style="fill:${spOn?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:1.6"/>`;
    else s+=`<text x="${f1(L.splice.x)}" y="40" class="t-xs t-mid" style="fill:${spOn?'var(--treat)':'var(--muted)'};font-weight:${spOn?700:500}">${T.splice}</text><path d="M${f1(L.splice.x)} 60 V80" style="stroke:var(--treat);stroke-width:1.4;stroke-dasharray:2 3;opacity:${spOn?1:.5}"/>`;
    /* boxes */
    for(let i=0;i<7;i++){const c=L.node(i),on=hl.includes(i),pu=on?.5+.5*Math.sin(t*70):0;
      if(on)s+=`<rect x="${f1(c.x-L.bw/2-4)}" y="${f1(c.y-L.bh/2-4)}" width="${L.bw+8}" height="${L.bh+8}" rx="14" style="fill:none;stroke:var(--treat);stroke-width:2;opacity:${f1(.3+.5*pu)}"/>`;
      s+=`<rect x="${f1(c.x-L.bw/2)}" y="${f1(c.y-L.bh/2)}" width="${L.bw}" height="${L.bh}" rx="10" style="fill:${on?'var(--treat-soft)':'var(--panel)'};stroke:${on?'var(--treat)':'var(--line)'};stroke-width:${on?2.2:1.3}"/>`;
      s+=`<g transform="translate(${f1(c.x)} ${f1(c.y)}) scale(${N?.72:1})">${glyph(i)}</g>`;
      if(N)s+=`<text x="88" y="${f1(c.y+4.5)}" class="t-lbl" style="fill:${on?'var(--ink)':'var(--muted)'}">${T.nodesN[i]}</text>`;
      else s+=`<text x="${f1(c.x)}" y="${f1(c.y+L.bh/2+16)}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${T.nodesW[i]}</text>`}
    /* route markers drop in as their step is reached */
    const cnt={};
    CU_MK.forEach(m=>{if(m.node===null)return;const j=cnt[m.node]=(cnt[m.node]??-1)+1;
      const a=ramp(t,FR[m.step],FR[m.step]+.03);if(a<=0)return;
      const q=L.mkPos(m.node,j),cur=m.step===p;
      s+=mk(q.x,q.y-8*(1-a),m.ev,cur?5:4,a*(match(m.ev)?1:.15))});
    /* lower area: the routes of this step */
    s+=`<line x1="16" x2="${L.W-16}" y1="${L.lh-16}" y2="${L.lh-16}" class="axis"/>`;
    s+=`<text x="16" y="${L.lh}" class="t-sm" style="fill:var(--treat)">${T.listHead[p]}</text>`;
    const items=CU_MK.filter(m=>m.step===p&&match(m.ev));
    const listCols=p===6&&!N?1:L.lc;
    if(!items.length)s+=`<text x="16" y="${L.lr}" class="t-xs" style="fill:var(--ink)">${T.none}</text>`;
    items.forEach((m,j)=>{const c=Math.floor(j/L.rows)%listCols,r=j%L.rows,x=16+c*L.colW,y=L.lr+r*16,a=ramp(t,FR[p],FR[p]+.03+j*.002);
      s+=`<g style="opacity:${f1(.2+.8*a)}">${mk(x+5,y-3.5,m.ev,4.5,1)}<text x="${x+18}" y="${y}" class="t-xs" style="fill:var(--ink)">${m.n}</text><text x="${x+L.colW-14}" y="${y}" class="t-xs t-end">${T.evShort[m.ev]}</text></g>`});
    if(p===6){
      const G=N?{x0:44,x1:384,y0:704,y1:534}:{x0:400,x1:700,y0:372,y1:244};
      const u=ramp(t,FR[6],.98),xm=lerp(.05,1,u);
      const nf=x=>.12+(x>.45?.8*Math.pow((x-.45)/.55,2):0),thr=.4,xc=.45+.55*Math.sqrt((thr-.12)/.8),on=.86;
      const X=x=>lerp(G.x0,G.x1,x),Y=v=>lerp(G.y0,G.y1,v);
      s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${G.y0}" y2="${G.y0}" class="axis"/><line x1="${G.x0}" x2="${G.x0}" y1="${G.y0}" y2="${G.y1-6}" class="axis"/>`;
      s+=`<text x="${G.x0+4}" y="${G.y1-10}" class="t-xs">${T.plot.y}</text><text x="${G.x1}" y="${G.y0+14}" class="t-xs t-end">${T.plot.x} →</text>`;
      s+=`<line x1="${f1(X(on))}" x2="${f1(X(on))}" y1="${G.y0}" y2="${G.y1}" class="grid"/><text x="${f1(X(on))}" y="${G.y1-10}" class="t-xs t-mid" style="fill:var(--ink)">${T.plot.onset}</text>`;
      s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(Y(thr))}" y2="${f1(Y(thr))}" style="stroke:var(--tdp);stroke-width:1.4;stroke-dasharray:6 4"/><text x="${G.x0+6}" y="${f1(Y(thr)-5)}" class="t-xs" style="fill:var(--tdp)">${T.plot.thr}</text>`;
      s+=`<path d="${pathFn(x=>nf(x*xm),G.x0,X(xm),G.y0,G.y1,80)}" style="fill:none;stroke:var(--steel);stroke-width:2.6"/>`;
      if(xm>=xc){s+=`<circle cx="${f1(X(xc))}" cy="${f1(Y(thr))}" r="6" style="fill:var(--treat)"/><text x="${f1(X(xc)-10)}" y="${f1(Y(thr)-16)}" class="t-xs t-end" style="fill:var(--treat);font-weight:700">${T.plot.rand}</text>`}
    }
    if(N)T.footN.forEach((l,q)=>{s+=`<text x="16" y="${L.foot+q*13}" class="t-xs">${l}</text>`});
    else s+=`<text x="16" y="${L.foot}" class="t-xs">${T.foot}</text>`;
    svg.innerHTML=s;
    setSt(p);
    const fl=T.filters.find(f=>f[0]===filter)[1];
    const li=items.length?'<ul>'+items.map(m=>`<li>${m.n}: ${T.evShort[m.ev]}</li>`).join('')+'</ul>':`<p>${T.none}</p>`;
    $('#cuNote').innerHTML=noteHTML(S[p])+`<div class="kv"><div><dt>${T.listHead[p]}</dt><dd>${li}</dd></div></div>`;
    $('#cuCap').textContent=T.cap(p+1,NS,fl);
  }
  function cards(){
    let h='';
    CU_CARDS.forEach(c=>{const its=c.items.filter(it=>filter==='all'||it.ev===filter);if(!its.length)return;
      h+=`<article class="card"><h4>${c.t}</h4>${c.lede?`<p>${c.lede}</p>`:''}`;
      its.forEach(it=>{h+=`<div class="cu-it"><p class="cu-h"><span class="ev ${it.ev}">${it.w||T.evLong[it.ev]}</span><b>${it.h}</b></p><p>${it.txt}</p>`+
        (it.reg||[]).map(r=>`<p class="cu-reg">${T.reg(r.n,r.id,T.st[r.s],r.d)}</p>`).join('')+'</div>'});
      h+='</article>'});
    $('#cuCards').innerHTML=h||`<p>${T.noCards}</p>`;
  }
  $('#cuQA').innerHTML=CU_QA.map(x=>`<details><summary>${x.q}</summary><p>${x.a}</p></details>`).join('');
  const stop=playWire(rg,$('#cuPlay'),draw,21000,UI.replay,'cure');
  const setSt=stepWire($('#cuSteps'),S,rg,draw,stop);
  toggleRow($('#cuFilter'),T.filters,'all',v=>{filter=v;draw(+rg.value);cards()});
  draw(+rg.value);cards();
};
/* =============== 5.1 history & people =============== */
const HI_LANES=[['Clinic & places','var(--umn)'],['People & public','var(--lmn)'],['Genes & proteins','var(--tdp)'],['Criteria & scales','var(--steel)'],['Drugs & regulators','var(--treat)']];
const HI_EV=[
 {y:1850,l:0,c:'Aran: progressive muscular atrophy',h:'Aran describes progressive muscular atrophy',t:'1850 · Progressive muscular atrophy',
  txt:`François-Amilcar Aran published a memoir describing and naming "progressive muscular atrophy". Duchenne de Boulogne later claimed priority, but a historian credits Aran with both the clinical description and the name, hence "Aran-Duchenne" disease <sup class="c" data-ref="Bonduelle1990" title="Source 68">68</sup>.`,
  pt:'Before ALS had its name, doctors in Paris described people whose muscles slowly wasted away.'},
 {y:1869,l:0,c:'Charcot & Joffroy: two lesions',h:'Charcot and Joffroy link two lesions to the signs',t:'1865–1869 · Two lesions, two sets of signs',
  txt:`Jean-Martin Charcot and Alix Joffroy linked lesions of the lateral columns of the spinal cord to progressive paralysis with contractures, and lesions of the anterior horns to paralysis with wasting <sup class="c" data-ref="Kumar2011" title="Source 275">275</sup>. Charcot's anatomo-clinical method used ALS to bring together primary amyotrophy and primary lateral sclerosis, which had been seen as separate disorders <sup class="c" data-ref="Goetz2000" title="Source 208">208</sup>.`,
  hook:'Lateral columns: the <b>upper</b> motor neuron pathway (stiffness). Anterior horns: the <b>lower</b> motor neurons (wasting). <sup class="c" data-ref="Kumar2011" title="Source 275">275</sup>'},
 {y:1874,l:0,c:'the name "ALS"',h:'Charcot names amyotrophic lateral sclerosis',t:'1874 · A name',
  txt:`When his lectures were compiled in 1874, Charcot offered the term "amyotrophic lateral sclerosis". ALS is still called Charcot's disease in many countries <sup class="c" data-ref="Kumar2011" title="Source 275">275</sup>. The name holds both halves of the disease: <i>amyotrophic</i>, muscle wasting, and <i>lateral sclerosis</i>, hardening of the lateral columns of the spinal cord.`,
  pt:'The name means, roughly, "muscles wasting, and hardening at the sides of the spinal cord".',
  hook:'Charcot named ALS: <i>amyotrophic</i> = muscle wasting (LMN), <i>lateral sclerosis</i> = hardened lateral columns (UMN). <sup class="c" data-ref="Kumar2011" title="Source 275">275</sup>'},
 {y:1939.33,l:1,c:'Lou Gehrig leaves baseball',h:'Lou Gehrig ends his streak',t:'1939 · Lou Gehrig',
  txt:`The New York Yankees player Lou Gehrig ended his streak of 2130 consecutive games on 2 May 1939 and died on 2 June 1941 <sup class="c" data-ref="BaseballHallGehrig" title="Source 42">42</sup>. In the United States ALS is often called Lou Gehrig's disease. Film analysis found he moved normally in January 1938, with visible signs only after May 1938, and a photograph from October 1939 shows wasting of his hands <sup class="c" data-ref="Lewis2007" title="Source 289">289</sup>.`,
  pt:'A famous baseball player made the disease widely known in America.'},
 {y:1958,l:0,c:'Guam registry begins',h:'Guam: a high-incidence focus',t:'1958 · Guam',
  txt:`From the mid-1950s, ALS and parkinsonism-dementia complex were far more common on Guam than anywhere else, and a registry began in 1958 <sup class="c" data-ref="Plato2002" title="Source 424">424</sup>. Incidence then fell steadily over the next 40 years, which the authors put down to westernisation rather than genetics <sup class="c" data-ref="Plato2003" title="Source 425">425</sup>. See the card on Guam below for the cycad hypothesis.`},
 {y:1963,l:1,c:'Stephen Hawking diagnosed',h:'Stephen Hawking is diagnosed',t:'1963 · Stephen Hawking',
  txt:`Tests soon after Stephen Hawking's 21st birthday in 1963 showed motor neurone disease, and he was given about two years to live. He had a tracheostomy in 1985 after pneumonia and died at home in Cambridge on 14 March 2018 <sup class="c" data-ref="HawkingBiography" title="Source 221">221</sup>. His roughly 55-year course lies far out in the long-survivor tail: a review puts survival beyond 10 years at 10-20%, a later register analysis at 7% <sup class="c" data-ref="Chio2009,Pupillo2025" title="Source 104,435">104,435</sup>.`,
  pt:'Some people live with ALS for many years. Stephen Hawking lived with it for about 55 years.'},
 {y:1993,l:2,c:'SOD1, the first ALS gene',h:'SOD1, the first ALS gene',t:'1993 · SOD1',
  txt:`Tight linkage to chromosome 21q led to 11 different SOD1 missense mutations in 13 families with familial ALS. SOD1 encodes a copper-zinc enzyme that converts superoxide. The paper said about 10% of ALS is inherited <sup class="c" data-ref="Rosen1993" title="Source 456">456</sup>; population registers later put it nearer 5% <sup class="c" data-ref="Byrne2011" title="Source 86">86</sup>. <a href="#genes" data-go="genes">Genes</a>`,
  hook:'<b>1993</b>: SOD1, the first ALS gene, on chromosome 21. Thirty years later it became the target of tofersen. <sup class="c" data-ref="Rosen1993,DrugsFDA" title="Source 149,456">149,456</sup>'},
 {y:1994,l:3,c:'El Escorial criteria',h:'The El Escorial criteria',t:'1994 · El Escorial',
  txt:`The World Federation of Neurology published the El Escorial criteria for diagnosing ALS <sup class="c" data-ref="Brooks1994" title="Source 74">74</sup>. A revision from a meeting at Airlie House followed in 2000 <sup class="c" data-ref="Brooks2000" title="Source 75">75</sup>. <a href="#dx" data-go="dx">Diagnosis &amp; criteria</a>`},
 {y:1994.25,l:4,c:'riluzole trial: 74% vs 58%',h:'A riluzole trial reports longer survival',t:'1994 · The riluzole trial',
  txt:`In a controlled trial, 1-year survival was 74% with riluzole against 58% with placebo <sup class="c" data-ref="Bensimon1994" title="Source 57">57</sup>. <a href="#drugs" data-go="drugs">Riluzole, edaravone and others</a>`},
 {y:1995.95,l:4,c:'FDA approves riluzole',h:'FDA approves riluzole (Rilutek)',t:'1995 · Riluzole approved',
  txt:`The FDA approved riluzole tablets (Rilutek) on 12 December 1995 <sup class="c" data-ref="DrugsFDA" title="Source 149">149</sup>. An oral suspension followed in 2018 <sup class="c" data-ref="DrugsFDA" title="Source 149">149</sup>.`},
 {y:1999,l:3,c:'ALSFRS-R published',h:'The ALSFRS-R rating scale',t:'1999 · ALSFRS-R',
  txt:`The revised ALS Functional Rating Scale added breathing items (breathlessness, breathlessness lying flat, need for ventilatory support) to the original scale <sup class="c" data-ref="Cedarbaum1999" title="Source 94">94</sup>. It has 12 items scored 0-4, a total of 0 to 48 <sup class="c" data-ref="Boddy2025" title="Source 66">66</sup>. <a href="#course" data-go="course">ALSFRS-R and the course</a>`},
 {y:2006.75,l:2,c:'TDP-43 found in the clumps',h:'TDP-43, the main protein in the clumps',t:'2006 · TDP-43',
  txt:`TDP-43 was identified as the major disease protein in the ubiquitinated inclusions of both ALS and frontotemporal lobar degeneration (FTLD-U) <sup class="c" data-ref="Neumann2006" title="Source 392">392</sup>. One protein now tied the two diseases together. <a href="#tdp43" data-go="tdp43">TDP-43 and what goes wrong</a>`,
  pt:'Scientists found which protein builds up in clumps inside the affected nerve cells.',
  hook:'<b>2006</b>: TDP-43 inclusions in both ALS and FTD. <sup class="c" data-ref="Neumann2006" title="Source 392">392</sup>'},
 {y:2008.2,l:2,c:'TARDBP variants',h:'Mutations in TARDBP, the TDP-43 gene',t:'2008 · TARDBP',
  txt:`Mutations in TARDBP, the gene for TDP-43, were found in sporadic and familial ALS, and the M337V variant segregated with disease in one family <sup class="c" data-ref="Sreedharan2008" title="Source 483">483</sup>. A change in the clumping protein could itself cause ALS.`},
 {y:2009.2,l:2,c:'FUS variants',h:'FUS mutations in familial ALS',t:'2009 · FUS',
  txt:`13 mutations in FUS on chromosome 16 were found specifically in familial ALS, and mutant FUS built up in the cytoplasm of neurons <sup class="c" data-ref="Kwiatkowski2009" title="Source 279">279</sup>.`},
 {y:2011.7,l:2,c:'C9orf72 repeat expansion',h:'C9orf72, a repeat expansion',t:'2011 · C9orf72',
  txt:`Two teams found an expanded GGGGCC repeat in the C9orf72 gene. It explained 23.5% of familial ALS in one series <sup class="c" data-ref="DeJesusHernandez2011" title="Source 137">137</sup>, and 46.0% of familial and 21.1% of sporadic ALS in Finland <sup class="c" data-ref="Renton2011" title="Source 448">448</sup>. Controls carried 2-23 repeats, against an estimated 700-1600 in people with FTD/ALS <sup class="c" data-ref="DeJesusHernandez2011" title="Source 137">137</sup>. In Europe it is the most common genetic finding in familial ALS (33.7%) <sup class="c" data-ref="Zou2017" title="Source 555">555</sup>.`,
  hook:'<b>2011</b>: C9orf72 GGGGCC expansion, the main genetic link between ALS and FTD. <sup class="c" data-ref="DeJesusHernandez2011,Renton2011" title="Source 137,448">137,448</sup>'},
 {y:2012.15,l:3,c:'King\'s staging',h:'King\'s clinical staging proposed',t:'2012 · King\'s staging',
  txt:`A London clinic database of 1471 people was used to define King's stages: 1 onset, 2A diagnosis, 2B a second region, 3 a third region, 4A gastrostomy and 4B non-invasive ventilation <sup class="c" data-ref="Roche2012" title="Source 451">451</sup>. MiToS staging followed in 2015 <sup class="c" data-ref="Chio2015MiToS" title="Source 111">111</sup>.`},
 {y:2014.6,l:1,c:'Ice Bucket Challenge',h:'The Ice Bucket Challenge',t:'2014 · Ice buckets',
  txt:`In 2014 people filmed themselves pouring ice water over their heads and challenged others to do the same or donate. Reporting in July 2016 put the ALS Association's receipts at more than $100 million, part of which funded the Project MinE genome study <sup class="c" data-ref="CBS2016IceBucket" title="Source 93">93</sup>.`,
  pt:'A viral online challenge raised a lot of money for ALS research.'},
 {y:2016.5,l:2,c:'NEK1 found via Project MinE',h:'NEK1, a risk gene from Project MinE',t:'2016 · NEK1',
  txt:`Project MinE investigators analysed the exomes of 1022 familial index cases with replication in sporadic cases, and found NEK1 risk variants in nearly 3% of ALS <sup class="c" data-ref="Kenna2016" title="Source 259">259</sup>. NEK1 is classed as a susceptibility gene: it raises risk rather than causing disease on its own <sup class="c" data-ref="ClinGen2026" title="Source 116">116</sup>.`},
 {y:2017.34,l:4,c:'FDA approves edaravone',h:'FDA approves edaravone (Radicava)',t:'2017 · Edaravone',
  txt:`The FDA approved intravenous edaravone (Radicava) on 5 May 2017, and an oral suspension on 12 May 2022 <sup class="c" data-ref="DrugsFDA" title="Source 149">149</sup>. In Europe the marketing application was withdrawn in May 2019 <sup class="c" data-ref="EMA2019Radicava" title="Source 158">158</sup>.`},
 {y:2017.5,l:3,c:'ALS-FTSD criteria',h:'ALS-frontotemporal spectrum criteria',t:'2017 · ALS-FTSD',
  txt:`Revised criteria defined the ALS-frontotemporal spectrum disorder. The consensus describes neuropsychological deficits in over 50% of people with ALS <sup class="c" data-ref="Strong2017" title="Source 487">487</sup>.`},
 {y:2020.5,l:3,c:'Gold Coast criteria',h:'Gold Coast criteria proposed',t:'2020 · Gold Coast',
  txt:`New diagnostic criteria for ALS were proposed at a meeting on the Gold Coast in Australia <sup class="c" data-ref="Shefner2020" title="Source 464">464</sup>. <a href="#dx" data-go="dx">Try them in Diagnosis &amp; criteria</a>`},
 {y:2022.74,l:4,c:'FDA approves Relyvrio',h:'FDA approves AMX0035 (Relyvrio)',t:'2022 · AMX0035',
  txt:`The FDA approved sodium phenylbutyrate-taurursodiol (AMX0035, Relyvrio) on 29 September 2022 <sup class="c" data-ref="DrugsFDA" title="Source 149">149</sup>, supported by the phase 2 CENTAUR trial <sup class="c" data-ref="Paganoni2020,Paganoni2021" title="Source 415,416">415,416</sup>.`},
 {y:2023.31,l:4,c:'tofersen: accelerated approval',h:'Tofersen for SOD1-ALS',t:'2023 · Tofersen',
  txt:`On 25 April 2023 the FDA gave tofersen (Qalsody), an antisense drug for ALS with SOD1 variants, accelerated approval based on a fall in plasma neurofilament light <sup class="c" data-ref="DrugsFDA,FDA2023Qalsody" title="Source 149,172">149,172</sup>. Its phase 3 trial was reported in 2022 <sup class="c" data-ref="Miller2022" title="Source 335">335</sup>, and the presymptomatic ATLAS trial is the confirmatory study <sup class="c" data-ref="Biogen2023" title="Source 61">61</sup>. The EU authorised it on 29 May 2024 under exceptional circumstances <sup class="c" data-ref="EMA2024Qalsody" title="Source 160">160</sup>. <a href="#tofersen" data-go="tofersen">Tofersen</a>`,
  hook:'Tofersen (2023): accelerated approval on a <b>biomarker</b>, neurofilament light, for <b>SOD1</b>-ALS only. <sup class="c" data-ref="DrugsFDA,FDA2023Qalsody" title="Source 149,172">149,172</sup>'},
 {y:2024.26,l:4,c:'Relyvrio withdrawal begins',h:'PHOENIX fails and withdrawal begins',t:'2024 · PHOENIX',
  txt:`The phase 3 PHOENIX trial in 664 people missed its primary endpoint and all secondary endpoints (announced 8 March 2024). On 4 April 2024 Amylyx began withdrawing the drug in the US and Canada and stopped new starts <sup class="c" data-ref="Amylyx2024" title="Source 17">17</sup>. Canada's exit was set for 31 December 2024 <sup class="c" data-ref="HC_Albrioza" title="Source 226">226</sup>.`},
 {y:2025.66,l:4,c:'FDA withdraws the approval',h:'FDA formally withdraws Relyvrio\'s approval',t:'2025 · Approval withdrawn',
  txt:`An FDA Federal Register notice published on 29 August 2025 (FR Doc. 2025-16646) formally withdrew the approval of NDA 216660; the notice records that marketing had stopped on 31 October 2024 <sup class="c" data-ref="FDA2025RelyvrioFR" title="Source 175">175</sup>. Drugs@FDA now lists the product as discontinued <sup class="c" data-ref="DrugsFDA" title="Source 149">149</sup>.`,
  pt:'A medicine can be approved early and later withdrawn if a larger trial does not confirm the benefit.',
  hook:'A phase 2 result is not phase 3 proof: AMX0035 was withdrawn about 19 months after US approval. <sup class="c" data-ref="Paganoni2020,Amylyx2024" title="Source 17,415">17,415</sup> Formal FDA withdrawal followed in 2025 <sup class="c" data-ref="FDA2025RelyvrioFR" title="Source 175">175</sup>.'}
];
const HI_ERA=[{f:1845,a:1850,t:'Paris: first descriptions'},{f:1939,a:1939.4,t:'A public face'},{f:1993,a:1993.05,t:'A gene and a drug'},{f:2006,a:2006.8,t:'TDP-43 and C9orf72'},{f:2014,a:2014.65,t:'Ice buckets and big data'},{f:2022,a:2022.8,t:'Approvals and withdrawals'}];
const HI_TXT={
 start:'Press Play: the first milestone is 1850',
 notYet:'the playhead has not reached this era yet',
 read:(y,n,m,e)=>`<span>year <b>${y}</b></span><span>milestones passed <b>${n} of ${m}</b></span><span>era <b>${e}</b></span>`,
 intro:{k:'1845',t:'Before the first descriptions',txt:'Press Play, drag the timeline, or choose a milestone below.',pt:'The story starts in Paris in 1850.'},
 /* scene labels */
 s1:{pma:'progressive muscular atrophy',two:'two lesions, two sets of signs',als:'amyotrophic lateral sclerosis',lat:'lateral columns',ant:'anterior horns',e1:'amyotrophic: muscle wasting',e2:'lateral sclerosis: hard sides',wall:'PARIS'},
 s2:{games:'2130',gamesL:'games in a row',guam:'Guam, registry from 1958',hawk:'Hawking, diagnosed 1963'},
 s3:{sod:'SOD1',chr:'chromosome 21',crit:'El Escorial criteria',rev:'revised 2000',surv:'1-year survival',ril:'riluzole',pla:'placebo',bottle:'riluzole, FDA 1995',frs:'ALSFRS-R',frs2:'12 items · 0 to 48'},
 s4:{nuc:'nucleus',clump:'TDP-43 clumps',tardbp:'TARDBP',fus:'FUS',c9:'C9orf72 GGGGCC repeat',usual:'usual: 2-23 copies',exp:'expanded: about 700-1600',kings:'King\'s stages',st:['1','2A','2B','3','4']},
 s5:{ice:'Ice Bucket Challenge',money:'more than $100 million',mine:'Project MinE exomes',nek:'NEK1 variants: nearly 3%',eda:'edaravone, FDA 2017',ftsd:['ALS-FTSD','2017'],gold:['Gold Coast','2020']},
 s6:{amx:'AMX0035 (Relyvrio)',amx1:'FDA approved 2022',amx2:'withdrawal began 2024',amx3:'APPROVAL WITHDRAWN',amx3b:'Federal Register, 2025',tof:'tofersen (Qalsody)',tof0:'phase 3 reported 2022',tof1:'accelerated approval 2023',tof2:'EU authorised 2024',mrna:'SOD1 mRNA',aso:'antisense strand',binds:'binds the message, less SOD1 made'},
 cards:[
  {t:'Aran or Duchenne?',txt:`Two Paris physicians described progressive muscular atrophy around 1850, and both claimed it. A historian credits Aran with the clinical description and the name, which is why the condition was long called "Aran-Duchenne" disease <sup class="c" data-ref="Bonduelle1990" title="Source 68">68</sup>.`},
  {t:'One disease, several names',txt:`Amyotrophic lateral sclerosis, Charcot's disease in many countries <sup class="c" data-ref="Kumar2011" title="Source 275">275</sup>, Lou Gehrig's disease in the United States, and motor neuron disease (MND), the umbrella term used in the UK. Studies of "motor neuron disease" may also count PLS and PMA <sup class="c" data-ref="GBD2016MND2018" title="Source 197">197</sup>.`,names:['ALS','Charcot\'s disease','Lou Gehrig\'s disease','motor neuron disease (MND)']},
  {t:'Guam: a cluster that faded',ev:'hyp',evl:'Hypothesis, contested',txt:`ALS was far more common on Guam from the mid-1950s, then declined over 40 years <sup class="c" data-ref="Plato2002,Plato2003" title="Source 424,425">424,425</sup>. Macaques fed the cycad amino acid BMAA developed motor and parkinsonian features <sup class="c" data-ref="Spencer1987" title="Source 481">481</sup>, and eating flying foxes that feed on cycad seeds was proposed as a route <sup class="c" data-ref="CoxSacks2002" title="Source 121">121</sup>. One laboratory found no free BMAA in brains of Chamorros with the disease <sup class="c" data-ref="Montine2005" title="Source 344">344</sup>.`},
  {t:'Approval is not the last word',txt:`AMX0035 went from approval in 2022 to withdrawal after its phase 3 trial failed <sup class="c" data-ref="Amylyx2024" title="Source 17">17</sup>. Edaravone was approved in the US, while its EU application was withdrawn <sup class="c" data-ref="DrugsFDA,EMA2019Radicava" title="Source 149,158">149,158</sup> and the 2024 EAN guideline does not recommend it <sup class="c" data-ref="VanDamme2024EAN" title="Source 507">507</sup>. Tofersen's approval is conditional on the confirmatory ATLAS trial <sup class="c" data-ref="Biogen2023" title="Source 61">61</sup>.`},
  {t:'The long tail',txt:`Median survival is 2-4 years <sup class="c" data-ref="Feldman2022" title="Source 180">180</sup>, yet some people live far longer. In the Lombardy register 7% were alive at 10 years and 3% at 15 <sup class="c" data-ref="Pupillo2025" title="Source 435">435</sup>. Stephen Hawking lived about 55 years after his diagnosis <sup class="c" data-ref="HawkingBiography" title="Source 221">221</sup>.`}
 ]
};
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  /* compressed axis: 1845-1935 gets 16%, 1935-1990 20%, 1990-2026 64% */
  const fx=y=>y<=1935?lerp(0,.16,(y-1845)/90):y<=1990?lerp(.16,.36,(y-1935)/55):lerp(.36,1,(y-1990)/36);
  const fy=u=>u<=.16?1845+u/.16*90:u<=.36?1935+(u-.16)/.2*55:1990+(u-.36)/.64*36;
  const tOfY=y=>clamp(fx(y));
  let XA=170,XB=704;
  const xOf=y=>XA+(XB-XA)*fx(y);
  const steps=HI_ERA.map((E,i)=>({from:i?tOfY(E.f):0,at:Math.min(1,tOfY(E.a)+.003),t:E.t}));
  const eraOf=y=>{let e=0;HI_ERA.forEach((E,i)=>{if(y>=E.f)e=i});return e};
  const T=(x,y,c,st,v)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const RC=(x,y,w,h,st,r=4)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const CI=(x,y,r,st)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="${st}"/>`;
  const PANEL='fill:var(--panel);stroke:var(--line)';
  const doc=(x,y,w,l1,l2,col)=>RC(x,y,w,56,PANEL,6)+LN(x+10,y+12,x+w-10,y+12,`stroke:${col};stroke-width:2`)+LN(x+10,y+20,x+w-24,y+20,'stroke:var(--line);stroke-width:2')+LN(x+10,y+28,x+w-16,y+28,'stroke:var(--line);stroke-width:2')+T(x+w/2,y+42,'t-xs t-mid',`fill:${col};font-weight:600`,l1)+T(x+w/2,y+52,'t-xs t-mid','',l2);

  /* ---------- one scene per era. Each is drawn in a 372 x 232 box at (o.x, o.y) ---------- */
  function hall(o,yr){const S=HI_TXT.s1;let s='';               // 1850-1938: a Paris lecture hall
    for(let i=0;i<3;i++){const x=o.x+14+i*50,y=o.y+18;
      s+=`<path d="M${x} ${y+62} v-44 a17 17 0 0 1 34 0 v44 z" style="fill:var(--air-soft);stroke:var(--line);stroke-width:1.4"/>`+LN(x+17,y+1,x+17,y+62,'stroke:var(--line)')+LN(x,y+34,x+34,y+34,'stroke:var(--line)')}
    s+=T(o.x+14,o.y+14,'t-xs','letter-spacing:.2em',S.wall);
    const B={x:o.x+176,y:o.y+8,w:192,h:128};
    s+=RC(B.x,B.y,B.w,B.h,'fill:var(--panel-2);stroke:var(--muted);stroke-width:2',4);
    s+=T(B.x+10,B.y+18,'t-xs','fill:var(--ink);font-weight:700',yr<1869?S.pma:yr<1874?S.two:S.als);
    if(yr<1869){s+=fibre(B.x+16,B.y+52,160,24,1,{atrophy:0})+fibre(B.x+16,B.y+86,160,24,1,{atrophy:.65})}
    else{const cx=B.x+50,cy=B.y+66;
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="42" ry="31" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
      s+=`<path transform="translate(${cx} ${cy})" d="M-6 -4 C-14 -22 -26 -24 -24 -14 C-22 -6 -14 -2 -10 2 C-18 10 -24 20 -16 22 C-8 22 -4 10 0 6 C4 10 8 22 16 22 C24 20 18 10 10 2 C14 -2 22 -6 24 -14 C26 -24 14 -22 6 -4 Z" style="fill:var(--panel);stroke:var(--cell-line)"/>`;
      s+=`<ellipse cx="${cx-31}" cy="${cy-4}" rx="7" ry="11" style="fill:var(--umn-soft);stroke:var(--umn);stroke-width:1.8"/><ellipse cx="${cx+31}" cy="${cy-4}" rx="7" ry="11" style="fill:var(--umn-soft);stroke:var(--umn);stroke-width:1.8"/>`;
      s+=CI(cx-14,cy+15,5,'fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.8')+CI(cx+14,cy+15,5,'fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.8');
      s+=LN(cx+38,cy-8,B.x+94,B.y+42,'stroke:var(--umn)')+T(B.x+96,B.y+45,'t-xs','fill:var(--umn);font-weight:600',S.lat);
      s+=LN(cx+19,cy+17,B.x+94,B.y+90,'stroke:var(--lmn)')+T(B.x+96,B.y+93,'t-xs','fill:var(--lmn);font-weight:600',S.ant);
      if(yr>=1874)s+=T(B.x+10,B.y+112,'t-xs','fill:var(--ink)',S.e1)+T(B.x+10,B.y+123,'t-xs','fill:var(--ink)',S.e2)}
    /* lecturer with a pointer */
    const lx=o.x+152,ly=o.y+112;
    s+=CI(lx,ly,8,'fill:var(--panel);stroke:var(--ink);stroke-width:1.6')+`<path d="M${lx-11} ${ly+48} l4 -36 h14 l4 36 z" style="fill:var(--ink);opacity:.8"/>`+LN(lx+6,ly+16,B.x+20,B.y+B.h-30,'stroke:var(--ink);stroke-width:1.6');
    /* audience in two tiers */
    for(let r=0;r<2;r++)for(let i=0;i<8;i++){const x=o.x+22+i*44+r*18,y=o.y+186+r*26;if(x>o.x+360)continue;
      s+=`<path d="M${x-13} ${y+14} q13 -16 26 0" style="fill:var(--panel-2);stroke:var(--muted)"/>`+CI(x,y-2,7,'fill:var(--panel-2);stroke:var(--muted)')}
    s+=LN(o.x+4,o.y+202,o.x+368,o.y+202,'stroke:var(--line);stroke-width:2')+LN(o.x+4,o.y+228,o.x+368,o.y+228,'stroke:var(--line);stroke-width:2');
    return s}

  function stadium(o,yr){const S=HI_TXT.s2;let s='';             // 1939-1992: a ballpark, then Guam and a wheelchair
    s+=`<path d="M${o.x+8} ${o.y+128} Q${o.x+104} ${o.y+20} ${o.x+200} ${o.y+128}" style="fill:none;stroke:var(--panel-2);stroke-width:22"/>`;
    const r=rng(7);for(let i=0;i<34;i++){const u=i/33,x=lerp(o.x+16,o.y*0+o.x+192,u),y=o.y+128-4*u*(1-u)*96+(r()-.5)*10;s+=CI(x,y,2.2,`fill:var(--muted);opacity:${f1(.4+.4*r())}`)}
    const dx=o.x+104,dy=o.y+164;
    s+=`<path d="M${dx} ${dy-48} L${dx+48} ${dy} L${dx} ${dy+48} L${dx-48} ${dy} Z" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.6"/>`;
    [[0,-48],[48,0],[-48,0]].forEach(([a,b])=>s+=RC(dx+a-4,dy+b-4,8,8,'fill:var(--panel);stroke:var(--ink)',1));
    s+=`<path d="M${dx-5} ${dy+44} h10 l-5 6z" style="fill:var(--panel);stroke:var(--ink)"/>`+CI(dx,dy,5,'fill:var(--food-soft);stroke:var(--food)');
    s+=CI(dx+10,dy+34,5,'fill:var(--lmn);opacity:.9')+LN(dx+10,dy+39,dx+10,dy+50,'stroke:var(--lmn);stroke-width:3;stroke-linecap:round');
    s+=RC(o.x+56,o.y+6,96,40,PANEL,5)+T(o.x+104,o.y+28,'t-big t-mid','',S.games)+T(o.x+104,o.y+41,'t-xs t-mid','',S.gamesL);
    if(yr>=1958){const gx=o.x+290,gy=o.y+58;
      s+=`<ellipse cx="${gx}" cy="${gy}" rx="52" ry="11" style="fill:var(--food-soft);stroke:var(--food);stroke-width:1.4"/>`;
      s+=`<path d="M${gx+4} ${gy-4} q-4 -22 4 -40" style="fill:none;stroke:var(--food);stroke-width:3;stroke-linecap:round"/>`;
      [-1,-.4,.4,1].forEach(k=>s+=`<path d="M${gx+8} ${gy-44} q${f1(12*k)} -6 ${f1(22*k)} 8" style="fill:none;stroke:var(--good);stroke-width:2.4;stroke-linecap:round"/>`);
      for(let k=0;k<3;k++)s+=`<path d="M${gx-66+k*44} ${gy+20} q10 -6 20 0 q10 6 20 0" style="fill:none;stroke:var(--air);stroke-width:1.4;opacity:.7"/>`;
      s+=T(o.x+226,o.y+96,'t-xs','fill:var(--ink)',S.guam)}
    if(yr>=1963){const wx=o.x+292,wy=o.y+176;
      s+=CI(wx-6,wy+14,24,'fill:none;stroke:var(--ink);stroke-width:2.4')+CI(wx+34,wy+32,7,'fill:none;stroke:var(--ink);stroke-width:2');
      s+=`<path d="M${wx-22} ${wy-34} L${wx-14} ${wy+4} H${wx+28} L${wx+34} ${wy+24}" style="fill:none;stroke:var(--ink);stroke-width:2.4;stroke-linejoin:round"/>`;
      s+=CI(wx-6,wy-30,8,'fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.6')+`<path d="M${wx-12} ${wy-20} q8 18 18 22 h14" style="fill:none;stroke:var(--lmn);stroke-width:5;stroke-linecap:round"/>`;
      s+=RC(wx+30,wy-22,24,16,'fill:var(--steel-soft);stroke:var(--steel)',3);
      s+=T(o.x+218,o.y+228,'t-xs','fill:var(--ink)',S.hawk)}
    return s}

  function genes(o,yr){const S=HI_TXT.s3;let s='';               // 1993-2005: a helix, a checklist, a pill bottle
    const hx=o.x+40,top=o.y+12,bot=o.y+200;
    let a='',b='';for(let i=0;i<=40;i++){const y=lerp(top,bot,i/40),ph=i/40*Math.PI*4;a+=(i?'L':'M')+f1(hx+16*Math.sin(ph))+' '+f1(y);b+=(i?'L':'M')+f1(hx-16*Math.sin(ph))+' '+f1(y);
      if(i%2===0&&i<40)s+=LN(hx+16*Math.sin(ph),y,hx-16*Math.sin(ph),y,`stroke:${y>o.y+88&&y<o.y+114?'var(--tdp)':'var(--line)'};stroke-width:2`)}
    s+=`<path d="${a}" style="fill:none;stroke:var(--steel);stroke-width:2.4"/><path d="${b}" style="fill:none;stroke:var(--umn);stroke-width:2.4"/>`;
    s+=RC(hx-22,o.y+86,44,30,'fill:none;stroke:var(--tdp);stroke-width:2;stroke-dasharray:3 2',6);
    s+=T(hx+30,o.y+100,'t-lbl','fill:var(--tdp)',S.sod)+T(hx+30,o.y+113,'t-xs','',S.chr);
    if(yr>=1994){const cx=o.x+180,cy=o.y+8;
      s+=RC(cx,cy,186,78,PANEL,6)+T(cx+10,cy+16,'t-xs','fill:var(--ink);font-weight:600',S.crit);
      for(let k=0;k<3;k++)s+=`<path d="M${cx+12} ${cy+30+k*15} l4 5 l9 -10" style="fill:none;stroke:var(--steel);stroke-width:2"/>`+LN(cx+32,cy+29+k*15,cx+150-k*24,cy+29+k*15,'stroke:var(--line);stroke-width:2');
      if(yr>=2000)s+=T(cx+178,cy+72,'t-xs t-end','fill:var(--steel)',S.rev)}
    if(yr>=1994.25){const vx=o.x+180,vy=o.y+104;
      s+=T(vx,vy,'t-xs','fill:var(--ink);font-weight:600',S.surv);
      [[S.ril,74,'var(--treat)'],[S.pla,58,'var(--muted)']].forEach(([l,v,c],k)=>{const y=vy+12+k*20;
        s+=T(vx,y+8,'t-xs','',l)+RC(vx+56,y,110,10,'fill:var(--panel-2)',5)+RC(vx+56,y,110*v/100,10,`fill:${c}`,5)+T(vx+56+110*v/100+5,y+9,'t-xs','fill:var(--ink)',v+'%')})}
    if(yr>=1995.95){const bx=o.x+96,by=o.y+146;
      s+=RC(bx+6,by,32,12,'fill:var(--treat);opacity:.85',3)+RC(bx,by+12,44,48,'fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.6',6)+RC(bx+6,by+26,32,16,PANEL,3);
      s+=T(o.x+76,o.y+222,'t-xs','fill:var(--treat)',S.bottle)}
    if(yr>=1999){const fx2=o.x+180,fy2=o.y+160;
      s+=RC(fx2,fy2,186,62,PANEL,6)+T(fx2+10,fy2+18,'t-lbl','',S.frs)+T(fx2+80,fy2+18,'t-xs','',S.frs2);
      for(let k=0;k<12;k++){const v=[4,4,3,4,3,3,2,3,2,4,4,3][k];s+=RC(fx2+10+k*14,fy2+30+(4-v)*5,10,v*5+2,'fill:var(--steel);opacity:.7',2)}}
    return s}

  function protein(o,yr){const S=HI_TXT.s4;let s='';             // 2006-2013: a neuron with TDP-43 clumps, then the genes
    const cx=o.x+84,cy=o.y+104;
    [[-1.9,70],[-1.2,64],[-.5,58],[2.5,62],[1.9,56]].forEach(([a,L])=>s+=`<path d="M${f1(cx+Math.cos(a)*54)} ${f1(cy+Math.sin(a)*54)} L${f1(cx+Math.cos(a)*(54+L*.6))} ${f1(cy+Math.sin(a)*(54+L*.6))}" style="stroke:var(--cell-line);stroke-width:5;stroke-linecap:round"/>`);
    s+=`<path d="M${cx+40} ${cy+40} q30 30 40 84" style="fill:none;stroke:var(--axon);stroke-width:6;stroke-linecap:round"/>`;
    s+=CI(cx,cy,58,'fill:var(--cell);stroke:var(--cell-line);stroke-width:2')+CI(cx-6,cy-6,24,'fill:var(--panel);stroke:var(--nuc);stroke-width:2');
    s+=tdp(cx-16,cy-15,1,.55,0)+tdp(cx-4,cy-4,1,.4,0);
    const r=rng(11);for(let k=0;k<6;k++){const a=k/6*6.283+.4,d=40+r()*8;s+=tdp(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.9,1.15,1,1)}
    s+=T(cx-6,cy+12,'t-xs t-mid','fill:var(--nuc)',S.nuc)+T(o.x+8,o.y+222,'t-xs','fill:var(--tdp);font-weight:600',S.clump);
    const gx=o.x+192;
    if(yr>=2008.2)s+=RC(gx,o.y+8,76,24,'fill:var(--tdp-soft);stroke:var(--tdp)',12)+T(gx+38,o.y+24,'t-xs t-mid','fill:var(--tdp);font-weight:700',S.tardbp);
    if(yr>=2009.2)s+=RC(gx+86,o.y+8,62,24,'fill:var(--tdp-soft);stroke:var(--tdp)',12)+T(gx+117,o.y+24,'t-xs t-mid','fill:var(--tdp);font-weight:700',S.fus);
    if(yr>=2011.7){const y0=o.y+58;
      s+=T(gx,y0,'t-xs','fill:var(--ink);font-weight:600',S.c9);
      s+=T(gx,y0+18,'t-xs','',S.usual);for(let k=0;k<3;k++)s+=RC(gx+k*11,y0+24,9,9,'fill:var(--steel);opacity:.8',2);
      s+=T(gx,y0+50,'t-xs','fill:var(--tdp)',S.exp);const n=Math.round(lerp(4,15,ramp(yr,2011.7,2012.3)));
      for(let k=0;k<n;k++)s+=RC(gx+k*11,y0+56,9,9,'fill:var(--tdp)',2);
      if(n>=15)s+=T(gx+168,y0+64,'t-xs','fill:var(--tdp)','…')}
    if(yr>=2012.15){const kx=gx,ky=o.y+226;
      s+=T(kx,o.y+150,'t-xs','fill:var(--ink);font-weight:600',S.kings);
      S.st.forEach((l,k)=>{const h=12+k*11;s+=RC(kx+k*34,ky-h,30,h,`fill:var(--steel);opacity:${f1(.3+k*.14)}`,2)+T(kx+k*34+15,ky-h-4,'t-xs t-mid','fill:var(--ink)',l)})}
    return s}

  function bucket(o,yr){const S=HI_TXT.s5;let s='';              // 2014-2021: an ice bucket, then big data and new criteria
    const bx=o.x+62,by=o.y+34;
    s+=`<g transform="translate(${bx} ${by}) rotate(-28)"><path d="M-26 -18 L26 -18 L20 22 L-20 22 Z" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:2"/><path d="M-26 -18 q26 -26 52 0" style="fill:none;stroke:var(--steel);stroke-width:1.6"/></g>`;
    const ph=(yr*3)%1;
    for(let k=0;k<9;k++){const u=(ph+k/9)%1,x=bx+30+((k*37)%28)-6,y=by+16+u*104;s+=`<path d="M${f1(x)} ${f1(y)} q3 6 0 8 q-3 -2 0 -8z" style="fill:var(--air);opacity:${f1(.9-.6*u)}"/>`}
    [[bx+14,by+20],[bx+40,by+8]].forEach(([x,y])=>s+=RC(x,y,9,9,'fill:var(--panel);stroke:var(--air)',2));
    const px=o.x+96,py=o.y+156;
    s+=CI(px,py,13,'fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.6')+`<path d="M${px-30} ${py+50} q30 -46 60 0" style="fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.6"/>`;
    s+=T(o.x+8,o.y+218,'t-sm','fill:var(--ink);font-weight:600',S.ice)+T(o.x+8,o.y+231,'t-xs','',S.money);
    const gx=o.x+192;
    if(yr>=2016.5){s+=T(gx,o.y+14,'t-xs','fill:var(--ink);font-weight:600',S.mine);
      for(let i=0;i<24;i++){const x=gx+(i%8)*22,y=o.y+22+Math.floor(i/8)*18,hit=i===13;s+=RC(x,y,18,14,hit?'fill:var(--tdp);stroke:var(--tdp)':'fill:var(--panel-2);stroke:var(--line)',3)}
      s+=T(gx,o.y+92,'t-xs','fill:var(--tdp)',S.nek)}
    if(yr>=2017.34){const ix=gx+4,iy=o.y+104;
      s+=RC(ix,iy,30,40,'fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.6',8)+LN(ix+15,iy+40,ix+15,iy+58,'stroke:var(--treat);stroke-width:2')+CI(ix+15,iy+60,3,'fill:var(--treat)');
      s+=T(ix+40,iy+26,'t-xs','fill:var(--treat)',S.eda)}
    if(yr>=2017.5)s+=doc(gx,o.y+170,84,S.ftsd[0],S.ftsd[1],'var(--steel)');
    if(yr>=2020.5)s+=doc(gx+94,o.y+170,84,S.gold[0],S.gold[1],'var(--steel)');
    return s}

  function approvals(o,yr){const S=HI_TXT.s6;let s='';           // 2022-2026: two drugs, two fates
    const card=(x,ttl,lines)=>{let c=RC(x,o.y+6,176,122,PANEL,8)+T(x+10,o.y+26,'t-lbl','',ttl);
      lines.forEach(([txt,col,on],k)=>{const y=o.y+50+k*22;c+=CI(x+15,y-4,4,`fill:${on?col:'var(--line)'}`)+T(x+26,y,'t-xs',on?`fill:${col}`:'',txt)});return c};
    s+=card(o.x,S.amx,[[S.amx1,'var(--treat)',1],[S.amx2,'var(--warn)',yr>=2024.26]]);
    s+=`<g transform="translate(${o.x+132} ${o.y+82})">`+[0,1,2].map(k=>`<rect x="${k*12-18}" y="-6" width="20" height="10" rx="5" style="fill:var(--treat-soft);stroke:var(--treat)"/>`).join('')+'</g>';
    if(yr>=2025.66){const k=ramp(yr,2025.66,2025.8);
      s+=`<g transform="translate(${o.x+88} ${o.y+107}) rotate(-6) scale(${f1(lerp(1.4,1,k))})" style="opacity:${f1(.3+.7*k)}"><rect x="-80" y="-16" width="160" height="34" rx="4" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2.4"/>${T(0,-1,'t-xs t-mid','fill:var(--bad);font-weight:700',S.amx3)}${T(0,12,'t-xs t-mid','fill:var(--bad)',S.amx3b)}</g>`}
    const tx=o.x+196;
    s+=card(tx,S.tof,[[S.tof0,'var(--muted)',1],[S.tof1,'var(--treat)',yr>=2023.31],[S.tof2,'var(--treat)',yr>=2024.41]]);
    /* antisense strand docking onto the message */
    const my=o.y+176,mx0=o.x+20,mx1=o.x+352,dock=ease(ramp(yr,2023.31,2023.9));
    s+=LN(mx0,my,mx1,my,'stroke:var(--tdp);stroke-width:3;stroke-linecap:round');
    for(let x=mx0+8;x<mx1;x+=12)s+=LN(x,my,x,my-7,'stroke:var(--tdp);stroke-width:1.6;opacity:.7');
    s+=T(mx0,my+18,'t-xs','fill:var(--tdp)',S.mrna);
    const ay=lerp(my-58,my-14,dock),ax=o.x+170;
    s+=LN(ax,ay,ax+90,ay,'stroke:var(--treat);stroke-width:3.4;stroke-linecap:round');
    for(let x=ax+6;x<ax+90;x+=12)s+=LN(x,ay,x,ay+7,'stroke:var(--treat);stroke-width:1.6');
    s+=T(ax+96,ay+4,'t-xs','fill:var(--treat);font-weight:600',S.aso);
    if(dock>.98)s+=T(o.x+20,o.y+226,'t-xs','fill:var(--ink)',S.binds);
    return s}
  const SCENE=[hall,stadium,genes,protein,bucket,approvals];

  function draw(t){
    const N=vb(svg,'720 584','400 744');
    const L=N
      ? {XA:20,XB:386,yrX:8,yrY:26,hX:8,hY:46,sc:[6,54,388,398],A:{x:14,y:62,w:372},C:{x:14,y:306},
         LY:i=>486+i*42,bandH:22,labUp:1,axY:692,tkY:710,brY:698,ticks:[1850,1900,1960,1990,2000,2010,2020],phTop:470,phBot:700,yY:732}
      : {XA:170,XB:704,yrX:10,yrY:24,hX:70,hY:23,sc:[6,34,708,250],A:{x:16,y:42,w:416},C:{x:446,y:42},
         LY:i=>318+i*44,bandH:38,labUp:0,axY:528,tkY:546,brY:534,ticks:[1850,1900,1935,1960,1990,2000,2010,2020,2026],phTop:296,phBot:536,yY:570};
    XA=L.XA;XB=L.XB;
    const xp=lerp(XA,XB,t),yr=fy(t);
    const done=HI_EV.filter(e=>e.y<=yr+.01),cur=done.length?done[done.length-1]:null,ph=phaseOf(steps,t);
    let s='';
    if(cur)s+=T(L.yrX,L.yrY,'t-big',`font-size:22px;fill:${HI_LANES[cur.l][1]}`,Math.floor(cur.y))+T(L.hX,L.hY,'t-lbl','',cur.h);
    else s+=T(L.yrX,L.yrY,'t-lbl','fill:var(--muted)',HI_TXT.start);
    s+=RC(L.sc[0],L.sc[1],L.sc[2],L.sc[3],'fill:var(--field);stroke:var(--line)',12);
    s+=SCENE[ph]({x:L.A.x+(L.A.w-372)/2,y:L.A.y},yr);
    s+=N?LN(L.C.x,L.C.y-8,L.C.x+372,L.C.y-8,'stroke:var(--line)'):LN(L.C.x-12,L.A.y,L.C.x-12,L.A.y+236,'stroke:var(--line)');
    s+=T(L.C.x,L.C.y+12,'t-sm','fill:var(--ink);font-weight:600',HI_ERA[ph].t.toUpperCase());
    const inEra=HI_EV.filter(e=>eraOf(e.y)===ph&&e.y<=yr+.01);
    inEra.forEach((e,k)=>{const y=L.C.y+34+k*20;
      s+=CI(L.C.x+5,y-4,4,`fill:${HI_LANES[e.l][1]}`);
      s+=`<text x="${L.C.x+16}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${Math.floor(e.y)}</tspan>  ${e.c}</text>`});
    if(!inEra.length)s+=T(L.C.x+16,L.C.y+34,'t-xs','',HI_TXT.notYet);
    HI_LANES.forEach(([n,c],i)=>{const y=L.LY(i);
      s+=RC(XA-4,y-L.bandH/2,XB-XA+10,L.bandH,`fill:var(--panel-2);opacity:${i%2?.35:.7}`,8);
      s+=T(L.labUp?XA-4:10,L.labUp?y-L.bandH/2-5:y+4,'t-sm',`fill:${c};font-weight:600`,n);
      s+=LN(XA,y,XB,y,`stroke:${c};stroke-width:1;opacity:.35`)});
    s+=`<line x1="${XA}" x2="${XB}" y1="${L.axY}" y2="${L.axY}" style="stroke:var(--muted)"/>`;
    L.ticks.forEach(y=>{const x=xOf(y);s+=LN(x,L.axY-4,x,L.axY+4,'stroke:var(--muted)')+T(x,L.tkY,'t-xs t-mid','',y)});
    [1935,1990].forEach(y=>{const x=xOf(y);s+=`<path d="M${f1(x-6)} ${L.brY} l4 -12 M${f1(x-1)} ${L.brY} l4 -12" style="stroke:var(--muted);stroke-width:1"/>`});
    /* dots: alternate up and down where two in a lane sit too close */
    const gapMin=12,dyO=N?6:9,last={};
    HI_EV.forEach(e=>{const x=xOf(e.y),p=last[e.l];e.dy=p&&x-p.x<gapMin?(p.dy>0?-dyO:dyO):0;if(e.dy&&p&&!p.dy)p.dy=-e.dy;last[e.l]={x,dy:e.dy,e};if(e.dy&&p&&p.e)p.e.dy=p.dy});
    HI_EV.forEach(e=>{const x=xOf(e.y),y=L.LY(e.l)+e.dy,c=HI_LANES[e.l][1],pass=e.y<=yr+.01;
      if(!pass)s+=CI(x,y,4.5,'fill:var(--panel);stroke:var(--muted);stroke-width:1.2;opacity:.7');
      else if(e===cur){const k=ramp(xp-x,0,26);s+=CI(x,y,7+(N?6:11)*k,`fill:none;stroke:${c};stroke-width:2;opacity:${f1(.8*(1-k))}`)+CI(x,y,7,`fill:${c};stroke:var(--ink);stroke-width:2`)}
      else s+=CI(x,y,5,`fill:${c}`);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="9" class="clk" data-hy="${e.y}" style="fill:transparent"/>`});
    s+=LN(xp,L.phTop,xp,L.phBot,'stroke:var(--ink);stroke-width:1.4;opacity:.55')+`<path d="M${f1(xp-5)} ${L.axY} L${f1(xp+5)} ${L.axY} L${f1(xp)} ${L.axY-8}Z" style="fill:var(--ink)"/>`;
    s+=T(clamp(xp,XA+14,XB-14),L.yY,'t-xs t-mid','fill:var(--ink);font-weight:700',Math.floor(yr));
    svg.innerHTML=s;
    setSt(ph);
    $$('#hiYears [data-hy2]').forEach(b=>b.setAttribute('aria-pressed',cur&&+b.dataset.hy2===cur.y?'true':'false'));
    $('#hiRead').innerHTML=HI_TXT.read(Math.floor(yr),done.length,HI_EV.length,HI_ERA[ph].t);
    $('#hiNote').innerHTML=cur?noteHTML({k:HI_LANES[cur.l][0],t:cur.t,txt:cur.txt,pt:cur.pt,hook:cur.hook}):noteHTML(HI_TXT.intro);
  }
  $('#hiYears').innerHTML=HI_EV.map(e=>`<button class="tag steel" data-hy2="${e.y}" aria-pressed="false"><b style="font-weight:700">${Math.floor(e.y)}</b>&nbsp;${amp(e.h)}</button>`).join('');
  const stop=playWire(rg,$('#hiPlay'),draw,30000,UI.replay,'history');
  const setSt=stepWire($('#hiSteps'),steps,rg,draw,stop);
  const jump=y=>{stop();const t=clamp(tOfY(y)+.0015);rg.value=t;draw(t)};
  svg.addEventListener('click',e=>{const d=e.target.closest('[data-hy]');if(d)jump(+d.dataset.hy)});
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hy2]');if(b){jump(+b.dataset.hy2);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiCards').innerHTML=HI_TXT.cards.map(c=>`<div class="card"><h4>${c.t}${c.ev?` <span class="ev ${c.ev}">${c.evl}</span>`:''}</h4>${c.names?`<div class="hi-names">${c.names.map(n=>`<span class="tag">${n}</span>`).join('')}</div>`:''}<p>${c.txt}</p></div>`).join('');
  draw(+rg.value);
};

/* =============== 5.2–5.5 review: flashcards, mnemonics, quiz, glossary, sources ===============
   Data first (PARTN, FC, MN, QZ, GL, AREAN), then the four widgets. Interface text the
   widgets write is in RV, as whole phrases, so a translation replaces the data and RV only. */
const RV={
  allCards:'All cards',mixed:'Mixed (20)',all:'All',question:'question',answer:'answer',
  qOf:(i,n)=>`question <b>${i} / ${n}</b>`,scoreIs:s=>`score <b>${s}</b>`,
  finished:'Finished',scored:(s,n,p)=>`You scored ${s} / ${n} (${p}%)`,
  verdict:p=>p>=85?'Excellent work.':p>=65?'Solid. Review the ones you missed below.':'Worth another pass through the modules, then try again.',
  again:'Try again',toCards:'Go to flashcards',right:'Correct.',wrong:'Not quite.',nextQ:'Next question →',results:'See results',
  noTerms:'No matching terms.',termsOf:(n,m)=>`${n} of ${m} terms`,srcOf:(n,m)=>`${n} of ${m} sources`,also:'also',check:'check'
};
/*%%REVIEW-DATA%%*/
const PARTN={1:'Part 1 · The disease',2:'Part 2 · Diagnosis & course',3:'Part 3 · Treatment & care',4:'Part 4 · Living & the future',5:'Part 5 · History'};
const FC=[
 [1,'Which two sets of neurons degenerate in ALS?','Upper motor neurons (Betz cells in layer 5 of the primary motor cortex) and lower motor neurons (brainstem motor nuclei and anterior horn cells of the spinal cord).'],
 [1,'Which signs point to upper motor neuron loss?','Brisk and spreading reflexes, pathological reflexes such as Hoffmann, Babinski and snout, reflexes kept in a weak limb, and spasticity.'],
 [1,'Which signs point to lower motor neuron loss?','Muscle weakness, atrophy (wasting) and fasciculations.'],
 [1,'What is the split hand?','Wasting of the thenar side of the hand (abductor pollicis brevis and first dorsal interosseous) with relative sparing of the hypothenar abductor digiti minimi. It is reported to be highly specific in early ALS.'],
 [1,'Which motor neurons are relatively spared in ALS?','The eye-movement neurons (cranial nerves III, IV and VI) and Onuf\'s nucleus, which controls the sphincters. This is why eye-tracking can support communication late in the disease.'],
 [1,'In what share of ALS is TDP-43 pathology found?','About 97%. The main exceptions are ALS caused by SOD1 or FUS variants, which show SOD1 or FUS inclusions instead.'],
 [1,'What does TDP-43 normally do?','It is a mostly nuclear RNA-binding protein that regulates splicing, RNA stability and RNA transport. It keeps cryptic exons out of mRNA and controls its own level.'],
 [1,'How does loss of nuclear TDP-43 harm motor neurons?','Cryptic exons enter transcripts. STMN2 mRNA is truncated, so stathmin-2, which axons need to grow and repair, falls. UNC13A, a synapse protein, is lost as well.'],
 [1,'What is the C9orf72 expansion?','A non-coding GGGGCC repeat in intron 1 of C9orf72 on chromosome 9p21. It is the most common genetic cause of familial ALS and familial FTD in European populations.'],
 [1,'How often is ALS familial?','About 5% in prospective population registers (5.1% in a meta-analysis). Other sources say 10-15%; part of the gap is how familial is defined.'],
 [1,'What does SOD1 do, and how do its variants cause ALS?','SOD1 is a copper-zinc enzyme that converts superoxide to oxygen and hydrogen peroxide. ALS variants make the protein misfold and act through a toxic gain of function, not through loss of enzyme activity.'],
 [1,'What are the dying-forward and dying-back hypotheses?','Dying-forward: overactive cortical neurons drive the death of lower motor neurons through glutamate. Dying-back: degeneration starts at the neuromuscular junction and moves back to the cell body. The evidence does not yet settle which comes first.'],
 [2,'What are the three Gold Coast requirements?','Progressive motor impairment after normal motor function; UMN and LMN dysfunction in 1 region, or LMN dysfunction in at least 2 regions; and investigations that exclude other diseases.'],
 [2,'Which four body regions do the diagnostic criteria use?','Bulbar, cervical, thoracic and lumbosacral.'],
 [2,'What is clinically definite ALS under the revised El Escorial criteria?','UMN and LMN signs, on clinical evidence alone, in 3 regions.'],
 [2,'What did the Awaji-shima criteria change?','EMG chronic neurogenic change counts the same as clinical LMN signs, and fasciculation potentials count as denervation when ALS is suspected. The probable laboratory-supported category was dropped.'],
 [2,'Which EMG findings support ALS?','Chronic neurogenic change (large, long-duration motor unit potentials with reduced recruitment) plus ongoing denervation (fibrillations, positive sharp waves or fasciculation potentials), with normal sensory conduction and no conduction block.'],
 [2,'Name red flags for a diagnosis other than ALS.','Prominent sensory features; sphincter, visual or autonomic problems; abnormal eye movements; fluctuating or fatigable weakness; conduction block on nerve studies; and no progression over time.'],
 [2,'How is multifocal motor neuropathy told apart from ALS?','It is pure motor, asymmetric and arm-predominant, with weakness greater than wasting. The key test is conduction block on nerve conduction studies, and it responds to IVIG.'],
 [2,'What points to Kennedy disease (SBMA)?','A man with slow LMN-only bulbar and limb weakness, chin fasciculations, gynaecomastia and low sensory potentials. The key test is a CAG expansion in the androgen receptor gene.'],
 [2,'How is the ALSFRS-R built?','12 items in four domains (bulbar, fine motor, gross motor, respiratory), each scored 0-4. The total runs from 0 to 48, and 48 is normal function.'],
 [2,'How is the progression rate ΔFS calculated?','(48 minus the ALSFRS-R score at diagnosis) divided by the months from onset to diagnosis. Below 0.5 points a month is usually called slower and above 1.0 faster.'],
 [2,'What are the King\'s stages?','1: first region involved; 2A: diagnosis; 2B: second region; 3: third region; 4A: need for gastrostomy; 4B: need for non-invasive ventilation.'],
 [2,'What range of survival do studies report?','Median survival from onset is about 2-4 years (20-48 months in a systematic review). In that review 10-20% lived more than 10 years; registries report 7-12% alive at 10 years.'],
 [3,'How much does riluzole extend survival in trials?','The Cochrane review estimates about 2-3 months of median survival (11.8 to 14.8 months). Observational studies report more, but they are prone to bias.'],
 [3,'What liver monitoring does the US riluzole label describe?','Aminotransferases before and during treatment, monthly for the first 3 months and periodically after that. Use is not recommended if they exceed 5 times the upper limit of normal.'],
 [3,'What is the evidence for edaravone?','One trial of 137 selected early-stage people (MCI186-19): ALSFRS-R fell 5.01 against 7.50 points over 24 weeks. The EU application was withdrawn, later studies found no added benefit, and EAN 2024 recommends against it outside trials.'],
 [3,'What happened to AMX0035 (sodium phenylbutyrate-taurursodiol)?','The phase 2 CENTAUR trial was positive, but the phase 3 PHOENIX trial (664 people) missed its endpoints. Withdrawal began in 2024 in the US and Canada, and the EU refused it.'],
 [3,'How does tofersen work?','It is an antisense oligonucleotide that binds SOD1 mRNA. RNase H then cuts the mRNA, so less SOD1 protein is made. It is for SOD1-ALS only.'],
 [3,'What did the VALOR trial of tofersen show?','The 28-week clinical primary endpoint was not met (difference 1.2 points, P = 0.97), but CSF SOD1 and plasma NfL fell. The FDA granted accelerated approval on 25 April 2023 based on the NfL reduction.'],
 [3,'What is the label schedule for tofersen?','100 mg in 15 mL by lumbar puncture: three loading doses 14 days apart, then one dose every 28 days.'],
 [3,'What did the Bourke 2006 NIV trial find?','In people with normal to moderately impaired bulbar function, NIV gave a median survival benefit of 205 days with quality of life maintained. With poor bulbar function it improved sleep symptoms but not survival.'],
 [3,'Which NIV triggers recur across guidelines?','FVC below 50% predicted and SNIP around 40 cmH2O. Several guidelines also use FVC below 80% with symptoms such as orthopnoea.'],
 [3,'Which peak cough flows does AAN 2009 cite?','Above 160 L/min is needed to clear secretions, and assistive devices are recommended below 270 L/min.'],
 [3,'What did the ProGas study report about gastrostomy?','30-day mortality was 4% overall and similar after PEG and RIG. Weight loss of more than 10% before the procedure was linked to shorter survival (7.7 against 12 months).'],
 [3,'Is diaphragm pacing recommended in ALS?','No. In DiPALS, median survival was 11.0 months with pacing plus NIV against 22.5 months with NIV alone, and EAN 2024 recommends against it.'],
 [4,'How common are cognitive and behavioural changes in ALS?','About half of people with ALS show some change, and about 14-15% meet criteria for frontotemporal dementia. The figures depend on the tests used.'],
 [4,'What is the ECAS?','A 15-20 minute cognitive and behavioural screen designed for people with physical disability. It scores ALS-specific functions (executive, social cognition, fluency, language) and non-specific ones (memory, visuospatial), with a carer interview on behaviour.'],
 [4,'What is pseudobulbar affect?','Uncontrollable episodes of laughing or crying that are excessive for the feeling behind them. A CNS-LS score of 13 or more is the threshold used, and dextromethorphan-quinidine is labelled for it.'],
 [4,'What does NICE say about communication aids?','Speech and language therapy assessment and AAC without delay, from low-tech alphabet or picture boards to voice-output aids, with referral to a specialised hub for eye-gaze access.'],
 [4,'How common is a totally locked-in state?','It developed in 11-13% of people on long-term tracheostomy ventilation in Japanese studies. No study read gives a figure for all people with ALS.'],
 [4,'How do most people with ALS die?','Most die peacefully: 88% in a German series and 98% in a UK series, and no patient choked to death. Respiratory failure is the most common cause.'],
 [4,'Can ventilation be stopped?','Yes. NICE says NIV can be stopped at any time. UK guidance says a person with capacity may refuse or withdraw ventilation, that this is not assisted suicide, and that symptoms are controlled with titrated medicines.'],
 [4,'Why is oxygen used with extreme caution in ALS?','With weak breathing muscles, oxygen can raise CO2 and cause acidaemic respiratory failure. MND Association guidance accepts saturations of 88-92% and uses the person\'s own NIV.'],
 [4,'How does ESPEN describe giving medicines through a feeding tube?','One medicine at a time, with 30 mL of water flushed before, between and after each. Crushing should be avoided whenever possible.'],
 [4,'What is the ATLAS trial?','A phase 3 trial of tofersen in presymptomatic SOD1 carriers, randomised when plasma NfL starts to rise. The primary endpoint is clinically manifest ALS within 12 months, and no results are out yet.'],
 [4,'What is a platform trial?','A trial that tests several drugs under one protocol with shared placebo participants. In the HEALEY platform, zilucoplan, verdiperstat, CNM-Au8, pridopidine and trehalose did not slow ALS.'],
 [4,'What is ulefnersen?','An antisense drug for FUS-ALS, also called ION363 or jacifusen. A phase 3 topline result announced in September 2026 favoured it, but it is not yet peer reviewed or approved.'],
 [5,'Who named amyotrophic lateral sclerosis?','Charcot offered the term in 1874. ALS is still called Charcot\'s disease in many countries.'],
 [5,'What did Charcot and Joffroy show in 1865-1869?','Lateral column lesions went with paralysis and contractures, and anterior horn lesions went with paralysis and atrophy.'],
 [5,'What did Aran describe in 1850?','He described and named progressive muscular atrophy.'],
 [5,'When did Lou Gehrig stop playing?','He ended his streak of 2130 consecutive games on 2 May 1939, and he died on 2 June 1941.'],
 [5,'Why is Guam important in ALS history?','From the 1950s Guam had a far higher incidence of ALS and parkinsonism-dementia than anywhere else. A registry began in 1958, incidence then fell, and the cycad toxin (BMAA) hypothesis remains contested.'],
 [5,'What happened in 1993?','SOD1 mutations were found in familial ALS: 11 missense mutations in 13 families. SOD1 became the first ALS gene.'],
 [5,'What happened in 1994?','The El Escorial criteria were published, and a riluzole trial reported 1-year survival of 74% against 58% with placebo.'],
 [5,'When did the FDA approve riluzole?','On 12 December 1995.'],
 [5,'What was found in 2006?','TDP-43 was identified as the major disease protein in the inclusions of both ALS and FTLD-U.'],
 [5,'What was found in 2011?','The C9orf72 GGGGCC repeat expansion, now known as the most common genetic cause of familial ALS in European populations.'],
 [5,'What did the 2014 Ice Bucket Challenge achieve?','It brought the ALS Association more than $100 million, part of which funded Project MinE. In 2016 Project MinE reported NEK1 risk variants in nearly 3% of ALS cases.'],
 [5,'Which US approvals followed riluzole?','Edaravone on 5 May 2017; sodium phenylbutyrate-taurursodiol on 29 September 2022, later withdrawn (formally in 2025); and tofersen for SOD1-ALS on 25 April 2023.']
];
const MN=[
 ['Amyotrophic + lateral sclerosis','Amyotrophic: muscle wasting, the lower motor neuron. Lateral sclerosis: scarring of the lateral columns, the upper motor neuron.'],
 ['UMN turns it up, LMN brings it low','Upper motor neuron loss turns things up: brisk reflexes, spasticity, Babinski and Hoffmann signs. Lower motor neuron loss brings muscle bulk low: weakness, wasting and fasciculations.'],
 ['B-C-T-L, head to tail','The four regions the diagnostic criteria count, from the top down: Bulbar, Cervical, Thoracic, Lumbosacral.'],
 ['Gold Coast: Progress, Pattern, Proof','Progress: motor impairment that worsens after normal function. Pattern: UMN and LMN signs in 1 region, or LMN signs in 2. Proof: tests exclude other diseases. When all three are met, the answer is ALS; there are no grades.'],
 ['12 x 4 = 48','The ALSFRS-R has 12 items, each scored 0 to 4, so the total runs to 48, which means normal function.'],
 ['King\'s 4A and 4B: A for alimentation, B for breathing','Stages 1 to 3 count the regions involved. Stage 4A is need for a feeding tube (gastrostomy) and 4B is need for non-invasive ventilation.'],
 ['Can Some Tests Find it?','The four genes the 2023 consensus puts on every ALS gene panel: C9orf72, SOD1, TARDBP and FUS.'],
 ['Eyes and sphincters last','Eye-movement neurons (cranial nerves III, IV and VI) and Onuf\'s nucleus (bladder and bowel) are relatively spared, which is why eye-gaze communication often works late in ALS.']
];
const QZ=[
 [1,'ALS damages:',['Sensory neurons only','Upper and lower motor neurons','The neuromuscular junction only','Muscle fibres directly'],1,'Upper motor neurons in the motor cortex and lower motor neurons in the brainstem and spinal cord both degenerate.'],
 [1,'Which of these is a lower motor neuron sign?',['Babinski sign','Spasticity','Hoffmann sign','Fasciculations'],3,'Weakness, wasting and fasciculations are lower motor neuron signs. Babinski, Hoffmann and spasticity point to the upper motor neuron.'],
 [1,'In the split hand of ALS, which muscle is relatively spared?',['Abductor pollicis brevis','First dorsal interosseous','Abductor digiti minimi','None; all hand muscles waste equally'],2,'Wasting favours the thenar side (APB and FDI) and relatively spares the hypothenar ADM, although all three are supplied from C8-T1.'],
 [1,'Which motor neurons usually persist late in ALS, so that eye-tracking can support communication?',['Oculomotor, trochlear and abducens neurons','Hypoglossal neurons','Phrenic neurons at C3-C5','Betz cells of the motor cortex'],0,'The eye-movement nuclei (cranial nerves III, IV and VI) persist throughout the disease, along with Onuf\'s nucleus.'],
 [1,'TDP-43 pathology is present in about what share of ALS?',['About 97%','About 50%','About 20%','About 5%'],0,'The Lancet seminar gives about 97%. The main exceptions are ALS caused by SOD1 or FUS variants.'],
 [1,'Which genetic form of ALS has no TDP-43 inclusions?',['C9orf72 ALS','TARDBP ALS','TBK1 ALS','SOD1 ALS'],3,'In an autopsy series, none of 15 SOD1 cases had TDP-43-positive inclusions. SOD1-ALS shows abnormal SOD1 instead.'],
 [1,'What happens to STMN2 when nuclear TDP-43 is lost?',['Stathmin-2 protein rises','A cryptic exon enters STMN2 mRNA and stathmin-2 falls','The STMN2 gene is deleted','STMN2 forms the main inclusions'],1,'TDP-43 normally keeps cryptic exon 2a out. Without it the mRNA is truncated, and stathmin-2, needed for axon growth and repair, falls.'],
 [1,'The C9orf72 expansion is:',['A CAG repeat in the coding region','A point mutation on chromosome 21','A GGGGCC repeat in intron 1','A deletion of the whole gene'],2,'It is a non-coding GGGGCC hexanucleotide repeat in the first intron of C9orf72 on chromosome 9p21.'],
 [1,'In prospective population registers, about what share of ALS is familial?',['About 1%','About 5%','About 25%','About 50%'],1,'A meta-analysis found 5.1% in population registers. Other sources give 10-15%, partly because definitions of familial ALS differ.'],
 [1,'The lifetime risk of ALS is roughly:',['1 in 35','1 in 3,500','1 in 35,000','1 in 350'],3,'UK data give 1 in 350 men and 1 in 472 women, and the Lancet seminar gives about 1 in 350.'],
 [1,'Mouse studies suggest mutant SOD1 harms motor neurons mainly through:',['A toxic gain of function','Loss of enzyme activity','Too little normal SOD1','An immune attack on SOD1'],0,'SOD1 knockout mice do not develop ALS, and adding or removing normal SOD1 does not change disease caused by mutant SOD1.'],
 [1,'In SOD1(G93A) mice, what was seen first?',['Loss of motor neuron cell bodies','Microglial activation around motor neurons','Denervation of neuromuscular junctions','Loss of cortical neurons'],2,'At 47 days, 40% of end-plates were denervated with no cell body loss, which supports the dying-back hypothesis. This does not settle the debate in humans.'],
 [2,'Under the Gold Coast criteria, which pattern counts as motor neuron dysfunction?',['UMN signs alone in 2 regions','Sensory loss in 1 region','LMN dysfunction in at least 2 regions','Fasciculations without weakness'],2,'Gold Coast needs UMN and LMN dysfunction in 1 region, or LMN dysfunction in at least 2 regions. A pure UMN syndrome does not meet it.'],
 [2,'How many certainty grades do the Gold Coast criteria have?',['None; the result is ALS or not ALS','Two','Three','Four'],0,'Gold Coast dropped possible, probable and definite. A UK group argued that the older grades implied a distressing doubt.'],
 [2,'Under the revised El Escorial criteria, clinically definite ALS needs UMN and LMN signs in:',['1 region','2 regions','1 region plus abnormal EMG','3 regions'],3,'Definite needs clinical UMN and LMN signs in 3 regions. Probable needs 2 regions with some UMN signs above the LMN signs.'],
 [2,'What did the Awaji-shima criteria change?',['They added a sensory region','EMG evidence counts the same as clinical LMN signs','They required MRI of the whole spine','They removed the bulbar region'],1,'Awaji counts EMG chronic neurogenic change like clinical findings, and counts fasciculation potentials as denervation when ALS is suspected.'],
 [2,'Which nerve conduction finding argues against ALS?',['Normal sensory conduction','Normal motor conduction velocity','Reduced motor amplitude','Motor conduction block'],3,'Conduction block or demyelination points to another condition, such as multifocal motor neuropathy. Reduced motor amplitude can occur in ALS.'],
 [2,'Which test best separates multifocal motor neuropathy from ALS?',['Brain MRI','Serum creatine kinase','Nerve conduction studies looking for conduction block','Muscle biopsy'],2,'MMN shows conduction block, which is diagnostic though not always found. It is pure motor, arm-predominant and responds to IVIG.'],
 [2,'A man has slow LMN-only bulbar and limb weakness, gynaecomastia and low sensory potentials. Which test is key?',['CAG repeat length in the androgen receptor gene','Anti-GM1 antibodies','Muscle biopsy','Hexosaminidase A assay'],0,'This picture suggests Kennedy disease (SBMA), an X-linked condition confirmed by a CAG expansion in the androgen receptor gene.'],
 [2,'In a US centre, the median time from first symptom to confirmed diagnosis was about:',['3 months','11.5 months','24 months','36 months'],1,'Half of the people received another diagnosis first, and people saw about three physicians on average.'],
 [2,'The ALSFRS-R total score ranges from:',['0 to 10','0 to 100','0 to 48, where 48 is normal function','1 to 5'],2,'It has 12 items in four domains, and each item is scored 0 to 4.'],
 [2,'How is the progression rate ΔFS calculated?',['(48 minus ALSFRS-R at diagnosis) divided by months from onset to diagnosis','ALSFRS-R divided by age','FVC divided by months since onset','The number of regions involved'],0,'Below 0.5 points a month is usually called slower and above 1.0 faster. In a French cohort the median was 1.0.'],
 [2,'In King\'s staging, what marks stage 4A?',['Diagnosis','Need for gastrostomy','Need for non-invasive ventilation','Involvement of a third region'],1,'Stage 4A is need for gastrostomy and 4B is need for NIV. Stages 1 to 3 count the regions involved.'],
 [2,'Across cohorts, median survival from symptom onset is usually about:',['6 months','1 year','10 years','2 to 4 years'],3,'A systematic review gives 20 to 48 months. In that review 10-20% lived more than 10 years, and registries report 7-12% alive at 10 years.'],
 [3,'The Cochrane review estimates that riluzole prolongs median survival by about:',['2 to 3 months','2 to 3 years','10 years','It has no effect on survival'],0,'Median survival rose from 11.8 to 14.8 months. Observational studies report more, but they are prone to bias.'],
 [3,'What does the US riluzole label say about liver tests?',['No monitoring is needed','Check them once a year','Check aminotransferases before and during treatment, monthly for the first 3 months','Check them only if jaundice appears'],2,'Monitoring continues periodically after 3 months. Use is not recommended if transaminases exceed 5 times the upper limit of normal.'],
 [3,'Which trial supported edaravone approval in the US?',['ADORE','MCI186-19, in a selected early-stage group','PHOENIX','VALOR'],1,'MCI186-19 randomised 137 people chosen by criteria from a post hoc analysis. ALSFRS-R fell 5.01 against 7.50 points over 24 weeks.'],
 [3,'What happened to sodium phenylbutyrate-taurursodiol (AMX0035)?',['It was approved in Europe in 2024','It showed clear benefit in PHOENIX','It became first-line in EAN 2024','Its phase 3 trial was negative and it was withdrawn'],3,'CENTAUR was positive, but PHOENIX (664 people) missed all its endpoints, and withdrawal began in April 2024.'],
 [3,'How does tofersen work?',['It blocks glutamate release','It binds SOD1 mRNA so that RNase H degrades it','It replaces the SOD1 gene','It scavenges free radicals'],1,'Tofersen is an antisense oligonucleotide. Destroying SOD1 mRNA means less SOD1 protein is made.'],
 [3,'Tofersen is indicated for adults with ALS who:',['Carry a SOD1 mutation','Have any form of ALS','Carry a C9orf72 expansion','Have bulbar onset'],0,'The US label limits it to adults with a SOD1 mutation, under accelerated approval.'],
 [3,'In VALOR, what happened to the primary clinical endpoint at 28 weeks?',['It improved significantly','Tofersen did clearly worse than placebo','It was not met (difference 1.2 points, P = 0.97)','It was not measured'],2,'CSF SOD1 and plasma NfL fell, and the FDA gave accelerated approval based on the NfL reduction.'],
 [3,'The label schedule for tofersen is:',['A daily tablet','A weekly IV infusion','A single lifetime injection','Three intrathecal loading doses 14 days apart, then one every 28 days'],3,'Each dose is 100 mg in 15 mL, given by lumbar puncture after about 10 mL of CSF is removed.'],
 [3,'In the Bourke 2006 trial, who gained the most survival from NIV?',['People with severe bulbar weakness','People who used it only in the daytime','People without symptoms','People with normal to moderately impaired bulbar function'],3,'The median benefit was 205 days with quality of life maintained. With poor bulbar function NIV helped sleep symptoms but not survival.'],
 [3,'Which threshold is shared by most published NIV guidance?',['FVC below 95%','FVC below 50% predicted','SpO2 below 99%','Peak cough flow above 400 L/min'],1,'FVC below 50% and SNIP around 40 cmH2O recur, and several guidelines also use FVC below 80% with symptoms.'],
 [3,'According to AAN 2009, clinicians recommend cough assist devices when peak cough flow falls below:',['270 L/min','600 L/min','50 L/min','1000 L/min'],0,'Flows above 160 L/min are needed to clear secretions.'],
 [3,'In ProGas, what was linked to shorter survival after gastrostomy?',['Choosing RIG rather than PEG','A family history of ALS','Weight loss of more than 10% before the procedure','Age under 50'],2,'Median survival was 7.7 against 12 months. 30-day mortality was 4% overall and similar for PEG and RIG.'],
 [4,'About what share of people with ALS meet criteria for frontotemporal dementia?',['About 1%','About 50%','About 80%','About 14-15%'],3,'About 14-15% meet FTD criteria, while about half show some cognitive or behavioural change.'],
 [4,'The ECAS is:',['A breathing test','A 15-20 minute cognitive and behavioural screen designed for people with physical disability','A genetic panel','A swallowing scale'],1,'It scores ALS-specific and non-specific functions and includes a carer interview about behaviour.'],
 [4,'Pseudobulbar affect is:',['Uncontrollable laughing or crying that is excessive for the feeling behind it','Weakness of the tongue','A form of depression','Loss of eye movements'],0,'It is distinguished from depression. A CNS-LS score of 13 or more is the threshold used.'],
 [4,'What does NICE NG42 say about communication aids?',['Wait until speech is lost','Only high-tech aids should be offered','Assess and provide AAC without delay, with referral for eye-gaze access when needed','Communication is not part of MND care'],2,'NICE covers low-tech boards, voice-output aids and referral to a specialised AAC hub, with review as needs change.'],
 [4,'In Japanese studies, about what share of people on long-term tracheostomy ventilation developed a totally locked-in state?',['11-13%','50-60%','About 90%','Under 1%'],0,'No source gives a figure for all people with ALS; these figures apply only to long-term tracheostomy ventilation.'],
 [4,'What did a German and UK study of deaths in ALS find?',['Most people choked to death','Most died in intensive care','Morphine was never used','Most died peacefully and no one choked to death'],3,'88% (Germany) and 98% (UK) died peacefully. Breathlessness, cough, anxiety and restlessness were most common in the last 24 hours.'],
 [4,'Under UK guidance, withdrawing ventilation at the request of a person with capacity is:',['Assisted suicide','Illegal','The refusal of a medical treatment, which must be respected','Allowed only for tracheostomy ventilation'],2,'The APM guidance says the cause of death remains the advanced neurological disease.'],
 [4,'Why is supplemental oxygen used with extreme caution in ALS?',['It is a fire risk at home','It can raise CO2 in people with weak breathing muscles','It causes muscle cramps','It interacts with riluzole'],1,'In one study low-flow oxygen raised PaCO2 sharply. MND Association guidance accepts saturations of 88-92%.'],
 [4,'ESPEN describes flushing a feeding tube around medicines with:',['5 mL of milk','30 mL of water before, between and after each medicine','Cola','No flush at all'],1,'Medicines are given one at a time, and crushing is avoided whenever possible.'],
 [4,'The ATLAS trial tests tofersen in:',['People with C9orf72 ALS','People with late-stage ALS','Presymptomatic SOD1 carriers whose NfL starts rising','Healthy volunteers without variants'],2,'Its primary endpoint is clinically manifest ALS within 12 months. No results were available as of October 2026.'],
 [4,'What is a key feature of the HEALEY ALS Platform Trial?',['Each drug is tested for 10 years','It enrols only SOD1 carriers','It has no placebo group','Its regimens share placebo participants'],3,'Each regimen randomises 3:1 to drug or placebo. Zilucoplan, verdiperstat, CNM-Au8, pridopidine and trehalose were negative on its primary endpoint.'],
 [4,'Which statement fits stem cell clinics that sell unproven procedures for ALS?',['Professional bodies warn about them','They are approved for ALS in the EU','NurOwn showed clear benefit in phase 3','NICE requires them'],0,'The ISSCR and a JAMA Neurology viewpoint warn about untested treatments marketed by clinics. NurOwn missed its phase 3 primary endpoint.'],
 [5,'Who offered the term amyotrophic lateral sclerosis, in 1874?',['Aran','Duchenne','Charcot','Gehrig'],2,'ALS is still called Charcot\'s disease in many countries.'],
 [5,'In 1850, Aran described and named:',['Kennedy disease','Primary lateral sclerosis','Multiple sclerosis','Progressive muscular atrophy'],3,'A historian credits Aran with the clinical description and the name, although Duchenne later claimed priority.'],
 [5,'What did Charcot and Joffroy link to paralysis with atrophy?',['Lateral column lesions','Anterior horn lesions','Cerebellar lesions','Peripheral nerve lesions'],1,'Lateral column lesions went with paralysis and contractures, and anterior horn lesions with paralysis and atrophy.'],
 [5,'On 2 May 1939, Lou Gehrig:',['Ended his streak of 2130 consecutive games','Played his first professional game','Died','Became a team coach'],0,'He died on 2 June 1941. Film analysis suggests visible signs only after May 1938.'],
 [5,'Where was a very high incidence of ALS with parkinsonism-dementia recognised in the 1950s?',['Iceland','Guam','Sardinia','Finland'],1,'A registry began in 1958, and incidence fell over the next 40 years. The cycad toxin (BMAA) hypothesis remains contested.'],
 [5,'What was found in familial ALS in 1993?',['C9orf72 expansions','TDP-43 inclusions','SOD1 mutations','FUS mutations'],2,'11 SOD1 missense mutations were found in 13 families, making SOD1 the first ALS gene.'],
 [5,'Which ALS criteria were published in 1994?',['Gold Coast','Awaji-shima','ALS-FTSD','El Escorial'],3,'They were revised in 2000. Awaji followed in 2008, ALS-FTSD in 2017 and Gold Coast in 2020.'],
 [5,'When did the FDA approve riluzole?',['12 December 1995','1 January 1980','5 May 2017','25 April 2023'],0,'It was the first ALS drug approved in the US. 5 May 2017 is edaravone and 25 April 2023 is tofersen.'],
 [5,'Which protein was identified in 2006 as the major disease protein of ALS inclusions?',['SOD1','Tau','Amyloid beta','TDP-43'],3,'Neumann and colleagues found it in the ubiquitinated inclusions of both FTLD-U and ALS.'],
 [5,'What was discovered in 2011?',['The C9orf72 repeat expansion','The SOD1 gene','The ALSFRS-R','Riluzole'],0,'It explained 23.5% of familial ALS in one series and 46.0% of familial ALS in Finland.'],
 [5,'The 2014 Ice Bucket Challenge raised more than $100 million for the ALS Association. Part of it funded:',['The first riluzole trial','The El Escorial meeting','Project MinE','The Guam registry'],2,'In 2016 Project MinE investigators reported NEK1 risk variants in nearly 3% of ALS cases.'],
 [5,'Stephen Hawking lived about 55 years after his diagnosis in 1963. What does his course show?',['That ALS is usually slow','That a minority of people with ALS live much longer than the median','That tracheostomy cures ALS','That ALS is not progressive'],1,'Median survival is about 2 to 4 years, but 10-20% lived more than 10 years in a systematic review. His course sits at the far end of that range.']
];
const GL=[
 ['AAC (augmentative and alternative communication)','Any way of communicating that adds to or replaces speech, from alphabet and picture boards to tablets with voice output and eye-gaze systems.','living'],
 ['Accelerated approval','A US FDA pathway that approves a drug on a surrogate endpoint thought reasonably likely to predict clinical benefit. Continued approval may depend on confirmatory trials.','tofersen'],
 ['Advance care planning','Discussing and recording in advance the care a person wants or does not want, such as ventilation, feeding tubes and place of death, while they can still communicate their wishes.','living'],
 ['ALS-FTD','ALS together with frontotemporal dementia. About 14-15% of people with ALS meet criteria for FTD.','what'],
 ['ALS-FTSD','ALS-frontotemporal spectrum disorder: the 2017 consensus framework that classifies cognitive and behavioural change in ALS, from ALS with cognitive or behavioural impairment to ALS-FTD.','dx'],
 ['ALSFRS-R','The revised ALS Functional Rating Scale: 12 everyday-function items scored 0-4, with a total from 0 to 48, where 48 is normal function.','course'],
 ['AMX0035','Sodium phenylbutyrate-taurursodiol (Relyvrio, Albrioza). It was approved in Canada and the US in 2022, then withdrawn after the phase 3 PHOENIX trial was negative.','drugs'],
 ['Amyotrophic lateral sclerosis (ALS)','A disease in which upper and lower motor neurons degenerate. Amyotrophic means muscle wasting, and lateral sclerosis means scarring of the lateral columns of the spinal cord. It is also called motor neurone disease (MND) and Charcot\'s disease.','what'],
 ['Anterior horn cell','A lower motor neuron in the front (anterior) grey matter of the spinal cord. Its axon runs out to skeletal muscle.','neurons'],
 ['Antisense oligonucleotide (ASO)','A short synthetic strand that pairs with a specific mRNA. Tofersen is one: it binds SOD1 mRNA so that the cell destroys it.','tofersen'],
 ['Aspiration','Food, drink or saliva going into the airway instead of the gullet. It can cause choking and pneumonia.','nutrition'],
 ['Awaji-shima criteria','A 2008 update of the El Escorial rules in which EMG findings count the same as clinical LMN signs, and fasciculation potentials count as denervation.','dx'],
 ['Babinski sign','An upward movement of the big toe when the sole of the foot is stroked; a sign of upper motor neuron damage.','neurons'],
 ['Betz cell','A large pyramidal neuron in layer 5 of the primary motor cortex; the classic upper motor neuron.','neurons'],
 ['BMAA','Beta-N-methylamino-L-alanine, an amino acid from cycad seeds proposed as a cause of ALS on Guam. The hypothesis is contested.','history'],
 ['Brain-computer interface (BCI)','A device that reads brain signals to control a computer or to produce speech. In ALS it is still research, mostly in single participants.','living'],
 ['Bulbar','Relating to the brainstem-controlled muscles of speech, chewing and swallowing. Bulbar-onset ALS starts with slurred speech or difficulty swallowing.','what'],
 ['C9orf72','A gene on chromosome 9 whose GGGGCC repeat expansion is the most common genetic cause of familial ALS and familial FTD in European populations.','genes'],
 ['Caregiver burden','The physical, emotional and financial strain on family carers. Studies link it to the person\'s behavioural change and to physical disability.','living'],
 ['CNS-LS','Center for Neurologic Study-Lability Scale: a 7-item self-report scale of laughing and crying lability. A score of 13 or more is the threshold used for pseudobulbar affect.','nursing'],
 ['Conduction block','A failure of nerve impulses to pass a point along a motor nerve. It argues against ALS and is the key finding in multifocal motor neuropathy.','ddx'],
 ['Corticospinal tract','The main pathway for voluntary movement, from the motor cortex to the spinal cord. Most of its fibres cross the midline at the pyramidal decussation.','neurons'],
 ['Cryptic exon','A hidden stretch of an intron that TDP-43 normally keeps out of mRNA. When TDP-43 leaves the nucleus, the cryptic exon is spliced in and can disrupt the message.','tdp43'],
 ['Delta-FS (ΔFS)','A progression rate at diagnosis: 48 minus the ALSFRS-R score, divided by the months since onset. Below 0.5 is usually called slower and above 1.0 faster.','course'],
 ['Diagnostic delay','The time from first symptom to diagnosis. In one US centre the median was 11.5 months.','dx'],
 ['Dipeptide repeat proteins','Short repeating protein chains, such as poly-GA, made from C9orf72 repeat RNA without a start codon. They form aggregates in neurons.','genes'],
 ['Dying-back hypothesis','The idea that motor neuron degeneration starts at the nerve terminal and neuromuscular junction and moves back toward the cell body. It rests mainly on mouse studies.','neurons'],
 ['Dying-forward hypothesis','The idea that overactive cortical neurons drive the death of lower motor neurons through glutamate. It rests mainly on human brain stimulation studies.','neurons'],
 ['Dysphagia','Difficulty swallowing. In one study that followed people for about 2 years, it reached 85% of people with ALS.','nutrition'],
 ['ECAS','Edinburgh Cognitive and Behavioural ALS Screen: a 15-20 minute screen of thinking and behaviour designed for people with physical disability.','living'],
 ['Edaravone','A free-radical scavenger given in cycles by IV infusion or as an oral suspension. It is approved in Japan, the US and Canada; the EU application was withdrawn.','drugs'],
 ['El Escorial criteria','Criteria published in 1994 and revised in 2000 that grade ALS as possible, probable or definite by the number of regions with UMN and LMN signs. They were designed for clinical trials.','dx'],
 ['EMG (electromyography)','A needle test of the electrical activity of muscle. In ALS it shows ongoing denervation and chronic reinnervation.','dx'],
 ['ENCALS model','A European prediction model that combines 8 factors, such as onset site, age, progression rate and C9orf72 status, to predict the time to long-term ventilation or death.','course'],
 ['Excitotoxicity','Damage to neurons from overstimulation by glutamate. It is one proposed mechanism in ALS and part of the rationale for riluzole.','neurons'],
 ['Familial ALS','ALS that runs in a family. It makes up about 5% of ALS in population registers and 10-15% in other sources, depending on the definition.','genes'],
 ['Fasciculation','A visible twitch of a group of muscle fibres. It is common in ALS but also occurs in healthy people; in benign fasciculation syndrome, people followed for years did not develop ALS.','neurons'],
 ['Fibrillation potential','A small spontaneous EMG discharge from a single denervated muscle fibre; a sign of ongoing denervation.','dx'],
 ['Flail arm','An ALS phenotype with weakness concentrated in the arms. In a London cohort it carried longer survival than typical limb onset.','what'],
 ['Frontotemporal dementia (FTD)','A dementia that changes behaviour, language or executive function. It shares TDP-43 pathology and genes such as C9orf72 with ALS.','living'],
 ['FUS','An RNA-binding protein gene. FUS variants can cause young-onset and often rapid ALS, sometimes arising new (de novo) in the person.','genes'],
 ['FVC (forced vital capacity)','The most air a person can blow out after a full breath, given as a percentage of the predicted value. A falling FVC tracks breathing muscle weakness.','breathing'],
 ['Gastrostomy','A feeding tube placed through the abdominal wall into the stomach (PEG, RIG or PIG). It does not stop a person eating by mouth.','nutrition'],
 ['Genetic counselling','A discussion before and after a genetic test about inheritance, penetrance, what results can mean and their effects on the family. The 2023 consensus says it should be offered to everyone with ALS.','genes'],
 ['Gold Coast criteria','Diagnostic criteria proposed in 2020: progressive motor impairment, UMN and LMN signs in 1 region or LMN signs in 2, and exclusion of other diseases. The result is ALS or not ALS.','dx'],
 ['Guam ALS-PDC','A cluster of ALS and parkinsonism-dementia complex on the island of Guam, very common from the 1950s and declining since.','history'],
 ['HEALEY ALS Platform Trial','A US platform trial: one master protocol that tests several drugs, with shared placebo participants and a combined function-and-survival endpoint.','cure'],
 ['Hoffmann sign','Flicking the tip of a finger makes the thumb flex; a sign of upper motor neuron damage.','neurons'],
 ['Hypermetabolism','Burning more energy at rest than predicted. About 41-50% of people with ALS were hypermetabolic in studies.','nutrition'],
 ['IDDSI','International Dysphagia Diet Standardisation Initiative: an 8-level scale (0 to 7) for the texture of food and drink.','nutrition'],
 ['Inclusion body myositis (IBM)','A slow muscle disease of older adults that weakens the quadriceps and finger flexors. It can mimic ALS, and muscle biopsy is the key test.','ddx'],
 ['Intrathecal','Into the cerebrospinal fluid, usually by lumbar puncture. Tofersen is given this way.','tofersen'],
 ['Kennedy disease (SBMA)','Spinal and bulbar muscular atrophy: an X-linked condition in men with lower motor neuron signs only, confirmed by a CAG expansion in the androgen receptor gene.','ddx'],
 ['King\'s staging','A staging system that counts the regions involved (stages 1 to 3), then the need for gastrostomy (4A) or non-invasive ventilation (4B).','course'],
 ['Locked-in state','Being aware but having lost almost all voluntary movement; in a totally locked-in state eye movements are lost too. It occurs in a minority of people on long-term tracheostomy ventilation.','living'],
 ['Lou Gehrig\'s disease','A common US name for ALS, after the baseball player who ended his playing streak in 1939 and died in 1941.','history'],
 ['Lower motor neuron (LMN)','A motor neuron in the brainstem or the anterior horn of the spinal cord whose axon reaches the muscle. Its loss causes weakness, wasting and fasciculations.','neurons'],
 ['MI-E (mechanical insufflation-exsufflation)','A cough assist machine that blows air into the lungs and then pulls it out quickly to clear secretions.','breathing'],
 ['Mimic','Another condition that looks like ALS. In population registers, about 7-10% of people first registered with ALS turned out to have another condition.','ddx'],
 ['MiToS staging','Milano-Torino staging: counts how many of four functional domains (movement, swallowing, communicating, breathing) have lost independence, from stage 0 to stage 5 (death).','course'],
 ['Motor unit','One lower motor neuron and all the muscle fibres its axon supplies.','neurons'],
 ['Multidisciplinary clinic','A clinic where neurologists, nurses, therapists, dietitians and others see the person together. Attendance is linked to longer survival in observational studies.','nursing'],
 ['Multifocal motor neuropathy (MMN)','A treatable pure motor nerve disorder with conduction block and weakness greater than wasting. It responds to IVIG.','ddx'],
 ['Neurofilament light (NfL)','A structural nerve protein released into body fluids when axons are damaged. Levels are high in ALS but not specific to it, and tofersen lowered them.','dx'],
 ['Neuromuscular junction','The synapse where a motor nerve terminal meets a muscle fibre.','neurons'],
 ['NIV (non-invasive ventilation)','Breathing support through a mask, usually started at night. NICE says it can be stopped at any time.','breathing'],
 ['Onuf\'s nucleus','The sacral motor neurons that control the bladder and bowel sphincters. They are well preserved in ALS.','neurons'],
 ['Orthopnoea','Breathlessness when lying flat; a sign of diaphragm weakness.','breathing'],
 ['Palliative care','Care that focuses on comfort, symptoms and quality of life. International guidelines describe a palliative approach in ALS from diagnosis.','living'],
 ['Peak cough flow','How fast air leaves the lungs during a cough. AAN 2009 cites more than 160 L/min as needed to clear secretions.','breathing'],
 ['PEG (percutaneous endoscopic gastrostomy)','A gastrostomy placed with the help of an endoscope passed through the mouth. In ProGas, 30-day mortality after PEG was 3%.','nutrition'],
 ['Penetrance','The chance that a person who carries a disease variant develops the disease. For C9orf72, family-based and population-based studies give different estimates.','genes'],
 ['Phenoconversion','The change from carrying an ALS gene variant without symptoms to having clinically manifest disease.','cure'],
 ['Primary lateral sclerosis (PLS)','A rare, slowly progressive disease of the upper motor neurons only. It does not meet the Gold Coast criteria for ALS.','ddx'],
 ['Progressive muscular atrophy (PMA)','Motor neuron disease with only lower motor neuron signs. It counts as ALS under the Gold Coast criteria.','what'],
 ['Project MinE','An international ALS genetics research project, part-funded by the 2014 Ice Bucket Challenge. In 2016 its investigators reported NEK1 risk variants.','history'],
 ['Pseudobulbar affect','Uncontrollable laughing or crying that is excessive for the feeling behind it. It is classically linked to corticobulbar (upper motor neuron) damage.','living'],
 ['RIG (radiologically inserted gastrostomy)','A gastrostomy placed under X-ray guidance. In ProGas its 30-day mortality was similar to PEG.','nutrition'],
 ['Riluzole','A tablet, suspension or film taken twice daily that is thought to reduce glutamate release. Trials show it extends median survival by about 2-3 months.','drugs'],
 ['Sialorrhoea','Drooling. In MND it comes from poor clearance of saliva due to swallowing difficulty, not from making extra saliva.','nursing'],
 ['SNIP (sniff nasal inspiratory pressure)','The pressure measured in the nose during a sharp sniff, a test of diaphragm strength. Around 40 cmH2O is a common NIV trigger.','breathing'],
 ['SOD1','The gene for copper-zinc superoxide dismutase, the first ALS gene found (1993). Its variants act through a toxic gain of function.','genes'],
 ['Spasticity','A velocity-dependent increase in muscle tone (stiffness) from upper motor neuron damage.','neurons'],
 ['Split hand','Wasting of the thumb-side (lateral) hand muscles with relative sparing of the little-finger side, typical of ALS.','neurons'],
 ['Sporadic ALS','ALS with no known affected relative. Some people with sporadic ALS still carry a pathogenic variant in an ALS gene.','what'],
 ['STMN2','The gene for stathmin-2, a microtubule protein that axons need to grow and repair. Loss of nuclear TDP-43 truncates its mRNA.','tdp43'],
 ['Surrogate endpoint','A laboratory or imaging measure used in place of a clinical outcome. The US approval of tofersen rested on lower plasma NfL.','tofersen'],
 ['TDP-43','An RNA-binding protein encoded by TARDBP. It is lost from the nucleus and builds up in cytoplasmic inclusions in about 97% of ALS.','tdp43'],
 ['Tofersen','An intrathecal antisense drug (Qalsody) for adults with SOD1-ALS that lowers SOD1 protein.','tofersen'],
 ['Tracheostomy ventilation','Long-term ventilation through a tube placed in the windpipe. Its use varies widely between countries.','breathing'],
 ['UNC13A','A gene for a synapse protein. Loss of nuclear TDP-43 lets a cryptic exon into its mRNA, and common ALS risk variants make this worse.','tdp43'],
 ['Upper motor neuron (UMN)','A motor neuron whose cell body is in the motor cortex and whose axon runs in the corticospinal or corticobulbar tract.','neurons'],
 ['Variant of uncertain significance (VUS)','A genetic change whose link to disease is not yet known. It may or may not contribute, and its interpretation can change over time.','genes'],
 ['Voice banking','Recording one\'s own speech so that a synthetic version of the voice can be used later in a speech-generating device.','living']
];
/*%%/REVIEW-DATA%%*/
const AREAN={A:'Epidemiology, course & history',B:'Mechanism',C:'Genetics',D:'Diagnosis',E:'Drugs',F:'Breathing & nutrition',G:'Living & end of life',H:'Nursing care',I:'Research & cure'};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all',RV.allCards],...Object.keys(PARTN).map(k=>[k,UI.part(k)])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');if(!c)return;
    $('#fcTagF').textContent=PARTN[c[0]]+' · '+RV.question;$('#fcTagB').textContent=PARTN[c[0]]+' · '+RV.answer;
    $('#fcFront').textContent=c[1];$('#fcBack').textContent=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',flip);$('#fcFlip').onclick=flip;
  const next=()=>{if(!deck.length)return;i=(i+1)%deck.length;render()},prev=()=>{if(!deck.length)return;i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=MN.map(m=>`<div class="card"><b class="big">${m[0]}</b><p>${m[1]}</p></div>`).join('');
};
inits.quiz=()=>{
  const F=[['mix',RV.mixed],...Object.keys(PARTN).map(k=>[k,UI.part(k)])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">${RV.finished}</div><div class="q">${RV.scored(score,list.length,pct)}</div><p>${RV.verdict(pct)}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">${RV.again}</button><button class="btn" data-go="review">${RV.toCards}</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>${RV.qOf(i+1,list.length)}</span><span>${RV.scoreIs(score)}</span><span>${PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?RV.right:RV.wrong}</b> ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?RV.nextQ:RV.results}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  function render(){const q=inp.value.trim().toLowerCase();const L=GL.filter(g=>!q||g[0].toLowerCase().includes(q)||g[1].toLowerCase().includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${amp(tname(g[2]))}</button></div>`).join('')||`<p>${RV.noTerms}</p>`;
    $('#glCount').textContent=RV.termsOf(L.length,GL.length)}
  inp.addEventListener('input',render);render();
};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all',RV.all]].concat(Object.entries(AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||s.areas.includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q));if(!show)return'';n++;
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · '+RV.also+' '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${s.link?`<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${s.areas.map(a=>`<span class="tag steel">${AREAN[a]||a}</span>`).join('')}${s.unverified?`<span class="tag warn">${RV.check}</span>`:''}</span></li>`}).join('');
    $('#srcCount').textContent=RV.srcOf(n,SOURCES.length)}
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
