/* =============== 1.1 What autism is =============== */
/* ADDM prevalence per 1,000 8-year-olds, 1 in N, number of sites */
const WH_US=[
 {y:2000,v:6.7,n:150,s:6,src:'about 1 in 150 (rounded from 6.7 per 1,000)'},{y:2002,v:6.6,n:152,s:14},{y:2006,v:9.0,n:110,s:11},{y:2008,v:11.3,n:88,s:14},
 {y:2010,v:14.7,n:68,s:11},{y:2012,v:14.6,n:68,s:11},{y:2014,v:16.8,n:59,s:11},{y:2016,v:18.5,n:54,s:11},{y:2018,v:23.0,n:44,s:11},
 {y:2020,v:27.6,n:36,s:11},{y:2022,v:32.2,n:31,s:16}];
/* worldwide: GBD age-standardised (per 1,000 from per 100,000) and the two global review medians */
const WH_W=[
 {y:1990,v:7.732,n:129,kind:'gbd',lab:'GBD 1990',sub:'773.2 per 100,000, age-standardised',calc:true},
 {y:2010,v:7.6,n:132,kind:'gbd10',lab:'GBD 2010',sub:'52 million people, 7.6 per 1,000'},
 {y:2012,v:6.2,n:161,kind:'rev',lab:'Elsabbagh 2012',sub:'review median 62 per 10,000',calc:true},
 {y:2021,v:7.883,n:127,kind:'gbd',lab:'GBD 2021',sub:'61.8 million people, 788.3 per 100,000'},
 {y:2022,v:10.0,n:100,kind:'rev',lab:'Zeidan 2022',sub:'review median 100 per 10,000'}];
const WH_STEPS_US=[
 {from:0,at:.09,k:'Surveillance years 2000–2002',t:'Early counts',
  txt:`CDC's Autism and Developmental Disabilities Monitoring (ADDM) Network counts autism in 8-year-olds by reviewing health records, and at most sites education records too, in selected US communities. It is not a national sample. In 2000, six sites found 6.7 per 1,000, about 1 in 150; in 2002, 14 sites found 6.6 per 1,000, "one of every 152". [[Baio2018,ADDM2007SY2000,ADDM2007SY2002]]`,
  pt:`In the early 2000s, about 1 in 150 eight-year-olds in these US communities had been identified as autistic.`,
  hook:`ADDM is records-based surveillance of 8-year-olds in selected sites, not a national survey. Sites that could read education records found more (2002: 7.2 vs 5.1 per 1,000). [[ADDM2007SY2002]]`},
 {from:.2,at:.46,k:'Surveillance years 2006–2012',t:'DSM-IV era',
  txt:`Counts rose under the same DSM-IV criteria: 9.0 per 1,000 in 2006 (1 in 110), 11.3 in 2008 (1 in 88) and 14.7 in 2010 (1 in 68). Between 2002 and 2006 the average across 10 sites rose 57%. CDC wrote that improved ascertainment explains some of the rise but "a true increase in the risk ... cannot be ruled out". [[ADDM2009SY2006,ADDM2012SY2008,ADDM2014SY2010]]`,
  pt:`Same rulebook, more children found: services were getting better at noticing autism.`,
  hook:`2002 to 2008: up an estimated 78%, from 6.4 to 11.4 per 1,000. [[ADDM2012SY2008]]`},
 {from:.58,at:.64,k:'DSM-5, 2013',t:'A new definition',
  txt:`DSM-5 merged Asperger's disorder and the other subtypes into one diagnosis, autism spectrum disorder, in 2013. When CDC scored the 2014 records both ways, DSM-IV-TR counts were less than 5% higher than DSM-5 counts, and the two definitions overlapped by about 86% (kappa 0.85). Prevalence was 16.8 per 1,000 in 2014 (1 in 59) and 18.5 in 2016 (1 in 54). [[BarahonaCorrea2015,Baio2018,Maenner2020]]`,
  pt:`The new definition did not by itself make the numbers jump: both definitions found almost the same children.`,
  hook:`ADDM 2014: DSM-IV-TR and DSM-5 case definitions agreed with kappa 0.85; DSM-IV-TR counted under 5% more. [[Baio2018]]`},
 {from:.76,at:.91,k:'Surveillance years 2016–2020',t:'Girls and children of colour',
  txt:`In 2010, White children were about 30% more likely than Black children and almost 50% more likely than Hispanic children to be identified. By 2016 White, Black and Asian/Pacific Islander rates were about equal. In 2020, for the first time, prevalence was lower in White children (24.3 per 1,000) than in Black (29.3), Hispanic (31.6) and A/PI children (33.4). The boy-to-girl ratio fell from 4.3 in 2016 to 3.8 in 2020. [[ADDM2014SY2010,Maenner2020,Maenner2023]]`,
  pt:`Children who used to be missed, especially children of colour and girls, are now found more often.`,
  hook:`ADDM 2020 was the first year White 8-year-olds had lower identified prevalence than Black, Hispanic and A/PI children. [[Maenner2023]]`},
 {from:.955,at:1,k:'Surveillance year 2022',t:'Latest: 1 in 31',
  txt:`In 2022, 16 sites found 32.2 per 1,000 8-year-olds, 1 in 31. Boys were identified 3.4 times as often as girls (49.2 vs 14.3 per 1,000). Sites ranged from 9.7 per 1,000 in Laredo, Texas, to 53.1 in California, more than fivefold. Only 34.6% of the children counted had all three elements of the case definition in their records. [[Shaw2025]]`,
  pt:`About 1 in 31 eight-year-olds in these US communities had been identified as autistic in 2022. The number tells us about identification as well as about autism.`,
  hook:`ADDM 2022: 32.2 per 1,000 (1 in 31), 16 sites, boys 3.4 times girls, median diagnosis age 47 months. [[Shaw2025]]`}];
