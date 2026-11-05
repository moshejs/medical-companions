/* =============== 1.1 what gout is =============== */
/* population bars: v in %, or p per 100,000 for the modelled rows; men/wom only where the source splits by sex */
const WH_POP=[
 {n:'Pasifika peoples, NZ',y:'2019',v:14.8,m:'National health data',k:'obs',
  txt:'14.8% of Pasifika peoples had gout in 2019 national data, against 4.7% of other New Zealanders. Almost half of older Pasifika men were estimated to have gout. In the Genetics of Gout in Aotearoa study, mean age at onset was 34 years. [[TeKaru2021]]'},
 {n:'Māori, NZ',y:'2019',v:8.5,m:'National health data',k:'obs',
  txt:'8.5% of Māori had gout in 2019. More than one-third of older Māori men were estimated to have gout, and mean age at onset was 39 years. [[TeKaru2021]]'},
 {n:'Other New Zealanders',y:'2019',v:4.7,m:'National health data',k:'obs',
  txt:'4.7% of other New Zealanders, mainly NZ European, had gout in 2019; mean age at onset was 46 years. [[TeKaru2021]] Prevalence is highest in Pacific countries worldwide. [[Kuo2015NRR]]'},
 {n:'US adults',y:'2015–16',v:3.9,men:5.2,wom:2.7,m:'Survey, self-reported diagnosis',k:'obs',
  txt:'NHANES 2015–2016, 5,467 adults: 3.9% said a doctor had diagnosed gout, about 9.2 million people; 5.2% of men and 2.7% of women. About 20% of both men and women had hyperuricaemia. Only 33% of people with gout were taking urate-lowering therapy (2007–2014). [[ChenXu2019]] Self-report overcalls gout: "self-report of gout or urate-lowering therapy" had 82% sensitivity but 72% specificity against crystal proof. [[Dalbeth2016]]'},
 {n:'United Kingdom',y:'2012',v:2.49,m:'GP records (CPRD)',k:'obs',
  txt:'Clinical Practice Research Datalink, 2012: prevalence 2.49% and incidence 1.77 per 1,000 person-years. Prevalence rose 63.9% from 1997 to 2012. Only 27.3% of people newly diagnosed received urate-lowering therapy within 12 months. [[Kuo2015]]'},
 {n:'High-income North America',y:'2020',p:1719.8,m:'Modelled, age-standardised',k:'mod',
  txt:'GBD 2021: 1,719.8 per 100,000, age-standardised, the highest region, up 76.6% since 1990. The model is adjusted to physician-diagnosed gout across all ages, so it sits below the US survey figure: different measure, not a contradiction. [[GBD2024Gout]]'},
 {n:'World',y:'2020',p:659.3,men:1030.8,wom:316.4,m:'Modelled, age-standardised',k:'mod',
  txt:'55.8 million people had gout in 2020, an age-standardised 659.3 per 100,000: 1,030.8 in males and 316.4 in females, a ratio of 3.26. The projection for 2050 is 95.8 million, driven by population growth and ageing rather than a higher age-standardised rate. [[GBD2024Gout]]'},
 {n:'Israel, Clalit controls',y:'',v:.56,m:'Matched controls, not a population',k:'ctl',
  txt:'No population-based Israeli gout prevalence study was found. Among 19,214 age- and sex-matched controls in a Clalit case-control study, 0.56% had a gout diagnosis. They were matched to people with ankylosing spondylitis, so this is not a population rate. [[Gonen2020]] In a Clalit cohort of 301,385 adults with repeated urate above 6.8 mg/dL (≈ 405 µmol/L), 5% were later diagnosed with gout. [[Brikman2025]]'}
];
const WH_ST=[
 {from:0,at:.12,k:'Stage A',t:'High urate, no crystals',
  txt:'Serum urate is high, but no crystals have formed and there are no symptoms. [[Dalbeth2014]] This is common: about 20% of US men and women have hyperuricaemia, against 3.9% with gout. [[ChenXu2019]] Over 15 years, gout developed in 1.1% of people with baseline urate below 6 mg/dL (360 µmol/L) and in 49% at 10 mg/dL (≈ 595 µmol/L) or more. [[Dalbeth2018ARD]] The ACR 2020 guideline conditionally recommends against urate-lowering drugs at this stage. [[FitzGerald2020]]',
  pt:'High uric acid in the blood is not gout. Many people with high uric acid never have a flare.',
  hook:'Hyperuricaemia ≠ gout. 15-year gout incidence: <b>1.1%</b> below 6 mg/dL, <b>49%</b> at ≥ 10 mg/dL. [[Dalbeth2018ARD]]'},
 {from:.25,at:.38,k:'Stage B',t:'Crystals without symptoms',
  txt:'Urate crystals have formed, shown by microscopy or advanced imaging, but there has never been a flare. [[Dalbeth2014]] Dual-energy CT found urate deposits in the feet of 6 of 25 (24%) people with urate ≥ 540 µmol/L (≈ 9.1 mg/dL) and no symptoms. [[Dalbeth2015]] On ultrasound, 25% of first MTP joints in people with high urate and no symptoms showed a double contour, against none in controls. [[Pineda2011]]',
  pt:'Tiny crystals can build up quietly in a joint for years before anything hurts.',
  hook:'<b>Double contour sign</b>: a bright line of urate crystals over the cartilage on ultrasound. G-CAN name for this stage: <b>asymptomatic MSU crystal deposition</b>. [[Pineda2011,Bursill2019ARD]]'},
 {from:.5,at:.57,k:'Stage C',t:'Flares',
  txt:'Crystal deposits with flares, now or in the past. [[Dalbeth2014]] A typical flare is a sudden, self-limiting monoarthritis of a lower-limb joint. [[Dalbeth2019NRDP]] Pain peaks in under 24 hours and settles within 14 days. [[Neogi2015]] Flares are 2.36 times as likely to start overnight as in the daytime. [[Choi2015]] In Olmsted County, 60–62% had another flare within 5 years. [[Elfishawi2020]] The crystals stay between flares: they were found in 36 of 37 previously inflamed, untreated knees. [[Pascual1991]]',
  pt:'A flare is a joint that turns hot, red, swollen and very painful within hours, then calms down over one to two weeks. The crystals are still there afterwards.',
  hook:'"Gout" is the name for clinically evident disease: a flare, chronic gouty arthritis or a tophus. [[Bursill2019ARD]] First MTP in a mono- or oligoarticular episode scores <b>2 points</b> in the 2015 criteria. [[Neogi2015]]'},
 {from:.75,at:.95,k:'Stage D',t:'Tophi and chronic arthritis',
  txt:'Advanced gout that needs specialist care: tophi, chronic gouty arthritis and bone erosions. [[Dalbeth2014]] Erosion is driven by tophus growing into bone: 96 of 98 joints with severe radiographic erosion had a tophus inside the bone, as did every CT erosion wider than 7.5 mm. [[Dalbeth2009]] At the Mayo Clinic, tophi at diagnosis fell from 14% to 3% between 1949 and 1972. [[ODuffy1975]] Keeping urate low for long enough dissolves the crystals and prevents flares and tophi. [[Dalbeth2021]]',
  pt:'After years of high uric acid, crystals can form chalky lumps called tophi and wear away bone. Lowering uric acid can shrink them.',
  hook:'Bone erosion in gout comes from <b>tophus inside bone</b>. [[Dalbeth2009]] See <a href="#t2t" data-go="t2t">Treat to target</a>.'}
];
/* first-flare joint sites: bar = sourced first-presentation % (null = not quantified in the research) */
const WH_J=[
 {id:'mtp',n:'Big toe (first MTP)',bar:59,gh:74,v:'59–74%',x:172,y:300,lx:172,ly:332,a:'middle',lab:'first MTP',
  txt:'Classic podagra at the first presentation fell from 74% (1989–1992) to 59% (2009–2010) in Olmsted County, Minnesota. [[Elfishawi2020]] In the SUGAR study of crystal-proven gout in rheumatology clinics in 16 countries, first-MTP involvement was the commonest joint pattern, 39.4% of cases. [[Taylor2015]] Why the foot: a cooler joint holds less urate in solution. In vitro, a 2 °C drop from 37 °C to 35 °C lowers solubility from 6.8 to 6.0 mg/dL. [[Martillo2014]] Lower pH, minor trauma and osteoarthritis of the joint may add to it <span class="ev hyp">Hypothesis</span> [[Roddy2011]]'},
 {id:'mid',n:'Midfoot',bar:null,v:'—',x:122,y:290,lx:122,ly:262,a:'middle',lab:'midfoot',
  txt:'Tarsal and metatarsal joints are common sites. [[Roddy2011]] The 2015 ACR/EULAR criteria give ankle or midfoot involvement 1 point in a mono- or oligoarticular episode without the first MTP. [[Neogi2015]] In SUGAR, current tenderness elsewhere in the foot or ankle favoured gout (OR 2.28). [[Taylor2015]]'},
 {id:'ank',n:'Ankle',bar:null,v:'—',x:84,y:276,lx:40,ly:258,a:'middle',lab:'ankle',
  txt:'Ankles are among the usual sites after the foot. [[Roddy2011]] Ankle involvement scores 1 point, like the midfoot. [[Neogi2015]] EULAR lists monoarticular foot or ankle involvement, especially the first MTP, among the features that suggest gout. [[Richette2020]]'},
 {id:'knee',n:'Knee',bar:null,v:'—',x:78,y:146,lx:40,ly:150,a:'end',lab:'knee',
  txt:'Knees are a common site. [[Roddy2011]] Crystals stay in the knee between flares: 36 of 37 previously inflamed knees (97%) of never-treated people with gout still held them. [[Pascual1991]] On ultrasound, 17% of people with high urate and no symptoms had a double contour on the femoral cartilage, against none of the controls. [[Pineda2011]] Knee and wrist are also typical sites of CPP crystal arthritis (pseudogout), which is why a hot knee needs fluid microscopy. [[Abhishek2023,Rosenthal2016]]'},
 {id:'wrist',n:'Wrist',bar:null,v:'—',x:290,y:224,lx:298,ly:212,a:'start',lab:'wrist',
  txt:'Wrists are among the joints gout can reach. [[Roddy2011,Neogi2015]] In 798 hand and wrist joints imaged by CT, 96 of 98 joints with severe radiographic erosion held a tophus inside the bone. [[Dalbeth2009]] Wrist and knee are also typical sites of CPP crystal arthritis. [[Abhishek2023,Rosenthal2016]]'},
 {id:'fing',n:'Fingers',bar:null,v:'—',x:312,y:284,lx:312,ly:322,a:'middle',lab:'fingers',
  txt:'MCP and finger joints can be involved. [[Roddy2011]] Tophi form in finger pads. [[Neogi2015]] Women with gout have less podagra and more involvement of other joints than men. [[DirkenHeukensfeldt2010]] In a polyarticular pattern, foot involvement is not specific for gout, because rheumatoid arthritis does it too. [[Neogi2015]]'},
 {id:'olec',n:'Elbow (olecranon bursa)',bar:null,v:'tophi',x:228,y:146,lx:222,ly:176,a:'end',lab:'olecranon',
  txt:'The bursa over the point of the elbow is a typical place for tophi. [[Neogi2015]] Bursae count from the start: the entry criterion of the 2015 criteria is at least one episode of swelling, pain or tenderness in a peripheral joint or bursa. [[Neogi2015]]'},
 {id:'ear',n:'Ear (helix)',bar:null,v:'tophi',x:331,y:62,lx:300,ly:24,a:'middle',lab:'ear helix',
  txt:'A tophus is a chalk-like nodule under thin skin, often with small vessels over it, in typical places such as the ears. A clinical tophus scores 4 points in the 2015 criteria. [[Neogi2015]] In 1797 Wollaston showed urate in a tophus from his own ear. [[Nuki2006]]'}
];
inits.what=()=>{
  /* ---------- 1. population bars ---------- */
  const ps=$('#whPop');let sex='all',sel=3;
  const tgt=r=>{const k=sex==='all'?(r.p!=null?'p':'v'):sex;const val=r[k]!=null?r[k]:(r.p!=null?r.p:r.v);return (r.p!=null)?val/1000:val};
  const split=r=>r.men!=null;
  let cur=WH_POP.map(r=>tgt(r));
  const fmt=(r,v)=>r.p!=null?`${(v*1000).toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})} per 100,000 (${v.toFixed(2)}%)`:`${v<1?v.toFixed(2):(+v.toFixed(2)).toString()}%`;
  function drawPop(){
    const N=vb(ps,'720 404','400 562');
    const X0=N?14:318,X1=N?330:690,MX=16,top=N?34:40,RH=N?62:42;
    const xs=v=>X0+(X1-X0)*clamp(v/MX,0,1);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${N?14:16}" y="${N?20:24}" class="t-lbl">Gout prevalence, % of people${sex==='all'?'':sex==='men'?' · men':' · women'}</text>`;
    const axY=top+WH_POP.length*RH+(N?2:2);
    [0,4,8,12,16].forEach(v=>{const x=xs(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${top-4}" y2="${axY}" class="grid"/><text x="${f1(x)}" y="${axY+14}" class="t-xs t-mid">${v}%</text>`});
    s+=`<line x1="${X0}" x2="${X1}" y1="${axY}" y2="${axY}" class="axis"/>`;
    WH_POP.forEach((r,i)=>{const y0=top+i*RH,v=cur[i],on=i===sel,dim=sex!=='all'&&!split(r);
      const col=r.k==='ctl'?'var(--muted)':'var(--terra)';
      s+=`<g class="clk" data-r="${i}" tabindex="0" role="button" aria-label="${r.n}${r.y?', '+r.y:''}: ${fmt(r,tgt(r))}, ${r.m}">`;
      s+=`<rect class="fr" x="${N?4:6}" y="${y0}" width="${N?392:708}" height="${RH-4}" rx="8" style="fill:${on?'var(--panel-2)':'transparent'};stroke:${on?'var(--line)':'none'}"/>`;
      const by=N?y0+36:y0+8,bh=N?14:20;
      s+=`<text x="${N?14:16}" y="${y0+(N?15:17)}" class="t-lbl">${r.n} <tspan class="t-xs">${r.y}</tspan></text>`;
      s+=`<text x="${N?14:16}" y="${y0+(N?29:31)}" class="t-xs" style="fill:${col}">${r.m}${dim?' · no split by sex':''}</text>`;
      const w=Math.max(0,xs(v)-X0);
      if(r.k==='mod')s+=`<rect x="${X0}" y="${by}" width="${f1(w)}" height="${bh}" rx="4" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.5;stroke-dasharray:4 2;opacity:${dim?.35:1}"/>`;
      else s+=`<rect x="${X0}" y="${by}" width="${f1(w)}" height="${bh}" rx="4" style="fill:${col};opacity:${dim?.3:(r.k==='ctl'?.6:.88)}"/>`;
      s+=`<text x="${f1(X0+w+6)}" y="${by+bh/2+4}" class="t-sm" style="fill:var(--ink);font-weight:600;opacity:${dim?.5:1}">${fmt(r,v)}</text>`;
      s+='</g>'});
    ps.innerHTML=s;
  }
  function popNote(){const r=WH_POP[sel],v=tgt(r);
    $('#whPopNote').innerHTML=`<span class="kicker">${r.m}${r.y?' · '+r.y:''}</span><h4>${r.n}</h4><span class="big">${fmt(r,v)}</span>${sex!=='all'&&!split(r)?'<p><span class="tag">This source gives no figure by sex; the bar shows everyone.</span></p>':''}<p>${r.txt}</p>`+
      `<div class="pt"><b>In plain words</b>Gout is common, and it is not spread evenly. Men get it about three times as often as women, and some peoples, such as Pasifika and Māori in New Zealand, have much higher rates. [[GBD2024Gout,TeKaru2021]]</div>`}
  let stopPop=null;
  function retarget(){const from=cur.slice(),to=WH_POP.map(tgt);if(stopPop)stopPop();
    stopPop=animate(700,p=>{cur=from.map((f,i)=>lerp(f,to[i],ease(p)));drawPop()},()=>{stopPop=null})}
  $('#whSex').innerHTML=[['all','Everyone'],['men','Men'],['wom','Women']].map(([k,l])=>`<button class="btn" data-sx="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  $('#whSex').addEventListener('click',e=>{const b=e.target.closest('[data-sx]');if(!b)return;sex=b.dataset.sx;
    $$('[data-sx]',$('#whSex')).forEach(x=>x.setAttribute('aria-pressed',x===b));retarget();popNote()});
  const pickRow=g=>{sel=+g.dataset.r;drawPop();popNote();const n=$(`[data-r="${sel}"]`,ps);n&&n.focus({preventScroll:true})};
  ps.addEventListener('click',e=>{const g=e.target.closest('[data-r]');if(g)pickRow(g)});
  ps.addEventListener('keydown',e=>{const g=e.target.closest('[data-r]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pickRow(g)}});
  drawPop();popNote();
  redraws.what=(prev=>()=>{prev&&prev();drawPop();drawBody()})(redraws.what);

  /* ---------- 2. the four stages ---------- */
  const svg=$('#whSvg'),rg=$('#whT');let woman=false;
  const R=rng(11),FL=[];
  while(FL.length<40){const x=90+R()*230,y=64+R()*164;const inE=Math.pow((x-205)/116,2)+Math.pow((y-145)/82,2)<1;
    const inBone=(y>96&&y<194)&&(x<203||x>240);if(inE&&!inBone)FL.push([x,y,R()*6.28])}
  const R2=rng(29),NB=Array.from({length:24},(_,i)=>({s:(i>>1)/12+R2()*.04,side:i%2,a:R2()*50-25}));
  const SPK=[[.57,.035,1],[.655,.025,.75],[.715,.022,.8],[.79,.02,.85],[.84,.02,.9],[.885,.018,.95],[.93,.018,.9],[.97,.016,1]];
  const sym=u=>Math.min(1,Math.max(0,...SPK.map(([c,w,h])=>h*Math.exp(-Math.pow((u-c)/w,2))))+.3*ramp(u,.78,.95));
  const SEXD={m:{mean:6,hy:7,hyu:416,mu:357,lab:'man'},w:{mean:4.8,hy:5.7,hyu:339,mu:285,lab:'woman'}};
  const qpt=(a,c,b,s)=>(1-s)*(1-s)*a+2*(1-s)*s*c+s*s*b;
  function joint(t){
    const g=ease(ramp(t,.76,.9)),e=ramp(t,.82,.95),fl=sym(t),oB=ramp(t,.25,.38);
    let s='';
    /* soft tissue with a tophus bulge */
    s+=`<path d="M28 30 H262 Q300 ${f1(30-26*g)} 338 30 H372 Q400 30 400 58 V234 Q400 262 372 262 H28 Q0 262 0 234 V58 Q0 30 28 30 Z" style="fill:var(--cyto);stroke:var(--memb);stroke-width:1.5"/>`;
    s+=`<rect x="24" y="238" width="352" height="14" rx="7" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1;opacity:.7"/><text x="30" y="275" class="t-xs">capillary</text>`;
    /* inflammation glow */
    if(fl>.02)s+=`<ellipse cx="205" cy="145" rx="${f1(132+14*fl)}" ry="${f1(96+12*fl)}" style="fill:var(--terra);opacity:${f1(.28*fl)}"/>`;
    /* capsule and joint fluid */
    s+=`<ellipse cx="205" cy="145" rx="${f1(118+10*fl)}" ry="${f1(84+8*fl)}" style="fill:var(--panel);stroke:${fl>.3?'var(--terra)':'var(--memb)'};stroke-width:2.5"/>`;
    /* bones and cartilage */
    s+=`<path d="M0 100 H150 Q196 100 200 145 Q196 190 150 190 H0 Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<path d="M400 105 H254 Q234 145 254 185 H400 Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
    const cw=f1(lerp(7,3,e));
    s+=`<path d="M154 103 Q195 103 198 145 Q195 187 154 187" style="fill:none;stroke:var(--tub-b);stroke-width:${cw};opacity:.9"/><path d="M256 108 Q238 145 256 182" style="fill:none;stroke:var(--tub-b);stroke-width:${cw};opacity:.9"/>`;
    s+=`<text x="60" y="150" class="t-xs t-mid">metatarsal</text><text x="340" y="150" class="t-xs t-mid">phalanx</text>`;
    /* stage A: dissolved urate in the fluid */
    const nA=Math.round(lerp(8,FL.length,ramp(t,0,.18)));
    for(let i=0;i<nA;i++){const [x,y,ph]=FL[i];s+=`<circle cx="${f1(x+2*Math.sin(t*60+ph))}" cy="${f1(y+2*Math.cos(t*50+ph))}" r="2.4" style="fill:var(--gold);opacity:.85"/>`}
    /* stage B: needles on the cartilage, the double contour */
    const nB=Math.round(14*oB+10*ramp(t,.76,.9));
    NB.slice(0,nB).forEach(c=>{const s0=clamp(c.s);let x,y;
      if(!c.side){if(s0<.5){const q=s0*2;x=qpt(154,195,198,q);y=qpt(103,103,145,q)}else{const q=(1-s0)*2;x=qpt(154,195,198,q);y=290-qpt(103,103,145,q)}x+=5}
      else{x=qpt(256,238,256,s0)-6;y=qpt(108,145,182,s0)}
      s+=needle(x,y,11,90+c.a,1)});
    if(oB>0)s+=`<path d="M158 98 Q203 98 206 145 Q203 192 158 192" style="fill:none;stroke:var(--xtal);stroke-width:2;opacity:${f1(oB*.9)}"/>`;
    /* stage C: neutrophils pour in from the capillary */
    const nN=Math.round(7*fl);
    for(let k=0;k<nN;k++){const tx=[214,226,220,212,230,206,222][k],ty=[70,84,206,218,196,80,226][k],sx=60+k*44;
      const m=ease(clamp(fl*1.4));s+=neutro(lerp(sx,tx,m),lerp(244,ty,m),9,clamp(fl*1.6))}
    /* stage D: tophus and erosion */
    if(g>0){s+=`<circle cx="300" cy="52" r="${f1(27*g)}" style="fill:var(--panel);stroke:var(--xtal);stroke-width:1.6"/>`;
      for(let k=0;k<9;k++){const a=k*.7,rr=16*g*((k%3)/3+.25);s+=needle(300+Math.cos(a)*rr,52+Math.sin(a)*rr,7*g+1,k*40,g)}}
    if(e>0){s+=`<circle cx="176" cy="111" r="${f1(14*e)}" style="fill:var(--panel);stroke:var(--xtal);stroke-width:1.4"/>`;
      for(let k=0;k<4;k++)s+=needle(170+k*4,108+(k%2)*6,6*e+1,30+k*35,e)}
    /* labels */
    const lab=(x,y,txt,c='var(--muted)',a='')=>`<text x="${x}" y="${y}" class="t-xs${a}" style="fill:${c};font-weight:700">${txt}</text>`;
    if(t<.25)s+=lab(205,52,'urate dissolved in joint fluid','var(--gold)',' t-mid');
    if(oB>.2&&t<.5)s+=lab(214,220,'double contour','var(--xtal)');
    if(fl>.35)s+=lab(205,20,'hot · red · swollen','var(--terra)',' t-mid');
    if(g>.3)s+=`<path d="M300 ${f1(52-27*g)} V14" style="stroke:var(--xtal);stroke-width:1"/>`+lab(306,16,'tophus','var(--xtal)');
    if(e>.3)s+=`<path d="M80 90 L164 106" style="stroke:var(--xtal);stroke-width:1;opacity:${f1(e)}"/>`+lab(56,94,'erosion','var(--xtal)',' t-mid');
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const L=N
      ? {jx:0,jy:14,bx:8,by:300,bw:92,bg:97,bh:56,sx0:20,sx1:380,sy:394,sh:62,gx0:20,gx1:380,gy:520,fx:20,fy:608}
      : {jx:20,jy:74,bx:24,by:14,bw:166,bg:170,bh:44,sx0:458,sx1:700,sy:100,sh:72,gx0:458,gx1:700,gy:252,fx:458,fy:322};
    const p=phaseOf(WH_ST,t),D=woman?SEXD.w:SEXD.m;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<g transform="translate(${L.jx} ${L.jy})">${joint(t)}</g>`;
    /* stage band */
    const TT=N?[['High urate,','no crystals'],['Silent','crystals'],['Flares',''],['Tophi,','chronic']]:[['High urate, no crystals'],['Crystals, no symptoms'],['Flares'],['Tophi and erosions']];
    WH_ST.forEach((S,i)=>{const x=L.bx+i*L.bg,on=i===p,past=i<p;
      s+=`<rect x="${x}" y="${L.by}" width="${L.bw}" height="${L.bh}" rx="9" style="fill:${on?'var(--terra-soft)':past?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--terra)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${x+10}" y="${L.by+(N?22:29)}" class="t-big" style="fill:${on?'var(--terra)':'var(--ink)'}">${'ABCD'[i]}</text>`;
      if(N)TT[i].forEach((l,j)=>{if(l)s+=`<text x="${x+10}" y="${L.by+38+j*11}" class="t-xs">${l}</text>`});
      else s+=`<text x="${x+30}" y="${L.by+27}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">${TT[i][0]}</text>`});
    const bx1=L.bx+3*L.bg+L.bw,px=lerp(L.bx,bx1,t);
    s+=`<line x1="${L.bx}" x2="${bx1}" y1="${L.by+L.bh+7}" y2="${L.by+L.bh+7}" class="axis"/><path d="M${f1(px)} ${L.by+L.bh+2}l5 8h-10z" style="fill:var(--terra)"/>`;
    /* symptom track */
    const X=u=>lerp(L.sx0,L.sx1,u),Y=v=>L.sy+L.sh-v*L.sh*.9;
    s+=`<text x="${L.sx0}" y="${L.sy-8}" class="t-sm">Pain and swelling · schematic</text>`;
    s+=`<line x1="${L.sx0}" x2="${L.sx1}" y1="${L.sy+L.sh}" y2="${L.sy+L.sh}" class="axis"/>`;
    [.25,.5,.75].forEach(u=>s+=`<line x1="${f1(X(u))}" x2="${f1(X(u))}" y1="${L.sy}" y2="${L.sy+L.sh}" class="grid"/>`);
    ['A','B','C','D'].forEach((l,i)=>s+=`<text x="${f1(X(i*.25+.125))}" y="${L.sy+L.sh+13}" class="t-xs t-mid">${l}</text>`);
    let d='';const n=Math.max(1,Math.round(t*240));for(let i=0;i<=n;i++){const u=t*i/n;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(sym(u)))}
    s+=`<path d="${d}L${f1(X(t))} ${L.sy+L.sh}L${L.sx0} ${L.sy+L.sh}Z" style="fill:var(--terra);opacity:.14"/><path d="${d}" style="fill:none;stroke:var(--terra);stroke-width:2.2;stroke-linejoin:round"/>`;
    s+=`<circle cx="${f1(X(t))}" cy="${f1(Y(sym(t)))}" r="4" style="fill:var(--terra)"/>`;
    if(t<.5)s+=`<text x="${f1(X(.25))}" y="${f1(L.sy+L.sh-10)}" class="t-xs t-mid">no symptoms</text>`;
    /* serum urate scale */
    const G=v=>lerp(L.gx0,L.gx1,v/10),lvl=lerp(D.mean,8.6,ease(ramp(t,0,.12)));
    s+=`<text x="${L.gx0}" y="${L.gy-26}" class="t-sm">Serum urate, mg/dL · ${D.lab}</text>`;
    s+=`<rect x="${L.gx0}" y="${L.gy}" width="${L.gx1-L.gx0}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${L.gx0}" y="${L.gy}" width="${f1(G(lvl)-L.gx0)}" height="12" rx="6" style="fill:var(--gold)"/>`;
    const sx=G(6.8);s+=`<line x1="${f1(sx)}" x2="${f1(sx)}" y1="${L.gy-8}" y2="${L.gy+20}" style="stroke:var(--xtal);stroke-width:2;stroke-dasharray:3 2"/><text x="${f1(sx)}" y="${L.gy-11}" class="t-xs t-mid" style="fill:var(--xtal);font-weight:700">6.8 saturation</text>`;
    const mx=G(D.mean);s+=`<path d="M${f1(mx)} ${L.gy+14}l5 8h-10z" style="fill:var(--ink)"/><text x="${f1(mx)}" y="${L.gy+33}" class="t-xs t-mid">US mean ${D.mean.toFixed(1)}</text>`;
    [0,2,4,8,10].filter(v=>Math.abs(v-D.mean)>1.1).forEach(v=>s+=`<text x="${f1(G(v))}" y="${L.gy+33}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${L.gx1}" y="${L.gy-26}" class="t-xs t-end" style="fill:var(--gold);font-weight:700">${f1(lvl)}</text>`;
    /* how it shows */
    const F=[['Blood test: urate above the limit','Imaging: no crystals yet'],['Ultrasound: double contour','Dual-energy CT: urate, no pain'],['Joint fluid: needle crystals','Flares, then quiet gaps'],['Tophi under the skin','Erosions on X-ray or CT']][p];
    s+=`<text x="${L.fx}" y="${L.fy}" class="t-sm" style="fill:var(--terra);font-weight:600">HOW STAGE ${'ABCD'[p]} SHOWS</text>`;
    F.forEach((l,j)=>s+=`<text x="${L.fx}" y="${L.fy+20+j*18}" class="t-lbl">${l}</text>`);
    svg.innerHTML=s;
    setSt(p);$('#whNote').innerHTML=noteHTML(WH_ST[p]);
  }
  function readout(){const D=woman?SEXD.w:SEXD.m;
    $('#whRead').innerHTML=woman
      ?`<span>Women: hyperuricaemia above <b>5.7 mg/dL (339 µmol/L)</b>; US mean urate <b>4.8 mg/dL (285 µmol/L)</b>. [[ChenXu2019]]</span><span>Gout comes later: mean age <b>70</b> vs 58 in men in US claims data, with more diuretic use. [[Harrold2006]]</span><span>After menopause the risk rises (RR 1.26 vs premenopausal); menopause before 45 carried RR 1.62. [[Hak2010]]</span>`
      :`<span>Men: hyperuricaemia above <b>7.0 mg/dL (416 µmol/L)</b>; US mean urate <b>6.0 mg/dL (357 µmol/L)</b>. [[ChenXu2019]]</span><span>Mean age at gout <b>58</b> in US claims data. [[Harrold2006]] 73% of new cases in Olmsted County were men. [[Elfishawi2020]]</span><span>Urate saturation ≈ 6.8 mg/dL (405 µmol/L) at 37 °C. [[Martillo2014]]</span>`;
    void D}
  const stop=playWire(rg,$('#whPlay'),draw,18000,'Replay','what');
  const setSt=stepWire($('#whSteps'),WH_ST,rg,draw,stop);
  const tog=v=>{woman=v;$('#whMen').setAttribute('aria-pressed',!v);$('#whWomen').setAttribute('aria-pressed',v);readout();draw(+rg.value)};
  $('#whMen').onclick=()=>tog(false);$('#whWomen').onclick=()=>tog(true);
  readout();draw(+rg.value);

  /* ---------- 3. where flares strike ---------- */
  const body=$('#whBody');let site='mtp';
  function drawBody(){
    const S=WH_J.find(j=>j.id===site);let s='';
    const sil='stroke:var(--panel-2);stroke-linecap:round;fill:none';
    /* leg, side view, big toe forward */
    s+=`<g style="${sil}"><path d="M70 8 L78 140" style="stroke-width:34"/><path d="M78 150 L84 266" style="stroke-width:24"/><path d="M250 26 L236 140" style="stroke-width:24"/><path d="M238 148 L290 220" style="stroke-width:18"/></g>`;
    s+=`<path d="M70 258 Q54 280 60 302 Q63 315 82 315 L188 318 Q206 316 204 305 Q202 296 186 294 L150 289 Q112 280 98 258 Z" style="fill:var(--panel-2)"/>`;
    s+=`<circle cx="78" cy="145" r="15" style="fill:var(--panel-2)"/>`;
    /* hand */
    s+=`<g transform="rotate(-18 304 252)"><rect x="290" y="232" width="30" height="34" rx="9" style="fill:var(--panel-2)"/>`;
    [292,299,306,313].forEach((x,i)=>s+=`<path d="M${x+2} 262 V${300-(i===0||i===3?6:0)}" style="stroke:var(--panel-2);stroke-width:6;stroke-linecap:round"/>`);
    s+=`<path d="M290 246 L278 266" style="stroke:var(--panel-2);stroke-width:7;stroke-linecap:round"/></g>`;
    /* ear */
    s+=`<path d="M314 36 Q342 38 340 70 Q338 98 316 102 Q304 100 306 88 Q316 82 314 68 Q308 58 302 62 Q298 42 314 36 Z" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<path d="M318 54 Q328 62 324 80" style="fill:none;stroke:var(--line);stroke-width:1.5"/>`;
    /* markers */
    WH_J.forEach(j=>{const on=j.id===site,toph=j.id==='olec'||j.id==='ear';
      s+=`<g class="clk" data-js="${j.id}">`;
      if(on){s+=`<circle cx="${j.x}" cy="${j.y}" r="16" style="fill:var(--terra);opacity:.28"/>`;
        if(toph||j.id==='fing'){s+=`<circle cx="${j.x}" cy="${j.y}" r="7" style="fill:var(--panel);stroke:var(--xtal);stroke-width:1.5"/>`;for(let k=0;k<3;k++)s+=needle(j.x-3+k*3,j.y-1+(k%2)*2,5,30+k*50)}}
      s+=`<circle cx="${j.x}" cy="${j.y}" r="${on?6:4.5}" style="fill:${on?'var(--terra)':'var(--panel)'};stroke:var(--terra);stroke-width:2"/>`;
      s+=`<circle cx="${j.x}" cy="${j.y}" r="14" style="fill:transparent"/>`;
      s+=`<text x="${j.lx}" y="${j.ly}" class="t-xs" style="text-anchor:${j.a};fill:${on?'var(--terra)':'var(--muted)'};font-weight:${on?700:500}">${j.lab}</text></g>`});
    body.innerHTML=s;
    $('#whSiteNote').innerHTML=`<h4>${S.n} ${S.bar!=null?`<span class="big" style="font-size:22px">${S.v}</span>`:''}</h4><p>${S.txt}</p>`;
    $$('.wh-site',$('#whSites')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.site===site));
  }
  $('#whSites').innerHTML=WH_J.map(j=>`<button class="wh-site" data-site="${j.id}" aria-pressed="false"><span>${j.n}</span>${j.bar!=null?`<span class="tr"><i class="gh" data-w="${j.gh}"></i><i data-w="${j.bar}"></i></span>`:`<span class="nq">${j.v==='tophi'?'tophus site':'no sourced first-flare %'}</span>`}<span class="v">${j.bar!=null?j.v:''}</span></button>`).join('')+
    `<p class="stage-cap">Big toe bar: 59% (solid) and 74% (dashed) of first presentations, Olmsted County 2009–2010 and 1989–1992. [[Elfishawi2020]]</p>`+
    `<div class="pt"><b>In plain words</b>Gout usually starts in one joint of the foot or leg, most often the big toe. Later it can reach the hands, and lumps of crystals (tophi) can form at the elbow and ear. [[Dalbeth2019NRDP,Roddy2011,Neogi2015]]</div>`;
  $('#whSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;drawBody()});
  body.addEventListener('click',e=>{const g=e.target.closest('[data-js]');if(g){site=g.dataset.js;drawBody()}});
  drawBody();
  setTimeout(()=>$$('#whSites .tr i').forEach(i=>i.style.width=i.dataset.w+'%'),60);

  /* ---------- 4. key numbers ---------- */
  $('#whCards').innerHTML=`
   <div class="card"><span class="kicker">Worldwide, 2020</span><span class="big">55.8 million</span><p>people with gout, an age-standardised 659.3 per 100,000, up 22.5% since 1990. Projected: 95.8 million in 2050. [[GBD2024Gout]]</p></div>
   <div class="card"><span class="kicker">Men to women</span><span class="big">3.26 : 1</span><p>age-standardised prevalence ratio. [[GBD2024Gout]] Women get gout later, with more hypertension, kidney disease and diuretic use, and less podagra. [[DirkenHeukensfeldt2010]] Hippocrates already wrote that a woman does not get gout until her menses stop. [[Nuki2006]]</p></div>
   <div class="card"><span class="kicker">High urate vs gout</span><span class="big">20% vs 3.9%</span><p>of US adults have hyperuricaemia vs gout. [[ChenXu2019]] Only about half of people with urate ≥ 10 mg/dL develop gout over 15 years. [[Dalbeth2018ARD]]</p></div>
   <div class="card"><span class="kicker">After a first flare</span><span class="big">60–62%</span><p>had another flare within 5 years in Olmsted County; high urate (HR 1.59) and kidney disease (HR 1.34) predicted it. [[Elfishawi2020]] In UK GP records only 36.9% had a recorded flare over a mean 3.8 years. [[Rothenbacher2011]] The gap reflects how flares were counted: chart review vs GP coding.</p></div>
   <div class="card"><span class="kicker">Disability</span><span class="big">34.3%</span><p>of gout's years lived with disability worldwide were attributed to high body-mass index, and 11.8% to kidney dysfunction (GBD 2021). [[GBD2024Gout]]</p></div>
   <div class="card"><span class="kicker">The treatment gap</span><span class="big">1 in 3</span><p>US adults with gout took urate-lowering therapy (33%, 2007–2014). [[ChenXu2019]] In the UK, 27.3% started it within a year of diagnosis. [[Kuo2015]] In Israel's Maccabi fund, 17% were adherent to allopurinol. [[ZandmanGoddard2013]]</p></div>
   <div class="card"><span class="kicker">Israel</span><span class="big">13% in 10 years</span><p>developed gout in the highest urate quartile (mean 8.62 mg/dL, ≈ 513 µmol/L) of a Clalit cohort of 301,385 adults, a steady 1.3% a year. Overall, 5% of the cohort was diagnosed. [[Brikman2025]]</p></div>
   <div class="card"><span class="kicker">Words matter</span><ul><li>Say <b>gout flare</b>, not "attack". The G-CAN consensus also advises against "chronic gout". [[Bursill2019]]</li><li>Calling gout "urate crystal arthritis" made the public see it as less under personal control and better suited to long-term medical treatment. <span class="ev early">Early evidence</span> [[Coleshill2021]]</li></ul><div class="hook"><b>Exam hook</b>Staging A–D is from Dalbeth &amp; Stamp 2014: hyperuricaemia → silent crystals → flares → advanced gout. [[Dalbeth2014]]</div></div>`;
};
