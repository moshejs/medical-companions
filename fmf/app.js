(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('fmfc:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('fmfc:'+k,JSON.stringify(v))}catch(e){}}};
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
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What FMF is',g:1,n:'1.1',d:'Who gets it, the numbers, what an attack looks like'},
 {id:'gene',t:'The gene & inheritance',g:1,n:'1.2',d:'MEFV, pyrin, variants, an animated Punnett square'},
 {id:'mech',t:'Pyrin, animated',g:1,n:'1.3',d:'The RhoA guard, the inflammasome, normal vs M694V'},
 {id:'attack',t:'An attack, hour by hour',g:1,n:'1.4',d:'72 hours of fever, CRP and SAA, site by site'},
 {id:'colin',t:'Colchicine inside the cell',g:2,n:'2.1',d:'From pill to neutrophil to microtubule to pyrin'},
 {id:'colmonths',t:'Colchicine over months',g:2,n:'2.2',d:'Why the benefit builds slowly, and what it prevents'},
 {id:'coldose',t:'Dosing, safety, interactions',g:2,n:'2.3',d:'What the guidelines say, toxicity and monitoring'},
 {id:'amyloid',t:'AA amyloidosis',g:3,n:'3.1',d:'SAA to fibril to kidney, over years'},
 {id:'dx',t:'Diagnosis & criteria',g:3,n:'3.2',d:'Tel Hashomer, Livneh, Eurofever/PRINTO calculator'},
 {id:'ddx',t:'The differential',g:3,n:'3.3',d:'TRAPS, MKD, CAPS, PFAPA, Behçet and the surgical abdomen'},
 {id:'ladder',t:'The treatment ladder',g:4,n:'4.1',d:'Colchicine first, then IL-1 blockade (CLUSTER)'},
 {id:'living',t:'Living with FMF',g:4,n:'4.2',d:'Pregnancy, surgery, school, triggers, monitoring'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.3',d:'Assessment, giving the medicines, teaching, documentation'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.4',d:'What would have to happen, and the evidence for each route'},
 {id:'history',t:'History & people',g:5,n:'5.1',d:'1908 to the pyrin–RhoA discovery'},
 {id:'review',t:'Flashcards & mnemonics',g:5,n:'5.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Colchicine','g-colch','c-colch'],3:['Complications & diagnosis','g-dz','c-dz'],4:['Treatment & the future','g-sea','c-sea'],5:['Context & review','g-sea','c-sea']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('fmfc:tab');sessionStorage.setItem('fmfc:tab','1')}catch(e){}
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
const SOURCES=[{"key": "Adwan2015", "text": "Adwan MH. A brief history of familial Mediterranean fever. Saudi Med J. 2015;36(9):1126-1127. PMID 26318474; PMCID PMC4613641; doi:10.15537/smj.2015.9.12219", "link": "https://doi.org/10.15537/smj.2015.9.12219", "areas": ["A"], "unverified": false}, {"key": "Akar2012", "text": "Akar S, Yuksel F, Tunca M, Soysal O, Solmaz D, Gerdan V, Celik A, Sen G, Onen F, Akkoc N. Familial Mediterranean fever: risk factors, causes of death, and prognosis in the colchicine era. Medicine (Baltimore). 2012;91(3):131-136. PMID 22543627. DOI 10.1097/MD.0b013e3182561a45.", "link": "https://doi.org/10.1097/MD.0b013e3182561a45", "areas": ["E"], "unverified": false}, {"key": "Aksentijevich1999", "text": "Aksentijevich I, Torosyan Y, Samuels J, et al. Mutation and haplotype studies of familial Mediterranean fever reveal new ancestral relationships and evidence for a high carrier frequency with reduced penetrance in the Ashkenazi Jewish population. Am J Hum Genet. 1999;64:949-962. PMID 10090880; doi:10.1086/302327", "link": "https://doi.org/10.1086/302327", "areas": ["A", "B"], "unverified": false}, {"key": "Anderson2005", "text": "Anderson KE, Bloomer JR, Bonkovsky HL, et al. Recommendations for the diagnosis and treatment of the acute porphyrias. Ann Intern Med. 2005;142(6):439–450. PMID 15767622. doi:10.7326/0003-4819-142-6-200503150-00010", "link": "https://doi.org/10.7326/0003-4819-142-6-200503150-00010", "areas": ["B"], "unverified": false}, {"key": "ArcalystPI", "text": "ARCALYST (rilonacept) injection, for subcutaneous use, US prescribing information (Kiniksa), revised 10/2025. DailyMed setid ad965f38-dd22-4607-a673-2fb92f3b527a; current label version 16 Dec 2025. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad965f38-dd22-4607-a673-2fb92f3b527a", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad965f38-dd22-4607-a673-2fb92f3b527a", "areas": ["G"], "unverified": false}, {"key": "ARUP2023", "text": "ARUP Laboratories. Familial Mediterranean Fever (MEFV) Sequencing, test 3004434: test fact sheet (last literature review Oct 2021; updated Sep 2023). https://ltd.aruplab.com/api/ltd/pdf/219", "link": "https://ltd.aruplab.com/api/ltd/pdf/219", "areas": ["B"], "unverified": false}, {"key": "AutoinflammatoryAlliance", "text": "Autoinflammatory Alliance (US 501(c)(3) nonprofit). https://www.autoinflammatory.org (Description drawn from third-party listings; the organisation's own site was not fetched.)", "link": "https://www.autoinflammatory.org", "areas": ["E", "G"], "unverified": false}, {"key": "BEAM101", "text": "Beam Therapeutics. BEACON Phase 1/2 study of BEAM-101, autologous base-edited CD34+ hematopoietic stem cells, in sickle cell disease. ASH 2024 abstract 204888 and EHA 2025 data update; ClinicalTrials.gov NCT05456880. https://ash.confex.com/ash/2024/webprogram/Paper204888.html (company-presented, not peer-reviewed as a full paper)", "link": "https://ash.confex.com/ash/2024/webprogram/Paper204888.html", "areas": ["F"], "unverified": false}, {"key": "BenChetrit1996", "text": "Ben-Chetrit E, Scherrmann JM, Levy M. Colchicine in breast milk of patients with familial Mediterranean fever. Arthritis Rheum. 1996;39(7):1213–1217. PMID 8670333. doi:10.1002/art.1780390721.", "link": "https://doi.org/10.1002/art.1780390721", "areas": ["D"], "unverified": false}, {"key": "BenChetrit1998ARD", "text": "Ben-Chetrit E, Backenroth R, Haimov-Kochman R, Pizov G. Azoospermia in familial Mediterranean fever patients: the role of colchicine and amyloidosis. Ann Rheum Dis. 1998;57(4):259–260. PMID 9709191. PMCID PMC1752571. doi:10.1136/ard.57.4.259. (Testicular-biopsy detail taken from BenChetrit2018Textbook; letter text not opened.)", "link": "https://doi.org/10.1136/ard.57.4.259", "areas": ["D"], "unverified": false}, {"key": "BenChetrit1998MH", "text": "Ben-Chetrit E, Levy M. Does the lack of the P-glycoprotein efflux pump in neutrophils explain the efficacy of colchicine in familial Mediterranean fever and other inflammatory diseases? Med Hypotheses. 1998;51(5):377–380. PMID 9848464. doi:10.1016/S0306-9877(98)90031-7.", "link": "https://doi.org/10.1016/S0306-9877(98", "areas": ["D"], "unverified": false}, {"key": "BenChetrit2004", "text": "Ben-Chetrit E, Berkun Y, Ben-Chetrit E, Ben-Chetrit A. The outcome of pregnancy in the wives of men with familial Mediterranean fever treated with colchicine. Semin Arthritis Rheum. 2004;34(2):549-552. PMID 15505771. DOI 10.1016/j.semarthrit.2004.07.004.", "link": "https://doi.org/10.1016/j.semarthrit.2004.07.004", "areas": ["E"], "unverified": false}, {"key": "BenChetrit2009", "text": "Ben-Chetrit E, Touitou I. Familial Mediterranean fever in the world. Arthritis Rheum. 2009;61(10):1447-1453. PMID 19790133; doi:10.1002/art.24458 (no abstract; content cited via Tufan2020)", "link": "https://doi.org/10.1002/art.24458", "areas": ["A"], "unverified": false}, {"key": "BenChetrit2009D", "text": "Ben-Chetrit E, Aamar S. About colchicine compliance, resistance and virulence. Clin Exp Rheumatol. 2009;27(2 Suppl 53):S1–S3. PMID 19796522.", "link": "https://pubmed.ncbi.nlm.nih.gov/19796522/", "areas": ["D"], "unverified": false}, {"key": "BenChetrit2010", "text": "Ben-Chetrit E, Ben-Chetrit A, Berkun Y, Ben-Chetrit E. Pregnancy outcomes in women with familial Mediterranean fever receiving colchicine: is amniocentesis justified? Arthritis Care Res (Hoboken). 2010;62(2):143–148. PMID 20191511. doi:10.1002/acr.20061.", "link": "https://doi.org/10.1002/acr.20061", "areas": ["D", "E"], "unverified": false}, {"key": "BenChetrit2018Textbook", "text": "Ben-Chetrit E. Colchicine. In: Hashkes PJ, Laxer RM, Simon A, eds. Textbook of Autoinflammation. Cham: Springer; 2019 (online 2018):729–749. PMCID PMC7120738. doi:10.1007/978-3-319-98605-0_40.", "link": "https://doi.org/10.1007/978-3-319-98605-0_40", "areas": ["D", "G"], "unverified": false}, {"key": "BenChetrit2019", "text": "Ben-Chetrit E, Yazici H. Familial Mediterranean fever: different faces around the world. Clin Exp Rheumatol. 2019;37 Suppl 121:18-22. PMID 31694745 (full text not read; statement seen via search excerpt)", "link": "https://pubmed.ncbi.nlm.nih.gov/31694745/", "areas": ["A"], "unverified": false}, {"key": "BenChetritLevy2003", "text": "Ben-Chetrit E, Levy M. Reproductive system in familial Mediterranean fever: an overview. Ann Rheum Dis. 2003;62(10):916–919. PMID 12972465. PMCID PMC1754343. doi:10.1136/ard.62.10.916. (Abstract and full text not opened; cited for its general conclusion as summarized in Ozen2017 and BenChetrit2018Textbook.)", "link": "https://doi.org/10.1136/ard.62.10.916", "areas": ["D"], "unverified": false}, {"key": "BenZvi2015", "text": "Ben-Zvi I, Herskovizh C, Kukuy O, Kassel Y, Grossman C, Livneh A. Familial Mediterranean fever without MEFV mutations: a case-control study. Orphanet J Rare Dis. 2015;10:34. PMID 25887307. doi:10.1186/s13023-015-0252-7", "link": "https://doi.org/10.1186/s13023-015-0252-7", "areas": ["B"], "unverified": false}, {"key": "BenZvi2017", "text": "Ben-Zvi I, Kukuy O, Giat E, Pras E, Feld O, Kivity S, Perski O, Bornstein G, Grossman C, Harari G, Lidar M, Livneh A. Anakinra for colchicine-resistant familial Mediterranean fever: a randomized, double-blind, placebo-controlled trial. Arthritis Rheumatol. 2017;69(4):854-862. PMID 27860460. DOI 10.1002/art.39995.", "link": "https://doi.org/10.1002/art.39995", "areas": ["E", "F"], "unverified": false}, {"key": "Berkun2007", "text": "Berkun Y, Padeh S, Reichman B, et al. A single testing of serum amyloid A levels as a tool for diagnosis and treatment dilemmas in familial Mediterranean fever. Semin Arthritis Rheum. 2007;37(3):182–188. PMID 17512038. doi:10.1016/j.semarthrit.2007.03.005", "link": "https://doi.org/10.1016/j.semarthrit.2007.03.005", "areas": ["B"], "unverified": false}, {"key": "Berkun2012", "text": "Berkun Y, Wason S, Brik R, Butbul Y, Ben-Chetrit E, Hashkes PJ, Livneh A, et al. Pharmacokinetics of colchicine in pediatric and adult patients with familial Mediterranean fever. Int J Immunopathol Pharmacol. 2012;25(4):1121–1130. PMID 23298502. doi:10.1177/039463201202500429.", "link": "https://doi.org/10.1177/039463201202500429", "areas": ["D"], "unverified": false}, {"key": "Bodakci2021", "text": "Bodakçi E, Yaşar Bilge NŞ, Ataş N, et al. Appendectomy history is associated with severe disease and colchicine resistance in adult familial Mediterranean fever patients. Turk J Med Sci. 2021;51(4):1706-1711. DOI 10.3906/sag-2011-74.", "link": "https://doi.org/10.3906/sag-2011-74", "areas": ["E", "G"], "unverified": false}, {"key": "Bolek2026", "text": "Bolek EC, Bilgin E, Kardas RC, Kilic L, Kiraz S, Ertenli AI, Sari A, et al. Sociodemographic and clinical determinants of colchicine adherence in adults with familial Mediterranean fever: a cross-sectional study. Rheumatol Ther. 2026;13:1357–1377. PMID 42789246. PMCID PMC13624199. doi:10.1007/s40744-026-00883-w.", "link": "https://doi.org/10.1007/s40744-026-00883-w", "areas": ["D", "G"], "unverified": false}, {"key": "Booth2000", "text": "Booth DR, Gillmore JD, Lachmann HJ, et al. The genetic basis of autosomal dominant familial Mediterranean fever. QJM. 2000;93(4):217–221. PMID 10787449. doi:10.1093/qjmed/93.4.217", "link": "https://doi.org/10.1093/qjmed/93.4.217", "areas": ["B"], "unverified": false}, {"key": "Booty2009", "text": "Booty MG, Chae JJ, Masters SL, et al. Familial Mediterranean fever with a single MEFV mutation: where is the second hit? Arthritis Rheum. 2009;60(6):1851–1861. PMID 19479870. doi:10.1002/art.24569", "link": "https://doi.org/10.1002/art.24569", "areas": ["B"], "unverified": false}, {"key": "Broz2016", "text": "Broz P, Dixit VM. Inflammasomes: mechanism of assembly, regulation and signalling. Nature Reviews Immunology. 2016;16(7):407-420. PMID: 27291964. DOI: 10.1038/nri.2016.58", "link": "https://doi.org/10.1038/nri.2016.58", "areas": ["C"], "unverified": false}, {"key": "Cacan2021", "text": "Cacan E, Citli S, Yildirimtepe Caldiran F, Deveci K. IL-1b, IL-18 and Caspase-1 Levels in Serum as an Early Marker in Familial Mediterranean Fever. Journal of Contemporary Medicine. 2021;11(4):494-499.", "link": "https://dergipark.org.tr/tr/pub/jcm/issue/61403/907284", "areas": ["F"], "unverified": false, "note": "Earlier entry paraphrased the title. DOAJ holds two records with the author order reversed; the DergiPark page is authoritative."}, {"key": "Cam2024", "text": "Çam V, Ercan Emreol H, Ozen S. New and future perspectives in familial Mediterranean fever and other autoinflammatory diseases. Arch Rheumatol. 2024;39(3):331-338. doi:10.46497/ArchRheumatol.2024.10911. PMID 39507834. PMCID PMC11537678.", "link": "https://doi.org/10.46497/ArchRheumatol.2024.10911", "areas": ["F"], "unverified": false}, {"key": "CAPS-ALL-HSCT", "text": "Mori T, Saburi M, Hagihara M, Mori M, Yamazaki R, Kato J. Long-term remission of cryopyrin-associated periodic syndrome after allogeneic haematopoietic stem cell transplantation. Ann Rheum Dis. 2021;80(4):542-543. PMID 33158880. doi:10.1136/annrheumdis-2020-218695. (Two-page letter, paywalled and not abstracted; the transplant indication and the duration of remission could not be confirmed and are not stated in this app.)", "link": "https://pubmed.ncbi.nlm.nih.gov/33158880/", "areas": ["F"], "unverified": true, "note": "Specific details beyond long-term remission after transplant remain unconfirmed."}, {"key": "Casgevy2023", "text": "U.S. FDA approval of exagamglogene autotemcel (Casgevy; Vertex/CRISPR Therapeutics) for sickle cell disease, 8 December 2023; expanded to transfusion-dependent β-thalassemia January 2024; age indication lowered to ≥2 years July 2026. American Society of Gene & Cell Therapy news summary. https://www.asgct.org/news-publications/asgct-news/u-s-first-gene-therapies-for-sickle-cell-disease-approved-by-fda", "link": "https://www.asgct.org/news-publications/asgct-news/u-s-first-gene-therapies-for-sickle-cell-disease-approved-by-fda", "areas": ["F"], "unverified": false}, {"key": "Cattan2003", "text": "Cattan D. Familial Mediterranean fever: is low mortality from tuberculosis a specific advantage for MEFV mutation carriers? Clin Exp Rheumatol. 2003;21(4 Suppl 30):S53-4 (letter, with author reply at S54). PMID 14727462.", "link": "https://pubmed.ncbi.nlm.nih.gov/14727462/", "areas": ["A"], "unverified": false}, {"key": "Cazeneuve1999", "text": "Cazeneuve C, Sarkisian T, Pêcheux C, et al. MEFV-gene analysis in Armenian patients with familial Mediterranean fever: diagnostic value and unfavorable renal prognosis of the M694V homozygous genotype — genetic and therapeutic implications. Am J Hum Genet. 1999;65(1):88–97. PMID 10364520. doi:10.1086/302459", "link": "https://doi.org/10.1086/302459", "areas": ["B"], "unverified": false}, {"key": "Cazeneuve2000", "text": "Cazeneuve C, Ajrapetyan H, Papin S, Roudot-Thoraval F, Geneviève D, Mndjoyan E, Papazian M, Sarkisian A, Babloyan A, Boissier B, Duquesnoy P, Kouyoumdjian JC, Girodon-Boulandet E, Grateau G, Sarkisian T, Amselem S. Identification of MEFV-independent modifying genetic factors for familial Mediterranean fever. Am J Hum Genet. 2000;67(5):1136-1143. PMID 11017802. DOI 10.1016/S0002-9297(07)62944-9.", "link": "https://doi.org/10.1016/S0002-9297(07", "areas": ["E"], "unverified": false}, {"key": "Centola2000", "text": "Centola M, Wood G, Frucht DM, Galon J, et al., Kastner DL. The gene for familial Mediterranean fever, MEFV, is expressed in early leukocyte development and is regulated in response to inflammatory mediators. Blood. 2000;95(10):3223-3231. PMID: 10807793. DOI: 10.1182/blood.V95.10.3223", "link": "https://doi.org/10.1182/blood.V95.10.3223", "areas": ["C", "F"], "unverified": false}, {"key": "Chae2009", "text": "Chae JJ, Aksentijevich I, Kastner DL. Advances in the understanding of familial Mediterranean fever and possibilities for targeted therapy. British Journal of Haematology. 2009;146(5):467-478. PMID: 19466978. DOI: 10.1111/j.1365-2141.2009.07733.x", "link": "https://doi.org/10.1111/j.1365-2141.2009.07733.x", "areas": ["C"], "unverified": false}, {"key": "Chae2011", "text": "Chae JJ, Cho YH, Lee GS, et al. Gain-of-function Pyrin mutations induce NLRP3 protein-independent interleukin-1β activation and severe autoinflammation in mice. Immunity. 2011;34(5):755–768. PMID 21600797. doi:10.1016/j.immuni.2011.02.020", "link": "https://doi.org/10.1016/j.immuni.2011.02.020", "areas": ["B", "C", "F"], "unverified": false}, {"key": "Chappey1993", "text": "Chappey ON, Niel E, Wautier JL, Hung PP, Dervichian M, Cattan D, Scherrmann JM. Colchicine disposition in human leukocytes after single and multiple oral administration. Clin Pharmacol Ther. 1993;54(4):360–367. PMID 8222477. doi:10.1038/clpt.1993.161.", "link": "https://doi.org/10.1038/clpt.1993.161", "areas": ["D"], "unverified": false}, {"key": "Chappey1994", "text": "Chappey O, Niel E, Dervichian M, Wautier JL, Scherrmann JM, Cattan D. Colchicine concentration in leukocytes of patients with familial Mediterranean fever. Br J Clin Pharmacol. 1994;38(1):87–89. PMID 7946943. PMCID PMC1364844. doi:10.1111/j.1365-2125.1994.tb04328.x.", "link": "https://doi.org/10.1111/j.1365-2125.1994.tb04328.x", "areas": ["D"], "unverified": false}, {"key": "Coll2015", "text": "Coll RC, Robertson AAB, Chae JJ, et al. A small-molecule inhibitor of the NLRP3 inflammasome for the treatment of inflammatory diseases. Nat Med. 2015;21(3):248-255. PMID 25686105.", "link": "https://pubmed.ncbi.nlm.nih.gov/25686105/", "areas": ["F"], "unverified": false}, {"key": "Cronstein1995", "text": "Cronstein BN, Molad Y, Reibman J, Balakhane E, Levin RI, Weissmann G. Colchicine alters the quantitative and qualitative display of selectins on endothelial cells and neutrophils. J Clin Invest. 1995;96(2):994–1002. PMID 7543498. PMCID PMC185287. doi:10.1172/JCI118147.", "link": "https://doi.org/10.1172/JCI118147", "areas": ["D"], "unverified": false}, {"key": "CTgovSweep2026", "text": "ClinicalTrials.gov API v2 query, condition \"Familial Mediterranean Fever\", retrieved 16 October 2026; 38 studies with start dates 2019 or later. https://clinicaltrials.gov/search?cond=Familial%20Mediterranean%20Fever", "link": "https://clinicaltrials.gov/search?cond=Familial%20Mediterranean%20Fever", "areas": ["F"], "unverified": false}, {"key": "Cush2025", "text": "Cush JJ. 2024 Management of Familial Mediterranean Fever Recommendations. RheumNow, 28 Apr 2025. https://rheumnow.com/news/2024-management-familial-mediterranean-fever-recommendations (secondary summary of Ozen2025).", "link": "https://rheumnow.com/news/2024-management-familial-mediterranean-fever-recommendations", "areas": ["D"], "unverified": false}, {"key": "DeBenedetti2018", "text": "De Benedetti F, Gattorno M, Anton J, Ben-Chetrit E, Frenkel J, et al. (30 authors). Canakinumab for the treatment of autoinflammatory recurrent fever syndromes. N Engl J Med. 2018;378(20):1908-1919. PMID 29768139. DOI 10.1056/NEJMoa1706314. ClinicalTrials.gov NCT02059291.", "link": "https://doi.org/10.1056/NEJMoa1706314", "areas": ["E", "F"], "unverified": false}, {"key": "Deger2011", "text": "Deger SM, Ozturk MA, Demirag MD, Aslan S, Goker B, Haznedaroglu S, Onat AM. Health-related quality of life and its associations with mood condition in familial Mediterranean fever patients. Rheumatol Int. 2011;31(5):623-628. PMID 20049448. DOI 10.1007/s00296-009-1334-4.", "link": "https://doi.org/10.1007/s00296-009-1334-4", "areas": ["E"], "unverified": false}, {"key": "DellaCasa2022", "text": "Della Casa F, Vitale A, Lopalco G, et al., Cantarini L. Development and implementation of the AIDA international registry for patients with undifferentiated systemic autoinflammatory diseases. Front Med (Lausanne). 2022;9:908501. PMID 35755024. PMCID PMC9226373. doi:10.3389/fmed.2022.908501. ClinicalTrials.gov NCT05200715.", "link": "https://doi.org/10.3389/fmed.2022.908501", "areas": ["G"], "unverified": false}, {"key": "Delplanque2024", "text": "Delplanque M, Benech N, Rolhion N, Oeuvray C, Straube M, Galbert C, Brot L, Henry T, Jamilloux Y, Savey L, Grateau G, Sokol H, Georgin-Lavialle S. Gut microbiota in familial Mediterranean fever. Rheumatology (Oxford). 2024;63(4):1039-1048. doi:10.1093/rheumatology/kead322", "link": "https://doi.org/10.1093/rheumatology/kead322", "areas": ["F"], "unverified": false}, {"key": "Dember2007", "text": "Dember LM, Hawkins PN, Hazenberg BP, Gorevic PD, Merlini G, et al.; Eprodisate for AA Amyloidosis Trial Group. Eprodisate for the treatment of renal disease in AA amyloidosis. N Engl J Med. 2007;356(23):2349-2360. PMID 17554116. DOI 10.1056/NEJMoa065644.", "link": "https://doi.org/10.1056/NEJMoa065644", "areas": ["E"], "unverified": false}, {"key": "Demirkaya2016", "text": "Demirkaya E, Saglam C, Turker T, et al. Performance of different diagnostic criteria for familial Mediterranean fever in children with periodic fevers: results from a multicenter international registry. J Rheumatol. 2016;43(1):154–160. PMID 26568587. doi:10.3899/jrheum.141249", "link": "https://doi.org/10.3899/jrheum.141249", "areas": ["B"], "unverified": false}, {"key": "DemirkayaISSF2016", "text": "Demirkaya E, Acikel C, Hashkes P, Gattorno M, Gul A, Ozdogan H, Turker T, Karadag O, Livneh A, Ben-Chetrit E, et al.; FMF Arthritis Vasculitis and Orphan Disease Research in Paediatric Rheumatology (FAVOR). Development and initial validation of international severity scoring system for familial Mediterranean fever (ISSF). Ann Rheum Dis. 2016;75(6):1051–1056. PMID 26823530. doi:10.1136/annrheumdis-2015-208671. (Abstract read; full text paywalled, so the exact nine-domain wording and per-item points are taken from secondary sources and marked unverified. This is a different paper from [Demirkaya2016] in file B, which is the J Rheumatol diagnostic-criteria performance study.)", "link": "https://doi.org/10.1136/annrheumdis-2015-208671", "areas": ["G"], "unverified": true}, {"key": "Denke2026", "text": "Denke NJ. Navigating colchicine toxicity: essential management for a timeless therapy. J Emerg Nurs. 2026;52(5):1125–1131. PMID 42618164. doi:10.1016/j.jen.2026.03.003. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1016/j.jen.2026.03.003", "areas": ["G"], "unverified": false}, {"key": "DFV890", "text": "Gatlik E, Mehes B, Voltz E, Sommer U, Tritto E, Lestini G, Liu X, Pal P, Velinova M, Denney WS, Fu Y, Opipari A, Dean D, Junge G. First-in-human safety, tolerability and pharmacokinetics of DFV890, an oral NLRP3 inhibitor. Clin Transl Sci. 2024;17(5):e13789. PMID 38761014. PMCID PMC11101992. Open access.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11101992/", "areas": ["F"], "unverified": false, "note": "The companion phase 2 study in familial cold autoinflammatory syndrome (NCT04868968) is recorded as completed with an actual enrolment of 4 participants."}, {"key": "DiavCitrin2010", "text": "Diav-Citrin O, Shechtman S, Schwartz V, Avgil-Tsadok M, Finkel-Pekarsky V, Wajnberg R, et al. Pregnancy outcome after in utero exposure to colchicine. Am J Obstet Gynecol. 2010;203(2):144.e1–144.e6. PMID 20579964. doi:10.1016/j.ajog.2010.02.063.", "link": "https://doi.org/10.1016/j.ajog.2010.02.063", "areas": ["D"], "unverified": false}, {"key": "Diaz2004", "text": "Diaz A, Hu C, Kastner DL, Schaner P, Reginato AM, Richards N, Gumucio DL. Lipopolysaccharide-induced expression of multiple alternatively spliced MEFV transcripts in human synovial fibroblasts: a prominent splice isoform lacks the C-terminal domain that is highly mutated in familial Mediterranean fever. Arthritis and Rheumatism. 2004;50(11):3679-3689. PMID: 15529356. DOI: 10.1002/art.20600", "link": "https://doi.org/10.1002/art.20600", "areas": ["C", "F"], "unverified": false}, {"key": "DiCiaula2020", "text": "Di Ciaula A, Stella A, Bonfrate L, Wang DQH, Portincasa P. Gut Microbiota between Environment and Genetic Background in Familial Mediterranean Fever (FMF). Genes (Basel). 2020;11(9):1041. PMID 32899315. PMCID PMC7563178. doi:10.3390/genes11091041", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7563178/", "areas": ["F"], "unverified": false, "note": "Earlier entry named the wrong second author."}, {"key": "Dinarello1974", "text": "Dinarello CA, Wolff SM, Goldfinger SE, Dale DC, Alling DW. Colchicine therapy for familial Mediterranean fever. A double-blind trial. N Engl J Med. 1974;291(18):934-937. PMID 4606353; doi:10.1056/NEJM197410312911804", "link": "https://doi.org/10.1056/NEJM197410312911804", "areas": ["A", "D"], "unverified": false}, {"key": "Dinarello2011", "text": "Dinarello CA. Interleukin-1 in the pathogenesis and treatment of inflammatory diseases. Blood. 2011;117(14):3720-3732. PMID: 21304099. DOI: 10.1182/blood-2010-07-273417", "link": "https://doi.org/10.1182/blood-2010-07-273417", "areas": ["C"], "unverified": false}, {"key": "Duzova2003", "text": "Duzova A, Bakkaloglu A, Besbas N, Topaloglu R, Ozen S, Ozaltin F, et al. Role of A-SAA in monitoring subclinical inflammation and in colchicine dosage in familial Mediterranean fever. Clin Exp Rheumatol. 2003;21(4):509–514. PMID 12942707.", "link": "https://pubmed.ncbi.nlm.nih.gov/12942707/", "areas": ["D"], "unverified": false}, {"key": "Ehlers2023", "text": "Ehlers L, Rolfes E, Lieber M, Müller D, Lainka E, Gohar F, Klaus G, Girschick H, et al., Kallinich T. Treat-to-target strategies for the management of familial Mediterranean fever in children. Pediatr Rheumatol Online J. 2023;21:108. PMID 37752496. PMCID PMC10521475. doi:10.1186/s12969-023-00875-y.", "link": "https://doi.org/10.1186/s12969-023-00875-y", "areas": ["D", "G"], "unverified": false}, {"key": "ErdemTorun2026", "text": "Erdem Torun Ş, Çelikel E, Ekici Tekin Z, Ertem Ş, Özçelik MA, et al. Assessment of colchicine adherence and influencing factors in paediatric familial Mediterranean fever. Scand J Rheumatol. 2026;55:289–297. PMID 41693473. doi:10.1080/03009742.2026.2618334.", "link": "https://doi.org/10.1080/03009742.2026.2618334", "areas": ["D", "G"], "unverified": false}, {"key": "Evavold2018", "text": "Evavold CL, Ruan J, Tan Y, Xia S, Wu H, Kagan JC. The pore-forming protein gasdermin D regulates interleukin-1 secretion from living macrophages. Immunity. 2018;48(1):35-44.e6. PMID: 29195811. DOI: 10.1016/j.immuni.2017.11.013", "link": "https://doi.org/10.1016/j.immuni.2017.11.013", "areas": ["C"], "unverified": false}, {"key": "Favier2016", "text": "Favier LA, Schulert GS. Mevalonate kinase deficiency: current perspectives. Appl Clin Genet. 2016;9:101–110. PMID 27499643. doi:10.2147/TACG.S93933", "link": "https://doi.org/10.2147/TACG.S93933", "areas": ["B"], "unverified": false}, {"key": "FDA-Colcrys", "text": "COLCRYS (colchicine, USP) tablets, US prescribing information (Takeda/AR Scientific; repackager SPL version published 21 Oct 2022). DailyMed setid d6adc880-5499-4691-93f3-27c87902d5fc. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=d6adc880-5499-4691-93f3-27c87902d5fc", "link": "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=d6adc880-5499-4691-93f3-27c87902d5fc", "areas": ["D", "G"], "unverified": false}, {"key": "Federici2012", "text": "Federici S, Calcagno G, Finetti M, et al. Clinical impact of MEFV mutations in children with periodic fever in a prevalent western European Caucasian population. Ann Rheum Dis. 2012;71(12):1961–1965. PMID 22580583. doi:10.1136/annrheumdis-2011-200977", "link": "https://doi.org/10.1136/annrheumdis-2011-200977", "areas": ["B"], "unverified": false}, {"key": "Federici2015", "text": "Federici S, Sormani MP, Ozen S, et al. Evidence-based provisional clinical classification criteria for autoinflammatory periodic fevers. Ann Rheum Dis. 2015;74(5):799–805. PMID 25637003. doi:10.1136/annrheumdis-2014-206580", "link": "https://doi.org/10.1136/annrheumdis-2014-206580", "areas": ["B"], "unverified": false}, {"key": "Ferron1996", "text": "Ferron GM, Rochdi M, Jusko WJ, Scherrmann JM. Oral absorption characteristics and pharmacokinetics of colchicine in healthy volunteers after single and multiple doses. J Clin Pharmacol. 1996;36(10):874–883. PMID 8930773. doi:10.1002/j.1552-4604.1996.tb04753.x.", "link": "https://doi.org/10.1002/j.1552-4604.1996.tb04753.x", "areas": ["D"], "unverified": false}, {"key": "Finkelstein2010", "text": "Finkelstein Y, Aks SE, Hutson JR, Juurlink DN, Nguyen P, Dubnov-Raz G, et al. Colchicine poisoning: the dark side of an ancient drug. Clin Toxicol (Phila). 2010;48(5):407–414. PMID 20586571. doi:10.3109/15563650.2010.495348.", "link": "https://doi.org/10.3109/15563650.2010.495348", "areas": ["D"], "unverified": false}, {"key": "Fioredda2017", "text": "Okolo ON, Katsanis E, Yun S, Reveles CY, Anwer F. Allogeneic Transplant in ELANE and MEFV Mutation Positive Severe Cyclic Neutropenia: Review of Prognostic Factors for Secondary Severe Events. Case Rep Hematol. 2017;2017:5375793. PMID 28197346. PMCID PMC5286543. doi:10.1155/2017/5375793", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5286543/", "areas": ["F"], "unverified": false, "note": "Earlier entry named the wrong authors entirely."}, {"key": "FMFAID", "text": "FMF & AID Global Association (Familial Mediterranean Fever & Autoinflammatory Diseases Global Association), Zürich, Switzerland. https://fmfandaid.org (Description drawn from third-party directory listings; the organisation's own site was not fetched.)", "link": "https://fmfandaid.org", "areas": ["E", "G"], "unverified": false}, {"key": "Frangoul2021", "text": "Frangoul H, Altshuler D, Cappellini MD, et al. CRISPR-Cas9 gene editing for sickle cell disease and β-thalassemia. N Engl J Med. 2021;384(3):252-260. doi:10.1056/NEJMoa2031054.", "link": "https://doi.org/10.1056/NEJMoa2031054", "areas": ["F"], "unverified": false}, {"key": "FrenchFMF1997", "text": "French FMF Consortium. A candidate gene for familial Mediterranean fever. Nat Genet. 1997;17:25-31. PMID 9288094; doi:10.1038/ng0997-25", "link": "https://doi.org/10.1038/ng0997-25", "areas": ["A", "B", "C"], "unverified": false}, {"key": "Fujikura2015", "text": "Fujikura K. Global epidemiology of Familial Mediterranean fever mutations using population exome sequences. Mol Genet Genomic Med. 2015;3:272-282. PMID 26247045; PMCID PMC4521964; doi:10.1002/mgg3.140", "link": "https://doi.org/10.1002/mgg3.140", "areas": ["A"], "unverified": false}, {"key": "Furer2020", "text": "Furer V, Rondaan C, Heijstek MW, Agmon-Levin N, van Assen S, Bijl M, et al. 2019 update of EULAR recommendations for vaccination in adult patients with autoimmune inflammatory rheumatic diseases. Ann Rheum Dis. 2020;79(1):39-52. PMID 31413005. DOI 10.1136/annrheumdis-2019-215882.", "link": "https://doi.org/10.1136/annrheumdis-2019-215882", "areas": ["E", "G"], "unverified": false}, {"key": "Gao2016", "text": "Gao W, Yang J, Liu W, Wang Y, Shao F. Site-specific phosphorylation and microtubule dynamics control Pyrin inflammasome activation. Proceedings of the National Academy of Sciences USA. 2016;113(33):E4857-E4866. PMID: 27482109. DOI: 10.1073/pnas.1601700113", "link": "https://doi.org/10.1073/pnas.1601700113", "areas": ["C", "D", "F"], "unverified": false}, {"key": "Gattorno2019", "text": "Gattorno M, Hofer M, Federici S, et al.; Eurofever Registry and PRINTO. Classification criteria for autoinflammatory recurrent fevers. Ann Rheum Dis. 2019;78(8):1025–1032. PMID 31018962. doi:10.1136/annrheumdis-2019-215048. Criteria tables and footnotes were read from the accepted manuscript at UCL Discovery (https://discovery.ucl.ac.uk/id/eprint/10073095/). Its genotype footnote says \"(or biallelic?)\", while the published version, as reproduced in [Lancieri2023], says \"(or biallelic)\". Check the typeset Table 2 before quoting it verbatim.", "link": "https://discovery.ucl.ac.uk/id/eprint/10073095/", "areas": ["B"], "unverified": false}, {"key": "GeneReviews", "text": "Deuitch N, Chavez De Paz Solis D, Stone D, Ombrello A, Aksentijevich I. Familial Mediterranean Fever. In: Adam MP, et al., eds. GeneReviews®. University of Washington, Seattle; 1993–present (current revision). PMID 20301405; https://www.ncbi.nlm.nih.gov/books/NBK1227/ (summary read via Europe PMC; NCBI page was bot-blocked)", "link": "https://www.ncbi.nlm.nih.gov/books/NBK1227/", "areas": ["A", "B", "G"], "unverified": false}, {"key": "GershoniBaruch2001", "text": "Gershoni-Baruch R, Shinawi M, Leah K, Badarnah K, Brik R. Familial Mediterranean fever: prevalence, penetrance and genetic drift. Eur J Hum Genet. 2001;9:634-637. PMID 11528510; doi:10.1038/sj.ejhg.5200672", "link": "https://doi.org/10.1038/sj.ejhg.5200672", "areas": ["A"], "unverified": false}, {"key": "GershoniBaruch2003", "text": "Gershoni-Baruch R, Brik R, Lidar M, Shinawi M, Livneh A. Male sex coupled with articular manifestations cause a 4-fold increase in susceptibility to amyloidosis in patients with familial Mediterranean fever homozygous for the M694V-MEFV mutation. J Rheumatol. 2003;30(2):308–312. PMID 12563686.", "link": "https://pubmed.ncbi.nlm.nih.gov/12563686/", "areas": ["B"], "unverified": false}, {"key": "GezginYildirim2020", "text": "Gezgin Yildirim D, Seven MB, Gönen S, Söylemezoğlu O. Erysipelas-like erythema in children with familial Mediterranean fever. Clin Exp Rheumatol. 2020;38 Suppl 127(5):101-104. PMID 33124556", "link": "https://pubmed.ncbi.nlm.nih.gov/33124556/", "areas": ["A", "G"], "unverified": false}, {"key": "GezginYildirim2022age", "text": "Gezgin Yildirim D, Gönen S, Fidan K, Söylemezoğlu O. Does age at onset affect the clinical presentation of familial Mediterranean fever in children? J Clin Rheumatol. 2022;28:e125-e128. PMID 33252389; doi:10.1097/RHU.0000000000001637", "link": "https://doi.org/10.1097/RHU.0000000000001637", "areas": ["A"], "unverified": false}, {"key": "Giaglis2007", "text": "Giaglis S, Papadopoulos V, Kambas K, et al. MEFV alterations and population genetics analysis in a large cohort of Greek patients with familial Mediterranean fever. Clin Genet. 2007;71:458-467. PMID 17489852; doi:10.1111/j.1399-0004.2007.00789.x", "link": "https://doi.org/10.1111/j.1399-0004.2007.00789.x", "areas": ["A"], "unverified": false}, {"key": "Giancane2015", "text": "Giancane G, Ter Haar NM, Wulffraat N, et al. Evidence-based recommendations for genetic diagnosis of familial Mediterranean fever. Ann Rheum Dis. 2015;74(4):635–641. PMID 25628446. doi:10.1136/annrheumdis-2014-206844. The 8 recommendations were read from the reproduction in [Ozen2017].", "link": "https://doi.org/10.1136/annrheumdis-2014-206844", "areas": ["B"], "unverified": false}, {"key": "gnomAD", "text": "Genome Aggregation Database v2.1 allele frequencies, retrieved through MyVariant.info (https://myvariant.info) for rs61752717 (M694V), rs28940579 (V726A), rs28940580 (M680I), rs28940578 (M694I), rs3743930 (E148Q), rs104895094 (K695R), rs61732874 (A744S) and rs104895097 (R761H); accessed 2026-10-16. Population AFs are approximate, and gnomAD v2 has no Middle Eastern group.", "link": "https://myvariant.info", "areas": ["B"], "unverified": false}, {"key": "Goflikicept2025", "text": "Interim results of a randomized placebo-controlled study of IL-1 inhibitor goflikicept in patients with familial Mediterranean fever. ACR Convergence 2025 abstract; Arthritis Rheumatol. 2025;77(Suppl). https://acrabstracts.org/?p=44260 (conference abstract; outcome figures not retrieved)", "link": "https://acrabstracts.org/?p=44260", "areas": ["F"], "unverified": false}, {"key": "Gok2017", "text": "Gok K, Cengiz G, Erol K, Ozgocmen S. Tofacitinib suppresses disease activity and febrile attacks in a patient with coexisting rheumatoid arthritis and familial Mediterranean fever. Acta Reumatol Port. 2017;42(1):88-90. PMID 28371574.", "link": "https://pubmed.ncbi.nlm.nih.gov/28371574/", "areas": ["F"], "unverified": false}, {"key": "Goldfinger1972", "text": "Goldfinger SE. Colchicine for familial Mediterranean fever. N Engl J Med. 1972;287(25):1302. PMID 4636899; doi:10.1056/NEJM197212212872514", "link": "https://doi.org/10.1056/NEJM197212212872514", "areas": ["A", "D"], "unverified": false}, {"key": "Goldstein1974", "text": "Goldstein RC, Schwabe AD. Prophylactic colchicine therapy in familial Mediterranean fever. A controlled, double-blind study. Ann Intern Med. 1974;81(6):792–794. PMID 4611296. doi:10.7326/0003-4819-81-6-792.", "link": "https://doi.org/10.7326/0003-4819-81-6-792", "areas": ["D"], "unverified": false}, {"key": "Green2017", "text": "Green H, Lichtenberg S, Rahamimov R, Livneh A, Chagnac A, Mor E, Rozen-Zvi B. Familial Mediterranean fever is associated with increased mortality after kidney transplantation: a 19 years' single center experience. Transplantation. 2017;101(10):2621-2626. PMID 28926523. DOI 10.1097/TP.0000000000001681.", "link": "https://doi.org/10.1097/TP.0000000000001681", "areas": ["E"], "unverified": false}, {"key": "GulBenChetrit2025", "text": "Gül A, Ben-Chetrit E. The decline of AA amyloidosis in familial Mediterranean fever is significant, but the story is not over. Clin Exp Rheumatol. 2025;43:1715-1717. https://www.clinexprheumatol.org/article.asp?a=22887 (Full text read; PMID not checked.)", "link": "https://www.clinexprheumatol.org/article.asp?a=22887", "areas": ["E"], "unverified": false}, {"key": "Guzelant2017", "text": "Guzelant G, Ozguler Y, Esatoglu SN, et al. Exacerbation of Behçet's syndrome and familial Mediterranean fever with menstruation. Clin Exp Rheumatol. 2017;35 Suppl 108(6):95-99. PMID 29148415", "link": "https://pubmed.ncbi.nlm.nih.gov/29148415/", "areas": ["A"], "unverified": false}, {"key": "HaimovKochman1998", "text": "Haimov-Kochman R, Ben-Chetrit E. The effect of colchicine treatment on sperm production and function: a review. Hum Reprod. 1998;13(2):360–362. PMID 9557838. doi:10.1093/humrep/13.2.360.", "link": "https://doi.org/10.1093/humrep/13.2.360", "areas": ["D"], "unverified": false}, {"key": "Hakobyan2024", "text": "Grigor'eva EV, Karapetyan LV, Malakhova AA, Medvedev SP, Minina JM, Hayrapetyan VH, Vardanyan VS, Zakian SM, Arakelyan A, Zakharyan R. Int J Mol Sci. 2024;25(11):6102. PMCID PMC11173119.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11173119/", "areas": ["F"], "unverified": false, "note": "Earlier entry named the wrong authors."}, {"key": "Hashkes2012", "text": "Hashkes PJ, Spalding SJ, Giannini EH, Huang B, Johnson A, Park G, Barron KS, Weisman MH, Pashinian N, Reiff AO, Samuels J, Wright DA, Kastner DL, Lovell DJ. Rilonacept for colchicine-resistant or -intolerant familial Mediterranean fever: a randomized trial. Ann Intern Med. 2012;157(8):533-541. PMID 23070486. DOI 10.7326/0003-4819-157-8-201210160-00003. (Correction: Ann Intern Med 2014;160:291-292, PMID 24727851.)", "link": "https://doi.org/10.7326/0003-4819-157-8-201210160-00003", "areas": ["E", "F", "G"], "unverified": false}, {"key": "Hashkes2014", "text": "Hashkes PJ, Spalding SJ, Hajj-Ali R, et al. The effect of rilonacept versus placebo on health-related quality of life in patients with poorly controlled familial Mediterranean fever. Biomed Res Int. 2014;2014:854842. PMID 25147819. DOI 10.1155/2014/854842.", "link": "https://doi.org/10.1155/2014/854842", "areas": ["E"], "unverified": false}, {"key": "Haznedaroglu2005", "text": "Haznedaroglu S, Ozturk MA, Sancak B, Goker B, Onat AM, Bukan N, Ertenli I, Kiraz S, Calguneri M. Serum interleukin 17 and interleukin 18 levels in familial Mediterranean fever. Clin Exp Rheumatol. 2005;23(4 Suppl 38):S77-80. PMID 16273770.", "link": "https://pubmed.ncbi.nlm.nih.gov/16273770/", "areas": ["F"], "unverified": false}, {"key": "Heilig2018", "text": "Heilig R, Broz P. Function and mechanism of the pyrin inflammasome. European Journal of Immunology. 2018;48(2):230-238. PMID: 29148036. DOI: 10.1002/eji.201746947", "link": "https://doi.org/10.1002/eji.201746947", "areas": ["C"], "unverified": false}, {"key": "Heller1958", "text": "Heller H, Sohar E, Sherf L. Familial Mediterranean fever. AMA Arch Intern Med. 1958;102:50-71. PMID 13558745; doi:10.1001/archinte.1958.00260190052007", "link": "https://doi.org/10.1001/archinte.1958.00260190052007", "areas": ["A"], "unverified": false}, {"key": "Henes2022", "text": "Henes JC, Saur S, Kofler DM, Kedor C, Meisner C, Schuett M, Krusche M, Koetter I, Xenitidis T, Schulze-Koops H, Feist E; TOFFIFE Study Team. Tocilizumab for the treatment of familial Mediterranean fever: a randomized, double-blind, placebo-controlled phase II study. J Clin Med. 2022;11(18):5360. PMID 36143006. DOI 10.3390/jcm11185360.", "link": "https://doi.org/10.3390/jcm11185360", "areas": ["E", "F"], "unverified": false, "aliases": ["Henes2022F"]}, {"key": "Hirahara2024", "text": "Hirahara Y, Yamaguchi M, Takase-Minegishi K, et al. Pregnancy outcomes in patients with familial Mediterranean fever: systematic review and meta-analysis. Rheumatology (Oxford). 2024;63(2):277-284. PMID 37594755. DOI 10.1093/rheumatology/kead417.", "link": "https://doi.org/10.1093/rheumatology/kead417", "areas": ["E"], "unverified": false}, {"key": "Hospach2024", "text": "Hospach T, Blankenburg F, Heinkele A, et al. Protracted febrile myalgia syndrome in children with familial Mediterranean fever – systematic review and a case report. Pediatr Rheumatol Online J. 2024;22:85. PMID 39256780; PMCID PMC11389256; doi:10.1186/s12969-024-01019-6", "link": "https://doi.org/10.1186/s12969-024-01019-6", "areas": ["A", "G"], "unverified": false}, {"key": "Hu2020", "text": "Hu JJ, Liu X, Xia S, Zhang Z, Zhang Y, Zhao J, Ruan J, Luo X, Lou X, Bai Y, Wang J, Hollingsworth LR, Magupalli VG, Zhao L, Luo HR, Kim J, Lieberman J, Wu H. FDA-approved disulfiram inhibits pyroptosis by blocking gasdermin D pore formation. Nat Immunol. 2020;21(7):736-745. doi:10.1038/s41590-020-0669-6.", "link": "https://doi.org/10.1038/s41590-020-0669-6", "areas": ["F"], "unverified": false}, {"key": "Humphries2020", "text": "Humphries F, Shmuel-Galia L, Ketelut-Carneiro N, Li S, Wang B, Nemmara VV, Wilson R, Jiang Z, Khalighinejad F, Muneeruddin K, Shaffer SA, Dutta R, Ionete C, Pesiridis S, Yang S, Thompson PR, Fitzgerald KA. Succination inactivates gasdermin D and blocks pyroptosis. Science. 2020;369(6511):1633-1637. doi:10.1126/science.abb9818.", "link": "https://doi.org/10.1126/science.abb9818", "areas": ["F"], "unverified": false}, {"key": "Hung2005", "text": "Hung IF, Wu AK, Cheng VC, Tang BS, To KW, Yeung CK, Woo PC, Lau SK, et al. Fatal interaction between clarithromycin and colchicine in patients with renal insufficiency: a retrospective study. Clin Infect Dis. 2005;41(3):291–300. PMID 16007523. doi:10.1086/431592.", "link": "https://doi.org/10.1086/431592", "areas": ["D", "G"], "unverified": false}, {"key": "ICBD2014", "text": "International Team for the Revision of the International Criteria for Behçet's Disease (ITR-ICBD). The International Criteria for Behçet's Disease (ICBD): a collaborative study of 27 countries on the sensitivity and specificity of the new criteria. J Eur Acad Dermatol Venereol. 2014;28(3):338–347. PMID 23441863. doi:10.1111/jdv.12107", "link": "https://doi.org/10.1111/jdv.12107", "areas": ["B"], "unverified": false}, {"key": "IlarisPIG", "text": "ILARIS (canakinumab) injection, US prescribing information (Novartis), revised 11/2024. DailyMed setid 7d271f3b-e4f9-4d80-8dcf-28d49123f80e; current label version 8 Jun 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7d271f3b-e4f9-4d80-8dcf-28d49123f80e (full label read for this file; supersedes the partially verified note on this key in file E).", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7d271f3b-e4f9-4d80-8dcf-28d49123f80e", "areas": ["G", "E"], "unverified": false, "aliases": ["IlarisPI"], "note": "Full label read on DailyMed for the nursing research pass."}, {"key": "IllnessPerceptionFMF", "text": "Cross-sectional study of illness perception and medication adherence in familial Mediterranean fever (Turkey), reporting lower illness-perception scores in the personal control, treatment control and illness comprehensibility domains among adherent patients. Identified only through search results; the article record (journal, year, volume, pages, PMID) was not confirmed and the full text was not read (unverified). Candidate record to check: \"The impact of illness perception on medication adherence in patients with familial Mediterranean fever,\" indexed at https://avesis.akdeniz.edu.tr/yayin/6fc4d3c4-09f2-4abc-a353-b0af47d4e9cf/", "link": "https://avesis.akdeniz.edu.tr/yayin/6fc4d3c4-09f2-4abc-a353-b0af47d4e9cf/", "areas": ["G"], "unverified": true}, {"key": "Indraratna2018", "text": "Indraratna PL, Virk S, Gurram D, Day RO. Use of colchicine in pregnancy: a systematic review and meta-analysis. Rheumatology (Oxford). 2018;57(2):382–387. PMID 29029311. doi:10.1093/rheumatology/kex353.", "link": "https://doi.org/10.1093/rheumatology/kex353", "areas": ["D"], "unverified": false}, {"key": "Infevers2026", "text": "Infevers: the registry of hereditary auto-inflammatory disorders mutations, MEFV tabular list. https://infevers.umai-montpellier.fr/web/search.php?n=1 (accessed 2026-10-16; site says \"Total current number of sequence variants for MEFV: 412\").", "link": "https://infevers.umai-montpellier.fr/web/search.php?n=1", "areas": ["B"], "unverified": false}, {"key": "IntFMF1997", "text": "The International FMF Consortium. Ancient missense mutations in a new member of the RoRet gene family are likely to cause familial Mediterranean fever. Cell. 1997;90(4):797–807. PMID 9288758. doi:10.1016/S0092-8674(00)80539-5", "link": "https://doi.org/10.1016/S0092-8674(00", "areas": ["B", "A", "C"], "unverified": false, "aliases": ["IntlFMF1997"]}, {"key": "Jamilloux2018", "text": "Jamilloux Y, Lefeuvre L, Magnotti F, Martin A, et al., Henry T. Familial Mediterranean fever mutations are hypermorphic mutations that specifically decrease the activation threshold of the Pyrin inflammasome. Rheumatology (Oxford). 2018;57(1):100-111. PMID: 29040788. DOI: 10.1093/rheumatology/kex373", "link": "https://doi.org/10.1093/rheumatology/kex373", "areas": ["C"], "unverified": false}, {"key": "Janeway1908", "text": "Janeway TC, Mosenthal HO. An unusual paroxysmal syndrome, probably allied to recurrent vomiting, with a study of the nitrogen metabolism. Arch Intern Med. 1908;2:214-225. doi:10.1001/archinte.1908.00050080016002 (Crossref lists the article starting at p.214; end page and full subtitle are taken from secondary citations)", "link": "https://doi.org/10.1001/archinte.1908.00050080016002", "areas": ["A"], "unverified": false}, {"key": "Jeru2013", "text": "Jéru I, Hentgen V, Cochet E, et al. The risk of familial Mediterranean fever in MEFV heterozygotes: a statistical approach. PLoS One. 2013;8(7):e68431. PMID 23844200. doi:10.1371/journal.pone.0068431", "link": "https://doi.org/10.1371/journal.pone.0068431", "areas": ["B"], "unverified": false}, {"key": "Jeyaratnam2016", "text": "Jeyaratnam J, Ter Haar NM, de Sain-van der Velden MG, Waterham HR, van Gijn ME, Frenkel J. Diagnostic value of urinary mevalonic acid excretion in patients with a clinical suspicion of mevalonate kinase deficiency (MKD). JIMD Rep. 2016;27:33–38. PMID 26409462. doi:10.1007/8904_2015_489", "link": "https://doi.org/10.1007/8904_2015_489", "areas": ["B"], "unverified": false}, {"key": "Jeyaratnam2018", "text": "Jeyaratnam J, Ter Haar NM, Lachmann HJ, Kasapcopur O, Ombrello AK, Rigante D, Dedeoglu F, Baris EH, Vastert SJ, Wulffraat NM, Frenkel J. The safety of live-attenuated vaccines in patients using IL-1 or IL-6 blockade: an international survey. Pediatr Rheumatol Online J. 2018;16(1):19. PMID 29562920. DOI 10.1186/s12969-018-0235-z.", "link": "https://doi.org/10.1186/s12969-018-0235-z", "areas": ["E", "G"], "unverified": false}, {"key": "Jeyaratnam2022", "text": "Jeyaratnam J, Faraci M, Gennery AR, Drabko K, Algeri M, Morimoto A, Sirait T, Lankester AC, Albert M, Neven B, Frenkel J; EBMT Inborn Errors Working Party. The efficacy and safety of allogeneic stem cell transplantation in mevalonate kinase deficiency. Pediatr Rheumatol Online J. 2022;20(1):56. doi:10.1186/s12969-022-00716-4. PMID 35906690. PMCID PMC9338460.", "link": "https://doi.org/10.1186/s12969-022-00716-4", "areas": ["F"], "unverified": false}, {"key": "Kacan2023", "text": "Kaçan H, Kaş Alay G, Yildiz E. The effect of education given to Turkish adolescents with familial Mediterranean fever on anxiety, depression, and quality of life. Eur J Pediatr. 2023;182(7):3063–3073. PMID 37069356. doi:10.1007/s00431-023-04975-5. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1007/s00431-023-04975-5", "areas": ["G"], "unverified": false}, {"key": "Kallinich2007", "text": "Kallinich T, Haffner D, Niehues T, Huss K, Lainka E, Neudorf U, et al. Colchicine use in children and adolescents with familial Mediterranean fever: literature review and consensus statement. Pediatrics. 2007;119(2):e474–e483. PMID 17242135. doi:10.1542/peds.2006-1434.", "link": "https://doi.org/10.1542/peds.2006-1434", "areas": ["D"], "unverified": false}, {"key": "Karadag2013", "text": "Karadag O, Tufan A, Yazisiz V, et al. The factors considered as trigger for the attacks in patients with familial Mediterranean fever. Rheumatol Int. 2013;33:893-897. PMID 22814791; doi:10.1007/s00296-012-2453-x", "link": "https://doi.org/10.1007/s00296-012-2453-x", "areas": ["A", "E"], "unverified": false}, {"key": "Karadeniz2020", "text": "Karadeniz H, Güler AA, Atas N, et al. Tofacitinib for the treatment for colchicine-resistant familial Mediterranean fever: case-based review. Rheumatol Int. 2020;40(1):169-173. doi:10.1007/s00296-019-04490-7. PMID 31813060.", "link": "https://doi.org/10.1007/s00296-019-04490-7", "areas": ["F"], "unverified": false}, {"key": "KasAlay2026", "text": "Kaş Alay G, Mutlu B. The effect of a mobile game developed for children with familial Mediterranean fever on disease management and quality of life: a randomized controlled trial. Games Health J. 2026;15(3):144–154. PMID 41700777. doi:10.1177/2161783X251414694. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1177/2161783X251414694", "areas": ["G"], "unverified": false}, {"key": "Kasifoglu2014", "text": "Kasifoglu T, Bilge SY, Sari I, et al. Amyloidosis and its related factors in Turkish patients with familial Mediterranean fever: a multicentre study. Rheumatology (Oxford). 2014;53(4):741-745. PMID 24369413. DOI 10.1093/rheumatology/ket400.", "link": "https://doi.org/10.1093/rheumatology/ket400", "areas": ["E"], "unverified": false}, {"key": "Kayagaki2015", "text": "Kayagaki N, Stowe IB, Lee BL, O'Rourke K, et al., Dixit VM. Caspase-11 cleaves gasdermin D for non-canonical inflammasome signalling. Nature. 2015;526(7575):666-671. PMID: 26375259. DOI: 10.1038/nature15541", "link": "https://doi.org/10.1038/nature15541", "areas": ["C"], "unverified": false}, {"key": "Kees1997", "text": "Kees S, Langevitz P, Zemer D, Padeh S, Pras M, Livneh A. Attacks of pericarditis as a manifestation of familial Mediterranean fever (FMF). QJM. 1997;90:643-647. PMID 9415347; doi:10.1093/qjmed/90.10.643", "link": "https://doi.org/10.1093/qjmed/90.10.643", "areas": ["A", "G"], "unverified": false}, {"key": "Keven2004", "text": "Keven K, Sengul S, Kutlay S, Ekmekci Y, Anadol E, Nergizoglu G, Ates K, Erturk S, Erbay B. Long-term outcome of renal transplantation in patients with familial Mediterranean fever amyloidosis: a single-center experience. Transplant Proc. 2004;36(9):2632-2634. PMID 15621109. DOI 10.1016/j.transproceed.2004.09.065.", "link": "https://doi.org/10.1016/j.transproceed.2004.09.065", "areas": ["E"], "unverified": false}, {"key": "Khachatryan2008", "text": "Khachatryan ZA, Ktsoyan ZA, Manukyan GP, Kelly D, Ghazaryan KA, Aminov RI. Predominant role of host genetics in controlling the composition of gut microbiota. PLoS One. 2008;3(8):e3064. doi:10.1371/journal.pone.0003064. PMCID PMC2516932. (Note: often miscited as PNAS.)", "link": "https://doi.org/10.1371/journal.pone.0003064", "areas": ["F"], "unverified": false}, {"key": "KiactaPh3", "text": "Efficacy and safety study of KIACTA in preventing renal function decline in AA amyloidosis (confirmatory phase 3). ClinicalTrials.gov NCT01215747. https://clinicaltrials.gov/study/NCT01215747 ; top-line negative result reported by BELLUS Health, 2016: https://www.drugdiscoverytrends.com/bellus-health-phase-3-results-of-kiacta-for-aa-amyloidosis/", "link": "https://clinicaltrials.gov/study/NCT01215747", "areas": ["E"], "unverified": false}, {"key": "KineretPI", "text": "KINERET (anakinra) injection, solution, US prescribing information with Instructions for Use (Swedish Orphan Biovitrum). DailyMed setid d9d74915-6606-4570-9c52-c4001d3177de; current label version 10 Apr 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d9d74915-6606-4570-9c52-c4001d3177de (full label and IFU read).", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d9d74915-6606-4570-9c52-c4001d3177de", "areas": ["G"], "unverified": false}, {"key": "Kishida2018", "text": "Koga T, Sato S, Miyamoto J, Hagimori N, Kawazoe Y, Arinaga K, Fukushima C, Yamamoto H, Kawakami A. Comparison of the efficacy and safety of tocilizumab for colchicine-resistant or colchicine-intolerant familial Mediterranean fever: study protocol for a randomised controlled trial. Trials. 2018;19:715. PMID 30594222. PMCID PMC6311086.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6311086/", "areas": ["F"], "unverified": false, "note": "Earlier entry attributed this to another group. The identifier was right; the authors were not."}, {"key": "Klimecki1994", "text": "Klimecki WT, Futscher BW, Grogan TM, Dalton WS. P-glycoprotein expression and function in circulating blood cells from normal volunteers. Blood. 1994;83(9):2451–2458. PMID 7513198. doi:10.1182/blood.V83.9.2451.2451.", "link": "https://doi.org/10.1182/blood.V83.9.2451.2451", "areas": ["D"], "unverified": false}, {"key": "Klughammer2023", "text": "Klughammer B, Piali L, Nica A, Nagel S, Bailey L, Jochum C, Ignatenko S, Blaeuer A, Danilin S, Gulati P, Hayward J, Scepanovic P, Zhang JD, Bhosale S, Chong CF, Christ A. Selnoflast (RO7486967) phase 1b study. Clin Transl Med. 2023;13(11):e1471. PMID 37962000. PMCID PMC10644327. doi:10.1002/ctm2.1471", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10644327/", "areas": ["F"], "unverified": false, "note": "Earlier entry gave the wrong journal."}, {"key": "KocThesis2016", "text": "CRISPR-Cas based genome editing system for the MEFV gene in FMF-specific iPSCs. MSc thesis, Koç University, 2016. Record: https://research.hub.ku.edu.tr/entities/publication/56915b7a-c244-4727-8484-f61ae8231d22/full (unverified — access restricted, no efficiency or rescue data available)", "link": "https://research.hub.ku.edu.tr/entities/publication/56915b7a-c244-4727-8484-f61ae8231d22/full", "areas": ["F"], "unverified": true, "note": "Institutional record is access-restricted. Turkey's national thesis centre (tez.yok.gov.tr) is the alternative place to look."}, {"key": "Koga2022", "text": "Koga T, Sato S, Hagimori N, Yamamoto H, Ishimura M, Yasumi T, Kirino Y, Ikeda K, Yachie A, Migita K, Kishida D, Atsumi T, Kawakami A. A randomised, double-blind, placebo-controlled phase III trial on the efficacy and safety of tocilizumab in patients with familial Mediterranean fever. Clin Exp Rheumatol. 2022;40(8):1535-1542. PMID 36106542. DOI 10.55563/clinexprheumatol/fgx9vv.", "link": "https://doi.org/10.55563/clinexprheumatol/fgx9vv", "areas": ["E"], "unverified": false}, {"key": "Kogan2001", "text": "Kogan A, Shinar Y, Lidar M, et al. Common MEFV mutations among Jewish ethnic groups in Israel: high frequency of carrier and phenotype III states and absence of a perceptible biological advantage for the carrier state. Am J Med Genet. 2001;102:272-276. PMID 11484206; doi:10.1002/ajmg.1438", "link": "https://doi.org/10.1002/ajmg.1438", "areas": ["A", "B"], "unverified": false}, {"key": "Kondi2010", "text": "Kondi A, Hentgen V, Piram M, Letierce A, Guillaume-Czitrom S, Koné-Paut I. Validation of the new paediatric criteria for the diagnosis of familial Mediterranean fever: data from a mixed population of 100 children from the French reference centre for auto-inflammatory disorders. Rheumatology (Oxford). 2010;49(11):2200–2203. PMID 20688806. doi:10.1093/rheumatology/keq252", "link": "https://doi.org/10.1093/rheumatology/keq252", "areas": ["B"], "unverified": false}, {"key": "Konukbay2016", "text": "Konukbay D, Gattorno M, Yildiz D, et al. A novel assessment tool for clinical care of patients with autoinflammatory disease: juvenile autoinflammatory disease multidimensional assessment report. Clin Exp Rheumatol. 2016;34(6 Suppl 102):129–135. PMID 27791950.", "link": "https://pubmed.ncbi.nlm.nih.gov/27791950/", "areas": ["G"], "unverified": false}, {"key": "Korkmaz2002", "text": "Korkmaz C, Ozdogan H, Kasapçopur O, Yazici H. Acute phase response in familial Mediterranean fever. Ann Rheum Dis. 2002;61(1):79–81. PMID 11779767. doi:10.1136/ard.61.1.79", "link": "https://doi.org/10.1136/ard.61.1.79", "areas": ["B", "G"], "unverified": false}, {"key": "Kosan2019", "text": "Koşan Z, Yılmaz S, Bilge Yerli E, Köyceğiz E. Evaluation of the burden of care and the quality of life in the parents of Turkish children with familial Mediterranean fever. J Pediatr Nurs. 2019;48:e21–e26. PMID 31176497. doi:10.1016/j.pedn.2019.05.017. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1016/j.pedn.2019.05.017", "areas": ["G"], "unverified": false}, {"key": "KuemmerleDeschner2017", "text": "Kuemmerle-Deschner JB, Ozen S, Tyrrell PN, et al. Diagnostic criteria for cryopyrin-associated periodic syndrome (CAPS). Ann Rheum Dis. 2017;76(6):942–947. PMID 27707729. doi:10.1136/annrheumdis-2016-209686", "link": "https://doi.org/10.1136/annrheumdis-2016-209686", "areas": ["B"], "unverified": false}, {"key": "Kukuy2021", "text": "Kukuy OL, Beckerman P, Dinour D, Ben-Zvi I, Livneh A. Amyloid storm: acute kidney injury and massive proteinuria, rapidly progressing to end-stage kidney disease in AA amyloidosis of familial Mediterranean fever. Rheumatology (Oxford). 2021;60(7):3235-3242. PMID 33291151. DOI 10.1093/rheumatology/keaa772.", "link": "https://doi.org/10.1093/rheumatology/keaa772", "areas": ["E", "G"], "unverified": false}, {"key": "Kuncl1987", "text": "Kuncl RW, Duncan G, Watson D, Alderson K, Rogawski MA, Peper M. Colchicine myopathy and neuropathy. N Engl J Med. 1987;316(25):1562–1568. PMID 3035372. doi:10.1056/NEJM198706183162502.", "link": "https://doi.org/10.1056/NEJM198706183162502", "areas": ["D"], "unverified": false}, {"key": "Lachmann2006", "text": "Lachmann HJ, Sengül B, Yavuzşen TU, et al. Clinical and subclinical inflammation in patients with familial Mediterranean fever and in heterozygous carriers of MEFV mutations. Rheumatology (Oxford). 2006;45:746-750. PMID 16403826; doi:10.1093/rheumatology/kei279", "link": "https://doi.org/10.1093/rheumatology/kei279", "areas": ["A", "B", "D", "G"], "unverified": false}, {"key": "Lachmann2007", "text": "Lachmann HJ, Goodman HJ, Gilbertson JA, Gallimore JR, Sabin CA, Gillmore JD, Hawkins PN. Natural history and outcome in systemic AA amyloidosis. N Engl J Med. 2007;356(23):2361–2371. PMID 17554117. doi:10.1056/NEJMoa070265.", "link": "https://doi.org/10.1056/NEJMoa070265", "areas": ["D", "E"], "unverified": false}, {"key": "Lachmann2014", "text": "Lachmann HJ, Papa R, Gerhold K, et al. The phenotype of TNF receptor-associated autoinflammatory syndrome (TRAPS) at presentation: a series of 158 cases from the Eurofever/EUROTRAPS international registry. Ann Rheum Dis. 2014;73(12):2160–2167. PMID 23965844. doi:10.1136/annrheumdis-2013-204184", "link": "https://doi.org/10.1136/annrheumdis-2013-204184", "areas": ["B"], "unverified": false}, {"key": "Lachmann2017", "text": "Lachmann HJ. Periodic fever syndromes. Best Pract Res Clin Rheumatol. 2017;31(4):596–609. PMID 29773275. doi:10.1016/j.berh.2017.12.001. Only the abstract was read; the CAPS attack-length details are standard teaching and were not checked against the full text.", "link": "https://doi.org/10.1016/j.berh.2017.12.001", "areas": ["B"], "unverified": false}, {"key": "Lancieri2023", "text": "Lancieri M, Bustaffa M, Palmeri S, et al. An update on familial Mediterranean fever. Int J Mol Sci. 2023;24(11):9584. PMID 37298536. doi:10.3390/ijms24119584. PMC10253709", "link": "https://doi.org/10.3390/ijms24119584", "areas": ["B"], "unverified": false}, {"key": "Langevitz1994", "text": "Langevitz P, Zemer D, Livneh A, Shemer J, Pras M. Protracted febrile myalgia in patients with familial Mediterranean fever. J Rheumatol. 1994;21:1708-1709. PMID 7799354", "link": "https://pubmed.ncbi.nlm.nih.gov/7799354/", "areas": ["A", "G"], "unverified": false}, {"key": "Leung2015", "text": "Leung YY, Yao Hui LL, Kraus VB. Colchicine—update on mechanisms of action and therapeutic uses. Semin Arthritis Rheum. 2015;45(3):341–350. PMID 26228647. PMCID PMC4656054. doi:10.1016/j.semarthrit.2015.06.013.", "link": "https://doi.org/10.1016/j.semarthrit.2015.06.013", "areas": ["D"], "unverified": false}, {"key": "Levinsky2023", "text": "Levinsky Y, Azani L, Shkalim Zemer V, Chodick G, Tal R, Harel L, Amarilyo G. Adherence to colchicine prophylaxis among patients with familial Mediterranean fever treated with interleukin-1 inhibitors. Semin Arthritis Rheum. 2023;61:152211. PMID 37201215. doi:10.1016/j.semarthrit.2023.152211.", "link": "https://doi.org/10.1016/j.semarthrit.2023.152211", "areas": ["G"], "unverified": false}, {"key": "Lidar2006", "text": "Lidar M, Yaqubov M, Zaks N, Ben-Horin S, Langevitz P, Livneh A. The prodrome: a prominent yet overlooked pre-attack manifestation of familial Mediterranean fever. J Rheumatol. 2006;33:1089-1092. PMID 16755655", "link": "https://pubmed.ncbi.nlm.nih.gov/16755655/", "areas": ["A"], "unverified": false}, {"key": "Lidar2008", "text": "Lidar M, Doron A, Kedem R, Yosepovich A, Langevitz P, Livneh A. Appendectomy in familial Mediterranean fever: clinical, genetic and pathological findings. Clin Exp Rheumatol. 2008;26(4):568–573. PMID 18799086.", "link": "https://pubmed.ncbi.nlm.nih.gov/18799086/", "areas": ["B", "G"], "unverified": false}, {"key": "Lidor2021", "text": "Lidor I, Tiosano S, Sharif K, Amital H, Cohen AD, Amital D. The risk of depression and anxiety in patients with familial Mediterranean fever: a cross-sectional study. J Affect Disord. 2021;292:695-699. PMID 34157665. DOI 10.1016/j.jad.2021.05.113.", "link": "https://doi.org/10.1016/j.jad.2021.05.113", "areas": ["E"], "unverified": false}, {"key": "LitGap-Baricitinib", "text": "Literature gap: PubMed/web searches for baricitinib in FMF return only secondary mentions alongside tofacitinib; no dedicated case report or series located as of October 2026.", "link": "", "areas": ["F"], "unverified": false}, {"key": "LitGap-Editing", "text": "Literature gap: no published preclinical or clinical base-editing, prime-editing or CRISPR-correction study of MEFV in human hematopoietic stem cells located as of October 2026.", "link": "", "areas": ["F"], "unverified": false}, {"key": "LitGap-GSDMD", "text": "Literature gap: no published trial or case series of disulfiram, dimethyl fumarate, necrosulfonamide or any other GSDMD inhibitor in FMF as of October 2026.", "link": "", "areas": ["F"], "unverified": false}, {"key": "LitGap-RNA", "text": "Literature gap: no siRNA, ASO or RNA-editing therapeutic candidate against MEFV/pyrin located in the literature or in ClinicalTrials.gov as of October 2026; commercial MEFV siRNAs are research reagents.", "link": "", "areas": ["F"], "unverified": false}, {"key": "LitGap-SmallMolecule", "text": "Literature gap: no pyrin-selective small-molecule inhibitor, PKN-activator drug candidate, or 14-3-3/pyrin stabilizer reported; searches return NLRP3 (pyrin-domain) chemistry instead.", "link": "", "areas": ["F"], "unverified": false}, {"key": "Liu2016", "text": "Liu X, Zhang Z, Ruan J, Pan Y, Magupalli VG, Wu H, Lieberman J. Inflammasome-activated gasdermin D causes pyroptosis by forming membrane pores. Nature. 2016;535(7610):153-158. PMID: 27383986. DOI: 10.1038/nature18629", "link": "https://doi.org/10.1038/nature18629", "areas": ["C"], "unverified": false}, {"key": "Livneh1994", "text": "Livneh A, Zemer D, Langevitz P, Laor A, Sohar E, Pras M. Colchicine treatment of AA amyloidosis of familial Mediterranean fever. An analysis of factors affecting outcome. Arthritis Rheum. 1994;37(12):1804–1811. PMID 7986228. doi:10.1002/art.1780371215.", "link": "https://doi.org/10.1002/art.1780371215", "areas": ["D"], "unverified": false}, {"key": "Livneh1997", "text": "Livneh A, Langevitz P, Zemer D, et al. Criteria for the diagnosis of familial Mediterranean fever. Arthritis Rheum. 1997;40:1879-1885. PMID 9336425; doi:10.1002/art.1780401023", "link": "https://doi.org/10.1002/art.1780401023", "areas": ["A", "B", "G"], "unverified": false}, {"key": "Lu2014", "text": "Lu A, Magupalli VG, Ruan J, Yin Q, Atianand MK, Vos MR, Schroder GF, Fitzgerald KA, Wu H, Egelman EH. Unified polymerization mechanism for the assembly of ASC-dependent inflammasomes. Cell. 2014;156(6):1193-1206. PMID: 24630722. DOI: 10.1016/j.cell.2014.02.008", "link": "https://doi.org/10.1016/j.cell.2014.02.008", "areas": ["C"], "unverified": false}, {"key": "Maaser2019", "text": "Maaser C, Sturm A, Vavricka SR, et al. ECCO-ESGAR Guideline for Diagnostic Assessment in IBD Part 1: initial diagnosis, monitoring of known IBD, detection of complications. J Crohns Colitis. 2019;13(2):144–164. PMID 30137275. doi:10.1093/ecco-jcc/jjy113", "link": "https://doi.org/10.1093/ecco-jcc/jjy113", "areas": ["B"], "unverified": false}, {"key": "Magnotti2019", "text": "Magnotti F, Lefeuvre L, Benezech S, Malsot T, et al., Henry T. Pyrin dephosphorylation is sufficient to trigger inflammasome activation in familial Mediterranean fever patients. EMBO Molecular Medicine. 2019;11(11):e10547. PMID: 31589380. DOI: 10.15252/emmm.201910547", "link": "https://doi.org/10.15252/emmm.201910547", "areas": ["C"], "unverified": false}, {"key": "Magnotti2022", "text": "Magnotti F, Chirita D, Dalmon S, Martin A, et al., Henry T. Steroid hormone catabolites activate the pyrin inflammasome through a non-canonical mechanism. Cell Reports. 2022;41(2):111472. PMID: 36223753. DOI: 10.1016/j.celrep.2022.111472", "link": "https://doi.org/10.1016/j.celrep.2022.111472", "areas": ["C"], "unverified": false}, {"key": "Majeed2000", "text": "Majeed HA, Ghandour K, Shahin HM. The acute scrotum in Arab children with familial Mediterranean fever. Pediatr Surg Int. 2000;16:72-74. PMID 10663841; doi:10.1007/s003830050019", "link": "https://doi.org/10.1007/s003830050019", "areas": ["A", "G"], "unverified": false}, {"key": "Makay2009", "text": "Makay B, Unsal E, Arslan N, Varni JW. Health-related quality of life of school-age children with familial Mediterranean fever. Clin Exp Rheumatol. 2009;27(2 Suppl 53):S96-S101. PMID 19796543.", "link": "https://pubmed.ncbi.nlm.nih.gov/19796543/", "areas": ["E"], "unverified": false}, {"key": "Mansfield2001", "text": "Mansfield E, Chae JJ, Komarow HD, Brotz TM, Frucht DM, Aksentijevich I, Kastner DL. The familial Mediterranean fever protein, pyrin, associates with microtubules and colocalizes with actin filaments. Blood. 2001;98(3):851-859. PMID: 11468188. DOI: 10.1182/blood.V98.3.851", "link": "https://doi.org/10.1182/blood.V98.3.851", "areas": ["C"], "unverified": false}, {"key": "Mansueto2022", "text": "Mansueto P, Seidita A, Chiavetta M, Genovese D, Giuliano A, Priano W, Carroccio A, Casuccio A, Amodio E. Familial Mediterranean fever and diet: a narrative review of the scientific literature. Nutrients. 2022;14(15):3216. PMID 35956392. DOI 10.3390/nu14153216.", "link": "https://doi.org/10.3390/nu14153216", "areas": ["E"], "unverified": false}, {"key": "MarekYagel2009", "text": "Marek-Yagel D, Berkun Y, Padeh S, et al. Clinical disease among patients heterozygous for familial Mediterranean fever. Arthritis Rheum. 2009;60(6):1862–1866. PMID 19479871. doi:10.1002/art.24570", "link": "https://doi.org/10.1002/art.24570", "areas": ["B"], "unverified": false}, {"key": "Masters2016", "text": "Masters SL, Lagou V, Jéru I, et al. Familial autoinflammation with neutrophilic dermatosis reveals a regulatory mechanism of pyrin activation. Sci Transl Med. 2016;8(332):332ra45. PMID 27030597. doi:10.1126/scitranslmed.aaf1471", "link": "https://doi.org/10.1126/scitranslmed.aaf1471", "areas": ["B", "C"], "unverified": false}, {"key": "MEFVsiRNA2014", "text": "siRNA-mediated MEFV silencing in THP-1 monocytic cells: transcriptome and microRNA effects. EULAR 2014 abstract. Ann Rheum Dis. 2014;73(Suppl 2):344. https://ard.bmj.com/content/73/Suppl_2/344.4 ; related pyrin/IRF2 abstract PMCID PMC3952637. (conference abstracts; authors unverified)", "link": "https://ard.bmj.com/content/73/Suppl_2/344.4", "areas": ["F"], "unverified": true, "note": "EULAR conference abstract in an Annals of the Rheumatic Diseases supplement. Such supplements are not indexed individually, so no alternative location exists. Treat as a conference abstract, not a peer-reviewed result."}, {"key": "Melikoglu2000", "text": "Melikoğlu M, Ozdoğan H, Korkmaz C, et al. A survey of phenotype II in familial Mediterranean fever. Ann Rheum Dis. 2000;59(11):910–913. PMID 11053071. doi:10.1136/ard.59.11.910", "link": "https://doi.org/10.1136/ard.59.11.910", "areas": ["B", "E"], "unverified": false}, {"key": "Mertz2025", "text": "Mertz P, Hentgen V, Georgin-Lavialle S. Could tocilizumab be used in familial Mediterranean fever? A systematic review. Rheumatology (Oxford). 2025;64(1):12-21. PMID 38950176. DOI 10.1093/rheumatology/keae338.", "link": "https://doi.org/10.1093/rheumatology/keae338", "areas": ["E"], "unverified": false}, {"key": "Migita2012", "text": "Migita K, Uehara R, Nakamura Y, et al. Familial Mediterranean fever in Japan. Medicine (Baltimore). 2012;91:337-343. PMID 23111802; doi:10.1097/MD.0b013e318277cf75", "link": "https://doi.org/10.1097/MD.0b013e318277cf75", "areas": ["A"], "unverified": false}, {"key": "Migita2016", "text": "Migita K, Izumi Y, Jiuchi Y, et al. Familial Mediterranean fever is no longer a rare disease in Japan. Arthritis Res Ther. 2016;18:175. PMID 27473114; PMCID PMC4967332; doi:10.1186/s13075-016-1071-5", "link": "https://doi.org/10.1186/s13075-016-1071-5", "areas": ["A"], "unverified": false}, {"key": "Milhavet2008", "text": "Milhavet F, Cuisset L, Hoffman HM, et al. The infevers autoinflammatory mutation online registry: update with new genes and functions. Hum Mutat. 2008;29:803-808. PMID 18409191; doi:10.1002/humu.20720", "link": "https://doi.org/10.1002/humu.20720", "areas": ["A", "B"], "unverified": false}, {"key": "Milledge2002", "text": "Milledge J, Shaw PJ, Mansour A, Williamson S, Bennetts B, Roscioli T, Curtin J, Christodoulou J. Allogeneic bone marrow transplantation: cure for familial Mediterranean fever. Blood. 2002;100(3):774-777. doi:10.1182/blood-2002-02-0651. PMID 12130485. (Note: Blood, not The Lancet.)", "link": "https://doi.org/10.1182/blood-2002-02-0651", "areas": ["F"], "unverified": false}, {"key": "Mirioglu2024", "text": "Mirioglu S, Uludag O, Hurdogan O, Kumru G, Berke I, Doumas SA, Frangou E, Gul A. AA amyloidosis: a contemporary view. Curr Rheumatol Rep. 2024;26(7):248-259. PMID 38568326. PMCID PMC11219434. DOI 10.1007/s11926-024-01147-8.", "link": "https://doi.org/10.1007/s11926-024-01147-8", "areas": ["E"], "unverified": false}, {"key": "Misawa2013", "text": "Misawa T, Takahama M, Kozaki T, Lee H, Zou J, Saitoh T, Akira S. Microtubule-driven spatial arrangement of mitochondria promotes activation of the NLRP3 inflammasome. Nat Immunol. 2013;14(5):454–460. PMID 23502856. doi:10.1038/ni.2550.", "link": "https://doi.org/10.1038/ni.2550", "areas": ["D"], "unverified": false}, {"key": "Moghaddas2017", "text": "Moghaddas F, Llamas R, De Nardo D, Martinez-Banaclocha H, et al., Masters SL. A novel Pyrin-Associated Autoinflammation with Neutrophilic Dermatosis mutation further defines 14-3-3 binding of pyrin and distinction to Familial Mediterranean Fever. Annals of the Rheumatic Diseases. 2017;76(12):2085-2094. PMID: 28835462. DOI: 10.1136/annrheumdis-2017-211473", "link": "https://doi.org/10.1136/annrheumdis-2017-211473", "areas": ["C"], "unverified": false}, {"key": "Nakagawa2021", "text": "Mori T, Saburi M, Hagihara M, Mori M, Yamazaki R, Kato J. Long-term remission of cryopyrin-associated periodic syndrome after allogeneic haematopoietic stem cell transplantation. Ann Rheum Dis. 2021;80(4):542-543. PMID 33158880. doi:10.1136/annrheumdis-2020-218695", "link": "https://pubmed.ncbi.nlm.nih.gov/33158880/", "areas": ["F"], "unverified": false, "note": "Earlier entry misdescribed this as a review stating no CAPS patient had been transplanted. It is a case report of long-term remission after transplantation."}, {"key": "NCT00582907", "text": "Rilonacept for treatment of familial Mediterranean fever. https://clinicaltrials.gov/study/NCT00582907", "link": "https://clinicaltrials.gov/study/NCT00582907", "areas": ["F"], "unverified": false}, {"key": "NCT01705756", "text": "Kineret (anakinra) in adult patients with colchicine-resistant FMF. https://clinicaltrials.gov/study/NCT01705756", "link": "https://clinicaltrials.gov/study/NCT01705756", "areas": ["F"], "unverified": false}, {"key": "NCT03113760", "text": "Therapeutic use of tadekinig alfa in NLRC4 mutation and XIAP deficiency (randomized withdrawal; completed 2023). https://clinicaltrials.gov/study/NCT03113760", "link": "https://clinicaltrials.gov/study/NCT03113760", "areas": ["F"], "unverified": false}, {"key": "NCT03446209", "text": "Tocilizumab for the treatment of familial Mediterranean fever (TOFFIFE). https://clinicaltrials.gov/study/NCT03446209", "link": "https://clinicaltrials.gov/study/NCT03446209", "areas": ["F"], "unverified": false}, {"key": "NCT03512314", "text": "Tadekinig alfa open-label extension. https://classic.clinicaltrials.gov/ct2/show/NCT03512314", "link": "https://classic.clinicaltrials.gov/ct2/show/NCT03512314", "areas": ["F"], "unverified": false}, {"key": "NCT04478409", "text": "Functional test for familial Mediterranean fever screening - 2 (recruiting, start 2021). https://clinicaltrials.gov/study/NCT04478409", "link": "https://clinicaltrials.gov/study/NCT04478409", "areas": ["F"], "unverified": false}, {"key": "NCT04868968", "text": "Safety, tolerability and efficacy of DFV890 in familial cold autoinflammatory syndrome (Phase 2, completed). https://clinicaltrials.gov/study/NCT04868968", "link": "https://clinicaltrials.gov/study/NCT04868968", "areas": ["F"], "unverified": false, "note": "Recorded in the registry as COMPLETED, with an actual enrolment of 4 participants."}, {"key": "NCT05092776", "text": "Efficacy and safety of RPH-104 (goflikicept) for resolution and prevention of recurring attacks in adults with colchicine-resistant/intolerant FMF. https://clinicaltrials.gov/study/NCT05092776", "link": "https://clinicaltrials.gov/study/NCT05092776", "areas": ["F"], "unverified": false}, {"key": "NCT05190991", "text": "Safety and efficacy of RPH-104 to prevent recurrent fever attacks in colchicine-resistant/intolerant FMF (Phase 2 open-label extension). https://clinicaltrials.gov/study/NCT05190991", "link": "https://clinicaltrials.gov/study/NCT05190991", "areas": ["F"], "unverified": false}, {"key": "NCT05456880", "text": "BEACON: BEAM-101 in severe sickle cell disease. https://clinicaltrials.gov/study/NCT05456880", "link": "https://clinicaltrials.gov/study/NCT05456880", "areas": ["F"], "unverified": false}, {"key": "NCT06285539", "text": "Drug rediscovery for rare immune-mediated inflammatory diseases (filgotinib, Phase 2). https://clinicaltrials.gov/study/NCT06285539", "link": "https://clinicaltrials.gov/study/NCT06285539", "areas": ["F"], "unverified": false}, {"key": "NCT06336733", "text": "On-demand anakinra for painful attacks in colchicine-resistant FMF (Phase 3, start June 2024). https://clinicaltrials.gov/study/NCT06336733", "link": "https://clinicaltrials.gov/study/NCT06336733", "areas": ["F"], "unverified": false}, {"key": "NOMID-UCBT2023", "text": "Zhao C, Liu C, Li X. Umbilical cord blood transplantation for neonatal-onset multisystem inflammatory disease (NOMID). Front Immunol. 2023;14:1291345. PMID 38250066. PMCID PMC10799342. Open access.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10799342/", "areas": ["F"], "unverified": false}, {"key": "Nunes2021", "text": "Espinoza JL, Kamio K, Lam VQ, Takami A. The Impact of NLRP3 Activation on Hematopoietic Stem Cell Transplantation. Int J Mol Sci. 2021;22(21):11845. PMID 34769275. PMCID PMC8584591. doi:10.3390/ijms222111845", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8584591/", "areas": ["F"], "unverified": false, "note": "Earlier entry named the wrong first author."}, {"key": "Onen2004", "text": "Onen F, Sumer H, Turkay S, Akyurek O, Tunca M, Ozdogan H. Increased frequency of familial Mediterranean fever in Central Anatolia, Turkey. Clin Exp Rheumatol. 2004;22(4 Suppl 34):S31-33. PMID 15515780", "link": "https://pubmed.ncbi.nlm.nih.gov/15515780/", "areas": ["A"], "unverified": false}, {"key": "Ozdemir2021", "text": "Özdemir Atmaca FM, Gülez N, Makay B. Evaluation of the international severity score for FMF (ISSF) scores in Turkish children diagnosed with FMF: a single-center experience. Clin Rheumatol. 2021;40(8):3219–3225. PMID 33619627. doi:10.1007/s10067-021-05652-4. (Abstract read; the first author's given names should be confirmed against the journal page before publishing.)", "link": "https://doi.org/10.1007/s10067-021-05652-4", "areas": ["G"], "unverified": false}, {"key": "Ozen1998", "text": "Ozen S, Karaaslan Y, Ozdemir O, et al. Prevalence of juvenile chronic arthritis and familial Mediterranean fever in Turkey: a field study. J Rheumatol. 1998;25:2445-2449. PMID 9858443", "link": "https://pubmed.ncbi.nlm.nih.gov/9858443/", "areas": ["A"], "unverified": false}, {"key": "Ozen2014", "text": "Ozen S, Demirkaya E, Duzova A, Erdogan O, Erken E, Gul A, Kasapcopur O, et al. FMF50: a score for assessing outcome in familial Mediterranean fever. Ann Rheum Dis. 2014;73(5):897–901. PMID 24570027. doi:10.1136/annrheumdis-2013-204719.", "link": "https://doi.org/10.1136/annrheumdis-2013-204719", "areas": ["D", "G"], "unverified": false}, {"key": "Ozen2016", "text": "Ozen S, Demirkaya E, Erer B, et al. EULAR recommendations for the management of familial Mediterranean fever. Ann Rheum Dis. 2016;75(4):644–651. PMID 26802180. doi:10.1136/annrheumdis-2015-208690", "link": "https://doi.org/10.1136/annrheumdis-2015-208690", "areas": ["B", "D", "E", "F", "G"], "unverified": false}, {"key": "Ozen2017", "text": "Özen S, Batu ED, Demir S. Familial Mediterranean fever: recent developments in pathogenesis and new recommendations for management. Front Immunol. 2017;8:253. doi:10.3389/fimmu.2017.00253. PMC5362626", "link": "https://doi.org/10.3389/fimmu.2017.00253", "areas": ["B", "D", "G"], "unverified": false}, {"key": "Ozen2020", "text": "Ozen S, Ben-Chetrit E, Foeldvari I, Amarilyo G, Ozdogan H, Vanderschueren S, Marzan K, Kahlenberg JM, Dekker E, De Benedetti F, Kone-Paut I. Long-term efficacy and safety of canakinumab in patients with colchicine-resistant familial Mediterranean fever: results from the randomised phase III CLUSTER trial. Ann Rheum Dis. 2020;79(10):1362-1369. PMID 32571870. PMCID PMC7509527. Open access. doi:10.1136/annrheumdis-2020-217419", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7509527/", "areas": ["F"], "unverified": false}, {"key": "Ozen2021", "text": "Özen S, Sag E, Ben-Chetrit E, Gattorno M, Gül A, Hashkes PJ, Kone-Paut I, Lachmann HJ, Tsitsami E, Twilt M, et al. Defining colchicine resistance/intolerance in patients with familial Mediterranean fever: a modified-Delphi consensus approach. Rheumatology (Oxford). 2021;60(8):3799–3808. PMID 33331943. doi:10.1093/rheumatology/keaa863.", "link": "https://doi.org/10.1093/rheumatology/keaa863", "areas": ["D", "E", "G"], "unverified": false}, {"key": "Ozen2025", "text": "Ozen S, Sağ E, Oton T, Gül A, Sieiro Santos C, Bayraktar D, Proft FN, Lachmann HJ, Kuemmerle Deschner J, Gattorno M, et al., Carmona L. EULAR/PReS endorsed recommendations for the management of familial Mediterranean fever (FMF): 2024 update. Ann Rheum Dis. 2025;84(6):899–909. PMID 40234174. doi:10.1016/j.ard.2025.01.028. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1016/j.ard.2025.01.028", "areas": ["D", "E", "G", "F"], "unverified": false, "aliases": ["EULAR2025"], "note": "Full typeset text read for the nursing research pass, so recommendation numbers, evidence levels and agreement figures quoted in this app come from the article itself rather than its abstract. Its two supplementary tables were not read."}, {"key": "Ozkurt2025", "text": "Özkurt S, Cansu DÜ, Yildirim U, Yaldir E, Yalçin AU, Korkmaz C. From ulcerative colitis to amyloid storm: a case-based review. Rheumatol Int. 2025;45(11):263. PMID 41165831. doi:10.1007/s00296-025-06015-x.", "link": "https://doi.org/10.1007/s00296-025-06015-x", "areas": ["G"], "unverified": false}, {"key": "Ozturk2022", "text": "Öztürk K, Coşkuner T, Baglan E, Sönmez HE, Yener GO, et al. Real-life data from the largest pediatric familial Mediterranean fever cohort. Front Pediatr. 2022;9:805919. DOI 10.3389/fped.2021.805919.", "link": "https://doi.org/10.3389/fped.2021.805919", "areas": ["E", "G"], "unverified": false}, {"key": "Papadopoulos2008", "text": "Papadopoulos VP, Giaglis S, Mitroulis I, Ritis K. The population genetics of familial Mediterranean fever: a meta-analysis study. Ann Hum Genet. 2008;72:752-761. PMID 18691160; doi:10.1111/j.1469-1809.2008.00471.x", "link": "https://doi.org/10.1111/j.1469-1809.2008.00471.x", "areas": ["A"], "unverified": false}, {"key": "Park2016", "text": "Park YH, Wood G, Kastner DL, Chae JJ. Pyrin inflammasome activation and RhoA signaling in the autoinflammatory diseases FMF and HIDS. Nat Immunol. 2016;17:914-921. PMID 27270401; PMCID PMC4955684; doi:10.1038/ni.3457", "link": "https://doi.org/10.1038/ni.3457", "areas": ["A", "B", "C", "D", "F"], "unverified": false}, {"key": "Park2020", "text": "Park YH, Remmers EF, Lee W, et al. Ancient familial Mediterranean fever mutations in human pyrin and resistance to Yersinia pestis. Nat Immunol. 2020;21:857-867. PMID 32601469; PMCID PMC7381377; doi:10.1038/s41590-020-0705-6", "link": "https://doi.org/10.1038/s41590-020-0705-6", "areas": ["A"], "unverified": false}, {"key": "Parlar2024", "text": "Parlar K, Ates MB, Onal ME, et al. Factors triggering familial Mediterranean fever attacks, do they really exist? Intern Emerg Med. 2024;19:1007-1013. PMID 38488998; PMCID PMC11186929; doi:10.1007/s11739-024-03576-w", "link": "https://doi.org/10.1007/s11739-024-03576-w", "areas": ["A", "E"], "unverified": false}, {"key": "Piram2011", "text": "Piram M, Frenkel J, Gattorno M, Ozen S, Lachmann HJ, Goldbach-Mansky R, et al. A preliminary score for the assessment of disease activity in hereditary recurrent fevers: results from the AIDAI (Auto-Inflammatory Diseases Activity Index) Consensus Conference. Ann Rheum Dis. 2011;70(2):309–314. PMID 21081528. doi:10.1136/ard.2010.132613.", "link": "https://doi.org/10.1136/ard.2010.132613", "areas": ["G"], "unverified": false}, {"key": "Piram2014", "text": "Piram M, Koné-Paut I, Lachmann HJ, Frenkel J, Ozen S, Kuemmerle-Deschner J, et al. Validation of the auto-inflammatory diseases activity index (AIDAI) for hereditary recurrent fever syndromes. Ann Rheum Dis. 2014;73(12):2168–2173. PMID 24026675. doi:10.1136/annrheumdis-2013-203666.", "link": "https://doi.org/10.1136/annrheumdis-2013-203666", "areas": ["G"], "unverified": false}, {"key": "Piskin2022", "text": "Piskin D, Arici ZS, Konukbay D, et al. Number of episodes can be used as a disease activity measure in familial Mediterranean fever. Front Pediatr. 2022;10:822473. PMID 35573940. PMCID PMC9091585. doi:10.3389/fped.2022.822473.", "link": "https://doi.org/10.3389/fped.2022.822473", "areas": ["G"], "unverified": false}, {"key": "Polat2016", "text": "Polat A, Acikel C, Sozeri B, Dursun I, Kasapcopur O, Gulez N, Simsek D, Saldir M, et al. Comparison of the efficacy of once- and twice-daily colchicine dosage in pediatric patients with familial Mediterranean fever—a randomized controlled noninferiority trial. Arthritis Res Ther. 2016;18:85. PMID 27055417. PMCID PMC4823910. doi:10.1186/s13075-016-0980-7.", "link": "https://doi.org/10.1186/s13075-016-0980-7", "areas": ["D"], "unverified": false}, {"key": "Pras1992", "text": "Pras E, Aksentijevich I, Gruberg L, et al. Mapping of a gene causing familial Mediterranean fever to the short arm of chromosome 16. N Engl J Med. 1992;326:1509-1513. PMID 1579134; doi:10.1056/NEJM199206043262301", "link": "https://doi.org/10.1056/NEJM199206043262301", "areas": ["A"], "unverified": false}, {"key": "Pras1998", "text": "Pras M. Familial Mediterranean fever: from the clinical syndrome to the cloning of the pyrin gene. Scand J Rheumatol. 1998;27:92-97. PMID 9572633; doi:10.1080/030097498440949", "link": "https://doi.org/10.1080/030097498440949", "areas": ["A", "B"], "unverified": false}, {"key": "PRINTO2016G", "text": "PRINTO/PReS. Familial Mediterranean Fever – information for patients and families. IRCCS Istituto G. Gaslini / Università di Genova. https://www.printo.it/pediatric-rheumatology/GB/info/20/Familial-Mediterranean-Fever (patient-education source; no named authors; page read in full for this file).", "link": "https://www.printo.it/pediatric-rheumatology/GB/info/20/Familial-Mediterranean-Fever", "areas": ["G", "A"], "unverified": false, "aliases": ["PRINTO2016"]}, {"key": "ProcalcitoninFMF", "text": "Procalcitonin in FMF attacks — two conflicting Turkish studies, neither full text read (unverified): (a) Yüksel S, et al. The value of procalcitonin measurements in children with familial Mediterranean fever. Rheumatol Int. 2012;32(11):3443–3447. doi:10.1007/s00296-011-2206-2 (median procalcitonin 0.044 ng/mL during attacks vs 0.028 ng/mL attack-free); (b) an Ankara University study evaluating procalcitonin and factor VIII as acute-phase markers in FMF, concluding they cannot be used diagnostically during attacks, published in Turkish and indexed at https://dergiler.ankara.edu.tr/items/7e676fc8-9301-4ccb-a2ca-c757a1d4e35a. Cohorts, assays and cut-offs must be checked before either figure is published.", "link": "https://dergiler.ankara.edu.tr/items/7e676fc8-9301-4ccb-a2ca-c757a1d4e35a", "areas": ["G"], "unverified": true}, {"key": "PubMedSweep2026", "text": "PubMed query `\"familial Mediterranean fever\" AND (\"stem cell transplantation\" OR \"bone marrow transplantation\")`, 22 results, retrieved 16 October 2026; only [Milledge2002] reports allogeneic HSCT in an FMF patient.", "link": "", "areas": ["F"], "unverified": false}, {"key": "PubMedSweepNursing2026", "text": "Own literature sweep for this file, October 2026: PubMed query \"familial Mediterranean fever\" AND (nursing OR nurse), all years, 25 records, of which several use \"nursing\" in the breastfeeding sense (https://pubmed.ncbi.nlm.nih.gov/?term=%22familial+Mediterranean+fever%22+AND+(nursing+OR+nurse)); plus targeted searches for FMF with nurse-led education, adherence interventions, teach-back and motivational interviewing. Documents the absence of a nursing clinical practice guideline for FMF, of a nurse-led adherence trial, and of FMF-specific teach-back or motivational-interviewing studies. A negative search result, not a publication.", "link": "https://pubmed.ncbi.nlm.nih.gov/?term=%22familial+Mediterranean+fever%22+AND+(nursing+OR+nurse", "areas": ["G"], "unverified": false}, {"key": "Rathkey2018", "text": "Rathkey JK, Zhao J, Liu Z, Chen Y, Yang J, Kondolf HC, Benson BL, Chirieleison SM, Huang AY, Dubyak GR, Xiao TS, Li X, Abbott DW. Chemical disruption of the pyroptotic pore-forming protein gasdermin D inhibits inflammatory cell death and sepsis. Sci Immunol. 2018;3(26):eaat2738. PMID 30143556. PMCID PMC6462819.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6462819/", "areas": ["F"], "unverified": false}, {"key": "Reimann1948", "text": "Reimann HA. Periodic disease; a probable syndrome including periodic fever, benign paroxysmal peritonitis, cyclic neutropenia and intermittent arthralgia. JAMA. 1948;136:239-244. PMID 18920089; doi:10.1001/jama.1948.02890210023004", "link": "https://doi.org/10.1001/jama.1948.02890210023004", "areas": ["A"], "unverified": false}, {"key": "RheumNow2025", "text": "RheumNow. 2024 management familial Mediterranean fever recommendations (summary of the EULAR/PReS 2024 update). https://rheumnow.com/news/2024-management-familial-mediterranean-fever-recommendations (Secondary source.)", "link": "https://rheumnow.com/news/2024-management-familial-mediterranean-fever-recommendations", "areas": ["E"], "unverified": false}, {"key": "Richards2001", "text": "Richards N, Schaner P, Diaz A, Stuckey J, Shelden E, Wadhwa A, Gumucio DL. Interaction between pyrin and the apoptotic speck protein (ASC) modulates ASC-induced apoptosis. Journal of Biological Chemistry. 2001;276(42):39320-39329. PMID: 11498534. DOI: 10.1074/jbc.M104730200", "link": "https://doi.org/10.1074/jbc.M104730200", "areas": ["C"], "unverified": false}, {"key": "Ritschl2021", "text": "Ritschl V, Stamm TA, Aletaha D, Bijlsma JWJ, Böhm P, Dragoi RG, Dures E, Estévez-López F, Gossec L, Iagnocco A, Marques A, Moholt E, Nudel M, van den Bemt BJF, Viktil K, Voshaar M, de Thurah A, Carmona L. 2020 EULAR points to consider for the prevention, screening, assessment and management of non-adherence to treatment in people with rheumatic and musculoskeletal diseases for use in clinical practice. Ann Rheum Dis. 2021;80(6):707–713. PMID 33355152. doi:10.1136/annrheumdis-2020-218986. (Abstract read plus a secondary summary of the four-phase scheme; the wording of the four overarching principles and the nine individual points to consider was not read.)", "link": "https://doi.org/10.1136/annrheumdis-2020-218986", "areas": ["G"], "unverified": false}, {"key": "Rochdi1994", "text": "Rochdi M, Sabouraud A, Girre C, Venet R, Scherrmann JM. Pharmacokinetics and absolute bioavailability of colchicine after i.v. and oral administration in healthy human volunteers and elderly subjects. Eur J Clin Pharmacol. 1994;46(4):351–354. PMID 7957521. doi:10.1007/BF00194404.", "link": "https://doi.org/10.1007/BF00194404", "areas": ["D"], "unverified": false}, {"key": "Rogers1989", "text": "Rogers DB, Shohat M, Petersen GM, et al. Familial Mediterranean fever in Armenians: autosomal recessive inheritance with high gene frequency. Am J Med Genet. 1989;34:168-172. PMID 2816993; doi:10.1002/ajmg.1320340206", "link": "https://doi.org/10.1002/ajmg.1320340206", "areas": ["A"], "unverified": false}, {"key": "Rowczenio2015", "text": "Rowczenio D, Iancu D, Trojer H, et al. Deletion in MEFV resulting in the loss of p.M694 residue as the cause of autosomal dominant familial Mediterranean fever in North Western European Caucasians — a case series and genetic exploration. Pediatr Rheumatol Online J. 2015;13(Suppl 1):O42. doi:10.1186/1546-0096-13-S1-O42. PMC4596970. Conference abstract; figures were taken from a search summary of the abstract.", "link": "https://doi.org/10.1186/1546-0096-13-S1-O42", "areas": ["B"], "unverified": false}, {"key": "Sag2020", "text": "Sag E, Demirel D, Demir S, et al. Performance of the new \"Eurofever/PRINTO classification criteria\" in FMF patients. Semin Arthritis Rheum. 2020;50(1):172–175. PMID 31471011. doi:10.1016/j.semarthrit.2019.08.004", "link": "https://doi.org/10.1016/j.semarthrit.2019.08.004", "areas": ["B"], "unverified": false}, {"key": "Sag2025", "text": "Sag E, Otón T, Carmona L, Ozen S. Efficacy and safety of treatments in familial Mediterranean fever and its complications: a systematic review informing the EULAR/PReS recommendations for familial Mediterranean fever. Ann Rheum Dis. 2025;84(11):1909-1927. PMID 40562663. DOI 10.1016/j.ard.2025.05.020.", "link": "https://doi.org/10.1016/j.ard.2025.05.020", "areas": ["E"], "unverified": false}, {"key": "Salehzadeh2026", "text": "Salehzadeh F, Molatefi R, Khoei F. JAK Inhibitors in Colchicine Resistant FMF Patients: A Case-Based Review. Mediterr J Rheumatol. 2026;37(3):603-607. doi:10.31138/mjr.281125.mrk", "link": "https://doi.org/10.31138/mjr.281125.mrk", "areas": ["F"], "unverified": false, "note": "Published as a case-based review, not a retrospective case series."}, {"key": "Sari2014", "text": "Sarı İ, Birlik M, Kasifoğlu T. Familial Mediterranean fever: an updated review. Eur J Rheumatol. 2014;1(1):21-33. PMID 27708867. DOI 10.5152/eurjrheum.2014.006.", "link": "https://doi.org/10.5152/eurjrheum.2014.006", "areas": ["E"], "unverified": false}, {"key": "SarrausteDeMenthiere2003", "text": "Sarrauste de Menthière C, Terrière S, Pugnère D, Ruiz M, Demaille J, Touitou I. INFEVERS: the Registry for FMF and hereditary inflammatory disorders mutations. Nucleic Acids Res. 2003;31:282-285. PMID 12520003; PMCID PMC165478; doi:10.1093/nar/gkg031", "link": "https://doi.org/10.1093/nar/gkg031", "areas": ["A", "B"], "unverified": false, "aliases": ["Sarrauste2003"]}, {"key": "Satis2025", "text": "Satiş H, Gül A, Ayan G, et al. Prevalence, incidence and geographic distribution of familial Mediterranean fever in Turkey: a national cohort study. Clin Exp Rheumatol. 2025;43:1709-1714. PMID 41031678; doi:10.55563/clinexprheumatol/pzbg88 (prevalence figure in the abstract looks internally inconsistent; see fact A)", "link": "https://doi.org/10.55563/clinexprheumatol/pzbg88", "areas": ["A"], "unverified": false}, {"key": "Schnappauf2019", "text": "Schnappauf O, Chae JJ, Kastner DL, Aksentijevich I. The pyrin inflammasome in health and disease. Frontiers in Immunology. 2019;10:1745. PMID: 31456795. DOI: 10.3389/fimmu.2019.01745", "link": "https://doi.org/10.3389/fimmu.2019.01745", "areas": ["C"], "unverified": false}, {"key": "SeverityScoreComparisons", "text": "Pras and Mor severity scores and their comparisons with the ISSF — originals not read (unverified). Primary sources to check before publishing: Pras E, Livneh A, Balow JE Jr, et al. Clinical differences between North African and Iraqi Jews with familial Mediterranean fever. Am J Med Genet. 1998;75(2):216–219 (the Pras severity score); Mor A, Shinar Y, Zaks N, et al. Evaluation of disease severity in familial Mediterranean fever. Semin Arthritis Rheum. 2005;35(1):57–64. doi:10.1016/j.semarthrit.2005.02.002. Comparison read as abstract only: Ozcan S, et al. Is the performance of the international severity scoring system for familial Mediterranean fever in children better than other scoring systems? Int J Clin Pract. 2021;75(11):e14678. PMID 34328662. doi:10.1111/ijcp.14678.", "link": "https://doi.org/10.1016/j.semarthrit.2005.02.002", "areas": ["G"], "unverified": true}, {"key": "Sezer2024", "text": "Sezer M, Çelikel E, Ekici Tekin Z, et al. Assessment of quality of life, school performance, and physical activity in adolescents with familial Mediterranean fever. Mod Rheumatol. 2024;34(2):405-409. PMID 36790108. DOI 10.1093/mr/road022.", "link": "https://doi.org/10.1093/mr/road022", "areas": ["E"], "unverified": false}, {"key": "Sherif2003", "text": "Sherif AM, Refaie AF, Sobh MA, Mohamed NA, Sheashaa HA, Ghoneim MA. Long-term outcome of live donor kidney transplantation for renal amyloidosis. Am J Kidney Dis. 2003;42(2):370-375. PMID 12900821. DOI 10.1016/S0272-6386(03)00676-0.", "link": "https://doi.org/10.1016/S0272-6386(03", "areas": ["E"], "unverified": false}, {"key": "Shi2015", "text": "Shi J, Zhao Y, Wang K, Shi X, Wang Y, Huang H, Zhuang Y, Cai T, Wang F, Shao F. Cleavage of GSDMD by inflammatory caspases determines pyroptotic cell death. Nature. 2015;526(7575):660-665. PMID: 26375003. DOI: 10.1038/nature15514", "link": "https://doi.org/10.1038/nature15514", "areas": ["C"], "unverified": false}, {"key": "Shinar2000", "text": "Shinar Y, Livneh A, Langevitz P, et al. Genotype-phenotype assessment of common genotypes among patients with familial Mediterranean fever. J Rheumatol. 2000;27(7):1703–1707. PMID 10914855.", "link": "https://pubmed.ncbi.nlm.nih.gov/10914855/", "areas": ["B"], "unverified": false}, {"key": "Shinar2012", "text": "Shinar Y, Obici L, Aksentijevich I, et al. Guidelines for the genetic diagnosis of hereditary recurrent fevers. Ann Rheum Dis. 2012;71(10):1599–1605. PMID 22661645. doi:10.1136/annrheumdis-2011-201271. PMC3500529", "link": "https://doi.org/10.1136/annrheumdis-2011-201271", "areas": ["B"], "unverified": false}, {"key": "Siegal1945", "text": "Siegal S. Benign paroxysmal peritonitis. Ann Intern Med. 1945;23(1):1-21. doi:10.7326/0003-4819-23-1-1 (verified in Crossref; not indexed in PubMed)", "link": "https://doi.org/10.7326/0003-4819-23-1-1", "areas": ["A"], "unverified": false}, {"key": "Siegal1949", "text": "Siegal S. Benign paroxysmal peritonitis [second series]. Gastroenterology. 1949;12:234-247. PMID 18124924; doi:10.1016/S0016-5085(49)80034-5", "link": "https://doi.org/10.1016/S0016-5085(49", "areas": ["A"], "unverified": false}, {"key": "Slobodnick2018", "text": "Slobodnick A, Shah B, Krasnokutsky S, Pillinger MH. Update on colchicine, 2017. Rheumatology (Oxford). 2018;57(suppl 1):i4–i11. PMID 29272515. PMCID PMC5850858. doi:10.1093/rheumatology/kex453.", "link": "https://doi.org/10.1093/rheumatology/kex453", "areas": ["D"], "unverified": false}, {"key": "Sohar1967", "text": "Sohar E, Gafni J, Pras M, Heller H. Familial Mediterranean fever. A survey of 470 cases and review of the literature. Am J Med. 1967;43:227-253. PMID 5340644; doi:10.1016/0002-9343(67)90167-2 (no abstract; specific numbers cited via Tufan2020)", "link": "https://doi.org/10.1016/0002-9343(67", "areas": ["A", "B", "E"], "unverified": false}, {"key": "Sonmez2016", "text": "Sönmez HE, Batu ED, Özen S. Familial Mediterranean fever: current perspectives. J Inflamm Res. 2016;9:13-20. PMID 27051312; PMCID PMC4803250; doi:10.2147/JIR.S91352", "link": "https://doi.org/10.2147/JIR.S91352", "areas": ["A", "B", "G"], "unverified": false}, {"key": "Sonmez2020", "text": "Sönmez AÖ, Sönmez HE, Çakan M, Yavuz M, Keskindemirci G, Aktay Ayaz N. The evaluation of anxiety, depression and quality of life scores of children and adolescents with familial Mediterranean fever. Rheumatol Int. 2020;40(5):757-763. PMID 31982954. DOI 10.1007/s00296-020-04519-2.", "link": "https://doi.org/10.1007/s00296-020-04519-2", "areas": ["E"], "unverified": false}, {"key": "SoonLaxer2017", "text": "Soon GS, Laxer RM. Approach to recurrent fever in childhood. Can Fam Physician. 2017;63(10):756–762. PMID 29025800. PMC5638471", "link": "https://pubmed.ncbi.nlm.nih.gov/29025800/", "areas": ["B"], "unverified": false}, {"key": "SorianoManna2012", "text": "Soriano A, Manna R. Familial Mediterranean fever: new phenotypes. Autoimmun Rev. 2012;12:31-37. PMID 22878273; doi:10.1016/j.autrev.2012.07.019", "link": "https://doi.org/10.1016/j.autrev.2012.07.019", "areas": ["A"], "unverified": false}, {"key": "Sotskiy2021", "text": "Sotskiy PO, Sotskaya OL, Hayrapetyan HS, Sarkisian TF, Yeghiazaryan AR, Atoyan SA, Ben-Chetrit E. Infertility causes and pregnancy outcome in patients with familial Mediterranean fever and controls. J Rheumatol. 2021;48(4):608-614. PMID 33004533. DOI 10.3899/jrheum.200574.", "link": "https://doi.org/10.3899/jrheum.200574", "areas": ["E"], "unverified": false}, {"key": "Stoffels2014", "text": "Stoffels M, Szperl A, Simon A, et al. MEFV mutations affecting pyrin amino acid 577 cause autosomal dominant autoinflammatory disease. Ann Rheum Dis. 2014;73(2):455–461. PMID 23505238. doi:10.1136/annrheumdis-2012-202580", "link": "https://doi.org/10.1136/annrheumdis-2012-202580", "areas": ["B"], "unverified": false}, {"key": "Suticen2021", "text": "Suticen E, Atas N, Guler AA, Akdogan O, Babaoğlu H, Satis H, Karadeniz H, Haznedaroglu S, Ozturk MA, Tufan A. Work productivity impairment in patients with familial Mediterranean fever and effects of interleukin-1 antagonists. Clin Rheumatol. 2021;40(7):2865-2871. PMID 33527168. DOI 10.1007/s10067-021-05617-7.", "link": "https://doi.org/10.1007/s10067-021-05617-7", "areas": ["E"], "unverified": false}, {"key": "Swanson2019", "text": "Swanson KV, Deng M, Ting JP. The NLRP3 inflammasome: molecular activation and regulation to therapeutics. Nature Reviews Immunology. 2019;19(8):477-489. PMID: 31036962. DOI: 10.1038/s41577-019-0165-0", "link": "https://doi.org/10.1038/s41577-019-0165-0", "areas": ["C"], "unverified": false}, {"key": "Tanatar2020", "text": "Tanatar A, Sönmez HE, Karadağ ŞG, et al. Performance of Tel-Hashomer, Livneh, pediatric and new Eurofever/PRINTO classification criteria for familial Mediterranean fever in a referral center. Rheumatol Int. 2020;40(1):21–27. PMID 31646357. doi:10.1007/s00296-019-04463-w", "link": "https://doi.org/10.1007/s00296-019-04463-w", "areas": ["B"], "unverified": false}, {"key": "Tanatar2021", "text": "Tanatar A, Karadağ ŞG, Çakan M, Sönmez HE, Ayaz NA. Age of onset as an influencing factor for disease severity in children with familial Mediterranean fever. Mod Rheumatol. 2021;31:219-222. PMID 31999206; doi:10.1080/14397595.2020.1719594", "link": "https://doi.org/10.1080/14397595.2020.1719594", "areas": ["A"], "unverified": false}, {"key": "Tekgoz2021", "text": "Tekgöz E, Çolak S, Çınar Fİ, Yılmaz S, Çınar M. Non-adherence to colchicine treatment is a common misevaluation in familial Mediterranean fever. Turk J Med Sci. 2021;51(5):2357–2363. PMID 33957721. doi:10.3906/sag-2102-328.", "link": "https://doi.org/10.3906/sag-2102-328", "areas": ["G"], "unverified": false}, {"key": "TerHaar2016", "text": "Ter Haar NM, Jeyaratnam J, Lachmann HJ, et al. The phenotype and genotype of mevalonate kinase deficiency: a series of 114 cases from the Eurofever registry. Arthritis Rheumatol. 2016;68(11):2795–2805. PMID 27213830. doi:10.1002/art.39763", "link": "https://doi.org/10.1002/art.39763", "areas": ["B"], "unverified": false}, {"key": "Terkeltaub2011", "text": "Terkeltaub RA, Furst DE, Digiacinto JL, Kook KA, Davis MW. Novel evidence-based colchicine dose-reduction algorithm to predict and prevent colchicine toxicity in the presence of cytochrome P450 3A4/P-glycoprotein inhibitors. Arthritis Rheum. 2011;63(8):2226–2237. PMID 21480191. doi:10.1002/art.30389.", "link": "https://doi.org/10.1002/art.30389", "areas": ["D", "G"], "unverified": false}, {"key": "Thomas1999", "text": "Thomas KT, Feder HM, Lawton AR, Edwards KM. Periodic fever syndrome in children. J Pediatr. 1999;135(1):15–21. PMID 10393598. doi:10.1016/S0022-3476(99)70321-5", "link": "https://doi.org/10.1016/S0022-3476(99", "areas": ["B"], "unverified": false}, {"key": "Toplak2011", "text": "Toplak N, Frenkel J, Ozen S, De Benedetti F, Hofer M, Kone-Paut I, Gattorno M, Ruperto N, Martini A, et al.; PRINTO and Eurofever/Eurotraps projects. The Eurofever registry for autoinflammatory diseases: results of the first 15 months of enrolment. Pediatr Rheumatol Online J. 2011;9(Suppl 1):P303. PMCID PMC3194673. doi:10.1186/1546-0096-9-S1-P303. (Conference abstract; registry design statements corroborated by the Eurofever registry page at https://printo.it/eurofever/registry. A later report, \"The Eurofever Project: towards the longitudinal stage,\" PMCID PMC4599901, describes the move to longitudinal data capture — not read, unverified.)", "link": "https://printo.it/eurofever/registry", "areas": ["G"], "unverified": true}, {"key": "Touitou2001", "text": "Touitou I. The spectrum of Familial Mediterranean Fever (FMF) mutations. Eur J Hum Genet. 2001;9:473-483. PMID 11464238; doi:10.1038/sj.ejhg.5200658", "link": "https://doi.org/10.1038/sj.ejhg.5200658", "areas": ["A", "B"], "unverified": false}, {"key": "Touitou2004", "text": "Touitou I, Lesage S, McDermott M, et al. Infevers: an evolving mutation database for auto-inflammatory syndromes. Hum Mutat. 2004;24:194-198. PMID 15300846; doi:10.1002/humu.20080", "link": "https://doi.org/10.1002/humu.20080", "areas": ["A"], "unverified": false}, {"key": "Touitou2007", "text": "Touitou I, Sarkisian T, Medlej-Hashim M, Tunca M, Livneh A, Cattan D, et al.; International Study Group for Phenotype-Genotype Correlation in FMF. Country as the primary risk factor for renal amyloidosis in familial Mediterranean fever. Arthritis Rheum. 2007;56(5):1706-1712. PMID 17469185. DOI 10.1002/art.22507.", "link": "https://doi.org/10.1002/art.22507", "areas": ["E"], "unverified": false}, {"key": "Tufan2020", "text": "Tufan A, Lachmann HJ. Familial Mediterranean fever, from pathogenesis to treatment: a contemporary review. Turk J Med Sci. 2020;50(SI-2):1591-1610. PMID 32806879; PMCID PMC7672358; doi:10.3906/sag-2008-11 (open full text read)", "link": "https://doi.org/10.3906/sag-2008-11", "areas": ["A", "G"], "unverified": false}, {"key": "TurkishFMF2005", "text": "Tunca M, Akar S, Onen F, et al.; Turkish FMF Study Group. Familial Mediterranean fever (FMF) in Turkey: results of a nationwide multicenter study. Medicine (Baltimore). 2005;84(1):1-11. PMID 15643295. DOI 10.1097/01.md.0000152370.84628.0c.", "link": "https://doi.org/10.1097/01.md.0000152370.84628.0c", "areas": ["E", "A", "B", "G"], "unverified": false, "aliases": ["Tunca2005"]}, {"key": "TurkishPilot", "text": "Yasar Bilge NS, Perez Brocal V, Kasifoglu T, Bilge U, Kasifoglu N, Moya A, Dinleyici EC. Intestinal microbiota composition of patients with familial Mediterranean fever: a pilot study. Turk J Med Sci. 2026;56(3):801-807. PMID 42499440. PMCID PMC13398580. Open access.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13398580/", "areas": ["F"], "unverified": false}, {"key": "Twig2014", "text": "Twig G, Livneh A, Vivante A, Afek A, Shamiss A, Derazne E, Tzur D, Ben-Zvi I, Tirosh A, Barchana M, Shohat T, Golan E, Amital H. Mortality risk factors associated with familial Mediterranean fever among a cohort of 1.25 million adolescents. Ann Rheum Dis. 2014;73(4):704-709. PMID 23505237. DOI 10.1136/annrheumdis-2012-202932.", "link": "https://doi.org/10.1136/annrheumdis-2012-202932", "areas": ["E"], "unverified": false}, {"key": "UniProtO15553", "text": "UniProt Consortium. UniProtKB entry O15553 (MEFV_HUMAN, Pyrin/Marenostrin). https://rest.uniprot.org/uniprotkb/O15553 (accessed 2026-10-16). Source of the domain coordinates and the MIM cross-references 249100, 134610, 608068 and 608107.", "link": "https://rest.uniprot.org/uniprotkb/O15553", "areas": ["B"], "unverified": false}, {"key": "vanGameren2006", "text": "van Gameren II, Hazenberg BP, Bijzet J, van Rijswijk MH. Diagnostic accuracy of subcutaneous abdominal fat tissue aspiration for detecting systemic amyloidosis and its utility in clinical practice. Arthritis Rheum. 2006;54(6):2015-2021. PMID 16732553. DOI 10.1002/art.21902.", "link": "https://doi.org/10.1002/art.21902", "areas": ["E"], "unverified": false}, {"key": "VanGijn2018", "text": "Van Gijn ME, Ceccherini I, Shinar Y, et al. New workflow for classification of genetic variants' pathogenicity applied to hereditary recurrent fevers by the International Study Group for Systemic Autoinflammatory Diseases (INSAID). J Med Genet. 2018;55(8):530–537. PMID 29599418. doi:10.1136/jmedgenet-2017-105216", "link": "https://doi.org/10.1136/jmedgenet-2017-105216", "areas": ["B"], "unverified": false}, {"key": "VanGorp2016", "text": "Van Gorp H, Saavedra PHV, de Vasconcelos NM, Van Opdenbosch N, et al., Lamkanfi M. Familial Mediterranean fever mutations lift the obligatory requirement for microtubules in Pyrin inflammasome activation. Proceedings of the National Academy of Sciences USA. 2016;113(50):14384-14389. PMID: 27911804. DOI: 10.1073/pnas.1613156113", "link": "https://doi.org/10.1073/pnas.1613156113", "areas": ["C", "F"], "unverified": false}, {"key": "Varan2019", "text": "Varan O, Kucuk H, Babaoglu H, et al. Effect of interleukin-1 antagonists on the quality of life in familial Mediterranean fever patients. Clin Rheumatol. 2019;38(4):1125-1130. PMID 30535829. DOI 10.1007/s10067-018-4384-8.", "link": "https://doi.org/10.1007/s10067-018-4384-8", "areas": ["E"], "unverified": false}, {"key": "Vertex2003", "text": "Vertex Pharmaceuticals / Aventis announcement, November 2003: voluntary discontinuation of the Phase IIb rheumatoid arthritis program for pralnacasan (VX-740) following minimal-to-moderate hepatic fibrosis in a 9-month high-dose animal toxicology study, with no corresponding human hepatic adverse events. BioWorld report: https://www.bioworld.com/articles/469227 ; Vertex investor filing: https://investors.vrtx.com/static-files/406fee26-7f9a-49ba-9df8-64303c02105a", "link": "https://www.bioworld.com/articles/469227", "areas": ["F"], "unverified": false}, {"key": "Vitale2025", "text": "Vitale A, Caggiano V, Sbalchiero J, Tufan A, Batu ED, Ragab G, et al. Predictors of proteinuria, amyloidosis and kidney failure in familial Mediterranean fever: data from the International AIDA Network Registry. Rheumatology (Oxford). 2025;64(8):4776-4787. PMID 40175882. DOI 10.1093/rheumatology/keaf181.", "link": "https://doi.org/10.1093/rheumatology/keaf181", "areas": ["E", "G"], "unverified": false}, {"key": "VX765", "text": "Belnacasan (VX-765), caspase-1 inhibitor. ClinicalTrials.gov NCT01501383 (treatment-resistant partial epilepsy, Vertex, phase 2, n=55): status TERMINATED, reason given in the registry verbatim as \"Terminated by Sponsor\". NCT00205465 (psoriasis, Vertex, phase 2, n=64): status COMPLETED. The registry gives no toxicity reason; claims that the programme stopped for liver toxicity have no primary support.", "link": "https://clinicaltrials.gov/study/NCT01501383", "areas": ["F"], "unverified": false, "note": "Checked through the ClinicalTrials.gov v2 API rather than a vendor summary."}, {"key": "Xu2014", "text": "Xu H, Yang J, Gao W, et al. Innate immune sensing of bacterial modifications of Rho GTPases by the Pyrin inflammasome. Nature. 2014;513:237-241. PMID 24919149; doi:10.1038/nature13449", "link": "https://doi.org/10.1038/nature13449", "areas": ["A", "C"], "unverified": false}, {"key": "Yalcinkaya2009", "text": "Yalçınkaya F, Özen S, Özçakar ZB, et al. A new set of criteria for the diagnosis of familial Mediterranean fever in childhood. Rheumatology (Oxford). 2009;48(4):395–398. PMID 19193696. doi:10.1093/rheumatology/ken509", "link": "https://doi.org/10.1093/rheumatology/ken509", "areas": ["B"], "unverified": false}, {"key": "Yamaguchi1992", "text": "Yamaguchi M, Ohta A, Tsunematsu T, et al. Preliminary criteria for classification of adult Still's disease. J Rheumatol. 1992;19(3):424–430. PMID 1578458.", "link": "https://pubmed.ncbi.nlm.nih.gov/1578458/", "areas": ["B"], "unverified": false}, {"key": "YasarBilge2020", "text": "Yaşar Bilge NŞ, Bodakçi E, Bilgin M, Kaşifoğlu T. Comparison of clinical features in FMF patients according to severity scores: an analysis with the ISSF scoring system. Eur J Rheumatol. 2020;7(2):68–70. PMID 32644926. PMCID PMC7343229. doi:10.5152/eurjrheum.2020.19136.", "link": "https://doi.org/10.5152/eurjrheum.2020.19136", "areas": ["G"], "unverified": false}, {"key": "Yenokyan2012", "text": "Yenokyan G, Armenian HK. Triggers for attacks in familial Mediterranean fever: application of the case-crossover design. Am J Epidemiol. 2012;175:1054-1061. PMID 22234484; doi:10.1093/aje/kwr460", "link": "https://doi.org/10.1093/aje/kwr460", "areas": ["A"], "unverified": false}, {"key": "Yesilkaya2015", "text": "Yesilkaya S, Acikel C, Fidanci BE, et al. Development of a medication adherence scale for familial Mediterranean fever (MASIF) in a cohort of Turkish children. Clin Exp Rheumatol. 2015;33(6 Suppl 94):S156–S162. PMID 26393894.", "link": "https://pubmed.ncbi.nlm.nih.gov/26393894/", "areas": ["G"], "unverified": false}, {"key": "Yildirim2021", "text": "Yıldırım DG, Bakkaloğlu SA, Soysal-Acar AŞ, Buyan N. Parental knowledge about familial Mediterranean fever: a cross-sectional study. Turk J Pediatr. 2021;63(6):1048–1055. doi:10.24953/turkjped.2021.06.013. https://turkjpediatr.org/article/view/393 (no PMID shown on the journal page).", "link": "https://turkjpediatr.org/article/view/393", "areas": ["G"], "unverified": false}, {"key": "Yilmaz2001", "text": "Yilmaz E, Ozen S, Balci B, et al. Mutation frequency of Familial Mediterranean Fever and evidence for a high carrier rate in the Turkish population. Eur J Hum Genet. 2001;9:553-555. PMID 11464248; doi:10.1038/sj.ejhg.5200674", "link": "https://doi.org/10.1038/sj.ejhg.5200674", "areas": ["A", "B"], "unverified": false}, {"key": "Yin2022", "text": "Yin X, Tian F, Wu B, Xu T. Interventions for reducing inflammation in familial Mediterranean fever. Cochrane Database Syst Rev. 2022;3(3):CD010893. PMID 35349164. PMCID PMC8962959. doi:10.1002/14651858.CD010893.pub4.", "link": "https://doi.org/10.1002/14651858.CD010893.pub4", "areas": ["D", "E"], "unverified": false}, {"key": "Zangi2015", "text": "Zangi HA, Ndosi M, Adams J, Andersen L, Bode C, Boström C, van Eijk-Hustings Y, Gossec L, Korandová J, Mendes G, Niedermann K, Primdahl J, Stoffer M, Voshaar M, van Tubergen A; EULAR. EULAR recommendations for patient education for people with inflammatory arthritis. Ann Rheum Dis. 2015;74(6):954–962. PMID 25735643. doi:10.1136/annrheumdis-2014-206807. Table 1 (two overarching principles, eight recommendations with evidence categories, strengths and agreement scores) read from the accepted manuscript at White Rose eprints: https://eprints.whiterose.ac.uk/id/eprint/83967/", "link": "https://eprints.whiterose.ac.uk/id/eprint/83967/", "areas": ["G"], "unverified": false}, {"key": "Zemer1974", "text": "Zemer D, Revach M, Pras M, et al. A controlled trial of colchicine in preventing attacks of familial Mediterranean fever. N Engl J Med. 1974;291(18):932-934. PMID 4606109; doi:10.1056/NEJM197410312911803", "link": "https://doi.org/10.1056/NEJM197410312911803", "areas": ["A", "D"], "unverified": false}, {"key": "Zemer1986", "text": "Zemer D, Pras M, Sohar E, Modan M, Cabili S, Gafni J. Colchicine in the prevention and treatment of the amyloidosis of familial Mediterranean fever. N Engl J Med. 1986;314:1001-1005. PMID 3515182; doi:10.1056/NEJM198604173141601", "link": "https://doi.org/10.1056/NEJM198604173141601", "areas": ["A", "D", "E", "F"], "unverified": false}];

/* =============== home: two years, before and after colchicine =============== */
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');const r=rng(17);
  const EV=[];for(let d=0;d<730;d++){const m=d/30.4;let p=1.5/30;if(m>12)p*=lerp(1,.08,ease(ramp(m,12,15)));if(r()<p&&!(EV.length&&d-EV[EV.length-1].d<7))EV.push({d,h:.55+r()*.45})}
  function draw(t){const N=vb(svg,'520 300','400 340');
    const D=t*730,x0=N?34:40,x1=N?392:500,y0=40,y1=N?150:170,X=d=>lerp(x0,x1,d/730);let s='';
    s+=`<rect x="${f1(X(365))}" y="20" width="${f1(x1-X(365))}" height="${N?258:250}" rx="8" style="fill:var(--crocus-soft);opacity:.6"/>`;
    s+=`<text x="${f1(X(365)+8)}" y="36" class="t-xs" style="fill:var(--crocus)">daily colchicine →</text><text x="${x0}" y="36" class="t-xs" style="fill:var(--terra)">untreated</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    for(let m=0;m<=24;m+=6)s+=`<text x="${f1(X(m*30.4))}" y="${y1+16}" class="t-xs ${m===0?'':m===24?'t-end':'t-mid'}">${m===0?'month 0':m}</text>`;
    EV.forEach(e=>{if(e.d>D)return;const x=X(e.d),h=(y1-y0-10)*e.h,age=clamp((D-e.d)/20);s+=`<path d="M${f1(x-5)} ${y1} L${f1(x)} ${f1(y1-h)} L${f1(x+5)} ${y1}z" style="fill:var(--terra);opacity:${f1(1-.45*age)}"/>`});
    // SAA between attacks
    const sy=N?240:250;let sd='';for(let d=0;d<=Math.min(D,730);d+=5){const m=d/30.4;const v=lerp(.8,.06,ease(ramp(m,12.5,18)));sd+=(sd?'L':'M')+f1(X(d))+' '+f1(sy-60*v)}
    s+=`<line x1="${x0}" x2="${x1}" y1="${sy}" y2="${sy}" class="axis"/><text x="${x0}" y="${sy+16}" class="t-xs" style="fill:var(--gold)">SAA BETWEEN ATTACKS ↑</text><path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:3"/>`;
    s+=`<line x1="${f1(X(D))}" x2="${f1(X(D))}" y1="24" y2="${sy+12}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    const n1=EV.filter(e=>e.d<=Math.min(D,365)).length,n2=EV.filter(e=>e.d>365&&e.d<=D).length;
    s+=`<text x="${x1}" y="${sy+(N?56:36)}" class="t-sm t-end">attacks: year 1 <tspan style="fill:var(--terra);font-weight:700">${n1}</tspan> · year 2 <tspan style="fill:var(--crocus);font-weight:700">${n2}</tspan></text>`;
    svg.innerHTML=s}
  playWire(rg,$('#heroPlay'),draw,9000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 what FMF is =============== */
const WH_POPS=[
 {id:'iraqi',n:'Iraqi Jews',c:29,
  txt:'Iraqi Jews: 29% carriers in an Israeli screen that tested three variants (Kogan 2001); 1 in 3.5 on a four-variant panel (Gershoni-Baruch 2001). V726A is the main variant here (12.8% carry it). <sup class="c" data-ref="Kogan2001,GershoniBaruch2001" title="Source 77,133">77,133</sup>',
  obs:[{l:'2 variants, well',v:25,c:'phenotype III, 1 in 25 <sup class="c" data-ref="Kogan2001" title="Source 133">133</sup>'},{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 (regional, not specific to this group) <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]},
 {id:'moroc',n:'Moroccan / North African Jews',c:21,
  txt:'Moroccan Jews: 21% on the same three-variant panel (Kogan 2001) and 1 in 4.7 on a four-variant panel (Gershoni-Baruch 2001). M694V dominates (11.1% carry it) and V726A is absent. One review gives 1 in 3.5. <sup class="c" data-ref="Kogan2001,GershoniBaruch2001,Lancieri2023" title="Source 77,133,145">77,133,145</sup>',
  obs:[{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 (regional figure) <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]},
 {id:'ashk',n:'Ashkenazi Jews',c:21,
  txt:'Ashkenazi Jews: about 21% of ~200 anonymous samples carried a variant, mostly E148Q, with evidence of reduced penetrance; other screens give 14% on a three-variant panel and 1 in 4.5 on a four-variant panel. FMF is much rarer clinically than in North African and Iraqi Jews. <sup class="c" data-ref="Aksentijevich1999,Kogan2001,GershoniBaruch2001" title="Source 3,77,133">3,77,133</sup>',
  obs:[{l:'2 variants, well',v:300,c:'phenotype III, 1 in 300 <sup class="c" data-ref="Kogan2001" title="Source 133">133</sup>'}],none:'FMF: much rarer, no figure'},
 {id:'arab',n:'Muslim Arabs in Israel',c:23,
  txt:'Muslim Arabs in Israel: 1 in 4.3 carriers on a four-variant panel; V726A 7.3%, M694V 0.6%. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup>',
  obs:[{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 (regional figure) <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]},
 {id:'armen',n:'Armenians',c:20,
  txt:'Armenians: about 1 in 5 in a recent review. An older pre-molecular segregation study of 64 Armenian-American families estimated a gene frequency of 0.073, about 1 carrier in 7. <sup class="c" data-ref="Lancieri2023,Rogers1989" title="Source 145,226">145,226</sup>',
  obs:[{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 (regional figure) <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]},
 {id:'turk',n:'Turks',c:20,
  txt:'Healthy Turks: 20% carry one of five common variants: E148Q 12%, M680I 5%, M694V 3%, V726A 2%. E148Q is common in healthy people but only 3.6% of patient alleles, a sign of low penetrance. <sup class="c" data-ref="Yilmaz2001" title="Source 282">282</sup>',
  obs:[{l:'FMF, Sivas',v:395,c:'FMF in Sivas, Central Anatolia, 1 in 395 (door-to-door survey) <sup class="c" data-ref="Onen2004" title="Source 195">195</sup>'},{l:'FMF, Turkey',v:1000,c:'Turkey overall, about 0.1% <sup class="c" data-ref="Onen2004" title="Source 195">195</sup>'}]},
 {id:'greek',n:'Greeks',c:.7,
  txt:'Greeks: only 0.7% of 140 healthy Greeks were carriers, although Greek patients mainly carry M694V, M680I and V726A. <sup class="c" data-ref="Giaglis2007" title="Source 81">81</sup>',
  obs:[],none:'No prevalence figure found'},
 {id:'pool',n:'Pooled meta-analysis',c:18.6,
  txt:'Meta-analysis of 16,756 chromosomes from 14 populations: mean carrier rate 0.186, peaking in Arabs, Armenians, Jews and Turks. <sup class="c" data-ref="Papadopoulos2008" title="Source 206">206</sup>',
  obs:[{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]}
];
const WH_STEPS=[
 {from:0,at:.45,k:'Step 1 · Carriers',t:'One changed copy, no illness',
  txt:'Where FMF is common, roughly 1 person in 5 carries one MEFV variant. A meta-analysis of 16,756 chromosomes from 14 populations found a mean carrier rate of 0.186. Carriers are usually healthy, because FMF is classically recessive. <sup class="c" data-ref="Papadopoulos2008,GeneReviews" title="Source 76,206">76,206</sup>',
  pt:'Many people carry one changed copy of the FMF gene without knowing it. One copy alone usually causes no illness.',
  hook:'MEFV carrier rates in Jewish, Arab, Armenian and Turkish populations (about 10% or more) are far above cystic fibrosis carriers in North Americans of European ancestry (about 4%). <sup class="c" data-ref="Park2020" title="Source 208">208</sup>'},
 {from:.5,at:.72,k:'Step 2 · Two carriers',t:'1 child in 4 inherits two variants',
  txt:'When both parents carry one variant, each child has a 1 in 4 chance of inheriting two (one from each parent), 1 in 2 of being a carrier, and 1 in 4 of inheriting neither. <sup class="c" data-ref="GeneReviews" title="Source 76">76</sup> The <a href="#gene" data-go="gene">next module</a> animates this as a Punnett square.',
  pt:'Each child of two carriers has a one-in-four chance of getting both changed copies.',
  hook:'Autosomal recessive: <b>25% / 50% / 25%</b> for each pregnancy, independent of earlier children.'},
 {from:.75,at:.97,k:'Step 3 · Prediction vs reality',t:'Fewer people get FMF than predicted',
  txt:'Squaring half the carrier rate gives a naive estimate of two-variant births. Observed FMF is rarer: about 1:500 to 1:1,000 in endemic countries, and 1:395 at the highest, in Sivas, Turkey. Two things explain the gap. Penetrance is reduced, especially for E148Q. And "phenotype III", two variants with no disease, was found in 1 in 25 Iraqi Jews and 1 in 300 Ashkenazi Jews: 40 to 240 times the rate of overt FMF in those groups. <sup class="c" data-ref="Tufan2020,Onen2004,Touitou2001,Kogan2001" title="Source 133,195,260,263">133,195,260,263</sup>',
  pt:'Having two variants raises the chance of FMF a lot, but it does not guarantee it.',
  hook:'<b>Phenotype III</b> = two MEFV variants, no symptoms, no amyloidosis. E148Q is the mildest, least penetrant variant. <sup class="c" data-ref="SorianoManna2012,Touitou2001" title="Source 248,260">248,260</sup>'}
];
const WH_SEL=[
 {from:0,at:.04,k:'About 2,100–2,200 years ago',t:'A new variant appears',
  txt:'<span class="ev est">Established</span> The variants are ancient. Carrier chromosomes from populations "separated for centuries" share the same surrounding DNA. Dating 4,626 haplotypes from 2,313 Turkish people put M694V at about 2,108 years by a hidden Markov model (95% CI 1,798–2,501) and V726A at about 2,192 years (1,826–2,754). The same paper\'s Gamma method dated the most recent common ancestor further back, about 3,541 years for M694V and 3,372 years for V726A, so "how old" depends on the method. <sup class="c" data-ref="IntFMF1997,Park2020" title="Source 109,208">109,208</sup>',
  pt:'Each common FMF variant started once, in one person, more than two thousand years ago.',
  hook:'Shared haplotypes mean <b>founder</b> variants. Five founders (M694V, V726A, M694I, M680I, E148Q) explain about 74% of FMF chromosomes in typical patients. <sup class="c" data-ref="Touitou2001" title="Source 260">260</sup>'},
 {from:.15,at:.26,k:'0–540 CE',t:'A slow, invisible rise',
  txt:'<span class="ev early">Early evidence</span> Park et al. found long unbroken stretches of DNA around M694V and V726A (extended haplotype homozygosity), a signature of strong, recent positive selection. There was no such signal around E148Q. Their selection coefficients were 0.077 for M694V and 0.068 for V726A per generation. Constant selection multiplies a rare variant by a fixed factor each generation, which is a straight line on this log scale. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  pt:'Carriers seem to have had slightly more surviving children, generation after generation.',
  hook:'Selection signal: <b>M694V and V726A yes, E148Q no</b>.'},
 {from:.335,at:.37,k:'541 CE',t:'The Plague of Justinian',
  txt:'<span class="ev early">Consistent with, not proven</span> Park et al. link the timing of selection to plague pandemics, starting with the Plague of Justinian from 541 CE. The proposed mechanism: the plague bacterium <i>Yersinia pestis</i> uses an effector, YopM, to keep pyrin switched off. FMF-variant pyrin binds YopM less avidly, so patient and even carrier white cells release more IL-1β when infected. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  pt:'The plague germ has a trick for switching pyrin off. FMF-type pyrin partly resists the trick.',
  hook:'YopM suppresses pyrin. FMF pyrin escapes YopM, giving more IL-1β against <i>Y. pestis</i>.'},
 {from:.70,at:.73,k:'1347 CE',t:'The Black Death',
  txt:'<span class="ev early">Early evidence</span> The second pandemic began with the Black Death in 1347 CE. Mice carrying the knock-in M680I pyrin on both copies survived <i>Y. pestis</i> infection better than mice with the normal human B30.2 domain, and the protection was lost without the IL-1 receptor. The survival experiment was done in homozygotes, not carriers. With YopM-deficient bacteria the difference between variant and normal cells disappeared. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  pt:'Animal and cell experiments fit the idea, but nobody can rerun history to prove it.',
  hook:'Heterozygote advantage: one copy may help against an infection, two copies cause disease.'},
 {from:.88,at:1,k:'Today',t:'Carriers are common',
  txt:'Heterozygote frequency across Jewish, Arab, Armenian and Turkish populations is roughly 10% as Park et al. summarize it, while the pooled meta-analysis gives a mean of 18.6%; the figure depends on which variants were tested. Healthy carriers have slightly higher basal and peak CRP and SAA than non-carriers, a "pro-inflammatory" state proposed to aid host defence. <sup class="c" data-ref="Park2020,Papadopoulos2008,Lachmann2006" title="Source 141,206,208">141,206,208</sup>',
  pt:'Today many people carry one copy. It may have been a small advantage in the past.',
  hook:'Evidence labels: plague selection is <b>early evidence</b> (consistent with, not proven). Tuberculosis resistance is a <b>hypothesis</b>.'}
];
const WH_SITES=[
 {id:'perit',n:'Peritonitis',v:93.7,txt:'Sudden belly pain that can look exactly like a surgical emergency, with guarding and rebound. It settles completely within 24–72 hours. Many patients have had unnecessary appendectomies or laparotomies. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'},
 {id:'fever',n:'Fever',v:92.5,txt:'Starts suddenly and peaks within hours. It can occur alone, and in young children it can present as fever of unknown origin. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'},
 {id:'arth',n:'Arthritis',v:47.4,txt:'Usually one large lower-limb joint: knee, ankle or hip. The joint fluid is sterile but inflamed, so it can mimic septic arthritis. It settles in about a week; protracted arthritis occurs in under 5%. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'},
 {id:'myal',n:'Myalgia',v:39.6,txt:'Most often exertional pain in the calves after long standing or travel, more frequent with M694V. Protracted febrile myalgia is a rarer, severe form lasting weeks that responds to corticosteroids. <sup class="c" data-ref="Tufan2020,Langevitz1994" title="Source 146,263">146,263</sup>'},
 {id:'pleur',n:'Pleuritis',v:31.2,txt:'Sudden, one-sided chest pain on breathing. There may be a small effusion. It resolves in 1–3 days. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'},
 {id:'ele',n:'Erysipelas-like erythema',v:20.9,txt:'A tender red plaque, usually on the lower leg, ankle or top of the foot, often after long walking. In one paediatric cohort it was linked to arthritis and M694V homozygosity. <sup class="c" data-ref="Tufan2020,GezginYildirim2020" title="Source 79,263">79,263</sup>'},
 {id:'peric',n:'Pericarditis',v:1.4,txt:'Rare. In Israel, 27 of about 4,000 patients over 20 years, still about ten times the background rate. Attacks lasted a mean of 4.2 days with no lasting damage. <sup class="c" data-ref="Kees1997,TurkishFMF2005" title="Source 123,264">123,264</sup>'}
];
inits.what=()=>{
  /* ---------- 1. carriers dot grid ---------- */
  const svg=$('#whSvg'),rg=$('#whT');let pop=WH_POPS[0];
  const order=(()=>{const r=rng(16),a=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  const person=(x,y,sc,fill,half)=>{
    const id='whc'+Math.round(x)+'_'+Math.round(y);
    let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${sc})">`;
    if(half){g+=`<defs><clipPath id="${id}"><rect x="-8" y="-16" width="8" height="28"/></clipPath></defs>`;
      g+=`<circle cy="-9" r="4.2" style="fill:var(--line)"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:var(--line)"/>`;
      g+=`<g clip-path="url(#${id})"><circle cy="-9" r="4.2" style="fill:var(--terra)"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:var(--terra)"/></g>`}
    else g+=`<circle cy="-9" r="4.2" style="fill:${fill}"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:${fill}"/>`;
    return g+'</g>'};
  const oneIn=n=>{if(n<1000)return Math.round(n).toLocaleString('en-US');const p=Math.pow(10,Math.floor(Math.log10(n))-1);return (Math.round(n/p)*p).toLocaleString('en-US')};
  function draw(t){
    /* narrow: the grid, the family and the prevalence scale stack in one column */
    const N=vb(svg,'720 420','400 896');
    const L=N
      ? {tx:20,ty:22, gx:36,gdx:36,gy:60,gdy:30, bigY:366,subY:386, div:'M20 404H380',
         famTx:20,famTy:432, paX:[130,270],paY:486,carY:522,
         conn:'M155 482H245M200 482V546M46 546H352', kidX:[46,148,250,352], stemY:[546,558],
         kidY:588,kidLab:618,ringY:581, oddX:46,oddY:646,oddY2:660,
         l3x:20,l3y:700, AX0:56,AX1:370, gTop:716, axY:846, tickY:862, rarerY:878,
         rowY:i=>740+i*40, noneY:i=>740+i*40-14}
      : {tx:30,ty:34, gx:46,gdx:26,gy:78,gdy:29, bigY:378,subY:398, div:'M318 40V400',
         famTx:336,famTy:34, paX:[430,560],paY:96,carY:132,
         conn:'M455 92H535M495 92V150M372 150H582', kidX:[372,442,512,582], stemY:[150,162],
         kidY:192,kidLab:222,ringY:185, oddX:614,oddY:186,oddY2:202,
         l3x:336,l3y:252, AX0:465,AX1:665, gTop:266, axY:370, tickY:386, rarerY:402,
         rowY:i=>i?288+i*30:286, noneY:i=>288+i*30+4};
    const lx=n=>lerp(L.AX0,L.AX1,(Math.log10(n)-1)/4);
    const c=pop.c,nLit=c>=1?Math.round(c*ramp(t,.03,.46)):(t>.3?1:0);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-lbl">100 people · ${pop.n}</text>`;
    for(let i=0;i<100;i++){const k=order.indexOf(i),r=Math.floor(i/10),q=i%10,x=L.gx+q*L.gdx,y=L.gy+r*L.gdy;
      const lit=k<nLit;s+=person(x,y,1,lit?'var(--terra)':'var(--line)');
      if(lit&&k===nLit-1&&t<.48)s+=`<circle cx="${x}" cy="${y-2}" r="13" style="fill:none;stroke:var(--terra);stroke-width:1.5;opacity:.6"/>`}
    const shown=c>=1?nLit:(nLit?.7:0);
    s+=`<text x="${L.tx}" y="${L.bigY}" class="t-big" style="fill:var(--terra)">${c>=1?shown:(nLit?'0.7':'0')} ${c>=1?'carriers in 100':'carriers in 100'}</text>`;
    s+=`<text x="${L.tx}" y="${L.subY}" class="t-sm">${nLit?'about 1 in '+(100/c<10?f1(100/c):Math.round(100/c)):'carry one MEFV variant'}${c<1&&nLit?' (shown as 1 figure)':''}</text>`;
    s+=`<path d="${L.div}" class="axis"/>`;
    /* layer 2: family */
    const o2=ramp(t,.5,.56);
    if(o2>0){s+=`<g style="opacity:${f1(o2)}"><text x="${L.famTx}" y="${L.famTy}" class="t-lbl">If two carriers have children</text>`;
      s+=person(L.paX[0],L.paY,2,'',true)+person(L.paX[1],L.paY,2,'',true);
      s+=`<text x="${L.paX[0]}" y="${L.carY}" class="t-xs t-mid">carrier</text><text x="${L.paX[1]}" y="${L.carY}" class="t-xs t-mid">carrier</text>`;
      s+=`<path d="${L.conn}" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`;
      const kids=[['VV','2 variants'],['V+','carrier'],['+V','carrier'],['++','neither']];
      kids.forEach(([g,l],i)=>{const o=ramp(t,.56+i*.035,.6+i*.035);if(o<=0)return;const x=L.kidX[i];
        s+=`<g style="opacity:${f1(o)}"><path d="M${x} ${L.stemY[0]}V${L.stemY[1]}" style="stroke:var(--muted);stroke-width:1.4"/>`;
        s+=g==='VV'?person(x,L.kidY,1.6,'var(--terra)'):g==='++'?person(x,L.kidY,1.6,'var(--line)'):person(x,L.kidY,1.6,'',true);
        s+=`<text x="${x}" y="${L.kidLab}" class="t-xs t-mid" ${g==='VV'?'style="fill:var(--terra);font-weight:700"':''}>${l}</text></g>`});
      const o3=ramp(t,.7,.74);
      if(o3>0)s+=`<g style="opacity:${f1(o3)}"><circle cx="${L.kidX[0]}" cy="${L.ringY}" r="24" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-dasharray:4 3"/><text x="${L.oddX}" y="${L.oddY}" class="t-big${N?' t-mid':''}">1 in 4</text><text x="${L.oddX}" y="${L.oddY2}" class="t-xs${N?' t-mid':''}">per child</text></g>`;
      s+='</g>'}
    /* layer 3: predicted vs observed, log axis */
    const o4=ramp(t,.75,.8);
    if(o4>0){const pred=1/Math.pow(c/200,2),slide=ease(ramp(t,.78,.9));
      s+=`<g style="opacity:${f1(o4)}"><text x="${L.l3x}" y="${L.l3y}" class="t-lbl">How common? 1 in N, log scale</text>`;
      s+=`<line x1="${L.AX0}" y1="${L.axY}" x2="${L.AX1}" y2="${L.axY}" style="stroke:var(--muted);stroke-width:1.2"/>`;
      [[10,'1:10'],[100,'1:100'],[1e3,'1:1k'],[1e4,'1:10k'],[1e5,'1:100k']].forEach(([n,l])=>{const x=lx(n);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.gTop}" y2="${L.axY}" class="grid"/><text x="${f1(x)}" y="${L.tickY}" class="t-xs t-mid">${l}</text>`});
      s+=`<text x="${L.AX1}" y="${L.rarerY}" class="t-xs t-end">rarer →</text>`;
      /* narrow has no room for a label column beside the axis: the row label and its
         value share one line above the marker instead */
      const row=(y,lab,col,val)=>N
        ? `<text x="${L.l3x}" y="${y-14}" class="t-sm" style="fill:${col}">${lab} · ${val}</text>`
        : `<text x="${L.l3x}" y="${y+4}" class="t-sm" style="fill:${col}">${lab}</text>`;
      const val=(y,x,col,v)=>N?'':`<text x="${f1(x)}" y="${y-10}" class="t-xs t-mid" style="fill:${col};font-weight:700">${v}</text>`;
      const py=L.rowY(0),pv='1:'+oneIn(pred);
      s+=row(py,'Predicted (est.)','var(--sea)',pv);
      const px=lerp(L.AX0,lx(pred),slide);
      s+=`<path d="M${f1(px)} ${py-7}l7 7-7 7-7-7z" style="fill:var(--sea)"/>`+val(py,px,'var(--sea)',pv);
      pop.obs.forEach((ob,i)=>{const y=L.rowY(i+1),ov=ob.r?`1:${ob.r[0]}–1:1,000`:'1:'+oneIn(ob.v);
        s+=row(y,ob.l,'var(--terra)',ov);
        if(ob.r){const xa=lerp(L.AX0,lx(ob.r[0]),slide),xb=lerp(L.AX0,lx(ob.r[1]),slide);s+=`<rect x="${f1(xa-4)}" y="${y-5}" width="${f1(xb-xa+8)}" height="10" rx="5" style="fill:var(--terra);opacity:.85"/>`+val(y,(xa+xb)/2,'var(--terra)',ov)}
        else{const x=lerp(L.AX0,lx(ob.v),slide);s+=`<circle cx="${f1(x)}" cy="${y}" r="6" style="fill:var(--terra)"/>`+val(y,x,'var(--terra)',ov)}});
      if(pop.none)s+=`<text x="${L.l3x}" y="${L.noneY(pop.obs.length+1)}" class="t-sm">${pop.none}</text>`;
      s+='</g>'}
    svg.innerHTML=s;
    const p=phaseOf(WH_STEPS,t);setSt(p);$('#whNote').innerHTML=noteHTML(WH_STEPS[p]);
  }
  function readout(){const pred=1/Math.pow(pop.c/200,2);
    $('#whRead').innerHTML=`<span>${pop.txt}</span><span>Simple estimate of two-variant births, assuming random partnering and ignoring penetrance: (${f1(pop.c)}% ÷ 2)² ≈ <b>1 in ${oneIn(pred)}</b>.</span>`+(pop.obs.length?`<span>Observed: ${pop.obs.map(o=>o.c).join('; ')}.</span>`:'')}
  const stop=playWire(rg,$('#whPlay'),draw,16000,'Replay','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $('#whPops').innerHTML=WH_POPS.map((p,i)=>`<button class="btn" data-pop="${i}" aria-pressed="${i===0}">${p.n}</button>`).join('');
  $('#whPops').addEventListener('click',e=>{const b=e.target.closest('[data-pop]');if(!b)return;pop=WH_POPS[+b.dataset.pop];
    $$('[data-pop]',$('#whPops')).forEach(x=>x.setAttribute('aria-pressed',x===b));readout();draw(+rg.value)});
  readout();draw(+rg.value);

  /* ---------- 2. heterozygote advantage ---------- */
  const sv=$('#whSel'),rs=$('#whSelT');
  const Y0=-200,Y1=2000,L0=-4.5,L1=-1;
  const VAR=[{n:'M694V',s:.077,o:2000-2108,ci:[2000-2501,2000-1798],col:'var(--terra)'},{n:'V726A',s:.068,o:2000-2192,ci:[2000-2754,2000-1826],col:'var(--crocus)'}];
  const P0=5e-5,pf=(v,yr)=>{if(yr<v.o)return null;const e=Math.exp(v.s*(yr-v.o)/25);return P0*e/(1-P0+P0*e)};
  const yrLbl=y=>y<0?Math.round(-y)+' BCE':Math.round(y)+' CE';
  const pct=p=>p<.001?(p*100).toFixed(3)+'%':p<.01?(p*100).toFixed(2)+'%':(p*100).toFixed(1)+'%';
  function drawSel(t){const yr=lerp(Y0,Y1,t);
    /* narrow: one chart at the full 400 width, taller, with fewer x ticks */
    const N=vb(sv,'720 400','400 520');
    const X0=N?46:84,X1=N?380:672,PY0=N?440:330,PY1=N?100:84;
    const xy=y=>lerp(X0,X1,(y-Y0)/(Y1-Y0)),yl=l=>lerp(PY0,PY1,(l-L0)/(L1-L0));
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    [[-4,'0.01%'],[-3,'0.1%'],[-2,'1%'],[-1,'10%']].forEach(([l,lb])=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yl(l))}" y2="${f1(yl(l))}" class="grid"/><text x="${X0-6}" y="${f1(yl(l)+3)}" class="t-xs t-end">${lb}</text>`});
    s+=N?`<text x="14" y="26" class="t-xs">allele frequency, log scale</text>`
        :`<text x="16" y="${(PY0+PY1)/2}" class="t-xs t-mid" transform="rotate(-90 16 ${(PY0+PY1)/2})">allele frequency, log scale</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${PY0}" y2="${PY0}" class="axis"/>`;
    (N?[[-200,'200 BCE'],[600,'600'],[1300,'1300'],[2000,'2000 CE']]
      :[[-200,'200 BCE'],[0,'0'],[500,'500'],[1000,'1000'],[1500,'1500'],[2000,'2000 CE']]).forEach(([y,l])=>{const x=xy(y);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${PY0}" y2="${PY0+4}" class="axis"/><text x="${f1(x)}" y="${PY0+16}" class="t-xs ${y===-200?'':y===2000?'t-end':'t-mid'}">${l}</text>`});
    /* plague events */
    [[541,N?'Justinian plague':'Plague of Justinian','541 CE'],[1347,'Black Death','1347 CE']].forEach(([y,a,b])=>{const x=xy(y),on=yr>=y,o=on?1:.45;
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${PY1-12}" y2="${PY0}" style="stroke:var(--bad);stroke-width:${on?2:1.2};stroke-dasharray:5 4;opacity:${o}"/>`;
      s+=`<text x="${f1(x)}" y="${PY1-36}" class="t-lbl t-mid" style="fill:var(--bad);opacity:${o}">${a}</text><text x="${f1(x)}" y="${PY1-20}" class="t-xs t-mid" style="fill:var(--bad);opacity:${o}">${b}</text>`});
    /* curves */
    VAR.forEach((v,i)=>{let d='';for(let y=v.o;y<=yr;y+=10){const p=pf(v,y);d+=(d?'L':'M')+f1(xy(y))+' '+f1(yl(Math.log10(p)))}
      if(d){const pe=pf(v,yr),hx=xy(yr),hy=yl(Math.log10(pe));
        s+=`<path d="${d}L${f1(hx)} ${f1(hy)}" style="fill:none;stroke:${v.col};stroke-width:3;stroke-linecap:round"/>`;
        s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="5" style="fill:${v.col}"/>`;
        const nr=hx>X1-(N?96:110);s+=`<text x="${f1(nr?hx-8:hx+8)}" y="${f1(i?hy+16:hy-9)}" class="t-sm${nr?' t-end':''}" style="fill:${v.col};font-weight:600">${v.n} ${pct(pe)}</text>`}
      /* age CI bars */
      const by=PY0+34+i*16,xa=xy(Math.max(Y0,v.ci[0])),xb=xy(v.ci[1]);
      s+=`<line x1="${f1(xa)}" x2="${f1(xb)}" y1="${by}" y2="${by}" style="stroke:${v.col};stroke-width:3;opacity:.55"/><circle cx="${f1(xy(v.o))}" cy="${by}" r="4" style="fill:${v.col}"/>`;
      if(v.ci[0]<Y0)s+=`<path d="M${f1(xa)} ${by}l6 -4v8z" style="fill:${v.col}"/>`;
      s+=`<text x="${f1(xb+8)}" y="${by+3}" class="t-xs">${v.n} age ≈ ${(2000-v.o).toLocaleString('en-US')} y (HMM, 95% CI)</text>`});
    /* playhead */
    const hx=xy(yr);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${PY1}" y2="${PY0}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    s+=`<text x="${f1(clamp(hx,N?74:120,X1-(N?20:24)))}" y="${PY1-2}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${yrLbl(yr)}</text>`;
    s+=`<text x="${X1}" y="${PY0-8}" class="t-xs t-end">schematic model</text>`;
    sv.innerHTML=s;
    const a=pf(VAR[0],yr),b=pf(VAR[1],yr);
    $('#whSelRead').innerHTML=`<span>Year <b>${yrLbl(yr)}</b></span><span>M694V <b>${a?pct(a):'not yet'}</b></span><span>V726A <b>${b?pct(b):'not yet'}</b></span><span>generations since origin: <b>${a?Math.round((yr-VAR[0].o)/25):0}</b></span>`;
    const p=phaseOf(WH_SEL,t);setSel(p);$('#whSelNote').innerHTML=noteHTML(WH_SEL[p]);
  }
  const stopS=playWire(rs,$('#whSelPlay'),drawSel,18000,'Replay','what');
  const setSel=stepWire($('#whSelSteps'),WH_SEL,rs,drawSel,stopS);
  drawSel(+rs.value);
  $('#whSelCards').innerHTML=`
   <div class="card"><h4>What supports it <span class="ev early">Early evidence</span></h4><p>Three frequent variants shared across several Mediterranean populations "strongly suggests a heterozygote advantage". <sup class="c" data-ref="Aksentijevich1999" title="Source 3">3</sup> Park 2020 added the selection signal, the YopM mechanism and the mouse survival data. <sup class="c" data-ref="Park2020" title="Source 208">208</sup></p></div>
   <div class="card"><h4>Counterpoint</h4><p>An Israeli study found no perceptible health advantage for Ashkenazi carriers today. <sup class="c" data-ref="Kogan2001" title="Source 133">133</sup> A benefit against plague would not necessarily show up in a modern population. Drift in isolated populations remains the competing explanation: the pooled meta-analysis found the strongest isolation and drift in Jewish populations, the candidate group for <i>MEFV</i> founder effects. <sup class="c" data-ref="Papadopoulos2008" title="Source 206">206</sup></p></div>
   <div class="card"><h4>An older idea: tuberculosis <span class="ev hyp">Hypothesis</span></h4><p>A 2003 letter asked whether carriers had lower tuberculosis mortality. It was never tested directly. <sup class="c" data-ref="Cattan2003" title="Source 32">32</sup></p></div>
   <div class="card"><h4>Carriers run slightly hot</h4><p>Healthy heterozygotes have higher basal and peak CRP and SAA than people without variants. <sup class="c" data-ref="Lachmann2006" title="Source 141">141</sup> That fits a primed, but not disease-causing, innate immune system.</p></div>`;

  /* ---------- 3. attack at a glance ---------- */
  const body=$('#whBody');let site='perit';
  function drawBody(){const on=k=>k===site?1:0,H=(k,inner,o=1)=>`<g class="wh-hl" style="opacity:${on(k)*o}">${inner}</g>`;
    const T='fill:var(--terra);opacity:.6';let s='';
    /* silhouette */
    s+=`<g style="stroke:var(--panel-2);stroke-linecap:round;fill:none">
      <path d="M96 84 L70 196" style="stroke-width:17"/><path d="M164 84 L190 196" style="stroke-width:17"/>
      <path d="M112 214 L104 372" style="stroke-width:24"/><path d="M148 214 L156 372" style="stroke-width:24"/></g>`;
    s+=`<path d="M92 76 Q130 64 168 76 L164 150 Q160 190 162 222 L98 222 Q100 190 96 150 Z" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="122" y="58" width="16" height="16" style="fill:var(--panel-2)"/><circle cx="130" cy="40" r="22" style="fill:var(--panel-2)"/>`;
    s+=`<ellipse cx="96" cy="382" rx="15" ry="7" style="fill:var(--panel-2)"/><ellipse cx="164" cy="382" rx="15" ry="7" style="fill:var(--panel-2)"/>`;
    /* faint organs */
    s+=`<g style="fill:none;stroke:var(--line);stroke-width:1.4;stroke-dasharray:3 3"><ellipse cx="113" cy="118" rx="14" ry="25"/><ellipse cx="148" cy="118" rx="14" ry="25"/><ellipse cx="130" cy="180" rx="28" ry="24"/></g>`;
    /* highlights */
    s+=H('fever',`<circle cx="130" cy="40" r="22" style="${T}"/><path d="M92 76 Q130 64 168 76 L164 150 Q160 190 162 222 L98 222 Q100 190 96 150 Z" style="fill:var(--terra);opacity:.25"/>
      <g transform="translate(196 22)"><rect x="-4" y="0" width="8" height="34" rx="4" style="fill:var(--panel);stroke:var(--terra);stroke-width:1.5"/><circle cy="40" r="7" style="fill:var(--terra)"/><rect x="-2" y="12" width="4" height="26" style="fill:var(--terra)"/></g>
      <path d="M60 30q5 -6 0 -12M48 34q5 -6 0 -12" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-linecap:round"/>`);
    s+=H('perit',`<ellipse cx="130" cy="180" rx="30" ry="26" style="${T}"/>`);
    s+=H('pleur',`<ellipse cx="113" cy="118" rx="15" ry="26" style="${T}"/><text x="60" y="122" class="t-xs t-end" style="fill:var(--terra)">one side</text><path d="M62 119H96" style="stroke:var(--terra);stroke-width:1"/>`);
    s+=H('peric',`<path d="M138 120c-6-8-16-2-11 6l11 11 11-11c5-8-5-14-11-6z" style="fill:var(--terra)"/>`);
    s+=H('arth',`<circle cx="107" cy="292" r="12" style="${T}"/><circle cx="155" cy="362" r="8" style="fill:var(--terra);opacity:.3"/><circle cx="112" cy="216" r="9" style="fill:var(--terra);opacity:.3"/><text x="82" y="296" class="t-xs t-end" style="fill:var(--terra)">knee</text>`);
    s+=H('myal',`<ellipse cx="106" cy="322" rx="9" ry="20" style="${T}"/><ellipse cx="154" cy="322" rx="9" ry="20" style="${T}"/>`);
    s+=H('ele',`<ellipse cx="156" cy="352" rx="11" ry="16" style="fill:var(--congo);opacity:.65"/><text x="178" y="356" class="t-xs" style="fill:var(--terra)">shin, ankle</text>`);
    const S=WH_SITES.find(x=>x.id===site);
    body.innerHTML=s;
    $('#whSiteNote').innerHTML=`<h4>${S.n} <span class="big" style="font-size:22px">${f1(S.v)}%</span></h4><p>${S.txt}</p>`;
    $$('.wh-site',$('#whSites')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.site===site));
  }
  $('#whSites').innerHTML=WH_SITES.map(x=>`<button class="wh-site" data-site="${x.id}" aria-pressed="false"><span>${x.n}</span><span class="tr"><i data-w="${x.v}"></i></span><span class="v">${f1(x.v)}%</span></button>`).join('')+
    `<div class="pt"><b>In plain words</b>Almost every attack brings fever, and most bring belly pain. About half of patients have joint attacks at some point. Between attacks most people feel completely well. <sup class="c" data-ref="TurkishFMF2005,GeneReviews" title="Source 76,264">76,264</sup></div>`;
  $('#whSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;drawBody()});
  drawBody();
  setTimeout(()=>$$('#whSites .tr i').forEach(i=>i.style.width=i.dataset.w+'%'),60);

  /* ---------- 4. key numbers ---------- */
  $('#whCards').innerHTML=`
   <div class="card"><span class="kicker">Onset</span><span class="big">80–90%</span><p>have their first symptoms before age 20 <sup class="c" data-ref="Tufan2020,Sohar1967" title="Source 244,263">244,263</sup>, and more than half begin in the first decade <sup class="c" data-ref="PRINTO2016G" title="Source 216">216</sup>. First attacks after 40 are rare and usually mild <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>.</p></div>
   <div class="card"><span class="kicker">Sex ratio</span><span class="big">1.2 : 1</span><p>male to female in the Turkish registry of 2,838 patients <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup>. Older Israeli data gave about 1.7, read as reduced penetrance in females <sup class="c" data-ref="Rogers1989" title="Source 226">226</sup>.</p></div>
   <div class="card"><span class="kicker">Diagnostic delay</span><span class="big">6.9 years</span><p>mean time from first symptoms to diagnosis in Turkey, shortening by about 2 years each decade since 1981 <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup>. Very early onset goes with M694V homozygosity, more severe disease and a longer delay <sup class="c" data-ref="Tanatar2021,GezginYildirim2022age" title="Source 80,254">80,254</sup>.</p></div>
   <div class="card"><span class="kicker">Prevalence</span><span class="big">1:500–1:1,000</span><p>in endemic countries <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>. The highest field figure is 1 in 395 in Sivas, Central Anatolia <sup class="c" data-ref="Onen2004" title="Source 195">195</sup>.</p></div>
   <div class="card"><span class="kicker">Japan</span><span class="big">192 of 601</span><p>Japanese patients with unexplained fever were diagnosed with FMF in a 2009–2015 study, which called it "no longer a rare disease in Japan" <sup class="c" data-ref="Migita2016" title="Source 174">174</sup>. A 2009 survey had estimated only 292 patients. Japanese FMF starts later, is milder, often involves E148Q/M694I, and colchicine worked in 91.8% <sup class="c" data-ref="Migita2012" title="Source 173">173</sup>.</p></div>
   <div class="card"><span class="kicker">Worldwide</span><span class="big">No verified total</span><p>No primary source gives a checked global count; figures like "over 100,000" circulate unverified. Turkey's e-health records alone list 160,897 people with FMF codes <sup class="c" data-ref="Satis2025" title="Source 233">233</sup>. Turkey has the most patients, then Israel and Armenia <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>.</p></div>
   <div class="card"><span class="kicker">Three phenotypes</span><ul><li><b>Phenotype 1:</b> recurrent attacks of fever with serositis or synovitis.</li><li><b>Phenotype 2:</b> AA amyloidosis as the first sign, without prior attacks. At most 0.3% in the Turkish registry, under 2% across cohorts.</li><li><b>Phenotype 3:</b> two variants, no symptoms and no amyloidosis.</li></ul><p><sup class="c" data-ref="SorianoManna2012,TurkishFMF2005,Tufan2020" title="Source 248,263,264">248,263,264</sup></p></div>
   <div class="card"><span class="kicker">Between attacks</span><span class="big">Well, mostly</span><p>Patients usually feel completely well between attacks <sup class="c" data-ref="GeneReviews,PRINTO2016G" title="Source 76,216">76,216</sup>. Yet median SAA between attacks was 6 mg/L against 693 mg/L during them, and many patients never fully normalize: attacks are the "tip of the iceberg" <sup class="c" data-ref="Lachmann2006" title="Source 141">141</sup>.</p><div class="hook"><b>Exam hook</b>Before colchicine, more than half of FMF patients died of amyloidosis <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>. See <a href="#amyloid" data-go="amyloid">AA amyloidosis</a>.</div></div>`;
};
/* =============== 1.2 the gene & inheritance =============== */
const GN_CLSN={P:'Pathogenic',LP:'Likely pathogenic',VUS:'Uncertain significance',LB:'Likely benign',B:'Benign',none:'No variant'};
const GN_CLSC={P:'var(--bad)',LP:'var(--terra)',VUS:'var(--warn)',LB:'var(--good)',B:'var(--good)',none:'var(--muted)'};
const GN_VARS=[
 {id:'M694V',aa:694,cls:'P',ex:'Exon 10 · B30.2',
  pop:'The commonest variant in non-Ashkenazi Jews; predominant in North African Jews and absent in Ashkenazim. <sup class="c" data-ref="Lancieri2023,GershoniBaruch2001" title="Source 77,145">77,145</sup> 51.4% of variant alleles in 1,090 genotyped Turkish patients <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup>, 38.1% in Greek patients <sup class="c" data-ref="Giaglis2007" title="Source 81">81</sup>, 39.6% in pooled data <sup class="c" data-ref="Papadopoulos2008" title="Source 206">206</sup>. Estimated age about 2,108 years by hidden Markov model, or a most recent common ancestor about 3,541 years ago by the Gamma method in the same paper, with a positive-selection signal. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  sev:'M694V/M694V meant earlier onset, more arthritis, more erysipelas-like erythema and higher colchicine needs than other common genotypes (Shinar 2000). <sup class="c" data-ref="Shinar2000" title="Source 239">239</sup> In 90 Armenian patients M694V homozygosity was linked to renal amyloidosis (Cazeneuve 1999) <sup class="c" data-ref="Cazeneuve1999" title="Source 33">33</sup>, but in the Turkish registry of 2,838 patients it was not (Tunca 2005). <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup> Among M694V homozygotes, male sex and arthritic attacks raised amyloidosis risk. <sup class="c" data-ref="GershoniBaruch2003" title="Source 78">78</sup>'},
 {id:'M680I',aa:680,cls:'P',ex:'Exon 10 · B30.2',
  pop:'Concentrated in Arab patients. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup> 14.4% of variant alleles in Turkish patients <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup> and 19.7% in Greek patients <sup class="c" data-ref="Giaglis2007" title="Source 81">81</sup>; 5% of healthy Turks carry it. <sup class="c" data-ref="Yilmaz2001" title="Source 282">282</sup> Two DNA changes give the same protein change (c.2040G>C and c.2040G>A). <sup class="c" data-ref="Infevers2026" title="Source 108">108</sup>',
  sev:'Genotypes with two variants at the 680–694 hot spot tend to be severe; SHARE rates two common variants, especially at 680–694, as predicting more severe disease (level B). <sup class="c" data-ref="Touitou2001,Giancane2015" title="Source 82,260">82,260</sup>'},
 {id:'M694I',aa:694,cls:'P',ex:'Exon 10 · B30.2',
  pop:'Concentrated in Arab patients. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup> In Japan the common genotypes are E148Q/M694I and M694I with no second variant, and disease is milder. <sup class="c" data-ref="Migita2012" title="Source 173">173</sup>',
  sev:'One of the four "clearly pathogenic" exon-10 variants. <sup class="c" data-ref="Shinar2012" title="Source 240">240</sup> Same residue as M694V, a different replacement amino acid.'},
 {id:'K695R',aa:695,cls:'VUS',ex:'Exon 10 · B30.2',
  pop:'About 1–1.6% allele frequency in Europeans and Finns in gnomAD. <sup class="c" data-ref="gnomAD" title="Source 83">83</sup> Also found in Ashkenazi Jews. <sup class="c" data-ref="Aksentijevich1999" title="Source 3">3</sup>',
  sev:'Linked to mild disease or incomplete penetrance. <sup class="c" data-ref="Lancieri2023,Aksentijevich1999" title="Source 3,145">3,145</sup> Older guidance grouped it with A744S and R761H as hot-spot variants. <sup class="c" data-ref="Shinar2012" title="Source 240">240</sup>'},
 {id:'V726A',aa:726,cls:'P',ex:'Exon 10 · B30.2',
  pop:'Common in Ashkenazi and Iraqi Jews and in Arabs (the commonest variant in Arab patients). <sup class="c" data-ref="GershoniBaruch2001,Lancieri2023" title="Source 77,145">77,145</sup> 12.8% of Iraqi Jews carry it. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup> The only variant in Hardy–Weinberg equilibrium in pooled data, suggesting it is the oldest; estimated age about 2,192 years by hidden Markov model, or a most recent common ancestor about 3,372 years ago by the Gamma method. <sup class="c" data-ref="Papadopoulos2008,Park2020" title="Source 206,208">206,208</sup>',
  sev:'V726A/V726A and M694V/V726A were among the genotypes with later onset and less arthritis than M694V/M694V. <sup class="c" data-ref="Shinar2000" title="Source 239">239</sup> Most people with V726A/E148Q stay asymptomatic. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup>'},
 {id:'A744S',aa:744,cls:'LB',ex:'Exon 10 · B30.2',
  pop:'About 1% allele frequency in Ashkenazi Jews in gnomAD. <sup class="c" data-ref="gnomAD" title="Source 83">83</sup>',
  sev:'Likely benign in Infevers on 2026-10-16, although Shinar 2012 still listed it among hot-spot variants to report. A clear example of classes changing over time. <sup class="c" data-ref="Infevers2026,Shinar2012" title="Source 108,240">108,240</sup>'},
 {id:'R761H',aa:761,cls:'P',ex:'Exon 10 · B30.2',
  pop:'Listed among the exon-10 variants that standard panels report. <sup class="c" data-ref="Shinar2012" title="Source 240">240</sup> The research sources used here give no population frequency for it.',
  sev:'Shinar 2012 grouped it with A744S and K695R; Infevers listed it as pathogenic on 2026-10-16. <sup class="c" data-ref="Shinar2012,Infevers2026" title="Source 108,240">108,240</sup>'},
 {id:'E148Q',aa:148,cls:'VUS',ex:'Exon 2',
  pop:'The commonest variant in Ashkenazi Jews. <sup class="c" data-ref="Lancieri2023" title="Source 145">145</sup> 12% of healthy Turks carry it, but it is only 3.6% of Turkish patient alleles. <sup class="c" data-ref="Yilmaz2001" title="Source 282">282</sup> About 29% allele frequency in East Asians in gnomAD; up to 20% in Asian countries. <sup class="c" data-ref="gnomAD,Shinar2012" title="Source 83,240">83,240</sup> No positive-selection signal, unlike M694V and V726A. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  sev:'The mildest and least penetrant variant. <sup class="c" data-ref="Touitou2001" title="Source 260">260</sup> SHARE: E148Q as the only variant does not support an FMF diagnosis (level B). <sup class="c" data-ref="Giancane2015,Ozen2017" title="Source 82,200">82,200</sup>'},
 {id:'S242R',aa:242,cls:'LP',ex:'Exon 2 · linker after PYD',
  pop:'Found in families with a dominantly inherited disease. <sup class="c" data-ref="Masters2016" title="Source 169">169</sup>',
  sev:'Not FMF. One copy removes a 14-3-3 binding site on pyrin and causes PAAND, pyrin-associated autoinflammation with neutrophilic dermatosis (OMIM 608068), which responds to IL-1-targeted therapy rather than behaving as colchicine-responsive FMF. <sup class="c" data-ref="Masters2016,Schnappauf2019,UniProtO15553" title="Source 169,234,267">169,234,267</sup> See <a href="#mech" data-go="mech">Pyrin, animated</a>.'}
];
const GN_Z=[
 {from:0,at:.1,k:'Level 1 · Chromosome',t:'Chromosome 16',
  txt:'In 1992, linkage analysis in 27 non-Ashkenazi Jewish families placed the FMF gene on the short arm (p) of chromosome 16, with a maximum LOD score of 19.86. <sup class="c" data-ref="Pras1992" title="Source 214">214</sup>',
  pt:'Everyone has two copies of chromosome 16, one from each parent. The FMF gene sits near the tip of its short arm.',
  hook:'<i>MEFV</i> location: <b>16p13.3</b>. <sup class="c" data-ref="Lancieri2023" title="Source 145">145</sup>'},
 {from:.2,at:.3,k:'Level 2 · Band',t:'Band 16p13.3',
  txt:'In 1997 two consortia cloned the gene independently. The French FMF Consortium named the protein marenostrin, from <i>mare nostrum</i>. The International FMF Consortium named it pyrin and found its 3.7-kb transcript almost only in granulocytes. The whole <i>MEFV</i> region is about 15 kb. <sup class="c" data-ref="FrenchFMF1997,IntFMF1997,Booty2009" title="Source 26,71,109">26,71,109</sup>',
  pt:'Two research teams found the gene in the same year and gave the protein two names.',
  hook:'Pyrin = marenostrin, made mainly in <b>granulocytes</b> (neutrophils).'},
 {from:.4,at:.5,k:'Level 3 · Gene',t:'MEFV: 10 exons',
  txt:'<i>MEFV</i> has 10 exons. Exon 10 encodes the C-terminal B30.2 domain and carries most FMF-causing variants. Standard screening covers exons 2, 3, 5 and 10. <sup class="c" data-ref="Lancieri2023,Touitou2001,Shinar2012" title="Source 145,240,260">145,240,260</sup>',
  pt:'The gene is split into 10 coding pieces. Most disease-causing changes sit in the last piece, exon 10.',
  hook:'Hot spot = <b>exon 10</b>: M694V, M680I, V726A, M694I.'},
 {from:.6,at:.7,k:'Level 4 · Protein',t:'Pyrin: 781 amino acids',
  txt:'UniProt coordinates: pyrin domain (PYD) 1–92, a bZIP-like basic region 266–280, B-box zinc finger 370–412, coiled-coil (CC) 413–442 and B30.2/SPRY 580–775. Reviews give slightly different boundaries, for example B30.2 597–776. The PYD binds the adaptor ASC; FMF variants cluster in B30.2. <sup class="c" data-ref="UniProtO15553,Lancieri2023,Richards2001" title="Source 145,223,267">145,223,267</sup> How this fires the alarm is in <a href="#mech" data-go="mech">Pyrin, animated</a>.',
  pt:'The protein has distinct parts. The front end (PYD) plugs into the alarm machinery. The back end (B30.2) is where FMF changes cluster.',
  hook:'FMF variants are <b>gain of function</b>: in mice, pyrin knockout gave no disease, while human B30.2 variants caused IL-1β-driven inflammation. <sup class="c" data-ref="Chae2011" title="Source 37">37</sup>'},
 {from:.8,at:1,k:'Level 5 · Variants',t:'Tap a pin',
  txt:'Five founder variants (M694V, V726A, M694I, M680I, E148Q) accounted for 74% of FMF chromosomes in typical Armenian, Arab, Jewish and Turkish patients. Pin colour shows the Infevers class on 2026-10-16. Classes change as evidence accumulates. <sup class="c" data-ref="Touitou2001,Infevers2026" title="Source 108,260">108,260</sup>',
  pt:'Each pin is a single-letter change in the protein. M694V means the methionine at position 694 is replaced by valine.',
  hook:'Name format: original amino acid, position, new amino acid. <b>M694V</b> = Met694Val.'}
];
const GN_CROSS=[
 {id:'cc',n:'Carrier × carrier',a:['V','+'],b:['V','+'],la:'carrier',lb:'carrier',
  txt:'25% two variants, 50% carriers, 25% neither. Not every child with two variants becomes ill, because penetrance is incomplete (phenotype III). <sup class="c" data-ref="GeneReviews,Kogan2001" title="Source 76,133">76,133</sup>'},
 {id:'ca',n:'Carrier × two variants',a:['V','V'],b:['V','+'],la:'two variants',lb:'carrier',
  txt:'50% two variants, 50% carriers. FMF then shows up in every generation and can look dominant: pseudodominance. <sup class="c" data-ref="Cazeneuve1999" title="Source 33">33</sup>'},
 {id:'an',n:'Two variants × non-carrier',a:['V','V'],b:['+','+'],la:'two variants',lb:'non-carrier',
  txt:'100% carriers, no child with two variants. Carriers are usually healthy, though some people with one variant do have FMF-like attacks (see the cards below). <sup class="c" data-ref="Booty2009,Jeru2013" title="Source 26,112">26,112</sup>'},
 {id:'cn',n:'Carrier × non-carrier',a:['V','+'],b:['+','+'],la:'carrier',lb:'non-carrier',
  txt:'50% carriers, 50% neither, no child with two variants.'},
 {id:'dn',n:'Dominant-acting variant × non-carrier',a:['D','+'],b:['+','+'],la:'one M694del or T577 variant',lb:'non-carrier',
  txt:'50% inherit the dominant-acting variant and can develop disease from that single copy, with variable penetrance. M694del causes dominant FMF (Booth 2000; 21 UK patients, Rowczenio 2015). Heterozygous T577 variants cause a dominant autoinflammatory disease that responded to colchicine (Stoffels 2014). <sup class="c" data-ref="Booth2000,Rowczenio2015,Stoffels2014" title="Source 25,227,250">25,227,250</sup>'}
];
const GN_P=[
 {from:0,at:.1,k:'Step 1 · Parents',t:'Two copies each',
  txt:'Each person has two copies of <i>MEFV</i>, one on each chromosome 16. FMF is classically autosomal recessive: disease usually needs a variant on both copies. <sup class="c" data-ref="GeneReviews,FrenchFMF1997" title="Source 71,76">71,76</sup>',
  pt:'Everyone has two copies of the gene. Usually both must be changed for FMF.',
  hook:'Recessive: two hits needed. Carriers (one hit) are usually healthy.'},
 {from:.15,at:.34,k:'Step 2 · Gametes',t:'Each parent passes one copy',
  txt:'Egg and sperm cells carry only one copy of each chromosome. Which copy a child receives is a 50:50 chance, decided again at every pregnancy.',
  pt:'Each parent hands down one of their two copies, at random.',
  hook:'Each pregnancy is an independent coin toss from each parent. Having one affected child does not change the odds for the next.'},
 {from:.38,at:.64,k:'Step 3 · Children',t:'Four equally likely combinations',
  txt:'Each box pairs one copy from each parent. The four boxes are equally likely, so each is 25% of the outcomes for any one child.',
  pt:'There are four equally likely ways the copies can combine.',
  hook:'A Punnett square shows <b>probabilities per child</b>, not how many children a family will have of each type.'},
 {from:.8,at:.98,k:'Step 4 · The odds',t:'What the square predicts',txt:'',pt:'The percentages are chances for each pregnancy.',
  hook:'Pseudodominance: affected parent × carrier gives <b>50%</b> two-variant children, so a recessive disease can look dominant. <sup class="c" data-ref="Cazeneuve1999" title="Source 33">33</sup>'}
];
const GN_AL=[['M694V','P',694],['M680I','P',680],['M694I','P',694],['V726A','P',726],['R761H','P',761],['M694del','P',694],['E148Q','VUS',148],['K695R','VUS',695],['A744S','LB',744],['P369S','LB',369],['none','none',0]];
inits.gene=()=>{
  /* ---------- 1. zoom ---------- */
  const svg=$('#gnSvg'),rg=$('#gnT');let sel='M694V';
  const EX=[[60,14],[120,70],[230,34],[300,14],[350,22],[410,14],[455,14],[495,12],[535,22],[590,90]];
  const PORD=['E148Q','S242R','M680I','M694V','M694I','K695R','V726A','A744S','R761H'];
  function draw(t){
    /* narrow: same five levels, stacked in a taller 400-wide column. GX/GW squeeze
       the 60–680 tracks into 18–382; the hot-spot inset keeps its wide geometry
       (it is 360 units across either way) so the pins never crowd. */
    const N=vb(svg,'720 420','400 492');
    const GX=x=>N?18+(x-60)*364/620:x, GW=w=>N?w*364/620:w;
    const ax=a=>GX(60+(a-1)*620/780);
    const IX=a=>N?lerp(18,382,(a-670)/100):lerp(300,660,(a-670)/100);
    const IY=N?410:352;                       /* inset bar top */
    const BY=N?246:236;                       /* protein bar top */
    const PY=N?BY-34:226;                     /* "pyrin · 781 aa" baseline */
    const PIN={E148Q:{x:ax(148),y0:BY+22,hy:N?BY+56:290,lx:ax(148),ly:N?BY+72:304,a:'middle',sub:'exon 2'},
      S242R:{x:ax(242),y0:BY+22,hy:N?BY+56:290,lx:ax(242),ly:N?BY+72:304,a:'middle',sub:'PAAND'},
      M680I:{x:IX(680),y0:IY,hy:IY-24,lx:IX(680),ly:IY-34,a:'middle'},
      M694V:{x:IX(694),y0:IY,hy:IY-58,lx:IX(694),ly:IY-66,a:'middle'},
      M694I:{x:IX(694),y0:IY,hy:IY-18,lx:IX(694)+8,ly:IY-15,a:'start'},
      V726A:{x:IX(726),y0:IY,hy:IY-24,lx:IX(726),ly:IY-34,a:'middle'},
      R761H:{x:IX(761),y0:IY,hy:IY-24,lx:IX(761),ly:IY-34,a:'middle'},
      K695R:{x:IX(695),y0:IY+12,hy:IY+30,lx:IX(695),ly:IY+48,a:'middle'},
      A744S:{x:IX(744),y0:IY+12,hy:IY+30,lx:IX(744),ly:IY+48,a:'middle'}};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const o1=ramp(t,0,.06),o2=ramp(t,.2,.27),o3=ramp(t,.4,.47),o4=ramp(t,.6,.67),o5=ramp(t,.8,.84);
    /* L1 chromosome */
    s+=`<g style="opacity:${f1(o1)}"><text x="${GX(60)}" y="22" class="t-lbl">Chromosome 16</text>`;
    s+=`<rect x="${f1(GX(60))}" y="32" width="${f1(GW(232))}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><rect x="${f1(GX(306))}" y="32" width="${f1(GW(374))}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
    [[92,14],[140,10],[186,18],[236,12],[340,16],[398,22],[470,12],[520,26],[592,14],[640,12]].forEach(([x,w])=>s+=`<rect x="${f1(GX(x))}" y="33" width="${f1(GW(w))}" height="20" style="fill:var(--muted);opacity:.35"/>`);
    s+=`<path d="M${f1(GX(290))} 36L${f1(GX(299))} 43L${f1(GX(308))} 36M${f1(GX(290))} 50L${f1(GX(299))} 43L${f1(GX(308))} 50" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<text x="${f1(GX(N?150:176))}" y="70" class="t-xs t-mid">short arm (p)</text><text x="${f1(GX(493))}" y="70" class="t-xs t-mid">long arm (q)</text><text x="${f1(GX(299))}" y="70" class="t-xs t-mid">centromere</text>`;
    s+=`<rect x="${f1(GX(58))}" y="29" width="${f1(N?15:20)}" height="28" rx="4" style="fill:none;stroke:var(--terra);stroke-width:2.2"/></g>`;
    /* L2 band */
    if(o2>0){s+=`<g style="opacity:${f1(o2)}"><path d="M${f1(GX(60))} 57L${f1(GX(78))} 57L${f1(GX(680))} 98L${f1(GX(60))} 98Z" style="fill:var(--terra);opacity:.08"/>`;
      s+=`<text x="${f1(GX(60))}" y="92" class="t-sm" style="fill:var(--terra)">16p13.3 · tip of the short arm</text>`;
      s+=`<line x1="${f1(GX(60))}" y1="105" x2="${f1(GX(680))}" y2="105" style="stroke:var(--muted);stroke-width:2"/>`;
      [[90,30],[150,18],[200,40],[268,22],[420,26],[470,40],[540,20],[590,34],[640,22]].forEach(([x,w])=>s+=`<rect x="${f1(GX(x))}" y="100" width="${f1(GW(w))}" height="10" rx="2" style="fill:var(--panel-2);stroke:var(--line)"/>`);
      s+=`<rect x="${f1(GX(330))}" y="97" width="${f1(GW(56))}" height="16" rx="3" style="fill:var(--terra)"/><text x="${f1(GX(358))}" y="128" class="t-sm t-mid" style="fill:var(--terra);font-weight:600">MEFV · about 15 kb</text></g>`}
    /* L3 exons */
    if(o3>0){s+=`<g style="opacity:${f1(o3)}"><path d="M${f1(GX(330))} 113L${f1(GX(386))} 113L${f1(GX(680))} 158L${f1(GX(60))} 158Z" style="fill:var(--terra);opacity:.07"/>`;
      s+=`<line x1="${f1(GX(60))}" y1="170" x2="${f1(GX(680))}" y2="170" style="stroke:var(--muted);stroke-width:1.5"/>`;
      EX.forEach(([x,w],i)=>{const hi=i===9;s+=`<rect x="${f1(GX(x))}" y="160" width="${f1(GW(w))}" height="20" rx="3" style="fill:${hi?'var(--terra)':'var(--sea)'};opacity:${hi?1:.75}"/><text x="${f1(GX(x)+GW(w)/2)}" y="194" class="t-xs t-mid" ${hi?'style="fill:var(--terra);font-weight:700"':''}>${i+1}</text>`});
      s+=`<text x="${f1(GX(635))}" y="154" class="t-xs t-mid" style="fill:var(--terra);font-weight:700">exon 10</text><text x="${f1(GX(60))}" y="154" class="t-xs">exons (sizes schematic)</text></g>`}
    /* L4 protein */
    if(o4>0){s+=`<g style="opacity:${f1(o4)}">`;
      s+=`<path d="M${f1(GX(590))} 180L${f1(ax(580))} ${BY}M${f1(GX(680))} 180L${f1(ax(775))} ${BY}" style="stroke:var(--terra);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      s+=`<text x="${f1(GX(60))}" y="${PY}" class="t-sm">pyrin · 781 aa</text>`;
      s+=`<rect x="${f1(GX(60))}" y="${BY}" width="${f1(GW(620))}" height="22" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      const D=[[1,92,'PYD','var(--sea)'],[266,280,'','var(--gold)'],[370,412,'B-box','var(--crocus)'],[413,442,'CC','var(--muted)'],[580,775,'B30.2','var(--terra)']];
      D.forEach(([a,b,l,c])=>{const x=ax(a),w=ax(b)-ax(a);s+=`<rect x="${f1(x)}" y="${BY}" width="${f1(w)}" height="22" rx="4" style="fill:${c};opacity:.85"/>`;
        if(l&&(!N||l==='PYD'||l==='B30.2'))s+=`<text x="${f1(x+w/2)}" y="${BY+15}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${l}</text>`});
      /* the small domains have no room for labels inside the narrow bar: list them instead */
      if(N)s+=`<text x="18" y="${PY+12}" class="t-xs"><tspan style="fill:var(--gold)">bZIP</tspan> 266–280 · <tspan style="fill:var(--crocus)">B-box</tspan> 370–412 · <tspan style="fill:var(--muted)">CC</tspan> 413–442</text>`;
      else s+=`<text x="${f1(ax(273))}" y="${BY-6}" class="t-xs t-mid" style="fill:var(--gold);font-weight:700">bZIP</text>`;
      /* narrow: the 600/781 ticks sit where the hot-spot cone and the exon leaders
         converge, so the ruler stops at 400 (the length is in the label above) */
      (N?[[1,'1'],[200,'200'],[400,'400']]:[[1,'1'],[200,'200'],[400,'400'],[600,'600'],[781,'781']]).forEach(([a,l])=>s+=`<text x="${f1(ax(a))}" y="${BY+36}" class="t-xs t-mid">${l}</text>`);
      s+='</g>'}
    /* L5 pins */
    if(o5>0){s+=`<g style="opacity:${f1(o5)}">`;
      s+=`<path d="M${f1(ax(670))} ${BY+22}L${f1(IX(670))} ${IY}M${f1(ax(770))} ${BY+22}L${f1(IX(770))} ${IY}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
      s+=`<rect x="${f1(IX(670))}" y="${IY}" width="${f1(IX(770)-IX(670))}" height="12" rx="3" style="fill:var(--terra);opacity:.3"/>`;
      [680,700,720,740,760].forEach(a=>s+=`<line x1="${f1(IX(a))}" x2="${f1(IX(a))}" y1="${IY}" y2="${IY+12}" style="stroke:var(--panel);stroke-width:1"/>`);
      s+=`<text x="${f1(IX(670))}" y="${IY+64}" class="t-xs">B30.2 hot spot, aa 670–770 (magnified)</text>`;
      PORD.forEach((id,i)=>{const P=PIN[id],V=GN_VARS.find(v=>v.id===id),o=ramp(t,.8+i*.018,.83+i*.018);if(o<=0)return;
        const on=id===sel,c=GN_CLSC[V.cls],hy=lerp(P.y0,P.hy,ease(o));
        s+=`<g class="clk" data-v="${id}" role="button" aria-label="${id}" style="opacity:${f1(o)}"><line x1="${f1(P.x)}" x2="${f1(P.x)}" y1="${P.y0}" y2="${f1(hy)}" style="stroke:${c};stroke-width:1.6"/>`;
        s+=`<circle cx="${f1(P.x)}" cy="${f1(hy)}" r="${on?7:5.5}" style="fill:${c};stroke:${on?'var(--ink)':'none'};stroke-width:2"/>`;
        s+=`<circle cx="${f1(P.x)}" cy="${f1(hy)}" r="13" style="fill:transparent"/>`;
        s+=`<text x="${f1(P.lx)}" y="${P.ly}" class="t-xs" style="text-anchor:${P.a};fill:${on?'var(--ink)':c};font-weight:700">${id}</text>`;
        if(P.sub)s+=`<text x="${f1(P.lx)}" y="${P.ly+11}" class="t-xs t-mid">${P.sub}</text>`;
        s+='</g>'});
      s+='</g>'}
    svg.innerHTML=s;
    const p=phaseOf(GN_Z,t);setSt(p);$('#gnNote').innerHTML=noteHTML(GN_Z[p]);
  }
  const stop=playWire(rg,$('#gnPlay'),draw,15000,'Replay','gene');
  const setSt=stepWire($('#gnSteps'),GN_Z,rg,draw,stop);
  function pick(id){sel=id;const V=GN_VARS.find(v=>v.id===id);
    $$('[data-vc]',$('#gnChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.vc===id));
    $('#gnVar').innerHTML=`<span class="kicker">${V.ex} · residue ${V.aa}</span><h4>${V.id} <span class="gn-cls ${V.cls}">Infevers, read 2026-10-16: ${GN_CLSN[V.cls]}</span></h4><dl><dt>Where it is common</dt><dd>${V.pop}</dd><dt>Severity and notes</dt><dd>${V.sev}</dd></dl>`;
    if(+rg.value<.84){rg.value=1}draw(+rg.value)}
  $('#gnChips').innerHTML=GN_VARS.map(v=>`<button class="btn" data-vc="${v.id}" aria-pressed="false"><span style="color:${GN_CLSC[v.cls]}">●</span> ${v.id}</button>`).join('');
  $('#gnLegend').innerHTML=['P','LP','VUS','LB'].map(c=>`<span><i style="background:${GN_CLSC[c]}"></i>${GN_CLSN[c]}</span>`).join('');
  $('#gnChips').addEventListener('click',e=>{const b=e.target.closest('[data-vc]');if(b){stop();pick(b.dataset.vc)}});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-v]');if(g){stop();pick(g.dataset.v)}});
  draw(+rg.value);
  (()=>{const V=GN_VARS[0];$$('[data-vc]',$('#gnChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.vc===V.id));
    $('#gnVar').innerHTML=`<span class="kicker">${V.ex} · residue ${V.aa}</span><h4>${V.id} <span class="gn-cls ${V.cls}">Infevers, read 2026-10-16: ${GN_CLSN[V.cls]}</span></h4><dl><dt>Where it is common</dt><dd>${V.pop}</dd><dt>Severity and notes</dt><dd>${V.sev}</dd></dl>`})();

  /* ---------- 2. Punnett ---------- */
  const ps=$('#gnPun'),rp=$('#gnPT');let X=GN_CROSS[0];
  const chip=(x,y,a,r=14)=>{const c=a==='V'?'var(--terra)':a==='D'?'var(--bad)':'var(--sea)';return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${c}"/><text x="${f1(x)}" y="${f1(y+4.5)}" class="t-lbl t-mid" style="fill:var(--panel)">${a==='D'?'Δ':a}</text>`};
  const kind=(a,b)=>(a==='D'||b==='D')?'dom':(a==='V'&&b==='V')?'two':(a==='V'||b==='V')?'car':'none';
  const KN={two:['two variants','var(--terra-soft)','var(--terra)'],car:['carrier','var(--gold-soft)','var(--gold)'],none:['no variant','var(--sea-soft)','var(--sea)'],dom:['dominant variant','var(--bad-soft)','var(--bad)']};
  function drawP(t){
    /* narrow: both parents stack above a square grid, and the odds move underneath */
    const N=vb(ps,'720 400','400 668');
    const CX=N?[205,315]:[290,410],RY=N?[265,375]:[197,292],HX=N?118:190,HY=N?188:128;
    const GX0=N?150:230,GY0=N?210:150,CW=N?110:120,CH=N?110:95;
    const P1=N?[[175,48],[225,48]]:[[325,52],[375,52]],P2=N?[[175,114],[225,114]]:[[55,245],[105,245]];
    const B1=N?[140,30]:[290,34],B2=N?[140,96]:[20,227];
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<rect x="${B1[0]}" y="${B1[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B1[0]+60}" y="${B1[1]-10}" class="t-sm t-mid">Parent 1: ${X.la}</text>`;
    s+=`<rect x="${B2[0]}" y="${B2[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B2[0]+60}" y="${B2[1]-10}" class="t-sm t-mid">Parent 2: ${X.lb}</text>`;
    const g=ease(ramp(t,.15,.34));
    /* grid */
    const go=ramp(t,.1,.18);
    s+=`<g style="opacity:${f1(go)}">${N?`<text x="18" y="192" class="t-xs">gametes from parent 1</text><text x="${HX}" y="310" class="t-xs t-mid">gametes</text><text x="${HX}" y="321" class="t-xs t-mid">parent 2</text>`:`<text x="350" y="104" class="t-xs t-mid">gametes from parent 1</text><text x="${HX}" y="160" class="t-xs t-mid">gametes</text><text x="${HX}" y="171" class="t-xs t-mid">parent 2</text>`}`;
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=kind(X.a[c],X.b[r]),fo=ramp(t,.64+(r*2+c)*.03,.72+(r*2+c)*.03);
      s+=`<rect x="${GX0+c*CW}" y="${GY0+r*CH}" width="${CW}" height="${CH}" style="fill:${fo>0?KN[k][1]:'var(--panel)'};stroke:var(--line);stroke-width:1.5"/>`;
      if(fo>0)s+=`<rect x="${GX0+2+c*CW}" y="${GY0+2+r*CH}" width="${CW-4}" height="${CH-4}" style="fill:none;stroke:${KN[k][2]};stroke-width:2;opacity:${f1(fo)}"/><text x="${CX[c]}" y="${RY[r]+(N?36:34)}" class="t-xs t-mid" style="fill:${KN[k][2]};font-weight:700;opacity:${f1(fo)}">${KN[k][0]}</text>`}
    s+='</g>';
    /* parents' alleles moving to gamete headers */
    P1.forEach(([x,y],i)=>{s+=chip(x,y,X.a[i],12);if(g>0){const hx=lerp(x,CX[i],g),hy=lerp(y,HY,g);s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(16+4*g)}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:${f1(g)}"/>`+chip(hx,hy,X.a[i])}});
    P2.forEach(([x,y],i)=>{s+=chip(x,y,X.b[i],12);if(g>0){const hx=lerp(x,HX,g),hy=lerp(y,RY[i],g);s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(16+4*g)}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:${f1(g)}"/>`+chip(hx,hy,X.b[i])}});
    /* fertilization: copies fly into cells */
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=r*2+c,f=ease(ramp(t,.38+k*.06,.5+k*.06));if(f<=0)continue;
      s+=chip(lerp(CX[c],CX[c]-18,f),lerp(HY,RY[r]-4,f),X.a[c],13)+chip(lerp(HX,CX[c]+18,f),lerp(RY[r],RY[r]-4,f),X.b[r],13)}
    /* odds panel */
    const op=ramp(t,.8,.88);
    if(op>0){const cnt={};for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=kind(X.a[c],X.b[r]);cnt[k]=(cnt[k]||0)+1}
      const ox=N?18:496;
      s+=`<g style="opacity:${f1(op)}"><text x="${ox}" y="${N?456:160}" class="t-sm">per child</text>`;
      ['dom','two','car','none'].filter(k=>cnt[k]).forEach((k,i)=>{const y=N?490+i*44:196+i*58,pc=cnt[k]*25*ease(ramp(t,.84,.97));
        s+=`<text x="${ox}" y="${y}" class="t-big" style="fill:${KN[k][2]};font-size:26px">${Math.round(pc)}%</text><text x="${N?96:ox}" y="${N?y:y+16}" class="t-xs">${KN[k][0]}</text>`;
        const bx=N?200:556,bw=N?130:56;
        s+=`<rect x="${bx}" y="${y-14}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y-14}" width="${f1(bw*pc/100)}" height="10" rx="5" style="fill:${KN[k][2]}"/>`});
      s+='</g>'}
    /* legend */
    const ly=N?624:378,lx0=N?26:40;
    s+=chip(lx0,ly,'V',9)+`<text x="${lx0+14}" y="${ly+4}" class="t-xs">FMF variant</text>`+chip(150,ly,'+',9)+`<text x="164" y="${ly+4}" class="t-xs">usual copy</text>`;
    if(X.id==='dn')s+=chip(N?lx0:260,N?ly+24:ly,'D',9)+`<text x="${(N?lx0:260)+14}" y="${(N?ly+24:ly)+4}" class="t-xs">dominant-acting variant (M694del, T577)</text>`;
    ps.innerHTML=s;
    const p=phaseOf(GN_P,t);setP(p);const P=Object.assign({},GN_P[p]);if(p===3)P.txt=X.txt;$('#gnPNote').innerHTML=noteHTML(P);
  }
  const stopP=playWire(rp,$('#gnPPlay'),drawP,12000,'Replay','gene');
  const setP=stepWire($('#gnPSteps'),GN_P,rp,drawP,stopP);
  $('#gnCross').innerHTML=GN_CROSS.map((c,i)=>`<button class="btn" data-cx="${i}" aria-pressed="${i===0}">${c.n}</button>`).join('');
  const readP=()=>$('#gnPRead').innerHTML=`<span><b>${X.n}</b></span><span>${X.txt}</span>`;
  $('#gnCross').addEventListener('click',e=>{const b=e.target.closest('[data-cx]');if(!b)return;X=GN_CROSS[+b.dataset.cx];
    $$('[data-cx]',$('#gnCross')).forEach(x=>x.setAttribute('aria-pressed',x===b));readP();drawP(+rp.value)});
  readP();drawP(+rp.value);

  /* ---------- 3. read a genetic result ---------- */
  const s1=$('#gnA1'),s2=$('#gnA2');
  const opts=GN_AL.map(([n])=>`<option value="${n}">${n==='none'?'No variant found':n}</option>`).join('');
  s1.innerHTML=opts;s2.innerHTML=opts;s1.value='M694V';s2.value='none';
  const ST=[['Pathogenic',12,'var(--bad)'],['Likely pathogenic',38,'var(--terra)'],['VUS',176,'var(--warn)'],['Likely benign',143,'var(--good)'],['Benign',14,'var(--sea)'],['Not classified',20,'var(--muted)'],['Unsolved',9,'var(--line)']];
  $('#gnStack').innerHTML=ST.map(([n,v,c])=>`<i style="width:${(v/412*100).toFixed(2)}%;background:${c}" title="${n}: ${v}"></i>`).join('');
  $('#gnStackLeg').innerHTML=ST.map(([n,v,c])=>`<span><i style="background:${c}"></i>${n} ${v}</span>`).join('')+'<span><sup class="c" data-ref="Infevers2026" title="Source 108">108</sup></span>';
  const grp=c=>(c==='P'||c==='LP')?'path':c==='VUS'?'vus':'out';
  function interp(){
    const A=GN_AL.find(x=>x[0]===s1.value),B=GN_AL.find(x=>x[0]===s2.value);
    const ga=grp(A[1]),gb=grp(B[1]),gs=[ga,gb].sort().join('+');
    let v,cl,txt;
    if(gs==='path+path'){cl='conf';v=A[0]===B[0]?'Confirmatory genotype (homozygous)':'Confirmatory genotype (compound heterozygous, if in trans)';
      txt='Two pathogenic or likely pathogenic variants on both copies (biallelic). In the Eurofever/PRINTO 2019 criteria this plus <b>at least 1 of 4</b> clinical items (episodes of 1–3 days, arthritis, chest pain, abdominal pain) classifies as FMF, once two prerequisites hold: acute-phase reactants raised during flares, and other causes considered with at least 6 months of recurrent activity. <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>'+(A[0]!==B[0]?' Two different variants count only if they sit on different copies (in trans); testing parents is the usual way to show this.':'')}
    else if(gs==='path+vus'){cl='non';v='Non-confirmatory genotype: pathogenic + VUS';txt='One pathogenic variant plus one of uncertain significance, in trans. The criteria then need <b>at least 2 of 4</b> clinical items. <sup class="c" data-ref="Gattorno2019,Lancieri2023" title="Source 75,145">75,145</sup>'}
    else if(gs==='vus+vus'){cl='non';v='Non-confirmatory genotype: two VUS';txt='Two variants of uncertain significance on both copies. The criteria need <b>at least 2 of 4</b> clinical items. GeneReviews notes that two VUS neither establish nor rule out FMF. <sup class="c" data-ref="Gattorno2019,GeneReviews" title="Source 75,76">75,76</sup>'}
    else if(gs==='out+path'){cl='non';v='Non-confirmatory genotype: a single pathogenic variant';txt='One pathogenic variant, no second qualifying variant. The criteria need <b>at least 2 of 4</b> clinical items. One lab summarizes this as "at least a carrier", who may still have symptoms. <sup class="c" data-ref="Gattorno2019,ARUP2023" title="Source 6,75">6,75</sup>'}
    else if(gs==='out+vus'){cl='none';v='Not a qualifying genotype: one VUS only';txt='A single VUS is neither confirmatory nor non-confirmatory. Classification would rest on the clinical-only set (at least 6 of 9 items). A VUS result is inconclusive. <sup class="c" data-ref="Gattorno2019,ARUP2023" title="Source 6,75">6,75</sup>'}
    else{cl='none';v='No qualifying variant';txt='Benign and likely-benign variants are excluded from the criteria. With no pathogenic variant FMF is less likely but not excluded: about 10–20% of FMF patients carry no <i>MEFV</i> variant. The clinical-only set (at least 6 of 9 items) can still classify FMF. <sup class="c" data-ref="Gattorno2019,BenZvi2015,ARUP2023" title="Source 6,19,75">6,19,75</sup>'}
    const ex=[];const has=n=>A[0]===n||B[0]===n;
    if(A[0]==='M694V'&&B[0]==='M694V')ex.push('SHARE: M694V homozygotes have a "very high probability" of severe disease (level B), and those without symptoms should be followed closely (level A). <sup class="c" data-ref="Giancane2015,Ozen2017" title="Source 82,200">82,200</sup>');
    if(has('M694del'))ex.push('M694del can act dominantly: a single copy has caused autosomal-dominant FMF with variable penetrance. <sup class="c" data-ref="Booth2000,Rowczenio2015" title="Source 25,227">25,227</sup>');
    if(has('E148Q')&&(gs==='out+vus'||(A[0]==='E148Q'&&B[0]==='E148Q')))ex.push('SHARE: E148Q as the only variant does not support an FMF diagnosis (level B). <sup class="c" data-ref="Giancane2015,Ozen2017" title="Source 82,200">82,200</sup>');
    if(has('E148Q')||has('K695R'))ex.push('E148Q and K695R are linked to mild disease or low penetrance. <sup class="c" data-ref="Touitou2001,Lancieri2023" title="Source 145,260">145,260</sup>');
    if(has('A744S')||has('P369S'))ex.push('A744S and P369S are likely benign in Infevers 2026, so the criteria ignore them. Older lists treated them differently. <sup class="c" data-ref="Infevers2026,Shinar2012" title="Source 108,240">108,240</sup>');
    const row=x=>`<div><b style="font-family:var(--mono);min-width:5.5em">${x[0]==='none'?'—':x[0]}</b><span class="gn-cls ${x[1]}">${x[0]==='none'?'No variant found':GN_CLSN[x[1]]}</span></div>`;
    $('#gnOut').innerHTML=`<div class="gn-al"><span class="kicker">Infevers class today</span>${row(A)}${row(B)}</div>
      <div class="gn-verdict ${cl}"><span class="kicker">Eurofever/PRINTO 2019 genotype</span><b class="v">${v}</b><p>${txt}</p></div>
      ${ex.length?`<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">${ex.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
      <div class="pt"><b>In plain words</b>FMF is diagnosed from symptoms; the gene test supports it but cannot rule it out. About 10–20% of people with typical FMF have no variant found, and up to about 25% have only one. <sup class="c" data-ref="Giancane2015,BenZvi2015,GeneReviews" title="Source 19,76,82">19,76,82</sup></div>
      <div class="hook"><b>Exam hook</b>Eurofever/PRINTO criteria are <b>classification</b> criteria for research, not a diagnostic test for one patient. Variant classes change over time: the classes shown here are the ones Infevers listed on 2026-10-16. <sup class="c" data-ref="Gattorno2019,Infevers2026" title="Source 75,108">75,108</sup></div>
      <p><a href="#dx" data-go="dx">Try the criteria calculator in Diagnosis &amp; criteria →</a></p>`;
    /* chromosome sketch */
    const rx=a=>70+a/781*270;let s='';
    [[A,40,'copy 1'],[B,92,'copy 2']].forEach(([x,y,l])=>{s+=`<text x="8" y="${y+4}" class="t-xs">${l}</text><rect x="70" y="${y-7}" width="270" height="14" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<rect x="${f1(rx(580))}" y="${y-7}" width="${f1(rx(775)-rx(580))}" height="14" rx="3" style="fill:var(--terra);opacity:.18"/>`;
      if(x[0]==='none')s+=`<text x="205" y="${y+4}" class="t-xs t-mid">no variant found</text>`;
      else{const c=GN_CLSC[x[1]];s+=`<line x1="${f1(rx(x[2]))}" x2="${f1(rx(x[2]))}" y1="${y-7}" y2="${y-16}" style="stroke:${c};stroke-width:2"/><circle cx="${f1(rx(x[2]))}" cy="${y}" r="6" style="fill:${c}"/><text x="${f1(Math.min(rx(x[2]),316))}" y="${y-20}" class="t-xs t-mid" style="fill:${c};font-weight:700">${x[0]}</text>`}});
    s+=`<text x="${f1((rx(580)+rx(775))/2)}" y="116" class="t-xs t-mid">B30.2 (exon 10)</text>`;
    $('#gnRes').innerHTML=s;
  }
  s1.addEventListener('change',interp);s2.addEventListener('change',interp);interp();

  /* ---------- 4. cards ---------- */
  $('#gnCards').innerHTML=`
   <div class="card"><h4>Phenotype II: amyloidosis first</h4><p>AA amyloidosis as the first or only sign, in someone who never had attacks. <sup class="c" data-ref="Melikoglu2000,GeneReviews" title="Source 76,171">76,171</sup> It is rare, and estimates differ: at most 0.3% of the 2,838-patient Turkish registry, about 0.6% in a later review whose authors doubt it is a separate entity, and no biopsy-proven case among 461 relatives of FMF-amyloidosis patients. <sup class="c" data-ref="TurkishFMF2005,GulBenChetrit2025,Melikoglu2000" title="Source 89,171,264">89,171,264</sup> SHARE advises following people with two pathogenic variants and no symptoms, and considering treatment when amyloidosis risk factors are present (level B). <sup class="c" data-ref="Giancane2015,Ozen2017" title="Source 82,200">82,200</sup></p></div>
   <div class="card"><h4>One variant, real symptoms</h4><p>Up to about 25% of people with FMF have only one identifiable variant <sup class="c" data-ref="GeneReviews,MarekYagel2009" title="Source 76,168">76,168</sup>; 12% in one Turkish cohort <sup class="c" data-ref="Lachmann2006" title="Source 141">141</sup> and 32% in a referral cohort. <sup class="c" data-ref="Tanatar2020" title="Source 253">253</sup> Booty 2009 resequenced the whole 15-kb region in 46 such patients and found no second variant; one variant plus typical symptoms was judged enough to diagnose FMF and try colchicine. <sup class="c" data-ref="Booty2009" title="Source 26">26</sup> Jéru 2013 saw heterozygosity as a susceptibility factor rather than Mendelian FMF. <sup class="c" data-ref="Jeru2013" title="Source 112">112</sup> Gene dose matters. <sup class="c" data-ref="Federici2012" title="Source 64">64</sup></p></div>
   <div class="card"><h4>Truly dominant variants</h4><ul><li><b>M694del</b>: dominant FMF with variable penetrance (Booth 2000); one patient had AA amyloidosis. <sup class="c" data-ref="Booth2000" title="Source 25">25</sup> A UK screen of about 3,500 patients found 21, all North-Western European, sharing a founder about 550 years old; median onset 18, excellent colchicine response. <sup class="c" data-ref="Rowczenio2015" title="Source 227">227</sup></li><li><b>T577N/S/A</b>, just before B30.2: dominant autoinflammation; T577N was absent from about 6,800 controls; colchicine-responsive. <sup class="c" data-ref="Stoffels2014" title="Source 250">250</sup></li><li>One lab also lists I692del as dominant with reduced penetrance. <sup class="c" data-ref="ARUP2023" title="Source 6">6</sup></li></ul></div>
   <div class="card"><h4>Genotype and severity</h4><p>M694V homozygotes: earlier onset, more arthritis (Shinar 2000). <sup class="c" data-ref="Shinar2000" title="Source 239">239</sup> Amyloidosis link: yes in 90 Armenians (Cazeneuve 1999) <sup class="c" data-ref="Cazeneuve1999" title="Source 33">33</sup>, no in 2,838 Turks, where amyloidosis still affected 12.9% of the cohort (Tunca 2005). <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup> Among 124 M694V homozygotes, male sex (OR 2.37) and arthritic attacks (OR 3.27) raised amyloidosis risk. <sup class="c" data-ref="GershoniBaruch2003" title="Source 78">78</sup></p><div class="hook"><b>Exam hook</b>Studies disagree on M694V and amyloidosis; country of origin is itself a risk factor in SHARE. <sup class="c" data-ref="Giancane2015" title="Source 82">82</sup></div></div>
   <div class="card"><h4>What panels test</h4><p>Many labs test in two steps: common pathogenic variants first, then the full coding sequence. Screening covers exons 2, 3, 5 and 10; searching other exons in clinically definite FMF adds little. <sup class="c" data-ref="Shinar2012" title="Source 240">240</sup></p><ul><li>Exon 2: E148Q, E167D, T267I, R202Q</li><li>Exon 3: P369S, R408Q · Exon 5: F479L · Exon 9: I591T</li><li>Exon 10: M680I, M694V, M694I, V726A, A744S, R761H, I692del, K695R</li></ul></div>
   <div class="card"><h4>Limits of testing</h4><p>About 10–20% of FMF patients carry no <i>MEFV</i> variant, with a classic but milder picture than M694V homozygotes. <sup class="c" data-ref="BenZvi2015" title="Source 19">19</sup> One lab estimates full sequencing sensitivity at 75–90%; deep intronic and regulatory variants are missed, and large deletions or duplications have not been reported as causes. <sup class="c" data-ref="ARUP2023" title="Source 6">6</sup> FMF remains a clinical diagnosis (SHARE, level B). <sup class="c" data-ref="Giancane2015" title="Source 82">82</sup></p></div>
   <div class="card"><h4>OMIM numbers</h4><ul><li><b>249100</b> FMF, autosomal recessive</li><li><b>134610</b> FMF, autosomal dominant</li><li><b>608107</b> the <i>MEFV</i> gene</li><li><b>608068</b> PAAND</li></ul><p><sup class="c" data-ref="UniProtO15553" title="Source 267">267</sup></p></div>
   <div class="card"><h4>PAAND is not FMF</h4><p>S242R removes a 14-3-3 binding site directly, so one copy causes a dominant disease with neutrophilic dermatosis, prolonged fever and myalgia. It responds to IL-1-targeted therapy rather than behaving as colchicine-responsive FMF. <sup class="c" data-ref="Masters2016,Schnappauf2019" title="Source 169,234">169,234</sup></p></div>`;
};

/* =============== 1.3 mechanism =============== */
const MX=[
 {from:0,at:.06,k:'Step 1 · Resting',t:'RhoA on, pyrin held off',
  txt:'Active RhoA (bound to GTP) switches on two kinases, PKN1 and PKN2. They put phosphate groups on pyrin at serine 208 and serine 242. 14-3-3 proteins grab those phosphates and hold pyrin in an inactive shape. <sup class="c" data-ref="Park2016,Gao2016" title="Source 74,207">74,207</sup>',
  pt:'Pyrin is a guard that is kept asleep as long as a cell switch called RhoA stays on.',
  hook:'Pyrin is a <b>guard</b> of RhoA activity, not a direct sensor of microbial molecules. Phospho-S208/S242 + 14-3-3 = OFF.'},
 {from:.15,at:.22,k:'Step 2 · The switch dips',t:'RhoA activity falls',
  txt:'Several bacteria make toxins or effectors that modify and inactivate RhoA. Pyrin evolved to notice that loss of RhoA signaling, a classic "guard" strategy. <sup class="c" data-ref="Xu2014" title="Source 275">275</sup>',
  pt:'Some germs switch RhoA off. Pyrin notices the switch going quiet.',
  hook:'Xu et al. 2014 showed pyrin senses <b>modification of Rho GTPases</b>, not the bacterium itself.'},
 {from:.32,at:.38,k:'Step 3 · Release',t:'PKN stops, phosphates drop off',
  txt:'Without RhoA, PKN activity falls, pyrin is dephosphorylated and 14-3-3 lets go. A second, microtubule-dependent step is then needed for pyrin to assemble in normal cells. FMF-associated B30.2 variants make pyrin need less: dephosphorylation alone can be enough. FMF cells are not switched on all the time: they respond to stimuli too weak to move normal cells, more strongly with two variants than one. <sup class="c" data-ref="Park2016,VanGorp2016,Magnotti2019,Jamilloux2018" title="Source 110,162,207,270">110,162,207,270</sup> Exactly how the variants weaken the brake is debated: Park 2016 found reduced PKN and 14-3-3 binding, while other work points to the later, microtubule-dependent control step. <sup class="c" data-ref="Park2016,Masters2016,Magnotti2019" title="Source 162,169,207">162,169,207</sup>',
  pt:'With the switch off, the brakes on pyrin come off. In FMF the brakes are weaker to begin with.',
  hook:'Normal pyrin needs <b>two</b> steps (dephosphorylation + a microtubule-dependent step). FMF pyrin needs less, so it fires at a lower threshold.'},
 {from:.45,at:.53,k:'Step 4 · Inflammasome',t:'Pyrin–ASC–caspase-1 speck',
  txt:'Freed pyrin binds the adaptor ASC through its PYD domain. ASC polymerizes into one large "speck" per cell and recruits pro-caspase-1, which activates itself. <sup class="c" data-ref="Richards2001,Lu2014,Broz2016" title="Source 27,160,223">27,160,223</sup>',
  pt:'Pyrin pulls helper proteins together into one big alarm complex.',
  hook:'Inflammasome = sensor (pyrin) + adaptor (<b>ASC</b>) + effector (<b>caspase-1</b>).'},
 {from:.62,at:.70,k:'Step 5 · Cytokines',t:'IL-1β and IL-18 are cut and released',
  txt:'Caspase-1 cleaves inactive pro-IL-1β and pro-IL-18 into their active forms. IL-1β is the main driver of fever, neutrophil recruitment and the acute-phase response (CRP and SAA from the liver). <sup class="c" data-ref="Schnappauf2019,Dinarello2011" title="Source 57,234">57,234</sup>',
  pt:'The alarm complex cuts two messenger proteins into their active forms. One of them, IL-1β, causes the fever.',
  hook:'Blocking IL-1 (anakinra, canakinumab, rilonacept) works in colchicine-resistant FMF because IL-1β is downstream of pyrin.'},
 {from:.78,at:.9,k:'Step 6 · Pyroptosis',t:'Gasdermin D pores, the cell bursts',
  txt:'Caspase-1 also cuts gasdermin D. Its N-terminal fragment punches pores in the cell membrane. IL-1β leaves through the pores, then the swollen cell ruptures: pyroptosis, an inflammatory cell death. The pores are roughly 10–14 nm wide. More neutrophils are called in. <sup class="c" data-ref="Shi2015,Liu2016,Evavold2018" title="Source 61,157,238">61,157,238</sup>',
  pt:'The cell opens holes in its own surface, lets the alarm out and then bursts, calling more white cells to the spot.',
  hook:'Pyroptosis is inflammatory (contents spill). Apoptosis is quiet. Gasdermin D is the pore-former.'}
];
inits.mech=()=>{
  const svg=$('#mxSvg'),rg=$('#mxT');let mut=false,path=false;
  const TH={norm:.3,mut:.72};
  const r=rng(5);const ASC=Array.from({length:26},(_,i)=>({a:i/26*Math.PI*2,d:24+r()*12}));
  const fires=()=>{const lvl=path?.1:.6;return lvl<(mut?TH.mut:TH.norm)};
  function draw(t){
    const lvlTarget=path?.1:.6, th=mut?TH.mut:TH.norm, fire=fires();
    const dip=ramp(t,.15,.3);const recover=fire?0:ramp(t,.55,.8);
    const lvl=lerp(1,lerp(lvlTarget,1,recover),dip);
    const rel=fire?ease(ramp(t,.32,.45)):0, asm=fire?ease(ramp(t,.45,.6)):0, cut=fire?ease(ramp(t,.62,.76)):0, pore=fire?ease(ramp(t,.78,.9)):0, burst=fire?ramp(t,.9,1):0;
    const sw=1+.05*pore+.04*burst;
    const N=vb(svg,'720 390','400 712');
    const L=N
      ? {cx:200,cy:352,W:168,H:180, gx:20,gy:20,gbx:20,gbw:360, vx:20,vy:78,vAnchor:'',
         rx:90,ry:236, pknX:152,pknY:220, phA:208,phB:248,
         pxA:52,pxB:44, pyA:330,pyB:442, PS:.78,
         speckX:165,speckY:452, caspX:252,caspY:400,
         cytX:232,cytY:288,cytStep:30, exitX:352,
         nfX:30,nfY:556,nfW:340, neuX0:430,neuX1:312,neuY:596,neuStep:34, feverX:380,feverY:700}
      : {cx:300,cy:215,W:250,H:150, gx:40,gy:18,gbx:144,gbw:196, vx:350,vy:28,vAnchor:'',
         rx:110,ry:140, pknX:165,pknY:124, phA:222,phB:262,
         pxA:270,pxB:250, pyA:140,pyB:250, PS:1,
         speckX:250,speckY:250, caspX:330,caspY:205,
         cytX:390,cytY:200,cytStep:36, exitX:null,
         nfX:360,nfY:230,nfW:230, neuX0:760,neuX1:640,neuY:90,neuStep:110, feverX:700,feverY:370};
    let s=`<defs>${marker('mxA')}${marker('mxAt','var(--terra)')}</defs>`;
    // outside + membrane
    const cx=L.cx,cy=L.cy,W=L.W*sw,H=L.H*sw;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const poreAng=[-.5,-.15,.2,.55];
    s+=`<ellipse cx="${cx}" cy="${cy}" rx="${f1(W)}" ry="${f1(H)}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:5;${burst>.5?'stroke-dasharray:'+f1(30-20*burst)+' '+f1(6+30*burst):''}"/>`;
    if(pore>0)poreAng.forEach(a=>{const x=cx+W*Math.cos(a),y=cy+H*Math.sin(a);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(7*pore)}" style="fill:var(--field);stroke:var(--terra);stroke-width:2"/>`});
    s+=`<text x="${f1(cx-W+14)}" y="${f1(cy-H+26)}" class="t-sm">NEUTROPHIL CYTOPLASM</text>`;
    // gauge
    s+=`<text x="${L.gx}" y="${L.gy+8}" class="t-sm">RhoA ACTIVITY</text><rect x="${L.gbx}" y="${N?L.gy+18:L.gy}" width="${L.gbw}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const gby=N?L.gy+18:L.gy;
    s+=`<rect x="${L.gbx}" y="${gby}" width="${f1(L.gbw*lvl)}" height="12" rx="6" style="fill:var(--sea)"/>`;
    const tx=L.gbx+L.gbw*th;
    s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${gby-5}" y2="${gby+17}" style="stroke:var(--terra);stroke-width:3"/><text x="${f1(clamp(tx,56,L.gbx+L.gbw-56))}" y="${gby+30}" class="t-xs t-mid" style="fill:var(--terra)">${mut?'M694V threshold':'normal threshold'}</text>`;
    s+=`<text x="${L.vx}" y="${L.vy}" class="t-sm">${lvl<th?'<tspan style="fill:var(--terra)">below threshold → fire</tspan>':'above threshold → stay off'}</text>`;
    // RhoA + PKN
    const on=lvl;
    s+=`<circle cx="${L.rx}" cy="${L.ry}" r="${f1(20+6*on)}" style="fill:var(--sea);opacity:${f1(.15+.25*on)}"/><circle cx="${L.rx}" cy="${L.ry}" r="20" style="fill:var(--panel);stroke:var(--sea);stroke-width:2.5"/><text x="${L.rx}" y="${L.ry+4}" class="t-lbl t-mid">RhoA</text>`;
    s+=`<text x="${L.rx}" y="${L.ry+36}" class="t-xs t-mid" style="fill:${on>.5?'var(--sea)':'var(--muted)'}">${on>.5?'GTP · ON':'GDP · off'}</text>`;
    if(path&&dip>.2)s+=`<g style="opacity:${f1(dip)}"><path d="M${L.rx-50} ${L.ry-48} l20 10 -14 4z" style="fill:var(--terra)"/><text x="${L.rx-70}" y="${L.ry-54}" class="t-xs" style="fill:var(--terra)">toxin modifies RhoA</text></g>`;
    s+=`<path d="M${L.rx+25} ${L.ry} H${L.pknX-3}" class="arrow" marker-end="url(#mxA)" style="opacity:${f1(on)}"/>`;
    s+=`<rect x="${L.pknX}" y="${L.pknY}" width="56" height="32" rx="9" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5;opacity:${f1(.35+.65*on)}"/><text x="${L.pknX+28}" y="${L.pknY+20}" class="t-lbl t-mid" style="opacity:${f1(.35+.65*on)}">PKN1/2</text>`;
    // phosphate traveling
    if(on>.5){const ph=(t*6)%1,phx=lerp(L.phA,L.phB,ph),phy=L.ry-8*Math.sin(ph*Math.PI);s+=`<circle cx="${f1(phx)}" cy="${f1(phy)}" r="6" style="fill:var(--gold)"/><text x="${f1(phx)}" y="${f1(phy+3)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">P</text>`}
    // pyrin molecule (resting position → speck)
    const px=lerp(L.pxA,L.pxB,rel),py=lerp(L.pyA,L.pyB,asm),PS=L.PS*(1-.25*asm);
    const pyr=(x,y,sc=1,op=1)=>{let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})" style="opacity:${f1(op)}">`;
      g+=`<circle cx="0" cy="0" r="13" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:2"/><text x="0" y="4" class="t-xs t-mid" style="fill:var(--terra);font-weight:700">PYD</text>`;
      g+=`<path d="M13 0 H34" style="stroke:var(--muted);stroke-width:2"/><rect x="34" y="-9" width="24" height="18" rx="4" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="46" y="4" class="t-xs t-mid">bZIP</text>`;
      g+=`<rect x="62" y="-9" width="24" height="18" rx="9" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="74" y="4" class="t-xs t-mid">B</text>`;
      g+=`<path d="M90 0 q6 -10 12 0 t12 0 12 0" style="fill:none;stroke:var(--muted);stroke-width:2.4"/>`;
      g+=`<rect x="128" y="-15" width="40" height="30" rx="6" style="fill:var(--panel);stroke:var(--crocus);stroke-width:2"/><text x="148" y="4" class="t-xs t-mid">B30.2</text>`;
      if(mut)g+=`<circle cx="164" cy="-13" r="5" style="fill:var(--bad)"/><text x="164" y="-22" class="t-xs t-mid" style="fill:var(--bad)">M694V</text>`;
      return g+'</g>'};
    s+=pyr(px,py,PS,1);
    s+=`<text x="${f1(px+84*PS)}" y="${f1(py+30*L.PS+16-10*asm)}" class="t-sm t-mid" style="opacity:${f1(1-asm)}">pyrin (781 aa)</text>`;
    // phosphates + 14-3-3 clamp on the linker (S208/S242 lie between PYD and B-box)
    const phO=1-rel;
    [[38,'S208'],[56,'S242']].forEach(([dx,l])=>{const x=px+dx*PS,y=py-22*L.PS;
      s+=`<g style="opacity:${f1(phO)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(7*L.PS)}" style="fill:var(--gold)"/><text x="${f1(x)}" y="${f1(y+3)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">P</text><text x="${f1(x)}" y="${f1(y-11*L.PS)}" class="t-xs t-mid">${l}</text></g>`});
    const cl=rel*50;
    s+=`<g style="opacity:${f1(1-rel*.9)}" transform="translate(${f1(px+47*PS)} ${f1(py-(52+cl)*L.PS)}) scale(${f1(L.PS)})"><path d="M-30 -4 Q-30 22 -14 22 H14 Q30 22 30 -4" style="fill:none;stroke:var(--sea);stroke-width:6;stroke-linecap:round"/><text x="0" y="-10" class="t-xs t-mid" style="fill:var(--sea)">14-3-3</text></g>`;
    // non-firing message
    if(!fire&&t>.32)s+=`<g style="opacity:${f1(ramp(t,.32,.4))}"><rect x="${L.nfX}" y="${L.nfY}" width="${L.nfW}" height="58" rx="10" style="fill:var(--good-soft);stroke:var(--good)"/><text x="${L.nfX+L.nfW/2}" y="${L.nfY+24}" class="t-lbl t-mid" style="fill:var(--good)">Threshold not crossed</text><text x="${L.nfX+L.nfW/2}" y="${L.nfY+44}" class="t-sm t-mid">pyrin stays phosphorylated · no attack</text></g>`;
    // ASC speck + caspase-1
    if(asm>0){ASC.forEach(a=>{const rr=a.d*asm;s+=`<circle cx="${f1(L.speckX+Math.cos(a.a)*rr)}" cy="${f1(L.speckY+Math.sin(a.a)*rr)}" r="4.2" style="fill:var(--crocus);opacity:${f1(asm*.9)}"/>`});
      s+=`<text x="${L.speckX}" y="${f1(L.speckY+50+4*asm)}" class="t-sm t-mid" style="opacity:${f1(asm)}">ASC speck</text>`;
      for(let k=0;k<5;k++){const a=k/5*Math.PI*2+.3,rr=lerp(90,46,asm);s+=`<rect x="${f1(L.speckX+Math.cos(a)*rr-7)}" y="${f1(L.speckY+Math.sin(a)*rr-7)}" width="14" height="14" rx="3" style="fill:var(--terra);opacity:${f1(asm)}"/>`}
      s+=`<text x="${L.caspX}" y="${L.caspY}" class="t-xs" style="fill:var(--terra);opacity:${f1(asm)}">caspase-1</text>`}
    // pro-IL-1β → IL-1β
    if(t>.55&&fire){const o=ramp(t,.55,.62),x0=L.cytX;
      for(let k=0;k<3;k++){const y=L.cytY+k*L.cytStep;
        s+=`<rect x="${x0}" y="${y}" width="${f1(lerp(70,30,cut)*(N?.7:1))}" height="12" rx="6" style="fill:var(--gold);opacity:${f1(o*(1-.8*cut))}"/>`;
        const tgt=L.exitX!=null?L.exitX+k*5:cx+W+40+k*18;
        const ex=lerp(x0+44,tgt,ease(ramp(t,.82+k*.03,1))),ey=lerp(y,cy+H*Math.sin(poreAng[k+1]),ease(ramp(t,.82,.95)));
        s+=`<circle cx="${f1(ex)}" cy="${f1(ey+6)}" r="${f1(6*cut)}" style="fill:var(--terra)"/>`}
      s+=`<text x="${x0}" y="${L.cytY-12}" class="t-xs" style="opacity:${f1(o)}">${cut>.5?'IL-1β · IL-18 active':(N?'pro-IL-1β / IL-18':'pro-IL-1β · pro-IL-18')}</text>`}
    // gasdermin D
    if(pore>0)s+=`<text x="${f1(cx+W-10)}" y="${f1(cy-H-8)}" class="t-xs t-end" style="fill:var(--terra)">gasdermin D pores</text>`;
    // incoming neutrophils + fever
    if(burst>0){for(let k=0;k<3;k++)s+=neutro(lerp(L.neuX0,L.neuX1-k*10,ease(ramp(burst,k*.15,1))),L.neuY+k*L.neuStep,13,1);
      s+=`<text x="${L.feverX}" y="${L.feverY}" class="t-sm t-end" style="fill:var(--terra)">IL-1β → fever, more neutrophils</text>`}
    svg.innerHTML=s;
    const p=phaseOf(MX,t);setSt(p);
    const P=MX[p];let extra='';
    if(!fire&&p>=2)extra=`<div class="hook"><b>What you just saw</b>${mut?'':'Normal pyrin ignored a small, everyday dip in RhoA. That is the healthy state: it fires only when a pathogen shuts RhoA down hard.'}</div>`;
    $('#mxNote').innerHTML=(!fire&&p>=2?noteHTML({k:'Steps 3–6 · Not triggered',t:'Nothing happens, RhoA recovers',txt:'The dip did not cross normal pyrin\'s threshold. Pyrin stays phosphorylated and bound to 14-3-3, so no inflammasome forms. Try the M694V genotype with the same small dip.',pt:'A healthy guard ignores small bumps.'}):noteHTML(P))+extra;
    $('#mxCap').textContent=`${mut?'M694V/M694V':'Normal'} pyrin · ${path?'pathogen switches RhoA off':'small everyday dip'} · ${fire?'inflammasome fires':'no inflammasome'}. Schematic, not to scale.`;
  }
  const stop=playWire(rg,$('#mxPlay'),draw,16000,'Replay','mech');
  const setSt=stepWire($('#mxSteps'),MX,rg,draw,stop);
  const tog=(a,b,v)=>{a.setAttribute('aria-pressed',v);b.setAttribute('aria-pressed',!v)};
  $('#mxNorm').onclick=()=>{mut=false;tog($('#mxNorm'),$('#mxMut'),true);draw(+rg.value)};
  $('#mxMut').onclick=()=>{mut=true;tog($('#mxNorm'),$('#mxMut'),false);draw(+rg.value)};
  $('#mxMinor').onclick=()=>{path=false;tog($('#mxMinor'),$('#mxPath'),true);draw(+rg.value)};
  $('#mxPath').onclick=()=>{path=true;tog($('#mxMinor'),$('#mxPath'),false);draw(+rg.value)};
  $('#mxGrid').innerHTML=`<tr><th>Normal pyrin</th><td><span class="tag good">No response</span> Correctly ignored.</td><td><span class="tag sea">Fires</span> Appropriate defense against a RhoA-modifying pathogen.</td></tr>
   <tr class="hl"><th>FMF variant pyrin</th><td><span class="tag terra">Fires</span> The disease: an attack with no real threat.</td><td><span class="tag terra">Fires strongly</span> May have helped carriers survive certain infections (a hypothesis). <sup class="c" data-ref="Park2020" title="Source 208">208</sup></td></tr>`;
  $('#mxCards').innerHTML=`
   <div class="card"><h4>Where pyrin lives</h4><p>Pyrin is made mainly in innate immune cells: neutrophils, eosinophils, monocytes and dendritic cells, all of which come from bone-marrow stem cells. That is why FMF inflammation is neutrophil-rich, and why marrow replacement is discussed in <a href="#cure" data-go="cure">Toward a cure</a>. <sup class="c" data-ref="Centola2000,Schnappauf2019" title="Source 35,234">35,234</sup></p></div>
   <div class="card"><h4>What finishes the second step</h4><p>A chemical screen found that two of the body's own steroid breakdown products, etiocholanolone and pregnanolone, can drive the second activation step directly. The explicit "two-step" description of pyrin activation comes from that work. <sup class="c" data-ref="Magnotti2022" title="Source 163">163</sup></p></div>
   <div class="card"><h4>Not the same as NLRP3</h4><p>NLRP3 senses many kinds of cell stress (potassium efflux, crystals). Pyrin senses one thing: loss of RhoA signaling. Both feed the same ASC → caspase-1 → IL-1β machinery. <sup class="c" data-ref="Heilig2018" title="Source 96">96</sup></p></div>
   <div class="card"><h4>A gain of function</h4><p>FMF is recessive, yet the variants make pyrin <b>more</b> active, not less. In mice, human B30.2 variants knocked into pyrin caused IL-1β–dependent autoinflammation. <sup class="c" data-ref="Chae2011" title="Source 37">37</sup></p></div>
   <div class="card"><h4>The same switch in HIDS/MKD</h4><p>In mevalonate kinase deficiency, too little geranylgeranyl pyrophosphate means RhoA cannot be prenylated and anchored, so RhoA is functionally off and pyrin is released. One RhoA node links two different fever syndromes. <sup class="c" data-ref="Park2016" title="Source 207">207</sup></p></div>
   <div class="card"><h4>PAAND: the other pyrin disease</h4><p>A dominant variant at S242 (S242R) removes a phosphorylation site directly, so 14-3-3 cannot bind. It causes neutrophilic dermatosis rather than classic FMF, which supports the whole phosphorylation model. A second variant at the same site, E244K, does the same thing. <sup class="c" data-ref="Masters2016,Moghaddas2017" title="Source 169,179">169,179</sup></p></div>`;
  draw(+rg.value);
};

/* =============== 1.4 attack =============== */
const AT_SITES={
 perit:{n:'Abdomen (peritonitis)',cav:'PERITONEAL CAVITY',lay:'mesothelium',dot:[30,62],
  txt:'The most common attack. Diffuse or localized abdominal pain, guarding and rebound tenderness, sometimes ileus with constipation. Peritonitis occurs in more than 90% of patients (93.7% in the Turkish registry of 2,838). It can be indistinguishable from a surgical abdomen; in one Israeli series 40% of patients had an appendectomy and most of those appendices were not inflamed. <sup class="c" data-ref="TurkishFMF2005,Tufan2020,Lidar2008" title="Source 150,263,264">150,263,264</sup>',
  pt:'Severe belly pain with fever that looks like an emergency, then fades within about three days.',
  hook:'Recurrent "surgical abdomen" with fever that resolves on its own in 1–3 days: think FMF. Repeated sterile peritonitis can leave adhesions.'},
 pleura:{n:'Chest (pleuritis)',cav:'PLEURAL SPACE',lay:'mesothelium',dot:[24,44],
  txt:'Pleuritis affects about a third of patients (31.2% in the Turkish registry). It is sudden, usually one-sided chest pain that worsens with breathing, sometimes with a small effusion, and resolves in 1–3 days. <sup class="c" data-ref="TurkishFMF2005,Tufan2020" title="Source 263,264">263,264</sup>',
  pt:'A sharp pain on one side of the chest that hurts more when you breathe in.',
  hook:'Unilateral pleuritic pain with fever, recurring and self-limited.'},
 joint:{n:'Joint (arthritis)',cav:'JOINT SPACE',lay:'synovium',dot:[24,104],
  txt:'Arthritis affects roughly half of patients (47.4% in the Turkish registry). It is usually one large leg joint (knee, ankle, hip) with a sterile but inflammatory effusion that can mimic septic arthritis. Joint attacks peak in 1–3 days and settle within about a week, sometimes up to two. Protracted arthritis occurs in under 5%. <sup class="c" data-ref="TurkishFMF2005,Tufan2020,PRINTO2016G" title="Source 216,263,264">216,263,264</sup>',
  pt:'One big joint, often a knee or ankle, swells and hurts, then settles down.',
  hook:'Acute <b>monoarthritis</b> of a large lower-limb joint with a sterile neutrophilic effusion.'},
 scrot:{n:'Scrotum',cav:'TUNICA VAGINALIS',lay:'mesothelium',dot:[30,80],
  txt:'Inflammation of the tunica vaginalis, a pouch of peritoneum, causes a painful swollen scrotum. In one series of 175 boys with FMF, 9% had scrotal attacks lasting 8 hours to 5 days; for a quarter of them it was the first sign of FMF, and 38% had surgery. <sup class="c" data-ref="Majeed2000" title="Source 164">164</sup>',
  pt:'In boys, a painful swollen scrotum that can look like an emergency.',
  hook:'The tunica vaginalis is peritoneum that followed the testis down, so it is a serosal surface too.'},
 skin:{n:'Skin (erysipelas-like erythema)',cav:'EPIDERMIS',lay:'basement membrane',dot:[34,116],
  txt:'A tender, red, erysipelas-like plaque on the lower leg, ankle or top of the foot, often brought on by long walking or travel. It occurred in 20.9% of the Turkish registry and about 7.5% of one pediatric cohort, where it went with arthritis, M694V homozygosity and higher colchicine needs. <sup class="c" data-ref="TurkishFMF2005,Tufan2020,GezginYildirim2020" title="Source 79,263,264">79,263,264</sup>',
  pt:'A red, sore, warm patch on the lower leg that looks like a skin infection but is not one.',
  hook:'Erysipelas-like erythema (ELE) is the characteristic skin sign of FMF and is more common with M694V.'}
};
const AT_VARS={
 typ:{n:'Typical attack',axis:120,unit:'Hours',fmt:h=>`${Math.round(h)} h`,
  steps:[{from:0,at:.01,k:'Hour 0',t:'A trigger',txt:'Many attacks have no obvious cause. In questionnaires patients most often name emotional stress, cold, tiredness and menstruation. The strongest study, a case-crossover design in 104 Armenian patients, found each stressful event raised the odds of an attack two days later by about 70%, while strenuous exercise and fatty meals did not. In a survey of women with FMF, 79% reported attacks with their period, mostly abdominal attacks they could tell apart from period pain. About half of all patients feel a prodrome, averaging about 20 hours. <sup class="c" data-ref="Karadag2013,Parlar2024,Yenokyan2012,Guzelant2017,Lidar2006" title="Source 90,118,149,209,279">90,118,149,209,279</sup>',pt:'Many attacks come out of the blue. Stress is the best-documented trigger; cold, tiredness and periods are often reported too.',hook:'Triggers lower the bar for an already jumpy pyrin. They do not cause the disease.'},
   {from:2/120,at:5/120,k:'Hours 1–8',t:'Fever and pain begin',txt:'Fever starts suddenly and peaks within hours, with pain at one serosal site. IL-1β is a potent endogenous pyrogen: in humans, nanogram-per-kilogram doses cause fever. <sup class="c" data-ref="Tufan2020,Dinarello2011" title="Source 57,263">57,263</sup>',pt:'Fever and pain come on fast, within hours.',hook:'Fever + serositis at one site at a time is the usual pattern.'},
   {from:8/120,at:16/120,k:'Hours 8–24',t:'Neutrophil flood',txt:'Neutrophils pour out of the capillaries into the serosal space, forming a sterile exudate. Pain and signs peak. CRP and SAA rise steeply as the liver responds to IL-1β and IL-6; in one cohort attack medians were SAA 693 mg/L and CRP 115 mg/L. <sup class="c" data-ref="Lachmann2006,Dinarello2011" title="Source 57,141">57,141</sup>',pt:'Huge numbers of white cells rush in. The pain peaks, and blood markers of inflammation climb.',hook:'The fluid is <b>sterile</b>: neutrophils, no bacteria. Cultures are negative.'},
   {from:24/120,at:40/120,k:'Hours 24–72',t:'Resolution',txt:'The attack stops by itself, usually within 12–72 hours, without antibiotics. The Livneh criteria define a typical attack as febrile (≥38 °C) and lasting 12 hours to 3 days. CRP and SAA lag behind the symptoms. <sup class="c" data-ref="Livneh1997,Tufan2020" title="Source 159,263">159,263</sup>',pt:'It goes away on its own, usually within three days.',hook:'Self-limited, 12–72 h: the duration itself is a diagnostic clue (TRAPS lasts longer, PFAPA comes like clockwork).'},
   {from:72/120,at:100/120,k:'After 72 h',t:'Between attacks',txt:'Most patients feel well between attacks. Median between-attack SAA was 6 mg/L in one cohort, but only 29% of measurements were fully normal (<3 mg/L) and 13% were above 50 mg/L. How common subclinical inflammation looks depends heavily on which marker and cut-off a study uses. Persistently raised SAA is what drives amyloidosis. <sup class="c" data-ref="Lachmann2006,Tufan2020,Lachmann2007" title="Source 141,142,263">141,142,263</sup>',pt:'You usually feel normal again. Blood tests between attacks show whether hidden inflammation continues.',hook:'Check CRP/SAA <b>between</b> attacks: persistent elevation means inadequate control even if attacks seem rare.'}],
  curves:{temp:h=>ramp(h,1,7)*(1-ramp(h,26,52)),pain:h=>ramp(h,.5,6)*(1-ramp(h,30,66)),crp:h=>{const x=h/40;return h<=0?0:Math.min(1,Math.pow(x,2.2)*Math.exp(2.2*(1-x)))},saa:h=>{const x=h/32;return h<=0?0:Math.min(1,Math.pow(x,2)*Math.exp(2*(1-x)))},neut:h=>ramp(h,2,12)*(1-ramp(h,40,72))}},
 pfm:{n:'Protracted febrile myalgia',axis:56,unit:'Days',fmt:d=>`day ${Math.round(d)}`,
  steps:[{from:0,at:.02,k:'Days 0–3',t:'Severe muscle pain',txt:'Protracted febrile myalgia (PFM) is a rare manifestation: severe, disabling muscle pain with fever, a very high ESR and raised globulins. It was first described in 14 patients and can occur even on colchicine. In a review of 78 children, more than half had PFM as their first FMF sign. <sup class="c" data-ref="Langevitz1994,Hospach2024" title="Source 100,146">100,146</sup>',pt:'A rare form with very severe muscle pain and fever that does not go away in a few days.',hook:'PFM: fever + severe myalgia lasting <b>weeks</b>, very high ESR, colchicine does not prevent it.'},
   {from:.1,at:.25,k:'Weeks 1–4',t:'Weeks, not days',txt:'Untreated, PFM lasted up to about 6 weeks in the first series, and later reviews describe episodes up to about 10 weeks, with muscle edema on MRI. <sup class="c" data-ref="Langevitz1994,Tufan2020" title="Source 146,263">146,263</sup>',pt:'Untreated it can last about six weeks.',hook:'Weeks, not days: duration separates PFM from an ordinary attack.'},
   {from:.6,at:.75,k:'Weeks 4–8',t:'Settles, faster with steroids',txt:'PFM responds promptly to corticosteroids. In the pediatric review steroids worked in 77%, and anakinra worked in every steroid-refractory case. <sup class="c" data-ref="Langevitz1994,Hospach2024" title="Source 100,146">100,146</sup>',pt:'Doctors usually treat it with steroids, which make it settle much faster.',hook:'One of the few FMF situations where glucocorticoids are standard.'}],
  curves:{temp:d=>ramp(d,0,2)*(1-ramp(d,30,48))*.75,pain:d=>ramp(d,0,1.5)*(1-ramp(d,28,48)),crp:d=>ramp(d,0,5)*(1-ramp(d,34,54)),saa:d=>ramp(d,0,4)*(1-ramp(d,32,52)),neut:d=>ramp(d,0,3)*(1-ramp(d,30,48))*.7}},
 peri:{n:'Pericarditis',axis:120,unit:'Hours',fmt:h=>`${Math.round(h)} h`,
  steps:[{from:0,at:.03,k:'Rare',t:'Chest pain, worse lying flat',txt:'Pericarditis is rare: 27 of about 4,000 Israeli patients over 20 years, and 1.4% of the Turkish registry. That is still about ten times the background rate. <sup class="c" data-ref="Kees1997,TurkishFMF2005" title="Source 123,264">123,264</sup>',pt:'Rarely, the sac around the heart becomes inflamed for a few days.',hook:'Recurrent pericarditis with fever in an at-risk population: consider FMF.'},
   {from:24/120,at:40/120,k:'1–3 days',t:'Self-limited',txt:'Each patient in the Israeli series had 1–3 pericardial attacks lasting a mean of 4.2 days, with no lasting damage. <sup class="c" data-ref="Kees1997" title="Source 123">123</sup>',pt:'It settles in a few days.',hook:'Same serosal biology, different membrane.'}],
  curves:null}
};
AT_VARS.peri.curves=AT_VARS.typ.curves;
inits.attack=()=>{
  const svg=$('#atSvg'),rg=$('#atT');let site='perit',vk='typ';
  const r=rng(41);const NE=Array.from({length:22},()=>({x:20+r()*270,ph:r(),y:r()}));
  $('#atSites').innerHTML='<span class="kicker">Site</span>'+Object.entries(AT_SITES).map(([k,v])=>`<button class="btn" data-site="${k}" aria-pressed="${k===site}">${v.n}</button>`).join('');
  $('#atVars').innerHTML='<span class="kicker">Type</span>'+Object.entries(AT_VARS).map(([k,v])=>`<button class="btn" data-var="${k}" aria-pressed="${k===vk}">${v.n}</button>`).join('');
  function body(){const S=AT_SITES[vk==='peri'?'pleura':site];const [dx,dy]=vk==='peri'?[28,48]:vk==='pfm'?[30,120]:S.dot;
    return `<g transform="translate(262 10)"><circle cx="30" cy="12" r="9" style="fill:none;stroke:var(--muted);stroke-width:1.5"/><path d="M18 26 h24 l4 50 h-6 l-2 -30 M18 26 l-4 50 h6 l2 -30 M22 72 l-2 52 h6 l4 -44 l4 44 h6 l-2 -52" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-linejoin:round"/><circle cx="${dx}" cy="${dy}" r="6" style="fill:var(--terra)"/></g>`}
  function draw(u){
    const V=AT_VARS[vk],S=AT_SITES[site],x=u*V.axis,C=V.curves;
    const joint=site==='joint'&&vk==='typ', sx=joint?.65:1; // joint attacks run longer
    const val=k=>C[k](x*sx);
    const nf=val('neut'),fever=val('temp');
    const N=vb(svg,'720 420','400 960');
    let s=(N?`<g transform="scale(1.212)">`:'')+`<rect x="0" y="0" width="330" height="420" rx="12" style="fill:var(--field)"/>`;
    // tissue scene
    const isSkin=site==='skin'&&vk==='typ';
    const cav=vk==='peri'?'PERICARDIAL SPACE':vk==='pfm'?'MUSCLE':S.cav;
    const redden=nf;
    if(isSkin){
      s+=`<rect x="10" y="40" width="310" height="70" style="fill:var(--cyto)"/><rect x="10" y="40" width="310" height="70" style="fill:var(--bad);opacity:${f1(.35*redden)}"/>`;
      for(let i=0;i<14;i++)s+=`<rect x="${12+i*22}" y="${50+(i%2)*4}" width="20" height="50" rx="4" style="fill:none;stroke:var(--memb);stroke-width:1;opacity:.6"/>`;
      s+=`<text x="16" y="34" class="t-sm">EPIDERMIS</text><path d="M10 112 H320" style="stroke:var(--memb);stroke-width:3"/><text x="16" y="132" class="t-sm">DERMIS</text>`;
      s+=`<rect x="10" y="114" width="310" height="230" style="fill:var(--bad);opacity:${f1(.12*redden)}"/>`;
    }else{
      s+=`<rect x="10" y="40" width="310" height="120" style="fill:var(--panel)"/><text x="16" y="34" class="t-sm">${cav}</text>`;
      // exudate
      const ex=vk==='pfm'?0:nf;
      s+=`<rect x="10" y="${f1(160-110*ex)}" width="310" height="${f1(110*ex)}" style="fill:var(--sea);opacity:.18"/>`;
      if(ex>.15)s+=`<text x="240" y="${f1(156-110*ex+18)}" class="t-xs t-end" style="fill:var(--sea)">sterile exudate</text>`;
      if(vk!=='pfm')for(let i=0;i<14;i++)s+=`<rect x="${12+i*22}" y="160" width="20" height="8" rx="4" style="fill:var(--memb)"/>`;
      else for(let i=0;i<6;i++)s+=`<rect x="14" y="${46+i*19}" width="302" height="14" rx="7" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:.8"/>`;
      s+=`<text x="16" y="186" class="t-sm">${vk==='pfm'?'muscle fibers':vk==='peri'?'mesothelium':S.lay}</text>`;
      s+=`<rect x="10" y="170" width="310" height="174" style="fill:var(--bad);opacity:${f1(.12*redden)}"/>`;
    }
    // capillary
    s+=`<rect x="10" y="280" width="310" height="44" rx="22" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/><text x="16" y="342" class="t-sm">CAPILLARY</text>`;
    for(let i=0;i<9;i++){const xx=((i*40+u*2600)%330)+0;s+=`<ellipse cx="${f1(xx)}" cy="${300+(i%3-1)*6}" rx="7" ry="4" style="fill:var(--bad);opacity:.7"/>`}
    // neutrophils leaving vessel toward cavity
    NE.forEach((n,i)=>{const on=clamp(nf*1.25-i/NE.length*.9);if(on<=0)return;const top=isSkin?150:vk==='pfm'?120:90+n.y*60;
      const prog=clamp(on*1.4);const y=lerp(300,top,ease(prog));const xx=n.x+Math.sin((u*40+n.ph*6))*4;s+=neutro(xx,y,9,clamp(on*2))});
    s+=body();
    // fever thermometer
    const T=37+2.8*fever;s+=`<g transform="translate(18 360)"><rect x="0" y="0" width="200" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="0" y="0" width="${f1(200*fever)}" height="12" rx="6" style="fill:var(--terra)"/><text x="0" y="32" class="t-lbl">Temperature ${T.toFixed(1)} °C</text></g>`;
    s+=`<text x="16" y="408" class="t-sm">${V.fmt(x)}</text><text x="318" y="408" class="t-xs t-end" style="fill:var(--warn)">ILLUSTRATIVE</text>`;
    if(N)s+='</g>';
    // charts: beside the scene when wide, stacked under it when narrow
    const CX0=N?48:372, CX1=N?392:708, CY=N?548:14;
    const CH=[['temp','Fever','var(--terra)'],['pain','Pain','var(--bad)'],['crp','CRP','var(--sea)'],['saa','SAA','var(--gold)']];
    CH.forEach(([k,l,c],i)=>{const y0=CY+i*100,y1=y0+78,x0=CX0,x1=CX1;
      s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/><text x="${x0}" y="${y0-2}" class="t-sm" style="fill:${c}">${l.toUpperCase()}</text>`;
      s+=`<path d="${pathFn(v=>C[k](v*V.axis*sx),x0,x1,y1,y0+10)}" style="fill:none;stroke:${c};stroke-width:1.2;opacity:.35"/>`;
      s+=`<path d="${pathFn(v=>v<=u?C[k](v*V.axis*sx):NaN,x0,x1,y1,y0+10).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${c};stroke-width:3"/>`;
      const cx=lerp(x0,x1,u),cy=lerp(y1,y0+10,C[k](x*sx));s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="5" style="fill:${c}"/>`;
      if(i===3){const ticks=vk==='pfm'?[0,14,28,42,56]:[0,24,48,72,96,120];ticks.forEach((tk,ti)=>{const last=ti===ticks.length-1,first=ti===0;
        s+=`<text x="${f1(lerp(x0,x1,tk/V.axis))}" y="${y1+14}" class="t-xs ${last?'t-end':first?'':'t-mid'}">${vk==='pfm'?'d'+tk:tk+'h'}</text>`})}});
    s+=`<line x1="${f1(lerp(CX0,CX1,u))}" x2="${f1(lerp(CX0,CX1,u))}" y1="${CY-6}" y2="${CY+380}" style="stroke:var(--ink);stroke-width:1;opacity:.25"/>`;
    svg.innerHTML=s;
    const p=phaseOf(V.steps,u);setSt(p);const P=V.steps[p];
    $('#atNote').innerHTML=noteHTML(P)+(vk==='typ'?`<div class="kv"><div><dt>This site: ${S.n}</dt><dd>${S.txt}</dd></div></div>`+(p===2?`<div class="pt"><b>In plain words</b>${S.pt}</div><div class="hook"><b>Exam hook</b>${S.hook}</div>`:''):'');
    $('#atRead').innerHTML=`<span>time <b>${V.fmt(x)}</b></span><span>fever <b>${(37+2.8*fever).toFixed(1)} °C</b></span><span>CRP <b>${Math.round(val('crp')*100)}%</b> of peak</span><span>SAA <b>${Math.round(val('saa')*100)}%</b> of peak</span>`;
  }
  let setSt=()=>{};let stop=playWire(rg,$('#atPlay'),draw,14000,'Replay','attack');
  function setVar(){const V=AT_VARS[vk];setSt=stepWire($('#atSteps'),V.steps,rg,draw,stop);$('#atUnit').textContent=V.unit;$('#atSites').style.display=vk==='typ'?'':'none';rg.value=V.steps[0].at;draw(+rg.value)}
  $('#atSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;$$('[data-site]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#atVars').addEventListener('click',e=>{const b=e.target.closest('[data-var]');if(!b)return;stop();vk=b.dataset.var;$$('[data-var]').forEach(x=>x.setAttribute('aria-pressed',x===b));setVar()});
  setVar();

  /* years */
  const ys=$('#atYears'),yr=$('#ayT');let pat='mod',col=false;
  const PAT={freq:['Every 2–4 weeks',16],mod:['Every 1–3 months',7],rare:['A few a year',3]};
  $('#atFreq').innerHTML='<span class="kicker">Untreated pattern</span>'+Object.entries(PAT).map(([k,v])=>`<button class="btn" data-pat="${k}" aria-pressed="${k===pat}">${v[0]}</button>`).join('');
  $('#atYearsTxt').innerHTML='Attacks come at irregular intervals, unlike the clockwork of PFAPA, and frequency varies widely between people. The site can change from attack to attack. Attack frequency is often said to fall with age, but in treated populations that is hard to separate from the effect of colchicine, so read it with care. 80–90% of patients have their first attack before age 20. Daily colchicine cuts attack frequency in most patients and prevents amyloidosis. <sup class="c" data-ref="BenChetrit2019,PRINTO2016G,Tufan2020,Zemer1986" title="Source 17,216,263,286">17,216,263,286</sup>';
  function gen(){const rr=rng(pat.length*97+(col?1:0));const out=[];const rate=PAT[pat][1];
    for(let y=0;y<5;y++)for(let d=0;d<365;d+=1){const tY=y+d/365;let p=rate/365;
      if(col&&tY>2){const k=ramp(tY,2,2.5);p*=lerp(1,.12,k)}
      if(rr()<p){out.push({tY,s:.5+rr()*.5,site:Math.floor(rr()*4)});d+=4}}
    return out}
  let EV=gen();
  function drawY(t){const T=t*5;let s='';
    const NY=vb(ys,'720 230','400 300');
    const x0=NY?14:60, x1=NY?392:706, rowH=NY?52:38, top=NY?30:24, trk=NY?22:24;
    for(let y=0;y<5;y++){const yy=top+y*rowH;
      s+=`<text x="${NY?x0:10}" y="${f1(yy+(NY?-4:16))}" class="t-sm">Year ${y+1}</text><line x1="${x0}" x2="${x1}" y1="${yy+trk}" y2="${yy+trk}" class="axis"/>`;
      ['J','F','M','A','M','J','J','A','S','O','N','D'].forEach((m,i)=>{if(y===4)s+=`<text x="${f1(x0+(i+.5)/12*(x1-x0))}" y="${yy+trk+16}" class="t-xs t-mid">${m}</text>`});
      const n=EV.filter(e=>Math.floor(e.tY)===y&&e.tY<=T).length;s+=`<text x="${x1}" y="${f1(yy+(NY?-4:6))}" class="t-xs t-end">${n} attacks</text>`}
    if(col){const yy=top+2*rowH;s+=`<rect x="${x0}" y="${f1(yy-(NY?18:4))}" width="${x1-x0}" height="${3*rowH+6}" rx="6" style="fill:var(--crocus-soft);opacity:.55"/><text x="${x0+4}" y="${f1(yy+(NY?-6:6))}" class="t-xs" style="fill:var(--crocus)">on colchicine →</text>`}
    const cols=['var(--terra)','var(--sea)','var(--gold)','var(--bad)'];
    EV.forEach(e=>{if(e.tY>T)return;const y=Math.floor(e.tY),xx=x0+(e.tY-y)*(x1-x0),yy=top+y*rowH+trk;s+=`<path d="M${f1(xx-4)} ${yy} L${f1(xx)} ${f1(yy-20*e.s)} L${f1(xx+4)} ${yy}" style="fill:${cols[e.site]};opacity:.9"/>`});
    if(t<1){const y=Math.min(4,Math.floor(T)),xx=x0+(T-y)*(x1-x0);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${top+y*rowH}" y2="${top+y*rowH+trk+2}" style="stroke:var(--ink);stroke-width:2"/>`}
    ys.innerHTML=s;
    const pre=EV.filter(e=>e.tY<2).length/2,post=EV.filter(e=>e.tY>=2.5).length/2.5;
    $('#ayCap').textContent=col?`Schematic simulation. About ${pre.toFixed(1)} attacks a year before colchicine, about ${post.toFixed(1)} a year once the drug has had months to work. Colors mark different sites.`:'Schematic simulation of an untreated course. Colors mark different attack sites (abdomen, chest, joint, skin).'}
  const ystop=playWire(yr,$('#ayPlay'),drawY,9000,'Replay','attack');
  $('#atFreq').addEventListener('click',e=>{const b=e.target.closest('[data-pat]');if(!b)return;pat=b.dataset.pat;$$('[data-pat]').forEach(x=>x.setAttribute('aria-pressed',x===b));EV=gen();drawY(+yr.value)});
  $('#ayCol').onclick=()=>{col=!col;$('#ayCol').setAttribute('aria-pressed',col);EV=gen();drawY(+yr.value)};
  drawY(+yr.value);
};

/* =============== 2.1 colchicine inside the cell =============== */
const CI=[
 {from:0,at:.05,k:'Scene 1 · The gut',t:'Swallowed and absorbed',
  txt:'Colchicine is taken by mouth and absorbed in the small intestine. Oral bioavailability averages about 45%. Plasma levels peak 1–2 hours after a dose. P-glycoprotein in the gut wall pumps part of each dose back into the lumen, and intestinal CYP3A4 metabolizes a little more. <sup class="c" data-ref="Rochdi1994,FDA-Colcrys,Slobodnick2018" title="Source 63,225,243">63,225,243</sup>',
  pt:'The tablet is absorbed from the gut. Only part of each dose gets into the body.',
  hook:'Colchicine is a P-glycoprotein (ABCB1) and CYP3A4 substrate. Both matter for drug interactions.'},
 {from:.12,at:.17,k:'Scene 2 · Liver and bile',t:'Recycling through bile',
  txt:'The liver metabolizes part of the drug through CYP3A4 and secretes some into bile. Bile returns it to the gut, where some is absorbed again: enterohepatic recycling, seen as a second plasma peak within hours. The kidneys excrete a share unchanged; the US label reports 40–65% of a dose in urine, while some reviews give lower figures. A huge volume of distribution (about 5–8 L/kg) and binding inside cells give a long half-life, about 27–31 hours with repeated dosing, though studies range widely. <sup class="c" data-ref="Ferron1996,FDA-Colcrys,Finkelstein2010" title="Source 63,66,67">63,66,67</sup>',
  pt:'The liver sends the drug out in bile, and the gut takes some of it back up, so it lingers in the body.',
  hook:'Enterohepatic recirculation helps explain the long half-life and why hepatic or biliary disease raises exposure.'},
 {from:.26,at:.34,k:'Scene 3 · Neutrophils',t:'It piles up in white cells',
  txt:'Granulocytes carry no working P-glycoprotein pump, so colchicine that enters them is not pushed back out. Leukocyte levels peak about two days after a dose, long after the plasma peak at about one hour, and neutrophil concentrations can exceed peak plasma levels more than 16-fold. Why neutrophils trap the drug is a well-supported hypothesis. Levels vary a lot between people: in 30 patients taking 0.5 to 2 mg a day, plasma and leukocyte levels did not track the dose taken, and uptake into leukocytes was saturable. <sup class="c" data-ref="Chappey1993,Chappey1994,Klimecki1994,Leung2015,BenChetrit1998MH" title="Source 11,38,39,129,147">11,38,39,129,147</sup>',
  pt:'White blood cells soak the drug up and hold on to it. Plasma levels fall within hours, but levels inside the white cells stay up for days.',
  hook:'Low P-gp in neutrophils = intracellular trapping. This is part of why the drug is so selective for neutrophil-driven inflammation.'},
 {from:.45,at:.5,k:'Scene 4 · Tubulin',t:'Binding free tubulin',
  txt:'Inside the cell colchicine binds free β-tubulin at the "colchicine site". The tubulin–colchicine complex adds to the growing end of a microtubule and stops further growth. <sup class="c" data-ref="Leung2015" title="Source 147">147</sup>',
  pt:'The drug grabs the building blocks of the cell\'s internal scaffolding.',
  hook:'Colchicine binds <b>tubulin</b> (not the finished microtubule). Low concentrations cap; higher concentrations depolymerize.'},
 {from:.6,at:.66,k:'Scene 5 · Microtubules',t:'The scaffolding shortens',
  txt:'Microtubules constantly grow and shrink. With their growing ends capped, they shrink faster than they can rebuild. Proteins that were parked on them, including the RhoA activator GEF-H1, are released into the cytoplasm. <sup class="c" data-ref="Leung2015,Park2016" title="Source 147,207">147,207</sup>',
  pt:'The scaffolding falls apart, and proteins that were stuck to it drift free.',
  hook:'Microtubule disruption releases GEF-H1, which turns RhoA on.'},
 {from:.74,at:.8,k:'Scene 6 · Pyrin',t:'Two proposed ways pyrin stays quiet',
  txt:'Route 1: free GEF-H1 activates RhoA, RhoA drives PKN, PKN re-phosphorylates pyrin, and 14-3-3 holds it off. Route 2: pyrin needs intact microtubules for its second activation step, so without them no ASC speck forms. Gao and colleagues found microtubule drugs did not prevent pyrin dephosphorylation, which argues for route 2. Which route dominates at clinical doses is still debated. <sup class="c" data-ref="Park2016,Gao2016,VanGorp2016,Schnappauf2019" title="Source 74,207,234,270">74,207,234,270</sup>',
  pt:'Researchers have two explanations for how this keeps pyrin quiet. Both may be partly right.',
  hook:'Exam answer: colchicine → tubulin → microtubule disruption → <b>reduced pyrin inflammasome activation</b> and reduced neutrophil function.'},
 {from:.87,at:.93,k:'Scene 7 · The neutrophil',t:'Less crawling, less sticking',
  txt:'Without a working microtubule network, neutrophils polarize and migrate poorly toward chemoattractants. Colchicine also alters adhesion at two concentration levels: at very low, prophylactic-range levels (IC50 about 3 nM) it changes the distribution, not the amount, of E-selectin on endothelial cells, abolishing their stickiness for neutrophils; at higher, therapeutic-range levels (IC50 about 300 nM) neutrophils lose L-selectin. Fewer neutrophils stick and leave the bloodstream. It can also dampen NLRP3 assembly, which needs microtubules to bring its parts together, though in the lab this takes higher concentrations. <sup class="c" data-ref="Cronstein1995,Leung2015,Misawa2013" title="Source 41,147,178">41,147,178</sup>',
  pt:'White cells move and stick less, so fewer of them reach the lining where attacks happen.',
  hook:'Two layers of effect: <b>inside</b> the cell (pyrin, NLRP3) and <b>between</b> cells (chemotaxis, selectin-mediated adhesion).'}
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
  function sceneC(t,o){if(o<=0)return'';const bind=ramp(t,.45,.6),shrink=ease(ramp(t,.58,.74));
    const L=N
      ? {hx:20,hy:24, ctCx:34,ctCy:150,ctR:18,ctLy:186,
         rows:[90,150,210],x0:64,full:12,
         gA:146,gB:154,gStep:52,gStep2:54,
         poolX:24,poolDx:66,poolPer:4,poolY:310,poolDy:30,poolLx:20,poolLy:286,
         keyX:286,keyY:326}
      : {hx:20,hy:28, ctCx:52,ctCy:200,ctR:22,ctLy:240,
         rows:[110,200,290],x0:80,full:26,
         gA:240,gB:250,gStep:90,gStep2:92,
         poolX:430,poolDx:64,poolPer:4,poolY:350,poolDy:26,poolLx:430,poolLy:330,
         keyX:560,keyY:30};
    let s=`<g style="opacity:${f1(o)}">`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-sm">INSIDE THE NEUTROPHIL · MICROTUBULES</text><circle cx="${L.ctCx}" cy="${L.ctCy}" r="${L.ctR}" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="${L.ctCx}" y="${L.ctLy}" class="t-xs t-mid">centrosome</text>`;
    L.rows.forEach((y,ri)=>{const full=L.full,n=Math.round(full*(1-.72*shrink*(1-ri*.08)));
      for(let i=0;i<n;i++){const x=L.x0+i*22;s+=`<rect x="${x}" y="${y-12}" width="10" height="11" rx="2" style="fill:var(--tub-a)"/><rect x="${x+10}" y="${y-12}" width="10" height="11" rx="2" style="fill:var(--tub-b)"/><rect x="${x+5}" y="${y+1}" width="10" height="11" rx="2" style="fill:var(--tub-b)"/><rect x="${x+15}" y="${y+1}" width="7" height="11" rx="2" style="fill:var(--tub-a)"/>`;
        if(i%5===2&&n-i>2)s+=`<circle cx="${x+10}" cy="${y-20}" r="6" style="fill:var(--good)"/>`}
      const endX=L.x0+n*22;if(bind>.2)s+=mol(endX+6,y,bind);
      // falling dimers + released GEF-H1
      for(let k=0;k<4;k++){const ph=(t*8+k*.25+ri*.3)%1;if(shrink>0&&shrink<1)s+=`<rect x="${f1(endX+10+ph*30)}" y="${f1(y+ph*36-6)}" width="16" height="9" rx="2" style="fill:var(--tub-b);opacity:${f1((1-ph)*.8)}"/>`}
      const rel=Math.round(5*shrink);for(let k=0;k<rel;k++){const gx=lerp(L.gA+k*L.gStep,L.gB+k*L.gStep2,shrink),gy=y+30+Math.sin(t*20+k)*6;s+=`<circle cx="${f1(gx)}" cy="${f1(gy)}" r="6" style="fill:var(--good);opacity:${f1(shrink)}"/>`}
    });
    // free tubulin + colchicine binding
    for(let k=0;k<7;k++){const x=L.poolX+(k%L.poolPer)*L.poolDx,y=L.poolY+Math.floor(k/L.poolPer)*L.poolDy;s+=`<rect x="${x}" y="${y-8}" width="22" height="11" rx="3" style="fill:var(--tub-b)"/>`;if(k/7<bind)s+=mol(x+28,y-3)}
    s+=`<text x="${L.poolLx}" y="${L.poolLy}" class="t-xs">tubulin + colchicine caps growing ends</text>`;
    s+=`<g transform="translate(${L.keyX} ${L.keyY})"><circle cx="6" cy="0" r="6" style="fill:var(--good)"/><text x="16" y="4" class="t-xs">GEF-H1</text><path d="M6 14 l5 5 -5 5 -5 -5z" style="fill:var(--crocus)"/><text x="16" y="23" class="t-xs">colchicine</text></g>`;
    return s+'</g>'}
  function sceneD(t,o){if(o<=0)return'';const a=ramp(t,.74,.87),b=ramp(t,.87,1);
    const L=N
      ? {r1y:24,r1Nx:380,r1Ny:42,r1End:true,
         cbX:30,cbY:58,cbStep:54,cbW:190,cbW4:190,
         offX:30,offY:276,
         r2y:306,r2Nx:380,r2Ny:324,
         d2X:24,d2Y:338,d2W:210,d2Cx:129,
         ascX:129,ascY:434,ascTx:176,ascTy:440,
         effHy:496,effX:20,effY:510,effStep:100,effW:360,effH:92,
         nX:44,nY:48,txX:76,ttY:26,l1Y:44,l2Y:58,
         arrX:104,arrY:76,arrLen:60,arrVar:100,crX:263,crY:66,
         vwX:0,vwW:320,vwY:84,vwTx:276,vwTy:78}
      : {r1y:28,r1Nx:700,r1Ny:28,r1End:true,
         cbX:30,cbY:44,cbStep:160,cbW:130,cbW4:176,
         offX:420,offY:104,
         r2y:140,r2Nx:700,r2Ny:140,
         d2X:40,d2Y:154,d2W:200,d2Cx:140,
         ascX:350,ascY:174,ascTx:400,ascTy:179,
         effHy:236,effX:40,effY:250,effStep:225,effW:205,effH:110,
         nX:36,nY:50,txX:64,ttY:32,l1Y:50,l2Y:64,
         arrX:60,arrY:86,arrLen:40,arrVar:60,crX:150,crY:76,
         vwX:0,vwW:170,vwY:96,vwTx:64,vwTy:90};
    let s=`<g style="opacity:${f1(o)}">`;
    s+=`<text x="20" y="${L.r1y}" class="t-sm">ROUTE 1 · GEF-H1 → RhoA → pyrin brake back on</text><text x="${L.r1Nx}" y="${L.r1Ny}" class="t-xs t-end" style="fill:var(--warn)">proposed · supported in cells</text>`;
    const chain=[['GEF-H1','var(--good)'],['RhoA-GTP','var(--sea)'],['PKN1/2','var(--muted)'],['pyrin-P · 14-3-3','var(--crocus)']];
    chain.forEach(([l,c],i)=>{const on=ramp(a,i*.22,i*.22+.25),w=i===3?L.cbW4:L.cbW;
      const x=N?L.cbX:L.cbX+i*L.cbStep, y=N?L.cbY+i*L.cbStep:44;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" style="fill:var(--panel);stroke:${c};stroke-width:${f1(1+2*on)};opacity:${f1(.3+.7*on)}"/><text x="${x+w/2}" y="${y+25}" class="t-lbl t-mid" style="opacity:${f1(.3+.7*on)}">${l}</text>`;
      if(i<3)s+=N
        ?`<path d="M${x+w/2} ${y+42} V${y+L.cbStep-2}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`
        :`<path d="M${x+132} 64 H${x+156}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`});
    s+=`<text x="${L.offX}" y="${L.offY}" class="t-xs" style="fill:var(--crocus);opacity:${f1(ramp(a,.8,1))}">pyrin held OFF (as in the resting state)</text>`;
    s+=`<text x="20" y="${L.r2y}" class="t-sm">ROUTE 2 · ${N?'no microtubules → step 2 cannot finish':'no microtubule platform → step 2 cannot finish'}</text><text x="${L.r2Nx}" y="${L.r2Ny}" class="t-xs t-end" style="fill:var(--warn)">proposed · supported in cells</text>`;
    const r2=ramp(a,.3,1);
    s+=`<g style="opacity:${f1(.3+.7*r2)}"><rect x="${L.d2X}" y="${L.d2Y}" width="${L.d2W}" height="40" rx="10" style="fill:var(--panel);stroke:var(--terra);stroke-width:2"/><text x="${L.d2Cx}" y="${L.d2Y+25}" class="t-lbl t-mid">dephosphorylated pyrin</text>`;
    s+=N?`<path d="M${L.d2Cx} ${L.d2Y+42} V${L.ascY-30}" class="arrow" marker-end="url(#ciA)"/>`:`<path d="M${L.d2X+L.d2W+2} ${L.d2Y+20} H${L.ascX-50}" class="arrow" marker-end="url(#ciA)"/>`;
    for(let k=0;k<14;k++){const an=k/14*6.283;s+=`<circle cx="${f1(L.ascX+Math.cos(an)*22)}" cy="${f1(L.ascY+Math.sin(an)*22)}" r="4" style="fill:var(--crocus);opacity:.45"/>`}
    s+=`<path d="M${L.ascX-28} ${L.ascY-28} L${L.ascX+28} ${L.ascY+28} M${L.ascX+28} ${L.ascY-28} L${L.ascX-28} ${L.ascY+28}" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round;opacity:${f1(r2)}"/><text x="${L.ascTx}" y="${L.ascTy}" class="t-lbl">no ASC speck</text></g>`;
    // neutrophil effects
    s+=`<text x="20" y="${L.effHy}" class="t-sm" style="opacity:${f1(.3+.7*b)}">AND ACROSS THE WHOLE NEUTROPHIL</text>`;
    const eff=[['Chemotaxis','crawls poorly toward; chemoattractants'],['Adhesion','sheds L-selectin; E-selectin moved'],['NLRP3','assembly also; dampened']];
    eff.forEach(([h,d],i)=>{const on=ramp(b,i*.25,i*.25+.3);
      const x=N?L.effX:L.effX+i*L.effStep, y=N?L.effY+i*L.effStep:L.effY;
      s+=`<g style="opacity:${f1(.25+.75*on)}"><rect x="${x}" y="${y}" width="${L.effW}" height="${L.effH}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>${neutro(x+L.nX,y+L.nY,16,1)}<text x="${x+L.txX}" y="${y+L.ttY}" class="t-lbl">${h}</text><text x="${x+L.txX}" y="${y+L.l1Y}" class="t-xs">${d.split('; ')[0]}</text><text x="${x+L.txX}" y="${y+L.l2Y}" class="t-xs">${d.split('; ')[1]||''}</text>`;
      if(i===0)s+=`<path d="M${x+L.arrX} ${y+L.arrY} h${f1(L.arrLen+L.arrVar*(1-on))}" class="arrow" marker-end="url(#ciA)"/><path d="M${x+L.crX} ${y+L.crY} l14 18 M${x+L.crX+14} ${y+L.crY} l-14 18" style="stroke:var(--bad);stroke-width:3;opacity:${f1(on)}"/>`;
      if(i===1)s+=`<path d="M${x+L.vwX+20} ${y+L.vwY} H${x+L.vwX+L.vwW+20}" style="stroke:var(--bad);stroke-width:4;opacity:.5"/><text x="${x+L.vwTx}" y="${y+L.vwTy}" class="t-xs" style="fill:var(--bad)">vessel wall</text>`;
      s+='</g>'});
    return s+'</g>'}
  function draw(t){
    const oA=1-ramp(t,.24,.28),oB=ramp(t,.25,.29)*(1-ramp(t,.43,.47)),oC=ramp(t,.44,.48)*(1-ramp(t,.72,.76)),oD=ramp(t,.73,.77);
    let hN=0;if(oA>0)hN=Math.max(hN,H_A);if(oB>0)hN=Math.max(hN,H_B);if(oC>0)hN=Math.max(hN,H_C);if(oD>0)hN=Math.max(hN,H_D);
    N=vb(svg,'720 400','400 '+(hN||H_A));
    const VW=N?400:720,VH=N?(hN||H_A):400;
    svg.innerHTML=`<defs>${marker('ciA')}</defs><rect width="${VW}" height="${VH}" rx="12" style="fill:var(--field)"/>`+sceneA(t,oA)+sceneB(t,oB)+sceneC(t,oC)+sceneD(t,oD);
    const p=phaseOf(CI,t);setSt(p);$('#ciNote').innerHTML=noteHTML(CI[p]);
  }
  const stop=playWire(rg,$('#ciPlay'),draw,26000,'Replay','colin');
  const setSt=stepWire($('#ciSteps'),CI,rg,draw,stop);
  $('#ciCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>It binds tubulin and disrupts microtubules</h4><p>This has been known for decades and is the starting point of every proposed mechanism. Pyrin itself was found sitting on microtubules in 2001, long before anyone knew why that mattered. <sup class="c" data-ref="Leung2015,Mansfield2001" title="Source 147,166">147,166</sup></p></div>
   <div class="card"><span class="ev est">Established</span><h4>It suppresses the pyrin inflammasome selectively</h4><p>In cell experiments colchicine blocked pyrin-driven IL-1β release without a consistent effect on NLRP3, NLRC4 or AIM2 at the concentrations tested. <sup class="c" data-ref="Gao2016,Park2016" title="Source 74,207">74,207</sup></p></div>
   <div class="card"><span class="ev early">Debated</span><h4>Which route matters most?</h4><p>GEF-H1/RhoA re-activation (route 1) and loss of the microtubule-dependent step (route 2) were both shown in cultured cells. The results differ partly because studies used different drug concentrations. <sup class="c" data-ref="Park2016,Gao2016,Schnappauf2019" title="Source 74,207,234">74,207,234</sup></p></div>
   <div class="card"><span class="ev early">A puzzle</span><h4>FMF pyrin can fire without microtubules</h4><p>In patients' cells, FMF variants removed the need for microtubules, yet colchicine still works clinically. Proposed explanations include its effects on neutrophil migration and adhesion, and a remaining partial dependence on microtubules in the body. This is an open question. <sup class="c" data-ref="VanGorp2016,Magnotti2019" title="Source 162,270">162,270</sup></p></div>`;
  draw(+rg.value);
};

/* =============== 2.2 colchicine over months =============== */
const CM_STEPS=[
 {from:0,at:.05,k:'Months −3 to 0',t:'Before treatment',
  txt:'Untreated, attacks come every few weeks. SAA soars during attacks (median 693 mg/L in one cohort) and stays above normal between them in some patients. Persistently raised SAA is the fuel for amyloidosis. <sup class="c" data-ref="Lachmann2006,Lachmann2007" title="Source 141,142">141,142</sup>',
  pt:'Before treatment, attacks keep coming and hidden inflammation continues between them.',
  hook:'Treat to two targets: <b>no attacks</b> and <b>normal SAA/CRP between attacks</b>.'},
 {from:.111,at:.13,k:'Days 1–14',t:'Drug builds up in white cells',
  txt:'After each dose, leukocyte levels peak about two days later. With a half-life of roughly 27–31 hours on repeated dosing, plasma levels approach steady state within about a week, and leukocyte levels build over a similar or slightly longer span. This is a pharmacokinetic estimate, not a trial result. <sup class="c" data-ref="Chappey1993,FDA-Colcrys,BenChetrit2018Textbook" title="Source 16,38,63">16,38,63</sup>',
  pt:'For the first week or two the drug is still building up inside the white cells.',
  hook:'Colchicine is daily <b>prophylaxis</b>. During an attack guidelines continue the usual dose and add NSAIDs.'},
 {from:.15,at:.19,k:'Months 1–3',t:'Fewer attacks, slowly visible',
  txt:'Because attacks were weeks apart to begin with, it takes months of observation to see that they have become rarer. EULAR 2016 advised reviewing response, toxicity and adherence every 6 months; a German treat-to-target consensus suggests every 3–6 months. The 1974 placebo-controlled trials used treatment periods of 2–3 months. <sup class="c" data-ref="Ozen2016,Ozen2017,Ehlers2023,Zemer1974,Goldstein1974" title="Source 59,87,199,200,285">59,87,199,200,285</sup>',
  pt:'Attacks come less often, but you only notice after a few months because they were weeks apart anyway.',
  hook:'Response is assessed over months. Do not label someone resistant after a few weeks.'},
 {from:.222,at:.27,k:'Months 3–6',t:'Adjusting the dose',
  txt:'Guidelines advise raising the dose stepwise (often 0.25–0.5 mg steps) up to the maximum tolerated if attacks or raised markers persist, checking CRP or SAA at least every 3 months while escalating, and confirming adherence first. EULAR 2016 suggested resistance when ≥1 attack a month continues after ≥6 months at the maximum tolerated dose. A 2021 consensus uses ≥1 attack a month over 3 months or persistent laboratory inflammation. <sup class="c" data-ref="Ozen2017,Ehlers2023,Ozen2021" title="Source 59,200,202">59,200,202</sup>',
  pt:'If attacks continue, doctors usually raise the dose step by step and check the tablets are being taken every day.',
  hook:'Before "resistance": confirm adherence, then maximize the dose.'},
 {from:.333,at:.6,k:'Months 6–24',t:'SAA normalizes, protection accrues',
  txt:'With full control, SAA between attacks falls into the normal range. In children with high SAA, a dose increase cut median SAA from 244 to 35.5 mg/L within 2 months. Adherent colchicine prevents AA amyloidosis even in patients with occasional attacks. Treatment is lifelong; EULAR 2016 allowed considering dose reduction only after 5+ attack-free years with normal markers. <sup class="c" data-ref="Duzova2003,Zemer1986,Lachmann2007,Ozen2017" title="Source 58,142,200,286">58,142,200,286</sup>',
  pt:'Over time the hidden inflammation settles, which protects the kidneys for the long run. Treatment continues for life.',
  hook:'Colchicine\'s most important job is preventing <b>amyloidosis</b>. Attack control is the visible part.'}
];
const CM_SC={
 full:{n:'Full response',eff:[.95,.95],off:[]},
 partial:{n:'Partial response',eff:[.6,.82],off:[]},
 miss:{n:'Many missed doses',eff:[.95,.95],off:[[150,215],[330,380],[500,575]]},
 resist:{n:'Colchicine-resistant',eff:[.3,.38],off:[]}
};
inits.colmonths=()=>{
  const svg=$('#cmSvg'),rg=$('#cmT');let sc='full';const D0=-90,D1=730,ND=D1-D0;
  function sim(key){const S=CM_SC[key],r=rng(key.length*131+7);const lv=[],ct=[],saa=[],att=[],dose=[],cum=[];let L=0,C=0,cu=0,spike=0;
    for(let i=0;i<=ND;i++){const d=D0+i;const on=d>=0&&!S.off.some(([a,b])=>d>=a&&d<b);
      const dz=d<0?0:(key!=='full'&&d>=120?1:.67);dose.push(dz);
      const target=on?dz/1:0;L+=(target-L)*(on?1/5:1/4);lv.push(L);
      C+=(L-C)/40;ct.push(C);
      const eff=d>=120?S.eff[1]:S.eff[0];const rate=1.6/30*(1-eff*clamp(C*1.25));
      if(r()<rate&&!(att.length&&d-att[att.length-1]<6))att.push(d);
      if(att.length&&att[att.length-1]===d)spike=1;else spike*=.6;
      const base=3+40*(1-eff*clamp(C*1.25));saa.push(base+600*spike);
      cu+=Math.max(0,saa[i]-10);cum.push(cu)}
    return{lv,ct,saa,att,dose,cum}}
  const UNT=(()=>{const s=sim('resist');return s})();
  const SIM={};Object.keys(CM_SC).forEach(k=>SIM[k]=sim(k));
  const untreatedCum=(()=>{let cu=0;const out=[];const r=rng(9);let spike=0,last=-99;for(let i=0;i<=ND;i++){const d=D0+i;if(r()<1.6/30&&d-last>6){last=d;spike=1}else spike*=.6;cu+=Math.max(0,43+600*spike-10);out.push(cu)}return out})();
  function draw(t){
    const _d=Math.round(D0+t*ND), _inset=_d>=0&&_d<60;
    const N=vb(svg,'720 470',_inset?'400 566':'400 452');
    const X0=N?46:70, X1=N?392:700, xd=d=>lerp(X0,X1,(d-D0)/ND);
    const y1=N?26:24,h1=N?70:78, y2=N?128:130,h2=N?56:68, y3=N?210:226,h3=N?86:96, y4=N?322:348,h4=N?70:78;
    const gridBot=y4+h4, axisY=gridBot+16;
    const S=SIM[sc],dNow=Math.round(D0+t*ND),iNow=dNow-D0;let s=`<defs>${marker('cmA')}</defs>`;
    const panel=(y0,h,title,c)=>`<text x="${X0}" y="${y0-3}" class="t-sm" style="fill:${c}">${title}</text><line x1="${X0}" x2="${X1}" y1="${y0+h}" y2="${y0+h}" class="axis"/>`;
    // month grid
    for(const m of (N?[-3,0,6,12,18,24]:[-3,0,3,6,9,12,15,18,21,24])){const x=xd(m*30.4);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="16" y2="${gridBot}" class="grid"/><text x="${f1(x)}" y="${axisY}" class="t-xs t-mid">${m}</text>`}
    s+=N?`<text x="${X0}" y="${axisY+16}" class="t-xs">months since starting · <tspan style="fill:var(--warn)">illustrative model</tspan></text>`:`<text x="${X1}" y="468" class="t-xs t-end">months since starting colchicine</text><text x="${X0}" y="468" class="t-xs" style="fill:var(--warn)">ILLUSTRATIVE MODEL · not measured kinetics</text>`;
    s+=`<rect x="${f1(xd(0))}" y="14" width="${f1(X1-xd(0))}" height="${gridBot-14}" style="fill:var(--crocus-soft);opacity:.35"/>`;
    // panel 1 drug
    s+=panel(y1,h1,'COLCHICINE INSIDE LEUKOCYTES · dashed = prescribed dose','var(--crocus)');
    const sl=(arr,mx,y0,h)=>{let d='';for(let i=0;i<=iNow;i+=2)d+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y0+h-h*clamp(arr[i]/mx));return d};
    s+=`<path d="${sl(S.lv,1.05,y1,h1)}" style="fill:none;stroke:var(--crocus);stroke-width:2.5"/>`;
    s+=`<path d="${sl(S.dose,1.05,y1,h1)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 4"/>`;
    CM_SC[sc].off.forEach(([a,b])=>{if(a<=dNow)s+=`<rect x="${f1(xd(a))}" y="${y1+14}" width="${f1(xd(Math.min(b,dNow))-xd(a))}" height="${h1-14}" style="fill:var(--bad);opacity:.12"/><text x="${f1(xd(a)+3)}" y="${y1+26}" class="t-xs" style="fill:var(--bad)">doses missed</text>`});
    // inset: first 3 weeks
    if(dNow>=0&&dNow<60){const ix=N?X0:430,iy=N?axisY+30:30,iw=N?(X1-X0):260,ih=70,k=clamp(dNow/21);s+=`<rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" rx="8" style="fill:var(--panel);stroke:var(--line)"/><text x="${ix+8}" y="${iy+14}" class="t-xs">ZOOM · first 21 days</text>`;
      let pd='',ld='';for(let i=0;i<=200*k;i++){const day=i/200*21,ph=day%1;const p=(ph<.06?ph/.06:Math.exp(-(ph-.06)*2.2))*.55+.05;const l=1-Math.exp(-day/4);const x=ix+10+i/200*(iw-20);pd+=(i?'L':'M')+f1(x)+' '+f1(iy+ih-6-(ih-24)*p);ld+=(i?'L':'M')+f1(x)+' '+f1(iy+ih-6-(ih-24)*l)}
      s+=`<path d="${pd}" style="fill:none;stroke:var(--bad);stroke-width:1.2"/><path d="${ld}" style="fill:none;stroke:var(--crocus);stroke-width:2.2"/><text x="${ix+iw-8}" y="${iy+14}" class="t-xs t-end"><tspan style="fill:var(--bad)">plasma</tspan> · <tspan style="fill:var(--crocus)">leukocytes</tspan></text>`}
    // panel 2 attacks
    s+=panel(y2,h2,'ATTACKS','var(--terra)');
    S.att.filter(d=>d<=dNow).forEach(d=>{const x=xd(d);s+=`<path d="M${f1(x-4)} ${y2+h2} L${f1(x)} ${y2+20} L${f1(x+4)} ${y2+h2}z" style="fill:var(--terra)"/>`});
    // panel 3 SAA log
    const lg=v=>clamp(Math.log10(Math.max(1,v))/3);
    s+=panel(y3,h3,'SAA (log scale, mg/L)','var(--gold)');
    s+=`<rect x="${X0}" y="${f1(y3+h3-h3*lg(10))}" width="${X1-X0}" height="${f1(h3*lg(10))}" style="fill:var(--good-soft);opacity:.8"/><text x="${X1-4}" y="${f1(y3+h3-4)}" class="t-xs t-end" style="fill:var(--good)">normal range (&lt;10)</text>`;
    [1,10,100,1000].forEach(v=>s+=`<text x="${X0-6}" y="${f1(y3+h3-h3*lg(v)+3)}" class="t-xs t-end">${v}</text>`);
    let sd='';for(let i=0;i<=iNow;i++)sd+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y3+h3-h3*lg(S.saa[i]));s+=`<path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:1.6"/>`;
    // panel 4 cumulative inflammatory burden
    const mx=untreatedCum[ND];s+=panel(y4,h4,'CUMULATIVE SAA BURDEN · dashed = never treated','var(--bad)');
    let ud='';for(let i=0;i<=ND;i+=4)ud+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y4+h4-h4*untreatedCum[i]/mx);s+=`<path d="${ud}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    let cd='';for(let i=0;i<=iNow;i+=2)cd+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y4+h4-h4*S.cum[i]/mx);s+=`<path d="${cd}" style="fill:none;stroke:var(--bad);stroke-width:2.6"/>`;
    s+=`<line x1="${f1(xd(dNow))}" x2="${f1(xd(dNow))}" y1="14" y2="${gridBot+2}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/>`;
    s+=`<text x="${f1(xd(0)+4)}" y="${y2+12}" class="t-xs" style="fill:var(--crocus)">colchicine starts ↓</text>`;
    svg.innerHTML=s;
    const p=phaseOf(CM_STEPS,t);setSt(p);
    const last90=S.att.filter(d=>d<=dNow&&d>dNow-90).length;
    const months=(dNow/30.4);
    $('#cmRead').innerHTML=`<span>month <b>${months.toFixed(1)}</b></span><span>attacks in last 90 days <b>${last90}</b></span><span>SAA today <b>${Math.round(S.saa[iNow])} mg/L</b></span><span>drug in leukocytes <b>${S.dose[iNow]>0?Math.min(100,Math.round(100*S.lv[iNow]/S.dose[iNow])):0}%</b> of steady state for the current dose</span>`;
    let extra='';
    if(sc==='partial')extra='<div class="kv"><div><dt>This scenario</dt><dd>Attacks fall but do not stop. At month 4 the dose is raised (dashed line steps up), which helps further. If SAA or attacks persist at the maximum tolerated dose, guidelines add IL-1 blockade. <sup class="c" data-ref="Ozen2016" title="Source 199">199</sup></dd></div></div>';
    if(sc==='miss')extra='<div class="kv"><div><dt>This scenario</dt><dd>Each gap in doses lets leukocyte levels drain within days, and attacks and SAA return after a lag. Poor adherence is common: in one Israeli clinic only 13% filled every prescription in a year. It is a frequent reason for apparent resistance, and in Zemer\'s cohort it was the difference between 1.7% and 48.9% developing proteinuria. <sup class="c" data-ref="BenChetrit2009D,Zemer1986,Ozen2017" title="Source 14,200,286">14,200,286</sup></dd></div></div>';
    if(sc==='resist')extra='<div class="kv"><div><dt>This scenario</dt><dd>Roughly 5–10% of patients keep having attacks or raised markers despite the maximum tolerated dose, and another 2–5% cannot tolerate it. Colchicine is usually continued, because it may still lower amyloid risk, and an IL-1 blocker is added. <sup class="c" data-ref="Ozen2017,BenChetrit2018Textbook,Ozen2025,DeBenedetti2018" title="Source 16,44,200,203">16,44,200,203</sup></dd></div></div>';
    $('#cmNote').innerHTML=noteHTML(CM_STEPS[p])+extra;
  }
  const stop=playWire(rg,$('#cmPlay'),draw,22000,'Replay','colmonths');
  const setSt=stepWire($('#cmSteps'),CM_STEPS,rg,draw,stop);
  $$('[data-cm]').forEach(b=>b.onclick=()=>{sc=b.dataset.cm;$$('[data-cm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* long view: decades */
  const ls=$('#cmLong'),lr=$('#clT');
  // anchored on Zemer 1986: cumulative proteinuria 48.9% at 9 y without adherence, 1.7% at 11 y with adherence
  const untreated=y=>1-Math.exp(-y*0.0746),adherent=y=>1-Math.exp(-y*0.00156);
  function drawL(t){const NL=vb(ls,'720 260','400 300');const Y=t*12;const x0=NL?46:60,x1=NL?392:700,y0=20,y1=NL?236:210,xy=y=>lerp(x0,x1,y/12),yv=v=>lerp(y1,y0,v/.7);let s='';
    [0,.2,.4,.6].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${x0-6}" y="${f1(yv(v)+3)}" class="t-xs t-end">${Math.round(v*100)}%</text>`);
    (NL?[0,4,8,12]:[0,2,4,6,8,10,12]).forEach(y=>s+=`<text x="${f1(xy(y))}" y="${y1+18}" class="t-xs t-mid">${y}</text>`);
    s+=`<text x="${x1}" y="${y1+36}" class="t-xs t-end">years</text><text x="${x0}" y="14" class="t-xs">CUMULATIVE RISK OF AA AMYLOIDOSIS (schematic)</text>`;
    s+=`<path d="${pathFn(u=>u*12<=Y?untreated(u*12)/.7:NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--bad);stroke-width:3"/>`;
    s+=`<path d="${pathFn(u=>u*12<=Y?adherent(u*12)/.7:NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--crocus);stroke-width:3"/>`;
    s+=`<text x="${f1(xy(Math.max(2,Math.min(Y,11.5))))}" y="${f1(yv(untreated(Math.max(2,Math.min(Y,11.5))))-8)}" class="t-xs t-end" style="fill:var(--bad)">${NL?'untreated':'untreated / non-adherent'}</text><text x="${f1(xy(Math.max(2,Math.min(Y,11.5))))}" y="${f1(yv(adherent(Math.max(2,Math.min(Y,11.5))))-8)}" class="t-xs t-end" style="fill:var(--crocus)">${NL?'adherent':'adherent colchicine'}</text>`;
    s+=`<circle cx="${f1(xy(9))}" cy="${f1(yv(.489))}" r="5" style="fill:none;stroke:var(--bad);stroke-width:2;opacity:${f1(ramp(Y,10,11))}"/><circle cx="${f1(xy(11))}" cy="${f1(yv(.017))}" r="5" style="fill:none;stroke:var(--crocus);stroke-width:2;opacity:${f1(ramp(Y,10,11))}"/>`;
    ls.innerHTML=s;
    $('#clCap').innerHTML=`Year ${Y.toFixed(0)}: untreated ${Math.round(untreated(Y)*100)}% vs adherent ${(adherent(Y)*100).toFixed(1)}%. Curves pass through the circled points from Zemer et al. 1986: cumulative proteinuria 48.9% at 9 years in non-adherent patients and 1.7% at 11 years in adherent ones (1,070 patients). Between and beyond those points the curves are smooth interpolations. Real risk depends strongly on genotype, ancestry and country. <sup class="c" data-ref="Zemer1986,Touitou2007" title="Source 262,286">262,286</sup>`}
  playWire(lr,$('#clPlay'),drawL,9000,'Replay','colmonths');drawL(+lr.value);
  $('#cmCards').innerHTML=`
   <div class="card"><h4>Why the benefit is not immediate</h4><ul><li>The drug needs days of daily dosing to build up in leukocytes.</li><li>Attacks were weeks apart, so fewer attacks only shows up over months.</li><li>Doses are adjusted in steps over months.</li><li>The biggest benefit, amyloid prevention, accrues over years.</li></ul></div>
   <div class="card"><h4>A common misunderstanding</h4><p>Taking extra colchicine once an attack has started is not what the guidelines describe, and patients commonly report doing it. EULAR 2016 advises continuing the usual daily dose during an attack and adding NSAIDs for symptoms, while considering other causes of the pain. Separately, it says a temporary increase may be considered during stressful periods known to trigger attacks, and it calls an increase during the warning phase before an attack unproven. <sup class="c" data-ref="Ozen2016,Ozen2017,Ozen2025" title="Source 199,200,203">199,200,203</sup></p></div>
   <div class="card"><span class="ev early">Evidence check</span><h4>The trial base is thinner than the reputation</h4><p>In the Cochrane re-analysis only one of the 1974 placebo-controlled trials (Goldstein, RR 0.21, 95% CI 0.05–0.95) was clearly positive; the Zemer 1974 trial was not significant. No randomized trial measured amyloidosis: that benefit rests on Zemer\'s 1986 cohort. <sup class="c" data-ref="Yin2022,Goldstein1974,Zemer1974,Zemer1986" title="Source 87,283,285,286">87,283,285,286</sup></p></div>
   <div class="card"><h4>Protection without perfection</h4><p>Even patients who still have some attacks are protected from amyloidosis if they take colchicine regularly, because SAA between attacks stays lower. <sup class="c" data-ref="Zemer1986,Lachmann2007" title="Source 142,286">142,286</sup></p></div>`;
};
/* =============== 2.3 dosing, safety, interactions =============== */
const CD_STEPS=[
 {from:0,at:.12,k:'Days 0–3',t:'Building to a steady level',
  txt:`After a 0.6 mg tablet, plasma colchicine peaks in 1–2 hours (mean Cmax 2.5 ng/mL); mean oral bioavailability is about 45%. The published half-lives do not agree: the US label reports 26.6–31.2 hours on repeated 0.6 mg twice-daily dosing, one intravenous study found a terminal half-life of 57.8 hours, and older oral studies and reviews report about 7–16 hours. The sources do not reconcile that spread, so half-life is best read as a range, not one settled number. Either way each dose adds to what is left of the last until levels settle into a daily rise and fall. Colchicine leaves the body through two exits: P-glycoprotein (P-gp) pumps in gut, liver and kidney, and the CYP3A4 enzyme in gut and liver. <sup class="c" data-ref="FDA-Colcrys,Ferron1996,BenChetrit2018Textbook,Slobodnick2018,Leung2015" title="Source 16,63,66,147,243">16,63,66,147,243</sup>`,
  pt:`Each day's tablet adds to what is left from yesterday until the level settles into a steady daily wave. How long one dose lasts is disputed: published half-lives run from a few hours to over two days.`,
  hook:`Two exits: <b>P-gp</b> pumps and <b>CYP3A4</b>. Block either one and colchicine builds up. Half-life: a <b>disputed range</b>, not one number.`},
 {from:.29,at:.31,k:'Day 3',t:'An interacting drug is added',
  txt:`Strong CYP3A4 inhibitors and P-gp inhibitors close those exits. Life-threatening and fatal interactions have been reported, and the label contraindicates these combinations in people with kidney or liver impairment. The heights here come from the label's single-dose interaction studies, scaled schematically to daily dosing. <sup class="c" data-ref="FDA-Colcrys,Terkeltaub2011" title="Source 63,257">63,257</sup>`,
  pt:`Some medicines block the body's way of clearing colchicine, so the same daily tablet leaves more drug behind.`,
  hook:`Clarithromycin, ketoconazole, ritonavir and cyclosporine raised single-dose exposure by <b>212–296%</b>.`},
 {from:.4,at:.62,k:'Days 4–10',t:'A slow climb to a new plateau',
  txt:`Because clearance slows, the level keeps climbing for days after the inhibitor starts, so risk grows with the length of the overlap. In the clarithromycin study a longer overlap, baseline kidney impairment and pancytopenia predicted death. <sup class="c" data-ref="Hung2005" title="Source 103">103</sup>`,
  pt:`The extra drug piles up day after day, so a week-long antibiotic course can matter more than a single dose.`,
  hook:`Hung 2005: deaths <b>10.2%</b> with clarithromycin given together vs <b>3.6%</b> given sequentially.`},
 {from:.85,at:.97,k:'What the label publishes',t:'FMF dose caps',
  txt:`When there is no alternative to the interacting drug, the US label caps the FMF dose at 0.6 mg/day with strong CYP3A4 or P-gp inhibitors and 1.2 mg/day with moderate CYP3A4 inhibitors. The caps also apply within 14 days of taking the interacting drug. Press "Apply the label's FMF dose cap" to see the effect. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`,
  pt:`If two drugs must be taken together, the label lowers the colchicine ceiling so that levels stay closer to normal.`,
  hook:`Label FMF caps: <b>0.6 mg/day</b> (strong CYP3A4 or P-gp) and <b>1.2 mg/day</b> (moderate CYP3A4).`}
];
const CD_DRUGS={
 none:{n:'No interacting drug',sh:'nothing added',f:1,pct:'none',cap:null,capTxt:'not needed',
  txt:`Without an interaction, levels settle into the usual daily wave within about a week. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 clari:{n:'Clarithromycin',sh:'clarithromycin',f:3.82,pct:'+282%',cap:.6,capTxt:'0.6 mg/day',
  txt:`A strong CYP3A4 inhibitor. In the label's single-dose study it raised colchicine AUC by 282%. In a retrospective study, 9 of 88 patients (10.2%) given both drugs together died, versus 1 of 28 (3.6%) given them one after the other. Azithromycin raised exposure much less and is suggested as the safer macrolide. <sup class="c" data-ref="FDA-Colcrys,Hung2005,Terkeltaub2011,BenChetrit2018Textbook" title="Source 16,63,103,257">16,63,103,257</sup>`},
 keto:{n:'Ketoconazole / itraconazole',sh:'ketoconazole',f:3.12,pct:'+212% (ketoconazole)',cap:.6,capTxt:'0.6 mg/day',
  txt:`Strong CYP3A4 inhibitors. Ketoconazole raised colchicine AUC by 212% in the label study; itraconazole sits in the same label group, and the curve uses the ketoconazole figure. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 rito:{n:'Ritonavir',sh:'ritonavir',f:3.96,pct:'+296%',cap:.6,capTxt:'0.6 mg/day',
  txt:`A strong CYP3A4 inhibitor, the largest increase in the label's table (+296%). Most HIV protease inhibitors are in the same label group. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 cyclo:{n:'Cyclosporine',sh:'cyclosporine',f:3.59,pct:'+259%',cap:.6,capTxt:'0.6 mg/day',
  txt:`A P-gp inhibitor that raised colchicine AUC by 259%. Cyclosporine can bring on colchicine neuromyopathy within weeks and may mask the gut warning signs of toxicity. <sup class="c" data-ref="FDA-Colcrys,BenChetrit2018Textbook" title="Source 16,63">16,63</sup>`},
 vera:{n:'Verapamil',sh:'verapamil',f:2.03,pct:'+103%',cap:1.2,capTxt:'1.2 mg/day',
  txt:`A moderate CYP3A4 inhibitor in the label's list; colchicine AUC rose by 103%. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 dilt:{n:'Diltiazem',sh:'diltiazem',f:1.93,pct:'+93%',cap:1.2,capTxt:'1.2 mg/day',
  txt:`A moderate CYP3A4 inhibitor in the label's list; colchicine AUC rose by 93%. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 azi:{n:'Azithromycin',sh:'azithromycin',f:1.57,pct:'+57%',cap:null,capTxt:'none listed in our sources',
  txt:`Raised colchicine AUC by 57%, far less than clarithromycin, which is why reviews suggest it as the safer macrolide. It is not in the label cap lists we cite, so the cap button has no effect here. <sup class="c" data-ref="FDA-Colcrys,Terkeltaub2011,BenChetrit2018Textbook" title="Source 16,63,257">16,63,257</sup>`},
 grape:{n:'Grapefruit juice',sh:'grapefruit juice',f:1,pct:'no mean change in the label study',cap:1.2,capTxt:'1.2 mg/day (label: avoid)',
  txt:`The label contradicts itself here. It lists grapefruit juice in its table of moderate CYP3A4 inhibitors and tells patients to avoid it, yet its own interaction study (240 mL twice daily for 4 days) found mean Cmax and AUC each changed by under 3%, which is no meaningful change. Both statements sit in the same document and neither source resolves the conflict. The curve therefore does not move; the effect may still vary with product and person. <sup class="c" data-ref="FDA-Colcrys,Leung2015" title="Source 63,147">63,147</sup>`},
 renal:{n:'Severe kidney impairment',sh:'severe kidney impairment',f:4.3,renal:true,pct:'clearance −75% on dialysis',cap:.3,capTxt:'start at 0.3 mg/day',
  txt:`Shown as if it began on day 3 only for comparison. This height is not from an AUC study: it is derived from the reported clearance figure, so it is the roughest curve here. In FMF patients on dialysis, colchicine clearance was 75% lower (0.17 vs 0.73 L/h/kg) and dialysis does not remove the drug. For CrCl below 30 mL/min or dialysis the label (FMF) starts at 0.3 mg/day and increases only with close monitoring. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`}
};
const CD_ORG={
 gut:{n:'Gut',rep:`Cramping, nausea, diarrhoea, abdominal pain and vomiting are the most common effects. The label reports them in up to 20% of patients starting FMF treatment, usually within 24 hours, and says severe gut effects can herald more serious toxicity. Long-term use lowers intestinal lactase, sucrase and maltase and can impair vitamin B12 absorption. <sup class="c" data-ref="FDA-Colcrys,Ozen2017,BenChetrit2018Textbook" title="Source 16,63,200">16,63,200</sup>`,
  mon:`Symptoms are reviewed at each visit. Reviews note that dividing the daily dose can reduce gut effects, and that avoiding lactose or lowering the dose can help. <sup class="c" data-ref="Ozen2017,BenChetrit2018Textbook" title="Source 16,200">16,200</sup>`},
 muscle:{n:'Muscle',rep:`Colchicine myopathy causes weakness of the hip and shoulder muscles with a raised CK, typically with reduced kidney function. It can be mistaken for polymyositis and remits within 3–4 weeks of stopping. The label warns of rhabdomyolysis at therapeutic doses, especially with kidney impairment, older age, statins or fibrates. <sup class="c" data-ref="Kuncl1987,FDA-Colcrys" title="Source 63,140">63,140</sup>`,
  mon:`CPK (CK) is in the EULAR 2016 monitoring set; in reduced kidney function the guideline advises close watch, CK checks and a lower dose. The label notes CK monitoring will not necessarily prevent severe myopathy with statins or fibrates. <sup class="c" data-ref="Ozen2016,Ozen2017,FDA-Colcrys" title="Source 63,199,200">63,199,200</sup>`},
 nerves:{n:'Nerves',rep:`A mild axonal polyneuropathy often comes with the myopathy (myoneuropathy). It resolves more slowly than the muscle weakness after the drug is stopped. Cyclosporine can bring on neuromyopathy within weeks. <sup class="c" data-ref="Kuncl1987,BenChetrit2018Textbook" title="Source 16,140">16,140</sup>`,
  mon:`No nerve test is in the guideline monitoring set (SAA/CRP, blood count, liver enzymes, kidney function, CPK, urinalysis), so nerve symptoms are picked up clinically alongside the CK check. <sup class="c" data-ref="Ozen2016" title="Source 199">199</sup>`},
 marrow:{n:'Bone marrow',rep:`Myelosuppression, leukopenia, granulocytopenia, thrombocytopenia, pancytopenia and aplastic anaemia have been reported at therapeutic doses, but leukopenia is very rare at standard FMF doses. In the clarithromycin study, pancytopenia predicted death. <sup class="c" data-ref="FDA-Colcrys,BenChetrit2018Textbook,Hung2005" title="Source 16,63,103">16,63,103</sup>`,
  mon:`A blood count is in the EULAR 2016 monitoring set. The German consensus advises further work-up and a lower dose if counts become abnormal. <sup class="c" data-ref="Ozen2016,Ehlers2023" title="Source 59,199">59,199</sup>`},
 liver:{n:'Liver',rep:`The liver metabolizes colchicine (CYP3A4 makes 2- and 3-demethylcolchicine) and pumps it into bile through P-gp. In chronic liver disease clearance may be much lower and the half-life longer, with wide variation between people. <sup class="c" data-ref="FDA-Colcrys,Slobodnick2018" title="Source 63,243">63,243</sup>`,
  mon:`EULAR 2016 advises checking liver enzymes regularly, and reducing colchicine and investigating the cause if they exceed twice the upper limit of normal. The label (FMF) advises close monitoring in mild to moderate liver impairment and considering a dose reduction in severe disease. <sup class="c" data-ref="Ozen2016,Ozen2017,FDA-Colcrys" title="Source 63,199,200">63,199,200</sup>`},
 kidney:{n:'Kidney',rep:`How much leaves by the kidney is disputed: the US label reports 40–65% of an oral dose recovered unchanged in urine, while a review puts renal elimination at 10–20% and treats the biliary and faecal route as the main one. The sources do not explain the gap. Both agree dialysis does not remove colchicine. Reduced kidney function is the usual setting for myopathy and for fatal interactions. <sup class="c" data-ref="FDA-Colcrys,BenChetrit2018Textbook,Kuncl1987,Hung2005" title="Source 16,63,103,140">16,63,103,140</sup>`,
  mon:`Kidney function is in the EULAR 2016 set; with reduced function the guideline advises close watch, CK checks and a lower dose. Urinalysis at every visit looks for proteinuria, the first sign of amyloidosis (a disease complication, not a drug effect). <sup class="c" data-ref="Ozen2016,Ozen2017" title="Source 199,200">199,200</sup>`}
};
inits.coldose=()=>{
  /* ---------- 1. exposure window ---------- */
  const svg=$('#cdSvg'),rg=$('#cdT');let dk='clari',capOn=false;
  const DT=.25,NH=240,NI=NH/DT,KE=Math.LN2/29,KA=Math.LN2/.6,NORM=KE*24,BASE=1.8,I72=72/DT;
  Object.values(CD_DRUGS).forEach(D=>{D.fb=D.renal?1:Math.sqrt(D.f);D.fc=D.f/D.fb});
  function sim(fb,fc,df){const a=new Float32Array(NI+1);let g=0,c=0;
    for(let i=0;i<=NI;i++){const h=i*DT;if(i%(24/DT)===0&&h<NH)g+=h>=72?fb*df:1;
      const k=h>=72?KE/fc:KE,ab=KA*g*DT;g-=ab;c+=ab-k*c*DT;a[i]=c*NORM}return a}
  const cache={};
  function get(key,capped){const id=key+(capped?'c':'');if(cache[id])return cache[id];const D=CD_DRUGS[key];return cache[id]=sim(D.fb,D.fc,capped&&D.cap?D.cap/BASE:1)}
  let X0=64,X1=700,Y0=322,Y1=46;const VM=5;
  const xh=h=>X0+(X1-X0)*h/NH,yv=v=>Y0-(Y0-Y1)*Math.min(v,VM+.15)/VM;
  function pth(a,i0,i1){let d='';for(let i=i0;i<=i1;i+=2)d+=(d?'L':'M')+f1(xh(i*DT))+' '+f1(yv(a[i]));if(i1>i0&&(i1-i0)%2)d+='L'+f1(xh(i1*DT))+' '+f1(yv(a[i1]));return d}
  function draw(t){
    /* narrow: same chart, full 400 wide and taller; axis notes and the day-3
       annotation stack instead of sitting side by side, so the longest drug
       names cannot run off the right edge. */
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
    if(N)s+=`<text x="${f1((X0+X1)/2)}" y="${Y0+32}" class="t-xs t-mid">days of once-daily dosing</text><text x="${X0}" y="${Y0+50}" class="t-xs">exposure vs usual average</text><text x="${X0}" y="${Y0+63}" class="t-xs">schematic model, not measured data</text>`;
    else s+=`<text x="${X1}" y="${Y0+34}" class="t-xs t-end">days of once-daily dosing</text><text x="${X0}" y="${Y0+34}" class="t-xs">exposure vs usual average · schematic model, not measured data</text>`;
    s+=`<text x="${N?X0:X1-6}" y="${N?22:Y1+14}" class="t-sm ${N?'':'t-end'}" style="fill:var(--bad)">toxicity risk rises · no sharp threshold</text>`;
    s+=`<text x="${X0+6}" y="${f1(yv(1.55)+12)}" class="t-xs" style="fill:var(--good)">usual range (schematic)</text>`;
    const x3=xh(72);
    s+=`<line x1="${f1(x3)}" x2="${f1(x3)}" y1="${Y1-14}" y2="${Y0}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 4;opacity:.55"/>`;
    if(N){s+=`<text x="${f1(x3+6)}" y="${Y1-26}" class="t-lbl">day 3: ${dk==='none'?'nothing added':'+ '+D.sh}</text>`;
      if(hasCap)s+=`<text x="${f1(x3+6)}" y="${Y1-10}" class="t-xs" style="fill:${col}">label cap ${D.cap} mg/day</text>`}
    else s+=`<text x="${f1(x3+6)}" y="${Y1-6}" class="t-lbl">day 3: ${dk==='none'?'nothing added':'+ '+D.sh}${hasCap?' · label cap '+D.cap+' mg/day':''}</text>`;
    // dose markers
    for(let d=0;d<10;d++){const h=d*24;if(h>hN+.01)break;const fr=h>=72&&hasCap?df:1;s+=`<rect x="${f1(xh(h)-3)}" y="${f1(Y0-2-16*fr)}" width="6" height="${f1(16*fr)}" rx="2" style="fill:var(--crocus);opacity:.75"/>`}
    // curves
    if(iN>1)s+=`<path d="${pth(R,0,iN)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    if(U&&iN>I72)s+=`<path d="${pth(U,I72,iN)}" style="fill:none;stroke:var(--bad);stroke-width:1.6;opacity:.35"/>`;
    if(iN>1)s+=`<path d="${pth(A,0,Math.min(iN,I72))}" style="fill:none;stroke:var(--crocus);stroke-width:2.6;stroke-linejoin:round"/>`;
    if(iN>I72)s+=`<path d="${pth(A,I72,iN)}" style="fill:none;stroke:${col};stroke-width:2.8;stroke-linejoin:round"/>`;
    if(dk!=='none'&&Math.abs(fEff-1)>.05&&hN>72){const yy=yv(fEff);
      s+=`<line x1="${f1(x3)}" x2="${X1}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${col};stroke-width:1.2;stroke-dasharray:2 4"/><text x="${f1(x3+8)}" y="${f1(yy-6)}" class="t-xs" style="fill:${col}">average if continued ≈ ${f1(fEff)}×</text>`}
    if(iN>0){const v=A[iN],cx=xh(hN);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${Y1}" y2="${Y0}" style="stroke:var(--ink);opacity:.22"/><circle cx="${f1(cx)}" cy="${f1(yv(v))}" r="5.5" style="fill:${hN>72?col:'var(--crocus)'};stroke:var(--panel);stroke-width:2"/>`}
    svg.innerHTML=s;
    $('#cdRead').innerHTML=`<span>day <b>${f1(hN/24)}</b></span><span>exposure now <b>${f1(A[iN])}×</b> usual average</span><span>label AUC change <b>${D.pct}</b></span><span>label FMF cap <b>${D.capTxt}</b></span>`;
    const p=phaseOf(CD_STEPS,t);setSt(p);
    $('#cdNote').innerHTML=noteHTML(CD_STEPS[p])+`<div class="kv"><div><dt>${D.n}${hasCap?' · capped':''}</dt><dd>${D.txt}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#cdPlay'),draw,15000,'Replay','coldose');
  const setSt=stepWire($('#cdSteps'),CD_STEPS,rg,draw,stop);
  $$('[data-cd]').forEach(b=>b.onclick=()=>{dk=b.dataset.cd;$$('[data-cd]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#cdCap').onclick=()=>{capOn=!capOn;$('#cdCap').setAttribute('aria-pressed',capOn);draw(+rg.value)};
  draw(+rg.value);

  /* ---------- 2. published dose by age ---------- */
  const ag=$('#cdAge'),asv=$('#cdAgeSvg');let cur=null,stopT=null;
  function target(a){const child=a<18,e=a<5?[0,.5]:a<=10?[.5,1]:[1,1.5],l=a<4?null:a<6?[.3,1.8]:a<=12?[.9,1.8]:[1.2,2.4];
    return{e0:e[0],e1:e[1],mx:child?2:3,l0:l?l[0]:0,l1:l?l[1]:0,hasL:!!l,child,es:a<5?'≤0.5':a<=10?'0.5–1.0':'1.0–1.5',ls:l?l[0]+'–'+l[1]:''}}
  let AX0=170,AX1=690;const MXS=3.5,xm=m=>AX0+(AX1-AX0)*m/MXS;
  function drawAge(v,T,a){
    /* narrow: the two bars and the step note stack down the page, each with its
       own heading above it, so the mg/day figures keep their full size. */
    const N=vb(asv,'720 226','400 392');
    AX0=N?24:170;AX1=N?376:690;
    const LX=N?16:10,EB=N?80:44,LB=N?200:122,CY=N?352:88;
    let s='';
    for(let m=0;m<=MXS+.01;m+=.5)s+=`<line x1="${f1(xm(m))}" x2="${f1(xm(m))}" y1="${N?56:24}" y2="${N?232:188}" class="grid"/><text x="${f1(xm(m))}" y="${N?248:204}" class="t-xs t-mid">${m}</text>`;
    s+=`<text x="${AX1}" y="${N?264:220}" class="t-xs t-end">mg per day</text>`;
    s+=`<text x="${LX}" y="${N?30:58}" class="t-lbl">EULAR 2016</text><text x="${LX}" y="${N?44:73}" class="t-xs">same ceilings in 2024</text>`;
    s+=`<text x="${LX}" y="${CY}" class="t-xs" style="fill:var(--muted)">the sources give no age</text><text x="${LX}" y="${CY+11}" class="t-xs" style="fill:var(--muted)">cut-off: 18 is this app's</text><text x="${LX}" y="${CY+22}" class="t-xs" style="fill:var(--muted)">assumption</text>`;
    s+=`<rect x="${f1(xm(v.e1))}" y="${EB+4}" width="${f1(Math.max(0,xm(v.mx)-xm(v.e1)))}" height="20" rx="4" style="fill:var(--crocus-soft);stroke:var(--crocus);stroke-opacity:.3"/>`;
    for(let m=v.e1+.25;m<v.mx-.05;m+=.25)s+=`<line x1="${f1(xm(m))}" x2="${f1(xm(m))}" y1="${EB+8}" y2="${EB+20}" style="stroke:var(--crocus);opacity:.4"/>`;
    s+=`<rect x="${f1(xm(v.e0))}" y="${EB}" width="${f1(Math.max(5,xm(v.e1)-xm(v.e0)))}" height="28" rx="5" style="fill:var(--crocus)"/>`;
    s+=`<line x1="${f1(xm(v.mx))}" x2="${f1(xm(v.mx))}" y1="${EB-2}" y2="${EB+34}" style="stroke:var(--bad);stroke-width:3"/>`;
    s+=`<text x="${f1(xm(v.e0))}" y="${EB-10}" class="t-sm" style="fill:var(--crocus)">start ${T.es} mg/day</text>`;
    s+=`<text x="${f1(xm(v.mx)+7)}" y="${EB+19}" class="t-sm" style="fill:var(--bad)">max ${T.mx}</text>`;
    if(T.child)s+=`<line x1="${f1(xm(2.5))}" x2="${f1(xm(2.5))}" y1="${EB+2}" y2="${EB+32}" style="stroke:var(--muted);stroke-width:1.5;stroke-dasharray:3 3"/><text x="${f1(xm(2.5))}" y="${EB+48}" class="t-xs t-mid">2007 paediatric consensus: 2.5</text>`;
    s+=`<text x="${LX}" y="${N?156:132}" class="t-lbl">US label (FMF)</text><text x="${LX}" y="${N?170:147}" class="t-xs">COLCRYS</text>`;
    if(T.hasL){s+=`<rect x="${f1(xm(v.l0))}" y="${LB}" width="${f1(Math.max(4,xm(v.l1)-xm(v.l0)))}" height="26" rx="5" style="fill:var(--sea);opacity:.85"/><text x="${f1(xm(v.l0))}" y="${LB-8}" class="t-sm" style="fill:var(--sea)">label range ${T.ls} mg/day</text>`}
    else s+=`<text x="${N?LX:AX0}" y="${LB+17}" class="t-sm">The label ranges in our source start at age 4.</text>`;
    if(N)s+=`<text x="${LX}" y="290" class="t-lbl">Steps</text><text x="${LX}" y="306" class="t-xs">EULAR 2016: 0.5 mg/day</text><text x="${LX}" y="318" class="t-xs">German consensus: 0.25 or 0.5 mg</text><text x="${LX}" y="330" class="t-xs">label: 0.3 mg/day</text>`;
    else s+=`<text x="10" y="178" class="t-lbl">Steps</text><text x="${AX0}" y="178" class="t-xs">EULAR 2016: 0.5 mg/day · German consensus: 0.25 or 0.5 mg · label: 0.3 mg/day</text>`;
    asv.innerHTML=s;
    $('#cdAgeOut').textContent=a+' y';
    $('#cdAgeRead').innerHTML=`<span>age <b>${a} y</b> (${T.child?'child':'adult'})</span><span>EULAR start <b>${T.es} mg/day</b></span><span>EULAR max <b>${T.mx} mg/day</b></span><span>US label <b>${T.hasL?T.ls+' mg/day':'no range under 4'}</b></span>`;
  }
  function setAge(a,inst){const T=target(a),to={e0:T.e0,e1:T.e1,mx:T.mx,l0:T.l0,l1:T.l1};
    if(stopT)stopT();if(!cur||inst){cur=to;drawAge(cur,T,a);return}
    const from={...cur};stopT=animate(450,p=>{const e=ease(p);cur={};for(const k in to)cur[k]=lerp(from[k],to[k],e);drawAge(cur,T,a)},()=>{stopT=null})}
  ag.addEventListener('input',()=>setAge(+ag.value));
  setAge(+ag.value,true);

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
    // muscle: upper arm + thigh
    s+=G('muscle',`<ellipse cx="101" cy="150" rx="11" ry="34" style="${st('muscle')}"/><ellipse cx="151" cy="318" rx="19" ry="40" style="${st('muscle')}"/>`,151,318,34);
    // marrow: femur
    s+=G('marrow',`<rect x="201" y="282" width="16" height="96" rx="8" style="${st('marrow')}"/><rect x="206" y="296" width="6" height="68" rx="3" style="fill:${on('marrow')?'var(--bad)':'var(--terra-soft)'}"/>`,209,330,30);
    // nerves: right arm and lower legs
    const nv=on('nerves')?'var(--bad)':'var(--gold)',nw=on('nerves')?2.6:1.6;
    s+=G('nerves',`<path d="M259 100 L259 266 M259 150 L266 176 M259 210 L252 236 M151 362 L151 418 M151 380 L143 404 M209 382 L209 418 M209 392 L217 412" style="fill:none;stroke:${nv};stroke-width:${nw};stroke-linecap:round"/><rect x="246" y="96" width="26" height="176" style="fill:transparent"/>`,259,190,26);
    // liver (person's right = viewer's left)
    s+=G('liver',`<path d="M128 146 C140 128 196 126 206 142 C204 160 168 168 132 168 C124 162 124 152 128 146Z" style="${st('liver')}"/>`,162,150,30);
    // kidneys
    s+=G('kidney',`<ellipse cx="142" cy="196" rx="10" ry="16" style="${st('kidney')}"/><ellipse cx="218" cy="196" rx="10" ry="16" style="${st('kidney')}"/>`,180,196,40);
    // gut
    let gi='';[[166,214],[184,212],[202,216],[160,232],[178,234],[196,232],[170,250],[190,250]].forEach(([x,y])=>gi+=`<circle cx="${x}" cy="${y}" r="9" style="${st('gut')}"/>`);
    s+=G('gut',gi,181,232,34);
    s+=`</g>`;
    // labels with leaders (organ end of the leader follows the body's shift)
    const L=(k,x,y,tx,ty,anchor)=>`<line x1="${x+DX}" y1="${y}" x2="${tx+(anchor==='end'?4:-4)}" y2="${ty-4}" style="stroke:var(--muted);stroke-width:1"/><text x="${tx}" y="${ty}" class="t-sm ${anchor==='end'?'t-end':''}" style="fill:${on(k)?'var(--bad)':'var(--muted)'};font-weight:${on(k)?700:500}">${CD_ORG[k].n.toLowerCase()}</text>`;
    s+=L('muscle',96,130,LLX,118,'end')+L('liver',132,154,LLX,160,'end')+L('gut',156,240,LLX,246,'end')+L('nerves',262,128,RLX,118,'')+L('kidney',226,198,RLX,200,'')+L('marrow',216,340,RLX,334,'');
    osv.innerHTML=s;
    const O=CD_ORG[org];
    $('#cdOrgNote').innerHTML=`<div class="kicker">Toxicity map</div><h4>${O.n}</h4><dl class="kv"><div><dt>What is reported</dt><dd>${O.rep}</dd></div><div><dt>What is monitored</dt><dd>${O.mon}</dd></div></dl>`;
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
  const REN={
   normal:`Above 80 mL/min the label's kidney-impairment advice does not apply. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`,
   mild:`Label (FMF): patients with mild impairment (CrCl 50–80) are monitored closely, and the dose may need reducing. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`,
   moderate:`Label (FMF): patients with moderate impairment (CrCl 30–50) are monitored closely, and the dose may need reducing. One review cites a suggested 50% dose reduction below 50 mL/min. <sup class="c" data-ref="FDA-Colcrys,Leung2015" title="Source 63,147">63,147</sup>`,
   severe:`Label (FMF): with CrCl below 30 mL/min, start at 0.3 mg/day and increase only with close monitoring. One review cites a 50% reduction below 50 mL/min; another reports a half-life 2–3 times longer in severe kidney failure. <sup class="c" data-ref="FDA-Colcrys,Leung2015,BenChetrit2018Textbook" title="Source 16,63,147">16,63,147</sup>`,
   dialysis:`Label (FMF): start at 0.3 mg/day and increase only with close monitoring. Dialysis does not remove colchicine. In FMF patients on dialysis, clearance was 75% lower (0.17 vs 0.73 L/h/kg) and half-life longer (18.8 vs 4.4 h) than with normal kidneys, in that study's design. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`};
  function drawRen(p,c){const C=cat(c);let s='';
    const NR=vb(rsv,'460 200','400 240');GX0=NR?12:16;GX1=NR?388:444;
    [[0,30,'var(--bad-soft)','severe'],[30,50,'var(--warn-soft)',NR?'mod.':'moderate'],[50,80,'var(--gold-soft)','mild'],[80,120,'var(--good-soft)',NR?'none':'no adjustment']].forEach(([a,b,f,l])=>{s+=`<rect x="${f1(gx(a))}" y="60" width="${f1(gx(b)-gx(a))}" height="34" style="fill:${f}"/><text x="${f1((gx(a)+gx(b))/2)}" y="81" class="t-xs t-mid">${l}</text>`});
    s+=`<rect x="${GX0}" y="60" width="${GX1-GX0}" height="34" rx="3" style="fill:none;stroke:var(--line)"/>`;
    [0,30,50,80,120].forEach(v=>s+=`<text x="${f1(gx(v))}" y="112" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${GX1}" y="128" class="t-xs t-end">mL/min</text>`;
    const px=gx(p);s+=`<path d="M${f1(px)} 56 l-8 -14 h16z" style="fill:${C.col}"/><line x1="${f1(px)}" x2="${f1(px)}" y1="56" y2="98" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=`<text x="${GX0}" y="28" class="t-big">${dOn?'On dialysis':'CrCl '+Math.round(c)+' mL/min'}</text><text x="${GX1}" y="30" class="t-sm t-end" style="fill:${C.col}">${dOn?'clearance −75%':C.n}</text>`;
    if(dOn){const bx=GX0,by=NR?168:150,w=GX1-GX0;s+=`<text x="${bx}" y="${by}" class="t-xs">COLCHICINE CLEARANCE IN FMF (label study, L/h/kg)</text><rect x="${bx}" y="${by+8}" width="${f1(w*.73/.8)}" height="12" rx="3" style="fill:var(--good)"/><text x="${f1(bx+w*.73/.8-4)}" y="${by+18}" class="t-xs t-end" style="fill:var(--panel)">normal kidneys 0.73</text><rect x="${bx}" y="${by+26}" width="${f1(w*.17/.8)}" height="12" rx="3" style="fill:var(--bad)"/><text x="${f1(bx+w*.17/.8+6)}" y="${by+36}" class="t-xs" style="fill:var(--bad)">dialysis 0.17 (−75%)</text>`}
    else s+=`<text x="${GX0}" y="${NR?178:160}" class="t-xs">Drag the slider or press "On dialysis".</text>`;
    rsv.innerHTML=s;
    $('#cdCrOut').textContent=dOn?'dialysis':Math.round(c);
    $('#cdRenNote').innerHTML=`<div class="kicker">Kidney function</div><h4>${C.n}</h4><p>${REN[C.k]}</p><p>EULAR 2016 advises that in reduced kidney function the toxicity risk is high, so signs of toxicity and CK should be watched closely and the dose reduced; the guideline notes there is no specific GFR cut-off behind that advice. The label contraindicates combining colchicine with P-gp or strong CYP3A4 inhibitors in kidney or liver impairment. In amyloid kidney disease, colchicine helped mainly when creatinine started below 1.5 mg/dL. <sup class="c" data-ref="Ozen2016,Ozen2017,FDA-Colcrys,Livneh1994" title="Source 63,158,199,200">63,158,199,200</sup></p>`;
  }
  function setRen(inst){const c=+cr.value,to=dOn?0:c;if(stopR)stopR();if(ptr==null||inst){ptr=to;drawRen(ptr,c);return}
    const fr=ptr;stopR=animate(380,p=>{ptr=lerp(fr,to,ease(p));drawRen(ptr,c)},()=>{stopR=null})}
  cr.addEventListener('input',()=>{if(dOn){dOn=false;dial.setAttribute('aria-pressed','false')}setRen(true)});
  dial.onclick=()=>{dOn=!dOn;dial.setAttribute('aria-pressed',dOn);setRen()};
  setRen(true);

  /* playWire only registers the exposure chart for the narrow/wide redraw, so
     chain the two widgets that have no player of their own. */
  const prevRedraw=redraws.coldose;
  redraws.coldose=()=>{prevRedraw&&prevRedraw();setAge(+ag.value,true);drawOrg()};
};
/* =============== 3.1 AA amyloidosis =============== */
const AM_STEPS=[
 {from:0,at:.05,k:'Years 0+ · liver',t:'The liver makes SAA',
  txt:`Serum amyloid A (SAA) is an acute-phase protein made mainly by liver cells in response to IL-1, IL-6 and TNF-α. In FMF it soars during attacks and, in some patients, stays raised between them (median 693 mg/L in attacks vs 6 mg/L between them in one cohort). AA amyloid forms when SAA stays high for a long time. <sup class="c" data-ref="Mirioglu2024,Lachmann2006" title="Source 141,177">141,177</sup>`,
  pt:`Inflammation tells the liver to pour out a protein called SAA. If the inflammation never fully stops, SAA stays high for years.`,
  hook:`AA amyloid is made from <b>SAA</b>, an acute-phase reactant driven by IL-1, IL-6 and TNF.`},
 {from:.13,at:.18,k:'Cleavage',t:'SAA is cut down to AA protein',
  txt:`Matrix metalloproteinases cut the 122-amino-acid SAA into a 76-amino-acid AA protein. Variation in exactly where it is cut encourages misfolding. <sup class="c" data-ref="Mirioglu2024" title="Source 177">177</sup>`,
  pt:`Enzymes snip the SAA protein, leaving a shorter piece that folds the wrong way.`,
  hook:`SAA <b>122 aa</b> → AA <b>76 aa</b>, cut by <b>MMPs</b>.`},
 {from:.25,at:.3,k:'Misfolding',t:'AA stacks into cross-β fibrils',
  txt:`The AA pieces misfold and stack into insoluble cross-β-sheet fibrils that resist breakdown. On electron microscopy they are unbranched and 8–12 nm wide. <sup class="c" data-ref="Mirioglu2024" title="Source 177">177</sup>`,
  pt:`The misfolded pieces stack like the rungs of a ladder into long threads the body cannot easily break down.`,
  hook:`Amyloid = <b>cross-β</b> fibrils, unbranched, <b>8–12 nm</b>.`},
 {from:.36,at:.44,k:'Deposition',t:'Fibrils settle in the glomerulus',
  txt:`Fibrils deposit in the kidney's filters and in the spleen, adrenals, liver and gut. Deposits turn over very slowly. The median time from onset of inflammation to diagnosis of AA amyloidosis is about 17 years, but it varies greatly. <sup class="c" data-ref="Ozen2016,Mirioglu2024" title="Source 177,199">177,199</sup>`,
  pt:`The threads build up in the kidney's tiny filters for years before anything shows.`,
  hook:`Median about <b>17 years</b> from onset of inflammation to diagnosis; the kidney is the organ that declares it.`},
 {from:.5,at:.55,k:'Proteinuria',t:'Protein leaks into the urine',
  txt:`Deposits disrupt the filter and the podocytes that seal it, so protein leaks out. Kidney involvement usually shows first as proteinuria, which is why EULAR 2016 advises a urinalysis at every visit. In FMF a kidney biopsy is needed to confirm amyloidosis in a patient with proteinuria. <sup class="c" data-ref="Mirioglu2024,Ozen2016" title="Source 177,199">177,199</sup>`,
  pt:`Protein starts leaking into the urine. A simple urine test can pick this up before the person feels anything.`,
  hook:`First sign: <b>proteinuria</b>. Urinalysis at <b>every</b> visit (EULAR 2016).`},
 {from:.62,at:.68,k:'Nephrotic syndrome',t:'Heavy protein loss',
  txt:`In AA amyloidosis generally, more than 90% have proteinuria or falling kidney function at presentation and over half have nephrotic syndrome. In Zemer's cohort, kidney function declined in all 24 patients who started with nephrotic syndrome or uraemia, while proteinuria stabilized in 68 of 86 without nephrotic syndrome. <sup class="c" data-ref="Mirioglu2024,Zemer1986" title="Source 177,286">177,286</sup>`,
  pt:`So much protein is lost that the legs swell and blood protein falls. Treatment works far better before this stage.`,
  hook:`Nephrotic syndrome at diagnosis predicts decline; earlier detection matters.`},
 {from:.76,at:.92,k:'Kidney failure',t:'Filtering falls',
  txt:`About half of FMF patients with proteinuria eventually need dialysis, and about 10% of AA amyloidosis patients already have kidney failure at presentation. In amyloid nephropathy colchicine helped mainly when creatinine started below 1.5 mg/dL and at doses above 1.5 mg/day. <sup class="c" data-ref="Ozen2016,Mirioglu2024,Livneh1994" title="Source 158,177,199">158,177,199</sup>`,
  pt:`Over years the clogged filters stop working, which can lead to dialysis or a transplant.`,
  hook:`In a Turkish cohort of 587 patients, amyloidosis was the <b>leading cause of death</b> and the only significant predictor of mortality.`}
];
const AM_ORGS=[
 {k:'thyroid',n:'Thyroid',f:'can be involved',w:.3},
 {k:'heart',n:'Heart',f:'rarely',w:.1},
 {k:'liver',n:'Liver',f:'frequent',w:.55},
 {k:'spleen',n:'Spleen',f:'almost always',w:1},
 {k:'adrenal',n:'Adrenals',f:'≥1 in 3; failure uncommon',w:.55},
 {k:'kidney',n:'Kidneys',f:'usual first sign: proteinuria',w:1},
 {k:'gut',n:'Gut',f:'about 30%, mostly diarrhoea',w:.35},
 {k:'testes',n:'Testes',f:'can cause azoospermia',w:.3}
];
const AM_RISK=[
 {n:'Country of residence',s:'Touitou 2007 · 2,482 patients',or:3.2,lo:1.8,hi:5.9},
 {n:'M694V homozygous',s:'Kasifoglu 2014 · amyloidosis',or:6,lo:4.29,hi:8.7,ap:true},
 {n:'M694V homozygous',s:'Vitale 2025 · proteinuria',or:2.27},
 {n:'SAA1 α/α genotype',s:'Cazeneuve 2000 · mainly Armenian cohort',or:6.9,lo:2.5,hi:19},
 {n:'Male sex',s:'Cazeneuve 2000 · 2.37 in another cohort',or:4.0,lo:1.5,hi:10.8},
 {n:'Leucocytosis between flares',s:'Vitale 2025',or:7.47},
 {n:'Raised ESR between flares',s:'Vitale 2025',or:3.6}
];
inits.amyloid=()=>{
  /* ---------- main: years-long cascade ---------- */
  const svg=$('#amSvg'),osv=$('#amOrg'),rg=$('#amT');let mode='high';const TC=.5,NS=400;
  const r=rng(41),A1=[],A2=[],A3=[];for(let i=0;i<=NS;i++){A1.push(r());A2.push(r());A3.push(r())}
  const saa=(i,m)=>{const ctrl=m==='low'&&i/NS>=TC;if(ctrl)return Math.max(2.5+5*A1[i],A2[i]>.97?30+90*A3[i]:0);return Math.max(18+30*A1[i],A2[i]>.9?250+550*A3[i]:0)};
  const Dh=t=>Math.pow(ramp(t,.36,1),1.1);
  const Dep=(t,m)=>m==='high'||t<TC?Dh(t):Dh(TC)*(1-.45*ease(ramp(t,TC,1)));
  const Pf=d=>ramp(d,.1,.5);
  const Pro=(t,m)=>m==='high'||t<TC?Pf(Dh(t)):Pf(Dh(TC))*(1-.25*ramp(t,TC,1));
  const Gfr=(t,m)=>100-92*ramp(m==='high'||t<TC?Dh(t):Dh(TC),.5,1);
  const rd=rng(9),BL=[];for(let i=0;i<70;i++){const a=rd()*Math.PI*2,rr=8+56*Math.sqrt(rd());BL.push({x:586+rr*Math.cos(a),y:146+rr*Math.sin(a),thr:i/70*.95,s:.7+.6*rd()})}
  const LOOPS=[];for(let k=0;k<8;k++){const a=(k*45+10)*Math.PI/180;LOOPS.push({a,x:586+42*Math.cos(a),y:146+42*Math.sin(a)})}
  const REG=[[56,34,144,142],[198,38,258,148],[198,38,258,148],[478,8,236,262],[376,272,334,66],[376,272,334,66],[376,326,334,88]];
  /* narrow: the three scene blocks run down the page and the readouts follow */
  const REG_N=[[94,36,138,142],[16,234,260,152],[16,234,260,152],[158,398,236,262],[32,844,338,66],[32,844,338,66],[32,906,338,88]];
  const WIDE={lcx:128,ldx:40,ltx:70,vw:502,vdx:70,vdw:450,ilx:6,SX:206,MY:0,gdx:0,gdy:0,
    SX0:60,SX1:340,SYB:350,SYH:60,SHY:282,SXT:364,SAT:380,SCL:288,SCB:352,
    MX0:384,MW:316,PMY:290,GMY:342,STY:402,REG:REG};
  const NARR={lcx:160,ldx:72,ltx:102,vw:360,vdx:48,vdw:330,ilx:8,SX:24,MY:196,gdx:-320,gdy:390,
    SX0:40,SX1:330,SYB:800,SYH:90,SHY:700,SXT:816,SAT:832,SCL:706,SCB:802,
    MX0:40,MW:320,PMY:862,GMY:922,STY:986,REG:REG_N};
  function stage(t,m,D,P,G){if(m==='low'&&t>=TC)return'SAA controlled: growth stops, slow regression';if(D<=0)return'Silent: SAA high, no deposits yet';if(P<.03)return'Silent deposits, urine still normal';if(P<.7)return'Proteinuria';if(G>=60)return'Nephrotic syndrome';if(G>=15)return'Nephrotic syndrome, falling GFR';return'Kidney failure'}
  function draw(t){
    /* narrow: biology scene (liver → fibril → glomerulus) stacked down the page,
       then the SAA trace and the two meters full width underneath it. */
    const N=vb(svg,'720 420','400 1008'),L=N?NARR:WIDE;
    const m=mode,D=Dep(t,m),P=Pro(t,m),G=Gfr(t,m),ctl=m==='low'&&t>=TC,act=ctl?.25:1,year=t*20,iN=Math.round(t*NS),p=phaseOf(AM_STEPS,t);
    let s=`<defs>${marker('amA','var(--muted)')}</defs>`;
    const R0=L.REG[p];s+=`<rect x="${R0[0]}" y="${R0[1]}" width="${R0[2]}" height="${R0[3]}" rx="12" style="fill:var(--gold-soft);opacity:.55"/>`;
    /* liver cell */
    const LC=L.lcx;
    s+=`<text x="${L.ltx}" y="52" class="t-sm">LIVER CELL</text>`;
    let hx='';for(let k=0;k<6;k++){const a=k*Math.PI/3;hx+=(k?'L':'M')+f1(LC+58*Math.cos(a))+' '+f1(112+50*Math.sin(a))}
    s+=`<path d="${hx}Z" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><circle cx="${LC-14}" cy="106" r="16" style="fill:var(--nuc);opacity:.75"/>`;
    s+=`<text x="${LC}" y="150" class="t-xs t-mid">makes SAA</text>`;
    [['IL-1',84],['IL-6',112],['TNF-α',140]].forEach(([l,y],k)=>{s+=`<text x="${L.ilx}" y="${y}" class="t-xs" style="fill:var(--terra)">${l}</text>`;for(let j=0;j<2;j++){const ph=(t*60+j*.5+k*.17)%1;s+=`<circle cx="${f1(L.ldx+30*ph)}" cy="${y-3}" r="3.5" style="fill:var(--terra);opacity:${f1(act*(1-ph*.6))}"/>`}});
    for(let j=0;j<5;j++){const ph=(t*30+j*.2)%1;s+=`<circle cx="${f1(LC+18+18*Math.cos(j*1.3+t*20))}" cy="${f1(112+18*Math.sin(j*1.3+t*20))}" r="4" style="fill:var(--gold);opacity:${f1(act*(.4+.6*ph))}"/>`}
    s+=`<rect x="${LC-7}" y="161" width="14" height="36" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1"/>`;
    for(let j=0;j<2;j++){const ph=(t*40+j*.5)%1;s+=`<circle cx="${LC}" cy="${f1(165+28*ph)}" r="3.5" style="fill:var(--gold);opacity:${f1(act)}"/>`}
    /* blood vessel */
    s+=`<rect x="20" y="196" width="${L.vw}" height="22" rx="4" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.2"/><text x="26" y="211" class="t-xs" style="fill:var(--terra)">blood</text>`;
    const nS=ctl?3:14;for(let j=0;j<nS;j++){const ph=(t*25+j/nS)%1;s+=`<circle cx="${f1(L.vdx+L.vdw*ph)}" cy="${f1(207+4*Math.sin(j*2.1+t*40))}" r="3.6" style="fill:var(--gold)"/>`}
    /* molecules */
    const MY=L.MY;
    s+=`<text x="${L.SX}" y="${52+MY}" class="t-sm">SAA → AA → FIBRIL</text>`;
    const c=ramp(t,.13,.22),SX=L.SX,PA=220/122,xc=SX+76*PA;
    s+=`<text x="${SX}" y="${68+MY}" class="t-xs" style="fill:var(--gold)">SAA · 122 amino acids</text>`;
    s+=`<rect x="${SX}" y="${73+MY}" width="${f1(76*PA)}" height="10" rx="3" style="fill:var(--gold);opacity:${f1(1-.5*c)}"/><rect x="${f1(xc+14*c)}" y="${73+MY}" width="${f1(46*PA)}" height="10" rx="3" style="fill:var(--gold);opacity:${f1(1-.6*c)}"/>`;
    if(t>=.13)s+=`<line x1="${f1(xc+7*c)}" x2="${f1(xc+7*c)}" y1="${68+MY}" y2="${88+MY}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:2 2"/><text x="${f1(xc+12)}" y="${98+MY}" class="t-xs">MMP cut at 76</text>`;
    if(c>0)s+=`<text x="${SX}" y="${110+MY}" class="t-xs" style="fill:var(--congo);opacity:${f1(c)}">AA protein · 76 aa</text><rect x="${SX}" y="${f1(lerp(73,114,c)+MY)}" width="${f1(76*PA)}" height="10" rx="3" style="fill:var(--congo);opacity:${f1(c)}"/>`;
    const fo=ramp(t,.25,.34);
    if(fo>0){const gr=m==='high'||t<TC?ramp(t,.34,1):ramp(TC,.34,1)*(1-.3*ramp(t,TC,1)),FL=40*fo+145*gr;
      s+=`<text x="${SX}" y="${142+MY}" class="t-xs" style="fill:var(--congo);opacity:${f1(fo)}">misfolds → cross-β fibril</text>`;
      s+=`<line x1="${SX}" x2="${f1(SX+FL)}" y1="${149+MY}" y2="${149+MY}" style="stroke:var(--congo);opacity:.4"/><line x1="${SX}" x2="${f1(SX+FL)}" y1="${175+MY}" y2="${175+MY}" style="stroke:var(--congo);opacity:.4"/>`;
      let zz='';for(let x=SX+2;x<=SX+FL;x+=7)zz+=`M${f1(x)} ${150+MY}l3 4l-3 4l3 4l-3 4l3 4l-3 4`;
      s+=`<path d="${zz}" style="fill:none;stroke:var(--congo);stroke-width:1.8;opacity:${f1(fo)}"/>`;
      const ex=SX+FL+6;s+=`<path d="M${f1(ex)} ${150+MY}v24M${f1(ex-3)} ${150+MY}h6M${f1(ex-3)} ${174+MY}h6" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(ex+5)}" y="${166+MY}" class="t-xs">8–12 nm</text>`;
      if(!ctl&&fo>=1)for(let j=0;j<3;j++){const ph=(t*35+j/3)%1;s+=`<rect x="${f1(SX+FL+60-50*ph)}" y="${f1(124+j*7+MY)}" width="12" height="3" rx="1.5" style="fill:var(--congo);opacity:${f1(.8*(1-ph))}"/>`}}
    /* glomerulus (one group, moved below the molecules in the narrow layout) */
    s+=`<g transform="translate(${L.gdx} ${L.gdy})">`;
    s+=`<text x="490" y="26" class="t-sm">GLOMERULUS</text><text x="716" y="46" class="t-xs t-end">to urine</text>`;
    s+=`<path d="M672 83 L712 60" style="stroke:var(--memb);stroke-width:12;stroke-linecap:round"/><path d="M672 83 L712 60" style="stroke:var(--field);stroke-width:7;stroke-linecap:round"/>`;
    s+=`<circle cx="590" cy="140" r="100" style="fill:var(--field);stroke:var(--memb);stroke-width:3"/>`;
    s+=`<path d="M505 207 L552 172" style="stroke:var(--terra);stroke-width:16;stroke-linecap:round"/><path d="M505 207 L552 172" style="stroke:var(--terra-soft);stroke-width:12;stroke-linecap:round"/>`;
    s+=`<circle cx="586" cy="146" r="26" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const lr=13*(1-.6*ramp(D,.4,1)),fl=6*(1-.8*P);
    LOOPS.forEach(L=>{s+=`<circle cx="${f1(L.x)}" cy="${f1(L.y)}" r="20" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.6"/><circle cx="${f1(L.x)}" cy="${f1(L.y)}" r="${f1(lr)}" style="fill:var(--terra);opacity:.22"/>`;
      const px=586+67*Math.cos(L.a),py=146+67*Math.sin(L.a),ta=L.a+Math.PI/2;
      for(let q=-1;q<=1;q++){const bx=586+(62)*Math.cos(L.a+q*.16),by=146+62*Math.sin(L.a+q*.16);s+=`<line x1="${f1(bx)}" y1="${f1(by)}" x2="${f1(bx+fl*Math.cos(L.a))}" y2="${f1(by+fl*Math.sin(L.a))}" style="stroke:var(--sea);stroke-width:2;stroke-linecap:round"/>`}
      s+=`<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="7" ry="5" transform="rotate(${f1(ta*180/Math.PI)} ${f1(px)} ${f1(py)})" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.4"/>`});
    BL.forEach(b=>{if(D>b.thr){const rr=(1.5+4.5*clamp((D-b.thr)*5))*b.s;s+=`<circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="${f1(rr)}" style="fill:var(--congo);opacity:.8"/>`}});
    for(let j=0;j<4;j++){const ph=(t*30+j/4)%1;s+=`<circle cx="${f1(lerp(520,580,ph))}" cy="${f1(lerp(200,156,ph))}" r="3" style="fill:var(--gold);opacity:${f1(act*(1-ph))}"/>`}
    const nL=Math.round(P*10);for(let j=0;j<nL;j++){const ph=(t*22+j/nL)%1,q=ph<.6?ph/.6:1,x=ph<.6?lerp(610,672,q):lerp(672,712,(ph-.6)/.4),y=ph<.6?lerp(128,83,q):lerp(83,60,(ph-.6)/.4);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--warn)"/>`}
    s+=`<line x1="562" y1="206" x2="552" y2="252" style="stroke:var(--muted);stroke-width:1"/><text x="552" y="264" class="t-xs t-mid">capillary loop</text>`;
    s+=`<line x1="626" y1="202" x2="650" y2="252" style="stroke:var(--muted);stroke-width:1"/><text x="656" y="264" class="t-xs t-mid">podocyte</text>`;
    s+=`</g>`;
    /* SAA trace */
    const SX0=L.SX0,SX1=L.SX1,ly=v=>L.SYB-L.SYH*clamp(Math.log10(Math.max(1,v))/3),sxi=i=>SX0+(SX1-SX0)*i/NS;
    s+=`<text x="${SX0}" y="${L.SHY}" class="t-sm" style="fill:var(--gold)">SAA in blood (mg/L, log scale)</text>`;
    [1,10,100,1000].forEach(v=>s+=`<text x="${SX0-6}" y="${f1(ly(v)+3)}" class="t-xs t-end">${v}</text><line x1="${SX0}" x2="${SX1}" y1="${f1(ly(v))}" y2="${f1(ly(v))}" class="grid"/>`);
    s+=`<line x1="${SX0}" x2="${SX1}" y1="${f1(ly(10))}" y2="${f1(ly(10))}" style="stroke:var(--good);stroke-width:1.4;stroke-dasharray:4 3"/><text x="${SX1+4}" y="${f1(ly(10)+3)}" class="t-xs" style="fill:var(--good)">&lt;10</text>`;
    [0,5,10,15,20].forEach(y=>s+=`<text x="${f1(SX0+(SX1-SX0)*y/20)}" y="${L.SXT}" class="t-xs t-mid">${y}</text>`);
    s+=`<text x="${SX0}" y="${L.SAT}" class="t-xs">years since inflammation began (schematic)</text>`;
    let sd='';for(let i=0;i<=iN;i++)sd+=(i?'L':'M')+f1(sxi(i))+' '+f1(ly(saa(i,m)));if(iN>0)s+=`<path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:1.3"/>`;
    if(m==='low'){const xt=SX0+(SX1-SX0)*TC;s+=`<line x1="${f1(xt)}" x2="${f1(xt)}" y1="${L.SCL}" y2="${L.SCB}" style="stroke:var(--good);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(xt+4)}" y="${L.SCL+9}" class="t-xs" style="fill:var(--good)">control starts</text>`}
    s+=`<line x1="${f1(sxi(iN))}" x2="${f1(sxi(iN))}" y1="${L.SCL}" y2="${L.SCB}" style="stroke:var(--ink);opacity:.45"/>`;
    /* meters */
    const MX0=L.MX0,MW=L.MW,PY=L.PMY,GY=L.GMY;
    s+=`<text x="${MX0}" y="${PY}" class="t-sm">Proteinuria</text>`;
    [[0,.1,'var(--good-soft)'],[.1,.7,'var(--warn-soft)'],[.7,1,'var(--bad-soft)']].forEach(([a,b,f])=>s+=`<rect x="${f1(MX0+MW*a)}" y="${PY+6}" width="${f1(MW*(b-a))}" height="14" style="fill:${f}"/>`);
    s+=`<rect x="${MX0}" y="${PY+9}" width="${f1(MW*clamp(P))}" height="8" rx="3" style="fill:var(--warn)"/><text x="${MX0+2}" y="${PY+32}" class="t-xs">none</text><text x="${f1(MX0+MW*.12)}" y="${PY+32}" class="t-xs">proteinuria</text><text x="${f1(MX0+MW*.71)}" y="${PY+32}" class="t-xs">nephrotic range</text>`;
    s+=`<text x="${MX0}" y="${GY}" class="t-sm">GFR (kidney filtering)</text><rect x="${MX0}" y="${GY+6}" width="${MW}" height="14" style="fill:var(--panel-2)"/><rect x="${MX0}" y="${GY+6}" width="${f1(MW*.15)}" height="14" style="fill:var(--bad-soft)"/>`;
    s+=`<rect x="${MX0}" y="${GY+9}" width="${f1(MW*G/100)}" height="8" rx="3" style="fill:var(--sea)"/><text x="${MX0+2}" y="${GY+32}" class="t-xs">kidney failure</text><text x="${MX0+MW}" y="${GY+32}" class="t-xs t-end">normal</text>`;
    const stg=stage(t,m,D,P,G);
    s+=`<text x="${MX0}" y="${L.STY}" class="t-lbl" style="fill:${G<15?'var(--bad)':ctl?'var(--good)':'var(--ink)'}">${stg}</text>`;
    svg.innerHTML=s;
    setSt(p);
    $('#amRead').innerHTML=`<span>year <b>${f1(year)}</b></span><span>SAA between attacks <b>${ctl?'&lt;10':'~20–50'} mg/L</b></span><span>deposits <b>${Math.round(D*100)}%</b> of max</span><span>GFR <b>${Math.round(G)}%</b> of normal</span>`;
    let extra='';
    if(m==='low')extra=`<div class="kv"><div><dt>SAA brought below 10 mg/L</dt><dd>${ctl?'From year 10 the supply of SAA is cut. ':'Control begins at year 10 in this mode. '}Lachmann et al. followed 374 people with AA amyloidosis of any cause: deposits regressed in 60% of those whose median SAA stayed below 10 mg/L, and the risk of death was 17.7 times higher in the top SAA octile (≥155 mg/L) than in the bottom one (&lt;4 mg/L). EULAR 2016 sets SAA &lt;10 mg/L as the target in amyloidosis. <sup class="c" data-ref="Lachmann2007,Ozen2016" title="Source 142,199">142,199</sup> Proteinuria usually stabilizes rather than vanishes: in Zemer's cohort it resolved in 5 and stabilized in 68 of 86 patients on colchicine. <sup class="c" data-ref="Zemer1986" title="Source 286">286</sup></dd></div></div>`;
    $('#amNote').innerHTML=noteHTML(AM_STEPS[p])+extra;
    drawOrg(D);
  }
  function drawOrg(D){
    /* narrow: body shifts left, and each organ's frequency drops onto its own
       line under the organ name so the deposit bar still fits beside it. */
    const N=vb(osv,'720 286','400 320');
    const BX=N?-36:0,TX=N?186:250,FX=N?186:336,FY=N?13:0,BAR=N?250:560,BW=N?138:140,LDX=N?180:244,RW=N?34:30;
    let s=`<text x="${TX}" y="${N?14:18}" class="t-sm">WHERE AA AMYLOID GOES</text><text x="${N?390:700}" y="${N?30:18}" class="t-xs t-end">deposit (schematic)</text>`;
    s+=`<g transform="translate(${BX} 0)"><g style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.5"><circle cx="130" cy="40" r="24"/><rect x="120" y="62" width="20" height="12"/><rect x="78" y="72" width="104" height="160" rx="30"/><rect x="52" y="82" width="22" height="142" rx="11"/><rect x="186" y="82" width="22" height="142" rx="11"/><rect x="86" y="226" width="40" height="60" rx="14"/><rect x="134" y="226" width="40" height="60" rx="14"/></g>`;
    const SH={thyroid:[ [130,80,10,5] ],heart:[ [141,112,13,11] ],liver:[ [110,138,24,12] ],spleen:[ [160,138,9,12] ],adrenal:[ [110,157,6,4],[150,157,6,4] ],kidney:[ [110,174,8,13],[150,174,8,13] ],gut:[ [116,200,7,7],[130,198,7,7],[144,200,7,7],[122,214,7,7],[138,214,7,7] ],testes:[ [124,240,5,5],[136,240,5,5] ]};
    AM_ORGS.forEach((o,i)=>{const sh=SH[o.k];
      sh.forEach(([x,y,rx,ryy])=>s+=`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ryy}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.1"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ryy}" style="fill:var(--congo);opacity:${f1(.9*clamp(D*o.w))}"/>`)});
    s+=`</g>`;
    AM_ORGS.forEach((o,i)=>{const lv=clamp(D*o.w),ry=(N?52:40)+i*RW,sh=SH[o.k];
      const [x0,y0,rx0]=sh[sh.length-1];
      s+=`<line x1="${x0+rx0+1+BX}" y1="${y0}" x2="${LDX}" y2="${ry-4}" style="stroke:var(--muted);stroke-width:.8;opacity:.55"/>`;
      s+=`<text x="${TX}" y="${ry}" class="t-lbl">${o.n}</text><text x="${FX}" y="${ry+FY}" class="t-sm">${o.f}</text>`;
      s+=`<rect x="${BAR}" y="${ry-10}" width="${BW}" height="9" rx="4" style="fill:var(--panel-2)"/><rect x="${BAR}" y="${ry-10}" width="${f1(BW*lv)}" height="9" rx="4" style="fill:var(--congo)"/>`});
    osv.innerHTML=s;
  }
  const stop=playWire(rg,$('#amPlay'),draw,24000,'Replay','amyloid');
  const setSt=stepWire($('#amSteps'),AM_STEPS,rg,draw,stop);
  $$('[data-am]').forEach(b=>b.onclick=()=>{mode=b.dataset.am;$$('[data-am]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* ---------- Congo red microscope ---------- */
  const ms=$('#amMic'),mr=$('#amMT');let samp='kidney';
  const MCX=190,MCY=180,MR=156;
  const rk=rng(5),KN=[],KD=[],KT=[];
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2+.3;KT.push([MCX+128*Math.cos(a),MCY+128*Math.sin(a),24+6*rk()])}
  for(let i=0;i<70;i++){const a=rk()*Math.PI*2,rr=MR*Math.sqrt(rk());KN.push([MCX+rr*Math.cos(a),MCY+rr*Math.sin(a),rk()*180])}
  for(let i=0;i<34;i++){const a=rk()*Math.PI*2,rr=10+70*Math.sqrt(rk());KD.push([MCX-4+rr*Math.cos(a),MCY-4+rr*Math.sin(a),5+7*rk()])}
  const rf=rng(11),FC=[],FD=[];
  for(let gy=0;gy<6;gy++)for(let gx=0;gx<6;gx++)FC.push([MCX-150+gx*60+(gy%2)*30+rf()*10,MCY-150+gy*58+rf()*10,27+rf()*5]);
  [[150,120],[245,215],[120,250]].forEach(([x,y])=>FD.push(['v',x,y]));
  for(let i=0;i<8;i++){const c=FC[Math.floor(rf()*FC.length)];FD.push(['a',c[0],c[1],c[2],rf()*6])}
  function drawM(t){
    /* narrow: the section keeps its size at the top and the polarizer diagram,
       its readouts and its key move underneath it. */
    const N=vb(ms,'720 360','400 620');
    const PX=N?34:394,PY=N?400:110;
    const ang=90*t,k=Math.pow(Math.sin(ang*Math.PI/180),2),b=1-k;let s='';
    const DX=N?10:0;/* re-centre the precomputed section in the 400-wide stage */
    s+=`<defs><clipPath id="amClip"><circle cx="${MCX+DX}" cy="${MCY}" r="${MR}"/></clipPath></defs><g clip-path="url(#amClip)"><g transform="translate(${DX} 0)">`;
    s+=`<rect x="${MCX-MR}" y="${MCY-MR}" width="${2*MR}" height="${2*MR}" style="fill:var(--am-light)"/>`;
    let tis='',dep='';
    if(samp==='kidney'){
      tis+=`<rect x="${MCX-MR}" y="${MCY-MR}" width="${2*MR}" height="${2*MR}" style="fill:var(--am-tissue);opacity:.55"/>`;
      KT.forEach(([x,y,r])=>tis+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--am-tissue);stroke:var(--am-septa);stroke-width:5"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.35)}" style="fill:var(--am-light)"/>`);
      tis+=`<circle cx="${MCX}" cy="${MCY}" r="96" style="fill:var(--am-light);stroke:var(--am-septa);stroke-width:3"/><circle cx="${MCX-4}" cy="${MCY-4}" r="82" style="fill:var(--am-tissue)"/>`;
      for(let i=0;i<7;i++){const a=i/7*Math.PI*2;tis+=`<circle cx="${f1(MCX-4+48*Math.cos(a))}" cy="${f1(MCY-4+48*Math.sin(a))}" r="20" style="fill:var(--am-light);stroke:var(--am-septa);stroke-width:2"/>`}
      KN.forEach(([x,y,a])=>tis+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="4.5" ry="3" transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})" style="fill:var(--am-hema)"/>`);
      KD.forEach(([x,y,r],i)=>dep+=`<path d="M${f1(x-r)} ${f1(y)} q${f1(r*.4)} ${f1(-r)} ${f1(r)} ${f1(-r*.7)} t${f1(r)} ${f1(r*.5)} q${f1(-r*.2)} ${f1(r)} ${f1(-r)} ${f1(r*.9)} t${f1(-r)} ${f1(-r*.7)}z"/>`);
    }else{
      tis+=`<rect x="${MCX-MR}" y="${MCY-MR}" width="${2*MR}" height="${2*MR}" style="fill:var(--am-septa);opacity:.5"/>`;
      FC.forEach(([x,y,r])=>tis+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--am-light);stroke:var(--am-septa);stroke-width:2.5"/>`);
      for(let i=0;i<24;i++){const c=FC[(i*7)%FC.length];tis+=`<ellipse cx="${f1(c[0]+c[2]*.95)}" cy="${f1(c[1]+3)}" rx="3.5" ry="2" style="fill:var(--am-hema)"/>`}
      FD.forEach(d=>{if(d[0]==='v')dep+=`<circle cx="${f1(d[1])}" cy="${f1(d[2])}" r="11" style="fill:none;stroke-width:7"/>`;else{const [_,x,y,r,a0]=d;dep+=`<path d="M${f1(x+r*Math.cos(a0))} ${f1(y+r*Math.sin(a0))} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x+r*Math.cos(a0+1.1))} ${f1(y+r*Math.sin(a0+1.1))}" style="fill:none;stroke-width:6;stroke-linecap:round"/>`}});
    }
    s+=`<g style="opacity:${f1(.15+.85*b)}">${tis}</g>`;
    s+=`<rect x="${MCX-MR}" y="${MCY-MR}" width="${2*MR}" height="${2*MR}" style="fill:var(--am-black);opacity:${(k*.96).toFixed(2)}"/>`;
    s+=`<g style="fill:var(--am-salmon);stroke:var(--am-salmon);opacity:${f1(b)}">${dep}</g>`;
    s+=`<g style="fill:var(--am-green);stroke:var(--am-green);opacity:${f1(k)}">${dep}</g>`;
    s+=`</g></g><circle cx="${MCX+DX}" cy="${MCY}" r="${MR+3}" style="fill:none;stroke:var(--muted);stroke-width:6"/>`;
    s+=`<text x="${MCX+DX}" y="352" class="t-xs t-mid">${samp==='kidney'?'kidney biopsy · Congo red':'abdominal fat aspirate · Congo red'}</text>`;
    /* polarizer schematic */
    s+=`<defs>${marker('amL','var(--gold)')}</defs><line x1="${PX}" y1="${PY}" x2="${PX+314}" y2="${PY}" style="stroke:var(--gold);stroke-width:2;opacity:.6" marker-end="url(#amL)"/><circle cx="${PX+10}" cy="${PY}" r="9" style="fill:var(--gold)"/>`;
    const disc=(cx,rot,lbl)=>{let d=`<circle cx="${cx}" cy="${PY}" r="34" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/><g transform="rotate(${f1(rot)} ${cx} ${PY})">`;for(let yy=-24;yy<=24;yy+=8){const hw=Math.sqrt(34*34-yy*yy)-3;d+=`<line x1="${f1(cx-hw)}" x2="${f1(cx+hw)}" y1="${PY+yy}" y2="${PY+yy}" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/>`}return d+`</g><text x="${cx}" y="${PY+56}" class="t-xs t-mid">${lbl}</text>`};
    s+=disc(PX+76,0,'polarizer');s+=`<rect x="${PX+159}" y="${PY-30}" width="14" height="60" rx="2" style="fill:var(--am-salmon);opacity:.8"/><text x="${PX+166}" y="${PY+56}" class="t-xs t-mid">section</text>`;s+=disc(PX+252,ang,'analyzer');
    s+=`<text x="${PX}" y="${PY+96}" class="t-big">Angle between polarizers: ${Math.round(ang)}°</text>`;
    s+=`<text x="${PX}" y="${PY+120}" class="t-sm">background: ${k<.12?'bright':k<.85?'dimming':'dark (light blocked)'}</text>`;
    s+=`<text x="${PX}" y="${PY+140}" class="t-sm">amyloid: ${k<.12?'salmon-pink':k<.85?'turning green':'apple-green birefringence'}</text>`;
    s+=`<rect x="${PX}" y="${PY+162}" width="26" height="18" rx="3" style="fill:var(--am-salmon)"/><text x="${PX+34}" y="${PY+175}" class="t-xs">bright field: salmon-pink deposits</text>`;
    s+=`<rect x="${PX}" y="${PY+190}" width="26" height="18" rx="3" style="fill:var(--am-black)"/><rect x="${PX+7}" y="${PY+194}" width="12" height="10" rx="2" style="fill:var(--am-green)"/><text x="${PX+34}" y="${PY+203}" class="t-xs">crossed: apple-green on black</text>`;
    ms.innerHTML=s;
    $('#amMicNote').innerHTML=`<div class="kicker">${k<.12?'Bright field':k<.85?'Polarizers crossing':'Crossed polarizers'}</div><h4>${k<.85?'Congo red stains amyloid salmon-pink':'Apple-green birefringence'}</h4><p>Amyloid is identified by Congo red staining, which gives apple-green birefringence under polarized light. Ordered fibrils bend polarized light; ordinary tissue does not, so it goes dark as the polarizers cross. Immunohistochemistry with an anti-SAA antibody confirms the AA type, and electron microscopy shows unbranched fibrils 8–12 nm wide. <sup class="c" data-ref="Mirioglu2024" title="Source 177">177</sup></p><dl class="kv">${samp==='kidney'?`<div><dt>Kidney biopsy</dt><dd>The usual definitive test, and needed to confirm amyloidosis in an FMF patient with proteinuria. Rectal biopsy has long been used in FMF too. <sup class="c" data-ref="Mirioglu2024,Ozen2016,Melikoglu2000" title="Source 171,177,199">171,177,199</sup></dd></div>`:`<div><dt>Abdominal fat aspirate</dt><dd>A less invasive option: fat aspirate and salivary gland biopsy have reported sensitivities of 77–89%. In one study (120 patients, 38 with AA), sensitivity was 80% on routine reading and 93% when three smears were examined thoroughly, with 100% specificity in controls. SAP scintigraphy is up to 90% sensitive but not widely available. Those figures come from mixed amyloidosis series; one FMF-specific review describes the fat-aspirate yield in FMF as not high, and gives renal biopsy about 88% and rectal biopsy about 75%. <sup class="c" data-ref="Mirioglu2024,vanGameren2006,Sari2014" title="Source 177,231,268">177,231,268</sup></dd></div>`}</dl><div class="hook"><b>Exam hook</b>Congo red → <b>salmon-pink</b> in bright field → <b>apple-green birefringence</b> under crossed polarizers.</div>`;
  }
  const stopM=playWire(mr,$('#amMPlay'),drawM,6000,'Replay','amyloid');
  $$('[data-amx]').forEach(b=>b.onclick=()=>{samp=b.dataset.amx;$$('[data-amx]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawM(+mr.value)});
  drawM(+mr.value);

  /* ---------- risk factors ---------- */
  const rs=$('#amRisk');let ci=true,rp=1,stopRk=null;
  let LX0=300,LX1=690;const lx=v=>LX0+(LX1-LX0)*Math.log(v)/Math.log(20);
  function drawR(p){rp=p;
    /* narrow: each factor's name and source sit on their own lines above a
       full-width bar, so long names never have to be clipped. */
    const N=vb(rs,'720 346','400 536');
    LX0=N?16:300;LX1=N?384:690;
    const TXX=N?16:10;
    let s=`<text x="${TXX}" y="18" class="t-sm">RISK FACTORS FOR AMYLOIDOSIS IN FMF</text>`;
    s+=N?`<text x="${TXX}" y="32" class="t-xs" style="fill:var(--muted)">separate studies · not comparable with each other</text>`
        :`<text x="${LX1}" y="18" class="t-xs t-end" style="fill:var(--muted)">separate studies · not comparable with each other</text>`;
    if(!N)[1,2,5,10,20].forEach(v=>s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="30" y2="310" class="${v===1?'axis':'grid'}"/>`);
    [1,2,5,10,20].forEach(v=>s+=`<text x="${f1(lx(v))}" y="${N?506:326}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${LX1}" y="${N?522:342}" class="t-xs t-end">odds ratio, log scale (1 = no difference)</text>`;
    AM_RISK.forEach((R,i)=>{const y=(N?52:52)+i*(N?64:40),q=ease(clamp(p*1.7-i*.11)),xe=LX0+(lx(R.or)-LX0)*q,by=N?y+20:y-10;
      s+=`<text x="${TXX}" y="${y}" class="t-lbl">${R.n}</text><text x="${TXX}" y="${y+14}" class="t-xs">${R.s}</text>`;
      if(N)[1,2,5,10,20].forEach(v=>s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="${by-4}" y2="${by+22}" class="${v===1?'axis':'grid'}"/>`);
      s+=`<rect x="${LX0}" y="${by}" width="${f1(Math.max(0,xe-LX0))}" height="18" rx="3" style="fill:var(--terra);opacity:.85"/>`;
      if(q>.6)s+=`<text x="${f1(xe-5)}" y="${by+13}" class="t-xs t-end" style="fill:var(--panel);font-weight:700;opacity:${f1(ramp(q,.6,1))}">${R.ap?'≈':''}${R.or}</text>`;
      if(ci&&R.lo)s+=`<path d="M${f1(lx(R.lo))} ${by+23}H${f1(lx(R.hi))}M${f1(lx(R.lo))} ${by+19}v8M${f1(lx(R.hi))} ${by+19}v8" style="stroke:var(--ink);stroke-width:1.5;opacity:${f1(q)}"/>`});
    rs.innerHTML=s}
  function runR(){if(stopRk)stopRk();stopRk=animate(1600,drawR,()=>{stopRk=null})}
  $('#amRPlay').onclick=runR;
  $('#amCI').onclick=()=>{ci=!ci;$('#amCI').setAttribute('aria-pressed',ci);drawR(rp)};
  drawR(0);
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();runR()}},{threshold:.35});io.observe(rs)}else drawR(1);
  onHide.amyloid=(prev=>()=>{prev&&prev();if(stopRk){stopRk();stopRk=null;drawR(1)}})(onHide.amyloid);

  /* ---------- prevalence over time ---------- */
  const ps=$('#amPrev'),pr=$('#amPT');
  /* the last three numbers of each row are the narrow label x, y and anchor */
  const PTS=[[1967,26.6,'26.6% · Sohar 1967, Israel',140,62,'',112,80,''],[2005,12.9,'12.9% · Turkey 2005',462,166,'t-end',250,196,'t-end'],[2007,11.4,'11.4% · MetaFMF 2007',480,200,'t-end',262,234,'t-end'],[2014,8.6,'8.6% · Turkey 2014',548,224,'t-mid',307,286,'t-mid'],[2025,10.2,'10.2% · AIDA 2025',644,178,'t-mid',384,196,'t-end']];
  let PX0=70,PX1=690,PY0=270,PH=230;
  const px=y=>PX0+(PX1-PX0)*(y-1960)/70,py=v=>PY0-PH*v/30;
  function drawP(t){
    /* narrow: full-width plot with fewer year ticks, the caption wrapped onto
       three lines, and the Zemer panel moved below the chart. */
    const N=vb(ps,'720 320','400 528');
    PX0=N?46:70;PX1=N?384:690;PY0=N?330:270;PH=N?270:230;
    const ZX=N?16:410,ZY=N?404:34,ZW=N?368:290,ZTX=ZX+10;
    const Y=1960+70*t;let s=`<text x="${PX0}" y="${N?22:24}" class="t-sm">AMYLOIDOSIS IN FMF COHORTS (% of patients)</text>`;
    s+=N?`<text x="${PX0}" y="368" class="t-xs" style="fill:var(--muted)">Separate cohorts, countries, ages and</text><text x="${PX0}" y="380" class="t-xs" style="fill:var(--muted)">definitions: not one population</text><text x="${PX0}" y="392" class="t-xs" style="fill:var(--muted)">followed over time.</text>`
        :`<text x="70" y="308" class="t-xs" style="fill:var(--muted)">Separate cohorts, countries, ages and definitions: not one population followed over time.</text>`;
    [0,10,20,30].forEach(v=>s+=`<line x1="${PX0}" x2="${PX1}" y1="${f1(py(v))}" y2="${f1(py(v))}" class="grid"/><text x="${PX0-8}" y="${f1(py(v)+3)}" class="t-xs t-end">${v}%</text>`);
    for(let y=1960;y<=2030;y+=(N?20:10))s+=`<text x="${f1(px(y))}" y="${PY0+18}" class="t-xs t-mid">${y}</text>`;
    s+=`<line x1="${f1(px(1972))}" x2="${f1(px(1972))}" y1="${N?60:40}" y2="${PY0}" style="stroke:var(--crocus);stroke-width:1.5;stroke-dasharray:4 4;opacity:${f1(ramp(Y,1972,1974))}"/><text x="${f1(px(1972)+4)}" y="${PY0-8}" class="t-xs" style="fill:var(--crocus);opacity:${f1(ramp(Y,1972,1974))}">colchicine (1972)</text>`;
    let d='';PTS.forEach((P,i)=>{if(i===0){d='M'+f1(px(P[0]))+' '+f1(py(P[1]));return}const Q=PTS[i-1];if(Y<=Q[0])return;const u=clamp((Y-Q[0])/(P[0]-Q[0]));d+='L'+f1(lerp(px(Q[0]),px(P[0]),u))+' '+f1(lerp(py(Q[1]),py(P[1]),u))});
    if(Y>1967)s+=`<path d="${d}" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-dasharray:6 4"/>`;
    PTS.forEach(([yr,v,l,lxx,lyy,an,nx,ny,nan])=>{const g=ramp(Y,yr,yr+3);if(g<=0)return;s+=`<circle cx="${f1(px(yr))}" cy="${f1(py(v))}" r="${f1(6*g)}" style="fill:var(--terra);stroke:var(--panel);stroke-width:2"/><text x="${N?nx:lxx}" y="${N?ny:lyy}" class="t-sm ${N?nan:an}" style="opacity:${f1(g)}">${l}</text>`});
    const gc=ramp(Y,2022,2025);if(gc>0)s+=`<rect x="${f1(px(2022)-6*gc)}" y="${f1(py(.3)-6*gc)}" width="${f1(12*gc)}" height="${f1(12*gc)}" style="fill:var(--sea);stroke:var(--panel);stroke-width:2"/><text x="${f1(px(2022)-10)}" y="${f1(py(.3)-(N?24:8))}" class="t-sm t-end" style="fill:var(--sea);opacity:${f1(gc)}">0.3% · children, 2022</text>`;
    const gz=ramp(Y,1986,1992);
    if(gz>0){s+=`<g style="opacity:${f1(ramp(Y,1986,1988))}"><rect x="${ZX}" y="${ZY}" width="${ZW}" height="${N?110:114}" rx="8" style="fill:var(--panel-2)"/><text x="${ZTX}" y="${ZY+18}" class="t-xs">ZEMER 1986 · CUMULATIVE PROTEINURIA</text>`;
      s+=`<text x="${ZTX}" y="${ZY+40}" class="t-xs">regular colchicine (11 y)</text><rect x="${ZTX}" y="${ZY+46}" width="${f1(1.7*5.2*gz)}" height="12" rx="3" style="fill:var(--crocus)"/><text x="${f1(ZTX+6+1.7*5.2*gz)}" y="${ZY+56}" class="t-xs" style="fill:var(--crocus)">1.7%</text>`;
      s+=`<text x="${ZTX}" y="${ZY+78}" class="t-xs">not taking it regularly (9 y)</text><rect x="${ZTX}" y="${ZY+84}" width="${f1(48.9*5.2*gz)}" height="12" rx="3" style="fill:var(--bad)"/>${gz>.5?`<text x="${f1(ZTX-4+48.9*5.2*gz)}" y="${ZY+94}" class="t-xs t-end" style="fill:var(--panel);font-weight:700">48.9%</text>`:''}</g>`}
    s+=`<line x1="${f1(px(Y))}" x2="${f1(px(Y))}" y1="${N?56:34}" y2="${PY0+2}" style="stroke:var(--ink);opacity:.3"/>`;
    ps.innerHTML=s}
  playWire(pr,$('#amPPlay'),drawP,12000,'Replay','amyloid');drawP(+pr.value);
  /* only the last playWire with this id registers for the narrow/wide redraw,
     so chain the other three drawings onto it. */
  const prevRedraw=redraws.amyloid;
  redraws.amyloid=()=>{prevRedraw&&prevRedraw();stop();stopM();draw(+rg.value);drawM(+mr.value);drawR(rp)};
  $('#amPCap').innerHTML=`Different cohorts, countries, ages and definitions: the dashed line links separate studies rather than tracing one population. Sohar 1967 (470 patients), Turkish FMF Study Group 2005 (2,838), MetaFMF 2007 (2,482), Turkish 15-centre study 2014 (2,246), AIDA registry 2025; children: 11 of 3,454 in the largest paediatric cohort. Before colchicine, one review puts amyloidosis at 60–75% of patients over 40, and EULAR 2016 reports that colchicine cut the risk in Turkey from 60% to under 13%. <sup class="c" data-ref="Sohar1967,GulBenChetrit2025,TurkishFMF2005,Touitou2007,Kasifoglu2014,Vitale2025,Ozturk2022,Zemer1986,Sari2014,Ozen2016" title="Source 89,121,199,205,231,244,262,264,273,286">89,121,199,205,231,244,262,264,273,286</sup>`;
};
/* =============== 3.2 diagnosis & criteria =============== */
const DX_GT={
 conf:`<b>Confirmatory genotype:</b> pathogenic or likely pathogenic <i>MEFV</i> variants on both copies, either the same variant twice (homozygous) or two different ones in trans (compound heterozygous). Rule: at least <b>1</b> of the 4 clinical items. <sup class="c" data-ref="Gattorno2019,Lancieri2023" title="Source 75,145">75,145</sup>`,
 non:`<b>Non-confirmatory genotype:</b> one pathogenic variant plus one variant of uncertain significance (VUS) in trans, two VUS, or a single heterozygous pathogenic variant. Rule: at least <b>2</b> of the 4 clinical items. <sup class="c" data-ref="Gattorno2019,Lancieri2023" title="Source 75,145">75,145</sup>`,
 none:`<b>None or not tested:</b> only the clinical-only arm applies (at least 6 of 9). Benign and likely-benign variants never count, and variant classes are meant to follow INSAID/Infevers. <sup class="c" data-ref="Gattorno2019,VanGijn2018" title="Source 75,269">75,269</sup>`
};
const DX_EX={
 typ:{pre:[1,1],gt:'conf',ci:['ep','abd','chest','eth'],ab:[]},
 het:{pre:[1,1],gt:'non',ci:['ep','abd'],ab:['aph']},
 pfapa:{pre:[1,1],gt:'none',ci:[],ab:['aph','ln']},
 clr:{pre:[0,0],gt:'none',ci:[],ab:[]}
};
function dxBars(rows){
  return rows.map(r=>`<div class="dx-pr"><span class="lbl">${r.l}</span><div class="dx-bars">
    ${r.s!=null?`<span>sens</span><i><b style="width:${(r.s*100).toFixed(1)}%;background:var(--terra)"></b></i><span>${r.st||Math.round(r.s*1000)/10+'%'}</span>`:''}
    ${r.p!=null?`<span>spec</span><i><b style="width:${(r.p*100).toFixed(1)}%;background:var(--sea)"></b></i><span>${r.pt||Math.round(r.p*1000)/10+'%'}</span>`:''}</div></div>`).join('');
}
const DX_CRIT={
 th:{name:'Tel Hashomer',
  groups:[{k:'M',lg:'Major criteria',cls:'',items:['Recurrent febrile episodes with peritonitis, synovitis or pleuritis','AA amyloidosis without a predisposing disease','Favourable response to continuous colchicine']},
          {k:'m',lg:'Minor criteria',cls:'mn',items:['Recurrent febrile episodes','Erysipelas-like erythema','FMF in a first-degree relative']}],
  def:`Drawn from the 1967 Tel Hashomer survey and later summaries. Definite FMF needs <b>2 major</b>, or <b>1 major + 2 minor</b>. <sup class="c" data-ref="Sohar1967,Pras1998,Lancieri2023" title="Source 145,215,244">145,215,244</sup>`,
  judge(c){const M=c.M,m=c.m;if(M>=2||(M>=1&&m>=2))return['yes','Definite FMF by Tel Hashomer',`${M} major + ${m} minor.`];
    if(M>=1&&m>=1)return['na','"Probable" FMF at most',`${M} major + ${m} minor. A "probable" tier for 1 major + 1 minor appears in secondary sources only, not verified in the primary text.`];
    return['no','Tel Hashomer criteria not met',`${M} major + ${m} minor.`]},
  perf:[{l:'Turkish children (Yalçınkaya 2009)',s:.988,p:.546},{l:'Eurofever children with other periodic fevers (Demirkaya 2016)',s:.45,p:.972}],
  pcite:`<sup class="c" data-ref="Yalcinkaya2009,Demirkaya2016" title="Source 49,276">49,276</sup> The Eurofever figures are the ones in the published paper; an earlier conference report of the same registry gave a lower sensitivity for Tel Hashomer.`},
 liv:{name:'Livneh 1997',
  groups:[{k:'M',lg:'Major criteria (typical attacks)',cls:'',items:['Generalized peritonitis','Unilateral pleuritis or pericarditis','Monoarthritis (hip, knee or ankle)','Fever alone']},
          {k:'m',lg:'Minor criteria',cls:'mn',items:['Incomplete attack involving the chest','Incomplete attack involving a joint','Exertional leg pain','Favourable response to colchicine']},
          {k:'s',lg:'Supportive criteria',cls:'sp',items:['Family history of FMF','Appropriate ethnic origin','Age under 20 at onset','Severe attacks needing bed rest','Spontaneous remission','Symptom-free intervals','Transient inflammatory response (WBC, ESR, SAA or fibrinogen)','Episodic proteinuria or haematuria','Unproductive laparotomy or a "white" appendix removed','Parental consanguinity']}],
  def:`A <b>typical attack</b> is recurrent (at least 3 of the same type), febrile (rectal ≥38 °C) and short (12 h to 3 days). An <b>incomplete attack</b> differs in one or two ways: under 38 °C, a length outside 12 h to 3 days but not under 6 h and not over a week, no peritoneal signs, localized abdominal pain, or arthritis in other joints. <sup class="c" data-ref="Livneh1997,Lancieri2023,Sonmez2016" title="Source 145,159,245">145,159,245</sup>`,
  judge(c,o){const M=c.M,m=c.m,s=c.s;let ok=M>=1||m>=2,how=M>=1?'at least 1 major':m>=2?'at least 2 minor':'';
    if(!ok&&o.rule==='cons'&&m>=1&&s>=5){ok=true;how='1 minor + at least 5 supportive'}
    const set=o.rule==='cons'?'conservative set':'simple set';
    return ok?['yes','FMF by Livneh criteria',`${set}: ${how}. Counted ${M} major, ${m} minor, ${s} supportive.`]:['no','Livneh criteria not met',`${set}: needs ≥1 major or ≥2 minor${o.rule==='cons'?', or 1 minor + ≥5 supportive':''}. Counted ${M} major, ${m} minor, ${s} supportive.`]},
  perf:[{l:'Original study: 105 patients vs 106 controls (Livneh 1997)',s:.95,st:'>95%',p:.97,pt:'>97%'},{l:'Eurofever children with other periodic fevers (Demirkaya 2016), specificity only',p:.411}],
  pcite:`<sup class="c" data-ref="Livneh1997,Demirkaya2016" title="Source 49,159">49,159</sup>`},
 yo:{name:'Yalçınkaya–Özen',
  groups:[{k:'M',lg:'Paediatric criteria (the first four each 6–72 h, at least 3 attacks)',cls:'',items:['Fever: axillary temperature above 38 °C','Abdominal pain','Chest pain','Oligoarthritis','Family history of FMF']}],
  def:`Built for children in 2009 from 170 children with two variants and 141 controls. <b>Two or more</b> of the five criteria classify as FMF. The 2009 paper describes five items; some later reviews print a six-item version that adds exertional leg pain. <sup class="c" data-ref="Yalcinkaya2009,Lancieri2023" title="Source 145,276">145,276</sup>`,
  judge(c){const n=c.M;return n>=2?['yes','FMF by the paediatric criteria',`${n} of 5 criteria (needs 2). With 3 or more, specificity rises and sensitivity falls (Kondi 2010).`]:['no','Paediatric criteria not met',`${n} of 5 criteria (needs 2).`]},
  perf:[{l:'Derivation, ≥2 criteria (Yalçınkaya 2009)',s:.865,p:.936},{l:'French mixed cohort, ≥2 criteria (Kondi 2010)',s:1,p:.5},{l:'French mixed cohort, ≥3 criteria (Kondi 2010)',s:.77,p:.95},{l:'Eurofever registry (Demirkaya 2016)',s:.874,p:.407}],
  pcite:`<sup class="c" data-ref="Yalcinkaya2009,Kondi2010,Demirkaya2016" title="Source 49,134,276">49,134,276</sup>`}
};
const DX_LAB=[
 {from:0,at:.04,k:'Days −3 to 0',t:'Between attacks',
  txt:`Measured every two weeks over 5 months, median SAA between attacks was 6 mg/L and median CRP 4 mg/L. Many people look well and test close to normal. <sup class="c" data-ref="Lachmann2006" title="Source 141">141</sup>`,
  pt:'Between attacks, blood tests in many people are close to normal.'},
 {from:.095,at:.112,k:'Day 0',t:'The attack begins',
  txt:`IL-1β from activated white cells drives the liver to make CRP and SAA. The white count rises (mainly neutrophils), and ESR, fibrinogen and complement go up. <sup class="c" data-ref="Livneh1997,SoonLaxer2017,ARUP2023" title="Source 6,159,247">6,159,247</sup>`,
  pt:'When an attack starts, the body\'s alarm signals switch on and inflammation markers climb within hours.'},
 {from:.135,at:.15,k:'Days 1–2',t:'Peak of the acute-phase response',
  txt:`During attacks the medians were SAA 693 mg/L and CRP 115 mg/L. In Korkmaz 2002, CRP was the only acute-phase protein raised in every attack, while platelets, ferritin and albumin did not change. <sup class="c" data-ref="Lachmann2006,Korkmaz2002" title="Source 136,141">136,141</sup>`,
  pt:'In the middle of an attack, SAA and CRP can be a hundred times higher than usual.',
  hook:`Flat <b>ferritin and platelets</b> during a febrile attack fit FMF. A very high ferritin points toward Still\'s disease or infection. <sup class="c" data-ref="Korkmaz2002,Yamaguchi1992" title="Source 136,277">136,277</sup>`},
 {from:.2,at:.27,k:'Days 3–10',t:'The attack settles',
  txt:`The attack ends by itself and the markers fall back. Livneh\'s supportive criteria call this a "transient" inflammatory response. The exact speed of the fall varies; the curves here are schematic. <sup class="c" data-ref="Livneh1997" title="Source 159">159</sup>`,
  pt:'As the attack fades, the markers drop back down on their own.'},
 {from:.42,at:.75,k:'Weeks 2–4',t:'Check again when well',
  txt:`About a third of patients had raised SAA between attacks (Berkun 2007), and about two thirds had some ongoing acute-phase response (Korkmaz 2002). Persistent SAA was linked to M694V homozygosity, proteinuria and missed colchicine. Persistently high SAA or CRP suggests undertreatment and raises amyloidosis risk. <sup class="c" data-ref="Berkun2007,Korkmaz2002,Ozen2016" title="Source 21,136,199">21,136,199</sup>`,
  pt:'A blood test on a good day matters too. Hidden, ongoing inflammation is what slowly damages the kidneys.',
  hook:`EULAR 2016 advises checking acute-phase markers <b>between</b> attacks as well as during them, since persistent elevation, not the attacks themselves, is what feeds AA amyloidosis. <sup class="c" data-ref="Ozen2016,Berkun2007" title="Source 21,199">21,199</sup>`}
];
const DX_PL=[.02,.18,.34,.5,.66,.82];
const DX_PATH=[
 {from:DX_PL[0],at:.1,k:'Step 1',t:'Recurrent, self-limited fever + serositis',
  txt:`A typical attack is recurrent (at least 3 of the same type), febrile (≥38 °C) and short (12 h to 3 days), with peritonitis, pleuritis or arthritis, and the person is well between attacks. <sup class="c" data-ref="Lancieri2023,Livneh1997" title="Source 145,159">145,159</sup>`,
  pt:'The story comes first: short, repeated bouts of fever and pain that stop on their own.'},
 {from:DX_PL[1],at:.26,k:'Step 2',t:'Exclude the mimics',
  txt:`Infection, other periodic fevers and a true surgical abdomen come first. FMF peritonitis can mimic an acute abdomen, with rebound, rigidity and air-fluid levels. In 182 FMF patients, 40% had had an appendectomy (12–25% in the general population) and 80% of the removed appendices were not inflamed (about 20% generally). M694V homozygosity and severe disease were risk factors. <sup class="c" data-ref="Lancieri2023,Lidar2008" title="Source 145,150">145,150</sup>`,
  pt:'An FMF belly attack can look exactly like appendicitis, and many people with FMF have had an operation they did not need.',
  hook:`In FMF, a shift from <b>diffuse</b> pain to <b>right-lower-quadrant</b> pain was the best predictor of a truly inflamed appendix. <sup class="c" data-ref="Lidar2008" title="Source 150">150</sup>`},
 {from:DX_PL[2],at:.42,k:'Step 3',t:'Acute-phase reactants, twice',
  txt:`CRP, SAA, ESR and the white count are checked in an attack and again when well. High during the attack and normal or near-normal afterwards supports FMF. Raised markers in flares are a prerequisite in the Eurofever/PRINTO criteria. <sup class="c" data-ref="Korkmaz2002,Gattorno2019,Livneh1997" title="Source 75,136,159">75,136,159</sup>`,
  pt:'One blood test during an attack, one on a good day. The contrast is the clue.'},
 {from:DX_PL[3],at:.58,k:'Step 4',t:'MEFV gene testing',
  txt:`Two pathogenic variants: consistent with FMF. One: at least a carrier, and symptoms are still possible. None: FMF is less likely but not excluded; about 10–20% of FMF patients carry no <i>MEFV</i> variant. A VUS is inconclusive. Standard screening covers exons 2, 3, 5 and 10. <sup class="c" data-ref="ARUP2023,BenZvi2015,Shinar2012" title="Source 6,19,240">6,19,240</sup>`,
  pt:'The gene test can support the diagnosis but cannot rule it out.',
  hook:`FMF remains a <b>clinical diagnosis</b> (SHARE recommendations). Genetics supports it but cannot exclude it. <sup class="c" data-ref="Giancane2015" title="Source 82">82</sup>`},
 {from:DX_PL[4],at:.74,k:'Step 5',t:'A colchicine trial',
  txt:`GeneReviews describes a six-month colchicine trial to establish the diagnosis when molecular testing is inconclusive. Booty 2009 concluded that one variant plus typical symptoms justifies a trial. Response is a major Tel Hashomer criterion and a minor Livneh criterion. <sup class="c" data-ref="GeneReviews,Booty2009,Pras1998,Livneh1997" title="Source 26,76,159,215">26,76,159,215</sup>`,
  pt:'If daily colchicine makes the attacks stop over months, that strongly supports FMF.'},
 {from:DX_PL[5],at:.95,k:'Step 6',t:'Reassess over months',
  txt:`Colchicine fully prevents attacks in about 60–70% of patients, gives a partial response in 20–30% and fails in about 5%. EULAR 2016 advised reviewing response, toxicity and adherence every 6 months; the EULAR/PReS 2024 update, published in 2025, keeps regular review but sets no fixed interval, asking for it more often at diagnosis and when the disease is uncontrolled. An atypical course sends the work-up back to the mimics. <sup class="c" data-ref="SoonLaxer2017,Ozen2016,Ozen2025,Cush2025" title="Source 43,199,203,247">43,199,203,247</sup>`,
  pt:'Doctors keep checking: are the attacks gone, and are the blood tests calm between them?'}
];
inits.dx=()=>{
  /* ---------- Eurofever/PRINTO calculator ---------- */
  const g=$('#dxGauge');let gt='none';const shown={g:0,c:0};let stopG=null,gTok=0;
  const st=()=>{const ci={},ab={};$$('[data-ci]').forEach(b=>ci[b.dataset.ci]=b.checked);$$('[data-ab]').forEach(b=>ab[b.dataset.ab]=b.checked);
    const gN=['ep','arth','chest','abd'].filter(k=>ci[k]).length;
    const cN=['eth','ep','arth','chest','abd'].filter(k=>ci[k]).length+['aph','urt','mp','ln'].filter(k=>!ab[k]).length;
    return{pre:$('#dxPre1').checked&&$('#dxPre2').checked,gN,cN}};
  function gauge(gv,cv,need,met,G,Cn){
    let s='';
    /* narrow: the segment bar and the 0–9 arc both run the full width of a taller stage */
    const N=vb(g,'400 262','400 356');
    const Q=N?{bx:10,bw:88,bs:96,by:30,bh:28,ty:16,lab:48,mk1:24,mk2:62,mky:76,sumY:96,arm2:124,cx:200,cy:310,R:158,endX:390}
             :{bx:20,bw:84,bs:92,by:26,bh:20,ty:16,lab:40,mk1:20,mk2:52,mky:64,sumY:80,arm2:104,cx:200,cy:232,R:100,endX:380};
    s+=`<text x="${Q.bx}" y="${Q.ty}" class="t-sm">ARM 1 · MEFV GENOTYPE + CLINICAL ITEMS</text>`;
    const dim=need?1:.35;
    for(let i=0;i<4;i++){const x=Q.bx+i*Q.bs,f=clamp(gv-i);
      s+=`<rect x="${x}" y="${Q.by}" width="${Q.bw}" height="${Q.bh}" rx="6" style="fill:var(--panel-2);stroke:var(--line);opacity:${dim}"/>`;
      if(f>0)s+=`<rect x="${x}" y="${Q.by}" width="${f1(Q.bw*f)}" height="${Q.bh}" rx="6" style="fill:${met.g?'var(--good)':'var(--terra)'};opacity:${f1(.38*dim)}"/>`;
      if(f>.98)s+=`<rect x="${x}" y="${Q.by}" width="${Q.bw}" height="${Q.bh}" rx="6" style="fill:none;stroke:${met.g?'var(--good)':'var(--terra)'};stroke-width:2;opacity:${dim}"/>`;
      s+=`<text x="${x+Q.bw/2}" y="${Q.lab}" class="t-xs t-mid" style="fill:${f>.5&&need?'var(--ink)':'var(--muted)'};font-weight:700">${['1–3 d','arthritis','chest','abdomen'][i]}</text>`}
    if(need){const x=Q.bx+need*Q.bs-4;s+=`<line x1="${x}" x2="${x}" y1="${Q.mk1}" y2="${Q.mk2}" style="stroke:var(--ink);stroke-width:2.5"/><text x="${x}" y="${Q.mky}" class="t-xs t-mid" style="fill:var(--ink)">need ≥${need}</text>`;
      s+=`<text x="${Q.endX}" y="${Q.sumY}" class="t-sm t-end" style="fill:${met.g?'var(--good)':'var(--muted)'}">${G} of 4 items · ${met.g?'arm met':'arm not met'}</text>`}
    else s+=`<text x="200" y="${Q.sumY-8}" class="t-sm t-mid">no qualifying genotype: arm 1 does not apply</text>`;
    s+=`<text x="${Q.bx}" y="${Q.arm2}" class="t-sm">ARM 2 · CLINICAL ONLY (≥6 OF 9)</text>`;
    const cx=Q.cx,cy=Q.cy,R=Q.R,pt=v=>{const a=Math.PI-Math.PI*v/9;return[cx+R*Math.cos(a),cy-R*Math.sin(a)]};
    s+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy}" style="fill:none;stroke:var(--panel-2);stroke-width:22;stroke-linecap:butt"/>`;
    if(cv>.01){const[ex,ey]=pt(cv);s+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:${met.c?'var(--good)':'var(--terra)'};stroke-width:22"/>`}
    for(let v=1;v<9;v++){const a=Math.PI-Math.PI*v/9;s+=`<line x1="${f1(cx+(R-11)*Math.cos(a))}" y1="${f1(cy-(R-11)*Math.sin(a))}" x2="${f1(cx+(R+11)*Math.cos(a))}" y2="${f1(cy-(R+11)*Math.sin(a))}" style="stroke:var(--panel);stroke-width:2"/>`}
    {const a=Math.PI/3;s+=`<line x1="${f1(cx+(R-14)*Math.cos(a))}" y1="${f1(cy-(R-14)*Math.sin(a))}" x2="${f1(cx+(R+16)*Math.cos(a))}" y2="${f1(cy-(R+16)*Math.sin(a))}" style="stroke:var(--ink);stroke-width:3"/><text x="${f1(cx+(R+26)*Math.cos(a))}" y="${f1(cy-(R+26)*Math.sin(a)+4)}" class="t-sm t-mid" style="fill:var(--ink)">6</text>`}
    s+=`<text x="${cx-R}" y="${cy+20}" class="t-xs t-mid">0</text><text x="${cx+R}" y="${cy+20}" class="t-xs t-mid">9</text>`;
    s+=`<text x="${cx}" y="${cy-8}" class="t-big t-mid" style="font-size:38px;fill:${met.c?'var(--good)':'var(--ink)'}">${Cn}</text><text x="${cx}" y="${cy+14}" class="t-xs t-mid">of 9 · ${met.c?'arm met':'arm not met'}</text>`;
    g.innerHTML=s;
  }
  function update(){
    const S=st(),need=gt==='conf'?1:gt==='non'?2:0;
    const met={g:need>0&&S.gN>=need,c:S.cN>=6};
    const from={...shown};stopG&&stopG();
    stopG=animate(550,p=>{const e=ease(p);shown.g=lerp(from.g,S.gN,e);shown.c=lerp(from.c,S.cN,e);gauge(shown.g,shown.c,need,met,S.gN,S.cN)},()=>{stopG=null});
    const tok=++gTok;setTimeout(()=>{if(tok!==gTok)return;stopG&&stopG();stopG=null;shown.g=S.gN;shown.c=S.cN;gauge(S.gN,S.cN,need,met,S.gN,S.cN)},700);
    if(RM)gauge(S.gN,S.cN,need,met,S.gN,S.cN);
    const arms=[met.g&&'the genotype + clinical arm',met.c&&'the clinical-only arm'].filter(Boolean).join(' and ');
    const v=$('#dxVerdict');
    if(!S.pre){v.className='dx-verdict na';v.innerHTML=`<strong>Criteria not applied yet</strong><span>Both prerequisites must hold before either arm is scored. ${arms?'The scores would otherwise meet '+arms+'.':''}</span>`}
    else if(arms){v.className='dx-verdict yes';v.innerHTML=`<strong>Classified as FMF (for research classification)</strong><span>Met by ${arms}.</span>`}
    else{v.className='dx-verdict';v.innerHTML=`<strong>Not classified as FMF by these criteria</strong><span>That does not rule FMF out. Classification criteria trade some sensitivity for specificity.</span>`}
    v.innerHTML+=`<span class="stage-cap">Classification criteria for studies, not a diagnostic test for an individual.</span>`;
    $('#dxGtDef').innerHTML=DX_GT[gt];
  }
  function setGt(k){gt=k;$$('[data-gt]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.gt===k))}
  $$('[data-gt]').forEach(b=>b.addEventListener('click',()=>{setGt(b.dataset.gt);update()}));
  $$('#m-dx .dx-form input[type=checkbox]').forEach(c=>c.addEventListener('change',update));
  $$('[data-dxex]').forEach(b=>b.addEventListener('click',()=>{const E=DX_EX[b.dataset.dxex];
    $('#dxPre1').checked=!!E.pre[0];$('#dxPre2').checked=!!E.pre[1];
    $$('[data-ci]').forEach(c=>c.checked=E.ci.includes(c.dataset.ci));$$('[data-ab]').forEach(c=>c.checked=E.ab.includes(c.dataset.ab));
    setGt(E.gt);update()}));
  $('#dxPerfG').innerHTML=dxBars([{l:'Derivation',s:.94,p:.95},{l:'Validation (n≈1,010)',s:.89,p:1}]);
  $('#dxPerfC').innerHTML=dxBars([{l:'Derivation',s:.91,p:.92},{l:'Validation',s:.85,p:.94}]);
  {const E=DX_EX.typ;$('#dxPre1').checked=true;$('#dxPre2').checked=true;$$('[data-ci]').forEach(c=>c.checked=E.ci.includes(c.dataset.ci));setGt('conf')}
  gauge(0,0,1,{g:0,c:0},0,0);update();

  /* ---------- older criteria sets ---------- */
  let crit='th';const cst={th:{},liv:{},yo:{}};const lopt={rule:'simple',ia:'maj'};
  function critGroups(){const C=DX_CRIT[crit];if(crit!=='liv')return C.groups;
    const gs=C.groups.map(x=>({...x,items:x.items.map((t,i)=>({t,id:x.k+i}))}));
    gs[lopt.ia==='maj'?0:1].items.push({t:'Incomplete abdominal attack',id:'ia',flag:1});return gs}
  function critForm(){const C=DX_CRIT[crit];let h='';
    if(crit==='liv')h+=`<div class="ctrls" role="group" aria-label="Rule set"><span class="kicker">Rule set</span><button class="btn" data-lr="simple" aria-pressed="${lopt.rule==='simple'}">Simple</button><button class="btn" data-lr="cons" aria-pressed="${lopt.rule==='cons'}">Conservative</button></div>
      <div class="ctrls" role="group" aria-label="Incomplete abdominal attack"><span class="kicker">"Incomplete abdominal attack" counts as</span><button class="btn" data-lia="maj" aria-pressed="${lopt.ia==='maj'}">Major</button><button class="btn" data-lia="min" aria-pressed="${lopt.ia==='min'}">Minor</button></div>
      <p class="dx-def"><span class="tag warn">Sources disagree</span> Reproductions of the 1997 paper differ on whether an incomplete abdominal attack is a major or a minor criterion; the Lancieri 2023 review lists it as minor. Flip the switch to see whether it changes the result. <sup class="c" data-ref="Livneh1997,Lancieri2023" title="Source 145,159">145,159</sup></p>`;
    h+=`<p class="dx-def">${C.def}</p>`;
    critGroups().forEach(gr=>{h+=`<fieldset><legend>${gr.lg}</legend>`;
      gr.items.forEach((it,i)=>{const t=typeof it==='string'?it:it.t,id=typeof it==='string'?gr.k+i:it.id;
        h+=`<label class="dx-ck"><input type="checkbox" data-cr="${id}" data-grp="${gr.k}" ${cst[crit][id]?'checked':''}><span>${t}${it.flag?' <small>(placement disputed)</small>':''}</span></label>`});
      if(gr.k==='s')h+=`<p class="dx-def">Supportive criteria only count in the conservative set (1 minor + ≥5 supportive), which is the rule scored here. A reproduction of the paper also allows 1 minor + ≥4 of the first 5 supportive criteria. <sup class="c" data-ref="Livneh1997,Lancieri2023" title="Source 145,159">145,159</sup></p>`;
      h+='</fieldset>'});
    $('#dxCritForm').innerHTML=h;critOut()}
  function critOut(){const C=DX_CRIT[crit];const c={M:0,m:0,s:0};
    $$('#dxCritForm [data-cr]').forEach(x=>{if(x.checked)c[x.dataset.grp]++});
    const[cls,ttl,sub]=C.judge(c,lopt);const o=$('#dxCritOut');o.className='dx-verdict'+(cls==='yes'?' yes':cls==='na'?' na':'');
    const dots=(n,tot,k,l)=>tot?`<em>${l}</em>`+Array.from({length:tot},(_,i)=>`<span class="${i<n?'on':''} ${k}"></span>`).join(''):'';
    const tot=k=>critGroups().filter(x=>x.k===k).reduce((a,x)=>a+x.items.length,0);
    o.innerHTML=`<span class="kicker">${C.name}</span><strong>${ttl}</strong><div class="dx-dots">${dots(c.M,tot('M'),'',crit==='yo'?'criteria':'major')}${dots(c.m,tot('m'),'mn','minor')}${dots(c.s,tot('s'),'sp','supportive')}</div><span>${sub}</span>`;
    $('#dxCritPerf').innerHTML=`<span class="kicker">How it performed</span>${dxBars(C.perf)}<p class="stage-cap">Sources: ${C.pcite}</p>`}
  $('#dxCritForm').addEventListener('change',e=>{const x=e.target.closest('[data-cr]');if(!x)return;cst[crit][x.dataset.cr]=x.checked;critOut()});
  $('#dxCritForm').addEventListener('click',e=>{const a=e.target.closest('[data-lr]'),b=e.target.closest('[data-lia]');
    if(a){lopt.rule=a.dataset.lr;critForm()}if(b){lopt.ia=b.dataset.lia;critForm()}});
  $$('[data-crit]').forEach(b=>b.addEventListener('click',()=>{crit=b.dataset.crit;$$('[data-crit]').forEach(x=>x.setAttribute('aria-pressed',x===b));critForm()}));
  cst.th={M0:true,m0:true,m2:true};cst.liv={M0:true};cst.yo={M0:true,M1:true};
  critForm();

  /* ---------- labs across an attack ---------- */
  const ls=$('#dxLabSvg'),lr=$('#dxLabT');let pers=false;
  const D0=-3,D1=28,dOf=t=>D0+t*(D1-D0);
  const gF=(d,tp,tau)=>d<0?0:d<tp?ease(d/tp):Math.exp(-(d-tp)/tau);
  const ROWS=[
   {n:'SAA',u:'mg/L',c:'var(--gold)',pk:693,b:6,sc:750,f:d=>gF(d,1.5,1.8),p:1},
   {n:'CRP',u:'mg/L',c:'var(--terra)',pk:115,b:4,sc:130,f:d=>gF(d,1.4,1.5),p:1},
   {n:'WBC / neutrophils',u:'rise in attacks',c:'var(--crocus)',f:d=>.7*gF(d,1,1.4),q:1},
   {n:'ESR / fibrinogen',u:'rise, slower to fall',c:'var(--sea)',f:d=>.72*gF(d,2.6,4.5),p:.6,q:1},
   {n:'Ferritin',u:'no change',c:'var(--muted)',f:()=>.18,flat:1},
   {n:'Platelets',u:'no change',c:'var(--muted)',f:()=>.42,flat:1}];
  const val=(R,d)=>{let v=R.f(d);if(pers&&R.p&&!R.flat){const fl=.09*R.p;v=fl+(1-fl)*v}return v};
  function drawLab(t){const d=dOf(t);let s='';
    /* narrow: each row keeps its track but the name moves onto a header line above it,
       the names are shortened and the day axis loses its most crowded ticks */
    const N=vb(ls,'720 410','400 524');
    const L=N?{X0:8,X1:392,Y0:30,RH:74,TOP:18,H:44,ticks:[-2,0,4,7,14,21,28]}
             :{X0:150,X1:700,Y0:26,RH:58,TOP:6,H:44,ticks:[-2,0,2,4,7,14,21,28]};
    const X0=L.X0,X1=L.X1,xd=k=>X0+(k-D0)/(D1-D0)*(X1-X0),yEnd=L.Y0+L.RH*6;
    const NB=` · `;
    if(N)s+=`<text x="${f1(xd(1.5))}" y="13" class="t-xs t-mid" style="fill:var(--terra)">attack (1–3 days)</text><text x="${X1}" y="13" class="t-xs t-end">curves are schematic</text>`;
    else{s+=`<rect x="${f1(xd(0))}" y="20" width="${f1(xd(3)-xd(0))}" height="350" style="fill:var(--terra-soft);opacity:.7"/><text x="${f1(xd(1.5))}" y="14" class="t-xs t-mid" style="fill:var(--terra)">attack (1–3 days)</text>`;
      L.ticks.forEach(k=>{s+=`<line x1="${f1(xd(k))}" x2="${f1(xd(k))}" y1="20" y2="370" class="grid"/>`});
      s+=`<text x="${X1}" y="14" class="t-xs t-end">curve shapes are schematic: no published day-by-day curve exists</text>`}
    L.ticks.forEach(k=>{s+=`<text x="${f1(xd(k))}" y="${N?yEnd+16:386}" class="t-xs t-mid">${k}</text>`});
    s+=`<text x="${X1}" y="${N?yEnd+32:403}" class="t-xs t-end">days since the attack began</text>`;
    ROWS.forEach((R,i)=>{const y0=L.Y0+i*L.RH,yb=y0+L.TOP+L.H,h=L.H,yv=v=>yb-h*clamp(v,0,1.05);
      if(N){let rt=`<tspan>${R.un||R.u}</tspan>`;
        if(R.pk&&d>=1.5)rt+=`<tspan style="fill:${R.c}">${NB}attack median ${R.pk}</tspan>`;
        if(R.pk&&d>=8)rt+=`<tspan>${NB}${pers?'stays raised':'between '+R.b}</tspan>`;
        if(R.flat&&d>=1)rt+=`<tspan style="fill:var(--good)">${NB}flat through the attack</tspan>`;
        s+=`<text x="6" y="${y0+12}" class="t-lbl" style="fill:${R.flat?'var(--muted)':'var(--ink)'}">${R.nn||R.n}</text><text x="${X1}" y="${y0+12}" class="t-xs t-end">${rt}</text>`;
        s+=`<rect x="${f1(xd(0))}" y="${y0+L.TOP}" width="${f1(xd(3)-xd(0))}" height="${h}" style="fill:var(--terra-soft);opacity:.7"/>`;
        L.ticks.forEach(k=>{s+=`<line x1="${f1(xd(k))}" x2="${f1(xd(k))}" y1="${y0+L.TOP}" y2="${yb}" class="grid"/>`})}
      else s+=`<text x="10" y="${y0+20}" class="t-lbl" style="fill:${R.flat?'var(--muted)':'var(--ink)'}">${R.n}</text><text x="10" y="${y0+36}" class="t-xs">${R.u}</text>`;
      s+=`<line x1="${X0}" x2="${X1}" y1="${yb}" y2="${yb}" class="axis"/>`;
      let gp='',bp='';for(let k=0;k<=220;k++){const dd=D0+k/220*(D1-D0),x=xd(dd),y=yv(val(R,dd)*(R.sc?R.pk/R.sc:1));gp+=(k?'L':'M')+f1(x)+' '+f1(y);if(dd<=d)bp+=(bp?'L':'M')+f1(x)+' '+f1(y)}
      s+=`<path d="${gp}" style="fill:none;stroke:${R.c};stroke-width:1.4;opacity:.25"/>`;
      if(bp)s+=`<path d="${bp}" style="fill:none;stroke:${R.c};stroke-width:${R.flat?2:2.8};stroke-linejoin:round"/>`;
      const cy=yv(val(R,d)*(R.sc?R.pk/R.sc:1));s+=`<circle cx="${f1(xd(d))}" cy="${f1(cy)}" r="4.5" style="fill:${R.c};stroke:var(--panel);stroke-width:1.5"/>`;
      if(N)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${y0+L.TOP}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.2;opacity:.45"/>`;
      else{
        if(R.pk&&d>=1.5)s+=`<text x="${f1(xd(3)+10)}" y="${y0+10}" class="t-xs" style="fill:${R.c}">attack median ${R.pk} ${R.u}</text>`;
        if(R.pk&&d>=8)s+=`<text x="${X1-2}" y="${y0+26}" class="t-xs t-end">${pers?'stays above normal (schematic)':'between attacks: median '+R.b+' '+R.u}</text>`;
        if(R.flat&&d>=1)s+=`<text x="${f1(xd(3)+8)}" y="${f1(cy-6)}" class="t-xs" style="fill:var(--good)">flat through the attack</text>`}
    });
    if(!N)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="20" y2="370" style="stroke:var(--ink);stroke-width:1.2;opacity:.45"/>`;
    ls.innerHTML=s;
    const num=R=>{const raw=val(R,d);if(pers&&(d<0||d>8))return'above normal';return'≈'+Math.round(R.b+(R.pk-R.b)*(raw-(pers?.09:0))/(1-(pers?.09:0)))+' mg/L'};
    const q=R=>{const v=val(R,d);return v>.15?'raised':pers&&R.p&&(d<0||d>8)?'mildly raised':'normal'};
    $('#dxLabRead').innerHTML=`<span>day <b>${f1(d)}</b></span><span>SAA <b>${num(ROWS[0])}</b></span><span>CRP <b>${num(ROWS[1])}</b></span><span>WBC <b>${q(ROWS[2])}</b></span><span>ESR <b>${q(ROWS[3])}</b></span><span>ferritin <b>unchanged</b></span><span>platelets <b>unchanged</b></span>`;
    const p=phaseOf(DX_LAB,t);setLab(p);
    let extra='';if(pers)extra=`<div class="kv"><div><dt>This scenario</dt><dd>SAA and CRP never fully settle. About a third to two thirds of patients show some inflammation between attacks, and this is the pattern linked to amyloidosis. <sup class="c" data-ref="Berkun2007,Korkmaz2002,Lachmann2006" title="Source 21,136,141">21,136,141</sup></dd></div></div>`;
    $('#dxLabNote').innerHTML=noteHTML(DX_LAB[p])+extra}
  const stopL=playWire(lr,$('#dxLabPlay'),drawLab,15000,'Replay','dx');
  const setLab=stepWire($('#dxLabSteps'),DX_LAB,lr,drawLab,stopL);
  const ptog=v=>{pers=v;$('#dxLabNorm').setAttribute('aria-pressed',!v);$('#dxLabPers').setAttribute('aria-pressed',v);drawLab(+lr.value)};
  $('#dxLabNorm').onclick=()=>ptog(false);$('#dxLabPers').onclick=()=>ptog(true);
  drawLab(+lr.value);

  /* ---------- diagnostic pathway ---------- */
  const ps=$('#dxPathSvg'),pr=$('#dxPathT');
  const PN=[{a:'Recurrent self-limited',b:'fever + serositis, 1–3 days'},{a:'Exclude mimics',b:'infection, surgery, other fevers'},{a:'Acute-phase reactants',b:'in an attack and between'},
            {a:'MEFV testing',b:'exons 2, 3, 5 and 10'},{a:'Colchicine trial',b:'6 months if genetics unclear'},{a:'Reassess',b:'attacks + SAA/CRP over months'}];
  function drawPath(t){let s=`<defs>${marker('dxPa')}${marker('dxPb','var(--terra)')}</defs>`;
    /* narrow: the flow runs top to bottom and each side panel becomes a full-width block
       between two nodes; the boxes keep their places so nothing jumps as they fade in */
    const N=vb(ps,'720 440','400 1052');
    const L=N
      ? {nw:372,nh:66,px:14,
         pos:[{x:14,y:16},{x:14,y:120},{x:14,y:354},{x:14,y:458},{x:14,y:664},{x:14,y:870}],
         C:[[[200,82],[200,120]],[[200,316],[200,354]],[[200,420],[200,458]],[[200,626],[200,664]],[[200,832],[200,870]]],
         stub:[[200,186,194],[200,524,532]], app:[14,194], gen:[14,532], col:[14,738], out:[14,944],
         genW:372,colW:372,outW:372, warn:'M320 626 L320 660'}
      : {nw:200,nh:66,px:130,
         pos:[{x:16,y:20},{x:260,y:20},{x:504,y:20},{x:504,y:250},{x:260,y:250},{x:16,y:250}],
         C:[[[216,53],[260,53]],[[460,53],[504,53]],[[604,86],[604,250]],[[504,283],[460,283]],[[260,283],[216,283]]],
         stub:[[360,86,110],[604,316,338]], app:[130,110], gen:[474,338], col:[236,338], out:[16,338],
         genW:240,colW:206,outW:200, warn:'M474 384 C458 384 440 350 420 318'};
    const lit=i=>t>=DX_PL[i],cur=phaseOf(DX_PATH,t);
    L.C.forEach(([[x1,y1],[x2,y2]],k)=>{const on=lit(k+1);const D=Math.hypot(x2-x1,y2-y1);s+=`<path d="M${x1} ${y1} L${f1(x2-(x2-x1)/D*3)} ${f1(y2-(y2-y1)/D*3)}" class="arrow" style="${on?'stroke:var(--terra);stroke-width:2.2':''}" marker-end="url(#${on?'dxPb':'dxPa'})"/>`;
      const a=DX_PL[k]+.06,b=DX_PL[k+1];if(t>a&&t<b){const u=ease(ramp(t,a,b));s+=`<circle cx="${f1(lerp(x1,x2,u))}" cy="${f1(lerp(y1,y2,u))}" r="6" style="fill:var(--terra)"/>`}});
    PN.forEach((n0,i)=>{const n={...n0,...L.pos[i]},on=lit(i),c=i===cur;
      s+=`<rect x="${n.x}" y="${n.y}" width="${L.nw}" height="${L.nh}" rx="12" style="fill:${on?'var(--terra-soft)':'var(--panel)'};stroke:${on?'var(--terra)':'var(--line)'};stroke-width:${c?3:1.5}"/>`;
      s+=`<circle cx="${n.x}" cy="${n.y}" r="11" style="fill:${on?'var(--terra)':'var(--panel-2)'};stroke:var(--panel);stroke-width:2"/><text x="${n.x}" y="${n.y+4}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${n.x+L.nw/2}" y="${n.y+29}" class="t-lbl t-mid" style="opacity:${on?1:.55}">${n.a}</text><text x="${n.x+L.nw/2}" y="${n.y+47}" class="t-xs t-mid">${n.b}</text>`});
    const stub=k=>`<line x1="${L.stub[k][0]}" x2="${L.stub[k][0]}" y1="${L.stub[k][1]}" y2="${L.stub[k][2]}" style="stroke:var(--terra);stroke-dasharray:3 3"/>`;
    // appendectomy panel under node 2
    const ap=ramp(t,DX_PL[1]+.02,DX_PL[1]+.12);
    if(ap>0){const[px,py]=L.app;
      s+=`<g style="opacity:${f1(ap)}">${stub(0)}<rect x="${px}" y="${py}" width="${N?372:350}" height="122" rx="10" style="fill:var(--panel);stroke:var(--line)"/>
       <text x="${px+12}" y="${py+18}" class="t-sm" style="fill:var(--terra)">SURGICAL ABDOMEN? 182 FMF PATIENTS</text>`;
      const bx=px+116,bw=170,bar=(y,lbl,fmf,genA,genB,fl,gl)=>{let q=`<text x="${px+12}" y="${y+9}" class="t-sm">${lbl}</text>`;
        q+=`<rect x="${bx}" y="${y}" width="${f1(bw*fmf*ease(ap))}" height="11" rx="3" style="fill:var(--terra)"/><text x="${f1(bx+bw*fmf*ease(ap)+5)}" y="${y+9}" class="t-xs" style="fill:var(--terra)">FMF ${fl}</text>`;
        q+=`<rect x="${bx}" y="${y+16}" width="${f1(bw*genB*ease(ap))}" height="11" rx="3" style="fill:var(--muted);opacity:.35"/><rect x="${bx}" y="${y+16}" width="${f1(bw*genA*ease(ap))}" height="11" rx="3" style="fill:var(--muted);opacity:.7"/><text x="${f1(bx+bw*genB*ease(ap)+5)}" y="${y+25}" class="t-xs">general ${gl}</text>`;return q};
      s+=bar(py+32,'appendectomy',.4,.12,.25,'40%','12–25%');
      s+=bar(py+74,'not inflamed',.8,.2,.2,'80%','~20%');
      s+=`</g>`}
    // genotype outcomes under node 4
    const gp=ramp(t,DX_PL[3]+.02,DX_PL[3]+.12);
    if(gp>0){const[px,py]=L.gen;
      s+=`<g style="opacity:${f1(gp)}">${stub(1)}<rect x="${px}" y="${py}" width="${L.genW}" height="94" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      [['var(--good)','two pathogenic: fits FMF'],['var(--warn)','one variant / VUS: unclear'],['var(--muted)','none: FMF still possible']].forEach(([c,l],k)=>{s+=`<circle cx="${px+16}" cy="${py+20+k*26}" r="5" style="fill:${c}"/><text x="${px+28}" y="${py+24+k*26}" class="t-xs">${l}</text>`});
      s+=`</g>`;
      if(t>DX_PL[4]-.04)s+=`<path d="${L.warn}" class="arrow" style="stroke:var(--warn);stroke-dasharray:4 3;opacity:${f1(ramp(t,DX_PL[4]-.04,DX_PL[4]))}"${N?' marker-end="url(#dxPa)"':''}/>`}
    // colchicine trial box under node 5
    const cp=ramp(t,DX_PL[4]+.02,DX_PL[4]+.12);
    if(cp>0){const[px,py]=L.col;
      s+=`<g style="opacity:${f1(cp)}"><rect x="${px}" y="${py}" width="${L.colW}" height="94" rx="10" style="fill:var(--crocus-soft);stroke:var(--crocus)"/><text x="${px+12}" y="${py+20}" class="t-sm" style="fill:var(--crocus)">A RESPONSE COUNTS AS</text>
      <text x="${px+12}" y="${py+42}" class="t-xs" style="fill:var(--ink)">Tel Hashomer: a major criterion</text><text x="${px+12}" y="${py+62}" class="t-xs" style="fill:var(--ink)">Livneh: a minor criterion</text><text x="${px+12}" y="${py+82}" class="t-xs">trial length: about 6 months</text></g>`}
    // outcomes under node 6
    const op=ramp(t,DX_PL[5]+.02,DX_PL[5]+.12);
    if(op>0){const[px,py]=L.out;
      s+=`<g style="opacity:${f1(op)}"><rect x="${px}" y="${py}" width="${L.outW}" height="94" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${px+12}" y="${py+18}" class="t-sm">ON COLCHICINE</text>`;
      [['complete','60–70%',.65,'var(--good)'],['partial','20–30%',.25,'var(--warn)'],['no response','~5%',.05,'var(--bad)']].forEach(([l,v,w,c],k)=>{const y=py+30+k*20;s+=`<text x="${px+12}" y="${y+8}" class="t-xs">${l}</text><rect x="${px+88}" y="${y}" width="${f1(70*w*ease(op))}" height="9" rx="3" style="fill:${c}"/><text x="${f1(px+92+70*w*ease(op))}" y="${y+8}" class="t-xs">${v}</text>`});
      s+=`</g>`}
    ps.innerHTML=s;setPath(cur);$('#dxPathNote').innerHTML=noteHTML(DX_PATH[cur])}
  const stopP=playWire(pr,$('#dxPathPlay'),drawPath,16000,'Replay','dx');
  const setPath=stepWire($('#dxPathSteps'),DX_PATH,pr,drawPath,stopP);
  drawPath(+pr.value);
  /* this module has three drawings but one module id, so re-lay-out all of them together */
  redraws.dx=()=>{stopL();stopP();drawLab(+lr.value);drawPath(+pr.value);update()};

  $('#dxCards').innerHTML=`
   <div class="card"><h4>Why the gene test can mislead</h4><p>About 10–20% of people with FMF carry no <i>MEFV</i> variant, usually with a milder picture. Single variants are common: in a Turkish referral cohort, 415 of 1,291 patients (32%) were heterozygous. Healthy carriers also run slightly higher CRP and SAA than non-carriers. <sup class="c" data-ref="BenZvi2015,Tanatar2020,Lachmann2006" title="Source 19,141,253">19,141,253</sup></p></div>
   <div class="card"><h4>Criteria travel badly</h4><p>In Eurofever children whose fevers had other causes, the Livneh criteria had a specificity of only 41.1% and the paediatric criteria 40.7%. Criteria built in high-prevalence populations over-call FMF where other periodic fevers are common. <sup class="c" data-ref="Demirkaya2016" title="Source 49">49</sup></p></div>
   <div class="card"><h4>Colchicine response helps, but is not proof</h4><p>In daily practice a good response and the right ancestry can support FMF in someone with a non-confirmatory genotype, but the Eurofever/PRINTO panel left both out of the criteria. <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup></p></div>
   <div class="card"><h4>One pathogenic variant is not "confirmatory"</h4><p>A single heterozygous pathogenic <i>MEFV</i> variant counts as a <b>non-confirmatory</b> genotype in the 2019 criteria, so it needs <b>2</b> of the 4 clinical items, not 1. The same goes for one pathogenic variant plus a VUS in trans, and for two VUS. Benign and likely-benign variants do not count at all. <sup class="c" data-ref="Gattorno2019,Lancieri2023" title="Source 75,145">75,145</sup></p></div>
   <div class="card"><h4>Counts, not points</h4><p>Both FMF sets are plain counts: every item scores 1 and there are no weights, so the 4-item and 9-item thresholds are all there is. The TRAPS clinical set in the same paper is point-weighted with a threshold of 5, so the two models should not be mixed up. <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup></p></div>
   <div class="card"><h4>Who gets the gene test?</h4><p>The clinical-only Eurofever/PRINTO items can also be used to pick who should be tested. Earlier provisional Eurofever clinical scores (2015) separated FMF from other periodic fevers with an AUC of 0.98. <sup class="c" data-ref="Gattorno2019,Federici2015" title="Source 65,75">65,75</sup></p></div>`;
};
/* =============== 3.3 the differential =============== */
const DD_DZ=[
 {id:'fmf',n:'FMF',full:'Familial Mediterranean fever',sub:'1–3 d, irregular',src:'cited',
  gene:`<i>MEFV</i>, 16p13.3; autosomal recessive, sometimes with one variant or dominant (M694del, T577 variants) <sup class="c" data-ref="GeneReviews,Booth2000,Stoffels2014" title="Source 25,76,250">25,76,250</sup>`,
  len:`12–72 h; 1–3 days in Eurofever <sup class="c" data-ref="Livneh1997,Gattorno2019" title="Source 75,159">75,159</sup>`,
  feat:`Eastern Mediterranean ancestry; peritonitis, one-sided pleuritis; monoarthritis of a large joint; erysipelas-like erythema on the lower leg; exertional leg pain; colchicine response <sup class="c" data-ref="Livneh1997,TurkishFMF2005" title="Source 159,264">159,264</sup>`,
  test:`CRP/SAA high in attacks while ferritin and platelets are not <sup class="c" data-ref="Korkmaz2002" title="Source 136">136</sup>; <i>MEFV</i> genotype <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>; colchicine trial <sup class="c" data-ref="GeneReviews" title="Source 76">76</sup>`,
  pn:`Episode length is cited. The uneven spacing reflects published descriptions of FMF attacks as irregular, unlike PFAPA. <sup class="c" data-ref="BenChetrit2019" title="Source 17">17</sup>`,
  ep:[[3,2,'f'],[17,3,'f'],[24,1.5,'f'],[45,2.5,'f']]},
 {id:'traps',n:'TRAPS',full:'TNF receptor-associated periodic syndrome',sub:'≥7 days',src:'cited',
  gene:`<i>TNFRSF1A</i>; autosomal dominant <sup class="c" data-ref="Lachmann2014" title="Source 143">143</sup>`,
  len:`Often 7 days or more <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>`,
  feat:`Migratory rash over painful muscles; periorbital oedema; conjunctivitis; family history in 64% of non-R92Q cases. About 70 symptomatic days a year, and AA amyloidosis in 10% <sup class="c" data-ref="Lachmann2014" title="Source 143">143</sup>`,
  test:`<i>TNFRSF1A</i> sequencing (R92Q and P46L are low-penetrance variants) <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>`,
  pn:`One 11-day episode in 60 days matches the roughly 70 symptomatic days a year in the Eurofever TRAPS series. <sup class="c" data-ref="Lachmann2014" title="Source 143">143</sup>`,
  ep:[[12,11,'f']]},
 {id:'mkd',n:'MKD / HIDS',full:'Mevalonate kinase deficiency (HIDS)',sub:'3–7 days',src:'cited',
  gene:`<i>MVK</i>; autosomal recessive (two variants required) <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>`,
  len:`3–7 days untreated <sup class="c" data-ref="Favier2016" title="Source 62">62</sup>`,
  feat:`Onset in infancy (median 0.5 years); neck lymph nodes; mouth ulcers; diarrhoea and vomiting; maculopapular rash; vaccination triggered the first flare in 63% in one series <sup class="c" data-ref="TerHaar2016,Favier2016" title="Source 62,256">62,256</sup>`,
  test:`Urinary mevalonic acid during an attack (sensitivity 92%, specificity 90%, NPV 98%) <sup class="c" data-ref="Jeyaratnam2016" title="Source 113">113</sup>; <i>MVK</i> genotype or enzyme activity`,
  pn:`Episode length is cited; the gap between episodes is illustrative. <sup class="c" data-ref="Favier2016" title="Source 62">62</sup>`,
  ep:[[6,5,'f'],[34,4.5,'f']]},
 {id:'caps',n:'CAPS (FCAS)',full:'Cryopyrin-associated periodic syndromes (FCAS, MWS, NOMID)',sub:'FCAS <24 h, cold',src:'gk',
  gene:`<i>NLRP3</i>; autosomal dominant or new (de novo) <sup class="c" data-ref="SoonLaxer2017" title="Source 247">247</sup>`,
  len:`FCAS under 24 h; MWS 1–3 days; NOMID continuous (standard teaching, not checked against a primary source) <sup class="c" data-ref="Lachmann2017" title="Source 144">144</sup>`,
  feat:`Hives-like (urticarial) rash; cold or stress triggers; sensorineural hearing loss; conjunctivitis; aseptic meningitis; bone overgrowth <sup class="c" data-ref="KuemmerleDeschner2017,Gattorno2019" title="Source 75,138">75,138</sup>`,
  test:`<i>NLRP3</i> sequencing, including a search for somatic mosaicism <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>`,
  pn:`Subtype durations are standard teaching, flagged as not checked against a primary source. The row shows FCAS: short flares after cold days.`,
  ep:[[8,.6,'f'],[9.6,.5,'f'],[22,.7,'f'],[37,.5,'f'],[51,.6,'f']]},
 {id:'pfapa',n:'PFAPA',full:'Periodic fever, aphthous stomatitis, pharyngitis, adenitis',sub:'3–6 d, every ~28 d',src:'cited',
  gene:`No known gene; not inherited <sup class="c" data-ref="SoonLaxer2017" title="Source 247">247</sup>`,
  len:`3–6 days (mean 4.8), clockwork about every 28 days <sup class="c" data-ref="Thomas1999,Gattorno2019" title="Source 75,258">75,258</sup>`,
  feat:`Onset usually before age 5; sore throat, mouth ulcers, neck lymph nodes; no serositis, chest pain, arthritis or diarrhoea; normal growth; no amyloidosis <sup class="c" data-ref="Gattorno2019,SoonLaxer2017" title="Source 75,247">75,247</sup>`,
  test:`Clinical diagnosis; a single dose of prednisone aborts the attack <sup class="c" data-ref="SoonLaxer2017,Thomas1999" title="Source 247,258">247,258</sup>`,
  pn:`Length and the ~28-day rhythm are both cited. <sup class="c" data-ref="Thomas1999" title="Source 258">258</sup>`,
  ep:[[4,4.8,'f'],[32,4.8,'f']]},
 {id:'beh',n:'Behçet disease',full:'Behçet disease',sub:'ulcers 1–2 weeks',src:'gk',
  gene:`Polygenic; HLA-B51 association (general knowledge)`,
  len:`Oral ulcers usually last 1–2 weeks (general knowledge); chronic relapsing course`,
  feat:`Recurrent oral and genital ulcers, uveitis, skin lesions, vascular thrombosis, pathergy <sup class="c" data-ref="ICBD2014" title="Source 104">104</sup>`,
  test:`ICBD score of 4 or more: eye, oral and genital lesions 2 points each; skin, nervous system, vascular signs and a positive pathergy test 1 point each (sensitivity 93.9%, specificity 92.1%) <sup class="c" data-ref="ICBD2014" title="Source 104">104</sup>`,
  pn:`Ulcer duration is general knowledge, not tied to a fetched source.`,
  ep:[[10,12,'u'],[44,10,'u']]},
 {id:'ibd',n:'IBD',full:'Inflammatory bowel disease (Crohn disease, ulcerative colitis)',sub:'chronic, not self-limited',src:'gk',
  gene:`Polygenic`,
  len:`Chronic or persistent rather than self-limiting in 1–3 days`,
  feat:`Chronic diarrhoea or bleeding, weight loss, growth failure, perianal disease <sup class="c" data-ref="Maaser2019" title="Source 161">161</sup>`,
  test:`Faecal calprotectin; endoscopy with biopsy; cross-sectional imaging <sup class="c" data-ref="Maaser2019" title="Source 161">161</sup>`,
  pn:`Drawn as continuous, fluctuating activity: standard teaching rather than a cited time course.`,
  ep:[[0,60,'c']]},
 {id:'aip',n:'Acute int. porphyria',full:'Acute intermittent porphyria',sub:'days, usually no fever',src:'gk',
  gene:`<i>HMBS</i>; autosomal dominant with low penetrance (general knowledge)`,
  len:`Days`,
  feat:`Severe abdominal pain with few peritoneal signs; neuropathy, low sodium, psychiatric symptoms, dark urine; drug or hormonal triggers; usually no fever <sup class="c" data-ref="Anderson2005" title="Source 4">4</sup>`,
  test:`Markedly raised urinary porphobilinogen on a single spot urine sample <sup class="c" data-ref="Anderson2005" title="Source 4">4</sup>`,
  pn:`"Days" is standard teaching; the absence of fever is cited. <sup class="c" data-ref="Anderson2005" title="Source 4">4</sup>`,
  ep:[[26,4,'a']]},
 {id:'app',n:'Appendicitis',full:'Appendicitis or another surgical abdomen',sub:'progresses, not resolving',src:'gk',
  gene:`None`,
  len:`Pain persists and progresses rather than resolving in 1–3 days`,
  feat:`In FMF patients, a shift from diffuse to right-lower-quadrant pain best predicted a truly inflamed appendix; 80% of appendices removed from FMF patients were not inflamed <sup class="c" data-ref="Lidar2008" title="Source 150">150</sup>`,
  test:`Ultrasound or CT and surgical assessment; a history of recurrent self-limited episodes argues for FMF <sup class="c" data-ref="Lidar2008" title="Source 150">150</sup>`,
  pn:`A single episode that builds until surgery: standard teaching.`,
  ep:[[30,2.6,'p']]},
 {id:'aosd',n:'AOSD / sJIA',full:'Adult-onset Still\'s disease / systemic JIA',sub:'daily spikes, ≥1 week',src:'gk',
  gene:`Polygenic`,
  len:`Daily spiking fever for at least 1 week; persistent rather than episodic`,
  feat:`Evanescent salmon-pink rash with fever, arthritis, sore throat, lymph nodes or a big spleen, high white count <sup class="c" data-ref="Yamaguchi1992" title="Source 277">277</sup>`,
  test:`Yamaguchi criteria (≥5 criteria including ≥2 major: sensitivity 96.2%, specificity 92.1%); very high ferritin, unlike FMF attacks <sup class="c" data-ref="Yamaguchi1992,Korkmaz2002" title="Source 136,277">136,277</sup>`,
  pn:`Quotidian (once-daily) spikes are standard teaching, not a cited time course.`,
  ep:[[15,30,'d']]}
];
const DD_CLUE=[
 {l:'Ends by itself in 1–3 days',ids:['fmf'],say:`Short, self-limited, irregular attacks are the FMF signature. Next steps: CRP/SAA in and between attacks, <i>MEFV</i> genotype, colchicine response. MWS, a CAPS subtype, can also run 1–3 days. <sup class="c" data-ref="Livneh1997,Gattorno2019,Lachmann2017" title="Source 75,144,159">75,144,159</sup>`},
 {l:'Lasts a week or more',ids:['traps','aosd','beh'],say:`TRAPS episodes often run 7 days or more (test: <i>TNFRSF1A</i>); Still's fever spikes daily for at least a week (very high ferritin); Behçet ulcers last 1–2 weeks (ICBD score). <sup class="c" data-ref="Gattorno2019,Yamaguchi1992,ICBD2014" title="Source 75,104,277">75,104,277</sup>`},
 {l:'Clockwork, about every 4 weeks',ids:['pfapa'],say:`A regular ~28-day cycle with sore throat, mouth ulcers and neck nodes in a young child suggests PFAPA. One prednisone dose aborting the attack supports it. <sup class="c" data-ref="Thomas1999,SoonLaxer2017" title="Source 247,258">247,258</sup>`},
 {l:'Infant onset, vaccine trigger, diarrhoea',ids:['mkd'],say:`MKD starts in infancy (median 0.5 years) and vaccines triggered the first flare in 63% in one series. Test: urinary mevalonic acid during an attack. <sup class="c" data-ref="TerHaar2016,Favier2016,Jeyaratnam2016" title="Source 62,113,256">62,113,256</sup>`},
 {l:'Pain moves to the right lower quadrant and keeps worsening',ids:['app'],say:`Even in a known FMF patient, a shift from diffuse to right-lower-quadrant pain was the best predictor of a truly inflamed appendix. Imaging and surgical review. <sup class="c" data-ref="Lidar2008" title="Source 150">150</sup>`},
 {l:'No fever; dark urine, low sodium, neuropathy',ids:['aip'],say:`Acute porphyria: severe pain with few peritoneal signs and usually no fever. Test: urinary porphobilinogen on a single spot sample. <sup class="c" data-ref="Anderson2005" title="Source 4">4</sup>`},
 {l:'Hives-like rash after cold',ids:['caps'],say:`Urticarial rash with cold or stress triggers points to CAPS. Test: <i>NLRP3</i> sequencing, including somatic mosaicism. <sup class="c" data-ref="Gattorno2019,KuemmerleDeschner2017" title="Source 75,138">75,138</sup>`},
 {l:'Chronic diarrhoea, weight loss, poor growth',ids:['ibd'],say:`Persistent bowel symptoms point to IBD. Tests: faecal calprotectin, then endoscopy with biopsy. <sup class="c" data-ref="Maaser2019" title="Source 161">161</sup>`},
 {l:'Daily spikes, salmon rash, very high ferritin',ids:['aosd'],say:`Still's disease (AOSD/sJIA). In FMF attacks ferritin and platelets do not rise, which helps separate the two. <sup class="c" data-ref="Yamaguchi1992,Korkmaz2002" title="Source 136,277">136,277</sup>`},
 {l:'Mouth and genital ulcers, eye inflammation',ids:['beh'],say:`Behçet disease: ICBD score of 4 or more classifies it; a pathergy test and an eye exam help. <sup class="c" data-ref="ICBD2014" title="Source 104">104</sup>`}
];
inits.ddx=()=>{
  const svg=$('#ddSvg'),rg=$('#ddT');let sel='fmf',clue=-1;
  const KC={f:'var(--terra)',u:'var(--warn)',a:'var(--muted)',c:'var(--sea)',p:'var(--bad)',d:'var(--terra)'};
  function draw(t){const day=t*60;let s='';const hl=clue>=0?DD_CLUE[clue].ids:null;const act=[];
    /* narrow: the disease name sits above its own track, so the 60-day window gets the full width */
    const N=vb(svg,'720 420','400 604');
    const L=N?{W:400,X0:10,X1:386,RH:52,Y0:46,bo:20,bh:22,bx:342,bw:52}
             :{W:720,X0:178,X1:648,RH:35,Y0:28,bo:6,bh:22,bx:656,bw:56};
    const X0=L.X0,X1=L.X1,RH=L.RH,Y0=L.Y0,xd=d=>X0+d/60*(X1-X0);
    const yEnd=Y0+RH*10;
    if(N){s+=`<text x="4" y="13" class="t-xs">60-DAY WINDOW · LENGTHS CITED, SPACING SCHEMATIC</text>`;
      for(let d=0;d<=60;d+=10)s+=`<text x="${f1(xd(d))}" y="33" class="t-xs t-mid">${d}</text>`}
    else{for(let d=0;d<=60;d+=10)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${Y0-4}" y2="${yEnd}" class="grid"/>`;
      s+=`<text x="${X0}" y="14" class="t-xs">TYPICAL EPISODE PATTERN · 60-DAY WINDOW · LENGTHS CITED, SPACING SCHEMATIC</text><text x="684" y="14" class="t-xs t-mid">source</text>`}
    for(let d=0;d<=60;d+=10)s+=`<text x="${f1(xd(d))}" y="${yEnd+16}" class="t-xs t-mid">${d}</text>`;
    s+=`<text x="${X1}" y="${yEnd+32}" class="t-xs t-end">days</text>`;
    DD_DZ.forEach((D,i)=>{const y0=Y0+i*RH,bt=y0+L.bo,bh=L.bh,dim=hl&&!hl.includes(D.id);let g='';
      if(D.id==='fmf')g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:var(--terra-soft);opacity:.75"/>`;
      if(hl&&!dim)g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:var(--sea-soft)"/>`;
      if(N)g+=`<text x="8" y="${y0+14}" class="t-lbl">${D.n}</text><text x="336" y="${y0+14}" class="t-xs t-end">${D.sub}</text>`;
      else g+=`<text x="10" y="${y0+16}" class="t-lbl">${D.n}</text><text x="10" y="${y0+29}" class="t-xs">${D.sub}</text>`;
      if(N)for(let d=0;d<=60;d+=10)g+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${bt-3}" y2="${bt+bh+3}" class="grid"/>`;
      g+=`<line x1="${X0}" x2="${X1}" y1="${bt+bh}" y2="${bt+bh}" class="axis"/>`;
      let on=false;
      D.ep.forEach(([st,du,k])=>{const c=KC[k],xa=xd(st),xb=xd(Math.min(60,st+du)),lit=clamp((day-st)/du),xl=lerp(xa,xb,lit),live=day>=st&&day<=st+du;if(live)on=true;
        if(k==='f'||k==='u'||k==='a'){const dash=k==='a'?'stroke-dasharray:3 2;':'';
          g+=`<rect x="${f1(xa)}" y="${bt}" width="${f1(Math.max(2,xb-xa))}" height="${bh}" rx="4" style="fill:${c};opacity:.13"/><rect x="${f1(xa)}" y="${bt}" width="${f1(Math.max(2,xb-xa))}" height="${bh}" rx="4" style="fill:none;stroke:${c};stroke-width:1;opacity:.5;${dash}"/>`;
          if(lit>0)g+=`<rect x="${f1(xa)}" y="${bt}" width="${f1(Math.max(1.5,xl-xa))}" height="${bh}" rx="4" style="fill:${c};opacity:${k==='a'?.55:.9}"/>`;
          if(live)g+=`<rect x="${f1(xa-2)}" y="${bt-2}" width="${f1(Math.max(2,xb-xa)+4)}" height="${bh+4}" rx="5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`}
        if(k==='c'){const wave=x=>bt+bh-(8+5*Math.sin(x/9)+3*Math.sin(x/23));let gp='',lp='';
          for(let x=xa;x<=xb;x+=4){gp+=(gp?'L':'M')+f1(x)+' '+f1(wave(x));if(x<=xd(day))lp+=(lp?'L':'M')+f1(x)+' '+f1(wave(x))}
          g+=`<path d="${gp} L${f1(xb)} ${bt+bh} L${f1(xa)} ${bt+bh}Z" style="fill:${c};opacity:.13"/>`;
          if(lp){const xe=Math.min(xb,xd(day));g+=`<path d="${lp} L${f1(xe)} ${bt+bh} L${f1(xa)} ${bt+bh}Z" style="fill:${c};opacity:.75"/>`}}
        if(k==='p'){const yb=bt+bh,xp=Math.min(xb,xd(day)),hp=bh*clamp((xp-xa)/(xb-xa));
          g+=`<path d="M${f1(xa)} ${yb} L${f1(xb)} ${bt} L${f1(xb)} ${yb}Z" style="fill:${c};opacity:.13"/>`;
          if(day>st)g+=`<path d="M${f1(xa)} ${yb} L${f1(xp)} ${f1(yb-hp)} L${f1(xp)} ${yb}Z" style="fill:${c};opacity:.85"/>`;
          g+=`<text x="${f1(xb+5)}" y="${bt+15}" class="t-xs" style="fill:${day>=st+du?'var(--bad)':'var(--muted)'};font-weight:${day>=st+du?700:500}">→ surgery</text>`}
        if(k==='d'){const yb=bt+bh;g+=`<rect x="${f1(xa)}" y="${yb-6}" width="${f1(xb-xa)}" height="6" style="fill:${c};opacity:.13"/>`;
          for(let q=0;q<du;q++){const xs=xd(st+q+.35),ok=day>=st+q+.35;g+=`<path d="M${f1(xs-3)} ${yb} L${f1(xs)} ${bt+1} L${f1(xs+3)} ${yb}Z" style="fill:${c};opacity:${ok?.9:.15}"/>`}
          if(live)g+=`<rect x="${f1(xa-2)}" y="${bt-2}" width="${f1(xb-xa+4)}" height="${bh+4}" rx="5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`}
      });
      if(D.id==='pfapa'){const a=xd(4+4.8),b=xd(32);g+=`<line x1="${f1(a+3)}" x2="${f1(b-3)}" y1="${bt+bh/2}" y2="${bt+bh/2}" style="stroke:var(--muted);stroke-dasharray:2 3"/><text x="${f1((xd(4)+xd(32))/2+20)}" y="${bt+bh/2-4}" class="t-xs t-mid">~28 d</text>`}
      if(on)act.push(D.n);
      const cited=D.src==='cited';
      g+=`<rect x="${L.bx}" y="${y0+(N?2:9)}" width="${L.bw}" height="17" rx="5" style="fill:${cited?'var(--good-soft)':'var(--warn-soft)'}"/><text x="${L.bx+L.bw/2}" y="${y0+(N?14:21)}" class="t-xs t-mid" style="fill:${cited?'var(--good)':'var(--warn)'};font-weight:700">${cited?'cited':'teaching'}</text>`;
      if(D.id===sel)g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
      s+=`<g class="clk" data-dd="${D.id}" style="opacity:${dim?.28:1}"><rect x="0" y="${y0}" width="${L.W}" height="${RH}" style="fill:transparent"/>${g}</g>`});
    if(N){DD_DZ.forEach((D,i)=>{const bt=Y0+i*RH+L.bo;s+=`<line x1="${f1(xd(day))}" x2="${f1(xd(day))}" y1="${bt-5}" y2="${bt+L.bh+5}" style="stroke:var(--ink);stroke-width:1.5;opacity:.6"/>`});
      s+=`<path d="M${f1(xd(day)-5)} 38 L${f1(xd(day)+5)} 38 L${f1(xd(day))} 46Z" style="fill:var(--ink)"/>`}
    else s+=`<line x1="${f1(xd(day))}" x2="${f1(xd(day))}" y1="${Y0-6}" y2="${yEnd}" style="stroke:var(--ink);stroke-width:1.5;opacity:.6"/><circle cx="${f1(xd(day))}" cy="${Y0-6}" r="4" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    $('#ddRead').innerHTML=`<span>day <b>${Math.floor(day)}</b></span><span>active now <b>${act.length?act.join(', '):'none'}</b></span>`;
  }
  function note(){const D=DD_DZ.find(x=>x.id===sel);const cited=D.src==='cited';
    $('#ddNote').innerHTML=`<div class="kicker">${D.id==='fmf'?'The reference pattern':'Compared with FMF'}</div><h4>${D.full}</h4>
     <dl class="kv"><div><dt>Gene / inheritance</dt><dd>${D.gene}</dd></div><div><dt>Typical attack length</dt><dd>${D.len}</dd></div><div><dt>Key features</dt><dd>${D.feat}</dd></div><div><dt>Distinguishing test</dt><dd>${D.test}</dd></div>
     <div><dt>Rhythm in the animation</dt><dd><span class="tag ${cited?'good':'warn'}">${cited?'cited':'general teaching'}</span> ${D.pn}</dd></div></dl>`;
    $$('[data-ddp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ddp===sel));
    $$('#ddTbl tr').forEach(r=>r.style.outline=r.dataset.dd===sel?'2px solid var(--ink)':'')}
  function pick(id){sel=id;note();draw(+rg.value)}
  $('#ddPick').innerHTML=DD_DZ.map(D=>`<button class="btn" data-ddp="${D.id}" aria-pressed="${D.id===sel}">${D.n}</button>`).join('');
  $('#ddPick').addEventListener('click',e=>{const b=e.target.closest('[data-ddp]');if(b)pick(b.dataset.ddp)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-dd]');if(g)pick(g.dataset.dd)});
  $('#ddTbl').innerHTML=DD_DZ.map(D=>`<tr data-dd="${D.id}"${D.id==='fmf'?' class="hl"':''}><th>${D.full}</th><td>${D.gene}</td><td>${D.len}</td><td>${D.feat}</td><td>${D.test}</td></tr>`).join('');
  $('#ddTbl').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const r=e.target.closest('tr[data-dd]');if(r){pick(r.dataset.dd);$('#ddNote').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  function clueOut(){const o=$('#ddClueOut');
    if(clue<0){o.innerHTML=`<span class="kicker">No clue selected</span><span>Choose a clue above. FMF is the reference row, shaded in every view.</span>`;return}
    const C=DD_CLUE[clue];o.innerHTML=`<span class="kicker">Points toward</span><b class="big">${C.ids.map(i=>DD_DZ.find(d=>d.id===i).full).join(' · ')}</b><span>${C.say}</span>`}
  $('#ddClues').innerHTML=DD_CLUE.map((c,i)=>`<button class="btn" data-ddc="${i}" aria-pressed="false">${c.l}</button>`).join('');
  $('#ddClues').addEventListener('click',e=>{const b=e.target.closest('[data-ddc]');if(!b)return;const i=+b.dataset.ddc;clue=clue===i?-1:i;
    $$('[data-ddc]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.ddc===clue));if(clue>=0)sel=DD_CLUE[clue].ids[0];note();clueOut();draw(+rg.value)});
  playWire(rg,$('#ddPlay'),draw,18000,'Replay','ddx');
  note();clueOut();draw(+rg.value);
};
/* =============== 4.1 the treatment ladder =============== */
const LD_RUNGS=[
 {t:'Clinical diagnosis',s:'EULAR: colchicine from this point'},
 {t:'Starting dose by age',s:'EULAR 2016 bands, single or divided'},
 {t:'Maximum tolerated dose',s:'adherence first · CRP/SAA every 3 months'},
 {t:'Resistant or intolerant',s:'the definitions, and what they require'},
 {t:'Add IL-1 blockade',s:'colchicine continues alongside it'},
 {t:'Other options',s:'weaker or negative evidence'}
];
const LD_STEPS=[
 {from:0,at:.04,k:'Rung 1 · Start',t:'Colchicine at clinical diagnosis',
  txt:'EULAR 2016 recommendation 3 says colchicine should start as soon as a clinical diagnosis of FMF is made (level of evidence 1b). The 2024 update keeps this, and both versions allow the daily amount to be given once a day or split through the day. A Cochrane review of 10 randomised trials in 312 participants, and the 2025 systematic review written for the update, found once-daily and divided dosing equivalent. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025,Yin2022,Sag2025" title="Source 199,203,222,229,283">199,203,222,229,283</sup>',
  pt:'Treatment does not wait for the gene test. Once the clinical picture fits FMF, published guidance starts colchicine.',
  hook:'Colchicine is <b>prophylaxis</b>, started on clinical grounds, taken for life. Genetics support the diagnosis; they do not gate the treatment.'},
 {from:.16,at:.2,k:'Rung 2 · Dose',t:'2016 starting doses by age',
  txt:'The 2016 paper gives starting bands of up to 0.5 mg a day under age 5, 0.5 to 1.0 mg a day at ages 5 to 10, and 1.0 to 1.5 mg a day over age 10 and in adults. The stated ceilings are 2 mg a day in children and 3 mg a day in adults, and the 2024 update keeps the same two ceilings. These are published figures quoted for study. The dose for any individual is set by their clinician. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025,Ozen2017" title="Source 199,200,203,222">199,200,203,222</sup>',
  pt:'Published guidance starts children low and adults a little higher, with a ceiling for each.',
  hook:'Ceilings to remember: <b>2 mg/day children, 3 mg/day adults</b>. Starting band over age 10 is 1.0 to 1.5 mg/day.'},
 {from:.32,at:.36,k:'Rung 3 · Titrate',t:'Up to the maximum tolerated dose',
  txt:'If attacks or subclinical inflammation continue in a patient who is taking the tablets, the 2016 guideline raises the dose in steps of about 0.5 mg a day, and asks for CRP or SAA at least every 3 months while the dose is being escalated. Those escalation statements are about attacks or inflammation that persist over time, not about stopping an attack already under way. Adherence is checked first because in one Israeli clinic only 13% of patients filled every prescription over a year, and poor adherence is a frequent reason for apparent resistance. <sup class="c" data-ref="Ozen2016,Ozen2017,RheumNow2025,BenChetrit2009D" title="Source 14,199,200,222">14,199,200,222</sup>',
  pt:'If attacks continue, the dose goes up step by step. Before that, the first question is whether the tablets are actually being taken every day.',
  hook:'Order matters: <b>adherence → maximum tolerated dose → only then "resistant"</b>.'},
 {from:.48,at:.52,k:'Rung 4 · Define',t:'Resistant, or intolerant',
  txt:'EULAR 2016: an adherent patient who keeps having one or more attacks a month despite the maximum tolerated dose for at least 6 months may be considered a non-responder. The 2021 modified-Delphi consensus defines resistance as recurrent attacks averaging at least one a month over 3 months, or persistent laboratory inflammation between attacks, at the maximum tolerated dose with adherence confirmed. Intolerance is the separate situation where side effects stop the dose from being raised; roughly 5 to 10% are resistant and another 2 to 5% intolerant. <sup class="c" data-ref="Ozen2016,Ozen2021,Ozen2017,BenChetrit2018Textbook" title="Source 16,199,200,202">16,199,200,202</sup>',
  pt:'"Resistant" is a defined label, not a feeling. It needs a minimum number of attacks, a minimum time, the highest tolerated dose and proof the tablets were taken.',
  hook:'2016: <b>≥1 attack/month for ≥6 months at max tolerated dose</b>. 2021 Delphi: <b>≥1/month over 3 months, or persistent inflammation between attacks</b>.'},
 {from:.64,at:.68,k:'Rung 5 · Add on',t:'IL-1 blockade, with colchicine continuing',
  txt:'Biologics are indicated in resistant disease and colchicine is continued alongside them, because colchicine may still lower amyloid risk. The three IL-1 blockers studied in FMF are anakinra (an IL-1 receptor antagonist, given daily), canakinumab (an anti-IL-1β antibody, every 4 weeks) and rilonacept (an IL-1 trap, given weekly in its trial). They are not interchangeable: canakinumab is the one with an FMF dose written into the US prescribing information, while the anakinra and rilonacept evidence in FMF rests on two small randomised trials of 25 and 14 patients. The 2024 update names IL-1 targeting drugs as the add-on with the strongest evidence, and adds statements on optimising the biologic dose and on tapering or stopping once remission is reached. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025,BenZvi2017,DeBenedetti2018,Hashkes2012,IlarisPIG,Sag2025" title="Source 20,44,93,105,199,203,222,229">20,44,93,105,199,203,222,229</sup>',
  pt:'If attacks keep coming at the top dose, a drug that blocks the IL-1 signal is added. The colchicine does not stop.',
  hook:'Three IL-1 blockers, three rhythms: <b>anakinra daily, canakinumab every 4 weeks, rilonacept weekly</b>. All are add-ons, not replacements, and the evidence behind them is not equal.'},
 {from:.82,at:.9,k:'Rung 6 · Beyond',t:'Other options, weaker evidence',
  txt:'Tocilizumab blocks the IL-6 receptor. Both of its randomised trials failed: a German phase II trial in 25 patients missed its primary endpoint, although SAA normalised, and a Japanese phase III trial also missed its primary endpoint (rate ratio 0.691, P=0.577). Its lower attack recurrence in that trial (HR 0.457) is a secondary finding in a trial that did not meet its primary endpoint, so neither trial establishes that tocilizumab works in FMF. TNF inhibitors have been used mainly in colchicine-resistant patients with joint involvement, in observational studies only; chronic arthritis affects about 5% of patients and may need DMARDs, joint injections or biologics. For JAK inhibitors there are only case series of four patients or fewer: four patients refractory to IL-1, anti-TNF and tocilizumab improved on tofacitinib, and no randomised trial of any JAK inhibitor in FMF exists. No established mechanism links JAK/STAT signalling to pyrin inflammasome activation, whose output is IL-1β, IL-18 and gasdermin D, so any benefit would have to act on downstream amplification rather than on the FMF lesion itself. <sup class="c" data-ref="Henes2022,Koga2022,Mertz2025,Ozen2016,Karadeniz2020,Park2016" title="Source 98,119,132,172,199,207">98,119,132,172,199,207</sup>',
  pt:'Past IL-1 blockade the evidence thins out fast: one drug class failed both its randomised trials, one has only observational support, and one has only a handful of reported patients.',
  hook:'Tocilizumab: <b>both randomised trials missed their primary endpoints</b>; SAA normalised in the German one. Anti-TNF: joints, observational. JAK inhibitors: <b>case series of four or fewer, and no pyrin-pathway mechanism</b>.'}
];
inits.ladder=()=>{
  const svg=$('#ldSvg'),rg=$('#ldT');
  const wrapT=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  /* each rung shows what it means: colchicine tablets whose count rises with the dose,
     an injection at the IL-1 rung, a dashed vial where the evidence thins out, and a
     colchicine thread that keeps running up alongside the biologic rungs */
  const LD_GLY=[{p:1},{p:2},{p:4},{p:4,atk:1},{syr:1},{vial:1}];
  const pill=(x,y,r)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--crocus);stroke:var(--crocus);stroke-width:1.2"/><line x1="${f1(x-r*.5)}" x2="${f1(x+r*.5)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--panel);stroke-width:1.1;opacity:.75"/>`;
  const syringe=(x,y)=>`<g transform="translate(${f1(x)} ${f1(y)})"><line x1="0" x2="8" y1="0" y2="0" style="stroke:var(--sea);stroke-width:1.6"/><rect x="-24" y="-6.5" width="24" height="13" rx="2.5" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/><rect x="-22.5" y="-4.5" width="11" height="9" rx="1.5" style="fill:var(--sea)"/><line x1="-30" x2="-24" y1="0" y2="0" style="stroke:var(--sea);stroke-width:1.6"/><line x1="-30" x2="-30" y1="-5" y2="5" style="stroke:var(--sea);stroke-width:2.2"/></g>`;
  const vial=(x,y)=>`<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-17" y="-4" width="16" height="15" rx="2.5" style="fill:none;stroke:var(--warn);stroke-width:1.5;stroke-dasharray:3 3"/><rect x="-13.5" y="-10" width="9" height="6" rx="1.5" style="fill:none;stroke:var(--warn);stroke-width:1.4"/></g>`;
  const atk=(x,y)=>`<path d="M${f1(x-5)} ${f1(y+5)}L${f1(x)} ${f1(y-5)}L${f1(x+5)} ${f1(y+5)}z" style="fill:var(--terra)"/>`;
  function draw(t){
    const N=vb(svg,'720 430','400 772');
    const L=N
      ? {X0:24,X1:358,BX:38,BW:306,TX:52,RY0:360,P:58,BH:48,TY:-6,SY:14,GR:336,GP:13,TR:4.5,GY:-11,THX:288,CLX:372,
         PX:14,PY:410,PW:372,QX:14,QY:626,QW:372}
      : {X0:72,X1:404,BX:88,BW:310,TX:102,RY0:392,P:62,BH:40,TY:-3,SY:13,GR:392,GP:14,TR:5,GY:0,THX:336,CLX:420,
         PX:450,PY:40,PW:258,QX:450,QY:256,QW:258};
    const RY=i=>L.RY0-i*L.P;
    let s=`<defs>${marker('ldA','var(--sea)')}</defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const lit=LD_RUNGS.map((r,i)=>ease(ramp(t,LD_STEPS[i].from+.005,LD_STEPS[i].from+.085)));
    // rails
    const topY=RY(5)-L.BH/2-6,botY=RY(0)+L.BH/2+8;
    [L.X0,L.X1].forEach(x=>{s+=`<line x1="${x}" x2="${x}" y1="${botY}" y2="${topY}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/>`;
      const h=(botY-topY)*clamp(lit.reduce((a,b)=>a+b,0)/6);
      s+=`<line x1="${x}" x2="${x}" y1="${botY}" y2="${f1(botY-h)}" style="stroke:var(--sea);stroke-width:5;stroke-linecap:round"/>`});
    s+=`<text x="${L.X0}" y="${topY-10}" class="t-sm" style="fill:var(--sea)">ESCALATION ↑</text>`;
    // rungs
    LD_RUNGS.forEach((r,i)=>{const cy=RY(i),o=lit[i],g=LD_GLY[i],gy=cy+L.GY;
      s+=`<g class="clk" data-rung="${i}">`;
      s+=`<rect x="${L.BX}" y="${f1(cy-L.BH/2)}" width="${L.BW}" height="${L.BH}" rx="11" style="fill:${o>.5?'var(--sea-soft)':'var(--panel-2)'};stroke:${o>.5?'var(--sea)':'var(--line)'};stroke-width:${f1(1+1.4*o)}"/>`;
      s+=`<text x="${L.TX}" y="${f1(cy+L.TY)}" class="t-lbl" style="fill:${o>.5?'var(--sea)':'var(--muted)'}">${r.t}</text>`;
      s+=`<text x="${L.TX}" y="${f1(cy+L.SY)}" class="t-xs">${r.s}</text>`;
      s+=`<g style="opacity:${f1(.3+.7*o)}">`;
      if(g.p)for(let k=0;k<g.p;k++)s+=pill(L.GR-k*L.GP,gy,L.TR);
      if(g.atk)s+=atk(L.GR-1.5*L.GP,gy+L.TR+9);
      if(g.syr)s+=syringe(L.GR-8,gy);
      if(g.vial)s+=vial(L.GR+1,gy);
      s+='</g>';
      s+=`<circle cx="${L.X0}" cy="${cy}" r="13" style="fill:${o>.5?'var(--sea)':'var(--panel)'};stroke:${o>.5?'var(--sea)':'var(--line)'};stroke-width:2"/>`;
      s+=`<text x="${L.X0}" y="${cy+4}" class="t-xs t-mid" style="fill:${o>.5?'var(--on-sea)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+='</g>'});
    // the colchicine thread: the tablets do not stop when the injection starts
    s+=`<g style="opacity:${f1(.25+.75*lit[4])}">`;
    s+=`<line x1="${L.THX}" x2="${L.THX}" y1="${f1(RY(3)-L.BH/2)}" y2="${f1(topY-4)}" style="stroke:var(--crocus);stroke-width:3;stroke-linecap:round;opacity:.6"/>`;
    [4,5].forEach(i=>{s+=pill(L.THX,RY(i),L.TR-.5)});
    s+=`<text x="${L.GR+5}" y="${f1(topY-10)}" class="t-xs t-end" style="fill:var(--crocus)">colchicine continues ↑</text>`;
    s+='</g>';
    // climber
    const pos=clamp((t-.04)/.86)*5, cyC=RY(0)-pos*L.P;
    s+=`<g transform="translate(${L.CLX} ${f1(cyC)})"><circle r="9" style="fill:var(--terra);opacity:.25"/><circle r="5" style="fill:var(--terra)"/></g>`;
    s+=N?`<text transform="rotate(90 ${L.CLX+16} ${f1(cyC)})" x="${L.CLX+16}" y="${f1(cyC)}" class="t-xs t-mid" style="fill:var(--terra)">you are here</text>`
        :`<text x="${L.CLX+14}" y="${f1(cyC+4)}" class="t-xs" style="fill:var(--terra)">you are here</text>`;
    // side lane: during an attack
    const o2=ease(ramp(t,.26,.44));
    s+=`<g style="opacity:${f1(.15+.85*o2)}"><rect x="${L.PX}" y="${L.PY}" width="${L.PW}" height="196" rx="12" style="fill:var(--panel);stroke:var(--terra);stroke-width:1.6"/>`;
    s+=`<text x="${L.PX+14}" y="${L.PY+22}" class="t-sm" style="fill:var(--terra)">${N?'DURING AN ATTACK · WHAT 2016 AND 2024 SAY':'DURING AN ATTACK · 2016 AND 2024'}</text>`;
    const lines=['continue the usual colchicine dose','NSAIDs for symptoms','always consider other causes,','for example appendicitis'];
    lines.forEach((Ln,i)=>{const oo=ease(ramp(t,.28+i*.03,.36+i*.03));
      s+=`<text x="${L.PX+26}" y="${L.PY+48+i*20}" class="t-xs" style="opacity:${f1(oo)};fill:var(--ink)">${Ln}</text>`;
      if(i<3)s+=`<circle cx="${L.PX+16}" cy="${L.PY+44+i*20}" r="2.6" style="fill:var(--terra);opacity:${f1(oo)}"/>`});
    s+=`<line x1="${L.PX+14}" x2="${L.PX+L.PW-14}" y1="${L.PY+138}" y2="${L.PY+138}" class="grid"/>`;
    ['2016 only: a prodrome dose rise is','reported but unproven. In stressful','periods an increase may be considered.']
      .forEach((Ln,i)=>{s+=`<text x="${L.PX+14}" y="${L.PY+156+i*13}" class="t-xs">${Ln}</text>`});
    s+='</g>';
    // target box
    const o3=ease(ramp(t,.55,.72));
    s+=`<g style="opacity:${f1(.12+.88*o3)}"><rect x="${L.QX}" y="${L.QY}" width="${L.QW}" height="136" rx="12" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+22}" class="t-sm" style="fill:var(--sea)">THE TWO TARGETS</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+46}" class="t-lbl">1 · no or minimal attacks</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+70}" class="t-lbl">2 · inflammation controlled</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+87}" class="t-xs">between attacks, by SAA or CRP</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+112}" class="t-xs">2024 update: both targets, to</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+125}" class="t-xs">prevent damage over a lifetime</text>`;
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(LD_STEPS,t);setSt(p);
    $('#ldNote').innerHTML=noteHTML(LD_STEPS[p]);
    $('#ldCap').textContent=`Rung ${p+1} of 6 lit. Click any rung to jump to it. Schematic, not to scale.`;
  }
  const stop=playWire(rg,$('#ldPlay'),draw,17000,'Replay','ladder');
  const setSt=stepWire($('#ldSteps'),LD_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-rung]');if(!g)return;stop();const a=LD_STEPS[+g.dataset.rung].at;rg.value=a;draw(a)});
  draw(+rg.value);

  /* ---- trial bars ---- */
  const bs=$('#ldBars'),br=$('#ldB');
  const LD_PCT=[
   {l:'CLUSTER',s2:'crFMF 150 mg',a:61,p:6},
   {l:'CLUSTER',s2:'MKD / HIDS',a:35,p:6},
   {l:'CLUSTER',s2:'TRAPS',a:45,p:8},
   {l:'escalated',s2:'crFMF 300 mg',a:71,p:null},
   {l:'every 8 weeks',s2:'stayed controlled',a:46,p:null}
  ];
  const LD_ATT=[
   {l:'Anakinra RCT',s2:'n=25, attacks/month',a:1.7,p:3.5,ad:'1.7',pd:'3.5'},
   {l:'Rilonacept',s2:'n=14, median/month',a:0.77,p:2.00,ad:'0.77',pd:'2.00'}
  ];
  const LD_CAVA='63 FMF patients, randomised at a flare · endpoint: flare resolution, no new flare to week 16';
  const LD_CAVB='last two bars have no placebo comparator: 300 mg escalation, and extended every-8-week dosing';
  const LD_COCH='Cochrane re-analysis, moderate certainty: no clear difference in the number of patients having attacks for anakinra (RR 0.76, 0.54–1.07) or rilonacept (RR 0.87, 0.59–1.26). Only canakinumab reached RR 0.41 (0.26–0.65).';
  const LD_TOCI=[['phase II (n=25): missed its primary','ink'],['endpoint, but SAA normalised','ink'],['phase III: missed too (RR 0.691,',''],['P=0.577); no efficacy shown','']];
  /* narrow: the grouped vertical bars become horizontal bars, one trial per block,
     each trial's name on its own line above its bars, so nothing is squeezed */
  function drawBN(t){
    const BX0=14,BX1=316,pw=BX1-BX0;let s='';
    s+=`<text x="14" y="24" class="t-sm" style="fill:var(--sea)">CANAKINUMAB IN CLUSTER</text>`;
    s+=`<text x="14" y="38" class="t-xs">complete response at week 16 vs placebo</text>`;
    const pairsOf=g=>g.p==null?[[g.a,'var(--sea)','']]:[[g.p,'var(--muted)','placebo'],[g.a,'var(--sea)','drug']];
    const aTop=52, aH=LD_PCT.reduce((a,g)=>a+(g.p==null?44:62),0), aBot=aTop+aH-10;
    [0,25,50,75,100].forEach(v=>{const x=lerp(BX0,BX1,v/100);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${aTop}" y2="${aBot}" class="grid"/><text x="${f1(x)}" y="${aBot+16}" class="t-xs t-mid">${v}%</text>`});
    let y=aTop;
    LD_PCT.forEach((g,i)=>{const k=ease(ramp(t,i*.1,i*.1+.42)),prs=pairsOf(g);
      s+=`<text x="14" y="${y+10}" class="t-xs" style="fill:var(--ink)">${g.l} · ${g.s2}</text>`;
      prs.forEach((pr,j)=>{const by=y+16+j*18,w=pw*pr[0]/100*k;
        s+=`<rect x="${BX0}" y="${by}" width="${f1(w)}" height="14" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(BX0+w+6)}" y="${by+11}" class="t-xs" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[0]}%${pr[2]?' '+pr[2]:''}</text>`});
      y+=prs.length>1?62:44});
    y=aBot+34;
    wrapT(LD_CAVA,58).concat(wrapT(LD_CAVB,58)).forEach(l=>{s+=`<text x="14" y="${y}" class="t-xs">${l}</text>`;y+=14});
    // panel B
    y+=12;
    s+=`<text x="14" y="${y}" class="t-sm" style="fill:var(--terra)">ATTACKS PER MONTH · lower is better</text>`;y+=14;
    s+=`<text x="14" y="${y}" class="t-xs">as each trial reported it</text>`;y+=14;
    const bTop=y, bBot=bTop+LD_ATT.length*62-10;
    [0,1,2,3,4].forEach(v=>{const x=lerp(BX0,BX1,v/4);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${bTop}" y2="${bBot}" class="grid"/><text x="${f1(x)}" y="${bBot+16}" class="t-xs t-mid">${v}</text>`});
    LD_ATT.forEach((g,i)=>{const k=ease(ramp(t,.4+i*.12,.86+i*.12)),yy=bTop+i*62;
      s+=`<text x="14" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${g.l} · ${g.s2}</text>`;
      [[g.p,'var(--muted)',g.pd,'placebo'],[g.a,'var(--sea)',g.ad,'drug']].forEach((pr,j)=>{const by=yy+16+j*18,w=pw*pr[0]/4*k;
        s+=`<rect x="${BX0}" y="${by}" width="${f1(w)}" height="14" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(BX0+w+6)}" y="${by+11}" class="t-xs" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[2]} ${pr[3]}</text>`});});
    // tocilizumab box
    y=bBot+34;
    const o=ease(ramp(t,.75,1));
    s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="14" y="${y}" width="372" height="92" rx="11" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6"/>`;
    s+=`<text x="28" y="${y+22}" class="t-sm" style="fill:var(--warn)">TOCILIZUMAB · IL-6 RECEPTOR</text>`;
    LD_TOCI.forEach((l,i)=>{s+=`<text x="28" y="${y+42+i*13+(i>1?5:0)}" class="t-xs"${l[1]?' style="fill:var(--ink)"':''}>${l[0]}</text>`});
    s+='</g>';
    // Cochrane caveat, on the face of the chart
    y+=108;
    s+=`<line x1="14" x2="386" y1="${y}" y2="${y}" class="grid"/>`;y+=18;
    wrapT(LD_COCH,58).forEach(l=>{s+=`<text x="14" y="${y}" class="t-xs" style="fill:var(--warn)">${l}</text>`;y+=14});
    return s;
  }
  function drawB(t){
    const N=vb(bs,'720 456','400 800');
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    if(N){bs.innerHTML=s+drawBN(t);return}
    // panel A
    const AX0=118,AX1=700,AY=206,ATOP=56,pc=v=>AY-(AY-ATOP)*v/100;
    s+=`<text x="14" y="34" class="t-sm" style="fill:var(--sea)">CANAKINUMAB IN CLUSTER · complete response at week 16 vs placebo</text>`;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${AX0}" x2="${AX1}" y1="${f1(pc(v))}" y2="${f1(pc(v))}" class="grid"/><text x="${AX0-8}" y="${f1(pc(v)+3)}" class="t-xs t-end">${v}%</text>`});
    s+=`<line x1="${AX0}" x2="${AX1}" y1="${AY}" y2="${AY}" class="axis"/>`;
    const gw=(AX1-AX0)/LD_PCT.length;
    LD_PCT.forEach((g,i)=>{const cx=AX0+gw*(i+.5),k=ease(ramp(t,i*.1,i*.1+.42));
      const bw=28,pairs=g.p==null?[[g.a,'var(--sea)','']]:[[g.p,'var(--muted)','placebo'],[g.a,'var(--sea)','drug']];
      pairs.forEach((pr,j)=>{const n=pairs.length,x=cx-(n*bw+8*(n-1))/2+j*(bw+8),h=(AY-ATOP)*pr[0]/100*k;
        s+=`<rect x="${f1(x)}" y="${f1(AY-h)}" width="${bw}" height="${f1(h)}" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(x+bw/2)}" y="${f1(AY-h-6)}" class="t-xs t-mid" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[0]}%</text>`});
      s+=`<text x="${f1(cx)}" y="${AY+18}" class="t-xs t-mid" style="fill:var(--ink)">${g.l}</text>`;
      s+=`<text x="${f1(cx)}" y="${AY+31}" class="t-xs t-mid">${g.s2}</text>`});
    s+=`<text x="${AX0}" y="${AY+44}" class="t-xs">63 FMF patients, randomised at a flare · endpoint: flare resolution, no new flare to week 16</text>`;
    s+=`<text x="${AX0}" y="${AY+56}" class="t-xs">last two bars have no placebo comparator: 300 mg escalation, and extended every-8-week dosing</text>`;
    // panel B
    const BX0=118,BX1=404,BY=372,BTOP=286,at=v=>BY-(BY-BTOP)*v/4;
    s+=`<text x="14" y="276" class="t-sm" style="fill:var(--terra)">ATTACKS PER MONTH · as each trial reported it (lower is better)</text>`;
    [0,1,2,3,4].forEach(v=>{s+=`<line x1="${BX0}" x2="${BX1}" y1="${f1(at(v))}" y2="${f1(at(v))}" class="grid"/><text x="${BX0-8}" y="${f1(at(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${BX0}" x2="${BX1}" y1="${BY}" y2="${BY}" class="axis"/>`;
    const gw2=(BX1-BX0)/LD_ATT.length;
    LD_ATT.forEach((g,i)=>{const cx=BX0+gw2*(i+.5),k=ease(ramp(t,.4+i*.12,.86+i*.12)),bw=30;
      [[g.p,'var(--muted)',g.pd],[g.a,'var(--sea)',g.ad]].forEach((pr,j)=>{const x=cx-(2*bw+8)/2+j*(bw+8),h=(BY-BTOP)*pr[0]/4*k;
        s+=`<rect x="${f1(x)}" y="${f1(BY-h)}" width="${bw}" height="${f1(h)}" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(x+bw/2)}" y="${f1(BY-h-6)}" class="t-xs t-mid" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[2]}</text>`});
      s+=`<text x="${f1(cx)}" y="${BY+18}" class="t-xs t-mid" style="fill:var(--ink)">${g.l}</text>`;
      s+=`<text x="${f1(cx)}" y="${BY+31}" class="t-xs t-mid">${g.s2}</text>`});
    // tocilizumab box
    const o=ease(ramp(t,.75,1));
    s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="440" y="282" width="268" height="104" rx="11" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6"/>`;
    s+=`<text x="454" y="304" class="t-sm" style="fill:var(--warn)">TOCILIZUMAB · IL-6 RECEPTOR</text>`;
    s+=`<text x="454" y="326" class="t-xs" style="fill:var(--ink)">phase II (n=25): missed its primary</text>`;
    s+=`<text x="454" y="339" class="t-xs" style="fill:var(--ink)">endpoint, but SAA normalised</text>`;
    s+=`<text x="454" y="357" class="t-xs">phase III: missed too (RR 0.691,</text>`;
    s+=`<text x="454" y="370" class="t-xs">P=0.577); no efficacy shown</text>`;
    s+='</g>';
    // Cochrane caveat, on the face of the chart
    s+=`<line x1="14" x2="706" y1="412" y2="412" class="grid"/>`;
    s+=`<text x="14" y="430" class="t-xs" style="fill:var(--warn)">Cochrane re-analysis, moderate certainty: no clear difference in the number of patients having attacks for</text>`;
    s+=`<text x="14" y="444" class="t-xs" style="fill:var(--warn)">anakinra (RR 0.76, 0.54–1.07) or rilonacept (RR 0.87, 0.59–1.26). Only canakinumab reached RR 0.41 (0.26–0.65).</text>`;
    bs.innerHTML=s;
  }
  playWire(br,$('#ldBPlay'),drawB,9000,'Replay','ladder');drawB(+br.value);

  $('#ldCards').innerHTML=`
   <div class="card"><h4>2016 vs the 2024 update</h4><ul>
     <li>Fewer, consolidated statements: <b>12 recommendations instead of 18</b>, plus 4 overarching principles, with agreement above 9/10 on every statement.</li>
     <li>More weight on <b>adherence</b>, which sits at the core of lifelong prophylaxis.</li>
     <li>A new statement on <b>colchicine overdose</b>, intentional or accidental, which can be fatal and must be assessed carefully.</li>
     <li>New statements on <b>optimising biologic doses and tapering</b> them once remission is reached.</li>
     <li>A <b>minimum outcome set</b>: attack frequency per 3 months, physician assessment, patient-reported outcome and experience measures, and CRP or SAA, plus quality indicators.</li>
     <li>No fixed monitoring interval is given; monitor more often at diagnosis and when disease is uncontrolled. <sup class="c" data-ref="Ozen2025,RheumNow2025,Ozen2016" title="Source 199,203,222">199,203,222</sup></li></ul></div>
   <div class="card"><h4>How CLUSTER was built</h4><p>A phase 3 randomised trial across three diseases at once: colchicine-resistant FMF, mevalonate kinase deficiency and TRAPS. Patients were randomised at the time of a flare to canakinumab 150 mg under the skin every 4 weeks or placebo. The primary endpoint was resolution of that flare with no new flare through week 16. The FMF cohort had 63 participants. A 72-week open-label extension showed sustained flare control with CRP and SAA normalised, which is durable suppression rather than cure: attacks return when the drug is withdrawn. <sup class="c" data-ref="DeBenedetti2018,Yin2022,Ozen2020" title="Source 44,201,283">44,201,283</sup></p></div>
   <div class="card"><h4>The canakinumab label dose</h4><p>The US prescribing information gives 150 mg every 4 weeks for FMF patients over 40 kg, or 2 mg/kg for 40 kg and under, increasable to 300 mg (4 mg/kg) if the response is not adequate. In CLUSTER, 71% of colchicine-resistant FMF patients responded at 300 mg every 4 weeks, and 46% stayed controlled when dosing was stretched to every 8 weeks. Quoted here as published label and trial figures, not as a dose for anyone: the dose for any individual is set by their clinician. <sup class="c" data-ref="IlarisPIG,DeBenedetti2018" title="Source 44,105">44,105</sup></p></div>
   <div class="card"><h4>Colchicine does not stop</h4><p>When a biologic is added, guidelines continue colchicine alongside it, because colchicine carries the hard long-term outcome data on preventing AA amyloidosis: cumulative proteinuria of 1.7% at 11 years in adherent patients against 48.9% at 9 years in non-adherent ones, in 1,070 patients. The IL-1 blockers control attacks and acute-phase markers; they have no comparable multi-decade amyloid outcome data. <sup class="c" data-ref="Ozen2016,Zemer1986,Sag2025" title="Source 199,229,286">199,229,286</sup></p>
     <div class="pt"><b>In plain words</b>The new injection is added on top of the old tablet. It does not replace it.</div></div>
   <div class="card"><span class="ev early">Evidence check</span><h4>What the Cochrane review concluded</h4><p>Re-analysing the randomised trials, Cochrane rated the evidence for each IL-1 blocker as moderate certainty. Canakinumab reduced the number of patients with attacks (RR 0.41, 95% CI 0.26–0.65, 63 participants). For anakinra (RR 0.76, 0.54–1.07) and rilonacept (RR 0.87, 0.59–1.26) the confidence intervals crossed 1, so on that outcome the review found no clear difference from placebo, although anakinra did lower CRP. The individual trials still reported fewer attacks on drug; the bars above are those trial figures, and this re-analysis is the more cautious reading of the same data. The trials are small; the reviewers asked for more. <sup class="c" data-ref="Yin2022" title="Source 283">283</sup></p></div>
   <div class="card"><h4>Intolerance is not the same as resistance</h4><p>Resistance means attacks or inflammation persist at the maximum tolerated dose. Intolerance means side effects, most often diarrhoea and other gut symptoms, stop the dose from reaching that point. Roughly 5 to 10% of patients are described as resistant and another 2 to 5% as intolerant; both groups are the population every biologic trial recruits. <sup class="c" data-ref="Ozen2021,Ozen2017,BenChetrit2018Textbook" title="Source 16,200,202">16,200,202</sup></p></div>
   <div class="card"><h4>What a trial counted as success</h4><p>Different trials used different yardsticks, which is why the bars above cannot be compared across groups. CLUSTER used complete response at week 16. The anakinra trial counted attacks per month (1.7 vs 3.5, P=0.037) and how many patients fell below one attack a month (6 of 12 vs 0 of 13). The rilonacept trial compared median attack rates within the same patients on and off drug (0.77 vs 2.00, P=0.027), and 29% versus 0% of treatment courses were attack-free. A 2025 systematic review of 42 studies and 1,798 patients, including 6 randomised trials of IL-1 blockers, concluded they are effective and relatively safe in colchicine-unresponsive FMF. <sup class="c" data-ref="DeBenedetti2018,BenZvi2017,Hashkes2012,Hashkes2014,Sag2025" title="Source 20,44,93,94,229">20,44,93,94,229</sup></p></div>`;
};
/* =============== 4.2 living with FMF =============== */
const LV_STEPS=[
 {from:0,at:.02,k:'Months 1–3',t:'The first year is the dense one',
  txt:'EULAR 2016 asks for response, toxicity and adherence to be reviewed every 6 months, more often in the first year or whenever acute-phase markers are raised, and yearly once things are stable. It also puts a urinalysis at every clinic visit, specifically to catch proteinuria early. The 2024 update sets no fixed interval and asks for more frequent monitoring at diagnosis and while disease is uncontrolled. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025" title="Source 199,203,222">199,203,222</sup>',
  pt:'Visits are closer together in the first year, then settle into a rhythm once the disease is quiet.',
  hook:'Urinalysis <b>at every visit</b>. It is the cheapest early warning for amyloid kidney disease.'},
 {from:.25,at:.3,k:'Months 4–6',t:'The six-month review',
  txt:'The tests listed in 2016 are SAA and/or CRP, blood count, liver enzymes, kidney function, CPK and urinalysis for proteinuria. The guideline says colchicine is reduced if liver enzymes rise above twice the upper limit of normal. It also says high SAA values should be shared with the patient, as a deliberate way to support adherence. The one numbered SAA target in 2016, below 10 mg/L, is written for patients who already have AA amyloidosis. Outside that situation no threshold is named: the 2024 overarching goal is minimal or no clinical activity together with control of subclinical inflammation. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025" title="Source 199,203,222">199,203,222</sup>',
  pt:'A six-month check looks at inflammation, blood counts, liver, kidneys, muscle enzyme and urine.',
  hook:'In AA amyloidosis the 2016 target is <b>SAA below 10 mg/L</b>, with CRP as an imperfect substitute where SAA is not available. Outside amyloidosis the guidelines name no number, only "controlled".'},
 {from:.5,at:.55,k:'Months 7–9',t:'Life does not pause for the schedule',
  txt:'Guidelines handle pregnancy, surgery and vaccination as part of ordinary FMF care rather than as exceptions. Colchicine continues through conception, pregnancy and breastfeeding. Physical stress and trauma are listed as attack triggers, and amyloidotic kidneys are described as unusually sensitive to low blood flow, high blood pressure and nephrotoxic drugs. Use the toggles above to drop these situations into the year. <sup class="c" data-ref="Ozen2016,Ozen2025" title="Source 199,203">199,203</sup>',
  pt:'Pregnancy, operations and vaccinations all come up, and the published guidance covers each of them.',
  hook:'Colchicine is <b>continued</b> in pregnancy and breastfeeding, and its use alone does not justify amniocentesis.'},
 {from:.75,at:.88,k:'Months 10–12',t:'The annual picture',
  txt:'Once stable, yearly review is what 2016 describes. The 2024 update frames the year around a minimum outcome set: attack frequency per 3 months, a physician assessment, patient-reported outcome and experience measures, and CRP or SAA. The overarching goal it states is minimal or no clinical activity plus control of subclinical inflammation, lifelong, with adherence at the centre. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025" title="Source 199,203,222">199,203,222</sup>',
  pt:'Over a whole year the questions are simple: how many attacks, how were they, and did the inflammation markers stay normal in between.',
  hook:'The 2024 minimum outcome set: <b>attacks per 3 months, physician assessment, PROMs/PREMs, CRP or SAA</b>.'}
];
const LV_MON=`<div class="kv"><div><dt>What a routine check covers</dt><dd>SAA and/or CRP, blood count, liver enzymes, kidney function, CPK and urinalysis for proteinuria, with urinalysis at every visit. Reviewed every 6 months in 2016, more often in the first year or when markers are raised, yearly once stable. <sup class="c" data-ref="Ozen2016,Ozen2025" title="Source 199,203">199,203</sup></dd></div></div>`;
const LV_EV=[
 {m:.3,key:0,t:'Baseline visit',c:'var(--sea)',d:LV_MON},
 {m:2,key:'preg',t:'Pregnancy begins',c:'var(--crocus)',
  d:`<div class="kv"><div><dt>Pregnancy</dt><dd>Colchicine should not be stopped during conception, pregnancy or breastfeeding, and colchicine use alone does not justify amniocentesis. This was said in 2016 and repeated in 2024. In a study of 179 colchicine-treated pregnancies, 197 untreated FMF pregnancies and 312 controls, early and late miscarriage and congenital malformation rates did not differ between the groups. A 2024 meta-analysis of 1,242 FMF pregnancies found a higher risk of preterm delivery (OR 1.67, 95% CI 1.05–2.67) but no significant increase in fetal growth restriction or hypertensive disorders. <sup class="c" data-ref="Ozen2016,Ozen2025,BenChetrit2010,Hirahara2024" title="Source 15,99,199,203">15,99,199,203</sup></dd></div></div>`},
 {m:3,key:0,t:'First-year check',c:'var(--sea)',d:LV_MON},
 {m:3.6,key:'trav',t:'Long travel and standing',c:'var(--terra)',
  d:`<div class="kv"><div><dt>Travel and time on your feet</dt><dd>In 275 patients, musculoskeletal attacks were linked to prolonged standing (78.8%) and long travel (64.1%), with tiredness third (47.8%). Exertional leg pain occurred in 22.1% of 3,454 children in the largest paediatric cohort, and in 30.2% of M694V homozygotes (P&lt;0.001); EULAR 2016 suggests NSAIDs for it. Protracted febrile myalgia, a separate and heavier problem, occurred in 1.6%. <sup class="c" data-ref="Karadag2013,Ozturk2022,Ozen2016" title="Source 118,199,205">118,199,205</sup></dd></div></div>`},
 {m:5,key:'exam',t:'Exam season, high stress',c:'var(--terra)',
  d:`<div class="kv"><div><dt>Stress</dt><dd>Stress is the trigger with the best evidence behind it. In a case-crossover study of 104 Armenian patients, each additional stressful event raised the odds of an attack two days later by about 70% (OR 1.7, 95% CI 1.04–2.79), and high perceived stress also predicted attacks; the same study found no increase in odds after strenuous physical activity or high-fat meals. In 882 patients, psychological stress was the most frequently named trigger at 75.2%. EULAR 2016 notes, at low evidence level, that a temporary colchicine increase may be considered during periods of physical or emotional stress. <sup class="c" data-ref="Yenokyan2012,Parlar2024,Ozen2016" title="Source 199,209,279">199,209,279</sup></dd></div></div>`},
 {m:6,key:0,t:'Six-month labs',c:'var(--sea)',d:LV_MON},
 {m:7,key:'surg',t:'Planned surgery',c:'var(--warn)',
  d:`<div class="kv"><div><dt>Surgery</dt><dd>No dedicated studies of perioperative colchicine in FMF were found, so the guidance is indirect. EULAR 2016 lists physical stress and trauma among attack triggers, and advises avoiding surgery and hypoperfusion as far as practicable in patients with amyloidotic kidneys, which are unusually sensitive to low blood flow, high blood pressure and nephrotoxic drugs. In a 971-patient adult cohort, 24.7% had had an appendectomy; those patients had more peritonitis attacks, more colchicine resistance (15% vs 6.7%) and needed higher colchicine doses. <sup class="c" data-ref="Ozen2016,Bodakci2021" title="Source 23,199">23,199</sup></dd></div></div>`},
 {m:9,key:0,t:'First-year check',c:'var(--sea)',d:LV_MON},
 {m:9.4,key:'vacc',t:'Vaccination on a biologic',c:'var(--gold)',
  d:`<div class="kv"><div><dt>Vaccination while on IL-1 blockade</dt><dd>The 2019 EULAR vaccination recommendations say non-live vaccines can be given whatever the therapy, while live-attenuated vaccines may be considered with caution in immunosuppressed patients, preferably while disease is quiet and ideally before immunosuppression starts. The canakinumab label advises avoiding live vaccines during treatment and bringing vaccinations up to date beforehand. An international survey of 17 patients who received live-attenuated vaccines while on IL-1 or IL-6 blockade recorded 3 adverse events, 2 of them serious (varicella-zoster infection after a VZV booster, pneumonia after an MMR booster) and 7 mostly mild flares; the authors did not consider these findings a reason to change the guidelines. <sup class="c" data-ref="Furer2020,IlarisPIG,Jeyaratnam2018" title="Source 73,105,114">73,105,114</sup></dd></div></div>`},
 {m:11,key:'preg',t:'Delivery',c:'var(--crocus)',
  d:`<div class="kv"><div><dt>Delivery, and the other parent</dt><dd>The meta-analysis signal in FMF pregnancy is preterm delivery (OR 1.67), not malformation. On the paternal side, men generally do not need to stop colchicine before conception, azoospermia proven to be caused by colchicine is rare, and partners of colchicine-treated men did not have more miscarriages or malformations than controls. In an Armenian study, infertility in FMF tracked more severe disease and inadequate colchicine treatment rather than the drug. Testicular amyloidosis is a recognised cause of azoospermia and is worth considering before colchicine is blamed. <sup class="c" data-ref="Hirahara2024,Ozen2016,BenChetrit2004,Sotskiy2021" title="Source 12,99,199,249">12,99,199,249</sup></dd></div></div>`},
 {m:11.8,key:0,t:'Annual review',c:'var(--sea)',d:LV_MON}
];
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT');const on={preg:false,surg:false,vacc:false,exam:false,trav:false};
  const vis=()=>LV_EV.filter(e=>e.key===0||on[e.key]);
  const ang=m=>-Math.PI/2+m/12*Math.PI*2;
  function draw(t){
    const mNow=t*12,E=vis();
    /* narrow: the ring keeps its size, the event labels move into a list underneath,
       and the event the year has just reached is highlighted in both */
    const N=vb(svg,'720 440','400 '+(384+E.length*27+(E.length<7?36:22)));
    const CX=N?200:232, CY=N?196:232, R=N?136:148;
    const LX=N?16:432, LY=N?384:62, LST=N?27:31, LTX=N?52:456, LRX=N?386:712, LHD=N?366:38, LHX=LX;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    // pregnancy span arc
    if(on.preg){const a0=ang(2),a1=ang(Math.min(mNow,11));let d='';
      for(let i=0;i<=60;i++){const a=lerp(a0,a1,i/60);d+=(i?'L':'M')+f1(CX+Math.cos(a)*(R+13))+' '+f1(CY+Math.sin(a)*(R+13))}
      if(a1>a0)s+=`<path d="${d}" style="fill:none;stroke:var(--crocus);stroke-width:7;opacity:.5;stroke-linecap:round"/>`;
      if(N){if(mNow>2){s+=`<line x1="160" x2="176" y1="13" y2="13" style="stroke:var(--crocus);stroke-width:5;opacity:.5;stroke-linecap:round"/>`;
        s+=`<text x="182" y="17" class="t-xs" style="fill:var(--crocus)">pregnancy</text>`}}
      else{const am=ang(lerp(2,Math.min(mNow,11),.5)),ar=R+28;
        s+=`<text x="${f1(CX+Math.cos(am)*ar)}" y="${f1(CY+Math.sin(am)*ar)}" class="t-xs t-mid" style="fill:var(--crocus)">${mNow>2?'pregnancy':''}</text>`}}
    // base ring + progress
    s+=`<circle cx="${CX}" cy="${CY}" r="${R}" style="fill:none;stroke:var(--line);stroke-width:9"/>`;
    let pd='';const NS=Math.max(1,Math.round(t*180));
    for(let i=0;i<=NS;i++){const a=ang(t*12*i/NS);pd+=(i?'L':'M')+f1(CX+Math.cos(a)*R)+' '+f1(CY+Math.sin(a)*R)}
    s+=`<path d="${pd}" style="fill:none;stroke:var(--sea);stroke-width:9;stroke-linecap:round"/>`;
    // month ticks and numbers inside
    for(let m=0;m<12;m++){const a=ang(m);
      s+=`<line x1="${f1(CX+Math.cos(a)*(R-6))}" x2="${f1(CX+Math.cos(a)*(R+6))}" y1="${f1(CY+Math.sin(a)*(R-6))}" y2="${f1(CY+Math.sin(a)*(R+6))}" style="stroke:var(--panel);stroke-width:2"/>`;
      const ai=ang(m+.5);
      s+=`<text x="${f1(CX+Math.cos(ai)*(R-24))}" y="${f1(CY+Math.sin(ai)*(R-20))}" class="t-xs t-mid" style="fill:${mNow>=m?'var(--ink)':'var(--muted)'}">${m+1}</text>`}
    // event dots. in narrow each carries its number from the list below
    let curI=-1;E.forEach((e,i)=>{if(mNow>=e.m)curI=i});
    E.forEach((e,i)=>{const a=ang(e.m),x=CX+Math.cos(a)*R,y=CY+Math.sin(a)*R,hit=mNow>=e.m,now=i===curI;
      if(N&&now)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="17" style="fill:${e.c};opacity:.18"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${hit?(N&&now?11:9):6}" style="fill:${hit?e.c:'var(--panel)'};stroke:${e.c};stroke-width:${N&&now?3:2}"/>`;
      if(hit)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(9+9*bump(mNow,e.m,e.m+.6))}" style="fill:none;stroke:${e.c};stroke-width:1.5;opacity:${f1(.8*bump(mNow,e.m,e.m+.6))}"/>`;
      if(N){const xo=CX+Math.cos(a)*(R+19),yo=CY+Math.sin(a)*(R+19);
        s+=`<text x="${f1(xo)}" y="${f1(yo+3.5)}" class="t-xs t-mid" style="fill:${hit?e.c:'var(--muted)'};font-weight:700">${i+1}</text>`}});
    // moving hand
    const a=ang(mNow);
    s+=`<line x1="${CX}" x2="${f1(CX+Math.cos(a)*(R-34))}" y1="${CY}" y2="${f1(CY+Math.sin(a)*(R-34))}" style="stroke:var(--terra);stroke-width:2.4"/>`;
    s+=`<circle cx="${CX}" cy="${CY}" r="4" style="fill:var(--terra)"/>`;
    // centre readout
    s+=`<text x="${CX}" y="${CY-8}" class="t-sm t-mid">MONTH</text>`;
    s+=`<text x="${CX}" y="${CY+22}" class="t-big t-mid" style="font-size:28px">${(mNow+.0001).toFixed(1)}</text>`;
    s+=`<text x="${CX}" y="${CY+42}" class="t-xs t-mid">${E.filter(e=>mNow>=e.m).length} of ${E.length} events reached</text>`;
    // the event list: beside the ring when wide, under it when narrow
    s+=`<text x="${LHX}" y="${LHD}" class="t-sm" style="fill:var(--sea)">THIS YEAR, IN ORDER</text>`;
    E.forEach((e,i)=>{const y=LY+i*LST,hit=mNow>=e.m,now=i===curI;
      if(N&&now)s+=`<rect x="${LX-6}" y="${y-18}" width="${LRX-LX+12}" height="24" rx="7" style="fill:${e.c};opacity:.14"/>`;
      if(N)s+=`<text x="${LX+10}" y="${y}" class="t-xs t-end" style="fill:${hit?e.c:'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<circle cx="${N?LX+24:LX+10}" cy="${y-4}" r="${now&&N?6:5}" style="fill:${hit?e.c:'var(--panel)'};stroke:${e.c};stroke-width:1.8"/>`;
      s+=`<text x="${LTX}" y="${y}" class="t-lbl" style="fill:${hit?'var(--ink)':'var(--muted)'};font-size:12.5px">${e.t}</text>`;
      s+=`<text x="${LRX}" y="${y}" class="t-xs t-end">m${e.m.toFixed(1)}</text>`});
    if(E.length<7)s+=`<text x="${LTX}" y="${LY+E.length*LST+16}" class="t-xs">use the toggles to add more</text>`;
    svg.innerHTML=s;
    const p=phaseOf(LV_STEPS,t);setSt(p);
    const past=E.filter(e=>mNow>=e.m);const last=past[past.length-1];
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[p])+(last?last.d:'');
    $('#lvCap').textContent=`Month ${(mNow).toFixed(1)} of 12 · ${past.length} events reached${last?' · last: '+last.t:''}. Schematic year; intervals follow published guidance, not any one clinic.`;
  }
  const stop=playWire(rg,$('#lvPlay'),draw,18000,'Replay','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  [['lvPreg','preg'],['lvSurg','surg'],['lvVacc','vacc'],['lvExam','exam'],['lvTrav','trav']].forEach(([id,k])=>{
    const b=$('#'+id);b.onclick=()=>{on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);draw(+rg.value)}});
  draw(+rg.value);

  /* ---- trigger evidence ---- */
  const ts=$('#lvTrig'),tr=$('#lvTR');
  const LV_TRIG=[
   {h:'REPORTED TRIGGERS OF SEROSITIS ATTACKS · 275 patients',y:46},
   {l:'cold exposure',v:59.3,y:66},
   {l:'emotional stress',v:49.8,y:94},
   {l:'tiredness',v:40.0,y:122},
   {l:'menstruation (of women)',v:33.7,y:150},
   {h:'REPORTED TRIGGERS OF MUSCULOSKELETAL ATTACKS · same study',y:192},
   {l:'prolonged standing',v:78.8,y:212},
   {l:'long travel',v:64.1,y:240},
   {h:'LARGEST QUESTIONNAIRE STUDY · 882 patients',y:282},
   {l:'psychological stress',v:75.2,y:302}
  ];
  const LV_TRIGN=['REPORTED TRIGGERS · SEROSITIS · 275 patients','MUSCULOSKELETAL ATTACKS · same study','LARGEST QUESTIONNAIRE STUDY · 882 patients'];
  /* narrow: bars run the full width with their label on the line above, so a long
     label like "menstruation (of women)" no longer needs a left gutter */
  function drawTN(t){
    const BX0=14,BX1=300;let s='',y=30,bi=0,hi=0;
    const tops=[];
    LV_TRIG.forEach(r=>{if(r.h){y+=bi?30:22;tops.push(y)}else{y+=44;bi++}});
    const barTop=tops[0]-12, barBot=y-2;
    [0,25,50,75,100].forEach(v=>{const x=lerp(BX0,BX1,v/100);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${barTop}" y2="${barBot}" class="grid"/><text x="${f1(x)}" y="${barBot+16}" class="t-xs t-mid">${v}%</text>`});
    y=30;bi=0;
    LV_TRIG.forEach(r=>{
      if(r.h){y+=bi?30:22;s+=`<text x="14" y="${y}" class="t-sm" style="fill:var(--terra)">${LV_TRIGN[hi++]}</text>`;return}
      const k=ease(ramp(t,bi*.08,bi*.08+.4)),w=(BX1-BX0)*r.v/100*k;bi++;
      s+=`<text x="14" y="${y+16}" class="t-xs" style="fill:var(--ink)">${r.l}</text>`;
      s+=`<rect x="${BX0}" y="${y+22}" width="${f1(w)}" height="18" rx="4" style="fill:var(--terra)"/>`;
      s+=`<text x="${f1(BX0+w+7)}" y="${y+35}" class="t-xs" style="fill:var(--terra);font-weight:700;opacity:${f1(ramp(k,.6,1))}">${f1(r.v)}%</text>`;
      y+=44});
    // case-crossover block
    y=barBot+42;
    const o=ease(ramp(t,.6,.95));
    s+=`<g style="opacity:${f1(.12+.88*o)}"><text x="14" y="${y}" class="t-sm" style="fill:var(--sea)">CASE-CROSSOVER · 104 patients, each vs themselves</text>`;y+=10;
    const chips=[[['each extra stressful event: odds of an attack','2 days later up ~70%'],'var(--sea)','var(--sea-soft)'],
                 [['strenuous exercise: no rise in odds'],'var(--good)','var(--good-soft)'],
                 [['high-fat meals: no rise in odds'],'var(--good)','var(--good-soft)']];
    chips.forEach(c=>{const h=c[0].length*14+10;
      s+=`<rect x="14" y="${y}" width="372" height="${h}" rx="6" style="fill:${c[2]};stroke:${c[1]}"/>`;
      c[0].forEach((l,j)=>{s+=`<text x="24" y="${y+15+j*14}" class="t-xs" style="fill:${c[1]}">${l}</text>`});
      y+=h+8});
    s+='</g>';
    return s;
  }
  function drawT(t){
    const N=vb(ts,'720 420','400 592');
    const BX0=218,BX1=662;let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    if(N){ts.innerHTML=s+drawTN(t);return}
    [0,25,50,75,100].forEach(v=>{const x=lerp(BX0,BX1,v/100);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="56" y2="316" class="grid"/><text x="${f1(x)}" y="332" class="t-xs t-mid">${v}%</text>`});
    let bi=0;
    LV_TRIG.forEach(r=>{
      if(r.h){s+=`<text x="14" y="${r.y}" class="t-sm" style="fill:var(--terra)">${r.h}</text>`;return}
      const k=ease(ramp(t,bi*.08,bi*.08+.4)),w=(BX1-BX0)*r.v/100*k;bi++;
      s+=`<text x="208" y="${r.y+13}" class="t-xs t-end" style="fill:var(--ink)">${r.l}</text>`;
      s+=`<rect x="${BX0}" y="${r.y}" width="${f1(w)}" height="18" rx="4" style="fill:var(--terra)"/>`;
      s+=`<text x="${f1(BX0+w+7)}" y="${r.y+13}" class="t-xs" style="fill:var(--terra);font-weight:700;opacity:${f1(ramp(k,.6,1))}">${f1(r.v)}%</text>`});
    // case-crossover block
    const o=ease(ramp(t,.6,.95));
    s+=`<g style="opacity:${f1(.12+.88*o)}"><text x="14" y="358" class="t-sm" style="fill:var(--sea)">CASE-CROSSOVER STUDY · 104 patients, each compared with themselves</text>`;
    const chips=[['each extra stressful event: odds of an attack 2 days later up ~70%','var(--sea)','var(--sea-soft)'],
                 ['strenuous exercise: no rise in odds','var(--good)','var(--good-soft)'],
                 ['high-fat meals: no rise in odds','var(--good)','var(--good-soft)']];
    chips.forEach((c,i)=>{const y=i===0?368:394,x=i===2?372:14,w=i===0?690:348;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="20" rx="6" style="fill:${c[2]};stroke:${c[1]}"/>`;
      s+=`<text x="${x+10}" y="${y+14}" class="t-xs" style="fill:${c[1]}">${c[0]}</text>`});
    s+='</g>';
    ts.innerHTML=s;
  }
  playWire(tr,$('#lvTPlay'),drawT,9000,'Replay','living');drawT(+tr.value);

  /* ---- quality of life ---- */
  const qs=$('#lvQol'),qr=$('#lvQ');
  /* a room of twenty figures per row: the published percentage is the shaded share
     of the row, and the figure itself is still printed beside it */
  const LV_Q=[
   {l:'WORK TIME MISSED · absenteeism · 111 adults',a:9.3,p:0.7},
   {l:'OUTPUT LOST WHILE AT WORK · presenteeism · same study',a:35.2,p:9.6},
   {l:'DEPRESSION DIAGNOSED · 7,670 patients vs matched controls',n:'DEPRESSION DIAGNOSED · 7,670 vs matched controls',a:6.22,p:4.58},
   {l:'ANXIETY DIAGNOSED · same database',a:4.93,p:3.14}
  ];
  const person=(x,y,fill,stroke)=>`<g transform="translate(${f1(x)} ${f1(y)})"><circle cx="0" cy="-17" r="3.6" style="fill:${fill};stroke:${stroke};stroke-width:1.1"/><path d="M-4.6 0V-8q0 -5 4.6 -5q4.6 0 4.6 5V0z" style="fill:${fill};stroke:${stroke};stroke-width:1.1;stroke-linejoin:round"/></g>`;
  const LV_SCH=['school: 129 adolescents with FMF had lower grade-point averages and lower','school-functioning scores than controls (P=0.001). No percentage is reported.'];
  const LV_SCHN=['school: 129 adolescents with FMF had lower grade-point','averages and school-functioning scores than controls','(P=0.001). No percentage is reported.'];
  function drawQ(t){
    const N=vb(qs,'720 440','400 492');
    const L=N?{FX:14,PT:15,Y0:60,BP:92,R1:38,R2:72,VX:316,NM:0,SY:424,SH:60,SL:LV_SCHN}
             :{FX:176,PT:19,Y0:46,BP:88,R1:36,R2:70,VX:556,NM:168,SY:396,SH:44,SL:LV_SCH};
    const wtot=19*L.PT+9.2;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="22" class="t-sm" style="fill:var(--terra)">WORK AND MOOD · FMF vs matched controls</text>`;
    s+=N?`<text x="14" y="36" class="t-xs">each row of 20 figures = 100%, shaded by the percentage</text>`
        :`<text x="706" y="22" class="t-xs t-end">each row of 20 figures = 100%; the shaded share is the published percentage</text>`;
    LV_Q.forEach((g,i)=>{const y0=L.Y0+i*L.BP,k=ease(ramp(t,i*.12,i*.12+.46));
      s+=`<text x="14" y="${y0}" class="t-sm" style="fill:var(--ink)">${N&&g.n?g.n:g.l}</text>`;
      [[g.a,'var(--terra)','FMF',L.R1,0],[g.p,'var(--muted)','controls',L.R2,1]].forEach(pr=>{
        const yb=y0+pr[3],id=`lvq${i}${pr[4]}`;
        s+=`<line x1="${f1(L.FX-7)}" x2="${f1(L.FX+wtot+3)}" y1="${f1(yb+3)}" y2="${f1(yb+3)}" style="stroke:var(--line);stroke-width:1.2"/>`;
        let base='',full='';
        for(let j=0;j<20;j++){const x=L.FX+j*L.PT;
          base+=person(x,yb,'var(--panel-2)','var(--line)');full+=person(x,yb,pr[1],pr[1])}
        s+=base;
        s+=`<clipPath id="${id}"><rect x="${f1(L.FX-5)}" y="${f1(yb-24)}" width="${f1(wtot*pr[0]/100*k)}" height="28"/></clipPath>`;
        s+=`<g clip-path="url(#${id})">${full}</g>`;
        if(L.NM)s+=`<text x="${L.NM}" y="${f1(yb)}" class="t-xs t-end" style="fill:${pr[1]}">${pr[2]}</text>`;
        s+=`<text x="${L.VX}" y="${f1(N?yb-2:yb)}" class="t-lbl" style="fill:${pr[1]};opacity:${f1(ramp(k,.5,1))}">${pr[0]}%</text>`;
        if(!L.NM)s+=`<text x="${L.VX}" y="${f1(yb+11)}" class="t-xs" style="fill:${pr[1]}">${pr[2]}</text>`})});
    const o=ease(ramp(t,.6,1));
    s+=`<g style="opacity:${f1(.12+.88*o)}"><rect x="14" y="${L.SY}" width="${N?372:692}" height="${L.SH}" rx="8" style="fill:var(--panel);stroke:var(--line)"/>`;
    L.SL.forEach((l,i)=>{s+=`<text x="28" y="${L.SY+18+i*15}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    s+='</g>';
    qs.innerHTML=s;
  }
  playWire(qr,$('#lvQPlay'),drawQ,8000,'Replay','living');drawQ(+qr.value);

  $('#lvCards').innerHTML=`
   <div class="card"><h4>Prognosis: two cohorts, two answers</h4><p>In a Turkish single-centre cohort of 587 patients followed for a median of 6 years, survival did not differ significantly from the general population (standardised mortality ratio 1.48, 95% CI 0.817–2.49). Amyloidosis was the leading cause of death and the only significant predictor of mortality. In an Israeli cohort of 1.25 million adolescents, the 1,225 with FMF had higher mortality: 8.73 against 4.32 deaths per 10,000 person-years, with adjusted hazard ratios of 1.7 in men and 2.48 in women. Kidney amyloidosis caused 35% of deaths in men and 60% in women. The two studies differ in size, country and era; what they agree on is that amyloidosis is what drives the risk. <sup class="c" data-ref="Akar2012,Twig2014" title="Source 2,266">2,266</sup></p>
     <div class="hook"><b>Exam hook</b>Amyloidosis is the hinge of FMF prognosis. Control the inflammation between attacks and the survival curves move toward the population curve.</div></div>
   <div class="card"><h4>Quality of life, measured</h4><p>School-aged children with FMF scored lower than healthy peers on physical and psychosocial quality of life. In 111 adults, work absenteeism was 9.3% against 0.7% in controls and presenteeism 35.2% against 9.6%; impairment was greatest in colchicine-resistant patients and lower in those on IL-1 antagonists. SF-36 scores improved after 3 months of IL-1 antagonist treatment in 44 colchicine-resistant patients. Rilonacept also improved physical quality-of-life scores in its trial. <sup class="c" data-ref="Makay2009,Suticen2021,Varan2019,Hashkes2014" title="Source 94,165,251,271">94,165,251,271</sup></p></div>
   <div class="card"><h4>Mood</h4><p>In an Israeli health-database study of 7,670 FMF patients and 7,670 matched controls, depression was diagnosed in 6.22% against 4.58% and anxiety in 4.93% against 3.14%, both P&lt;0.001. Questionnaire studies find larger gaps: in one adult study 33% against 12% for depression and 53% against 16% for anxiety, with lower physical SF-36 scores. In 130 children, anxiety was higher than in controls but depression was not. Diagnosed-rate differences and questionnaire-score differences answer different questions, which is why the numbers look so different. <sup class="c" data-ref="Lidor2021,Deger2011,Sonmez2020" title="Source 45,151,246">45,151,246</sup></p></div>
   <div class="card"><h4>Legs, stairs and long days</h4><p>Exertional leg pain is common and often mistaken for something else: 22.1% of 3,454 children in the largest paediatric cohort, rising to 30.2% among M694V homozygotes. EULAR 2016 suggests NSAIDs for it. Protracted febrile myalgia, which is severe muscle pain lasting 5 days or more with fever and raised markers, occurred in 1.6%; it responds to glucocorticoids, with NSAIDs or IL-1 blockade as options. <sup class="c" data-ref="Ozturk2022,Ozen2016" title="Source 199,205">199,205</sup></p></div>
   <div class="card"><h4>What counts as a trigger</h4><p>Reported triggers include physical or emotional stress, menstruation, trauma, cold, infection, high fat intake, fasting, lack of sleep and tiredness. The honest summary is that stress has the strongest study design behind it, cold and standing are reported very often, and two things people commonly avoid, exercise and fatty meals, did not raise attack odds in the case-crossover study. Cold was significant only in exon 10 variant carriers and M694V homozygotes in the 882-patient study. <sup class="c" data-ref="Ozen2016,Yenokyan2012,Parlar2024,Karadag2013" title="Source 118,199,209,279">118,199,209,279</sup></p>
     <div class="pt"><b>In plain words</b>Lists of triggers mostly come from asking people what they noticed. The one study that compared each person with themselves found stress mattered and exercise and fatty food did not.</div></div>`;
  $('#lvOrg').innerHTML=`<p><b>Where patients find each other.</b> The FMF &amp; AID Global Association is a Zürich-based nonprofit supporting people with FMF and other autoinflammatory diseases worldwide, with a helpline, educational materials and an international patient survey. The Autoinflammatory Alliance is a US 501(c)(3) charity promoting awareness, diagnosis and care for autoinflammatory diseases. Both descriptions come from the source entries listed here rather than from the organisations' own pages. Patients were also in the room when the guidelines were written: one patient representative on the 2016 panel and two on the 2024 panel. <sup class="c" data-ref="FMFAID,AutoinflammatoryAlliance,Ozen2016,Ozen2025" title="Source 7,69,199,203">7,69,199,203</sup></p>`;
};

/* =============== 4.3 nursing care =============== */
const NU_SITES={
 gen:{n:'Fever & the envelope',dot:null,
  what:'Sudden onset, peaking within hours, and it can occur alone. The Livneh criteria define a typical attack as recurrent, at least 38 °C rectally, and lasting 12 hours to 3 days. Episodes of 6–12 hours or 3–7 days, or below 38 °C, count as incomplete attacks. <sup class="c" data-ref="Livneh1997,Sonmez2016,Tufan2020" title="Source 159,245,263">159,245,263</sup>',
  gap:'No FMF-specific source was found on thermometry route, site or frequency, so this app does not state one.'},
 abdo:{n:'Abdomen',dot:[30,62],
  what:'Peritonitis is the commonest feature, in 93.7% of the 2,838-patient Turkish registry. Guarding, rebound tenderness and ileus all occur in ordinary FMF peritonitis, so peritoneal signs do not separate it from a surgical abdomen. The published discriminator for appendicitis is a shift of pain from diffuse to the right lower quadrant. Symptoms resolve completely within 24–72 hours. <sup class="c" data-ref="TurkishFMF2005,Tufan2020,Lidar2008" title="Source 150,263,264">150,263,264</sup>',
  hook:'About 80% of appendices removed from FMF patients were not inflamed, against about 20% in the general population. In one 971-patient cohort a quarter had had an appendectomy. <sup class="c" data-ref="Lidar2008,Bodakci2021" title="Source 23,150">23,150</sup>'},
 chest:{n:'Chest',dot:[24,44],
  what:'Pleuritis affects fewer than half of patients: sudden, usually one-sided, sometimes with a small costophrenic-angle effusion, resolving in 1–3 days. Pericarditis is rare, 27 cases among about 4,000 Israeli patients over 20 years, and 1.4% of the Turkish registry. <sup class="c" data-ref="Tufan2020,Kees1997,TurkishFMF2005" title="Source 123,263,264">123,263,264</sup>',
  gap:'Published descriptions cover site, laterality, effusion and duration. They do not cover chest expansion, splinting or atelectasis risk, so no FMF source supports those observations.'},
 joint:{n:'Joints & muscles',dot:[24,104],
  what:'Usually acute mono- or oligoarthritis of a large lower-limb joint. The fluid is sterile but inflammatory and can mimic septic arthritis. Symptoms peak in 1–3 days and settle within about a week. Exertional leg pain occurred in 22.1% of 3,454 children, and 30.2% of M694V homozygotes. <sup class="c" data-ref="Tufan2020,Ozturk2022" title="Source 205,263">205,263</sup>',
  hook:'Protracted febrile myalgia occurs in about 1.6%, lasts up to six weeks, happens despite colchicine and responds to corticosteroids. In 78 children reviewed, more than half presented with it first. <sup class="c" data-ref="Ozturk2022,Langevitz1994,Hospach2024" title="Source 100,146,205">100,146,205</sup>'},
 skin:{n:'Skin',dot:[34,116],
  what:'Erysipelas-like erythema: a tender red plaque on the lower leg, ankle or top of the foot, often brought on by long walking or travel. It occurred in about 7.5% of one paediatric cohort of 782, where affected children more often had arthritis and M694V homozygosity. <sup class="c" data-ref="Tufan2020,GezginYildirim2020" title="Source 79,263">79,263</sup>'},
 scrot:{n:'Scrotum',dot:[30,80],
  what:'Inflammation of the tunica vaginalis. In 175 Arab boys under 16 with FMF, 9% had scrotal attacks lasting 8 hours to 5 days. It was the first sign of FMF in a quarter of them, and 38% had surgery. <sup class="c" data-ref="Majeed2000" title="Source 164">164</sup>'},
 bloods:{n:'Bloods',dot:null,
  what:'The 2024 guideline describes a raised white cell count with neutrophil predominance, raised CRP, SAA and fibrinogen, and a raised ESR. CRP rose in every attack in a dedicated study, while platelets did not rise, ferritin rose in only one patient and albumin did not change. Attack medians were SAA 693 and CRP 115 mg/L, against 6 and 4 mg/L between attacks. <sup class="c" data-ref="Ozen2025,Korkmaz2002,Lachmann2006" title="Source 136,141,203">136,141,203</sup>',
  hook:'Ferritin and platelets staying flat while CRP climbs is what separates an FMF attack from Still\'s disease on the bloods. <sup class="c" data-ref="Korkmaz2002" title="Source 136">136</sup>'}
};
const NU_FLAGS=[
 {t:'It does not resolve',d:'Attacks are self-limited, usually 1–3 days, and patients are usually completely well between them. An episode that does not resolve on that timescale falls outside the described natural history. <sup class="c" data-ref="GeneReviews,Tufan2020" title="Source 76,263">76,263</sup>'},
 {t:'Pain shifts to the right lower quadrant',d:'Peritoneal signs are ordinary in FMF, so they do not rule appendicitis in or out. The published discriminator is the shift from diffuse pain to the right lower quadrant. Both guideline versions say other causes such as appendicitis must always be considered. <sup class="c" data-ref="Lidar2008,Ozen2016,Ozen2025" title="Source 150,199,203">150,199,203</sup>'},
 {t:'Proteinuria and creatinine climbing fast',d:'Amyloid storm: sudden severe proteinuria with rapidly progressive renal failure and markedly raised acute-phase reactants, over days to weeks. In the original 20-patient series infection triggered 17 of 20, and within a year 16 reached end-stage renal disease or death against 3 controls. A 2025 review put the frequency at 5.5% of FMF-associated cases, with mortality of 33–67%. <sup class="c" data-ref="Ozkurt2025,Kukuy2021" title="Source 139,204">139,204</sup>'},
 {t:'Gut symptoms in someone whose dose or drugs just changed',d:'An emergency-nursing review notes colchicine toxicity often begins with gastrointestinal symptoms and can progress to multiorgan failure, that there is no antidote so care is supportive, and that older adults, people with renal or hepatic impairment and those on interacting drugs are at highest risk. The label reports gut effects in up to 20% of patients starting treatment, and says severe ones can herald more serious toxicity. <sup class="c" data-ref="Denke2026,FDA-Colcrys" title="Source 51,63">51,63</sup>'},
 {t:'The family is calm, or frightened',d:'Of parents of 171 children with FMF, 90.1% knew colchicine works but only 39.2% knew there is no vital risk during an attack. Family alarm is not a guide to severity in either direction. <sup class="c" data-ref="Yildirim2021" title="Source 281">281</sup>'}
];
const NU_TOOLS=[
 {n:'AIDAI',s:'Validated',b:['A patient or parent diary kept for one month before the visit.','Twelve items scored 0 or 1 each day: fever ≥38 °C, overall symptoms, abdominal pain, nausea or vomiting, diarrhoea, headache, chest pain, painful nodes, arthralgia or myalgia, joint swelling, eye signs, skin rash. A thirteenth item, pain relief taken, is recorded but not scored.','Total 9 or more means active disease: sensitivity 89%, specificity 92%, AUC 98% against blinded expert consensus.','The 2024 guideline calls it the only validated activity score in FMF, and says it has problems reflecting activity.'],c:'<sup class="c" data-ref="Piram2014,Ozen2025" title="Source 203,211">203,211</sup>'},
 {n:'ISSF',s:'Validated',b:['A severity score built by Delphi and validated in 281 patients, AUC 0.825.','Nine domains, scored as ten items because attack frequency splits in two; maximum 10.','Bands: 2 or less mild, 3–5 intermediate, 6 or more severe.','In 160 treated Turkish children it classed 21.3% mild, 70.5% intermediate, 8.1% severe.'],c:'<sup class="c" data-ref="DemirkayaISSF2016,Ozdemir2021" title="Source 50,196">50,196</sup>'},
 {n:'FMF50',s:'Response, not activity',b:['Six items: change in attack frequency, change in attack duration, patient or parent global severity, physician global severity, change in arthritis attacks, and change in CRP, ESR or SAA.','Response is at least 50% improvement in 5 of the 6 with none worsening, judged after 3–6 months, and only once the maximum tolerated dose has been reached.','It separated responders poorly in the rilonacept randomised trial.'],c:'<sup class="c" data-ref="Ozen2014,Ozen2017,Hashkes2012" title="Source 93,198,200">93,198,200</sup>'},
 {n:'Attack count',s:'Simplest',b:['In 239 patients, the number of attacks in the past 12 months correlated moderately with quality-of-life and pain scores, which supports it as a single activity measure.','The 2024 minimum outcome set uses attacks per 3 months.'],c:'<sup class="c" data-ref="Piskin2022,Ozen2025" title="Source 203,212">203,212</sup>'},
 {n:'MASIF',s:'Adherence',b:['An 18-item, four-subscale adherence scale developed in 150 Turkish children aged 2 to 18.','Correlated with the Morisky scale at r = 0.515, Cronbach alpha 0.728, test-retest r = 0.843, parent–child agreement r = 0.781.'],c:'<sup class="c" data-ref="Yesilkaya2015" title="Source 280">280</sup>'},
 {n:'JAIMAR',s:'Multidimensional',b:['Sixteen measures across functional status, pain, adherence and quality of life, parent-proxy or self-report from age 8, tested in 250 children with FMF.','About 15 minutes to complete and score.'],c:'<sup class="c" data-ref="Konukbay2016" title="Source 135">135</sup>'}
];
const NU_SCEN={
 routine:{n:'A routine daily dose',steps:[1,1,1,1,1],
  note:'The label gives colchicine for FMF by mouth, once daily or in two divided doses, without regard to meals. The 2024 guideline allows either, chosen by adherence and tolerance, and notes a single dose is accepted as effective but may bring more gut upset. Dose increases are made gradually and no more often than weekly. <sup class="c" data-ref="FDA-Colcrys,Ozen2025" title="Source 63,203">63,203</sup>'},
 clarithro:{n:'Also prescribed clarithromycin',steps:[1,0,1,1,1],
  note:'This is the interaction with the clearest harm. In one study 9 of 88 patients given clarithromycin and colchicine together died, against 1 of 28 given them sequentially, with baseline renal impairment, longer overlap and pancytopenia predicting death. Where no alternative exists the label caps the FMF dose at 0.6 mg a day with strong CYP3A4 or P-glycoprotein inhibitors, and the cap also applies within 14 days of the interacting drug. Azithromycin raises exposure far less. <sup class="c" data-ref="Hung2005,FDA-Colcrys,Terkeltaub2011" title="Source 63,103,257">63,103,257</sup>'},
 renal:{n:'Reduced kidney function',steps:[1,1,0,1,1],
  note:'The label advises close monitoring and possible dose reduction with a creatinine clearance of 50–80 or 30–50 mL/min, and a starting dose of 0.3 mg a day below 30 mL/min or on dialysis. Colchicine is not removed by haemodialysis. The 2024 guideline adds that toxicity risk is high in reduced renal function, so signs of toxicity and creatine kinase are monitored carefully and the dose reduced accordingly. <sup class="c" data-ref="FDA-Colcrys,Ozen2025" title="Source 63,203">63,203</sup>'},
 attack:{n:'In an attack right now',steps:[1,1,1,0,1],
  note:'Recommendation 11 of the 2024 guideline: during a characteristic attack the colchicine dose is not increased. The usual dose continues, NSAIDs are used for symptoms, and the recommendation names neither glucocorticoids nor opioids. The patient-information source says plainly that raising the dose during an attack does not help. Both versions say other causes, such as appendicitis, must always be considered. <sup class="c" data-ref="Ozen2025,PRINTO2016G,Ozen2016" title="Source 199,203,216">199,203,216</sup>'},
 missed:{n:'A dose was missed',steps:[1,1,1,1,0],
  note:'For prophylaxis, including FMF, the label says to take the dose as soon as possible and then resume the normal schedule, and that a skipped dose must not be made up by doubling the next one. The label\'s 12-hour rule belongs to a dose missed while treating a gout flare, not to FMF. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>'}
};
const NU_STEPS=[
 {t:'The order',d:'Dose and whether it is given once or split.'},
 {t:'Interactions',d:'Strong CYP3A4 and P-glycoprotein inhibitors, statins, grapefruit.'},
 {t:'Kidneys and liver',d:'Clearance, and the bloods that follow it.'},
 {t:'Where in the illness',d:'Attack or no attack changes nothing about the dose.'},
 {t:'What was actually taken',d:'Missed doses, and what the patient believes about them.'}
];
const NU_INJ=[
 {n:'Outer upper arm',x:96,y:96},{n:'Abdomen',x:210,y:150},{n:'Front of mid thigh',x:170,y:236},
 {n:'Outer upper arm',x:324,y:96},{n:'Upper outer buttock',x:300,y:190},{n:'Front of mid thigh',x:250,y:236}
];
const NU_BIO=[
 {n:'Anakinra',s:'Off-label in FMF (US)',b:['100 mg a day, or 2 mg/kg, subcutaneously daily.','Sites named by the label: outer upper arms, abdomen except the 2-inch area around the navel, front of the middle thighs, upper outer buttocks. A new site each time, which may reduce the risk of injection-site amyloid deposits. No minimum distance from the last site is given.','Refrigerate at 2–8 °C, do not freeze or shake, protect from light, and let the syringe stand at room temperature for 30 minutes first.','Injection-site reactions in 71% of the rheumatoid arthritis trials, usually in the first 4 weeks; 16.3% in NOMID in the first 6 months, none after year 2.','Neutrophils before starting, monthly for 3 months, then quarterly for up to a year.','Its US indications are rheumatoid arthritis, NOMID and DIRA, so FMF use is off-label.'],c:'<sup class="c" data-ref="KineretPI,Ozen2025" title="Source 127,203">127,203</sup>'},
 {n:'Canakinumab',s:'FMF is in the US label',b:['150–300 mg, or 2–4 mg/kg, subcutaneously every 4–8 weeks.','Store unopened vials at 2–8 °C in the original carton, do not freeze. Preservative-free.','The label says to avoid injecting into scar tissue, because it may give insufficient exposure.','Injection-site reactions in 10.1% in the TRAPS, HIDS/MKD and FMF study, all mild or moderate, none leading to stopping.','It reports neutropenia and other cytopenias but gives no blood-count interval.'],c:'<sup class="c" data-ref="IlarisPIG,Ozen2025" title="Source 105,203">105,203</sup>'},
 {n:'Rilonacept',s:'Off-label in FMF (US)',b:['2.2 mg/kg, maximum 160 mg, subcutaneously weekly. A 320 mg loading dose is given as two 160 mg injections the same day at different sites.','Reconstituted with 2.3 mL preservative-free sterile water, shaken about a minute, left to stand a minute, used within 3 hours. Vials are single-use.','Sites: abdomen, thigh or upper arm, avoiding within 2 inches of the navel and skin that is bruised, red, tender or hard, rotating each time.','Injection-site reactions in 48% in the CAPS placebo-controlled phase, against 13% on placebo.','The label advises monitoring lipids, and growth and development in children.','Its US indications are CAPS, maintenance of remission of DIRA and recurrent pericarditis.'],c:'<sup class="c" data-ref="ArcalystPI" title="Source 5">5</sup>'}
];
const NU_MYTHS=[
 {m:'Take extra when an attack starts',t:'Colchicine prevents attacks; it does not treat one under way',
  a:'The patient-information source states plainly that raising the dose during an attack does not help. Recommendation 11 of the 2024 guideline says the same from the clinician side: continue the usual dose, use NSAIDs for symptoms. <sup class="c" data-ref="PRINTO2016G,Ozen2025" title="Source 203,216">203,216</sup>',
  q:'Ask: "If an attack starts tonight, what will you do about your tablets?"'},
 {m:'Stop it when you feel well',t:'The point of it is the years with no symptoms',
  a:'Attacks and the risk of amyloidosis return if treatment stops. Poor adherence, especially in adolescence, raises the later risk of amyloidosis. The patient source advises not changing the dose without speaking to the doctor first. <sup class="c" data-ref="PRINTO2016G" title="Source 216">216</sup>',
  q:'Ask: "What do you think would happen if you stopped for a few months?"'},
 {m:'Attacks continue, so it has failed',t:'Resistance is only defined after adherence is confirmed',
  a:'The consensus definition requires recurrent attacks, on average one or more a month over three months, or persistent laboratory inflammation between attacks, after adherence has been confirmed. The 2024 guideline deliberately added the words "in adherent patients" to the dose-escalation recommendation. <sup class="c" data-ref="Ozen2021,Ozen2025" title="Source 202,203">202,203</sup>',
  q:'Ask: "In the last month, how many days did you miss a tablet?" rather than "are you taking it?"'},
 {m:'Diarrhoea means stopping',t:'The commonest side effect is usually managed, not a reason to stop',
  a:'The patient source describes lowering the dose until it is tolerated and then raising it slowly, and says cutting lactose for about three weeks may help. Blood counts may occasionally fall but usually recover when the dose comes down. Severe gut effects can herald more serious toxicity, so they are reported rather than endured. <sup class="c" data-ref="PRINTO2016G,FDA-Colcrys" title="Source 63,216">63,216</sup>',
  q:'Ask: "Has anything about the tablets been unpleasant enough to skip them?"'},
 {m:'It is unsafe in pregnancy',t:'The guideline names this misconception as a barrier',
  a:'Recommendation 10 states colchicine should be continued through conception, pregnancy and lactation, and that amniocentesis is not currently recommended. The guideline calls it essential to share with obstetricians that colchicine is safe in pregnancy, and lists "the misconception that colchicine is contraindicated in pregnancy" in its barriers table. The supporting review found female fertility unaffected, and men do not need to stop at recommended doses. <sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>',
  q:'Ask: "Has anyone suggested you should come off it if you became pregnant?"'},
 {m:'An attack is dangerous in itself',t:'Most parents do not know this one',
  a:'Of parents of 171 children with FMF, 90.1% knew colchicine is effective but only 39.2% knew there is no vital risk during an attack. The authors judged knowledge unsatisfactory and recommended continuing education from diagnosis onward. This does not apply to the red flags above, which are a different matter. <sup class="c" data-ref="Yildirim2021" title="Source 281">281</sup>',
  q:'Ask: "What worries you most when an attack starts?"'}
];
const NU_DOC=[
 {k:'attacks',l:'Attacks since the last visit',v:'Attacks in the last 3 months: 2. Sites: abdomen, abdomen. Longest 48 h.',c:true},
 {k:'current',l:'This episode: site, onset, duration so far',v:'This episode: abdominal, onset 06:40, 14 h so far, settling.',c:true},
 {k:'temp',l:'Temperature',v:'Temperature 38.4 °C.',c:true},
 {k:'exam',l:'Examination findings',v:'Abdomen: generalised guarding, rebound present, pain diffuse and not localising to the right lower quadrant. Chest and joints clear. Skin clear.',c:true},
 {k:'labs',l:'Acute-phase bloods',v:'CRP 96 mg/L, SAA pending, WCC 14.2 with neutrophil predominance, platelets and ferritin unchanged.',c:true},
 {k:'urine',l:'Urinalysis for protein',v:'Urinalysis: no protein.',c:true},
 {k:'tox',l:'Toxicity bloods',v:'FBC and liver function within range; CK not indicated, renal function normal.',c:false},
 {k:'adher',l:'Adherence, asked in a blame-free way',v:'Adherence: reports missing about 2 doses in the last month, usually at weekends.',c:true},
 {k:'meds',l:'What was actually taken, and interactions',v:'Colchicine 1.5 mg daily, taken this morning. No new CYP3A4 or P-gp inhibitor, no statin, no grapefruit.',c:true},
 {k:'pro',l:'What the patient reports',v:'Patient rates this attack 6/10 and says the last three months were better than the three before.',c:false},
 {k:'teach',l:'What was taught, and what they said back',v:'Teaching: why the dose is not increased during an attack. Patient explained it back correctly.',c:false},
 {k:'plan',l:'Plan and who was told',v:'Plan: continue usual dose, NSAID for symptoms, review in 6 months or sooner if attacks become monthly. Discussed with the rheumatology team.',c:false}
];
const NU_MON=[
 {m:0,t:'Diagnosis',d:'Follow-up is scheduled at frequent intervals after diagnosis and while the disease is unstable.',c:'<sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>'},
 {m:3,t:'Escalating a dose',d:'When the colchicine dose is being escalated in active disease, CRP and/or SAA at least every 3 months.',c:'<sup class="c" data-ref="Ozen2016,Ozen2017" title="Source 199,200">199,200</sup>'},
 {m:6,t:'Routine review',d:'Visits every 6 months may suffice if the disease is under control. Response is judged on attack frequency, quality of life and inflammatory markers. The 2016 version set this interval flatly; 2024 made it conditional.',c:'<sup class="c" data-ref="Ozen2025,Ozen2016" title="Source 199,203">199,203</sup>'},
 {m:9,t:'Tapering a biologic',d:'Where biologic doses are tapered or intervals stretched, close monitoring ideally every 3 months for flares or worsening inflammation.',c:'<sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>'},
 {m:12,t:'Urinalysis',d:'Urinalysis at least yearly, and more often if the disease is poorly controlled. The 2016 version asked for one at every clinic visit.',c:'<sup class="c" data-ref="Ozen2025,Ozen2016" title="Source 199,203">199,203</sup>'}
];
inits.nursing=()=>{
  /* ---- 1 · assessment ---- */
  $('#nuAssessLede').innerHTML='An attack is a moving target: it starts suddenly, peaks, and is gone inside three days. These are the findings the literature describes at each site, and the observations it does not describe, which this app leaves blank rather than filling in. <sup class="c" data-ref="Tufan2020,Livneh1997" title="Source 159,263">159,263</sup>';
  let site='abdo',flags=false;
  $('#nuSites').innerHTML='<span class="kicker">Look at</span>'+Object.entries(NU_SITES).map(([k,v])=>`<button class="btn" data-nus="${k}" aria-pressed="${k===site}">${v.n}</button>`).join('');
  const svg=$('#nuSvg'),rg=$('#nuT');
  const C={temp:h=>ramp(h,1,7)*(1-ramp(h,26,52)),pain:h=>ramp(h,.5,6)*(1-ramp(h,30,66)),
           crp:h=>{const x=h/40;return h<=0?0:Math.min(1,Math.pow(x,2.2)*Math.exp(2.2*(1-x)))},
           wcc:h=>ramp(h,2,12)*(1-ramp(h,40,72))};
  function draw(u){
    const N=vb(svg,'720 430','400 556');
    const h=u*120, S=NU_SITES[site];
    const L=N?{bx:20,by:26,bw:360,rowH:60, bodyX:296,bodyY:286, envX:20,envY:478,envW:360}
             :{bx:20,by:26,bw:300,rowH:60, bodyX:356,bodyY:34,  envX:20,envY:318,envW:660};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // observation rows
    const OBS=[['temp','Temperature',v=>(37+2.8*v).toFixed(1)+' °C','var(--terra)'],
               ['pain','Pain at the site',v=>Math.round(v*10)+'/10','var(--bad)'],
               ['crp','CRP',v=>Math.round(v*115)+' mg/L','var(--sea)'],
               ['wcc','White cells',v=>(5+v*9.5).toFixed(1),'var(--gold)']];
    OBS.forEach(([k,l,fmt,c],i)=>{const y=L.by+i*L.rowH,v=C[k](h);
      s+=`<text x="${L.bx}" y="${y}" class="t-sm" style="fill:${c}">${l.toUpperCase()}</text>`;
      s+=`<rect x="${L.bx}" y="${y+8}" width="${L.bw}" height="11" rx="5.5" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${L.bx}" y="${y+8}" width="${f1(L.bw*v)}" height="11" rx="5.5" style="fill:${c}"/>`;
      s+=`<text x="${L.bx+L.bw}" y="${y}" class="t-sm t-end"><tspan style="fill:var(--ink);font-weight:700">${fmt(v)}</tspan></text>`});
    // body figure with the selected site marked
    s+=`<g transform="translate(${L.bodyX} ${L.bodyY})"><circle cx="30" cy="12" r="9" style="fill:none;stroke:var(--muted);stroke-width:1.5"/><path d="M18 26 h24 l4 50 h-6 l-2 -30 M18 26 l-4 50 h6 l2 -30 M22 72 l-2 52 h6 l4 -44 l4 44 h6 l-2 -52" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-linejoin:round"/>`;
    if(S.dot)s+=`<circle cx="${S.dot[0]}" cy="${S.dot[1]}" r="${f1(6+3*C.pain(h))}" style="fill:var(--terra)"/>`;
    s+='</g>';
    // the envelope
    const ex=L.envX,ey=L.envY,ew=L.envW;
    s+=`<text x="${ex}" y="${ey-10}" class="t-sm">THE ENVELOPE · 12 to 72 hours</text>`;
    s+=`<rect x="${ex}" y="${ey}" width="${ew}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${f1(ex+ew*12/120)}" y="${ey}" width="${f1(ew*60/120)}" height="14" style="fill:var(--sea-soft)"/>`;
    s+=`<line x1="${f1(ex+ew*h/120)}" x2="${f1(ex+ew*h/120)}" y1="${ey-5}" y2="${ey+19}" style="stroke:var(--ink);stroke-width:2.5"/>`;
    [0,24,48,72,96,120].forEach((tk,i,a)=>s+=`<text x="${f1(ex+ew*tk/120)}" y="${ey+32}" class="t-xs ${i===a.length-1?'t-end':i===0?'':'t-mid'}">${tk}h</text>`);
    s+=`<text x="${ex}" y="${ey+50}" class="t-xs" style="fill:${h>72?'var(--bad)':'var(--muted)'}">${h>72?'beyond the described envelope: this is no longer a typical attack':'within the described envelope'}</text>`;
    svg.innerHTML=s;
    $('#nuRead').innerHTML=`<span>hour <b>${Math.round(h)}</b></span><span>temp <b>${(37+2.8*C.temp(h)).toFixed(1)} °C</b></span><span>CRP <b>${Math.round(C.crp(h)*115)} mg/L</b></span>`;
    const note=flags
      ? `<div class="kicker">Not a typical attack</div><h4>When to escalate</h4>`+NU_FLAGS.map(f=>`<div class="kv"><div><dt>${f.t}</dt><dd>${f.d}</dd></div></div>`).join('')
      : `<div class="kicker">${S.n}</div><h4>What the literature describes</h4><p>${S.what}</p>`+
        (S.hook?`<div class="hook"><b>Exam hook</b>${S.hook}</div>`:'')+
        (S.gap?`<div class="pt"><b>Where the evidence stops</b>${S.gap}</div>`:'');
    $('#nuNote').innerHTML=note;
  }
  const stop=playWire(rg,$('#nuPlay'),draw,13000,'Replay','nursing');
  $('#nuSites').addEventListener('click',e=>{const b=e.target.closest('[data-nus]');if(!b)return;site=b.dataset.nus;$$('[data-nus]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#nuFlag').onclick=()=>{flags=!flags;$('#nuFlag').setAttribute('aria-pressed',flags);$('#nuFlag').textContent=flags?'Back to the sites':'Show what is not a typical attack';draw(+rg.value)};
  $('#nuTools').innerHTML=NU_TOOLS.map(t=>`<div class="nu-card"><span class="tag sea">${t.s}</span><h5>${t.n}</h5><ul>${t.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${t.c}</p></div>`).join('');

  /* ---- 2 · giving the medicines ---- */
  $('#nuMedLede').innerHTML='Colchicine has a narrow therapeutic index, and most of what goes wrong with it goes wrong at the point of giving it. Pick a situation and see which check changes. <sup class="c" data-ref="Finkelstein2010,FDA-Colcrys" title="Source 63,67">63,67</sup>';
  let scen='routine';
  $('#nuScen').innerHTML='<span class="kicker">Situation</span>'+Object.entries(NU_SCEN).map(([k,v])=>`<button class="btn" data-nusc="${k}" aria-pressed="${k===scen}">${v.n}</button>`).join('');
  const msv=$('#nuMedSvg');
  function drawMed(){
    const N=vb(msv,'560 400','400 440');
    const S=NU_SCEN[scen];let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const w=N?360:480, x=N?20:40;
    NU_STEPS.forEach((st,i)=>{const y=26+i*72,ok=S.steps[i];
      s+=`<rect x="${x}" y="${y}" width="${w}" height="58" rx="11" style="fill:var(--panel);stroke:${ok?'var(--line)':'var(--terra)'};stroke-width:${ok?1:2.5}"/>`;
      s+=`<circle cx="${x+26}" cy="${y+29}" r="13" style="fill:${ok?'var(--good-soft)':'var(--terra-soft)'};stroke:${ok?'var(--good)':'var(--terra)'};stroke-width:2"/>`;
      s+=ok?`<path d="M${x+20} ${y+29} l4 5 8 -10" style="fill:none;stroke:var(--good);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`
           :`<text x="${x+26}" y="${y+34}" class="t-lbl t-mid" style="fill:var(--terra)">!</text>`;
      s+=`<text x="${x+50}" y="${y+24}" class="t-lbl">${st.t}</text><text x="${x+50}" y="${y+42}" class="t-xs">${st.d}</text>`});
    msv.innerHTML=s;
    $('#nuMedNote').innerHTML=`<div class="kicker">${S.n}</div><h4>What changes</h4><p>${S.note}</p>`+
      (scen==='routine'?'<div class="hook"><b>Exam hook</b>Overdose can be fatal and there is no antidote. The 2024 guideline asks that intentional or accidental overdosing be carefully assessed, with suicidal ideation or intent evaluated, and that families be told about the narrow therapeutic index. The label advises keeping it out of reach of children. <sup class="c" data-ref="Ozen2025,FDA-Colcrys,Denke2026" title="Source 51,63,203">51,63,203</sup></div>':'');
    $('#nuMedCap').textContent='Five checks, and which one the situation changes. The checks are drawn from the label and the guideline, not from a local protocol.';
  }
  $('#nuScen').addEventListener('click',e=>{const b=e.target.closest('[data-nusc]');if(!b)return;scen=b.dataset.nusc;$$('[data-nusc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMed()});
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawMed();drawInj(injI);drawMon(+$('#nuMonT').value)};

  /* injection sites */
  const isv=$('#nuInjSvg');let injI=0,injTimer=null;
  function drawInj(k){
    vb(isv,'420 320','400 330');
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<g transform="translate(150 20)"><circle cx="60" cy="22" r="17" style="fill:none;stroke:var(--muted);stroke-width:2"/><path d="M34 50 h52 l10 104 h-14 l-6 -62 M34 50 l-10 104 h14 l6 -62 M44 142 l-6 110 h14 l8 -92 l8 92 h14 l-4 -110" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-linejoin:round"/></g>`;
    NU_INJ.forEach((p,i)=>{const on=i===k;
      s+=`<circle cx="${p.x}" cy="${p.y}" r="${on?13:9}" style="fill:${on?'var(--sea)':'var(--sea-soft)'};stroke:var(--sea);stroke-width:2"/>`;
      if(on)s+=`<circle cx="${p.x}" cy="${p.y}" r="20" style="fill:none;stroke:var(--sea);stroke-width:1.5;opacity:.5"/>`});
    const p=NU_INJ[k];
    s+=`<text x="210" y="300" class="t-lbl t-mid">${p.n}</text><text x="210" y="316" class="t-xs t-mid">site ${k+1} of ${NU_INJ.length} · a new site each time</text>`;
    isv.innerHTML=s;
    $('#nuInjNote').innerHTML='<div class="kicker">Subcutaneous sites</div><h4>Rotating them</h4><p>These are the sites the labels name. Anakinra\'s instructions list the outer upper arms, the abdomen except the 2-inch area around the navel, the front of the middle thighs and the upper outer buttocks, and tell the patient to choose a new site each time, which may reduce the risk of injection-site amyloid deposits. Skin that is bruised, red, scarred, hard, thickened or lumpy is avoided. No minimum distance from the last site is given. <sup class="c" data-ref="KineretPI" title="Source 127">127</sup></p><div class="hook"><b>Exam hook</b>Injection-site reactions differ sharply: 71% with anakinra in the rheumatoid arthritis trials, 48% with rilonacept in the CAPS placebo-controlled phase against 13% on placebo, and 10.1% with canakinumab in the TRAPS, HIDS/MKD and FMF study, all mild or moderate. <sup class="c" data-ref="KineretPI,ArcalystPI,IlarisPIG" title="Source 5,105,127">5,105,127</sup></div><div class="pt"><b>In plain words</b>The injection goes in a different spot each time, so the skin in any one place gets a rest.</div>';
  }
  /* with reduced motion the button steps one site at a time instead of looping */
  if(RM)$('#nuInjPlay').textContent='Next site';
  $('#nuInjPlay').onclick=()=>{
    if(RM){injI=(injI+1)%NU_INJ.length;drawInj(injI);return}
    if(injTimer){clearInterval(injTimer);injTimer=null;$('#nuInjPlay').textContent='Rotate through the sites';return}
    $('#nuInjPlay').textContent='Stop';
    injTimer=setInterval(()=>{injI=(injI+1)%NU_INJ.length;drawInj(injI)},1300);
  };
  const prevH=onHide.nursing;onHide.nursing=()=>{prevH&&prevH();if(injTimer){clearInterval(injTimer);injTimer=null;$('#nuInjPlay').textContent='Rotate through the sites'}};
  $('#nuBio').innerHTML=NU_BIO.map(b=>`<div class="nu-card"><span class="tag ${b.s.startsWith('FMF')?'good':'warn'}">${b.s}</span><h5>${b.n}</h5><ul>${b.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${b.c}</p></div>`).join('');

  /* ---- 3 · teaching ---- */
  $('#nuTeachLede').innerHTML='The 2024 guideline makes adherence the cornerstone of management and says the goals cannot be reached without a lifelong therapeutic alliance. It also names poor information about colchicine as a barrier to implementation. These are the six things the literature records people getting wrong. <sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>';
  let myth=0;
  function renderMyths(){
    $('#nuMyths').innerHTML=NU_MYTHS.map((m,i)=>`<button class="nu-q" data-nm="${i}" aria-expanded="${i===myth}"><span class="myth">Often believed</span><b>${m.m}</b></button>`).join('');
    const M=NU_MYTHS[myth];
    $('#nuMythNote').innerHTML=`<div class="kicker">What the literature says</div><h4>${M.t}</h4><div class="nu-ans"><p>${M.a}</p><p><b>${M.q}</b></p></div>`;
  }
  $('#nuMyths').addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;myth=+b.dataset.nm;renderMyths()});
  renderMyths();
  $('#nuTeachCards').innerHTML=`
   <div class="nu-card"><h5>What the guidelines ask of education</h5><ul><li>Overarching principle 3, agreed by everyone on the panel: FMF needs lifetime management, so adherence is the cornerstone, and education of patient and family is crucial.</li><li>Education should cover disease, medication, adherence, prevention and self-management, and the research agenda lists tools to improve it as an open need.</li><li>The panel noted patients preferred the word "holistic" to "patient-centred".</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025" title="Source 203">203</sup></p></div>
   <div class="nu-card"><h5>How often it is not taken</h5><ul><li>72.8% of 324 Turkish children scored poorly adherent on the MASIF scale, many of whom reported taking it regularly.</li><li>Among 104 Turkish adults, adherence was low in 28.8% and moderate in 45.2%.</li><li>In an Israeli cohort of 4,526 patients the medication possession ratio was below 80% in more than half, and being on an IL-1 blocker did not improve it.</li><li>Self-report overestimates it: most of 179 patients were non-adherent on a validated questionnaire while far fewer said so.</li></ul><p class="stage-cap"><sup class="c" data-ref="ErdemTorun2026,Bolek2026,Levinsky2023,Tekgoz2021" title="Source 24,60,148,255">24,60,148,255</sup></p></div>
   <div class="nu-card"><h5>What has been tried, and worked</h5><ul><li>A randomised trial gave 70 adolescents individual disease-management education with a booklet: depression scores fell and quality of life rose, while the anxiety change was not significant. The authors describe it as a first study of nurses educating adolescents with FMF.</li><li>A second randomised trial in 43 children compared a purpose-built mobile game, a booklet and nothing. The game group gained in self-efficacy, symptom management and quality of life, and the effect lasted longer than the booklet\'s.</li><li>No randomised trial of a nurse-led intervention with colchicine adherence as its primary outcome, and no FMF study of teach-back or motivational interviewing, was found in an October 2026 search.</li></ul><p class="stage-cap"><sup class="c" data-ref="Kacan2023,KasAlay2026,PubMedSweepNursing2026" title="Source 116,120,219">116,120,219</sup></p></div>
   <div class="nu-card"><h5>Asking about adherence</h5><ul><li>The guideline directs teams to the 2020 EULAR points to consider on non-adherence, summarising the method as setting up a safe environment and using open questions.</li><li>Those points report that 30 to 80% of people with rheumatic diseases do not take treatment as agreed, and organise the response into preventing non-adherence, removing structural barriers, assessing it without blame, and tailoring the fix to the cause.</li><li>Measuring colchicine in hair as an objective check is described in the guideline as experimental and costly.</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025,Ritschl2021" title="Source 203,224">203,224</sup></p></div>
   <div class="nu-card"><h5>Family, school and genetics</h5><ul><li>Telling the school about the condition, including what to do during an attack, is described as useful, and children on long-term colchicine can take part in any sport. No published template school or work letter was found.</li><li>FMF is mostly autosomal recessive, so parents are usually unaffected carriers; if one parent has FMF and the other is a carrier, there is a 50% chance a child is affected. Testing finds variants in only about 70 to 80% of patients.</li><li>Among 90 caregivers of Turkish children, most reported mild care burden and a substantial minority moderate or severe.</li></ul><p class="stage-cap"><sup class="c" data-ref="PRINTO2016G,Kosan2019" title="Source 137,216">137,216</sup></p></div>
   <div class="nu-card"><h5>Where to send people</h5><ul><li>The PRINTO and PReS family information pages cover treatment, follow-up tests, school, sport, pregnancy, inheritance and prognosis.</li><li>The FMF &amp; AID Global Association runs a helpline, educational materials and an international patient survey.</li><li>The Autoinflammatory Alliance is a US charity promoting awareness, diagnosis and care.</li></ul><p class="stage-cap"><sup class="c" data-ref="PRINTO2016G,FMFAID,AutoinflammatoryAlliance" title="Source 7,69,216">7,69,216</sup></p></div>`;

  /* ---- 4 · documentation ---- */
  $('#nuDocLede').innerHTML='Recommendation 6 of the 2024 guideline asks that response, toxicity and adherence be monitored regularly, with response judged on attack frequency, quality of life and inflammatory markers. Recommendation 12 sets a minimum outcome set. Tick what you observed and the entry assembles below. <sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>';
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

  /* monitoring year */
  const mv=$('#nuMonSvg'),mr=$('#nuMonT');
  function drawMon(t){
    const N=vb(mv,'720 230','400 420');
    const T=t*12;let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(N){
      NU_MON.forEach((e,i)=>{const y=30+i*76,on=T>=e.m;
        s+=`<circle cx="30" cy="${y}" r="9" style="fill:${on?'var(--sea)':'var(--panel-2)'};stroke:var(--sea);stroke-width:2"/>`;
        if(i<NU_MON.length-1)s+=`<line x1="30" x2="30" y1="${y+10}" y2="${y+66}" style="stroke:var(--line);stroke-width:2"/>`;
        s+=`<text x="52" y="${y-2}" class="t-lbl" style="opacity:${on?1:.45}">month ${e.m} · ${e.t}</text>`;
        s+=`<text x="52" y="${y+16}" class="t-xs" style="opacity:${on?1:.45}">${e.d.slice(0,58)}…</text>`});
    }else{
      const x0=60,x1=680,xm=m=>lerp(x0,x1,m/12);
      s+=`<line x1="${x0}" x2="${x1}" y1="120" y2="120" class="axis"/>`;
      for(let m=0;m<=12;m+=3)s+=`<text x="${f1(xm(m))}" y="146" class="t-xs t-mid">month ${m}</text>`;
      NU_MON.forEach((e,i)=>{const x=xm(e.m),on=T>=e.m,up=i%2===0;
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${up?80:120}" y2="${up?120:160}" style="stroke:var(--line);stroke-width:1.5"/>`;
        s+=`<circle cx="${f1(x)}" cy="120" r="8" style="fill:${on?'var(--sea)':'var(--panel-2)'};stroke:var(--sea);stroke-width:2"/>`;
        s+=`<text x="${f1(x)}" y="${up?70:180}" class="t-lbl t-mid" style="opacity:${on?1:.45}">${e.t}</text>`});
      s+=`<line x1="${f1(xm(Math.min(T,12)))}" x2="${f1(xm(Math.min(T,12)))}" y1="40" y2="200" style="stroke:var(--ink);stroke-width:1.5;opacity:.3"/>`;
    }
    mv.innerHTML=s;
    const reached=NU_MON.filter(e=>T>=e.m).slice(-1)[0]||NU_MON[0];
    $('#nuMonCap').innerHTML=`Month ${T.toFixed(0)} · <b>${reached.t}</b>. ${reached.d} ${reached.c}`;
  }
  playWire(mr,$('#nuMonPlay'),drawMon,9000,'Replay','nursing');
  $('#nuDocCards').innerHTML=`
   <div class="nu-card"><h5>The 2024 minimum outcome set</h5><ul><li>Recommendation 12, agreed by everyone on the panel: a minimum outcome set should include clinical disease activity, for example attack frequency per 3 months and physician assessment; patient experience, for example patient-reported outcome and experience measures; and biochemical markers, for example CRP and SAA.</li><li>Measures used in FMF studies: number of attacks per 3 months, attack site, quality of life, AIDAI, modified FMF50, physician global score, patient visual analogue score, CRP, SAA, SF-36, the Child Health Questionnaire and SF-12.</li><li>The panel recorded that no accepted definition of minimal disease activity existed, and that the existing tools lack the patient perspective.</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025" title="Source 203">203</sup></p></div>
   <div class="nu-card"><h5>Toxicity bloods, and a disagreement</h5><ul><li>Toxicity is assessed with complete blood counts and liver function tests, with dose reduction and investigation if liver enzymes exceed twice the upper limit of normal.</li><li>Creatine kinase is monitored carefully, with signs of toxicity, where renal function is reduced.</li><li>The panel recorded a real split: most paediatricians read a liver-enzyme rise as a colchicine effect in children subject to extra insults, while adult rheumatologists read it as inadequately controlled inflammation.</li><li>Children may show toxicity especially during viral infections, when raised enzymes or leukopenia may reflect the infection, concurrent NSAIDs and possibly antibiotics as well as the drug.</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025" title="Source 203">203</sup></p></div>
   <div class="nu-card"><h5>Amyloidosis follow-up</h5><ul><li>In AA amyloidosis the aim is complete and sustained control of biochemical inflammation measured by SAA, or a sensitive CRP where SAA is unavailable or costly.</li><li>Subclinical inflammation is monitored by SAA and proteinuria. A repeat biopsy for follow-up is not recommended.</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025" title="Source 203">203</sup></p></div>
   <div class="nu-card"><h5>Where the data goes</h5><ul><li>The Eurofever registry, hosted on the PRINTO website, collects baseline and cross-sectional clinical plus genetic data across the monogenic fevers and several related conditions. In its first 15 months it enrolled 1,360 patients from 64 centres in 28 countries, 376 of them with FMF.</li><li>The AIDA Network registry runs on REDCap with 3,769 fields in 23 instruments, across 110 centres in 23 countries.</li><li>A single registry across diseases was a deliberate choice, so manifestations can be compared and patients of uncertain classification included.</li></ul><p class="stage-cap"><sup class="c" data-ref="Toplak2011,DellaCasa2022" title="Source 46,259">46,259</sup></p></div>
   <div class="nu-card"><h5>Growth in children</h5><ul><li>Neither guideline version specifies an interval or method for growth monitoring, so this app does not state one.</li><li>What is published is reassurance about the outcome: in children treated over 10 years growth stayed within normal percentiles, and the patient-information source states that growth retardation is not a major problem.</li></ul><p class="stage-cap"><sup class="c" data-ref="BenChetrit2018Textbook,PRINTO2016G" title="Source 16,216">16,216</sup></p></div>`;
  draw(+rg.value);drawMed();drawInj(0);drawMon(+mr.value);
};
/* =============== 4.3 toward a cure =============== */
const CU_ST=[
 {l:['MEFV gene','two alleles'],k:'Stage 1 · The gene',t:'MEFV, and the alleles that matter',
  txt:'The FMF-associated gain-of-function variants cluster in the C-terminal B30.2 domain of pyrin: M694V, M680I, V726A. Those are the alleles any genetic cure would have to correct or silence. MEFV messenger RNA in blood is restricted to myeloid cells, and the gene switches on as CD34+ progenitors differentiate down the granulocyte line, which puts the target inside the bone-marrow stem and progenitor compartment. <sup class="c" data-ref="Park2016,Centola2000" title="Source 35,207">35,207</sup>',
  pt:'The fault is a small spelling change in one gene, and the cells that read that gene are made in the bone marrow.',
  hook:'FMF is <b>hematopoietic and cell-autonomous</b> in mice: bone marrow transplantation corrected the knock-in phenotype. That is why marrow-directed cures are even discussed. <sup class="c" data-ref="Chae2011" title="Source 37">37</sup>'},
 {l:['MEFV mRNA','the transcript'],k:'Stage 2 · The transcript',t:'From gene to message',
  txt:'MEFV transcription is tuned by inflammation: it is upregulated by interferon-γ, TNF and LPS and downregulated by IL-4, IL-10 and TGF-β. Silencing the message is possible in the dish. siRNA knockdown in the THP-1 monocytic line reached about 62% reduction in MEFV mRNA and shifted hundreds of inflammation, cell-cycle and autophagy genes. <sup class="c" data-ref="Centola2000,MEFVsiRNA2014" title="Source 35,170">35,170</sup>',
  pt:'Between the gene and the protein there is a message. You can shred the message instead of editing the gene.',
  hook:'Knockdown may be enough here because pyrin <b>loss</b> of function looks benign in mice, while <b>gain</b> of function causes disease. <sup class="c" data-ref="Chae2011" title="Source 37">37</sup>'},
 {l:['pyrin','PKN + 14-3-3','the brake'],k:'Stage 3 · The brake',t:'The brake FMF variants weaken',
  txt:'At rest, active RhoA drives PKN1 and PKN2 to phosphorylate pyrin at serine 208 and serine 242, and 14-3-3 proteins hold phospho-pyrin inactive. Park 2016 found that FMF B30.2 variants reduce pyrin\'s binding to PKN1 and to 14-3-3ε, which would explain why patient cells release IL-1β with little provocation; other work points instead to the later, microtubule-dependent step, so the exact weak point is still debated. That makes "put the brake back on" a defined drug target, separate from touching the gene at all. <sup class="c" data-ref="Park2016,Gao2016" title="Source 74,207">74,207</sup>',
  pt:'A healthy cell keeps pyrin clamped shut. FMF versions of pyrin do not hold the clamp well.',
  hook:'PKN activators (bryostatin-1, arachidonic acid) suppressed the pyrin inflammasome and cut constitutive IL-1β release from patient cells; the PKN inhibitor PKC412 did the opposite. <sup class="c" data-ref="Park2016" title="Source 207">207</sup>'},
 {l:['inflammasome','pyrin–ASC','caspase-1'],k:'Stage 4 · Assembly',t:'The inflammasome assembles',
  txt:'Released pyrin recruits ASC, which polymerises into a speck and activates caspase-1. In healthy cells this assembly obligatorily needs intact microtubules; FMF mutations lift that requirement and allow microtubule-independent ASC speck formation. That is the best mechanistic account of how colchicine works, and the basis of a functional diagnostic assay. In knock-in mice the pyrin inflammasome is ASC-dependent and NLRP3-independent, which is exactly why NLRP3 inhibitors are off-target for FMF. <sup class="c" data-ref="VanGorp2016,Gao2016,Chae2011,Coll2015" title="Source 37,40,74,270">37,40,74,270</sup>',
  pt:'The freed protein pulls a complex together. Colchicine makes that step harder in normal cells, and FMF cells partly bypass it.',
  hook:'NLRP3 inhibitors are the classic distractor: the <b>pyrin domain</b> is not the <b>pyrin sensor</b>. FMF is NLRP3-independent.'},
 {l:['IL-1β · IL-18','gasdermin D','pores'],k:'Stage 5 · The output',t:'Cytokines and pores',
  txt:'Caspase-1 cuts pro-IL-1β and pro-IL-18 into active cytokines and cleaves gasdermin D, whose N-terminal fragment forms membrane pores and drives pyroptosis. Gasdermin D is covalently druggable at a single reactive cysteine, Cys191 in humans: FDA-approved disulfiram blocks pore formation at nanomolar potency while leaving IL-1β and gasdermin D processing intact, dimethyl fumarate succinates the same cysteine, and necrosulfonamide modifies it too. All of that is cell and mouse work, including the report that dimethyl fumarate alleviates FMF in mice. No human has been treated this way for FMF. <sup class="c" data-ref="Hu2020,Humphries2020,Rathkey2018,LitGap-GSDMD" title="Source 101,102,154,220">101,102,154,220</sup>',
  pt:'The complex cuts two alarm signals loose and punches holes in the cell. Two already-approved drugs block the hole-punching step.',
  hook:'Blocking gasdermin D would stop the pyroptotic release while leaving some IL-1β signalling intact. Whether that is enough in a disease defined by IL-1β excess is <b>untested</b>. <sup class="c" data-ref="Hu2020" title="Source 101">101</sup>'},
 {l:['neutrophils','influx · attack'],k:'Stage 6 · The attack',t:'Neutrophils arrive, the attack happens',
  txt:'IL-1β recruits neutrophils and produces the fever and serositis that patients feel. This is the stage current standard care works on: anakinra beat placebo in colchicine-resistant FMF (1.7 vs 3.5 attacks a month), canakinumab gave 61% complete response against 6% on placebo in CLUSTER, and rilonacept cut median attacks from 2.00 to 0.77. All of them neutralise the output and need indefinite injections, leaving the mutant allele and the primed inflammasome in place. <sup class="c" data-ref="BenZvi2017,DeBenedetti2018,Hashkes2012" title="Source 20,44,93">20,44,93</sup>',
  pt:'This is the part you feel, and the part today\'s injections control.',
  hook:'Cytokine blockade is <b>suppression, not cure</b>: CLUSTER\'s extension showed sustained control, and attacks return on withdrawal. <sup class="c" data-ref="Ozen2020" title="Source 201">201</sup>'},
 {l:['SAA','from the liver'],k:'Stage 7 · SAA',t:'The acute-phase protein that does the damage',
  txt:'IL-1 drives the liver to make serum amyloid A. Attacks are what patients notice, but it is chronically raised SAA that builds amyloid. In 374 patients with AA amyloidosis of any cause, those in the highest SAA octile (155 mg/L or more) had 17.7 times the risk of death of those in the lowest, and deposits regressed in 60% of patients whose median SAA stayed below 10 mg/L. <sup class="c" data-ref="Lachmann2007,Ozen2016" title="Source 142,199">142,199</sup>',
  pt:'The protein that forms amyloid comes from the liver, and it rises whenever the inflammation is switched on, even quietly.',
  hook:'A cure has to normalise <b>SAA between attacks</b>, not only stop attacks. That is why the 2024 update targets subclinical inflammation. <sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>'},
 {l:['AA amyloid','kidney'],k:'Stage 8 · Amyloid',t:'The end of the pathway, and the one nothing reverses quickly',
  txt:'AA amyloid fibrils resist breakdown and turn over very slowly. Lowering the supply of precursor can let deposits regress overall, but every route on this page acts upstream: none of them clears amyloid that is already there, and the reports of regression on anakinra or tocilizumab are uncontrolled. Eprodisate, which interfered with fibril formation, showed a borderline effect in one randomised trial and then failed to meet its primary endpoint in the confirmatory phase 3. <sup class="c" data-ref="Ozen2016,Dember2007,KiactaPh3,Henes2022" title="Source 48,98,126,199">48,98,126,199</sup>',
  pt:'Once amyloid has built up in an organ, stopping the inflammation helps slowly and does not undo the deposits.',
  hook:'Open question 12 in the research literature: <b>nothing on this page treats established amyloid.</b>'}
];
const CU_STEPS=CU_ST.map((s,i)=>({from:i*.115,at:i*.115+.03,k:s.k,t:s.t,txt:s.txt,pt:s.pt,hook:s.hook}));
const CU_ROUTES={
 none:{n:'No intervention',b:-1,lvl:null},
 hsct:{n:'Allogeneic HSCT',b:1,lvl:'early',fix:'Replaces the whole myeloid compartment with donor cells that carry working pyrin.',
  ev:'One published human FMF case: a girl transplanted at age 4 from a sibling donor for congenital dyserythropoietic anaemia, with FMF as a comorbidity rather than the indication. Her symptoms resolved, colchicine was withdrawn, and she was attack-free at about 2 years. In mevalonate kinase deficiency, the closest comparator, an EBMT retrospective of 9 allogeneic transplants reported 7 complete remissions, but grade II–IV acute GvHD in 4, two transplant-related deaths and two second transplants. In cryopyrin-associated periodic syndrome, another inflammasome disease, a patient has been reported in long-term remission after allogeneic transplantation. In FMF knock-in mice, bone marrow transplantation corrected the phenotype. Every one of these is a single case or a nine-patient series, none of them in FMF except the one incidental case. <sup class="c" data-ref="Milledge2002,Jeyaratnam2022,Nakagawa2021,Chae2011" title="Source 37,115,176,180">37,115,176,180</sup>',
  obs:'Myeloablative allogeneic transplant carries double-digit treatment-related mortality against a disease with near-normal life expectancy on colchicine plus IL-1 blockade. NLRP3 inflammasome activation itself contributes to GvHD and transplant-related mortality, so toxicity in an inflammasome disease is not expected to be mild. <sup class="c" data-ref="Chae2011,Zemer1986,Nunes2021" title="Source 37,194,286">37,194,286</sup>',
  st:'No case series, registry cohort or trial of HSCT performed for FMF itself exists; a 2026 PubMed sweep returns only the single case. <sup class="c" data-ref="PubMedSweep2026" title="Source 218">218</sup>'},
 edit:{n:'Gene-corrected HSCs and base editing',b:1,lvl:'hyp',fix:'Corrects or knocks out the mutant MEFV allele in the patient\'s own stem cells, with no donor and no GvHD.',
  ev:'The modality is clinically validated in other diseases: exagamglogene autotemcel was approved for sickle cell disease in December 2023 and for transfusion-dependent β-thalassaemia in January 2024, and base-edited autologous cells (BEAM-101) have reached patients in sickle cell disease with reported fetal haemoglobin above 60%, in small, company-presented cohorts rather than a full peer-reviewed report. For MEFV itself there is nothing: no published preclinical or clinical base-editing, prime-editing or CRISPR-correction study in human hematopoietic stem cells. Patient-derived iPSCs carrying M694V have been made and turned into macrophages, but without an isogenic corrected control. <sup class="c" data-ref="Casgevy2023,Frangoul2021,BEAM101,LitGap-Editing,Hakobyan2024" title="Source 8,31,70,92,153">8,31,70,92,153</sup>',
  obs:'Exa-cel disrupts a repressor element, which is far easier than correcting a point mutation; FMF needs precise correction or allele-specific knockout of a missense variant. And every validated route still requires busulfan myeloablation, which carries the conditioning toxicity, infertility risk and secondary-malignancy concern. <sup class="c" data-ref="Frangoul2021,Casgevy2023,Park2016" title="Source 31,70,207">31,70,207</sup>',
  st:'No registered trial. In-vivo editing that would avoid conditioning altogether has no FMF data at all. <sup class="c" data-ref="CTgovSweep2026,LitGap-Editing" title="Source 42,153">42,153</sup>'},
 rna:{n:'RNA knockdown',b:2,lvl:'early',fix:'Destroys or silences the MEFV message so less variant pyrin is made, without touching the genome.',
  ev:'siRNA knockdown of MEFV in the THP-1 monocytic line reached about 62% reduction in mRNA and changed more than 300 genes, including CD36, LY96, S100A8, CCR1, CD53, TIRAP, MYD88 and CD14. That is cell-line work, presented as conference abstracts. <sup class="c" data-ref="MEFVsiRNA2014" title="Source 170">170</sup>',
  obs:'Delivery. Myeloid cells, and neutrophils above all, are among the hardest targets for systemic siRNA and lipid nanoparticles, whose validated tropism is hepatocyte-dominant. <sup class="c" data-ref="LitGap-RNA" title="Source 155">155</sup>',
  st:'No siRNA, antisense or RNA-editing candidate against MEFV has been published or registered; commercial MEFV siRNAs are research reagents. <sup class="c" data-ref="LitGap-RNA" title="Source 155">155</sup>'},
 brake:{n:'PKN activator or a 14-3-3 molecular glue',b:3,lvl:'hyp',fix:'Re-imposes the phosphorylation brake that FMF variants weaken, leaving pyrin in place but held shut.',
  ev:'The lever is real in cells: PKN activators bryostatin-1 and arachidonic acid suppressed the pyrin inflammasome and reduced constitutive IL-1β release from FMF patient cells, while the PKN inhibitor PKC412 activated it. The 14-3-3 side is pure chemistry-in-waiting: a stabiliser of the 14-3-3–pyrin interaction would be the most target-faithful FMF drug imaginable, and no such compound has been reported. <sup class="c" data-ref="Park2016,LitGap-SmallMolecule" title="Source 156,207">156,207</sup>',
  obs:'Bryostatin-1\'s pharmacology makes it a mechanistic probe, not a candidate. There is no pyrin-selective small molecule of any kind; searches for "pyrin inflammasome inhibitors" return NLRP3 chemistry instead. <sup class="c" data-ref="Park2016,LitGap-SmallMolecule" title="Source 156,207">156,207</sup>',
  st:'No PKN activator or 14-3-3 glue has entered an FMF trial. <sup class="c" data-ref="CTgovSweep2026" title="Source 42">42</sup>'},
 casp:{n:'Caspase-1 inhibitor',b:4,lvl:'early',fix:'Blocks the enzyme that cuts pro-IL-1β, pro-IL-18 and gasdermin D, so the whole output stops at once.',
  ev:'Two compounds reached the clinic in other diseases. Pralnacasan (VX-740) had its phase IIb rheumatoid arthritis programme voluntarily halted in November 2003 after a 9-month high-dose animal toxicology study showed minimal-to-moderate liver fibrosis, with no matching human liver signal reported. Belnacasan (VX-765) reached phase II in epilepsy and psoriasis, with one epilepsy trial terminated. Neither has been tested in FMF. <sup class="c" data-ref="Vertex2003,VX765" title="Source 272,274">272,274</sup>',
  obs:'An animal liver-fibrosis signal killed the lead compound, and blocking caspase-1 removes IL-1β, IL-18 and pyroptosis together, which is a wide suppression of innate immunity for a disease already managed well in most patients. <sup class="c" data-ref="Vertex2003" title="Source 272">272</sup>',
  st:'No FMF trial of any caspase-1 inhibitor. The claim that VX-765 was stopped specifically for liver toxicity traces to vendor copy, not primary sources. <sup class="c" data-ref="VX765" title="Source 274">274</sup>'},
 gsdmd:{n:'Gasdermin D inhibitor',b:5,lvl:'early',fix:'Blocks the pore that releases IL-1β and kills the cell, downstream of everything upstream of it.',
  ev:'Gasdermin D is covalently druggable at Cys191. Disulfiram, an approved drug, blocks pore formation at nanomolar potency while leaving IL-1β and gasdermin D processing intact and prevented LPS-induced septic death in mice. Dimethyl fumarate, also approved and licensed for multiple sclerosis, succinates the same cysteine and blocks pyroptosis, and its authors report that in mice it alleviates familial Mediterranean fever by targeting gasdermin D. That is the most FMF-specific small-molecule result in the literature, and it is a mouse model, not a patient. Necrosulfonamide modifies the same cysteine and prevented lethal sepsis in mice. Two approved drugs hitting the executioner is an unusually short repurposing path. <sup class="c" data-ref="Hu2020,Humphries2020,Rathkey2018" title="Source 101,102,220">101,102,220</sup>',
  obs:'No gasdermin D inhibitor has been given to an FMF patient in any published trial or case series, and none is registered anywhere, so the whole route rests on cell and mouse work. And it is not obvious that stopping the pore is enough when the disease is defined by IL-1β excess, part of which may still escape. <sup class="c" data-ref="LitGap-GSDMD,Hu2020" title="Source 101,154">101,154</sup>',
  st:'Open question 7 in the research literature: worth a trial, and nobody has run one. The mouse FMF result keeps this at early evidence rather than hypothesis. <sup class="c" data-ref="LitGap-GSDMD,Humphries2020" title="Source 102,154">102,154</sup>'},
 il1:{n:'IL-1 and IL-18 blockade',b:5,lvl:'est',fix:'Neutralises the cytokines after they are released, which is what today\'s standard care does.',
  ev:'Randomised evidence in colchicine-resistant FMF: anakinra 1.7 vs 3.5 attacks a month (P=0.037), canakinumab 61% complete response vs 6% in CLUSTER rising to 71% at 300 mg, rilonacept median 0.77 vs 2.00 attacks a month. A 2025 systematic review of 42 studies and 1,798 patients, including 6 randomised trials of IL-1 blockers, found them effective and relatively safe. IL-18 is a candidate target but not an established one: elevated attack-free levels in one cohort (about 879 pg/mL vs 315 in controls) were not confirmed later, and tadekinig alfa, the recombinant IL-18 binding protein, has been tested in NLRC4 gain-of-function and XIAP deficiency but never in FMF. <sup class="c" data-ref="BenZvi2017,DeBenedetti2018,Hashkes2012,Sag2025,Haznedaroglu2005,Cacan2021,NCT03113760" title="Source 20,28,44,93,95,183,229">20,28,44,93,95,183,229</sup>',
  obs:'It leaves the mutant allele and the primed inflammasome in place and needs indefinite injections. Attacks return when the drug stops. <sup class="c" data-ref="Ozen2020" title="Source 201">201</sup>',
  st:'Standard of care for colchicine-resistant disease, not a cure. Newer IL-1 traps are in trials: goflikicept has a placebo-controlled phase 2 programme with interim results presented in 2025, and an on-demand anakinra phase 3 started in June 2024. <sup class="c" data-ref="Ozen2025,NCT05092776,Goflikicept2025,NCT06336733" title="Source 84,188,192,203">84,188,192,203</sup>'},
 jak:{n:'JAK inhibitor',b:5,p:true,lvl:'early',fix:'Dampens downstream interferon and IL-6-type amplification, not the pyrin lesion itself.',
  ev:'A case-based review reported 4 patients refractory to IL-1 antagonists, anti-TNF agents and tocilizumab who improved on tofacitinib, with the authors cautioning that data are limited. A single patient with coexisting rheumatoid arthritis and colchicine-resistant FMF was reported fully controlled. A retrospective series of 3 patients on an oral JAK inhibitor has also been reported. <sup class="c" data-ref="Karadeniz2020,Gok2017,Salehzadeh2026" title="Source 85,119,230">85,119,230</sup>',
  obs:'No established mechanism links JAK/STAT to pyrin inflammasome activation: the output is IL-1β, IL-18 and gasdermin D, which are not JAK-dependent, so any benefit would be acting on downstream amplification rather than on the FMF lesion. With series of four patients or fewer and no controls, publication bias cannot be excluded. <sup class="c" data-ref="Park2016,Karadeniz2020" title="Source 119,207">119,207</sup>',
  st:'No randomised trial of any JAK inhibitor in FMF. The nearest registered studies are platform trials in rare immune-mediated inflammatory disease. <sup class="c" data-ref="NCT06285539" title="Source 191">191</sup>'},
 micro:{n:'Microbiome',b:3,p:true,lvl:'hyp',fix:'Would reduce the supply of RhoA-inactivating bacterial triggers that physiologically fire the pyrin inflammasome.',
  ev:'The first report linking MEFV genotype to gut bacteria compared 19 patients with 8 controls and concluded that host genotype shapes the commensal profile; it is in PLoS ONE, 2008, and is often miscited as PNAS. The largest FMF study since (119 patients, 61 controls) found enrichment of pro-inflammatory taxa, associations with homozygous MEFV genotypes and reduced bacterial network connectivity in colchicine-resistant patients. Colchicine itself expanded anti-inflammatory taxa, so treated cohorts are confounded by the drug. The only interventional data are a Lactobacillus acidophilus probiotic in Armenian patients in remission, which reduced Candida albicans and enterobacterial counts. A small Turkish pilot found largely similar diversity, which shows how inconsistent this literature is. <sup class="c" data-ref="Khachatryan2008,Delplanque2024,DiCiaula2020,TurkishPilot" title="Source 47,55,125,265">47,55,125,265</sup>',
  obs:'Everything is cross-sectional and colchicine-confounded. Whether the microbiome drives the phenotype or merely reflects it is unresolved, and no faecal transplant or defined-consortium study exists in FMF. <sup class="c" data-ref="DiCiaula2020,Delplanque2024" title="Source 47,55">47,55</sup>',
  st:'Mechanistically coherent, entirely untested as therapy. <sup class="c" data-ref="VanGorp2016,Park2016" title="Source 207,270">207,270</sup>'},
 colch:{n:'Colchicine',b:3,p:true,lvl:'est',fix:'Keeps the microtubule-dependent assembly step hard, which is the only disease-modifying small-molecule effect with hard outcome data.',
  ev:'In 1,070 patients followed 4 to 11 years, cumulative proteinuria was 1.7% at 11 years in adherent patients against 48.9% at 9 years in non-adherent ones. That is prevention of AA amyloidosis, and no other agent has anything like it. Mechanistically, pyrin inflammasome assembly obligatorily requires intact microtubules in healthy cells, and FMF variants lift that requirement, which is why the effect is partial. <sup class="c" data-ref="Zemer1986,VanGorp2016,Gao2016" title="Source 74,270,286">74,270,286</sup>',
  obs:'It is suppressive, not curative, it must be taken every day for life, and roughly 5 to 10% of patients are resistant with another 2 to 5% intolerant. It also acts downstream of pyrin dephosphorylation rather than upstream of it. <sup class="c" data-ref="Ozen2016,Ozen2017,Gao2016" title="Source 74,199,200">74,199,200</sup>',
  st:'First-line and lifelong in both the 2016 recommendations and the 2024 update. <sup class="c" data-ref="Ozen2016,Ozen2025" title="Source 199,203">199,203</sup>'}
};
const CU_LVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
inits.cure=()=>{
  const svg=$('#cuSvg'),rg=$('#cuT');let route='none';
  const CXs=CU_ST.map((_,i)=>66+i*118), BW=104, BY=86, BH=92, FY=216;
  const wrapC=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  /* narrow: the eight stages run top to bottom as a chain, the particles fall down
     the spine, and the barrier lies across it */
  function drawN(t){
    const R=CU_ROUTES[route],b=R.b;
    const SX=44, BX=68, NBW=316, NBH=52, P=66, Y0=62, GAP=34;
    const topOf=i=>Y0+i*P+(b>=0&&i>=b?GAP:0);
    const chainBot=topOf(7)+NBH+12, F0=46, F1=chainBot;
    const yb=b>=0?topOf(b)-20:1e9;
    let s=`<defs>${marker('cuA','var(--muted)')}${marker('cuB','var(--terra)')}</defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="26" class="t-sm" style="fill:var(--sea)">WHERE COULD WE INTERVENE?</text>`;
    s+=`<text x="14" y="40" class="t-xs">${R.n==='No intervention'?'no barrier in place':'barrier: '+R.n}</text>`;
    // the spine the signal runs down
    s+=`<line x1="${SX}" x2="${SX}" y1="${F0}" y2="${f1(F1)}" style="stroke:var(--line);stroke-width:3"/>`;
    CU_ST.forEach((st,i)=>{const dim=b>=0&&i>=b,o=dim?(R.p?.5:.28):1,reached=t>=CU_STEPS[i].from,y=topOf(i);
      s+=`<g style="opacity:${f1(o)}">`;
      s+=`<line x1="${SX}" x2="${BX-6}" y1="${f1(y+NBH/2)}" y2="${f1(y+NBH/2)}" style="stroke:var(--line);stroke-width:1.2"/>`;
      s+=`<rect x="${BX}" y="${f1(y)}" width="${NBW}" height="${NBH}" rx="12" style="fill:${reached&&!dim?'var(--panel)':'var(--panel-2)'};stroke:${reached&&!dim?'var(--sea)':'var(--line)'};stroke-width:${reached&&!dim?2:1.3}"/>`;
      s+=`<circle cx="${SX}" cy="${f1(y+NBH/2)}" r="10" style="fill:${reached&&!dim?'var(--sea)':'var(--panel)'};stroke:${reached&&!dim?'var(--sea)':'var(--line)'};stroke-width:1.6"/>`;
      s+=`<text x="${SX}" y="${f1(y+NBH/2+3.5)}" class="t-xs t-mid" style="fill:${reached&&!dim?'var(--on-sea)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${BX+14}" y="${f1(y+20)}" class="t-lbl">${st.l[0]}</text>`;
      s+=`<text x="${BX+14}" y="${f1(y+36)}" class="t-xs">${st.l.slice(1).join(' · ')}</text>`;
      s+='</g>';
      if(i<7&&!(b>=0&&i+1>=b))s+=`<path d="M${SX} ${f1(topOf(i)+NBH+1)} V${f1(topOf(i+1)-5)}" class="arrow" marker-end="url(#cuA)"/>`});
    // particles falling down the spine
    const nP=20,piled=[];
    for(let i=0;i<nP;i++){const u=((t*1.35+i/nP)%1);const y=lerp(F0,F1,u);
      if(y>yb){piled.push(i);continue}
      s+=`<circle cx="${SX}" cy="${f1(y)}" r="4.4" style="fill:var(--terra);opacity:.9"/>`}
    if(b>=0){
      piled.forEach((i,j)=>{const col=j%4,row=Math.floor(j/4);
        s+=`<circle cx="${f1(SX-16.5+col*11)}" cy="${f1(yb-8-row*11)}" r="4.4" style="fill:var(--terra);opacity:${f1(.9-row*.12)}"/>`});
      s+=`<line x1="14" x2="386" y1="${f1(yb)}" y2="${f1(yb)}" style="stroke:var(--bad);stroke-width:${R.p?4:6};${R.p?'stroke-dasharray:7 6;':''}stroke-linecap:round"/>`;
      s+=`<text x="386" y="${f1(yb-8)}" class="t-sm t-end" style="fill:var(--bad)">${R.p?'partial barrier':'barrier'}</text>`}
    let y=chainBot+22;
    s+=`<text x="14" y="${f1(y)}" class="t-xs">signal flow ↓</text>`;y+=16;
    wrapC(b>=0?'stages past the barrier are dimmed'+(R.p?', and the barrier is partial, so some signal gets through':''):'no barrier: the pathway runs end to end',56)
      .forEach(l=>{s+=`<text x="14" y="${f1(y)}" class="t-xs">${l}</text>`;y+=13});
    if(R.lvl){const col=R.lvl==='est'?'var(--good)':R.lvl==='early'?'var(--warn)':'var(--crocus)';
      const lbl=R.lvl==='est'?'ESTABLISHED':R.lvl==='early'?'EARLY EVIDENCE':'HYPOTHESIS';
      y+=10;
      s+=`<rect x="14" y="${f1(y)}" width="170" height="24" rx="7" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`;
      s+=`<text x="99" y="${f1(y+16)}" class="t-xs t-mid" style="fill:${col};font-weight:700">${lbl}</text>`;y+=40;
      wrapC(R.fix,56).forEach(l=>{s+=`<text x="14" y="${f1(y)}" class="t-xs" style="fill:var(--ink)">${l}</text>`;y+=13})}
    return{s:s,h:y+12};
  }
  function draw(t){
    const R=CU_ROUTES[route],b=R.b;
    const N=vb(svg,'960 340','400 700');
    if(N){const o=drawN(t);svg.setAttribute('viewBox','0 0 400 '+Math.round(o.h));svg.innerHTML=o.s;afterDraw(t,R,b);return}
    let s=`<defs>${marker('cuA','var(--muted)')}${marker('cuB','var(--terra)')}</defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="30" class="t-sm" style="fill:var(--sea)">WHERE COULD WE INTERVENE?</text>`;
    s+=`<text x="946" y="30" class="t-sm t-end">${R.n==='No intervention'?'no barrier in place':'barrier: '+R.n}</text>`;
    // flow line
    s+=`<line x1="14" x2="944" y1="${FY}" y2="${FY}" style="stroke:var(--line);stroke-width:3"/>`;
    const xb=b>=0?CXs[b]-BW/2-14:1e9;
    // boxes
    CU_ST.forEach((st,i)=>{const dim=b>=0&&i>=b,o=dim?(R.p?.5:.28):1;
      const reached=t>=CU_STEPS[i].from;
      s+=`<g style="opacity:${f1(o)}">`;
      s+=`<rect x="${CXs[i]-BW/2}" y="${BY}" width="${BW}" height="${BH}" rx="12" style="fill:${reached&&!dim?'var(--panel)':'var(--panel-2)'};stroke:${reached&&!dim?'var(--sea)':'var(--line)'};stroke-width:${reached&&!dim?2:1.3}"/>`;
      st.l.forEach((L,j)=>{s+=`<text x="${CXs[i]}" y="${BY+28+j*18}" class="${j?'t-xs':'t-lbl'} t-mid" style="font-size:${j?'9.5':'12'}px">${L}</text>`});
      s+=`<text x="${CXs[i]}" y="${BY+BH-10}" class="t-xs t-mid">${i+1}</text>`;
      s+=`<line x1="${CXs[i]}" x2="${CXs[i]}" y1="${BY+BH}" y2="${FY-8}" style="stroke:var(--line);stroke-width:1.2"/>`;
      s+='</g>';
      if(i<7)s+=`<path d="M${CXs[i]+BW/2+3} ${BY+BH/2} H${CXs[i+1]-BW/2-6}" class="arrow" marker-end="url(#cuA)" style="opacity:${f1(b>=0&&i+1>=b?.3:1)}"/>`});
    // particles
    const nP=20,piled=[];
    for(let i=0;i<nP;i++){const u=((t*1.35+i/nP)%1);let x=lerp(14,944,u);
      if(x>xb){piled.push(i);continue}
      s+=`<circle cx="${f1(x)}" cy="${f1(FY)}" r="4.4" style="fill:var(--terra);opacity:.9"/>`}
    if(b>=0){
      piled.forEach((i,j)=>{const col=j%5,row=Math.floor(j/5);
        s+=`<circle cx="${f1(xb-6-col*11)}" cy="${f1(FY-14+row*11)}" r="4.4" style="fill:var(--terra);opacity:${f1(.9-row*.12)}"/>`});
      s+=`<line x1="${f1(xb)}" x2="${f1(xb)}" y1="${BY-6}" y2="${FY+26}" style="stroke:var(--bad);stroke-width:${R.p?4:6};${R.p?'stroke-dasharray:7 6;':''}stroke-linecap:round"/>`;
      s+=`<text x="${f1(xb)}" y="${BY-14}" class="t-sm t-mid" style="fill:var(--bad)">${R.p?'partial barrier':'barrier'}</text>`;
      s+=`<text x="${f1(xb)}" y="${FY+42}" class="t-xs t-mid" style="fill:var(--bad)">${R.n}</text>`}
    s+=`<text x="14" y="${FY-12}" class="t-xs">signal flow</text>`;
    s+=`<text x="14" y="294" class="t-xs">${b>=0?'stages past the barrier are dimmed'+(R.p?' and the barrier is partial, so some signal gets through':''):'no barrier: the pathway runs end to end'}</text>`;
    // evidence strip
    if(R.lvl){const col=R.lvl==='est'?'var(--good)':R.lvl==='early'?'var(--warn)':'var(--crocus)';
      const lbl=R.lvl==='est'?'ESTABLISHED':R.lvl==='early'?'EARLY EVIDENCE':'HYPOTHESIS';
      s+=`<rect x="14" y="308" width="170" height="24" rx="7" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`;
      s+=`<text x="99" y="324" class="t-xs t-mid" style="fill:${col};font-weight:700">${lbl}</text>`;
      s+=`<text x="196" y="324" class="t-xs" style="fill:var(--ink)">${R.fix}</text>`}
    svg.innerHTML=s;
    afterDraw(t,R,b);
  }
  function afterDraw(t,R,b){
    const p=phaseOf(CU_STEPS,t);setSt(p);
    let extra='';
    if(R.lvl)extra=`<div class="kv"><div><dt>Route · ${R.n}</dt><dd><div class="evrow">${CU_LVL[R.lvl]}</div></dd></div>`+
      `<div><dt>What it would fix</dt><dd>${R.fix}</dd></div>`+
      `<div><dt>Best evidence</dt><dd>${R.ev}</dd></div>`+
      `<div><dt>Main obstacle</dt><dd>${R.obs}</dd></div>`+
      `<div><dt>Status</dt><dd>${R.st}</dd></div></div>`;
    $('#cuNote').innerHTML=noteHTML(CU_STEPS[p])+extra;
    $('#cuCap').textContent=`Stage ${p+1} of 8 · ${R.n==='No intervention'?'no barrier':'barrier at stage '+(b+1)+(R.p?' (partial)':'')}. Schematic pathway, not to scale.`;
  }
  const stop=playWire(rg,$('#cuPlay'),draw,18000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CU_STEPS,rg,draw,stop);
  $$('[data-cu]').forEach(btn=>btn.onclick=()=>{route=btn.dataset.cu;$$('[data-cu]').forEach(x=>x.setAttribute('aria-pressed',x===btn));draw(+rg.value)});
  draw(+rg.value);

  /* ---- marrow replacement ---- */
  const ms=$('#cuMarrow'),mr=$('#cuM'),pr=$('#cuPct');
  const MR=rng(77),MJ=Array.from({length:16},()=>({dx:MR()*2-1,dy:MR()*2-1}));
  function drawM(t){
    const target=+pr.value, cond=ease(ramp(t,.04,.26)), eng=ease(ramp(t,.26,.5)), sw=ease(ramp(t,.4,.92));
    const pct=target*sw, months=t*18;
    /* narrow: the niche and the bloodstream stack above the chimerism curve */
    const NA=vb(ms,'720 390','400 648');
    const M=NA
      ? {NX:14,NY:52,NW:372,NH:168, SX:152,SY:86,SDX:48,SDY:40, CDL:28,CDY:208,CDT:'conditioning clears host cells',
         EGX:372,EGA:'t-end', BX:14,BY:246,BW:372,BH:136, NUX:38,NUY:290,NUDX:44,NUDY:62,
         LGY:400,LG1:14,LG2:160, TTX:14,TTY:424,HYX:386,
         GX0:46,GX1:386,GY:540,GT:444, CPX:14,CPY:590}
      : {NX:18,NY:56,NW:286,NH:246, SX:58,SY:96,SDX:44,SDY:44, CDL:32,CDY:286,CDT:'conditioning clears host stem cells',
         EGX:196,EGA:'t-mid', BX:330,BY:56,BW:372,BH:152, NUX:362,NUY:100,NUDX:44,NUDY:66,
         LGY:226,LG1:344,LG2:470, TTX:344,TTY:248,HYX:694,
         GX0:344,GX1:694,GY:358,GT:266, CPX:20,CPY:324};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    // marrow niche
    s+=`<rect x="${M.NX}" y="${M.NY}" width="${M.NW}" height="${M.NH}" rx="18" style="fill:var(--cyto);stroke:var(--memb);stroke-width:3"/>`;
    s+=`<text x="${M.NX+14}" y="${M.NY-10}" class="t-sm" style="fill:var(--memb)">BONE-MARROW NICHE</text>`;
    // host stem cells fading
    for(let i=0;i<9;i++){const x=M.SX+(i%3)*M.SDX,y=M.SY+Math.floor(i/3)*M.SDY,o=1-cond;
      s+=`<circle cx="${x}" cy="${y}" r="${f1(11*(1-.5*cond))}" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:2;opacity:${f1(.15+.85*o)}"/>`}
    // conditioning label
    s+=`<text x="${M.CDL}" y="${M.CDY}" class="t-xs" style="fill:var(--bad);opacity:${f1(bump(t,.02,.34))}">${M.CDT}</text>`;
    // donor / corrected cells engrafting
    for(let i=0;i<9;i++){const x=M.SX+(i%3)*M.SDX,y=M.SY+Math.floor(i/3)*M.SDY;
      const o=eng*(i/9<target/100?1:.18);
      s+=`<circle cx="${f1(x+6)}" cy="${f1(y+6-30*(1-eng))}" r="11" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:2;opacity:${f1(o)}"/>`}
    s+=`<text x="${M.EGX}" y="${M.CDY}" class="t-xs ${M.EGA}" style="fill:var(--sea);opacity:${f1(eng)}">corrected cells engraft</text>`;
    // bloodstream
    s+=`<rect x="${M.BX}" y="${M.BY}" width="${M.BW}" height="${M.BH}" rx="18" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<text x="${M.BX+14}" y="${M.BY-10}" class="t-sm" style="fill:var(--sea)">CIRCULATING NEUTROPHILS</text>`;
    const nN=16,corr=Math.round(nN*pct/100);
    for(let i=0;i<nN;i++){const x=M.NUX+(i%8)*M.NUDX,y=M.NUY+Math.floor(i/8)*M.NUDY;
      const ok=i<corr;
      s+=neutro(x+MJ[i].dx*3,y+MJ[i].dy*3,13,1);
      s+=`<circle cx="${f1(x+MJ[i].dx*3)}" cy="${f1(y+MJ[i].dy*3)}" r="16" style="fill:none;stroke:${ok?'var(--sea)':'var(--terra)'};stroke-width:2.4"/>`}
    s+=`<text x="${M.LG1}" y="${M.LGY}" class="t-xs" style="fill:var(--terra)">○ variant pyrin</text>`;
    s+=`<text x="${M.LG2}" y="${M.LGY}" class="t-xs" style="fill:var(--sea)">○ corrected or donor-derived</text>`;
    // chimerism curve
    const GX0=M.GX0,GX1=M.GX1,GY=M.GY,GT=M.GT;
    s+=`<text x="${M.TTX}" y="${M.TTY}" class="t-sm">CORRECTED MYELOID CELLS OVER TIME</text>`;
    s+=`<text x="${M.HYX}" y="${M.TTY}" class="t-xs t-end" style="fill:var(--crocus);font-weight:700">HYPOTHETICAL CURVE</text>`;
    ['Hypothetical throughout. No FMF transplant survival','or chimerism data exist: the shape is set by the slider,','not measured in any patient.']
      .forEach((l,i)=>{s+=`<text x="${M.CPX}" y="${M.CPY+i*16}" class="t-xs" style="fill:var(--crocus)">${l}</text>`});
    [0,50,100].forEach(v=>{const y=lerp(GY,GT,v/100);s+=`<line x1="${GX0}" x2="${GX1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${GX0-6}" y="${f1(y+3)}" class="t-xs t-end">${v}%</text>`});
    let d='';const NP=60;
    for(let i=0;i<=NP;i++){const u=i/NP,tt=u*t;const v=target*ease(ramp(tt,.4,.92));
      d+=(i?'L':'M')+f1(lerp(GX0,GX1,u*t))+' '+f1(lerp(GY,GT,v/100))}
    s+=`<path d="${d}" style="fill:none;stroke:var(--sea);stroke-width:2.6"/>`;
    s+=`<line x1="${GX0}" x2="${GX1}" y1="${GY}" y2="${GY}" class="axis"/>`;
    [0,6,12,18].forEach(m=>s+=`<text x="${f1(lerp(GX0,GX1,m/18))}" y="${GY+16}" class="t-xs t-mid">${m}</text>`);
    s+=`<text x="${GX1}" y="${GY+30}" class="t-xs t-end">months after transplant</text>`;
    ms.innerHTML=s;
    $('#cuMRead').innerHTML=`<span>month <b>${months.toFixed(1)}</b></span><span>corrected myeloid cells <b>${pct.toFixed(0)}%</b></span><span>plateau set to <b>${target}%</b></span><span>phase <b>${t<.26?'conditioning':t<.5?'engraftment':'myeloid turnover'}</b></span>`;
  }
  const stopM=playWire(mr,$('#cuMPlay'),drawM,12000,'Replay','cure');
  pr.addEventListener('input',()=>drawM(+mr.value));
  drawM(+mr.value);
  $('#cuMNote').innerHTML=`<div class="kicker">Marrow replacement</div><h4>Why this animation is labelled, not promised</h4>
   <div class="evrow">${CU_LVL.hyp} <span class="t-sm">for FMF as a strategy</span></div>
   <p>FMF is recessive, and Mefv-null mice show no spontaneous autoinflammation while B30.2 knock-in mice do. So partial correction of the myeloid compartment might be enough, and monoallelic correction or knockout of the mutant allele should in principle restore the brake. That is a hypothesis: there is no validated surrogate for "enough corrected myeloid cells" in FMF, unlike the fetal-haemoglobin threshold in sickle cell disease. SAA and attack rate are the only candidate readouts. <sup class="c" data-ref="Chae2011,Park2016,Casgevy2023,Ozen2025" title="Source 31,37,203,207">31,37,203,207</sup></p>
   <div class="evrow">${CU_LVL.early} <span class="t-sm">human data</span></div>
   <p>One FMF patient has been transplanted and reported: a girl transplanted at age 4 for congenital dyserythropoietic anaemia, with FMF as a comorbidity rather than the indication, attack-free off colchicine at about 2 years. The paper is in Blood, 2002, and the word "cure" in its title is the authors\' framing of a single observation. No confirmatory case has appeared in 24 years. In mevalonate kinase deficiency, 9 allogeneic transplants produced 7 complete remissions but also grade II–IV acute GvHD in 4 patients and two transplant-related deaths. <sup class="c" data-ref="Milledge2002,Jeyaratnam2022" title="Source 115,176">115,176</sup></p>
   <div class="evrow"><span class="ev early">Early evidence</span> <span class="t-sm">the autologous route</span></div>
   <p>Both clinically validated stem-cell cures, exa-cel and BEAM-101, require busulfan myeloablation before infusion, so the conditioning toxicity, infertility risk and secondary-malignancy concern largely persist even without a donor. <sup class="c" data-ref="Casgevy2023,BEAM101" title="Source 8,31">8,31</sup></p>
   <div class="hook"><b>Exam hook</b>The risk-benefit is the whole argument. Life expectancy on colchicine plus IL-1 blockade is near normal, and myeloablative transplant carries double-digit treatment-related mortality. The commentary accompanying the mouse data says plainly that transplant risks currently preclude its use in human FMF. <sup class="c" data-ref="Chae2011,Zemer1986" title="Source 37,286">37,286</sup></div>
   <div class="pt"><b>In plain words</b>Replacing the bone marrow would replace the cells that misbehave. It would also be a far more dangerous treatment than the tablets and injections that already control the disease in almost everyone.</div>`;

  /* ---- evidence table ---- */
  const T=[
   ['Allogeneic HSCT','Replaces the myeloid compartment with donor cells','1 human FMF case (n=1, 2 years); 7/9 remissions in mevalonate kinase deficiency with 2 transplant deaths; 1 CAPS case in long-term remission; corrected in knock-in mice','early','Treatment-related mortality and GvHD against near-normal life expectancy on current treatment','No trial or series for FMF itself'],
   ['Gene-corrected HSCs, base editing','Corrects or silences the mutant allele in the patient\'s own stem cells','Modality approved in sickle cell disease and β-thalassaemia; base editing in patients for sickle cell disease','hyp','Precise correction of a missense variant is harder than disrupting an enhancer; busulfan conditioning still required','No MEFV editing study published'],
   ['RNA knockdown','Removes the message before pyrin is made','~62% MEFV mRNA knockdown in a monocytic cell line','early','Delivery to myeloid cells, especially neutrophils','No candidate, no trial'],
   ['PKN activator or 14-3-3 glue','Restores the brake that FMF variants weaken','PKN activators suppressed the pyrin inflammasome and cut IL-1β from patient cells','hyp','No drug-like molecule exists; no 14-3-3 stabiliser reported','Chemistry gap'],
   ['Caspase-1 inhibitor','Stops cytokine maturation and pore cleavage together','Pralnacasan reached phase IIb in rheumatoid arthritis before an animal liver-fibrosis signal; belnacasan reached phase II elsewhere','early','Liver-fibrosis signal in animals; broad innate suppression','Never tested in FMF'],
   ['Gasdermin D inhibitor','Blocks the pore and pyroptotic release','Disulfiram blocks pore formation at nanomolar potency; dimethyl fumarate and necrosulfonamide hit the same cysteine, and dimethyl fumarate is reported to alleviate FMF in mice','early','Unknown whether blocking the pore suffices when IL-1β is the driver','Two approved drugs, no FMF patient treated'],
   ['IL-1 and IL-18 blockade','Neutralises the output after release','Three randomised trials in colchicine-resistant FMF; systematic review of 42 studies and 1,798 patients','est','Leaves the allele and the primed inflammasome in place; indefinite injections','Standard of care, not a cure'],
   ['JAK inhibitor','Dampens downstream amplification loops','Case series of 4 and smaller; one single-patient report','early','No mechanistic link to pyrin; tiny, uncontrolled series','No randomised trial'],
   ['Microbiome','Reduces the supply of pyrin-activating triggers','Taxa differences in 119 patients vs 61 controls; one probiotic study in remission','hyp','Cross-sectional and colchicine-confounded; causality unresolved','No causal or transplant study'],
   ['Colchicine','Keeps inflammasome assembly microtubule-dependent','1,070 patients: 1.7% cumulative proteinuria at 11 years adherent vs 48.9% at 9 years non-adherent','est','Suppressive and daily for life; 5–10% resistant, 2–5% intolerant','First-line in 2016 and in the 2024 update']
  ];
  $('#cuTbl').innerHTML=T.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${CU_LVL[r[3]]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join('');

  /* ---- open questions ---- */
  const Q=[
   ['Is FMF fully hematopoietic?',`Pyrin protein has been reported in dendritic cells and in synovial fibroblasts, which raises the possibility that a myeloid-only correction leaves residual disease. No human study has quantified the non-hematopoietic contribution. <sup class="c" data-ref="Diaz2004,Centola2000" title="Source 35,54">35,54</sup>`],
   ['Would correcting one allele be enough?',`Recessive inheritance and the benign Mefv-null mouse predict yes, but the clean experiment, a corrected and uncorrected iPSC-macrophage pair from the same patient, has not been published. <sup class="c" data-ref="Chae2011,Hakobyan2024" title="Source 37,92">37,92</sup>`],
   ['What editing efficiency would be therapeutic?',`Sickle cell disease has a measurable fetal-haemoglobin threshold. FMF has no validated surrogate for "enough corrected myeloid cells"; SAA and attack rate are the only candidates. <sup class="c" data-ref="Casgevy2023,Ozen2025" title="Source 31,203">31,203</sup>`],
   ['Can conditioning be avoided?',`Every clinically validated stem-cell cure so far requires busulfan myeloablation, which is hard to justify in a disease with near-normal survival on colchicine plus IL-1 blockade. <sup class="c" data-ref="Casgevy2023,BEAM101,Zemer1986" title="Source 8,31,286">8,31,286</sup>`],
   ['Is the single transplant case reproducible?',`One patient, about 2 years of follow-up, improvement that began during conditioning, and no reported correlation between chimerism and symptoms. No confirmatory case in 24 years. <sup class="c" data-ref="Milledge2002" title="Source 176">176</sup>`],
   ['Does a 14-3-3/pyrin molecular glue exist?',`It would be the most target-faithful FMF drug imaginable, and it is the most conspicuous gap in the chemistry literature. <sup class="c" data-ref="Park2016,LitGap-SmallMolecule" title="Source 156,207">156,207</sup>`],
   ['Are gasdermin D inhibitors worth a trial in FMF?',`Two approved drugs hit the executioner downstream of the pyrin inflammasome, and one of them, dimethyl fumarate, is reported to alleviate FMF in mice. No FMF patient has been given either, and no trial of either is registered. <sup class="c" data-ref="Hu2020,Humphries2020,LitGap-GSDMD" title="Source 101,102,154">101,102,154</sup>`],
   ['Does IL-18 blockade add anything to IL-1 blockade?',`IL-18 elevation in FMF is inconsistently reported, and tadekinig alfa has never been given to an FMF patient in a published study. <sup class="c" data-ref="Haznedaroglu2005,Cacan2021,NCT03113760" title="Source 28,95,183">28,95,183</sup>`],
   ['Why do JAK inhibitors appear to work?',`No mechanistic account links JAK/STAT to pyrin inflammasome activation. The effect may act on amplification loops, or may be publication bias in series of four patients or fewer. <sup class="c" data-ref="Karadeniz2020" title="Source 119">119</sup>`],
   ['Are statins harmful in FMF?',`The RhoA and geranylgeranyl pyrophosphate mechanism predicts that statins activate the pyrin inflammasome, yet patients with cardiovascular indications routinely receive them and no clinical study has looked. <sup class="c" data-ref="Park2016" title="Source 207">207</sup>`],
   ['Is the microbiome causal?',`All FMF microbiome findings are cross-sectional and confounded by colchicine. No faecal transplant, defined-consortium or longitudinal pre/post-treatment study exists. <sup class="c" data-ref="Delplanque2024,Khachatryan2008" title="Source 47,125">47,125</sup>`],
   ['What about amyloidosis that is already established?',`Every route on this page targets inflammation upstream. None addresses deposits already in an organ, and the regression reports on anakinra and tocilizumab are uncontrolled. <sup class="c" data-ref="Ozen2025,Henes2022" title="Source 98,203">98,203</sup>`],
   ['Would an attack-free but still-mutant patient be cured?',`The field has no agreed definition. Treatment-free remission, normalised SAA, absent subclinical inflammation and a corrected genotype are four different bars. <sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>`]
  ];
  $('#cuQA').innerHTML=Q.map((q,i)=>`<details><summary>${String(i+1).padStart(2,'0')} · ${q[0]}</summary><p>${q[1]}</p></details>`).join('');

  /* ---- hypothetical trial designs ---- */
  $('#cuTrials').innerHTML=`
   <div class="card"><h4>A: repurposing a gasdermin D inhibitor</h4>
     <div class="evrow"><span class="tag warn">Illustration only</span>${CU_LVL.early}</div>
     <p><b>Shape.</b> A small randomised crossover in colchicine-resistant FMF of an already-approved drug that inhibits gasdermin D, added to stable colchicine, with each patient spending equal time on drug and on placebo in random order and a washout between.</p>
     <p><b>Endpoints.</b> Attack rate per month, which is the endpoint the anakinra and rilonacept trials used, and SAA between attacks, which is the marker the 2024 update treats as the damage-prevention target.</p>
     <p><b>What would count as a signal.</b> A within-patient fall in attack rate of the size the rilonacept trial saw (2.00 to 0.77 a month), together with SAA moving toward the under-10 mg/L range, in a trial too small to be definitive but large enough to justify a proper phase 2.</p>
     <p><b>Why it is only an illustration.</b> No gasdermin D inhibitor has ever been given to an FMF patient in any published study, and this page is not suggesting anyone take one. <sup class="c" data-ref="Hu2020,Humphries2020,LitGap-GSDMD,Hashkes2012,Ozen2025" title="Source 93,101,102,154,203">93,101,102,154,203</sup></p></div>
   <div class="card"><h4>B: the preclinical gate before any editing trial</h4>
     <div class="evrow"><span class="tag warn">Illustration only</span>${CU_LVL.hyp}</div>
     <p><b>Shape.</b> Not a clinical trial at all. An isogenic pair of induced pluripotent stem cell lines from the same M694V patient, one corrected and one not, differentiated into macrophages side by side.</p>
     <p><b>Endpoints.</b> Constitutive and stimulated IL-1β release, ASC speck formation with and without microtubule disruption, and the microtubule-independence that FMF variants confer.</p>
     <p><b>What would count as a signal.</b> Correction of one allele restoring the healthy-donor phenotype, which would answer open question 2 and give the field its first dose-response estimate for how much correction is enough.</p>
     <p><b>Why it is only an illustration.</b> Patient iPSC lines with M694V exist and have been differentiated into macrophages, but without an isogenic corrected control; a Koç University thesis describes a CRISPR system for MEFV in such cells with no published efficiency or rescue data. <sup class="c" data-ref="Hakobyan2024,KocThesis2016,VanGorp2016,Park2016" title="Source 92,131,207,270">92,131,207,270</sup></p></div>
   <div class="card"><h4>C: an IL-18-high subgroup study</h4>
     <div class="evrow"><span class="tag warn">Illustration only</span>${CU_LVL.hyp}</div>
     <p><b>Shape.</b> Screen colchicine-resistant patients for serum IL-18, enrol only those in the high stratum, and test recombinant IL-18 binding protein added to existing treatment against placebo.</p>
     <p><b>Endpoints.</b> Attack rate, SAA, and the IL-18 level itself as the pharmacodynamic check that the drug engaged its target.</p>
     <p><b>What would count as a signal.</b> Benefit concentrated in the high-IL-18 stratum, which would turn an inconsistent biomarker into a stratifying one. A flat result across strata would be informative too: it would close the question.</p>
     <p><b>Why it is only an illustration.</b> IL-18 elevation in FMF is reported inconsistently, and tadekinig alfa has been tested in NLRC4 gain-of-function and XIAP deficiency but never in FMF. <sup class="c" data-ref="Haznedaroglu2005,Cacan2021,NCT03113760,NCT03512314" title="Source 28,95,183,185">28,95,183,185</sup></p></div>`;

  $('#cuClose').innerHTML=`<h3 class="sub">Where this leaves us</h3>
   <p>No approved therapy cures FMF today. Colchicine and IL-1 blockade control it, and they do so well enough that in one Turkish cohort of 587 patients survival did not differ significantly from the general population, though an Israeli cohort of adolescents did find higher mortality; both point to amyloidosis as the risk that matters. Every genuinely curative route on this page is either untested in FMF or untested in humans at all, and the ones with the clearest mechanism, editing the gene or replacing the marrow, are also the ones whose current form demands myeloablative conditioning. <sup class="c" data-ref="Akar2012,Twig2014,Zemer1986,Casgevy2023,CTgovSweep2026" title="Source 2,31,42,266,286">2,31,42,266,286</sup></p>
   <p>That is not a pessimistic reading. It is the reason the research agenda in the literature looks the way it does: short-path repurposing at the bottom of the pathway, a chemistry gap at the top, and a long list of questions that a handful of well-designed studies could answer. <sup class="c" data-ref="Cam2024" title="Source 29">29</sup></p>
   <div class="pt"><b>In plain words</b>Nothing available now removes FMF. What is available controls it, for most people, for life. The work on a cure is real but early, and no part of this page is advice about anyone\'s treatment.</div>`;
};
/* =============== 5.1 history & people =============== */
const HI_LANES=[['Clinic & names','var(--terra)'],['Treatment','var(--crocus)'],['Genes','var(--sea)'],['Mechanism','var(--gold)'],['Criteria & guides','var(--good)']];
const HI_EV=[
 {y:1908,l:0,c:'"an unusual paroxysmal syndrome"',h:'Janeway & Mosenthal: a paroxysmal syndrome',t:'1908 · A first sketch?',
  txt:`Janeway and Mosenthal described "an unusual paroxysmal syndrome, probably allied to recurrent vomiting" in a young Jewish girl with short febrile attacks and abdominal pain. It is often cited as the first description, though it is not certainly FMF. <sup class="c" data-ref="Janeway1908,Adwan2015" title="Source 1,111">1,111</sup>`},
 {y:1945,l:0,c:'"benign paroxysmal peritonitis"',h:'Siegal: "benign paroxysmal peritonitis"',t:'1945 & 1949 · Benign paroxysmal peritonitis',
  txt:`Sheppard Siegal, a New York physician, reported 10 cases as "benign paroxysmal peritonitis". This is generally regarded as the first accurate description. A second series followed in 1949. <sup class="c" data-ref="Siegal1945,Siegal1949,Adwan2015" title="Source 1,241,242">1,241,242</sup>`,
  pt:'The first doctor to describe the illness clearly called it a harmless, recurring inflammation of the belly lining.',
  hook:'Siegal called it <b>benign</b>. The later link to kidney disease and amyloidosis showed it was not.'},
 {y:1948,l:0,c:'"periodic disease"',h:'Reimann: "periodic disease"',t:'1948 · Periodic disease',
  txt:`Hobart Reimann, then at the American University of Beirut, grouped recurrent fevers, peritonitis, cyclic neutropenia and intermittent arthralgia as "periodic disease" and stressed their regular periodicity. FMF attacks are in fact irregular. <sup class="c" data-ref="Reimann1948,Adwan2015,BenChetrit2019" title="Source 1,17,221">1,17,221</sup>`},
 {y:1951.5,l:0,c:'linked to kidney disease',h:'Cattan & Mamou: the kidney link',t:'1951–52 · The kidney link',
  txt:`The French physicians Cattan and Mamou noted the association with kidney disease. Amyloidosis was reported about 7 years later by Tuqan in Beirut. Both reports are known here through a later historical review rather than the originals, so the dates and details are not independently verified. <sup class="c" data-ref="Adwan2015" title="Source 1">1</sup>`},
 {y:1958,l:0,c:'named familial Mediterranean fever',h:'Heller, Sohar & Sherf name it FMF',t:'1958 · "Familial Mediterranean fever"',
  txt:`At Tel Hashomer in Israel, Heller, Sohar and Sherf named the disease familial Mediterranean fever and stressed its genetic nature. Some sources date the name to an earlier Hebrew-language paper (unverified). <sup class="c" data-ref="Heller1958,Adwan2015" title="Source 1,97">1,97</sup>`,
  hook:'The name holds two facts: it runs in <b>families</b>, and it clusters around the <b>Mediterranean</b>.'},
 {y:1967,l:0,c:'survey of 470 patients',h:'Sohar et al.: a survey of 470 patients',t:'1967 · The Tel Hashomer survey',
  txt:`Sohar, Gafni, Pras and Heller published a survey of 470 patients with a review of the literature. It became the basis of the Tel Hashomer clinical criteria and of standard descriptions of onset age and attack features. <sup class="c" data-ref="Sohar1967" title="Source 244">244</sup> <a href="#dx" data-go="dx">See the criteria</a>`},
 {y:1972,l:1,c:'colchicine prevents attacks',h:'Goldfinger: colchicine prevents attacks',t:'1972 · Colchicine',
  txt:`Goldfinger\'s letter in the <i>New England Journal of Medicine</i> reported colchicine as prophylaxis for FMF attacks. It turned an often fatal disease, fatal through amyloidosis, into a treatable one. <sup class="c" data-ref="Goldfinger1972,Pras1998" title="Source 86,215">86,215</sup>`,
  pt:'A daily pill turned out to prevent the attacks. That changed everything.',
  hook:`Before colchicine, more than half of FMF patients died of amyloidosis. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>`},
 {y:1974,l:1,c:'controlled trials confirm it',h:'Controlled trials confirm colchicine',t:'1974 · The trials',
  txt:`Controlled trials in 1974 confirmed that daily colchicine prevents attacks: Zemer and colleagues at Tel Hashomer and a double-blind NIH trial by Dinarello and colleagues, both in the same <i>NEJM</i> issue, plus a double-blind study by Goldstein and Schwabe. <sup class="c" data-ref="Zemer1974,Dinarello1974,Goldstein1974" title="Source 56,87,285">56,87,285</sup>`},
 {y:1986,l:1,c:'proteinuria 1.7% vs 48.9%',h:'Zemer: colchicine prevents amyloidosis',t:'1986 · Amyloidosis prevented',
  txt:`Zemer and colleagues followed 1,070 patients for 4–11 years. In adherent patients without amyloidosis at the start, cumulative proteinuria was 1.7% at 11 years, against 48.9% at 9 years in non-adherent patients. Colchicine also stabilized early kidney disease. <sup class="c" data-ref="Zemer1986" title="Source 286">286</sup>`,
  hook:'Colchicine\'s most important job is preventing <b>amyloidosis</b>, shown by Zemer 1986.'},
 {y:1992,l:2,c:'gene mapped to chromosome 16p',h:'Pras et al.: the gene maps to 16p',t:'1992 · Mapping the gene',
  txt:`Pras, Aksentijevich, Kastner and colleagues at the NIH and Tel Hashomer mapped the FMF gene to the short arm of chromosome 16 by linkage in 27 non-Ashkenazi Jewish families, with a maximum LOD score of 19.86. <sup class="c" data-ref="Pras1992" title="Source 214">214</sup>`},
 {y:1997,l:2,c:'MEFV cloned · pyrin / marenostrin',h:'MEFV cloned: pyrin and marenostrin',t:'1997 · Two teams, one gene',
  txt:`Two consortia independently cloned <i>MEFV</i> on 16p13.3. The French FMF Consortium named the protein marenostrin, from <i>mare nostrum</i>, "our sea". The International FMF Consortium named it pyrin, found a transcript made almost only in granulocytes, and found ancestral haplotypes shared across populations. <sup class="c" data-ref="FrenchFMF1997,IntFMF1997,Adwan2015" title="Source 1,71,109">1,71,109</sup>`,
  pt:'In the same year, two teams found the gene and gave its protein two different names.'},
 {y:1997.6,l:4,c:'Livneh criteria published',h:'Livneh criteria published',t:'1997 · The Livneh criteria',
  txt:`Livneh and colleagues at Tel Hashomer published diagnostic criteria with sensitivity over 95% and specificity over 97% in 105 patients and 106 controls. <sup class="c" data-ref="Livneh1997" title="Source 159">159</sup> <a href="#dx" data-go="dx">Try them</a>`},
 {y:2003,l:2,c:'INFEVERS variant registry',h:'INFEVERS registry of variants',t:'2003 · INFEVERS',
  txt:`The INFEVERS registry of mutations in hereditary inflammatory disorders was set up in Montpellier and described in 2003. It grew into a multi-gene database; in 2026 it listed 412 <i>MEFV</i> sequence variants. <sup class="c" data-ref="SarrausteDeMenthiere2003,Milhavet2008,Infevers2026" title="Source 108,175,232">108,175,232</sup>`},
 {y:2011,l:3,c:'mice: FMF variants gain function',h:'Chae: knock-in mice show gain of function',t:'2011 · Gain of function in mice',
  txt:`Mice carrying human B30.2 domains with FMF variants developed severe IL-1β-driven inflammation that needed ASC but not NLRP3, while pyrin-knockout mice were healthy. FMF variants make pyrin more active, not less. <sup class="c" data-ref="Chae2011" title="Source 37">37</sup>`},
 {y:2014,l:3,c:'pyrin senses Rho modification',h:'Xu: pyrin senses Rho modification',t:'2014 · What pyrin senses',
  txt:`Xu and colleagues in Feng Shao\'s lab in Beijing showed that pyrin assembles a caspase-1 inflammasome when bacterial toxins inactivate Rho GTPases, for example <i>C. difficile</i> toxin TcdB. Pyrin guards a cell switch rather than detecting the microbe itself. <sup class="c" data-ref="Xu2014" title="Source 275">275</sup> <a href="#mech" data-go="mech">See it animated</a>`,
  hook:'Pyrin is a <b>guard</b> of RhoA activity, not a direct microbe sensor (Xu 2014).'},
 {y:2016,l:3,c:'RhoA–PKN–14-3-3 keeps pyrin off',h:'Park: RhoA–PKN–14-3-3 keeps pyrin off',t:'2016 · The off switch',
  txt:`Park, Wood, Kastner and Chae showed that active RhoA keeps pyrin switched off. RhoA-activated kinases PKN1/PKN2 phosphorylate pyrin, which then binds inhibitory 14-3-3 proteins. Defective prenylation in mevalonate kinase deficiency inactivates RhoA, which links FMF and HIDS. Whether the FMF variants themselves weaken that brake is still open: Park reported much less PKN and 14-3-3 binding to mutant pyrin, while Masters and colleagues found FMF B30.2 variants left pyrin phosphorylation and 14-3-3 binding roughly unchanged. <sup class="c" data-ref="Park2016,Masters2016" title="Source 169,207">169,207</sup>`},
 {y:2016.5,l:4,c:'EULAR: lifelong colchicine',h:'EULAR recommendations for FMF',t:'2016 · EULAR recommendations',
  txt:`The 2016 EULAR recommendations made lifelong colchicine the anchor of care and suggested that one or more attacks a month despite the maximum tolerated dose for at least 6 months may indicate colchicine resistance. They are superseded by the EULAR/PReS 2024 update, which keeps colchicine first line. <sup class="c" data-ref="Ozen2016,Ozen2025" title="Source 199,203">199,203</sup>`},
 {y:2018,l:1,c:'CLUSTER: 61% vs 6% response',h:'CLUSTER: canakinumab trial',t:'2018 · CLUSTER',
  txt:`In the phase III CLUSTER trial in colchicine-resistant FMF, 61% on canakinumab had a complete response at week 16 versus 6% on placebo. <sup class="c" data-ref="DeBenedetti2018" title="Source 44">44</sup> <a href="#ladder" data-go="ladder">The treatment ladder</a>`},
 {y:2019,l:4,c:'Eurofever/PRINTO criteria',h:'Eurofever/PRINTO classification criteria',t:'2019 · Eurofever/PRINTO',
  txt:`Classification criteria for recurrent fevers combined <i>MEFV</i> genotype with clinical items, and added a clinical-only set for FMF. In validation, the genotype + clinical set reached sensitivity 0.89 and specificity 1.00. <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup> <a href="#dx" data-go="dx">Try the calculator</a>`},
 {y:2020,l:2,c:'signs of recent selection (early)',h:'Park: selected by plague?',t:'2020 · A survival advantage?',
  txt:`<span class="ev early">Early evidence</span> Park and colleagues found signs of strong, recent positive selection around M694V and V726A. FMF-mutant pyrin binds the plague effector YopM less avidly, so cells release more IL-1β, and knock-in mice survived <i>Yersinia pestis</i> better. The link to historic plague pandemics is described as consistent with the data, not proven. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>`},
 {y:2025,l:4,c:'EULAR/PReS update published',h:'EULAR/PReS 2024 update published',t:'2025 · The 2024 EULAR/PReS update',
  txt:`The update, published in 2025, keeps lifelong colchicine and adherence at the centre, makes full control of subclinical inflammation an explicit target, and gives IL-1 blockade the strongest evidence as add-on therapy. <sup class="c" data-ref="Ozen2025,Cush2025" title="Source 43,203">43,203</sup>`}
];
const HI_ERA=[{f:1900,a:1908,t:'First sketches'},{f:1958,a:1958,t:'A name'},{f:1972,a:1972,t:'Colchicine'},{f:1992,a:1992,t:'The gene'},{f:2011,a:2014,t:'The mechanism'},{f:2016.5,a:2025,t:'Guidelines today'}];
const HI_NAMES=[['Periodic peritonitis',null],['Benign paroxysmal peritonitis',1945],['Periodic disease',1948],['Familial recurring polyserositis',null],['Armenian disease',null],['Maladie périodique',null],['Siegal–Cattan–Mamou disease',1951.5],['Familial Mediterranean fever',1958]];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  /* The axis is stretched after 1940 and again after 1990. fx() is the fraction of the
     axis a year sits at, so the wide and narrow layouts share one mapping. */
  const fx=y=>y<=1940?lerp(0,.1,(y-1900)/40):y<=1990?lerp(.1,.5545,(y-1940)/50):lerp(.5545,1,(y-1990)/35);
  const fy=u=>u<=.1?1900+u/.1*40:u<=.5545?1940+(u-.1)/.4545*50:1990+(u-.5545)/.4455*35;
  const tOfY=y=>clamp(fx(y));
  let XA=150,XB=700;
  const xOf=y=>XA+(XB-XA)*fx(y);
  const steps=HI_ERA.map(E=>({from:E.f===1900?0:tOfY(E.f),at:Math.min(1,tOfY(E.a)+.004),t:E.t}));
  const eraOf=y=>{let e=0;HI_ERA.forEach((E,i)=>{if(y>=E.f)e=i});return e};
  /* tiny svg helpers so the scenes below stay readable */
  const T=(x,y,c,st,v)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const RC=(x,y,w,h,st,r=4)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const PANEL='fill:var(--panel);stroke:var(--line)';

  /* ---------- the scene: one drawing per era, both layouts ----------
     Every caption below repeats a milestone that is already in HI_EV with its
     citation; anything that could not be cited is drawn without a caption. */
  function ward(A,yr,N){let s='';                      // 1900–1957: a ward, and a chart with no settled name
    const fl=A.y+A.h-46;
    s+=LN(A.x+6,fl,A.x+A.w-6,fl,'stroke:var(--line);stroke-width:2');
    const wx=A.x+12,wy=A.y+14,ww=52,wh=44;
    s+=RC(wx,wy,ww,wh,'fill:var(--sea-soft);stroke:var(--line)',5)+LN(wx+ww/2,wy,wx+ww/2,wy+wh,'stroke:var(--line)')+LN(wx,wy+wh/2,wx+ww,wy+wh/2,'stroke:var(--line)');
    const bw=190,bh=66,bx=A.x+A.w-bw-10,by=A.y+10;
    s+=RC(bx,by,bw,bh,PANEL,8)+T(bx+10,by+16,'t-xs','','ON THE CHART');
    const nm=yr<1908?['—','']:yr<1945?['“an unusual','paroxysmal syndrome”']:yr<1948?['“benign paroxysmal','peritonitis”']:['“periodic disease”',''];
    s+=T(bx+10,by+38,'t-sm','fill:var(--ink)',nm[0])+T(bx+10,by+54,'t-sm','fill:var(--ink)',nm[1]);
    if(yr>=1951.5){const kx=bx+34,ky=by+bh+40;
      s+=`<path d="M${kx} ${ky-19} a19 19 0 1 1 0 38 c5 -7 5 -12 5 -19 c0 -7 0 -12 -5 -19 z" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.6"/>`;
      s+=T(kx+28,ky+4,'t-xs','fill:var(--terra)','kidneys');}
    const bW=110,gp=(A.w-20-bW*3)/2,b0=fl-26;
    for(let i=0;i<3;i++){const x=A.x+10+i*(bW+gp),hot=i===1&&yr>=1908;
      s+=RC(x,b0,bW,24,'fill:var(--panel-2);stroke:var(--line)',4)+RC(x+4,b0-10,24,12,PANEL,3);
      s+=`<path d="M${f1(x+30)} ${b0} q${f1((bW-34)/2)} -16 ${bW-34} 0 z" style="fill:${hot?'var(--terra-soft)':'var(--panel)'};stroke:var(--line)"/>`;
      s+=`<circle cx="${x+16}" cy="${b0-4}" r="7" style="fill:${hot?'var(--terra)':'var(--muted)'};opacity:${hot?.9:.45}"/>`;
      s+=LN(x+2,b0+24,x+2,b0+32,'stroke:var(--line);stroke-width:2')+LN(x+bW-2,b0+24,x+bW-2,b0+32,'stroke:var(--line);stroke-width:2');
      if(hot)for(let k=0;k<3;k++)s+=`<path d="M${x+42+k*14} ${b0-18} q4 -7 8 0" style="fill:none;stroke:var(--terra);stroke-width:1.4;opacity:.75"/>`}
    if(yr>=1908)s+=T(A.x+10,fl+30,'t-xs','','short febrile attacks with abdominal pain, ending by themselves');
    return s}

  function bench(A,yr,N){let s='';                     // 1958–1971: Tel Hashomer, a microscope and a pedigree
    const mx=A.x+(N?40:54),my=A.y+24;
    s+=`<ellipse cx="${mx}" cy="${my+108}" rx="36" ry="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=RC(mx-6,my+44,12,62,'fill:var(--panel-2);stroke:var(--line)',4);
    s+=`<path d="M${mx+6} ${my+54} q26 8 22 38" style="fill:none;stroke:var(--muted);stroke-width:5;stroke-linecap:round"/>`;
    s+=RC(mx+16,my+6,16,48,'fill:var(--panel);stroke:var(--muted);stroke-width:1.6',5)+RC(mx+13,my-6,22,12,'fill:var(--panel-2);stroke:var(--muted)',3);
    s+=RC(mx+18,my+54,12,10,'fill:var(--muted);opacity:.6',2)+RC(mx-18,my+66,56,8,'fill:var(--panel-2);stroke:var(--line)',2);
    s+=RC(mx+6,my+61,24,5,'fill:var(--sea-soft);stroke:var(--sea)',1);
    const px=A.x+(N?150:200),py=A.y+16;
    const sq=(x,y,f)=>RC(x,y,20,20,`fill:${f?'var(--terra)':'var(--panel)'};stroke:var(--ink);stroke-width:1.6`,2);
    const ci=(x,y,f)=>`<circle cx="${x+10}" cy="${y+10}" r="10" style="fill:${f?'var(--terra)':'var(--panel)'};stroke:var(--ink);stroke-width:1.6"/>`;
    s+=sq(px,py,0)+ci(px+70,py,0)+LN(px+20,py+10,px+70,py+10,'stroke:var(--ink)');
    s+=LN(px+45,py+10,px+45,py+42,'stroke:var(--ink)')+LN(px+10,py+42,px+80,py+42,'stroke:var(--ink)');
    [[px,0],[px+35,1],[px+70,1]].forEach(([x,af],k)=>{s+=LN(x+10,py+42,x+10,py+54,'stroke:var(--ink)')+(k?sq(x,py+54,af):ci(x,py+54,af))});
    s+=T(px,py+100,'t-sm','fill:var(--ink)','it runs in families');
    if(yr>=1967){const dx=A.x+(N?12:170),dy=A.y+(N?158:162);
      for(let k=0;k<47;k++)s+=`<circle cx="${dx+(k%12)*13}" cy="${dy+Math.floor(k/12)*13}" r="3.4" style="fill:var(--terra);opacity:.85"/>`;
      s+=T(dx,dy+64,'t-xs','','each dot = 10 of the 470 patients')}
    return s}

  function pills(A,yr,N){let s='';                     // 1972–1991: the bottle, and attacks falling away
    const bx=A.x+10,by=A.y+18;
    s+=RC(bx+8,by,34,14,'fill:var(--crocus);opacity:.85',3)+RC(bx,by+14,50,62,'fill:var(--crocus-soft);stroke:var(--crocus);stroke-width:1.6',6);
    s+=RC(bx+7,by+30,36,20,'fill:var(--panel);stroke:var(--crocus);opacity:.9',3);
    [0,1,2].forEach(k=>{s+=`<ellipse cx="${bx+10+k*16}" cy="${by+88}" rx="7" ry="5" style="fill:var(--crocus);opacity:.8"/>`});
    s+=T(bx,by+108,'t-sm','fill:var(--crocus)','colchicine');
    const S=N?{x:A.x+78,y:A.y+20,w:A.w-90,h:80}:{x:A.x+92,y:A.y+20,w:180,h:88};
    s+=T(S.x,S.y-6,'t-xs','','attacks per month');
    s+=LN(S.x,S.y+S.h,S.x+S.w,S.y+S.h,'stroke:var(--muted)')+LN(S.x,S.y,S.x,S.y+S.h,'stroke:var(--muted)');
    const V=[.8,.55,.95,.6,.8,.45,.9,.6,.85,.5,.75,.6,.5,.3,.2,.12,.08,.06,.04,.05,.03,.04,.02,.03];
    let d='';V.forEach((v,k)=>{const x=S.x+4+k*(S.w-8)/(V.length-1),y=S.y+S.h-6-v*(S.h-14);d+=(k?'L':'M')+f1(x)+' '+f1(y)});
    s+=`<path d="${d}" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-linejoin:round"/>`;
    const mk=S.x+4+11.5*(S.w-8)/23;
    s+=LN(mk,S.y,mk,S.y+S.h,'stroke:var(--crocus);stroke-width:1.6;stroke-dasharray:3 3')+T(mk+5,S.y+10,'t-xs','fill:var(--crocus)','colchicine started');
    s+=T(S.x+S.w,S.y+S.h+13,'t-xs t-end','','months');
    if(yr>=1974){const tx=N?A.x+206:A.x+96,ty=N?A.y+134:A.y+150;
      for(let k=0;k<3;k++)s+=`<path d="M${tx+k*28} ${ty} l5 6 l10 -13" style="fill:none;stroke:var(--good);stroke-width:2.4;stroke-linecap:round"/>`;
      s+=T(tx,ty-12,'t-xs','fill:var(--good)','3 controlled trials')}
    if(yr>=1986){const B=N?{x:A.x+12,y:A.y+146,lx:118,ly:32}:{x:A.x+292,y:A.y+44,lx:0,ly:74},h0=44;
      s+=T(B.x,B.y,'t-xs','','proteinuria, 9–11 y');
      [['1.7% adherent',.017,'var(--good)'],['48.9% not adherent',.489,'var(--bad)']].forEach(([lb,v,c],k)=>{
        const x=B.x+6+k*46,h=Math.max(3,h0*v);
        s+=RC(x,B.y+10+h0-h,30,h,`fill:${c}`,2);
        s+=RC(B.x+B.lx,B.y+B.ly+k*16-8,9,9,`fill:${c}`,2)+T(B.x+B.lx+14,B.y+B.ly+k*16,'t-xs','',lb)})}
    return s}

  function genes(A,yr,N){let s='';                     // 1992–2010: chromosome 16, then the gene itself
    const cx=A.x+(N?30:44),cy=A.y+(N?92:104);
    const arm=(x,y,h)=>RC(x,y,11,h,'fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.4',5);
    s+=arm(cx-13,cy-58,50)+arm(cx+2,cy-58,50)+arm(cx-13,cy+8,66)+arm(cx+2,cy+8,66);
    s+=`<circle cx="${cx}" cy="${cy}" r="7" style="fill:var(--panel);stroke:var(--sea);stroke-width:1.6"/>`;
    s+=RC(cx-13,cy-54,26,7,'fill:var(--terra)',2);
    s+=T(cx-20,cy-44,'t-xs t-end','','p')+T(cx-20,cy+46,'t-xs t-end','','q')+T(cx,cy+92,'t-sm t-mid','fill:var(--ink)','16');
    s+=T(cx,cy-64,'t-xs t-mid','fill:var(--terra)',yr>=1997?'16p13.3':'16p');
    if(yr>=1997){const gx=A.x+(N?74:96),gy=A.y+26,gw=N?A.w-86:176;
      s+=LN(cx+14,cy-50,gx-6,gy+9,'stroke:var(--terra);stroke-dasharray:3 3');
      s+=RC(gx,gy,gw,18,'fill:var(--panel-2);stroke:var(--line)',4);
      for(let k=0;k<4;k++)s+=RC(gx+10+k*(gw-20)/4,gy,20,18,'fill:var(--sea);opacity:.75',3);
      s+=T(gx,gy-6,'t-sm','fill:var(--ink)','MEFV');
      const qx=gx+16,qy=gy+50;
      s+=LN(gx+gw/2,gy+18,qx+26,qy-12,'stroke:var(--muted);stroke-dasharray:3 3');
      s+=`<path d="M${qx} ${qy} q14 -18 30 -5 q18 -8 24 10 q8 16 -12 20 q-26 8 -42 -6 z" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/>`;
      s+=T(qx+62,qy+2,'t-sm','fill:var(--gold)','pyrin')+T(qx+62,qy+18,'t-sm','fill:var(--gold)','marenostrin');
      const nx=A.x+(N?92:108),ny=A.y+(N?124:196);
      s+=neutro(nx,ny,13,1)+T(nx+18,ny+4,'t-xs','','transcript almost only in granulocytes')}
    if(yr>=1997.6){const sx=N?A.x+74:A.x+296,sy=N?A.y+154:A.y+24;
      s+=RC(sx,sy,80,58,PANEL,5);
      for(let k=0;k<3;k++)s+=`<path d="M${sx+10} ${sy+16+k*16} l5 6 l10 -12" style="fill:none;stroke:var(--good);stroke-width:2"/>`+LN(sx+30,sy+18+k*16,sx+70,sy+18+k*16,'stroke:var(--line);stroke-width:2');
      s+=T(sx,sy-6,'t-xs','','Livneh criteria')}
    if(yr>=2003){const rx=N?A.x+180:A.x+296,ry=N?A.y+170:A.y+124;
      for(let k=2;k>=0;k--)s+=`<ellipse cx="${rx+34}" cy="${ry+10+k*13}" rx="34" ry="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=T(rx,ry-18,'t-sm','fill:var(--ink)','INFEVERS')+T(rx,ry-6,'t-xs','','412 variants (2026)')}
    return s}

  function cell(A,yr,N){let s='';                      // 2011–2016: the cell, and the brake on pyrin
    const cx=A.x+A.w/2,cy=A.y+(A.h-10)/2,rx=A.w/2-12,ry=(A.h-54)/2,off=yr>=2014;
    s+=T(A.x+6,A.y+12,'t-xs','','INSIDE THE CELL');
    s+=`<ellipse cx="${cx}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:4"/>`;
    const Rx=A.x+74,Ry=A.y+92;
    s+=`<circle cx="${Rx}" cy="${Ry}" r="20" style="fill:var(--panel);stroke:var(--sea);stroke-width:2.5;opacity:${off?.5:1}"/>`+T(Rx,Ry+4,'t-lbl t-mid','','RhoA');
    s+=T(Rx,Ry+36,'t-xs t-mid',`fill:${off?'var(--muted)':'var(--sea)'}`,off?'switched off':'ON');
    if(off)s+=`<path d="M${Rx-24} ${Ry-32} l16 14 -16 4z" style="fill:var(--terra)"/>`+T(A.x+70,A.y+52,'t-xs','fill:var(--terra)','bacterial toxin');
    s+=RC(Rx+30,Ry-12,50,24,`fill:var(--panel);stroke:var(--muted);opacity:${off?.4:1}`,7)+T(Rx+55,Ry+4,'t-xs t-mid','','PKN1/2');
    s+=LN(Rx+20,Ry,Rx+28,Ry,'stroke:var(--muted);stroke-width:2');
    const Px=A.x+124,Py=A.y+168;
    s+=`<circle cx="${Px}" cy="${Py}" r="13" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:2"/>`+T(Px,Py+4,'t-xs t-mid','fill:var(--terra);font-weight:700','PYD');
    s+=LN(Px+13,Py,Px+38,Py,'stroke:var(--muted);stroke-width:2')+RC(Px+38,Py-14,44,28,'fill:var(--panel);stroke:var(--crocus);stroke-width:2',6)+T(Px+60,Py+4,'t-xs t-mid','','B30.2');
    s+=T(Px-20,Py+4,'t-sm t-end','','pyrin');
    if(yr>=2011)s+=`<circle cx="${Px+82}" cy="${Py-14}" r="5" style="fill:var(--bad)"/>`+T(Px+90,Py-16,'t-xs','fill:var(--bad)','FMF variant');
    const lift=off?18:0;
    s+=`<g style="opacity:${off?.3:1}"><path d="M${Px+4} ${Py-26-lift} q0 -20 22 -20 h16 q22 0 22 20" style="fill:none;stroke:var(--sea);stroke-width:6;stroke-linecap:round"/>${T(Px+72,Py-44-lift,'t-xs','fill:var(--sea)','14-3-3')}</g>`;
    if(off){const sx=A.x+(N?280:320),sy=A.y+(N?100:128);
      for(let k=0;k<14;k++){const a=k/14*6.283;s+=`<circle cx="${f1(sx+Math.cos(a)*16)}" cy="${f1(sy+Math.sin(a)*16)}" r="3.6" style="fill:var(--crocus)"/>`}
      s+=T(sx,sy+32,'t-xs t-mid','','ASC speck');
      const ix=A.x+(N?292:356),iy=A.y+(N?152:104);
      s+=`<circle cx="${ix}" cy="${iy}" r="6" style="fill:var(--terra)"/>`+T(ix+10,iy+4,'t-xs','fill:var(--terra)','IL-1β')}
    s+=T(A.x+6,A.y+A.h-6,'t-xs','',yr>=2016?'active RhoA keeps pyrin switched off':off?'pyrin watches RhoA, not the microbe itself':'FMF variants make pyrin more active, not less');
    return s}

  function trials(A,yr,N){let s='';                    // 2016–2025: the trial result, then the guidelines
    s+=T(A.x+6,A.y+14,'t-sm','fill:var(--ink)','CLUSTER · COMPLETE RESPONSE AT WEEK 16');
    const F={x:A.x+(N?86:96),y:A.y+28,w:N?A.w-100:250};
    s+=LN(F.x,F.y+52,F.x+F.w,F.y+52,'stroke:var(--muted)');
    [0,50,100].forEach(v=>{const x=F.x+F.w*v/100;s+=LN(x,F.y+52,x,F.y+57,'stroke:var(--muted)')+T(x,F.y+70,'t-xs t-mid','',v+'%')});
    [['canakinumab',61,'var(--good)'],['placebo',6,'var(--muted)']].forEach(([l,v,c],k)=>{const y=F.y+10+k*22;
      s+=T(F.x-8,y+4,'t-xs t-end','',l)+LN(F.x,y,F.x+F.w,y,'stroke:var(--line);stroke-width:1.4');
      const x=F.x+F.w*v/100;s+=RC(x-6,y-6,12,12,`fill:${c}`,2)+T(x+12,y+4,'t-xs',`fill:${c}`,v+'%')});
    if(yr>=2019){const V={x:A.x+6,y:A.y+116};
      s+=T(V.x,V.y,'t-xs','','Eurofever/PRINTO validation');
      [['sensitivity 0.89',.89],['specificity 1.00',1]].forEach(([l,v],k)=>{const y=V.y+10+k*20;
        s+=RC(V.x,y,140,9,'fill:var(--panel-2)',4)+RC(V.x,y,140*v,9,'fill:var(--good)',4)+T(V.x+148,y+9,'t-xs','',l)})}
    const doc=(x,y,ttl)=>RC(x,y,100,60,PANEL,6)+LN(x+10,y+18,x+90,y+18,'stroke:var(--good);stroke-width:2')+LN(x+10,y+30,x+72,y+30,'stroke:var(--line);stroke-width:2')+LN(x+10,y+42,x+82,y+42,'stroke:var(--line);stroke-width:2')+T(x+50,y+56,'t-xs t-mid','fill:var(--good)',ttl);
    const gy=A.y+(N?172:168);
    s+=doc(A.x+6,gy,'EULAR 2016');
    if(yr>=2025)s+=doc(A.x+112,gy,'EULAR/PReS 2024');
    s+=T(A.x+(N?214:224),gy+34,'t-xs','','colchicine stays first line');
    return s}
  const SCENE=[ward,bench,pills,genes,cell,trials];

  function draw(t){
    /* narrow: the scene stacks above its caption list and the lane labels move above
       their bands, so the timeline keeps the full width */
    const N=vb(svg,'720 672','400 812');
    const L=N
      ? {XA:20,XB:386,yrX:8,yrY:26,hX:8,hY:46,
         sc:[6,54,388,378],A:{x:14,y:62,w:372,h:232},C:{x:14,y:302,w:372,h:122},
         LY:i=>460+i*46,bandH:26,labUp:1,
         axY:680,tkY:698,brY:686,ticks:[1900,1940,1960,1980,1990,2000,2010,2025],
         obLX:4,obLY:722,obY:730,obMk:776,phTop:441,phBot:762,yY:796,
         o1:'amyloidosis often fatal',o2:'largely preventable',m2:'1986: amyloid prevented'}
      : {XA:150,XB:700,yrX:10,yrY:24,hX:70,hY:23,
         sc:[6,34,708,250],A:{x:16,y:40,w:416,h:238},C:{x:446,y:40,w:262,h:238},
         LY:i=>314+i*50,bandH:46,labUp:0,
         axY:550,tkY:568,brY:556,ticks:[1900,1940,1960,1980,1990,2000,2010,2020,2025],
         obLX:10,obLY:602,obY:590,obMk:636,phTop:285,phBot:622,yY:656,
         o1:'amyloidosis a leading cause of death',o2:'amyloidosis largely preventable',m2:'1986: amyloid prevention shown'};
    XA=L.XA;XB=L.XB;
    const xp=lerp(XA,XB,t),yr=fy(t);
    let s=`<defs><linearGradient id="hiGrad" gradientUnits="userSpaceOnUse" x1="${f1(xOf(1972))}" x2="${f1(xOf(1990))}" y1="0" y2="0"><stop offset="0" style="stop-color:var(--bad)"/><stop offset="1" style="stop-color:var(--good)"/></linearGradient></defs>`;
    const done=HI_EV.filter(e=>e.y<=yr+.01),cur=done.length?done[done.length-1]:null,ph=phaseOf(steps,t);
    // headline
    if(cur)s+=T(L.yrX,L.yrY,'t-big',`font-size:22px;fill:${HI_LANES[cur.l][1]}`,Math.floor(cur.y))+T(L.hX,L.hY,'t-lbl','',cur.h);
    else s+=T(L.yrX,L.yrY,'t-lbl','fill:var(--muted)','Press play: the first milestone is 1908');
    // the scene
    s+=RC(L.sc[0],L.sc[1],L.sc[2],L.sc[3],'fill:var(--field);stroke:var(--line)',12);
    s+=SCENE[ph](L.A,yr,N);
    s+=LN(N?L.C.x:L.C.x-12,N?L.C.y-8:L.A.y,N?L.C.x+L.C.w:L.C.x-12,N?L.C.y-8:L.A.y+L.A.h,'stroke:var(--line)');
    s+=T(L.C.x,L.C.y+12,'t-sm','fill:var(--ink)',HI_ERA[ph].t.toUpperCase());
    const inEra=HI_EV.filter(e=>eraOf(e.y)===ph&&e.y<=yr+.01);
    inEra.forEach((e,k)=>{const y=L.C.y+34+k*20;
      s+=`<circle cx="${L.C.x+5}" cy="${y-4}" r="4" style="fill:${HI_LANES[e.l][1]}"/>`;
      s+=`<text x="${L.C.x+16}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${Math.floor(e.y)}</tspan>  ${e.c}</text>`});
    if(!inEra.length)s+=T(L.C.x+16,L.C.y+34,'t-xs','','the playhead has not reached this era yet');
    // lanes
    HI_LANES.forEach(([n,c],i)=>{const y=L.LY(i);
      s+=RC(XA-4,y-L.bandH/2,XB-XA+10,L.bandH,`fill:var(--panel-2);opacity:${i%2?.35:.7}`,8);
      s+=T(L.labUp?XA-4:10,L.labUp?y-L.bandH/2-6:y+4,'t-sm',`fill:${c}`,n);
      s+=LN(XA,y,XB,y,`stroke:${c};stroke-width:1;opacity:.35`)});
    // axis
    s+=`<line x1="${XA}" x2="${XB}" y1="${L.axY}" y2="${L.axY}" class="axis" style="stroke:var(--muted)"/>`;
    L.ticks.forEach(y=>{const x=xOf(y);s+=LN(x,L.axY-4,x,L.axY+4,'stroke:var(--muted)')+T(x,L.tkY,'t-xs t-mid','',y)});
    [1940,1990].forEach(y=>{const x=xOf(y);s+=`<path d="M${f1(x-4)} ${L.brY} l4 -12 M${f1(x)} ${L.brY} l4 -12" style="stroke:var(--muted);stroke-width:1"/>`});
    // dots: stack any that sit too close in one lane
    const gapMin=12*(XB-XA)/550,dyO=N?7:8,last={};
    HI_EV.forEach(e=>{const x=xOf(e.y),p=last[e.l];e.dy=p&&x-p.x<gapMin?(p.dy>0?-dyO:dyO):0;if(e.dy&&p&&!p.dy)p.dy=-e.dy;last[e.l]={x,dy:e.dy}});
    HI_EV.forEach(e=>{const x=xOf(e.y),y=L.LY(e.l)+e.dy,c=HI_LANES[e.l][1],pass=e.y<=yr+.01;
      if(!pass)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2;opacity:.6"/>`;
      else if(e===cur){const k=ramp(xp-x,0,26);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(8+(N?7:12)*k)}" style="fill:none;stroke:${c};stroke-width:2;opacity:${f1(.8*(1-k))}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:${c};stroke:var(--ink);stroke-width:2"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:${c}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="10" class="clk" data-hy="${e.y}" style="fill:transparent"/>`});
    // outlook band
    s+=T(L.obLX,L.obLY,'t-sm','','Outlook')+T(L.obLX+(N?62:0),L.obLY+(N?0:14),'t-xs','','qualitative');
    s+=RC(XA,L.obY,XB-XA,28,'fill:var(--panel-2)',6)+RC(XA,L.obY,Math.max(0,xp-XA),28,'fill:url(#hiGrad);opacity:.85',6);
    s+=`<clipPath id="hiClip"><rect x="${XA}" y="${L.obY}" width="${f1(Math.max(0,xp-XA))}" height="28"/></clipPath><g clip-path="url(#hiClip)">${T(XA+8,L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o1)}${T(xOf(1992),L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o2)}</g>`;
    if(xp>xOf(1972))s+=LN(xOf(1972),L.obY-4,xOf(1972),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1972)-4,L.obMk,'t-xs t-end','','1972: colchicine');
    if(xp>xOf(1986))s+=LN(xOf(1986),L.obY-4,xOf(1986),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1986)+4,L.obMk,'t-xs','',L.m2);
    // playhead
    s+=LN(xp,L.phTop,xp,L.phBot,'stroke:var(--ink);stroke-width:1.4;opacity:.55')+`<path d="M${f1(xp-5)} ${L.axY} L${f1(xp+5)} ${L.axY} L${f1(xp)} ${L.axY-8}Z" style="fill:var(--ink)"/>`;
    s+=T(Math.min(XB-6,Math.max(XA+6,xp)),L.yY,'t-xs t-mid','fill:var(--ink)',Math.floor(yr));
    svg.innerHTML=s;
    setSt(ph);
    $('#hiRead').innerHTML=`<span>year <b>${Math.floor(yr)}</b></span><span>milestones passed <b>${done.length} of ${HI_EV.length}</b></span><span>era <b>${HI_ERA[ph].t}</b></span>`;
    $('#hiNote').innerHTML=cur?`<div class="kicker">${HI_LANES[cur.l][0]}</div>`+noteHTML({t:cur.t,txt:cur.txt,pt:cur.pt,hook:cur.hook}).replace('<div class="kicker"></div>',''):noteHTML({k:'1900',t:'Before the first descriptions',txt:'Recurrent fevers with belly pain had no agreed name in the medical literature. Press play, drag the timeline, or click any dot.',pt:'The story starts with a puzzling case report in 1908.'});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,24000,'Replay','history');
  const setSt=stepWire($('#hiSteps'),steps,rg,draw,stop);
  const jump=y=>{stop();const t=clamp(tOfY(y)+.002);rg.value=t;draw(t)};
  svg.addEventListener('click',e=>{const d=e.target.closest('[data-hy]');if(d)jump(+d.dataset.hy)});
  $('#hiYears').innerHTML=HI_EV.map(e=>`<button class="tag sea" data-hy2="${e.y}"><b style="font-weight:700">${Math.floor(e.y)}</b>&nbsp;${e.h.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</button>`).join('');
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hy2]');if(b){jump(+b.dataset.hy2);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiChips').innerHTML=HI_NAMES.map(([n,y])=>y?`<button class="tag sea" data-hn="${y}">${n}<small>${Math.floor(y)}</small></button>`:`<span class="tag">${n}</span>`).join('');
  $('#hiChips').addEventListener('click',e=>{const b=e.target.closest('[data-hn]');if(b){jump(+b.dataset.hn);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiCards').innerHTML=`
   <div class="card"><h4>Pyrin or marenostrin?</h4><p>The same protein got two names in 1997: <b>pyrin</b> from the International FMF Consortium (after fever) and <b>marenostrin</b> from the French FMF Consortium (after <i>mare nostrum</i>, the Roman name for the Mediterranean). "Pyrin" won in everyday use. <sup class="c" data-ref="IntFMF1997,FrenchFMF1997" title="Source 71,109">71,109</sup></p></div>
   <div class="card"><h4>"Periodic" is a misnomer</h4><p>Reimann's 1948 "periodic disease" emphasised regular cycles. FMF attacks come at irregular intervals; the clockwork pattern belongs to PFAPA. <sup class="c" data-ref="Reimann1948,BenChetrit2019,Thomas1999" title="Source 17,221,258">17,221,258</sup> <a href="#ddx" data-go="ddx">Compare the rhythms</a></p></div>
   <div class="card"><h4>From fatal to manageable</h4><p>Before colchicine, more than half of FMF patients died of amyloidosis. EULAR 2016 reports that colchicine cut the amyloidosis risk in Turkey from 60% to under 13%. <sup class="c" data-ref="Tufan2020,Ozen2016" title="Source 199,263">199,263</sup></p></div>
   <div class="card"><h4>Why is the variant so common? <span class="ev early">Early evidence</span></h4><p>Carrier frequency is roughly 10% in Jewish, Arab, Armenian and Turkish populations. Park 2020 tied this to selection by plague: stronger pyrin responses may have helped carriers survive <i>Y. pestis</i>. <sup class="c" data-ref="Park2020" title="Source 208">208</sup></p></div>`;
  draw(+rg.value);
};

/* =============== 5.2 flashcards & mnemonics =============== */
const PARTN={1:"Part 1 · The disease",2:"Part 2 · Colchicine",3:"Part 3 · Complications & diagnosis",4:"Part 4 · Treatment & future",5:"Part 5 · History"};
const FC=[
 [1,"Which gene causes FMF, and where is it?","MEFV, on the short arm of chromosome 16 (16p13.3). It has 10 exons and encodes pyrin, a 781-amino-acid protein also called marenostrin."],
 [1,"Which domain of pyrin carries most FMF variants?","The C-terminal B30.2 (PRY/SPRY) domain, encoded by exon 10. Hot spot around residues 680–726: M680I, M694V, M694I, V726A."],
 [1,"What is the classic inheritance of FMF?","Autosomal recessive. Exceptions: dominant-acting variants (M694del, T577 variants), and many clinically typical patients with only one detectable variant."],
 [1,"Which variant genotype is linked to the most severe disease?","M694V homozygosity: earlier onset, more arthritis and erysipelas-like erythema, higher colchicine needs. Whether it also raises amyloidosis risk is disputed: an Armenian study found a link, the 2,838-patient Turkish registry did not, and the largest international study put country of residence ahead of it."],
 [1,"How is E148Q classified today?","As a variant of uncertain significance in Infevers, read in October 2026. Classes are revised over time. Alone it does not support an FMF diagnosis, and it is common in Ashkenazi Jews and in about 29% of East Asian alleles."],
 [1,"What does pyrin 'guard'?","RhoA activity. Active RhoA keeps pyrin switched off; when RhoA is inactivated (for example by certain bacterial toxins), pyrin fires."],
 [1,"What keeps pyrin inactive at rest?","RhoA-activated kinases PKN1 and PKN2 phosphorylate pyrin at Ser208 and Ser242; 14-3-3 proteins bind those phosphates and hold pyrin off."],
 [1,"What three proteins make the pyrin inflammasome?","Pyrin (sensor), ASC (adaptor, forms the 'speck') and caspase-1 (effector)."],
 [1,"What does caspase-1 cut?","Pro-IL-1β and pro-IL-18 into active cytokines, and gasdermin D, whose N-terminal fragment forms membrane pores."],
 [1,"What is pyroptosis?","Inflammatory, lytic cell death through gasdermin D pores, releasing IL-1β and cell contents."],
 [1,"Are FMF variants gain or loss of function?","Gain of function (hypermorphic): they lower the activation threshold. Pyrin-knockout mice are healthy; B30.2 knock-in mice get IL-1-driven inflammation."],
 [1,"What is PAAND?","Pyrin-associated autoinflammation with neutrophilic dermatosis: a dominant pyrin disease from S242R (or E244K) that destroys a 14-3-3 binding site. Distinct from FMF."],
 [1,"How long does a typical FMF attack last?","12 to 72 hours, then it resolves on its own. Livneh criteria: febrile (≥38 °C), recurrent (≥3 of the same type), 12 h to 3 days."],
 [1,"Most common attack features?","Fever and peritonitis (each >90%), then arthritis (~half), myalgia, pleuritis (~a third) and erysipelas-like erythema."],
 [1,"Where does erysipelas-like erythema appear?","Lower leg, ankle or top of the foot: a tender red plaque that mimics cellulitis and clears in 1–3 days."],
 [1,"What is protracted febrile myalgia?","A rare manifestation with severe muscle pain, fever and very high ESR lasting weeks; it responds to corticosteroids."],
 [1,"What fraction of patients start before age 20?","About 80–90%; more than half in the first decade."],
 [1,"What is phenotype II?","AA amyloidosis as the first or only sign of FMF, without prior attacks. Rare, and estimates differ: at most 0.3% of the Turkish registry, about 0.6% in a later review whose authors doubt it is a separate entity."],
 [1,"Best-documented attack trigger?","Emotional stress (case-crossover study: each stressful event raised attack odds ~70% two days later). Exercise and fatty meals did not."],
 [1,"Heterozygote advantage hypothesis for FMF?","Carriers may have resisted plague: Yersinia pestis YopM suppresses wild-type pyrin less well when pyrin carries FMF variants. Evidence of positive selection, not proof."],
 [2,"Where does colchicine come from?","The autumn crocus (Colchicum autumnale)."],
 [2,"Why does colchicine accumulate in neutrophils?","Granulocytes lack functional P-glycoprotein efflux, so the drug is trapped; leukocyte levels peak ~2 days after a dose and can exceed peak plasma >16-fold."],
 [2,"What does colchicine bind?","Free β-tubulin. The tubulin–colchicine complex caps microtubule ends; higher concentrations depolymerize microtubules."],
 [2,"Two proposed ways colchicine quiets pyrin?","(1) Microtubule loss frees GEF-H1 → RhoA on → PKN re-phosphorylates pyrin. (2) Pyrin's microtubule-dependent second activation step cannot complete. Still debated."],
 [2,"Effects on neutrophils beyond pyrin?","Less chemotaxis, altered adhesion (E-selectin redistribution on endothelium, L-selectin shedding), less superoxide, dampened NLRP3 assembly."],
 [2,"Which enzymes and pumps matter for colchicine interactions?","CYP3A4 and P-glycoprotein (ABCB1). Strong inhibitors such as clarithromycin, ketoconazole, ritonavir and cyclosporine raise exposure 2–4-fold."],
 [2,"EULAR 2016 starting doses?","≤0.5 mg/day under 5 years; 0.5–1.0 mg/day at 5–10 years; 1.0–1.5 mg/day over 10 years and adults. Maximum 2 mg/day children, 3 mg/day adults."],
 [2,"Why does colchicine's benefit appear slowly?","It must build up in leukocytes, attacks were weeks apart to begin with, doses are titrated over months, and its biggest benefit (amyloid prevention) accrues over years."],
 [2,"EULAR 2016 definition suggesting colchicine resistance?","≥1 attack per month despite ≥6 months at the maximum tolerated dose in an adherent patient."],
 [2,"How common is colchicine resistance?","Roughly 5–10%, plus 2–5% who cannot tolerate it. Non-adherence inflates apparent resistance."],
 [2,"Most common colchicine side effect?","Gastrointestinal: diarrhea, cramping, nausea, often early in treatment. Long-term use can reduce intestinal lactase."],
 [2,"Serious colchicine toxicities?","Neuromyopathy (with raised CK, especially in renal impairment or with statins), bone marrow suppression, and fatal overdose. Narrow therapeutic index."],
 [2,"Colchicine in pregnancy per EULAR?","Do not stop it during conception, pregnancy or breastfeeding; amniocentesis is not justified because of colchicine."],
 [2,"What did Zemer 1986 show?","Cumulative proteinuria 1.7% at 11 years in adherent patients vs 48.9% at 9 years in non-adherent ones: colchicine prevents amyloidosis."],
 [3,"What protein is AA amyloid made from?","Serum amyloid A (SAA), an acute-phase protein from the liver, cleaved from 122 to 76 amino acids and misfolded into β-sheet fibrils."],
 [3,"First sign of renal amyloidosis?","Proteinuria, progressing to nephrotic syndrome and kidney failure."],
 [3,"How is amyloid confirmed on biopsy?","Congo red staining with apple-green birefringence under polarized light; anti-SAA immunohistochemistry confirms the AA type."],
 [3,"SAA target in AA amyloidosis?","Below 10 mg/L (EULAR 2016). Lachmann 2007: deposits regressed in 60% with median SAA <10; death risk 17.7× higher in the top SAA octile vs <4 mg/L."],
 [3,"Strongest amyloidosis risk factor in the 2007 international study?","Country of residence (OR 3.2), then M694V homozygosity, proband status and disease duration."],
 [3,"Eurofever/PRINTO 2019: confirmatory genotype needs how many clinical items?","At least 1 of 4 (episodes 1–3 days, arthritis, chest pain, abdominal pain). Non-confirmatory genotype needs at least 2."],
 [3,"Eurofever/PRINTO clinical-only criteria?","At least 6 of 9: present Eastern Mediterranean ethnicity, 1–3-day episodes, chest pain, abdominal pain, arthritis; absent aphthous stomatitis, urticarial rash, maculopapular rash, painful lymph nodes."],
 [3,"Tel Hashomer criteria rule?","2 major, or 1 major + 2 minor. Major: recurrent febrile serositis, AA amyloidosis without other cause, colchicine response."],
 [3,"Lab clue that separates an FMF attack from Still's disease?","Ferritin and platelets do not rise in FMF attacks, while CRP rises in every attack. Still's disease has very high ferritin."],
 [3,"Which periodic fever comes like clockwork?","PFAPA: 3–6-day episodes about every 4 weeks, with pharyngitis, aphthae and cervical adenitis; one prednisone dose aborts the attack."],
 [3,"TRAPS versus FMF attack length?","TRAPS episodes often last 7 days or more, with migratory rash over myalgia and periorbital edema; FMF lasts 12–72 hours."],
 [3,"Urine test for MKD (HIDS)?","Urinary mevalonic acid during attacks (sensitivity ~92%)."],
 [3,"Appendectomy in FMF?","In one series 40% had an appendectomy, and 80% of those appendices were not inflamed."],
 [4,"First-line treatment of FMF?","Lifelong daily colchicine, started as soon as a clinical diagnosis is made."],
 [4,"What do guidelines advise during an acute attack?","Continue the usual colchicine dose, use NSAIDs for symptoms, and consider other causes such as appendicitis."],
 [4,"CLUSTER trial headline?","Canakinumab 150 mg every 4 weeks: complete response in 61% of colchicine-resistant FMF vs 6% on placebo; 71% with 300 mg."],
 [4,"Is colchicine stopped when an IL-1 blocker is added?","No. Guidelines continue colchicine alongside biologics because it may still lower amyloid risk."],
 [4,"Anakinra RCT in colchicine-resistant FMF?","1.7 vs 3.5 attacks per month on anakinra vs placebo (25 patients)."],
 [4,"Recommended monitoring (EULAR 2016)?","Every 6 months: attacks, CRP and/or SAA, blood count, liver and kidney tests, CK, and urinalysis for protein (at every visit)."],
 [4,"Live vaccines on canakinumab?","The label advises avoiding live vaccines during treatment and updating vaccinations beforehand."],
 [4,"Life expectancy in treated FMF?","Close to normal in a Turkish cohort; amyloidosis is the leading cause of excess death."],
 [4,"What would a cure have to do?","Correct or silence variant MEFV in myeloid cells (from bone-marrow stem cells), or durably block the pyrin inflammasome. No approved therapy does this today."],
 [4,"Only published human transplant case relevant to FMF?","Milledge 2002 (Blood): a child transplanted for another disease whose FMF resolved; n=1, ~2 years of follow-up."],
 [4,"Why are statins discussed in the cure research?","In cells, statins activate the pyrin inflammasome by depleting geranylgeranyl pyrophosphate (Park 2016). Clinical relevance is unknown."],
 [4,"Which approved drugs inhibit gasdermin D in the lab?","Disulfiram and dimethyl fumarate (both modify GSDMD Cys191). Neither has been tested in FMF."],
 [4,"What does the 2024 guideline say about colchicine during an attack?","Recommendation 11: do not increase the dose. Continue the usual dose and use NSAIDs for symptoms. The patient-information source says plainly that raising the dose during an attack does not help."],
 [4,"Before calling someone colchicine-resistant, what must be confirmed?","Adherence. The consensus definition requires recurrent attacks, on average one or more a month over three months, or persistent laboratory inflammation between attacks, after adherence has been confirmed."],
 [4,"What is AIDAI, and what score means active disease?","A patient or parent diary kept for a month, scoring 12 items 0 or 1 each day. A total of 9 or more means active disease: sensitivity 89%, specificity 92%. The 2024 guideline calls it the only validated activity score in FMF, with problems reflecting activity."],
 [4,"Which IL-1 blocker carries FMF in its US label?","Canakinumab. Anakinra's US indications are rheumatoid arthritis, NOMID and DIRA, and rilonacept's are CAPS, maintenance of remission of DIRA and recurrent pericarditis, so both are off-label for FMF in the US."],
 [4,"How do injection-site reaction rates compare between the IL-1 blockers?","Anakinra 71% in the rheumatoid arthritis trials, rilonacept 48% in the CAPS placebo-controlled phase against 13% on placebo, and canakinumab 10.1% in the TRAPS, HIDS/MKD and FMF study, all mild or moderate."],
 [4,"What is amyloid storm?","Sudden severe proteinuria with rapidly progressive renal failure and markedly raised acute-phase reactants, over days to weeks. Infection triggered 17 of the original 20 cases, and a 2025 review put mortality at 33 to 67%."],
 [4,"What does the 2024 minimum outcome set include?","Clinical disease activity such as attacks per 3 months and physician assessment, patient-reported outcome and experience measures, and biochemical markers such as CRP and SAA."],
 [4,"How often is urinalysis checked, per the 2024 guideline?","At least yearly, and more often if the disease is poorly controlled. The 2016 version was stricter, asking for one at every clinic visit."],
 [4,"Which FMF guideline is the current one?","The EULAR/PReS 2024 update, published in Annals of the Rheumatic Diseases in 2025. It has 4 overarching principles and 12 recommendations, and it supersedes the 18 recommendations of EULAR 2016."],
 [4,"How strong is the randomized evidence for IL-1 blockers in FMF?","Moderate certainty, and uneven. In the Cochrane re-analysis only canakinumab clearly reduced the number of patients with attacks (RR 0.41, 95% CI 0.26 to 0.65). The anakinra and rilonacept intervals crossed 1. All the trials were small."],
 [5,"Who described \'benign paroxysmal peritonitis\' in 1945?","Sheppard Siegal, a New York physician."],
 [5,"Who named it 'familial Mediterranean fever'?","Heller, Sohar and Sherf at Tel Hashomer, Israel, in 1958."],
 [5,"When was colchicine introduced for FMF?","1972, by Goldfinger in an NEJM letter; controlled trials followed in 1974."],
 [5,"When and how was MEFV found?","Mapped to 16p in 1992; cloned in 1997 by two consortia (French: 'marenostrin'; International: 'pyrin')."],
 [5,"What did Xu et al. show in 2014?","Pyrin is an innate immune sensor that assembles an inflammasome when bacterial toxins modify Rho GTPases."]
];
const MN=[
 ["Pyrin guards the Rho-d","Pyrin is a guard of RhoA: RhoA on → pyrin off; RhoA off → pyrin on."],
 ["P-P-14","Two Phosphates (S208, S242) let 14-3-3 hold pyrin."],
 ["Sensor · Adaptor · Effector","Pyrin · ASC · caspase-1: the inflammasome in three words."],
 ["1–3–72","1 site at a time, 3 days at most, 72 hours: the typical FMF attack."],
 ["PAPE","Main attack types: Peritonitis, Arthritis, Pleuritis, Erythema (erysipelas-like)."],
 ["M694V = Very bad","M694V homozygotes have the most severe phenotype."],
 ["Crocus traps in neutrophils","Colchicine (from the autumn crocus) is trapped in neutrophils because they lack the P-gp pump."],
 ["CYP-P Clarithromycin Danger","CYP3A4 + P-gp inhibitors (clarithromycin, cyclosporine, ketoconazole, ritonavir) are the dangerous partners."],
 ["Start ½, 1, 1½","EULAR starting doses: ≤0.5 mg (<5 y), 0.5–1 mg (5–10 y), 1–1.5 mg (>10 y and adults)."],
 ["2 for kids, 3 for adults","Published maximum daily colchicine doses."],
 ["Ten keeps the kidneys","SAA below 10 mg/L is the published target in AA amyloidosis."],
 ["Congo turns green","Congo red + polarized light = apple-green birefringence."],
 ["One for sure, two if unsure","Eurofever/PRINTO: a confirmatory genotype needs ≥1 clinical item; non-confirmatory needs ≥2."],
 ["Continue, cool, check","During an attack: continue colchicine, NSAIDs to cool symptoms, check for other causes."],
 ["Colchicine first, IL-1 next, colchicine always","The treatment ladder: biologics are added, not substituted."]
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

/* =============== 5.3 quiz =============== */
const QZ=[
 [1,"Pyrin is held inactive in resting cells mainly because:",["It is bound to ASC","PKN1/2 phosphorylate it and 14-3-3 proteins bind it","Colchicine is present","It lacks a PYD domain"],1,"RhoA-activated PKN1/PKN2 phosphorylate Ser208/Ser242; 14-3-3 binds and holds pyrin off."],
 [1,"Pyrin senses:",["Bacterial DNA","Potassium efflux","Loss of RhoA activity","Uric acid crystals"],2,"It guards RhoA. Toxins that modify Rho GTPases switch RhoA off and pyrin on. Potassium efflux and crystals are NLRP3 triggers."],
 [1,"FMF variants in the B30.2 domain:",["Abolish pyrin function","Lower the threshold for pyrin activation","Only affect liver cells","Block ASC binding"],1,"They are hypermorphic: patient cells fire in response to stimuli too weak to move normal cells."],
 [1,"The final executioner of pyroptosis is:",["Caspase-3","Gasdermin D pores","Perforin","BAX/BAK"],1,"Caspase-1 cleaves gasdermin D; the N-terminal fragment forms membrane pores."],
 [1,"Most common attack manifestation in large registries:",["Pericarditis","Peritonitis","Scrotal swelling","Erysipelas-like erythema"],1,"Peritonitis and fever each exceed 90% in the Turkish registry."],
 [1,"A typical FMF attack lasts:",["Less than 6 hours","12–72 hours","7–14 days","Continuously"],1,"Livneh criteria: 12 h to 3 days, febrile, recurrent."],
 [1,"Which genotype predicts the most severe disease?",["E148Q heterozygote","V726A homozygote","M694V homozygote","K695R heterozygote"],2,"M694V homozygosity: earlier onset, more arthritis and ELE, higher colchicine needs."],
 [1,"Two carriers of pathogenic MEFV variants have a child. Chance the child has two variants:",["0%","25%","50%","100%"],1,"Autosomal recessive: 1 in 4 biallelic, 1 in 2 carriers, 1 in 4 non-carriers."],
 [1,"An FMF patient with two variants marries a carrier. Chance each child has two variants:",["25%","50%","75%","100%"],1,"Half the children get two variants. Because carriers are common, this 'pseudodominance' can make FMF look dominant in a pedigree."],
 [1,"Erysipelas-like erythema typically appears on the:",["Face","Trunk","Lower leg, ankle or dorsum of the foot","Palms"],2,"A tender red plaque that mimics cellulitis and clears in 1–3 days."],
 [1,"Which trigger had the strongest evidence in a case-crossover study?",["Fatty meals","Strenuous exercise","Emotional stress","Cold drinks"],2,"Each stressful event raised the odds of an attack 2 days later by about 70%; exercise and fatty meals did not."],
 [1,"Protracted febrile myalgia usually responds to:",["Antibiotics","Corticosteroids","Higher colchicine alone","Surgery"],1,"PFM responds promptly to corticosteroids; anakinra helped steroid-refractory children."],
 [2,"Colchicine's direct molecular target is:",["IL-1β","Tubulin","Caspase-1","COX-2"],1,"It binds free tubulin; tubulin–colchicine caps microtubules."],
 [2,"Colchicine concentrates in neutrophils because:",["They have more tubulin than other cells","They lack functional P-glycoprotein efflux","It is actively secreted into them by the liver","It binds hemoglobin"],1,"Granulocytes show no P-gp efflux function, so the drug is trapped; a well-supported hypothesis."],
 [2,"Which drug combination with colchicine is most dangerous?",["Azithromycin","Clarithromycin","Amoxicillin","Paracetamol"],1,"Clarithromycin, a strong CYP3A4/P-gp inhibitor, raised colchicine AUC ~282%; deaths were reported with co-prescription. Azithromycin raises it much less."],
 [2,"EULAR 2016 published starting dose for a 7-year-old:",["≤0.5 mg/day","0.5–1.0 mg/day","1.0–1.5 mg/day","3 mg/day"],1,"Ages 5–10: 0.5–1.0 mg/day. Doses for a person are set by their clinician."],
 [2,"Published maximum daily colchicine dose for adults (EULAR):",["1 mg","2 mg","3 mg","5 mg"],2,"3 mg/day in adults; 2 mg/day in children. Unchanged in the 2024 update."],
 [2,"Why does the full benefit of colchicine take months to show?",["It must be converted to an active metabolite","Attacks were weeks apart, doses are titrated, and amyloid protection accrues over years","It only works after puberty","It needs vitamin D"],1,"Leukocyte levels build within days to weeks, but response can only be judged over months; amyloid prevention takes years."],
 [2,"During pregnancy, EULAR advises that colchicine:",["Be stopped at conception","Be continued; amniocentesis is not justified for colchicine alone","Be replaced by anakinra","Be doubled"],1,"Cohorts and a meta-analysis found no increase in miscarriage or major malformations."],
 [2,"The most common side effect of colchicine is:",["Hair loss","Diarrhea and GI upset","Hypertension","Weight gain"],1,"GI effects are reported in up to 20% at the start of treatment."],
 [3,"AA amyloid is derived from:",["Immunoglobulin light chains","Transthyretin","Serum amyloid A","β2-microglobulin"],2,"SAA, a hepatic acute-phase protein driven by IL-1, IL-6 and TNF."],
 [3,"Under polarized light, Congo red–stained amyloid shows:",["Blue fluorescence","Apple-green birefringence","Black granules","Red birefringence"],1,"Classic exam fact."],
 [3,"Published SAA target in AA amyloidosis:",["< 10 mg/L","< 100 mg/L","< 500 mg/L","Any level if no attacks"],0,"Lachmann 2007: deposits regressed in 60% with median SAA <10 mg/L."],
 [3,"In Touitou 2007, the strongest risk factor for amyloidosis was:",["Female sex","Country of residence","E148Q","Age at onset"],1,"OR 3.2, tracking infant mortality rates, which suggests an environmental factor."],
 [3,"Eurofever/PRINTO 2019: a non-confirmatory genotype needs at least:",["1 clinical item","2 clinical items","4 clinical items","6 of 9 items"],1,"Confirmatory genotype ≥1 of 4; non-confirmatory ≥2 of 4; clinical-only ≥6 of 9."],
 [3,"The Eurofever/PRINTO criteria are intended as:",["A diagnostic test for individual patients","Classification criteria for research","A treatment algorithm","A genetic screening test"],1,"They classify patients for studies; diagnosis remains clinical."],
 [3,"Which lab result argues against Still's disease and for an FMF attack?",["High CRP","Normal ferritin and platelets despite high CRP","Leukocytosis","High ESR"],1,"In FMF attacks CRP rises but ferritin and platelets do not; Still's disease has very high ferritin."],
 [3,"A child has 4-day fevers every 28 days with pharyngitis and neck nodes. Most likely:",["FMF","PFAPA","TRAPS","CAPS"],1,"Clockwork periodicity with pharyngitis, aphthae and adenitis; one prednisone dose aborts the episode."],
 [3,"Fevers lasting 2–3 weeks with migratory rash over painful muscles and periorbital edema suggest:",["FMF","TRAPS","PFAPA","MKD"],1,"TRAPS (TNFRSF1A, dominant): episodes often ≥7 days."],
 [3,"Urinary mevalonic acid during attacks points to:",["MKD/HIDS","CAPS","Behçet","FMF"],0,"MKD: onset in infancy, 3–7-day flares, often triggered by vaccines."],
 [3,"Tel Hashomer major criteria include:",["Family history","Response to continuous colchicine","Erysipelas-like erythema","Exertional leg pain"],1,"Majors: recurrent febrile serositis, AA amyloidosis without other cause, colchicine response. ELE and family history are minor."],
 [4,"During an acute FMF attack, guidelines advise:",["Stop colchicine","Continue the usual colchicine dose and use NSAIDs","Start antibiotics","Double colchicine for a week"],1,"And consider other causes such as appendicitis."],
 [4,"In CLUSTER, complete response with canakinumab in colchicine-resistant FMF was:",["21%","45%","61%","95%"],2,"61% vs 6% on placebo; 71% with dose escalation to 300 mg."],
 [4,"When an IL-1 blocker is added, colchicine is usually:",["Stopped","Continued","Halved permanently","Switched to IV"],1,"Continued, because it may still lower amyloid risk."],
 [4,"Which monitoring test detects early amyloid nephropathy?",["Chest X-ray","Urinalysis for protein","Serum ferritin","ECG"],1,"EULAR 2016 recommends urinalysis at every visit."],
 [4,"Which statement about curing FMF is accurate today?",["Gene editing of MEFV is approved","No approved therapy cures FMF; colchicine and IL-1 blockade control it","HSCT is routine for FMF","IL-1 blockers correct the gene"],1,"Cure routes are research ideas; the only human transplant report is a single case."],
 [4,"In mice, which genetic change abolished FMF-like inflammation from B30.2 knock-in pyrin?",["Removing NLRP3","Removing ASC or the IL-1 receptor","Removing caspase-3","Removing TNF"],1,"The pyrin inflammasome is ASC-dependent and NLRP3-independent; IL-1R loss also rescued it."],
 [4,"Disulfiram and dimethyl fumarate share which lab action relevant to inflammasomes?",["They inhibit gasdermin D","They block IL-1 receptors","They bind tubulin","They activate RhoA"],0,"Both modify gasdermin D Cys191; neither has been tested in FMF."],
 [4,"Guidelines say that during a characteristic FMF attack the colchicine dose should be:",["Doubled","Continued unchanged, with NSAIDs for symptoms","Stopped until the attack passes","Replaced by a steroid"],1,"Recommendation 11 of the 2024 update. Raising the dose during an attack does not help, and other causes such as appendicitis must always be considered."],
 [4,"An AIDAI diary total of 9 or more over one month indicates:",["Colchicine toxicity","Active disease","Amyloidosis","Non-adherence"],1,"At that cut-off, sensitivity was 89% and specificity 92% against blinded expert consensus."],
 [4,"Which of these is NOT how an ordinary FMF peritonitis behaves?",["Guarding and rebound tenderness","Resolution within 24 to 72 hours","Pain shifting to the right lower quadrant","Diffuse abdominal pain"],2,"Guarding and rebound are ordinary in FMF, so they do not separate it from a surgical abdomen. The published discriminator for appendicitis is the shift to the right lower quadrant."],
 [4,"Which IL-1 blocker has FMF in its US label?",["Anakinra","Canakinumab","Rilonacept","All three"],1,"Anakinra and rilonacept are used off-label for FMF in the US."],
 [4,"Before a patient can be called colchicine-resistant, the definition requires:",["A genetic test","Confirmed adherence","A kidney biopsy","Six attacks"],1,"The consensus definition requires attacks or persistent inflammation after adherence has been confirmed, and the 2024 guideline added the words 'in adherent patients' to stress it."],
 [4,"Sudden severe proteinuria with rapidly rising creatinine in FMF amyloidosis, often after an infection, describes:",["Colchicine toxicity","Amyloid storm","Protracted febrile myalgia","An ordinary attack"],1,"In the original series infection triggered 17 of 20, and 16 reached end-stage renal disease or death within a year."],
 [5,"Colchicine for FMF was first reported in:",["1908","1945","1972","1997"],2,"Goldfinger's NEJM letter; controlled trials followed in 1974."],
 [5,"MEFV was cloned in 1997 by:",["One NIH group","Two independent consortia","A Japanese team","Infevers"],1,"The French FMF Consortium (marenostrin) and the International FMF Consortium (pyrin)."]
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

/* =============== 5.4 glossary =============== */
const GL=[
 ["14-3-3 proteins","Scaffold proteins that bind phosphorylated Ser208/Ser242 of pyrin and hold it inactive.","mech"],
 ["AA amyloidosis","Deposition of fibrils made from serum amyloid A in organs, especially the kidney; the main long-term danger of uncontrolled FMF.","amyloid"],
 ["Acute-phase reactants","Blood proteins that rise with inflammation: CRP, SAA, fibrinogen; ESR rises too.","dx"],
 ["Anakinra","Recombinant IL-1 receptor antagonist injected daily; used in colchicine-resistant FMF.","ladder"],
 ["Apple-green birefringence","The color Congo red–stained amyloid shows between crossed polarizers.","amyloid"],
 ["ASC","Adaptor protein that links pyrin's PYD to caspase-1 and polymerizes into a single 'speck'.","mech"],
 ["Autosomal recessive","Inheritance in which disease needs two variant copies, one from each parent.","gene"],
 ["B30.2 (PRY/SPRY) domain","The C-terminal pyrin domain encoded by exon 10, where most FMF variants cluster.","gene"],
 ["Base editing","Gene editing that changes a single DNA letter without cutting both strands; in the clinic for sickle cell disease, untested for MEFV.","cure"],
 ["Behçet disease","Systemic vasculitis with recurrent oral and genital ulcers, uveitis and pathergy; part of the differential.","ddx"],
 ["Canakinumab","Monoclonal antibody against IL-1β given every 4 weeks; tested in the CLUSTER trial.","ladder"],
 ["CAPS","Cryopyrin-associated periodic syndromes from NLRP3 variants: urticarial rash, cold triggers, deafness.","ddx"],
 ["Carrier","A person with one variant copy of a recessive gene; usually healthy.","gene"],
 ["Caspase-1","The protease activated in the inflammasome; cleaves pro-IL-1β, pro-IL-18 and gasdermin D.","mech"],
 ["CLUSTER trial","Phase 3 randomized trial of canakinumab in colchicine-resistant FMF, MKD and TRAPS (2018).","ladder"],
 ["Colchicine","Alkaloid from the autumn crocus that binds tubulin; lifelong first-line FMF treatment.","colin"],
 ["Colchicine resistance","Ongoing attacks or inflammation despite the maximum tolerated dose in an adherent patient.","colmonths"],
 ["Compound heterozygote","Two different variants of the same gene, one on each copy (for example M694V/V726A).","gene"],
 ["Congo red","Dye used to detect amyloid in biopsy tissue.","amyloid"],
 ["CRP","C-reactive protein, an acute-phase protein made in the liver.","dx"],
 ["CYP3A4","Liver and gut enzyme that metabolizes colchicine; its inhibitors raise colchicine levels.","coldose"],
 ["E148Q","Common exon 2 MEFV variant, classed as of uncertain significance in Infevers as of October 2026; low penetrance.","gene"],
 ["Enterohepatic recycling","Drug excreted in bile and reabsorbed from the gut, prolonging its stay in the body.","colin"],
 ["Erysipelas-like erythema","Tender red plaque on the lower leg or foot during FMF attacks.","attack"],
 ["Eurofever/PRINTO criteria","2019 evidence-based classification criteria for FMF and other periodic fevers.","dx"],
 ["Exon 10","The MEFV exon encoding the B30.2 domain; home of M694V, M680I, M694I and V726A.","gene"],
 ["Founder mutation","A variant inherited from a common ancestor and spread in a population.","what"],
 ["Gasdermin D","Protein cut by caspase-1; its N-terminal fragment forms membrane pores that cause pyroptosis.","mech"],
 ["GEF-H1","RhoA activator held on microtubules and released when colchicine disrupts them.","colin"],
 ["Gene dosage effect","More variant copies give stronger effects: two-variant cells respond more than one-variant cells.","gene"],
 ["Heterozygote advantage","The idea that carriers of one variant gained a survival benefit, which would explain why the variants stayed common. For FMF the proposed benefit is resistance to plague. The evidence is suggestive, not settled, and drift in isolated populations is the competing explanation.","what"],
 ["HSCT","Hematopoietic stem cell transplantation; replaces the blood-forming system.","cure"],
 ["IL-1β","Key inflammatory cytokine and endogenous pyrogen released by the inflammasome.","mech"],
 ["IL-18","Inflammasome-processed cytokine of the IL-1 family.","mech"],
 ["Inflammasome","Multiprotein complex that activates caspase-1; pyrin forms one.","mech"],
 ["Infevers","Online registry of variants in autoinflammatory disease genes, with consensus pathogenicity classes.","gene"],
 ["Livneh criteria","1997 Tel Hashomer diagnostic criteria with major, minor and supportive items.","dx"],
 ["M694V","The most frequent and most severe MEFV variant in many populations.","gene"],
 ["Marenostrin","The French consortium's name for pyrin, from mare nostrum.","history"],
 ["MEFV","The FMF gene on chromosome 16p13.3.","gene"],
 ["Microtubule","Hollow polymer of tubulin forming the cell's scaffold; disrupted by colchicine.","colin"],
 ["MKD (HIDS)","Mevalonate kinase deficiency: infant-onset periodic fever; RhoA is functionally off, releasing pyrin.","ddx"],
 ["NLRP3","A different inflammasome sensor responding to many stress signals; mutated in CAPS.","mech"],
 ["NSAIDs","Non-steroidal anti-inflammatory drugs, used for symptoms during attacks.","ladder"],
 ["P-glycoprotein (P-gp, ABCB1)","Efflux pump that pushes colchicine out of cells; low in neutrophils.","colin"],
 ["PAAND","Dominant pyrin disease from S242R/E244K with neutrophilic dermatosis; not FMF.","mech"],
 ["Penetrance","The share of people with a genotype who actually show the disease.","what"],
 ["Peritonitis","Inflammation of the peritoneum; the most common FMF attack.","attack"],
 ["PFAPA","Periodic fever, aphthous stomatitis, pharyngitis, adenitis; clockwork fevers in young children.","ddx"],
 ["Phenotype II","AA amyloidosis as the first sign of FMF without prior attacks.","gene"],
 ["Phenotype III","Two MEFV variants without any disease.","what"],
 ["PKN1/PKN2","RhoA-activated kinases that phosphorylate pyrin to keep it off.","mech"],
 ["Pleuritis","Inflammation of the pleura causing one-sided chest pain on breathing.","attack"],
 ["Prodrome","Warning phase before an attack, felt by about half of patients.","attack"],
 ["Protracted febrile myalgia","Rare weeks-long fever with severe muscle pain; responds to steroids.","attack"],
 ["Proteinuria","Protein in the urine; the first sign of renal amyloidosis.","amyloid"],
 ["Pseudodominance","A recessive disease looking dominant because carriers are common in the population.","gene"],
 ["Punnett square","Grid showing the possible allele combinations of offspring.","gene"],
 ["PYD (pyrin domain)","N-terminal domain of pyrin that binds ASC.","mech"],
 ["Pyrin","The MEFV protein: an innate immune sensor of RhoA inactivation.","mech"],
 ["Pyroptosis","Inflammatory lytic cell death through gasdermin D pores.","mech"],
 ["RhoA","Small GTPase switch; GTP-bound = on. Its inactivation releases pyrin.","mech"],
 ["Rilonacept","IL-1 trap given weekly; tested in a small randomized trial in FMF.","ladder"],
 ["SAA","Serum amyloid A, an acute-phase protein and the precursor of AA amyloid.","amyloid"],
 ["Serosa","Smooth membranes lining body cavities: peritoneum, pleura, pericardium, tunica vaginalis. FMF also inflames the synovium of joints.","attack"],
  ["AIDAI","Autoinflammatory Diseases Activity Index: a one-month patient or parent diary scoring 12 items a day. Nine or more means active disease.","nursing"],
 ["Amyloid storm","A rapid deterioration in AA amyloidosis, usually triggered by infection, with proteinuria and creatinine climbing over days to weeks.","nursing"],
 ["FMF50","A response score: at least 50% improvement in 5 of 6 items with none worsening, judged after 3 to 6 months.","nursing"],
 ["ISSF","International Severity Scoring System for FMF: nine domains, maximum 10, with bands for mild, intermediate and severe.","nursing"],
 ["MASIF","An 18-item scale measuring how closely colchicine is actually taken, developed in children.","nursing"],
 ["Minimum outcome set","The 2024 guideline's list of what every FMF service should record: attack frequency, patient-reported measures, and CRP or SAA.","nursing"],
 ["Teach-back","Asking someone to say back in their own words what they will do, to check understanding rather than agreement.","nursing"],
 ["Adherence","How closely someone takes a medicine as prescribed. Poor adherence is a common reason attacks continue and is measured in studies by prescription refills or questionnaires.","colmonths"],
 ["Amyloid storm","A rapid deterioration in AA amyloidosis, often set off by infection, with creatinine and proteinuria at least doubling and CRP rising more than tenfold within two weeks.","amyloid"],
 ["ASC speck","The single large clump of ASC protein that forms in a cell when an inflammasome assembles. One per cell, visible under a microscope.","mech"],
 ["Birefringence","Splitting of light by an ordered material. Congo red-stained amyloid turns apple-green between crossed polarizers.","amyloid"],
 ["Busulfan","A chemotherapy drug used to clear bone marrow before a stem cell transplant. Its toxicity is the main obstacle to gene-corrected stem cell routes.","cure"],
 ["Chimerism","The proportion of a person\u2019s blood cells that come from donor or gene-corrected stem cells after a transplant.","cure"],
 ["Eprodisate","A drug designed to interfere with amyloid fibril formation. A phase 3 trial did not meet its primary endpoint.","amyloid"],
 ["Myeloablation","Destroying the bone marrow with drugs or radiation to make room for transplanted stem cells.","cure"],
 ["Nephrotic syndrome","Heavy protein loss in the urine with low blood albumin and swelling. A stage of renal amyloidosis.","amyloid"],
 ["Odds ratio (OR)","A measure of how much more likely an outcome is in one group than another. An OR of 3.2 means about three times the odds, not three times the risk.","amyloid"],
 ["Prenylation","Attaching a lipid tail to a protein so it can anchor to a membrane. RhoA needs it to work, which links mevalonate kinase deficiency to pyrin.","mech"],
 ["Presenteeism","Being at work or school but working below normal capacity because of illness.","living"],
 ["SAA1 genotype","A variation in the gene for serum amyloid A. The alpha/alpha form is associated with higher amyloidosis risk.","amyloid"],
 ["Subclinical inflammation","Raised CRP/SAA between attacks without symptoms; drives amyloid risk.","colmonths"],
 ["Tel Hashomer criteria","Classic clinical FMF criteria from the Israeli Tel Hashomer hospital.","dx"],
 ["TRAPS","TNF receptor-associated periodic syndrome: long attacks, migratory rash, periorbital edema.","ddx"],
 ["Tubulin","Protein building block of microtubules; colchicine's binding target.","colin"],
 ["VUS","Variant of uncertain significance: not enough evidence to call it pathogenic or benign.","gene"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  function render(){const q=inp.value.trim().toLowerCase();const L=GL.filter(g=>!q||g[0].toLowerCase().includes(q)||g[1].toLowerCase().includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GL.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 5.5 sources =============== */
const AREAN={A:'Epidemiology, attacks & history',B:'Genetics & diagnosis',C:'Mechanism',D:'Colchicine',E:'Amyloidosis, treatment & living',F:'Research & cure'};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','All']].concat(Object.entries(AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||s.areas.includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q));if(!show)return'';n++;
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${s.link?`<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${s.areas.map(a=>`<span class="tag sea">${AREAN[a]}</span>`).join('')}${s.unverified?'<span class="tag warn">check</span>':''}</span></li>`}).join('');
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
