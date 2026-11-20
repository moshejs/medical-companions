/* =============== 1.2 Mania, hypomania & depression =============== */
inits.episodes=()=>{
  const WK=36;                       /* the illustrative course runs 36 weeks */
  const U=w=>w/WK;
  /* one illustrative course: knots [week, mood v] */
  const f=moodSeries([[0,.02],[1.6,-.04],[3.2,.03],[4,.06],[4.4,.22],[4.8,.37],[5.1,.38],[5.4,.22],[5.8,.05],[7.6,-.03],[9.6,.03],[10.2,.2],[10.8,.55],[11.6,.8],[12.8,.86],[13.8,.76],[14.6,.5],[15.3,.12],[16.1,-.3],[17.2,-.6],[19,-.72],[21.5,-.7],[24,-.62],[26,-.42],[27.6,-.18],[29,-.05],[31,.03],[33.5,-.02],[36,.01]].map(([w,v])=>[U(w),v]));
  const MIX=[14.1,16.4];             /* weeks drawn as a mixed stretch */
  /* episodes for the duration meter: start, end (weeks), DSM-5-TR minimum in days */
  const EPIS=[
    {k:'hypo',n:'Hypomanic episode',a:4.35,b:5.5,min:4,col:'var(--up)',fill:'var(--up-fill)'},
    {k:'mania',n:'Manic episode',a:10.2,b:15.5,min:7,col:'var(--up)',fill:'var(--up-fill)'},
    {k:'dep',n:'Major depressive episode',a:15.51,b:27.8,min:14,col:'var(--down)',fill:'var(--down-fill)'}];
  const STEPS=[
    {from:0,at:U(2.4),k:'Weeks 0–4 · steady mood',t:'Well (euthymia)',
     txt:`The line sits in the green band: mood, energy and sleep feel like the person's usual self. In bipolar disorder these well stretches are real and can be long. Over 12.8 years of weekly ratings, people with bipolar I had no symptoms in a little over half of all weeks (they had symptoms in 47.3%). [[Judd2002]]`,
     pt:`Bipolar disorder is not a constant state. Between episodes, many people feel like themselves.`,
     hook:`Diagnosis is about <b>episodes</b>: a change from the person's usual self that lasts a set number of days. [[APA2022,Yatham2018]]`},
    {from:U(4),at:U(5.3),k:'Week 4–5 · ≥4 days',t:'Hypomania',
     txt:`Mood lifts or turns irritable, and energy and activity rise with it. Sleep shortens without tiredness, talk speeds up, ideas come quickly. DSM-5-TR requires this to last at least 4 consecutive days, most of the day, nearly every day, with at least 3 of the 7 symptoms (4 if mood is only irritable). The change is clear to others but does not cause marked impairment, need hospital care or bring psychosis. Watch the meter below the chart reach day 4. [[APA2022,Yatham2018]]`,
     pt:`Hypomania is a milder high that lasts at least 4 days. Other people notice the change, but it does not wreck work or home life. It can even feel good, which is one reason it is missed.`,
     hook:`Hypomania: ≥4 consecutive days, observable change, NO marked impairment, NO hospitalisation, NO psychosis. Psychosis makes it mania by definition. [[APA2022,Yatham2018]]`},
    {from:U(9.8),at:U(12.6),k:'Weeks 10–15 · ≥1 week',t:'Mania',
     txt:`The same kinds of symptoms, now severe: feeling rested after very little sleep, pressured speech that is hard to interrupt, racing thoughts or flight of ideas, distractibility, grandiosity, driven activity, and risky choices with painful consequences such as spending sprees. Mania lasts at least 1 week, or any length if hospital care is needed, and causes marked impairment, needs hospitalisation, or brings psychotic features. One manic episode is enough for a diagnosis of bipolar I. [[APA2022,Yatham2018,McIntyre2020Lancet]]`,
     pt:`Mania is a severe high that lasts a week or more and causes serious problems, needs hospital care, or comes with losing touch with reality. The person may not see the change in themselves.`,
     hook:`Mania: ≥1 week (any duration if hospitalised) + 3 of 7 B symptoms (4 if only irritable) + marked impairment, hospitalisation or psychosis. Since DSM-5, increased energy or activity is required in Criterion A. [[APA2022,Yatham2018]]`},
    {from:U(MIX[0]),at:U(15.2),k:'Weeks 14–16 · both poles at once',t:'Mixed features',
     txt:`As the high breaks, energy and racing thoughts can persist while mood turns dark, anxious or irritable: the mauve band. DSM-5 replaced the old "mixed episode" with a "with mixed features" specifier, used when symptoms of the opposite pole appear during a manic, hypomanic or depressive episode. In a meta-analysis, mixed features were present in 26.8% of manic or hypomanic episodes and 11.6% of major depressive episodes. ICD-11 keeps a separate mixed episode lasting at least 2 weeks. [[Mason2016,Yatham2018,Na2021,Stein2020BMC]]`,
     pt:`In a mixed state a person can feel low and hopeless but also restless, sped-up and unable to sleep. It is a time to stay closely in touch with the care team.`,
     hook:`DSM-5/5-TR: "with mixed features" is a <b>specifier</b>; ICD-11: a mixed <b>episode</b> of ≥2 weeks. [[Yatham2018,Stein2020BMC]]`},
    {from:U(16.6),at:U(21),k:'Weeks 16–28 · ≥2 weeks',t:'Depression',
     txt:`A major depressive episode needs 5 or more of 9 symptoms in the same 2-week period, including depressed mood or loss of interest or pleasure: weight or appetite change, sleeping too little or too much, slowing or agitation, fatigue, worthlessness or guilt, poor concentration or indecision, and recurrent thoughts of death. There are no separate criteria for bipolar depression. Notice how much longer this stretch lasts than the high: over the long term, depressive symptoms take up far more weeks than manic ones. [[APA2022,Yatham2018,Judd2002]]`,
     pt:`The low is usually longer than the high. Energy drains, sleep goes wrong, and everything feels slow and heavy. Thoughts of death can be part of the illness; they are a reason to reach out for help straight away, and help works.`,
     hook:`Major depressive episode: 5 of 9 symptoms for ≥2 weeks, one of them depressed mood or loss of interest. In bipolar I, 31.9% of weeks were depressive vs 8.9% manic/hypomanic. [[APA2022,Judd2002]]`},
    {from:U(27),at:U(31.5),k:'Weeks 28–36 · back to steady',t:'Recovery',
     txt:`The line returns to the steady band. After a first hospitalisation for mania, 98% of people reached syndromal recovery within 2 years, half of them by 5.4 weeks; returning to previous work and living took longer (43% by 2 years). Many people with bipolar disorder work: up to 60% of people with established illness are employed. Effective treatment exists for every phase, and lithium and other treatments help prevent the next episode (see <a href="#lithium" data-go="lithium">Lithium</a>). [[Tohen2003,Marwaha2013,Yatham2018]]`,
     pt:`Episodes end. With treatment, most people recover from an episode, and many go on to work and live full lives. Getting back to everyday life can take longer than the symptoms do.`,
     hook:`Tohen 2003: syndromal recovery 98% by 2 years, but functional recovery only 43%; 40% had a new episode within 2 years of recovery. [[Tohen2003]]`}
  ];
  /* state of the person at week w */
  function state(w){
    const v=f(U(w)),m=w>=MIX[0]&&w<=MIX[1]?bump(w,MIX[0]-.3,MIX[1]+.3):0;
    const vp=clamp(v/.85),vn=clamp(-v/.72);
    let ph=v>HYPO?'mania':v>EU?'hypo':v<-EU?'dep':'eu';if(m>.35)ph='mixed';
    const mx=Math.max(vp,m*.8);
    return {v,m,vp,vn,ph,
      bed:23+3*mx-1*vn, wake:7-1.6*mx+2*vn, broken:clamp(vn*.7+m*.4),
      energy:clamp(.5+.5*vp-.42*vn+.3*m), speech:clamp(.5+.5*vp-.4*vn+.32*m), think:clamp(.5+.5*vp-.4*vn+.35*m)};
  }
  const WORD={
    eu:{n:'Steady mood',c:'var(--eu)',sl:'Usual sleep',en:'Usual energy',sp:'Usual pace',th:'Clear and flexible'},
    hypo:{n:'Hypomania',c:'var(--up)',sl:'Needs less sleep',en:'More energy',sp:'Chattier, quicker',th:'Quick, many ideas'},
    mania:{n:'Mania',c:'var(--up)',sl:'Rested on very little',en:'Driven, can’t sit still',sp:'Pressured, hard to interrupt',th:'Racing, jumps topic'},
    mixed:{n:'Mixed features',c:'var(--mixed)',sl:'Little, restless sleep',en:'Agitated and tired',sp:'Fast but tense',th:'Racing and dark'},
    dep:{n:'Depression',c:'var(--down)',sl:'Broken, or too much',en:'Drained',sp:'Slow, few words',th:'Slowed, hard to decide'}};
  const svg=$('#epSvg'),rg=$('#epT'),note=$('#epNote'),read=$('#epRead');
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  /* one side panel: kind sleep|energy|speech|think in box x,y,w,h */
  function panel(kind,x,y,w,h,S,t){
    const W=WORD[S.ph];let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const title={sleep:'Sleep',energy:'Energy & activity',speech:'Speech',think:'Thinking'}[kind];
    s+=T(x+10,y+16,title,'t-sm','font-weight:600;fill:var(--ink)');
    const word={sleep:W.sl,energy:W.en,speech:W.sp,think:W.th}[kind];
    s+=T(x+10,y+31,word,'t-xs',`fill:${W.c};font-weight:600;font-size:10px`);
    const cx=x+10,cw=w-20,cy=y+36,ch=h-42;
    if(kind==='sleep'){
      const sb=sleepbar(cx+2,cy+8,cw-44,Math.min(16,ch*.32),{sleep:[S.bed%24,S.wake],broken:S.broken,hours:true});
      s+=sb.svg;
      const lb=[[12,'12'],[18,'18'],[0,'00'],[6,'06']];
      lb.forEach(([hr,l])=>{s+=T(sb.X(hr),cy+8+Math.min(16,ch*.32)+13,l,'t-xs t-mid','font-size:8px')});
    }else if(kind==='energy'){
      const val=kind==='energy'?S.energy:0,bw=cw,by=cy+10,bh=Math.min(14,ch*.3);
      s+=`<rect x="${f1(cx)}" y="${f1(by)}" width="${f1(bw)}" height="${f1(bh)}" rx="${f1(bh/2)}" style="fill:var(--panel-2)"/>`;
      const c=S.ph==='dep'?'var(--down-fill)':S.ph==='mixed'?'var(--mixed-fill)':S.ph==='eu'?'var(--eu)':'var(--up-fill)';
      s+=`<rect x="${f1(cx)}" y="${f1(by)}" width="${f1(bw*val)}" height="${f1(bh)}" rx="${f1(bh/2)}" style="fill:${c}"/>`;
      s+=`<line x1="${f1(cx+bw*.5)}" x2="${f1(cx+bw*.5)}" y1="${f1(by-3)}" y2="${f1(by+bh+3)}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 2"/>`;
      s+=T(cx+bw*.5,by+bh+13,'usual','t-xs t-mid','font-size:8px');
      /* a little walking figure whose stride follows energy */
      const px=cx+bw*val,amp=2+val*6,ph=Math.sin(t*WK*7*(.5+val*2))*amp;
      s+=`<g transform="translate(${f1(clamp(px,cx+6,cx+bw-6))} ${f1(by-1)})"><circle cx="0" cy="-12" r="3" style="fill:var(--ink)"/><path d="M0 -9V-3M0 -3L${f1(ph/2)} 1M0 -3L${f1(-ph/2)} 1M0 -7L${f1(-ph/2)} -4M0 -7L${f1(ph/2)} -4" style="stroke:var(--ink);stroke-width:1.4;stroke-linecap:round;fill:none"/></g>`;
    }else if(kind==='speech'){
      const bx=cx,by=cy+2,bw=cw*.62,bh=Math.min(30,ch-10);
      const bc=S.ph==='dep'?'var(--down-soft)':S.ph==='mixed'?'var(--mixed-soft)':S.ph==='eu'?'var(--eu-soft)':'var(--up-soft)';
      s+=`<path d="M${f1(bx+8)} ${f1(by)}H${f1(bx+bw-8)}Q${f1(bx+bw)} ${f1(by)} ${f1(bx+bw)} ${f1(by+8)}V${f1(by+bh-8)}Q${f1(bx+bw)} ${f1(by+bh)} ${f1(bx+bw-8)} ${f1(by+bh)}H${f1(bx+22)}L${f1(bx+12)} ${f1(by+bh+7)}L${f1(bx+14)} ${f1(by+bh)}H${f1(bx+8)}Q${f1(bx)} ${f1(by+bh)} ${f1(bx)} ${f1(by+bh-8)}V${f1(by+8)}Q${f1(bx)} ${f1(by)} ${f1(bx+8)} ${f1(by)}Z" style="fill:${bc};stroke:var(--line)"/>`;
      /* words as dashes: more and shorter gaps when speech is fast */
      const n=Math.round(2+S.speech*12),rr=rng(Math.floor(t*400)+3),rows=2,gap=S.speech>.7?2:5;
      for(let r=0;r<rows;r++){let xx=bx+7;const yy=by+bh*(r+1)/(rows+1);for(let i=0;i<n/rows;i++){const l=4+rr()*9;if(xx+l>bx+bw-6)break;s+=`<line x1="${f1(xx)}" x2="${f1(xx+l)}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round;opacity:.65"/>`;xx+=l+gap+(1-S.speech)*8}}
      const wpm=Math.round(lerp(60,260,S.speech));
      s+=T(x+w-10,by+bh*.5+3,'rate','t-xs t-end','font-size:8px');
      s+=`<rect x="${f1(bx+bw+8)}" y="${f1(by+bh*.5+7)}" width="${f1((x+w-10-(bx+bw+8))*S.speech)}" height="5" rx="2.5" style="fill:${W.c};opacity:.7"/>`;
      void wpm;
    }else{
      /* thought bubbles: many fast ones when racing, few slow ones when low */
      const n=Math.round(2+S.think*9),rr=rng(5),sp=.4+S.think*3;
      const hx=cx+12,hy=cy+ch*.55;
      s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="9" style="fill:var(--panel-2);stroke:var(--brain-line)"/><path d="M${f1(hx-6)} ${f1(hy+8)}Q${f1(hx)} ${f1(hy+16)} ${f1(hx+6)} ${f1(hy+8)}" style="fill:var(--panel-2);stroke:var(--brain-line)"/>`;
      for(let i=0;i<n;i++){const ph=(rr()+t*WK*sp*.6)%1,ang=rr()*1.4-.7,dist=14+ph*(cw-34);
        const px=hx+dist*Math.cos(ang*.6),py=hy-8+Math.sin(ang)*ch*.35*(.3+ph*.7)-ph*4;
        if(px>x+w-8)continue;
        const c=S.ph==='dep'?'var(--down-fill)':S.ph==='mixed'?'var(--mixed-fill)':S.ph==='eu'?'var(--eu)':'var(--up-fill)';
        s+=`<circle cx="${f1(px)}" cy="${f1(clamp(py,cy+4,y+h-6))}" r="${f1(2+S.think*1.5+(1-ph)*1.5)}" style="fill:${c};opacity:${f1(.35+(1-ph)*.55)}"/>`}
    }
    return s;
  }
  function meter(x,y,w,wk){
    const E=EPIS.find(e=>wk>=e.a&&wk<=e.b+.01),past=EPIS.filter(e=>wk>e.b);
    let s='';
    if(!E){
      const lbl=past.length?'Between episodes: mood back in the steady band':'No episode: mood in the steady band';
      s+=T(x,y+11,lbl,'t-sm','fill:var(--eu);font-weight:600');
      s+=T(x,y+28,past.length?`Episodes so far: ${past.map(e=>e.n.replace(' episode','')).join(' → ')}`:'Scrub or press Play to follow the course','t-xs');
      return s;
    }
    const days=(wk-E.a)*7,span=Math.max(E.min*1.6,24),bw=w-150;
    const X=d=>x+bw*clamp(d/span);
    s+=T(x,y+11,`${E.n} · day ${Math.max(1,Math.floor(days)+1)}`,'t-sm',`fill:${E.col};font-weight:600`);
    s+=`<rect x="${f1(x)}" y="${f1(y+18)}" width="${f1(bw)}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y+18)}" width="${f1(X(days)-x)}" height="10" rx="5" style="fill:${E.fill};opacity:.85"/>`;
    s+=`<line x1="${f1(X(E.min))}" x2="${f1(X(E.min))}" y1="${f1(y+14)}" y2="${f1(y+32)}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    s+=T(X(E.min),y+43,`DSM-5-TR minimum: ${E.min} days`,'t-xs t-mid');
    const met=days>=E.min;
    s+=T(x+bw+12,y+27,met?'✓ long enough':'not yet',`t-sm`,`fill:${met?'var(--good)':'var(--muted)'};font-weight:600`);
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 420','400 636');
    const wk=t*WK,S=state(wk),W=WORD[S.ph];
    let s=`<defs>${marker('epAr','var(--muted)')}</defs>`;
    const C=N?{x:40,y:40,w:344,h:220}:{x:40,y:38,w:420,h:264};
    s+=T(C.x-30,22,`Week ${f1(wk)}`,'t-lbl');
    s+=T(C.x+C.w,22,W.n,'t-big t-end',`fill:${W.c}`);
    const lc=lifechart(C.x,C.y,C.w,C.h,f,{upto:t,id:'epLc',labels:true,dot:true,mixed:t*WK>=MIX[0]?[[U(MIX[0]),U(Math.min(MIX[1],wk))]]:[]});
    s+=lc.svg;
    /* episode brackets above the chart for finished or current episodes */
    EPIS.forEach(E=>{if(wk<E.a)return;const x0=lc.X(U(E.a)),x1=lc.X(U(Math.min(E.b,wk)));
      const yy=E.k==='dep'?C.y+C.h+4:C.y-4,d=E.k==='dep'?4:-4;
      s+=`<path d="M${f1(x0)} ${f1(yy-d)}V${f1(yy)}H${f1(x1)}${wk>=E.b?`V${f1(yy-d)}`:''}" style="fill:none;stroke:${E.col};stroke-width:1.4"/>`});
    const ax=tline(C.x,C.y+C.h+16,C.w,{min:0,max:WK,step:N?6:4,label:'weeks'});
    s+=ax.svg;
    /* tags on the chart for the thresholds once reached */
    EPIS.forEach(E=>{const met=E.a+E.min/7;if(wk<met)return;const [px,py]=lc.at(U(met));
      s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3.5" style="fill:var(--panel);stroke:${E.col};stroke-width:1.6"/>`;
      const lbl=E.k==='dep'?'day 14':E.k==='mania'?'day 7':'day 4';
      s+=T(px+6,py+(E.k==='dep'?14:-6),lbl,'t-xs',`fill:${E.col};font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px`)});
    const my=N?C.y+C.h+52:C.y+C.h+52;
    s+=meter(C.x,my,N?C.w:C.w+250,wk);
    /* side panels */
    if(N){const px=12,py=my+60,pw=184,ph=124,g=8;
      s+=panel('sleep',px,py,pw,ph,S,t)+panel('energy',px+pw+g,py,pw,ph,S,t)+panel('speech',px,py+ph+g,pw,ph,S,t)+panel('think',px+pw+g,py+ph+g,pw,ph,S,t);
    }else{const px=488,pw=224,ph=90,g=6,py=30;
      ['sleep','energy','speech','think'].forEach((k,i)=>{s+=panel(k,px,py+i*(ph+g),pw,ph,S,t)});
    }
    svg.innerHTML=s;
    const i=phaseOf(STEPS,t);setA(i);note.innerHTML=noteHTML(STEPS[i]);
    read.innerHTML=`<span>Week <b>${f1(wk)}</b></span><span>State <b>${W.n}</b></span><span>Sleep <b>${W.sl.toLowerCase()}</b></span><span>Speech <b>${W.sp.toLowerCase()}</b></span>`;
  }
  const stop=playWire(rg,$('#epPlay'),draw,16000,'%t:player.replay%','episodes');
  const setA=stepWire($('#epSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- symptom sorter ---------- */
  const CARDS=[
    {s:'Feels rested after only a few hours of sleep',a:'m',why:`Decreased need for sleep is a Criterion B symptom of mania and hypomania. In a major depressive episode the sleep symptom is insomnia or sleeping too much. [[APA2022,Yatham2018]]`},
    {s:'Talks much more than usual, hard to interrupt',a:'m',why:`More talkative than usual, or pressure to keep talking, is one of the 7 manic/hypomanic symptoms. [[APA2022,Yatham2018]]`},
    {s:'Thoughts racing, jumping from topic to topic',a:'m',why:`Flight of ideas, or the experience that thoughts are racing, is a manic/hypomanic symptom. In depression thinking slows and decisions get hard. [[APA2022,Yatham2018]]`},
    {s:'Feels unusually important, special or gifted',a:'m',why:`Inflated self-esteem or grandiosity is a manic/hypomanic symptom; grandiose delusions are the commonest psychotic symptom in bipolar disorder. [[APA2022,Dunayevich2000]]`},
    {s:'Spending sprees or risky ventures out of character',a:'m',why:`Excessive involvement in activities with a high potential for painful consequences is a manic/hypomanic symptom. [[APA2022,Yatham2018]]`},
    {s:'Lost interest or pleasure in almost everything',a:'d',why:`Markedly diminished interest or pleasure is one of the two core symptoms of a major depressive episode (the other is depressed mood). [[APA2022,Yatham2018]]`},
    {s:'Feels worthless or weighed down by guilt',a:'d',why:`Feelings of worthlessness or excessive guilt are a major depressive symptom. Guilt was also commoner in mixed than in pure mania. [[APA2022,Cassidy1998]]`},
    {s:'Exhausted, no energy even for small tasks',a:'d',why:`Fatigue or loss of energy is a major depressive symptom. In mania and hypomania, energy and activity are increased: that is part of Criterion A. [[APA2022,Yatham2018]]`},
    {s:'Appetite or weight changes noticeably',a:'d',why:`Significant weight or appetite change is one of the 9 major depressive symptoms. [[APA2022,Yatham2018]]`},
    {s:'Irritable, snapping at people',a:'b',why:`Irritable mood can carry a manic or hypomanic episode (then 4 rather than 3 B symptoms are needed), and irritability was prominent in mania and more common in mixed mania. It turns up in depression too. [[APA2022,Cassidy1998]]`},
    {s:'Easily distracted, cannot focus on one thing',a:'b',why:`Distractibility is a manic/hypomanic symptom, and a diminished ability to think, concentrate or decide is a depressive one. Same experience, both poles. [[APA2022,Yatham2018]]`},
    {s:'Restless, pacing, cannot sit still',a:'b',why:`Psychomotor agitation is listed for mania (with increased goal-directed activity) and for major depression (agitation or slowing). Agitation alongside low mood is a classic picture of a mixed state. [[APA2022,Yatham2018,Cassidy1998]]`}
  ];
  const ZN={m:'Mania / hypomania',d:'Depression',b:'Both'};
  const pool=$('#epPool'),zones={m:$('#epZm'),d:$('#epZd'),b:$('#epZb')},score=$('#epScore');
  const ans=store.get('epSort',{});
  /* shuffled once, in a fixed order so the page is the same each visit */
  const order=CARDS.map((c,i)=>i).sort((a,b)=>((a*7+3)%12)-((b*7+3)%12));
  const cardEl={};
  order.forEach(i=>{const c=CARDS[i],el=document.createElement('div');el.className='ep-card';el.draggable=true;el.dataset.i=i;
    el.innerHTML=`<b>${c.s}</b><div class="ep-opts" role="group" aria-label="Where does it belong?">${['m','d','b'].map(z=>`<button type="button" data-ez="${z}" aria-pressed="false">${ZN[z]}</button>`).join('')}</div><p class="ep-fb"></p>`;
    cardEl[i]=el;pool.appendChild(el)});
  function place(i,z,save=true){const el=cardEl[i],c=CARDS[i];
    if(!z){delete ans[i];pool.appendChild(el);el.classList.remove('ok','no');$('.ep-fb',el).innerHTML='';$$('[data-ez]',el).forEach(b=>b.setAttribute('aria-pressed','false'))}
    else{ans[i]=z;zones[z].appendChild(el);const ok=z===c.a;el.classList.toggle('ok',ok);el.classList.toggle('no',!ok);
      $$('[data-ez]',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.ez===z?'true':'false'));
      $('.ep-fb',el).innerHTML=(ok?'<b>Yes.</b> ':`<b>Not quite: mostly ${ZN[c.a].toLowerCase()}.</b> `)+c.why}
    if(save)store.set('epSort',ans);tally()}
  function tally(){const k=Object.keys(ans),ok=k.filter(i=>ans[i]===CARDS[i].a).length;
    score.textContent=k.length?`${k.length} of 12 sorted · ${ok} correct`:'0 of 12 sorted'}
  $('#epSort').addEventListener('click',e=>{const b=e.target.closest('[data-ez]');if(!b)return;const el=b.closest('.ep-card');place(+el.dataset.i,b.dataset.ez)});
  let dragI=null;
  $('#epSort').addEventListener('dragstart',e=>{const el=e.target.closest&&e.target.closest('.ep-card');if(!el)return;dragI=+el.dataset.i;try{e.dataTransfer.setData('text/plain',String(dragI));e.dataTransfer.effectAllowed='move'}catch(_){}});
  Object.entries(zones).forEach(([z,el])=>{
    el.addEventListener('dragover',e=>{e.preventDefault();el.classList.add('over')});
    el.addEventListener('dragleave',()=>el.classList.remove('over'));
    el.addEventListener('drop',e=>{e.preventDefault();el.classList.remove('over');if(dragI!=null)place(dragI,z);dragI=null})});
  $('#epReveal').addEventListener('click',()=>{CARDS.forEach((c,i)=>place(i,c.a,false));store.set('epSort',ans)});
  $('#epReset').addEventListener('click',()=>{order.forEach(i=>place(i,null,false));store.set('epSort',{})});
  Object.keys(ans).forEach(i=>{if(CARDS[i]&&zones[ans[i]])place(+i,ans[i],false)});tally();

  /* ---------- weeks waffle ---------- */
  const WD={
    1:{n:'Bipolar I',parts:[['Depressive symptoms',31.9,'var(--down-fill)'],['Manic or hypomanic',8.9,'var(--up-fill)'],['Cycling or mixed',5.9,'var(--mixed-fill)']],any:47.3,src:'Judd2002',
       note:{k:'NIMH CDS · 146 people · mean 12.8 years',t:'Bipolar I: lows outweigh highs',txt:`People with bipolar I had symptoms in 47.3% of weeks: depressive symptoms in 31.9%, manic or hypomanic in 8.9% and cycling or mixed in 5.9%. Milder, subsyndromal symptoms (29.9% of weeks) were nearly three times as common as full episodes (11.2%), and symptom status changed about 6 times a year. [[Judd2002]]`,
        pt:`Even in bipolar I, which is defined by mania, people spend roughly three to four times as many weeks low as high.`,hook:`Judd 2002 (BP-I): 47.3% of weeks symptomatic; depressive 31.9% vs manic/hypomanic 8.9%. [[Judd2002]]`}},
    2:{n:'Bipolar II',parts:[['Depressive symptoms',50.3,'var(--down-fill)'],['Hypomanic',1.3,'var(--up-fill)'],['Cycling or mixed',2.3,'var(--mixed-fill)']],any:53.9,src:'Judd2003',
       note:{k:'NIMH CDS · 86 people · mean 13.4 years',t:'Bipolar II: depression dominates',txt:`People with bipolar II had symptoms in 53.9% of weeks: depressive symptoms in 50.3%, hypomanic in only 1.3% and cycling or mixed in 2.3%. People with brief hypomanias (2–6 days) did not differ on any measure from those whose hypomanias lasted 7 days or more. CANMAT calls the idea of bipolar II as a "less severe form" discredited. [[Judd2003,Yatham2018]]`,
        pt:`Bipolar II is not "bipolar lite". Its lows can be just as heavy and long as those in bipolar I.`,hook:`Judd 2003 (BP-II): 50.3% of weeks depressive vs 1.3% hypomanic. Depression is the main burden in both types. [[Judd2003,McIntyre2020Lancet]]`}}};
  const wsvg=$('#epWeeks'),wnote=$('#epWNote');let wk=1,stopW=null;
  function drawW(p){
    const N=vb(wsvg,'720 300','400 470'),D=WD[wk];
    const cells=[];D.parts.forEach(([n,v,c])=>{for(let i=0;i<Math.round(v);i++)cells.push(c)});
    while(cells.length<100)cells.push('none');
    const cs=N?22:22,g=3,gx=N?(400-10*(cs+g))/2:30,gy=N?36:40;
    let s=T(N?gx:gx,22,`${D.n}: 100 squares = all follow-up weeks`,'t-lbl');
    const shown=Math.round(100*p);
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,x=gx+c*(cs+g),y=gy+r*(cs+g);const col=cells[i];
      const on=i<shown&&col!=='none';
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${cs}" height="${cs}" rx="4" style="fill:${on?col:'var(--panel-2)'};stroke:${col==='none'&&i<shown?'var(--eu)':'none'};stroke-width:1.2"/>`}
    /* legend with counters */
    const lx=N?20:gx+10*(cs+g)+40,ly=N?gy+10*(cs+g)+26:gy+20;
    const rows=D.parts.concat([['No symptoms',+(100-D.any).toFixed(1),'var(--panel-2)']]);
    let acc=0;
    rows.forEach(([n,v,c],i)=>{const yy=ly+i*(N?28:44),start=acc;acc+=Math.round(v);
      const frac=clamp((shown-start)/Math.max(1,Math.round(v))),val=i<rows.length-1?v*frac:v*clamp((p-.9)*10);
      s+=`<rect x="${f1(lx)}" y="${f1(yy-11)}" width="14" height="14" rx="3" style="fill:${c};stroke:${i===rows.length-1?'var(--eu)':'none'}"/>`;
      s+=T(lx+22,yy,n,'t-lbl');
      s+=T(lx+(N?250:300),yy,`${f1(val)}%`,'t-big t-end');
      if(!N){const bw=200;s+=`<rect x="${f1(lx+22)}" y="${f1(yy+8)}" width="${bw}" height="6" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(lx+22)}" y="${f1(yy+8)}" width="${f1(bw*val/60)}" height="6" rx="3" style="fill:${c==='var(--panel-2)'?'var(--eu)':c}"/>`}
    });
    s+=T(lx,ly+rows.length*(N?28:44)+(N?0:-6),`Weeks with any symptoms: ${D.any}%`,'t-sm','fill:var(--ink);font-weight:600');
    wsvg.innerHTML=s;wnote.innerHTML=noteHTML(D.note);
  }
  function runW(){stopW&&stopW();stopW=animate(1400,p=>drawW(ease(p)),()=>{stopW=null})}
  $$('[data-ew]').forEach(b=>b.addEventListener('click',()=>{wk=+b.dataset.ew;$$('[data-ew]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));runW()}));
  drawW(1);
  onShow.episodes=()=>{};
  {const prev=onHide.episodes;onHide.episodes=()=>{prev&&prev();stopW&&stopW()}}
  {const prevR=redraws.episodes;redraws.episodes=()=>{prevR&&prevR();drawW(1)}}
};
