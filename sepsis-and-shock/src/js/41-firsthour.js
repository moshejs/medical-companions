/* =============== 4.1 The first hour: bundle & antibiotics =============== */
/* the five Hour-1 elements; m = the schematic minute each one starts on the clock (illustrative, not a standard) */
const FH_EL=[
 {m:8,n:'Lactate',q:'"measure lactate level and remeasure lactate level if initial lactate is >2 mmol/L"'},
 {m:15,n:'Cultures',q:'"obtain blood cultures before administering antibiotics"'},
 {m:24,n:'Antibiotics',q:'"administer broad-spectrum antibiotics"'},
 {m:31,n:'Fluids',q:'"begin rapid administration of 30 mL/kg crystalloid for hypotension or lactate ≥4 mmol/L"'},
 {m:44,n:'Pressor',q:'"apply vasopressor if hypotension is present during or after fluid resuscitation to maintain a mean arterial pressure ≥65 mmHg"'}];
const FH_STEPS=[
 {from:0,at:.03,k:'Minute 0 · time zero',t:'Sepsis is recognised',
  txt:`SSC 2021: "Sepsis and septic shock are medical emergencies, and we recommend that treatment and resuscitation begin immediately" (best practice statement). The SSC 2018 bundle update introduced the "Hour-1 bundle", whose five elements are meant to be started within the first hour. The 2018 paper is paywalled, so its wording here comes from a verbatim listing in an open-access compliance study. [[Evans2021SSC,Levy2018Bundle,Wang2021Hour1]]`,
  pt:`Sepsis is an emergency. Once a hospital team suspects it, they start several things at once, as quickly as they can.`,
  hook:`Hour-1 bundle: lactate (remeasure if >2), blood cultures before antibiotics, broad-spectrum antibiotics, 30 mL/kg crystalloid for hypotension or lactate ≥4, vasopressors for MAP ≥65. [[Wang2021Hour1,Levy2018Bundle]]`},
 {from:.1,at:.2,k:'Element 1 · lactate',t:'Measure lactate',
  txt:`As published, the bundle's first element is to ${FH_EL[0].q}. SSC 2021 suggests measuring blood lactate in adults suspected of having sepsis (weak, low quality), as an adjunct: lactate alone cannot rule sepsis in or out. A missed 3- or 6-hour lactate was the commonest reason for failing the US SEP-1 measure (40% of failures). [[Wang2021Hour1,Levy2018Bundle,Evans2021SSC,Rhee2018SEP1]]`,
  pt:`A blood test for lactate gives the team a sense of how stressed the body is, and it is often repeated.`,
  hook:`Remeasure lactate if the first value is above 2 mmol/L. <button class="btn ghost" data-go="tests">Lactate →</button>`},
 {from:.217,at:.31,k:'Element 2 · cultures',t:'Blood cultures before antibiotics',
  txt:`The bundle says to ${FH_EL[1].q}. SSC 2021 frames this as taking cultures first only "if it results in no substantial delay in the start of antimicrobials (i.e. &lt; 45 min)". Cultures drawn after antimicrobials were positive in 19.4% of patients, against 31.4% before. [[Wang2021Hour1,Levy2018Bundle,Evans2021SSC,Cheng2019Cultures]]`,
  pt:`Blood samples are taken to grow the germ, ideally before antibiotics. Antibiotics should not wait long for them.`},
 {from:.367,at:.46,k:'Element 3 · antibiotics',t:'Broad-spectrum antibiotics',
  txt:`The bundle says to ${FH_EL[2].q}. SSC 2021 recommends antimicrobials "immediately, ideally within 1 h of recognition" for possible septic shock or a high likelihood of sepsis (strong), and suggests rapid investigation with antimicrobials within 3 h if concern persists for possible sepsis without shock (weak). Choosing the right drug matters too: survival in septic shock was 52.0% after appropriate and 10.3% after inappropriate initial therapy (Kumar 2009). [[Wang2021Hour1,Levy2018Bundle,Evans2021SSC,Kumar2009Inappropriate]]`,
  pt:`Antibiotics are started quickly, through a drip. When shock is possible, guidelines say to give them within an hour.`,
  hook:`SSC 2021: ≤1 h for possible shock or high likelihood of sepsis; ≤3 h after rapid assessment for possible sepsis without shock. [[Evans2021SSC]]`},
 {from:.483,at:.6,k:'Element 4 · fluids',t:'Crystalloid for hypotension or high lactate',
  txt:`The bundle says to ${FH_EL[3].q}. SSC 2021 suggests at least 30 mL/kg of IV crystalloid within the first 3 h for sepsis-induced hypoperfusion or septic shock (weak, low quality), based on observational evidence. In the New York cohort, time to completing the fluid bolus was not associated with mortality (OR 1.01 per hour). SMFM 2023 recommends 1 to 2 L in pregnancy. [[Wang2021Hour1,Levy2018Bundle,Evans2021SSC,Seymour2017Timing,SMFM2023Sepsis]]`,
  pt:`A drip of salt-based fluid is given to help raise blood pressure and blood flow. How much depends on the person.`,
  hook:`30 mL/kg is a weak SSC 2021 suggestion on observational evidence. <button class="btn ghost" data-go="fluids">Fluids →</button>`},
 {from:.7,at:.85,k:'Element 5 · vasopressor',t:'A vasopressor for MAP ≥65',
  txt:`The bundle says to ${FH_EL[4].q}. SSC 2021 recommends an initial MAP target of 65 mm Hg over higher targets (strong, moderate quality) and suggests starting vasopressors peripherally rather than waiting for central access, for a short time and in a vein at or above the antecubital fossa (weak, very low quality). It suggests ICU admission within 6 h for those who need it. [[Wang2021Hour1,Levy2018Bundle,Evans2021SSC]]`,
  pt:`If blood pressure stays low after fluids, a medicine that tightens blood vessels is given by a pump.`,
  hook:`MAP target 65 mm Hg (strong). <button class="btn ghost" data-go="pressors">Vasopressors →</button>`}];
