/* =============== 5.1 Course, relapse & comorbidity =============== */
/* ten illustrative years, u = year/10. Episodes are listed so the readout can count them. */
const CO_YEARS=10;
const CO_BASE={
  knots:[[0,.04],[.004,.35],[.012,.78],[.022,.86],[.03,.55],[.038,.12],[.05,.02],[.08,-.08],[.11,.03],[.14,-.06],
    [.155,-.3],[.17,-.62],[.19,-.7],[.215,-.55],[.235,-.2],[.25,-.12],[.28,-.22],[.31,-.1],[.335,.05],
    [.345,.32],[.358,.38],[.37,.12],[.4,.0],[.43,-.08],[.45,-.36],[.47,-.7],[.5,-.66],[.52,-.34],[.545,-.2],[.58,-.28],[.61,-.12],[.65,-.04],[.68,.04],
    [.695,.5],[.71,.86],[.722,.8],[.735,.15],[.75,-.4],[.77,-.6],[.795,-.5],[.82,-.18],[.86,-.08],[.9,.04],[.94,-.06],[.97,.02],[1,0]],
  eps:[{u:.004,e:.038,p:'up',n:'mania (first episode)'},{u:.15,e:.235,p:'down',n:'depression'},{u:.34,e:.37,p:'up',n:'hypomania'},
    {u:.44,e:.525,p:'down',n:'depression'},{u:.69,e:.735,p:'up',n:'mania'},{u:.738,e:.82,p:'down',n:'depression (switched without recovery)'}]};
const CO_TX={
  knots:[[0,.04],[.004,.35],[.012,.78],[.022,.86],[.03,.55],[.038,.12],[.05,.02],[.08,-.05],[.11,.02],[.14,-.04],[.2,.02],[.26,-.06],[.31,.02],[.36,.06],[.4,.0],
    [.44,-.08],[.46,-.3],[.48,-.5],[.5,-.42],[.515,-.15],[.54,-.05],[.6,.02],[.66,-.04],[.72,.06],[.78,0],[.84,-.06],[.9,.02],[.96,-.03],[1,0]],
  eps:[{u:.004,e:.038,p:'up',n:'mania (first episode)'},{u:.465,e:.51,p:'down',n:'depression, shorter and milder'}]};
