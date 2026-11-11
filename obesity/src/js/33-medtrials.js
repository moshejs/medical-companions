/* =============== 3.3 Semaglutide & tirzepatide trials =============== */
/* Main player: mean % weight change curves, trial by trial (placebo, liraglutide, semaglutide, tirzepatide,
   head-to-head, stopping). Each series joins the published points [[F pass]]; the curve shape between them is
   schematic (a saturating rise, or a saturating regain after stopping). Second: responder icon arrays. */
const MT_STEPS=[
 {from:0,at:.12,k:'The comparison arm',t:'Placebo with lifestyle support',
  txt:'Every pivotal trial gave both arms lifestyle support, so the placebo line shows what that support achieved: −2.4% at 68 weeks in STEP 1, [[Wilding2021STEP1]] −3.1% at 72 weeks in SURMOUNT-1 [[Jastreboff2022SURMOUNT1]] and −3.0% at 56 weeks in SCALE (label). [[FDA-Saxenda]] In STEP 3, with intensive behavioural therapy, 30 counselling visits and an 8-week low-calorie diet, placebo reached −5.7%. [[Wadden2021STEP3]]',
  pt:'Even the people on placebo got diet and activity support. The difference between the lines is what the medicine added.',
  hook:'Placebo arms lose about 2 to 3% with lifestyle support. [[Wilding2021STEP1,Jastreboff2022SURMOUNT1]]'},
 {from:.16,at:.28,k:'Daily injection',t:'Liraglutide 3.0 mg (SCALE)',
  txt:'SCALE randomised 3731 adults without diabetes for 56 weeks. The journal reports 8.4 vs 2.8 kg lost; [[PiSunyer2015SCALE]] the Saxenda label reports the same study as −7.4% vs −3.0%. [[FDA-Saxenda]] 63.2% vs 27.1% lost at least 5%. [[PiSunyer2015SCALE]] The label says to stop if an adult has not lost at least 4% after 16 weeks. [[FDA-Saxenda]]',
  pt:'Liraglutide, the first daily GLP-1 medicine for weight, led to about 7% loss on average.',
  hook:'SCALE: liraglutide 3.0 mg −7.4% vs −3.0% at 56 weeks (label). [[FDA-Saxenda]]'},
 {from:.32,at:.44,k:'Weekly injection',t:'Semaglutide (STEP 1, STEP UP)',
  txt:'STEP 1: 1961 adults with BMI 30 or more (or 27 with a weight-related condition) and no diabetes; −14.9% vs −2.4% at 68 weeks (difference −12.4 points, 95% CI −13.4 to −11.5). [[Wilding2021STEP1]] STEP UP tested the higher 7.2 mg dose: −18.7% vs −15.6% on 2.4 mg and −3.9% on placebo at 72 weeks. [[Wharton2025STEPUP]] Switch on "Oral pills" to add oral semaglutide (OASIS 1 and 4) and orforglipron (ATTAIN-1). [[Knop2023OASIS1,Wharton2025OASIS4,Wharton2025ATTAIN1]]',
  pt:'On weekly semaglutide, people in STEP 1 lost about 15% of their weight on average, much more than with placebo.',
  hook:'STEP 1: −14.9% vs −2.4% at 68 weeks. [[Wilding2021STEP1]]'},
 {from:.48,at:.6,k:'Dual agonist',t:'Tirzepatide (SURMOUNT-1)',
  txt:'SURMOUNT-1: 2539 adults with BMI 30 or more (or 27 with a complication) and no diabetes; mean baseline weight 104.8 kg, BMI 38.0; a 20-week dose escalation. At 72 weeks: −15.0% (5 mg), −19.5% (10 mg) and −20.9% (15 mg) vs −3.1% on placebo. 57% on 15 mg lost at least 20%, vs 3% on placebo. Adverse events led 4.3 to 7.1% to stop, vs 2.6%. [[Jastreboff2022SURMOUNT1]]',
  pt:'On tirzepatide, average loss was about 15 to 21%, depending on the dose.',
  hook:'SURMOUNT-1: 15 mg −20.9% vs −3.1%; 57% reached ≥20% loss. [[Jastreboff2022SURMOUNT1]]'},
 {from:.64,at:.76,k:'Head to head',t:'Tirzepatide vs semaglutide; semaglutide vs liraglutide',
  txt:'Only these trials compare medicines directly. SURMOUNT-5 (open-label, 751 adults without diabetes, 72 weeks): tirzepatide −20.2% vs semaglutide −13.7%; waist −18.4 vs −13.0 cm. [[Aronne2025SURMOUNT5]] STEP 8 (open-label, 338 adults, 68 weeks): semaglutide 2.4 mg weekly −15.8% vs liraglutide 3.0 mg daily −6.4%; 13.5% vs 27.6% stopped treatment. [[Rubino2022STEP8]]',
  pt:'When two medicines are tested in the same trial, tirzepatide led to more weight loss than semaglutide, and semaglutide more than liraglutide.',
  hook:'SURMOUNT-5: −20.2% vs −13.7%. STEP 8: −15.8% vs −6.4%. [[Aronne2025SURMOUNT5,Rubino2022STEP8]]'},
 {from:.8,at:.97,k:'Stopping',t:'What happens when treatment stops',
  txt:'In the STEP 1 extension, all treatment stopped at week 68: people who had lost 17.3% regained 11.6 points by week 120, about two-thirds of the loss, and most cardiometabolic gains reverted. The authors say this confirms obesity is chronic. [[Wilding2022STEP1ext]] In SURMOUNT-4, after 36 weeks on tirzepatide (−20.9%), switching to placebo gave +14.0% while continuing gave a further −5.5%. [[Aronne2024SURMOUNT4]] In STEP 4, continuing semaglutide after a 20-week run-in gave −7.9% vs +6.9% after switching to placebo. [[Rubino2021STEP4]] Across 37 studies, weight returned at about 0.4 kg a month after any weight medicine stopped. [[West2026BMJ]]',
  pt:'When the medicine stops, the appetite signals it was calming come back, and so does much of the weight. This is biology, not a personal failure.',
  hook:'STEP 1 extension: two-thirds of the lost weight back within a year of stopping. [[Wilding2022STEP1ext]]'}
];
/* families for the chips */
const MT_FAM=[{id:'pbo',n:'Placebo',col:'var(--figure-line)'},{id:'lira',n:'Liraglutide',col:'var(--pyy)'},{id:'sema',n:'Semaglutide',col:'var(--rx-drug)'},{id:'tirz',n:'Tirzepatide',col:'var(--hl)'},{id:'oral',n:'Oral pills',col:'var(--leptin)',off:1}];
/* series: P = published points [week, % change from week 0]; ph = phase it is drawn in; g = group: main | h2h | stop */
const MT_SER=[
 {id:'p1',f:'pbo',g:'main',ph:0,n:'Placebo, STEP 1',s:'Placebo STEP 1',P:[[0,0],[68,-2.4]],dash:'5 4'},
 {id:'p2',f:'pbo',g:'main',ph:0,n:'Placebo, SURMOUNT-1',s:'Placebo SURMOUNT-1',P:[[0,0],[72,-3.1]],dash:'5 4'},
 {id:'l1',f:'lira',g:'main',ph:1,n:'Liraglutide 3.0 mg (SCALE)',s:'Liraglutide 3 mg',P:[[0,0],[56,-7.4]]},
 {id:'s1',f:'sema',g:'main',ph:2,n:'Semaglutide 2.4 mg (STEP 1)',s:'Sema 2.4 mg',P:[[0,0],[68,-14.9]]},
 {id:'s7',f:'sema',g:'main',ph:2,n:'Semaglutide 7.2 mg (STEP UP)',s:'Sema 7.2 mg',P:[[0,0],[72,-18.7]],dash:'8 3'},
 {id:'o1',f:'oral',g:'main',ph:2,n:'Oral sema 50 mg (OASIS 1)',s:'Oral sema 50 mg',P:[[0,0],[68,-15.1]]},
 {id:'o4',f:'oral',g:'main',ph:2,n:'Oral sema 25 mg (OASIS 4)',s:'Oral sema 25 mg',P:[[0,0],[64,-13.6]],dash:'8 3'},
 {id:'o9',f:'oral',g:'main',ph:2,n:'Orforglipron 36 mg (ATTAIN-1)',s:'Orforglipron',P:[[0,0],[72,-11.2]],dash:'2 3'},
 {id:'t5',f:'tirz',g:'main',ph:3,n:'Tirzepatide 5 mg',s:'Tirz 5 mg',P:[[0,0],[72,-15.0]],dash:'2 3'},
 {id:'t10',f:'tirz',g:'main',ph:3,n:'Tirzepatide 10 mg',s:'Tirz 10 mg',P:[[0,0],[72,-19.5]],dash:'8 3'},
 {id:'t15',f:'tirz',g:'main',ph:3,n:'Tirzepatide 15 mg',s:'Tirz 15 mg',P:[[0,0],[72,-20.9]]},
 {id:'h5t',f:'tirz',g:'h2h',ph:4,n:'SURMOUNT-5: tirzepatide',s:'S-5 tirzepatide',P:[[0,0],[72,-20.2]]},
 {id:'h5s',f:'sema',g:'h2h',ph:4,n:'SURMOUNT-5: semaglutide',s:'S-5 semaglutide',P:[[0,0],[72,-13.7]]},
 {id:'h8s',f:'sema',g:'h2h',ph:4,n:'STEP 8: semaglutide',s:'STEP 8 sema',P:[[0,0],[68,-15.8]],dash:'8 3'},
 {id:'h8l',f:'lira',g:'h2h',ph:4,n:'STEP 8: liraglutide',s:'STEP 8 lira',P:[[0,0],[68,-6.4]],dash:'8 3'},
 {id:'x1',f:'sema',g:'stop',ph:5,n:'STEP 1 ext: sema, stopped wk 68',s:'Sema stopped',P:[[0,0],[68,-17.3],[120,-5.6]],stopAt:68},
 {id:'x0',f:'pbo',g:'stop',ph:5,n:'STEP 1 ext: placebo',s:'Placebo',P:[[0,0],[68,-2.0],[120,-.1]],dash:'5 4',stopAt:68},
 {id:'y1',f:'tirz',g:'stop',ph:5,n:'SURMOUNT-4: kept on tirzepatide',s:'Tirz continued',P:[[0,0],[36,-20.9],[88,-25.3]]},
 {id:'y0',f:'tirz',g:'stop',ph:5,n:'SURMOUNT-4: switched to placebo',s:'Tirz → placebo',P:[[0,0],[36,-20.9],[88,-9.9]],dash:'5 4',stopAt:36}
];
/* phase windows: [start, end] of drawing for each phase */
const MT_WIN=[[.01,.12],[.17,.28],[.33,.44],[.49,.6],[.65,.76],[.85,.97]];
/* responder data: v[threshold] = [medicine %, comparator %] */
const MT_RESP=[
 {n:'STEP 1',a:'Semaglutide 2.4 mg',b:'Placebo',wk:68,v:{5:[86.4,31.5],10:[69.1,12.0],15:[50.5,4.9]},c:'Wilding2021STEP1'},
 {n:'STEP 3',a:'Semaglutide 2.4 mg + intensive behavioural therapy',b:'Placebo + intensive behavioural therapy',wk:68,v:{5:[86.6,47.6],10:[75.3,27.0],15:[55.8,13.2]},c:'Wadden2021STEP3'},
 {n:'STEP 8',a:'Semaglutide 2.4 mg weekly',b:'Liraglutide 3.0 mg daily',wk:68,v:{10:[70.9,25.6],15:[55.6,12.0],20:[38.5,6.0]},c:'Rubino2022STEP8'},
 {n:'SURMOUNT-1',a:'Tirzepatide 15 mg',b:'Placebo',wk:72,v:{5:[91,35],20:[57,3]},c:'Jastreboff2022SURMOUNT1'},
 {n:'OASIS 1',a:'Oral semaglutide 50 mg',b:'Placebo',wk:68,v:{5:[85,26],10:[69,12],15:[54,6],20:[34,3]},c:'Knop2023OASIS1'},
 {n:'ATTAIN-1',a:'Orforglipron 36 mg (trial dose)',b:'Placebo',wk:72,v:{10:[54.6,12.9],15:[36.0,5.9],20:[18.4,2.8]},c:'Wharton2025ATTAIN1'},
 {n:'SCALE',a:'Liraglutide 3.0 mg',b:'Placebo',wk:56,v:{5:[63.2,27.1],10:[33.1,10.6]},c:'PiSunyer2015SCALE',note:'For 10%, SCALE reports "more than 10%".'}
];
const MT_RESP_TXT={
 'STEP 1':'1961 adults without diabetes. Half of the people on semaglutide lost at least 15% of their starting weight; most on placebo lost less than 5%. [[Wilding2021STEP1]]',
 'STEP 3':'611 adults, both arms with intensive behavioural therapy: 30 counselling visits and an 8-week low-calorie diet. The behavioural programme helped placebo, but the medicine still added a lot. [[Wadden2021STEP3]]',
 'STEP 8':'338 adults, open-label: weekly semaglutide against daily liraglutide rather than placebo. [[Rubino2022STEP8]]',
 'SURMOUNT-1':'2539 adults without diabetes. The abstract reports the 5% and 20% thresholds; 10 mg reached 20% in 50%. [[Jastreboff2022SURMOUNT1]]',
 'OASIS 1':'667 adults without diabetes taking a 50 mg daily tablet, a higher dose than the 25 mg Wegovy tablet. [[Knop2023OASIS1,Wharton2025OASIS4]]',
 'ATTAIN-1':'3127 adults without diabetes; the 36 mg trial dose corresponds to 17.2 mg on the Foundayo label. [[Wharton2025ATTAIN1,FDA-Foundayo]]',
 'SCALE':'3731 adults without diabetes, randomised 2:1 for 56 weeks. [[PiSunyer2015SCALE]]'
};

