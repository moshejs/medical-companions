<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('mgc:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('mgc:'+k,JSON.stringify(v))}catch(e){}}};
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
/* ---- the junction drawing kit ----
   Shared glyphs so every module draws the same junction the same way. Each returns an SVG string. */
/* acetylcholine: a small gold dot */
const achDot=(x,y,r=2.6,o=1)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--ach);opacity:${(+o).toFixed(2)}"/>`;
/* a synaptic vesicle with n ACh dots inside */
function vesicle(x,y,r=9,o=1,n=5){let s=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><circle r="${r}" style="fill:var(--vesicle);stroke:var(--ach);stroke-width:1.2"/>`;
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2+.4,q=r*.45;s+=`<circle cx="${f1(Math.cos(a)*q)}" cy="${f1(Math.sin(a)*q)}" r="${f1(r*.2)}" style="fill:var(--ach)"/>`}return s+'</g>'}
/* an acetylcholine receptor seen from the side, mouth up; open=0..1 widens the pore; st overrides the colour */
function achr(x,y,w=12,open=0,o=1,st='var(--achr)'){const g=lerp(1.2,3.4,open);return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><path d="M${f1(-w/2)} 0V${f1(-w*1.1)}Q${f1(-w/2)} ${f1(-w*1.4)} ${f1(-g)} ${f1(-w*1.35)}V0Z" style="fill:${st}"/><path d="M${f1(w/2)} 0V${f1(-w*1.1)}Q${f1(w/2)} ${f1(-w*1.4)} ${f1(g)} ${f1(-w*1.35)}V0Z" style="fill:${st}"/></g>`}
/* an IgG antibody: a Y, arms toward angle (radians, 0 = up) */
function igg(x,y,s=10,ang=0,o=1,col='var(--ab)'){return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang*180/Math.PI)})" style="opacity:${(+o).toFixed(2)}"><path d="M0 ${f1(s)}V0M0 0L${f1(-s*.7)} ${f1(-s*.75)}M0 0L${f1(s*.7)} ${f1(-s*.75)}" style="fill:none;stroke:${col};stroke-width:${f1(s*.26)};stroke-linecap:round"/></g>`}
/* an eye with its upper lid: droop 0 (open) .. 1 (closed). The lid's lower margin slides down over the eye. */
function eyelid(x,y,w=60,droop=0,o=1){const h=w*.34,top=-h*1.25,lid=lerp(top,h*1.1,clamp(droop));
  return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><path d="M${f1(-w/2-6)} ${f1(top*.9)}Q0 ${f1(top*1.75)} ${f1(w/2+6)} ${f1(top*.9)}" style="fill:none;stroke:var(--memb);stroke-width:1.4;stroke-linecap:round"/><path d="M${f1(-w/2)} 0Q0 ${f1(top)} ${f1(w/2)} 0Q0 ${f1(-top)} ${f1(-w/2)} 0Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/><circle r="${f1(h*.62)}" style="fill:var(--nerve)"/><circle r="${f1(h*.28)}" style="fill:var(--ink)"/><path d="M${f1(-w/2)} 0Q0 ${f1(top)} ${f1(w/2)} 0Q0 ${f1(lid)} ${f1(-w/2)} 0Z" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.6;stroke-linejoin:round"/></g>`}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What myasthenia gravis is',g:1,n:'1.1',d:'Who gets it, the numbers, the muscles it reaches'},
 {id:'nmj',t:'The neuromuscular junction',g:1,n:'1.2',d:'One nerve impulse in slow motion, and the safety factor'},
 {id:'antibodies',t:'Antibodies at the junction',g:1,n:'1.3',d:'AChR, complement, MuSK and LRP4, animated'},
 {id:'fatigue',t:'Weakness over a day',g:1,n:'1.4',d:'Why muscles tire with use and recover with rest'},
 {id:'dx',t:'Diagnosis',g:2,n:'2.1',d:'Antibodies, nerve tests, single-fibre EMG, a calculator'},
 {id:'classes',t:'MGFA class & scores',g:2,n:'2.2',d:'MGFA classes I to V, MG-ADL and QMG, scored live'},
 {id:'ddx',t:'The differential',g:2,n:'2.3',d:'Lambert-Eaton, botulism, ALS, eye and muscle disease'},
 {id:'pyrido',t:'Pyridostigmine, animated',g:3,n:'3.1',d:'Buying time at the receptor, dose by dose'},
 {id:'ladder',t:'The treatment ladder',g:3,n:'3.2',d:'From symptom relief to immunotherapy and biologics'},
 {id:'thymectomy',t:'Thymectomy over the years',g:3,n:'3.3',d:'The thymus, thymoma and the MGTX trial'},
 {id:'biologics',t:'Complement & FcRn inhibitors',g:3,n:'3.4',d:'The newer biologics, trial week by trial week'},
 {id:'crisis',t:'Myasthenic crisis',g:4,n:'4.1',d:'Triggers, the breathing numbers, ICU care'},
 {id:'drugs',t:'Drugs that can worsen MG',g:4,n:'4.2',d:'A cited checker: antibiotics, magnesium and more'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.3',d:'Assessment, timing the doses, teaching, documentation'},
 {id:'living',t:'Living with MG',g:4,n:'4.4',d:'Pregnancy, surgery, exercise, vaccines, work'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.5',d:'CAR-T, B-cell targets and the evidence for each route'},
 {id:'history',t:'History & people',g:5,n:'5.1',d:'From Willis in 1672 to the biologics'},
 {id:'review',t:'Flashcards & mnemonics',g:5,n:'5.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Diagnosis','g-nv','c-nv'],3:['Treatment','g-tx','c-tx'],4:['Crisis, care & the future','g-dz','c-dz'],5:['Context & review','g-nv','c-nv']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('mgc:tab');sessionStorage.setItem('mgc:tab','1')}catch(e){}
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
  return i=>$$('[data-st]',el).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
}
function phaseOf(steps,t){let p=0;steps.forEach((s,i)=>{if(t>=s.from)p=i});return p}
function noteHTML(P){return `<div class="kicker">${P.k||''}</div><h4>${P.t}</h4>${P.txt?`<p>${P.txt}</p>`:''}${P.pt?`<div class="pt"><b>In plain words</b>${P.pt}</div>`:''}${P.hook?`<div class="hook"><b>Exam hook</b>${P.hook}</div>`:''}`}