const WH_STEPS_W=[
 {from:0,at:.03,k:'Worldwide · 1990',t:'A modelled baseline',
  txt:`The Global Burden of Disease (GBD) study models autism in every country and age group. Its age-standardised estimate for 1990 was 773.2 per 100,000, about 7.7 per 1,000 people of all ages. [[Santomauro2025]]`,
  pt:`Worldwide models count people of every age, not only children, so their numbers look smaller than US school-age counts.`,
  hook:`GBD: modelled, all ages, age-standardised. ADDM: records, 8-year-olds, selected US sites. Neither is "the" number.`},
 {from:.5,at:.63,k:'GBD 2010',t:'GBD 2010: 1 in 132',
  txt:`The GBD 2010 estimate was 52 million autistic people, 7.6 per 1,000 or one in 132. After adjusting for methods, the authors found "no clear evidence of a change in prevalence" between 1990 and 2010. [[Baxter2015]]`,
  pt:`Once differences in how studies counted are allowed for, the worldwide estimate hardly moved over 20 years.`,
  hook:`GBD 2010: 52 million, 1 in 132, no clear change since 1990. [[Baxter2015]]`},
 {from:.67,at:.69,k:'Global review, 2012',t:'A review median',
  txt:`A global review of prevalence studies in 2012 gave a median of 62 per 10,000. It found no clear differences by region, ethnicity or socioeconomic status, but evidence from low- and middle-income countries was thin. [[Elsabbagh2012]]`,
  pt:`A review median is the middle study: half the studies found more, half found less.`,
  hook:`Global review medians: 62 per 10,000 (2012) and 100 per 10,000 (2022). [[Elsabbagh2012,Zeidan2022]]`},
 {from:.8,at:.97,k:'GBD 2021',t:'GBD 2021: 1 in 127',
  txt:`GBD 2021 estimated 61.8 million autistic people in 2021 (uncertainty interval 52.1–72.7 million), one in every 127. Age-standardised prevalence was 788.3 per 100,000, almost the same as in 1990. The high-income super-region was highest (1,090.2 per 100,000); the lowest country estimate was Bangladesh (588.2). The authors call their US estimate "more conservative" than CDC's, and only six studies of adults fed their models. [[Santomauro2025]]`,
  pt:`About 1 in 127 people worldwide are autistic, and the modelled rate has barely changed since 1990.`,
  hook:`GBD 2021: 61.8 million, 1 in 127; 1,064.7 per 100,000 males vs 508.1 per 100,000 females. [[Santomauro2025]]`},
 {from:.99,at:1,k:'Global review, 2022',t:'Zeidan 2022: about 1 in 100',
  txt:`The 2022 systematic review update pooled 99 estimates from 71 studies published 2012–2021: median 100 per 10,000 (about 1 in 100), with a huge range (1.09 to 436.0 per 10,000). It attributes the variation to "community awareness, service capacity, help seeking, and sociodemographic factors". A separate three-level meta-analysis pooled 0.72%. [[Zeidan2022,Talantseva2023]]`,
  pt:`Countries count autism very differently. How many people are found depends a lot on who is looking and which services exist.`,
  hook:`Zeidan 2022: median about 1 in 100; male-to-female 4.2; 33.0% with intellectual disability. [[Zeidan2022]]`}];
