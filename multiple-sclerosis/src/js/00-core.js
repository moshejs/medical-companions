<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('msc:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('msc:'+k,JSON.stringify(v))}catch(e){}}};
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
   All colours come from CSS tokens, so they follow the theme.
   fiber(x0,x1,y,o)       a myelinated axon from x0 to x1. o: {seg (internode length), gap (node width), h (sheath height),
                          demy:[ [a,b],... ] stretches (0..1 of the length) with myelin stripped, thin:[ [a,b] ] remyelinated (thin sheaths),
                          cut:a (axon transected at a), loss (0..1 fade of the myelin in demy stretches), axonW}
                          Returns {svg, nodes:[x...], at(u)->x}. Node x positions are where a saltatory signal lands.
   tcell(x,y,r,o,lbl)     a T cell (orange) with TCR spikes; lbl 'T', 'CD8', 'Th17'
   bcell(x,y,r,o)         a B cell (violet) with antibody receptors on its surface
   plasma(x,y,r,o)        a plasma cell (CD20-negative): eccentric nucleus, lots of cytoplasm
   mac(x,y,r,o,active,seed) a macrophage / activated microglia: irregular body with myelin debris vacuoles
   oligo(x,y,r,o)         an oligodendrocyte: small body with processes
   ab(x,y,s,rot,c)        a Y-shaped antibody
   lesion(x,y,r,seed,o,c) an MRI-style ovoid lesion blob (bright on dark) */
function fiber(x0,x1,y,o={}){const seg=o.seg||46,gap=o.gap||6,h=o.h||14,L=x1-x0,dm=o.demy||[],th=o.thin||[],cut=o.cut,loss=o.loss==null?1:o.loss,aw=o.axonW||4;
  const inR=(u,R)=>R.some(([a,b])=>u>=a&&u<=b);let s='',nodes=[];
  const ax=cut==null?`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--axon);stroke-width:${aw};stroke-linecap:round"/>`
    :`<line x1="${f1(x0)}" x2="${f1(x0+L*cut-4)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--axon);stroke-width:${aw};stroke-linecap:round"/><circle cx="${f1(x0+L*cut-4)}" cy="${f1(y)}" r="${aw*1.4}" style="fill:var(--axon)"/><line x1="${f1(x0+L*cut+6)}" x2="${f1(x1)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--axon);stroke-width:${aw};stroke-linecap:round;stroke-dasharray:3 4;opacity:.45"/>`;
  s+=ax;
  for(let x=x0+gap;x<x1-gap;x+=seg+gap){const w=Math.min(seg,x1-gap-x);if(w<8)break;const mid=(x+w/2-x0)/L;
    nodes.push(x-gap/2);
    if(inR(mid,dm)){if(loss<1)s+=`<rect x="${f1(x)}" y="${f1(y-h/2)}" width="${f1(w)}" height="${h}" rx="${h/2}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1;opacity:${f1(1-loss)}"/>`;continue}
    const thin=inR(mid,th),hh=thin?h*.55:h,ww=thin?w*.6:w,xx=thin?x+w*.2:x;
    if(thin)nodes.push(x+w*.1,x+w*.9);
    s+=`<rect x="${f1(xx)}" y="${f1(y-hh/2)}" width="${f1(ww)}" height="${f1(hh)}" rx="${f1(hh/2)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1"/>`}
  nodes.push(x1);
  return {svg:s,nodes,at:u=>x0+L*u}}
function tcell(x,y,r=10,o=1,lbl='T'){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<8;i++){const t=i/8*Math.PI*2;g+=`<line x1="${f1(Math.cos(t)*r)}" y1="${f1(Math.sin(t)*r)}" x2="${f1(Math.cos(t)*r*1.3)}" y2="${f1(Math.sin(t)*r*1.3)}" style="stroke:var(--tcell);stroke-width:1.6;stroke-linecap:round"/>`}
  g+=`<circle r="${r}" style="fill:var(--orange-soft);stroke:var(--tcell);stroke-width:1.8"/><circle r="${f1(r*.55)}" style="fill:var(--tcell);opacity:.8"/>`;
  if(lbl)g+=`<text y="${f1(r*.3)}" class="t-mid" style="font:700 ${f1(Math.max(7,r*.75))}px var(--mono);fill:var(--panel)">${lbl}</text>`;
  return g+'</g>'}
function ab(x,y,s=6,rot=0,c='var(--bcell)'){return `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" d="M0 0V${f1(s)}M0 0L${f1(-s*.7)} ${f1(-s*.7)}M0 0L${f1(s*.7)} ${f1(-s*.7)}" style="fill:none;stroke:${c};stroke-width:1.6;stroke-linecap:round"/>`}
function bcell(x,y,r=10,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<6;i++){const t=i/6*Math.PI*2+.3;g+=ab(Math.cos(t)*r,Math.sin(t)*r,r*.42,t*180/Math.PI+90)}
  g+=`<circle r="${r}" style="fill:var(--lymph);stroke:var(--bcell);stroke-width:1.8"/><circle r="${f1(r*.55)}" style="fill:var(--bcell);opacity:.8"/><text y="${f1(r*.3)}" class="t-mid" style="font:700 ${f1(Math.max(7,r*.75))}px var(--mono);fill:var(--panel)">B</text>`;
  return g+'</g>'}