inits.medtrials=()=>{
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const famOn={};MT_FAM.forEach(f=>famOn[f.id]=!f.off);
  const colOf=id=>MT_FAM.find(f=>f.id===id).col;
  /* the schematic shape between published points: a saturating curve, k weeks to settle */
  function segF(a,b,w){const span=b[0]-a[0],u=clamp((w-a[0])/span),k=span>40?.28:.38,q=(1-Math.exp(-u/k))/(1-Math.exp(-1/k));return lerp(a[1],b[1],q)}
  function valAt(S,w){const P=S.P;if(w<=P[0][0])return P[0][1];for(let i=1;i<P.length;i++)if(w<=P[i][0])return segF(P[i-1],P[i],w);return P[P.length-1][1]}
  /* chips */
  const chips=$('#mtChips');
  chips.insertAdjacentHTML('beforeend',MT_FAM.map(f=>`<button class="btn" data-mf="${f.id}" aria-pressed="${!f.off}"><span class="mt-sw" style="background:${f.col}"></span>${f.n}</button>`).join(''));
  const svg=$('#mtSvg'),rg=$('#mtT');
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const L=N?{x:40,w:220,y:34,h:470,gx:268,ty:524,xl:546}:{x:56,w:440,y:26,h:300,gx:506,ty:346,xl:368};
    const p=phaseOf(MT_STEPS,t),P=MT_STEPS[p];
    const xmax=lerp(76,124,ease(ramp(t,.8,.85))),X=w=>L.x+L.w*w/xmax,Y=v=>L.y+L.h*(-v)/27;
    let s=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    [0,-5,-10,-15,-20,-25].forEach(v=>{s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(L.x-6,Y(v)+3.5,(v?'−'+(-v):'0')+'%','t-xs t-end')});
    const tk=xmax>90?24:12;for(let w=0;w<=xmax;w+=tk){s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${L.y+L.h}" y2="${L.y+L.h+4}" class="axis"/>`+T(X(w),L.ty,w,'t-xs t-mid')}
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${L.y}" y2="${L.y}" class="axis"/>`+T(L.x+L.w,L.xl,'weeks since starting','t-xs t-end');
    s+=T(L.x,L.y-10,'mean % change in body weight','t-xs','fill:var(--ink);font-weight:700');
    /* stopping marks */
    const stopOn=ramp(t,.83,.88);
    if(stopOn>0){[[68,'STEP 1: all treatment stopped'],[36,'SURMOUNT-4: randomised']].forEach((m,i)=>{const x=X(m[0]);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3;opacity:${f1(stopOn)}"/>`;
      s+=`<text x="${f1(x+4)}" y="${f1(L.y+L.h-10-i*14)}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${f1(stopOn)}">${N?m[1].split(':')[0]:m[1]}</text>`})}
    const labs=[];
    MT_SER.forEach(S=>{if(!famOn[S.f])return;if(p<S.ph)return;
      let op=1;if(S.g==='main'&&p===4)op=.16;if(S.g==='main'&&p===5)op=0;if(S.g==='h2h'&&p===5)op=0;
      if(op<=0)return;
      const W=MT_WIN[S.ph],prog=ramp(t,W[0],W[1]),wEnd=S.P[S.P.length-1][0],wu=wEnd*prog;
      if(wu<=0)return;
      const col=colOf(S.f);let d='';const n=Math.max(2,Math.round(90*prog));
      for(let i=0;i<=n;i++){const w=wu*i/n;d+=(i?'L':'M')+f1(X(w))+' '+f1(Y(valAt(S,w)))}
      s+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:${S.dash?2.2:3};stroke-linejoin:round;opacity:${op}${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
      const v=valAt(S,wu),ex=X(wu),ey=Y(v);
      s+=`<circle cx="${f1(ex)}" cy="${f1(ey)}" r="${prog>=1?4:3}" style="fill:${col};stroke:var(--panel);stroke-width:1.5;opacity:${op}"/>`;
      S.P.slice(1,-1).forEach(q=>{if(wu>=q[0])s+=`<circle cx="${f1(X(q[0]))}" cy="${f1(Y(q[1]))}" r="3.5" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`});
      if(op>.5)labs.push({x:ex,y:ey,ly:ey+3,col,txt:`${N?S.s:S.n} ${v<0?'−':'+'}${Math.abs(v).toFixed(1)}%`,fin:prog>=1})});
    /* labels in the right gutter, pushed apart */
    labs.sort((a,b)=>a.ly-b.ly);for(let i=1;i<labs.length;i++)if(labs[i].ly-labs[i-1].ly<12)labs[i].ly=labs[i-1].ly+12;
    const bot=L.y+L.h+6,over=labs.length?labs[labs.length-1].ly-bot:0;if(over>0)labs.forEach(l=>l.ly-=over);
    labs.forEach(l=>{s+=`<path d="M${f1(l.x+5)} ${f1(l.y)}L${f1(L.gx-4)} ${f1(l.ly-3)}" style="stroke:${l.col};stroke-width:1;opacity:.5"/>`+T(L.gx,l.ly,l.txt,'t-xs',`fill:var(--ink);font-weight:${l.fin?700:500}`)});
    svg.innerHTML=s;
    setSt(p);$('#mtNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#mtPlay'),draw,24000,'%t:player.replay%','medtrials');
  const setSt=stepWire($('#mtSteps'),MT_STEPS,rg,draw,stop);
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-mf]');if(!b)return;const id=b.dataset.mf;famOn[id]=!famOn[id];b.setAttribute('aria-pressed',famOn[id]);draw(+rg.value)});
  draw(+rg.value);

  /* ---------- responders ---------- */
  const rsv=$('#mtResp'),tb=$('#mtTrialBtns'),hb=$('#mtThrBtns'),rnote=$('#mtRespNote');
  let ri=0,th=10,cur=[0,0],stopR=null;
  tb.insertAdjacentHTML('beforeend',MT_RESP.map((r,i)=>`<button class="btn" data-mr="${i}" aria-pressed="${i===0}">${r.n}</button>`).join(''));
  hb.insertAdjacentHTML('beforeend',[5,10,15,20].map(v=>`<button class="btn" data-mth="${v}" aria-pressed="${v===th}">${v}%</button>`).join(''));
  const target=()=>{const v=MT_RESP[ri].v[th];return v?v.slice():null};
  function drawR(){
    const N=vb(rsv,'720 300','400 560'),R=MT_RESP[ri],v=MT_RESP[ri].v[th];
    const sz=N?16:15,gp=4;
    const blocks=N?[[40,70],[40,340]]:[[90,62],[420,62]];
    let s=T(N?20:30,22,`${R.n} · ${R.wk} weeks · lost at least ${th}% of starting weight`,'t-sm','fill:var(--ink);font-weight:700');
    [[R.a,'var(--tx)',0],[R.b,'var(--figure-line)',1]].forEach((g,i)=>{const [bx,by]=blocks[i];
      const lbl=g[0].length>(N?44:46)?g[0].slice(0,g[0].lastIndexOf(' ',N?44:46))+'…':g[0];
      s+=T(bx,by-22,lbl,'t-xs','fill:var(--ink);font-weight:700');
      s+=T(bx,by-8,v?`${v[i]}% (shown as ${Math.round(v[i])} of 100)`:'not reported in the source used here','t-xs');
      const ia=iconArray(bx,by,{n:100,cols:10,size:sz,gap:gp,groups:[{k:v?Math.round(cur[i]):0,col:g[1]}],base:'var(--line)'});
      s+=ia.svg;
      s+=`<text x="${f1(bx+ia.w+14)}" y="${f1(by+ia.h/2+8)}" class="t-big" style="font-size:24px;fill:${i?'var(--muted)':'var(--tx)'};opacity:${v?1:0}">${Math.round(cur[i])}%</text>`});
    rsv.innerHTML=s;
    rnote.innerHTML=`<div class="kicker">${R.n}</div><h4>${v?`${v[0]}% vs ${v[1]}% lost at least ${th}%`:`The ${th}% threshold is not reported here`}</h4><p>${MT_RESP_TXT[R.n]}</p>${R.note?`<p>${R.note}</p>`:''}<p>Thresholds published for this trial: ${Object.keys(R.v).map(k=>'≥'+k+'%').join(', ')}. [[${R.c}]]</p><div class="pt"><b>%t:note.plain%</b>Out of every 100 people on the medicine, this many reached the threshold; the rest lost less, and a few lost little or none.</div>`;
  }
  function go2(){const to=target()||[0,0],from=cur.slice();stopR&&stopR();stopR=animate(650,q=>{const e=ease(q);cur=from.map((x,i)=>lerp(x,to[i],e));drawR()},()=>{stopR=null;cur=to;drawR()})}
  tb.addEventListener('click',e=>{const b=e.target.closest('[data-mr]');if(!b)return;ri=+b.dataset.mr;$$('[data-mr]',tb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(!MT_RESP[ri].v[th]){th=+Object.keys(MT_RESP[ri].v)[0];$$('[data-mth]',hb).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.mth===th))}go2()});
  hb.addEventListener('click',e=>{const b=e.target.closest('[data-mth]');if(!b)return;th=+b.dataset.mth;$$('[data-mth]',hb).forEach(x=>x.setAttribute('aria-pressed',x===b));go2()});
  cur=target()||[0,0];drawR();
  const prev=redraws.medtrials;redraws.medtrials=()=>{prev&&prev();drawR()};
  const prevH=onHide.medtrials;onHide.medtrials=()=>{prevH&&prevH();stopR&&stopR();stopR=null;cur=target()||[0,0]};
};