const WH_CAP={us:`ADDM prevalence per 1,000 8-year-olds by surveillance year; the icons show the published "1 in N" (2000 is a rounding of 6.7 per 1,000). Flags mark what changed. [[ADDM2007SY2000,ADDM2007SY2002,ADDM2009SY2006,ADDM2012SY2008,ADDM2014SY2010,Christensen2016,Baio2018,Maenner2020,Maenner2021,Maenner2023,Shaw2025]]`,
 w:`GBD: age-standardised modelled prevalence, all ages (per 100,000 shown per 1,000). Review medians are from published studies. "1 in 129" for 1990 and "1 in 161" for 2012 are our conversions of the published rates. [[Santomauro2025,Baxter2015,Elsabbagh2012,Zeidan2022]]`};
const WH_EST=[
 {n:127,l:'Worldwide, all ages',tx:`GBD 2021 estimated that 61.8 million people, one in every 127, were on the autism spectrum in 2021. This is a model across all countries and ages. [[Santomauro2025]]`},
 {n:100,l:'Global review median',tx:`The median of 99 estimates from 71 studies published 2012–2021 was 100 per 10,000, about 1 in 100. Individual studies ranged from 1.09 to 436.0 per 10,000. [[Zeidan2022]]`},
 {n:91,l:'Adults in England',tx:`England's Adult Psychiatric Morbidity Survey, with a case-register survey of adults with intellectual disability, gave 11 per 1,000 adults (about 1.1%). Prevalence did not fall with age. [[Brugha2016,Brugha2011]]`},
 {n:45,l:'US adults (modelled)',tx:`A CDC modelling study estimated that 2.21% of US adults, about 5.4 million people, were autistic in 2017, including undiagnosed adults. State estimates ranged from 1.97% to 2.42%. [[Dietz2020]]`},
 {n:40,l:'US children, parent report',tx:`In the 2016 National Survey of Children's Health, parents of 2.50% of US children aged 3–17 (1 in 40) said their child had ever received an autism diagnosis and still had it. [[Kogan2018]]`},
 {n:34,l:'English 10–14-year-olds, recorded',tx:`In English primary care in 2018, 2.94% of 10–14-year-olds had a recorded autism diagnosis (1 in 34). [[ONions2023]]`},
 {n:31,l:'US 8-year-olds, ADDM 2022',tx:`In 16 US communities in 2022, 32.2 per 1,000 8-year-olds (1 in 31) had been identified as autistic. [[Shaw2025]]`},
 {n:6000,l:'English adults 70+, recorded',tx:`Only 0.02% of people aged 70 or older in English primary care had a recorded autism diagnosis in 2018 (1 in 6,000). Compare the adult survey: about 1 in 91 adults, at every age. The gap is people who were never diagnosed. [[ONions2023,Brugha2016]]`}];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote'),cap=$('#whCap'),bUS=$('#whUS'),bW=$('#whWorld');
  let mode='us';
  const steps=WH_STEPS_US.slice();
  /* flags: what changed (US view) */
  const FL=[{y:2002,l:'education records',s:'records'},{y:2006,l:'awareness, services',s:'services'},{y:2013,l:'DSM-5 definition',s:'DSM-5'},{y:2020,l:'children of colour',s:'children of colour'},{y:2022,l:'more girls',s:'girls'}];
  const R=rng(7);const LIT={};
  const litIdx=n=>{if(LIT[n]==null)LIT[n]=Math.floor(R()*n);return LIT[n]};
  function icons(x0,y0,w,rows,n,s,col){let g='';const cols=Math.ceil(n/rows),dx=w/cols,dy=s*1.22,li=litIdx(n);
    for(let i=0;i<n;i++){const c=i%cols,r=Math.floor(i/cols);const on=i===li;
      g+=person(x0+c*dx+dx/2,y0+r*dy,s,on?col:'var(--muted)',{op:on?1:.3})}
    return g}
  function draw(t){
    const N=vb(svg,'720 380','400 590');const us=mode==='us',D=us?WH_US:WH_W;
    const y0=us?2000:1990,y1=2022,yr=lerp(y0,y1,clamp(t)),yMax=us?35:12;
    const C=N?{x0:46,x1:380,top:316,bot:540}:{x0:66,x1:700,top:150,bot:330};
    const X=y=>lerp(C.x0,C.x1,(y-y0)/(y1-y0)),Y=v=>lerp(C.bot,C.top,v/yMax);
    let s=`<defs>${marker('whAr','var(--muted)')}</defs>`;
    /* current estimate: last point reached */
    let ci=0;D.forEach((d,i)=>{if(d.y<=yr+1e-6)ci=i});const cu=D[ci];
    /* headline and icon array */
    const col=us?'var(--brand)':'var(--accent)';
    const bx=N?20:18,by=N?44:52;
    s+=`<text x="${bx}" y="${by}" style="font:800 ${N?30:34}px var(--display);fill:${col}">1 in ${cu.n.toLocaleString('en')}</text>`;
    const l2=us?`8-year-olds · ADDM ${cu.y}`:`${cu.lab}`,l3=us?`${f1(cu.v)} per 1,000 · ${cu.s} sites`:cu.sub,l4=us?(cu.src?'rounded from the rate':'published figure'):(cu.calc?'1 in N: our conversion':'published figure');
    if(N){s+=`<text x="${bx}" y="${by+20}" class="t-sm">${l2}</text><text x="${bx}" y="${by+36}" class="t-xs">${l3}</text>`;
      s+=`<text x="380" y="${by}" class="t-xs t-end">${l4}</text>`;
      s+=icons(18,by+50,364,8,cu.n,16,col)}
    else{s+=`<text x="${bx}" y="${by+22}" class="t-sm">${l2}</text>`;
      const w3=l3.length>30?l3.split(', '):[l3];w3.forEach((q,k)=>s+=`<text x="${bx}" y="${by+40+k*13}" class="t-xs">${q}</text>`);
      s+=`<text x="${bx}" y="${by+40+w3.length*13+4}" class="t-xs" style="font-style:italic">${l4}</text>`;
      s+=icons(212,8,500,4,cu.n,22,col)}
    /* chart frame */
    const gr=us?[0,10,20,30]:[0,4,8,12];
    gr.forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<text x="${C.x0-6}" y="${C.top-10}" class="t-xs">per 1,000</text>`;
    s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${C.bot}" y2="${C.bot}" style="stroke:var(--muted)"/>`;
    const ls=us?(N?4:2):(N?8:4);
    for(let y=y0;y<=y1;y+=ls)s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${C.bot}" y2="${C.bot+4}" style="stroke:var(--muted)"/><text x="${f1(X(y))}" y="${C.bot+16}" class="t-xs t-mid">${y}</text>`;
    /* cursor */
    s+=`<line x1="${f1(X(yr))}" x2="${f1(X(yr))}" y1="${C.top-4}" y2="${C.bot}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/><text x="${f1(clamp(X(yr),C.x0+14,C.x1-14))}" y="${C.bot+33}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${Math.floor(yr+1e-6)}</text>`;
    if(us){
      /* flags */
      FL.forEach((f,k)=>{if(yr<f.y-.05)return;const op=clamp((yr-f.y+.05)/.8);const x=X(f.y),ly=C.bot-10-(k%2)*14;
        s+=`<g style="opacity:${f1(op)}"><line x1="${f1(x)}" x2="${f1(x)}" y1="${C.top+6}" y2="${C.bot}" style="stroke:var(--gold);stroke-width:1.2;stroke-dasharray:3 3"/>`;
        const anc=x>C.x1-120?'t-end':'',tx=anc?x-4:x+4;
        s+=`<text x="${f1(tx)}" y="${ly}" class="t-xs ${anc}" style="fill:var(--warn)">${N?f.s:f.l}</text></g>`});
      /* line drawn to the current year */
      let d='',area='';const pts=[];
      for(let i=0;i<D.length;i++){const p=D[i];if(p.y>yr)break;pts.push([X(p.y),Y(p.v)])}
      const nx=D[ci+1];if(nx&&yr>cu.y){const u=(yr-cu.y)/(nx.y-cu.y);pts.push([X(yr),Y(lerp(cu.v,nx.v,u))])}
      pts.forEach((p,i)=>d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1]));
      if(pts.length>1){area=d+`L${f1(pts[pts.length-1][0])} ${C.bot}L${f1(pts[0][0])} ${C.bot}Z`;s+=`<path d="${area}" style="fill:var(--brand);opacity:.1"/>`}
      s+=`<path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2.6;stroke-linejoin:round"/>`;
      D.forEach((p,i)=>{if(p.y>yr)return;const on=i===ci;
        s+=`<circle cx="${f1(X(p.y))}" cy="${f1(Y(p.v))}" r="${on?5.5:3.6}" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:2"/>`;
        if((!N&&p.y!==2002&&p.y!==2012)||on){const lx=clamp(X(p.y),C.x0+20,C.x1-22);s+=`<text x="${f1(lx)}" y="${f1(Y(p.v)-10)}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${on?f1(p.v):'1 in '+p.n}</text>`}});
    }else{
      /* GBD: almost flat modelled line */
      const g0=WH_W[0],g1=WH_W[3],ye=Math.min(yr,2021),u=(ye-1990)/(2021-1990);
      s+=`<path d="M${f1(X(1990))} ${f1(Y(g0.v))}L${f1(X(ye))} ${f1(Y(lerp(g0.v,g1.v,u)))}" style="fill:none;stroke:var(--accent);stroke-width:2.6"/>`;
      s+=`<text x="${f1(X(1993))}" y="${f1(Y(g0.v)+18)}" class="t-xs" style="fill:var(--accent)">GBD, modelled, age-standardised</text>`;
      D.forEach((p,i)=>{if(p.y>yr+1e-6)return;const on=i===ci,x=X(p.y),y=Y(p.v);
        if(p.kind==='rev')s+=`<path d="M${f1(x)} ${f1(y-6)}L${f1(x+6)} ${f1(y)}L${f1(x)} ${f1(y+6)}L${f1(x-6)} ${f1(y)}Z" style="fill:${on?'var(--gold)':'var(--panel)'};stroke:var(--gold);stroke-width:2"/>`;
        else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?5.5:4}" style="fill:${on?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:2"/>`;
        const above=p.kind!=='rev'||p.v>8,ty=above?y-12:y+18,lx=clamp(x,C.x0+30,C.x1-30);
        if(!N||on||p.kind==='rev')s+=`<text x="${f1(lx)}" y="${f1(ty)}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${p.lab}</text>`});
      /* the US school-age count is off this scale */
      if(yr>=2021.5){s+=`<text x="${C.x1}" y="${C.top-10}" class="t-xs t-end" style="fill:var(--brand)">↑ US ADDM 2022: 32.2 per 1,000, off this scale</text>`}
    }
    svg.innerHTML=s;
    const ph=phaseOf(steps,t);note.innerHTML=noteHTML(steps[ph]);setA(ph);
  }
  const stop=playWire(rg,$('#whPlay'),draw,14000,'%t:player.replay%','what');
  const setA=stepWire($('#whSteps'),steps,rg,draw,stop);
  function setMode(m){mode=m;stop();bUS.setAttribute('aria-pressed',m==='us');bW.setAttribute('aria-pressed',m!=='us');
    steps.splice(0,steps.length,...(m==='us'?WH_STEPS_US:WH_STEPS_W));
    $$('#whSteps [data-st] span').forEach((sp,i)=>sp.textContent=steps[i].t);
    cap.innerHTML=WH_CAP[m];rg.value=steps[0].at;draw(+rg.value)}
  bUS.addEventListener('click',()=>setMode('us'));bW.addEventListener('click',()=>setMode('w'));
  cap.innerHTML=WH_CAP.us;draw(+rg.value);

  /* ---- sex ratio bars ---- */
  const sx=$('#whSex'),sxCap=$('#whSexCap');let sv='loomes';
  const SX={loomes:[{l:'Diagnosed-only studies',v:4.56,ci:'4.10–5.07'},{l:'All 54 studies pooled',v:4.20,ci:'3.84–4.60'},{l:'High-quality studies',v:3.32,ci:'2.88–3.84'},{l:'Population-screened studies',v:3.25,ci:'2.93–3.62'}],
    addm:[{l:'ADDM 2016',v:4.3},{l:'ADDM 2018',v:4.2},{l:'ADDM 2020',v:3.8},{l:'ADDM 2022',v:3.4},{l:'GBD 2021 (modelled)',v:2.1,calc:true}]};
  const SXC={loomes:`Pooled male-to-female odds ratios from 54 prevalence studies (13,784,284 participants; I² 90.9%). The dashed line marks 3:1. [[Loomes2017]]`,
    addm:`ADDM boy-to-girl prevalence ratios for 8-year-olds. The GBD figure is our calculation from its sex-specific rates (1,064.7 ÷ 508.1 per 100,000). [[Maenner2020,Maenner2021,Maenner2023,Shaw2025,Santomauro2025]]`};
  function drawSex(){const N=vb(sx,'720 240','400 400');const rows=SX[sv];let s='';
    const L=N?{x0:16,x1:330,y0:44,dy:66,bh:16}:{x0:236,x1:500,y0:40,dy:rows.length>4?38:46,bh:18};
    const X=v=>lerp(L.x0,L.x1,v/5),yb=L.y0+rows.length*L.dy-(N?30:18);
    for(let v=0;v<=5;v++)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-12}" y2="${yb}" class="grid"/><text x="${f1(X(v))}" y="${L.y0-18}" class="t-xs t-mid">${v}:1</text>`;
    s+=`<line x1="${f1(X(3))}" x2="${f1(X(3))}" y1="${L.y0-12}" y2="${yb}" style="stroke:var(--good);stroke-width:1.6;stroke-dasharray:5 3"/>`;
    if(!N)s+=`<text x="650" y="${L.y0-18}" class="t-xs t-mid">boys per girl</text>`;
    rows.forEach((r,i)=>{const y=N?L.y0+i*L.dy+14:L.y0+i*L.dy,c=r.calc?'var(--muted)':(sv==='loomes'&&i>1?'var(--good)':'var(--accent)');
      if(N)s+=`<text x="${L.x0}" y="${y-7}" class="t-sm" style="fill:var(--ink)">${r.l}</text>`;
      else s+=`<text x="${L.x0-10}" y="${y+L.bh/2+4}" class="t-sm t-end" style="fill:var(--ink)">${r.l}</text>`;
      s+=`<rect x="${L.x0}" y="${y}" width="${f1(X(r.v)-L.x0)}" height="${L.bh}" rx="4" style="fill:${c};opacity:.85"/>`;
      s+=`<text x="${f1(X(r.v)+6)}" y="${y+L.bh/2+4}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.v.toFixed(sv==='loomes'?2:1)}${r.ci&&!N?`<tspan class="t-xs" style="font-weight:400"> (${r.ci})</tspan>`:''}</text>`;
      /* icons: boys for every girl */
      const full=Math.floor(r.v),fr=r.v-full,dx=N?9:14,sz=N?14:20,ox=N?384-(full+2)*dx-4:600,iy=N?y-21:y-2;let g='';
      for(let k=0;k<full;k++)g+=person(ox+k*dx,iy,sz,'var(--accent)');
      if(fr>.05)g+=`${person(ox+full*dx,iy,sz,'var(--accent)',{op:.18})}<clipPath id="whsx${i}"><rect x="${f1(ox+full*dx-sz*.3)}" y="${f1(iy-2)}" width="${f1(sz*.6*fr)}" height="${sz+4}"/></clipPath><g clip-path="url(#whsx${i})">${person(ox+full*dx,iy,sz,'var(--accent)')}</g>`;
      g+=person(ox+(full+1)*dx+(N?4:8),iy,sz,'var(--neuro)');s+=g});
    const ly=yb+(N?26:24),lx=N?16:236;
    s+=`<g transform="translate(${lx} ${ly})">${person(0,-12,15,'var(--accent)')}<text x="10" y="0" class="t-xs">boys</text>${person(54,-12,15,'var(--neuro)')}<text x="64" y="0" class="t-xs">girl (one per row)</text><line x1="${N?186:206}" x2="${N?206:226}" y1="-4" y2="-4" style="stroke:var(--good);stroke-width:1.6;stroke-dasharray:5 3"/><text x="${N?210:230}" y="0" class="t-xs">"closer to 3:1"</text></g>`;
    sx.innerHTML=s;sxCap.innerHTML=SXC[sv]}
  $$('[data-whsx]').forEach(b=>b.addEventListener('click',()=>{sv=b.dataset.whsx;$$('[data-whsx]').forEach(q=>q.setAttribute('aria-pressed',q===b));drawSex()}));
  drawSex();

  /* ---- 100-icon array ---- */
  const ic=$('#whIcons'),sel=$('#whEst'),en=$('#whEstNote');
  function drawIcons(){const e=WH_EST[+sel.value],per=100/e.n;let s='';
    const cols=10,dx=36,dy=27,x0=38,y0=10,sz=22;
    for(let i=0;i<100;i++){const c=i%cols,r=Math.floor(i/cols),x=x0+c*dx,y=y0+r*dy,f=clamp(per-i);
      s+=person(x,y,sz,'var(--muted)',{op:.28});
      if(f>0){if(f>=1)s+=person(x,y,sz,'var(--brand)');
        else s+=`<clipPath id="whic${i}"><rect x="${f1(x-sz*.3)}" y="${y-1}" width="${f1(Math.max(.8,sz*.6*f))}" height="${sz+2}"/></clipPath><g clip-path="url(#whic${i})">${person(x,y,sz,'var(--brand)')}</g>`}}
    s+=`<text x="200" y="${y0+10*dy+12}" class="t-xs t-mid">each icon = 1 person in 100</text>`;
    ic.innerHTML=s;
    const pv=per>=1?f1(per):per>=.1?per.toFixed(2):per.toFixed(3);
    en.innerHTML=`<div class="kicker">${e.l}</div><div class="wh-big"><span class="big-num">1 in ${e.n.toLocaleString('en')}</span><small>${pv} of every 100 people</small></div><p>${e.tx}</p><div class="pt"><b>%t:note.plain%</b>Which group is counted, and how, changes the number: children or adults, records or surveys, diagnosed or estimated.</div>`}
  sel.addEventListener('change',drawIcons);drawIcons();

  /* ---- age at diagnosis ---- */
  const ag=$('#whAge');
  const AG=[{l:'ADDM 2000',a:52,b:56},{l:'ADDM 2010',a:53},{l:'ADDM 2014',a:52},{l:'ADDM 2016',a:51},{l:'ADDM 2020',a:49},{l:'ADDM 2022',a:47,hl:1},{l:'World, all studies',a:60.48,w:1},{l:'World, children ≤10 y',a:43.18,w:1}];
  function drawAge(){const N=vb(ag,'720 250','400 330');let s='';
    const x0=N?120:170,x1=N?384:690,y0=N?34:30,dy=N?34:26,X=m=>lerp(x0,x1,m/72);
    for(let m=0;m<=72;m+=12)s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${y0-10}" y2="${y0+AG.length*dy-10}" class="grid"/><text x="${f1(X(m))}" y="${y0-14}" class="t-xs t-mid">${m}${m===72?' mo':''}</text>`;
    s+=`<rect x="${f1(X(36))}" y="${y0-10}" width="${f1(X(48)-X(36))}" height="${AG.length*dy}" style="fill:var(--good);opacity:.08"/>`;
    AG.forEach((r,i)=>{const y=y0+i*dy+4+(r.w?6:0),c=r.w?'var(--accent)':'var(--brand)';
      s+=`<text x="${x0-10}" y="${y+4}" class="t-xs t-end" style="fill:var(--ink)">${r.l}</text><line x1="${x0}" x2="${f1(X(r.b||r.a))}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:2"/>`;
      if(r.b)s+=`<rect x="${f1(X(r.a))}" y="${y-5}" width="${f1(X(r.b)-X(r.a))}" height="10" rx="5" style="fill:${c}"/>`;
      else s+=`<circle cx="${f1(X(r.a))}" cy="${y}" r="${r.hl?6.5:5}" style="fill:${c};stroke:var(--panel);stroke-width:1.5"/>`;
      s+=`<text x="${f1(X(r.b||r.a)+10)}" y="${y+4}" class="t-xs" style="${r.hl?'fill:var(--ink);font-weight:700':''}">${r.b?r.a+'–'+r.b:(r.a%1?f1(r.a):r.a)}</text>`});
    s+=`<text x="${f1(X(42))}" y="${y0+AG.length*dy+8}" class="t-xs t-mid" style="fill:var(--good)">3–4 years</text>`;
    ag.innerHTML=s}
  drawAge();
  onShow.what=()=>{drawSex();drawAge()};
  const pr=redraws.what;redraws.what=()=>{pr&&pr();drawSex();drawAge()};
};
