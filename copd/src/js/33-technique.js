/* =============== 3.3 Inhaler devices & technique =============== */
/* Main scene: pick a device (pMDI, dry powder, soft mist, pMDI with spacer) and play one use of it: prepare,
   breathe out away from the device, the breath in, the breath-hold and the re-check. A head and the kit's
   lungs() breathe in time; a flow-time sketch shows the shape of the breath in (schematic, the only number is
   the 60 L/min DPI threshold); a panel shows how often that step goes wrong, as published (research pass D).
   Uses inhBars/inhRows/inhNum from 3.1 (same builder, same script scope). */
const TQ_DEV={pmdi:{n:'Pressurised metered-dose inhaler (pMDI)',s:'pMDI',kind:'pmdi',size:70,tip:[29,27],rot:0},
 dpi:{n:'Dry powder inhaler (DPI)',s:'DPI',kind:'dpi',size:62,tip:[35,0],rot:90},
 smi:{n:'Soft mist inhaler (SMI)',s:'SMI',kind:'smi',size:66,tip:[41,0],rot:90},
 spacer:{n:'pMDI with a spacer',s:'Spacer',kind:'spacer',size:46,tip:[61,17],rot:0}};
const TQ_STEPS=[
 {from:0,at:.08,k:'Pick the device',t:'Match the device to the breath',
  txt:`GOLD 2023: device choice depends on "availability, patient preferences, and ability to perform the correct inhalation maneuver", and regular assessment at follow-up "is necessary to maintain their effective use" [[Agusti2023]].`,
  dev:{pmdi:`Pressurised inhalers need priming. The Breztri Aerosphere label says to "Prime ... before first time use and re-prime if not used for more than 7 days" [[FDA-Breztri]]. GOLD 2023: device choice depends on "availability, patient preferences, and ability to perform the correct inhalation maneuver" [[Agusti2023]].`,
   dpi:`A dry powder inhaler has an internal resistance and depends on the person's own inspiratory flow to break the powder into particles smaller than 5 µm that can reach the lower airways [[Mahler2017]]. Incorrect preparation was an error in 29% of DPI technique checks [[Sanchis2016]]. The Spiriva HandiHaler label warns "Do not swallow SPIRIVA capsules" [[FDA-SpirivaHandiHaler]].`,
   smi:`Soft mist inhalers need priming. The Spiriva Respimat label says to actuate "toward the ground until an aerosol cloud is visible and then repeat the process three more times" before first use [[FDA-SpirivaRespimat]].`,
   spacer:`GOLD 2023 mentions spacers in its flare-up section: short-acting bronchodilators are given by MDI "with a spacer device if necessary, or nebulization" [[Agusti2023]]. This guide's sources include no spacer technique studies, so no spacer error rates are shown.`},
  pt:`Each inhaler type needs a different breath. The right one depends on what a person can do, what they prefer and what is available [[Agusti2023]].`,
  hook:`GOLD 2023: choose the device by availability, preference and the ability to perform the inhalation manoeuvre, and re-check technique at follow-up [[Agusti2023]].`},
 {from:.2,at:.28,k:'Breathe out first',t:'Empty the lungs away from the device',
  txt:`Not breathing out fully before inhaling was a mistake in 46% of DPI technique checks [[Sanchis2016]].`,
  dev:{pmdi:`The pooled review in this guide's sources gives no pMDI rate for this step; for DPIs, not breathing out fully before inhaling was a mistake in 46% of checks [[Sanchis2016]].`,
   smi:`The pooled review in this guide's sources reports pMDI and DPI errors only; for DPIs, not breathing out fully was a mistake in 46% of checks [[Sanchis2016]].`,
   spacer:`The pooled review in this guide's sources reports pMDI and DPI errors only; for DPIs, not breathing out fully was a mistake in 46% of checks [[Sanchis2016]].`},
  pt:`Breathing out first, away from the inhaler, makes room for the breath that carries the medicine in [[Sanchis2016]].`,
  hook:`DPI: no full breath out before inhaling in 46% of technique checks [[Sanchis2016]].`},
 {from:.4,at:.52,k:'The breath in',t:'The right breath for the device',
  txt:`Coordination (45%) and speed or depth of inspiration (44%) were the commonest pMDI errors, while a DPI needs a peak inspiratory flow of about ≥60 L/min [[Sanchis2016,Mahler2017]].`,
  dev:{pmdi:`A pMDI puff has to be timed with the breath in. Coordination (45%) and speed and/or depth of inspiration (44%) were among the commonest pMDI errors in a review of 144 articles [[Sanchis2016]]. Spray inhalers need a slow, steady breath timed with the press [[Mahler2017,Sanchis2016]].`,
   dpi:`The powder is broken up inside the device by the person's own breath, helped by fast acceleration at the start of the breath [[Mahler2017]]. A handheld meter can check for an optimal peak inspiratory flow of at least 60 L/min; suboptimal flow was found in 19–78% of stable outpatients with COPD [[Mahler2017]].`,
   smi:`The soft mist inhaler releases a slow mist when pressed. Spray inhalers need a slow, steady breath timed with the press [[Mahler2017,Sanchis2016]].`,
   spacer:`With a spacer, the puff goes into the chamber and is breathed in from it. GOLD 2023 names the spacer for MDI use "if necessary" in flare-ups [[Agusti2023]]. Some people use a spray inhaler with a spacer [[Agusti2023]].`},
  pt:`Powder inhalers need a strong, fast breath in. Spray inhalers need a slow, steady breath timed with the press [[Mahler2017,Sanchis2016]].`,
  hook:`DPI: optimal peak inspiratory flow ≥60 L/min [[Mahler2017]]. pMDI: coordination error 45% [[Sanchis2016]].`},
 {from:.6,at:.7,k:'Hold it',t:'Breath-hold after inhaling',
  txt:`No breath-hold after inhaling was a mistake in 46% of pMDI and 37% of DPI checks [[Sanchis2016]].`,
  pt:`Holding the breath after inhaling is the step people most often skip [[Sanchis2016]].`,
  hook:`No breath-hold: 46% of pMDI and 37% of DPI technique checks [[Sanchis2016]].`},
 {from:.8,at:.9,k:'Check again',t:'Teach and re-check at every visit',
  txt:`Across 144 articles (59,584 technique tests), correct technique was seen in only 31%, with no improvement between the first and second 20-year periods studied [[Sanchis2016]]. In 1664 experienced chest-clinic patients, critical errors ranged from 12% with MDIs to 44% with Turbuhaler, misuse was linked with more hospitalisation, and instruction from health caregivers was the only modifiable factor linked to less misuse [[Melani2011]].`,
  pt:`Most people make at least one mistake with their inhaler. Asking a nurse, pharmacist or doctor to watch you use it is one of the most useful checks [[Sanchis2016,Melani2011]].`,
  hook:`Only about 31% of technique checks were correct, and this has not improved in 40 years [[Sanchis2016]].`}
];
const TQ_TXT={
 ph:['Prepare the device','Breathe out, away','Breathe in','Hold the breath','Check again'],
flow:'inspiratory flow',time:'time',thr:'60 L/min',thrL:'DPI optimal peak flow',
 fast:'fast, hard breath',slow:'slow, steady breath',shape:'shape is schematic',
 errT:'How often this goes wrong',
 prime:'priming puffs, away from the face',load:'load the dose',none:'No pooled error rate for this step and device in this guide’s sources.',
 out:'breathe out',inn:'breathe in',hold:'hold',
 bars:{
  dpi0:[{l:'Preparation',v:29}],dpi1:[{l:'No full exhale',v:46}],dpi3:[{l:'No breath-hold',v:37}],
  pmdi2:[{l:'Coordination',v:45},{l:'Speed or depth',v:44}],pmdi3:[{l:'No breath-hold',v:46}],
  all4:[{l:'Correct',v:31}]},
 errSub:'% of technique checks with this error',corrSub:'% of technique checks done correctly',
 pif:'suboptimal PIF: 19–78% of stable outpatients',
 /* PIF explainer */
 pifVal:v=>`${v} L/min`,
 pifLo:`Below the 60 L/min that Mahler uses as the optimal peak inspiratory flow for a DPI. His review suggests that below 60 L/min "a different delivery system, such as a metered-dose or soft mist inhaler or nebulized therapy, should be considered" (an author's review, not a guideline) [[Mahler2017]].`,
 pifHi:`At or above the optimal peak inspiratory flow of at least 60 L/min that Mahler uses for DPIs [[Mahler2017]]. Peak inspiratory flow depends on effort and respiratory-muscle strength, and both can fall in COPD with hyperinflation, low oxygen and muscle wasting [[Mahler2017]].`,
 gaugeLbl:'peak inspiratory flow',chipsT:'Devices named by Mahler 2017',
 devs:['DPI: needs ≥60 L/min','pMDI','Soft mist','Nebuliser'],devAlt:'suggested below 60',devOk:'flow is adequate',
 lo:'0',hi:'120'
};
/* error and carbon rows for the explorers (research pass D) */
const TQ_COL={a:'var(--rx)',b:'var(--bd)',c:'var(--warn)',d:'var(--bad)',g:'var(--good)',m:'var(--muted)'};
const TQ_ERR={
 pmdi:{rows:[{type:'pair',h:'pMDI: commonest errors, % of technique checks (Sanchis 2016)',arms:[{l:'Coordination',v:45,c:'a'},{l:'Speed or depth',v:44,c:'a'},{l:'No breath-hold',v:46,c:'a'}],mx:100,u:'%',d:0}],
  out:`In the pooled review (144 articles, 54,354 subjects), the commonest pMDI errors were coordination (45%), speed and/or depth of inspiration (44%) and no breath-hold after inhaling (46%) [[Sanchis2016]].`},
 dpi:{rows:[{type:'pair',h:'DPI: commonest errors, % of technique checks (Sanchis 2016)',arms:[{l:'Preparation',v:29,c:'b'},{l:'No full exhale',v:46,c:'b'},{l:'No breath-hold',v:37,c:'b'}],mx:100,u:'%',d:0}],
  out:`The commonest DPI errors were incorrect preparation (29%), no full breath out before inhaling (46%) and no breath-hold after inhaling (37%) [[Sanchis2016]]. A separate DPI review found 4% to 94% of people do not use their inhalers correctly, depending on device and assessment method, and as many as 25% had never received verbal instruction [[Lavorini2008]].`},
 crit:{rows:[{type:'pair',h:'Critical errors by device, % of experienced users (Melani 2011)',arms:[{l:'MDI',v:12,c:'a'},{l:'Diskus or HandiHaler',v:35,c:'b'},{l:'Turbuhaler',v:44,c:'d'}],mx:100,u:'%',d:0,lw:170,lwN:150}],
  out:`In 1664 experienced chest-clinic patients (52% with COPD), misuse was associated with more hospitalisation (P=0.001), emergency visits, oral steroid courses and antibiotic courses (all P&lt;0.001). Older age and less schooling were also linked with misuse [[Melani2011]]. A review found 299 different descriptions of "critical error" and an association between errors and exacerbations [[Usmani2018]].`},
 all:{rows:[{type:'pair',h:'Technique correct, % of all checks (59,584 tests)',arms:[{l:'Correct',v:31,c:'g'}],mx:100,u:'%',d:0},
   {type:'ci',h:'95% confidence interval for correct technique, %',est:31,lo:28,hi:35,mn:0,mx:100,ticks:[0,50,100],col:'var(--good)'}],
  out:`Correct technique was seen in only 31% (95% CI 28% to 35%) of 59,584 observed technique tests, and technique did not improve between the first and second 20-year periods studied [[Sanchis2016]].`}
};
const TQ_CARBON=[
 {type:'pair',h:'Carbon footprint per patient per year, kg CO2e (Janson 2020)',arms:[{l:'DPI regimen',v:17,c:'g'},{l:'pMDI regimen',v:439,c:'d'}],mx:500,u:'kg',d:0},
 {type:'pair',h:'Per salbutamol inhaler, kg CO2e (King 2026)',arms:[{l:'HFA-134a pMDI',v:26.91,c:'d'},{l:'HFA-152a pMDI',v:2.06,c:'c'},{l:'DPI',v:.69,c:'g'}],mx:30,u:'kg',d:2},
 {type:'pair',h:'Per puff, g CO2e (King 2026)',arms:[{l:'HFA-134a pMDI',v:135,c:'d'},{l:'HFA-152a pMDI',v:10,c:'c'},{l:'DPI',v:11,c:'g'}],mx:150,u:'g',d:0}
];
inits.technique=()=>{
  const svg=$('#tqSvg'),rg=$('#tqT'),note=$('#tqNote'),dbtn=$('#tqDev');let dev='pmdi';
  dbtn.innerHTML=Object.keys(TQ_DEV).map(k=>`<button class="btn" data-dev="${k}" aria-pressed="${k===dev}">${TQ_DEV[k].n}</button>`).join('');
  /* breathing over the timeline: 0 empty .. 1 full; DPI breath in is fast */
  function breath(t){const fast=dev==='dpi';
    if(t<.2)return .45;if(t<.4)return lerp(.45,0,ease(ramp(t,.22,.34)));
    if(t<.6){const k=ramp(t,.42,fast?.47:.56);return fast?1-Math.pow(1-k,3):k}
    if(t<.8)return 1;return lerp(1,.45,ease(ramp(t,.8,.88)))}
  function flowFn(u){return dev==='dpi'?(u<.12?ease(u/.12)*.82:.82*Math.max(0,1-Math.pow((u-.12)/.88,1.6))):(u<.3?ease(u/.3)*.33:u<.85?.33:.33*(1-ramp(u,.85,1)))}
  function draw(t){
    const N=vb(svg,'720 420','400 770'),p=phaseOf(TQ_STEPS,t),D=TQ_DEV[dev],b=breath(t);
    const L=N?{tx:16,ty:26,hx:262,hy:124,lx:262,ly:160,ls:170,gx:56,gy:404,gw:320,gh:120,ex:24,ey:604,ew:352}
             :{tx:20,ty:28,hx:236,hy:124,lx:236,ly:160,ls:186,gx:410,gy:72,gw:280,gh:140,ex:400,ey:290,ew:300};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="fill:var(--rx)">${TQ_TXT.ph[p]}</text><text x="${L.tx}" y="${L.ty+17}" class="t-sm">${D.n}</text>`;
    /* lungs and a head in profile, facing left */
    s+=lungs(L.lx,L.ly,L.ls,{breathe:b,hyper:.25,tree:true});
    const hx=L.hx,hy=L.hy,mx=hx-31,my=hy+14;
    s+=`<path d="M${hx+20} ${hy+30}Q${hx+34} ${hy-4} ${hx+14} ${hy-28}Q${hx-10} ${hy-44} ${hx-26} ${hy-18}L${hx-36} ${hy+2}L${hx-29} ${hy+6}L${hx-31} ${hy+20}Q${hx-24} ${hy+34} ${hx-6} ${hy+32}L${hx-4} ${hy+40}" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.6"/>`;
    s+=`<circle cx="${hx-12}" cy="${hy-10}" r="2.4" style="fill:var(--ink)"/>`;
    const open=(p===1||p===2)?1:0;s+=`<path d="M${mx} ${my}h${4+3*open}" style="stroke:var(--ink);stroke-width:${1.6+2*open}"/>`;
    s+=`<path d="M${hx-4} ${hy+40}L${L.lx-6} ${L.ly}M${hx+12} ${hy+30}L${L.lx+6} ${L.ly}" style="stroke:var(--ink);stroke-width:1.4;opacity:.5"/>`;
    /* airflow arrow in the trachea */
    if(p===1||p===2){const up=p===1,k=up?ramp(t,.22,.36):ramp(t,.42,dev==='dpi'?.48:.58);if(k>0&&k<1){      s+=`<circle cx="${f1(up?lerp(mx-14,mx-40,k):lerp(mx-40,mx-2,k))}" cy="${f1(my)}" r="4" style="fill:var(--air);opacity:${f1(1-k*.6)}"/>`}}
    /* the device: away from the mouth to prepare and to breathe out, at the mouth to breathe in */
    const at=p===2?1:p===3?lerp(1,0,ramp(t,.62,.68)):0;
    const tx=mx-2-D.tip[0],ty=my-D.tip[1],dx=lerp(tx-56,tx,ease(at)),dy=lerp(ty+16,ty,ease(at));
    let puff=0;if(p===0&&(dev==='pmdi'||dev==='smi'))puff=bump((t*12)%1,0,1)*.9;
    if(p===2){const k=ramp(t,.42,.5);puff=dev==='dpi'?bump(k,.05,1):bump(k,0,.8)}
    s+=inhaler(dx,dy,D.size,D.kind,{puff,rot:D.rot,col:'var(--rx)'});
    if(p===0&&dev!=='spacer')s+=wrapT(12,dy+D.size*.62+18,dev==='dpi'?TQ_TXT.load:TQ_TXT.prime,18,{cls:'t-xs',lh:12,style:'fill:var(--ink)'}).svg;
    const lab=p===1?TQ_TXT.out:p===2?TQ_TXT.inn:p===3?TQ_TXT.hold:'';
    if(lab)s+=chip(L.lx,L.ly+L.ls*1.08+16,lab,{anchor:'middle',col:'var(--air-ink)',size:11.5});
    /* flow-time sketch */
    const gx=L.gx,gy=L.gy,gw=L.gw,gh=L.gh,Y=v=>gy+gh-v*gh;
    s+=axes(gx,gy,gw,gh,{xt:[],yt:[[0,'0'],[.5,TQ_TXT.thr]],grid:false});
    s+=`<text x="${gx}" y="${gy-10}" class="t-xs">${TQ_TXT.flow}</text><text x="${gx+gw}" y="${gy+gh+15}" class="t-xs t-end">${TQ_TXT.time} →</text>`;
    s+=`<line x1="${gx}" x2="${gx+gw}" y1="${f1(Y(.5))}" y2="${f1(Y(.5))}" style="stroke:var(--warn);stroke-width:1.4;stroke-dasharray:5 4"/><text x="${gx+gw}" y="${f1(Y(.5)-5)}" class="t-xs t-end" style="fill:var(--warn)">${TQ_TXT.thrL}</text>`;
    const gk=t<.4?0:t<.6?ramp(t,.42,.58):1;
    if(gk>0)s+=`<path d="${pathFn(u=>1-flowFn(u*gk),gx,gx+gw*gk,gy,gy+gh,80)}" style="fill:none;stroke:var(--air);stroke-width:2.6"/>`;
    s+=`<text x="${gx}" y="${gy+gh+30}" class="t-xs" style="fill:var(--air-ink);opacity:${f1(ramp(gk,.5,1))}">${dev==='dpi'?TQ_TXT.fast:TQ_TXT.slow} · ${TQ_TXT.shape}</text>`;
    /* error panel */
    const ex=L.ex,ey=L.ey,ew=L.ew,key=p===4?'all4':(dev==='spacer'||dev==='smi')?'':(dev+p);
    s+=`<rect x="${ex-10}" y="${ey-22}" width="${ew+20}" height="${N?160:118}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    s+=`<text x="${ex}" y="${ey}" class="t-lbl">${TQ_TXT.errT}</text>`;
    const items=TQ_TXT.bars[key];
    if(items){const g=ramp(t,TQ_STEPS[p].from+.02,TQ_STEPS[p].from+.1);s+=`<text x="${ex}" y="${ey+18}" class="t-xs">${p===4?TQ_TXT.corrSub:TQ_TXT.errSub}</text>`;
      s+=inhBars(ex,ey+28,ew,items.map(it=>({l:it.l,v:it.v,col:p===4?'var(--good)':'var(--bad)',t:it.v+'%'})),{mx:100,g,lw:N?110:116,bh:16,gap:7}).svg;
      if(dev==='dpi'&&p===2)s+=`<text x="${ex}" y="${ey+86}" class="t-xs">${TQ_TXT.pif}</text>`}
    else if(dev==='dpi'&&p===2){s+=`<text x="${ex}" y="${ey+24}" class="t-sm" style="fill:var(--ink)">${TQ_TXT.pif}</text>`}
    else{const W=wrapT(ex,ey+24,TQ_TXT.none,N?50:44,{cls:'t-sm',lh:15});s+=W.svg}
    svg.innerHTML=s;setSt(p);const P=TQ_STEPS[p];note.innerHTML=noteHTML({k:P.k,t:P.t,txt:(P.dev&&P.dev[dev])||P.txt,pt:P.pt,hook:P.hook});
  }
  const stop=playWire(rg,$('#tqPlay'),draw,20000,'%t:player.replay%','technique');
  const setSt=stepWire($('#tqSteps'),TQ_STEPS,rg,draw,stop);
  dbtn.addEventListener('click',e=>{const b=e.target.closest('[data-dev]');if(!b)return;dev=b.dataset.dev;$$('[data-dev]',dbtn).forEach(x=>x.setAttribute('aria-pressed',x.dataset.dev===dev));stop();draw(+rg.value)});
  draw(+rg.value);

  /* ---- peak inspiratory flow explainer ---- */
  const psvg=$('#tqPifSvg'),prg=$('#tqPifR'),pout=$('#tqPifOut'),pval=$('#tqPifVal');
  function drawPif(){const N=NARROW(),v=+prg.value,ok=v>=60;psvg.setAttribute('viewBox',N?'0 0 400 330':'0 0 720 210');
    const gx=N?200:170,gy=N?150:160,r=N?120:126;
    let s=gauge(gx,gy,r,v/120,{bands:[[0,.5,'var(--warn-soft)'],[.5,1,'var(--good-soft)']],col:'var(--ink)'});
    s+=`<text x="${gx-r}" y="${gy+18}" class="t-xs t-mid">${TQ_TXT.lo}</text><text x="${gx+r}" y="${gy+18}" class="t-xs t-mid">${TQ_TXT.hi}</text><text x="${gx}" y="${gy-r-10}" class="t-xs t-mid" style="fill:var(--warn)">60</text>`;
    s+=`<line x1="${gx}" x2="${gx}" y1="${gy-r-6}" y2="${gy-r+18}" style="stroke:var(--warn);stroke-width:2"/>`;
    s+=`<text x="${gx}" y="${gy+22}" class="t-big t-mid" style="fill:${ok?'var(--good)':'var(--warn)'}">${TQ_TXT.pifVal(v)}</text><text x="${gx}" y="${gy+40}" class="t-xs t-mid">${TQ_TXT.gaugeLbl}</text>`;
    const cx=N?30:380,cy=N?222:40;s+=`<text x="${cx}" y="${cy}" class="t-lbl">${TQ_TXT.chipsT}</text>`;
    TQ_TXT.devs.forEach((d,i)=>{const yy=cy+26+i*(N?24:36),col=i===0?(ok?'var(--good)':'var(--warn)'):(ok?'var(--muted)':'var(--good)');
      s+=chip(cx,yy,d,{col,size:11.5,w:N?170:200});
      if(i>0&&!ok)s+=`<text x="${cx+(N?180:210)}" y="${yy+4}" class="t-xs" style="fill:var(--good)">${TQ_TXT.devAlt}</text>`;
      if(i===0&&ok)s+=`<text x="${cx+(N?180:210)}" y="${yy+4}" class="t-xs" style="fill:var(--good)">${TQ_TXT.devOk}</text>`});
    psvg.innerHTML=s;pval.textContent=TQ_TXT.pifVal(v);prg.setAttribute('aria-valuetext',TQ_TXT.pifVal(v));pout.innerHTML=ok?TQ_TXT.pifHi:TQ_TXT.pifLo}
  prg.addEventListener('input',drawPif);drawPif();

  /* ---- common-errors explorer ---- */
  const esvg=$('#tqErrSvg'),eout=$('#tqErrOut'),ebtn=$('#tqErrBtns');let ek='pmdi',stopE=null;
  function drawErr(g){const R=inhRows(TQ_ERR[ek].rows,NARROW(),g,TQ_COL);esvg.setAttribute('viewBox',`0 0 ${NARROW()?400:720} ${R.h}`);esvg.innerHTML=R.svg;esvg.setAttribute('aria-label',TQ_ERR[ek].rows.map(r=>r.h).join('; '))}
  function showErr(){$$('[data-err]',ebtn).forEach(b=>b.setAttribute('aria-pressed',b.dataset.err===ek));eout.innerHTML=TQ_ERR[ek].out;stopE&&stopE();stopE=animate(700,drawErr)}
  ebtn.addEventListener('click',e=>{const b=e.target.closest('[data-err]');if(b){ek=b.dataset.err;showErr()}});showErr();

  /* ---- carbon footprint ---- */
  const csvg=$('#tqCoSvg');
  function drawCo(){const R=inhRows(TQ_CARBON,NARROW(),1,TQ_COL);csvg.setAttribute('viewBox',`0 0 ${NARROW()?400:720} ${R.h}`);csvg.innerHTML=R.svg}
  drawCo();
  const prev=redraws.technique;redraws.technique=()=>{prev&&prev();drawPif();drawErr(1);drawCo()};
};