const FA_SER=[{k:'Kumar 2006',or:1.119,col:'var(--bad)',d:'septic shock, from hypotension'},{k:'Peltan 2019',or:1.10,col:'var(--accent)',d:'1-year deaths, from ED arrival'},{k:'Liu 2017',or:1.09,col:'var(--warn)',d:'from ED registration'},{k:'Seymour 2017',or:1.04,col:'var(--rx)',d:'New York, to antibiotics'}];
const FA_LIU=[['sepsis',.3],['severe sepsis',.4],['shock',1.8]];
const FE_T=[
 {n:'Rivers 2001',d:'263 patients, 1 centre · in-hospital',b:[['EGDT',30.5],['standard therapy',46.5]]},
 {n:'ProCESS 2014',d:'1,341 patients, 31 US EDs · 60-day',b:[['EGDT',21.0],['protocol standard',18.2],['usual care',18.9]]},
 {n:'ARISE 2014',d:'1,600 patients, 51 centres · 90-day',b:[['EGDT',18.6],['usual care',18.8]]},
 {n:'ProMISe 2015',d:'1,260 patients, 56 English hospitals · 90-day',b:[['EGDT',29.5],['usual care',29.2]]},
 {n:'PRISM 2017',d:'3,723 patients pooled · 90-day',b:[['EGDT',24.9],['usual care',25.4]]}];
