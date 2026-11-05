/* =============== 2.2 Bipolar I, II, cyclothymia & specifiers =============== */
inits.types=()=>{
  const MO=36,U=m=>m/MO;
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const K=a=>moodSeries(a.map(([m,v])=>[U(m),v]));
  /* cyclothymia: numerous highs and lows that never reach a full episode */
  const cyK=[[0,0]];for(let i=1;i<=24;i++){const m=i*1.5-.4,sg=i%2?1:-1;cyK.push([m,sg*(.2+.12*(((i*37)%5)/4))])}cyK.push([36,.05]);
  const LANES=[
    {k:'bp1',n:'Bipolar I disorder',f:K([[0,0],[2,.02],[3,-.3],[4,-.62],[5.5,-.6],[6.5,-.2],[7.5,0],[13,.03],[13.6,.4],[14.2,.8],[15.2,.85],[15.9,.4],[16.6,.02],[23,-.02],[24,-.4],[25,-.66],[26.5,-.6],[27.5,-.1],[28.5,0],[36,.02]]),
     marks:[{m:3.6,lab:'MDE',c:'var(--down)',note:'not required'},{m:13.6+7/30,lab:'Mania ≥7 d',c:'var(--up)',key:true}],
     rules:[{t:'≥1 manic episode',at:13.6+7/30}],dx:13.6+7/30,extra:'Depression may or may not occur'},
    {k:'bp2',n:'Bipolar II disorder',f:K([[0,0],[3.6,.02],[3.9,.3],[4.15,.36],[4.4,.3],[4.7,.03],[9,0],[9.6,-.35],[10.4,-.66],[12,-.68],[13,-.3],[13.7,-.02],[19.5,.02],[19.8,.3],[20.1,.34],[20.4,.05],[26,0],[26.6,-.4],[27.5,-.7],[29.5,-.6],[30.5,-.1],[31.5,0],[36,0]]),
     marks:[{m:3.85+4/30,lab:'Hypo ≥4 d',c:'var(--up)',key:true},{m:9.55+14/30,lab:'MDE ≥14 d',c:'var(--down)',key:true}],
     rules:[{t:'≥1 hypomanic episode',at:3.85+4/30},{t:'≥1 major depressive episode',at:9.55+14/30},{t:'never a manic episode',at:-1,keep:true}],dx:9.55+14/30},
    {k:'cy',n:'Cyclothymic disorder',f:K(cyK),marks:[{m:24,lab:'2 years',c:'var(--dx)',key:true}],
     rules:[{t:'≥2 years of numerous sub-threshold highs and lows',at:24,bar:true},{t:'never a full episode',at:-1,keep:true}],dx:24}
  ];
  const STEPS=[
    {from:0,at:U(1.2),k:'Month 0 · three people',t:'Three life charts',
     txt:`Each lane is one invented person's mood over three years. The diagnosis comes from the <b>pattern of episodes over a lifetime</b>, not from a single visit, a blood test or a scan. That is why clinicians ask about the past, and why a family member's memory of the "highs" can help. [[APA2022,Yatham2018,NICE2014CG185]]`,
     pt:`Doctors diagnose bipolar disorder from your story over time. Telling them about any past spells of unusual energy, little need for sleep or racing thoughts helps.`,
     hook:`BP-I = ≥1 manic episode. BP-II = ≥1 hypomanic + ≥1 major depressive episode, never mania. Cyclothymia = ≥2 years of sub-threshold swings (1 year in youth). [[APA2022,Yatham2018]]`},
    {from:U(3.4),at:U(4.6),k:'Months 3–5 · not yet',t:'One episode is not always enough',
     txt:`The bipolar II lane has its first hypomanic episode: 4 days have passed, so it counts as hypomania, but bipolar II also needs a major depressive episode. Meanwhile the bipolar I lane shows a major depressive episode. A depression on its own is not bipolar disorder, and most people with bipolar disorder first present with depression, which is why the diagnosis is often delayed. [[APA2022,Yatham2018,Grande2016]]`,
     pt:`A single low, or a single short high, does not make the diagnosis. The full picture can take time to appear.`,
     hook:`The commonest misdiagnosis of bipolar disorder is unipolar depression. [[Yatham2018]]`},
    {from:U(9.4),at:U(10.8),k:'Month 10 · rule met',t:'Bipolar II: hypomania + depression',
     txt:`Once a major depressive episode has lasted 2 weeks, the bipolar II lane has both building blocks: at least one hypomanic and at least one major depressive episode, and never a manic one. If a manic episode ever occurred, the diagnosis would change to bipolar I. Bipolar II is not a milder illness: in a 13.4-year follow-up, people with bipolar II had depressive symptoms in 50.3% of weeks. [[APA2022,Yatham2018,Judd2003]]`,
     pt:`In bipolar II the highs are milder, but the lows can be long and heavy. It is a serious illness in its own right, and it is treatable.`,
     hook:`BP-II requires the depression. Hypomania alone does not make BP-II. [[APA2022,Yatham2018]]`},
    {from:U(13.4),at:U(14.8),k:'Month 14 · rule met',t:'Bipolar I: one manic episode is enough',
     txt:`After a week of mania (or any length, if hospital care is needed), the bipolar I lane meets its rule. Depression is not required, though most people with bipolar I also have depressive episodes. A full manic episode that emerges during antidepressant treatment and persists at a fully syndromal level beyond the treatment's effect also counts. ICD-11 gives the same result with one manic or mixed episode. [[APA2022,McIntyre2020Lancet,Yatham2018,Stein2020BMC]]`,
     pt:`One manic episode is enough for a diagnosis of bipolar I.`,
     hook:`Antidepressant-emergent mania that persists at full syndromal level beyond the drug's physiological effect counts toward BP-I (new in DSM-5). [[APA2022,Yatham2018]]`},
    {from:U(21.5),at:U(24.6),k:'Month 24 · rule met',t:'Cyclothymia: two years of swings',
     txt:`The cyclothymia lane never reaches a full episode, yet the highs and lows keep coming. After at least 2 years of numerous hypomanic and depressive periods that do not meet episode criteria (at least 1 year in children and adolescents), cyclothymic disorder can be diagnosed. CANMAT places it at the mild end of the bipolar spectrum, but Van Meter and colleagues describe it as highly impairing and often missed. [[APA2022,Yatham2018,VanMeter2012]]`,
     pt:`Cyclothymia means mood that goes up and down a lot for years, without reaching full mania or full depression. It can still make life hard, and it deserves care.`,
     hook:`Cyclothymic disorder: ≥2 years (adults), ≥1 year (youth); full manic, hypomanic or major depressive criteria never met. [[APA2022,Yatham2018]]`},
    {from:U(27),at:U(33),k:'Months 27–36 · the long view',t:'Depression dominates the long course',
     txt:`Across the three lanes, the lows take more time than the highs. Although mania defines bipolar I, depressive episodes and symptoms dominate the long-term course and account for a disproportionate share of the burden; CANMAT estimates that depression takes up to two-thirds of the time spent unwell, even with treatment. Effective treatments exist for every phase. [[McIntyre2020Lancet,Yatham2018]]`,
     pt:`For most people the low times are the bigger challenge. That is why treatment plans focus on preventing depression as well as mania.`,
     hook:`Rapid cycling (≥4 episodes in 12 months) has a pooled lifetime prevalence of 35.5% in bipolar disorder. See the specifier overlay below. [[Miola2023,Strawbridge2022]]`}
  ];
  const svg=$('#tySvg'),rg=$('#tyT'),note=$('#tyNote'),read=$('#tyRead');
  function lane(L,i,x,y,w,h,m,N){
    let s='';const lc=lifechart(x,y,w,h,L.f,{upto:U(m),id:'tyL'+i,dot:true,lw:2.2});
    s+=lc.svg;
    let prevX=-1e3,lv=0;
    L.marks.forEach(M=>{if(m<M.m)return;const px=lc.X(U(M.m));lv=px-prevX<95?lv+1:0;prevX=px;const oy=lv*12;
      s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${f1(y)}" y2="${f1(y+h)}" style="stroke:${M.c};stroke-width:${M.key?1.6:1};stroke-dasharray:${M.key?'0':'3 3'};opacity:.9"/>`;
      const right=px<x+w-90,lx=right?px+4:px-4;
      s+=T(lx,y+11+oy,M.lab,'t-xs'+(right?'':' t-end'),`fill:${M.c};font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px`);
      if(M.note)s+=T(lx,y+22+oy,M.note,'t-xs'+(right?'':' t-end'),'paint-order:stroke;stroke:var(--panel);stroke-width:3px')});
    return s;
  }
  function rules(L,x,y,w,m,N){
    let s='';const met=m>=L.dx;
    s+=T(x,y,L.n,'t-lbl',met?'fill:var(--dx)':'');
    let yy=y+(N?16:17);
    L.rules.forEach(R=>{const ok=R.keep?true:m>=R.at;
      s+=`<rect x="${f1(x)}" y="${f1(yy-9)}" width="11" height="11" rx="2.5" style="fill:${ok?(R.keep?'var(--panel-2)':'var(--good)'):'none'};stroke:${ok&&!R.keep?'var(--good)':'var(--muted)'}"/>`;
      if(ok)s+=`<path d="M${f1(x+2.5)} ${f1(yy-3.5)}l2.5 2.5l4-5" style="fill:none;stroke:${R.keep?'var(--muted)':'var(--panel)'};stroke-width:1.6;stroke-linecap:round"/>`;
      if(R.bar){const bw=Math.min(w-18,N?150:116);s+=T(x+17,yy,`${Math.min(24,Math.floor(m))} / 24 months`,'t-xs','fill:var(--ink)');
        s+=`<rect x="${f1(x+17)}" y="${f1(yy+4)}" width="${f1(bw)}" height="5" rx="2.5" style="fill:var(--panel-2)"/><rect x="${f1(x+17)}" y="${f1(yy+4)}" width="${f1(bw*clamp(m/24))}" height="5" rx="2.5" style="fill:var(--dx)"/>`;
        yy+=14;s+=T(x+17,yy+7,N?'numerous sub-threshold highs and lows':'of sub-threshold swings','t-xs');yy+=(N?15:15)}
      else s+=T(x+17,yy,R.t,'t-xs',ok&&!R.keep?'fill:var(--ink)':'');
      yy+=N?14:15});
    s+=T(x,yy+(N?2:4),met?'✓ rule met':'not yet','t-sm',`font-weight:600;fill:${met?'var(--good)':'var(--muted)'}`);
    return s;
  }
  function tyLegend(x,y,two){const it=[['var(--up-fill)','mania / hypomania'],['var(--eu)','steady'],['var(--down-fill)','depression']];let s='',xx=x,yy=y;
    it.forEach(([c,l],i)=>{if(two&&i===1){xx=x;yy+=15}s+=`<rect x="${f1(xx)}" y="${f1(yy-7)}" width="12" height="4" rx="2" style="fill:${c}"/>`+T(xx+16,yy-3,l,'t-xs');xx+=26+l.length*6.2});return s}
  function draw(t){
    const N=vb(svg,'720 470','400 724'),m=t*MO;
    let s='';
    if(N){
      LANES.forEach((L,i)=>{const y0=10+i*226;
        s+=rules(L,14,y0+12,372,m,N);
        s+=lane(L,i,40,y0+100,346,104,m,N)});
      s+=tline(40,10+3*226-14,346,{min:0,max:MO,step:6,label:'months'}).svg;
      s+=tyLegend(14,714);
    }else{
      LANES.forEach((L,i)=>{const y0=16+i*140;
        s+=rules(L,10,y0+14,170,m,N);
        s+=lane(L,i,196,y0,510,118,m,N)});
      s+=tline(196,16+3*140-4,510,{min:0,max:MO,step:3,label:'months'}).svg;
      s+=tyLegend(10,446,true);
    }
    svg.innerHTML=s;
    const i=phaseOf(STEPS,t);setA(i);note.innerHTML=noteHTML(STEPS[i]);
    const met=LANES.filter(L=>m>=L.dx).map(L=>L.n.replace(' disorder',''));
    read.innerHTML=`<span>Month <b>${f1(m)}</b></span><span>Rules met <b>${met.length?met.join(', '):'none yet'}</b></span>`;
  }
  const stop=playWire(rg,$('#tyPlay'),draw,15000,'%t:player.replay%','types');
  const setA=stepWire($('#tySteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- specifier overlay: one illustrative year ---------- */
  const SY=12,SU=m=>m/SY;
  const sf=moodSeries([[0,0],[.6,.05],[.85,.32],[1.1,.36],[1.35,.06],[1.6,0],[3.2,0],[3.6,-.4],[4.2,-.66],[5,-.6],[5.4,-.1],[5.8,0],[7.4,.02],[7.8,.5],[8.2,.84],[8.55,.6],[8.9,-.1],[9.3,-.55],[10,-.6],[10.5,-.1],[11,0],[12,0]].map(([m,v])=>[SU(m),v]));
  const SEP=[{a:.8,b:1.4,n:'Hypomanic',c:'var(--up)'},{a:3.5,b:5.5,n:'Depressive',c:'var(--down)'},{a:7.65,b:8.85,n:'Manic',c:'var(--up)'},{a:8.85,b:10.5,n:'Depressive',c:'var(--down)'}];
  const MON=['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'];
  const SEAS=[[0,1,'summer','var(--up-soft)'],[1,4,'autumn','var(--accent-soft)'],[4,7,'winter','var(--down-soft)'],[7,10,'spring','var(--eu-soft)'],[10,12,'summer','var(--up-soft)']];
  const SPN={
    rapid:{k:'Course specifier',t:'With rapid cycling',
      txt:`At least 4 distinct mood episodes (manic, hypomanic or major depressive) within 12 months, in any order, each separated by partial or full remission of at least 2 months or by a switch to the opposite polarity. Here the count reaches 4 when the second depression begins straight after the mania: a switch. An umbrella meta-review of 13,698 people found a pooled 1-year prevalence of 22.3% and lifetime prevalence of 35.5%, higher in women, with strong evidence linking rapid cycling to suicide attempts and poorer response to mood stabilisers. NICE recommends offering the same interventions as for other types, as there is "no strong evidence" they should differ. [[Strawbridge2022,APA2022,Miola2023,NICE2014CG185]]`,
      pt:`Rapid cycling means four or more mood episodes in one year. It is common at some point in the illness, and it can change over time.`,
      hook:`Rapid cycling: ≥4 episodes in 12 months, separated by ≥2 months of remission or a polarity switch. ICD-11 qualifier 6A80.5. [[Strawbridge2022,Harter2025]]`},
    mixed:{k:'Episode specifier',t:'With mixed features',
      txt:`Symptoms of the opposite pole during an episode: depressive symptoms during mania or hypomania, or manic symptoms during a major depressive episode. DSM-5 replaced the old categorical mixed episode with this dimensional specifier, and also allows it in major depressive disorder. In the International Mood Disorders Collaborative Project it was common: during depressive episodes in 34.0% (bipolar I) and 33.8% (bipolar II), and during hypo/manic episodes in 20.4% (bipolar I) and 5.1% (bipolar II). [[Yatham2018,McIntyre2015Mixed]]`,
      pt:`A mixed state is high and low at the same time: wired and restless but also hopeless. It is a time to stay in close touch with the care team.`,
      hook:`DSM-5: mixed features = specifier (can apply to MDD too). ICD-11: mixed episode ≥2 weeks counts toward bipolar type I. [[Yatham2018,Stein2020BMC]]`},
    psych:{k:'Episode specifier',t:'With psychotic features',
      txt:`Delusions or hallucinations during an episode, coded as mood-congruent (for example grandiose delusions in mania) or mood-incongruent. Psychosis makes an elevated episode manic by definition. In 1,342 people with bipolar I, 73.8% had lifetime psychotic symptoms; in 352 people in the Stanley Network, no single type of psychotic symptom was diagnostically specific. [[APA2022,Yatham2018,vanBergen2019,Keck2003]]`,
      pt:`Some people lose touch with reality during an episode, for example believing they have special powers. This is a symptom of the illness and it gets better with treatment.`,
      hook:`Psychotic features → the episode is mania, not hypomania. ICD-11 subcodes 6A60.0 / 6A60.1: current manic episode without / with psychotic symptoms. [[APA2022,Harter2025]]`},
    peri:{k:'Episode specifier',t:'With peripartum onset',
      txt:`Used when a manic, hypomanic or depressive episode begins around pregnancy and birth. In 1,785 parous women in the UK Bipolar Disorder Research Network, women with bipolar I had about a 50% risk of a perinatal major mood episode per pregnancy, and most began in the first postpartum month. In a meta-analysis, postpartum relapse was 66% in women with bipolar disorder who were medication-free in pregnancy and 23% in those who used prophylactic medication. Pregnancy is something to plan with the care team; see <a href="#pregnancy" data-go="pregnancy">Pregnancy &amp; the postpartum period</a>. [[Yatham2018,DiFlorio2013,Wesseloo2016]]`,
      pt:`The weeks after having a baby are a time of higher risk. Making a plan with the care team before and during pregnancy helps.`,
      hook:`Perinatal episodes: about 50% per pregnancy in BP-I (UK BDRN); most begin in the first postpartum month. [[DiFlorio2013]]`},
    season:{k:'Course specifier',t:'With seasonal pattern',
      txt:`Describes episodes that regularly track the time of year. A systematic review of 51 papers found a seasonal pattern in about 15% of manic and 25% of depressive episodes, with mania peaking in spring and summer and depression in early winter, as in this invented year (which starts in August). One year cannot show a pattern; it takes repetition. ICD-11 has a matching qualifier, 6A80.4. [[Geoffroy2014,Harter2025,Yatham2018]]`,
      pt:`For some people, episodes tend to come at the same time each year. Knowing your own pattern can help you and your team plan ahead.`,
      hook:`Seasonality: mania peaks spring/summer, depression early winter (Geoffroy 2014). [[Geoffroy2014]]`}};
  const ON={rapid:true,mixed:false,psych:false,peri:false,season:false};let last='rapid';
  const ssvg=$('#tySpec'),srg=$('#tySpT'),snote=$('#tySpNote');
  function drawS(t){
    const N=vb(ssvg,'720 340','400 372'),m=t*SY;
    const C=N?{x:34,y:78,w:352,h:214}:{x:44,y:74,w:650,h:170};
    let s=`<defs>${marker('tyAr','var(--muted)')}</defs>`;
    const lc=lifechart(C.x,C.y,C.w,C.h,sf,{upto:t,id:'tySp',dot:true,labels:true,mixed:ON.mixed&&m>8.4?[[SU(8.4),SU(Math.min(9.2,m))]]:[]});
    s+=lc.svg;
    const ay=C.y+C.h+16;
    if(ON.season){SEAS.forEach(([a,b,n,c])=>{const x0=lc.X(SU(a)),x1=lc.X(SU(b));s+=`<rect x="${f1(x0)}" y="${f1(ay-8)}" width="${f1(x1-x0)}" height="16" style="fill:${c}"/>`;s+=T((x0+x1)/2,ay+3.5,(x1-x0)<n.length*6.2?n.slice(0,3):n,'t-xs t-mid','fill:var(--ink)')});
      s+=tline(C.x,ay+22,C.w,{min:0,max:SY,step:N?2:1,fmt:v=>v<12?MON[v]:'',label:''}).svg;}
    else s+=tline(C.x,ay,C.w,{min:0,max:SY,step:N?2:1,label:'months'}).svg;
    /* episode count */
    const started=SEP.filter(E=>m>=E.a);
    if(ON.rapid){
      SEP.forEach((E,i)=>{if(m<E.a)return;const x0=lc.X(SU(E.a)),x1=lc.X(SU(Math.min(E.b,m)));
        s+=`<path d="M${f1(x0)} ${f1(C.y-8)}V${f1(C.y-14)}H${f1(x1)}${m>=E.b?`V${f1(C.y-8)}`:''}" style="fill:none;stroke:${E.c};stroke-width:1.4"/>`;
        s+=`<circle cx="${f1(x0)}" cy="${f1(C.y-22)}" r="9" style="fill:${E.c}"/>`+T(x0,C.y-18.5,String(i+1),'t-sm t-mid','fill:var(--panel);font-weight:700')});
      [[1.4,3.5,'≥2 mo'],[5.5,7.65,'≥2 mo']].forEach(([a,b,l])=>{if(m<b)return;const x0=lc.X(SU(a)),x1=lc.X(SU(b)),yy=lc.Y(0)+(N?-14:-12);
        s+=`<path d="M${f1(x0+2)} ${f1(yy)}H${f1(x1-2)}" style="stroke:var(--eu);stroke-width:1.4" marker-start="url(#tyAr)" marker-end="url(#tyAr)"/>`+T((x0+x1)/2,yy-4,l,'t-xs t-mid','fill:var(--eu);font-weight:600')});
      if(m>=8.85){const px=lc.X(SU(8.85));s+=T(px+(N?4:6),lc.Y(.3),'switch','t-xs','fill:var(--mixed);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px')}
      const n=started.length,rc=n>=4;
      s+=T(C.x+C.w,22,`Episodes in 12 months: ${n}`,'t-lbl t-end');
      s+=T(C.x+C.w,38,rc?'≥4 → with rapid cycling':`${4-n} more to reach 4`,'t-sm t-end',`font-weight:600;fill:${rc?'var(--dx)':'var(--muted)'}`);
    }
    if(ON.psych&&m>=8.2){const [px,py]=lc.at(SU(8.2));
      const st=(cx,cy,r)=>{let d='';for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.45:r;d+=(k?'L':'M')+f1(cx+rr*Math.cos(a))+' '+f1(cy+rr*Math.sin(a))}return d+'Z'};
      s+=`<path d="${st(px,py-10,8)}" style="fill:var(--accent);stroke:var(--panel);stroke-width:1.5"/>`;
      const lx=px-16;
      s+=T(lx,py-6,'grandiose delusion','t-xs t-end','fill:var(--accent);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px');
      s+=T(lx,py+4,'(mood-congruent)','t-xs t-end','paint-order:stroke;stroke:var(--panel);stroke-width:3px')}
    if(ON.peri&&m>=3){const px=lc.X(SU(3)),y0=lc.Y(0);
      s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${f1(C.y)}" y2="${f1(C.y+C.h)}" style="stroke:var(--accent);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      s+=`<g transform="translate(${f1(px)} ${f1(C.y+16)})"><circle r="9" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.4"/><circle cx="0" cy="-2.5" r="2.6" style="fill:var(--accent)"/><path d="M-4 4Q0 -1 4 4" style="fill:var(--accent)"/></g>`;
      s+=T(N?px+5:px+13,N?C.y+40:C.y+20,'delivery','t-xs','fill:var(--accent);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px');
      if(m>=3.5){const x1=lc.X(SU(3.55));s+=`<path d="M${f1(px+3)} ${f1(y0+30)}Q${f1((px+x1)/2)} ${f1(y0+44)} ${f1(x1)} ${f1(lc.Y(sf(SU(3.6)))+4)}" class="arrow" marker-end="url(#tyAr)"/>`+T(px-4,y0+56,'onset after birth','t-xs t-end','fill:var(--accent);paint-order:stroke;stroke:var(--panel);stroke-width:3px')}}
    if(ON.season&&!ON.rapid){s+=T(C.x+C.w,22,'Mania in spring, depression in early winter','t-sm t-end','fill:var(--ink);font-weight:600')}
    if(!ON.rapid&&!ON.season)s+=T(C.x+C.w,22,'One illustrative year','t-sm t-end');
    ssvg.innerHTML=s;snote.innerHTML=noteHTML(SPN[last]);
  }
  const stopS=playWire(srg,$('#tySpPlay'),drawS,9000,'%t:player.replay%','types');
  $$('[data-ts]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.ts;ON[k]=!ON[k];b.setAttribute('aria-pressed',ON[k]?'true':'false');
    if(ON[k])last=k;else{const o=Object.keys(ON).filter(x=>ON[x]);last=o.length?o[o.length-1]:k}
    drawS(+srg.value)}));
  drawS(+srg.value);

  /* ---------- vignettes ---------- */
  const OPT={i:'Bipolar I',ii:'Bipolar II',cy:'Cyclothymic disorder',os:'Other specified / none of these'};
  const VIG=[
    {s:`A 24-year-old has 10 days of barely sleeping, racing thoughts, non-stop talking and spending far beyond their means, and is admitted to hospital. They have never had a depressive episode.`,a:'i',
     why:`One manic episode (at least a week, with marked impairment and hospital care) is enough for bipolar I. Depression is not required. [[APA2022,McIntyre2020Lancet]]`},
    {s:`A 31-year-old has had two long major depressive episodes. Friends recall a 5-day spell last spring when they were unusually energetic, chatty and needed little sleep; they kept working and were not admitted.`,a:'ii',
     why:`At least one hypomanic episode (≥4 days, observable change, no marked impairment) plus at least one major depressive episode, and never mania: bipolar II. [[APA2022,Yatham2018]]`},
    {s:`For three years a 27-year-old has had frequent short highs and lows. The highs never reach hypomania and the lows never meet criteria for a major depressive episode, but the swings disrupt their life.`,a:'cy',
     why:`At least 2 years of numerous sub-threshold hypomanic and depressive periods, with full episode criteria never met: cyclothymic disorder. [[APA2022,Yatham2018]]`},
    {s:`A 32-year-old with past major depressions has a 4-day high with decreased need for sleep and grandiosity, and during it becomes convinced they have been chosen to save the world.`,a:'i',
     why:`Psychotic features make an elevated episode manic by definition, whatever its length, so this is bipolar I, not bipolar II. [[APA2022,Yatham2018]] A first manic episode after age 40, neurological signs or an atypical history should also prompt a search for medical causes (secondary mania). [[Satzer2016]]`},
    {s:`A 35-year-old with depression starts an antidepressant. Weeks later a full manic syndrome develops and persists at full intensity well beyond the medicine's physiological effect.`,a:'i',
     why:`Since DSM-5, a full manic episode that emerges during antidepressant treatment and persists at a fully syndromal level beyond the treatment's effect counts as a manic episode, and so bipolar I. DSM-IV did not allow this. [[APA2022,Yatham2018]]`},
    {s:`A 29-year-old has had several major depressive episodes and, between them, highs that last 2 to 3 days with clearly more energy, talk and activity.`,a:'os',
     why:`Hypomanias shorter than 4 days do not meet DSM-5-TR hypomania, so this is not bipolar II. Short-duration hypomanic episodes (2–3 days) with major depressive episodes are a listed example of other specified bipolar and related disorder. ICD-11's "several days" and Judd's data on brief hypomanias show this line is debated. [[Severus2014,APA2022,Stein2020BMC,Judd2003]]`}
  ];
  const vbox=$('#tyVig'),vscore=$('#tyScore'),vans=store.get('tyVig',{});
  vbox.innerHTML=VIG.map((v,i)=>`<div class="ty-v" data-v="${i}"><span class="kicker">Vignette ${i+1}</span><p>${v.s}</p><div class="ty-opts" role="group" aria-label="Your answer">${Object.keys(OPT).map(k=>`<button type="button" data-va="${k}" aria-pressed="false">${OPT[k]}</button>`).join('')}</div><div class="ty-fb" aria-live="polite"></div></div>`).join('');
  function vset(i,k,save=true){const el=$(`.ty-v[data-v="${i}"]`,vbox),v=VIG[i];
    if(!k){delete vans[i];el.classList.remove('ok','no');$('.ty-fb',el).innerHTML='';$$('[data-va]',el).forEach(b=>b.setAttribute('aria-pressed','false'))}
    else{vans[i]=k;const ok=k===v.a;el.classList.toggle('ok',ok);el.classList.toggle('no',!ok);
      $$('[data-va]',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.va===k?'true':'false'));
      $('.ty-fb',el).innerHTML=(ok?'<b>Yes.</b> ':`<b>Not quite: ${OPT[v.a]}.</b> `)+v.why}
    if(save)store.set('tyVig',vans);
    const ks=Object.keys(vans),ok=ks.filter(j=>vans[j]===VIG[j].a).length;
    vscore.textContent=ks.length?`${ks.length} of 6 answered · ${ok} correct`:'0 of 6 answered'}
  vbox.addEventListener('click',e=>{const b=e.target.closest('[data-va]');if(!b)return;vset(+b.closest('.ty-v').dataset.v,b.dataset.va)});
  $('#tyVReset').addEventListener('click',()=>{VIG.forEach((v,i)=>vset(i,null,false));store.set('tyVig',{})});
  Object.keys(vans).forEach(i=>{if(VIG[i]&&OPT[vans[i]])vset(+i,vans[i],false)});
};
