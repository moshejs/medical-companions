/* =============== 3.3 Treating intracerebral haemorrhage =============== */
/* Main scrubber: the INTERACT3 bundle over the first hour. Then the ICH score, BP trials, surgery trials and PRESTIGE-AF. */
const IC_STEPS=[
 {from:0,at:.08,k:'Step 1 · arrival',t:'Arrival: the clock starts',
  txt:`Speed matters because a bleed can keep growing, predominantly within the first 3 hours of onset [[Sandset2026]]. AHA/ASA 2022 includes a baseline severity measure at first evaluation (Class 1, B-NR) [[Greenberg2022]]. INTERACT3 tested a bundle of four targets in 121 hospitals and 7036 people within 6 hours of onset [[Ma2023]].`,
  pt:`Bleeds often keep growing in the first hours, which is why speed matters even without a clot-busting drug [[Brott1997]].`},
 {from:.18,at:.32,k:'Step 2 · pressure',t:'Systolic pressure: target under 140',
  txt:`The INTERACT3 bundle aims for systolic pressure under 140 mm Hg [[Ma2023]]. AHA/ASA 2022 says start within 2 hours and reach target within 1 hour (2a, C-LD), with smooth sustained control (2a, B-NR) [[Greenberg2022]].`,
  hook:`J-shape in pooled data: odds of poor outcome were lower for 1-hour reductions up to 60 mm Hg and significantly higher above 70 mm Hg [[Wang2022]].`},
 {from:.42,at:.52,k:'Step 3 · reversal',t:'Warfarin: INR under 1.5 within 1 hour',
  txt:`For people on warfarin, the bundle reverses to INR under 1.5 within 1 hour [[Ma2023]]. AHA/ASA 2022 prefers four-factor PCC over FFP with INR 2.0 or more (1, B-R) [[Greenberg2022]]. The table below covers other drugs.`},
 {from:.62,at:.72,k:'Step 4 · glucose and temperature',t:'Glucose and fever are managed too',
  txt:`Bundle glucose target: 6.1 to 7.8 mmol/L without diabetes and 7.8 to 10.0 with diabetes. Temperature: 37.5 C or less [[Ma2023]]. ESO/EANS 2025 is weak against temperature and glucose management as single measures outside bundles, and weak for care bundles [[Steiner2025]].`},
 {from:.86,at:.95,k:'Step 5 · result',t:'Together, the bundle shifted outcomes',
  txt:`Poor functional outcome: common OR 0.86 (0.76 to 0.97; p=0.015). Serious adverse events 16.0% versus 20.1% [[Ma2023]]. This was a stepped wedge cluster trial, so hospitals moved from usual care to the bundle over time.`,
  pt:`Several simple things, done early and together, shifted outcomes across 7036 people [[Ma2023]].`,
  hook:`INTERACT3 bundle: SBP under 140, glucose control, temperature 37.5 C or less, warfarin reversal to INR under 1.5 within 1 hour [[Ma2023]].`}];
const IC_ITEMS=[
 {k:'gcs',l:'Glasgow Coma Scale',o:[[0,'13 to 15','0 points'],[1,'5 to 12','1 point'],[2,'3 to 4','2 points']]},
 {k:'age',l:'Age',o:[[0,'Under 80','0 points'],[1,'80 or over','1 point']]},
 {k:'inf',l:'Origin of the bleed',o:[[0,'Above the tentorium','0 points'],[1,'Infratentorial','1 point']]},
 {k:'vol',l:'Volume',o:[[0,'Under 30 cm³','0 points'],[1,'30 cm³ or more','1 point']]},
 {k:'ivh',l:'Blood in the ventricles (IVH)',o:[[0,'No','0 points'],[1,'Yes','1 point']]}];
const IC_MORT=[0,13,26,72,97,100];
const IC_MORT_N=[`Score 0: all 26 people in the derivation cohort survived 30 days [[Hemphill2001]].`,`Score 1: 13% died by 30 days, as quoted by a secondary source [[Alkhars2026]].`,`Score 2: 26% died by 30 days, as quoted by a secondary source [[Alkhars2026]].`,`Score 3: 72% died by 30 days, as quoted by a secondary source [[Alkhars2026]].`,`Score 4: 97% died by 30 days, as quoted by a secondary source [[Alkhars2026]].`,`Score 5: all 6 people in the derivation cohort died by 30 days [[Hemphill2001]].`,`Score 6 is possible by addition, but the derivation abstract reports no outcome for it [[Hemphill2001]].`];
const IC_SC_TXT={k:'Population figure, 30 days',cap:`This is what happened to a group in one 2001 cohort, in a small sample. It should not be the sole basis for forecasting one person's prognosis or for limiting care (Class 3: No Benefit, B-NR) [[Greenberg2022]].`,
 hook:`ICH score items: GCS (0 to 2), age 80 or over, infratentorial, volume 30 cm³ or more, IVH [[Hemphill2001]].`,
 abc:`ABC/2: A is the greatest diameter on CT, B the diameter at 90 degrees to A, C the number of slices with haemorrhage times slice thickness [[Kothari1996]]. Volume of 60 cm³ or more with GCS 8 or less predicted 91% 30-day mortality, under 30 cm³ with GCS 9 or more predicted 19% [[Broderick1993]].`};