const FE_STEPS=[
 {from:0,at:.14,k:'2001 · one centre',t:'Rivers: a big effect',
  txt:`Rivers 2001 randomised 263 ED patients with severe sepsis or septic shock at one centre to 6 hours of early goal-directed therapy (EGDT) or standard therapy. In-hospital mortality was 30.5% with EGDT and 46.5% with standard therapy (P = 0.009). [[Rivers2001EGDT]]`,
  pt:`An early single-hospital trial suggested that a strict treatment protocol in the first hours saved many lives.`},
 {from:.2,at:.34,k:'2014 · United States',t:'ProCESS: no benefit',
  txt:`ProCESS (1,341 patients, 31 US EDs) found 60-day in-hospital mortality of 21.0% with protocol EGDT, 18.2% with protocol standard therapy and 18.9% with usual care (RR protocol vs usual 1.04, 0.82–1.31). [[ProCESS2014]]`,
  pt:`A much larger trial found that following the strict protocol did not do better than good usual care.`},
 {from:.4,at:.54,k:'2014 · Australasia',t:'ARISE: no benefit',
  txt:`ARISE (1,600 patients, 51 centres, mainly Australia and New Zealand) found 90-day mortality of 18.6% with EGDT and 18.8% with usual care (difference −0.3 percentage points, −4.1 to 3.6). [[ARISE2014]]`},
 {from:.6,at:.74,k:'2015 · England',t:'ProMISe: no benefit, more cost',
  txt:`ProMISe (1,260 patients, 56 English hospitals) found 90-day mortality of 29.5% with EGDT and 29.2% with usual care (RR 1.01, 0.85–1.20). EGDT raised costs, and the probability that it was cost-effective was below 20%. [[Mouncey2015ProMISe]]`},
 {from:.8,at:.92,k:'2017 · pooled',t:'PRISM: the verdict',
  txt:`PRISM pooled individual data from 3,723 patients at 138 hospitals in ProCESS, ARISE and ProMISe. 90-day mortality was 24.9% with EGDT and 25.4% with usual care (adjusted OR 0.97, 0.82–1.14); EGDT increased ICU use and costs, with no benefit even in subgroups with worse shock (higher lactate, or hypotension plus hyperlactataemia). [[PRISM2017]]`,
  pt:`When the three big trials were combined, the strict protocol still did not save more lives. Early recognition, antibiotics and fluids remain the core of care.`,
  hook:`Rivers 2001 EGDT cut mortality from 46.5% to 30.5%; ProCESS, ARISE, ProMISe and PRISM found no benefit over usual care. [[Rivers2001EGDT,PRISM2017]]`}];
function fhBottle(x,y,s,lev){const w=20*s,h=34*s;let g=`<rect x="${f1(x-5*s)}" y="${f1(y)}" width="${f1(10*s)}" height="${f1(5*s)}" rx="${f1(2*s)}" style="fill:var(--dx)"/><rect x="${f1(x-w/2)}" y="${f1(y+8*s)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(4*s)}" style="fill:var(--panel);stroke:var(--device);stroke-width:1.2"/>`;
  const lh=(h-4*s)*clamp(lev);if(lh>.5)g+=`<rect x="${f1(x-w/2+2*s)}" y="${f1(y+8*s+h-2*s-lh)}" width="${f1(w-4*s)}" height="${f1(lh)}" rx="${f1(3*s)}" style="fill:var(--blood-soft);stroke:var(--clot);stroke-width:.6"/>`;return g}
function fhWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c.trim());c=x}else c+=' '+x});if(c.trim())L.push(c.trim());return L}
inits.firsthour=()=>{
  /* ---- 1. the Hour-1 clock ---- */
  const svg=$('#fhSvg'),rg=$('#fhT');
  function tile(k,B,min,N){const E=FH_EL[k],e=ramp(min,E.m,E.m+5),run=ramp(min,E.m,60),on=e>0,cx=B.x+B.w/2;
    let s=`<rect x="${f1(B.x)}" y="${f1(B.y)}" width="${f1(B.w)}" height="${f1(B.h)}" rx="10" style="fill:${on?'var(--rx-soft)':'var(--panel)'};stroke:${on?'var(--rx)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
    s+=`<text x="${f1(B.x+8)}" y="${f1(B.y+16)}" class="t-lbl" style="font-size:11.5px;fill:${on?'var(--rx)':'var(--muted)'}">${k+1} · ${E.n}</text>`;
    s+=`<g style="opacity:${f1(.35+.65*e)}">`;const iy=B.y+26,ih=B.h-52;
    if(k===0){const v=4.4*e;s+=lactateMeter(cx-8,iy+14,16,ih-34,v,10,{bands:[{from:0,to:2,col:'var(--good)'},{from:2,to:10,col:'var(--warn)'}],val:e>0,label:''});
      if(min>E.m+6)s+=`<text x="${f1(cx)}" y="${f1(B.y+B.h-22)}" class="t-xs t-mid" style="fill:var(--ink)">&gt;2: remeasure</text>`}
    else if(k===1){const sc=N?1.05:1.2;[0,1].forEach(j=>{s+=fhBottle(cx-15+j*30,iy+10,sc,ramp(min,E.m+j*2,E.m+4+j*2))});
      s+=`<text x="${f1(cx)}" y="${f1(iy+10+46*sc+12)}" class="t-xs t-mid" style="fill:var(--ink)">before antibiotics</text>`}
    else if(k===2)s+=ivBag(cx,iy+4,N?.8:.9,{col:'var(--rx)',label:'abx',fill:1-.6*run,ph:min*.35,drip:on,to:[cx,iy+ih-2]}).svg;
    else if(k===3){s+=ivBag(cx,iy+4,N?.8:.9,{col:'var(--fluid)',label:'fluid',fill:1-.85*run,ph:min*.5,drip:on,to:[cx,iy+ih-14]}).svg;
      s+=`<text x="${f1(cx)}" y="${f1(B.y+B.h-22)}" class="t-xs t-mid" style="fill:var(--ink)">30 mL/kg</text>`}
    else{const map=52+8*ramp(min,31,44)+16*ramp(min,44,58),pw=Math.min(B.w-16,84);
      s+=pump(cx-pw/2,iy+2,pw,34,{v:run,txt:'pressor',on}).svg;
      const gr=N?24:28,gy=B.y+B.h-28;s+=gauge(cx,gy,gr,map,120,{ticks:false,bands:[{to:65,col:'var(--warn)'},{to:120,col:'var(--good)'}]});
      const a=Math.PI*(1-65/120);s+=`<text x="${f1(cx+(gr+8)*Math.cos(a))}" y="${f1(gy-(gr+8)*Math.sin(a)+3)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">65</text>`;
      s+=`<text x="${f1(cx)}" y="${f1(gy+12)}" class="t-xs t-mid">MAP</text>`}
    s+=`</g><text x="${f1(cx)}" y="${f1(B.y+B.h-7)}" class="t-xs t-mid" style="fill:${on?'var(--rx)':'var(--muted)'};font-weight:600">${on?'started, min '+E.m:'not yet'}</text>`;
    return s}
  function draw(t){const N=vb(svg,'720 380','400 650'),p=phaseOf(FH_STEPS,t),st=FH_STEPS[p],min=t*60;
    const C=N?{cx:200,cy:92,r:70}:{cx:112,cy:132,r:84};
    let s=clock(C.cx,C.cy,C.r,min,{full:60,col:'var(--rx)',marks:FH_EL.filter(E=>min>=E.m).map(E=>({min:E.m,col:'var(--rx)'})),label:'minutes since sepsis was recognised'});
    s+=`<text x="${C.cx}" y="${C.cy+C.r+36}" class="t-big t-mid" style="font-size:22px;fill:var(--rx)">${Math.floor(min)} min</text>`;
    const T=[];if(N){const w=(376-12)/3,h=148;for(let k=0;k<5;k++){const r=k<3?0:1,c=k<3?k:k-3;T.push({x:12+c*(w+6)+(r?(w+6)/2:0),y:212+r*(h+8),w,h})}}
    else{const w=(708-226-24)/5;for(let k=0;k<5;k++)T.push({x:226+k*(w+6),y:20,w,h:220})}
    T.forEach((B,k)=>{s+=tile(k,B,min,N)});
    const K=N?{x:12,y:530,w:376,h:110}:{x:12,y:272,w:696,h:98};
    s+=`<rect x="${K.x}" y="${K.y}" width="${K.w}" height="${K.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const head=p===0?'SSC 2021, as published:':`Hour-1 bundle element ${p} (SSC 2018), as published:`,
      q=p===0?'"Sepsis and septic shock are medical emergencies, and we recommend that treatment and resuscitation begin immediately"':FH_EL[p-1].q;
    s+=`<text x="${K.x+12}" y="${K.y+20}" class="t-xs" style="fill:var(--rx);font-weight:700">${head}</text>`;
    fhWrap(q,N?58:96).forEach((l,j)=>{s+=`<text x="${K.x+12}" y="${K.y+40+j*(N?16:18)}" class="${N?'t-xs':'t-sm'}" style="fill:var(--ink)">${l.replace(/>/g,'&gt;')}</text>`});
    svg.innerHTML=s;setSt(p);
    const done=FH_EL.filter(E=>min>=E.m).length;
    $('#fhRead').innerHTML=`<span>minute <b>${Math.floor(min)}</b></span><span>elements started <b>${done} of 5</b></span>`;
    $('#fhNote').innerHTML=noteHTML(st)}
  const stop=playWire(rg,$('#fhPlay'),draw,26000,'%t:player.replay%','firsthour');
  const setSt=stepWire($('#fhSteps'),FH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- 2. time to antibiotics ---- */
  const fa=$('#faSvg'),frg=$('#faT');
  function drawA(t){const N=vb(fa,'720 320','400 540'),h=t*6,G=N?{x:44,y:20,w:336,h:250}:{x:56,y:20,w:400,h:250},X=v=>G.x+G.w*v/6,Y=v=>G.y+G.h-G.h*(v-1)/1;
    let s=`<rect x="${G.x}" y="${G.y}" width="${G.w}" height="${G.h}" style="fill:var(--field)"/>`;
    for(let v=1;v<=2.001;v+=.25)s+=`<line x1="${G.x}" x2="${G.x+G.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${G.x-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">×${v.toFixed(2)}</text>`;
    for(let k=0;k<=6;k++)s+=`<text x="${f1(X(k))}" y="${G.y+G.h+13}" class="t-xs t-mid">${k} h</text>`;
    s+=`<line x1="${G.x}" x2="${G.x+G.w}" y1="${G.y+G.h}" y2="${G.y+G.h}" class="axis"/><line x1="${G.x}" x2="${G.x}" y1="${G.y}" y2="${G.y+G.h}" class="axis"/>`;
    s+=`<text x="${G.x+4}" y="${G.y+12}" class="t-xs" style="fill:var(--ink)">relative odds of death vs no delay</text><text x="${G.x+G.w}" y="${G.y+G.h+26}" class="t-xs t-end">hours of delay</text>`;
    FA_SER.forEach((S,i)=>{let d='';for(let k=0;k<=60;k++){const u=k/10;d+=(k?'L':'M')+f1(X(u))+' '+f1(Y(Math.pow(S.or,u)))}
      s+=`<path d="${d}" style="fill:none;stroke:${S.col};stroke-width:2.4;opacity:.85"/>`;
      const v=Math.pow(S.or,h);s+=`<circle cx="${f1(X(h))}" cy="${f1(Y(v))}" r="4.6" style="fill:${S.col};stroke:var(--panel);stroke-width:1.5"/>`;
      const ly=Y(Math.pow(S.or,6));s+=`<text x="${G.x+G.w-4}" y="${f1(ly+(i===2?12:-5))}" class="t-xs t-end" style="fill:${S.col};font-weight:700">${S.k} · ${S.or}/h</text>`});
    s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${G.y}" y2="${G.y+G.h}" style="stroke:var(--ink);stroke-dasharray:3 3;opacity:.6"/>`;
    const L=N?{x:20,y:330,w:360}:{x:486,y:30,w:222},bw=N?L.w-120:L.w-90;
    s+=`<text x="${L.x}" y="${L.y}" class="t-xs" style="fill:var(--ink);font-weight:700">Liu 2017: absolute mortality</text><text x="${L.x}" y="${L.y+13}" class="t-xs" style="fill:var(--ink);font-weight:700">increase per hour of delay</text>`;
    FA_LIU.forEach(([lab,v],i)=>{const y=L.y+30+i*34;s+=`<text x="${L.x}" y="${y+10}" class="t-xs">${lab}</text><rect x="${L.x}" y="${y+14}" width="${bw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${L.x}" y="${y+14}" width="${f1(bw*v/2)}" height="12" rx="3" style="fill:${i===2?'var(--bad)':'var(--warn)'}"/><text x="${f1(L.x+bw*v/2+5)}" y="${y+24}" class="t-xs" style="fill:var(--ink);font-weight:700">${v}%</text>`});
    const ny=L.y+30+3*34+8;['Strongest in shock: Im 2022 found','benefit within 1 h in septic shock','(OR 0.66) but not without shock'].forEach((l,j)=>{s+=`<text x="${L.x}" y="${ny+j*13}" class="t-xs">${l}</text>`});
    fa.innerHTML=s;
    $('#faRead').innerHTML=`<span>delay <b>${h.toFixed(1)} h</b></span>`+FA_SER.map(S=>`<span>${S.k} <b>×${Math.pow(S.or,h).toFixed(2)}</b></span>`).join('');
    $('#faNote').innerHTML=`<div class="kicker">Average associations, not predictions</div><h4>${h<1?'Within the first hour':h<3?'Between 1 and 3 hours':'Beyond 3 hours'}</h4>
      <p>Kumar 2006 reported an adjusted odds ratio for death of 1.119 for each hour of delay in effective antimicrobials after hypotension began in septic shock; in New York, each hour to antibiotics carried an OR of 1.04; at Kaiser Permanente, 1.09 per hour from registration; in Utah, 10% higher odds of death at 1 year per hour from arrival. [[Kumar2006Delay,Seymour2017Timing,Liu2017Antibiotics,Peltan2019Door]]</p>
      <p>The effect was strongest in shock: Liu 2017's absolute increase per hour was 0.3% in sepsis, 0.4% in severe sepsis and 1.8% in shock, and Im 2022 found each 1-h delay within 3 h carried a 35% higher mortality risk in septic shock, with no such trend without shock. A meta-analysis found no significant difference at the 1-h or 3-h thresholds. [[Liu2017Antibiotics,Im2022Antibiotics,Sterling2015Meta]]</p>
      <div class="pt"><b>%t:note.plain%</b>In studies, each hour of delay before antibiotics was linked to worse outcomes on average, especially in septic shock. These are population figures, not predictions for one person. [[Liu2017Antibiotics,Im2022Antibiotics]]</div>`}
  playWire(frg,$('#faPlay'),drawA,12000,'%t:player.replay%','firsthour');
  drawA(+frg.value);

  /* ---- 3. EGDT trials ---- */
  const fe=$('#feSvg'),erg=$('#feT');
  function drawE(t){const N=vb(fe,'720 320','400 400'),p=phaseOf(FE_STEPS,t),st=FE_STEPS[p];
    const lx=N?12:12,bx=N?12:236,bw=N?300:400,X=v=>bx+bw*v/50;let s='',y=N?14:12;
    if(!N){[0,10,20,30,40,50].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="8" y2="300" class="grid"/><text x="${f1(X(v))}" y="314" class="t-xs t-mid">${v}%</text>`})}
    FE_T.forEach((T,i)=>{const g=ease(ramp(t,FE_STEPS[i].from,FE_STEPS[i].from+.1)),on=i===p,op=t>=FE_STEPS[i].from?1:.3;
      s+=`<g style="opacity:${op}">`;
      if(N){s+=`<text x="${lx}" y="${y+10}" class="t-lbl" style="font-size:12px;fill:${on?'var(--rx)':'var(--ink)'}">${T.n}</text><text x="${lx+96}" y="${y+10}" class="t-xs">${T.d}</text>`;y+=16}
      else{s+=`<text x="${lx}" y="${y+12}" class="t-lbl" style="font-size:12.5px;fill:${on?'var(--rx)':'var(--ink)'}">${T.n}</text><text x="${lx}" y="${y+25}" class="t-xs">${T.d.split(' · ')[0]}</text><text x="${lx}" y="${y+37}" class="t-xs">${T.d.split(' · ')[1]} mortality</text>`}
      T.b.forEach(([lab,v],j)=>{const yy=y+j*16,w=bw*v/50*g;
        s+=`<rect x="${bx}" y="${yy+2}" width="${f1(w)}" height="12" rx="3" style="fill:${j===0?'var(--rx)':'var(--muted)'};opacity:${on?1:.7}"/><text x="${f1(bx+w+5)}" y="${yy+12}" class="t-xs" style="fill:var(--ink);opacity:${f1(g)}"><tspan style="font-weight:700">${v}%</tspan> ${lab}</text>`});
      const bh=N?T.b.length*16:Math.max(T.b.length*16,40);
      if(on)s+=`<rect x="${lx-6}" y="${y-(N?20:4)}" width="${N?388:708}" height="${bh+(N?24:8)}" rx="8" style="fill:none;stroke:var(--rx);stroke-width:1.2;opacity:.6"/>`;
      s+=`</g>`;y+=bh+(N?22:14)});
    if(N){[0,25,50].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${y+4}" class="t-xs t-mid">${v}%</text>`})}
    fe.innerHTML=s;setE(p);$('#feNote').innerHTML=noteHTML(st)}
  const stopE=playWire(erg,$('#fePlay'),drawE,22000,'%t:player.replay%','firsthour');
  const setE=stepWire($('#feSteps'),FE_STEPS,erg,drawE,stopE);
  drawE(+erg.value);
};
