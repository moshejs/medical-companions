<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('adc:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('adc:'+k,JSON.stringify(v))}catch(e){}}};
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
   neuron(x,y,r,o,opts)  soma + dendrites + an axon heading off at opts.axon radians (default 0)
   microglia(x,y,r,o,active)  ramified when resting, rounder with retracted processes when active
   plaque(x,y,r,seed,o)  an amyloid plaque: dense amber core, fibrillar halo
   tangle(x,y,r,o)       a neurofibrillary tangle: rose flame-shaped skein
   All colours come from CSS tokens, so they follow the theme. */
function neuron(x,y,r=12,o=1,opts={}){const a=opts.axon??0,col=opts.col||'var(--cell-line)',fill=opts.fill||'var(--cell)',dead=opts.dead||0;
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  const nd=opts.dendrites??5;for(let i=0;i<nd;i++){const t=a+Math.PI*.55+i*(Math.PI*.9/(nd-1)),L=r*(1.6+.5*Math.sin(i*1.7))*(1-.6*dead);
    const mx=Math.cos(t)*L*.55,my=Math.sin(t)*L*.55,ex=Math.cos(t+.25)*L,ey=Math.sin(t+.25)*L;
    g+=`<path d="M${f1(Math.cos(t)*r*.8)} ${f1(Math.sin(t)*r*.8)} Q${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.16)};stroke-linecap:round"/>`}
  if(opts.axonLen!==0){const L=opts.axonLen??r*3.4;g+=`<path d="M${f1(Math.cos(a)*r*.9)} ${f1(Math.sin(a)*r*.9)} L${f1(Math.cos(a)*L)} ${f1(Math.sin(a)*L)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.2)};stroke-linecap:round;${dead?'stroke-dasharray:'+f1(r*.5)+' '+f1(r*.35*dead):''}"/>`}
  g+=`<circle r="${r}" style="fill:${fill};stroke:${col};stroke-width:${f1(Math.max(1.2,r*.12))}"/><circle r="${f1(r*.42)}" style="fill:var(--nuc)"/>`;
  return g+'</g>'}
function microglia(x,y,r=9,o=1,active=0){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<7;i++){const t=i/7*Math.PI*2+.3,L=r*(2.4-1.5*active)*(0.8+.4*((i*37)%10)/10);
    g+=`<path d="M0 0 L${f1(Math.cos(t)*L)} ${f1(Math.sin(t)*L)}" style="stroke:var(--glia);stroke-width:${f1(r*.22)};stroke-linecap:round"/>`;
    if(!active)g+=`<path d="M${f1(Math.cos(t)*L*.7)} ${f1(Math.sin(t)*L*.7)} l${f1(Math.cos(t+.8)*r*.6)} ${f1(Math.sin(t+.8)*r*.6)}" style="stroke:var(--glia);stroke-width:${f1(r*.14)};stroke-linecap:round"/>`}
  g+=`<ellipse rx="${f1(r*(1+.25*active))}" ry="${f1(r*(.8+.3*active))}" style="fill:var(--glia);opacity:.9"/>`;
  return g+'</g>'}
function plaque(x,y,r=14,seed=1,o=1){const rr=rng(seed);let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<18;i++){const t=rr()*Math.PI*2,L=r*(.55+rr()*.6);g+=`<path d="M${f1(Math.cos(t)*r*.3)} ${f1(Math.sin(t)*r*.3)} L${f1(Math.cos(t)*L)} ${f1(Math.sin(t)*L)}" style="stroke:var(--amber);stroke-width:1.2;opacity:.55;stroke-linecap:round"/>`}
  g+=`<circle r="${f1(r*.42)}" style="fill:var(--amber)"/><circle r="${f1(r*.95)}" style="fill:none;stroke:var(--amber);stroke-width:1;opacity:.35;stroke-dasharray:2 3"/>`;
  return g+'</g>'}
