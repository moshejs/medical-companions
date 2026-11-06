/* =============== 1.1 What cystic fibrosis is =============== */
/* Four pieces: (1) the main scrubber, US median survival 1938-2019 beside the adult share of registry patients,
   ending with the modulator-era model projection; (2) birth prevalence by population on a log scale, with
   region filters and a gnomAD ancestry view; (3) a body map of the organs involved; (4) age at diagnosis with
   and without newborn screening. Every number comes from research pass A; citations sit in the HTML captions
   and the note panel, never inside SVG text. */
inits.what=()=>{
  const fmt=n=>Math.round(n).toLocaleString('en-GB');
  /* ---------------- (1) survival and adult share ---------------- */
  /* cited points ("Numbers for the animations", pass A). lbl: drawn beside the dot */
  const SURV=[{y:1938,v:.5,lbl:'~6 mo'},{y:1954,v:4.5,lbl:'4–5 y'},{y:1969,v:14,lbl:'14 y'},{y:1990,v:28,lbl:'28 y'},
    {y:2011,v:36.8,lbl:'36.8'},{y:2012,v:40},{y:2018,v:47.4},{y:2019,v:48.4,lbl:'48.4 y'}];
  const survFn=monoFn(SURV.map(p=>[p.y,p.v]));
  const ADULT=[[1969,8],[1990,33],[2018,54.6]],adultFn=monoFn(ADULT);
  const EU=[[2014,50.9],[2024,60.5]];
  const Y0=1938,Y1=2024,TP=.88;
  const yearOf=t=>t<TP?lerp(Y0,Y1,t/TP):Y1, tOf=y=>(y-Y0)/(Y1-Y0)*TP;
  const STEPS=[
   {from:0,at:tOf(1946),k:'1938 to 1954',t:'A disease of infancy',
    txt:'When Dorothy Andersen described CF in 1938, life expectancy was about 6 months [[Davis2006]], and babies usually died in their first year [[Scotet2020]]. By 1954 the median survival age was estimated at 4–5 years [[McBennett2022]]. There was no registry yet, so there is no figure for the share of adults.',
    pt:'In the 1950s, most children with CF died very young [[McBennett2022]].',
    hook:'1938: Andersen describes "cystic fibrosis of the pancreas" and separates it from coeliac disease [[Andersen1938,Davis2006]].'},
   {from:tOf(1962),at:tOf(1969),k:'1969',t:'Care centres change the curve',
    txt:'From 1955, care centres running comprehensive programmes began a striking improvement in survival; their pillars of nutrition, airway clearance and infection treatment are still in use [[Davis2006]]. In 1969 US median survival was 14 years, and only 8% of patients were adults [[FitzSimmons1993]].',
    pt:'Better food, daily chest physiotherapy and treating infections early were the first things that helped children with CF live longer [[Davis2006]].'},
   {from:tOf(1980),at:tOf(1990),k:'1990',t:'Survival doubles',
    txt:'US median survival doubled from 14 years in 1969 to 28 years in 1990, and the share of adults rose fourfold, from 8% to 33% [[FitzSimmons1993]]. The median age at diagnosis was 7 months, and 16% of newly diagnosed patients had meconium ileus [[FitzSimmons1993]]. Median survival was 25 years for females and 30 for males [[FitzSimmons1993]].',
    hook:'US median survival: 14 years (1969) to 28 (1990); adults: 8% to 33% of patients [[FitzSimmons1993]].'},
   {from:tOf(2003),at:tOf(2011),k:'2011 to 2018',t:'Adults become the majority',
    txt:'Reported median survival was 36.8 years in the US in 2011, against 48.5 in Canada [[Stephenson2017]]; the US predicted median survival was 40 years for 2010–2014 [[McBennett2022]] and 47.4 in the 2016–2018 reports [[Scotet2020]]. By then adults were 54.6% of US registry patients, and over half in Australia, the UK, France, Ireland, Belgium and Canada too [[Scotet2020]].',
    pt:'Survival numbers are averages for large groups. They cannot tell you how long one person will live [[Keogh2018Guide]].',
    hook:'Predicted median survival applies today\'s death rates to babies born today; median age at death is not a survival measure [[Scotet2020,Keogh2018Guide]].'},
   {from:tOf(2019),at:tOf(2022),k:'2019 onwards',t:'The modulator era',
    txt:'Based on 2019 data, predicted median survival for a US baby born with CF was 48.4 years [[McBennett2022]]. In 16,116 US people who started elexacaftor–tezacaftor–ivacaftor (ETI) in 2019–2020, the yearly death rate was 0.47% against 1.65% in the 2019 registry, 72% lower [[Bower2023]]. In 20 European countries, adults rose from 50.9% to 60.5% of the CF population between 2014 and 2024, as ETI use went from 2% to 71% [[Orenti2026]].',
    pt:'New medicines called modulators fix part of the problem at its source, and many people on them are much healthier [[TaylorCousar2023Lancet]].',
    hook:'In most countries with established CF care, adults now outnumber children [[Burgel2023Chest,Bell2020Commission]].'},
   {from:.9,at:1,k:'A model projection',t:'Where survival may go',
    txt:'<span class="ev early">Early evidence</span> A microsimulation projected a median survival of 71.6 years for F508del homozygotes treated with ETI, 33.5 years more than best supportive care, and 82.5 years if ETI starts at age 12–17 [[Lopez2023Survival]]. This is a model, not an observation: trials are too short to measure deaths [[BalfourLynn2022]], and long-term effects are still being studied [[TaylorCousar2023Lancet]].',
    pt:'These medicines are not a cure, and not everyone can get or use them: in 2022 only about 12% of the estimated people with CF worldwide were on triple therapy [[TaylorCousar2023Lancet,Guo2022Access]].',
    hook:'ETI projection (model): median survival 71.6 years, 82.5 if started at 12–17 <span class="ev early">Early evidence</span> [[Lopez2023Survival]].'}
  ];
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote'),read=$('#whRead');
  let setA=()=>{};
  function draw(t){
    const N=vb(svg,'720 392','400 640'),yr=yearOf(t),p=phaseOf(STEPS,t),P=STEPS[p],proj=ramp(t,.9,.98);
    const L=N?{cx:44,cy:78,cw:336,ch:236,ax:20,ay:368,isz:14,igap:3,ex:200,ey:436,ew:180}
             :{cx:58,cy:62,cw:378,ch:256,ax:470,ay:58,isz:15,igap:4,ex:470,ey:330,ew:228};
    let s=`<defs>${marker('whAr','var(--muted)',6)}</defs>`;
    s+=`<text x="${N?20:24}" y="30" class="t-big" style="font-size:26px">${Math.floor(yr)}</text>`;
    s+=`<text x="${N?90:96}" y="29" class="t-lbl">${P.t}</text>`;
    /* chart */
    const C=curve(L.cx,L.cy,L.cw,L.ch,survFn,{x0:Y0,x1:2026,y0:0,y1:90,upto:Math.min(yr,2019),col:'var(--brand)',fill:true,dot:false,lw:2.6});
    for(const g of [20,40,60,80]){const yy=C.Y(g);s+=`<line x1="${L.cx}" x2="${L.cx+L.cw}" y1="${f1(yy)}" y2="${f1(yy)}" class="grid"/>`}
    s+=C.svg;
    for(const g of [0,20,40,60,80])s+=`<text x="${L.cx-6}" y="${f1(C.Y(g)+3)}" class="t-xs t-end">${g}</text>`;
    for(const g of [1940,1960,1980,2000,2020]){const xx=C.X(g);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${L.cy+L.ch}" y2="${L.cy+L.ch+4}" class="axis"/><text x="${f1(xx)}" y="${L.cy+L.ch+16}" class="t-xs t-mid">${g}</text>`}
    s+=`<text x="${L.cx}" y="${L.cy-8}" class="t-xs" style="fill:var(--ink);font-weight:600">US median survival age (years)</text>`;
    /* cited points */
    SURV.forEach(q=>{if(q.y>yr+.01)return;const x=C.X(q.y),y=C.Y(q.v);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:var(--panel);stroke:var(--brand);stroke-width:2"/>`;
      if(q.lbl){const right=q.y<2000;s+=`<text x="${f1(x+(right?7:-7))}" y="${f1(y-7)}" class="t-xs${right?'':' t-end'}" style="fill:var(--ink);font-weight:600">${q.lbl}</text>`}});
    if(yr<2019){const xx=C.X(yr);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${L.cy}" y2="${L.cy+L.ch}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`}
    /* projections (model) */
    if(proj>0){const op=f1(proj),x0=C.X(2019);
      [[82.5,'82.5 y · ETI from age 12–17 (model)'],[71.6,'71.6 y · ETI, F508del homozygous (model)']].forEach(([v,l])=>{const yy=C.Y(v);
        s+=`<g style="opacity:${op}"><line x1="${f1(L.cx)}" x2="${f1(L.cx+L.cw)}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:6 4"/><text x="${L.cx+6}" y="${f1(yy-5)}" class="t-xs" style="fill:var(--rx);font-weight:600">${l}</text></g>`});
      s+=`<g style="opacity:${op}"><path d="M${f1(x0)} ${f1(C.Y(48.4)-6)}L${f1(x0)} ${f1(C.Y(71.6)+6)}" class="arrow" style="stroke:var(--rx)" marker-end="url(#whAr)"/></g>`;
      s+=`<text x="${f1(x0-8)}" y="${f1(C.Y(60))}" class="t-xs t-end" style="opacity:${op};fill:var(--rx)">projection, not data</text>`}
    /* adult share */
    const ad=yr<1969?null:yr>=2018?54.6:adultFn(yr);
    s+=`<text x="${L.ax}" y="${L.ay}" class="t-xs" style="fill:var(--ink);font-weight:600">Adults as a share of US registry patients</text>`;
    s+=`<text x="${L.ax}" y="${L.ay+26}" class="t-big" style="font-size:22px;fill:var(--brand)">${ad==null?'–':f1(ad)+'%'}</text>`;
    const lastA=ADULT.filter(a=>a[0]<=yr+.01).pop();
    s+=`<text x="${L.ax+(N?96:90)}" y="${L.ay+24}" class="t-xs">${ad==null?'no registry figure yet':lastA?'cited: '+lastA[1]+'% in '+lastA[0]+(yr-lastA[0]>1&&lastA[0]<2018?'; line between':''):''}</text>`;
    const I=icons(L.ax,L.ay+38,{n:100,cols:10,k:ad==null?0:Math.round(ad),size:L.isz,gap:L.igap,col:'var(--brand)',base:'var(--panel-2)'});
    s+=`<g style="opacity:${ad==null?.45:1}">${I.svg}</g>`;
    s+=`<text x="${L.ax}" y="${f1(L.ay+38+I.h+10)}" class="t-xs">each figure = 1% · filled = adults (18+)</text>`;
    /* Europe */
    const eu=yr<2014?null:yr>=2024?60.5:lerp(50.9,60.5,(yr-2014)/10);
    const ey=L.ey;
    s+=`<text x="${L.ex}" y="${ey}" class="t-xs" style="fill:var(--ink);font-weight:600">20 European countries</text>`;
    s+=`<rect x="${L.ex}" y="${ey+8}" width="${L.ew}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
    if(eu!=null)s+=`<rect x="${L.ex}" y="${ey+8}" width="${f1(L.ew*eu/100)}" height="12" rx="6" style="fill:var(--accent)"/><line x1="${f1(L.ex+L.ew/2)}" x2="${f1(L.ex+L.ew/2)}" y1="${ey+5}" y2="${ey+23}" style="stroke:var(--ink);stroke-width:1"/>`;
    s+=`<text x="${L.ex}" y="${ey+36}" class="t-xs">${eu==null?'registry series starts in 2014':'adults '+f1(eu)+'%'+(N?'':' (2014: 50.9%, 2024: 60.5%)')}</text>`;
    if(N&&eu!=null)s+=`<text x="${L.ex}" y="${ey+50}" class="t-xs">2014: 50.9% · 2024: 60.5%</text>`;
    /* caveat */
    const cy=N?L.ay+38+I.h+30:384;
    s+=`<text x="${N?20:24}" y="${cy}" class="t-sm" style="fill:var(--ink)">Population statistics: medians for whole registries, not a forecast for one person.</text>`;
    if(N)s=s.replace('Population statistics: medians for whole registries, not a forecast for one person.</text>','Population statistics: medians for whole registries,</text>'+`<text x="20" y="${cy+15}" class="t-sm" style="fill:var(--ink)">not a forecast for one person.</text>`);
    svg.innerHTML=s;
    note.innerHTML=noteHTML(P);setA(p);
    const lastS=SURV.filter(q=>q.y<=yr+.01).pop();
    read.innerHTML=`<span>Year <b>${Math.floor(yr)}</b></span><span>Latest cited US survival figure <b>${lastS.v<1?'about 6 months':f1(lastS.v)+' years'}</b> (${lastS.y})</span>${proj>.5?'<span>Model projection <b>71.6–82.5 years</b></span>':''}`;
    rg.setAttribute('aria-valuetext',`${Math.floor(yr)}: ${P.t}`);
  }
  const stop=playWire(rg,$('#whPlay'),draw,22000,'%t:player.replay%','what');
  setA=stepWire($('#whSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------------- (2) birth prevalence ---------------- */
  /* N = births per case ("1 in N"); a two-value N is a published range. gnomAD rows give births per 100,000 directly. */
  const PREV=[
    {n:'Ohio Amish',g:'founder',N:569,src:'Scotet 2020'},
    {n:'Saguenay–Lac-Saint-Jean, Quebec',g:'founder',N:902,src:'Scotet 2020'},
    {n:'Ireland',g:'europe',N:1353,src:'Scotet 2020'},
    {n:'Euro-Brazilian infants',g:'americas',N:1600,src:'Bell 2020'},
    {n:'Ireland, screening 2011–2021',g:'europe',N:2203,src:'McGuire 2026'},
    {n:'Jordan',g:'asia',N:2560,src:'Scotet 2020'},
    {n:'Australasia (average)',g:'asia',N:3000,src:'Scotet 2020'},
    {n:'US, white births',g:'americas',N:3200,src:'Hamosh 1998'},
    {n:'Canada (average)',g:'americas',N:3300,src:'Scotet 2020'},
    {n:'US, all births',g:'americas',N:4000,src:'Scotet 2020'},
    {n:'Western Europe (average)',g:'europe',N:4500,src:'Scotet 2020'},
    {n:'Northern & Central Europe',g:'europe',N:6000,src:'Scotet 2020'},
    {n:'Argentina',g:'americas',N:6100,src:'Scotet 2020'},
    {n:'Latin America (average)',g:'americas',N:[8000,10000],src:'Scotet 2020'},
    {n:'India (estimate)',g:'asia',N:[10000,100000],src:'Scotet 2020'},
    {n:'Afro-Brazilian infants',g:'americas',N:14000,src:'Bell 2020'},
    {n:'US, Black births',g:'americas',N:15000,src:'Hamosh 1998'},
    {n:'Costa Rica',g:'americas',N:15000,src:'Scotet 2020'},
    {n:'Finland',g:'europe',N:25000,src:'Scotet 2020'},
    {n:'Japan',g:'asia',N:350000,src:'Scotet 2020'}];
  const GNOM=[{n:'European',r:[44,52]},{n:'African / African American',r:[11,14]},{n:'Admixed American',r:[7,7]},{n:'South Asian',r:[6,6]},{n:'East Asian',r:[4,4]},{n:'Middle Eastern',r:[.2,1]}];
  const CAPS={all:'Figures: Scotet 2020 compilation [[Scotet2020]], US by ancestry [[Hamosh1998]], Brazil [[Bell2020Commission]], Ireland\'s screening programme [[McGuire2026]]. Founder populations, descended from a small group of ancestors, have the highest rates.',
    europe:'Europe ranges from 1 in 1,353 births in Ireland to 1 in 25,000 in Finland [[Scotet2020]]. Ireland\'s own screening programme (650,809 infants, 2011–2021) found 1 in 2,203 [[McGuire2026]], and EU prevalence was 0.737 per 10,000 people against Ireland\'s 2.98 [[Farrell2008EU]].',
    americas:'US incidence was about 1 in 3,200 white and 1 in 15,000 Black births [[Hamosh1998]], and Brazil ranges from 1 in 1,600 Euro-Brazilian to 1 in 14,000 Afro-Brazilian infants [[Bell2020Commission]]. Latin America averages 1 in 8,000 to 1 in 10,000 [[Scotet2020]].',
    asia:'Asia ranges from 1 in 2,560 in Jordan to 1 in 350,000 in Japan; CF is more frequent in the Middle East, where consanguinity is common, than in East Asia [[Scotet2020]]. India\'s 1 in 10,000 to 1 in 100,000 is an estimate [[Scotet2020]].',
    founder:'1 in 569 among the Ohio Amish and 1 in 902 in Saguenay–Lac-Saint-Jean, Quebec [[Scotet2020]]: a founder effect, where one variant was common in a small group of ancestors.',
    gnomad:'<span class="ev early">Early evidence</span> Estimates from variant frequencies in a genome database, not from counted births [[Bar2026]]. Because of higher birth rates, the same analysis estimated 1,426–1,582 CF births a year in India and 330–390 in Brazil, against about 1,000 in the US [[Bar2026]].'};
  const pv=$('#whPrev'),pcap=$('#whPrevCap');let pmode='all',pgrow=1,pstop=null;
  const L10=Math.log10,LMIN=-1,LMAX=L10(300);
  function pRows(){return pmode==='gnomad'?GNOM.map(r=>({n:r.n,lo:r.r[0],hi:r.r[1],lab:(r.r[0]===r.r[1]?r.r[0]:r.r[0]+'–'+r.r[1])+' per 100,000'}))
    :PREV.filter(r=>pmode==='all'||r.g===pmode).map(r=>{const a=Array.isArray(r.N)?r.N:[r.N,r.N];return {n:r.n,lo:1e5/a[1],hi:1e5/a[0],lab:'1 in '+(a[0]===a[1]?fmt(a[0]):fmt(a[0])+'–'+fmt(a[1])),src:r.src}})}
  function pDraw(){const R=pRows(),N=NARROW(),rh=N?36:23,top=N?34:40,H=top+R.length*rh+44;
    vb(pv,`720 ${H}`,`400 ${H}`);
    const bx=N?14:230,bw=N?290:390,X=v=>bx+bw*(L10(Math.max(v,.1))-LMIN)/(LMAX-LMIN);
    let s=`<text x="${N?14:12}" y="18" class="t-xs" style="fill:var(--ink);font-weight:600">${pmode==='gnomad'?'CF births per 100,000, by genetic ancestry (estimate)':'CF births per 100,000 (log scale)'}</text>`;
    for(const v of [.1,1,10,100]){const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${top-6}" y2="${top+R.length*rh}" class="grid"/><text x="${f1(xx)}" y="${f1(top+R.length*rh+14)}" class="t-xs t-mid">${v}</text>`}
    R.forEach((r,i)=>{const y=top+i*rh,by=N?y+14:y+4,bh=N?11:13,xe=lerp(bx,X(r.hi),pgrow),xs=lerp(bx,X(r.lo),pgrow);
      const hot=r.hi>=50,col=pmode==='gnomad'?'var(--accent)':hot?'var(--brand)':'var(--accent)';
      if(N)s+=`<text x="${bx}" y="${y+10}" class="t-xs" style="fill:var(--ink);font-weight:600">${r.n}</text>`;
      else s+=`<text x="${bx-8}" y="${by+10}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${r.n}</text>`;
      s+=`<rect x="${bx}" y="${by}" width="${f1(Math.max(1,xs-bx))}" height="${bh}" rx="3" style="fill:${col}"/>`;
      if(r.hi>r.lo*1.01)s+=`<rect x="${f1(xs)}" y="${by}" width="${f1(Math.max(1,xe-xs))}" height="${bh}" rx="3" style="fill:${col};opacity:.35"/>`;
      s+=`<text x="${f1(xe+6)}" y="${by+10}" class="t-xs" style="opacity:${f1(pgrow)}">${r.lab}</text>`});
    s+=`<text x="${N?14:bx}" y="${f1(top+R.length*rh+32)}" class="t-xs">${pmode==='gnomad'?'bars: published range (light part = uncertainty)':'per 100,000 = 100,000 ÷ N · light part = published range · darker = more than 1 in 2,000'}</text>`;
    pv.innerHTML=s}
  function pSet(m){pmode=m;$$('#whPrevBtns [data-pv]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pv===m));
    pcap.innerHTML=CAPS[m];if(pstop)pstop();pgrow=0;pstop=animate(650,q=>{pgrow=ease(q);pDraw()},()=>{pstop=null})}
  $('#whPrevBtns').addEventListener('click',e=>{const b=e.target.closest('[data-pv]');if(b)pSet(b.dataset.pv)});
  pcap.innerHTML=CAPS.all;pgrow=1;pDraw();

  /* ---------------- (3) body map ---------------- */
  const ORG=[
   {id:'lungs',n:'Lungs',lx:[262,128],
    t:'Lungs: bronchiectasis and infection',
    txt:'The Lancet seminar lists bronchiectasis and small-airway obstruction [[Elborn2016]]. Lung disease causes "the vast majority" of illness and deaths [[Ratjen2015]], and the classic features include chronic infection, pneumothorax, haemoptysis (coughing blood) and respiratory failure [[Bell2020Commission]].',
    pt:'The changed gene makes mucus thick and sticky. It clogs the lungs, the pancreas and other organs [[Elborn2016]].'},
   {id:'sinus',n:'Sinuses & nose',lx:[250,48],
    t:'Sinuses: rhinosinusitis and nasal polyps',
    txt:'Chronic rhinosinusitis with nasal polyps is one of the classic features [[Bell2020Commission]]. Nasal polyps were found in 37% of 211 adults with CF examined by nasal endoscopy [[Hadfield2000]].'},
   {id:'liver',n:'Liver',lx:[96,232],
    t:'Liver: CF liver disease',
    txt:'Blocked bile ducts can lead to biliary cirrhosis [[Elborn2016]]. CF liver disease is one of the common comorbidities of classical CF [[Shteinberg2021]]. More in <a href="#digestive" data-go="digestive">Pancreas, gut &amp; liver</a>.'},
   {id:'panc',n:'Pancreas',lx:[290,236],
    t:'Pancreas: enzymes that never arrive',
    txt:'About 85% of people with CF are pancreatic insufficient, most soon after birth [[Singh2017PI]]. Two severe variants (such as F508del or G551D) go with insufficiency; a mild variant (such as R117H) with sufficiency [[Kristidis1992]]. Untreated, it means malabsorption and poor growth [[Elborn2016,Friedman2025]]. CF-related diabetes is a common comorbidity [[Shteinberg2021]].',
    hook:'About 85% of people with CF are pancreatic insufficient [[Singh2017PI]].'},
   {id:'gut',n:'Intestine',lx:[96,300],
    t:'Gut: meconium ileus, DIOS and prolapse',
    txt:'Meconium ileus, a blocked bowel at birth, occurs in about 20% of people diagnosed with CF and is often the first sign [[Sathe2017MI]]. Distal intestinal obstruction syndrome (DIOS) and rectal prolapse are also classic features [[Bell2020Commission]]. In the US, people with CF of African ancestry had less meconium ileus but more DIOS than white patients [[Hamosh1998]].',
    hook:'Meconium ileus: about 20% of people with CF, often the first sign [[Sathe2017MI]].'},
   {id:'sweat',n:'Sweat glands',lx:[318,334],
    t:'Skin: salty sweat',
    txt:'The sweat duct cannot take chloride back, so salt stays in the sweat [[Quinton1983]]. Salt loss can cause heat shock [[Elborn2016]]: during a New York heat wave in 1948–49, dehydrated children with CF led di Sant\'Agnese to study their sweat [[Friedman2025,McBennett2022]]. The same defect is the basis of the sweat test.',
    pt:'Long ago, people noticed that some babies tasted salty when kissed. Doctors later found this salty sweat is a sign of CF [[Busch1990,DiSantAgnese1953]].'},
   {id:'vas',n:'Vas deferens',lx:[262,392],
    t:'Male fertility: the missing vas deferens',
    txt:'Up to 97–98% of men with CF are infertile because the vas deferens, the tube that carries sperm, is absent on both sides (CBAVD); sperm production is usually intact [[Kaltsas2025]]. In men with CBAVD (not all of whom have CF), 78% carried at least one CFTR variant [[Yu2012CBAVD]].',
    pt:'Most men with CF can\'t have children naturally, but many can become fathers with fertility treatment [[Kaltsas2025]].',
    hook:'Up to 97–98% of men with CF are infertile from CBAVD, with sperm production intact [[Kaltsas2025]].'}
  ];
  const bsv=$('#whBody'),onote=$('#whOrgNote'),obtn=$('#whOrgBtns');let org='lungs',opulse=1,ostop=null;
  obtn.innerHTML=ORG.map(o=>`<button class="btn" data-org="${o.id}" aria-pressed="${o.id===org}">${o.n}</button>`).join('');
  function bDraw(){const O=ORG.find(o=>o.id===org),op=id=>id===org?1:.32,hl=id=>id===org;
    let s=`<defs>${marker('whOa','var(--ink)',6)}</defs>`;
    /* body outline */
    s+=`<path d="M200 22C224 22 238 40 238 64C238 86 226 100 214 106L214 118C250 124 276 136 286 160L318 300C322 316 316 326 306 326C298 326 294 318 292 310L262 196L262 300C262 330 256 360 250 380L246 456L212 456L206 352L194 352L188 456L154 456L150 380C144 360 138 330 138 300L138 196L108 310C106 318 102 326 94 326C84 326 78 316 82 300L114 160C124 136 150 124 186 118L186 106C174 100 162 86 162 64C162 40 176 22 200 22Z" style="fill:var(--skin);stroke:var(--line);stroke-width:1.5"/>`;
    /* sinuses */
    s+=`<g style="opacity:${op('sinus')}"><ellipse cx="195" cy="46" rx="4" ry="5" style="fill:var(--mucus);stroke:var(--mucus-thick)"/><ellipse cx="205" cy="46" rx="4" ry="5" style="fill:var(--mucus);stroke:var(--mucus-thick)"/><path d="M180 70q6 -6 12 0q-6 8 -12 0ZM208 70q6 -6 12 0q-6 8 -12 0Z" style="fill:var(--mucus);stroke:var(--mucus-thick)"/></g>`;
    /* lungs from the kit */
    s+=`<g style="opacity:${op('lungs')}">${lungs(200,170,.5,{plugs:hl('lungs')?.4+.2*opulse:.3,inflam:hl('lungs')?.4:.2,id:'whLg'}).svg}</g>`;
    /* liver (the person's right = viewer's left) */
    s+=`<g style="opacity:${op('liver')}"><path d="M144 214C160 206 196 208 214 216C210 236 190 250 166 252C150 252 140 240 144 214Z" style="fill:var(--duct);opacity:.85;stroke:var(--line)"/></g>`;
    /* pancreas from the kit */
    s+=`<g style="opacity:${op('panc')}">${pancreas(186,232,.42,{block:hl('panc')?.6:.3,flow:hl('panc')?.3:0,ph:opulse,islets:hl('panc')}).svg}</g>`;
    /* intestine: a coil */
    let d='M170 286';for(let i=0;i<4;i++){const yy=286+i*14;d+=`C${i%2?150:250} ${yy} ${i%2?150:250} ${yy+14} ${i%2?230:170} ${yy+14}`}
    s+=`<g style="opacity:${op('gut')}"><path d="${d}" style="fill:none;stroke:var(--gut);stroke-width:11;stroke-linecap:round"/><path d="${d}" style="fill:none;stroke:var(--duct);stroke-width:1.2;opacity:.6"/>`+(hl('gut')?`<circle cx="232" cy="300" r="${f1(5+2*opulse)}" style="fill:var(--mucus-thick)"/>`:'')+`</g>`;
    /* sweat glands: salt crystals on the forearm */
    s+=`<g style="opacity:${op('sweat')}">`;[[296,272],[302,286],[292,292],[306,300],[298,306]].forEach(([x,y],i)=>{s+=`<rect x="${x-3}" y="${y-3}" width="6" height="6" transform="rotate(${20*i} ${x} ${y})" style="fill:var(--salt);stroke:var(--salt-edge)"/>`});
    s+=`<path d="M290 262c4 6 4 12 0 16" style="fill:none;stroke:var(--water);stroke-width:2"/></g>`;
    /* vas deferens */
    s+=`<g style="opacity:${op('vas')}"><path d="M186 344C178 360 182 372 194 374M214 344C222 360 218 372 206 374" style="fill:none;stroke:var(--duct);stroke-width:3;stroke-dasharray:${hl('vas')?'4 4':'0'}"/></g>`;
    /* label for the chosen organ */
    const tgt={lungs:[226,150],sinus:[214,68],liver:[160,230],panc:[240,244],gut:[176,312],sweat:[302,288],vas:[212,366]}[org];
    const [lx,ly]=O.lx,left=lx<200;
    s+=`<path d="M${lx+(left?40:-6)} ${ly-4}L${tgt[0]} ${tgt[1]}" style="stroke:var(--ink);stroke-width:1.3;fill:none" marker-end="url(#whOa)"/>`;
    s+=`<rect x="${left?lx-62:lx-4}" y="${ly-18}" width="${O.n.length*7.4+14}" height="22" rx="11" style="fill:var(--ink)"/><text x="${left?lx-55:lx+3}" y="${ly-3}" class="t-lbl" style="fill:var(--bg);font-size:12px">${O.n}</text>`;
    bsv.innerHTML=s}
  function oSet(id){org=id;$$('#whOrgBtns [data-org]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.org===id));
    const O=ORG.find(o=>o.id===id);onote.innerHTML=noteHTML({k:'Organ',t:O.t,txt:O.txt,pt:O.pt,hook:O.hook});
    if(ostop)ostop();ostop=animate(900,q=>{opulse=q;bDraw()},()=>{ostop=null})}
  obtn.addEventListener('click',e=>{const b=e.target.closest('[data-org]');if(b)oSet(b.dataset.org)});
  oSet('lungs');opulse=1;bDraw();

  /* ---------------- (4) age at diagnosis, with and without screening ---------------- */
  const ssv=$('#whScr');let sc=0,spos=72,sstop=null;
  function sDraw(){const N=vb(ssv,'720 200','360 210'),x0=N?16:40,w=N?324:640,yA=N?150:128,X=wk=>x0+w*wk/80;
    let s=`<text x="${x0}" y="24" class="t-lbl">${sc?'With newborn screening: diagnosed at a mean of 12 weeks':'Without screening: diagnosed at a mean of 72 weeks'}</text>`;
    if(N)s=`<text x="${x0}" y="22" class="t-lbl">${sc?'With newborn screening':'Without screening'}</text><text x="${x0}" y="40" class="t-sm">mean age at diagnosis: ${sc?'12':'72'} weeks</text>`;
    s+=`<rect x="${x0}" y="${yA-8}" width="${f1(X(spos)-x0)}" height="16" rx="8" style="fill:${sc?'var(--good-soft)':'var(--warn-soft)'}"/>`;
    s+=tline(x0,yA,w,{min:0,max:80,step:N?20:10,fmt:v=>v,label:'age in weeks'}).svg;
    /* the baby marker */
    const bx=X(spos);s+=`<circle cx="${f1(bx)}" cy="${yA-40}" r="15" style="fill:var(--skin);stroke:var(--ink);stroke-width:1.5"/><circle cx="${f1(bx-5)}" cy="${yA-42}" r="1.6" style="fill:var(--ink)"/><circle cx="${f1(bx+5)}" cy="${yA-42}" r="1.6" style="fill:var(--ink)"/><path d="M${f1(bx-5)} ${yA-35}q5 4 10 0" style="fill:none;stroke:var(--ink);stroke-width:1.3"/>`;
    s+=`<line x1="${f1(bx)}" x2="${f1(bx)}" y1="${yA-24}" y2="${yA-6}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    s+=`<text x="${f1(Math.min(bx,x0+w-90))}" y="${yA-62}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${Math.round(spos)} weeks</text>`;
    s+=`<text x="${x0}" y="${yA+(N?50:46)}" class="t-xs">${sc?'Screened babies grew better through childhood.':'More malnourished at diagnosis; severe malnutrition may not be reversible.'}</text>`;
    ssv.innerHTML=s}
  $('#whScrBtns').addEventListener('click',e=>{const b=e.target.closest('[data-sc]');if(!b)return;sc=+b.dataset.sc;
    $$('#whScrBtns [data-sc]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const a=spos,z=sc?12:72;if(sstop)sstop();sstop=animate(800,q=>{spos=lerp(a,z,ease(q));sDraw()},()=>{sstop=null})});
  sDraw();

  /* redraw the extra panels when the layout mode flips */
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();pDraw();bDraw();sDraw()};
};
