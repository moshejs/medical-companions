/* =============== 6.1 History & people =============== */
const HI_Y0=1935,HI_Y1=2026,hiT=y=>(y-HI_Y0)/(HI_Y1-HI_Y0),hiY=t=>lerp(HI_Y0,HI_Y1,t);
/* milestones: y year, who, n number of people in the silhouette (0 = an institution), idea,
   d short description for the card (no citations: it is drawn in SVG), c the cited note line, k kind */
const HI_MS=[
 {y:1938,who:'Adolph Stern',n:1,idea:'The "border line group"',d:'Patients between neurosis and psychosis',k:'idea',c:`Stern described the "border line group of neuroses" in the Psychoanalytic Quarterly. [[Stern1938]]`},
 {y:1953,who:'Robert Knight',n:1,idea:'"Borderline states"',d:'The label enters wider psychoanalytic use',k:'idea',c:`Knight published "Borderline states"; he and Stern are named as most responsible for introducing the label. [[Knight1953,Gunderson2009Ontogeny]]`},
 {y:1967,who:'Otto Kernberg',n:1,idea:'Borderline personality organisation',d:'Splitting, identity diffusion, lapses in reality testing',k:'idea',c:`Kernberg defined "borderline personality organization", a middle level of personality organisation marked by primitive defences (splitting, projective identification), identity diffusion and lapses in reality testing. [[Kernberg1967,Gunderson2009Ontogeny]]`},
 {y:1968,who:'Grinker and colleagues',n:3,idea:'"The Borderline Syndrome"',d:'An early empirical study of the syndrome',k:'dx',c:`Grinker and colleagues published the empirical study "The Borderline Syndrome". [[Gunderson2009Ontogeny]]`},
 {y:1975,who:'Gunderson & Singer',n:2,idea:'Six descriptive features',d:'Diagnosis at a first interview',k:'dx',c:`Gunderson and Singer reviewed the descriptive literature and proposed six features, among them intense affect, impulsive behaviour and brief psychotic experiences. [[Gunderson1975]] In 1978 seven criteria separated borderline patients from schizophrenic and neurotic-depressed groups with high accuracy. [[Gunderson1978]]`},
 {y:1979,who:'Spitzer, Endicott & Gibbon',n:3,idea:'Borderline split from schizotypal',d:'Criteria built from 808 vs 808 patients',k:'dx',c:`Spitzer, Endicott and Gibbon built two criteria sets from data on 808 borderline and 808 control patients; they became DSM-III borderline and schizotypal personality disorder. [[Spitzer1979]]`},
 {y:1980,who:'American Psychiatric Association',n:0,idea:'BPD enters DSM-III',d:'A defined diagnosis, little changed to DSM-5',k:'dx',c:`BPD was introduced in DSM-III; from DSM-III to DSM-5 its defining criteria saw no major changes. [[Leichsenring2024WP]] Fewer than 15 research reports on BPD appeared before 1980, and more than 275 in 1980–1990. [[Gunderson2009Ontogeny]]`},
 {y:1981,who:'Gunderson and colleagues',n:2,idea:'A structured interview (DIB)',d:'Five areas of functioning; revised as DIB-R',k:'dx',c:`The Diagnostic Interview for Borderline Patients, a semi-structured interview covering five areas of functioning, was published; a revised version (DIB-R) followed. [[Gunderson1981,Zanarini1990DIBR]]`},
 {y:1991,who:'Marsha Linehan',n:1,idea:'First DBT trial',d:'Less self-harm, fewer inpatient days',k:'tx',c:`Linehan and colleagues published the first randomised trial of dialectical behaviour therapy: compared with usual treatment over 1 year, DBT reduced self-harm acts and their medical severity, kept more people in therapy and cut inpatient days. [[Linehan1991]]`},
 {y:1992,who:'World Health Organization',n:0,idea:'ICD-10: emotionally unstable PD',d:'F60.31, borderline type',k:'dx',c:`ICD-10 code F60.31, emotionally unstable personality disorder, borderline type, is the code used in Danish national register studies of BPD. [[Kjaer2020]]`},
 {y:1993,who:'Mary Zanarini',n:1,idea:'The McLean study begins',d:'290 inpatients followed every 2 years',k:'course',c:`From 1992 to 1995 the McLean Study of Adult Development recruited 290 inpatients with BPD and 72 comparison subjects: the first NIMH-funded prospective study of the course of BPD. [[Temes2019,Zanarini2005MSAD]]`},
 {y:1999,who:'Bateman & Fonagy',n:2,idea:'Forerunner of MBT',d:'Partial hospitalisation trial, 38 patients',k:'tx',c:`Bateman and Fonagy's trial of psychoanalytically oriented partial hospitalisation (38 patients, up to 18 months) cut suicidal acts, self-harm and inpatient days compared with standard care. [[Bateman1999]]`},
 {y:2000,who:'Gunderson and colleagues',n:3,idea:'The CLPS study begins',d:'668 adults, 175 with BPD, four US sites',k:'course',c:`The Collaborative Longitudinal Personality Disorders Study enrolled 668 treatment-seeking adults, 175 with BPD. [[Gunderson2000CLPS]]`},
 {y:2003,who:'Zanarini and colleagues',n:3,idea:'The recovery era',d:'68.6% remitted by 6 years',k:'course',c:`MSAD reported remission in 34.5% at 2 years, 49.4% at 4 and 68.6% at 6, with only 5.9% recurrence among remitters; these findings began the "recovery era". [[Zanarini2003Course]]`},
 {y:2009,who:'NICE',n:0,idea:'A first national guideline',d:'"The first comprehensive view"',k:'tx',c:`NICE issued its first national guideline on BPD, described as taking "the first comprehensive view of the disorder". [[NICE2009]]`},
 {y:2010,who:'Zanarini and colleagues',n:3,idea:'93% remission, 50% recovery',d:'10 years of follow-up',k:'course',c:`By 10 years, 93% had a 2-year remission and 50% had recovered; at 16 years remission reached 78–99% and recovery 40–60%, depending on the definition. [[Zanarini2010Recovery,Zanarini2012]] CLPS reported 85% remission and 12% relapse over 10 years in 2011. [[Gunderson2011]]`},
 {y:2013,who:'American Psychiatric Association',n:0,idea:'DSM-5 and the AMPD',d:'Categories kept; a dimensional model added',k:'dx',c:`DSM-5 kept the categorical criteria and added the Section III Alternative Model for Personality Disorders, describing types by impairments in personality functioning plus pathological traits. [[APA2013,Skodol2011]]`},
 {y:2022,who:'World Health Organization',n:0,idea:'ICD-11: severity first',d:'Optional "borderline pattern"',k:'dx',c:`ICD-11 replaced personality-disorder categories with one severity spectrum plus up to five trait domains, "the most radical change in the classification history of personality disorders", and after lengthy debate added an optional borderline pattern descriptor. [[Tyrer2019]] DSM-5-TR, also 2022, keeps the category. [[APA2022]]`},
 {y:2024,who:'American Psychiatric Association',n:0,idea:'A new practice guideline',d:'Treatment of patients with BPD',k:'tx',c:`The APA published a new practice guideline for the treatment of patients with BPD. [[APA2024Guideline]] Psychological or psychosocial treatment is the primary recommended treatment, with medication only as an adjunct. [[Bateman2015Lancet,Bohus2021]]`}];