function plasma(x,y,r=11,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><ellipse rx="${f1(r*1.2)}" ry="${r}" style="fill:var(--lymph);stroke:var(--plasma);stroke-width:1.8"/><circle cx="${f1(r*.45)}" r="${f1(r*.45)}" style="fill:var(--plasma)"/>`;
  for(let i=0;i<3;i++)g+=ab(-r*1.5-i*6,-r*.6+i*5,4,-90+i*20,'var(--plasma)');return g+'</g>'}
function mac(x,y,r=12,o=1,active=1,seed=3){const rr=rng(seed);let d='';const N=14;for(let i=0;i<=N;i++){const t=i/N*Math.PI*2,k=r*(1+(rr()-.5)*.35*(active?1:.4));d+=(i?'L':'M')+f1(Math.cos(t)*k)+' '+f1(Math.sin(t)*k)}
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><path d="${d}z" style="fill:var(--cell);stroke:var(--mac);stroke-width:1.8;stroke-linejoin:round"/><circle cx="${f1(-r*.25)}" cy="${f1(-r*.1)}" r="${f1(r*.32)}" style="fill:var(--mac);opacity:.75"/>`;
  if(active)for(let i=0;i<3;i++)g+=`<circle cx="${f1(r*(.2+.18*i))}" cy="${f1(r*(.35-.3*i))}" r="${f1(r*.16)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:.8"/>`;
  return g+'</g>'}
function oligo(x,y,r=8,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<4;i++){const t=-Math.PI/2+(i-1.5)*.55;g+=`<path d="M0 0 Q${f1(Math.cos(t)*r*1.6)} ${f1(Math.sin(t)*r*1.2)} ${f1(Math.cos(t)*r*2.6)} ${f1(Math.sin(t)*r*2.6+r*3)}" style="fill:none;stroke:var(--myelin-line);stroke-width:1.4"/>`}
  g+=`<circle r="${r}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1.4"/><circle r="${f1(r*.45)}" style="fill:var(--nuc)"/>`;return g+'</g>'}
function lesion(x,y,r=6,seed=1,o=1,c='var(--mri-lesion)'){const rr=rng(seed);let d='';const N=12;for(let i=0;i<=N;i++){const t=i/N*Math.PI*2,k=r*(1+(rr()-.5)*.3);d+=(i?'L':'M')+f1(Math.cos(t)*k*1.25)+' '+f1(Math.sin(t)*k*.85)}
  return `<path transform="translate(${f1(x)} ${f1(y)})" d="${d}z" style="fill:${c};opacity:${(+o).toFixed(2)}"/>`}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What MS is',g:1,n:'1.1',d:'Who gets it, the numbers, where in the nervous system it strikes'},
 {id:'myelin',t:'Myelin & demyelination',g:1,n:'1.2',d:'Saltatory conduction, a lesion forming, repair and axon loss'},
 {id:'immune',t:'The immune attack',g:1,n:'1.3',d:'T cells, B cells and the blood-brain barrier, step by step'},
 {id:'risk',t:'Genes & risk factors',g:1,n:'1.4',d:'HLA-DRB1*15:01, Epstein-Barr virus, vitamin D, smoking'},
 {id:'course',t:'Relapse & remission over time',g:2,n:'2.1',d:'RRMS, SPMS and PPMS on one timeline; PIRA and smouldering MS'},
 {id:'relapse',t:'A relapse, week by week',g:2,n:'2.2',d:'Onset, steroids, recovery; relapse versus pseudo-relapse'},
 {id:'edss',t:'Measuring disability: EDSS',g:2,n:'2.3',d:'The 0–10 scale and what confirmed worsening means'},
 {id:'dx',t:'McDonald criteria calculator',g:3,n:'3.1',d:'Place lesions, add CSF, see the 2017 and 2024 verdicts'},
 {id:'ddx',t:'The differential',g:3,n:'3.2',d:'NMOSD, MOGAD, small-vessel disease and other mimics'},
 {id:'dmt',t:'How the drugs work',g:4,n:'4.1',d:'Where each disease-modifying therapy hits the attack'},
 {id:'ladder',t:'The DMT ladder',g:4,n:'4.2',d:'Escalation or early high-efficacy, stepping up, stopping later'},
 {id:'safety',t:'Safety & monitoring',g:4,n:'4.3',d:'PML and the JCV index, infections, vaccines, rebound'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.4',d:'Remyelination, BTK inhibitors, stem cells, EBV, with evidence labels'},
 {id:'symptoms',t:'Symptoms & rehabilitation',g:5,n:'5.1',d:'Fatigue, spasticity, bladder, walking, mood, cognition'},
 {id:'living',t:'Living with MS',g:5,n:'5.2',d:'Pregnancy, work, heat, exercise, vaccines, planning'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Assessment, giving the medicines, monitoring, teaching'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'Carswell and Charcot to EBV and the 2024 criteria'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['The course','g-course','c-course'],3:['Diagnosis','g-dx','c-dx'],4:['Treatment','g-rx','c-rx'],5:['Living with MS','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('msc:tab');sessionStorage.setItem('msc:tab','1')}catch(e){}
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
