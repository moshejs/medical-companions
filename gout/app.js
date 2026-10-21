(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('goutc:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('goutc:'+k,JSON.stringify(v))}catch(e){}}};
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
/* a neutrophil glyph: multi-lobed nucleus */
function neutro(x,y,r=11,o=1,extra=''){return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}" ${extra}><circle r="${r}" style="fill:var(--neut);stroke:var(--crocus);stroke-width:1.4"/><circle cx="${-r*.3}" cy="${-r*.18}" r="${r*.27}" style="fill:var(--nuc)"/><circle cx="${r*.28}" cy="${r*.2}" r="${r*.27}" style="fill:var(--nuc)"/><circle cx="${r*.2}" cy="${-r*.33}" r="${r*.23}" style="fill:var(--nuc)"/></g>`}
/* a monosodium urate crystal: a thin needle (ice-cyan); CPP crystals are short rhomboids (green) */
function needle(x,y,len=16,ang=0,o=1,col='var(--xtal)'){const r=ang*Math.PI/180,dx=Math.cos(r)*len/2,dy=Math.sin(r)*len/2;return `<line x1="${f1(x-dx)}" y1="${f1(y-dy)}" x2="${f1(x+dx)}" y2="${f1(y+dy)}" style="stroke:${col};stroke-width:2.2;stroke-linecap:round;opacity:${(+o).toFixed(2)}"/>`}
function rhomb(x,y,s=7,ang=0,o=1,col='var(--cppd)'){return `<rect x="${f1(-s/2)}" y="${f1(-s*.35)}" width="${f1(s)}" height="${f1(s*.7)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${ang}) skewX(-20)" style="fill:none;stroke:${col};stroke-width:1.8;opacity:${(+o).toFixed(2)}"/>`}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What gout is',g:1,n:'1.1',d:'Who gets it, the numbers, the four stages'},
 {id:'urate',t:'Where urate comes from',g:1,n:'1.2',d:'Purines, xanthine oxidase, the kidney and the gut'},
 {id:'crystals',t:'Crystals vs serum urate',g:1,n:'1.3',d:'Saturation, temperature and years of deposition'},
 {id:'flare',t:'A flare, hour by hour',g:1,n:'1.4',d:'Crystal → NLRP3 → IL-1β → neutrophils, then resolution'},
 {id:'colin',t:'Colchicine inside the cell',g:2,n:'2.1',d:'From pill to neutrophil to microtubule to NLRP3'},
 {id:'flarerx',t:'Treating a flare',g:2,n:'2.2',d:'Colchicine, NSAIDs, steroids, IL-1 blockers, ice'},
 {id:'coldose',t:'Colchicine dosing & safety',g:2,n:'2.3',d:'Published doses, the kidneys, interactions, toxicity'},
 {id:'ult',t:'How urate-lowering drugs work',g:3,n:'3.1',d:'Make less, excrete more, or break it down'},
 {id:'t2t',t:'Treat to target',g:3,n:'3.2',d:'Start low, go slow, reach < 6 mg/dL, cover the first months'},
 {id:'ultsafety',t:'Safety of urate-lowering drugs',g:3,n:'3.3',d:'HLA-B*58:01, CARES vs FAST, interactions'},
 {id:'dx',t:'Diagnosis & the ACR/EULAR score',g:4,n:'4.1',d:'Crystals under polarised light, imaging, the 2015 calculator'},
 {id:'ddx',t:'The differential',g:4,n:'4.2',d:'CPPD, septic arthritis, cellulitis and other hot joints'},
 {id:'links',t:'Gout, kidneys & heart',g:4,n:'4.3',d:'CKD, stones, blood pressure and cardiovascular risk'},
 {id:'living',t:'Living with gout',g:5,n:'5.1',d:'Diet, alcohol, weight, other medicines, a flare plan'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.2',d:'Assessment, giving the medicines, teaching, documentation'},
 {id:'cure',t:'Toward a cure',g:5,n:'5.3',d:'Dissolving crystals for good, and the pipeline'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'Podagra to polarised light to allopurinol'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Treating a flare','g-colch','c-colch'],3:['Lowering urate','g-sea','c-sea'],4:['Diagnosis & complications','g-dz','c-dz'],5:['Living, care & the future','g-sea','c-sea'],6:['Context & review','g-sea','c-sea']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('goutc:tab');sessionStorage.setItem('goutc:tab','1')}catch(e){}
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
const SOURCES=[{"key": "Abhishek2017", "text": "Abhishek A, Jenkins W, La-Crette J, Fernandes G, Doherty M. Long-term persistence and adherence on urate-lowering treatment can be maintained in primary care-5-year follow-up of a proof-of-concept study. Rheumatology (Oxford). 2017;56(4):529-533. PMID 28082620; doi:10.1093/rheumatology/kew395. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kew395", "areas": ["G"], "unverified": false}, {"key": "Abhishek2023", "text": "Abhishek A, Tedeschi SK, Pascart T, Latourte A, Dalbeth N, Neogi T, et al. The 2023 ACR/EULAR classification criteria for calcium pyrophosphate deposition disease. Arthritis Rheumatol. 2023;75(10):1703-1713. PMID 37494275; PMCID PMC10543651; doi:10.1002/art.42619. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.42619", "areas": ["B"], "unverified": false}, {"key": "Abhishek2023ARD", "text": "Abhishek A, Tedeschi SK, Pascart T, Latourte A, Dalbeth N, Neogi T, et al. The 2023 ACR/EULAR classification criteria for calcium pyrophosphate deposition disease. Ann Rheum Dis. 2023;82(10):1248-1257. PMID 37495237; PMCID PMC10529191; doi:10.1136/ard-2023-224575. Validated: PubMed, Europe PMC (abstract; item names confirmed by full-text phrase search), 2026-10-20.", "link": "https://doi.org/10.1136/ard-2023-224575", "areas": ["B"], "unverified": false}, {"key": "AbouElela2017", "text": "Abou-Elela A. Epidemiology, pathophysiology, and management of uric acid urolithiasis: a narrative review. J Adv Res. 2017;8(5):513-527. PMID 28748117; PMCID PMC5512151; doi:10.1016/j.jare.2017.04.005. Validated: Europe PMC (record and full text), 2026-10-20.", "link": "https://doi.org/10.1016/j.jare.2017.04.005", "areas": ["F"], "unverified": false}, {"key": "Ahern1987", "text": "Ahern MJ, Reid C, Gordon TP, McCredie M, Brooks PM, Jones M. Does colchicine work? The results of the first controlled study in acute gout. Aust N Z J Med. 1987;17(3):301-304. PMID 3314832; doi:10.1111/j.1445-5994.1987.tb01232.x. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1111/j.1445-5994.1987.tb01232.x", "areas": ["D"], "unverified": false}, {"key": "Aletaha2010", "text": "Aletaha D, Neogi T, Silman AJ, Funovits J, Felson DT, Bingham CO 3rd, et al. 2010 Rheumatoid arthritis classification criteria: an American College of Rheumatology/European League Against Rheumatism collaborative initiative. Arthritis Rheum. 2010;62(9):2569-2581. PMID 20872595; doi:10.1002/art.27584. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.27584", "areas": ["B"], "unverified": false}, {"key": "Alloway1993", "text": "Alloway JA, Moriarty MJ, Hoogland YT, Nashel DJ. Comparison of triamcinolone acetonide with indomethacin in the treatment of acute gouty arthritis. J Rheumatol. 1993;20(1):111-113. PMID 8441139. Validated: Europe PMC, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/8441139/", "areas": ["D"], "unverified": false}, {"key": "Ames1981", "text": "Ames BN, Cathcart R, Schwiers E, Hochstein P. Uric acid provides an antioxidant defense in humans against oxidant- and radical-caused aging and cancer: a hypothesis. Proc Natl Acad Sci U S A. 1981;78(11):6858-6862. PMID 6947260; PMCID PMC349151; doi:10.1073/pnas.78.11.6858. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1073/pnas.78.11.6858", "areas": ["C"], "unverified": false}, {"key": "ArcalystPI", "text": "ARCALYST (rilonacept) injection, for subcutaneous use, US prescribing information (Kiniksa), revised 10/2025. DailyMed setid ad965f38-dd22-4607-a673-2fb92f3b527a; current label version 16 Dec 2025. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad965f38-dd22-4607-a673-2fb92f3b527a. Validated: reused verbatim from fmf/src/sources.json; indications re-read on DailyMed (no gout indication), 2026-10-20.", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad965f38-dd22-4607-a673-2fb92f3b527a", "areas": ["H"], "unverified": false}, {"key": "Aune2014", "text": "Aune D, Norat T, Vatten LJ. Body mass index and the risk of gout: a systematic review and dose-response meta-analysis of prospective studies. Eur J Nutr. 2014;53(8):1591-1601. PMID 25209031; doi:10.1007/s00394-014-0766-0. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s00394-014-0766-0", "areas": ["F"], "unverified": false}, {"key": "Badve2020", "text": "Badve SV, Pascoe EM, Tiku A, Boudville N, Brown FG, Cass A, et al. Effects of allopurinol on the progression of chronic kidney disease. N Engl J Med. 2020;382(26):2504-2513. PMID 32579811; doi:10.1056/NEJMoa1915833. Validated: Europe PMC|Crossref, 2026-10-20.", "link": "https://doi.org/10.1056/NEJMoa1915833", "areas": ["F", "H"], "unverified": false}, {"key": "Baer2016", "text": "Baer AN, Kurano T, Thakur UJ, Thawait GK, Fuld MK, Maynard JW, et al. Dual-energy computed tomography has limited sensitivity for non-tophaceous gout: a comparison study with tophaceous gout. BMC Musculoskelet Disord. 2016;17:91. PMID 26891750; PMCID PMC4758140; doi:10.1186/s12891-016-0943-9. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/s12891-016-0943-9", "areas": ["B"], "unverified": false}, {"key": "Banerjee2023", "text": "Banerjee M, Pal R, Maisnam I, Chowdhury S, Mukhopadhyay S. Serum uric acid lowering and effects of sodium-glucose cotransporter-2 inhibitors on gout: a meta-analysis and meta-regression of randomized controlled trials. Diabetes Obes Metab. 2023;25(9):2697-2703. PMID 37334516; doi:10.1111/dom.15157. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1111/dom.15157", "areas": ["F"], "unverified": false}, {"key": "Baraf2024", "text": "Baraf HSB, Khanna PP, Kivitz AJ, Strand V, Choi HK, Terkeltaub R, et al. The COMPARE head-to-head, randomized controlled trial of SEL-212 (pegadricase plus rapamycin-containing nanoparticle, ImmTOR™) versus pegloticase for refractory gout. Rheumatology (Oxford). 2024;63(4):1058-1067. PMID 37449908; PMCID PMC10986798; doi:10.1093/rheumatology/kead333. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kead333", "areas": ["H"], "unverified": false}, {"key": "Baraf2026", "text": "Baraf HSB, Khanna PP, Petronijevic M, Lortkipanidze M, Patel A, Ayesu K, et al. Efficacy and Safety of Nanoencapsulated Sirolimus Plus Pegadricase: Results From the Randomized, Placebo-Controlled Phase 3 Trials. Arthritis Rheumatol. 2026 (online ahead of print, 31 Jul 2026; volume and pages not yet assigned). PMID 42351343; doi:10.1002/art.70266. Validated: PubMed, Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/art.70266", "areas": ["H"], "unverified": false}, {"key": "Bardin2017", "text": "Bardin T, Keenan RT, Khanna PP, Kopicko J, Fung M, Bhakta N, et al. Lesinurad in combination with allopurinol: a randomised, double-blind, placebo-controlled study in patients with gout with inadequate response to standard of care (the multinational CLEAR 2 study). Ann Rheum Dis. 2017;76(5):811-820. PMID 27821644; PMCID PMC5530336; doi:10.1136/annrheumdis-2016-209213. Validated: PubMed, ClinicalTrials.gov (NCT01493531), 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2016-209213", "areas": ["E", "H"], "unverified": false}, {"key": "Beberashvili2026", "text": "Beberashvili I, Marsa HA, Doenyas-Barak K, Maslakov I, Efrati S. The Incidence and Risk Factors of Gout in Non-dialysis Chronic Kidney Disease Patients With Asymptomatic Hyperuricemia. Kidney Med. 2026;8(2):101197. PMID 41608294; PMCID PMC12835416; doi:10.1016/j.xkme.2025.101197. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/j.xkme.2025.101197", "areas": ["A"], "unverified": false}, {"key": "Becker2005", "text": "Becker MA, Schumacher HR Jr, Wortmann RL, MacDonald PA, Eustace D, Palo WA, et al. Febuxostat compared with allopurinol in patients with hyperuricemia and gout. N Engl J Med. 2005;353(23):2450-61. PMID 16339094; doi:10.1056/NEJMoa050373. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1056/NEJMoa050373", "areas": ["A", "E"], "unverified": false}, {"key": "Becker2010", "text": "Becker MA, Schumacher HR, Espinoza LR, Wells AF, MacDonald P, Lloyd E, et al. The urate-lowering efficacy and safety of febuxostat in the treatment of the hyperuricemia of gout: the CONFIRMS trial. Arthritis Res Ther. 2010;12(2):R63. PMID 20370912; PMCID PMC2888216; doi:10.1186/ar2978. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/ar2978", "areas": ["E"], "unverified": false}, {"key": "Bellamy1987", "text": "Bellamy N, Downie WW, Buchanan WW. Observations on spontaneous improvement in patients with podagra: implications for therapeutic trials of non-steroidal anti-inflammatory drugs. Br J Clin Pharmacol. 1987;24(1):33-36. PMID 3304384; PMCID PMC1386276; doi:10.1111/j.1365-2125.1987.tb03132.x. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1111/j.1365-2125.1987.tb03132.x", "areas": ["B", "C", "D"], "unverified": false}, {"key": "BenChetrit1998MH", "text": "Ben-Chetrit E, Levy M. Does the lack of the P-glycoprotein efflux pump in neutrophils explain the efficacy of colchicine in familial Mediterranean fever and other inflammatory diseases? Med Hypotheses. 1998;51(5):377–380. PMID 9848464. doi:10.1016/S0306-9877(98)90031-7. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1016/S0306-9877(98", "areas": ["D"], "unverified": false}, {"key": "Berendsen2017", "text": "Berendsen D, Neogi T, Taylor WJ, Dalbeth N, Jansen TL. Crystal identification of synovial fluid aspiration by polarized light microscopy. An online test suggesting that our traditional rheumatologic competence needs renewed attention and training. Clin Rheumatol. 2017;36(3):641-647. PMID 27837341; doi:10.1007/s10067-016-3461-0. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s10067-016-3461-0", "areas": ["B"], "unverified": false}, {"key": "Bhole2010", "text": "Bhole V, de Vera M, Rahman MM, Krishnan E, Choi H. Epidemiology of gout in women: Fifty-two-year followup of a prospective cohort. Arthritis Rheum. 2010;62(4):1069-76. PMID 20131266; doi:10.1002/art.27338. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/art.27338", "areas": ["A"], "unverified": false}, {"key": "Billy2018", "text": "Billy CA, Lim RT, Ruospo M, Palmer SC, Strippoli GFM. Corticosteroid or nonsteroidal antiinflammatory drugs for the treatment of acute gout: a systematic review of randomized controlled trials. J Rheumatol. 2018;45(1):128-136. PMID 28765243; doi:10.3899/jrheum.170137. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.170137", "areas": ["D"], "unverified": false}, {"key": "Bongartz2015", "text": "Bongartz T, Glazebrook KN, Kavros SJ, Murthy NS, Merry SP, Franz WB 3rd, et al. Dual-energy CT for the diagnosis of gout: an accuracy and diagnostic yield study. Ann Rheum Dis. 2015;74(6):1072-1077. PMID 24671771; PMCID PMC4431329; doi:10.1136/annrheumdis-2013-205095. Validated: PubMed, Europe PMC (full text), 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2013-205095", "areas": ["B"], "unverified": false}, {"key": "Borstad2004", "text": "Borstad GC, Bryant LR, Abel MP, Scroggie DA, Harris MD, Alloway JA. Colchicine for prophylaxis of acute flares when initiating allopurinol for chronic gouty arthritis. J Rheumatol. 2004;31(12):2429-2432. PMID 15570646. Validated: Europe PMC, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/15570646/", "areas": ["D", "E"], "unverified": false}, {"key": "Botson2023", "text": "Botson JK, Saag K, Peterson J, Parikh N, Ong S, La D, et al. A randomized, placebo-controlled study of methotrexate to increase response rates in patients with uncontrolled gout receiving pegloticase: primary efficacy and safety findings. Arthritis Rheumatol. 2023;75(2):293-304. PMID 36099211; PMCID PMC10107774; doi:10.1002/art.42335. Validated: PubMed, ClinicalTrials.gov (NCT03994731, MIRROR RCT), 2026-10-20.", "link": "https://doi.org/10.1002/art.42335", "areas": ["E", "H"], "unverified": false}, {"key": "Brikman2025", "text": "Brikman S, Perets O, Serfaty L, Abuhasira R, Schlesinger N, Ayalon S, et al. Incidence of gout diagnosis among participants with hyperuricemia, insights from a nationwide cohort study. Semin Arthritis Rheum. 2025;74:152764. PMID 40570634; doi:10.1016/j.semarthrit.2025.152764. Validated: PubMed, Crossref, 2026-10-20.", "link": "https://doi.org/10.1016/j.semarthrit.2025.152764", "areas": ["A"], "unverified": false}, {"key": "Broz2016", "text": "Broz P, Dixit VM. Inflammasomes: mechanism of assembly, regulation and signalling. Nature Reviews Immunology. 2016;16(7):407-420. PMID: 27291964. DOI: 10.1038/nri.2016.58. Validated: Europe PMC, 2026-10-20 (FMF key and text reused).", "link": "https://doi.org/10.1038/nri.2016.58", "areas": ["C"], "unverified": false}, {"key": "Bruderer2014", "text": "Bruderer S, Bodmer M, Jick SS, Meier CR. Use of diuretics and risk of incident gout: a population-based case-control study. Arthritis Rheumatol. 2014;66(1):185-196. PMID 24449584; doi:10.1002/art.38203. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.38203", "areas": ["F"], "unverified": false}, {"key": "Bursill2019", "text": "Bursill D, Taylor WJ, Terkeltaub R, Kuwabara M, Merriman TR, Grainger R, et al. Gout, Hyperuricemia, and Crystal-Associated Disease Network consensus statement regarding labels and definitions for disease elements in gout. Arthritis Care Res (Hoboken). 2019;71(3):427-434. PMID 29799677; PMCID PMC6252290; doi:10.1002/acr.23607. Validated: PubMed, Europe PMC (abstract; definition wording confirmed by Europe PMC full-text phrase search), 2026-10-20.", "link": "https://doi.org/10.1002/acr.23607", "areas": ["B"], "unverified": false}, {"key": "Bursill2019ARD", "text": "Bursill D, Taylor WJ, Terkeltaub R, Abhishek A, So AK, Vargas-Santos AB, et al. Gout, Hyperuricaemia and Crystal-Associated Disease Network (G-CAN) consensus statement regarding labels and definitions of disease states of gout. Ann Rheum Dis. 2019;78(11):1592-1600. PMID 31501138; PMCID PMC7288724; doi:10.1136/annrheumdis-2019-215933. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2019-215933", "areas": ["B"], "unverified": false}, {"key": "Busso2010", "text": "Busso N, So A. Mechanisms of inflammation in gout. Arthritis Res Ther. 2010;12(2):206. PMID 20441605; PMCID PMC2888190; doi:10.1186/ar2952. Validated: Europe PMC, Crossref, PMC full text, 2026-10-20.", "link": "https://doi.org/10.1186/ar2952", "areas": ["C"], "unverified": false}, {"key": "Campion1987", "text": "Campion EW, Glynn RJ, DeLabry LO. Asymptomatic hyperuricemia. Risks and consequences in the Normative Aging Study. Am J Med. 1987;82(3):421-6. PMID 3826098; doi:10.1016/0002-9343(87)90441-4. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/0002-9343(87", "areas": ["A", "C"], "unverified": false}, {"key": "Cazenave2019", "text": "Cazenave T, Martire V, Reginato AM, Gutierrez M, Waimann CA, Pineda C, et al. Reliability of OMERACT ultrasound elementary lesions in gout: results from a multicenter exercise. Rheumatol Int. 2019;39(4):707-713. PMID 30539275; doi:10.1007/s00296-018-4220-0. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s00296-018-4220-0", "areas": ["B"], "unverified": false}, {"key": "Chappey1993", "text": "Chappey ON, Niel E, Wautier JL, Hung PP, Dervichian M, Cattan D, Scherrmann JM. Colchicine disposition in human leukocytes after single and multiple oral administration. Clin Pharmacol Ther. 1993;54(4):360–367. PMID 8222477. doi:10.1038/clpt.1993.161. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1038/clpt.1993.161", "areas": ["D"], "unverified": false}, {"key": "Chappey1994", "text": "Chappey O, Niel E, Dervichian M, Wautier JL, Scherrmann JM, Cattan D. Colchicine concentration in leukocytes of patients with familial Mediterranean fever. Br J Clin Pharmacol. 1994;38(1):87–89. PMID 7946943. PMCID PMC1364844. doi:10.1111/j.1365-2125.1994.tb04328.x. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1111/j.1365-2125.1994.tb04328.x", "areas": ["D"], "unverified": false}, {"key": "Chen2006", "text": "Chen CJ, Shi Y, Hearn A, Fitzgerald K, Golenbock D, Reed G, et al. MyD88-dependent IL-1 receptor signaling is essential for gouty inflammation stimulated by monosodium urate crystals. J Clin Invest. 2006;116(8):2262-2271. PMID 16886064; PMCID PMC1523415; doi:10.1172/JCI28075. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1172/JCI28075", "areas": ["C"], "unverified": false}, {"key": "Chen2016", "text": "Chen C, Lü JM, Yao Q. Hyperuricemia-Related Diseases and Xanthine Oxidoreductase (XOR) Inhibitors: An Overview. Med Sci Monit. 2016;22:2501-2512. PMID 27423335; PMCID PMC4961276; doi:10.12659/msm.899852. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.12659/msm.899852", "areas": ["C"], "unverified": false}, {"key": "Chen2020", "text": "Chen Q, Wang Z, Zhou J, Chen Z, Li Y, Li S, et al. Effect of urate-lowering therapy on cardiovascular and kidney outcomes: a systematic review and meta-analysis. Clin J Am Soc Nephrol. 2020;15(11):1576-1586. PMID 33055192; PMCID PMC7646244; doi:10.2215/CJN.05190420. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.2215/CJN.05190420", "areas": ["F"], "unverified": false}, {"key": "ChenXu2019", "text": "Chen-Xu M, Yokose C, Rai SK, Pillinger MH, Choi HK. Contemporary Prevalence of Gout and Hyperuricemia in the United States and Decadal Trends: The National Health and Nutrition Examination Survey, 2007-2016. Arthritis Rheumatol. 2019;71(6):991-999. PMID 30618180; PMCID PMC6536335; doi:10.1002/art.40807. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/art.40807", "areas": ["A"], "unverified": false}, {"key": "Chhana2011", "text": "Chhana A, Callon KE, Pool B, Naot D, Watson M, Gamble GD, et al. Monosodium urate monohydrate crystals inhibit osteoblast viability and function: implications for development of bone erosion in gout. Ann Rheum Dis. 2011;70(9):1684-1691. PMID 21622970; doi:10.1136/ard.2010.144774. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2010.144774", "areas": ["C"], "unverified": false}, {"key": "Chhana2013", "text": "Chhana A, Callon KE, Pool B, Naot D, Gamble GD, Dray M, et al. The effects of monosodium urate monohydrate crystals on chondrocyte viability and function: implications for development of cartilage damage in gout. J Rheumatol. 2013;40(12):2067-2074. PMID 24187106; doi:10.3899/jrheum.130708. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.130708", "areas": ["C"], "unverified": false}, {"key": "Chhana2015", "text": "Chhana A, Lee G, Dalbeth N. Factors influencing the crystallization of monosodium urate: a systematic literature review. BMC Musculoskelet Disord. 2015;16:296. PMID 26467213; PMCID PMC4606994; doi:10.1186/s12891-015-0762-4. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1186/s12891-015-0762-4", "areas": ["C"], "unverified": false}, {"key": "Chia2008", "text": "Chia EW, Grainger R, Harper JL. Colchicine suppresses neutrophil superoxide production in a murine model of gouty arthritis: a rationale for use of low-dose colchicine. Br J Pharmacol. 2008;153(6):1288-1295. PMID 18264123; PMCID PMC2275448; doi:10.1038/bjp.2008.20. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/bjp.2008.20", "areas": ["D"], "unverified": false}, {"key": "Choi2004Lancet", "text": "Choi HK, Atkinson K, Karlson EW, Willett W, Curhan G. Alcohol intake and risk of incident gout in men: a prospective study. Lancet. 2004;363(9417):1277-81. PMID 15094272; doi:10.1016/S0140-6736(04)16000-5. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/S0140-6736(04", "areas": ["A"], "unverified": false}, {"key": "Choi2004NEJM", "text": "Choi HK, Atkinson K, Karlson EW, Willett W, Curhan G. Purine-rich foods, dairy and protein intake, and the risk of gout in men. N Engl J Med. 2004;350(11):1093-103. PMID 15014182; doi:10.1056/NEJMoa035700. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1056/NEJMoa035700", "areas": ["A"], "unverified": false}, {"key": "Choi2005", "text": "Choi HK, Atkinson K, Karlson EW, Curhan G. Obesity, weight change, hypertension, diuretic use, and risk of gout in men: the health professionals follow-up study. Arch Intern Med. 2005;165(7):742-8. PMID 15824292; doi:10.1001/archinte.165.7.742. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1001/archinte.165.7.742", "areas": ["A", "F"], "unverified": false}, {"key": "Choi2007AR", "text": "Choi HK, Ford ES, Li C, Curhan G. Prevalence of the metabolic syndrome in patients with gout: the Third National Health and Nutrition Examination Survey. Arthritis Rheum. 2007;57(1):109-115. PMID 17266099; doi:10.1002/art.22466. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.22466", "areas": ["F"], "unverified": false}, {"key": "Choi2007Circ", "text": "Choi HK, Curhan G. Independent impact of gout on mortality and risk for coronary heart disease. Circulation. 2007;116(8):894-900. PMID 17698728; doi:10.1161/CIRCULATIONAHA.107.703389. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1161/CIRCULATIONAHA.107.703389", "areas": ["F"], "unverified": false}, {"key": "Choi2007Incident", "text": "Choi HK, Willett W, Curhan G. Coffee consumption and risk of incident gout in men: a prospective study. Arthritis Rheum. 2007;56(6):2049-2055. PMID 17530645; doi:10.1002/art.22712. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.22712", "areas": ["G", "A"], "unverified": false, "aliases": ["Choi2007Coffee"]}, {"key": "Choi2007NHANES", "text": "Choi HK, Curhan G. Coffee, tea, and caffeine consumption and serum uric acid level: the third national health and nutrition examination survey. Arthritis Rheum. 2007;57(5):816-821. PMID 17530681; doi:10.1002/art.22762. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.22762", "areas": ["G"], "unverified": false}, {"key": "Choi2008BMJ", "text": "Choi HK, Curhan G. Soft drinks, fructose consumption, and the risk of gout in men: prospective cohort study. BMJ. 2008;336(7639):309-12. PMID 18244959; PMCID PMC2234536; doi:10.1136/bmj.39449.819271.BE. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/bmj.39449.819271.BE", "areas": ["A", "G"], "unverified": false}, {"key": "Choi2008Rheum", "text": "Choi HK, De Vera MA, Krishnan E. Gout and the risk of type 2 diabetes among men with a high cardiovascular risk profile. Rheumatology (Oxford). 2008;47(10):1567-1570. PMID 18710901; doi:10.1093/rheumatology/ken305. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/ken305", "areas": ["F"], "unverified": false}, {"key": "Choi2010JAMA", "text": "Choi HK, Willett W, Curhan G. Fructose-rich beverages and risk of gout in women. JAMA. 2010;304(20):2270-8. PMID 21068145; PMCID PMC3058904; doi:10.1001/jama.2010.1638. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1001/jama.2010.1638", "areas": ["A"], "unverified": false}, {"key": "Choi2012", "text": "Choi HK, Burns LC, Shojania K, Koenig N, Reid G, Abufayyah M, et al. Dual energy CT in gout: a prospective validation study. Ann Rheum Dis. 2012;71(9):1466-1471. PMID 22387729; doi:10.1136/annrheumdis-2011-200976. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2011-200976", "areas": ["B"], "unverified": false}, {"key": "Choi2012BMJ", "text": "Choi HK, Soriano LC, Zhang Y, Rodríguez LA. Antihypertensive drugs and risk of incident gout among patients with hypertension: population based case-control study. BMJ. 2012;344:d8190. PMID 22240117; PMCID PMC3257215; doi:10.1136/bmj.d8190. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/bmj.d8190", "areas": ["A", "F", "G"], "unverified": false}, {"key": "Choi2015", "text": "Choi HK, Niu J, Neogi T, Chen CA, Chaisson C, Hunter D, et al. Nocturnal risk of gout attacks. Arthritis Rheumatol. 2015;67(2):555-562. PMID 25504842; PMCID PMC4360969; doi:10.1002/art.38917. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.38917", "areas": ["B", "C"], "unverified": false}, {"key": "Cipolletta2022", "text": "Cipolletta E, Tata LJ, Nakafero G, Avery AJ, Mamas MA, Abhishek A. Association between gout flare and subsequent cardiovascular events among patients with gout. JAMA. 2022;328(5):440-450. PMID 35916846; PMCID PMC9346550; doi:10.1001/jama.2022.11390. Validated: Europe PMC|Crossref, 2026-10-20.", "link": "https://doi.org/10.1001/jama.2022.11390", "areas": ["F"], "unverified": false}, {"key": "Cipolletta2025", "text": "Cipolletta E, Nakafero G, McCormick N, Yokose C, Avery AJ, Mamas MA, et al. Cardiovascular events in patients with gout initiating urate-lowering therapy with or without colchicine for flare prophylaxis: a retrospective new-user cohort study using linked primary care, hospitalisation, and mortality data. Lancet Rheumatol. 2025;7(3):e197-e207. PMID 39708831; doi:10.1016/S2665-9913(24)00248-0. Validated: Europe PMC|Crossref, 2026-10-20.", "link": "https://doi.org/10.1016/S2665-9913(24", "areas": ["F"], "unverified": false}, {"key": "Clarson2015", "text": "Clarson LE, Chandratre P, Hider SL, Belcher J, Heneghan C, Roddy E, et al. Increased cardiovascular mortality associated with gout: a systematic review and meta-analysis. Eur J Prev Cardiol. 2015;22(3):335-343. PMID 24281251; PMCID PMC4361356; doi:10.1177/2047487313514895. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1177/2047487313514895", "areas": ["F"], "unverified": false}, {"key": "Cohen2012", "text": "Cohen E, Krause I, Fraser A, Goldberg E, Garty M. Hyperuricemia and metabolic syndrome: lessons from a large cohort from Israel. Isr Med Assoc J. 2012;14(11):676-80. PMID 23240372. Validated: PubMed, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/23240372/", "areas": ["A"], "unverified": false}, {"key": "Coleshill2021", "text": "Coleshill MJ, Aung E, Carland JE, Faasse K, Stocker S, Day RO. Rebranding Gout: Could a Name Change for Gout Improve Adherence to Urate-Lowering Therapy? Ther Innov Regul Sci. 2021;55(1):138-141. PMID 32661926; doi:10.1007/s43441-020-00198-0. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1007/s43441-020-00198-0", "areas": ["A"], "unverified": false}, {"key": "CPIC-HLAB-Allopurinol", "text": "Clinical Pharmacogenetics Implementation Consortium. HLA-B and allopurinol: recommendation table (HLA-B58:01 positive, \"Allopurinol is contraindicated\", strong; negative, standard dosing, strong) and HLA-B58:01 population allele frequency table (weighted averages by population group). CPIC database API, https://api.cpicpgx.org/v1/ (recommendation; population_frequency_view), accessed 2026-10-20. Validated: CPIC API, 2026-10-20.", "link": "https://api.cpicpgx.org/v1/", "areas": ["E"], "unverified": false}, {"key": "Craig1995", "text": "Craig MH, Poole GV, Hauser CJ. Postsurgical gout. Am Surg. 1995;61(1):56-59. PMID 7832383. (No DOI; abstract truncated at 250 words in the record.) Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/7832383/", "areas": ["G"], "unverified": false}, {"key": "Crescioli2026", "text": "Crescioli S, Kaplon H, Chenoweth A, Hsu YS, Pinto K, Kapoor V, et al. Antibodies to watch in 2026. MAbs. 2026;18(1):2614669. PMID 41560619; PMCID PMC12826703; doi:10.1080/19420862.2026.2614669. Validated: PubMed, Europe PMC (full text, firsekibart and anflekitug sections), 2026-10-20.", "link": "https://doi.org/10.1080/19420862.2026.2614669", "areas": ["H"], "unverified": false}, {"key": "Crittenden2012", "text": "Crittenden DB, Lehmann RA, Schneck L, Keenan RT, Shah B, Greenberg JD, et al. Colchicine use is associated with decreased prevalence of myocardial infarction in patients with gout. J Rheumatol. 2012;39(7):1458-1464. PMID 22660810; PMCID PMC3733459; doi:10.3899/jrheum.111533. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.111533", "areas": ["F"], "unverified": false}, {"key": "Cronstein1995", "text": "Cronstein BN, Molad Y, Reibman J, Balakhane E, Levin RI, Weissmann G. Colchicine alters the quantitative and qualitative display of selectins on endothelial cells and neutrophils. J Clin Invest. 1995;96(2):994–1002. PMID 7543498. PMCID PMC185287. doi:10.1172/JCI118147. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1172/JCI118147", "areas": ["D"], "unverified": false}, {"key": "Dalbeth2007", "text": "Dalbeth N, Clark B, Gregory K, Gamble GD, Doyle A, McQueen FM. Computed tomography measurement of tophus volume: comparison with physical measurement. Arthritis Rheum. 2007;57(3):461-465. PMID 17394233; doi:10.1002/art.22612. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.22612", "areas": ["G"], "unverified": false}, {"key": "Dalbeth2008", "text": "Dalbeth N, Smith T, Nicolson B, Clark B, Callon K, Naot D, et al. Enhanced osteoclastogenesis in patients with tophaceous gout: urate crystals promote osteoclast development through interactions with stromal cells. Arthritis Rheum. 2008;58(6):1854-1865. PMID 18512794; doi:10.1002/art.23488. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/art.23488", "areas": ["C"], "unverified": false}, {"key": "Dalbeth2009", "text": "Dalbeth N, Clark B, Gregory K, Gamble G, Sheehan T, Doyle A, et al. Mechanisms of bone erosion in gout: a quantitative analysis using plain radiography and computed tomography. Ann Rheum Dis. 2009;68(8):1290-1295. PMID 18708415; doi:10.1136/ard.2008.094201. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2008.094201", "areas": ["B", "C"], "unverified": false}, {"key": "Dalbeth2010", "text": "Dalbeth N, Pool B, Gamble GD, Smith T, Callon KE, McQueen FM, et al. Cellular characterization of the gouty tophus: a quantitative analysis. Arthritis Rheum. 2010;62(5):1549-1556. PMID 20131281; doi:10.1002/art.27356. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/art.27356", "areas": ["C"], "unverified": false}, {"key": "Dalbeth2010Milk", "text": "Dalbeth N, Wong S, Gamble GD, Horne A, Mason B, Pool B, et al. Acute effect of milk on serum urate concentrations: a randomised controlled crossover trial. Ann Rheum Dis. 2010;69(9):1677-1682. PMID 20472590; doi:10.1136/ard.2009.124230. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2009.124230", "areas": ["G"], "unverified": false}, {"key": "Dalbeth2011ACR", "text": "Dalbeth N, Petrie KJ, House M, Chong J, Leung W, Chegudi R, et al. Illness perceptions in patients with gout and the relationship with progression of musculoskeletal disability. Arthritis Care Res (Hoboken). 2011;63(11):1605-1612. PMID 22034122; doi:10.1002/acr.20570. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr.20570", "areas": ["G"], "unverified": false}, {"key": "Dalbeth2011ARD", "text": "Dalbeth N, Schauer C, Macdonald P, Perez-Ruiz F, Schumacher HR, Hamburger S, et al. Methods of tophus assessment in clinical trials of chronic gout: a systematic literature review and pictorial reference guide. Ann Rheum Dis. 2011;70(4):597-604. PMID 21216814; doi:10.1136/ard.2010.139899. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2010.139899", "areas": ["G"], "unverified": false}, {"key": "Dalbeth2012", "text": "Dalbeth N, Ames R, Gamble GD, Horne A, Wong S, Kuhn-Sherlock B, et al. Effects of skim milk powder enriched with glycomacropeptide and G600 milk fat extract on frequency of gout flares: a proof-of-concept randomised controlled trial. Ann Rheum Dis. 2012;71(6):929-934. PMID 22275296; doi:10.1136/annrheumdis-2011-200156. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2011-200156", "areas": ["G"], "unverified": false}, {"key": "Dalbeth2014", "text": "Dalbeth N, Stamp L. Hyperuricaemia and gout: time for a new staging system? Ann Rheum Dis. 2014;73(9):1598-600. PMID 24718961; doi:10.1136/annrheumdis-2014-205304. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2014-205304", "areas": ["A"], "unverified": false}, {"key": "Dalbeth2014ClinTher", "text": "Dalbeth N, Lauterio TJ, Wolfe HR. Mechanism of action of colchicine in the treatment of gout. Clin Ther. 2014;36(10):1465-1479. PMID 25151572; doi:10.1016/j.clinthera.2014.07.017. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.clinthera.2014.07.017", "areas": ["D"], "unverified": false}, {"key": "Dalbeth2015", "text": "Dalbeth N, House ME, Aati O, Tan P, Franklin C, Horne A, et al. Urate crystal deposition in asymptomatic hyperuricaemia and symptomatic gout: a dual energy CT study. Ann Rheum Dis. 2015;74(5):908-911. PMID 25637002; doi:10.1136/annrheumdis-2014-206397. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2014-206397", "areas": ["C", "H"], "unverified": false}, {"key": "Dalbeth2016", "text": "Dalbeth N, Schumacher HR, Fransen J, Neogi T, Jansen TL, Brown M, et al. Survey Definitions of Gout for Epidemiologic Studies: Comparison With Crystal Identification as the Gold Standard. Arthritis Care Res (Hoboken). 2016;68(12):1894-1898. PMID 27014846; doi:10.1002/acr.22896. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/acr.22896", "areas": ["A"], "unverified": false}, {"key": "Dalbeth2017", "text": "Dalbeth N, Bardin T, Doherty M, Lioté F, Richette P, Saag KG, et al. Discordant American College of Physicians and international rheumatology guidelines for gout management: consensus statement of the Gout, Hyperuricemia and Crystal-Associated Disease Network (G-CAN). Nat Rev Rheumatol. 2017;13(9):561-568. PMID 28794514; doi:10.1038/nrrheum.2017.126. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1038/nrrheum.2017.126", "areas": ["E"], "unverified": false}, {"key": "Dalbeth2018ARD", "text": "Dalbeth N, Phipps-Green A, Frampton C, Neogi T, Taylor WJ, Merriman TR. Relationship between serum urate concentration and clinically evident incident gout: an individual participant data analysis. Ann Rheum Dis. 2018;77(7):1048-1052. PMID 29463518; doi:10.1136/annrheumdis-2017-212288. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2017-212288", "areas": ["A", "C", "H"], "unverified": false}, {"key": "Dalbeth2019ART", "text": "Dalbeth N, Frampton C, Fung M, Baumgartner S, Nicolaou S, Choi HK. Concurrent validity of provisional remission criteria for gout: a dual-energy CT study. Arthritis Res Ther. 2019;21(1):150. PMID 31227018; PMCID PMC6588898; doi:10.1186/s13075-019-1941-8. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/s13075-019-1941-8", "areas": ["H"], "unverified": false}, {"key": "Dalbeth2019NRDP", "text": "Dalbeth N, Choi HK, Joosten LAB, Khanna PP, Matsuo H, Perez-Ruiz F, et al. Gout. Nat Rev Dis Primers. 2019;5(1):69. PMID 31558729; doi:10.1038/s41572-019-0115-y. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1038/s41572-019-0115-y", "areas": ["A", "C", "E", "H"], "unverified": false}, {"key": "Dalbeth2021", "text": "Dalbeth N, Gosling AL, Gaffo A, Abhishek A. Gout. Lancet. 2021;397(10287):1843-1855. PMID 33798500; doi:10.1016/S0140-6736(21)00569-9. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/S0140-6736(21", "areas": ["A", "B", "C", "E", "H"], "unverified": false}, {"key": "Daoussis2022", "text": "Daoussis D, Kordas P, Varelas G, Michalaki M, Onoufriou A, Mamali I, et al. ACTH vs steroids for the treatment of acute gout in hospitalized patients: a randomized, open label, comparative study. Rheumatol Int. 2022;42(6):949-958. PMID 35445840; doi:10.1007/s00296-022-05128-x. ClinicalTrials.gov NCT04306653. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s00296-022-05128-x", "areas": ["D"], "unverified": false}, {"key": "Day2007", "text": "Day RO, Graham GG, Hicks M, McLachlan AJ, Stocker SL, Williams KM. Clinical pharmacokinetics and pharmacodynamics of allopurinol and oxypurinol. Clin Pharmacokinet. 2007;46(8):623-644. PMID 17655371; doi:10.2165/00003088-200746080-00001. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.2165/00003088-200746080-00001", "areas": ["E"], "unverified": false}, {"key": "deBrouwer2010", "text": "de Brouwer AP, van Bokhoven H, Nabuurs SB, Arts WF, Christodoulou J, Duley J. PRPS1 mutations: four distinct syndromes and potential treatment. Am J Hum Genet. 2010;86(4):506-518. PMID 20380929; PMCID PMC2850427; doi:10.1016/j.ajhg.2010.02.024. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1016/j.ajhg.2010.02.024", "areas": ["C"], "unverified": false}, {"key": "deLautour2016", "text": "de Lautour H, Taylor WJ, Adebajo A, Alten R, Burgos-Vargas R, Chapman P, et al. Development of Preliminary Remission Criteria for Gout Using Delphi and 1000Minds Consensus Exercises. Arthritis Care Res (Hoboken). 2016;68(5):667-672. PMID 26414176; doi:10.1002/acr.22741. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr.22741", "areas": ["H"], "unverified": false}, {"key": "DeVera2014", "text": "De Vera MA, Marcotte G, Rai S, Galo JS, Bhole V. Medication adherence in gout: a systematic review. Arthritis Care Res (Hoboken). 2014;66(10):1551-1559. PMID 24692321; doi:10.1002/acr.22336. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr.22336", "areas": ["G"], "unverified": false}, {"key": "DFV890", "text": "Gatlik E, Mehes B, Voltz E, Sommer U, Tritto E, Lestini G, Liu X, Pal P, Velinova M, Denney WS, Fu Y, Opipari A, Dean D, Junge G. First-in-human safety, tolerability and pharmacokinetics of DFV890, an oral NLRP3 inhibitor. Clin Transl Sci. 2024;17(5):e13789. PMID 38761014. PMCID PMC11101992. Open access. Validated: reused verbatim from fmf/src/sources.json; ClinicalTrials.gov search for DFV890 (no gout trial), 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/38761014/", "areas": ["H"], "unverified": false}, {"key": "Dinarello2011", "text": "Dinarello CA. Interleukin-1 in the pathogenesis and treatment of inflammatory diseases. Blood. 2011;117(14):3720-3732. PMID: 21304099. DOI: 10.1182/blood-2010-07-273417. Validated: Europe PMC, 2026-10-20 (FMF key and text reused).", "link": "https://doi.org/10.1182/blood-2010-07-273417", "areas": ["C"], "unverified": false}, {"key": "DirkenHeukensfeldt2010", "text": "Dirken-Heukensfeldt KJ, Teunissen TA, van de Lisdonk H, Lagro-Janssen AL. \"Clinical features of women with gout arthritis.\" A systematic review. Clin Rheumatol. 2010;29(6):575-82. PMID 20084441; PMCID PMC2860089; doi:10.1007/s10067-009-1362-1. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1007/s10067-009-1362-1", "areas": ["A"], "unverified": false}, {"key": "Doehner2022", "text": "Doehner W, Anker SD, Butler J, Zannad F, Filippatos G, Ferreira JP, et al. Uric acid and sodium-glucose cotransporter-2 inhibition with empagliflozin in heart failure with reduced ejection fraction: the EMPEROR-reduced trial. Eur Heart J. 2022;43(36):3435-3446. PMID 35788657; PMCID PMC9492270; doi:10.1093/eurheartj/ehac320. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/eurheartj/ehac320", "areas": ["F"], "unverified": false}, {"key": "Doherty2018", "text": "Doherty M, Jenkins W, Richardson H, Sarmanova A, Abhishek A, Ashton D, et al. Efficacy and cost-effectiveness of nurse-led care involving education and engagement of patients and a treat-to-target urate-lowering strategy versus usual care for gout: a randomised controlled trial. Lancet. 2018;392(10156):1403-1412. PMID 30343856; PMCID PMC6196879; doi:10.1016/S0140-6736(18)32158-5. Validated: PubMed, Europe PMC (full text), ClinicalTrials.gov (NCT01477346), 2026-10-20.", "link": "https://doi.org/10.1016/S0140-6736(18", "areas": ["E", "G", "H"], "unverified": false}, {"key": "Doria2020", "text": "Doria A, Galecki AT, Spino C, Pop-Busui R, Cherney DZ, Lingvay I, et al. Serum urate lowering with allopurinol and kidney function in type 1 diabetes. N Engl J Med. 2020;382(26):2493-2503. PMID 32579810; PMCID PMC7375708; doi:10.1056/NEJMoa1916624. Validated: Europe PMC; ClinicalTrials.gov NCT02017171, 2026-10-20.", "link": "https://doi.org/10.1056/NEJMoa1916624", "areas": ["F", "H"], "unverified": false}, {"key": "DrugsFDA-Colcrys", "text": "COLCRYS (colchicine) tablets, Takeda. Drugs@FDA application NDA 022352; original approval 29 July 2009. https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=022352. Validated: FDA (Drugs@FDA via openFDA drugsfda endpoint), 2026-10-20.", "link": "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=022352", "areas": ["A"], "unverified": false}, {"key": "DrugsFDA-Krystexxa", "text": "KRYSTEXXA (pegloticase) injection, Horizon. Drugs@FDA application BLA 125293; original approval 14 September 2010. https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=125293. Validated: FDA (Drugs@FDA via openFDA drugsfda endpoint), 2026-10-20.", "link": "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=125293", "areas": ["A"], "unverified": false}, {"key": "DrugsFDA-Uloric", "text": "ULORIC (febuxostat) tablets, Takeda. Drugs@FDA application NDA 021856; original approval 13 February 2009. https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=021856. Validated: FDA (Drugs@FDA via openFDA drugsfda endpoint), 2026-10-20.", "link": "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=021856", "areas": ["A"], "unverified": false}, {"key": "DrugsFDA-ULT", "text": "US Food and Drug Administration. Drugs@FDA application records (openFDA drugsfda endpoint): NDA 016084 Zyloprim, original approval 19 Aug 1966; NDA 021856 Uloric, 13 Feb 2009; BLA 125293 Krystexxa, 14 Sep 2010; NDA 207988 Zurampic, 22 Dec 2015, marketing status Discontinued; no application for benzbromarone. https://api.fda.gov/drug/drugsfda.json, accessed 2026-10-20. Validated: Drugs@FDA (openFDA), 2026-10-20.", "link": "https://api.fda.gov/drug/drugsfda.json,", "areas": ["E"], "unverified": false}, {"key": "DrugsFDA-Zyloprim", "text": "ZYLOPRIM (allopurinol) tablets. Drugs@FDA application NDA 016084; original approval 19 August 1966. https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=016084. Validated: FDA (Drugs@FDA via openFDA drugsfda endpoint), 2026-10-20.", "link": "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=016084", "areas": ["A"], "unverified": false}, {"key": "Du2026", "text": "Du K, Guo Y, Zhou J, Liu Y, Jiang L, Hua D, et al. Antioxidant malic-acid-derived lipid nanoparticles delivering secretory uricase circRNA for hyperuricemia and complication management in mice. Nat Commun. 2026;17(1):8997. PMID 42642363; PMCID PMC13507142; doi:10.1038/s41467-026-73544-9. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1038/s41467-026-73544-9", "areas": ["H"], "unverified": false}, {"key": "Eckardt2015", "text": "Eckardt KU, Alper SL, Antignac C, Bleyer AJ, Chauveau D, Dahan K, et al. Autosomal dominant tubulointerstitial kidney disease: diagnosis, classification, and management--A KDIGO consensus report. Kidney Int. 2015;88(4):676-683. PMID 25738250; doi:10.1038/ki.2015.28. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/ki.2015.28", "areas": ["C"], "unverified": false}, {"key": "Elfishawi2018", "text": "Elfishawi MM, Zleik N, Kvrgic Z, Michet CJ Jr, Crowson CS, Matteson EL, et al. The Rising Incidence of Gout and the Increasing Burden of Comorbidities: A Population-based Study over 20 Years. J Rheumatol. 2018;45(4):574-579. PMID 29247151; PMCID PMC5880714; doi:10.3899/jrheum.170806. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.170806", "areas": ["A"], "unverified": false}, {"key": "Elfishawi2020", "text": "Elfishawi MM, Zleik N, Kvrgic Z, Michet CJ Jr, Crowson CS, Matteson EL, et al. Changes in the Presentation of Incident Gout and the Risk of Subsequent Flares: A Population-based Study over 20 Years. J Rheumatol. 2020;47(4):613-618. PMID 31308206; PMCID PMC6960359; doi:10.3899/jrheum.190346. Validated: PubMed, Crossref, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.190346", "areas": ["A"], "unverified": false}, {"key": "Elion1989", "text": "Elion GB. The purine path to chemotherapy. Science. 1989;244(4900):41-7. PMID 2649979; doi:10.1126/science.2649979. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1126/science.2649979", "areas": ["A"], "unverified": false}, {"key": "EMA-Adenuric", "text": "European Medicines Agency. Adenuric (febuxostat) EPAR, EMEA/H/C/000777; marketing authorisation issued 21/04/2008; SmPC (Menarini; text revised 25/07/2023) via emc product 1925. https://www.ema.europa.eu/en/medicines/human/EPAR/adenuric. Validated: EMA website, emc, 2026-10-20.", "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/adenuric", "areas": ["E"], "unverified": false}, {"key": "EMA-Ilaris", "text": "European Medicines Agency. Ilaris (canakinumab) EPAR, medicine overview (indications include gouty arthritis in adults). https://www.ema.europa.eu/en/medicines/human/EPAR/ilaris. Validated: EMA website, 2026-10-20.", "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/ilaris", "areas": ["H"], "unverified": false}, {"key": "EMA-IlarisGout2013", "text": "European Medicines Agency. Ilaris (canakinumab) EPAR, EMEA/H/C/001109: variation II/0010, extension of indication to frequent gouty arthritis attacks (CHMP opinion 17 Jan 2013; Commission decision 18 Feb 2013); EPAR summary for the public, last updated 17 May 2017. https://www.ema.europa.eu/en/medicines/human/EPAR/ilaris. Validated: EMA website and EPAR procedural-steps document, 2026-10-20.", "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/ilaris", "areas": ["D"], "unverified": false}, {"key": "EMA-Krystexxa", "text": "European Medicines Agency. Krystexxa (pegloticase) EPAR, EMEA/H/C/002208; marketing authorisation issued 08/01/2013; withdrawal of marketing authorisation 30/06/2016. https://www.ema.europa.eu/en/medicines/human/EPAR/krystexxa. Validated: EMA website, 2026-10-20.", "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/krystexxa", "areas": ["E"], "unverified": false}, {"key": "EMA-Zurampic", "text": "European Medicines Agency. Zurampic (lesinurad) EPAR, EMEA/H/C/003932; marketing authorisation issued 18/02/2016; withdrawal notified by the European Commission 31 July 2020 at the holder's request for commercial reasons. https://www.ema.europa.eu/en/medicines/human/EPAR/zurampic. Validated: EMA website, 2026-10-20.", "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/zurampic", "areas": ["E"], "unverified": false}, {"key": "Enomoto2002", "text": "Enomoto A, Kimura H, Chairoungdua A, Shigeta Y, Jutabha P, Cha SH, et al. Molecular identification of a renal urate anion exchanger that regulates blood urate levels. Nature. 2002;417(6887):447-452. PMID 12024214; doi:10.1038/nature742. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/nature742", "areas": ["C"], "unverified": false}, {"key": "Ettinger1986", "text": "Ettinger B, Tang A, Citron JT, Livermore B, Williams T. Randomized trial of allopurinol in the prevention of calcium oxalate calculi. N Engl J Med. 1986;315(22):1386-1389. PMID 3534570; doi:10.1056/NEJM198611273152204. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1056/NEJM198611273152204", "areas": ["F"], "unverified": false}, {"key": "Evavold2018", "text": "Evavold CL, Ruan J, Tan Y, Xia S, Wu H, Kagan JC. The pore-forming protein gasdermin D regulates interleukin-1 secretion from living macrophages. Immunity. 2018;48(1):35-44.e6. PMID: 29195811. DOI: 10.1016/j.immuni.2017.11.013. Validated: Europe PMC, 2026-10-20 (FMF key and text reused).", "link": "https://doi.org/10.1016/j.immuni.2017.11.013", "areas": ["C"], "unverified": false}, {"key": "FDA-Allopurinol", "text": "Allopurinol tablets, US prescribing information (Accord Healthcare; PLR-format label; DailyMed SPL published 17 Nov 2025). DailyMed setid 682dd8b8-fc6e-47c5-95b7-82d7ad96b750. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=682dd8b8-fc6e-47c5-95b7-82d7ad96b750 (The ZYLOPRIM brand label on DailyMed dates from 2009; this current generic label was used instead.) Validated: FDA label (DailyMed SPL XML), 2026-10-20.", "link": "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=682dd8b8-fc6e-47c5-95b7-82d7ad96b750", "areas": ["G"], "unverified": false}, {"key": "FDA-BLA125319-S107", "text": "Food and Drug Administration. Supplement approval letter, BLA 125319/S-107, Ilaris (canakinumab): new indication for gout flares in adults in whom NSAIDs and colchicine are contraindicated, not tolerated or inadequate, and in whom repeated courses of corticosteroids are not appropriate; status date 2023-08-25. https://www.accessdata.fda.gov/drugsatfda_docs/appletter/2023/125319Orig1s107ltr.pdf. Validated: Drugs@FDA (openFDA) and approval letter, 2026-10-20.", "link": "https://www.accessdata.fda.gov/drugsatfda_docs/appletter/2023/125319Orig1s107ltr.pdf", "areas": ["H"], "unverified": false}, {"key": "FDA-Colcrys", "text": "COLCRYS (colchicine, USP) tablets, US prescribing information (Takeda/AR Scientific; repackager SPL version published 21 Oct 2022). DailyMed setid d6adc880-5499-4691-93f3-27c87902d5fc. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=d6adc880-5499-4691-93f3-27c87902d5fc. Validated: DailyMed SPL (re-read in full), 2026-10-20.", "link": "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=d6adc880-5499-4691-93f3-27c87902d5fc", "areas": ["D", "E", "G"], "unverified": false}, {"key": "FDA-ColcrysApproval", "text": "U.S. Food and Drug Administration, Drugs@FDA. COLCRYS (colchicine) tablets: NDA 022352 (approved 29 Jul 2009), NDA 022351 (30 Jul 2009) and NDA 022353 (16 Oct 2009). https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=022351. Validated: Drugs@FDA via openFDA, 2026-10-20.", "link": "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=022351", "areas": ["D"], "unverified": false}, {"key": "FDA-Didanosine", "text": "Didanosine delayed-release capsules, US prescribing information (Physicians Total Care repackager SPL, published 8 May 2012), section 4.1 Allopurinol. DailyMed setid 829e744d-7bd4-43dc-9b58-ffb016cb8e67. Validated: FDA label (DailyMed), 2026-10-20.", "link": "", "areas": ["E"], "unverified": false}, {"key": "FDA-DSC-Febuxostat2019", "text": "US Food and Drug Administration. FDA adds Boxed Warning for increased risk of death with gout medicine Uloric (febuxostat). Drug Safety Communication, 21 Feb 2019. https://www.fda.gov/drugs/drug-safety-and-availability/fda-adds-boxed-warning-increased-risk-death-gout-medicine-uloric-febuxostat (unverified: page returned \"Page Not Found\" to automated retrieval and the Wayback Machine was rate-limited; the boxed warning and its 2/2019 date are confirmed in [FDA-Uloric], and the URL is cited as reference 71 in [FitzGerald2020]).", "link": "https://www.fda.gov/drugs/drug-safety-and-availability/fda-adds-boxed-warning-increased-risk-death-gout-medicine-uloric-febuxostat", "areas": ["E"], "unverified": true}, {"key": "FDA-IlarisGout2023", "text": "U.S. Food and Drug Administration, Drugs@FDA. ILARIS (canakinumab) BLA 125319, supplement 107 (efficacy; gout flares), approved 25 Aug 2023. Letter https://www.accessdata.fda.gov/drugsatfda_docs/appletter/2023/125319Orig1s107ltr.pdf; label https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/125319s107lbl.pdf. Validated: Drugs@FDA via openFDA, 2026-10-20.", "link": "https://www.accessdata.fda.gov/drugsatfda_docs/appletter/2023/125319Orig1s107ltr.pdf;", "areas": ["D"], "unverified": false}, {"key": "FDA-Krystexxa", "text": "KRYSTEXXA (pegloticase) injection, US prescribing information (Horizon/Amgen; BLA 125293; Medication Guide revised 06/2026). DailyMed setid 6e566303-d93a-4130-b764-25749829aa95. Validated: FDA label (DailyMed), 2026-10-20.", "link": "", "areas": ["E", "G", "H"], "unverified": false, "aliases": ["FDA-KrystexxaH"]}, {"key": "FDA-Lodoco", "text": "LODOCO (colchicine tablets 0.5 mg), US prescribing information (AGEPHA Pharma USA; SPL version 4, published 17 Aug 2026). DailyMed setid ff06d68f-d65f-d097-e053-6294a90a7e5f; NDA 215727, original approval 16 June 2023 (Drugs@FDA via openFDA). https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ff06d68f-d65f-d097-e053-6294a90a7e5f. Validated: FDA label (DailyMed)|Drugs@FDA, 2026-10-20.", "link": "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ff06d68f-d65f-d097-e053-6294a90a7e5f", "areas": ["F"], "unverified": false}, {"key": "FDA-Mitigare", "text": "MITIGARE (colchicine) capsules 0.6 mg, US prescribing information (Hikma Specialty USA). NDA 204820, original approval 26 Sep 2014; label set id cb5f9d85-6b81-49f8-bcd6-17b7bfbc10f2, version effective 16 May 2024. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cb5f9d85-6b81-49f8-bcd6-17b7bfbc10f2. Validated: openFDA drug label and Drugs@FDA, 2026-10-20.", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cb5f9d85-6b81-49f8-bcd6-17b7bfbc10f2", "areas": ["D"], "unverified": false}, {"key": "FDA-Naproxen", "text": "Naproxen tablets, US prescribing information (Granules Pharmaceuticals; DailyMed SPL published 12 Oct 2026). DailyMed setid c1cb9bb9-fbae-5e5c-e053-2995a90a0d21. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=c1cb9bb9-fbae-5e5c-e053-2995a90a0d21 Validated: FDA label (DailyMed SPL XML), 2026-10-20.", "link": "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=c1cb9bb9-fbae-5e5c-e053-2995a90a0d21", "areas": ["G"], "unverified": false}, {"key": "FDA-Probenecid", "text": "Probenecid tablets USP 500 mg, US prescribing information (Rising Pharma Holdings; SPL published 30 Jan 2026). DailyMed setid f2375d90-4132-4fb6-aee7-c4f9d11e98d5. Validated: FDA label (DailyMed), 2026-10-20.", "link": "", "areas": ["E"], "unverified": false}, {"key": "FDA-Uloric", "text": "ULORIC (febuxostat) tablets, US prescribing information (Takeda; NDA 021856). Boxed warning \"Cardiovascular death\" added in label revision 2/2019 (supplement 013, approved 21 Feb 2019; https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/021856s013lbl.pdf); current SPL DailyMed setid 54de10ef-fe5f-4930-b91d-6bbb04c664bd (Medication Guide revised April 2023). Validated: FDA label (accessdata.fda.gov, DailyMed, Drugs@FDA), 2026-10-20.", "link": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/021856s013lbl.pdf", "areas": ["E", "F", "G"], "unverified": false, "aliases": ["FDA-UloricF", "FDA-UloricG"]}, {"key": "FDA-Zurampic", "text": "ZURAMPIC (lesinurad) tablets, US prescribing information (Ironwood; NDA 207988, original approval 22 Dec 2015). https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/207988lbl.pdf. Validated: FDA label (accessdata.fda.gov, Drugs@FDA), 2026-10-20.", "link": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/207988lbl.pdf", "areas": ["E"], "unverified": false}, {"key": "FDA-Zyloprim", "text": "ZYLOPRIM (allopurinol) tablets, US prescribing information (Casper Pharma, NDA 016084; Reference ID 4357411, 2018). https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/016084s044lbl.pdf. Validated: FDA label (accessdata.fda.gov), 2026-10-20.", "link": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/016084s044lbl.pdf", "areas": ["E"], "unverified": false}, {"key": "Feher2003", "text": "Feher MD, Hepburn AL, Hogarth MB, Ball SG, Kaye SA. Fenofibrate enhances urate reduction in men treated with allopurinol for hyperuricaemia and gout. Rheumatology (Oxford). 2003;42(2):321-325. PMID 12595630; doi:10.1093/rheumatology/keg103. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/keg103", "areas": ["E"], "unverified": false}, {"key": "Feig2008", "text": "Feig DI, Soletsky B, Johnson RJ. Effect of allopurinol on blood pressure of adolescents with newly diagnosed essential hypertension: a randomized trial. JAMA. 2008;300(8):924-932. PMID 18728266; PMCID PMC2684336; doi:10.1001/jama.300.8.924. Validated: Europe PMC; ClinicalTrials.gov NCT00288184, 2026-10-20.", "link": "https://doi.org/10.1001/jama.300.8.924", "areas": ["F"], "unverified": false}, {"key": "Ferron1996", "text": "Ferron GM, Rochdi M, Jusko WJ, Scherrmann JM. Oral absorption characteristics and pharmacokinetics of colchicine in healthy volunteers after single and multiple doses. J Clin Pharmacol. 1996;36(10):874–883. PMID 8930773. doi:10.1002/j.1552-4604.1996.tb04753.x. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1002/j.1552-4604.1996.tb04753.x", "areas": ["D"], "unverified": false}, {"key": "Finkelstein2010", "text": "Finkelstein Y, Aks SE, Hutson JR, Juurlink DN, Nguyen P, Dubnov-Raz G, et al. Colchicine poisoning: the dark side of an ancient drug. Clin Toxicol (Phila). 2010;48(5):407–414. PMID 20586571. doi:10.3109/15563650.2010.495348. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.3109/15563650.2010.495348", "areas": ["D"], "unverified": false}, {"key": "Fiolet2021", "text": "Fiolet ATL, Opstal TSJ, Mosterd A, Eikelboom JW, Jolly SS, Keech AC, et al. Efficacy and safety of low-dose colchicine in patients with coronary disease: a systematic review and meta-analysis of randomized trials. Eur Heart J. 2021;42(28):2765-2775. PMID 33769515; doi:10.1093/eurheartj/ehab115. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/eurheartj/ehab115", "areas": ["F"], "unverified": false}, {"key": "FitzGerald2020", "text": "FitzGerald JD, Dalbeth N, Mikuls T, Brignardello-Petersen R, Guyatt G, Abeles AM, et al. 2020 American College of Rheumatology Guideline for the Management of Gout. Arthritis Care Res (Hoboken). 2020;72(6):744-760. PMID 32391934; PMCID PMC10563586; doi:10.1002/acr.24180. Validated: PubMed, Europe PMC (full text read), 2026-10-20.", "link": "https://doi.org/10.1002/acr.24180", "areas": ["A", "B", "C", "D", "E", "F", "G", "H"], "unverified": false}, {"key": "FR-2021-05368", "text": "Food and Drug Administration. Bristol-Myers Squibb Company, et al.; Withdrawal of Approval of 19 New Drug Applications (includes NDA 207988, Zurampic [lesinurad] tablets 200 mg, Ironwood Pharmaceuticals). Federal Register document 2021-05368, published 2021-03-16. https://www.federalregister.gov/documents/2021/03/16/2021-05368. Validated: Federal Register API and full text, 2026-10-20.", "link": "https://www.federalregister.gov/documents/2021/03/16/2021-05368", "areas": ["H"], "unverified": false}, {"key": "Fralick2020", "text": "Fralick M, Chen SK, Patorno E, Kim SC. Assessing the risk for gout with sodium-glucose cotransporter-2 inhibitors in patients with type 2 diabetes: a population-based cohort study. Ann Intern Med. 2020;172(3):186-194. PMID 31931526; PMCID PMC7217750; doi:10.7326/M19-2610. Validated: Europe PMC|Crossref, 2026-10-20.", "link": "https://doi.org/10.7326/M19-2610", "areas": ["F", "G", "H"], "unverified": false}, {"key": "Frecklington2019ART", "text": "Frecklington M, Dalbeth N, McNair P, Morpeth T, Vandal AC, Gow P, et al. Effects of a footwear intervention on foot pain and disability in people with gout: a randomised controlled trial. Arthritis Res Ther. 2019;21(1):104. PMID 31018869; PMCID PMC6480516; doi:10.1186/s13075-019-1886-y. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/s13075-019-1886-y", "areas": ["G"], "unverified": false}, {"key": "Frecklington2019JFAR", "text": "Frecklington M, Williams A, Dalbeth N, McNair P, Gow P, Rome K. The footwear experiences of people with gout: a qualitative study. J Foot Ankle Res. 2019;12:38. PMID 31338128; PMCID PMC6625048; doi:10.1186/s13047-019-0349-7. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/s13047-019-0349-7", "areas": ["G"], "unverified": false}, {"key": "Fuller2020", "text": "Fuller A, Jenkins W, Doherty M, Abhishek A. Nurse-led care is preferred over GP-led care of gout and improves gout outcomes: results of Nottingham Gout Treatment Trial follow-up study. Rheumatology (Oxford). 2020;59(3):575-579. PMID 31410473; doi:10.1093/rheumatology/kez333. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kez333", "areas": ["G"], "unverified": false}, {"key": "Furuhashi2020", "text": "Furuhashi M. New insights into purine metabolism in metabolic diseases: role of xanthine oxidoreductase activity. Am J Physiol Endocrinol Metab. 2020;319(5):E827-E834. PMID 32893671; doi:10.1152/ajpendo.00378.2020. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1152/ajpendo.00378.2020", "areas": ["C"], "unverified": false}, {"key": "Gaffo2012", "text": "Gaffo AL, Schumacher HR, Saag KG, Taylor WJ, Dinnella J, Outman R, et al. Developing a provisional definition of flare in patients with established gout. Arthritis Rheum. 2012;64(5):1508-1517. PMID 22083456; doi:10.1002/art.33483. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.33483", "areas": ["B"], "unverified": false}, {"key": "Gaffo2018", "text": "Gaffo AL, Dalbeth N, Saag KG, Singh JA, Rahn EJ, Mudano AS, et al. Brief report: validation of a definition of flare in patients with established gout. Arthritis Rheumatol. 2018;70(3):462-467. PMID 29161469; doi:10.1002/art.40381. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.40381", "areas": ["B", "G"], "unverified": false}, {"key": "Gamala2019", "text": "Gamala M, Jacobs JWG, van Laar JM. The diagnostic performance of dual energy CT for diagnosing gout: a systematic literature review and meta-analysis. Rheumatology (Oxford). 2019;58(12):2117-2121. PMID 31089688; doi:10.1093/rheumatology/kez180. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kez180", "areas": ["B"], "unverified": false}, {"key": "Garrod1848", "text": "Garrod AB. Observations on certain pathological conditions of the blood and urine, in gout, rheumatism, and Bright's disease. Med Chir Trans. 1848;31:83-97. PMID 20895908; PMCID PMC2104076; doi:10.1177/095952874803100109. Validated: PubMed, Crossref, 2026-10-20.", "link": "https://doi.org/10.1177/095952874803100109", "areas": ["A"], "unverified": false}, {"key": "GBD2024Gout", "text": "GBD 2021 Gout Collaborators. Global, regional, and national burden of gout, 1990-2020, and projections to 2050: a systematic analysis of the Global Burden of Disease Study 2021. Lancet Rheumatol. 2024;6(8):e507-e517. PMID 38996590; PMCID PMC11263476; doi:10.1016/S2665-9913(24)00117-6. Validated: PubMed, Crossref, Europe PMC (full text read), 2026-10-20.", "link": "https://doi.org/10.1016/S2665-9913(24", "areas": ["A", "H"], "unverified": false}, {"key": "Goldfien2016", "text": "Goldfien R, Pressman A, Jacobson A, Ng M, Avins A. A Pharmacist-Staffed, Virtual Gout Management Clinic for Achieving Target Serum Uric Acid Levels: A Randomized Clinical Trial. Perm J. 2016;20(3):15-234. PMID 27352414; PMCID PMC4991910; doi:10.7812/TPP/15-234. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.7812/TPP/15-234", "areas": ["G"], "unverified": false}, {"key": "Gonen2020", "text": "Gonen T, Tiosano S, Comaneshter D, Amital H, Cohen AD, Shovman O. The coexistence of gout in ankylosing spondylitis patients: a case control study. Rheumatol Int. 2020;40(3):465-470. PMID 31630236; doi:10.1007/s00296-019-04462-x. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1007/s00296-019-04462-x", "areas": ["A"], "unverified": false}, {"key": "Graf2013", "text": "Graf SW, Buchbinder R, Zochling J, Whittle SL. The accuracy of methods for urate crystal detection in synovial fluid and the effect of sample handling: a systematic review. Clin Rheumatol. 2013;32(2):225-232. PMID 23138881; doi:10.1007/s10067-012-2107-0. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s10067-012-2107-0", "areas": ["B"], "unverified": false}, {"key": "Grayson2011", "text": "Grayson PC, Kim SY, LaValley M, Choi HK. Hyperuricemia and incident hypertension: a systematic review and meta-analysis. Arthritis Care Res (Hoboken). 2011;63(1):102-110. PMID 20824805; PMCID PMC3016454; doi:10.1002/acr.20344. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr.20344", "areas": ["F"], "unverified": false}, {"key": "Hak2010", "text": "Hak AE, Curhan GC, Grodstein F, Choi HK. Menopause, postmenopausal hormone use and risk of incident gout. Ann Rheum Dis. 2010;69(7):1305-9. PMID 19592386; PMCID PMC3142742; doi:10.1136/ard.2009.109884. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2009.109884", "areas": ["A", "G"], "unverified": false}, {"key": "Halevy2008", "text": "Halevy S, Ghislain PD, Mockenhaupt M, Fagot JP, Bouwes Bavinck JN, Sidoroff A, et al. Allopurinol is the most common cause of Stevens-Johnson syndrome and toxic epidermal necrolysis in Europe and Israel. J Am Acad Dermatol. 2008;58(1):25-32. PMID 17919772; doi:10.1016/j.jaad.2007.08.036. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/j.jaad.2007.08.036", "areas": ["E"], "unverified": false}, {"key": "HalperinKuhns2021", "text": "Halperin Kuhns VL, Woodward OM. Urate transport in health and disease. Best Pract Res Clin Rheumatol. 2021;35(4):101717. PMID 34690083; PMCID PMC8678298; doi:10.1016/j.berh.2021.101717. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1016/j.berh.2021.101717", "areas": ["C"], "unverified": false}, {"key": "Hande1984", "text": "Hande KR, Noone RM, Stone WJ. Severe allopurinol toxicity. Description and guidelines for prevention in patients with renal insufficiency. Am J Med. 1984;76(1):47-56. PMID 6691361; doi:10.1016/0002-9343(84)90743-5. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/0002-9343(84", "areas": ["E"], "unverified": false}, {"key": "Hannu2011", "text": "Hannu T. Reactive arthritis. Best Pract Res Clin Rheumatol. 2011;25(3):347-357. PMID 22100285; doi:10.1016/j.berh.2011.01.018. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.berh.2011.01.018", "areas": ["B"], "unverified": false}, {"key": "Harrold2006", "text": "Harrold LR, Yood RA, Mikuls TR, Andrade SE, Davis J, Fuller J, et al. Sex differences in gout epidemiology: evaluation and treatment. Ann Rheum Dis. 2006;65(10):1368-72. PMID 16644784; PMCID PMC1798311; doi:10.1136/ard.2006.051649. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2006.051649", "areas": ["A"], "unverified": false}, {"key": "Harrold2009", "text": "Harrold LR, Andrade SE, Briesacher BA, Raebel MA, Fouayzi H, Yood RA, et al. Adherence with urate-lowering therapies for the treatment of gout. Arthritis Res Ther. 2009;11(2):R46. PMID 19327147; PMCID PMC2688196; doi:10.1186/ar2659. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/ar2659", "areas": ["G"], "unverified": false}, {"key": "Harrold2012", "text": "Harrold LR, Mazor KM, Peterson D, Naz N, Firneno C, Yood RA. Patients' knowledge and beliefs concerning gout and its treatment: a population based study. BMC Musculoskelet Disord. 2012;13:180. PMID 22995041; PMCID PMC3517442; doi:10.1186/1471-2474-13-180. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/1471-2474-13-180", "areas": ["G"], "unverified": false}, {"key": "Harrold2017", "text": "Harrold LR, Etzel CJ, Gibofsky A, Kremer JM, Pillinger MH, Saag KG, et al. Sex differences in gout characteristics: tailoring care for women and men. BMC Musculoskelet Disord. 2017;18(1):108. PMID 28292303; PMCID PMC5351188; doi:10.1186/s12891-017-1465-9. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1186/s12891-017-1465-9", "areas": ["A"], "unverified": false}, {"key": "Heerspink2024", "text": "Heerspink HJL, Stack AG, Terkeltaub R, Jongs N, Inker LA, Bjursell M, et al. Combination Treatment with Verinurad and Allopurinol in CKD: A Randomized Placebo and Active Controlled Trial. J Am Soc Nephrol. 2024;35(5):594-606. PMID 38564654; PMCID PMC11149044; doi:10.1681/ASN.0000000000000326. Validated: PubMed (efetch abstract), Europe PMC, ClinicalTrials.gov NCT03990363, 2026-10-20.", "link": "https://doi.org/10.1681/ASN.0000000000000326", "areas": ["H"], "unverified": false}, {"key": "Hershfield2013", "text": "Hershfield MS, Callaghan JT, Tassaneeyakul W, Mushiroda T, Thorn CF, Klein TE, et al. Clinical Pharmacogenetics Implementation Consortium guidelines for human leukocyte antigen-B genotype and allopurinol dosing. Clin Pharmacol Ther. 2013;93(2):153-158. PMID 23232549; PMCID PMC3564416; doi:10.1038/clpt.2012.209. Validated: PubMed, CPIC API, 2026-10-20.", "link": "https://doi.org/10.1038/clpt.2012.209", "areas": ["E"], "unverified": false}, {"key": "Hill2015", "text": "Hill EM, Sky K, Sit M, Collamer A, Higgs J. Does starting allopurinol prolong acute treated gout? A randomized clinical trial. J Clin Rheumatol. 2015;21(3):120-125. PMID 25807090; doi:10.1097/RHU.0000000000000235. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1097/RHU.0000000000000235", "areas": ["E"], "unverified": false}, {"key": "Hirsch2008", "text": "Hirsch JD, Lee SJ, Terkeltaub R, Khanna D, Singh J, Sarkin A, et al. Evaluation of an instrument assessing influence of Gout on health-related quality of life. J Rheumatol. 2008;35(12):2406-2414. PMID 18925685; doi:10.3899/jrheum.080506. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.080506", "areas": ["G"], "unverified": false}, {"key": "Hisatome2021", "text": "Hisatome I, Li P, Miake J, Taufiq F, Mahati E, Maharani N, et al. Uric acid as a risk factor for chronic kidney disease and cardiovascular disease - Japanese guideline on the management of asymptomatic hyperuricemia. Circ J. 2021;85(2):130-138. PMID 33342914; doi:10.1253/circj.CJ-20-0406. Validated: PubMed, J-STAGE (full text, Table 1), 2026-10-20.", "link": "https://doi.org/10.1253/circj.CJ-20-0406", "areas": ["E"], "unverified": false}, {"key": "Ho1993", "text": "Ho G Jr, DeNuccio M. Gout and pseudogout in hospitalized patients. Arch Intern Med. 1993;153(24):2787-2790. PMID 8257255; doi:10.1001/archinte.1993.00410240099012. Validated: PubMed, Europe PMC, Crossref (DOI), 2026-10-20.", "link": "https://doi.org/10.1001/archinte.1993.00410240099012", "areas": ["B"], "unverified": false}, {"key": "Hoeltzenbein2013", "text": "Hoeltzenbein M, Stieler K, Panse M, Wacker E, Schaefer C. Allopurinol use during pregnancy - outcome of 31 prospectively ascertained cases and a phenotype possibly indicative for teratogenicity. PLoS One. 2013;8(6):e66637. PMID 23840514; PMCID PMC3686712; doi:10.1371/journal.pone.0066637. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1371/journal.pone.0066637", "areas": ["E"], "unverified": false}, {"key": "Holland2015", "text": "Holland R, McGill NW. Comprehensive dietary education in treated gout patients does not further improve serum urate. Intern Med J. 2015;45(2):189-194. PMID 25495503; doi:10.1111/imj.12661. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1111/imj.12661", "areas": ["G"], "unverified": false}, {"key": "Hornung2008", "text": "Hornung V, Bauernfeind F, Halle A, Samstad EO, Kono H, Rock KL, et al. Silica crystals and aluminum salts activate the NALP3 inflammasome through phagosomal destabilization. Nat Immunol. 2008;9(8):847-856. PMID 18604214; PMCID PMC2834784; doi:10.1038/ni.1631. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/ni.1631", "areas": ["C"], "unverified": false}, {"key": "Hosoya2016", "text": "Hosoya T, Ogawa Y, Hashimoto H, Ohashi T, Sakamoto R. Comparison of topiroxostat and allopurinol in Japanese hyperuricemic patients with or without gout: a phase 3, multicentre, randomized, double-blind, double-dummy, active-controlled, parallel-group study. J Clin Pharm Ther. 2016;41(3):290-297. PMID 27109450; doi:10.1111/jcpt.12391. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1111/jcpt.12391", "areas": ["H"], "unverified": false}, {"key": "Hosoya2020a", "text": "Hosoya T, Furuno K, Kanda S. A non-inferiority study of the novel selective urate reabsorption inhibitor dotinurad versus febuxostat in hyperuricemic patients with or without gout. Clin Exp Nephrol. 2020;24(Suppl 1):71-79. PMID 31970593; PMCID PMC7066279; doi:10.1007/s10157-020-01851-6. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s10157-020-01851-6", "areas": ["H", "E"], "unverified": false, "aliases": ["Hosoya2020Feb"]}, {"key": "Hosoya2020Benz", "text": "Hosoya T, Sano T, Sasaki T, Fushimi M, Ohashi T. Dotinurad versus benzbromarone in Japanese hyperuricemic patient with or without gout: a randomized, double-blind, parallel-group, phase 3 study. Clin Exp Nephrol. 2020;24(Suppl 1):62-70. PMID 31980978; PMCID PMC7066104; doi:10.1007/s10157-020-01849-0. Validated: PubMed, ClinicalTrials.gov (NCT03100318), 2026-10-20.", "link": "https://doi.org/10.1007/s10157-020-01849-0", "areas": ["E", "H"], "unverified": false, "aliases": ["Hosoya2020b"]}, {"key": "Hung2005", "text": "Hung IF, Wu AK, Cheng VC, Tang BS, To KW, Yeung CK, Woo PC, Lau SK, et al. Fatal interaction between clarithromycin and colchicine in patients with renal insufficiency: a retrospective study. Clin Infect Dis. 2005;41(3):291–300. PMID 16007523. doi:10.1086/431592. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1086/431592", "areas": ["D"], "unverified": false}, {"key": "Hung2005PNAS", "text": "Hung SI, Chung WH, Liou LB, Chu CC, Lin M, Huang HP, et al. HLA-B5801 allele as a genetic marker for severe cutaneous adverse reactions caused by allopurinol. Proc Natl Acad Sci U S A. 2005;102(11):4134-4139. PMID 15743917; PMCID PMC554812; doi:10.1073/pnas.0409500102. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1073/pnas.0409500102", "areas": ["E"], "unverified": false}, {"key": "Ichida2012", "text": "Ichida K, Matsuo H, Takada T, Nakayama A, Murakami K, Shimizu T, et al. Decreased extra-renal urate excretion is a common cause of hyperuricemia. Nat Commun. 2012;3:764. PMID 22473008; PMCID PMC3337984; doi:10.1038/ncomms1756. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/ncomms1756", "areas": ["C"], "unverified": false}, {"key": "IlarisPIG", "text": "ILARIS (canakinumab) injection, US prescribing information (Novartis), revised 11/2024. DailyMed setid 7d271f3b-e4f9-4d80-8dcf-28d49123f80e; current label version 8 Jun 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7d271f3b-e4f9-4d80-8dcf-28d49123f80e (full label read for this file; supersedes the partially verified note on this key in file E). Validated: openFDA label (set id 7d271f3b-e4f9-4d80-8dcf-28d49123f80e, effective 2026-06-08), 2026-10-20.", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7d271f3b-e4f9-4d80-8dcf-28d49123f80e", "areas": ["D", "H"], "unverified": false}, {"key": "Indraratna2018", "text": "Indraratna PL, Virk S, Gurram D, Day RO. Use of colchicine in pregnancy: a systematic review and meta-analysis. Rheumatology (Oxford). 2018;57(2):382–387. PMID 29029311. doi:10.1093/rheumatology/kex353. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kex353", "areas": ["G"], "unverified": false}, {"key": "Ishikawa2021", "text": "Ishikawa T, Takahashi T, Taniguchi T, Hosoya T. Dotinurad: a novel selective urate reabsorption inhibitor for the treatment of hyperuricemia and gout. Expert Opin Pharmacother. 2021;22(11):1397-1406. PMID 33926357; doi:10.1080/14656566.2021.1918102. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1080/14656566.2021.1918102", "areas": ["E"], "unverified": false}, {"key": "Janssen2019", "text": "Janssen CA, Oude Voshaar MAH, Vonkeman HE, Jansen TLTA, Janssen M, Kok MR, et al. Anakinra for the treatment of acute gout flares: a randomized, double-blind, placebo-controlled, active-comparator, non-inferiority trial. Rheumatology (Oxford). 2019;58(8):1344-1352. PMID 30602035; doi:10.1093/rheumatology/key402. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/key402", "areas": ["D"], "unverified": false}, {"key": "Janssens2008", "text": "Janssens HJ, Janssen M, van de Lisdonk EH, van Riel PL, van Weel C. Use of oral prednisolone or naproxen for the treatment of gout arthritis: a double-blind, randomised equivalence trial. Lancet. 2008;371(9627):1854-1860. PMID 18514729; doi:10.1016/S0140-6736(08)60799-0. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/S0140-6736(08", "areas": ["D"], "unverified": false}, {"key": "Janssens2010", "text": "Janssens HJ, Fransen J, van de Lisdonk EH, van Riel PL, van Weel C, Janssen M. A diagnostic rule for acute gouty arthritis in primary care without joint fluid analysis. Arch Intern Med. 2010;170(13):1120-1126. PMID 20625017; doi:10.1001/archinternmed.2010.196. Validated: PubMed, Europe PMC (abstract; item weights confirmed via Lee2015 full text), 2026-10-20.", "link": "https://doi.org/10.1001/archinternmed.2010.196", "areas": ["B"], "unverified": false}, {"key": "Jatuworapruk2022IJRD", "text": "Jatuworapruk K, Grainger R, Dalbeth N, Taylor WJ. Regular pre-admission urate-lowering therapy and serum urate testing are associated with a shorter hospital length of stay in people with gout: A nation-wide population-based cohort study. Int J Rheum Dis. 2022;25(2):154-162. PMID 34796661; doi:10.1111/1756-185X.14250. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1111/1756-185X.14250", "areas": ["G"], "unverified": false}, {"key": "Jatuworapruk2022Rheum", "text": "Jatuworapruk K, Grainger R, Dalbeth N, Lertnawapan R, Hanvivadhanakul P, Towiwat P, et al. The GOUT-36 prediction rule for inpatient gout flare in people with comorbid gout: derivation and external validation. Rheumatology (Oxford). 2022;61(4):1658-1662. PMID 34297058; doi:10.1093/rheumatology/keab590. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/keab590", "areas": ["G"], "unverified": false}, {"key": "Jeong2019", "text": "Jeong H, Jeon CH. Clinical characteristics and risk factors for gout flare during the postsurgical period. Adv Rheumatol. 2019;59(1):31. PMID 31345250; doi:10.1186/s42358-019-0075-7. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/s42358-019-0075-7", "areas": ["G"], "unverified": false}, {"key": "Jing2015", "text": "Jing J, Kielstein JT, Schultheiss UT, Sitter T, Titze SI, Schaeffner ES, et al. Prevalence and correlates of gout in a large cohort of patients with chronic kidney disease: the German Chronic Kidney Disease (GCKD) study. Nephrol Dial Transplant. 2015;30(4):613-621. PMID 25395390; doi:10.1093/ndt/gfu352. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/ndt/gfu352", "areas": ["F"], "unverified": false}, {"key": "Johnson2018", "text": "Johnson RJ, Bakris GL, Borghi C, Chonchol MB, Feldman D, Lanaspa MA, et al. Hyperuricemia, acute and chronic kidney disease, hypertension, and cardiovascular disease: report of a scientific workshop organized by the National Kidney Foundation. Am J Kidney Dis. 2018;71(6):851-865. PMID 29496260; PMCID PMC7286363; doi:10.1053/j.ajkd.2017.12.009. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1053/j.ajkd.2017.12.009", "areas": ["F"], "unverified": false}, {"key": "Jokic2020", "text": "Jokic A, Milevoj Kopcinovic L, Culej J, Kocijan I, Bozovic M. Laboratory testing of extravascular body fluids: national recommendations on behalf of the Croatian Society of Medical Biochemistry and Laboratory Medicine. Part II - Synovial fluid. Biochem Med (Zagreb). 2020;30(3):030501. PMID 32774119; PMCID PMC7394252; doi:10.11613/BM.2020.030501. Validated: PubMed, Europe PMC (full text, Table 1), 2026-10-20.", "link": "https://doi.org/10.11613/BM.2020.030501", "areas": ["B"], "unverified": false}, {"key": "Jolly2025", "text": "Jolly SS, d'Entremont MA, Lee SF, Mian R, Tyrwhitt J, Kedev S, et al. Colchicine in acute myocardial infarction. N Engl J Med. 2025;392(7):633-642. PMID 39555823; doi:10.1056/NEJMoa2405922. Validated: Europe PMC|Crossref; ClinicalTrials.gov NCT03048825 (CLEAR SYNERGY), 2026-10-20.", "link": "https://doi.org/10.1056/NEJMoa2405922", "areas": ["F"], "unverified": false}, {"key": "Joosten2010", "text": "Joosten LA, Netea MG, Mylona E, Koenders MI, Malireddi RK, Oosting M, et al. Engagement of fatty acids with Toll-like receptor 2 drives interleukin-1β production via the ASC/caspase 1 pathway in monosodium urate monohydrate crystal-induced gouty arthritis. Arthritis Rheum. 2010;62(11):3237-3248. PMID 20662061; PMCID PMC2970687; doi:10.1002/art.27667. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/art.27667", "areas": ["C"], "unverified": false}, {"key": "Jordan2019", "text": "Jordan DM, Choi HK, Verbanck M, Topless R, Won HH, Nadkarni G, et al. No causal effects of serum urate levels on the risk of chronic kidney disease: a Mendelian randomization study. PLoS Med. 2019;16(1):e1002725. PMID 30645594; PMCID PMC6333326; doi:10.1371/journal.pmed.1002725. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1371/journal.pmed.1002725", "areas": ["F"], "unverified": false}, {"key": "Jun2025", "text": "Jun JB, Lee HS, Kim SH, Lee SG, Lim DH, Kim J, et al. Efficacy and safety of epaminurad, a potent hURAT1 inhibitor, in patients with gout: a randomized, placebo-controlled, dose-finding study. Arthritis Res Ther. 2025;27(1):113. PMID 40420308; PMCID PMC12105222; doi:10.1186/s13075-025-03577-w. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/s13075-025-03577-w", "areas": ["H"], "unverified": false}, {"key": "Juraschek2011", "text": "Juraschek SP, Miller ER 3rd, Gelber AC. Effect of oral vitamin C supplementation on serum uric acid: a meta-analysis of randomized controlled trials. Arthritis Care Res (Hoboken). 2011;63(9):1295-1306. PMID 21671418; PMCID PMC3169708; doi:10.1002/acr.20519. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr.20519", "areas": ["G"], "unverified": false}, {"key": "Juraschek2016", "text": "Juraschek SP, Gelber AC, Choi HK, Appel LJ, Miller ER 3rd. Effects of the Dietary Approaches to Stop Hypertension (DASH) Diet and Sodium Intake on Serum Uric Acid. Arthritis Rheumatol. 2016;68(12):3002-3009. PMID 27523583; PMCID PMC5363397; doi:10.1002/art.39813. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.39813", "areas": ["G"], "unverified": false}, {"key": "Juraschek2021", "text": "Juraschek SP, Miller ER 3rd, Wu B, White K, Charleston J, Gelber AC, et al. A Randomized Pilot Study of DASH Patterned Groceries on Serum Urate in Individuals with Gout. Nutrients. 2021;13(2):538. PMID 33562216; PMCID PMC7914968; doi:10.3390/nu13020538. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3390/nu13020538", "areas": ["G"], "unverified": false}, {"key": "Juraschek2022", "text": "Juraschek SP, Gaziano JM, Glynn RJ, Gomelskaya N, Bubes VY, Buring JE, et al. Effects of vitamin C supplementation on gout risk: results from the Physicians' Health Study II trial. Am J Clin Nutr. 2022;116(3):812-819. PMID 35575611; PMCID PMC9437983; doi:10.1093/ajcn/nqac140. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1093/ajcn/nqac140", "areas": ["A"], "unverified": false}, {"key": "Karamanou2018", "text": "Karamanou M, Tsoucalas G, Pantos K, Androutsos G. Isolating Colchicine in 19th Century: An Old Drug Revisited. Curr Pharm Des. 2018;24(6):654-658. PMID 29336251; doi:10.2174/1381612824666180115105850. Validated: PubMed, Crossref, 2026-10-20.", "link": "https://doi.org/10.2174/1381612824666180115105850", "areas": ["A"], "unverified": false}, {"key": "Kayagaki2015", "text": "Kayagaki N, Stowe IB, Lee BL, O'Rourke K, et al., Dixit VM. Caspase-11 cleaves gasdermin D for non-canonical inflammasome signalling. Nature. 2015;526(7575):666-671. PMID: 26375259. DOI: 10.1038/nature15541. Validated: Europe PMC, 2026-10-20 (FMF key and text reused).", "link": "https://doi.org/10.1038/nature15541", "areas": ["C"], "unverified": false}, {"key": "KDIGO2024", "text": "Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024;105(4S):S117-S314. PMID 38490803; doi:10.1016/j.kint.2023.10.018. Validated: Europe PMC|Crossref; recommendation wording read in the KDIGO full-text PDF (kdigo.org), 2026-10-20.", "link": "https://doi.org/10.1016/j.kint.2023.10.018", "areas": ["F"], "unverified": false}, {"key": "Keenan2011", "text": "Keenan RT, O'Brien WR, Lee KH, Crittenden DB, Fisher MC, Goldfarb DS, et al. Prevalence of contraindications and prescription of pharmacologic therapies for gout. Am J Med. 2011;124(2):155-163. PMID 21295195; doi:10.1016/j.amjmed.2010.09.012. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.amjmed.2010.09.012", "areas": ["D"], "unverified": false}, {"key": "Keenan2016", "text": "Keenan T, Zhao W, Rasheed A, Ho WK, Malik R, Felix JF, et al. Causal assessment of serum urate levels in cardiometabolic diseases through a Mendelian randomization study. J Am Coll Cardiol. 2016;67(4):407-416. PMID 26821629; PMCID PMC5503188; doi:10.1016/j.jacc.2015.10.086. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.jacc.2015.10.086", "areas": ["F"], "unverified": false}, {"key": "Keller2018", "text": "Keller SF, Lu N, Blumenthal KG, Rai SK, Yokose C, Choi JWJ, et al. Racial/ethnic variation and risk factors for allopurinol-associated severe cutaneous adverse reactions: a cohort study. Ann Rheum Dis. 2018;77(8):1187-1193. PMID 29653927; PMCID PMC6045437; doi:10.1136/annrheumdis-2017-212905. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2017-212905", "areas": ["E"], "unverified": false}, {"key": "Khanna2011", "text": "Khanna D, Sarkin AJ, Khanna PP, Shieh MM, Kavanaugh AF, Terkeltaub RA, et al. Minimally important differences of the gout impact scale in a randomized controlled trial. Rheumatology (Oxford). 2011;50(7):1331-1336. PMID 21372003; PMCID PMC3307519; doi:10.1093/rheumatology/ker023. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/ker023", "areas": ["G"], "unverified": false}, {"key": "Khanna2012P1", "text": "Khanna D, Fitzgerald JD, Khanna PP, Bae S, Singh MK, Neogi T, et al. 2012 American College of Rheumatology guidelines for management of gout. Part 1: systematic nonpharmacologic and pharmacologic therapeutic approaches to hyperuricemia. Arthritis Care Res (Hoboken). 2012;64(10):1431-1446. PMID 23024028; PMCID PMC3683400; doi:10.1002/acr.21772. Full text read (PMC). Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr.21772", "areas": ["G"], "unverified": false}, {"key": "Khanna2012P2", "text": "Khanna D, Khanna PP, Fitzgerald JD, Singh MK, Bae S, Neogi T, et al. 2012 American College of Rheumatology guidelines for management of gout. Part 2: therapy and antiinflammatory prophylaxis of acute gouty arthritis. Arthritis Care Res (Hoboken). 2012;64(10):1447-1461. PMID 23024029; PMCID PMC3662546; doi:10.1002/acr.21773. Validated: Europe PMC, PMC full text, 2026-10-20.", "link": "https://doi.org/10.1002/acr.21773", "areas": ["D"], "unverified": false}, {"key": "Kienhorst2015", "text": "Kienhorst LB, Janssens HJ, Fransen J, Janssen M. The validation of a diagnostic rule for gout without joint fluid analysis: a prospective study. Rheumatology (Oxford). 2015;54(4):609-614. PMID 25231179; doi:10.1093/rheumatology/keu378. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/keu378", "areas": ["B"], "unverified": false}, {"key": "Kiltz2017", "text": "Kiltz U, Smolen J, Bardin T, Cohen Solal A, Dalbeth N, Doherty M, et al. Treat-to-target (T2T) recommendations for gout. Ann Rheum Dis. 2017;76(4):632-638. PMID 27658678; doi:10.1136/annrheumdis-2016-209467. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2016-209467", "areas": ["E"], "unverified": false}, {"key": "Kimura2018", "text": "Kimura K, Hosoya T, Uchida S, Inaba M, Makino H, Maruyama S, et al. Febuxostat therapy for patients with stage 3 CKD and asymptomatic hyperuricemia: a randomized trial. Am J Kidney Dis. 2018;72(6):798-810. PMID 30177485; doi:10.1053/j.ajkd.2018.06.028. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1053/j.ajkd.2018.06.028", "areas": ["F"], "unverified": false}, {"key": "KineretPI", "text": "KINERET (anakinra) injection, solution, US prescribing information with Instructions for Use (Swedish Orphan Biovitrum). DailyMed setid d9d74915-6606-4570-9c52-c4001d3177de; current label version 10 Apr 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d9d74915-6606-4570-9c52-c4001d3177de (full label and IFU read). Validated: openFDA label (indications re-read), 2026-10-20.", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d9d74915-6606-4570-9c52-c4001d3177de", "areas": ["D", "H"], "unverified": false}, {"key": "Kitzman2024", "text": "Kitzman DW, Voors AA, Mentz RJ, Lewis GD, Perl S, Myte R, et al. Verinurad Plus Allopurinol for Heart Failure With Preserved Ejection Fraction: The AMETHYST Randomized Clinical Trial. JAMA Cardiol. 2024;9(10):892-900. PMID 39141378; PMCID PMC11325246; doi:10.1001/jamacardio.2024.2435. Validated: PubMed, Europe PMC, ClinicalTrials.gov NCT04327024, 2026-10-20.", "link": "https://doi.org/10.1001/jamacardio.2024.2435", "areas": ["H"], "unverified": false}, {"key": "Kleinman2007", "text": "Kleinman NL, Brook RA, Patel PA, Melkonian AK, Brizee TJ, Smeeding JE, et al. The impact of gout on work absence and productivity. Value Health. 2007;10(4):231-237. PMID 17645677; doi:10.1111/j.1524-4733.2007.00173.x. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1111/j.1524-4733.2007.00173.x", "areas": ["G"], "unverified": false}, {"key": "Klimecki1994", "text": "Klimecki WT, Futscher BW, Grogan TM, Dalton WS. P-glycoprotein expression and function in circulating blood cells from normal volunteers. Blood. 1994;83(9):2451–2458. PMID 7513198. doi:10.1182/blood.V83.9.2451.2451. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1182/blood.V83.9.2451.2451", "areas": ["D"], "unverified": false}, {"key": "Klinenberg1965", "text": "Klinenberg JR, Goldfinger SE, Seegmiller JE. The effectiveness of the xanthine oxidase inhibitor allopurinol in the treatment of gout. Ann Intern Med. 1965;62:639-47. PMID 14274828; doi:10.7326/0003-4819-62-4-639. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.7326/0003-4819-62-4-639", "areas": ["A"], "unverified": false}, {"key": "Klionsky2025", "text": "Klionsky Y, Torralba KD, Obermeyer K, Padnick-Silver L, Lam G, LaMoreaux B. Gout Remission With Pegloticase-Induced Intensive Urate-Lowering Therapy: A Post Hoc Clinical Trial Analysis. ACR Open Rheumatol. 2025;7(8):e70080. PMID 40810458; PMCID PMC12351638; doi:10.1002/acr2.70080. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr2.70080", "areas": ["H"], "unverified": false}, {"key": "Kluck2020", "text": "Klück V, Jansen TLTA, Janssen M, Comarniceanu A, Efdé M, Tengesdal IW, et al. Dapansutrile, an oral selective NLRP3 inflammasome inhibitor, for treatment of gout flares: an open-label, dose-adaptive, proof-of-concept, phase 2a trial. Lancet Rheumatol. 2020;2(5):e270-e280. PMID 33005902; PMCID PMC7523621; doi:10.1016/S2665-9913(20)30065-5. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/S2665-9913(20", "areas": ["H"], "unverified": false}, {"key": "Ko2015", "text": "Ko TM, Tsai CY, Chen SY, Chen KS, Yu KH, Chu CS, et al. Use of HLA-B58:01 genotyping to prevent allopurinol induced severe cutaneous adverse reactions in Taiwan: national prospective cohort study. BMJ. 2015;351:h4848. PMID 26399967; PMCID PMC4579807; doi:10.1136/bmj.h4848. Validated: PubMed, Europe PMC (full text), 2026-10-20.", "link": "https://doi.org/10.1136/bmj.h4848", "areas": ["E"], "unverified": false}, {"key": "Kojima2019", "text": "Kojima S, Matsui K, Hiramitsu S, Hisatome I, Waki M, Uchiyama K, et al. Febuxostat for Cerebral and CaRdiorenovascular Events PrEvEntion StuDy. Eur Heart J. 2019;40(22):1778-1786. PMID 30844048; PMCID PMC6554652; doi:10.1093/eurheartj/ehz119. Validated: PubMed, Europe PMC (full text), ClinicalTrials.gov (NCT01984749), 2026-10-20.", "link": "https://doi.org/10.1093/eurheartj/ehz119", "areas": ["E", "F", "H"], "unverified": false}, {"key": "Kong2025", "text": "Kong N, Xue Y, Mao L, Qian L, Guo H, Hu J, et al. Efficacy and Safety of Firsekibart Compared to Etoricoxib for Gout Flares: A Phase 2, Multicenter, Open-label, Active-controlled, Randomized Non-inferiority Trial. Rheumatol Ther. 2025;12(5):975-990. PMID 40833487; PMCID PMC12450154; doi:10.1007/s40744-025-00790-6. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s40744-025-00790-6", "areas": ["H"], "unverified": false}, {"key": "Kottgen2013", "text": "Köttgen A, Albrecht E, Teumer A, Vitart V, Krumsiek J, Hundertmark C, et al. Genome-wide association analyses identify 18 new loci associated with serum urate concentrations. Nat Genet. 2013;45(2):145-154. PMID 23263486; PMCID PMC3663712; doi:10.1038/ng.2500. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/ng.2500", "areas": ["C"], "unverified": false}, {"key": "Kramer2003", "text": "Kramer HJ, Choi HK, Atkinson K, Stampfer M, Curhan GC. The association between gout and nephrolithiasis in men: the Health Professionals' Follow-Up Study. Kidney Int. 2003;64(3):1022-1026. PMID 12911552; doi:10.1046/j.1523-1755.2003.t01-2-00171.x. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1046/j.1523-1755.2003.t01-2-00171.x", "areas": ["F"], "unverified": false}, {"key": "Kratzer2014", "text": "Kratzer JT, Lanaspa MA, Murphy MN, Cicerchi C, Graves CL, Tipton PA, et al. Evolutionary history and metabolic insights of ancient mammalian uricases. Proc Natl Acad Sci U S A. 2014;111(10):3763-3768. PMID 24550457; PMCID PMC3956161; doi:10.1073/pnas.1320393111. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1073/pnas.1320393111", "areas": ["C"], "unverified": false}, {"key": "Krishnan2006", "text": "Krishnan E, Baker JF, Furst DE, Schumacher HR. Gout and the risk of acute myocardial infarction. Arthritis Rheum. 2006;54(8):2688-2696. PMID 16871533; doi:10.1002/art.22014. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.22014", "areas": ["F"], "unverified": false}, {"key": "Kuncl1987", "text": "Kuncl RW, Duncan G, Watson D, Alderson K, Rogawski MA, Peper M. Colchicine myopathy and neuropathy. N Engl J Med. 1987;316(25):1562–1568. PMID 3035372. doi:10.1056/NEJM198706183162502. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1056/NEJM198706183162502", "areas": ["D"], "unverified": false}, {"key": "Kuo2015", "text": "Kuo CF, Grainge MJ, Mallen C, Zhang W, Doherty M. Rising burden of gout in the UK but continuing suboptimal management: a nationwide population study. Ann Rheum Dis. 2015;74(4):661-667. PMID 24431399; PMCID PMC4392307; doi:10.1136/annrheumdis-2013-204463. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2013-204463", "areas": ["H", "A"], "unverified": false, "aliases": ["Kuo2015ARD"]}, {"key": "Kuo2015NRR", "text": "Kuo CF, Grainge MJ, Zhang W, Doherty M. Global epidemiology of gout: prevalence, incidence and risk factors. Nat Rev Rheumatol. 2015;11(11):649-62. PMID 26150127; doi:10.1038/nrrheum.2015.91. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1038/nrrheum.2015.91", "areas": ["A"], "unverified": false}, {"key": "Kuo2016", "text": "Kuo CF, Grainge MJ, Mallen C, Zhang W, Doherty M. Comorbidities in patients with gout prior to and following diagnosis: case-control study. Ann Rheum Dis. 2016;75(1):210-217. PMID 25398375; PMCID PMC4717388; doi:10.1136/annrheumdis-2014-206410. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2014-206410", "areas": ["F"], "unverified": false}, {"key": "Lee2008", "text": "Lee MH, Graham GG, Williams KM, Day RO. A benefit-risk assessment of benzbromarone in the treatment of gout. Was its withdrawal from the market in the best interest of patients? Drug Saf. 2008;31(8):643-665. PMID 18636784; doi:10.2165/00002018-200831080-00002. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.2165/00002018-200831080-00002", "areas": ["E"], "unverified": false}, {"key": "Lee2015", "text": "Lee KH, Choi ST, Lee SK, Lee JH, Yoon BY. Application of a novel diagnostic rule in the differential diagnosis between acute gouty arthritis and septic arthritis. J Korean Med Sci. 2015;30(6):700-704. PMID 26028920; PMCID PMC4444468; doi:10.3346/jkms.2015.30.6.700. Validated: PubMed, Europe PMC (full text), 2026-10-20.", "link": "https://doi.org/10.3346/jkms.2015.30.6.700", "areas": ["B"], "unverified": false}, {"key": "Lee2017", "text": "Lee YH, Song GG. Diagnostic accuracy of dual-energy computed tomography in patients with gout: a meta-analysis. Semin Arthritis Rheum. 2017;47(1):95-101. PMID 28372824; doi:10.1016/j.semarthrit.2017.03.002. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.semarthrit.2017.03.002", "areas": ["B"], "unverified": false}, {"key": "Lee2018", "text": "Lee YH, Song GG. Diagnostic accuracy of ultrasound in patients with gout: a meta-analysis. Semin Arthritis Rheum. 2018;47(5):703-709. PMID 29054295; doi:10.1016/j.semarthrit.2017.09.012. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.semarthrit.2017.09.012", "areas": ["B"], "unverified": false}, {"key": "Leung2015", "text": "Leung YY, Yao Hui LL, Kraus VB. Colchicine—update on mechanisms of action and therapeutic uses. Semin Arthritis Rheum. 2015;45(3):341–350. PMID 26228647. PMCID PMC4656054. doi:10.1016/j.semarthrit.2015.06.013. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1016/j.semarthrit.2015.06.013", "areas": ["D"], "unverified": false}, {"key": "Li2017", "text": "Li X, Meng X, Timofeeva M, Tzoulaki I, Tsilidis KK, Ioannidis JP, et al. Serum uric acid levels and multiple health outcomes: umbrella review of evidence from observational studies, randomised controlled trials, and Mendelian randomisation studies. BMJ. 2017;357:j2376. PMID 28592419; PMCID PMC5461476; doi:10.1136/bmj.j2376. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/bmj.j2376", "areas": ["F"], "unverified": false}, {"key": "Li2019", "text": "Li J, Badve SV, Zhou Z, Rodgers A, Day R, Oh R, et al. The effects of canagliflozin on gout in type 2 diabetes: a post-hoc analysis of the CANVAS Program. Lancet Rheumatol. 2019;1(4):e220-e228. PMID 38229378; doi:10.1016/S2665-9913(19)30078-5. Validated: Europe PMC|Crossref, 2026-10-20.", "link": "https://doi.org/10.1016/S2665-9913(19", "areas": ["F"], "unverified": false}, {"key": "Lindsay2011", "text": "Lindsay K, Gow P, Vanderpyl J, Logo P, Dalbeth N. The experience and impact of living with gout: a study of men with chronic gout using a qualitative grounded theory approach. J Clin Rheumatol. 2011;17(1):1-6. PMID 21169857; doi:10.1097/RHU.0b013e318204a8f9. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1097/RHU.0b013e318204a8f9", "areas": ["G"], "unverified": false}, {"key": "Lipsky2014", "text": "Lipsky PE, Calabrese LH, Kavanaugh A, Sundy JS, Wright D, Wolfson M, et al. Pegloticase immunogenicity: the relationship between efficacy and antibody development in patients treated for refractory chronic gout. Arthritis Res Ther. 2014;16(2):R60. PMID 24588936; PMCID PMC4060440; doi:10.1186/ar4497. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1186/ar4497", "areas": ["E"], "unverified": false}, {"key": "Liu2016", "text": "Liu X, Zhang Z, Ruan J, Pan Y, Magupalli VG, Wu H, Lieberman J. Inflammasome-activated gasdermin D causes pyroptosis by forming membrane pores. Nature. 2016;535(7610):153-158. PMID: 27383986. DOI: 10.1038/nature18629. Validated: Europe PMC, 2026-10-20 (FMF key and text reused).", "link": "https://doi.org/10.1038/nature18629", "areas": ["C"], "unverified": false}, {"key": "LiYu2001", "text": "Li-Yu J, Clayburne G, Sieck M, Beutler A, Rull M, Eisner E, et al. Treatment of chronic gout. Can we determine when urate stores are depleted enough to prevent attacks of gout? J Rheumatol. 2001;28(3):577-580. PMID 11296962. Validated: Europe PMC, 2026-10-20 (no DOI registered).", "link": "https://pubmed.ncbi.nlm.nih.gov/11296962/", "areas": ["C"], "unverified": false}, {"key": "Loeb1972", "text": "Loeb JN. The influence of temperature on the solubility of monosodium urate. Arthritis Rheum. 1972;15(2):189-192. PMID 5027604; doi:10.1002/art.1780150209. Validated: Europe PMC, Crossref, 2026-10-20 (record only; no abstract and full text not accessed, so its figures are quoted as reported by Martillo2014 and Chhana2015).", "link": "https://doi.org/10.1002/art.1780150209", "areas": ["C"], "unverified": false}, {"key": "London1957", "text": "London M, Hudson PB. Uricolytic activity of purified uricase in two human beings. Science. 1957;125(3254):937-8. PMID 13421703; doi:10.1126/science.125.3254.937. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1126/science.125.3254.937", "areas": ["A"], "unverified": false}, {"key": "Lu2014", "text": "Lu A, Magupalli VG, Ruan J, Yin Q, Atianand MK, Vos MR, Schroder GF, Fitzgerald KA, Wu H, Egelman EH. Unified polymerization mechanism for the assembly of ASC-dependent inflammasomes. Cell. 2014;156(6):1193-1206. PMID: 24630722. DOI: 10.1016/j.cell.2014.02.008. Validated: Europe PMC, 2026-10-20 (FMF key and text reused).", "link": "https://doi.org/10.1016/j.cell.2014.02.008", "areas": ["C"], "unverified": false}, {"key": "Lumbreras2005", "text": "Lumbreras B, Pascual E, Frasquet J, González-Salinas J, Rodríguez E, Hernández-Aguado I. Analysis for crystals in synovial fluid: training of the analysts results in high consistency. Ann Rheum Dis. 2005;64(4):612-615. PMID 15769916; PMCID PMC1755440; doi:10.1136/ard.2004.027268. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2004.027268", "areas": ["B"], "unverified": false}, {"key": "Maalouf2004", "text": "Maalouf NM, Sakhaee K, Parks JH, Coe FL, Adams-Huet B, Pak CY. Association of urinary pH with body weight in nephrolithiasis. Kidney Int. 2004;65(4):1422-1425. PMID 15086484; doi:10.1111/j.1523-1755.2004.00522.x. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1111/j.1523-1755.2004.00522.x", "areas": ["F"], "unverified": false}, {"key": "Mackenzie2020", "text": "Mackenzie IS, Ford I, Nuki G, Hallas J, Hawkey CJ, Webster J, et al. Long-term cardiovascular safety of febuxostat compared with allopurinol in patients with gout (FAST): a multicentre, prospective, randomised, open-label, non-inferiority trial. Lancet. 2020;396(10264):1745-1757. PMID 33181081; doi:10.1016/S0140-6736(20)32234-0. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/S0140-6736(20", "areas": ["E", "F"], "unverified": false}, {"key": "Mackenzie2022", "text": "Mackenzie IS, Hawkey CJ, Ford I, Greenlaw N, Pigazzani F, Rogers A, et al. Allopurinol versus usual care in UK patients with ischaemic heart disease (ALL-HEART): a multicentre, prospective, randomised, open-label, blinded-endpoint trial. Lancet. 2022;400(10359):1195-1205. PMID 36216006; doi:10.1016/S0140-6736(22)01657-9. Validated: Europe PMC|Crossref, 2026-10-20.", "link": "https://doi.org/10.1016/S0140-6736(22", "areas": ["F"], "unverified": false}, {"key": "Maiuolo2016", "text": "Maiuolo J, Oppedisano F, Gratteri S, Muscoli C, Mollace V. Regulation of uric acid metabolism and excretion. Int J Cardiol. 2016;213:8-14. PMID 26316329; doi:10.1016/j.ijcard.2015.08.109. Validated: Europe PMC, Crossref, 2026-10-20 (abstract only read; a corrigendum was published, PMID 37355397).", "link": "https://doi.org/10.1016/j.ijcard.2015.08.109", "areas": ["C"], "unverified": false}, {"key": "Major2018", "text": "Major TJ, Topless RK, Dalbeth N, Merriman TR. Evaluation of the diet wide contribution to serum urate levels: meta-analysis of population based cohorts. BMJ. 2018;363:k3951. PMID 30305269; PMCID PMC6174725; doi:10.1136/bmj.k3951. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/bmj.k3951", "areas": ["A", "G"], "unverified": false}, {"key": "Major2018Genet", "text": "Major TJ, Dalbeth N, Stahl EA, Merriman TR. An update on the genetics of hyperuricaemia and gout. Nat Rev Rheumatol. 2018;14(6):341-353. PMID 29740155; doi:10.1038/s41584-018-0004-x. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/s41584-018-0004-x", "areas": ["C"], "unverified": false}, {"key": "Major2024", "text": "Major TJ, Takei R, Matsuo H, Leask MP, Sumpter NA, Topless RK, et al. A genome-wide association analysis reveals new pathogenic pathways in gout. Nat Genet. 2024;56(11):2392-2406. PMID 39406924; doi:10.1038/s41588-024-01921-5. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1038/s41588-024-01921-5", "areas": ["A"], "unverified": false}, {"key": "Mallinson2014", "text": "Mallinson PI, Coupal T, Reisinger C, Chou H, Munk PL, Nicolaou S, et al. Artifacts in dual-energy CT gout protocol: a review of 50 suspected cases with an artifact identification guide. AJR Am J Roentgenol. 2014;203(1):W103-W109. PMID 24951221; doi:10.2214/AJR.13.11396. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.2214/AJR.13.11396", "areas": ["B"], "unverified": false}, {"key": "Margaretten2007", "text": "Margaretten ME, Kohlwes J, Moore D, Bent S. Does this adult patient have septic arthritis? JAMA. 2007;297(13):1478-1488. PMID 17405973; doi:10.1001/jama.297.13.1478. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1001/jama.297.13.1478", "areas": ["B"], "unverified": false}, {"key": "Martillo2014", "text": "Martillo MA, Nazzal L, Crittenden DB. The crystallization of monosodium urate. Curr Rheumatol Rep. 2014;16(2):400. PMID 24357445; PMCID PMC3975080; doi:10.1007/s11926-013-0400-9. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1007/s11926-013-0400-9", "areas": ["C"], "unverified": false}, {"key": "Martinon2006", "text": "Martinon F, Pétrilli V, Mayor A, Tardivel A, Tschopp J. Gout-associated uric acid crystals activate the NALP3 inflammasome. Nature. 2006;440(7081):237-41. PMID 16407889; doi:10.1038/nature04516. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1038/nature04516", "areas": ["A", "C", "D", "H"], "unverified": false}, {"key": "Mathews2010", "text": "Mathews CJ, Weston VC, Jones A, Field M, Coakley G. Bacterial septic arthritis in adults. Lancet. 2010;375(9717):846-855. PMID 20206778; doi:10.1016/S0140-6736(09)61595-6. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/S0140-6736(09", "areas": ["B"], "unverified": false}, {"key": "Matsuo2009", "text": "Matsuo H, Takada T, Ichida K, Nakamura T, Nakayama A, Ikebuchi Y, et al. Common defects of ABCG2, a high-capacity urate exporter, cause gout: a function-based genetic analysis in a Japanese population. Sci Transl Med. 2009;1(5):5ra11. PMID 20368174; doi:10.1126/scitranslmed.3000237. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1126/scitranslmed.3000237", "areas": ["C"], "unverified": false}, {"key": "McAdamsDeMarco2013", "text": "McAdams-DeMarco MA, Maynard JW, Baer AN, Kao LW, Kottgen A, Coresh J. A urate gene-by-diuretic interaction and gout risk in participants with hypertension: results from the ARIC study. Ann Rheum Dis. 2013;72(5):701-6. PMID 22753387; PMCID PMC4565188; doi:10.1136/annrheumdis-2011-201186. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2011-201186", "areas": ["A"], "unverified": false}, {"key": "McCarty1961", "text": "McCarty DJ, Hollander JL. Identification of urate crystals in gouty synovial fluid. Ann Intern Med. 1961;54:452-60. PMID 13773775; doi:10.7326/0003-4819-54-3-452. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.7326/0003-4819-54-3-452", "areas": ["A"], "unverified": false}, {"key": "McCarty1970", "text": "McCarty DJ. A historical note: Leeuwenhoek's description of crystals from a gouty tophus. Arthritis Rheum. 1970;13(4):414-8. PMID 4914047; doi:10.1002/art.1780130408. Validated: PubMed, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/art.1780130408", "areas": ["A"], "unverified": false}, {"key": "McCormick2020", "text": "McCormick N, Rai SK, Lu N, Yokose C, Curhan GC, Choi HK. Estimation of Primary Prevention of Gout in Men Through Modification of Obesity and Other Key Lifestyle Factors. JAMA Netw Open. 2020;3(11):e2027421. PMID 33231639; PMCID PMC7686865; doi:10.1001/jamanetworkopen.2020.27421. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1001/jamanetworkopen.2020.27421", "areas": ["A"], "unverified": false}, {"key": "McCormick2023", "text": "McCormick N, Yokose C, Wei J, Lu N, Wexler DJ, Aviña-Zubieta JA, et al. Comparative effectiveness of sodium-glucose cotransporter-2 inhibitors for recurrent gout flares and gout-primary emergency department visits and hospitalizations: a general population cohort study. Ann Intern Med. 2023;176(8):1067-1080. PMID 37487215; PMCID PMC11921103; doi:10.7326/M23-0724. Validated: Europe PMC|Crossref, 2026-10-20.", "link": "https://doi.org/10.7326/M23-0724", "areas": ["F", "H"], "unverified": false}, {"key": "McCormick2024", "text": "McCormick N, Yokose C, Lu N, Wexler DJ, Aviña-Zubieta JA, De Vera MA, et al. Comparative effectiveness of sodium-glucose cotransporter-2 inhibitors for recurrent nephrolithiasis among patients with pre-existing nephrolithiasis or gout: target trial emulation studies. BMJ. 2024;387:e080035. PMID 39477370; PMCID PMC11524131; doi:10.1136/bmj-2024-080035. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/bmj-2024-080035", "areas": ["F"], "unverified": false}, {"key": "McDowell2022", "text": "McDowell K, Welsh P, Docherty KF, Morrow DA, Jhund PS, de Boer RA, et al. Dapagliflozin reduces uric acid concentration, an independent predictor of adverse outcomes in DAPA-HF. Eur J Heart Fail. 2022;24(6):1066-1076. PMID 35064721; PMCID PMC9540869; doi:10.1002/ejhf.2433. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/ejhf.2433", "areas": ["F"], "unverified": false}, {"key": "McGillicuddy2007", "text": "McGillicuddy DC, Shah KH, Friedberg RP, Nathanson LA, Edlow JA. How sensitive is the synovial fluid white blood cell count in diagnosing septic arthritis? Am J Emerg Med. 2007;25(7):749-752. PMID 17870475; doi:10.1016/j.ajem.2006.12.001. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.ajem.2006.12.001", "areas": ["B"], "unverified": false}, {"key": "McKenzie2021", "text": "McKenzie BJ, Wechalekar MD, Johnston RV, Schlesinger N, Buchbinder R. Colchicine for acute gout. Cochrane Database Syst Rev. 2021;8(8):CD006190. PMID 34438469; PMCID PMC8407279; doi:10.1002/14651858.CD006190.pub3. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/14651858.CD006190.pub3", "areas": ["D"], "unverified": false}, {"key": "Mikuls2019", "text": "Mikuls TR, Cheetham TC, Levy GD, Rashid N, Kerimian A, Low KJ, et al. Adherence and outcomes with urate-lowering therapy: a site-randomized trial. Am J Med. 2019;132(3):354-361. PMID 30503879; PMCID PMC6399023; doi:10.1016/j.amjmed.2018.11.011. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/j.amjmed.2018.11.011", "areas": ["E", "G"], "unverified": false}, {"key": "Misawa2013", "text": "Misawa T, Takahama M, Kozaki T, Lee H, Zou J, Saitoh T, Akira S. Microtubule-driven spatial arrangement of mitochondria promotes activation of the NLRP3 inflammasome. Nat Immunol. 2013;14(5):454–460. PMID 23502856. doi:10.1038/ni.2550. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1038/ni.2550", "areas": ["D"], "unverified": false}, {"key": "Moses2026", "text": "Moses A, Oude Voshaar MAH, van Geel EH, Schipper L, Peeters IR, Bos R, et al. A treat-to-target strategy versus symptom-driven management of gout in the Netherlands (GO TEST Overture): a multicentre, open-label, pragmatic, superiority, randomised controlled trial. Lancet Rheumatol. 2026;8(5):e336-e345. PMID 41865749; doi:10.1016/S2665-9913(26)00034-2. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/S2665-9913(26", "areas": ["H"], "unverified": false}, {"key": "MunozPlanillo2013", "text": "Muñoz-Planillo R, Kuffa P, Martínez-Colón G, Smith BL, Rajendiran TM, Núñez G. K⁺ efflux is the common trigger of NLRP3 inflammasome activation by bacterial toxins and particulate matter. Immunity. 2013;38(6):1142-1153. PMID 23809161; PMCID PMC3730833; doi:10.1016/j.immuni.2013.05.016. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1016/j.immuni.2013.05.016", "areas": ["C"], "unverified": false}, {"key": "NCT03994731", "text": "Horizon Therapeutics / Amgen. MIRROR RCT: Study of KRYSTEXXA (pegloticase) plus methotrexate in participants with uncontrolled gout. ClinicalTrials.gov NCT03994731; phase 4; completed; actual enrolment 152; primary endpoint serum urate responders (< 6 mg/dL) during month 6 (weeks 20–24); results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT04513366", "text": "Swedish Orphan Biovitrum. DISSOLVE I: A study of SEL-212 in patients with gout refractory to conventional therapy. ClinicalTrials.gov NCT04513366; phase 3; completed; actual enrolment 112; primary endpoint serum urate < 6 mg/dL for ≥ 80% of the time during month 6; results posted; US. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT04596540", "text": "Swedish Orphan Biovitrum. DISSOLVE II: A study of SEL-212 in patients with gout refractory to conventional therapy II. ClinicalTrials.gov NCT04596540; phase 3; completed; actual enrolment 153; primary endpoint serum urate < 6 mg/dL for ≥ 80% of the time during month 6; results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT04987294", "text": "Allena Pharmaceuticals. Phase IIa study of ALLN-346 (engineered urate oxidase) in subjects with hyperuricemia, gout and chronic kidney disease. ClinicalTrials.gov NCT04987294; phase 2; terminated (why stopped: \"Company Financing\"); actual enrolment 19; primary endpoint treatment-emergent adverse events to day 42. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT05007392", "text": "Eisai Co., Ltd. A study to evaluate efficacy of dotinurad and febuxostat for the treatment of participants with gout. ClinicalTrials.gov NCT05007392; phase 3; completed; actual enrolment 451; primary endpoint serum urate ≤ 6.0 mg/dL at week 24; results posted; China. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT05119686", "text": "Arthrosi Therapeutics. Phase 2b evaluation of efficacy and safety of AR882 in gout patients. ClinicalTrials.gov NCT05119686; phase 2; completed; actual enrolment 140; primary endpoint serum urate < 6 mg/dL after 6 weeks; no results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT05253833", "text": "Arthrosi Therapeutics. Phase 2 to assess efficacy and safety of AR882 alone or in combination with allopurinol in patients with tophaceous gout. ClinicalTrials.gov NCT05253833; phase 2; completed; actual enrolment 42; primary endpoint serum urate < 5 mg/dL at month 3; no results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT05586958", "text": "LG Chem. EURELIA 1: Tigulixostat, phase 3 study, placebo controlled in gout patients. ClinicalTrials.gov NCT05586958; phase 3; completed (primary completion 2024-11-04); actual enrolment 354; primary endpoint proportion with serum urate < 6.0 mg/dL sustained at months 4, 5 and 6; no results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT05586971", "text": "LG Chem. EURELIA 2: Tigulixostat, phase 3 study, allopurinol controlled in gout patients. ClinicalTrials.gov NCT05586971; phase 3; completed (primary completion 2025-05-06); actual enrolment 2202; primary endpoint proportion with serum urate < 6.0 mg/dL sustained at months 4, 5 and 6; no results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT05658575", "text": "Olatec Therapeutics. Study of dapansutrile tablets in subjects with an acute gout flare. ClinicalTrials.gov NCT05658575; phase 2/3; recruiting; estimated enrolment 300; primary endpoint joint pain vs placebo at 72 hours after the loading dose; US, France, Israel, Netherlands, Spain. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT05815901", "text": "JW Pharmaceutical. EPIC: A therapeutic confirmatory study of epaminurad versus febuxostat in gout patients. ClinicalTrials.gov NCT05815901; phase 3; completed; actual enrolment 612; primary endpoint serum urate < 6 mg/dL at the last 3 time points to week 24; Korea; no results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT05983445", "text": "Changchun GeneScience Pharmaceutical. Safety and efficacy of genakumab (firsekibart) in patients with frequent flares. ClinicalTrials.gov NCT05983445; phase 3; completed; actual enrolment 313; primary endpoints change in target-joint pain (VAS) at 72 hours and time to first new flare over 12 weeks; China; no results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT06229145", "text": "Amgen. Non-inferiority of pegloticase every 4 weeks with methotrexate vs every 2 weeks with methotrexate in uncontrolled refractory gout. ClinicalTrials.gov NCT06229145; phase 4; completed; actual enrolment 306; primary endpoint serum urate responders during month 6; results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT06439602", "text": "Arthrosi Therapeutics. Phase 3 evaluation of efficacy and safety of AR882 in gout patients (AR882-302). ClinicalTrials.gov NCT06439602; phase 3; completed (primary completion 2026-03-20); actual enrolment 818; primary endpoint serum urate < 6 mg/dL at month 6; no results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT06674109", "text": "Massachusetts General Hospital. SAVE-Care (Sodium Glucose Cotransporter-2 Inhibitors [SGLT2i] As Novel Gout Care) Trial. ClinicalTrials.gov NCT06674109; phase 4; recruiting; estimated enrolment 60; primary endpoint serum urate change from screening to 3 months. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT06846515", "text": "Arthrosi Therapeutics. Phase 3 evaluation of efficacy and safety of AR882 in gout patients (AR882-301). ClinicalTrials.gov NCT06846515; phase 3; completed (primary completion 2026-08-31); actual enrolment 866; primary endpoint serum urate < 6 mg/dL at month 6; no results posted. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT06956885", "text": "Assistance Publique - Hôpitaux de Paris. STING: Maintenance or withdrawal of urate lowering therapy according to ultrasound features in gout patients: a randomised controlled trial. ClinicalTrials.gov NCT06956885; phase 2; not yet recruiting; estimated enrolment 450; primary endpoint proportion with ≥ 1 flare at 2 years; no results. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT07089875", "text": "Crystalys Therapeutics. A study of dotinurad versus allopurinol in participants with gout. ClinicalTrials.gov NCT07089875; phase 3; recruiting; estimated enrolment 500; primary endpoint serum urate < 6.0 mg/dL at week 24; US, Poland, Spain. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT07089888", "text": "Crystalys Therapeutics. A study of dotinurad versus allopurinol in tophaceous gout. ClinicalTrials.gov NCT07089888; phase 3; recruiting; estimated enrolment 250; primary endpoint serum urate < 5.0 mg/dL at week 24. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT07280156", "text": "Protalix. RELEASE: PRX-115 infused intravenously at different dosing regimens, with and without methotrexate, versus placebo in adult gout patients. ClinicalTrials.gov NCT07280156; phase 2; recruiting; estimated enrolment 150; primary endpoint serum urate responders (< 6 mg/dL) during month 6. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT07388498", "text": "Amgen. Pegloticase subcutaneous vs intravenous, both with methotrexate, in uncontrolled gout. ClinicalTrials.gov NCT07388498; phase 3; recruiting; estimated enrolment 270; primary endpoint month-6 response (weeks 20–24). Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT07414394", "text": "Innovent Biologics. Tigulixostat (IBI128) vs febuxostat in gout. ClinicalTrials.gov NCT07414394; phase 3; active, not recruiting; actual enrolment 600; primary endpoint serum urate < 360 µmol/L at week 24; China. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "NCT07535034", "text": "Crystalys Therapeutics. A phase 2 trial of dotinurad in xanthine oxidase inhibitor intolerant/uricase failure gout participants. ClinicalTrials.gov NCT07535034; phase 2; recruiting; estimated enrolment 90; primary endpoint serum urate < 6.0 mg/dL at week 24. Validated: ClinicalTrials.gov API v2, 2026-10-20.", "link": "", "areas": ["H"], "unverified": false}, {"key": "Neogi2014", "text": "Neogi T, Chen C, Niu J, Chaisson C, Hunter DJ, Zhang Y. Alcohol quantity and type on risk of recurrent gout attacks: an internet-based case-crossover study. Am J Med. 2014;127(4):311-8. PMID 24440541; PMCID PMC3991555; doi:10.1016/j.amjmed.2013.12.019. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/j.amjmed.2013.12.019", "areas": ["A", "C", "G"], "unverified": false}, {"key": "Neogi2015", "text": "Neogi T, Jansen TL, Dalbeth N, Fransen J, Schumacher HR, Berendsen D, et al. 2015 Gout Classification Criteria: an American College of Rheumatology/European League Against Rheumatism collaborative initiative. Arthritis Rheumatol. 2015;67(10):2557-68. PMID 26352873; PMCID PMC4566153; doi:10.1002/art.39254. Validated: PubMed, Europe PMC (full text read), 2026-10-20.", "link": "https://doi.org/10.1002/art.39254", "areas": ["A", "B", "C", "D"], "unverified": false}, {"key": "Neogi2015ARD", "text": "Neogi T, Jansen TL, Dalbeth N, Fransen J, Schumacher HR, Berendsen D, et al. 2015 Gout classification criteria: an American College of Rheumatology/European League Against Rheumatism collaborative initiative. Ann Rheum Dis. 2015;74(10):1789-1798. PMID 26359487; PMCID PMC4602275; doi:10.1136/annrheumdis-2015-208237. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2015-208237", "areas": ["B"], "unverified": false}, {"key": "Newberry2017", "text": "Newberry SJ, FitzGerald JD, Motala A, Booth M, Maglione MA, Han D, et al. Diagnosis of gout: a systematic review in support of an American College of Physicians clinical practice guideline. Ann Intern Med. 2017;166(1):27-36. PMID 27802505; doi:10.7326/M16-0462. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.7326/M16-0462", "areas": ["B"], "unverified": false}, {"key": "NICE-NG219", "text": "National Institute for Health and Care Excellence. Gout: diagnosis and management. NICE guideline NG219. Published 9 June 2022. https://www.nice.org.uk/guidance/ng219. Validated: NICE website (recommendations 1.3 and 1.5), 2026-10-20.", "link": "https://www.nice.org.uk/guidance/ng219", "areas": ["D"], "unverified": false}, {"key": "Nidorf2020", "text": "Nidorf SM, Fiolet ATL, Mosterd A, Eikelboom JW, Schut A, Opstal TSJ, et al. Colchicine in patients with chronic coronary disease. N Engl J Med. 2020;383(19):1838-1847. PMID 32865380; doi:10.1056/NEJMoa2021372. Validated: Europe PMC|Crossref, 2026-10-20.", "link": "https://doi.org/10.1056/NEJMoa2021372", "areas": ["F"], "unverified": false}, {"key": "Nielsen2017", "text": "Nielsen SM, Bartels EM, Henriksen M, Wæhrens EE, Gudbergsen H, Bliddal H, et al. Weight loss for overweight and obese individuals with gout: a systematic review of longitudinal studies. Ann Rheum Dis. 2017;76(11):1870-1882. PMID 28866649; PMCID PMC5705854; doi:10.1136/annrheumdis-2017-211472. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2017-211472", "areas": ["A", "G"], "unverified": false}, {"key": "Nuki2006", "text": "Nuki G, Simkin PA. A concise history of gout and hyperuricemia and their treatment. Arthritis Res Ther. 2006;8(Suppl 1):S1. PMID 16820040; PMCID PMC3226106; doi:10.1186/ar1906. Validated: PubMed, Europe PMC (full text read), 2026-10-20.", "link": "https://doi.org/10.1186/ar1906", "areas": ["A"], "unverified": false}, {"key": "Oda2002", "text": "Oda M, Satta Y, Takenaka O, Takahata N. Loss of urate oxidase activity in hominoids and its evolutionary implications. Mol Biol Evol. 2002;19(5):640-653. PMID 11961098; doi:10.1093/oxfordjournals.molbev.a004123. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1093/oxfordjournals.molbev.a004123", "areas": ["C"], "unverified": false}, {"key": "ODell2022", "text": "O'Dell JR, Brophy MT, Pillinger MH, Neogi T, Palevsky PM, Wu H, et al. Comparative effectiveness of allopurinol and febuxostat in gout management. NEJM Evid. 2022;1(3):EVIDoa2100028. PMID 35434725; PMCID PMC9012032; doi:10.1056/evidoa2100028. Validated: PubMed, ClinicalTrials.gov (NCT02579096), 2026-10-20.", "link": "https://doi.org/10.1056/evidoa2100028", "areas": ["E"], "unverified": false}, {"key": "ODuffy1975", "text": "O'Duffy JD, Hunder GG, Kelly PJ. Decreasing prevalence of tophaceous gout. Mayo Clin Proc. 1975;50(5):227-8. PMID 1127988. Validated: PubMed, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/1127988/", "areas": ["A"], "unverified": false}, {"key": "Ogdie2015", "text": "Ogdie A, Taylor WJ, Weatherall M, Fransen J, Jansen TL, Neogi T, et al. Imaging modalities for the classification of gout: systematic literature review and meta-analysis. Ann Rheum Dis. 2015;74(10):1868-1874. PMID 24915980; PMCID PMC4869978; doi:10.1136/annrheumdis-2014-205431. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2014-205431", "areas": ["B"], "unverified": false}, {"key": "Ogdie2017", "text": "Ogdie A, Taylor WJ, Neogi T, Fransen J, Jansen TL, Schumacher HR, et al. Performance of ultrasound in the diagnosis of gout in a multicenter study: comparison with monosodium urate monohydrate crystal analysis as the gold standard. Arthritis Rheumatol. 2017;69(2):429-438. PMID 27748084; PMCID PMC5278908; doi:10.1002/art.39959. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.39959", "areas": ["B"], "unverified": false}, {"key": "Ohashi2023", "text": "Ohashi Y, Toyoda M, Saito N, Koizumi M, Kanai G, Komaba H, et al. Evaluation of ABCG2-mediated extra-renal urate excretion in hemodialysis patients. Sci Rep. 2023;13(1):93. PMID 36639673; PMCID PMC9839766; doi:10.1038/s41598-022-26519-x. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/s41598-022-26519-x", "areas": ["C"], "unverified": false}, {"key": "OrtizBravo1993", "text": "Ortiz-Bravo E, Sieck MS, Schumacher HR. Changes in the proteins coating monosodium urate crystals during active and subsiding inflammation. Immunogold studies of synovial fluid from patients with gout and of fluid obtained using the rat subcutaneous air pouch model. Arthritis Rheum. 1993;36(9):1274-1285. PMID 8216421; doi:10.1002/art.1780360912. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/art.1780360912", "areas": ["C"], "unverified": false}, {"key": "Palmer2013", "text": "Palmer TM, Nordestgaard BG, Benn M, Tybjærg-Hansen A, Davey Smith G, Lawlor DA, et al. Association of plasma uric acid with ischaemic heart disease and blood pressure: mendelian randomisation analysis of two large cohorts. BMJ. 2013;347:f4262. PMID 23869090; PMCID PMC3715134; doi:10.1136/bmj.f4262. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/bmj.f4262", "areas": ["F"], "unverified": false}, {"key": "Papanicolas2012", "text": "Papanicolas LE, Hakendorf P, Gordon DL. Concomitant septic arthritis in crystal monoarthritis. J Rheumatol. 2012;39(1):157-160. PMID 22133623; doi:10.3899/jrheum.110368. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.110368", "areas": ["B"], "unverified": false}, {"key": "Pascual1991", "text": "Pascual E. Persistence of monosodium urate crystals and low-grade inflammation in the synovial fluid of patients with untreated gout. Arthritis Rheum. 1991;34(2):141-145. PMID 1994910; doi:10.1002/art.1780340203. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.1780340203", "areas": ["B"], "unverified": false}, {"key": "Pascual1999", "text": "Pascual E, Batlle-Gualda E, Martínez A, Rosas J, Vela P. Synovial fluid analysis for diagnosis of intercritical gout. Ann Intern Med. 1999;131(10):756-759. PMID 10577299; doi:10.7326/0003-4819-131-10-199911160-00007. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.7326/0003-4819-131-10-199911160-00007", "areas": ["B"], "unverified": false}, {"key": "Pascual2007", "text": "Pascual E, Sivera F. Time required for disappearance of urate crystals from synovial fluid after successful hypouricaemic treatment relates to the duration of gout. Ann Rheum Dis. 2007;66(8):1056-1058. PMID 17223663; PMCID PMC1954685; doi:10.1136/ard.2006.060368. Validated: Europe PMC, Crossref, PMC full text, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2006.060368", "areas": ["C", "H"], "unverified": false}, {"key": "Peeters2023", "text": "Peeters IR, den Broeder AA, Taylor WJ, den Broeder N, Flendrie M, van Herwaarden N. Urate-lowering therapy following a treat-to-target continuation strategy compared to a treat-to-avoid-symptoms discontinuation strategy in gout patients in remission (GO TEST Finale): study protocol of a multicentre pragmatic randomized superiority trial. Trials. 2023;24(1):282. PMID 37072799; PMCID PMC10114395; doi:10.1186/s13063-023-07242-y. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1186/s13063-023-07242-y", "areas": ["E", "H"], "unverified": false}, {"key": "PeralGarrido2025", "text": "Peral-Garrido ML, Gómez-Sabater S, Caño R, Bermúdez-García A, Boix P, Lozano T, et al. Systemic inflammation in asymptomatic hyperuricaemia with sonographic crystal deposits, including a comparison with normouricaemia and gout. Rheumatology (Oxford). 2025;64(4):1807-1816. PMID 39348194; PMCID PMC11962879; doi:10.1093/rheumatology/keae533. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/keae533", "areas": ["C"], "unverified": false}, {"key": "PerezRuiz1998", "text": "Perez-Ruiz F, Alonso-Ruiz A, Calabozo M, Herrero-Beites A, García-Erauskin G, Ruiz-Lucea E. Efficacy of allopurinol and benzbromarone for the control of hyperuricaemia. A pathogenic approach to the treatment of primary chronic gout. Ann Rheum Dis. 1998;57(9):545-549. PMID 9849314; PMCID PMC1752740; doi:10.1136/ard.57.9.545. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/ard.57.9.545", "areas": ["E"], "unverified": false}, {"key": "PerezRuiz2002", "text": "Perez-Ruiz F, Calabozo M, Pijoan JI, Herrero-Beites AM, Ruibal A. Effect of urate-lowering therapy on the velocity of size reduction of tophi in chronic gout. Arthritis Rheum. 2002;47(4):356-360. PMID 12209479; doi:10.1002/art.10511. Validated: Europe PMC, Crossref, 2026-10-20 (abstract read; full text not accessible).", "link": "https://doi.org/10.1002/art.10511", "areas": ["C", "H"], "unverified": false}, {"key": "PerezRuiz2002Renal", "text": "Perez-Ruiz F, Calabozo M, Erauskin GG, Ruibal A, Herrero-Beites AM. Renal underexcretion of uric acid is present in patients with apparent high urinary uric acid output. Arthritis Rheum. 2002;47(6):610-613. PMID 12522834; doi:10.1002/art.10792. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/art.10792", "areas": ["C"], "unverified": false}, {"key": "PerezRuiz2006", "text": "Perez-Ruiz F, Atxotegi J, Hernando I, Calabozo M, Nolla JM. Using serum urate levels to determine the period free of gouty symptoms after withdrawal of long-term urate-lowering therapy: a prospective study. Arthritis Rheum. 2006;55(5):786-790. PMID 17013833; doi:10.1002/art.22232. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/art.22232", "areas": ["E", "H"], "unverified": false}, {"key": "Pierzynowska2020", "text": "Pierzynowska K, Deshpande A, Mosiichuk N, Terkeltaub R, Szczurek P, Salido E, et al. Oral Treatment With an Engineered Uricase, ALLN-346, Reduces Hyperuricemia, and Uricosuria in Urate Oxidase-Deficient Mice. Front Med (Lausanne). 2020;7:569215. PMID 33330529; PMCID PMC7732547; doi:10.3389/fmed.2020.569215. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3389/fmed.2020.569215", "areas": ["H"], "unverified": false}, {"key": "Pineda2011", "text": "Pineda C, Amezcua-Guerra LM, Solano C, Rodriguez-Henríquez P, Hernández-Díaz C, Vargas A, et al. Joint and tendon subclinical involvement suggestive of gouty arthritis in asymptomatic hyperuricemia: an ultrasound controlled study. Arthritis Res Ther. 2011;13(1):R4. PMID 21241475; PMCID PMC3241349; doi:10.1186/ar3223. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1186/ar3223", "areas": ["C"], "unverified": false}, {"key": "Pou2026", "text": "Pou MA, Reyes C, Martinez-Laguna D, Satorra P, Tebe C, Dalbeth N, et al. Management and long-term serum urate control in gout: a population-based primary care cohort study. Br J Gen Pract. 2026;76(769):e624-e633. PMID 42242878; PMCID PMC13531557; doi:10.3399/bjgp.2025.0788. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3399/bjgp.2025.0788", "areas": ["H"], "unverified": false}, {"key": "Qaseem2017", "text": "Qaseem A, Harris RP, Forciea MA; Clinical Guidelines Committee of the American College of Physicians. Management of acute and recurrent gout: a clinical practice guideline from the American College of Physicians. Ann Intern Med. 2017;166(1):58-68. PMID 27802508; doi:10.7326/M16-0570. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.7326/M16-0570", "areas": ["E", "G"], "unverified": false}, {"key": "Qaseem2017Dx", "text": "Qaseem A, McLean RM, Starkey M, Forciea MA, Clinical Guidelines Committee of the American College of Physicians. Diagnosis of acute gout: a clinical practice guideline from the American College of Physicians. Ann Intern Med. 2017;166(1):52-57. PMID 27802479; doi:10.7326/M16-0569. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.7326/M16-0569", "areas": ["B"], "unverified": false}, {"key": "RadakPerovic2013", "text": "Radak-Perović M, Zlatković-Svenda M. [The efficacy and tolerability of allopurinol dose escalation in patients with gout]. Srp Arh Celok Lek. 2013;141(5-6):333-336. PMID 23858803; doi:10.2298/sarh1306333r. Validated: PubMed (English abstract; article in Serbian), 2026-10-20.", "link": "https://doi.org/10.2298/sarh1306333r", "areas": ["E"], "unverified": false}, {"key": "Raff2016", "text": "Raff AB, Kroshinsky D. Cellulitis: a review. JAMA. 2016;316(3):325-337. PMID 27434444; doi:10.1001/jama.2016.8825. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1001/jama.2016.8825", "areas": ["B"], "unverified": false}, {"key": "Ragab2017", "text": "Ragab G, Elshahaly M, Bardin T. Gout: an old disease in new perspective - a review. J Adv Res. 2017;8(5):495-511. PMID 28748116; PMCID PMC5512152; doi:10.1016/j.jare.2017.04.008. Validated: PubMed, Europe PMC (full text), 2026-10-20.", "link": "https://doi.org/10.1016/j.jare.2017.04.008", "areas": ["B"], "unverified": false}, {"key": "Rai2017BMJ", "text": "Rai SK, Fung TT, Lu N, Keller SF, Curhan GC, Choi HK. The Dietary Approaches to Stop Hypertension (DASH) diet, Western diet, and risk of gout in men: prospective cohort study. BMJ. 2017;357:j1794. PMID 28487277; PMCID PMC5423545; doi:10.1136/bmj.j1794. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/bmj.j1794", "areas": ["A", "G"], "unverified": false}, {"key": "Rai2018", "text": "Rai SK, Choi HK, Choi SHJ, Townsend AF, Shojania K, De Vera MA. Key barriers to gout care: a systematic review and thematic synthesis of qualitative studies. Rheumatology (Oxford). 2018;57(7):1282-1292. PMID 29672772; PMCID PMC6014336; doi:10.1093/rheumatology/kex530. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kex530", "areas": ["G"], "unverified": false}, {"key": "Rainer2016", "text": "Rainer TH, Cheng CH, Janssens HJ, Man CY, Tam LS, Choi YF, et al. Oral prednisolone in the treatment of acute gout: a pragmatic, multicenter, double-blind, randomized trial. Ann Intern Med. 2016;164(7):464-471. PMID 26903390; doi:10.7326/M14-2070. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.7326/M14-2070", "areas": ["D"], "unverified": false}, {"key": "Ramasamy2013", "text": "Ramasamy SN, Korb-Wells CS, Kannangara DR, Smith MW, Wang N, Roberts DM, et al. Allopurinol hypersensitivity: a systematic review of all published cases, 1950-2012. Drug Saf. 2013;36(10):953-980. PMID 23873481; doi:10.1007/s40264-013-0084-0. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1007/s40264-013-0084-0", "areas": ["E"], "unverified": false}, {"key": "Reber2014", "text": "Reber LL, Marichal T, Sokolove J, Starkl P, Gaudenzio N, Iwakura Y, et al. Contribution of mast cell-derived interleukin-1β to uric acid crystal-induced acute arthritis in mice. Arthritis Rheumatol. 2014;66(10):2881-2891. PMID 24943488; PMCID PMC4443497; doi:10.1002/art.38747. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/art.38747", "areas": ["C"], "unverified": false}, {"key": "Rees2013", "text": "Rees F, Jenkins W, Doherty M. Patients with gout adhere to curative treatment if informed appropriately: proof-of-concept observational study. Ann Rheum Dis. 2013;72(6):826-830. PMID 22679303; doi:10.1136/annrheumdis-2012-201676. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2012-201676", "areas": ["E", "G"], "unverified": false}, {"key": "Reinders2009Allo", "text": "Reinders MK, Haagsma C, Jansen TL, van Roon EN, Delsing J, van de Laar MA, et al. A randomised controlled trial on the efficacy and tolerability with dose escalation of allopurinol 300-600 mg/day versus benzbromarone 100-200 mg/day in patients with gout. Ann Rheum Dis. 2009;68(6):892-897. PMID 18633127; doi:10.1136/ard.2008.091462. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2008.091462", "areas": ["E"], "unverified": false}, {"key": "Reinders2009Prob", "text": "Reinders MK, van Roon EN, Jansen TL, Delsing J, Griep EN, Hoekstra M, et al. Efficacy and tolerability of urate-lowering drugs in gout: a randomised controlled trial of benzbromarone versus probenecid after failure of allopurinol. Ann Rheum Dis. 2009;68(1):51-56. PMID 18250112; doi:10.1136/ard.2007.083071. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2007.083071", "areas": ["E"], "unverified": false}, {"key": "Richette2017", "text": "Richette P, Doherty M, Pascual E, Barskova V, Becce F, Castañeda-Sanabria J, et al. 2016 updated EULAR evidence-based recommendations for the management of gout. Ann Rheum Dis. 2017;76(1):29-42. PMID 27457514; doi:10.1136/annrheumdis-2016-209707. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2016-209707", "areas": ["A", "B", "C", "D", "E", "F", "G", "H"], "unverified": false}, {"key": "Richette2020", "text": "Richette P, Doherty M, Pascual E, Barskova V, Becce F, Castaneda J, et al. 2018 updated European League Against Rheumatism evidence-based recommendations for the diagnosis of gout. Ann Rheum Dis. 2020;79(1):31-38. PMID 31167758; doi:10.1136/annrheumdis-2019-215315. Validated: PubMed, Europe PMC (abstract), 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2019-215315", "areas": ["B"], "unverified": false}, {"key": "Ritschl2021", "text": "Ritschl V, Stamm TA, Aletaha D, Bijlsma JWJ, Böhm P, Dragoi RG, Dures E, Estévez-López F, Gossec L, Iagnocco A, Marques A, Moholt E, Nudel M, van den Bemt BJF, Viktil K, Voshaar M, de Thurah A, Carmona L. 2020 EULAR points to consider for the prevention, screening, assessment and management of non-adherence to treatment in people with rheumatic and musculoskeletal diseases for use in clinical practice. Ann Rheum Dis. 2021;80(6):707–713. PMID 33355152. doi:10.1136/annrheumdis-2020-218986. (Abstract read plus a secondary summary of the four-phase scheme; the wording of the four overarching principles and the nine individual points to consider was not read.) Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2020-218986", "areas": ["G"], "unverified": false}, {"key": "Roberge1993", "text": "Roberge CJ, Gaudry M, de Médicis R, Lussier A, Poubelle PE, Naccache PH. Crystal-induced neutrophil activation. IV. Specific inhibition of tyrosine phosphorylation by colchicine. J Clin Invest. 1993;92(4):1722-1729. PMID 7691884; PMCID PMC288332; doi:10.1172/JCI116759. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1172/JCI116759", "areas": ["D"], "unverified": false}, {"key": "Roberts2017", "text": "Roberts RL, Wallace MC, Phipps-Green AJ, Topless R, Drake JM, Tan P, et al. ABCG2 loss-of-function polymorphism predicts poor response to allopurinol in patients with gout. Pharmacogenomics J. 2017;17(2):201-203. PMID 26810134; doi:10.1038/tpj.2015.101. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1038/tpj.2015.101", "areas": ["E"], "unverified": false}, {"key": "Rochdi1994", "text": "Rochdi M, Sabouraud A, Girre C, Venet R, Scherrmann JM. Pharmacokinetics and absolute bioavailability of colchicine after i.v. and oral administration in healthy human volunteers and elderly subjects. Eur J Clin Pharmacol. 1994;46(4):351–354. PMID 7957521. doi:10.1007/BF00194404. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1007/BF00194404", "areas": ["D"], "unverified": false}, {"key": "Roddy2011", "text": "Roddy E. Revisiting the pathogenesis of podagra: why does gout target the foot? J Foot Ankle Res. 2011;4(1):13. PMID 21569453; PMCID PMC3117776; doi:10.1186/1757-1146-4-13. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1186/1757-1146-4-13", "areas": ["A"], "unverified": false}, {"key": "Roddy2020", "text": "Roddy E, Clarkson K, Blagojevic-Bucknall M, Mehta R, Oppong R, Avery A, et al. Open-label randomised pragmatic trial (CONTACT) comparing naproxen and low-dose colchicine for the treatment of gout flares in primary care. Ann Rheum Dis. 2020;79(2):276-284. PMID 31666237; PMCID PMC7025732; doi:10.1136/annrheumdis-2019-216154. ClinicalTrials.gov NCT01994226. Validated: Europe PMC, PMC full text, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2019-216154", "areas": ["D"], "unverified": false}, {"key": "Rosenthal2016", "text": "Rosenthal AK, Ryan LM. Calcium pyrophosphate deposition disease. N Engl J Med. 2016;374(26):2575-2584. PMID 27355536; PMCID PMC6240444; doi:10.1056/NEJMra1511117. Validated: PubMed, Europe PMC (no abstract; wording confirmed by full-text phrase search), 2026-10-20.", "link": "https://doi.org/10.1056/NEJMra1511117", "areas": ["B"], "unverified": false}, {"key": "Rothenbacher2011", "text": "Rothenbacher D, Primatesta P, Ferreira A, Cea-Soriano L, Rodríguez LA. Frequency and risk factors of gout flares in a large population-based cohort of incident gout. Rheumatology (Oxford). 2011;50(5):973-81. PMID 21228059; doi:10.1093/rheumatology/keq363. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/keq363", "areas": ["A"], "unverified": false}, {"key": "Roughley2015", "text": "Roughley MJ, Belcher J, Mallen CD, Roddy E. Gout and risk of chronic kidney disease and nephrolithiasis: meta-analysis of observational studies. Arthritis Res Ther. 2015;17:90. PMID 25889144; PMCID PMC4404569; doi:10.1186/s13075-015-0610-9. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/s13075-015-0610-9", "areas": ["F"], "unverified": false}, {"key": "Roughley2018", "text": "Roughley M, Sultan AA, Clarson L, Muller S, Whittle R, Belcher J, et al. Risk of chronic kidney disease in patients with gout and the impact of urate lowering therapy: a population-based cohort study. Arthritis Res Ther. 2018;20(1):243. PMID 30376864; PMCID PMC6235219; doi:10.1186/s13075-018-1746-1. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1186/s13075-018-1746-1", "areas": ["F"], "unverified": false}, {"key": "Saag2017", "text": "Saag KG, Fitz-Patrick D, Kopicko J, Fung M, Bhakta N, Adler S, et al. Lesinurad combined with allopurinol: a randomized, double-blind, placebo-controlled study in gout patients with an inadequate response to standard-of-care allopurinol (a US-based study). Arthritis Rheumatol. 2017;69(1):203-212. PMID 27564409; doi:10.1002/art.39840. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/art.39840", "areas": ["E", "H"], "unverified": false}, {"key": "Saag2021", "text": "Saag KG, Khanna PP, Keenan RT, Ohlman S, Osterling Koskinen L, Sparve E, et al. A randomized, phase II study evaluating the efficacy and safety of anakinra in the treatment of gout flares. Arthritis Rheumatol. 2021;73(8):1533-1542. PMID 33605029; doi:10.1002/art.41699. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.41699", "areas": ["D", "H"], "unverified": false}, {"key": "Saag2025", "text": "Saag KG, Dalbeth N, Hsu CY, Kuo CF, Nuki G, Perez-Ruiz F, et al. Evaluation of the efficacy and safety of a novel xanthine oxidase inhibitor, tigulixostat, in gout patients with hyperuricemia: Design of the EURELIA 1 and EURELIA 2 studies. Contemp Clin Trials. 2025;151:107843. PMID 39929260; doi:10.1016/j.cct.2025.107843. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.cct.2025.107843", "areas": ["H"], "unverified": false}, {"key": "Safiri2020", "text": "Safiri S, Kolahi AA, Cross M, Carson-Chahhoud K, Hoy D, Almasi-Hashiani A, et al. Prevalence, Incidence, and Years Lived With Disability Due to Gout and Its Attributable Risk Factors for 195 Countries and Territories 1990-2017: A Systematic Analysis of the Global Burden of Disease Study 2017. Arthritis Rheumatol. 2020;72(11):1916-1927. PMID 32755051; doi:10.1002/art.41404. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/art.41404", "areas": ["A"], "unverified": false}, {"key": "Saito2016", "text": "Saito Y, Stamp LK, Caudle KE, Hershfield MS, McDonagh EM, Callaghan JT, et al. Clinical Pharmacogenetics Implementation Consortium (CPIC) guidelines for human leukocyte antigen B (HLA-B) genotype and allopurinol dosing: 2015 update. Clin Pharmacol Ther. 2016;99(1):36-37. PMID 26094938; PMCID PMC4675696; doi:10.1002/cpt.161. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/cpt.161", "areas": ["E"], "unverified": false}, {"key": "Sautin2008", "text": "Sautin YY, Johnson RJ. Uric acid: the oxidant-antioxidant paradox. Nucleosides Nucleotides Nucleic Acids. 2008;27(6):608-619. PMID 18600514; PMCID PMC2895915; doi:10.1080/15257770802138558. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1080/15257770802138558", "areas": ["C"], "unverified": false}, {"key": "Scanu2012", "text": "Scanu A, Oliviero F, Ramonda R, Frallonardo P, Dayer JM, Punzi L. Cytokine levels in human synovial fluid during the different stages of acute gout: role of transforming growth factor β1 in the resolution phase. Ann Rheum Dis. 2012;71(4):621-624. PMID 22294622; doi:10.1136/annrheumdis-2011-200711. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2011-200711", "areas": ["C"], "unverified": false}, {"key": "Schauer2014", "text": "Schauer C, Janko C, Munoz LE, Zhao Y, Kienhöfer D, Frey B, et al. Aggregated neutrophil extracellular traps limit inflammation by degrading cytokines and chemokines. Nat Med. 2014;20(5):511-517. PMID 24784231; doi:10.1038/nm.3547. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/nm.3547", "areas": ["C"], "unverified": false}, {"key": "Scheepers2018Rheum", "text": "Scheepers LEJM, Burden AM, Arts ICW, Spaetgens B, Souverein P, de Vries F, et al. Medication adherence among gout patients initiated allopurinol: a retrospective cohort study in the Clinical Practice Research Datalink (CPRD). Rheumatology (Oxford). 2018;57(9):1641-1650. PMID 29893941; doi:10.1093/rheumatology/key155. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/key155", "areas": ["G"], "unverified": false}, {"key": "Scheepers2018SAR", "text": "Scheepers LEJM, van Onna M, Stehouwer CDA, Singh JA, Arts ICW, Boonen A. Medication adherence among patients with gout: A systematic review and meta-analysis. Semin Arthritis Rheum. 2018;47(5):689-702. PMID 29198878; doi:10.1016/j.semarthrit.2017.09.007. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.semarthrit.2017.09.007", "areas": ["G", "E"], "unverified": false, "aliases": ["Scheepers2018"]}, {"key": "Schlesinger2002", "text": "Schlesinger N, Detry MA, Holland BK, Baker DG, Beutler AM, Rull M, et al. Local ice therapy during bouts of acute gouty arthritis. J Rheumatol. 2002;29(2):331-334. PMID 11838852. Validated: Europe PMC, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/11838852/", "areas": ["D"], "unverified": false}, {"key": "Schlesinger2009", "text": "Schlesinger N, Norquist JM, Watson DJ. Serum urate during acute gout. J Rheumatol. 2009;36(6):1287-1289. PMID 19369457; doi:10.3899/jrheum.080938. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.080938", "areas": ["B", "G"], "unverified": false}, {"key": "Schlesinger2012", "text": "Schlesinger N, Alten RE, Bardin T, Schumacher HR, Bloch M, Gimona A, et al. Canakinumab for acute gouty arthritis in patients with limited treatment options: results from two randomised, multicentre, active-controlled, double-blind trials and their initial extensions. Ann Rheum Dis. 2012;71(11):1839-1848. PMID 22586173; doi:10.1136/annrheumdis-2011-200908. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2011-200908", "areas": ["D", "H"], "unverified": false}, {"key": "Schreiber2023", "text": "Schreiber K, Frishman M, Russell MD, Dey M, Flint J, Allen A, et al. British Society for Rheumatology guideline on prescribing drugs in pregnancy and breastfeeding: comorbidity medications used in rheumatology practice. Rheumatology (Oxford). 2023;62(4):e89-e104. PMID 36318967; PMCID PMC10070063; doi:10.1093/rheumatology/keac552. Full text read (PMC). Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/keac552", "areas": ["G"], "unverified": false}, {"key": "Schumacher2008", "text": "Schumacher HR Jr, Becker MA, Wortmann RL, Macdonald PA, Hunt B, Streit J, et al. Effects of febuxostat versus allopurinol and placebo in reducing serum urate in subjects with hyperuricemia and gout: a 28-week, phase III, randomized, double-blind, parallel-group trial. Arthritis Rheum. 2008;59(11):1540-1548. PMID 18975369; doi:10.1002/art.24209. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/art.24209", "areas": ["E"], "unverified": false}, {"key": "Schumacher2009", "text": "Schumacher HR, Taylor W, Edwards L, Grainger R, Schlesinger N, Dalbeth N, et al. Outcome domains for studies of acute and chronic gout. J Rheumatol. 2009;36(10):2342-2345. PMID 19820223; doi:10.3899/jrheum.090370. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.090370", "areas": ["G"], "unverified": false}, {"key": "Schumacher2012", "text": "Schumacher HR Jr, Evans RR, Saag KG, Clower J, Jennings W, Weinstein SP, et al. Rilonacept (interleukin-1 trap) for prevention of gout flares during initiation of uric acid-lowering therapy: results from a phase III randomized, double-blind, placebo-controlled, confirmatory efficacy study. Arthritis Care Res (Hoboken). 2012;64(10):1462-1470. PMID 22549879; doi:10.1002/acr.21690. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr.21690", "areas": ["H"], "unverified": false}, {"key": "Seegmiller1967", "text": "Seegmiller JE, Rosenbloom FM, Kelley WN. Enzyme defect associated with a sex-linked human neurological disorder and excessive purine synthesis. Science. 1967;155(3770):1682-4. PMID 6020292; doi:10.1126/science.155.3770.1682. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1126/science.155.3770.1682", "areas": ["A"], "unverified": false}, {"key": "Segal1999", "text": "Segal JB, Albert D. Diagnosis of crystal-induced arthritis by synovial fluid examination for crystals: lessons from an imperfect test. Arthritis Care Res. 1999;12(6):376-380. PMID 11081008; doi:10.1002/1529-0131(199912)12:6<376::aid-art5>3.0.co;2-5. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/1529-0131(199912", "areas": ["B"], "unverified": false}, {"key": "Serlachius2017", "text": "Serlachius A, Gamble G, House M, Vincent ZL, Knight J, Horne A, et al. Illness Perceptions and Mortality in Patients With Gout: A Prospective Observational Study. Arthritis Care Res (Hoboken). 2017;69(9):1444-1448. PMID 27813363; doi:10.1002/acr.23147. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr.23147", "areas": ["G"], "unverified": false}, {"key": "Shah2007", "text": "Shah K, Spear J, Nathanson LA, McCauley J, Edlow JA. Does the presence of crystal arthritis rule out septic arthritis? J Emerg Med. 2007;32(1):23-26. PMID 17239729; doi:10.1016/j.jemermed.2006.07.019. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.jemermed.2006.07.019", "areas": ["B"], "unverified": false}, {"key": "Shah2020", "text": "Shah B, Toprover M, Crittenden DB, Jeurling S, Pike VC, Krasnokutsky S, et al. Colchicine use and incident coronary artery disease in male patients with gout. Can J Cardiol. 2020;36(11):1722-1728. PMID 32454073; PMCID PMC8464652; doi:10.1016/j.cjca.2020.05.026. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.cjca.2020.05.026", "areas": ["F"], "unverified": false}, {"key": "Shang2022", "text": "Shang J, Zhou LP, Wang H, Liu B. Diagnostic performance of dual-energy CT versus ultrasonography in gout: a meta-analysis. Acad Radiol. 2022;29(1):56-68. PMID 32980243; doi:10.1016/j.acra.2020.08.030. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.acra.2020.08.030", "areas": ["B"], "unverified": false}, {"key": "Shi2015", "text": "Shi J, Zhao Y, Wang K, Shi X, Wang Y, Huang H, Zhuang Y, Cai T, Wang F, Shao F. Cleavage of GSDMD by inflammatory caspases determines pyroptotic cell death. Nature. 2015;526(7575):660-665. PMID: 26375003. DOI: 10.1038/nature15514. Validated: Europe PMC, 2026-10-20 (FMF key and text reused).", "link": "https://doi.org/10.1038/nature15514", "areas": ["C"], "unverified": false}, {"key": "Siegel1994", "text": "Siegel LB, Alloway JA, Nashel DJ. Comparison of adrenocorticotropic hormone and triamcinolone acetonide in the treatment of acute gouty arthritis. J Rheumatol. 1994;21(7):1325-1327. PMID 7966077. Validated: Europe PMC, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/7966077/", "areas": ["D"], "unverified": false}, {"key": "Simkin1977", "text": "Simkin PA. The pathogenesis of podagra. Ann Intern Med. 1977;86(2):230-233. PMID 319726; doi:10.7326/0003-4819-86-2-230. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.7326/0003-4819-86-2-230", "areas": ["C"], "unverified": false}, {"key": "Slobodnick2018", "text": "Slobodnick A, Shah B, Krasnokutsky S, Pillinger MH. Update on colchicine, 2017. Rheumatology (Oxford). 2018;57(suppl 1):i4–i11. PMID 29272515. PMCID PMC5850858. doi:10.1093/rheumatology/kex453. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kex453", "areas": ["D"], "unverified": false}, {"key": "SmPC-Allopurinol-UK", "text": "Allopurinol 100 mg Tablets, Summary of Product Characteristics (Tillomed Laboratories; PL 11311/0707; text revised 20/11/2024). electronic medicines compendium, https://www.medicines.org.uk/emc/product/100235/smpc. Validated: emc (UK SmPC), 2026-10-20.", "link": "https://www.medicines.org.uk/emc/product/100235/smpc", "areas": ["E"], "unverified": false}, {"key": "So2007", "text": "So A, De Smedt T, Revaz S, Tschopp J. A pilot study of IL-1 inhibition by anakinra in acute gout. Arthritis Res Ther. 2007;9(2):R28. PMID 17352828; PMCID PMC1906806; doi:10.1186/ar2143. Validated: Europe PMC, Crossref, PMC full text, 2026-10-20.", "link": "https://doi.org/10.1186/ar2143", "areas": ["C", "D"], "unverified": false}, {"key": "So2010", "text": "So A, Thorens B. Uric acid transport and disease. J Clin Invest. 2010;120(6):1791-1799. PMID 20516647; PMCID PMC2877959; doi:10.1172/JCI42344. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1172/JCI42344", "areas": ["C"], "unverified": false}, {"key": "So2010Cana", "text": "So A, De Meulemeester M, Pikhlak A, Yücel AE, Richard D, Murphy V, et al. Canakinumab for the treatment of acute flares in difficult-to-treat gouty arthritis: results of a multicenter, phase II, dose-ranging study. Arthritis Rheum. 2010;62(10):3064-3076. PMID 20533546; doi:10.1002/art.27600. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.27600", "areas": ["D"], "unverified": false}, {"key": "Solomon2016", "text": "Solomon DH, Liu CC, Kuo IH, Zak A, Kim SC. Effects of colchicine on risk of cardiovascular events and mortality among patients with gout: a cohort study using electronic medical records linked with Medicare claims. Ann Rheum Dis. 2016;75(9):1674-1679. PMID 26582823; PMCID PMC5049504; doi:10.1136/annrheumdis-2015-207984. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2015-207984", "areas": ["F"], "unverified": false}, {"key": "Solomon2018", "text": "Solomon DH, Glynn RJ, MacFadyen JG, Libby P, Thuren T, Everett BM, et al. Relationship of interleukin-1β blockade with incident gout and serum uric acid levels: exploratory analysis of a randomized controlled trial. Ann Intern Med. 2018;169(8):535-542. PMID 30242335; doi:10.7326/M18-1167. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.7326/M18-1167", "areas": ["F"], "unverified": false}, {"key": "Spencer2012", "text": "Spencer K, Carr A, Doherty M. Patient and provider barriers to effective management of gout in general practice: a qualitative study. Ann Rheum Dis. 2012;71(9):1490-1495. PMID 22440822; doi:10.1136/annrheumdis-2011-200801. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2011-200801", "areas": ["G"], "unverified": false}, {"key": "Stack2019", "text": "Stack AG, Johnson ME, Blak B, Klein A, Carpenter L, Morlock R, et al. Gout and the risk of advanced chronic kidney disease in the UK health system: a national cohort study. BMJ Open. 2019;9(8):e031550. PMID 31462487; PMCID PMC6720233; doi:10.1136/bmjopen-2019-031550. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/bmjopen-2019-031550", "areas": ["F"], "unverified": false}, {"key": "Stamp2011", "text": "Stamp LK, O'Donnell JL, Zhang M, James J, Frampton C, Barclay ML, et al. Using allopurinol above the dose based on creatinine clearance is effective and safe in patients with chronic gout, including those with renal impairment. Arthritis Rheum. 2011;63(2):412-421. PMID 21279998; doi:10.1002/art.30119. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/art.30119", "areas": ["E"], "unverified": false}, {"key": "Stamp2012", "text": "Stamp LK, Taylor WJ, Jones PB, Dockerty JL, Drake J, Frampton C, et al. Starting dose is a risk factor for allopurinol hypersensitivity syndrome: a proposed safe starting dose of allopurinol. Arthritis Rheum. 2012;64(8):2529-2536. PMID 22488501; doi:10.1002/art.34488. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/art.34488", "areas": ["E"], "unverified": false}, {"key": "Stamp2013", "text": "Stamp LK, O'Donnell JL, Frampton C, Drake JM, Zhang M, Chapman PT. Clinically insignificant effect of supplemental vitamin C on serum urate in patients with gout: a pilot randomized controlled trial. Arthritis Rheum. 2013;65(6):1636-1642. PMID 23681955; doi:10.1002/art.37925. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.37925", "areas": ["G"], "unverified": false}, {"key": "Stamp2017OLE", "text": "Stamp LK, Chapman PT, Barclay M, Horne A, Frampton C, Tan P, et al. Allopurinol dose escalation to achieve serum urate below 6 mg/dL: an open-label extension study. Ann Rheum Dis. 2017;76(12):2065-2070. PMID 28830881; doi:10.1136/annrheumdis-2017-211873. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2017-211873", "areas": ["E"], "unverified": false}, {"key": "Stamp2017RCT", "text": "Stamp LK, Chapman PT, Barclay ML, Horne A, Frampton C, Tan P, et al. A randomised controlled trial of the efficacy and safety of allopurinol dose escalation to achieve target serum urate in people with gout. Ann Rheum Dis. 2017;76(9):1522-1528. PMID 28314755; doi:10.1136/annrheumdis-2016-210872. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2016-210872", "areas": ["E"], "unverified": false}, {"key": "Steiger2014", "text": "Steiger S, Harper JL. Mechanisms of spontaneous resolution of acute gouty inflammation. Curr Rheumatol Rep. 2014;16(1):392. PMID 24343224; doi:10.1007/s11926-013-0392-5. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1007/s11926-013-0392-5", "areas": ["C"], "unverified": false}, {"key": "Stewart2019", "text": "Stewart S, Maxwell H, Dalbeth N. Prevalence and discrimination of OMERACT-defined elementary ultrasound lesions of gout in people with asymptomatic hyperuricaemia: a systematic review and meta-analysis. Semin Arthritis Rheum. 2019;49(1):62-73. PMID 30709689; doi:10.1016/j.semarthrit.2019.01.004. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.semarthrit.2019.01.004", "areas": ["B"], "unverified": false}, {"key": "Stewart2026", "text": "Stewart S, Anderson L, Ka'ai T, Rudolph K, Collis J, Kayes N, et al. Stigma, lost autonomy, reclaimed identity, and uncertainty around safe movement: a qualitative interview study of physical activity in gout. Rheumatol Int. 2026;46(8):224. PMID 42517962; PMCID PMC13415485; doi:10.1007/s00296-026-06265-3. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s00296-026-06265-3", "areas": ["G"], "unverified": false}, {"key": "Stewart2026US", "text": "Stewart S, Gamble GD, Taylor WJ, Harrison A, Merriman TR, Mihov B, et al. Musculoskeletal ultrasound findings in people with asymptomatic hyperuricemia: baseline analysis from the Transitions in Gout Research (TIGER) study using the OMERACT gout ultrasound semiquantitative scoring system. Ann Rheum Dis. 2026;85(8):1646-1655. PMID 42002468; doi:10.1016/j.ard.2026.03.021. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.ard.2026.03.021", "areas": ["H"], "unverified": false}, {"key": "Sun2025", "text": "Sun J, Wang Y, Cheng Y, Guo D, Hu J, Liu D, et al. Efficacy and Safety of Dotinurad Versus Febuxostat for the Treatment of Gout: A Randomized, Multicenter, Double-Blind, Phase 3 Trial in China. Arthritis Rheumatol. 2025;77(12):1757-1766. PMID 40417858; PMCID PMC12750125; doi:10.1002/art.43261. Validated: PubMed, Europe PMC (abstract and full text for the Japan 2020 approval statement), 2026-10-20.", "link": "https://doi.org/10.1002/art.43261", "areas": ["H"], "unverified": false}, {"key": "Sundy2011", "text": "Sundy JS, Baraf HS, Yood RA, Edwards NL, Gutierrez-Urena SR, Treadwell EL, et al. Efficacy and tolerability of pegloticase for the treatment of chronic gout in patients refractory to conventional treatment: two randomized controlled trials. JAMA. 2011;306(7):711-20. PMID 21846852; doi:10.1001/jama.2011.1169. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1001/jama.2011.1169", "areas": ["A", "E", "H"], "unverified": false}, {"key": "Swan2002", "text": "Swan A, Amer H, Dieppe P. The value of synovial fluid assays in the diagnosis of joint disease: a literature survey. Ann Rheum Dis. 2002;61(6):493-498. PMID 12006320; PMCID PMC1754135; doi:10.1136/ard.61.6.493. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/ard.61.6.493", "areas": ["B"], "unverified": false}, {"key": "Swanson2019", "text": "Swanson KV, Deng M, Ting JP. The NLRP3 inflammasome: molecular activation and regulation to therapeutics. Nature Reviews Immunology. 2019;19(8):477-489. PMID: 31036962. DOI: 10.1038/s41577-019-0165-0. Validated: Europe PMC, 2026-10-20 (FMF key and text reused).", "link": "https://doi.org/10.1038/s41577-019-0165-0", "areas": ["C"], "unverified": false}, {"key": "TabiAmponsah2024", "text": "Tabi-Amponsah AD, Doherty M, Sarmanova A, Zhang W, Stewart S, Taylor WJ, et al. Post-hoc analysis of two gout remission definitions in a two-year randomized controlled trial of nurse-led versus usual gout care. Semin Arthritis Rheum. 2024;69:152555. PMID 39326192; doi:10.1016/j.semarthrit.2024.152555. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.semarthrit.2024.152555", "areas": ["H"], "unverified": false}, {"key": "TabiAmponsah2025", "text": "Tabi-Amponsah AD, Stewart S, Gamble G, Stamp LK, Taylor WJ, Dalbeth N. Time Trends and Predictors of Gout Remission Over 6 Years. Arthritis Care Res (Hoboken). 2025;77(12):1418-1425. PMID 40528737; PMCID PMC12750121; doi:10.1002/acr.25584. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/acr.25584", "areas": ["H"], "unverified": false}, {"key": "TabiAmponsah2026", "text": "Tabi-Amponsah AD, Stewart S, Stamp LK, Taylor WJ, Terkeltaub R, Dalbeth N. The Gout, Hyperuricemia and Crystal-Associated Disease Network (G-CAN) definition of clinical remission in gout. Ann Rheum Dis. 2026;85(1):186-194. PMID 40537342; doi:10.1016/j.ard.2025.05.017. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.ard.2025.05.017", "areas": ["H"], "unverified": false}, {"key": "Talbott1951", "text": "Talbott JH, Bishop C, Norcross BM, Lockie LM. The clinical and metabolic effects of benemid in patients with gout. Trans Assoc Am Physicians. 1951;64:372-7. PMID 14884273. Validated: PubMed, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/14884273/", "areas": ["A"], "unverified": false}, {"key": "Tan2016", "text": "Tan PK, Farrar JE, Gaucher EA, Miner JN. Coevolution of URAT1 and Uricase during Primate Evolution: Implications for Serum Urate Homeostasis and Gout. Mol Biol Evol. 2016;33(9):2193-2200. PMID 27352852; PMCID PMC4989112; doi:10.1093/molbev/msw116. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1093/molbev/msw116", "areas": ["C"], "unverified": false}, {"key": "Taniguchi2020", "text": "Taniguchi T, Ashizawa N. [Pharmacological properties and clinical efficacy of dotinurad (URECE tablets), a novel hypouricemic agent]. Nihon Yakurigaku Zasshi. 2020;155(6):426-434. PMID 33132262; doi:10.1254/fpj.20047. Validated: PubMed (English abstract; article in Japanese), 2026-10-20.", "link": "https://doi.org/10.1254/fpj.20047", "areas": ["E"], "unverified": false}, {"key": "Tardif2019", "text": "Tardif JC, Kouz S, Waters DD, Bertrand OF, Diaz R, Maggioni AP, et al. Efficacy and safety of low-dose colchicine after myocardial infarction. N Engl J Med. 2019;381(26):2497-2505. PMID 31733140; doi:10.1056/NEJMoa1912388. Validated: Europe PMC|Crossref; ClinicalTrials.gov NCT02551094, 2026-10-20.", "link": "https://doi.org/10.1056/NEJMoa1912388", "areas": ["F"], "unverified": false}, {"key": "Tassaneeyakul2009", "text": "Tassaneeyakul W, Jantararoungtong T, Chen P, Lin PY, Tiamkao S, Khunarkornsiri U, et al. Strong association between HLA-B5801 and allopurinol-induced Stevens-Johnson syndrome and toxic epidermal necrolysis in a Thai population. Pharmacogenet Genomics. 2009;19(9):704-709. PMID 19696695; doi:10.1097/FPC.0b013e328330a3b8. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1097/FPC.0b013e328330a3b8", "areas": ["E"], "unverified": false}, {"key": "Taylor2006CASPAR", "text": "Taylor W, Gladman D, Helliwell P, Marchesoni A, Mease P, Mielants H; CASPAR Study Group. Classification criteria for psoriatic arthritis: development of new criteria from a large international study. Arthritis Rheum. 2006;54(8):2665-2673. PMID 16871531; doi:10.1002/art.21972. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.21972", "areas": ["B"], "unverified": false}, {"key": "Taylor2008", "text": "Taylor WJ, Colvine K, Gregory K, Collis J, McQueen FM, Dalbeth N. The Health Assessment Questionnaire Disability Index is a valid measure of physical function in gout. Clin Exp Rheumatol. 2008;26(4):620-626. PMID 18799093. (No DOI in the PubMed record.) Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/18799093/", "areas": ["G"], "unverified": false}, {"key": "Taylor2012", "text": "Taylor TH, Mecchella JN, Larson RJ, Kerin KD, Mackenzie TA. Initiation of allopurinol at first medical contact for acute attacks of gout: a randomized clinical trial. Am J Med. 2012;125(11):1126-1134.e7. PMID 23098865; doi:10.1016/j.amjmed.2012.05.025. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/j.amjmed.2012.05.025", "areas": ["E"], "unverified": false}, {"key": "Taylor2014", "text": "Taylor WJ, Redden D, Dalbeth N, Schumacher HR, Edwards NL, Simon LS, et al. Application of the OMERACT filter to measures of core outcome domains in recent clinical studies of acute gout. J Rheumatol. 2014;41(3):574-580. PMID 24429178; PMCID PMC4212978; doi:10.3899/jrheum.131245. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.131245", "areas": ["G"], "unverified": false}, {"key": "Taylor2015", "text": "Taylor WJ, Fransen J, Jansen TL, Dalbeth N, Schumacher HR, Brown M, et al. Study for Updated Gout Classification Criteria: Identification of Features to Classify Gout. Arthritis Care Res (Hoboken). 2015;67(9):1304-1315. PMID 25777045; PMCID PMC4573373; doi:10.1002/acr.22585. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/acr.22585", "areas": ["A", "B"], "unverified": false}, {"key": "Taylor2016", "text": "Taylor WJ, Fransen J, Dalbeth N, Neogi T, Schumacher HR, Brown M, et al. Performance of classification criteria for gout in early and established disease. Ann Rheum Dis. 2016;75(1):178-182. PMID 25351521; doi:10.1136/annrheumdis-2014-206364. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2014-206364", "areas": ["B"], "unverified": false}, {"key": "TeKaru2021", "text": "Te Karu L, Dalbeth N, Stamp LK. Inequities in people with gout: a focus on Māori (Indigenous People) of Aotearoa New Zealand. Ther Adv Musculoskelet Dis. 2021;13:1759720X211028007. PMID 34262623; PMCID PMC8252336; doi:10.1177/1759720X211028007. Validated: PubMed, Europe PMC (full text read), 2026-10-20.", "link": "https://doi.org/10.1177/1759720X211028007", "areas": ["A"], "unverified": false}, {"key": "Terkeltaub2010", "text": "Terkeltaub RA, Furst DE, Bennett K, Kook KA, Crockett RS, Davis MW. High versus low dosing of oral colchicine for early acute gout flare: twenty-four-hour outcome of the first multicenter, randomized, double-blind, placebo-controlled, parallel-group, dose-comparison colchicine study. Arthritis Rheum. 2010;62(4):1060-1068. PMID 20131255; doi:10.1002/art.27327. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.27327", "areas": ["D"], "unverified": false}, {"key": "Terkeltaub2011", "text": "Terkeltaub RA, Furst DE, Digiacinto JL, Kook KA, Davis MW. Novel evidence-based colchicine dose-reduction algorithm to predict and prevent colchicine toxicity in the presence of cytochrome P450 3A4/P-glycoprotein inhibitors. Arthritis Rheum. 2011;63(8):2226–2237. PMID 21480191. doi:10.1002/art.30389. Validated: Europe PMC (re-checked), 2026-10-20.", "link": "https://doi.org/10.1002/art.30389", "areas": ["D", "G"], "unverified": false}, {"key": "Terkeltaub2023", "text": "Terkeltaub R, Lee J, Min J, Shin S, Saag KG. Serum Urate-Lowering Efficacy and Safety of Tigulixostat in Gout Patients With Hyperuricemia: A Randomized, Double-Blind, Placebo-Controlled, Dose-Finding Trial. Arthritis Rheumatol. 2023;75(7):1275-1284. PMID 36649008; doi:10.1002/art.42447. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/art.42447", "areas": ["H"], "unverified": false}, {"key": "Terslev2015", "text": "Terslev L, Gutierrez M, Schmidt WA, Keen HI, Filippucci E, Kane D, et al. Ultrasound as an outcome measure in gout. A validation process by the OMERACT Ultrasound Working Group. J Rheumatol. 2015;42(11):2177-2181. PMID 26329333; doi:10.3899/jrheum.141294. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.141294", "areas": ["B"], "unverified": false}, {"key": "Thiele2007", "text": "Thiele RG, Schlesinger N. Diagnosis of gout by ultrasound. Rheumatology (Oxford). 2007;46(7):1116-1121. PMID 17468505; doi:10.1093/rheumatology/kem058. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kem058", "areas": ["B"], "unverified": false}, {"key": "Thiele2010", "text": "Thiele RG, Schlesinger N. Ultrasonography shows disappearance of monosodium urate crystal deposition on hyaline cartilage after sustained normouricemia is achieved. Rheumatol Int. 2010;30(4):495-503. PMID 19543895; doi:10.1007/s00296-009-1002-8. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s00296-009-1002-8", "areas": ["B"], "unverified": false}, {"key": "Tin2019", "text": "Tin A, Marten J, Halperin Kuhns VL, Li Y, Wuttke M, Kirsten H, et al. Target genes, variants, tissues and transcriptional pathways influencing human serum urate levels. Nat Genet. 2019;51(10):1459-1474. PMID 31578528; PMCID PMC6858555; doi:10.1038/s41588-019-0504-x. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/s41588-019-0504-x", "areas": ["C"], "unverified": false}, {"key": "Torres2007", "text": "Torres RJ, Puig JG. Hypoxanthine-guanine phosophoribosyltransferase (HPRT) deficiency: Lesch-Nyhan syndrome. Orphanet J Rare Dis. 2007;2:48. PMID 18067674; PMCID PMC2234399; doi:10.1186/1750-1172-2-48. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1186/1750-1172-2-48", "areas": ["C"], "unverified": false}, {"key": "Tvedten2025", "text": "Tvedten OG, Bossina S, Koobasi M, Jaure A, Liang B, Tang C, et al. Patient Perspectives and Experiences With Medication for Gout: A Thematic Synthesis of Qualitative Studies. J Rheumatol. 2025;52(9):873-882. PMID 40233997; doi:10.3899/jrheum.2024-1021. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.2024-1021", "areas": ["G"], "unverified": false}, {"key": "Uhlig2025", "text": "Uhlig T, Stjärne J, Karoliussen LF, Sexton J, Eskild T, Provan SA, et al. Remission in gout is possible: 5-year follow-up in the NOR-Gout study. Semin Arthritis Rheum. 2025;72:152698. PMID 40056480; doi:10.1016/j.semarthrit.2025.152698. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.semarthrit.2025.152698", "areas": ["H"], "unverified": false}, {"key": "Urano2002", "text": "Urano W, Yamanaka H, Tsutani H, Nakajima H, Matsuda Y, Taniguchi A, et al. The inflammatory process in the mechanism of decreased serum uric acid concentrations during acute gouty arthritis. J Rheumatol. 2002;29(9):1950-1953. PMID 12233891 (no DOI registered). Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://pubmed.ncbi.nlm.nih.gov/12233891/", "areas": ["B", "C"], "unverified": false}, {"key": "vanDurme2014", "text": "van Durme CM, Wechalekar MD, Buchbinder R, Schlesinger N, van der Heijde D, Landewé RB. Non-steroidal anti-inflammatory drugs for acute gout. Cochrane Database Syst Rev. 2014;(9):CD010120. PMID 25225849; doi:10.1002/14651858.CD010120.pub2. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/14651858.CD010120.pub2", "areas": ["D"], "unverified": false}, {"key": "vanDurme2021", "text": "van Durme CM, Wechalekar MD, Landewé RB, Pardo Pardo J, Cyril S, van der Heijde D, et al. Non-steroidal anti-inflammatory drugs for acute gout. Cochrane Database Syst Rev. 2021;12(12):CD010120. PMID 34882311; PMCID PMC8656463; doi:10.1002/14651858.CD010120.pub3. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/14651858.CD010120.pub3", "areas": ["D"], "unverified": false}, {"key": "vanEchteld2014", "text": "van Echteld I, Wechalekar MD, Schlesinger N, Buchbinder R, Aletaha D. Colchicine for acute gout. Cochrane Database Syst Rev. 2014;(8):CD006190. PMID 25123076; doi:10.1002/14651858.CD006190.pub2. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1002/14651858.CD006190.pub2", "areas": ["D"], "unverified": false}, {"key": "VargasSantos2018", "text": "Vargas-Santos AB, Peloquin CE, Zhang Y, Neogi T. Association of chronic kidney disease with allopurinol use in gout treatment. JAMA Intern Med. 2018;178(11):1526-1533. PMID 30304329; PMCID PMC6248199; doi:10.1001/jamainternmed.2018.4463. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1001/jamainternmed.2018.4463", "areas": ["F"], "unverified": false}, {"key": "Vitart2008", "text": "Vitart V, Rudan I, Hayward C, Gray NK, Floyd J, Palmer CN, et al. SLC2A9 is a newly identified urate transporter influencing serum urate concentration, urate excretion and gout. Nat Genet. 2008;40(4):437-442. PMID 18327257; doi:10.1038/ng.106. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1038/ng.106", "areas": ["C"], "unverified": false}, {"key": "Vitriol2025", "text": "Vitriol JA, Hunger JM, Magerman A, LaMoreaux B, Edwards L. Clinical bias and gout: How stigma impacts patient care. Soc Sci Med. 2025;384:118466. PMID 40907293; doi:10.1016/j.socscimed.2025.118466. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/j.socscimed.2025.118466", "areas": ["A"], "unverified": false}, {"key": "Waldman2018", "text": "Waldman B, Ansquer JC, Sullivan DR, Jenkins AJ, McGill N, Buizen L, et al. Effect of fenofibrate on uric acid and gout in type 2 diabetes: a post-hoc analysis of the randomised, controlled FIELD study. Lancet Diabetes Endocrinol. 2018;6(4):310-318. PMID 29496472; doi:10.1016/S2213-8587(18)30029-9. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/S2213-8587(18", "areas": ["G"], "unverified": false}, {"key": "Wallace2018", "text": "Wallace MC, Roberts RL, Nanavati P, Miner JN, Dalbeth N, Topless R, et al. Association between ABCG2 rs2231142 and poor response to allopurinol: replication and meta-analysis. Rheumatology (Oxford). 2018;57(4):656-660. PMID 29342288; doi:10.1093/rheumatology/kex467. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kex467", "areas": ["E"], "unverified": false}, {"key": "Wang2015", "text": "Wang W, Bhole VM, Krishnan E. Chronic kidney disease as a risk factor for incident gout among men and women: retrospective cohort study using data from the Framingham Heart Study. BMJ Open. 2015;5(4):e006843. PMID 25869687; PMCID PMC4401834; doi:10.1136/bmjopen-2014-006843. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/bmjopen-2014-006843", "areas": ["A"], "unverified": false}, {"key": "Watanabe2002", "text": "Watanabe S, Kang DH, Feng L, Nakagawa T, Kanellis J, Lan H, et al. Uric acid, hominoid evolution, and the pathogenesis of salt-sensitivity. Hypertension. 2002;40(3):355-360. PMID 12215479; doi:10.1161/01.hyp.0000028589.66335.aa. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1161/01.hyp.0000028589.66335.aa", "areas": ["C"], "unverified": false}, {"key": "Watson2024", "text": "Watson L, Protheroe J, Mallen CD, Muller S, Roddy E. Health literacy and gout characteristics in a primary care cohort. Rheumatol Adv Pract. 2024;8(2):rkae034. PMID 38584855; PMCID PMC10997429; doi:10.1093/rap/rkae034. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rap/rkae034", "areas": ["G"], "unverified": false}, {"key": "Wen2015", "text": "Wen CC, Yee SW, Liang X, Hoffmann TJ, Kvale MN, Banda Y, et al. Genome-wide association study identifies ABCG2 (BCRP) as an allopurinol transporter and a determinant of drug response. Clin Pharmacol Ther. 2015;97(5):518-525. PMID 25676789; PMCID PMC4479153; doi:10.1002/cpt.89. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/cpt.89", "areas": ["E"], "unverified": false}, {"key": "Weng2017", "text": "Weng QY, Raff AB, Cohen JM, Gunasekera N, Okhovat JP, Vedak P, et al. Costs and consequences associated with misdiagnosed lower extremity cellulitis. JAMA Dermatol. 2017;153(2):141-146. PMID 27806170; doi:10.1001/jamadermatol.2016.3816. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1001/jamadermatol.2016.3816", "areas": ["B"], "unverified": false}, {"key": "White2016", "text": "White J, Sofat R, Hemani G, Shah T, Engmann J, Dale C, et al. Plasma urate concentration and risk of coronary heart disease: a Mendelian randomisation analysis. Lancet Diabetes Endocrinol. 2016;4(4):327-336. PMID 26781229; PMCID PMC4805857; doi:10.1016/S2213-8587(15)00386-1. Validated: Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/S2213-8587(15", "areas": ["F"], "unverified": false}, {"key": "White2018", "text": "White WB, Saag KG, Becker MA, Borer JS, Gorelick PB, Whelton A, et al. Cardiovascular safety of febuxostat or allopurinol in patients with gout. N Engl J Med. 2018;378(13):1200-1210. PMID 29527974; doi:10.1056/NEJMoa1710895. Validated: PubMed, ClinicalTrials.gov (NCT01101035, CARES), 2026-10-20.", "link": "https://doi.org/10.1056/NEJMoa1710895", "areas": ["E", "F", "H"], "unverified": false}, {"key": "Woodward2009", "text": "Woodward OM, Köttgen A, Coresh J, Boerwinkle E, Guggino WB, Köttgen M. Identification of a urate transporter, ABCG2, with a common functional polymorphism causing gout. Proc Natl Acad Sci U S A. 2009;106(25):10338-10342. PMID 19506252; doi:10.1073/pnas.0901249106. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1073/pnas.0901249106", "areas": ["C"], "unverified": false}, {"key": "Wortmann2010", "text": "Wortmann RL, Macdonald PA, Hunt B, Jackson RL. Effect of prophylaxis on gout flares after the initiation of urate-lowering therapy: analysis of data from three phase III trials. Clin Ther. 2010;32(14):2386-2397. PMID 21353107; doi:10.1016/j.clinthera.2011.01.008. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1016/j.clinthera.2011.01.008", "areas": ["E"], "unverified": false}, {"key": "Wu1992", "text": "Wu XW, Muzny DM, Lee CC, Caskey CT. Two independent mutational events in the loss of urate oxidase during hominoid evolution. J Mol Evol. 1992;34(1):78-84. PMID 1556746; doi:10.1007/BF00163854. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1007/BF00163854", "areas": ["C"], "unverified": false}, {"key": "Wurzner2001", "text": "Würzner G, Gerster JC, Chiolero A, Maillard M, Fallab-Stubi CL, Brunner HR, et al. Comparative effects of losartan and irbesartan on serum uric acid in hypertensive patients with hyperuricaemia and gout. J Hypertens. 2001;19(10):1855-1860. PMID 11593107; doi:10.1097/00004872-200110000-00021. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1097/00004872-200110000-00021", "areas": ["E", "F"], "unverified": false}, {"key": "Yagnik2000", "text": "Yagnik DR, Hillyer P, Marshall D, Smythe CD, Krausz T, Haskard DO, et al. Noninflammatory phagocytosis of monosodium urate monohydrate crystals by mouse macrophages. Implications for the control of joint inflammation in gout. Arthritis Rheum. 2000;43(8):1779-1789. PMID 10943868; doi:10.1002/1529-0131(200008)43:8<1779::AID-ANR14>3.0.CO;2-2. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/1529-0131(200008", "areas": ["C"], "unverified": false}, {"key": "Yagnik2004", "text": "Yagnik DR, Evans BJ, Florey O, Mason JC, Landis RC, Haskard DO. Macrophage release of transforming growth factor beta1 during resolution of monosodium urate monohydrate crystal-induced inflammation. Arthritis Rheum. 2004;50(7):2273-2280. PMID 15248227; doi:10.1002/art.20317. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1002/art.20317", "areas": ["C"], "unverified": false}, {"key": "Yamanaka2011", "text": "Yamanaka H; Japanese Society of Gout and Nucleic Acid Metabolism. Japanese guideline for the management of hyperuricemia and gout: second edition. Nucleosides Nucleotides Nucleic Acids. 2011;30(12):1018-1029. PMID 22132951; doi:10.1080/15257770.2011.596496. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1080/15257770.2011.596496", "areas": ["E"], "unverified": false}, {"key": "Yamanaka2018", "text": "Yamanaka H, Tamaki S, Ide Y, Kim H, Inoue K, Sugimoto M, et al. Stepwise dose increase of febuxostat is comparable with colchicine prophylaxis for the prevention of gout flares during the initial phase of urate-lowering therapy: results from FORTUNE-1, a prospective, multicentre randomised study. Ann Rheum Dis. 2018;77(2):270-276. PMID 29102957; PMCID PMC5867413; doi:10.1136/annrheumdis-2017-211574. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2017-211574", "areas": ["E"], "unverified": false}, {"key": "Yip2023", "text": "Yip RM, Cheung TT, So H, Chan JP, Ho CT, Tsang HH, et al. The Hong Kong Society of Rheumatology consensus recommendations for the management of gout. Clin Rheumatol. 2023;42(8):2013-2027. PMID 37014501; PMCID PMC10345000; doi:10.1007/s10067-023-06578-9. Validated: Europe PMC, PMC full text, 2026-10-20.", "link": "https://doi.org/10.1007/s10067-023-06578-9", "areas": ["D", "F"], "unverified": false}, {"key": "Yokose2020", "text": "Yokose C, McCormick N, Rai SK, Lu N, Curhan G, Schwarzfuchs D, et al. Effects of Low-Fat, Mediterranean, or Low-Carbohydrate Weight Loss Diets on Serum Urate and Cardiometabolic Risk Factors: A Secondary Analysis of the Dietary Intervention Randomized Controlled Trial (DIRECT). Diabetes Care. 2020;43(11):2812-2820. PMID 33082244; PMCID PMC7576420; doi:10.2337/dc20-1002. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.2337/dc20-1002", "areas": ["G"], "unverified": false}, {"key": "Yu2003", "text": "Yu KH, Luo SF, Liou LB, Wu YJ, Tsai WP, Chen JY, et al. Concomitant septic and gouty arthritis: an analysis of 30 cases. Rheumatology (Oxford). 2003;42(9):1062-1066. PMID 12730521; doi:10.1093/rheumatology/keg297. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/keg297", "areas": ["B", "G"], "unverified": false}, {"key": "ZandmanGoddard2013", "text": "Zandman-Goddard G, Amital H, Shamrayevsky N, Raz R, Shalev V, Chodick G. Rates of adherence and persistence with allopurinol therapy among gout patients in Israel. Rheumatology (Oxford). 2013;52(6):1126-31. PMID 23392592; doi:10.1093/rheumatology/kes431. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1093/rheumatology/kes431", "areas": ["A"], "unverified": false}, {"key": "Zangi2015", "text": "Zangi HA, Ndosi M, Adams J, Andersen L, Bode C, Boström C, van Eijk-Hustings Y, Gossec L, Korandová J, Mendes G, Niedermann K, Primdahl J, Stoffer M, Voshaar M, van Tubergen A; EULAR. EULAR recommendations for patient education for people with inflammatory arthritis. Ann Rheum Dis. 2015;74(6):954–962. PMID 25735643. doi:10.1136/annrheumdis-2014-206807. Table 1 (two overarching principles, eight recommendations with evidence categories, strengths and agreement scores) read from the accepted manuscript at White Rose eprints: https://eprints.whiterose.ac.uk/id/eprint/83967/ Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://eprints.whiterose.ac.uk/id/eprint/83967/", "areas": ["G"], "unverified": false}, {"key": "Zhang2006Dx", "text": "Zhang W, Doherty M, Pascual E, Bardin T, Barskova V, Conaghan P, et al. EULAR evidence based recommendations for gout. Part I: Diagnosis. Report of a task force of the Standing Committee for International Clinical Studies Including Therapeutics (ESCISIT). Ann Rheum Dis. 2006;65(10):1301-1311. PMID 16707533; PMCID PMC1798330; doi:10.1136/ard.2006.055251. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2006.055251", "areas": ["B"], "unverified": false}, {"key": "Zhang2010OA", "text": "Zhang W, Doherty M, Peat G, Bierma-Zeinstra MA, Arden NK, Bresnihan B, et al. EULAR evidence-based recommendations for the diagnosis of knee osteoarthritis. Ann Rheum Dis. 2010;69(3):483-489. PMID 19762361; doi:10.1136/ard.2009.113100. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2009.113100", "areas": ["B"], "unverified": false}, {"key": "Zhang2011CPPD", "text": "Zhang W, Doherty M, Bardin T, Barskova V, Guerne PA, Jansen TL, et al. European League Against Rheumatism recommendations for calcium pyrophosphate deposition. Part I: terminology and diagnosis. Ann Rheum Dis. 2011;70(4):563-570. PMID 21216817; doi:10.1136/ard.2010.139105. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/ard.2010.139105", "areas": ["B"], "unverified": false}, {"key": "Zhang2012", "text": "Zhang Y, Chen C, Choi H, Chaisson C, Hunter D, Niu J, et al. Purine-rich foods intake and recurrent gout attacks. Ann Rheum Dis. 2012;71(9):1448-1453. PMID 22648933; PMCID PMC3889483; doi:10.1136/annrheumdis-2011-201215. Validated: Europe PMC, Crossref, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2011-201215", "areas": ["C", "A", "G"], "unverified": false, "aliases": ["Zhang2012Purine"]}, {"key": "Zhang2012Cherry", "text": "Zhang Y, Neogi T, Chen C, Chaisson C, Hunter DJ, Choi HK. Cherry consumption and decreased risk of recurrent gout attacks. Arthritis Rheum. 2012;64(12):4004-11. PMID 23023818; PMCID PMC3510330; doi:10.1002/art.34677. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1002/art.34677", "areas": ["A", "G"], "unverified": false}, {"key": "Zhang2014", "text": "Zhang Y, Neogi T, Chen C, Chaisson C, Hunter DJ, Choi H. Low-dose aspirin use and recurrent gout attacks. Ann Rheum Dis. 2014;73(2):385-390. PMID 23345599; PMCID PMC3902644; doi:10.1136/annrheumdis-2012-202589. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1136/annrheumdis-2012-202589", "areas": ["G", "A"], "unverified": false, "aliases": ["Zhang2014Aspirin"]}, {"key": "Zhang2016SciRep", "text": "Zhang Y, Lee SY, Zhang Y, Furst D, Fitzgerald J, Ozcan A. Wide-field imaging of birefringent synovial fluid crystals using lens-free polarized microscopy for gout diagnosis. Sci Rep. 2016;6:28793. PMID 27356625; PMCID PMC4928089; doi:10.1038/srep28793. Validated: PubMed, Europe PMC (full text), 2026-10-20.", "link": "https://doi.org/10.1038/srep28793", "areas": ["B"], "unverified": false}, {"key": "Zhang2018US", "text": "Zhang Q, Gao F, Sun W, Ma J, Cheng L, Li Z. The diagnostic performance of musculoskeletal ultrasound in gout: a systematic review and meta-analysis. PLoS One. 2018;13(7):e0199672. PMID 29979706; PMCID PMC6034830; doi:10.1371/journal.pone.0199672. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1371/journal.pone.0199672", "areas": ["B"], "unverified": false}, {"key": "Zhao2018", "text": "Zhao Y, Xu L, Tian D, Xia P, Zheng H, Wang L, et al. Effects of sodium-glucose co-transporter 2 (SGLT2) inhibitors on serum uric acid level: a meta-analysis of randomized controlled trials. Diabetes Obes Metab. 2018;20(2):458-462. PMID 28846182; doi:10.1111/dom.13101. Validated: PubMed, 2026-10-20.", "link": "https://doi.org/10.1111/dom.13101", "areas": ["E", "F", "G"], "unverified": false}, {"key": "Zhu2012", "text": "Zhu Y, Pandya BJ, Choi HK. Comorbidities of gout and hyperuricemia in the US general population: NHANES 2007-2008. Am J Med. 2012;125(7):679-687.e1. PMID 22626509; doi:10.1016/j.amjmed.2011.09.033. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1016/j.amjmed.2011.09.033", "areas": ["B", "F"], "unverified": false}, {"key": "Zhu2026", "text": "Zhu Z, Xue Y, Chu T, Hu J, Gou W, Zhang N, et al. Efficacy and Safety of Firsekibart in Patients with Acute Gout Unsuitable for Standard Therapy: 48-Week Results from an Open-Label Extension of a Randomized Phase 3 Trial. Adv Ther. 2026;43(8):3432-3450. PMID 42154367; PMCID PMC13415669; doi:10.1007/s12325-026-03611-6. Validated: PubMed, Europe PMC, 2026-10-20.", "link": "https://doi.org/10.1007/s12325-026-03611-6", "areas": ["H"], "unverified": false}, {"key": "Zleik2018", "text": "Zleik N, Elfishawi MM, Kvrgic Z, Michet CJ Jr, Crowson CS, Matteson EL, et al. Hospitalization Increases the Risk of Acute Arthritic Flares in Gout: A Population-based Study over 2 Decades. J Rheumatol. 2018;45(8):1188-1191. PMID 29961683; PMCID PMC6072557; doi:10.3899/jrheum.171320. Validated: PubMed|Europe PMC, 2026-10-20.", "link": "https://doi.org/10.3899/jrheum.171320", "areas": ["G"], "unverified": false}];

/* =============== home: two years, before and after urate-lowering therapy =============== */
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');
  /* schematic: flares on fixed days; urate steps down after allopurinol starts at month 12 */
  const FL=[{d:40,h:.9},{d:150,h:.75},{d:250,h:1},{d:330,h:.8},{d:420,h:.55},{d:505,h:.4}];
  const SU=d=>{const m=d/30.4;if(m<12)return 8.9+.35*Math.sin(d/23);const k=Math.min(5,Math.floor((m-12)/1.2));return Math.max(5.1,8.9-k*.78-.2*ramp(m,12+k*1.2,12.6+k*1.2))};
  function draw(t){const N=vb(svg,'520 300','400 340');
    const D=t*730,x0=N?34:44,x1=N?392:504,X=d=>lerp(x0,x1,d/730);let s='';
    const fy0=N?44:40,fy1=N?130:118,uy0=N?168:150,uy1=N?296:262,U=v=>lerp(uy1,uy0,(v-3)/7);
    s+=`<rect x="${f1(X(365))}" y="20" width="${f1(x1-X(365))}" height="${f1(uy1-14)}" rx="8" style="fill:var(--sea-soft);opacity:.55"/>`;
    s+=`<text x="${f1(X(365)+8)}" y="34" class="t-xs" style="fill:var(--sea)">allopurinol, titrated →</text><text x="${x0}" y="34" class="t-xs" style="fill:var(--terra)">no urate-lowering</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${fy1}" y2="${fy1}" class="axis"/>`;
    FL.forEach(e=>{if(e.d>D)return;const x=X(e.d),h=(fy1-fy0)*e.h,age=clamp((D-e.d)/25);s+=`<path d="M${f1(x-6)} ${fy1} L${f1(x)} ${f1(fy1-h)} L${f1(x+6)} ${fy1}z" style="fill:var(--terra);opacity:${f1(1-.45*age)}"/>`});
    s+=`<text x="${x0}" y="${fy1+14}" class="t-xs" style="fill:var(--terra)">FLARES</text>`;
    /* urate panel */
    s+=`<rect x="${x0}" y="${f1(U(6))}" width="${f1(x1-x0)}" height="${f1(U(3)-U(6))}" style="fill:var(--good-soft);opacity:.7"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(U(6.8))}" y2="${f1(U(6.8))}" style="stroke:var(--xtal);stroke-dasharray:4 4"/><text x="${x1}" y="${f1(U(6.8)-4)}" class="t-xs t-end" style="fill:var(--xtal)">6.8 crystals can form</text>`;
    s+=`<text x="${x1}" y="${f1(U(6)+12)}" class="t-xs t-end" style="fill:var(--good)">target &lt; 6 mg/dL</text>`;
    let p='';for(let d=0;d<=Math.min(D,730);d+=4)p+=(p?'L':'M')+f1(X(d))+' '+f1(U(SU(d)));
    s+=`<path d="${p}" style="fill:none;stroke:var(--gold);stroke-width:3"/>`;
    s+=`<text x="${x0}" y="${f1(uy0-6)}" class="t-xs" style="fill:var(--gold)">SERUM URATE, mg/dL</text>`;
    [4,6,8,10].forEach(v=>s+=`<text x="${x0-6}" y="${f1(U(v)+3)}" class="t-xs t-end">${v}</text>`);
    for(let m=0;m<=24;m+=6)s+=`<text x="${f1(X(m*30.4))}" y="${f1(uy1+14)}" class="t-xs ${m===0?'':m===24?'t-end':'t-mid'}">${m===0?'month 0':m}</text>`;
    s+=`<line x1="${f1(X(D))}" x2="${f1(X(D))}" y1="24" y2="${f1(uy1)}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    const n1=FL.filter(e=>e.d<=Math.min(D,365)).length,n2=FL.filter(e=>e.d>365&&e.d<=D).length;
    s+=`<text x="${x1}" y="${f1(fy0-6)}" class="t-sm t-end">flares: year 1 <tspan style="fill:var(--terra);font-weight:700">${n1}</tspan> · year 2 <tspan style="fill:var(--sea);font-weight:700">${n2}</tspan></text>`;
    svg.innerHTML=s}
  playWire(rg,$('#heroPlay'),draw,9000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 what gout is =============== */
/* population bars: v in %, or p per 100,000 for the modelled rows; men/wom only where the source splits by sex */
const WH_POP=[
 {n:'Pasifika peoples, NZ',y:'2019',v:14.8,m:'National health data',k:'obs',
  txt:'14.8% of Pasifika peoples had gout in 2019 national data, against 4.7% of other New Zealanders. Almost half of older Pasifika men were estimated to have gout. In the Genetics of Gout in Aotearoa study, mean age at onset was 34 years. <sup class="c" data-ref="TeKaru2021" title="Source 405">405</sup>'},
 {n:'Māori, NZ',y:'2019',v:8.5,m:'National health data',k:'obs',
  txt:'8.5% of Māori had gout in 2019. More than one-third of older Māori men were estimated to have gout, and mean age at onset was 39 years. <sup class="c" data-ref="TeKaru2021" title="Source 405">405</sup>'},
 {n:'Other New Zealanders',y:'2019',v:4.7,m:'National health data',k:'obs',
  txt:'4.7% of other New Zealanders, mainly NZ European, had gout in 2019; mean age at onset was 46 years. <sup class="c" data-ref="TeKaru2021" title="Source 405">405</sup> Prevalence is highest in Pacific countries worldwide. <sup class="c" data-ref="Kuo2015NRR" title="Source 223">223</sup>'},
 {n:'US adults',y:'2015–16',v:3.9,men:5.2,wom:2.7,m:'Survey, self-reported diagnosis',k:'obs',
  txt:'NHANES 2015–2016, 5,467 adults: 3.9% said a doctor had diagnosed gout, about 9.2 million people; 5.2% of men and 2.7% of women. About 20% of both men and women had hyperuricaemia. Only 33% of people with gout were taking urate-lowering therapy (2007–2014). <sup class="c" data-ref="ChenXu2019" title="Source 41">41</sup> Self-report overcalls gout: "self-report of gout or urate-lowering therapy" had 82% sensitivity but 72% specificity against crystal proof. <sup class="c" data-ref="Dalbeth2016" title="Source 80">80</sup>'},
 {n:'United Kingdom',y:'2012',v:2.49,m:'GP records (CPRD)',k:'obs',
  txt:'Clinical Practice Research Datalink, 2012: prevalence 2.49% and incidence 1.77 per 1,000 person-years. Prevalence rose 63.9% from 1997 to 2012. Only 27.3% of people newly diagnosed received urate-lowering therapy within 12 months. <sup class="c" data-ref="Kuo2015" title="Source 222">222</sup>'},
 {n:'High-income North America',y:'2020',p:1719.8,m:'Modelled, age-standardised',k:'mod',
  txt:'GBD 2021: 1,719.8 per 100,000, age-standardised, the highest region, up 76.6% since 1990. The model is adjusted to physician-diagnosed gout across all ages, so it sits below the US survey figure: different measure, not a contradiction. <sup class="c" data-ref="GBD2024Gout" title="Source 146">146</sup>'},
 {n:'World',y:'2020',p:659.3,men:1030.8,wom:316.4,m:'Modelled, age-standardised',k:'mod',
  txt:'55.8 million people had gout in 2020, an age-standardised 659.3 per 100,000: 1,030.8 in males and 316.4 in females, a ratio of 3.26. The projection for 2050 is 95.8 million, driven by population growth and ageing rather than a higher age-standardised rate. <sup class="c" data-ref="GBD2024Gout" title="Source 146">146</sup>'},
 {n:'Israel, Clalit controls',y:'',v:.56,m:'Matched controls, not a population',k:'ctl',
  txt:'No population-based Israeli gout prevalence study was found. Among 19,214 age- and sex-matched controls in a Clalit case-control study, 0.56% had a gout diagnosis. They were matched to people with ankylosing spondylitis, so this is not a population rate. <sup class="c" data-ref="Gonen2020" title="Source 148">148</sup> In a Clalit cohort of 301,385 adults with repeated urate above 6.8 mg/dL (≈ 405 µmol/L), 5% were later diagnosed with gout. <sup class="c" data-ref="Brikman2025" title="Source 28">28</sup>'}
];
const WH_ST=[
 {from:0,at:.12,k:'Stage A',t:'High urate, no crystals',
  txt:'Serum urate is high, but no crystals have formed and there are no symptoms. <sup class="c" data-ref="Dalbeth2014" title="Source 77">77</sup> This is common: about 20% of US men and women have hyperuricaemia, against 3.9% with gout. <sup class="c" data-ref="ChenXu2019" title="Source 41">41</sup> Over 15 years, gout developed in 1.1% of people with baseline urate below 6 mg/dL (360 µmol/L) and in 49% at 10 mg/dL (≈ 595 µmol/L) or more. <sup class="c" data-ref="Dalbeth2018ARD" title="Source 82">82</sup> The ACR 2020 guideline conditionally recommends against urate-lowering drugs at this stage. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  pt:'High uric acid in the blood is not gout. Many people with high uric acid never have a flare.',
  hook:'Hyperuricaemia ≠ gout. 15-year gout incidence: <b>1.1%</b> below 6 mg/dL, <b>49%</b> at ≥ 10 mg/dL. <sup class="c" data-ref="Dalbeth2018ARD" title="Source 82">82</sup>'},
 {from:.25,at:.38,k:'Stage B',t:'Crystals without symptoms',
  txt:'Urate crystals have formed, shown by microscopy or advanced imaging, but there has never been a flare. <sup class="c" data-ref="Dalbeth2014" title="Source 77">77</sup> Dual-energy CT found urate deposits in the feet of 6 of 25 (24%) people with urate ≥ 540 µmol/L (≈ 9.1 mg/dL) and no symptoms. <sup class="c" data-ref="Dalbeth2015" title="Source 79">79</sup> On ultrasound, 25% of first MTP joints in people with high urate and no symptoms showed a double contour, against none in controls. <sup class="c" data-ref="Pineda2011" title="Source 316">316</sup>',
  pt:'Tiny crystals can build up quietly in a joint for years before anything hurts.',
  hook:'<b>Double contour sign</b>: a bright line of urate crystals over the cartilage on ultrasound. G-CAN name for this stage: <b>asymptomatic MSU crystal deposition</b>. <sup class="c" data-ref="Pineda2011,Bursill2019ARD" title="Source 32,316">32,316</sup>'},
 {from:.5,at:.57,k:'Stage C',t:'Flares',
  txt:'Crystal deposits with flares, now or in the past. <sup class="c" data-ref="Dalbeth2014" title="Source 77">77</sup> A typical flare is a sudden, self-limiting monoarthritis of a lower-limb joint. <sup class="c" data-ref="Dalbeth2019NRDP" title="Source 84">84</sup> Pain peaks in under 24 hours and settles within 14 days. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup> Flares are 2.36 times as likely to start overnight as in the daytime. <sup class="c" data-ref="Choi2015" title="Source 58">58</sup> In Olmsted County, 60–62% had another flare within 5 years. <sup class="c" data-ref="Elfishawi2020" title="Source 105">105</sup> The crystals stay between flares: they were found in 36 of 37 previously inflamed, untreated knees. <sup class="c" data-ref="Pascual1991" title="Source 306">306</sup>',
  pt:'A flare is a joint that turns hot, red, swollen and very painful within hours, then calms down over one to two weeks. The crystals are still there afterwards.',
  hook:'"Gout" is the name for clinically evident disease: a flare, chronic gouty arthritis or a tophus. <sup class="c" data-ref="Bursill2019ARD" title="Source 32">32</sup> First MTP in a mono- or oligoarticular episode scores <b>2 points</b> in the 2015 criteria. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>'},
 {from:.75,at:.95,k:'Stage D',t:'Tophi and chronic arthritis',
  txt:'Advanced gout that needs specialist care: tophi, chronic gouty arthritis and bone erosions. <sup class="c" data-ref="Dalbeth2014" title="Source 77">77</sup> Erosion is driven by tophus growing into bone: 96 of 98 joints with severe radiographic erosion had a tophus inside the bone, as did every CT erosion wider than 7.5 mm. <sup class="c" data-ref="Dalbeth2009" title="Source 71">71</sup> At the Mayo Clinic, tophi at diagnosis fell from 14% to 3% between 1949 and 1972. <sup class="c" data-ref="ODuffy1975" title="Source 299">299</sup> Keeping urate low for long enough dissolves the crystals and prevents flares and tophi. <sup class="c" data-ref="Dalbeth2021" title="Source 85">85</sup>',
  pt:'After years of high uric acid, crystals can form chalky lumps called tophi and wear away bone. Lowering uric acid can shrink them.',
  hook:'Bone erosion in gout comes from <b>tophus inside bone</b>. <sup class="c" data-ref="Dalbeth2009" title="Source 71">71</sup> See <a href="#t2t" data-go="t2t">Treat to target</a>.'}
];
/* first-flare joint sites: bar = sourced first-presentation % (null = not quantified in the research) */
const WH_J=[
 {id:'mtp',n:'Big toe (first MTP)',bar:59,gh:74,v:'59–74%',x:172,y:300,lx:172,ly:332,a:'middle',lab:'first MTP',
  txt:'Classic podagra at the first presentation fell from 74% (1989–1992) to 59% (2009–2010) in Olmsted County, Minnesota. <sup class="c" data-ref="Elfishawi2020" title="Source 105">105</sup> In the SUGAR study of crystal-proven gout in rheumatology clinics in 16 countries, first-MTP involvement was the commonest joint pattern, 39.4% of cases. <sup class="c" data-ref="Taylor2015" title="Source 403">403</sup> Why the foot: a cooler joint holds less urate in solution. In vitro, a 2 °C drop from 37 °C to 35 °C lowers solubility from 6.8 to 6.0 mg/dL. <sup class="c" data-ref="Martillo2014" title="Source 249">249</sup> Lower pH, minor trauma and osteoarthritis of the joint may add to it <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Roddy2011" title="Source 337">337</sup>'},
 {id:'mid',n:'Midfoot',bar:null,v:'—',x:122,y:290,lx:122,ly:262,a:'middle',lab:'midfoot',
  txt:'Tarsal and metatarsal joints are common sites. <sup class="c" data-ref="Roddy2011" title="Source 337">337</sup> The 2015 ACR/EULAR criteria give ankle or midfoot involvement 1 point in a mono- or oligoarticular episode without the first MTP. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup> In SUGAR, current tenderness elsewhere in the foot or ankle favoured gout (OR 2.28). <sup class="c" data-ref="Taylor2015" title="Source 403">403</sup>'},
 {id:'ank',n:'Ankle',bar:null,v:'—',x:84,y:276,lx:40,ly:258,a:'middle',lab:'ankle',
  txt:'Ankles are among the usual sites after the foot. <sup class="c" data-ref="Roddy2011" title="Source 337">337</sup> Ankle involvement scores 1 point, like the midfoot. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup> EULAR lists monoarticular foot or ankle involvement, especially the first MTP, among the features that suggest gout. <sup class="c" data-ref="Richette2020" title="Source 332">332</sup>'},
 {id:'knee',n:'Knee',bar:null,v:'—',x:78,y:146,lx:40,ly:150,a:'end',lab:'knee',
  txt:'Knees are a common site. <sup class="c" data-ref="Roddy2011" title="Source 337">337</sup> Crystals stay in the knee between flares: 36 of 37 previously inflamed knees (97%) of never-treated people with gout still held them. <sup class="c" data-ref="Pascual1991" title="Source 306">306</sup> On ultrasound, 17% of people with high urate and no symptoms had a double contour on the femoral cartilage, against none of the controls. <sup class="c" data-ref="Pineda2011" title="Source 316">316</sup> Knee and wrist are also typical sites of CPP crystal arthritis (pseudogout), which is why a hot knee needs fluid microscopy. <sup class="c" data-ref="Abhishek2023,Rosenthal2016" title="Source 2,339">2,339</sup>'},
 {id:'wrist',n:'Wrist',bar:null,v:'—',x:290,y:224,lx:298,ly:212,a:'start',lab:'wrist',
  txt:'Wrists are among the joints gout can reach. <sup class="c" data-ref="Roddy2011,Neogi2015" title="Source 290,337">290,337</sup> In 798 hand and wrist joints imaged by CT, 96 of 98 joints with severe radiographic erosion held a tophus inside the bone. <sup class="c" data-ref="Dalbeth2009" title="Source 71">71</sup> Wrist and knee are also typical sites of CPP crystal arthritis. <sup class="c" data-ref="Abhishek2023,Rosenthal2016" title="Source 2,339">2,339</sup>'},
 {id:'fing',n:'Fingers',bar:null,v:'—',x:312,y:284,lx:312,ly:322,a:'middle',lab:'fingers',
  txt:'MCP and finger joints can be involved. <sup class="c" data-ref="Roddy2011" title="Source 337">337</sup> Tophi form in finger pads. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup> Women with gout have less podagra and more involvement of other joints than men. <sup class="c" data-ref="DirkenHeukensfeldt2010" title="Source 93">93</sup> In a polyarticular pattern, foot involvement is not specific for gout, because rheumatoid arthritis does it too. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>'},
 {id:'olec',n:'Elbow (olecranon bursa)',bar:null,v:'tophi',x:228,y:146,lx:222,ly:176,a:'end',lab:'olecranon',
  txt:'The bursa over the point of the elbow is a typical place for tophi. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup> Bursae count from the start: the entry criterion of the 2015 criteria is at least one episode of swelling, pain or tenderness in a peripheral joint or bursa. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>'},
 {id:'ear',n:'Ear (helix)',bar:null,v:'tophi',x:331,y:62,lx:300,ly:24,a:'middle',lab:'ear helix',
  txt:'A tophus is a chalk-like nodule under thin skin, often with small vessels over it, in typical places such as the ears. A clinical tophus scores 4 points in the 2015 criteria. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup> In 1797 Wollaston showed urate in a tophus from his own ear. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'}
];
inits.what=()=>{
  /* ---------- 1. population bars ---------- */
  const ps=$('#whPop');let sex='all',sel=3;
  const tgt=r=>{const k=sex==='all'?(r.p!=null?'p':'v'):sex;const val=r[k]!=null?r[k]:(r.p!=null?r.p:r.v);return (r.p!=null)?val/1000:val};
  const split=r=>r.men!=null;
  let cur=WH_POP.map(r=>tgt(r));
  const fmt=(r,v)=>r.p!=null?`${(v*1000).toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})} per 100,000 (${v.toFixed(2)}%)`:`${v<1?v.toFixed(2):(+v.toFixed(2)).toString()}%`;
  function drawPop(){
    const N=vb(ps,'720 404','400 562');
    const X0=N?14:318,X1=N?330:690,MX=16,top=N?34:40,RH=N?62:42;
    const xs=v=>X0+(X1-X0)*clamp(v/MX,0,1);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${N?14:16}" y="${N?20:24}" class="t-lbl">Gout prevalence, % of people${sex==='all'?'':sex==='men'?' · men':' · women'}</text>`;
    const axY=top+WH_POP.length*RH+(N?2:2);
    [0,4,8,12,16].forEach(v=>{const x=xs(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${top-4}" y2="${axY}" class="grid"/><text x="${f1(x)}" y="${axY+14}" class="t-xs t-mid">${v}%</text>`});
    s+=`<line x1="${X0}" x2="${X1}" y1="${axY}" y2="${axY}" class="axis"/>`;
    WH_POP.forEach((r,i)=>{const y0=top+i*RH,v=cur[i],on=i===sel,dim=sex!=='all'&&!split(r);
      const col=r.k==='ctl'?'var(--muted)':'var(--terra)';
      s+=`<g class="clk" data-r="${i}" tabindex="0" role="button" aria-label="${r.n}${r.y?', '+r.y:''}: ${fmt(r,tgt(r))}, ${r.m}">`;
      s+=`<rect class="fr" x="${N?4:6}" y="${y0}" width="${N?392:708}" height="${RH-4}" rx="8" style="fill:${on?'var(--panel-2)':'transparent'};stroke:${on?'var(--line)':'none'}"/>`;
      const by=N?y0+36:y0+8,bh=N?14:20;
      s+=`<text x="${N?14:16}" y="${y0+(N?15:17)}" class="t-lbl">${r.n} <tspan class="t-xs">${r.y}</tspan></text>`;
      s+=`<text x="${N?14:16}" y="${y0+(N?29:31)}" class="t-xs" style="fill:${col}">${r.m}${dim?' · no split by sex':''}</text>`;
      const w=Math.max(0,xs(v)-X0);
      if(r.k==='mod')s+=`<rect x="${X0}" y="${by}" width="${f1(w)}" height="${bh}" rx="4" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.5;stroke-dasharray:4 2;opacity:${dim?.35:1}"/>`;
      else s+=`<rect x="${X0}" y="${by}" width="${f1(w)}" height="${bh}" rx="4" style="fill:${col};opacity:${dim?.3:(r.k==='ctl'?.6:.88)}"/>`;
      s+=`<text x="${f1(X0+w+6)}" y="${by+bh/2+4}" class="t-sm" style="fill:var(--ink);font-weight:600;opacity:${dim?.5:1}">${fmt(r,v)}</text>`;
      s+='</g>'});
    ps.innerHTML=s;
  }
  function popNote(){const r=WH_POP[sel],v=tgt(r);
    $('#whPopNote').innerHTML=`<span class="kicker">${r.m}${r.y?' · '+r.y:''}</span><h4>${r.n}</h4><span class="big">${fmt(r,v)}</span>${sex!=='all'&&!split(r)?'<p><span class="tag">This source gives no figure by sex; the bar shows everyone.</span></p>':''}<p>${r.txt}</p>`+
      `<div class="pt"><b>In plain words</b>Gout is common, and it is not spread evenly. Men get it about three times as often as women, and some peoples, such as Pasifika and Māori in New Zealand, have much higher rates. <sup class="c" data-ref="GBD2024Gout,TeKaru2021" title="Source 146,405">146,405</sup></div>`}
  let stopPop=null;
  function retarget(){const from=cur.slice(),to=WH_POP.map(tgt);if(stopPop)stopPop();
    stopPop=animate(700,p=>{cur=from.map((f,i)=>lerp(f,to[i],ease(p)));drawPop()},()=>{stopPop=null})}
  $('#whSex').innerHTML=[['all','Everyone'],['men','Men'],['wom','Women']].map(([k,l])=>`<button class="btn" data-sx="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  $('#whSex').addEventListener('click',e=>{const b=e.target.closest('[data-sx]');if(!b)return;sex=b.dataset.sx;
    $$('[data-sx]',$('#whSex')).forEach(x=>x.setAttribute('aria-pressed',x===b));retarget();popNote()});
  const pickRow=g=>{sel=+g.dataset.r;drawPop();popNote();const n=$(`[data-r="${sel}"]`,ps);n&&n.focus({preventScroll:true})};
  ps.addEventListener('click',e=>{const g=e.target.closest('[data-r]');if(g)pickRow(g)});
  ps.addEventListener('keydown',e=>{const g=e.target.closest('[data-r]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pickRow(g)}});
  drawPop();popNote();
  redraws.what=(prev=>()=>{prev&&prev();drawPop();drawBody()})(redraws.what);

  /* ---------- 2. the four stages ---------- */
  const svg=$('#whSvg'),rg=$('#whT');let woman=false;
  const R=rng(11),FL=[];
  while(FL.length<40){const x=90+R()*230,y=64+R()*164;const inE=Math.pow((x-205)/116,2)+Math.pow((y-145)/82,2)<1;
    const inBone=(y>96&&y<194)&&(x<203||x>240);if(inE&&!inBone)FL.push([x,y,R()*6.28])}
  const R2=rng(29),NB=Array.from({length:24},(_,i)=>({s:(i>>1)/12+R2()*.04,side:i%2,a:R2()*50-25}));
  const SPK=[[.57,.035,1],[.655,.025,.75],[.715,.022,.8],[.79,.02,.85],[.84,.02,.9],[.885,.018,.95],[.93,.018,.9],[.97,.016,1]];
  const sym=u=>Math.min(1,Math.max(0,...SPK.map(([c,w,h])=>h*Math.exp(-Math.pow((u-c)/w,2))))+.3*ramp(u,.78,.95));
  const SEXD={m:{mean:6,hy:7,hyu:416,mu:357,lab:'man'},w:{mean:4.8,hy:5.7,hyu:339,mu:285,lab:'woman'}};
  const qpt=(a,c,b,s)=>(1-s)*(1-s)*a+2*(1-s)*s*c+s*s*b;
  function joint(t){
    const g=ease(ramp(t,.76,.9)),e=ramp(t,.82,.95),fl=sym(t),oB=ramp(t,.25,.38);
    let s='';
    /* soft tissue with a tophus bulge */
    s+=`<path d="M28 30 H262 Q300 ${f1(30-26*g)} 338 30 H372 Q400 30 400 58 V234 Q400 262 372 262 H28 Q0 262 0 234 V58 Q0 30 28 30 Z" style="fill:var(--cyto);stroke:var(--memb);stroke-width:1.5"/>`;
    s+=`<rect x="24" y="238" width="352" height="14" rx="7" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1;opacity:.7"/><text x="30" y="275" class="t-xs">capillary</text>`;
    /* inflammation glow */
    if(fl>.02)s+=`<ellipse cx="205" cy="145" rx="${f1(132+14*fl)}" ry="${f1(96+12*fl)}" style="fill:var(--terra);opacity:${f1(.28*fl)}"/>`;
    /* capsule and joint fluid */
    s+=`<ellipse cx="205" cy="145" rx="${f1(118+10*fl)}" ry="${f1(84+8*fl)}" style="fill:var(--panel);stroke:${fl>.3?'var(--terra)':'var(--memb)'};stroke-width:2.5"/>`;
    /* bones and cartilage */
    s+=`<path d="M0 100 H150 Q196 100 200 145 Q196 190 150 190 H0 Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<path d="M400 105 H254 Q234 145 254 185 H400 Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
    const cw=f1(lerp(7,3,e));
    s+=`<path d="M154 103 Q195 103 198 145 Q195 187 154 187" style="fill:none;stroke:var(--tub-b);stroke-width:${cw};opacity:.9"/><path d="M256 108 Q238 145 256 182" style="fill:none;stroke:var(--tub-b);stroke-width:${cw};opacity:.9"/>`;
    s+=`<text x="60" y="150" class="t-xs t-mid">metatarsal</text><text x="340" y="150" class="t-xs t-mid">phalanx</text>`;
    /* stage A: dissolved urate in the fluid */
    const nA=Math.round(lerp(8,FL.length,ramp(t,0,.18)));
    for(let i=0;i<nA;i++){const [x,y,ph]=FL[i];s+=`<circle cx="${f1(x+2*Math.sin(t*60+ph))}" cy="${f1(y+2*Math.cos(t*50+ph))}" r="2.4" style="fill:var(--gold);opacity:.85"/>`}
    /* stage B: needles on the cartilage, the double contour */
    const nB=Math.round(14*oB+10*ramp(t,.76,.9));
    NB.slice(0,nB).forEach(c=>{const s0=clamp(c.s);let x,y;
      if(!c.side){if(s0<.5){const q=s0*2;x=qpt(154,195,198,q);y=qpt(103,103,145,q)}else{const q=(1-s0)*2;x=qpt(154,195,198,q);y=290-qpt(103,103,145,q)}x+=5}
      else{x=qpt(256,238,256,s0)-6;y=qpt(108,145,182,s0)}
      s+=needle(x,y,11,90+c.a,1)});
    if(oB>0)s+=`<path d="M158 98 Q203 98 206 145 Q203 192 158 192" style="fill:none;stroke:var(--xtal);stroke-width:2;opacity:${f1(oB*.9)}"/>`;
    /* stage C: neutrophils pour in from the capillary */
    const nN=Math.round(7*fl);
    for(let k=0;k<nN;k++){const tx=[214,226,220,212,230,206,222][k],ty=[70,84,206,218,196,80,226][k],sx=60+k*44;
      const m=ease(clamp(fl*1.4));s+=neutro(lerp(sx,tx,m),lerp(244,ty,m),9,clamp(fl*1.6))}
    /* stage D: tophus and erosion */
    if(g>0){s+=`<circle cx="300" cy="52" r="${f1(27*g)}" style="fill:var(--panel);stroke:var(--xtal);stroke-width:1.6"/>`;
      for(let k=0;k<9;k++){const a=k*.7,rr=16*g*((k%3)/3+.25);s+=needle(300+Math.cos(a)*rr,52+Math.sin(a)*rr,7*g+1,k*40,g)}}
    if(e>0){s+=`<circle cx="176" cy="111" r="${f1(14*e)}" style="fill:var(--panel);stroke:var(--xtal);stroke-width:1.4"/>`;
      for(let k=0;k<4;k++)s+=needle(170+k*4,108+(k%2)*6,6*e+1,30+k*35,e)}
    /* labels */
    const lab=(x,y,txt,c='var(--muted)',a='')=>`<text x="${x}" y="${y}" class="t-xs${a}" style="fill:${c};font-weight:700">${txt}</text>`;
    if(t<.25)s+=lab(205,52,'urate dissolved in joint fluid','var(--gold)',' t-mid');
    if(oB>.2&&t<.5)s+=lab(214,220,'double contour','var(--xtal)');
    if(fl>.35)s+=lab(205,20,'hot · red · swollen','var(--terra)',' t-mid');
    if(g>.3)s+=`<path d="M300 ${f1(52-27*g)} V14" style="stroke:var(--xtal);stroke-width:1"/>`+lab(306,16,'tophus','var(--xtal)');
    if(e>.3)s+=`<path d="M80 90 L164 106" style="stroke:var(--xtal);stroke-width:1;opacity:${f1(e)}"/>`+lab(56,94,'erosion','var(--xtal)',' t-mid');
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const L=N
      ? {jx:0,jy:14,bx:8,by:300,bw:92,bg:97,bh:56,sx0:20,sx1:380,sy:394,sh:62,gx0:20,gx1:380,gy:520,fx:20,fy:608}
      : {jx:20,jy:74,bx:24,by:14,bw:166,bg:170,bh:44,sx0:458,sx1:700,sy:100,sh:72,gx0:458,gx1:700,gy:252,fx:458,fy:322};
    const p=phaseOf(WH_ST,t),D=woman?SEXD.w:SEXD.m;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<g transform="translate(${L.jx} ${L.jy})">${joint(t)}</g>`;
    /* stage band */
    const TT=N?[['High urate,','no crystals'],['Silent','crystals'],['Flares',''],['Tophi,','chronic']]:[['High urate, no crystals'],['Crystals, no symptoms'],['Flares'],['Tophi and erosions']];
    WH_ST.forEach((S,i)=>{const x=L.bx+i*L.bg,on=i===p,past=i<p;
      s+=`<rect x="${x}" y="${L.by}" width="${L.bw}" height="${L.bh}" rx="9" style="fill:${on?'var(--terra-soft)':past?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--terra)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${x+10}" y="${L.by+(N?22:29)}" class="t-big" style="fill:${on?'var(--terra)':'var(--ink)'}">${'ABCD'[i]}</text>`;
      if(N)TT[i].forEach((l,j)=>{if(l)s+=`<text x="${x+10}" y="${L.by+38+j*11}" class="t-xs">${l}</text>`});
      else s+=`<text x="${x+30}" y="${L.by+27}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">${TT[i][0]}</text>`});
    const bx1=L.bx+3*L.bg+L.bw,px=lerp(L.bx,bx1,t);
    s+=`<line x1="${L.bx}" x2="${bx1}" y1="${L.by+L.bh+7}" y2="${L.by+L.bh+7}" class="axis"/><path d="M${f1(px)} ${L.by+L.bh+2}l5 8h-10z" style="fill:var(--terra)"/>`;
    /* symptom track */
    const X=u=>lerp(L.sx0,L.sx1,u),Y=v=>L.sy+L.sh-v*L.sh*.9;
    s+=`<text x="${L.sx0}" y="${L.sy-8}" class="t-sm">Pain and swelling · schematic</text>`;
    s+=`<line x1="${L.sx0}" x2="${L.sx1}" y1="${L.sy+L.sh}" y2="${L.sy+L.sh}" class="axis"/>`;
    [.25,.5,.75].forEach(u=>s+=`<line x1="${f1(X(u))}" x2="${f1(X(u))}" y1="${L.sy}" y2="${L.sy+L.sh}" class="grid"/>`);
    ['A','B','C','D'].forEach((l,i)=>s+=`<text x="${f1(X(i*.25+.125))}" y="${L.sy+L.sh+13}" class="t-xs t-mid">${l}</text>`);
    let d='';const n=Math.max(1,Math.round(t*240));for(let i=0;i<=n;i++){const u=t*i/n;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(sym(u)))}
    s+=`<path d="${d}L${f1(X(t))} ${L.sy+L.sh}L${L.sx0} ${L.sy+L.sh}Z" style="fill:var(--terra);opacity:.14"/><path d="${d}" style="fill:none;stroke:var(--terra);stroke-width:2.2;stroke-linejoin:round"/>`;
    s+=`<circle cx="${f1(X(t))}" cy="${f1(Y(sym(t)))}" r="4" style="fill:var(--terra)"/>`;
    if(t<.5)s+=`<text x="${f1(X(.25))}" y="${f1(L.sy+L.sh-10)}" class="t-xs t-mid">no symptoms</text>`;
    /* serum urate scale */
    const G=v=>lerp(L.gx0,L.gx1,v/10),lvl=lerp(D.mean,8.6,ease(ramp(t,0,.12)));
    s+=`<text x="${L.gx0}" y="${L.gy-26}" class="t-sm">Serum urate, mg/dL · ${D.lab}</text>`;
    s+=`<rect x="${L.gx0}" y="${L.gy}" width="${L.gx1-L.gx0}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${L.gx0}" y="${L.gy}" width="${f1(G(lvl)-L.gx0)}" height="12" rx="6" style="fill:var(--gold)"/>`;
    const sx=G(6.8);s+=`<line x1="${f1(sx)}" x2="${f1(sx)}" y1="${L.gy-8}" y2="${L.gy+20}" style="stroke:var(--xtal);stroke-width:2;stroke-dasharray:3 2"/><text x="${f1(sx)}" y="${L.gy-11}" class="t-xs t-mid" style="fill:var(--xtal);font-weight:700">6.8 saturation</text>`;
    const mx=G(D.mean);s+=`<path d="M${f1(mx)} ${L.gy+14}l5 8h-10z" style="fill:var(--ink)"/><text x="${f1(mx)}" y="${L.gy+33}" class="t-xs t-mid">US mean ${D.mean.toFixed(1)}</text>`;
    [0,2,4,8,10].filter(v=>Math.abs(v-D.mean)>1.1).forEach(v=>s+=`<text x="${f1(G(v))}" y="${L.gy+33}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${L.gx1}" y="${L.gy-26}" class="t-xs t-end" style="fill:var(--gold);font-weight:700">${f1(lvl)}</text>`;
    /* how it shows */
    const F=[['Blood test: urate above the limit','Imaging: no crystals yet'],['Ultrasound: double contour','Dual-energy CT: urate, no pain'],['Joint fluid: needle crystals','Flares, then quiet gaps'],['Tophi under the skin','Erosions on X-ray or CT']][p];
    s+=`<text x="${L.fx}" y="${L.fy}" class="t-sm" style="fill:var(--terra);font-weight:600">HOW STAGE ${'ABCD'[p]} SHOWS</text>`;
    F.forEach((l,j)=>s+=`<text x="${L.fx}" y="${L.fy+20+j*18}" class="t-lbl">${l}</text>`);
    svg.innerHTML=s;
    setSt(p);$('#whNote').innerHTML=noteHTML(WH_ST[p]);
  }
  function readout(){const D=woman?SEXD.w:SEXD.m;
    $('#whRead').innerHTML=woman
      ?`<span>Women: hyperuricaemia above <b>5.7 mg/dL (339 µmol/L)</b>; US mean urate <b>4.8 mg/dL (285 µmol/L)</b>. <sup class="c" data-ref="ChenXu2019" title="Source 41">41</sup></span><span>Gout comes later: mean age <b>70</b> vs 58 in men in US claims data, with more diuretic use. <sup class="c" data-ref="Harrold2006" title="Source 156">156</sup></span><span>After menopause the risk rises (RR 1.26 vs premenopausal); menopause before 45 carried RR 1.62. <sup class="c" data-ref="Hak2010" title="Source 151">151</sup></span>`
      :`<span>Men: hyperuricaemia above <b>7.0 mg/dL (416 µmol/L)</b>; US mean urate <b>6.0 mg/dL (357 µmol/L)</b>. <sup class="c" data-ref="ChenXu2019" title="Source 41">41</sup></span><span>Mean age at gout <b>58</b> in US claims data. <sup class="c" data-ref="Harrold2006" title="Source 156">156</sup> 73% of new cases in Olmsted County were men. <sup class="c" data-ref="Elfishawi2020" title="Source 105">105</sup></span><span>Urate saturation ≈ 6.8 mg/dL (405 µmol/L) at 37 °C. <sup class="c" data-ref="Martillo2014" title="Source 249">249</sup></span>`;
    void D}
  const stop=playWire(rg,$('#whPlay'),draw,18000,'Replay','what');
  const setSt=stepWire($('#whSteps'),WH_ST,rg,draw,stop);
  const tog=v=>{woman=v;$('#whMen').setAttribute('aria-pressed',!v);$('#whWomen').setAttribute('aria-pressed',v);readout();draw(+rg.value)};
  $('#whMen').onclick=()=>tog(false);$('#whWomen').onclick=()=>tog(true);
  readout();draw(+rg.value);

  /* ---------- 3. where flares strike ---------- */
  const body=$('#whBody');let site='mtp';
  function drawBody(){
    const S=WH_J.find(j=>j.id===site);let s='';
    const sil='stroke:var(--panel-2);stroke-linecap:round;fill:none';
    /* leg, side view, big toe forward */
    s+=`<g style="${sil}"><path d="M70 8 L78 140" style="stroke-width:34"/><path d="M78 150 L84 266" style="stroke-width:24"/><path d="M250 26 L236 140" style="stroke-width:24"/><path d="M238 148 L290 220" style="stroke-width:18"/></g>`;
    s+=`<path d="M70 258 Q54 280 60 302 Q63 315 82 315 L188 318 Q206 316 204 305 Q202 296 186 294 L150 289 Q112 280 98 258 Z" style="fill:var(--panel-2)"/>`;
    s+=`<circle cx="78" cy="145" r="15" style="fill:var(--panel-2)"/>`;
    /* hand */
    s+=`<g transform="rotate(-18 304 252)"><rect x="290" y="232" width="30" height="34" rx="9" style="fill:var(--panel-2)"/>`;
    [292,299,306,313].forEach((x,i)=>s+=`<path d="M${x+2} 262 V${300-(i===0||i===3?6:0)}" style="stroke:var(--panel-2);stroke-width:6;stroke-linecap:round"/>`);
    s+=`<path d="M290 246 L278 266" style="stroke:var(--panel-2);stroke-width:7;stroke-linecap:round"/></g>`;
    /* ear */
    s+=`<path d="M314 36 Q342 38 340 70 Q338 98 316 102 Q304 100 306 88 Q316 82 314 68 Q308 58 302 62 Q298 42 314 36 Z" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<path d="M318 54 Q328 62 324 80" style="fill:none;stroke:var(--line);stroke-width:1.5"/>`;
    /* markers */
    WH_J.forEach(j=>{const on=j.id===site,toph=j.id==='olec'||j.id==='ear';
      s+=`<g class="clk" data-js="${j.id}">`;
      if(on){s+=`<circle cx="${j.x}" cy="${j.y}" r="16" style="fill:var(--terra);opacity:.28"/>`;
        if(toph||j.id==='fing'){s+=`<circle cx="${j.x}" cy="${j.y}" r="7" style="fill:var(--panel);stroke:var(--xtal);stroke-width:1.5"/>`;for(let k=0;k<3;k++)s+=needle(j.x-3+k*3,j.y-1+(k%2)*2,5,30+k*50)}}
      s+=`<circle cx="${j.x}" cy="${j.y}" r="${on?6:4.5}" style="fill:${on?'var(--terra)':'var(--panel)'};stroke:var(--terra);stroke-width:2"/>`;
      s+=`<circle cx="${j.x}" cy="${j.y}" r="14" style="fill:transparent"/>`;
      s+=`<text x="${j.lx}" y="${j.ly}" class="t-xs" style="text-anchor:${j.a};fill:${on?'var(--terra)':'var(--muted)'};font-weight:${on?700:500}">${j.lab}</text></g>`});
    body.innerHTML=s;
    $('#whSiteNote').innerHTML=`<h4>${S.n} ${S.bar!=null?`<span class="big" style="font-size:22px">${S.v}</span>`:''}</h4><p>${S.txt}</p>`;
    $$('.wh-site',$('#whSites')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.site===site));
  }
  $('#whSites').innerHTML=WH_J.map(j=>`<button class="wh-site" data-site="${j.id}" aria-pressed="false"><span>${j.n}</span>${j.bar!=null?`<span class="tr"><i class="gh" data-w="${j.gh}"></i><i data-w="${j.bar}"></i></span>`:`<span class="nq">${j.v==='tophi'?'tophus site':'no sourced first-flare %'}</span>`}<span class="v">${j.bar!=null?j.v:''}</span></button>`).join('')+
    `<p class="stage-cap">Big toe bar: 59% (solid) and 74% (dashed) of first presentations, Olmsted County 2009–2010 and 1989–1992. <sup class="c" data-ref="Elfishawi2020" title="Source 105">105</sup></p>`+
    `<div class="pt"><b>In plain words</b>Gout usually starts in one joint of the foot or leg, most often the big toe. Later it can reach the hands, and lumps of crystals (tophi) can form at the elbow and ear. <sup class="c" data-ref="Dalbeth2019NRDP,Roddy2011,Neogi2015" title="Source 84,290,337">84,290,337</sup></div>`;
  $('#whSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;drawBody()});
  body.addEventListener('click',e=>{const g=e.target.closest('[data-js]');if(g){site=g.dataset.js;drawBody()}});
  drawBody();
  setTimeout(()=>$$('#whSites .tr i').forEach(i=>i.style.width=i.dataset.w+'%'),60);

  /* ---------- 4. key numbers ---------- */
  $('#whCards').innerHTML=`
   <div class="card"><span class="kicker">Worldwide, 2020</span><span class="big">55.8 million</span><p>people with gout, an age-standardised 659.3 per 100,000, up 22.5% since 1990. Projected: 95.8 million in 2050. <sup class="c" data-ref="GBD2024Gout" title="Source 146">146</sup></p></div>
   <div class="card"><span class="kicker">Men to women</span><span class="big">3.26 : 1</span><p>age-standardised prevalence ratio. <sup class="c" data-ref="GBD2024Gout" title="Source 146">146</sup> Women get gout later, with more hypertension, kidney disease and diuretic use, and less podagra. <sup class="c" data-ref="DirkenHeukensfeldt2010" title="Source 93">93</sup> Hippocrates already wrote that a woman does not get gout until her menses stop. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup></p></div>
   <div class="card"><span class="kicker">High urate vs gout</span><span class="big">20% vs 3.9%</span><p>of US adults have hyperuricaemia vs gout. <sup class="c" data-ref="ChenXu2019" title="Source 41">41</sup> Only about half of people with urate ≥ 10 mg/dL develop gout over 15 years. <sup class="c" data-ref="Dalbeth2018ARD" title="Source 82">82</sup></p></div>
   <div class="card"><span class="kicker">After a first flare</span><span class="big">60–62%</span><p>had another flare within 5 years in Olmsted County; high urate (HR 1.59) and kidney disease (HR 1.34) predicted it. <sup class="c" data-ref="Elfishawi2020" title="Source 105">105</sup> In UK GP records only 36.9% had a recorded flare over a mean 3.8 years. <sup class="c" data-ref="Rothenbacher2011" title="Source 340">340</sup> The gap reflects how flares were counted: chart review vs GP coding.</p></div>
   <div class="card"><span class="kicker">Disability</span><span class="big">34.3%</span><p>of gout's years lived with disability worldwide were attributed to high body-mass index, and 11.8% to kidney dysfunction (GBD 2021). <sup class="c" data-ref="GBD2024Gout" title="Source 146">146</sup></p></div>
   <div class="card"><span class="kicker">The treatment gap</span><span class="big">1 in 3</span><p>US adults with gout took urate-lowering therapy (33%, 2007–2014). <sup class="c" data-ref="ChenXu2019" title="Source 41">41</sup> In the UK, 27.3% started it within a year of diagnosis. <sup class="c" data-ref="Kuo2015" title="Source 222">222</sup> In Israel's Maccabi fund, 17% were adherent to allopurinol. <sup class="c" data-ref="ZandmanGoddard2013" title="Source 443">443</sup></p></div>
   <div class="card"><span class="kicker">Israel</span><span class="big">13% in 10 years</span><p>developed gout in the highest urate quartile (mean 8.62 mg/dL, ≈ 513 µmol/L) of a Clalit cohort of 301,385 adults, a steady 1.3% a year. Overall, 5% of the cohort was diagnosed. <sup class="c" data-ref="Brikman2025" title="Source 28">28</sup></p></div>
   <div class="card"><span class="kicker">Words matter</span><ul><li>Say <b>gout flare</b>, not "attack". The G-CAN consensus also advises against "chronic gout". <sup class="c" data-ref="Bursill2019" title="Source 31">31</sup></li><li>Calling gout "urate crystal arthritis" made the public see it as less under personal control and better suited to long-term medical treatment. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Coleshill2021" title="Source 63">63</sup></li></ul><div class="hook"><b>Exam hook</b>Staging A–D is from Dalbeth &amp; Stamp 2014: hyperuricaemia → silent crystals → flares → advanced gout. <sup class="c" data-ref="Dalbeth2014" title="Source 77">77</sup></div></div>`;
};
/* =============== 1.2 where urate comes from =============== */
const UR_STEPS=[
 {from:0,at:.12,k:'Scene 1 · Purines in',t:'Purines from cells, synthesis and food',
  txt:'Purine nucleotides (AMP, GMP, IMP) come from cell turnover, new synthesis and diet. Building one IMP from scratch takes four amino acids, one PRPP, two folates and three ATP, and PRPP amidotransferase is the rate-limiting step. <sup class="c" data-ref="Torres2007" title="Source 413">413</sup> Nucleotides are broken down through nucleosides (inosine, guanosine) to the free bases hypoxanthine and guanine; guanine feeds into xanthine. <sup class="c" data-ref="Maiuolo2016" title="Source 243">243</sup> The salvage enzyme HPRT puts hypoxanthine and guanine back into nucleotides, away from urate. <sup class="c" data-ref="Torres2007" title="Source 413">413</sup>',
  pt:'Purines are building blocks found in every cell and in food. When cells break them down, the leftovers head toward urate, unless the cell recycles them.',
  hook:'<b>HPRT salvage</b> keeps purines from becoming urate. Every patient with HPRT deficiency overproduces uric acid; the severe form is Lesch–Nyhan syndrome. <sup class="c" data-ref="Torres2007" title="Source 413">413</sup>'},
 {from:.2,at:.32,k:'Scene 2 · Xanthine oxidase',t:'One enzyme, two steps, makes urate',
  txt:'Xanthine oxidoreductase (XOR) works at two steps in a row, hypoxanthine → xanthine → uric acid, and makes reactive oxygen species at each. <sup class="c" data-ref="Chen2016" title="Source 39">39</sup> It is the rate-limiting enzyme of urate production. <sup class="c" data-ref="Furuhashi2020" title="Source 141">141</sup> The liver is the main production site. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup> Most liver XOR is the dehydrogenase form, which becomes the oxidase form by reversible oxidation or by proteolysis. <sup class="c" data-ref="Chen2016,Furuhashi2020" title="Source 39,141">39,141</sup> At pH 7.4 and 37 °C, urate circulates mostly as an anion that pairs with sodium: monosodium urate. <sup class="c" data-ref="Martillo2014" title="Source 249">249</sup> The first new estimate in over 50 years put daily production at 591 mg (men 648, women 489). <sup class="c" data-ref="Ohashi2023" title="Source 302">302</sup>',
  pt:'One enzyme does the last two steps that turn purine leftovers into urate. Allopurinol and febuxostat work by blocking it. <sup class="c" data-ref="FDA-Zyloprim,Becker2005" title="Source 18,129">18,129</sup>',
  hook:'Xanthine oxidase acts <b>twice</b>: hypoxanthine → xanthine and xanthine → urate. <sup class="c" data-ref="Chen2016" title="Source 39">39</sup>'},
 {from:.4,at:.52,k:'Scene 3 · No uricase',t:'Why humans run high',
  txt:'In most mammals, uricase turns uric acid into allantoin, which is about 100 times more water-soluble. In humans and higher primates, uric acid is the end product. <sup class="c" data-ref="Chen2016,So2010" title="Source 39,372">39,372</sup> Rats and mice run 1–2 mg/dL (≈ 59–119 µmol/L). The human reference range is 3.5–7.0 mg/dL (208–416 µmol/L) in men and postmenopausal women and 2.6–5.7 mg/dL (155–339 µmol/L) in premenopausal women. <sup class="c" data-ref="Chen2016" title="Source 39">39</sup> Human, chimpanzee and orangutan share one nonsense mutation in exon 2 (codon 33, CGA→TGA); the gibbon lost the gene separately. <sup class="c" data-ref="Wu1992,Oda2002" title="Source 297,434">297,434</sup> Activity had already been falling down the primate line before the gene was silenced. <sup class="c" data-ref="Kratzer2014" title="Source 219">219</sup>',
  pt:'Most animals have an enzyme that breaks urate down. Humans and great apes lost it millions of years ago, so we carry much more urate in our blood.',
  hook:'Hominoids lack <b>uricase</b>, so <b>urate is the end product</b> of purine breakdown in humans. <sup class="c" data-ref="Chen2016,Oda2002" title="Source 39,297">39,297</sup>'},
 {from:.6,at:.72,k:'Scene 4 · Kidney and gut',t:'The kidney takes back about 90%',
  txt:'About two thirds of urate leaves through the kidney and one third through the gut, mostly from radio-isotope studies; other sources give 70% renal. <sup class="c" data-ref="Ohashi2023,HalperinKuhns2021" title="Source 153,302">153,302</sup> At least 90% of filtered urate is reabsorbed <sup class="c" data-ref="Chen2016" title="Source 39">39</sup>, so fractional excretion of urate (FEUA) in health is only 5–15%. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup> In the proximal tubule, apical OAT4 and OAT10 probably do the bulk reabsorption and basolateral GLUT9 lets urate out to the blood. OAT1 and OAT3 take urate up from the blood and apical ABCG2 secretes it. URAT1, coupled to GLUT9, then reabsorbs urate again after secretion. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup> ABCG2 also exports urate into the gut. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup> When the kidneys fail, the gut can excrete up to about 60% of daily urate turnover. <sup class="c" data-ref="Ohashi2023" title="Source 302">302</sup>',
  pt:'The kidneys filter urate out of the blood, then pull most of it back in. The gut gets rid of the rest.',
  hook:'<b>URAT1</b> (SLC22A12): apical reabsorption, the uricosuric drug target. <b>GLUT9</b> (SLC2A9): basolateral exit. <b>ABCG2</b>: secretion in kidney and gut. <sup class="c" data-ref="Enomoto2002,Vitart2008,Woodward2009" title="Source 112,421,432">112,421,432</sup>'},
 {from:.8,at:.92,k:'Scene 5 · Balance',t:'Under-excretion, not overproduction',
  txt:'In 100 people with primary gout and 72 controls, the people with gout had lower urate clearance and FEUA, even the "high output" patients, and even after allopurinol had matched the filtered load. The authors call renal under-excretion the main mechanism. <sup class="c" data-ref="PerezRuiz2002Renal" title="Source 313">313</sup> In 644 men with hyperuricaemia, ABCG2 dysfunction <i>raised</i> urinary urate: the gut was under-excreting and the kidney was clearing the overload. Ichida et al. proposed renaming the "overproduction type" the "renal overload type". <span class="ev early">Early evidence</span> <sup class="c" data-ref="Ichida2012" title="Source 174">174</sup> Genuine overproduction is rare: HPRT deficiency, PRPS1 superactivity. <sup class="c" data-ref="Torres2007,deBrouwer2010" title="Source 88,413">88,413</sup>',
  pt:'In most people with gout, the body makes a normal amount of urate. The kidneys and gut just do not get rid of enough of it. Genes play a large part in that. <sup class="c" data-ref="Major2018,Tin2019" title="Source 244,412">244,412</sup>',
  hook:'Most people with primary gout are <b>renal under-excreters</b>. <sup class="c" data-ref="PerezRuiz2002Renal" title="Source 313">313</sup> Many apparent overproducers are <b>gut under-excreters</b> (ABCG2). <sup class="c" data-ref="Ichida2012" title="Source 174">174</sup>'}
];
const UR_BAL={healthy:{n:'Healthy balance',prod:1,kid:.67,txt:'Made and removed in balance; urate stays below saturation.'},
 under:{n:'Kidney under-excretes',prod:1,kid:.3,txt:'Normal production, too little leaves in the urine. The main mechanism in primary gout.'},
 over:{n:'Overproduction',prod:1.7,kid:.75,txt:'More made than usual; urine urate is high. Rare as a primary cause.'}};
const UR_TX=[
 {id:'URAT1',g:'SLC22A12',hl:'URAT1',to:.72,where:'Apical membrane of the proximal tubule (urine side).',
  does:'Reabsorbs urate in exchange for anions such as lactate, α-ketoglutarate and β-hydroxybutyrate, mainly after secretion, coupled to GLUT9. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup> Identified in 2002 as the renal urate–anion exchanger. <sup class="c" data-ref="Enomoto2002" title="Source 112">112</sup>',
  wrong:'Loss-of-function mutations cause renal hypouricaemia: plasma uric acid below 60 µM (< 1 mg/dL) and FEUA near 100%. <sup class="c" data-ref="So2010,Enomoto2002" title="Source 112,372">112,372</sup> URAT1 affinity for uric acid rose during primate evolution, alongside the fall in uricase activity. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Tan2016" title="Source 395">395</sup>',
  drug:'The target of uricosuric and antiuricosuric drugs. <sup class="c" data-ref="Enomoto2002" title="Source 112">112</sup> Dotinurad, a selective URAT1 inhibitor approved in Japan in 2020, barely inhibits ABCG2 or OAT1/3. <sup class="c" data-ref="Taniguchi2020" title="Source 396">396</sup>'},
 {id:'GLUT9',g:'SLC2A9',hl:'GLUT9',to:.72,where:'Basolateral membrane of the proximal tubule (blood side).',
  does:'The exit door: urate taken up from the lumen leaves the cell for the blood through GLUT9. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup> It has strong urate transport activity. <sup class="c" data-ref="Vitart2008" title="Source 421">421</sup>',
  wrong:'Common variants explain 1.7–5.3% of the variance in serum uric acid and go with low FEUA and with gout. <sup class="c" data-ref="Vitart2008" title="Source 421">421</sup> People homozygous for L75R have serum uric acid of 0.17 ± 0.2 mg/dL (≈ 10 µmol/L) and FEUA of about 150%. <sup class="c" data-ref="So2010" title="Source 372">372</sup>',
  drug:'No approved drug acts on it in the sources used here.'},
 {id:'ABCG2',g:'BCRP',hl:'ABCG2',to:.72,where:'Apical brush border of the proximal tubule, the apical side of gut cells, and the liver\'s bile canaliculi. <sup class="c" data-ref="HalperinKuhns2021,Woodward2009" title="Source 153,432">153,432</sup>',
  does:'A high-capacity urate exporter <sup class="c" data-ref="Matsuo2009" title="Source 252">252</sup>: it secretes urate into the urine and into the gut. Secretion and URAT1 reabsorption can happen in the same tubule cell. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup> HNF4A drives its transcription. <sup class="c" data-ref="Tin2019" title="Source 412">412</sup>',
  wrong:'Q141K (rs2231142) cuts transport by 53%; it is carried by 11% of alleles in white people and 3% in Black people, raises gout odds 1.68-fold per allele and accounts for at least 10% of gout in white people. <sup class="c" data-ref="Woodward2009" title="Source 432">432</sup> In UK Biobank, ABCG2 had the largest per-locus gout odds ratio, 2.04. <sup class="c" data-ref="Tin2019" title="Source 412">412</sup> In Japan, genotypes cutting function by more than 75% gave OR 25.8. <sup class="c" data-ref="Matsuo2009" title="Source 252">252</sup> Use the Q141K toggle above.',
  drug:'Loop diuretics inhibit ABCG2 directly, which reduces secretion. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup>'},
 {id:'OAT1/3',g:'SLC22A6 / SLC22A8',hl:'OAT13',to:.72,where:'Basolateral membrane of the proximal tubule.',
  does:'Take urate up from the blood into the tubule cell, the first step of secretion. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup>',
  wrong:'Part of the secretory route whose weakness lets urate build up. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup>',
  drug:'Diuretics compete with urate here, so less is secreted. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup> Diuretic use carried RR 1.77 for incident gout in men. <sup class="c" data-ref="Choi2005" title="Source 48">48</sup>'},
 {id:'OAT4/10',g:'SLC22A11 / SLC22A13',hl:'OAT410',to:.72,where:'Apical membrane of the early proximal tubule.',
  does:'Probably do the first, bulk reabsorption of filtered urate from the lumen. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup>',
  wrong:'Together with URAT1 and GLUT9 they bring back at least 90% of filtered urate. <sup class="c" data-ref="Chen2016" title="Source 39">39</sup>',
  drug:'None named in the sources used here.'},
 {id:'NPT1/4',g:'SLC17A1 / SLC17A3',hl:'NPT',to:.72,where:'Apical membrane of the proximal tubule.',
  does:'Possible extra help for ABCG2 in secreting urate into the urine. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup>',
  wrong:'Drawn dashed in the animation: their role is less certain than ABCG2\'s. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup>',
  drug:'Loop diuretics inhibit NPT4. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup>'},
 {id:'XOR',g:'XDH',hl:'XOR',to:.3,where:'Mostly liver; also gut, mammary gland, heart, skeletal muscle and vessel lining. <sup class="c" data-ref="Chen2016,HalperinKuhns2021" title="Source 39,153">39,153</sup>',
  does:'Makes urate in two steps and is the rate-limiting enzyme. <sup class="c" data-ref="Chen2016,Furuhashi2020" title="Source 39,141">39,141</sup>',
  wrong:'Each step makes reactive oxygen species. <sup class="c" data-ref="Chen2016" title="Source 39">39</sup>',
  drug:'Allopurinol, a hypoxanthine analogue, and its metabolite oxipurinol inhibit xanthine oxidase. <sup class="c" data-ref="FDA-Zyloprim" title="Source 129">129</sup> Febuxostat is a non-purine selective xanthine oxidase inhibitor. <sup class="c" data-ref="Becker2005" title="Source 18">18</sup>'},
 {id:'Uricase',g:'UOX, silenced',hl:'UOX',to:.5,where:'Liver, in most mammals. A pseudogene in humans and apes. <sup class="c" data-ref="Oda2002" title="Source 297">297</sup>',
  does:'Oxidises uric acid to allantoin, about 100 times more soluble. <sup class="c" data-ref="Chen2016" title="Source 39">39</sup>',
  wrong:'Silenced in hominoids by a shared nonsense mutation, and separately in gibbons. <sup class="c" data-ref="Wu1992,Oda2002" title="Source 297,434">297,434</sup>',
  drug:'Pegloticase is a PEGylated recombinant uricase. About 24 hours after the first 8 mg dose, the US label reports mean plasma uric acid of 0.7 mg/dL against 8.2 mg/dL on placebo. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup>'},
 {id:'HPRT1',g:'X-linked',hl:'HPRT',to:.12,where:'Every cell: the purine salvage pathway.',
  does:'Puts hypoxanthine and guanine back into IMP and GMP. <sup class="c" data-ref="Torres2007" title="Source 413">413</sup>',
  wrong:'Deficiency is X-linked recessive, with more than 300 mutations. Every patient overproduces uric acid, with stones and gout. About 1 in 380,000 live births in Canada and 1 in 235,000 in Spain. <sup class="c" data-ref="Torres2007" title="Source 413">413</sup>',
  drug:'None specific.'},
 {id:'PRPS1',g:'X-linked',hl:'PRPS',to:.12,where:'Every cell: makes PRPP for purine synthesis.',
  does:'Supplies PRPP, which de novo synthesis and salvage both use. <sup class="c" data-ref="Torres2007" title="Source 413">413</sup>',
  wrong:'Superactivity causes uric acid overproduction, often with hearing impairment and neurological features. <sup class="c" data-ref="deBrouwer2010" title="Source 88">88</sup>',
  drug:'None specific.'},
 {id:'UMOD',g:'uromodulin',hl:'UMOD',to:.72,where:'Kidney tubule.',
  does:'Mutations cause a kidney disease, not a transporter defect. <sup class="c" data-ref="Eckardt2015" title="Source 103">103</sup>',
  wrong:'Autosomal dominant tubulointerstitial kidney disease (ADTKD-UMOD), formerly "familial juvenile hyperuricaemic nephropathy". <sup class="c" data-ref="Eckardt2015" title="Source 103">103</sup>',
  drug:'None specific.'}
];
inits.urate=()=>{
  const svg=$('#urSvg'),rg=$('#urT');let q=false,bal='healthy',hl=null;
  const ph=(t,k,n)=>((t*n+k)%1+1)%1;
  /* point at fraction u along a polyline */
  const along=(P,u)=>{let L=0;const seg=[];for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(d);L+=d}
    let r=u*L;for(let i=0;i<seg.length;i++){if(r<=seg[i]){const f=seg[i]?r/seg[i]:0;return [lerp(P[i][0],P[i+1][0],f),lerp(P[i][1],P[i+1][1],f)]}r-=seg[i]}return P[P.length-1]};
  const dot=(x,y,o=1,r=3.4)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--gold);stroke:var(--panel);stroke-width:.8;opacity:${f1(o)}"/>`;
  function level(t){const gut=q?.33*.47:.33,B=UR_BAL[bal];
    let lv=lerp(5,5/(.67+gut),ease(ramp(t,.62,.72)));
    return lerp(lv,clamp(5*B.prod/(B.kid+gut),0,9.6),ease(ramp(t,.82,.92)))}
  /* ---- pathway column (same coordinates in both layouts) ---- */
  function pathway(t){
    let s='';const o1=ramp(t,0,.06),o2=ramp(t,.2,.27),o3=ramp(t,.4,.47);
    /* flowing purine → urate, drawn first so the boxes cover it: dots show in the arrow gaps */
    if(t>.03){const yMax=t<.2?150:300;for(let k=0;k<8;k++){const u=ph(t,k/8,7),y=lerp(46,yMax,u),c=y>262?'var(--gold)':'var(--muted)';
      s+=`<circle cx="118" cy="${f1(y)}" r="4" style="fill:${c};opacity:${f1(o1*(1-ramp(u,.92,1)))}"/>`}}
    const box=(y,a,b,st,o=1)=>`<g style="opacity:${f1(o)}"><rect x="30" y="${y-17}" width="176" height="34" rx="9" style="${st}"/><text x="118" y="${y-1}" class="t-lbl t-mid">${a}</text>${b?`<text x="118" y="${y+11}" class="t-xs t-mid">${b}</text>`:''}</g>`;
    const nst='fill:var(--panel);stroke:var(--line);stroke-width:1.5';
    /* sources */
    [['diet',52],['cell turnover',118],['de novo',184]].forEach(([l,x],i)=>{s+=`<g style="opacity:${f1(o1)}"><text x="${x}" y="18" class="t-xs t-mid" style="font-weight:700${hl==='PRPS'&&i===2?';fill:var(--terra)':''}">${l}</text><path d="M${x} 24 L${lerp(x,118,.6)} 48" class="arrow" marker-end="url(#urA)"/></g>`});
    s+=box(70,'Purine nucleotides','AMP · GMP · IMP',hl==='PRPS'?'fill:var(--terra-soft);stroke:var(--terra);stroke-width:2':nst);
    s+=`<path d="M118 87 V129" class="arrow" marker-end="url(#urA)"/><text x="126" y="113" class="t-xs">via inosine</text>`;
    s+=box(150,'Hypoxanthine','',nst);
    /* HPRT salvage arc */
    const hs=hl==='HPRT';
    s+=`<path d="M30 150 C6 150 6 70 26 70" style="fill:none;stroke:var(--good);stroke-width:${hs?3:1.8};stroke-dasharray:5 3" marker-end="url(#urG)"/><text x="12" y="${hs?106:106}" class="t-xs" transform="rotate(-90 12 110)" style="fill:var(--good);font-weight:700;text-anchor:middle">HPRT salvage</text>`;
    if(hs)s+=`<circle cx="10" cy="110" r="18" style="fill:var(--good);opacity:.15"/>`;
    /* XO steps */
    const xs=hl==='XOR',xo=(y)=>{let g=`<g style="opacity:${f1(Math.max(o2,.25))}"><rect x="140" y="${y-11}" width="52" height="22" rx="11" style="fill:${xs?'var(--warn-soft)':'var(--panel)'};stroke:var(--warn);stroke-width:${xs?2.5:1.5}"/><text x="166" y="${y+4}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">XO</text>`;
      if(o2>0)for(let k=0;k<3;k++){const a=t*40+k*2.1,r=16+4*Math.sin(t*30+k);g+=`<circle cx="${f1(198+r*Math.cos(a)*.6)}" cy="${f1(y-8+r*Math.sin(a)*.5)}" r="2" style="fill:var(--warn);opacity:${f1(o2*.8)}"/>`}
      return g+'</g>'};
    s+=`<path d="M118 167 V208" class="arrow" marker-end="url(#urA)"/>`+xo(188);
    s+=`<text x="36" y="196" class="t-xs">guanine</text><path d="M58 200 L74 207" class="arrow" marker-end="url(#urA)"/>`;
    s+=box(225,'Xanthine','',nst);
    s+=`<path d="M118 242 V283" class="arrow" marker-end="url(#urA)"/>`+xo(263);
    s+=box(300,'Urate','monosodium urate at pH 7.4','fill:var(--gold-soft);stroke:var(--gold);stroke-width:2');
    if(o2>0)s+=`<text x="210" y="${xs?226:226}" class="t-xs" style="fill:var(--warn);opacity:${f1(o2)}">ROS</text>`;
    /* uricase, lost */
    const us=hl==='UOX',o3v=Math.max(o3,us?1:.0);
    if(o3v>0){s+=`<g style="opacity:${f1(o3v)}"><path d="M118 317 V363" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      s+=`<rect x="140" y="329" width="66" height="22" rx="11" style="fill:${us?'var(--bad-soft)':'var(--panel)'};stroke:var(--bad);stroke-width:${us?2.5:1.5}"/><text x="173" y="344" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">uricase</text>`;
      s+=`<path d="M108 330l20 20M128 330l-20 20" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
      s+=box(380,'Allantoin','≈ 100× more soluble','fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 3',.6)+'</g>'}
    return s;
  }
  /* ---- serum urate gauge ---- */
  function gauge(t,x,top,bot){
    const Y=v=>lerp(bot,top,v/10),lv=level(t);let s='';
    s+=`<text x="${x+20}" y="${top-24}" class="t-sm t-mid">serum</text><text x="${x+20}" y="${top-12}" class="t-sm t-mid">urate</text>`;
    s+=`<rect x="${x}" y="${top}" width="40" height="${bot-top}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${x+4}" y="${f1(Y(lv))}" width="32" height="${f1(bot-4-Y(lv))}" rx="9" style="fill:var(--gold);opacity:.9"/>`;
    [0,2,4,8,10].forEach(v=>s+=`<line x1="${x+40}" x2="${x+45}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="axis"/><text x="${x+48}" y="${f1(Y(v)+3)}" class="t-xs">${v}</text>`);
    const sy=Y(6.8);s+=`<line x1="${x-6}" x2="${x+46}" y1="${f1(sy)}" y2="${f1(sy)}" style="stroke:var(--xtal);stroke-width:2;stroke-dasharray:4 2"/><text x="${x+48}" y="${f1(sy+3)}" class="t-xs" style="fill:var(--xtal);font-weight:700">6.8</text>`;
    s+=`<text x="${x+20}" y="${bot+14}" class="t-xs t-mid">mg/dL</text>`;
    const o3=bump(t,.4,.62);
    if(o3>0)s+=`<g style="opacity:${f1(o3)}"><rect x="${x+2}" y="${f1(Y(2))}" width="36" height="${f1(Y(1)-Y(2))}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:3 2"/><text x="${x-4}" y="${f1(Y(1.5)+3)}" class="t-xs t-end" style="font-weight:700">mice</text></g>`;
    return s;
  }
  /* ---- scene panels, local 350 × 370 ---- */
  function p1(t){let s=`<text x="0" y="14" class="t-lbl">Where urate is made</text>`;
    s+=`<path d="M8 52 Q14 26 52 28 Q92 28 96 46 Q98 66 70 78 Q42 90 22 82 Q4 74 8 52 Z" style="fill:var(--memb);opacity:.35;stroke:var(--memb);stroke-width:1.5"/><text x="52" y="58" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">liver</text>`;
    s+=`<text x="110" y="44" class="t-lbl">Liver: main site</text><text x="110" y="60" class="t-xs">XOR also in gut, muscle, heart,</text><text x="110" y="72" class="t-xs">mammary gland and vessel lining</text>`;
    const o=ramp(t,.2,.28);
    s+=`<g style="opacity:${f1(Math.max(o,.3))}"><rect x="0" y="100" width="56" height="24" rx="12" style="fill:var(--panel);stroke:var(--warn)"/><text x="28" y="116" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">XDH</text>`;
    s+=`<path d="M62 112 H124" class="arrow" marker-end="url(#urA)"/><rect x="130" y="100" width="56" height="24" rx="12" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="158" y="116" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">XO</text>`;
    s+=`<text x="196" y="110" class="t-xs">oxidation (reversible)</text><text x="196" y="122" class="t-xs">or proteolysis</text></g>`;
    const g=ease(ramp(t,.04,.18)),BX=86,BW=200;
    s+=`<text x="0" y="158" class="t-sm" style="fill:var(--ink)">Urate made per day · 2023 estimate</text>`;
    [['men',648],['women',489],['all',591]].forEach(([l,v],i)=>{const y=168+i*20;s+=`<text x="0" y="${y+11}" class="t-xs">${l}</text><rect x="${BX-30}" y="${y}" width="${f1(BW*v/700*g)}" height="13" rx="4" style="fill:var(--gold);opacity:${i===2?1:.7}"/><text x="${f1(BX-30+BW*v/700*g+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${v} mg</text>`});
    s+=`<text x="0" y="248" class="t-sm" style="fill:var(--ink)">Urate pool · isotope studies</text>`;
    [['men',1200,'1,200 mg'],['women',600,'600 mg']].forEach(([l,v,lb],i)=>{const y=258+i*20;s+=`<text x="0" y="${y+11}" class="t-xs">${l}</text><rect x="${BX-30}" y="${y}" width="${f1(BW*v/1400*g)}" height="13" rx="4" style="fill:var(--gold);opacity:.55"/><text x="${f1(BX-30+BW*v/1400*g+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${lb}</text>`});
    s+=`<text x="0" y="320" class="t-xs">Production: 123 anuric dialysis patients.</text><text x="0" y="334" class="t-xs">Pools: radio-isotope studies over 50 years old.</text>`;
    return s}
  function p2(t){let s=`<text x="0" y="14" class="t-lbl">Uricase: lost in apes</text>`;
    const X=v=>lerp(118,340,v/8),g=ease(ramp(t,.42,.5));
    s+=`<line x1="${f1(X(6.8))}" x2="${f1(X(6.8))}" y1="34" y2="110" style="stroke:var(--xtal);stroke-width:2;stroke-dasharray:4 2"/><text x="${f1(X(6.8))}" y="30" class="t-xs t-mid" style="fill:var(--xtal);font-weight:700">6.8 saturation</text>`;
    [['Rats, mice',1,2,'var(--muted)'],['Men (reference)',3.5,7,'var(--gold)'],['Women, premenop.',2.6,5.7,'var(--gold)']].forEach(([l,a,b,c],i)=>{const y=44+i*24;
      s+=`<text x="0" y="${y+10}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${f1(X(a))}" y="${y}" width="${f1((X(b)-X(a))*g)}" height="13" rx="6" style="fill:${c};opacity:${i===2?.55:.9}"/>`});
    s+=`<line x1="118" x2="340" y1="116" y2="116" class="axis"/>`;[0,2,4,6,8].forEach(v=>s+=`<text x="${f1(X(v))}" y="130" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="340" y="144" class="t-xs t-end">mg/dL</text>`;
    /* cladogram */
    const o=ramp(t,.44,.52),ln='stroke:var(--muted);stroke-width:2;fill:none';
    s+=`<g style="opacity:${f1(o)}"><text x="0" y="170" class="t-sm" style="fill:var(--ink)">Who lost it</text>`;
    s+=`<path d="M10 270 H50 M50 200 V300 M50 200 H200 M50 300 H90 M90 236 V330 M90 236 H200 M90 330 H130 M130 300 V350 M130 300 H200 M130 350 H200" style="${ln}"/>`;
    s+=`<text x="10" y="290" class="t-xs">apes</text>`;
    [['Gibbon',200],['Orangutan',236],['Chimpanzee',300],['Human',350]].forEach(([l,y])=>s+=`<text x="206" y="${y+4}" class="t-lbl">${l}</text>`);
    const X2=(x,y)=>`<path d="M${x-6} ${y-6}l12 12M${x+6} ${y-6}l-12 12" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
    s+=X2(150,200)+`<text x="150" y="190" class="t-xs t-mid" style="fill:var(--bad)">separate loss</text>`;
    s+=X2(70,300)+`<text x="4" y="336" class="t-xs" style="fill:var(--bad)">shared: codon 33</text><text x="4" y="348" class="t-xs" style="fill:var(--bad)">CGA→TGA, exon 2</text>`;
    s+=`<text x="96" y="170" class="t-xs">· two independent losses</text></g>`;
    return s}
  function p3(t){let s=`<text x="0" y="14" class="t-lbl">Kidney tubule</text>`;
    s+=`<rect x="0" y="24" width="350" height="34" rx="6" style="fill:var(--panel-2)"/><text x="6" y="36" class="t-xs">tubule lumen → urine</text>`;
    s+=`<rect x="0" y="62" width="350" height="88" rx="4" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><text x="6" y="108" class="t-xs">tubule cell</text>`;
    s+=`<rect x="0" y="154" width="350" height="32" rx="6" style="fill:var(--terra-soft);opacity:.7"/><text x="6" y="180" class="t-xs">blood</text>`;
    const T=(id,x,y,lab,col,dash)=>{const on=hl===id,bad=q&&id==='ABCG2';
      return `<g>${on?`<rect x="${x-30}" y="${y-15}" width="60" height="30" rx="15" style="fill:${col};opacity:.2"/>`:''}<rect x="${x-24}" y="${y-9}" width="48" height="18" rx="9" style="fill:var(--panel);stroke:${bad?'var(--bad)':col};stroke-width:${on?3:1.8};${dash?'stroke-dasharray:3 2':''}"/><text x="${x}" y="${y+4}" class="t-xs t-mid" style="fill:${bad?'var(--bad)':col};font-weight:700">${lab}</text></g>`};
    const RE='var(--warn)',SE='var(--sea)';
    /* dots first, transporters on top */
    const reab=[[20,42],[120,42],[120,62],[110,106],[85,150],[85,170],[20,170]];
    const bulk=[[0,46],[50,46],[50,62],[70,106],[85,150],[85,170],[0,170]];
    const sec=[[340,170],[250,170],[250,150],[230,106],[210,62],[210,42],[350,42]];
    const pl=(P,c,dash)=>`<path d="M${P.map(p=>p.join(' ')).join('L')}" style="fill:none;stroke:${c};stroke-width:2;opacity:.45;stroke-linejoin:round${dash?';stroke-dasharray:4 3':''}"/>`;
    s+=pl(reab,'var(--warn)')+pl(bulk,'var(--warn)',1)+pl(sec,'var(--sea)');
    s+=`<text x="350" y="14" class="t-xs t-end"><tspan style="fill:var(--warn);font-weight:700">— back to blood</tspan>  <tspan style="fill:var(--sea);font-weight:700">— into urine</tspan></text>`;
    for(let k=0;k<5;k++){const [x,y]=along(reab,ph(t,k/5,5));s+=dot(x,y)}
    for(let k=0;k<3;k++){const [x,y]=along(bulk,ph(t,k/3+.1,5));s+=dot(x,y,.85)}
    const nS=q?2:4;for(let k=0;k<nS;k++){const [x,y]=along(sec,ph(t,k/nS,4));s+=dot(x,y)}
    s+=T('OAT410',50,62,'OAT4/10',RE)+T('URAT1',122,62,'URAT1',RE)+T('ABCG2',210,62,'ABCG2',SE)+T('NPT',290,62,'NPT1/4',SE,1);
    s+=T('GLUT9',85,150,'GLUT9',RE)+T('OAT13',250,150,'OAT1/3',SE);
    if(q)s+=`<text x="210" y="88" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">Q141K −53%</text>`;
    if(hl==='UMOD')s+=`<rect x="1" y="25" width="348" height="160" rx="6" style="fill:none;stroke:var(--terra);stroke-width:2.5;stroke-dasharray:6 4"/>`;
    s+=`<text x="0" y="204" class="t-sm" style="fill:var(--ink)">≥ 90% of filtered urate comes back · FEUA 5–15%</text>`;
    /* gut */
    s+=`<text x="0" y="230" class="t-lbl">Gut</text>`;
    s+=`<rect x="40" y="238" width="310" height="22" rx="6" style="fill:var(--terra-soft);opacity:.7"/><text x="46" y="253" class="t-xs">blood</text>`;
    s+=`<rect x="40" y="262" width="310" height="34" rx="4" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><text x="46" y="283" class="t-xs">gut cell</text>`;
    s+=`<rect x="40" y="300" width="310" height="22" rx="6" style="fill:var(--panel-2)"/><text x="46" y="315" class="t-xs">gut lumen → stool</text>`;
    const gp=[[150,249],[190,249],[200,279],[210,296],[230,311],[350,311]];const nG=q?1:3;
    for(let k=0;k<nG;k++){const [x,y]=along(gp,ph(t,k/nG+.2,4));s+=dot(x,y)}
    s+=T('ABCG2',210,296,'ABCG2',SE);
    /* split */
    const kw=q?.78:.67;const W=350;
    s+=`<rect x="0" y="336" width="${f1(W*kw)}" height="14" rx="4" style="fill:var(--sea)"/><rect x="${f1(W*kw+2)}" y="336" width="${f1(W*(1-kw)-2)}" height="14" rx="4" style="fill:var(--sea);opacity:.45"/>`;
    s+=`<text x="4" y="364" class="t-xs" style="fill:var(--ink);font-weight:700">kidney ≈ 2/3</text><text x="346" y="364" class="t-xs t-end" style="fill:var(--ink);font-weight:700">${q?'gut export ↓':'gut ≈ 1/3'}</text>`;
    return s}
  function p4(t){const B=UR_BAL[bal],gut=q?.33*.47:.33,lv=level(t);
    let s=`<text x="0" y="14" class="t-lbl">In vs out · ${B.n}</text>`;
    const pw=v=>f1(Math.max(2,v*16));
    /* inflow */
    s+=`<path d="M10 44 H175 V82" style="fill:none;stroke:var(--gold);stroke-width:${pw(B.prod*.6)};stroke-linejoin:round;opacity:.75"/>`;
    s+=`<text x="10" y="34" class="t-xs" style="fill:var(--ink);font-weight:700">${bal==='over'?'more made':'made: ≈ 591 mg/day'}</text>`;
    /* tank */
    const T0=82,T1=262,lvY=lerp(T1,T0,lv/10);
    s+=`<rect x="120" y="${T0}" width="110" height="${T1-T0}" rx="6" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`;
    s+=`<rect x="122" y="${f1(lvY)}" width="106" height="${f1(T1-2-lvY)}" rx="4" style="fill:var(--gold);opacity:.8"/>`;
    const sy=lerp(T1,T0,.68);s+=`<line x1="114" x2="236" y1="${f1(sy)}" y2="${f1(sy)}" style="stroke:var(--xtal);stroke-width:2;stroke-dasharray:4 2"/><text x="112" y="${f1(sy+4)}" class="t-xs t-end" style="fill:var(--xtal);font-weight:700">6.8 saturation</text>`;
    s+=`<text x="175" y="${T0+14}" class="t-xs t-mid">body urate</text>`;
    /* outflows */
    s+=`<path d="M230 236 H300 V330" style="fill:none;stroke:var(--sea);stroke-width:${pw(B.kid)};stroke-linejoin:round"/>`;
    if(bal==='under')s+=`<path d="M262 ${236-14} l6 10 6-10 M262 ${236+14} l6 -10 6 10" style="fill:none;stroke:var(--bad);stroke-width:2.2"/>`;
    s+=`<text x="304" y="346" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">kidney</text>`;
    s+=`<path d="M150 262 V330" style="fill:none;stroke:var(--sea);stroke-width:${pw(gut)};opacity:.6"/><text x="150" y="346" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">gut${q?' (Q141K)':''}</text>`;
    /* moving urate */
    for(let k=0;k<4;k++){const [x,y]=along([[10,44],[175,44],[175,82]],ph(t,k/4,5));s+=dot(x,y,1,3.2*Math.sqrt(B.prod))}
    const nk=Math.max(1,Math.round(4*B.kid/.67));for(let k=0;k<nk;k++){const [x,y]=along([[230,236],[300,236],[300,330]],ph(t,k/nk,5));s+=dot(x,y)}
    const ng=Math.max(1,Math.round(3*gut/.33));for(let k=0;k<ng;k++){const [x,y]=along([[150,262],[150,330]],ph(t,k/ng+.3,5));s+=dot(x,y,.8)}
    const words=B.txt.split(' '),lines=[''];words.forEach(w=>{if((lines[lines.length-1]+' '+w).trim().length>19)lines.push(w);else lines[lines.length-1]=(lines[lines.length-1]+' '+w).trim()});
    lines.forEach((l,i)=>s+=`<text x="246" y="${96+i*13}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    s+=`<text x="350" y="364" class="t-xs t-end">pipe widths and level: schematic</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 420','400 800');
    const L=N?{gx:262,gt:58,gb:392,px:25,py:418}:{gx:252,gt:58,gb:392,px:358,py:30};
    let s=`<defs>${marker('urA')}${marker('urG','var(--good)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=pathway(t);
    s+=gauge(t,L.gx,L.gt,L.gb);
    /* urate leaves the pathway into the blood */
    s+=`<path d="M206 300 H${L.gx-8}" class="arrow" marker-end="url(#urA)" style="opacity:${f1(ramp(t,.22,.3))}"/>`;
    const pi=t<.4?0:t<.6?1:t<.8?2:3,st=[0,.4,.6,.8][pi],o=ramp(t,st,st+.05);
    const body=[p1,p2,p3,p4][pi](t);
    s+=`<g transform="translate(${L.px} ${L.py})" style="opacity:${f1(pi?o:1)}">${N?`<line x1="0" x2="350" y1="-10" y2="-10" class="axis"/>`:`<line x1="-12" x2="-12" y1="0" y2="370" class="axis"/>`}${body}</g>`;
    svg.innerHTML=s;
    const p=phaseOf(UR_STEPS,t);setSt(p);
    let extra='';
    if(q&&p>=3)extra+=`<div class="hook"><b>ABCG2 Q141K is on</b>This common variant (rs2231142) cut urate transport by 53%, raised gout odds 1.68-fold per allele, and accounts for at least 10% of gout in white people. <sup class="c" data-ref="Woodward2009" title="Source 432">432</sup></div>`;
    if(p===4)extra+=`<div class="pt"><b>Balance shown: ${UR_BAL[bal].n}</b>${UR_BAL[bal].txt}</div>`;
    $('#urNote').innerHTML=noteHTML(UR_STEPS[p])+extra;
    $('#urCap').textContent=`${q?'ABCG2 Q141K':'Usual ABCG2'} · balance: ${UR_BAL[bal].n.toLowerCase()}. Schematic, not to scale; the gauge level, pipe widths and dot counts are illustrative.`;
  }
  const stop=playWire(rg,$('#urPlay'),draw,20000,'Replay','urate');
  const setSt=stepWire($('#urSteps'),UR_STEPS,rg,draw,stop);
  const tog=v=>{q=v;$('#urWT').setAttribute('aria-pressed',!v);$('#urQK').setAttribute('aria-pressed',v);if(+rg.value<.6){stop();rg.value=.72}draw(+rg.value)};
  $('#urWT').onclick=()=>tog(false);$('#urQK').onclick=()=>tog(true);
  $('#urBal').innerHTML=Object.keys(UR_BAL).map(k=>`<button class="btn" data-bal="${k}" aria-pressed="${k==='healthy'}">${UR_BAL[k].n}</button>`).join('');
  $('#urBal').addEventListener('click',e=>{const b=e.target.closest('[data-bal]');if(!b)return;bal=b.dataset.bal;
    $$('[data-bal]',$('#urBal')).forEach(x=>x.setAttribute('aria-pressed',x===b));if(+rg.value<.8){stop();rg.value=.92}draw(+rg.value)});
  /* transporter chips: highlight in the scene, jump to where it lives */
  function pick(id,jump){const X=UR_TX.find(x=>x.id===id);hl=X.hl;
    $$('[data-tx]',$('#urChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.tx===id));
    $('#urTx').innerHTML=`<span class="kicker">${X.g}</span><h4>${X.id}</h4><dl><dt>Where</dt><dd>${X.where}</dd><dt>What it does</dt><dd>${X.does}</dd><dt>When it goes wrong</dt><dd>${X.wrong}</dd><dt>Drugs that act here</dt><dd>${X.drug}</dd></dl>`;
    if(jump){const sc=phaseOf(UR_STEPS,+rg.value),want=phaseOf(UR_STEPS,X.to);if(sc!==want){stop();rg.value=X.to}draw(+rg.value)}}
  $('#urChips').innerHTML=UR_TX.map(x=>`<button class="btn" data-tx="${x.id}" aria-pressed="false">${x.id}</button>`).join('');
  $('#urChips').addEventListener('click',e=>{const b=e.target.closest('[data-tx]');if(b)pick(b.dataset.tx,true)});
  pick('URAT1',false);
  draw(+rg.value);

  $('#urGenes').innerHTML=`
   <div class="card"><span class="kicker">Urate variance explained</span><span class="big">23.9% vs ≤ 0.3%</span><p>In 16,760 US adults of European ancestry, common genetic variation explained 23.9% of the variation in serum urate; each diet score explained 0.3% or less. <span class="ev est">Established</span> <sup class="c" data-ref="Major2018" title="Source 244">244</sup></p></div>
   <div class="card"><span class="kicker">Heritability</span><span class="big">30–60%</span><p>Serum urate heritability as given by Tin et al.; one pedigree study estimated 37% (95% credible interval 29–45%). <sup class="c" data-ref="Tin2019" title="Source 412">412</sup> Another review gives 40–70% for gout risk and serum urate. <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup></p></div>
   <div class="card"><span class="kicker">GWAS loci</span><span class="big">28 → 183 → 377</span><p>28 urate loci in 2013 <sup class="c" data-ref="Kottgen2013" title="Source 217">217</sup>; 183 in 457,690 people in 2019, explaining 7.7% of urate variance and pointing to kidney and liver <sup class="c" data-ref="Tin2019" title="Source 412">412</sup>; 377 gout loci in 2.6 million people in 2024, including NLRP3 inflammasome genes. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Major2024" title="Source 246">246</sup></p></div>
   <div class="card"><span class="kicker">Genetic risk score</span><span class="big">0.1% → 12.9%</span><p>Gout prevalence from the lowest to the highest urate genetic-risk category in 334,880 UK Biobank participants (adjusted OR 0.09 to 13.6). With age and sex the score gave an AUC of 0.84. <sup class="c" data-ref="Tin2019" title="Source 412">412</sup></p></div>
   <div class="card"><span class="kicker">From urate to gout</span><p>Excretion by kidney and gut dominates the genetic control of serum urate. Inflammasome-pathway genes help decide who goes on from high urate to gout. <sup class="c" data-ref="Major2018Genet" title="Source 245">245</sup></p></div>
   <div class="card"><span class="kicker">Genes meet medicines</span><p>In 3,524 people with hypertension, thiazide or loop diuretics went with gout (OR 2.13) only in those with a high genetic urate score; OR 0.40 (not significant) with a low score. <sup class="c" data-ref="McAdamsDeMarco2013" title="Source 253">253</sup></p></div>
   <div class="card"><span class="kicker">So is diet irrelevant?</span><p>No, but it answers a different question. In US men, body weight, alcohol, diet and diuretics together accounted for 77% of new gout. <sup class="c" data-ref="McCormick2020" title="Source 256">256</sup> The ACR 2020 panel asked clinicians to be mindful when asking about diet, given the strong genetic contribution. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> More in <a href="#living" data-go="living">Living with gout</a>.</p></div>`;
  $('#urWhy').innerHTML=`
   <div class="card"><h4>An antioxidant <span class="ev hyp">Hypothesis</span></h4><p>In vitro, urate is about as effective an antioxidant as ascorbate, and plasma urate (about 300 µM, ≈ 5.0 mg/dL) far exceeds plasma ascorbate. Perhaps it helped longer lives. <sup class="c" data-ref="Ames1981" title="Source 8">8</sup> Inside cells urate may act as a pro-oxidant instead. <sup class="c" data-ref="Sautin2008" title="Source 348">348</sup></p></div>
   <div class="card"><h4>A stand-in for vitamin C <span class="ev hyp">Hypothesis</span></h4><p>Urate may have risen to make up for the lost ability to make ascorbic acid. <sup class="c" data-ref="Furuhashi2020" title="Source 141">141</sup></p></div>
   <div class="card"><h4>Blood pressure on a low-salt diet <span class="ev hyp">Hypothesis</span></h4><p>In rats, mild hyperuricaemia raised blood pressure by a renin-dependent route, most clearly on low salt. The proposed advantage dates to the Miocene. <sup class="c" data-ref="Watanabe2002" title="Source 426">426</sup></p></div>
   <div class="card"><h4>Fructose to fat <span class="ev hyp">Hypothesis</span></h4><p>Resurrected ancestral uricases in liver cells support the idea that losing uricase helped fruit-eating apes turn fructose into fat when forests changed. <sup class="c" data-ref="Kratzer2014" title="Source 219">219</sup></p></div>
   <div class="card"><h4>Kidney and enzyme changed together <span class="ev early">Early evidence</span></h4><p>URAT1's grip on uric acid tightened during primate evolution as uricase activity fell, 27–77 million years ago. <sup class="c" data-ref="Tan2016" title="Source 395">395</sup></p></div>
   <div class="card"><h4>The drug that puts it back</h4><p>Pegloticase is a PEGylated recombinant uricase: it turns uric acid into allantoin, which the kidneys clear. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup> See <a href="#ult" data-go="ult">How urate-lowering drugs work</a>.</p></div>`;
  $('#urTypes').innerHTML=`
   <tr class="hl"><th>Renal under-excretion</th><td>The kidney clears too little for the load: low urate clearance and FEUA.</td><td>The main mechanism in primary gout, even in "high output" patients. <sup class="c" data-ref="PerezRuiz2002Renal,So2010" title="Source 313,372">313,372</sup></td><td>Common variants in GLUT9, URAT1 and ABCG2 <sup class="c" data-ref="Vitart2008,Woodward2009" title="Source 421,432">421,432</sup>; diuretics <sup class="c" data-ref="HalperinKuhns2021" title="Source 153">153</sup>; ADTKD-UMOD <sup class="c" data-ref="Eckardt2015" title="Source 103">103</sup></td></tr>
   <tr><th>Renal overload: gut under-excretion</th><td>ABCG2 dysfunction cuts export into the gut; urinary urate rises.</td><td>Proposed for many people once called overproducers. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Ichida2012" title="Source 174">174</sup></td><td>ABCG2 Q141K, Q126X <sup class="c" data-ref="Woodward2009,Matsuo2009" title="Source 252,432">252,432</sup></td></tr>
   <tr><th>Renal overload: true overproduction</th><td>More urate is made than usual.</td><td>Rare.</td><td>HPRT deficiency, about 1 in 380,000 live births in Canada <sup class="c" data-ref="Torres2007" title="Source 413">413</sup>; PRPS1 superactivity <sup class="c" data-ref="deBrouwer2010" title="Source 88">88</sup></td></tr>`;
};

/* =============== 1.3 crystals vs serum urate =============== */
const CR_STEPS=[
 {from:0,at:.06,k:'Years 0–4',t:'Above saturation: nucleation',
  txt:'Plasma is saturated with urate at about 6.8 mg/dL (405 µmol/L) <sup class="c" data-ref="Martillo2014" title="Source 249">249</sup>. Above that point urate can leave solution in three stages: solubility, then nucleation, then growth. A high urate concentration drives all three, and no other factor was found to promote growth specifically <sup class="c" data-ref="Chhana2015" title="Source 44">44</sup>. Crystals deposit preferentially at the first MTP, the femoral condyle and the Achilles and patellar tendons <sup class="c" data-ref="Chhana2015" title="Source 44">44</sup>.',
  pt:'When there is more urate than the joint fluid can hold, tiny needle-shaped crystals start to form on the cartilage.',
  hook:'Urate saturation is about <b>6.8 mg/dL</b> (405 µmol/L) at 37 °C, and about 6.0 mg/dL at 35 °C <sup class="c" data-ref="Martillo2014" title="Source 249">249</sup>.'},
 {from:.27,at:.36,k:'Years 4–6',t:'Silent growth',
  txt:'Deposits can build with no symptoms. Dual-energy CT of the feet found urate in 6 of 25 (24%) asymptomatic people with urate ≥ 540 µmol/L (≈ 9.1 mg/dL) <sup class="c" data-ref="Dalbeth2015" title="Source 79">79</sup>. On ultrasound, 25% of first MTPs in asymptomatic hyperuricaemic people had a double-contour sign, a crust of crystals on the cartilage, against none in normouricaemic controls <sup class="c" data-ref="Pineda2011" title="Source 316">316</sup>. This is the asymptomatic MSU crystal deposition stage; "gout" is kept for disease that has shown itself as a flare, chronic gouty arthritis or a tophus <sup class="c" data-ref="Bursill2019ARD" title="Source 32">32</sup>.',
  pt:'Crystals can pile up for years before the first painful flare. A scan may show them even when nothing hurts.',
  hook:'Deposition without symptoms is <b>not yet gout</b>. G-CAN calls it asymptomatic MSU crystal deposition <sup class="c" data-ref="Bursill2019ARD" title="Source 32">32</sup>.'},
 {from:.44,at:.458,k:'Year 7',t:'Shedding sets off a flare',
  txt:'A big deposit alone does not cause a flare: people with tophi do not necessarily have flares <sup class="c" data-ref="Joosten2010" title="Source 188">188</sup>. Crystals have to meet primed immune cells (see <a href="#flare" data-go="flare">A flare, hour by hour</a>). Flares are 2.36 times as likely to start overnight as in the daytime <sup class="c" data-ref="Choi2015" title="Source 58">58</sup>. Serum urate often falls during a flare: in one study it was 7.5 ± 1.4 mg/dL during flares against 8.5 ± 0.9 mg/dL between them, and normal in 20 of 41 people (49%) <sup class="c" data-ref="Urano2002" title="Source 416">416</sup>. The dip in the gold trace shows this.',
  pt:'One day some crystals come loose and the joint flares. Your blood urate may even look normal that day.',
  hook:'A normal serum urate during a flare does not rule out gout. The criteria prefer a level taken more than 4 weeks after the flare began <sup class="c" data-ref="Urano2002,Neogi2015" title="Source 290,416">290,416</sup>.'},
 {from:.6,at:.66,k:'Year 9 onward',t:'Urate below 6: crystals dissolve',
  txt:'EULAR 2016 sets a target below 6 mg/dL (360 µmol/L), or below 5 mg/dL (300 µmol/L) in severe gout <sup class="c" data-ref="Richette2017" title="Source 331">331</sup>, and ACR 2020 strongly recommends treating to below 6 mg/dL <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>. A target under saturation keeps the concentration gradient in favour of dissolution <sup class="c" data-ref="Martillo2014,Richette2017" title="Source 249,331">249,331</sup>. In 63 people with tophaceous gout, tophi shrank faster the lower the mean urate on treatment, in a straight-line relation. Benzbromarone and allopurinol worked equally well once they reached the same urate <sup class="c" data-ref="PerezRuiz2002" title="Source 312">312</sup>. Flares often rise in the first months: the US allopurinol label puts this down to urate mobilised from tissue deposits <sup class="c" data-ref="FDA-Zyloprim" title="Source 129">129</sup>, and crystals shed from shrinking deposits is one proposed reason <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Martillo2014" title="Source 249">249</sup>.',
  pt:'Medicine pulls urate under the line, so the crystals slowly melt. Flares can pick up for a few months while that starts.',
  hook:'The target (&lt; 6 mg/dL) sits <b>below</b> saturation (6.8 mg/dL), so the gradient favours dissolution. Lower urate, faster tophus shrinkage <sup class="c" data-ref="Martillo2014,PerezRuiz2002" title="Source 249,312">249,312</sup>.'},
 {from:.8,at:.97,k:'Years 12–15',t:'Crystal-free if urate stays low',
  txt:'In 18 joints aspirated every 3 months on treatment, crystals disappeared from all 18 after 3 to 33 months, and the time tracked gout duration <sup class="c" data-ref="Pascual2007" title="Source 308">308</sup>. Some crystals linger: 7 of 16 knees (44%) still held them after more than 12 months at ≤ 6 mg/dL <sup class="c" data-ref="LiYu2001" title="Source 235">235</sup>. Sustained urate lowering dissolves crystals and so prevents flares and tophi <sup class="c" data-ref="Dalbeth2021" title="Source 85">85</sup>. Stopping treatment lets the urate pool rebuild, and ACR 2020 conditionally recommends continuing urate-lowering therapy indefinitely <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>.',
  pt:'If urate stays low long enough, the crystals can go completely and the flares stop. Stop the medicine and urate climbs back.',
  hook:'Crystal clearance takes <b>months to years</b>, longer with longer disease <sup class="c" data-ref="Pascual2007" title="Source 308">308</sup>. That is why gout treatment is long-term.'}
];
const CR_HR=[['< 6',1],['6.0–6.9',2.7],['7.0–7.9',6.6],['8.0–8.9',15],['9.0–9.9',30],['≥ 10',64]];
inits.crystals=()=>{
  const svg=$('#crSvg'),rg=$('#crT');
  let ut=5,temp=37;
  const YRS=15,DT=.01,NS=Math.round(YRS/DT),ULT0=9,PRE=[6.8,8.2],POST=[9.5,11,12.6,14.2];
  const mmol=v=>v===6.8?405:v===6?357:Math.round(v*59.48);
  /* needles: a crust on both cartilage surfaces (the double contour) and a tophus at the joint edge */
  const r=rng(1313);const ND=[];
  for(let i=0;i<54;i++){const top=i%2===0;ND.push({x:.06+r()*.6,y:top?.262+r()*.02:.738-r()*.02,a:(r()-.5)*24,l:.7+r()*.4,k:r()*.55})}
  for(let i=0;i<86;i++){const a=r()*Math.PI*2,d=Math.sqrt(r());ND.push({x:.8+Math.cos(a)*d*.12,y:.5+Math.sin(a)*d*.2,a:r()*180,l:.7+r()*.5,k:.2+r()*.8})}
  ND.sort((p,q)=>p.k-q.k);
  const SH=Array.from({length:10},()=>({x:.12+r()*.55,y:.34+r()*.32,a:r()*180,ph:r()}));
  const NE=Array.from({length:5},()=>({x:.15+r()*.5,y:.36+r()*.28,ph:r()}));
  function sim(){const S=temp===37?6.8:6.0,U=[],M=[];let m=0,nuc=0;
    for(let i=0;i<=NS;i++){const y=i*DT;
      let u=7+1.6*ease(ramp(y,0,3))+.25*Math.sin(1.7*y)+.15*Math.sin(4.3*y+1);
      PRE.forEach(f=>{u-=1.0*bump(y,f-.25,f+.3)});
      if(ut!=null)u=lerp(u,ut,ease(ramp(y,ULT0,ULT0+.8)));
      U.push(u);
      if(i){const ex=u-S;if(ex>0){nuc+=ex*DT;if(nuc>.8)m+=.05*ex*DT}else if(m>0)m+=.13*ex*DT;m=clamp(m)}
      M.push(m)}
    const fl=PRE.slice();POST.forEach(f=>{const mm=M[Math.round(f/DT)];if(f===9.5&&ut!=null?mm>.2:mm>.45)fl.push(f)});
    let clear=null;for(let i=Math.round(ULT0/DT);i<=NS;i++)if(M[i]<=0){clear=i*DT;break}
    let full=null;for(let i=0;i<=NS;i++)if(M[i]>=1){full=i*DT;break}
    return{S,U,M,fl,clear,full}}
  let R=sim();
  function draw(t){
    const N=vb(svg,'720 430','400 740');
    const L=N?{tx:16,ty:14,tw:368,th:212,gx:16,gy:252,gw:368,sx0:56,sx1:384,sy0:306,sy1:384,cx0:46,cx1:388,uy:428,uh:132,fy:584,my:606,mh:66,ay:690,cap:730}
             :{tx:16,ty:22,tw:252,th:216,gx:16,gy:262,gw:252,sx0:52,sx1:266,sy0:316,sy1:388,cx0:330,cx1:704,uy:24,uh:180,fy:226,my:250,mh:80,ay:348,cap:420};
    const y=t*YRS,i=Math.min(NS,Math.round(y/DT)),u=R.U[i],m=R.M[i],S=R.S,ex=u-S;
    const fl=Math.max(0,...R.fl.map(f=>bump(y,f-.18,f+.22)));
    let s=`<defs>${marker('crA')}</defs>`;
    /* ---- joint tank ---- */
    const {tx,ty,tw,th}=L,X=v=>tx+tw*v,Yt=v=>ty+th*v;
    s+=`<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="14" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<rect x="${tx}" y="${ty}" width="${tw}" height="${f1(th*.17)}" rx="12" style="fill:var(--panel-2);stroke:var(--memb);stroke-width:1.2"/><rect x="${tx}" y="${f1(Yt(.83))}" width="${tw}" height="${f1(th*.17)}" rx="12" style="fill:var(--panel-2);stroke:var(--memb);stroke-width:1.2"/>`;
    s+=`<text x="${tx+10}" y="${f1(Yt(.1)+3)}" class="t-xs">BONE</text><text x="${tx+10}" y="${f1(Yt(.93)+3)}" class="t-xs">BONE</text>`;
    s+=`<rect x="${tx}" y="${f1(Yt(.17))}" width="${tw}" height="${f1(th*.08)}" style="fill:var(--panel);stroke:var(--memb);stroke-width:1"/><rect x="${tx}" y="${f1(Yt(.75))}" width="${tw}" height="${f1(th*.08)}" style="fill:var(--panel);stroke:var(--memb);stroke-width:1"/>`;
    s+=`<text x="${f1(X(.69))}" y="${f1(Yt(.225)+3)}" class="t-xs t-end">cartilage</text>`;
    // joint fluid tinted by urate concentration
    s+=`<rect x="${tx}" y="${f1(Yt(.25))}" width="${tw}" height="${f1(th*.5)}" style="fill:var(--gold-soft);opacity:${f1(clamp((u-2.5)/7))}"/>`;
    s+=`<rect x="${tx}" y="${f1(Yt(.25))}" width="${tw}" height="${f1(th*.5)}" style="fill:var(--terra);opacity:${(.22*fl).toFixed(2)}"/>`;
    s+=`<text x="${tx+10}" y="${f1(Yt(.5)+3)}" class="t-xs">joint fluid · ${f1(u)} mg/dL</text>`;
    // tophus outline grows with the deposit
    const tph=ramp(m,.3,.9);
    if(tph>0)s+=`<ellipse cx="${f1(X(.8))}" cy="${f1(Yt(.5))}" rx="${f1(tw*.14*(.5+.5*tph))}" ry="${f1(th*.22*(.5+.5*tph))}" style="fill:var(--xtal-soft);stroke:var(--xtal);stroke-width:1;stroke-dasharray:3 3;opacity:${f1(tph)}"/>`;
    // needles
    const nv=m*ND.length,nl=N?13:11;
    ND.forEach((n,k)=>{if(k>=nv)return;const o=clamp(nv-k);s+=needle(X(n.x),Yt(n.y),nl*n.l,n.a,o)});
    if(tph>.5)s+=`<text x="${f1(X(.8))}" y="${f1(Yt(.5)-th*.22*(.5+.5*tph)-4)}" class="t-xs t-mid" style="fill:var(--xtal)">tophus</text>`;
    if(m>.06)s+=`<text x="${f1(X(.4))}" y="${f1(Yt(.79)+3)}" class="t-xs t-mid" style="fill:var(--xtal)">${N?'crystal crust on cartilage (double contour)':'crystal crust (double contour)'}</text>`;
    // a flare: shed crystals and neutrophils
    if(fl>.02){SH.forEach(n=>{s+=needle(X(n.x)+Math.sin(y*40+n.ph*6)*3,Yt(n.y),nl,n.a+y*200,fl)});
      NE.forEach(n=>{s+=neutro(X(n.x)+Math.cos(y*30+n.ph*6)*4,Yt(n.y),N?10:8,fl)});
      s+=`<text x="${f1(X(.5))}" y="${f1(Yt(.1)+4)}" class="t-sm t-mid" style="fill:var(--terra);font-weight:700;opacity:${f1(fl)}">FLARE</text>`}
    // temperature badge
    s+=`<rect x="${f1(tx+tw-86)}" y="${ty+6}" width="80" height="20" rx="10" style="fill:var(--panel);stroke:${temp===37?'var(--line)':'var(--xtal)'}"/><text x="${f1(tx+tw-46)}" y="${ty+20}" class="t-xs t-mid" style="fill:${temp===37?'var(--muted)':'var(--xtal)'}">${temp} °C joint</text>`;
    const state=Math.abs(ex)<.05?['AT SATURATION · no net change','var(--muted)']:ex>0?['SUPERSATURATED · crystals can grow','var(--warn)']:['BELOW SATURATION · crystals dissolve','var(--sea)'];
    /* ---- gradient gauge ---- */
    const gc=L.gx+L.gw/2,gy=L.gy,gw=L.gw/2,gv=clamp(ex/3,-1,1);
    s+=`<text x="${L.gx}" y="${gy-6}" class="t-sm" style="fill:${state[1]}">${state[0]}</text>`;
    s+=`<rect x="${L.gx}" y="${gy}" width="${L.gw}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${f1(Math.min(gc,gc+gv*gw))}" y="${gy}" width="${f1(Math.abs(gv*gw))}" height="12" rx="3" style="fill:${ex>0?'var(--warn)':'var(--sea)'}"/>`;
    s+=`<line x1="${gc}" x2="${gc}" y1="${gy-3}" y2="${gy+15}" style="stroke:var(--xtal);stroke-width:2"/>`;
    s+=`<text x="${L.gx}" y="${gy+26}" class="t-xs" style="fill:var(--sea)">← dissolves</text><text x="${gc}" y="${gy+26}" class="t-xs t-mid" style="fill:var(--xtal)">saturation ${f1(S)}</text><text x="${L.gx+L.gw}" y="${gy+26}" class="t-xs t-end" style="fill:var(--warn)">grows →</text>`;
    /* ---- shrink speed vs on-treatment urate (Perez-Ruiz 2002: linear) ---- */
    const sx=v=>lerp(L.sx0,L.sx1,(v-3)/5),sy=v=>lerp(L.sy1,L.sy0,v/4);
    s+=`<text x="${L.gx}" y="${L.sy0-10}" class="t-xs">SHRINK SPEED vs URATE ON TREATMENT · relative</text>`;
    s+=`<line x1="${L.sx0}" x2="${L.sx1}" y1="${L.sy1}" y2="${L.sy1}" class="axis"/><line x1="${L.sx0}" x2="${L.sx0}" y1="${L.sy0}" y2="${L.sy1}" class="axis"/>`;
    [3,4,5,6,7,8].forEach(v=>s+=`<text x="${f1(sx(v))}" y="${L.sy1+12}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${L.sx0-4}" y="${L.sy0+8}" class="t-xs t-end">fast</text><text x="${L.sx0-4}" y="${L.sy1-2}" class="t-xs t-end">0</text>`;
    s+=`<line x1="${f1(sx(3))}" y1="${f1(sy(S-3))}" x2="${f1(sx(S))}" y2="${f1(sy(0))}" style="stroke:var(--sea);stroke-width:2.4"/><line x1="${f1(sx(S))}" y1="${f1(sy(0))}" x2="${f1(sx(8))}" y2="${f1(sy(0))}" style="stroke:var(--warn);stroke-width:2.4;stroke-dasharray:4 3"/>`;
    s+=`<text x="${f1(sx(7.4))}" y="${f1(sy(0)-5)}" class="t-xs t-mid" style="fill:var(--warn)">grows</text>`;
    if(ut!=null){const on=y>=ULT0;s+=`<circle cx="${f1(sx(ut))}" cy="${f1(sy(Math.max(0,S-ut)))}" r="5" style="fill:${on?'var(--sea)':'var(--panel)'};stroke:var(--sea);stroke-width:2"/>`}
    /* ---- urate trace ---- */
    const xy=v=>lerp(L.cx0,L.cx1,v/YRS),yv=v=>L.uy+L.uh-L.uh*(v-2)/9;
    s+=`<text x="${L.cx0}" y="${L.uy-8}" class="t-sm" style="fill:var(--gold)">SERUM URATE, mg/dL</text>`;
    s+=`<rect x="${L.cx0}" y="${f1(yv(6))}" width="${L.cx1-L.cx0}" height="${f1(yv(2)-yv(6))}" style="fill:var(--sea-soft);opacity:.8"/>`;
    s+=`<text x="${L.cx0+6}" y="${f1(yv(6)+13)}" class="t-xs" style="fill:var(--sea)">target &lt; 6 mg/dL (360 µmol/L)</text>`;
    [4,6,8,10].forEach(v=>s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${L.cx0-6}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}</text>`);
    const So=temp===37?6.0:6.8;
    s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(yv(So))}" y2="${f1(yv(So))}" style="stroke:var(--xtal);stroke-width:1;stroke-dasharray:2 4;opacity:.45"/>`;
    s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(yv(S))}" y2="${f1(yv(S))}" style="stroke:var(--xtal);stroke-width:1.8;stroke-dasharray:6 4"/>`;
    s+=`<text x="${L.cx1}" y="${f1(yv(S)-5)}" class="t-xs t-end" style="fill:var(--xtal)">saturation ${f1(S)} mg/dL (${mmol(S)} µmol/L) at ${temp} °C</text>`;
    let gd='',cd='';for(let k=0;k<=NS;k+=5){const p=f1(xy(k*DT))+' '+f1(yv(R.U[k]));gd+=(k?'L':'M')+p;if(k<=i)cd+=(k?'L':'M')+p}
    s+=`<path d="${gd}" style="fill:none;stroke:var(--gold);stroke-width:1.2;opacity:.3"/><path d="${cd}" style="fill:none;stroke:var(--gold);stroke-width:2.8"/>`;
    s+=`<circle cx="${f1(xy(y))}" cy="${f1(yv(u))}" r="5" style="fill:var(--gold)"/>`;
    if(ut!=null){s+=`<line x1="${f1(xy(ULT0))}" x2="${f1(xy(ULT0))}" y1="${L.uy}" y2="${L.my+L.mh}" style="stroke:var(--sea);stroke-width:1.6"/><text x="${f1(xy(ULT0)+4)}" y="${L.uy+10}" class="t-xs" style="fill:var(--sea)">urate-lowering therapy →</text>`}
    /* ---- flares ---- */
    s+=`<text x="${L.cx0}" y="${L.fy+4}" class="t-xs" style="fill:var(--terra)">FLARES</text>`;
    R.fl.forEach(f=>{if(f>y)return;const x=xy(f);s+=`<path d="M${f1(x-5)} ${L.fy+6} L${f1(x)} ${L.fy-10} L${f1(x+5)} ${L.fy+6}z" style="fill:var(--terra)"/>`});
    /* ---- crystal load ---- */
    const ym=v=>L.my+L.mh-L.mh*v;
    s+=`<text x="${L.cx0}" y="${L.my-4}" class="t-xs" style="fill:var(--xtal)">CRYSTAL LOAD IN THE JOINT · relative, schematic</text><line x1="${L.cx0}" x2="${L.cx1}" y1="${L.my+L.mh}" y2="${L.my+L.mh}" class="axis"/>`;
    let ma='',mg='';for(let k=0;k<=NS;k+=5){const p=f1(xy(k*DT))+' '+f1(ym(R.M[k]));mg+=(k?'L':'M')+p;if(k<=i)ma+=(k?'L':'M')+p}
    s+=`<path d="${mg}" style="fill:none;stroke:var(--xtal);stroke-width:1.2;opacity:.3"/>`;
    if(i>0)s+=`<path d="${ma}L${f1(xy(i*DT))} ${L.my+L.mh}L${L.cx0} ${L.my+L.mh}z" style="fill:var(--xtal-soft)"/><path d="${ma}" style="fill:none;stroke:var(--xtal);stroke-width:2.4"/>`;
    if(R.clear!=null&&y>=R.clear)s+=`<text x="${L.cx1}" y="${L.my+L.mh-6}" class="t-xs t-end" style="fill:var(--sea)">crystal-free in the model</text>`;
    /* ---- time axis ---- */
    for(let yr=0;yr<=YRS;yr++){const x=xy(yr);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.my+L.mh}" y2="${L.my+L.mh+4}" class="axis"/>`;if(yr%(N?3:3)===0)s+=`<text x="${f1(x)}" y="${L.ay}" class="t-xs t-mid">${yr}</text>`}
    s+=`<text x="${L.cx1}" y="${L.ay+14}" class="t-xs t-end">years</text>`;
    s+=`<line x1="${f1(xy(y))}" x2="${f1(xy(y))}" y1="${L.uy-2}" y2="${L.my+L.mh+2}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    s+=`<text x="${N?L.tx:L.cx0}" y="${L.cap}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one imagined person · slopes are relative</text>`;
    svg.innerHTML=s;
    const p=phaseOf(CR_STEPS,t);setSt(p);
    $('#crRead').innerHTML=`<span>year <b>${f1(y)}</b></span><span>serum urate <b>${f1(u)} mg/dL</b> (${mmol(u)} µmol/L)</span><span>saturation at ${temp} °C <b>${f1(S)} mg/dL</b></span><span>crystal load <b>${Math.round(m*100)}%</b> of a full joint</span>`;
    let sc;
    if(ut==null)sc=`No urate-lowering therapy: urate stays above saturation, so the deposit keeps growing${R.full!=null?` (the model joint is full by year ${f1(R.full)})`:''} and flares keep coming. About half of people with urate ≥ 10 mg/dL develop gout within 15 years <sup class="c" data-ref="Dalbeth2018ARD" title="Source 82">82</sup>.`;
    else if(Math.abs(ut-S)<.05)sc=`At ${temp} °C urate saturates at ${f1(S)} mg/dL, so a treated urate of ${ut} mg/dL sits right on the line. With no gradient, deposits neither grow nor dissolve. A lower target speeds dissolution: EULAR 2016 sets &lt; 5 mg/dL (300 µmol/L) for severe gout <sup class="c" data-ref="Richette2017,PerezRuiz2002" title="Source 312,331">312,331</sup>.`;
    else if(ut>S)sc=`${ut} mg/dL is lower than before but still above saturation (${f1(S)} mg/dL at ${temp} °C), so crystals keep slowly growing and flares continue. This is why guidelines treat to a target below 6 mg/dL, not just "lower" <sup class="c" data-ref="FitzGerald2020,Richette2017" title="Source 135,331">135,331</sup>.`;
    else sc=`On treatment, urate sits ${f1(S-ut)} mg/dL below saturation. In the model the shrink speed is proportional to that gap, following the straight-line relation between on-treatment urate and tophus shrinkage; the slope itself is schematic <sup class="c" data-ref="PerezRuiz2002" title="Source 312">312</sup>. ${R.clear!=null?`The model joint is crystal-free by about year ${f1(R.clear)}.`:'The model joint is still not clear at year 15.'}`;
    const tn=temp===35?' A cool joint: from 37 °C to 35 °C, solubility falls from 6.8 to 6.0 mg/dL (in vitro data), so the same urate builds crystals faster and a target of 6 mg/dL only holds steady. This may help explain why the big toe is the commonest site of a first flare <sup class="c" data-ref="Martillo2014,Loeb1972" title="Source 236,249">236,249</sup>.':'';
    $('#crNote').innerHTML=noteHTML(CR_STEPS[p])+`<div class="kv"><div><dt>This scenario</dt><dd>${sc}${tn}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#crPlay'),draw,22000,'Replay','crystals');
  const setSt=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  $$('[data-cru]').forEach(b=>b.onclick=()=>{ut=b.dataset.cru==='none'?null:+b.dataset.cru;$$('[data-cru]').forEach(x=>x.setAttribute('aria-pressed',x===b));R=sim();draw(+rg.value)});
  $$('[data-crtemp]').forEach(b=>b.onclick=()=>{temp=+b.dataset.crtemp;$$('[data-crtemp]').forEach(x=>x.setAttribute('aria-pressed',x===b));R=sim();draw(+rg.value)});
  draw(+rg.value);

  /* ---- 15-year risk by baseline urate (Dalbeth 2018) ---- */
  (function risk(){const el=$('#crRisk');let s='';const x0=78,x1=318,lg=v=>lerp(x0,x1,Math.log10(v)/2);
    s+=`<text x="0" y="12" class="t-xs">ADJUSTED HAZARD RATIO vs &lt; 6 mg/dL · log scale</text>`;
    [1,10,100].forEach(v=>s+=`<line x1="${f1(lg(v))}" x2="${f1(lg(v))}" y1="20" y2="182" class="grid"/><text x="${f1(lg(v))}" y="194" class="t-xs t-mid">${v}</text>`);
    CR_HR.forEach(([b,hr],k)=>{const yy=26+k*26,w=Math.max(3,lg(hr)-x0);
      s+=`<text x="${x0-8}" y="${yy+13}" class="t-sm t-end">${b}</text><rect x="${x0}" y="${yy}" width="${f1(w)}" height="18" rx="4" style="fill:var(--gold);opacity:${f1(.35+.13*k)}"/>`;
      s+=`<text x="${f1(x0+w+6)}" y="${yy+13}" class="t-lbl">${k?hr:'1 (reference)'}</text>`});
    s+=`<text x="${x0-8}" y="206" class="t-xs t-end">mg/dL</text>`;
    const waf=(ox,oy,n,lab,col)=>{let g='';for(let k=0;k<100;k++){const cx=ox+(k%10)*12+5,cy=oy+Math.floor(k/10)*12+5;g+=`<circle cx="${cx}" cy="${cy}" r="4.3" style="fill:${k<n?col:'var(--panel-2)'};stroke:${k<n?col:'var(--line)'};stroke-width:.8"/>`}
      return g+`<text x="${ox}" y="${oy-8}" class="t-sm" style="fill:${col}">${lab}</text>`};
    s+=`<text x="0" y="226" class="t-xs">GOUT WITHIN 15 YEARS, PER 100 PEOPLE</text>`;
    s+=waf(14,246,1,'&lt; 6 mg/dL: 1.1%','var(--sea)')+waf(196,246,49,'≥ 10 mg/dL: 49%','var(--terra)');
    el.innerHTML=s})();

  /* ---- crystals leaving joint fluid (Pascual 2007) ---- */
  (function pas(){const el=$('#crPas');let s='';const x0=40,x1=344,xm=mo=>lerp(x0,x1,mo/36);
    s+=`<text x="0" y="12" class="t-xs">MONTHS AFTER STARTING URATE LOWERING</text>`;
    [0,6,12,18,24,30,36].forEach(mo=>s+=`<line x1="${f1(xm(mo))}" x2="${f1(xm(mo))}" y1="22" y2="300" class="grid"/><text x="${f1(xm(mo))}" y="314" class="t-xs t-mid">${mo}</text>`);
    // urate
    const yu=v=>lerp(96,34,(v-3)/7);
    s+=`<text x="${x0}" y="30" class="t-xs" style="fill:var(--gold)">median serum urate</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(yu(6))}" y2="${f1(yu(6))}" style="stroke:var(--sea);stroke-dasharray:4 3"/><text x="${x1}" y="${f1(yu(6)-4)}" class="t-xs t-end" style="fill:var(--sea)">6 mg/dL</text>`;
    s+=`<path d="M${f1(xm(0))} ${f1(yu(9.2))} L${f1(xm(3))} ${f1(yu(4.9))}" style="fill:none;stroke:var(--gold);stroke-width:2.6"/><circle cx="${f1(xm(0))}" cy="${f1(yu(9.2))}" r="4" style="fill:var(--gold)"/><circle cx="${f1(xm(3))}" cy="${f1(yu(4.9))}" r="4" style="fill:var(--gold)"/>`;
    s+=`<text x="${f1(xm(0)+8)}" y="${f1(yu(9.2)+4)}" class="t-xs">550 µmol/L (≈ 9.2)</text><text x="${f1(xm(3)+8)}" y="${f1(yu(4.9)+12)}" class="t-xs">290 µmol/L (≈ 4.9) by month 3</text>`;
    // crystal count
    const yc=v=>lerp(176,124,v/8);
    s+=`<text x="${x0}" y="118" class="t-xs" style="fill:var(--xtal)">median crystals per 400× field</text>`;
    s+=`<path d="M${f1(xm(0))} ${f1(yc(7.5))} L${f1(xm(3))} ${f1(yc(3))}" style="fill:none;stroke:var(--xtal);stroke-width:2.6"/><circle cx="${f1(xm(0))}" cy="${f1(yc(7.5))}" r="4" style="fill:var(--xtal)"/><circle cx="${f1(xm(3))}" cy="${f1(yc(3))}" r="4" style="fill:var(--xtal)"/>`;
    s+=`<text x="${f1(xm(3)+8)}" y="${f1(yc(3)+4)}" class="t-xs">7.5 → 3 at month 3 · later counts not plotted</text>`;
    for(let k=0;k<5;k++)s+=needle(xm(0)-24+k*3,yc(7.5)+(k%2?4:-4),9,60+k*22,.9);
    // clearance
    s+=`<text x="${x0}" y="202" class="t-xs" style="fill:var(--sea)">joints cleared of crystals</text>`;
    s+=`<rect x="${f1(xm(3))}" y="212" width="${f1(xm(33)-xm(3))}" height="16" rx="8" style="fill:var(--sea-soft);stroke:var(--sea)"/><text x="${f1((xm(3)+xm(33))/2)}" y="224" class="t-xs t-mid" style="fill:var(--sea)">all 18 joints: between month 3 and 33</text>`;
    [[12,'9/10'],[18,'10/10']].forEach(([mo,l])=>{s+=`<line x1="${f1(xm(mo))}" x2="${f1(xm(mo))}" y1="236" y2="258" style="stroke:var(--sea);stroke-width:2"/><circle cx="${f1(xm(mo))}" cy="258" r="4" style="fill:var(--sea)"/><text x="${f1(xm(mo))}" y="274" class="t-xs t-mid" style="fill:var(--sea)">${l}</text>`});
    s+=`<text x="${f1(xm(15))}" y="290" class="t-xs t-mid">joints from people with gout &lt; 10 years</text>`;
    s+=`<path d="M${f1(xm(4))} 336 H${f1(xm(32))}" class="arrow" marker-end="url(#crPA)"/><text x="${f1(xm(4))}" y="330" class="t-xs">longer gout duration → longer to clear (rs = 0.71)</text>`;
    el.innerHTML=`<defs>${marker('crPA')}</defs>`+s})();

  $('#crCards').innerHTML=`
   <div class="card"><h4>Why the big toe, and why at night?</h4><p>A drop of only 2 °C, from 37 to 35 °C, lowers urate solubility from 6.8 to 6.0 mg/dL in vitro. The first MTP is cool, poorly perfused and has a high surface-to-volume ratio, which may partly explain why it is the commonest site of a first flare <sup class="c" data-ref="Martillo2014,Loeb1972" title="Source 236,249">236,249</sup>. Flares are 2.36 times as likely overnight (95% CI 2.05–2.73) <sup class="c" data-ref="Choi2015" title="Source 58">58</sup>. One proposed reason is that water leaves a resolving joint effusion about twice as fast as urate, so local urate rises for a while <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Simkin1977" title="Source 368">368</sup>.</p></div>
   <div class="card"><h4>More than temperature</h4><p>Across 35 studies, urate solubility was lower at lower temperature, at pH 7–9 and with ions including sodium, and higher at pH ≤ 6 or ≥ 10. Cartilage homogenates and healthy synovial fluid and serum all raised solubility, while synovial fluid or serum from people with gout increased nucleation <sup class="c" data-ref="Chhana2015" title="Source 44">44</sup>. Lab figures for saturation differ a little: 6.6 mg/dL (392 µmol/L) at 37 °C and pH 7.4 in one review <sup class="c" data-ref="Chen2016" title="Source 39">39</sup>. This guide uses 6.8 mg/dL.</p></div>
   <div class="card"><h4>Necessary, not sufficient</h4><p>Risk climbs steeply with urate, yet only about half of people at ≥ 10 mg/dL develop gout over 15 years <sup class="c" data-ref="Dalbeth2018ARD" title="Source 82">82</sup>. In the Normative Aging Study, annual incidence was 4.9% at ≥ 9 mg/dL, 0.5% at 7.0–8.9 mg/dL and 0.1% below 7.0 mg/dL <sup class="c" data-ref="Campion1987" title="Source 34">34</sup>. Many hyperuricaemic people have no deposits on imaging, and local tissue factors may decide where crystals form <sup class="c" data-ref="Dalbeth2015,Chhana2015" title="Source 44,79">44,79</sup>.</p></div>
   <div class="card"><h4>Stages of the disease</h4><ul><li><b>A</b> Asymptomatic hyperuricaemia</li><li><b>B</b> Asymptomatic MSU crystal deposition</li><li><b>C</b> Deposition with past or current flares</li><li><b>D</b> Advanced gout: tophi, chronic arthritis, erosion</li></ul><p>The animation runs from A through C, then back toward a joint without crystals <sup class="c" data-ref="Chhana2015" title="Source 44">44</sup>.</p></div>
   <div class="card"><h4>Stopping treatment</h4><p>Cure in gout means clearing crystals and keeping urate low, not a one-off event <sup class="c" data-ref="PerezRuiz2006,FitzGerald2020" title="Source 135,314">135,314</sup>. In a case series cited by ACR 2020, only 13% (27/211) of people whose urate stayed &lt; 7 mg/dL off treatment were flare-free over 5 years <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>. A withdrawal study found the longest flare-free spells, more than 4 years, when on-treatment urate had averaged &lt; 5.05 mg/dL <span class="ev early">Early evidence</span> <sup class="c" data-ref="PerezRuiz2006" title="Source 314">314</sup>.</p></div>`;
};

/* =============== 1.4 a flare, hour by hour =============== */
/* the track: the first 24 h take half of it on a log-like scale, days 1–14 the other half */
const FL_K=3,FL_E=Math.exp(FL_K)-1;
const flH=u=>u<=.5?24*(Math.exp(FL_K*u/.5)-1)/FL_E:24+(u-.5)/.5*312;
const flU=h=>h<=24?.5*Math.log(1+h*FL_E/24)/FL_K:.5+.5*(h-24)/312;
const flFmt=h=>h<1?`${Math.round(h*60)} min`:h<48?`hour ${h<10?f1(h):Math.round(h)}`:`day ${f1(h/24)}`;
/* monotone cubic through anchor points (no overshoot at the pain peak) */
function flMono(xs,ys){const n=xs.length,d=[],m=[];for(let i=0;i<n-1;i++)d.push((ys[i+1]-ys[i])/(xs[i+1]-xs[i]));
  m[0]=d[0];m[n-1]=d[n-2];for(let i=1;i<n-1;i++)m[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
  for(let i=0;i<n-1;i++){if(d[i]===0){m[i]=m[i+1]=0;continue}const a=m[i]/d[i],b=m[i+1]/d[i],q=a*a+b*b;if(q>9){const t=3/Math.sqrt(q);m[i]=t*a*d[i];m[i+1]=t*b*d[i]}}
  return x=>{if(x<=xs[0])return ys[0];if(x>=xs[n-1])return ys[n-1];let i=0;while(x>xs[i+1])i++;const h=xs[i+1]-xs[i],t=(x-xs[i])/h,t2=t*t,t3=t2*t;
    return(2*t3-3*t2+1)*ys[i]+(t3-2*t2+t)*h*m[i]+(-2*t3+3*t2)*ys[i+1]+(t3-t2)*h*m[i+1]}}
const FL_PAIN=flMono([0,12,24,120,168,336],[1,7,9,6,3,0]);
const FL_CRP=h=>{const x=h/60;return h<=0?0:Math.min(1,x*x*Math.exp(2*(1-x)))};
const FL_STEPS=[
 {from:0,at:.02,k:'Hour 0',t:'Crystals shed into the joint',
  txt:'The crystals were there before the flare. A large deposit does not by itself cause flares: people with tophi do not necessarily have them, and MSU crystals alone had no effect on healthy blood mononuclear cells <sup class="c" data-ref="Joosten2010" title="Source 188">188</sup>. Flares are 2.36 times as likely to begin overnight as in the daytime <sup class="c" data-ref="Choi2015" title="Source 58">58</sup>. Purine intake over the previous 2 days (OR 4.76, top vs bottom fifth) and alcohol in the previous 24 hours (OR 1.36 for more than 1–2 drinks) raised the odds of a flare <sup class="c" data-ref="Zhang2012,Neogi2014" title="Source 289,448">289,448</sup>. One idea is that a resolving effusion loses water faster than urate, so local urate briefly rises <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Simkin1977" title="Source 368">368</sup>.',
  pt:'The crystals were already sitting in the joint. Something loosens a few of them, very often during the night.',
  hook:'Flare onset is most likely <b>overnight</b>: OR 2.36 against the daytime <sup class="c" data-ref="Choi2015" title="Source 58">58</sup>.'},
 {from:flU(.5),at:flU(1.2),k:'Hours 0–2 · schematic',t:'Signal 1: priming',
  txt:'A resident macrophage needs a first signal before it can make mature IL-1β: without one, monocytes and macrophages cultured with MSU crystals do not secrete it <sup class="c" data-ref="Busso2010" title="Source 33">33</sup>. That signal builds a stock of inactive pro-IL-1β. In human cells, the saturated fatty acid C18:0 (stearic acid) plus MSU crystals drove large IL-1β release through TLR2 <span class="ev early">Early evidence</span> <sup class="c" data-ref="Joosten2010" title="Source 188">188</sup>. TLR2- and TLR4-knockout macrophages made less IL-1β, but another study found no TLR that responded to MSU, so the receptor step is disputed <sup class="c" data-ref="Busso2010,Chen2006" title="Source 33,38">33,38</sup>.',
  pt:'The immune cell gets a first warning and starts building an inactive alarm protein, ready to use.',
  hook:'Two signals: <b>signal 1</b> primes (pro-IL-1β is made), <b>signal 2</b> activates the inflammasome <sup class="c" data-ref="Busso2010" title="Source 33">33</sup>.'},
 {from:flU(2),at:flU(3.4),k:'Hours 1–4 · schematic',t:'Signal 2: NLRP3 assembles',
  txt:'The macrophage swallows a crystal. With silica and alum crystals, phagocytosis ruptured lysosomes, and blocking cathepsin B impaired NLRP3 activation; MSU is assumed to work the same way <sup class="c" data-ref="Hornung2008" title="Source 168">168</sup>. Across NLRP3 activators, the one shared event was K⁺ leaving the cell: a fall in cytosolic K⁺ was necessary and sufficient, and reactive oxygen species were not required <sup class="c" data-ref="MunozPlanillo2013" title="Source 265">265</sup>. Active NLRP3 nucleates ASC filaments, which gather caspase-1 so that it activates itself by proximity <sup class="c" data-ref="Lu2014" title="Source 238">238</sup>. Macrophages lacking caspase-1, ASC or NALP3 are defective in crystal-induced IL-1β activation <sup class="c" data-ref="Martinon2006" title="Source 250">250</sup>.',
  pt:'The cell eats a crystal, which tears its digestive sac. Potassium leaks out, and that switches on an alarm complex called NLRP3.',
  hook:'The essential trigger for NLRP3 is <b>K⁺ efflux</b>; ROS are not required <sup class="c" data-ref="MunozPlanillo2013" title="Source 265">265</sup>. Inflammasome = NLRP3 + ASC + caspase-1 <sup class="c" data-ref="Martinon2006" title="Source 250">250</sup>.'},
 {from:flU(4),at:flU(7),k:'Hours 4–12 · schematic',t:'IL-1β calls neutrophils',
  txt:'Caspase-1 cuts pro-IL-1β into active IL-1β and also cleaves gasdermin D, whose pores let IL-1β out <sup class="c" data-ref="Shi2015,Liu2016,Evavold2018" title="Source 114,234,366">114,234,366</sup>. IL-1 and its receptor are essential for MSU inflammation, and the receptor is needed on non-bone-marrow cells, most probably the endothelium, not on leukocytes <sup class="c" data-ref="Chen2006,Busso2010" title="Source 33,38">33,38</sup>. Chemokines follow: in a mouse air pouch, neutrophil inflammation 4 hours after crystal injection depended entirely on CXCR2 ligands, and in rabbits blocking IL-8 stopped the later influx at 24 hours (animal data) <sup class="c" data-ref="Busso2010" title="Source 33">33</sup>.',
  pt:'The alarm, IL-1β, leaves the cell and tells the nearby blood vessel to let white blood cells through.',
  hook:'IL-1β acts on IL-1R/MyD88 on <b>non-haematopoietic</b> cells such as endothelium <sup class="c" data-ref="Chen2006" title="Source 38">38</sup>. That is why IL-1 blockers work in gout <sup class="c" data-ref="So2007" title="Source 371">371</sup>.'},
 {from:flU(12),at:flU(19),k:'Hours 12–24',t:'Peak: hot, red, untouchable',
  txt:'Time to maximal pain under 24 hours is a typical-episode feature in the 2015 ACR/EULAR criteria <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>; in the study behind them it discriminated crystal-proven gout (OR 1.32) <sup class="c" data-ref="Taylor2015" title="Source 403">403</sup>. Synovial fluid in the first 48 hours carries high IL-1β, IL-6, IL-8 and TNF and a high white cell count <sup class="c" data-ref="Scanu2012" title="Source 349">349</sup>. Among 67 people in hospital with gout or pseudogout, 34% had fever from the synovitis <sup class="c" data-ref="Ho1993" title="Source 165">165</sup>. Serum urate can be normal now: it was in 20 of 41 people (49%) <sup class="c" data-ref="Urano2002" title="Source 416">416</sup>.',
  pt:'Within a day the joint is at its worst: hot, red, swollen, and too sore to touch. Your blood urate may read normal.',
  hook:'Maximal pain within <b>24 h</b>. A normal serum urate during a flare does not exclude gout <sup class="c" data-ref="Neogi2015,Urano2002" title="Source 290,416">290,416</sup>.'},
 {from:flU(48),at:flU(100),k:'Days 2–7',t:'NETs aggregate and mop up',
  txt:'Recruited neutrophils form extracellular traps (NETs). At high neutrophil density the NETs aggregate and degrade cytokines and chemokines with serine proteases, and people with impaired NET formation had persistent inflammation <sup class="c" data-ref="Schauer2014" title="Source 350">350</sup>. Differentiated macrophages release TGF-β1, which suppresses endothelial E-selectin and neutrophil capture; cells from 40-hour resolving skin blisters made TGF-β1, cells from 16-hour acute blisters did not <sup class="c" data-ref="Yagnik2004" title="Source 437">437</sup>. In synovial fluid, TGF-β1 rose at days 3–4 and peaked at days 5–7, when white cells and cytokines were lowest <sup class="c" data-ref="Scanu2012" title="Source 349">349</sup>. The crystal coat changes from IgG to apolipoprotein B as inflammation subsides <sup class="c" data-ref="OrtizBravo1993" title="Source 303">303</sup>.',
  pt:'The white cells throw out sticky nets that trap and break down the alarm signals. The flare starts to burn out.',
  hook:'<b>Aggregated NETs</b> degrade cytokines and help end the flare <sup class="c" data-ref="Schauer2014" title="Source 350">350</sup>; TGF-β1 switches the vessel wall off <sup class="c" data-ref="Yagnik2004" title="Source 437">437</sup>.'},
 {from:flU(168),at:flU(270),k:'Days 7–14',t:'Resolution, crystals remain',
  txt:'Resolution within 14 days is a typical-episode feature in the 2015 criteria <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>. Without effective treatment, 11 volunteers with podagra were observed: 2 withdrew on day 4 with severe pain, all remaining improved in pain by day 5 and in swelling by day 7, but only 3 were pain-free within the 7 days <sup class="c" data-ref="Bellamy1987" title="Source 20">20</sup>. Inflammation resolves even though MSU crystals can still be found in synovial fluid and tissues <sup class="c" data-ref="Schauer2014" title="Source 350">350</sup>. Gout is a chronic disease even though it shows itself as flares <sup class="c" data-ref="Dalbeth2021" title="Source 85">85</sup>.',
  pt:'Within one to two weeks the flare settles by itself. The crystals are still there, so another flare can come unless urate is lowered.',
  hook:'Resolution ≤ 14 days, but the crystals stay. Only lowering urate removes them <sup class="c" data-ref="Neogi2015,Schauer2014,Dalbeth2021" title="Source 85,290,350">85,290,350</sup>.'}
];
const FL_DRUG={
 none:null,
 colch:{n:'Colchicine',w:'colchicine',c:'var(--crocus)',bg:'var(--crocus-soft)',lab:['colchicine ⊣ microtubules','colchicine ⊣ sticking'],
  txt:'Colchicine stops tubulin forming microtubules, which prevents neutrophil activation, degranulation and migration <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>. NLRP3 assembly also needs microtubules to bring ASC to NLRP3 <sup class="c" data-ref="Misawa2013" title="Source 263">263</sup>, and reviews describe colchicine\'s microtubule block as dampening that step <sup class="c" data-ref="Leung2015,Dalbeth2014ClinTher" title="Source 78,229">78,229</sup>. At very low concentrations it changed how E-selectin sits on endothelial cells and abolished their extra stickiness for neutrophils <sup class="c" data-ref="Cronstein1995" title="Source 68">68</sup>. EULAR 2016 recommends starting within 12 h of flare onset, the shaded window on the curves <sup class="c" data-ref="Richette2017" title="Source 331">331</sup>.'},
 nsaid:{n:'NSAID',w:'an NSAID',c:'var(--sea)',bg:'var(--sea-soft)',lab:['NSAID ⊣ COX in inflamed tissue'],
  txt:'NSAIDs block cyclo-oxygenase (COX); non-selective NSAIDs and COX-2 inhibitors gave similar pain relief in flares, but non-selective ones caused more gastrointestinal adverse events <sup class="c" data-ref="vanDurme2021" title="Source 418">418</sup>. They are drawn downstream, on the inflamed tissue, because they do not target the crystal–inflammasome step. In CONTACT, naproxen matched low-dose colchicine for pain over 7 days <sup class="c" data-ref="Roddy2020" title="Source 338">338</sup>.'},
 gc:{n:'Glucocorticoid',w:'a glucocorticoid',c:'var(--sea)',bg:'var(--sea-soft)',lab:['glucocorticoid ⊣ inflammatory genes'],
  txt:'Glucocorticoids act broadly inside cells; the badge on the nucleus is a simplification, not a single proven target in gout. In trials, prednisolone 35 mg once daily for 5 days was equivalent to naproxen 500 mg twice daily <sup class="c" data-ref="Janssens2008" title="Source 179">179</sup>, and across 6 trials pain was no different from NSAIDs, with less indigestion, nausea and vomiting <sup class="c" data-ref="Billy2018" title="Source 24">24</sup>.'},
 il1:{n:'IL-1 blocker',w:'an IL-1 blocker',c:'var(--sea)',bg:'var(--sea-soft)',lab:['IL-1 blocker ⊣ IL-1β → IL-1R'],
  txt:'Canakinumab is an antibody against IL-1β <sup class="c" data-ref="IlarisPIG" title="Source 175">175</sup>; anakinra is an IL-1 receptor antagonist <sup class="c" data-ref="KineretPI" title="Source 207">207</sup>. Both cut the link between the inflammasome and the vessel wall, which is essential in mice <sup class="c" data-ref="Chen2006" title="Source 38">38</sup>. In an open pilot, all 10 people given anakinra 100 mg daily for 3 days responded <sup class="c" data-ref="So2007" title="Source 371">371</sup>; canakinumab 150 mg gave lower 72-hour pain than triamcinolone 40 mg <sup class="c" data-ref="Schlesinger2012" title="Source 355">355</sup>.'}
};
inits.flare=()=>{
  const svg=$('#flSvg'),rg=$('#flT');let drug='none';
  const r=rng(1414);
  const DEP=Array.from({length:22},()=>({x:r(),y:r(),a:(r()-.5)*40,l:.8+r()*.4}));
  const SHED=Array.from({length:4},()=>({x:r(),y:r(),a:r()*180}));
  const NE=Array.from({length:32},(_,k)=>({w:r(),tx:r(),ty:r(),b:k%4===3,ph:r()}));
  const ASC=Array.from({length:24},(_,i)=>({a:i/24*Math.PI*2,d:20+r()*10}));
  const NETS=Array.from({length:3},()=>Array.from({length:9},()=>({a:r()*Math.PI*2,l:16+r()*20,c:(r()-.5)*28})));
  const ILD=Array.from({length:7},()=>({x:r(),y:r()}));
  const WIDE={vb:'720 470',sc:[0,0,720,300],cart:{x:0,y:272,w:604,h:28,top:false},dep:[24,232,252,266],depLab:[10,292],
    mac:{cx:255,cy:140,W:150,H:98},nuc:[205,166,32,22],tlrA:-2.45,ffa:[40,86],pro:[226,92],
    phE:[288,236],ph:[305,186],kA:-.78,speck:[350,134],spDx:0,spDy:-46,kLab:null,tgf:[275,212],caspLab:[306,152],pores:[-.28,.02,.32],
    ves:{x:614,y:0,w:70,h:300,vert:true},nA:[420,24,598,262],nB:[30,206,214,246],nets:[[478,200],[548,82],[84,238]],
    time:[14,26],macLab:[255,60],lanes:{x0:62,x1:704,p0:330,p1:376,c0:398,c1:438,tick:454,foot:468,
      ticks:[[0,'0'],[1,'1 h'],[4,'4 h'],[12,'12 h'],[24,'24 h'],[72,'day 3'],[168,'day 7'],[336,'day 14']]},
    badges:{colch:[[400,96,355,118],[470,282,614,236]],nsaid:[[430,36,500,140]],gc:[[14,100,176,160]],il1:[[430,258,614,140]]}};
  const NARROW_L={vb:'400 820',sc:[0,0,400,560],cart:{x:0,y:0,w:400,h:26,top:true},dep:[30,220,30,44],depLab:[10,17],
    mac:{cx:190,cy:204,W:160,H:104},nuc:[148,230,32,22],tlrA:-2.45,ffa:[14,74],pro:[166,148],
    phE:[217,101],ph:[242,170],kA:-.45,speck:[270,236],spDx:46,spDy:4,kLab:[392,92],tgf:[118,284],caspLab:[222,262],pores:[.95,1.2,1.45],
    ves:{x:0,y:484,w:400,h:66,vert:false},nA:[20,322,384,470],nB:[60,52,384,90],nets:[[108,398],[292,372],[300,70]],
    time:[392,316],macLab:[190,122],lanes:{x0:44,x1:388,p0:600,p1:664,c0:690,c1:752,tick:770,foot:792,
      ticks:[[0,'0'],[4,'4 h'],[12,'12 h'],[24,'24 h'],[168,'day 7'],[336,'day 14']]},
    badges:{colch:[[200,332,270,250],[20,452,110,484]],nsaid:[[150,330,220,410]],gc:[[14,320,140,250]],il1:[[150,452,250,484]]}};
  const HALO='paint-order:stroke;stroke:var(--field);stroke-width:3px;stroke-linejoin:round;';
  const yglyph=(x,y,dx,dy,col,o,len=9)=>{const tx=x+dx*len,ty=y+dy*len,px=-dy,py=dx;return `<path d="M${f1(x)} ${f1(y)} L${f1(tx)} ${f1(ty)} M${f1(tx)} ${f1(ty)} L${f1(tx+dx*5+px*4)} ${f1(ty+dy*5+py*4)} M${f1(tx)} ${f1(ty)} L${f1(tx+dx*5-px*4)} ${f1(ty+dy*5-py*4)}" style="fill:none;stroke:${col};stroke-width:2;stroke-linecap:round;opacity:${f1(o)}"/>`};
  function draw(u){
    const N=NARROW();const L=N?NARROW_L:WIDE;vb(svg,WIDE.vb,NARROW_L.vb);
    const h=flH(u);
    const shed=ease(ramp(h,0,1)),prime=ramp(h,.4,2),toE=ease(ramp(h,0,1)),toP=ease(ramp(h,1,2)),lys=ramp(h,1.5,2),rupt=ramp(h,2,3),kef=ramp(h,2.5,4);
    const asm=ease(ramp(h,3,4.5)),cut=ease(ramp(h,4,6)),pore=ease(ramp(h,4.5,6.5)),il1=ramp(h,5,10);
    const nets=ramp(h,40,100)*(1-.5*ramp(h,200,330)),tgf=ramp(h,40,120);
    const esel=ramp(h,6,11)*(1-.85*tgf);
    const A=ramp(h,4,20)*(1-.8*ramp(h,96,168))*(1-ramp(h,168,320));
    const inflam=ramp(h,5,16)*(1-ramp(h,60,300));
    const fade=1-.65*ramp(h,150,300);
    const M=L.mac,V=L.ves,mp=a=>[M.cx+M.W*Math.cos(a),M.cy+M.H*Math.sin(a)];
    let s=`<defs>${marker('flA')}${marker('flAt','var(--terra)')}</defs>`;
    const [sx,sy,sw,sh]=L.sc;
    s+=`<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12" style="fill:var(--field)"/>`;
    s+=`<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12" style="fill:var(--terra);opacity:${(.16*inflam).toFixed(3)}"/>`;
    // cartilage + crystal deposit
    const C=L.cart;s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" style="fill:var(--panel-2);stroke:var(--memb);stroke-width:1.2"/>`;
    s+=`<text x="${L.depLab[0]}" y="${L.depLab[1]}" class="t-xs">CARTILAGE · crystal deposit</text>`;
    const [dx0,dx1,dy0,dy1]=L.dep;
    DEP.forEach(n=>{s+=needle(lerp(dx0,dx1,n.x),lerp(dy0,dy1,n.y),12*n.l,n.a,1)});
    if(h>190)s+=`<text x="${dx1+8}" y="${f1((dy0+dy1)/2+3)}" class="t-sm" style="${HALO}fill:var(--xtal);opacity:${f1(ramp(h,190,250))}">crystals remain</text>`;
    // venule
    const vr=V.vert?V.w/2:V.h/2;
    s+=`<rect x="${V.x}" y="${V.y}" width="${V.w}" height="${V.h}" rx="${vr}" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/>`;
    for(let i=0;i<9;i++){if(V.vert){const cy=V.y+((i*37+u*2600)%V.h);s+=`<ellipse cx="${V.x+V.w/2+(i%3-1)*15}" cy="${f1(cy)}" rx="5" ry="8" style="fill:var(--bad);opacity:.6"/>`}
      else{const cx=V.x+((i*47+u*2600)%V.w);s+=`<ellipse cx="${f1(cx)}" cy="${V.y+V.h/2+(i%3-1)*15}" rx="8" ry="5" style="fill:var(--bad);opacity:.6"/>`}}
    s+=V.vert?`<text x="${V.x+V.w/2}" y="${V.y+16}" class="t-xs t-mid" style="fill:var(--bad)">VENULE</text><text x="${V.x-4}" y="${V.y+V.h-8}" class="t-xs t-end">endothelium</text>`
             :`<text x="${V.x+V.w/2}" y="${V.y+V.h-6}" class="t-xs t-mid" style="fill:var(--bad)">VENULE</text><text x="${V.x+V.w-6}" y="${V.y-6}" class="t-xs t-end">endothelium</text>`;
    const wp=q=>V.vert?[V.x,V.y+24+q*(V.h-48)]:[V.x+24+q*(V.w-48),V.y], wd=V.vert?[-1,0]:[0,-1];
    if(esel>0)for(let k=0;k<7;k++){const [x,y]=wp(k/6);s+=yglyph(x,y,wd[0],wd[1],'var(--terra)',esel,7)}
    if(esel>.3)s+=`<text x="${V.vert?V.x-6:V.x+V.w-6}" y="${V.vert?V.y+40:V.y-20}" class="t-xs t-end" style="${HALO}fill:var(--terra);opacity:${f1(esel)}">E-selectin up</text>`;
    // macrophage
    s+=`<ellipse cx="${M.cx}" cy="${M.cy}" rx="${M.W}" ry="${M.H}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:4"/>`;
    s+=`<text x="${L.macLab[0]}" y="${L.macLab[1]}" class="t-xs t-mid">RESIDENT MACROPHAGE</text>`;
    const [nx,ny,nrx,nry]=L.nuc;
    s+=`<ellipse cx="${nx}" cy="${ny}" rx="${nrx}" ry="${nry}" style="fill:var(--nuc);opacity:.85;stroke:${prime>.3?'var(--gold)':'none'};stroke-width:2"/><text x="${nx}" y="${ny+nry+12}" class="t-xs t-mid">nucleus</text>`;
    // signal 1: fatty acid + TLR2/4 → NF-κB → pro-IL-1β
    const [tx,ty]=mp(L.tlrA),tn=[Math.cos(L.tlrA),Math.sin(L.tlrA)];
    s+=yglyph(tx,ty,tn[0],tn[1],'var(--ink)',1,10);
    s+=`<text x="${f1(tx+16)}" y="${f1(ty+18)}" class="t-xs">TLR2/4</text>`;
    const fp=ease(ramp(h,0,.8)),fx=lerp(L.ffa[0],tx+tn[0]*24,fp),fy=lerp(L.ffa[1],ty+tn[1]*24,fp);
    if(h<40){let zz=`M${f1(fx-14)} ${f1(fy)}`;for(let k=1;k<=7;k++)zz+=` L${f1(fx-14+k*4)} ${f1(fy+(k%2?-3:3))}`;
      s+=`<path d="${zz}" style="fill:none;stroke:var(--warn);stroke-width:2;opacity:${f1(1-ramp(h,8,40))}"/><text x="${f1(fx-14)}" y="${f1(fy+(N?16:-9))}" class="t-xs" style="${HALO}fill:var(--warn);opacity:${f1(1-ramp(h,8,40))}">fatty acid C18:0</text>`}
    if(prime>0){s+=`<path d="M${f1(tx-tn[0]*6)} ${f1(ty-tn[1]*6)} Q${f1((tx+nx)/2+10)} ${f1((ty+ny)/2-14)} ${f1(nx-nrx*.4)} ${f1(ny-nry)}" class="arrow" marker-end="url(#flA)" style="stroke-dasharray:4 3;opacity:${f1(prime)}"/>`;
      s+=`<text x="${f1((tx+nx)/2+8)}" y="${f1((ty+ny)/2-14)}" class="t-xs" style="opacity:${f1(prime)}">NF-κB</text>`}
    // pro-IL-1β bars → IL-1β
    const [px,py]=L.pro;
    if(prime>0){for(let k=0;k<3;k++)s+=`<rect x="${px}" y="${py+k*13}" width="${f1(lerp(6,38,prime)*(1-.75*cut))}" height="9" rx="4.5" style="fill:var(--gold);opacity:${f1(prime*(1-.7*cut))}"/>`;
      s+=`<text x="${px}" y="${py-6}" class="t-xs" style="opacity:${f1(prime)}">${cut>.5?'IL-1β (active)':'pro-IL-1β'}</text>`}
    // shed crystals; one is swallowed
    const [ex,ey]=L.phE,[qx,qy]=L.ph,dmid=[(dx0+dx1)/2,(dy0+dy1)/2];
    SHED.forEach((n,k)=>{const fxp=lerp(dmid[0]+(n.x-.5)*80,dmid[0]+(n.x-.5)*160,shed),fyp=lerp(dmid[1],dmid[1]+(C.top?1:-1)*(16+n.y*30),shed);s+=needle(fxp,fyp,11,n.a+h*8,shed*fade)});
    const cx=h<1?lerp(dmid[0],ex,toE):lerp(ex,qx,toP),cy=h<1?lerp(dmid[1],ey,toE):lerp(ey,qy,toP);
    if(lys>0){s+=`<circle cx="${qx}" cy="${qy}" r="17" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.6;${rupt>0?'stroke-dasharray:'+f1(8-6*rupt)+' '+f1(2+8*rupt)+';':''}opacity:${f1(lys*(1-.6*ramp(h,30,120)))}"/>`}
    s+=needle(cx,cy,13,35,1);
    if(lys>0&&h<30)s+=`<text x="${qx+22}" y="${qy+4}" class="t-xs" style="${HALO}opacity:${f1(lys)}">${rupt>.2?'lysosome ruptures':'phagolysosome'}</text>`;
    if(rupt>0&&h<40){for(let k=0;k<7;k++){const a=k/7*Math.PI*2+.3,rr=17+18*rupt;s+=`<circle cx="${f1(qx+Math.cos(a)*rr)}" cy="${f1(qy+Math.sin(a)*rr)}" r="2.6" style="fill:var(--warn);opacity:${f1(rupt*(1-ramp(h,12,40)))}"/>`}
      s+=`<text x="${qx+22}" y="${qy+16}" class="t-xs" style="${HALO}fill:var(--warn);opacity:${f1(rupt*(1-ramp(h,12,40)))}">cathepsin B</text>`}
    // K+ efflux
    if(kef>0){const [kx,ky]=mp(L.kA),kd=[Math.cos(L.kA),Math.sin(L.kA)],ko=1-ramp(h,24,72);
      for(let k=0;k<6;k++){const p=clamp(kef*1.6-k*.12);if(p<=0)continue;const ox=kx-kd[0]*24+kd[0]*60*p+(k%3-1)*8*kd[1],oy=ky-kd[1]*24+kd[1]*60*p-(k%3-1)*8*kd[0];
        s+=`<circle cx="${f1(ox)}" cy="${f1(oy)}" r="6" style="fill:var(--panel);stroke:var(--sea);stroke-width:1.4;opacity:${f1(ko)}"/><text x="${f1(ox)}" y="${f1(oy+3)}" class="t-xs t-mid" style="fill:var(--sea);font-size:7.5px;opacity:${f1(ko)}">K⁺</text>`}
      const [klx,kly]=L.kLab||[kx+kd[0]*50,ky+kd[1]*50-14];s+=`<text x="${f1(klx)}" y="${f1(kly)}" class="t-xs ${N?'t-end':''}" style="${HALO}fill:var(--sea);opacity:${f1(kef*ko)}">K⁺ efflux: the essential step</text><text x="${f1(klx)}" y="${f1(kly+12)}" class="t-xs ${N?'t-end':''}" style="${HALO}opacity:${f1(kef*ko*.8)}">ROS: not required</text>`}
    // NLRP3 – ASC speck – caspase-1
    const [spx,spy]=L.speck;
    if(asm>0){const so=asm*(1-.6*ramp(h,48,200));ASC.forEach(a=>{const rr=a.d*asm;s+=`<circle cx="${f1(spx+Math.cos(a.a)*rr)}" cy="${f1(spy+Math.sin(a.a)*rr)}" r="3.8" style="fill:var(--crocus);opacity:${f1(so*.9)}"/>`});
      s+=`<circle cx="${spx}" cy="${spy}" r="${f1(8*asm)}" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.5;opacity:${f1(so)}"/>`;
      for(let k=0;k<4;k++){const a=k/4*Math.PI*2+.4,rr=lerp(70,40,asm);s+=`<rect x="${f1(spx+Math.cos(a)*rr-6)}" y="${f1(spy+Math.sin(a)*rr-6)}" width="12" height="12" rx="3" style="fill:var(--terra);opacity:${f1(so)}"/>`}
      s+=` <text x="${spx+L.spDx}" y="${spy+L.spDy}" class="t-xs ${L.spDx?'':'t-mid'}" style="${HALO}opacity:${f1(so)}">NLRP3 speck</text><text x="${L.caspLab[0]}" y="${L.caspLab[1]}" class="t-xs t-end" style="${HALO}fill:var(--terra);opacity:${f1(so)}">caspase-1</text>`}
    // gasdermin D pores and IL-1β leaving toward the venule
    if(pore>0){L.pores.forEach(a=>{const [x,y]=mp(a);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(6*pore)}" style="fill:var(--field);stroke:var(--terra);stroke-width:2"/>`});
      const [lx,ly]=mp(L.pores[0]);s+=`<text x="${f1(lx+(V.vert?10:-14))}" y="${f1(ly+(V.vert?-10:4))}" class="t-xs ${V.vert?'':'t-end'}" style="${HALO}fill:var(--terra);opacity:${f1(pore*(1-ramp(h,30,90)))}">gasdermin D pores</text>`}
    if(cut>0){const no=1-nets;ILD.forEach((d,k)=>{const [ppx,ppy]=mp(L.pores[k%3]),[wx,wy]=wp(.15+d.x*.7);const p=ease(clamp(il1*1.4-k*.06));
        const x=lerp(ppx,wx+wd[0]*(10+d.y*30),p),y=lerp(ppy,wy+wd[1]*(10+d.y*30),p);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4.5*cut)}" style="fill:var(--terra);opacity:${f1(cut*no)}"/>`});
      if(il1>.3&&nets<.6)s+=`<text x="${V.vert?V.x-8:V.x+V.w/2}" y="${V.vert?V.y+V.h/2-30:V.y-26}" class="t-xs ${V.vert?'t-end':'t-mid'}" style="${HALO}fill:var(--terra);opacity:${f1(il1*(1-nets))}">IL-1β → IL-1R on endothelium</text>`}
    // neutrophils
    NE.forEach((n,k)=>{const on=clamp((A-k/NE.length*.92)*5);if(on<=0)return;const z=n.b?L.nB:L.nA;
      const [wx,wy]=wp(n.w),tx2=lerp(z[0],z[2],n.tx),ty2=lerp(z[1],z[3],n.ty),p=ease(clamp(on*1.2));
      s+=neutro(lerp(wx,tx2,p)+Math.sin(u*60+n.ph*6)*2,lerp(wy,ty2,p)+Math.cos(u*50+n.ph*6)*2,9,clamp(on*2))});
    // aggregated NETs
    if(nets>0){L.nets.forEach(([cx2,cy2],c)=>{NETS[c].forEach(st=>{const x2=cx2+Math.cos(st.a)*st.l,y2=cy2+Math.sin(st.a)*st.l;
        s+=`<path d="M${cx2} ${cy2} Q${f1((cx2+x2)/2+st.c)} ${f1((cy2+y2)/2-st.c)} ${f1(x2)} ${f1(y2)}" style="fill:none;stroke:var(--nuc);stroke-width:1.4;opacity:${f1(.7*nets)}"/>`});
        for(let k=0;k<4;k++)s+=`<circle cx="${f1(cx2+Math.cos(k*1.7)*10)}" cy="${f1(cy2+Math.sin(k*1.7)*8)}" r="3" style="fill:var(--terra);opacity:${f1(.6*nets*(1-ramp(h,120,220)))}"/>`});
      const [lx,ly]=L.nets[0];s+=`<text x="${lx}" y="${ly+36}" class="t-xs t-mid" style="${HALO}fill:var(--nuc);opacity:${f1(nets)}">aggregated NETs trap cytokines</text>`}
    // TGF-β1
    if(tgf>0)s+=`<text x="${L.tgf[0]}" y="${L.tgf[1]}" class="t-xs t-mid" style="${HALO}fill:var(--sea);font-weight:700;opacity:${f1(tgf)}">TGF-β1 released</text>`;
    // clock
    s+=`<text x="${L.time[0]}" y="${L.time[1]}" class="t-big ${N?'t-end':''}">${flFmt(h)}</text>`;
    // drug badges
    const D=FL_DRUG[drug];
    if(D){L.badges[drug].forEach(([bx,by,tx3,ty3],k)=>{const lab=D.lab[k]||D.lab[0],bw=lab.length*5.9+16,cxB=clamp(bx,4,sw-bw-4);
      const ax=cxB+bw/2,ay=by+10,ang=Math.atan2(ty3-ay,tx3-ax),pxp=-Math.sin(ang)*7,pyp=Math.cos(ang)*7;
      s+=`<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${tx3}" y2="${ty3}" style="stroke:${D.c};stroke-width:2.2"/><line x1="${f1(tx3-pxp)}" y1="${f1(ty3-pyp)}" x2="${f1(tx3+pxp)}" y2="${f1(ty3+pyp)}" style="stroke:${D.c};stroke-width:3.4;stroke-linecap:round"/>`;
      s+=`<circle cx="${tx3}" cy="${ty3}" r="15" style="fill:none;stroke:${D.c};stroke-width:1.6;stroke-dasharray:3 3"/>`;
      s+=`<rect x="${f1(cxB)}" y="${by}" width="${f1(bw)}" height="20" rx="10" style="fill:${D.bg};stroke:${D.c};stroke-width:1.4"/><text x="${f1(ax)}" y="${by+14}" class="t-xs t-mid" style="fill:${D.c};font-weight:700">${lab}</text>`})}
    // ---- lanes: pain and CRP, the first day stretched ----
    const G=L.lanes,ux=v=>lerp(G.x0,G.x1,v);
    [[0,48,'SF phase I'],[48,96,'II'],[96,168,'III']].forEach(([a,b,l],k)=>{const x0=ux(flU(a)),x1=ux(flU(b));
      s+=`<rect x="${f1(x0)}" y="${G.p0-4}" width="${f1(x1-x0)}" height="${G.c1-G.p0+4}" style="fill:var(--panel-2);opacity:${k%2?.9:.5}"/><text x="${f1((x0+x1)/2)}" y="${G.c1-4}" class="t-xs t-mid">${l}</text>`});
    if(drug==='colch'){const x1=ux(flU(12));s+=`<rect x="${G.x0}" y="${G.p0-4}" width="${f1(x1-G.x0)}" height="${G.c1-G.p0+4}" style="fill:var(--crocus-soft);opacity:.55"/><text x="${f1(x1-3)}" y="${G.p0+8}" class="t-xs t-end" style="fill:var(--crocus)">start within 12 h</text>`}
    const lane=(y0,y1,fn,col,title)=>{let q=`<text x="${G.x0}" y="${y0-8}" class="t-sm" style="fill:${col}">${title}</text><line x1="${G.x0}" x2="${G.x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
      q+=`<path d="${pathFn(v=>fn(flH(v)),G.x0,G.x1,y1,y0)}" style="fill:none;stroke:${col};stroke-width:1.2;opacity:.35"/>`;
      q+=`<path d="${pathFn(v=>v<=u?fn(flH(v)):NaN,G.x0,G.x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${col};stroke-width:3"/>`;
      return q+`<circle cx="${f1(ux(u))}" cy="${f1(lerp(y1,y0,fn(h)))}" r="5" style="fill:${col}"/>`};
    s+=lane(G.p0,G.p1,x=>FL_PAIN(x)/10,'var(--terra)','PAIN 0–10 · schematic, untreated');
    s+=lane(G.c0,G.c1,FL_CRP,'var(--warn)','CRP · schematic shape');
    const x24=ux(.5);s+=`<line x1="${f1(x24)}" x2="${f1(x24)}" y1="${G.p0-6}" y2="${G.c1}" style="stroke:var(--terra);stroke-width:1;stroke-dasharray:3 3"/><text x="${f1(x24+4)}" y="${G.p0+4}" class="t-xs" style="fill:var(--terra)">max pain &lt; 24 h</text>`;
    G.ticks.forEach(([hh,l],k)=>{const x=ux(flU(hh));s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${G.c1}" y2="${G.c1+4}" class="axis"/><text x="${f1(x)}" y="${G.tick}" class="t-xs ${k===0?'':k===G.ticks.length-1?'t-end':'t-mid'}">${l}</text>`});
    s+=`<text x="${G.x0}" y="${G.foot}" class="t-xs" style="fill:var(--warn)">${N?'TEACHING SKETCH · first 24 h stretched':'TEACHING SKETCH · hour boundaries schematic · first 24 h stretched'}</text>`;
    s+=`<line x1="${f1(ux(u))}" x2="${f1(ux(u))}" y1="${G.p0-6}" y2="${G.c1}" style="stroke:var(--ink);stroke-width:1;opacity:.3"/>`;
    svg.innerHTML=s;
    const p=phaseOf(FL_STEPS,u);setSt(p);
    const nst=A<.05?(h>100?'cleared':'few'):A<.5?(h<48?'arriving':'leaving'):'flood';
    $('#flRead').innerHTML=`<span>time <b>${flFmt(h)}</b></span><span>pain <b>${f1(FL_PAIN(h))}</b>/10</span><span>CRP <b>${Math.round(FL_CRP(h)*100)}%</b> of peak</span><span>neutrophils <b>${nst}</b></span>`;
    $('#flNote').innerHTML=noteHTML(FL_STEPS[p])+(D?`<div class="kv"><div><dt>Where ${D.w} acts</dt><dd>${D.txt}</dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#flPlay'),draw,24000,'Replay','flare');
  const setSt=stepWire($('#flSteps'),FL_STEPS,rg,draw,stop);
  $$('[data-fld]').forEach(b=>b.onclick=()=>{drug=b.dataset.fld;$$('[data-fld]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* ---- night-time onset (Choi 2015) ---- */
  (function clock(){const el=$('#flClock'),cx=110,cy=150;let s='';
    const sec=[[0,8,733,'00:00–07:59','733 flares · OR 2.36',1],[8,16,310,'08:00–15:59','310 flares · ref.',.3],[16,24,390,'16:00–23:59','390 flares · OR 1.26',.55]];
    const pt=(hh,rr)=>{const a=(-90+hh*15)*Math.PI/180;return[cx+Math.cos(a)*rr,cy+Math.sin(a)*rr]};
     s+=`<circle cx="${cx}" cy="${cy}" r="88" style="fill:none;stroke:var(--line);stroke-dasharray:2 4"/>`;
    sec.forEach(([a,b,n,l1,l2,o],k)=>{const rr=88*Math.sqrt(n/733),[x0,y0]=pt(a,rr),[x1,y1]=pt(b,rr);
      s+=`<path d="M${cx} ${cy} L${f1(x0)} ${f1(y0)} A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(x1)} ${f1(y1)}Z" style="fill:var(--terra);opacity:${o};stroke:var(--panel);stroke-width:2"/>`;
      const ly=86+k*56;s+=`<rect x="220" y="${ly-10}" width="12" height="12" rx="3" style="fill:var(--terra);opacity:${o}"/><text x="238" y="${ly}" class="t-sm">${l1}</text><text x="238" y="${ly+15}" class="t-xs">${l2}</text>`});
    [[0,'midnight'],[6,'6'],[12,'noon'],[18,'18']].forEach(([hh,l])=>{const [x,y]=pt(hh,100);s+=`<text x="${f1(x)}" y="${f1(y+3)}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="0" y="14" class="t-xs">START OF 1,433 FLARES BY CLOCK TIME</text>`;
    el.innerHTML=s})();

  /* ---- serum urate during vs between flares (Urano 2002) ---- */
  (function ur(){const el=$('#flUrate');let s='';const yv=v=>lerp(240,50,v/10);
    s+=`<text x="0" y="14" class="t-xs">MEAN SERUM URATE, mg/dL</text>`;
    [0,2,4,6,8,10].forEach(v=>s+=`<line x1="30" x2="176" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="24" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}</text>`);
    [[48,8.5,.9,'between','506 µmol/L',.9],[112,7.5,1.4,'during','446 µmol/L',.55]].forEach(([x,v,sd,l,mm,o])=>{
      s+=`<rect x="${x}" y="${f1(yv(v))}" width="46" height="${f1(yv(0)-yv(v))}" rx="4" style="fill:var(--gold);opacity:${o}"/>`;
      s+=`<line x1="${x+23}" x2="${x+23}" y1="${f1(yv(v+sd))}" y2="${f1(yv(v-sd))}" style="stroke:var(--ink);stroke-width:1.4"/><line x1="${x+17}" x2="${x+29}" y1="${f1(yv(v+sd))}" y2="${f1(yv(v+sd))}" style="stroke:var(--ink);stroke-width:1.4"/><line x1="${x+17}" x2="${x+29}" y1="${f1(yv(v-sd))}" y2="${f1(yv(v-sd))}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      s+=`<text x="${x+23}" y="${f1(yv(v+sd)-6)}" class="t-lbl t-mid">${v}</text><text x="${x+23}" y="256" class="t-sm t-mid">${l}</text><text x="${x+23}" y="270" class="t-xs t-mid">${mm}</text>`});
    s+=`<line x1="30" x2="176" y1="${f1(yv(6.8))}" y2="${f1(yv(6.8))}" style="stroke:var(--xtal);stroke-width:1.6;stroke-dasharray:6 4"/><text x="30" y="286" class="t-xs" style="fill:var(--xtal)">dashed line: 6.8 mg/dL saturation</text>`;
    s+=`<text x="200" y="40" class="t-xs">41 PEOPLE DURING A FLARE</text>`;
    for(let k=0;k<41;k++){const x=208+(k%7)*20,y=60+Math.floor(k/7)*22;s+=`<circle cx="${x}" cy="${y}" r="7" style="fill:${k<20?'var(--sea)':'var(--panel-2)'};stroke:${k<20?'var(--sea)':'var(--line)'}"/>`}
    s+=`<text x="200" y="210" class="t-sm" style="fill:var(--sea)">normal urate: 20 of 41</text><text x="200" y="226" class="t-sm" style="fill:var(--sea)">(49%)</text>`;
    el.innerHTML=s})();

  $('#flCards').innerHTML=`
   <div class="card"><span class="ev hyp">Open question</span><h4>Is NLRP3 itself required?</h4><p>Macrophages lacking inflammasome parts fail to activate IL-1β with MSU crystals <sup class="c" data-ref="Martinon2006" title="Source 250">250</sup>. Yet with MSU plus a free fatty acid, IL-1β release needed ASC and caspase-1 but not NLRP3 <sup class="c" data-ref="Joosten2010" title="Source 188">188</sup>, and neutrophil and mast cell proteases can also process IL-1β <sup class="c" data-ref="Busso2010" title="Source 33">33</sup>. The IL-1β and IL-1 receptor step is firmly established <sup class="c" data-ref="Chen2006,So2007" title="Source 38,371">38,371</sup>.</p></div>
   <div class="card"><span class="ev hyp">Open question</span><h4>Do TLRs see the crystals?</h4><p>TLR2 and TLR4 and CD14 contribute in some models <sup class="c" data-ref="Busso2010,Joosten2010" title="Source 33,188">33,188</sup>. In another, mice lacking various TLRs had normal neutrophil influx, and none of TLR1–11 responded to MSU in reporter cells <sup class="c" data-ref="Chen2006" title="Source 38">38</sup>. The animation draws TLR2/4 because the fatty-acid signal used TLR2.</p></div>
   <div class="card"><h4>Animal clocks, human clocks</h4><ul><li>Mouse air pouch: neutrophils at 4 h depend on CXCR2 ligands <sup class="c" data-ref="Busso2010" title="Source 33">33</sup>.</li><li>Rabbit: blocking IL-8 stops the later influx at 24 h <sup class="c" data-ref="Busso2010" title="Source 33">33</sup>.</li><li>Human skin blisters: TNF but no TGF-β1 at 16 h, TGF-β1 at 40 h <sup class="c" data-ref="Yagnik2004" title="Source 437">437</sup>.</li><li>Human synovial fluid: phases at 0–48 h, days 3–4 and days 5–7 <sup class="c" data-ref="Scanu2012" title="Source 349">349</sup>.</li></ul></div>
   <div class="card"><h4>More players</h4><p>MSU activates the classical complement pathway, amplified by CRP and IgG, and the alternative pathway, with C5a made by a convertase that forms on the crystal surface <sup class="c" data-ref="Busso2010" title="Source 33">33</sup>. In mice, mast-cell IL-1β adds to swelling early in MSU arthritis <span class="ev early">Early evidence</span> <sup class="c" data-ref="Reber2014" title="Source 327">327</sup>.</p></div>
   <div class="card"><h4>Is this a flare?</h4><p>For people already diagnosed, a validated rule calls it a flare when at least 3 of 4 are present: the person says it is a flare, pain at rest above 3 out of 10, at least one swollen joint, and at least one warm joint. It had 85% sensitivity and 95% specificity in 509 patients <sup class="c" data-ref="Gaffo2018" title="Source 143">143</sup>.</p></div>
   <div class="card"><h4>After the flare: the tophus</h4><p>Tophi share features with aggregated NETs <sup class="c" data-ref="Schauer2014" title="Source 350">350</sup>. In surgically removed tophi, the corona zone held many macrophage-lineage cells and large numbers of IL-1β-expressing cells, a cycle of chronic inflammation, attempted resolution and remodelling <sup class="c" data-ref="Dalbeth2010" title="Source 72">72</sup>. See <a href="#crystals" data-go="crystals">Crystals vs serum urate</a> for how they dissolve.</p></div>`;
};
/* =============== 2.1 colchicine inside the cell =============== */
/* Adapted from the FMF Companion's 2.1: scenes 1–5 and 7 carry over, scene 6 (pyrin)
   becomes NLRP3 assembly on microtubules, and the neutrophil now faces a urate crystal. */
const CI_STEPS=[
 {from:0,at:.05,k:'Scene 1 · The gut',t:'Swallowed and absorbed',
  txt:'Colchicine is taken by mouth and absorbed in the small intestine. One 0.6 mg tablet gives a mean peak of 2.5 ng/mL 1–2 hours after a fasting dose, and absolute bioavailability is about 45%. P-glycoprotein in the gut wall pumps part of each dose back into the lumen, and intestinal CYP3A4 metabolises a little more. The US low-dose flare regimen (1.8 mg over 1 hour) peaked at a mean 6.2 ng/mL; the old high-dose regimen (4.8 mg over 6 hours) reached only 6.8 ng/mL. <sup class="c" data-ref="Rochdi1994,FDA-Colcrys,Slobodnick2018" title="Source 117,336,369">117,336,369</sup>',
  pt:'The tablet is absorbed from the gut. Only part of each dose gets into the body, and piling on more tablets barely raises the peak.',
  hook:'Colchicine is a P-glycoprotein (ABCB1) and CYP3A4 substrate. Both matter for drug interactions. The extra 3 mg of the old high-dose flare regimen added almost nothing to the peak level.'},
 {from:.12,at:.17,k:'Scene 2 · Liver and bile',t:'Recycling through bile',
  txt:'The liver metabolises part of the drug through CYP3A4 and secretes some into bile. Bile returns it to the gut, where some is absorbed again. The label reports secondary plasma peaks 3–36 hours after a dose, put down to intestinal secretion and reabsorption or biliary recirculation, and most volunteers in one study had a second peak within 6 hours. The kidneys excrete a share unchanged; the US label reports 40–65% of a 1 mg dose in urine. A volume of distribution of about 6–7 L/kg gives a long half-life, but the figures disagree: 26.6–31.2 hours on repeated dosing in the label, 30–34 hours after one oral dose, 57.8 hours after an intravenous dose. <sup class="c" data-ref="FDA-Colcrys,Ferron1996,Rochdi1994" title="Source 117,132,336">117,132,336</sup>',
  pt:'The liver sends the drug out in bile, and the gut takes some of it back up, so it lingers in the body.',
  hook:'Enterohepatic recirculation helps explain the long half-life. Treat the half-life as a <b>range</b> (about 27–58 h across studies), not one number.'},
 {from:.26,at:.34,k:'Scene 3 · Neutrophils',t:'It piles up in white cells',
  txt:'After a single 1 mg dose, plasma colchicine peaked at 1 hour but leukocyte colchicine peaked 47 hours later. On repeated dosing, granulocytes held about twice the concentration of mononuclear cells, and the leukocyte half-life was 41–46 hours. Granulocytes showed no surface P-glycoprotein and no pump function, so colchicine that enters them is not pushed back out. That this trapping explains the drug\'s selectivity is a hypothesis. Levels vary a lot between people: in 30 people taking 0.5 to 2 mg a day (for FMF), plasma and leukocyte levels did not track the dose taken, and uptake into leukocytes was saturable. <sup class="c" data-ref="Chappey1993,Klimecki1994,BenChetrit1998MH,Chappey1994" title="Source 21,36,37,210">21,36,37,210</sup>',
  pt:'White blood cells soak the drug up and hold on to it. Plasma levels fall within hours, but levels inside the white cells stay up for days.',
  hook:'Plasma peak at <b>1 h</b>, leukocyte peak about <b>2 days</b> later. Low P-gp in neutrophils = intracellular trapping (proposed).'},
 {from:.45,at:.5,k:'Scene 4 · Tubulin',t:'Binding free tubulin',
  txt:'Inside the cell colchicine binds free β-tubulin at the "colchicine site". The tubulin–colchicine complex adds to the growing end of a microtubule and stops further growth. The US label describes the same step: colchicine inhibits β-tubulin polymerisation into microtubules. <sup class="c" data-ref="Leung2015,FDA-Colcrys" title="Source 117,229">117,229</sup>',
  pt:'The drug grabs the building blocks of the cell\'s internal scaffolding.',
  hook:'Colchicine binds <b>tubulin</b> (not the finished microtubule). Low concentrations cap; higher concentrations depolymerise.'},
 {from:.6,at:.66,k:'Scene 5 · Microtubules',t:'The tracks shorten',
  txt:'Microtubules constantly grow and shrink. With their growing ends capped, they shrink faster than they can rebuild. They are also the cell\'s tracks: motor proteins such as dynein carry mitochondria along them, and that transport is the step the inflammasome in scene 6 depends on. Tubulin disruption is the primary mechanism, and it then dampens several inflammatory pathways at once. <sup class="c" data-ref="Leung2015,Misawa2013" title="Source 229,263">229,263</sup>',
  pt:'The scaffolding falls apart. Cargo that used to ride along it, such as the cell\'s mitochondria, is left stranded.',
  hook:'One target, many jobs lost: the label says colchicine prevents neutrophil <b>activation, degranulation and migration</b>. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>'},
 {from:.74,at:.8,k:'Scene 6 · NLRP3',t:'NLRP3 needs microtubules to assemble',
  txt:'A gout flare starts when urate crystals switch on the NLRP3 (NALP3) inflammasome, which makes active IL-1β; mice lacking its parts, or the IL-1 receptor, had impaired neutrophil influx. Potassium leaking out of the cell is the common trigger. In cultured cells, NLRP3 activators lower NAD⁺ and inactivate sirtuin 2, so acetylated α-tubulin builds up and drives dynein to carry mitochondria, with ASC on them, to NLRP3. Only then can the two meet and assemble. Reviews state that colchicine\'s microtubule block dampens this step; the cell study itself did not test colchicine. <sup class="c" data-ref="Martinon2006,MunozPlanillo2013,Misawa2013,Leung2015,Dalbeth2014ClinTher" title="Source 78,229,250,263,265">78,229,250,263,265</sup>',
  pt:'The crystal alarm needs two parts to meet inside the cell, and they travel on microtubules. With the tracks gone, the parts stay apart and the alarm is quieter.',
  hook:'Exam answer: colchicine → tubulin → microtubule disruption → <b>less NLRP3 inflammasome assembly</b> → less IL-1β → fewer neutrophils called in.'},
 {from:.87,at:.93,k:'Scene 7 · The neutrophil',t:'Less crawling, sticking and firing at crystals',
  txt:'Without a working microtubule network, neutrophils migrate poorly toward chemoattractants. Colchicine also alters adhesion at two concentration levels: at very low, prophylactic-range levels (IC50 about 3 nM) it changes the distribution, not the amount, of E-selectin on endothelial cells and abolishes their extra stickiness for neutrophils; at higher, therapeutic-range levels (IC50 about 300 nM) neutrophils lose L-selectin. In human neutrophils it blocked the signal triggered by urate and CPP crystals but not that triggered by other stimuli. In mice it blocked crystal-induced superoxide at doses 100 times lower than those needed to stop neutrophils entering, which the authors offer as a reason low doses work. <sup class="c" data-ref="Dalbeth2014ClinTher,Cronstein1995,Roberge1993,Chia2008" title="Source 45,68,78,334">45,68,78,334</sup>',
  pt:'White cells move and stick less, and they react less to the crystals, so fewer of them flood the joint.',
  hook:'Two layers of effect: <b>inside</b> the cell (NLRP3, crystal signalling) and <b>between</b> cells (chemotaxis, selectin-mediated adhesion).'}
];
inits.colin=()=>{
  const svg=$('#ciSvg'),rg=$('#ciT');
  let N=false;                     // set by draw(); every scene reads it
  const r=rng(23);const MOL=Array.from({length:26},(_,i)=>({o:r()*.5,loop:i%3===0}));
  const along=(pts,u)=>{u=clamp(u);let L=[],tot=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(d);tot+=d}
    let x=u*tot;for(let i=0;i<L.length;i++){if(x<=L[i]||i===L.length-1){const k=L[i]?clamp(x/L[i]):0;return[lerp(pts[i][0],pts[i+1][0],k),lerp(pts[i][1],pts[i+1][1],k)]}x-=L[i]}};
  /* wide: a left-to-right anatomical route */
  const P_IN=[[70,46],[96,96],[118,140],[160,190],[214,220],[262,236]],P_PORT=[[262,236],[312,196],[386,150],[450,118]],P_BLOOD=[[450,118],[540,96],[640,96],[640,210]],P_BILE=[[450,118],[430,180],[392,222],[310,246],[262,236]];
  /* narrow: the same journey read top to bottom */
  const Q_IN=[[40,42],[64,80],[88,104],[96,114],[122,150],[142,176],[258,176],[286,190],[292,204],[286,218],[258,232],[106,232],[80,244],[72,260],[80,276],[106,288],[250,288]],
        Q_PORT=[[250,288],[268,312],[240,340],[204,360]],
        Q_BLOOD=[[204,360],[262,352],[310,384],[310,500]],
        Q_BILE=[[204,360],[150,392],[100,372],[70,332],[74,300],[104,288]],
        Q_BILE_M=[...Q_BILE,[250,288]];
  const mol=(x,y,o=1)=>`<path d="M${f1(x)} ${f1(y-5)} l5 5 -5 5 -5 -5z" style="fill:var(--crocus);opacity:${f1(o)}"/>`;
  const pl=pts=>'M'+pts.map(p=>p.join(' ')).join(' L');
  const H_A=640,H_B=700,H_C=372,H_D=812;   // narrow heights, one per scene
  function sceneA(t,o){if(o<=0)return'';
    const L=N
      ? {IN:Q_IN,PORT:Q_PORT,BLOOD:Q_BLOOD,BILE:Q_BILE,BILEM:Q_BILE_M,esoN:4,
         tabX:24,tabY:20,tabLx:62,tabLy:33,
         stCx:96,stCy:112,stRx:34,stRy:22,stLx:138,stLy:116,stCls:'t-xs',
         gut:'M56 176 H268 A28 28 0 0 1 268 232 H100 A28 28 0 0 0 100 288 H288',gutW:16,
         giLx:20,giLy:158,
         pvLx:272,pvLy:318,pvRot:'',
         livX:148,livY:373,
         bileCx:80,bileCy:352,bileLx:14,bileLy:452,
         bloodLx:322,bloodLy:470,
         kidStem:'M310 500 V538',kidX:300,kidY:570,kidLx:296,kidLy:606,kidCls:'t-xs t-mid',
         pgpX:64,pgpY:208,pgpT:'P-gp pumps some back',
         ehA:'M56 440 q-6 -46 20 -74',ehLx:14,ehLy:474}
      : {IN:P_IN,PORT:P_PORT,BLOOD:P_BLOOD,BILE:P_BILE,BILEM:P_BILE,esoN:3,
         tabX:54,tabY:26,tabLx:96,tabLy:38,
         stCx:120,stCy:140,stRx:34,stRy:24,stLx:120,stLy:182,stCls:'t-xs t-mid',
         gut:'M150 180 q30 40 60 10 t60 20 t50 40 t60 -10 t40 40',gutW:16,
         giLx:230,giLy:300,
         pvLx:300,pvLy:168,pvRot:' transform="rotate(-30 300 168)"',
         livX:410,livY:80,
         bileCx:430,bileCy:182,bileLx:446,bileLy:210,
         bloodLx:652,bloodLy:150,
         kidStem:'M640 210 V300',kidX:610,kidY:320,kidLx:626,kidLy:346,kidCls:'t-xs t-mid',
         pgpX:400,pgpY:270,pgpT:'P-gp in gut wall pumps some back',
         ehA:'M300 258 q-20 30 -60 22',ehLx:160,ehLy:330};
    let s=`<g style="opacity:${f1(o)}">`;
    // anatomy
    s+=`<path d="${pl(L.IN.slice(0,L.esoN))}" style="fill:none;stroke:var(--line);stroke-width:12;stroke-linecap:round"/>`;
    s+=`<ellipse cx="${L.stCx}" cy="${L.stCy}" rx="${L.stRx}" ry="${L.stRy}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><text x="${L.stLx}" y="${L.stLy}" class="${L.stCls}">stomach</text>`;
    s+=`<path d="${L.gut}" style="fill:none;stroke:var(--memb);stroke-width:${L.gutW};stroke-linecap:round;opacity:.55"/><text x="${L.giLx}" y="${L.giLy}" class="t-sm">SMALL INTESTINE</text>`;
    s+=`<path d="${pl(L.PORT)}" style="fill:none;stroke:var(--bad);stroke-width:5;opacity:.35"/><text x="${L.pvLx}" y="${L.pvLy}" class="t-xs"${L.pvRot}>portal vein</text>`;
    s+=`<path d="M${L.livX} ${L.livY} q60 -40 120 -6 q20 30 -10 56 q-60 34 -116 6 q-24 -24 6 -56z" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/><text x="${L.livX+64}" y="${L.livY+22}" class="t-lbl t-mid">liver</text><text x="${L.livX+64}" y="${L.livY+38}" class="t-xs t-mid">CYP3A4</text>`;
    s+=`<path d="${pl(L.BILE)}" style="fill:none;stroke:var(--gold);stroke-width:4;stroke-dasharray:6 5"/><circle cx="${L.bileCx}" cy="${L.bileCy}" r="12" style="fill:var(--gold-soft);stroke:var(--gold)"/><text x="${L.bileLx}" y="${L.bileLy}" class="t-xs" style="fill:var(--gold)">bile → back to gut</text>`;
    s+=`<path d="${pl(L.BLOOD)}" style="fill:none;stroke:var(--bad);stroke-width:7;opacity:.4"/><text x="${L.bloodLx}" y="${L.bloodLy}" class="t-sm">BLOOD</text>`;
    s+=`<path d="${L.kidStem}" style="stroke:var(--bad);stroke-width:7;opacity:.4"/><path d="M${L.kidX} ${L.kidY} q-14 -26 10 -34 q20 -4 22 20 q-4 24 -32 14z" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="${L.kidLx}" y="${L.kidLy}" class="${L.kidCls}">kidney → urine (40–65%)</text>`;
    s+=`<rect x="${L.tabX}" y="${L.tabY}" width="32" height="16" rx="8" style="fill:var(--crocus);opacity:${f1(1-ramp(t,0,.04))}"/><text x="${L.tabLx}" y="${L.tabLy}" class="t-xs">tablet</text>`;
    s+=`<text x="${f1(L.pgpX)}" y="${f1(L.pgpY)}" class="t-xs" style="fill:var(--crocus)">${L.pgpT}</text>`;
    const T=t/.26;
    MOL.forEach((m,i)=>{const life=clamp(T*1.5-m.o);if(life<=0)return;let p;
      if(life<.32)p=along(L.IN,life/.32);else if(life<.5)p=along(L.PORT,(life-.32)/.18);
      else if(m.loop&&life<.78)p=along(L.BILEM,(life-.5)/.28);else if(m.loop)p=along(L.PORT,(life-.78)/.22);else p=along(L.BLOOD,(life-.5)/.5);
      s+=mol(p[0],p[1]+(i%3-1)*3)});
    if(t>.12)s+=`<path d="${L.ehA}" class="arrow" style="stroke:var(--gold)"/><text x="${L.ehLx}" y="${L.ehLy}" class="t-xs" style="fill:var(--gold)">enterohepatic recycling</text>`;
    return s+'</g>'}
  function sceneB(t,o){if(o<=0)return'';const k=ramp(t,.26,.44);
    const L=N
      ? {hx:20,hy:24, nCx:200,nCy:138,nR:84, nLy:244,nL2y:260,
         pCx:200,pCy:386,pR:70,pNuc:24,pIn:48,pOut:92, pLy:498,pL2y:514,
         pumpLx:20,pumpLy:322,
         cx0:28,cx1:380,cy0:584,cy1:660,
         head:['AFTER ONE DOSE · 0–4 days','each curve scaled to its own peak','(leukocyte levels are far higher)'],headY:540,
         lgx:28,lgx2:160,lgy:680,lgEnd:false}
      : {hx:20,hy:28, nCx:190,nCy:150,nR:100, nLy:272,nL2y:288,
         pCx:500,pCy:150,pR:88,pNuc:30,pIn:60,pOut:120, pLy:262,pL2y:278,
         pumpLx:600,pumpLy:60,
         cx0:40,cx1:700,cy0:310,cy1:380,
         head:['AFTER ONE DOSE · 0–4 days · each curve scaled to its own peak (leukocyte levels are far higher)'],headY:304,
         lgx:700,lgx2:700,lgy:314,lgEnd:true};
    const sc=L.nR/100;
    let s=`<g style="opacity:${f1(o)}">`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-sm">IN THE BLOODSTREAM</text>`;
    s+=`<circle cx="${L.nCx}" cy="${L.nCy}" r="${L.nR}" style="fill:var(--neut);stroke:var(--crocus);stroke-width:3"/><text x="${L.nCx}" y="${L.nLy}" class="t-lbl t-mid">neutrophil</text><text x="${L.nCx}" y="${L.nL2y}" class="t-xs t-mid">little P-gp → drug is trapped</text>`;
    [[-30,-18,22],[26,14,22],[18,-34,18]].forEach(([dx,dy,rr])=>s+=`<circle cx="${f1(L.nCx+dx*sc)}" cy="${f1(L.nCy+dy*sc)}" r="${f1(rr*sc)}" style="fill:var(--nuc);opacity:.85"/>`);
    const rN=rng(3);const nIn=Math.round(6+44*k);for(let i=0;i<nIn;i++){const a=rN()*6.283,d=(20+rN()*68)*sc;s+=mol(L.nCx+Math.cos(a)*d,L.nCy+Math.sin(a)*d,.9)}
    s+=`<circle cx="${L.pCx}" cy="${L.pCy}" r="${L.pR}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:3"/><circle cx="${L.pCx}" cy="${L.pCy}" r="${L.pNuc}" style="fill:var(--nuc);opacity:.6"/><text x="${L.pCx}" y="${L.pLy}" class="t-lbl t-mid">cell with P-gp pumps</text><text x="${L.pCx}" y="${L.pL2y}" class="t-xs t-mid">e.g. gut lining, liver, kidney</text>`;
    [-.6,.5,1.6,2.7].forEach((a,i)=>{const x=L.pCx+L.pR*Math.cos(a),y=L.pCy+L.pR*Math.sin(a);s+=`<rect x="${f1(x-7)}" y="${f1(y-11)}" width="14" height="22" rx="4" transform="rotate(${f1(a*57.3+90)} ${f1(x)} ${f1(y)})" style="fill:var(--sea)"/>`;
      const ph=((t*30+i*.25)%1);s+=mol(lerp(L.pCx+L.pIn*Math.cos(a),L.pCx+L.pOut*Math.cos(a),ph),lerp(L.pCy+L.pIn*Math.sin(a),L.pCy+L.pOut*Math.sin(a),ph),1-ph)});
    s+=`<text x="${L.pumpLx}" y="${L.pumpLy}" class="t-xs" style="fill:var(--sea)">P-gp pumps it out</text>`;
    // mini chart: plasma vs leukocyte
    const x0=L.cx0,x1=L.cx1,y0=L.cy0,y1=L.cy1;s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    L.head.forEach((h,i)=>s+=`<text x="${x0}" y="${L.headY+i*14}" class="t-xs">${h}</text>`);
    const pf=u=>{const h=u*96;return h<1?h:.25*Math.exp(-(h-1)/40)+.75*Math.exp(-(h-1)/3)};const lf=u=>{const h=u*96;return (h/47)*Math.exp(1-h/47)};
    s+=`<path d="${pathFn(u=>u<=k?pf(u):NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--bad);stroke-width:2.5"/><path d="${pathFn(u=>u<=k?lf(u):NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--crocus);stroke-width:3"/>`;
    s+=`<text x="${L.lgx}" y="${L.lgy}" class="t-xs${L.lgEnd?' t-end':''}" style="fill:var(--crocus)">inside leukocytes</text><text x="${L.lgx2}" y="${L.lgy+(L.lgEnd?14:0)}" class="t-xs${L.lgEnd?' t-end':''}" style="fill:var(--bad)">plasma</text>`;
    return s+'</g>'}
  /* a mitochondrion: the cargo that rides the microtubule tracks (ASC sits on it in scene 6) */
  const mito=(x,y,o=1,w=9)=>`<g style="opacity:${f1(o)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${w}" ry="${f1(w*.5)}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:1.6"/><path d="M${f1(x-w*.6)} ${f1(y)} q${f1(w*.2)} ${f1(-w*.3)} ${f1(w*.4)} 0 t${f1(w*.4)} 0 t${f1(w*.4)} 0" style="fill:none;stroke:var(--memb);stroke-width:1"/></g>`;
  function sceneC(t,o){if(o<=0)return'';const bind=ramp(t,.45,.6),shrink=ease(ramp(t,.58,.74));
    const L=N
      ? {hx:20,hy:24, ctCx:34,ctCy:150,ctR:18,ctLy:186,
         rows:[90,150,210],x0:64,full:12,
         gA:146,gB:154,gStep:52,gStep2:54,
         poolX:24,poolDx:66,poolPer:4,poolY:310,poolDy:30,poolLx:20,poolLy:286,
         keyX:226,keyY:336}
      : {hx:20,hy:28, ctCx:52,ctCy:200,ctR:22,ctLy:240,
         rows:[110,200,290],x0:80,full:26,
         gA:240,gB:250,gStep:90,gStep2:92,
         poolX:430,poolDx:64,poolPer:4,poolY:350,poolDy:26,poolLx:430,poolLy:330,
         keyX:540,keyY:30};
    let s=`<g style="opacity:${f1(o)}">`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-sm">INSIDE THE WHITE CELL · MICROTUBULES</text><circle cx="${L.ctCx}" cy="${L.ctCy}" r="${L.ctR}" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="${L.ctCx}" y="${L.ctLy}" class="t-xs t-mid">centrosome</text>`;
    L.rows.forEach((y,ri)=>{const full=L.full,n=Math.round(full*(1-.72*shrink*(1-ri*.08)));
      for(let i=0;i<n;i++){const x=L.x0+i*22;s+=`<rect x="${x}" y="${y-12}" width="10" height="11" rx="2" style="fill:var(--tub-a)"/><rect x="${x+10}" y="${y-12}" width="10" height="11" rx="2" style="fill:var(--tub-b)"/><rect x="${x+5}" y="${y+1}" width="10" height="11" rx="2" style="fill:var(--tub-b)"/><rect x="${x+15}" y="${y+1}" width="7" height="11" rx="2" style="fill:var(--tub-a)"/>`;
        // cargo riding the track: it creeps toward the centrosome while the track is intact
        if(i%5===2&&n-i>2)s+=mito(x+10-(1-shrink)*((t*400+ri*7)%22),y-21,1)}
      const endX=L.x0+n*22;if(bind>.2)s+=mol(endX+6,y,bind);
      // falling dimers + stranded mitochondria
      for(let k=0;k<4;k++){const ph=(t*8+k*.25+ri*.3)%1;if(shrink>0&&shrink<1)s+=`<rect x="${f1(endX+10+ph*30)}" y="${f1(y+ph*36-6)}" width="16" height="9" rx="2" style="fill:var(--tub-b);opacity:${f1((1-ph)*.8)}"/>`}
      const rel=Math.round(5*shrink);for(let k=0;k<rel;k++){const gx=lerp(L.gA+k*L.gStep,L.gB+k*L.gStep2,shrink),gy=y+30+Math.sin(t*20+k)*6;if(!N&&ri===2&&gx>L.poolX-30)continue;s+=mito(gx,gy,shrink)}
    });
    // free tubulin + colchicine binding
    for(let k=0;k<7;k++){const x=L.poolX+(k%L.poolPer)*L.poolDx,y=L.poolY+Math.floor(k/L.poolPer)*L.poolDy;s+=`<rect x="${x}" y="${y-8}" width="22" height="11" rx="3" style="fill:var(--tub-b)"/>`;if(k/7<bind)s+=mol(x+28,y-3)}
    s+=`<text x="${L.poolLx}" y="${L.poolLy}" class="t-xs">tubulin + colchicine caps growing ends</text>`;
    s+=`<g transform="translate(${L.keyX} ${L.keyY})">${mito(6,0,1,8)}<text x="20" y="4" class="t-xs">mitochondrion (cargo)</text><path d="M6 14 l5 5 -5 5 -5 -5z" style="fill:var(--crocus)"/><text x="20" y="23" class="t-xs">colchicine</text></g>`;
    if(shrink>.5)s+=`<text x="${N?20:L.gA}" y="${N?262:376}" class="t-xs" style="fill:var(--memb);opacity:${f1(ramp(shrink,.5,1))}">tracks gone · cargo stranded</text>`;
    return s+'</g>'}
  /* scene 6 (NLRP3 on microtubule tracks) and scene 7 (the neutrophil facing a crystal) */
  function sceneD(t,o){if(o<=0)return'';const a=ramp(t,.74,.87),b=ramp(t,.87,1);
    const L=N
      ? {r1y:24,r1Nx:380,r1Ny:40,
         cbX:30,cbY:52,cbStep:52,cbW:200,
         offX:30,offY:262,
         r2y:296,r2Nx:380,r2Ny:312,
         miX:66,miY:350,erX:316,erY:350,xX:191,
         spX:70,spY:428,spTx:104,spTy:424,spT2y:438,
         neX:[270,310,350],neY:426,neTx:380,neTy:462,
         effHy:496,effX:20,effY:510,effStep:100,effW:360,effH:92,
         nX:44,nY:42,txX:76,ttY:26,l1Y:44,l2Y:58,
         arrX:104,arrY:76,arrLen:60,arrVar:100,crX:263,crY:66,
         vwX:0,vwW:320,vwY:84,vwTx:276,vwTy:78,xtY:80,xcDx:96}
      : {r1y:26,r1Nx:700,r1Ny:26,
         cbX:24,cbY:38,cbStep:172,cbW:150,
         offX:24,offY:106,
         r2y:134,r2Nx:700,r2Ny:134,
         miX:76,miY:182,erX:290,erY:182,xX:183,
         spX:410,spY:182,spTx:444,spTy:178,spT2y:194,
         neX:[600,640,680],neY:182,neTx:700,neTy:216,
         effHy:240,effX:24,effY:250,effStep:228,effW:216,effH:112,
         nX:36,nY:46,txX:64,ttY:30,l1Y:48,l2Y:62,
         arrX:60,arrY:88,arrLen:40,arrVar:60,crX:150,crY:78,
         vwX:0,vwW:176,vwY:98,vwTx:64,vwTy:92,xtY:94,xcDx:84};
    let s=`<g style="opacity:${f1(o)}">`;
    // row 1: what a crystal sets off
    s+=`<text x="20" y="${L.r1y}" class="t-sm">${N?'NO DRUG · CRYSTAL → NLRP3 MEETS ASC':'NO DRUG · A CRYSTAL SETS OFF NLRP3, CARRIED ON MICROTUBULES'}</text>`;
    if(!N)s+=`<text x="${L.r1Nx}" y="${L.r1Ny}" class="t-xs t-end" style="fill:var(--warn)">shown in cultured cells</text>`;
    else s+=`<text x="${L.r1Nx}" y="${L.r1Ny}" class="t-xs t-end" style="fill:var(--warn)">shown in cultured cells</text>`;
    const chain=[['crystal engulfed','var(--xtal)'],['NAD⁺ ↓ · SIRT2 off','var(--muted)'],['acetylated tubulin','var(--tub-a)'],['ASC meets NLRP3','var(--terra)']];
    chain.forEach(([l,c],i)=>{const on=ramp(a,i*.16,i*.16+.2),w=L.cbW;
      const x=N?L.cbX:L.cbX+i*L.cbStep, y=N?L.cbY+i*L.cbStep:L.cbY;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" style="fill:var(--panel);stroke:${c};stroke-width:${f1(1+2*on)};opacity:${f1(.3+.7*on)}"/><text x="${x+(i===0||i===3?w/2+12:w/2)}" y="${y+25}" class="t-lbl t-mid" style="opacity:${f1(.3+.7*on)}">${l}</text>`;
      if(i===0)s+=`<g style="opacity:${f1(.3+.7*on)}">${needle(x+18,y+20,24,-35)}${needle(x+24,y+24,16,20)}</g>`;
      if(i===3)s+=`<g style="opacity:${f1(.3+.7*on)}">${mito(x+16,y+20,1,8)}</g>`;
      if(i<3)s+=N
        ?`<path d="M${x+w/2} ${y+42} V${y+L.cbStep-2}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`
        :`<path d="M${x+w+2} ${y+20} H${x+L.cbStep-2}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`});
    const oo=ramp(a,.62,.8);
    s+=`<text x="${L.offX}" y="${L.offY}" class="t-xs" style="fill:var(--terra);opacity:${f1(oo)}">${N?'→ ASC speck → caspase-1 → IL-1β':'dynein carries the mitochondria (ASC) to NLRP3 → ASC speck → caspase-1 → IL-1β → neutrophils called in'}</text>`;
    if(N)s+=`<text x="${L.offX}" y="${L.offY+14}" class="t-xs" style="fill:var(--terra);opacity:${f1(oo)}">→ neutrophils called in</text>`;
    // row 2: with colchicine the tracks are gone
    const r2=ramp(a,.55,1);
    s+=`<text x="20" y="${L.r2y}" class="t-sm" style="opacity:${f1(.3+.7*r2)}">${N?'WITH COLCHICINE · NO TRACKS':'WITH COLCHICINE · NO TRACKS, SO THE PARTS STAY APART'}</text><text x="${L.r2Nx}" y="${L.r2Ny}" class="t-xs t-end" style="fill:var(--warn);opacity:${f1(.3+.7*r2)}">stated in reviews</text>`;
    s+=`<g style="opacity:${f1(.3+.7*r2)}">`;
    s+=mito(L.miX,L.miY,1,30);
    [-.9,-.3,.3,.9].forEach(k=>s+=`<circle cx="${f1(L.miX+k*24)}" cy="${f1(L.miY-15+Math.abs(k)*5)}" r="4" style="fill:var(--terra)"/>`);
    s+=`<text x="${L.miX}" y="${L.miY+32}" class="t-xs t-mid">mitochondrion + ASC</text>`;
    s+=`<rect x="${L.erX-34}" y="${L.erY-14}" width="68" height="28" rx="14" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.8"/><text x="${L.erX}" y="${L.erY+5}" class="t-lbl t-mid">NLRP3</text><text x="${L.erX}" y="${L.erY+32}" class="t-xs t-mid">on the ER</text>`;
    // broken track between them, colchicine on the fragments
    [[-58,0],[-30,6],[2,-4],[30,5]].forEach(([dx,dy],k)=>{const x=L.xX+dx,y=L.miY+dy*.6+16;s+=`<rect x="${f1(x)}" y="${f1(y-5)}" width="18" height="9" rx="2" transform="rotate(${k%2?14:-12} ${f1(x+9)} ${f1(y)})" style="fill:var(--tub-b)"/>`;if(k%2===0)s+=mol(x+22,y-4,r2)});
    s+=`<path d="M${L.miX+36} ${L.miY-2} H${L.erX-40}" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 5;fill:none"/>`;
    s+=`<path d="M${L.xX-11} ${L.miY-13} l22 22 M${L.xX+11} ${L.miY-13} l-22 22" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round;opacity:${f1(r2)}"/>`;
    // no speck, less IL-1β, fewer neutrophils
    for(let k=0;k<12;k++){const an=k/12*6.283;s+=`<circle cx="${f1(L.spX+Math.cos(an)*16)}" cy="${f1(L.spY+Math.sin(an)*16)}" r="3.4" style="fill:var(--terra);opacity:.4"/>`}
    s+=`<path d="M${L.spX-22} ${L.spY-22} L${L.spX+22} ${L.spY+22} M${L.spX+22} ${L.spY-22} L${L.spX-22} ${L.spY+22}" style="stroke:var(--bad);stroke-width:3.5;stroke-linecap:round;opacity:${f1(r2)}"/>`;
    s+=`<text x="${L.spTx}" y="${L.spTy}" class="t-lbl">no ASC speck</text><text x="${L.spTx}" y="${L.spT2y}" class="t-xs">less IL-1β made</text>`;
    L.neX.forEach((x,k)=>s+=neutro(x,L.neY,12,lerp(1,.22,ramp(r2,k*.2,k*.2+.5))));
    s+=`<text x="${L.neTx}" y="${L.neTy}" class="t-xs t-end">fewer neutrophils called in</text>`;
    s+='</g>';
    // scene 7: the neutrophil itself
    s+=`<text x="20" y="${L.effHy}" class="t-sm" style="opacity:${f1(.3+.7*b)}">AND ACROSS THE WHOLE NEUTROPHIL</text>`;
    const eff=[['Chemotaxis','crawls poorly toward; chemoattractants'],['Adhesion','sheds L-selectin; E-selectin moved'],['Crystal response','signal from crystals; blocked, less superoxide']];
    eff.forEach(([h,d],i)=>{const on=ramp(b,i*.25,i*.25+.3);
      const x=N?L.effX:L.effX+i*L.effStep, y=N?L.effY+i*L.effStep:L.effY;
      s+=`<g style="opacity:${f1(.25+.75*on)}"><rect x="${x}" y="${y}" width="${L.effW}" height="${L.effH}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>${neutro(x+L.nX,y+L.nY,16,1)}<text x="${x+L.txX}" y="${y+L.ttY}" class="t-lbl">${h}</text><text x="${x+L.txX}" y="${y+L.l1Y}" class="t-xs">${d.split('; ')[0]}</text><text x="${x+L.txX}" y="${y+L.l2Y}" class="t-xs">${d.split('; ')[1]||''}</text>`;
      if(i===0)s+=`<path d="M${x+L.arrX} ${y+L.arrY} h${f1(L.arrLen+L.arrVar*(1-on))}" class="arrow" marker-end="url(#ciA)"/><path d="M${x+L.crX} ${y+L.crY} l14 18 M${x+L.crX+14} ${y+L.crY} l-14 18" style="stroke:var(--bad);stroke-width:3;opacity:${f1(on)}"/>`;
      if(i===1)s+=`<path d="M${x+L.vwX+20} ${y+L.vwY} H${x+L.vwX+L.vwW+20}" style="stroke:var(--bad);stroke-width:4;opacity:.5"/><text x="${x+L.vwTx}" y="${y+L.vwTy}" class="t-xs" style="fill:var(--bad)">vessel wall</text>`;
      if(i===2){const cx=x+L.nX+L.xcDx,cy=y+L.xtY;
        s+=needle(cx,cy,38,-24)+needle(cx+20,cy+4,26,10)+needle(cx-12,cy+4,20,55);
        s+=`<path d="M${x+L.nX+12} ${y+L.nY+14} L${f1(cx-18)} ${f1(cy)}" style="stroke:var(--terra);stroke-width:1.6;stroke-dasharray:3 4;fill:none"/>`;
        const mx=(x+L.nX+12+cx-18)/2,my=(y+L.nY+14+cy)/2;
        s+=`<path d="M${f1(mx-7)} ${f1(my-7)} l14 14 M${f1(mx+7)} ${f1(my-7)} l-14 14" style="stroke:var(--bad);stroke-width:3;opacity:${f1(on)}"/>`;
        s+=`<text x="${f1(cx+38)}" y="${f1(cy+4)}" class="t-xs" style="fill:var(--xtal)">MSU crystal</text>`}
      s+='</g>'});
    return s+'</g>'}
  function draw(t){
    const oA=1-ramp(t,.24,.28),oB=ramp(t,.25,.29)*(1-ramp(t,.43,.47)),oC=ramp(t,.44,.48)*(1-ramp(t,.72,.76)),oD=ramp(t,.73,.77);
    let hN=0;if(oA>0)hN=Math.max(hN,H_A);if(oB>0)hN=Math.max(hN,H_B);if(oC>0)hN=Math.max(hN,H_C);if(oD>0)hN=Math.max(hN,H_D);
    N=vb(svg,'720 400','400 '+(hN||H_A));
    const VW=N?400:720,VH=N?(hN||H_A):400;
    svg.innerHTML=`<defs>${marker('ciA')}</defs><rect width="${VW}" height="${VH}" rx="12" style="fill:var(--field)"/>`+sceneA(t,oA)+sceneB(t,oB)+sceneC(t,oC)+sceneD(t,oD);
    const p=phaseOf(CI_STEPS,t);setSt(p);$('#ciNote').innerHTML=noteHTML(CI_STEPS[p]);
  }
  const stop=playWire(rg,$('#ciPlay'),draw,26000,'Replay','colin');
  const setSt=stepWire($('#ciSteps'),CI_STEPS,rg,draw,stop);
  $('#ciCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>It binds tubulin and disrupts microtubules</h4><p>This is the primary mechanism and the starting point of every downstream effect. A systematic review of colchicine in gout lists what follows from it: disrupted inflammasome activation, less microtubule-based chemotaxis, less leukotriene and cytokine generation, and less phagocytosis. <sup class="c" data-ref="Leung2015,Dalbeth2014ClinTher" title="Source 78,229">78,229</sup></p></div>
   <div class="card"><span class="ev est">Established</span><h4>Urate crystals switch on NLRP3</h4><p>Crystals engage the caspase-1-activating NLRP3 (NALP3) inflammasome, producing active IL-1β and IL-18. Mice lacking caspase-1, ASC, NLRP3 or the IL-1 receptor had impaired neutrophil influx. <sup class="c" data-ref="Martinon2006" title="Source 250">250</sup></p></div>
   <div class="card"><span class="ev est">Established in cells</span><h4>NLRP3 assembly needs microtubules</h4><p>Acetylated α-tubulin drives dynein to carry mitochondria, and the ASC on them, to NLRP3. That colchicine's microtubule block dampens this step is stated in reviews; the cell study did not itself test colchicine. <sup class="c" data-ref="Misawa2013,Leung2015,Dalbeth2014ClinTher" title="Source 78,229,263">78,229,263</sup></p></div>
   <div class="card"><span class="ev est">Established in vitro</span><h4>It blocks the crystal signal in neutrophils</h4><p>In human blood neutrophils, colchicine dose-dependently blocked the tyrosine phosphorylation set off by urate and CPP crystals, but not that set off by fMLP, C5a, leukotriene B4 or zymosan. Inactive lumicolchicine, indomethacin and phenylbutazone had no such effect. <sup class="c" data-ref="Roberge1993" title="Source 334">334</sup></p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Why low doses may be enough</h4><p>In a mouse crystal model, oral colchicine blocked neutrophil superoxide at doses 100 times lower than those needed to stop neutrophils entering, without acute liver or kidney toxicity. Endothelial E-selectin changed at about 3 nM, a prophylactic-range level. <sup class="c" data-ref="Chia2008,Cronstein1995" title="Source 45,68">45,68</sup></p></div>
   <div class="card"><span class="ev hyp">Hypothesis</span><h4>Why neutrophils trap the drug</h4><p>Granulocytes showed no surface P-glycoprotein and no pump function. That this lack of an efflux pump explains colchicine's selectivity for neutrophil-driven inflammation is a proposed explanation, not a proven one. <sup class="c" data-ref="Klimecki1994,BenChetrit1998MH" title="Source 21,210">21,210</sup></p></div>`;
  draw(+rg.value);
};
/* =============== 2.2 treating a flare =============== */
/* The pain curves reuse the FMF attack engine (pathFn, drawn up to the scrubber with the
   rest ghosted); the option cards follow the FMF ladder's card pattern. */
const FX_STEPS=[
 {from:0,at:.05,k:'First hours',t:'Start early',
  txt:'A typical gout flare reaches maximal pain in under 24 hours and resolves within 14 days. In 11 volunteers with untreated podagra, 2 withdrew on day 4 with severe pain, and only 3 of the 9 who stayed reported their pain gone within 7 days. EULAR 2016 recommends treatment within 12 hours of onset and teaching people to self-medicate at the first warning symptoms; ACR 2012 advises within 24 hours, and colchicine only if onset was 36 hours or less earlier. ACR 2020 records patients\' preference for a "medication-in-pocket" plan. No trial has randomised start times: the windows rest on trial entry criteria and consensus. <sup class="c" data-ref="Neogi2015,Bellamy1987,Richette2017,Khanna2012P2,FitzGerald2020,Terkeltaub2010" title="Source 20,135,203,290,331,406">20,135,203,290,331,406</sup>',
  pt:'A flare usually hits its worst within a day, then slowly settles over one to two weeks. Medicine works best if taken at the first sign, so many people keep a supply at home.',
  hook:'Windows: <b>12 h</b> (EULAR, colchicine), <b>24 h</b> (ACR 2012, any treatment), <b>≤ 36 h</b> (ACR 2012, colchicine). Consensus, not randomised timing.'},
 {from:.3,at:.35,k:'Low-dose colchicine',t:'AGREE: low dose as good as high',
  txt:'AGREE randomised 184 people within 12 hours of onset. At 24 hours, 37.8% on low dose (1.2 mg then 0.6 mg 1 hour later) had at least 50% less pain without rescue medicine, against 32.7% on high dose (4.8 mg over 6 hours) and 15.5% on placebo. Diarrhoea: 23.0% low dose, 76.9% high dose. In the first placebo-controlled trial, two-thirds improved at 48 hours vs one-third on placebo, but every colchicine-treated patient got diarrhoea. ACR 2020 strongly recommends the low dose. <sup class="c" data-ref="Terkeltaub2010,Ahern1987,FitzGerald2020" title="Source 5,135,406">5,135,406</sup>',
  pt:'With colchicine, the small dose (three tablets over one hour) works as well as the old big dose and causes much less diarrhoea.',
  hook:'Low dose <b>1.8 mg over 1 h</b> = high dose 4.8 mg for benefit (37.8% vs 32.7% vs placebo 15.5%), with diarrhoea <b>23% vs 77%</b>.'},
 {from:.55,at:.6,k:'NSAID or steroid',t:'Equivalent options',
  txt:'Prednisolone 35 mg once daily for 5 days matched naproxen 500 mg twice daily (pain fell 44.7 vs 46.0 mm at 90 h, 120 people). In 416 emergency patients prednisolone matched indomethacin, with fewer minor adverse events in the department (6% vs 19%). In CONTACT (399 people), naproxen and low-dose colchicine relieved pain equally over 7 days, but colchicine caused more diarrhoea (45.9% vs 20.0%) and headache. ACR 2020 ranks no first-line agent above another. <sup class="c" data-ref="Janssens2008,Rainer2016,Roddy2020,FitzGerald2020" title="Source 135,179,325,338">135,179,325,338</sup>',
  pt:'Colchicine, an anti-inflammatory pill such as naproxen, or a short course of a steroid like prednisolone all work about equally well. Your doctor picks the one that is safest for you.',
  hook:'Prednisolone 35 mg/day × 5 days ≈ naproxen 500 mg twice daily (Janssens 2008). Choose by <b>comorbidity</b>, not by efficacy.'},
 {from:.8,at:.85,k:'When nothing else fits',t:'IL-1 blockade',
  txt:'Canakinumab 150 mg under the skin reduced 72-hour pain more than triamcinolone 40 mg (25.0 vs 35.7 mm) and cut new-flare risk by 62% at 12 weeks, with more adverse events (66.2% vs 52.8%) and infections. The US approved it in 2023 for adults who cannot use NSAIDs and colchicine and for whom repeated steroid courses are not appropriate, with at least 12 weeks before re-treatment; it is avoided during an active infection needing treatment. Anakinra is not approved for gout. ACR 2020 makes IL-1 inhibition conditional, for when other options are ineffective, poorly tolerated or contraindicated. <sup class="c" data-ref="Schlesinger2012,FDA-IlarisGout2023,IlarisPIG,KineretPI,FitzGerald2020" title="Source 121,135,175,207,355">121,135,175,207,355</sup>',
  pt:'If none of the usual medicines are safe for you, a specialist may offer an injection that blocks the inflammation signal IL-1.',
  hook:'IL-1 blockade is <b>second line</b>: canakinumab 150 mg SC, re-treatment ≥ 12 weeks apart, not in active infection.'}
];
const FX_START=[6,12,24,36,72];
const FX_OPTS=[
 {id:'colch',n:'Colchicine, low dose',tag:'first line',tc:'crocus',
  b:'US label: 1.2 mg, then 0.6 mg 1 hour later. EULAR 2016: 1 mg, then 0.5 mg, within 12 hours. ACR 2012: only if onset was 36 hours or less earlier. AGREE: 37.8% responders vs 15.5% on placebo. <sup class="c" data-ref="FDA-Colcrys,Richette2017,Khanna2012P2,Terkeltaub2010" title="Source 117,203,331,406">117,203,331,406</sup>'},
 {id:'nsaid',n:'NSAID or COX-2 inhibitor',tag:'first line',tc:'sea',
  b:'ACR 2012: full anti-inflammatory doses; naproxen, indomethacin and sulindac were FDA-approved for gout. COX-2 inhibitors gave similar pain relief with fewer adverse events than non-selective NSAIDs. NICE suggests adding a proton pump inhibitor. <sup class="c" data-ref="Khanna2012P2,vanDurme2021,NICE-NG219" title="Source 203,293,418">203,293,418</sup>'},
 {id:'oral',n:'Oral glucocorticoid',tag:'first line',tc:'sea',
  b:'Prednisolone 35 mg daily for 5 days matched naproxen; prednisolone matched indomethacin with fewer early minor adverse events. ACR 2012: prednisone or prednisolone at least 0.5 mg/kg/day for 5–10 days, then stop (Evidence A). <sup class="c" data-ref="Janssens2008,Rainer2016,Khanna2012P2" title="Source 179,203,325">179,203,325</sup>'},
 {id:'ia',n:'Intra-articular glucocorticoid',tag:'first line',tc:'sea',
  b:'ACR 2012: for 1–2 large joints (Evidence B). EULAR 2016 lists joint aspiration with an intra-articular corticosteroid as a first-line option. ACR 2020 prefers glucocorticoids by injection over IL-1 inhibitors or ACTH when oral medicine is not possible. <sup class="c" data-ref="Khanna2012P2,Richette2017,FitzGerald2020" title="Source 135,203,331">135,203,331</sup>'},
 {id:'im',n:'Intramuscular glucocorticoid or ACTH',tag:'first line',tc:'sea',
  b:'IM triamcinolone 60 mg resolved symptoms in an average 7 days vs 8 with indomethacin (27 people). IM ACTH matched IM triamcinolone but needed more reinjections (11 vs 5). ACR 2012 lists IM triamcinolone 60 mg as an alternative. <sup class="c" data-ref="Alloway1993,Siegel1994,Khanna2012P2" title="Source 7,203,367">7,203,367</sup>'},
 {id:'il1',n:'IL-1 blocker (canakinumab, anakinra)',tag:'second line',tc:'warn',
  b:'Canakinumab beat triamcinolone 40 mg on 72-hour pain (25.0 vs 35.7 mm) and new flares (17% vs 37%). Approved for people who cannot use NSAIDs and colchicine and for whom repeated steroid courses are not appropriate. Anakinra is off-label in gout. <sup class="c" data-ref="Schlesinger2012,EMA-IlarisGout2013,FDA-IlarisGout2023,KineretPI" title="Source 109,121,207,355">109,121,207,355</sup>'},
 {id:'ice',n:'Ice on the joint',tag:'add-on',tc:'good',
  b:'Added to prednisone and colchicine, topical ice cut pain by 7.75 vs 4.42 cm on a 10 cm scale over a week (19 people). ACR 2020: conditional add-on. <sup class="c" data-ref="Schlesinger2002,FitzGerald2020" title="Source 135,353">135,353</sup>'}
];
const FX_SR='ACR 2012 lists this as a limit on corticosteroids; the example does not separate the routes. <sup class="c" data-ref="Khanna2012P2" title="Source 203">203</sup>';
const FX_CONDS={
 ckd:{n:'CKD',f:{colch:['caution','ACR 2012 lists moderate or severe CKD as a limit; EULAR 2016 says avoid in severe kidney impairment; the label limits repeat courses in severe impairment to once every 2 weeks. <sup class="c" data-ref="Khanna2012P2,Richette2017,FDA-Colcrys" title="Source 117,203,331">117,203,331</sup>'],nsaid:['caution','ACR 2012 lists moderate or severe CKD as a limit; EULAR 2016 says avoid in severe kidney impairment. <sup class="c" data-ref="Khanna2012P2,Richette2017" title="Source 203,331">203,331</sup>']}},
 ulcer:{n:'Peptic ulcer',f:{nsaid:['caution','ACR 2012 lists peptic ulcer disease as a limit on NSAIDs and COX-2 inhibitors. <sup class="c" data-ref="Khanna2012P2" title="Source 203">203</sup>'],oral:['caution',FX_SR],ia:['caution',FX_SR],im:['caution',FX_SR]}},
 hf:{n:'Heart failure',f:{nsaid:['caution','ACR 2012 lists congestive heart failure as a limit on NSAIDs and COX-2 inhibitors. <sup class="c" data-ref="Khanna2012P2" title="Source 203">203</sup>']}},
 dm:{n:'Diabetes',f:{oral:['caution',FX_SR.replace('this','diabetes')],ia:['caution',FX_SR.replace('this','diabetes')],im:['caution',FX_SR.replace('this','diabetes')]}},
 anticoag:{n:'Anticoagulant or antiplatelet',f:{nsaid:['caution','ACR 2012 lists anticoagulant or antiplatelet therapy as a limit on NSAIDs. <sup class="c" data-ref="Khanna2012P2" title="Source 203">203</sup>']}},
 liver:{n:'Liver disease',f:{colch:['caution','ACR 2012 lists hepatic disease as a limit on colchicine; the label limits repeat courses in severe impairment. <sup class="c" data-ref="Khanna2012P2,FDA-Colcrys" title="Source 117,203">117,203</sup>'],nsaid:['caution','ACR 2012 lists hepatic disease as a limit on NSAIDs and COX-2 inhibitors. <sup class="c" data-ref="Khanna2012P2" title="Source 203">203</sup>']}},
 drugs:{n:'Strong CYP3A4 or P-gp inhibitor',f:{colch:['avoid','EULAR 2016: do not give colchicine with strong P-gp and/or CYP3A4 inhibitors such as cyclosporin or clarithromycin. The label contraindicates the combination in kidney or liver impairment. <sup class="c" data-ref="Richette2017,FDA-Colcrys" title="Source 117,331">117,331</sup>']}},
 infect:{n:'Infection',f:{oral:['caution',FX_SR.replace('this','ongoing infection or high infection risk')],ia:['caution',FX_SR.replace('this','ongoing infection or high infection risk')],im:['caution',FX_SR.replace('this','ongoing infection or high infection risk')],il1:['avoid','EULAR 2016: current infection is a contraindication to IL-1 blockers; the canakinumab label says avoid during an active infection needing treatment. <sup class="c" data-ref="Richette2017,IlarisPIG" title="Source 175,331">175,331</sup>']}}
};
inits.flarerx=()=>{
  const svg=$('#fxSvg'),rg=$('#fxT'),sr=$('#fxS');
  /* schematic curves, hours 0–168 */
  const U=h=>h<=0?0:h<14?8*Math.pow(h/14,.7):8*Math.exp(-(h-14)/140);
  const EFF={6:.72,12:.66,24:.56,36:.46,72:.3};
  const Tc=(h,s)=>U(h)*(1-EFF[s]*ease(ramp(h,s,s+40)));
  const r=rng(31);const NE=Array.from({length:12},()=>({a:r()*6.283,d:14+r()*22,ph:r()}));
  const foot=`M8 92 C6 70 20 60 44 58 L96 50 C118 46 136 50 144 62 C150 74 140 84 124 86 L64 96 C40 102 18 104 8 92 Z`;
  function panel(x,y,sc,pain,title,col,pill,h){const p=clamp(pain/8);
    let s=`<text x="${x}" y="${y-10}" class="t-sm" style="fill:${col}">${title}</text>`;
    s+=`<g transform="translate(${x} ${y}) scale(${sc})">`;
    s+=`<path d="${foot}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:1.4"/>`;
    s+=`<circle cx="112" cy="66" r="${f1(12+18*p)}" style="fill:var(--terra);opacity:${f1(.08+.42*p)}"/>`;
    s+=`<circle cx="112" cy="66" r="10" style="fill:var(--panel);stroke:var(--memb);stroke-width:1.2"/>`;
    s+=needle(108,63,12,-30)+needle(115,68,10,25)+needle(112,61,8,70);
    NE.forEach((n,i)=>{const on=clamp(p*1.3-i/NE.length*.9);if(on<=0)return;const a=n.a+Math.sin(h/9+n.ph*6)*.15;s+=neutro(112+Math.cos(a)*n.d,66+Math.sin(a)*n.d*.7,4.2,clamp(on*2))});
    if(pill)s+=`<g transform="translate(22 30)"><rect x="-10" y="-5" width="20" height="10" rx="5" style="fill:var(--sea)"/><line x1="0" x2="0" y1="-5" y2="5" style="stroke:var(--panel);stroke-width:1"/></g>`;
    s+=`</g>`;
    s+=`<text x="${x}" y="${f1(y+112*sc+16)}" class="t-xs">pain ${f1(pain)}/10 · schematic</text>`;
    return s}
  function draw(u){
    const N=vb(svg,'720 420','400 572');
    const sIdx=+sr.value,S=FX_START[sIdx],h=u*168;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // the two feet
    if(N){s+=panel(14,42,1.18,U(h),'UNTREATED','var(--terra)',false,h)+panel(208,42,1.18,Tc(h,S),`TREATED FROM ${S} h`,'var(--sea)',h>=S,h)}
    else{s+=panel(30,40,1.5,U(h),'UNTREATED','var(--terra)',false,h)+panel(30,248,1.5,Tc(h,S),`TREATED FROM ${S} h`,'var(--sea)',h>=S,h)}
    // chart
    const X0=N?44:396,X1=N?384:704,Y0=N?520:330,Y1=N?270:60,xh=v=>lerp(X0,X1,v/168),yp=v=>lerp(Y0,Y1,v/10);
    // guideline windows along the top of the chart
    [[12,'12 h','var(--crocus)'],[24,'24 h','var(--sea)'],[36,'36 h','var(--muted)']].forEach(([w,l,c],i)=>{
      s+=`<rect x="${X0}" y="${Y1-22+i*6}" width="${f1(xh(w)-X0)}" height="4" rx="2" style="fill:${c};opacity:.55"/>`});
    s+=`<text x="${f1(xh(36)+6)}" y="${Y1-10}" class="t-xs">${N?'windows: 12 · 24 · 36 h':'windows: 12 h EULAR · 24/36 h ACR 2012'}</text>`;
    for(let v=0;v<=10;v+=2)s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yp(v))}" y2="${f1(yp(v))}" class="grid"/><text x="${X0-6}" y="${f1(yp(v)+3)}" class="t-xs t-end">${v}</text>`;
    for(let d=0;d<=7;d++)s+=`<text x="${f1(xh(d*24))}" y="${Y0+16}" class="t-xs t-mid">${d}</text>`;
    s+=`<text x="${X1}" y="${Y0+32}" class="t-xs t-end">days from onset</text><text x="${X0-30}" y="${Y1-34}" class="t-xs">pain 0–10</text>`;
    s+=`<text x="${X1}" y="${f1(Y1+14)}" class="t-sm t-end" style="fill:var(--warn)">SCHEMATIC</text><text x="${X1}" y="${f1(Y1+27)}" class="t-xs t-end" style="fill:var(--warn)">no trial randomised start times</text>`;
    // start marker
    const xs=xh(S);s+=`<line x1="${f1(xs)}" x2="${f1(xs)}" y1="${Y1}" y2="${Y0}" style="stroke:var(--sea);stroke-width:1.4;stroke-dasharray:4 4"/><rect x="${f1(xs-9)}" y="${Y0-14}" width="18" height="9" rx="4.5" style="fill:var(--sea)"/>`;
    // curves: ghost the whole week, draw solid up to the scrubber
    const fu=v=>U(v*168)/10,ft=v=>Tc(v*168,S)/10;
    [[fu,'var(--terra)'],[ft,'var(--sea)']].forEach(([fn,c])=>{
      s+=`<path d="${pathFn(fn,X0,X1,Y0,Y1)}" style="fill:none;stroke:${c};stroke-width:1.3;opacity:.3"/>`;
      s+=`<path d="${pathFn(v=>v<=u?fn(v):NaN,X0,X1,Y0,Y1).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${c};stroke-width:3"/>`;
      s+=`<circle cx="${f1(xh(h))}" cy="${f1(lerp(Y0,Y1,fn(u)))}" r="5" style="fill:${c}"/>`});
    // labels on the curves
    s+=`<text x="${f1(xh(100))}" y="${f1(yp(U(100))-8)}" class="t-xs" style="fill:var(--terra)">untreated</text><text x="${f1(xh(100))}" y="${f1(yp(Tc(100,S))+16)}" class="t-xs" style="fill:var(--sea)">treated from ${S} h</text>`;
    // the one real anchor
    const bx=xh(168),by=yp(U(168));s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="6" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1(bx-8)}" y="${f1(by-52)}" class="t-xs t-end" style="fill:var(--ink)">day 7: pain gone in 3 of 9</text><text x="${f1(bx-8)}" y="${f1(by-40)}" class="t-xs t-end">untreated (Bellamy 1987)</text>`;
    s+=`<line x1="${f1(xh(h))}" x2="${f1(xh(h))}" y1="${Y1}" y2="${Y0}" style="stroke:var(--ink);opacity:.2"/>`;
    svg.innerHTML=s;
    $('#fxSOut').textContent=S+' h';
    const area=(f)=>{let a=0;for(let i=0;i<=168;i++)a+=f(i);return a};
    const red=Math.round(100*(1-area(v=>Tc(v,S))/area(U)));
    $('#fxRead').innerHTML=`<span>day <b>${f1(h/24)}</b></span><span>untreated pain <b>${f1(U(h))}</b></span><span>treated pain <b>${f1(Tc(h,S))}</b></span><span>start <b>${S} h</b></span><span>week's pain area cut by <b>${red}%</b> (schematic)</span>`;
    const p=phaseOf(FX_STEPS,u);setSt(p);$('#fxNote').innerHTML=noteHTML(FX_STEPS[p]);
  }
  const stop=playWire(rg,$('#fxPlay'),draw,16000,'Replay','flarerx');
  const setSt=stepWire($('#fxSteps'),FX_STEPS,rg,draw,stop);
  sr.addEventListener('input',()=>draw(+rg.value));
  draw(+rg.value);

  /* ---- trial bars ---- */
  const bs=$('#fxBars'),br=$('#fxB');let trial='agree';
  const FX_TR={
   agree:{arms:[['low dose 1.8 mg','var(--crocus)'],['high dose 4.8 mg','var(--bad)'],['placebo','var(--muted)']],
    head:'AGREE · 184 people randomised within 12 h of onset',
    g:[['≥ 50% pain relief','at 24 h, no rescue',['37.8','32.7','15.5']],['rescue medicine','within 24 h',['31.1','34.6','50.0']],['diarrhoea','any',['23.0','76.9','14']],['severe diarrhoea','',['0','19.2',null]],['vomiting','',['0','17.3','0']]],
    cap:'AGREE: the primary end point was ≥ 50% pain reduction at 24 h without rescue medicine (P = 0.005 low dose and P = 0.034 high dose vs placebo). Placebo diarrhoea (8 of 59, 14%) is from the US label table; no severe-diarrhoea figure is given for placebo. <sup class="c" data-ref="Terkeltaub2010,FDA-Colcrys" title="Source 117,406">117,406</sup>'},
   contact:{arms:[['naproxen','var(--sea)'],['colchicine 0.5 mg ×3/day','var(--crocus)']],
    head:'CONTACT · 399 adults, 100 UK general practices, open label',
    g:[['pain fully gone','by day 7',['67.3','67.1']],['diarrhoea','days 1–7',['20.0','45.9']],['headache','days 1–7',['10.7','20.5']],['constipation','days 1–7',['19.3','4.8']]],
    cap:'CONTACT: naproxen 750 mg then 250 mg every 8 h for 7 days vs colchicine 0.5 mg three times daily for 4 days. Pain change over days 1–7 did not differ (mean difference −0.18, P = 0.32); median time to resolution 5 vs 6 days. The authors favoured naproxen first in primary care when there are no contraindications. <sup class="c" data-ref="Roddy2020" title="Source 338">338</sup>'}
  };
  const wrapT=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  function drawB(t){
    const T=FX_TR[trial],na=T.arms.length;
    let s='';
    if(vb(bs,'720 330','400 '+(70+T.g.length*(26+na*18)+20))){
      const X0=14,X1=330;let y=24;
      s+=`<rect width="100%" height="100%" style="fill:var(--field)"/><text x="14" y="${y}" class="t-sm" style="fill:var(--crocus)">${wrapT(T.head,46)[0]}</text>`;
      wrapT(T.head,46).slice(1).forEach(l=>{y+=14;s+=`<text x="14" y="${y}" class="t-sm" style="fill:var(--crocus)">${l}</text>`});
      y+=26;
      T.g.forEach((g,i)=>{const k=ease(ramp(t,i*.12,i*.12+.45));
        s+=`<text x="14" y="${y}" class="t-xs" style="fill:var(--ink)">${g[0]}${g[1]?' · '+g[1]:''}</text>`;
        g[2].forEach((v,j)=>{const by=y+6+j*18;if(v==null){s+=`<text x="${X0}" y="${by+11}" class="t-xs">${T.arms[j][0]}: not reported</text>`;return}
          const w=(X1-X0)*(+v)/100*k;s+=`<rect x="${X0}" y="${by}" width="${f1(Math.max(w,+v===0?2:0))}" height="13" rx="3" style="fill:${T.arms[j][1]}"/><text x="${f1(X0+w+6)}" y="${by+10}" class="t-xs" style="fill:${T.arms[j][1]};font-weight:700;opacity:${f1(ramp(k,.5,1))}">${v}%</text>`});
        y+=26+na*18});
      bs.innerHTML=s;
    }else{
      const AX0=60,AX1=704,AY=250,ATOP=56,pc=v=>AY-(AY-ATOP)*v/100;
      s+=`<rect width="100%" height="100%" style="fill:var(--field)"/><text x="14" y="28" class="t-sm" style="fill:var(--crocus)">${T.head}</text>`;
      [0,25,50,75,100].forEach(v=>s+=`<line x1="${AX0}" x2="${AX1}" y1="${f1(pc(v))}" y2="${f1(pc(v))}" class="grid"/><text x="${AX0-8}" y="${f1(pc(v)+3)}" class="t-xs t-end">${v}%</text>`);
      s+=`<line x1="${AX0}" x2="${AX1}" y1="${AY}" y2="${AY}" class="axis"/>`;
      const gw=(AX1-AX0)/T.g.length,bw=na>2?30:40;
      T.g.forEach((g,i)=>{const cx=AX0+gw*(i+.5),k=ease(ramp(t,i*.12,i*.12+.45));
        g[2].forEach((v,j)=>{const x=cx-(na*bw+6*(na-1))/2+j*(bw+6);
          if(v==null){s+=`<text x="${f1(x+bw/2)}" y="${AY-6}" class="t-xs t-mid">n/r</text>`;return}
          const hh=(AY-ATOP)*(+v)/100*k;s+=`<rect x="${f1(x)}" y="${f1(AY-hh)}" width="${bw}" height="${f1(Math.max(hh,+v===0?1.5:0))}" rx="3" style="fill:${T.arms[j][1]}"/><text x="${f1(x+bw/2)}" y="${f1(AY-hh-6)}" class="t-xs t-mid" style="fill:${T.arms[j][1]};font-weight:700;opacity:${f1(ramp(k,.5,1))}">${v}</text>`});
        s+=`<text x="${f1(cx)}" y="${AY+18}" class="t-xs t-mid" style="fill:var(--ink)">${g[0]}</text><text x="${f1(cx)}" y="${AY+31}" class="t-xs t-mid">${g[1]}</text>`});
      s+=`<text x="14" y="${AY+60}" class="t-xs">% of each arm · n/r = not reported</text>`;
      bs.innerHTML=s;
    }
    $('#fxLegend').innerHTML=T.arms.map(a=>`<span><i style="background:${a[1]}"></i>${a[0]}</span>`).join('');
  }
  const bstop=playWire(br,$('#fxBPlay'),drawB,6000,'Replay','flarerx');
  function setTrial(k){trial=k;$$('#fxTrials [data-trial]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.trial===k));$('#fxBCap').innerHTML=FX_TR[k].cap;bstop();br.value=1;drawB(1)}
  $('#fxTrials').addEventListener('click',e=>{const b=e.target.closest('[data-trial]');if(b)setTrial(b.dataset.trial)});
  setTrial('agree');

  /* ---- comorbidity chooser ---- */
  const on=new Set();
  $('#fxConds').innerHTML='<span class="kicker">Conditions</span>'+Object.entries(FX_CONDS).map(([k,c])=>`<button class="btn" data-cond="${k}" aria-pressed="false">${c.n}</button>`).join('');
  function drawOpts(){
    let flaggedFirst=0;
    $('#fxOpts').innerHTML=FX_OPTS.map(o=>{const fl=[];on.forEach(k=>{const f=FX_CONDS[k].f[o.id];if(f)fl.push([k,...f])});
      const st=fl.some(f=>f[1]==='avoid')?'avoid':fl.length?'caution':'clear';
      if(o.tag==='first line'&&st!=='clear')flaggedFirst++;
      return `<div class="card fx-opt" data-state="${st}"><span class="tag ${o.tc}">${o.tag}</span><h4>${o.n}</h4>${fl.length?`<ul class="fx-flags">${fl.map(f=>`<li class="${f[1]}"><b>${f[1]==='avoid'?'Avoid':'Caution'} · ${FX_CONDS[f[0]].n}</b>${f[2]}</li>`).join('')}</ul>`:''}<p>${o.b}</p></div>`}).join('');
    const nOn=on.size;
    $('#fxSum').innerHTML=!nOn?'<b class="big">5 of 5</b>first-line options open. Switch on a condition above to see what the guidance flags.'
      :flaggedFirst===5?'<b class="big">0 of 5</b>first-line options without a flag. When every first-line option is contraindicated, not tolerated or ineffective, ACR 2020 conditionally recommends IL-1 inhibition, and NICE allows IL-1 inhibitors only when NSAIDs, colchicine and corticosteroids are contraindicated, not tolerated or ineffective. <sup class="c" data-ref="FitzGerald2020,NICE-NG219" title="Source 135,293">135,293</sup>'
      :`<b class="big">${5-flaggedFirst} of 5</b>first-line options unflagged. ACR 2020: the choice among first-line options is driven by patient factors. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>`;
  }
  $('#fxConds').addEventListener('click',e=>{const b=e.target.closest('[data-cond]');if(!b)return;const k=b.dataset.cond;on.has(k)?on.delete(k):on.add(k);b.setAttribute('aria-pressed',on.has(k));drawOpts()});
  drawOpts();
};
/* =============== 2.3 colchicine dosing & safety =============== */
/* Adapted from the FMF Companion's 2.3: the exposure window, interaction table, organ map
   and kidney gauge keep their engine; the doses are the gout ones (label, EULAR, ACR). */
const CD_STEPS=[
 {from:0,at:.12,k:'Days 0–3',t:'Building to a steady level',
  txt:`After a 0.6 mg tablet, plasma colchicine peaks in 1–2 hours (mean Cmax 2.5 ng/mL), and absolute bioavailability is about 45%. The published half-lives do not agree: the US label reports 26.6–31.2 hours on repeated 0.6 mg twice-daily dosing, while a study after an intravenous dose found a terminal half-life of 57.8 hours. Either way each dose adds to what is left of the last until levels settle into a daily rise and fall. Colchicine is a substrate of two exits: P-glycoprotein (P-gp) pumps and the CYP3A4 enzyme. <sup class="c" data-ref="FDA-Colcrys,Ferron1996,Rochdi1994,Slobodnick2018" title="Source 117,132,336,369">117,132,336,369</sup>`,
  pt:`Each tablet adds to what is left from the last one until the level settles into a steady wave. How long one dose lasts is disputed: published half-lives run from about one day to over two.`,
  hook:`Two exits: <b>P-gp</b> pumps and <b>CYP3A4</b>. Block either one and colchicine builds up. Half-life: a <b>disputed range</b>, not one number.`},
 {from:.29,at:.31,k:'Day 3',t:'An interacting drug is added',
  txt:`Strong CYP3A4 inhibitors and P-gp inhibitors close those exits. The label contraindicates these combinations in people with kidney or liver impairment, because fatal toxicity has occurred at therapeutic doses. The heights here come from the label's single-dose interaction studies, scaled schematically to twice-daily dosing. <sup class="c" data-ref="FDA-Colcrys,Terkeltaub2011" title="Source 117,407">117,407</sup>`,
  pt:`Some medicines block the body's way of clearing colchicine, so the same tablet leaves more drug behind.`,
  hook:`Ritonavir, clarithromycin, cyclosporine and ketoconazole raised single-dose exposure by <b>212–296%</b>.`},
 {from:.4,at:.62,k:'Days 4–10',t:'A slow climb to a new plateau',
  txt:`Because clearance slows, the level keeps climbing for days after the inhibitor starts, so risk grows with the length of the overlap. In the clarithromycin study a longer overlap (RR 2.16), baseline kidney impairment (RR 9.1) and pancytopenia (RR 23.4) predicted death. <sup class="c" data-ref="Hung2005" title="Source 172">172</sup>`,
  pt:`The extra drug piles up day after day, so a week-long antibiotic course can matter more than a single dose.`,
  hook:`Hung 2005: deaths <b>10.2%</b> with clarithromycin given together vs <b>3.6%</b> given one after the other.`},
 {from:.85,at:.97,k:'What the label publishes',t:'Gout dose adjustments',
  txt:`When there is no alternative to the interacting drug, the US label cuts the prophylaxis dose (from 0.6 mg twice daily) to 0.3 mg once daily with strong CYP3A4 or P-gp inhibitors, and to 0.3 mg twice daily or 0.6 mg once daily with moderate CYP3A4 inhibitors. The flare dose falls too, and is not repeated within 3 days. The adjustments also apply within 14 days of stopping the interacting drug. Press "Apply the label's prophylaxis dose adjustment" to see the effect. <sup class="c" data-ref="FDA-Colcrys,Terkeltaub2011" title="Source 117,407">117,407</sup>`,
  pt:`If two drugs must be taken together, the label lowers the colchicine dose so that levels stay closer to normal.`,
  hook:`Label prophylaxis with interactions: <b>0.3 mg/day</b> (strong CYP3A4 or P-gp), <b>0.6 mg/day</b> (moderate CYP3A4). Flare course not repeated within <b>3 days</b>.`}
];
const CD_DRUGS={
 none:{n:'No interacting drug',sh:'nothing added',f:1,pct:'none',cap:null,capTxt:'not needed',
  txt:`Without an interaction, levels settle into the usual daily wave within about a week. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`},
 clari:{n:'Clarithromycin',sh:'clarithromycin',f:3.82,pct:'+282%',cap:.3,capTxt:'0.3 mg once daily',
  txt:`A strong CYP3A4 inhibitor. In the label's single-dose study it raised colchicine AUC by 282% (Cmax by 227%). In a retrospective study, 9 of 88 inpatients (10.2%) given both drugs together died, versus 1 of 28 (3.6%) given them one after the other. Pharmacokinetic studies support no adjustment with azithromycin. <sup class="c" data-ref="FDA-Colcrys,Hung2005,Terkeltaub2011" title="Source 117,172,407">117,172,407</sup>`},
 keto:{n:'Ketoconazole / itraconazole',sh:'ketoconazole',f:3.12,pct:'+212% (ketoconazole)',cap:.3,capTxt:'0.3 mg once daily',
  txt:`Strong CYP3A4 inhibitors. Ketoconazole raised colchicine AUC by 212% in the label study; itraconazole sits in the same label group, and the curve uses the ketoconazole figure. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`},
 rito:{n:'Ritonavir',sh:'ritonavir',f:3.96,pct:'+296%',cap:.3,capTxt:'0.3 mg once daily',
  txt:`A strong CYP3A4 inhibitor, the largest increase in the label's table (+296%). Most HIV protease inhibitors are in the same label group. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`},
 cyclo:{n:'Cyclosporine',sh:'cyclosporine',f:3.59,pct:'+259%',cap:.3,capTxt:'0.3 mg once daily',
  txt:`A P-gp inhibitor that raised colchicine AUC by 259%. It is also one of the drugs the label says can potentiate colchicine myopathy and rhabdomyolysis. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`},
 vera:{n:'Verapamil',sh:'verapamil',f:2.03,pct:'+103%',cap:.6,capTxt:'0.3 mg twice daily or 0.6 mg once daily',
  txt:`A moderate CYP3A4 inhibitor in the label's list; colchicine AUC rose by 103%. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`},
 dilt:{n:'Diltiazem',sh:'diltiazem',f:1.93,pct:'+93%',cap:.6,capTxt:'0.3 mg twice daily or 0.6 mg once daily',
  txt:`A moderate CYP3A4 inhibitor in the label's list; colchicine AUC rose by 93%. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`},
 azi:{n:'Azithromycin',sh:'azithromycin',f:1.57,pct:'+57%',cap:null,capTxt:'none listed',
  txt:`Raised colchicine AUC by 57%, far less than clarithromycin. It is not in the label's adjustment lists, and pharmacokinetic studies support no adjustment, so the adjustment button has no effect here. <sup class="c" data-ref="FDA-Colcrys,Terkeltaub2011" title="Source 117,407">117,407</sup>`},
 grape:{n:'Grapefruit juice',sh:'grapefruit juice',f:1,pct:'−2% in the label study',cap:.6,capTxt:'0.3 mg twice daily or 0.6 mg once daily',
  txt:`The label contradicts itself here. It lists grapefruit juice with the moderate CYP3A4 inhibitors and gives it the same dose cuts, yet its own interaction study found colchicine AUC changed by −2%. Both statements sit in the same document. The curve therefore does not move. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`},
 renal:{n:'Severe kidney impairment',sh:'severe kidney impairment',f:4.3,renal:true,pct:'clearance −75% on dialysis',cap:.3,capTxt:'start at 0.3 mg/day',
  txt:`Shown as if it began on day 3 only for comparison. This height is not from an AUC study: it is derived from a clearance figure measured in people with FMF on dialysis, whose colchicine clearance was 75% lower (0.17 vs 0.73 L/h/kg), so it is the roughest curve here. Dialysis does not remove colchicine. For gout prophylaxis in severe impairment the label starts at 0.3 mg/day. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`}
};
const CD_REGS={
 us:{n:'US label: flare',d:[[0,1.2],[1,.6]],col:'var(--crocus)',k:'COLCRYS label',
  txt:`1.2 mg at the first sign of a flare, then 0.6 mg 1 hour later: a maximum of 1.8 mg over 1 hour. The label adds that "higher doses have not been found to be more effective", and that the safety and efficacy of repeat flare courses have not been evaluated. ACR 2020 says to follow this FDA dosing when colchicine is chosen. <sup class="c" data-ref="FDA-Colcrys,FitzGerald2020" title="Source 117,135">117,135</sup>`},
 usp:{n:'Flare during prophylaxis',d:[[0,1.2],[1,.6],[13,.6],[25,.6],[37,.6]],wait:[1,13],col:'var(--crocus)',k:'COLCRYS label',
  txt:`For someone already taking prophylaxis: up to 1.2 mg, then 0.6 mg 1 hour later; wait 12 hours, then resume the prophylactic dose (drawn here as 0.6 mg twice daily). The label does not recommend this flare treatment in people with kidney impairment who already take colchicine for prophylaxis. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`},
 acr12:{n:'ACR 2012: until it settles',d:[[0,1.2],[1,.6],[12,.6],[24,.6],[36,.6],[48,.6]],col:'var(--crocus)',k:'ACR 2012 guideline',
  txt:`After 1.2 mg and 0.6 mg, ACR 2012 continues 0.6 mg once or twice daily, starting 12 hours later, until the flare resolves (twice daily is drawn). It advises colchicine only if the flare began 36 hours or less earlier. <sup class="c" data-ref="Khanna2012P2" title="Source 203">203</sup>`},
 eular:{n:'EULAR 2016: 1 + 0.5 mg',d:[[0,1],[1,.5]],col:'var(--sea)',k:'EULAR 2016',
  txt:`EULAR 2016 gives 1 mg, then 0.5 mg 1 hour later on day 1, within 12 hours of flare onset. ACR 2012 gives the same pair where 1 mg and 0.5 mg tablets are used, followed after 12 hours by up to 0.5 mg three times daily. <sup class="c" data-ref="Richette2017,Khanna2012P2" title="Source 203,331">203,331</sup>`},
 contact:{n:'CONTACT trial: 0.5 mg ×3/day',d:[[0,.5],[8,.5],[16,.5],[24,.5],[32,.5],[40,.5],[48,.5]],col:'var(--sea)',k:'CONTACT trial (UK primary care)',
  txt:`CONTACT gave colchicine 0.5 mg three times daily for 4 days, with no loading dose, and compared it with naproxen. Pain relief was the same, but diarrhoea was more common with colchicine (45.9% vs 20.0%). No trial has compared these colchicine schedules head to head. <sup class="c" data-ref="Roddy2020" title="Source 338">338</sup>`},
 high:{n:'Old high dose',d:[[0,1.2],[1,.6],[2,.6],[3,.6],[4,.6],[5,.6],[6,.6]],col:'var(--bad)',k:'AGREE high-dose arm',
  txt:`1.2 mg, then 0.6 mg every hour for 6 hours: 4.8 mg in all. In AGREE it worked no better than the low dose (32.7% vs 37.8% responders) and caused diarrhoea in 76.9%, severe in 19.2%. ACR 2020 strongly recommends low-dose over high-dose colchicine. <sup class="c" data-ref="Terkeltaub2010,FitzGerald2020" title="Source 135,406">135,406</sup>`},
 proph:{n:'Prophylaxis',d:[[0,.6],[12,.6],[24,.6],[36,.6],[48,.6]],col:'var(--sea)',k:'COLCRYS and MITIGARE labels',
  txt:`0.6 mg once or twice daily (twice daily drawn), maximum 1.2 mg/day, in adults and adolescents over 16; MITIGARE capsules carry the same dose and are labelled for prophylaxis only. EULAR 2016 gives 0.5–1 mg/day for the first 6 months of urate lowering; ACR 2020 advises 3–6 months of prophylaxis rather than less than 3. <sup class="c" data-ref="FDA-Colcrys,FDA-Mitigare,Richette2017,FitzGerald2020" title="Source 117,124,135,331">117,124,135,331</sup>`},
 dial:{n:'On dialysis: flare',d:[[0,.6]],col:'var(--warn)',k:'COLCRYS label, dialysis',
  txt:`On dialysis the label's flare dose is a single 0.6 mg, no more than once every 2 weeks; prophylaxis starts at 0.3 mg twice a week. Dialysis does not remove colchicine. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`}
};
const CD_ORG={
 gut:{n:'Gut',rep:`Cramping, nausea, diarrhoea, abdominal pain and vomiting are the most common effects. In the label's flare trial, gut adverse reactions occurred in 26% at the 1.8 mg dose, 77% at the old 4.8 mg dose and 20% on placebo, and diarrhoea (23%) was the most common. In CONTACT, diarrhoea affected 45.9% on colchicine 0.5 mg three times daily vs 20.0% on naproxen. <sup class="c" data-ref="FDA-Colcrys,Roddy2020" title="Source 117,338">117,338</sup>`,
  mon:`The label says gut symptoms are often the first sign of toxicity, and that acute toxicity typically begins within 24 hours. <sup class="c" data-ref="FDA-Colcrys,FDA-Mitigare" title="Source 117,124">117,124</sup>`},
 muscle:{n:'Muscle',rep:`Colchicine myopathy affects people with gout on customary doses when reduced kidney function raises drug levels. It causes weakness of the hip and shoulder muscles, always with a raised CK, and remits within 3–4 weeks of stopping. Statins, fibrates and cyclosporine can potentiate myopathy and rhabdomyolysis, and older people are at higher risk. <sup class="c" data-ref="Kuncl1987,FDA-Colcrys" title="Source 117,221">117,221</sup>`,
  mon:`Proximal weakness with a raised CK is the pattern in the original series; kidney function is the usual setting. <sup class="c" data-ref="Kuncl1987" title="Source 221">221</sup>`},
 nerves:{n:'Nerves',rep:`A mild axonal polyneuropathy often comes with the myopathy (myoneuropathy). It resolves more slowly than the muscle weakness after the drug is stopped. <sup class="c" data-ref="Kuncl1987" title="Source 221">221</sup>`,
  mon:`Nerve symptoms are picked up clinically, alongside the muscle signs. <sup class="c" data-ref="Kuncl1987" title="Source 221">221</sup>`},
 marrow:{n:'Bone marrow',rep:`Myelosuppression, leukopenia, granulocytopenia, thrombocytopenia and aplastic anaemia have been reported. In overdose, 0.5–0.8 mg/kg caused severe reactions such as myelosuppression. In the clarithromycin study, pancytopenia predicted death (RR 23.4). <sup class="c" data-ref="FDA-Colcrys,FDA-Mitigare,Hung2005" title="Source 117,124,172">117,124,172</sup>`,
  mon:`Falling counts are a sign of serious toxicity; in the clarithromycin study they marked the patients most at risk. <sup class="c" data-ref="Hung2005,FDA-Colcrys" title="Source 117,172">117,172</sup>`},
 liver:{n:'Liver',rep:`The liver metabolises colchicine through CYP3A4 and pumps it into bile through P-gp, from where some returns to the gut. ACR 2012 lists hepatic disease as a limit on colchicine, NSAIDs and COX-2 inhibitors. <sup class="c" data-ref="FDA-Colcrys,Slobodnick2018,Khanna2012P2" title="Source 117,203,369">117,203,369</sup>`,
  mon:`Label (gout): no change in mild to moderate hepatic impairment, with close monitoring; in severe impairment, consider a lower prophylaxis dose and repeat flare courses no more than once every 2 weeks. No P-gp or strong CYP3A4 inhibitor with colchicine in hepatic impairment. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`},
 kidney:{n:'Kidney',rep:`The US label reports 40–65% of a 1 mg oral dose recovered unchanged in urine. Dialysis does not remove colchicine. Reduced kidney function is the usual setting for myopathy and for fatal interactions: baseline kidney impairment carried RR 9.1 for death in the clarithromycin study. <sup class="c" data-ref="FDA-Colcrys,Kuncl1987,Hung2005" title="Source 117,172,221">117,172,221</sup>`,
  mon:`See the gauge below for the label's gout rules. EULAR 2016 says to avoid colchicine and NSAIDs in severe kidney impairment, and to reduce prophylaxis doses in kidney impairment. <sup class="c" data-ref="FDA-Colcrys,Richette2017" title="Source 117,331">117,331</sup>`}
};
inits.coldose=()=>{
  /* ---------- 1. exposure window ---------- */
  const svg=$('#cdSvg'),rg=$('#cdT');let dk='clari',capOn=false;
  /* twice-daily dosing: half the daily amount every 12 h, so the average stays 1 */
  const DT=.25,NH=240,NI=NH/DT,KE=Math.LN2/29,KA=Math.LN2/.6,NORM=KE*24,BASE=1.2,I72=72/DT;
  Object.values(CD_DRUGS).forEach(D=>{D.fb=D.renal?1:Math.sqrt(D.f);D.fc=D.f/D.fb});
  function sim(fb,fc,df){const a=new Float32Array(NI+1);let g=0,c=0;
    for(let i=0;i<=NI;i++){const h=i*DT;if(i%(12/DT)===0&&h<NH)g+=(h>=72?fb*df:1)*.5;
      const k=h>=72?KE/fc:KE,ab=KA*g*DT;g-=ab;c+=ab-k*c*DT;a[i]=c*NORM}return a}
  const cache={};
  function get(key,capped){const id=key+(capped?'c':'');if(cache[id])return cache[id];const D=CD_DRUGS[key];return cache[id]=sim(D.fb,D.fc,capped&&D.cap?D.cap/BASE:1)}
  let X0=64,X1=700,Y0=322,Y1=46;const VM=5;
  const xh=h=>X0+(X1-X0)*h/NH,yv=v=>Y0-(Y0-Y1)*Math.min(v,VM+.15)/VM;
  function pth(a,i0,i1){let d='';for(let i=i0;i<=i1;i+=2)d+=(d?'L':'M')+f1(xh(i*DT))+' '+f1(yv(a[i]));if(i1>i0&&(i1-i0)%2)d+='L'+f1(xh(i1*DT))+' '+f1(yv(a[i1]));return d}
  function draw(t){
    /* narrow: same chart, full 400 wide and taller; axis notes and the day-3
       annotation stack instead of sitting side by side. */
    const N=vb(svg,'720 372','400 452');
    X0=N?40:64;X1=N?384:700;Y0=N?372:322;Y1=N?74:46;
    const D=CD_DRUGS[dk],hasCap=capOn&&D.cap!=null,A=get(dk,hasCap),R=get('none',false),U=hasCap?get(dk,false):null;
    const iN=Math.round(t*NI),hN=iN*DT,df=hasCap?D.cap/BASE:1,fEff=D.f*df;
    const col=fEff>2.2?'var(--bad)':fEff>1.6?'var(--warn)':'var(--crocus)';
    let s=`<defs><linearGradient id="cdTox" x1="0" y1="1" x2="0" y2="0"><stop offset="0" style="stop-color:var(--bad);stop-opacity:0"/><stop offset="1" style="stop-color:var(--bad);stop-opacity:.34"/></linearGradient></defs>`;
    s+=`<rect x="${X0}" y="${Y1}" width="${X1-X0}" height="${f1(yv(2.2)-Y1)}" style="fill:url(#cdTox)"/>`;
    s+=`<rect x="${X0}" y="${f1(yv(1.55))}" width="${X1-X0}" height="${f1(yv(.55)-yv(1.55))}" style="fill:var(--good-soft);opacity:.85"/>`;
    for(let v=0;v<=VM;v++)s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${X0-6}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}×</text>`;
    for(let d=0;d<=10;d+=(N?2:1))s+=`<text x="${f1(xh(d*24))}" y="${Y0+16}" class="t-xs t-mid">${d}</text>`;
    if(N)s+=`<text x="${f1((X0+X1)/2)}" y="${Y0+32}" class="t-xs t-mid">days of twice-daily dosing</text><text x="${X0}" y="${Y0+50}" class="t-xs">exposure vs usual average</text><text x="${X0}" y="${Y0+63}" class="t-xs">schematic model, not measured data</text>`;
    else s+=`<text x="${X1}" y="${Y0+34}" class="t-xs t-end">days of twice-daily dosing</text><text x="${X0}" y="${Y0+34}" class="t-xs">exposure vs usual average · schematic model, not measured data</text>`;
    s+=`<text x="${N?X0:X1-6}" y="${N?22:Y1+14}" class="t-sm ${N?'':'t-end'}" style="fill:var(--bad)">toxicity risk rises · no sharp threshold</text>`;
    s+=`<text x="${X0+6}" y="${f1(yv(1.55)+12)}" class="t-xs" style="fill:var(--good)">usual range (schematic)</text>`;
    const x3=xh(72);
    s+=`<line x1="${f1(x3)}" x2="${f1(x3)}" y1="${Y1-14}" y2="${Y0}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 4;opacity:.55"/>`;
    if(N){s+=`<text x="${f1(x3+6)}" y="${Y1-26}" class="t-lbl">day 3: ${dk==='none'?'nothing added':'+ '+D.sh}</text>`;
      if(hasCap)s+=`<text x="${f1(x3+6)}" y="${Y1-10}" class="t-xs" style="fill:${col}">label: ${D.cap} mg/day</text>`}
    else s+=`<text x="${f1(x3+6)}" y="${Y1-6}" class="t-lbl">day 3: ${dk==='none'?'nothing added':'+ '+D.sh}${hasCap?' · label dose '+D.cap+' mg/day':''}</text>`;
    // dose markers, one per 12 h
    for(let d=0;d<20;d++){const h=d*12;if(h>hN+.01)break;const fr=h>=72&&hasCap?df:1;s+=`<rect x="${f1(xh(h)-2.5)}" y="${f1(Y0-2-12*fr)}" width="5" height="${f1(12*fr)}" rx="2" style="fill:var(--crocus);opacity:.75"/>`}
    // curves
    if(iN>1)s+=`<path d="${pth(R,0,iN)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    if(U&&iN>I72)s+=`<path d="${pth(U,I72,iN)}" style="fill:none;stroke:var(--bad);stroke-width:1.6;opacity:.35"/>`;
    if(iN>1)s+=`<path d="${pth(A,0,Math.min(iN,I72))}" style="fill:none;stroke:var(--crocus);stroke-width:2.6;stroke-linejoin:round"/>`;
    if(iN>I72)s+=`<path d="${pth(A,I72,iN)}" style="fill:none;stroke:${col};stroke-width:2.8;stroke-linejoin:round"/>`;
    if(dk!=='none'&&Math.abs(fEff-1)>.05&&hN>72){const yy=yv(fEff);
      s+=`<line x1="${f1(x3)}" x2="${X1}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${col};stroke-width:1.2;stroke-dasharray:2 4"/><text x="${f1(x3+8)}" y="${f1(yy-6)}" class="t-xs" style="fill:${col}">average if continued ≈ ${f1(fEff)}×</text>`}
    if(iN>0){const v=A[iN],cx=xh(hN);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${Y1}" y2="${Y0}" style="stroke:var(--ink);opacity:.22"/><circle cx="${f1(cx)}" cy="${f1(yv(v))}" r="5.5" style="fill:${hN>72?col:'var(--crocus)'};stroke:var(--panel);stroke-width:2"/>`}
    svg.innerHTML=s;
    $('#cdRead').innerHTML=`<span>day <b>${f1(hN/24)}</b></span><span>exposure now <b>${f1(A[iN])}×</b> usual average</span><span>label AUC change <b>${D.pct}</b></span><span>label prophylaxis dose <b>${D.capTxt}</b></span>`;
    const p=phaseOf(CD_STEPS,t);setSt(p);
    $('#cdNote').innerHTML=noteHTML(CD_STEPS[p])+`<div class="kv"><div><dt>${D.n}${hasCap?' · adjusted':''}</dt><dd>${D.txt}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#cdPlay'),draw,15000,'Replay','coldose');
  const setSt=stepWire($('#cdSteps'),CD_STEPS,rg,draw,stop);
  $$('[data-cd]').forEach(b=>b.onclick=()=>{dk=b.dataset.cd;$$('[data-cd]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#cdCap').onclick=()=>{capOn=!capOn;$('#cdCap').setAttribute('aria-pressed',capOn);draw(+rg.value)};
  draw(+rg.value);

  /* ---------- 2. published schedules ---------- */
  const rsvg=$('#cdRegSvg');let reg='us',grow=1,stopG=null;
  $('#cdRegs').innerHTML='<span class="kicker">Schedule</span>'+Object.entries(CD_REGS).map(([k,v])=>`<button class="btn" data-reg="${k}" aria-pressed="${k===reg}">${v.n}</button>`).join('');
  /* the first 8 hours hold most of the action, so they get 40% of the axis */
  let RX0=70,RX1=690;const rx=h=>h<=8?RX0+(RX1-RX0)*.4*h/8:RX0+(RX1-RX0)*(.4+.6*(h-8)/40);
  function drawReg(){
    const N=vb(rsvg,'720 264','400 330');
    RX0=N?44:70;RX1=N?380:690;
    const R=CD_REGS[reg],TOP=N?70:62,BOT=N?232:182,MX=5,ym=v=>BOT-(BOT-TOP)*v/MX,TY=N?278:220;
    let s='';
    for(let v=0;v<=MX;v++)s+=`<line x1="${RX0}" x2="${RX1}" y1="${f1(ym(v))}" y2="${f1(ym(v))}" class="grid"/><text x="${RX0-6}" y="${f1(ym(v)+3)}" class="t-xs t-end">${v}</text>`;
    s+=`<text x="${RX0-6}" y="${TOP-12}" class="t-xs">mg taken so far</text>`;
    s+=`<line x1="${f1(rx(8))}" x2="${f1(rx(8))}" y1="${TOP}" y2="${TY+4}" style="stroke:var(--muted);stroke-dasharray:2 3;opacity:.6"/>`;
    (N?[0,1,2,4,8,24,48]:[0,1,2,3,4,6,8,12,24,36,48]).forEach(h=>s+=`<text x="${f1(rx(h))}" y="${TY+22}" class="t-xs t-mid">${h}</text>`);
    s+=`<text x="${RX1}" y="${TY+38}" class="t-xs t-end">hours from the first dose · first 8 h stretched</text>`;
    // label flare ceiling
    s+=`<line x1="${RX0}" x2="${f1(rx(48))}" y1="${f1(ym(1.8))}" y2="${f1(ym(1.8))}" style="stroke:var(--crocus);stroke-width:1.2;stroke-dasharray:6 4;opacity:.8"/><text x="${f1(rx(48))}" y="${f1(ym(1.8)-5)}" class="t-xs t-end" style="fill:var(--crocus)">1.8 mg: US label flare maximum over 1 h</text>`;
    if(R.wait)s+=`<rect x="${f1(rx(R.wait[0]))}" y="${TY-18}" width="${f1(rx(R.wait[1])-rx(R.wait[0]))}" height="36" rx="6" style="fill:var(--warn-soft)"/><text x="${f1((rx(R.wait[0])+rx(R.wait[1]))/2)}" y="${TY+30-36-2}" class="t-xs t-mid" style="fill:var(--warn)">wait 12 h</text>`;
    // running total
    let cum=0,d=`M${RX0} ${f1(ym(0))}`;const shown=R.d.filter((x,i)=>i<grow*R.d.length+.001);
    shown.forEach(([h,mg],i)=>{const k=clamp(grow*R.d.length-i);d+=` H${f1(rx(h))} V${f1(ym(cum+mg*k))}`;cum+=mg*k});
    d+=` H${f1(rx(48))}`;
    s+=`<path d="${d}" style="fill:none;stroke:${R.col};stroke-width:2.6;stroke-linejoin:round"/>`;
    // tablets on the time axis
    shown.forEach(([h,mg],i)=>{const k=ease(clamp(grow*R.d.length-i)),r=(N?3.5:5)+(N?5:7)*Math.sqrt(mg/1.2),x=rx(h),y=lerp(TY-40,TY,k);
      s+=`<g style="opacity:${f1(k)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${R.col}"/><line x1="${f1(x-r*.55)}" x2="${f1(x+r*.55)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--panel);stroke-width:1.3;opacity:.8"/>`;
      if(!(N&&R.d.length>5&&i%2))s+=`<text x="${f1(x)}" y="${f1(y-r-4)}" class="t-xs t-mid" style="fill:${R.col}">${mg}</text>`;
      s+='</g>'});
    const tot=R.d.reduce((a,[h,mg])=>a+(h<=48?mg:0),0),d1=R.d.reduce((a,[h,mg])=>a+(h<24?mg:0),0);
    s+=`<text x="${N?RX0:RX0+8}" y="${N?22:24}" class="t-lbl" style="fill:${R.col}">${R.n}</text><text x="${N?RX0:RX1}" y="${N?38:24}" class="t-sm${N?'':' t-end'}">${f1(d1)} mg in the first 24 h</text>`;
    rsvg.innerHTML=s;
    $('#cdRegRead').innerHTML=`<span>schedule <b>${R.n}</b></span><span>first 24 h <b>${f1(d1)} mg</b></span><span>first 48 h <b>${f1(tot)} mg</b></span><span>source <b>${R.k}</b></span>`;
    $('#cdRegNote').innerHTML=`<div class="kicker">${R.k}</div><h4>${R.n}</h4><p>${R.txt}</p>`;
  }
  function setReg(k){reg=k;$$('[data-reg]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.reg===k));if(stopG)stopG();grow=0;stopG=animate(700,p=>{grow=p;drawReg()},()=>{stopG=null})}
  $('#cdRegs').addEventListener('click',e=>{const b=e.target.closest('[data-reg]');if(b)setReg(b.dataset.reg)});
  drawReg();

  /* ---------- 3. organ map ---------- */
  const osv=$('#cdOrgSvg');let org='gut';
  function drawOrg(){
    /* narrow: the body stays central in a full-width 400 stage and the two label
       columns move outward with it; every organ group keeps its own hit area. */
    const N=vb(osv,'360 430','400 440');
    const DX=N?20:0,LLX=N?96:58,RLX=N?304:300;
    const on=k=>k===org;
    const st=k=>on(k)?'fill:var(--bad-soft);stroke:var(--bad);stroke-width:2.4':'fill:var(--panel);stroke:var(--muted);stroke-width:1.2';
    let s=`<g transform="translate(${DX} 0)">`;
    // body
    s+=`<g style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.5"><circle cx="180" cy="46" r="30"/><rect x="166" y="72" width="28" height="18"/><rect x="118" y="86" width="124" height="190" rx="32"/><rect x="86" y="96" width="30" height="176" rx="14"/><rect x="244" y="96" width="30" height="176" rx="14"/><rect x="126" y="262" width="50" height="160" rx="18"/><rect x="184" y="262" width="50" height="160" rx="18"/></g>`;
    const G=(k,inner,cx,cy,r)=>`<g class="clk" data-org="${k}" role="button" tabindex="0" aria-label="${CD_ORG[k].n}">${on(k)?`<circle class="cd-pulse" cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--bad)"/>`:''}${inner}</g>`;
    s+=G('muscle',`<ellipse cx="101" cy="150" rx="11" ry="34" style="${st('muscle')}"/><ellipse cx="151" cy="318" rx="19" ry="40" style="${st('muscle')}"/>`,151,318,34);
    s+=G('marrow',`<rect x="201" y="282" width="16" height="96" rx="8" style="${st('marrow')}"/><rect x="206" y="296" width="6" height="68" rx="3" style="fill:${on('marrow')?'var(--bad)':'var(--terra-soft)'}"/>`,209,330,30);
    const nv=on('nerves')?'var(--bad)':'var(--gold)',nw=on('nerves')?2.6:1.6;
    s+=G('nerves',`<path d="M259 100 L259 266 M259 150 L266 176 M259 210 L252 236 M151 362 L151 418 M151 380 L143 404 M209 382 L209 418 M209 392 L217 412" style="fill:none;stroke:${nv};stroke-width:${nw};stroke-linecap:round"/><rect x="246" y="96" width="26" height="176" style="fill:transparent"/>`,259,190,26);
    s+=G('liver',`<path d="M128 146 C140 128 196 126 206 142 C204 160 168 168 132 168 C124 162 124 152 128 146Z" style="${st('liver')}"/>`,162,150,30);
    s+=G('kidney',`<ellipse cx="142" cy="196" rx="10" ry="16" style="${st('kidney')}"/><ellipse cx="218" cy="196" rx="10" ry="16" style="${st('kidney')}"/>`,180,196,40);
    let gi='';[[166,214],[184,212],[202,216],[160,232],[178,234],[196,232],[170,250],[190,250]].forEach(([x,y])=>gi+=`<circle cx="${x}" cy="${y}" r="9" style="${st('gut')}"/>`);
    s+=G('gut',gi,181,232,34);
    // the big toe, where the flare is
    s+=`<ellipse cx="160" cy="424" rx="7" ry="5" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.4"/>`;
    s+=`</g>`;
    const L=(k,x,y,tx,ty,anchor)=>`<line x1="${x+DX}" y1="${y}" x2="${tx+(anchor==='end'?4:-4)}" y2="${ty-4}" style="stroke:var(--muted);stroke-width:1"/><text x="${tx}" y="${ty}" class="t-sm ${anchor==='end'?'t-end':''}" style="fill:${on(k)?'var(--bad)':'var(--muted)'};font-weight:${on(k)?700:500}">${k==='marrow'?'marrow':CD_ORG[k].n.toLowerCase()}</text>`;
    s+=L('muscle',96,130,LLX,118,'end')+L('liver',132,154,LLX,160,'end')+L('gut',156,240,LLX,246,'end')+L('nerves',262,128,RLX,118,'')+L('kidney',226,198,RLX,200,'')+L('marrow',216,340,RLX,334,'');
    osv.innerHTML=s;
    const O=CD_ORG[org];
    $('#cdOrgNote').innerHTML=`<div class="kicker">Toxicity map</div><h4>${O.n}</h4><dl class="kv"><div><dt>What is reported</dt><dd>${O.rep}</dd></div><div><dt>What to watch</dt><dd>${O.mon}</dd></div></dl>`;
    $$('#m-coldose button[data-org]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.org===org));
  }
  function pick(k){org=k;drawOrg()}
  $$('#m-coldose button[data-org]').forEach(b=>b.onclick=()=>pick(b.dataset.org));
  osv.addEventListener('click',e=>{const g=e.target.closest('[data-org]');if(g)pick(g.dataset.org)});
  osv.addEventListener('keydown',e=>{const g=e.target.closest('[data-org]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(g.dataset.org)}});
  drawOrg();

  /* ---------- 4. kidney gauge ---------- */
  const cr=$('#cdCr'),rsv=$('#cdRenSvg'),dial=$('#cdDial');let dOn=false,ptr=null,stopR=null;
  let GX0=16,GX1=444;const gx=c=>GX0+(GX1-GX0)*clamp(c/120);
  function cat(c){if(dOn)return{k:'dialysis',n:'On dialysis',col:'var(--bad)'};if(c<30)return{k:'severe',n:'Severe (<30)',col:'var(--bad)'};if(c<50)return{k:'moderate',n:'Moderate (30–50)',col:'var(--warn)'};if(c<=80)return{k:'mild',n:'Mild (50–80)',col:'var(--gold)'};return{k:'normal',n:'Above 80',col:'var(--good)'}}
  const RULE={
   normal:['1.2 mg, then 0.6 mg at 1 h','0.6 mg once or twice daily'],
   mild:['no dose change','no dose change · monitor closely'],
   moderate:['no dose change','no dose change · monitor closely'],
   severe:['same dose · repeat ≤ once per 2 weeks','start at 0.3 mg/day'],
   dialysis:['single 0.6 mg · ≤ once per 2 weeks','start at 0.3 mg twice a week']};
  const REN={
   normal:`Above 80 mL/min the label's kidney-impairment advice does not apply. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`,
   mild:`Label (gout), mild impairment (CrCl 50–80): no change to the flare dose, and no change to prophylaxis, with close monitoring. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`,
   moderate:`Label (gout), moderate impairment (CrCl 30–50): no change to the flare dose, and no change to prophylaxis, with close monitoring. ACR 2012 lists moderate or severe CKD as a limit on colchicine, NSAIDs and COX-2 inhibitors. <sup class="c" data-ref="FDA-Colcrys,Khanna2012P2" title="Source 117,203">117,203</sup>`,
   severe:`Label (gout), severe impairment (CrCl below 30): the flare dose is not reduced, but a course is repeated no more than once every 2 weeks; prophylaxis starts at 0.3 mg/day. The label does not recommend flare treatment with colchicine for people with kidney impairment who already take it for prophylaxis. EULAR 2016 says to avoid colchicine and NSAIDs in severe kidney impairment. <sup class="c" data-ref="FDA-Colcrys,Richette2017" title="Source 117,331">117,331</sup>`,
   dialysis:`Label (gout), on dialysis: a single 0.6 mg flare dose, no more than once every 2 weeks; prophylaxis starts at 0.3 mg twice a week. Dialysis does not remove colchicine. In people with FMF on dialysis, clearance was 75% lower (0.17 vs 0.73 L/h/kg) and half-life longer (18.8 vs 4.4 h) than with normal kidneys. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>`};
  function drawRen(p,c){const C=cat(c);let s='';
    const NR=vb(rsv,'460 236','400 276');GX0=NR?12:16;GX1=NR?388:444;
    [[0,30,'var(--bad-soft)','severe'],[30,50,'var(--warn-soft)',NR?'mod.':'moderate'],[50,80,'var(--gold-soft)','mild'],[80,120,'var(--good-soft)',NR?'none':'no adjustment']].forEach(([a,b,f,l])=>{s+=`<rect x="${f1(gx(a))}" y="60" width="${f1(gx(b)-gx(a))}" height="34" style="fill:${f}"/><text x="${f1((gx(a)+gx(b))/2)}" y="81" class="t-xs t-mid">${l}</text>`});
    s+=`<rect x="${GX0}" y="60" width="${GX1-GX0}" height="34" rx="3" style="fill:none;stroke:var(--line)"/>`;
    [0,30,50,80,120].forEach(v=>s+=`<text x="${f1(gx(v))}" y="112" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${GX1}" y="128" class="t-xs t-end">mL/min</text>`;
    const px=gx(p);s+=`<path d="M${f1(px)} 56 l-8 -14 h16z" style="fill:${C.col}"/><line x1="${f1(px)}" x2="${f1(px)}" y1="56" y2="98" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=`<text x="${GX0}" y="28" class="t-big">${dOn?'On dialysis':'CrCl '+Math.round(c)+' mL/min'}</text><text x="${GX1}" y="30" class="t-sm t-end" style="fill:${C.col}">${C.n}</text>`;
    // the label's two rules for this category
    const rr=RULE[C.k],ry=NR?150:146;
    s+=`<text x="${GX0}" y="${ry}" class="t-xs">FLARE</text><text x="${GX0+(NR?84:90)}" y="${ry}" class="t-lbl" style="fill:${C.col}">${rr[0]}</text>`;
    s+=`<text x="${GX0}" y="${ry+22}" class="t-xs">PROPHYLAXIS</text><text x="${GX0+(NR?84:90)}" y="${ry+22}" class="t-lbl" style="fill:${C.col}">${rr[1]}</text>`;
    if(dOn){const bx=GX0,by=NR?204:196,w=GX1-GX0;s+=`<text x="${bx}" y="${by}" class="t-xs">CLEARANCE IN FMF ON DIALYSIS (label study, L/h/kg)</text><rect x="${bx}" y="${by+8}" width="${f1(w*.73/.8)}" height="12" rx="3" style="fill:var(--good)"/><text x="${f1(bx+w*.73/.8-4)}" y="${by+18}" class="t-xs t-end" style="fill:var(--panel)">normal kidneys 0.73</text><rect x="${bx}" y="${by+26}" width="${f1(w*.17/.8)}" height="12" rx="3" style="fill:var(--bad)"/><text x="${f1(bx+w*.17/.8+6)}" y="${by+36}" class="t-xs" style="fill:var(--bad)">dialysis 0.17 (−75%)</text>`}
    else s+=`<text x="${GX0}" y="${NR?206:200}" class="t-xs">Drag the slider or press "On dialysis".</text>`;
    rsv.innerHTML=s;
    $('#cdCrOut').textContent=dOn?'dialysis':Math.round(c);
    $('#cdRenNote').innerHTML=`<div class="kicker">Kidney function</div><h4>${C.n}</h4><p>${REN[C.k]}</p><p>Across every category, the label contraindicates P-gp or strong CYP3A4 inhibitors with colchicine in kidney or liver impairment. Colchicine myopathy in gout typically appears when reduced kidney function raises drug levels on customary doses. <sup class="c" data-ref="FDA-Colcrys,Kuncl1987" title="Source 117,221">117,221</sup></p>`;
  }
  function setRen(inst){const c=+cr.value,to=dOn?0:c;if(stopR)stopR();if(ptr==null||inst){ptr=to;drawRen(ptr,c);return}
    const fr=ptr;stopR=animate(380,p=>{ptr=lerp(fr,to,ease(p));drawRen(ptr,c)},()=>{stopR=null})}
  cr.addEventListener('input',()=>{if(dOn){dOn=false;dial.setAttribute('aria-pressed','false')}setRen(true)});
  dial.onclick=()=>{dOn=!dOn;dial.setAttribute('aria-pressed',dOn);setRen()};
  setRen(true);

  /* playWire only registers the exposure chart for the narrow/wide redraw, so
     chain the widgets that have no player of their own. */
  const prevRedraw=redraws.coldose;
  redraws.coldose=()=>{prevRedraw&&prevRedraw();drawReg();drawOrg();setRen(true)};
};
/* =============== 3.1 how urate-lowering drugs work =============== */
const UL_STEPS=[
 {from:0,at:.06,k:'Scene 1 · Make less',t:'Xanthine oxidase inhibitors',
  txt:'Purines from food and from the body\'s own cell turnover are broken down to hypoxanthine. Xanthine oxidoreductase then works twice: hypoxanthine to xanthine, and xanthine to uric acid. It is the rate-limiting enzyme of urate production. <sup class="c" data-ref="Chen2016,Furuhashi2020" title="Source 39,141">39,141</sup> Allopurinol, a purine (hypoxanthine) analogue, and its metabolite oxipurinol block that enzyme. <sup class="c" data-ref="FDA-Zyloprim" title="Source 129">129</sup> Febuxostat blocks it too, but is not a purine. <sup class="c" data-ref="Becker2005,White2018" title="Source 18,431">18,431</sup>',
  pt:'Make less: these tablets slow down the last two steps of the factory line, so less uric acid is made.',
  hook:'Allopurinol is a <b>purine analogue</b>; its metabolite <b>oxypurinol</b> (t½ 23.3 h) does most of the work and is cleared by the kidney. <sup class="c" data-ref="Day2007" title="Source 87">87</sup>'},
 {from:.34,at:.4,k:'Scene 2 · Excrete more',t:'Uricosurics: let the kidney pass more',
  txt:'At least 90% of the urate the kidney filters is taken back into the blood, through transporters that include URAT1 and GLUT9. <sup class="c" data-ref="Chen2016" title="Source 39">39</sup> URAT1, identified in 2002, is the target of uricosuric drugs. <sup class="c" data-ref="Enomoto2002" title="Source 112">112</sup> Blocking reabsorption sends more urate out in the urine. Probenecid increases urinary uric acid excretion; <sup class="c" data-ref="FDA-Probenecid" title="Source 126">126</sup> dotinurad is a selective URAT1 inhibitor that barely touches the secretory transporters ABCG2 and OAT1/3. <sup class="c" data-ref="Taniguchi2020" title="Source 396">396</sup> The gut, through ABCG2, removes about a third of urate. <sup class="c" data-ref="Ohashi2023,HalperinKuhns2021" title="Source 153,302">153,302</sup>',
  pt:'Excrete more: these tablets stop the kidney from taking uric acid back, so more of it leaves in the urine.',
  hook:'Probenecid "may not be effective" at GFR ≤30 mL/min and is contraindicated with uric acid stones. <sup class="c" data-ref="FDA-Probenecid" title="Source 126">126</sup>'},
 {from:.67,at:.72,k:'Scene 3 · Break it down',t:'Uricase: the enzyme humans lost',
  txt:'Most mammals turn urate into allantoin with uricase. Humans and other great apes lost the gene through a nonsense mutation, so urate is our end product. <sup class="c" data-ref="Wu1992,Oda2002,Chen2016" title="Source 39,297,434">39,297,434</sup> Pegloticase is a PEGylated recombinant uricase given by infusion. It oxidises uric acid to allantoin, an inert, water-soluble product cleared by the kidneys. About 24 h after the first 8 mg dose, mean plasma uric acid was 0.7 mg/dL against 8.2 mg/dL on placebo. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup>',
  pt:'Break it down: an enzyme drip turns uric acid into a substance the body can wash out easily.',
  hook:'Pegloticase: screen for <b>G6PD deficiency</b>, check urate before every infusion, and give it with <b>methotrexate</b>. <sup class="c" data-ref="FDA-Krystexxa,Botson2023" title="Source 27,122">27,122</sup>'}
];
const UL_AUTO=['allo','prob','peg'];
const UL_DRUGS={
 none:{n:'No drug',c:'Untreated',site:[],at:'nothing blocked',lvl:8.5,cap:'illustrative starting value'},
 allo:{n:'Allopurinol',c:'Xanthine oxidase inhibitor',site:['xo'],at:'xanthine oxidase (both steps)',lvl:5.5,rg:[5.16,5.75],cap:'−2.75 to −3.34 mg/dL on 300 mg/day · Perez-Ruiz 1998',
  mech:'A purine (hypoxanthine) analogue. It and its metabolite oxipurinol (oxypurinol) inhibit xanthine oxidase. <sup class="c" data-ref="FDA-Zyloprim" title="Source 129">129</sup> Most of the urate-lowering effect comes from oxypurinol. <sup class="c" data-ref="Day2007" title="Source 87">87</sup>',
  pk:'Allopurinol: bioavailability 79 ± 20%, half-life 1.2 ± 0.3 h; about 90 mg of oxypurinol forms from each 100 mg. Oxypurinol: half-life 23.3 ± 6.0 h with normal kidney function, cleared almost entirely in urine. <sup class="c" data-ref="Day2007" title="Source 87">87</sup> The US label gives about 1–2 h and about 15 h. <sup class="c" data-ref="FDA-Zyloprim" title="Source 129">129</sup>',
  lab:'The US label raises the dose by 100 mg each week to serum urate ≤6 mg/dL, to a maximum of 800 mg/day. <sup class="c" data-ref="FDA-Zyloprim" title="Source 129">129</sup> The UK SmPC allows up to 900 mg/day. <sup class="c" data-ref="SmPC-Allopurinol-UK" title="Source 370">370</sup> ACR 2020: first line, including in CKD stage ≥3, starting at ≤100 mg/day. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  hist:'Came out of Hitchings and Elion\'s purine research (Nobel Prize 1988). Zyloprim was approved in the US on 19 August 1966. <sup class="c" data-ref="Elion1989,Nuki2006,DrugsFDA-ULT" title="Source 100,106,296">100,106,296</sup>',
  eff:'300 mg/day lowered serum urate by 2.75 mg/dL in normal excretors and 3.34 mg/dL in under-excretors. <sup class="c" data-ref="PerezRuiz1998" title="Source 311">311</sup>'},
 febu:{n:'Febuxostat',c:'Xanthine oxidase inhibitor',site:['xo'],at:'xanthine oxidase (both steps)',lvl:4.76,cap:'−44.00% on 40 mg · Hosoya 2020',
  mech:'A non-purine, selective xanthine oxidase inhibitor. <sup class="c" data-ref="Becker2005,White2018" title="Source 18,431">18,431</sup>',
  pk:'Terminal half-life about 5–8 h. <sup class="c" data-ref="FDA-Uloric" title="Source 127">127</sup>',
  lab:'US: 40 mg once daily, raised to 80 mg if serum urate is still ≥6 mg/dL after 2 weeks; 40 mg in severe renal impairment. <sup class="c" data-ref="FDA-Uloric" title="Source 127">127</sup> EU: 80 mg, with 120 mg considered if serum urate is >6 mg/dL (357 µmol/L) after 2–4 weeks. <sup class="c" data-ref="EMA-Adenuric" title="Source 107">107</sup> Since February 2019 the US label carries a boxed warning for cardiovascular death and limits febuxostat to people for whom allopurinol has failed or is not advisable. <sup class="c" data-ref="FDA-Uloric" title="Source 127">127</sup>',
  hist:'EU (Adenuric) 21 April 2008; US (Uloric) 13 February 2009. <sup class="c" data-ref="EMA-Adenuric,DrugsFDA-ULT" title="Source 100,107">100,107</sup>',
  eff:'Serum urate <6 mg/dL in 45% on 40 mg and 67% on 80 mg in CONFIRMS. <sup class="c" data-ref="Becker2010" title="Source 19">19</sup> In a dotinurad trial febuxostat 40 mg lowered serum urate by 44.00%. <sup class="c" data-ref="Hosoya2020a" title="Source 170">170</sup>'},
 prob:{n:'Probenecid',c:'Uricosuric',site:['urat1'],at:'urate reabsorption in the kidney',lvl:4.25,cap:'−50% on 2 g/day after allopurinol failure · Reinders 2009',
  mech:'Increases urinary uric acid excretion and so lowers serum urate. <sup class="c" data-ref="FDA-Probenecid" title="Source 126">126</sup> URAT1 is the target of uricosuric drugs. <sup class="c" data-ref="Enomoto2002" title="Source 112">112</sup>',
  pk:'Half-life not quoted in our sources. Salicylates antagonise its uricosuric action. <sup class="c" data-ref="FDA-Probenecid" title="Source 126">126</sup>',
  lab:'US label: 250 mg twice daily for 1 week, then 500 mg twice daily, rising by 500 mg every 4 weeks, usually not above 2000 mg/day. It "may not be effective" at GFR ≤30 mL/min and is contraindicated with uric acid kidney stones. <sup class="c" data-ref="FDA-Probenecid" title="Source 126">126</sup> ACR 2020 starts at 500 mg once or twice daily and prefers allopurinol or febuxostat in CKD stage ≥3. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  hist:'An older generic uricosuric with a current US label. <sup class="c" data-ref="FDA-Probenecid" title="Source 126">126</sup>',
  eff:'After allopurinol had failed, 2 g/day brought 65% (20/31) to ≤5 mg/dL, with a 50% mean fall in serum urate. <sup class="c" data-ref="Reinders2009Prob" title="Source 330">330</sup>'},
 benz:{n:'Benzbromarone',c:'Uricosuric',site:['urat1'],at:'urate reabsorption in the kidney',lvl:3.46,cap:'−5.04 mg/dL on 100 mg/day · Perez-Ruiz 1998',
  mech:'A potent uricosuric. <sup class="c" data-ref="PerezRuiz1998,Lee2008" title="Source 225,311">225,311</sup>',
  pk:'Metabolised by CYP2C9, which it also inhibits, so it interacts with warfarin. <sup class="c" data-ref="Lee2008" title="Source 225">225</sup>',
  lab:'Not approved in the US: Drugs@FDA lists no application. <sup class="c" data-ref="DrugsFDA-ULT" title="Source 100">100</sup> Doherty 2018 used 50→200 mg as a second-line option in the UK. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  hist:'Registered in about 20 countries, then withdrawn by Sanofi-Synthélabo in 2003 after reports of liver toxicity; other companies still market it. The estimated hepatotoxicity risk in Europe is about 1 in 17,000 patients. <sup class="c" data-ref="Lee2008" title="Source 225">225</sup>',
  eff:'100 mg/day lowered serum urate by 5.04 mg/dL (8.58 to 3.54), and every under-excretor reached <6 mg/dL, against 53% on allopurinol 300 mg/day. <sup class="c" data-ref="PerezRuiz1998" title="Source 311">311</sup> After allopurinol failure, 200 mg reached ≤5 mg/dL in 92% (22/24). <sup class="c" data-ref="Reinders2009Prob" title="Source 330">330</sup>'},
 dotin:{n:'Dotinurad',c:'Selective URAT1 inhibitor',site:['urat1'],at:'URAT1 in the kidney',lvl:4.95,cap:'−41.82% on 2 mg · Hosoya 2020',
  mech:'A selective URAT1 inhibitor that barely inhibits the secretory transporters ABCG2 and OAT1/3. <sup class="c" data-ref="Taniguchi2020" title="Source 396">396</sup>',
  pk:'Half-life not quoted in our sources. Its efficacy is not reduced in mild to moderate renal impairment. <sup class="c" data-ref="Ishikawa2021" title="Source 177">177</sup>',
  lab:'Approved in Japan; phase 3 trials against allopurinol and in tophaceous gout are recruiting in the US and Europe. <sup class="c" data-ref="Taniguchi2020,NCT07089875,NCT07089888" title="Source 283,284,396">283,284,396</sup>',
  hist:'Japan, January 2020 (URECE). <sup class="c" data-ref="Taniguchi2020" title="Source 396">396</sup>',
  eff:'Non-inferior to febuxostat (−41.82% on 2 mg vs −44.00% on 40 mg) and to benzbromarone (−45.9% on 2 mg vs −43.8% on 50 mg). <sup class="c" data-ref="Hosoya2020a,Hosoya2020Benz" title="Source 170,171">170,171</sup>'},
 lesin:{n:'Lesinurad + XO inhibitor',c:'URAT1 inhibitor (add-on only)',site:['xo','urat1'],at:'URAT1, on top of xanthine oxidase inhibition',lvl:null,cap:'no mean change quoted · 54.2% vs 27.9% at target (CLEAR 1)',
  mech:'A URAT1 inhibitor approved only together with a xanthine oxidase inhibitor, never alone. <sup class="c" data-ref="FDA-Zurampic" title="Source 128">128</sup>',
  pk:'Half-life not quoted in our sources.',
  lab:'US: 200 mg/day with a xanthine oxidase inhibitor. Boxed warning: "risk of acute renal failure, more common when used without a xanthine oxidase inhibitor". <sup class="c" data-ref="FDA-Zurampic" title="Source 128">128</sup>',
  hist:'US approval 22 December 2015; later withdrawn by the manufacturer (Drugs@FDA: "Discontinued"). The EU authorisation of 18 February 2016 was withdrawn for commercial reasons, notified 31 July 2020. <sup class="c" data-ref="FitzGerald2020,DrugsFDA-ULT,EMA-Zurampic" title="Source 100,111,135">100,111,135</sup>',
  eff:'CLEAR 1: with allopurinol, 54.2% reached <6 mg/dL at month 6 against 27.9% on allopurinol alone, with no significant benefit on flares or tophi. <sup class="c" data-ref="Saag2017" title="Source 343">343</sup> CLEAR 2: renal adverse events in 5.9% (200 mg), 15.0% (400 mg) and 4.9% (allopurinol alone). <sup class="c" data-ref="Bardin2017" title="Source 16">16</sup>'},
 peg:{n:'Pegloticase',c:'Uricase (enzyme)',site:['uc'],at:'urate itself, turned into allantoin',lvl:.7,cap:'0.7 mg/dL 24 h after the first dose (placebo 8.2) · US label',
  mech:'A PEGylated recombinant uricase. It oxidises uric acid to allantoin, an inert, water-soluble product cleared by the kidneys. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup>',
  pk:'Given by IV infusion every 2 weeks. High-titre anti-drug antibodies developed in 41% and were linked to faster clearance and loss of response. <sup class="c" data-ref="FDA-Krystexxa,Lipsky2014" title="Source 122,233">122,233</sup>',
  lab:'US: 8 mg IV every 2 weeks with oral methotrexate 15 mg weekly plus folic or folinic acid, started at least 4 weeks before; oral urate-lowering drugs are stopped first and patients are pre-medicated. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup> ACR 2020 strongly recommends it only after other options fail, and never first line. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  hist:'US approval 14 September 2010. The EU authorisation of 8 January 2013 was withdrawn on 30 June 2016. <sup class="c" data-ref="DrugsFDA-ULT,EMA-Krystexxa" title="Source 100,110">100,110</sup>',
  eff:'Without methotrexate, 42% on every-2-week dosing kept serum urate <6 mg/dL in months 3 and 6 (placebo 0%). <sup class="c" data-ref="Sundy2011" title="Source 388">388</sup> With methotrexate (MIRROR), 71.0% responded at month 6 against 38.5%. <sup class="c" data-ref="Botson2023" title="Source 27">27</sup>'},
 losartan:{n:'Losartan',c:'Blood pressure drug, mildly uricosuric',site:['kid'],at:'the kidney (more urate in urine)',lvl:7.76,cap:'538 → 491 µmol/L on 50 mg/day · Würzner 2001',
  mech:'An angiotensin receptor blocker that lowers serum urate through uricosuria; irbesartan, a related drug, did not. <sup class="c" data-ref="Wurzner2001" title="Source 435">435</sup>',
  pk:'Not a gout drug.',
  lab:'ACR 2020 conditionally recommends choosing losartan as the antihypertensive when feasible. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  hist:'Losartan and calcium channel blockers are linked to a lower risk of gout, diuretics to a higher one. <sup class="c" data-ref="Choi2012BMJ" title="Source 57">57</sup>',
  eff:'50 mg/day lowered serum urate from 538 to 491 µmol/L [about 9.0 to 8.3 mg/dL] in 13 people with gout and high blood pressure. <sup class="c" data-ref="Wurzner2001" title="Source 435">435</sup>'},
 feno:{n:'Fenofibrate',c:'Lipid drug, mildly uricosuric',site:['kid'],at:'the kidney (urate clearance up 36%)',lvl:6.89,cap:'−19% on top of allopurinol · Feher 2003',
  mech:'A fibrate that raised urate clearance by 36%. <sup class="c" data-ref="Feher2003" title="Source 130">130</sup>',
  pk:'Not a gout drug.',
  lab:'ACR 2020 conditionally recommends against adding or switching to fenofibrate for gout. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  hist:'Not licensed for gout. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  eff:'200 mg/day lowered serum urate by a further 19% on top of allopurinol. <sup class="c" data-ref="Feher2003" title="Source 130">130</sup>'},
 sglt2:{n:'SGLT2 inhibitors',c:'Diabetes and heart drugs',site:['kid'],at:'the kidney (exact transporter not in our sources)',lvl:7.87,cap:'−37.73 µmol/L (≈ −0.63 mg/dL) · Zhao 2018',
  mech:'Drugs for diabetes that lower serum urate as a side effect. <sup class="c" data-ref="Zhao2018" title="Source 453">453</sup>',
  pk:'Not a gout drug. The urate effect was lost at eGFR <60. <sup class="c" data-ref="Zhao2018" title="Source 453">453</sup>',
  lab:'Not licensed for gout. Their links with fewer flares are covered in <a href="#links" data-go="links">Gout, kidneys &amp; heart</a>. <sup class="c" data-ref="Fralick2020,McCormick2023" title="Source 137,257">137,257</sup>',
  hist:'In DAPA-HF, dapagliflozin lowered urate by 0.84 mg/dL over 12 months against placebo. <sup class="c" data-ref="McDowell2022" title="Source 259">259</sup>',
  eff:'Across 62 randomised trials (34,941 people with type 2 diabetes), serum urate fell by a weighted mean of 37.73 µmol/L [about 0.63 mg/dL]. <sup class="c" data-ref="Zhao2018" title="Source 453">453</sup>'}
};
/* two layouts: boxes, badges and particle routes. Each route point is [x,y,state]; the state
   colours the segment that starts there: p precursor, u urate, a allantoin */
const UL_L={
 w:{vb:'720 400',
  box:{pur:[14,66,100,52,'Purines','food, turnover'],hyp:[154,66,108,52,'Hypoxanthine',''],xan:[318,66,92,52,'Xanthine',''],
   pool:[462,56,112,118,'Urate','in the blood'],all:[616,18,96,46,'Allantoin','soluble'],kid:[616,120,96,130,'Kidney','reabsorbs most'],
   uri:[616,300,96,46,'Urine','≈ 2/3 of output'],gut:[462,236,112,46,'Gut','ABCG2 exports'],sto:[462,316,112,40,'Stool','≈ 1/3']},
  bd:{xo1:[290,92,'XO','v',1],xo2:[436,92,'XO','v',1],uc:[566,40,'uricase'],urat1:[616,206,'URAT1','v',-1]},
  rt:{prod:[[64,92,'p'],[208,92,'p'],[364,92,'p'],[436,92,'u'],[518,115]],
   uri:[[518,115,'u'],[574,150,'u'],[664,160,'u'],[664,330,'u'],[664,332]],
   reab:[[518,115,'u'],[574,150,'u'],[664,160,'u'],[640,206,'u'],[600,206,'u'],[574,190,'u'],[518,150]],
   gut:[[518,115,'u'],[518,259,'u'],[518,336,'u'],[518,338]],
   uc:[[518,115,'u'],[518,40,'u'],[566,40,'a'],[664,40,'a'],[664,160,'a'],[664,330,'a'],[664,332]]},
  g:{x0:30,x1:420,y:318,ty:204}},
 n:{vb:'400 740',
  box:{pur:[20,50,150,46,'Purines','food, cell turnover'],hyp:[20,130,150,46,'Hypoxanthine',''],xan:[20,210,150,46,'Xanthine',''],
   pool:[20,296,150,110,'Urate','in the blood'],all:[250,50,130,46,'Allantoin','soluble'],kid:[250,230,130,140,'Kidney','reabsorbs most'],
   uri:[250,420,130,46,'Urine','≈ 2/3 of output'],gut:[20,446,150,46,'Gut','ABCG2 exports'],sto:[20,526,150,40,'Stool','≈ 1/3']},
  bd:{xo1:[95,193,'XO','h',1],xo2:[95,276,'XO','h',1],uc:[210,150,'uricase'],urat1:[250,352,'URAT1','v',-1]},
  rt:{prod:[[95,73,'p'],[95,153,'p'],[95,233,'p'],[95,276,'u'],[95,350]],
   uri:[[95,350,'u'],[170,320,'u'],[250,320,'u'],[315,300,'u'],[315,443,'u'],[315,446]],
   reab:[[95,350,'u'],[170,320,'u'],[250,320,'u'],[315,300,'u'],[290,352,'u'],[250,352,'u'],[170,380,'u'],[95,380]],
   gut:[[95,350,'u'],[95,469,'u'],[95,546,'u'],[95,548]],
   uc:[[95,350,'u'],[170,306,'u'],[210,306,'u'],[210,150,'a'],[210,73,'a'],[315,73,'a'],[315,300,'a'],[315,443,'a'],[315,446]]},
  g:{x0:30,x1:370,y:656,ty:586}}
};
/* exit shares by what the drug blocks */
function ulShares(site){
  if(site.includes('uc'))return{uc:.8,reab:.08,uri:.07,gut:.05};
  if(site.includes('urat1'))return{uc:0,reab:.08,uri:.67,gut:.25};
  if(site.includes('kid'))return{uc:0,reab:.3,uri:.45,gut:.25};
  return{uc:0,reab:.42,uri:.33,gut:.25};
}
/* a polyline with cumulative lengths, sampled by distance */
function ulPoly(pts){const L=[0];for(let i=1;i<pts.length;i++)L.push(L[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));return{pts,L,len:L[L.length-1]}}
function ulAt(P,d){d=clamp(d,0,P.len);let i=1;while(i<P.L.length-1&&P.L[i]<d)i++;const a=P.pts[i-1],b=P.pts[i],u=(d-P.L[i-1])/Math.max(1e-6,P.L[i]-P.L[i-1]);return[lerp(a[0],b[0],u),lerp(a[1],b[1],u),a[2]||'u']}
function ulDist(P,x,y){let best=0,bd=1e9;for(let i=1;i<P.pts.length;i++){const a=P.pts[i-1],b=P.pts[i];for(let k=0;k<=20;k++){const u=k/20,px=lerp(a[0],b[0],u),py=lerp(a[1],b[1],u),dd=Math.hypot(px-x,py-y);if(dd<bd){bd=dd;best=P.L[i-1]+u*(P.L[i]-P.L[i-1])}}}return best}
inits.ult=()=>{
  const svg=$('#ulSvg'),rg=$('#ulT');let pick='auto';
  const R=rng(31),PART=Array.from({length:34},(_,i)=>({o:i/34,r1:R(),r2:R()}));
  const COL={p:'var(--muted)',u:'var(--gold)',a:'var(--sea)'};
  const routes={};
  function prep(key){if(routes[key])return routes[key];const Lw=UL_L[key],P=ulPoly(Lw.rt.prod),o={prod:P};
    ['uri','reab','gut','uc'].forEach(k=>o[k]=ulPoly(Lw.rt.prod.slice(0,-1).concat(Lw.rt[k])));
    o.xo1=ulDist(P,Lw.bd.xo1[0],Lw.bd.xo1[1]);o.xo2=ulDist(P,Lw.bd.xo2[0],Lw.bd.xo2[1]);
    return routes[key]=o}
  function wrapT(txt,n){const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o}
  function draw(t){
    const N=vb(svg,'720 400','400 740'),key=N?'n':'w',L=UL_L[key],RT=prep(key);
    const p=phaseOf(UL_STEPS,t),S=UL_STEPS[p],nx=p<2?UL_STEPS[p+1].from:1,lt=clamp((t-S.from)/(nx-S.from));
    const dk=pick==='auto'?UL_AUTO[p]:pick,D=UL_DRUGS[dk],site=D.site;
    const k=ease(ramp(lt,.06,.55)),lvl=D.lvl==null?null:lerp(8.5,D.lvl,k);
    const hot={0:['pur','hyp','xan'],1:['kid','uri','gut','sto'],2:['all']}[p];
    let s=`<defs>${marker('ulA','var(--muted)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="${N?28:12}" class="t-sm" style="fill:var(--sea)">${['1 · MAKE LESS','2 · EXCRETE MORE','3 · BREAK IT DOWN'][p]}</text>`;
    if(!N)s+=`<text x="14" y="30" class="t-xs">${D.n==='No drug'?'no drug selected':D.n+' · acts on '+D.at}</text>`;
    // guide lines under the particles
    Object.keys(L.rt).forEach(r=>{const pts=L.rt[r];if(r==='uc'&&!site.includes('uc')){s+=`<path d="M${pts.map(q=>q[0]+' '+q[1]).join('L')}" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:3 5"/>`;return}
      s+=`<path d="M${pts.map(q=>q[0]+' '+q[1]).join('L')}" style="fill:none;stroke:var(--line);stroke-width:2.4;stroke-linejoin:round"/>`});
    // particles
    const sh=ulShares(site),xoB=site.includes('xo'),blockF=xoB?(site.includes('urat1')?.5:.55):0,pile={xo1:0,xo2:0};
    PART.forEach(q=>{
      let ex='gut';const r=q.r1;let a=0;for(const k2 of ['uc','reab','uri','gut']){a+=sh[k2];if(r<a){ex=k2;break}}
      const P=RT[ex],u=((t*7+q.o)%1),d=u*P.len;
      if(xoB&&q.r2<blockF){const bk=q.r2<blockF/2?'xo1':'xo2',bd=RT[bk]-12;if(d>bd){pile[bk]++;return}}
      const [x,y,c]=ulAt(P,d);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:${COL[c]};opacity:.92"/>`});
    // boxes over the particles
    Object.entries(L.box).forEach(([id,b])=>{const [x,y,w,h,l,sb]=b,isHot=hot.includes(id);
      const isSite=(id==='kid'&&(site.includes('kid')||site.includes('urat1')))||(id==='all'&&site.includes('uc'))||(xoB&&(id==='hyp'||id==='xan'));
      if(id==='pool'){const fh=(h-34)*clamp((lvl==null?D.lvlFallback||6.2:lvl)/10);
        s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:var(--gold);stroke-width:2"/>`;
        s+=`<rect x="${x+6}" y="${f1(y+h-6-fh)}" width="${w-12}" height="${f1(fh)}" rx="7" style="fill:var(--gold-soft)"/>`;
        s+=`<line x1="${x+6}" x2="${x+w-6}" y1="${f1(y+h-6-(h-34)*.6)}" y2="${f1(y+h-6-(h-34)*.6)}" style="stroke:var(--sea);stroke-width:1.4;stroke-dasharray:4 3"/>`;
        s+=`<text x="${x+w/2}" y="${y+20}" class="t-lbl t-mid">${l}</text><text x="${x+w/2}" y="${y+33}" class="t-xs t-mid">${sb}</text>`;
        s+=`<text x="${x+w-8}" y="${f1(y+h-6-(h-34)*.6-4)}" class="t-xs t-end" style="fill:var(--sea)">6</text>`;return}
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="11" style="fill:${isHot?'var(--panel)':'var(--panel-2)'};stroke:${isSite?'var(--sea)':isHot?'var(--muted)':'var(--line)'};stroke-width:${isSite?2.4:1.3}"/>`;
      s+=`<text x="${x+w/2}" y="${y+(sb?21:h/2+5)}" class="t-lbl t-mid">${l}</text>`;if(sb)s+=`<text x="${x+w/2}" y="${y+36}" class="t-xs t-mid">${sb}</text>`;
      if(id==='kid'){const cx=x+w/2,cy=y+56;s+=`<circle cx="${cx-18}" cy="${cy}" r="9" style="fill:none;stroke:var(--tub-a);stroke-width:1.6"/><path d="M${cx-9} ${cy} H${cx+14} V${cy+44} H${cx-4}" style="fill:none;stroke:var(--tub-a);stroke-width:5;stroke-linejoin:round;opacity:.55"/>`}});
    // badges
    Object.entries(L.bd).forEach(([id,b])=>{const [x,y,l,o,sg]=b,w=l.length*7+14;
      const on=(id.startsWith('xo')&&xoB)||(id==='urat1'&&site.includes('urat1'))||(id==='uc'&&site.includes('uc'));
      const lost=id==='uc'&&!site.includes('uc');
      s+=`<rect x="${f1(x-w/2)}" y="${y-10}" width="${w}" height="20" rx="10" style="fill:${on?'var(--sea)':'var(--panel)'};stroke:${on?'var(--sea)':lost?'var(--line)':'var(--muted)'};stroke-width:1.4${lost?';stroke-dasharray:3 3':''}"/>`;
      s+=`<text x="${x}" y="${y+4}" class="t-xs t-mid" style="fill:${on?'var(--on-sea)':lost?'var(--muted)':'var(--ink)'};font-weight:700">${l}</text>`;
      if(on&&id!=='uc'){s+=o==='v'?`<line x1="${f1(x+sg*(w/2+6))}" x2="${f1(x+sg*(w/2+6))}" y1="${y-14}" y2="${y+14}" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round"/>`:`<line x1="${x-16}" x2="${x+16}" y1="${y+sg*13}" y2="${y+sg*13}" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round"/>`}
      if(lost)s+=`<text x="${x}" y="${y+(N?22:-14)}" class="t-xs t-mid">${N?'lost in humans':'lost in humans'}</text>`});
    // piles of blocked precursors
    ['xo1','xo2'].forEach(bk=>{const [bx,by]=L.bd[bk];for(let j=0;j<pile[bk];j++){const col=j%4,row=Math.floor(j/4);
      const px=N?bx-34-col*7:bx-10+col*7,py=N?by-6+row*7:by-34-row*7;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="2.6" style="fill:var(--muted);opacity:.55"/>`}});
    // gauge
    const G=L.g,gx=v=>lerp(G.x0,G.x1,clamp(v/10)),gy=G.y;
    s+=`<text x="${G.x0-14}" y="${G.ty}" class="t-big">${D.n}</text><text x="${G.x0-14}" y="${G.ty+18}" class="t-sm">${D.c}</text>`;
    wrapT('acts on: '+D.at,N?54:58).forEach((ln,i)=>s+=`<text x="${G.x0-14}" y="${G.ty+34+i*13}" class="t-xs" style="fill:var(--ink)">${ln}</text>`);
    s+=`<text x="${G.x0}" y="${gy-14}" class="t-xs">SERUM URATE, mg/dL · SCHEMATIC</text>`;
    s+=`<rect x="${G.x0}" y="${gy}" width="${G.x1-G.x0}" height="16" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${G.x0}" y="${gy}" width="${f1(gx(6)-G.x0)}" height="16" rx="8" style="fill:var(--sea-soft)"/>`;
    if(lvl!=null)s+=`<rect x="${G.x0}" y="${gy+3}" width="${f1(Math.max(4,gx(lvl)-G.x0))}" height="10" rx="5" style="fill:var(--gold)"/><text x="${f1(Math.min(G.x1-2,Math.max(G.x0+30,gx(lvl))))}" y="${gy-3}" class="t-sm t-end" style="fill:var(--gold);font-weight:700">${f1(lvl)}</text>`;
    else s+=`<rect x="${G.x0}" y="${gy+3}" width="${f1(gx(8.5)-G.x0)}" height="10" rx="5" style="fill:none;stroke:var(--gold);stroke-width:1.4;stroke-dasharray:4 3"/>`;
    if(D.rg&&k>.95)s+=`<line x1="${f1(gx(D.rg[0]))}" x2="${f1(gx(D.rg[1]))}" y1="${gy+8}" y2="${gy+8}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(gx(D.rg[0]))}" x2="${f1(gx(D.rg[0]))}" y1="${gy+3}" y2="${gy+13}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(gx(D.rg[1]))}" x2="${f1(gx(D.rg[1]))}" y1="${gy+3}" y2="${gy+13}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    s+=`<line x1="${f1(gx(6))}" x2="${f1(gx(6))}" y1="${gy-6}" y2="${gy+22}" style="stroke:var(--sea);stroke-width:2"/>`;
    [0,2,4,6,8,10].forEach(v=>s+=`<text x="${f1(gx(v))}" y="${gy+32}" class="t-xs t-mid" style="${v===6?'fill:var(--sea);font-weight:700':''}">${v}</text>`);
    s+=`<text x="${f1(gx(6)+4)}" y="${gy+45}" class="t-xs" style="fill:var(--sea)">← target &lt;6</text>`;
    wrapT(D.cap,N?58:62).forEach((ln,i)=>s+=`<text x="${G.x0}" y="${gy+(N?58:60)+i*12}" class="t-xs" style="fill:var(--ink)">${ln}</text>`);
    svg.innerHTML=s;
    setSt(p);
    $('#ulRead').innerHTML=`<span>scene <b>${p+1} of 3</b></span><span>drug <b>${D.n}</b></span><span>acts on <b>${D.at}</b></span><span>gauge <b>${lvl==null?'not drawn: no mean change quoted':'8.5 → '+f1(lvl)+' mg/dL'}</b></span>`;
    let extra='';
    if(D.mech)extra=`<div class="ul-drug"><div class="kicker">${pick==='auto'?'This scene\'s example drug':'Your pick'} · ${D.n}</div><dl class="kv">`+
      `<div><dt>Mechanism</dt><dd>${D.mech}</dd></div><div><dt>Half-life and handling</dt><dd>${D.pk}</dd></div>`+
      `<div><dt>Label and guideline (as published)</dt><dd>${D.lab}</dd></div><div><dt>Approval history</dt><dd>${D.hist}</dd></div>`+
      `<div><dt>Published effect</dt><dd>${D.eff}</dd></div></dl></div>`;
    else extra=`<div class="ul-drug"><div class="kicker">No drug</div><p>Nothing is blocked: urate is made at the usual rate, most of what the kidney filters is reabsorbed, and the uricase step is missing in humans. <sup class="c" data-ref="Chen2016,Oda2002" title="Source 39,297">39,297</sup></p></div>`;
    $('#ulNote').innerHTML=noteHTML(S)+extra;
  }
  const stop=playWire(rg,$('#ulPlay'),draw,24000,'Replay','ult');
  const setSt=stepWire($('#ulSteps'),UL_STEPS,rg,draw,stop);
  $$('[data-ul]').forEach(b=>b.onclick=()=>{pick=b.dataset.ul;$$('[data-ul]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    // a manual pick jumps to the scene that drug belongs to, so its step is in view
    const D=UL_DRUGS[pick];if(D&&D.site){const sc=D.site.includes('uc')?2:(D.site.includes('urat1')||D.site.includes('kid'))?1:D.site.includes('xo')?0:-1;
      if(sc>=0&&phaseOf(UL_STEPS,+rg.value)!==sc){stop();rg.value=UL_STEPS[sc].at}}
    draw(+rg.value)});
  draw(+rg.value);
};
/* =============== 3.2 treat to target =============== */
const TT_STEPS=[
 {from:0,at:.015,k:'Week 0',t:'Decide, test, start low',
  txt:'ACR 2020 strongly recommends urate-lowering therapy with ≥1 tophus, radiographic damage from gout, or ≥2 flares a year. Before allopurinol it conditionally recommends an HLA-B*58:01 test for people of Southeast Asian descent (for example Han Chinese, Korean or Thai) and for African American people, and it starts allopurinol at ≤100 mg/day, lower in CKD, and febuxostat at ≤40 mg/day. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> The starting dose matters for safety: a high starting dose for the kidney function is a risk factor for allopurinol hypersensitivity. <sup class="c" data-ref="Stamp2012,Keller2018" title="Source 200,379">200,379</sup>',
  pt:'Before the first tablet: decide the medicine is needed, do a gene test if your family background calls for it, and start with a small dose.',
  hook:'ACR 2020 (strong): allopurinol <b>first line</b>, also in CKD stage ≥3; start <b>≤100 mg/day</b>. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>'},
 {from:.03,at:.1,k:'Weeks 2–16',t:'Titrate and recheck',
  txt:'ACR 2020 strongly prefers treat-to-target dosing guided by serial serum urate over fixed dosing. Titration should take "weeks to months, not years"; it cites the 2012 advice of a step every 2–5 weeks, with a urate check after each one. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> The US label raises allopurinol by 100 mg a week to a maximum of 800 mg/day; the UK SmPC goes to 900 mg. <sup class="c" data-ref="FDA-Zyloprim,SmPC-Allopurinol-UK" title="Source 129,370">129,370</sup> For febuxostat the US label goes from 40 to 80 mg if urate is still ≥6 mg/dL after 2 weeks. <sup class="c" data-ref="FDA-Uloric" title="Source 127">127</sup> The label says urate usually normalises "in 1 to 3 weeks" after a change. <sup class="c" data-ref="FDA-Zyloprim" title="Source 129">129</sup>',
  pt:'Every few weeks: a blood test, and if the number is still too high, a slightly bigger dose.',
  hook:'Allopurinol 300 mg reached &lt;6 mg/dL in only 21–53% of people across trials, so most need more. <sup class="c" data-ref="Becker2005,Schumacher2008,Becker2010,PerezRuiz1998" title="Source 18,19,311,357">18,19,311,357</sup>'},
 {from:.19,at:.24,k:'Months 0–6',t:'Why flares rise, and prophylaxis',
  txt:'The allopurinol label puts early flares down to "mobilization of urates from tissue deposits". <sup class="c" data-ref="FDA-Zyloprim" title="Source 129">129</sup> They are expected and do not mean the drug is failing. <sup class="c" data-ref="FDA-Uloric" title="Source 127">127</sup> In Borstad 2004 (43 people starting allopurinol), colchicine 0.6 mg twice daily cut flares to 0.57 against 1.91 on placebo in months 0–3, and to 0 against 1.05 in months 3–6. <sup class="c" data-ref="Borstad2004" title="Source 26">26</sup> ACR 2020 strongly recommends 3–6 months of prophylaxis with colchicine, an NSAID or a glucocorticoid, rather than less than 3 months. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  pt:'Extra flares early on mean the crystals are loosening. A small daily dose of colchicine covers this stretch.',
  hook:'Flares on starting are <b>not failure</b>: do not stop urate-lowering therapy during a flare. Give prophylaxis for <b>3–6 months</b>. <sup class="c" data-ref="FitzGerald2020,FDA-Uloric" title="Source 127,135">127,135</sup>'},
 {from:.33,at:.42,k:'Target reached',t:'Below 6, then monitor',
  txt:'ACR 2020 sets a target of &lt;6 mg/dL [360 µmol/L] for everyone on therapy (strong, high certainty). EULAR 2016 uses &lt;6 mg/dL, or &lt;5 mg/dL [300 µmol/L] in severe gout. <sup class="c" data-ref="FitzGerald2020,Richette2017" title="Source 135,331">135,331</sup> Once at target, the 2012 ACR guideline checked urate every 6 months, partly as a check on adherence. <sup class="c" data-ref="Khanna2012P1" title="Source 202">202</sup> In the nurse-led arm of Doherty 2018, mean urate fell from 443 to 251 µmol/L on a mean allopurinol dose of 460 mg/day. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'Once the number is below 6, the blood test drops back to about twice a year, and the crystals keep dissolving slowly.',
  hook:'Target: <b>&lt;6 mg/dL</b> [360 µmol/L] for all; EULAR <b>&lt;5 mg/dL</b> [300 µmol/L] in severe gout. <sup class="c" data-ref="FitzGerald2020,Richette2017" title="Source 135,331">135,331</sup>'},
 {from:.7,at:.95,k:'Years',t:'Stay on it',
  txt:'In Doherty 2018 the nurse-led group had more people with ≥2 flares in year 1 (54% vs 40%) but far fewer in year 2 (8% vs 24%), and tophi fell to 2.9% against 11.3%. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup> ACR 2020 conditionally recommends continuing therapy indefinitely (very low certainty); in the withdrawal series it cites, only 13% stayed flare-free over 5 years off treatment. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  pt:'Flares become rare in the second year. Treatment usually continues for life, because people who stop often get flares again.',
  hook:'Nurse-led treat-to-target: <b>95% vs 30%</b> at &lt;6 mg/dL at 2 years. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>'}
];
const TT_DOH={
 target:{n:'serum urate &lt;6 mg/dL [360 µmol/L]',a:[22,95,95],b:[21,26,30],mx:100,
  txt:'At 1 year 94.75% vs 26.22% were below 360 µmol/L (RR 3.59); at 2 years 95% vs 30% (RR 3.18, 95% CI 2.42–4.18). Below 300 µmol/L [5 mg/dL] at 2 years: 88% vs 17%. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'With regular nurse visits and a dose raised step by step, almost everyone reached the number. With usual care, fewer than a third did.'},
 flares:{n:'≥2 flares in the past year',a:[80,54,8],b:[80,40,24],mx:100,
  txt:'Year 1 was worse with nurse-led care (54% vs 40%, RR 1.36), as crystals mobilised. Year 2 was much better (8% vs 24%, RR 0.33). Four or more flares went 28% → 1% vs 21% → 12%. Only 3 nurse-led patients chose colchicine prophylaxis. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'Lowering urate briefly brings more flares, then far fewer. The second year is the payoff.'},
 tophi:{n:'tophi present',a:[13.7,7.1,2.9],b:[8.8,10.2,11.3],mx:20,
  txt:'Tophi fell from 13.7% to 2.9% with nurse-led care and rose from 8.8% to 11.3% with usual care (year-2 RR 0.21). The largest tophus shrank from 16.89 to 3.29 mm against 20.09 to 13.61 mm. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'Lumps of crystal under the skin shrink and disappear when urate stays low long enough.'}
};
const TT_DAYS=730,TT_BASE=9.0,TT_TAU=40;
function ttDrop(drug,D){if(drug==='febu')return D>=80?3.9:D>=40?2.8:0;return D<=300?D/100:3+0.55*(D-300)/100}
function ttSim(cfg,M){
  const R=rng(Math.round(cfg.adh*1000)+7),FR=rng(4242),out={su:[],dose:[],h:[],checks:[],flares:[],first:null,max:cfg.drug==='febu'?80:800};
  let dose=cfg.drug==='febu'?40:(cfg.ckd?50:100),E=0,SU=TT_BASE,S30=TT_BASE,tat=0,nc=cfg.drug==='febu'?14:28,reached=false,mobInt=0,bgInt=0,lastF=-99;
  const step=cfg.drug==='febu'?28:28;
  for(let d=0;d<=TT_DAYS;d++){
    const taken=R()<cfg.adh;E+=((taken?ttDrop(cfg.drug,dose):0)-E)*.45;SU+=(TT_BASE-E-SU)/6;S30+=(SU-S30)/30;
    if(d===nc){const v=Math.round(SU*10)/10;let act;
      if(v>=6){if(dose<out.max){dose=cfg.drug==='febu'?80:(cfg.ckd&&dose<100?100:dose+100);dose=Math.min(dose,out.max);act='up';nc=d+step}else{act='max';nc=d+56}}
      else{if(!reached){reached=true;out.first=d}act='ok';nc=d+182}
      out.checks.push({d,v,act,dose})}
    out.su.push(SU);out.dose.push(dose);
    const fall=clamp((TT_BASE-S30)/3,0,1.3),mob=fall*Math.exp(-d/TT_TAU);
    tat=SU<6?tat+1:Math.max(0,tat-.5);const bg=2/365*Math.exp(-tat/240);
    const pf=cfg.proph?(d<91?.30:d<182?.03:1):1;
    if(d<91){mobInt+=mob;bgInt+=bg}
    const h=((M||0)*mob+bg)*pf;out.h.push(h);
    if(FR()<h&&d-lastF>10){out.flares.push(d);lastF=d}
  }
  out.mobInt=mobInt;out.bgInt=bgInt;return out;
}
inits.t2t=()=>{
  const svg=$('#ttSvg'),rg=$('#ttT');const cfg={drug:'allo',adh:1,ckd:false,proph:true};
  /* calibrate the mobilisation term so the default, unprotected case gives Borstad's 1.91 flares in months 0–3 */
  const cal=ttSim({drug:'allo',adh:1,ckd:false,proph:false},0),TT_M=(1.91-cal.bgInt)/cal.mobInt;
  const cache={};const get=c=>{const k=JSON.stringify(c);return cache[k]||(cache[k]=ttSim(c,TT_M))};
  const sum=(a,i,j)=>{let s=0;for(let k=i;k<j&&k<a.length;k++)s+=a[k];return s};
  function draw(t){
    const N=vb(svg,'720 480','400 500');
    const X0=N?40:64,X1=N?388:704,xd=d=>lerp(X0,X1,d/TT_DAYS);
    const yS0=N?36:34,yS1=N?170:170,yD0=N?204:204,yD1=N?256:262,yP=N?276:284,yF0=N?310:318,yF1=N?396:410,axY=N?414:430;
    const S=get(cfg),C={...cfg,proph:!cfg.proph},G=get(C),dNow=Math.round(t*TT_DAYS);
    const ys=v=>lerp(yS1,yS0,(clamp(v,2,10)-2)/8),mxD=cfg.drug==='febu'?100:900,ydz=v=>lerp(yD1,yD0,v/mxD),FM=1.1,yf=v=>lerp(yF1,yF0,clamp(v/FM));
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    // month grid
    (N?[0,6,12,18,24]:[0,3,6,9,12,15,18,21,24]).forEach(m=>{const x=xd(m*30.42);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${yS0-6}" y2="${yF1}" class="grid"/><text x="${f1(x)}" y="${axY}" class="t-xs t-mid">${m}</text>`});
    s+=`<text x="${X1}" y="${axY+16}" class="t-xs t-end">months since starting</text><text x="${X0-(N?34:58)}" y="${axY+16}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one simulated person</text>`;
    // urate lane
    s+=`<text x="${X0}" y="${yS0-12}" class="t-sm" style="fill:var(--gold)">SERUM URATE, mg/dL</text>`;
    s+=`<rect x="${X0}" y="${f1(ys(6))}" width="${X1-X0}" height="${f1(ys(2)-ys(6))}" style="fill:var(--sea-soft);opacity:.75"/>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ys(6))}" y2="${f1(ys(6))}" style="stroke:var(--sea);stroke-width:1.6"/><text x="${X1-4}" y="${f1(ys(6)-4)}" class="t-xs t-end" style="fill:var(--sea)">target &lt;6 (ACR, EULAR)</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ys(5))}" y2="${f1(ys(5))}" style="stroke:var(--sea);stroke-width:1;stroke-dasharray:5 4"/><text x="${X1-4}" y="${f1(ys(5)+11)}" class="t-xs t-end" style="fill:var(--sea)">&lt;5 severe gout (EULAR)</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ys(3))}" y2="${f1(ys(3))}" style="stroke:var(--warn);stroke-width:1;stroke-dasharray:2 4"/><text x="${X1-4}" y="${f1(ys(3)-3)}" class="t-xs t-end" style="fill:var(--warn)">EULAR: not &lt;3 long term · unverified</text>`;
    [2,4,6,8,10].forEach(v=>s+=`<text x="${X0-6}" y="${f1(ys(v)+3)}" class="t-xs t-end">${v}</text>`);
    let p='';for(let d=0;d<=dNow;d+=2)p+=(d?'L':'M')+f1(xd(d))+' '+f1(ys(S.su[d]));s+=`<path d="${p}" style="fill:none;stroke:var(--gold);stroke-width:2.4;stroke-linejoin:round"/>`;
    S.checks.filter(c=>c.d<=dNow).forEach((c,i,arr)=>{const x=xd(c.d),y=ys(c.v),ok=c.v<6;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.2" style="fill:${ok?'var(--sea)':'var(--panel)'};stroke:var(--sea);stroke-width:1.8"/>`;
      if(!N)s+=`<text x="${f1(x)}" y="${f1(y-8)}" class="t-xs t-mid" style="fill:var(--ink)">${f1(c.v)}</text>`});
    s+=`<circle cx="${f1(xd(dNow))}" cy="${f1(ys(S.su[dNow]))}" r="3.4" style="fill:var(--gold)"/>`;
    // HLA gate
    if(cfg.drug==='allo'){const gx=N?X0+150:X0+170,gy=yS0-26,on=dNow<30;s+=`<g style="opacity:${on?1:.55}"><rect x="${gx}" y="${gy}" width="${N?132:150}" height="20" rx="6" style="fill:var(--panel);stroke:var(--warn);stroke-width:${on?1.8:1.2}"/><text x="${gx+8}" y="${gy+14}" class="t-xs" style="fill:var(--warn);font-weight:700">HLA-B*58:01 test first?</text></g>`}
    // dose lane
    s+=`<text x="${X0}" y="${yD0-8}" class="t-sm" style="fill:var(--sea)">${cfg.drug==='febu'?'FEBUXOSTAT':'ALLOPURINOL'} DOSE, mg/day</text><line x1="${X0}" x2="${X1}" y1="${yD1}" y2="${yD1}" class="axis"/>`;
    const mx=S.max;s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ydz(mx))}" y2="${f1(ydz(mx))}" style="stroke:var(--muted);stroke-dasharray:4 4"/><text x="${X1-4}" y="${f1(ydz(mx)-3)}" class="t-xs t-end">${cfg.drug==='febu'?'US maximum 80':'US maximum 800 · UK 900'}</text>`;
    let dp=`M${X0} ${f1(ydz(S.dose[0]))}`;for(let d=1;d<=dNow;d++){if(S.dose[d]!==S.dose[d-1])dp+=`H${f1(xd(d))}V${f1(ydz(S.dose[d]))}`}dp+=`H${f1(xd(dNow))}`;
    s+=`<path d="${dp}" style="fill:none;stroke:var(--sea);stroke-width:2.6"/><text x="${f1(Math.min(xd(dNow)+5,X1-30))}" y="${f1(ydz(S.dose[dNow])-5)}" class="t-xs" style="fill:var(--sea);font-weight:700">${S.dose[dNow]}</text>`;
    // prophylaxis
    if(cfg.proph){const e=Math.min(dNow,182);if(e>0)s+=`<rect x="${X0}" y="${yP-6}" width="${f1(xd(e)-X0)}" height="11" rx="5" style="fill:var(--crocus);opacity:.75"/>`;
      s+=`<text x="${f1(xd(182)+6)}" y="${yP+3}" class="t-xs" style="fill:var(--crocus)">${N?'prophylaxis 6 mo':'colchicine prophylaxis, 6 months'}</text>`}
    else s+=`<text x="${X0}" y="${yP+3}" class="t-xs" style="fill:var(--crocus)">no prophylaxis</text>`;
    // flare lane
    s+=`<text x="${X0}" y="${yF0-8}" class="t-sm" style="fill:var(--terra)">${N?'FLARES / MONTH':'FLARE RATE, per month · ▲ flares'}</text><line x1="${X0}" x2="${X1}" y1="${yF1}" y2="${yF1}" class="axis"/>`;
    [0,.5,1].forEach(v=>s+=`<text x="${X0-6}" y="${f1(yf(v)+3)}" class="t-xs t-end">${v}</text>`);
    let gp='';for(let d=0;d<=TT_DAYS;d+=4)gp+=(d?'L':'M')+f1(xd(d))+' '+f1(yf(G.h[d]*30.42));s+=`<path d="${gp}" style="fill:none;stroke:var(--muted);stroke-width:1.3;stroke-dasharray:4 4"/>`;
    let hp='';for(let d=0;d<=dNow;d+=2)hp+=(d?'L':'M')+f1(xd(d))+' '+f1(yf(S.h[d]*30.42));s+=`<path d="${hp}" style="fill:none;stroke:var(--terra);stroke-width:2.4"/>`;
    // Borstad 2004 averages, per month
    const bs=(a,b,v,c,l,dy)=>{const y=yf(v/3);return `<line x1="${f1(xd(a))}" x2="${f1(xd(b))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c};stroke-width:3.4;opacity:.85"/><line x1="${f1(xd(a))}" x2="${f1(xd(a))}" y1="${f1(y-5)}" y2="${f1(y+5)}" style="stroke:${c};stroke-width:1.4"/><line x1="${f1(xd(b))}" x2="${f1(xd(b))}" y1="${f1(y-5)}" y2="${f1(y+5)}" style="stroke:${c};stroke-width:1.4"/>`+(l?`<text x="${f1(xd(b)+4)}" y="${f1(y+dy)}" class="t-xs" style="fill:${c}">${l}</text>`:'')};
    s+=bs(0,91,1.91,'var(--terra)','',0)+bs(91,182,1.05,'var(--terra)','',0)+bs(0,91,.57,'var(--crocus)','',0)+bs(91,182,0.012,'var(--crocus)','',0);
    s+=`<text x="${X1}" y="${yF0-8}" class="t-xs t-end">${N?'':'bracketed bars: '}Borstad 2004 averages · <tspan style="fill:var(--terra)">placebo</tspan> · <tspan style="fill:var(--crocus)">colchicine</tspan></text>`;
    S.flares.filter(d=>d<=dNow).forEach(d=>{const x=xd(d);s+=`<path d="M${f1(x-4)} ${yF1} L${f1(x)} ${yF1-11} L${f1(x+4)} ${yF1}z" style="fill:var(--terra)"/>`});
    s+=`<line x1="${f1(xd(dNow))}" x2="${f1(xd(dNow))}" y1="${yS0-6}" y2="${yF1+2}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/>`;
    s+=`<text x="${X1}" y="${axY+30}" class="t-xs t-end">dashed: same person ${cfg.proph?'without':'with'} prophylaxis</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(TT_STEPS,t);setSt(ph);
    const fl=S.flares.filter(d=>d<=dNow).length,e03=sum(S.h,0,91),e36=sum(S.h,91,182);
    $('#ttRead').innerHTML=`<span>month <b>${(dNow/30.42).toFixed(1)}</b></span><span>dose <b>${S.dose[dNow]} mg/day</b></span><span>serum urate <b>${f1(S.su[dNow])} mg/dL</b> [${Math.round(S.su[dNow]*59.5)} µmol/L]</span><span>first at target <b>${S.first==null?'not reached':'month '+(S.first/30.42).toFixed(1)}</b></span><span>flares so far <b>${fl}</b></span><span>model, months 0–3 / 3–6 <b>${e03.toFixed(2)} / ${e36.toFixed(2)}</b> (Borstad: ${cfg.proph?'0.57 / 0 on colchicine':'1.91 / 1.05 on placebo'})</span>`;
    let x='';
    if(cfg.drug==='febu')x+=`<p><b>Febuxostat.</b> The US label starts at 40 mg and moves to 80 mg if urate is still ≥6 mg/dL after 2 weeks; the EU SmPC starts at 80 mg. <sup class="c" data-ref="FDA-Uloric,EMA-Adenuric" title="Source 107,127">107,127</sup> Since 2019 the US label limits it to people for whom allopurinol has failed or is not advisable. <sup class="c" data-ref="FDA-Uloric" title="Source 127">127</sup> No HLA-B*58:01 test is needed for febuxostat; the gate is an allopurinol step.</p>`;
    if(cfg.ckd)x+=`<p><b>CKD stage 3.</b> ACR 2020 starts lower in CKD and says ≤50 mg/day "should be considered". <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> Stamp 2012 proposed a starting dose of ≤1.5 mg per mL/min of eGFR; at an eGFR of 30 that arithmetic gives 45 mg. <sup class="c" data-ref="Stamp2012" title="Source 379">379</sup> Escalating above the creatinine-clearance dose reached target and was well tolerated, including in renal impairment. <sup class="c" data-ref="Stamp2011,Stamp2017RCT" title="Source 378,382">378,382</sup> The simulator starts at 50 mg${cfg.drug==='febu'?' for allopurinol only':''}, then uses the usual 100 mg steps, a simplification.</p>`;
    if(cfg.adh<1)x+=`<p><b>${Math.round(cfg.adh*100)}% of tablets taken.</b> Missed doses blunt the fall, so the dose keeps climbing${cfg.adh<.5?' to the ceiling while urate stays above target':''}. In a meta-analysis only 46% took ≥80% of their therapy. <sup class="c" data-ref="Scheepers2018SAR" title="Source 352">352</sup> Regular urate checks are partly a check on adherence. <sup class="c" data-ref="Khanna2012P1" title="Source 202">202</sup> In Doherty 2018, 95% were still taking it at 2 years with nurse-led care. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup></p>`;
    if(!cfg.proph)x+=`<p><b>No prophylaxis.</b> Pooled febuxostat trials saw flares rise to as much as 40% when 8 weeks of prophylaxis stopped, against 3–5% after 6 months of it. <sup class="c" data-ref="Wortmann2010" title="Source 433">433</sup> A slower start also lowers flares: a lower starting dose of any urate-lowering drug reduces flares at initiation. <sup class="c" data-ref="FitzGerald2020,Yamanaka2018" title="Source 135,439">135,439</sup></p>`;
    $('#ttNote').innerHTML=noteHTML(TT_STEPS[ph])+(x?`<div class="tt-x"><div class="kicker">This scenario</div>${x}</div>`:'');
  }
  const stop=playWire(rg,$('#ttPlay'),draw,24000,'Replay','t2t');
  const setSt=stepWire($('#ttSteps'),TT_STEPS,rg,draw,stop);
  $$('[data-ttd]').forEach(b=>b.onclick=()=>{cfg.drug=b.dataset.ttd;$$('[data-ttd]').forEach(q=>q.setAttribute('aria-pressed',q===b));draw(+rg.value)});
  $$('[data-tta]').forEach(b=>b.onclick=()=>{cfg.adh=+b.dataset.tta;$$('[data-tta]').forEach(q=>q.setAttribute('aria-pressed',q===b));draw(+rg.value)});
  $('#ttCkd').onclick=e=>{cfg.ckd=!cfg.ckd;e.currentTarget.setAttribute('aria-pressed',cfg.ckd);draw(+rg.value)};
  $('#ttPro').onclick=e=>{cfg.proph=!cfg.proph;e.currentTarget.setAttribute('aria-pressed',cfg.proph);draw(+rg.value)};
  draw(+rg.value);

  /* Doherty 2018: real points at 0, 12 and 24 months */
  const ds=$('#ttDoh');let met='target',stopD=null;
  function drawD(k){
    const N=vb(ds,'720 300','400 320'),M=TT_DOH[met];
    const X0=N?52:90,X1=N?330:520,Y0=34,Y1=N?250:240,xm=m=>lerp(X0,X1,m/24),yv=v=>lerp(Y1,Y0,v/M.mx);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${X0}" y="20" class="t-sm" style="fill:var(--sea)">% with ${M.n}</text>`;
    for(let i=0;i<=4;i++){const v=M.mx*i/4,y=yv(v);s+=`<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${X0-8}" y="${f1(y+3)}" class="t-xs t-end">${Math.round(v)}%</text>`}
    [0,12,24].forEach(m=>s+=`<text x="${f1(xm(m))}" y="${Y1+18}" class="t-xs t-mid">${m===0?'baseline':m===12?'1 year':'2 years'}</text>`);
    const ser=(arr,c,lbl,dash)=>{let d='';const n=k*2;arr.forEach((v,i)=>{if(i>0&&i-1>=n)return;if(i===0)d+=`M${f1(xm(0))} ${f1(yv(v))}`;else{const px=lerp(xm((i-1)*12),xm(i*12),Math.min(1,n-(i-1))),py=lerp(yv(arr[i-1]),yv(v),Math.min(1,n-(i-1)));d+=`L${f1(px)} ${f1(py)}`}});
      let o=`<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.6;${dash?'stroke-dasharray:6 5':''}"/>`;
      arr.forEach((v,i)=>{if(i<=n+1e-6){o+=`<circle cx="${f1(xm(i*12))}" cy="${f1(yv(v))}" r="5" style="fill:${c}"/><text x="${f1(xm(i*12)+(i===2?10:0))}" y="${f1(yv(v)+(i===2?4:dash?17:-10))}" class="t-xs ${i===2?'':'t-mid'}" style="fill:${c};font-weight:700">${v}%</text>`}});
      if(k>=1)o+=`<text x="${f1(xm(24)+(N?10:46))}" y="${f1(yv(arr[2])+4)}" class="t-xs" style="fill:${c}">${N?'':lbl}</text>`;return o};
    s+=ser(M.b,'var(--muted)','usual care',true)+ser(M.a,'var(--sea)','nurse-led',false);
    const lx=N?X0:560,ly=N?Y1+40:80;
    s+=`<line x1="${lx}" x2="${lx+22}" y1="${ly}" y2="${ly}" style="stroke:var(--sea);stroke-width:2.6"/><text x="${lx+28}" y="${ly+4}" class="t-xs" style="fill:var(--ink)">nurse-led (n = 255)</text>`;
    s+=`<line x1="${lx+(N?170:0)}" x2="${lx+(N?192:22)}" y1="${ly+(N?0:20)}" y2="${ly+(N?0:20)}" style="stroke:var(--muted);stroke-width:2.6;stroke-dasharray:6 5"/><text x="${lx+(N?198:28)}" y="${ly+(N?4:24)}" class="t-xs" style="fill:var(--ink)">usual care (n = 262)</text>`;
    if(!N)s+=`<text x="560" y="${130}" class="t-xs">Doherty 2018</text><text x="560" y="144" class="t-xs">real data points</text>`;
    ds.innerHTML=s;
    $('#ttDohNote').innerHTML=`<div class="kicker">Doherty 2018 · Nottingham, 56 practices</div><h4>${met==='target'?'Nearly everyone reached target':met==='flares'?'More flares first, then far fewer':'Tophi melt away'}</h4><p>${M.txt}</p><div class="pt"><b>In plain words</b>${M.pt}</div><div class="hook"><b>Exam hook</b>Nurse-led care used allopurinol at a mean 460 vs 230 mg/day, with 79–80% above 300 mg/day; it cost £5066 per QALY. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup></div>`;
  }
  $$('[data-dh]').forEach(b=>b.onclick=()=>{met=b.dataset.dh;$$('[data-dh]').forEach(q=>q.setAttribute('aria-pressed',q===b));if(stopD)stopD();stopD=animate(900,drawD,()=>{stopD=null})});
  onHide.t2t=(f=>()=>{f&&f();if(stopD)stopD()})(onHide.t2t);
  redraws.t2t=(f=>()=>{f&&f();drawD(1)})(redraws.t2t);
  drawD(1);
};
/* =============== 3.3 safety of urate-lowering drugs =============== */
const US_GRP={
 all:{n:'All starters',p:null,
  txt:'In 400,401 new allopurinol users in US Medicaid, 1 in 1972 was hospitalised with a severe cutaneous adverse reaction; the mean stay was 9.6 days and 21% (43/203) died. <sup class="c" data-ref="Keller2018" title="Source 200">200</sup> About 90% of hypersensitivity reactions begin within 60 days of starting. <sup class="c" data-ref="Ramasamy2013" title="Source 326">326</sup> Pick a group to see how common the HLA-B*58:01 allele is.',
  pt:'Out of about two thousand people who start allopurinol, one ends up in hospital with a severe skin reaction.'},
 ea:{n:'Han Chinese, Korean, Thai',p:.074,src:'ACR 2020',
  txt:'ACR 2020 quotes an HLA-B*58:01 prevalence of 7.4% in Han Chinese, Korean and Thai people and conditionally recommends testing before allopurinol in people of Southeast Asian descent. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> Asian people had about 3 times the risk of white or Hispanic people in US Medicaid (RR 3.03). <sup class="c" data-ref="Keller2018" title="Source 200">200</sup>',
  pt:'In this group, about 1 person in 14 carries the gene variant, and testing first is advised.'},
 aa:{n:'African American',p:.038,src:'ACR 2020',
  txt:'ACR 2020 quotes 3.8% in African Americans and conditionally recommends testing before allopurinol. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> Black people had RR 3.00 in US Medicaid. <sup class="c" data-ref="Keller2018" title="Source 200">200</sup> CPIC\'s allele frequency for African American and Afro-Caribbean people is also 3.8%. <sup class="c" data-ref="CPIC-HLAB-Allopurinol" title="Source 64">64</sup>',
  pt:'About 1 person in 26 carries the variant, and testing first is advised.'},
 wh:{n:'White and Hispanic',p:.007,src:'ACR 2020',
  txt:'ACR 2020 quotes 0.7% in white and Hispanic people and conditionally recommends against universal testing outside the groups it names. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> CPIC gives an allele frequency of 0.77% in Europeans and 1.4% in Latinos. <sup class="c" data-ref="CPIC-HLAB-Allopurinol" title="Source 64">64</sup>',
  pt:'The variant is rare here, so routine testing is not advised; starting low and watching for a rash still apply.'},
 tw:{n:'Taiwan allopurinol candidates',p:.196,src:'Ko 2015',
  txt:'In Taiwan, 19.6% (571/2910) of Han Chinese allopurinol candidates tested positive. Carriers were given alternatives, and 2339 non-carriers took allopurinol: none developed a severe reaction, against 7 expected from the historical rate (P = 0.0026). Mild rash still occurred in 3%. <sup class="c" data-ref="Ko2015" title="Source 214">214</sup>',
  pt:'Testing everyone first and steering carriers to another drug stopped the severe reactions in this study.'}
};
const US_TRV={
 rates:{t:'Event rates, febuxostat vs allopurinol',
  rows:[['CARES · cardiovascular death',1.5,1.1,'HR 1.34'],['CARES · all-cause death',2.6,2.2,'HR 1.22'],['FAST · primary endpoint (on treatment)',1.72,2.05,'HR 0.85']],mx:3,unit:' per 100 PY',
  txt:'From the US label\'s account of CARES: cardiovascular deaths 134 (1.5 per 100 patient-years) on febuxostat vs 100 (1.1), sudden cardiac death 83 (2.7%) vs 56 (1.8%), all-cause deaths 243 (2.6 per 100 PY) vs 199 (2.2). <sup class="c" data-ref="FDA-Uloric" title="Source 127">127</sup> FAST\'s on-treatment primary endpoint: 1.72 vs 2.05 events per 100 patient-years. <sup class="c" data-ref="Mackenzie2020" title="Source 241">241</sup>',
  pt:'In CARES, a few more people died on febuxostat. In FAST, slightly fewer did. The two trials point different ways.'},
 hr:{t:'Hazard ratios, febuxostat vs allopurinol',
  rows:[['CARES · major CV events',1.03,null,1.23],['CARES · cardiovascular death',1.34,1.03,1.73],['CARES · all-cause death',1.22,1.01,1.47],['FAST · primary endpoint',.85,.70,1.03]],
  txt:'CARES was non-inferior for its primary endpoint (HR 1.03; upper bound of the one-sided 98.5% CI 1.23, under the 1.3 margin), yet cardiovascular death (HR 1.34, 95% CI 1.03–1.73) and all-cause death (HR 1.22, 1.01–1.47) were higher. <sup class="c" data-ref="White2018" title="Source 431">431</sup> FAST was non-inferior: adjusted HR 0.85 (0.70–1.03). <sup class="c" data-ref="Mackenzie2020" title="Source 241">241</sup>',
  pt:'Right of the line means more events on febuxostat. CARES\'s death results sit just right of it; FAST sits left.'},
 fu:{t:'Stopping the drug and losing follow-up',
  rows:[['CARES · stopped trial drug (both arms)',56.6,null],['CARES · stopped follow-up (both arms)',45.0,null],['FAST · stopped randomised drug',32.4,16.5],['FAST · lost from all follow-up',6.2,5.5]],mx:70,unit:'%',
  txt:'In CARES, 56.6% stopped the trial drug and 45.0% stopped follow-up. <sup class="c" data-ref="White2018" title="Source 431">431</sup> In FAST, the randomised drug was stopped by 32.4% on febuxostat vs 16.5% on allopurinol, but only 6.2% vs 5.5% were lost from all follow-up. <sup class="c" data-ref="Mackenzie2020" title="Source 241">241</sup> FAST was open label and enrolled people already tolerating allopurinol. <sup class="c" data-ref="Mackenzie2020" title="Source 241">241</sup>',
  pt:'Nearly half of CARES dropped out of follow-up, which makes its death figures harder to trust; FAST kept almost everyone.'}
};
inits.ultsafety=()=>{
  /* ---- the icon grid ---- */
  const gs=$('#usGrid');let grp='all',scr=false,stopG=null;
  const R=rng(58),PERM=Array.from({length:1972},(_,i)=>i);for(let i=PERM.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[PERM[i],PERM[j]]=[PERM[j],PERM[i]]}
  function wrapT(txt,n){const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o}
  function drawG(k){
    const N=vb(gs,'720 320','400 640'),G=US_GRP[grp];
    const cols=N?44:58,sp=N?8.4:7.6,ox=N?17:20,oy=N?44:40;
    const cnt=G.p==null?0:Math.round(1972*G.p),shown=Math.round(cnt*k),car=new Set(PERM.slice(0,shown)),cs=PERM[0];
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${ox-4}" y="22" class="t-sm" style="fill:var(--bad)">1972 PEOPLE STARTING ALLOPURINOL</text><text x="${ox-4}" y="34" class="t-xs">${G.n}${G.p!=null?' · '+(G.p*100).toFixed(1)+'% carriers ('+G.src+')':''}</text>`;
    for(let i=0;i<1972;i++){if(i===cs)continue;const x=ox+(i%cols)*sp,y=oy+Math.floor(i/cols)*sp;
      if(car.has(i))s+=scr?`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.5" style="fill:none;stroke:var(--sea);stroke-width:1.2"/>`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.8" style="fill:var(--warn)"/>`;
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.3" style="fill:var(--muted);opacity:.32"/>`}
    const cx=ox+(cs%cols)*sp,cy=oy+Math.floor(cs/cols)*sp,prevented=scr&&G.p!=null;
    s+=prevented?`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="7" style="fill:none;stroke:var(--sea);stroke-width:1.6;stroke-dasharray:3 2"/>`:`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="4.6" style="fill:var(--bad)"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="9" style="fill:none;stroke:var(--bad);stroke-width:1.4"/>`;
    // side or bottom panel
    const px=N?16:484;let py=N?oy+Math.ceil(1972/cols)*sp+20:56;
    const line=(t,c,cl='t-xs')=>{s+=`<text x="${px}" y="${f1(py)}" class="${cl}" style="fill:${c||'var(--ink)'}">${t}</text>`;py+=cl==='t-big'?22:15};
    line('1 in 1972','var(--bad)','t-big');
    wrapT('hospitalised with a severe skin reaction in US Medicaid; 21% of them died',N?58:36).forEach(l=>line(l));py+=6;
    const leg=(c,hol,t)=>{s+=hol?`<circle cx="${px+5}" cy="${f1(py-4)}" r="4" style="fill:none;stroke:${c};stroke-width:1.4"/>`:`<circle cx="${px+5}" cy="${f1(py-4)}" r="4" style="fill:${c}"/>`;s+=`<text x="${px+16}" y="${f1(py)}" class="t-xs" style="fill:var(--ink)">${t}</text>`;py+=16};
    leg(prevented?'var(--sea)':'var(--bad)',prevented,prevented?'the one case, schematically avoided':'the one hospitalised case');
    if(G.p!=null)leg(scr?'var(--sea)':'var(--warn)',scr,scr?'carrier, offered another drug':'HLA-B*58:01 carrier');
    leg('var(--muted)',false,'everyone else');py+=6;
    if(G.p!=null)line(`${cnt} carriers in 1972 people`,'var(--warn)','t-sm');
    if(scr&&G.p!=null){py+=4;wrapT('Taiwan, testing first: 0 severe reactions in 2339 non-carriers, against 7 expected (Ko 2015)',N?58:36).forEach(l=>line(l,'var(--sea)'))}
    else if(scr){py+=4;wrapT('Pick a group: testing only changes the picture once carriers are known',N?58:36).forEach(l=>line(l,'var(--muted)'))}
    else{py+=4;wrapT('About 90% of reactions begin within 60 days of starting (literature series)',N?58:36).forEach(l=>line(l,'var(--muted)'))}
    if(N)gs.setAttribute('viewBox','0 0 400 '+Math.round(py+10));
    gs.innerHTML=s;
    let x='';if(scr)x=`<div class="kv"><div><dt>Testing first</dt><dd>${G.p==null?'Testing only helps where carriers can be identified. ':''}CPIC: carriers should not take allopurinol (strong). <sup class="c" data-ref="CPIC-HLAB-Allopurinol,Hershfield2013" title="Source 64,161">64,161</sup> In Taiwan, screening and steering carriers to alternatives prevented every expected severe reaction (0 vs 7). <sup class="c" data-ref="Ko2015" title="Source 214">214</sup> The test is not perfect at predicting harm: in Thailand, a positive result carried a 1.52% positive predictive value, while a negative one was 100% reassuring for SJS/TEN. <sup class="c" data-ref="Tassaneeyakul2009" title="Source 398">398</sup></dd></div></div>`;
    $('#usGridNote').innerHTML=`<div class="kicker">Allopurinol hypersensitivity · ${G.n}</div><h4>${G.p==null?'Rare, early and serious':scr?'Testing first removes the carriers':'How common is HLA-B*58:01?'}</h4><p>${G.txt}</p>${x}<div class="pt"><b>In plain words</b>${G.pt}</div><div class="hook"><b>Exam hook</b>Onset typically in the <b>first 8 weeks</b>; risk factors <b>HLA-B*58:01, CKD, high starting dose</b>. <sup class="c" data-ref="Halevy2008,Ramasamy2013,Keller2018,Stamp2012" title="Source 152,200,326,379">152,200,326,379</sup></div>`;
  }
  const runG=()=>drawG(1);
  $$('[data-usa]').forEach(b=>b.onclick=()=>{grp=b.dataset.usa;$$('[data-usa]').forEach(q=>q.setAttribute('aria-pressed',q===b));runG()});
  $('#usScr').onclick=e=>{scr=!scr;e.currentTarget.setAttribute('aria-pressed',scr);drawG(1)};
  drawG(1);

  /* ---- starting-dose rule ---- */
  const ds=$('#usDose'),er=$('#usE');
  function drawD(){
    const N=vb(ds,'720 200','400 206'),e=+er.value,lim=1.5*e;$('#usEOut').textContent=e;
    const X0=N?20:40,X1=N?380:690,xm=v=>lerp(X0,X1,clamp(v/400)),by=N?92:84;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${X0}" y="22" class="t-sm" style="fill:var(--sea)">STARTING DOSE, mg/day</text><text x="${X0}" y="38" class="t-xs">Stamp 2012 limit: 1.5 × eGFR ${e} = ${Math.round(lim)} mg/day</text>`;
    s+=`<rect x="${X0}" y="${by}" width="${X1-X0}" height="22" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${X0}" y="${by}" width="${f1(xm(lim)-X0)}" height="22" rx="6" style="fill:var(--sea);opacity:.85"/>`;
    s+=`<text x="${f1(Math.min(xm(lim)+6,X1-40))}" y="${by+15}" class="t-xs" style="fill:var(--ink);font-weight:700">≤${Math.round(lim)}</text>`;
    const mk=(v,c,l,up)=>{const x=xm(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${by-14}" y2="${by+36}" style="stroke:${c};stroke-width:1.6;stroke-dasharray:4 3"/><text x="${f1(x)}" y="${up?by-20:by+50}" class="t-xs t-mid" style="fill:${c}">${l}</text>`};
    mk(50,'var(--good)',N?'≤50 CKD':'ACR: ≤50 considered in CKD',true);mk(100,'var(--good)',N?'≤100':'ACR: ≤100',false);mk(200,'var(--bad)',N?'≥200':'EuroSCAR: ≥200, OR 36',true);
    [0,100,200,300,400].forEach(v=>s+=`<text x="${f1(xm(v))}" y="${by+(N?76:72)}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${X0}" y="${N?by+102:by+96}" class="t-xs" style="fill:var(--warn)">arithmetic of a published rule · not a dose for anyone</text>`;
    ds.innerHTML=s;
    $('#usDoseNote').innerHTML=`<div class="kicker">Stamp 2012 · 54 cases, 157 controls</div><h4>The rule at eGFR ${e}: 1.5 × ${e} = ${Math.round(lim)} mg</h4><p>91% of people with allopurinol hypersensitivity, against 36% of controls, had started at ≥1.5 mg per mL/min of eGFR; the highest quintile of starting dose per eGFR carried an odds ratio of 23.2. The authors proposed starting at ≤1.5 mg × eGFR, then escalating. <sup class="c" data-ref="Stamp2012" title="Source 379">379</sup> ACR 2020 starts at ≤100 mg/day and considers ≤50 mg/day in CKD. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> Starting above 100 mg/day carried 1.9-fold risk in US Medicaid. <sup class="c" data-ref="Keller2018" title="Source 200">200</sup></p><div class="pt"><b>In plain words</b>Starting with a small dose lowers the chance of the dangerous reaction. The dose can then go up slowly. <sup class="c" data-ref="Stamp2012,Stamp2011" title="Source 378,379">378,379</sup></div><div class="hook"><b>Exam hook</b>Low start, slow climb: escalating above the old creatinine-clearance dose reached target in 69% vs 32%. <sup class="c" data-ref="Stamp2017RCT" title="Source 382">382</sup></div>`;
  }
  er.addEventListener('input',drawD);drawD();
  redraws.ultsafety=()=>{drawG(1);drawD();drawT()};

  /* ---- CARES vs FAST ---- */
  const ts=$('#usTrials');let view='rates';
  function drawT(){
    const N=vb(ts,'720 340','400 430'),V=US_TRV[view];
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/><text x="16" y="24" class="t-sm" style="fill:var(--ink)">${V.t.toUpperCase()}</text>`;
    const L=N?16:250,X0=N?16:260,X1=N?384:690,rowH=N?(view==='hr'?84:92):(view==='hr'?64:66),top=N?54:52;
    if(view!=='hr')s+=`<g><rect x="${N?16:420}" y="34" width="10" height="10" style="fill:var(--warn)"/><text x="${N?30:434}" y="43" class="t-xs" style="fill:var(--ink)">febuxostat</text><rect x="${N?110:520}" y="34" width="10" height="10" style="fill:var(--sea)"/><text x="${N?124:534}" y="43" class="t-xs" style="fill:var(--ink)">allopurinol</text></g>`;
    if(view==='hr'){
      const XH=N?292:590,lg=v=>Math.log(v),xv=v=>lerp(X0,XH,(lg(v)-lg(.5))/(lg(2)-lg(.5)));
      const yb=top+V.rows.length*rowH;
      [.5,.7,1,1.3,2].forEach(v=>s+=`<line x1="${f1(xv(v))}" x2="${f1(xv(v))}" y1="${top}" y2="${yb}" style="stroke:var(--line);stroke-width:${v===1?1.8:1};${v===1.3?'stroke-dasharray:5 4;stroke:var(--warn)':''}"/><text x="${f1(xv(v))}" y="${yb+16}" class="t-xs t-mid">${v}</text>`);
      s+=`<text x="${f1(xv(1.3)+4)}" y="${top+10}" class="t-xs" style="fill:var(--warn)">CARES margin 1.3</text>`;
      s+=`<text x="${X0}" y="${yb+32}" class="t-xs">← fewer on febuxostat</text><text x="${XH}" y="${yb+32}" class="t-xs t-end">more on febuxostat →</text>`;
      V.rows.forEach((r,i)=>{const y=top+i*rowH+(N?44:rowH/2),c='var(--ink)';
        s+=`<text x="${N?16:L}" y="${f1(N?y-18:y+4)}" class="t-xs ${N?'':'t-end'}" style="fill:var(--ink)">${r[0]}</text>`;
        if(r[2]!=null)s+=`<line x1="${f1(xv(r[2]))}" x2="${f1(xv(r[3]))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c};stroke-width:2.4"/>`;
        else s+=`<line x1="${f1(xv(r[1]))}" x2="${f1(xv(r[3]))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c};stroke-width:2;stroke-dasharray:3 3"/>`;
        s+=`<rect x="${f1(xv(r[1])-6)}" y="${f1(y-6)}" width="12" height="12" style="fill:${c}"/><text x="${f1(xv(r[3])+6)}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);font-weight:700">${r[1].toFixed(2)}${r[2]!=null?' ('+r[2].toFixed(2)+'–'+r[3].toFixed(2)+')':' (upper '+r[3].toFixed(2)+')'}</text>`});
    }else{
      const xv=v=>lerp(X0,X1-40,v/V.mx);
      V.rows.forEach((r,i)=>{const y=top+i*rowH+(N?28:16);
        s+=`<text x="${N?16:L}" y="${f1(N?y-6:y+14)}" class="t-xs ${N?'':'t-end'}" style="fill:var(--ink)">${r[0]}</text>`;
        const bar=(v,c,yy,lbl)=>{s+=`<rect x="${X0}" y="${f1(yy)}" width="${f1(Math.max(2,xv(v)-X0))}" height="16" rx="4" style="fill:${c}"/><text x="${f1(xv(v)+6)}" y="${f1(yy+12)}" class="t-xs" style="fill:var(--ink);font-weight:700">${view==='fu'?v.toFixed(1):v}${V.unit}${lbl?' '+lbl:''}</text>`};
        if(r[2]==null)bar(r[1],'var(--muted)',y+2,'');else{bar(r[1],'var(--warn)',y,'');bar(r[2],'var(--sea)',y+20,r[3]?'· '+r[3]:'')}});
    }
    const H=Math.round(top+V.rows.length*rowH+(view==='hr'?44:14));ts.setAttribute('viewBox','0 0 '+(N?400:720)+' '+Math.max(N?300:260,H));
    ts.innerHTML=s;
    $('#usTrNote').innerHTML=`<div class="kicker">CARES 2018 · FAST 2020</div><h4>${V.t}</h4><p>${V.txt}</p><div class="pt"><b>In plain words</b>${V.pt}</div><div class="hook"><b>Exam hook</b>CARES: CV death <b>HR 1.34</b>, all-cause death <b>HR 1.22</b>, MACE non-inferior → FDA boxed warning 2019. FAST: <b>HR 0.85</b>, non-inferior. <sup class="c" data-ref="White2018,Mackenzie2020,FDA-Uloric" title="Source 127,241,431">127,241,431</sup></div>`;
  }
  $$('[data-ust]').forEach(b=>b.onclick=()=>{view=b.dataset.ust;$$('[data-ust]').forEach(q=>q.setAttribute('aria-pressed',q===b));drawT()});
  drawT();
  onHide.ultsafety=()=>{if(stopG)stopG()};
};
/* =============== 4.1 diagnosis & the acr/eular score =============== */
const DX_U=59.48; /* µmol/L per mg/dL */
/* the eight scored domains of the 2015 criteria, in table order; g = clinical, laboratory, imaging */
const DX_DOM=[
 {id:'joint',n:'Joint pattern',sn:'joint',g:'c'},{id:'traits',n:'Episode features',sn:'features',g:'c'},{id:'course',n:'Time course',sn:'course',g:'c'},{id:'tophus',n:'Tophus',sn:'tophus',g:'c'},
 {id:'urate',n:'Serum urate',sn:'urate',g:'l'},{id:'fluid',n:'Fluid without MSU',sn:'fluid',g:'l'},{id:'img',n:'US or DECT urate',sn:'US/DECT',g:'i'},{id:'eros',n:'X-ray erosion',sn:'erosion',g:'i'}];
const DX_GC={c:'var(--terra)',l:'var(--gold)',i:'var(--sea)'};
const DX_UR={none:null,u0:-4,u1:0,u2:2,u3:3,u4:4};
const dxUrCat=v=>v<4?'u0':v<6?'u1':v<8?'u2':v<10?'u3':'u4';
/* worked examples from the research file (weights from Neogi 2015; illustrative, not study patients) */
const DX_EX={
 pod:{joint:2,tr:3,course:2,toph:0,ur:8.5,fluid:0,img:0,ero:0,fl:0},
 first:{joint:2,tr:3,course:1,toph:0,ur:5.5,fluid:0,img:0,ero:0,fl:1},
 retest:{joint:2,tr:3,course:1,toph:0,ur:7.2,fluid:0,img:0,ero:0,fl:0},
 knee:{joint:0,tr:2,course:1,toph:0,ur:5.0,fluid:-2,img:0,ero:0,fl:0},
 toph:{joint:2,tr:3,course:2,toph:1,ur:9,fluid:0,img:1,ero:0,fl:0}
};
const DX_EXNOTE={
 pod:`Classic podagra: 2 + 3 + 2 + 3 = <b>10</b>. Classified without fluid or imaging. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>`,
 first:`First flare, urate 5.5 mg/dL (327 µmol/L) measured during the flare: 2 + 3 + 1 + 0 = <b>6</b>. Not classified, yet. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>`,
 retest:`The same person retested 6 weeks later at 7.2 mg/dL (428 µmol/L): 2 + 3 + 1 + 2 = <b>8</b>. Now classified. The highest value counts. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>`,
 knee:`Knee in an older woman, fluid examined without MSU crystals: 0 + 2 + 1 + 0 − 2 = <b>1</b>. Think of CPP crystal arthritis. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>`,
 toph:`Tophaceous gout: 2 + 3 + 2 + 4 + 3 + 4 = <b>18</b>. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>`
};
const DX_JN=[['male','Male sex',2],['prev','Previous arthritis attack (patient-reported)',2],['onset','Onset within 1 day',.5],['red','Joint redness',1],['mtp','First MTP involved',2.5],['cv','Hypertension or at least 1 cardiovascular disease',1.5],['ua','Serum uric acid above 5.88 mg/dL (above 350 µmol/L)',3.5]];
const DX_JB=[{k:'low',l:'Low',r:'≤4',lo:0,hi:4,p:2.2,c:'var(--sea)'},{k:'mid',l:'Intermediate',r:'>4 to <8',lo:4,hi:8,p:31.2,c:'var(--warn)'},{k:'high',l:'High',r:'≥8',lo:8,hi:13,p:82.5,c:'var(--terra)'}];
function dxBars(rows){
  return rows.map(r=>`<div class="dx-pr"><span class="lbl">${r.l}</span><div class="dx-bars">
    <span>sens</span><i><b style="width:${(r.s*100).toFixed(1)}%;background:var(--terra)"></b></i><span>${r.s.toFixed(2)}</span>
    <span>spec</span><i><b style="width:${(r.p*100).toFixed(1)}%;background:var(--sea)"></b></i><span>${r.p.toFixed(2)}</span>
    <span>AUC</span><i><b style="width:${(r.a*100).toFixed(1)}%;background:var(--muted)"></b></i><span>${r.a.toFixed(2)}</span></div></div>`).join('');
}
/* ---------- the polarised microscope ---------- */
const DX_MS=[
 {from:0,at:0,k:'Compensator 0°',t:'Needles along the slow axis are yellow',
  txt:`Under a compensated polarised microscope the background is red-magenta. MSU needles lying parallel to the slow axis of the red compensator look yellow, and those lying across it look blue. That is strong negative birefringence. <sup class="c" data-ref="Zhang2016SciRep,Ragab2017" title="Source 322,451">322,451</sup>`,
  pt:'Gout crystals are thin needles. Lined up with the marked direction, they shine yellow.',
  hook:`MSU: needle, <b>strongly negative</b>: <b>yellow when parallel</b> to the compensator's slow axis, blue when perpendicular. <sup class="c" data-ref="Zhang2016SciRep,Ragab2017" title="Source 322,451">322,451</sup>`},
 {from:.14,at:.25,k:'Compensator 45°',t:'At 45° the colours fade',
  txt:`The colour depends on the angle between the crystal and the slow axis, not on the crystal alone. A needle at 45° to the slow axis takes the background colour and almost disappears. Crystals can also sit inside white cells, and a report should say whether they are intracellular or extracellular. <sup class="c" data-ref="Ragab2017,Jokic2020" title="Source 186,322">186,322</sup>`,
  pt:'Turn the filter and the same needle changes colour. Halfway between, it nearly vanishes.',
  hook:`A good report states <b>birefringence</b> (strong or weak), <b>shape</b>, <b>intra- or extracellular</b> and <b>number per high-power field</b>. <sup class="c" data-ref="Jokic2020" title="Source 186">186</sup>`},
 {from:.38,at:.5,k:'Compensator 90°',t:'Turn 90°: the colours swap',
  txt:`With the slow axis turned through 90°, every needle that was yellow is now blue, and the blue ones are yellow. Reading the colour only makes sense once the slow-axis direction is known. <sup class="c" data-ref="Zhang2016SciRep,Ragab2017" title="Source 322,451">322,451</sup>`,
  pt:'The colour is a clue only when you know which way the filter points.'},
 {from:.62,at:.75,k:'Compare',t:'CPP: the opposite colours, and fainter',
  txt:`CPP crystals are positively birefringent: blue when parallel to the slow axis, yellow when across it. They are rod-like, rhomboid or square, and their birefringence is weak, so the colours are pale. <sup class="c" data-ref="Jokic2020,Ragab2017,Rosenthal2016" title="Source 186,322,339">186,322,339</sup>`,
  pt:'The crystals of a similar disease, CPPD, look like small blocks with paler, opposite colours.',
  hook:`CPP: rhomboid, <b>weakly positive</b>: <b>blue when parallel</b>. Mnemonic for the two: needle, negative, yellow parallel. <sup class="c" data-ref="Jokic2020,Rosenthal2016" title="Source 186,339">186,339</sup>`},
 {from:.88,at:1,k:'Compensator 180°',t:'Training matters',
  txt:`A full half-turn brings the field back to the start. Trained observers agree well: kappa 0.93 for MSU and 0.79 for CPP. In an online test of mixed readers, only 23% called all 22 non-MSU images non-MSU. <sup class="c" data-ref="Lumbreras2005,Berendsen2017" title="Source 22,239">22,239</sup>`,
  pt:'Reading crystals is a skill. Trained eyes are very reliable; untrained ones much less so.',
  hook:`Trained MSU identification: sensitivity 95.3%, specificity 97.2%. <sup class="c" data-ref="Lumbreras2005" title="Source 239">239</sup>`}
];
/* ---------- the diagnostic pathway ---------- */
const DX_PL=[.02,.27,.52,.77];
const DX_PATH=[
 {from:0,at:.12,k:'Step 1',t:'A hot joint: exclude infection first',
  txt:`Septic arthritis can look like a gout flare, and the two can occur together. Fever had a sensitivity of only 57% for septic arthritis, so its absence does not exclude infection. Risk factors include older age, diabetes, RA, joint surgery, a hip or knee prosthesis, skin infection and HIV. <sup class="c" data-ref="Margaretten2007,Shah2007" title="Source 248,363">248,363</sup> Shoulder sepsis in crystal arthritis was bacteraemic in 90%. <sup class="c" data-ref="Papanicolas2012" title="Source 305">305</sup>`,
  pt:'A hot, swollen joint with fever or chills needs a doctor the same day.',
  hook:`Crystals do not exclude infection: 1.5–5% of crystal-positive joints are also septic. <sup class="c" data-ref="Shah2007,Papanicolas2012" title="Source 305,363">305,363</sup>`},
 {from:DX_PL[1],at:.37,k:'Step 2',t:'Aspirate and look for crystals',
  txt:`EULAR 2018 recommends a search for crystals in every person with suspected gout, because MSU crystals give a definite diagnosis. <sup class="c" data-ref="Richette2020" title="Source 332">332</sup> The synovial white count and neutrophil share guide care before the Gram stain and culture come back. <sup class="c" data-ref="Margaretten2007,Mathews2010" title="Source 248,251">248,251</sup> The ACP 2017 primary-care guideline advises fluid analysis when clinical judgement says testing is needed (weak recommendation). <sup class="c" data-ref="Qaseem2017Dx" title="Source 319">319</sup>`,
  pt:'A little fluid from the joint, checked under a special microscope, gives the clearest answer.',
  hook:`EULAR 2006: crystal identification in symptomatic gout had a likelihood ratio of 567. <sup class="c" data-ref="Zhang2006Dx" title="Source 445">445</sup>`},
 {from:DX_PL[2],at:.62,k:'Step 3',t:'No crystals? Score and image',
  txt:`Where crystals cannot be sought, atypical presentations should be imaged, especially with ultrasound for the double-contour sign and tophi. Gout should not be diagnosed on hyperuricaemia alone. <sup class="c" data-ref="Richette2020" title="Source 332">332</sup> The ACR/EULAR score uses the highest urate, ideally measured more than 4 weeks after the flare began. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup> In primary care the Janssens rule gives a probability band. <sup class="c" data-ref="Janssens2010,Kienhorst2015" title="Source 180,204">180,204</sup>`,
  pt:'Without fluid, doctors combine the story, the blood urate and a scan.'},
 {from:DX_PL[3],at:.9,k:'Step 4',t:'Screen what travels with gout',
  txt:`EULAR strongly recommends assessing every person with gout for comorbidities, cardiovascular risk factors and causes of chronic hyperuricaemia. <sup class="c" data-ref="Richette2020" title="Source 332">332</sup> Among US adults with gout (NHANES 2007–2008): hypertension 74%, CKD stage 2 or higher 71%, obesity 53%, diabetes 26%, kidney stones 24%, myocardial infarction 14%, heart failure 11%, stroke 10%. <sup class="c" data-ref="Zhu2012" title="Source 454">454</sup> The ACR 2020 guideline advises HLA-B*5801 testing before allopurinol in people of Southeast Asian descent and African American people. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>`,
  pt:'After diagnosis, ask to have your blood pressure, kidneys, blood sugar and heart risk checked.',
  hook:`ACR 2020 strongly recommends urate-lowering therapy for tophi, radiographic damage or frequent flares, with a target under 6 mg/dL (360 µmol/L). <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>`}
];
const DX_CO=[['hypertension',74],['CKD stage ≥2',71],['obesity',53],['diabetes',26],['kidney stones',24],['heart attack',14],['heart failure',11],['stroke',10]];
inits.dx=()=>{
  /* ================= polarised microscope ================= */
  const ms=$('#dxMsSvg'),mr=$('#dxMsT');let msShow='both';
  /* crystals in unit-disc coordinates, placed once with a fixed seed so the field never jumps */
  const R=rng(4101),X=[];
  const place=(minD)=>{for(let k=0;k<400;k++){const a=R()*Math.PI*2,r=Math.sqrt(R())*.86,u=Math.cos(a)*r,v=Math.sin(a)*r;if(X.every(p=>Math.hypot(p.u-u,p.v-v)>minD))return[u,v]}return[R()*.8-.4,R()*.8-.4]};
  [0,90,0,90,15,75,105,165,0,90,35,140,60,120].forEach(a=>{const[u,v]=place(.2);X.push({k:'n',u,v,a,l:.15+R()*.07})});
  [[20,110],[0,90],[60,150]].forEach(([a,b])=>{const[u,v]=place(.26);X.push({k:'c',u,v,a,b})});
  [0,90,0,90,30,120,60,150,10,100].forEach(a=>{const[u,v]=place(.17);X.push({k:'r',u,v,a,s:.06+R()*.025})});
  /* compensated light: c = cos 2θ between crystal long axis and slow axis; MSU (negative) is yellow at c > 0,
     CPP (positive) is the reverse, and weaker */
  const col=(a,ang,sign,str)=>{const c=Math.cos(2*(a-ang)*Math.PI/180)*sign;return{c,o:Math.abs(c)*str,k:c>0?'var(--dx-yel)':'var(--dx-blu)'}};
  function drawMs(t){
    const ang=t*180,N=vb(ms,'720 400','330 552');
    const F=N?{cx:165,cy:162,r:150}:{cx:206,cy:200,r:186};
    const P=N?{cx:56,cy:400,r:40,lx:116,ly:370}:{cx:520,cy:86,r:52,lx:430,ly:214};
    const sc=F.r;let s=`<defs><clipPath id="dxMsClip"><circle cx="${F.cx}" cy="${F.cy}" r="${F.r}"/></clipPath>${marker('dxMsA','var(--ink)')}</defs>`;
    s+=`<circle cx="${F.cx}" cy="${F.cy}" r="${F.r+7}" style="fill:var(--dx-rim)"/><circle cx="${F.cx}" cy="${F.cy}" r="${F.r}" style="fill:var(--dx-mag)"/>`;
    s+=`<g clip-path="url(#dxMsClip)">`;
    const showN=msShow!=='cpp',showR=msShow!=='msu';
    X.forEach(p=>{const x=F.cx+p.u*sc,y=F.cy+p.v*sc;
      if(p.k==='n'&&showN){const L=p.l*sc,C=col(p.a,ang,1,1);s+=needle(x,y,L,p.a,.55,'var(--dx-magd)')+needle(x,y,L,p.a,C.o,C.k)}
      if(p.k==='c'&&showN){s+=neutro(x,y,sc*.1,.92);[p.a,p.b].forEach((a,i)=>{const C=col(a,ang,1,1),dx=(i?-1:1)*sc*.025;s+=needle(x+dx,y+dx*.6,sc*.11,a,.6,'var(--dx-magd)')+needle(x+dx,y+dx*.6,sc*.11,a,C.o,C.k)})}
      if(p.k==='r'&&showR){const S=p.s*sc,C=col(p.a,ang,-1,.6);s+=rhomb(x,y,S,p.a,.55,'var(--dx-magd)')+rhomb(x,y,S,p.a,C.o,C.k)}
    });
    s+=`</g>`;
    /* slow-axis ticks on the rim of the field */
    {const r=Math.PI*ang/180,dx=Math.cos(r),dy=Math.sin(r);
      [1,-1].forEach(sg=>{s+=`<line x1="${f1(F.cx+sg*dx*(F.r+2))}" y1="${f1(F.cy+sg*dy*(F.r+2))}" x2="${f1(F.cx+sg*dx*(F.r+14))}" y2="${f1(F.cy+sg*dy*(F.r+14))}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/>`})}
    /* compensator diagram */
    s+=`<text x="${N?P.cx:P.cx}" y="${P.cy-P.r-14}" class="t-sm t-mid">COMPENSATOR</text>`;
    s+=`<circle cx="${P.cx}" cy="${P.cy}" r="${P.r}" style="fill:var(--dx-mag);stroke:var(--dx-rim);stroke-width:4"/>`;
    s+=`<line x1="${P.cx-P.r}" x2="${P.cx+P.r}" y1="${P.cy}" y2="${P.cy}" style="stroke:var(--panel);stroke-width:1;stroke-dasharray:3 3;opacity:.7"/><line y1="${P.cy-P.r}" y2="${P.cy+P.r}" x1="${P.cx}" x2="${P.cx}" style="stroke:var(--panel);stroke-width:1;stroke-dasharray:3 3;opacity:.7"/>`;
    s+=`<text x="${P.cx+P.r+5}" y="${P.cy+4}" class="t-xs">P</text><text x="${P.cx}" y="${P.cy+P.r+13}" class="t-xs t-mid">A</text>`;
    {const r=Math.PI*ang/180,dx=Math.cos(r)*(P.r-8),dy=Math.sin(r)*(P.r-8);
      s+=`<line x1="${f1(P.cx-dx)}" y1="${f1(P.cy-dy)}" x2="${f1(P.cx+dx)}" y2="${f1(P.cy+dy)}" style="stroke:var(--ink);stroke-width:3" marker-end="url(#dxMsA)" marker-start="url(#dxMsA)"/>`;
      s+=`<text x="${P.cx}" y="${P.cy+P.r+(N?30:28)}" class="t-lbl t-mid">${N?'γ':'slow axis γ'} · ${Math.round(ang)}°</text>`}
    /* legend: two reference crystals at the current angle */
    const ly=P.ly,lx=P.lx,rowH=44;
    const ref=(y,kind,lbl,sub,a)=>{const C=kind==='n'?col(a,ang,1,1):col(a,ang,-1,.6);let g=`<rect x="${lx}" y="${y-16}" width="34" height="30" rx="6" style="fill:var(--dx-mag)"/>`;
      g+=kind==='n'?needle(lx+17,y-1,24,a,.55,'var(--dx-magd)')+needle(lx+17,y-1,24,a,C.o,C.k):rhomb(lx+17,y-1,14,a,.55,'var(--dx-magd)')+rhomb(lx+17,y-1,14,a,C.o,C.k);
      const word=C.o<.12?(N?'faint':'background colour'):C.k.includes('yel')?'yellow':'blue';
      g+=`<text x="${lx+44}" y="${y-3}" class="t-lbl">${lbl}</text><text x="${lx+44}" y="${y+11}" class="t-xs">${sub} → ${N?'':'now '}${word}</text>`;return g};
    s+=`<text x="${lx}" y="${ly-26}" class="t-sm">REFERENCE CRYSTALS AT ${Math.round(ang)}°</text>`;
    s+=ref(ly,'n','MSU needle, E–W','strong, negative',0);
    s+=ref(ly+rowH,'n','MSU needle, N–S','strong, negative',90);
    s+=ref(ly+rowH*2,'r','CPP rhomboid, E–W','weak, positive',0);
    s+=ref(ly+rowH*3,'r','CPP rhomboid, N–S','weak, positive',90);
    if(!N)s+=`<text x="${lx}" y="${ly+rowH*4-4}" class="t-xs">MSU: yellow ∥ slow axis · CPP: blue ∥ slow axis</text>`;
    else s+=`<text x="165" y="${ly+rowH*4-4}" class="t-xs t-mid">MSU: yellow ∥ slow axis · CPP: blue ∥ slow axis</text>`;
    ms.innerHTML=s;
    const p=phaseOf(DX_MS,t);setMs(p);$('#dxMsNote').innerHTML=noteHTML(DX_MS[p]);
    const cy=X.filter(q=>q.k==='n').map(q=>col(q.a,ang,1,1));
    $('#dxMsRead').innerHTML=`<span>slow axis <b>${Math.round(ang)}°</b></span><span>free MSU needles: <b>${cy.filter(c=>c.o>=.12&&c.c>0).length} yellow</b>, <b>${cy.filter(c=>c.o>=.12&&c.c<0).length} blue</b>, <b>${cy.filter(c=>c.o<.12).length} faint</b></span>`;
  }
  const stopM=playWire(mr,$('#dxMsPlay'),drawMs,14000,'Replay','dx');
  const setMs=stepWire($('#dxMsSteps'),DX_MS,mr,drawMs,stopM);
  $$('[data-msv]').forEach(b=>b.addEventListener('click',()=>{msShow=b.dataset.msv;$$('[data-msv]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMs(+mr.value)}));
  drawMs(+mr.value);

  /* ================= ACR/EULAR calculator ================= */
  const G=$('#dxGauge'),form=$('#dxForm');const shown={};DX_DOM.forEach(d=>shown[d.id]=0);let stopG=null,gTok=0;
  const rad=n=>{const r=$(`#m-dx input[name="${n}"]:checked`);return r?r.value:null};
  function st(){
    const tr=$$('#m-dx [data-tr]').filter(c=>c.checked).length,uk=rad('dxUr'),up=DX_UR[uk];
    const pts={joint:+rad('dxJoint'),traits:tr,course:+rad('dxCourse'),tophus:$('#dxToph').checked?4:0,urate:up==null?0:up,fluid:+rad('dxFluid'),img:$('#dxImg').checked?4:0,eros:$('#dxEro').checked?4:0};
    const tot=DX_DOM.reduce((a,d)=>a+pts[d.id],0);
    return{entry:$('#dxEntry').checked,suff:$('#dxSuff').checked,uMiss:up==null,pts,tot,flare:$('#dxFlareU').checked,clin:pts.fluid===0&&!pts.img&&!pts.eros}}
  function gauge(V,S){
    const N=vb(G,'400 250','330 338');
    const W=N?330:400,C=W/2,X0=N?16:24,X1=W-X0,xs=v=>X0+(v+6)/29*(X1-X0),by=108,bh=22;
    const live=S.entry&&!S.suff,tot=DX_DOM.reduce((a,d)=>a+V[d.id],0),met=live&&!S.uMiss&&S.tot>=8;
    let s=`<text x="10" y="16" class="t-sm">ACR/EULAR 2015 · SCORE −6 TO 23</text>`;
    s+=`<g style="opacity:${live?1:.32}">`;
    if(live){s+=`<text x="${C}" y="60" class="t-big t-mid" style="font-size:44px;fill:${met?'var(--good)':'var(--ink)'}">${Math.round(tot)}</text>`;
      s+=`<text x="${C}" y="78" class="t-xs t-mid">${S.uMiss?'urate missing: score incomplete':met?'≥ 8 · classified as gout':'of 23 · threshold 8'}</text>`}
    s+=`<rect x="${X0}" y="${by}" width="${X1-X0}" height="${bh}" rx="5" style="fill:var(--panel-2)"/>`;
    /* positive domains stack rightward from 0, negative ones leftward */
    let pos=0,neg=0;
    DX_DOM.forEach(d=>{const v=V[d.id];if(Math.abs(v)<.02)return;
      if(v>0){const a=xs(pos),b=xs(pos+v);s+=`<rect x="${f1(a)}" y="${by}" width="${f1(b-a)}" height="${bh}" style="fill:${DX_GC[d.g]};opacity:.85;stroke:var(--panel);stroke-width:1.5"/>`;pos+=v}
      else{const b=xs(neg),a=xs(neg+v);s+=`<rect x="${f1(a)}" y="${by}" width="${f1(b-a)}" height="${bh}" style="fill:var(--bad);opacity:.8;stroke:var(--panel);stroke-width:1.5"/>`;neg+=v}});
    s+=`<line x1="${f1(xs(0))}" x2="${f1(xs(0))}" y1="${by-4}" y2="${by+bh+4}" style="stroke:var(--muted);stroke-width:1.5"/>`;
    s+=`<line x1="${f1(xs(8))}" x2="${f1(xs(8))}" y1="${by-10}" y2="${by+bh+6}" style="stroke:var(--ink);stroke-width:2.5"/><text x="${f1(xs(8))}" y="${by-14}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">gout ≥ 8</text>`;
    s+=`<line x1="${f1(xs(15))}" x2="${f1(xs(15))}" y1="${by}" y2="${by+bh+6}" style="stroke:var(--muted);stroke-dasharray:2 2"/>`;
    s+=`<circle cx="${f1(xs(tot))}" cy="${by+bh+9}" r="4.5" style="fill:${met?'var(--good)':'var(--ink)'}"/>`;
    [[-6,'−6'],[0,'0'],[8,'8'],[15,'15 clinical max'],[23,'23']].forEach(([v,l])=>{s+=`<text x="${f1(xs(v))}" y="${by+bh+26}" class="t-xs ${v===23?'t-end':v===-6?'':'t-mid'}" ${v===-6?`style="text-anchor:start"`:''}>${v===15&&N?'15':l}</text>`});
    /* per-domain readout */
    const rows=DX_DOM.map((d,i)=>{const v=V[d.id],x=N?12:(i<4?14:206),y=N?176+i*20:176+(i%4)*19;
      const miss=d.id==='urate'&&S.uMiss;
      return `<rect x="${x}" y="${y-8}" width="9" height="9" rx="2" style="fill:${DX_GC[d.g]}"/><text x="${x+15}" y="${y}" class="t-xs" style="fill:var(--ink)">${d.n}</text><text x="${x+(N?306:178)}" y="${y}" class="t-xs t-end" style="font-weight:700;fill:${miss?'var(--warn)':v<0?'var(--bad)':v>0?'var(--ink)':'var(--muted)'}">${miss?'needed':(v>0?'+':v<0?'−':'')+Math.abs(Math.round(v))}</text>`}).join('');
    s+=rows+`</g>`;
    if(!S.entry)s+=`<text x="${C}" y="58" class="t-big t-mid" style="fill:var(--warn)">Entry criterion not met</text><text x="${C}" y="78" class="t-xs t-mid">the score is not applied</text>`;
    else if(S.suff)s+=`<text x="${C}" y="58" class="t-big t-mid" style="fill:var(--good)">MSU crystals seen</text><text x="${C}" y="78" class="t-xs t-mid">classified as gout without scoring</text>`;
    G.innerHTML=s;
  }
  function update(){
    const S=st();const from={...shown};stopG&&stopG();
    stopG=animate(500,p=>{const e=ease(p);DX_DOM.forEach(d=>shown[d.id]=lerp(from[d.id],S.pts[d.id],e));gauge(shown,S)},()=>{stopG=null});
    const tok=++gTok;setTimeout(()=>{if(tok!==gTok)return;stopG&&stopG();stopG=null;DX_DOM.forEach(d=>shown[d.id]=S.pts[d.id]);gauge(shown,S)},650);
    if(RM){DX_DOM.forEach(d=>shown[d.id]=S.pts[d.id]);gauge(shown,S)}
    const v=$('#dxVerdict');let cls='',h='';
    const best=S.tot-S.pts.urate+4;
    if(!S.entry){cls='na';h=`<strong>Criteria not applied</strong><span>The entry criterion comes first: at least one episode of swelling, pain or tenderness in a peripheral joint or bursa. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup></span>`}
    else if(S.suff){cls='yes';h=`<strong>Classified as gout: sufficient criterion</strong><span>MSU crystals in a symptomatic joint, bursa or tophus classify without any scoring. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup></span>`}
    else if(S.uMiss){cls='na';h=`<strong>Score cannot be computed yet</strong><span>Serum urate is mandatory. The other items add up to ${S.tot}. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup></span>`}
    else if(S.tot>=8){cls='yes';h=`<strong>Classified as gout: ${S.tot} of 23</strong><span>A score of 8 or more meets the classification criteria. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup></span>`}
    else{h=`<strong>Not classified as gout: ${S.tot} of 23</strong><span>That does not rule gout out. Aspiration remains the way to establish the diagnosis. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup></span>`}
    if(S.entry&&!S.suff&&S.flare&&!S.uMiss&&S.pts.urate<4){h+=`<span><span class="tag warn">Urate timing</span> Urate often falls during a flare: it was normal in 49% of one series. If practicable, retest more than 4 weeks after the flare began and off urate-lowering therapy, and score the highest value.${S.tot<8&&best>=8?' A higher value on retest could change this result.':''} <sup class="c" data-ref="Urano2002,Neogi2015" title="Source 290,416">290,416</sup></span>`}
    h+=`<span class="stage-cap">Classification criteria for studies, not a diagnostic test for one person.</span>`;
    v.className='dx-verdict'+(cls?' '+cls:'');v.innerHTML=h;
    $('#dxPerfF').classList.toggle('on',S.entry&&!S.suff&&!S.clin);$('#dxPerfC').classList.toggle('on',S.entry&&!S.suff&&S.clin);
    $('#dxLive').innerHTML=!S.entry?`<span>entry criterion not met</span>`:S.suff?`<b class="ok">Gout</b><span>sufficient criterion</span>`:`<span>score</span><b class="${!S.uMiss&&S.tot>=8?'ok':''}">${S.tot}</b><span>of 23 · ${S.uMiss?'urate needed':S.tot>=8?'classified':'below 8'}</span>`;
  }
  function conv(){const n=$('#dxUrN'),v=parseFloat(n.value);$('#dxUrConv').textContent=isFinite(v)&&v>0?`≈ ${Math.round(v*DX_U)} µmol/L`:''}
  $('#dxUrN').addEventListener('input',()=>{const v=parseFloat($('#dxUrN').value);if(isFinite(v)&&v>0){const r=$(`#m-dx input[name="dxUr"][value="${dxUrCat(v)}"]`);r.checked=true}conv();update()});
  form.addEventListener('change',e=>{if(e.target.name==='dxUr'){$('#dxUrN').value='';conv()}if(e.target.id!=='dxUrN')update()});
  const setR=(n,v)=>{const r=$(`#m-dx input[name="${n}"][value="${v}"]`);if(r)r.checked=true};
  function load(k){const E=DX_EX[k];
    if(!E){$$('#dxForm input[type=checkbox]').forEach(c=>c.checked=false);setR('dxJoint',0);setR('dxCourse',0);setR('dxUr','none');setR('dxFluid',0);$('#dxUrN').value='';conv();update();return}
    $('#dxEntry').checked=true;$('#dxSuff').checked=false;setR('dxJoint',E.joint);setR('dxCourse',E.course);
    $$('#m-dx [data-tr]').forEach((c,i)=>c.checked=i<E.tr);$('#dxToph').checked=!!E.toph;$('#dxImg').checked=!!E.img;$('#dxEro').checked=!!E.ero;
    setR('dxFluid',E.fluid);$('#dxUrN').value=E.ur;setR('dxUr',dxUrCat(E.ur));$('#dxFlareU').checked=!!E.fl;conv();update();
    $('#dxVerdict').innerHTML+=`<span class="dx-def">${DX_EXNOTE[k]}</span>`}
  $$('[data-dxex]').forEach(b=>b.addEventListener('click',()=>load(b.dataset.dxex)));
  $('#dxPerfFb').innerHTML=dxBars([{l:'All 8 domains · SUGAR validation, n = 330',s:.92,p:.89,a:.95}]);
  $('#dxPerfCb').innerHTML=dxBars([{l:'Clinical and urate items only · same set',s:.85,p:.78,a:.89}]);
  load('pod');

  /* ================= Janssens rule ================= */
  const J=$('#dxJnSvg');let jShown=0,stopJ=null,jTok=0;
  $('#dxJnForm').innerHTML=`<fieldset><legend>Janssens rule · 7 items</legend>${DX_JN.map(([k,l,w])=>`<label class="dx-ck"><input type="checkbox" data-jn="${k}"><span>${l}</span><span class="pts">+${w}</span></label>`).join('')}
    <p class="dx-def">Weights: male 2; previous attack 2; onset within 1 day 0.5; redness 1; first MTP 2.5; hypertension or cardiovascular disease 1.5; uric acid above 5.88 mg/dL 3.5. Maximum 13. <sup class="c" data-ref="Lee2015,Janssens2010" title="Source 180,226">180,226</sup></p></fieldset>
    <div class="ctrls" role="group" aria-label="Janssens examples"><button class="btn" id="dxJnTyp">Typical gout story</button><button class="btn" id="dxJnClr">Clear</button></div>`;
  const band=v=>v<=4?DX_JB[0]:v<8?DX_JB[1]:DX_JB[2];
  function jDraw(v,real){const N=vb(J,'400 210','330 236');const X0=N?14:20,X1=N?316:380,xs=k=>X0+k/13*(X1-X0),by=46,B=band(real);
    let s=`<text x="10" y="16" class="t-sm">JANSSENS SCORE · 0 TO 13</text>`;
    DX_JB.forEach(b=>{s+=`<rect x="${f1(xs(b.lo))}" y="${by}" width="${f1(xs(b.hi)-xs(b.lo))}" height="22" style="fill:${b.c};opacity:${b===B?.32:.1}"/><text x="${f1((xs(b.lo)+xs(b.hi))/2)}" y="${by-6}" class="t-xs t-mid" style="fill:${b===B?'var(--ink)':'var(--muted)'};font-weight:${b===B?700:500}">${b.l} ${b.r}</text>`});
    s+=`<rect x="${X0}" y="${by}" width="${f1(xs(v)-X0)}" height="22" rx="3" style="fill:${B.c};opacity:.75"/>`;
    s+=`<line x1="${f1(xs(v))}" x2="${f1(xs(v))}" y1="${by-2}" y2="${by+26}" style="stroke:var(--ink);stroke-width:2.5"/>`;
    [0,4,8,13].forEach(k=>{s+=`<text x="${f1(xs(k))}" y="${by+38}" class="t-xs t-mid">${k}</text>`});
    s+=`<text x="${X1}" y="16" class="t-big t-end" style="fill:${B.c}">${(Math.round(v*2)/2).toFixed(1)}</text>`;
    const y0=N?120:116,rh=N?36:30;
    s+=`<text x="10" y="${y0-10}" class="t-sm">${N?'GOUT IN EACH BAND (DERIVATION STUDY)':'GOUT IN EACH BAND · DERIVATION STUDY (LEE 2015)'}</text>`;
    DX_JB.forEach((b,i)=>{const y=y0+i*rh,on=b===B,bx=N?146:160,bw=N?128:180;
      s+=`<text x="10" y="${y+12}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${b.l} (${b.r})</text>`;
      s+=`<rect x="${bx}" y="${y+2}" width="${bw}" height="13" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+2}" width="${f1(bw*b.p/100)}" height="13" rx="3" style="fill:${b.c};opacity:${on?.9:.35}"/>`;
      s+=`<text x="${bx+bw+6}" y="${y+12}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:700">${b.p}%</text>`});
    J.innerHTML=s}
  function jUpd(){let v=0;$$('[data-jn]').forEach(c=>{if(c.checked)v+=DX_JN.find(x=>x[0]===c.dataset.jn)[2]});
    const from=jShown;stopJ&&stopJ();stopJ=animate(450,p=>{jShown=lerp(from,v,ease(p));jDraw(jShown,v)},()=>{stopJ=null});
    const tok=++jTok;setTimeout(()=>{if(tok!==jTok)return;stopJ&&stopJ();stopJ=null;jShown=v;jDraw(v,v)},600);if(RM){jShown=v;jDraw(v,v)}
    const B=band(v),o=$('#dxJnOut');o.className='dx-verdict'+(B.k==='high'?' yes':B.k==='mid'?' na':'');
    o.innerHTML=`<span class="kicker">Score ${v} of 13</span><strong>${B.l} probability band (${B.r})</strong><span>In the derivation study, ${B.p}% of people in this band had gout. <sup class="c" data-ref="Lee2015" title="Source 226">226</sup></span>`+
      (B.k==='high'?`<span>In a study of gout vs septic arthritis, 3 of 54 septic joints still scored "high". A high score does not exclude infection. <sup class="c" data-ref="Lee2015" title="Source 226">226</sup></span>`:B.k==='low'?`<span>In secondary care, a score of 4 or less had an NPV of 0.95 for gout. <sup class="c" data-ref="Kienhorst2015" title="Source 204">204</sup></span>`:`<span>Between the cut-offs the rule does not settle it. EULAR 2018 advises a crystal search in every person with suspected gout. <sup class="c" data-ref="Richette2020" title="Source 332">332</sup></span>`)}
  $('#dxJnForm').addEventListener('change',jUpd);
  $('#dxJnTyp').onclick=()=>{$$('[data-jn]').forEach(c=>c.checked=['male','prev','onset','red','mtp','ua'].includes(c.dataset.jn));jUpd()};
  $('#dxJnClr').onclick=()=>{$$('[data-jn]').forEach(c=>c.checked=false);jUpd()};
  jDraw(0,0);jUpd();

  /* ================= imaging sketches ================= */
  {let s=`<text x="10" y="16" class="t-xs">SCHEMATIC · LONGITUDINAL VIEW</text>`;
    s+=`<rect x="0" y="24" width="260" height="116" style="fill:var(--panel-2)"/>`;
    s+=`<path d="M0 112 C60 108 110 104 160 106 S230 112 260 110 L260 140 L0 140Z" style="fill:var(--muted);opacity:.35"/>`;
    s+=`<path d="M0 112 C60 108 110 104 160 106 S230 112 260 110" style="fill:none;stroke:var(--ink);stroke-width:3"/>`;
    s+=`<path d="M0 86 C60 82 110 78 160 80 S230 86 260 84 L260 111 C230 112 200 106 160 106 S60 108 0 112Z" style="fill:var(--panel);opacity:.9"/>`;
    let d='';for(let x=0;x<=260;x+=5){const y=86-((x/260)*4)+Math.sin(x*.21)*1.6+Math.sin(x*.07)*1.2-(x>100&&x<200?2*Math.sin((x-100)/100*Math.PI):0);d+=(x?'L':'M')+x+' '+f1(y)}
    s+=`<path d="${d}" style="fill:none;stroke:var(--xtal);stroke-width:3.4;stroke-linejoin:round"/>`;
    s+=`<text x="252" y="70" class="t-xs t-end" style="fill:var(--xtal);font-weight:700">urate on cartilage</text><text x="252" y="100" class="t-xs t-end">cartilage (dark)</text><text x="252" y="132" class="t-xs t-end" style="fill:var(--ink)">bone surface</text>`;
    s+=`<text x="10" y="40" class="t-xs" style="fill:var(--ink)">two bright parallel lines = "double contour"</text>`;
    $('#dxUsSvg').innerHTML=s}
  {let s=`<text x="10" y="18" class="t-xs">DECT SENSITIVITY, JOINT LEVEL · GAMALA 2019</text>`;
    [['all disease durations',.83,'var(--sea)'],['disease ≤ 6 weeks',.55,'var(--terra)']].forEach(([l,v,c],i)=>{const y=40+i*40;
      s+=`<text x="10" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="10" y="${y+6}" width="200" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="10" y="${y+6}" width="${200*v}" height="16" rx="4" style="fill:${c}"/><text x="${16+200*v}" y="${y+19}" class="t-sm" style="fill:var(--ink);font-weight:700">${v.toFixed(2)}</text>`});
    s+=`<text x="10" y="128" class="t-xs">early negatives do not exclude gout</text>`;
    $('#dxCtSvg').innerHTML=s}
  {let s=`<text x="10" y="16" class="t-xs">SCHEMATIC · BONE END WITH A GOUTY EROSION</text>`;
    s+=`<path d="M30 140 L30 64 C30 42 58 30 90 30 C120 30 146 38 152 50 L170 42 C160 50 142 56 137 74 C132 92 142 104 152 106 L152 140Z" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:2.5;stroke-linejoin:round"/>`;
    s+=`<ellipse cx="166" cy="80" rx="16" ry="21" style="fill:var(--xtal);opacity:.35;stroke:var(--xtal)"/>`;
    s+=`<path d="M170 42 C160 50 142 56 137 74 C132 92 142 104 152 106" style="fill:none;stroke:var(--ink);stroke-width:5;opacity:.5"/>`;
    s+=`<path d="M152 50 L170 42" style="fill:none;stroke:var(--gold);stroke-width:3.5;stroke-linecap:round"/>`;
    s+=`<line x1="172" y1="40" x2="190" y2="32" class="arrow"/><text x="194" y="34" class="t-xs" style="fill:var(--ink)">overhanging</text><text x="194" y="45" class="t-xs" style="fill:var(--ink)">edge</text>`;
    s+=`<text x="188" y="84" class="t-xs" style="fill:var(--xtal);font-weight:700">tophus</text>`;
    s+=`<line x1="136" y1="92" x2="104" y2="114" class="arrow"/><text x="40" y="126" class="t-xs" style="fill:var(--ink)">sclerotic margin</text>`;
    $('#dxXrSvg').innerHTML=s}

  /* ================= diagnostic pathway ================= */
  const ps=$('#dxPathSvg'),pr=$('#dxPathT');
  const PN=[{a:'Exclude infection',b:'red flags first'},{a:'Aspirate the joint',b:'crystals · culture'},{a:'No crystals?',b:'score · US · DECT'},{a:'Screen',b:'kidneys · heart · sugar'}];
  function drawPath(t){let s=`<defs>${marker('dxPa')}${marker('dxPb','var(--terra)')}</defs>`;
    const N=vb(ps,'720 420','330 1000');
    const L=N?{nw:306,nh:60,pw:306,ph:150,pos:PN.map((_,i)=>({x:12,y:16+i*246})),pan:PN.map((_,i)=>({x:12,y:16+i*246+76}))}
             :{nw:160,nh:62,pw:160,ph:290,pos:PN.map((_,i)=>({x:16+i*176,y:20})),pan:PN.map((_,i)=>({x:16+i*176,y:106}))};
    const lit=i=>t>=DX_PL[i],cur=phaseOf(DX_PATH,t);
    for(let k=0;k<3;k++){const a=L.pos[k],b=L.pos[k+1],on=lit(k+1);
      const[x1,y1,x2,y2]=N?[165,a.y+L.nh+L.ph+16,165,b.y-3]:[a.x+L.nw,a.y+L.nh/2,b.x-3,b.y+L.nh/2];
      s+=`<path d="M${x1} ${y1} L${x2} ${y2}" class="arrow" style="${on?'stroke:var(--terra);stroke-width:2.2':''}" marker-end="url(#${on?'dxPb':'dxPa'})"/>`;
      const p0=DX_PL[k]+.08,p1=DX_PL[k+1];if(t>p0&&t<p1){const u=ease(ramp(t,p0,p1));s+=`<circle cx="${f1(lerp(x1,x2,u))}" cy="${f1(lerp(y1,y2,u))}" r="6" style="fill:var(--terra)"/>`}}
    PN.forEach((n,i)=>{const p=L.pos[i],on=lit(i),c=i===cur;
      s+=`<rect x="${p.x}" y="${p.y}" width="${L.nw}" height="${L.nh}" rx="12" style="fill:${on?'var(--terra-soft)':'var(--panel)'};stroke:${on?'var(--terra)':'var(--line)'};stroke-width:${c?3:1.5}"/>`;
      s+=`<circle cx="${p.x}" cy="${p.y}" r="11" style="fill:${on?'var(--terra)':'var(--panel-2)'};stroke:var(--panel);stroke-width:2"/><text x="${p.x}" y="${p.y+4}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${p.x+L.nw/2}" y="${p.y+27}" class="t-lbl t-mid" style="opacity:${on?1:.55}">${n.a}</text><text x="${p.x+L.nw/2}" y="${p.y+45}" class="t-xs t-mid">${n.b}</text>`});
    const pan=(i,inner)=>{const o=ramp(t,DX_PL[i]+.02,DX_PL[i]+.12);if(o<=0)return '';const p=L.pan[i];
      return `<g style="opacity:${f1(o)}"><rect x="${p.x}" y="${p.y}" width="${L.pw}" height="${L.ph}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>${inner(p.x+10,p.y,o)}</g>`};
    const lines=(x,y,arr,gap=17)=>arr.map(([tx,c,w],k)=>`<text x="${x}" y="${y+k*gap}" class="${w?'t-lbl':'t-xs'}" style="fill:${c||'var(--ink)'}${w?';font-size:12px':''}">${tx}</text>`).join('');
    s+=pan(0,(x,y,o)=>{const sw=L.pw-20;let g=lines(x,y+20,[['RED FLAGS','var(--terra)'],['fever, sweats, rigors'],['prosthesis · diabetes'],['RA · skin infection · HIV'],['shoulder joint']]);
      const yb=y+(N?112:122);g+=`<text x="${x}" y="${yb}" class="t-xs">fever: sensitivity only</text><rect x="${x}" y="${yb+6}" width="${sw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${x}" y="${yb+6}" width="${f1(sw*.57*ease(o))}" height="12" rx="3" style="fill:var(--terra)"/><text x="${x+sw-2}" y="${yb+16}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">57%</text>`;
      if(!N)g+=lines(x,y+170,[['no fever does not','var(--muted)'],['mean no infection','var(--muted)']]);return g});
    s+=pan(1,(x,y,o)=>{let g=lines(x,y+20,[['SEND THE FLUID FOR','var(--terra)'],['polarised microscopy'],['cell count, % neutrophils'],['Gram stain + culture']]);
      const nx=x+(N?196:20),ny=y+(N?60:120);g+=`<rect x="${nx-8}" y="${ny-26}" width="${N?96:140}" height="58" rx="8" style="fill:var(--dx-mag)"/>`;
      [[0,-14,0],[18,-4,90],[38,-12,20],[-2,10,160],[24,14,0],[48,8,90],[70,-8,0],[84,10,60]].slice(0,N?5:8).forEach(([dx,dy,a])=>{const c=Math.cos(2*a*Math.PI/180);g+=needle(nx+dx+4,ny+dy+4,14,a,Math.max(.25,Math.abs(c)),c>0?'var(--dx-yel)':'var(--dx-blu)')});
      if(!N)g+=lines(x,y+200,[['MSU crystals = definite','var(--good)',1],['crystals do not exclude'],['infection (1.5–5%)']]);
      else g+=lines(x,y+108,[['MSU crystals = definite gout','var(--good)',1],['crystals do not exclude infection (1.5–5%)']]);return g});
    s+=pan(2,(x,y,o)=>{let g=lines(x,y+20,[['WITHOUT CRYSTALS','var(--terra)'],['ACR/EULAR score ≥ 8'],['Janssens (primary care)'],['ultrasound: double contour'],['DECT: misses early gout']]);
      const yb=y+(N?112:120),sw=L.pw-20,xs=v=>x+(v+6)/29*sw;
      g+=`<text x="${x}" y="${yb}" class="t-xs">score −6 … 23</text><rect x="${x}" y="${yb+6}" width="${sw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(xs(0))}" y="${yb+6}" width="${f1((xs(10)-xs(0))*ease(o))}" height="12" style="fill:var(--terra);opacity:.8"/><line x1="${f1(xs(8))}" x2="${f1(xs(8))}" y1="${yb+2}" y2="${yb+22}" style="stroke:var(--ink);stroke-width:2"/>`;
      if(!N)g+=lines(x,y+170,[['urate: highest value,','var(--muted)'],['ideally >4 weeks after','var(--muted)'],['the flare began','var(--muted)'],['not on urate alone','var(--bad)']]);return g});
    s+=pan(3,(x,y,o)=>{const sw=N?120:70,lx=N?112:76;let g=`<text x="${x}" y="${y+18}" class="t-xs" style="fill:var(--terra)">${N?'US ADULTS WITH GOUT, NHANES 2007–08':'WITH GOUT · NHANES'}</text>`;
      DX_CO.forEach(([l,v],k)=>{const yy=y+(N?34:38)+k*(N?14:31);
        if(N){g+=`<text x="${x}" y="${yy+8}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${x+lx}" y="${yy}" width="${f1(sw*v/100*ease(o))}" height="10" rx="2" style="fill:var(--sea)"/><text x="${f1(x+lx+sw*v/100*ease(o)+4)}" y="${yy+9}" class="t-xs">${v}%</text>`}
        else{g+=`<text x="${x}" y="${yy}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${x}" y="${yy+5}" width="${f1(110*v/100*ease(o))}" height="10" rx="2" style="fill:var(--sea)"/><text x="${f1(x+110*v/100*ease(o)+4)}" y="${yy+14}" class="t-xs">${v}%</text>`}});
      return g});
    ps.innerHTML=s;setPath(cur);$('#dxPathNote').innerHTML=noteHTML(DX_PATH[cur])}
  const stopP=playWire(pr,$('#dxPathPlay'),drawPath,16000,'Replay','dx');
  const setPath=stepWire($('#dxPathSteps'),DX_PATH,pr,drawPath,stopP);
  drawPath(+pr.value);
  /* several drawings share one module id, so re-lay-out all of them together */
  redraws.dx=()=>{stopM();stopP();drawMs(+mr.value);drawPath(+pr.value);update();jUpd()};
};
/* =============== 4.2 the differential =============== */
const DD_COLS=[['joint','Typical joints'],['xtal','Crystals'],['fever','Fever & inflammation'],['onset','Onset & course'],['img','Imaging hallmark'],['who','Who & other clues']];
const DD_NONE='<span class="dd-none">—</span>';
const DD_DZ=[
 {id:'gout',n:'Gout',
  joint:`First MTP (39.4% of SUGAR gout cases), ankle or midfoot; one or a few joints at a time <sup class="c" data-ref="Taylor2015,Neogi2015" title="Source 290,403">290,403</sup>`,
  xtal:`Needles with strong negative birefringence: yellow when parallel to the slow axis <sup class="c" data-ref="Zhang2016SciRep" title="Source 451">451</sup>`,
  fever:`Fever is possible: 34% of hospitalised people with crystal arthritis had fever from the synovitis <sup class="c" data-ref="Ho1993" title="Source 165">165</sup>`,
  onset:`Maximal pain in under 24 h, often overnight; resolves within 14 days <sup class="c" data-ref="Neogi2015,Choi2015" title="Source 58,290">58,290</sup>`,
  img:`Double contour, tophus, DECT urate, overhanging-edge erosion <sup class="c" data-ref="Neogi2015,Thiele2007" title="Source 290,410">290,410</sup>`,
  who:`Men; hypertension or cardiovascular disease; raised serum urate <sup class="c" data-ref="Janssens2010,Richette2020" title="Source 180,332">180,332</sup>`},
 {id:'cppd',n:'Acute CPP crystal arthritis',
  joint:`Knee and wrist; crowned dens syndrome is a sufficient criterion <sup class="c" data-ref="Abhishek2023,Rosenthal2016" title="Source 2,339">2,339</sup>`,
  xtal:`Rhomboids with weak positive birefringence: blue when parallel <sup class="c" data-ref="Rosenthal2016,Jokic2020" title="Source 186,339">186,339</sup>`,
  fever:`Fever is reported <sup class="c" data-ref="Rosenthal2016,Ho1993" title="Source 165,339">165,339</sup>`,
  onset:`Rapid-onset inflammation is suggestive but not definitive <sup class="c" data-ref="Zhang2011CPPD" title="Source 447">447</sup>`,
  img:`Chondrocalcinosis; ultrasound LR 24.2 for peripheral joints <sup class="c" data-ref="Zhang2011CPPD" title="Source 447">447</sup>`,
  who:`Onset after 60 is a criteria item; osteoarthritis, hyperparathyroidism, haemochromatosis, low magnesium, Gitelman syndrome <sup class="c" data-ref="Abhishek2023,Zhang2011CPPD" title="Source 2,447">2,447</sup>`},
 {id:'septic',n:'Septic arthritis',
  joint:`Knee most often when it coexists with gout; septic shoulders were bacteraemic in 90% <sup class="c" data-ref="Yu2003,Papanicolas2012" title="Source 305,442">305,442</sup>`,
  xtal:`Crystals do not exclude it: infection in 1.5% of 265 crystal aspirates and 5% of crystal-positive joints <sup class="c" data-ref="Shah2007,Papanicolas2012" title="Source 305,363">305,363</sup>`,
  fever:`Fever sensitivity only 57%, rigors 19%; a third of septic gout cases had no fever <sup class="c" data-ref="Margaretten2007,Yu2003" title="Source 248,442">248,442</sup>`,
  onset:`Acute; the synovial white count and % neutrophils guide care before Gram stain and culture return <sup class="c" data-ref="Margaretten2007,Mathews2010" title="Source 248,251">248,251</sup>`,
  img:`No imaging hallmark; aspiration is the key test <sup class="c" data-ref="Mathews2010" title="Source 251">251</sup>`,
  who:`Older age, diabetes, RA, joint surgery, hip or knee prosthesis, skin infection, HIV <sup class="c" data-ref="Margaretten2007" title="Source 248">248</sup>`},
 {id:'cell',n:'Cellulitis',
  joint:`Skin, not joint: deep dermis and fat, with spreading redness, warmth, tenderness and swelling <sup class="c" data-ref="Raff2016" title="Source 321">321</sup>`,
  xtal:`None: not a joint disease <sup class="c" data-ref="Raff2016" title="Source 321">321</sup>`,
  fever:`Cultures are rarely positive: an organism is found in 15% <sup class="c" data-ref="Raff2016" title="Source 321">321</sup>`,
  onset:`No effective diagnostic test; the diagnosis is clinical <sup class="c" data-ref="Raff2016" title="Source 321">321</sup>`,
  img:DD_NONE,
  who:`30.5% of 259 people admitted with "lower-limb cellulitis" had another diagnosis <sup class="c" data-ref="Weng2017" title="Source 429">429</sup>`},
 {id:'reac',n:'Reactive arthritis',
  joint:`Acute oligoarthritis of larger joints <sup class="c" data-ref="Hannu2011" title="Source 155">155</sup>`,
  xtal:`None: sterile inflammation <sup class="c" data-ref="Hannu2011" title="Source 155">155</sup>`,
  fever:DD_NONE,
  onset:`2–4 weeks after a gut or urogenital infection <sup class="c" data-ref="Hannu2011" title="Source 155">155</sup>`,
  img:DD_NONE,
  who:`0.6–27 per 100,000 a year; HLA-B27 is not a diagnostic test <sup class="c" data-ref="Hannu2011" title="Source 155">155</sup>`},
 {id:'psa',n:'Psoriatic arthritis',
  joint:`Inflammatory joint disease, classified with CASPAR points <sup class="c" data-ref="Taylor2006CASPAR" title="Source 399">399</sup>`,
  xtal:DD_NONE,fever:DD_NONE,onset:DD_NONE,
  img:`Juxta-articular new bone formation <sup class="c" data-ref="Taylor2006CASPAR" title="Source 399">399</sup>`,
  who:`Current psoriasis 2 points; history or family history of psoriasis, dactylitis, new bone, negative RF, nail dystrophy 1 each; 3 or more classifies <sup class="c" data-ref="Taylor2006CASPAR" title="Source 399">399</sup>`},
 {id:'ra',n:'Rheumatoid arthritis',
  joint:`Many small joints; first MTP or midfoot as part of a polyarticular pattern is not specific for gout <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>`,
  xtal:DD_NONE,
  fever:`Acute-phase reactants are one criteria domain <sup class="c" data-ref="Aletaha2010" title="Source 6">6</sup>`,
  onset:`Symptom duration is a domain (2 levels, 0–1 point) <sup class="c" data-ref="Aletaha2010" title="Source 6">6</sup>`,
  img:DD_NONE,
  who:`2010 criteria: synovitis in ≥1 joint and ≥6 of 10 points from joint count (0–5), serology (0–3), acute-phase (0–1) and duration (0–1) <sup class="c" data-ref="Aletaha2010" title="Source 6">6</sup>`},
 {id:'oa',n:'Osteoarthritis',
  joint:`Knee and hand DIP joints <sup class="c" data-ref="Zhang2010OA,Neogi2015" title="Source 290,446">290,446</sup>`,
  xtal:`Occasional CPP crystals; non-inflammatory fluid <sup class="c" data-ref="Jokic2020" title="Source 186">186</sup>`,
  fever:`Morning stiffness is limited <sup class="c" data-ref="Zhang2010OA" title="Source 446">446</sup>`,
  onset:`Persistent pain with use <sup class="c" data-ref="Zhang2010OA" title="Source 446">446</sup>`,
  img:`Gull-wing erosions; DECT can falsely show "urate" in advanced knee OA <sup class="c" data-ref="Neogi2015,Bongartz2015" title="Source 25,290">25,290</sup>`,
  who:`Crepitus, restricted movement, bony enlargement <sup class="c" data-ref="Zhang2010OA" title="Source 446">446</sup>`}
];
const DD_CLUE=[
 {l:'Needle crystals, strongly negative',ids:['gout'],col:['xtal'],say:`MSU crystals in a symptomatic joint or tophus are the sufficient criterion for gout. They do not rule out infection in the same joint. <sup class="c" data-ref="Neogi2015,Shah2007" title="Source 290,363">290,363</sup>`},
 {l:'Rhomboid crystals, weakly positive',ids:['cppd','oa'],col:['xtal'],say:`CPP crystals point to CPP crystal arthritis, and they also turn up in osteoarthritic fluid. Trained observers identify CPP less reliably than MSU (kappa 0.79 vs 0.93). <sup class="c" data-ref="Rosenthal2016,Jokic2020,Lumbreras2005" title="Source 186,239,339">186,239,339</sup>`},
 {l:'First MTP, one or a few joints',ids:['gout'],col:['joint'],say:`First MTP involvement in a mono- or oligoarticular episode scores 2 points in the gout criteria, and it was the commonest joint pattern in SUGAR gout cases (39.4%). As part of a polyarticular presentation it is not specific. <sup class="c" data-ref="Neogi2015,Taylor2015" title="Source 290,403">290,403</sup>`},
 {l:'Knee or wrist, onset after 60',ids:['cppd','oa'],col:['joint','who'],say:`Knee and wrist involvement and age at onset over 60 are items in the 2023 CPPD criteria. Osteoarthritis also favours the knee. <sup class="c" data-ref="Abhishek2023,Zhang2010OA" title="Source 2,446">2,446</sup>`},
 {l:'Maximal pain within 24 h, gone in 2 weeks',ids:['gout'],col:['onset'],say:`A typical gout episode has at least 2 of: maximal pain in under 24 h, resolution within 14 days, complete resolution between episodes. Flares often begin overnight (odds ratio 2.36 vs daytime). <sup class="c" data-ref="Neogi2015,Choi2015" title="Source 58,290">58,290</sup>`},
 {l:'Fever',ids:['gout','cppd','septic'],col:['fever'],say:`Fever does not separate them. It occurred in 34% of hospitalised people with crystal arthritis, and in septic arthritis its sensitivity was only 57%. <sup class="c" data-ref="Ho1993,Margaretten2007" title="Source 165,248">165,248</sup>`},
 {l:'Prosthesis, diabetes, RA or skin infection',ids:['septic'],col:['who'],say:`These raise the risk of septic arthritis. The joint needs aspirating, with a cell count, Gram stain and culture. <sup class="c" data-ref="Margaretten2007,Mathews2010" title="Source 248,251">248,251</sup>`},
 {l:'Spreading skin redness, no joint swelling',ids:['cell'],col:['joint'],say:`Cellulitis sits in the deep dermis and fat. There is no diagnostic test, and 30.5% of admitted "cellulitis" in one series was something else. <sup class="c" data-ref="Raff2016,Weng2017" title="Source 321,429">321,429</sup>`},
 {l:'Weeks after a gut or urinary infection',ids:['reac'],col:['onset'],say:`Reactive arthritis follows a gut or urogenital infection by 2–4 weeks and affects larger joints. <sup class="c" data-ref="Hannu2011" title="Source 155">155</sup>`},
 {l:'Psoriasis, dactylitis or nail changes',ids:['psa'],col:['who'],say:`These score CASPAR points for psoriatic arthritis: current psoriasis 2, the others 1 each, with 3 or more classifying. <sup class="c" data-ref="Taylor2006CASPAR" title="Source 399">399</sup>`},
 {l:'Many small joints at once',ids:['ra'],col:['joint'],say:`A polyarticular small-joint pattern points to RA. First MTP or midfoot involvement as part of it does not count toward gout. <sup class="c" data-ref="Aletaha2010,Neogi2015" title="Source 6,290">6,290</sup>`},
 {l:'Hand DIP joints, gull-wing erosions',ids:['oa'],col:['joint','img'],say:`DIP joints and the gull-wing pattern are excluded from the gout erosion item because they occur in osteoarthritis. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>`}
];
/* likelihood ratios by synovial white count cut-off (Margaretten 2007) */
const DD_LRC=[{lo:0,hi:25000,lr:.32,l:'under 25,000',c:'var(--sea)'},{lo:25000,hi:50000,lr:2.9,l:'25,000 or more',c:'var(--warn)'},{lo:50000,hi:100000,lr:7.7,l:'over 50,000',c:'var(--terra)'},{lo:100000,hi:150000,lr:28,l:'over 100,000',c:'var(--bad)'}];
const ddLR=w=>w<25000?DD_LRC[0]:w<=50000?DD_LRC[1]:w<=100000?DD_LRC[2]:DD_LRC[3];
const DD_STEPS=[
 {from:0,at:.08,k:'Count under 25,000',t:'A low count lowers the odds',
  txt:`Across 14 studies (6,242 patients, 653 with septic arthritis), a synovial white count under 25,000/µL had a likelihood ratio of 0.32. That lowers the odds of infection but does not remove them. The mean count in 265 crystal-positive aspirates was 23,200/µL. <sup class="c" data-ref="Margaretten2007,Shah2007" title="Source 248,363">248,363</sup>`,
  pt:'A low cell count makes infection less likely, not impossible.',
  hook:`Synovial white count under 25,000/µL: <b>LR 0.32</b> for septic arthritis. <sup class="c" data-ref="Margaretten2007" title="Source 248">248</sup>`},
 {from:25000/150000,at:.25,k:'Count 25,000 or more',t:'Above 25,000 the odds rise',
  txt:`At 25,000/µL or more the LR was 2.9. Crystal arthritis lives here too: inflammatory fluid runs 2,000–50,000/µL in gout, CPPD and RA. <sup class="c" data-ref="Margaretten2007,Jokic2020" title="Source 186,248">186,248</sup>`,
  pt:'This range is common in gout flares as well as in infection.'},
 {from:50000/150000,at:.45,k:'Count over 50,000',t:'Over 50,000: LR 7.7, still not proof',
  txt:`Over 50,000/µL the LR was 7.7. But fluid in acute gout can exceed 50,000/µL, mostly neutrophils, and a 50,000 cut-off missed 39% of 49 culture-proven septic joints. Neutrophils of 90% or more gave an LR of 3.4. <sup class="c" data-ref="Margaretten2007,Ragab2017,McGillicuddy2007" title="Source 248,260,322">248,260,322</sup>`,
  pt:'A very high count points toward infection, but gout can do this too, and some infected joints have lower counts.',
  hook:`A 50,000/µL cut-off had a sensitivity of only <b>61%</b> for septic arthritis. <sup class="c" data-ref="McGillicuddy2007" title="Source 260">260</sup>`},
 {from:100000/150000,at:.8,k:'Count over 100,000',t:'Over 100,000: LR 28',
  txt:`Over 100,000/µL the LR was 28.0. The 4 aspirates that held both crystals and bacteria had a mean count of 113,000/µL, and all 4 patients had major comorbidities. <sup class="c" data-ref="Margaretten2007,Shah2007" title="Source 248,363">248,363</sup>`,
  pt:'Counts this high strongly suggest infection, even if gout crystals are also there.',
  hook:`Synovial white count over 100,000/µL: <b>LR 28</b>. <sup class="c" data-ref="Margaretten2007" title="Source 248">248</sup>`},
 {from:.9,at:1,k:'Crystals + infection',t:'Crystals do not exclude infection',
  txt:`Of 265 crystal-positive aspirates, 4 (1.5%) were also infected; another series found infection in 5% of crystal-positive joints. Coexistence is very unlikely only when the Gram stain is negative, CRP is under 100 mg/L and the joint count is under 10,000/µL. <sup class="c" data-ref="Shah2007,Papanicolas2012" title="Source 305,363">305,363</sup>`,
  pt:'Finding gout crystals does not prove the joint is free of infection.',
  hook:`Gout and septic arthritis can coexist: <b>1.5–5%</b> of crystal-positive joints are also infected. <sup class="c" data-ref="Shah2007,Papanicolas2012" title="Source 305,363">305,363</sup>`}
];
inits.ddx=()=>{
  /* ================= the matrix ================= */
  let clue=-1,col='all';
  $('#ddHead').innerHTML=`<tr><th>Condition</th>${DD_COLS.map(([k,l])=>`<th data-ddh="${k}">${l}</th>`).join('')}</tr>`;
  $('#ddTbl').innerHTML=DD_DZ.map(D=>`<tr data-dd="${D.id}"><th>${D.n}</th>${DD_COLS.map(([k])=>`<td data-ddk="${k}">${D[k]}</td>`).join('')}</tr>`).join('');
  $('#ddCards').innerHTML=DD_DZ.map(D=>`<article class="dd-card${D.id==='gout'?' gout':''}" data-dd="${D.id}"><h4>${D.n}</h4><dl>${DD_COLS.map(([k,l])=>`<div data-ddk="${k}"><dt>${l}</dt><dd>${D[k]}</dd></div>`).join('')}</dl></article>`).join('');
  $('#ddClues').innerHTML=DD_CLUE.map((c,i)=>`<button class="btn" data-ddc="${i}" aria-pressed="false">${c.l}</button>`).join('');
  $('#ddCols').innerHTML=`<button class="btn" data-ddf="all" aria-pressed="true">All</button>`+DD_COLS.map(([k,l])=>`<button class="btn" data-ddf="${k}" aria-pressed="false">${l}</button>`).join('');
  function paint(){
    const C=clue>=0?DD_CLUE[clue]:null,ids=C?C.ids:null,cols=col!=='all'?[col]:C?C.col:[];
    $$('#m-ddx [data-dd]').forEach(r=>{const on=ids&&ids.includes(r.dataset.dd);r.classList.toggle('on',!!on);r.classList.toggle('dim',!!ids&&!on)});
    $$('#m-ddx [data-ddk]').forEach(c=>c.classList.toggle('fx',cols.includes(c.dataset.ddk)));
    $$('#m-ddx [data-ddh]').forEach(h=>h.classList.toggle('fx',cols.includes(h.dataset.ddh)));
    /* on a phone, "compare one feature" trims each card to that feature */
    $$('#ddCards [data-ddk]').forEach(c=>c.hidden=col!=='all'&&c.dataset.ddk!==col);
    $$('[data-ddc]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ddc===clue));
    $$('[data-ddf]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ddf===col));
    const o=$('#ddClueOut');
    if(!C)o.innerHTML=`<span class="kicker">No clue selected</span><span>Choose a clue above. The matching rows light up, and the feature that gives them away is outlined.</span>`;
    else o.innerHTML=`<span class="kicker">Points toward</span><b class="big">${C.ids.map(i=>DD_DZ.find(d=>d.id===i).n).join(' · ')}</b><span>${C.say}</span>`}
  $('#ddClues').addEventListener('click',e=>{const b=e.target.closest('[data-ddc]');if(!b)return;const i=+b.dataset.ddc;clue=clue===i?-1:i;paint()});
  $('#ddCols').addEventListener('click',e=>{const b=e.target.closest('[data-ddf]');if(!b)return;col=b.dataset.ddf;paint()});
  paint();

  /* ================= synovial white count and the odds ================= */
  const svg=$('#ddSvg'),rg=$('#ddT');
  /* a fixed scatter of the 4 infected aspirates among 265 */
  const INF=[37,112,171,238];
  function draw(t){
    const N=vb(svg,'720 420','330 580'),w=Math.round(Math.min(1,t)*150000),B=ddLR(w);
    const L=N?{X0:14,X1:316,ty:14,by:58,bh:44,lab:118,jy:136,ly:226,lh:22,wy:350,cols:19,gap:15.5,wx:22,r:5}
             :{X0:40,X1:680,ty:14,by:46,bh:46,lab:110,jy:128,ly:212,lh:24,wy:316,cols:53,gap:12,wx:46,r:4.2};
    const xs=v=>L.X0+v/150000*(L.X1-L.X0);
    let s=`<text x="${L.X0}" y="${L.ty}" class="t-sm">${N?'SYNOVIAL WHITE CELLS /µL · LR FOR SEPSIS':'SYNOVIAL WHITE CELLS /µL AND THE LIKELIHOOD RATIO FOR SEPTIC ARTHRITIS (MARGARETTEN 2007)'}</text>`;
    DD_LRC.forEach(b=>{const on=b===B;
      s+=`<rect x="${f1(xs(b.lo))}" y="${L.by}" width="${f1(xs(b.hi)-xs(b.lo))}" height="${L.bh}" style="fill:${b.c};opacity:${on?.34:.12}"/>`;
      s+=`<text x="${f1((xs(b.lo)+xs(b.hi))/2)}" y="${L.by+L.bh/2+5}" class="t-lbl t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};${N?'font-size:11px':''}">${N?'':'LR '}${b.lr===28?'28.0':b.lr}</text>`});
    s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${L.by+L.bh}" y2="${L.by+L.bh}" class="axis"/>`;
    [0,25000,50000,100000,150000].forEach(v=>{s+=`<line x1="${f1(xs(v))}" x2="${f1(xs(v))}" y1="${L.by+L.bh}" y2="${L.by+L.bh+5}" class="axis"/><text x="${f1(xs(v))}" y="${L.lab}" class="t-xs ${v===150000?'t-end':v===0?'':'t-mid'}">${N&&v?v/1000+'k':v.toLocaleString('en')}</text>`});
    /* Jokic 2020 categories under the axis */
    const jy=L.jy;
    s+=`<path d="M${f1(xs(2000))} ${jy} v6 H${f1(xs(50000))} v-6" style="fill:none;stroke:var(--warn);stroke-width:1.5"/><text x="${f1(xs(2000))}" y="${jy+20}" class="t-xs" style="fill:var(--warn)">${N?'inflammatory: gout, CPPD, RA':'inflammatory 2,000–50,000: gout, CPPD, RA'}</text>`;
    s+=`<path d="M${f1(xs(50000)+3)} ${jy+28} v6 H${L.X1} v-6" style="fill:none;stroke:var(--bad);stroke-width:1.5"/><text x="${L.X1}" y="${jy+48}" class="t-xs t-end" style="fill:var(--bad)">septic range over 50,000 (Jokic 2020)</text>`;
    /* reference marks */
    const mk=(v,c,lbl,up)=>`<line x1="${f1(xs(v))}" x2="${f1(xs(v))}" y1="${L.by-6}" y2="${L.by+L.bh}" style="stroke:${c};stroke-width:2;stroke-dasharray:3 2"/><text x="${f1(xs(v))}" y="${L.by-9-(up?11:0)}" class="t-xs ${v>90000?'t-end':'t-mid'}" style="fill:${c};font-weight:700">${lbl}</text>`;
    s+=mk(23200,'var(--xtal)',N?'crystal mean 23,200':'mean in crystal aspirates 23,200',0);
    s+=mk(113000,'var(--bad)',N?'crystal + infection 113,000':'crystals + infection: mean 113,000',N);
    /* the moving count */
    s+=`<line x1="${f1(xs(w))}" x2="${f1(xs(w))}" y1="${L.by-2}" y2="${L.by+L.bh+2}" style="stroke:var(--ink);stroke-width:3"/><circle cx="${f1(xs(w))}" cy="${L.by+L.bh}" r="6" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    /* LR on a log scale: left lowers the odds, right raises them */
    const lx=v=>L.X0+(Math.log10(v)+1)/3*(L.X1-L.X0),ly=L.ly;
    s+=`<text x="${L.X0}" y="${ly-16}" class="t-sm">LIKELIHOOD RATIO · LOG SCALE</text>`;
    s+=`<rect x="${L.X0}" y="${ly}" width="${L.X1-L.X0}" height="${L.lh}" rx="5" style="fill:var(--panel-2)"/>`;
    const a=lx(1),b=lx(B.lr);s+=`<rect x="${f1(Math.min(a,b))}" y="${ly}" width="${f1(Math.abs(b-a))}" height="${L.lh}" rx="4" style="fill:${B.c};opacity:.85"/>`;
    s+=`<line x1="${f1(a)}" x2="${f1(a)}" y1="${ly-4}" y2="${ly+L.lh+4}" style="stroke:var(--ink);stroke-width:2"/>`;
    [.1,.32,1,2.9,7.7,28,100].forEach(v=>{s+=`<text x="${f1(lx(v))}" y="${ly+L.lh+16}" class="t-xs ${v===.1?'':v===100?'t-end':'t-mid'}" style="fill:${v===B.lr?'var(--ink)':'var(--muted)'};font-weight:${v===B.lr?700:500}">${v}</text>`});
    s+=`<text x="${f1(a-6)}" y="${ly+L.lh+32}" class="t-xs t-end" style="fill:var(--sea)">← lowers the odds</text><text x="${f1(a+6)}" y="${ly+L.lh+32}" class="t-xs" style="fill:var(--bad)">raises the odds →</text>`;
    /* 265 crystal-positive aspirates, 4 infected (Shah 2007) */
    const op=ramp(t,.86,.97),wy=L.wy;
    s+=`<text x="${L.X0}" y="${wy-18}" class="t-sm" style="opacity:${f1(.35+.65*op)}">${N?'265 CRYSTAL-POSITIVE ASPIRATES':'265 CRYSTAL-POSITIVE ASPIRATES · 4 ALSO INFECTED (1.5%) · SHAH 2007'}</text>`;
    if(N)s+=`<text x="${L.X0}" y="${wy-5}" class="t-xs" style="opacity:${f1(.35+.65*op)}">4 also infected (1.5%) · Shah 2007</text>`;
    const wy0=wy+(N?8:0);
    for(let i=0;i<265;i++){const cx=L.wx+(i%L.cols)*L.gap,cy=wy0+Math.floor(i/L.cols)*L.gap,inf=INF.includes(i);
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${inf?L.r+1.2*op:L.r}" style="fill:${inf&&op>0?'var(--bad)':'var(--xtal)'};opacity:${f1(inf?.25+.75*op:.18+.4*op)}${inf&&op>.5?';stroke:var(--ink);stroke-width:1.5':''}"/>`}
    svg.innerHTML=s;
    const p=phaseOf(DD_STEPS,t);setSt(p);$('#ddNote').innerHTML=noteHTML(DD_STEPS[p]);
    $('#ddRead').innerHTML=`<span>white count <b>${w.toLocaleString('en')}/µL</b></span><span>cut-off <b>${B.l}</b></span><span>LR <b>${B.lr===28?'28.0':B.lr}</b></span>`;
  }
  const stop=playWire(rg,$('#ddPlay'),draw,15000,'Replay','ddx');
  const setSt=stepWire($('#ddSteps'),DD_STEPS,rg,draw,stop);
  draw(+rg.value);
};
/* =============== 4.3 gout, kidneys & heart =============== */
const LK_STEPS=[
 {from:0,at:.12,k:'Scene 1 · Kidney',t:'CKD raises urate, and gout is common in CKD',f:[1,2],e0:2,
  txt:`Reduced kidney function raises serum urate, so CKD drives hyperuricaemia and gout. <sup class="c" data-ref="Johnson2018" title="Source 185">185</sup> A meta-analysis of 17 observational studies found CKD stage ≥ 3 in 24% of people with gout, with a pooled adjusted OR of 2.41. <sup class="c" data-ref="Roughley2015" title="Source 341">341</sup> Seen from the other side, 24.3% of 5,085 people in the German CKD cohort reported gout, rising from 16.0% at eGFR ≥ 60 to 35.6% below 30 mL/min/1.73 m². <sup class="c" data-ref="Jing2015" title="Source 184">184</sup> Whether urate itself injures the kidney is unsettled: Mendelian randomisation found no causal effect on eGFR or CKD. <sup class="c" data-ref="Jordan2019" title="Source 189">189</sup>`,
  pt:`About one person in four with gout has kidney disease, and about one in four with kidney disease has gout. Weak kidneys hold on to urate.`,
  hook:`CKD → high urate is established; urate → CKD is a <b>hypothesis</b>. CKD ≥ 3 in gout <b>24%</b>; gout in CKD <b>24.3%</b>.`},
 {from:.3,at:.42,k:'Scene 2 · Stones',t:'Uric acid stones',f:[3,0],e0:3,
  txt:`Self-reported kidney stones were found in 14% of people with gout (pooled OR 1.77). <sup class="c" data-ref="Roughley2015" title="Source 341">341</sup> In 51,529 men, gout roughly doubled the risk of new stones (RR 2.12), while a history of stones did not raise the risk of gout (RR 1.05). <sup class="c" data-ref="Kramer2003" title="Source 218">218</sup> Uric acid stones are about 10% of all stones. Below a urine pH of 5.5 almost all uric acid is undissociated and the urine becomes supersaturated; persistently low pH, high urinary uric acid and low urine volume drive them. <sup class="c" data-ref="AbouElela2017" title="Source 4">4</sup> Urine pH falls as body weight rises. <sup class="c" data-ref="Maalouf2004" title="Source 240">240</sup> Of 136 outcomes studied for urate, only gout and kidney stones had convincing evidence of a causal role. <sup class="c" data-ref="Li2017" title="Source 230">230</sup>`,
  pt:`Gout makes kidney stones about twice as likely. Acid urine lets uric acid come out of solution and clump into stones.`,
  hook:`Uric acid stones form in persistently acidic urine (<b>pH &lt; 5.5</b>). Urate → stones and urate → gout are the two convincing causal links.`},
 {from:.55,at:.7,k:'Scene 3 · Heart',t:'Flares and cardiovascular events',f:[5,6,4],e0:6,
  txt:`In 62,574 people with gout in English primary care, heart attacks and strokes ran at 2.49 per 1000 person-days in the 60 days after a flare, 2.16 in days 61–120 and 1.70 in days 121–180, against 1.32 in reference periods. People with a cardiovascular event had higher odds of a flare in the previous 60 days (OR 1.93), but not 121–180 days before (OR 1.06). <sup class="c" data-ref="Cipolletta2022" title="Source 59">59</sup> Over the long term, gout carries higher cardiovascular mortality (HR 1.29) and coronary mortality (HR 1.42). <sup class="c" data-ref="Clarson2015" title="Source 61">61</sup> Mendelian randomisation does not support urate itself as the cause. <sup class="c" data-ref="Keenan2016,White2016" title="Source 199,430">199,430</sup>`,
  pt:`In the two months after a flare, the chance of a heart attack or stroke goes up for a while. It then settles back down.`,
  hook:`Flare → CV event odds about double in the next 60 days (<b>OR 1.93</b>) and are back to baseline by 121–180 days (<b>OR 1.06</b>).`},
 {from:.8,at:.95,k:'Scene 4 · Does treating help?',t:'What the trials show',f:[2,4,5],e0:5,
  txt:`Allopurinol did not slow CKD in CKD-FIX or PERL, and FEATHER (febuxostat) missed its primary endpoint. <sup class="c" data-ref="Badve2020,Doria2020,Kimura2018" title="Source 11,96,206">11,96,206</sup> In ALL-HEART, allopurinol did not reduce MACE in ischaemic heart disease (HR 1.04). <sup class="c" data-ref="Mackenzie2022" title="Source 242">242</sup> Across 28 trials, urate lowering did not reduce kidney failure, MACE or death. <sup class="c" data-ref="Chen2020" title="Source 40">40</sup> Low-dose colchicine cut cardiovascular events in COLCOT (HR 0.77) and LoDoCo2 (HR 0.69) but not in CLEAR SYNERGY (HR 0.99). <sup class="c" data-ref="Tardif2019,Nidorf2020,Jolly2025" title="Source 187,294,397">187,294,397</sup> KDIGO 2024 suggests not lowering urate in CKD without gout to slow the kidney's decline. <sup class="c" data-ref="KDIGO2024" title="Source 197">197</sup>`,
  pt:`Lowering urate treats gout, but it has not been shown to protect the kidneys or heart in people without gout. A low dose of colchicine helped the heart in two of three big trials.`,
  hook:`Association is not causation: allopurinol did not slow CKD in <b>CKD-FIX</b> or <b>PERL</b>, or prevent MACE in <b>ALL-HEART</b>.`}
];
/* the network. w = wide position, r = radius. Narrow mode lists the links instead. */
const LK_N={
 urate:{w:[78,214],r:30,l:['Serum','urate'],nn:'Serum urate',c:'gold'},
 gout:{w:[232,214],r:38,l:['Gout'],nn:'Gout',c:'terra'},
 ckd:{w:[78,74],r:30,l:['CKD'],nn:'CKD',sub:'chronic kidney disease',sy:-1},
 stones:{w:[360,74],r:30,l:['Kidney','stones'],nn:'Kidney stones'},
 htn:{w:[400,214],r:32,l:['High blood','pressure'],nn:'High BP'},
 cvd:{w:[360,354],r:30,l:['Heart &amp;','vessels'],nn:'Heart &amp; vessels',sub:'cardiovascular disease',sy:1},
 met:{w:[78,354],r:32,l:['Metabolic','syndrome'],nn:'Metabolic synd.',sub:'obesity · diabetes',sy:1}
};
const LK_EV={est:['Established','var(--good)','est'],early:['Early evidence','var(--warn)','early'],hyp:['Hypothesis','var(--crocus)','hyp']};
const LK_E=[
 {a:'urate',b:'gout',arr:1,lt:.5,m:'OR 3.41–6.04',src:'Jordan 2019 · MR, per 1 mg/dL',s:'est',q:'Urate → gout',
  d:`In Mendelian randomisation, genetically higher urate strongly predicted gout: OR 3.41 to 6.04 per 1 mg/dL [59.48 µmol/L], the positive control that showed the method worked. <sup class="c" data-ref="Jordan2019" title="Source 189">189</sup> A second study gave OR 5.84 per standard deviation. <sup class="c" data-ref="Keenan2016" title="Source 199">199</sup> An umbrella review of 136 outcomes found convincing evidence of a causal role for urate only in gout and kidney stones. <sup class="c" data-ref="Li2017" title="Source 230">230</sup>`},
 {a:'ckd',b:'urate',arr:1,lt:.5,m:'gout 16.0→35.6%',src:'Jing 2015 · eGFR ≥60 → <30',s:'est',q:'CKD → urate',
  d:`Reduced kidney function raises serum urate: this direction is not in doubt. <sup class="c" data-ref="Johnson2018" title="Source 185">185</sup> In the German CKD cohort, self-reported gout rose from 16.0% at eGFR ≥ 60 to 35.6% below 30 mL/min/1.73 m² (prevalence ratio 1.46). Of those with gout, 30.7% took no gout medicine, and 47.2% of those on urate-lowering therapy were still hyperuricaemic. <sup class="c" data-ref="Jing2015" title="Source 184">184</sup> In Framingham, CKD carried an adjusted HR for gout of 1.88 in men and 2.31 in women. <sup class="c" data-ref="Wang2015" title="Source 425">425</sup>`},
 {a:'gout',b:'ckd',lt:.45,m:'OR 2.41',src:'Roughley 2015 · 17 studies',s:'hyp',q:'Gout ↔ CKD',
  d:`Gout is associated with CKD (pooled adjusted OR 2.41, 1.86–3.11), and 24% of people with gout have CKD stage ≥ 3. <sup class="c" data-ref="Roughley2015" title="Source 341">341</sup> People with new gout developed CKD stage ≥ 3 at 28.6 vs 15.8 per 10,000 person-years (adjusted HR 1.78), and advanced CKD at HR 1.29, highest for end-stage kidney disease (HR 2.13). <sup class="c" data-ref="Roughley2018,Stack2019" title="Source 342,377">342,377</sup> Causation is a hypothesis: Mendelian randomisation found no effect of urate on eGFR or CKD despite an observational OR of 1.48 per 1 mg/dL, and allopurinol did not slow CKD in two trials. <sup class="c" data-ref="Jordan2019,Badve2020,Doria2020" title="Source 11,96,189">11,96,189</sup> Starting allopurinol at ≥ 300 mg/day was not linked to kidney harm (HR 0.87 for CKD ≥ 3). <sup class="c" data-ref="VargasSantos2018" title="Source 420">420</sup>`},
 {a:'gout',b:'stones',lt:.5,m:'OR 1.77',src:'Roughley 2015 · pooled',s:'est',q:'Gout ↔ kidney stones',
  d:`Lifetime stones were reported by 14% of people with gout (pooled adjusted OR 1.77). <sup class="c" data-ref="Roughley2015" title="Source 341">341</sup> In 51,529 men, 15% with gout had a stone history against 8% without, and confirmed gout raised the risk of new stones (RR 2.12). <sup class="c" data-ref="Kramer2003" title="Source 218">218</sup> Here causation is established: the umbrella review counts stones and gout as the only convincing causal outcomes of urate. <sup class="c" data-ref="Li2017" title="Source 230">230</sup> Allopurinol prevented recurrent calcium oxalate stones in people with high urinary uric acid (0.12 vs 0.26 events per patient-year). <sup class="c" data-ref="Ettinger1986" title="Source 113">113</sup>`},
 {a:'gout',b:'htn',lt:.5,m:'RR 2.31',src:'Choi 2005 · hypertension → gout',s:'hyp',q:'Gout ↔ high blood pressure',
  d:`Hypertension raises the risk of gout (RR 2.31), and so do diuretics (RR 1.77). <sup class="c" data-ref="Choi2005" title="Source 48">48</sup> High urate predicts new hypertension in 18 cohorts (RR 1.41; 1.13 per 1 mg/dL), more so in younger people. <sup class="c" data-ref="Grayson2011" title="Source 150">150</sup> In 30 adolescents, allopurinol lowered blood pressure in a small 4-week crossover trial that its authors called preliminary. <sup class="c" data-ref="Feig2008" title="Source 131">131</sup> Mendelian randomisation in 68,674 Danes found no causal link between urate and blood pressure, but did find that BMI raises urate, so weight may confound the observational link. <sup class="c" data-ref="Palmer2013" title="Source 304">304</sup> Across 28 trials, urate lowering lowered systolic pressure by 3.45 mm Hg. <sup class="c" data-ref="Chen2020" title="Source 40">40</sup>`},
 {a:'gout',b:'cvd',lt:.5,m:'HR 1.29',src:'Clarson 2015 · CVD death',s:'hyp',q:'Gout ↔ cardiovascular disease',
  d:`In 6 studies of 223,448 people, gout raised cardiovascular mortality (HR 1.29) and coronary mortality (HR 1.42). <sup class="c" data-ref="Clarson2015" title="Source 61">61</sup> In 51,297 men, gout carried RR 1.55 for fatal coronary disease, and in MRFIT the odds of a heart attack were 1.26 times higher, holding without diuretics, alcohol, diabetes or obesity. <sup class="c" data-ref="Choi2007Circ,Krishnan2006" title="Source 50,220">50,220</sup> Causation by urate is a hypothesis: urate-specific and pleiotropy-robust Mendelian randomisation is null for coronary disease, and allopurinol did not reduce MACE in ALL-HEART. <sup class="c" data-ref="Keenan2016,White2016,Mackenzie2022" title="Source 199,242,430">199,242,430</sup>`},
 {a:'gout',b:'cvd',arr:1,cv:[226,346],lt:.5,m:'flare OR 1.93',src:'Cipolletta 2022 · 0–60 days',s:'early',q:'Gout flare → CV event',na:'Gout flare',
  d:`Cardiovascular events cluster after flares. The odds of a flare in the 0–60 days before a heart attack or stroke were 1.93, and 1.57 for days 61–120. Event rates were 2.49, 2.16 and 1.70 per 1000 person-days in the three windows after a flare, against 1.32 at other times; two study designs agreed. <sup class="c" data-ref="Cipolletta2022" title="Source 59">59</sup> This points to inflammation rather than urate: in people starting urate-lowering therapy, colchicine prophylaxis was linked to fewer heart attacks and strokes (HR 0.82). Both findings are observational. <sup class="c" data-ref="Cipolletta2025" title="Source 60">60</sup>`},
 {a:'met',b:'urate',arr:1,lt:.5,m:'BMI raises urate',src:'Palmer 2013 · MR',s:'early',q:'Weight → urate',
  d:`Mendelian randomisation found that higher BMI causally raises urate (+0.03 mmol/L per 4 BMI units; +7.5% risk of hyperuricaemia). <sup class="c" data-ref="Palmer2013" title="Source 304">304</sup> Gout risk rises by RR 1.55 per 5 BMI units in a meta-analysis of 10 prospective studies. <sup class="c" data-ref="Aune2014" title="Source 10">10</sup> Urine pH also falls as weight rises, which favours uric acid stones. <sup class="c" data-ref="Maalouf2004" title="Source 240">240</sup>`},
 {a:'gout',b:'met',lt:.3,m:'OR 3.05',src:'Choi 2007 · NHANES III',s:'early',q:'Gout ↔ metabolic syndrome',
  d:`Metabolic syndrome was present in 62.8% of people with gout against 25.4% without (age- and sex-adjusted OR 3.05), about 3.5 million US adults. <sup class="c" data-ref="Choi2007AR" title="Source 49">49</sup> In NHANES 2007–2008, 53% of adults with gout were obese and 26% had diabetes. <sup class="c" data-ref="Zhu2012" title="Source 454">454</sup> In high-risk men, gout at baseline carried RR 1.34 for new type 2 diabetes, 1.26 after adjusting for urate. <sup class="c" data-ref="Choi2008Rheum" title="Source 54">54</sup>`}
];
inits.links=()=>{
  const svg=$('#lkSvg'),rg=$('#lkT');let mode='assoc',sel=null,selP=-1;
  const curE=p=>(sel!=null&&selP===p)?sel:LK_STEPS[p].e0;
  /* wide geometry: each link starts and ends at the node circles */
  const GEO=LK_E.map(e=>{const A=LK_N[e.a],B=LK_N[e.b],[ax,ay]=A.w,[bx,by]=B.w,gap=e.arr?5:2;
    if(e.cv){const [cx,cy]=e.cv,ua=Math.atan2(cy-ay,cx-ax),ub=Math.atan2(cy-by,cx-bx);
      const p0=[ax+A.r*Math.cos(ua),ay+A.r*Math.sin(ua)],p2=[bx+(B.r+gap)*Math.cos(ub),by+(B.r+gap)*Math.sin(ub)];
      const at=u=>[(1-u)*(1-u)*p0[0]+2*(1-u)*u*cx+u*u*p2[0],(1-u)*(1-u)*p0[1]+2*(1-u)*u*cy+u*u*p2[1]];
      return {d:`M${f1(p0[0])} ${f1(p0[1])}Q${cx} ${cy} ${f1(p2[0])} ${f1(p2[1])}`,at}}
    const L=Math.hypot(bx-ax,by-ay),ux=(bx-ax)/L,uy=(by-ay)/L,p0=[ax+ux*A.r,ay+uy*A.r],p1=[bx-ux*(B.r+gap),by-uy*(B.r+gap)];
    return {d:`M${f1(p0[0])} ${f1(p0[1])}L${f1(p1[0])} ${f1(p1[1])}`,at:u=>[lerp(p0[0],p1[0],u),lerp(p0[1],p1[1],u)]}});
  const MK={'var(--muted)':'lkMm','var(--terra)':'lkMt','var(--good)':'lkMg','var(--crocus)':'lkMc','var(--warn)':'lkMw','var(--gold)':'lkMo'};
  /* arrowheads in user units, so a thick selected link does not grow a giant head */
  const defs=()=>`<defs>${Object.entries(MK).map(([c,id])=>`<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${c}"/></marker>`).join('')}</defs>`;
  const ecol=(e,i,foc)=>mode==='cause'?LK_EV[e.s][1]:(foc.has(i)?'var(--terra)':'var(--muted)');
  const dash=e=>mode!=='cause'?'':e.s==='hyp'?';stroke-dasharray:6 4':e.s==='early'?';stroke-dasharray:2 4':'';
  const pill=(x,y,txt,col,fill='var(--panel)',w)=>{w=w||txt.replace(/&[a-z]+;/g,'&').length*5.8+12;return `<rect class="lk-pill" x="${f1(x-w/2)}" y="${f1(y-9)}" width="${f1(w)}" height="18" rx="9" style="fill:${fill};stroke:${col};stroke-width:1.3"/><text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:${col};font-weight:600">${txt}</text>`};
  /* ---------- the scene panels ---------- */
  function panel(p,t,X,Y,W){
    let s='';const T=(y,txt,cls='t-sm',st='')=>`<text x="${X}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
    const bar=(y,v,mx,col,lbl,src,val,k)=>{const w=W*v/mx*k;let b=`<text x="${X}" y="${y}" class="t-lbl" style="font-size:12px">${lbl}</text>`;if(src)b+=`<text x="${X}" y="${y+13}" class="t-xs">${src}</text>`;const by=y+(src?18:6);
      return b+`<rect x="${X}" y="${by}" width="${W}" height="13" rx="4" style="fill:var(--panel-2)"/><rect x="${X}" y="${by}" width="${f1(w)}" height="13" rx="4" style="fill:${col}"/><text x="${f1(X+w+6)}" y="${by+10.5}" class="t-xs" style="fill:${col};font-weight:700;opacity:${f1(ramp(k,.4,1))}">${val}</text>`};
    if(p===0){const k=ease(ramp(t,0,.1)),k2=ease(ramp(t,.02,.12));
      s+=T(Y,'ONE IN FOUR, BOTH WAYS','t-sm','fill:var(--terra)');
      s+=bar(Y+24,24,50,'var(--terra)','CKD stage ≥3 in people with gout','Roughley 2015 · 17 studies','24%',k);
      s+=bar(Y+74,24.3,50,'var(--terra)','Gout in people with CKD','Jing 2015 · German CKD cohort, 5,085','24.3%',k2);
      s+=T(Y+138,'GOUT BY KIDNEY FUNCTION · Jing 2015','t-sm');
      s+=bar(Y+158,16.0,50,'var(--gold)','eGFR ≥ 60 mL/min/1.73 m²','','16.0%',k);
      s+=bar(Y+196,35.6,50,'var(--gold)','eGFR &lt; 30 mL/min/1.73 m²','','35.6%',k2);
      const L=['Low kidney function raises urate:','established. Urate harming the kidney:','not supported by MR or trials.'];
      L.forEach((l,i)=>s+=T(Y+248+i*14,l,'t-xs','fill:var(--ink)'));
      s+=T(Y+302,'New CKD ≥3: HR 1.78 · Roughley 2018','t-xs');
      s+=T(Y+316,'Advanced CKD: HR 1.29 · Stack 2019','t-xs');}
    else if(p===1){const k=ease(ramp(t,.3,.42)),ph=lerp(6.3,5.1,k),px=v=>X+W*(v-4.5)/2.5,R=rng(17);
      s+=T(Y,'URINE pH AND URIC ACID','t-sm','fill:var(--terra)');
      s+=`<rect x="${X}" y="${Y+30}" width="${W}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${X}" y="${Y+30}" width="${f1(px(5.5)-X)}" height="14" rx="4" style="fill:var(--gold-soft);stroke:var(--gold)"/>`;
      [4.5,5,5.5,6,6.5,7].forEach(v=>s+=`<text x="${f1(px(v))}" y="${Y+58}" class="t-xs ${v===4.5?'':v===7?'t-end':'t-mid'}">${v}</text>`);
      s+=`<line x1="${f1(px(5.5))}" x2="${f1(px(5.5))}" y1="${Y+24}" y2="${Y+48}" style="stroke:var(--gold);stroke-width:2"/>`;
      s+=`<path d="M${f1(px(ph))} ${Y+28}l-6 -9h12z" style="fill:var(--ink)"/><text x="${f1(clamp(px(ph),X+72,X+W-72))}" y="${Y+14}" class="t-xs t-mid" style="fill:var(--ink)">urine pH ${ph.toFixed(1)} (schematic)</text>`;
      s+=T(Y+72,'below 5.5, uric acid comes out of solution','t-xs','fill:var(--gold)');
      /* crystals clump into a stone as the pH falls below 5.5 */
      const n=Math.round(26*ramp(5.5-ph,0,.4)),cx=X+W/2,cy=Y+106;
      s+=`<ellipse cx="${f1(cx)}" cy="${cy}" rx="${f1(W/2-4)}" ry="24" style="fill:var(--field);stroke:var(--line)"/><text x="${X+8}" y="${cy+4}" class="t-xs">urine</text>`;
      for(let i=0;i<26;i++){const a=R()*Math.PI*2,rr=4+15*Math.sqrt(R()),sx=cx+30+rr*1.4*Math.cos(a),sy=cy+rr*.8*Math.sin(a),rot=R()*180;
        if(i<n)s+=`<rect x="-3" y="-3" width="6" height="6" transform="translate(${f1(sx)} ${f1(sy)}) rotate(${f1(rot)})" style="fill:var(--gold);opacity:.85"/>`}
      s+=bar(Y+150,14,30,'var(--terra)','Lifetime stones, people with gout','Roughley 2015 · pooled','14%',k);
      s+=bar(Y+200,15,30,'var(--terra)','Stone history, men with gout','Kramer 2003 · 51,529 men','15%',k);
      s+=bar(Y+246,8,30,'var(--muted)','Men without gout','','8%',k);
      s+=T(Y+286,'New stones: RR 2.12 · Kramer 2003','t-xs');
      s+=T(Y+300,'Uric acid stones: about 10% of all stones','t-xs');
      s+=T(Y+314,'pH falls as weight rises: 6.09 → 5.91','t-xs');}
    else if(p===2){const k=ramp(t,.55,.7),y0=Y+200,H=150,yv=v=>y0-H*v/3,bw=W/5-8;
      const B=[['before',1.32,'var(--muted)',''],['0–60 d',2.49,'var(--terra)','OR 1.93'],['61–120',2.16,'var(--terra)','1.57'],['121–180',1.70,'var(--terra)','1.06'],['181–540',1.32,'var(--muted)','']];
      s+=T(Y,'CV EVENTS AFTER A FLARE','t-sm','fill:var(--terra)');
      s+=T(Y+15,'MI or stroke per 1000 person-days','t-xs');s+=T(Y+28,'Cipolletta 2022 · 62,574 people','t-xs');
      [0,1,2,3].forEach(v=>s+=`<line x1="${X}" x2="${X+W}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${X+W}" y="${f1(yv(v)-3)}" class="t-xs t-end">${v}</text>`);
      B.forEach(([l,v,c,o],i)=>{const ki=ease(ramp(k,i*.17,i*.17+.3)),x=X+4+i*(bw+8),h=H*v/3*ki;
        s+=`<rect x="${f1(x)}" y="${f1(y0-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:${c};opacity:${i===0||i===4?.55:.9}"/>`;
        if(ki>.5)s+=`<text x="${f1(x+bw/2)}" y="${f1(y0-h-5)}" class="t-xs t-mid" style="fill:${c};font-weight:700">${v.toFixed(2)}</text>`;
        s+=`<text x="${f1(x+bw/2)}" y="${y0+14}" class="t-xs t-mid">${l}</text>`;
        if(o)s+=`<text x="${f1(x+bw/2)}" y="${y0+44}" class="t-xs t-mid" style="fill:var(--terra);opacity:${f1(ki)}">${o}</text>`});
      s+=`<line x1="${X}" x2="${X+W}" y1="${f1(yv(1.32))}" y2="${f1(yv(1.32))}" style="stroke:var(--ink);stroke-dasharray:4 3;opacity:.6"/>`;
      const fx=X+4+bw+4;s+=`<line x1="${f1(fx)}" x2="${f1(fx)}" y1="${Y+40}" y2="${y0}" style="stroke:var(--terra);stroke-width:1.6"/><text x="${f1(fx+4)}" y="${Y+50}" class="t-xs" style="fill:var(--terra)">flare</text>`;
      s+=T(y0+30,'odds of a flare before an event:','t-xs');
      s+=T(y0+76,'Long term: CVD death HR 1.29,','t-xs','fill:var(--ink)');
      s+=T(y0+90,'coronary death HR 1.42 · Clarson 2015','t-xs','fill:var(--ink)');
      s+=T(y0+108,'Observational; two designs agree.','t-xs');}
    else{const k=ease(ramp(t,.8,.95));
      const lx=v=>X+W*(Math.log(v/.5)/Math.log(3)),ly=v=>X+W*(v+2)/4;
      s+=T(Y,'DOES TREATING HELP?','t-sm','fill:var(--terra)');
      s+=T(Y+18,'MACE · hazard ratio (log scale)','t-xs','fill:var(--ink)');
      const FA=[['COLCOT · colchicine',.77,.61,.96,'var(--crocus)'],['LoDoCo2 · colchicine',.69,.57,.83,'var(--crocus)'],['CLEAR SYNERGY · colchicine',.99,.85,1.16,'var(--crocus)'],['ALL-HEART · allopurinol',1.04,.89,1.21,'var(--sea)']];
      const FB=[['CKD-FIX · allopurinol',-.10,-1.18,.97,'var(--sea)','−0.10'],['PERL · allopurinol (GFR)',.001,-1.9,1.9,'var(--sea)','0.001'],['FEATHER · febuxostat',.70,-.21,1.62,'var(--sea)','0.70']];
      const forest=(y0,rows,sx,ref,fmt)=>{let f=`<line x1="${f1(sx(ref))}" x2="${f1(sx(ref))}" y1="${y0-4}" y2="${y0+rows.length*30}" class="axis"/>`;
        rows.forEach((r,i)=>{const y=y0+i*30,ki=ease(clamp(k*1.6-i*.15));
          f+=`<text x="${X}" y="${y+6}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><text x="${X+W}" y="${y+6}" class="t-xs t-end" style="fill:${r[4]};font-weight:700">${fmt(r)}</text>`;
          f+=`<g style="opacity:${f1(ki)}"><line x1="${f1(sx(r[2]))}" x2="${f1(sx(r[3]))}" y1="${y+16}" y2="${y+16}" style="stroke:${r[4]};stroke-width:2"/><rect x="${f1(sx(r[1])-5)}" y="${y+11}" width="10" height="10" style="fill:${r[4]}"/></g>`});return f};
      s+=forest(Y+32,FA,lx,1,r=>r[1].toFixed(2));
      [.5,1,1.5].forEach(v=>s+=`<text x="${f1(lx(v))}" y="${Y+162}" class="t-xs ${v===.5?'':v===1.5?'t-end':'t-mid'}">${v}</text>`);
      s+=T(Y+176,'← fewer events with the drug','t-xs');
      s+=T(Y+200,'Kidney · eGFR difference per year','t-xs','fill:var(--ink)');
      s+=forest(Y+214,FB,ly,0,r=>r[5]);
      [-2,0,2].forEach(v=>s+=`<text x="${f1(ly(v))}" y="${Y+314}" class="t-xs ${v===-2?'':v===2?'t-end':'t-mid'}">${v>0?'+'+v:v===0?'0':'−'+(-v)}</text>`);
      s+=T(Y+328,'mL/min/1.73 m² · better with the drug →','t-xs');}
    return s;
  }
  /* ---------- the network (wide) ---------- */
  function net(t,p,foc,ce){
    let s=`<text x="16" y="20" class="t-sm">THE LINKS · click one to read it</text>`;
    const hot=new Set();foc.forEach(i=>{hot.add(LK_E[i].a);hot.add(LK_E[i].b)});
    LK_E.forEach((e,i)=>{const g=GEO[i],c=ecol(e,i,foc),f=foc.has(i),on=i===ce,mid=g.at(e.lt);
      const mkE=(e.arr||mode==='cause')?` marker-end="url(#${MK[c]})"`:'';
      s+=`<g class="clk" data-lke="${i}"><path class="lk-hit" d="${g.d}" style="fill:none;stroke:transparent;stroke-width:16"/>`;
      s+=`<path d="${g.d}" style="fill:none;stroke:${c};stroke-width:${on?3.4:f?2.4:1.5};opacity:${on||f?1:.55}${dash(e)}"${mkE}/>`;
      if(f)for(let j=0;j<3;j++){const u=(t*24+j/3+i*.13)%1,[x,y]=g.at(u);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:${c};opacity:${f1(.9*bump(u,0,1))}"/>`}
      const txt=mode==='cause'?LK_EV[e.s][0]:e.m;
      s+=pill(mid[0],mid[1],txt,on||f||mode==='cause'?c:'var(--muted)',on?'var(--terra-soft)':'var(--panel)');
      if(p===3&&(i===2||i===5)){s+=`<text x="${i===5?f1(mid[0]+42):118}" y="${i===5?f1(mid[1]+4):104}" class="t-xs" style="fill:var(--crocus);font-weight:700">${i===2?'CKD-FIX, PERL: null':'ALL-HEART: null'}</text>`}
      s+=`</g>`});
    Object.entries(LK_N).forEach(([k,n])=>{const [x,y]=n.w,h=hot.has(k);
      const fill=n.c?`var(--${n.c}-soft)`:'var(--panel-2)',st=n.c?`var(--${n.c})`:(h?'var(--ink)':'var(--muted)');
      if(k==='gout'&&p===2){const b=bump((t*6)%1,0,1);s+=`<circle cx="${x}" cy="${y}" r="${f1(n.r+4+10*b)}" style="fill:none;stroke:var(--terra);stroke-width:2;opacity:${f1(.7*(1-b))}"/>`}
      s+=`<circle cx="${x}" cy="${y}" r="${n.r}" style="fill:${fill};stroke:${st};stroke-width:${h?2.4:1.4}"/>`;
      const L=n.l;L.forEach((l,j)=>s+=`<text x="${x}" y="${f1(y+4-(L.length-1)*6.5+j*13)}" class="t-lbl t-mid" style="font-size:${k==='gout'?15:11}px">${l}</text>`);
      if(n.sub)s+=`<text x="${x}" y="${n.sy<0?y-n.r-7:y+n.r+13}" class="t-xs t-mid">${n.sub}</text>`});
    return s;
  }
  /* ---------- the list (narrow): each link is a row, from → to ---------- */
  const NTOP=56,NROW=50;
  function list(t,p,foc,ce){
    let s=`<text x="16" y="20" class="t-sm">THE LINKS · tap one to read it</text><text x="16" y="36" class="t-xs">from → to · association · causation label</text>`;
    LK_E.forEach((e,i)=>{const y=NTOP+i*NROW,c=ecol(e,i,foc),f=foc.has(i),on=i===ce,A=LK_N[e.a],B=LK_N[e.b];
      s+=`<g class="clk" data-lke="${i}"><rect x="8" y="${y-15}" width="384" height="${NROW-6}" rx="9" style="fill:${on?'var(--terra-soft)':f?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--terra)':'var(--line)'}"/>`;
      const both=!e.arr&&mode!=='cause';
      s+=pill(70,y,e.na||A.nn,A.c?`var(--${A.c})`:'var(--ink)','var(--panel)',108);
      s+=`<line x1="${both?130:126}" x2="${both?162:166}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:${f||on?2.4:1.6}${dash(e)}" marker-end="url(#${MK[c]})"${both?` marker-start="url(#${MK[c]})"`:''}/>`;
      s+=pill(224,y,B.nn,B.c?`var(--${B.c})`:'var(--ink)','var(--panel)',108);
      const ev=LK_EV[e.s];s+=pill(334,y,ev[0],ev[1],'var(--panel)',92);
      s+=`<text x="20" y="${y+21}" class="t-xs" style="fill:${f||on?'var(--ink)':'var(--muted)'}"><tspan style="font-weight:700;fill:${f||on?'var(--terra)':'var(--muted)'}">${e.m}</tspan> · ${e.src.replace('<','&lt;')}</text>`;
      if(f)for(let j=0;j<2;j++){const u=(t*24+j/2+i*.13)%1;s+=`<circle cx="${f1(lerp(132,162,u))}" cy="${y}" r="2.6" style="fill:${c};opacity:${f1(bump(u,0,1))}"/>`}
      s+=`</g>`});
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 420','400 870'),p=phaseOf(LK_STEPS,t),S=LK_STEPS[p],ce=curE(p),foc=new Set(S.f);foc.add(ce);
    let s=defs();
    if(!N){s+=net(t,p,foc,ce);s+=`<line x1="448" x2="448" y1="10" y2="410" class="axis"/>`;s+=panel(p,t,462,24,246)}
    else{s+=list(t,p,foc,ce);const Y=NTOP+LK_E.length*NROW+8;s+=`<line x1="8" x2="392" y1="${Y-10}" y2="${Y-10}" class="axis"/>`;s+=panel(p,t,16,Y+16,368)}
    svg.innerHTML=s;
    setSt(p);
    const e=LK_E[ce],ev=LK_EV[e.s];
    $('#lkNote').innerHTML=noteHTML(S)+`<dl class="kv"><div><dt>Selected link · ${e.q} · <span class="ev ${ev[2]}">${ev[0]}</span></dt><dd><b>${e.m.replace('<','&lt;')}</b> (${e.src.replace('<','&lt;')}). ${e.d}</dd></div></dl>`;
    $$('[data-lke]',$('#lkEdges')).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.lke===ce));
  }
  const stop=playWire(rg,$('#lkPlay'),draw,22000,'Replay','links');
  const setSt=stepWire($('#lkSteps'),LK_STEPS,rg,draw,stop);
  $('#lkSteps').addEventListener('click',()=>{sel=null},true);
  $('#lkEdges').innerHTML=LK_E.map((e,i)=>`<button class="btn" data-lke="${i}" aria-pressed="false">${e.q}</button>`).join('');
  const pick=i=>{sel=i;selP=phaseOf(LK_STEPS,+rg.value);draw(+rg.value)};
  $('#lkEdges').addEventListener('click',ev=>{const b=ev.target.closest('[data-lke]');if(b)pick(+b.dataset.lke)});
  svg.addEventListener('click',ev=>{const g=ev.target.closest('[data-lke]');if(g)pick(+g.dataset.lke)});
  $$('[data-lkm]').forEach(b=>b.onclick=()=>{mode=b.dataset.lkm;$$('[data-lkm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* ---------- comorbidity bars (NHANES) ---------- */
  const cs=$('#lkCom');
  const LK_COM=[['High blood pressure',74,66],['CKD stage ≥ 2',71,86],['Obesity',53,65],['Diabetes',26,33],['Kidney stones',24,null],['Heart attack (MI)',14,23],['Heart failure',11,33],['Stroke',10,12]];
  let cm='gout',cv=LK_COM.map(()=>0).concat([0,0]),stopC=null;
  const target=m=>LK_COM.map(r=>m==='gout'?r[1]:(r[2]==null?0:r[2])).concat([62.8,25.4]);
  function drawC(){
    const N=vb(cs,'720 390','400 550');
    const BX0=N?16:236,BX1=N?330:640,RH=N?44:30,Y0=N?58:50;
    let s=`<text x="${N?16:14}" y="20" class="t-sm" style="fill:var(--terra)">${cm==='gout'?'US ADULTS WITH GOUT · NHANES 2007–2008':'US ADULTS WITH URATE ≥ 10 mg/dL · same survey'}</text>`;
    s+=`<text x="${N?16:706}" y="${N?36:20}" class="t-xs${N?'':' t-end'}">% who also have each condition · Zhu 2012</text>`;
    const bx=v=>BX0+(BX1-BX0)*v/100;
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${f1(bx(v))}" x2="${f1(bx(v))}" y1="${Y0-14}" y2="${Y0+LK_COM.length*RH-8}" class="grid"/><text x="${f1(bx(v))}" y="${Y0+LK_COM.length*RH+6}" class="t-xs t-mid">${v}%</text>`);
    LK_COM.forEach((r,i)=>{const y=Y0+i*RH,v=cv[i],na=cm==='u10'&&r[2]==null,by=N?y+4:y-9;
      s+=`<text x="${N?16:224}" y="${N?y:y+3}" class="t-lbl${N?'':' t-end'}" style="font-size:12.5px">${r[0]}</text>`;
      if(na){s+=`<text x="${f1(BX0+4)}" y="${by+12}" class="t-xs">not reported for this group</text>`;return}
      s+=`<rect x="${BX0}" y="${by}" width="${f1(Math.max(0,bx(v)-BX0))}" height="16" rx="4" style="fill:var(--terra);opacity:.85"/>`;
      s+=`<text x="${f1(bx(v)+6)}" y="${by+12}" class="t-xs" style="fill:var(--terra);font-weight:700">${Math.round(v)}%</text>`});
    const MY=Y0+LK_COM.length*RH+(N?34:30);
    s+=`<text x="${N?16:14}" y="${MY}" class="t-sm" style="fill:var(--terra)">METABOLIC SYNDROME · NHANES III · Choi 2007</text>`;
    [['with gout',cv[8],'var(--terra)','62.8%'],['without gout',cv[9],'var(--muted)','25.4%']].forEach(([l,v,c,lab],j)=>{const y=MY+(N?22:18)+j*(N?40:26),by=N?y+4:y-9;
      s+=`<text x="${N?16:224}" y="${N?y:y+3}" class="t-lbl${N?'':' t-end'}" style="font-size:12.5px">${l}</text>`;
      s+=`<rect x="${BX0}" y="${by}" width="${f1(Math.max(0,bx(v)-BX0))}" height="16" rx="4" style="fill:${c};opacity:.85"/><text x="${f1(bx(v)+6)}" y="${by+12}" class="t-xs" style="fill:${c};font-weight:700">${v>1?lab:''}</text>`});
    cs.innerHTML=s;
  }
  function tween(m){cm=m;const from=cv.slice(),to=target(m);if(stopC)stopC();stopC=animate(900,q=>{const e=ease(q);cv=from.map((v,i)=>lerp(v,to[i],e));drawC()},()=>{stopC=null})}
  $$('[data-lkc]').forEach(b=>b.onclick=()=>{$$('[data-lkc]').forEach(x=>x.setAttribute('aria-pressed',x===b));tween(b.dataset.lkc)});
  drawC();
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();tween(cm)}},{threshold:.3});io.observe(cs)}else{cv=target(cm);drawC()}
  onHide.links=(prev=>()=>{prev&&prev();if(stopC){stopC();stopC=null;cv=target(cm);drawC()}})(onHide.links);
  const prevR=redraws.links;redraws.links=()=>{prevR&&prevR();drawC()};
};
/* =============== 5.1 living with gout =============== */
const LV_STEPS=[
 {from:0,at:.03,k:'Months 0–2 · starting',t:'Start low, check often',
  txt:'ACR 2020 strongly recommends treating to a serum urate below 6 mg/dL [360 µmol/L] for everyone on urate-lowering therapy. It repeats the 2012 interval of a urate check every 2–5 weeks while the dose is raised, plus a check after each dose change, and says titration should take "weeks to months, not years". <sup class="c" data-ref="FitzGerald2020,Khanna2012P1" title="Source 135,202">135,202</sup> The allopurinol label lists baseline tests (urate, blood count, chemistry, liver and kidney function) and suggests raising the dose by 100 mg weekly to a urate of 6 mg/dL or less, up to 800 mg/day. <sup class="c" data-ref="FDA-Allopurinol" title="Source 115">115</sup>',
  pt:'In the first months the dose goes up step by step, with a blood test every few weeks to see how far urate has fallen.',
  hook:'Urate every <b>2–5 weeks</b> while titrating; target <b>&lt; 6 mg/dL [360 µmol/L]</b> for everyone on urate-lowering therapy.'},
 {from:.2,at:.25,k:'Months 2–5 · cover',t:'Flares are expected, and planned for',
  txt:'Dissolving crystals can set off flares early on, so ACR 2020 strongly recommends anti-inflammatory prophylaxis for 3–6 months when urate-lowering therapy starts, longer if flares continue. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> In a US survey only 12% of people on urate-lowering therapy knew flares can get worse when it starts. <sup class="c" data-ref="Harrold2012" title="Source 158">158</sup> The ACR patient panel asked for a "medication-in-pocket" plan for flares at home, and the allopurinol label says to keep taking it during a flare. <sup class="c" data-ref="FitzGerald2020,FDA-Allopurinol" title="Source 115,135">115,135</sup>',
  pt:'Flares in the first months are normal: crystals loosen as they dissolve. A plan at home means treating at the first twinge without stopping the daily pill.',
  hook:'Keep urate-lowering therapy going through a flare. Prophylaxis for <b>3–6 months</b> (ACR 2020, strong).'},
 {from:.42,at:.47,k:'Months 5–8 · daily life',t:'Food, drink and weight: a little, not a lot',
  txt:'In 16,760 adults, each diet score explained 0.3% or less of the variation in serum urate, against 23.9% for common genetic variation. <sup class="c" data-ref="Major2018" title="Source 244">244</sup> ACR 2020 still conditionally recommends limiting alcohol, purines and high-fructose corn syrup, and losing weight if overweight. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> Short-term triggers are real: the top fifth of purine intake over 2 days carried OR 4.76 for a flare, and more than 2–4 drinks in 24 hours OR 1.51. <sup class="c" data-ref="Zhang2012,Neogi2014" title="Source 289,448">289,448</sup>',
  pt:'Food and drink matter a little; the medicine matters most. A very big meal or a night of drinking can still set off a flare within a day or two.',
  hook:'Diet explains <b>≤ 0.3%</b> of urate variance; common genetic variation <b>23.9%</b> (Major 2018).'},
 {from:.62,at:.67,k:'Months 8–10 · other medicines',t:'Other medicines: reviewed, not simply stopped',
  txt:'ACR 2020 conditionally recommends switching hydrochlorothiazide to another antihypertensive when feasible, choosing losartan when feasible, not stopping low-dose aspirin taken for an appropriate reason, and not adding or switching to fenofibrate. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> Among people with hypertension, diuretics carried RR 2.36 for new gout and losartan RR 0.81. <sup class="c" data-ref="Choi2012BMJ" title="Source 57">57</sup> Low-dose aspirin raised flare odds (OR 1.91 at 100 mg or less), and taking allopurinol at the same time removed the effect. <sup class="c" data-ref="Zhang2014" title="Source 450">450</sup>',
  pt:'Some medicines for other conditions nudge urate up or down. Changes are made with the prescriber, and some, like low-dose aspirin for the heart, are kept.',
  hook:'ACR 2020: <b>do not stop low-dose aspirin</b>; switch hydrochlorothiazide where feasible; prefer <b>losartan</b>; no fenofibrate.'},
 {from:.8,at:.92,k:'Months 10–12 · at target',t:'At target, and staying there',
  txt:'Once at target, the 2012 ACR guideline checks urate every 6 months, partly as a check on adherence. <sup class="c" data-ref="Khanna2012P1" title="Source 202">202</sup> ACR 2020 conditionally recommends continuing urate-lowering therapy indefinitely: in one series only 13% (27 of 211) stayed flare-free for 5 years after stopping. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> Adherence is the weak point: a meta-analysis pooled 46% adherent. <sup class="c" data-ref="Scheepers2018SAR" title="Source 352">352</sup> With nurse-led education and titration, 95% reached urate below 6 mg/dL at 2 years, against 30% with usual care. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'Once urate is at target, a check every six months is usually enough. Stopping the pill lets urate climb and crystals come back.',
  hook:'Only <b>13%</b> (27/211) stayed flare-free over 5 years off treatment, even with urate under 7 mg/dL.'}
];
const LV_CHK=`<div class="kv"><div><dt>A urate check and a dose step</dt><dd>Urate is checked every 2–5 weeks while the dose is raised and after each change, aiming below 6 mg/dL [360 µmol/L]. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> In the Nottingham nurse-led trial, allopurinol rose by 100 mg every 3–4 weeks, and 79% ended on more than 300 mg/day, against 10% with usual care. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup></dd></div></div>`;
const LV_EV=[
 {m:.2,key:0,t:'Baseline tests',c:'var(--sea)',d:`<div class="kv"><div><dt>Before starting</dt><dd>The allopurinol label lists serum urate, a full blood count, a chemistry panel, liver tests and kidney function. <sup class="c" data-ref="FDA-Allopurinol" title="Source 115">115</sup> ACR 2020 conditionally recommends HLA-B*58:01 testing before allopurinol for people of Southeast Asian descent and African American people, but not for everyone. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup></dd></div></div>`},
 {m:1,key:0,t:'Urate check, dose step',c:'var(--sea)',d:LV_CHK},
 {m:1.6,key:'flare',t:'A flare at home',c:'var(--terra)',d:`<div class="kv"><div><dt>The flare plan</dt><dd>ACR 2020 strongly recommends colchicine, an NSAID or a glucocorticoid first line, low-dose rather than high-dose colchicine, and conditionally recommends ice as an add-on. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> The US colchicine label gives 1.2 mg at the first sign and 0.6 mg one hour later; someone already on prophylaxis takes the same flare dose, waits 12 hours, then restarts prophylaxis. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup> EULAR 2016 asks for people to be taught to self-medicate at the first warning symptoms. <sup class="c" data-ref="Richette2017" title="Source 331">331</sup> The allopurinol label says to stay on it during a flare. <sup class="c" data-ref="FDA-Allopurinol" title="Source 115">115</sup></dd></div></div>`},
 {m:2,key:0,t:'Urate check, dose step',c:'var(--sea)',d:LV_CHK},
 {m:3.2,key:0,t:'Urate check: at target?',c:'var(--sea)',d:`<div class="kv"><div><dt>Reaching target</dt><dd>In the Nottingham trial, mean urate fell by 183 µmol/L [about 3.1 mg/dL] in the first 3 months of nurse-led titration, and 94.75% were below 360 µmol/L [6 mg/dL] at 1 year. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup> For contrast, 8 weeks of vitamin C lowered urate by 0.23 mg/dL, and starting or raising allopurinol by 1.9 mg/dL. <sup class="c" data-ref="Stamp2013" title="Source 380">380</sup></dd></div></div>`},
 {m:4.5,key:'meal',t:'A celebration meal and drinks',c:'var(--terra)',d:`<div class="kv"><div><dt>Short-term triggers</dt><dd>In case-crossover studies, each person is compared with themselves. The top fifth of purine intake over 2 days carried OR 4.76 for a flare (animal sources 2.41, plants 1.39). <sup class="c" data-ref="Zhang2012" title="Source 448">448</sup> More than 2–4 drinks in 24 hours carried OR 1.51, and wine, beer and spirits each raised the risk. <sup class="c" data-ref="Neogi2014" title="Source 289">289</sup> Cherry intake went the other way (OR 0.65), early evidence from the same design. <sup class="c" data-ref="Zhang2012Cherry" title="Source 449">449</sup></dd></div></div>`},
 {m:5.5,key:0,t:'Prophylaxis review',c:'var(--crocus)',d:`<div class="kv"><div><dt>How long the cover lasts</dt><dd>ACR 2020 strongly recommends prophylaxis for 3–6 months rather than less than 3, extended if flares continue. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> In the nurse-led trial only 3 of 255 people chose colchicine prophylaxis; flares were higher in year 1 and far lower in year 2 (≥ 2 flares: 8.00% vs 24.29%). <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup></dd></div></div>`},
 {m:6.5,key:'bp',t:'A new blood-pressure pill',c:'var(--gold)',d:`<div class="kv"><div><dt>Blood-pressure medicines and urate</dt><dd>Among 29,138 people with hypertension, RR for new gout was 2.36 with diuretics, 1.48 with β-blockers, 1.29 with non-losartan ARBs, 1.24 with ACE inhibitors, 0.87 with calcium-channel blockers and 0.81 with losartan, deepening to 0.71 after 2 years. <sup class="c" data-ref="Choi2012BMJ" title="Source 57">57</sup> ACR 2020 conditionally recommends switching hydrochlorothiazide when feasible and choosing losartan when feasible. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> The allopurinol label notes that thiazides may raise the risk of severe rash, more so with kidney impairment. <sup class="c" data-ref="FDA-Allopurinol" title="Source 115">115</sup></dd></div></div>`},
 {m:8,key:'surg',t:'Planned surgery',c:'var(--warn)',d:`<div class="kv"><div><dt>Surgery and hospital</dt><dd>The flare rate rose about tenfold during hospital stays (RR 10.2). <sup class="c" data-ref="Zleik2018" title="Source 456">456</sup> After surgery, 44.3% of people with gout flared, a mean 3.7 days after the operation, often not in the big toe; taking allopurinol carried OR 0.15. <sup class="c" data-ref="Jeong2019" title="Source 183">183</sup> Pre-admission urate-lowering therapy went with fewer inpatient flares and shorter stays, observationally. <sup class="c" data-ref="Jatuworapruk2022Rheum,Jatuworapruk2022IJRD" title="Source 181,182">181,182</sup></dd></div></div>`},
 {m:9.2,key:0,t:'Six-month urate check',c:'var(--sea)',d:`<div class="kv"><div><dt>At target</dt><dd>Every 6 months once at target, in the 2012 ACR guideline. <sup class="c" data-ref="Khanna2012P1" title="Source 202">202</sup> Among 48,280 UK people starting allopurinol, 38.5% had stopped for 90 days or more by 1 year. <sup class="c" data-ref="Scheepers2018Rheum" title="Source 351">351</sup> Poor health literacy went with 2 or more flares a year (adjusted OR 4.10). <sup class="c" data-ref="Watson2024" title="Source 427">427</sup></dd></div></div>`},
 {m:10.2,key:'preg',t:'Planning a pregnancy',c:'var(--crocus)',d:`<div class="kv"><div><dt>Pregnancy</dt><dd>BSR 2023: colchicine "may be considered during pregnancy" (1B) and may be used in breastfeeding (2C); NSAIDs only intermittently, weaned from 26 weeks and stopped by 30. It asks for the risks and benefits to be discussed and documented. <sup class="c" data-ref="Schreiber2023" title="Source 356">356</sup> The allopurinol label reports 2 major malformations among about 50 published pregnancies and advises against breastfeeding on it. <sup class="c" data-ref="FDA-Allopurinol" title="Source 115">115</sup></dd></div></div>`},
 {m:11.8,key:0,t:'Annual review',c:'var(--sea)',d:`<div class="kv"><div><dt>The long view</dt><dd>ACR 2020 conditionally recommends continuing urate-lowering therapy indefinitely. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> In a nurse-led pilot, 90.7% were still on treatment 5 years later, with a mean urate of 292.8 µmol/L [4.9 mg/dL]. <sup class="c" data-ref="Abhishek2017" title="Source 1">1</sup></dd></div></div>`}
];
const LV_DIET=[
 {l:'One beer a day',v:.16,u:'+9.5',s:'ACR 2020 evidence summary · Major 2018'},
 {l:'Vitamin C 500 mg/day, people with gout',v:-.23,u:'−14',s:'Stamp 2013 · 40 people, 8 weeks'},
 {l:'DASH diet, everyone',v:-.35,u:'−21',s:'Juraschek 2016 · 103 adults, 30 days'},
 {l:'Vitamin C, 13 trials pooled',v:-.35,u:'−20.8',s:'Juraschek 2011 · mostly without gout'},
 {l:'Coffee, 6 or more cups a day',v:-.43,u:'−26',s:'Choi 2007 · NHANES III, cross-sectional'},
 {l:'5 kg weight loss',v:-1.1,u:'−65',s:'ACR 2020 · 11 obese people'},
 {l:'DASH diet, urate ≥ 7 mg/dL at start',v:-1.29,u:'−77',s:'Juraschek 2016 · 8 people'},
 {l:'Limiting or stopping alcohol',v:-1.6,u:'−95',s:'ACR 2020 evidence summary'},
 {l:'Bariatric surgery, 34.3 kg lost',v:-2.0,u:'−119',s:'ACR 2020 · 12 people'},
 {l:'Starting or raising allopurinol',v:-1.9,u:'−118',s:'Stamp 2013 · same trial, 8 weeks',med:1}
];
const LV_RISK={
 trig:{h:'FLARES IN PEOPLE WITH GOUT · case-crossover, each person vs themselves',x:'odds ratio of a flare, log scale (1 = no difference)',
  cap:'Case-crossover studies compare the same person before flares and at other times. The purine figures compare the top with the bottom fifth of intake over 2 days. Cherries are early evidence: observational, and ACR 2020 judged the evidence too weak to recommend them. <sup class="c" data-ref="Zhang2012,Neogi2014,Zhang2014,Zhang2012Cherry,FitzGerald2020" title="Source 135,289,448,449,450">135,289,448,449,450</sup>',
  r:[{n:'Purines, top fifth over 2 days',s:'Zhang 2012 · 633 people',v:4.76},{n:'Animal purines, top fifth',s:'same study',v:2.41},{n:'Wine, more than 1–2 servings',s:'Neogi 2014 · 724 people',v:2.38,lo:1.57,hi:3.62},{n:'Low-dose aspirin ≤ 100 mg, 2 days',s:'Zhang 2014 · 724 people',v:1.91,lo:1.32,hi:2.85},{n:'More than 2–4 drinks in 24 h',s:'Neogi 2014',v:1.51,lo:1.09,hi:2.09},{n:'Cherries over 2 days',s:'Zhang 2012 · early evidence',v:.65,lo:.5,hi:.85,e:1},{n:'Cherries plus allopurinol',s:'same study · early evidence',v:.25,lo:.15,hi:.42,e:1}]},
 new:{h:'GETTING GOUT IN THE FIRST PLACE · prospective cohorts',x:'relative risk of new gout, log scale (1 = no difference)',
  cap:'Separate cohorts, mostly US men, each with its own comparison: alcohol per daily serving; meat, seafood, dairy and DASH top versus bottom fifth; sugary drinks 2 or more a day; coffee 6 or more cups a day; blood-pressure drugs among people with hypertension. Wine was not significant. Not comparable with each other, and not a personal risk. <sup class="c" data-ref="Choi2004Lancet,Choi2004NEJM,Rai2017BMJ,Choi2008BMJ,Choi2007Incident,Choi2012BMJ" title="Source 46,47,51,53,57,323">46,47,51,53,57,323</sup>',
  r:[{n:'Diuretics',s:'Choi 2012 · people with hypertension',v:2.36},{n:'Sugary soft drinks, 2+ a day',s:'Choi 2008 · 46,393 men',v:1.85,lo:1.08,hi:3.16},{n:'Seafood, top fifth',s:'Choi 2004 · 47,150 men',v:1.51,lo:1.17,hi:1.95},{n:'Beer, per daily serving',s:'Choi 2004',v:1.49,lo:1.32,hi:1.70},{n:'Meat, top fifth',s:'Choi 2004',v:1.41,lo:1.07,hi:1.86},{n:'Spirits, per daily drink',s:'Choi 2004',v:1.15,lo:1.04,hi:1.28},{n:'Wine, per daily glass (NS)',s:'Choi 2004',v:1.04,lo:.88,hi:1.22},{n:'Losartan',s:'Choi 2012',v:.81,lo:.70,hi:.94},{n:'DASH diet, top fifth',s:'Rai 2017 · 44,444 men',v:.68,lo:.57,hi:.80},{n:'Dairy, top fifth',s:'Choi 2004',v:.56,lo:.42,hi:.74},{n:'Coffee, 6+ cups a day',s:'Choi 2007 · 45,869 men',v:.41,lo:.19,hi:.88}]}
};
inits.living=()=>{
  /* ---------- the year ring (adapted from the FMF year) ---------- */
  const svg=$('#lvSvg'),rg=$('#lvT');const on={flare:false,meal:false,bp:false,surg:false,preg:false};
  const vis=()=>LV_EV.filter(e=>e.key===0||on[e.key]);
  const ang=m=>-Math.PI/2+m/12*Math.PI*2;
  function draw(t){
    const mNow=t*12,E=vis();
    /* narrow: the ring keeps its size, the event labels move into a list underneath,
       and the event the year has just reached is highlighted in both */
    const N=vb(svg,'720 440','400 '+(384+E.length*27+(E.length<9?36:22)));
    const CX=N?200:232, CY=N?196:226, R=N?136:148;
    const LX=N?16:432, LY=N?384:62, LST=N?27:E.length>9?29:31, LTX=N?52:456, LRX=N?386:712, LHD=N?366:38, LHX=LX;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    /* the flare-prophylaxis window: months 0.2 to 5.5 */
    {const a0=ang(.2),a1=ang(Math.min(mNow,5.5));let d='';
      for(let i=0;i<=60;i++){const a=lerp(a0,a1,i/60);d+=(i?'L':'M')+f1(CX+Math.cos(a)*(R+14))+' '+f1(CY+Math.sin(a)*(R+14))}
      if(mNow>.2)s+=`<path d="${d}" style="fill:none;stroke:var(--crocus);stroke-width:7;opacity:.45;stroke-linecap:round"/>`;
      if(N){if(mNow>.2)s+=`<line x1="250" x2="266" y1="13" y2="13" style="stroke:var(--crocus);stroke-width:5;opacity:.5;stroke-linecap:round"/><text x="272" y="17" class="t-xs" style="fill:var(--crocus)">prophylaxis</text>`}
      else if(mNow>.2)s+=`<text x="${CX+34}" y="${CY-R-26}" class="t-xs" style="fill:var(--crocus)">flare prophylaxis, 3–6 months →</text>`;}
    s+=`<circle cx="${CX}" cy="${CY}" r="${R}" style="fill:none;stroke:var(--line);stroke-width:9"/>`;
    let pd='';const NS=Math.max(1,Math.round(t*180));
    for(let i=0;i<=NS;i++){const a=ang(t*12*i/NS);pd+=(i?'L':'M')+f1(CX+Math.cos(a)*R)+' '+f1(CY+Math.sin(a)*R)}
    s+=`<path d="${pd}" style="fill:none;stroke:var(--sea);stroke-width:9;stroke-linecap:round"/>`;
    for(let m=0;m<12;m++){const a=ang(m);
      s+=`<line x1="${f1(CX+Math.cos(a)*(R-6))}" x2="${f1(CX+Math.cos(a)*(R+6))}" y1="${f1(CY+Math.sin(a)*(R-6))}" y2="${f1(CY+Math.sin(a)*(R+6))}" style="stroke:var(--panel);stroke-width:2"/>`;
      const ai=ang(m+.5);
      s+=`<text x="${f1(CX+Math.cos(ai)*(R-24))}" y="${f1(CY+Math.sin(ai)*(R-20))}" class="t-xs t-mid" style="fill:${mNow>=m?'var(--ink)':'var(--muted)'}">${m+1}</text>`}
    let curI=-1;E.forEach((e,i)=>{if(mNow>=e.m)curI=i});
    E.forEach((e,i)=>{const a=ang(e.m),x=CX+Math.cos(a)*R,y=CY+Math.sin(a)*R,hit=mNow>=e.m,now=i===curI;
      if(N&&now)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="17" style="fill:${e.c};opacity:.18"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${hit?(N&&now?11:9):6}" style="fill:${hit?e.c:'var(--panel)'};stroke:${e.c};stroke-width:${N&&now?3:2}"/>`;
      if(hit)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(9+9*bump(mNow,e.m,e.m+.6))}" style="fill:none;stroke:${e.c};stroke-width:1.5;opacity:${f1(.8*bump(mNow,e.m,e.m+.6))}"/>`;
      if(N){const xo=CX+Math.cos(a)*(R+19),yo=CY+Math.sin(a)*(R+19);
        s+=`<text x="${f1(xo)}" y="${f1(yo+3.5)}" class="t-xs t-mid" style="fill:${hit?e.c:'var(--muted)'};font-weight:700">${i+1}</text>`}});
    const a=ang(mNow);
    s+=`<line x1="${CX}" x2="${f1(CX+Math.cos(a)*(R-34))}" y1="${CY}" y2="${f1(CY+Math.sin(a)*(R-34))}" style="stroke:var(--terra);stroke-width:2.4"/>`;
    s+=`<circle cx="${CX}" cy="${CY}" r="4" style="fill:var(--terra)"/>`;
    s+=`<text x="${CX}" y="${CY-8}" class="t-sm t-mid">MONTH</text>`;
    s+=`<text x="${CX}" y="${CY+22}" class="t-big t-mid" style="font-size:28px">${(mNow+.0001).toFixed(1)}</text>`;
    s+=`<text x="${CX}" y="${CY+42}" class="t-xs t-mid">${E.filter(e=>mNow>=e.m).length} of ${E.length} events reached</text>`;
    s+=`<text x="${LHX}" y="${LHD}" class="t-sm" style="fill:var(--sea)">THIS YEAR, IN ORDER</text>`;
    E.forEach((e,i)=>{const y=LY+i*LST,hit=mNow>=e.m,now=i===curI;
      if(N&&now)s+=`<rect x="${LX-6}" y="${y-18}" width="${LRX-LX+12}" height="24" rx="7" style="fill:${e.c};opacity:.14"/>`;
      if(N)s+=`<text x="${LX+10}" y="${y}" class="t-xs t-end" style="fill:${hit?e.c:'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<circle cx="${N?LX+24:LX+10}" cy="${y-4}" r="${now&&N?6:5}" style="fill:${hit?e.c:'var(--panel)'};stroke:${e.c};stroke-width:1.8"/>`;
      s+=`<text x="${LTX}" y="${y}" class="t-lbl" style="fill:${hit?'var(--ink)':'var(--muted)'};font-size:12.5px">${e.t}</text>`;
      s+=`<text x="${LRX}" y="${y}" class="t-xs t-end">m${e.m.toFixed(1)}</text>`});
    if(E.length<9)s+=`<text x="${LTX}" y="${LY+E.length*LST+16}" class="t-xs">use the toggles to add more</text>`;
    svg.innerHTML=s;
    const p=phaseOf(LV_STEPS,t);setSt(p);
    const past=E.filter(e=>mNow>=e.m);const last=past[past.length-1];
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[p])+(last?last.d:'');
    $('#lvCap').textContent=`Month ${(mNow).toFixed(1)} of 12 · ${past.length} events reached${last?' · last: '+last.t:''}. Schematic year; intervals follow published guidance, not any one clinic.`;
  }
  const stop=playWire(rg,$('#lvPlay'),draw,20000,'Replay','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  [['lvFlare','flare'],['lvMeal','meal'],['lvBp','bp'],['lvSurg','surg'],['lvPreg','preg']].forEach(([id,k])=>{
    const b=$('#'+id);b.onclick=()=>{on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);draw(+rg.value)}});
  draw(+rg.value);

  /* ---------- diet effects in mg/dL ---------- */
  const ds=$('#lvDiet'),dr=$('#lvDR');let med=true;
  function drawD(t){
    const R=LV_DIET.filter(r=>med||!r.med),n=R.length;
    /* narrow: each row's label sits on its own line above a full-width bar */
    const N=vb(ds,'720 '+(70+n*36),'400 '+(84+n*52));
    const Z=N?300:590,PX=N?115:118,Y0=N?60:44,RH=N?52:36;
    const xv=v=>Z+PX*v;
    let s=`<text x="14" y="20" class="t-sm" style="fill:var(--sea)">CHANGE IN SERUM URATE, mg/dL</text>`;
    s+=N?`<text x="14" y="36" class="t-xs">bars to the left lower urate · µmol/L in brackets</text>`:`<text x="706" y="20" class="t-xs t-end">bars to the left lower urate · µmol/L in brackets</text>`;
    const top=Y0-12,bot=Y0+n*RH-10;
    [-2,-1,0].forEach(v=>s+=`<line x1="${f1(xv(v))}" x2="${f1(xv(v))}" y1="${top}" y2="${bot}" class="${v===0?'axis':'grid'}"/><text x="${f1(xv(v))}" y="${bot+14}" class="t-xs t-mid">${v===0?'0':'−'+(-v)}</text>`);
    s+=`<line x1="${f1(xv(0))}" x2="${f1(xv(0))}" y1="${top}" y2="${bot}" style="stroke:var(--ink);opacity:.5"/>`;
    R.forEach((r,i)=>{const y=Y0+i*RH,k=ease(ramp(t,i*.06,i*.06+.4)),v=r.v*k,x0=Math.min(xv(0),xv(v)),w=Math.abs(xv(v)-xv(0));
      const col=r.med?'var(--sea)':r.v>0?'var(--terra)':'var(--gold)',by=N?y+18:y-10;
      if(r.med)s+=`<rect x="6" y="${N?y-15:y-16}" width="${N?388:708}" height="${N?52:34}" rx="8" style="fill:var(--sea-soft);opacity:.6"/>`;
      s+=`<text x="14" y="${N?y:y-1}" class="t-lbl" style="font-size:12.5px">${r.l}</text>`;
      s+=`<text x="14" y="${N?y+12:y+12}" class="t-xs">${r.s}</text>`;
      s+=`<rect x="${f1(x0)}" y="${by}" width="${f1(w)}" height="16" rx="4" style="fill:${col};opacity:${r.med?1:.85}"/>`;
      const lab=`${r.v>0?'+':'−'}${Math.abs(r.v).toFixed(2).replace(/0$/,'').replace(/\.$/,'')} [${r.u}]`;
      const inside=w>(N?110:150),vo=ramp(k,.5,1);
      if(r.v>0)s+=`<text x="${f1(xv(v)+6)}" y="${by+12}" class="t-xs" style="fill:${col};font-weight:700;opacity:${f1(vo)}">${lab}</text>`;
      else if(inside)s+=`<text x="${f1(x0+6)}" y="${by+12}" class="t-xs" style="fill:var(--panel);font-weight:700;opacity:${f1(vo)}">${lab}</text>`;
      else s+=`<text x="${f1(x0-6)}" y="${by+12}" class="t-xs t-end" style="fill:${col};font-weight:700;opacity:${f1(vo)}">${lab}</text>`});
    ds.innerHTML=s;
  }
  playWire(dr,$('#lvDPlay'),drawD,7000,'Replay','living');drawD(+dr.value);
  $('#lvMed').onclick=()=>{med=!med;$('#lvMed').setAttribute('aria-pressed',med);drawD(+dr.value)};

  /* ---------- genes vs diet: 100 squares, each 1% of urate variance ---------- */
  const gs=$('#lvGenes');let gp=1,stopG=null;
  function drawG(p){gp=p;
    const N=vb(gs,'720 300','400 500');
    const C=N?24:22,GX=N?80:30,GY=N?50:46;
    let s=`<text x="${N?16:30}" y="22" class="t-sm" style="fill:var(--sea)">WHAT EXPLAINS THE VARIATION IN SERUM URATE · Major 2018</text>`;
    const gn=23.9*ease(ramp(p,0,.75)),dn=.3*ease(ramp(p,.75,1));
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,x=GX+c*C,y=GY+r*C,fg=clamp(gn-i),fd=i===24?clamp(dn/1):0;
      s+=`<rect x="${x}" y="${y}" width="${C-3}" height="${C-3}" rx="3" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(fg>0)s+=`<rect x="${x}" y="${y}" width="${f1((C-3)*fg)}" height="${C-3}" rx="3" style="fill:var(--gold)"/>`;
      if(i===24&&dn>0)s+=`<rect x="${f1(x+(C-3)*.9)}" y="${y}" width="${f1((C-3)*dn)}" height="${C-3}" style="fill:var(--terra)"/>`}
    const TX=N?16:290,TY=N?GY+10*C+30:70;
    s+=`<text x="${TX}" y="${TY}" class="t-big" style="fill:var(--gold);font-size:30px">${gn.toFixed(1)}%</text>`;
    s+=`<text x="${TX+(N?110:110)}" y="${TY-6}" class="t-lbl">common genetic variation</text>`;
    s+=`<text x="${TX+110}" y="${TY+9}" class="t-xs">genome-wide, in 16,760 adults</text>`;
    s+=`<text x="${TX}" y="${TY+50}" class="t-big" style="fill:var(--terra);font-size:30px">≤${dn.toFixed(1)}%</text>`;
    s+=`<text x="${TX+110}" y="${TY+44}" class="t-lbl">any one diet score</text>`;
    s+=`<text x="${TX+110}" y="${TY+59}" class="t-xs">a sliver of one square</text>`;
    const L=N?['Each square is 1% of the variation.','The rest (about 76%) is not explained','by either: age, sex, weight, kidney','function and medicines sit there.']:['Each square is 1% of the variation in serum urate.','The rest, about 76%, is explained by neither:','age, sex, body weight, kidney function and','medicines sit there, which is why weight and','diuretics still matter for who gets gout.'];
    L.forEach((l,i)=>s+=`<text x="${TX}" y="${TY+98+i*16}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    gs.innerHTML=s}
  function runG(){if(stopG)stopG();stopG=animate(2600,drawG,()=>{stopG=null})}
  $('#lvGPlay').onclick=runG;drawG(0);
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();runG()}},{threshold:.35});io.observe(gs)}else drawG(1);

  /* ---------- risk factors and triggers, log scale ---------- */
  const rs=$('#lvRisk');let rm='trig',ci=true,rp=1,stopR=null;
  function drawR(p){rp=p;const D=LV_RISK[rm],n=D.r.length;
    const N=vb(rs,'720 '+(74+n*30+30),'400 '+(84+n*54+40));
    const LX0=N?16:300,LX1=N?384:690,lo=.2,hi=6,lx=v=>LX0+(LX1-LX0)*Math.log(v/lo)/Math.log(hi/lo),Y0=N?62:52,RH=N?54:30;
    let s=`<text x="${N?16:10}" y="18" class="t-sm" style="fill:var(--sea)">${N?D.h.split(' · ')[0]:D.h}</text>`;
    if(N)s+=`<text x="16" y="34" class="t-xs">${D.h.split(' · ')[1]}</text>`;
    const ax=Y0+n*RH+(N?-8:4);
    if(!N)[.25,.5,1,2,4].forEach(v=>s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="${Y0-16}" y2="${ax-10}" class="${v===1?'axis':'grid'}"/>`);
    [.25,.5,1,2,4].forEach(v=>s+=`<text x="${f1(lx(v))}" y="${ax+4}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${LX1}" y="${ax+20}" class="t-xs t-end">${D.x}</text>`;
    D.r.forEach((R,i)=>{const y=Y0+i*RH,q=ease(clamp(p*1.6-i*.07)),v1=Math.exp(lerp(0,Math.log(R.v),q)),x1=lx(1),xe=lx(v1),by=N?y+18:y-10,col=R.v>=1?'var(--terra)':'var(--good)';
      s+=`<text x="${N?16:10}" y="${N?y:y-1}" class="t-lbl" style="font-size:12.5px">${R.n}</text><text x="${N?16:10}" y="${N?y+13:y+12}" class="t-xs">${R.s}</text>`;
      if(N)[.25,.5,1,2,4].forEach(v=>s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="${by-3}" y2="${by+21}" class="${v===1?'axis':'grid'}"/>`);
      s+=`<rect x="${f1(Math.min(x1,xe))}" y="${by}" width="${f1(Math.abs(xe-x1))}" height="16" rx="3" style="fill:${col};opacity:${R.e?.55:.85}"/>`;
      const tx=R.v>=1?xe+6:xe-6;s+=`<text x="${f1(tx)}" y="${by+12}" class="t-xs${R.v>=1?'':' t-end'}" style="fill:${col};font-weight:700;opacity:${f1(ramp(q,.6,1))}">${R.v}</text>`;
      if(ci&&R.lo)s+=`<path d="M${f1(lx(R.lo))} ${by+20}H${f1(lx(R.hi))}M${f1(lx(R.lo))} ${by+17}v6M${f1(lx(R.hi))} ${by+17}v6" style="stroke:var(--ink);stroke-width:1.4;opacity:${f1(q)}"/>`});
    rs.innerHTML=s;$('#lvRCap').innerHTML=D.cap}
  function runR(){if(stopR)stopR();stopR=animate(1500,drawR,()=>{stopR=null})}
  $('#lvRPlay').onclick=runR;
  $('#lvCI').onclick=()=>{ci=!ci;$('#lvCI').setAttribute('aria-pressed',ci);drawR(rp)};
  $$('[data-lvr]').forEach(b=>b.onclick=()=>{rm=b.dataset.lvr;$$('[data-lvr]').forEach(x=>x.setAttribute('aria-pressed',x===b));runR()});
  drawR(0);
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();runR()}},{threshold:.3});io.observe(rs)}else drawR(1);
  onHide.living=(prev=>()=>{prev&&prev();if(stopR){stopR();stopR=null;drawR(1)}if(stopG){stopG();stopG=null;drawG(1)}})(onHide.living);
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawG(gp);drawR(rp)};
};
/* =============== 5.2 nursing care =============== */
const nuWrap=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
const NU_SITES={
 joint:{n:'The joint',
  what:'A self-report flare definition needs at least 3 of 4 items: the person says it is a flare, pain at rest above 3 on a 0–10 scale, at least one swollen joint, and at least one warm joint. In 509 patients at 17 sites it was 85% sensitive and 95% specific. Maximal pain within 24 hours and resolution within 14 days are both features scored by the 2015 classification criteria. <sup class="c" data-ref="Gaffo2018,Neogi2015" title="Source 143,290">143,290</sup>',
  hook:'A flare is <b>3 of 4</b>: says it is a flare, pain at rest above 3/10, a swollen joint, a warm joint. <sup class="c" data-ref="Gaffo2018" title="Source 143">143</sup>',
  pt:'Ask the person, then look and feel: is the joint swollen, is it warm, and how bad is the pain when they are still?'},
 pain:{n:'Pain & function',
  what:'For acute gout, OMERACT 9 named five core domains: pain, joint swelling, joint tenderness, patient global assessment and activity limitation. Pain on a 0–4 Likert scale, a 0–10 numeric rating scale or a 0–100 mm visual analogue scale, and swelling and tenderness on a 4-point Likert scale, all meet the OMERACT filter. The HAQ discriminated within groups but not between them. <sup class="c" data-ref="Schumacher2009,Taylor2014" title="Source 358,402">358,402</sup>',
  hook:'Flares are 2.36 times as likely overnight as in the daytime, in 724 people with 1,433 flares, so the worst pain is often reported from the night before. <sup class="c" data-ref="Choi2015" title="Source 58">58</sup>'},
 tophi:{n:'Tophi',
  what:'Vernier caliper measurement of the longest diameter differed by a mean of 0.45 mm between observers and correlated with CT volume (r = 0.91). A systematic review of 8 tophus methods found that calipers and ultrasound met most of the OMERACT filter. The nurse-led trial recorded tophus number, sites and the largest diameter by caliper. <sup class="c" data-ref="Dalbeth2007,Dalbeth2011ARD,Doherty2018" title="Source 69,75,95">69,75,95</sup>',
  hook:'In the nurse-led arm the largest tophus shrank from 16.89 mm to 3.29 mm over 2 years, against 20.09 to 13.61 mm in usual care. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'A tophus is a lump of urate crystals under the skin. Measuring its widest point each visit shows whether treatment is dissolving it.'},
 urate:{n:'Serum urate',
  what:'A normal serum urate does not rule out a flare. In 339 people with acute gout, 14% had a serum urate at or below 6 mg/dL (360 µmol/L) and 32% at or below 8 mg/dL (476 µmol/L). <sup class="c" data-ref="Schlesinger2009" title="Source 354">354</sup>',
  hook:'A low urate during a flare is not evidence against gout: <b>14%</b> were at or below 6 mg/dL. <sup class="c" data-ref="Schlesinger2009" title="Source 354">354</sup>',
  pt:'The blood urate can dip during a flare, so one normal result does not mean it is not gout.'},
 screen:{n:'Medicine screen',
  what:'In pharmacokinetic studies, strong CYP3A4 or P-glycoprotein inhibitors other than azithromycin raised colchicine peak level and exposure by more than 125%, and the recommended dose cuts were 33–66% for flare treatment and 50–75% for prophylaxis. Febuxostat is contraindicated with azathioprine or mercaptopurine, and with allopurinol their doses must be reduced. <sup class="c" data-ref="Terkeltaub2011,FDA-Uloric,FDA-Allopurinol" title="Source 115,127,407">115,127,407</sup>',
  hook:'Strong CYP3A4 or P-gp inhibitors <b>more than double</b> colchicine exposure; azathioprine is a contraindication for febuxostat. <sup class="c" data-ref="Terkeltaub2011,FDA-Uloric" title="Source 127,407">127,407</sup>'},
 hosp:{n:'In hospital',
  what:'In a population cohort of 429 people with gout, the flare rate rose about tenfold during a hospital stay (RR 10.2, 95% CI 6.8–14.5), and an in-hospital flare lengthened the stay by 1.8 days. After surgery, 31 of 70 people with known gout flared, a mean 3.7 days after the operation, and only 13% of those flares involved the first MTP joint. <sup class="c" data-ref="Zleik2018,Jeong2019" title="Source 183,456">183,456</sup>',
  hook:'Post-operative gout often presents as <b>fever</b>: in one surgical series almost all flares were febrile, and many had tests for unexplained fever before gout was recognised. <sup class="c" data-ref="Craig1995" title="Source 65">65</sup>'}
};
const NU_FLAGS=[
 {t:'Could the joint be infected?',d:'Septic and gouty arthritis can coexist. In 30 such cases one-third were afebrile, 30% had a normal blood white count, and 10% had a synovial fluid white count below 6000/mm³. Ruptured or infected tophi were the commonest route, and the authors advise culturing aspirated fluid in a flare. <sup class="c" data-ref="Yu2003" title="Source 442">442</sup>'},
 {t:'Diarrhoea or vomiting on colchicine',d:'Acute colchicine toxicity typically begins within 24 hours with abdominal pain, nausea, vomiting and diarrhoea, and multi-organ failure follows at 24–72 hours. In the flare trial, gut reactions occurred in 26% at the recommended 1.8 mg over an hour against 77% at the old high dose. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>'},
 {t:'Any rash on allopurinol',d:'The label says to stop allopurinol at the first appearance of skin rash or other signs of hypersensitivity, and to tell the patient to stop and seek care promptly. Serious reactions occur in about 5 per 10,000. Thiazides, ampicillin or amoxicillin, and kidney impairment add to the rash risk. <sup class="c" data-ref="FDA-Allopurinol" title="Source 115">115</sup>'},
 {t:'Urate rising on pegloticase',d:'A urate above 6 mg/dL before an infusion, particularly on 2 consecutive checks, is the label\'s signal to stop, because loss of response carries a higher risk of anaphylaxis and infusion reactions. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup>'},
 {t:'A flare that does not settle',d:'Maximal pain within 24 hours and resolution within 14 days are the expected pattern; a course outside it is a reason to look again at the diagnosis. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup> <a href="#ddx" data-go="ddx">The differential</a>'}
];
const NU_TOOLS=[
 {n:'Flare definition',s:'Validated',b:['3 of 4: the person says it is a flare; pain at rest above 3 on 0–10; at least one swollen joint; at least one warm joint.','85% sensitive, 95% specific, accuracy 92%, in 509 patients at 17 sites.'],c:'<sup class="c" data-ref="Gaffo2018" title="Source 143">143</sup>'},
 {n:'Pain scales',s:'OMERACT filter',b:['0–4 Likert, 0–10 numeric rating or 0–100 mm visual analogue scale all pass for acute gout.','Swelling and tenderness on a 4-point Likert scale pass too.'],c:'<sup class="c" data-ref="Taylor2014" title="Source 402">402</sup>'},
 {n:'OMERACT core domains',s:'What to measure',b:['Acute gout: pain, joint swelling, joint tenderness, patient global assessment, activity limitation.','Chronic gout: serum urate, flares, tophus burden, health-related quality of life, activity limitation, pain, patient global assessment.'],c:'<sup class="c" data-ref="Schumacher2009" title="Source 358">358</sup>'},
 {n:'Gout Impact Scale',s:'Patient-reported',b:['5 scales, each scored 0–100, where higher means worse.','Two-week test–retest reliability 0.77–0.89 in 308 patients.','The minimally important difference is 5–8 points.'],c:'<sup class="c" data-ref="Hirsch2008,Khanna2011" title="Source 163,201">163,201</sup>'},
 {n:'HAQ-DI',s:'Function',b:['Valid for physical function in gout, with floor effects.','A 3-option rescoring fits the Rasch model better.','Scores correlated with days of sick leave (r² = 0.44).'],c:'<sup class="c" data-ref="Taylor2008" title="Source 400">400</sup>'},
 {n:'Vernier caliper',s:'Tophus size',b:['Longest diameter; a mean 0.45 mm difference between observers.','Correlates with CT volume, r = 0.91.','Calipers and ultrasound met most of the OMERACT filter among 8 methods.'],c:'<sup class="c" data-ref="Dalbeth2007,Dalbeth2011ARD" title="Source 69,75">69,75</sup>'}
];
const NU_CHK=[
 {t:'The order',d:'Drug, dose, route and timing as prescribed.'},
 {t:'Interactions',d:'CYP3A4 and P-gp inhibitors, azathioprine, thiazides.'},
 {t:'Kidneys, liver and tests',d:'Function, baseline bloods, genetic screens.'},
 {t:'Warning signs to teach',d:'What means stop, and who to tell.'},
 {t:'During a flare',d:'What carries on, and what is added.'}
];
const NU_SCEN={
 colch:{n:'Colchicine for a flare',flag:[1,3],
  note:'The US label gives 1.2 mg at the first sign of a flare, then 0.6 mg one hour later, a maximum of 1.8 mg in one hour. Someone already on prophylaxis can take the same flare dose, wait 12 hours, then restart the prophylactic dose. ACR 2020 strongly recommends low-dose over high-dose colchicine. Strong CYP3A4 or P-glycoprotein inhibitors raised exposure by more than 125%, so the published flare-dose cuts are 33–66%. <sup class="c" data-ref="FDA-Colcrys,FitzGerald2020,Terkeltaub2011" title="Source 117,135,407">117,135,407</sup>',
  hook:'Gut effects were <b>26%</b> at the low dose, <b>77%</b> at the old high dose and 20% on placebo; diarrhoea (23%) was the commonest reaction. <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>'},
 nsaid:{n:'An NSAID',flag:[2,3],
  note:'The naproxen label carries a boxed warning for cardiovascular thrombotic events and for gut bleeding, ulceration and perforation, with older people and those with a past ulcer or bleed at greater risk. It is contraindicated around coronary bypass surgery. It advises the lowest effective dose for the shortest time, and monitoring kidney function in kidney or liver impairment, heart failure or dehydration. The acute gout dose it gives is 750 mg, then 250 mg every 8 hours until the flare subsides. NICE suggests adding a proton pump inhibitor when an NSAID is used for a flare. <sup class="c" data-ref="FDA-Naproxen,NICE-NG219" title="Source 125,293">125,293</sup>',
  hook:'An NSAID, colchicine or a glucocorticoid are all strongly recommended first-line flare treatments in ACR 2020; the choice rests on the person\'s other conditions. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>'},
 allo:{n:'Starting allopurinol',flag:[2,3],
  note:'The label lists baseline serum urate, full blood count, chemistry, liver tests and kidney function before starting, and suggests titrating by 100 mg weekly to a urate of 6 mg/dL or less, maximum 800 mg a day. It is better tolerated after meals, doses above 300 mg are divided, and a missed dose is not doubled. ACR 2020 conditionally recommends HLA-B*58:01 testing first for people of Southeast Asian descent (carriage 7.4%) and African American people (3.8%). <sup class="c" data-ref="FDA-Allopurinol,FitzGerald2020" title="Source 115,135">115,135</sup>',
  hook:'<b>Rash = stop.</b> The label says to stop at the first rash and seek care promptly. <sup class="c" data-ref="FDA-Allopurinol" title="Source 115">115</sup>'},
 febux:{n:'Febuxostat',flag:[0,1],
  note:'The US label restricts febuxostat to people with an inadequate response to, intolerance of, or unsuitability for allopurinol, because people with established cardiovascular disease had higher cardiovascular death than on allopurinol in an outcomes study. It starts at 40 mg, going to 80 mg if urate is not below 6 mg/dL after 2 weeks, with a baseline liver panel and flare prophylaxis at the start. It is interrupted for ALT or AST above 3 times the upper limit, stopped if a serious skin reaction is suspected, and contraindicated with azathioprine or mercaptopurine. <sup class="c" data-ref="FDA-Uloric" title="Source 127">127</sup>',
  hook:'Febuxostat is <b>second line</b> in the US label, with a boxed warning for cardiovascular death. <sup class="c" data-ref="FDA-Uloric" title="Source 127">127</sup>'},
 keep:{n:'A flare while on urate-lowering therapy',flag:[4],
  note:'The allopurinol label tells patients to stay on allopurinol if a flare happens, and the pegloticase label says it need not be stopped for a flare. ACR 2020 even allows urate-lowering therapy to be started during a flare (conditional). The flare itself is treated with colchicine, an NSAID or a glucocorticoid. <sup class="c" data-ref="FDA-Allopurinol,FDA-Krystexxa,FitzGerald2020" title="Source 115,122,135">115,122,135</sup>',
  hook:'Never stop urate-lowering therapy because of a flare: only 12% of people on it knew flares can worsen when it starts. <sup class="c" data-ref="Harrold2012" title="Source 158">158</sup>'}
};
const NU_MYTHS=[
 {m:'"Allopurinol is my flare pill"',t:'It lowers urate over months; it does not treat a flare',
  a:'ACR 2020 strongly recommends colchicine, an NSAID or a glucocorticoid for the flare itself, and treat-to-target dose titration of urate-lowering therapy for the long term. The two jobs use different medicines. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>',
  q:'Ask: "Which tablet is for the pain, and which one is for the crystals?"'},
 {m:'"Stop the allopurinol while a flare is on"',t:'Keep it going through a flare',
  a:'The allopurinol label tells patients to stay on it if a flare happens, and the pegloticase label says it need not be stopped. ACR 2020 allows urate-lowering therapy to be started during a flare. <sup class="c" data-ref="FDA-Allopurinol,FDA-Krystexxa,FitzGerald2020" title="Source 115,122,135">115,122,135</sup>',
  q:'Ask: "What did you do with your allopurinol during the last flare?"'},
 {m:'"More flares since I started means it isn\'t working"',t:'Early flares are expected',
  a:'Only 12% of people on urate-lowering therapy knew flares can worsen when it starts. On pegloticase, flares fell from 74% in months 1–3 to 41% in months 4–6. In the nurse-led trial, flares were more common in year 1 and far less common in year 2. <sup class="c" data-ref="Harrold2012,FDA-Krystexxa,Doherty2018" title="Source 95,122,158">95,122,158</sup>',
  q:'Ask: "What do you think it means if you get a flare in the first few months?"'},
 {m:'"I can stop once the pain goes"',t:'Urate climbs back when it stops',
  a:'ACR 2020 conditionally recommends continuing urate-lowering therapy indefinitely. In the withdrawal series it cites, only 13% (27/211) of people whose urate stayed below 7 mg/dL off treatment were flare-free over 5 years. Qualitative syntheses describe denial, minimising symptoms and uncertainty about medicines behind stopping. <sup class="c" data-ref="FitzGerald2020,Tvedten2025,Rai2018" title="Source 135,324,414">135,324,414</sup>',
  q:'Ask: "How long do you expect to be on this tablet?"'},
 {m:'"Gout is all about diet"',t:'Genes matter far more to urate than food',
  a:'Diet scores explained at most 0.3% of the variance in serum urate, against 23.9% for common genetic variation. Detailed dietary education raised knowledge but did not lower urate in treated gout. Most people with recent gout still believed diet had caused it. <sup class="c" data-ref="Major2018,Holland2015,Dalbeth2011ACR" title="Source 74,167,244">74,167,244</sup>',
  q:'Ask: "What do you think caused your gout?"'},
 {m:'"My uric acid was normal, so it can\'t be gout"',t:'Urate can read low during a flare',
  a:'In 339 people with acute gout, 14% had a serum urate at or below 6 mg/dL and 32% at or below 8 mg/dL. <sup class="c" data-ref="Schlesinger2009" title="Source 354">354</sup>',
  q:'Ask: "When was your urate last checked: during a flare, or between flares?"'},
 {m:'"It\'s not serious, and it\'s my own fault"',t:'Both beliefs are documented barriers',
  a:'Interviews with 20 patients and 18 professionals found the beliefs that gout is self-inflicted and that you treat the flares, not the cause, widespread. The nurse-led trial names "not serious" and "self-induced by lifestyle" as barriers, shared by some doctors. Men with chronic gout described shame and isolation that led them to play down severity. <sup class="c" data-ref="Spencer2012,Doherty2018,Lindsay2011" title="Source 95,232,376">95,232,376</sup>',
  q:'Ask: "How much does gout get in the way of your life?"'}
];
const NU_DOC=[
 {k:'diary',l:'Flares since the last contact (diary)',v:'Flare diary: 2 flares since the last visit (left 1st MTP, right ankle); longest 6 days.',c:true},
 {k:'current',l:'This flare: joints, onset, the 3-of-4 check',v:'This flare: left 1st MTP, woke with it at 03:00, day 2. Says it is a flare; pain at rest 7/10; joint swollen and warm: 4 of 4.',c:true},
 {k:'septic',l:'Temperature and infection screen',v:'Temperature 37.6 °C. Single joint; skin over the tophus intact. Medical team informed.',c:true},
 {k:'su',l:'Serum urate against target',v:'Serum urate 7.9 mg/dL (470 µmol/L); target below 6 mg/dL (360 µmol/L). Drawn during a flare, so it may read low.',c:true},
 {k:'dose',l:'Urate-lowering dose and changes',v:'Allopurinol 300 mg daily, continued through the flare. Increase to 400 mg agreed with the prescriber.',c:true},
 {k:'proph',l:'Flare treatment and prophylaxis',v:'Colchicine for this flare as prescribed; prophylaxis started with allopurinol 2 months ago.',c:false},
 {k:'ae',l:'Adverse effects asked about',v:'No rash. Loose stools after colchicine: reported to the prescriber.',c:true},
 {k:'tophi',l:'Tophi: number, sites, largest diameter',v:'Tophi: 2 (right olecranon, left 1st MTP). Largest 14 mm by Vernier caliper.',c:false},
 {k:'pro',l:'Patient-reported measures',v:'Gout Impact Scale, gout concern overall: 62/100.',c:false},
 {k:'adher',l:'Adherence, asked without blame',v:'Reports about 3 missed doses in the last month; stopped for 4 days at the start of the flare, thinking it would help.',c:true},
 {k:'teach',l:'What was taught, and what they said back',v:'Taught: keep allopurinol going in a flare; early flares are expected; any rash means stop and seek care. Explained it back correctly.',c:false},
 {k:'contact',l:'Contact type and next check',v:'Clinic visit. Next urate check in 4 weeks, with a phone review in between.',c:false}
];
const NU_MON=[
 {m:0,t:'Before starting',d:'Baseline serum urate, blood count, chemistry, liver and kidney tests for allopurinol; a liver panel for febuxostat; HLA-B*58:01 where ACR 2020 suggests it.',c:'<sup class="c" data-ref="FDA-Allopurinol,FDA-Uloric,FitzGerald2020" title="Source 115,127,135">115,127,135</sup>'},
 {m:1,t:'Titrating',d:'Serum urate every 2–5 weeks while the dose is raised, and after each change; titration should take weeks to months, not years.',c:'<sup class="c" data-ref="Khanna2012P1,FitzGerald2020" title="Source 135,202">135,202</sup>'},
 {m:3,t:'Prophylaxis',d:'Anti-inflammatory prophylaxis for 3–6 months from the start, extended if flares continue (ACR 2020, strong).',c:'<sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>'},
 {m:6,t:'At target',d:'Serum urate every 6 months once at target, partly as a check on adherence (ACR 2012).',c:'<sup class="c" data-ref="Khanna2012P1" title="Source 202">202</sup>'},
 {m:12,t:'For good',d:'Urate-lowering therapy continued indefinitely (ACR 2020, conditional); after stopping, only 13% were flare-free at 5 years.',c:'<sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>'}
];
/* Doherty 2018: published values at baseline, 1 and 2 years [nurse-led, usual care] */
const NU_DT={
 target:{l:'Urate < 6 mg/dL (360 µmol/L)',n:[22.35,94.75,94.88],u:[21.46,26.22,29.71],good:'up'},
 flares:{l:'2 or more flares in the year',n:[79.92,53.99,8.00],u:[79.77,39.82,24.29],good:'down'},
 tophi:{l:'Tophi present',n:[13.73,7.06,2.85],u:[8.78,10.15,11.29],good:'down'},
 ult:{l:'Taking urate-lowering therapy',n:[39.61,96.70,96.10],u:[38.93,46.83,56.13],good:'up'}
};
const NU_SU={n:[443,251,252],u:[439,428,421]};
const nuAt=(a,mo)=>mo<=12?lerp(a[0],a[1],mo/12):lerp(a[1],a[2],(mo-12)/12);
const NU_LOOP=[
 {from:0,at:.02,k:'Month 0',t:'A first visit, not a prescription',
  txt:'Trained nurses gave a holistic assessment, discussed what the person believed about gout, explained its nature, causes, associations, consequences and treatment options, shared the decision and gave a written booklet. Once fully informed, 99% chose urate-lowering therapy. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'The first visit is mostly talking: what gout is, why crystals form, and what the choices are.',
  hook:'<b>99%</b> chose urate-lowering therapy once fully informed. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>'},
 {from:.07,at:.09,k:'Months 1–3',t:'Start low, go up step by step',
  txt:'Allopurinol started at 100 mg and rose by 100 mg every 3–4 weeks to a maximum of 900 mg, then febuxostat 80 to 120 mg or benzbromarone 50 to 200 mg if needed. Urate fell by a mean of 183 µmol/L (3.1 mg/dL) in the first 3 months. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'The dose goes up a little at a time, with a blood test before each step.',
  hook:'Titration intervals disagree: the allopurinol label says weekly, ACR every 2–5 weeks, the trial every 3–4 weeks; no head-to-head data exist. <sup class="c" data-ref="FDA-Allopurinol,FitzGerald2020,Doherty2018" title="Source 95,115,135">95,115,135</sup>'},
 {from:.19,at:.21,k:'Months 1–6',t:'Check, adjust, repeat',
  txt:'Urate was checked "as often as required", and phone contact could replace a visit. On average there were 9.3 visits and 8.3 phone calls over 2 years, mostly in the first 6 months, against 0.6 gout-specific GP visits in usual care. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'Lots of short contacts early, then fewer once the urate is low enough.',
  hook:'The loop is <b>contact → urate → dose → teaching</b>, repeated until the target is reached. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>'},
 {from:.36,at:.4,k:'Year 1',t:'More flares at first',
  txt:'Two or more flares in year 1 were more common with nurse-led care, 53.99% against 39.82%. Only 3 of 255 nurse-led patients chose colchicine prophylaxis. ACR 2020 strongly recommends prophylaxis for 3–6 months; the trial authors suggest it might not be needed if titration is slow, which is unresolved. <sup class="c" data-ref="Doherty2018,FitzGerald2020" title="Source 95,135">95,135</sup>',
  pt:'Flares can get more frequent at the start, while crystals loosen. That is expected and usually passes.',
  hook:'Early flares did not break adherence: 96.70% were still taking urate-lowering therapy at 1 year. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>'},
 {from:.5,at:.52,k:'Year 1',t:'At target',
  txt:'At 1 year, 94.75% of the nurse-led group had a urate below 360 µmol/L (6 mg/dL) against 26.22% in usual care (RR 3.59, 95% CI 2.72–4.75), and 87.42% against 13.75% were below 300 µmol/L (5 mg/dL). Mean urate fell from 443 to 251 µmol/L. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'After a year, almost everyone in the nurse group had their urate low enough to dissolve crystals.',
  hook:'Nurse-led treat-to-target: <b>95% vs 26%</b> at target at 1 year. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>'},
 {from:.72,at:.76,k:'Year 2',t:'Flares and tophi fall away',
  txt:'At 2 years, 94.88% against 29.71% were at target. Two or more flares in the year fell to 8.00% against 24.29% (RR 0.33), and tophi were present in 2.85% against 11.29%. The Gout Impact Scale concern score fell from 71.56 to 37.54 against 68.51 to 53.62. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>',
  pt:'In the second year, flares became rare and the lumps under the skin mostly went away.',
  hook:'Year 2: two or more flares in <b>8% vs 24%</b>; four or more in 1.15% vs 12.39%. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>'},
 {from:.9,at:.94,k:'Beyond 2 years',t:'Worth the cost',
  txt:'Nurse-led care cost £5066 per QALY gained at 2 years, modelled at £286 at 3 years and cost-saving from 5 years. In an earlier pilot, 90.7% of 75 responders were still on urate-lowering therapy at 5 years after GP takeover. ACR 2020 conditionally recommends an augmented, non-physician protocol for everyone on urate-lowering therapy. <sup class="c" data-ref="Doherty2018,Abhishek2017,FitzGerald2020" title="Source 1,95,135">1,95,135</sup>',
  pt:'Paying for the nurse visits saves money within a few years, because flares and hospital visits fall.',
  hook:'The trial used research nurses, not practice nurses, and its authors call for an implementation study. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>'}
];
inits.nursing=()=>{
  /* ---- 1 · assessment ---- */
  $('#nuAssessLede').innerHTML='A flare comes on fast and is gone within two weeks. Pick what to assess. The curves run through one flare, and the four boxes tick as the published flare definition is met. <sup class="c" data-ref="Neogi2015,Gaffo2018" title="Source 143,290">143,290</sup>';
  let site='joint',flags=false;
  $('#nuSites').innerHTML='<span class="kicker">Assess</span>'+Object.entries(NU_SITES).map(([k,v])=>`<button class="btn" data-nus="${k}" aria-pressed="${k===site}">${v.n}</button>`).join('');
  const svg=$('#nuSvg'),rg=$('#nuT');
  /* schematic, in days: peak within 24 h, gone by day 14 */
  const C={pain:d=>8.5*ease(ramp(d,0,.6))*(1-ease(ramp(d,1,12))),
           swell:d=>3*ease(ramp(d,.1,1))*(1-ease(ramp(d,2,13))),
           tender:d=>3*ease(ramp(d,0,.7))*(1-ease(ramp(d,1.2,11))),
           warm:d=>3*ease(ramp(d,0,.6))*(1-ease(ramp(d,1.5,9)))};
  function foot(x,y,s,d){
    const p=C.pain(d)/8.5,w=C.warm(d)/3,sw=C.swell(d)/3;
    let o=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
    o+=`<path d="M48 232 C20 230 14 196 18 160 C22 120 14 92 22 64 C28 44 46 34 70 36 C96 38 116 44 122 62 C128 84 118 118 112 150 C106 186 102 226 74 232 Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
    o+=`<ellipse cx="40" cy="22" rx="13" ry="17" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
    [[66,17,8],[86,21,7],[102,29,6],[115,41,5]].forEach(([a,b,r])=>o+=`<circle cx="${a}" cy="${b}" r="${r}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`);
    o+=`<circle cx="40" cy="56" r="${f1(16+14*w)}" style="fill:var(--terra);opacity:${f1(.12+.3*w)}"/>`;
    o+=`<circle cx="40" cy="56" r="${f1(8+6*sw)}" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:${f1(1.5+1.5*p)}"/>`;
    o+='</g>';return o}
  function panel(P){
    const S=site,d=P.d;let s=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    const cx=P.x+P.w/2;
    if(S==='joint'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">FIRST MTP JOINT · TOP VIEW</text>`;
      s+=foot(cx-62,P.y+34,.82,d);
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">glow = warmth · ring = swelling</text>`;
    }else if(S==='pain'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">PAIN AT REST · NRS 0–10</text>`;
      const x0=P.x+24,x1=P.x+P.w-24,y0=P.y+P.h/2,v=C.pain(d);
      s+=`<rect x="${x0}" y="${y0-8}" width="${x1-x0}" height="16" rx="8" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${f1(x0+(x1-x0)*.3)}" y="${y0-8}" width="${f1((x1-x0)*.7)}" height="16" rx="0" style="fill:var(--terra-soft)"/>`;
      for(let k=0;k<=10;k++){const x=lerp(x0,x1,k/10);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y0+10}" y2="${y0+16}" class="axis"/><text x="${f1(x)}" y="${y0+30}" class="t-xs t-mid">${k}</text>`}
      const xv=lerp(x0,x1,v/10);
      s+=`<path d="M${f1(xv)} ${y0-12} l-7 -12 h14 z" style="fill:var(--terra)"/><text x="${f1(xv)}" y="${y0-30}" class="t-lbl t-mid" style="fill:var(--terra)">${f1(v)}</text>`;
      s+=`<text x="${f1(x0+(x1-x0)*.65)}" y="${y0+52}" class="t-xs t-mid" style="fill:var(--terra)">above 3 = one of the 4 flare items</text>`;
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">also: swelling, tenderness, global, activity</text>`;
    }else if(S==='tophi'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">TOPHUS · VERNIER CALIPER</text>`;
      const by=P.y+P.h*.7,r=Math.min(54,P.w*.17),tx=cx;
      s+=`<path d="M${P.x+16} ${f1(by)} H${f1(tx-r)} A${r} ${f1(r*.75)} 0 0 1 ${f1(tx+r)} ${f1(by)} H${P.x+P.w-16}" style="fill:var(--field);stroke:var(--memb);stroke-width:2.4"/>`;
      const R=rng(11);for(let k=0;k<16;k++){const a=R()*Math.PI,rr=R()*r*.75;s+=needle(tx+Math.cos(a)*rr,by-Math.sin(a)*rr*.62-4,10,R()*180,.85)}
      const jy=by-r*.75-22;
      s+=`<rect x="${f1(tx-r-30)}" y="${f1(jy-14)}" width="${f1(2*r+60)}" height="12" rx="3" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
      s+=`<path d="M${f1(tx-r)} ${f1(jy-2)} V${f1(by-4)} M${f1(tx+r)} ${f1(jy-2)} V${f1(by-4)}" style="stroke:var(--ink);stroke-width:3"/>`;
      s+=`<text x="${f1(tx)}" y="${f1(jy-22)}" class="t-lbl t-mid">longest diameter 16.9 mm</text>`;
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">16.89 mm: mean largest tophus, nurse-led arm, baseline (Doherty 2018)</text>`;
    }else if(S==='urate'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">URATE DURING A FLARE · 339 PEOPLE</text>`;
      const x0=P.x+20,W=P.w-40,y0=P.y+70;
      const seg=[['≤ 6 mg/dL',14,'var(--sea)'],['6–8',18,'var(--gold-soft)'],['> 8 mg/dL',68,'var(--gold)']];let acc=0;
      seg.forEach(([l,v,c])=>{const x=x0+W*acc/100;s+=`<rect x="${f1(x)}" y="${y0}" width="${f1(W*v/100)}" height="34" style="fill:${c};stroke:var(--panel);stroke-width:2"/>`;
        s+=`<text x="${f1(x+W*v/200)}" y="${y0+56}" class="t-xs t-mid">${l}</text><text x="${f1(x+W*v/200)}" y="${y0+72}" class="t-lbl t-mid">${v}%</text>`;acc+=v});
      wrapLines('One normal result during a flare does not exclude gout; recheck between flares.',Math.round(W/6.3)).forEach((l,i)=>s+=`<text x="${x0}" y="${y0+108+i*15}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">Schlesinger 2009 · 6–8 band derived from 32% − 14%</text>`;
    }else if(S==='screen'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">COLCHICINE EXPOSURE (AUC)</text>`;
      const x0=P.x+20,W=P.w-40,y0=P.y+64,mx=250;
      [['alone',100,'var(--crocus-soft)'],['+ strong CYP3A4 / P-gp inhibitor',225,'var(--crocus)']].forEach(([l,v,c],i)=>{const y=y0+i*62;
        s+=`<text x="${x0}" y="${y-6}" class="t-xs">${l}</text><rect x="${x0}" y="${y}" width="${f1(W*v/mx)}" height="26" rx="5" style="fill:${c};stroke:var(--crocus)"/>`;
        s+=`<text x="${f1(x0+W*v/mx+6)}" y="${y+18}" class="t-lbl">${i?'> +125%':'100%'}</text>`});
      s+=`<text x="${x0}" y="${y0+146}" class="t-xs" style="fill:var(--ink)">published cuts: flare dose 33–66%, prophylaxis 50–75%</text>`;
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">bar length is the lower bound (Terkeltaub 2011)</text>`;
    }else{
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">FLARE RATE · IN HOSPITAL vs NOT</text>`;
      const x0=P.x+30,yb=P.y+P.h-56,H=P.h-110,bw=Math.min(70,P.w*.2);
      [['not in hospital',1,'var(--panel-2)'],['in hospital',10.2,'var(--terra)']].forEach(([l,v,c],i)=>{const x=x0+i*(bw+60),h=H*v/10.2;
        s+=`<rect x="${f1(x)}" y="${f1(yb-h)}" width="${f1(bw)}" height="${f1(h)}" rx="4" style="fill:${c};stroke:var(--terra)"/>`;
        s+=`<text x="${f1(x+bw/2)}" y="${yb+16}" class="t-xs t-mid">${l}</text><text x="${f1(x+bw/2)}" y="${f1(yb-h-6)}" class="t-lbl t-mid">×${v}</text>`});
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">RR 10.2, 429 people with gout (Zleik 2018)</text>`;
    }
    return s}
  const wrapLines=nuWrap;
  function draw(u){
    const N=vb(svg,'720 430','400 760');
    const d=u*16;
    const L=N?{bx:20,by:28,bw:360,rowH:56, cx:20,cy:262,cw:360, P:{x:20,y:378,w:360,h:250}, ex:20,ey:668,ew:360}
             :{bx:20,by:28,bw:300,rowH:56, cx:20,cy:244,cw:300, P:{x:344,y:14,w:362,h:300}, ex:20,ey:372,ew:686};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const OBS=[['pain','Pain at rest · NRS',v=>f1(v)+' / 10',10,'var(--terra)'],
               ['swell','Swelling · 0–3',v=>f1(v),3,'var(--terra)'],
               ['tender','Tenderness · 0–3',v=>f1(v),3,'var(--terra)'],
               ['warm','Warmth · 0–3',v=>f1(v),3,'var(--gold)']];
    OBS.forEach(([k,l,fmt,mx,c],i)=>{const y=L.by+i*L.rowH,v=C[k](d);
      s+=`<text x="${L.bx}" y="${y}" class="t-sm" style="fill:${c}">${l.toUpperCase()}</text>`;
      s+=`<rect x="${L.bx}" y="${y+8}" width="${L.bw}" height="11" rx="5.5" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${L.bx}" y="${y+8}" width="${f1(L.bw*v/mx)}" height="11" rx="5.5" style="fill:${c}"/>`;
      s+=`<text x="${L.bx+L.bw}" y="${y}" class="t-sm t-end"><tspan style="fill:var(--ink);font-weight:700">${fmt(v)}</tspan></text>`});
    // the 3-of-4 flare definition
    const items=[['says it is a flare',C.pain(d)>1.5],['pain at rest > 3/10',C.pain(d)>3],['a swollen joint',C.swell(d)>=1],['a warm joint',C.warm(d)>=1]];
    const met=items.filter(x=>x[1]).length;
    s+=`<text x="${L.cx}" y="${L.cy}" class="t-sm" style="fill:var(--ink)">FLARE DEFINITION · ${met} OF 4</text>`;
    items.forEach(([l,ok],i)=>{const x=L.cx+(i%2)*(L.cw/2),y=L.cy+16+Math.floor(i/2)*30;
      s+=`<rect x="${x}" y="${y}" width="18" height="18" rx="4" style="fill:${ok?'var(--terra)':'var(--panel)'};stroke:${ok?'var(--terra)':'var(--line)'};stroke-width:1.6"/>`;
      if(ok)s+=`<path d="M${x+4} ${y+9} l4 4 7 -8" style="fill:none;stroke:var(--panel);stroke-width:2.4;stroke-linecap:round"/>`;
      s+=`<text x="${x+26}" y="${y+14}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    s+=`<text x="${L.cx}" y="${L.cy+88}" class="t-xs" style="fill:${met>=3?'var(--terra)':'var(--muted)'};font-weight:700">${met>=3?'3 or more: meets the flare definition':'fewer than 3: does not meet it'}</text>`;
    // the selected panel
    s+=panel(Object.assign({d},L.P));
    // the time course band
    const ex=L.ex,ey=L.ey,ew=L.ew,X=v=>ex+ew*v/16;
    s+=`<text x="${ex}" y="${ey-10}" class="t-sm">ONE FLARE · peak within 24 h, settled within 14 days</text>`;
    s+=`<rect x="${ex}" y="${ey}" width="${ew}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${ex}" y="${ey}" width="${f1(X(14)-ex)}" height="14" rx="7" style="fill:var(--terra-soft)"/>`;
    s+=`<rect x="${ex}" y="${ey}" width="${f1(X(1)-ex)}" height="14" rx="4" style="fill:var(--terra);opacity:.6"/>`;
    s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${ey-5}" y2="${ey+19}" style="stroke:var(--ink);stroke-width:2.5"/>`;
    [0,2,4,6,8,10,12,14,16].filter(k=>!N||k%4===0).forEach((k,i,a)=>s+=`<text x="${f1(X(k))}" y="${ey+32}" class="t-xs ${i===a.length-1?'t-end':i===0?'':'t-mid'}">day ${k}</text>`);
    s+=`<text x="${ex}" y="${ey+52}" class="t-xs" style="fill:${d>14?'var(--bad)':'var(--muted)'}">${d>14?'beyond 14 days: outside the expected course, so look again':'within the expected course'}</text>`;
    svg.innerHTML=s;
    $('#nuRead').innerHTML=`<span>day <b>${f1(d)}</b></span><span>pain <b>${f1(C.pain(d))}/10</b></span><span>flare items met <b>${met} of 4</b></span>`;
    const S=NU_SITES[site];
    $('#nuNote').innerHTML=flags
      ? `<div class="kicker">Red flags</div><h4>When it may not be a simple flare</h4>`+NU_FLAGS.map(f=>`<div class="kv"><div><dt>${f.t}</dt><dd>${f.d}</dd></div></div>`).join('')
      : `<div class="kicker">${S.n}</div><h4>What the literature describes</h4><p>${S.what}</p>`+(S.hook?`<div class="hook"><b>Exam hook</b>${S.hook}</div>`:'')+(S.pt?`<div class="pt"><b>In plain words</b>${S.pt}</div>`:'');
  }
  playWire(rg,$('#nuPlay'),draw,13000,'Replay','nursing');
  $('#nuSites').addEventListener('click',e=>{const b=e.target.closest('[data-nus]');if(!b)return;site=b.dataset.nus;$$('[data-nus]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#nuFlag').onclick=()=>{flags=!flags;$('#nuFlag').setAttribute('aria-pressed',flags);$('#nuFlag').textContent=flags?'Back to the assessment':'Show the red flags';draw(+rg.value)};
  $('#nuTools').innerHTML=NU_TOOLS.map(t=>`<div class="nu-card"><span class="tag sea">${t.s}</span><h5>${t.n}</h5><ul>${t.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${t.c}</p></div>`).join('');

  /* ---- 2 · giving the medicines ---- */
  $('#nuMedLede').innerHTML='Five checks come before any dose. Pick a medicine or a situation and see which checks it changes. The detail comes from the US labels and ACR 2020. <sup class="c" data-ref="FDA-Colcrys,FDA-Allopurinol,FDA-Uloric,FDA-Naproxen,FitzGerald2020" title="Source 115,117,125,127,135">115,117,125,127,135</sup>';
  let scen='colch';
  $('#nuScen').innerHTML='<span class="kicker">Situation</span>'+Object.entries(NU_SCEN).map(([k,v])=>`<button class="btn" data-nusc="${k}" aria-pressed="${k===scen}">${v.n}</button>`).join('');
  const msv=$('#nuMedSvg');
  function drawMed(){
    const N=vb(msv,'560 400','400 420');
    const S=NU_SCEN[scen];let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const w=N?360:480,x=N?20:40,gap=N?78:72,y0=N?22:26;
    NU_CHK.forEach((st,i)=>{const y=y0+i*gap,ok=!S.flag.includes(i);
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${N?64:58}" rx="11" style="fill:var(--panel);stroke:${ok?'var(--line)':'var(--terra)'};stroke-width:${ok?1:2.5}"/>`;
      s+=`<circle cx="${x+26}" cy="${y+29}" r="13" style="fill:${ok?'var(--good-soft)':'var(--terra-soft)'};stroke:${ok?'var(--good)':'var(--terra)'};stroke-width:2"/>`;
      s+=ok?`<path d="M${x+20} ${y+29} l4 5 8 -10" style="fill:none;stroke:var(--good);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`
           :`<text x="${x+26}" y="${y+34}" class="t-lbl t-mid" style="fill:var(--terra)">!</text>`;
      s+=`<text x="${x+50}" y="${y+24}" class="t-lbl">${st.t}</text>`;
      nuWrap(st.d,N?44:60).forEach((l,j)=>s+=`<text x="${x+50}" y="${y+42+j*13}" class="t-xs">${l}</text>`)});
    msv.innerHTML=s;
    $('#nuMedNote').innerHTML=`<div class="kicker">${S.n}</div><h4>What the label and guideline say</h4><p>${S.note}</p><div class="hook"><b>Exam hook</b>${S.hook}</div>`;
    $('#nuMedCap').textContent='Five checks, and the ones this situation changes (marked !). Drawn from the labels and guidelines, not a local protocol.';
  }
  $('#nuScen').addEventListener('click',e=>{const b=e.target.closest('[data-nusc]');if(!b)return;scen=b.dataset.nusc;$$('[data-nusc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMed()});

  /* ---- pegloticase ---- */
  const psv=$('#nuPegSvg'),prg=$('#nuPegT');let loss=false;
  const PG_RESP=[9.2,.6,.4,.5,.4,.5,.4,.5,.6,.5,.4,.5,.4];
  const PG_LOSS=[9.2,.6,.5,.8,2.4,4.6,6.8,7.6,7.9,8.2,8.4,8.5,8.6];
  function drawPeg(u){
    const N=vb(psv,'720 360','400 600');
    const wk=lerp(-5,25,u),SU=loss?PG_LOSS:PG_RESP;
    let stopAt=-1;if(loss)for(let i=1;i<SU.length;i++)if(SU[i]>6&&SU[i-1]>6){stopAt=i;break}
    const x0=N?30:110,x1=N?384:700,X=w=>lerp(x0,x1,(w+5)/30);
    const ty=N?86:78;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="24" class="t-sm" style="fill:var(--sea)">PEGLOTICASE · US LABEL SCHEDULE</text>`;
    // lead-in band
    s+=`<rect x="${f1(X(-4))}" y="${ty-12}" width="${f1(X(24.5)-X(-4))}" height="24" rx="6" style="fill:var(--sea-soft);opacity:.6"/>`;
    (N?['methotrexate 15 mg weekly + folic acid,','from at least 4 weeks before']:['methotrexate 15 mg weekly + folic acid, from at least 4 weeks before']).forEach((l,i)=>s+=`<text x="${f1(X(-4)+4)}" y="${ty+28+i*13}" class="t-xs" style="fill:var(--sea)">${l}</text>`);
    if(!N)s+=`<text x="16" y="${ty+4}" class="t-xs">weekly MTX</text>`;
    // pre-start checks
    const pre=[[-4.5,'G6PD screen'],[-1,'stop oral ULT']];
    pre.forEach(([w,l],i)=>{const on=wk>=w;s+=`<path d="M${f1(X(w))} ${ty-20} l-6 -10 h12 z" style="fill:${on?'var(--warn)':'var(--panel-2)'};stroke:var(--warn)"/>`;
      s+=N?`<text x="${f1(X(w))}" y="${ty-36-i*12}" class="t-xs ${i?'t-mid':''}" style="fill:var(--warn)">${l}</text>`:`<text x="${f1(X(w)+(i?10:-10))}" y="${ty-24}" class="t-xs ${i?'':'t-end'}" style="fill:var(--warn)">${l}</text>`});
    // infusions
    const iy=N?160:150;
    if(!N)s+=`<text x="16" y="${iy+4}" class="t-xs">infusion</text>`;
    for(let k=0;k<13;k++){const w=k*2,x=X(w),given=wk>=w&&(stopAt<0||k<stopAt),stopped=stopAt>=0&&k>=stopAt;
      s+=`<path d="M${f1(x)} ${iy-14} c7 9 7 15 0 20 c-7 -5 -7 -11 0 -20z" style="fill:${stopped?'var(--panel-2)':given?'var(--sea)':'var(--panel)'};stroke:${stopped?'var(--line)':'var(--sea)'};stroke-width:1.4"/>`;
      if(k%(N?4:2)===0)s+=`<text x="${f1(x)}" y="${iy+22}" class="t-xs t-mid">wk ${w}</text>`}
    // urate chart
    const gy0=N?212:212,gy1=N?340:300,Y=v=>lerp(gy1,gy0,v/10);
    s+=`<text x="${N?16:16}" y="${gy0-10}" class="t-sm">URATE BEFORE EACH INFUSION · SCHEMATIC</text>`;
    [0,6,10].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v===6?'':'grid'}" style="${v===6?'stroke:var(--sea);stroke-width:1.6;stroke-dasharray:5 4':''}"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<text x="${x1}" y="${f1(Y(6)-6)}" class="t-xs t-end" style="fill:var(--sea)">6 mg/dL: stop above this</text>`;
    let d='';SU.forEach((v,k)=>{if(wk<k*2)return;if(stopAt>=0&&k>stopAt)return;d+=(d?'L':'M')+f1(X(k*2))+' '+f1(Y(v))});
    if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--gold);stroke-width:2"/>`;
    SU.forEach((v,k)=>{if(wk<k*2||(stopAt>=0&&k>stopAt))return;const hi=v>6;
      s+=`<circle cx="${f1(X(k*2))}" cy="${f1(Y(v))}" r="${hi?6:4.5}" style="fill:${hi?'var(--bad)':'var(--gold)'};stroke:var(--panel);stroke-width:1.5"/>`});
    if(stopAt>=0&&wk>=stopAt*2){const x=X(stopAt*2);
      s+=`<path d="M${f1(x-9)} ${iy-20} l18 18 M${f1(x+9)} ${iy-20} l-18 18" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
      s+=`<text x="${f1(Math.min(x,x1-60))}" y="${gy1+(N?20:18)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">2 checks above 6: stop</text>`}
    s+=`<line x1="${f1(X(wk))}" x2="${f1(X(wk))}" y1="${ty-30}" y2="${gy1}" style="stroke:var(--ink);stroke-width:1.4;opacity:.45"/>`;
    // the routine at each infusion
    const ry=N?390:346;
    const steps=['check urate','pre-medicate','infuse ≥ 120 min','observe'];
    if(N){s+=`<text x="16" y="${ry}" class="t-sm">AT EVERY INFUSION</text>`;
      steps.forEach((l,i)=>{const y=ry+18+i*26;s+=`<circle cx="26" cy="${y-4}" r="9" style="fill:var(--sea-soft);stroke:var(--sea)"/><text x="26" y="${y}" class="t-xs t-mid" style="fill:var(--sea);font-weight:700">${i+1}</text><text x="44" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
      nuWrap('Pre-medication is an antihistamine and a corticosteroid, in a setting ready for anaphylaxis.',58).forEach((l,i)=>s+=`<text x="16" y="${ry+136+i*14}" class="t-xs">${l}</text>`);
    }else{
      s+=`<text x="16" y="${ry}" class="t-xs">every infusion:</text>`;
      steps.forEach((l,i)=>{const x=150+i*140;s+=`<circle cx="${x}" cy="${ry-4}" r="9" style="fill:var(--sea-soft);stroke:var(--sea)"/><text x="${x}" y="${ry}" class="t-xs t-mid" style="fill:var(--sea);font-weight:700">${i+1}</text><text x="${x+14}" y="${ry}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    }
    psv.innerHTML=s;
    let k=-1;for(let i=0;i<13;i++)if(wk>=i*2)k=i;
    let h,txt,hook,pt;
    if(k<0){h='Before the first infusion';txt='Methotrexate 15 mg weekly, with folic or folinic acid, starts at least 4 weeks before. People at higher risk of G6PD deficiency (African, Mediterranean or Southern Asian ancestry) are screened first, because the deficiency is a contraindication: haemolysis and methaemoglobinaemia. Oral urate-lowering drugs are stopped before pegloticase starts. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup>';
      hook='Pegloticase is <b>contraindicated in G6PD deficiency</b>. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup>';pt='Before the first drip: weeks of methotrexate tablets, a blood test for G6PD, and the urate tablets stop.'}
    else if(stopAt>=0&&k>=stopAt){h='Stop: two checks above 6 mg/dL';txt='The label says to measure urate before every infusion and to stop treatment if it rises above 6 mg/dL, "particularly when 2 consecutive levels above 6 mg/dL are observed". Loss of response carries a higher risk of anaphylaxis and infusion reactions. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup>';
      hook='A rising pre-infusion urate predicts reactions: it is the <b>stopping rule</b>, not just a result. <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup>';pt='If the urate comes back up, the body has started to block the drug, and the next drip could cause a bad reaction. So it stops.'}
    else{h=`Infusion ${k+1}: urate ${f1(SU[k])} mg/dL, so it goes ahead`;txt='The label gives 8 mg intravenously every 2 weeks over no less than 120 minutes, with pre-medication (antihistamines and corticosteroids), in a setting ready for anaphylaxis, with observation afterwards. In MIRROR, adding methotrexate raised the month-6 response from 38.5% to 71.0% and cut infusion reactions from 30.6% to 4.2%. Without methotrexate, anaphylaxis occurred in 6.5% in the pre-marketing trials. <sup class="c" data-ref="FDA-Krystexxa,Botson2023" title="Source 27,122">27,122</sup>';
      hook='Methotrexate with pegloticase: response <b>71.0% vs 38.5%</b>, infusion reactions <b>4.2% vs 30.6%</b>. <sup class="c" data-ref="Botson2023" title="Source 27">27</sup>';pt='Every two weeks: a blood test first, then medicines to prevent a reaction, then a two-hour drip, then a wait to make sure all is well.'}
    $('#nuPegNote').innerHTML=noteHTML({k:wk<0?'Week '+Math.round(wk):'Week '+Math.max(0,Math.floor(wk)),t:h,txt,pt,hook});
  }
  playWire(prg,$('#nuPegPlay'),drawPeg,14000,'Replay','nursing');
  $('#nuPegLoss').onclick=()=>{loss=!loss;$('#nuPegLoss').setAttribute('aria-pressed',loss);$('#nuPegLoss').textContent=loss?'Show a sustained response':'Show a loss of response';drawPeg(+prg.value)};

  /* ---- 3 · the nurse-led loop ---- */
  $('#nuLoopLede').innerHTML='In the Nottingham trial, 517 people with a recent flare were randomised to nurse-led care or usual GP care for 2 years. The nurses explained gout, shared the decision, and raised the dose until urate was on target. The loop below repeats until it is. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>';
  const lsv=$('#nuLoopSvg'),lrg=$('#nuLoopT');
  const NODES=['contact','urate','dose','teach'];
  /* schematic pace: most contacts in the first 6 months */
  const laps=mo=>6*ease(ramp(mo,0,6))+2*ramp(mo,6,24);
  function drawLoop(u){
    const N=vb(lsv,'720 420','400 660');
    const mo=u*24,ph=phaseOf(NU_LOOP,u);
    const L=N?{cx:200,cy:156,r:100, bx:20,by:360,bw:360,mH:72}:{cx:180,cy:206,r:118, bx:376,by:44,bw:320,mH:76};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="24" class="t-sm" style="fill:var(--sea)">THE NURSE-LED LOOP</text>`;
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${L.r}" style="fill:none;stroke:var(--sea-soft);stroke-width:14"/>`;
    const lp=laps(mo),ang=lp*2*Math.PI-Math.PI/2;
    // arc travelled in the current lap
    const fr=lp%1,a0=-Math.PI/2,a1=a0+fr*2*Math.PI,large=fr>.5?1:0;
    if(fr>.002)s+=`<path d="M${f1(L.cx+L.r*Math.cos(a0))} ${f1(L.cy+L.r*Math.sin(a0))} A${L.r} ${L.r} 0 ${large} 1 ${f1(L.cx+L.r*Math.cos(a1))} ${f1(L.cy+L.r*Math.sin(a1))}" style="fill:none;stroke:var(--sea);stroke-width:5;stroke-linecap:round"/>`;
    NODES.forEach((n,i)=>{const a=-Math.PI/2+i*Math.PI/2,x=L.cx+L.r*Math.cos(a),y=L.cy+L.r*Math.sin(a),on=Math.floor(fr*4)===i&&mo<23.9;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?16:12}" style="fill:${on?'var(--sea)':'var(--panel)'};stroke:var(--sea);stroke-width:2"/>`;
      const lx=x+(i===1?22:i===3?-22:0),ly=y+(i===0?-24:i===2?32:4),an=i===1?'':i===3?'t-end':'t-mid';
      s+=`<text x="${f1(lx)}" y="${f1(ly)}" class="t-xs ${an}" style="fill:var(--ink);font-weight:700">${n}</text>`});
    s+=`<circle cx="${f1(L.cx+L.r*Math.cos(ang))}" cy="${f1(L.cy+L.r*Math.sin(ang))}" r="7" style="fill:var(--ink)"/>`;
    const suN=nuAt(NU_SU.n,mo)/59.48,suU=nuAt(NU_SU.u,mo)/59.48;
    s+=`<text x="${L.cx}" y="${L.cy-8}" class="t-big t-mid" style="font-size:24px;fill:${suN<6?'var(--sea)':'var(--gold)'}">${f1(suN)}</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+10}" class="t-xs t-mid">mean urate, mg/dL</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+26}" class="t-xs t-mid">usual care ${f1(suU)}</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+L.r+(N?52:48)}" class="t-xs t-mid">month ${Math.floor(mo)} · ${mo<6?'frequent contacts':mo<12?'fewer contacts':'at target, follow-up'}</text>`;
    // bars
    s+=`<text x="${L.bx}" y="${L.by-18}" class="t-sm">NURSE-LED vs USUAL CARE (%)</text>`;
    Object.values(NU_DT).forEach((m,i)=>{const y=L.by+i*L.mH,vn=nuAt(m.n,mo),vu=nuAt(m.u,mo);
      s+=`<text x="${L.bx}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:700">${m.l}</text>`;
      [[vn,'var(--sea)','nurse'],[vu,'var(--muted)','usual']].forEach(([v,c,l],j)=>{const yy=y+8+j*20;
        s+=`<rect x="${L.bx}" y="${yy}" width="${L.bw-56}" height="13" rx="6.5" style="fill:var(--panel-2)"/>`;
        s+=`<rect x="${L.bx}" y="${yy}" width="${f1((L.bw-56)*v/100)}" height="13" rx="6.5" style="fill:${c}"/>`;
        s+=`<text x="${L.bx+L.bw}" y="${yy+11}" class="t-xs t-end"><tspan style="fill:${c};font-weight:700">${f1(v)}</tspan> ${l}</text>`})});
    s+=`<text x="${L.bx}" y="${L.by+4*L.mH-8}" class="t-xs">published at 0, 12 and 24 months · interpolated between</text>`;
    lsv.innerHTML=s;
    setLoop(ph);
    $('#nuLoopRead').innerHTML=`<span>month <b>${Math.floor(mo)}</b></span><span>at target <b>${f1(nuAt(NU_DT.target.n,mo))}% vs ${f1(nuAt(NU_DT.target.u,mo))}%</b></span><span>mean urate <b>${Math.round(nuAt(NU_SU.n,mo))} vs ${Math.round(nuAt(NU_SU.u,mo))} µmol/L</b></span>`;
    $('#nuLoopNote').innerHTML=noteHTML(NU_LOOP[ph]);
  }
  const stopL=playWire(lrg,$('#nuLoopPlay'),drawLoop,20000,'Replay','nursing');
  const setLoop=stepWire($('#nuLoopSteps'),NU_LOOP,lrg,drawLoop,stopL);

  /* ---- 4 · teaching ---- */
  $('#nuTeachLede').innerHTML='EULAR 2016 makes education an overarching principle: people with gout should be told about the disease and its treatments, and taught to treat a flare at the first warning symptoms. These are the misunderstandings the studies record. <sup class="c" data-ref="Richette2017" title="Source 331">331</sup>';
  let myth=0;
  function renderMyths(){
    $('#nuMyths').innerHTML=NU_MYTHS.map((m,i)=>`<button class="nu-q" data-nm="${i}" aria-expanded="${i===myth}"><span class="myth">Often believed</span><b>${m.m}</b></button>`).join('');
    const M=NU_MYTHS[myth];
    $('#nuMythNote').innerHTML=`<div class="kicker">What the literature says</div><h4>${M.t}</h4><div class="nu-ans"><p>${M.a}</p><p><b>${M.q}</b></p></div>`;
  }
  $('#nuMyths').addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;myth=+b.dataset.nm;renderMyths()});
  renderMyths();

  /* adherence */
  const asv=$('#nuAdhSvg');let pilot=false;
  function drawAdh(){
    const N=vb(asv,'560 320','400 340');
    const x0=N?46:60,x1=N?380:530,y0=N?40:36,y1=N?250:250,X=v=>lerp(x0,x1,v/5),Y=v=>lerp(y1,y0,v/100);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="22" class="t-sm">STILL ON ALLOPURINOL (NO 90-DAY GAP)</text>`;
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    [0,1,2,3,4,5].forEach(v=>s+=`<text x="${f1(X(v))}" y="${y1+16}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${x1}" y="${y1+32}" class="t-xs t-end">years after starting</text>`;
    const P=[[0,100],[1,61.5],[5,43.1]];
    s+=`<path d="M${P.map(p=>f1(X(p[0]))+' '+f1(Y(p[1]))).join('L')}" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:4 4"/>`;
    P.forEach(p=>{s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="5" style="fill:var(--gold)"/>`;if(p[0])s+=`<text x="${f1(X(p[0])+(p[0]===5?-8:8))}" y="${f1(Y(p[1])-9)}" class="t-lbl ${p[0]===5?'t-end':''}">${p[1]}%</text>`});
    s+=`<text x="${f1(X(1.2))}" y="${f1(Y(36))}" class="t-xs">usual care, 48,280 UK starters</text>`;
    if(pilot){s+=`<circle cx="${f1(X(5))}" cy="${f1(Y(90.7))}" r="7" style="fill:var(--sea)"/><text x="${f1(X(5)-10)}" y="${f1(Y(90.7)+4)}" class="t-lbl t-end" style="fill:var(--sea)">90.7% nurse-led pilot</text>`;
      s+=`<text x="${f1(X(5)-10)}" y="${f1(Y(90.7)+20)}" class="t-xs t-end">75 responders; not the same denominator</text>`}
    asv.innerHTML=s;
    $('#nuAdhNote').innerHTML=`<div class="kicker">Adherence</div><h4>Most people stop</h4><p>Among 48,280 UK people starting allopurinol, 38.5% had a first 90-day gap by 1 year and 56.9% by 5 years, so 61.5% and 43.1% were still persisting; 61% were non-adherent overall. After a gap, 43.3% restarted within a year. A meta-analysis of 13 studies pooled 46% adherent. <sup class="c" data-ref="Scheepers2018Rheum,Scheepers2018SAR" title="Source 351,352">351,352</sup></p>`+
      (pilot?`<p>In the nurse-led pilot, 90.7% of the 75 people who replied at 5 years were still on urate-lowering therapy after GP takeover, and 85.3% took it at least 6 days a week. It is a small, self-selected group, so the two figures are not a like-for-like comparison. <sup class="c" data-ref="Abhishek2017" title="Source 1">1</sup></p>`:'')+
      `<div class="hook"><b>Exam hook</b>Persistence falls fast: <b>61.5%</b> still on allopurinol at 1 year, <b>43.1%</b> at 5 years. <sup class="c" data-ref="Scheepers2018Rheum" title="Source 351">351</sup></div><div class="pt"><b>In plain words</b>More than half of people have stopped their urate tablet within five years. People who feel they understand gout are more likely to keep taking it.</div>`;
  }
  $('#nuAdhBtn').onclick=()=>{pilot=!pilot;$('#nuAdhBtn').setAttribute('aria-pressed',pilot);$('#nuAdhBtn').textContent=pilot?'Hide the nurse-led pilot':'Add the nurse-led pilot';drawAdh()};
  $('#nuTeachCards').innerHTML=`
   <div class="nu-card"><h5>What the effective model taught</h5><ul><li>The nature, causes, associations and consequences of gout, and the treatment options, with a written booklet and a shared decision.</li><li>What the person believes about gout, discussed rather than corrected.</li><li>ACR 2020's patient panel asked for a "medication-in-pocket" flare plan for people who recognise early signs.</li></ul><p class="stage-cap"><sup class="c" data-ref="Doherty2018,FitzGerald2020" title="Source 95,135">95,135</sup></p></div>
   <div class="nu-card"><h5>What people do not know</h5><ul><li>In 240 US respondents, seafood, beef, pork and beer were recognised as triggers by only 23%, 22%, 7% and 43%.</li><li>Only 12% of those on urate-lowering therapy knew flares can worsen when it starts.</li><li>Poor health literacy (9.4% of 551 primary-care patients) was linked to 2 or more flares a year (adjusted OR 4.10).</li></ul><p class="stage-cap"><sup class="c" data-ref="Harrold2012,Watson2024" title="Source 158,427">158,427</sup></p></div>
   <div class="nu-card"><h5>Beliefs change outcomes</h5><ul><li>In 142 people with gout for under 10 years, adherence rose with perceived understanding and fell with perceived severity, and negative perceptions predicted worse disability at 1 year.</li><li>Beliefs about consequences predicted all-cause mortality (HR 1.18) in 242 people.</li></ul><p class="stage-cap"><sup class="c" data-ref="Dalbeth2011ACR,Serlachius2017" title="Source 74,362">74,362</sup></p></div>
   <div class="nu-card"><h5>Asking about adherence</h5><ul><li>EULAR's points to consider: discuss adherence regularly, assess it without blame, build trust and tailor the solution. Non-adherence in rheumatic diseases runs at 30–80%.</li><li>EULAR's patient-education recommendations (eight, four with strength-A evidence) cover when, by whom and how education is given.</li></ul><p class="stage-cap"><sup class="c" data-ref="Ritschl2021,Zangi2015" title="Source 333,444">333,444</sup></p></div>
   <div class="nu-card"><h5>Other people who can run the loop</h5><ul><li>A 1463-patient site-randomised trial of pharmacist-led, mostly automated telephone care improved adherence (50% vs 37%) and urate below 6 mg/dL (30% vs 15%) at 1 year; the adherence gain faded in year 2.</li><li>A 77-patient pharmacist telephone trial reached urate at or below 6 mg/dL in 35% vs 13% at 26 weeks.</li><li>ACR 2020 says the key is that the treating provider, who could be the physician, educates and treats to target where such staff are not available.</li></ul><p class="stage-cap"><sup class="c" data-ref="Mikuls2019,Goldfien2016,FitzGerald2020" title="Source 135,147,262">135,147,262</sup></p></div>
   <div class="nu-card"><h5>Shame and stigma</h5><ul><li>A synthesis of 45 qualitative studies (1203 patients) found five themes: denying illness, negotiating uncertainty, juggling competing priorities, minimising symptoms and lifestyle restrictions, and developing strategies and empowerment.</li><li>ACR 2020 aimed to give lifestyle guidance "without implying any patient-blaming", given gout's strong genetic determinants.</li></ul><p class="stage-cap"><sup class="c" data-ref="Tvedten2025,FitzGerald2020" title="Source 135,414">135,414</sup></p></div>`;

  /* ---- 5 · hospital ---- */
  $('#nuHosp').innerHTML=`
   <div class="nu-card"><span class="tag terra">Risk</span><h5>A tenfold rise</h5><ul><li>In 429 people with gout the flare rate rose about tenfold during a hospital stay (RR 10.2), and an in-hospital flare added 1.8 days to the stay.</li></ul><p class="stage-cap"><sup class="c" data-ref="Zleik2018" title="Source 456">456</sup></p></div>
   <div class="nu-card"><span class="tag terra">Prediction</span><h5>The GOUT-36 rule</h5><ul><li>Four pre-admission items: no flare prophylaxis, no urate-lowering therapy, a tophus, and urate above 0.36 mmol/L (6 mg/dL) in the past year.</li><li>75% sensitive and 67% specific for inpatient flares; in validation, 80% of very-high-risk patients flared against 11% of low-risk patients.</li></ul><p class="stage-cap"><sup class="c" data-ref="Jatuworapruk2022Rheum" title="Source 182">182</sup></p></div>
   <div class="nu-card"><span class="tag terra">After surgery</span><h5>Days 1 to 17</h5><ul><li>31 of 70 people (44.3%) with known gout flared a mean 3.7 days after surgery; 61.3% were monoarticular, 83.9% in the lower limb, and only 13% in the first MTP joint.</li><li>Pre-operative urate of 9 mg/dL (535 µmol/L) or more had OR 3.77; taking allopurinol had OR 0.15.</li><li>In an older series, 52 of 302 flared 1–17 days after admission, almost all with fever.</li></ul><p class="stage-cap"><sup class="c" data-ref="Jeong2019,Craig1995" title="Source 65,183">65,183</sup></p></div>
   <div class="nu-card"><span class="tag warn">Evidence gap</span><h5>Keep the urate tablet going?</h5><ul><li>Regular pre-admission urate-lowering therapy was linked to a 10% shorter stay in 36,047 New Zealand admissions (observational).</li><li>No trial has tested continuing or starting urate-lowering therapy during an admission.</li></ul><p class="stage-cap"><sup class="c" data-ref="Jatuworapruk2022IJRD,Jatuworapruk2022Rheum" title="Source 181,182">181,182</sup></p></div>`;

  /* ---- 6 · documentation ---- */
  $('#nuDocLede').innerHTML='The nurse-led trial recorded flare diaries, urate at every titration contact, doses and changes, side-effects and reasons for stopping, tophus number, sites and largest diameter, the SF-36 and Gout Impact Scale, and every visit or call. That is a ready template. Tick what you observed and the entry assembles. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>';
  const state={};NU_DOC.forEach(f=>state[f.k]=f.c);
  function renderDoc(){
    $('#nuDocFields').innerHTML=NU_DOC.map(f=>`<label><input type="checkbox" data-nd="${f.k}" ${state[f.k]?'checked':''}><span>${f.l}</span></label>`).join('');
    const lines=NU_DOC.filter(f=>state[f.k]).map(f=>f.v);
    $('#nuDocOut').textContent=lines.length?lines.join('\n'):'Nothing ticked yet.';
  }
  $('#nuDocFields').addEventListener('change',e=>{const i=e.target.closest('[data-nd]');if(!i)return;state[i.dataset.nd]=i.checked;renderDoc()});
  $('#nuDocAll').onclick=()=>{NU_DOC.forEach(f=>state[f.k]=true);renderDoc()};
  $('#nuDocNone').onclick=()=>{NU_DOC.forEach(f=>state[f.k]=false);renderDoc()};
  renderDoc();

  /* monitoring plan */
  const mv=$('#nuMonSvg'),mr=$('#nuMonT');
  function drawMon(t){
    const N=vb(mv,'720 230','400 420');
    const T=t*12;let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(N){
      NU_MON.forEach((e,i)=>{const y=30+i*78,on=T>=e.m;
        s+=`<circle cx="30" cy="${y}" r="9" style="fill:${on?'var(--sea)':'var(--panel-2)'};stroke:var(--sea);stroke-width:2"/>`;
        if(i<NU_MON.length-1)s+=`<line x1="30" x2="30" y1="${y+10}" y2="${y+68}" style="stroke:var(--line);stroke-width:2"/>`;
        s+=`<text x="52" y="${y+4}" class="t-lbl" style="opacity:${on?1:.45}">${e.m===12?'month 12+':'month '+e.m} · ${e.t}</text>`;
        nuWrap(e.d,52).slice(0,3).forEach((l,j)=>s+=`<text x="52" y="${y+20+j*13}" class="t-xs" style="opacity:${on?1:.45}">${l}${j===2&&nuWrap(e.d,52).length>3?'…':''}</text>`)});
    }else{
      const x0=60,x1=680,xm=m=>lerp(x0,x1,m/12);
      s+=`<line x1="${x0}" x2="${x1}" y1="120" y2="120" class="axis"/>`;
      for(let m=0;m<=12;m+=3)s+=`<text x="${f1(xm(m))}" y="146" class="t-xs t-mid">${m===12?'month 12+':'month '+m}</text>`;
      NU_MON.forEach((e,i)=>{const x=xm(e.m),on=T>=e.m,up=i%2===0;
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${up?80:120}" y2="${up?120:160}" style="stroke:var(--line);stroke-width:1.5"/>`;
        s+=`<circle cx="${f1(x)}" cy="120" r="8" style="fill:${on?'var(--sea)':'var(--panel-2)'};stroke:var(--sea);stroke-width:2"/>`;
        s+=`<text x="${f1(x)}" y="${up?70:180}" class="t-lbl ${i===0?'':i===NU_MON.length-1?'t-end':'t-mid'}" style="opacity:${on?1:.45}">${e.t}</text>`});
      s+=`<line x1="${f1(xm(Math.min(T,12)))}" x2="${f1(xm(Math.min(T,12)))}" y1="40" y2="200" style="stroke:var(--ink);stroke-width:1.5;opacity:.3"/>`;
    }
    mv.innerHTML=s;
    const reached=NU_MON.filter(e=>T>=e.m).slice(-1)[0]||NU_MON[0];
    $('#nuMonCap').innerHTML=`Month ${T.toFixed(0)} · <b>${reached.t}</b>. ${reached.d} ${reached.c}`;
  }
  playWire(mr,$('#nuMonPlay'),drawMon,9000,'Replay','nursing');
  $('#nuDocCards').innerHTML=`
   <div class="nu-card"><h5>Measures with published validity</h5><ul><li>The 3-of-4 flare definition, pain on an NRS or VAS, the Gout Impact Scale, HAQ-DI and caliper tophus diameter all have published validity for the record.</li></ul><p class="stage-cap"><sup class="c" data-ref="Gaffo2018,Taylor2014,Hirsch2008,Taylor2008,Dalbeth2007" title="Source 69,143,163,400,402">69,143,163,400,402</sup></p></div>
   <div class="nu-card"><h5>Pregnancy</h5><ul><li>BSR 2023 asks that the risks and benefits of drug treatment in pregnancy be discussed and clearly documented by every professional involved (GRADE 1A).</li></ul><p class="stage-cap"><sup class="c" data-ref="Schreiber2023" title="Source 356">356</sup></p></div>
   <div class="nu-card"><h5>What the record is for</h5><ul><li>Checking urate every 6 months at target is partly a check on adherence, so the result belongs next to what the person says they take.</li><li>Every contact counted in the trial, including phone calls: 9.3 visits and 8.3 calls on average over 2 years.</li></ul><p class="stage-cap"><sup class="c" data-ref="Khanna2012P1,Doherty2018" title="Source 95,202">95,202</sup></p></div>`;

  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawMed();drawAdh()};
  draw(+rg.value);drawMed();drawPeg(+prg.value);drawLoop(+lrg.value);drawAdh();drawMon(+mr.value);
};
/* =============== 5.3 toward a cure =============== */
const cuWrap=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
const CU_LVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
const CU_LVLTXT={est:['ESTABLISHED','var(--good)'],early:['EARLY EVIDENCE','var(--warn)'],hyp:['HYPOTHESIS','var(--crocus)']};
/* 1 · crystal clearance */
const CU_X=[
 {from:0,at:.02,k:'Before treatment',t:'Crystals sit in the joint',
  txt:'Gout is a disease of monosodium urate crystal deposits, and those deposits are reversible: long-term urate-lowering therapy dissolves them and so prevents flares and tophi. Plasma is saturated with urate at about 6.8 mg/dL (405 µmol/L). <sup class="c" data-ref="Dalbeth2021,Dalbeth2019NRDP,Martillo2014" title="Source 84,85,249">84,85,249</sup>',
  pt:'Above a certain level, urate comes out of solution as tiny needles. Bring the level down and the needles can melt back.',
  hook:'Gout is the one common arthritis with a <b>removable cause</b>: the crystal. <sup class="c" data-ref="Dalbeth2021" title="Source 85">85</sup>'},
 {from:.08,at:.1,k:'Months 0–3',t:'Urate brought below target',
  txt:'EULAR 2016 sets the target as below 6 mg/dL (360 µmol/L), or below 5 mg/dL (300 µmol/L) in severe gout, "to cure the disease". ACR 2020 strongly recommends treat-to-target titration with a target below 6 mg/dL. A target below saturation keeps the gradient in favour of dissolution. <sup class="c" data-ref="Richette2017,FitzGerald2020,Martillo2014" title="Source 135,249,331">135,249,331</sup>',
  pt:'The urate number in the blood has to stay under the line, every day, for the crystals to shrink.',
  hook:'EULAR\'s own words: the target is set "to <b>cure</b> the disease". <sup class="c" data-ref="Richette2017" title="Source 331">331</sup>'},
 {from:.2,at:.22,k:'Month 3',t:'Fewer crystals in the fluid',
  txt:'In 18 people with crystal-proven gout whose urate was brought to normal, the median crystal count in joint fluid fell from 7.5 to 3 per 400× field within 3 months. In 63 people with tophaceous gout, tophi shrank faster the lower the urate, a linear relation. <sup class="c" data-ref="Pascual2007,PerezRuiz2002" title="Source 308,312">308,312</sup>',
  pt:'Within a few months there are already fewer crystals to find in the joint.',
  hook:'Lower urate, faster tophus shrinkage: the relation is <b>linear</b>. <sup class="c" data-ref="PerezRuiz2002" title="Source 312">312</sup>'},
 {from:.5,at:.6,k:'Months 3–33',t:'Clear',
  txt:'Crystals disappeared from the joint fluid of all 18 joints, taking 3 to 33 months. The time correlated with how long the person had had gout (rs = 0.71). So cure in gout is crystal clearance with sustained urate lowering, not a single event, and stopping treatment lets the urate pool rebuild. <sup class="c" data-ref="Pascual2007,PerezRuiz2006,FitzGerald2020" title="Source 135,308,314">135,308,314</sup>',
  pt:'Every joint cleared in the end, but a joint that had gout for longer took years rather than months.',
  hook:'Synovial crystals cleared in <b>3 to 33 months</b>, longer with longer disease. <sup class="c" data-ref="Pascual2007" title="Source 308">308</sup>'}
];
/* remission cohorts: [year, %] */
const CU_REM={
 cares:{n:'CARES population',c:'var(--sea)',pts:[[1,37.4],[6,63.1]],off:[[-8,-8,1],[-8,-8,1]],cite:'<sup class="c" data-ref="TabiAmponsah2025,White2018" title="Source 392,431">392,431</sup>'},
 nor:{n:'NOR-Gout',c:'var(--gold)',pts:[[1,7.7],[2,45.4],[5,58.6]],off:[[8,4,0],[-8,-8,1],[-8,-8,1]],cite:'<sup class="c" data-ref="Uhlig2025" title="Source 415">415</sup>'},
 nurse:{n:'Nurse-led trial',c:'var(--good)',pts:[[1,17.6],[2,42.7]],off:[[-8,4,1],[8,16,0]],cite:'<sup class="c" data-ref="TabiAmponsah2024" title="Source 391">391</sup>'}
};
/* 2 · the pathway */
const CU_ST=[
 {l:['Purines','food · cells'],k:'Stage 1 · The supply',t:'Purines in',
  txt:'Urate is the end product of purine breakdown in humans. Production was estimated at 591 mg a day in 123 people on haemodialysis without urine output, the first new estimate in over 50 years. <sup class="c" data-ref="Chen2016,Ohashi2023" title="Source 39,302">39,302</sup>',
  pt:'Urate comes from breaking down purines, which are in food and in every cell the body replaces.',
  hook:'Diet explains at most 0.3% of the variation in serum urate; common genetic variation explains 23.9%. <sup class="c" data-ref="Major2018" title="Source 244">244</sup>'},
 {l:['Xanthine oxidase','makes urate'],k:'Stage 2 · Production',t:'Xanthine oxidase makes urate',
  txt:'Xanthine oxidoreductase catalyses both hypoxanthine to xanthine and xanthine to urate. Blocking it is the production route: allopurinol and febuxostat today, tigulixostat and topiroxostat in the pipeline. <sup class="c" data-ref="Chen2016,FitzGerald2020,Terkeltaub2023,Hosoya2016" title="Source 39,135,169,408">39,135,169,408</sup>',
  pt:'One enzyme does the last two steps of making urate. Block it and less urate is made.',
  hook:'Allopurinol is first-line urate-lowering therapy, started at 100 mg a day or less and titrated to target. <sup class="c" data-ref="FitzGerald2020,Richette2017" title="Source 135,331">135,331</sup>'},
 {l:['Serum urate','the pool'],k:'Stage 3 · The pool',t:'The urate pool, and its two exits',
  txt:'At least 90% of filtered urate is reabsorbed, by transporters including URAT1 and GLUT9, so blocking URAT1 is the excretion route. Most mammals have a second exit: uricase turns urate into allantoin, about 100 times more soluble, but humans and higher primates lack it. <sup class="c" data-ref="Chen2016,Enomoto2002,So2010" title="Source 39,112,372">39,112,372</sup>',
  pt:'The kidney normally takes most urate back. Humans also lack the enzyme other animals use to break urate down.',
  hook:'URAT1 (2002) is the target of uricosuric drugs; recombinant uricase gives humans back the missing exit. <sup class="c" data-ref="Enomoto2002,Sundy2011" title="Source 112,388">112,388</sup>'},
 {l:['MSU crystals','in joints · tophi'],k:'Stage 4 · Crystals',t:'Above saturation, crystals form',
  txt:'Plasma is saturated at about 6.8 mg/dL. Silent deposits are common: dual-energy CT found urate deposits in 24% of people with asymptomatic hyperuricaemia, and ultrasound found a double contour or tophus in 38.7% of 269 people with no flares. <sup class="c" data-ref="Martillo2014,Dalbeth2015,Stewart2026US" title="Source 79,249,386">79,249,386</sup>',
  pt:'Crystals can build up for years before the first flare.',
  hook:'Only the three urate routes reach this box. Everything downstream treats the reaction, not the crystal. <sup class="c" data-ref="Dalbeth2019NRDP" title="Source 84">84</sup>'},
 {l:['NLRP3','inflammasome'],k:'Stage 5 · Sensing',t:'Crystals switch on NLRP3',
  txt:'MSU crystals activate the NALP3 (NLRP3) inflammasome, and caspase-1 then releases IL-1β; mice lacking inflammasome parts or the IL-1 receptor had impaired crystal-induced neutrophil influx. Oral NLRP3 inhibitors aim here: dapansutrile has an open-label phase 2a and a placebo-controlled phase 2/3 recruiting. <sup class="c" data-ref="Martinon2006,Kluck2020,NCT05658575" title="Source 213,250,275">213,250,275</sup>',
  pt:'Immune cells that swallow a crystal set off an alarm complex called NLRP3.',
  hook:'Martinon 2006: urate crystals activate <b>NALP3</b>. <sup class="c" data-ref="Martinon2006" title="Source 250">250</sup>'},
 {l:['IL-1β','the signal'],k:'Stage 6 · The signal',t:'IL-1β calls in neutrophils',
  txt:'IL-1β drives the flare. Canakinumab, an anti-IL-1β antibody, cut 72-hour pain more than triamcinolone (25.0 vs 35.7 mm) and lowered new-flare risk by 62% (HR 0.38). Firsekibart, a second anti-IL-1β antibody, was approved in China in June 2025. <sup class="c" data-ref="Schlesinger2012,Crescioli2026" title="Source 66,355">66,355</sup>',
  pt:'The alarm complex releases a signal that brings in white cells, and they cause the heat and pain.',
  hook:'Canakinumab gained US approval for gout flares in August 2023, for people in whom NSAIDs, colchicine and repeated steroids are unsuitable. <sup class="c" data-ref="FDA-BLA125319-S107,IlarisPIG" title="Source 116,175">116,175</sup>'},
 {l:['Flare & damage','pain · tophi'],k:'Stage 7 · The result',t:'Flares, then tophi and damage',
  txt:'Flares are what people feel. Inflammation resolves within days even though crystals can still be found in fluid and tissue, so each flare ends while the cause stays. <sup class="c" data-ref="Schauer2014,Dalbeth2019NRDP" title="Source 84,350">84,350</sup>',
  pt:'The flare settles by itself, but the crystals stay unless urate is lowered.',
  hook:'IL-1 and NLRP3 blockade treat or prevent flares; <b>they do not remove crystals</b>. <sup class="c" data-ref="Dalbeth2019NRDP,Dalbeth2021" title="Source 84,85">84,85</sup>'}
];
const CU_STEPS=CU_ST.map((s,i)=>({from:i*.135,at:i*.135+.03,k:s.k,t:s.t,txt:s.txt,pt:s.pt,hook:s.hook}));
/* route mechanics: b = barrier before stage b; pass = share that gets through a partial barrier;
   pk/pu = share drained by the kidney and by uricase; xt = crystal trend (-1 dissolve, 0 hold, 1 grow) */
const CU_ROUTES={
 none:{n:'No intervention',b:-1,pk:.3,pu:0,xt:1},
 prod:{n:'Xanthine oxidase inhibition',b:1,pass:.4,pk:.3,pu:0,xt:-1,lvl:'est',pipe:'early',
  fix:'Less urate is made, so the pool falls below saturation and crystals dissolve.',
  ev:'Established: allopurinol is first-line, titrated to target. Pipeline: tigulixostat phase 2 (n = 143) reached urate below 5 mg/dL at week 12 in 47.1%, 44.7% and 62.2% (50, 100, 200 mg) against 2.9% on placebo. Its phase 3 trials EURELIA 1 (NCT05586958, 354 enrolled) and EURELIA 2 (NCT05586971, 2202 enrolled, against allopurinol up to 800 mg) are completed without posted results; a Chinese phase 3 against febuxostat (NCT07414394) is active. Topiroxostat 120 mg was non-inferior to allopurinol 200 mg in Japan (36.3% vs 34.3% fall). <sup class="c" data-ref="FitzGerald2020,Terkeltaub2023,Saag2025,NCT05586958,NCT05586971,NCT07414394,Hosoya2016" title="Source 135,169,273,274,287,345,408">135,169,273,274,287,345,408</sup>',
  obs:'A new xanthine oxidase inhibitor has to beat allopurinol titrated to target, not a fixed low dose; EURELIA 2 is that test and is unreported. <sup class="c" data-ref="NCT05586971" title="Source 274">274</sup>',
  cards:[['Allopurinol, febuxostat','est','First-line and second-line production blockers in ACR 2020.','<sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>'],['Tigulixostat','early','Phase 2 positive; two completed phase 3 trials unreported; NCT05586958, NCT05586971, NCT07414394.','<sup class="c" data-ref="Terkeltaub2023,NCT05586958,NCT05586971,NCT07414394" title="Source 273,274,287,408">273,274,287,408</sup>'],['Topiroxostat','est','Non-inferior to allopurinol 200 mg in a Japanese phase 3 (Established in Japan).','<sup class="c" data-ref="Hosoya2016" title="Source 169">169</sup>']]},
 excr:{n:'URAT1 inhibition',b:-1,pk:.75,pu:0,xt:-1,lvl:'est',pipe:'early',
  fix:'The kidney stops taking urate back, so more leaves in the urine.',
  ev:'Dotinurad, approved in Japan in 2020, reached urate at or below 6 mg/dL at week 24 in 73.6% on 4 mg against 38.1% on febuxostat 40 mg in a Chinese phase 3 (n = 451; NCT05007392). US and European trials are recruiting against allopurinol (NCT07089875), in tophaceous gout (NCT07089888) and after xanthine oxidase or uricase failure (NCT07535034). AR882 completed two placebo-controlled phase 3 trials, AR882-301 (NCT06846515, 866 people) and AR882-302 (NCT06439602, 818), with no results posted. Epaminurad reached urate below 0.36 mmol/L at week 4 in 88.89% on 9 mg against 0.00% on placebo; its phase 3 EPIC (NCT05815901, 612 people) is unreported. <sup class="c" data-ref="Hosoya2020a,Sun2025,NCT05007392,NCT07089875,NCT07089888,NCT07535034,NCT06846515,NCT06439602,Jun2025,NCT05815901" title="Source 170,190,270,276,279,281,283,284,288,387">170,190,270,276,279,281,283,284,288,387</sup>',
  obs:'Kidney safety has to be shown, not assumed. Lesinurad raised serum creatinine to 1.5 times baseline in 15.0% at 400 mg and its 200 mg tablet\'s approval was withdrawn in 2021; verinurad was shelved after negative kidney and heart trials. <sup class="c" data-ref="Saag2017,Bardin2017,FR-2021-05368,Heerspink2024,Kitzman2024" title="Source 16,136,160,208,343">16,136,160,208,343</sup>',
  cards:[['Dotinurad','est','73.6% vs 38.1% at target against febuxostat 40 mg (Established in Japan and China); NCT05007392, NCT07089875, NCT07089888, NCT07535034.','<sup class="c" data-ref="Sun2025,NCT05007392,NCT07089875,NCT07089888,NCT07535034" title="Source 270,283,284,288,387">270,283,284,288,387</sup>'],['AR882','early','Phase 3 AR882-301 (NCT06846515) and AR882-302 (NCT06439602) completed; phase 2 NCT05119686, NCT05253833.','<sup class="c" data-ref="NCT06846515,NCT06439602,NCT05119686,NCT05253833" title="Source 271,272,279,281">271,272,279,281</sup>'],['Epaminurad','early','Phase 2b 88.89% vs 0.00% at target; phase 3 EPIC NCT05815901 unreported.','<sup class="c" data-ref="Jun2025,NCT05815901" title="Source 190,276">190,276</sup>'],['Lesinurad, verinurad','est','Lesinurad worked with allopurinol but its 200 mg approval was withdrawn; verinurad\'s later trials were negative outside gout.','<sup class="c" data-ref="Saag2017,FR-2021-05368,Heerspink2024" title="Source 136,160,343">136,160,343</sup>']]},
 brk:{n:'Uricase',b:-1,pk:.3,pu:.75,xt:-1,lvl:'est',pipe:'early',
  fix:'Restores the exit humans lost: urate is broken down to soluble allantoin.',
  ev:'Pegloticase every 2 weeks reached the urate response in 42% against 0% on placebo in two 6-month trials. In MIRROR (NCT03994731), adding methotrexate raised month-6 response to 71.0% from 38.5% and cut infusion reactions to 4.2% from 30.6%. NASP (formerly SEL-212, pegadricase with nanoencapsulated sirolimus) induces tolerance instead: in DISSOLVE I and II (NCT04513366, NCT04596540), 51% (high dose) and 43% (low dose) responded against 8% on placebo. PRX-115 is in phase 2 (NCT07280156). <sup class="c" data-ref="Sundy2011,Botson2023,NCT03994731,Baraf2026,NCT04513366,NCT04596540,NCT07280156" title="Source 15,27,266,267,268,285,388">15,27,266,267,268,285,388</sup>',
  obs:'Immunogenicity: antibodies end the response and raise the risk of reactions, so urate is checked before each infusion. Pegloticase is contraindicated in G6PD deficiency. There is no head-to-head trial of methotrexate against tolerance induction. <sup class="c" data-ref="FDA-Krystexxa,Botson2023,Baraf2026" title="Source 15,27,122">15,27,122</sup>',
  cards:[['Pegloticase + methotrexate','est','71.0% vs 38.5% at month 6; NCT03994731. Dosing studies NCT06229145 (every 4 weeks) and NCT07388498 (subcutaneous).','<sup class="c" data-ref="Botson2023,NCT03994731,NCT06229145,NCT07388498" title="Source 27,266,278,286">27,266,278,286</sup>'],['NASP (SEL-212)','early','Phase 3 positive, not approved: 51% and 43% vs 8%; NCT04513366, NCT04596540.','<sup class="c" data-ref="Baraf2026,Baraf2024,NCT04513366,NCT04596540" title="Source 14,15,267,268">14,15,267,268</sup>'],['PRX-115','early','Phase 2 RELEASE, with or without methotrexate; NCT07280156.','<sup class="c" data-ref="NCT07280156" title="Source 285">285</sup>'],['ALLN-346, circRNA uricase','hyp','Oral gut uricase lowered urate in mice; its phase 2a (NCT04987294) was terminated for financing. Circular-RNA uricase works only in mice so far.','<sup class="c" data-ref="Pierzynowska2020,NCT04987294,Du2026" title="Source 102,269,315">102,269,315</sup>']]},
 nlrp3:{n:'NLRP3 inhibitor',b:4,pk:.3,pu:0,xt:0,lvl:'early',pipe:'hyp',
  fix:'Stops crystals switching on the inflammasome, so a flare does not start. Crystals stay.',
  ev:'Dapansutrile, an oral NLRP3 inhibitor, cut target-joint pain by 68.9–84.2% by day 7 across doses in an open-label phase 2a of 29 per-protocol people, with no placebo arm. A placebo-controlled phase 2/3 (NCT05658575, estimated 300 people) is recruiting. DFV890 has first-in-human safety data but no gout trial registered. <sup class="c" data-ref="Kluck2020,NCT05658575,DFV890" title="Source 91,213,275">91,213,275</sup>',
  obs:'No placebo-controlled result yet, and it does not touch the urate pool. <sup class="c" data-ref="Kluck2020" title="Source 213">213</sup>',
  cards:[['Dapansutrile','early','Open-label phase 2a; phase 2/3 NCT05658575 recruiting.','<sup class="c" data-ref="Kluck2020,NCT05658575" title="Source 213,275">213,275</sup>'],['DFV890','hyp','First-in-human data; no gout trial registered.','<sup class="c" data-ref="DFV890" title="Source 91">91</sup>']]},
 il1:{n:'IL-1β blockade',b:6,pk:.3,pu:0,xt:0,lvl:'est',pipe:'early',
  fix:'Neutralises the flare signal. Treats or prevents flares; crystals stay.',
  ev:'Canakinumab beat triamcinolone on 72-hour pain and cut new-flare risk (HR 0.38), and is approved for gout flares in the EU and US. Firsekibart, approved in China in June 2025, gave new flares in 10.9% against 65.2% on betamethasone at 12 weeks (NCT05983445). Anakinra was not superior to triamcinolone on its primary endpoint and is off-label. Rilonacept cut flares when starting allopurinol (0.21–0.29 against 1.06 per person) but is not approved for gout. <sup class="c" data-ref="Schlesinger2012,EMA-Ilaris,FDA-BLA125319-S107,Crescioli2026,NCT05983445,Saag2021,KineretPI,Schumacher2012,ArcalystPI" title="Source 9,66,108,116,207,277,344,355,359">9,66,108,116,207,277,344,355,359</sup>',
  obs:'It leaves the crystals in place, so urate lowering is still needed. Serious adverse events were 8.0% against 3.5% with canakinumab in the core trials. <sup class="c" data-ref="Schlesinger2012,Dalbeth2021" title="Source 85,355">85,355</sup>',
  cards:[['Canakinumab','est','EU 2013, US 2023 for flares when standard options are unsuitable.','<sup class="c" data-ref="EMA-Ilaris,FDA-BLA125319-S107" title="Source 108,116">108,116</sup>'],['Firsekibart','est','Approved in China, June 2025; NCT05983445; 48-week extension HR 0.30 for recurrence.','<sup class="c" data-ref="Crescioli2026,NCT05983445,Zhu2026" title="Source 66,277,455">66,277,455</sup>'],['Anakinra, rilonacept, anflekitug','early','Off-label or not approved for gout; anflekitug\'s marketing application was accepted in China in June 2025.','<sup class="c" data-ref="Saag2021,Schumacher2012,Crescioli2026" title="Source 66,344,359">66,344,359</sup>']]},
 prev:{n:'Treating hyperuricaemia before gout',b:3,pass:.5,pk:.3,pu:0,xt:-.4,lvl:'hyp',pipe:'early',
  fix:'Lowers urate in people with no flares yet, hoping to stop crystals and gout from starting.',
  ev:'Only about half of people with urate at or above 10 mg/dL developed gout within 15 years, and 1.1% below 6 mg/dL. In FREED (1070 older Japanese adults), febuxostat lowered a composite of cerebral, cardiovascular, renal events and death (HR 0.750), driven by renal impairment; gout flares were 1.1% against 2.6% (P = 0.069). SGLT2 inhibitors were linked to less incident gout than GLP-1 agonists (HR 0.64) and fewer recurrent flares than DPP-4 inhibitors, in observational data; the first randomised test in gout, SAVE-Care (NCT06674109), is recruiting. <sup class="c" data-ref="Dalbeth2018ARD,Kojima2019,Fralick2020,McCormick2023,NCT06674109" title="Source 82,137,215,257,280">82,137,215,257,280</sup>',
  obs:'Allopurinol did not slow kidney decline in CKD-FIX or PERL, and ACR 2020 conditionally recommends against treating asymptomatic hyperuricaemia. No gout vaccine or preventive biological has a registered trial. <sup class="c" data-ref="Badve2020,Doria2020,FitzGerald2020" title="Source 11,96,135">11,96,135</sup>',
  cards:[['FREED (febuxostat)','early','Composite HR 0.750 in older Japanese adults, driven by kidney events.','<sup class="c" data-ref="Kojima2019" title="Source 215">215</sup>'],['CKD-FIX, PERL (allopurinol)','est','No kidney benefit: an established negative result.','<sup class="c" data-ref="Badve2020,Doria2020" title="Source 11,96">11,96</sup>'],['SGLT2 inhibitors','early','Observational HR 0.64; SAVE-Care NCT06674109 recruiting.','<sup class="c" data-ref="Fralick2020,McCormick2023,NCT06674109" title="Source 137,257,280">137,257,280</sup>']]}
};
/* evidence table rows: route, drug, evidence, level, registry, status */
const CU_TBL=[
 ['Production','Allopurinol, febuxostat','First-line and second-line in ACR 2020','est','—','Standard care'],
 ['Production','Tigulixostat','Phase 2: 62.2% vs 2.9% below 5 mg/dL at week 12','early','NCT05586958, NCT05586971, NCT07414394','Phase 3 completed, unreported'],
 ['Production','Topiroxostat','Non-inferior to allopurinol 200 mg (36.3% vs 34.3% fall)','est','—','Used in Japan'],
 ['Excretion','Dotinurad','73.6% vs 38.1% at target vs febuxostat 40 mg (China phase 3)','est','NCT05007392, NCT07089875, NCT07089888, NCT07535034','Approved in Japan 2020; Western trials recruiting'],
 ['Excretion','AR882','Two placebo-controlled phase 3 trials completed (866 and 818 people)','early','NCT06846515, NCT06439602, NCT05119686, NCT05253833','No results posted'],
 ['Excretion','Epaminurad','Phase 2b: 88.89% vs 0.00% below 0.36 mmol/L at week 4','early','NCT05815901','Phase 3 completed, unreported'],
 ['Excretion','Lesinurad','Worked with allopurinol; creatinine rises','est','—','200 mg approval withdrawn 2021'],
 ['Breakdown','Pegloticase + methotrexate','71.0% vs 38.5% response; infusion reactions 4.2% vs 30.6%','est','NCT03994731, NCT06229145, NCT07388498','Label regimen'],
 ['Breakdown','NASP (SEL-212)','51% and 43% vs 8% response in phase 3','early','NCT04513366, NCT04596540','Not approved'],
 ['Breakdown','PRX-115','Phase 2 with or without methotrexate','early','NCT07280156','Recruiting'],
 ['Breakdown','ALLN-346','Lowered urate in uricase-deficient mice','early','NCT04987294','Terminated for financing'],
 ['Inflammation','Dapansutrile (NLRP3)','Open-label phase 2a: pain down 68.9–84.2% by day 7','early','NCT05658575','Phase 2/3 recruiting'],
 ['Inflammation','DFV890 (NLRP3)','First-in-human safety only','hyp','—','No gout trial'],
 ['Inflammation','Canakinumab (IL-1β)','HR 0.38 for new flares vs triamcinolone','est','—','EU 2013, US 2023'],
 ['Inflammation','Firsekibart (IL-1β)','New flares 10.9% vs 65.2% at 12 weeks','est','NCT05983445','Approved in China, June 2025'],
 ['Prevention','Febuxostat in hyperuricaemia (FREED)','Composite HR 0.750, driven by kidney events','early','—','Not adopted outside Japan'],
 ['Prevention','SGLT2 inhibitors','Incident gout HR 0.64 (observational)','early','NCT06674109','Randomised test recruiting']
];
const CU_TBLC=['<sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>','<sup class="c" data-ref="Terkeltaub2023" title="Source 408">408</sup>','<sup class="c" data-ref="Hosoya2016" title="Source 169">169</sup>','<sup class="c" data-ref="Sun2025,Hosoya2020a" title="Source 170,387">170,387</sup>','<sup class="c" data-ref="NCT06846515,NCT06439602" title="Source 279,281">279,281</sup>','<sup class="c" data-ref="Jun2025" title="Source 190">190</sup>','<sup class="c" data-ref="Saag2017,Bardin2017,FR-2021-05368" title="Source 16,136,343">16,136,343</sup>','<sup class="c" data-ref="Botson2023" title="Source 27">27</sup>','<sup class="c" data-ref="Baraf2026" title="Source 15">15</sup>','<sup class="c" data-ref="NCT07280156" title="Source 285">285</sup>','<sup class="c" data-ref="Pierzynowska2020,NCT04987294" title="Source 269,315">269,315</sup>','<sup class="c" data-ref="Kluck2020" title="Source 213">213</sup>','<sup class="c" data-ref="DFV890" title="Source 91">91</sup>','<sup class="c" data-ref="Schlesinger2012,EMA-IlarisGout2013,FDA-IlarisGout2023" title="Source 109,121,355">109,121,355</sup>','<sup class="c" data-ref="Crescioli2026" title="Source 66">66</sup>','<sup class="c" data-ref="Kojima2019" title="Source 215">215</sup>','<sup class="c" data-ref="Fralick2020,NCT06674109" title="Source 137,280">137,280</sup>'];
inits.cure=()=>{
  /* ---- 1 · crystal clearance ---- */
  $('#cuXLede').innerHTML='When urate stays below saturation, crystals dissolve. Press play to run the months, and switch between a joint that cleared fastest and one that took longest in the study that measured it. <sup class="c" data-ref="Pascual2007,Martillo2014" title="Source 249,308">249,308</sup>';
  const xs=$('#cuXSvg'),xr=$('#cuXT');let dur='short';
  const XR=rng(23),XN=Array.from({length:18},()=>({x:XR(),y:XR(),a:XR()*180,l:9+XR()*7}));
  function xCount(mo){const end=dur==='short'?3:33;if(mo<=0)return 7.5;if(dur==='short')return lerp(7.5,0,ease(ramp(mo,0,end)));return mo<=3?lerp(7.5,3,mo/3):lerp(3,0,ease(ramp(mo,3,end)))}
  function suOf(mo){return lerp(8.4,4.6,ease(ramp(mo,0,3)))}
  function drawX(u){
    const N=vb(xs,'720 360','400 560');
    const mo=u*36,cnt=xCount(mo),su=suOf(mo),end=dur==='short'?3:33;
    const L=N?{fx:200,fy:150,fr:110, gx0:46,gx1:384,gy0:330,gy1:470, ax:500}:{fx:150,fy:176,fr:124, gx0:330,gx1:700,gy0:60,gy1:250, ax:290};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="24" class="t-sm" style="fill:var(--sea)">JOINT FLUID · ONE 400× FIELD</text>`;
    s+=`<circle cx="${L.fx}" cy="${L.fy}" r="${L.fr}" style="fill:var(--panel);stroke:var(--line);stroke-width:2"/>`;
    const n=Math.ceil(cnt*2),fade=cnt*2-Math.floor(cnt*2);
    XN.slice(0,n).forEach((c,i)=>{const r=Math.sqrt(c.x)*L.fr*.78,a=c.y*6.283;s+=needle(L.fx+r*Math.cos(a),L.fy+r*Math.sin(a),c.l*1.4,c.a,i===n-1&&fade>0?fade:1)});
    for(let k=0;k<6;k++){const a=k*1.05+.4;s+=`<circle cx="${f1(L.fx+L.fr*.55*Math.cos(a))}" cy="${f1(L.fy+L.fr*.55*Math.sin(a))}" r="7" style="fill:var(--panel-2);opacity:.7"/>`}
    s+=`<text x="${L.fx}" y="${L.fy+L.fr+22}" class="t-lbl t-mid">${cnt<.05?'no crystals seen':f1(cnt)+' crystals per field'}</text>`;
    // urate and crystal count over months
    const X=m=>lerp(L.gx0,L.gx1,m/36),Yu=v=>lerp(L.gy1,L.gy0,v/10);
    s+=`<text x="${L.gx0}" y="${L.gy0-14}" class="t-sm">SERUM URATE (mg/dL) AND CRYSTALS</text>`;
    [0,6,10].forEach(v=>s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(Yu(v))}" y2="${f1(Yu(v))}" class="grid"/><text x="${L.gx0-6}" y="${f1(Yu(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(Yu(6.8))}" y2="${f1(Yu(6.8))}" style="stroke:var(--xtal);stroke-width:1.2;stroke-dasharray:2 3"/><text x="${L.gx1}" y="${f1(Yu(6.8)-4)}" class="t-xs t-end" style="fill:var(--xtal)">6.8 saturation</text>`;
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(Yu(6))}" y2="${f1(Yu(6))}" style="stroke:var(--sea);stroke-width:1.4;stroke-dasharray:5 4"/><text x="${L.gx1}" y="${f1(Yu(6)+12)}" class="t-xs t-end" style="fill:var(--sea)">target &lt; 6</text>`;
    s+=`<path d="${pathFn(v=>suOf(v*mo)/10,L.gx0,X(mo),L.gy1,L.gy0,80)}" style="fill:none;stroke:var(--gold);stroke-width:2.4"/>`;
    s+=`<path d="${pathFn(v=>xCount(v*mo)/10,L.gx0,X(mo),L.gy1,L.gy0,80)}" style="fill:none;stroke:var(--xtal);stroke-width:2.4"/>`;
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${L.gy1}" y2="${L.gy1}" class="axis"/>`;
    [0,6,12,18,24,30,36].forEach(m=>s+=`<text x="${f1(X(m))}" y="${L.gy1+15}" class="t-xs t-mid">${m}</text>`);
    s+=`<text x="${L.gx1}" y="${L.gy1+30}" class="t-xs t-end">months</text>`;
    // anchors
    const an=[[0,7.5,'median 7.5'],[3,3,'median 3 at 3 mo']];
    an.forEach(([m,v,l])=>{s+=`<circle cx="${f1(X(m))}" cy="${f1(Yu(v))}" r="4" style="fill:var(--panel);stroke:var(--xtal);stroke-width:2"/><text x="${f1(X(m)+7)}" y="${f1(Yu(v)-6)}" class="t-xs" style="fill:var(--xtal)">${l}</text>`});
    s+=`<line x1="${f1(X(end))}" x2="${f1(X(end))}" y1="${L.gy0}" y2="${L.gy1}" style="stroke:var(--good);stroke-width:1.4;stroke-dasharray:3 3"/><text x="${f1(X(end)+(end>20?-4:4))}" y="${L.gy0+10}" class="t-xs ${end>20?'t-end':''}" style="fill:var(--good)">clear by month ${end}</text>`;
    const lg=N?{x:L.gx0,y:L.gy1+48}:{x:L.gx0,y:L.gy1+48};
    s+=`<rect x="${lg.x}" y="${lg.y-8}" width="14" height="4" style="fill:var(--gold)"/><text x="${lg.x+20}" y="${lg.y-2}" class="t-xs">serum urate</text>`;
    s+=`<rect x="${lg.x+110}" y="${lg.y-8}" width="14" height="4" style="fill:var(--xtal)"/><text x="${lg.x+130}" y="${lg.y-2}" class="t-xs">crystals per field</text>`;
    xs.innerHTML=s;
    const p=phaseOf(CU_X,u);setX(p);
    $('#cuXRead').innerHTML=`<span>month <b>${f1(mo)}</b></span><span>urate <b>${f1(su)} mg/dL</b></span><span>crystals <b>${f1(cnt)}</b> per field</span><span>cleared by <b>month ${end}</b></span>`;
    $('#cuXNote').innerHTML=noteHTML(CU_X[p]);
  }
  const stopX=playWire(xr,$('#cuXPlay'),drawX,14000,'Replay','cure');
  const setX=stepWire($('#cuXSteps'),CU_X,xr,drawX,stopX);
  $$('[data-cud]').forEach(b=>b.onclick=()=>{dur=b.dataset.cud;$$('[data-cud]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawX(+xr.value)});

  /* remission */
  const rs=$('#cuRemSvg');const show={cares:true,nor:true,nurse:true};
  function drawRem(){
    const N=vb(rs,'560 320','400 330');
    const x0=N?44:60,x1=N?384:530,y0=40,y1=N?252:250,X=v=>lerp(x0,x1,v/6),Y=v=>lerp(y1,y0,v/100);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="22" class="t-sm">IN REMISSION, BY YEAR OF TREATMENT</text>`;
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    [0,1,2,3,4,5,6].forEach(v=>s+=`<text x="${f1(X(v))}" y="${y1+16}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${x1}" y="${y1+32}" class="t-xs t-end">years</text>`;
    Object.entries(CU_REM).forEach(([k,c])=>{if(!show[k])return;
      s+=`<path d="M${c.pts.map(p=>f1(X(p[0]))+' '+f1(Y(p[1]))).join('L')}" style="fill:none;stroke:${c.c};stroke-width:2.2"/>`;
      c.pts.forEach((p,j)=>{const o=c.off[j];s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="5" style="fill:${c.c};stroke:var(--panel);stroke-width:1.5"/><text x="${f1(X(p[0])+o[0])}" y="${f1(Y(p[1])+o[1])}" class="t-xs ${o[2]?'t-end':''}" style="fill:${c.c};font-weight:700">${p[1]}%</text>`})});
    let lx=x0;Object.entries(CU_REM).forEach(([k,c])=>{if(!show[k])return;s+=`<rect x="${lx}" y="${y1+42}" width="12" height="4" style="fill:${c.c}"/><text x="${lx+16}" y="${y1+48}" class="t-xs">${c.n}</text>`;lx+=N?112:150});
    if(!Object.values(show).some(Boolean))s+=`<text x="${(x0+x1)/2}" y="${(y0+y1)/2}" class="t-xs t-mid">pick a cohort above</text>`;
    rs.innerHTML=s;
  }
  $$('[data-cur]').forEach(b=>b.onclick=()=>{const k=b.dataset.cur;show[k]=!show[k];b.setAttribute('aria-pressed',show[k]);drawRem()});
  $('#cuRemNote').innerHTML=`<div class="kicker">Remission</div><h4>Defined, and reached over years</h4>
   <p>Preliminary criteria from 2016 set five domains: serum urate below 0.36 mmol/L, no flares, no tophi, pain below 2/10 and patient global below 2/10, each measured at least twice; the experts split between a 6-month and a 12-month window. The G-CAN definition (2025/2026) keeps three: 12 months with no flares, no subcutaneous tophi and urate below 6 mg/dL. It is called <i>clinical</i> remission because no domain measures complete crystal dissolution. <sup class="c" data-ref="deLautour2016,TabiAmponsah2026" title="Source 89,393">89,393</sup></p>
   <p>In the CARES trial population, remission rose from 37.4% at year 1 to 63.1% at year 6. In NOR-Gout it was 7.7%, 45.4% and 58.6% at years 1, 2 and 5. In a Dutch pragmatic trial, treat-to-target gave 39.4% against 24.0% with symptom-driven care in months 18–24. <sup class="c" data-ref="TabiAmponsah2025,Uhlig2025,Moses2026" title="Source 264,392,415">264,392,415</sup></p>
   <div class="hook"><b>Exam hook</b>Remission is not proof of a crystal-free joint: DECT still found urate deposits in <b>44%</b> of people meeting the preliminary criteria. <sup class="c" data-ref="Dalbeth2019ART" title="Source 83">83</sup></div>
   <div class="pt"><b>In plain words</b>Remission means a whole year with no flares, no lumps and a low urate. Most people get there, but it usually takes two years or more.</div>
   <p class="stage-cap">Points: ${Object.values(CU_REM).map(c=>c.n+' '+c.cite).join(' · ')}</p>`;

  /* ---- 2 · the pathway ---- */
  $('#cuRouteLede').innerHTML='Urate is made from purines by xanthine oxidase, leaves through the kidney, and forms crystals above saturation; crystals then switch on NLRP3 and IL-1β. Pick a route to see where it acts. Gold dots are urate; past the crystals they turn into the inflammatory signal. <sup class="c" data-ref="Chen2016,Martinon2006,Dalbeth2019NRDP" title="Source 39,84,250">39,84,250</sup>';
  const svg=$('#cuSvg'),rg=$('#cuT');let route='none';
  const PR=rng(91),PRT=Array.from({length:30},()=>[PR(),PR(),PR()]);
  function geo(N){
    if(!N){const CX=CU_ST.map((_,i)=>70+i*136),BW=116,BY=58,BH=84,FY=186;
      return{N,CX,BW,BY,BH,FY,len:930,
        P:s=>[14+930*s,FY],sOfX:x=>(x-14)/930,
        bar:b=>(CX[b]-BW/2-9-14)/930,
        kS:(CX[2]-50-14)/930,uS:(CX[2]+50-14)/930,xS:(CX[3]-BW/2-14)/930,
        drainK:d=>[CX[2]-50,FY+d*64],drainU:d=>[CX[2]+50,FY+d*64]}}
    const SX=44,BX=68,NBW=316,NBH=52,P=66,Y0=70;
    return{N,SX,BX,NBW,NBH,P,Y0}
  }
  function pdots(t,R,pos){
    /* pos(s, kind, d) returns [x,y] or null; kinds: main, drainK, drainU, pile */
    let s='';const piled=[];const nP=30;
    const sBar=R.b>=0?pos.bar(R.b):9;
    PRT.forEach((r,i)=>{const sv=((t*1.2+i/nP)%1);
      // kidney and uricase drains
      if(sv>pos.kS&&r[0]<R.pk){const d=(sv-pos.kS)*14;if(d<1){const p=pos.drainK(d);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="4" style="fill:var(--gold);opacity:${f1(.9-.6*d)}"/>`}return}
      if(sv>pos.uS&&r[1]<R.pu){const d=(sv-pos.uS)*14;if(d<1){const p=pos.drainU(d);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="4" style="fill:var(--sea);opacity:${f1(.9-.6*d)}"/>`}return}
      if(sv>sBar&&(R.pass==null||r[2]>R.pass)){piled.push(i);return}
      const p=pos.P(sv),sig=sv>pos.xS;
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="4.4" style="fill:${sig?'var(--terra)':'var(--gold)'};opacity:.9"/>`});
    return{s,piled}
  }
  function needles(x,y,w,h,n,seed){const R=rng(seed);let s='';for(let i=0;i<n;i++)s+=needle(x+6+R()*(w-12),y+6+R()*(h-12),10,R()*180,.9);return s}
  function crystalN(t,R){if(R.xt>0)return Math.round(lerp(5,13,t));if(R.xt===0)return 9;if(R.xt<=-1)return Math.round(lerp(9,0,ease(ramp(t,.15,.95))));return Math.round(lerp(4,2,t))}
  function lvlStrip(R,x,y,N){if(!R.lvl)return '';const A=CU_LVLTXT[R.lvl],B=CU_LVLTXT[R.pipe];let s='';
    s+=`<text x="${x}" y="${y-6}" class="t-xs">mechanism</text><rect x="${x}" y="${y}" width="128" height="22" rx="7" style="fill:var(--panel);stroke:${A[1]};stroke-width:1.6"/><text x="${x+64}" y="${y+15}" class="t-xs t-mid" style="fill:${A[1]};font-weight:700">${A[0]}</text>`;
    s+=`<text x="${x+140}" y="${y-6}" class="t-xs">pipeline</text><rect x="${x+140}" y="${y}" width="128" height="22" rx="7" style="fill:var(--panel);stroke:${B[1]};stroke-width:1.6"/><text x="${x+204}" y="${y+15}" class="t-xs t-mid" style="fill:${B[1]};font-weight:700">${B[0]}</text>`;
    return s}
  function draw(t){
    const R=CU_ROUTES[route],b=R.b;
    const N=vb(svg,'960 380','400 900');
    let s=`<defs>${marker('cuA','var(--muted)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const nX=crystalN(t,R);
    if(!N){
      const G=geo(false),{CX,BW,BY,BH,FY}=G;
      s+=`<text x="14" y="30" class="t-sm" style="fill:var(--sea)">WHERE COULD WE INTERCEPT?</text>`;
      s+=`<text x="946" y="30" class="t-sm t-end">${route==='none'?'no intervention':R.n}</text>`;
      s+=`<line x1="14" x2="944" y1="${FY}" y2="${FY}" style="stroke:var(--line);stroke-width:3"/>`;
      CU_ST.forEach((st,i)=>{const dim=b>=0&&i>=b&&R.pass==null,o=dim?.3:1,reached=t>=CU_STEPS[i].from;
        s+=`<g style="opacity:${f1(o)}"><rect x="${CX[i]-BW/2}" y="${BY}" width="${BW}" height="${BH}" rx="12" style="fill:${reached?'var(--panel)':'var(--panel-2)'};stroke:${reached?(i>=4?'var(--terra)':'var(--sea)'):'var(--line)'};stroke-width:${reached?2:1.3}"/>`;
        s+=`<text x="${CX[i]}" y="${BY+24}" class="t-lbl t-mid" style="font-size:12px">${st.l[0]}</text><text x="${CX[i]}" y="${BY+40}" class="t-xs t-mid">${st.l[1]}</text>`;
        if(i===3)s+=needles(CX[i]-BW/2+4,BY+48,BW-8,BH-50,nX,7);
        else s+=`<text x="${CX[i]}" y="${BY+BH-10}" class="t-xs t-mid">${i+1}</text>`;
        s+=`<line x1="${CX[i]}" x2="${CX[i]}" y1="${BY+BH}" y2="${FY-8}" style="stroke:var(--line);stroke-width:1.2"/></g>`;
        if(i<6)s+=`<path d="M${CX[i]+BW/2+2} ${BY+BH/2} H${CX[i+1]-BW/2-4}" class="arrow" marker-end="url(#cuA)"/>`});
      // drains
      const dk=CX[2]-50,du=CX[2]+50;
      s+=`<line x1="${dk}" x2="${dk}" y1="${FY}" y2="${FY+64}" style="stroke:var(--line);stroke-width:2.4;stroke-dasharray:${R.pk>.5?'0':'4 4'}"/>`;
      s+=`<rect x="${dk-58}" y="${FY+66}" width="104" height="38" rx="9" style="fill:var(--panel);stroke:${R.pk>.5?'var(--sea)':'var(--line)'};stroke-width:${R.pk>.5?2:1.2}"/><text x="${dk-6}" y="${FY+82}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">kidney</text><text x="${dk-6}" y="${FY+96}" class="t-xs t-mid">URAT1 takes back</text>`;
      s+=`<line x1="${du}" x2="${du}" y1="${FY}" y2="${FY+64}" style="stroke:var(--line);stroke-width:2.4;stroke-dasharray:4 4;opacity:${R.pu>0?1:.4}"/>`;
      s+=`<rect x="${du-46}" y="${FY+66}" width="112" height="38" rx="9" style="fill:var(--panel);stroke:${R.pu>0?'var(--sea)':'var(--line)'};stroke-width:${R.pu>0?2:1.2};opacity:${R.pu>0?1:.55}"/><text x="${du+10}" y="${FY+82}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">uricase → allantoin</text><text x="${du+10}" y="${FY+96}" class="t-xs t-mid">${R.pu>0?'given as a drug':'missing in humans'}</text>`;
      const pos={P:G.P,bar:G.bar,kS:G.kS,uS:G.uS,xS:G.xS,drainK:G.drainK,drainU:G.drainU};
      const D=pdots(t,R,pos);s+=D.s;
      if(b>=0){const xb=CX[b]-BW/2-9;
        D.piled.forEach((i,j)=>{const col=j%4,row=Math.floor(j/4);s+=`<circle cx="${f1(xb-7-col*10)}" cy="${f1(FY-12+row*10)}" r="4" style="fill:${b>=4?'var(--terra)':'var(--gold)'};opacity:${f1(.9-row*.1)}"/>`});
        s+=`<line x1="${f1(xb)}" x2="${f1(xb)}" y1="${BY-8}" y2="${FY+22}" style="stroke:var(--bad);stroke-width:${R.pass!=null?4:6};${R.pass!=null?'stroke-dasharray:7 6;':''}stroke-linecap:round"/>`;
        s+=`<text x="${f1(xb)}" y="${BY-14}" class="t-sm t-mid" style="fill:var(--bad)">${R.pass!=null?'partial barrier':'barrier'}</text>`}
      s+=`<text x="${CX[4]-BW/2}" y="${FY+30}" class="t-xs">past the crystals: inflammatory signal</text>`;
      if(R.lvl){s+=lvlStrip(R,560,320,N);cuWrap(R.fix,40).forEach((l,i)=>s+=`<text x="14" y="${330+i*14}" class="t-xs" style="fill:var(--ink)">${i?'':'→ '}${l}</text>`)}
      else s+=`<text x="14" y="330" class="t-xs">no barrier: urate builds up, crystals grow, and the pathway runs to a flare</text>`;
      svg.innerHTML=s;
    }else{
      const G=geo(true),{SX,BX,NBW,NBH,P,Y0}=G,GAP=30,DR=80;
      const topOf=i=>Y0+i*P+(i>=3?DR:0)+(b>=0&&i>=b?GAP:0);
      const F0=Y0-14,F1=topOf(6)+NBH+8;
      const yS=y=>(y-F0)/(F1-F0);
      const yk=topOf(2)+NBH+22,yu=yk+36;
      const pos={P:sv=>[SX,lerp(F0,F1,sv)],bar:bb=>yS(topOf(bb)-14),kS:yS(yk),uS:yS(yu),xS:yS(topOf(3)+NBH),
        drainK:d=>[lerp(SX,170,d),yk],drainU:d=>[lerp(SX,296,d),yu]};
      s+=`<text x="14" y="26" class="t-sm" style="fill:var(--sea)">WHERE COULD WE INTERCEPT?</text>`;
      s+=`<text x="14" y="42" class="t-xs">${route==='none'?'no intervention':'route: '+R.n}</text>`;
      s+=`<line x1="${SX}" x2="${SX}" y1="${F0}" y2="${f1(F1)}" style="stroke:var(--line);stroke-width:3"/>`;
      CU_ST.forEach((st,i)=>{const dim=b>=0&&i>=b&&R.pass==null,o=dim?.3:1,reached=t>=CU_STEPS[i].from,y=topOf(i),h=NBH;
        s+=`<g style="opacity:${f1(o)}"><line x1="${SX}" x2="${BX-6}" y1="${f1(y+NBH/2)}" y2="${f1(y+NBH/2)}" style="stroke:var(--line);stroke-width:1.2"/>`;
        s+=`<rect x="${BX}" y="${f1(y)}" width="${NBW}" height="${h}" rx="12" style="fill:${reached?'var(--panel)':'var(--panel-2)'};stroke:${reached?(i>=4?'var(--terra)':'var(--sea)'):'var(--line)'};stroke-width:${reached?2:1.3}"/>`;
        s+=`<text x="${BX+14}" y="${f1(y+21)}" class="t-lbl">${i+1} · ${st.l[0]}</text><text x="${BX+14}" y="${f1(y+37)}" class="t-xs">${st.l[1]}</text>`;
        if(i===3)s+=needles(BX+150,y+6,NBW-160,h-12,nX,7);
        s+='</g>'});
      // drains
      [[yk,170,'kidney · URAT1 takes back',R.pk>.5],[yu,296,R.pu>0?'uricase → allantoin (given)':'uricase: missing in humans',R.pu>0]].forEach(([y,x,l,on],k)=>{
        s+=`<line x1="${SX}" x2="${x-4}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:2;stroke-dasharray:${on?'0':'4 4'};opacity:${k&&!on?.45:1}"/>`;
        s+=`<text x="${SX+14}" y="${y-6}" class="t-xs" style="fill:${on?'var(--sea)':'var(--muted)'};font-weight:${on?700:500}">${l}</text>`});
      const D=pdots(t,R,pos);s+=D.s;
      if(b>=0){const yb=topOf(b)-14;
        D.piled.forEach((i,j)=>{const col=j%4,row=Math.floor(j/4);s+=`<circle cx="${f1(SX-16+col*10)}" cy="${f1(yb-7-row*9)}" r="4" style="fill:${b>=4?'var(--terra)':'var(--gold)'};opacity:${f1(.9-row*.12)}"/>`});
        s+=`<line x1="14" x2="386" y1="${f1(yb)}" y2="${f1(yb)}" style="stroke:var(--bad);stroke-width:${R.pass!=null?4:6};${R.pass!=null?'stroke-dasharray:7 6;':''}stroke-linecap:round"/>`;
        s+=`<text x="386" y="${f1(yb-6)}" class="t-sm t-end" style="fill:var(--bad)">${R.pass!=null?'partial barrier':'barrier'}</text>`}
      let y=F1+26;
      if(R.lvl){s+=lvlStrip(R,14,y+10,N);y+=48;cuWrap(R.fix,58).forEach(l=>{s+=`<text x="14" y="${f1(y)}" class="t-xs" style="fill:var(--ink)">${l}</text>`;y+=14})}
      else{cuWrap('No barrier: urate builds up, crystals grow, and the pathway runs to a flare.',58).forEach(l=>{s+=`<text x="14" y="${f1(y)}" class="t-xs">${l}</text>`;y+=14})}
      svg.setAttribute('viewBox','0 0 400 '+Math.round(y+10));
      svg.innerHTML=s;
    }
    const p=phaseOf(CU_STEPS,t);setSt(p);
    let extra='';
    if(R.lvl)extra=`<div class="kv"><div><dt>Route · ${R.n}</dt><dd><div class="evrow"><span class="t-sm">mechanism</span>${CU_LVL[R.lvl]}<span class="t-sm">pipeline</span>${CU_LVL[R.pipe]}</div></dd></div>`+
      `<div><dt>What it does</dt><dd>${R.fix}</dd></div><div><dt>Best evidence</dt><dd>${R.ev}</dd></div><div><dt>Main obstacle</dt><dd>${R.obs}</dd></div></div>`+
      `<div class="cards" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">${R.cards.map(c=>`<div class="card cu-card">${CU_LVL[c[1]]}<h4 style="font-size:16px">${c[0]}</h4><p>${c[2]} ${c[3]}</p></div>`).join('')}</div>`;
    $('#cuNote').innerHTML=noteHTML(CU_STEPS[p])+extra;
    $('#cuCap').textContent=`Stage ${p+1} of 7 · ${route==='none'?'no intervention':R.n}. Schematic pathway, not to scale; the dot shares are illustrative.`;
  }
  const stop=playWire(rg,$('#cuPlay'),draw,18000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CU_STEPS,rg,draw,stop);
  $$('[data-cu]').forEach(btn=>btn.onclick=()=>{route=btn.dataset.cu;$$('[data-cu]').forEach(x=>x.setAttribute('aria-pressed',x===btn));draw(+rg.value)});
  $('#cuTbl').innerHTML=CU_TBL.map((r,i)=>`<tr><td>${r[0]}</td><th>${r[1]}</th><td>${r[2]} ${CU_TBLC[i]}</td><td>${CU_LVL[r[3]]}</td><td class="cu-reg">${r[4]}</td><td>${r[5]}</td></tr>`).join('');

  /* ---- 3 · implementation gap ---- */
  $('#cuGapLede').innerHTML='The cure exists in principle; it rarely arrives. Among 94,759 people with new gout in Catalan primary care, followed for a median 5.44 years, 37.30% never received urate-lowering therapy and only 12.40% had good control. When care is organised, the gap closes. <sup class="c" data-ref="Pou2026,Doherty2018" title="Source 95,317">95,317</sup>';
  const gs=$('#cuGapSvg');let gpop='cat';
  function drawGap(){
    const N=vb(gs,'560 330','400 400');
    const D=gpop==='cat'
      ?{t:'NEW GOUT IN PRIMARY CARE · CATALONIA',seg:[[37.3,'never on urate-lowering therapy','var(--panel-2)'],[50.3,'treated, not well controlled','var(--gold)'],[12.4,'good control (< 6 mg/dL for ≥ 80% of follow-up)','var(--sea)']],src:'Pou 2026 · 94,759 people · middle band derived as 100 − 37.30 − 12.40'}
      :{t:'NURSE-LED CARE · URATE < 6 mg/dL AT 2 YEARS',seg:[[5.1,'not at target (derived)','var(--panel-2)'],[94.9,'at target','var(--sea)']],src:'Doherty 2018 · 255 people · usual care in the same trial: 29.71%'};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/><text x="16" y="24" class="t-sm">${D.t}</text>`;
    const cs=N?26:20,gx=N?(400-10*cs)/2:24,gy=40;
    let k=0;const col=[];D.seg.forEach(([v,l,c])=>{const n=Math.round(v);for(let i=0;i<n&&col.length<100;i++)col.push(c)});while(col.length<100)col.push(D.seg[D.seg.length-1][2]);
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10;s+=`<rect x="${gx+c*cs}" y="${gy+r*cs}" width="${cs-3}" height="${cs-3}" rx="3" style="fill:${col[i]};stroke:var(--line)"/>`}
    const lx=N?16:gx+10*cs+18,ly=N?gy+10*cs+24:gy+16;
    D.seg.forEach(([v,l,c],i)=>{const y=ly+i*(N?32:46);s+=`<rect x="${lx}" y="${y-10}" width="14" height="14" rx="3" style="fill:${c};stroke:var(--line)"/><text x="${lx+22}" y="${y+2}" class="t-lbl">${f1(v)}%</text>`;
      cuWrap(l,N?50:34).forEach((ll,j)=>s+=`<text x="${lx+(N?72:22)}" y="${y+(N?2:16)+j*13}" class="t-xs">${ll}</text>`)});
    cuWrap(D.src,N?60:40).forEach((l,i)=>s+=`<text x="${N?16:lx}" y="${(N?ly+D.seg.length*32+6:gy+10*cs-24)+i*13}" class="t-xs" style="fill:var(--muted)">${l}</text>`);
    gs.innerHTML=s;
    $('#cuGapNote').innerHTML=gpop==='cat'
      ?`<div class="kicker">Real-world care</div><h4>Most people never reach the target</h4><p>In Catalonia, 37.30% of people with incident gout never received urate-lowering therapy and 12.40% kept urate below 6 mg/dL for at least 80% of follow-up, with no improvement from 2012 to 2023. In the UK in 2012, only 37.63% of people consulting for gout received urate-lowering therapy, and adherence was 39.66%. <sup class="c" data-ref="Pou2026,Kuo2015" title="Source 222,317">222,317</sup></p><div class="hook"><b>Exam hook</b>The bottleneck is implementation, not chemistry: <b>12.4%</b> good control in primary care. <sup class="c" data-ref="Pou2026" title="Source 317">317</sup></div><div class="pt"><b>In plain words</b>The medicines that can dissolve crystals already exist. Most people with gout just never get them, or never get the dose high enough.</div>`
      :`<div class="kicker">Organised care</div><h4>The same drugs, a different result</h4><p>Nurse-led treat-to-target care reached urate below 360 µmol/L at 2 years in 94.88% against 29.71% with usual GP care (RR 3.18), at £5066 per QALY. The number of people with gout is projected to rise from 55.8 million in 2020 to 95.8 million in 2050, so the gap grows in absolute terms. <sup class="c" data-ref="Doherty2018,GBD2024Gout" title="Source 95,146">95,146</sup></p><div class="hook"><b>Exam hook</b>Nurse-led treat-to-target: <b>95% vs 30%</b> at target at 2 years. <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup></div><div class="pt"><b>In plain words</b>With regular checks and someone raising the dose, almost everyone gets there.</div>`;
  }
  $$('[data-cug]').forEach(b=>b.onclick=()=>{gpop=b.dataset.cug;$$('[data-cug]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawGap()});

  /* ---- open questions ---- */
  const Q=[
   ['Lifelong treatment, or a holiday once crystals clear?',`ACR 2020 conditionally favours indefinite urate-lowering therapy, at very low certainty. Perez-Ruiz proposed about 5 years of treatment then a pause guided by urate. GO TEST Finale (at least 278 people in remission) and STING (NCT06956885, about 450, not yet recruiting) are testing it. <sup class="c" data-ref="FitzGerald2020,PerezRuiz2006,Peeters2023,NCT06956885" title="Source 135,282,309,314">135,282,309,314</sup>`],
   ['Is clinical remission the same as a crystal-free joint?',`Of people meeting remission criteria, 44% still had DECT urate deposits. G-CAN calls its definition "clinical" for this reason, and no validated imaging-remission endpoint exists. <sup class="c" data-ref="Dalbeth2019ART,TabiAmponsah2026" title="Source 83,393">83,393</sup>`],
   ['Why do only some people with high urate form crystals?',`About half of people with urate at or above 10 mg/dL stayed gout-free for 15 years. Silent deposits appear in 24% on DECT and 38.7% on ultrasound. The TIGER cohort is following people with asymptomatic hyperuricaemia to see who progresses. <sup class="c" data-ref="Dalbeth2018ARD,Dalbeth2015,Stewart2026US" title="Source 79,82,386">79,82,386</sup>`],
   ['Should asymptomatic hyperuricaemia be treated?',`FREED reported fewer composite events with febuxostat, driven by kidney impairment; CKD-FIX and PERL found no kidney benefit from allopurinol; ACR advises against routine treatment. <sup class="c" data-ref="Kojima2019,Badve2020,Doria2020,FitzGerald2020" title="Source 11,96,135,215">11,96,135,215</sup>`],
   ['Can new URAT1 and xanthine oxidase inhibitors beat allopurinol titrated to target?',`Dotinurad 4 mg beat febuxostat 40 mg, a low febuxostat dose. EURELIA 2 (allopurinol up to 800 mg) and the dotinurad-versus-allopurinol trial are unreported or recruiting. <sup class="c" data-ref="Sun2025,NCT05586971,NCT07089875" title="Source 274,283,387">274,283,387</sup>`],
   ['Tolerance induction or methotrexate for uricase?',`NASP reached 51% response against 8% on placebo with infusion reactions in 4%; pegloticase plus methotrexate reached 71.0% with 4.2%. The trials used different comparators, and there is no head-to-head trial. <sup class="c" data-ref="Baraf2026,Botson2023" title="Source 15,27">15,27</sup>`],
   ['Oral NLRP3 inhibitors or IL-1 antibodies for flares?',`Canakinumab and firsekibart have phase 3 and regulatory evidence. Oral NLRP3 inhibition has only an open-label phase 2a; the placebo-controlled dapansutrile trial is recruiting. <sup class="c" data-ref="Schlesinger2012,Crescioli2026,Kluck2020,NCT05658575" title="Source 66,213,275,355">66,213,275,355</sup>`]
  ];
  $('#cuQA').innerHTML=Q.map((q,i)=>`<details><summary>${String(i+1).padStart(2,'0')} · ${q[0]}</summary><p>${q[1]}</p></details>`).join('');
  $('#cuClose').innerHTML=`<h3 class="sub">Where this leaves us</h3>
   <p>Gout already has a cure in the sense that matters most: urate held below target dissolves the crystals that cause it, and the drugs to do that have existed since 1966. The pipeline adds more potent and more convenient ways to lower urate, and better ways to stop a flare, but none of them changes the basic rule that crystals go only when urate stays low. <sup class="c" data-ref="Pascual2007,DrugsFDA-Zyloprim,Dalbeth2021" title="Source 85,101,308">85,101,308</sup></p>
   <p>The larger gap is delivery. In primary care most people never reach the target, while organised nurse-led care gets almost everyone there with the same drugs. <sup class="c" data-ref="Pou2026,Doherty2018" title="Source 95,317">95,317</sup></p>
   <div class="pt"><b>In plain words</b>The cure for gout is keeping urate low for years. The new medicines may make that easier. The hard part is still getting the right dose to every person who needs it. This page is not advice about anyone's treatment.</div>`;

  const prevR=redraws.cure;redraws.cure=()=>{prevR&&prevR();drawRem();drawGap()};
  drawX(+xr.value);drawRem();draw(+rg.value);drawGap();
};
/* =============== 6.1 history & people =============== */
const hiWrap=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
const HI_LANES=[['Clinic & names','var(--terra)'],['Treatment','var(--crocus)'],['Chemistry & crystals','var(--xtal)'],['Mechanism','var(--gold)'],['Criteria & guides','var(--good)']];
/* y: position on the axis; d: how the date is written */
const HI_EV=[
 {y:-400,d:'c. 400 BCE',l:0,c:'Hippocrates on podagra',h:'Hippocrates: podagra',t:'5th century BCE · Podagra',
  txt:'Podagra, gout of the big toe joint, was described by the Egyptians in 2640 BC and by Hippocrates in the 5th century BC, who called it "the unwalkable disease". His aphorisms say eunuchs do not get gout, nor a woman before her menses stop, and that it is active in spring and autumn. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>',
  pt:'Doctors in ancient Greece already knew gout well, and knew it mostly struck men.',
  hook:'Hippocrates\' aphorisms predate the explanation by 2,000 years: <b>eunuchs and premenopausal women rarely get gout</b>. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:170,d:'2nd century',l:0,c:'Galen: tophi, a family trait',h:'Galen describes tophi',t:'2nd century · Galen',
  txt:'Galen first described tophi and noted a hereditary trait. Hippocrates had called podagra an "arthritis of the rich". <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:550,d:'6th century',l:1,c:'colchicum used for gout',h:'Alexander of Tralles: colchicum',t:'6th century · Colchicum',
  txt:'Colchicum, the autumn crocus, was a purgative in ancient Greece; its first use as a specific treatment for gout is credited to Alexander of Tralles in the 6th century AD. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>',
  pt:'A flower, the autumn crocus, was used for gout 1,500 years ago. Colchicine still comes from it.'},
 {y:1230,d:'13th century',l:0,c:'"gout", from gutta, a drop',h:'The word "gout", from gutta',t:'13th century · A drop',
  txt:'The word "gout" was first used by Randolphus of Bocking (1197–1258), from the Latin gutta, a drop, after the medieval idea of a humour dropping into a joint. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>',
  hook:'"Gout" comes from <b>gutta</b>, a drop of humour falling into the joint. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:1679,d:'1679',l:2,c:'needle crystals seen in a tophus',h:'van Leeuwenhoek sees crystals',t:'1679 · Needles under a lens',
  txt:'Antonie van Leeuwenhoek described needle-shaped crystals from a tophus in 1679, without knowing what they were made of. <sup class="c" data-ref="McCarty1970,Nuki2006" title="Source 255,296">255,296</sup>',
  pt:'With one of the first microscopes, a Dutch lens-maker saw tiny needles in material from a gout lump.'},
 {y:1683,d:'1683',l:0,c:'Sydenham, Tractatus de Podagra',h:'Sydenham: Tractatus de Podagra',t:'1683 · Sydenham',
  txt:'Thomas Sydenham, himself disabled by gout, described the night-time great-toe flare in his Tractatus de Podagra et Hydrope (1683). His rejection of purgatives kept colchicum out of use for about 150 years. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>',
  hook:'The classic description of a flare starting at night in the big toe is <b>Sydenham\'s, from his own flares</b>. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:1763,d:'1763',l:1,c:'von Störck revives colchicum',h:'Colchicum revived in Vienna',t:'1763 · Colchicum returns',
  txt:'Von Störck revived colchicum in Vienna in 1763, ending the long gap that followed Sydenham\'s rejection of purgatives. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:1776,d:'1776',l:2,c:'uric acid found in a kidney stone',h:'Scheele: uric acid in a stone',t:'1776 · Uric acid',
  txt:'Scheele identified uric acid in a kidney stone in 1776. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:1797,d:'1797',l:2,c:'urate found in a tophus',h:'Wollaston: urate in a tophus',t:'1797 · Urate in a tophus',
  txt:'Wollaston showed urate in a tophus from his own ear in 1797, linking the chemical to the disease. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:1819,d:'1819',l:1,c:'colchicine isolated',h:'Pelletier & Caventou isolate colchicine',t:'1819 · The alkaloid',
  txt:'Pelletier and Caventou isolated the active substance from Colchicum autumnale in 1819 (often misdated to 1820). Geiger named it colchicine in 1833, and Houdé produced pure crystalline granules in 1884. <sup class="c" data-ref="Karamanou2018" title="Source 195">195</sup>',
  hook:'Colchicine was isolated in <b>1819</b> by Pelletier and Caventou, and named by Geiger in 1833. <sup class="c" data-ref="Karamanou2018" title="Source 195">195</sup>'},
 {y:1848,d:'1848',l:2,c:'thread test: raised urate in blood',h:'Garrod: the thread test',t:'1848 · Garrod\'s thread',
  txt:'Alfred Baring Garrod measured raised uric acid in the blood of people with gout and devised the "thread test", called the first clinical chemistry test. <sup class="c" data-ref="Garrod1848,Nuki2006" title="Source 145,296">145,296</sup>',
  pt:'A London doctor showed that people with gout have too much urate in their blood, using a thread that collected crystals.',
  hook:'Garrod\'s thread test (1848) is called the <b>first clinical chemistry test</b>. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:1859,d:'1859',l:3,c:'deposits cause the inflammation',h:'Garrod: cause, not effect',t:'1859 · Cause, not effect',
  txt:'In 1859 Garrod proposed that deposited sodium urate is the cause of gouty inflammation, not its effect. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:1877,d:'1877',l:1,c:'salicylate: the first uricosuric',h:'See: high-dose salicylate',t:'1877 · The first uricosuric',
  txt:'High-dose salicylate (See, 1877) was the first uricosuric, later replaced by probenecid, sulfinpyrazone and benzbromarone. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:1899,d:'1899',l:3,c:'injected crystals cause arthritis',h:'Freudweiler: injected crystals',t:'1899 · An overlooked experiment',
  txt:'Freudweiler caused gout-like arthritis by injecting urate microcrystals in 1899. The finding was overlooked for 60 years. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>'},
 {y:1951,d:'1951',l:1,c:'probenecid (Benemid) in gout',h:'Probenecid in gout',t:'1951 · Probenecid',
  txt:'The clinical and metabolic effects of probenecid (Benemid) in gout were reported in 1951. <sup class="c" data-ref="Talbott1951,Nuki2006" title="Source 296,394">296,394</sup>'},
 {y:1957,d:'1957',l:1,c:'uricase first given to humans',h:'Uricase given to two people',t:'1957 · Uricase',
  txt:'Purified uricase was first given to humans in 1957, by London and Hudson. Humans lack the enzyme, which turns urate into soluble allantoin; pegloticase is its modern, PEGylated form. <sup class="c" data-ref="London1957,Nuki2006,Chen2016,Sundy2011" title="Source 39,237,296,388">39,237,296,388</sup>'},
 {y:1961,d:'1961',l:2,c:'polarised light identifies MSU',h:'McCarty & Hollander: polarised light',t:'1961 · Polarised light',
  txt:'McCarty and Hollander used compensated polarised light microscopy to identify monosodium urate crystals in gouty synovial fluid, 62 years after Freudweiler\'s overlooked experiment. Seeing these crystals is still the reference test. <sup class="c" data-ref="McCarty1961,Nuki2006" title="Source 254,296">254,296</sup> <a href="#dx" data-go="dx">See the diagnosis</a>',
  pt:'Special light made the urate needles easy to recognise in fluid taken from a joint.',
  hook:'1961, McCarty and Hollander: <b>compensated polarised light</b> identifies urate crystals. <sup class="c" data-ref="McCarty1961" title="Source 254">254</sup>'},
 {y:1965,d:'1965',l:1,c:'allopurinol works in gout',h:'Klinenberg: allopurinol trial',t:'1965 · Allopurinol',
  txt:'Allopurinol, the first xanthine oxidase inhibitor, came from Hitchings and Elion\'s purine research. A clinical report of its effectiveness in gout appeared in 1965. An earlier 1963 report by Rundles and colleagues is cited in reviews but could not be verified here. <sup class="c" data-ref="Klinenberg1965,Elion1989,Nuki2006" title="Source 106,211,296">106,211,296</sup>'},
 {y:1966,d:'1966',l:1,c:'Zyloprim approved by the FDA',h:'Allopurinol approved in the US',t:'1966 · Zyloprim',
  txt:'Zyloprim (allopurinol) was approved by the FDA on 19 August 1966. It remains first-line urate-lowering therapy. <sup class="c" data-ref="DrugsFDA-Zyloprim,FitzGerald2020" title="Source 101,135">101,135</sup>',
  pt:'From 1966 doctors had a daily pill that lowers urate enough to dissolve crystals.'},
 {y:1967,d:'1967',l:3,c:'HPRT deficiency: an inherited gout',h:'Seegmiller: HPRT deficiency',t:'1967 · An enzyme defect',
  txt:'Seegmiller, Rosenbloom and Kelley described the first purine enzyme defect, HPRT deficiency, causing a rare inherited form of gout. <sup class="c" data-ref="Seegmiller1967,Nuki2006" title="Source 296,360">296,360</sup>'},
 {y:1988,d:'1988',l:1,c:'Nobel Prize to Elion and Hitchings',h:'Nobel Prize: Elion & Hitchings',t:'1988 · The Nobel Prize',
  txt:'Gertrude Elion and George Hitchings, whose purine research produced allopurinol, shared the 1988 Nobel Prize. <sup class="c" data-ref="Elion1989,Nuki2006" title="Source 106,296">106,296</sup>',
  hook:'Allopurinol came from <b>Elion and Hitchings</b>, Nobel Prize 1988. <sup class="c" data-ref="Nuki2006,Elion1989" title="Source 106,296">106,296</sup>'},
 {y:2006,d:'2006',l:3,c:'urate crystals activate NALP3',h:'Martinon: crystals activate NALP3',t:'2006 · The inflammasome',
  txt:'Martinon, Tschopp and colleagues showed that urate crystals activate the NALP3 (NLRP3) inflammasome, releasing active IL-1β and IL-18; mice lacking inflammasome parts or the IL-1 receptor had impaired crystal-induced neutrophil influx. <sup class="c" data-ref="Martinon2006" title="Source 250">250</sup> <a href="#flare" data-go="flare">See it animated</a>',
  pt:'Scientists found the alarm switch inside immune cells that the crystals flip on.',
  hook:'Martinon 2006: MSU crystals activate the <b>NALP3 inflammasome</b>, which is why IL-1 blockers work. <sup class="c" data-ref="Martinon2006" title="Source 250">250</sup>'},
 {y:2008.3,d:'2008–09',l:1,c:'febuxostat: EU 2008, US 2009',h:'Febuxostat approved',t:'2008–09 · Febuxostat and Colcrys',
  txt:'Febuxostat was authorised in the EU on 21 April 2008 and approved in the US as Uloric on 13 February 2009, after the FACT trial reached urate below 6 mg/dL in 53% (80 mg) and 62% (120 mg) against 21% on allopurinol 300 mg. Colchicine was first approved as a single-ingredient FDA product, Colcrys, on 29 July 2009. <sup class="c" data-ref="EMA-Adenuric,DrugsFDA-Uloric,Becker2005,DrugsFDA-Colcrys" title="Source 18,97,99,107">18,97,99,107</sup>'},
 {y:2010,d:'2010',l:1,c:'pegloticase approved',h:'Pegloticase approved',t:'2010 · Pegloticase',
  txt:'Pegloticase was approved in the US as Krystexxa on 14 September 2010. In two pooled trials, 42% (every 2 weeks) and 35% (monthly) met the urate response against 0% on placebo. <sup class="c" data-ref="DrugsFDA-Krystexxa,Sundy2011" title="Source 98,388">98,388</sup>'},
 {y:2012,d:'2012',l:4,c:'ACR guidelines',h:'ACR 2012 guidelines',t:'2012 · ACR guidelines',
  txt:'The 2012 ACR guidelines recommended checking urate every 2–5 weeks during titration and every 6 months once at target, and made patient education a core measure. <sup class="c" data-ref="Khanna2012P1" title="Source 202">202</sup>'},
 {y:2013,d:'2013',l:1,c:'canakinumab for flares, EU',h:'Canakinumab: EU approval for flares',t:'2013 · An IL-1β antibody',
  txt:'Canakinumab, an anti-IL-1β antibody, gained an EU indication for frequent gout flares in February 2013, for adults in whom NSAIDs and colchicine are unsuitable. US approval followed on 25 August 2023. <sup class="c" data-ref="EMA-IlarisGout2013,FDA-IlarisGout2023" title="Source 109,121">109,121</sup>'},
 {y:2015,d:'2015',l:4,c:'ACR/EULAR classification criteria',h:'ACR/EULAR 2015 criteria',t:'2015 · Classification criteria',
  txt:'The 2015 ACR/EULAR criteria have an entry criterion of at least one episode of peripheral joint or bursa swelling, pain or tenderness; urate crystals in a symptomatic joint or tophus are sufficient on their own; otherwise 8 or more points classifies as gout. <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup> <a href="#dx" data-go="dx">Try the calculator</a>'},
 {y:2016.6,d:'2016',l:4,c:'EULAR: urate < 6 mg/dL',h:'EULAR 2016 recommendations',t:'2016 · EULAR recommendations',
  txt:'The updated EULAR recommendations keep serum urate below 6 mg/dL (360 µmol/L), or below 5 mg/dL (300 µmol/L) in severe gout, with allopurinol first line. <sup class="c" data-ref="Richette2017" title="Source 331">331</sup>'},
 {y:2020,d:'2020',l:4,c:'ACR guideline: treat to target',h:'ACR 2020 guideline',t:'2020 · ACR guideline',
  txt:'The 2020 ACR guideline has 42 recommendations, 16 of them strong, including treat-to-target with serum urate below 6 mg/dL and allopurinol first line. <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup> <a href="#t2t" data-go="t2t">Treat to target</a>'},
 {y:2025,d:'2025',l:1,c:'firsekibart approved in China',h:'Firsekibart approved in China',t:'2025 · A second IL-1β antibody',
  txt:'Firsekibart, an anti-IL-1β antibody, was approved by China\'s NMPA in June 2025 for gouty arthritis in adults who cannot use NSAIDs or colchicine. <sup class="c" data-ref="Crescioli2026" title="Source 66">66</sup> <a href="#cure" data-go="cure">The pipeline</a>'}
];
const HI_ERA=[{f:-500,a:-400,t:'The ancient disease'},{f:1650,a:1679,t:'Microscope & bedside'},{f:1770,a:1776,t:'The chemistry of urate'},{f:1950,a:1951,t:'Lowering urate'},{f:2000,a:2006,t:'The inflammasome'},{f:2011.5,a:2012,t:'Targets & guidelines'}];
const HI_NAMES=[['Podagra (the big toe)',-400],['Gutta → gout',1230],['The disease of kings',null],['Chiragra (hand) · unverified',null],['Gonagra (knee) · unverified',null],['Urate crystal arthritis (proposed)',null]];
const hiFmt=y=>y<0?Math.round(-y)+' BCE':String(Math.floor(y));
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  /* compressed before 1650, stretched after 1900 and 1990; fx() maps a year to the axis fraction */
  const fx=y=>y<=1650?lerp(0,.16,(y+500)/2150):y<=1900?lerp(.16,.46,(y-1650)/250):y<=1990?lerp(.46,.74,(y-1900)/90):lerp(.74,1,(y-1990)/36);
  const fy=u=>u<=.16?-500+u/.16*2150:u<=.46?1650+(u-.16)/.3*250:u<=.74?1900+(u-.46)/.28*90:1990+(u-.74)/.26*36;
  const tOfY=y=>clamp(fx(y));
  let XA=150,XB=700;
  const xOf=y=>XA+(XB-XA)*fx(y);
  const steps=HI_ERA.map((E,i)=>({from:i===0?0:tOfY(E.f),at:Math.min(1,tOfY(E.a)+.004),t:E.t}));
  const eraOf=y=>{let e=0;HI_ERA.forEach((E,i)=>{if(y>=E.f)e=i});return e};
  const T=(x,y,c,st,v)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const RC=(x,y,w,h,st,r=4)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const PANEL='fill:var(--panel);stroke:var(--line)';
  const TW=(x,y,txt,n,c='t-xs',st='')=>hiWrap(txt,n).map((l,i)=>T(x,y+i*12,c,st,l)).join('');
  const crocus=(x,y,s=1)=>{let o=LN(x,y,x,y+34*s,'stroke:var(--good);stroke-width:2');
    for(let k=0;k<6;k++){const a=-Math.PI/2+(k-2.5)*.42;o+=`<ellipse cx="${f1(x+Math.cos(a)*10*s)}" cy="${f1(y+Math.sin(a)*10*s)}" rx="${f1(4*s)}" ry="${f1(10*s)}" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x+Math.cos(a)*10*s)} ${f1(y+Math.sin(a)*10*s)})" style="fill:var(--crocus);opacity:.8"/>`}
    return o+`<circle cx="${x}" cy="${y}" r="${f1(3*s)}" style="fill:var(--gold)"/>`};
  const bottle=(x,y,c,lbl)=>RC(x+8,y,18,8,`fill:${c};opacity:.85`,2)+RC(x,y+8,34,40,`fill:var(--panel);stroke:${c};stroke-width:1.6`,5)+RC(x+5,y+20,24,12,`fill:${c};opacity:.25`,2)+T(x+17,y+62,'t-xs t-mid','',lbl);
  const field=(x,y,r,n,seed,o=1)=>{const R=rng(seed);let s=`<circle cx="${x}" cy="${y}" r="${r}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`;
    for(let i=0;i<n;i++){const a=R()*6.283,rr=Math.sqrt(R())*r*.75;s+=needle(x+Math.cos(a)*rr,y+Math.sin(a)*rr,r*.28,R()*180,o)}return s};

  /* ---------- the scene: one drawing per era, both layouts ---------- */
  function ancient(A,yr,N){let s='';
    const fx0=A.x+12,fy0=A.y+20,sc=.8;
    s+=`<g transform="translate(${fx0} ${fy0}) scale(${sc})"><path d="M48 232 C20 230 14 196 18 160 C22 120 14 92 22 64 C28 44 46 34 70 36 C96 38 116 44 122 62 C128 84 118 118 112 150 C106 186 102 226 74 232 Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
    s+=`<ellipse cx="40" cy="22" rx="13" ry="17" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
    [[66,17,8],[86,21,7],[102,29,6],[115,41,5]].forEach(([a,b,r])=>s+=`<circle cx="${a}" cy="${b}" r="${r}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`);
    s+=`<circle cx="40" cy="56" r="22" style="fill:var(--terra);opacity:.28"/><circle cx="40" cy="56" r="11" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:2.4"/>`;
    if(yr>=170)[[22,118],[20,140],[28,160]].forEach(([a,b])=>s+=`<circle cx="${a}" cy="${b}" r="7" style="fill:var(--field);stroke:var(--xtal);stroke-width:1.6"/>`);
    s+='</g>';
    const x0=A.x+(N?132:150),w=N?36:40;
    s+=T(x0,A.y+28,'t-sm','fill:var(--terra)','PODAGRA')+T(x0,A.y+44,'t-xs','','gout of the big toe joint');
    if(yr>=170)s+=T(x0,A.y+74,'t-sm','fill:var(--xtal)','TOPHI')+T(x0,A.y+90,'t-xs','','Galen, 2nd century');
    if(yr>=550){s+=crocus(A.x+A.w-(N?26:36),A.y+(N?186:150),N?.9:1.1)+T(x0,A.y+120,'t-sm','fill:var(--crocus)','COLCHICUM')+TW(x0,A.y+136,'Alexander of Tralles, 6th century',w)}
    if(yr>=1230){const dx=x0,dy=A.y+178;s+=`<path d="M${dx+6} ${dy-12} q6 9 0 14 q-6 -5 0 -14z" style="fill:var(--sea)"/>`+T(dx+18,dy,'t-sm','fill:var(--sea)','GUTTA')+T(dx+18,dy+16,'t-xs','','a drop: the word "gout"')}
    s+=T(A.x+8,A.y+A.h-6,'t-xs','','Hippocrates: "the unwalkable disease"');
    return s}

  function microscope(A,yr,N){let s='';
    const mx=A.x+(N?36:50),my=A.y+30;
    s+=`<ellipse cx="${mx}" cy="${my+108}" rx="34" ry="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=RC(mx-6,my+44,12,62,'fill:var(--panel-2);stroke:var(--line)',4);
    s+=`<path d="M${mx+6} ${my+54} q26 8 22 38" style="fill:none;stroke:var(--muted);stroke-width:5;stroke-linecap:round"/>`;
    s+=RC(mx+16,my+6,16,48,'fill:var(--panel);stroke:var(--muted);stroke-width:1.6',5)+RC(mx+13,my-6,22,12,'fill:var(--panel-2);stroke:var(--muted)',3);
    s+=RC(mx-18,my+66,56,8,'fill:var(--panel-2);stroke:var(--line)',2);
    const fxc=A.x+(N?150:170),fyc=A.y+82;
    if(yr>=1679){s+=field(fxc,fyc,48,9,5)+TW(fxc-50,fyc+66,'needles from a tophus, 1679',22,'t-xs','fill:var(--xtal)')}
    else s+=`<circle cx="${fxc}" cy="${fyc}" r="48" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2;opacity:.5"/>`;
    const bx=A.x+A.w-(N?96:112),by=A.y+18;
    if(yr>=1683){s+=RC(bx,by,N?84:96,70,'fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.6',4)+LN(bx+8,by,bx+8,by+70,'stroke:var(--terra)');
      s+=T(bx+16,by+26,'t-xs','fill:var(--ink);font-weight:700','Tractatus')+T(bx+16,by+40,'t-xs','fill:var(--ink);font-weight:700','de Podagra')+T(bx+16,by+58,'t-xs','','Sydenham')}
    if(yr>=1763){s+=crocus(bx+30,by+120,.9)+TW(bx-4,by+172,'colchicum revived, 1763',N?16:18,'t-xs','fill:var(--crocus)')}
    return s}

  function chemistry(A,yr,N){let s='';
    const cw=(A.w-8)/3,ch=(A.h-8)/2,n=N?19:22;
    const cell=(k,on,draw,lbl,col)=>{const cx=A.x+4+(k%3)*cw+cw/2,cy=A.y+4+Math.floor(k/3)*ch+36;
      if(!on){s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="14" style="fill:none;stroke:var(--line);stroke-dasharray:3 3"/>`;return}
      s+=draw(cx,cy);s+=TW(cx-cw/2+6,cy+44,lbl,n,'t-xs',`fill:${col}`)};
    cell(0,yr>=1776,(x,y)=>`<path d="M${x-22} ${y+4} q4 -24 24 -20 q22 2 20 20 q-4 18 -24 16 q-22 2 -20 -16z" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/>`,'uric acid in a kidney stone, 1776','var(--gold)');
    cell(1,yr>=1797,(x,y)=>`<path d="M${x-6} ${y-26} q26 -4 24 22 q-2 18 -16 22 q-6 2 -8 12 q-4 6 -10 0" style="fill:none;stroke:var(--muted);stroke-width:2"/><circle cx="${x+10}" cy="${y-16}" r="6" style="fill:var(--field);stroke:var(--xtal);stroke-width:1.6"/>`,'urate in a tophus from an ear, 1797','var(--xtal)');
    cell(2,yr>=1819,(x,y)=>RC(x-8,y-28,16,8,'fill:var(--crocus)',2)+RC(x-12,y-20,24,40,'fill:var(--crocus-soft);stroke:var(--crocus);stroke-width:1.6',5),'colchicine isolated, 1819','var(--crocus)');
    cell(3,yr>=1848,(x,y)=>`<ellipse cx="${x}" cy="${y+6}" rx="30" ry="9" style="fill:var(--panel-2);stroke:var(--line)"/>`+LN(x-26,y-2,x+26,y-2,'stroke:var(--ink);stroke-width:1.4')+[0,1,2,3,4].map(k=>needle(x-20+k*10,y-2,8,60+k*25,.9)).join(''),'Garrod\'s thread test, 1848','var(--xtal)');
    cell(4,yr>=1859,(x,y)=>needle(x-18,y,16,30)+`<path d="M${x-6} ${y} h14" style="stroke:var(--muted);stroke-width:1.6"/><path d="M${x+14} ${y+10} q-6 -10 2 -20 q2 8 8 4 q4 10 -4 16z" style="fill:var(--terra);opacity:.85"/>`,'deposits cause the inflammation, 1859','var(--gold)');
    cell(5,yr>=1899,(x,y)=>RC(x-24,y-6,36,12,'fill:var(--panel);stroke:var(--muted)',3)+LN(x+12,y,x+26,y,'stroke:var(--muted);stroke-width:1.4')+needle(x-14,y,8,0)+needle(x-4,y,8,0),'injected crystals inflame a joint, 1899','var(--gold)');
    return s}

  function lowering(A,yr,N){let s='';
    const px=A.x+(N?60:70),py=A.y+76;
    if(yr>=1961){s+=field(px,py,54,10,9)+`<path d="M${px-46} ${py+46} L${px+46} ${py-46}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`+TW(px-56,py+72,'compensated polarised light, 1961',N?20:22,'t-xs','fill:var(--xtal)')}
    else s+=`<circle cx="${px}" cy="${py}" r="54" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2;opacity:.5"/>`;
    const x0=A.x+(N?132:156),sp=(A.x+A.w-x0-60)/2;
    if(yr>=1951)s+=bottle(x0,A.y+16,'var(--sea)','probenecid');
    if(yr>=1957)s+=bottle(x0+sp,A.y+16,'var(--sea)','uricase');
    if(yr>=1965)s+=bottle(x0+2*sp,A.y+16,'var(--sea)','allopurinol');
    if(yr>=1966)s+=T(x0+2*sp+17,A.y+92,'t-xs t-mid','fill:var(--sea);font-weight:700','FDA 1966');
    if(yr>=1967)s+=TW(x0,A.y+124,'HPRT deficiency: an inherited gout, 1967',N?36:40,'t-xs','fill:var(--gold)');
    if(yr>=1988){const mx=x0+14,my=A.y+176;s+=`<circle cx="${mx}" cy="${my}" r="14" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:2"/><path d="M${mx-6} ${my+12} l-4 16 l10 -6 l10 6 l-4 -16" style="fill:var(--warn);opacity:.6"/>`+TW(mx+22,my-2,'Nobel 1988: Elion and Hitchings',N?26:32,'t-xs','fill:var(--ink)')}
    return s}

  function inflammasome(A,yr,N){let s='';
    const cx=A.x+A.w*(N?.3:.32),cy=A.y+A.h*.44,rx=A.w*(N?.27:.28),ry=A.h*.36;
    s+=T(A.x+6,A.y+12,'t-xs','','INSIDE A MACROPHAGE');
    s+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:3"/>`;
    s+=needle(cx-rx*.45,cy-ry*.25,22,35)+needle(cx-rx*.35,cy-ry*.05,16,-20);
    for(let k=0;k<10;k++){const a=k/10*6.283;s+=`<circle cx="${f1(cx+12+Math.cos(a)*13)}" cy="${f1(cy+Math.sin(a)*13)}" r="3.2" style="fill:var(--terra);opacity:.85"/>`}
    s+=T(cx+12,cy+30,'t-xs t-mid','fill:var(--terra)','NLRP3');
    for(let k=0;k<4;k++)s+=`<circle cx="${f1(cx+rx*.55+k*12)}" cy="${f1(cy-ry*.4+k*6)}" r="3.5" style="fill:var(--terra)"/>`;
    s+=T(cx+rx*.6,cy-ry*.5,'t-xs','fill:var(--terra)','IL-1β');
    s+=neutro(cx+rx+8,cy+ry*.55,12,1);
    s+=TW(A.x+6,A.y+A.h-20,'crystals switch on NALP3, 2006',N?30:34,'t-xs','fill:var(--gold)');
    const rx0=A.x+A.w-(N?104:124);
    if(yr>=2008.3){s+=`<rect x="${rx0}" y="${A.y+22}" width="30" height="14" rx="7" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/><line x1="${rx0+15}" x2="${rx0+15}" y1="${A.y+22}" y2="${A.y+36}" style="stroke:var(--sea)"/>`+TW(rx0,A.y+52,'febuxostat: EU 2008, US 2009',N?18:22,'t-xs','fill:var(--sea)')}
    if(yr>=2010){const by=A.y+112;s+=`<path d="M${rx0} ${by} h28 v34 q-14 10 -28 0z" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/><line x1="${rx0+14}" x2="${rx0+14}" y1="${by+40}" y2="${by+54}" style="stroke:var(--sea);stroke-width:1.6"/>`+TW(rx0,by+70,'pegloticase, 2010',N?18:22,'t-xs','fill:var(--sea)')}
    return s}

  function guides(A,yr,N){let s='';
    const D=[[2012,'ACR 2012','urate tests'],[2015,'ACR/EULAR','≥ 8 points'],[2016.6,'EULAR 2016','< 6 mg/dL'],[2020,'ACR 2020','to target']];
    const dw=(A.w-12)/4;
    D.forEach(([y,t1,t2],k)=>{const x=A.x+6+k*dw,yy=A.y+12,w=dw-8,on=yr>=y;
      s+=RC(x,yy,w,64,on?PANEL:'fill:none;stroke:var(--line);stroke-dasharray:3 3',6);
      if(on){s+=LN(x+8,yy+16,x+w-8,yy+16,'stroke:var(--good);stroke-width:2')+LN(x+8,yy+28,x+w-20,yy+28,'stroke:var(--line);stroke-width:2')+T(x+w/2,yy+46,'t-xs t-mid','fill:var(--good);font-weight:700',t1)+T(x+w/2,yy+58,'t-xs t-mid','',t2)}});
    if(yr>=2016.6){const gx=A.x+10,gy=A.y+108,gw=A.w*(N?.9:.55);
      s+=T(gx,gy-8,'t-xs','','serum urate, mg/dL');
      s+=RC(gx,gy,gw,12,'fill:var(--panel-2)',6)+RC(gx,gy,gw*.6,12,'fill:var(--sea-soft)',6);
      s+=LN(gx+gw*.6,gy-4,gx+gw*.6,gy+16,'stroke:var(--sea);stroke-width:2.4')+T(gx+gw*.6,gy+30,'t-xs t-mid','fill:var(--sea);font-weight:700','target < 6 (360 µmol/L)');
      [0,10].forEach((v,i)=>s+=T(gx+gw*v/10,gy+30,'t-xs '+(i?'t-end':''),'',v))}
    const sx=A.x+(N?10:A.w*.62+8),sy=A.y+(N?160:120);
    if(yr>=2013){s+=RC(sx,sy,46,12,'fill:var(--panel);stroke:var(--crocus)',3)+LN(sx+46,sy+6,sx+62,sy+6,'stroke:var(--crocus);stroke-width:1.4')+RC(sx+6,sy+2,22,8,'fill:var(--crocus);opacity:.4',2);
      s+=TW(sx,sy+28,'IL-1β antibody: EU 2013'+(yr>=2023?', US 2023':'')+(yr>=2025?'; a second, China 2025':''),N?40:26,'t-xs','fill:var(--crocus)')}
    return s}
  const SCENE=[ancient,microscope,chemistry,lowering,inflammasome,guides];

  function draw(t){
    const N=vb(svg,'720 672','400 848');
    const L=N
      ? {XA:20,XB:386,yrX:8,yrY:26,hX:8,hY:46,
         sc:[6,54,388,412],A:{x:14,y:62,w:372,h:220},C:{x:14,y:292,w:372,h:170},
         LY:i=>500+i*46,bandH:26,labUp:1,lineH:16,
         axY:722,tkY:740,brY:728,ticks:[-400,600,1650,1750,1850,1950,1990,2025],
         obLX:4,obLY:764,obY:772,obMk:818,phTop:481,phBot:804,yY:838,
         o1:'urate could not be lowered',o2:'can be dissolved'}
      : {XA:150,XB:700,yrX:10,yrY:24,hX:150,hY:23,
         sc:[6,34,708,250],A:{x:16,y:40,w:416,h:238},C:{x:446,y:40,w:262,h:238},
         LY:i=>314+i*50,bandH:46,labUp:0,lineH:20,
         axY:550,tkY:568,brY:556,ticks:[-400,600,1650,1750,1850,1900,1950,1990,2010,2025],
         obLX:10,obLY:602,obY:590,obMk:636,phTop:285,phBot:622,yY:656,
         o1:'crystals known, urate could not be lowered',o2:'crystals can be dissolved'};
    XA=L.XA;XB=L.XB;
    const xp=lerp(XA,XB,t),yr=fy(t);
    let s=`<defs><linearGradient id="hiGrad" gradientUnits="userSpaceOnUse" x1="${f1(xOf(1951))}" x2="${f1(xOf(1966))}" y1="0" y2="0"><stop offset="0" style="stop-color:var(--bad)"/><stop offset="1" style="stop-color:var(--good)"/></linearGradient></defs>`;
    const done=HI_EV.filter(e=>e.y<=yr+.01),cur=done.length?done[done.length-1]:null,ph=phaseOf(steps,t);
    if(cur)s+=T(L.yrX,L.yrY,'t-big',`font-size:${N?20:18}px;fill:${HI_LANES[cur.l][1]}`,cur.d)+T(N?L.hX:L.hX,L.hY,'t-lbl','',cur.h);
    else s+=T(L.yrX,L.yrY,'t-lbl','fill:var(--muted)','Press play: the first milestone is Hippocrates');
    s+=RC(L.sc[0],L.sc[1],L.sc[2],L.sc[3],'fill:var(--field);stroke:var(--line)',12);
    s+=SCENE[ph](L.A,yr,N);
    s+=LN(N?L.C.x:L.C.x-12,N?L.C.y-6:L.A.y,N?L.C.x+L.C.w:L.C.x-12,N?L.C.y-6:L.A.y+L.A.h,'stroke:var(--line)');
    s+=T(L.C.x,L.C.y+12,'t-sm','fill:var(--ink)',HI_ERA[ph].t.toUpperCase());
    const inEra=HI_EV.filter(e=>eraOf(e.y)===ph&&e.y<=yr+.01);
    inEra.forEach((e,k)=>{const y=L.C.y+32+k*L.lineH;
      s+=`<circle cx="${L.C.x+5}" cy="${y-4}" r="4" style="fill:${HI_LANES[e.l][1]}"/>`;
      s+=`<text x="${L.C.x+16}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${e.d}</tspan>  ${e.c}</text>`});
    if(!inEra.length)s+=T(L.C.x+16,L.C.y+32,'t-xs','','the playhead has not reached this era yet');
    HI_LANES.forEach(([n,c],i)=>{const y=L.LY(i);
      s+=RC(XA-4,y-L.bandH/2,XB-XA+10,L.bandH,`fill:var(--panel-2);opacity:${i%2?.35:.7}`,8);
      s+=T(L.labUp?XA-4:10,L.labUp?y-L.bandH/2-6:y+4,'t-sm',`fill:${c}`,n);
      s+=LN(XA,y,XB,y,`stroke:${c};stroke-width:1;opacity:.35`)});
    s+=`<line x1="${XA}" x2="${XB}" y1="${L.axY}" y2="${L.axY}" class="axis" style="stroke:var(--muted)"/>`;
    L.ticks.forEach(y=>{const x=xOf(y);s+=LN(x,L.axY-4,x,L.axY+4,'stroke:var(--muted)')+T(x,L.tkY,'t-xs t-mid','',y<0?'−'+(-y):y)});
    [1650,1900,1990].forEach(y=>{const x=xOf(y);s+=`<path d="M${f1(x-4)} ${L.brY} l4 -12 M${f1(x)} ${L.brY} l4 -12" style="stroke:var(--muted);stroke-width:1"/>`});
    const gapMin=12*(XB-XA)/550,dyO=N?7:8,last={};
    HI_EV.forEach(e=>{const x=xOf(e.y),p=last[e.l];e.dy=p&&x-p.x<gapMin?(p.dy>0?-dyO:dyO):0;if(e.dy&&p&&!p.dy)p.dy=-e.dy;last[e.l]={x,dy:e.dy}});
    HI_EV.forEach(e=>{const x=xOf(e.y),y=L.LY(e.l)+e.dy,c=HI_LANES[e.l][1],pass=e.y<=yr+.01;
      if(!pass)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2;opacity:.6"/>`;
      else if(e===cur){const k=ramp(xp-x,0,26);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(8+(N?7:12)*k)}" style="fill:none;stroke:${c};stroke-width:2;opacity:${f1(.8*(1-k))}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="7" style="fill:${c};stroke:var(--ink);stroke-width:2"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:${c}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="9" class="clk" data-hy="${e.y}" style="fill:transparent"/>`});
    s+=T(L.obLX,L.obLY,'t-sm','','Outlook')+T(L.obLX+(N?62:0),L.obLY+(N?0:14),'t-xs','','qualitative');
    s+=RC(XA,L.obY,XB-XA,28,'fill:var(--panel-2)',6)+RC(XA,L.obY,Math.max(0,xp-XA),28,'fill:url(#hiGrad);opacity:.85',6);
    s+=`<clipPath id="hiClip"><rect x="${XA}" y="${L.obY}" width="${f1(Math.max(0,xp-XA))}" height="28"/></clipPath><g clip-path="url(#hiClip)">${T(XA+8,L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o1)}${T(xOf(1966)+6,L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o2)}</g>`;
    if(xp>xOf(1951))s+=LN(xOf(1951),L.obY-4,xOf(1951),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1951)-4,L.obMk,'t-xs t-end','','1951: probenecid');
    if(xp>xOf(1966))s+=LN(xOf(1966),L.obY-4,xOf(1966),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1966)+4,L.obMk,'t-xs','','1966: allopurinol');
    s+=LN(xp,L.phTop,xp,L.phBot,'stroke:var(--ink);stroke-width:1.4;opacity:.55')+`<path d="M${f1(xp-5)} ${L.axY} L${f1(xp+5)} ${L.axY} L${f1(xp)} ${L.axY-8}Z" style="fill:var(--ink)"/>`;
    s+=T(Math.min(XB-14,Math.max(XA+14,xp)),L.yY,'t-xs t-mid','fill:var(--ink)',hiFmt(yr));
    svg.innerHTML=s;
    setSt(ph);
    $('#hiRead').innerHTML=`<span>year <b>${hiFmt(yr)}</b></span><span>milestones passed <b>${done.length} of ${HI_EV.length}</b></span><span>era <b>${HI_ERA[ph].t}</b></span>`;
    $('#hiNote').innerHTML=cur?`<div class="kicker">${HI_LANES[cur.l][0]}</div>`+noteHTML({t:cur.t,txt:cur.txt,pt:cur.pt,hook:cur.hook}).replace('<div class="kicker"></div>',''):noteHTML({k:'Before 400 BCE',t:'Before the first descriptions',txt:'Podagra was described by the Egyptians in 2640 BC, long before the first Greek texts. Press play, drag the timeline, or click any dot. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>',pt:'The story starts with the big toe.'});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,26000,'Replay','history');
  const setSt=stepWire($('#hiSteps'),steps,rg,draw,stop);
  const jump=y=>{stop();const t=clamp(tOfY(y)+.002);rg.value=t;draw(t)};
  svg.addEventListener('click',e=>{const d=e.target.closest('[data-hy]');if(d)jump(+d.dataset.hy)});
  $('#hiYears').innerHTML=HI_EV.map(e=>`<button class="tag sea" data-hy2="${e.y}"><b style="font-weight:700">${e.d}</b>&nbsp;${e.h.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</button>`).join('');
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hy2]');if(b){jump(+b.dataset.hy2);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiNamesLede').innerHTML=`<p>Podagra, gout of the big toe joint, is the oldest name; the word "gout" comes from the Latin gutta, a drop. The "disease of kings" label comes from gout's link with rich food and drink that only the affluent could afford. <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup> Chiragra (the hand) and gonagra (the knee) are often listed as older regional names, but this guide could not check them against a readable scholarly source, so they are marked unverified. Renaming gout "urate crystal arthritis" made members of the public see it as less under personal control and better suited to long-term treatment. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Coleshill2021" title="Source 63">63</sup> Click a dated name to jump the timeline.</p>`;
  $('#hiChips').innerHTML=HI_NAMES.map(([n,y])=>y!=null?`<button class="tag sea" data-hn="${y}">${n}<small>${hiFmt(y)}</small></button>`:`<span class="tag">${n}</span>`).join('');
  $('#hiChips').addEventListener('click',e=>{const b=e.target.closest('[data-hn]');if(b){jump(+b.dataset.hn);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiCards').innerHTML=`
   <div class="card"><h4>Colchicum's long detour</h4><p>Used for gout by Alexander of Tralles in the 6th century, dropped for about 150 years after Sydenham rejected purgatives, revived by von Störck in 1763, isolated by Pelletier and Caventou in 1819 and named colchicine by Geiger in 1833. The isolation is often dated 1820; the history of the alkaloid gives 1819. <sup class="c" data-ref="Nuki2006,Karamanou2018" title="Source 195,296">195,296</sup> <a href="#colin" data-go="colin">Colchicine inside the cell</a></p></div>
   <div class="card"><h4>Garrod's thread</h4><p>In 1848 Garrod showed raised uric acid in the blood of people with gout, with a test often called the first clinical chemistry test. In 1859 he argued that urate deposits cause the inflammation rather than result from it. A century later, polarised light identified the crystals in gouty joint fluid. <sup class="c" data-ref="Garrod1848,Nuki2006,McCarty1961" title="Source 145,254,296">145,254,296</sup></p></div>
   <div class="card"><h4>From purine chemistry to a Nobel</h4><p>Allopurinol came out of Hitchings and Elion's work on purines. Its effectiveness in gout was reported in 1965, the FDA approved it on 19 August 1966, and Elion and Hitchings shared the 1988 Nobel Prize. It is still first-line. <sup class="c" data-ref="Elion1989,Klinenberg1965,DrugsFDA-Zyloprim,Nuki2006,FitzGerald2020" title="Source 101,106,135,211,296">101,106,135,211,296</sup></p></div>
   <div class="card"><h4>The disease of kings, and its shadow <span class="ev early">Early evidence</span></h4><p>The old image of gout as a disease of excess persists. Rheumatologists shown gout vignettes with stereotyped lifestyle profiles judged the patients more responsible and less likely to adhere to or benefit from drug treatment than identical non-gout cases. <sup class="c" data-ref="Nuki2006,Vitriol2025" title="Source 296,422">296,422</sup> <a href="#living" data-go="living">Living with gout</a></p></div>`;
  draw(+rg.value);
};

/* =============== 6.2 flashcards & mnemonics =============== */
const PARTN={1:"Part 1 · The disease",2:"Part 2 · Treating a flare",3:"Part 3 · Lowering urate",4:"Part 4 · Diagnosis & complications",5:"Part 5 · Living, care & the future",6:"Part 6 · History"};
const FC=[
 [1,"How many people had gout worldwide in 2020 (GBD modelled estimate)?","55.8 million, an age-standardised 659.3 per 100,000. The projection for 2050 is 95.8 million."],
 [1,"How common are gout and hyperuricaemia in US adults (NHANES 2015–2016)?","Gout 3.9% (about 9.2 million). Hyperuricaemia about 20% in both men and women."],
 [1,"At what serum urate is plasma saturated?","About 6.8 mg/dL (405 µmol/L) at 37 °C and physiological sodium."],
 [1,"What does a 2 °C drop (37 → 35 °C) do to urate solubility?","It falls from 6.8 to 6.0 mg/dL (in vitro). One reason the cool first MTP is a common first site."],
 [1,"Why do humans carry more urate than most mammals?","Hominoids lost uricase. A nonsense mutation at codon 33 silenced it in human, chimpanzee and orangutan, so urate (not allantoin) is the end product."],
 [1,"Which enzyme makes urate, and at which steps?","Xanthine oxidoreductase: hypoxanthine → xanthine → uric acid. It is the rate-limiting enzyme."],
 [1,"How is urate excretion split between kidney and gut?","About two thirds kidney, one third gut (radio-isotope studies)."],
 [1,"URAT1, GLUT9, ABCG2: what does each do?","URAT1 (SLC22A12): apical reabsorption, the uricosuric target. GLUT9 (SLC2A9): basolateral exit. ABCG2: secretory exporter in kidney and gut."],
 [1,"What does ABCG2 Q141K (rs2231142) do?","Cuts urate transport by 53%; gout OR 1.68 per allele; at least 10% of gout in white people."],
 [1,"What is the main mechanism of primary hyperuricaemia in gout?","Renal under-excretion of urate."],
 [1,"15-year gout incidence by baseline serum urate?","1.1% below 6 mg/dL; 49% at 10 mg/dL or more (18,889 people, four US cohorts)."],
 [1,"Name the four stages of gout (Dalbeth & Stamp 2014).","A: hyperuricaemia, no crystals. B: silent crystal deposition. C: deposition with prior or current flares. D: advanced gout (tophi, chronic arthritis, erosions)."],
 [1,"What signalling chain turns crystals into a flare?","MSU crystals → NLRP3 (NALP3) inflammasome → caspase-1 → active IL-1β (and IL-18) → neutrophil influx."],
 [1,"What helps a flare burn out on its own?","Aggregated neutrophil extracellular traps (NETs) degrade cytokines and chemokines; TGF-β1 rises as the flare resolves."],
 [2,"What is the US-labelled colchicine dose for a flare?","1.2 mg at the first sign, then 0.6 mg 1 hour later. Maximum 1.8 mg over 1 hour."],
 [2,"AGREE: responders at 24 h on low dose, high dose and placebo?","37.8% (1.8 mg), 32.7% (4.8 mg), 15.5% placebo."],
 [2,"AGREE: diarrhoea on low vs high dose colchicine?","23.0% vs 76.9% (severe in 19.2% on high dose, none on low dose)."],
 [2,"Why does the old high-dose colchicine regimen add little?","Peak plasma level barely changes: 6.2 ng/mL (1.8 mg) vs 6.8 ng/mL (4.8 mg)."],
 [2,"What is colchicine's primary mechanism?","It blocks tubulin polymerisation into microtubules, which dampens NLRP3 assembly and neutrophil migration."],
 [2,"Why might colchicine concentrate in neutrophils?","Granulocytes show no P-glycoprotein pump function, so the drug may be trapped (hypothesis). Leukocyte levels peak about 47 h after plasma."],
 [2,"First-line flare treatments in ACR 2020?","Colchicine, an NSAID or a glucocorticoid (oral, intra-articular or intramuscular). None is ranked above another."],
 [2,"CONTACT: naproxen vs low-dose colchicine?","No meaningful difference in pain over 7 days. Diarrhoea 45.9% on colchicine vs 20.0% on naproxen."],
 [2,"How is canakinumab given for gout flares in the US?","150 mg subcutaneously, with at least 12 weeks before re-treatment. Approved 25 August 2023."],
 [2,"Which antibiotic is the classic fatal colchicine interaction?","Clarithromycin (strong CYP3A4 and P-gp inhibitor). In 88 inpatients given both together, 10.2% died."],
 [2,"Should urate-lowering therapy be stopped during a flare?","No. Keep it going and treat the flare."],
 [3,"ACR 2020 strong indications for urate-lowering therapy?","≥1 subcutaneous tophus, radiographic damage from gout, or frequent flares (≥2 a year)."],
 [3,"What is the serum urate target?","Below 6 mg/dL (360 µmol/L) for everyone on ULT (ACR 2020). EULAR: below 5 mg/dL (300 µmol/L) in severe gout."],
 [3,"ACR 2020 starting doses for allopurinol and febuxostat?","Allopurinol ≤100 mg/day (lower in CKD stage ≥3, e.g. ≤50 mg/day). Febuxostat ≤40 mg/day."],
 [3,"What is allopurinol's active metabolite, and how is it cleared?","Oxypurinol (half-life about 23 h), cleared almost entirely by the kidney."],
 [3,"How long does ACR 2020 advise flare prophylaxis when starting ULT?","3–6 months rather than less than 3, continued if flares persist."],
 [3,"Why do flares rise in the first months of ULT?","Urate is mobilised from tissue deposits as crystals dissolve. It does not mean the drug is failing."],
 [3,"Who should be tested for HLA-B*58:01 before allopurinol (ACR 2020)?","People of Southeast Asian descent (e.g. Han Chinese, Korean, Thai) and African American people."],
 [3,"When does allopurinol hypersensitivity syndrome usually start?","About 90% begin within 60 days of starting allopurinol."],
 [3,"CARES (febuxostat vs allopurinol, people with CVD): result?","MACE non-inferior (HR 1.03), but CV death HR 1.34 and all-cause death HR 1.22. FDA boxed warning in 2019."],
 [3,"FAST (febuxostat vs allopurinol): result?","Non-inferior, adjusted HR 0.85. Deaths 7.2% on febuxostat vs 8.6% on allopurinol."],
 [3,"Azathioprine or mercaptopurine with xanthine oxidase inhibitors?","Febuxostat: contraindicated (US). Allopurinol: cut the thiopurine to about one-third to one-quarter of the usual dose."],
 [3,"How does pegloticase lower urate, and how is it given?","PEGylated recombinant uricase: urate → allantoin. 8 mg IV every 2 weeks with oral methotrexate 15 mg weekly (US label)."],
 [3,"What is the pegloticase stopping rule?","Check serum urate before every infusion; stop if it rises above 6 mg/dL, particularly 2 consecutive values."],
 [3,"Nurse-led treat-to-target (Doherty 2018) at 2 years?","Serum urate <360 µmol/L in 95% vs 30% with usual care; £5066 per QALY."],
 [4,"2015 ACR/EULAR criteria: entry, sufficient criterion, threshold?","Entry: ≥1 episode of peripheral joint or bursa swelling, pain or tenderness. Sufficient: MSU crystals. Otherwise ≥8 of 23 points."],
 [4,"Which two items subtract points in the 2015 criteria?","Serum urate <4 mg/dL (−4) and MSU-negative synovial fluid (−2)."],
 [4,"How well do the 2015 criteria perform?","Full criteria: sensitivity 92%, specificity 89% (AUC 0.95). Clinical-only: 85% and 78%."],
 [4,"What do MSU crystals look like under compensated polarised light?","Needle-shaped, strongly negatively birefringent; yellow when parallel to the slow axis of the compensator."],
 [4,"What do CPP crystals look like?","Rhomboid or rod-like, weakly positively birefringent; blue when parallel."],
 [4,"What is the ultrasound double-contour sign?","Hyperechoic, irregular enhancement over the surface of hyaline cartilage that does not depend on the probe angle."],
 [4,"Can serum urate be normal during a flare?","Yes. It was normal in 49% (20 of 41) in one series; 14% had ≤6 mg/dL in another."],
 [4,"Does finding crystals rule out septic arthritis?","No. 1.5–5% of crystal-positive joints are also infected."],
 [4,"Common comorbidities in US adults with gout (NHANES 2007–2008)?","Hypertension 74%, CKD stage ≥2 71%, obesity 53%, diabetes 26%, kidney stones 24%, MI 14%."],
 [4,"Did allopurinol slow kidney decline in CKD-FIX or PERL?","No. Neither trial (people without gout) found a slower fall in kidney function."],
 [4,"How does a gout flare change short-term cardiovascular risk?","Odds of a flare in the prior 0–60 days were higher before MI or stroke (OR 1.93), back to baseline by 121–180 days."],
 [4,"Which antihypertensives raise or lower gout risk?","Lower: losartan (RR 0.81), calcium channel blockers (0.87). Raise: diuretics (2.36), β-blockers, ACE inhibitors, other ARBs."],
 [5,"ACR 2020 lifestyle advice for gout?","All conditional: limit alcohol, purines and high-fructose corn syrup; weight loss if overweight; no vitamin C supplements."],
 [5,"Beer, spirits, wine: incident gout per daily serving (men)?","Beer RR 1.49, spirits 1.15, wine 1.04 (not significant)."],
 [5,"Should low-dose aspirin be stopped because of gout?","No. ACR 2020 advises against stopping it when taken for a valid reason."],
 [5,"How much does a hospital stay raise flare risk?","About tenfold (RR 10.2)."],
 [5,"The validated flare definition for people with known gout?","≥3 of 4: patient says flare; pain at rest >3/10; ≥1 swollen joint; ≥1 warm joint."],
 [5,"How many people take ≥80% of their urate-lowering therapy?","46% (meta-analysis of 13 studies)."],
 [5,"G-CAN clinical remission?","12 months with no flares, no subcutaneous tophi and serum urate <6 mg/dL (0.36 mmol/L)."],
 [5,"How long did crystals take to clear from joint fluid on urate lowering?","3 to 33 months in all 18 joints; longer with longer disease."],
 [5,"Which treatment routes actually remove urate?","Production (xanthine oxidase), excretion (URAT1) and breakdown (uricase). IL-1 and NLRP3 blockade only calm inflammation."],
 [6,"Where does the word 'gout' come from?","Latin gutta, a drop: the medieval idea of a humour dropping into a joint."],
 [6,"Who described the night-time great-toe flare in 1683?","Thomas Sydenham, in Tractatus de Podagra et Hydrope."],
 [6,"Who first saw needle-shaped crystals from a tophus, and when?","Antonie van Leeuwenhoek, 1679."],
 [6,"What did Alfred Baring Garrod show?","Raised uric acid in the blood of people with gout (1848), using his 'thread test'."],
 [6,"Who identified MSU crystals in gouty synovial fluid with polarised light?","McCarty and Hollander, 1961."],
 [6,"Who developed allopurinol?","Hitchings and Elion, who shared the 1988 Nobel Prize. Zyloprim was approved in the US on 19 August 1966."],
 [6,"When was colchicine isolated and named?","Isolated by Pelletier and Caventou in 1819; named colchicine by Geiger in 1833."],
 [6,"What did Martinon and Tschopp show in 2006?","Urate crystals activate the NALP3 (NLRP3) inflammasome, releasing active IL-1β and IL-18."]
];
const MN=[
 [`Six for gout`,`Keep serum urate below 6 mg/dL (360 µmol/L) for everyone on urate-lowering therapy <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>; below 5 mg/dL (300 µmol/L) in severe gout <sup class="c" data-ref="Richette2017" title="Source 331">331</sup>.`],
 [`Saturate at 6.8, dissolve below 6`,`Plasma is saturated at about 6.8 mg/dL <sup class="c" data-ref="Martillo2014" title="Source 249">249</sup>. A target under saturation keeps the gradient in favour of crystal dissolution <sup class="c" data-ref="Martillo2014,Richette2017" title="Source 249,331">249,331</sup>.`],
 [`Negative Needle, Positive rhomboid`,`MSU: needle, strongly negative, yellow when parallel. CPP: rhomboid, weakly positive, blue when parallel <sup class="c" data-ref="Zhang2016SciRep,Jokic2020,Rosenthal2016" title="Source 186,339,451">186,339,451</sup>.`],
 [`Start low, go slow`,`Allopurinol ≤100 mg/day (lower in CKD), raised every 2–5 weeks with a urate check after each step, to target; a lower starting dose means fewer initiation flares <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>.`],
 [`Twelve, six, stop`,`The US colchicine label: 1.2 mg, then 0.6 mg an hour later; maximum 1.8 mg in 1 hour <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>. As effective as 4.8 mg, with far less diarrhoea <sup class="c" data-ref="Terkeltaub2010" title="Source 406">406</sup>.`],
 [`Eight of twenty-three`,`2015 ACR/EULAR: ≥8 of 23 points classifies gout; crystals alone are sufficient <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>.`],
 [`Three of four`,`A flare in known gout: says it is a flare, pain at rest >3/10, a swollen joint, a warm joint <sup class="c" data-ref="Gaffo2018" title="Source 143">143</sup>.`],
 [`Check before you drip`,`Pegloticase: screen for G6PD first, check urate before every infusion, stop if it rises above 6 mg/dL <sup class="c" data-ref="FDA-Krystexxa" title="Source 122">122</sup>.`]
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','All cards'],...Object.keys(PARTN).map(k=>[k,'Part '+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=PARTN[c[0]]+' · question';$('#fcTagB').textContent=PARTN[c[0]]+' · answer';
    $('#fcFront').textContent=c[1];$('#fcBack').textContent=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',flip);$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=MN.map(m=>`<div class="card"><b class="big">${m[0]}</b><p>${m[1]}</p></div>`).join('');
};

/* =============== 6.3 quiz =============== */
const QZ=[
 [1,"In 2020, about how many people worldwide had gout (GBD modelled estimate)?",["12 million","55.8 million","120 million","27 million"],1,`55.8 million, an age-standardised 659.3 per 100,000; 95.8 million are projected for 2050 <sup class="c" data-ref="GBD2024Gout" title="Source 146">146</sup>.`],
 [1,"Plasma is saturated with urate at about:",["4.0 mg/dL","5.0 mg/dL","9.0 mg/dL","6.8 mg/dL (405 µmol/L)"],3,`About 6.8 mg/dL at 37 °C and physiological sodium <sup class="c" data-ref="Martillo2014,Loeb1972" title="Source 236,249">236,249</sup>.`],
 [1,"Cooling from 37 °C to 35 °C changes urate solubility from 6.8 mg/dL to about:",["6.0 mg/dL","7.6 mg/dL","4.0 mg/dL","No change"],0,`A 2 °C drop lowers solubility to 6.0 mg/dL in vitro, one reason the cool first MTP is a common site <sup class="c" data-ref="Martillo2014,Loeb1972" title="Source 236,249">236,249</sup>.`],
 [1,"Humans carry more urate than most mammals because:",["They eat more purines","Their kidneys filter less urate","Hominoids lost a working uricase gene","They lack xanthine oxidoreductase"],2,`A nonsense mutation at codon 33 silenced uricase in human, chimpanzee and orangutan, so urate is the end product instead of allantoin <sup class="c" data-ref="Oda2002,Chen2016" title="Source 39,297">39,297</sup>.`],
 [1,"About what share of urate leaves the body through the kidney?",["Two thirds","One tenth","One third","All of it"],0,`About two thirds through the kidney and one third through the gut <sup class="c" data-ref="Ohashi2023" title="Source 302">302</sup>.`],
 [1,"Which transporter reabsorbs urate at the apical membrane and is the target of uricosurics?",["ABCG2","GLUT9","OAT1","URAT1 (SLC22A12)"],3,`URAT1 was identified in 2002 as the renal urate–anion exchanger and is the target of uricosuric drugs <sup class="c" data-ref="Enomoto2002" title="Source 112">112</sup>.`],
 [1,"The ABCG2 Q141K variant:",["Doubles urate secretion","Causes Lesch–Nyhan syndrome","Cuts urate transport by 53%","Has no link with gout"],2,`It cuts urate transport by 53%, gives a gout OR of 1.68 per allele, and accounts for at least 10% of gout in white people <sup class="c" data-ref="Woodward2009" title="Source 432">432</sup>.`],
 [1,"Over 15 years, what share of people with baseline serum urate ≥10 mg/dL developed gout?",["About 5%","About 49%","About 20%","About 95%"],1,`1.1% at <6 mg/dL and 49% at ≥10 mg/dL, in 18,889 people from four US cohorts <sup class="c" data-ref="Dalbeth2018ARD" title="Source 82">82</sup>.`],
 [1,"Which chain is essential for a crystal-driven flare?",["NLRP3 inflammasome → caspase-1 → IL-1β","Pyrin → IL-6","TNF alone","Complement deficiency"],0,`MSU crystals activate NALP3 (NLRP3); caspase-1 releases active IL-1β and IL-18 <sup class="c" data-ref="Martinon2006" title="Source 250">250</sup>. IL-1R/MyD88 signalling on non-haematopoietic cells is essential <sup class="c" data-ref="Chen2006" title="Source 38">38</sup>.`],
 [1,"How much of the variance in serum urate do diet scores explain?",["About 25%","Over 50%","About 10%","≤0.3% each"],3,`Each diet score explained ≤0.3%, against 23.9% for common genome-wide variation <sup class="c" data-ref="Major2018" title="Source 244">244</sup>.`],
 [2,"The US-labelled colchicine dose for a gout flare is:",["0.6 mg hourly for 6 hours","2 mg once","1.2 mg, then 0.6 mg 1 hour later","0.5 mg three times daily for 10 days"],2,`Maximum 1.8 mg over 1 hour; "higher doses have not been found to be more effective" <sup class="c" data-ref="FDA-Colcrys" title="Source 117">117</sup>.`],
 [2,"In AGREE, ≥50% pain reduction at 24 h without rescue was reached by:",["37.8% low dose, 32.7% high dose, 15.5% placebo","80% in every arm","15% low dose, 38% high dose","No difference from placebo"],0,`Low dose 28/74, high dose 17/52, placebo 9/58 <sup class="c" data-ref="Terkeltaub2010" title="Source 406">406</sup>.`],
 [2,"The main advantage of low-dose over high-dose colchicine in AGREE was:",["Faster onset","It can be given IV","Lower cost","Much less diarrhoea (23.0% vs 76.9%)"],3,`Low dose had an adverse-event profile similar to placebo; high dose caused severe diarrhoea in 19.2% <sup class="c" data-ref="Terkeltaub2010" title="Source 406">406</sup>.`],
 [2,"Colchicine's primary mechanism is:",["Blocking microtubule (tubulin) polymerisation","COX-2 inhibition","IL-1 receptor blockade","Xanthine oxidase inhibition"],0,`Tubulin disruption then dampens several pathways, including the NLRP3 inflammasome and neutrophil migration <sup class="c" data-ref="Leung2015,FDA-Colcrys" title="Source 117,229">117,229</sup>.`],
 [2,"CONTACT compared naproxen with low-dose colchicine in UK primary care. It found:",["Colchicine much better for pain","Naproxen caused more diarrhoea","Similar pain relief, more diarrhoea on colchicine","Neither helped"],2,`Pain difference −0.18 over days 1–7; diarrhoea 45.9% on colchicine vs 20.0% on naproxen <sup class="c" data-ref="Roddy2020" title="Source 338">338</sup>.`],
 [2,"Prednisolone 35 mg daily for 5 days vs naproxen 500 mg twice daily:",["Prednisolone inferior","Equivalent pain relief","Naproxen inferior","Both no better than placebo"],1,`Pain fell 44.7 vs 46.0 mm after 90 h, meeting the equivalence margin <sup class="c" data-ref="Janssens2008" title="Source 179">179</sup>.`],
 [2,"For a person who cannot take anything by mouth during a flare, ACR 2020 strongly recommends:",["An IL-1 inhibitor","ACTH","No treatment","A glucocorticoid by IM, IV or intra-articular route"],3,`Glucocorticoids are strongly recommended over IL-1 inhibitors or ACTH in this setting (high certainty) <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>.`],
 [2,"In the US, canakinumab for gout flares is given as:",["Daily oral tablets","150 mg SC, at least 12 weeks before re-treatment","Weekly IV infusion","100 mg SC daily for 3 days"],1,`Approved in August 2023 for adults in whom NSAIDs and colchicine are unsuitable and repeated steroid courses are not appropriate <sup class="c" data-ref="IlarisPIG,FDA-IlarisGout2023" title="Source 121,175">121,175</sup>.`],
 [2,"Which drug is the classic dangerous colchicine interaction?",["Clarithromycin","Azithromycin","Paracetamol","Amoxicillin"],0,`Clarithromycin raised colchicine AUC by 282%, and 10.2% of inpatients given both together died <sup class="c" data-ref="FDA-Colcrys,Hung2005" title="Source 117,172">117,172</sup>. Azithromycin needs no dose adjustment <sup class="c" data-ref="Terkeltaub2011" title="Source 407">407</sup>.`],
 [2,"During a flare, a person already taking allopurinol should:",["Stop it until the flare settles","Double the dose","Keep taking it","Switch to febuxostat"],2,`Continue established urate-lowering therapy without interruption during a flare <sup class="c" data-ref="Khanna2012P2,FDA-Allopurinol" title="Source 115,203">115,203</sup>.`],
 [3,"ACR 2020 strongly recommends starting urate-lowering therapy for:",["A first flare with normal kidneys","Asymptomatic hyperuricaemia","Anyone over 60","≥1 tophus, radiographic damage or ≥2 flares a year"],3,`These are the three strong indications <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>.`],
 [3,"The ACR 2020 serum urate target for everyone on ULT is:",["<6 mg/dL (360 µmol/L)","<7 mg/dL","<4 mg/dL","There is no target"],0,`Treat-to-target with a target <6 mg/dL is strongly recommended (high certainty) <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>. EULAR adds <5 mg/dL in severe gout <sup class="c" data-ref="Richette2017" title="Source 331">331</sup>.`],
 [3,"ACR 2020 advises starting allopurinol at:",["300 mg/day","≤100 mg/day, lower in CKD stage ≥3","600 mg/day","The full target dose at once"],1,`Start ≤100 mg/day, with ≤50 mg/day considered in CKD; febuxostat ≤40 mg/day <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>.`],
 [3,"Kidney disease raises allopurinol exposure mainly because:",["Allopurinol is cleared by the liver","Food blocks its absorption","It binds albumin tightly","Its active metabolite oxypurinol is cleared by the kidney"],3,`Oxypurinol has a half-life of about 23 h and is cleared almost entirely in the urine <sup class="c" data-ref="Day2007,Hande1984" title="Source 87,154">87,154</sup>.`],
 [3,"ACR 2020 recommends anti-inflammatory prophylaxis when starting ULT for:",["1 week","Lifelong","3–6 months","Not at all"],2,`3–6 months rather than less than 3 months, continued if flares persist <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>.`],
 [3,"ACR 2020 advises HLA-B*58:01 testing before allopurinol in:",["People of Southeast Asian descent and African American people","Everyone","White Europeans only","Children only"],0,`Carriage is about 7.4% in Han Chinese, Korean and Thai people and 3.8% in African Americans <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>. CPIC contraindicates allopurinol in carriers <sup class="c" data-ref="CPIC-HLAB-Allopurinol" title="Source 64">64</sup>.`],
 [3,"About what share of allopurinol hypersensitivity syndrome begins within 60 days of starting?",["10%","50%","90%","Almost none"],2,`About 90% (489 of 538) in a series of 901 cases <sup class="c" data-ref="Ramasamy2013" title="Source 326">326</sup>.`],
 [3,"In CARES (febuxostat vs allopurinol in gout with CVD):",["Febuxostat was inferior for MACE","MACE was non-inferior, but CV death was higher (HR 1.34)","Febuxostat reduced deaths","The trial stopped early for benefit"],1,`All-cause death HR 1.22; the FDA added a boxed warning in 2019 <sup class="c" data-ref="White2018,FDA-Uloric" title="Source 127,431">127,431</sup>.`],
 [3,"FAST (febuxostat vs allopurinol, age ≥60 with CV risk) found:",["Febuxostat doubled CV death","Allopurinol was inferior","No primary result","Non-inferiority, adjusted HR 0.85"],3,`Deaths were 7.2% on febuxostat vs 8.6% on allopurinol <sup class="c" data-ref="Mackenzie2020" title="Source 241">241</sup>.`],
 [3,"Azathioprine with febuxostat is, per the US label:",["Contraindicated","Safe at usual doses","Recommended","Fine if the dose is doubled"],0,`Xanthine oxidase inactivates thiopurines; with allopurinol the US label cuts them to one-third to one-quarter <sup class="c" data-ref="FDA-Uloric,FDA-Zyloprim" title="Source 127,129">127,129</sup>.`],
 [3,"The pegloticase stopping rule is:",["Stop after 3 infusions","Stop if serum urate falls below 2 mg/dL","Stop if pre-infusion serum urate rises above 6 mg/dL, especially twice in a row","Never stop"],2,`Loss of response comes before most infusion reactions, so pre-infusion urate is the warning sign <sup class="c" data-ref="FDA-Krystexxa,Lipsky2014" title="Source 122,233">122,233</sup>.`],
 [3,"Nurse-led treat-to-target (Doherty 2018): serum urate <360 µmol/L at 2 years?",["50% vs 45%","95% vs 30%","30% vs 95%","100% vs 0%"],1,`95% with nurse-led care vs 30% with usual GP care (RR 3.18), at £5066 per QALY <sup class="c" data-ref="Doherty2018" title="Source 95">95</sup>.`],
 [4,"The sufficient criterion in the 2015 ACR/EULAR gout criteria is:",["Serum urate ≥10 mg/dL","Podagra","MSU crystals in a symptomatic joint, bursa or tophus","A double-contour sign"],2,`Crystals classify as gout with no scoring needed <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>.`],
 [4,"Without crystals, gout is classified at a score of:",["≥8 of 23","≥4 of 10","≥6 of 15","≥10 of 30"],0,`Maximum 23; ≥8 classifies as gout <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>.`],
 [4,"Which item subtracts 4 points?",["MSU-negative synovial fluid","Serum urate <4 mg/dL","No imaging done","Polyarticular onset"],1,`Urate <4 mg/dL scores −4 and MSU-negative fluid −2; imaging not done scores 0 <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>.`],
 [4,"The full 2015 criteria had sensitivity and specificity of:",["100% and 51%","70% and 95%","85% and 78%","92% and 89%"],3,`AUC 0.95 in the SUGAR validation set; 85% and 78% is the clinical-only version <sup class="c" data-ref="Neogi2015" title="Source 290">290</sup>.`],
 [4,"Under compensated polarised light, MSU crystals parallel to the slow axis look:",["Yellow and needle-shaped","Blue and rhomboid","Green and round","Invisible"],0,`MSU crystals are strongly negatively birefringent; CPP crystals are weakly positive and blue when parallel <sup class="c" data-ref="Zhang2016SciRep,Jokic2020" title="Source 186,451">186,451</sup>.`],
 [4,"In one series, serum urate was normal during the flare in:",["None","About 10%","49%","All"],2,`20 of 41 people; mean 7.5 mg/dL during flares vs 8.5 between flares <sup class="c" data-ref="Urano2002" title="Source 416">416</sup>.`],
 [4,"Joint-level DECT sensitivity in gout of 6 weeks or less was:",["0.95","0.55","0.85","0.25"],1,`DECT can miss early gout <sup class="c" data-ref="Gamala2019" title="Source 144">144</sup>.`],
 [4,"Crystals are seen in a hot joint aspirate. Infection:",["Is excluded","Can coexist in about 1.5–5% of crystal-positive joints","Is always present","Only occurs in CPPD"],1,`Crystals do not exclude infection; culture the fluid <sup class="c" data-ref="Shah2007,Papanicolas2012" title="Source 305,363">305,363</sup>.`],
 [4,"In NHANES 2007–2008, the most common comorbidity in people with gout was:",["Stroke (10%)","Heart failure (11%)","Diabetes (26%)","Hypertension (74%)"],3,`CKD stage ≥2 was 71% and obesity 53% <sup class="c" data-ref="Zhu2012" title="Source 454">454</sup>.`],
 [4,"In CKD-FIX (stage 3–4 CKD without gout), allopurinol:",["Halved eGFR decline","Did not slow eGFR decline","Caused kidney failure","Was not tested"],1,`eGFR change −3.33 vs −3.23 mL/min/1.73 m² per year (P = 0.85) <sup class="c" data-ref="Badve2020" title="Source 11">11</sup>.`],
 [4,"Which antihypertensive is linked to lower gout risk?",["Thiazide diuretic","β-blocker","Losartan","ACE inhibitor"],2,`Losartan RR 0.81 and calcium channel blockers 0.87; diuretics 2.36 <sup class="c" data-ref="Choi2012BMJ" title="Source 57">57</sup>.`],
 [5,"ACR 2020 on vitamin C supplements for gout:",["Strongly recommends them","Conditionally recommends against them","Recommends 2 g daily","Makes no statement"],1,`Two small RCTs showed clinically insignificant urate changes <sup class="c" data-ref="FitzGerald2020" title="Source 135">135</sup>.`],
 [5,"Per daily serving, which drink had the highest risk of incident gout in men?",["Wine","Spirits","Diet soda","Beer"],3,`Beer RR 1.49, spirits 1.15, wine 1.04 (not significant) <sup class="c" data-ref="Choi2004Lancet" title="Source 46">46</sup>.`],
 [5,"Low-dose aspirin taken for a valid reason should, per ACR 2020:",["Not be stopped because of gout","Be stopped at once","Be doubled","Be swapped for fenofibrate"],0,`It is linked to flares (OR 1.81), but ACR 2020 advises against stopping it <sup class="c" data-ref="Zhang2014,FitzGerald2020" title="Source 135,450">135,450</sup>.`],
 [5,"Being in hospital raises flare risk about:",["Twofold","Tenfold","Not at all","Halves it"],1,`RR 10.2; an in-hospital flare lengthened the stay by 1.8 days <sup class="c" data-ref="Zleik2018" title="Source 456">456</sup>.`],
 [5,"The validated flare definition needs how many of its 4 items?",["1","2","3","4"],2,`Patient says flare, pain at rest >3/10, a swollen joint, a warm joint: sensitivity 85%, specificity 95% <sup class="c" data-ref="Gaffo2018" title="Source 143">143</sup>.`],
 [5,"Across 13 studies, what share took at least 80% of their urate-lowering therapy?",["46%","90%","20%","75%"],0,`Non-persistence ranged from 54% to 87% <sup class="c" data-ref="Scheepers2018SAR" title="Source 352">352</sup>.`],
 [5,"G-CAN clinical remission requires, over 12 months:",["Normal kidney function","No crystals on DECT","Serum urate <4 mg/dL only","No flares, no tophi and serum urate <6 mg/dL"],3,`It is "clinical" because no domain measures complete crystal dissolution <sup class="c" data-ref="TabiAmponsah2026" title="Source 393">393</sup>.`],
 [5,"Which approach treats flares but does not remove urate crystals?",["Xanthine oxidase inhibition","URAT1 inhibition","IL-1 or NLRP3 blockade","Uricase"],2,`Only lowering urate dissolves the deposit <sup class="c" data-ref="Dalbeth2019NRDP,Dalbeth2021" title="Source 84,85">84,85</sup>.`],
 [5,"In the UK, what share of people newly diagnosed with gout started ULT within 12 months?",["About 90%","27.3%","60%","5%"],1,`18.6% within 6 months and 27.3% within 12 months <sup class="c" data-ref="Kuo2015" title="Source 222">222</sup>.`],
 [6,"The word 'gout' comes from Latin gutta, meaning:",["A drop","A stone","The foot","A king"],0,`After the medieval idea of a humour dropping into a joint <sup class="c" data-ref="Nuki2006" title="Source 296">296</sup>.`],
 [6,"Who identified MSU crystals in gouty synovial fluid with compensated polarised light in 1961?",["Garrod","Sydenham","McCarty and Hollander","Hitchings and Elion"],2,`Freudweiler's 1899 crystal-injection work had been overlooked until then <sup class="c" data-ref="McCarty1961,Nuki2006" title="Source 254,296">254,296</sup>.`],
 [6,"Allopurinol came out of the purine research of:",["Pelletier and Caventou","Hitchings and Elion","Martinon and Tschopp","Scheele and Wollaston"],1,`They shared the 1988 Nobel Prize; Zyloprim was approved in the US in 1966 <sup class="c" data-ref="Elion1989,DrugsFDA-Zyloprim" title="Source 101,106">101,106</sup>.`],
 [6,"Garrod's 1848 work showed:",["Crystals under polarised light","Colchicine's structure","The NLRP3 inflammasome","Raised uric acid in the blood of people with gout"],3,`He devised the "thread test", called the first clinical chemistry test <sup class="c" data-ref="Garrod1848,Nuki2006" title="Source 145,296">145,296</sup>.`],
 [6,"Who described needle-shaped crystals from a tophus in 1679?",["Galen","Hippocrates","Antonie van Leeuwenhoek","Thomas Sydenham"],2,`He did not know what they were made of <sup class="c" data-ref="McCarty1970,Nuki2006" title="Source 255,296">255,296</sup>.`],
 [6,"Martinon and Tschopp (2006) showed that urate crystals:",["Activate the NALP3 inflammasome","Are dissolved by colchicine","Block xanthine oxidase","Are positively birefringent"],0,`Releasing active IL-1β and IL-18 <sup class="c" data-ref="Martinon2006" title="Source 250">250</sup>.`]
];
inits.quiz=()=>{
  const F=[['mix','Mixed (20)'],...Object.keys(PARTN).map(k=>[k,'Part '+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">Finished</div><div class="q">You scored ${score} / ${list.length} (${pct}%)</div><p>${pct>=85?'Excellent work.':pct>=65?'Solid. Review the ones you missed below.':'Worth another pass through the modules, then try again.'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">Try again</button><button class="btn" data-go="review">Go to flashcards</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>question <b>${i+1} / ${list.length}</b></span><span>score <b>${score}</b></span><span>${PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?'Correct.':'Not quite.'}</b> ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?'Next question →':'See results'}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};

/* =============== 6.4 glossary =============== */
const GL=[
 ["ABCG2","A high-capacity urate exporter in the kidney's proximal tubule, the gut wall and the liver. Common variants that weaken it (such as Q141K) raise urate and gout risk.","urate"],
 ["ACR/EULAR 2015 criteria","Gout classification criteria: an entry criterion, MSU crystals as a sufficient criterion, otherwise a score of ≥8 of 23 points across clinical, laboratory and imaging domains.","dx"],
 ["Adherence","Taking a medicine as prescribed. Often measured as taking ≥80% of doses; low for urate-lowering therapy.","nursing"],
 ["AGREE trial","The randomised trial showing low-dose colchicine (1.8 mg over 1 hour) works as well as high-dose (4.8 mg over 6 hours) with far less diarrhoea.","flarerx"],
 ["Allantoin","The product of urate breakdown by uricase; about 100 times more water-soluble than uric acid.","urate"],
 ["Allopurinol","A purine-analogue xanthine oxidase inhibitor; first-line urate-lowering therapy, started low and titrated to target.","ult"],
 ["Allopurinol hypersensitivity syndrome (AHS)","A rare, severe reaction to allopurinol with rash, fever and organ involvement; about 90% begin within 60 days.","ultsafety"],
 ["Anakinra","An IL-1 receptor antagonist injected daily; used off-label for flares when standard treatments are unsuitable.","flarerx"],
 ["Anti-drug antibodies","Antibodies the body makes against a biologic drug, such as pegloticase; they speed clearance and cause loss of response and infusion reactions.","ultsafety"],
 ["Asymptomatic hyperuricaemia","High serum urate with no flare or tophus. ACR 2020 advises against urate-lowering drugs for it.","what"],
 ["Benzbromarone","A potent uricosuric that blocks URAT1; withdrawn by its original maker in 2003 over liver toxicity, still marketed in some countries.","ult"],
 ["Canakinumab","A monoclonal antibody against IL-1β; given as a single 150 mg injection for flares when other treatments are unsuitable.","flarerx"],
 ["CARES trial","A trial of febuxostat vs allopurinol in people with gout and cardiovascular disease; MACE was non-inferior but CV death was higher on febuxostat.","ultsafety"],
 ["Caspase-1","The enzyme activated by the inflammasome that cuts pro-IL-1β into its active form.","flare"],
 ["Chondrocalcinosis","Calcification of cartilage seen on imaging; a hallmark of CPP crystal deposition.","ddx"],
 ["Chronic gouty arthritis","Persistent joint inflammation caused by MSU crystals. G-CAN advises against the vaguer term \"chronic gout\".","what"],
 ["CKD","Chronic kidney disease: lasting loss of kidney function, graded in stages 1–5 by eGFR. It raises urate and travels with gout.","links"],
 ["Clinical remission","For gout (G-CAN): 12 months with no flares, no subcutaneous tophi and serum urate <6 mg/dL.","cure"],
 ["Colchicine","An anti-inflammatory drug from the autumn crocus that blocks microtubule assembly; used to treat and prevent flares.","colin"],
 ["Colchicine myopathy","Muscle weakness with a raised CK from colchicine build-up, usually when kidney function is reduced or with interacting drugs.","coldose"],
 ["Colchicum autumnale","The autumn crocus, the plant source of colchicine.","history"],
 ["Compensated polarised light microscopy","Microscopy with a red retardation plate that shows crystal birefringence and colour; the reference test for gout.","dx"],
 ["CPP crystals","Calcium pyrophosphate crystals: rhomboid or rod-like and weakly positively birefringent; they cause CPPD.","ddx"],
 ["CPPD","Calcium pyrophosphate deposition disease, which can cause acute arthritis (formerly pseudogout), often in the knee or wrist of older people.","ddx"],
 ["Crowned dens syndrome","CPP deposition around the top of the spine (the dens) causing acute neck pain; a sufficient criterion for CPPD.","ddx"],
 ["CYP3A4","A liver and gut enzyme that breaks down colchicine and many other drugs; strong inhibitors raise colchicine levels sharply.","coldose"],
 ["DASH diet","Dietary Approaches to Stop Hypertension: fruit, vegetables, low-fat dairy, less red meat and sugar. Linked with lower urate and less gout.","living"],
 ["DECT","Dual-energy CT, which colour-codes urate deposits by their X-ray behaviour at two energies; can miss very early gout.","dx"],
 ["Dotinurad","A selective URAT1 inhibitor approved in Japan in 2020 and in trials elsewhere.","cure"],
 ["Double-contour sign","On ultrasound, a bright irregular line over the cartilage surface from urate crystals, independent of probe angle.","dx"],
 ["FAST trial","A European trial of febuxostat vs allopurinol in people aged 60 or more with CV risk; febuxostat was non-inferior with no excess deaths.","ultsafety"],
 ["Febuxostat","A non-purine selective xanthine oxidase inhibitor; in the US now used after allopurinol fails or is unsuitable.","ult"],
 ["FEUA","Fractional excretion of urate: the share of filtered urate that ends up in urine, normally 5–15%.","urate"],
 ["G-CAN","The Gout, Hyperuricemia and Crystal-Associated Disease Network, which sets shared definitions such as flare and remission.","cure"],
 ["G6PD deficiency","An inherited red-cell enzyme deficiency; pegloticase can cause haemolysis and methaemoglobinaemia in it, so screening comes first.","ultsafety"],
 ["Gasdermin D","A protein cut by caspase-1 whose fragment forms membrane pores, letting IL-1β out and driving pyroptosis.","flare"],
 ["Glucocorticoid","A steroid medicine such as prednisolone; given by mouth, into a joint or by injection to treat flares.","flarerx"],
 ["GLUT9 (SLC2A9)","A urate transporter that carries reabsorbed urate out of kidney tubule cells into the blood; common variants affect serum urate.","urate"],
 ["Gout","A chronic disease of monosodium urate crystal deposition that shows itself as flares, tophi and joint damage.","what"],
 ["Gout flare","A clinically evident episode of acute inflammation induced by MSU crystals.","flare"],
 ["Gout Impact Scale","A gout-specific questionnaire with five 0–100 scales (higher is worse) for patient-reported impact.","nursing"],
 ["HAQ-DI","Health Assessment Questionnaire Disability Index, a measure of physical function used in gout studies.","nursing"],
 ["High-fructose corn syrup","A sweetener in many soft drinks; fructose raises serum urate within hours.","living"],
 ["HLA-B*58:01","A tissue-type gene variant that strongly predicts severe allergic reactions to allopurinol; commoner in some Asian and African populations.","ultsafety"],
 ["HPRT deficiency","Loss of the purine-recycling enzyme hypoxanthine-guanine phosphoribosyltransferase; causes urate overproduction, and in its severe form Lesch–Nyhan syndrome.","urate"],
 ["Hyperuricaemia","Serum urate above the saturation point (about 6.8 mg/dL [405 µmol/L]); necessary for gout but not enough on its own.","what"],
 ["IL-1β","Interleukin-1 beta, the main inflammatory signal of a gout flare, released after inflammasome activation.","flare"],
 ["Inflammasome","A protein complex inside immune cells that senses danger and activates caspase-1; NLRP3 is the one triggered by urate crystals.","flare"],
 ["Initiation flare","A flare in the first months of urate-lowering therapy, as falling urate mobilises crystals; prevented by prophylaxis.","t2t"],
 ["Intercritical gout","The symptom-free period between gout flares; crystals are often still present in the joint.","what"],
 ["Janssens rule","A primary-care score (also called the Nijmegen rule) using seven items to estimate the chance that a monoarthritis is gout.","dx"],
 ["Lesinurad","A URAT1 inhibitor approved in 2015 for use with a xanthine oxidase inhibitor; later withdrawn from the market.","ult"],
 ["Losartan","An angiotensin-receptor blocker that also increases urate excretion; preferred for blood pressure in gout when feasible.","links"],
 ["MACE","Major adverse cardiovascular events: a combined trial end point that usually includes CV death, MI and stroke.","links"],
 ["Medication-in-pocket","Keeping flare treatment at home to take at the first warning signs, as the ACR 2020 Patient Panel preferred.","living"],
 ["Mendelian randomisation","A genetic method that uses inherited variants to test whether a risk factor causes an outcome; it does not support urate causing CKD or heart disease.","links"],
 ["Metabolic syndrome","A cluster of central obesity, high blood pressure, high glucose and abnormal lipids; present in 62.8% of US adults with gout in one survey.","links"],
 ["Monosodium urate (MSU)","The salt urate forms with sodium; it crystallises as the needle-shaped crystals of gout.","crystals"],
 ["Nephrolithiasis","Kidney stones. Gout raises the risk of both uric acid and calcium stones.","links"],
 ["NETs","Neutrophil extracellular traps: webs of DNA and proteins released by neutrophils; when aggregated they degrade cytokines and help end a flare.","flare"],
 ["Neutrophil","The white blood cell that floods a gouty joint; colchicine dampens its migration.","flare"],
 ["NLRP3","The inflammasome sensor (also called NALP3) activated by urate crystals.","flare"],
 ["NSAID","Non-steroidal anti-inflammatory drug, such as naproxen; first-line for flares when no contraindication applies.","flarerx"],
 ["Nucleation","The first step of crystal formation, when dissolved urate begins to form a solid seed.","crystals"],
 ["Nurse-led care","Care in which trained nurses educate, share decisions and titrate urate-lowering therapy to target.","nursing"],
 ["Oxypurinol","Allopurinol's active metabolite (also oxipurinol); long-lived and cleared by the kidney.","ult"],
 ["P-glycoprotein (P-gp)","A pump that pushes drugs such as colchicine out of cells; drugs that block it raise colchicine levels.","colin"],
 ["Pegloticase","A PEGylated recombinant uricase given by IV infusion; converts urate to allantoin in refractory gout.","ult"],
 ["Podagra","A gout flare at the first metatarsophalangeal (big-toe) joint.","what"],
 ["Probenecid","An older uricosuric drug that increases urate excretion in the urine.","ult"],
 ["Prophylaxis","Low-dose anti-inflammatory treatment (colchicine, an NSAID or prednisone) given to prevent flares when starting urate-lowering therapy.","t2t"],
 ["Purines","Building blocks of DNA, RNA and energy molecules, from cell turnover and food; their breakdown makes urate.","urate"],
 ["Saturation","The concentration above which urate can no longer stay dissolved: about 6.8 mg/dL (405 µmol/L) in plasma at 37 °C.","crystals"],
 ["Septic arthritis","A bacterial joint infection that can mimic, or coexist with, a gout flare; joint aspiration and culture are key.","ddx"],
 ["SGLT2 inhibitors","Diabetes and heart-failure drugs that increase urinary urate loss; linked with lower urate and fewer gout flares.","links"],
 ["SJS/TEN","Stevens–Johnson syndrome and toxic epidermal necrolysis, severe skin reactions; allopurinol is a leading cause.","ultsafety"],
 ["Synovial fluid","The fluid inside a joint; aspirated to look for crystals, count white cells and culture for infection.","dx"],
 ["Thiazide diuretic","A water pill such as hydrochlorothiazide that raises urate; ACR 2020 suggests switching it when feasible.","links"],
 ["Thread test","Garrod's 1848 test in which uric acid crystallised on a thread in acidified serum; called the first clinical chemistry test.","history"],
 ["Tophus","A deposit of MSU crystals with surrounding inflammatory tissue, felt as a firm, chalky lump under the skin or in bone.","what"],
 ["Treat to target","Raising the urate-lowering dose step by step, with blood tests, until serum urate is below the target.","t2t"],
 ["Tubulin","The protein building block of microtubules; colchicine binds it and stops microtubule assembly.","colin"],
 ["URAT1 (SLC22A12)","The main apical transporter that reabsorbs urate from the kidney tubule; the target of uricosurics.","urate"],
 ["Urate-lowering therapy (ULT)","Long-term medicine that lowers serum urate so crystals dissolve: xanthine oxidase inhibitors, uricosurics or uricase.","ult"],
 ["Uricase","Urate oxidase, the enzyme most mammals use to break urate down to allantoin; humans lack a working copy.","urate"],
 ["Uricosuric","A drug that increases urate excretion in the urine, usually by blocking URAT1.","ult"],
 ["Xanthine oxidase inhibitor","A drug, such as allopurinol or febuxostat, that blocks urate production.","ult"],
 ["Xanthine oxidoreductase","The enzyme that converts hypoxanthine to xanthine and xanthine to uric acid; xanthine oxidase is one of its forms.","urate"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  function render(){const q=inp.value.trim().toLowerCase();const L=GL.filter(g=>!q||g[0].toLowerCase().includes(q)||g[1].toLowerCase().includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GL.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const AREAN={A:'Epidemiology, risk factors & history',B:'Diagnosis, classification & imaging',C:'Urate biology & crystal inflammation',D:'Treating a flare & colchicine',E:'Urate-lowering therapy & treat-to-target',F:'Kidney & cardiovascular links',G:'Living with gout & nursing care',H:'Research & toward a cure'};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','All']].concat(Object.entries(AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l.replace(/&/g,'&amp;')}</button>`).join('');
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||s.areas.includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q));if(!show)return'';n++;
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${s.link?`<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${s.areas.map(a=>`<span class="tag sea">${esc(AREAN[a]||a)}</span>`).join('')}${s.unverified?'<span class="tag warn">check</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`${n} of ${SOURCES.length} sources`}
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