const CO_STEPS=[
  {from:0,at:.025,k:'Year 0 · first episode',t:'A first mania',
   txt:`This illustration starts with a first hospital admission for mania. In the McLean-Harvard First-Episode Mania Study (166 people), 98% reached syndromal recovery within 2 years, half of them by 5.4 weeks. [[Tohen2003]] Over up to 25 years of follow-up in another cohort, the median mood episode in bipolar I lasted 13 weeks, and more than 75% of people recovered from their episodes within a year of onset; episodes with a severe start, such as psychosis, took longer. [[Solomon2010]]`,
   pt:`Most episodes end. For most people a first mania settles within weeks to a few months with treatment.`,
   hook:`First-episode mania: 98% syndromal recovery by 2 years, median 5.4 weeks. [[Tohen2003]]`},
  {from:.045,at:.1,k:'Year 0.5–1.5 · recovery',t:'Mood back, life not yet',
   txt:`The mood line is back in the steady band, but the strip below it, return to usual work and living, lags. In the same study only 72% reached symptomatic recovery and 43% functional recovery within 2 years. [[Tohen2003]] Subsyndromal depression and persistent cognitive problems are the strongest correlates of poorer function. [[Gitlin2017]]`,
   pt:`Feeling better and getting back to work or school do not always happen at the same time. Getting back to daily life can take longer.`,
   hook:`Syndromal 98% → symptomatic 72% → functional 43% within 2 years of a first mania. [[Tohen2003]]`},
  {from:.14,at:.2,k:'Years 1.5–2.5 · recurrence',t:'The next episode',
   txt:`Recurrence is common. In STEP-BD, 858 people recovered from an episode, and 48.5% had a recurrence within up to 2 years. Depressive recurrences outnumbered manic, hypomanic or mixed ones more than two to one (34.7% vs 13.8%): it took 21.4 weeks for a quarter of people to have a depressive episode and 85.0 weeks for a quarter to have a high. [[Perlis2006STEPBD]] After a first mania, pooled cohorts show recurrence in 41.0% by 1 year and 59.7% by 4 years. [[Gignac2015]]`,
   pt:`After an episode ends, another one within a couple of years is common, and it is more often a low than a high. Staying in care helps lower that risk.`,
   hook:`STEP-BD: 48.5% recurrence within 2 years; depressive 34.7% vs manic/hypomanic/mixed 13.8%. [[Perlis2006STEPBD]]`},
  {from:.24,at:.3,k:'Years 2.5–4 · between episodes',t:'The quieter symptoms in between',
   txt:`Between full episodes the line rarely sits exactly on the midline. In weekly ratings over 12.8 years, subsyndromal, minor depressive and hypomanic symptoms took up 29.9% of weeks, nearly three times as many as full major depression or mania (11.2%). [[Judd2002]] Residual symptoms at recovery predicted an earlier recurrence in STEP-BD, so the authors name them a target for maintenance care. [[Perlis2006STEPBD]] A brief hypomania appears at year 3.5 in this illustration.`,
   pt:`"Not quite right" weeks between episodes are common and worth mentioning to your care team: treating leftover symptoms can protect against the next episode.`,
   hook:`Judd 2002: subsyndromal symptoms 29.9% of weeks vs syndromal 11.2%; residual symptoms predict earlier recurrence (STEP-BD). [[Judd2002,Perlis2006STEPBD]]`},
  {from:.42,at:.55,k:'Years 4–6 · depression again',t:'Depression takes the most time',
   txt:`A second, longer depression. Over the long run people with bipolar I spent 31.9% of weeks with depressive symptoms and 8.9% with manic or hypomanic symptoms, and changed symptom status about 6 times a year. [[Judd2002]] Comorbid drug-use disorder predicted a more chronic course. [[Judd2002]] In a cohort of 82 outpatients on continuous maintenance treatment, the 5-year risk of a manic or depressive relapse was 73%, which is why treatment plans include what to do when early warning signs appear. [[Gitlin1995]]`,
   pt:`Lows usually last longer than highs. A plan made while well, with your early warning signs written down, helps you act early.`,
   hook:`Bipolar I course: depressive symptoms 31.9% of weeks vs manic/hypomanic 8.9%; status changes about 6 times a year. [[Judd2002]]`},
  {from:.66,at:.8,k:'Years 7–10 · a switch',t:'Switching poles, and what treatment changes',
   txt:`Here a mania turns straight into depression without a well period in between. After a first mania, 19% switched to the opposite pole without recovering first, and 40% had a new episode within 2 years (20% mania, 20% depression). [[Tohen2003]] Press <b>With maintenance treatment</b> to compare a schematic treated course. In placebo-controlled trials lithium reduced new mood episodes (risk ratio 0.66) and manic episodes (0.52); [[Severus2014E]] individual psychological therapy reduced relapse at the end of treatment (RR 0.66). [[Oud2016]] A risk ratio of 0.66 means about a third fewer episodes on average, not none.`,
   pt:`Treatment does not promise no more episodes, but it makes them less likely, and it can make them shorter and milder.`,
   hook:`Lithium vs placebo for relapse prevention: RR 0.66 overall, 0.52 for mania. [[Severus2014E]]`}
];
/* comorbidities: ring prevalence plus detail bars */
const CO_CM=[
  {id:'anx',n:'Anxiety disorders',short:'Anxiety',v:45,lab:'45% lifetime',col:'var(--dx)',
   bars:[['Lifetime, any anxiety disorder',45],['Current, while mood is steady',34.7]],
   why:`Across 40 studies (14,914 people), 45% of people with bipolar disorder had an anxiety disorder in their lifetime, about three times the population rate (RR 3.22), with no difference between bipolar I and II. [[Pavlova2015]] Even while mood was steady, 34.7% met criteria for a current anxiety disorder (RR 4.60 against controls). [[Pavlova2017]] Panic attacks were the most common comorbidity in the worldwide surveys. [[Merikangas2011]]`,
   help:`Comorbid anxiety lengthens the delay to diagnosis and is linked to suicide attempts, [[Keramatian2025,Schaffer2015Meta]] so it is worth naming and treating in its own right.`},
  {id:'sud',n:'Alcohol & substance use',short:'Alcohol & drugs',v:42,lab:'42% alcohol (clinics)',col:'var(--accent)',
   bars:[['Alcohol use disorder, clinical samples',42],['Cannabis use disorder, clinical samples',20],['Other drug use disorder, clinical samples',17],['Any substance use disorder, population surveys',33]],
   why:`In clinical samples, alcohol use disorder was the most common substance problem (42%), then cannabis (20%) and other drugs (17%); men had a higher lifetime risk, and comorbid use was linked to earlier onset and slightly more admissions. [[Hunt2016Clinical]] In national household surveys the odds of bipolar disorder were about 4 times higher with alcohol use disorder (OR 4.09) and 5 times higher with illicit drug use (OR 4.96). [[Hunt2016Surveys]]`,
   help:`Drug-use disorder predicted a more chronic course in long-term follow-up, [[Judd2002]] and cannabis use is linked to manic symptoms. [[Gibbs2015]] Treating both together matters.`},
  {id:'mig',n:'Migraine',short:'Migraine',v:34.8,lab:'34.8%',col:'var(--rx)',
   bars:[['All bipolar disorder',34.8],['Bipolar II',54.17],['Bipolar I',32.7]],
   why:`Across 14 studies (3,976 people with bipolar disorder), the pooled prevalence of migraine was 34.8%, higher in bipolar II (54.17%) than in bipolar I (32.7%). [[Fornaro2015]]`,
   help:`Migraine is common enough to ask about routinely, and it is one more reason to tell every prescriber about all your medicines and conditions.`},
  {id:'met',n:'Cardiometabolic disease',short:'Heart & metabolism',v:37.3,lab:'37.3% metabolic syndrome',col:'var(--kid)',
   bars:[['Metabolic syndrome, all',37.3],['Metabolic syndrome, taking antipsychotics',45.3],['Metabolic syndrome, not taking antipsychotics',32.4]],
   why:`Across 37 publications (6,983 people), 37.3% of people with bipolar disorder had metabolic syndrome, about twice the odds of general population groups (OR 1.98); it was more common with antipsychotics (45.3% vs 32.4%). [[Vancampfort2013]] In severe mental illness, new cardiovascular disease was more frequent than in controls (adjusted HR 1.78). [[Correll2017CVD]] An American Heart Association statement classes bipolar disorder in youth as a moderate-risk condition for early cardiovascular disease. [[Goldstein2015AHA]]`,
   help:`NICE CG185 says people taking antipsychotics and long-term medication should be offered a combined healthy-eating and physical-activity programme. [[NICE2014CG185]] Regular checks of weight, blood sugar, cholesterol and blood pressure are part of good care. [[Vancampfort2013,Biazus2023]]`},
  {id:'adhd',n:'ADHD',short:'ADHD',v:17,lab:'17% of adults',col:'var(--up-fill)',
   bars:[['Children with bipolar disorder',73],['Adolescents with bipolar disorder',43],['Adults with bipolar disorder',17]],
   why:`Across 92 studies (17,089 people), ADHD was present in 73% of children, 43% of adolescents and 17% of adults with bipolar disorder, and was 1.7 times more common in bipolar disorder than in major depression. [[Sandstrom2021]] Telling ADHD and bipolar disorder apart is covered in <a href="#differential" data-go="differential">Bipolar or something else?</a>.`,
   help:`In 2,307 Swedish adults with bipolar disorder, starting methylphenidate alone was followed by a higher rate of mania within 3 months (HR 6.7), but not when a mood stabiliser was taken at the same time (HR 0.6). [[Viktorin2017]] That is a registry finding about groups; decisions belong with the care team.`}
];
inits.course=()=>{
  const svg=$('#coSvg'),rg=$('#coT'),note=$('#coNote'),read=$('#coRead'),rxB=$('#coRx');
  const fB=moodSeries(CO_BASE.knots),fT=moodSeries(CO_TX.knots);
  let rx=false;
  /* schematic function strip: 0 = not back to usual life, 1 = back; drops during episodes, returns slowly after */
  function funcAt(eps,u){let v=1;for(const e of eps){if(u<e.u)continue;if(u<=e.e){v=Math.min(v,.05);continue}
      const back=e.n.startsWith('mania (first')?.14:.07;v=Math.min(v,clamp(.05+(u-e.e)/back*.95,.05,1))}return v}
  function symShare(f,u){if(u<=0)return 0;const N=Math.max(1,Math.round(520*u));let k=0;for(let i=0;i<N;i++){const x=(i+.5)/N*u;if(Math.abs(f(x))>EU)k++}return k/N}
  const setActive=stepWire($('#coSteps'),CO_STEPS,rg,draw,()=>stop());
  function draw(t){const N=vb(svg,'720 380','400 400');
    const L=N?{x:28,y:58,w:356,h:250,fy:338,fh:14,ay:372}:{x:84,y:40,w:610,h:230,fy:292,fh:14,ay:324};
    const S=rx?CO_TX:CO_BASE,f=rx?fT:fB,o=rx?fB:fT;let s='';
    s+=`<text x="${N?14:14}" y="${N?24:24}" class="t-big">${rx?'With maintenance treatment (schematic)':'An illustrative course'}</text>`;
    if(!N)s+=`<text x="706" y="24" class="t-sm t-end">${rx?'dashed: same person without it':'10 years after a first mania'}</text>`;
    else s+=`<text x="14" y="42" class="t-sm">${rx?'dashed line: the same course without it':'10 years after a first mania'}</text>`;
    const lc=lifechart(L.x,L.y,L.w,L.h,f,{upto:t,id:'co',labels:true,dot:true});
    s+=lc.svg;
    if(rx){const g=lifechart(L.x,L.y,L.w,L.h,fB,{upto:t,ghost:true});s+=g.svg}
    /* episode markers */
    S.eps.forEach(e=>{if(t<e.u)return;const x0=lc.X(e.u),x1=lc.X(Math.min(t,e.e));const yy=e.p==='up'?L.y-2:L.y+L.h+2;
      s+=`<rect x="${f1(x0)}" y="${f1(e.p==='up'?yy-5:yy)}" width="${f1(Math.max(2,x1-x0))}" height="5" rx="2" style="fill:${e.p==='up'?'var(--up-fill)':'var(--down-fill)'}"/>`});
    /* function strip */
    s+=N?`<text x="${L.x}" y="${L.fy-6}" class="t-xs">Back to usual work and living (schematic)</text>`:`<text x="${L.x-8}" y="${L.fy+5}" class="t-xs t-end">usual life</text><text x="${L.x-8}" y="${L.fy+15}" class="t-xs t-end">back?</text>`;
    s+=`<rect x="${L.x}" y="${L.fy}" width="${L.w}" height="${L.fh}" rx="4" style="fill:var(--panel-2)"/>`;
    const M=120;for(let i=0;i<M;i++){const u=(i+.5)/M;if(u>t)break;const v=funcAt(S.eps,u);
      s+=`<rect x="${f1(L.x+L.w*i/M)}" y="${L.fy}" width="${f1(L.w/M+.4)}" height="${L.fh}" style="fill:${v>.95?'var(--good)':'var(--warn)'};opacity:${f1(v>.95?.85:.25+.5*v)}"/>`}
    s+=tline(L.x,L.ay,L.w,{min:0,max:10,step:N?2:1,fmt:v=>v+' y'}).svg;
    /* head */
    const yr=t*CO_YEARS,ph=phaseOf(CO_STEPS,t),pole=f.pole(t);
    const done=S.eps.filter(e=>t>=e.u),cur=S.eps.find(e=>t>=e.u&&t<=e.e);
    const sh=symShare(f,t);
    if(!rx&&t>=.045&&t<.14){const x=lc.X(N?.1:.12);s+=`<text x="${f1(x)}" y="${f1(L.y+L.h*.5-16)}" class="t-xs" style="fill:var(--eu);font-weight:600">mood recovered</text><text x="${f1(x)}" y="${L.fy-(N?20:6)}" class="t-xs" style="fill:var(--warn);font-weight:600">${N?'':'daily life still catching up'}</text>`}
    if(!rx&&t>=.66){const x=lc.X(.736),y=lc.Y(fB(.736));s+=`<text x="${f1(N?x-8:x+8)}" y="${f1(y-6)}" class="t-xs${N?' t-end':''}" style="fill:var(--mixed);font-weight:600">switch, no well gap</text>`}
    if(!rx&&t>=.24&&t<.42){const x=lc.X(.27),y=lc.Y(-.22);s+=`<text x="${f1(x)}" y="${f1(y+18)}" class="t-xs" style="fill:var(--down)">residual symptoms</text>`}
    svg.innerHTML=s;
    setActive(ph);note.innerHTML=noteHTML(CO_STEPS[ph]);
    const st=cur?cur.n:pole==='eu'?'steady band':pole==='up'?'raised mood, below episode level':'low mood, below episode level';
    read.innerHTML=`<span>Year <b>${f1(yr)}</b></span><span>Now: <b>${st}</b></span><span>Episodes so far: <b>${done.length}</b></span><span>Symptomatic weeks in this illustration: <b>${Math.round(sh*100)}%</b></span>`}
  const stop=playWire(rg,$('#coPlay'),draw,24000,'%t:player.replay%','course');
  rxB.addEventListener('click',()=>{rx=!rx;rxB.setAttribute('aria-pressed',rx);draw(+rg.value)});
  draw(+rg.value);

  /* ---- comorbidity ring ---- */
  const ring=$('#coRing'),cmNote=$('#coCmNote'),btns=$('#coCmBtns');let sel=0;
  btns.innerHTML=CO_CM.map((c,i)=>`<button class="btn" data-cm="${i}" aria-pressed="${i===0}">${c.n}</button>`).join('');
  btns.addEventListener('click',e=>{const b=e.target.closest('[data-cm]');if(!b)return;sel=+b.dataset.cm;$$('[data-cm]',btns).forEach((x,k)=>x.setAttribute('aria-pressed',k===sel));drawRing()});
  function arc(cx,cy,r,p){if(p>=1)p=.9999;const a0=-Math.PI/2,a1=a0+p*2*Math.PI,x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
    return `M${f1(x0)} ${f1(y0)}A${r} ${r} 0 ${p>.5?1:0} 1 ${f1(x1)} ${f1(y1)}`}
  function drawRing(){const N=vb(ring,'720 340','400 600');const C=CO_CM[sel];let s='';
    const R=N?{cx:200,cy:178,rr:118,nr:34}:{cx:178,cy:170,rr:118,nr:34};
    s+=`<circle cx="${R.cx}" cy="${R.cy}" r="${R.rr}" style="fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:3 5"/>`;
    s+=`<circle cx="${R.cx}" cy="${R.cy}" r="44" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.4"/><text x="${R.cx}" y="${R.cy-3}" class="t-xs t-mid" style="fill:var(--brand);font-weight:600">bipolar</text><text x="${R.cx}" y="${R.cy+10}" class="t-xs t-mid" style="fill:var(--brand);font-weight:600">disorder</text>`;
    CO_CM.forEach((c,i)=>{const a=-Math.PI/2+i*2*Math.PI/CO_CM.length,x=R.cx+R.rr*Math.cos(a),y=R.cy+R.rr*Math.sin(a),on=i===sel;
      s+=`<line x1="${f1(R.cx+44*Math.cos(a))}" y1="${f1(R.cy+44*Math.sin(a))}" x2="${f1(x-R.nr*Math.cos(a))}" y2="${f1(y-R.nr*Math.sin(a))}" style="stroke:${on?c.col:'var(--line)'};stroke-width:${on?2.2:1.2}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${R.nr}" style="fill:var(--panel);stroke:var(--line);stroke-width:1"/>`;
      s+=`<path d="${arc(x,y,R.nr-4,c.v/100)}" style="fill:none;stroke:${c.col};stroke-width:${on?7:5};stroke-linecap:round;opacity:${on?1:.6}"/>`;
      s+=`<text x="${f1(x)}" y="${f1(y+5)}" class="t-lbl t-mid" style="font-size:${on?14:12.5}px">${c.v}%</text>`;
      const below=Math.sin(a)>.2,ly=below?y+R.nr+14:y-R.nr-7;
      s+=`<text x="${f1(x)}" y="${f1(ly)}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${c.short}</text>`});
    /* detail bars */
    const B=N?{x:20,y:372,w:360,row:52}:{x:376,y:58,w:320,row:56};
    s+=`<text x="${B.x}" y="${B.y-24}" class="t-big" style="font-size:15px">${C.n}</text>`;
    C.bars.forEach(([n,v],k)=>{const y=B.y+k*B.row,w=B.w*v/100;
      s+=`<text x="${B.x}" y="${y}" class="t-xs" style="fill:var(--ink)">${n}</text>`;
      s+=`<rect x="${B.x}" y="${y+7}" width="${B.w}" height="16" rx="8" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${y+7}" width="${f1(w)}" height="16" rx="8" style="fill:${C.col}"/>`;
      s+=`<text x="${f1(Math.min(B.x+w+6,B.x+B.w-30))}" y="${y+19}" class="t-xs" style="fill:var(--ink);font-weight:700">${v}%</text>`});
    ring.innerHTML=s;
    cmNote.innerHTML=`<div class="kicker">Comorbidity · ${C.lab}</div><h4>${C.n}</h4><p>${C.why}</p><div class="pt"><b>Why it matters</b>${C.help}</div>`}
  drawRing();
  const prevR=redraws.course;redraws.course=()=>{prevR&&prevR();drawRing()};
};