const IC_BP=[
 {id:'i2',n:'INTERACT2',arms:[{l:'Intensive',a:100,b:140,txt:'under 140',open:1},{l:'Comparison',a:100,b:180,txt:'under 180',open:1}],
  out:{t:'Death or major disability',a:['Intensive','52.0'],b:['Comparison','55.6']},
  k:'2839 people, within 6 hours',txt:`Target SBP under 140 within 1 hour versus under 180. Death or major disability 52.0% versus 55.6% (OR 0.87, 0.75 to 1.01; P=0.06). Ordinal mRS OR 0.87 (0.77 to 1.00; P=0.04). Mortality 11.9% versus 12.0% [[Anderson2013]].`,
  hook:`Primary outcome narrowly missed, ordinal shift significant [[Anderson2013]].`},
 {id:'a2',n:'ATACH-2',arms:[{l:'Intensive',a:110,b:139,txt:'110 to 139'},{l:'Comparison',a:140,b:179,txt:'140 to 179'}],
  out:{t:'Death or disability',a:['Intensive',38.7],b:['Comparison',37.7]},
  k:'1000 people, nicardipine within 4.5 hours',txt:`Volume under 60 cm³, GCS 5 or more. Death or disability 38.7% versus 37.7% (RR 1.04, 0.85 to 1.27). Stopped for futility. Renal adverse events 9.0% versus 4.0% (P=0.002) [[Qureshi2016]].`,
  hook:`Going lower, to 110 to 139, gave no gain and more renal events [[Qureshi2016]].`},
 {id:'p',n:'Pooled, and the J-shape',arms:[{l:'Mean achieved',a:147,b:147,txt:'147 mean'}],curve:1,
  k:'INTERACT2 plus ATACH-2, 3829 people',txt:`Mean early reduction 29 mm Hg, mean achieved SBP 147. Achieved SBP was continuously associated with function, per 10 mm Hg as reported aOR 0.90 (0.87 to 0.94) [[Moullaali2019]]. For 1-hour reductions, adjusted odds of poor outcome were lower up to 60 mm Hg, with an inflection between 32 and 46 mm Hg, and significantly higher above 70 mm Hg [[Wang2022]]. INTERACT pooled data (11 312 people), as quoted by ESO: intensive lowering OR 0.85 (0.78 to 0.91) [[Sandset2026]].`},
 {id:'i3',n:'INTERACT3 bundle',arms:[{l:'Bundle',a:100,b:140,txt:'under 140',open:1}],
  out:{t:'Serious adverse events',a:['Bundle','16.0'],b:['Usual care',20.1]},
  k:'121 hospitals, 7036 people, within 6 hours',txt:`Blood pressure was one of four targets. Poor functional outcome common OR 0.86 (0.76 to 0.97; p=0.015). Serious adverse events 16.0% versus 20.1% [[Ma2023]].`},
 {id:'i4',n:'INTERACT4 ambulance',arms:[{l:'Intensive',a:130,b:140,txt:'130 to 140'},{l:'Usual, on arrival',a:170,b:170,txt:'170 at arrival'},{l:'Intensive, on arrival',a:159,b:159,txt:'159 at arrival'}],forest:1,
  k:'2404 people, China, within 2 hours of onset',txt:`Median 61 minutes from onset. Target SBP 130 to 140 versus usual care in the ambulance. Overall common OR 1.00 (0.87 to 1.15). Haemorrhagic stroke, 46.5% of confirmed strokes: 0.75 (0.60 to 0.92). Ischaemic stroke: 1.30 (1.06 to 1.60) [[Li2024]]. ESO advises against routine pre-hospital lowering [[Sandset2026]].`,
  hook:`Benefit in bleeds, harm in clots: needs telling them apart before hospital [[Li2024,Sandset2026]].`}];
