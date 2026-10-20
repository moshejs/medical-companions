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
 {id:'home',t:'התחלה',g:0,n:'00',d:''},
 {id:'what',t:'מהי FMF',g:1,n:'1.1',d:'את מי היא פוגעת, המספרים, ואיך נראה התקף'},
 {id:'gene',t:'הגן והתורשה',g:1,n:'1.2',d:'MEFV, פירין, וריאנטים, וטבלת פאנט בהנפשה'},
 {id:'mech',t:'פירין, בהנפשה',g:1,n:'1.3',d:'השמירה של RhoA, האינפלמזום, תקין לעומת M694V'},
 {id:'attack',t:'התקף, שעה אחר שעה',g:1,n:'1.4',d:'72 שעות של חום, CRP ו־SAA, איבר אחר איבר'},
 {id:'colin',t:'קולכיצין בתוך התא',g:2,n:'2.1',d:'מהכדור לנויטרופיל, למיקרוטובולי ולפירין'},
 {id:'colmonths',t:'קולכיצין לאורך חודשים',g:2,n:'2.2',d:'למה התועלת נבנית לאט, ומה היא מונעת'},
 {id:'coldose',t:'מינון, בטיחות ואינטראקציות',g:2,n:'2.3',d:'מה אומרות ההנחיות, רעילות ומעקב'},
 {id:'amyloid',t:'עמילואידוזיס מסוג AA',g:3,n:'3.1',d:'מ־SAA לסיב ועד הכליה, לאורך שנים'},
 {id:'dx',t:'אבחון וקריטריונים',g:3,n:'3.2',d:'תל השומר, ליבנה, ומחשבון Eurofever/PRINTO'},
 {id:'ddx',t:'האבחנה המבדלת',g:3,n:'3.3',d:'TRAPS, MKD, CAPS, PFAPA, בהצ׳ט והבטן החריפה הכירורגית'},
 {id:'ladder',t:'סולם הטיפול',g:4,n:'4.1',d:'קודם קולכיצין, אחר כך חסימת IL-1 (CLUSTER)'},
 {id:'living',t:'לחיות עם FMF',g:4,n:'4.2',d:'היריון, ניתוח, בית ספר, גורמים מעוררים, מעקב'},
 {id:'nursing',t:'טיפול סיעודי',g:4,n:'4.3',d:'הערכה, מתן תרופות, הדרכה, תיעוד'},
 {id:'cure',t:'לקראת ריפוי',g:4,n:'4.4',d:'מה יצטרך לקרות, והראיות לכל כיוון'},
 {id:'history',t:'היסטוריה ואנשים',g:5,n:'5.1',d:'מ־1908 ועד גילוי הקשר בין פירין ל־RhoA'},
 {id:'review',t:'כרטיסיות וטכניקות זכירה',g:5,n:'5.2',d:'כרטיסיות להיפוך, לפי נושא'},
 {id:'quiz',t:'בוחן',g:5,n:'5.3',d:'שאלות עם הסברים'},
 {id:'glossary',t:'מילון מונחים',g:5,n:'5.4',d:'כל המונחים, עם חיפוש'},
 {id:'sources',t:'מקורות',g:5,n:'5.5',d:'כל המקורות שעליהם נשען המלווה'}
];
const GROUPS={1:['המחלה','g-dz','c-dz'],2:['קולכיצין','g-colch','c-colch'],3:['סיבוכים ואבחון','g-dz','c-dz'],4:['טיפול והעתיד','g-sea','c-sea'],5:['הקשר וחזרה','g-sea','c-sea']};
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
    u+=`<div class="unit"><p class="eyebrow">חלק ${g}</p><h2>${GROUPS[g][0].replace('&','&amp;')}</h2><ol>`;
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
    pg.innerHTML=(p?`<button data-go="${p.id}"><small>→ הקודם</small><span>${p.t.replace('&','&amp;')}</span></button>`:'')+(n?`<button class="next" data-go="${n.id}"><small>הבא ←</small><span>${n.t.replace('&','&amp;')}</span></button>`:'');
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
  function apply(){if(m==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',m);btn.textContent='ערכת צבע: '+{auto:'אוטומטית',light:'בהירה',dark:'כהה'}[m]}
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
function playWire(rg,pb,draw,dur,doneLabel='הפעלה חוזרת',hideKey){
  let stopA=null;function stop(){if(stopA)stopA();stopA=null;pb.textContent='הפעלה'}
  rg.addEventListener('input',()=>{stop();draw(+rg.value)});
  rg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pb.click()}});
  if(!rg.getAttribute('aria-keyshortcuts'))rg.setAttribute('aria-keyshortcuts','Enter Space');
  pb.addEventListener('click',()=>{if(stopA){stop();return}let t0=+rg.value;const mx=+rg.max||1,mn=+rg.min||0;if(t0>=mx-(mx-mn)*.01)t0=mn;pb.textContent='השהיה';
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
function noteHTML(P){return `<div class="kicker">${P.k||''}</div><h4>${P.t}</h4>${P.txt?`<p>${P.txt}</p>`:''}${P.pt?`<div class="pt"><b>במילים פשוטות</b>${P.pt}</div>`:''}${P.hook?`<div class="hook"><b>לבחינה</b>${P.hook}</div>`:''}`}
const SOURCES=[{"key": "Adwan2015", "text": "Adwan MH. A brief history of familial Mediterranean fever. Saudi Med J. 2015;36(9):1126-1127. PMID 26318474; PMCID PMC4613641; doi:10.15537/smj.2015.9.12219", "link": "https://doi.org/10.15537/smj.2015.9.12219", "areas": ["A"], "unverified": false}, {"key": "Akar2012", "text": "Akar S, Yuksel F, Tunca M, Soysal O, Solmaz D, Gerdan V, Celik A, Sen G, Onen F, Akkoc N. Familial Mediterranean fever: risk factors, causes of death, and prognosis in the colchicine era. Medicine (Baltimore). 2012;91(3):131-136. PMID 22543627. DOI 10.1097/MD.0b013e3182561a45.", "link": "https://doi.org/10.1097/MD.0b013e3182561a45", "areas": ["E"], "unverified": false}, {"key": "Aksentijevich1999", "text": "Aksentijevich I, Torosyan Y, Samuels J, et al. Mutation and haplotype studies of familial Mediterranean fever reveal new ancestral relationships and evidence for a high carrier frequency with reduced penetrance in the Ashkenazi Jewish population. Am J Hum Genet. 1999;64:949-962. PMID 10090880; doi:10.1086/302327", "link": "https://doi.org/10.1086/302327", "areas": ["A", "B"], "unverified": false}, {"key": "Anderson2005", "text": "Anderson KE, Bloomer JR, Bonkovsky HL, et al. Recommendations for the diagnosis and treatment of the acute porphyrias. Ann Intern Med. 2005;142(6):439–450. PMID 15767622. doi:10.7326/0003-4819-142-6-200503150-00010", "link": "https://doi.org/10.7326/0003-4819-142-6-200503150-00010", "areas": ["B"], "unverified": false}, {"key": "ArcalystPI", "text": "ARCALYST (rilonacept) injection, for subcutaneous use, US prescribing information (Kiniksa), revised 10/2025. DailyMed setid ad965f38-dd22-4607-a673-2fb92f3b527a; current label version 16 Dec 2025. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad965f38-dd22-4607-a673-2fb92f3b527a", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad965f38-dd22-4607-a673-2fb92f3b527a", "areas": ["G"], "unverified": false}, {"key": "ARUP2023", "text": "ARUP Laboratories. Familial Mediterranean Fever (MEFV) Sequencing, test 3004434: test fact sheet (last literature review Oct 2021; updated Sep 2023). https://ltd.aruplab.com/api/ltd/pdf/219", "link": "https://ltd.aruplab.com/api/ltd/pdf/219", "areas": ["B"], "unverified": false}, {"key": "AutoinflammatoryAlliance", "text": "Autoinflammatory Alliance (US 501(c)(3) nonprofit). https://www.autoinflammatory.org (Description drawn from third-party listings; the organisation's own site was not fetched.)", "link": "https://www.autoinflammatory.org", "areas": ["E", "G"], "unverified": false}, {"key": "BEAM101", "text": "Beam Therapeutics. BEACON Phase 1/2 study of BEAM-101, autologous base-edited CD34+ hematopoietic stem cells, in sickle cell disease. ASH 2024 abstract 204888 and EHA 2025 data update; ClinicalTrials.gov NCT05456880. https://ash.confex.com/ash/2024/webprogram/Paper204888.html (company-presented, not peer-reviewed as a full paper)", "link": "https://ash.confex.com/ash/2024/webprogram/Paper204888.html", "areas": ["F"], "unverified": false}, {"key": "BenChetrit1996", "text": "Ben-Chetrit E, Scherrmann JM, Levy M. Colchicine in breast milk of patients with familial Mediterranean fever. Arthritis Rheum. 1996;39(7):1213–1217. PMID 8670333. doi:10.1002/art.1780390721.", "link": "https://doi.org/10.1002/art.1780390721", "areas": ["D"], "unverified": false}, {"key": "BenChetrit1998ARD", "text": "Ben-Chetrit E, Backenroth R, Haimov-Kochman R, Pizov G. Azoospermia in familial Mediterranean fever patients: the role of colchicine and amyloidosis. Ann Rheum Dis. 1998;57(4):259–260. PMID 9709191. PMCID PMC1752571. doi:10.1136/ard.57.4.259. (Testicular-biopsy detail taken from BenChetrit2018Textbook; letter text not opened.)", "link": "https://doi.org/10.1136/ard.57.4.259", "areas": ["D"], "unverified": false}, {"key": "BenChetrit1998MH", "text": "Ben-Chetrit E, Levy M. Does the lack of the P-glycoprotein efflux pump in neutrophils explain the efficacy of colchicine in familial Mediterranean fever and other inflammatory diseases? Med Hypotheses. 1998;51(5):377–380. PMID 9848464. doi:10.1016/S0306-9877(98)90031-7.", "link": "https://doi.org/10.1016/S0306-9877(98", "areas": ["D"], "unverified": false}, {"key": "BenChetrit2004", "text": "Ben-Chetrit E, Berkun Y, Ben-Chetrit E, Ben-Chetrit A. The outcome of pregnancy in the wives of men with familial Mediterranean fever treated with colchicine. Semin Arthritis Rheum. 2004;34(2):549-552. PMID 15505771. DOI 10.1016/j.semarthrit.2004.07.004.", "link": "https://doi.org/10.1016/j.semarthrit.2004.07.004", "areas": ["E"], "unverified": false}, {"key": "BenChetrit2009", "text": "Ben-Chetrit E, Touitou I. Familial Mediterranean fever in the world. Arthritis Rheum. 2009;61(10):1447-1453. PMID 19790133; doi:10.1002/art.24458 (no abstract; content cited via Tufan2020)", "link": "https://doi.org/10.1002/art.24458", "areas": ["A"], "unverified": false}, {"key": "BenChetrit2009D", "text": "Ben-Chetrit E, Aamar S. About colchicine compliance, resistance and virulence. Clin Exp Rheumatol. 2009;27(2 Suppl 53):S1–S3. PMID 19796522.", "link": "https://pubmed.ncbi.nlm.nih.gov/19796522/", "areas": ["D"], "unverified": false}, {"key": "BenChetrit2010", "text": "Ben-Chetrit E, Ben-Chetrit A, Berkun Y, Ben-Chetrit E. Pregnancy outcomes in women with familial Mediterranean fever receiving colchicine: is amniocentesis justified? Arthritis Care Res (Hoboken). 2010;62(2):143–148. PMID 20191511. doi:10.1002/acr.20061.", "link": "https://doi.org/10.1002/acr.20061", "areas": ["D", "E"], "unverified": false}, {"key": "BenChetrit2018Textbook", "text": "Ben-Chetrit E. Colchicine. In: Hashkes PJ, Laxer RM, Simon A, eds. Textbook of Autoinflammation. Cham: Springer; 2019 (online 2018):729–749. PMCID PMC7120738. doi:10.1007/978-3-319-98605-0_40.", "link": "https://doi.org/10.1007/978-3-319-98605-0_40", "areas": ["D", "G"], "unverified": false}, {"key": "BenChetrit2019", "text": "Ben-Chetrit E, Yazici H. Familial Mediterranean fever: different faces around the world. Clin Exp Rheumatol. 2019;37 Suppl 121:18-22. PMID 31694745 (full text not read; statement seen via search excerpt)", "link": "https://pubmed.ncbi.nlm.nih.gov/31694745/", "areas": ["A"], "unverified": false}, {"key": "BenChetritLevy2003", "text": "Ben-Chetrit E, Levy M. Reproductive system in familial Mediterranean fever: an overview. Ann Rheum Dis. 2003;62(10):916–919. PMID 12972465. PMCID PMC1754343. doi:10.1136/ard.62.10.916. (Abstract and full text not opened; cited for its general conclusion as summarized in Ozen2017 and BenChetrit2018Textbook.)", "link": "https://doi.org/10.1136/ard.62.10.916", "areas": ["D"], "unverified": false}, {"key": "BenZvi2015", "text": "Ben-Zvi I, Herskovizh C, Kukuy O, Kassel Y, Grossman C, Livneh A. Familial Mediterranean fever without MEFV mutations: a case-control study. Orphanet J Rare Dis. 2015;10:34. PMID 25887307. doi:10.1186/s13023-015-0252-7", "link": "https://doi.org/10.1186/s13023-015-0252-7", "areas": ["B"], "unverified": false}, {"key": "BenZvi2017", "text": "Ben-Zvi I, Kukuy O, Giat E, Pras E, Feld O, Kivity S, Perski O, Bornstein G, Grossman C, Harari G, Lidar M, Livneh A. Anakinra for colchicine-resistant familial Mediterranean fever: a randomized, double-blind, placebo-controlled trial. Arthritis Rheumatol. 2017;69(4):854-862. PMID 27860460. DOI 10.1002/art.39995.", "link": "https://doi.org/10.1002/art.39995", "areas": ["E", "F"], "unverified": false}, {"key": "Berkun2007", "text": "Berkun Y, Padeh S, Reichman B, et al. A single testing of serum amyloid A levels as a tool for diagnosis and treatment dilemmas in familial Mediterranean fever. Semin Arthritis Rheum. 2007;37(3):182–188. PMID 17512038. doi:10.1016/j.semarthrit.2007.03.005", "link": "https://doi.org/10.1016/j.semarthrit.2007.03.005", "areas": ["B"], "unverified": false}, {"key": "Berkun2012", "text": "Berkun Y, Wason S, Brik R, Butbul Y, Ben-Chetrit E, Hashkes PJ, Livneh A, et al. Pharmacokinetics of colchicine in pediatric and adult patients with familial Mediterranean fever. Int J Immunopathol Pharmacol. 2012;25(4):1121–1130. PMID 23298502. doi:10.1177/039463201202500429.", "link": "https://doi.org/10.1177/039463201202500429", "areas": ["D"], "unverified": false}, {"key": "Bodakci2021", "text": "Bodakçi E, Yaşar Bilge NŞ, Ataş N, et al. Appendectomy history is associated with severe disease and colchicine resistance in adult familial Mediterranean fever patients. Turk J Med Sci. 2021;51(4):1706-1711. DOI 10.3906/sag-2011-74.", "link": "https://doi.org/10.3906/sag-2011-74", "areas": ["E", "G"], "unverified": false}, {"key": "Bolek2026", "text": "Bolek EC, Bilgin E, Kardas RC, Kilic L, Kiraz S, Ertenli AI, Sari A, et al. Sociodemographic and clinical determinants of colchicine adherence in adults with familial Mediterranean fever: a cross-sectional study. Rheumatol Ther. 2026;13:1357–1377. PMID 42789246. PMCID PMC13624199. doi:10.1007/s40744-026-00883-w.", "link": "https://doi.org/10.1007/s40744-026-00883-w", "areas": ["D", "G"], "unverified": false}, {"key": "Booth2000", "text": "Booth DR, Gillmore JD, Lachmann HJ, et al. The genetic basis of autosomal dominant familial Mediterranean fever. QJM. 2000;93(4):217–221. PMID 10787449. doi:10.1093/qjmed/93.4.217", "link": "https://doi.org/10.1093/qjmed/93.4.217", "areas": ["B"], "unverified": false}, {"key": "Booty2009", "text": "Booty MG, Chae JJ, Masters SL, et al. Familial Mediterranean fever with a single MEFV mutation: where is the second hit? Arthritis Rheum. 2009;60(6):1851–1861. PMID 19479870. doi:10.1002/art.24569", "link": "https://doi.org/10.1002/art.24569", "areas": ["B"], "unverified": false}, {"key": "Broz2016", "text": "Broz P, Dixit VM. Inflammasomes: mechanism of assembly, regulation and signalling. Nature Reviews Immunology. 2016;16(7):407-420. PMID: 27291964. DOI: 10.1038/nri.2016.58", "link": "https://doi.org/10.1038/nri.2016.58", "areas": ["C"], "unverified": false}, {"key": "Cacan2021", "text": "Cacan E, Citli S, Yildirimtepe Caldiran F, Deveci K. IL-1b, IL-18 and Caspase-1 Levels in Serum as an Early Marker in Familial Mediterranean Fever. Journal of Contemporary Medicine. 2021;11(4):494-499.", "link": "https://dergipark.org.tr/tr/pub/jcm/issue/61403/907284", "areas": ["F"], "unverified": false, "note": "Earlier entry paraphrased the title. DOAJ holds two records with the author order reversed; the DergiPark page is authoritative."}, {"key": "Cam2024", "text": "Çam V, Ercan Emreol H, Ozen S. New and future perspectives in familial Mediterranean fever and other autoinflammatory diseases. Arch Rheumatol. 2024;39(3):331-338. doi:10.46497/ArchRheumatol.2024.10911. PMID 39507834. PMCID PMC11537678.", "link": "https://doi.org/10.46497/ArchRheumatol.2024.10911", "areas": ["F"], "unverified": false}, {"key": "CAPS-ALL-HSCT", "text": "Mori T, Saburi M, Hagihara M, Mori M, Yamazaki R, Kato J. Long-term remission of cryopyrin-associated periodic syndrome after allogeneic haematopoietic stem cell transplantation. Ann Rheum Dis. 2021;80(4):542-543. PMID 33158880. doi:10.1136/annrheumdis-2020-218695. (Two-page letter, paywalled and not abstracted; the transplant indication and the duration of remission could not be confirmed and are not stated in this app.)", "link": "https://pubmed.ncbi.nlm.nih.gov/33158880/", "areas": ["F"], "unverified": true, "note": "Specific details beyond long-term remission after transplant remain unconfirmed."}, {"key": "Casgevy2023", "text": "U.S. FDA approval of exagamglogene autotemcel (Casgevy; Vertex/CRISPR Therapeutics) for sickle cell disease, 8 December 2023; expanded to transfusion-dependent β-thalassemia January 2024; age indication lowered to ≥2 years July 2026. American Society of Gene & Cell Therapy news summary. https://www.asgct.org/news-publications/asgct-news/u-s-first-gene-therapies-for-sickle-cell-disease-approved-by-fda", "link": "https://www.asgct.org/news-publications/asgct-news/u-s-first-gene-therapies-for-sickle-cell-disease-approved-by-fda", "areas": ["F"], "unverified": false}, {"key": "Cattan2003", "text": "Cattan D. Familial Mediterranean fever: is low mortality from tuberculosis a specific advantage for MEFV mutation carriers? Clin Exp Rheumatol. 2003;21(4 Suppl 30):S53-4 (letter, with author reply at S54). PMID 14727462.", "link": "https://pubmed.ncbi.nlm.nih.gov/14727462/", "areas": ["A"], "unverified": false}, {"key": "Cazeneuve1999", "text": "Cazeneuve C, Sarkisian T, Pêcheux C, et al. MEFV-gene analysis in Armenian patients with familial Mediterranean fever: diagnostic value and unfavorable renal prognosis of the M694V homozygous genotype — genetic and therapeutic implications. Am J Hum Genet. 1999;65(1):88–97. PMID 10364520. doi:10.1086/302459", "link": "https://doi.org/10.1086/302459", "areas": ["B"], "unverified": false}, {"key": "Cazeneuve2000", "text": "Cazeneuve C, Ajrapetyan H, Papin S, Roudot-Thoraval F, Geneviève D, Mndjoyan E, Papazian M, Sarkisian A, Babloyan A, Boissier B, Duquesnoy P, Kouyoumdjian JC, Girodon-Boulandet E, Grateau G, Sarkisian T, Amselem S. Identification of MEFV-independent modifying genetic factors for familial Mediterranean fever. Am J Hum Genet. 2000;67(5):1136-1143. PMID 11017802. DOI 10.1016/S0002-9297(07)62944-9.", "link": "https://doi.org/10.1016/S0002-9297(07", "areas": ["E"], "unverified": false}, {"key": "Centola2000", "text": "Centola M, Wood G, Frucht DM, Galon J, et al., Kastner DL. The gene for familial Mediterranean fever, MEFV, is expressed in early leukocyte development and is regulated in response to inflammatory mediators. Blood. 2000;95(10):3223-3231. PMID: 10807793. DOI: 10.1182/blood.V95.10.3223", "link": "https://doi.org/10.1182/blood.V95.10.3223", "areas": ["C", "F"], "unverified": false}, {"key": "Chae2009", "text": "Chae JJ, Aksentijevich I, Kastner DL. Advances in the understanding of familial Mediterranean fever and possibilities for targeted therapy. British Journal of Haematology. 2009;146(5):467-478. PMID: 19466978. DOI: 10.1111/j.1365-2141.2009.07733.x", "link": "https://doi.org/10.1111/j.1365-2141.2009.07733.x", "areas": ["C"], "unverified": false}, {"key": "Chae2011", "text": "Chae JJ, Cho YH, Lee GS, et al. Gain-of-function Pyrin mutations induce NLRP3 protein-independent interleukin-1β activation and severe autoinflammation in mice. Immunity. 2011;34(5):755–768. PMID 21600797. doi:10.1016/j.immuni.2011.02.020", "link": "https://doi.org/10.1016/j.immuni.2011.02.020", "areas": ["B", "C", "F"], "unverified": false}, {"key": "Chappey1993", "text": "Chappey ON, Niel E, Wautier JL, Hung PP, Dervichian M, Cattan D, Scherrmann JM. Colchicine disposition in human leukocytes after single and multiple oral administration. Clin Pharmacol Ther. 1993;54(4):360–367. PMID 8222477. doi:10.1038/clpt.1993.161.", "link": "https://doi.org/10.1038/clpt.1993.161", "areas": ["D"], "unverified": false}, {"key": "Chappey1994", "text": "Chappey O, Niel E, Dervichian M, Wautier JL, Scherrmann JM, Cattan D. Colchicine concentration in leukocytes of patients with familial Mediterranean fever. Br J Clin Pharmacol. 1994;38(1):87–89. PMID 7946943. PMCID PMC1364844. doi:10.1111/j.1365-2125.1994.tb04328.x.", "link": "https://doi.org/10.1111/j.1365-2125.1994.tb04328.x", "areas": ["D"], "unverified": false}, {"key": "Coll2015", "text": "Coll RC, Robertson AAB, Chae JJ, et al. A small-molecule inhibitor of the NLRP3 inflammasome for the treatment of inflammatory diseases. Nat Med. 2015;21(3):248-255. PMID 25686105.", "link": "https://pubmed.ncbi.nlm.nih.gov/25686105/", "areas": ["F"], "unverified": false}, {"key": "Cronstein1995", "text": "Cronstein BN, Molad Y, Reibman J, Balakhane E, Levin RI, Weissmann G. Colchicine alters the quantitative and qualitative display of selectins on endothelial cells and neutrophils. J Clin Invest. 1995;96(2):994–1002. PMID 7543498. PMCID PMC185287. doi:10.1172/JCI118147.", "link": "https://doi.org/10.1172/JCI118147", "areas": ["D"], "unverified": false}, {"key": "CTgovSweep2026", "text": "ClinicalTrials.gov API v2 query, condition \"Familial Mediterranean Fever\", retrieved 16 October 2026; 38 studies with start dates 2019 or later. https://clinicaltrials.gov/search?cond=Familial%20Mediterranean%20Fever", "link": "https://clinicaltrials.gov/search?cond=Familial%20Mediterranean%20Fever", "areas": ["F"], "unverified": false}, {"key": "Cush2025", "text": "Cush JJ. 2024 Management of Familial Mediterranean Fever Recommendations. RheumNow, 28 Apr 2025. https://rheumnow.com/news/2024-management-familial-mediterranean-fever-recommendations (secondary summary of Ozen2025).", "link": "https://rheumnow.com/news/2024-management-familial-mediterranean-fever-recommendations", "areas": ["D"], "unverified": false}, {"key": "DeBenedetti2018", "text": "De Benedetti F, Gattorno M, Anton J, Ben-Chetrit E, Frenkel J, et al. (30 authors). Canakinumab for the treatment of autoinflammatory recurrent fever syndromes. N Engl J Med. 2018;378(20):1908-1919. PMID 29768139. DOI 10.1056/NEJMoa1706314. ClinicalTrials.gov NCT02059291.", "link": "https://doi.org/10.1056/NEJMoa1706314", "areas": ["E", "F"], "unverified": false}, {"key": "Deger2011", "text": "Deger SM, Ozturk MA, Demirag MD, Aslan S, Goker B, Haznedaroglu S, Onat AM. Health-related quality of life and its associations with mood condition in familial Mediterranean fever patients. Rheumatol Int. 2011;31(5):623-628. PMID 20049448. DOI 10.1007/s00296-009-1334-4.", "link": "https://doi.org/10.1007/s00296-009-1334-4", "areas": ["E"], "unverified": false}, {"key": "DellaCasa2022", "text": "Della Casa F, Vitale A, Lopalco G, et al., Cantarini L. Development and implementation of the AIDA international registry for patients with undifferentiated systemic autoinflammatory diseases. Front Med (Lausanne). 2022;9:908501. PMID 35755024. PMCID PMC9226373. doi:10.3389/fmed.2022.908501. ClinicalTrials.gov NCT05200715.", "link": "https://doi.org/10.3389/fmed.2022.908501", "areas": ["G"], "unverified": false}, {"key": "Delplanque2024", "text": "Delplanque M, Benech N, Rolhion N, Oeuvray C, Straube M, Galbert C, Brot L, Henry T, Jamilloux Y, Savey L, Grateau G, Sokol H, Georgin-Lavialle S. Gut microbiota in familial Mediterranean fever. Rheumatology (Oxford). 2024;63(4):1039-1048. doi:10.1093/rheumatology/kead322", "link": "https://doi.org/10.1093/rheumatology/kead322", "areas": ["F"], "unverified": false}, {"key": "Dember2007", "text": "Dember LM, Hawkins PN, Hazenberg BP, Gorevic PD, Merlini G, et al.; Eprodisate for AA Amyloidosis Trial Group. Eprodisate for the treatment of renal disease in AA amyloidosis. N Engl J Med. 2007;356(23):2349-2360. PMID 17554116. DOI 10.1056/NEJMoa065644.", "link": "https://doi.org/10.1056/NEJMoa065644", "areas": ["E"], "unverified": false}, {"key": "Demirkaya2016", "text": "Demirkaya E, Saglam C, Turker T, et al. Performance of different diagnostic criteria for familial Mediterranean fever in children with periodic fevers: results from a multicenter international registry. J Rheumatol. 2016;43(1):154–160. PMID 26568587. doi:10.3899/jrheum.141249", "link": "https://doi.org/10.3899/jrheum.141249", "areas": ["B"], "unverified": false}, {"key": "DemirkayaISSF2016", "text": "Demirkaya E, Acikel C, Hashkes P, Gattorno M, Gul A, Ozdogan H, Turker T, Karadag O, Livneh A, Ben-Chetrit E, et al.; FMF Arthritis Vasculitis and Orphan Disease Research in Paediatric Rheumatology (FAVOR). Development and initial validation of international severity scoring system for familial Mediterranean fever (ISSF). Ann Rheum Dis. 2016;75(6):1051–1056. PMID 26823530. doi:10.1136/annrheumdis-2015-208671. (Abstract read; full text paywalled, so the exact nine-domain wording and per-item points are taken from secondary sources and marked unverified. This is a different paper from [Demirkaya2016] in file B, which is the J Rheumatol diagnostic-criteria performance study.)", "link": "https://doi.org/10.1136/annrheumdis-2015-208671", "areas": ["G"], "unverified": true}, {"key": "Denke2026", "text": "Denke NJ. Navigating colchicine toxicity: essential management for a timeless therapy. J Emerg Nurs. 2026;52(5):1125–1131. PMID 42618164. doi:10.1016/j.jen.2026.03.003. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1016/j.jen.2026.03.003", "areas": ["G"], "unverified": false}, {"key": "DFV890", "text": "Gatlik E, Mehes B, Voltz E, Sommer U, Tritto E, Lestini G, Liu X, Pal P, Velinova M, Denney WS, Fu Y, Opipari A, Dean D, Junge G. First-in-human safety, tolerability and pharmacokinetics of DFV890, an oral NLRP3 inhibitor. Clin Transl Sci. 2024;17(5):e13789. PMID 38761014. PMCID PMC11101992. Open access.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11101992/", "areas": ["F"], "unverified": false, "note": "The companion phase 2 study in familial cold autoinflammatory syndrome (NCT04868968) is recorded as completed with an actual enrolment of 4 participants."}, {"key": "DiavCitrin2010", "text": "Diav-Citrin O, Shechtman S, Schwartz V, Avgil-Tsadok M, Finkel-Pekarsky V, Wajnberg R, et al. Pregnancy outcome after in utero exposure to colchicine. Am J Obstet Gynecol. 2010;203(2):144.e1–144.e6. PMID 20579964. doi:10.1016/j.ajog.2010.02.063.", "link": "https://doi.org/10.1016/j.ajog.2010.02.063", "areas": ["D"], "unverified": false}, {"key": "Diaz2004", "text": "Diaz A, Hu C, Kastner DL, Schaner P, Reginato AM, Richards N, Gumucio DL. Lipopolysaccharide-induced expression of multiple alternatively spliced MEFV transcripts in human synovial fibroblasts: a prominent splice isoform lacks the C-terminal domain that is highly mutated in familial Mediterranean fever. Arthritis and Rheumatism. 2004;50(11):3679-3689. PMID: 15529356. DOI: 10.1002/art.20600", "link": "https://doi.org/10.1002/art.20600", "areas": ["C", "F"], "unverified": false}, {"key": "DiCiaula2020", "text": "Di Ciaula A, Stella A, Bonfrate L, Wang DQH, Portincasa P. Gut Microbiota between Environment and Genetic Background in Familial Mediterranean Fever (FMF). Genes (Basel). 2020;11(9):1041. PMID 32899315. PMCID PMC7563178. doi:10.3390/genes11091041", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7563178/", "areas": ["F"], "unverified": false, "note": "Earlier entry named the wrong second author."}, {"key": "Dinarello1974", "text": "Dinarello CA, Wolff SM, Goldfinger SE, Dale DC, Alling DW. Colchicine therapy for familial Mediterranean fever. A double-blind trial. N Engl J Med. 1974;291(18):934-937. PMID 4606353; doi:10.1056/NEJM197410312911804", "link": "https://doi.org/10.1056/NEJM197410312911804", "areas": ["A", "D"], "unverified": false}, {"key": "Dinarello2011", "text": "Dinarello CA. Interleukin-1 in the pathogenesis and treatment of inflammatory diseases. Blood. 2011;117(14):3720-3732. PMID: 21304099. DOI: 10.1182/blood-2010-07-273417", "link": "https://doi.org/10.1182/blood-2010-07-273417", "areas": ["C"], "unverified": false}, {"key": "Duzova2003", "text": "Duzova A, Bakkaloglu A, Besbas N, Topaloglu R, Ozen S, Ozaltin F, et al. Role of A-SAA in monitoring subclinical inflammation and in colchicine dosage in familial Mediterranean fever. Clin Exp Rheumatol. 2003;21(4):509–514. PMID 12942707.", "link": "https://pubmed.ncbi.nlm.nih.gov/12942707/", "areas": ["D"], "unverified": false}, {"key": "Ehlers2023", "text": "Ehlers L, Rolfes E, Lieber M, Müller D, Lainka E, Gohar F, Klaus G, Girschick H, et al., Kallinich T. Treat-to-target strategies for the management of familial Mediterranean fever in children. Pediatr Rheumatol Online J. 2023;21:108. PMID 37752496. PMCID PMC10521475. doi:10.1186/s12969-023-00875-y.", "link": "https://doi.org/10.1186/s12969-023-00875-y", "areas": ["D", "G"], "unverified": false}, {"key": "ErdemTorun2026", "text": "Erdem Torun Ş, Çelikel E, Ekici Tekin Z, Ertem Ş, Özçelik MA, et al. Assessment of colchicine adherence and influencing factors in paediatric familial Mediterranean fever. Scand J Rheumatol. 2026;55:289–297. PMID 41693473. doi:10.1080/03009742.2026.2618334.", "link": "https://doi.org/10.1080/03009742.2026.2618334", "areas": ["D", "G"], "unverified": false}, {"key": "Evavold2018", "text": "Evavold CL, Ruan J, Tan Y, Xia S, Wu H, Kagan JC. The pore-forming protein gasdermin D regulates interleukin-1 secretion from living macrophages. Immunity. 2018;48(1):35-44.e6. PMID: 29195811. DOI: 10.1016/j.immuni.2017.11.013", "link": "https://doi.org/10.1016/j.immuni.2017.11.013", "areas": ["C"], "unverified": false}, {"key": "Favier2016", "text": "Favier LA, Schulert GS. Mevalonate kinase deficiency: current perspectives. Appl Clin Genet. 2016;9:101–110. PMID 27499643. doi:10.2147/TACG.S93933", "link": "https://doi.org/10.2147/TACG.S93933", "areas": ["B"], "unverified": false}, {"key": "FDA-Colcrys", "text": "COLCRYS (colchicine, USP) tablets, US prescribing information (Takeda/AR Scientific; repackager SPL version published 21 Oct 2022). DailyMed setid d6adc880-5499-4691-93f3-27c87902d5fc. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=d6adc880-5499-4691-93f3-27c87902d5fc", "link": "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=d6adc880-5499-4691-93f3-27c87902d5fc", "areas": ["D", "G"], "unverified": false}, {"key": "Federici2012", "text": "Federici S, Calcagno G, Finetti M, et al. Clinical impact of MEFV mutations in children with periodic fever in a prevalent western European Caucasian population. Ann Rheum Dis. 2012;71(12):1961–1965. PMID 22580583. doi:10.1136/annrheumdis-2011-200977", "link": "https://doi.org/10.1136/annrheumdis-2011-200977", "areas": ["B"], "unverified": false}, {"key": "Federici2015", "text": "Federici S, Sormani MP, Ozen S, et al. Evidence-based provisional clinical classification criteria for autoinflammatory periodic fevers. Ann Rheum Dis. 2015;74(5):799–805. PMID 25637003. doi:10.1136/annrheumdis-2014-206580", "link": "https://doi.org/10.1136/annrheumdis-2014-206580", "areas": ["B"], "unverified": false}, {"key": "Ferron1996", "text": "Ferron GM, Rochdi M, Jusko WJ, Scherrmann JM. Oral absorption characteristics and pharmacokinetics of colchicine in healthy volunteers after single and multiple doses. J Clin Pharmacol. 1996;36(10):874–883. PMID 8930773. doi:10.1002/j.1552-4604.1996.tb04753.x.", "link": "https://doi.org/10.1002/j.1552-4604.1996.tb04753.x", "areas": ["D"], "unverified": false}, {"key": "Finkelstein2010", "text": "Finkelstein Y, Aks SE, Hutson JR, Juurlink DN, Nguyen P, Dubnov-Raz G, et al. Colchicine poisoning: the dark side of an ancient drug. Clin Toxicol (Phila). 2010;48(5):407–414. PMID 20586571. doi:10.3109/15563650.2010.495348.", "link": "https://doi.org/10.3109/15563650.2010.495348", "areas": ["D"], "unverified": false}, {"key": "Fioredda2017", "text": "Okolo ON, Katsanis E, Yun S, Reveles CY, Anwer F. Allogeneic Transplant in ELANE and MEFV Mutation Positive Severe Cyclic Neutropenia: Review of Prognostic Factors for Secondary Severe Events. Case Rep Hematol. 2017;2017:5375793. PMID 28197346. PMCID PMC5286543. doi:10.1155/2017/5375793", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5286543/", "areas": ["F"], "unverified": false, "note": "Earlier entry named the wrong authors entirely."}, {"key": "FMFAID", "text": "FMF & AID Global Association (Familial Mediterranean Fever & Autoinflammatory Diseases Global Association), Zürich, Switzerland. https://fmfandaid.org (Description drawn from third-party directory listings; the organisation's own site was not fetched.)", "link": "https://fmfandaid.org", "areas": ["E", "G"], "unverified": false}, {"key": "Frangoul2021", "text": "Frangoul H, Altshuler D, Cappellini MD, et al. CRISPR-Cas9 gene editing for sickle cell disease and β-thalassemia. N Engl J Med. 2021;384(3):252-260. doi:10.1056/NEJMoa2031054.", "link": "https://doi.org/10.1056/NEJMoa2031054", "areas": ["F"], "unverified": false}, {"key": "FrenchFMF1997", "text": "French FMF Consortium. A candidate gene for familial Mediterranean fever. Nat Genet. 1997;17:25-31. PMID 9288094; doi:10.1038/ng0997-25", "link": "https://doi.org/10.1038/ng0997-25", "areas": ["A", "B", "C"], "unverified": false}, {"key": "Fujikura2015", "text": "Fujikura K. Global epidemiology of Familial Mediterranean fever mutations using population exome sequences. Mol Genet Genomic Med. 2015;3:272-282. PMID 26247045; PMCID PMC4521964; doi:10.1002/mgg3.140", "link": "https://doi.org/10.1002/mgg3.140", "areas": ["A"], "unverified": false}, {"key": "Furer2020", "text": "Furer V, Rondaan C, Heijstek MW, Agmon-Levin N, van Assen S, Bijl M, et al. 2019 update of EULAR recommendations for vaccination in adult patients with autoimmune inflammatory rheumatic diseases. Ann Rheum Dis. 2020;79(1):39-52. PMID 31413005. DOI 10.1136/annrheumdis-2019-215882.", "link": "https://doi.org/10.1136/annrheumdis-2019-215882", "areas": ["E", "G"], "unverified": false}, {"key": "Gao2016", "text": "Gao W, Yang J, Liu W, Wang Y, Shao F. Site-specific phosphorylation and microtubule dynamics control Pyrin inflammasome activation. Proceedings of the National Academy of Sciences USA. 2016;113(33):E4857-E4866. PMID: 27482109. DOI: 10.1073/pnas.1601700113", "link": "https://doi.org/10.1073/pnas.1601700113", "areas": ["C", "D", "F"], "unverified": false}, {"key": "Gattorno2019", "text": "Gattorno M, Hofer M, Federici S, et al.; Eurofever Registry and PRINTO. Classification criteria for autoinflammatory recurrent fevers. Ann Rheum Dis. 2019;78(8):1025–1032. PMID 31018962. doi:10.1136/annrheumdis-2019-215048. Criteria tables and footnotes were read from the accepted manuscript at UCL Discovery (https://discovery.ucl.ac.uk/id/eprint/10073095/). Its genotype footnote says \"(or biallelic?)\", while the published version, as reproduced in [Lancieri2023], says \"(or biallelic)\". Check the typeset Table 2 before quoting it verbatim.", "link": "https://discovery.ucl.ac.uk/id/eprint/10073095/", "areas": ["B"], "unverified": false}, {"key": "GeneReviews", "text": "Deuitch N, Chavez De Paz Solis D, Stone D, Ombrello A, Aksentijevich I. Familial Mediterranean Fever. In: Adam MP, et al., eds. GeneReviews®. University of Washington, Seattle; 1993–present (current revision). PMID 20301405; https://www.ncbi.nlm.nih.gov/books/NBK1227/ (summary read via Europe PMC; NCBI page was bot-blocked)", "link": "https://www.ncbi.nlm.nih.gov/books/NBK1227/", "areas": ["A", "B", "G"], "unverified": false}, {"key": "GershoniBaruch2001", "text": "Gershoni-Baruch R, Shinawi M, Leah K, Badarnah K, Brik R. Familial Mediterranean fever: prevalence, penetrance and genetic drift. Eur J Hum Genet. 2001;9:634-637. PMID 11528510; doi:10.1038/sj.ejhg.5200672", "link": "https://doi.org/10.1038/sj.ejhg.5200672", "areas": ["A"], "unverified": false}, {"key": "GershoniBaruch2003", "text": "Gershoni-Baruch R, Brik R, Lidar M, Shinawi M, Livneh A. Male sex coupled with articular manifestations cause a 4-fold increase in susceptibility to amyloidosis in patients with familial Mediterranean fever homozygous for the M694V-MEFV mutation. J Rheumatol. 2003;30(2):308–312. PMID 12563686.", "link": "https://pubmed.ncbi.nlm.nih.gov/12563686/", "areas": ["B"], "unverified": false}, {"key": "GezginYildirim2020", "text": "Gezgin Yildirim D, Seven MB, Gönen S, Söylemezoğlu O. Erysipelas-like erythema in children with familial Mediterranean fever. Clin Exp Rheumatol. 2020;38 Suppl 127(5):101-104. PMID 33124556", "link": "https://pubmed.ncbi.nlm.nih.gov/33124556/", "areas": ["A", "G"], "unverified": false}, {"key": "GezginYildirim2022age", "text": "Gezgin Yildirim D, Gönen S, Fidan K, Söylemezoğlu O. Does age at onset affect the clinical presentation of familial Mediterranean fever in children? J Clin Rheumatol. 2022;28:e125-e128. PMID 33252389; doi:10.1097/RHU.0000000000001637", "link": "https://doi.org/10.1097/RHU.0000000000001637", "areas": ["A"], "unverified": false}, {"key": "Giaglis2007", "text": "Giaglis S, Papadopoulos V, Kambas K, et al. MEFV alterations and population genetics analysis in a large cohort of Greek patients with familial Mediterranean fever. Clin Genet. 2007;71:458-467. PMID 17489852; doi:10.1111/j.1399-0004.2007.00789.x", "link": "https://doi.org/10.1111/j.1399-0004.2007.00789.x", "areas": ["A"], "unverified": false}, {"key": "Giancane2015", "text": "Giancane G, Ter Haar NM, Wulffraat N, et al. Evidence-based recommendations for genetic diagnosis of familial Mediterranean fever. Ann Rheum Dis. 2015;74(4):635–641. PMID 25628446. doi:10.1136/annrheumdis-2014-206844. The 8 recommendations were read from the reproduction in [Ozen2017].", "link": "https://doi.org/10.1136/annrheumdis-2014-206844", "areas": ["B"], "unverified": false}, {"key": "gnomAD", "text": "Genome Aggregation Database v2.1 allele frequencies, retrieved through MyVariant.info (https://myvariant.info) for rs61752717 (M694V), rs28940579 (V726A), rs28940580 (M680I), rs28940578 (M694I), rs3743930 (E148Q), rs104895094 (K695R), rs61732874 (A744S) and rs104895097 (R761H); accessed 2026-10-16. Population AFs are approximate, and gnomAD v2 has no Middle Eastern group.", "link": "https://myvariant.info", "areas": ["B"], "unverified": false}, {"key": "Goflikicept2025", "text": "Interim results of a randomized placebo-controlled study of IL-1 inhibitor goflikicept in patients with familial Mediterranean fever. ACR Convergence 2025 abstract; Arthritis Rheumatol. 2025;77(Suppl). https://acrabstracts.org/?p=44260 (conference abstract; outcome figures not retrieved)", "link": "https://acrabstracts.org/?p=44260", "areas": ["F"], "unverified": false}, {"key": "Gok2017", "text": "Gok K, Cengiz G, Erol K, Ozgocmen S. Tofacitinib suppresses disease activity and febrile attacks in a patient with coexisting rheumatoid arthritis and familial Mediterranean fever. Acta Reumatol Port. 2017;42(1):88-90. PMID 28371574.", "link": "https://pubmed.ncbi.nlm.nih.gov/28371574/", "areas": ["F"], "unverified": false}, {"key": "Goldfinger1972", "text": "Goldfinger SE. Colchicine for familial Mediterranean fever. N Engl J Med. 1972;287(25):1302. PMID 4636899; doi:10.1056/NEJM197212212872514", "link": "https://doi.org/10.1056/NEJM197212212872514", "areas": ["A", "D"], "unverified": false}, {"key": "Goldstein1974", "text": "Goldstein RC, Schwabe AD. Prophylactic colchicine therapy in familial Mediterranean fever. A controlled, double-blind study. Ann Intern Med. 1974;81(6):792–794. PMID 4611296. doi:10.7326/0003-4819-81-6-792.", "link": "https://doi.org/10.7326/0003-4819-81-6-792", "areas": ["D"], "unverified": false}, {"key": "Green2017", "text": "Green H, Lichtenberg S, Rahamimov R, Livneh A, Chagnac A, Mor E, Rozen-Zvi B. Familial Mediterranean fever is associated with increased mortality after kidney transplantation: a 19 years' single center experience. Transplantation. 2017;101(10):2621-2626. PMID 28926523. DOI 10.1097/TP.0000000000001681.", "link": "https://doi.org/10.1097/TP.0000000000001681", "areas": ["E"], "unverified": false}, {"key": "GulBenChetrit2025", "text": "Gül A, Ben-Chetrit E. The decline of AA amyloidosis in familial Mediterranean fever is significant, but the story is not over. Clin Exp Rheumatol. 2025;43:1715-1717. https://www.clinexprheumatol.org/article.asp?a=22887 (Full text read; PMID not checked.)", "link": "https://www.clinexprheumatol.org/article.asp?a=22887", "areas": ["E"], "unverified": false}, {"key": "Guzelant2017", "text": "Guzelant G, Ozguler Y, Esatoglu SN, et al. Exacerbation of Behçet's syndrome and familial Mediterranean fever with menstruation. Clin Exp Rheumatol. 2017;35 Suppl 108(6):95-99. PMID 29148415", "link": "https://pubmed.ncbi.nlm.nih.gov/29148415/", "areas": ["A"], "unverified": false}, {"key": "HaimovKochman1998", "text": "Haimov-Kochman R, Ben-Chetrit E. The effect of colchicine treatment on sperm production and function: a review. Hum Reprod. 1998;13(2):360–362. PMID 9557838. doi:10.1093/humrep/13.2.360.", "link": "https://doi.org/10.1093/humrep/13.2.360", "areas": ["D"], "unverified": false}, {"key": "Hakobyan2024", "text": "Grigor'eva EV, Karapetyan LV, Malakhova AA, Medvedev SP, Minina JM, Hayrapetyan VH, Vardanyan VS, Zakian SM, Arakelyan A, Zakharyan R. Int J Mol Sci. 2024;25(11):6102. PMCID PMC11173119.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11173119/", "areas": ["F"], "unverified": false, "note": "Earlier entry named the wrong authors."}, {"key": "Hashkes2012", "text": "Hashkes PJ, Spalding SJ, Giannini EH, Huang B, Johnson A, Park G, Barron KS, Weisman MH, Pashinian N, Reiff AO, Samuels J, Wright DA, Kastner DL, Lovell DJ. Rilonacept for colchicine-resistant or -intolerant familial Mediterranean fever: a randomized trial. Ann Intern Med. 2012;157(8):533-541. PMID 23070486. DOI 10.7326/0003-4819-157-8-201210160-00003. (Correction: Ann Intern Med 2014;160:291-292, PMID 24727851.)", "link": "https://doi.org/10.7326/0003-4819-157-8-201210160-00003", "areas": ["E", "F", "G"], "unverified": false}, {"key": "Hashkes2014", "text": "Hashkes PJ, Spalding SJ, Hajj-Ali R, et al. The effect of rilonacept versus placebo on health-related quality of life in patients with poorly controlled familial Mediterranean fever. Biomed Res Int. 2014;2014:854842. PMID 25147819. DOI 10.1155/2014/854842.", "link": "https://doi.org/10.1155/2014/854842", "areas": ["E"], "unverified": false}, {"key": "Haznedaroglu2005", "text": "Haznedaroglu S, Ozturk MA, Sancak B, Goker B, Onat AM, Bukan N, Ertenli I, Kiraz S, Calguneri M. Serum interleukin 17 and interleukin 18 levels in familial Mediterranean fever. Clin Exp Rheumatol. 2005;23(4 Suppl 38):S77-80. PMID 16273770.", "link": "https://pubmed.ncbi.nlm.nih.gov/16273770/", "areas": ["F"], "unverified": false}, {"key": "Heilig2018", "text": "Heilig R, Broz P. Function and mechanism of the pyrin inflammasome. European Journal of Immunology. 2018;48(2):230-238. PMID: 29148036. DOI: 10.1002/eji.201746947", "link": "https://doi.org/10.1002/eji.201746947", "areas": ["C"], "unverified": false}, {"key": "Heller1958", "text": "Heller H, Sohar E, Sherf L. Familial Mediterranean fever. AMA Arch Intern Med. 1958;102:50-71. PMID 13558745; doi:10.1001/archinte.1958.00260190052007", "link": "https://doi.org/10.1001/archinte.1958.00260190052007", "areas": ["A"], "unverified": false}, {"key": "Henes2022", "text": "Henes JC, Saur S, Kofler DM, Kedor C, Meisner C, Schuett M, Krusche M, Koetter I, Xenitidis T, Schulze-Koops H, Feist E; TOFFIFE Study Team. Tocilizumab for the treatment of familial Mediterranean fever: a randomized, double-blind, placebo-controlled phase II study. J Clin Med. 2022;11(18):5360. PMID 36143006. DOI 10.3390/jcm11185360.", "link": "https://doi.org/10.3390/jcm11185360", "areas": ["E", "F"], "unverified": false, "aliases": ["Henes2022F"]}, {"key": "Hirahara2024", "text": "Hirahara Y, Yamaguchi M, Takase-Minegishi K, et al. Pregnancy outcomes in patients with familial Mediterranean fever: systematic review and meta-analysis. Rheumatology (Oxford). 2024;63(2):277-284. PMID 37594755. DOI 10.1093/rheumatology/kead417.", "link": "https://doi.org/10.1093/rheumatology/kead417", "areas": ["E"], "unverified": false}, {"key": "Hospach2024", "text": "Hospach T, Blankenburg F, Heinkele A, et al. Protracted febrile myalgia syndrome in children with familial Mediterranean fever – systematic review and a case report. Pediatr Rheumatol Online J. 2024;22:85. PMID 39256780; PMCID PMC11389256; doi:10.1186/s12969-024-01019-6", "link": "https://doi.org/10.1186/s12969-024-01019-6", "areas": ["A", "G"], "unverified": false}, {"key": "Hu2020", "text": "Hu JJ, Liu X, Xia S, Zhang Z, Zhang Y, Zhao J, Ruan J, Luo X, Lou X, Bai Y, Wang J, Hollingsworth LR, Magupalli VG, Zhao L, Luo HR, Kim J, Lieberman J, Wu H. FDA-approved disulfiram inhibits pyroptosis by blocking gasdermin D pore formation. Nat Immunol. 2020;21(7):736-745. doi:10.1038/s41590-020-0669-6.", "link": "https://doi.org/10.1038/s41590-020-0669-6", "areas": ["F"], "unverified": false}, {"key": "Humphries2020", "text": "Humphries F, Shmuel-Galia L, Ketelut-Carneiro N, Li S, Wang B, Nemmara VV, Wilson R, Jiang Z, Khalighinejad F, Muneeruddin K, Shaffer SA, Dutta R, Ionete C, Pesiridis S, Yang S, Thompson PR, Fitzgerald KA. Succination inactivates gasdermin D and blocks pyroptosis. Science. 2020;369(6511):1633-1637. doi:10.1126/science.abb9818.", "link": "https://doi.org/10.1126/science.abb9818", "areas": ["F"], "unverified": false}, {"key": "Hung2005", "text": "Hung IF, Wu AK, Cheng VC, Tang BS, To KW, Yeung CK, Woo PC, Lau SK, et al. Fatal interaction between clarithromycin and colchicine in patients with renal insufficiency: a retrospective study. Clin Infect Dis. 2005;41(3):291–300. PMID 16007523. doi:10.1086/431592.", "link": "https://doi.org/10.1086/431592", "areas": ["D", "G"], "unverified": false}, {"key": "ICBD2014", "text": "International Team for the Revision of the International Criteria for Behçet's Disease (ITR-ICBD). The International Criteria for Behçet's Disease (ICBD): a collaborative study of 27 countries on the sensitivity and specificity of the new criteria. J Eur Acad Dermatol Venereol. 2014;28(3):338–347. PMID 23441863. doi:10.1111/jdv.12107", "link": "https://doi.org/10.1111/jdv.12107", "areas": ["B"], "unverified": false}, {"key": "IlarisPIG", "text": "ILARIS (canakinumab) injection, US prescribing information (Novartis), revised 11/2024. DailyMed setid 7d271f3b-e4f9-4d80-8dcf-28d49123f80e; current label version 8 Jun 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7d271f3b-e4f9-4d80-8dcf-28d49123f80e (full label read for this file; supersedes the partially verified note on this key in file E).", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7d271f3b-e4f9-4d80-8dcf-28d49123f80e", "areas": ["G", "E"], "unverified": false, "aliases": ["IlarisPI"], "note": "Full label read on DailyMed for the nursing research pass."}, {"key": "IllnessPerceptionFMF", "text": "Cross-sectional study of illness perception and medication adherence in familial Mediterranean fever (Turkey), reporting lower illness-perception scores in the personal control, treatment control and illness comprehensibility domains among adherent patients. Identified only through search results; the article record (journal, year, volume, pages, PMID) was not confirmed and the full text was not read (unverified). Candidate record to check: \"The impact of illness perception on medication adherence in patients with familial Mediterranean fever,\" indexed at https://avesis.akdeniz.edu.tr/yayin/6fc4d3c4-09f2-4abc-a353-b0af47d4e9cf/", "link": "https://avesis.akdeniz.edu.tr/yayin/6fc4d3c4-09f2-4abc-a353-b0af47d4e9cf/", "areas": ["G"], "unverified": true}, {"key": "Indraratna2018", "text": "Indraratna PL, Virk S, Gurram D, Day RO. Use of colchicine in pregnancy: a systematic review and meta-analysis. Rheumatology (Oxford). 2018;57(2):382–387. PMID 29029311. doi:10.1093/rheumatology/kex353.", "link": "https://doi.org/10.1093/rheumatology/kex353", "areas": ["D"], "unverified": false}, {"key": "Infevers2026", "text": "Infevers: the registry of hereditary auto-inflammatory disorders mutations, MEFV tabular list. https://infevers.umai-montpellier.fr/web/search.php?n=1 (accessed 2026-10-16; site says \"Total current number of sequence variants for MEFV: 412\").", "link": "https://infevers.umai-montpellier.fr/web/search.php?n=1", "areas": ["B"], "unverified": false}, {"key": "IntFMF1997", "text": "The International FMF Consortium. Ancient missense mutations in a new member of the RoRet gene family are likely to cause familial Mediterranean fever. Cell. 1997;90(4):797–807. PMID 9288758. doi:10.1016/S0092-8674(00)80539-5", "link": "https://doi.org/10.1016/S0092-8674(00", "areas": ["B", "A", "C"], "unverified": false, "aliases": ["IntlFMF1997"]}, {"key": "Jamilloux2018", "text": "Jamilloux Y, Lefeuvre L, Magnotti F, Martin A, et al., Henry T. Familial Mediterranean fever mutations are hypermorphic mutations that specifically decrease the activation threshold of the Pyrin inflammasome. Rheumatology (Oxford). 2018;57(1):100-111. PMID: 29040788. DOI: 10.1093/rheumatology/kex373", "link": "https://doi.org/10.1093/rheumatology/kex373", "areas": ["C"], "unverified": false}, {"key": "Janeway1908", "text": "Janeway TC, Mosenthal HO. An unusual paroxysmal syndrome, probably allied to recurrent vomiting, with a study of the nitrogen metabolism. Arch Intern Med. 1908;2:214-225. doi:10.1001/archinte.1908.00050080016002 (Crossref lists the article starting at p.214; end page and full subtitle are taken from secondary citations)", "link": "https://doi.org/10.1001/archinte.1908.00050080016002", "areas": ["A"], "unverified": false}, {"key": "Jeru2013", "text": "Jéru I, Hentgen V, Cochet E, et al. The risk of familial Mediterranean fever in MEFV heterozygotes: a statistical approach. PLoS One. 2013;8(7):e68431. PMID 23844200. doi:10.1371/journal.pone.0068431", "link": "https://doi.org/10.1371/journal.pone.0068431", "areas": ["B"], "unverified": false}, {"key": "Jeyaratnam2016", "text": "Jeyaratnam J, Ter Haar NM, de Sain-van der Velden MG, Waterham HR, van Gijn ME, Frenkel J. Diagnostic value of urinary mevalonic acid excretion in patients with a clinical suspicion of mevalonate kinase deficiency (MKD). JIMD Rep. 2016;27:33–38. PMID 26409462. doi:10.1007/8904_2015_489", "link": "https://doi.org/10.1007/8904_2015_489", "areas": ["B"], "unverified": false}, {"key": "Jeyaratnam2018", "text": "Jeyaratnam J, Ter Haar NM, Lachmann HJ, Kasapcopur O, Ombrello AK, Rigante D, Dedeoglu F, Baris EH, Vastert SJ, Wulffraat NM, Frenkel J. The safety of live-attenuated vaccines in patients using IL-1 or IL-6 blockade: an international survey. Pediatr Rheumatol Online J. 2018;16(1):19. PMID 29562920. DOI 10.1186/s12969-018-0235-z.", "link": "https://doi.org/10.1186/s12969-018-0235-z", "areas": ["E", "G"], "unverified": false}, {"key": "Jeyaratnam2022", "text": "Jeyaratnam J, Faraci M, Gennery AR, Drabko K, Algeri M, Morimoto A, Sirait T, Lankester AC, Albert M, Neven B, Frenkel J; EBMT Inborn Errors Working Party. The efficacy and safety of allogeneic stem cell transplantation in mevalonate kinase deficiency. Pediatr Rheumatol Online J. 2022;20(1):56. doi:10.1186/s12969-022-00716-4. PMID 35906690. PMCID PMC9338460.", "link": "https://doi.org/10.1186/s12969-022-00716-4", "areas": ["F"], "unverified": false}, {"key": "Kacan2023", "text": "Kaçan H, Kaş Alay G, Yildiz E. The effect of education given to Turkish adolescents with familial Mediterranean fever on anxiety, depression, and quality of life. Eur J Pediatr. 2023;182(7):3063–3073. PMID 37069356. doi:10.1007/s00431-023-04975-5. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1007/s00431-023-04975-5", "areas": ["G"], "unverified": false}, {"key": "Kallinich2007", "text": "Kallinich T, Haffner D, Niehues T, Huss K, Lainka E, Neudorf U, et al. Colchicine use in children and adolescents with familial Mediterranean fever: literature review and consensus statement. Pediatrics. 2007;119(2):e474–e483. PMID 17242135. doi:10.1542/peds.2006-1434.", "link": "https://doi.org/10.1542/peds.2006-1434", "areas": ["D"], "unverified": false}, {"key": "Karadag2013", "text": "Karadag O, Tufan A, Yazisiz V, et al. The factors considered as trigger for the attacks in patients with familial Mediterranean fever. Rheumatol Int. 2013;33:893-897. PMID 22814791; doi:10.1007/s00296-012-2453-x", "link": "https://doi.org/10.1007/s00296-012-2453-x", "areas": ["A", "E"], "unverified": false}, {"key": "Karadeniz2020", "text": "Karadeniz H, Güler AA, Atas N, et al. Tofacitinib for the treatment for colchicine-resistant familial Mediterranean fever: case-based review. Rheumatol Int. 2020;40(1):169-173. doi:10.1007/s00296-019-04490-7. PMID 31813060.", "link": "https://doi.org/10.1007/s00296-019-04490-7", "areas": ["F"], "unverified": false}, {"key": "KasAlay2026", "text": "Kaş Alay G, Mutlu B. The effect of a mobile game developed for children with familial Mediterranean fever on disease management and quality of life: a randomized controlled trial. Games Health J. 2026;15(3):144–154. PMID 41700777. doi:10.1177/2161783X251414694. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1177/2161783X251414694", "areas": ["G"], "unverified": false}, {"key": "Kasifoglu2014", "text": "Kasifoglu T, Bilge SY, Sari I, et al. Amyloidosis and its related factors in Turkish patients with familial Mediterranean fever: a multicentre study. Rheumatology (Oxford). 2014;53(4):741-745. PMID 24369413. DOI 10.1093/rheumatology/ket400.", "link": "https://doi.org/10.1093/rheumatology/ket400", "areas": ["E"], "unverified": false}, {"key": "Kayagaki2015", "text": "Kayagaki N, Stowe IB, Lee BL, O'Rourke K, et al., Dixit VM. Caspase-11 cleaves gasdermin D for non-canonical inflammasome signalling. Nature. 2015;526(7575):666-671. PMID: 26375259. DOI: 10.1038/nature15541", "link": "https://doi.org/10.1038/nature15541", "areas": ["C"], "unverified": false}, {"key": "Kees1997", "text": "Kees S, Langevitz P, Zemer D, Padeh S, Pras M, Livneh A. Attacks of pericarditis as a manifestation of familial Mediterranean fever (FMF). QJM. 1997;90:643-647. PMID 9415347; doi:10.1093/qjmed/90.10.643", "link": "https://doi.org/10.1093/qjmed/90.10.643", "areas": ["A", "G"], "unverified": false}, {"key": "Keven2004", "text": "Keven K, Sengul S, Kutlay S, Ekmekci Y, Anadol E, Nergizoglu G, Ates K, Erturk S, Erbay B. Long-term outcome of renal transplantation in patients with familial Mediterranean fever amyloidosis: a single-center experience. Transplant Proc. 2004;36(9):2632-2634. PMID 15621109. DOI 10.1016/j.transproceed.2004.09.065.", "link": "https://doi.org/10.1016/j.transproceed.2004.09.065", "areas": ["E"], "unverified": false}, {"key": "Khachatryan2008", "text": "Khachatryan ZA, Ktsoyan ZA, Manukyan GP, Kelly D, Ghazaryan KA, Aminov RI. Predominant role of host genetics in controlling the composition of gut microbiota. PLoS One. 2008;3(8):e3064. doi:10.1371/journal.pone.0003064. PMCID PMC2516932. (Note: often miscited as PNAS.)", "link": "https://doi.org/10.1371/journal.pone.0003064", "areas": ["F"], "unverified": false}, {"key": "KiactaPh3", "text": "Efficacy and safety study of KIACTA in preventing renal function decline in AA amyloidosis (confirmatory phase 3). ClinicalTrials.gov NCT01215747. https://clinicaltrials.gov/study/NCT01215747 ; top-line negative result reported by BELLUS Health, 2016: https://www.drugdiscoverytrends.com/bellus-health-phase-3-results-of-kiacta-for-aa-amyloidosis/", "link": "https://clinicaltrials.gov/study/NCT01215747", "areas": ["E"], "unverified": false}, {"key": "KineretPI", "text": "KINERET (anakinra) injection, solution, US prescribing information with Instructions for Use (Swedish Orphan Biovitrum). DailyMed setid d9d74915-6606-4570-9c52-c4001d3177de; current label version 10 Apr 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d9d74915-6606-4570-9c52-c4001d3177de (full label and IFU read).", "link": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d9d74915-6606-4570-9c52-c4001d3177de", "areas": ["G"], "unverified": false}, {"key": "Kishida2018", "text": "Koga T, Sato S, Miyamoto J, Hagimori N, Kawazoe Y, Arinaga K, Fukushima C, Yamamoto H, Kawakami A. Comparison of the efficacy and safety of tocilizumab for colchicine-resistant or colchicine-intolerant familial Mediterranean fever: study protocol for a randomised controlled trial. Trials. 2018;19:715. PMID 30594222. PMCID PMC6311086.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6311086/", "areas": ["F"], "unverified": false, "note": "Earlier entry attributed this to another group. The identifier was right; the authors were not."}, {"key": "Klimecki1994", "text": "Klimecki WT, Futscher BW, Grogan TM, Dalton WS. P-glycoprotein expression and function in circulating blood cells from normal volunteers. Blood. 1994;83(9):2451–2458. PMID 7513198. doi:10.1182/blood.V83.9.2451.2451.", "link": "https://doi.org/10.1182/blood.V83.9.2451.2451", "areas": ["D"], "unverified": false}, {"key": "Klughammer2023", "text": "Klughammer B, Piali L, Nica A, Nagel S, Bailey L, Jochum C, Ignatenko S, Blaeuer A, Danilin S, Gulati P, Hayward J, Scepanovic P, Zhang JD, Bhosale S, Chong CF, Christ A. Selnoflast (RO7486967) phase 1b study. Clin Transl Med. 2023;13(11):e1471. PMID 37962000. PMCID PMC10644327. doi:10.1002/ctm2.1471", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10644327/", "areas": ["F"], "unverified": false, "note": "Earlier entry gave the wrong journal."}, {"key": "KocThesis2016", "text": "CRISPR-Cas based genome editing system for the MEFV gene in FMF-specific iPSCs. MSc thesis, Koç University, 2016. Record: https://research.hub.ku.edu.tr/entities/publication/56915b7a-c244-4727-8484-f61ae8231d22/full (unverified — access restricted, no efficiency or rescue data available)", "link": "https://research.hub.ku.edu.tr/entities/publication/56915b7a-c244-4727-8484-f61ae8231d22/full", "areas": ["F"], "unverified": true, "note": "Institutional record is access-restricted. Turkey's national thesis centre (tez.yok.gov.tr) is the alternative place to look."}, {"key": "Koga2022", "text": "Koga T, Sato S, Hagimori N, Yamamoto H, Ishimura M, Yasumi T, Kirino Y, Ikeda K, Yachie A, Migita K, Kishida D, Atsumi T, Kawakami A. A randomised, double-blind, placebo-controlled phase III trial on the efficacy and safety of tocilizumab in patients with familial Mediterranean fever. Clin Exp Rheumatol. 2022;40(8):1535-1542. PMID 36106542. DOI 10.55563/clinexprheumatol/fgx9vv.", "link": "https://doi.org/10.55563/clinexprheumatol/fgx9vv", "areas": ["E"], "unverified": false}, {"key": "Kogan2001", "text": "Kogan A, Shinar Y, Lidar M, et al. Common MEFV mutations among Jewish ethnic groups in Israel: high frequency of carrier and phenotype III states and absence of a perceptible biological advantage for the carrier state. Am J Med Genet. 2001;102:272-276. PMID 11484206; doi:10.1002/ajmg.1438", "link": "https://doi.org/10.1002/ajmg.1438", "areas": ["A", "B"], "unverified": false}, {"key": "Kondi2010", "text": "Kondi A, Hentgen V, Piram M, Letierce A, Guillaume-Czitrom S, Koné-Paut I. Validation of the new paediatric criteria for the diagnosis of familial Mediterranean fever: data from a mixed population of 100 children from the French reference centre for auto-inflammatory disorders. Rheumatology (Oxford). 2010;49(11):2200–2203. PMID 20688806. doi:10.1093/rheumatology/keq252", "link": "https://doi.org/10.1093/rheumatology/keq252", "areas": ["B"], "unverified": false}, {"key": "Konukbay2016", "text": "Konukbay D, Gattorno M, Yildiz D, et al. A novel assessment tool for clinical care of patients with autoinflammatory disease: juvenile autoinflammatory disease multidimensional assessment report. Clin Exp Rheumatol. 2016;34(6 Suppl 102):129–135. PMID 27791950.", "link": "https://pubmed.ncbi.nlm.nih.gov/27791950/", "areas": ["G"], "unverified": false}, {"key": "Korkmaz2002", "text": "Korkmaz C, Ozdogan H, Kasapçopur O, Yazici H. Acute phase response in familial Mediterranean fever. Ann Rheum Dis. 2002;61(1):79–81. PMID 11779767. doi:10.1136/ard.61.1.79", "link": "https://doi.org/10.1136/ard.61.1.79", "areas": ["B", "G"], "unverified": false}, {"key": "Kosan2019", "text": "Koşan Z, Yılmaz S, Bilge Yerli E, Köyceğiz E. Evaluation of the burden of care and the quality of life in the parents of Turkish children with familial Mediterranean fever. J Pediatr Nurs. 2019;48:e21–e26. PMID 31176497. doi:10.1016/j.pedn.2019.05.017. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1016/j.pedn.2019.05.017", "areas": ["G"], "unverified": false}, {"key": "KuemmerleDeschner2017", "text": "Kuemmerle-Deschner JB, Ozen S, Tyrrell PN, et al. Diagnostic criteria for cryopyrin-associated periodic syndrome (CAPS). Ann Rheum Dis. 2017;76(6):942–947. PMID 27707729. doi:10.1136/annrheumdis-2016-209686", "link": "https://doi.org/10.1136/annrheumdis-2016-209686", "areas": ["B"], "unverified": false}, {"key": "Kukuy2021", "text": "Kukuy OL, Beckerman P, Dinour D, Ben-Zvi I, Livneh A. Amyloid storm: acute kidney injury and massive proteinuria, rapidly progressing to end-stage kidney disease in AA amyloidosis of familial Mediterranean fever. Rheumatology (Oxford). 2021;60(7):3235-3242. PMID 33291151. DOI 10.1093/rheumatology/keaa772.", "link": "https://doi.org/10.1093/rheumatology/keaa772", "areas": ["E", "G"], "unverified": false}, {"key": "Kuncl1987", "text": "Kuncl RW, Duncan G, Watson D, Alderson K, Rogawski MA, Peper M. Colchicine myopathy and neuropathy. N Engl J Med. 1987;316(25):1562–1568. PMID 3035372. doi:10.1056/NEJM198706183162502.", "link": "https://doi.org/10.1056/NEJM198706183162502", "areas": ["D"], "unverified": false}, {"key": "Lachmann2006", "text": "Lachmann HJ, Sengül B, Yavuzşen TU, et al. Clinical and subclinical inflammation in patients with familial Mediterranean fever and in heterozygous carriers of MEFV mutations. Rheumatology (Oxford). 2006;45:746-750. PMID 16403826; doi:10.1093/rheumatology/kei279", "link": "https://doi.org/10.1093/rheumatology/kei279", "areas": ["A", "B", "D", "G"], "unverified": false}, {"key": "Lachmann2007", "text": "Lachmann HJ, Goodman HJ, Gilbertson JA, Gallimore JR, Sabin CA, Gillmore JD, Hawkins PN. Natural history and outcome in systemic AA amyloidosis. N Engl J Med. 2007;356(23):2361–2371. PMID 17554117. doi:10.1056/NEJMoa070265.", "link": "https://doi.org/10.1056/NEJMoa070265", "areas": ["D", "E"], "unverified": false}, {"key": "Lachmann2014", "text": "Lachmann HJ, Papa R, Gerhold K, et al. The phenotype of TNF receptor-associated autoinflammatory syndrome (TRAPS) at presentation: a series of 158 cases from the Eurofever/EUROTRAPS international registry. Ann Rheum Dis. 2014;73(12):2160–2167. PMID 23965844. doi:10.1136/annrheumdis-2013-204184", "link": "https://doi.org/10.1136/annrheumdis-2013-204184", "areas": ["B"], "unverified": false}, {"key": "Lachmann2017", "text": "Lachmann HJ. Periodic fever syndromes. Best Pract Res Clin Rheumatol. 2017;31(4):596–609. PMID 29773275. doi:10.1016/j.berh.2017.12.001. Only the abstract was read; the CAPS attack-length details are standard teaching and were not checked against the full text.", "link": "https://doi.org/10.1016/j.berh.2017.12.001", "areas": ["B"], "unverified": false}, {"key": "Lancieri2023", "text": "Lancieri M, Bustaffa M, Palmeri S, et al. An update on familial Mediterranean fever. Int J Mol Sci. 2023;24(11):9584. PMID 37298536. doi:10.3390/ijms24119584. PMC10253709", "link": "https://doi.org/10.3390/ijms24119584", "areas": ["B"], "unverified": false}, {"key": "Langevitz1994", "text": "Langevitz P, Zemer D, Livneh A, Shemer J, Pras M. Protracted febrile myalgia in patients with familial Mediterranean fever. J Rheumatol. 1994;21:1708-1709. PMID 7799354", "link": "https://pubmed.ncbi.nlm.nih.gov/7799354/", "areas": ["A", "G"], "unverified": false}, {"key": "Leung2015", "text": "Leung YY, Yao Hui LL, Kraus VB. Colchicine—update on mechanisms of action and therapeutic uses. Semin Arthritis Rheum. 2015;45(3):341–350. PMID 26228647. PMCID PMC4656054. doi:10.1016/j.semarthrit.2015.06.013.", "link": "https://doi.org/10.1016/j.semarthrit.2015.06.013", "areas": ["D"], "unverified": false}, {"key": "Levinsky2023", "text": "Levinsky Y, Azani L, Shkalim Zemer V, Chodick G, Tal R, Harel L, Amarilyo G. Adherence to colchicine prophylaxis among patients with familial Mediterranean fever treated with interleukin-1 inhibitors. Semin Arthritis Rheum. 2023;61:152211. PMID 37201215. doi:10.1016/j.semarthrit.2023.152211.", "link": "https://doi.org/10.1016/j.semarthrit.2023.152211", "areas": ["G"], "unverified": false}, {"key": "Lidar2006", "text": "Lidar M, Yaqubov M, Zaks N, Ben-Horin S, Langevitz P, Livneh A. The prodrome: a prominent yet overlooked pre-attack manifestation of familial Mediterranean fever. J Rheumatol. 2006;33:1089-1092. PMID 16755655", "link": "https://pubmed.ncbi.nlm.nih.gov/16755655/", "areas": ["A"], "unverified": false}, {"key": "Lidar2008", "text": "Lidar M, Doron A, Kedem R, Yosepovich A, Langevitz P, Livneh A. Appendectomy in familial Mediterranean fever: clinical, genetic and pathological findings. Clin Exp Rheumatol. 2008;26(4):568–573. PMID 18799086.", "link": "https://pubmed.ncbi.nlm.nih.gov/18799086/", "areas": ["B", "G"], "unverified": false}, {"key": "Lidor2021", "text": "Lidor I, Tiosano S, Sharif K, Amital H, Cohen AD, Amital D. The risk of depression and anxiety in patients with familial Mediterranean fever: a cross-sectional study. J Affect Disord. 2021;292:695-699. PMID 34157665. DOI 10.1016/j.jad.2021.05.113.", "link": "https://doi.org/10.1016/j.jad.2021.05.113", "areas": ["E"], "unverified": false}, {"key": "LitGap-Baricitinib", "text": "Literature gap: PubMed/web searches for baricitinib in FMF return only secondary mentions alongside tofacitinib; no dedicated case report or series located as of October 2026.", "link": "", "areas": ["F"], "unverified": false}, {"key": "LitGap-Editing", "text": "Literature gap: no published preclinical or clinical base-editing, prime-editing or CRISPR-correction study of MEFV in human hematopoietic stem cells located as of October 2026.", "link": "", "areas": ["F"], "unverified": false}, {"key": "LitGap-GSDMD", "text": "Literature gap: no published trial or case series of disulfiram, dimethyl fumarate, necrosulfonamide or any other GSDMD inhibitor in FMF as of October 2026.", "link": "", "areas": ["F"], "unverified": false}, {"key": "LitGap-RNA", "text": "Literature gap: no siRNA, ASO or RNA-editing therapeutic candidate against MEFV/pyrin located in the literature or in ClinicalTrials.gov as of October 2026; commercial MEFV siRNAs are research reagents.", "link": "", "areas": ["F"], "unverified": false}, {"key": "LitGap-SmallMolecule", "text": "Literature gap: no pyrin-selective small-molecule inhibitor, PKN-activator drug candidate, or 14-3-3/pyrin stabilizer reported; searches return NLRP3 (pyrin-domain) chemistry instead.", "link": "", "areas": ["F"], "unverified": false}, {"key": "Liu2016", "text": "Liu X, Zhang Z, Ruan J, Pan Y, Magupalli VG, Wu H, Lieberman J. Inflammasome-activated gasdermin D causes pyroptosis by forming membrane pores. Nature. 2016;535(7610):153-158. PMID: 27383986. DOI: 10.1038/nature18629", "link": "https://doi.org/10.1038/nature18629", "areas": ["C"], "unverified": false}, {"key": "Livneh1994", "text": "Livneh A, Zemer D, Langevitz P, Laor A, Sohar E, Pras M. Colchicine treatment of AA amyloidosis of familial Mediterranean fever. An analysis of factors affecting outcome. Arthritis Rheum. 1994;37(12):1804–1811. PMID 7986228. doi:10.1002/art.1780371215.", "link": "https://doi.org/10.1002/art.1780371215", "areas": ["D"], "unverified": false}, {"key": "Livneh1997", "text": "Livneh A, Langevitz P, Zemer D, et al. Criteria for the diagnosis of familial Mediterranean fever. Arthritis Rheum. 1997;40:1879-1885. PMID 9336425; doi:10.1002/art.1780401023", "link": "https://doi.org/10.1002/art.1780401023", "areas": ["A", "B", "G"], "unverified": false}, {"key": "Lu2014", "text": "Lu A, Magupalli VG, Ruan J, Yin Q, Atianand MK, Vos MR, Schroder GF, Fitzgerald KA, Wu H, Egelman EH. Unified polymerization mechanism for the assembly of ASC-dependent inflammasomes. Cell. 2014;156(6):1193-1206. PMID: 24630722. DOI: 10.1016/j.cell.2014.02.008", "link": "https://doi.org/10.1016/j.cell.2014.02.008", "areas": ["C"], "unverified": false}, {"key": "Maaser2019", "text": "Maaser C, Sturm A, Vavricka SR, et al. ECCO-ESGAR Guideline for Diagnostic Assessment in IBD Part 1: initial diagnosis, monitoring of known IBD, detection of complications. J Crohns Colitis. 2019;13(2):144–164. PMID 30137275. doi:10.1093/ecco-jcc/jjy113", "link": "https://doi.org/10.1093/ecco-jcc/jjy113", "areas": ["B"], "unverified": false}, {"key": "Magnotti2019", "text": "Magnotti F, Lefeuvre L, Benezech S, Malsot T, et al., Henry T. Pyrin dephosphorylation is sufficient to trigger inflammasome activation in familial Mediterranean fever patients. EMBO Molecular Medicine. 2019;11(11):e10547. PMID: 31589380. DOI: 10.15252/emmm.201910547", "link": "https://doi.org/10.15252/emmm.201910547", "areas": ["C"], "unverified": false}, {"key": "Magnotti2022", "text": "Magnotti F, Chirita D, Dalmon S, Martin A, et al., Henry T. Steroid hormone catabolites activate the pyrin inflammasome through a non-canonical mechanism. Cell Reports. 2022;41(2):111472. PMID: 36223753. DOI: 10.1016/j.celrep.2022.111472", "link": "https://doi.org/10.1016/j.celrep.2022.111472", "areas": ["C"], "unverified": false}, {"key": "Majeed2000", "text": "Majeed HA, Ghandour K, Shahin HM. The acute scrotum in Arab children with familial Mediterranean fever. Pediatr Surg Int. 2000;16:72-74. PMID 10663841; doi:10.1007/s003830050019", "link": "https://doi.org/10.1007/s003830050019", "areas": ["A", "G"], "unverified": false}, {"key": "Makay2009", "text": "Makay B, Unsal E, Arslan N, Varni JW. Health-related quality of life of school-age children with familial Mediterranean fever. Clin Exp Rheumatol. 2009;27(2 Suppl 53):S96-S101. PMID 19796543.", "link": "https://pubmed.ncbi.nlm.nih.gov/19796543/", "areas": ["E"], "unverified": false}, {"key": "Mansfield2001", "text": "Mansfield E, Chae JJ, Komarow HD, Brotz TM, Frucht DM, Aksentijevich I, Kastner DL. The familial Mediterranean fever protein, pyrin, associates with microtubules and colocalizes with actin filaments. Blood. 2001;98(3):851-859. PMID: 11468188. DOI: 10.1182/blood.V98.3.851", "link": "https://doi.org/10.1182/blood.V98.3.851", "areas": ["C"], "unverified": false}, {"key": "Mansueto2022", "text": "Mansueto P, Seidita A, Chiavetta M, Genovese D, Giuliano A, Priano W, Carroccio A, Casuccio A, Amodio E. Familial Mediterranean fever and diet: a narrative review of the scientific literature. Nutrients. 2022;14(15):3216. PMID 35956392. DOI 10.3390/nu14153216.", "link": "https://doi.org/10.3390/nu14153216", "areas": ["E"], "unverified": false}, {"key": "MarekYagel2009", "text": "Marek-Yagel D, Berkun Y, Padeh S, et al. Clinical disease among patients heterozygous for familial Mediterranean fever. Arthritis Rheum. 2009;60(6):1862–1866. PMID 19479871. doi:10.1002/art.24570", "link": "https://doi.org/10.1002/art.24570", "areas": ["B"], "unverified": false}, {"key": "Masters2016", "text": "Masters SL, Lagou V, Jéru I, et al. Familial autoinflammation with neutrophilic dermatosis reveals a regulatory mechanism of pyrin activation. Sci Transl Med. 2016;8(332):332ra45. PMID 27030597. doi:10.1126/scitranslmed.aaf1471", "link": "https://doi.org/10.1126/scitranslmed.aaf1471", "areas": ["B", "C"], "unverified": false}, {"key": "MEFVsiRNA2014", "text": "siRNA-mediated MEFV silencing in THP-1 monocytic cells: transcriptome and microRNA effects. EULAR 2014 abstract. Ann Rheum Dis. 2014;73(Suppl 2):344. https://ard.bmj.com/content/73/Suppl_2/344.4 ; related pyrin/IRF2 abstract PMCID PMC3952637. (conference abstracts; authors unverified)", "link": "https://ard.bmj.com/content/73/Suppl_2/344.4", "areas": ["F"], "unverified": true, "note": "EULAR conference abstract in an Annals of the Rheumatic Diseases supplement. Such supplements are not indexed individually, so no alternative location exists. Treat as a conference abstract, not a peer-reviewed result."}, {"key": "Melikoglu2000", "text": "Melikoğlu M, Ozdoğan H, Korkmaz C, et al. A survey of phenotype II in familial Mediterranean fever. Ann Rheum Dis. 2000;59(11):910–913. PMID 11053071. doi:10.1136/ard.59.11.910", "link": "https://doi.org/10.1136/ard.59.11.910", "areas": ["B", "E"], "unverified": false}, {"key": "Mertz2025", "text": "Mertz P, Hentgen V, Georgin-Lavialle S. Could tocilizumab be used in familial Mediterranean fever? A systematic review. Rheumatology (Oxford). 2025;64(1):12-21. PMID 38950176. DOI 10.1093/rheumatology/keae338.", "link": "https://doi.org/10.1093/rheumatology/keae338", "areas": ["E"], "unverified": false}, {"key": "Migita2012", "text": "Migita K, Uehara R, Nakamura Y, et al. Familial Mediterranean fever in Japan. Medicine (Baltimore). 2012;91:337-343. PMID 23111802; doi:10.1097/MD.0b013e318277cf75", "link": "https://doi.org/10.1097/MD.0b013e318277cf75", "areas": ["A"], "unverified": false}, {"key": "Migita2016", "text": "Migita K, Izumi Y, Jiuchi Y, et al. Familial Mediterranean fever is no longer a rare disease in Japan. Arthritis Res Ther. 2016;18:175. PMID 27473114; PMCID PMC4967332; doi:10.1186/s13075-016-1071-5", "link": "https://doi.org/10.1186/s13075-016-1071-5", "areas": ["A"], "unverified": false}, {"key": "Milhavet2008", "text": "Milhavet F, Cuisset L, Hoffman HM, et al. The infevers autoinflammatory mutation online registry: update with new genes and functions. Hum Mutat. 2008;29:803-808. PMID 18409191; doi:10.1002/humu.20720", "link": "https://doi.org/10.1002/humu.20720", "areas": ["A", "B"], "unverified": false}, {"key": "Milledge2002", "text": "Milledge J, Shaw PJ, Mansour A, Williamson S, Bennetts B, Roscioli T, Curtin J, Christodoulou J. Allogeneic bone marrow transplantation: cure for familial Mediterranean fever. Blood. 2002;100(3):774-777. doi:10.1182/blood-2002-02-0651. PMID 12130485. (Note: Blood, not The Lancet.)", "link": "https://doi.org/10.1182/blood-2002-02-0651", "areas": ["F"], "unverified": false}, {"key": "Mirioglu2024", "text": "Mirioglu S, Uludag O, Hurdogan O, Kumru G, Berke I, Doumas SA, Frangou E, Gul A. AA amyloidosis: a contemporary view. Curr Rheumatol Rep. 2024;26(7):248-259. PMID 38568326. PMCID PMC11219434. DOI 10.1007/s11926-024-01147-8.", "link": "https://doi.org/10.1007/s11926-024-01147-8", "areas": ["E"], "unverified": false}, {"key": "Misawa2013", "text": "Misawa T, Takahama M, Kozaki T, Lee H, Zou J, Saitoh T, Akira S. Microtubule-driven spatial arrangement of mitochondria promotes activation of the NLRP3 inflammasome. Nat Immunol. 2013;14(5):454–460. PMID 23502856. doi:10.1038/ni.2550.", "link": "https://doi.org/10.1038/ni.2550", "areas": ["D"], "unverified": false}, {"key": "Moghaddas2017", "text": "Moghaddas F, Llamas R, De Nardo D, Martinez-Banaclocha H, et al., Masters SL. A novel Pyrin-Associated Autoinflammation with Neutrophilic Dermatosis mutation further defines 14-3-3 binding of pyrin and distinction to Familial Mediterranean Fever. Annals of the Rheumatic Diseases. 2017;76(12):2085-2094. PMID: 28835462. DOI: 10.1136/annrheumdis-2017-211473", "link": "https://doi.org/10.1136/annrheumdis-2017-211473", "areas": ["C"], "unverified": false}, {"key": "Nakagawa2021", "text": "Mori T, Saburi M, Hagihara M, Mori M, Yamazaki R, Kato J. Long-term remission of cryopyrin-associated periodic syndrome after allogeneic haematopoietic stem cell transplantation. Ann Rheum Dis. 2021;80(4):542-543. PMID 33158880. doi:10.1136/annrheumdis-2020-218695", "link": "https://pubmed.ncbi.nlm.nih.gov/33158880/", "areas": ["F"], "unverified": false, "note": "Earlier entry misdescribed this as a review stating no CAPS patient had been transplanted. It is a case report of long-term remission after transplantation."}, {"key": "NCT00582907", "text": "Rilonacept for treatment of familial Mediterranean fever. https://clinicaltrials.gov/study/NCT00582907", "link": "https://clinicaltrials.gov/study/NCT00582907", "areas": ["F"], "unverified": false}, {"key": "NCT01705756", "text": "Kineret (anakinra) in adult patients with colchicine-resistant FMF. https://clinicaltrials.gov/study/NCT01705756", "link": "https://clinicaltrials.gov/study/NCT01705756", "areas": ["F"], "unverified": false}, {"key": "NCT03113760", "text": "Therapeutic use of tadekinig alfa in NLRC4 mutation and XIAP deficiency (randomized withdrawal; completed 2023). https://clinicaltrials.gov/study/NCT03113760", "link": "https://clinicaltrials.gov/study/NCT03113760", "areas": ["F"], "unverified": false}, {"key": "NCT03446209", "text": "Tocilizumab for the treatment of familial Mediterranean fever (TOFFIFE). https://clinicaltrials.gov/study/NCT03446209", "link": "https://clinicaltrials.gov/study/NCT03446209", "areas": ["F"], "unverified": false}, {"key": "NCT03512314", "text": "Tadekinig alfa open-label extension. https://classic.clinicaltrials.gov/ct2/show/NCT03512314", "link": "https://classic.clinicaltrials.gov/ct2/show/NCT03512314", "areas": ["F"], "unverified": false}, {"key": "NCT04478409", "text": "Functional test for familial Mediterranean fever screening - 2 (recruiting, start 2021). https://clinicaltrials.gov/study/NCT04478409", "link": "https://clinicaltrials.gov/study/NCT04478409", "areas": ["F"], "unverified": false}, {"key": "NCT04868968", "text": "Safety, tolerability and efficacy of DFV890 in familial cold autoinflammatory syndrome (Phase 2, completed). https://clinicaltrials.gov/study/NCT04868968", "link": "https://clinicaltrials.gov/study/NCT04868968", "areas": ["F"], "unverified": false, "note": "Recorded in the registry as COMPLETED, with an actual enrolment of 4 participants."}, {"key": "NCT05092776", "text": "Efficacy and safety of RPH-104 (goflikicept) for resolution and prevention of recurring attacks in adults with colchicine-resistant/intolerant FMF. https://clinicaltrials.gov/study/NCT05092776", "link": "https://clinicaltrials.gov/study/NCT05092776", "areas": ["F"], "unverified": false}, {"key": "NCT05190991", "text": "Safety and efficacy of RPH-104 to prevent recurrent fever attacks in colchicine-resistant/intolerant FMF (Phase 2 open-label extension). https://clinicaltrials.gov/study/NCT05190991", "link": "https://clinicaltrials.gov/study/NCT05190991", "areas": ["F"], "unverified": false}, {"key": "NCT05456880", "text": "BEACON: BEAM-101 in severe sickle cell disease. https://clinicaltrials.gov/study/NCT05456880", "link": "https://clinicaltrials.gov/study/NCT05456880", "areas": ["F"], "unverified": false}, {"key": "NCT06285539", "text": "Drug rediscovery for rare immune-mediated inflammatory diseases (filgotinib, Phase 2). https://clinicaltrials.gov/study/NCT06285539", "link": "https://clinicaltrials.gov/study/NCT06285539", "areas": ["F"], "unverified": false}, {"key": "NCT06336733", "text": "On-demand anakinra for painful attacks in colchicine-resistant FMF (Phase 3, start June 2024). https://clinicaltrials.gov/study/NCT06336733", "link": "https://clinicaltrials.gov/study/NCT06336733", "areas": ["F"], "unverified": false}, {"key": "NOMID-UCBT2023", "text": "Zhao C, Liu C, Li X. Umbilical cord blood transplantation for neonatal-onset multisystem inflammatory disease (NOMID). Front Immunol. 2023;14:1291345. PMID 38250066. PMCID PMC10799342. Open access.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10799342/", "areas": ["F"], "unverified": false}, {"key": "Nunes2021", "text": "Espinoza JL, Kamio K, Lam VQ, Takami A. The Impact of NLRP3 Activation on Hematopoietic Stem Cell Transplantation. Int J Mol Sci. 2021;22(21):11845. PMID 34769275. PMCID PMC8584591. doi:10.3390/ijms222111845", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8584591/", "areas": ["F"], "unverified": false, "note": "Earlier entry named the wrong first author."}, {"key": "Onen2004", "text": "Onen F, Sumer H, Turkay S, Akyurek O, Tunca M, Ozdogan H. Increased frequency of familial Mediterranean fever in Central Anatolia, Turkey. Clin Exp Rheumatol. 2004;22(4 Suppl 34):S31-33. PMID 15515780", "link": "https://pubmed.ncbi.nlm.nih.gov/15515780/", "areas": ["A"], "unverified": false}, {"key": "Ozdemir2021", "text": "Özdemir Atmaca FM, Gülez N, Makay B. Evaluation of the international severity score for FMF (ISSF) scores in Turkish children diagnosed with FMF: a single-center experience. Clin Rheumatol. 2021;40(8):3219–3225. PMID 33619627. doi:10.1007/s10067-021-05652-4. (Abstract read; the first author's given names should be confirmed against the journal page before publishing.)", "link": "https://doi.org/10.1007/s10067-021-05652-4", "areas": ["G"], "unverified": false}, {"key": "Ozen1998", "text": "Ozen S, Karaaslan Y, Ozdemir O, et al. Prevalence of juvenile chronic arthritis and familial Mediterranean fever in Turkey: a field study. J Rheumatol. 1998;25:2445-2449. PMID 9858443", "link": "https://pubmed.ncbi.nlm.nih.gov/9858443/", "areas": ["A"], "unverified": false}, {"key": "Ozen2014", "text": "Ozen S, Demirkaya E, Duzova A, Erdogan O, Erken E, Gul A, Kasapcopur O, et al. FMF50: a score for assessing outcome in familial Mediterranean fever. Ann Rheum Dis. 2014;73(5):897–901. PMID 24570027. doi:10.1136/annrheumdis-2013-204719.", "link": "https://doi.org/10.1136/annrheumdis-2013-204719", "areas": ["D", "G"], "unverified": false}, {"key": "Ozen2016", "text": "Ozen S, Demirkaya E, Erer B, et al. EULAR recommendations for the management of familial Mediterranean fever. Ann Rheum Dis. 2016;75(4):644–651. PMID 26802180. doi:10.1136/annrheumdis-2015-208690", "link": "https://doi.org/10.1136/annrheumdis-2015-208690", "areas": ["B", "D", "E", "F", "G"], "unverified": false}, {"key": "Ozen2017", "text": "Özen S, Batu ED, Demir S. Familial Mediterranean fever: recent developments in pathogenesis and new recommendations for management. Front Immunol. 2017;8:253. doi:10.3389/fimmu.2017.00253. PMC5362626", "link": "https://doi.org/10.3389/fimmu.2017.00253", "areas": ["B", "D", "G"], "unverified": false}, {"key": "Ozen2020", "text": "Ozen S, Ben-Chetrit E, Foeldvari I, Amarilyo G, Ozdogan H, Vanderschueren S, Marzan K, Kahlenberg JM, Dekker E, De Benedetti F, Kone-Paut I. Long-term efficacy and safety of canakinumab in patients with colchicine-resistant familial Mediterranean fever: results from the randomised phase III CLUSTER trial. Ann Rheum Dis. 2020;79(10):1362-1369. PMID 32571870. PMCID PMC7509527. Open access. doi:10.1136/annrheumdis-2020-217419", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7509527/", "areas": ["F"], "unverified": false}, {"key": "Ozen2021", "text": "Özen S, Sag E, Ben-Chetrit E, Gattorno M, Gül A, Hashkes PJ, Kone-Paut I, Lachmann HJ, Tsitsami E, Twilt M, et al. Defining colchicine resistance/intolerance in patients with familial Mediterranean fever: a modified-Delphi consensus approach. Rheumatology (Oxford). 2021;60(8):3799–3808. PMID 33331943. doi:10.1093/rheumatology/keaa863.", "link": "https://doi.org/10.1093/rheumatology/keaa863", "areas": ["D", "E", "G"], "unverified": false}, {"key": "Ozen2025", "text": "Ozen S, Sağ E, Oton T, Gül A, Sieiro Santos C, Bayraktar D, Proft FN, Lachmann HJ, Kuemmerle Deschner J, Gattorno M, et al., Carmona L. EULAR/PReS endorsed recommendations for the management of familial Mediterranean fever (FMF): 2024 update. Ann Rheum Dis. 2025;84(6):899–909. PMID 40234174. doi:10.1016/j.ard.2025.01.028. (Abstract read; full text not opened.)", "link": "https://doi.org/10.1016/j.ard.2025.01.028", "areas": ["D", "E", "G", "F"], "unverified": false, "aliases": ["EULAR2025"], "note": "Full typeset text read for the nursing research pass, so recommendation numbers, evidence levels and agreement figures quoted in this app come from the article itself rather than its abstract. Its two supplementary tables were not read."}, {"key": "Ozkurt2025", "text": "Özkurt S, Cansu DÜ, Yildirim U, Yaldir E, Yalçin AU, Korkmaz C. From ulcerative colitis to amyloid storm: a case-based review. Rheumatol Int. 2025;45(11):263. PMID 41165831. doi:10.1007/s00296-025-06015-x.", "link": "https://doi.org/10.1007/s00296-025-06015-x", "areas": ["G"], "unverified": false}, {"key": "Ozturk2022", "text": "Öztürk K, Coşkuner T, Baglan E, Sönmez HE, Yener GO, et al. Real-life data from the largest pediatric familial Mediterranean fever cohort. Front Pediatr. 2022;9:805919. DOI 10.3389/fped.2021.805919.", "link": "https://doi.org/10.3389/fped.2021.805919", "areas": ["E", "G"], "unverified": false}, {"key": "Papadopoulos2008", "text": "Papadopoulos VP, Giaglis S, Mitroulis I, Ritis K. The population genetics of familial Mediterranean fever: a meta-analysis study. Ann Hum Genet. 2008;72:752-761. PMID 18691160; doi:10.1111/j.1469-1809.2008.00471.x", "link": "https://doi.org/10.1111/j.1469-1809.2008.00471.x", "areas": ["A"], "unverified": false}, {"key": "Park2016", "text": "Park YH, Wood G, Kastner DL, Chae JJ. Pyrin inflammasome activation and RhoA signaling in the autoinflammatory diseases FMF and HIDS. Nat Immunol. 2016;17:914-921. PMID 27270401; PMCID PMC4955684; doi:10.1038/ni.3457", "link": "https://doi.org/10.1038/ni.3457", "areas": ["A", "B", "C", "D", "F"], "unverified": false}, {"key": "Park2020", "text": "Park YH, Remmers EF, Lee W, et al. Ancient familial Mediterranean fever mutations in human pyrin and resistance to Yersinia pestis. Nat Immunol. 2020;21:857-867. PMID 32601469; PMCID PMC7381377; doi:10.1038/s41590-020-0705-6", "link": "https://doi.org/10.1038/s41590-020-0705-6", "areas": ["A"], "unverified": false}, {"key": "Parlar2024", "text": "Parlar K, Ates MB, Onal ME, et al. Factors triggering familial Mediterranean fever attacks, do they really exist? Intern Emerg Med. 2024;19:1007-1013. PMID 38488998; PMCID PMC11186929; doi:10.1007/s11739-024-03576-w", "link": "https://doi.org/10.1007/s11739-024-03576-w", "areas": ["A", "E"], "unverified": false}, {"key": "Piram2011", "text": "Piram M, Frenkel J, Gattorno M, Ozen S, Lachmann HJ, Goldbach-Mansky R, et al. A preliminary score for the assessment of disease activity in hereditary recurrent fevers: results from the AIDAI (Auto-Inflammatory Diseases Activity Index) Consensus Conference. Ann Rheum Dis. 2011;70(2):309–314. PMID 21081528. doi:10.1136/ard.2010.132613.", "link": "https://doi.org/10.1136/ard.2010.132613", "areas": ["G"], "unverified": false}, {"key": "Piram2014", "text": "Piram M, Koné-Paut I, Lachmann HJ, Frenkel J, Ozen S, Kuemmerle-Deschner J, et al. Validation of the auto-inflammatory diseases activity index (AIDAI) for hereditary recurrent fever syndromes. Ann Rheum Dis. 2014;73(12):2168–2173. PMID 24026675. doi:10.1136/annrheumdis-2013-203666.", "link": "https://doi.org/10.1136/annrheumdis-2013-203666", "areas": ["G"], "unverified": false}, {"key": "Piskin2022", "text": "Piskin D, Arici ZS, Konukbay D, et al. Number of episodes can be used as a disease activity measure in familial Mediterranean fever. Front Pediatr. 2022;10:822473. PMID 35573940. PMCID PMC9091585. doi:10.3389/fped.2022.822473.", "link": "https://doi.org/10.3389/fped.2022.822473", "areas": ["G"], "unverified": false}, {"key": "Polat2016", "text": "Polat A, Acikel C, Sozeri B, Dursun I, Kasapcopur O, Gulez N, Simsek D, Saldir M, et al. Comparison of the efficacy of once- and twice-daily colchicine dosage in pediatric patients with familial Mediterranean fever—a randomized controlled noninferiority trial. Arthritis Res Ther. 2016;18:85. PMID 27055417. PMCID PMC4823910. doi:10.1186/s13075-016-0980-7.", "link": "https://doi.org/10.1186/s13075-016-0980-7", "areas": ["D"], "unverified": false}, {"key": "Pras1992", "text": "Pras E, Aksentijevich I, Gruberg L, et al. Mapping of a gene causing familial Mediterranean fever to the short arm of chromosome 16. N Engl J Med. 1992;326:1509-1513. PMID 1579134; doi:10.1056/NEJM199206043262301", "link": "https://doi.org/10.1056/NEJM199206043262301", "areas": ["A"], "unverified": false}, {"key": "Pras1998", "text": "Pras M. Familial Mediterranean fever: from the clinical syndrome to the cloning of the pyrin gene. Scand J Rheumatol. 1998;27:92-97. PMID 9572633; doi:10.1080/030097498440949", "link": "https://doi.org/10.1080/030097498440949", "areas": ["A", "B"], "unverified": false}, {"key": "PRINTO2016G", "text": "PRINTO/PReS. Familial Mediterranean Fever – information for patients and families. IRCCS Istituto G. Gaslini / Università di Genova. https://www.printo.it/pediatric-rheumatology/GB/info/20/Familial-Mediterranean-Fever (patient-education source; no named authors; page read in full for this file).", "link": "https://www.printo.it/pediatric-rheumatology/GB/info/20/Familial-Mediterranean-Fever", "areas": ["G", "A"], "unverified": false, "aliases": ["PRINTO2016"]}, {"key": "ProcalcitoninFMF", "text": "Procalcitonin in FMF attacks — two conflicting Turkish studies, neither full text read (unverified): (a) Yüksel S, et al. The value of procalcitonin measurements in children with familial Mediterranean fever. Rheumatol Int. 2012;32(11):3443–3447. doi:10.1007/s00296-011-2206-2 (median procalcitonin 0.044 ng/mL during attacks vs 0.028 ng/mL attack-free); (b) an Ankara University study evaluating procalcitonin and factor VIII as acute-phase markers in FMF, concluding they cannot be used diagnostically during attacks, published in Turkish and indexed at https://dergiler.ankara.edu.tr/items/7e676fc8-9301-4ccb-a2ca-c757a1d4e35a. Cohorts, assays and cut-offs must be checked before either figure is published.", "link": "https://dergiler.ankara.edu.tr/items/7e676fc8-9301-4ccb-a2ca-c757a1d4e35a", "areas": ["G"], "unverified": true}, {"key": "PubMedSweep2026", "text": "PubMed query `\"familial Mediterranean fever\" AND (\"stem cell transplantation\" OR \"bone marrow transplantation\")`, 22 results, retrieved 16 October 2026; only [Milledge2002] reports allogeneic HSCT in an FMF patient.", "link": "", "areas": ["F"], "unverified": false}, {"key": "PubMedSweepNursing2026", "text": "Own literature sweep for this file, October 2026: PubMed query \"familial Mediterranean fever\" AND (nursing OR nurse), all years, 25 records, of which several use \"nursing\" in the breastfeeding sense (https://pubmed.ncbi.nlm.nih.gov/?term=%22familial+Mediterranean+fever%22+AND+(nursing+OR+nurse)); plus targeted searches for FMF with nurse-led education, adherence interventions, teach-back and motivational interviewing. Documents the absence of a nursing clinical practice guideline for FMF, of a nurse-led adherence trial, and of FMF-specific teach-back or motivational-interviewing studies. A negative search result, not a publication.", "link": "https://pubmed.ncbi.nlm.nih.gov/?term=%22familial+Mediterranean+fever%22+AND+(nursing+OR+nurse", "areas": ["G"], "unverified": false}, {"key": "Rathkey2018", "text": "Rathkey JK, Zhao J, Liu Z, Chen Y, Yang J, Kondolf HC, Benson BL, Chirieleison SM, Huang AY, Dubyak GR, Xiao TS, Li X, Abbott DW. Chemical disruption of the pyroptotic pore-forming protein gasdermin D inhibits inflammatory cell death and sepsis. Sci Immunol. 2018;3(26):eaat2738. PMID 30143556. PMCID PMC6462819.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6462819/", "areas": ["F"], "unverified": false}, {"key": "Reimann1948", "text": "Reimann HA. Periodic disease; a probable syndrome including periodic fever, benign paroxysmal peritonitis, cyclic neutropenia and intermittent arthralgia. JAMA. 1948;136:239-244. PMID 18920089; doi:10.1001/jama.1948.02890210023004", "link": "https://doi.org/10.1001/jama.1948.02890210023004", "areas": ["A"], "unverified": false}, {"key": "RheumNow2025", "text": "RheumNow. 2024 management familial Mediterranean fever recommendations (summary of the EULAR/PReS 2024 update). https://rheumnow.com/news/2024-management-familial-mediterranean-fever-recommendations (Secondary source.)", "link": "https://rheumnow.com/news/2024-management-familial-mediterranean-fever-recommendations", "areas": ["E"], "unverified": false}, {"key": "Richards2001", "text": "Richards N, Schaner P, Diaz A, Stuckey J, Shelden E, Wadhwa A, Gumucio DL. Interaction between pyrin and the apoptotic speck protein (ASC) modulates ASC-induced apoptosis. Journal of Biological Chemistry. 2001;276(42):39320-39329. PMID: 11498534. DOI: 10.1074/jbc.M104730200", "link": "https://doi.org/10.1074/jbc.M104730200", "areas": ["C"], "unverified": false}, {"key": "Ritschl2021", "text": "Ritschl V, Stamm TA, Aletaha D, Bijlsma JWJ, Böhm P, Dragoi RG, Dures E, Estévez-López F, Gossec L, Iagnocco A, Marques A, Moholt E, Nudel M, van den Bemt BJF, Viktil K, Voshaar M, de Thurah A, Carmona L. 2020 EULAR points to consider for the prevention, screening, assessment and management of non-adherence to treatment in people with rheumatic and musculoskeletal diseases for use in clinical practice. Ann Rheum Dis. 2021;80(6):707–713. PMID 33355152. doi:10.1136/annrheumdis-2020-218986. (Abstract read plus a secondary summary of the four-phase scheme; the wording of the four overarching principles and the nine individual points to consider was not read.)", "link": "https://doi.org/10.1136/annrheumdis-2020-218986", "areas": ["G"], "unverified": false}, {"key": "Rochdi1994", "text": "Rochdi M, Sabouraud A, Girre C, Venet R, Scherrmann JM. Pharmacokinetics and absolute bioavailability of colchicine after i.v. and oral administration in healthy human volunteers and elderly subjects. Eur J Clin Pharmacol. 1994;46(4):351–354. PMID 7957521. doi:10.1007/BF00194404.", "link": "https://doi.org/10.1007/BF00194404", "areas": ["D"], "unverified": false}, {"key": "Rogers1989", "text": "Rogers DB, Shohat M, Petersen GM, et al. Familial Mediterranean fever in Armenians: autosomal recessive inheritance with high gene frequency. Am J Med Genet. 1989;34:168-172. PMID 2816993; doi:10.1002/ajmg.1320340206", "link": "https://doi.org/10.1002/ajmg.1320340206", "areas": ["A"], "unverified": false}, {"key": "Rowczenio2015", "text": "Rowczenio D, Iancu D, Trojer H, et al. Deletion in MEFV resulting in the loss of p.M694 residue as the cause of autosomal dominant familial Mediterranean fever in North Western European Caucasians — a case series and genetic exploration. Pediatr Rheumatol Online J. 2015;13(Suppl 1):O42. doi:10.1186/1546-0096-13-S1-O42. PMC4596970. Conference abstract; figures were taken from a search summary of the abstract.", "link": "https://doi.org/10.1186/1546-0096-13-S1-O42", "areas": ["B"], "unverified": false}, {"key": "Sag2020", "text": "Sag E, Demirel D, Demir S, et al. Performance of the new \"Eurofever/PRINTO classification criteria\" in FMF patients. Semin Arthritis Rheum. 2020;50(1):172–175. PMID 31471011. doi:10.1016/j.semarthrit.2019.08.004", "link": "https://doi.org/10.1016/j.semarthrit.2019.08.004", "areas": ["B"], "unverified": false}, {"key": "Sag2025", "text": "Sag E, Otón T, Carmona L, Ozen S. Efficacy and safety of treatments in familial Mediterranean fever and its complications: a systematic review informing the EULAR/PReS recommendations for familial Mediterranean fever. Ann Rheum Dis. 2025;84(11):1909-1927. PMID 40562663. DOI 10.1016/j.ard.2025.05.020.", "link": "https://doi.org/10.1016/j.ard.2025.05.020", "areas": ["E"], "unverified": false}, {"key": "Salehzadeh2026", "text": "Salehzadeh F, Molatefi R, Khoei F. JAK Inhibitors in Colchicine Resistant FMF Patients: A Case-Based Review. Mediterr J Rheumatol. 2026;37(3):603-607. doi:10.31138/mjr.281125.mrk", "link": "https://doi.org/10.31138/mjr.281125.mrk", "areas": ["F"], "unverified": false, "note": "Published as a case-based review, not a retrospective case series."}, {"key": "Sari2014", "text": "Sarı İ, Birlik M, Kasifoğlu T. Familial Mediterranean fever: an updated review. Eur J Rheumatol. 2014;1(1):21-33. PMID 27708867. DOI 10.5152/eurjrheum.2014.006.", "link": "https://doi.org/10.5152/eurjrheum.2014.006", "areas": ["E"], "unverified": false}, {"key": "SarrausteDeMenthiere2003", "text": "Sarrauste de Menthière C, Terrière S, Pugnère D, Ruiz M, Demaille J, Touitou I. INFEVERS: the Registry for FMF and hereditary inflammatory disorders mutations. Nucleic Acids Res. 2003;31:282-285. PMID 12520003; PMCID PMC165478; doi:10.1093/nar/gkg031", "link": "https://doi.org/10.1093/nar/gkg031", "areas": ["A", "B"], "unverified": false, "aliases": ["Sarrauste2003"]}, {"key": "Satis2025", "text": "Satiş H, Gül A, Ayan G, et al. Prevalence, incidence and geographic distribution of familial Mediterranean fever in Turkey: a national cohort study. Clin Exp Rheumatol. 2025;43:1709-1714. PMID 41031678; doi:10.55563/clinexprheumatol/pzbg88 (prevalence figure in the abstract looks internally inconsistent; see fact A)", "link": "https://doi.org/10.55563/clinexprheumatol/pzbg88", "areas": ["A"], "unverified": false}, {"key": "Schnappauf2019", "text": "Schnappauf O, Chae JJ, Kastner DL, Aksentijevich I. The pyrin inflammasome in health and disease. Frontiers in Immunology. 2019;10:1745. PMID: 31456795. DOI: 10.3389/fimmu.2019.01745", "link": "https://doi.org/10.3389/fimmu.2019.01745", "areas": ["C"], "unverified": false}, {"key": "SeverityScoreComparisons", "text": "Pras and Mor severity scores and their comparisons with the ISSF — originals not read (unverified). Primary sources to check before publishing: Pras E, Livneh A, Balow JE Jr, et al. Clinical differences between North African and Iraqi Jews with familial Mediterranean fever. Am J Med Genet. 1998;75(2):216–219 (the Pras severity score); Mor A, Shinar Y, Zaks N, et al. Evaluation of disease severity in familial Mediterranean fever. Semin Arthritis Rheum. 2005;35(1):57–64. doi:10.1016/j.semarthrit.2005.02.002. Comparison read as abstract only: Ozcan S, et al. Is the performance of the international severity scoring system for familial Mediterranean fever in children better than other scoring systems? Int J Clin Pract. 2021;75(11):e14678. PMID 34328662. doi:10.1111/ijcp.14678.", "link": "https://doi.org/10.1016/j.semarthrit.2005.02.002", "areas": ["G"], "unverified": true}, {"key": "Sezer2024", "text": "Sezer M, Çelikel E, Ekici Tekin Z, et al. Assessment of quality of life, school performance, and physical activity in adolescents with familial Mediterranean fever. Mod Rheumatol. 2024;34(2):405-409. PMID 36790108. DOI 10.1093/mr/road022.", "link": "https://doi.org/10.1093/mr/road022", "areas": ["E"], "unverified": false}, {"key": "Sherif2003", "text": "Sherif AM, Refaie AF, Sobh MA, Mohamed NA, Sheashaa HA, Ghoneim MA. Long-term outcome of live donor kidney transplantation for renal amyloidosis. Am J Kidney Dis. 2003;42(2):370-375. PMID 12900821. DOI 10.1016/S0272-6386(03)00676-0.", "link": "https://doi.org/10.1016/S0272-6386(03", "areas": ["E"], "unverified": false}, {"key": "Shi2015", "text": "Shi J, Zhao Y, Wang K, Shi X, Wang Y, Huang H, Zhuang Y, Cai T, Wang F, Shao F. Cleavage of GSDMD by inflammatory caspases determines pyroptotic cell death. Nature. 2015;526(7575):660-665. PMID: 26375003. DOI: 10.1038/nature15514", "link": "https://doi.org/10.1038/nature15514", "areas": ["C"], "unverified": false}, {"key": "Shinar2000", "text": "Shinar Y, Livneh A, Langevitz P, et al. Genotype-phenotype assessment of common genotypes among patients with familial Mediterranean fever. J Rheumatol. 2000;27(7):1703–1707. PMID 10914855.", "link": "https://pubmed.ncbi.nlm.nih.gov/10914855/", "areas": ["B"], "unverified": false}, {"key": "Shinar2012", "text": "Shinar Y, Obici L, Aksentijevich I, et al. Guidelines for the genetic diagnosis of hereditary recurrent fevers. Ann Rheum Dis. 2012;71(10):1599–1605. PMID 22661645. doi:10.1136/annrheumdis-2011-201271. PMC3500529", "link": "https://doi.org/10.1136/annrheumdis-2011-201271", "areas": ["B"], "unverified": false}, {"key": "Siegal1945", "text": "Siegal S. Benign paroxysmal peritonitis. Ann Intern Med. 1945;23(1):1-21. doi:10.7326/0003-4819-23-1-1 (verified in Crossref; not indexed in PubMed)", "link": "https://doi.org/10.7326/0003-4819-23-1-1", "areas": ["A"], "unverified": false}, {"key": "Siegal1949", "text": "Siegal S. Benign paroxysmal peritonitis [second series]. Gastroenterology. 1949;12:234-247. PMID 18124924; doi:10.1016/S0016-5085(49)80034-5", "link": "https://doi.org/10.1016/S0016-5085(49", "areas": ["A"], "unverified": false}, {"key": "Slobodnick2018", "text": "Slobodnick A, Shah B, Krasnokutsky S, Pillinger MH. Update on colchicine, 2017. Rheumatology (Oxford). 2018;57(suppl 1):i4–i11. PMID 29272515. PMCID PMC5850858. doi:10.1093/rheumatology/kex453.", "link": "https://doi.org/10.1093/rheumatology/kex453", "areas": ["D"], "unverified": false}, {"key": "Sohar1967", "text": "Sohar E, Gafni J, Pras M, Heller H. Familial Mediterranean fever. A survey of 470 cases and review of the literature. Am J Med. 1967;43:227-253. PMID 5340644; doi:10.1016/0002-9343(67)90167-2 (no abstract; specific numbers cited via Tufan2020)", "link": "https://doi.org/10.1016/0002-9343(67", "areas": ["A", "B", "E"], "unverified": false}, {"key": "Sonmez2016", "text": "Sönmez HE, Batu ED, Özen S. Familial Mediterranean fever: current perspectives. J Inflamm Res. 2016;9:13-20. PMID 27051312; PMCID PMC4803250; doi:10.2147/JIR.S91352", "link": "https://doi.org/10.2147/JIR.S91352", "areas": ["A", "B", "G"], "unverified": false}, {"key": "Sonmez2020", "text": "Sönmez AÖ, Sönmez HE, Çakan M, Yavuz M, Keskindemirci G, Aktay Ayaz N. The evaluation of anxiety, depression and quality of life scores of children and adolescents with familial Mediterranean fever. Rheumatol Int. 2020;40(5):757-763. PMID 31982954. DOI 10.1007/s00296-020-04519-2.", "link": "https://doi.org/10.1007/s00296-020-04519-2", "areas": ["E"], "unverified": false}, {"key": "SoonLaxer2017", "text": "Soon GS, Laxer RM. Approach to recurrent fever in childhood. Can Fam Physician. 2017;63(10):756–762. PMID 29025800. PMC5638471", "link": "https://pubmed.ncbi.nlm.nih.gov/29025800/", "areas": ["B"], "unverified": false}, {"key": "SorianoManna2012", "text": "Soriano A, Manna R. Familial Mediterranean fever: new phenotypes. Autoimmun Rev. 2012;12:31-37. PMID 22878273; doi:10.1016/j.autrev.2012.07.019", "link": "https://doi.org/10.1016/j.autrev.2012.07.019", "areas": ["A"], "unverified": false}, {"key": "Sotskiy2021", "text": "Sotskiy PO, Sotskaya OL, Hayrapetyan HS, Sarkisian TF, Yeghiazaryan AR, Atoyan SA, Ben-Chetrit E. Infertility causes and pregnancy outcome in patients with familial Mediterranean fever and controls. J Rheumatol. 2021;48(4):608-614. PMID 33004533. DOI 10.3899/jrheum.200574.", "link": "https://doi.org/10.3899/jrheum.200574", "areas": ["E"], "unverified": false}, {"key": "Stoffels2014", "text": "Stoffels M, Szperl A, Simon A, et al. MEFV mutations affecting pyrin amino acid 577 cause autosomal dominant autoinflammatory disease. Ann Rheum Dis. 2014;73(2):455–461. PMID 23505238. doi:10.1136/annrheumdis-2012-202580", "link": "https://doi.org/10.1136/annrheumdis-2012-202580", "areas": ["B"], "unverified": false}, {"key": "Suticen2021", "text": "Suticen E, Atas N, Guler AA, Akdogan O, Babaoğlu H, Satis H, Karadeniz H, Haznedaroglu S, Ozturk MA, Tufan A. Work productivity impairment in patients with familial Mediterranean fever and effects of interleukin-1 antagonists. Clin Rheumatol. 2021;40(7):2865-2871. PMID 33527168. DOI 10.1007/s10067-021-05617-7.", "link": "https://doi.org/10.1007/s10067-021-05617-7", "areas": ["E"], "unverified": false}, {"key": "Swanson2019", "text": "Swanson KV, Deng M, Ting JP. The NLRP3 inflammasome: molecular activation and regulation to therapeutics. Nature Reviews Immunology. 2019;19(8):477-489. PMID: 31036962. DOI: 10.1038/s41577-019-0165-0", "link": "https://doi.org/10.1038/s41577-019-0165-0", "areas": ["C"], "unverified": false}, {"key": "Tanatar2020", "text": "Tanatar A, Sönmez HE, Karadağ ŞG, et al. Performance of Tel-Hashomer, Livneh, pediatric and new Eurofever/PRINTO classification criteria for familial Mediterranean fever in a referral center. Rheumatol Int. 2020;40(1):21–27. PMID 31646357. doi:10.1007/s00296-019-04463-w", "link": "https://doi.org/10.1007/s00296-019-04463-w", "areas": ["B"], "unverified": false}, {"key": "Tanatar2021", "text": "Tanatar A, Karadağ ŞG, Çakan M, Sönmez HE, Ayaz NA. Age of onset as an influencing factor for disease severity in children with familial Mediterranean fever. Mod Rheumatol. 2021;31:219-222. PMID 31999206; doi:10.1080/14397595.2020.1719594", "link": "https://doi.org/10.1080/14397595.2020.1719594", "areas": ["A"], "unverified": false}, {"key": "Tekgoz2021", "text": "Tekgöz E, Çolak S, Çınar Fİ, Yılmaz S, Çınar M. Non-adherence to colchicine treatment is a common misevaluation in familial Mediterranean fever. Turk J Med Sci. 2021;51(5):2357–2363. PMID 33957721. doi:10.3906/sag-2102-328.", "link": "https://doi.org/10.3906/sag-2102-328", "areas": ["G"], "unverified": false}, {"key": "TerHaar2016", "text": "Ter Haar NM, Jeyaratnam J, Lachmann HJ, et al. The phenotype and genotype of mevalonate kinase deficiency: a series of 114 cases from the Eurofever registry. Arthritis Rheumatol. 2016;68(11):2795–2805. PMID 27213830. doi:10.1002/art.39763", "link": "https://doi.org/10.1002/art.39763", "areas": ["B"], "unverified": false}, {"key": "Terkeltaub2011", "text": "Terkeltaub RA, Furst DE, Digiacinto JL, Kook KA, Davis MW. Novel evidence-based colchicine dose-reduction algorithm to predict and prevent colchicine toxicity in the presence of cytochrome P450 3A4/P-glycoprotein inhibitors. Arthritis Rheum. 2011;63(8):2226–2237. PMID 21480191. doi:10.1002/art.30389.", "link": "https://doi.org/10.1002/art.30389", "areas": ["D", "G"], "unverified": false}, {"key": "Thomas1999", "text": "Thomas KT, Feder HM, Lawton AR, Edwards KM. Periodic fever syndrome in children. J Pediatr. 1999;135(1):15–21. PMID 10393598. doi:10.1016/S0022-3476(99)70321-5", "link": "https://doi.org/10.1016/S0022-3476(99", "areas": ["B"], "unverified": false}, {"key": "Toplak2011", "text": "Toplak N, Frenkel J, Ozen S, De Benedetti F, Hofer M, Kone-Paut I, Gattorno M, Ruperto N, Martini A, et al.; PRINTO and Eurofever/Eurotraps projects. The Eurofever registry for autoinflammatory diseases: results of the first 15 months of enrolment. Pediatr Rheumatol Online J. 2011;9(Suppl 1):P303. PMCID PMC3194673. doi:10.1186/1546-0096-9-S1-P303. (Conference abstract; registry design statements corroborated by the Eurofever registry page at https://printo.it/eurofever/registry. A later report, \"The Eurofever Project: towards the longitudinal stage,\" PMCID PMC4599901, describes the move to longitudinal data capture — not read, unverified.)", "link": "https://printo.it/eurofever/registry", "areas": ["G"], "unverified": true}, {"key": "Touitou2001", "text": "Touitou I. The spectrum of Familial Mediterranean Fever (FMF) mutations. Eur J Hum Genet. 2001;9:473-483. PMID 11464238; doi:10.1038/sj.ejhg.5200658", "link": "https://doi.org/10.1038/sj.ejhg.5200658", "areas": ["A", "B"], "unverified": false}, {"key": "Touitou2004", "text": "Touitou I, Lesage S, McDermott M, et al. Infevers: an evolving mutation database for auto-inflammatory syndromes. Hum Mutat. 2004;24:194-198. PMID 15300846; doi:10.1002/humu.20080", "link": "https://doi.org/10.1002/humu.20080", "areas": ["A"], "unverified": false}, {"key": "Touitou2007", "text": "Touitou I, Sarkisian T, Medlej-Hashim M, Tunca M, Livneh A, Cattan D, et al.; International Study Group for Phenotype-Genotype Correlation in FMF. Country as the primary risk factor for renal amyloidosis in familial Mediterranean fever. Arthritis Rheum. 2007;56(5):1706-1712. PMID 17469185. DOI 10.1002/art.22507.", "link": "https://doi.org/10.1002/art.22507", "areas": ["E"], "unverified": false}, {"key": "Tufan2020", "text": "Tufan A, Lachmann HJ. Familial Mediterranean fever, from pathogenesis to treatment: a contemporary review. Turk J Med Sci. 2020;50(SI-2):1591-1610. PMID 32806879; PMCID PMC7672358; doi:10.3906/sag-2008-11 (open full text read)", "link": "https://doi.org/10.3906/sag-2008-11", "areas": ["A", "G"], "unverified": false}, {"key": "TurkishFMF2005", "text": "Tunca M, Akar S, Onen F, et al.; Turkish FMF Study Group. Familial Mediterranean fever (FMF) in Turkey: results of a nationwide multicenter study. Medicine (Baltimore). 2005;84(1):1-11. PMID 15643295. DOI 10.1097/01.md.0000152370.84628.0c.", "link": "https://doi.org/10.1097/01.md.0000152370.84628.0c", "areas": ["E", "A", "B", "G"], "unverified": false, "aliases": ["Tunca2005"]}, {"key": "TurkishPilot", "text": "Yasar Bilge NS, Perez Brocal V, Kasifoglu T, Bilge U, Kasifoglu N, Moya A, Dinleyici EC. Intestinal microbiota composition of patients with familial Mediterranean fever: a pilot study. Turk J Med Sci. 2026;56(3):801-807. PMID 42499440. PMCID PMC13398580. Open access.", "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13398580/", "areas": ["F"], "unverified": false}, {"key": "Twig2014", "text": "Twig G, Livneh A, Vivante A, Afek A, Shamiss A, Derazne E, Tzur D, Ben-Zvi I, Tirosh A, Barchana M, Shohat T, Golan E, Amital H. Mortality risk factors associated with familial Mediterranean fever among a cohort of 1.25 million adolescents. Ann Rheum Dis. 2014;73(4):704-709. PMID 23505237. DOI 10.1136/annrheumdis-2012-202932.", "link": "https://doi.org/10.1136/annrheumdis-2012-202932", "areas": ["E"], "unverified": false}, {"key": "UniProtO15553", "text": "UniProt Consortium. UniProtKB entry O15553 (MEFV_HUMAN, Pyrin/Marenostrin). https://rest.uniprot.org/uniprotkb/O15553 (accessed 2026-10-16). Source of the domain coordinates and the MIM cross-references 249100, 134610, 608068 and 608107.", "link": "https://rest.uniprot.org/uniprotkb/O15553", "areas": ["B"], "unverified": false}, {"key": "vanGameren2006", "text": "van Gameren II, Hazenberg BP, Bijzet J, van Rijswijk MH. Diagnostic accuracy of subcutaneous abdominal fat tissue aspiration for detecting systemic amyloidosis and its utility in clinical practice. Arthritis Rheum. 2006;54(6):2015-2021. PMID 16732553. DOI 10.1002/art.21902.", "link": "https://doi.org/10.1002/art.21902", "areas": ["E"], "unverified": false}, {"key": "VanGijn2018", "text": "Van Gijn ME, Ceccherini I, Shinar Y, et al. New workflow for classification of genetic variants' pathogenicity applied to hereditary recurrent fevers by the International Study Group for Systemic Autoinflammatory Diseases (INSAID). J Med Genet. 2018;55(8):530–537. PMID 29599418. doi:10.1136/jmedgenet-2017-105216", "link": "https://doi.org/10.1136/jmedgenet-2017-105216", "areas": ["B"], "unverified": false}, {"key": "VanGorp2016", "text": "Van Gorp H, Saavedra PHV, de Vasconcelos NM, Van Opdenbosch N, et al., Lamkanfi M. Familial Mediterranean fever mutations lift the obligatory requirement for microtubules in Pyrin inflammasome activation. Proceedings of the National Academy of Sciences USA. 2016;113(50):14384-14389. PMID: 27911804. DOI: 10.1073/pnas.1613156113", "link": "https://doi.org/10.1073/pnas.1613156113", "areas": ["C", "F"], "unverified": false}, {"key": "Varan2019", "text": "Varan O, Kucuk H, Babaoglu H, et al. Effect of interleukin-1 antagonists on the quality of life in familial Mediterranean fever patients. Clin Rheumatol. 2019;38(4):1125-1130. PMID 30535829. DOI 10.1007/s10067-018-4384-8.", "link": "https://doi.org/10.1007/s10067-018-4384-8", "areas": ["E"], "unverified": false}, {"key": "Vertex2003", "text": "Vertex Pharmaceuticals / Aventis announcement, November 2003: voluntary discontinuation of the Phase IIb rheumatoid arthritis program for pralnacasan (VX-740) following minimal-to-moderate hepatic fibrosis in a 9-month high-dose animal toxicology study, with no corresponding human hepatic adverse events. BioWorld report: https://www.bioworld.com/articles/469227 ; Vertex investor filing: https://investors.vrtx.com/static-files/406fee26-7f9a-49ba-9df8-64303c02105a", "link": "https://www.bioworld.com/articles/469227", "areas": ["F"], "unverified": false}, {"key": "Vitale2025", "text": "Vitale A, Caggiano V, Sbalchiero J, Tufan A, Batu ED, Ragab G, et al. Predictors of proteinuria, amyloidosis and kidney failure in familial Mediterranean fever: data from the International AIDA Network Registry. Rheumatology (Oxford). 2025;64(8):4776-4787. PMID 40175882. DOI 10.1093/rheumatology/keaf181.", "link": "https://doi.org/10.1093/rheumatology/keaf181", "areas": ["E", "G"], "unverified": false}, {"key": "VX765", "text": "Belnacasan (VX-765), caspase-1 inhibitor. ClinicalTrials.gov NCT01501383 (treatment-resistant partial epilepsy, Vertex, phase 2, n=55): status TERMINATED, reason given in the registry verbatim as \"Terminated by Sponsor\". NCT00205465 (psoriasis, Vertex, phase 2, n=64): status COMPLETED. The registry gives no toxicity reason; claims that the programme stopped for liver toxicity have no primary support.", "link": "https://clinicaltrials.gov/study/NCT01501383", "areas": ["F"], "unverified": false, "note": "Checked through the ClinicalTrials.gov v2 API rather than a vendor summary."}, {"key": "Xu2014", "text": "Xu H, Yang J, Gao W, et al. Innate immune sensing of bacterial modifications of Rho GTPases by the Pyrin inflammasome. Nature. 2014;513:237-241. PMID 24919149; doi:10.1038/nature13449", "link": "https://doi.org/10.1038/nature13449", "areas": ["A", "C"], "unverified": false}, {"key": "Yalcinkaya2009", "text": "Yalçınkaya F, Özen S, Özçakar ZB, et al. A new set of criteria for the diagnosis of familial Mediterranean fever in childhood. Rheumatology (Oxford). 2009;48(4):395–398. PMID 19193696. doi:10.1093/rheumatology/ken509", "link": "https://doi.org/10.1093/rheumatology/ken509", "areas": ["B"], "unverified": false}, {"key": "Yamaguchi1992", "text": "Yamaguchi M, Ohta A, Tsunematsu T, et al. Preliminary criteria for classification of adult Still's disease. J Rheumatol. 1992;19(3):424–430. PMID 1578458.", "link": "https://pubmed.ncbi.nlm.nih.gov/1578458/", "areas": ["B"], "unverified": false}, {"key": "YasarBilge2020", "text": "Yaşar Bilge NŞ, Bodakçi E, Bilgin M, Kaşifoğlu T. Comparison of clinical features in FMF patients according to severity scores: an analysis with the ISSF scoring system. Eur J Rheumatol. 2020;7(2):68–70. PMID 32644926. PMCID PMC7343229. doi:10.5152/eurjrheum.2020.19136.", "link": "https://doi.org/10.5152/eurjrheum.2020.19136", "areas": ["G"], "unverified": false}, {"key": "Yenokyan2012", "text": "Yenokyan G, Armenian HK. Triggers for attacks in familial Mediterranean fever: application of the case-crossover design. Am J Epidemiol. 2012;175:1054-1061. PMID 22234484; doi:10.1093/aje/kwr460", "link": "https://doi.org/10.1093/aje/kwr460", "areas": ["A"], "unverified": false}, {"key": "Yesilkaya2015", "text": "Yesilkaya S, Acikel C, Fidanci BE, et al. Development of a medication adherence scale for familial Mediterranean fever (MASIF) in a cohort of Turkish children. Clin Exp Rheumatol. 2015;33(6 Suppl 94):S156–S162. PMID 26393894.", "link": "https://pubmed.ncbi.nlm.nih.gov/26393894/", "areas": ["G"], "unverified": false}, {"key": "Yildirim2021", "text": "Yıldırım DG, Bakkaloğlu SA, Soysal-Acar AŞ, Buyan N. Parental knowledge about familial Mediterranean fever: a cross-sectional study. Turk J Pediatr. 2021;63(6):1048–1055. doi:10.24953/turkjped.2021.06.013. https://turkjpediatr.org/article/view/393 (no PMID shown on the journal page).", "link": "https://turkjpediatr.org/article/view/393", "areas": ["G"], "unverified": false}, {"key": "Yilmaz2001", "text": "Yilmaz E, Ozen S, Balci B, et al. Mutation frequency of Familial Mediterranean Fever and evidence for a high carrier rate in the Turkish population. Eur J Hum Genet. 2001;9:553-555. PMID 11464248; doi:10.1038/sj.ejhg.5200674", "link": "https://doi.org/10.1038/sj.ejhg.5200674", "areas": ["A", "B"], "unverified": false}, {"key": "Yin2022", "text": "Yin X, Tian F, Wu B, Xu T. Interventions for reducing inflammation in familial Mediterranean fever. Cochrane Database Syst Rev. 2022;3(3):CD010893. PMID 35349164. PMCID PMC8962959. doi:10.1002/14651858.CD010893.pub4.", "link": "https://doi.org/10.1002/14651858.CD010893.pub4", "areas": ["D", "E"], "unverified": false}, {"key": "Zangi2015", "text": "Zangi HA, Ndosi M, Adams J, Andersen L, Bode C, Boström C, van Eijk-Hustings Y, Gossec L, Korandová J, Mendes G, Niedermann K, Primdahl J, Stoffer M, Voshaar M, van Tubergen A; EULAR. EULAR recommendations for patient education for people with inflammatory arthritis. Ann Rheum Dis. 2015;74(6):954–962. PMID 25735643. doi:10.1136/annrheumdis-2014-206807. Table 1 (two overarching principles, eight recommendations with evidence categories, strengths and agreement scores) read from the accepted manuscript at White Rose eprints: https://eprints.whiterose.ac.uk/id/eprint/83967/", "link": "https://eprints.whiterose.ac.uk/id/eprint/83967/", "areas": ["G"], "unverified": false}, {"key": "Zemer1974", "text": "Zemer D, Revach M, Pras M, et al. A controlled trial of colchicine in preventing attacks of familial Mediterranean fever. N Engl J Med. 1974;291(18):932-934. PMID 4606109; doi:10.1056/NEJM197410312911803", "link": "https://doi.org/10.1056/NEJM197410312911803", "areas": ["A", "D"], "unverified": false}, {"key": "Zemer1986", "text": "Zemer D, Pras M, Sohar E, Modan M, Cabili S, Gafni J. Colchicine in the prevention and treatment of the amyloidosis of familial Mediterranean fever. N Engl J Med. 1986;314:1001-1005. PMID 3515182; doi:10.1056/NEJM198604173141601", "link": "https://doi.org/10.1056/NEJM198604173141601", "areas": ["A", "D", "E", "F"], "unverified": false}];

/* =============== home: two years, before and after colchicine =============== */
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');const r=rng(17);
  const EV=[];for(let d=0;d<730;d++){const m=d/30.4;let p=1.5/30;if(m>12)p*=lerp(1,.08,ease(ramp(m,12,15)));if(r()<p&&!(EV.length&&d-EV[EV.length-1].d<7))EV.push({d,h:.55+r()*.45})}
  function draw(t){const N=vb(svg,'520 300','400 340');
    const D=t*730,x0=N?34:40,x1=N?392:500,y0=40,y1=N?150:170,X=d=>lerp(x0,x1,d/730);let s='';
    s+=`<rect x="${f1(X(365))}" y="20" width="${f1(x1-X(365))}" height="${N?258:250}" rx="8" style="fill:var(--crocus-soft);opacity:.6"/>`;
    s+=`<text x="${f1(X(365)+8)}" y="36" class="t-xs" style="fill:var(--crocus)">קולכיצין יומי →</text><text x="${x0}" y="36" class="t-xs" style="fill:var(--terra)">ללא טיפול</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    for(let m=0;m<=24;m+=6)s+=`<text x="${f1(X(m*30.4))}" y="${y1+16}" class="t-xs ${m===0?'':m===24?'t-end':'t-mid'}">${m===0?'חודש 0':m}</text>`;
    EV.forEach(e=>{if(e.d>D)return;const x=X(e.d),h=(y1-y0-10)*e.h,age=clamp((D-e.d)/20);s+=`<path d="M${f1(x-5)} ${y1} L${f1(x)} ${f1(y1-h)} L${f1(x+5)} ${y1}z" style="fill:var(--terra);opacity:${f1(1-.45*age)}"/>`});
    // SAA between attacks
    const sy=N?240:250;let sd='';for(let d=0;d<=Math.min(D,730);d+=5){const m=d/30.4;const v=lerp(.8,.06,ease(ramp(m,12.5,18)));sd+=(sd?'L':'M')+f1(X(d))+' '+f1(sy-60*v)}
    s+=`<line x1="${x0}" x2="${x1}" y1="${sy}" y2="${sy}" class="axis"/><text x="${x0}" y="${sy+16}" class="t-xs" style="fill:var(--gold)">\u2067SAA בין התקפים ↑\u2069</text><path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:3"/>`;
    s+=`<line x1="${f1(X(D))}" x2="${f1(X(D))}" y1="24" y2="${sy+12}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    const n1=EV.filter(e=>e.d<=Math.min(D,365)).length,n2=EV.filter(e=>e.d>365&&e.d<=D).length;
    s+=`<text x="${x1}" y="${sy+(N?56:36)}" class="t-sm t-end">\u2067התקפים: שנה 1 <tspan style="fill:var(--terra);font-weight:700">${n1}</tspan> · שנה 2 <tspan style="fill:var(--crocus);font-weight:700">${n2}</tspan>\u2069</text>`;
    svg.innerHTML=s}
  playWire(rg,$('#heroPlay'),draw,9000,'הפעלה חוזרת','home');draw(+rg.value);
};
/* =============== 1.1 what FMF is =============== */
const WH_POPS=[
 {id:'iraqi',n:'יהודים יוצאי עיראק',c:29,
  txt:'יהודים יוצאי עיראק: 29% נשאים בסקר ישראלי שבדק שלושה וריאנטים (קוגן 2001); 1 מכל 3.5 בפאנל של ארבעה וריאנטים (גרשוני-ברוך 2001). הווריאנט העיקרי כאן הוא V726A (12.8% נושאים אותו). <sup class="c" data-ref="Kogan2001,GershoniBaruch2001" title="Source 77,133">77,133</sup>',
  obs:[{l:'2 וריאנטים, בריאים',v:25,c:'פנוטיפ III, 1 מכל 25 <sup class="c" data-ref="Kogan2001" title="Source 133">133</sup>'},{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 (נתון אזורי, לא ספציפי לקבוצה הזו) <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]},
 {id:'moroc',n:'יהודים יוצאי מרוקו / צפון אפריקה',c:21,
  txt:'יהודים יוצאי מרוקו: 21% באותו פאנל של שלושה וריאנטים (קוגן 2001) ו־1 מכל 4.7 בפאנל של ארבעה וריאנטים (גרשוני-ברוך 2001). הווריאנט השולט הוא M694V (11.1% נושאים אותו), ו־V726A אינו נמצא כלל. סקירה אחת מציינת 1 מכל 3.5. <sup class="c" data-ref="Kogan2001,GershoniBaruch2001,Lancieri2023" title="Source 77,133,145">77,133,145</sup>',
  obs:[{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 (נתון אזורי) <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]},
 {id:'ashk',n:'יהודים אשכנזים',c:21,
  txt:'יהודים אשכנזים: כ־21% מתוך כ־200 דגימות אנונימיות נשאו וריאנט, בעיקר E148Q, עם עדות לחדירות מופחתת; סקרים אחרים מצאו 14% בפאנל של שלושה וריאנטים ו־1 מכל 4.5 בפאנל של ארבעה וריאנטים. מבחינה קלינית FMF נדירה אצלם הרבה יותר מאשר אצל יהודים יוצאי צפון אפריקה ויוצאי עיראק. <sup class="c" data-ref="Aksentijevich1999,Kogan2001,GershoniBaruch2001" title="Source 3,77,133">3,77,133</sup>',
  obs:[{l:'2 וריאנטים, בריאים',v:300,c:'פנוטיפ III, 1 מכל 300 <sup class="c" data-ref="Kogan2001" title="Source 133">133</sup>'}],none:'⁧FMF: נדירה בהרבה, אין נתון⁩'},
 {id:'arab',n:'ערבים מוסלמים בישראל',c:23,
  txt:'ערבים מוסלמים בישראל: 1 מכל 4.3 נשאים בפאנל של ארבעה וריאנטים; V726A אצל 7.3%, M694V אצל 0.6%. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup>',
  obs:[{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 (נתון אזורי) <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]},
 {id:'armen',n:'ארמנים',c:20,
  txt:'ארמנים: כ־1 מכל 5 לפי סקירה עדכנית. מחקר סגרגציה ישן יותר, מהתקופה שלפני הבדיקות המולקולריות, ב־64 משפחות ארמניות־אמריקאיות, העריך שכיחות גן של 0.073, כלומר כ־1 נשא מכל 7. <sup class="c" data-ref="Lancieri2023,Rogers1989" title="Source 145,226">145,226</sup>',
  obs:[{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 (נתון אזורי) <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]},
 {id:'turk',n:'טורקים',c:20,
  txt:'טורקים בריאים: 20% נושאים אחד מחמישה וריאנטים שכיחים: E148Q אצל 12%, M680I אצל 5%, M694V אצל 3%, V726A אצל 2%. E148Q שכיח אצל אנשים בריאים, אבל הוא רק 3.6% מהאללים של החולים, סימן לחדירות נמוכה. <sup class="c" data-ref="Yilmaz2001" title="Source 282">282</sup>',
  obs:[{l:'FMF, סיוואס',v:395,c:'FMF בסיוואס שבמרכז אנטוליה, 1 מכל 395 (סקר מבית לבית) <sup class="c" data-ref="Onen2004" title="Source 195">195</sup>'},{l:'FMF, טורקיה',v:1000,c:'טורקיה כולה, כ־0.1% <sup class="c" data-ref="Onen2004" title="Source 195">195</sup>'}]},
 {id:'greek',n:'יוונים',c:.7,
  txt:'יוונים: רק 0.7% מתוך 140 יוונים בריאים היו נשאים, אף שחולים יוונים נושאים בעיקר M694V, M680I ו־V726A. <sup class="c" data-ref="Giaglis2007" title="Source 81">81</sup>',
  obs:[],none:'לא נמצא נתון שכיחות'},
 {id:'pool',n:'מטה-אנליזה משולבת',c:18.6,
  txt:'מטה-אנליזה של 16,756 כרומוזומים מ־14 אוכלוסיות: שיעור נשאות ממוצע של 0.186, הגבוה ביותר אצל ערבים, ארמנים, יהודים וטורקים. <sup class="c" data-ref="Papadopoulos2008" title="Source 206">206</sup>',
  obs:[{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'}]}
];
const WH_STEPS=[
 {from:0,at:.45,k:'שלב 1 · נשאים',t:'עותק אחד שונה, בלי מחלה',
  txt:'במקומות שבהם FMF שכיחה, בערך 1 מכל 5 אנשים נושא וריאנט אחד של MEFV. מטה-אנליזה של 16,756 כרומוזומים מ־14 אוכלוסיות מצאה שיעור נשאות ממוצע של 0.186. נשאים הם בדרך כלל בריאים, כי FMF היא בצורתה הקלאסית מחלה בתורשה רצסיבית. <sup class="c" data-ref="Papadopoulos2008,GeneReviews" title="Source 76,206">76,206</sup>',
  pt:'אנשים רבים נושאים עותק אחד שונה של הגן של FMF בלי לדעת זאת. עותק אחד לבדו בדרך כלל אינו גורם למחלה.',
  hook:'שיעורי הנשאות של MEFV באוכלוסיות של יהודים, ערבים, ארמנים וטורקים (כ־10% ויותר) גבוהים בהרבה משיעור הנשאים של סיסטיק פיברוזיס בקרב צפון אמריקאים ממוצא אירופי (כ־4%). <sup class="c" data-ref="Park2020" title="Source 208">208</sup>'},
 {from:.5,at:.72,k:'שלב 2 · שני נשאים',t:'1 מכל 4 ילדים יורש שני וריאנטים',
  txt:'כששני ההורים נושאים וריאנט אחד, לכל ילד יש סיכוי של 1 ל־4 לרשת שני וריאנטים (אחד מכל הורה), סיכוי של 1 ל־2 להיות נשא, וסיכוי של 1 ל־4 לא לרשת אף אחד. <sup class="c" data-ref="GeneReviews" title="Source 76">76</sup> <a href="#gene" data-go="gene">הפרק הבא</a> מציג זאת בהנפשה כטבלת פאנט.',
  pt:'לכל ילד של שני נשאים יש סיכוי של אחד לארבעה לקבל את שני העותקים השונים.',
  hook:'תורשה אוטוזומלית רצסיבית: <b>25% / 50% / 25%</b> בכל היריון, ללא תלות בילדים קודמים.'},
 {from:.75,at:.97,k:'שלב 3 · תחזית מול מציאות',t:'פחות אנשים חולים ב־FMF ממה שצפוי',
  txt:'העלאה בריבוע של חצי משיעור הנשאות נותנת הערכה פשטנית של מספר הלידות עם שני וריאנטים. FMF בפועל נדירה יותר: כ־1:500 עד 1:1,000 בארצות אנדמיות, ו־1:395 בשיא, בסיוואס שבטורקיה. שני דברים מסבירים את הפער. החדירות מופחתת, במיוחד ב־E148Q. ו"פנוטיפ III", שני וריאנטים בלי מחלה, נמצא אצל 1 מכל 25 יהודים יוצאי עיראק ו־1 מכל 300 יהודים אשכנזים: פי 40 עד 240 משיעור ה־FMF הגלויה בקבוצות האלה. <sup class="c" data-ref="Tufan2020,Onen2004,Touitou2001,Kogan2001" title="Source 133,195,260,263">133,195,260,263</sup>',
  pt:'שני וריאנטים מעלים מאוד את הסיכוי ל־FMF, אבל אינם מבטיחים אותה.',
  hook:'<b>פנוטיפ III</b> = שני וריאנטים של MEFV, בלי תסמינים, בלי עמילואידוזיס. E148Q הוא הווריאנט הקל ביותר, בעל החדירות הנמוכה ביותר. <sup class="c" data-ref="SorianoManna2012,Touitou2001" title="Source 248,260">248,260</sup>'}
];
const WH_SEL=[
 {from:0,at:.04,k:'לפני כ־2,100–2,200 שנה',t:'וריאנט חדש מופיע',
  txt:'<span class="ev est">מבוסס</span> הווריאנטים עתיקים. כרומוזומים של נשאים מאוכלוסיות "שהופרדו במשך מאות שנים" חולקים את אותו רצף DNA סביב הווריאנט. תיארוך של 4,626 הפלוטיפים מ־2,313 אנשים בטורקיה מיקם את M694V בגיל של כ־2,108 שנים לפי מודל מרקוב חבוי (HMM; רווח סמך 95%: 1,798–2,501), ואת V726A בגיל של כ־2,192 שנים (1,826–2,754). שיטת Gamma באותו מאמר תיארכה את האב המשותף הקרוב ביותר לזמן מוקדם יותר, כ־3,541 שנים ל־M694V ו־3,372 שנים ל־V726A, כך ש"בן כמה" תלוי בשיטה. <sup class="c" data-ref="IntFMF1997,Park2020" title="Source 109,208">109,208</sup>',
  pt:'כל וריאנט שכיח של FMF התחיל פעם אחת, באדם אחד, לפני יותר מאלפיים שנה.',
  hook:'הפלוטיפים משותפים פירושם וריאנטים <b>מייסדים</b>. חמישה מייסדים (M694V, V726A, M694I, M680I, E148Q) מסבירים כ־74% מהכרומוזומים עם FMF אצל חולים טיפוסיים. <sup class="c" data-ref="Touitou2001" title="Source 260">260</sup>'},
 {from:.15,at:.26,k:'0–540 לספירה',t:'עלייה איטית ובלתי נראית',
  txt:'<span class="ev early">ראיות ראשוניות</span> פארק (Park) ועמיתיו מצאו מקטעי DNA ארוכים ורציפים סביב M694V ו־V726A (הומוזיגוטיות מורחבת של ההפלוטיפ), סימן היכר של ברירה חיובית חזקה ומאוחרת יחסית. סביב E148Q לא נמצא אות כזה. מקדמי הברירה שהעריכו היו 0.077 ל־M694V ו־0.068 ל־V726A לכל דור. ברירה קבועה מכפילה וריאנט נדיר בגורם קבוע בכל דור, וזה קו ישר בסקאלה הלוגריתמית הזו. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  pt:'נראה שלנשאים היו מעט יותר ילדים ששרדו, דור אחרי דור.',
  hook:'אות ברירה: <b>M694V ו־V726A כן, E148Q לא</b>.'},
 {from:.335,at:.37,k:'541 לספירה',t:'מגפת יוסטיניאנוס',
  txt:'<span class="ev early">מתיישב עם הנתונים, לא מוכח</span> פארק ועמיתיו קושרים את תזמון הברירה למגפות הדבר, החל במגפת יוסטיניאנוס משנת 541 לספירה. המנגנון המוצע: חיידק הדבר <i>Yersinia pestis</i> משתמש בחלבון אפקטור, YopM, כדי לשמור על הפירין כבוי. פירין עם וריאנט FMF נקשר ל־YopM בזיקה חלשה יותר, ולכן תאי דם לבנים של חולים, ואפילו של נשאים, משחררים יותר IL-1β כשהם מודבקים. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  pt:'לחיידק הדבר יש תכסיס לכיבוי הפירין. פירין מסוג FMF עמיד חלקית לתכסיס הזה.',
  hook:'YopM מדכא את הפירין. פירין של FMF חומק מ־YopM, ונותן יותר IL-1β נגד <i>Y. pestis</i>.'},
 {from:.70,at:.73,k:'1347 לספירה',t:'המוות השחור',
  txt:'<span class="ev early">ראיות ראשוניות</span> המגפה השנייה החלה עם המוות השחור ב־1347 לספירה. עכברים שנשאו את פירין ה־M680I בטכניקת knock-in בשני העותקים שרדו הדבקה ב־<i>Y. pestis</i> טוב יותר מעכברים עם מקטע B30.2 אנושי תקין, וההגנה אבדה בהיעדר הקולטן ל־IL-1. ניסוי ההישרדות נעשה בהומוזיגוטים, לא בנשאים. עם חיידקים חסרי YopM נעלם ההבדל בין תאים עם הווריאנט לתאים תקינים. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  pt:'ניסויים בבעלי חיים ובתאים מתיישבים עם הרעיון, אבל אי אפשר להריץ את ההיסטוריה מחדש כדי להוכיח אותו.',
  hook:'יתרון ההטרוזיגוט: עותק אחד אולי עוזר נגד זיהום, שני עותקים גורמים למחלה.'},
 {from:.88,at:1,k:'היום',t:'נשאים הם שכיחים',
  txt:'שכיחות ההטרוזיגוטים באוכלוסיות של יהודים, ערבים, ארמנים וטורקים היא כ־10% לפי הסיכום של פארק ועמיתיו, ואילו המטה-אנליזה המשולבת נותנת ממוצע של 18.6%; הנתון תלוי באילו וריאנטים נבדקו. לנשאים בריאים יש רמות בסיס ושיא מעט גבוהות יותר של CRP ושל SAA מאשר ללא־נשאים, מצב "פרו־דלקתי" שהוצע כמסייע להגנה של הגוף מפני זיהומים. <sup class="c" data-ref="Park2020,Papadopoulos2008,Lachmann2006" title="Source 141,206,208">141,206,208</sup>',
  pt:'היום אנשים רבים נושאים עותק אחד. ייתכן שבעבר זה היה יתרון קטן.',
  hook:'תוויות הראיות: ברירה בידי מגפת הדבר היא <b>ראיות ראשוניות</b> (מתיישב עם הנתונים, לא מוכח). עמידות לשחפת היא <b>השערה</b>.'}
];
const WH_SITES=[
 {id:'perit',n:'דלקת הצפק',v:93.7,txt:'כאב בטן פתאומי שיכול להיראות בדיוק כמו מצב חירום כירורגי, עם התגוננות (guarding) ורגישות בהרפיה (rebound). הוא חולף לגמרי תוך 24–72 שעות. חולים רבים עברו כריתות תוספתן או ניתוחי בטן פתוחים (לפרוטומיה) מיותרים. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'},
 {id:'fever',n:'חום',v:92.5,txt:'מתחיל בפתאומיות ומגיע לשיא תוך שעות. הוא יכול להופיע לבדו, ובילדים צעירים הוא יכול להתבטא כחום ממקור לא ידוע. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'},
 {id:'arth',n:'דלקת פרקים',v:47.4,txt:'בדרך כלל במפרק גדול אחד ברגל: ברך, קרסול או ירך. נוזל המפרק סטרילי אבל דלקתי, ולכן המצב יכול לחקות דלקת פרקים זיהומית (ספטית). הוא חולף תוך כשבוע; דלקת פרקים ממושכת מופיעה בפחות מ־5%. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'},
 {id:'myal',n:'כאבי שרירים',v:39.6,txt:'לרוב כאב בשוקיים במאמץ, אחרי עמידה ממושכת או נסיעה, שכיח יותר עם M694V. מיאלגיה ממושכת עם חום (protracted febrile myalgia) היא צורה נדירה וקשה יותר, שנמשכת שבועות ומגיבה לקורטיקוסטרואידים. <sup class="c" data-ref="Tufan2020,Langevitz1994" title="Source 146,263">146,263</sup>'},
 {id:'pleur',n:'דלקת קרום הריאה',v:31.2,txt:'כאב פתאומי בצד אחד של בית החזה בזמן נשימה. ייתכן תפליט קטן. הוא חולף תוך 1–3 ימים. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>'},
 {id:'ele',n:'אודם דמוי שושנה',v:20.9,txt:'נגע אדום ורגיש, בדרך כלל בשוק, בקרסול או בגב כף הרגל, לעתים קרובות אחרי הליכה ממושכת. בקבוצת ילדים אחת הוא נמצא קשור לדלקת פרקים ולהומוזיגוטיות ל־M694V. <sup class="c" data-ref="Tufan2020,GezginYildirim2020" title="Source 79,263">79,263</sup>'},
 {id:'peric',n:'דלקת קרום הלב',v:1.4,txt:'נדירה. בישראל, 27 מתוך כ־4,000 חולים במשך 20 שנה, ועדיין בערך פי עשרה משיעור הרקע. ההתקפים נמשכו בממוצע 4.2 ימים, בלי נזק מתמשך. <sup class="c" data-ref="Kees1997,TurkishFMF2005" title="Source 123,264">123,264</sup>'}
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
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-lbl">⁧100 אנשים · ${pop.n}⁩</text>`;
    for(let i=0;i<100;i++){const k=order.indexOf(i),r=Math.floor(i/10),q=i%10,x=L.gx+q*L.gdx,y=L.gy+r*L.gdy;
      const lit=k<nLit;s+=person(x,y,1,lit?'var(--terra)':'var(--line)');
      if(lit&&k===nLit-1&&t<.48)s+=`<circle cx="${x}" cy="${y-2}" r="13" style="fill:none;stroke:var(--terra);stroke-width:1.5;opacity:.6"/>`}
    const shown=c>=1?nLit:(nLit?.7:0);
    s+=`<text x="${L.tx}" y="${L.bigY}" class="t-big" style="fill:var(--terra)">⁧${c>=1?shown:(nLit?'0.7':'0')} ${c>=1?'נשאים מתוך 100':'נשאים מתוך 100'}⁩</text>`;
    s+=`<text x="${L.tx}" y="${L.subY}" class="t-sm">⁧${nLit?'בערך 1 מתוך '+(100/c<10?f1(100/c):Math.round(100/c)):'נושאים וריאנט אחד של MEFV'}${c<1&&nLit?' (מוצג כדמות 1)':''}⁩</text>`;
    s+=`<path d="${L.div}" class="axis"/>`;
    /* layer 2: family */
    const o2=ramp(t,.5,.56);
    if(o2>0){s+=`<g style="opacity:${f1(o2)}"><text x="${L.famTx}" y="${L.famTy}" class="t-lbl">אם לשני נשאים יש ילדים</text>`;
      s+=person(L.paX[0],L.paY,2,'',true)+person(L.paX[1],L.paY,2,'',true);
      s+=`<text x="${L.paX[0]}" y="${L.carY}" class="t-xs t-mid">נשא</text><text x="${L.paX[1]}" y="${L.carY}" class="t-xs t-mid">נשא</text>`;
      s+=`<path d="${L.conn}" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`;
      const kids=[['VV','⁧2 וריאנטים⁩'],['V+','נשא'],['+V','נשא'],['++','ללא וריאנט']];
      kids.forEach(([g,l],i)=>{const o=ramp(t,.56+i*.035,.6+i*.035);if(o<=0)return;const x=L.kidX[i];
        s+=`<g style="opacity:${f1(o)}"><path d="M${x} ${L.stemY[0]}V${L.stemY[1]}" style="stroke:var(--muted);stroke-width:1.4"/>`;
        s+=g==='VV'?person(x,L.kidY,1.6,'var(--terra)'):g==='++'?person(x,L.kidY,1.6,'var(--line)'):person(x,L.kidY,1.6,'',true);
        s+=`<text x="${x}" y="${L.kidLab}" class="t-xs t-mid" ${g==='VV'?'style="fill:var(--terra);font-weight:700"':''}>${l}</text></g>`});
      const o3=ramp(t,.7,.74);
      if(o3>0)s+=`<g style="opacity:${f1(o3)}"><circle cx="${L.kidX[0]}" cy="${L.ringY}" r="24" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-dasharray:4 3"/><text x="${L.oddX}" y="${L.oddY}" class="t-big${N?' t-mid':''}">⁧1 מתוך 4⁩</text><text x="${L.oddX}" y="${L.oddY2}" class="t-xs${N?' t-mid':''}">לכל ילד</text></g>`;
      s+='</g>'}
    /* layer 3: predicted vs observed, log axis */
    const o4=ramp(t,.75,.8);
    if(o4>0){const pred=1/Math.pow(c/200,2),slide=ease(ramp(t,.78,.9));
      s+=`<g style="opacity:${f1(o4)}"><text x="${L.l3x}" y="${L.l3y}" class="t-lbl">⁧כמה שכיח? 1 מתוך N, סקאלה לוגריתמית⁩</text>`;
      s+=`<line x1="${L.AX0}" y1="${L.axY}" x2="${L.AX1}" y2="${L.axY}" style="stroke:var(--muted);stroke-width:1.2"/>`;
      [[10,'1:10'],[100,'1:100'],[1e3,'1:1k'],[1e4,'1:10k'],[1e5,'1:100k']].forEach(([n,l])=>{const x=lx(n);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.gTop}" y2="${L.axY}" class="grid"/><text x="${f1(x)}" y="${L.tickY}" class="t-xs t-mid">${l}</text>`});
      s+=`<text x="${L.AX1}" y="${L.rarerY}" class="t-xs t-end">נדיר יותר →</text>`;
      /* narrow has no room for a label column beside the axis: the row label and its
         value share one line above the marker instead */
      const row=(y,lab,col,val)=>N
        ? `<text x="${L.l3x}" y="${y-14}" class="t-sm" style="fill:${col}">⁧${lab} · ${val}⁩</text>`
        : `<text x="${L.l3x}" y="${y+4}" class="t-sm" style="fill:${col}">⁧${lab}⁩</text>`;
      const val=(y,x,col,v)=>N?'':`<text x="${f1(x)}" y="${y-10}" class="t-xs t-mid" style="fill:${col};font-weight:700">${v}</text>`;
      const py=L.rowY(0),pv='1:'+oneIn(pred);
      s+=row(py,'צפוי (הערכה)','var(--sea)',pv);
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
    $('#whRead').innerHTML=`<span>${pop.txt}</span><span>הערכה פשוטה של לידות עם שני וריאנטים, בהנחה של בחירת בני זוג אקראית ובהתעלמות מהחדירות: ⁦(${f1(pop.c)}% ÷ 2)²⁩ ≈ <b>1 מתוך ${oneIn(pred)}</b>.</span>`+(pop.obs.length?`<span>נצפה: ${pop.obs.map(o=>o.c).join('; ')}.</span>`:'')}
  const stop=playWire(rg,$('#whPlay'),draw,16000,'הפעלה חוזרת','what');
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
  const yrLbl=y=>y<0?Math.round(-y)+' לפנה״ס':Math.round(y)+' לספירה';
  const pct=p=>p<.001?(p*100).toFixed(3)+'%':p<.01?(p*100).toFixed(2)+'%':(p*100).toFixed(1)+'%';
  function drawSel(t){const yr=lerp(Y0,Y1,t);
    /* narrow: one chart at the full 400 width, taller, with fewer x ticks */
    const N=vb(sv,'720 400','400 520');
    const X0=N?46:84,X1=N?380:672,PY0=N?440:330,PY1=N?100:84;
    const xy=y=>lerp(X0,X1,(y-Y0)/(Y1-Y0)),yl=l=>lerp(PY0,PY1,(l-L0)/(L1-L0));
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    [[-4,'0.01%'],[-3,'0.1%'],[-2,'1%'],[-1,'10%']].forEach(([l,lb])=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yl(l))}" y2="${f1(yl(l))}" class="grid"/><text x="${X0-6}" y="${f1(yl(l)+3)}" class="t-xs t-end">${lb}</text>`});
    s+=N?`<text x="14" y="26" class="t-xs">שכיחות האלל, סקאלה לוגריתמית</text>`
        :`<text x="16" y="${(PY0+PY1)/2}" class="t-xs t-mid" transform="rotate(-90 16 ${(PY0+PY1)/2})">שכיחות האלל, סקאלה לוגריתמית</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${PY0}" y2="${PY0}" class="axis"/>`;
    (N?[[-200,'⁧200 לפנה״ס⁩'],[600,'600'],[1300,'1300'],[2000,'⁧2000 לספירה⁩']]
      :[[-200,'⁧200 לפנה״ס⁩'],[0,'0'],[500,'500'],[1000,'1000'],[1500,'1500'],[2000,'⁧2000 לספירה⁩']]).forEach(([y,l])=>{const x=xy(y);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${PY0}" y2="${PY0+4}" class="axis"/><text x="${f1(x)}" y="${PY0+16}" class="t-xs ${y===-200?'':y===2000?'t-end':'t-mid'}">${l}</text>`});
    /* plague events */
    [[541,N?'מגפת יוסטיניאנוס':'מגפת יוסטיניאנוס','⁧541 לספירה⁩'],[1347,'המוות השחור','⁧1347 לספירה⁩']].forEach(([y,a,b])=>{const x=xy(y),on=yr>=y,o=on?1:.45;
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
      s+=`<text x="${f1(xb+8)}" y="${by+3}" class="t-xs">⁧${v.n}: גיל ≈ ${(2000-v.o).toLocaleString('en-US')} שנים (HMM, רווח סמך 95%)⁩</text>`});
    /* playhead */
    const hx=xy(yr);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${PY1}" y2="${PY0}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    s+=`<text x="${f1(clamp(hx,N?74:120,X1-(N?20:24)))}" y="${PY1-2}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">⁧${yrLbl(yr)}⁩</text>`;
    s+=`<text x="${X1}" y="${PY0-8}" class="t-xs t-end">מודל סכמטי</text>`;
    sv.innerHTML=s;
    const a=pf(VAR[0],yr),b=pf(VAR[1],yr);
    $('#whSelRead').innerHTML=`<span>שנה <b>${yrLbl(yr)}</b></span><span>M694V <b>${a?pct(a):'עוד לא'}</b></span><span>V726A <b>${b?pct(b):'עוד לא'}</b></span><span>דורות מאז ההופעה: <b>${a?Math.round((yr-VAR[0].o)/25):0}</b></span>`;
    const p=phaseOf(WH_SEL,t);setSel(p);$('#whSelNote').innerHTML=noteHTML(WH_SEL[p]);
  }
  const stopS=playWire(rs,$('#whSelPlay'),drawSel,18000,'הפעלה חוזרת','what');
  const setSel=stepWire($('#whSelSteps'),WH_SEL,rs,drawSel,stopS);
  drawSel(+rs.value);
  $('#whSelCards').innerHTML=`
   <div class="card"><h4>מה תומך ברעיון <span class="ev early">ראיות ראשוניות</span></h4><p>שלושה וריאנטים שכיחים המשותפים לכמה אוכלוסיות ים תיכוניות "מרמזים בתוקף על יתרון הטרוזיגוטי". <sup class="c" data-ref="Aksentijevich1999" title="Source 3">3</sup> פארק (Park) 2020 הוסיף את אות הברירה, את מנגנון YopM ואת נתוני ההישרדות בעכברים. <sup class="c" data-ref="Park2020" title="Source 208">208</sup></p></div>
   <div class="card"><h4>טיעון נגדי</h4><p>מחקר ישראלי לא מצא יתרון בריאותי מורגש לנשאים אשכנזים כיום. <sup class="c" data-ref="Kogan2001" title="Source 133">133</sup> יתרון מול מגפת הדבר לא בהכרח ייראה באוכלוסייה מודרנית. סחיפה גנטית באוכלוסיות מבודדות נשארת ההסבר המתחרה: המטה-אנליזה המשולבת מצאה את הבידוד והסחיפה החזקים ביותר באוכלוסיות יהודיות, הקבוצה המועמדת לאפקט מייסד ב־<i>MEFV</i>. <sup class="c" data-ref="Papadopoulos2008" title="Source 206">206</sup></p></div>
   <div class="card"><h4>רעיון ישן יותר: שחפת <span class="ev hyp">השערה</span></h4><p>מכתב מ־2003 שאל אם לנשאים הייתה תמותה נמוכה יותר משחפת. הרעיון מעולם לא נבדק ישירות. <sup class="c" data-ref="Cattan2003" title="Source 32">32</sup></p></div>
   <div class="card"><h4>נשאים "חמים" מעט יותר</h4><p>להטרוזיגוטים בריאים יש רמות בסיס ושיא גבוהות יותר של CRP ושל SAA מאשר לאנשים בלי וריאנטים. <sup class="c" data-ref="Lachmann2006" title="Source 141">141</sup> זה מתיישב עם מערכת חיסון מולדת דרוכה, אבל לא כזו שגורמת למחלה.</p></div>`;

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
    s+=H('pleur',`<ellipse cx="113" cy="118" rx="15" ry="26" style="${T}"/><text x="60" y="122" class="t-xs t-end" style="fill:var(--terra)">צד אחד</text><path d="M62 119H96" style="stroke:var(--terra);stroke-width:1"/>`);
    s+=H('peric',`<path d="M138 120c-6-8-16-2-11 6l11 11 11-11c5-8-5-14-11-6z" style="fill:var(--terra)"/>`);
    s+=H('arth',`<circle cx="107" cy="292" r="12" style="${T}"/><circle cx="155" cy="362" r="8" style="fill:var(--terra);opacity:.3"/><circle cx="112" cy="216" r="9" style="fill:var(--terra);opacity:.3"/><text x="82" y="296" class="t-xs t-end" style="fill:var(--terra)">ברך</text>`);
    s+=H('myal',`<ellipse cx="106" cy="322" rx="9" ry="20" style="${T}"/><ellipse cx="154" cy="322" rx="9" ry="20" style="${T}"/>`);
    s+=H('ele',`<ellipse cx="156" cy="352" rx="11" ry="16" style="fill:var(--congo);opacity:.65"/><text x="178" y="356" class="t-xs" style="fill:var(--terra)">שוק, קרסול</text>`);
    const S=WH_SITES.find(x=>x.id===site);
    body.innerHTML=s;
    $('#whSiteNote').innerHTML=`<h4>${S.n} <span class="big" style="font-size:22px">${f1(S.v)}%</span></h4><p>${S.txt}</p>`;
    $$('.wh-site',$('#whSites')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.site===site));
  }
  $('#whSites').innerHTML=WH_SITES.map(x=>`<button class="wh-site" data-site="${x.id}" aria-pressed="false"><span>${x.n}</span><span class="tr"><i data-w="${x.v}"></i></span><span class="v">${f1(x.v)}%</span></button>`).join('')+
    `<div class="pt"><b>במילים פשוטות</b>כמעט כל התקף מביא איתו חום, ורוב ההתקפים מביאים כאב בטן. לכמחצית מהחולים יש בשלב כלשהו התקפים במפרקים. בין התקפים רוב האנשים מרגישים טוב לגמרי. <sup class="c" data-ref="TurkishFMF2005,GeneReviews" title="Source 76,264">76,264</sup></div>`;
  $('#whSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;drawBody()});
  drawBody();
  setTimeout(()=>$$('#whSites .tr i').forEach(i=>i.style.width=i.dataset.w+'%'),60);

  /* ---------- 4. key numbers ---------- */
  $('#whCards').innerHTML=`
   <div class="card"><span class="kicker">גיל ההופעה</span><span class="big">80–90%</span><p>מהחולים חווים את התסמינים הראשונים לפני גיל 20 <sup class="c" data-ref="Tufan2020,Sohar1967" title="Source 244,263">244,263</sup>, ואצל יותר ממחצית הם מתחילים בעשור הראשון לחיים <sup class="c" data-ref="PRINTO2016G" title="Source 216">216</sup>. התקפים ראשונים אחרי גיל 40 נדירים ובדרך כלל קלים <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>.</p></div>
   <div class="card"><span class="kicker">יחס בין המינים</span><span class="big">1.2 : 1</span><p>גברים לנשים במאגר הטורקי של 2,838 חולים <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup>. נתונים ישראליים ישנים יותר הראו יחס של כ־1.7, שפורש כחדירות מופחתת בנשים <sup class="c" data-ref="Rogers1989" title="Source 226">226</sup>.</p></div>
   <div class="card"><span class="kicker">עיכוב באבחון</span><span class="big">6.9 שנים</span><p>הזמן הממוצע מהתסמינים הראשונים ועד האבחנה בטורקיה, שהתקצר בכ־2 שנים בכל עשור מאז 1981 <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup>. הופעה מוקדמת מאוד קשורה להומוזיגוטיות ל־M694V, למחלה קשה יותר ולעיכוב ארוך יותר <sup class="c" data-ref="Tanatar2021,GezginYildirim2022age" title="Source 80,254">80,254</sup>.</p></div>
   <div class="card"><span class="kicker">שכיחות</span><span class="big">1:500–1:1,000</span><p>בארצות אנדמיות <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>. הנתון הגבוה ביותר שנמדד בשטח הוא 1 מכל 395, בסיוואס שבמרכז אנטוליה <sup class="c" data-ref="Onen2004" title="Source 195">195</sup>.</p></div>
   <div class="card"><span class="kicker">יפן</span><span class="big">192 מתוך 601</span><p>מטופלים יפנים עם חום לא מוסבר אובחנו עם FMF במחקר משנים 2009–2015, שקבע שהיא "כבר אינה מחלה נדירה ביפן" <sup class="c" data-ref="Migita2016" title="Source 174">174</sup>. סקר מ־2009 העריך רק 292 חולים. FMF ביפן מתחילה מאוחר יותר, קלה יותר, מערבת לעתים קרובות את E148Q/M694I, וקולכיצין היה יעיל אצל 91.8% <sup class="c" data-ref="Migita2012" title="Source 173">173</sup>.</p></div>
   <div class="card"><span class="kicker">בעולם</span><span class="big">אין סך כולל מאומת</span><p>אין מקור ראשוני שנותן ספירה עולמית שנבדקה; נתונים כמו "יותר מ־100,000" מופצים בלי אימות. ברשומות הבריאות האלקטרוניות של טורקיה לבדן רשומים 160,897 אנשים עם קודים של FMF <sup class="c" data-ref="Satis2025" title="Source 233">233</sup>. בטורקיה יש הכי הרבה חולים, ואחריה בישראל ובארמניה <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>.</p></div>
   <div class="card"><span class="kicker">שלושה פנוטיפים</span><ul><li><b>פנוטיפ 1:</b> התקפים חוזרים של חום עם סרוזיטיס (דלקת קרומים) או סינוביטיס (דלקת הקרום הסינוביאלי).</li><li><b>פנוטיפ 2:</b> עמילואידוזיס מסוג AA כסימן הראשון, בלי התקפים קודמים. לכל היותר 0.3% במאגר הטורקי, ופחות מ־2% בקבוצות המחקר השונות.</li><li><b>פנוטיפ 3:</b> שני וריאנטים, בלי תסמינים ובלי עמילואידוזיס.</li></ul><p><sup class="c" data-ref="SorianoManna2012,TurkishFMF2005,Tufan2020" title="Source 248,263,264">248,263,264</sup></p></div>
   <div class="card"><span class="kicker">בין התקפים</span><span class="big">טוב, ברוב הזמן</span><p>בדרך כלל החולים מרגישים טוב לגמרי בין התקפים <sup class="c" data-ref="GeneReviews,PRINTO2016G" title="Source 76,216">76,216</sup>. עם זאת, רמת ה־SAA החציונית בין התקפים הייתה 6 mg/L, לעומת 693 mg/L בזמן התקפים, ואצל חולים רבים היא אף פעם לא חוזרת לגמרי לנורמה: ההתקפים הם "קצה הקרחון" <sup class="c" data-ref="Lachmann2006" title="Source 141">141</sup>.</p><div class="hook"><b>לבחינה</b>לפני הקולכיצין, יותר ממחצית החולים ב־FMF מתו מעמילואידוזיס <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>. ראו <a href="#amyloid" data-go="amyloid">עמילואידוזיס מסוג AA</a>.</div></div>`;
};
/* =============== 1.2 the gene & inheritance =============== */
const GN_CLSN={P:'פתוגני',LP:'ככל הנראה פתוגני',VUS:'בעל משמעות לא ודאית',LB:'ככל הנראה שפיר',B:'שפיר',none:'אין וריאנט'};
const GN_CLSC={P:'var(--bad)',LP:'var(--terra)',VUS:'var(--warn)',LB:'var(--good)',B:'var(--good)',none:'var(--muted)'};
const GN_VARS=[
 {id:'M694V',aa:694,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'הווריאנט השכיח ביותר אצל יהודים שאינם אשכנזים; הוא השולט אצל יהודים יוצאי צפון אפריקה, ואינו קיים אצל אשכנזים. <sup class="c" data-ref="Lancieri2023,GershoniBaruch2001" title="Source 77,145">77,145</sup> בקרב 1,090 חולים טורקים שעברו בדיקת גנוטיפ הוא היווה 51.4% מהאללים הנושאים וריאנט <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup>, בקרב חולים יוונים 38.1% <sup class="c" data-ref="Giaglis2007" title="Source 81">81</sup>, ובנתונים מאוחדים 39.6%. <sup class="c" data-ref="Papadopoulos2008" title="Source 206">206</sup> גילו המשוער הוא כ־2,108 שנה לפי מודל מרקוב חבוי, או אב קדמון משותף אחרון לפני כ־3,541 שנה לפי שיטת Gamma באותו מאמר, עם סימן לברירה חיובית. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  sev:'M694V/M694V נקשר להופעה מוקדמת יותר, ליותר דלקת פרקים, ליותר אודם דמוי שושנה ולצורך במינון קולכיצין גבוה יותר מאשר גנוטיפים שכיחים אחרים (Shinar 2000). <sup class="c" data-ref="Shinar2000" title="Source 239">239</sup> אצל 90 חולים ארמנים, הומוזיגוטיות ל־M694V נקשרה לעמילואידוזיס כלייתית (Cazeneuve 1999) <sup class="c" data-ref="Cazeneuve1999" title="Source 33">33</sup>, אבל ברישום הטורקי של 2,838 חולים לא נמצא קשר כזה (Tunca 2005). <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup> בקרב הומוזיגוטים ל־M694V, מין זכר והתקפים של דלקת פרקים העלו את הסיכון לעמילואידוזיס. <sup class="c" data-ref="GershoniBaruch2003" title="Source 78">78</sup>'},
 {id:'M680I',aa:680,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'מרוכז בחולים ערבים. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup> הוא מהווה 14.4% מהאללים הנושאים וריאנט אצל חולים טורקים <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup> ו־19.7% אצל חולים יוונים <sup class="c" data-ref="Giaglis2007" title="Source 81">81</sup>; ו־5% מהטורקים הבריאים נושאים אותו. <sup class="c" data-ref="Yilmaz2001" title="Source 282">282</sup> שני שינויים שונים ב־DNA יוצרים את אותו שינוי בחלבון (c.2040G>C ו־c.2040G>A). <sup class="c" data-ref="Infevers2026" title="Source 108">108</sup>',
  sev:'גנוטיפים עם שני וריאנטים בנקודה החמה שבעמדות 680 עד 694 נוטים להיות חמורים; לפי SHARE, שני וריאנטים שכיחים, במיוחד בעמדות 680 עד 694, מנבאים מחלה חמורה יותר (רמה B). <sup class="c" data-ref="Touitou2001,Giancane2015" title="Source 82,260">82,260</sup>'},
 {id:'M694I',aa:694,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'מרוכז בחולים ערבים. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup> ביפן הגנוטיפים השכיחים הם E148Q/M694I ו־M694I ללא וריאנט שני, והמחלה קלה יותר. <sup class="c" data-ref="Migita2012" title="Source 173">173</sup>',
  sev:'אחד מארבעת הווריאנטים באקסון 10 שהוגדרו "פתוגניים בבירור". <sup class="c" data-ref="Shinar2012" title="Source 240">240</sup> אותה עמדה כמו M694V, אבל חומצת אמינו מחליפה אחרת.'},
 {id:'K695R',aa:695,cls:'VUS',ex:'אקסון 10 · B30.2',
  pop:'שכיחות אללית של כ־1% עד 1.6% אצל אירופים ופינים ב־gnomAD. <sup class="c" data-ref="gnomAD" title="Source 83">83</sup> נמצא גם אצל יהודים אשכנזים. <sup class="c" data-ref="Aksentijevich1999" title="Source 3">3</sup>',
  sev:'נקשר למחלה קלה או לחדירות חלקית. <sup class="c" data-ref="Lancieri2023,Aksentijevich1999" title="Source 3,145">3,145</sup> הנחיות ישנות יותר כללו אותו, יחד עם A744S ו־R761H, בין הווריאנטים של הנקודה החמה. <sup class="c" data-ref="Shinar2012" title="Source 240">240</sup>'},
 {id:'V726A',aa:726,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'שכיח אצל יהודים אשכנזים ויוצאי עיראק ואצל ערבים (הווריאנט השכיח ביותר בחולים ערבים). <sup class="c" data-ref="GershoniBaruch2001,Lancieri2023" title="Source 77,145">77,145</sup> מיהודי עיראק, 12.8% נושאים אותו. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup> זה הווריאנט היחיד שנמצא בשיווי משקל הרדי-ויינברג בנתונים המאוחדים, מה שמרמז שהוא העתיק ביותר; גילו המשוער כ־2,192 שנה לפי מודל מרקוב חבוי, או אב קדמון משותף אחרון לפני כ־3,372 שנה לפי שיטת Gamma. <sup class="c" data-ref="Papadopoulos2008,Park2020" title="Source 206,208">206,208</sup>',
  sev:'V726A/V726A ו־M694V/V726A היו בין הגנוטיפים עם הופעה מאוחרת יותר ופחות דלקת פרקים לעומת M694V/M694V. <sup class="c" data-ref="Shinar2000" title="Source 239">239</sup> רוב האנשים עם V726A/E148Q נשארים ללא תסמינים. <sup class="c" data-ref="GershoniBaruch2001" title="Source 77">77</sup>'},
 {id:'A744S',aa:744,cls:'LB',ex:'אקסון 10 · B30.2',
  pop:'שכיחות אללית של כ־1% אצל יהודים אשכנזים ב־gnomAD. <sup class="c" data-ref="gnomAD" title="Source 83">83</sup>',
  sev:'ככל הנראה שפיר ב־Infevers ב־2026-10-16, אף ש־Shinar 2012 עדיין מנה אותו בין וריאנטי הנקודה החמה שיש לדווח עליהם. דוגמה ברורה לכך שהסיווגים משתנים עם הזמן. <sup class="c" data-ref="Infevers2026,Shinar2012" title="Source 108,240">108,240</sup>'},
 {id:'R761H',aa:761,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'נמנה עם וריאנטי אקסון 10 שהפאנלים הסטנדרטיים מדווחים עליהם. <sup class="c" data-ref="Shinar2012" title="Source 240">240</sup> המקורות המחקריים שמשמשים כאן אינם מוסרים את שכיחותו באוכלוסייה.',
  sev:'Shinar 2012 קיבץ אותו עם A744S ו־K695R; ב־Infevers הוא סווג כפתוגני ב־2026-10-16. <sup class="c" data-ref="Shinar2012,Infevers2026" title="Source 108,240">108,240</sup>'},
 {id:'E148Q',aa:148,cls:'VUS',ex:'אקסון 2',
  pop:'הווריאנט השכיח ביותר אצל יהודים אשכנזים. <sup class="c" data-ref="Lancieri2023" title="Source 145">145</sup> בקרב טורקים בריאים 12% נושאים אותו, אבל בקרב חולים טורקים הוא רק 3.6% מהאללים. <sup class="c" data-ref="Yilmaz2001" title="Source 282">282</sup> שכיחות אללית של כ־29% אצל מזרח אסייתים ב־gnomAD; עד 20% במדינות אסיה. <sup class="c" data-ref="gnomAD,Shinar2012" title="Source 83,240">83,240</sup> אין בו סימן לברירה חיובית, בניגוד ל־M694V ול־V726A. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>',
  sev:'הווריאנט הקל ביותר ובעל החדירות הנמוכה ביותר. <sup class="c" data-ref="Touitou2001" title="Source 260">260</sup> SHARE: כאשר E148Q הוא הווריאנט היחיד, הוא אינו תומך באבחנה של FMF (רמה B). <sup class="c" data-ref="Giancane2015,Ozen2017" title="Source 82,200">82,200</sup>'},
 {id:'S242R',aa:242,cls:'LP',ex:'אקסון 2 · מקשר אחרי PYD',
  pop:'נמצא במשפחות עם מחלה בתורשה דומיננטית. <sup class="c" data-ref="Masters2016" title="Source 169">169</sup>',
  sev:'לא FMF. עותק אחד מסלק אתר קישור של 14-3-3 על הפירין וגורם ל־PAAND, מחלה אוטו-דלקתית הקשורה לפירין עם דרמטוזיס נויטרופילית (OMIM 608068), שמגיבה לטיפול המכוון נגד IL-1 ואינה מתנהגת כמו FMF שמגיבה לקולכיצין. <sup class="c" data-ref="Masters2016,Schnappauf2019,UniProtO15553" title="Source 169,234,267">169,234,267</sup> ראו <a href="#mech" data-go="mech">פירין, בהנפשה</a>.'}
];
const GN_Z=[
 {from:0,at:.1,k:'רמה 1 · כרומוזום',t:'כרומוזום 16',
  txt:'ב־1992 מיקם ניתוח תאחיזה ב־27 משפחות יהודיות שאינן אשכנזיות את הגן של FMF על הזרוע הקצרה (p) של כרומוזום 16, עם ציון LOD מרבי של 19.86. <sup class="c" data-ref="Pras1992" title="Source 214">214</sup>',
  pt:'לכל אדם יש שני עותקים של כרומוזום 16, אחד מכל הורה. הגן של FMF יושב סמוך לקצה הזרוע הקצרה שלו.',
  hook:'מיקום <i>MEFV</i>: <b>16p13.3</b>. <sup class="c" data-ref="Lancieri2023" title="Source 145">145</sup>'},
 {from:.2,at:.3,k:'רמה 2 · פס',t:'הפס 16p13.3',
  txt:'ב־1997 שיבטו שני קונסורציומים את הגן, כל אחד בנפרד. הקונסורציום הצרפתי ל־FMF קרא לחלבון מרנוסטרין, על שם <i>mare nostrum</i>. הקונסורציום הבין־לאומי ל־FMF קרא לו פירין, ומצא שהתעתיק שלו, באורך 3.7 kb, מתבטא כמעט רק בגרנולוציטים. האזור של <i>MEFV</i> כולו הוא כ־15 kb. <sup class="c" data-ref="FrenchFMF1997,IntFMF1997,Booty2009" title="Source 26,71,109">26,71,109</sup>',
  pt:'שני צוותי מחקר מצאו את הגן באותה שנה ונתנו לחלבון שני שמות.',
  hook:'פירין = מרנוסטרין, מיוצר בעיקר ב<b>גרנולוציטים</b> (נויטרופילים).'},
 {from:.4,at:.5,k:'רמה 3 · גן',t:'MEFV: 10 אקסונים',
  txt:'ל־<i>MEFV</i> יש 10 אקסונים. אקסון 10 מקודד את תחום B30.2 שבקצה ה־C של החלבון, ונושא את רוב הווריאנטים שגורמים ל־FMF. הסריקה הסטנדרטית מכסה את אקסונים 2, 3, 5 ו־10. <sup class="c" data-ref="Lancieri2023,Touitou2001,Shinar2012" title="Source 145,240,260">145,240,260</sup>',
  pt:'הגן מחולק ל־10 חלקים מקודדים. רוב השינויים שגורמים למחלה יושבים בחלק האחרון, אקסון 10.',
  hook:'הנקודה החמה = <b>אקסון 10</b>: M694V, M680I, V726A, M694I.'},
 {from:.6,at:.7,k:'רמה 4 · חלבון',t:'פירין: 781 חומצות אמינו',
  txt:'קואורדינטות UniProt: תחום הפירין (PYD) בעמדות 1 עד 92, אזור בסיסי דמוי bZIP בעמדות 266 עד 280, אצבע אבץ מסוג B-box בעמדות 370 עד 412, סליל מפותל (CC) בעמדות 413 עד 442, ו־B30.2/SPRY בעמדות 580 עד 775. סקירות מציינות גבולות מעט שונים, למשל B30.2 בעמדות 597 עד 776. ה־PYD נקשר לחלבון המתווך ASC; הווריאנטים של FMF מתקבצים ב־B30.2. <sup class="c" data-ref="UniProtO15553,Lancieri2023,Richards2001" title="Source 145,223,267">145,223,267</sup> האופן שבו זה מפעיל את האזעקה מוסבר בפרק <a href="#mech" data-go="mech">פירין, בהנפשה</a>.',
  pt:'לחלבון יש חלקים נפרדים. הקצה הקדמי (PYD) מתחבר למנגנון האזעקה. הקצה האחורי (B30.2) הוא המקום שבו מתקבצים השינויים של FMF.',
  hook:'הווריאנטים של FMF הם <b>מגבירי תפקוד</b>: בעכברים, השבתה של גן הפירין לא גרמה למחלה, ואילו וריאנטים אנושיים ב־B30.2 גרמו לדלקת המונעת על ידי IL-1β. <sup class="c" data-ref="Chae2011" title="Source 37">37</sup>'},
 {from:.8,at:1,k:'רמה 5 · וריאנטים',t:'הקישו על סיכה',
  txt:'חמישה וריאנטים מייסדים (M694V, V726A, M694I, M680I, E148Q) היוו 74% מהכרומוזומים של FMF בחולים טיפוסיים ממוצא ארמני, ערבי, יהודי וטורקי. צבע הסיכה מציג את הסיווג ב־Infevers ב־2026-10-16. הסיווגים משתנים ככל שמצטברות ראיות. <sup class="c" data-ref="Touitou2001,Infevers2026" title="Source 108,260">108,260</sup>',
  pt:'כל סיכה היא שינוי של אות אחת בחלבון. M694V פירושו שהמתיונין בעמדה 694 הוחלף בוואלין.',
  hook:'מבנה השם: חומצת האמינו המקורית, העמדה, חומצת האמינו החדשה. <b>M694V</b> = Met694Val.'}
];
const GN_CROSS=[
 {id:'cc',n:'נשא × נשא',a:['V','+'],b:['V','+'],la:'נשא',lb:'נשא',
  txt:'25% עם שני וריאנטים, 50% נשאים, 25% בלי אף אחד מהם. לא כל ילד עם שני וריאנטים יחלה, כי החדירות אינה מלאה (פנוטיפ III). <sup class="c" data-ref="GeneReviews,Kogan2001" title="Source 76,133">76,133</sup>'},
 {id:'ca',n:'נשא × שני וריאנטים',a:['V','V'],b:['V','+'],la:'שני וריאנטים',lb:'נשא',
  txt:'50% עם שני וריאנטים, 50% נשאים. FMF מופיעה אז בכל דור ועשויה להיראות דומיננטית: פסאודו-דומיננטיות. <sup class="c" data-ref="Cazeneuve1999" title="Source 33">33</sup>'},
 {id:'an',n:'שני וריאנטים × לא נשא',a:['V','V'],b:['+','+'],la:'שני וריאנטים',lb:'לא נשא',
  txt:'100% נשאים, ואף ילד אינו עם שני וריאנטים. נשאים הם בדרך כלל בריאים, אף שלחלק מהאנשים עם וריאנט אחד יש התקפים דמויי FMF (ראו את הכרטיסים למטה). <sup class="c" data-ref="Booty2009,Jeru2013" title="Source 26,112">26,112</sup>'},
 {id:'cn',n:'נשא × לא נשא',a:['V','+'],b:['+','+'],la:'נשא',lb:'לא נשא',
  txt:'50% נשאים, 50% בלי וריאנט, ואף ילד אינו עם שני וריאנטים.'},
 {id:'dn',n:'וריאנט בפעולה דומיננטית × לא נשא',a:['D','+'],b:['+','+'],la:'וריאנט אחד, M694del או T577',lb:'לא נשא',
  txt:'50% יורשים את הווריאנט בעל הפעולה הדומיננטית ועלולים לפתח מחלה מהעותק היחיד הזה, בחדירות משתנה. M694del גורם ל־FMF דומיננטית (Booth 2000; ‏21 חולים בבריטניה, Rowczenio 2015). וריאנטים הטרוזיגוטיים בעמדה T577 גורמים למחלה אוטו-דלקתית דומיננטית שהגיבה לקולכיצין (Stoffels 2014). <sup class="c" data-ref="Booth2000,Rowczenio2015,Stoffels2014" title="Source 25,227,250">25,227,250</sup>'}
];
const GN_P=[
 {from:0,at:.1,k:'שלב 1 · ההורים',t:'שני עותקים לכל אחד',
  txt:'לכל אדם יש שני עותקים של <i>MEFV</i>, אחד על כל כרומוזום 16. FMF היא באופן קלאסי מחלה בתורשה אוטוזומלית רצסיבית: בדרך כלל המחלה מופיעה רק כשיש וריאנט בשני העותקים. <sup class="c" data-ref="GeneReviews,FrenchFMF1997" title="Source 71,76">71,76</sup>',
  pt:'לכל אדם יש שני עותקים של הגן. בדרך כלל שניהם צריכים להיות משונים כדי שתהיה FMF.',
  hook:'רצסיבית: צריך שתי פגיעות. נשאים (פגיעה אחת) הם בדרך כלל בריאים.'},
 {from:.15,at:.34,k:'שלב 2 · גמטות',t:'כל הורה מעביר עותק אחד',
  txt:'ביצית וזרע נושאים רק עותק אחד מכל כרומוזום. איזה עותק יקבל הילד נקבע בסיכוי של 50:50, ומחדש בכל היריון.',
  pt:'כל הורה מעביר אחד משני העותקים שלו, באקראי.',
  hook:'כל היריון הוא הטלת מטבע בלתי תלויה מצד כל הורה. ילד אחד חולה אינו משנה את הסיכויים לילד הבא.'},
 {from:.38,at:.64,k:'שלב 3 · הילדים',t:'ארבעה צירופים בסבירות שווה',
  txt:'כל משבצת מצמידה עותק אחד מכל הורה. ארבע המשבצות שוות בסבירותן, ולכן כל אחת היא 25% מהתוצאות האפשריות לכל ילד.',
  pt:'יש ארבע דרכים, שוות בסבירותן, שבהן העותקים יכולים להתחבר.',
  hook:'טבלת פאנט מציגה <b>הסתברויות לכל ילד</b>, לא כמה ילדים מכל סוג יהיו במשפחה.'},
 {from:.8,at:.98,k:'שלב 4 · הסיכויים',t:'מה הטבלה מנבאת',txt:'',pt:'האחוזים הם הסיכויים בכל היריון.',
  hook:'פסאודו-דומיננטיות: הורה חולה × נשא נותן <b>50%</b> ילדים עם שני וריאנטים, ולכן מחלה רצסיבית יכולה להיראות דומיננטית. <sup class="c" data-ref="Cazeneuve1999" title="Source 33">33</sup>'}
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
    const PIN={E148Q:{x:ax(148),y0:BY+22,hy:N?BY+56:290,lx:ax(148),ly:N?BY+72:304,a:'middle',sub:'⁧אקסון 2⁩'},
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
    s+=`<g style="opacity:${f1(o1)}"><text x="${GX(60)}" y="22" class="t-lbl">⁧כרומוזום 16⁩</text>`;
    s+=`<rect x="${f1(GX(60))}" y="32" width="${f1(GW(232))}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><rect x="${f1(GX(306))}" y="32" width="${f1(GW(374))}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
    [[92,14],[140,10],[186,18],[236,12],[340,16],[398,22],[470,12],[520,26],[592,14],[640,12]].forEach(([x,w])=>s+=`<rect x="${f1(GX(x))}" y="33" width="${f1(GW(w))}" height="20" style="fill:var(--muted);opacity:.35"/>`);
    s+=`<path d="M${f1(GX(290))} 36L${f1(GX(299))} 43L${f1(GX(308))} 36M${f1(GX(290))} 50L${f1(GX(299))} 43L${f1(GX(308))} 50" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<text x="${f1(GX(N?150:176))}" y="70" class="t-xs t-mid">⁧זרוע קצרה (p)⁩</text><text x="${f1(GX(493))}" y="70" class="t-xs t-mid">⁧זרוע ארוכה (q)⁩</text><text x="${f1(GX(299))}" y="70" class="t-xs t-mid">צנטרומר</text>`;
    s+=`<rect x="${f1(GX(58))}" y="29" width="${f1(N?15:20)}" height="28" rx="4" style="fill:none;stroke:var(--terra);stroke-width:2.2"/></g>`;
    /* L2 band */
    if(o2>0){s+=`<g style="opacity:${f1(o2)}"><path d="M${f1(GX(60))} 57L${f1(GX(78))} 57L${f1(GX(680))} 98L${f1(GX(60))} 98Z" style="fill:var(--terra);opacity:.08"/>`;
      s+=`<text x="${f1(GX(60))}" y="92" class="t-sm" style="fill:var(--terra)">⁧16p13.3 · קצה הזרוע הקצרה⁩</text>`;
      s+=`<line x1="${f1(GX(60))}" y1="105" x2="${f1(GX(680))}" y2="105" style="stroke:var(--muted);stroke-width:2"/>`;
      [[90,30],[150,18],[200,40],[268,22],[420,26],[470,40],[540,20],[590,34],[640,22]].forEach(([x,w])=>s+=`<rect x="${f1(GX(x))}" y="100" width="${f1(GW(w))}" height="10" rx="2" style="fill:var(--panel-2);stroke:var(--line)"/>`);
      s+=`<rect x="${f1(GX(330))}" y="97" width="${f1(GW(56))}" height="16" rx="3" style="fill:var(--terra)"/><text x="${f1(GX(358))}" y="128" class="t-sm t-mid" style="fill:var(--terra);font-weight:600">⁧MEFV · כ־15 kb⁩</text></g>`}
    /* L3 exons */
    if(o3>0){s+=`<g style="opacity:${f1(o3)}"><path d="M${f1(GX(330))} 113L${f1(GX(386))} 113L${f1(GX(680))} 158L${f1(GX(60))} 158Z" style="fill:var(--terra);opacity:.07"/>`;
      s+=`<line x1="${f1(GX(60))}" y1="170" x2="${f1(GX(680))}" y2="170" style="stroke:var(--muted);stroke-width:1.5"/>`;
      EX.forEach(([x,w],i)=>{const hi=i===9;s+=`<rect x="${f1(GX(x))}" y="160" width="${f1(GW(w))}" height="20" rx="3" style="fill:${hi?'var(--terra)':'var(--sea)'};opacity:${hi?1:.75}"/><text x="${f1(GX(x)+GW(w)/2)}" y="194" class="t-xs t-mid" ${hi?'style="fill:var(--terra);font-weight:700"':''}>${i+1}</text>`});
      s+=`<text x="${f1(GX(635))}" y="154" class="t-xs t-mid" style="fill:var(--terra);font-weight:700">⁧אקסון 10⁩</text><text x="${f1(GX(60))}" y="154" class="t-xs">⁧אקסונים (גדלים סכמטיים)⁩</text></g>`}
    /* L4 protein */
    if(o4>0){s+=`<g style="opacity:${f1(o4)}">`;
      s+=`<path d="M${f1(GX(590))} 180L${f1(ax(580))} ${BY}M${f1(GX(680))} 180L${f1(ax(775))} ${BY}" style="stroke:var(--terra);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      s+=`<text x="${f1(GX(60))}" y="${PY}" class="t-sm">⁧פירין · 781 חומצות אמינו⁩</text>`;
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
      s+=`<text x="${f1(IX(670))}" y="${IY+64}" class="t-xs">⁧הנקודה החמה ב־B30.2, עמדות 670–770 (בהגדלה)⁩</text>`;
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
  const stop=playWire(rg,$('#gnPlay'),draw,15000,'הפעלה חוזרת','gene');
  const setSt=stepWire($('#gnSteps'),GN_Z,rg,draw,stop);
  function pick(id){sel=id;const V=GN_VARS.find(v=>v.id===id);
    $$('[data-vc]',$('#gnChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.vc===id));
    $('#gnVar').innerHTML=`<span class="kicker">${V.ex} · עמדה ${V.aa}</span><h4>${V.id} <span class="gn-cls ${V.cls}">Infevers, נקרא ב־2026-10-16: ${GN_CLSN[V.cls]}</span></h4><dl><dt>היכן הוא שכיח</dt><dd>${V.pop}</dd><dt>חומרה והערות</dt><dd>${V.sev}</dd></dl>`;
    if(+rg.value<.84){rg.value=1}draw(+rg.value)}
  $('#gnChips').innerHTML=GN_VARS.map(v=>`<button class="btn" data-vc="${v.id}" aria-pressed="false"><span style="color:${GN_CLSC[v.cls]}">●</span> ${v.id}</button>`).join('');
  $('#gnLegend').innerHTML=['P','LP','VUS','LB'].map(c=>`<span><i style="background:${GN_CLSC[c]}"></i>${GN_CLSN[c]}</span>`).join('');
  $('#gnChips').addEventListener('click',e=>{const b=e.target.closest('[data-vc]');if(b){stop();pick(b.dataset.vc)}});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-v]');if(g){stop();pick(g.dataset.v)}});
  draw(+rg.value);
  (()=>{const V=GN_VARS[0];$$('[data-vc]',$('#gnChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.vc===V.id));
    $('#gnVar').innerHTML=`<span class="kicker">${V.ex} · עמדה ${V.aa}</span><h4>${V.id} <span class="gn-cls ${V.cls}">Infevers, נקרא ב־2026-10-16: ${GN_CLSN[V.cls]}</span></h4><dl><dt>היכן הוא שכיח</dt><dd>${V.pop}</dd><dt>חומרה והערות</dt><dd>${V.sev}</dd></dl>`})();

  /* ---------- 2. Punnett ---------- */
  const ps=$('#gnPun'),rp=$('#gnPT');let X=GN_CROSS[0];
  const chip=(x,y,a,r=14)=>{const c=a==='V'?'var(--terra)':a==='D'?'var(--bad)':'var(--sea)';return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${c}"/><text x="${f1(x)}" y="${f1(y+4.5)}" class="t-lbl t-mid" style="fill:var(--panel)">${a==='D'?'Δ':a}</text>`};
  const kind=(a,b)=>(a==='D'||b==='D')?'dom':(a==='V'&&b==='V')?'two':(a==='V'||b==='V')?'car':'none';
  const KN={two:['שני וריאנטים','var(--terra-soft)','var(--terra)'],car:['נשא','var(--gold-soft)','var(--gold)'],none:['בלי וריאנט','var(--sea-soft)','var(--sea)'],dom:['וריאנט דומיננטי','var(--bad-soft)','var(--bad)']};
  function drawP(t){
    /* narrow: both parents stack above a square grid, and the odds move underneath */
    const N=vb(ps,'720 400','400 668');
    const CX=N?[205,315]:[290,410],RY=N?[265,375]:[197,292],HX=N?118:190,HY=N?188:128;
    const GX0=N?150:230,GY0=N?210:150,CW=N?110:120,CH=N?110:95;
    const P1=N?[[175,48],[225,48]]:[[325,52],[375,52]],P2=N?[[175,114],[225,114]]:[[55,245],[105,245]];
    const B1=N?[140,30]:[290,34],B2=N?[140,96]:[20,227];
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<rect x="${B1[0]}" y="${B1[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B1[0]+60}" y="${B1[1]-10}" class="t-sm t-mid">⁧הורה 1: ${X.la}⁩</text>`;
    s+=`<rect x="${B2[0]}" y="${B2[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B2[0]+60}" y="${B2[1]-10}" class="t-sm t-mid">⁧הורה 2: ${X.lb}⁩</text>`;
    const g=ease(ramp(t,.15,.34));
    /* grid */
    const go=ramp(t,.1,.18);
    s+=`<g style="opacity:${f1(go)}">${N?`<text x="18" y="192" class="t-xs">⁧גמטות מהורה 1⁩</text><text x="${HX}" y="310" class="t-xs t-mid">גמטות</text><text x="${HX}" y="321" class="t-xs t-mid">⁧מהורה 2⁩</text>`:`<text x="350" y="104" class="t-xs t-mid">⁧גמטות מהורה 1⁩</text><text x="${HX}" y="160" class="t-xs t-mid">גמטות</text><text x="${HX}" y="171" class="t-xs t-mid">⁧מהורה 2⁩</text>`}`;
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
      s+=`<g style="opacity:${f1(op)}"><text x="${ox}" y="${N?456:160}" class="t-sm">לכל ילד</text>`;
      ['dom','two','car','none'].filter(k=>cnt[k]).forEach((k,i)=>{const y=N?490+i*44:196+i*58,pc=cnt[k]*25*ease(ramp(t,.84,.97));
        s+=`<text x="${ox}" y="${y}" class="t-big" style="fill:${KN[k][2]};font-size:26px">${Math.round(pc)}%</text><text x="${N?96:ox}" y="${N?y:y+16}" class="t-xs">${KN[k][0]}</text>`;
        const bx=N?200:556,bw=N?130:56;
        s+=`<rect x="${bx}" y="${y-14}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y-14}" width="${f1(bw*pc/100)}" height="10" rx="5" style="fill:${KN[k][2]}"/>`});
      s+='</g>'}
    /* legend */
    const ly=N?624:378,lx0=N?26:40;
    s+=chip(lx0,ly,'V',9)+`<text x="${lx0+14}" y="${ly+4}" class="t-xs">⁧וריאנט FMF⁩</text>`+chip(150,ly,'+',9)+`<text x="164" y="${ly+4}" class="t-xs">עותק רגיל</text>`;
    if(X.id==='dn')s+=chip(N?lx0:260,N?ly+24:ly,'D',9)+`<text x="${(N?lx0:260)+14}" y="${(N?ly+24:ly)+4}" class="t-xs">⁧וריאנט בפעולה דומיננטית (M694del, T577)⁩</text>`;
    ps.innerHTML=s;
    const p=phaseOf(GN_P,t);setP(p);const P=Object.assign({},GN_P[p]);if(p===3)P.txt=X.txt;$('#gnPNote').innerHTML=noteHTML(P);
  }
  const stopP=playWire(rp,$('#gnPPlay'),drawP,12000,'הפעלה חוזרת','gene');
  const setP=stepWire($('#gnPSteps'),GN_P,rp,drawP,stopP);
  $('#gnCross').innerHTML=GN_CROSS.map((c,i)=>`<button class="btn" data-cx="${i}" aria-pressed="${i===0}">${c.n}</button>`).join('');
  const readP=()=>$('#gnPRead').innerHTML=`<span><b>${X.n}</b></span><span>${X.txt}</span>`;
  $('#gnCross').addEventListener('click',e=>{const b=e.target.closest('[data-cx]');if(!b)return;X=GN_CROSS[+b.dataset.cx];
    $$('[data-cx]',$('#gnCross')).forEach(x=>x.setAttribute('aria-pressed',x===b));readP();drawP(+rp.value)});
  readP();drawP(+rp.value);

  /* ---------- 3. read a genetic result ---------- */
  const s1=$('#gnA1'),s2=$('#gnA2');
  const opts=GN_AL.map(([n])=>`<option value="${n}">${n==='none'?'לא נמצא וריאנט':n}</option>`).join('');
  s1.innerHTML=opts;s2.innerHTML=opts;s1.value='M694V';s2.value='none';
  const ST=[['פתוגני',12,'var(--bad)'],['ככל הנראה פתוגני',38,'var(--terra)'],['VUS',176,'var(--warn)'],['ככל הנראה שפיר',143,'var(--good)'],['שפיר',14,'var(--sea)'],['לא מסווג',20,'var(--muted)'],['לא מוכרע',9,'var(--line)']];
  $('#gnStack').innerHTML=ST.map(([n,v,c])=>`<i style="width:${(v/412*100).toFixed(2)}%;background:${c}" title="${n}: ${v}"></i>`).join('');
  $('#gnStackLeg').innerHTML=ST.map(([n,v,c])=>`<span><i style="background:${c}"></i>${n} ${v}</span>`).join('')+'<span><sup class="c" data-ref="Infevers2026" title="Source 108">108</sup></span>';
  const grp=c=>(c==='P'||c==='LP')?'path':c==='VUS'?'vus':'out';
  function interp(){
    const A=GN_AL.find(x=>x[0]===s1.value),B=GN_AL.find(x=>x[0]===s2.value);
    const ga=grp(A[1]),gb=grp(B[1]),gs=[ga,gb].sort().join('+');
    let v,cl,txt;
    if(gs==='path+path'){cl='conf';v=A[0]===B[0]?'גנוטיפ מאשר (הומוזיגוט)':'גנוטיפ מאשר (הטרוזיגוט מורכב, אם הווריאנטים בטרנס)';
      txt='שני וריאנטים פתוגניים או ככל הנראה פתוגניים, אחד בכל עותק (דו-אללי). בקריטריונים של Eurofever/PRINTO משנת 2019, ממצא זה יחד עם <b>לפחות 1 מתוך 4</b> פריטים קליניים (אפיזודות של 1 עד 3 ימים, דלקת פרקים, כאב בחזה, כאב בטן) מסווג כ־FMF, בתנאי ששני תנאי סף מתקיימים: סמני שלב חריף מוגברים בזמן התלקחויות, ושיקול של סיבות אחרות כשיש לפחות 6 חודשים של פעילות חוזרת. <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>'+(A[0]!==B[0]?' שני וריאנטים שונים נספרים רק אם הם יושבים על עותקים שונים (בטרנס); בדיקה של ההורים היא הדרך המקובלת להראות זאת.':'')}
    else if(gs==='path+vus'){cl='non';v='גנוטיפ לא מאשר: פתוגני + VUS';txt='וריאנט פתוגני אחד ועוד וריאנט בעל משמעות לא ודאית, בטרנס. אז הקריטריונים דורשים <b>לפחות 2 מתוך 4</b> פריטים קליניים. <sup class="c" data-ref="Gattorno2019,Lancieri2023" title="Source 75,145">75,145</sup>'}
    else if(gs==='vus+vus'){cl='non';v='גנוטיפ לא מאשר: שני VUS';txt='שני וריאנטים בעלי משמעות לא ודאית, אחד בכל עותק. הקריטריונים דורשים <b>לפחות 2 מתוך 4</b> פריטים קליניים. לפי GeneReviews, שני VUS אינם מבססים FMF וגם אינם שוללים אותה. <sup class="c" data-ref="Gattorno2019,GeneReviews" title="Source 75,76">75,76</sup>'}
    else if(gs==='out+path'){cl='non';v='גנוטיפ לא מאשר: וריאנט פתוגני יחיד';txt='וריאנט פתוגני אחד, בלי וריאנט שני שנספר בקריטריונים. הקריטריונים דורשים <b>לפחות 2 מתוך 4</b> פריטים קליניים. מעבדה אחת מסכמת זאת כ"לכל הפחות נשא", שעדיין עשוי לסבול מתסמינים. <sup class="c" data-ref="Gattorno2019,ARUP2023" title="Source 6,75">6,75</sup>'}
    else if(gs==='out+vus'){cl='none';v='גנוטיפ שאינו נספר: VUS אחד בלבד';txt='VUS יחיד אינו גנוטיפ מאשר וגם אינו גנוטיפ לא מאשר. הסיווג יתבסס על הסט הקליני בלבד (לפחות 6 מתוך 9 פריטים). תוצאה של VUS אינה חד-משמעית. <sup class="c" data-ref="Gattorno2019,ARUP2023" title="Source 6,75">6,75</sup>'}
    else{cl='none';v='אין וריאנט שנספר';txt='וריאנטים שפירים וככל הנראה שפירים אינם נכללים בקריטריונים. כשאין וריאנט פתוגני, FMF פחות סבירה אך אינה נשללת: כ־10% עד 20% מחולי FMF אינם נושאים וריאנט ב־<i>MEFV</i>. הסט הקליני בלבד (לפחות 6 מתוך 9 פריטים) עדיין יכול לסווג FMF. <sup class="c" data-ref="Gattorno2019,BenZvi2015,ARUP2023" title="Source 6,19,75">6,19,75</sup>'}
    const ex=[];const has=n=>A[0]===n||B[0]===n;
    if(A[0]==='M694V'&&B[0]==='M694V')ex.push('SHARE: להומוזיגוטים ל־M694V יש "סבירות גבוהה מאוד" למחלה חמורה (רמה B), ומי שאין להם תסמינים צריכים להיות במעקב צמוד (רמה A). <sup class="c" data-ref="Giancane2015,Ozen2017" title="Source 82,200">82,200</sup>');
    if(has('M694del'))ex.push('M694del יכול לפעול באופן דומיננטי: עותק יחיד גרם ל־FMF בתורשה אוטוזומלית דומיננטית, בחדירות משתנה. <sup class="c" data-ref="Booth2000,Rowczenio2015" title="Source 25,227">25,227</sup>');
    if(has('E148Q')&&(gs==='out+vus'||(A[0]==='E148Q'&&B[0]==='E148Q')))ex.push('SHARE: כאשר E148Q הוא הווריאנט היחיד, הוא אינו תומך באבחנה של FMF (רמה B). <sup class="c" data-ref="Giancane2015,Ozen2017" title="Source 82,200">82,200</sup>');
    if(has('E148Q')||has('K695R'))ex.push('E148Q ו־K695R קשורים למחלה קלה או לחדירות נמוכה. <sup class="c" data-ref="Touitou2001,Lancieri2023" title="Source 145,260">145,260</sup>');
    if(has('A744S')||has('P369S'))ex.push('A744S ו־P369S הם ככל הנראה שפירים ב־Infevers 2026, ולכן הקריטריונים מתעלמים מהם. רשימות ישנות יותר התייחסו אליהם אחרת. <sup class="c" data-ref="Infevers2026,Shinar2012" title="Source 108,240">108,240</sup>');
    const row=x=>`<div><b style="font-family:var(--mono);min-width:5.5em">${x[0]==='none'?'—':x[0]}</b><span class="gn-cls ${x[1]}">${x[0]==='none'?'לא נמצא וריאנט':GN_CLSN[x[1]]}</span></div>`;
    $('#gnOut').innerHTML=`<div class="gn-al"><span class="kicker">הסיווג ב־Infevers היום</span>${row(A)}${row(B)}</div>
      <div class="gn-verdict ${cl}"><span class="kicker">גנוטיפ לפי Eurofever/PRINTO 2019</span><b class="v">${v}</b><p>${txt}</p></div>
      ${ex.length?`<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">${ex.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
      <div class="pt"><b>במילים פשוטות</b>FMF מאובחנת לפי התסמינים; הבדיקה הגנטית תומכת באבחנה אבל אינה יכולה לשלול אותה. אצל כ־10% עד 20% מהאנשים עם FMF טיפוסית לא נמצא וריאנט, ואצל עד כ־25% נמצא רק וריאנט אחד. <sup class="c" data-ref="Giancane2015,BenZvi2015,GeneReviews" title="Source 19,76,82">19,76,82</sup></div>
      <div class="hook"><b>לבחינה</b>הקריטריונים של Eurofever/PRINTO הם קריטריוני <b>סיווג</b> למחקר, לא בדיקה אבחנתית למטופל יחיד. סיווגי הווריאנטים משתנים עם הזמן: הסיווגים המוצגים כאן הם אלה שהופיעו ב־Infevers ב־2026-10-16. <sup class="c" data-ref="Gattorno2019,Infevers2026" title="Source 75,108">75,108</sup></div>
      <p><a href="#dx" data-go="dx">נסו את מחשבון הקריטריונים בפרק אבחון וקריטריונים ←</a></p>`;
    /* chromosome sketch */
    const rx=a=>70+a/781*270;let s='';
    [[A,40,'⁧עותק 1⁩'],[B,92,'⁧עותק 2⁩']].forEach(([x,y,l])=>{s+=`<text x="8" y="${y+4}" class="t-xs">${l}</text><rect x="70" y="${y-7}" width="270" height="14" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<rect x="${f1(rx(580))}" y="${y-7}" width="${f1(rx(775)-rx(580))}" height="14" rx="3" style="fill:var(--terra);opacity:.18"/>`;
      if(x[0]==='none')s+=`<text x="205" y="${y+4}" class="t-xs t-mid">לא נמצא וריאנט</text>`;
      else{const c=GN_CLSC[x[1]];s+=`<line x1="${f1(rx(x[2]))}" x2="${f1(rx(x[2]))}" y1="${y-7}" y2="${y-16}" style="stroke:${c};stroke-width:2"/><circle cx="${f1(rx(x[2]))}" cy="${y}" r="6" style="fill:${c}"/><text x="${f1(Math.min(rx(x[2]),316))}" y="${y-20}" class="t-xs t-mid" style="fill:${c};font-weight:700">${x[0]}</text>`}});
    s+=`<text x="${f1((rx(580)+rx(775))/2)}" y="116" class="t-xs t-mid">⁧B30.2 (אקסון 10)⁩</text>`;
    $('#gnRes').innerHTML=s;
  }
  s1.addEventListener('change',interp);s2.addEventListener('change',interp);interp();

  /* ---------- 4. cards ---------- */
  $('#gnCards').innerHTML=`
   <div class="card"><h4>פנוטיפ II: עמילואידוזיס כסימן ראשון</h4><p>עמילואידוזיס מסוג AA כסימן הראשון או היחיד, אצל מי שמעולם לא היו לו התקפים. <sup class="c" data-ref="Melikoglu2000,GeneReviews" title="Source 76,171">76,171</sup> היא נדירה, וההערכות שונות: לכל היותר 0.3% מהרישום הטורקי של 2,838 חולים, כ־0.6% בסקירה מאוחרת יותר שמחבריה מטילים ספק בכך שזו ישות נפרדת, ואף לא מקרה אחד שהוכח בביופסיה בקרב 461 קרובי משפחה של חולי FMF עם עמילואידוזיס. <sup class="c" data-ref="TurkishFMF2005,GulBenChetrit2025,Melikoglu2000" title="Source 89,171,264">89,171,264</sup> SHARE ממליצה לעקוב אחרי אנשים עם שני וריאנטים פתוגניים וללא תסמינים, ולשקול טיפול כשיש גורמי סיכון לעמילואידוזיס (רמה B). <sup class="c" data-ref="Giancane2015,Ozen2017" title="Source 82,200">82,200</sup></p></div>
   <div class="card"><h4>וריאנט אחד, תסמינים אמיתיים</h4><p>אצל עד כ־25% מהאנשים עם FMF נמצא רק וריאנט מזוהה אחד <sup class="c" data-ref="GeneReviews,MarekYagel2009" title="Source 76,168">76,168</sup>; 12% בעוקבה טורקית אחת <sup class="c" data-ref="Lachmann2006" title="Source 141">141</sup> ו־32% בעוקבת הפניה. <sup class="c" data-ref="Tanatar2020" title="Source 253">253</sup> במחקר Booty 2009 רוצף מחדש כל האזור של 15 kb אצל 46 חולים כאלה, ולא נמצא וריאנט שני; וריאנט אחד יחד עם תסמינים טיפוסיים נחשב מספיק כדי לאבחן FMF ולנסות קולכיצין. <sup class="c" data-ref="Booty2009" title="Source 26">26</sup> Jéru 2013 ראו בהטרוזיגוטיות גורם רגישות, ולא FMF מנדלית. <sup class="c" data-ref="Jeru2013" title="Source 112">112</sup> מינון הגן משפיע. <sup class="c" data-ref="Federici2012" title="Source 64">64</sup></p></div>
   <div class="card"><h4>וריאנטים דומיננטיים באמת</h4><ul><li><b>M694del</b>: FMF דומיננטית עם חדירות משתנה (Booth 2000); לאחד החולים הייתה עמילואידוזיס מסוג AA. <sup class="c" data-ref="Booth2000" title="Source 25">25</sup> סריקה בבריטניה של כ־3,500 חולים מצאה 21 נשאים, כולם ממוצא צפון־מערב אירופי, עם מייסד משותף מלפני כ־550 שנה; גיל הופעה חציוני 18, ותגובה מצוינת לקולכיצין. <sup class="c" data-ref="Rowczenio2015" title="Source 227">227</sup></li><li><b>T577N/S/A</b>, ממש לפני B30.2: מחלה אוטו-דלקתית דומיננטית; T577N לא נמצא בכ־6,800 בקרות; מגיבה לקולכיצין. <sup class="c" data-ref="Stoffels2014" title="Source 250">250</sup></li><li>מעבדה אחת מונה גם את I692del כדומיננטי עם חדירות מופחתת. <sup class="c" data-ref="ARUP2023" title="Source 6">6</sup></li></ul></div>
   <div class="card"><h4>גנוטיפ וחומרה</h4><p>הומוזיגוטים ל־M694V: הופעה מוקדמת יותר, יותר דלקת פרקים (Shinar 2000). <sup class="c" data-ref="Shinar2000" title="Source 239">239</sup> קשר לעמילואידוזיס: כן אצל 90 ארמנים (Cazeneuve 1999) <sup class="c" data-ref="Cazeneuve1999" title="Source 33">33</sup>, לא אצל 2,838 טורקים, אף שגם שם עמילואידוזיס פגעה ב־12.9% מהעוקבה (Tunca 2005). <sup class="c" data-ref="TurkishFMF2005" title="Source 264">264</sup> בקרב 124 הומוזיגוטים ל־M694V, מין זכר (OR 2.37) והתקפים של דלקת פרקים (OR 3.27) העלו את הסיכון לעמילואידוזיס. <sup class="c" data-ref="GershoniBaruch2003" title="Source 78">78</sup></p><div class="hook"><b>לבחינה</b>המחקרים חלוקים לגבי M694V ועמילואידוזיס; ארץ המוצא היא כשלעצמה גורם סיכון לפי SHARE. <sup class="c" data-ref="Giancane2015" title="Source 82">82</sup></div></div>
   <div class="card"><h4>מה הפאנלים בודקים</h4><p>מעבדות רבות בודקות בשני שלבים: קודם הווריאנטים הפתוגניים השכיחים, ואחר כך הרצף המקודד כולו. הסריקה מכסה את אקסונים 2, 3, 5 ו־10; חיפוש באקסונים אחרים, כשה־FMF ודאית קלינית, מוסיף מעט. <sup class="c" data-ref="Shinar2012" title="Source 240">240</sup></p><ul><li>אקסון 2: E148Q, E167D, T267I, R202Q</li><li>אקסון 3: P369S, R408Q · אקסון 5: F479L · אקסון 9: I591T</li><li>אקסון 10: M680I, M694V, M694I, V726A, A744S, R761H, I692del, K695R</li></ul></div>
   <div class="card"><h4>מגבלות הבדיקה</h4><p>כ־10% עד 20% מחולי FMF אינם נושאים וריאנט ב־<i>MEFV</i>, ותמונתם קלאסית אך קלה יותר מזו של הומוזיגוטים ל־M694V. <sup class="c" data-ref="BenZvi2015" title="Source 19">19</sup> מעבדה אחת מעריכה את הרגישות של ריצוף מלא ב־75% עד 90%; וריאנטים אינטרוניים עמוקים ווריאנטים רגולטוריים מוחמצים, ומחיקות או הכפלות גדולות לא דווחו כגורמים למחלה. <sup class="c" data-ref="ARUP2023" title="Source 6">6</sup> FMF נשארת אבחנה קלינית (SHARE, רמה B). <sup class="c" data-ref="Giancane2015" title="Source 82">82</sup></p></div>
   <div class="card"><h4>מספרי OMIM</h4><ul><li><b>249100</b> FMF, תורשה אוטוזומלית רצסיבית</li><li><b>134610</b> FMF, תורשה אוטוזומלית דומיננטית</li><li><b>608107</b> הגן <i>MEFV</i></li><li><b>608068</b> PAAND</li></ul><p><sup class="c" data-ref="UniProtO15553" title="Source 267">267</sup></p></div>
   <div class="card"><h4>PAAND אינה FMF</h4><p>S242R מסלק ישירות אתר קישור של 14-3-3, ולכן עותק אחד גורם למחלה דומיננטית עם דרמטוזיס נויטרופילית, חום ממושך וכאבי שרירים (מיאלגיה). היא מגיבה לטיפול המכוון נגד IL-1, ואינה מתנהגת כמו FMF שמגיבה לקולכיצין. <sup class="c" data-ref="Masters2016,Schnappauf2019" title="Source 169,234">169,234</sup></p></div>`;
};

/* =============== 1.3 mechanism =============== */
const MX=[
 {from:0,at:.06,k:'שלב 1 · מנוחה',t:'RhoA פעיל, הפירין מוחזק כבוי',
  txt:'RhoA פעיל (קשור ל־GTP) מפעיל שני קינאזים, PKN1 ו־PKN2. הם מוסיפים קבוצות פוספט לפירין בסרין 208 ובסרין 242. חלבוני 14-3-3 נצמדים לפוספטים האלה ומחזיקים את הפירין במבנה לא פעיל. <sup class="c" data-ref="Park2016,Gao2016" title="Source 74,207">74,207</sup>',
  pt:'הפירין הוא שומר שנשאר רדום כל עוד מתג תאי שנקרא RhoA נשאר דלוק.',
  hook:'הפירין הוא <b>שומר</b> של פעילות RhoA, ולא חיישן ישיר של מולקולות חיידקיות. זרחון S208/S242 + 14-3-3 = כבוי.'},
 {from:.15,at:.22,k:'שלב 2 · המתג יורד',t:'פעילות RhoA יורדת',
  txt:'כמה חיידקים מייצרים רעלנים או חלבונים אפקטוריים שמשנים את RhoA ומשביתים אותו. הפירין התפתח כדי להבחין באובדן הזה של איתות RhoA, אסטרטגיית "שומר" קלאסית. <sup class="c" data-ref="Xu2014" title="Source 275">275</sup>',
  pt:'חיידקים מסוימים מכבים את RhoA. הפירין מבחין שהמתג השתתק.',
  hook:'Xu ועמיתיו הראו ב־2014 שהפירין חש <b>שינוי של חלבוני Rho GTPase</b>, ולא את החיידק עצמו.'},
 {from:.32,at:.38,k:'שלב 3 · שחרור',t:'PKN נעצר, הפוספטים מוסרים',
  txt:'בלי RhoA, פעילות PKN יורדת, הפירין עובר דה-פוספורילציה ו־14-3-3 משחרר אותו. בתאים תקינים נדרש אחר כך שלב שני, התלוי במיקרוטובולים, כדי שהפירין יתארגן לקומפלקס. וריאנטים ב־B30.2 הקשורים ל־FMF מורידים את הדרישה הזאת: דה-פוספורילציה לבדה יכולה להספיק. תאי FMF אינם פעילים כל הזמן: הם מגיבים לגירויים חלשים מכדי להפעיל תאים תקינים, וחזק יותר עם שני וריאנטים מאשר עם אחד. <sup class="c" data-ref="Park2016,VanGorp2016,Magnotti2019,Jamilloux2018" title="Source 110,162,207,270">110,162,207,270</sup> איך בדיוק הווריאנטים מחלישים את הבלם שנוי במחלוקת: Park ועמיתיו (2016) מצאו קישור מופחת ל־PKN ול־14-3-3, ואילו עבודות אחרות מצביעות על שלב הבקרה המאוחר יותר, התלוי במיקרוטובולים. <sup class="c" data-ref="Park2016,Masters2016,Magnotti2019" title="Source 162,169,207">162,169,207</sup>',
  pt:'כשהמתג כבוי, הבלמים על הפירין משתחררים. ב־FMF הבלמים חלשים יותר מלכתחילה.',
  hook:'פירין תקין צריך <b>שני</b> שלבים (דה-פוספורילציה + שלב התלוי במיקרוטובולים). פירין של FMF צריך פחות, ולכן הוא נדלק בסף נמוך יותר.'},
 {from:.45,at:.53,k:'שלב 4 · אינפלמזום',t:'צבר פירין–ASC–קספאז-1',
  txt:'הפירין המשוחרר נקשר לחלבון המתווך ASC דרך תחום ה־PYD שלו. ASC מתפלמר ל"צבר" (speck) גדול אחד בכל תא ומגייס פרו-קספאז-1, שמפעיל את עצמו. <sup class="c" data-ref="Richards2001,Lu2014,Broz2016" title="Source 27,160,223">27,160,223</sup>',
  pt:'הפירין מושך חלבוני עזר יחד לקומפלקס אזעקה גדול אחד.',
  hook:'אינפלמזום = חיישן (פירין) + מתווך (<b>ASC</b>) + אפקטור (<b>קספאז-1</b>).'},
 {from:.62,at:.70,k:'שלב 5 · ציטוקינים',t:'IL-1β ו־IL-18 נחתכים ומשתחררים',
  txt:'קספאז-1 חותך את pro-IL-1β ואת pro-IL-18 הלא פעילים לצורותיהם הפעילות. IL-1β הוא המניע העיקרי של החום, של גיוס הנויטרופילים ושל תגובת השלב החריף (CRP ו־SAA מהכבד). <sup class="c" data-ref="Schnappauf2019,Dinarello2011" title="Source 57,234">57,234</sup>',
  pt:'קומפלקס האזעקה חותך שני חלבוני שליח לצורתם הפעילה. אחד מהם, IL-1β, גורם לחום.',
  hook:'חסימת IL-1 (אנאקינרה, קנאקינומאב, רילונאספט) יעילה ב־FMF עמידה לקולכיצין, כי IL-1β נמצא במורד הזרם של הפירין.'},
 {from:.78,at:.9,k:'שלב 6 · פירופטוזיס',t:'נקבוביות גזדרמין D, התא מתפוצץ',
  txt:'קספאז-1 חותך גם את גזדרמין D. המקטע ה־N-טרמינלי שלו מנקב נקבוביות בקרום התא. IL-1β יוצא דרך הנקבוביות, ואז התא הנפוח נקרע: פירופטוזיס, מוות תאי דלקתי. רוחב הנקבוביות הוא בערך 10 עד 14 nm. עוד נויטרופילים מגויסים למקום. <sup class="c" data-ref="Shi2015,Liu2016,Evavold2018" title="Source 61,157,238">61,157,238</sup>',
  pt:'התא פותח חורים בפני השטח שלו, משחרר את האזעקה החוצה ואז מתפוצץ, וקורא לעוד תאי דם לבנים למקום.',
  hook:'פירופטוזיס הוא דלקתי (התוכן נשפך החוצה). אפופטוזיס שקט. גזדרמין D הוא יוצר הנקבוביות.'}
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
    s+=`<text x="${f1(cx-W+14)}" y="${f1(cy-H+26)}" class="t-sm">ציטופלזמת נויטרופיל</text>`;
    // gauge
    s+=`<text x="${L.gx}" y="${L.gy+8}" class="t-sm">⁧פעילות RhoA⁩</text><rect x="${L.gbx}" y="${N?L.gy+18:L.gy}" width="${L.gbw}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const gby=N?L.gy+18:L.gy;
    s+=`<rect x="${L.gbx}" y="${gby}" width="${f1(L.gbw*lvl)}" height="12" rx="6" style="fill:var(--sea)"/>`;
    const tx=L.gbx+L.gbw*th;
    s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${gby-5}" y2="${gby+17}" style="stroke:var(--terra);stroke-width:3"/><text x="${f1(clamp(tx,56,L.gbx+L.gbw-56))}" y="${gby+30}" class="t-xs t-mid" style="fill:var(--terra)">${mut?'⁧סף M694V⁩':'סף תקין'}</text>`;
    s+=`<text x="${L.vx}" y="${L.vy}" class="t-sm">${lvl<th?'<tspan style="fill:var(--terra)">מתחת לסף ← נדלק</tspan>':'מעל הסף ← נשאר כבוי'}</text>`;
    // RhoA + PKN
    const on=lvl;
    s+=`<circle cx="${L.rx}" cy="${L.ry}" r="${f1(20+6*on)}" style="fill:var(--sea);opacity:${f1(.15+.25*on)}"/><circle cx="${L.rx}" cy="${L.ry}" r="20" style="fill:var(--panel);stroke:var(--sea);stroke-width:2.5"/><text x="${L.rx}" y="${L.ry+4}" class="t-lbl t-mid">RhoA</text>`;
    s+=`<text x="${L.rx}" y="${L.ry+36}" class="t-xs t-mid" style="fill:${on>.5?'var(--sea)':'var(--muted)'}">${on>.5?'⁧GTP · פעיל⁩':'⁧GDP · כבוי⁩'}</text>`;
    if(path&&dip>.2)s+=`<g style="opacity:${f1(dip)}"><path d="M${L.rx-50} ${L.ry-48} l20 10 -14 4z" style="fill:var(--terra)"/><text x="${L.rx-70}" y="${L.ry-54}" class="t-xs" style="fill:var(--terra)">⁧רעלן משנה את RhoA⁩</text></g>`;
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
    s+=`<text x="${f1(px+84*PS)}" y="${f1(py+30*L.PS+16-10*asm)}" class="t-sm t-mid" style="opacity:${f1(1-asm)}">⁧פירין (781 חומצות אמינו)⁩</text>`;
    // phosphates + 14-3-3 clamp on the linker (S208/S242 lie between PYD and B-box)
    const phO=1-rel;
    [[38,'S208'],[56,'S242']].forEach(([dx,l])=>{const x=px+dx*PS,y=py-22*L.PS;
      s+=`<g style="opacity:${f1(phO)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(7*L.PS)}" style="fill:var(--gold)"/><text x="${f1(x)}" y="${f1(y+3)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">P</text><text x="${f1(x)}" y="${f1(y-11*L.PS)}" class="t-xs t-mid">${l}</text></g>`});
    const cl=rel*50;
    s+=`<g style="opacity:${f1(1-rel*.9)}" transform="translate(${f1(px+47*PS)} ${f1(py-(52+cl)*L.PS)}) scale(${f1(L.PS)})"><path d="M-30 -4 Q-30 22 -14 22 H14 Q30 22 30 -4" style="fill:none;stroke:var(--sea);stroke-width:6;stroke-linecap:round"/><text x="0" y="-10" class="t-xs t-mid" style="fill:var(--sea)">14-3-3</text></g>`;
    // non-firing message
    if(!fire&&t>.32)s+=`<g style="opacity:${f1(ramp(t,.32,.4))}"><rect x="${L.nfX}" y="${L.nfY}" width="${L.nfW}" height="58" rx="10" style="fill:var(--good-soft);stroke:var(--good)"/><text x="${L.nfX+L.nfW/2}" y="${L.nfY+24}" class="t-lbl t-mid" style="fill:var(--good)">הסף לא נחצה</text><text x="${L.nfX+L.nfW/2}" y="${L.nfY+44}" class="t-sm t-mid">הפירין נשאר מזורחן · אין התקף</text></g>`;
    // ASC speck + caspase-1
    if(asm>0){ASC.forEach(a=>{const rr=a.d*asm;s+=`<circle cx="${f1(L.speckX+Math.cos(a.a)*rr)}" cy="${f1(L.speckY+Math.sin(a.a)*rr)}" r="4.2" style="fill:var(--crocus);opacity:${f1(asm*.9)}"/>`});
      s+=`<text x="${L.speckX}" y="${f1(L.speckY+50+4*asm)}" class="t-sm t-mid" style="opacity:${f1(asm)}">⁧צבר ASC⁩</text>`;
      for(let k=0;k<5;k++){const a=k/5*Math.PI*2+.3,rr=lerp(90,46,asm);s+=`<rect x="${f1(L.speckX+Math.cos(a)*rr-7)}" y="${f1(L.speckY+Math.sin(a)*rr-7)}" width="14" height="14" rx="3" style="fill:var(--terra);opacity:${f1(asm)}"/>`}
      s+=`<text x="${L.caspX}" y="${L.caspY}" class="t-xs" style="fill:var(--terra);opacity:${f1(asm)}">⁧קספאז-1⁩</text>`}
    // pro-IL-1β → IL-1β
    if(t>.55&&fire){const o=ramp(t,.55,.62),x0=L.cytX;
      for(let k=0;k<3;k++){const y=L.cytY+k*L.cytStep;
        s+=`<rect x="${x0}" y="${y}" width="${f1(lerp(70,30,cut)*(N?.7:1))}" height="12" rx="6" style="fill:var(--gold);opacity:${f1(o*(1-.8*cut))}"/>`;
        const tgt=L.exitX!=null?L.exitX+k*5:cx+W+40+k*18;
        const ex=lerp(x0+44,tgt,ease(ramp(t,.82+k*.03,1))),ey=lerp(y,cy+H*Math.sin(poreAng[k+1]),ease(ramp(t,.82,.95)));
        s+=`<circle cx="${f1(ex)}" cy="${f1(ey+6)}" r="${f1(6*cut)}" style="fill:var(--terra)"/>`}
      s+=`<text x="${x0}" y="${L.cytY-12}" class="t-xs" style="opacity:${f1(o)}">${cut>.5?'⁧IL-1β · IL-18 פעילים⁩':(N?'pro-IL-1β / IL-18':'pro-IL-1β · pro-IL-18')}</text>`}
    // gasdermin D
    if(pore>0)s+=`<text x="${f1(cx+W-10)}" y="${f1(cy-H-8)}" class="t-xs t-end" style="fill:var(--terra)">⁧נקבוביות גזדרמין D⁩</text>`;
    // incoming neutrophils + fever
    if(burst>0){for(let k=0;k<3;k++)s+=neutro(lerp(L.neuX0,L.neuX1-k*10,ease(ramp(burst,k*.15,1))),L.neuY+k*L.neuStep,13,1);
      s+=`<text x="${L.feverX}" y="${L.feverY}" class="t-sm t-end" style="fill:var(--terra)">⁧IL-1β ← חום, עוד נויטרופילים⁩</text>`}
    svg.innerHTML=s;
    const p=phaseOf(MX,t);setSt(p);
    const P=MX[p];let extra='';
    if(!fire&&p>=2)extra=`<div class="hook"><b>מה ראיתם עכשיו</b>${mut?'':'פירין תקין התעלם מירידה קטנה ויומיומית ב־RhoA. זה המצב הבריא: הוא נדלק רק כשפתוגן מכבה את RhoA בחוזקה.'}</div>`;
    $('#mxNote').innerHTML=(!fire&&p>=2?noteHTML({k:'שלבים 3 עד 6 · לא הופעל',t:'שום דבר לא קורה, RhoA מתאושש',txt:'הירידה לא חצתה את הסף של פירין תקין. הפירין נשאר מזורחן וקשור ל־14-3-3, ולכן לא נוצר אינפלמזום. נסו את הגנוטיפ M694V עם אותה ירידה קטנה.',pt:'שומר בריא מתעלם מתנודות קטנות.'}):noteHTML(P))+extra;
    $('#mxCap').textContent=`פירין ${mut?'M694V/M694V':'תקין'} · ${path?'פתוגן מכבה את RhoA':'ירידה קטנה יומיומית'} · ${fire?'האינפלמזום נדלק':'אין אינפלמזום'}. סכמטי, לא בקנה מידה.`;
  }
  const stop=playWire(rg,$('#mxPlay'),draw,16000,'הפעלה חוזרת','mech');
  const setSt=stepWire($('#mxSteps'),MX,rg,draw,stop);
  const tog=(a,b,v)=>{a.setAttribute('aria-pressed',v);b.setAttribute('aria-pressed',!v)};
  $('#mxNorm').onclick=()=>{mut=false;tog($('#mxNorm'),$('#mxMut'),true);draw(+rg.value)};
  $('#mxMut').onclick=()=>{mut=true;tog($('#mxNorm'),$('#mxMut'),false);draw(+rg.value)};
  $('#mxMinor').onclick=()=>{path=false;tog($('#mxMinor'),$('#mxPath'),true);draw(+rg.value)};
  $('#mxPath').onclick=()=>{path=true;tog($('#mxMinor'),$('#mxPath'),false);draw(+rg.value)};
  $('#mxGrid').innerHTML=`<tr><th>פירין תקין</th><td><span class="tag good">אין תגובה</span> התעלמות נכונה.</td><td><span class="tag sea">נדלק</span> הגנה מתאימה מפני פתוגן שמשנה את RhoA.</td></tr>
   <tr class="hl"><th>פירין עם וריאנט FMF</th><td><span class="tag terra">נדלק</span> זו המחלה: התקף בלי איום אמיתי.</td><td><span class="tag terra">נדלק בעוצמה</span> ייתכן שעזר לנשאים לשרוד זיהומים מסוימים (השערה). <sup class="c" data-ref="Park2020" title="Source 208">208</sup></td></tr>`;
  $('#mxCards').innerHTML=`
   <div class="card"><h4>היכן הפירין נמצא</h4><p>הפירין מיוצר בעיקר בתאים של מערכת החיסון המולדת: נויטרופילים, אאוזינופילים, מונוציטים ותאים דנדריטיים, שכולם נוצרים מתאי גזע במח העצם. זו הסיבה שהדלקת ב־FMF עשירה בנויטרופילים, וגם הסיבה שהחלפת מח עצם נידונה בפרק <a href="#cure" data-go="cure">לקראת ריפוי</a>. <sup class="c" data-ref="Centola2000,Schnappauf2019" title="Source 35,234">35,234</sup></p></div>
   <div class="card"><h4>מה משלים את השלב השני</h4><p>סריקה כימית מצאה ששני תוצרי פירוק של סטרואידים שהגוף מייצר בעצמו, אטיוכולנולון ופרגננולון, יכולים להניע ישירות את שלב ההפעלה השני. התיאור המפורש של הפעלת הפירין "בשני שלבים" מגיע מהעבודה הזאת. <sup class="c" data-ref="Magnotti2022" title="Source 163">163</sup></p></div>
   <div class="card"><h4>לא אותו דבר כמו NLRP3</h4><p>NLRP3 חש סוגים רבים של עקה תאית (יציאת אשלגן מהתא, גבישים). הפירין חש דבר אחד: אובדן של איתות RhoA. שניהם מזינים את אותו מנגנון ASC ← קספאז-1 ← IL-1β. <sup class="c" data-ref="Heilig2018" title="Source 96">96</sup></p></div>
   <div class="card"><h4>הגברת תפקוד</h4><p>FMF היא מחלה רצסיבית, ובכל זאת הווריאנטים הופכים את הפירין ל<b>פעיל יותר</b>, לא פחות. בעכברים, וריאנטים אנושיים של B30.2 שהוחדרו לגן הפירין גרמו למחלה אוטו-דלקתית התלויה ב־IL-1β. <sup class="c" data-ref="Chae2011" title="Source 37">37</sup></p></div>
   <div class="card"><h4>אותו מתג ב־HIDS/MKD</h4><p>בחסר במבלונט קינאז (MKD), מחסור בגרניל-גרניל פירופוספט פירושו ש־RhoA אינו יכול לעבור פרנילציה ולהיעגן, ולכן RhoA כבוי מבחינה תפקודית והפירין משתחרר. צומת RhoA אחד מקשר בין שתי תסמונות חום שונות. <sup class="c" data-ref="Park2016" title="Source 207">207</sup></p></div>
   <div class="card"><h4>PAAND: מחלת הפירין האחרת</h4><p>וריאנט דומיננטי בעמדה S242 ‏(S242R) מסלק ישירות אתר זרחון, ולכן 14-3-3 אינו יכול להיקשר. הוא גורם לדרמטוזיס נויטרופילית ולא ל־FMF קלאסית, מה שתומך במודל הזרחון כולו. וריאנט שני באותו אתר, E244K, עושה את אותו הדבר. <sup class="c" data-ref="Masters2016,Moghaddas2017" title="Source 169,179">169,179</sup></p></div>`;
  draw(+rg.value);
};

/* =============== 1.4 attack =============== */
const AT_SITES={
 perit:{n:'בטן (דלקת הצפק)',cav:'חלל הצפק',lay:'מזותל',dot:[30,62],
  txt:'סוג ההתקף השכיח ביותר. כאב בטן מפושט או ממוקד, התגוננות (guarding) ורגישות בהרפיה (rebound), לעיתים חסימת מעיים שיתוקית (ileus) עם עצירות. דלקת הצפק (פריטוניטיס) מופיעה ביותר מ־90% מהמטופלים (93.7% ברישום הטורקי של 2,838 מטופלים). היא עלולה להיות בלתי ניתנת להבחנה מ"בטן כירורגית"; בסדרה ישראלית אחת 40% מהמטופלים עברו כריתת תוספתן, ורוב התוספתנים שהוצאו לא היו מודלקים. <sup class="c" data-ref="TurkishFMF2005,Tufan2020,Lidar2008" title="Source 150,263,264">150,263,264</sup>',
  pt:'כאב בטן חזק עם חום שנראה כמו מצב חירום, ואז דועך בתוך כשלושה ימים.',
  hook:'"בטן כירורגית" חוזרת עם חום, שחולפת מעצמה בתוך 1–3 ימים: חשבו על FMF. דלקת צפק סטרילית חוזרת עלולה להשאיר הידבקויות.'},
 pleura:{n:'חזה (דלקת קרום הריאה)',cav:'החלל הפלאורלי',lay:'מזותל',dot:[24,44],
  txt:'דלקת קרום הריאה (פלאוריטיס) פוגעת בכשליש מהמטופלים (31.2% ברישום הטורקי). זהו כאב חזה פתאומי, בדרך כלל חד־צדדי, שמחמיר בנשימה, לעיתים עם תפליט קטן, וחולף בתוך 1–3 ימים. <sup class="c" data-ref="TurkishFMF2005,Tufan2020" title="Source 263,264">263,264</sup>',
  pt:'כאב חד בצד אחד של החזה, שמחמיר כשנושמים פנימה.',
  hook:'כאב פלאוריטי חד־צדדי עם חום, שחוזר וחולף מעצמו.'},
 joint:{n:'מפרק (דלקת פרקים)',cav:'חלל המפרק',lay:'סינוביום',dot:[24,104],
  txt:'דלקת פרקים פוגעת בערך במחצית מהמטופלים (47.4% ברישום הטורקי). לרוב מדובר במפרק גדול אחד ברגל (ברך, קרסול, ירך) עם תפליט סטרילי אך דלקתי, שעלול לחקות דלקת פרקים ספטית. התקפי מפרקים מגיעים לשיא בתוך 1–3 ימים ושוככים בתוך כשבוע, לעיתים עד שבועיים. דלקת פרקים ממושכת מופיעה בפחות מ־5%. <sup class="c" data-ref="TurkishFMF2005,Tufan2020,PRINTO2016G" title="Source 216,263,264">216,263,264</sup>',
  pt:'מפרק גדול אחד, לרוב ברך או קרסול, מתנפח וכואב, ואחר כך נרגע.',
  hook:'<b>דלקת חד־מפרקית</b> חריפה של מפרק גדול בגפה התחתונה, עם תפליט נויטרופילי סטרילי.'},
 scrot:{n:'שק האשכים',cav:'TUNICA VAGINALIS',lay:'מזותל',dot:[30,80],
  txt:'דלקת של ה־tunica vaginalis, כיס של צפק, גורמת לשק אשכים כואב ונפוח. בסדרה אחת של 175 בנים עם FMF, ל־9% היו התקפים בשק האשכים שנמשכו בין 8 שעות ל־5 ימים; אצל רבע מהם זה היה הסימן הראשון ל־FMF, ו־38% עברו ניתוח. <sup class="c" data-ref="Majeed2000" title="Source 164">164</sup>',
  pt:'אצל בנים, שק אשכים כואב ונפוח שעלול להיראות כמו מצב חירום.',
  hook:'ה־tunica vaginalis היא צפק שירד יחד עם האשך, ולכן גם היא משטח סרוזי.'},
 skin:{n:'עור (אודם דמוי שושנה)',cav:'אפידרמיס',lay:'קרום הבסיס',dot:[34,116],
  txt:'רובד אדום ורגיש דמוי שושנה (erysipelas) בשוק, בקרסול או בגב כף הרגל, שמופיע לעיתים קרובות אחרי הליכה ממושכת או נסיעה. הוא הופיע ב־20.9% מהרישום הטורקי ובכ־7.5% מקוהורט ילדים אחד, שבו היה קשור לדלקת פרקים, להומוזיגוטיות ל־M694V ולצורך במינוני קולכיצין גבוהים יותר. <sup class="c" data-ref="TurkishFMF2005,Tufan2020,GezginYildirim2020" title="Source 79,263,264">79,263,264</sup>',
  pt:'כתם אדום, כואב וחם בשוק, שנראה כמו זיהום בעור אבל אינו זיהום.',
  hook:'אודם דמוי שושנה (ELE) הוא סימן העור האופייני ל־FMF, והוא שכיח יותר עם M694V.'}
};
const AT_VARS={
 typ:{n:'התקף טיפוסי',axis:120,unit:'שעות',fmt:h=>`${Math.round(h)} h`,
  steps:[{from:0,at:.01,k:'שעה 0',t:'גורם מעורר',txt:'להתקפים רבים אין סיבה ברורה. בשאלונים, מטופלים מציינים לרוב לחץ רגשי, קור, עייפות ווסת. המחקר החזק ביותר, במערך case-crossover ב־104 מטופלים ארמנים, מצא שכל אירוע מלחיץ העלה את הסיכוי להתקף כעבור יומיים בכ־70%, ואילו פעילות גופנית מאומצת וארוחות שומניות לא העלו אותו. בסקר של נשים עם FMF, 79% דיווחו על התקפים בזמן הווסת, בעיקר התקפי בטן שהן ידעו להבחין בינם לבין כאבי מחזור. כמחצית מכלל המטופלים חשים בסימנים מקדימים (פרודרום), שנמשכים בממוצע כ־20 שעות. <sup class="c" data-ref="Karadag2013,Parlar2024,Yenokyan2012,Guzelant2017,Lidar2006" title="Source 90,118,149,209,279">90,118,149,209,279</sup>',pt:'התקפים רבים מגיעים בלי שום אזהרה. לחץ נפשי הוא הגורם המעורר המתועד ביותר; גם קור, עייפות ווסת מדווחים לעיתים קרובות.',hook:'גורמים מעוררים מורידים את הסף להפעלה של פירין שכבר נוטה להגיב יתר על המידה. הם אינם גורמים למחלה.'},
   {from:2/120,at:5/120,k:'שעות 1–8',t:'החום והכאב מתחילים',txt:'החום מתחיל בפתאומיות ומגיע לשיא בתוך שעות, עם כאב באתר סרוזי אחד. IL-1β הוא פירוגן אנדוגני חזק: בבני אדם, מינונים של ננוגרמים לקילוגרם גורמים לחום. <sup class="c" data-ref="Tufan2020,Dinarello2011" title="Source 57,263">57,263</sup>',pt:'החום והכאב מופיעים מהר, בתוך שעות.',hook:'חום + סרוזיטיס (דלקת קרומים) באתר אחד בכל פעם הוא הדפוס הרגיל.'},
   {from:8/120,at:16/120,k:'שעות 8–24',t:'הצפה של נויטרופילים',txt:'נויטרופילים יוצאים בהמוניהם מהנימים אל החלל הסרוזי ויוצרים תפליט סטרילי. הכאב והסימנים מגיעים לשיא. CRP ו־SAA עולים בחדות כשהכבד מגיב ל־IL-1β ול־IL-6; בקוהורט אחד החציונים בזמן התקף היו SAA 693 mg/L ו־CRP 115 mg/L. <sup class="c" data-ref="Lachmann2006,Dinarello2011" title="Source 57,141">57,141</sup>',pt:'מספר עצום של תאי דם לבנים נוהר פנימה. הכאב מגיע לשיא, וסמני הדלקת בדם מטפסים.',hook:'הנוזל <b>סטרילי</b>: נויטרופילים, בלי חיידקים. התרביות שליליות.'},
   {from:24/120,at:40/120,k:'שעות 24–72',t:'חלוף',txt:'ההתקף נפסק מעצמו, בדרך כלל בתוך 12–72 שעות, בלי אנטיביוטיקה. קריטריוני Livneh מגדירים התקף טיפוסי כהתקף עם חום (≥38 °C) שנמשך 12 שעות עד 3 ימים. CRP ו־SAA מפגרים אחרי התסמינים. <sup class="c" data-ref="Livneh1997,Tufan2020" title="Source 159,263">159,263</sup>',pt:'הוא חולף מעצמו, בדרך כלל בתוך שלושה ימים.',hook:'חולף מעצמו, 12–72 h: משך ההתקף עצמו הוא רמז אבחנתי (TRAPS נמשך זמן רב יותר, PFAPA חוזר בדיוק של שעון).'},
   {from:72/120,at:100/120,k:'אחרי 72 h',t:'בין התקפים',txt:'רוב המטופלים מרגישים טוב בין התקפים. חציון ה־SAA בין התקפים היה 6 mg/L בקוהורט אחד, אבל רק 29% מהמדידות היו תקינות לגמרי (<3 mg/L), ו־13% היו מעל 50 mg/L. עד כמה דלקת תת־קלינית נראית שכיחה תלוי מאוד בסמן ובערך הסף שבהם משתמש המחקר. SAA מוגבר באופן מתמשך הוא מה שמניע עמילואידוזיס. <sup class="c" data-ref="Lachmann2006,Tufan2020,Lachmann2007" title="Source 141,142,263">141,142,263</sup>',pt:'בדרך כלל מרגישים שוב כרגיל. בדיקות דם בין התקפים מראות אם דלקת סמויה ממשיכה.',hook:'בודקים CRP/SAA <b>בין</b> התקפים: עלייה מתמשכת פירושה שליטה לא מספקת, גם אם ההתקפים נראים נדירים.'}],
  curves:{temp:h=>ramp(h,1,7)*(1-ramp(h,26,52)),pain:h=>ramp(h,.5,6)*(1-ramp(h,30,66)),crp:h=>{const x=h/40;return h<=0?0:Math.min(1,Math.pow(x,2.2)*Math.exp(2.2*(1-x)))},saa:h=>{const x=h/32;return h<=0?0:Math.min(1,Math.pow(x,2)*Math.exp(2*(1-x)))},neut:h=>ramp(h,2,12)*(1-ramp(h,40,72))}},
 pfm:{n:'מיאלגיה חומית ממושכת',axis:56,unit:'ימים',fmt:d=>`\u2067יום ${Math.round(d)}\u2069`,
  steps:[{from:0,at:.02,k:'ימים 0–3',t:'כאבי שרירים חזקים',txt:'מיאלגיה חומית ממושכת (PFM) היא ביטוי נדיר: כאבי שרירים חזקים ומגבילים עם חום, ESR גבוה מאוד וגלובולינים מוגברים. היא תוארה לראשונה ב־14 מטופלים, ויכולה להופיע גם בזמן טיפול בקולכיצין. בסקירה של 78 ילדים, אצל יותר ממחציתם PFM הייתה הסימן הראשון ל־FMF. <sup class="c" data-ref="Langevitz1994,Hospach2024" title="Source 100,146">100,146</sup>',pt:'צורה נדירה עם כאבי שרירים חזקים מאוד וחום, שאינם חולפים בתוך כמה ימים.',hook:'PFM: חום + מיאלגיה (כאבי שרירים) חזקה שנמשכים <b>שבועות</b>, ESR גבוה מאוד, וקולכיצין אינו מונע אותה.'},
   {from:.1,at:.25,k:'שבועות 1–4',t:'שבועות, לא ימים',txt:'ללא טיפול, PFM נמשכה עד כ־6 שבועות בסדרה הראשונה, וסקירות מאוחרות יותר מתארות אירועים של עד כ־10 שבועות, עם בצקת בשרירים ב־MRI. <sup class="c" data-ref="Langevitz1994,Tufan2020" title="Source 146,263">146,263</sup>',pt:'ללא טיפול היא עלולה להימשך כשישה שבועות.',hook:'שבועות, לא ימים: משך האירוע הוא שמבדיל PFM מהתקף רגיל.'},
   {from:.6,at:.75,k:'שבועות 4–8',t:'שוככת, ומהר יותר עם סטרואידים',txt:'PFM מגיבה מהר לקורטיקוסטרואידים. בסקירת הילדים סטרואידים הועילו ב־77%, ואנאקינרה הועילה בכל המקרים שלא הגיבו לסטרואידים. <sup class="c" data-ref="Langevitz1994,Hospach2024" title="Source 100,146">100,146</sup>',pt:'בדרך כלל הרופאים מטפלים בה בסטרואידים, שגורמים לה לשכוך מהר הרבה יותר.',hook:'אחד המצבים המעטים ב־FMF שבהם גלוקוקורטיקואידים הם טיפול מקובל.'}],
  curves:{temp:d=>ramp(d,0,2)*(1-ramp(d,30,48))*.75,pain:d=>ramp(d,0,1.5)*(1-ramp(d,28,48)),crp:d=>ramp(d,0,5)*(1-ramp(d,34,54)),saa:d=>ramp(d,0,4)*(1-ramp(d,32,52)),neut:d=>ramp(d,0,3)*(1-ramp(d,30,48))*.7}},
 peri:{n:'דלקת קרום הלב',axis:120,unit:'שעות',fmt:h=>`${Math.round(h)} h`,
  steps:[{from:0,at:.03,k:'נדיר',t:'כאב בחזה שמחמיר בשכיבה',txt:'דלקת קרום הלב (פריקרדיטיס) נדירה: 27 מתוך כ־4,000 מטופלים בישראל לאורך 20 שנה, ו־1.4% מהרישום הטורקי. זה עדיין בערך פי עשרה משיעור הרקע. <sup class="c" data-ref="Kees1997,TurkishFMF2005" title="Source 123,264">123,264</sup>',pt:'לעיתים נדירות, השק שסביב הלב מודלק למשך כמה ימים.',hook:'פריקרדיטיס חוזרת עם חום באוכלוסייה בסיכון: חשבו על FMF.'},
   {from:24/120,at:40/120,k:'1–3 ימים',t:'חולפת מעצמה',txt:'כל מטופל בסדרה הישראלית עבר 1–3 התקפים של דלקת קרום הלב שנמשכו בממוצע 4.2 ימים, ללא נזק מתמשך. <sup class="c" data-ref="Kees1997" title="Source 123">123</sup>',pt:'היא שוככת בתוך כמה ימים.',hook:'אותה ביולוגיה סרוזית, קרום אחר.'}],
  curves:null}
};
AT_VARS.peri.curves=AT_VARS.typ.curves;
inits.attack=()=>{
  const svg=$('#atSvg'),rg=$('#atT');let site='perit',vk='typ';
  const r=rng(41);const NE=Array.from({length:22},()=>({x:20+r()*270,ph:r(),y:r()}));
  $('#atSites').innerHTML='<span class="kicker">מיקום</span>'+Object.entries(AT_SITES).map(([k,v])=>`<button class="btn" data-site="${k}" aria-pressed="${k===site}">${v.n}</button>`).join('');
  $('#atVars').innerHTML='<span class="kicker">סוג</span>'+Object.entries(AT_VARS).map(([k,v])=>`<button class="btn" data-var="${k}" aria-pressed="${k===vk}">${v.n}</button>`).join('');
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
    const cav=vk==='peri'?'חלל קרום הלב':vk==='pfm'?'שריר':S.cav;
    const redden=nf;
    if(isSkin){
      s+=`<rect x="10" y="40" width="310" height="70" style="fill:var(--cyto)"/><rect x="10" y="40" width="310" height="70" style="fill:var(--bad);opacity:${f1(.35*redden)}"/>`;
      for(let i=0;i<14;i++)s+=`<rect x="${12+i*22}" y="${50+(i%2)*4}" width="20" height="50" rx="4" style="fill:none;stroke:var(--memb);stroke-width:1;opacity:.6"/>`;
      s+=`<text x="16" y="34" class="t-sm">אפידרמיס</text><path d="M10 112 H320" style="stroke:var(--memb);stroke-width:3"/><text x="16" y="132" class="t-sm">דרמיס</text>`;
      s+=`<rect x="10" y="114" width="310" height="230" style="fill:var(--bad);opacity:${f1(.12*redden)}"/>`;
    }else{
      s+=`<rect x="10" y="40" width="310" height="120" style="fill:var(--panel)"/><text x="16" y="34" class="t-sm">${cav}</text>`;
      // exudate
      const ex=vk==='pfm'?0:nf;
      s+=`<rect x="10" y="${f1(160-110*ex)}" width="310" height="${f1(110*ex)}" style="fill:var(--sea);opacity:.18"/>`;
      if(ex>.15)s+=`<text x="240" y="${f1(156-110*ex+18)}" class="t-xs t-end" style="fill:var(--sea)">תפליט סטרילי</text>`;
      if(vk!=='pfm')for(let i=0;i<14;i++)s+=`<rect x="${12+i*22}" y="160" width="20" height="8" rx="4" style="fill:var(--memb)"/>`;
      else for(let i=0;i<6;i++)s+=`<rect x="14" y="${46+i*19}" width="302" height="14" rx="7" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:.8"/>`;
      s+=`<text x="16" y="186" class="t-sm">${vk==='pfm'?'סיבי שריר':vk==='peri'?'מזותל':S.lay}</text>`;
      s+=`<rect x="10" y="170" width="310" height="174" style="fill:var(--bad);opacity:${f1(.12*redden)}"/>`;
    }
    // capillary
    s+=`<rect x="10" y="280" width="310" height="44" rx="22" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/><text x="16" y="342" class="t-sm">נימי דם</text>`;
    for(let i=0;i<9;i++){const xx=((i*40+u*2600)%330)+0;s+=`<ellipse cx="${f1(xx)}" cy="${300+(i%3-1)*6}" rx="7" ry="4" style="fill:var(--bad);opacity:.7"/>`}
    // neutrophils leaving vessel toward cavity
    NE.forEach((n,i)=>{const on=clamp(nf*1.25-i/NE.length*.9);if(on<=0)return;const top=isSkin?150:vk==='pfm'?120:90+n.y*60;
      const prog=clamp(on*1.4);const y=lerp(300,top,ease(prog));const xx=n.x+Math.sin((u*40+n.ph*6))*4;s+=neutro(xx,y,9,clamp(on*2))});
    s+=body();
    // fever thermometer
    const T=37+2.8*fever;s+=`<g transform="translate(18 360)"><rect x="0" y="0" width="200" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="0" y="0" width="${f1(200*fever)}" height="12" rx="6" style="fill:var(--terra)"/><text x="0" y="32" class="t-lbl">\u2067טמפרטורה ${T.toFixed(1)} °C\u2069</text></g>`;
    s+=`<text x="16" y="408" class="t-sm">${V.fmt(x)}</text><text x="318" y="408" class="t-xs t-end" style="fill:var(--warn)">להמחשה</text>`;
    if(N)s+='</g>';
    // charts: beside the scene when wide, stacked under it when narrow
    const CX0=N?48:372, CX1=N?392:708, CY=N?548:14;
    const CH=[['temp','חום','var(--terra)'],['pain','כאב','var(--bad)'],['crp','CRP','var(--sea)'],['saa','SAA','var(--gold)']];
    CH.forEach(([k,l,c],i)=>{const y0=CY+i*100,y1=y0+78,x0=CX0,x1=CX1;
      s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/><text x="${x0}" y="${y0-2}" class="t-sm" style="fill:${c}">${l.toUpperCase()}</text>`;
      s+=`<path d="${pathFn(v=>C[k](v*V.axis*sx),x0,x1,y1,y0+10)}" style="fill:none;stroke:${c};stroke-width:1.2;opacity:.35"/>`;
      s+=`<path d="${pathFn(v=>v<=u?C[k](v*V.axis*sx):NaN,x0,x1,y1,y0+10).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${c};stroke-width:3"/>`;
      const cx=lerp(x0,x1,u),cy=lerp(y1,y0+10,C[k](x*sx));s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="5" style="fill:${c}"/>`;
      if(i===3){const ticks=vk==='pfm'?[0,14,28,42,56]:[0,24,48,72,96,120];ticks.forEach((tk,ti)=>{const last=ti===ticks.length-1,first=ti===0;
        s+=`<text x="${f1(lerp(x0,x1,tk/V.axis))}" y="${y1+14}" class="t-xs ${last?'t-end':first?'':'t-mid'}">${vk==='pfm'?'\u2067יום '+tk:tk+'h'}</text>`})}});
    s+=`<line x1="${f1(lerp(CX0,CX1,u))}" x2="${f1(lerp(CX0,CX1,u))}" y1="${CY-6}" y2="${CY+380}" style="stroke:var(--ink);stroke-width:1;opacity:.25"/>`;
    svg.innerHTML=s;
    const p=phaseOf(V.steps,u);setSt(p);const P=V.steps[p];
    $('#atNote').innerHTML=noteHTML(P)+(vk==='typ'?`<div class="kv"><div><dt>האתר הזה: ${S.n}</dt><dd>${S.txt}</dd></div></div>`+(p===2?`<div class="pt"><b>במילים פשוטות</b>${S.pt}</div><div class="hook"><b>לבחינה</b>${S.hook}</div>`:''):'');
    $('#atRead').innerHTML=`<span>זמן <b>${V.fmt(x)}</b></span><span>חום <b>${(37+2.8*fever).toFixed(1)} °C</b></span><span>CRP <b>${Math.round(val('crp')*100)}%</b> מהשיא</span><span>SAA <b>${Math.round(val('saa')*100)}%</b> מהשיא</span>`;
  }
  let setSt=()=>{};let stop=playWire(rg,$('#atPlay'),draw,14000,'הפעלה חוזרת','attack');
  function setVar(){const V=AT_VARS[vk];setSt=stepWire($('#atSteps'),V.steps,rg,draw,stop);$('#atUnit').textContent=V.unit;$('#atSites').style.display=vk==='typ'?'':'none';rg.value=V.steps[0].at;draw(+rg.value)}
  $('#atSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;$$('[data-site]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#atVars').addEventListener('click',e=>{const b=e.target.closest('[data-var]');if(!b)return;stop();vk=b.dataset.var;$$('[data-var]').forEach(x=>x.setAttribute('aria-pressed',x===b));setVar()});
  setVar();

  /* years */
  const ys=$('#atYears'),yr=$('#ayT');let pat='mod',col=false;
  const PAT={freq:['כל 2–4 שבועות',16],mod:['כל 1–3 חודשים',7],rare:['כמה בשנה',3]};
  $('#atFreq').innerHTML='<span class="kicker">דפוס ללא טיפול</span>'+Object.entries(PAT).map(([k,v])=>`<button class="btn" data-pat="${k}" aria-pressed="${k===pat}">${v[0]}</button>`).join('');
  $('#atYearsTxt').innerHTML='ההתקפים מגיעים במרווחים לא סדירים, בניגוד לדיוק השעון של PFAPA, ותדירותם משתנה מאוד בין אנשים. האתר יכול להשתנות מהתקף להתקף. נהוג לומר שתדירות ההתקפים יורדת עם הגיל, אבל באוכלוסיות שמקבלות טיפול קשה להפריד זאת מהשפעת הקולכיצין, ולכן כדאי להתייחס לכך בזהירות. אצל 80–90% מהמטופלים ההתקף הראשון מופיע לפני גיל 20. קולכיצין יומי מפחית את תדירות ההתקפים אצל רוב המטופלים ומונע עמילואידוזיס. <sup class="c" data-ref="BenChetrit2019,PRINTO2016G,Tufan2020,Zemer1986" title="Source 17,216,263,286">17,216,263,286</sup>';
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
      s+=`<text x="${NY?x0:10}" y="${f1(yy+(NY?-4:16))}" class="t-sm">\u2067שנה ${y+1}\u2069</text><line x1="${x0}" x2="${x1}" y1="${yy+trk}" y2="${yy+trk}" class="axis"/>`;
      ['ינו','פבר','מרץ','אפר','מאי','יונ','יול','אוג','ספט','אוק','נוב','דצמ'].forEach((m,i)=>{if(y===4)s+=`<text x="${f1(x0+(i+.5)/12*(x1-x0))}" y="${yy+trk+16}" class="t-xs t-mid">${m}</text>`});
      const n=EV.filter(e=>Math.floor(e.tY)===y&&e.tY<=T).length;s+=`<text x="${x1}" y="${f1(yy+(NY?-4:6))}" class="t-xs t-end">\u2067${n} התקפים\u2069</text>`}
    if(col){const yy=top+2*rowH;s+=`<rect x="${x0}" y="${f1(yy-(NY?18:4))}" width="${x1-x0}" height="${3*rowH+6}" rx="6" style="fill:var(--crocus-soft);opacity:.55"/><text x="${x0+4}" y="${f1(yy+(NY?-6:6))}" class="t-xs" style="fill:var(--crocus)">\u2067→ בטיפול בקולכיצין\u2069</text>`}
    const cols=['var(--terra)','var(--sea)','var(--gold)','var(--bad)'];
    EV.forEach(e=>{if(e.tY>T)return;const y=Math.floor(e.tY),xx=x0+(e.tY-y)*(x1-x0),yy=top+y*rowH+trk;s+=`<path d="M${f1(xx-4)} ${yy} L${f1(xx)} ${f1(yy-20*e.s)} L${f1(xx+4)} ${yy}" style="fill:${cols[e.site]};opacity:.9"/>`});
    if(t<1){const y=Math.min(4,Math.floor(T)),xx=x0+(T-y)*(x1-x0);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${top+y*rowH}" y2="${top+y*rowH+trk+2}" style="stroke:var(--ink);stroke-width:2"/>`}
    ys.innerHTML=s;
    const pre=EV.filter(e=>e.tY<2).length/2,post=EV.filter(e=>e.tY>=2.5).length/2.5;
    $('#ayCap').textContent=col?`הדמיה סכמטית. כ־${pre.toFixed(1)} התקפים בשנה לפני קולכיצין, וכ־${post.toFixed(1)} בשנה אחרי שלתרופה היו כמה חודשים לפעול. הצבעים מסמנים אתרים שונים.`:'הדמיה סכמטית של מהלך ללא טיפול. הצבעים מסמנים אתרי התקף שונים (בטן, חזה, מפרק, עור).'}
  const ystop=playWire(yr,$('#ayPlay'),drawY,9000,'הפעלה חוזרת','attack');
  $('#atFreq').addEventListener('click',e=>{const b=e.target.closest('[data-pat]');if(!b)return;pat=b.dataset.pat;$$('[data-pat]').forEach(x=>x.setAttribute('aria-pressed',x===b));EV=gen();drawY(+yr.value)});
  $('#ayCol').onclick=()=>{col=!col;$('#ayCol').setAttribute('aria-pressed',col);EV=gen();drawY(+yr.value)};
  drawY(+yr.value);
};

/* =============== 2.1 colchicine inside the cell =============== */
const CI=[
 {from:0,at:.05,k:'סצנה 1 · המעי',t:'נבלע ונספג',
  txt:'קולכיצין נלקח דרך הפה ונספג במעי הדק. הזמינות הביולוגית בנטילה דרך הפה היא בממוצע כ־45%. רמות הפלזמה מגיעות לשיא 1–2 שעות אחרי המנה. P-glycoprotein (P-gp) בדופן המעי שואב חלק מכל מנה בחזרה אל חלל המעי, ו־CYP3A4 של המעי מפרק עוד מעט. <sup class="c" data-ref="Rochdi1994,FDA-Colcrys,Slobodnick2018" title="Source 63,225,243">63,225,243</sup>',
  pt:'הטבליה נספגת מהמעי. רק חלק מכל מנה מגיע לגוף.',
  hook:'קולכיצין הוא סובסטרט של P-glycoprotein (ABCB1) ושל CYP3A4. שניהם חשובים לאינטראקציות בין־תרופתיות.'},
 {from:.12,at:.17,k:'סצנה 2 · כבד ומרה',t:'מחזור דרך המרה',
  txt:'הכבד מפרק חלק מהתרופה דרך CYP3A4 ומפריש חלק ממנה למרה. המרה מחזירה אותה למעי, ושם חלק ממנה נספג שוב: מחזור אנטרוהפטי, שנראה כשיא שני בפלזמה בתוך שעות. הכליות מפרישות חלק ממנה ללא שינוי; התווית האמריקאית מדווחת על 40–65% מהמנה בשתן, ואילו סקירות אחדות מביאות נתונים נמוכים יותר. נפח פיזור עצום (כ־5–8 L/kg) והיקשרות בתוך התאים יוצרים זמן מחצית חיים ארוך, כ־27–31 שעות במתן חוזר, אם כי הטווח בין המחקרים רחב. <sup class="c" data-ref="Ferron1996,FDA-Colcrys,Finkelstein2010" title="Source 63,66,67">63,66,67</sup>',
  pt:'הכבד מוציא את התרופה במרה, והמעי סופג חלק ממנה בחזרה, ולכן היא נשארת בגוף זמן רב.',
  hook:'המחזור האנטרוהפטי עוזר להסביר את זמן מחצית החיים הארוך, ומדוע מחלת כבד או דרכי מרה מעלה את החשיפה לתרופה.'},
 {from:.26,at:.34,k:'סצנה 3 · נויטרופילים',t:'התרופה מצטברת בתאים הלבנים',
  txt:'בגרנולוציטים אין משאבת P-glycoprotein פעילה, ולכן קולכיצין שנכנס אליהם אינו נדחף החוצה. הרמות בלויקוציטים מגיעות לשיא כיומיים אחרי המנה, זמן רב אחרי שיא הפלזמה בתוך כשעה, והריכוזים בנויטרופילים יכולים לעלות על שיא הפלזמה פי יותר מ־16. ההסבר לכך שנויטרופילים לוכדים את התרופה הוא השערה הנתמכת היטב. הרמות משתנות מאוד בין אנשים: אצל 30 מטופלים שנטלו 0.5 עד 2 mg ביום, הרמות בפלזמה ובלויקוציטים לא תאמו את המינון שנלקח, והקליטה ללויקוציטים הייתה ניתנת לרוויה. <sup class="c" data-ref="Chappey1993,Chappey1994,Klimecki1994,Leung2015,BenChetrit1998MH" title="Source 11,38,39,129,147">11,38,39,129,147</sup>',
  pt:'תאי הדם הלבנים סופגים את התרופה ומחזיקים בה. הרמות בפלזמה יורדות בתוך שעות, אבל בתוך התאים הלבנים הן נשארות גבוהות במשך ימים.',
  hook:'מעט P-gp בנויטרופילים = לכידה בתוך התא. זו אחת הסיבות לכך שהתרופה בררנית כל כך לדלקת שמונעת על ידי נויטרופילים.'},
 {from:.45,at:.5,k:'סצנה 4 · טובולין',t:'היקשרות לטובולין חופשי',
  txt:'בתוך התא קולכיצין נקשר ל־β-טובולין חופשי ב"אתר הקולכיצין". קומפלקס הטובולין–קולכיצין מצטרף לקצה הגדל של מיקרוטובולי ועוצר את המשך הצמיחה שלו. <sup class="c" data-ref="Leung2015" title="Source 147">147</sup>',
  pt:'התרופה תופסת את אבני הבניין של השלד הפנימי של התא.',
  hook:'קולכיצין נקשר ל<b>טובולין</b> (ולא למיקרוטובולי המוגמר). ריכוזים נמוכים חוסמים את הקצה; ריכוזים גבוהים יותר מפרקים את המיקרוטובולי (דה־פולימריזציה).'},
 {from:.6,at:.66,k:'סצנה 5 · מיקרוטובולים',t:'השלד מתקצר',
  txt:'מיקרוטובולים גדלים ומתקצרים כל הזמן. כשהקצוות הגדלים שלהם חסומים, הם מתקצרים מהר יותר משהם נבנים מחדש. חלבונים שהיו מעוגנים עליהם, ובהם GEF-H1, המפעיל של RhoA, משתחררים לציטופלזמה. <sup class="c" data-ref="Leung2015,Park2016" title="Source 147,207">147,207</sup>',
  pt:'השלד מתפרק, וחלבונים שהיו קשורים אליו משתחררים.',
  hook:'פירוק המיקרוטובולים משחרר את GEF-H1, שמפעיל את RhoA.'},
 {from:.74,at:.8,k:'סצנה 6 · פירין',t:'שתי דרכים מוצעות שבהן הפירין נשאר שקט',
  txt:'מסלול 1: GEF-H1 חופשי מפעיל את RhoA, RhoA מפעיל את PKN, PKN מזרחן מחדש את הפירין, ו־14-3-3 מחזיק אותו כבוי. מסלול 2: הפירין זקוק למיקרוטובולים שלמים לשלב ההפעלה השני שלו, ולכן בלעדיהם לא נוצר כתם ASC (ASC speck). Gao ועמיתיו מצאו שתרופות הפועלות על מיקרוטובולים לא מנעו את הדה־פוספורילציה של הפירין, וזה תומך במסלול 2. איזה מסלול דומיננטי במינונים קליניים עדיין שנוי במחלוקת. <sup class="c" data-ref="Park2016,Gao2016,VanGorp2016,Schnappauf2019" title="Source 74,207,234,270">74,207,234,270</sup>',
  pt:'לחוקרים יש שני הסברים לאופן שבו זה משאיר את הפירין שקט. ייתכן ששניהם נכונים בחלקם.',
  hook:'תשובה לבחינה: קולכיצין ← טובולין ← פירוק מיקרוטובולים ← <b>הפעלה מופחתת של אינפלמזום הפירין</b> ותפקוד מופחת של נויטרופילים.'},
 {from:.87,at:.93,k:'סצנה 7 · הנויטרופיל',t:'פחות זחילה, פחות היצמדות',
  txt:'בלי רשת מיקרוטובולים תקינה, נויטרופילים מתקטבים בקושי ונודדים בקושי אל עבר חומרים כימוטקטיים. קולכיצין משנה גם את ההיצמדות, בשתי רמות ריכוז: ברמות נמוכות מאוד, בטווח המניעתי (IC50 כ־3 nM), הוא משנה את הפיזור, לא את הכמות, של E-selectin על תאי האנדותל, ומבטל את היצמדות הנויטרופילים אליהם; ברמות גבוהות יותר, בטווח הטיפולי (IC50 כ־300 nM), הנויטרופילים מאבדים L-selectin. פחות נויטרופילים נצמדים ויוצאים מזרם הדם. הוא יכול גם להחליש את הרכבת NLRP3, שזקוק למיקרוטובולים כדי לקרב את חלקיו זה לזה, אם כי במעבדה הדבר דורש ריכוזים גבוהים יותר. <sup class="c" data-ref="Cronstein1995,Leung2015,Misawa2013" title="Source 41,147,178">41,147,178</sup>',
  pt:'התאים הלבנים נעים ונצמדים פחות, ולכן פחות מהם מגיעים אל הקרומים שבהם מתרחשים ההתקפים.',
  hook:'שתי שכבות של השפעה: <b>בתוך</b> התא (פירין, NLRP3) ו<b>בין</b> התאים (כימוטקסיס, היצמדות בתיווך סלקטינים).'}
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
         pgpX:64,pgpY:208,pgpT:'⁧P-gp מחזיר חלק בחזרה',
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
         pgpX:400,pgpY:270,pgpT:'⁧P-gp בדופן המעי מחזיר חלק בחזרה',
         ehA:'M300 258 q-20 30 -60 22',ehLx:160,ehLy:330};
    let s=`<g style="opacity:${f1(o)}">`;
    // anatomy
    s+=`<path d="${pl(L.IN.slice(0,L.esoN))}" style="fill:none;stroke:var(--line);stroke-width:12;stroke-linecap:round"/>`;
    s+=`<ellipse cx="${L.stCx}" cy="${L.stCy}" rx="${L.stRx}" ry="${L.stRy}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><text x="${L.stLx}" y="${L.stLy}" class="${L.stCls}">קיבה</text>`;
    s+=`<path d="${L.gut}" style="fill:none;stroke:var(--memb);stroke-width:${L.gutW};stroke-linecap:round;opacity:.55"/><text x="${L.giLx}" y="${L.giLy}" class="t-sm">המעי הדק</text>`;
    s+=`<path d="${pl(L.PORT)}" style="fill:none;stroke:var(--bad);stroke-width:5;opacity:.35"/><text x="${L.pvLx}" y="${L.pvLy}" class="t-xs"${L.pvRot}>וריד השער</text>`;
    s+=`<path d="M${L.livX} ${L.livY} q60 -40 120 -6 q20 30 -10 56 q-60 34 -116 6 q-24 -24 6 -56z" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/><text x="${L.livX+64}" y="${L.livY+22}" class="t-lbl t-mid">כבד</text><text x="${L.livX+64}" y="${L.livY+38}" class="t-xs t-mid">CYP3A4</text>`;
    s+=`<path d="${pl(L.BILE)}" style="fill:none;stroke:var(--gold);stroke-width:4;stroke-dasharray:6 5"/><circle cx="${L.bileCx}" cy="${L.bileCy}" r="12" style="fill:var(--gold-soft);stroke:var(--gold)"/><text x="${L.bileLx}" y="${L.bileLy}" class="t-xs" style="fill:var(--gold)">⁧מרה ← חזרה למעי</text>`;
    s+=`<path d="${pl(L.BLOOD)}" style="fill:none;stroke:var(--bad);stroke-width:7;opacity:.4"/><text x="${L.bloodLx}" y="${L.bloodLy}" class="t-sm">דם</text>`;
    s+=`<path d="${L.kidStem}" style="stroke:var(--bad);stroke-width:7;opacity:.4"/><path d="M${L.kidX} ${L.kidY} q-14 -26 10 -34 q20 -4 22 20 q-4 24 -32 14z" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="${L.kidLx}" y="${L.kidLy}" class="${L.kidCls}">⁧כליה ← שתן (40–65%)</text>`;
    s+=`<rect x="${L.tabX}" y="${L.tabY}" width="32" height="16" rx="8" style="fill:var(--crocus);opacity:${f1(1-ramp(t,0,.04))}"/><text x="${L.tabLx}" y="${L.tabLy}" class="t-xs">טבליה</text>`;
    s+=`<text x="${f1(L.pgpX)}" y="${f1(L.pgpY)}" class="t-xs" style="fill:var(--crocus)">${L.pgpT}</text>`;
    const T=t/.26;
    MOL.forEach((m,i)=>{const life=clamp(T*1.5-m.o);if(life<=0)return;let p;
      if(life<.32)p=along(L.IN,life/.32);else if(life<.5)p=along(L.PORT,(life-.32)/.18);
      else if(m.loop&&life<.78)p=along(L.BILEM,(life-.5)/.28);else if(m.loop)p=along(L.PORT,(life-.78)/.22);else p=along(L.BLOOD,(life-.5)/.5);
      s+=mol(p[0],p[1]+(i%3-1)*3)});
    if(t>.12)s+=`<path d="${L.ehA}" class="arrow" style="stroke:var(--gold)"/><text x="${L.ehLx}" y="${L.ehLy}" class="t-xs" style="fill:var(--gold)">מחזור אנטרוהפטי</text>`;
    return s+'</g>'}
  function sceneB(t,o){if(o<=0)return'';const k=ramp(t,.26,.44);
    const L=N
      ? {hx:20,hy:24, nCx:200,nCy:138,nR:84, nLy:244,nL2y:260,
         pCx:200,pCy:386,pR:70,pNuc:24,pIn:48,pOut:92, pLy:498,pL2y:514,
         pumpLx:20,pumpLy:322,
         cx0:28,cx1:380,cy0:584,cy1:660,
         head:['⁧אחרי מנה אחת · 0–4 ימים','כל עקומה מותאמת לשיא שלה','⁧(הרמות בלויקוציטים גבוהות בהרבה)'],headY:540,
         lgx:28,lgx2:160,lgy:680,lgEnd:false}
      : {hx:20,hy:28, nCx:190,nCy:150,nR:100, nLy:272,nL2y:288,
         pCx:500,pCy:150,pR:88,pNuc:30,pIn:60,pOut:120, pLy:262,pL2y:278,
         pumpLx:600,pumpLy:60,
         cx0:40,cx1:700,cy0:310,cy1:380,
         head:['⁧אחרי מנה אחת · 0–4 ימים · כל עקומה מותאמת לשיא שלה (הרמות בלויקוציטים גבוהות בהרבה)'],headY:304,
         lgx:700,lgx2:700,lgy:314,lgEnd:true};
    const sc=L.nR/100;
    let s=`<g style="opacity:${f1(o)}">`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-sm">בזרם הדם</text>`;
    s+=`<circle cx="${L.nCx}" cy="${L.nCy}" r="${L.nR}" style="fill:var(--neut);stroke:var(--crocus);stroke-width:3"/><text x="${L.nCx}" y="${L.nLy}" class="t-lbl t-mid">נויטרופיל</text><text x="${L.nCx}" y="${L.nL2y}" class="t-xs t-mid">⁧מעט P-gp ← התרופה נלכדת</text>`;
    [[-30,-18,22],[26,14,22],[18,-34,18]].forEach(([dx,dy,rr])=>s+=`<circle cx="${f1(L.nCx+dx*sc)}" cy="${f1(L.nCy+dy*sc)}" r="${f1(rr*sc)}" style="fill:var(--nuc);opacity:.85"/>`);
    const rN=rng(3);const nIn=Math.round(6+44*k);for(let i=0;i<nIn;i++){const a=rN()*6.283,d=(20+rN()*68)*sc;s+=mol(L.nCx+Math.cos(a)*d,L.nCy+Math.sin(a)*d,.9)}
    s+=`<circle cx="${L.pCx}" cy="${L.pCy}" r="${L.pR}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:3"/><circle cx="${L.pCx}" cy="${L.pCy}" r="${L.pNuc}" style="fill:var(--nuc);opacity:.6"/><text x="${L.pCx}" y="${L.pLy}" class="t-lbl t-mid">⁧תא עם משאבות P-gp</text><text x="${L.pCx}" y="${L.pL2y}" class="t-xs t-mid">למשל רירית המעי, כבד, כליה</text>`;
    [-.6,.5,1.6,2.7].forEach((a,i)=>{const x=L.pCx+L.pR*Math.cos(a),y=L.pCy+L.pR*Math.sin(a);s+=`<rect x="${f1(x-7)}" y="${f1(y-11)}" width="14" height="22" rx="4" transform="rotate(${f1(a*57.3+90)} ${f1(x)} ${f1(y)})" style="fill:var(--sea)"/>`;
      const ph=((t*30+i*.25)%1);s+=mol(lerp(L.pCx+L.pIn*Math.cos(a),L.pCx+L.pOut*Math.cos(a),ph),lerp(L.pCy+L.pIn*Math.sin(a),L.pCy+L.pOut*Math.sin(a),ph),1-ph)});
    s+=`<text x="${L.pumpLx}" y="${L.pumpLy}" class="t-xs" style="fill:var(--sea)">⁧P-gp שואב אותה החוצה</text>`;
    // mini chart: plasma vs leukocyte
    const x0=L.cx0,x1=L.cx1,y0=L.cy0,y1=L.cy1;s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    L.head.forEach((h,i)=>s+=`<text x="${x0}" y="${L.headY+i*14}" class="t-xs">${h}</text>`);
    const pf=u=>{const h=u*96;return h<1?h:.25*Math.exp(-(h-1)/40)+.75*Math.exp(-(h-1)/3)};const lf=u=>{const h=u*96;return (h/47)*Math.exp(1-h/47)};
    s+=`<path d="${pathFn(u=>u<=k?pf(u):NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--bad);stroke-width:2.5"/><path d="${pathFn(u=>u<=k?lf(u):NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--crocus);stroke-width:3"/>`;
    s+=`<text x="${L.lgx}" y="${L.lgy}" class="t-xs${L.lgEnd?' t-end':''}" style="fill:var(--crocus)">בתוך לויקוציטים</text><text x="${L.lgx2}" y="${L.lgy+(L.lgEnd?14:0)}" class="t-xs${L.lgEnd?' t-end':''}" style="fill:var(--bad)">פלזמה</text>`;
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
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-sm">⁧בתוך הנויטרופיל · מיקרוטובולים</text><circle cx="${L.ctCx}" cy="${L.ctCy}" r="${L.ctR}" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="${L.ctCx}" y="${L.ctLy}" class="t-xs t-mid">צנטרוזום</text>`;
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
    s+=`<text x="${L.poolLx}" y="${L.poolLy}" class="t-xs">⁧טובולין + קולכיצין חוסמים קצוות גדלים</text>`;
    s+=`<g transform="translate(${L.keyX} ${L.keyY})"><circle cx="6" cy="0" r="6" style="fill:var(--good)"/><text x="16" y="4" class="t-xs">GEF-H1</text><path d="M6 14 l5 5 -5 5 -5 -5z" style="fill:var(--crocus)"/><text x="16" y="23" class="t-xs">קולכיצין</text></g>`;
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
    s+=`<text x="20" y="${L.r1y}" class="t-sm">⁧מסלול 1 · GEF-H1 ← RhoA ← בלם הפירין חוזר</text><text x="${L.r1Nx}" y="${L.r1Ny}" class="t-xs t-end" style="fill:var(--warn)">מוצע · נתמך בתאים</text>`;
    const chain=[['GEF-H1','var(--good)'],['RhoA-GTP','var(--sea)'],['PKN1/2','var(--muted)'],['⁧פירין-P · 14-3-3','var(--crocus)']];
    chain.forEach(([l,c],i)=>{const on=ramp(a,i*.22,i*.22+.25),w=i===3?L.cbW4:L.cbW;
      const x=N?L.cbX:L.cbX+i*L.cbStep, y=N?L.cbY+i*L.cbStep:44;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" style="fill:var(--panel);stroke:${c};stroke-width:${f1(1+2*on)};opacity:${f1(.3+.7*on)}"/><text x="${x+w/2}" y="${y+25}" class="t-lbl t-mid" style="opacity:${f1(.3+.7*on)}">${l}</text>`;
      if(i<3)s+=N
        ?`<path d="M${x+w/2} ${y+42} V${y+L.cbStep-2}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`
        :`<path d="M${x+132} 64 H${x+156}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`});
    s+=`<text x="${L.offX}" y="${L.offY}" class="t-xs" style="fill:var(--crocus);opacity:${f1(ramp(a,.8,1))}">⁧הפירין מוחזק כבוי (כמו במצב מנוחה)</text>`;
    s+=`<text x="20" y="${L.r2y}" class="t-sm">⁧מסלול 2 · ${N?'אין מיקרוטובולים ← שלב 2 לא מושלם':'אין פלטפורמת מיקרוטובולים ← שלב 2 לא מושלם'}</text><text x="${L.r2Nx}" y="${L.r2Ny}" class="t-xs t-end" style="fill:var(--warn)">מוצע · נתמך בתאים</text>`;
    const r2=ramp(a,.3,1);
    s+=`<g style="opacity:${f1(.3+.7*r2)}"><rect x="${L.d2X}" y="${L.d2Y}" width="${L.d2W}" height="40" rx="10" style="fill:var(--panel);stroke:var(--terra);stroke-width:2"/><text x="${L.d2Cx}" y="${L.d2Y+25}" class="t-lbl t-mid">פירין לא מזורחן</text>`;
    s+=N?`<path d="M${L.d2Cx} ${L.d2Y+42} V${L.ascY-30}" class="arrow" marker-end="url(#ciA)"/>`:`<path d="M${L.d2X+L.d2W+2} ${L.d2Y+20} H${L.ascX-50}" class="arrow" marker-end="url(#ciA)"/>`;
    for(let k=0;k<14;k++){const an=k/14*6.283;s+=`<circle cx="${f1(L.ascX+Math.cos(an)*22)}" cy="${f1(L.ascY+Math.sin(an)*22)}" r="4" style="fill:var(--crocus);opacity:.45"/>`}
    s+=`<path d="M${L.ascX-28} ${L.ascY-28} L${L.ascX+28} ${L.ascY+28} M${L.ascX+28} ${L.ascY-28} L${L.ascX-28} ${L.ascY+28}" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round;opacity:${f1(r2)}"/><text x="${L.ascTx}" y="${L.ascTy}" class="t-lbl">⁧אין כתם ASC</text></g>`;
    // neutrophil effects
    s+=`<text x="20" y="${L.effHy}" class="t-sm" style="opacity:${f1(.3+.7*b)}">ובנויטרופיל כולו</text>`;
    const eff=[['כימוטקסיס','זוחל בקושי אל עבר; חומרים כימוטקטיים'],['היצמדות','⁧משיל L-selectin; ⁧E-selectin מוזז'],['NLRP3','גם ההרכבה שלו; מוחלשת']];
    eff.forEach(([h,d],i)=>{const on=ramp(b,i*.25,i*.25+.3);
      const x=N?L.effX:L.effX+i*L.effStep, y=N?L.effY+i*L.effStep:L.effY;
      s+=`<g style="opacity:${f1(.25+.75*on)}"><rect x="${x}" y="${y}" width="${L.effW}" height="${L.effH}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>${neutro(x+L.nX,y+L.nY,16,1)}<text x="${x+L.txX}" y="${y+L.ttY}" class="t-lbl">${h}</text><text x="${x+L.txX}" y="${y+L.l1Y}" class="t-xs">${d.split('; ')[0]}</text><text x="${x+L.txX}" y="${y+L.l2Y}" class="t-xs">${d.split('; ')[1]||''}</text>`;
      if(i===0)s+=`<path d="M${x+L.arrX} ${y+L.arrY} h${f1(L.arrLen+L.arrVar*(1-on))}" class="arrow" marker-end="url(#ciA)"/><path d="M${x+L.crX} ${y+L.crY} l14 18 M${x+L.crX+14} ${y+L.crY} l-14 18" style="stroke:var(--bad);stroke-width:3;opacity:${f1(on)}"/>`;
      if(i===1)s+=`<path d="M${x+L.vwX+20} ${y+L.vwY} H${x+L.vwX+L.vwW+20}" style="stroke:var(--bad);stroke-width:4;opacity:.5"/><text x="${x+L.vwTx}" y="${y+L.vwTy}" class="t-xs" style="fill:var(--bad)">דופן כלי הדם</text>`;
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
  const stop=playWire(rg,$('#ciPlay'),draw,26000,'הפעלה חוזרת','colin');
  const setSt=stepWire($('#ciSteps'),CI,rg,draw,stop);
  $('#ciCards').innerHTML=`
   <div class="card"><span class="ev est">מבוסס</span><h4>קולכיצין נקשר לטובולין ומשבש את המיקרוטובולים</h4><p>הדבר ידוע כבר עשרות שנים, והוא נקודת המוצא של כל מנגנון שהוצע. הפירין עצמו נמצא יושב על מיקרוטובולים ב־2001, הרבה לפני שמישהו ידע מדוע זה חשוב. <sup class="c" data-ref="Leung2015,Mansfield2001" title="Source 147,166">147,166</sup></p></div>
   <div class="card"><span class="ev est">מבוסס</span><h4>קולכיצין מדכא באופן בררני את אינפלמזום הפירין</h4><p>בניסויים בתאים, קולכיצין חסם שחרור של IL-1β שמונע על ידי פירין, בלי השפעה עקבית על NLRP3, NLRC4 או AIM2 בריכוזים שנבדקו. <sup class="c" data-ref="Gao2016,Park2016" title="Source 74,207">74,207</sup></p></div>
   <div class="card"><span class="ev early">שנוי במחלוקת</span><h4>איזה מסלול חשוב יותר?</h4><p>הפעלה מחדש של GEF-H1/RhoA (מסלול 1) ואובדן השלב התלוי במיקרוטובולים (מסלול 2) הודגמו שניהם בתאים בתרבית. התוצאות שונות בין היתר משום שהמחקרים השתמשו בריכוזי תרופה שונים. <sup class="c" data-ref="Park2016,Gao2016,Schnappauf2019" title="Source 74,207,234">74,207,234</sup></p></div>
   <div class="card"><span class="ev early">חידה</span><h4>הפירין ב־FMF יכול להיות מופעל בלי מיקרוטובולים</h4><p>בתאים של מטופלים, וריאנטים של FMF ביטלו את הצורך במיקרוטובולים, ובכל זאת קולכיצין עדיין יעיל בטיפול בחולים. ההסברים שהוצעו כוללים את השפעותיו על נדידת הנויטרופילים ועל היצמדותם, ותלות חלקית במיקרוטובולים שנותרה בגוף. זו שאלה פתוחה. <sup class="c" data-ref="VanGorp2016,Magnotti2019" title="Source 162,270">162,270</sup></p></div>`;
  draw(+rg.value);
};

/* =============== 2.2 colchicine over months =============== */
const CM_STEPS=[
 {from:0,at:.05,k:'חודשים −3 עד 0',t:'לפני הטיפול',
  txt:'ללא טיפול, התקפים מופיעים כל כמה שבועות. רמת ה־SAA מזנקת בזמן התקפים (חציון של 693 mg/L בקבוצה אחת), ואצל חלק מהחולים היא נשארת מעל התקין גם בין התקפים. SAA שנשאר גבוה לאורך זמן הוא הדלק של העמילואידוזיס. <sup class="c" data-ref="Lachmann2006,Lachmann2007" title="Source 141,142">141,142</sup>',
  pt:'לפני הטיפול, ההתקפים ממשיכים להגיע, ודלקת סמויה נמשכת גם ביניהם.',
  hook:'מטפלים לקראת שני יעדים: <b>ללא התקפים</b> ו־<b>SAA/CRP תקינים בין התקפים</b>.'},
 {from:.111,at:.13,k:'ימים 1–14',t:'התרופה מצטברת בתאי הדם הלבנים',
  txt:'אחרי כל מנה, הרמה בלויקוציטים מגיעה לשיא כעבור כיומיים. עם זמן מחצית חיים של כ־27–31 שעות במתן חוזר, הרמות בפלזמה מתקרבות למצב יציב (steady state) בתוך כשבוע, והרמות בלויקוציטים נבנות לאורך פרק זמן דומה או מעט ארוך יותר. זוהי הערכה פרמקוקינטית, לא תוצאה של ניסוי. <sup class="c" data-ref="Chappey1993,FDA-Colcrys,BenChetrit2018Textbook" title="Source 16,38,63">16,38,63</sup>',
  pt:'בשבוע או בשבועיים הראשונים התרופה עדיין מצטברת בתוך תאי הדם הלבנים.',
  hook:'קולכיצין הוא <b>טיפול מונע</b> יומי. בזמן התקף, לפי ההנחיות ממשיכים במינון הרגיל ומוסיפים NSAIDs.'},
 {from:.15,at:.19,k:'חודשים 1–3',t:'פחות התקפים, וזה ניכר לאט',
  txt:'מכיוון שמלכתחילה היו בין ההתקפים שבועות, נדרשים חודשים של מעקב כדי לראות שהם נעשו נדירים יותר. EULAR 2016 המליץ לבחון את התגובה, את הרעילות ואת ההיענות לטיפול כל 6 חודשים; קונצנזוס גרמני של טיפול מכוון יעד (treat-to-target) מציע כל 3–6 חודשים. בניסויים מבוקרי הפלצבו של 1974 היו תקופות הטיפול באורך 2–3 חודשים. <sup class="c" data-ref="Ozen2016,Ozen2017,Ehlers2023,Zemer1974,Goldstein1974" title="Source 59,87,199,200,285">59,87,199,200,285</sup>',
  pt:'ההתקפים מופיעים לעיתים רחוקות יותר, אבל מבחינים בכך רק אחרי כמה חודשים, כי ממילא היו ביניהם שבועות.',
  hook:'התגובה מוערכת לאורך חודשים. אל תגדירו מישהו כעמיד לקולכיצין אחרי כמה שבועות בלבד.'},
 {from:.222,at:.27,k:'חודשים 3–6',t:'התאמת המינון',
  txt:'אם ההתקפים או המדדים המוגברים נמשכים, ההנחיות ממליצות להעלות את המינון בהדרגה (לרוב בצעדים של 0.25–0.5 mg) עד המינון המרבי הנסבל, לבדוק CRP או SAA לפחות כל 3 חודשים בזמן ההעלאה, ולוודא קודם את ההיענות לטיפול. EULAR 2016 הציע לחשוב על עמידות כשנמשך ≥1 התקף בחודש אחרי ≥6 חודשים במינון המרבי הנסבל. קונצנזוס מ־2021 משתמש בהגדרה של ≥1 התקף בחודש לאורך 3 חודשים, או דלקת מעבדתית מתמשכת. <sup class="c" data-ref="Ozen2017,Ehlers2023,Ozen2021" title="Source 59,200,202">59,200,202</sup>',
  pt:'אם ההתקפים נמשכים, הרופאים בדרך כלל מעלים את המינון צעד אחר צעד, ובודקים שהכדורים אכן נלקחים כל יום.',
  hook:'לפני "עמידות": לוודא היענות לטיפול, ואז להעלות את המינון עד המרב.'},
 {from:.333,at:.6,k:'חודשים 6–24',t:'SAA חוזר לתקין, וההגנה מצטברת',
  txt:'בשליטה מלאה, ה־SAA בין התקפים יורד לטווח התקין. אצל ילדים עם SAA גבוה, העלאת מינון הורידה את ה־SAA החציוני מ־244 ל־35.5 mg/L בתוך 2 חודשים. נטילה סדירה של קולכיצין מונעת עמילואידוזיס מסוג AA גם אצל חולים שיש להם התקפים מדי פעם. הטיפול הוא לכל החיים; EULAR 2016 התיר לשקול הפחתת מינון רק אחרי 5 שנים ומעלה ללא התקפים, עם מדדים תקינים. <sup class="c" data-ref="Duzova2003,Zemer1986,Lachmann2007,Ozen2017" title="Source 58,142,200,286">58,142,200,286</sup>',
  pt:'עם הזמן הדלקת הסמויה שוככת, וזה מגן על הכליות לטווח הארוך. הטיפול נמשך כל החיים.',
  hook:'התפקיד החשוב ביותר של קולכיצין הוא מניעת <b>עמילואידוזיס</b>. השליטה בהתקפים היא רק החלק הנראה לעין.'}
];
const CM_SC={
 full:{n:'תגובה מלאה',eff:[.95,.95],off:[]},
 partial:{n:'תגובה חלקית',eff:[.6,.82],off:[]},
 miss:{n:'מנות רבות שהוחמצו',eff:[.95,.95],off:[[150,215],[330,380],[500,575]]},
 resist:{n:'עמיד לקולכיצין',eff:[.3,.38],off:[]}
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
    s+=N?`<text x="${X0}" y="${axisY+16}" class="t-xs">חודשים מתחילת הטיפול · <tspan style="fill:var(--warn)">מודל להמחשה</tspan></text>`:`<text x="${X1}" y="468" class="t-xs t-end">חודשים מתחילת הקולכיצין</text><text x="${X0}" y="468" class="t-xs" style="fill:var(--warn)">מודל להמחשה · לא קינטיקה שנמדדה</text>`;
    s+=`<rect x="${f1(xd(0))}" y="14" width="${f1(X1-xd(0))}" height="${gridBot-14}" style="fill:var(--crocus-soft);opacity:.35"/>`;
    // panel 1 drug
    s+=panel(y1,h1,'קולכיצין בתוך הלויקוציטים · מקווקו = המינון שנרשם','var(--crocus)');
    const sl=(arr,mx,y0,h)=>{let d='';for(let i=0;i<=iNow;i+=2)d+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y0+h-h*clamp(arr[i]/mx));return d};
    s+=`<path d="${sl(S.lv,1.05,y1,h1)}" style="fill:none;stroke:var(--crocus);stroke-width:2.5"/>`;
    s+=`<path d="${sl(S.dose,1.05,y1,h1)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 4"/>`;
    CM_SC[sc].off.forEach(([a,b])=>{if(a<=dNow)s+=`<rect x="${f1(xd(a))}" y="${y1+14}" width="${f1(xd(Math.min(b,dNow))-xd(a))}" height="${h1-14}" style="fill:var(--bad);opacity:.12"/><text x="${f1(xd(a)+3)}" y="${y1+26}" class="t-xs" style="fill:var(--bad)">מנות שהוחמצו</text>`});
    // inset: first 3 weeks
    if(dNow>=0&&dNow<60){const ix=N?X0:430,iy=N?axisY+30:30,iw=N?(X1-X0):260,ih=70,k=clamp(dNow/21);s+=`<rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" rx="8" style="fill:var(--panel);stroke:var(--line)"/><text x="${ix+8}" y="${iy+14}" class="t-xs">\u2067הגדלה · 21 הימים הראשונים\u2069</text>`;
      let pd='',ld='';for(let i=0;i<=200*k;i++){const day=i/200*21,ph=day%1;const p=(ph<.06?ph/.06:Math.exp(-(ph-.06)*2.2))*.55+.05;const l=1-Math.exp(-day/4);const x=ix+10+i/200*(iw-20);pd+=(i?'L':'M')+f1(x)+' '+f1(iy+ih-6-(ih-24)*p);ld+=(i?'L':'M')+f1(x)+' '+f1(iy+ih-6-(ih-24)*l)}
      s+=`<path d="${pd}" style="fill:none;stroke:var(--bad);stroke-width:1.2"/><path d="${ld}" style="fill:none;stroke:var(--crocus);stroke-width:2.2"/><text x="${ix+iw-8}" y="${iy+14}" class="t-xs t-end"><tspan style="fill:var(--bad)">פלזמה</tspan> · <tspan style="fill:var(--crocus)">לויקוציטים</tspan></text>`}
    // panel 2 attacks
    s+=panel(y2,h2,'התקפים','var(--terra)');
    S.att.filter(d=>d<=dNow).forEach(d=>{const x=xd(d);s+=`<path d="M${f1(x-4)} ${y2+h2} L${f1(x)} ${y2+20} L${f1(x+4)} ${y2+h2}z" style="fill:var(--terra)"/>`});
    // panel 3 SAA log
    const lg=v=>clamp(Math.log10(Math.max(1,v))/3);
    s+=panel(y3,h3,'\u2067SAA (סולם לוגריתמי, mg/L)\u2069','var(--gold)');
    s+=`<rect x="${X0}" y="${f1(y3+h3-h3*lg(10))}" width="${X1-X0}" height="${f1(h3*lg(10))}" style="fill:var(--good-soft);opacity:.8"/><text x="${X1-4}" y="${f1(y3+h3-4)}" class="t-xs t-end" style="fill:var(--good)">\u2067טווח תקין (&lt;10)\u2069</text>`;
    [1,10,100,1000].forEach(v=>s+=`<text x="${X0-6}" y="${f1(y3+h3-h3*lg(v)+3)}" class="t-xs t-end">${v}</text>`);
    let sd='';for(let i=0;i<=iNow;i++)sd+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y3+h3-h3*lg(S.saa[i]));s+=`<path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:1.6"/>`;
    // panel 4 cumulative inflammatory burden
    const mx=untreatedCum[ND];s+=panel(y4,h4,'\u2067עומס SAA מצטבר · מקווקו = ללא טיפול כלל\u2069','var(--bad)');
    let ud='';for(let i=0;i<=ND;i+=4)ud+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y4+h4-h4*untreatedCum[i]/mx);s+=`<path d="${ud}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    let cd='';for(let i=0;i<=iNow;i+=2)cd+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y4+h4-h4*S.cum[i]/mx);s+=`<path d="${cd}" style="fill:none;stroke:var(--bad);stroke-width:2.6"/>`;
    s+=`<line x1="${f1(xd(dNow))}" x2="${f1(xd(dNow))}" y1="14" y2="${gridBot+2}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/>`;
    s+=`<text x="${f1(xd(0)+4)}" y="${y2+12}" class="t-xs" style="fill:var(--crocus)">\u2067הקולכיצין מתחיל ↓\u2069</text>`;
    svg.innerHTML=s;
    const p=phaseOf(CM_STEPS,t);setSt(p);
    const last90=S.att.filter(d=>d<=dNow&&d>dNow-90).length;
    const months=(dNow/30.4);
    $('#cmRead').innerHTML=`<span>חודש <b>\u2066${months.toFixed(1)}\u2069</b></span><span>התקפים ב־90 הימים האחרונים <b>${last90}</b></span><span>SAA היום <b>${Math.round(S.saa[iNow])} mg/L</b></span><span>התרופה בלויקוציטים <b>${S.dose[iNow]>0?Math.min(100,Math.round(100*S.lv[iNow]/S.dose[iNow])):0}%</b> מהמצב היציב במינון הנוכחי</span>`;
    let extra='';
    if(sc==='partial')extra='<div class="kv"><div><dt>התרחיש הזה</dt><dd>ההתקפים פוחתים אבל לא נפסקים. בחודש 4 המינון מועלה (הקו המקווקו עולה מדרגה), וזה עוזר עוד. אם ה־SAA או ההתקפים נמשכים במינון המרבי הנסבל, ההנחיות מוסיפות חסימה של IL-1. <sup class="c" data-ref="Ozen2016" title="Source 199">199</sup></dd></div></div>';
    if(sc==='miss')extra='<div class="kv"><div><dt>התרחיש הזה</dt><dd>כל הפסקה בנטילה מאפשרת לרמות בלויקוציטים להתרוקן בתוך ימים, וההתקפים וה־SAA חוזרים באיחור מסוים. היענות נמוכה לטיפול שכיחה: במרפאה ישראלית אחת רק 13% מילאו כל מרשם במשך שנה. זו סיבה שכיחה לעמידות לכאורה, ובקבוצה של Zemer היא הייתה ההבדל בין 1.7% ל־48.9% שפיתחו פרוטאינוריה. <sup class="c" data-ref="BenChetrit2009D,Zemer1986,Ozen2017" title="Source 14,200,286">14,200,286</sup></dd></div></div>';
    if(sc==='resist')extra='<div class="kv"><div><dt>התרחיש הזה</dt><dd>בערך 5–10% מהחולים ממשיכים לסבול מהתקפים או ממדדים מוגברים למרות המינון המרבי הנסבל, ועוד 2–5% אינם יכולים לסבול אותו. בדרך כלל ממשיכים בקולכיצין, כי ייתכן שהוא עדיין מוריד את הסיכון לעמילואיד, ומוסיפים חוסם IL-1. <sup class="c" data-ref="Ozen2017,BenChetrit2018Textbook,Ozen2025,DeBenedetti2018" title="Source 16,44,200,203">16,44,200,203</sup></dd></div></div>';
    $('#cmNote').innerHTML=noteHTML(CM_STEPS[p])+extra;
  }
  const stop=playWire(rg,$('#cmPlay'),draw,22000,'הפעלה חוזרת','colmonths');
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
    s+=`<text x="${x1}" y="${y1+36}" class="t-xs t-end">שנים</text><text x="${x0}" y="14" class="t-xs">\u2067סיכון מצטבר לעמילואידוזיס מסוג AA (סכמטי)\u2069</text>`;
    s+=`<path d="${pathFn(u=>u*12<=Y?untreated(u*12)/.7:NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--bad);stroke-width:3"/>`;
    s+=`<path d="${pathFn(u=>u*12<=Y?adherent(u*12)/.7:NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--crocus);stroke-width:3"/>`;
    s+=`<text x="${f1(xy(Math.max(2,Math.min(Y,11.5))))}" y="${f1(yv(untreated(Math.max(2,Math.min(Y,11.5))))-8)}" class="t-xs t-end" style="fill:var(--bad)">${NL?'ללא טיפול':'ללא טיפול / ללא היענות'}</text><text x="${f1(xy(Math.max(2,Math.min(Y,11.5))))}" y="${f1(yv(adherent(Math.max(2,Math.min(Y,11.5))))-8)}" class="t-xs t-end" style="fill:var(--crocus)">${NL?'עם היענות':'קולכיצין בהיענות טובה'}</text>`;
    s+=`<circle cx="${f1(xy(9))}" cy="${f1(yv(.489))}" r="5" style="fill:none;stroke:var(--bad);stroke-width:2;opacity:${f1(ramp(Y,10,11))}"/><circle cx="${f1(xy(11))}" cy="${f1(yv(.017))}" r="5" style="fill:none;stroke:var(--crocus);stroke-width:2;opacity:${f1(ramp(Y,10,11))}"/>`;
    ls.innerHTML=s;
    $('#clCap').innerHTML=`שנה ${Y.toFixed(0)}: ללא טיפול ${Math.round(untreated(Y)*100)}% לעומת עם היענות ${(adherent(Y)*100).toFixed(1)}%. העקומות עוברות דרך הנקודות המוקפות בעיגול מתוך Zemer ועמיתיו, 1986: פרוטאינוריה מצטברת של 48.9% אחרי 9 שנים בחולים ללא היענות, ו־1.7% אחרי 11 שנים בחולים עם היענות (1,070 חולים). בין הנקודות האלה ומעבר להן, העקומות הן אינטרפולציות חלקות. הסיכון האמיתי תלוי מאוד בגנוטיפ, במוצא ובארץ. <sup class="c" data-ref="Zemer1986,Touitou2007" title="Source 262,286">262,286</sup>`}
  playWire(lr,$('#clPlay'),drawL,9000,'הפעלה חוזרת','colmonths');drawL(+lr.value);
  $('#cmCards').innerHTML=`
   <div class="card"><h4>למה התועלת אינה מיידית</h4><ul><li>התרופה צריכה כמה ימים של נטילה יומית כדי להצטבר בלויקוציטים.</li><li>בין ההתקפים היו שבועות, ולכן הירידה במספרם ניכרת רק לאורך חודשים.</li><li>המינון מותאם בצעדים לאורך חודשים.</li><li>התועלת הגדולה ביותר, מניעת עמילואיד, מצטברת לאורך שנים.</li></ul></div>
   <div class="card"><h4>אי-הבנה נפוצה</h4><p>נטילת קולכיצין נוסף אחרי שהתקף כבר התחיל אינה מה שההנחיות מתארות, וחולים מדווחים לעיתים קרובות שהם עושים זאת. EULAR 2016 ממליץ להמשיך במינון היומי הרגיל בזמן התקף ולהוסיף NSAIDs לתסמינים, תוך שקילת סיבות אחרות לכאב. בנפרד, נאמר שם שאפשר לשקול העלאה זמנית בתקופות של לחץ שידוע שהן מעוררות התקפים, והעלאה בשלב המקדים שלפני התקף מוגדרת שם כלא מוכחת. <sup class="c" data-ref="Ozen2016,Ozen2017,Ozen2025" title="Source 199,200,203">199,200,203</sup></p></div>
   <div class="card"><span class="ev early">בדיקת ראיות</span><h4>בסיס הניסויים דק יותר מהמוניטין</h4><p>בניתוח החוזר של Cochrane, רק אחד מהניסויים מבוקרי הפלצבו של 1974 (Goldstein, RR 0.21, רווח סמך 95% 0.05–0.95) היה חיובי בבירור; הניסוי של Zemer מ־1974 לא היה מובהק. אף ניסוי אקראי לא מדד עמילואידוזיס: התועלת הזאת נשענת על הקבוצה של Zemer מ־1986. <sup class="c" data-ref="Yin2022,Goldstein1974,Zemer1974,Zemer1986" title="Source 87,283,285,286">87,283,285,286</sup></p></div>
   <div class="card"><h4>הגנה גם בלי שלמות</h4><p>גם חולים שעדיין יש להם התקפים מסוימים מוגנים מפני עמילואידוזיס אם הם נוטלים קולכיצין באופן סדיר, כי ה־SAA בין התקפים נשאר נמוך יותר. <sup class="c" data-ref="Zemer1986,Lachmann2007" title="Source 142,286">142,286</sup></p></div>`;
};
/* =============== 2.3 dosing, safety, interactions =============== */
const CD_STEPS=[
 {from:0,at:.12,k:'ימים 0–3',t:'הצטברות לרמה יציבה',
  txt:`אחרי טבליה של 0.6 mg, רמת הקולכיצין בפלזמה מגיעה לשיא תוך 1–2 שעות (Cmax ממוצע 2.5 ng/mL); הזמינות הביולוגית הממוצעת במתן דרך הפה היא כ־45%. זמני מחצית החיים שפורסמו אינם מתיישבים זה עם זה: העלון האמריקאי מדווח על 26.6–31.2 שעות במתן חוזר של 0.6 mg פעמיים ביום, מחקר תוך־ורידי אחד מצא זמן מחצית חיים סופי של 57.8 שעות, ומחקרים ישנים יותר במתן דרך הפה וסקירות מדווחים על כ־7–16 שעות. המקורות אינם מיישבים את הפער הזה, ולכן נכון לקרוא את זמן מחצית החיים כטווח, ולא כמספר מוסכם אחד. כך או כך, כל מנה מתווספת למה שנשאר מהקודמת, עד שהרמות מתייצבות בעלייה וירידה יומיות. קולכיצין יוצא מהגוף בשתי דרכים: משאבות P-glycoprotein (P-gp) במעי, בכבד ובכליה, והאנזים CYP3A4 במעי ובכבד. <sup class="c" data-ref="FDA-Colcrys,Ferron1996,BenChetrit2018Textbook,Slobodnick2018,Leung2015" title="Source 16,63,66,147,243">16,63,66,147,243</sup>`,
  pt:`הטבליה של כל יום מתווספת למה שנשאר מאתמול, עד שהרמה מתייצבת בגל יומי קבוע. כמה זמן מנה אחת נשארת בגוף שנוי במחלוקת: זמני מחצית החיים שפורסמו נעים בין כמה שעות ליותר מיומיים.`,
  hook:`שתי דרכי יציאה: משאבות <b>P-gp</b> והאנזים <b>CYP3A4</b>. חסימה של אחת מהן גורמת להצטברות קולכיצין. זמן מחצית החיים: <b>טווח שנוי במחלוקת</b>, לא מספר אחד.`},
 {from:.29,at:.31,k:'יום 3',t:'נוספת תרופה בעלת אינטראקציה',
  txt:`מעכבים חזקים של CYP3A4 ומעכבי P-gp סוגרים את דרכי היציאה האלה. דווחו אינטראקציות מסכנות חיים וקטלניות, והעלון קובע התווית נגד (contraindication) לשילובים האלה באנשים עם פגיעה בתפקוד הכליות או הכבד. הגבהים כאן לקוחים ממחקרי האינטראקציה של מנה בודדת שבעלון, מותאמים באופן סכמטי למתן יומי. <sup class="c" data-ref="FDA-Colcrys,Terkeltaub2011" title="Source 63,257">63,257</sup>`,
  pt:`חלק מהתרופות חוסמות את הדרך שבה הגוף מפנה קולכיצין, כך שאותה טבליה יומית משאירה בגוף יותר תרופה.`,
  hook:`קלריתרומיצין, קטוקונזול, ריטונביר וציקלוספורין העלו את החשיפה למנה בודדת ב־<b>212–296%</b>.`},
 {from:.4,at:.62,k:'ימים 4–10',t:'טיפוס איטי לרמה יציבה חדשה',
  txt:`מכיוון שהפינוי מואט, הרמה ממשיכה לעלות במשך ימים אחרי תחילת המעכב, ולכן הסיכון גדל ככל שהחפיפה ארוכה יותר. במחקר הקלריתרומיצין, חפיפה ארוכה יותר, פגיעה בתפקוד הכליות בנקודת ההתחלה ופנציטופניה ניבאו תמותה. <sup class="c" data-ref="Hung2005" title="Source 103">103</sup>`,
  pt:`התרופה העודפת מצטברת יום אחר יום, כך שקורס אנטיביוטיקה של שבוע יכול להשפיע יותר ממנה בודדת.`,
  hook:`Hung 2005: תמותה של <b>10.2%</b> כשקלריתרומיצין ניתן בו־זמנית, לעומת <b>3.6%</b> כשניתן ברצף.`},
 {from:.85,at:.97,k:'מה העלון מפרסם',t:'תקרות מינון ל־FMF',
  txt:`כשאין חלופה לתרופה בעלת האינטראקציה, העלון האמריקאי מגביל את מינון ה־FMF ל־0.6 mg/day עם מעכבים חזקים של CYP3A4 או מעכבי P-gp, ול־1.2 mg/day עם מעכבים בינוניים של CYP3A4. התקרות חלות גם בתוך 14 יום מנטילת התרופה בעלת האינטראקציה. לחצו על "החלת תקרת המינון של העלון ל־FMF" כדי לראות את ההשפעה. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`,
  pt:`כששתי תרופות חייבות להינטל יחד, העלון מוריד את תקרת הקולכיצין כדי שהרמות יישארו קרובות יותר לרגיל.`,
  hook:`תקרות FMF בעלון: <b>0.6 mg/day</b> (מעכב חזק של CYP3A4 או P-gp) ו־<b>1.2 mg/day</b> (מעכב בינוני של CYP3A4).`}
];
const CD_DRUGS={
 none:{n:'ללא תרופה בעלת אינטראקציה',sh:'לא נוסף דבר',f:1,pct:'אין',cap:null,capTxt:'לא נדרשת',
  txt:`בלי אינטראקציה, הרמות מתייצבות בגל היומי הרגיל בתוך כשבוע. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 clari:{n:'קלריתרומיצין',sh:'קלריתרומיצין',f:3.82,pct:'+282%',cap:.6,capTxt:'0.6 mg/day',
  txt:`מעכב חזק של CYP3A4. במחקר המנה הבודדת שבעלון הוא העלה את ה־AUC של קולכיצין ב־282%. במחקר רטרוספקטיבי מתו 9 מתוך 88 מטופלים (10.2%) שקיבלו את שתי התרופות בו־זמנית, לעומת 1 מתוך 28 (3.6%) שקיבלו אותן בזו אחר זו. אזיתרומיצין העלה את החשיפה הרבה פחות, ומוצע כמקרוליד הבטוח יותר. <sup class="c" data-ref="FDA-Colcrys,Hung2005,Terkeltaub2011,BenChetrit2018Textbook" title="Source 16,63,103,257">16,63,103,257</sup>`},
 keto:{n:'קטוקונזול / איטרקונזול',sh:'קטוקונזול',f:3.12,pct:'+212% (קטוקונזול)',cap:.6,capTxt:'0.6 mg/day',
  txt:`מעכבים חזקים של CYP3A4. קטוקונזול העלה את ה־AUC של קולכיצין ב־212% במחקר העלון; איטרקונזול נמצא באותה קבוצה בעלון, והעקומה משתמשת בנתון של קטוקונזול. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 rito:{n:'ריטונביר',sh:'ריטונביר',f:3.96,pct:'+296%',cap:.6,capTxt:'0.6 mg/day',
  txt:`מעכב חזק של CYP3A4, עם העלייה הגדולה ביותר בטבלת העלון (+296%). רוב מעכבי הפרוטאז של HIV נמצאים באותה קבוצה בעלון. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 cyclo:{n:'ציקלוספורין',sh:'ציקלוספורין',f:3.59,pct:'+259%',cap:.6,capTxt:'0.6 mg/day',
  txt:`מעכב P-gp שהעלה את ה־AUC של קולכיצין ב־259%. ציקלוספורין עלול לגרום לנוירומיופתיה מקולכיצין בתוך שבועות, ועלול להסוות את סימני האזהרה של רעילות במערכת העיכול. <sup class="c" data-ref="FDA-Colcrys,BenChetrit2018Textbook" title="Source 16,63">16,63</sup>`},
 vera:{n:'ורפמיל',sh:'ורפמיל',f:2.03,pct:'+103%',cap:1.2,capTxt:'1.2 mg/day',
  txt:`מעכב בינוני של CYP3A4 ברשימת העלון; ה־AUC של קולכיצין עלה ב־103%. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 dilt:{n:'דילטיאזם',sh:'דילטיאזם',f:1.93,pct:'+93%',cap:1.2,capTxt:'1.2 mg/day',
  txt:`מעכב בינוני של CYP3A4 ברשימת העלון; ה־AUC של קולכיצין עלה ב־93%. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`},
 azi:{n:'אזיתרומיצין',sh:'אזיתרומיצין',f:1.57,pct:'+57%',cap:null,capTxt:'לא מופיעה במקורות שלנו',
  txt:`העלה את ה־AUC של קולכיצין ב־57%, הרבה פחות מקלריתרומיצין, ולכן סקירות מציעות אותו כמקרוליד הבטוח יותר. הוא אינו מופיע ברשימות התקרה בעלון שאנו מצטטים, ולכן לכפתור התקרה אין כאן השפעה. <sup class="c" data-ref="FDA-Colcrys,Terkeltaub2011,BenChetrit2018Textbook" title="Source 16,63,257">16,63,257</sup>`},
 grape:{n:'מיץ אשכוליות',sh:'מיץ אשכוליות',f:1,pct:'ללא שינוי ממוצע במחקר העלון',cap:1.2,capTxt:'1.2 mg/day (העלון: להימנע)',
  txt:`כאן העלון סותר את עצמו. הוא מונה את מיץ האשכוליות בטבלת המעכבים הבינוניים של CYP3A4 ומורה למטופלים להימנע ממנו, אבל מחקר האינטראקציה שלו עצמו (240 mL פעמיים ביום במשך 4 ימים) מצא ש־Cmax ו־AUC הממוצעים השתנו כל אחד בפחות מ־3%, כלומר ללא שינוי משמעותי. שתי הקביעות נמצאות באותו מסמך, ואף אחד מהמקורות אינו מיישב את הסתירה. לכן העקומה אינה זזה; ההשפעה עדיין עשויה להשתנות בין מוצרים ובין אנשים. <sup class="c" data-ref="FDA-Colcrys,Leung2015" title="Source 63,147">63,147</sup>`},
 renal:{n:'ירידה חמורה בתפקוד הכליות',sh:'ירידה חמורה בתפקוד הכליות',f:4.3,renal:true,pct:'פינוי −75% בדיאליזה',cap:.3,capTxt:'התחלה ב־0.3 mg/day',
  txt:`מוצג כאילו התחיל ביום 3 רק לשם השוואה. הגובה הזה אינו ממחקר AUC: הוא נגזר מנתון הפינוי שדווח, ולכן זו העקומה הגסה ביותר כאן. במטופלי FMF בדיאליזה, פינוי הקולכיצין היה נמוך ב־75% (0.17 לעומת 0.73 L/h/kg), והדיאליזה אינה מסלקת את התרופה. כש־CrCl מתחת ל־30 mL/min או בדיאליזה, העלון (FMF) מתחיל ב־0.3 mg/day ומעלה רק בניטור צמוד. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`}
};
const CD_ORG={
 gut:{n:'מערכת העיכול',rep:`התכווצויות, בחילה, שלשול, כאבי בטן והקאות הן התופעות השכיחות ביותר. העלון מדווח עליהן בעד 20% מהמטופלים שמתחילים טיפול ל־FMF, בדרך כלל בתוך 24 שעות, ומציין שתופעות חמורות במערכת העיכול עלולות לבשר על רעילות חמורה יותר. שימוש ממושך מוריד את האנזימים לקטאז, סוכראז ומלטאז במעי ועלול לפגוע בספיגת ויטמין B12. <sup class="c" data-ref="FDA-Colcrys,Ozen2017,BenChetrit2018Textbook" title="Source 16,63,200">16,63,200</sup>`,
  mon:`התסמינים נבדקים בכל ביקור. סקירות מציינות שחלוקת המינון היומי עשויה להפחית את התופעות במערכת העיכול, ושהימנעות מלקטוז או הורדת המינון עשויות לעזור. <sup class="c" data-ref="Ozen2017,BenChetrit2018Textbook" title="Source 16,200">16,200</sup>`},
 muscle:{n:'שרירים',rep:`מיופתיה מקולכיצין גורמת לחולשה בשרירי האגן והכתפיים עם CK מוגבר, בדרך כלל כשתפקוד הכליות ירוד. אפשר לטעות ולחשוב שזו פולימיוזיטיס (polymyositis), והיא חולפת בתוך 3–4 שבועות מהפסקת התרופה. העלון מזהיר מפני רבדומיוליזיס במינונים טיפוליים, במיוחד עם פגיעה בתפקוד הכליות, גיל מבוגר, סטטינים או פיברטים. <sup class="c" data-ref="Kuncl1987,FDA-Colcrys" title="Source 63,140">63,140</sup>`,
  mon:`CPK (CK) כלול במערך הניטור של EULAR 2016; בירידה בתפקוד הכליות ההנחיה ממליצה על מעקב צמוד, בדיקות CK ומינון נמוך יותר. העלון מציין שניטור CK לא בהכרח ימנע מיופתיה חמורה עם סטטינים או פיברטים. <sup class="c" data-ref="Ozen2016,Ozen2017,FDA-Colcrys" title="Source 63,199,200">63,199,200</sup>`},
 nerves:{n:'עצבים',rep:`פולינוירופתיה אקסונלית קלה מופיעה לעיתים קרובות יחד עם המיופתיה (מיונוירופתיה). אחרי הפסקת התרופה היא חולפת לאט יותר מחולשת השרירים. ציקלוספורין עלול לגרום לנוירומיופתיה בתוך שבועות. <sup class="c" data-ref="Kuncl1987,BenChetrit2018Textbook" title="Source 16,140">16,140</sup>`,
  mon:`אין בדיקת עצבים במערך הניטור של ההנחיות (SAA/CRP, ספירת דם, אנזימי כבד, תפקודי כליות, CPK, בדיקת שתן), ולכן תסמינים עצביים מזוהים קלינית, לצד בדיקת ה־CK. <sup class="c" data-ref="Ozen2016" title="Source 199">199</sup>`},
 marrow:{n:'מח עצם',rep:`דווחו דיכוי מח עצם, לויקופניה, גרנולוציטופניה, טרומבוציטופניה, פנציטופניה ואנמיה אפלסטית במינונים טיפוליים, אבל לויקופניה נדירה מאוד במינוני FMF רגילים. במחקר הקלריתרומיצין, פנציטופניה ניבאה תמותה. <sup class="c" data-ref="FDA-Colcrys,BenChetrit2018Textbook,Hung2005" title="Source 16,63,103">16,63,103</sup>`,
  mon:`ספירת דם כלולה במערך הניטור של EULAR 2016. הקונצנזוס הגרמני ממליץ על בירור נוסף ועל מינון נמוך יותר אם הספירות נעשות חריגות. <sup class="c" data-ref="Ozen2016,Ehlers2023" title="Source 59,199">59,199</sup>`},
 liver:{n:'כבד',rep:`הכבד מפרק את הקולכיצין (CYP3A4 יוצר 2- ו־3-דמתילקולכיצין) ומפריש אותו למרה דרך P-gp. במחלת כבד כרונית הפינוי עשוי להיות נמוך בהרבה וזמן מחצית החיים ארוך יותר, עם שונות רבה בין אנשים. <sup class="c" data-ref="FDA-Colcrys,Slobodnick2018" title="Source 63,243">63,243</sup>`,
  mon:`EULAR 2016 ממליצה לבדוק אנזימי כבד באופן סדיר, ולהפחית קולכיצין ולברר את הסיבה אם הם עולים על פי שניים מהגבול העליון של הנורמה. העלון (FMF) ממליץ על ניטור צמוד בפגיעה קלה עד בינונית בתפקוד הכבד ועל שקילת הפחתת מינון במחלה חמורה. <sup class="c" data-ref="Ozen2016,Ozen2017,FDA-Colcrys" title="Source 63,199,200">63,199,200</sup>`},
 kidney:{n:'כליות',rep:`כמה מהתרופה יוצאת דרך הכליות שנוי במחלוקת: העלון האמריקאי מדווח ש־40–65% ממנה שנבלעה נמצאים ללא שינוי בשתן, ואילו סקירה מעריכה את ההפרשה הכלייתית ב־10–20% ורואה בדרך המרה והצואה את הדרך העיקרית. המקורות אינם מסבירים את הפער. שניהם מסכימים שדיאליזה אינה מסלקת קולכיצין. ירידה בתפקוד הכליות היא הרקע השכיח למיופתיה ולאינטראקציות קטלניות. <sup class="c" data-ref="FDA-Colcrys,BenChetrit2018Textbook,Kuncl1987,Hung2005" title="Source 16,63,103,140">16,63,103,140</sup>`,
  mon:`תפקודי כליות כלולים במערך של EULAR 2016; בירידה בתפקוד ההנחיה ממליצה על מעקב צמוד, בדיקות CK ומינון נמוך יותר. בדיקת שתן בכל ביקור מחפשת חלבון בשתן (פרוטאינוריה), הסימן הראשון לעמילואידוזיס (סיבוך של המחלה, לא תופעה של התרופה). <sup class="c" data-ref="Ozen2016,Ozen2017" title="Source 199,200">199,200</sup>`}
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
    if(N)s+=`<text x="${f1((X0+X1)/2)}" y="${Y0+32}" class="t-xs t-mid">ימים של מתן פעם ביום</text><text x="${X0}" y="${Y0+50}" class="t-xs">חשיפה ביחס לממוצע הרגיל</text><text x="${X0}" y="${Y0+63}" class="t-xs">מודל סכמטי, לא נתונים שנמדדו</text>`;
    else s+=`<text x="${X1}" y="${Y0+34}" class="t-xs t-end">ימים של מתן פעם ביום</text><text x="${X0}" y="${Y0+34}" class="t-xs">חשיפה ביחס לממוצע הרגיל · מודל סכמטי, לא נתונים שנמדדו</text>`;
    s+=`<text x="${N?X0:X1-6}" y="${N?22:Y1+14}" class="t-sm ${N?'':'t-end'}" style="fill:var(--bad)">סיכון הרעילות עולה · אין סף חד</text>`;
    s+=`<text x="${X0+6}" y="${f1(yv(1.55)+12)}" class="t-xs" style="fill:var(--good)">\u2067טווח רגיל (סכמטי)\u2069</text>`;
    const x3=xh(72);
    s+=`<line x1="${f1(x3)}" x2="${f1(x3)}" y1="${Y1-14}" y2="${Y0}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 4;opacity:.55"/>`;
    if(N){s+=`<text x="${f1(x3+6)}" y="${Y1-26}" class="t-lbl">\u2067יום 3: ${dk==='none'?'לא נוסף דבר':'+ '+D.sh}\u2069</text>`;
      if(hasCap)s+=`<text x="${f1(x3+6)}" y="${Y1-10}" class="t-xs" style="fill:${col}">\u2067תקרת העלון ${D.cap} mg/day\u2069</text>`}
    else s+=`<text x="${f1(x3+6)}" y="${Y1-6}" class="t-lbl">\u2067יום 3: ${dk==='none'?'לא נוסף דבר':'+ '+D.sh}${hasCap?' · תקרת העלון '+D.cap+' mg/day':''}\u2069</text>`;
    // dose markers
    for(let d=0;d<10;d++){const h=d*24;if(h>hN+.01)break;const fr=h>=72&&hasCap?df:1;s+=`<rect x="${f1(xh(h)-3)}" y="${f1(Y0-2-16*fr)}" width="6" height="${f1(16*fr)}" rx="2" style="fill:var(--crocus);opacity:.75"/>`}
    // curves
    if(iN>1)s+=`<path d="${pth(R,0,iN)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    if(U&&iN>I72)s+=`<path d="${pth(U,I72,iN)}" style="fill:none;stroke:var(--bad);stroke-width:1.6;opacity:.35"/>`;
    if(iN>1)s+=`<path d="${pth(A,0,Math.min(iN,I72))}" style="fill:none;stroke:var(--crocus);stroke-width:2.6;stroke-linejoin:round"/>`;
    if(iN>I72)s+=`<path d="${pth(A,I72,iN)}" style="fill:none;stroke:${col};stroke-width:2.8;stroke-linejoin:round"/>`;
    if(dk!=='none'&&Math.abs(fEff-1)>.05&&hN>72){const yy=yv(fEff);
      s+=`<line x1="${f1(x3)}" x2="${X1}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${col};stroke-width:1.2;stroke-dasharray:2 4"/><text x="${f1(x3+8)}" y="${f1(yy-6)}" class="t-xs" style="fill:${col}">\u2067ממוצע אם יימשך ≈ ${f1(fEff)}×\u2069</text>`}
    if(iN>0){const v=A[iN],cx=xh(hN);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${Y1}" y2="${Y0}" style="stroke:var(--ink);opacity:.22"/><circle cx="${f1(cx)}" cy="${f1(yv(v))}" r="5.5" style="fill:${hN>72?col:'var(--crocus)'};stroke:var(--panel);stroke-width:2"/>`}
    svg.innerHTML=s;
    $('#cdRead').innerHTML=`<span>יום <b>${f1(hN/24)}</b></span><span>חשיפה כעת <b>${f1(A[iN])}×</b> מהממוצע הרגיל</span><span>שינוי ה־AUC בעלון <b>${D.pct}</b></span><span>תקרת FMF בעלון <b>${D.capTxt}</b></span>`;
    const p=phaseOf(CD_STEPS,t);setSt(p);
    $('#cdNote').innerHTML=noteHTML(CD_STEPS[p])+`<div class="kv"><div><dt>${D.n}${hasCap?' · עם תקרה':''}</dt><dd>${D.txt}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#cdPlay'),draw,15000,'הפעלה חוזרת','coldose');
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
    s+=`<text x="${AX1}" y="${N?264:220}" class="t-xs t-end">\u2067mg ליום\u2069</text>`;
    s+=`<text x="${LX}" y="${N?30:58}" class="t-lbl">EULAR 2016</text><text x="${LX}" y="${N?44:73}" class="t-xs">\u2067אותן תקרות ב־2024\u2069</text>`;
    s+=`<text x="${LX}" y="${CY}" class="t-xs" style="fill:var(--muted)">המקורות אינם נותנים גיל</text><text x="${LX}" y="${CY+11}" class="t-xs" style="fill:var(--muted)">\u2067מעבר: 18 הוא הנחה\u2069</text><text x="${LX}" y="${CY+22}" class="t-xs" style="fill:var(--muted)">של האפליקציה</text>`;
    s+=`<rect x="${f1(xm(v.e1))}" y="${EB+4}" width="${f1(Math.max(0,xm(v.mx)-xm(v.e1)))}" height="20" rx="4" style="fill:var(--crocus-soft);stroke:var(--crocus);stroke-opacity:.3"/>`;
    for(let m=v.e1+.25;m<v.mx-.05;m+=.25)s+=`<line x1="${f1(xm(m))}" x2="${f1(xm(m))}" y1="${EB+8}" y2="${EB+20}" style="stroke:var(--crocus);opacity:.4"/>`;
    s+=`<rect x="${f1(xm(v.e0))}" y="${EB}" width="${f1(Math.max(5,xm(v.e1)-xm(v.e0)))}" height="28" rx="5" style="fill:var(--crocus)"/>`;
    s+=`<line x1="${f1(xm(v.mx))}" x2="${f1(xm(v.mx))}" y1="${EB-2}" y2="${EB+34}" style="stroke:var(--bad);stroke-width:3"/>`;
    s+=`<text x="${f1(xm(v.e0))}" y="${EB-10}" class="t-sm" style="fill:var(--crocus)">\u2067התחלה ${T.es} mg/day\u2069</text>`;
    s+=`<text x="${f1(xm(v.mx)+7)}" y="${EB+19}" class="t-sm" style="fill:var(--bad)">\u2067מרבי ${T.mx}\u2069</text>`;
    if(T.child)s+=`<line x1="${f1(xm(2.5))}" x2="${f1(xm(2.5))}" y1="${EB+2}" y2="${EB+32}" style="stroke:var(--muted);stroke-width:1.5;stroke-dasharray:3 3"/><text x="${f1(xm(2.5))}" y="${EB+48}" class="t-xs t-mid">\u2067קונצנזוס ילדים 2007: 2.5\u2069</text>`;
    s+=`<text x="${LX}" y="${N?156:132}" class="t-lbl">\u2067העלון האמריקאי (FMF)\u2069</text><text x="${LX}" y="${N?170:147}" class="t-xs">COLCRYS</text>`;
    if(T.hasL){s+=`<rect x="${f1(xm(v.l0))}" y="${LB}" width="${f1(Math.max(4,xm(v.l1)-xm(v.l0)))}" height="26" rx="5" style="fill:var(--sea);opacity:.85"/><text x="${f1(xm(v.l0))}" y="${LB-8}" class="t-sm" style="fill:var(--sea)">\u2067טווח העלון ${T.ls} mg/day\u2069</text>`}
    else s+=`<text x="${N?LX:AX0}" y="${LB+17}" class="t-sm">\u2067טווחי העלון במקור שלנו מתחילים בגיל 4.\u2069</text>`;
    if(N)s+=`<text x="${LX}" y="290" class="t-lbl">צעדי העלאה</text><text x="${LX}" y="306" class="t-xs">\u2067EULAR 2016: 0.5 mg/day\u2069</text><text x="${LX}" y="318" class="t-xs">\u2067קונצנזוס גרמני: 0.25 או 0.5 mg\u2069</text><text x="${LX}" y="330" class="t-xs">\u2067העלון: 0.3 mg/day\u2069</text>`;
    else s+=`<text x="10" y="178" class="t-lbl">צעדי העלאה</text><text x="${AX0}" y="178" class="t-xs">\u2067EULAR 2016: 0.5 mg/day · קונצנזוס גרמני: 0.25 או 0.5 mg · העלון: 0.3 mg/day\u2069</text>`;
    asv.innerHTML=s;
    $('#cdAgeOut').textContent=a+'';
    $('#cdAgeRead').innerHTML=`<span>גיל <b>${a}</b> (${T.child?'ילד':'מבוגר'})</span><span>התחלה לפי EULAR <b>${T.es} mg/day</b></span><span>מרבי לפי EULAR <b>${T.mx} mg/day</b></span><span>העלון האמריקאי <b>${T.hasL?T.ls+' mg/day':'אין טווח מתחת לגיל 4'}</b></span>`;
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
    $('#cdOrgNote').innerHTML=`<div class="kicker">מפת רעילות</div><h4>${O.n}</h4><dl class="kv"><div><dt>מה מדווח</dt><dd>${O.rep}</dd></div><div><dt>מה מנוטר</dt><dd>${O.mon}</dd></div></dl>`;
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
  function cat(c){if(dOn)return{k:'dialysis',n:'בדיאליזה',col:'var(--bad)'};if(c<30)return{k:'severe',n:'\u2067חמורה (<30)\u2069',col:'var(--bad)'};if(c<50)return{k:'moderate',n:'\u2067בינונית (30–50)\u2069',col:'var(--warn)'};if(c<=80)return{k:'mild',n:'\u2067קלה (50–80)\u2069',col:'var(--gold)'};return{k:'normal',n:'\u2067מעל 80\u2069',col:'var(--good)'}}
  const REN={
   normal:`מעל 80 mL/min, ההמלצות של העלון לפגיעה בתפקוד הכליות אינן חלות. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`,
   mild:`העלון (FMF): מטופלים עם פגיעה קלה (CrCl 50–80) מנוטרים מקרוב, וייתכן שיהיה צורך להפחית את המינון. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`,
   moderate:`העלון (FMF): מטופלים עם פגיעה בינונית (CrCl 30–50) מנוטרים מקרוב, וייתכן שיהיה צורך להפחית את המינון. סקירה אחת מצטטת הפחתת מינון מוצעת של 50% מתחת ל־50 mL/min. <sup class="c" data-ref="FDA-Colcrys,Leung2015" title="Source 63,147">63,147</sup>`,
   severe:`העלון (FMF): כש־CrCl מתחת ל־30 mL/min, מתחילים ב־0.3 mg/day ומעלים רק בניטור צמוד. סקירה אחת מצטטת הפחתה של 50% מתחת ל־50 mL/min; אחרת מדווחת על זמן מחצית חיים ארוך פי 2–3 באי־ספיקת כליות חמורה. <sup class="c" data-ref="FDA-Colcrys,Leung2015,BenChetrit2018Textbook" title="Source 16,63,147">16,63,147</sup>`,
   dialysis:`העלון (FMF): מתחילים ב־0.3 mg/day ומעלים רק בניטור צמוד. דיאליזה אינה מסלקת קולכיצין. במטופלי FMF בדיאליזה, הפינוי היה נמוך ב־75% (0.17 לעומת 0.73 L/h/kg) וזמן מחצית החיים ארוך יותר (18.8 לעומת 4.4 h) מאשר עם כליות תקינות, במערך של אותו מחקר. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>`};
  function drawRen(p,c){const C=cat(c);let s='';
    const NR=vb(rsv,'460 200','400 240');GX0=NR?12:16;GX1=NR?388:444;
    [[0,30,'var(--bad-soft)','חמורה'],[30,50,'var(--warn-soft)',NR?'בינ׳':'בינונית'],[50,80,'var(--gold-soft)','קלה'],[80,120,'var(--good-soft)',NR?'ללא':'ללא התאמה']].forEach(([a,b,f,l])=>{s+=`<rect x="${f1(gx(a))}" y="60" width="${f1(gx(b)-gx(a))}" height="34" style="fill:${f}"/><text x="${f1((gx(a)+gx(b))/2)}" y="81" class="t-xs t-mid">${l}</text>`});
    s+=`<rect x="${GX0}" y="60" width="${GX1-GX0}" height="34" rx="3" style="fill:none;stroke:var(--line)"/>`;
    [0,30,50,80,120].forEach(v=>s+=`<text x="${f1(gx(v))}" y="112" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${GX1}" y="128" class="t-xs t-end">mL/min</text>`;
    const px=gx(p);s+=`<path d="M${f1(px)} 56 l-8 -14 h16z" style="fill:${C.col}"/><line x1="${f1(px)}" x2="${f1(px)}" y1="56" y2="98" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=`<text x="${GX0}" y="28" class="t-big">${dOn?'בדיאליזה':'CrCl '+Math.round(c)+' mL/min'}</text><text x="${GX1}" y="30" class="t-sm t-end" style="fill:${C.col}">${dOn?'\u2067פינוי −75%\u2069':C.n}</text>`;
    if(dOn){const bx=GX0,by=NR?168:150,w=GX1-GX0;s+=`<text x="${bx}" y="${by}" class="t-xs">\u2067פינוי קולכיצין ב־FMF (מחקר העלון, L/h/kg)\u2069</text><rect x="${bx}" y="${by+8}" width="${f1(w*.73/.8)}" height="12" rx="3" style="fill:var(--good)"/><text x="${f1(bx+w*.73/.8-4)}" y="${by+18}" class="t-xs t-end" style="fill:var(--panel)">\u2067כליות תקינות 0.73\u2069</text><rect x="${bx}" y="${by+26}" width="${f1(w*.17/.8)}" height="12" rx="3" style="fill:var(--bad)"/><text x="${f1(bx+w*.17/.8+6)}" y="${by+36}" class="t-xs" style="fill:var(--bad)">\u2067דיאליזה 0.17 (−75%)\u2069</text>`}
    else s+=`<text x="${GX0}" y="${NR?178:160}" class="t-xs">\u2067גררו את המחוון או לחצו על "בדיאליזה".\u2069</text>`;
    rsv.innerHTML=s;
    $('#cdCrOut').textContent=dOn?'דיאליזה':Math.round(c);
    $('#cdRenNote').innerHTML=`<div class="kicker">תפקוד הכליות</div><h4>${C.n}</h4><p>${REN[C.k]}</p><p>לפי EULAR 2016, בירידה בתפקוד הכליות הסיכון לרעילות גבוה, ולכן יש לעקוב מקרוב אחרי סימני רעילות ואחרי CK ולהפחית את המינון; ההנחיה מציינת שאין ערך סף ספציפי של GFR מאחורי ההמלצה הזו. העלון קובע התווית נגד לשילוב קולכיצין עם מעכבי P-gp או עם מעכבים חזקים של CYP3A4 בפגיעה בתפקוד הכליות או הכבד. במחלת כליות עמילואידית, קולכיצין עזר בעיקר כשהקריאטינין ההתחלתי היה מתחת ל־1.5 mg/dL. <sup class="c" data-ref="Ozen2016,Ozen2017,FDA-Colcrys,Livneh1994" title="Source 63,158,199,200">63,158,199,200</sup></p>`;
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
 {from:0,at:.05,k:'שנה 0 ואילך · כבד',t:'הכבד מייצר SAA',
  txt:`עמילואיד A בסרום (SAA) הוא חלבון של השלב החריף (acute-phase) שמיוצר בעיקר בתאי הכבד, בתגובה ל־IL-1, ל־IL-6 ול־TNF-α. ב־FMF רמתו מזנקת בזמן התקפים, ואצל חלק מהחולים היא נשארת גבוהה גם בין התקפים (בקבוצה אחת: חציון של 693 mg/L בהתקפים לעומת 6 mg/L בין התקפים). עמילואיד מסוג AA נוצר כאשר SAA נשאר גבוה לאורך זמן רב. <sup class="c" data-ref="Mirioglu2024,Lachmann2006" title="Source 141,177">141,177</sup>`,
  pt:`הדלקת מאותתת לכבד להזרים לדם חלבון בשם SAA. אם הדלקת אף פעם לא נרגעת לגמרי, SAA נשאר גבוה במשך שנים.`,
  hook:`עמילואיד מסוג AA בנוי מ־<b>SAA</b>, חלבון של השלב החריף שייצורו מונע בידי IL-1, IL-6 ו־TNF.`},
 {from:.13,at:.18,k:'חיתוך',t:'SAA נחתך לחלבון AA',
  txt:`מטאלופרוטאינאזות של המטריקס חותכות את SAA, בן 122 חומצות אמינו, לחלבון AA בן 76 חומצות אמינו. שונות במיקום המדויק של החיתוך מעודדת קיפול שגוי. <sup class="c" data-ref="Mirioglu2024" title="Source 177">177</sup>`,
  pt:`אנזימים גוזרים את חלבון ה־SAA ומשאירים מקטע קצר יותר, שמתקפל בצורה לא נכונה.`,
  hook:`SAA באורך <b>122 aa</b> ← חלבון AA באורך <b>76 aa</b>, בחיתוך של <b>MMPs</b>.`},
 {from:.25,at:.3,k:'קיפול שגוי',t:'AA נערם לסיבי cross-β',
  txt:`מקטעי ה־AA מתקפלים בצורה שגויה ונערמים לסיבים בלתי מסיסים במבנה של יריעות β צולבות (cross-β), שעמידים לפירוק. במיקרוסקופ אלקטרוני הם אינם מסועפים, ורוחבם 8–12 nm. <sup class="c" data-ref="Mirioglu2024" title="Source 177">177</sup>`,
  pt:`המקטעים המקופלים לא נכון נערמים כמו שלבים של סולם לחוטים ארוכים, שהגוף לא מצליח לפרק בקלות.`,
  hook:`עמילואיד = סיבי <b>cross-β</b>, לא מסועפים, <b>8–12 nm</b>.`},
 {from:.36,at:.44,k:'שקיעה',t:'הסיבים שוקעים בפקעית הכליה',
  txt:`הסיבים שוקעים במסננים של הכליה, וגם בטחול, בבלוטות יותרת הכליה, בכבד ובמעי. המשקעים מתחלפים לאט מאוד. הזמן החציוני מתחילת הדלקת ועד אבחון עמילואידוזיס מסוג AA הוא כ־17 שנים, אבל הוא משתנה מאוד. <sup class="c" data-ref="Ozen2016,Mirioglu2024" title="Source 177,199">177,199</sup>`,
  pt:`החוטים מצטברים במסננים הזעירים של הכליה במשך שנים, לפני שמשהו ניכר.`,
  hook:`חציון של כ־<b>17 שנים</b> מתחילת הדלקת ועד האבחון; הכליה היא האיבר שבו המחלה מתגלה.`},
 {from:.5,at:.55,k:'פרוטאינוריה',t:'חלבון דולף לשתן',
  txt:`המשקעים משבשים את המסנן ואת הפודוציטים שאוטמים אותו, וכך חלבון דולף החוצה. מעורבות הכליה מתבטאת בדרך כלל לראשונה כחלבון בשתן (פרוטאינוריה), ולכן EULAR 2016 ממליץ על בדיקת שתן כללית בכל ביקור. ב־FMF נדרשת ביופסיית כליה כדי לאשר עמילואידוזיס בחולה עם פרוטאינוריה. <sup class="c" data-ref="Mirioglu2024,Ozen2016" title="Source 177,199">177,199</sup>`,
  pt:`חלבון מתחיל לדלוף לשתן. בדיקת שתן פשוטה יכולה לגלות זאת עוד לפני שהאדם מרגיש משהו.`,
  hook:`הסימן הראשון: <b>פרוטאינוריה</b>. בדיקת שתן ב<b>כל</b> ביקור (EULAR 2016).`},
 {from:.62,at:.68,k:'תסמונת נפרוטית',t:'איבוד חלבון כבד',
  txt:`בעמילואידוזיס מסוג AA באופן כללי, ליותר מ־90% יש פרוטאינוריה או ירידה בתפקוד הכליות בזמן הפנייה הראשונה, וליותר ממחציתם יש תסמונת נפרוטית. בקבוצה של Zemer, תפקוד הכליות ירד אצל כל 24 החולים שהתחילו עם תסמונת נפרוטית או אורמיה, ואילו אצל 68 מתוך 86 החולים שלא הייתה להם תסמונת נפרוטית הפרוטאינוריה התייצבה. <sup class="c" data-ref="Mirioglu2024,Zemer1986" title="Source 177,286">177,286</sup>`,
  pt:`כל כך הרבה חלבון אובד, שהרגליים מתנפחות ורמת החלבון בדם יורדת. הטיפול יעיל הרבה יותר לפני השלב הזה.`,
  hook:`תסמונת נפרוטית בזמן האבחון מנבאת הידרדרות; לגילוי מוקדם יותר יש חשיבות.`},
 {from:.76,at:.92,k:'אי-ספיקת כליות',t:'הסינון יורד',
  txt:`כמחצית מחולי FMF עם פרוטאינוריה זקוקים בסופו של דבר לדיאליזה, וכ־10% מחולי עמילואידוזיס מסוג AA כבר נמצאים באי-ספיקת כליות בזמן הפנייה הראשונה. בנפרופתיה עמילואידית, קולכיצין עזר בעיקר כשהקריאטינין ההתחלתי היה מתחת ל־1.5 mg/dL, ובמינונים מעל 1.5 mg/day. <sup class="c" data-ref="Ozen2016,Mirioglu2024,Livneh1994" title="Source 158,177,199">158,177,199</sup>`,
  pt:`במשך השנים המסננים הסתומים מפסיקים לעבוד, וזה עלול להוביל לדיאליזה או להשתלה.`,
  hook:`בקבוצה טורקית של 587 חולים, עמילואידוזיס הייתה <b>סיבת המוות המובילה</b> והמנבא המובהק היחיד לתמותה.`}
];
const AM_ORGS=[
 {k:'thyroid',n:'בלוטת התריס',f:'יכולה להיות מעורבת',w:.3},
 {k:'heart',n:'לב',f:'לעיתים רחוקות',w:.1},
 {k:'liver',n:'כבד',f:'שכיח',w:.55},
 {k:'spleen',n:'טחול',f:'כמעט תמיד',w:1},
 {k:'adrenal',n:'יותרת הכליה',f:'\u2067≥1 מכל 3; אי-ספיקה לא שכיחה\u2069',w:.55},
 {k:'kidney',n:'כליות',f:'סימן ראשון רגיל: פרוטאינוריה',w:1},
 {k:'gut',n:'מעי',f:'\u2067כ־30%, בעיקר שלשול\u2069',w:.35},
 {k:'testes',n:'אשכים',f:'עלול לגרום לאזוספרמיה',w:.3}
];
const AM_RISK=[
 {n:'ארץ המגורים',s:'\u2067Touitou 2007 · 2,482 חולים\u2069',or:3.2,lo:1.8,hi:5.9},
 {n:'\u2067הומוזיגוט M694V\u2069',s:'\u2067Kasifoglu 2014 · עמילואידוזיס\u2069',or:6,lo:4.29,hi:8.7,ap:true},
 {n:'\u2067הומוזיגוט M694V\u2069',s:'\u2067Vitale 2025 · פרוטאינוריה\u2069',or:2.27},
 {n:'\u2067גנוטיפ SAA1 α/α\u2069',s:'\u2067Cazeneuve 2000 · קבוצה ארמנית ברובה\u2069',or:6.9,lo:2.5,hi:19},
 {n:'מין זכר',s:'\u2067Cazeneuve 2000 · 2.37 בקבוצה אחרת\u2069',or:4.0,lo:1.5,hi:10.8},
 {n:'לויקוציטוזיס בין התקפים',s:'Vitale 2025',or:7.47},
 {n:'\u2067ESR מוגבר בין התקפים\u2069',s:'Vitale 2025',or:3.6}
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
  function stage(t,m,D,P,G){if(m==='low'&&t>=TC)return'\u2067SAA בשליטה: הגדילה נעצרת, נסיגה איטית\u2069';if(D<=0)return'\u2067שקט: SAA גבוה, עדיין אין משקעים\u2069';if(P<.03)return'משקעים שקטים, השתן עדיין תקין';if(P<.7)return'פרוטאינוריה';if(G>=60)return'תסמונת נפרוטית';if(G>=15)return'\u2067תסמונת נפרוטית, GFR יורד\u2069';return'אי-ספיקת כליות'}
  function draw(t){
    /* narrow: biology scene (liver → fibril → glomerulus) stacked down the page,
       then the SAA trace and the two meters full width underneath it. */
    const N=vb(svg,'720 420','400 1008'),L=N?NARR:WIDE;
    const m=mode,D=Dep(t,m),P=Pro(t,m),G=Gfr(t,m),ctl=m==='low'&&t>=TC,act=ctl?.25:1,year=t*20,iN=Math.round(t*NS),p=phaseOf(AM_STEPS,t);
    let s=`<defs>${marker('amA','var(--muted)')}</defs>`;
    const R0=L.REG[p];s+=`<rect x="${R0[0]}" y="${R0[1]}" width="${R0[2]}" height="${R0[3]}" rx="12" style="fill:var(--gold-soft);opacity:.55"/>`;
    /* liver cell */
    const LC=L.lcx;
    s+=`<text x="${L.ltx}" y="52" class="t-sm">תא כבד</text>`;
    let hx='';for(let k=0;k<6;k++){const a=k*Math.PI/3;hx+=(k?'L':'M')+f1(LC+58*Math.cos(a))+' '+f1(112+50*Math.sin(a))}
    s+=`<path d="${hx}Z" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><circle cx="${LC-14}" cy="106" r="16" style="fill:var(--nuc);opacity:.75"/>`;
    s+=`<text x="${LC}" y="150" class="t-xs t-mid">\u2067מייצר SAA\u2069</text>`;
    [['IL-1',84],['IL-6',112],['TNF-α',140]].forEach(([l,y],k)=>{s+=`<text x="${L.ilx}" y="${y}" class="t-xs" style="fill:var(--terra)">${l}</text>`;for(let j=0;j<2;j++){const ph=(t*60+j*.5+k*.17)%1;s+=`<circle cx="${f1(L.ldx+30*ph)}" cy="${y-3}" r="3.5" style="fill:var(--terra);opacity:${f1(act*(1-ph*.6))}"/>`}});
    for(let j=0;j<5;j++){const ph=(t*30+j*.2)%1;s+=`<circle cx="${f1(LC+18+18*Math.cos(j*1.3+t*20))}" cy="${f1(112+18*Math.sin(j*1.3+t*20))}" r="4" style="fill:var(--gold);opacity:${f1(act*(.4+.6*ph))}"/>`}
    s+=`<rect x="${LC-7}" y="161" width="14" height="36" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1"/>`;
    for(let j=0;j<2;j++){const ph=(t*40+j*.5)%1;s+=`<circle cx="${LC}" cy="${f1(165+28*ph)}" r="3.5" style="fill:var(--gold);opacity:${f1(act)}"/>`}
    /* blood vessel */
    s+=`<rect x="20" y="196" width="${L.vw}" height="22" rx="4" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.2"/><text x="26" y="211" class="t-xs" style="fill:var(--terra)">דם</text>`;
    const nS=ctl?3:14;for(let j=0;j<nS;j++){const ph=(t*25+j/nS)%1;s+=`<circle cx="${f1(L.vdx+L.vdw*ph)}" cy="${f1(207+4*Math.sin(j*2.1+t*40))}" r="3.6" style="fill:var(--gold)"/>`}
    /* molecules */
    const MY=L.MY;
    s+=`<text x="${L.SX}" y="${52+MY}" class="t-sm">SAA → AA → סיב</text>`;
    const c=ramp(t,.13,.22),SX=L.SX,PA=220/122,xc=SX+76*PA;
    s+=`<text x="${SX}" y="${68+MY}" class="t-xs" style="fill:var(--gold)">\u2067SAA · 122 חומצות אמינו\u2069</text>`;
    s+=`<rect x="${SX}" y="${73+MY}" width="${f1(76*PA)}" height="10" rx="3" style="fill:var(--gold);opacity:${f1(1-.5*c)}"/><rect x="${f1(xc+14*c)}" y="${73+MY}" width="${f1(46*PA)}" height="10" rx="3" style="fill:var(--gold);opacity:${f1(1-.6*c)}"/>`;
    if(t>=.13)s+=`<line x1="${f1(xc+7*c)}" x2="${f1(xc+7*c)}" y1="${68+MY}" y2="${88+MY}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:2 2"/><text x="${f1(xc+12)}" y="${98+MY}" class="t-xs">\u2067חיתוך MMP ב־76\u2069</text>`;
    if(c>0)s+=`<text x="${SX}" y="${110+MY}" class="t-xs" style="fill:var(--congo);opacity:${f1(c)}">\u2067חלבון AA · 76 aa\u2069</text><rect x="${SX}" y="${f1(lerp(73,114,c)+MY)}" width="${f1(76*PA)}" height="10" rx="3" style="fill:var(--congo);opacity:${f1(c)}"/>`;
    const fo=ramp(t,.25,.34);
    if(fo>0){const gr=m==='high'||t<TC?ramp(t,.34,1):ramp(TC,.34,1)*(1-.3*ramp(t,TC,1)),FL=40*fo+145*gr;
      s+=`<text x="${SX}" y="${142+MY}" class="t-xs" style="fill:var(--congo);opacity:${f1(fo)}">\u2067קיפול שגוי ← סיב cross-β\u2069</text>`;
      s+=`<line x1="${SX}" x2="${f1(SX+FL)}" y1="${149+MY}" y2="${149+MY}" style="stroke:var(--congo);opacity:.4"/><line x1="${SX}" x2="${f1(SX+FL)}" y1="${175+MY}" y2="${175+MY}" style="stroke:var(--congo);opacity:.4"/>`;
      let zz='';for(let x=SX+2;x<=SX+FL;x+=7)zz+=`M${f1(x)} ${150+MY}l3 4l-3 4l3 4l-3 4l3 4l-3 4`;
      s+=`<path d="${zz}" style="fill:none;stroke:var(--congo);stroke-width:1.8;opacity:${f1(fo)}"/>`;
      const ex=SX+FL+6;s+=`<path d="M${f1(ex)} ${150+MY}v24M${f1(ex-3)} ${150+MY}h6M${f1(ex-3)} ${174+MY}h6" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(ex+5)}" y="${166+MY}" class="t-xs">8–12 nm</text>`;
      if(!ctl&&fo>=1)for(let j=0;j<3;j++){const ph=(t*35+j/3)%1;s+=`<rect x="${f1(SX+FL+60-50*ph)}" y="${f1(124+j*7+MY)}" width="12" height="3" rx="1.5" style="fill:var(--congo);opacity:${f1(.8*(1-ph))}"/>`}}
    /* glomerulus (one group, moved below the molecules in the narrow layout) */
    s+=`<g transform="translate(${L.gdx} ${L.gdy})">`;
    s+=`<text x="490" y="26" class="t-sm">פקעית</text><text x="716" y="46" class="t-xs t-end">לשתן</text>`;
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
    s+=`<line x1="562" y1="206" x2="552" y2="252" style="stroke:var(--muted);stroke-width:1"/><text x="552" y="264" class="t-xs t-mid">לולאת נימים</text>`;
    s+=`<line x1="626" y1="202" x2="650" y2="252" style="stroke:var(--muted);stroke-width:1"/><text x="656" y="264" class="t-xs t-mid">פודוציט</text>`;
    s+=`</g>`;
    /* SAA trace */
    const SX0=L.SX0,SX1=L.SX1,ly=v=>L.SYB-L.SYH*clamp(Math.log10(Math.max(1,v))/3),sxi=i=>SX0+(SX1-SX0)*i/NS;
    s+=`<text x="${SX0}" y="${L.SHY}" class="t-sm" style="fill:var(--gold)">\u2067SAA בדם (mg/L, סולם לוגריתמי)\u2069</text>`;
    [1,10,100,1000].forEach(v=>s+=`<text x="${SX0-6}" y="${f1(ly(v)+3)}" class="t-xs t-end">${v}</text><line x1="${SX0}" x2="${SX1}" y1="${f1(ly(v))}" y2="${f1(ly(v))}" class="grid"/>`);
    s+=`<line x1="${SX0}" x2="${SX1}" y1="${f1(ly(10))}" y2="${f1(ly(10))}" style="stroke:var(--good);stroke-width:1.4;stroke-dasharray:4 3"/><text x="${SX1+4}" y="${f1(ly(10)+3)}" class="t-xs" style="fill:var(--good)">&lt;10</text>`;
    [0,5,10,15,20].forEach(y=>s+=`<text x="${f1(SX0+(SX1-SX0)*y/20)}" y="${L.SXT}" class="t-xs t-mid">${y}</text>`);
    s+=`<text x="${SX0}" y="${L.SAT}" class="t-xs">\u2067שנים מתחילת הדלקת (סכמטי)\u2069</text>`;
    let sd='';for(let i=0;i<=iN;i++)sd+=(i?'L':'M')+f1(sxi(i))+' '+f1(ly(saa(i,m)));if(iN>0)s+=`<path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:1.3"/>`;
    if(m==='low'){const xt=SX0+(SX1-SX0)*TC;s+=`<line x1="${f1(xt)}" x2="${f1(xt)}" y1="${L.SCL}" y2="${L.SCB}" style="stroke:var(--good);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(xt+4)}" y="${L.SCL+9}" class="t-xs" style="fill:var(--good)">השליטה מתחילה</text>`}
    s+=`<line x1="${f1(sxi(iN))}" x2="${f1(sxi(iN))}" y1="${L.SCL}" y2="${L.SCB}" style="stroke:var(--ink);opacity:.45"/>`;
    /* meters */
    const MX0=L.MX0,MW=L.MW,PY=L.PMY,GY=L.GMY;
    s+=`<text x="${MX0}" y="${PY}" class="t-sm">פרוטאינוריה</text>`;
    [[0,.1,'var(--good-soft)'],[.1,.7,'var(--warn-soft)'],[.7,1,'var(--bad-soft)']].forEach(([a,b,f])=>s+=`<rect x="${f1(MX0+MW*a)}" y="${PY+6}" width="${f1(MW*(b-a))}" height="14" style="fill:${f}"/>`);
    s+=`<rect x="${MX0}" y="${PY+9}" width="${f1(MW*clamp(P))}" height="8" rx="3" style="fill:var(--warn)"/><text x="${MX0+2}" y="${PY+32}" class="t-xs">אין</text><text x="${f1(MX0+MW*.12)}" y="${PY+32}" class="t-xs">פרוטאינוריה</text><text x="${f1(MX0+MW*.71)}" y="${PY+32}" class="t-xs">טווח נפרוטי</text>`;
    s+=`<text x="${MX0}" y="${GY}" class="t-sm">\u2067GFR (סינון כלייתי)\u2069</text><rect x="${MX0}" y="${GY+6}" width="${MW}" height="14" style="fill:var(--panel-2)"/><rect x="${MX0}" y="${GY+6}" width="${f1(MW*.15)}" height="14" style="fill:var(--bad-soft)"/>`;
    s+=`<rect x="${MX0}" y="${GY+9}" width="${f1(MW*G/100)}" height="8" rx="3" style="fill:var(--sea)"/><text x="${MX0+2}" y="${GY+32}" class="t-xs">אי-ספיקת כליות</text><text x="${MX0+MW}" y="${GY+32}" class="t-xs t-end">תקין</text>`;
    const stg=stage(t,m,D,P,G);
    s+=`<text x="${MX0}" y="${L.STY}" class="t-lbl" style="fill:${G<15?'var(--bad)':ctl?'var(--good)':'var(--ink)'}">${stg}</text>`;
    svg.innerHTML=s;
    setSt(p);
    $('#amRead').innerHTML=`<span>שנה <b>${f1(year)}</b></span><span>SAA בין התקפים <b>${ctl?'\u2066&lt;10':'\u2066~20–50'} mg/L\u2069</b></span><span>משקעים <b>${Math.round(D*100)}%</b> מהמרב</span><span>GFR <b>${Math.round(G)}%</b> מהתקין</span>`;
    let extra='';
    if(m==='low')extra=`<div class="kv"><div><dt>SAA הורד אל מתחת ל־10 mg/L</dt><dd>${ctl?'משנה 10 האספקה של SAA נקטעת. ':'במצב הזה השליטה מתחילה בשנה 10. '}Lachmann ועמיתיו עקבו אחר 374 אנשים עם עמילואידוזיס מסוג AA מכל סיבה: המשקעים נסוגו אצל 60% מאלה שה־SAA החציוני שלהם נשאר מתחת ל־10 mg/L, והסיכון למוות היה גבוה פי 17.7 בשמינית העליונה של ערכי SAA (≥155 mg/L) לעומת השמינית התחתונה (&lt;4 mg/L). EULAR 2016 קובע SAA &lt;10 mg/L כיעד בעמילואידוזיס. <sup class="c" data-ref="Lachmann2007,Ozen2016" title="Source 142,199">142,199</sup> הפרוטאינוריה בדרך כלל מתייצבת ולא נעלמת: בקבוצה של Zemer היא חלפה אצל 5 והתייצבה אצל 68 מתוך 86 חולים שטופלו בקולכיצין. <sup class="c" data-ref="Zemer1986" title="Source 286">286</sup></dd></div></div>`;
    $('#amNote').innerHTML=noteHTML(AM_STEPS[p])+extra;
    drawOrg(D);
  }
  function drawOrg(D){
    /* narrow: body shifts left, and each organ's frequency drops onto its own
       line under the organ name so the deposit bar still fits beside it. */
    const N=vb(osv,'720 286','400 320');
    const BX=N?-36:0,TX=N?186:250,FX=N?186:336,FY=N?13:0,BAR=N?250:560,BW=N?138:140,LDX=N?180:244,RW=N?34:30;
    let s=`<text x="${TX}" y="${N?14:18}" class="t-sm">\u2067היכן שוקע עמילואיד AA\u2069</text><text x="${N?390:700}" y="${N?30:18}" class="t-xs t-end">\u2067משקע (סכמטי)\u2069</text>`;
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
  const stop=playWire(rg,$('#amPlay'),draw,24000,'הפעלה חוזרת','amyloid');
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
    s+=`<text x="${MCX+DX}" y="352" class="t-xs t-mid">${samp==='kidney'?'ביופסיית כליה · קונגו רד':'שאיבת שומן בטני · קונגו רד'}</text>`;
    /* polarizer schematic */
    s+=`<defs>${marker('amL','var(--gold)')}</defs><line x1="${PX}" y1="${PY}" x2="${PX+314}" y2="${PY}" style="stroke:var(--gold);stroke-width:2;opacity:.6" marker-end="url(#amL)"/><circle cx="${PX+10}" cy="${PY}" r="9" style="fill:var(--gold)"/>`;
    const disc=(cx,rot,lbl)=>{let d=`<circle cx="${cx}" cy="${PY}" r="34" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/><g transform="rotate(${f1(rot)} ${cx} ${PY})">`;for(let yy=-24;yy<=24;yy+=8){const hw=Math.sqrt(34*34-yy*yy)-3;d+=`<line x1="${f1(cx-hw)}" x2="${f1(cx+hw)}" y1="${PY+yy}" y2="${PY+yy}" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/>`}return d+`</g><text x="${cx}" y="${PY+56}" class="t-xs t-mid">${lbl}</text>`};
    s+=disc(PX+76,0,'מקטב');s+=`<rect x="${PX+159}" y="${PY-30}" width="14" height="60" rx="2" style="fill:var(--am-salmon);opacity:.8"/><text x="${PX+166}" y="${PY+56}" class="t-xs t-mid">חתך</text>`;s+=disc(PX+252,ang,'אנליזטור');
    s+=`<text x="${PX}" y="${PY+96}" class="t-big">\u2067הזווית בין המקטבים: ${Math.round(ang)}°\u2069</text>`;
    s+=`<text x="${PX}" y="${PY+120}" class="t-sm">\u2067רקע: ${k<.12?'בהיר':k<.85?'מתעמעם':'כהה (האור נחסם)'}\u2069</text>`;
    s+=`<text x="${PX}" y="${PY+140}" class="t-sm">\u2067עמילואיד: ${k<.12?'ורוד-סלמון':k<.85?'מוריק':'שבירה כפולה ירוקת-תפוח'}\u2069</text>`;
    s+=`<rect x="${PX}" y="${PY+162}" width="26" height="18" rx="3" style="fill:var(--am-salmon)"/><text x="${PX+34}" y="${PY+175}" class="t-xs">\u2067שדה בהיר: משקעים ורודי-סלמון\u2069</text>`;
    s+=`<rect x="${PX}" y="${PY+190}" width="26" height="18" rx="3" style="fill:var(--am-black)"/><rect x="${PX+7}" y="${PY+194}" width="12" height="10" rx="2" style="fill:var(--am-green)"/><text x="${PX+34}" y="${PY+203}" class="t-xs">\u2067מקטבים מוצלבים: ירוק תפוח על שחור\u2069</text>`;
    ms.innerHTML=s;
    $('#amMicNote').innerHTML=`<div class="kicker">${k<.12?'שדה בהיר':k<.85?'המקטבים מוצלבים בהדרגה':'מקטבים מוצלבים'}</div><h4>${k<.85?'קונגו רד צובע עמילואיד בוורוד-סלמון':'שבירה כפולה בירוק תפוח'}</h4><p>עמילואיד מזוהה בצביעת קונגו רד (Congo red), שנותנת שבירה כפולה (birefringence) בצבע ירוק תפוח באור מקוטב. סיבים מסודרים מטים את האור המקוטב; רקמה רגילה לא, ולכן היא מחשיכה כשהמקטבים מוצלבים. אימונוהיסטוכימיה עם נוגדן נגד SAA מאשרת שהעמילואיד הוא מסוג AA, ומיקרוסקופ אלקטרוני מראה סיבים לא מסועפים ברוחב 8–12 nm. <sup class="c" data-ref="Mirioglu2024" title="Source 177">177</sup></p><dl class="kv">${samp==='kidney'?`<div><dt>ביופסיית כליה</dt><dd>הבדיקה המכרעת המקובלת, והיא נדרשת כדי לאשר עמילואידוזיס בחולה FMF עם פרוטאינוריה. גם ביופסיה רקטלית משמשת ב־FMF כבר זמן רב. <sup class="c" data-ref="Mirioglu2024,Ozen2016,Melikoglu2000" title="Source 171,177,199">171,177,199</sup></dd></div>`:`<div><dt>שאיבת שומן בטני</dt><dd>אפשרות פולשנית פחות: לשאיבת שומן ולביופסיה של בלוטת רוק דווחו רגישויות של 77–89%. במחקר אחד (120 חולים, 38 מהם עם AA) הרגישות הייתה 80% בקריאה שגרתית ו־93% כששלושה משטחים נבדקו ביסודיות, עם סגוליות של 100% בקבוצת הביקורת. מיפוי SAP (SAP scintigraphy) רגיש עד 90%, אבל אינו זמין באופן נרחב. הנתונים האלה מגיעים מסדרות מעורבות של עמילואידוזיס; סקירה אחת שעוסקת ב־FMF בלבד מתארת את התפוקה של שאיבת השומן ב־FMF כלא גבוהה, ומייחסת לביופסיית כליה כ־88% ולביופסיה רקטלית כ־75%. <sup class="c" data-ref="Mirioglu2024,vanGameren2006,Sari2014" title="Source 177,231,268">177,231,268</sup></dd></div>`}</dl><div class="hook"><b>לבחינה</b>קונגו רד ← <b>ורוד-סלמון</b> בשדה בהיר ← <b>שבירה כפולה ירוקת-תפוח</b> במקטבים מוצלבים.</div>`;
  }
  const stopM=playWire(mr,$('#amMPlay'),drawM,6000,'הפעלה חוזרת','amyloid');
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
    let s=`<text x="${TXX}" y="18" class="t-sm">\u2067גורמי סיכון לעמילואידוזיס ב־FMF\u2069</text>`;
    s+=N?`<text x="${TXX}" y="32" class="t-xs" style="fill:var(--muted)">מחקרים נפרדים · לא ניתנים להשוואה זה לזה</text>`
        :`<text x="${LX1}" y="18" class="t-xs t-end" style="fill:var(--muted)">מחקרים נפרדים · לא ניתנים להשוואה זה לזה</text>`;
    if(!N)[1,2,5,10,20].forEach(v=>s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="30" y2="310" class="${v===1?'axis':'grid'}"/>`);
    [1,2,5,10,20].forEach(v=>s+=`<text x="${f1(lx(v))}" y="${N?506:326}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${LX1}" y="${N?522:342}" class="t-xs t-end">\u2067יחס סיכויים, סולם לוגריתמי (1 = אין הבדל)\u2069</text>`;
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
  const PTS=[[1967,26.6,'&#x2067;26.6% · Sohar 1967, ישראל&#x2069;',140,62,'',112,80,''],[2005,12.9,'&#x2067;12.9% · טורקיה 2005&#x2069;',462,166,'t-end',250,196,'t-end'],[2007,11.4,'11.4% · MetaFMF 2007',480,200,'t-end',262,234,'t-end'],[2014,8.6,'&#x2067;8.6% · טורקיה 2014&#x2069;',548,224,'t-mid',307,286,'t-mid'],[2025,10.2,'10.2% · AIDA 2025',644,178,'t-mid',384,196,'t-end']];
  let PX0=70,PX1=690,PY0=270,PH=230;
  const px=y=>PX0+(PX1-PX0)*(y-1960)/70,py=v=>PY0-PH*v/30;
  function drawP(t){
    /* narrow: full-width plot with fewer year ticks, the caption wrapped onto
       three lines, and the Zemer panel moved below the chart. */
    const N=vb(ps,'720 320','400 528');
    PX0=N?46:70;PX1=N?384:690;PY0=N?330:270;PH=N?270:230;
    const ZX=N?16:410,ZY=N?404:34,ZW=N?368:290,ZTX=ZX+10;
    const Y=1960+70*t;let s=`<text x="${PX0}" y="${N?22:24}" class="t-sm">\u2067עמילואידוזיס בקבוצות FMF (% מהחולים)\u2069</text>`;
    s+=N?`<text x="${PX0}" y="368" class="t-xs" style="fill:var(--muted)">קבוצות, ארצות, גילים והגדרות</text><text x="${PX0}" y="380" class="t-xs" style="fill:var(--muted)">שונים: לא אוכלוסייה אחת</text><text x="${PX0}" y="392" class="t-xs" style="fill:var(--muted)">\u2067שנעקבה לאורך זמן.\u2069</text>`
        :`<text x="70" y="308" class="t-xs" style="fill:var(--muted)">\u2067קבוצות, ארצות, גילים והגדרות שונים: לא אוכלוסייה אחת שנעקבה לאורך זמן.\u2069</text>`;
    [0,10,20,30].forEach(v=>s+=`<line x1="${PX0}" x2="${PX1}" y1="${f1(py(v))}" y2="${f1(py(v))}" class="grid"/><text x="${PX0-8}" y="${f1(py(v)+3)}" class="t-xs t-end">${v}%</text>`);
    for(let y=1960;y<=2030;y+=(N?20:10))s+=`<text x="${f1(px(y))}" y="${PY0+18}" class="t-xs t-mid">${y}</text>`;
    s+=`<line x1="${f1(px(1972))}" x2="${f1(px(1972))}" y1="${N?60:40}" y2="${PY0}" style="stroke:var(--crocus);stroke-width:1.5;stroke-dasharray:4 4;opacity:${f1(ramp(Y,1972,1974))}"/><text x="${f1(px(1972)+4)}" y="${PY0-8}" class="t-xs" style="fill:var(--crocus);opacity:${f1(ramp(Y,1972,1974))}">\u2067קולכיצין (1972)\u2069</text>`;
    let d='';PTS.forEach((P,i)=>{if(i===0){d='M'+f1(px(P[0]))+' '+f1(py(P[1]));return}const Q=PTS[i-1];if(Y<=Q[0])return;const u=clamp((Y-Q[0])/(P[0]-Q[0]));d+='L'+f1(lerp(px(Q[0]),px(P[0]),u))+' '+f1(lerp(py(Q[1]),py(P[1]),u))});
    if(Y>1967)s+=`<path d="${d}" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-dasharray:6 4"/>`;
    PTS.forEach(([yr,v,l,lxx,lyy,an,nx,ny,nan])=>{const g=ramp(Y,yr,yr+3);if(g<=0)return;s+=`<circle cx="${f1(px(yr))}" cy="${f1(py(v))}" r="${f1(6*g)}" style="fill:var(--terra);stroke:var(--panel);stroke-width:2"/><text x="${N?nx:lxx}" y="${N?ny:lyy}" class="t-sm ${N?nan:an}" style="opacity:${f1(g)}">${l}</text>`});
    const gc=ramp(Y,2022,2025);if(gc>0)s+=`<rect x="${f1(px(2022)-6*gc)}" y="${f1(py(.3)-6*gc)}" width="${f1(12*gc)}" height="${f1(12*gc)}" style="fill:var(--sea);stroke:var(--panel);stroke-width:2"/><text x="${f1(px(2022)-10)}" y="${f1(py(.3)-(N?24:8))}" class="t-sm t-end" style="fill:var(--sea);opacity:${f1(gc)}">&#x2067;0.3% · ילדים, 2022&#x2069;</text>`;
    const gz=ramp(Y,1986,1992);
    if(gz>0){s+=`<g style="opacity:${f1(ramp(Y,1986,1988))}"><rect x="${ZX}" y="${ZY}" width="${ZW}" height="${N?110:114}" rx="8" style="fill:var(--panel-2)"/><text x="${ZTX}" y="${ZY+18}" class="t-xs">\u2067Zemer 1986 · פרוטאינוריה מצטברת\u2069</text>`;
      s+=`<text x="${ZTX}" y="${ZY+40}" class="t-xs">\u2067קולכיצין באופן קבוע (11 שנים)\u2069</text><rect x="${ZTX}" y="${ZY+46}" width="${f1(1.7*5.2*gz)}" height="12" rx="3" style="fill:var(--crocus)"/><text x="${f1(ZTX+6+1.7*5.2*gz)}" y="${ZY+56}" class="t-xs" style="fill:var(--crocus)">1.7%</text>`;
      s+=`<text x="${ZTX}" y="${ZY+78}" class="t-xs">\u2067לא נוטלים באופן קבוע (9 שנים)\u2069</text><rect x="${ZTX}" y="${ZY+84}" width="${f1(48.9*5.2*gz)}" height="12" rx="3" style="fill:var(--bad)"/>${gz>.5?`<text x="${f1(ZTX-4+48.9*5.2*gz)}" y="${ZY+94}" class="t-xs t-end" style="fill:var(--panel);font-weight:700">48.9%</text>`:''}</g>`}
    s+=`<line x1="${f1(px(Y))}" x2="${f1(px(Y))}" y1="${N?56:34}" y2="${PY0+2}" style="stroke:var(--ink);opacity:.3"/>`;
    ps.innerHTML=s}
  playWire(pr,$('#amPPlay'),drawP,12000,'הפעלה חוזרת','amyloid');drawP(+pr.value);
  /* only the last playWire with this id registers for the narrow/wide redraw,
     so chain the other three drawings onto it. */
  const prevRedraw=redraws.amyloid;
  redraws.amyloid=()=>{prevRedraw&&prevRedraw();stop();stopM();draw(+rg.value);drawM(+mr.value);drawR(rp)};
  $('#amPCap').innerHTML=`קבוצות, ארצות, גילים והגדרות שונים: הקו המקווקו מחבר בין מחקרים נפרדים, ואינו עוקב אחר אוכלוסייה אחת. Sohar 1967 (470 חולים), קבוצת המחקר הטורקית ל־FMF 2005 (2,838), MetaFMF 2007 (2,482), מחקר טורקי ב־15 מרכזים 2014 (2,246), מרשם AIDA 2025; ילדים: 11 מתוך 3,454 בקבוצת הילדים הגדולה ביותר. לפני עידן הקולכיצין, סקירה אחת מעריכה את שיעור העמילואידוזיס ב־60–75% מהחולים מעל גיל 40, ו־EULAR 2016 מדווח שהקולכיצין הוריד את הסיכון בטורקיה מ־60% לפחות מ־13%. <sup class="c" data-ref="Sohar1967,GulBenChetrit2025,TurkishFMF2005,Touitou2007,Kasifoglu2014,Vitale2025,Ozturk2022,Zemer1986,Sari2014,Ozen2016" title="Source 89,121,199,205,231,244,262,264,273,286">89,121,199,205,231,244,262,264,273,286</sup>`;
};
/* =============== 3.2 diagnosis & criteria =============== */
const DX_GT={
 conf:`<b>גנוטיפ מאשר:</b> וריאנטים פתוגניים או ככל הנראה פתוגניים ב־<i>MEFV</i> בשני העותקים של הגן: אותו וריאנט פעמיים (הומוזיגוט), או שני וריאנטים שונים, אחד בכל עותק (in trans, הטרוזיגוט מורכב). הכלל: לפחות <b>1</b> מתוך 4 הפריטים הקליניים. <sup class="c" data-ref="Gattorno2019,Lancieri2023" title="Source 75,145">75,145</sup>`,
 non:`<b>גנוטיפ לא מאשר:</b> וריאנט פתוגני אחד ועוד וריאנט בעל משמעות לא ודאית (VUS) בעותק השני (in trans), שני VUS, או וריאנט פתוגני יחיד במצב הטרוזיגוטי. הכלל: לפחות <b>2</b> מתוך 4 הפריטים הקליניים. <sup class="c" data-ref="Gattorno2019,Lancieri2023" title="Source 75,145">75,145</sup>`,
 none:`<b>אין או לא נבדק:</b> רק הזרוע הקלינית בלבד חלה (לפחות 6 מתוך 9). וריאנטים שפירים וככל הנראה שפירים לעולם אינם נספרים, וסיווג הווריאנטים אמור להתבסס על INSAID/Infevers. <sup class="c" data-ref="Gattorno2019,VanGijn2018" title="Source 75,269">75,269</sup>`
};
const DX_EX={
 typ:{pre:[1,1],gt:'conf',ci:['ep','abd','chest','eth'],ab:[]},
 het:{pre:[1,1],gt:'non',ci:['ep','abd'],ab:['aph']},
 pfapa:{pre:[1,1],gt:'none',ci:[],ab:['aph','ln']},
 clr:{pre:[0,0],gt:'none',ci:[],ab:[]}
};
function dxBars(rows){
  return rows.map(r=>`<div class="dx-pr"><span class="lbl">${r.l}</span><div class="dx-bars">
    ${r.s!=null?`<span>רגישות</span><i><b style="width:${(r.s*100).toFixed(1)}%;background:var(--terra)"></b></i><span>${r.st||Math.round(r.s*1000)/10+'%'}</span>`:''}
    ${r.p!=null?`<span>סגוליות</span><i><b style="width:${(r.p*100).toFixed(1)}%;background:var(--sea)"></b></i><span>${r.pt||Math.round(r.p*1000)/10+'%'}</span>`:''}</div></div>`).join('');
}
const DX_CRIT={
 th:{name:'תל השומר',
  groups:[{k:'M',lg:'קריטריונים עיקריים',cls:'',items:['התקפי חום חוזרים עם דלקת הצפק, סינוביטיס (דלקת בפרק) או דלקת קרום הריאה','עמילואידוזיס מסוג AA בלי מחלה אחרת שמסבירה אותה','תגובה טובה לטיפול רציף בקולכיצין']},
          {k:'m',lg:'קריטריונים משניים',cls:'mn',items:['התקפי חום חוזרים','אודם דמוי שושנה','FMF אצל קרוב משפחה מדרגה ראשונה']}],
  def:`מבוססים על סקר תל השומר מ־1967 ועל סיכומים מאוחרים יותר. אבחנה ודאית של FMF מחייבת <b>2 עיקריים</b>, או <b>1 עיקרי + 2 משניים</b>. <sup class="c" data-ref="Sohar1967,Pras1998,Lancieri2023" title="Source 145,215,244">145,215,244</sup>`,
  judge(c){const M=c.M,m=c.m;if(M>=2||(M>=1&&m>=2))return['yes','FMF ודאית לפי תל השומר',`עיקריים: ${M}, משניים: ${m}.`];
    if(M>=1&&m>=1)return['na','לכל היותר FMF "סבירה"',`עיקריים: ${M}, משניים: ${m}. דרגת "סבירה" עבור 1 עיקרי + 1 משני מופיעה רק במקורות משניים, ולא אומתה בטקסט המקורי.`];
    return['no','קריטריוני תל השומר אינם מתקיימים',`עיקריים: ${M}, משניים: ${m}.`]},
  perf:[{l:'ילדים בטורקיה (Yalçınkaya 2009)',s:.988,p:.546},{l:'ילדים במרשם Eurofever עם קדחות מחזוריות אחרות (Demirkaya 2016)',s:.45,p:.972}],
  pcite:`<sup class="c" data-ref="Yalcinkaya2009,Demirkaya2016" title="Source 49,276">49,276</sup> הנתונים של Eurofever הם אלה שבמאמר שפורסם; דיווח מוקדם יותר מכנס מדעי, על אותו מרשם, נתן לתל השומר רגישות נמוכה יותר.`},
 liv:{name:'ליבנה 1997',
  groups:[{k:'M',lg:'קריטריונים עיקריים (התקפים טיפוסיים)',cls:'',items:['דלקת צפק מפושטת','דלקת חד־צדדית של קרום הריאה או של קרום הלב','דלקת בפרק אחד (ירך, ברך או קרסול)','חום בלבד']},
          {k:'m',lg:'קריטריונים משניים',cls:'mn',items:['התקף לא שלם בחזה','התקף לא שלם בפרק','כאב ברגליים במאמץ','תגובה טובה לקולכיצין']},
          {k:'s',lg:'קריטריונים תומכים',cls:'sp',items:['סיפור משפחתי של FMF','מוצא אתני מתאים','גיל הופעה מתחת ל־20','התקפים קשים שמחייבים מנוחה במיטה','הפוגה עצמונית','פרקי זמן ללא תסמינים','תגובה דלקתית חולפת (WBC,‏ ESR,‏ SAA או פיברינוגן)','חלבון או דם בשתן בזמן התקפים (פרוטאינוריה או המטוריה אפיזודית)','ניתוח בטן ללא ממצא (לפרוטומיה), או הוצאת תוספתן "לבן" שלא היה מודלק','קרבת דם בין ההורים']}],
  def:`<b>התקף טיפוסי</b> הוא חוזר (לפחות 3 מאותו סוג), מלווה בחום (חום רקטלי של 38‎ °C ומעלה) וקצר (12 h‏ עד 3 ימים). <b>התקף לא שלם</b> שונה מזה בדבר אחד או בשניים: חום מתחת ל־38‎ °C, משך מחוץ לטווח של 12 h‏ עד 3 ימים אבל לא פחות מ־6 h‏ ולא יותר משבוע, היעדר סימנים צפקיים, כאב בטן ממוקד, או דלקת בפרקים אחרים. <sup class="c" data-ref="Livneh1997,Lancieri2023,Sonmez2016" title="Source 145,159,245">145,159,245</sup>`,
  judge(c,o){const M=c.M,m=c.m,s=c.s;let ok=M>=1||m>=2,how=M>=1?'לפחות 1 עיקרי':m>=2?'לפחות 2 משניים':'';
    if(!ok&&o.rule==='cons'&&m>=1&&s>=5){ok=true;how='1 משני + לפחות 5 תומכים'}
    const set=o.rule==='cons'?'הכלל השמרני':'הכלל הפשוט';
    return ok?['yes','FMF לפי קריטריוני ליבנה',`${set}: ${how}. נספרו עיקריים: ${M}, משניים: ${m}, תומכים: ${s}.`]:['no','קריטריוני ליבנה אינם מתקיימים',`${set}: נדרשים לפחות 1 עיקרי או לפחות 2 משניים${o.rule==='cons'?', או 1 משני + לפחות 5 תומכים':''}. נספרו עיקריים: ${M}, משניים: ${m}, תומכים: ${s}.`]},
  perf:[{l:'המחקר המקורי: 105 מטופלים מול 106 בקבוצת הביקורת (Livneh 1997)',s:.95,st:'>95%',p:.97,pt:'>97%'},{l:'ילדים במרשם Eurofever עם קדחות מחזוריות אחרות (Demirkaya 2016), סגוליות בלבד',p:.411}],
  pcite:`<sup class="c" data-ref="Livneh1997,Demirkaya2016" title="Source 49,159">49,159</sup>`},
 yo:{name:'Yalçınkaya–Özen',
  groups:[{k:'M',lg:'קריטריונים לילדים (ארבעת הראשונים: כל התקף 6 עד 72 h, לפחות 3 התקפים)',cls:'',items:['חום: חום בבית השחי מעל 38‎ °C','כאב בטן','כאב בחזה','דלקת בפרקים בודדים (אוליגוארתריטיס)','סיפור משפחתי של FMF']}],
  def:`נבנו לילדים ב־2009, על סמך 170 ילדים עם שני וריאנטים ו־141 ילדים בקבוצת הביקורת. <b>שניים או יותר</b> מחמשת הקריטריונים מסווגים כ־FMF. המאמר מ־2009 מתאר חמישה פריטים; כמה סקירות מאוחרות יותר מביאות גרסה של שישה פריטים, שמוסיפה כאב ברגליים במאמץ. <sup class="c" data-ref="Yalcinkaya2009,Lancieri2023" title="Source 145,276">145,276</sup>`,
  judge(c){const n=c.M;return n>=2?['yes','FMF לפי הקריטריונים לילדים',`${n} מתוך 5 קריטריונים (נדרשים 2). עם 3 או יותר, הסגוליות עולה והרגישות יורדת (Kondi 2010).`]:['no','הקריטריונים לילדים אינם מתקיימים',`${n} מתוך 5 קריטריונים (נדרשים 2).`]},
  perf:[{l:'קבוצת הפיתוח, לפחות 2 קריטריונים (Yalçınkaya 2009)',s:.865,p:.936},{l:'קבוצה מעורבת בצרפת, לפחות 2 קריטריונים (Kondi 2010)',s:1,p:.5},{l:'קבוצה מעורבת בצרפת, לפחות 3 קריטריונים (Kondi 2010)',s:.77,p:.95},{l:'מרשם Eurofever ‏(Demirkaya 2016)',s:.874,p:.407}],
  pcite:`<sup class="c" data-ref="Yalcinkaya2009,Kondi2010,Demirkaya2016" title="Source 49,134,276">49,134,276</sup>`}
};
const DX_LAB=[
 {from:0,at:.04,k:'ימים ‎−3 עד 0',t:'בין התקפים',
  txt:`במדידות כל שבועיים במשך 5 חודשים, החציון של SAA בין התקפים היה 6 mg/L, והחציון של CRP היה 4 mg/L. רבים נראים בריאים, ותוצאות הבדיקות שלהם קרובות לתקין. <sup class="c" data-ref="Lachmann2006" title="Source 141">141</sup>`,
  pt:'בין התקפים, אצל אנשים רבים בדיקות הדם קרובות לתקין.'},
 {from:.095,at:.112,k:'יום 0',t:'ההתקף מתחיל',
  txt:`IL-1β מתאים לבנים משופעלים מניע את הכבד לייצר CRP ו־SAA. ספירת הלבנים עולה (בעיקר נויטרופילים), ושקיעת הדם (ESR), הפיברינוגן ומערכת המשלים עולים. <sup class="c" data-ref="Livneh1997,SoonLaxer2017,ARUP2023" title="Source 6,159,247">6,159,247</sup>`,
  pt:'כשהתקף מתחיל, אותות האזעקה של הגוף נדלקים, וסמני הדלקת מטפסים בתוך שעות.'},
 {from:.135,at:.15,k:'ימים 1 עד 2',t:'שיא תגובת השלב החריף',
  txt:`בזמן התקפים, החציונים היו SAA ‏693 mg/L ו־CRP ‏115 mg/L. במחקר של Korkmaz מ־2002, CRP היה חלבון השלב החריף היחיד שעלה בכל התקף, ואילו הטסיות, הפריטין והאלבומין לא השתנו. <sup class="c" data-ref="Lachmann2006,Korkmaz2002" title="Source 136,141">136,141</sup>`,
  pt:'באמצע התקף, SAA ו־CRP יכולים להיות גבוהים פי מאה מהרגיל.',
  hook:`<b>פריטין וטסיות</b> שאינם משתנים בזמן התקף עם חום מתאימים ל־FMF. פריטין גבוה מאוד מכוון למחלת סטיל (Still) או לזיהום. <sup class="c" data-ref="Korkmaz2002,Yamaguchi1992" title="Source 136,277">136,277</sup>`},
 {from:.2,at:.27,k:'ימים 3 עד 10',t:'ההתקף שוכך',
  txt:`ההתקף חולף מעצמו והסמנים יורדים חזרה. הקריטריונים התומכים של ליבנה מכנים זאת תגובה דלקתית "חולפת". מהירות הירידה המדויקת משתנה; העקומות כאן סכמטיות. <sup class="c" data-ref="Livneh1997" title="Source 159">159</sup>`,
  pt:'כשההתקף דועך, הסמנים יורדים חזרה מעצמם.'},
 {from:.42,at:.75,k:'שבועות 2 עד 4',t:'בדיקה חוזרת כשמרגישים טוב',
  txt:`אצל כשליש מהמטופלים נמצא SAA מוגבר בין התקפים (Berkun 2007), ואצל כשני שלישים הייתה תגובת שלב חריף מתמשכת כלשהי (Korkmaz 2002).‏ SAA מוגבר באופן מתמשך היה קשור להומוזיגוטיות ל־M694V, לחלבון בשתן ולדילוג על מנות קולכיצין. SAA או CRP גבוהים באופן מתמשך מרמזים על טיפול חסר ומעלים את הסיכון לעמילואידוזיס. <sup class="c" data-ref="Berkun2007,Korkmaz2002,Ozen2016" title="Source 21,136,199">21,136,199</sup>`,
  pt:'גם בדיקת דם ביום טוב חשובה. דלקת נסתרת ומתמשכת היא מה שפוגע בכליות לאט.',
  hook:`EULAR 2016 ממליצה לבדוק סמני שלב חריף גם <b>בין</b> התקפים, ולא רק בזמנם, כי עלייה מתמשכת, ולא ההתקפים עצמם, היא מה שמזין עמילואידוזיס מסוג AA. <sup class="c" data-ref="Ozen2016,Berkun2007" title="Source 21,199">21,199</sup>`}
];
const DX_PL=[.02,.18,.34,.5,.66,.82];
const DX_PATH=[
 {from:DX_PL[0],at:.1,k:'שלב 1',t:'חום חוזר שחולף מעצמו + סרוזיטיס',
  txt:`התקף טיפוסי הוא חוזר (לפחות 3 מאותו סוג), מלווה בחום (38‎ °C ומעלה) וקצר (12 h‏ עד 3 ימים), עם דלקת הצפק, דלקת קרום הריאה או דלקת פרקים, והאדם מרגיש טוב בין התקפים. <sup class="c" data-ref="Lancieri2023,Livneh1997" title="Source 145,159">145,159</sup>`,
  pt:'הסיפור קודם לכול: התקפים קצרים וחוזרים של חום וכאב, שחולפים מעצמם.'},
 {from:DX_PL[1],at:.26,k:'שלב 2',t:'שלילת מצבים מחקים',
  txt:`קודם כול שוללים זיהום, קדחות מחזוריות אחרות ובטן כירורגית אמיתית. דלקת הצפק ב־FMF יכולה לחקות בטן חריפה, עם רגישות בהרפיה (rebound), קשיחות של דופן הבטן ומפלסי אוויר־נוזל. מתוך 182 מטופלי FMF, ‏40% עברו כריתת תוספתן (12 עד 25% באוכלוסייה הכללית), ו־80% מהתוספתנים שהוצאו לא היו מודלקים (כ־20% בדרך כלל). הומוזיגוטיות ל־M694V ומחלה קשה היו גורמי סיכון. <sup class="c" data-ref="Lancieri2023,Lidar2008" title="Source 145,150">145,150</sup>`,
  pt:'התקף בטן של FMF יכול להיראות בדיוק כמו דלקת תוספתן, ואנשים רבים עם FMF עברו ניתוח שלא היו צריכים.',
  hook:`ב־FMF, מעבר מכאב <b>מפושט</b> לכאב <b>ברביע הימני התחתון</b> היה המנבא הטוב ביותר לתוספתן מודלק באמת. <sup class="c" data-ref="Lidar2008" title="Source 150">150</sup>`},
 {from:DX_PL[2],at:.42,k:'שלב 3',t:'סמני שלב חריף, פעמיים',
  txt:`CRP,‏ SAA,‏ ESR וספירת הלבנים נבדקים בזמן התקף, ושוב כשמרגישים טוב. ערכים גבוהים בהתקף ותקינים או כמעט תקינים אחריו תומכים ב־FMF. סמנים מוגברים בהתלקחויות הם תנאי סף בקריטריוני Eurofever/PRINTO. <sup class="c" data-ref="Korkmaz2002,Gattorno2019,Livneh1997" title="Source 75,136,159">75,136,159</sup>`,
  pt:'בדיקת דם אחת בזמן התקף, ואחת ביום טוב. ההבדל ביניהן הוא הרמז.'},
 {from:DX_PL[3],at:.58,k:'שלב 4',t:'בדיקה גנטית של MEFV',
  txt:`שני וריאנטים פתוגניים: מתאים ל־FMF. וריאנט אחד: לפחות נשא, ותסמינים עדיין אפשריים. אף וריאנט: FMF פחות סבירה, אבל לא נשללת; לכ־10 עד 20% מחולי FMF אין וריאנט ב־<i>MEFV</i>.‏ VUS אינו חד־משמעי. הסריקה הסטנדרטית מכסה את אקסונים 2, 3, 5 ו־10. <sup class="c" data-ref="ARUP2023,BenZvi2015,Shinar2012" title="Source 6,19,240">6,19,240</sup>`,
  pt:'הבדיקה הגנטית יכולה לתמוך באבחנה, אבל לא לשלול אותה.',
  hook:`FMF נשארת <b>אבחנה קלינית</b> (המלצות SHARE). הגנטיקה תומכת בה, אבל אינה יכולה לשלול אותה. <sup class="c" data-ref="Giancane2015" title="Source 82">82</sup>`},
 {from:DX_PL[4],at:.74,k:'שלב 5',t:'ניסיון טיפולי בקולכיצין',
  txt:`GeneReviews מתאר ניסיון טיפולי בקולכיצין למשך שישה חודשים כדי לבסס את האבחנה, כשהבדיקה המולקולרית אינה חד־משמעית. Booty ועמיתיו (2009) הסיקו שווריאנט אחד יחד עם תסמינים טיפוסיים מצדיק ניסיון כזה. תגובה לטיפול היא קריטריון עיקרי בתל השומר וקריטריון משני בליבנה. <sup class="c" data-ref="GeneReviews,Booty2009,Pras1998,Livneh1997" title="Source 26,76,159,215">26,76,159,215</sup>`,
  pt:'אם קולכיצין יומי עוצר את ההתקפים במשך חודשים, זה תומך מאוד ב־FMF.'},
 {from:DX_PL[5],at:.95,k:'שלב 6',t:'הערכה חוזרת לאורך חודשים',
  txt:`קולכיצין מונע התקפים לחלוטין אצל כ־60 עד 70% מהמטופלים, נותן תגובה חלקית אצל 20 עד 30%, ונכשל אצל כ־5%. EULAR 2016 המליצה לבחון את התגובה, את הרעילות ואת ההיענות לטיפול כל 6 חודשים; העדכון של EULAR/PReS מ־2024, שפורסם ב־2025, שומר על מעקב סדיר אבל אינו קובע מרווח קבוע, ומבקש מעקב תכוף יותר בזמן האבחנה וכשהמחלה אינה בשליטה. מהלך לא טיפוסי מחזיר את הבירור אל המצבים המחקים. <sup class="c" data-ref="SoonLaxer2017,Ozen2016,Ozen2025,Cush2025" title="Source 43,199,203,247">43,199,203,247</sup>`,
  pt:'הרופאים ממשיכים לבדוק: האם ההתקפים נעלמו, והאם בדיקות הדם רגועות ביניהם?'}
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
    s+=`<text x="${Q.bx}" y="${Q.ty}" class="t-sm">⁧זרוע 1 · גנוטיפ MEFV + פריטים קליניים⁩</text>`;
    const dim=need?1:.35;
    for(let i=0;i<4;i++){const x=Q.bx+i*Q.bs,f=clamp(gv-i);
      s+=`<rect x="${x}" y="${Q.by}" width="${Q.bw}" height="${Q.bh}" rx="6" style="fill:var(--panel-2);stroke:var(--line);opacity:${dim}"/>`;
      if(f>0)s+=`<rect x="${x}" y="${Q.by}" width="${f1(Q.bw*f)}" height="${Q.bh}" rx="6" style="fill:${met.g?'var(--good)':'var(--terra)'};opacity:${f1(.38*dim)}"/>`;
      if(f>.98)s+=`<rect x="${x}" y="${Q.by}" width="${Q.bw}" height="${Q.bh}" rx="6" style="fill:none;stroke:${met.g?'var(--good)':'var(--terra)'};stroke-width:2;opacity:${dim}"/>`;
      s+=`<text x="${x+Q.bw/2}" y="${Q.lab}" class="t-xs t-mid" style="fill:${f>.5&&need?'var(--ink)':'var(--muted)'};font-weight:700">${['⁧1-3 ימים⁩','פרקים','חזה','בטן'][i]}</text>`}
    if(need){const x=Q.bx+need*Q.bs-4;s+=`<line x1="${x}" x2="${x}" y1="${Q.mk1}" y2="${Q.mk2}" style="stroke:var(--ink);stroke-width:2.5"/><text x="${x}" y="${Q.mky}" class="t-xs t-mid" style="fill:var(--ink)">⁧לפחות ${need}⁩</text>`;
      s+=`<text x="${Q.endX}" y="${Q.sumY}" class="t-sm t-end" style="fill:${met.g?'var(--good)':'var(--muted)'}">⁧${G} מתוך 4 פריטים · ${met.g?'הזרוע מתקיימת':'הזרוע אינה מתקיימת'}⁩</text>`}
    else s+=`<text x="200" y="${Q.sumY-8}" class="t-sm t-mid">⁧אין גנוטיפ מתאים: זרוע 1 אינה חלה⁩</text>`;
    s+=`<text x="${Q.bx}" y="${Q.arm2}" class="t-sm">⁧זרוע 2 · קלינית בלבד (לפחות 6 מתוך 9)⁩</text>`;
    const cx=Q.cx,cy=Q.cy,R=Q.R,pt=v=>{const a=Math.PI-Math.PI*v/9;return[cx+R*Math.cos(a),cy-R*Math.sin(a)]};
    s+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy}" style="fill:none;stroke:var(--panel-2);stroke-width:22;stroke-linecap:butt"/>`;
    if(cv>.01){const[ex,ey]=pt(cv);s+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:${met.c?'var(--good)':'var(--terra)'};stroke-width:22"/>`}
    for(let v=1;v<9;v++){const a=Math.PI-Math.PI*v/9;s+=`<line x1="${f1(cx+(R-11)*Math.cos(a))}" y1="${f1(cy-(R-11)*Math.sin(a))}" x2="${f1(cx+(R+11)*Math.cos(a))}" y2="${f1(cy-(R+11)*Math.sin(a))}" style="stroke:var(--panel);stroke-width:2"/>`}
    {const a=Math.PI/3;s+=`<line x1="${f1(cx+(R-14)*Math.cos(a))}" y1="${f1(cy-(R-14)*Math.sin(a))}" x2="${f1(cx+(R+16)*Math.cos(a))}" y2="${f1(cy-(R+16)*Math.sin(a))}" style="stroke:var(--ink);stroke-width:3"/><text x="${f1(cx+(R+26)*Math.cos(a))}" y="${f1(cy-(R+26)*Math.sin(a)+4)}" class="t-sm t-mid" style="fill:var(--ink)">6</text>`}
    s+=`<text x="${cx-R}" y="${cy+20}" class="t-xs t-mid">0</text><text x="${cx+R}" y="${cy+20}" class="t-xs t-mid">9</text>`;
    s+=`<text x="${cx}" y="${cy-8}" class="t-big t-mid" style="font-size:38px;fill:${met.c?'var(--good)':'var(--ink)'}">${Cn}</text><text x="${cx}" y="${cy+14}" class="t-xs t-mid">⁧מתוך 9 · ${met.c?'הזרוע מתקיימת':'הזרוע אינה מתקיימת'}⁩</text>`;
    g.innerHTML=s;
  }
  function update(){
    const S=st(),need=gt==='conf'?1:gt==='non'?2:0;
    const met={g:need>0&&S.gN>=need,c:S.cN>=6};
    const from={...shown};stopG&&stopG();
    stopG=animate(550,p=>{const e=ease(p);shown.g=lerp(from.g,S.gN,e);shown.c=lerp(from.c,S.cN,e);gauge(shown.g,shown.c,need,met,S.gN,S.cN)},()=>{stopG=null});
    const tok=++gTok;setTimeout(()=>{if(tok!==gTok)return;stopG&&stopG();stopG=null;shown.g=S.gN;shown.c=S.cN;gauge(S.gN,S.cN,need,met,S.gN,S.cN)},700);
    if(RM)gauge(S.gN,S.cN,need,met,S.gN,S.cN);
    const arms=[met.g&&'זרוע הגנוטיפ והקליניקה',met.c&&'הזרוע הקלינית בלבד'].filter(Boolean).join(' וגם ');
    const v=$('#dxVerdict');
    if(!S.pre){v.className='dx-verdict na';v.innerHTML=`<strong>הקריטריונים עוד לא הופעלו</strong><span>שני תנאי הסף חייבים להתקיים לפני שאחת הזרועות מקבלת ציון. ${arms?'אילו התקיימו, הציונים היו מספיקים לפי '+arms+'.':''}</span>`}
    else if(arms){v.className='dx-verdict yes';v.innerHTML=`<strong>מסווג כ־FMF (לצורך סיווג מחקרי)</strong><span>מתקיים לפי ${arms}.</span>`}
    else{v.className='dx-verdict';v.innerHTML=`<strong>לא מסווג כ־FMF לפי הקריטריונים האלה</strong><span>זה לא שולל FMF. קריטריוני סיווג מוותרים על חלק מהרגישות לטובת הסגוליות.</span>`}
    v.innerHTML+=`<span class="stage-cap">קריטריוני סיווג למחקרים, לא בדיקה אבחונית לאדם יחיד.</span>`;
    $('#dxGtDef').innerHTML=DX_GT[gt];
  }
  function setGt(k){gt=k;$$('[data-gt]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.gt===k))}
  $$('[data-gt]').forEach(b=>b.addEventListener('click',()=>{setGt(b.dataset.gt);update()}));
  $$('#m-dx .dx-form input[type=checkbox]').forEach(c=>c.addEventListener('change',update));
  $$('[data-dxex]').forEach(b=>b.addEventListener('click',()=>{const E=DX_EX[b.dataset.dxex];
    $('#dxPre1').checked=!!E.pre[0];$('#dxPre2').checked=!!E.pre[1];
    $$('[data-ci]').forEach(c=>c.checked=E.ci.includes(c.dataset.ci));$$('[data-ab]').forEach(c=>c.checked=E.ab.includes(c.dataset.ab));
    setGt(E.gt);update()}));
  $('#dxPerfG').innerHTML=dxBars([{l:'קבוצת הפיתוח',s:.94,p:.95},{l:'קבוצת התיקוף (n≈1,010)',s:.89,p:1}]);
  $('#dxPerfC').innerHTML=dxBars([{l:'קבוצת הפיתוח',s:.91,p:.92},{l:'קבוצת התיקוף',s:.85,p:.94}]);
  {const E=DX_EX.typ;$('#dxPre1').checked=true;$('#dxPre2').checked=true;$$('[data-ci]').forEach(c=>c.checked=E.ci.includes(c.dataset.ci));setGt('conf')}
  gauge(0,0,1,{g:0,c:0},0,0);update();

  /* ---------- older criteria sets ---------- */
  let crit='th';const cst={th:{},liv:{},yo:{}};const lopt={rule:'simple',ia:'maj'};
  function critGroups(){const C=DX_CRIT[crit];if(crit!=='liv')return C.groups;
    const gs=C.groups.map(x=>({...x,items:x.items.map((t,i)=>({t,id:x.k+i}))}));
    gs[lopt.ia==='maj'?0:1].items.push({t:'התקף בטן לא שלם',id:'ia',flag:1});return gs}
  function critForm(){const C=DX_CRIT[crit];let h='';
    if(crit==='liv')h+=`<div class="ctrls" role="group" aria-label="מערכת כללים"><span class="kicker">מערכת כללים</span><button class="btn" data-lr="simple" aria-pressed="${lopt.rule==='simple'}">פשוטה</button><button class="btn" data-lr="cons" aria-pressed="${lopt.rule==='cons'}">שמרנית</button></div>
      <div class="ctrls" role="group" aria-label="התקף בטן לא שלם"><span class="kicker">"התקף בטן לא שלם" נספר כקריטריון</span><button class="btn" data-lia="maj" aria-pressed="${lopt.ia==='maj'}">עיקרי</button><button class="btn" data-lia="min" aria-pressed="${lopt.ia==='min'}">משני</button></div>
      <p class="dx-def"><span class="tag warn">המקורות חלוקים</span> שחזורים של המאמר מ־1997 חלוקים בשאלה אם התקף בטן לא שלם הוא קריטריון עיקרי או משני; הסקירה של Lancieri מ־2023 מונה אותו כמשני. החליפו את המתג כדי לראות אם זה משנה את התוצאה. <sup class="c" data-ref="Livneh1997,Lancieri2023" title="Source 145,159">145,159</sup></p>`;
    h+=`<p class="dx-def">${C.def}</p>`;
    critGroups().forEach(gr=>{h+=`<fieldset><legend>${gr.lg}</legend>`;
      gr.items.forEach((it,i)=>{const t=typeof it==='string'?it:it.t,id=typeof it==='string'?gr.k+i:it.id;
        h+=`<label class="dx-ck"><input type="checkbox" data-cr="${id}" data-grp="${gr.k}" ${cst[crit][id]?'checked':''}><span>${t}${it.flag?' <small>(המיקום שנוי במחלוקת)</small>':''}</span></label>`});
      if(gr.k==='s')h+=`<p class="dx-def">קריטריונים תומכים נספרים רק בכלל השמרני (1 משני + לפחות 5 תומכים), וזה הכלל שמחושב כאן. שחזור אחד של המאמר מתיר גם 1 משני + לפחות 4 מתוך 5 הקריטריונים התומכים הראשונים. <sup class="c" data-ref="Livneh1997,Lancieri2023" title="Source 145,159">145,159</sup></p>`;
      h+='</fieldset>'});
    $('#dxCritForm').innerHTML=h;critOut()}
  function critOut(){const C=DX_CRIT[crit];const c={M:0,m:0,s:0};
    $$('#dxCritForm [data-cr]').forEach(x=>{if(x.checked)c[x.dataset.grp]++});
    const[cls,ttl,sub]=C.judge(c,lopt);const o=$('#dxCritOut');o.className='dx-verdict'+(cls==='yes'?' yes':cls==='na'?' na':'');
    const dots=(n,tot,k,l)=>tot?`<em>${l}</em>`+Array.from({length:tot},(_,i)=>`<span class="${i<n?'on':''} ${k}"></span>`).join(''):'';
    const tot=k=>critGroups().filter(x=>x.k===k).reduce((a,x)=>a+x.items.length,0);
    o.innerHTML=`<span class="kicker">${C.name}</span><strong>${ttl}</strong><div class="dx-dots">${dots(c.M,tot('M'),'',crit==='yo'?'קריטריונים':'עיקריים')}${dots(c.m,tot('m'),'mn','משניים')}${dots(c.s,tot('s'),'sp','תומכים')}</div><span>${sub}</span>`;
    $('#dxCritPerf').innerHTML=`<span class="kicker">איך הם תפקדו</span>${dxBars(C.perf)}<p class="stage-cap">מקורות: ${C.pcite}</p>`}
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
   {n:'⁧WBC / נויטרופילים⁩',u:'עולים בהתקפים',c:'var(--crocus)',f:d=>.7*gF(d,1,1.4),q:1},
   {n:'⁧ESR / פיברינוגן⁩',u:'עולים, ויורדים לאט יותר',c:'var(--sea)',f:d=>.72*gF(d,2.6,4.5),p:.6,q:1},
   {n:'פריטין',u:'ללא שינוי',c:'var(--muted)',f:()=>.18,flat:1},
   {n:'טסיות',u:'ללא שינוי',c:'var(--muted)',f:()=>.42,flat:1}];
  const val=(R,d)=>{let v=R.f(d);if(pers&&R.p&&!R.flat){const fl=.09*R.p;v=fl+(1-fl)*v}return v};
  function drawLab(t){const d=dOf(t);let s='';
    /* narrow: each row keeps its track but the name moves onto a header line above it,
       the names are shortened and the day axis loses its most crowded ticks */
    const N=vb(ls,'720 410','400 524');
    const L=N?{X0:8,X1:392,Y0:30,RH:74,TOP:18,H:44,ticks:[-2,0,4,7,14,21,28]}
             :{X0:150,X1:700,Y0:26,RH:58,TOP:6,H:44,ticks:[-2,0,2,4,7,14,21,28]};
    const X0=L.X0,X1=L.X1,xd=k=>X0+(k-D0)/(D1-D0)*(X1-X0),yEnd=L.Y0+L.RH*6;
    const NB=` · `;
    if(N)s+=`<text x="${f1(xd(1.5))}" y="13" class="t-xs t-mid" style="fill:var(--terra)">⁧התקף (1 עד 3 ימים)⁩</text><text x="${X1}" y="13" class="t-xs t-end">העקומות סכמטיות</text>`;
    else{s+=`<rect x="${f1(xd(0))}" y="20" width="${f1(xd(3)-xd(0))}" height="350" style="fill:var(--terra-soft);opacity:.7"/><text x="${f1(xd(1.5))}" y="14" class="t-xs t-mid" style="fill:var(--terra)">⁧התקף (1 עד 3 ימים)⁩</text>`;
      L.ticks.forEach(k=>{s+=`<line x1="${f1(xd(k))}" x2="${f1(xd(k))}" y1="20" y2="370" class="grid"/>`});
      s+=`<text x="${X1}" y="14" class="t-xs t-end">צורות העקומות סכמטיות: לא פורסמה עקומה של יום אחר יום</text>`}
    L.ticks.forEach(k=>{s+=`<text x="${f1(xd(k))}" y="${N?yEnd+16:386}" class="t-xs t-mid">${k}</text>`});
    s+=`<text x="${X1}" y="${N?yEnd+32:403}" class="t-xs t-end">ימים מתחילת ההתקף</text>`;
    ROWS.forEach((R,i)=>{const y0=L.Y0+i*L.RH,yb=y0+L.TOP+L.H,h=L.H,yv=v=>yb-h*clamp(v,0,1.05);
      if(N){let rt=`<tspan>${R.un||R.u}</tspan>`;
        if(R.pk&&d>=1.5)rt+=`<tspan style="fill:${R.c}">${NB}חציון בהתקף ${R.pk}</tspan>`;
        if(R.pk&&d>=8)rt+=`<tspan>${NB}${pers?'נשאר גבוה':'בין התקפים '+R.b}</tspan>`;
        if(R.flat&&d>=1)rt+=`<tspan style="fill:var(--good)">${NB}ללא שינוי לאורך ההתקף</tspan>`;
        s+=`<text x="6" y="${y0+12}" class="t-lbl" style="fill:${R.flat?'var(--muted)':'var(--ink)'}">${R.nn||R.n}</text><text x="${X1}" y="${y0+12}" class="t-xs t-end">⁧${rt}⁩</text>`;
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
        if(R.pk&&d>=1.5)s+=`<text x="${f1(xd(3)+10)}" y="${y0+10}" class="t-xs" style="fill:${R.c}">⁧חציון בהתקף ${R.pk} ${R.u}⁩</text>`;
        if(R.pk&&d>=8)s+=`<text x="${X1-2}" y="${y0+26}" class="t-xs t-end">⁧${pers?'נשאר מעל התקין (סכמטי)':'בין התקפים: חציון '+R.b+' '+R.u}⁩</text>`;
        if(R.flat&&d>=1)s+=`<text x="${f1(xd(3)+8)}" y="${f1(cy-6)}" class="t-xs" style="fill:var(--good)">ללא שינוי לאורך ההתקף</text>`}
    });
    if(!N)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="20" y2="370" style="stroke:var(--ink);stroke-width:1.2;opacity:.45"/>`;
    ls.innerHTML=s;
    const num=R=>{const raw=val(R,d);if(pers&&(d<0||d>8))return'מעל התקין';return'≈'+Math.round(R.b+(R.pk-R.b)*(raw-(pers?.09:0))/(1-(pers?.09:0)))+' mg/L'};
    const q=R=>{const v=val(R,d);return v>.15?'מוגבר':pers&&R.p&&(d<0||d>8)?'מוגבר מעט':'תקין'};
    $('#dxLabRead').innerHTML=`<span>יום <b>‎${f1(d)}</b></span><span>SAA <b>${num(ROWS[0])}</b></span><span>CRP <b>${num(ROWS[1])}</b></span><span>WBC <b>${q(ROWS[2])}</b></span><span>ESR <b>${q(ROWS[3])}</b></span><span>פריטין <b>ללא שינוי</b></span><span>טסיות <b>ללא שינוי</b></span>`;
    const p=phaseOf(DX_LAB,t);setLab(p);
    let extra='';if(pers)extra=`<div class="kv"><div><dt>התרחיש הזה</dt><dd>SAA ו־CRP אף פעם לא חוזרים לגמרי לתקין. בערך שליש עד שני שלישים מהמטופלים מראים דלקת כלשהי בין התקפים, וזה הדפוס שקשור לעמילואידוזיס. <sup class="c" data-ref="Berkun2007,Korkmaz2002,Lachmann2006" title="Source 21,136,141">21,136,141</sup></dd></div></div>`;
    $('#dxLabNote').innerHTML=noteHTML(DX_LAB[p])+extra}
  const stopL=playWire(lr,$('#dxLabPlay'),drawLab,15000,'הפעלה חוזרת','dx');
  const setLab=stepWire($('#dxLabSteps'),DX_LAB,lr,drawLab,stopL);
  const ptog=v=>{pers=v;$('#dxLabNorm').setAttribute('aria-pressed',!v);$('#dxLabPers').setAttribute('aria-pressed',v);drawLab(+lr.value)};
  $('#dxLabNorm').onclick=()=>ptog(false);$('#dxLabPers').onclick=()=>ptog(true);
  drawLab(+lr.value);

  /* ---------- diagnostic pathway ---------- */
  const ps=$('#dxPathSvg'),pr=$('#dxPathT');
  const PN=[{a:'חום חוזר שחולף מעצמו',b:'⁧חום + סרוזיטיס, 1 עד 3 ימים⁩'},{a:'שלילת מצבים מחקים',b:'זיהום, בטן כירורגית, קדחות אחרות'},{a:'סמני שלב חריף',b:'בהתקף ובין התקפים'},
            {a:'⁧בדיקת MEFV⁩',b:'⁧אקסונים 2, 3, 5 ו־10⁩'},{a:'ניסיון בקולכיצין',b:'⁧6 חודשים אם הגנטיקה לא ברורה⁩'},{a:'הערכה חוזרת',b:'⁧התקפים + SAA/CRP לאורך חודשים⁩'}];
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
       <text x="${px+12}" y="${py+18}" class="t-sm" style="fill:var(--terra)">⁧בטן כירורגית? 182 מטופלי FMF⁩</text>`;
      const bx=px+116,bw=170,bar=(y,lbl,fmf,genA,genB,fl,gl)=>{let q=`<text x="${px+12}" y="${y+9}" class="t-sm">${lbl}</text>`;
        q+=`<rect x="${bx}" y="${y}" width="${f1(bw*fmf*ease(ap))}" height="11" rx="3" style="fill:var(--terra)"/><text x="${f1(bx+bw*fmf*ease(ap)+5)}" y="${y+9}" class="t-xs" style="fill:var(--terra)">FMF ${fl}</text>`;
        q+=`<rect x="${bx}" y="${y+16}" width="${f1(bw*genB*ease(ap))}" height="11" rx="3" style="fill:var(--muted);opacity:.35"/><rect x="${bx}" y="${y+16}" width="${f1(bw*genA*ease(ap))}" height="11" rx="3" style="fill:var(--muted);opacity:.7"/><text x="${f1(bx+bw*genB*ease(ap)+5)}" y="${y+25}" class="t-xs">⁧כללי ${gl}⁩</text>`;return q};
      s+=bar(py+32,'כריתת תוספתן',.4,.12,.25,'40%','12-25%');
      s+=bar(py+74,'לא מודלק',.8,.2,.2,'80%','כ־20%');
      s+=`</g>`}
    // genotype outcomes under node 4
    const gp=ramp(t,DX_PL[3]+.02,DX_PL[3]+.12);
    if(gp>0){const[px,py]=L.gen;
      s+=`<g style="opacity:${f1(gp)}">${stub(1)}<rect x="${px}" y="${py}" width="${L.genW}" height="94" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      [['var(--good)','⁧שני פתוגניים: מתאים ל־FMF⁩'],['var(--warn)','⁧וריאנט אחד / VUS: לא ברור⁩'],['var(--muted)','⁧אין: FMF עדיין אפשרית⁩']].forEach(([c,l],k)=>{s+=`<circle cx="${px+16}" cy="${py+20+k*26}" r="5" style="fill:${c}"/><text x="${px+28}" y="${py+24+k*26}" class="t-xs">${l}</text>`});
      s+=`</g>`;
      if(t>DX_PL[4]-.04)s+=`<path d="${L.warn}" class="arrow" style="stroke:var(--warn);stroke-dasharray:4 3;opacity:${f1(ramp(t,DX_PL[4]-.04,DX_PL[4]))}"${N?' marker-end="url(#dxPa)"':''}/>`}
    // colchicine trial box under node 5
    const cp=ramp(t,DX_PL[4]+.02,DX_PL[4]+.12);
    if(cp>0){const[px,py]=L.col;
      s+=`<g style="opacity:${f1(cp)}"><rect x="${px}" y="${py}" width="${L.colW}" height="94" rx="10" style="fill:var(--crocus-soft);stroke:var(--crocus)"/><text x="${px+12}" y="${py+20}" class="t-sm" style="fill:var(--crocus)">תגובה לטיפול נחשבת</text>
      <text x="${px+12}" y="${py+42}" class="t-xs" style="fill:var(--ink)">תל השומר: קריטריון עיקרי</text><text x="${px+12}" y="${py+62}" class="t-xs" style="fill:var(--ink)">ליבנה: קריטריון משני</text><text x="${px+12}" y="${py+82}" class="t-xs">משך הניסיון: כ־6 חודשים</text></g>`}
    // outcomes under node 6
    const op=ramp(t,DX_PL[5]+.02,DX_PL[5]+.12);
    if(op>0){const[px,py]=L.out;
      s+=`<g style="opacity:${f1(op)}"><rect x="${px}" y="${py}" width="${L.outW}" height="94" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${px+12}" y="${py+18}" class="t-sm">בטיפול בקולכיצין</text>`;
      [['תגובה מלאה','60-70%',.65,'var(--good)'],['תגובה חלקית','20-30%',.25,'var(--warn)'],['ללא תגובה','כ־5%',.05,'var(--bad)']].forEach(([l,v,w,c],k)=>{const y=py+30+k*20;s+=`<text x="${px+12}" y="${y+8}" class="t-xs">${l}</text><rect x="${px+88}" y="${y}" width="${f1(70*w*ease(op))}" height="9" rx="3" style="fill:${c}"/><text x="${f1(px+92+70*w*ease(op))}" y="${y+8}" class="t-xs">${v}</text>`});
      s+=`</g>`}
    ps.innerHTML=s;setPath(cur);$('#dxPathNote').innerHTML=noteHTML(DX_PATH[cur])}
  const stopP=playWire(pr,$('#dxPathPlay'),drawPath,16000,'הפעלה חוזרת','dx');
  const setPath=stepWire($('#dxPathSteps'),DX_PATH,pr,drawPath,stopP);
  drawPath(+pr.value);
  /* this module has three drawings but one module id, so re-lay-out all of them together */
  redraws.dx=()=>{stopL();stopP();drawLab(+lr.value);drawPath(+pr.value);update()};

  $('#dxCards').innerHTML=`
   <div class="card"><h4>למה הבדיקה הגנטית עלולה להטעות</h4><p>לכ־10 עד 20% מהאנשים עם FMF אין וריאנט ב־<i>MEFV</i>, ובדרך כלל התמונה הקלינית שלהם קלה יותר. וריאנט בודד הוא ממצא שכיח: בקבוצת מטופלים שהופנו למרכז בטורקיה, 415 מתוך 1,291 מטופלים (32%) היו הטרוזיגוטים. גם לנשאים בריאים יש רמות CRP ו־SAA גבוהות מעט יותר מאשר למי שאינם נשאים. <sup class="c" data-ref="BenZvi2015,Tanatar2020,Lachmann2006" title="Source 19,141,253">19,141,253</sup></p></div>
   <div class="card"><h4>קריטריונים לא תמיד עוברים טוב בין אוכלוסיות</h4><p>בילדים במרשם Eurofever שהחום שלהם נבע מסיבות אחרות, לקריטריוני ליבנה הייתה סגוליות של 41.1% בלבד, ולקריטריונים לילדים 40.7%. קריטריונים שנבנו באוכלוסיות שבהן FMF שכיחה מסווגים יותר מדי אנשים כ־FMF במקומות שבהם קדחות מחזוריות אחרות שכיחות. <sup class="c" data-ref="Demirkaya2016" title="Source 49">49</sup></p></div>
   <div class="card"><h4>תגובה לקולכיצין עוזרת, אבל אינה הוכחה</h4><p>בעבודה היומיומית, תגובה טובה ומוצא מתאים יכולים לתמוך ב־FMF אצל מי שיש לו גנוטיפ לא מאשר, אבל הפאנל של Eurofever/PRINTO השאיר את שניהם מחוץ לקריטריונים. <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup></p></div>
   <div class="card"><h4>וריאנט פתוגני אחד אינו "מאשר"</h4><p>וריאנט פתוגני יחיד ב־<i>MEFV</i>, במצב הטרוזיגוטי, נחשב גנוטיפ <b>לא מאשר</b> בקריטריונים של 2019, ולכן נדרשים <b>2</b> מתוך 4 הפריטים הקליניים, ולא 1. אותו דבר נכון לגבי וריאנט פתוגני אחד ועוד VUS בעותק השני (in trans), ולגבי שני VUS. וריאנטים שפירים וככל הנראה שפירים אינם נספרים כלל. <sup class="c" data-ref="Gattorno2019,Lancieri2023" title="Source 75,145">75,145</sup></p></div>
   <div class="card"><h4>ספירה, לא ניקוד</h4><p>שתי המערכות של FMF הן ספירות פשוטות: כל פריט שווה 1 ואין משקלות, כך שהספים של 4 הפריטים ושל 9 הפריטים הם כל מה שיש. המערכת הקלינית ל־TRAPS באותו מאמר משוקללת בנקודות, עם סף של 5, ולכן אין לערבב בין שני המודלים. <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup></p></div>
   <div class="card"><h4>למי לעשות בדיקה גנטית?</h4><p>אפשר להשתמש בפריטים הקליניים בלבד של Eurofever/PRINTO גם כדי לבחור את מי לבדוק. ציונים קליניים זמניים ומוקדמים יותר של Eurofever (2015) הבחינו בין FMF לבין קדחות מחזוריות אחרות עם AUC של 0.98. <sup class="c" data-ref="Gattorno2019,Federici2015" title="Source 65,75">65,75</sup></p></div>`;
};
/* =============== 3.3 the differential =============== */
const DD_DZ=[
 {id:'fmf',n:'FMF',full:'קדחת ים תיכונית משפחתית (FMF)',sub:'⁧1-3 ימים, לא סדיר⁩',src:'cited',
  gene:`<i>MEFV</i>, ‏16p13.3; תורשה אוטוזומלית רצסיבית, לעתים עם וריאנט אחד בלבד או בתורשה דומיננטית (M694del, וריאנטים בעמדה T577) <sup class="c" data-ref="GeneReviews,Booth2000,Stoffels2014" title="Source 25,76,250">25,76,250</sup>`,
  len:`12 עד 72 h‏; 1 עד 3 ימים ב־Eurofever <sup class="c" data-ref="Livneh1997,Gattorno2019" title="Source 75,159">75,159</sup>`,
  feat:`מוצא ממזרח הים התיכון; דלקת הצפק, דלקת חד־צדדית של קרום הריאה; דלקת בפרק גדול אחד; אודם דמוי שושנה בשוק; כאב ברגליים במאמץ; תגובה לקולכיצין <sup class="c" data-ref="Livneh1997,TurkishFMF2005" title="Source 159,264">159,264</sup>`,
  test:`CRP/SAA גבוהים בהתקפים, ואילו הפריטין והטסיות לא עולים <sup class="c" data-ref="Korkmaz2002" title="Source 136">136</sup>; גנוטיפ <i>MEFV</i> <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>; ניסיון טיפולי בקולכיצין <sup class="c" data-ref="GeneReviews" title="Source 76">76</sup>`,
  pn:`משך ההתקף מצוטט. המרווחים הלא אחידים משקפים תיאורים שפורסמו של התקפי FMF כלא סדירים, בניגוד ל־PFAPA. <sup class="c" data-ref="BenChetrit2019" title="Source 17">17</sup>`,
  ep:[[3,2,'f'],[17,3,'f'],[24,1.5,'f'],[45,2.5,'f']]},
 {id:'traps',n:'TRAPS',full:'תסמונת מחזורית הקשורה לקולטן ל־TNF‏ (TRAPS)',sub:'⁧7 ימים ומעלה⁩',src:'cited',
  gene:`<i>TNFRSF1A</i>; תורשה אוטוזומלית דומיננטית <sup class="c" data-ref="Lachmann2014" title="Source 143">143</sup>`,
  len:`לעתים קרובות 7 ימים או יותר <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>`,
  feat:`פריחה נודדת מעל שרירים כואבים; בצקת סביב העיניים; דלקת הלחמית; סיפור משפחתי ב־64% מהמקרים שאינם R92Q. כ־70 ימים עם תסמינים בשנה, ועמילואידוזיס מסוג AA ב־10% <sup class="c" data-ref="Lachmann2014" title="Source 143">143</sup>`,
  test:`ריצוף <i>TNFRSF1A</i> ‏(R92Q ו־P46L הם וריאנטים בעלי חדירות נמוכה) <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>`,
  pn:`התקף אחד של 11 ימים בתוך 60 ימים מתאים לכ־70 הימים עם תסמינים בשנה שתוארו בסדרת ה־TRAPS של Eurofever. <sup class="c" data-ref="Lachmann2014" title="Source 143">143</sup>`,
  ep:[[12,11,'f']]},
 {id:'mkd',n:'MKD / HIDS',full:'חסר באנזים מבלונט קינאז (MKD, ‏HIDS)',sub:'⁧3-7 ימים⁩',src:'cited',
  gene:`<i>MVK</i>; תורשה אוטוזומלית רצסיבית (נדרשים שני וריאנטים) <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>`,
  len:`3 עד 7 ימים ללא טיפול <sup class="c" data-ref="Favier2016" title="Source 62">62</sup>`,
  feat:`הופעה בינקות (חציון 0.5 שנים); בלוטות לימפה בצוואר; כיבים בפה; שלשולים והקאות; פריחה מקולופפולרית; בסדרה אחת, חיסון עורר את ההתלקחות הראשונה אצל 63% <sup class="c" data-ref="TerHaar2016,Favier2016" title="Source 62,256">62,256</sup>`,
  test:`חומצה מבלונית בשתן בזמן התקף (רגישות 92%, סגוליות 90%, ערך ניבוי שלילי 98%) <sup class="c" data-ref="Jeyaratnam2016" title="Source 113">113</sup>; גנוטיפ <i>MVK</i> או פעילות האנזים`,
  pn:`משך ההתקף מצוטט; הפער בין ההתקפים להמחשה בלבד. <sup class="c" data-ref="Favier2016" title="Source 62">62</sup>`,
  ep:[[6,5,'f'],[34,4.5,'f']]},
 {id:'caps',n:'CAPS (FCAS)',full:'תסמונות מחזוריות הקשורות לקריופירין (CAPS: ‏FCAS, ‏MWS, ‏NOMID)',sub:'⁧FCAS: פחות מ־24 h, קור⁩',src:'gk',
  gene:`<i>NLRP3</i>; תורשה אוטוזומלית דומיננטית, או מוטציה חדשה (de novo) <sup class="c" data-ref="SoonLaxer2017" title="Source 247">247</sup>`,
  len:`FCAS: פחות מ־24 h‏; MWS:‏ 1 עד 3 ימים; NOMID: רציף (ידע מקובל בהוראה, שלא נבדק מול מקור ראשוני) <sup class="c" data-ref="Lachmann2017" title="Source 144">144</sup>`,
  feat:`פריחה דמוית סרפדת (אורטיקריאלית); טריגרים של קור או לחץ; ירידת שמיעה תחושתית־עצבית; דלקת הלחמית; דלקת קרום המוח אספטית; צמיחת יתר של עצם <sup class="c" data-ref="KuemmerleDeschner2017,Gattorno2019" title="Source 75,138">75,138</sup>`,
  test:`ריצוף <i>NLRP3</i>, כולל חיפוש אחר מוזאיקה סומטית <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup>`,
  pn:`משכי ההתקף של תת־הסוגים הם ידע מקובל בהוראה, ומסומנים כמי שלא נבדקו מול מקור ראשוני. השורה מציגה FCAS: התלקחויות קצרות אחרי ימים קרים.`,
  ep:[[8,.6,'f'],[9.6,.5,'f'],[22,.7,'f'],[37,.5,'f'],[51,.6,'f']]},
 {id:'pfapa',n:'PFAPA',full:'חום מחזורי, דלקת פה אפטית, דלקת לוע ודלקת בלוטות לימפה (PFAPA)',sub:'⁧3-6 ימים, כל כ־28 ימים⁩',src:'cited',
  gene:`אין גן ידוע; לא תורשתית <sup class="c" data-ref="SoonLaxer2017" title="Source 247">247</sup>`,
  len:`3 עד 6 ימים (ממוצע 4.8), בקביעות של שעון, בערך כל 28 ימים <sup class="c" data-ref="Thomas1999,Gattorno2019" title="Source 75,258">75,258</sup>`,
  feat:`הופעה בדרך כלל לפני גיל 5; כאב גרון, כיבים בפה, בלוטות לימפה בצוואר; ללא סרוזיטיס, כאב בחזה, דלקת פרקים או שלשול; גדילה תקינה; ללא עמילואידוזיס <sup class="c" data-ref="Gattorno2019,SoonLaxer2017" title="Source 75,247">75,247</sup>`,
  test:`אבחנה קלינית; מנה אחת של פרדניזון קוטעת את ההתקף <sup class="c" data-ref="SoonLaxer2017,Thomas1999" title="Source 247,258">247,258</sup>`,
  pn:`גם משך ההתקף וגם הקצב של כ־28 ימים מצוטטים. <sup class="c" data-ref="Thomas1999" title="Source 258">258</sup>`,
  ep:[[4,4.8,'f'],[32,4.8,'f']]},
 {id:'beh',n:'מחלת בהצ׳ט',full:'מחלת בהצ׳ט (Behçet)',sub:'⁧כיבים 1-2 שבועות⁩',src:'gk',
  gene:`פוליגנית; קשר ל־HLA-B51 (ידע כללי)`,
  len:`כיבים בפה נמשכים בדרך כלל 1 עד 2 שבועות (ידע כללי); מהלך כרוני של התלקחויות חוזרות`,
  feat:`כיבים חוזרים בפה ובאיברי המין, דלקת הענבייה (uveitis), נגעים בעור, פקקת בכלי דם, תופעת פתרגיה <sup class="c" data-ref="ICBD2014" title="Source 104">104</sup>`,
  test:`ציון ICBD של 4 ומעלה: נגעים בעין, בפה ובאיברי המין, 2 נקודות כל אחד; נגעים בעור, סימנים במערכת העצבים, סימנים בכלי הדם ובדיקת פתרגיה חיובית, 1 נקודה כל אחד (רגישות 93.9%, סגוליות 92.1%) <sup class="c" data-ref="ICBD2014" title="Source 104">104</sup>`,
  pn:`משך הכיבים הוא ידע כללי, ואינו נשען על מקור שנבדק.`,
  ep:[[10,12,'u'],[44,10,'u']]},
 {id:'ibd',n:'IBD',full:'מחלת מעי דלקתית (IBD: מחלת קרוהן, קוליטיס כיבית)',sub:'כרונית, לא חולפת מעצמה',src:'gk',
  gene:`פוליגנית`,
  len:`כרונית או מתמשכת, ולא חולפת מעצמה בתוך 1 עד 3 ימים`,
  feat:`שלשול כרוני או דימום, ירידה במשקל, עיכוב בגדילה, מחלה פריאנלית <sup class="c" data-ref="Maaser2019" title="Source 161">161</sup>`,
  test:`קלפרוטקטין בצואה; אנדוסקופיה עם ביופסיה; הדמיית חתך <sup class="c" data-ref="Maaser2019" title="Source 161">161</sup>`,
  pn:`מוצגת כפעילות רציפה ומשתנה: ידע מקובל בהוראה, ולא מהלך זמן מצוטט.`,
  ep:[[0,60,'c']]},
 {id:'aip',n:'פורפיריה חריפה',full:'פורפיריה חריפה לסירוגין (AIP)',sub:'ימים, בדרך כלל ללא חום',src:'gk',
  gene:`<i>HMBS</i>; תורשה אוטוזומלית דומיננטית עם חדירות נמוכה (ידע כללי)`,
  len:`ימים`,
  feat:`כאב בטן חמור עם מעט סימנים צפקיים; נוירופתיה, נתרן נמוך, תסמינים פסיכיאטריים, שתן כהה; טריגרים תרופתיים או הורמונליים; בדרך כלל ללא חום <sup class="c" data-ref="Anderson2005" title="Source 4">4</sup>`,
  test:`פורפובילינוגן גבוה מאוד בשתן, בדגימת שתן אקראית אחת <sup class="c" data-ref="Anderson2005" title="Source 4">4</sup>`,
  pn:`"ימים" הוא ידע מקובל בהוראה; היעדר החום מצוטט. <sup class="c" data-ref="Anderson2005" title="Source 4">4</sup>`,
  ep:[[26,4,'a']]},
 {id:'app',n:'דלקת תוספתן',full:'דלקת תוספתן או בטן כירורגית אחרת',sub:'מחמיר, לא חולף',src:'gk',
  gene:`אין`,
  len:`הכאב נמשך ומחמיר, במקום לחלוף בתוך 1 עד 3 ימים`,
  feat:`אצל מטופלי FMF, מעבר מכאב מפושט לכאב ברביע הימני התחתון היה המנבא הטוב ביותר לתוספתן מודלק באמת; 80% מהתוספתנים שהוצאו ממטופלי FMF לא היו מודלקים <sup class="c" data-ref="Lidar2008" title="Source 150">150</sup>`,
  test:`אולטרסאונד או CT, והערכה כירורגית; היסטוריה של התקפים חוזרים שחולפים מעצמם מכוונת ל־FMF <sup class="c" data-ref="Lidar2008" title="Source 150">150</sup>`,
  pn:`התקף יחיד שמחמיר עד לניתוח: ידע מקובל בהוראה.`,
  ep:[[30,2.6,'p']]},
 {id:'aosd',n:'AOSD / sJIA',full:'מחלת סטיל של המבוגר (AOSD) / דלקת מפרקים אידיופתית סיסטמית של ילדים (sJIA)',sub:'⁧קפיצות יומיות, ⁦≥1⁩ שבוע⁩',src:'gk',
  gene:`פוליגנית`,
  len:`חום יומי בקפיצות במשך לפחות 1 שבוע; מתמשך ולא התקפי`,
  feat:`פריחה חולפת בצבע ורוד־סלמון יחד עם החום, דלקת פרקים, כאב גרון, בלוטות לימפה או טחול מוגדלים, ספירת לבנים גבוהה <sup class="c" data-ref="Yamaguchi1992" title="Source 277">277</sup>`,
  test:`קריטריוני Yamaguchi (לפחות 5 קריטריונים, מהם לפחות 2 עיקריים: רגישות 96.2%, סגוליות 92.1%); פריטין גבוה מאוד, בניגוד להתקפי FMF <sup class="c" data-ref="Yamaguchi1992,Korkmaz2002" title="Source 136,277">136,277</sup>`,
  pn:`קפיצות חום פעם ביום (quotidian) הן ידע מקובל בהוראה, ולא מהלך זמן מצוטט.`,
  ep:[[15,30,'d']]}
];
const DD_CLUE=[
 {l:'חולף מעצמו בתוך 1 עד 3 ימים',ids:['fmf'],say:`התקפים קצרים, לא סדירים, שחולפים מעצמם הם החתימה של FMF. הצעדים הבאים: CRP/SAA בהתקף ובין התקפים, גנוטיפ <i>MEFV</i>, תגובה לקולכיצין. גם MWS, תת־סוג של CAPS, יכולה להימשך 1 עד 3 ימים. <sup class="c" data-ref="Livneh1997,Gattorno2019,Lachmann2017" title="Source 75,144,159">75,144,159</sup>`},
 {l:'נמשך שבוע או יותר',ids:['traps','aosd','beh'],say:`התקפי TRAPS נמשכים לעתים קרובות 7 ימים או יותר (בדיקה: <i>TNFRSF1A</i>); במחלת סטיל החום קופץ מדי יום במשך שבוע לפחות (פריטין גבוה מאוד); כיבי בהצ׳ט נמשכים 1 עד 2 שבועות (ציון ICBD). <sup class="c" data-ref="Gattorno2019,Yamaguchi1992,ICBD2014" title="Source 75,104,277">75,104,277</sup>`},
 {l:'כמו שעון, בערך כל 4 שבועות',ids:['pfapa'],say:`מחזור קבוע של כ־28 ימים, עם כאב גרון, כיבים בפה ובלוטות בצוואר אצל ילד צעיר, מרמז על PFAPA. מנה אחת של פרדניזון שקוטעת את ההתקף תומכת באבחנה. <sup class="c" data-ref="Thomas1999,SoonLaxer2017" title="Source 247,258">247,258</sup>`},
 {l:'הופעה בינקות, טריגר של חיסון, שלשולים',ids:['mkd'],say:`MKD מתחילה בינקות (חציון 0.5 שנים), ובסדרה אחת חיסונים עוררו את ההתלקחות הראשונה אצל 63%. בדיקה: חומצה מבלונית בשתן בזמן התקף. <sup class="c" data-ref="TerHaar2016,Favier2016,Jeyaratnam2016" title="Source 62,113,256">62,113,256</sup>`},
 {l:'הכאב עובר לרביע הימני התחתון וממשיך להחמיר',ids:['app'],say:`גם אצל מטופל שידוע שיש לו FMF, מעבר מכאב מפושט לכאב ברביע הימני התחתון היה המנבא הטוב ביותר לתוספתן מודלק באמת. הדמיה והערכה כירורגית. <sup class="c" data-ref="Lidar2008" title="Source 150">150</sup>`},
 {l:'אין חום; שתן כהה, נתרן נמוך, נוירופתיה',ids:['aip'],say:`פורפיריה חריפה: כאב חמור עם מעט סימנים צפקיים, ובדרך כלל ללא חום. בדיקה: פורפובילינוגן בשתן, בדגימה אקראית אחת. <sup class="c" data-ref="Anderson2005" title="Source 4">4</sup>`},
 {l:'פריחה דמוית סרפדת אחרי חשיפה לקור',ids:['caps'],say:`פריחה אורטיקריאלית עם טריגרים של קור או לחץ מכוונת ל־CAPS. בדיקה: ריצוף <i>NLRP3</i>, כולל מוזאיקה סומטית. <sup class="c" data-ref="Gattorno2019,KuemmerleDeschner2017" title="Source 75,138">75,138</sup>`},
 {l:'שלשול כרוני, ירידה במשקל, גדילה לקויה',ids:['ibd'],say:`תסמיני מעי מתמשכים מכוונים ל־IBD. בדיקות: קלפרוטקטין בצואה, ואחר כך אנדוסקופיה עם ביופסיה. <sup class="c" data-ref="Maaser2019" title="Source 161">161</sup>`},
 {l:'קפיצות חום יומיות, פריחה בצבע סלמון, פריטין גבוה מאוד',ids:['aosd'],say:`מחלת סטיל (AOSD/sJIA). בהתקפי FMF הפריטין והטסיות לא עולים, וזה עוזר להבדיל בין השתיים. <sup class="c" data-ref="Yamaguchi1992,Korkmaz2002" title="Source 136,277">136,277</sup>`},
 {l:'כיבים בפה ובאיברי המין, דלקת בעין',ids:['beh'],say:`מחלת בהצ׳ט: ציון ICBD של 4 ומעלה מסווג אותה; בדיקת פתרגיה ובדיקת עיניים עוזרות. <sup class="c" data-ref="ICBD2014" title="Source 104">104</sup>`}
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
    if(N){s+=`<text x="4" y="13" class="t-xs">⁧חלון של 60 ימים · משכים מצוטטים, מרווחים סכמטיים⁩</text>`;
      for(let d=0;d<=60;d+=10)s+=`<text x="${f1(xd(d))}" y="33" class="t-xs t-mid">${d}</text>`}
    else{for(let d=0;d<=60;d+=10)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${Y0-4}" y2="${yEnd}" class="grid"/>`;
      s+=`<text x="${X0}" y="14" class="t-xs">⁧דפוס התקפים אופייני · חלון של 60 ימים · משכים מצוטטים, מרווחים סכמטיים⁩</text><text x="684" y="14" class="t-xs t-mid">מקור</text>`}
    for(let d=0;d<=60;d+=10)s+=`<text x="${f1(xd(d))}" y="${yEnd+16}" class="t-xs t-mid">${d}</text>`;
    s+=`<text x="${X1}" y="${yEnd+32}" class="t-xs t-end">ימים</text>`;
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
          g+=`<text x="${f1(xb+5)}" y="${bt+15}" class="t-xs" style="fill:${day>=st+du?'var(--bad)':'var(--muted)'};font-weight:${day>=st+du?700:500}">→ ניתוח</text>`}
        if(k==='d'){const yb=bt+bh;g+=`<rect x="${f1(xa)}" y="${yb-6}" width="${f1(xb-xa)}" height="6" style="fill:${c};opacity:.13"/>`;
          for(let q=0;q<du;q++){const xs=xd(st+q+.35),ok=day>=st+q+.35;g+=`<path d="M${f1(xs-3)} ${yb} L${f1(xs)} ${bt+1} L${f1(xs+3)} ${yb}Z" style="fill:${c};opacity:${ok?.9:.15}"/>`}
          if(live)g+=`<rect x="${f1(xa-2)}" y="${bt-2}" width="${f1(xb-xa+4)}" height="${bh+4}" rx="5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`}
      });
      if(D.id==='pfapa'){const a=xd(4+4.8),b=xd(32);g+=`<line x1="${f1(a+3)}" x2="${f1(b-3)}" y1="${bt+bh/2}" y2="${bt+bh/2}" style="stroke:var(--muted);stroke-dasharray:2 3"/><text x="${f1((xd(4)+xd(32))/2+20)}" y="${bt+bh/2-4}" class="t-xs t-mid">כ־28 ימים</text>`}
      if(on)act.push(D.n);
      const cited=D.src==='cited';
      g+=`<rect x="${L.bx}" y="${y0+(N?2:9)}" width="${L.bw}" height="17" rx="5" style="fill:${cited?'var(--good-soft)':'var(--warn-soft)'}"/><text x="${L.bx+L.bw/2}" y="${y0+(N?14:21)}" class="t-xs t-mid" style="fill:${cited?'var(--good)':'var(--warn)'};font-weight:700">${cited?'מצוטט':'הוראה'}</text>`;
      if(D.id===sel)g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
      s+=`<g class="clk" data-dd="${D.id}" style="opacity:${dim?.28:1}"><rect x="0" y="${y0}" width="${L.W}" height="${RH}" style="fill:transparent"/>${g}</g>`});
    if(N){DD_DZ.forEach((D,i)=>{const bt=Y0+i*RH+L.bo;s+=`<line x1="${f1(xd(day))}" x2="${f1(xd(day))}" y1="${bt-5}" y2="${bt+L.bh+5}" style="stroke:var(--ink);stroke-width:1.5;opacity:.6"/>`});
      s+=`<path d="M${f1(xd(day)-5)} 38 L${f1(xd(day)+5)} 38 L${f1(xd(day))} 46Z" style="fill:var(--ink)"/>`}
    else s+=`<line x1="${f1(xd(day))}" x2="${f1(xd(day))}" y1="${Y0-6}" y2="${yEnd}" style="stroke:var(--ink);stroke-width:1.5;opacity:.6"/><circle cx="${f1(xd(day))}" cy="${Y0-6}" r="4" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    $('#ddRead').innerHTML=`<span>יום <b>${Math.floor(day)}</b></span><span>פעיל עכשיו <b>${act.length?act.join(',‏ '):'אף אחד'}</b></span>`;
  }
  function note(){const D=DD_DZ.find(x=>x.id===sel);const cited=D.src==='cited';
    $('#ddNote').innerHTML=`<div class="kicker">${D.id==='fmf'?'דפוס הייחוס':'בהשוואה ל־FMF'}</div><h4>${D.full}</h4>
     <dl class="kv"><div><dt>גן / תורשה</dt><dd>${D.gene}</dd></div><div><dt>משך התקף אופייני</dt><dd>${D.len}</dd></div><div><dt>מאפיינים עיקריים</dt><dd>${D.feat}</dd></div><div><dt>בדיקה מבחינה</dt><dd>${D.test}</dd></div>
     <div><dt>הקצב באנימציה</dt><dd><span class="tag ${cited?'good':'warn'}">${cited?'מצוטט':'ידע מקובל בהוראה'}</span> ${D.pn}</dd></div></dl>`;
    $$('[data-ddp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ddp===sel));
    $$('#ddTbl tr').forEach(r=>r.style.outline=r.dataset.dd===sel?'2px solid var(--ink)':'')}
  function pick(id){sel=id;note();draw(+rg.value)}
  $('#ddPick').innerHTML=DD_DZ.map(D=>`<button class="btn" data-ddp="${D.id}" aria-pressed="${D.id===sel}">${D.n}</button>`).join('');
  $('#ddPick').addEventListener('click',e=>{const b=e.target.closest('[data-ddp]');if(b)pick(b.dataset.ddp)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-dd]');if(g)pick(g.dataset.dd)});
  $('#ddTbl').innerHTML=DD_DZ.map(D=>`<tr data-dd="${D.id}"${D.id==='fmf'?' class="hl"':''}><th>${D.full}</th><td>${D.gene}</td><td>${D.len}</td><td>${D.feat}</td><td>${D.test}</td></tr>`).join('');
  $('#ddTbl').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const r=e.target.closest('tr[data-dd]');if(r){pick(r.dataset.dd);$('#ddNote').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  function clueOut(){const o=$('#ddClueOut');
    if(clue<0){o.innerHTML=`<span class="kicker">לא נבחר רמז</span><span>בחרו רמז למעלה. FMF היא שורת הייחוס, והיא מוצללת בכל תצוגה.</span>`;return}
    const C=DD_CLUE[clue];o.innerHTML=`<span class="kicker">מכוון אל</span><b class="big">${C.ids.map(i=>DD_DZ.find(d=>d.id===i).full).join(' · ')}</b><span>${C.say}</span>`}
  $('#ddClues').innerHTML=DD_CLUE.map((c,i)=>`<button class="btn" data-ddc="${i}" aria-pressed="false">${c.l}</button>`).join('');
  $('#ddClues').addEventListener('click',e=>{const b=e.target.closest('[data-ddc]');if(!b)return;const i=+b.dataset.ddc;clue=clue===i?-1:i;
    $$('[data-ddc]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.ddc===clue));if(clue>=0)sel=DD_CLUE[clue].ids[0];note();clueOut();draw(+rg.value)});
  playWire(rg,$('#ddPlay'),draw,18000,'הפעלה חוזרת','ddx');
  note();clueOut();draw(+rg.value);
};
/* =============== 4.1 the treatment ladder =============== */
const LD_RUNGS=[
 {t:'אבחנה קלינית',s:'EULAR: קולכיצין מנקודה זו'},
 {t:'מינון התחלתי לפי גיל',s:'טווחי EULAR 2016, במנה אחת או מחולקת'},
 {t:'המינון המרבי הנסבל',s:'קודם היענות · CRP/SAA כל 3 חודשים'},
 {t:'עמידות או אי־סבילות',s:'ההגדרות, ומה הן דורשות'},
 {t:'הוספת חסימת IL-1',s:'הקולכיצין ממשיך לצידה'},
 {t:'אפשרויות אחרות',s:'ראיות חלשות יותר או שליליות'}
];
const LD_STEPS=[
 {from:0,at:.04,k:'שלב 1 · התחלה',t:'קולכיצין עם האבחנה הקלינית',
  txt:'המלצה 3 של EULAR 2016 קובעת שיש להתחיל קולכיצין מיד כשנקבעת אבחנה קלינית של FMF (רמת ראיות 1b). העדכון של 2024 משאיר זאת, ושתי הגרסאות מאפשרות לתת את הכמות היומית פעם ביום או לחלק אותה לאורך היום. סקירת Cochrane של 10 ניסויים אקראיים עם 312 משתתפים, והסקירה השיטתית מ־2025 שנכתבה לקראת העדכון, מצאו שמתן פעם ביום ומתן במנות מחולקות שקולים. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025,Yin2022,Sag2025" title="Source 199,203,222,229,283">199,203,222,229,283</sup>',
  pt:'הטיפול לא מחכה לבדיקה הגנטית. ברגע שהתמונה הקלינית מתאימה ל־FMF, ההנחיות שפורסמו מתחילות קולכיצין.',
  hook:'קולכיצין הוא <b>טיפול מונע</b>, שמתחילים על סמך התמונה הקלינית ונוטלים לכל החיים. הגנטיקה תומכת באבחנה; היא אינה תנאי לטיפול.'},
 {from:.16,at:.2,k:'שלב 2 · מינון',t:'מינוני ההתחלה של 2016 לפי גיל',
  txt:'המאמר מ־2016 נותן טווחי התחלה של עד 0.5 mg ביום מתחת לגיל 5, 0.5 עד 1.0 mg ביום בגילים 5 עד 10, ו־1.0 עד 1.5 mg ביום מעל גיל 10 ובמבוגרים. התקרות שנקבעו הן 2 mg ביום בילדים ו־3 mg ביום במבוגרים, והעדכון של 2024 שומר על אותן שתי תקרות. אלה נתונים שפורסמו, ומובאים כאן לצורך לימוד. המינון לכל אדם נקבע על ידי הרופא המטפל בו. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025,Ozen2017" title="Source 199,200,203,222">199,200,203,222</sup>',
  pt:'לפי ההנחיות שפורסמו, ילדים מתחילים במינון נמוך ומבוגרים במינון מעט גבוה יותר, ולכל קבוצה יש תקרה.',
  hook:'התקרות שכדאי לזכור: <b>2 mg/day בילדים, 3 mg/day במבוגרים</b>. טווח ההתחלה מעל גיל 10 הוא 1.0 עד 1.5 mg/day.'},
 {from:.32,at:.36,k:'שלב 3 · העלאה הדרגתית',t:'עד המינון המרבי הנסבל',
  txt:'אם התקפים או דלקת תת־קלינית נמשכים אצל מטופל שנוטל את הכדורים, הנחיית 2016 מעלה את המינון בצעדים של כ־0.5 mg ביום, ומבקשת CRP או SAA לפחות כל 3 חודשים בזמן העלאת המינון. הקביעות האלה על העלאת המינון עוסקות בהתקפים או בדלקת שנמשכים לאורך זמן, ולא בעצירת התקף שכבר התחיל. קודם בודקים היענות לטיפול, כי במרפאה ישראלית אחת רק 13% מהמטופלים מימשו כל מרשם לאורך שנה, והיענות נמוכה היא סיבה שכיחה לעמידות לכאורה. <sup class="c" data-ref="Ozen2016,Ozen2017,RheumNow2025,BenChetrit2009D" title="Source 14,199,200,222">14,199,200,222</sup>',
  pt:'אם ההתקפים נמשכים, המינון עולה צעד אחר צעד. לפני כן, השאלה הראשונה היא אם הכדורים אכן נלקחים כל יום.',
  hook:'הסדר חשוב: <b>היענות ← מינון מרבי נסבל ← רק אז ״עמיד״</b>.'},
 {from:.48,at:.52,k:'שלב 4 · הגדרה',t:'עמידות, או אי־סבילות',
  txt:'EULAR 2016: מטופל שמקפיד על הטיפול וממשיך לחוות התקף אחד או יותר בחודש, למרות המינון המרבי הנסבל, במשך 6 חודשים לפחות, יכול להיחשב כמי שאינו מגיב. קונצנזוס Delphi מותאם מ־2021 מגדיר עמידות כהתקפים חוזרים בממוצע של אחד לפחות בחודש לאורך 3 חודשים, או דלקת מעבדתית מתמשכת בין התקפים, במינון המרבי הנסבל ועם היענות מאומתת. אי־סבילות היא מצב נפרד, שבו תופעות לוואי מונעות את העלאת המינון; כ־5 עד 10% עמידים, ועוד 2 עד 5% אינם סובלים את התרופה. <sup class="c" data-ref="Ozen2016,Ozen2021,Ozen2017,BenChetrit2018Textbook" title="Source 16,199,200,202">16,199,200,202</sup>',
  pt:'״עמיד״ הוא תווית מוגדרת, לא תחושה. התווית דורשת מספר מינימלי של התקפים, משך זמן מינימלי, את המינון הנסבל הגבוה ביותר והוכחה שהכדורים נלקחו.',
  hook:'2016: <b>≥1 התקף בחודש במשך ≥6 חודשים במינון המרבי הנסבל</b>. Delphi 2021: <b>≥1 בחודש לאורך 3 חודשים, או דלקת מתמשכת בין התקפים</b>.'},
 {from:.64,at:.68,k:'שלב 5 · תוספת',t:'חסימת IL-1, והקולכיצין ממשיך',
  txt:'תרופות ביולוגיות מותוויות במחלה עמידה, והקולכיצין ממשיך לצידן, כי ייתכן שהוא עדיין מוריד את הסיכון לעמילואידוזיס. שלושת חוסמי IL-1 שנחקרו ב־FMF הם אנאקינרה (אנטגוניסט לקולטן של IL-1, ניתן מדי יום), קנאקינומאב (נוגדן נגד IL-1β, כל 4 שבועות) ורילונאספט (״מלכודת״ IL-1, שניתן פעם בשבוע בניסוי שלו). הם אינם ניתנים להחלפה זה בזה: קנאקינומאב הוא היחיד שמינון ל־FMF כתוב בעלון התרופה האמריקאי, ואילו הראיות לאנאקינרה ולרילונאספט ב־FMF נשענות על שני ניסויים אקראיים קטנים, של 25 ושל 14 מטופלים. העדכון של 2024 מציין את התרופות המכוונות ל־IL-1 כתוספת בעלת הראיות החזקות ביותר, ומוסיף קביעות על התאמת המינון של התרופה הביולוגית ועל הפחתה הדרגתית או הפסקה כשמושגת הפוגה. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025,BenZvi2017,DeBenedetti2018,Hashkes2012,IlarisPIG,Sag2025" title="Source 20,44,93,105,199,203,222,229">20,44,93,105,199,203,222,229</sup>',
  pt:'אם ההתקפים ממשיכים במינון הגבוה ביותר, מוסיפים תרופה שחוסמת את האות של IL-1. הקולכיצין לא נפסק.',
  hook:'שלושה חוסמי IL-1, שלושה מקצבים: <b>אנאקינרה מדי יום, קנאקינומאב כל 4 שבועות, רילונאספט פעם בשבוע</b>. כולם תוספת ולא תחליף, והראיות שמאחוריהם אינן שוות.'},
 {from:.82,at:.9,k:'שלב 6 · מעבר לכך',t:'אפשרויות אחרות, ראיות חלשות יותר',
  txt:'טוסיליזומאב חוסם את הקולטן של IL-6. שני הניסויים האקראיים שלו נכשלו: ניסוי גרמני בשלב II עם 25 מטופלים לא עמד במדד התוצאה העיקרי, אף שרמת ה־SAA חזרה לתקין, וגם ניסוי יפני בשלב III לא עמד במדד התוצאה העיקרי (יחס שיעורים 0.691, P=0.577). שיעור ההתקפים החוזרים הנמוך יותר בניסוי הזה (HR 0.457) הוא ממצא משני בניסוי שלא עמד במדד העיקרי שלו, ולכן אף אחד משני הניסויים אינו מוכיח שטוסיליזומאב יעיל ב־FMF. מעכבי TNF שימשו בעיקר במטופלים עמידים לקולכיצין עם מעורבות מפרקים, ורק במחקרים תצפיתיים; דלקת פרקים כרונית פוגעת בכ־5% מהמטופלים, ועשויה לחייב DMARDs, הזרקות למפרק או תרופות ביולוגיות. לגבי מעכבי JAK יש רק סדרות מקרים של ארבעה מטופלים או פחות: ארבעה מטופלים שלא הגיבו לחסימת IL-1, לתרופות נגד TNF ולטוסיליזומאב השתפרו בטיפול בטופסיטיניב, ואין אף ניסוי אקראי של מעכב JAK כלשהו ב־FMF. אין מנגנון מבוסס שמקשר בין האיתות של JAK/STAT להפעלת האינפלמזום של פירין, שהתוצרים שלו הם IL-1β, IL-18 וגזדרמין D, ולכן כל תועלת תצטרך לפעול על הגברה בהמשך המסלול, ולא על הפגם של FMF עצמו. <sup class="c" data-ref="Henes2022,Koga2022,Mertz2025,Ozen2016,Karadeniz2020,Park2016" title="Source 98,119,132,172,199,207">98,119,132,172,199,207</sup>',
  pt:'מעבר לחסימת IL-1 הראיות מידלדלות מהר: סוג תרופות אחד נכשל בשני הניסויים האקראיים שלו, לסוג אחר יש רק תמיכה ממחקרים תצפיתיים, ולשלישי יש רק קומץ מטופלים שדווחו.',
  hook:'טוסיליזומאב: <b>שני הניסויים האקראיים לא עמדו במדדי התוצאה העיקריים</b>; ה־SAA חזר לתקין בניסוי הגרמני. נגד TNF: מפרקים, מחקרים תצפיתיים. מעכבי JAK: <b>סדרות מקרים של ארבעה או פחות, ואין מנגנון במסלול הפירין</b>.'}
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
    s+=`<text x="${L.X0}" y="${topY-10}" class="t-sm" style="fill:var(--sea)">הסלמה ↑</text>`;
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
    s+=`<text x="${L.GR+5}" y="${f1(topY-10)}" class="t-xs t-end" style="fill:var(--crocus)">הקולכיצין ממשיך ↑</text>`;
    s+='</g>';
    // climber
    const pos=clamp((t-.04)/.86)*5, cyC=RY(0)-pos*L.P;
    s+=`<g transform="translate(${L.CLX} ${f1(cyC)})"><circle r="9" style="fill:var(--terra);opacity:.25"/><circle r="5" style="fill:var(--terra)"/></g>`;
    s+=N?`<text transform="rotate(90 ${L.CLX+16} ${f1(cyC)})" x="${L.CLX+16}" y="${f1(cyC)}" class="t-xs t-mid" style="fill:var(--terra)">אתם כאן</text>`
        :`<text x="${L.CLX+14}" y="${f1(cyC+4)}" class="t-xs" style="fill:var(--terra)">אתם כאן</text>`;
    // side lane: during an attack
    const o2=ease(ramp(t,.26,.44));
    s+=`<g style="opacity:${f1(.15+.85*o2)}"><rect x="${L.PX}" y="${L.PY}" width="${L.PW}" height="196" rx="12" style="fill:var(--panel);stroke:var(--terra);stroke-width:1.6"/>`;
    s+=`<text x="${L.PX+14}" y="${L.PY+22}" class="t-sm" style="fill:var(--terra)">${N?'בזמן התקף · מה אומרות 2016 ו־2024':'בזמן התקף · 2016 ו־2024'}</text>`;
    const lines=['להמשיך במינון הקולכיצין הרגיל','NSAIDs להקלה בתסמינים','תמיד לשקול סיבות אחרות,','למשל דלקת תוספתן'];
    lines.forEach((Ln,i)=>{const oo=ease(ramp(t,.28+i*.03,.36+i*.03));
      s+=`<text x="${L.PX+26}" y="${L.PY+48+i*20}" class="t-xs" style="opacity:${f1(oo)};fill:var(--ink)">${Ln}</text>`;
      if(i<3)s+=`<circle cx="${L.PX+16}" cy="${L.PY+44+i*20}" r="2.6" style="fill:var(--terra);opacity:${f1(oo)}"/>`});
    s+=`<line x1="${L.PX+14}" x2="${L.PX+L.PW-14}" y1="${L.PY+138}" y2="${L.PY+138}" class="grid"/>`;
    ['רק 2016: העלאת מינון בשלב הפרודרום','מדווחת אך לא הוכחה. בתקופות לחץ','אפשר לשקול העלאה.']
      .forEach((Ln,i)=>{s+=`<text x="${L.PX+14}" y="${L.PY+156+i*13}" class="t-xs">${Ln}</text>`});
    s+='</g>';
    // target box
    const o3=ease(ramp(t,.55,.72));
    s+=`<g style="opacity:${f1(.12+.88*o3)}"><rect x="${L.QX}" y="${L.QY}" width="${L.QW}" height="136" rx="12" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+22}" class="t-sm" style="fill:var(--sea)">שתי המטרות</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+46}" class="t-lbl">1 · ללא התקפים או מעט מאוד</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+70}" class="t-lbl">2 · דלקת מבוקרת</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+87}" class="t-xs">בין התקפים, לפי SAA או CRP</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+112}" class="t-xs">עדכון 2024: שתי המטרות, כדי</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+125}" class="t-xs">למנוע נזק לאורך החיים</text>`;
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(LD_STEPS,t);setSt(p);
    $('#ldNote').innerHTML=noteHTML(LD_STEPS[p]);
    $('#ldCap').textContent=`שלב ${p+1} מתוך 6 מואר. לחצו על שלב כלשהו כדי לעבור אליו. סכמטי, לא בקנה מידה.`;
  }
  const stop=playWire(rg,$('#ldPlay'),draw,17000,'הפעלה חוזרת','ladder');
  const setSt=stepWire($('#ldSteps'),LD_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-rung]');if(!g)return;stop();const a=LD_STEPS[+g.dataset.rung].at;rg.value=a;draw(a)});
  draw(+rg.value);

  /* ---- trial bars ---- */
  const bs=$('#ldBars'),br=$('#ldB');
  const LD_PCT=[
   {l:'CLUSTER',s2:'crFMF 150 mg',a:61,p:6},
   {l:'CLUSTER',s2:'MKD / HIDS',a:35,p:6},
   {l:'CLUSTER',s2:'TRAPS',a:45,p:8},
   {l:'מינון מוגבר',s2:'crFMF 300 mg',a:71,p:null},
   {l:'כל 8 שבועות',s2:'נשארו בשליטה',a:46,p:null}
  ];
  const LD_ATT=[
   {l:'ניסוי אנאקינרה',s2:'n=25, התקפים לחודש',a:1.7,p:3.5,ad:'1.7',pd:'3.5'},
   {l:'רילונאספט',s2:'n=14, חציון לחודש',a:0.77,p:2.00,ad:'0.77',pd:'2.00'}
  ];
  const LD_CAVA='63 מטופלי FMF, הוקצו באקראי בזמן התלקחות · מדד התוצאה: חלוף ההתלקחות בלי התלקחות חדשה עד שבוע 16';
  const LD_CAVB='לשתי העמודות האחרונות אין השוואה לפלצבו: העלאה ל־300 mg, ומתן מורחב כל 8 שבועות';
  const LD_COCH='ניתוח חוזר של Cochrane, ודאות בינונית: אין הבדל ברור במספר המטופלים שהיו להם התקפים באנאקינרה (RR 0.76, 0.54–1.07) או ברילונאספט (RR 0.87, 0.59–1.26). רק קנאקינומאב הגיע ל־RR 0.41 (0.26–0.65).';
  const LD_TOCI=[['שלב II (n=25): לא עמד במדד','ink'],['העיקרי, אבל ה־SAA חזר לתקין','ink'],['שלב III: גם הוא לא עמד (RR 0.691,',''],['P=0.577); לא הוכחה יעילות','']];
  /* narrow: the grouped vertical bars become horizontal bars, one trial per block,
     each trial's name on its own line above its bars, so nothing is squeezed */
  function drawBN(t){
    const BX0=14,BX1=316,pw=BX1-BX0;let s='';
    s+=`<text x="14" y="24" class="t-sm" style="fill:var(--sea)">קנאקינומאב ב־CLUSTER</text>`;
    s+=`<text x="14" y="38" class="t-xs">תגובה מלאה בשבוע 16 לעומת פלצבו</text>`;
    const pairsOf=g=>g.p==null?[[g.a,'var(--sea)','']]:[[g.p,'var(--muted)','פלצבו'],[g.a,'var(--sea)','תרופה']];
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
    s+=`<text x="14" y="${y}" class="t-sm" style="fill:var(--terra)">התקפים לחודש · נמוך יותר עדיף</text>`;y+=14;
    s+=`<text x="14" y="${y}" class="t-xs">כפי שכל ניסוי דיווח</text>`;y+=14;
    const bTop=y, bBot=bTop+LD_ATT.length*62-10;
    [0,1,2,3,4].forEach(v=>{const x=lerp(BX0,BX1,v/4);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${bTop}" y2="${bBot}" class="grid"/><text x="${f1(x)}" y="${bBot+16}" class="t-xs t-mid">${v}</text>`});
    LD_ATT.forEach((g,i)=>{const k=ease(ramp(t,.4+i*.12,.86+i*.12)),yy=bTop+i*62;
      s+=`<text x="14" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${g.l} · ${g.s2}</text>`;
      [[g.p,'var(--muted)',g.pd,'פלצבו'],[g.a,'var(--sea)',g.ad,'תרופה']].forEach((pr,j)=>{const by=yy+16+j*18,w=pw*pr[0]/4*k;
        s+=`<rect x="${BX0}" y="${by}" width="${f1(w)}" height="14" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(BX0+w+6)}" y="${by+11}" class="t-xs" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[2]} ${pr[3]}</text>`});});
    // tocilizumab box
    y=bBot+34;
    const o=ease(ramp(t,.75,1));
    s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="14" y="${y}" width="372" height="92" rx="11" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6"/>`;
    s+=`<text x="28" y="${y+22}" class="t-sm" style="fill:var(--warn)">טוסיליזומאב · הקולטן של IL-6</text>`;
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
    s+=`<text x="14" y="34" class="t-sm" style="fill:var(--sea)">קנאקינומאב ב־CLUSTER · תגובה מלאה בשבוע 16 לעומת פלצבו</text>`;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${AX0}" x2="${AX1}" y1="${f1(pc(v))}" y2="${f1(pc(v))}" class="grid"/><text x="${AX0-8}" y="${f1(pc(v)+3)}" class="t-xs t-end">${v}%</text>`});
    s+=`<line x1="${AX0}" x2="${AX1}" y1="${AY}" y2="${AY}" class="axis"/>`;
    const gw=(AX1-AX0)/LD_PCT.length;
    LD_PCT.forEach((g,i)=>{const cx=AX0+gw*(i+.5),k=ease(ramp(t,i*.1,i*.1+.42));
      const bw=28,pairs=g.p==null?[[g.a,'var(--sea)','']]:[[g.p,'var(--muted)','פלצבו'],[g.a,'var(--sea)','תרופה']];
      pairs.forEach((pr,j)=>{const n=pairs.length,x=cx-(n*bw+8*(n-1))/2+j*(bw+8),h=(AY-ATOP)*pr[0]/100*k;
        s+=`<rect x="${f1(x)}" y="${f1(AY-h)}" width="${bw}" height="${f1(h)}" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(x+bw/2)}" y="${f1(AY-h-6)}" class="t-xs t-mid" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[0]}%</text>`});
      s+=`<text x="${f1(cx)}" y="${AY+18}" class="t-xs t-mid" style="fill:var(--ink)">${g.l}</text>`;
      s+=`<text x="${f1(cx)}" y="${AY+31}" class="t-xs t-mid">${g.s2}</text>`});
    s+=`<text x="${AX0}" y="${AY+44}" class="t-xs">63 מטופלי FMF, הוקצו באקראי בזמן התלקחות · מדד התוצאה: חלוף ההתלקחות בלי התלקחות חדשה עד שבוע 16</text>`;
    s+=`<text x="${AX0}" y="${AY+56}" class="t-xs">לשתי העמודות האחרונות אין השוואה לפלצבו: העלאה ל־300 mg, ומתן מורחב כל 8 שבועות</text>`;
    // panel B
    const BX0=118,BX1=404,BY=372,BTOP=286,at=v=>BY-(BY-BTOP)*v/4;
    s+=`<text x="14" y="276" class="t-sm" style="fill:var(--terra)">התקפים לחודש · כפי שכל ניסוי דיווח (נמוך יותר עדיף)</text>`;
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
    s+=`<text x="454" y="304" class="t-sm" style="fill:var(--warn)">טוסיליזומאב · הקולטן של IL-6</text>`;
    s+=`<text x="454" y="326" class="t-xs" style="fill:var(--ink)">שלב II (n=25): לא עמד במדד</text>`;
    s+=`<text x="454" y="339" class="t-xs" style="fill:var(--ink)">העיקרי, אבל ה־SAA חזר לתקין</text>`;
    s+=`<text x="454" y="357" class="t-xs">שלב III: גם הוא לא עמד (RR 0.691,</text>`;
    s+=`<text x="454" y="370" class="t-xs">P=0.577); לא הוכחה יעילות</text>`;
    s+='</g>';
    // Cochrane caveat, on the face of the chart
    s+=`<line x1="14" x2="706" y1="412" y2="412" class="grid"/>`;
    s+=`<text x="14" y="430" class="t-xs" style="fill:var(--warn)">ניתוח חוזר של Cochrane, ודאות בינונית: אין הבדל ברור במספר המטופלים שהיו להם התקפים</text>`;
    s+=`<text x="14" y="444" class="t-xs" style="fill:var(--warn)">באנאקינרה (RR 0.76, 0.54–1.07) או ברילונאספט (RR 0.87, 0.59–1.26). רק קנאקינומאב הגיע ל־RR 0.41 (0.26–0.65).</text>`;
    bs.innerHTML=s;
  }
  playWire(br,$('#ldBPlay'),drawB,9000,'הפעלה חוזרת','ladder');drawB(+br.value);

  $('#ldCards').innerHTML=`
   <div class="card"><h4>2016 לעומת העדכון של 2024</h4><ul>
     <li>פחות קביעות, מאוחדות יותר: <b>12 המלצות במקום 18</b>, ועוד 4 עקרונות־על, עם הסכמה של יותר מ־9/10 על כל קביעה.</li>
     <li>משקל רב יותר ל<b>היענות לטיפול</b>, שעומדת בלב הטיפול המונע לכל החיים.</li>
     <li>קביעה חדשה על <b>מנת יתר של קולכיצין</b>, מכוונת או בשוגג, שעלולה להיות קטלנית ויש להעריך אותה בזהירות.</li>
     <li>קביעות חדשות על <b>התאמת המינונים של התרופות הביולוגיות והפחתתם ההדרגתית</b> לאחר השגת הפוגה.</li>
     <li><b>מערך תוצאות מינימלי</b>: תדירות ההתקפים לכל 3 חודשים, הערכת רופא, מדדי תוצאה וחוויה המדווחים על ידי המטופל, ו־CRP או SAA, וכן מדדי איכות.</li>
     <li>לא נקבע מרווח קבוע למעקב; יש לעקוב בתדירות גבוהה יותר בזמן האבחנה וכשהמחלה אינה מאוזנת. <sup class="c" data-ref="Ozen2025,RheumNow2025,Ozen2016" title="Source 199,203,222">199,203,222</sup></li></ul></div>
   <div class="card"><h4>איך נבנה CLUSTER</h4><p>ניסוי אקראי בשלב 3 שבחן שלוש מחלות בבת אחת: FMF עמיד לקולכיצין, חסר במבלונאט קינאז (MKD) ו־TRAPS. המטופלים הוקצו באקראי, בזמן התלקחות, לקנאקינומאב 150 mg בהזרקה תת־עורית כל 4 שבועות או לפלצבו. מדד התוצאה העיקרי היה חלוף ההתלקחות הזו בלי התלקחות חדשה עד שבוע 16. בקבוצת ה־FMF היו 63 משתתפים. הרחבה פתוחה (open-label) של 72 שבועות הראתה שליטה מתמשכת בהתלקחויות, עם CRP ו־SAA שחזרו לתקין. זהו דיכוי עמיד ולא ריפוי: ההתקפים חוזרים כשהתרופה מופסקת. <sup class="c" data-ref="DeBenedetti2018,Yin2022,Ozen2020" title="Source 44,201,283">44,201,283</sup></p></div>
   <div class="card"><h4>המינון בעלון של קנאקינומאב</h4><p>עלון התרופה האמריקאי מציין 150 mg כל 4 שבועות למטופלי FMF במשקל מעל 40 kg, או 2 mg/kg במשקל 40 kg ומטה, עם אפשרות להעלות ל־300 mg (4 mg/kg) אם התגובה אינה מספקת. ב־CLUSTER, 71% מהמטופלים עם FMF עמיד לקולכיצין הגיבו ל־300 mg כל 4 שבועות, ו־46% נשארו בשליטה כשהמרווח בין המנות הוארך לכל 8 שבועות. הנתונים מובאים כאן כנתוני עלון וניסוי שפורסמו, לא כמינון לאדם כלשהו: המינון לכל אדם נקבע על ידי הרופא המטפל בו. <sup class="c" data-ref="IlarisPIG,DeBenedetti2018" title="Source 44,105">44,105</sup></p></div>
   <div class="card"><h4>הקולכיצין לא נפסק</h4><p>כשמוסיפים תרופה ביולוגית, ההנחיות ממשיכות את הקולכיצין לצידה, כי לקולכיצין יש את נתוני התוצאה הקשים לטווח ארוך על מניעת עמילואידוזיס מסוג AA: שיעור מצטבר של חלבון בשתן (פרוטאינוריה) של 1.7% אחרי 11 שנים במטופלים שהקפידו על הטיפול, לעומת 48.9% אחרי 9 שנים במי שלא הקפידו, בקרב 1,070 מטופלים. חוסמי IL-1 שולטים בהתקפים ובסמני השלב החריף; אין להם נתוני תוצאה דומים על עמילואיד לאורך עשורים. <sup class="c" data-ref="Ozen2016,Zemer1986,Sag2025" title="Source 199,229,286">199,229,286</sup></p>
     <div class="pt"><b>במילים פשוטות</b>הזריקה החדשה מתווספת לכדור הישן. היא לא מחליפה אותו.</div></div>
   <div class="card"><span class="ev early">בדיקת ראיות</span><h4>מה הסיקה סקירת Cochrane</h4><p>בניתוח חוזר של הניסויים האקראיים, Cochrane דירגה את הראיות לכל חוסם IL-1 כוודאות בינונית. קנאקינומאב הפחית את מספר המטופלים שהיו להם התקפים (RR 0.41, רווח סמך 95% 0.26–0.65, 63 משתתפים). באנאקינרה (RR 0.76, 0.54–1.07) וברילונאספט (RR 0.87, 0.59–1.26) רווחי הסמך חצו את 1, ולכן במדד הזה הסקירה לא מצאה הבדל ברור מפלצבו, אף שאנאקינרה כן הורידה את ה־CRP. הניסויים עצמם עדיין דיווחו על פחות התקפים תחת התרופה; העמודות למעלה הן נתוני הניסויים האלה, והניתוח החוזר הזה הוא הקריאה הזהירה יותר של אותם נתונים. הניסויים קטנים, והסוקרים ביקשו מחקרים נוספים. <sup class="c" data-ref="Yin2022" title="Source 283">283</sup></p></div>
   <div class="card"><h4>אי־סבילות אינה עמידות</h4><p>עמידות פירושה שהתקפים או דלקת נמשכים במינון המרבי הנסבל. אי־סבילות פירושה שתופעות לוואי, לרוב שלשולים ותסמינים אחרים של מערכת העיכול, מונעות מהמינון להגיע לנקודה הזו. כ־5 עד 10% מהמטופלים מתוארים כעמידים, ועוד 2 עד 5% כבעלי אי־סבילות; שתי הקבוצות הן האוכלוסייה שכל ניסוי בתרופה ביולוגית מגייס. <sup class="c" data-ref="Ozen2021,Ozen2017,BenChetrit2018Textbook" title="Source 16,200,202">16,200,202</sup></p></div>
   <div class="card"><h4>מה כל ניסוי ספר כהצלחה</h4><p>ניסויים שונים השתמשו בקני מידה שונים, ולכן אי אפשר להשוות את העמודות למעלה בין קבוצות. CLUSTER השתמש בתגובה מלאה בשבוע 16. ניסוי האנאקינרה ספר התקפים לחודש (1.7 לעומת 3.5, P=0.037) וכמה מטופלים ירדו מתחת להתקף אחד בחודש (6 מתוך 12 לעומת 0 מתוך 13). ניסוי הרילונאספט השווה את שיעורי ההתקפים החציוניים אצל אותם מטופלים, עם התרופה ובלעדיה (0.77 לעומת 2.00, P=0.027), ו־29% לעומת 0% ממחזורי הטיפול עברו ללא התקפים. סקירה שיטתית מ־2025 של 42 מחקרים ו־1,798 מטופלים, כולל 6 ניסויים אקראיים של חוסמי IL-1, הסיקה שהם יעילים ובטוחים יחסית ב־FMF שאינו מגיב לקולכיצין. <sup class="c" data-ref="DeBenedetti2018,BenZvi2017,Hashkes2012,Hashkes2014,Sag2025" title="Source 20,44,93,94,229">20,44,93,94,229</sup></p></div>`;
};
/* =============== 4.2 living with FMF =============== */
const LV_STEPS=[
 {from:0,at:.02,k:'חודשים 1–3',t:'השנה הראשונה היא הצפופה',
  txt:'EULAR 2016 מבקשת לבחון את התגובה, הרעילות וההיענות כל 6 חודשים, בתדירות גבוהה יותר בשנה הראשונה או בכל פעם שסמני השלב החריף מוגברים, ופעם בשנה כשהמצב יציב. היא גם קובעת בדיקת שתן בכל ביקור במרפאה, במיוחד כדי לזהות חלבון בשתן (פרוטאינוריה) מוקדם. העדכון של 2024 אינו קובע מרווח קבוע, ומבקש מעקב תכוף יותר בזמן האבחנה וכל עוד המחלה אינה מאוזנת. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025" title="Source 199,203,222">199,203,222</sup>',
  pt:'בשנה הראשונה הביקורים צפופים יותר, ואחר כך הם מתייצבים בקצב קבוע כשהמחלה שקטה.',
  hook:'בדיקת שתן <b>בכל ביקור</b>. זו האזהרה המוקדמת הזולה ביותר למחלת כליות עמילואידית.'},
 {from:.25,at:.3,k:'חודשים 4–6',t:'הבדיקה של חצי השנה',
  txt:'הבדיקות שמפורטות ב־2016 הן SAA ו/או CRP, ספירת דם, אנזימי כבד, תפקודי כליה, CPK ובדיקת שתן לחלבון בשתן. ההנחיה קובעת שמינון הקולכיצין מופחת אם אנזימי הכבד עולים מעל פי שניים מהגבול העליון של הנורמה. היא גם קובעת שיש לשתף את המטופל בערכי SAA גבוהים, כדרך מכוונת לתמוך בהיענות לטיפול. היעד המספרי היחיד ל־SAA ב־2016, מתחת ל־10 mg/L, נכתב למטופלים שכבר יש להם עמילואידוזיס מסוג AA. מחוץ למצב הזה לא נקבע סף: המטרה הכוללת של 2024 היא פעילות קלינית מינימלית או אפסית, יחד עם שליטה בדלקת התת־קלינית. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025" title="Source 199,203,222">199,203,222</sup>',
  pt:'הבדיקה של חצי שנה בוחנת דלקת, ספירות דם, כבד, כליות, אנזים שריר ושתן.',
  hook:'בעמילואידוזיס מסוג AA, היעד של 2016 הוא <b>SAA מתחת ל־10 mg/L</b>, עם CRP כתחליף לא מושלם כשאין SAA זמין. מחוץ לעמילואידוזיס ההנחיות אינן נוקבות במספר, אלא רק ב״מבוקרת״.'},
 {from:.5,at:.55,k:'חודשים 7–9',t:'החיים לא עוצרים בשביל לוח הזמנים',
  txt:'ההנחיות מתייחסות להיריון, לניתוח ולחיסונים כחלק מהטיפול הרגיל ב־FMF, ולא כחריגים. הקולכיצין נמשך לאורך ההתעברות, ההיריון וההנקה. עומס גופני וטראומה מופיעים ברשימת הגורמים המעוררים התקפים, וכליות עם עמילואידוזיס מתוארות כרגישות במיוחד לזרימת דם נמוכה, ללחץ דם גבוה ולתרופות רעילות לכליה. השתמשו במתגים למעלה כדי להכניס את המצבים האלה לשנה. <sup class="c" data-ref="Ozen2016,Ozen2025" title="Source 199,203">199,203</sup>',
  pt:'היריון, ניתוחים וחיסונים עולים כולם, וההנחיות שפורסמו מתייחסות לכל אחד מהם.',
  hook:'הקולכיצין <b>ממשיך</b> בהיריון ובהנקה, והשימוש בו לבדו אינו מצדיק בדיקת מי שפיר.'},
 {from:.75,at:.88,k:'חודשים 10–12',t:'התמונה השנתית',
  txt:'כשהמצב יציב, 2016 מתארת בדיקה שנתית. העדכון של 2024 בונה את השנה סביב מערך תוצאות מינימלי: תדירות ההתקפים לכל 3 חודשים, הערכת רופא, מדדי תוצאה וחוויה המדווחים על ידי המטופל, ו־CRP או SAA. המטרה הכוללת שהוא מציין היא פעילות קלינית מינימלית או אפסית, לצד שליטה בדלקת התת־קלינית, לכל החיים, כשההיענות לטיפול במרכז. <sup class="c" data-ref="Ozen2016,Ozen2025,RheumNow2025" title="Source 199,203,222">199,203,222</sup>',
  pt:'לאורך שנה שלמה השאלות פשוטות: כמה התקפים היו, איך הם נראו, והאם סמני הדלקת נשארו תקינים ביניהם.',
  hook:'מערך התוצאות המינימלי של 2024: <b>התקפים לכל 3 חודשים, הערכת רופא, PROMs/PREMs, CRP או SAA</b>.'}
];
const LV_MON=`<div class="kv"><div><dt>מה כוללת בדיקה שגרתית</dt><dd>SAA ו/או CRP, ספירת דם, אנזימי כבד, תפקודי כליה, CPK ובדיקת שתן לחלבון בשתן, עם בדיקת שתן בכל ביקור. לפי 2016 נבחנים כל 6 חודשים, בתדירות גבוהה יותר בשנה הראשונה או כשהסמנים מוגברים, ופעם בשנה כשהמצב יציב. <sup class="c" data-ref="Ozen2016,Ozen2025" title="Source 199,203">199,203</sup></dd></div></div>`;
const LV_EV=[
 {m:.3,key:0,t:'ביקור פתיחה',c:'var(--sea)',d:LV_MON},
 {m:2,key:'preg',t:'תחילת היריון',c:'var(--crocus)',
  d:`<div class="kv"><div><dt>היריון</dt><dd>אין להפסיק קולכיצין במהלך ההתעברות, ההיריון או ההנקה, והשימוש בקולכיצין לבדו אינו מצדיק בדיקת מי שפיר. כך נקבע ב־2016, וכך חזר ב־2024. במחקר של 179 הריונות שטופלו בקולכיצין, 197 הריונות FMF שלא טופלו ו־312 הריונות בקבוצת הביקורת, שיעורי ההפלות המוקדמות והמאוחרות ושיעורי המומים המולדים לא היו שונים בין הקבוצות. מטא־אנליזה מ־2024 של 1,242 הריונות עם FMF מצאה סיכון גבוה יותר ללידה מוקדמת (OR 1.67, רווח סמך 95% 1.05–2.67), אבל לא עלייה מובהקת בהגבלת גדילה תוך־רחמית או ביתר לחץ דם בהיריון. <sup class="c" data-ref="Ozen2016,Ozen2025,BenChetrit2010,Hirahara2024" title="Source 15,99,199,203">15,99,199,203</sup></dd></div></div>`},
 {m:3,key:0,t:'בדיקת השנה הראשונה',c:'var(--sea)',d:LV_MON},
 {m:3.6,key:'trav',t:'נסיעה ועמידה ממושכות',c:'var(--terra)',
  d:`<div class="kv"><div><dt>נסיעות וזמן על הרגליים</dt><dd>בקרב 275 מטופלים, התקפים של מערכת השריר והשלד נקשרו לעמידה ממושכת (78.8%) ולנסיעה ארוכה (64.1%), ועייפות הייתה במקום השלישי (47.8%). כאב רגליים במאמץ הופיע ב־22.1% מתוך 3,454 ילדים בקבוצת הילדים הגדולה ביותר, וב־30.2% מההומוזיגוטים ל־M694V (P&lt;0.001); EULAR 2016 מציעה לו NSAIDs. מיאלגיה ממושכת עם חום (protracted febrile myalgia), בעיה נפרדת וקשה יותר, הופיעה ב־1.6%. <sup class="c" data-ref="Karadag2013,Ozturk2022,Ozen2016" title="Source 118,199,205">118,199,205</sup></dd></div></div>`},
 {m:5,key:'exam',t:'מבחנים, לחץ גבוה',c:'var(--terra)',
  d:`<div class="kv"><div><dt>לחץ</dt><dd>לחץ הוא הגורם המעורר שמאחוריו הראיות הטובות ביותר. במחקר case-crossover של 104 מטופלים ארמנים, כל אירוע מלחיץ נוסף העלה את הסיכוי להתקף כעבור יומיים בכ־70% (OR 1.7, רווח סמך 95% 1.04–2.79), וגם לחץ נתפס גבוה ניבא התקפים; אותו מחקר לא מצא עלייה בסיכוי אחרי פעילות גופנית מאומצת או ארוחות עתירות שומן. בקרב 882 מטופלים, לחץ נפשי היה הגורם המעורר שצוין בתדירות הגבוהה ביותר, 75.2%. EULAR 2016 מציינת, ברמת ראיות נמוכה, שאפשר לשקול העלאה זמנית של הקולכיצין בתקופות של לחץ גופני או רגשי. <sup class="c" data-ref="Yenokyan2012,Parlar2024,Ozen2016" title="Source 199,209,279">199,209,279</sup></dd></div></div>`},
 {m:6,key:0,t:'בדיקות חצי השנה',c:'var(--sea)',d:LV_MON},
 {m:7,key:'surg',t:'ניתוח מתוכנן',c:'var(--warn)',
  d:`<div class="kv"><div><dt>ניתוח</dt><dd>לא נמצאו מחקרים ייעודיים על קולכיצין סביב ניתוח ב־FMF, ולכן ההנחיות עקיפות. EULAR 2016 מונה עומס גופני וטראומה בין הגורמים המעוררים התקפים, וממליצה להימנע ככל האפשר מניתוח ומירידה בזרימת הדם לרקמות (היפופרפוזיה) אצל מטופלים עם כליות עמילואידיות, שרגישות במיוחד לזרימת דם נמוכה, ללחץ דם גבוה ולתרופות רעילות לכליה. בקבוצה של 971 מבוגרים, 24.7% עברו כריתת תוספתן; למטופלים האלה היו יותר התקפים של דלקת הצפק (פריטוניטיס), יותר עמידות לקולכיצין (15% לעומת 6.7%), והם נזקקו למינוני קולכיצין גבוהים יותר. <sup class="c" data-ref="Ozen2016,Bodakci2021" title="Source 23,199">23,199</sup></dd></div></div>`},
 {m:9,key:0,t:'בדיקת השנה הראשונה',c:'var(--sea)',d:LV_MON},
 {m:9.4,key:'vacc',t:'חיסון בטיפול ביולוגי',c:'var(--gold)',
  d:`<div class="kv"><div><dt>חיסונים בזמן חסימת IL-1</dt><dd>המלצות EULAR לחיסונים מ־2019 קובעות שאפשר לתת חיסונים שאינם חיים בכל טיפול, ואילו חיסונים חיים מוחלשים אפשר לשקול בזהירות במטופלים עם דיכוי חיסוני, רצוי כשהמחלה שקטה ובאופן אידיאלי לפני תחילת הדיכוי החיסוני. עלון קנאקינומאב ממליץ להימנע מחיסונים חיים במהלך הטיפול, ולהשלים את החיסונים לפני תחילתו. סקר בינלאומי של 17 מטופלים שקיבלו חיסונים חיים מוחלשים בזמן חסימת IL-1 או IL-6 תיעד 3 תופעות לוואי, 2 מהן חמורות (זיהום בנגיף varicella-zoster אחרי מנת דחף של VZV, ודלקת ריאות אחרי מנת דחף של MMR), ו־7 התלקחויות, רובן קלות; המחברים לא ראו בממצאים האלה סיבה לשנות את ההנחיות. <sup class="c" data-ref="Furer2020,IlarisPIG,Jeyaratnam2018" title="Source 73,105,114">73,105,114</sup></dd></div></div>`},
 {m:11,key:'preg',t:'לידה',c:'var(--crocus)',
  d:`<div class="kv"><div><dt>לידה, וההורה השני</dt><dd>האות שעולה מהמטא־אנליזה על היריון עם FMF הוא לידה מוקדמת (OR 1.67), לא מומים. מצד האב, גברים בדרך כלל אינם צריכים להפסיק קולכיצין לפני ההתעברות, אזוספרמיה שהוכח שנגרמה מקולכיצין היא נדירה, ולבנות הזוג של גברים שטופלו בקולכיצין לא היו יותר הפלות או מומים מאשר בקבוצת הביקורת. במחקר ארמני, אי־פוריות ב־FMF הלכה יחד עם מחלה קשה יותר ועם טיפול לא מספק בקולכיצין, ולא עם התרופה. עמילואידוזיס של האשכים היא סיבה מוכרת לאזוספרמיה, וכדאי לשקול אותה לפני שתולים את האשמה בקולכיצין. <sup class="c" data-ref="Hirahara2024,Ozen2016,BenChetrit2004,Sotskiy2021" title="Source 12,99,199,249">12,99,199,249</sup></dd></div></div>`},
 {m:11.8,key:0,t:'סקירה שנתית',c:'var(--sea)',d:LV_MON}
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
        s+=`<text x="182" y="17" class="t-xs" style="fill:var(--crocus)">היריון</text>`}}
      else{const am=ang(lerp(2,Math.min(mNow,11),.5)),ar=R+28;
        s+=`<text x="${f1(CX+Math.cos(am)*ar)}" y="${f1(CY+Math.sin(am)*ar)}" class="t-xs t-mid" style="fill:var(--crocus)">${mNow>2?'היריון':''}</text>`}}
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
    s+=`<text x="${CX}" y="${CY-8}" class="t-sm t-mid">חודש</text>`;
    s+=`<text x="${CX}" y="${CY+22}" class="t-big t-mid" style="font-size:28px">${(mNow+.0001).toFixed(1)}</text>`;
    s+=`<text x="${CX}" y="${CY+42}" class="t-xs t-mid">${E.filter(e=>mNow>=e.m).length} מתוך ${E.length} אירועים חלפו</text>`;
    // the event list: beside the ring when wide, under it when narrow
    s+=`<text x="${LHX}" y="${LHD}" class="t-sm" style="fill:var(--sea)">השנה הזו, לפי הסדר</text>`;
    E.forEach((e,i)=>{const y=LY+i*LST,hit=mNow>=e.m,now=i===curI;
      if(N&&now)s+=`<rect x="${LX-6}" y="${y-18}" width="${LRX-LX+12}" height="24" rx="7" style="fill:${e.c};opacity:.14"/>`;
      if(N)s+=`<text x="${LX+10}" y="${y}" class="t-xs t-end" style="fill:${hit?e.c:'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<circle cx="${N?LX+24:LX+10}" cy="${y-4}" r="${now&&N?6:5}" style="fill:${hit?e.c:'var(--panel)'};stroke:${e.c};stroke-width:1.8"/>`;
      s+=`<text x="${LTX}" y="${y}" class="t-lbl" style="fill:${hit?'var(--ink)':'var(--muted)'};font-size:12.5px">${e.t}</text>`;
      s+=`<text x="${LRX}" y="${y}" class="t-xs t-end">חודש ${e.m.toFixed(1)}</text>`});
    if(E.length<7)s+=`<text x="${LTX}" y="${LY+E.length*LST+16}" class="t-xs">הוסיפו עוד בעזרת המתגים</text>`;
    svg.innerHTML=s;
    const p=phaseOf(LV_STEPS,t);setSt(p);
    const past=E.filter(e=>mNow>=e.m);const last=past[past.length-1];
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[p])+(last?last.d:'');
    $('#lvCap').textContent=`חודש ${(mNow).toFixed(1)} מתוך 12 · ${past.length} אירועים חלפו${last?' · האחרון: '+last.t:''}. שנה סכמטית; המרווחים לפי ההנחיות שפורסמו, לא לפי מרפאה מסוימת.`;
  }
  const stop=playWire(rg,$('#lvPlay'),draw,18000,'הפעלה חוזרת','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  [['lvPreg','preg'],['lvSurg','surg'],['lvVacc','vacc'],['lvExam','exam'],['lvTrav','trav']].forEach(([id,k])=>{
    const b=$('#'+id);b.onclick=()=>{on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);draw(+rg.value)}});
  draw(+rg.value);

  /* ---- trigger evidence ---- */
  const ts=$('#lvTrig'),tr=$('#lvTR');
  const LV_TRIG=[
   {h:'גורמים מעוררים שדווחו להתקפי סרוזיטיס · 275 מטופלים',y:46},
   {l:'חשיפה לקור',v:59.3,y:66},
   {l:'לחץ רגשי',v:49.8,y:94},
   {l:'עייפות',v:40.0,y:122},
   {l:'וסת (מבין הנשים)',v:33.7,y:150},
   {h:'גורמים מעוררים שדווחו להתקפי שריר ושלד · אותו מחקר',y:192},
   {l:'עמידה ממושכת',v:78.8,y:212},
   {l:'נסיעה ארוכה',v:64.1,y:240},
   {h:'מחקר השאלונים הגדול ביותר · 882 מטופלים',y:282},
   {l:'לחץ נפשי',v:75.2,y:302}
  ];
  const LV_TRIGN=['גורמים מעוררים שדווחו · סרוזיטיס · 275 מטופלים','התקפי שריר ושלד · אותו מחקר','מחקר השאלונים הגדול ביותר · 882 מטופלים'];
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
    s+=`<g style="opacity:${f1(.12+.88*o)}"><text x="14" y="${y}" class="t-sm" style="fill:var(--sea)">מחקר case-crossover · 104 מטופלים, כל אחד מול עצמו</text>`;y+=10;
    const chips=[[['כל אירוע מלחיץ נוסף: הסיכוי להתקף','כעבור 2 ימים עולה בכ־70%'],'var(--sea)','var(--sea-soft)'],
                 [['פעילות גופנית מאומצת: אין עלייה בסיכוי'],'var(--good)','var(--good-soft)'],
                 [['ארוחות עתירות שומן: אין עלייה בסיכוי'],'var(--good)','var(--good-soft)']];
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
    s+=`<g style="opacity:${f1(.12+.88*o)}"><text x="14" y="358" class="t-sm" style="fill:var(--sea)">מחקר case-crossover · 104 מטופלים, כל אחד בהשוואה לעצמו</text>`;
    const chips=[['כל אירוע מלחיץ נוסף: הסיכוי להתקף כעבור 2 ימים עולה בכ־70%','var(--sea)','var(--sea-soft)'],
                 ['פעילות גופנית מאומצת: אין עלייה בסיכוי','var(--good)','var(--good-soft)'],
                 ['ארוחות עתירות שומן: אין עלייה בסיכוי','var(--good)','var(--good-soft)']];
    chips.forEach((c,i)=>{const y=i===0?368:394,x=i===2?372:14,w=i===0?690:348;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="20" rx="6" style="fill:${c[2]};stroke:${c[1]}"/>`;
      s+=`<text x="${x+10}" y="${y+14}" class="t-xs" style="fill:${c[1]}">${c[0]}</text>`});
    s+='</g>';
    ts.innerHTML=s;
  }
  playWire(tr,$('#lvTPlay'),drawT,9000,'הפעלה חוזרת','living');drawT(+tr.value);

  /* ---- quality of life ---- */
  const qs=$('#lvQol'),qr=$('#lvQ');
  /* a room of twenty figures per row: the published percentage is the shaded share
     of the row, and the figure itself is still printed beside it */
  const LV_Q=[
   {l:'זמן עבודה שהוחמץ · היעדרות · 111 מבוגרים',a:9.3,p:0.7},
   {l:'תפוקה שאבדה בזמן העבודה · פרזנטיזם · אותו מחקר',a:35.2,p:9.6},
   {l:'דיכאון מאובחן · 7,670 מטופלים לעומת ביקורת מותאמת',n:'דיכאון מאובחן · 7,670 לעומת ביקורת מותאמת',a:6.22,p:4.58},
   {l:'חרדה מאובחנת · אותו מאגר נתונים',a:4.93,p:3.14}
  ];
  const person=(x,y,fill,stroke)=>`<g transform="translate(${f1(x)} ${f1(y)})"><circle cx="0" cy="-17" r="3.6" style="fill:${fill};stroke:${stroke};stroke-width:1.1"/><path d="M-4.6 0V-8q0 -5 4.6 -5q4.6 0 4.6 5V0z" style="fill:${fill};stroke:${stroke};stroke-width:1.1;stroke-linejoin:round"/></g>`;
  const LV_SCH=['בית ספר: ל־129 מתבגרים עם FMF היו ממוצע ציונים נמוך יותר וציוני תפקוד','בבית הספר נמוכים יותר מאשר בקבוצת הביקורת (P=0.001). לא דווח אחוז.'];
  const LV_SCHN=['בית ספר: ל־129 מתבגרים עם FMF היו ממוצע ציונים','וציוני תפקוד בבית הספר נמוכים יותר מאשר בקבוצת','הביקורת (P=0.001). לא דווח אחוז.'];
  function drawQ(t){
    const N=vb(qs,'720 440','400 492');
    const L=N?{FX:14,PT:15,Y0:60,BP:92,R1:38,R2:72,VX:316,NM:0,SY:424,SH:60,SL:LV_SCHN}
             :{FX:176,PT:19,Y0:46,BP:88,R1:36,R2:70,VX:556,NM:168,SY:396,SH:44,SL:LV_SCH};
    const wtot=19*L.PT+9.2;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="22" class="t-sm" style="fill:var(--terra)">עבודה ומצב רוח · FMF לעומת ביקורת מותאמת</text>`;
    s+=N?`<text x="14" y="36" class="t-xs">כל שורה של 20 דמויות = 100%, מוצללת לפי האחוז</text>`
        :`<text x="706" y="22" class="t-xs t-end">כל שורה של 20 דמויות = 100%; החלק המוצלל הוא האחוז שפורסם</text>`;
    LV_Q.forEach((g,i)=>{const y0=L.Y0+i*L.BP,k=ease(ramp(t,i*.12,i*.12+.46));
      s+=`<text x="14" y="${y0}" class="t-sm" style="fill:var(--ink)">${N&&g.n?g.n:g.l}</text>`;
      [[g.a,'var(--terra)','FMF',L.R1,0],[g.p,'var(--muted)','ביקורת',L.R2,1]].forEach(pr=>{
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
  playWire(qr,$('#lvQPlay'),drawQ,8000,'הפעלה חוזרת','living');drawQ(+qr.value);

  $('#lvCards').innerHTML=`
   <div class="card"><h4>פרוגנוזה: שתי קבוצות מחקר, שתי תשובות</h4><p>בקבוצה טורקית ממרכז יחיד, של 587 מטופלים שנעקבו במשך חציון של 6 שנים, ההישרדות לא הייתה שונה באופן מובהק מזו של האוכלוסייה הכללית (יחס תמותה מתוקנן 1.48, רווח סמך 95% 0.817–2.49). עמילואידוזיס הייתה סיבת המוות המובילה והמנבא המובהק היחיד לתמותה. בקבוצה ישראלית של 1.25 מיליון מתבגרים, ל־1,225 שהיו עם FMF הייתה תמותה גבוהה יותר: 8.73 לעומת 4.32 מקרי מוות ל־10,000 שנות אדם, עם יחסי סיכון מתוקננים של 1.7 בגברים ו־2.48 בנשים. עמילואידוזיס של הכליות גרמה ל־35% ממקרי המוות בגברים ול־60% בנשים. שני המחקרים שונים בגודל, במדינה ובתקופה; מה שהם מסכימים עליו הוא שהעמילואידוזיס היא שמניעה את הסיכון. <sup class="c" data-ref="Akar2012,Twig2014" title="Source 2,266">2,266</sup></p>
     <div class="hook"><b>לבחינה</b>עמילואידוזיס היא ציר הפרוגנוזה ב־FMF. כששולטים בדלקת בין ההתקפים, עקומות ההישרדות מתקרבות לעקומת האוכלוסייה.</div></div>
   <div class="card"><h4>איכות חיים, במדידה</h4><p>ילדים בגיל בית ספר עם FMF קיבלו ציונים נמוכים יותר מבני גילם הבריאים באיכות החיים הגופנית והפסיכו־סוציאלית. בקרב 111 מבוגרים, ההיעדרות מהעבודה הייתה 9.3% לעומת 0.7% בקבוצת הביקורת, והפרזנטיזם (ירידה בתפוקה בזמן העבודה) 35.2% לעומת 9.6%; הפגיעה הייתה הגדולה ביותר במטופלים עמידים לקולכיצין, ונמוכה יותר במי שקיבלו אנטגוניסטים ל־IL-1. ציוני SF-36 השתפרו אחרי 3 חודשי טיפול באנטגוניסט ל־IL-1 בקרב 44 מטופלים עמידים לקולכיצין. גם רילונאספט שיפר בניסוי שלו את ציוני איכות החיים הגופנית. <sup class="c" data-ref="Makay2009,Suticen2021,Varan2019,Hashkes2014" title="Source 94,165,251,271">94,165,251,271</sup></p></div>
   <div class="card"><h4>מצב רוח</h4><p>במחקר על מאגר נתוני בריאות ישראלי, של 7,670 מטופלי FMF ו־7,670 נבדקי ביקורת מותאמים, דיכאון אובחן ב־6.22% לעומת 4.58% וחרדה ב־4.93% לעומת 3.14%, בשניהם P&lt;0.001. מחקרי שאלונים מוצאים פערים גדולים יותר: במחקר אחד במבוגרים, 33% לעומת 12% בדיכאון ו־53% לעומת 16% בחרדה, עם ציוני SF-36 גופניים נמוכים יותר. בקרב 130 ילדים, החרדה הייתה גבוהה יותר מאשר בקבוצת הביקורת, אבל הדיכאון לא. הבדלים בשיעורי אבחנה והבדלים בציוני שאלונים עונים על שאלות שונות, ולכן המספרים נראים שונים כל כך. <sup class="c" data-ref="Lidor2021,Deger2011,Sonmez2020" title="Source 45,151,246">45,151,246</sup></p></div>
   <div class="card"><h4>רגליים, מדרגות וימים ארוכים</h4><p>כאב רגליים במאמץ שכיח, ולעיתים קרובות נחשב בטעות למשהו אחר: 22.1% מתוך 3,454 ילדים בקבוצת הילדים הגדולה ביותר, ועד 30.2% בקרב הומוזיגוטים ל־M694V. EULAR 2016 מציעה לו NSAIDs. מיאלגיה ממושכת עם חום, כלומר כאב שרירים קשה שנמשך 5 ימים או יותר עם חום וסמני דלקת מוגברים, הופיעה ב־1.6%; היא מגיבה לגלוקוקורטיקואידים, ו־NSAIDs או חסימת IL-1 הם אפשרויות נוספות. <sup class="c" data-ref="Ozturk2022,Ozen2016" title="Source 199,205">199,205</sup></p></div>
   <div class="card"><h4>מה נחשב גורם מעורר</h4><p>הגורמים המעוררים שדווחו כוללים לחץ גופני או רגשי, וסת, טראומה, קור, זיהום, צריכת שומן גבוהה, צום, חוסר שינה ועייפות. הסיכום הכן הוא שמאחורי הלחץ עומד מבנה המחקר החזק ביותר, קור ועמידה מדווחים לעיתים קרובות מאוד, ושני דברים שאנשים נוטים להימנע מהם, פעילות גופנית וארוחות שומניות, לא העלו את הסיכוי להתקף במחקר ה־case-crossover. במחקר של 882 המטופלים, הקור היה מובהק רק בנשאים של וריאנטים באקסון 10 ובהומוזיגוטים ל־M694V. <sup class="c" data-ref="Ozen2016,Yenokyan2012,Parlar2024,Karadag2013" title="Source 118,199,209,279">118,199,209,279</sup></p>
     <div class="pt"><b>במילים פשוטות</b>רשימות של גורמים מעוררים מגיעות בעיקר מכך ששואלים אנשים במה הבחינו. המחקר היחיד שהשווה כל אדם לעצמו מצא שללחץ יש השפעה, ולפעילות גופנית ולמזון שומני אין.</div></div>`;
  $('#lvOrg').innerHTML=`<p><b>היכן מטופלים מוצאים זה את זה.</b> FMF &amp; AID Global Association היא עמותה ללא כוונת רווח שמרכזה בציריך, התומכת באנשים עם FMF ועם מחלות אוטו-דלקתיות אחרות ברחבי העולם, ומפעילה קו סיוע, חומרי הסברה וסקר מטופלים בינלאומי. Autoinflammatory Alliance הוא ארגון צדקה אמריקאי מסוג 501(c)(3) שמקדם מודעות, אבחון וטיפול במחלות אוטו-דלקתיות. שני התיאורים לקוחים מרשומות המקורות המופיעות כאן, ולא מהדפים של הארגונים עצמם. מטופלים היו שותפים גם בכתיבת ההנחיות: נציג מטופלים אחד בוועדה של 2016, ושניים בוועדה של 2024. <sup class="c" data-ref="FMFAID,AutoinflammatoryAlliance,Ozen2016,Ozen2025" title="Source 7,69,199,203">7,69,199,203</sup></p>`;
};

/* =============== 4.3 nursing care =============== */
const NU_SITES={
 gen:{n:'חום ומשך ההתקף',dot:null,
  what:'הופעה פתאומית, שיא בתוך שעות, והחום יכול להופיע לבדו. לפי קריטריוני Livneh, התקף טיפוסי הוא חוזר, עם חום של 38 °C לפחות במדידה רקטלית, ונמשך 12 שעות עד 3 ימים. אירועים של 6–12 שעות או 3–7 ימים, או מתחת ל־38 °C, נחשבים התקפים לא שלמים. <sup class="c" data-ref="Livneh1997,Sonmez2016,Tufan2020" title="Source 159,245,263">159,245,263</sup>',
  gap:'לא נמצא מקור ייחודי ל־FMF לגבי דרך מדידת החום, אתר המדידה או תדירותה, ולכן האפליקציה אינה קובעת אותם.'},
 abdo:{n:'בטן',dot:[30,62],
  what:'דלקת הצפק (פריטוניטיס) היא הביטוי השכיח ביותר, אצל 93.7% במרשם הטורקי שכלל 2,838 מטופלים. התגוננות (guarding), רגישות בהרפיה (rebound) ואילאוס מופיעים כולם בדלקת צפק רגילה של FMF, ולכן סימני צפק אינם מבחינים בינה לבין בטן כירורגית. הסימן המבחין שפורסם לדלקת התוספתן הוא מעבר הכאב מכאב מפושט לרביע הימני התחתון. התסמינים חולפים לחלוטין בתוך 24–72 שעות. <sup class="c" data-ref="TurkishFMF2005,Tufan2020,Lidar2008" title="Source 150,263,264">150,263,264</sup>',
  hook:'כ־80% מהתוספתנים שנכרתו ממטופלי FMF לא היו מודלקים, לעומת כ־20% באוכלוסייה הכללית. בקוהורט אחד של 971 מטופלים, לרבע מהם נכרת התוספתן. <sup class="c" data-ref="Lidar2008,Bodakci2021" title="Source 23,150">23,150</sup>'},
 chest:{n:'חזה',dot:[24,44],
  what:'דלקת קרום הריאה (פלאוריטיס) פוגעת בפחות ממחצית המטופלים: פתאומית, בדרך כלל חד־צדדית, לעתים עם תפליט קטן בזווית הקוסטו־פרנית, וחולפת בתוך 1–3 ימים. דלקת קרום הלב (פריקרדיטיס) נדירה: 27 מקרים מתוך כ־4,000 מטופלים ישראלים במשך 20 שנה, ו־1.4% במרשם הטורקי. <sup class="c" data-ref="Tufan2020,Kees1997,TurkishFMF2005" title="Source 123,263,264">123,263,264</sup>',
  gap:'התיאורים שפורסמו מכסים אתר, צד, תפליט ומשך. הם אינם מכסים את התרחבות בית החזה, הגבלת הנשימה בגלל כאב (splinting) או סיכון לתמט (atelectasis), ולכן אף מקור ב־FMF אינו תומך בתצפיות האלה.'},
 joint:{n:'פרקים ושרירים',dot:[24,104],
  what:'בדרך כלל דלקת חריפה בפרק אחד או בפרקים מעטים (מונו־ או אוליגוארתריטיס), בפרק גדול בגפה התחתונה. הנוזל סטרילי אך דלקתי, ויכול לחקות דלקת פרקים ספטית. התסמינים מגיעים לשיא בתוך 1–3 ימים ושוככים בתוך כשבוע. כאב רגליים במאמץ הופיע אצל 22.1% מתוך 3,454 ילדים, ואצל 30.2% מההומוזיגוטים ל־M694V. <sup class="c" data-ref="Tufan2020,Ozturk2022" title="Source 205,263">205,263</sup>',
  hook:'מיאלגיה חומית ממושכת (protracted febrile myalgia) מופיעה אצל כ־1.6%, נמשכת עד שישה שבועות, מתרחשת למרות קולכיצין ומגיבה לקורטיקוסטרואידים. מתוך 78 ילדים שנסקרו, אצל יותר ממחציתם זה היה הביטוי הראשון. <sup class="c" data-ref="Ozturk2022,Langevitz1994,Hospach2024" title="Source 100,146,205">100,146,205</sup>'},
 skin:{n:'עור',dot:[34,116],
  what:'אודם דמוי שושנה: נגע אדום ורגיש בשוק, בקרסול או בגב כף הרגל, שמופיע לעתים קרובות אחרי הליכה ממושכת או נסיעה. הוא הופיע אצל כ־7.5% בקוהורט ילדים אחד של 782, ובו לילדים שנפגעו היו לעתים קרובות יותר דלקת פרקים והומוזיגוטיות ל־M694V. <sup class="c" data-ref="Tufan2020,GezginYildirim2020" title="Source 79,263">79,263</sup>'},
 scrot:{n:'שק האשכים',dot:[30,80],
  what:'דלקת של ה־tunica vaginalis (המעטפת הנרתיקית של האשך). מתוך 175 בנים ערבים מתחת לגיל 16 עם FMF, ל־9% היו התקפים בשק האשכים שנמשכו 8 שעות עד 5 ימים. אצל רבע מהם זה היה הסימן הראשון ל־FMF, ו־38% עברו ניתוח. <sup class="c" data-ref="Majeed2000" title="Source 164">164</sup>'},
 bloods:{n:'בדיקות דם',dot:null,
  what:'ההנחיה מ־2024 מתארת ספירת תאים לבנים מוגברת עם עדיפות נויטרופילים, CRP (חלבון C-ריאקטיבי), SAA (עמילואיד A בסרום) ופיברינוגן מוגברים, ושקיעת דם (ESR) מוגברת. במחקר ייעודי ה־CRP עלה בכל התקף, בעוד שהטסיות לא עלו, הפריטין עלה אצל מטופל אחד בלבד והאלבומין לא השתנה. החציונים בהתקף היו SAA 693 ו־CRP 115 mg/L, לעומת 6 ו־4 mg/L בין התקפים. <sup class="c" data-ref="Ozen2025,Korkmaz2002,Lachmann2006" title="Source 136,141,203">136,141,203</sup>',
  hook:'פריטין וטסיות שנשארים יציבים בזמן שה־CRP מטפס: זה מה שמבחין בבדיקות הדם בין התקף FMF לבין מחלת סטיל (Still). <sup class="c" data-ref="Korkmaz2002" title="Source 136">136</sup>'}
};
const NU_FLAGS=[
 {t:'ההתקף אינו חולף',d:'ההתקפים חולפים מעצמם, בדרך כלל בתוך 1–3 ימים, ובין התקפים המטופלים בדרך כלל בריאים לחלוטין. אירוע שאינו חולף בטווח הזמן הזה חורג מהמהלך הטבעי המתואר. <sup class="c" data-ref="GeneReviews,Tufan2020" title="Source 76,263">76,263</sup>'},
 {t:'הכאב עובר לרביע הימני התחתון',d:'סימני צפק שכיחים ב־FMF, ולכן אינם מאשרים או שוללים דלקת תוספתן. הסימן המבחין שפורסם הוא מעבר מכאב מפושט לרביע הימני התחתון. שתי גרסאות ההנחיה קובעות שתמיד יש לשקול סיבות אחרות, כמו דלקת התוספתן. <sup class="c" data-ref="Lidar2008,Ozen2016,Ozen2025" title="Source 150,199,203">150,199,203</sup>'},
 {t:'חלבון בשתן וקריאטינין שעולים מהר',d:'סערת עמילואיד (amyloid storm): חלבון בשתן (פרוטאינוריה) קשה ופתאומי עם אי־ספיקת כליות מתקדמת במהירות ומגיבי שלב חריף מוגברים מאוד, במשך ימים עד שבועות. בסדרה המקורית של 20 מטופלים, זיהום היה הגורם המעורר אצל 17 מתוך 20, ובתוך שנה 16 הגיעו למחלת כליות סופנית או למוות, לעומת 3 בקבוצת הביקורת. סקירה מ־2025 העריכה את השכיחות ב־5.5% מהמקרים הקשורים ל־FMF, עם תמותה של 33–67%. <sup class="c" data-ref="Ozkurt2025,Kukuy2021" title="Source 139,204">139,204</sup>'},
 {t:'תסמינים במערכת העיכול אצל מי שהמינון או התרופות שלו השתנו זה עתה',d:'סקירה מתחום הסיעוד ברפואה דחופה מציינת שהרעלת קולכיצין מתחילה לעתים קרובות בתסמינים במערכת העיכול ועלולה להתקדם לכשל רב־מערכתי, שאין לה נוגדן ולכן הטיפול הוא תומך, ושהסיכון הגבוה ביותר הוא אצל אנשים מבוגרים, אנשים עם פגיעה בתפקוד הכליות או הכבד, ומי שנוטלים תרופות בעלות אינטראקציה. התווית מדווחת על תופעות במערכת העיכול אצל עד 20% מהמטופלים שמתחילים טיפול, וקובעת שתופעות קשות עלולות לבשר על הרעלה חמורה יותר. <sup class="c" data-ref="Denke2026,FDA-Colcrys" title="Source 51,63">51,63</sup>'},
 {t:'המשפחה רגועה, או מבוהלת',d:'מתוך הורים של 171 ילדים עם FMF, 90.1% ידעו שקולכיצין יעיל, אבל רק 39.2% ידעו שאין סכנת חיים בזמן התקף. בהלה של המשפחה אינה מדד לחומרה, לא בכיוון אחד ולא בכיוון השני. <sup class="c" data-ref="Yildirim2021" title="Source 281">281</sup>'}
];
const NU_TOOLS=[
 {n:'AIDAI',s:'מתוקף',b:['יומן שהמטופל או ההורה מנהלים במשך חודש לפני הביקור.','שנים־עשר פריטים, שכל אחד מהם מקבל 0 או 1 בכל יום: חום ≥38 °C, תסמינים כלליים, כאב בטן, בחילה או הקאה, שלשול, כאב ראש, כאב בחזה, בלוטות לימפה כואבות, כאבי פרקים או שרירים, נפיחות בפרקים, סימנים בעיניים, פריחה בעור. פריט שלושה־עשר, נטילת משכך כאבים, נרשם אך אינו מנוקד.','ציון כולל של 9 ומעלה פירושו מחלה פעילה: רגישות 89%, סגוליות 92%, AUC 98% מול הסכמה עיוורת של מומחים.','ההנחיה מ־2024 מכנה אותו מדד הפעילות המתוקף היחיד ב־FMF, ואומרת שיש לו קשיים בשיקוף הפעילות.'],c:'<sup class="c" data-ref="Piram2014,Ozen2025" title="Source 203,211">203,211</sup>'},
 {n:'ISSF',s:'מתוקף',b:['מדד חומרה שנבנה בשיטת דלפי (Delphi) ותוקף אצל 281 מטופלים, AUC 0.825.','תשעה תחומים, שמנוקדים כעשרה פריטים כי תדירות ההתקפים מתפצלת לשניים; מקסימום 10.','טווחים: 2 ומטה קל, 3–5 בינוני, 6 ומעלה קשה.','אצל 160 ילדים טורקים מטופלים הוא סיווג 21.3% כקלים, 70.5% כבינוניים ו־8.1% כקשים.'],c:'<sup class="c" data-ref="DemirkayaISSF2016,Ozdemir2021" title="Source 50,196">50,196</sup>'},
 {n:'FMF50',s:'תגובה, לא פעילות',b:['שישה פריטים: שינוי בתדירות ההתקפים, שינוי במשך ההתקפים, הערכה גלובלית של החומרה בידי המטופל או ההורה, הערכה גלובלית של החומרה בידי הרופא, שינוי בהתקפי דלקת פרקים, ושינוי ב־CRP, ESR או SAA.','תגובה היא שיפור של 50% לפחות ב־5 מתוך 6 הפריטים בלי החמרה באף אחד, שנבחן אחרי 3–6 חודשים, ורק אחרי שהושג המינון המרבי הנסבל.','הוא הבחין בצורה גרועה בין מגיבים ללא מגיבים בניסוי האקראי של רילונאספט.'],c:'<sup class="c" data-ref="Ozen2014,Ozen2017,Hashkes2012" title="Source 93,198,200">93,198,200</sup>'},
 {n:'ספירת התקפים',s:'הפשוט ביותר',b:['אצל 239 מטופלים, מספר ההתקפים ב־12 החודשים האחרונים היה במתאם בינוני עם מדדי איכות חיים וכאב, וזה תומך בו כמדד פעילות יחיד.','מערך התוצאים המינימלי של 2024 משתמש במספר ההתקפים לכל 3 חודשים.'],c:'<sup class="c" data-ref="Piskin2022,Ozen2025" title="Source 203,212">203,212</sup>'},
 {n:'MASIF',s:'היענות לטיפול',b:['סולם היענות בן 18 פריטים וארבעה תת־סולמות, שפותח אצל 150 ילדים טורקים בגילי 2 עד 18.','מתאם עם סולם Morisky של r = 0.515, אלפא של קרונבך 0.728, מבחן־מבחן חוזר r = 0.843, הסכמה בין הורה לילד r = 0.781.'],c:'<sup class="c" data-ref="Yesilkaya2015" title="Source 280">280</sup>'},
 {n:'JAIMAR',s:'רב־ממדי',b:['שישה־עשר מדדים בתחומי המצב התפקודי, הכאב, ההיענות לטיפול ואיכות החיים, בדיווח הורה בשם הילד או בדיווח עצמי מגיל 8, שנבדקו אצל 250 ילדים עם FMF.','כ־15 דקות למילוי ולניקוד.'],c:'<sup class="c" data-ref="Konukbay2016" title="Source 135">135</sup>'}
];
const NU_SCEN={
 routine:{n:'מנה יומית שגרתית',steps:[1,1,1,1,1],
  note:'התווית מורה על קולכיצין ל־FMF דרך הפה, פעם ביום או בשתי מנות מחולקות, ללא קשר לארוחות. ההנחיה מ־2024 מתירה את שתי האפשרויות, לפי ההיענות והסבילות, ומציינת שמנה אחת ביום מקובלת כיעילה אך עלולה לגרום ליותר אי־נוחות במערכת העיכול. העלאות מינון נעשות בהדרגה ולא יותר מפעם בשבוע. <sup class="c" data-ref="FDA-Colcrys,Ozen2025" title="Source 63,203">63,203</sup>'},
 clarithro:{n:'נרשם גם קלריתרומיצין',steps:[1,0,1,1,1],
  note:'זו האינטראקציה שהנזק ממנה ברור ביותר. במחקר אחד מתו 9 מתוך 88 מטופלים שקיבלו קלריתרומיצין וקולכיצין יחד, לעומת 1 מתוך 28 שקיבלו אותם בזה אחר זה; פגיעה כלייתית בבסיס, חפיפה ארוכה יותר ופנציטופניה ניבאו מוות. כשאין חלופה, התווית מגבילה את מינון ה־FMF ל־0.6 mg ביום עם מעכבים חזקים של CYP3A4 או של P-glycoprotein, וההגבלה חלה גם בתוך 14 יום מהתרופה בעלת האינטראקציה. אזיתרומיצין מעלה את החשיפה הרבה פחות. <sup class="c" data-ref="Hung2005,FDA-Colcrys,Terkeltaub2011" title="Source 63,103,257">63,103,257</sup>'},
 renal:{n:'תפקוד כליות ירוד',steps:[1,1,0,1,1],
  note:'התווית ממליצה על מעקב צמוד ועל הפחתת מינון אפשרית בפינוי קריאטינין של 50–80 או 30–50 mL/min, ועל מינון התחלתי של 0.3 mg ביום מתחת ל־30 mL/min או בדיאליזה. קולכיצין אינו מורחק בהמודיאליזה. ההנחיה מ־2024 מוסיפה שהסיכון להרעלה גבוה בתפקוד כליות ירוד, ולכן עוקבים בקפידה אחר סימני הרעלה ואחר קריאטין קינאז (CK), ומפחיתים את המינון בהתאם. <sup class="c" data-ref="FDA-Colcrys,Ozen2025" title="Source 63,203">63,203</sup>'},
 attack:{n:'בהתקף ממש עכשיו',steps:[1,1,1,0,1],
  note:'המלצה 11 בהנחיה מ־2024: בזמן התקף אופייני אין מעלים את מינון הקולכיצין. המינון הרגיל נמשך, NSAIDs (נוגדי דלקת שאינם סטרואידים) ניתנים לתסמינים, וההמלצה אינה מזכירה גלוקוקורטיקואידים או אופיואידים. מקור המידע למטופלים אומר במפורש שהעלאת המינון בזמן התקף אינה עוזרת. שתי הגרסאות קובעות שתמיד יש לשקול סיבות אחרות, כמו דלקת התוספתן. <sup class="c" data-ref="Ozen2025,PRINTO2016G,Ozen2016" title="Source 199,203,216">199,203,216</sup>'},
 missed:{n:'מנה נשכחה',steps:[1,1,1,1,0],
  note:'בטיפול מונע, כולל ב־FMF, התווית אומרת לקחת את המנה בהקדם האפשרי ואז לחזור ללוח הזמנים הרגיל, ושאסור להשלים מנה שדולגה בהכפלת המנה הבאה. כלל 12 השעות שבתווית שייך למנה שנשכחה בזמן טיפול בהתלקחות של גאוט, לא ל־FMF. <sup class="c" data-ref="FDA-Colcrys" title="Source 63">63</sup>'}
};
const NU_STEPS=[
 {t:'ההוראה',d:'⁧המינון, והאם הוא ניתן פעם אחת ביום או מחולק.'},
 {t:'אינטראקציות',d:'⁧מעכבים חזקים של CYP3A4 ושל P-glycoprotein, סטטינים, אשכולית.'},
 {t:'כליות וכבד',d:'⁧פינוי, ובדיקות הדם שעוקבות אחריו.'},
 {t:'היכן במחלה',d:'⁧התקף או היעדר התקף אינו משנה דבר במינון.'},
 {t:'מה נלקח בפועל',d:'⁧מנות שנשכחו, ומה המטופל מאמין לגביהן.'}
];
const NU_INJ=[
 {n:'הצד החיצוני של הזרוע העליונה',x:96,y:96},{n:'בטן',x:210,y:150},{n:'קדמת אמצע הירך',x:170,y:236},
 {n:'הצד החיצוני של הזרוע העליונה',x:324,y:96},{n:'החלק העליון החיצוני של העכוז',x:300,y:190},{n:'קדמת אמצע הירך',x:250,y:236}
];
const NU_BIO=[
 {n:'אנאקינרה',s:'מחוץ להתוויה ב־FMF (ארה״ב)',b:['100 mg ביום, או 2 mg/kg, בהזרקה תת־עורית יומית.','האתרים שהעלון מציין: הצד החיצוני של הזרועות העליונות, הבטן למעט אזור של 2 אינץ׳ סביב הטבור, קדמת אמצע הירכיים, והחלק העליון החיצוני של העכוז. אתר חדש בכל פעם, דבר שעשוי להפחית את הסיכון למשקעי עמילואיד באתר ההזרקה. לא מצוין מרחק מינימלי מהאתר הקודם.','לאחסן בקירור ב־2–8 °C, לא להקפיא ולא לנער, להגן מאור, ולהשאיר את המזרק בטמפרטורת החדר 30 דקות לפני ההזרקה.','תגובות באתר ההזרקה אצל 71% בניסויי דלקת המפרקים השגרונית, בדרך כלל ב־4 השבועות הראשונים; 16.3% ב־NOMID ב־6 החודשים הראשונים, ואף לא אחת אחרי שנה 2.','ספירת נויטרופילים לפני תחילת הטיפול, פעם בחודש במשך 3 חודשים, ואחר כך פעם ברבעון עד שנה.','ההתוויות שלה בארה״ב הן דלקת מפרקים שגרונית, NOMID ו־DIRA, ולכן השימוש ב־FMF הוא מחוץ להתוויה.'],c:'<sup class="c" data-ref="KineretPI,Ozen2025" title="Source 127,203">127,203</sup>'},
 {n:'קנאקינומאב',s:'FMF כלולה בהתוויה האמריקאית',b:['150–300 mg, או 2–4 mg/kg, בהזרקה תת־עורית כל 4–8 שבועות.','לאחסן בקבוקונים סגורים ב־2–8 °C באריזה המקורית, לא להקפיא. ללא חומרים משמרים.','העלון מורה להימנע מהזרקה לרקמת צלקת, משום שהיא עלולה לתת חשיפה לא מספקת.','תגובות באתר ההזרקה אצל 10.1% במחקר ב־TRAPS, HIDS/MKD ו־FMF, כולן קלות או בינוניות, ואף אחת לא הובילה להפסקת הטיפול.','העלון מדווח על נויטרופניה וציטופניות אחרות, אך אינו קובע מרווח זמן לספירות דם.'],c:'<sup class="c" data-ref="IlarisPIG,Ozen2025" title="Source 105,203">105,203</sup>'},
 {n:'רילונאספט',s:'מחוץ להתוויה ב־FMF (ארה״ב)',b:['2.2 mg/kg, עד 160 mg לכל היותר, בהזרקה תת־עורית פעם בשבוע. מנת העמסה של 320 mg ניתנת כשתי הזרקות של 160 mg באותו יום, באתרים שונים.','ממיסים ב־2.3 mL מים סטריליים ללא חומרים משמרים, מנערים כדקה, משאירים לעמוד דקה ומשתמשים בתוך 3 שעות. הבקבוקונים לשימוש חד־פעמי.','אתרים: בטן, ירך או זרוע עליונה, תוך הימנעות מטווח של 2 אינץ׳ סביב הטבור ומעור חבול, אדום, רגיש או קשה, והחלפת האתר בכל פעם.','תגובות באתר ההזרקה אצל 48% בשלב המבוקר בפלצבו במחקר CAPS, לעומת 13% בפלצבו.','העלון ממליץ על מעקב אחר שומני הדם, ואחר גדילה והתפתחות בילדים.','ההתוויות שלו בארה״ב הן CAPS, שימור הפוגה ב־DIRA ודלקת קרום הלב (פריקרדיטיס) חוזרת.'],c:'<sup class="c" data-ref="ArcalystPI" title="Source 5">5</sup>'}
];
const NU_MYTHS=[
 {m:'לקחת עוד כשהתקף מתחיל',t:'קולכיצין מונע התקפים; הוא אינו מטפל בהתקף שכבר התחיל',
  a:'מקור המידע למטופלים קובע במפורש שהעלאת המינון בזמן התקף אינה עוזרת. המלצה 11 בהנחיה מ־2024 אומרת את אותו הדבר מצד הצוות המטפל: להמשיך במינון הרגיל, ולתת NSAIDs לתסמינים. <sup class="c" data-ref="PRINTO2016G,Ozen2025" title="Source 203,216">203,216</sup>',
  q:'שאלו: "אם יתחיל התקף הלילה, מה תעשו עם הטבליות?"'},
 {m:'להפסיק כשמרגישים טוב',t:'כל המטרה היא השנים בלי תסמינים',
  a:'ההתקפים והסיכון לעמילואידוזיס חוזרים אם הטיפול נפסק. היענות ירודה, במיוחד בגיל ההתבגרות, מעלה את הסיכון לעמילואידוזיס בהמשך. מקור המידע למטופלים ממליץ לא לשנות את המינון בלי לדבר קודם עם הרופא. <sup class="c" data-ref="PRINTO2016G" title="Source 216">216</sup>',
  q:'שאלו: "מה לדעתכם יקרה אם תפסיקו לכמה חודשים?"'},
 {m:'ההתקפים נמשכים, אז הטיפול נכשל',t:'עמידות מוגדרת רק אחרי שאושרה היענות לטיפול',
  a:'הגדרת הקונצנזוס דורשת התקפים חוזרים, בממוצע אחד או יותר בחודש במשך שלושה חודשים, או דלקת מעבדתית מתמשכת בין התקפים, אחרי שאושרה היענות לטיפול. ההנחיה מ־2024 הוסיפה בכוונה את המילים "אצל מטופלים בעלי היענות לטיפול" להמלצה על העלאת המינון. <sup class="c" data-ref="Ozen2021,Ozen2025" title="Source 202,203">202,203</sup>',
  q:'שאלו: "בחודש האחרון, בכמה ימים פספסתם טבליה?" ולא "אתם לוקחים את התרופה?"'},
 {m:'שלשול פירושו להפסיק',t:'תופעת הלוואי השכיחה ביותר מטופלת בדרך כלל, ואינה סיבה להפסיק',
  a:'מקור המידע למטופלים מתאר הורדת מינון עד שהוא נסבל ואז העלאה איטית, ואומר שהפחתת לקטוז למשך כשלושה שבועות עשויה לעזור. ספירות הדם עשויות לרדת לעתים, אך בדרך כלל מתאוששות כשהמינון יורד. תופעות קשות במערכת העיכול עלולות לבשר על הרעלה חמורה יותר, ולכן מדווחים עליהן ולא סובלים אותן בשקט. <sup class="c" data-ref="PRINTO2016G,FDA-Colcrys" title="Source 63,216">63,216</sup>',
  q:'שאלו: "האם משהו בטבליות היה לא נעים עד כדי כך שדילגתם עליהן?"'},
 {m:'זה לא בטוח בהריון',t:'ההנחיה מציינת את התפיסה השגויה הזו כחסם',
  a:'המלצה 10 קובעת שיש להמשיך בקולכיצין לאורך ההתעברות, ההריון וההנקה, ושדיקור מי שפיר אינו מומלץ כיום. ההנחיה קובעת שחיוני לשתף את המיילדים בכך שקולכיצין בטוח בהריון, ומונה בטבלת החסמים שלה את "התפיסה השגויה שקולכיצין אסור בהריון". הסקירה התומכת מצאה שהפוריות של נשים אינה נפגעת, וגברים אינם צריכים להפסיק את התרופה במינונים המומלצים. <sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>',
  q:'שאלו: "האם מישהו הציע שתפסיקו את התרופה אם יהיה הריון?"'},
 {m:'התקף מסוכן כשלעצמו',t:'רוב ההורים אינם יודעים את זה',
  a:'מתוך הורים של 171 ילדים עם FMF, 90.1% ידעו שקולכיצין יעיל, אבל רק 39.2% ידעו שאין סכנת חיים בזמן התקף. החוקרים העריכו שהידע אינו מספק, והמליצו על הדרכה מתמשכת מרגע האבחנה. הדבר אינו חל על סימני האזהרה שלמעלה, שהם עניין אחר. <sup class="c" data-ref="Yildirim2021" title="Source 281">281</sup>',
  q:'שאלו: "מה הכי מדאיג אתכם כשמתחיל התקף?"'}
];
const NU_DOC=[
 {k:'attacks',l:'התקפים מאז הביקור הקודם',v:'התקפים ב־3 החודשים האחרונים: 2. אתרים: בטן, בטן. הארוך ביותר 48 h.',c:true},
 {k:'current',l:'האירוע הנוכחי: אתר, הופעה, משך עד כה',v:'האירוע הנוכחי: בטני, הופעה ב־06:40, 14 h עד כה, בשכיכה.',c:true},
 {k:'temp',l:'חום',v:'חום 38.4 °C.',c:true},
 {k:'exam',l:'ממצאי הבדיקה הגופנית',v:'בטן: התגוננות מפושטת, רגישות בהרפיה קיימת, כאב מפושט שאינו ממוקם ברביע הימני התחתון. חזה ופרקים תקינים. עור תקין.',c:true},
 {k:'labs',l:'בדיקות דם של שלב חריף',v:'CRP 96 mg/L, SAA ממתין לתוצאה, לויקוציטים 14.2 עם עדיפות נויטרופילים, טסיות ופריטין ללא שינוי.',c:true},
 {k:'urine',l:'בדיקת שתן לחלבון',v:'בדיקת שתן: אין חלבון.',c:true},
 {k:'tox',l:'בדיקות דם לרעילות',v:'ספירת דם ותפקודי כבד בטווח התקין; CK אינו נדרש, תפקוד כליות תקין.',c:false},
 {k:'adher',l:'היענות לטיפול, בשאלה שאינה מאשימה',v:'היענות: מדווח על כ־2 מנות שנשכחו בחודש האחרון, בדרך כלל בסופי שבוע.',c:true},
 {k:'meds',l:'מה נלקח בפועל, ואינטראקציות',v:'קולכיצין 1.5 mg ביום, נלקח הבוקר. אין מעכב חדש של CYP3A4 או P-gp, אין סטטין, אין אשכולית.',c:true},
 {k:'pro',l:'מה המטופל מדווח',v:'המטופל מדרג את ההתקף הזה 6/10, ואומר ששלושת החודשים האחרונים היו טובים יותר משלושת החודשים שלפניהם.',c:false},
 {k:'teach',l:'מה הודרך, ומה המטופל הסביר בחזרה',v:'הדרכה: מדוע לא מעלים את המינון בזמן התקף. המטופל הסביר זאת בחזרה נכון.',c:false},
 {k:'plan',l:'תוכנית, ולמי נמסר',v:'תוכנית: להמשיך במינון הרגיל, NSAID לתסמינים, מעקב בעוד 6 חודשים או מוקדם יותר אם ההתקפים נעשים חודשיים. נדון עם צוות הראומטולוגיה.',c:false}
];
const NU_MON=[
 {m:0,t:'אבחנה',d:'המעקב נקבע במרווחים קצרים אחרי האבחנה וכל עוד המחלה אינה יציבה.',c:'<sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>'},
 {m:3,t:'העלאת מינון',d:'כשמינון הקולכיצין מועלה במחלה פעילה, CRP ו/או SAA לפחות כל 3 חודשים.',c:'<sup class="c" data-ref="Ozen2016,Ozen2017" title="Source 199,200">199,200</sup>'},
 {m:6,t:'ביקורת שגרתית',d:'ביקורים כל 6 חודשים עשויים להספיק אם המחלה בשליטה. התגובה נשפטת לפי תדירות ההתקפים, איכות החיים והמדדים הדלקתיים. גרסת 2016 קבעה את המרווח הזה באופן גורף; גרסת 2024 הפכה אותו למותנה.',c:'<sup class="c" data-ref="Ozen2025,Ozen2016" title="Source 199,203">199,203</sup>'},
 {m:9,t:'הפחתת תרופה ביולוגית',d:'כשמפחיתים מינונים של תרופה ביולוגית או מאריכים את המרווחים, מעקב צמוד, באופן אידיאלי כל 3 חודשים, אחר התלקחויות או החמרה בדלקת.',c:'<sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>'},
 {m:12,t:'בדיקת שתן',d:'בדיקת שתן לפחות פעם בשנה, ולעתים קרובות יותר אם המחלה אינה בשליטה טובה. גרסת 2016 ביקשה בדיקה כזו בכל ביקור במרפאה.',c:'<sup class="c" data-ref="Ozen2025,Ozen2016" title="Source 199,203">199,203</sup>'}
];
inits.nursing=()=>{
  /* ---- 1 · assessment ---- */
  $('#nuAssessLede').innerHTML='התקף הוא מטרה נעה: הוא מתחיל בפתאומיות, מגיע לשיא וחולף בתוך שלושה ימים. אלה הממצאים שהספרות מתארת בכל אתר, וגם התצפיות שהיא אינה מתארת, שהאפליקציה משאירה ריקות ואינה ממלאת. <sup class="c" data-ref="Tufan2020,Livneh1997" title="Source 159,263">159,263</sup>';
  let site='abdo',flags=false;
  $('#nuSites').innerHTML='<span class="kicker">בדקו</span>'+Object.entries(NU_SITES).map(([k,v])=>`<button class="btn" data-nus="${k}" aria-pressed="${k===site}">${v.n}</button>`).join('');
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
    const OBS=[['temp','חום',v=>(37+2.8*v).toFixed(1)+' °C','var(--terra)'],
               ['pain','כאב באתר',v=>Math.round(v*10)+'/10','var(--bad)'],
               ['crp','CRP',v=>Math.round(v*115)+' mg/L','var(--sea)'],
               ['wcc','תאים לבנים',v=>(5+v*9.5).toFixed(1),'var(--gold)']];
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
    s+=`<text x="${ex}" y="${ey-10}" class="t-sm">⁧טווח ההתקף · 12 עד 72 שעות</text>`;
    s+=`<rect x="${ex}" y="${ey}" width="${ew}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${f1(ex+ew*12/120)}" y="${ey}" width="${f1(ew*60/120)}" height="14" style="fill:var(--sea-soft)"/>`;
    s+=`<line x1="${f1(ex+ew*h/120)}" x2="${f1(ex+ew*h/120)}" y1="${ey-5}" y2="${ey+19}" style="stroke:var(--ink);stroke-width:2.5"/>`;
    [0,24,48,72,96,120].forEach((tk,i,a)=>s+=`<text x="${f1(ex+ew*tk/120)}" y="${ey+32}" class="t-xs ${i===a.length-1?'t-end':i===0?'':'t-mid'}">${tk}h</text>`);
    s+=`<text x="${ex}" y="${ey+50}" class="t-xs" style="fill:${h>72?'var(--bad)':'var(--muted)'}">${h>72?'⁧מעבר לטווח המתואר: זה כבר אינו התקף טיפוסי':'בתוך הטווח המתואר'}</text>`;
    svg.innerHTML=s;
    $('#nuRead').innerHTML=`<span>שעה <b>${Math.round(h)}</b></span><span>חום <b>${(37+2.8*C.temp(h)).toFixed(1)} °C</b></span><span>CRP <b>${Math.round(C.crp(h)*115)} mg/L</b></span>`;
    const note=flags
      ? `<div class="kicker">לא התקף טיפוסי</div><h4>מתי להסלים</h4>`+NU_FLAGS.map(f=>`<div class="kv"><div><dt>${f.t}</dt><dd>${f.d}</dd></div></div>`).join('')
      : `<div class="kicker">${S.n}</div><h4>מה הספרות מתארת</h4><p>${S.what}</p>`+
        (S.hook?`<div class="hook"><b>לבחינה</b>${S.hook}</div>`:'')+
        (S.gap?`<div class="pt"><b>היכן הראיות נגמרות</b>${S.gap}</div>`:'');
    $('#nuNote').innerHTML=note;
  }
  const stop=playWire(rg,$('#nuPlay'),draw,13000,'הפעלה חוזרת','nursing');
  $('#nuSites').addEventListener('click',e=>{const b=e.target.closest('[data-nus]');if(!b)return;site=b.dataset.nus;$$('[data-nus]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#nuFlag').onclick=()=>{flags=!flags;$('#nuFlag').setAttribute('aria-pressed',flags);$('#nuFlag').textContent=flags?'חזרה לאתרים':'הצגת מה שאינו התקף טיפוסי';draw(+rg.value)};
  $('#nuTools').innerHTML=NU_TOOLS.map(t=>`<div class="nu-card"><span class="tag sea">${t.s}</span><h5>${t.n}</h5><ul>${t.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${t.c}</p></div>`).join('');

  /* ---- 2 · giving the medicines ---- */
  $('#nuMedLede').innerHTML='לקולכיצין טווח טיפולי צר, ורוב מה שמשתבש איתו משתבש ברגע מתן התרופה. בחרו מצב וראו איזו בדיקה משתנה. <sup class="c" data-ref="Finkelstein2010,FDA-Colcrys" title="Source 63,67">63,67</sup>';
  let scen='routine';
  $('#nuScen').innerHTML='<span class="kicker">מצב</span>'+Object.entries(NU_SCEN).map(([k,v])=>`<button class="btn" data-nusc="${k}" aria-pressed="${k===scen}">${v.n}</button>`).join('');
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
    $('#nuMedNote').innerHTML=`<div class="kicker">${S.n}</div><h4>מה משתנה</h4><p>${S.note}</p>`+
      (scen==='routine'?'<div class="hook"><b>לבחינה</b>מנת יתר עלולה להיות קטלנית ואין לה נוגדן. ההנחיה מ־2024 מבקשת שמנת יתר מכוונת או מקרית תוערך בקפידה, תוך בירור מחשבות או כוונות אובדניות, ושהמשפחות יקבלו הסבר על הטווח הטיפולי הצר. התווית ממליצה לשמור את התרופה הרחק מהישג ידם של ילדים. <sup class="c" data-ref="Ozen2025,FDA-Colcrys,Denke2026" title="Source 51,63,203">51,63,203</sup></div>':'');
    $('#nuMedCap').textContent='חמש בדיקות, ואיזו מהן המצב משנה. הבדיקות לקוחות מהתווית ומההנחיה, לא מנוהל מקומי.';
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
    s+=`<text x="210" y="300" class="t-lbl t-mid">${p.n}</text><text x="210" y="316" class="t-xs t-mid">⁧אתר ${k+1} מתוך ${NU_INJ.length} · אתר חדש בכל פעם</text>`;
    isv.innerHTML=s;
    $('#nuInjNote').innerHTML='<div class="kicker">אתרים תת־עוריים</div><h4>החלפת האתרים</h4><p>אלה האתרים שהעלונים מציינים. ההוראות של אנאקינרה מונות את הצד החיצוני של הזרועות העליונות, את הבטן למעט אזור של 2 אינץ׳ סביב הטבור, את קדמת אמצע הירכיים ואת החלק העליון החיצוני של העכוז, ומורות למטופל לבחור אתר חדש בכל פעם, דבר שעשוי להפחית את הסיכון למשקעי עמילואיד באתר ההזרקה. נמנעים מעור חבול, אדום, מצולק, קשה, מעובה או גבשושי. לא מצוין מרחק מינימלי מהאתר הקודם. <sup class="c" data-ref="KineretPI" title="Source 127">127</sup></p><div class="hook"><b>לבחינה</b>שיעורי התגובות באתר ההזרקה שונים מאוד: 71% עם אנאקינרה בניסויי דלקת המפרקים השגרונית, 48% עם רילונאספט בשלב המבוקר בפלצבו של CAPS לעומת 13% בפלצבו, ו־10.1% עם קנאקינומאב במחקר ב־TRAPS, HIDS/MKD ו־FMF, כולן קלות או בינוניות. <sup class="c" data-ref="KineretPI,ArcalystPI,IlarisPIG" title="Source 5,105,127">5,105,127</sup></div><div class="pt"><b>במילים פשוטות</b>הזריקה ניתנת בכל פעם במקום אחר, כך שהעור בכל מקום מקבל מנוחה.</div>';
  }
  /* with reduced motion the button steps one site at a time instead of looping */
  if(RM)$('#nuInjPlay').textContent='האתר הבא';
  $('#nuInjPlay').onclick=()=>{
    if(RM){injI=(injI+1)%NU_INJ.length;drawInj(injI);return}
    if(injTimer){clearInterval(injTimer);injTimer=null;$('#nuInjPlay').textContent='מעבר בין האתרים';return}
    $('#nuInjPlay').textContent='עצירה';
    injTimer=setInterval(()=>{injI=(injI+1)%NU_INJ.length;drawInj(injI)},1300);
  };
  const prevH=onHide.nursing;onHide.nursing=()=>{prevH&&prevH();if(injTimer){clearInterval(injTimer);injTimer=null;$('#nuInjPlay').textContent='מעבר בין האתרים'}};
  $('#nuBio').innerHTML=NU_BIO.map(b=>`<div class="nu-card"><span class="tag ${b.s.startsWith('FMF')?'good':'warn'}">${b.s}</span><h5>${b.n}</h5><ul>${b.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${b.c}</p></div>`).join('');

  /* ---- 3 · teaching ---- */
  $('#nuTeachLede').innerHTML='ההנחיה מ־2024 הופכת את ההיענות לטיפול לאבן הפינה של הטיפול, וקובעת שאי אפשר להשיג את המטרות בלי ברית טיפולית לכל החיים. היא גם מונה מידע לקוי על קולכיצין כחסם ליישום. אלה ששת הדברים שהספרות מתעדת שאנשים טועים בהם. <sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>';
  let myth=0;
  function renderMyths(){
    $('#nuMyths').innerHTML=NU_MYTHS.map((m,i)=>`<button class="nu-q" data-nm="${i}" aria-expanded="${i===myth}"><span class="myth">אמונה נפוצה</span><b>${m.m}</b></button>`).join('');
    const M=NU_MYTHS[myth];
    $('#nuMythNote').innerHTML=`<div class="kicker">מה אומרת הספרות</div><h4>${M.t}</h4><div class="nu-ans"><p>${M.a}</p><p><b>${M.q}</b></p></div>`;
  }
  $('#nuMyths').addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;myth=+b.dataset.nm;renderMyths()});
  renderMyths();
  $('#nuTeachCards').innerHTML=`
   <div class="nu-card"><h5>מה ההנחיות מבקשות מההדרכה</h5><ul><li>עיקרון־על 3, שכל חברי הפאנל הסכימו עליו: FMF מחייבת ניהול לכל החיים, ולכן ההיענות לטיפול היא אבן הפינה, והדרכת המטופל והמשפחה חיונית.</li><li>ההדרכה צריכה לכסות את המחלה, התרופות, ההיענות לטיפול, המניעה והניהול העצמי, וסדר היום המחקרי מונה כלים לשיפורה כצורך פתוח.</li><li>הפאנל ציין שהמטופלים העדיפו את המילה "הוליסטי" על פני "ממוקד מטופל".</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025" title="Source 203">203</sup></p></div>
   <div class="nu-card"><h5>באיזו תדירות התרופה אינה נלקחת</h5><ul><li>72.8% מתוך 324 ילדים טורקים קיבלו בסולם MASIF ציון של היענות ירודה, ורבים מהם דיווחו שהם נוטלים את התרופה בקביעות.</li><li>בקרב 104 מבוגרים טורקים, ההיענות הייתה נמוכה אצל 28.8% ובינונית אצל 45.2%.</li><li>בקוהורט ישראלי של 4,526 מטופלים, יחס החזקת התרופה (medication possession ratio) היה מתחת ל־80% אצל יותר ממחציתם, וטיפול בחוסם IL-1 לא שיפר אותו.</li><li>דיווח עצמי מפריז בהערכת ההיענות: רוב 179 המטופלים לא היו בעלי היענות לפי שאלון מתוקף, ואילו הרבה פחות מהם אמרו זאת בעצמם.</li></ul><p class="stage-cap"><sup class="c" data-ref="ErdemTorun2026,Bolek2026,Levinsky2023,Tekgoz2021" title="Source 24,60,148,255">24,60,148,255</sup></p></div>
   <div class="nu-card"><h5>מה נוסה, ומה עבד</h5><ul><li>ניסוי אקראי נתן ל־70 מתבגרים הדרכה פרטנית בניהול המחלה, עם חוברת: ציוני הדיכאון ירדו ואיכות החיים עלתה, ואילו השינוי בחרדה לא היה מובהק. החוקרים מתארים אותו כמחקר ראשון של הדרכת מתבגרים עם FMF בידי צוות סיעודי.</li><li>ניסוי אקראי שני, אצל 43 ילדים, השווה בין משחק לנייד שפותח במיוחד, חוברת, והיעדר התערבות. בקבוצת המשחק חל שיפור במסוגלות העצמית, בניהול התסמינים ובאיכות החיים, וההשפעה נמשכה זמן רב יותר מזו של החוברת.</li><li>בחיפוש מאוקטובר 2026 לא נמצא ניסוי אקראי של התערבות בהובלה סיעודית שהתוצא העיקרי שלה הוא היענות לקולכיצין, ולא נמצא מחקר ב־FMF על החזרת הסבר (teach-back) או על ראיון מוטיבציוני.</li></ul><p class="stage-cap"><sup class="c" data-ref="Kacan2023,KasAlay2026,PubMedSweepNursing2026" title="Source 116,120,219">116,120,219</sup></p></div>
   <div class="nu-card"><h5>לשאול על היענות לטיפול</h5><ul><li>ההנחיה מפנה את הצוותים לנקודות לשיקול (points to consider) של EULAR מ־2020 בנושא אי־היענות, ומסכמת את השיטה כיצירת סביבה בטוחה ושימוש בשאלות פתוחות.</li><li>הנקודות האלה מדווחות ש־30 עד 80% מהאנשים עם מחלות ראומטיות אינם נוטלים את הטיפול כפי שסוכם, ומארגנות את התגובה סביב מניעת אי־היענות, הסרת חסמים מבניים, הערכתה בלי האשמה, והתאמת הפתרון לסיבה.</li><li>מדידת קולכיצין בשיער כבדיקה אובייקטיבית מתוארת בהנחיה כניסיונית ויקרה.</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025,Ritschl2021" title="Source 203,224">203,224</sup></p></div>
   <div class="nu-card"><h5>משפחה, בית ספר וגנטיקה</h5><ul><li>מתואר כמועיל לספר לבית הספר על המחלה, כולל מה לעשות בזמן התקף, וילדים בטיפול ממושך בקולכיצין יכולים להשתתף בכל ענף ספורט. לא נמצא מכתב לדוגמה שפורסם לבית ספר או למקום עבודה.</li><li>FMF עוברת ברובה בתורשה אוטוזומלית רצסיבית, ולכן ההורים הם בדרך כלל נשאים שאינם חולים; אם להורה אחד יש FMF וההורה השני נשא, הסיכוי שילד יחלה הוא 50%. בדיקה גנטית מוצאת וריאנטים רק אצל כ־70 עד 80% מהמטופלים.</li><li>בקרב 90 מטפלים עיקריים של ילדים טורקים, רובם דיווחו על עומס טיפול קל, ומיעוט ניכר על עומס בינוני או קשה.</li></ul><p class="stage-cap"><sup class="c" data-ref="PRINTO2016G,Kosan2019" title="Source 137,216">137,216</sup></p></div>
   <div class="nu-card"><h5>לאן להפנות</h5><ul><li>דפי המידע למשפחות של PRINTO ושל PReS עוסקים בטיפול, בבדיקות המעקב, בבית הספר, בספורט, בהריון, בתורשה ובפרוגנוזה.</li><li>ארגון FMF &amp; AID Global Association מפעיל קו סיוע, חומרי הדרכה וסקר מטופלים בינלאומי.</li><li>Autoinflammatory Alliance הוא ארגון צדקה אמריקאי שמקדם מודעות, אבחון וטיפול.</li></ul><p class="stage-cap"><sup class="c" data-ref="PRINTO2016G,FMFAID,AutoinflammatoryAlliance" title="Source 7,69,216">7,69,216</sup></p></div>`;

  /* ---- 4 · documentation ---- */
  $('#nuDocLede').innerHTML='המלצה 6 בהנחיה מ־2024 מבקשת לעקוב בקביעות אחר התגובה לטיפול, הרעילות וההיענות, כשהתגובה נשפטת לפי תדירות ההתקפים, איכות החיים והמדדים הדלקתיים. המלצה 12 קובעת מערך תוצאים מינימלי. סמנו את מה שראיתם, והרישום ייבנה למטה. <sup class="c" data-ref="Ozen2025" title="Source 203">203</sup>';
  const state={};NU_DOC.forEach(f=>state[f.k]=f.c);
  function renderDoc(){
    $('#nuDocFields').innerHTML=NU_DOC.map(f=>`<label><input type="checkbox" data-nd="${f.k}" ${state[f.k]?'checked':''}><span>${f.l}</span></label>`).join('');
    const lines=NU_DOC.filter(f=>state[f.k]).map(f=>f.v);
    $('#nuDocOut').textContent=lines.length?lines.join('\n'):'עדיין לא סומן דבר.';
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
        s+=`<text x="52" y="${y-2}" class="t-lbl" style="opacity:${on?1:.45}">⁧חודש ${e.m} · ${e.t}</text>`;
        s+=`<text x="52" y="${y+16}" class="t-xs" style="opacity:${on?1:.45}">⁧${e.d.slice(0,58)}…</text>`});
    }else{
      const x0=60,x1=680,xm=m=>lerp(x0,x1,m/12);
      s+=`<line x1="${x0}" x2="${x1}" y1="120" y2="120" class="axis"/>`;
      for(let m=0;m<=12;m+=3)s+=`<text x="${f1(xm(m))}" y="146" class="t-xs t-mid">⁧חודש ${m}</text>`;
      NU_MON.forEach((e,i)=>{const x=xm(e.m),on=T>=e.m,up=i%2===0;
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${up?80:120}" y2="${up?120:160}" style="stroke:var(--line);stroke-width:1.5"/>`;
        s+=`<circle cx="${f1(x)}" cy="120" r="8" style="fill:${on?'var(--sea)':'var(--panel-2)'};stroke:var(--sea);stroke-width:2"/>`;
        s+=`<text x="${f1(x)}" y="${up?70:180}" class="t-lbl t-mid" style="opacity:${on?1:.45}">${e.t}</text>`});
      s+=`<line x1="${f1(xm(Math.min(T,12)))}" x2="${f1(xm(Math.min(T,12)))}" y1="40" y2="200" style="stroke:var(--ink);stroke-width:1.5;opacity:.3"/>`;
    }
    mv.innerHTML=s;
    const reached=NU_MON.filter(e=>T>=e.m).slice(-1)[0]||NU_MON[0];
    $('#nuMonCap').innerHTML=`חודש ${T.toFixed(0)} · <b>${reached.t}</b>. ${reached.d} ${reached.c}`;
  }
  playWire(mr,$('#nuMonPlay'),drawMon,9000,'הפעלה חוזרת','nursing');
  $('#nuDocCards').innerHTML=`
   <div class="nu-card"><h5>מערך התוצאים המינימלי של 2024</h5><ul><li>המלצה 12, שכל חברי הפאנל הסכימו עליה: מערך תוצאים מינימלי צריך לכלול פעילות מחלה קלינית, למשל תדירות ההתקפים לכל 3 חודשים והערכת הרופא; את חוויית המטופל, למשל מדדי תוצאים וחוויה שהמטופל מדווח עליהם; וסמנים ביוכימיים, למשל CRP ו־SAA.</li><li>מדדים ששימשו במחקרי FMF: מספר ההתקפים לכל 3 חודשים, אתר ההתקף, איכות חיים, AIDAI, FMF50 מותאם, ציון גלובלי של הרופא, סולם אנלוגי חזותי של המטופל, CRP, SAA, SF-36, Child Health Questionnaire ו־SF-12.</li><li>הפאנל תיעד שלא הייתה הגדרה מקובלת לפעילות מחלה מינימלית, ושהכלים הקיימים חסרים את נקודת המבט של המטופל.</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025" title="Source 203">203</sup></p></div>
   <div class="nu-card"><h5>בדיקות דם לרעילות, ומחלוקת</h5><ul><li>הרעילות מוערכת בספירת דם מלאה ובתפקודי כבד, עם הפחתת מינון ובירור אם אנזימי הכבד עולים על פי שניים מהגבול העליון של התקין.</li><li>כשתפקוד הכליות ירוד, עוקבים בקפידה אחר קריאטין קינאז, יחד עם סימני הרעלה.</li><li>הפאנל תיעד מחלוקת של ממש: רוב רופאי הילדים מפרשים עלייה באנזימי הכבד כהשפעה של קולכיצין אצל ילדים שחשופים לגורמי פגיעה נוספים, ואילו ראומטולוגים של מבוגרים מפרשים אותה כדלקת שאינה נשלטת כראוי.</li><li>ילדים עשויים להראות רעילות במיוחד בזמן זיהומים נגיפיים, כשאנזימים מוגברים או לויקופניה עשויים לשקף את הזיהום, NSAIDs שניתנים במקביל ואולי גם אנטיביוטיקה, ולא רק את התרופה.</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025" title="Source 203">203</sup></p></div>
   <div class="nu-card"><h5>מעקב בעמילואידוזיס</h5><ul><li>בעמילואידוזיס מסוג AA המטרה היא שליטה מלאה ומתמשכת בדלקת הביוכימית, כפי שהיא נמדדת ב־SAA, או ב־CRP רגיש כש־SAA אינו זמין או יקר.</li><li>דלקת תת־קלינית מנוטרת באמצעות SAA וחלבון בשתן. ביופסיה חוזרת לצורך מעקב אינה מומלצת.</li></ul><p class="stage-cap"><sup class="c" data-ref="Ozen2025" title="Source 203">203</sup></p></div>
   <div class="nu-card"><h5>לאן הנתונים הולכים</h5><ul><li>מרשם Eurofever, שמתארח באתר PRINTO, אוסף נתונים קליניים וגנטיים בנקודת הבסיס ובחתך רוחב, על פני הקדחות המונוגניות וכמה מצבים קשורים. ב־15 החודשים הראשונים שלו הוא גייס 1,360 מטופלים מ־64 מרכזים ב־28 מדינות, 376 מהם עם FMF.</li><li>המרשם של רשת AIDA פועל על REDCap, עם 3,769 שדות ב־23 כלים, ב־110 מרכזים ב־23 מדינות.</li><li>מרשם אחד לכל המחלות היה בחירה מכוונת, כדי שאפשר יהיה להשוות בין הביטויים הקליניים ולכלול מטופלים שסיווגם אינו ודאי.</li></ul><p class="stage-cap"><sup class="c" data-ref="Toplak2011,DellaCasa2022" title="Source 46,259">46,259</sup></p></div>
   <div class="nu-card"><h5>גדילה בילדים</h5><ul><li>אף אחת מגרסאות ההנחיה אינה מפרטת מרווח זמן או שיטה למעקב גדילה, ולכן האפליקציה אינה קובעת אותם.</li><li>מה שפורסם הוא הרגעה לגבי התוצאה: אצל ילדים שטופלו לאורך 10 שנים הגדילה נשארה באחוזונים התקינים, ומקור המידע למטופלים קובע שעיכוב גדילה אינו בעיה משמעותית.</li></ul><p class="stage-cap"><sup class="c" data-ref="BenChetrit2018Textbook,PRINTO2016G" title="Source 16,216">16,216</sup></p></div>`;
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
const HI_LANES=[['קליניקה ושמות','var(--terra)'],['טיפול','var(--crocus)'],['גנים','var(--sea)'],['מנגנון','var(--gold)'],['קריטריונים והנחיות','var(--good)']];
const HI_EV=[
 {y:1908,l:0,c:'⁧"תסמונת התקפית לא שגרתית"⁩',h:'ג׳ניוויי ומוזנטל: תסמונת התקפית',t:'1908 · תיאור ראשון?',
  txt:`ג׳ניוויי ומוזנטל (Janeway, Mosenthal) תיארו "תסמונת התקפית לא שגרתית, כנראה קרובה להקאות חוזרות" אצל נערה יהודייה צעירה עם התקפי חום קצרים וכאבי בטן. התיאור מצוטט לעתים קרובות כראשון, אף שלא בטוח שמדובר ב־FMF. <sup class="c" data-ref="Janeway1908,Adwan2015" title="Source 1,111">1,111</sup>`},
 {y:1945,l:0,c:'⁧"דלקת צפק התקפית שפירה"⁩',h:'⁧סיגל: "דלקת צפק התקפית שפירה"⁩',t:'1945 ו־1949 · דלקת צפק התקפית שפירה',
  txt:`שפרד סיגל (Sheppard Siegal), רופא מניו יורק, דיווח על 10 מקרים בשם "דלקת צפק התקפית שפירה" (benign paroxysmal peritonitis). תיאור זה נחשב בדרך כלל לתיאור המדויק הראשון. סדרה שנייה פורסמה ב־1949. <sup class="c" data-ref="Siegal1945,Siegal1949,Adwan2015" title="Source 1,241,242">1,241,242</sup>`,
  pt:'הרופא הראשון שתיאר את המחלה בבירור כינה אותה דלקת לא מזיקה וחוזרת של קרום הבטן.',
  hook:'סיגל כינה אותה <b>שפירה</b>. הקשר שהתגלה מאוחר יותר למחלת כליות ולעמילואידוזיס הראה שאינה כזו.'},
 {y:1948,l:0,c:'⁧"המחלה המחזורית"⁩',h:'⁧ריימן: "המחלה המחזורית"⁩',t:'1948 · המחלה המחזורית',
  txt:`הובארט ריימן (Hobart Reimann), שעבד אז באוניברסיטה האמריקאית בביירות, קיבץ חום חוזר, דלקת הצפק, נויטרופניה מחזורית וכאבי פרקים לסירוגין תחת השם "המחלה המחזורית" (periodic disease), והדגיש את המחזוריות הסדירה שלהם. למעשה, התקפי FMF אינם סדירים. <sup class="c" data-ref="Reimann1948,Adwan2015,BenChetrit2019" title="Source 1,17,221">1,17,221</sup>`},
 {y:1951.5,l:0,c:'קשר למחלת כליות',h:'קאטן ומאמו: הקשר לכליות',t:'1951–52 · הקשר לכליות',
  txt:`הרופאים הצרפתים קאטן ומאמו (Cattan, Mamou) הצביעו על הקשר למחלת כליות. עמילואידוזיס דווח כ־7 שנים מאוחר יותר על ידי טוקאן (Tuqan) בביירות. שני הדיווחים מוכרים כאן דרך סקירה היסטורית מאוחרת ולא מהמקורות עצמם, ולכן התאריכים והפרטים לא אומתו באופן עצמאי. <sup class="c" data-ref="Adwan2015" title="Source 1">1</sup>`},
 {y:1958,l:0,c:'השם: קדחת ים תיכונית משפחתית',h:'⁧הלר, סוהר ושרף קוראים לה FMF⁩',t:'1958 · "קדחת ים תיכונית משפחתית"',
  txt:`בתל השומר שבישראל נתנו הלר, סוהר ושרף למחלה את השם קדחת ים תיכונית משפחתית (familial Mediterranean fever) והדגישו את אופייה הגנטי. יש מקורות שמתארכים את השם למאמר מוקדם יותר בעברית (לא אומת). <sup class="c" data-ref="Heller1958,Adwan2015" title="Source 1,97">1,97</sup>`,
  hook:'השם מכיל שתי עובדות: המחלה עוברת <b>במשפחות</b>, והיא מרוכזת סביב <b>הים התיכון</b>.'},
 {y:1967,l:0,c:'סקר של 470 מטופלים',h:'סוהר ועמיתיו: סקר של 470 מטופלים',t:'1967 · הסקר של תל השומר',
  txt:`סוהר, גפני, פרס והלר פרסמו סקר של 470 מטופלים יחד עם סקירת ספרות. הוא הפך לבסיס של הקריטריונים הקליניים של תל השומר ושל התיאורים המקובלים של גיל ההופעה ושל מאפייני ההתקפים. <sup class="c" data-ref="Sohar1967" title="Source 244">244</sup> <a href="#dx" data-go="dx">לקריטריונים</a>`},
 {y:1972,l:1,c:'קולכיצין מונע התקפים',h:'גולדפינגר: קולכיצין מונע התקפים',t:'1972 · קולכיצין',
  txt:`המכתב של גולדפינגר (Goldfinger) ב־<i>New England Journal of Medicine</i> דיווח על קולכיצין כטיפול מונע להתקפי FMF. הוא הפך מחלה שהייתה קטלנית לעתים קרובות, קטלנית בגלל עמילואידוזיס, למחלה שאפשר לטפל בה. <sup class="c" data-ref="Goldfinger1972,Pras1998" title="Source 86,215">86,215</sup>`,
  pt:'התברר שכדור יומי מונע את ההתקפים. זה שינה הכול.',
  hook:`לפני הקולכיצין, יותר ממחצית החולים ב־FMF מתו מעמילואידוזיס. <sup class="c" data-ref="Tufan2020" title="Source 263">263</sup>`},
 {y:1974,l:1,c:'ניסויים מבוקרים מאשרים',h:'ניסויים מבוקרים מאשרים את הקולכיצין',t:'1974 · הניסויים',
  txt:`ניסויים מבוקרים ב־1974 אישרו שקולכיצין יומי מונע התקפים: ניסוי של זמר ועמיתיו בתל השומר וניסוי כפול־סמיות של ה־NIH שערכו דינרלו (Dinarello) ועמיתיו, שניהם באותו גיליון של <i>NEJM</i>, ובנוסף מחקר כפול־סמיות של גולדשטיין ושוואבה (Goldstein, Schwabe). <sup class="c" data-ref="Zemer1974,Dinarello1974,Goldstein1974" title="Source 56,87,285">56,87,285</sup>`},
 {y:1986,l:1,c:'⁧חלבון בשתן 1.7% מול 48.9%⁩',h:'זמר: קולכיצין מונע עמילואידוזיס',t:'1986 · מניעת עמילואידוזיס',
  txt:`זמר ועמיתיו עקבו אחרי 1,070 מטופלים במשך 4–11 שנים. אצל מטופלים עם היענות לטיפול שלא היה להם עמילואידוזיס בתחילת המעקב, השכיחות המצטברת של חלבון בשתן (פרוטאינוריה) הייתה 1.7% אחרי 11 שנים, לעומת 48.9% אחרי 9 שנים אצל מטופלים ללא היענות לטיפול. קולכיצין גם ייצב מחלת כליות בשלב מוקדם. <sup class="c" data-ref="Zemer1986" title="Source 286">286</sup>`,
  hook:'התפקיד החשוב ביותר של קולכיצין הוא מניעת <b>עמילואידוזיס</b>, כפי שהראה זמר ב־1986.'},
 {y:1992,l:2,c:'⁧הגן מופה לכרומוזום 16p⁩',h:'⁧פרס ועמיתיו: הגן ממופה ל־16p⁩',t:'1992 · מיפוי הגן',
  txt:`פרס, אקסנטייביץ׳ (Aksentijevich), קסטנר (Kastner) ועמיתיהם ב־NIH ובתל השומר מיפו את הגן של FMF לזרוע הקצרה של כרומוזום 16 בעזרת ניתוח תאחיזה (linkage) ב־27 משפחות יהודיות לא־אשכנזיות, עם ציון LOD מרבי של 19.86. <sup class="c" data-ref="Pras1992" title="Source 214">214</sup>`},
 {y:1997,l:2,c:'⁧MEFV שובט · פירין / מרנוסטרין⁩',h:'⁧שיבוט MEFV: פירין ומרנוסטרין⁩',t:'1997 · שני צוותים, גן אחד',
  txt:`שני קונסורציומים שיבטו את <i>MEFV</i> באופן בלתי תלוי, באזור 16p13.3. הקונסורציום הצרפתי ל־FMF קרא לחלבון מרנוסטרין (marenostrin), מ־<i>mare nostrum</i>, "הים שלנו". הקונסורציום הבינלאומי ל־FMF קרא לו פירין, מצא תעתיק שמיוצר כמעט רק בגרנולוציטים, ומצא הפלוטיפים קדומים המשותפים לאוכלוסיות שונות. <sup class="c" data-ref="FrenchFMF1997,IntFMF1997,Adwan2015" title="Source 1,71,109">1,71,109</sup>`,
  pt:'באותה שנה מצאו שני צוותים את הגן ונתנו לחלבון שלו שני שמות שונים.'},
 {y:1997.6,l:4,c:'פרסום קריטריוני ליבנה',h:'פרסום קריטריוני ליבנה',t:'1997 · קריטריוני ליבנה',
  txt:`ליבנה ועמיתיו בתל השומר פרסמו קריטריונים אבחנתיים עם רגישות של יותר מ־95% וסגוליות של יותר מ־97% ב־105 מטופלים ו־106 נבדקי ביקורת. <sup class="c" data-ref="Livneh1997" title="Source 159">159</sup> <a href="#dx" data-go="dx">נסו אותם</a>`},
 {y:2003,l:2,c:'⁧מאגר הווריאנטים INFEVERS⁩',h:'⁧מאגר הווריאנטים INFEVERS⁩',t:'2003 · INFEVERS',
  txt:`מאגר INFEVERS של מוטציות במחלות דלקתיות תורשתיות הוקם במונפלייה ותואר ב־2003. הוא התרחב למאגר של גנים רבים; ב־2026 נרשמו בו 412 וריאנטים ברצף של <i>MEFV</i>. <sup class="c" data-ref="SarrausteDeMenthiere2003,Milhavet2008,Infevers2026" title="Source 108,175,232">108,175,232</sup>`},
 {y:2011,l:3,c:'⁧עכברים: וריאנטי FMF מגבירים פעילות⁩',h:'⁧צ׳ה: עכברי knock-in מראים רווח בתפקוד⁩',t:'2011 · רווח בתפקוד בעכברים',
  txt:`עכברים שנשאו מקטעי B30.2 אנושיים עם וריאנטי FMF פיתחו דלקת קשה שהונעה על ידי IL-1β, שהייתה תלויה ב־ASC אך לא ב־NLRP3, ואילו עכברים חסרי פירין (knockout) היו בריאים. וריאנטי FMF הופכים את הפירין לפעיל יותר, לא פחות. <sup class="c" data-ref="Chae2011" title="Source 37">37</sup>`},
 {y:2014,l:3,c:'⁧פירין חש בשינוי של Rho⁩',h:'⁧שו: פירין חש בשינוי של Rho⁩',t:'2014 · במה פירין חש',
  txt:`שו (Xu) ועמיתיו במעבדה של פנג שאו (Feng Shao) בבייג׳ינג הראו שפירין מרכיב אינפלמזום של caspase-1 כאשר רעלנים חיידקיים משביתים חלבוני Rho GTPase, למשל הרעלן TcdB של <i>C. difficile</i>. פירין שומר על מתג בתא, ולא מזהה את החיידק עצמו. <sup class="c" data-ref="Xu2014" title="Source 275">275</sup> <a href="#mech" data-go="mech">לצפייה בהנפשה</a>`,
  hook:'פירין הוא <b>שומר</b> של פעילות RhoA, ולא חיישן ישיר של חיידקים (שו 2014).'},
 {y:2016,l:3,c:'⁧RhoA–PKN–14-3-3 מכבים את הפירין⁩',h:'⁧פארק: RhoA–PKN–14-3-3 מכבים את הפירין⁩',t:'2016 · מתג הכיבוי',
  txt:`פארק (Park), ווד (Wood), קסטנר (Kastner) וצ׳ה (Chae) הראו ש־RhoA פעיל שומר על הפירין כבוי. הקינאזות PKN1/PKN2, שמופעלות על ידי RhoA, מזרחנות את הפירין, וזה נקשר לחלבוני 14-3-3 מעכבים. פגם בפרנילציה בחסר מבלונט קינאז משבית את RhoA, וזה מקשר בין FMF לבין HIDS. השאלה אם וריאנטי FMF עצמם מחלישים את הבלם הזה עדיין פתוחה: פארק דיווח על קישור מופחת מאוד של PKN ושל 14-3-3 לפירין המוטנטי, ואילו מאסטרס (Masters) ועמיתיו מצאו שווריאנטי B30.2 של FMF הותירו את זרחון הפירין ואת הקישור ל־14-3-3 כמעט ללא שינוי. <sup class="c" data-ref="Park2016,Masters2016" title="Source 169,207">169,207</sup>`},
 {y:2016.5,l:4,c:'⁧EULAR: קולכיצין לכל החיים⁩',h:'⁧המלצות EULAR ל־FMF⁩',t:'2016 · המלצות EULAR',
  txt:`המלצות EULAR מ־2016 הפכו קולכיצין לכל החיים לעוגן הטיפול, והציעו שהתקף אחד או יותר בחודש, למרות המינון המרבי הנסבל במשך 6 חודשים לפחות, עשוי להצביע על עמידות לקולכיצין. את מקומן תפס עדכון EULAR/PReS 2024, שמשאיר את הקולכיצין כקו הטיפול הראשון. <sup class="c" data-ref="Ozen2016,Ozen2025" title="Source 199,203">199,203</sup>`},
 {y:2018,l:1,c:'⁧CLUSTER: תגובה 61% מול 6%⁩',h:'⁧CLUSTER: ניסוי קנאקינומאב⁩',t:'2018 · CLUSTER',
  txt:`בניסוי CLUSTER בשלב III, ב־FMF עמידה לקולכיצין, ל־61% מהמטופלים שקיבלו קנאקינומאב הייתה תגובה מלאה בשבוע 16, לעומת 6% מאלה שקיבלו פלצבו. <sup class="c" data-ref="DeBenedetti2018" title="Source 44">44</sup> <a href="#ladder" data-go="ladder">סולם הטיפול</a>`},
 {y:2019,l:4,c:'⁧קריטריוני Eurofever/PRINTO⁩',h:'⁧קריטריוני הסיווג Eurofever/PRINTO⁩',t:'2019 · Eurofever/PRINTO',
  txt:`קריטריוני סיווג לקדחות חוזרות שילבו את הגנוטיפ של <i>MEFV</i> עם פריטים קליניים, והוסיפו מערכת קריטריונים קלינית בלבד ל־FMF. בתיקוף, מערכת הגנוטיפ + קליניקה הגיעה לרגישות 0.89 ולסגוליות 1.00. <sup class="c" data-ref="Gattorno2019" title="Source 75">75</sup> <a href="#dx" data-go="dx">נסו את המחשבון</a>`},
 {y:2020,l:2,c:'⁧סימנים לברירה מאוחרת (ראשוני)⁩',h:'פארק: ברירה בידי מגפת הדבר?',t:'2020 · יתרון הישרדותי?',
  txt:`<span class="ev early">ראיות ראשוניות</span> פארק (Park) ועמיתיו מצאו סימנים לברירה חיובית חזקה ומאוחרת יחסית סביב M694V ו־V726A. פירין עם וריאנט FMF נקשר בזיקה חלשה יותר לחלבון האפקטור של חיידק הדבר, YopM, ולכן התאים משחררים יותר IL-1β, ועכברי knock-in שרדו טוב יותר הדבקה ב־<i>Yersinia pestis</i>. הקשר למגפות הדבר ההיסטוריות מתואר כמתיישב עם הנתונים, לא כמוכח. <sup class="c" data-ref="Park2020" title="Source 208">208</sup>`},
 {y:2025,l:4,c:'⁧פרסום עדכון EULAR/PReS⁩',h:'⁧פרסום עדכון EULAR/PReS 2024⁩',t:'2025 · עדכון EULAR/PReS 2024',
  txt:`העדכון, שפורסם ב־2025, משאיר במרכז את הקולכיצין לכל החיים ואת ההיענות לטיפול, הופך שליטה מלאה בדלקת תת־קלינית ליעד מפורש, ומייחס לחסימת IL-1 את הראיות החזקות ביותר כטיפול נוסף. <sup class="c" data-ref="Ozen2025,Cush2025" title="Source 43,203">43,203</sup>`}
];
const HI_ERA=[{f:1900,a:1908,t:'תיאורים ראשונים'},{f:1958,a:1958,t:'שם למחלה'},{f:1972,a:1972,t:'קולכיצין'},{f:1992,a:1992,t:'הגן'},{f:2011,a:2014,t:'המנגנון'},{f:2016.5,a:2025,t:'ההנחיות היום'}];
const HI_NAMES=[['דלקת צפק מחזורית',null],['דלקת צפק התקפית שפירה',1945],['המחלה המחזורית',1948],['פוליסרוזיטיס חוזרת משפחתית',null],['המחלה הארמנית',null],['Maladie périodique (בצרפתית)',null],['מחלת סיגל–קאטן–מאמו',1951.5],['קדחת ים תיכונית משפחתית',1958]];
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
    s+=RC(bx,by,bw,bh,PANEL,8)+T(bx+10,by+16,'t-xs','','בגיליון החולה');
    const nm=yr<1908?['—','']:yr<1945?['⁧"תסמונת התקפית⁩','⁧לא שגרתית"⁩']:yr<1948?['⁧"דלקת צפק⁩','⁧התקפית שפירה"⁩']:['⁧"המחלה המחזורית"⁩',''];
    s+=T(bx+10,by+38,'t-sm','fill:var(--ink)',nm[0])+T(bx+10,by+54,'t-sm','fill:var(--ink)',nm[1]);
    if(yr>=1951.5){const kx=bx+34,ky=by+bh+40;
      s+=`<path d="M${kx} ${ky-19} a19 19 0 1 1 0 38 c5 -7 5 -12 5 -19 c0 -7 0 -12 -5 -19 z" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.6"/>`;
      s+=T(kx+28,ky+4,'t-xs','fill:var(--terra)','כליות');}
    const bW=110,gp=(A.w-20-bW*3)/2,b0=fl-26;
    for(let i=0;i<3;i++){const x=A.x+10+i*(bW+gp),hot=i===1&&yr>=1908;
      s+=RC(x,b0,bW,24,'fill:var(--panel-2);stroke:var(--line)',4)+RC(x+4,b0-10,24,12,PANEL,3);
      s+=`<path d="M${f1(x+30)} ${b0} q${f1((bW-34)/2)} -16 ${bW-34} 0 z" style="fill:${hot?'var(--terra-soft)':'var(--panel)'};stroke:var(--line)"/>`;
      s+=`<circle cx="${x+16}" cy="${b0-4}" r="7" style="fill:${hot?'var(--terra)':'var(--muted)'};opacity:${hot?.9:.45}"/>`;
      s+=LN(x+2,b0+24,x+2,b0+32,'stroke:var(--line);stroke-width:2')+LN(x+bW-2,b0+24,x+bW-2,b0+32,'stroke:var(--line);stroke-width:2');
      if(hot)for(let k=0;k<3;k++)s+=`<path d="M${x+42+k*14} ${b0-18} q4 -7 8 0" style="fill:none;stroke:var(--terra);stroke-width:1.4;opacity:.75"/>`}
    if(yr>=1908)s+=T(A.x+10,fl+30,'t-xs','','התקפי חום קצרים עם כאבי בטן, שחולפים מעצמם');
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
    s+=T(px,py+100,'t-sm','fill:var(--ink)','עוברת במשפחות');
    if(yr>=1967){const dx=A.x+(N?12:170),dy=A.y+(N?158:162);
      for(let k=0;k<47;k++)s+=`<circle cx="${dx+(k%12)*13}" cy="${dy+Math.floor(k/12)*13}" r="3.4" style="fill:var(--terra);opacity:.85"/>`;
      s+=T(dx,dy+64,'t-xs','','⁧כל נקודה = 10 מתוך 470 המטופלים⁩')}
    return s}

  function pills(A,yr,N){let s='';                     // 1972–1991: the bottle, and attacks falling away
    const bx=A.x+10,by=A.y+18;
    s+=RC(bx+8,by,34,14,'fill:var(--crocus);opacity:.85',3)+RC(bx,by+14,50,62,'fill:var(--crocus-soft);stroke:var(--crocus);stroke-width:1.6',6);
    s+=RC(bx+7,by+30,36,20,'fill:var(--panel);stroke:var(--crocus);opacity:.9',3);
    [0,1,2].forEach(k=>{s+=`<ellipse cx="${bx+10+k*16}" cy="${by+88}" rx="7" ry="5" style="fill:var(--crocus);opacity:.8"/>`});
    s+=T(bx,by+108,'t-sm','fill:var(--crocus)','קולכיצין');
    const S=N?{x:A.x+78,y:A.y+20,w:A.w-90,h:80}:{x:A.x+92,y:A.y+20,w:180,h:88};
    s+=T(S.x,S.y-6,'t-xs','','התקפים בחודש');
    s+=LN(S.x,S.y+S.h,S.x+S.w,S.y+S.h,'stroke:var(--muted)')+LN(S.x,S.y,S.x,S.y+S.h,'stroke:var(--muted)');
    const V=[.8,.55,.95,.6,.8,.45,.9,.6,.85,.5,.75,.6,.5,.3,.2,.12,.08,.06,.04,.05,.03,.04,.02,.03];
    let d='';V.forEach((v,k)=>{const x=S.x+4+k*(S.w-8)/(V.length-1),y=S.y+S.h-6-v*(S.h-14);d+=(k?'L':'M')+f1(x)+' '+f1(y)});
    s+=`<path d="${d}" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-linejoin:round"/>`;
    const mk=S.x+4+11.5*(S.w-8)/23;
    s+=LN(mk,S.y,mk,S.y+S.h,'stroke:var(--crocus);stroke-width:1.6;stroke-dasharray:3 3')+T(mk+5,S.y+10,'t-xs','fill:var(--crocus)','התחלת קולכיצין');
    s+=T(S.x+S.w,S.y+S.h+13,'t-xs t-end','','חודשים');
    if(yr>=1974){const tx=N?A.x+206:A.x+96,ty=N?A.y+134:A.y+150;
      for(let k=0;k<3;k++)s+=`<path d="M${tx+k*28} ${ty} l5 6 l10 -13" style="fill:none;stroke:var(--good);stroke-width:2.4;stroke-linecap:round"/>`;
      s+=T(tx,ty-12,'t-xs','fill:var(--good)','⁧3 ניסויים מבוקרים⁩')}
    if(yr>=1986){const B=N?{x:A.x+12,y:A.y+146,lx:118,ly:32}:{x:A.x+292,y:A.y+44,lx:0,ly:74},h0=44;
      s+=T(B.x,B.y,'t-xs','','⁧חלבון בשתן, 9–11 שנים⁩');
      [['⁧1.7% עם היענות⁩',.017,'var(--good)'],['⁧48.9% ללא היענות⁩',.489,'var(--bad)']].forEach(([lb,v,c],k)=>{
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
      s+=T(qx+62,qy+2,'t-sm','fill:var(--gold)','פירין')+T(qx+62,qy+18,'t-sm','fill:var(--gold)','מרנוסטרין');
      const nx=A.x+(N?92:108),ny=A.y+(N?124:196);
      s+=neutro(nx,ny,13,1)+T(nx+18,ny+4,'t-xs','','תעתיק כמעט רק בגרנולוציטים')}
    if(yr>=1997.6){const sx=N?A.x+74:A.x+296,sy=N?A.y+154:A.y+24;
      s+=RC(sx,sy,80,58,PANEL,5);
      for(let k=0;k<3;k++)s+=`<path d="M${sx+10} ${sy+16+k*16} l5 6 l10 -12" style="fill:none;stroke:var(--good);stroke-width:2"/>`+LN(sx+30,sy+18+k*16,sx+70,sy+18+k*16,'stroke:var(--line);stroke-width:2');
      s+=T(sx,sy-6,'t-xs','','קריטריוני ליבנה')}
    if(yr>=2003){const rx=N?A.x+180:A.x+296,ry=N?A.y+170:A.y+124;
      for(let k=2;k>=0;k--)s+=`<ellipse cx="${rx+34}" cy="${ry+10+k*13}" rx="34" ry="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=T(rx,ry-18,'t-sm','fill:var(--ink)','INFEVERS')+T(rx,ry-6,'t-xs','','⁧412 וריאנטים (2026)⁩')}
    return s}

  function cell(A,yr,N){let s='';                      // 2011–2016: the cell, and the brake on pyrin
    const cx=A.x+A.w/2,cy=A.y+(A.h-10)/2,rx=A.w/2-12,ry=(A.h-54)/2,off=yr>=2014;
    s+=T(A.x+6,A.y+12,'t-xs','','בתוך התא');
    s+=`<ellipse cx="${cx}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:4"/>`;
    const Rx=A.x+74,Ry=A.y+92;
    s+=`<circle cx="${Rx}" cy="${Ry}" r="20" style="fill:var(--panel);stroke:var(--sea);stroke-width:2.5;opacity:${off?.5:1}"/>`+T(Rx,Ry+4,'t-lbl t-mid','','RhoA');
    s+=T(Rx,Ry+36,'t-xs t-mid',`fill:${off?'var(--muted)':'var(--sea)'}`,off?'כבוי':'פעיל');
    if(off)s+=`<path d="M${Rx-24} ${Ry-32} l16 14 -16 4z" style="fill:var(--terra)"/>`+T(A.x+70,A.y+52,'t-xs','fill:var(--terra)','רעלן חיידקי');
    s+=RC(Rx+30,Ry-12,50,24,`fill:var(--panel);stroke:var(--muted);opacity:${off?.4:1}`,7)+T(Rx+55,Ry+4,'t-xs t-mid','','PKN1/2');
    s+=LN(Rx+20,Ry,Rx+28,Ry,'stroke:var(--muted);stroke-width:2');
    const Px=A.x+124,Py=A.y+168;
    s+=`<circle cx="${Px}" cy="${Py}" r="13" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:2"/>`+T(Px,Py+4,'t-xs t-mid','fill:var(--terra);font-weight:700','PYD');
    s+=LN(Px+13,Py,Px+38,Py,'stroke:var(--muted);stroke-width:2')+RC(Px+38,Py-14,44,28,'fill:var(--panel);stroke:var(--crocus);stroke-width:2',6)+T(Px+60,Py+4,'t-xs t-mid','','B30.2');
    s+=T(Px-20,Py+4,'t-sm t-end','','פירין');
    if(yr>=2011)s+=`<circle cx="${Px+82}" cy="${Py-14}" r="5" style="fill:var(--bad)"/>`+T(Px+90,Py-16,'t-xs','fill:var(--bad)','⁧וריאנט FMF⁩');
    const lift=off?18:0;
    s+=`<g style="opacity:${off?.3:1}"><path d="M${Px+4} ${Py-26-lift} q0 -20 22 -20 h16 q22 0 22 20" style="fill:none;stroke:var(--sea);stroke-width:6;stroke-linecap:round"/>${T(Px+72,Py-44-lift,'t-xs','fill:var(--sea)','14-3-3')}</g>`;
    if(off){const sx=A.x+(N?280:320),sy=A.y+(N?100:128);
      for(let k=0;k<14;k++){const a=k/14*6.283;s+=`<circle cx="${f1(sx+Math.cos(a)*16)}" cy="${f1(sy+Math.sin(a)*16)}" r="3.6" style="fill:var(--crocus)"/>`}
      s+=T(sx,sy+32,'t-xs t-mid','','⁧צבר ASC⁩');
      const ix=A.x+(N?292:356),iy=A.y+(N?152:104);
      s+=`<circle cx="${ix}" cy="${iy}" r="6" style="fill:var(--terra)"/>`+T(ix+10,iy+4,'t-xs','fill:var(--terra)','IL-1β')}
    s+=T(A.x+6,A.y+A.h-6,'t-xs','',yr>=2016?'⁧RhoA פעיל שומר על הפירין כבוי⁩':off?'⁧פירין עוקב אחרי RhoA, לא אחרי החיידק עצמו⁩':'⁧וריאנטי FMF הופכים את הפירין לפעיל יותר, לא פחות⁩');
    return s}

  function trials(A,yr,N){let s='';                    // 2016–2025: the trial result, then the guidelines
    s+=T(A.x+6,A.y+14,'t-sm','fill:var(--ink)','⁧CLUSTER · תגובה מלאה בשבוע 16⁩');
    const F={x:A.x+(N?86:96),y:A.y+28,w:N?A.w-100:250};
    s+=LN(F.x,F.y+52,F.x+F.w,F.y+52,'stroke:var(--muted)');
    [0,50,100].forEach(v=>{const x=F.x+F.w*v/100;s+=LN(x,F.y+52,x,F.y+57,'stroke:var(--muted)')+T(x,F.y+70,'t-xs t-mid','',v+'%')});
    [['קנאקינומאב',61,'var(--good)'],['פלצבו',6,'var(--muted)']].forEach(([l,v,c],k)=>{const y=F.y+10+k*22;
      s+=T(F.x-8,y+4,'t-xs t-end','',l)+LN(F.x,y,F.x+F.w,y,'stroke:var(--line);stroke-width:1.4');
      const x=F.x+F.w*v/100;s+=RC(x-6,y-6,12,12,`fill:${c}`,2)+T(x+12,y+4,'t-xs',`fill:${c}`,v+'%')});
    if(yr>=2019){const V={x:A.x+6,y:A.y+116};
      s+=T(V.x,V.y,'t-xs','','⁧תיקוף Eurofever/PRINTO⁩');
      [['⁧רגישות 0.89⁩',.89],['⁧סגוליות 1.00⁩',1]].forEach(([l,v],k)=>{const y=V.y+10+k*20;
        s+=RC(V.x,y,140,9,'fill:var(--panel-2)',4)+RC(V.x,y,140*v,9,'fill:var(--good)',4)+T(V.x+148,y+9,'t-xs','',l)})}
    const doc=(x,y,ttl)=>RC(x,y,100,60,PANEL,6)+LN(x+10,y+18,x+90,y+18,'stroke:var(--good);stroke-width:2')+LN(x+10,y+30,x+72,y+30,'stroke:var(--line);stroke-width:2')+LN(x+10,y+42,x+82,y+42,'stroke:var(--line);stroke-width:2')+T(x+50,y+56,'t-xs t-mid','fill:var(--good)',ttl);
    const gy=A.y+(N?172:168);
    s+=doc(A.x+6,gy,'EULAR 2016');
    if(yr>=2025)s+=doc(A.x+112,gy,'EULAR/PReS 2024');
    s+=T(A.x+(N?214:224),gy+34,'t-xs','','קולכיצין נשאר קו ראשון');
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
         o1:'עמילואידוזיס, לרוב קטלני',o2:'ניתן לרוב למניעה',m2:'⁧1986: מניעת עמילואיד⁩'}
      : {XA:150,XB:700,yrX:10,yrY:24,hX:70,hY:23,
         sc:[6,34,708,250],A:{x:16,y:40,w:416,h:238},C:{x:446,y:40,w:262,h:238},
         LY:i=>314+i*50,bandH:46,labUp:0,
         axY:550,tkY:568,brY:556,ticks:[1900,1940,1960,1980,1990,2000,2010,2020,2025],
         obLX:10,obLY:602,obY:590,obMk:636,phTop:285,phBot:622,yY:656,
         o1:'עמילואידוזיס, סיבת מוות מובילה',o2:'עמילואידוזיס ניתן לרוב למניעה',m2:'⁧1986: הוכחה מניעת עמילואיד⁩'};
    XA=L.XA;XB=L.XB;
    const xp=lerp(XA,XB,t),yr=fy(t);
    let s=`<defs><linearGradient id="hiGrad" gradientUnits="userSpaceOnUse" x1="${f1(xOf(1972))}" x2="${f1(xOf(1990))}" y1="0" y2="0"><stop offset="0" style="stop-color:var(--bad)"/><stop offset="1" style="stop-color:var(--good)"/></linearGradient></defs>`;
    const done=HI_EV.filter(e=>e.y<=yr+.01),cur=done.length?done[done.length-1]:null,ph=phaseOf(steps,t);
    // headline
    if(cur)s+=T(L.yrX,L.yrY,'t-big',`font-size:22px;fill:${HI_LANES[cur.l][1]}`,Math.floor(cur.y))+T(L.hX,L.hY,'t-lbl','',cur.h);
    else s+=T(L.yrX,L.yrY,'t-lbl','fill:var(--muted)','⁧לחצו על הפעלה: אבן הדרך הראשונה היא 1908⁩');
    // the scene
    s+=RC(L.sc[0],L.sc[1],L.sc[2],L.sc[3],'fill:var(--field);stroke:var(--line)',12);
    s+=SCENE[ph](L.A,yr,N);
    s+=LN(N?L.C.x:L.C.x-12,N?L.C.y-8:L.A.y,N?L.C.x+L.C.w:L.C.x-12,N?L.C.y-8:L.A.y+L.A.h,'stroke:var(--line)');
    s+=T(L.C.x,L.C.y+12,'t-sm','fill:var(--ink)',HI_ERA[ph].t.toUpperCase());
    const inEra=HI_EV.filter(e=>eraOf(e.y)===ph&&e.y<=yr+.01);
    inEra.forEach((e,k)=>{const y=L.C.y+34+k*20;
      s+=`<circle cx="${L.C.x+5}" cy="${y-4}" r="4" style="fill:${HI_LANES[e.l][1]}"/>`;
      s+=`<text x="${L.C.x+16}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${Math.floor(e.y)}</tspan>  ${e.c}</text>`});
    if(!inEra.length)s+=T(L.C.x+16,L.C.y+34,'t-xs','','סמן הזמן עוד לא הגיע לתקופה הזו');
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
    s+=T(L.obLX,L.obLY,'t-sm','','תחזית')+T(L.obLX+(N?62:0),L.obLY+(N?0:14),'t-xs','','איכותני');
    s+=RC(XA,L.obY,XB-XA,28,'fill:var(--panel-2)',6)+RC(XA,L.obY,Math.max(0,xp-XA),28,'fill:url(#hiGrad);opacity:.85',6);
    s+=`<clipPath id="hiClip"><rect x="${XA}" y="${L.obY}" width="${f1(Math.max(0,xp-XA))}" height="28"/></clipPath><g clip-path="url(#hiClip)">${T(XA+8,L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o1)}${T(xOf(1992),L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o2)}</g>`;
    if(xp>xOf(1972))s+=LN(xOf(1972),L.obY-4,xOf(1972),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1972)-4,L.obMk,'t-xs t-end','','⁧1972: קולכיצין⁩');
    if(xp>xOf(1986))s+=LN(xOf(1986),L.obY-4,xOf(1986),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1986)+4,L.obMk,'t-xs','',L.m2);
    // playhead
    s+=LN(xp,L.phTop,xp,L.phBot,'stroke:var(--ink);stroke-width:1.4;opacity:.55')+`<path d="M${f1(xp-5)} ${L.axY} L${f1(xp+5)} ${L.axY} L${f1(xp)} ${L.axY-8}Z" style="fill:var(--ink)"/>`;
    s+=T(Math.min(XB-6,Math.max(XA+6,xp)),L.yY,'t-xs t-mid','fill:var(--ink)',Math.floor(yr));
    svg.innerHTML=s;
    setSt(ph);
    $('#hiRead').innerHTML=`<span>שנה <b>${Math.floor(yr)}</b></span><span>אבני דרך שעברו <b>${done.length} מתוך ${HI_EV.length}</b></span><span>תקופה <b>${HI_ERA[ph].t}</b></span>`;
    $('#hiNote').innerHTML=cur?`<div class="kicker">${HI_LANES[cur.l][0]}</div>`+noteHTML({t:cur.t,txt:cur.txt,pt:cur.pt,hook:cur.hook}).replace('<div class="kicker"></div>',''):noteHTML({k:'1900',t:'לפני התיאורים הראשונים',txt:'לחום חוזר עם כאבי בטן לא היה שם מוסכם בספרות הרפואית. לחצו על הפעלה, גררו את ציר הזמן או לחצו על נקודה כלשהי.',pt:'הסיפור מתחיל בתיאור מקרה מעורר תהייה ב־1908.'});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,24000,'הפעלה חוזרת','history');
  const setSt=stepWire($('#hiSteps'),steps,rg,draw,stop);
  const jump=y=>{stop();const t=clamp(tOfY(y)+.002);rg.value=t;draw(t)};
  svg.addEventListener('click',e=>{const d=e.target.closest('[data-hy]');if(d)jump(+d.dataset.hy)});
  $('#hiYears').innerHTML=HI_EV.map(e=>`<button class="tag sea" data-hy2="${e.y}"><b style="font-weight:700">${Math.floor(e.y)}</b>&nbsp;${e.h.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</button>`).join('');
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hy2]');if(b){jump(+b.dataset.hy2);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiChips').innerHTML=HI_NAMES.map(([n,y])=>y?`<button class="tag sea" data-hn="${y}">${n}<small>${Math.floor(y)}</small></button>`:`<span class="tag">${n}</span>`).join('');
  $('#hiChips').addEventListener('click',e=>{const b=e.target.closest('[data-hn]');if(b){jump(+b.dataset.hn);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiCards').innerHTML=`
   <div class="card"><h4>פירין או מרנוסטרין?</h4><p>אותו חלבון קיבל ב־1997 שני שמות: <b>פירין</b> מהקונסורציום הבינלאומי ל־FMF (על שם החום) ו<b>מרנוסטרין</b> מהקונסורציום הצרפתי ל־FMF (על שם <i>mare nostrum</i>, השם הרומי של הים התיכון). בשימוש היומיומי "פירין" ניצח. <sup class="c" data-ref="IntFMF1997,FrenchFMF1997" title="Source 71,109">71,109</sup></p></div>
   <div class="card"><h4>"מחזורית" הוא שם מטעה</h4><p>"המחלה המחזורית" של ריימן (Reimann) מ־1948 הדגישה מחזורים סדירים. התקפי FMF מופיעים במרווחים לא סדירים; הדפוס הקבוע כמו שעון שייך ל־PFAPA. <sup class="c" data-ref="Reimann1948,BenChetrit2019,Thomas1999" title="Source 17,221,258">17,221,258</sup> <a href="#ddx" data-go="ddx">השוו את המקצבים</a></p></div>
   <div class="card"><h4>מקטלנית לניתנת לטיפול</h4><p>לפני הקולכיצין, יותר ממחצית החולים ב־FMF מתו מעמילואידוזיס. לפי EULAR 2016, קולכיצין הוריד את הסיכון לעמילואידוזיס בטורקיה מ־60% לפחות מ־13%. <sup class="c" data-ref="Tufan2020,Ozen2016" title="Source 199,263">199,263</sup></p></div>
   <div class="card"><h4>למה הווריאנט כל כך שכיח? <span class="ev early">ראיות ראשוניות</span></h4><p>שיעור הנשאים הוא כ־10% באוכלוסיות של יהודים, ערבים, ארמנים וטורקים. פארק (Park) 2020 קשר זאת לברירה בידי מגפת הדבר: ייתכן שתגובות פירין חזקות יותר עזרו לנשאים לשרוד את <i>Y. pestis</i>. <sup class="c" data-ref="Park2020" title="Source 208">208</sup></p></div>`;
  draw(+rg.value);
};

/* =============== 5.2 flashcards & mnemonics =============== */
const PARTN={1:"חלק 1 · המחלה",2:"חלק 2 · קולכיצין",3:"חלק 3 · סיבוכים ואבחון",4:"חלק 4 · טיפול והעתיד",5:"חלק 5 · היסטוריה"};
const FC=[
 [1,"איזה גן גורם ל־FMF, והיכן הוא נמצא?","MEFV, על הזרוע הקצרה של כרומוזום 16 ‏(16p13.3). יש בו 10 אקסונים, והוא מקודד את הפירין, חלבון באורך 781 חומצות אמינו שנקרא גם מרנוסטרין (marenostrin)."],
 [1,"באיזה תחום של הפירין נמצאים רוב הווריאנטים של FMF?","תחום B30.2 ‏(PRY/SPRY) שבקצה ה־C של החלבון, המקודד באקסון 10. ה׳נקודה החמה׳ היא סביב שיירים 680–726: ‏M680I,‏ M694V,‏ M694I,‏ V726A."],
 [1,"מהי דרך התורשה הקלאסית של FMF?","תורשה אוטוזומלית רצסיבית. יוצאים מן הכלל: וריאנטים שפועלים באופן דומיננטי (M694del, וריאנטים בעמדה T577), ומטופלים רבים עם תמונה קלינית אופיינית שאצלם אפשר לזהות וריאנט אחד בלבד."],
 [1,"איזה גנוטיפ קשור למחלה החמורה ביותר?","הומוזיגוטיות ל־M694V: הופעה מוקדמת יותר, יותר דלקת פרקים ואודם דמוי שושנה, וצורך במינוני קולכיצין גבוהים יותר. אם הוא מעלה גם את הסיכון לעמילואידוזיס, זה שנוי במחלוקת: מחקר ארמני מצא קשר, המרשם הטורקי של 2,838 מטופלים לא מצא, והמחקר הבינלאומי הגדול ביותר מצא שלארץ המגורים משקל גדול יותר."],
 [1,"כיצד מסווג E148Q כיום?","כווריאנט בעל משמעות לא ודאית ב־Infevers, כפי שנבדק באוקטובר 2026. הסיווגים מתעדכנים עם הזמן. לבדו הוא אינו תומך באבחנה של FMF, והוא שכיח אצל יהודים אשכנזים ובכ־29% מהאללים במזרח אסיה."],
 [1,"על מה הפירין ׳שומר׳?","על הפעילות של RhoA. כש־RhoA פעיל, הפירין נשאר כבוי; כש־RhoA מושבת (למשל על ידי רעלנים חיידקיים מסוימים), הפירין מופעל."],
 [1,"מה שומר על הפירין לא פעיל במנוחה?","הקינאזות PKN1 ו־PKN2, שמופעלות על ידי RhoA, מזרחנות את הפירין בעמדות Ser208 ו־Ser242; חלבוני 14-3-3 נקשרים לזרחנים האלה ומחזיקים את הפירין כבוי."],
 [1,"אילו שלושה חלבונים מרכיבים את אינפלמזום הפירין?","פירין (החיישן), ASC (המתאם, שיוצר את ה׳כתם׳, speck) וקספאז-1 (האפקטור)."],
 [1,"מה חותך קספאז-1?","את pro-IL-1β ואת pro-IL-18, והופך אותם לציטוקינים פעילים, וגם את גזדרמין D, שהמקטע שלו מקצה ה־N יוצר נקבוביות בקרום התא."],
 [1,"מהי פירופטוזיס?","מוות תאי דלקתי שבו התא מתפרק (ליטי), דרך נקבוביות של גזדרמין D, ומשחרר IL-1β ואת תוכן התא."],
 [1,"האם הווריאנטים של FMF מגבירים תפקוד או מבטלים אותו?","מגבירים תפקוד (gain of function, היפרמורפיים): הם מורידים את סף ההפעלה. עכברים חסרי פירין (knockout) בריאים; עכברי knock-in עם וריאנטים ב־B30.2 מפתחים דלקת שמונעת על ידי IL-1."],
 [1,"מהי PAAND?","Pyrin-associated autoinflammation with neutrophilic dermatosis: מחלה אוטו-דלקתית הקשורה לפירין עם דרמטוזיס נויטרופילית. זו מחלת פירין דומיננטית שנגרמת מ־S242R (או E244K), המשבש אתר קישור של 14-3-3. היא נבדלת מ־FMF."],
 [1,"כמה זמן נמשך התקף FMF אופייני?","12 עד 72 שעות, ואז הוא חולף מעצמו. קריטריוני ליבנה (Livneh): עם חום (‎≥38 °C), חוזר (‎≥3 התקפים מאותו סוג), 12 h עד 3 ימים."],
 [1,"מהם מאפייני ההתקף השכיחים ביותר?","חום ודלקת הצפק (כל אחד אצל יותר מ־90%), ואחריהם דלקת פרקים (כמחצית), כאבי שרירים, דלקת קרום הריאה (כשליש) ואודם דמוי שושנה."],
 [1,"היכן מופיע אודם דמוי שושנה?","בשוק, בקרסול או בגב כף הרגל: רובד אדום ורגיש שמחקה צלוליטיס וחולף תוך 1–3 ימים."],
 [1,"מהי מיאלגיה ממושכת עם חום (protracted febrile myalgia)?","ביטוי נדיר של כאבי שרירים קשים, חום ו־ESR גבוה מאוד, הנמשך שבועות; הוא מגיב לקורטיקוסטרואידים."],
 [1,"איזה חלק מהמטופלים מתחילים לפני גיל 20?","כ־80–90%; יותר ממחצית בעשור הראשון לחיים."],
 [1,"מהו פנוטיפ II?","עמילואידוזיס מסוג AA כסימן הראשון או היחיד של FMF, בלי התקפים קודמים. הוא נדיר, וההערכות שונות: לכל היותר 0.3% במרשם הטורקי, וכ־0.6% בסקירה מאוחרת יותר שמחבריה מטילים ספק בכך שזו ישות נפרדת."],
 [1,"מהו הגורם המעורר להתקף שמתועד בצורה הטובה ביותר?","לחץ רגשי (במחקר case-crossover כל אירוע מלחיץ העלה את הסיכוי להתקף בכ־70% יומיים לאחר מכן). פעילות גופנית וארוחות שומניות לא העלו אותו."],
 [1,"מהי השערת יתרון ההטרוזיגוט ב־FMF?","ייתכן שנשאים היו עמידים יותר למגפת הדבר: החלבון YopM של Yersinia pestis מדכא פירין רגיל (wild-type) ביעילות פחותה כשהפירין נושא וריאנטים של FMF. יש עדות לברירה חיובית, לא הוכחה."],
 [2,"מאין מגיע הקולכיצין?","מהסתוונית (Colchicum autumnale)."],
 [2,"מדוע קולכיצין מצטבר בנויטרופילים?","לגרנולוציטים אין משאבת יציאה פעילה מסוג P-glycoprotein, ולכן התרופה נלכדת בתוכם; הרמות בכדוריות הלבנות מגיעות לשיא כ־2 ימים אחרי מנה, ויכולות לעלות על שיא הרמה בפלזמה פי יותר מ־16."],
 [2,"למה נקשר קולכיצין?","לבטא-טובולין (β-tubulin) חופשי. הקומפלקס טובולין–קולכיצין חוסם את קצות המיקרוטובולים; בריכוזים גבוהים יותר הוא מפרק מיקרוטובולים."],
 [2,"מהן שתי הדרכים המוצעות שבהן קולכיצין משתיק את הפירין?","(1) פירוק המיקרוטובולים משחרר את GEF-H1 ← RhoA מופעל ← PKN מזרחן מחדש את הפירין. (2) שלב ההפעלה השני של הפירין, שתלוי במיקרוטובולים, לא יכול להסתיים. הנושא עדיין שנוי במחלוקת."],
 [2,"מהן ההשפעות על נויטרופילים מעבר לפירין?","פחות כמוטקסיס, שינוי בהיצמדות (פיזור מחדש של E-selectin על האנדותל, השלה של L-selectin), פחות סופראוקסיד, ודיכוי של הרכבת NLRP3."],
 [2,"אילו אנזימים ומשאבות חשובים לאינטראקציות של קולכיצין?","CYP3A4 ו־P-glycoprotein ‏(ABCB1). מעכבים חזקים כמו קלריתרומיצין, קטוקונזול, ריטונאביר וציקלוספורין מעלים את החשיפה לתרופה פי 2–4."],
 [2,"מהם מינוני ההתחלה לפי EULAR 2016?","‎≤0.5 mg/day מתחת לגיל 5; ‏0.5–1.0 mg/day בגילים 5–10; ‏1.0–1.5 mg/day מעל גיל 10 ובמבוגרים. מקסימום 2 mg/day בילדים, 3 mg/day במבוגרים."],
 [2,"מדוע התועלת של קולכיצין מופיעה לאט?","הוא צריך להצטבר בכדוריות הלבנות, ההתקפים היו מלכתחילה במרווחים של שבועות, המינון מותאם בהדרגה לאורך חודשים, והתועלת הגדולה ביותר שלו (מניעת עמילואידוזיס) מצטברת לאורך שנים."],
 [2,"מהי ההגדרה של EULAR 2016 שמרמזת על עמידות לקולכיצין?","‎≥1 התקף בחודש למרות ‎≥6 חודשים במינון המרבי הנסבל, אצל מטופל שמקפיד על הטיפול."],
 [2,"עד כמה שכיחה עמידות לקולכיצין?","בערך 5–10%, ועוד 2–5% שאינם סובלים את התרופה. חוסר היענות לטיפול מנפח את שיעור העמידות לכאורה."],
 [2,"מהי תופעת הלוואי השכיחה ביותר של קולכיצין?","תופעות במערכת העיכול: שלשול, התכווצויות בבטן ובחילה, לעיתים קרובות בתחילת הטיפול. שימוש ממושך עלול להפחית את הלקטאז במעי."],
 [2,"מהן הרעילויות החמורות של קולכיצין?","נוירומיופתיה (עם CK מוגבר, במיוחד כשתפקוד הכליות פגוע או בשילוב עם סטטינים), דיכוי מח העצם, ומנת יתר קטלנית. החלון הטיפולי צר."],
 [2,"מה ממליץ EULAR לגבי קולכיצין בהיריון?","לא להפסיק אותו בזמן הניסיון להרות, בהיריון או בהנקה; אין הצדקה לדיקור מי שפיר בגלל קולכיצין."],
 [2,"מה הראה Zemer ב־1986?","שיעור מצטבר של חלבון בשתן של 1.7% אחרי 11 שנים אצל מטופלים שהקפידו על הטיפול, לעומת 48.9% אחרי 9 שנים אצל מי שלא הקפידו: קולכיצין מונע עמילואידוזיס."],
 [3,"מאיזה חלבון עשוי עמילואיד AA?","מעמילואיד A בסרום (SAA), חלבון של התגובה החריפה (acute-phase) שמיוצר בכבד, נחתך מ־122 ל־76 חומצות אמינו ומתקפל באופן שגוי לסיבים של יריעות β."],
 [3,"מהו הסימן הראשון לעמילואידוזיס בכליות?","חלבון בשתן (פרוטאינוריה), שמתקדם לתסמונת נפרוטית ולאי-ספיקת כליות."],
 [3,"כיצד מאשרים עמילואיד בביופסיה?","צביעת קונגו אדום (Congo red) עם שבירה כפולה בצבע ירוק-תפוח באור מקוטב; אימונוהיסטוכימיה נגד SAA מאשרת שהסוג הוא AA."],
 [3,"מהו יעד ה־SAA בעמילואידוזיס מסוג AA?","מתחת ל־10 mg/L ‏(EULAR 2016). Lachmann 2007: המשקעים נסוגו אצל 60% מהמטופלים שחציון ה־SAA שלהם היה ‎<10; הסיכון למוות היה גבוה פי 17.7 באוקטיל ה־SAA העליון לעומת ‎<4 mg/L."],
 [3,"מהו גורם הסיכון החזק ביותר לעמילואידוזיס במחקר הבינלאומי מ־2007?","ארץ המגורים (OR 3.2), ואחריה הומוזיגוטיות ל־M694V, היות המטופל המקרה המוביל במשפחה (proband) ומשך המחלה."],
 [3,"Eurofever/PRINTO 2019: כמה פריטים קליניים נדרשים עם גנוטיפ מאשר?","לפחות 1 מתוך 4 (התקפים של 1–3 ימים, דלקת פרקים, כאב בחזה, כאב בטן). גנוטיפ שאינו מאשר דורש לפחות 2."],
 [3,"מהם הקריטריונים הקליניים בלבד של Eurofever/PRINTO?","לפחות 6 מתוך 9. נוכחות של: מוצא ממזרח הים התיכון, התקפים של 1–3 ימים, כאב בחזה, כאב בטן, דלקת פרקים. היעדר של: דלקת אפטית בפה, פריחה אורטיקריאלית, פריחה מקולופפולרית, בלוטות לימפה כואבות."],
 [3,"מהו הכלל של קריטריוני תל השומר?","2 קריטריונים עיקריים, או 1 עיקרי ועוד 2 משניים. עיקריים: סרוזיטיס (דלקת קרומים) חוזרת עם חום, עמילואידוזיס מסוג AA ללא סיבה אחרת, תגובה לקולכיצין."],
 [3,"איזה רמז מעבדתי מבדיל בין התקף FMF למחלת סטיל (Still)?","פריטין וטסיות אינם עולים בהתקפי FMF, בעוד ש־CRP עולה בכל התקף. במחלת סטיל הפריטין גבוה מאוד."],
 [3,"איזו קדחת מחזורית מגיעה כמו שעון?","PFAPA: התקפים של 3–6 ימים בערך כל 4 שבועות, עם דלקת לוע, אפטות ודלקת בלוטות לימפה בצוואר; מנה אחת של פרדניזון קוטעת את ההתקף."],
 [3,"משך ההתקף ב־TRAPS לעומת FMF?","התקפי TRAPS נמשכים לעיתים קרובות 7 ימים או יותר, עם פריחה נודדת מעל שרירים כואבים ובצקת סביב העיניים; התקף FMF נמשך 12–72 שעות."],
 [3,"איזו בדיקת שתן מתאימה ל־MKD ‏(HIDS)?","חומצה מבלונית בשתן בזמן התקפים (רגישות של כ־92%)."],
 [3,"כריתת תוספתן ב־FMF?","בסדרה אחת 40% עברו כריתת תוספתן, ו־80% מהתוספתנים שנכרתו לא היו מודלקים."],
 [4,"מהו הטיפול בקו הראשון ב־FMF?","קולכיצין יומי לכל החיים, שמתחילים בו ברגע שנקבעת אבחנה קלינית."],
 [4,"מה ממליצות ההנחיות בזמן התקף חריף?","להמשיך במינון הקולכיצין הרגיל, להשתמש ב־NSAIDs להקלה בתסמינים, ולשקול סיבות אחרות כמו דלקת תוספתן."],
 [4,"מה התוצאה המרכזית של ניסוי CLUSTER?","קנאקינומאב 150 mg כל 4 שבועות: תגובה מלאה אצל 61% מהמטופלים עם FMF עמיד לקולכיצין, לעומת 6% בפלצבו; 71% עם 300 mg."],
 [4,"האם מפסיקים קולכיצין כשמוסיפים חוסם IL-1?","לא. לפי ההנחיות ממשיכים בקולכיצין לצד התרופות הביולוגיות, כי ייתכן שהוא עדיין מוריד את הסיכון לעמילואידוזיס."],
 [4,"ניסוי מבוקר אקראי של אנאקינרה ב־FMF עמיד לקולכיצין?","1.7 לעומת 3.5 התקפים בחודש, באנאקינרה לעומת פלצבו (25 מטופלים)."],
 [4,"מהו המעקב המומלץ (EULAR 2016)?","כל 6 חודשים: התקפים, CRP ו/או SAA, ספירת דם, תפקודי כבד וכליות, CK, ובדיקת שתן לחלבון (בכל ביקור)."],
 [4,"חיסונים חיים בזמן טיפול בקנאקינומאב?","העלון ממליץ להימנע מחיסונים חיים בזמן הטיפול ולהשלים את החיסונים לפני תחילתו."],
 [4,"תוחלת החיים ב־FMF מטופלת?","קרובה לנורמלית בקוהורט טורקי; עמילואידוזיס היא הסיבה המובילה לתמותה עודפת."],
 [4,"מה ריפוי יצטרך לעשות?","לתקן או להשתיק את MEFV הנושא את הווריאנט בתאים המיאלואידיים (שמקורם בתאי גזע של מח העצם), או לחסום לאורך זמן את אינפלמזום הפירין. אף טיפול מאושר אינו עושה זאת כיום."],
 [4,"מהו המקרה היחיד שפורסם של השתלה באדם שרלוונטי ל־FMF?","Milledge 2002 ‏(Blood): ילד שעבר השתלה בגלל מחלה אחרת, וה־FMF שלו חלפה; n=1, מעקב של כ־2 שנים."],
 [4,"מדוע סטטינים עולים במחקר על ריפוי?","בתאים, סטטינים מפעילים את אינפלמזום הפירין על ידי דלדול של geranylgeranyl pyrophosphate ‏(Park 2016). המשמעות הקלינית אינה ידועה."],
 [4,"אילו תרופות מאושרות מעכבות את גזדרמין D במעבדה?","דיסולפירם ודימתיל פומרט (שתיהן משנות את Cys191 של GSDMD). אף אחת מהן לא נבדקה ב־FMF."],
 [4,"מה אומרת ההנחיה מ־2024 על קולכיצין בזמן התקף?","המלצה 11: לא להעלות את המינון. להמשיך במינון הרגיל ולהשתמש ב־NSAIDs להקלה בתסמינים. מקור המידע למטופלים אומר במפורש שהעלאת המינון בזמן התקף אינה עוזרת."],
 [4,"לפני שקובעים שמטופל עמיד לקולכיצין, מה חייבים לוודא?","היענות לטיפול. הגדרת הקונצנזוס דורשת התקפים חוזרים, בממוצע אחד או יותר בחודש במשך שלושה חודשים, או דלקת מעבדתית מתמשכת בין התקפים, אחרי שאושרה היענות לטיפול."],
 [4,"מהו AIDAI, ואיזה ציון מעיד על מחלה פעילה?","יומן שממלאים המטופל או ההורה במשך חודש, ובו 12 פריטים שמקבלים 0 או 1 בכל יום. סך של 9 ומעלה מעיד על מחלה פעילה: רגישות 89%, סגוליות 92%. ההנחיה מ־2024 מכנה אותו מדד הפעילות המתוקף היחיד ב־FMF, אם כי יש קשיים ביכולתו לשקף את הפעילות."],
 [4,"לאיזה חוסם IL-1 יש התוויה ל־FMF בעלון האמריקאי?","קנאקינומאב. ההתוויות של אנאקינרה בארה״ב הן דלקת מפרקים שגרונתית, NOMID ו־DIRA, וההתוויות של רילונאספט הן CAPS, שימור הפוגה ב־DIRA ודלקת קרום הלב חוזרת, ולכן בארה״ב שתיהן ניתנות ב־FMF מחוץ להתוויה (off-label)."],
 [4,"כיצד משתווים שיעורי התגובות במקום ההזרקה בין חוסמי IL-1?","אנאקינרה 71% בניסויים בדלקת מפרקים שגרונתית, רילונאספט 48% בשלב המבוקר בפלצבו של ניסויי CAPS לעומת 13% בפלצבו, וקנאקינומאב 10.1% במחקר על TRAPS,‏ HIDS/MKD ו־FMF; כולן קלות או בינוניות."],
 [4,"מהי ׳סערת עמילואיד׳ (amyloid storm)?","חלבון בשתן חמור ופתאומי עם אי-ספיקת כליות שמתקדמת במהירות ועלייה ניכרת בחלבוני התגובה החריפה, במשך ימים עד שבועות. זיהום עורר 17 מתוך 20 המקרים המקוריים, וסקירה מ־2025 העריכה את התמותה ב־33 עד 67%."],
 [4,"מה כולל סט התוצאות המינימלי מ־2024?","מדדים של פעילות המחלה הקלינית, כמו מספר ההתקפים ב־3 חודשים והערכת הרופא, מדדי תוצאה וחוויה שמדווחים על ידי המטופל, וסמנים ביוכימיים כמו CRP ו־SAA."],
 [4,"באיזו תדירות בודקים שתן, לפי ההנחיה מ־2024?","לפחות פעם בשנה, ולעיתים קרובות יותר אם המחלה אינה מאוזנת היטב. הגרסה מ־2016 הייתה מחמירה יותר ודרשה בדיקה בכל ביקור במרפאה."],
 [4,"איזו הנחיה ל־FMF היא העדכנית?","עדכון EULAR/PReS 2024, שפורסם ב־Annals of the Rheumatic Diseases ב־2025. יש בו 4 עקרונות־על ו־12 המלצות, והוא מחליף את 18 ההמלצות של EULAR 2016."],
 [4,"עד כמה חזקות הראיות מניסויים אקראיים לחוסמי IL-1 ב־FMF?","ודאות בינונית, ולא אחידה. בניתוח החוזר של Cochrane רק קנאקינומאב הפחית בבירור את מספר המטופלים עם התקפים (RR 0.41,‏ 95% CI ‏0.26 עד 0.65). רווחי הסמך של אנאקינרה ושל רילונאספט חצו את 1. כל הניסויים היו קטנים."],
 [5,"מי תיאר ׳דלקת צפק התקפית שפירה׳ (benign paroxysmal peritonitis) ב־1945?","שפרד סיגל (Sheppard Siegal), רופא מניו יורק."],
 [5,"מי נתנו לה את השם ׳קדחת ים תיכונית משפחתית׳?","הלר, סוהר ושרף (Heller, Sohar, Sherf) בתל השומר, ישראל, ב־1958."],
 [5,"מתי הוכנס קולכיצין לטיפול ב־FMF?","ב־1972, על ידי גולדפינגר (Goldfinger) במכתב ל־NEJM; ניסויים מבוקרים באו ב־1974."],
 [5,"מתי וכיצד נמצא MEFV?","מופה לזרוע 16p ב־1992; שובט ב־1997 על ידי שני קונסורציומים (הצרפתי: ׳marenostrin׳; הבינלאומי: ׳pyrin׳)."],
 [5,"מה הראו Xu ועמיתיו ב־2014?","שפירין הוא חיישן של מערכת החיסון המולדת, שמרכיב אינפלמזום כאשר רעלנים חיידקיים משנים חלבוני Rho GTPase."]
];
const MN=[
 ["הפירין שומר על RhoA","הפירין הוא ׳שומר׳ של RhoA: ‏RhoA פעיל ← פירין כבוי; RhoA כבוי ← פירין פעיל."],
 ["P-P-14","שני P, כלומר שני זרחנים (Phosphates) בעמדות S208 ו־S242, מאפשרים ל־14-3-3 להחזיק את הפירין."],
 ["חיישן · מתאם · אפקטור","פירין · ASC · קספאז-1: האינפלמזום בשלוש מילים."],
 ["1–3–72","אתר 1 בכל פעם, 3 ימים לכל היותר, 72 שעות: התקף FMF האופייני."],
 ["PAPE","סוגי ההתקף העיקריים: דלקת הצפק (Peritonitis), דלקת פרקים (Arthritis), דלקת קרום הריאה (Pleuritis), אודם דמוי שושנה (Erythema)."],
 ["M694V: ‏V כמו Very bad","להומוזיגוטים ל־M694V יש הפנוטיפ החמור ביותר."],
 ["הסתוונית נלכדת בנויטרופילים","קולכיצין (מהסתוונית) נלכד בנויטרופילים כי חסרה להם משאבת P-gp."],
 ["CYP ו־P-gp: קלריתרומיצין מסוכן","מעכבים של CYP3A4 ושל P-gp (קלריתרומיצין, ציקלוספורין, קטוקונזול, ריטונאביר) הם השותפים המסוכנים."],
 ["מתחילים ב־½, 1, 1½","מינוני ההתחלה של EULAR: ‎≤0.5 mg (מתחת לגיל 5), ‏0.5–1 mg (גיל 5–10), ‏1–1.5 mg (מעל גיל 10 ומבוגרים)."],
 ["2 לילדים, 3 למבוגרים","מינוני הקולכיצין היומיים המרביים שפורסמו."],
 ["עשר שומר על הכליות","SAA מתחת ל־10 mg/L הוא היעד שפורסם בעמילואידוזיס מסוג AA."],
 ["קונגו הופך לירוק","קונגו אדום + אור מקוטב = שבירה כפולה בצבע ירוק-תפוח."],
 ["אחד אם בטוח, שניים אם לא בטוח","Eurofever/PRINTO: גנוטיפ מאשר דורש ‎≥1 פריט קליני; גנוטיפ שאינו מאשר דורש ‎≥2."],
 ["להמשיך, להרגיע, לבדוק","בזמן התקף: להמשיך בקולכיצין, NSAIDs כדי להרגיע את התסמינים, ולבדוק אם יש סיבות אחרות."],
 ["קולכיצין קודם, IL-1 אחר כך, קולכיצין תמיד","סולם הטיפול: התרופות הביולוגיות מתווספות, ולא באות במקום."]
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','כל הכרטיסיות'],...Object.keys(PARTN).map(k=>[k,'חלק '+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=PARTN[c[0]]+' · שאלה';$('#fcTagB').textContent=PARTN[c[0]]+' · תשובה';
    $('#fcFront').textContent=c[1];$('#fcBack').textContent=c[2];$('#fcCount').textContent=`${i+1} מתוך ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
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
 [1,"פירין מוחזק במצב לא פעיל בתאים במנוחה בעיקר משום ש:",["הוא קשור ל־ASC","PKN1/2 מזרחנים אותו וחלבוני 14-3-3 נקשרים אליו","יש בתא קולכיצין","חסר לו תחום PYD"],1,"PKN1/PKN2, שמופעלים על ידי RhoA, מזרחנים את Ser208/Ser242; ‏14-3-3 נקשר ומחזיק את הפירין כבוי."],
 [1,"פירין חש ב:",["DNA חיידקי","יציאת אשלגן מהתא","אובדן הפעילות של RhoA","גבישי חומצת שתן"],2,"הוא שומר על RhoA. רעלנים שמשנים חלבוני Rho GTPase מכבים את RhoA ומפעילים את הפירין. יציאת אשלגן וגבישים הם גורמים שמפעילים את NLRP3."],
 [1,"וריאנטים של FMF בתחום B30.2:",["מבטלים את תפקוד הפירין","מורידים את סף ההפעלה של הפירין","משפיעים רק על תאי כבד","חוסמים את הקישור ל־ASC"],1,"הם היפרמורפיים: תאי מטופלים מגיבים לגירויים חלשים מכדי להפעיל תאים רגילים."],
 [1,"המבצע הסופי של הפירופטוזיס הוא:",["קספאז-3","נקבוביות של גזדרמין D","פרפורין","BAX/BAK"],1,"קספאז-1 חותך את גזדרמין D; המקטע מקצה ה־N יוצר נקבוביות בקרום."],
 [1,"הביטוי השכיח ביותר של התקף במרשמים גדולים:",["דלקת קרום הלב","דלקת הצפק","נפיחות בשק האשכים","אודם דמוי שושנה"],1,"דלקת הצפק וחום מופיעים כל אחד אצל יותר מ־90% במרשם הטורקי."],
 [1,"התקף FMF אופייני נמשך:",["פחות מ־6 שעות","12–72 שעות","7–14 ימים","ברציפות"],1,"קריטריוני ליבנה: 12 h עד 3 ימים, עם חום, חוזר."],
 [1,"איזה גנוטיפ מנבא את המחלה החמורה ביותר?",["הטרוזיגוט ל־E148Q","הומוזיגוט ל־V726A","הומוזיגוט ל־M694V","הטרוזיגוט ל־K695R"],2,"הומוזיגוטיות ל־M694V: הופעה מוקדמת יותר, יותר דלקת פרקים ואודם דמוי שושנה (ELE), וצורך במינוני קולכיצין גבוהים יותר."],
 [1,"לשני נשאים של וריאנטים פתוגניים ב־MEFV נולד ילד. מה הסיכוי שלילד יהיו שני וריאנטים?",["0%","25%","50%","100%"],1,"תורשה אוטוזומלית רצסיבית: 1 מתוך 4 עם שני וריאנטים (ביאללי), 1 מתוך 2 נשאים, 1 מתוך 4 לא נשאים."],
 [1,"אדם עם FMF ושני וריאנטים מתחתן עם נשא. מה הסיכוי של כל ילד לשאת שני וריאנטים?",["25%","50%","75%","100%"],1,"מחצית מהילדים יקבלו שני וריאנטים. מאחר שנשאים שכיחים, ה׳פסאודו-דומיננטיות׳ הזאת יכולה לגרום ל־FMF להיראות דומיננטית באילן היוחסין."],
 [1,"אודם דמוי שושנה מופיע בדרך כלל:",["בפנים","בגו","בשוק, בקרסול או בגב כף הרגל","בכפות הידיים"],2,"רובד אדום ורגיש שמחקה צלוליטיס וחולף תוך 1–3 ימים."],
 [1,"לאיזה גורם מעורר היו הראיות החזקות ביותר במחקר case-crossover?",["ארוחות שומניות","מאמץ גופני מאומץ","לחץ רגשי","משקאות קרים"],2,"כל אירוע מלחיץ העלה את הסיכוי להתקף כעבור 2 ימים בכ־70%; פעילות גופנית וארוחות שומניות לא העלו אותו."],
 [1,"מיאלגיה ממושכת עם חום מגיבה בדרך כלל ל:",["אנטיביוטיקה","קורטיקוסטרואידים","העלאת קולכיצין בלבד","ניתוח"],1,"PFM מגיבה מהר לקורטיקוסטרואידים; אנאקינרה עזרה לילדים שלא הגיבו לסטרואידים."],
 [2,"המטרה המולקולרית הישירה של קולכיצין היא:",["IL-1β","טובולין","קספאז-1","COX-2"],1,"הוא נקשר לטובולין חופשי; הקומפלקס טובולין–קולכיצין חוסם את קצות המיקרוטובולים."],
 [2,"קולכיצין מתרכז בנויטרופילים משום ש:",["יש בהם יותר טובולין מאשר בתאים אחרים","חסרה בהם משאבת יציאה פעילה מסוג P-glycoprotein","הכבד מפריש אותו אליהם באופן פעיל","הוא נקשר להמוגלובין"],1,"בגרנולוציטים אין פעילות של משאבת P-gp, ולכן התרופה נלכדת בתוכם; זו השערה הנתמכת היטב."],
 [2,"איזה שילוב תרופתי עם קולכיצין הוא המסוכן ביותר?",["אזיתרומיצין","קלריתרומיצין","אמוקסיצילין","פרצטמול"],1,"קלריתרומיצין, מעכב חזק של CYP3A4/P-gp, העלה את ה־AUC של קולכיצין בכ־282%; דווח על מקרי מוות כששתי התרופות נרשמו יחד. אזיתרומיצין מעלה אותו הרבה פחות."],
 [2,"מינון ההתחלה שפרסם EULAR 2016 לילד בן 7:",["‎≤0.5 mg/day","0.5–1.0 mg/day","1.0–1.5 mg/day","3 mg/day"],1,"גילים 5–10: ‏0.5–1.0 mg/day. את המינון לאדם מסוים קובע הרופא שלו."],
 [2,"המינון היומי המרבי של קולכיצין למבוגרים, כפי שפורסם (EULAR):",["1 mg","2 mg","3 mg","5 mg"],2,"3 mg/day במבוגרים; 2 mg/day בילדים. ללא שינוי בעדכון 2024."],
 [2,"מדוע לוקח חודשים עד שמלוא התועלת של קולכיצין נראית?",["הוא צריך להפוך למטבוליט פעיל","ההתקפים היו במרווחים של שבועות, המינון מותאם בהדרגה, וההגנה מפני עמילואידוזיס מצטברת לאורך שנים","הוא פועל רק אחרי גיל ההתבגרות","הוא זקוק לוויטמין D"],1,"הרמות בכדוריות הלבנות נבנות תוך ימים עד שבועות, אבל את התגובה אפשר להעריך רק לאורך חודשים; מניעת עמילואידוזיס נמשכת שנים."],
 [2,"בהיריון, EULAR ממליץ שהקולכיצין:",["יופסק עם ההתעברות","יימשך; אין הצדקה לדיקור מי שפיר בגלל קולכיצין בלבד","יוחלף באנאקינרה","יוכפל"],1,"קוהורטים ומטא-אנליזה לא מצאו עלייה בהפלות או במומים מולדים משמעותיים."],
 [2,"תופעת הלוואי השכיחה ביותר של קולכיצין היא:",["נשירת שיער","שלשול ואי-נוחות במערכת העיכול","יתר לחץ דם","עלייה במשקל"],1,"תופעות במערכת העיכול מדווחות אצל עד 20% בתחילת הטיפול."],
 [3,"עמילואיד AA נוצר מ:",["שרשראות קלות של אימונוגלובולין","טרנסתירטין","עמילואיד A בסרום","β2-מיקרוגלובולין"],2,"SAA, חלבון של התגובה החריפה מהכבד, שייצורו מונע על ידי IL-1,‏ IL-6 ו־TNF."],
 [3,"באור מקוטב, עמילואיד שנצבע בקונגו אדום מראה:",["פלואורסצנציה כחולה","שבירה כפולה בצבע ירוק-תפוח","גרגירים שחורים","שבירה כפולה אדומה"],1,"עובדה קלאסית לבחינה."],
 [3,"יעד ה־SAA שפורסם בעמילואידוזיס מסוג AA:",["‎< 10 mg/L","‎< 100 mg/L","‎< 500 mg/L","כל רמה, אם אין התקפים"],0,"Lachmann 2007: המשקעים נסוגו אצל 60% מהמטופלים שחציון ה־SAA שלהם היה ‎<10 mg/L."],
 [3,"במחקר של Touitou מ־2007, גורם הסיכון החזק ביותר לעמילואידוזיס היה:",["מין נקבה","ארץ המגורים","E148Q","הגיל בהופעת המחלה"],1,"OR 3.2, במקביל לשיעורי תמותת התינוקות, מה שמרמז על גורם סביבתי."],
 [3,"Eurofever/PRINTO 2019: גנוטיפ שאינו מאשר דורש לפחות:",["פריט קליני 1","2 פריטים קליניים","4 פריטים קליניים","6 מתוך 9 פריטים"],1,"גנוטיפ מאשר ‎≥1 מתוך 4; לא מאשר ‎≥2 מתוך 4; קליני בלבד ‎≥6 מתוך 9."],
 [3,"קריטריוני Eurofever/PRINTO נועדו לשמש:",["בדיקה אבחנתית למטופל יחיד","קריטריוני סיווג למחקר","אלגוריתם טיפול","בדיקת סקר גנטית"],1,"הם מסווגים מטופלים לצורכי מחקר; האבחנה נשארת קלינית."],
 [3,"איזו תוצאת מעבדה מדברת נגד מחלת סטיל ובעד התקף FMF?",["CRP גבוה","פריטין וטסיות תקינים למרות CRP גבוה","לויקוציטוזיס","ESR גבוה"],1,"בהתקפי FMF ה־CRP עולה אבל הפריטין והטסיות לא; במחלת סטיל הפריטין גבוה מאוד."],
 [3,"לילד יש התקפי חום של 4 ימים כל 28 יום, עם דלקת לוע ובלוטות לימפה מוגדלות בצוואר. האבחנה הסבירה ביותר:",["FMF","PFAPA","TRAPS","CAPS"],1,"מחזוריות כמו שעון עם דלקת לוע, אפטות ודלקת בלוטות לימפה; מנה אחת של פרדניזון קוטעת את ההתקף."],
 [3,"התקפי חום הנמשכים 2–3 שבועות, עם פריחה נודדת מעל שרירים כואבים ובצקת סביב העיניים, מרמזים על:",["FMF","TRAPS","PFAPA","MKD"],1,"TRAPS ‏(TNFRSF1A, תורשה דומיננטית): ההתקפים נמשכים לעיתים קרובות ‎≥7 ימים."],
 [3,"חומצה מבלונית בשתן בזמן התקפים מכוונת ל:",["MKD/HIDS","CAPS","בהצ׳ט","FMF"],0,"MKD: הופעה בינקות, התלקחויות של 3–7 ימים, לעיתים קרובות בעקבות חיסונים."],
 [3,"הקריטריונים העיקריים של תל השומר כוללים:",["היסטוריה משפחתית","תגובה לקולכיצין רציף","אודם דמוי שושנה","כאבי רגליים במאמץ"],1,"עיקריים: סרוזיטיס חוזרת עם חום, עמילואידוזיס מסוג AA ללא סיבה אחרת, תגובה לקולכיצין. אודם דמוי שושנה והיסטוריה משפחתית הם משניים."],
 [4,"בזמן התקף FMF חריף, ההנחיות ממליצות:",["להפסיק קולכיצין","להמשיך במינון הקולכיצין הרגיל ולהשתמש ב־NSAIDs","להתחיל אנטיביוטיקה","להכפיל את הקולכיצין לשבוע"],1,"ולשקול סיבות אחרות, כמו דלקת תוספתן."],
 [4,"בניסוי CLUSTER, שיעור התגובה המלאה לקנאקינומאב ב־FMF עמיד לקולכיצין היה:",["21%","45%","61%","95%"],2,"61% לעומת 6% בפלצבו; 71% עם העלאת המינון ל־300 mg."],
 [4,"כשמוסיפים חוסם IL-1, הקולכיצין בדרך כלל:",["מופסק","נמשך","מופחת לחצי לצמיתות","מועבר למתן תוך-ורידי"],1,"ממשיכים בו, כי ייתכן שהוא עדיין מוריד את הסיכון לעמילואידוזיס."],
 [4,"איזו בדיקת מעקב מזהה נפרופתיה עמילואידית מוקדמת?",["צילום חזה","בדיקת שתן לחלבון","פריטין בסרום","אק״ג"],1,"EULAR 2016 ממליץ על בדיקת שתן בכל ביקור."],
 [4,"איזו קביעה לגבי ריפוי FMF נכונה כיום?",["עריכה גנטית של MEFV אושרה","אין טיפול מאושר שמרפא FMF; קולכיצין וחסימת IL-1 מאזנים את המחלה","HSCT היא טיפול שגרתי ב־FMF","חוסמי IL-1 מתקנים את הגן"],1,"דרכי הריפוי הן רעיונות מחקריים; הדיווח היחיד על השתלה באדם הוא מקרה בודד."],
 [4,"בעכברים, איזה שינוי גנטי ביטל את הדלקת דמוית ה־FMF שנגרמה מפירין knock-in עם וריאנט ב־B30.2?",["סילוק NLRP3","סילוק ASC או קולטן IL-1","סילוק קספאז-3","סילוק TNF"],1,"אינפלמזום הפירין תלוי ב־ASC ואינו תלוי ב־NLRP3; גם אובדן IL-1R מנע את הדלקת."],
 [4,"מה משותף לדיסולפירם ולדימתיל פומרט במעבדה, בהקשר של אינפלמזומים?",["הם מעכבים את גזדרמין D","הם חוסמים קולטני IL-1","הם נקשרים לטובולין","הם מפעילים את RhoA"],0,"שתיהן משנות את Cys191 של גזדרמין D; אף אחת מהן לא נבדקה ב־FMF."],
 [4,"לפי ההנחיות, בזמן התקף FMF אופייני מינון הקולכיצין צריך:",["להיות מוכפל","להימשך ללא שינוי, עם NSAIDs לתסמינים","להיפסק עד שההתקף חולף","להיות מוחלף בסטרואיד"],1,"המלצה 11 בעדכון 2024. העלאת המינון בזמן התקף אינה עוזרת, ותמיד יש לשקול סיבות אחרות כמו דלקת תוספתן."],
 [4,"סך של 9 ומעלה ביומן AIDAI במשך חודש אחד מעיד על:",["רעילות קולכיצין","מחלה פעילה","עמילואידוזיס","חוסר היענות לטיפול"],1,"בנקודת חתך זו הרגישות הייתה 89% והסגוליות 92%, בהשוואה לקונצנזוס של מומחים שלא ידעו את הציון."],
 [4,"מה מהבאים אינו מתאר את ההתנהגות של דלקת צפק רגילה ב־FMF?",["התנגדות שרירים (guarding) ורגישות בהרפיה (rebound)","חלוף תוך 24 עד 72 שעות","כאב שעובר לרבע הימני התחתון","כאב בטן מפושט"],2,"התנגדות שרירים ורגישות בהרפיה שכיחות ב־FMF, ולכן אינן מבדילות בינה לבין בטן כירורגית. הסימן המבדיל לדלקת תוספתן שפורסם הוא מעבר הכאב לרבע הימני התחתון."],
 [4,"לאיזה חוסם IL-1 יש התוויה ל־FMF בעלון האמריקאי?",["אנאקינרה","קנאקינומאב","רילונאספט","שלושתם"],1,"בארה״ב אנאקינרה ורילונאספט ניתנים ב־FMF מחוץ להתוויה."],
 [4,"לפני שאפשר לקבוע שמטופל עמיד לקולכיצין, ההגדרה דורשת:",["בדיקה גנטית","היענות לטיפול שאושרה","ביופסיית כליה","שישה התקפים"],1,"הגדרת הקונצנזוס דורשת התקפים או דלקת מתמשכת אחרי שאושרה היענות לטיפול, וההנחיה מ־2024 הוסיפה את המילים ׳אצל מטופלים שמקפידים על הטיפול׳ כדי להדגיש זאת."],
 [4,"חלבון בשתן חמור ופתאומי עם קריאטינין שעולה במהירות בעמילואידוזיס של FMF, לעיתים קרובות אחרי זיהום, מתאר:",["רעילות קולכיצין","סערת עמילואיד","מיאלגיה ממושכת עם חום","התקף רגיל"],1,"בסדרה המקורית זיהום עורר 17 מתוך 20 המקרים, ו־16 הגיעו לאי-ספיקת כליות סופנית או למוות בתוך שנה."],
 [5,"קולכיצין ל־FMF דווח לראשונה ב:",["1908","1945","1972","1997"],2,"המכתב של גולדפינגר ל־NEJM; ניסויים מבוקרים באו ב־1974."],
 [5,"MEFV שובט ב־1997 על ידי:",["קבוצה אחת ב־NIH","שני קונסורציומים עצמאיים","צוות יפני","Infevers"],1,"הקונסורציום הצרפתי ל־FMF (marenostrin) והקונסורציום הבינלאומי ל־FMF (pyrin)."]
];
inits.quiz=()=>{
  const F=[['mix','מעורב (20)'],...Object.keys(PARTN).map(k=>[k,'חלק '+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">סיום</div><div class="q">הציון שלכם: ${score} מתוך ${list.length} (${pct}%)</div><p>${pct>=85?'עבודה מצוינת.':pct>=65?'טוב מאוד. כדאי לעבור על השאלות שפספסתם, כאן למטה.':'כדאי לעבור שוב על המודולים ואז לנסות שוב.'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">ניסיון נוסף</button><button class="btn" data-go="review">לכרטיסיות</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>שאלה <b>${i+1} מתוך ${list.length}</b></span><span>ניקוד <b>${score}</b></span><span>${PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'אבגד'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?'נכון.':'לא בדיוק.'}</b> ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?'לשאלה הבאה ←':'לתוצאות'}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};

/* =============== 5.4 glossary =============== */
const GL=[
 ["אודם דמוי שושנה (erysipelas-like erythema)","רובד אדום ורגיש בשוק או בכף הרגל בזמן התקפי FMF.","attack"],
 ["אינפלמזום (inflammasome)","קומפלקס רב-חלבוני שמפעיל את קספאז-1; הפירין יוצר אחד כזה.","mech"],
 ["אנאקינרה (Anakinra)","אנטגוניסט רקומביננטי לקולטן IL-1, שמוזרק מדי יום; משמש ב־FMF עמידה לקולכיצין.","ladder"],
 ["אנזים CYP3A4","אנזים בכבד ובמעי שמפרק את הקולכיצין; מעכביו מעלים את רמות הקולכיצין.","coldose"],
 ["אפרודיסאט (eprodisate)","תרופה שתוכננה להפריע ליצירת סיבי עמילואיד. ניסוי בשלב 3 לא עמד בנקודת הסיום העיקרית שלו.","amyloid"],
 ["אקסון 10","האקסון של MEFV שמקודד את תחום B30.2; שם נמצאים ‏M694V,‏ M680I,‏ M694I ו־V726A.","gene"],
 ["בוסולפן (busulfan)","תרופה כימותרפית שמשמשת לפינוי מח העצם לפני השתלת תאי גזע. הרעילות שלה היא המכשול העיקרי בדרכים המבוססות על תאי גזע מתוקנים גנטית.","cure"],
 ["גזדרמין D (gasdermin D)","חלבון שנחתך על ידי קספאז-1; המקטע שלו מקצה ה־N יוצר נקבוביות בקרום שגורמות לפירופטוזיס.","mech"],
 ["דלקת הצפק (פריטוניטיס)","דלקת של הצפק (peritoneum); סוג התקף ה־FMF השכיח ביותר.","attack"],
 ["דלקת קרום הריאה (פלאוריטיס)","דלקת של קרום הריאה (pleura) שגורמת לכאב חד-צדדי בחזה בזמן נשימה.","attack"],
 ["דלקת תת-קלינית (subclinical inflammation)","CRP/SAA מוגברים בין התקפים, בלי תסמינים; מעלה את הסיכון לעמילואידוזיס.","colmonths"],
 ["הגן MEFV","הגן של FMF, על כרומוזום 16p13.3.","gene"],
 ["הגנוטיפ של SAA1","שונות בגן של עמילואיד A בסרום. הצורה אלפא/אלפא קשורה לסיכון גבוה יותר לעמילואידוזיס.","amyloid"],
 ["הטרוזיגוט מורכב (compound heterozygote)","שני וריאנטים שונים של אותו גן, אחד בכל עותק (למשל M694V/V726A).","gene"],
 ["היענות לטיפול (adherence)","עד כמה אדם נוטל תרופה כפי שנרשמה. היענות נמוכה היא סיבה שכיחה להמשך ההתקפים, ובמחקרים מודדים אותה לפי מילוי מרשמים או שאלונים.","colmonths"],
 ["השפעת מינון גנים (gene dosage effect)","יותר עותקים של וריאנט נותנים השפעה חזקה יותר: תאים עם שני וריאנטים מגיבים יותר מתאים עם וריאנט אחד.","gene"],
 ["השתלת תאי גזע המטופואטיים (HSCT)","השתלה שמחליפה את המערכת יוצרת הדם.","cure"],
 ["וריאנט E148Q","וריאנט שכיח של MEFV באקסון 2, שמסווג ב־Infevers כבעל משמעות לא ודאית נכון לאוקטובר 2026; חדירות נמוכה.","gene"],
 ["וריאנט M694V","הווריאנט השכיח ביותר והחמור ביותר של MEFV באוכלוסיות רבות.","gene"],
 ["וריאנט בעל משמעות לא ודאית (VUS)","אין די ראיות כדי לקבוע שהוא פתוגני או שפיר.","gene"],
 ["חדירות (penetrance)","שיעור האנשים עם גנוטיפ מסוים שאכן מפתחים את המחלה.","what"],
 ["חיישן NLRP3","חיישן אינפלמזום אחר, שמגיב לאותות עקה רבים; עובר מוטציה ב־CAPS.","mech"],
 ["חלבון ASC","חלבון מתאם שמחבר את תחום ה־PYD של הפירין לקספאז-1 ומתפלמר ל׳כתם׳ (speck) יחיד.","mech"],
 ["חלבון C-ריאקטיבי (CRP)","חלבון של התגובה החריפה שמיוצר בכבד.","dx"],
 ["חלבון GEF-H1","משפעל של RhoA שמוחזק על המיקרוטובולים ומשתחרר כשהקולכיצין מפרק אותם.","colin"],
 ["חלבון RhoA","מתג קטן מסוג GTPase; כשהוא קשור ל־GTP הוא פעיל. השבתתו משחררת את הפירין.","mech"],
 ["חלבון בשתן (פרוטאינוריה)","הפרשה של חלבון בשתן; הסימן הראשון לעמילואידוזיס בכליות.","amyloid"],
 ["חלבוני 14-3-3","חלבוני פיגום שנקשרים לעמדות Ser208/Ser242 המזורחנות של הפירין ומחזיקים אותו במצב לא פעיל.","mech"],
 ["חלבוני התגובה החריפה (acute-phase reactants)","חלבוני דם שעולים בדלקת: CRP,‏ SAA, פיברינוגן; גם שקיעת הדם (ESR) עולה.","dx"],
 ["חסר במבלונט קינאז (MKD, HIDS)","Mevalonate kinase deficiency: קדחת מחזורית שמתחילה בינקות; RhoA כבוי מבחינה תפקודית, וכך משתחרר הפירין.","ddx"],
 ["טבלת פאנט (Punnett square)","טבלה שמראה את צירופי האללים האפשריים אצל הצאצאים.","gene"],
 ["טובולין (tubulin)","אבן הבניין החלבונית של המיקרוטובולים; המטרה שאליה נקשר הקולכיצין.","colin"],
 ["יחס סיכויים (odds ratio, OR)","מדד לכמה תוצאה סבירה יותר בקבוצה אחת מאשר באחרת. OR של 3.2 פירושו בערך פי שלושה בסיכויים (odds), לא פי שלושה בסיכון.","amyloid"],
 ["יתרון ההטרוזיגוט (heterozygote advantage)","הרעיון שנשאים של וריאנט אחד זכו ליתרון הישרדותי, מה שיכול להסביר מדוע הווריאנטים נשארו שכיחים. ב־FMF היתרון המוצע הוא עמידות למגפת הדבר. הראיות מרמזות על כך אך אינן חד-משמעיות, וסחיפה גנטית באוכלוסיות מבודדות היא ההסבר המתחרה.","what"],
 ["כימריזם (chimerism)","החלק מתאי הדם של אדם שמקורו בתאי גזע של תורם או בתאי גזע מתוקנים גנטית, אחרי השתלה.","cure"],
 ["כתם ASC ‏(ASC speck)","הגוש הגדול והיחיד של חלבון ASC שנוצר בתא כשאינפלמזום מתרכב. אחד לכל תא, ונראה במיקרוסקופ.","mech"],
 ["מאגר Infevers","מרשם מקוון של וריאנטים בגנים של מחלות אוטו-דלקתיות, עם סיווגי פתוגניות לפי קונצנזוס.","gene"],
 ["מדד AIDAI","Autoinflammatory Diseases Activity Index: יומן חודשי שממלאים המטופל או ההורה, ובו 12 פריטים שמנוקדים בכל יום. תשעה ומעלה מעיד על מחלה פעילה.","nursing"],
 ["מדד FMF50","מדד תגובה: שיפור של 50% לפחות ב־5 מתוך 6 פריטים, בלי שאף פריט מחמיר, שנבדק אחרי 3 עד 6 חודשים.","nursing"],
 ["מדד ISSF","International Severity Scoring System for FMF: תשעה תחומים, ציון מרבי 10, עם טווחים לחומרה קלה, בינונית וקשה.","nursing"],
 ["מוטציית מייסד (founder mutation)","וריאנט שעבר בירושה מאב קדמון משותף והתפשט באוכלוסייה.","what"],
 ["מחזור אנטרו-הפטי (enterohepatic recycling)","תרופה שמופרשת במרה ונספגת מחדש מהמעי, וכך נשארת בגוף זמן רב יותר.","colin"],
 ["מחלת PAAND","מחלת פירין דומיננטית שנגרמת מ־S242R/E244K, עם דרמטוזיס נויטרופילית; אינה FMF.","mech"],
 ["מחלת בהצ׳ט (Behçet disease)","דלקת כלי דם מערכתית עם כיבים חוזרים בפה ובאיברי המין, דלקת הענבייה (uveitis) ופתרגיה; חלק מהאבחנה המבדלת.","ddx"],
 ["מיאלגיה ממושכת עם חום (protracted febrile myalgia)","חום נדיר שנמשך שבועות עם כאבי שרירים קשים; מגיב לסטרואידים.","attack"],
 ["מיאלואבלציה (myeloablation)","הרס של מח העצם בתרופות או בקרינה, כדי לפנות מקום לתאי הגזע המושתלים.","cure"],
 ["מיקרוטובולי (microtubule)","פולימר חלול של טובולין שיוצר את שלד התא; קולכיצין משבש אותו.","colin"],
 ["מרנוסטרין (marenostrin)","השם שנתן הקונסורציום הצרפתי לפירין, מהביטוי mare nostrum (׳הים שלנו׳).","history"],
 ["משאבת P-glycoprotein ‏(P-gp, ABCB1)","משאבת יציאה שדוחפת קולכיצין החוצה מהתאים; רמתה נמוכה בנויטרופילים.","colin"],
 ["נוגדי דלקת שאינם סטרואידים (NSAIDs)","תרופות נוגדות דלקת שאינן סטרואידיות, שמשמשות להקלה בתסמינים בזמן התקפים.","ladder"],
 ["ניסוי CLUSTER","ניסוי אקראי בשלב 3 של קנאקינומאב ב־FMF עמידה לקולכיצין, ב־MKD וב־TRAPS ‏(2018).","ladder"],
 ["נשא (carrier)","אדם עם עותק אחד של וריאנט בגן רצסיבי; בדרך כלל בריא.","gene"],
 ["סולם MASIF","סולם בן 18 פריטים שמודד עד כמה הקולכיצין נלקח בפועל כפי שנרשם, ופותח בילדים.","nursing"],
 ["סט תוצאות מינימלי (minimum outcome set)","הרשימה בהנחיה מ־2024 של מה שכל שירות FMF צריך לתעד: תדירות ההתקפים, מדדים שמדווחים על ידי המטופל, ו־CRP או SAA.","nursing"],
 ["סערת עמילואיד (amyloid storm)","הידרדרות מהירה בעמילואידוזיס מסוג AA, בדרך כלל בעקבות זיהום, עם חלבון בשתן וקריאטינין שעולים במשך ימים עד שבועות.","nursing"],
 ["סערת עמילואיד (amyloid storm)","הידרדרות מהירה בעמילואידוזיס מסוג AA, שלעיתים קרובות מתחילה בזיהום, שבה הקריאטינין והחלבון בשתן לפחות מוכפלים וה־CRP עולה יותר מפי עשרה בתוך שבועיים.","amyloid"],
 ["סרוזה (serosa)","הקרומים החלקים שמצפים את חללי הגוף: הצפק, קרום הריאה, קרום הלב, ה־tunica vaginalis (סביב האשך). FMF גורמת גם לדלקת בקרום הסינוביאלי של המפרקים.","attack"],
 ["עמידות לקולכיצין (colchicine resistance)","התקפים או דלקת שנמשכים למרות המינון המרבי הנסבל, אצל מטופל שמקפיד על הטיפול.","colmonths"],
 ["עמילואיד A בסרום (SAA)","חלבון של התגובה החריפה, והחומר שממנו נוצר עמילואיד AA.","amyloid"],
 ["עמילואידוזיס מסוג AA (AA amyloidosis)","שקיעה באיברים, בעיקר בכליות, של סיבים העשויים מעמילואיד A בסרום; הסכנה העיקרית לטווח ארוך של FMF שאינה מאוזנת.","amyloid"],
 ["עריכת בסיסים (base editing)","עריכה גנטית שמשנה אות אחת ב־DNA בלי לחתוך את שני הגדילים; כבר בשימוש קליני באנמיה חרמשית, ולא נבדקה ב־MEFV.","cure"],
 ["פירופטוזיס (pyroptosis)","מוות תאי דלקתי שבו התא מתפרק, דרך נקבוביות של גזדרמין D.","mech"],
 ["פירין (pyrin)","החלבון של MEFV: חיישן של מערכת החיסון המולדת שמזהה השבתה של RhoA.","mech"],
 ["פנוטיפ II","עמילואידוזיס מסוג AA כסימן הראשון של FMF, בלי התקפים קודמים.","gene"],
 ["פנוטיפ III","שני וריאנטים של MEFV בלי מחלה כלל.","what"],
 ["פסאודו-דומיננטיות (pseudodominance)","מחלה רצסיבית שנראית דומיננטית משום שנשאים שכיחים באוכלוסייה.","gene"],
 ["פרודרום (prodrome)","שלב מקדים של סימני אזהרה לפני התקף, שמרגישים כמחצית מהמטופלים.","attack"],
 ["פרזנטאיזם (presenteeism)","נוכחות בעבודה או בבית הספר תוך תפקוד מתחת ליכולת הרגילה בגלל מחלה.","living"],
 ["פרנילציה (prenylation)","חיבור זנב שומני לחלבון כדי שיוכל להיעגן בקרום. RhoA זקוק לכך כדי לתפקד, וזה מה שמקשר בין חסר במבלונט קינאז לבין הפירין.","mech"],
 ["ציטוקין IL-18","ציטוקין ממשפחת IL-1 שמעובד באינפלמזום.","mech"],
 ["ציטוקין IL-1β","ציטוקין דלקתי מרכזי ופירוגן אנדוגני שמשתחרר מהאינפלמזום.","mech"],
 ["קולכיצין (colchicine)","אלקלואיד מהסתוונית שנקשר לטובולין; טיפול הקו הראשון ב־FMF, לכל החיים.","colin"],
 ["קונגו אדום (Congo red)","צבע שמשמש לזיהוי עמילואיד ברקמת ביופסיה.","amyloid"],
 ["קינאזות PKN1/PKN2","קינאזות שמופעלות על ידי RhoA ומזרחנות את הפירין כדי לשמור אותו כבוי.","mech"],
 ["קנאקינומאב (Canakinumab)","נוגדן חד-שבטי נגד IL-1β שניתן כל 4 שבועות; נבדק בניסוי CLUSTER.","ladder"],
 ["קספאז-1","הפרוטאז שמופעל באינפלמזום; חותך את pro-IL-1β,‏ pro-IL-18 ואת גזדרמין D.","mech"],
 ["קריטריוני Eurofever/PRINTO","קריטריוני סיווג מבוססי ראיות מ־2019 ל־FMF ולקדחות מחזוריות אחרות.","dx"],
 ["קריטריוני ליבנה (Livneh criteria)","קריטריוני האבחון של תל השומר מ־1997, עם פריטים עיקריים, משניים ותומכים.","dx"],
 ["קריטריוני תל השומר","הקריטריונים הקליניים הקלאסיים ל־FMF, מבית החולים תל השומר בישראל.","dx"],
 ["רילונאספט (Rilonacept)","׳מלכודת IL-1׳ שניתנת פעם בשבוע; נבדקה ב־FMF בניסוי אקראי קטן.","ladder"],
 ["שבירה כפולה (birefringence)","פיצול של אור על ידי חומר מסודר. עמילואיד שנצבע בקונגו אדום נראה ירוק-תפוח בין מקטבים מוצלבים.","amyloid"],
 ["שבירה כפולה בצבע ירוק-תפוח (apple-green birefringence)","הצבע שמראה עמילואיד שנצבע בקונגו אדום בין מקטבים מוצלבים.","amyloid"],
 ["שיטת ׳החזר לי׳ (teach-back)","בקשה מהאדם לומר במילים שלו מה הוא עומד לעשות, כדי לבדוק הבנה ולא רק הסכמה.","nursing"],
 ["תורשה אוטוזומלית רצסיבית (autosomal recessive)","דפוס תורשה שבו המחלה מופיעה רק כשיש שני עותקים של וריאנט, אחד מכל הורה.","gene"],
 ["תחום B30.2 ‏(PRY/SPRY)","תחום הפירין שבקצה ה־C, המקודד באקסון 10, שבו מרוכזים רוב הווריאנטים של FMF.","gene"],
 ["תחום PYD (תחום הפירין)","התחום שבקצה ה־N של הפירין, שנקשר ל־ASC.","mech"],
 ["תסמונות CAPS","תסמונות מחזוריות הקשורות לקריופירין, שנגרמות מווריאנטים ב־NLRP3: פריחה אורטיקריאלית, התקפים בעקבות קור, חירשות.","ddx"],
 ["תסמונת PFAPA","קדחת מחזורית, דלקת אפטית בפה, דלקת לוע ודלקת בלוטות לימפה (periodic fever, aphthous stomatitis, pharyngitis, adenitis); התקפי חום ׳כמו שעון׳ אצל ילדים צעירים.","ddx"],
 ["תסמונת TRAPS","תסמונת מחזורית הקשורה לקולטן TNF (TNF receptor-associated periodic syndrome): התקפים ארוכים, פריחה נודדת, בצקת סביב העיניים.","ddx"],
 ["תסמונת נפרוטית (nephrotic syndrome)","איבוד כבד של חלבון בשתן, עם אלבומין נמוך בדם ובצקות. שלב בעמילואידוזיס בכליות.","amyloid"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  function render(){const q=inp.value.trim().toLowerCase();const L=GL.filter(g=>!q||g[0].toLowerCase().includes(q)||g[1].toLowerCase().includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">← ${tname(g[2])}</button></div>`).join('')||'<p>אין מונחים תואמים.</p>';
    $('#glCount').textContent=`${L.length} מתוך ${GL.length} מונחים`}
  inp.addEventListener('input',render);render();
};

/* =============== 5.5 sources =============== */
const AREAN={A:'אפידמיולוגיה, התקפים והיסטוריה',B:'גנטיקה ואבחון',C:'מנגנון',D:'קולכיצין',E:'עמילואידוזיס, טיפול וחיים עם המחלה',F:'מחקר וריפוי'};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','הכול']].concat(Object.entries(AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||s.areas.includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q));if(!show)return'';n++;
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · גם '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${s.link?`<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${s.areas.map(a=>`<span class="tag sea">${AREAN[a]}</span>`).join('')}${s.unverified?'<span class="tag warn">לבדיקה</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`${n} מתוך ${SOURCES.length} מקורות`}
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
