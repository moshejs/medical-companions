/* =============== 2.3 Screening & rating scales =============== */
const SC_ACC={
 mdq:[{lab:'Mood clinics (2000)',se:.73,sp:.90,src:'198 outpatients at five mood-disorder clinics, checked against a blinded SCID',c:'[[Hirschfeld2000MDQ]]'},
      {lab:'US community (2003)',se:.281,sp:.972,src:'a US general-population sample, 695 people interviewed',c:'[[Hirschfeld2003AJP]]'},
      {lab:'Primary care (meta-analysis)',se:.43,sp:.95,src:'summary figures for primary-care or general-population settings at a cut-off of 7',c:'[[Carvalho2015]]'}],
 hcl:[{lab:'Psychiatric services (meta-analysis)',se:.81,sp:.67,src:'summary figures across psychiatric services at recommended cut-offs',c:'[[Carvalho2015]]'},
      {lab:'Spanish validation (cut-off 14)',se:.85,sp:.79,src:'237 people, 14 or more "yes" answers',c:'[[Vieta2007HCL32]]'}]};
const SC_PREV=[{v:.024,lab:'2.4%',who:'a community sample',src:'the lifetime prevalence of the whole bipolar spectrum in the World Mental Health surveys',c:'[[Merikangas2011]]'},
 {v:.05,lab:'5%',who:'primary-care patients',src:'an assumed teaching value, inside the 3.4–9% found by structured interview in primary-care patients with depression or psychiatric complaints',c:'[[Cerimele2013]]'},
 {v:.16,lab:'16%',who:'people with a current depressive episode',src:'the share of 5,635 adults with a current major depressive episode who met DSM-IV-TR bipolar criteria in the BRIDGE study',c:'[[Angst2011BRIDGE]]'}];
const SC_YM=[
 {k:'Severity',t:'Where a trial starts',txt:`In a 3-week risperidone trial in 290 inpatients with mania, the mean baseline YMRS was 37.2 on the 0–60 scale. [[Khanna2005Risperidone]] Scores like this come from a clinician rating each item, not from a questionnaire the person fills in. [[Young1978]]`,
  pt:`The scale is a ruler for how severe mania is, used by clinicians to see whether treatment is working.`,hook:`YMRS: 11 items, 0–60, clinician-rated. MADRS: 10 items. [[Young1978,Pigott2016Cochrane,Montgomery1979]]`},
 {k:'Change',t:'A fall over one week',txt:`<span class="ev early">Early evidence</span> In a small trial of 23 people hospitalised with mania, orange blue-blocking glasses worn from 6 p.m. to 8 a.m. for 7 days, added to usual treatment, reduced the YMRS by 14.1 points, against 1.7 with clear glasses. [[Henriksen2016]]`,
  pt:`A rating scale lets a team see change in numbers, not just impressions.`,hook:`Rating scales are built to be sensitive to change: the YMRS separated patients before and after two weeks of treatment. [[Young1978]]`},
 {k:'Trial result',t:'Drug against placebo',txt:`In a 3-week trial of cariprazine in 497 people with mania, the YMRS fell 6.1 points more than with placebo at 3–6 mg/day (95% CI −8.4 to −3.8). The difference between groups is smaller than either group's total fall, because people on placebo improve too. [[Calabrese2015Cariprazine]]`,
  pt:`Trials compare how much more a medicine lowers the score than a dummy pill does.`,hook:``},
 {k:'Trial result',t:'Drug against drug',txt:`In GERI-BD, 224 people aged 60 or older with mania were randomised to lithium or divalproex for 9 weeks. YMRS improvement favoured lithium by 3.90 points (97.5% CI 1.71–6.09), while response rates were similar: 79% vs 73%. [[Young2017GERIBD]]`,
  pt:`Two medicines can both help most people, and still differ a little on the scale.`,hook:``}];