const HI_STIG=[[1988,'label alone biases judgement'],[2003,'BPD label, less sympathy'],[2008,'US awareness month vote'],[2009,'NIMH: <2% of SZ funding'],[2011,'half of clinicians avoid'],[2024,'connecting language helps']];
const HI_OUT=[[1935,1980,'a psychoanalytic "colloquialism"','var(--storm)','"colloquialism"'],[1980,1991,'a defined diagnosis','var(--dx)','diagnosis'],[1991,2003,'treatable','var(--rx)','treatable'],[2003,2026,'treatable, recovery common','var(--accent)','recovery common']];
const HI_STEPS=[
 {from:0,at:hiT(1953),k:'1938–1967',t:'Psychoanalytic roots',
  txt:`"Borderline" began as a psychoanalytic word for patients who seemed to sit between neurosis and psychosis. Until the 1970s it remained a rarely and inconsistently used "colloquialism within the psychoanalytic fraternity", with schizophrenia as its main reference point. [[Gunderson2009Ontogeny,Stern1938]]`,
  pt:`At first, "borderline" was a vague word doctors used for people they found hard to place.`,
  hook:`Stern 1938 "border line group" → Knight 1953 "Borderline states" → Kernberg 1967 borderline personality organisation. [[Gunderson2009Ontogeny]]`},
 {from:hiT(1968),at:hiT(1975),k:'1968–1979',t:'Describing the syndrome',
  txt:`Researchers began to describe borderline patients by what could be observed. Gunderson and Singer's features and the Spitzer criteria study turned an idea into criteria that could be tested, and separated "borderline personality" from "borderline schizophrenia" (schizotypal personality disorder). [[Gunderson1975,Spitzer1979]]`,
  pt:`Doctors started writing down the signs they could actually see, so they could agree on who had the condition.`,
  hook:`Spitzer 1979 (808 vs 808) split borderline from schizotypal, the basis of DSM-III. [[Spitzer1979]]`},
 {from:hiT(1980),at:hiT(1980.5),k:'1980',t:'DSM-III: a diagnosis',
  txt:`DSM-III made BPD an official diagnosis. Research took off: fewer than 15 reports before 1980, more than 275 in the following decade. [[Leichsenring2024WP,Gunderson2009Ontogeny]]`,
  pt:`Once there were clear rules for the diagnosis, research on BPD grew very quickly.`,
  hook:`BPD entered DSM-III in 1980; its criteria changed little through DSM-5. [[Leichsenring2024WP]]`},
 {from:hiT(1986),at:hiT(1991.5),k:'1988–1999',t:'Treatments that work',
  txt:`The first randomised trials showed that specific psychotherapies help: DBT in 1991 and Bateman and Fonagy's partial hospitalisation programme in 1999. The concept moved from "untreatable neurotics" toward a treatable condition. [[Linehan1991,Bateman1999,Gunderson2009Ontogeny]] In the same era, a 1988 study showed the personality-disorder label itself worked as "an enduring pejorative judgement rather than a clinical diagnosis". [[Lewis1988]]`,
  pt:`In the 1990s, trials showed that particular talking therapies really help people with BPD.`,
  hook:`First DBT RCT: Linehan 1991. MBT's forerunner: Bateman & Fonagy 1999. [[Linehan1991,Bateman1999]]`},
 {from:hiT(2000),at:hiT(2003.5),k:'2000–2012',t:'The recovery era',
  txt:`Long-term studies changed the outlook. MSAD and CLPS found that most people remit and few relapse, although social and work functioning lag. [[Zanarini2003Course,Gunderson2011]] BPD awareness grew too: in 2008 the US House of Representatives unanimously passed a resolution supporting a BPD awareness month, while NIMH funding for BPD (about $6 million a year) was under 2% of that for schizophrenia. [[Gunderson2009Ontogeny]]`,
  pt:`Following people for many years showed that most get much better. BPD "was previously regarded as untreatable"; that view has changed. [[Bohus2021]]`,
  hook:`MSAD 10 years: 93% remission, 50% recovery; CLPS 10 years: 85% remission, 12% relapse. [[Zanarini2010Recovery,Gunderson2011]]`},
 {from:hiT(2012),at:hiT(2022.5),k:'2013–2024',t:'Dimensions and guidelines',
  txt:`Classification turned toward dimensions: DSM-5's alternative model, then ICD-11's severity-first system with an optional borderline pattern. Clinician attitudes are still a problem (nearly half of 706 clinicians preferred to avoid patients with BPD), and co-produced research now asks people with BPD which words help. [[Tyrer2019,APA2013,Black2011Attitudes,vanSchie2024]]`,
  pt:`Today BPD is seen as treatable and is described by how severe it is as well as by its pattern. The words used about it are changing too.`,
  hook:`ICD-11 (2022): severity + up to five trait domains + optional borderline pattern; ICD-10 used F60.31. [[Tyrer2019,Kjaer2020]]`}];
