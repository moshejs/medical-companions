/* =============== 1.1 What bipolar disorder is =============== */
/* lifetime prevalence per 1,000 adults: WMH (11 countries) and NCS-R (US) */
const WH_PREV={wmh:{i:6,ii:4,sub:14},ncs:{i:10,ii:11,sub:24}};
/* weeks of a 52-week year by symptom state (Judd 2002 BP-I, Judd 2003 BP-II), rounded to whole weeks */
const WH_WEEKS=[
  {n:'Bipolar I',src:'146 people, 12.8 years of weekly ratings',pc:{dep:31.9,up:8.9,mix:5.9,well:52.7},w:{dep:17,up:5,mix:3,well:27},upName:'manic or hypomanic'},
  {n:'Bipolar II',src:'86 people, 13.4 years of weekly ratings',pc:{dep:50.3,up:1.3,mix:2.3,well:46.1},w:{dep:26,up:1,mix:1,well:24},upName:'hypomanic'}
];
const WH_STEPS=[
  {from:0,at:.15,k:'Step 1 · worldwide',t:'Worldwide',
   txt:`In the WHO World Mental Health surveys of 61,392 adults in 11 countries, 2.4% met criteria for a bipolar spectrum disorder at some point in life: 24 in every 1,000. In the past 12 months the figure was 1.5%. [[Merikangas2011]] Rates differed by country, from 4.4% lifetime in the United States to 0.1% in India, and not simply by income: Japan was low (0.7%) and Colombia high (2.6%). [[Merikangas2011]] A 2023 review estimates about 40 million people with bipolar disorder worldwide. [[Nierenberg2023]]`,
   pt:`Out of every 1,000 adults, about 24 will have some form of bipolar disorder in their lifetime. You almost certainly know someone living with it.`,
   hook:`WMH lifetime: whole bipolar spectrum 2.4%; 12-month 1.5%. [[Merikangas2011]]`},
  {from:.25,at:.42,k:'Step 2 · types',t:'Bipolar I, II & spectrum',
   txt:`Split by type, the worldwide surveys found bipolar I in 0.6%, bipolar II in 0.4% and subthreshold bipolar disorder in 1.4%. [[Merikangas2011]] Keep scrubbing: the US survey (NCS-R) found more of each, 1.0%, 1.1% and 2.4%. [[Merikangas2007]] The NCS-R sampled only the US, which had the highest rate of the 11 countries in the worldwide surveys. [[Merikangas2011]] In both surveys the milder, subthreshold forms outnumber bipolar I and II together, and the NCS-R authors call them clinically significant and underdetected. [[Merikangas2007]]`,
   pt:`Bipolar I (with full mania) and bipolar II (with milder highs) together affect about 1 to 2 adults in every 100. Milder forms are even more common.`,
   hook:`WMH: BP-I 0.6%, BP-II 0.4%, subthreshold 1.4%. NCS-R (US): BP-I 1.0%, BP-II 1.1%, subthreshold 2.4%. [[Merikangas2011,Merikangas2007]]`},
  {from:.5,at:.66,k:'Step 3 · age at onset',t:'Age at onset',
   txt:`In the worldwide surveys the mean age at onset was 18.4 years for bipolar I, 20.0 for bipolar II and 21.9 for subthreshold bipolar disorder, and about half of people with bipolar I reported onset before 25. [[Merikangas2011]] Reviews put the usual onset between 15 and 25. [[Nierenberg2023,Scott2022Delay]] One study of 368 people with bipolar I found three onset groups with means of 17.4, 25.1 and 40.4 years, so later onset happens too. [[Bellivier2003]] A large population meta-analysis placed the median later, at 30–35 years: studies differ in whether onset means first symptoms or first full episode. [[Solmi2022]]`,
   pt:`Bipolar disorder usually starts in the teens or twenties, but it can begin later in life.`,
   hook:`Mean onset (WMH): 18.4 y BP-I, 20.0 y BP-II, 21.9 y subthreshold. Three BP-I onset subgroups: 17.4 / 25.1 / 40.4 y. [[Merikangas2011,Bellivier2003]]`},
  {from:.75,at:.97,k:'Step 4 · a typical year',t:'Time spent ill',
   txt:`Mania defines bipolar I, but it is not where most time goes. Followed weekly for a mean of 12.8 years, people with bipolar I had symptoms in 47.3% of weeks: depressive in 31.9%, manic or hypomanic in 8.9% and cycling or mixed in 5.9%. [[Judd2002]] In bipolar II the imbalance was larger: depressive symptoms in 50.3% of weeks against hypomania in 1.3%. [[Judd2003]] Much of this time was milder, subsyndromal symptoms rather than full episodes. [[Judd2002]] About 75% of symptomatic time is depressive, [[Nierenberg2023]] and depression accounts for a disproportionate share of illness and deaths. [[McIntyre2020Lancet]]`,
   pt:`For most people with bipolar disorder the low times last much longer than the highs. Treating depression well is central to living well.`,
   hook:`Judd: BP-I depressive 31.9% vs manic/hypomanic 8.9% of weeks; BP-II depressive 50.3% vs hypomanic 1.3%. [[Judd2002,Judd2003]]`}
];
/* the words-matter flip set: [stigmatising phrase, better phrase, why (cited)] */
const WH_WORDS=[
  ['"She\'s a bipolar." "Bipolars are…"','"She has bipolar disorder." "People living with bipolar disorder…"',
   `Bipolar disorder is an illness a person has, not who they are. Self-stigma, taking on other people's negative views, is moderate to high in people with bipolar disorder. [[Ellison2013Stigma]]`],
  ['"I\'m so bipolar today."','"My mood has been up and down today."',
   `A diagnosis needs distinct episodes that last days, such as at least 4 days for hypomania in DSM-5, not ordinary changes of mood within a day. [[Angst2020ICD11]] Using the name casually makes the illness sound trivial.`],
  ['"He\'s acting manic."','"He seems very wound up." Or, if it is a real concern: "He may be having a manic episode."',
   `Mania is a medical state with sleeplessness, racing thoughts and often irritability, "not a purely euphoric state". [[Cassidy1998]] Saving the word for that state keeps it accurate.`],
  ['"Crazy." "Psycho."','"Having a mood episode." "Having psychotic symptoms."',
   `Psychotic symptoms are symptoms of an episode, present at some point in about 63% of people with bipolar I, [[Aminoff2022]] and episodes end: 98% of people treated for a first mania reached syndromal recovery within 2 years. [[Tohen2003]]`],
  ['"Non-compliant." "Off their meds."','"Not taking treatment as prescribed right now." And then: "What is getting in the way?"',
   `More than half of people with bipolar disorder do not take treatment exactly as prescribed, [[Nierenberg2023]] so it is a common, shared problem to solve together, not a character flaw.`],
  ['"Committed suicide."','"Died by suicide." "Is having thoughts of suicide."',
   `Suicide is a health outcome, not a crime, and treatment lowers the risk: lithium reduced suicides compared with placebo in randomised trials. [[Cipriani2013]] Talking about it plainly helps people ask for help. If you are in crisis, contact local emergency services or a crisis line (in the US call or text 988; in the UK and Ireland Samaritans 116 123).`]
];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote'),read=$('#whRead');
  const COL={i:'var(--brand)',ii:'var(--rx)',sub:'var(--dx)',off:'var(--line)'};
  const NAME={i:'Bipolar I',ii:'Bipolar II',sub:'Subthreshold'};
  /* a fixed random scatter: order[k] is the cell of the k-th affected person */
  const order=(()=>{const a=[...Array(1000).keys()],r=rng(2011);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  function counts(t){
    if(t<.25){const n=Math.round(24*ease(ramp(t,.02,.18)));return {mode:'one',n,i:0,ii:0,sub:0}}
    const sp=ease(ramp(t,.25,.31)),mv=ease(ramp(t,.33,.45)),W=WH_PREV.wmh,N=WH_PREV.ncs;
    const c={i:Math.round(lerp(W.i,N.i,mv)),ii:Math.round(lerp(W.ii,N.ii,mv)),sub:Math.round(lerp(W.sub,N.sub,mv))};
    return {mode:'split',sp,mv,...c,n:c.i+c.ii+c.sub}}
  function icons(L,c){
    const cat=new Array(1000).fill('off');
    if(c.mode==='one'){for(let k=0;k<c.n;k++)cat[order[k]]='one'}
    else{let k=0;for(const g of ['i','ii','sub'])for(let m=0;m<c[g];m++)cat[order[k++]]=g}
    let s='';
    for(let idx=0;idx<1000;idx++){const col=idx%L.cols,row=Math.floor(idx/L.cols),x=L.ix+col*L.dx+L.dx/2,y=L.iy+row*L.dy;
      const k=cat[idx];let fill=COL.off,op=1;
      if(k==='one')fill='var(--brand)';
      else if(k!=='off')fill=c.sp>.5?COL[k]:'var(--brand)';
      s+=person(x,y,L.ps,fill,{op})}
    return s}
  function bars(x,y,w,c,N){/* side panel: counts per 1,000 */
    let s='';const lab=c.mode==='one'?[['All forms',c.n,'var(--brand)']]:
      [['Bipolar I',c.i,COL.i],['Bipolar II',c.ii,COL.ii],['Subthreshold',c.sub,COL.sub]];
    const sc=w/30;
    lab.forEach(([n,v,col],k)=>{const yy=y+k*34;
      s+=`<text x="${x}" y="${yy}" class="t-sm" style="fill:var(--ink)">${n}</text>`;
      s+=`<rect x="${x}" y="${yy+6}" width="${f1(w)}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${x}" y="${yy+6}" width="${f1(Math.max(0,v*sc))}" height="12" rx="6" style="fill:${col}"/>`;
      s+=`<text x="${f1(x+w)}" y="${yy}" class="t-sm t-end" style="fill:var(--ink);font-weight:600">${v} / 1,000</text>`});
    return s}
  function sceneIcons(t,N){const c=counts(t);
    const L=N?{cols:25,dx:14,dy:11.6,ix:25,iy:96,ps:9.6}:{cols:40,dx:11,dy:11.6,ix:12,iy:52,ps:9.4};
    let s='';const ncs=c.mode==='split'&&c.mv>.5;
    const ttl=c.mode==='one'?'Lifetime, worldwide surveys (WMH)':ncs?'Lifetime, US survey (NCS-R)':'Lifetime, worldwide surveys (WMH)';
    s+=`<text x="${N?20:12}" y="${N?24:24}" class="t-big">${c.n} in 1,000 adults</text>`;
    s+=`<text x="${N?20:12}" y="${N?44:42}" class="t-sm">${ttl}</text>`;
    s+=icons(L,c);
    if(N){s+=bars(20,c.mode==='one'?562:556,360,c,N);
      if(c.mode==='one')s+=`<text x="20" y="${614}" class="t-xs">12-month: 1.5% · US 4.4% · India 0.1% (lifetime)</text>`}
    else{const px=478;
      s+=`<text x="${px}" y="76" class="t-lbl">${c.mode==='one'?'All forms together':'By type'}</text>`;
      s+=bars(px,104,226,c,N);
      if(c.mode==='one'){s+=`<text x="${px}" y="168" class="t-xs">Past 12 months: 1.5% (15 in 1,000)</text>`;
        s+=`<text x="${px}" y="214" class="t-lbl">Range by country (lifetime)</text>`;
        [['United States',4.4],['Colombia',2.6],['Japan',.7],['India',.1]].forEach(([n,v],k)=>{const yy=236+k*22,w=v/4.4*110*ease(ramp(t,.05,.2));
          s+=`<text x="${px}" y="${yy+9}" class="t-xs">${n}</text><rect x="${px+82}" y="${yy}" width="${f1(w)}" height="10" rx="5" style="fill:var(--brand);opacity:.55"/><text x="${f1(px+86+w)}" y="${yy+9}" class="t-xs" style="fill:var(--ink)">${v}%</text>`})}
      else{const W=WH_PREV.wmh,Nn=WH_PREV.ncs,y0=226;
        s+=`<text x="${px}" y="${y0}" class="t-lbl">Two surveys compared</text>`;
        s+=`<text x="${px+120}" y="${y0+22}" class="t-xs t-end">WMH</text><text x="${px+190}" y="${y0+22}" class="t-xs t-end">NCS-R</text>`;
        [['Bipolar I','i'],['Bipolar II','ii'],['Subthreshold','sub']].forEach(([n,k],r)=>{const yy=y0+42+r*20;
          s+=`<text x="${px}" y="${yy}" class="t-xs" style="fill:${COL[k]}">${n}</text><text x="${px+120}" y="${yy}" class="t-xs t-end" style="fill:var(--ink);opacity:${ncs?.55:1}">${(W[k]/10).toFixed(1)}%</text><text x="${px+190}" y="${yy}" class="t-xs t-end" style="fill:var(--ink);opacity:${ncs?1:.55}">${(Nn[k]/10).toFixed(1)}%</text>`});
        s+=`<text x="${px}" y="${y0+112}" class="t-xs">${ncs?'US only (highest of the 11 WMH countries)':'11 countries, 61,392 adults'}</text>`}}
    return {s,c}}
  function sceneOnset(t,N){const p=ease(ramp(t,.5,.68));
    const G=N?{x:34,y:130,w:340,h:330}:{x:60,y:70,w:600,h:220};
    const AGE=60,X=a=>G.x+G.w*a/AGE;
    /* schematic shape with peaks at the Bellivier subgroup means */
    const dens=a=>.55*Math.exp(-((a-17.4)**2)/(2*3.2**2))+.38*Math.exp(-((a-25.1)**2)/(2*4.8**2))+.16*Math.exp(-((a-40.4)**2)/(2*8**2));
    const mx=.62;let s='';
    s+=`<text x="${N?20:60}" y="${N?28:28}" class="t-big">When does it start?</text>`;
    s+=`<text x="${N?20:60}" y="${N?48:48}" class="t-sm">${N?'Age at onset · curve shape schematic':'Age at onset · curve shape schematic, marked ages published'}</text>`;
    /* usual 15–25 window */
    s+=`<rect x="${f1(X(15))}" y="${G.y}" width="${f1(X(25)-X(15))}" height="${G.h}" style="fill:var(--brand-soft);opacity:${f1(.4+.6*ramp(t,.52,.58))}"/>`;
    s+=`<text x="${f1((X(15)+X(25))/2)}" y="${G.y-6}" class="t-xs t-mid" style="fill:var(--brand)">usual onset 15–25</text>`;
    s+=tline(G.x,G.y+G.h,G.w,{min:0,max:60,step:10,fmt:v=>v,label:'age (years)'}).svg;
    const amax=AGE*p;
    const d=pathFn(u=>1-dens(u*amax)/mx,G.x,G.x+G.w*p,G.y+G.h*.12,G.y+G.h,140);
    if(p>0){s+=`<path d="${d}L${f1(G.x+G.w*p)} ${G.y+G.h}L${G.x} ${G.y+G.h}Z" style="fill:var(--brand);opacity:.13"/><path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2.6;stroke-linejoin:round"/>`;
      s+=`<circle cx="${f1(G.x+G.w*p)}" cy="${f1(G.y+G.h*.12+(G.y+G.h-(G.y+G.h*.12))*(1-dens(amax)/mx))}" r="4.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`}
    /* published markers */
    const mk=[[18.4,'BP-I 18.4',0,'var(--brand)'],[20,'BP-II 20.0',1,'var(--rx)'],[21.9,'subthr. 21.9',2,'var(--dx)']];
    mk.forEach(([a,l,k,c])=>{if(amax<a)return;const x=X(a),y=G.y+G.h*.12+G.h*.88*(1-dens(a)/mx);
      const ly=G.y+(N?48:36)+k*15,lx=N?X(32):X(30);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${G.y+G.h}" style="stroke:${c};stroke-width:1.3;stroke-dasharray:3 3"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.5" style="fill:${c}"/>`;
      s+=`<text x="${f1(lx)}" y="${ly}" class="t-xs" style="fill:${c};font-weight:600">mean onset ${l} y</text>`});
    [[17.4,'17.4'],[25.1,'25.1'],[40.4,'40.4']].forEach(([a,l])=>{if(amax<a)return;
      s+=`<text x="${f1(X(a))}" y="${G.y+G.h+(N?36:34)}" class="t-xs t-mid" style="fill:var(--ink)">▲${l}</text>`});
    if(amax>=40.4){s+=`<text x="${N?20:G.x}" y="${G.y+G.h+(N?58:52)}" class="t-xs">▲ three bipolar I onset subgroups (mean ages)${N?'':' · half of BP-I begins before 25'}</text>`;
      if(N)s+=`<text x="20" y="${G.y+G.h+78}" class="t-xs">Half of BP-I begins before 25.</text><text x="20" y="${G.y+G.h+96}" class="t-xs">Population studies place the median later (30–35 y).</text>`;
      else s+=`<text x="${G.x}" y="${G.y+G.h+68}" class="t-xs">Population studies place the median later (30–35 y): definitions of onset differ</text>`}
    return s}
  function sceneWeeks(t,N){const p=ramp(t,.76,.95);let s='';
    s+=`<text x="${N?20:24}" y="28" class="t-big">A typical year: 52 weeks</text>`;
    s+=`<text x="${N?20:24}" y="48" class="t-sm">${N?'Share of weeks by symptom state':'Share of weeks in each symptom state, averaged over 13 years of weekly ratings'}</text>`;
    const C={dep:'var(--down-fill)',up:'var(--up-fill)',mix:'var(--mixed-fill)',well:'var(--eu-soft)'};
    WH_WEEKS.forEach((g,gi)=>{
      const seq=[];['dep','up','mix','well'].forEach(k=>{for(let i=0;i<g.w[k];i++)seq.push(k)});
      const shown=Math.round(52*p);
      let x0,y0,cw,ch,cols;
      if(N){cols=13;cw=27;ch=24;x0=22;y0=100+gi*250}else{cols=52;cw=12.4;ch=40;x0=24;y0=96+gi*130}
      s+=`<text x="${x0}" y="${y0-12}" class="t-lbl">${g.n}</text><text x="${x0+(N?86:86)}" y="${y0-12}" class="t-xs">${N?g.src.replace(' of weekly ratings',''):g.src}</text>`;
      seq.forEach((k,i)=>{const cx=x0+(i%cols)*cw,cy=y0+Math.floor(i/cols)*(ch+4),on=i<shown;
        s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cw-2)}" height="${ch}" rx="2.5" style="fill:${on?C[k]:'var(--panel-2)'};${k==='well'&&on?'stroke:var(--eu);stroke-width:.8;':''}"/>`});
      const by=N?y0+4*(ch+4)+20:y0+ch+22;
      const cnt=k=>{let n=0;for(let i=0;i<Math.min(shown,seq.length);i++)if(seq[i]===k)n++;return n};
      const items=[['dep','depressive'],['up',N?g.upName.replace('manic or hypomanic','manic/hypo'):g.upName],['mix',N?'mixed':'cycling / mixed'],['well','no symptoms']];
      items.forEach(([k,l],j)=>{const xx=x0+(j%2)*(N?186:300),yy=by+Math.floor(j/2)*(N?18:17);
        s+=`<rect x="${xx}" y="${yy-9}" width="10" height="10" rx="2" style="fill:${C[k]};${k==='well'?'stroke:var(--eu);stroke-width:.8':''}"/><text x="${xx+15}" y="${yy}" class="t-xs" style="fill:var(--ink)">${l} ${g.pc[k]}%${p>.02?' · '+cnt(k)+' wk':''}</text>`})});
    if(p>=1)s+=`<text x="${N?20:24}" y="${N?620:372}" class="t-sm" style="fill:var(--down);font-weight:600">${N?'Lows outlast highs: 17 vs 5 weeks (I), 26 vs 1 (II)':'Depression outlasts the highs: 17 vs 5 weeks a year in bipolar I, 26 vs 1 in bipolar II'}</text>`;
    return s}
  const setActive=stepWire($('#whSteps'),WH_STEPS,rg,draw,()=>stop());
  function draw(t){const N=vb(svg,'720 380','400 640');let s='',c=null;
    if(t<.5){const r=sceneIcons(t,N);s=r.s;c=r.c}
    else if(t<.75)s=sceneOnset(t,N);
    else s=sceneWeeks(t,N);
    svg.innerHTML=s;
    const ph=phaseOf(WH_STEPS,t);setActive(ph);note.innerHTML=noteHTML(WH_STEPS[ph]);
    if(c)read.innerHTML=c.mode==='one'?`<span>Affected: <b>${c.n}</b> per 1,000</span><span>Unaffected: <b>${1000-c.n}</b></span>`:
      `<span>Bipolar I <b>${c.i}</b></span><span>Bipolar II <b>${c.ii}</b></span><span>Subthreshold <b>${c.sub}</b></span><span>Survey <b>${c.mv>.5?'NCS-R (US)':'WMH (11 countries)'}</b></span>`;
    else if(t<.75)read.innerHTML=`<span>Mean onset <b>18.4 y</b> BP-I</span><span><b>20.0 y</b> BP-II</span><span><b>21.9 y</b> subthreshold</span>`;
    else read.innerHTML=`<span>BP-I symptomatic weeks <b>47.3%</b></span><span>BP-II <b>53.9%</b></span>`}
  const stop=playWire(rg,$('#whPlay'),draw,22000,'%t:player.replay%','what');
  draw(+rg.value);

  /* ---- diagnostic delay bars ---- */
  const dsvg=$('#whDelay'),drg=$('#whDelayT');
  const DL=[['Median time to seeking help',3.5,'Scott 2022','var(--brand)'],['Median untreated illness',5.9,'Scott 2022','var(--brand)'],['Median time to diagnosis',6.7,'Scott 2022','var(--brand)'],['Pooled onset to first management',5.8,'Dagani 2017','var(--dx)'],['Pooled mean undiagnosed / untreated',9.1,'Keramatian 2025','var(--accent)']];
  function drawDelay(t){const N=vb(dsvg,'720 250','400 380'),yrs=10*t;let s='';
    const G=N?{x:20,w:350,y:30,row:62,lw:0}:{x:250,w:430,y:30,row:38,lw:240};
    const X=v=>G.x+G.w*v/10;
    DL.forEach(([n,v,src,col],i)=>{const y=N?G.y+i*G.row+18:G.y+i*G.row,w=G.w*Math.min(v,yrs)/10,done=yrs>=v;
      if(N)s+=`<text x="${G.x}" y="${y-6}" class="t-xs" style="fill:var(--ink)">${n} <tspan style="fill:var(--muted)">· ${src}</tspan></text>`;
      else s+=`<text x="${G.x-10}" y="${y+12}" class="t-xs t-end" style="fill:var(--ink)">${n}</text><text x="${G.x-10}" y="${y+24}" class="t-xs t-end">${src}</text>`;
      s+=`<rect x="${G.x}" y="${y}" width="${f1(G.w)}" height="16" rx="8" style="fill:var(--panel-2)"/><rect x="${G.x}" y="${y}" width="${f1(w)}" height="16" rx="8" style="fill:${col};opacity:${done?1:.6}"/>`;
      if(done)s+=`<text x="${f1(X(v)+6)}" y="${y+12}" class="t-xs" style="fill:var(--ink);font-weight:600">${v} y</text>`});
    const ay=N?G.y+5*G.row+6:G.y+5*G.row+8;
    s+=tline(G.x,ay,G.w,{min:0,max:10,step:2,fmt:v=>v+' y'}).svg;
    s+=`<line x1="${f1(X(yrs))}" x2="${f1(X(yrs))}" y1="${G.y-8}" y2="${ay}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 3"/>`;
    s+=`<text x="${f1(Math.min(X(yrs),G.x+G.w-4))}" y="${G.y-12}" class="t-xs ${yrs>8?'t-end':'t-mid'}" style="fill:var(--ink)">${f1(yrs)} years after first symptoms</text>`;
    dsvg.innerHTML=s}
  playWire(drg,$('#whDelayPlay'),drawDelay,6000,'%t:player.replay%','what');
  drawDelay(+drg.value);
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();drawDelay(+drg.value)};

  /* ---- words matter ---- */
  $('#whWords').innerHTML=WH_WORDS.map(([bad,good,why],i)=>`<div class="card wm-card"><button class="wm-flip" data-wm="${i}" aria-pressed="false"><small>Instead of</small><span class="wm-say">${bad}</span></button><p class="wm-why" hidden></p></div>`).join('');
  $('#whWords').addEventListener('click',e=>{const b=e.target.closest('[data-wm]');if(!b)return;const i=+b.dataset.wm,on=b.getAttribute('aria-pressed')!=='true';
    b.setAttribute('aria-pressed',on);const [bad,good,why]=WH_WORDS[i];
    b.innerHTML=on?`<small>Try</small><span class="wm-say">${good}</span>`:`<small>Instead of</small><span class="wm-say">${bad}</span>`;
    const p=b.parentNode.querySelector('.wm-why');p.hidden=!on;p.innerHTML=on?`<b>Why:</b> ${why}`:''});
};