inits.screening=()=>{
  /* ---------- icon array ---------- */
  const svg=$('#scSvg'),rg=$('#scT');let tool='mdq',src=0,pv=2;
  const R=rng(23),perm=[...Array(1000).keys()];for(let i=999;i>0;i--){const j=Math.floor(R()*(i+1));[perm[i],perm[j]]=[perm[j],perm[i]]}
  const jit=[...Array(1000)].map(()=>R());
  const calc=()=>{const A=SC_ACC[tool][src],P=SC_PREV[pv],cases=Math.round(1000*P.v),TP=Math.round(cases*A.se),FN=cases-TP,non=1000-cases,FP=Math.round(non*(1-A.sp)),TN=non-FP;
    return {A,P,cases,TP,FN,FP,TN,ppv:TP/Math.max(1,TP+FP),npv:TN/Math.max(1,TN+FN)}};
  const pct=x=>Math.round(x*100)+'%';
  const steps=[
   {from:0,at:.1,k:'Step 1',t:'1,000 people screened',txt:'',pt:`Each dot is a person who fills in the questionnaire.`,hook:``},
   {from:.18,at:.28,k:'Step 2',t:'Who has bipolar disorder',txt:'',pt:`How common the condition is among the people screened changes everything that follows.`,hook:`Positive predictive value depends on prevalence; sensitivity and specificity do not.`},
   {from:.36,at:.46,k:'Step 3 · sensitivity',t:'Cases the screen catches',txt:'',pt:`Sensitivity is the share of people with the condition whom the test flags. The hollow dots are missed.`,hook:`MDQ: sensitivity 0.73 in mood clinics but 0.28 in the general population. [[Hirschfeld2000MDQ,Hirschfeld2003AJP]]`},
   {from:.56,at:.66,k:'Step 4 · specificity',t:'False alarms',txt:'',pt:`Even a small false-alarm rate produces many false positives when most people screened do not have the condition.`,hook:`MDQ false positives are linked to borderline personality disorder, PTSD, substance use and ADHD. [[Zimmerman2011MDQ,Zimmerman2010Screening]]`},
   {from:.76,at:.95,k:'Step 5 · predictive value',t:'What a positive means',txt:'',pt:`A positive questionnaire can only say "worth a closer look". Many people who score positive turn out to have something else.`,hook:`Worked example: prevalence 5%, MDQ sensitivity 43% and specificity 95% → about 31% of positive screens are true positives. [[Carvalho2015]]`}];
  function stepText(i,C){const A=C.A,P=C.P;
    return [`Imagine 1,000 ${P.who}. Here ${P.lab} of them have bipolar disorder: ${P.src}. ${P.c}`,
     `That makes <b>${C.cases}</b> people with bipolar disorder and ${1000-C.cases} without. Nothing has been screened yet; this is the starting mix.`,
     `With sensitivity ${A.se} (${A.src}) the ${tool==='mdq'?'MDQ':'HCL-32'} flags <b>${C.TP}</b> of the ${C.cases} (true positives) and misses <b>${C.FN}</b> (false negatives, hollow). ${A.c}`,
     `With specificity ${A.sp}, ${pct(1-A.sp)} of the ${1000-C.cases} people without bipolar disorder still screen positive: <b>${C.FP}</b> false positives (amber). ${A.c}`,
     `Of <b>${C.TP+C.FP}</b> positive screens, <b>${C.TP}</b> have bipolar disorder: a positive predictive value of <b>${pct(C.ppv)}</b>. A negative screen is right ${pct(C.npv)} of the time. Change the prevalence to watch this number move: CANMAT allows such tools only as an adjunct in clinical populations, and NICE advises against questionnaires in primary care. [[Yatham2018,NICE2014CG185]]`][i]}
  function draw(t){
    const N=vb(svg,'720 380','400 600'),C=calc(),ph=phaseOf(steps,t);setA(ph);
    const p0=ramp(t,0,.16),p1=ramp(t,.18,.32),p2=ramp(t,.36,.52),p3=ramp(t,.56,.72),p4=ease(ramp(t,.76,.94));
    const G=N?{x:24,y:46,d:8.9,r:3.3}:{x:24,y:50,d:10.6,r:3.9},COLS=40,ROWS=25;
    const pos=(slot,cm)=>cm?[G.x+Math.floor(slot/ROWS)*G.d,G.y+(slot%ROWS)*G.d]:[G.x+(slot%COLS)*G.d,G.y+Math.floor(slot/COLS)*G.d];
    let s=`<text x="${G.x}" y="${G.y-22}" class="t-sm" style="fill:var(--dx)">${N?'1,000 PEOPLE':'1,000 PEOPLE SCREENED'} · ${tool==='mdq'?'MDQ':'HCL-32'} · PREVALENCE ${C.P.lab}</text>`;
    /* people in sorted order: TP, FP, FN, TN */
    const cat=i=>i<C.TP?0:i<C.TP+C.FP?1:i<C.TP+C.FP+C.FN?2:3;
    for(let i=0;i<1000;i++){const c=cat(i),isCase=c===0||c===2,a=pos(perm[i],false),b=pos(i,true),x=lerp(a[0],b[0],p4),y=lerp(a[1],b[1],p4),j=jit[i];
      if(p0<=(Math.floor(perm[i]/COLS)/ROWS)*.9)continue;
      let fill='var(--muted)',op=.32,stroke='';
      if(isCase&&p1>j*.8){fill='var(--dx)';op=1}
      if(c===2&&p2>.2+j*.6){fill='none';stroke='var(--dx)';op=1}
      if(c===1&&p3>j*.85){fill='var(--warn)';op=1}
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${G.r}" style="fill:${fill};opacity:${op}${stroke?`;stroke:${stroke};stroke-width:1.3`:''}"/>`;
      if(c===0&&p2>.1+j*.6&&p4<.5)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(G.r+2.2)}" style="fill:none;stroke:var(--good);stroke-width:1.2"/>`}
    const fb=G.y+ROWS*G.d+4;
    if(p4>.6){/* bracket over the positive screens */
      const colsPos=(C.TP+C.FP)/ROWS,x0=G.x-G.d/2,x1=G.x+colsPos*G.d-G.d/2,op=f1(ramp(p4,.6,1));
      s+=`<g opacity="${op}"><path d="M${f1(x0)} ${G.y-12}V${G.y-8}H${f1(x1)}V${G.y-12}" style="fill:none;stroke:var(--ink);stroke-width:1.4" transform="translate(0 0)"/>`;
      s+=`<path d="M${f1(x0)} ${fb}V${fb+5}H${f1(x1)}V${fb}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1(x0)}" y="${fb+18}" class="t-xs" style="fill:var(--ink);font-weight:700">← ${C.TP+C.FP} positive screens</text></g>`}
    /* legend */
    const lg=[['var(--dx)','has bipolar disorder, flagged',0],['var(--dx)','has it, missed',1],['var(--warn)','false alarm',0],['var(--muted)','no bipolar disorder',0]];
    const ly=N?fb+30:fb+36;lg.forEach((l,i)=>{const lx=G.x+(N?0:[0,170,262,350][i]),yy=N?ly+i*14:ly;
      s+=`<circle cx="${lx+4}" cy="${yy-3}" r="4" style="fill:${l[2]?'none':l[0]};stroke:${l[0]};stroke-width:1.3;opacity:${i===3?.5:1}"/><text x="${lx+12}" y="${yy}" class="t-xs">${l[1]}</text>`});
    /* the 2x2 table and the predictive value */
    const T=N?{x:24,y:370,w:352}:{x:476,y:40,w:228};
    const cw=(T.w-70)/2,rh=40;
    s+=`<text x="${T.x+70+cw/2}" y="${T.y+10}" class="t-xs t-mid" style="fill:var(--dx)">has bipolar</text><text x="${T.x+70+cw*1.5}" y="${T.y+10}" class="t-xs t-mid">does not</text>`;
    const cell=(r,c,v,lab,col,show)=>{const x=T.x+70+c*cw,y=T.y+18+r*rh;return `<rect x="${f1(x+2)}" y="${y}" width="${f1(cw-4)}" height="${rh-4}" rx="7" style="fill:var(--panel-2);stroke:${show?col:'var(--line)'};stroke-width:${show?1.6:1}"/>`+(show?`<text x="${f1(x+cw/2)}" y="${y+18}" class="t-mid" style="font:700 15px var(--mono);fill:var(--ink)">${v}</text><text x="${f1(x+cw/2)}" y="${y+30}" class="t-xs t-mid">${lab}</text>`:'')};
    s+=`<text x="${T.x}" y="${T.y+40}" class="t-xs" style="fill:var(--ink)">screen +</text><text x="${T.x}" y="${T.y+80}" class="t-xs" style="fill:var(--ink)">screen −</text>`;
    s+=cell(0,0,Math.round(C.TP*clamp(p2*1.5)),'true +','var(--good)',p2>0)+cell(0,1,Math.round(C.FP*clamp(p3*1.5)),'false +','var(--warn)',p3>0)+cell(1,0,Math.round(C.FN*clamp(p2*1.5)),'missed','var(--dx)',p2>0)+cell(1,1,Math.round(C.TN*clamp(p3*1.5)),'true −','var(--muted)',p3>0);
    const by=T.y+112;
    s+=`<text x="${T.x}" y="${by}" class="t-sm" style="fill:var(--dx)">OF THE POSITIVE SCREENS</text>`;
    const pw=T.w,pp=C.ppv,shown=ramp(p4,.3,1);
    s+=`<rect x="${T.x}" y="${by+8}" width="${pw}" height="22" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    if(shown>0){s+=`<rect x="${T.x}" y="${by+8}" width="${f1(pw*pp*shown)}" height="22" rx="6" style="fill:var(--dx)"/><rect x="${f1(T.x+pw*pp*shown)}" y="${by+8}" width="${f1(pw*(1-pp)*shown)}" height="22" style="fill:var(--warn);opacity:.85"/>`;
      s+=`<text x="${T.x}" y="${by+58}" style="font:800 30px var(--display);fill:var(--dx)">${pct(pp*shown)}</text><text x="${T.x+(N?82:76)}" y="${by+46}" class="t-xs" style="fill:var(--ink)">have bipolar disorder</text><text x="${T.x+(N?82:76)}" y="${by+58}" class="t-xs">positive predictive value</text>`;
      s+=`<text x="${T.x}" y="${by+80}" class="t-xs">${pct((1-pp)*shown)} are false alarms (amber)</text>`}
    else s+=`<text x="${T.x}" y="${by+50}" class="t-xs">appears at step 5</text>`;
    if(!N){s+=`<text x="${T.x}" y="${by+112}" class="t-xs">sensitivity ${C.A.se} · specificity ${C.A.sp}</text><text x="${T.x}" y="${by+126}" class="t-xs">${C.A.lab}</text>`}
    else s+=`<text x="${T.x}" y="${by+98}" class="t-xs">sensitivity ${C.A.se} · specificity ${C.A.sp} · ${C.A.lab}</text>`;
    svg.innerHTML=s;
    const P=Object.assign({},steps[ph],{txt:stepText(ph,C)});
    $('#scNote').innerHTML=noteHTML(P);
    $('#scRead').innerHTML=`<span>True + <b>${C.TP}</b></span><span>False + <b>${C.FP}</b></span><span>Missed <b>${C.FN}</b></span><span>PPV <b>${pct(C.ppv)}</b></span><span>NPV <b>${pct(C.npv)}</b></span>`}
  const stop=playWire(rg,$('#scPlay'),draw,14000,'%t:player.replay%','screening');
  const setA=stepWire($('#scSteps'),steps,rg,draw,stop);
  function srcButtons(){$('#scSrc').innerHTML=`<span class="kicker">Accuracy</span>`+SC_ACC[tool].map((a,i)=>`<button class="btn" data-scsrc="${i}" aria-pressed="${i===src}">${a.lab}</button>`).join('')}
  $('#scSrc').addEventListener('click',e=>{const b=e.target.closest('[data-scsrc]');if(!b)return;src=+b.dataset.scsrc;$$('[data-scsrc]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $$('[data-sctool]').forEach(b=>b.addEventListener('click',()=>{tool=b.dataset.sctool;src=0;$$('[data-sctool]').forEach(x=>x.setAttribute('aria-pressed',x===b));srcButtons();draw(+rg.value)}));
  $$('[data-scprev]').forEach(b=>b.addEventListener('click',()=>{pv=+b.dataset.scprev;$$('[data-scprev]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  srcButtons();draw(+rg.value);

  /* ---------- YMRS ruler ---------- */
  const ys=$('#scYm');let yi=0,yp=1,yStop=null;
  function drawY(){const N=vb(ys,'720 240','400 316'),x0=N?24:40,x1=N?376:680,X=v=>x0+(x1-x0)*v/60;let s='';
    const ry=N?86:84;
    s+=`<text x="${x0}" y="20" class="t-sm" style="fill:var(--dx)">YOUNG MANIA RATING SCALE · 0–60 · CLINICIAN-RATED</text>`;
    for(let i=0;i<11;i++){const cx=x0+12+i*(N?18:22);s+=`<circle cx="${cx}" cy="40" r="6" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${cx}" y="43" class="t-mid" style="font:600 7.5px var(--mono);fill:var(--dx)">${i+1}</text>`}
    s+=`<text x="${x0+12+11*(N?18:22)}" y="44" class="t-xs">11 items</text>`;
    s+=`<rect x="${x0}" y="${ry}" width="${x1-x0}" height="14" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    for(let v=0;v<=60;v+=10)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ry+16}" y2="${ry+20}" class="axis"/><text x="${f1(X(v))}" y="${ry+31}" class="t-xs t-mid">${v}</text>`;
    const base=37.2*(yi===0?ease(yp):1);
    s+=`<rect x="${x0}" y="${ry}" width="${f1(Math.max(14,X(base)-x0))}" height="14" rx="7" style="fill:var(--up-fill);opacity:${yi===0?.9:.35}"/>`;
    s+=`<path d="M${f1(X(base))} ${ry-3}l-5 -8h10z" style="fill:var(--ink)"/><text x="${f1(X(base))}" y="${ry-14}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${yi===0?f1(base):'37.2'} trial baseline</text>`;
    /* change bars */
    const bars=[[1,'Blue-blocking glasses, 7 days',14.1,'var(--dx)'],[1,'Clear glasses, 7 days',1.7,'var(--muted)'],[2,'Cariprazine minus placebo, 3 wk',6.1,'var(--rx)'],[3,'Lithium minus divalproex, 9 wk',3.9,'var(--rx)']];
    const by=N?ry+56:ry+50;s+=`<text x="${x0}" y="${by}" class="t-sm" style="fill:var(--dx)">FALL IN YMRS POINTS (SAME SCALE)</text>`;
    bars.forEach((b,i)=>{const y=by+12+i*(N?40:22),on=b[0]===yi,g=on?ease(yp):yi>0&&b[0]<yi?1:on?0:.0,len=b[2]*(on?ease(yp):(b[0]<yi?1:0));
      const lx=N?x0:x0,bx=N?x0:x0+210,ly=N?y+10:y+11;
      s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}${on?';font-weight:700':''}">${b[1]}</text>`;
      const yy=N?y+16:y;s+=`<rect x="${bx}" y="${yy}" width="${f1(X(60)-x0-(N?0:210))}" height="14" rx="4" style="fill:var(--panel-2);opacity:.5"/>`;
      if(len>0)s+=`<rect x="${bx}" y="${yy}" width="${f1((X(len)-x0))}" height="14" rx="4" style="fill:${b[3]};opacity:${on?1:.5}"/><text x="${f1(bx+(X(len)-x0)+6)}" y="${yy+11}" class="t-xs" style="fill:var(--ink)">${f1(len)}</text>`;
      void g});
    ys.innerHTML=s;$('#scYmNote').innerHTML=noteHTML(SC_YM[yi])}
  $$('[data-scy]').forEach(b=>b.addEventListener('click',()=>{yi=+b.dataset.scy;$$('[data-scy]').forEach(x=>x.setAttribute('aria-pressed',x===b));yStop&&yStop();yp=0;yStop=animate(1100,p=>{yp=p;drawY()},()=>{yStop=null})}));
  drawY();

  /* ---------- mood chart ---------- */
  const ms=$('#scMc'),mr=$('#scMcT');let view='chart';
  const f=moodSeries([[0,.02],[.12,-.04],[.18,.05],[.2,.38],[.235,.42],[.26,.06],[.32,0],[.38,-.12],[.44,-.62],[.58,-.7],[.66,-.55],[.72,-.12],[.8,.02],[.9,-.03],[1,.03]]);
  const fr=moodSeries([[0,0],[.36,-.05],[.44,-.62],[.6,-.68],[.72,-.1],[.82,0],[1,0]]);fr.pole=u=>fr(u)<-EU?'down':'eu';
  const MS=[{from:0,at:.1,k:'Weeks 1–4',t:'Steady weeks',txt:`A daily chart starts in ordinary weeks. The NIMH Life Chart Method rates mood every day by how much it affects functioning. [[Denicoff2000]]`,pt:`A mood chart is a simple daily note of mood, sleep and how the day went.`,hook:`Life-chart mania ratings correlated with the YMRS (r = 0.656), depression ratings with clinician-rated depression (r = −0.785). [[Denicoff2000]]`},
   {from:.17,at:.23,k:'Weeks 5–6',t:'A short high',txt:`A five-day high: little sleep, lots of plans. On a chart it is a clear block; in memory it is easily lost, because insight into highs is often reduced and they can feel good. Under-diagnosis is blamed "especially" on not involving family members or other informants. [[Ghaemi2002]]`,pt:`Family or friends often remember the highs more clearly than the person does.`,hook:`NICE asks clinicians to encourage a family member or carer to give a corroborative history. [[NICE2014CG185]]`},
   {from:.36,at:.55,k:'Weeks 9–17',t:'A long low',txt:`A depression of several weeks. This is the part people seek help for, so without the earlier high the picture looks like unipolar depression, the most common misdiagnosis. [[Yatham2018,Hirschfeld2003Perceptions]]`,pt:`Most people spend much more time low than high, which is why bipolar disorder is often first mistaken for depression.`,hook:`Most frequent misdiagnosis: major depressive disorder; psychotic disorders second. [[Yatham2018]]`},
   {from:.74,at:.95,k:'Weeks 18–26',t:'Seen over time',txt:`Laid out across months, the chart shows both poles, how long each lasted and what came between. Confirmation is more confident "when episodes are prospectively observed". [[Yatham2018]]`,pt:`Bringing a chart to appointments helps you and your team see the pattern together.`,hook:``}];
  function drawM(t){const N=vb(ms,'720 260','400 300');const L=N?{x:16,y:34,w:368,h:220}:{x:24,y:30,w:672,h:190};
    const g=view==='chart'?f:fr;let s=`<text x="${L.x}" y="18" class="t-sm" style="fill:var(--dx)">${view==='chart'?'DAILY MOOD CHART · 26 WEEKS':'WHAT IS REMEMBERED AT THE APPOINTMENT'}</text>`;
    const lc=lifechart(L.x,L.y,L.w,L.h,g,{upto:t,id:'scmc',labels:true,dot:true});s+=lc.svg;
    if(view==='recall')s+=lifechart(L.x,L.y,L.w,L.h,f,{upto:t,ghost:true}).svg;
    for(let w=0;w<=26;w+=N?13:2){const x=lc.X(w/26);s+=`<text x="${f1(x)}" y="${L.y+L.h+14}" class="t-xs t-mid">${w}</text>`}
    if(t>.24){const [x,y]=lc.at(.22);s+=view==='chart'?`<text x="${f1(x+10)}" y="${f1(y-6)}" class="t-xs" style="fill:var(--up);font-weight:700">5-day high: partner noticed</text>`:`<text x="${f1(x+10)}" y="${f1(lc.Y(.4))}" class="t-xs" style="fill:var(--muted)">(dashed: the high, forgotten)</text>`}
    if(t>.56){const [x,y]=lc.at(.52);s+=`<text x="${f1(x)}" y="${f1(y+18)}" class="t-xs t-mid" style="fill:var(--down);font-weight:700">a long low</text>`}
    ms.innerHTML=s;$('#scMcNote').innerHTML=noteHTML(MS[phaseOf(MS,t)])}
  playWire(mr,$('#scMcPlay'),drawM,9000,'%t:player.replay%','screening');
  $$('[data-scmc]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.scmc;$$('[data-scmc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawM(+mr.value)}));
  drawM(+mr.value);
  const prevR=redraws.screening;redraws.screening=()=>{prevR&&prevR();drawY()};
};
