/* =============== 3.4 POTS & the autonomic link =============== */
/* Illustrative tilt-table curves. Only the thresholds are published values:
   POTS = sustained HR rise >=30 bpm within 10 min of standing or head-up tilt (>=40 bpm at ages 12-19),
   without orthostatic hypotension (sustained systolic fall >=20 mmHg); Vernino 2021, Sheldon 2015. */
const AU_P={
 typical:{n:'Typical response',hr0:68,rise:11,tau:.45,sb0:116,fall:2,ftau:.6,pool:.35},
 pots:{n:'POTS pattern',hr0:72,rise:43,tau:1.5,sb0:112,fall:3,ftau:.8,pool:.95},
 oh:{n:'Orthostatic hypotension',hr0:70,rise:15,tau:1,sb0:128,fall:31,ftau:1.4,pool:.8}
};
const auHR=(P,m)=>m<=0?P.hr0+Math.sin(m*5.1)*.8:P.hr0+P.rise*(1-Math.exp(-m/P.tau))+Math.sin(m*4.3)*1.1;
const auSB=(P,m)=>m<=0?P.sb0+Math.sin(m*3.7)*.7:P.sb0-P.fall*(1-Math.exp(-m/P.ftau))+Math.sin(m*3.1)*.9;
const auMin=t=>-2+12*t;
const AU_STEPS=[
 {from:0,at:.08,k:'Minutes −2 to 0',t:'Lying flat: the baseline',
  txt:`A head-up tilt test starts with the person resting flat on the table while heart rate and blood pressure settle. Every later number is read as a change from this lying baseline. An active stand test does the same with the person simply standing up from lying. [[Sheldon2015,Vernino2021]]`,
  pt:`The lying numbers are the yardstick. What matters is how much they change when the person is brought upright.`,
  hook:`POTS is defined by a <b>change</b> in heart rate (lying to upright), not by a single fast pulse.`},
 {from:.155,at:.2,k:'Minute 0',t:'Tilt to 70°',
  txt:`The table swings the person to about 70°, nearly upright, with their feet on the footplate. Gravity now pulls blood down into the veins of the legs and abdomen, so less returns to the heart. The HRS 2015 consensus explains why EDS may add to this: abnormal connective tissue in the dependent veins can let them distend excessively under ordinary hydrostatic pressure. <span class="ev hyp">Hypothesis</span> [[Sheldon2015]]`,
  pt:`Standing up sends blood toward the legs. If the vein walls stretch more than usual, more of it stays there.`,
  hook:`The venous-compliance idea: lax connective tissue → veins distend → venous pooling → less return to the heart.`},
 {from:.3,at:.42,k:'Minutes 1–4',t:'Pooling, and the heart answers',
  txt:`With less blood coming back, the body speeds the heart to keep blood pressure up. In most people the rise is modest and settles. In the POTS pattern it climbs and stays high; in orthostatic hypotension the blood pressure itself falls. Symptoms reported on standing include light-headedness, palpitations, tremor, generalised weakness, blurred vision, exercise intolerance and fatigue. [[Sheldon2015]]`,
  pt:`A racing heart on standing is the body trying to make up for blood pooling in the legs.`,
  hook:`Orthostatic symptoms: light-headedness, palpitations, tremor, weakness, blurred vision, exercise intolerance, fatigue.`},
 {from:.55,at:.75,k:'Minutes 5–10',t:'Sustained, or not?',
  txt:`The definition asks for a <b>sustained</b> rise within 10 minutes, not a brief spike as the table moves. A typical patient with POTS is female and aged 12 to 50 (female-to-male ratio over 4:1), and symptoms often begin in adolescence. Prevalence has not been properly studied: estimates, based largely on clinical experience, are 0.2% to 1% of the US population. [[Vernino2021]]`,
  pt:`One quick jump in pulse is normal. POTS is about a rise that stays up while the person stays upright.`,
  hook:`POTS: mostly women aged 12–50, F:M over 4:1; estimated 0.2–1% of the US population (not properly studied).`},
 {from:.9,at:1,k:'Minute 10',t:'Reading the result',
  txt:`POTS: a sustained heart-rate rise of at least 30 beats/min within 10 minutes of standing or tilt (at least 40 at ages 12–19), <b>without</b> orthostatic hypotension (no sustained systolic fall of 20 mmHg or more), plus frequent orthostatic symptoms that improve rapidly on lying down. The Canadian Cardiovascular Society 2020 statement warns that many people without true POTS (symptoms without tachycardia, tachycardia without symptoms, or another overt cause) are given the label anyway. [[Vernino2021,Sheldon2015,Raj2020CCS]]`,
  pt:`The numbers are only one part. Symptoms that ease when lying down, and ruling out other causes, matter as much.`,
  hook:`≥30 bpm (≥40 at 12–19) within 10 min, no systolic fall ≥20 mmHg, with symptoms. Orthostatic hypotension excludes POTS.`}
];
/* the illustrative cohort bars (published percentages) */
const AU_COH=[
 {g:0,l:'Joint hypermobility syndrome',s:'orthostatic intolerance · 27 vs 21',v:78,c:10,k:'Gazit2003'},
 {g:0,l:'Women with EDS-HT',s:'orthostatic intolerance · 39 vs 35',v:74,c:34,k:'DeWandele2014Mech'},
 {g:0,l:'hEDS/HSD adults',s:'POTS on autonomic testing · 102',v:48,c:null,k:'Celletti2020'},
 {g:0,l:'EDS-HT, tilt subsample',s:'postural tachycardia',v:41,c:null,k:'DeWandele2016'},
 {g:1,l:'Adults with POTS',s:'met 2017 hEDS criteria · 91',v:31,c:null,k:'Miller2020'},
 {g:1,l:'Children with POTS',s:'hEDS · 708',v:22.4,c:null,k:'Boris2018'},
 {g:1,l:'Children with POTS',s:'HSD · 708',v:34.9,c:null,k:'Boris2018'}
];
inits.autonomic=()=>{
  const svg=$('#auSvg'),rg=$('#auT');let P=AU_P.typical,pk='typical',teen=false;
  const thr=()=>teen?40:30;
  function chart(o){/* o: x0,x1,y0,y1,lo,hi,f,base,line,lineLbl,m,col,unit,ticks,name */
    let s=`<rect x="${o.x0}" y="${o.y0}" width="${o.x1-o.x0}" height="${o.y1-o.y0}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    const X=m=>lerp(o.x0,o.x1,(m+2)/12),Y=v=>lerp(o.y1,o.y0,(v-o.lo)/(o.hi-o.lo));
    o.ticks.forEach(v=>{s+=`<line x1="${o.x0}" x2="${o.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${o.x0-5}" y="${f1(Y(v)+3.5)}" class="t-xs t-end">${v}</text>`});
    [0,2,4,6,8,10].forEach(m=>s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${o.y1}" y2="${o.y1+4}" class="axis"/>`);
    s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${o.y0}" y2="${o.y1}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
    s+=`<line x1="${o.x0}" x2="${o.x1}" y1="${f1(Y(o.base))}" y2="${f1(Y(o.base))}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:1 3"/>`;
    s+=`<line x1="${f1(X(0))}" x2="${o.x1}" y1="${f1(Y(o.line))}" y2="${f1(Y(o.line))}" style="stroke:var(--vas);stroke-width:1.6;stroke-dasharray:6 4"/>`;
    s+=`<line x1="${o.x1-o.lineLbl.length*5.75-30}" x2="${o.x1-o.lineLbl.length*5.75-12}" y1="${o.y0+11}" y2="${o.y0+11}" style="stroke:var(--vas);stroke-width:1.6;stroke-dasharray:5 3"/><text x="${o.x1-6}" y="${o.y0+14}" class="t-xs t-end" style="fill:var(--vas);font-weight:600">${o.lineLbl}</text>`;
    s+=`<text x="${o.x0+8}" y="${o.y0+15}" class="t-lbl">${o.name}</text>`;
    let d='';for(let m=-2;m<=o.m+1e-6;m+=.05)d+=(d?'L':'M')+f1(X(m))+' '+f1(Y(clamp(o.f(m),o.lo,o.hi)));
    if(o.m>-2){const mm=Math.min(o.m,10),v=o.f(mm);d+='L'+f1(X(mm))+' '+f1(Y(clamp(v,o.lo,o.hi)));
      s+=`<path d="${d}" style="fill:none;stroke:${o.col};stroke-width:2.4;stroke-linejoin:round"/>`;
      const cx=X(mm),cy=Y(clamp(v,o.lo,o.hi));
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="4.5" style="fill:${o.col};stroke:var(--panel);stroke-width:1.5"/>`;
      const tx=cx>o.x1-70?cx-8:cx+8;s+=`<text x="${f1(tx)}" y="${f1(cy<o.y0+34?cy+17:cy-8)}" class="t-lbl ${cx>o.x1-70?'t-end':''}" style="fill:${o.col}">${Math.round(v)} ${o.unit}</text>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 620'),m=auMin(t),ang=70*ease(ramp(m,0,.35)),up=ang/70;
    const L=N?{fx:8,fy:8,fw:384,fh:262,px:232,py:128,s:1.45,floor:210,tx:20,ecg:[20,250,360],hrl:230,pl:[262,122],
               hr:[48,390,292,422],sb:[48,390,458,588],xl:606}
             :{fx:8,fy:8,fw:252,fh:364,px:140,py:196,s:1.45,floor:276,tx:22,ecg:[22,350,224],hrl:326,pl:[22,298],
               hr:[300,708,20,178],sb:[300,708,206,350],xl:368};
    let s=`<defs>${marker('auArr','var(--blood)')}</defs>`;
    s+=`<rect x="${L.fx}" y="${L.fy}" width="${L.fw}" height="${L.fh}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${L.tx}" y="${L.fy+22}" class="t-sm">HEAD-UP TILT</text>`;
    s+=`<text x="${L.tx}" y="${L.fy+48}" style="font:400 26px var(--display);fill:var(--ink)">${Math.round(ang)}°</text>`;
    s+=`<text x="${L.tx}" y="${L.fy+66}" class="t-xs">${m<0?'lying, baseline':'upright'} · min ${m<0?'−'+f1(-m):f1(m)}</text>`;
    s+=`<text x="${L.tx}" y="${L.fy+80}" class="t-xs" style="fill:var(--vas)">${P.n}</text>`;
    /* pedestal, floor, table and person */
    s+=`<rect x="${f1(L.px-8)}" y="${f1(L.py+46*L.s)}" width="16" height="${f1(L.floor-L.py-46*L.s)}" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
    s+=`<line x1="${L.fx+10}" x2="${L.fx+L.fw-10}" y1="${L.floor}" y2="${L.floor}" class="axis"/>`;
    const pool=P.pool*ramp(m,.1,2.2);
    s+=tilt(L.px,L.py,L.s,ang,{pool,col:'var(--ink)'});
    /* blood drifting from chest toward the legs while upright */
    if(up>.5){const Lb=120*L.s,by=-11*L.s;let dr='';
      for(let i=0;i<6;i++){const u=((m*.55+i/6)%1+1)%1,x=lerp(-.32,.36,u)*Lb;dr+=`<circle cx="${f1(x)}" cy="${f1(by+(i%2?1.5:-1.5)*L.s)}" r="${f1(1.9*L.s)}" style="fill:var(--blood);opacity:${f1(.9*bump(u,0,1)*P.pool)}"/>`}
      s+=`<g transform="translate(${L.px} ${L.py}) rotate(${f1(ang)})">${dr}</g>`;
      const a=ang*Math.PI/180,fx=L.px+Math.cos(a)*Lb*.28+10,fy=L.py+Math.sin(a)*Lb*.28,op=f1(ramp(m,.3,1)),[lx,ly]=L.pl;
      s+=`<path d="M${f1(lx+30)} ${f1(N?ly+8:ly-12)}Q${f1((lx+30+fx)/2)} ${f1(N?fy:ly-12)} ${f1(fx)} ${f1(fy)}" style="fill:none;stroke:var(--blood);stroke-width:1.4;opacity:${op}" marker-end="url(#auArr)"/>`;
      s+=`<text x="${lx}" y="${N?ly:ly+2}" class="t-xs" style="fill:var(--blood);opacity:${op}">venous pooling: ${P.pool>.9?'marked':P.pool>.5?'clear':'mild'}</text>`}
    /* ECG-style strip at the current heart rate */
    const hr=auHR(P,Math.min(m,10)),sb=auSB(P,Math.min(m,10));
    s+=`<text x="${L.tx}" y="${L.hrl}" class="t-sm">PULSE</text><text x="${L.tx+46}" y="${L.hrl}" class="t-lbl" style="fill:var(--vas)">${Math.round(hr)} bpm</text>`;
    s+=pulse(L.ecg[0],L.ecg[1],L.ecg[2],20,{bpm:hr,secs:5,phase:t*60,col:'var(--vas)'});
    /* charts */
    const [hx0,hx1,hy0,hy1]=L.hr,[bx0,bx1,by0,by1]=L.sb;
    s+=chart({x0:hx0,x1:hx1,y0:hy0,y1:hy1,lo:50,hi:140,ticks:[60,80,100,120],f:mm=>auHR(P,mm),base:P.hr0,line:P.hr0+thr(),
      lineLbl:N?`+${thr()} bpm (POTS${teen?', 12–19':''})`:`baseline +${thr()} bpm (POTS${teen?', age 12–19':''})`,m,col:'var(--vas)',unit:'bpm',name:'Heart rate'});
    s+=chart({x0:bx0,x1:bx1,y0:by0,y1:by1,lo:80,hi:140,ticks:[90,110,130],f:mm=>auSB(P,mm),base:P.sb0,line:P.sb0-20,lblBelow:true,
      lineLbl:N?'−20 mmHg (OH)':'baseline −20 mmHg (orthostatic hypotension)',m,col:'var(--dx)',unit:'mmHg',name:'Systolic BP'});
    [-2,0,2,4,6,8,10].forEach(mm=>s+=`<text x="${f1(lerp(bx0,bx1,(mm+2)/12))}" y="${L.xl}" class="t-xs ${mm===10?'t-end':'t-mid'}">${mm<0?'−2':mm}${mm===10?' min':''}</text>`);
    s+=`<text x="${f1(lerp(hx0,hx1,2/12)+4)}" y="${hy1-6}" class="t-xs">tilt</text>`;
    svg.innerHTML=s;
    /* readout and verdict */
    const rise=hr-P.hr0,fall=P.sb0-sb;
    let v='';if(m<.5)v='Baseline: nothing to judge yet.';
    else if(fall>=20)v=`Systolic fall of ${Math.round(fall)} mmHg: orthostatic hypotension, which excludes POTS.`;
    else if(rise>=thr())v=`Heart-rate rise +${Math.round(rise)} bpm with no systolic fall ≥20: the heart-rate pattern of POTS${m<3?' (it must stay up to count)':''}.`;
    else v=`Rise +${Math.round(rise)} bpm, below the ${thr()} bpm threshold; systolic change ${fall>=0?'−':'+'}${Math.abs(Math.round(fall))} mmHg.`;
    $('#auRead').innerHTML=`<span>Minute <b>${m<0?'−'+f1(-m):f1(m)}</b></span><span>HR <b>${Math.round(hr)}</b> (${rise>=0?'+':'−'}${Math.abs(Math.round(rise))})</span><span>Systolic <b>${Math.round(sb)}</b> (${fall>=0?'−':'+'}${Math.abs(Math.round(fall))})</span><span>${v}</span>`;
    const p=phaseOf(AU_STEPS,t);$('#auNote').innerHTML=noteHTML(AU_STEPS[p]);setSt(p);
  }
  const stop=playWire(rg,$('#auPlay'),draw,16000,'Replay','autonomic');
  const setSt=stepWire($('#auSteps'),AU_STEPS,rg,draw,stop);
  $$('[data-aup]').forEach(b=>b.addEventListener('click',()=>{pk=b.dataset.aup;P=AU_P[pk];
    $$('[data-aup]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#auTeen').addEventListener('click',e=>{teen=!teen;e.currentTarget.setAttribute('aria-pressed',teen);draw(+rg.value)});
  draw(+rg.value);

  /* ---- active stand teaching calculator ---- */
  const AU_T=[1,3,5,10],csvg=$('#auCalcSvg');
  const AU_EX={typical:{hr0:66,sb0:118,hr:[80,76,75,76],sb:[114,117,116,117],sym:false},
    pots:{hr0:70,sb0:110,hr:[98,104,106,109],sb:[108,109,107,108],sym:true},
    oh:{hr0:72,sb0:132,hr:[86,88,88,90],sb:[110,106,104,103],sym:true},
    brief:{hr0:68,sb0:116,hr:[101,84,80,79],sb:[110,114,115,115],sym:true}};
  const num=id=>{const v=parseFloat($('#'+id).value);return isFinite(v)?v:null};
  function load(k){const E=AU_EX[k];$('#auCHr0').value=E.hr0;$('#auCSb0').value=E.sb0;
    AU_T.forEach((tt,i)=>{$('#auCHr'+tt).value=E.hr[i];$('#auCSb'+tt).value=E.sb[i]});$('#auCSym').checked=E.sym;calc()}
  function calc(){
    const teenC=$('#auCAge').value==='teen',T=teenC?40:30,hr0=num('auCHr0'),sb0=num('auCSb0'),sym=$('#auCSym').checked;
    const rows=AU_T.map(tt=>{const h=num('auCHr'+tt),b=num('auCSb'+tt);return{tt,rise:h!=null&&hr0!=null?h-hr0:null,fall:b!=null&&sb0!=null?sb0-b:null}});
    const hrMet=rows.filter(r=>r.rise!=null&&r.rise>=T).length,ohMet=rows.filter(r=>r.fall!=null&&r.fall>=20).length;
    const nH=rows.filter(r=>r.rise!=null).length;
    const maxR=rows.reduce((a,r)=>r.rise!=null&&(a==null||r.rise>a.rise)?r:a,null),maxF=rows.reduce((a,r)=>r.fall!=null&&(a==null||r.fall>a.fall)?r:a,null);
    let cls='maybe',txt;
    if(hr0==null||nH===0)txt='Enter a lying heart rate and at least one standing reading.';
    else if(ohMet>=2){cls='no';txt=`Sustained systolic fall of 20 mmHg or more (largest ${Math.round(maxF.fall)} mmHg). These numbers fit orthostatic hypotension, and the published POTS definition requires its absence.`}
    else if(hrMet>=2&&sym){cls='yes';txt=`A rise of ${T} beats/min or more at ${hrMet} of ${nH} standing readings (largest +${Math.round(maxR.rise)} at ${maxR.tt} min), without a sustained systolic fall of 20 mmHg, and symptoms ticked. These numbers would meet the measurement part of the published definition. A diagnosis still needs a clinician: other causes must be ruled out.`}
    else if(hrMet>=2){txt=`The heart-rate rise reaches ${T} beats/min at ${hrMet} readings, but no orthostatic symptoms are ticked. Tachycardia without symptoms does not meet the definition.`}
    else if(hrMet===1){txt=`The rise reaches ${T} beats/min at only one reading (${rows.find(r=>r.rise!=null&&r.rise>=T).tt} min). This tool asks for it at two or more readings to call it sustained.`}
    else{cls='no';txt=`The largest rise is +${Math.round(maxR.rise)} beats/min, below the ${T} beats/min threshold${teenC?' for ages 12–19':''}.`}
    if(ohMet===1&&cls!=='no')txt+=' One reading shows a systolic fall of 20 mmHg or more; watch whether it is sustained.';
    $('#auCalcOut').innerHTML=`<div class="verdict ${cls}">${txt}</div>`;
    /* chart: rise bars up, fall bars down */
    const N=vb(csvg,'440 262','400 262'),x0=40,x1=N?390:430,yM=132,k=2.0;
    let s=`<line x1="${x0}" x2="${x1}" y1="${yM}" y2="${yM}" class="axis"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(yM-T*k)}" y2="${f1(yM-T*k)}" style="stroke:var(--vas);stroke-width:1.4;stroke-dasharray:6 4"/><line x1="${x0}" x2="${x0+22}" y1="252" y2="252" style="stroke:var(--vas);stroke-width:1.4;stroke-dasharray:5 3"/><text x="${x0+28}" y="255" class="t-xs" style="fill:var(--vas)">HR rise +${T}</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(yM+20*k)}" y2="${f1(yM+20*k)}" style="stroke:var(--dx);stroke-width:1.4;stroke-dasharray:6 4"/><line x1="${x0+150}" x2="${x0+172}" y1="252" y2="252" style="stroke:var(--dx);stroke-width:1.4;stroke-dasharray:5 3"/><text x="${x0+178}" y="255" class="t-xs" style="fill:var(--dx)">systolic fall 20 mmHg</text>`;
    
    const gw=(x1-x0)/4;
    rows.forEach((r,i)=>{const cx=x0+gw*(i+.5),bw=24;
      if(r.rise!=null){const h=clamp(r.rise,-10,48)*k;s+=`<rect x="${f1(cx-bw-2)}" y="${f1(Math.min(yM,yM-h))}" width="${bw}" height="${f1(Math.abs(h))}" rx="3" style="fill:var(--vas);opacity:${r.rise>=T?1:.45}"/><text x="${f1(cx-bw/2-2)}" y="${f1(Math.min(yM,yM-h)-4)}" class="t-xs t-mid" style="fill:var(--ink)">${r.rise>=0?'+':''}${Math.round(r.rise)}</text>`}
      if(r.fall!=null){const h=clamp(r.fall,-10,45)*k;s+=`<rect x="${f1(cx+2)}" y="${f1(Math.min(yM,yM+h))}" width="${bw}" height="${f1(Math.abs(h))}" rx="3" style="fill:var(--dx);opacity:${r.fall>=20?1:.45}"/><text x="${f1(cx+bw/2+2)}" y="${f1(Math.max(yM,yM+h)+12)}" class="t-xs t-mid" style="fill:var(--ink)">${r.fall>=0?'−':'+'}${Math.abs(Math.round(r.fall))}</text>`}
      s+=`<text x="${f1(cx)}" y="14" class="t-sm t-mid">${r.tt} min</text>`});
    csvg.innerHTML=s}
  $$('#m-autonomic .auc input,#auCAge').forEach(el=>el.addEventListener('input',calc));
  $('#auCAge').addEventListener('change',calc);$('#auCSym').addEventListener('change',calc);
  $$('[data-auex]').forEach(b=>b.addEventListener('click',()=>{load(b.dataset.auex);$$('[data-auex]').forEach(x=>x.setAttribute('aria-pressed',x===b))}));
  $('#auCReset').addEventListener('click',()=>{$$('#m-autonomic .auc input[type=number]').forEach(i=>i.value='');$('#auCSym').checked=false;$$('[data-auex]').forEach(x=>x.setAttribute('aria-pressed','false'));calc()});
  load('pots');$('[data-auex="pots"]').setAttribute('aria-pressed','true');

  /* ---- cohort bars ---- */
  const hsvg=$('#auCohSvg');let showC=false;
  function drawC(){const N=vb(hsvg,'720 330','400 520');
    const lx=N?14:20,bx=N?14:300,bw=N?300:330,rh=N?60:34;let s='',y=N?24:26;
    [[0,'Orthostatic problems in people with hypermobility'],[1,'Hypermobility in people with POTS']].forEach(([g,h])=>{
      s+=`<text x="${lx}" y="${y}" class="t-lbl">${h}</text>`;y+=12;
      AU_COH.filter(r=>r.g===g).forEach(r=>{
        if(N){s+=`<text x="${lx}" y="${y+14}" class="t-xs" style="fill:var(--ink);font-weight:600">${r.l}</text><text x="${lx}" y="${y+27}" class="t-xs">${r.s}</text>`}
        else{s+=`<text x="${lx}" y="${y+13}" class="t-xs" style="fill:var(--ink);font-weight:600">${r.l}</text><text x="${lx}" y="${y+25}" class="t-xs">${r.s}</text>`}
        const yy=N?y+33:y+5,hh=showC&&r.c!=null?11:(N?13:16);
        s+=`<rect x="${bx}" y="${yy}" width="${bw}" height="${hh}" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${yy}" width="${f1(bw*r.v/100)}" height="${hh}" rx="3" style="fill:${g?'var(--dx)':'var(--vas)'}"/>`;
        s+=`<text x="${f1(bx+bw*r.v/100+6)}" y="${yy+hh-2}" class="t-sm" style="fill:var(--ink)">${r.v}%</text>`;
        if(showC&&r.c!=null){s+=`<rect x="${bx}" y="${yy+13}" width="${f1(bw*r.c/100)}" height="9" rx="3" style="fill:var(--muted);opacity:.6"/><text x="${f1(bx+bw*r.c/100+6)}" y="${yy+21}" class="t-xs">${r.c}% controls</text>`}
        y+=rh});
      y+=10});
    s+=N?`<text x="${lx}" y="${y+2}" class="t-xs">Clinic and programme cohorts:</text><text x="${lx}" y="${y+15}" class="t-xs">percentages are not population prevalence.</text>`:`<text x="${lx}" y="${y+2}" class="t-xs">Clinic and programme cohorts; percentages are not population prevalence.</text>`;
    hsvg.innerHTML=s}
  $('#auCohCtl').addEventListener('click',e=>{showC=!showC;e.currentTarget.setAttribute('aria-pressed',showC);drawC()});
  drawC();
  const prevR=redraws.autonomic;redraws.autonomic=()=>{prevR&&prevR();calc();drawC()};
};
