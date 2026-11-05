/* =============== 2.4 BPD or something else? =============== */
const DF_TRIG=[.07,.16,.21,.33,.45,.52,.61,.74,.83,.92],DF_DEP=[.36,.3,.42,.26,.4,.34,.3,.38,.28,.35];
const dfSpike=(d,r,fa)=>d<=0?0:(1-Math.exp(-d/r))*Math.exp(-d/fa);
const DF_SPK=(()=>{let m=0;for(let i=1;i<400;i++){m=Math.max(m,dfSpike(i/400*.03,.0012,.0035))}return m})();
const dfSm=(u,a,b)=>{const x=clamp((u-a)/(b-a));return x*x*(3-2*x)};
const DF_P=[
 {id:'bpd',n:'BPD',c:'var(--storm)',
  f:u=>{let v=.5;DF_TRIG.forEach((t,i)=>{v-=DF_DEP[i]*dfSpike(u-t,.0012,.0035)/DF_SPK});return v},
  day:u=>{const g=moodF({t0:.22,base:0,peak:1,rise:.025,fall:.2});return .5-.36*g(u)},
  self:u=>{let k=0;DF_TRIG.forEach(t=>{if(u>t)k++});const hi=[0,2,3,5,7,8].indexOf(k)>=0;return hi?.78:.28},
  imp:DF_TRIG.filter((_,i)=>i%2===0).map(t=>t+.006),
  key:['Time scale: hours, rarely days','Trigger: interpersonal (perceived rejection)','Self-concept: alternating']},
 {id:'bip',n:'Bipolar II',c:'var(--dx)',
  f:u=>.5+.32*(dfSm(u,.1,.13)-dfSm(u,.23,.26))-.32*(dfSm(u,.4,.45)-dfSm(u,.82,.88)),
  day:u=>.8+.015*Math.sin(u*20),
  key:['Time scale: days to weeks','Trigger: can occur regardless of events','Family history of bipolar: a key clue']},
 {id:'cptsd',n:'Complex PTSD',c:'var(--hpa)',
  f:u=>.34+.035*Math.sin(u*31)+.02*Math.sin(u*83+1),
  day:u=>.34+.02*Math.sin(u*9),
  self:u=>.2,
  key:['Time scale: chronic and pervasive','History: usually sustained or multiple trauma','Self-concept: stably negative']},
 {id:'adhd',n:'ADHD',c:'var(--accent)',
  f:u=>.5+.07*Math.sin(u*190)+.05*Math.sin(u*71+2)+.03*Math.sin(u*330),
  day:u=>.5+.07*Math.sin(u*40)+.04*Math.sin(u*97),
  imp:[.04,.1,.15,.23,.29,.36,.41,.49,.56,.62,.68,.75,.81,.88,.94],
  key:['Time scale: everyday, smaller swings','Impulsivity: more motor, less tied to stress','Emotion dysregulation: less than in BPD']},
 {id:'dep',n:'Depression',c:'var(--mood)',
  f:u=>.5-.27*(dfSm(u,.06,.16)-dfSm(u,.84,.96)*.55)+.012*Math.sin(u*60),
  day:u=>.23+.01*Math.sin(u*12),
  key:['Time scale: a sustained low','Sudden anger: rare','Co-occurs in most inpatients with BPD']}
];
const DF_STEPS=[
 {from:0,at:.18,k:'Profile 1 · BPD',t:'Hours, after a hurt',
  txt:`In BPD, affective instability comes from marked reactivity of mood: intense dysphoria, irritability or anxiety "usually lasting a few hours and only rarely more than a few days". [[APA2022,Kaess2025]] The shifts are transient and follow interpersonal stressors such as perceived rejection. [[Paris2015,Sharan2023]] Affective instability is the most sensitive criterion (92.8%) but is transdiagnostic, so on its own it separates BPD from bipolar disorder poorly. [[Zimmerman2017BJP,Bayes2020]]`,
  pt:`Moods in BPD can swing several times a week, often after a hurt in a relationship, and settle within hours.`,
  hook:`BPD mood shifts last hours and are reactive: ask what happened just before.`},
 {from:.2,at:.38,k:'Profile 2 · Bipolar II',t:'Days to weeks, with or without a trigger',
  txt:`Bipolar disorder involves sustained mood changes: episodes that last days to weeks and can occur regardless of external events. [[Paris2015,Sharan2023]] The two share mood lability and impulsivity but differ on other validators: childhood sexual abuse, family history of bipolar disorder, self-harm, treatment response and neurobiology. [[Ghaemi2014]] Personality items alone classified 81–84% of people correctly, rising to 92–95% when hypo/manic features were added. [[Bayes2016]]`,
  pt:`In bipolar disorder, a high or low mood settles in and stays for days or weeks.`,
  hook:`Hours (BPD) or days to weeks (bipolar)? A family history of bipolar disorder favours bipolar. [[Bayes2016]]`},
 {from:.4,at:.58,k:'Profile 3 · Complex PTSD',t:'A steady negative self',
  txt:`ICD-11 complex PTSD adds chronic, pervasive disturbances in emotion regulation, self-concept and relationships to the core PTSD symptoms, usually after sustained or multiple trauma. [[Maercker2022]] The self-concept differs: stably negative in complex PTSD, alternating and unstable in BPD (dashed lines). [[Frost2020]] Abandonment fears, unstable self, unstable relationships and impulsiveness each raised the odds of BPD over complex PTSD. [[Cloitre2014]] Both can be diagnosed together.`,
  pt:`In complex PTSD, people often feel steadily bad about themselves. In BPD, the sense of self tends to flip.`,
  hook:`Cloitre's four BPD discriminators: abandonment fears, unstable self, unstable relationships, impulsiveness.`},
 {from:.6,at:.78,k:'Profile 4 · ADHD',t:'Restless, not reactive',
  txt:`ADHD and BPD share impulsivity and emotion dysregulation. Impulsivity in BPD is stress-dependent and linked to poor use of context cues for inhibition, while ADHD shows more motor impulsivity (tick marks). Emotion dysregulation rises from ADHD to BPD to the two combined. [[Ditrich2021]] Lifetime ADHD was found in 27.9% of adult and 22.1% of adolescent inpatients with BPD. [[Zanarini2021Comorbidity]]`,
  pt:`In ADHD, acting fast and restlessness show up most days, stressed or not. In BPD, impulsive acts cluster after emotional storms.`,
  hook:`BPD impulsivity is stress-dependent; ADHD impulsivity is more motor.`},
 {from:.8,at:.98,k:'Profile 5 · Depression',t:'Low and lasting',
  txt:`Major depression is the commonest co-occurring condition: lifetime in 86.6% of adult and 75.0% of adolescent inpatients with BPD. [[Zanarini2021Comorbidity]] One guideline gives bedside cues: sudden anger is rare in depression, and in BPD mistrust comes with anger rather than resignation. [[Sharan2023]] Depression-related social disability often persists even after BPD symptoms remit. [[Gunderson2018]]`,
  pt:`Depression is a long low. BPD and depression often come together, and each needs attention.`,
  hook:`Depression with BPD is the rule, not the exception: treat both.`}
];
const DF_NONE='<span class="df-none">—</span>';
const DF_ROWS=[
 {id:'time',n:'Mood time scale',sh:[0,1,2,3,4],
  c:[`Reactive shifts usually lasting a few hours, rarely more than a few days [[APA2022,Kaess2025]]`,`Sustained episodes of days to weeks; can occur regardless of events [[Paris2015,Sharan2023]]`,`Chronic, pervasive disturbance in emotion regulation [[Maercker2022]]`,`Emotion dysregulation present but less than in BPD; most with both [[Ditrich2021]]`,DF_NONE,DF_NONE],
  out:`Overlaying all five traces on one axis: only BPD has sharp dips lasting hours. Watch the one-day zoom.`},
 {id:'self',n:'Identity and self-concept',sh:[0,2],
  c:[`Alternating, unstable self-concept; identity disturbance is one of the most central criteria [[Frost2020,Peters2023]]`,`Identity disturbance (with abandonment fears) separates BPD from bipolar disorder best [[Bayes2020]]`,`Stably negative self-concept, its most distinctive feature [[Frost2020]]`,DF_NONE,DF_NONE,`Identity disruption much lower than in BPD (d = −1.36) [[Barnicot2026]]`],
  out:`Dashed lines show self-concept: BPD flips between positive and negative, complex PTSD stays low.`},
 {id:'aband',n:'Fear of abandonment',sh:[0,1],
  c:[`Criterion 1; highest specificity and PPV (0.90) against bipolar disorder [[Bayes2020]]`,`Abandonment fears best separate BPD from bipolar disorder [[Bayes2020]]`,`Frantic efforts to avoid abandonment raised the odds of BPD over complex PTSD [[Cloitre2014]]`,DF_NONE,DF_NONE,`Coping with being alone was one of five separating features [[Barnicot2026]]`],
  out:`The triangles mark interpersonal triggers such as perceived rejection: BPD dips follow them; bipolar episodes do not.`},
 {id:'trauma',n:'Trauma history',sh:[0,2],
  c:[`PTSD common but not universal: 30.2% in a US population sample [[Pagura2010PTSD,Zanarini1998AxisI]]`,`Childhood sexual abuse predicted BPD rather than bipolar disorder [[Bayes2016]]`,`Usually follows sustained or multiple trauma exposure [[Maercker2022]]`,`In women with BPD, childhood ADHD went with childhood emotional abuse [[Philipsen2008]]`,DF_NONE,DF_NONE],
  out:`Complex PTSD usually follows sustained or multiple trauma; in BPD, PTSD is common but not universal.`},
 {id:'imp',n:'Impulsivity',sh:[0,3],
  c:[`Stress-dependent, with poor use of context cues for inhibition [[Ditrich2021]]`,`Shared with BPD; separates the two poorly [[Ghaemi2014,Bayes2019]]`,`Impulsiveness raised the odds of BPD over complex PTSD [[Cloitre2014]]`,`More motor impulsivity [[Ditrich2021]]`,DF_NONE,`Impulsivity was one of five separating features [[Barnicot2026]]`],
  out:`Tick marks are impulsive acts: in BPD they cluster after triggers, in ADHD they are spread through ordinary days.`},
 {id:'anger',n:'Anger and mistrust',sh:[0,4],
  c:[`Criterion 8; mistrust comes with anger rather than resignation [[Sharan2023]]`,DF_NONE,DF_NONE,DF_NONE,`Sudden anger is rare [[Sharan2023]]`,DF_NONE],
  out:`BPD and depression together: sharp reactive dips against a sustained low.`},
 {id:'fam',n:'Family history',sh:[0,1],
  c:[`No family history of bipolar disorder predicted BPD over bipolar disorder [[Bayes2016]]`,`Family history is a key differentiator for bipolar II [[Bayes2019,Ghaemi2014]]`,DF_NONE,DF_NONE,DF_NONE,DF_NONE],
  out:`BPD and bipolar II on one axis: the question "does bipolar disorder run in the family?" is one of the strongest separators.`},
 {id:'meds',n:'Response to mood stabilisers',sh:[0,1],
  c:[`Very low-certainty evidence: no effect on BPD severity (SMD −0.07); lamotrigine no better than placebo in LABILE [[StoffersWinterling2022,Crawford2018LABILE]]`,`Misdiagnosis can deprive a person of effective medication for bipolar disorder [[Paris2015]]; treatment response differs [[Ghaemi2014]]`,DF_NONE,DF_NONE,DF_NONE,DF_NONE],
  out:`No medication is approved for BPD itself; mood stabilisers did not improve overall BPD severity in trials. See Medication: the evidence.`},
 {id:'sens',n:'Sensory processing',sh:[],
  c:[DF_NONE,DF_NONE,DF_NONE,DF_NONE,DF_NONE,`Sensory differences were the largest feature favouring autism (d = 1.19) [[Barnicot2026]]`],
  out:`Sensory processing is not a mood trace, so the stage does not change: it is the strongest clue toward autism in women assessed for BPD.`}
];
const DF_CO=[['Any anxiety disorder',89.0,60.6],['Major depression',86.6,75.0],['Complex comorbidity',76.6,40.4],['Substance use disorder',62.1,35.6],['Eating disorder',53.8,30.8],['PTSD',53.3,22.1],['ADHD',27.9,22.1],['Bipolar II',5.5,3.8]];
inits.differential=()=>{
  const svg=$('#dfSvg'),rg=$('#dfT'),note=$('#dfNote');let stopF=null,mode='one',focus=null,fprog=1,setA=()=>{},lastP=-1;
  function plot(x,y,w,h,f,up,col,o={}){const N=o.N||900,n=Math.max(2,Math.round(N*up));let d='';
    for(let i=0;i<=n;i++){const u=up*i/n,v=clamp(f(u),-.02,1.02);d+=(i?'L':'M')+f1(x+w*u)+' '+f1(y+h*(1-v))}
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${o.sw||2.3};stroke-linejoin:round;stroke-linecap:round;opacity:${o.op==null?1:o.op}${o.dash?';stroke-dasharray:5 4':''}"/>`}
  function draw(t){
    const N=vb(svg,'720 380','400 540'),P=phaseOf(DF_STEPS,t),cur=DF_P[P];
    if(P!==lastP){lastP=P;setA(P);if(!focus)note.innerHTML=noteHTML(DF_STEPS[P])}
    const C=N?{x:40,y:46,w:348,h:200,ax:262,ix:40,iy:340,iw:348,ih:88,kx:16,ky:470}:{x:62,y:44,w:640,h:180,ax:236,ix:62,iy:296,iw:290,ih:68,kx:380,ky:290};
    const up=clamp(ramp(t,P*.2+.005,P*.2+.17));
    let show=[P];if(focus)show=focus.sh.length?focus.sh:[P];else if(mode==='all')show=[0,1,2,3,4].filter(k=>k<=P);
    let s='';
    const ttl=focus?focus.n:mode==='all'&&P>0?'Overlay: '+show.map(k=>DF_P[k].n).join(' · '):cur.n;
    s+=`<text x="${N?16:20}" y="22" class="t-sm" style="fill:var(--dx)">${(N&&ttl.length>40?ttl.slice(0,40)+'…':ttl).toUpperCase()}</text><text x="${N?384:700}" y="22" class="t-xs t-end">mood, 8 weeks · schematic</text>`;
    /* chart frame */
    s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    const my=C.y+C.h*.5;s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${my}" y2="${my}" style="stroke:var(--calm);stroke-width:1.2;stroke-dasharray:1 4"/>`;
    [['elevated',.92],['baseline',.5],['low',.08]].forEach(([l,v])=>{s+=`<text x="${C.x-6}" y="${f1(C.y+C.h*(1-v)+3)}" class="t-xs t-end" style="${N?'font-size:8px':''}">${N&&l==='baseline'?'base':l}</text>`});
    for(let w=1;w<8;w++){const x=C.x+C.w*w/8;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${C.y}" y2="${C.y+C.h}" class="grid"/>`}
    const TL=tline(C.x,C.ax,C.w,{min:0,max:8,step:1,label:'weeks'});s+=TL.svg;
    /* triggers (BPD shown) */
    const bpdOn=show.indexOf(0)>=0,hiT=focus&&(focus.id==='aband'||focus.id==='time');
    if(bpdOn)DF_TRIG.forEach(tr=>{const x=C.x+C.w*tr,vis=(show.length===1&&!focus?up:1)>=tr;if(!vis)return;s+=`<path d="M${f1(x-5)} ${C.y+2}L${f1(x+5)} ${C.y+2}L${f1(x)} ${C.y+10}Z" style="fill:var(--bond);opacity:${hiT?1:.75}"/>`});
    if(bpdOn)s+=`<text x="${C.x+C.w-4}" y="${C.y-4}" class="t-xs t-end" style="fill:var(--bond)">▼ interpersonal trigger</text>`;
    if(show.indexOf(1)>=0&&!N)s+=`<text x="${f1(C.x+C.w*.175)}" y="${f1(C.y+C.h*(1-.86))}" class="t-xs t-mid" style="fill:var(--dx)">episode: days</text><text x="${f1(C.x+C.w*.63)}" y="${f1(C.y+C.h*(1-.3))}" class="t-xs t-mid" style="fill:var(--dx)">episode: weeks</text>`;
    /* traces */
    show.forEach(k=>{const p=DF_P[k],isCur=k===P||!!focus,u=focus?fprog:(mode==='all'&&k<P)?1:up;
      s+=plot(C.x,C.y,C.w,C.h,p.f,u,p.c,{op:isCur?1:.45,sw:isCur?2.4:1.6});
      const showSelf=(focus&&focus.id==='self')||(!focus&&k===P&&(k===2));
      if(p.self&&(showSelf||(focus&&focus.id==='self')))s+=plot(C.x,C.y,C.w,C.h,p.self,u,p.c,{dash:true,sw:1.6,op:.85,N:600});
      const showImp=(focus&&focus.id==='imp')||(!focus&&k===P&&k===3);
      if(p.imp&&showImp)p.imp.forEach(ti=>{if(ti>u)return;const x=C.x+C.w*ti;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${C.y+C.h-16}" y2="${C.y+C.h-4}" style="stroke:${p.c};stroke-width:2.4;stroke-linecap:round"/>`});
      if(u<1&&isCur){const v=clamp(p.f(u),-.02,1.02);s+=`<circle cx="${f1(C.x+C.w*u)}" cy="${f1(C.y+C.h*(1-v))}" r="5" style="fill:${p.c};stroke:var(--panel);stroke-width:2"/>`}});
    if(!focus&&P===2&&show.indexOf(0)<0)s+=plot(C.x,C.y,C.w,C.h,DF_P[0].self,up,DF_P[0].c,{dash:true,sw:1.4,op:.6,N:600});
    if((focus&&focus.id==='self')||(!focus&&P===2))s+=`<text x="${C.x+6}" y="${C.y+C.h-8}" class="t-xs" style="fill:var(--ink)">- - - self-concept</text>`;
    if((focus&&focus.id==='imp')||(!focus&&P===3))s+=`<text x="${C.x+C.w-6}" y="${C.y+C.h-20}" class="t-xs t-end" style="fill:var(--ink)">| impulsive act</text>`;
    if(focus&&focus.id==='trauma'){s+=`<text x="${C.x+6}" y="${C.y+16}" class="t-xs" style="fill:var(--hpa);font-weight:700">complex PTSD: usually after sustained or multiple trauma</text><text x="${C.x+6}" y="${C.y+29}" class="t-xs" style="fill:var(--storm);font-weight:700">BPD: PTSD in about 3 in 10</text>`}
    /* legend for overlays */
    if(show.length>1){let lx=C.x,ly=C.ax+(N?30:28);show.forEach(k=>{const p=DF_P[k],wd=p.n.length*6+30;if(lx+wd>C.x+C.w){lx=C.x;ly+=14}s+=`<line x1="${lx}" x2="${lx+16}" y1="${ly}" y2="${ly}" style="stroke:${p.c};stroke-width:3"/><text x="${lx+20}" y="${ly+3}" class="t-xs" style="fill:var(--ink)">${p.n}</text>`;lx+=wd})}
    /* inset: one day */
    const zs=focus?show:[P];
    s+=`<rect x="${C.ix}" y="${C.iy}" width="${C.iw}" height="${C.ih}" rx="8" style="fill:var(--panel);stroke:var(--line)"/><text x="${C.ix+8}" y="${C.iy-6}" class="t-xs" style="fill:var(--ink);font-weight:700">ZOOM: ONE DAY (24 h)</text>`;
    s+=`<line x1="${C.ix+6}" x2="${C.ix+C.iw-6}" y1="${C.iy+C.ih*.5}" y2="${C.iy+C.ih*.5}" style="stroke:var(--calm);stroke-width:1;stroke-dasharray:1 4"/>`;
    zs.forEach(k=>{const p=DF_P[k];s+=plot(C.ix+6,C.iy+6,C.iw-12,C.ih-12,p.day,focus?1:clamp(up*1.6),p.c,{N:240,sw:2.2})});
    [0,6,12,18,24].forEach(h=>{s+=`<text x="${f1(C.ix+6+(C.iw-12)*h/24)}" y="${C.iy+C.ih+13}" class="t-xs t-mid">${h}h</text>`});
    const inT=zs.indexOf(0)>=0?'BPD: one dip, back within hours':zs.indexOf(1)>=0?'inside an episode: shifted all day':'little change within one day';
    s+=`<text x="${C.ix+C.iw-8}" y="${C.iy+14}" class="t-xs t-end" style="fill:var(--ink)">${inT}</text>`;
    /* key box */
    if(!focus){const K=cur.key,kx=C.kx,ky=C.ky;s+=`<text x="${kx}" y="${ky+(N?0:6)}" class="t-sm" style="fill:${cur.c}">${cur.n.toUpperCase()} · CLUES</text>`;
      K.forEach((l,i)=>{s+=`<circle cx="${kx+5}" cy="${ky+(N?20:26)+i*20-4}" r="3" style="fill:${cur.c}"/><text x="${kx+14}" y="${ky+(N?20:26)+i*20}" class="t-sm" style="fill:var(--ink)">${l}</text>`})}
    else{const kx=C.kx,ky=C.ky;s+=`<text x="${kx}" y="${ky+(N?0:6)}" class="t-sm" style="fill:var(--warn)">FEATURE · ${focus.n.toUpperCase()}</text><text x="${kx}" y="${ky+(N?20:26)}" class="t-xs">Press a profile step to leave the feature view.</text>`}
    svg.innerHTML=s;
  }
  const stop=playWire(rg,$('#dfPlay'),draw,22000,'Replay','differential');
  const setStep=stepWire($('#dfSteps'),DF_STEPS,rg,draw,stop);
  setA=i=>{setStep(i)};
  const clearFocus=()=>{if(!focus)return;focus=null;fprog=1;lastP=-1;$$('[data-dfr]').forEach(b=>b.setAttribute('aria-pressed','false'));$$('#dfTbl tr').forEach(r=>r.classList.remove('on'));$('#dfOut').innerHTML=DF_OUT0};
  $('#dfSteps').addEventListener('click',()=>{if(focus){clearFocus();draw(+rg.value)}},true);
  rg.addEventListener('input',()=>{if(focus){clearFocus();draw(+rg.value)}},true);
  $('#dfPlay').addEventListener('click',()=>{if(stopF){stopF();stopF=null}fprog=1;clearFocus()},true);
  $$('[data-dfm]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.dfm;$$('[data-dfm]').forEach(x=>x.setAttribute('aria-pressed',x===b));clearFocus();draw(+rg.value)}));
  /* matrix */
  const tb=$('#dfTbl'),out=$('#dfOut');const DF_OUT0=`Pick a feature in the first column. The traces above switch to the conditions it separates.`;
  tb.innerHTML=DF_ROWS.map((r,i)=>`<tr data-r="${i}"><th><button data-dfr="${i}" aria-pressed="false">${r.n}<small>${r.sh.length?'show in traces':'no trace'}</small></button></th>${r.c.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('');
  out.innerHTML=DF_OUT0;
  tb.addEventListener('click',e=>{const b=e.target.closest('[data-dfr]');if(!b)return;const i=+b.dataset.dfr,r=DF_ROWS[i];
    stop();if(stopF)stopF();focus=r;
    $$('[data-dfr]',tb).forEach(x=>x.setAttribute('aria-pressed',x===b));$$('tr',tb).forEach(x=>x.classList.toggle('on',+x.dataset.r===i));
    out.innerHTML=`<b>${r.n}.</b> ${r.out}${r.id==='meds'?` <a href="#meds" data-go="meds">Medication: the evidence</a>.`:''}`;
    const P=r.sh.length?r.sh[r.sh.length-1]:phaseOf(DF_STEPS,+rg.value);
    note.innerHTML=noteHTML({k:'Feature view',t:r.n,txt:DF_STEPS[r.sh.length?r.sh[0]:P].txt,pt:`One feature rarely decides a diagnosis on its own. Clinicians weigh the whole pattern over time.`});
    /* animate the relevant curves sweeping in */
    const keep=focus;stopF=animate(1600,p=>{if(focus!==keep)return;fprog=Math.max(.002,p);draw(+rg.value)},()=>{stopF=null;fprog=1;if(focus===keep)draw(+rg.value)});
  });
  draw(+rg.value);

  /* co-occurrence bars */
  const cs=$('#dfCoSvg');let ag=0,shown=DF_CO.map(r=>r[1]),stopC=null;
  function drawCo(){const N=vb(cs,'720 300','400 420');let s='';
    const L=N?{lx:12,bx:12,bw:330,y0:30,rh:48,lab:'below'}:{lx:190,bx:200,bw:440,y0:30,rh:32};
    s+=`<text x="${N?12:20}" y="16" class="t-sm" style="fill:var(--dx)">${ag?'ADOLESCENT':'ADULT'} INPATIENTS WITH BPD · LIFETIME %</text>`;
    DF_CO.forEach((r,i)=>{const v=shown[i],y=L.y0+i*L.rh,by=N?y+16:y,hi=i===2;
      s+=N?`<text x="${L.lx}" y="${y+10}" class="t-sm" style="fill:var(--ink)">${r[0]}</text>`:`<text x="${L.lx}" y="${by+14}" class="t-sm t-end" style="fill:var(--ink)">${r[0]}</text>`;
      s+=`<rect x="${L.bx}" y="${by+3}" width="${L.bw}" height="16" rx="5" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${by+3}" width="${f1(L.bw*v/100)}" height="16" rx="5" style="fill:${hi?'var(--gold)':'var(--dx)'}"/>`;
      s+=`<text x="${f1(L.bx+L.bw*v/100+6)}" y="${by+15}" class="t-sm" style="fill:var(--ink);font-weight:700">${v.toFixed(1)}%</text>`});
    if(!N)s+=`<text x="${L.bx}" y="${L.y0+8*L.rh+8}" class="t-xs" style="fill:var(--gold)">complex comorbidity = a disorder of affect plus a disorder of impulse</text>`;
    else s+=`<text x="12" y="${L.y0+8*L.rh+6}" class="t-xs" style="fill:var(--gold)">complex comorbidity: affect + impulse disorder</text>`;
    cs.innerHTML=s}
  $$('[data-dfa]').forEach(b=>b.addEventListener('click',()=>{ag=+b.dataset.dfa;$$('[data-dfa]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const from=shown.slice(),to=DF_CO.map(r=>r[1+ag]);if(stopC)stopC();stopC=animate(700,p=>{const e=ease(p);shown=from.map((v,i)=>lerp(v,to[i],e));drawCo()},()=>{stopC=null})}));
  drawCo();
  const prevR=redraws.differential;redraws.differential=()=>{prevR&&prevR();drawCo()};
};