const HI_PAIRS=[['Stern','Named a "border line group" of neuroses'],['Knight','Wrote "Borderline states"'],['Kernberg','Borderline personality organisation: splitting and identity diffusion'],['Gunderson & Singer','Six features for diagnosis at a first interview'],['Spitzer','Criteria sets that split borderline from schizotypal'],['Linehan','The first randomised trial of DBT'],['Bateman & Fonagy','A partial hospitalisation trial, forerunner of MBT'],['Zanarini','A long-term study showing remission is common']];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');let view='people',setSt=()=>{};
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const KC={idea:'var(--storm)',dx:'var(--dx)',tx:'var(--rx)',course:'var(--accent)'};
  /* an institution glyph: a small building */
  const inst=(x,y,s,col)=>`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s/40)})"><path d="M-20 0L0 -12L20 0Z" style="fill:${col}"/><rect x="-18" y="2" width="36" height="4" style="fill:${col}"/>${[-13,-4.5,4.5,13].map(c=>`<rect x="${c-2}" y="7" width="4" height="18" style="fill:${col}"/>`).join('')}<rect x="-20" y="26" width="40" height="5" style="fill:${col}"/></g>`;
  const people=(x,y,n,s,col)=>n===0?inst(x,y+s*.05,s*1.05,col):[...Array(n)].map((_,i)=>person(x+(i-(n-1)/2)*s*.62,y+(n>1&&i%2?s*.08:0),s*(n>1?.86:1),col)).join('');
  const wrap=(str,max)=>{const w=str.split(' '),L=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>max){L.push(l.trim());l=x}else l+=' '+x});if(l.trim())L.push(l.trim());return L};
  function draw(t){const N=vb(svg,'720 420','400 640');const Y=hiY(t),ph=phaseOf(HI_STEPS,t);setSt(ph);
    let cur=-1;HI_MS.forEach((m,i)=>{if(m.y<=Y+.01)cur=i});
    let s=T(N?20:22,28,'From "border line" to recovery','t-big')+T(N?20:22,46,`year ${Math.floor(Y)} · ${view==='people'?'who':'what'} changed the picture`,'t-sm');
    /* card for the current milestone */
    const K=N?{x:20,y:62,w:360,h:178}:{x:22,y:60,w:676,h:150};
    if(cur>=0){const m=HI_MS[cur],col=KC[m.k],pop=ease(ramp(Y,m.y,m.y+1.2)),pp=view==='people';
      s+=`<g style="opacity:${f1(.6+.4*pop)}"><rect x="${K.x}" y="${f1(K.y+6*(1-pop))}" width="${K.w}" height="${K.h}" rx="14" style="fill:var(--panel-2);stroke:${col};stroke-width:1.6"/>`;
      const ix=K.x+(N?60:76),iy=K.y+(N?28:30)+6*(1-pop),isz=N?54:64;
      s+=`<circle cx="${f1(ix)}" cy="${f1(iy+isz*.5)}" r="${f1(isz*.62)}" style="fill:var(--panel);stroke:${col};stroke-width:1.2"/>`;
      s+=pp?people(ix,iy+isz*.1,m.n,isz*.78,col):`<g transform="translate(${f1(ix)} ${f1(iy+isz*.5)})"><path d="M-20 -16H-2Q0 -16 0 -13V18Q-2 15 -6 15H-20Z M20 -16H2Q0 -16 0 -13V18Q2 15 6 15H20Z" style="fill:none;stroke:${col};stroke-width:2.4;stroke-linejoin:round"/>${[-8,-2,4].map(d=>`<line x1="-15" x2="-5" y1="${d}" y2="${d}" style="stroke:${col};stroke-width:1.4"/><line x1="5" x2="15" y1="${d}" y2="${d}" style="stroke:${col};stroke-width:1.4"/>`).join('')}</g>`;
      const tx=K.x+(N?130:160),ty=K.y+(N?34:40)+6*(1-pop),mx=N?24:52;
      s+=T(tx,ty-12,String(m.y===1993?'1992–1995':m.y),'t-sm',`fill:${col};font-weight:600`);
      const head=wrap(pp?m.who:m.idea,N?22:44);head.forEach((l,i)=>{s+=T(tx,ty+8+i*20,l,'t-big','font-size:17px')});
      const sub=wrap(pp?m.idea:m.who,mx),dd=wrap(m.d,mx),by=ty+8+head.length*20+4;
      sub.forEach((l,i)=>{s+=T(tx,by+i*15,l,'t-sm','fill:var(--ink)')});
      dd.forEach((l,i)=>{s+=T(tx,by+sub.length*15+4+i*14,l,'t-xs')});
      s+='</g>'}
    else s+=T(K.x+K.w/2,K.y+K.h/2,'Press Play: the story starts in 1938','t-sm t-mid');
    /* timeline */
    const A=N?{x:28,y:300,w:344}:{x:30,y:262,w:660};
    const tl=tline(A.x,A.y,A.w,{min:1940,max:2020,step:N?20:10,fmt:v=>v,label:''});
    const X=y=>A.x+A.w*(y-HI_Y0)/(HI_Y1-HI_Y0);
    s+=`<line x1="${f1(A.x)}" x2="${f1(A.x+A.w)}" y1="${A.y}" y2="${A.y}" class="axis"/>`;
    for(let v=1940;v<=2020;v+=N?20:10)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${A.y-3}" y2="${A.y+3}" class="axis"/>`+T(X(v),A.y+15,v,'t-xs t-mid');
    s+=`<rect x="${f1(A.x)}" y="${A.y-2}" width="${f1(Math.max(0,X(Y)-A.x))}" height="4" rx="2" style="fill:var(--brand);opacity:.5"/>`;
    HI_MS.forEach((m,i)=>{const on=m.y<=Y,x=X(m.y),lift=(i%3)*(N?7:8),col=KC[m.k];
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${A.y-6}" y2="${A.y-14-lift}" style="stroke:${on?col:'var(--line)'};stroke-width:1.2"/><circle cx="${f1(x)}" cy="${f1(A.y-17-lift)}" r="${i===cur?6:4}" style="fill:${on?col:'var(--panel)'};stroke:${on?col:'var(--line)'};stroke-width:1.5"/>`});
    if(cur>=0){const x=X(HI_MS[cur].y);s+=`<path d="M${f1(x)} ${f1(K.y+K.h)}L${f1(x)} ${A.y-40}" style="stroke:${KC[HI_MS[cur].k]};stroke-width:1;stroke-dasharray:3 3;opacity:.7"/>`}
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${A.y-48}" y2="${A.y+6}" style="stroke:var(--ink);stroke-width:1.4;opacity:.5"/>`;
    const lg=[['idea','ideas'],['dx','diagnosis'],['tx','treatment'],['course','long-term course']];
    lg.forEach(([k,l],i)=>{const lx=A.x+i*(N?86:110);s+=`<circle cx="${lx+4}" cy="${A.y+32}" r="4" style="fill:${KC[k]}"/>`+T(lx+12,A.y+35,l,'t-xs')});
    /* outlook band */
    const O=N?{y:358,h:24}:{y:316,h:22};
    s+=T(A.x,O.y-6,'THE OUTLOOK','t-sm','fill:var(--ink);font-weight:600');
    HI_OUT.forEach(([a,b,l,c,sl],i)=>{const x0=X(a),x1=X(b),vis=clamp((Y-a)/(b-a)),w=(x1-x0)*vis;if(vis<=0)return;
      s+=`<rect x="${f1(x0)}" y="${O.y}" width="${f1(w)}" height="${O.h}" style="fill:${c};opacity:.85"/>`;
      const lab=N||i===1?sl:l;if(!N||i===0||i===3)s+=T(x0+5,O.y+O.h/2+4,lab,'t-xs',`fill:#fff;font-weight:600;opacity:${f1(ramp(vis,.7,.95))}`)});
    if(N){const cur2=HI_OUT.filter(o=>o[0]<=Y).pop();s+=T(A.x,O.y+O.h+14,'now: '+cur2[2],'t-xs','fill:var(--ink)')}
    else s+=T(A.x+A.w,O.y-6,`from "untreatable neurotics" to treatable, with recovery common`,'t-xs t-end');
    /* stigma milestones */
    const Sg=N?{y:420}:{y:362};
    s+=T(A.x,Sg.y,'STIGMA AND AWARENESS','t-sm','fill:var(--ink);font-weight:600');
    HI_STIG.forEach(([y,l],i)=>{if(y>Y)return;const o=ramp(Y,y,y+1.5);
      if(N){const yy=Sg.y+18+i*17;s+=`<path d="M${A.x+4} ${yy-8}l4 4l-4 4l-4 -4z" style="fill:var(--storm);opacity:${f1(o)}"/>`+T(A.x+14,yy,`${y} · ${l}`,'t-xs',`opacity:${f1(o)};fill:var(--ink)`)}
      else{const lx=A.x+Math.floor(i/2)*226,yy=Sg.y+20+(i%2)*16;s+=`<path d="M${lx+4} ${yy-8}l4 4l-4 4l-4 -4z" style="fill:var(--storm);opacity:${f1(o)}"/>`+T(lx+14,yy,`${y} · ${l}`,'t-xs',`opacity:${f1(o)};fill:var(--ink)`);
        s+=`<path d="M${f1(X(y))} ${O.y+O.h+2}l3 4l-3 4l-3 -4z" style="fill:var(--storm);opacity:${f1(o)}"/>`}});
    svg.innerHTML=s;
    const st=HI_STEPS[ph];
    $('#hiNote').innerHTML=noteHTML(st)+(cur>=0?`<div class="kv"><div><dt>${HI_MS[cur].y===1993?'1992–1995':HI_MS[cur].y} · ${HI_MS[cur].who}</dt><dd>${HI_MS[cur].c}</dd></div></div>`:'');
    $('#hiRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>milestones passed <b>${cur+1}</b> of ${HI_MS.length}</span>`}
  const stop=playWire(rg,$('#hiPlay'),draw,30000,'%t:player.replay%','history');
  setSt=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  $$('[data-hiv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.hiv;$$('[data-hiv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* portraits: silhouettes, no photos */
  const PC=['var(--storm)','var(--storm)','var(--storm)','var(--dx)','var(--rx)','var(--rx)','var(--accent)'];
  for(let i=0;i<7;i++){const el=$('#hiPor'+i);if(!el)continue;const two=i===5;
    el.innerHTML=`<circle cx="32" cy="32" r="30" style="fill:var(--panel-2);stroke:${PC[i]};stroke-width:1.5"/>`+(two?person(24,14,36,PC[i])+person(41,16,34,PC[i],{op:.75}):person(32,12,42,PC[i]))}

  /* match the person to the idea */
  const nm=$('#hiNames'),cc=$('#hiConcepts'),msg=$('#hiMsg');let sel=null,done=new Set();
  const order=[3,6,0,5,2,7,1,4];
  function score(){$('#hiScore').innerHTML=`Matched <b>${done.size}</b> of ${HI_PAIRS.length}`}
  function build(){sel=null;done=new Set();
    nm.innerHTML=HI_PAIRS.map((p,i)=>`<button class="btn" draggable="true" data-hin="${i}" aria-pressed="false">${p[0]}</button>`).join('');
    cc.innerHTML=order.map(i=>`<button data-hic="${i}"><span>${HI_PAIRS[i][1]}</span></button>`).join('');
    msg.textContent='';score()}
  function tryMatch(n,c,btn){if(n==null||done.has(n))return;
    if(n===c){done.add(n);btn.classList.add('ok');btn.insertAdjacentHTML('afterbegin',`<b>${HI_PAIRS[n][0]}</b>`);const nb=$(`[data-hin="${n}"]`,nm);nb.disabled=true;nb.setAttribute('aria-pressed','false');nb.draggable=false;
      msg.textContent=done.size===HI_PAIRS.length?'All matched. The full story is in the timeline above.':`Right: ${HI_PAIRS[n][0]}.`}
    else{btn.classList.remove('no');void btn.offsetWidth;btn.classList.add('no');msg.textContent=`Not ${HI_PAIRS[n][0]}: try another idea.`}
    sel=null;$$('[data-hin]',nm).forEach(b=>b.setAttribute('aria-pressed','false'));score()}
  nm.addEventListener('click',e=>{const b=e.target.closest('[data-hin]');if(!b||b.disabled)return;const i=+b.dataset.hin;sel=sel===i?null:i;$$('[data-hin]',nm).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.hin===sel));msg.textContent=sel==null?'':`${HI_PAIRS[i][0]} selected: now choose an idea.`});
  nm.addEventListener('dragstart',e=>{const b=e.target.closest('[data-hin]');if(!b)return;e.dataTransfer.setData('text/plain',b.dataset.hin);e.dataTransfer.effectAllowed='move'});
  cc.addEventListener('click',e=>{const b=e.target.closest('[data-hic]');if(!b||b.classList.contains('ok'))return;if(sel==null){msg.textContent='Choose a name first.';return}tryMatch(sel,+b.dataset.hic,b)});
  cc.addEventListener('dragover',e=>{const b=e.target.closest('[data-hic]');if(!b||b.classList.contains('ok'))return;e.preventDefault();b.classList.add('over')});
  cc.addEventListener('dragleave',e=>{const b=e.target.closest('[data-hic]');if(b)b.classList.remove('over')});
  cc.addEventListener('drop',e=>{const b=e.target.closest('[data-hic]');if(!b)return;e.preventDefault();b.classList.remove('over');const n=e.dataTransfer.getData('text/plain');if(n!=='')tryMatch(+n,+b.dataset.hic,b)});
  $('#hiReset').addEventListener('click',build);
  build();
};