const IC_SU=[
 {id:'st',n:'STICH',site:'deep',m:'cran',bars:{t:'Favourable outcome',a:['Early surgery',26],b:['Initial conservative',24],unit:'%'},
  k:'1033 people, supratentorial',txt:`Early surgery versus initial conservative treatment. Favourable outcome 26% versus 24% (OR 0.89, 0.66 to 1.19) [[Mendelow2005]].`},
 {id:'s2',n:'STICH II',site:'lobar',m:'cran',bars:{t:'Unfavourable outcome',a:['Early surgery',59],b:['Initial conservative',62],unit:'%'},
  k:'601 conscious people',txt:`Superficial lobar bleeds of 10 to 100 mL with no IVH. Unfavourable outcome 59% versus 62% (absolute difference 3.7%, -4.3 to 11.6; p=0.367) [[Mendelow2013]].`},
 {id:'m3',n:'MISTIE III',site:'deep',m:'tube',bars:{t:'mRS 0 to 3 at 365 days',a:['MISTIE',45],b:['Standard care',41],unit:'%'},
  k:'506 people, 30 mL or more',txt:`Minimally invasive surgery with alteplase 1 mg every 8 h up to nine doses. mRS 0 to 3 at 365 days 45% versus 41% (adjusted difference 4%, -4 to 12; p=0.33). Death at 7 days 1% versus 4%, at 30 days 9% versus 15% [[Hanley2019]].`},
 {id:'en',n:'ENRICH',site:'lobar',m:'tube',bars:{t:'30-day death',a:['Surgery',9.3],b:['Medical care','18.0'],unit:'%'},
  k:'300 people, 30 to 80 mL, within 24 hours',txt:`Early minimally invasive removal. Utility-weighted mRS 0.458 versus 0.374 (difference 0.084; posterior probability 0.981). Lobar difference 0.127 (0.035 to 0.219). Anterior basal ganglia -0.013 (-0.147 to 0.116), and enrolment there stopped by adaptation rule. 30-day death 9.3% versus 18.0% [[Pradilla2024]].`,
  hook:`ENRICH's positive result was driven by lobar bleeds [[Pradilla2024]].`},
 {id:'sw',n:'SWITCH',site:'deep',big:1,m:'dec',bars:{t:'mRS 5 to 6 at 180 days',a:['Craniectomy',44],b:['Medical care',58],unit:'%'},
  k:'197 people, severe deep ICH, median 57 mL',txt:`Decompressive craniectomy plus best medical treatment, stopped early for funding. mRS 5 to 6 at 180 days 44% versus 58% (aRR 0.77, 0.59 to 1.01; p=0.057). Authors call this weak evidence, with survival linked to severe disability in both groups [[Beck2024]].`},
 {id:'cl',n:'CLEAR III',site:'ivh',m:'evd',bars:{t:'Case fatality',a:['Alteplase',18],b:['Placebo',29],unit:'%'},
  k:'500 people, IVH blocking the third or fourth ventricle',txt:`ICH under 30 mL. Drain plus clot-dissolving drug versus placebo. Good outcome 48% versus 45% (RR 1.06). Case fatality 18% versus 29% (HR 0.60), but mRS 5 in 17% versus 9% [[Hanley2017]].`,
  hook:`CLEAR III: more people lived, and more lived with severe disability [[Hanley2017]].`}];
const IC_SU_M={cran:'open craniotomy',tube:'narrow tube into the clot',dec:'skull flap removed, room to swell',evd:'drain in the ventricle'};
const IC_RE_N=[
 {from:0,at:.3,k:'One risk',t:'Without anticoagulation, more ischaemic stroke',txt:`First ischaemic stroke: 0.83 per 100 patient-years on a DOAC against 8.60 without. HR 0.05 (0.01 to 0.36) [[Veltkamp2025]].`},
 {from:.5,at:.9,k:'The other risk',t:'With anticoagulation, more repeat bleeding',txt:`Recurrent ICH: 5.00 per 100 patient-years on a DOAC against 0.82 without. Non-inferiority was not met (HR 10.89, 90% CI 1.95 to 60.72). Deaths 10% versus 13% [[Veltkamp2025]].`,
  pt:`Restarting a blood thinner after a bleed is a careful choice between preventing clots and risking another bleed. Trials are still settling this [[Veltkamp2025]].`}];