function tangle(x,y,r=10,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<5;i++){const off=(i-2)*r*.18;g+=`<path d="M${f1(off-r*.2)} ${f1(r)} C${f1(off-r*.7)} ${f1(r*.3)} ${f1(off+r*.6)} ${f1(-r*.2)} ${f1(off*.4)} ${f1(-r*1.1)}" style="fill:none;stroke:var(--rose);stroke-width:${f1(r*.16)};stroke-linecap:round"/>`}
  return g+'</g>'}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'התחלה',g:0,n:'00',d:''},
 {id:'what',t:'מהי מחלת אלצהיימר',g:1,n:'1.1',d:'דמנציה לעומת אלצהיימר, את מי היא פוגעת, המספרים'},
 {id:'brain',t:'המוח ששוכח',g:1,n:'1.2',d:'היכן היא מתחילה ואיך היא מתפשטת, שלב אחר שלב'},
 {id:'amyloid',t:'עמילואיד, בהנפשה',g:1,n:'1.3',d:'מחיתוך אחד של חלבון ועד רובד, והוויכוח סביבו'},
 {id:'tau',t:'טאו והסבך',g:1,n:'1.4',d:'איך חלבון שלד הופך לסבך ומתפשט'},
 {id:'glia',t:'מיקרוגליה והסינפסה שאבדה',g:1,n:'1.5',d:'דלקת, גיזום, והקשר החזק ביותר לאובדן הזיכרון'},
 {id:'genes',t:'גנים ותורשה',g:1,n:'1.6',d:'APOE, משפחות עם תורשה דומיננטית, תסמונת דאון, ומה המשמעות של בדיקה גנטית'},
 {id:'cascade',t:'עשרים שנה לפני התסמינים',g:2,n:'2.1',d:'מפל הסמנים הביולוגיים, לפי הסדר'},
 {id:'stages',t:'שלבים ותסמינים',g:2,n:'2.2',d:'מהיעדר תסמינים ועד דמנציה קשה, תפקוד אחר תפקוד'},
 {id:'dx',t:'אבחון וסמנים ביולוגיים',g:2,n:'2.3',d:'קריטריונים, סריקות, נוזל השדרה, בדיקות דם וכלי סינון'},
 {id:'ddx',t:'האבחנה המבדלת',g:2,n:'2.4',d:'דליריום, דמנציה וסקולרית, גופיפי לוי, פרונטו־טמפורלית וסיבות הפיכות'},
 {id:'synapse',t:'מעכבי כולינאסטראז וממנטין',g:3,n:'3.1',d:'בתוך הסינפסה, ומה גודל התועלת באמת'},
 {id:'antibody',t:'נוגדנים נגד עמילואיד לאורך זמן',g:3,n:'3.2',d:'לקנמאב ודונאנמאב לאורך 18 חודשים, ARIA והוויכוח'},
 {id:'bpsd',t:'מעבר לזיכרון',g:3,n:'3.3',d:'אי־שקט, מצב רוח, פסיכוזה ושינה, והאזהרות לגבי תרופות'},
 {id:'prevent',t:'הפחתת הסיכון',g:4,n:'4.1',d:'14 גורמי הסיכון הניתנים לשינוי, ומה מראים הניסויים'},
 {id:'living',t:'לחיות עם דמנציה ולטפל',g:4,n:'4.2',d:'תכנון, בטיחות, מטפלים וסוף החיים'},
 {id:'nursing',t:'טיפול סיעודי',g:4,n:'4.3',d:'הערכה, מתן תרופות, תקשורת, תיעוד'},
 {id:'cure',t:'לקראת ריפוי',g:4,n:'4.4',d:'תרופות בפיתוח, ניסויי מניעה, והראיות לכל כיוון'},
 {id:'history',t:'היסטוריה ואנשים',g:5,n:'5.1',d:'מאוגוסטה דטר ב־1901 ועד הנוגדנים'},
 {id:'review',t:'כרטיסיות וטכניקות זכירה',g:5,n:'5.2',d:'כרטיסיות להיפוך, לפי נושא'},
 {id:'quiz',t:'בוחן',g:5,n:'5.3',d:'שאלות עם הסברים'},
 {id:'glossary',t:'מילון מונחים',g:5,n:'5.4',d:'כל המונחים, עם חיפוש'},
 {id:'sources',t:'מקורות',g:5,n:'5.5',d:'כל המקורות שעליהם נשען המלווה'}
];
const GROUPS={1:['המחלה','g-dz','c-dz'],2:['מהלך ואבחון','g-dz','c-dz'],3:['טיפול','g-tx','c-tx'],4:['חיים, טיפול ומניעה','g-sage','c-sage'],5:['הקשר וחזרה','g-sage','c-sage']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('adc:tab');sessionStorage.setItem('adc:tab','1')}catch(e){}
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
(function theme(){
  const btn=$('#themeBtn');const modes=['auto','light','dark'];let m=store.get('theme','auto');
  function apply(){if(m==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',m);btn.textContent='%t:theme.label%'+{auto:'%t:theme.auto%',light:'%t:theme.light%',dark:'%t:theme.dark%'}[m]}
  btn.addEventListener('click',()=>{m=modes[(modes.indexOf(m)+1)%3];store.set('theme',m);apply()});apply();
})();
/* language switch keeps the current module */
(function lang(){const a=$('#langBtn');if(!a)return;const base=a.getAttribute('href');
  const upd=()=>a.setAttribute('href',base+location.hash);['pointerdown','focus','click','mouseenter'].forEach(e=>a.addEventListener(e,upd));upd()})();
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

/* the shared player: a range input + a play button drive draw(t) */
function playWire(rg,pb,draw,dur,doneLabel='%t:player.replay%',hideKey){
  let stopA=null;function stop(){if(stopA)stopA();stopA=null;pb.textContent='%t:player.play%'}
  rg.addEventListener('input',()=>{stop();draw(+rg.value)});
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