/* one small strip chart: trace y(u) from a start into a target band */
function icStrip(x,y,w,h,o){let s=`<text x="${f1(x)}" y="${f1(y-6)}" class="t-lbl">${o.t}</text><text x="${f1(x+w)}" y="${f1(y-6)}" class="t-sm t-end" style="fill:var(--ink)">${o.tg}</text>`;
  s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="4" style="fill:var(--field);stroke:var(--line)"/><rect x="${f1(x)}" y="${f1(y+h*o.b0)}" width="${f1(w)}" height="${f1(h*(o.b1-o.b0))}" style="fill:var(--good-soft)"/>`;
  const d=[];const M=40;for(let i=0;i<=M;i++){const u=o.u*i/M;d.push([x+w*u,y+h*(o.f(u))])}
  if(o.u>0){s+=`<path d="${ptsD(d)}" style="fill:none;stroke:${o.col};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${f1(d[M][0])}" cy="${f1(d[M][1])}" r="4" style="fill:${o.col};stroke:var(--panel);stroke-width:1.5"/>`}
  const ok=o.u>.98;s+=`<text x="${f1(x+6)}" y="${f1(y+h-5)}" class="t-xs" style="fill:${o.dim?'var(--muted)':'var(--ink)'}">${o.lb||''}</text>`;
  return s}
/* a labelled pair of horizontal bars */
function icBars(x,y,w,B,mx,o={}){const lw=o.lw==null?130:o.lw,bw=w-lw-58,bh=22;let s=`<text x="${f1(x)}" y="${f1(y)}" class="t-lbl">${B.t}</text>`;
  [B.a,B.b].forEach((a,i)=>{const yy=y+12+i*(bh+10),ww=bw*a[1]/mx*(o.u==null?1:o.u);
    s+=`<text x="${f1(x)}" y="${f1(yy+15)}" class="t-sm" style="fill:var(--ink)">${a[0]}</text><rect x="${f1(x+lw)}" y="${f1(yy)}" width="${f1(ww)}" height="${bh}" rx="3" style="fill:${i?'var(--muted)':'var(--accent)'}"/><text x="${f1(x+lw+ww+6)}" y="${f1(yy+15)}" class="t-sm" style="fill:var(--ink)">${a[1]}${B.unit||'%'}</text>`});
  return s}

inits.ich=()=>{
  /* ---------- the first hour ---------- */
  const svg=$('#icSvg'),rg=$('#icT');
  function draw(t){const N=vb(svg,'720 410','400 794');
    const L=N?{ax:[100,48,.84],clk:[50,104],bx:18,bw:364,by:[330,420,510,600],sh:52,res:[10,672,380,110]}
             :{ax:[16,62,.92],clk:[60,40],bx:290,bw:414,by:[40,118,196,274],sh:48,res:[16,350,688,52]};
    const min=60*ramp(t,.05,.82),p=phaseOf(IC_STEPS,t);let s='';
    /* clock and slice */
    s+=`<text x="${L.ax[0]+120*L.ax[2]}" y="22" class="t-lbl t-mid">First hour in hospital</text>`;
    s+=brainAxial(L.ax[0],L.ax[1]+(N?0:0),L.ax[2],{side:'L',bleed:{r:lerp(17,20,ramp(t,.05,.3)),oedema:.2}}).svg;
    if(N){s+=clock(52,110,34,min,{col:'var(--accent)',ticks:true});s+=`<text x="52" y="162" class="t-sm t-mid" style="fill:var(--ink)">${Math.round(min)} min</text>`}
    else{s+=clock(246,44,26,min,{col:'var(--accent)',ticks:true});s+=`<text x="246" y="86" class="t-sm t-mid" style="fill:var(--ink)">${Math.round(min)} min</text>`}
    /* four strips: each trace enters its band in its own step */
    const [a1,a2,a3,a4]=L.by,uB=ramp(t,.14,.42),uI=ramp(t,.42,.62),uG=ramp(t,.62,.84);
    s+=icStrip(L.bx,a1,L.bw,L.sh,{t:'Systolic pressure',tg:'target under 140 mm Hg',b0:.62,b1:1,u:uB,col:'var(--artery)',f:u=>lerp(.08,.72,ease(clamp(u/.8)))+.015*Math.sin(u*24)});
    s+=icStrip(L.bx,a2,L.bw,L.sh,{t:'INR, if on warfarin',tg:'target under 1.5 within 1 h',b0:.62,b1:1,u:uI,col:'var(--tpa)',f:u=>lerp(.1,.76,ease(clamp(u/.7)))});
    s+=icStrip(L.bx,a3,L.bw,L.sh,{t:'Glucose',tg:N?'6.1 to 7.8, or 7.8 to 10.0':'6.1 to 7.8 mmol/L, or 7.8 to 10.0 with diabetes',b0:.34,b1:.66,u:uG,col:'var(--ca)',f:u=>lerp(.1,.5,ease(clamp(u/.8)))+.012*Math.sin(u*20)});
    s+=icStrip(L.bx,a4,L.bw,L.sh,{t:'Temperature',tg:'37.5 C or less',b0:.5,b1:1,u:uG,col:'var(--pca)',f:u=>lerp(.28,.66,ease(clamp(u/.8)))});
    /* result */
    const [rx,ry,rw,rh]=L.res,ru=ramp(t,.84,.92);
    s+=`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="10" style="fill:var(--panel);stroke:${ru>0?'var(--brand)':'var(--line)'}"/>`;
    if(ru<=0)s+=`<text x="${rx+12}" y="${ry+(N?24:31)}" class="t-sm">The trial result appears at step 5</text>`;
    s+=`<g style="opacity:${f1(ru)}">`;
    if(N){s+=`<text x="${rx+12}" y="${ry+24}" class="t-lbl">INTERACT3, 7036 people</text><text x="${rx+12}" y="${ry+52}" class="t-big">0.86</text><text x="${rx+64}" y="${ry+52}" class="t-sm">common OR, poor outcome</text><text x="${rx+12}" y="${ry+80}" class="t-big">16.0%</text><text x="${rx+64}" y="${ry+80}" class="t-sm">serious adverse events,</text><text x="${rx+64}" y="${ry+94}" class="t-sm">against 20.1% usual care</text>`}
    else{s+=`<text x="${rx+12}" y="${ry+21}" class="t-lbl">INTERACT3</text><text x="${rx+12}" y="${ry+38}" class="t-sm">7036 people</text><text x="${rx+140}" y="${ry+32}" class="t-big">OR 0.86</text><text x="${rx+216}" y="${ry+32}" class="t-sm">poor functional outcome</text><text x="${rx+400}" y="${ry+32}" class="t-big">16.0%</text><text x="${rx+452}" y="${ry+25}" class="t-sm">serious adverse events,</text><text x="${rx+452}" y="${ry+40}" class="t-sm">against 20.1% usual care</text>`}
    s+='</g>';
    svg.innerHTML=s;setSt(p);$('#icNote').innerHTML=noteHTML(IC_STEPS[p])}
  const stop=playWire(rg,$('#icPlay'),draw,16000,'%t:player.replay%','ich');
  const setSt=stepWire($('#icSteps'),IC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- ICH score ---------- */
  const sc={gcs:0,age:0,inf:0,vol:0,ivh:0},abc={a:3,b:2.5,c:3};
  $('#icScore').innerHTML=IC_ITEMS.map(q=>`<div class="icgrp"><span>${q.l}</span><div class="icbar" role="group" aria-label="${q.l}">${q.o.map(o=>`<button class="btn" data-sq="${q.k}" data-sv="${o[0]}" aria-pressed="${o[0]===0}">${o[1]}: ${o[2]}</button>`).join('')}</div></div>`).join('')+
   `<details><summary class="stage-cap">Estimate volume with ABC/2</summary><div class="icsl" id="icAbc" style="margin-top:8px">${[['a','A, greatest diameter (cm)',1,10],['b','B, at 90 degrees (cm)',1,10],['c','C, depth (cm)',.5,8]].map(x=>`<label for="icA${x[0]}"><span>${x[1]}</span><input type="range" id="icA${x[0]}" data-abc="${x[0]}" min="${x[2]}" max="${x[3]}" step="0.5" value="${abc[x[0]]}"><output id="icO${x[0]}">${abc[x[0]]}</output></label>`).join('')}<p class="readout"><span>ABC/2 = <b id="icVol"></b></span></p></div></details>`;
  const cS=$('#icScSvg');
  function drawSc(){const v=sc.gcs+sc.age+sc.inf+sc.vol+sc.ivh,N=vb(cS,'560 250','400 370');let s='';
    const x0=N?26:30,w=N?356:300,top=N?44:44,h=N?150:150,bw=w/6;
    s+=`<text x="${x0-20}" y="18" class="t-lbl">30-day mortality by score, 2001 derivation cohort</text>`;
    [0,50,100].forEach(g=>{const y=top+h-h*g/100;s+=`<line x1="${x0}" x2="${x0+w}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${x0-4}" y="${f1(y+3)}" class="t-xs t-end">${g}</text>`});
    IC_MORT.forEach((m,i)=>{const on=i===v,bh=h*m/100,xx=x0+i*bw+4;
      s+=`<rect x="${f1(xx)}" y="${f1(top+h-bh)}" width="${f1(bw-8)}" height="${f1(Math.max(bh,1))}" style="fill:${on?'var(--accent)':'var(--muted)'};opacity:${on?1:.45}"/>`;
      s+=`<text x="${f1(xx+(bw-8)/2)}" y="${f1(top+h-bh-5)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${m}%</text><text x="${f1(xx+(bw-8)/2)}" y="${top+h+15}" class="t-sm t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${i}</text>`});
    s+=`<text x="${x0+w/2}" y="${top+h+32}" class="t-sm t-mid">ICH score</text>`;
    const ix=N?26:360,iy=N?262:64;
    if(v<=5){const I=icons(ix,iy,{n:100,cols:N?20:10,size:N?13:12,gap:4,shape:'dot',k:IC_MORT[v],col:'var(--accent)'});s+=`<text x="${ix}" y="${iy-12}" class="t-sm" style="fill:var(--ink)">score ${v}: ${IC_MORT[v]} in 100 died</text>`+I.svg}
    else s+=`<text x="${ix}" y="${iy+10}" class="t-sm" style="fill:var(--ink)">score 6: no outcome</text><text x="${ix}" y="${iy+25}" class="t-sm" style="fill:var(--ink)">reported</text>`;
    cS.innerHTML=s;
    $('#icScNote').innerHTML=`<div class="kicker">${IC_SC_TXT.k}</div><h4>ICH score ${v}</h4><p>${IC_MORT_N[v]}</p><p>${IC_SC_TXT.cap}</p><p>${IC_SC_TXT.abc}</p><div class="hook"><b>%t:note.hook%</b>${IC_SC_TXT.hook}</div>`}
  function drawAbc(){const V=abc.a*abc.b*abc.c/2;$('#icVol').textContent=(V%1?V.toFixed(1):V)+' cm³, '+(V>=30?'30 or more: 1 point':'under 30: 0 points');['a','b','c'].forEach(k=>$('#icO'+k).textContent=abc[k])}
  $('#icScore').addEventListener('click',e=>{const b=e.target.closest('[data-sq]');if(!b)return;sc[b.dataset.sq]=+b.dataset.sv;$$(`[data-sq="${b.dataset.sq}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));drawSc()});
  $('#icAbc').addEventListener('input',e=>{const k=e.target.dataset.abc;if(!k)return;abc[k]=+e.target.value;const V=abc.a*abc.b*abc.c/2;sc.vol=V>=30?1:0;$$('[data-sq="vol"]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.sv===sc.vol));drawAbc();drawSc()});
  drawAbc();drawSc();

  /* ---------- BP trials ---------- */
  const bS=$('#icBpSvg');let bI=0;
  $('#icBpBtns').innerHTML=IC_BP.map((x,i)=>`<button class="btn" data-bp="${i}" aria-pressed="${i===0}">${x.n}</button>`).join('');
  function drawBp(){const T=IC_BP[bI],N=vb(bS,'720 300','400 460');let s='';
    const x0=N?20:150,w=N?360:530,X=v=>x0+w*(v-100)/100,y0=N?44:40;
    s+=`<text x="${N?20:14}" y="18" class="t-lbl">Systolic target or level, mm Hg</text>`;
    [100,120,140,160,180,200].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y0}" y2="${y0+T.arms.length*(N?40:30)}" class="grid"/><text x="${f1(X(v))}" y="${y0+T.arms.length*(N?40:30)+14}" class="t-xs t-mid">${v}</text>`});
    T.arms.forEach((a,i)=>{const yy=y0+i*(N?40:30)+(N?14:6);
      s+=`<text x="${N?20:14}" y="${N?yy-3:yy+13}" class="t-sm" style="fill:var(--ink)">${a.l}</text>`;
      const by=N?yy+1:yy;
      if(a.a===a.b)s+=`<circle cx="${f1(X(a.a))}" cy="${f1(by+9)}" r="6" style="fill:var(--accent)"/><text x="${f1(X(a.a)+(a.a>170?-10:10))}" y="${f1(by+13)}" class="t-sm${a.a>170?' t-end':''}" style="fill:var(--ink)">${a.txt}</text>`;
      else{s+=`<rect x="${f1(X(a.a))}" y="${f1(by)}" width="${f1(X(a.b)-X(a.a))}" height="18" rx="${a.open?0:3}" style="fill:${i?'var(--muted)':'var(--accent)'};opacity:.85"/><text x="${f1(X(a.b)+6)}" y="${f1(by+13)}" class="t-sm" style="fill:var(--ink)">${a.txt}</text>`}});
    const yo=y0+T.arms.length*(N?40:30)+(N?42:42);
    if(T.out){s+=icBars(N?20:14,yo,N?360:690,T.out,70,{lw:N?120:150})}
    if(T.forest){const fx=N?20:14,fw=N?360:690,sx=N?126:250,sw=N?216:380,F=v=>sx+sw*(v-.5)/1.25;
      s+=`<text x="${fx}" y="${yo}" class="t-lbl">Common odds ratio for poor function</text>`;
      [['All strokes',1.00,.87,1.15],['Haemorrhagic',.75,.60,.92],['Ischaemic',1.30,1.06,1.60]].forEach((r,i)=>{const yy=yo+22+i*26;
        s+=`<text x="${fx}" y="${yy+4}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><line x1="${f1(F(r[2]))}" x2="${f1(F(r[3]))}" y1="${yy}" y2="${yy}" style="stroke:var(--ink);stroke-width:2"/><rect x="${f1(F(r[1])-5)}" y="${yy-5}" width="10" height="10" style="fill:var(--accent)"/><text x="${f1(sx+sw+8)}" y="${yy+4}" class="t-sm" style="fill:var(--ink)">${r[1].toFixed(2)}</text>`});
      s+=`<line x1="${f1(F(1))}" x2="${f1(F(1))}" y1="${yo+10}" y2="${yo+86}" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${f1(F(1))}" y="${yo+98}" class="t-xs t-mid">1.0, no difference</text>`}
    if(T.curve){const cx=N?20:150,cw=N?360:530,cy=yo+6,ch=N?170:110,f=monoFn([ [0,.56],[30,.42],[46,.42],[60,.5],[70,.72],[90,.98] ]);
      s+=`<text x="${N?20:14}" y="${yo-2}" class="t-lbl">${N?'Reduction in the first hour':'1-hour fall'}</text>`;
      const Cv=curve(cx,cy+6,cw,ch,f,{x0:0,x1:90,y0:0,y1:1,col:'var(--accent)',bands:[{from:0,to:1,col:'transparent'}]});s+=Cv.svg;
      const xa=Cv.X(32),xb=Cv.X(46),x7=Cv.X(70);
      s+=`<rect x="${f1(xa)}" y="${cy+6}" width="${f1(xb-xa)}" height="${ch}" style="fill:var(--good-soft);opacity:.75"/><path d="${(()=>{let d='';for(let i=0;i<=60;i++){const v=i*1.5;d+=(i?'L':'M')+f1(Cv.X(v))+' '+f1(Cv.Y(f(v)))}return d})()}" style="fill:none;stroke:var(--accent);stroke-width:2.6"/>`;
      s+=`<text x="${f1((xa+xb)/2)}" y="${cy+20}" class="t-xs t-mid" style="fill:var(--ink)">32 to 46</text><line x1="${f1(x7)}" x2="${f1(x7)}" y1="${cy+6}" y2="${cy+6+ch}" style="stroke:var(--bad);stroke-dasharray:3 3"/><text x="${f1(x7+4)}" y="${cy+20}" class="t-xs" style="fill:var(--ink)">over 70</text>`;
      s+=`<text x="${cx}" y="${cy+ch+20}" class="t-xs">0 mm Hg</text><text x="${cx+cw}" y="${cy+ch+20}" class="t-xs t-end">90 mm Hg. Schematic shape, odds of poor outcome</text>`}
    bS.removeAttribute('height');
    const H=T.curve?(N?yo+202:yo+144):T.forest?(N?yo+110:yo+106):(N?yo+90:yo+84);bS.setAttribute('viewBox',`0 0 ${N?400:720} ${f1(H)}`);
    bS.innerHTML=s;$('#icBpNote').innerHTML=noteHTML({k:T.k,t:T.n,txt:T.txt,hook:T.hook})}
  $('#icBpBtns').addEventListener('click',e=>{const b=e.target.closest('[data-bp]');if(!b)return;bI=+b.dataset.bp;$$('[data-bp]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawBp()});drawBp();

  /* ---------- surgery ---------- */
  const uS=$('#icSuSvg');let uI=0;
  $('#icSuBtns').innerHTML=IC_SU.map((x,i)=>`<button class="btn" data-su="${i}" aria-pressed="${i===0}">${x.n}</button>`).join('');
  function drawSu(){const T=IC_SU[uI],N=vb(uS,'720 330','400 500'),ax=N?[80,10,1]:[14,14,1];let s='';
    const o={side:'L',orient:true};
    if(T.site==='deep')o.bleed={r:T.big?34:27,oedema:.25};if(T.site==='lobar')o.bleed={x:186,y:84,r:26,oedema:.25};if(T.site==='ivh')o.ivh=.9;
    if(T.big)o.shift=7;
    const B=brainAxial(ax[0],ax[1],ax[2],o);s+=B.svg;const q=B.at.bleed;
    const T2=(x,y)=>[ax[0]+x*ax[2],ax[1]+y*ax[2]];
    if(T.m==='tube'){const p0=T.site==='lobar'?T2(236,48):T2(226,70),p1=q;s+=`<line x1="${f1(p0[0])}" y1="${f1(p0[1])}" x2="${f1(p1[0])}" y2="${f1(p1[1])}" style="stroke:var(--device);stroke-width:5;stroke-linecap:round"/>`}
    if(T.m==='evd'){const p0=T2(150,14),p1=B.at.hornL;s+=`<line x1="${f1(p0[0])}" y1="${f1(p0[1])}" x2="${f1(p1[0])}" y2="${f1(p1[1])}" style="stroke:var(--device);stroke-width:3.5;stroke-linecap:round"/>`}
    if(T.m==='cran'){const a=T.site==='lobar'?[-1.05,-.2]:[-.5,.45],pts=[];for(let i=0;i<=16;i++){const u=lerp(a[0],a[1],i/16);pts.push(T2(120+Math.cos(u)*113,150+Math.sin(u)*141))}s+=`<path d="${ptsD(pts)}" style="fill:none;stroke:var(--accent);stroke-width:6;stroke-dasharray:3 2;stroke-linecap:butt"/>`}
    if(T.m==='dec'){const pts=[];for(let i=0;i<=26;i++){const u=lerp(-1.05,1.05,i/26);pts.push(T2(120+Math.cos(u)*113,150+Math.sin(u)*141))}s+=`<path d="${ptsD(pts)}" style="fill:none;stroke:var(--panel);stroke-width:9"/><path d="${ptsD(pts)}" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:5 4"/>`}
    const mx=N?20:290,my=N?336:50,mw=N?360:414;
    s+=`<text x="${mx}" y="${my}" class="t-big">${T.n}</text><text x="${mx}" y="${my+19}" class="t-sm">${IC_SU_M[T.m]}</text>`;
    s+=icBars(mx,my+56,mw,T.bars,70,{lw:N?128:150});
    uS.innerHTML=s;$('#icSuNote').innerHTML=noteHTML({k:T.k,t:T.n,txt:T.txt,hook:T.hook})}
  $('#icSuBtns').addEventListener('click',e=>{const b=e.target.closest('[data-su]');if(!b)return;uI=+b.dataset.su;$$('[data-su]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawSu()});drawSu();

  /* ---------- restart: PRESTIGE-AF balance ---------- */
  const rS=$('#icReSvg'),rR=$('#icReT');
  function drawRe(t){const N=vb(rS,'720 280','400 440');let s='';const u1=ease(ramp(t,.05,.45)),u2=ease(ramp(t,.5,.9)),mx=10;
    const W=N?150:230,lw=N?0:0,gx=N?[20,216]:[50,390],top=N?90:90,bh=30;
    /* a beam that tilts toward the heavier side */
    const bal=N?[200,58,170]:[360,52,290],tilt=(8.6-.83)*u1*.9-(5-.82)*u2*.9;
    const rad=tilt*Math.PI/180,dx=Math.cos(rad)*bal[2],dy=Math.sin(rad)*bal[2];
    s+=`<line x1="${f1(bal[0]-dx)}" y1="${f1(bal[1]-dy)}" x2="${f1(bal[0]+dx)}" y2="${f1(bal[1]+dy)}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><path d="M${bal[0]} ${bal[1]}l-9 16h18Z" style="fill:var(--ink)"/>`;
    if(N){s+=`<text x="${bal[0]}" y="18" class="t-sm t-mid" style="fill:var(--ink)">a drawing of the balance, not a measure</text>`}else s+=`<text x="${bal[0]}" y="18" class="t-sm t-mid" style="fill:var(--ink)">the beam is a drawing of the balance, not a measure</text>`;
    const G=[{t:'First ischaemic stroke',u:u1,a:.83,b:8.60,col:'var(--core)'},{t:'Recurrent ICH',u:u2,a:5.00,b:.82,col:'var(--blood)'}];
    G.forEach((g,i)=>{const x=N?20:(i?380:30),y=N?top+i*160:top+20,ww=N?290:240;
      s+=`<text x="${x}" y="${y}" class="t-lbl">${g.t}</text>`;
      [['On a DOAC',g.a],['No anticoagulant',g.b]].forEach((r,k)=>{const yy=y+24+k*50,w=ww*r[1]/mx*g.u;
        s+=`<text x="${x}" y="${yy-3}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><rect x="${x}" y="${yy+1}" width="${f1(Math.max(w,1))}" height="24" rx="3" style="fill:${k?'var(--muted)':g.col}"/><text x="${f1(x+Math.max(w,1)+6)}" y="${yy+18}" class="t-sm" style="fill:var(--ink)">${g.u>0?r[1].toFixed(2):''}</text>`})});
    s+=`<text x="${N?20:30}" y="${N?top+322:top+160}" class="t-sm">per 100 patient-years, PRESTIGE-AF</text>`;
    rS.innerHTML=s;$('#icReNote').innerHTML=noteHTML(IC_RE_N[t<.5?0:1])}
  playWire(rR,$('#icRePlay'),drawRe,8000,'%t:player.replay%','ich');drawRe(+rR.value);

  const prev=redraws.ich;redraws.ich=()=>{prev&&prev();drawSc();drawBp();drawSu()};
};
