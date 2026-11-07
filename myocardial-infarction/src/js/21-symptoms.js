/* =============== 2.1 Symptoms & who presents differently =============== */
const SY_STEPS=[
 {from:0,at:.08,k:'Where it is felt',t:'Pressure in the chest',
  txt:`The commonest symptom in both sexes is chest pain or discomfort: pressure, tightness, heaviness or pain. In VIRGO (2009 women and 976 men aged 18–55 with MI), chest pain was present in 87.0% of women and 89.5% of men. In a Scottish emergency department study using sex-specific troponin thresholds, it was the presenting symptom in 92% of women and 91% of men. [[Lichtman2018VIRGO,Ferry2019]]`,
  pt:`Most women and most men having a heart attack have chest pain or chest discomfort. It may feel like pressure or squeezing rather than sharp pain.`,
  hook:`Chest pain is the main symptom in women as well as men (VIRGO 87.0% vs 89.5%). [[Lichtman2018VIRGO]]`},
 {from:.17,at:.25,k:'Where it spreads',t:'Arm, jaw, neck, back, upper belly',
  txt:`UDMI4 describes ischaemic discomfort in the chest, upper limbs, jaw (mandible) or upper belly (epigastrium), at rest or on exertion. The ESC counts arm, neck or jaw pain and epigastric pain as chest pain-equivalents. In a JAMA review, pain spreading to both arms was among the most useful history features for acute coronary syndrome (likelihood ratio 2.6). [[Thygesen2018UDMI4C,Byrne2023ESC,Fanaroff2015]]`,
  pt:`The pain can spread to either arm, the neck, the jaw, the back or the upper belly. Sometimes it is felt there more than in the chest.`,
  hook:`ESC chest pain-equivalents: dyspnoea, epigastric pain, left or right arm pain, neck or jaw pain. [[Byrne2023ESC]]`},
 {from:.34,at:.42,k:'What comes with it',t:'Breathlessness, nausea, light-headedness',
  txt:`Extra symptoms are common. In VIRGO, women were more likely than men to report three or more additional symptoms (61.9% vs 54.8%), such as epigastric symptoms, palpitations, and pain in the jaw, neck, arms or between the shoulder blades. US surveys count weakness or light-headedness and shortness of breath among the five common heart attack symptoms. [[Lichtman2018VIRGO,Fang2019MMWR]]`,
  pt:`Women more often have extra symptoms on top of chest pain, like feeling sick, breathlessness, palpitations, or pain between the shoulder blades.`,
  hook:`More extra symptoms in women does not mean less chest pain: both are true in VIRGO. [[Lichtman2018VIRGO]]`},
 {from:.5,at:.58,k:'No chest pain',t:'One in three without chest pain',
  txt:`In NRMI-2 (434,877 US patients with confirmed MI, 1994–1998), 33% had no chest pain when they reached hospital. Across 1.14 million NRMI patients (1994–2006), more women than men presented without chest pain (42.0% vs 30.7%). In the GRACE registry of acute coronary syndromes, the figure was 8.4%: studies differ in who they include. [[Canto2000,Canto2012,Brieger2004]]`,
  pt:`About 1 in 3 people with a heart attack in one large US registry had no chest pain at all when they arrived.`,
  hook:`NRMI-2: one in three MIs arrived without chest pain. [[Canto2000]]`},
 {from:.67,at:.74,k:'Who',t:'Older, women, diabetes',
  txt:`People who arrived without chest pain were on average 7 years older (74.2 vs 66.9 years), more often women (49.0% vs 38.0%), and more often had diabetes (32.6% vs 25.4%) or earlier heart failure (26.4% vs 12.3%). The sex gap narrows with age: the adjusted odds ratio for no chest pain in women versus men was 1.30 under 45 and 1.03 at 75 or older. [[Canto2000,Canto2012]]`,
  pt:`Heart attacks without chest pain were more common in older people, women and people with diabetes. These are differences between groups, not anyone's fault.`,
  hook:`No chest pain: think older, female, diabetes, prior heart failure. [[Canto2000]]`},
 {from:.84,at:.92,k:'Why it matters',t:'Later arrival, less treatment',
  txt:`Without chest pain, people arrived later (mean 7.9 vs 5.3 hours), were less often diagnosed with MI on admission (22.2% vs 50.3%), and less often received treatment to reopen the artery (25.3% vs 74.0%). In-hospital mortality was 23.3% vs 9.3% (adjusted OR 2.21). These are population statistics from 1994–1998. [[Canto2000]]`,
  pt:`When a heart attack does not look the way people expect, help often comes later. Calling early, whatever the symptoms, gives the best chance of fast treatment.`,
  hook:`No chest pain in NRMI-2: later arrival, fewer reperfused, in-hospital mortality 23.3% vs 9.3%. [[Canto2000]]`}
];
const SY_LENS={
 women:{n:'Women',read:[['chest pain (VIRGO)','87.0%'],['chest pain (Ferry 2019)','92%'],['≥3 extra symptoms','61.9%'],['no chest pain (NRMI)','42.0%']],
  kv:`In VIRGO, women put their symptoms down to stress or anxiety more often than men (20.9% vs 11.8%), and 53% of women who had sought care earlier for similar symptoms were told they were probably not heart-related (37% of men). In the Scottish study, symptoms classed as "typical" were more common in women than men with type 1 MI (77% vs 59%), and sex-specific troponin thresholds reclassified 30% of women with type 1 MI who a uniform threshold had missed. [[Lichtman2018VIRGO,Ferry2019]]`,
  w:{chest:1,larm:.85,rarm:.85,jaw:1,neck:1,epi:1,back:1,lshoulder:.7,rshoulder:.7}},
 men:{n:'Men',read:[['chest pain (VIRGO)','89.5%'],['chest pain (Ferry 2019)','91%'],['≥3 extra symptoms','54.8%'],['no chest pain (NRMI)','30.7%']],
  kv:`In VIRGO, men were more likely than women to put their symptoms down to muscle pain (21.2% vs 15.4%). 22.1% of men had sought care for similar symptoms before the MI. In the Scottish study, three or more "typical" features had a positive likelihood ratio for MI of only 1.09 in men and 1.18 in women: features alone discriminate poorly in both sexes. [[Lichtman2018VIRGO,Ferry2019]]`,
  w:{chest:1,larm:1,rarm:.8,jaw:.7,neck:.7,epi:.6,back:.6,lshoulder:.7,rshoulder:.6}},
 older:{n:'Older people',read:[['mean age, no chest pain','74.2 y'],['mean age, chest pain','66.9 y'],['sex gap (OR) under 45','1.30'],['sex gap (OR) at 75+','1.03']],
  kv:`In NRMI-2, people who arrived without chest pain were on average 7 years older. In the larger NRMI analysis, the difference between women and men shrank with age, and among younger people without chest pain women had higher in-hospital mortality than men (adjusted OR 1.18 under 45), a difference that reversed at 75 or older (OR 0.81). A review of 42 studies found older people more likely to arrive at hospital later. [[Canto2000,Canto2012,Nguyen2010]]`,
  w:{chest:.55,larm:.6,rarm:.6,jaw:.6,neck:.6,epi:.6,back:.6,lshoulder:.5,rshoulder:.5}},
 diabetes:{n:'Diabetes',read:[['diabetes, no chest pain','32.6%'],['diabetes, chest pain','25.4%'],['prior heart failure, no chest pain','26.4%'],['prior heart failure, chest pain','12.3%']],
  kv:`In NRMI-2, diabetes was more common among people who arrived without chest pain (32.6%) than among those with chest pain (25.4%). The registry reports this difference; it does not give the share of people with diabetes who had no chest pain, so the right reading is "people with diabetes are over-represented among those without chest pain". [[Canto2000]]`,
  w:{chest:.55,larm:.6,rarm:.6,jaw:.6,neck:.6,epi:.6,back:.6,lshoulder:.5,rshoulder:.5}}
};
const SY_WORDS=[
 {q:'“It’s atypical, so probably not the heart.”',a:`The 2023 ESC guideline states that "the use of the descriptor 'atypical' should be avoided", and advises against stereotyped messages based on sex, ethnicity or social background. The 2021 AHA/ACC guideline asks clinicians to describe chest pain as cardiac, possibly cardiac or noncardiac instead. [[Byrne2023ESC,Gulati2021ChestPain]]`},
 {q:'“It’s just stress.”',a:`In VIRGO, women were almost twice as likely as men to put their heart attack symptoms down to stress or anxiety (20.9% vs 11.8%). Stress and a heart attack can happen together. [[Lichtman2018VIRGO]]`},
 {q:'“I must have pulled a muscle.”',a:`In VIRGO, 21.2% of men and 15.4% of women first put their symptoms down to muscle pain. [[Lichtman2018VIRGO]]`},
 {q:'“It’s only indigestion.”',a:`Upper-belly (epigastric) pain is one of the chest pain-equivalent symptoms listed by the ESC, and UDMI4 includes epigastric discomfort among ischaemic symptoms. [[Byrne2023ESC,Thygesen2018UDMI4C]]`},
 {q:'“No chest pain, so it can’t be my heart.”',a:`In NRMI-2, 33% of people with a confirmed heart attack had no chest pain on arrival, and they were treated less often and later. [[Canto2000]]`},
 {q:'“Let’s wait and see if it passes.”',a:`The ESC lists "prolonged chest pain (>15 min) and/or recurrent pain within 1 h" as red flags that should prompt contact with emergency services. In 2000, about half of people in the ARIC communities (49.5%) took 4 hours or more to reach hospital. [[Byrne2023ESC,McGinn2005]]`},
 {q:'“I’ll get a lift to hospital.”',a:`As published by the ESC: "The recommended action should be to contact the EMS rather than to self-present." In NRMI-2, only 53.4% arrived by ambulance, and arriving by ambulance was linked to faster clot-busting treatment (12.1 min) and faster urgent angioplasty (31.2 min) after arrival. [[Byrne2023ESC,Canto2002]]`},
 {q:'“Last time they said it wasn’t my heart.”',a:`In VIRGO, 29.5% of women and 22.1% of men had sought care for similar symptoms before their heart attack; 53% of those women and 37% of those men were told the symptoms were probably not heart-related. A new episode deserves a new assessment. [[Lichtman2018VIRGO]]`},
 {q:'“I don’t want to make a fuss.”',a:`An AHA statement calls delay in seeking treatment "the major factor limiting delivery of definitive treatment" for acute coronary syndrome. Nearly everyone (94.9% in a 2017 US survey) knows to call 9-1-1 for a heart attack; calling is exactly what that knowledge is for. [[Moser2006,Fang2019MMWR]]`}
];
const SY_DELAY=[
 {l:'GRACE · STEMI',s:'median',h:2.3,c:'var(--dx)',k:'Goldberg2002GRACE'},
 {l:'GRACE · NSTEMI',s:'median',h:3.0,c:'var(--dx)',k:'Goldberg2002GRACE'},
 {l:'Aged ≥65 · Massachusetts',s:'median',h:2.0,c:'var(--accent)',k:'Makam2016'},
 {l:'NRMI-2 · with chest pain',s:'mean',h:5.3,c:'var(--muted)',k:'Canto2000'},
 {l:'NRMI-2 · no chest pain',s:'mean',h:7.9,c:'var(--brand)',k:'Canto2000'}
];
inits.symptoms=()=>{
  const svg=$('#sySvg'),rg=$('#syT');let lens='women';
  const halo='paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round';
  const bar=(x,y,w,lab,v,max,u,col,unit,emph)=>{const fw=Math.max(0,w*parseFloat(v)/max*ease(u));
    return `<text x="${f1(x)}" y="${f1(y-5)}" class="t-sm" style="fill:var(--ink);${emph?'font-weight:700':''}">${lab}</text><text x="${f1(x+w)}" y="${f1(y-5)}" class="t-sm t-end" style="fill:${col};font-weight:700">${unit==='y'?parseFloat(v).toFixed(1)+' y':v+(unit==='%'?'%':'')}</text>`+
      `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(fw)}" height="10" rx="5" style="fill:${col};opacity:${emph?1:.7}"/>`};
  const chip=(x,y,w,txt,op)=>op<=0?'':`<g style="opacity:${f1(op)}"><rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="19" rx="9.5" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:1"/><text x="${f1(x+w/2)}" y="${f1(y+13)}" class="t-xs t-mid" style="fill:var(--dx);font-weight:700">${txt}</text></g>`;
  function panel(P,i,u,N){const L=SY_LENS[lens],x=P.x+16,w=P.w-32;let s=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const head=(t1,t2)=>{s+=`<text x="${x}" y="${P.y+28}" class="t-big">${t1}</text><text x="${x}" y="${P.y+46}" class="t-xs">${t2}</text>`};
    const fem=lens==='women',man=lens==='men';
    if(i===0){head('Chest pain or discomfort','pressure · tightness · heaviness · pain');
      let y=P.y+80;s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">VIRGO · ages 18–55</text>`;y+=22;
      s+=bar(x,y,w,'women','87.0',100,u,'var(--brand)','%',fem);y+=34;s+=bar(x,y,w,'men',89.5,100,u,'var(--dx)','%',man);y+=44;
      s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">Scottish emergency departments</text>`;y+=22;
      s+=bar(x,y,w,'women',92,100,u,'var(--brand)','%',fem);y+=34;s+=bar(x,y,w,'men',91,100,u,'var(--dx)','%',man);y+=40;
      if(y<P.y+P.h-8)s+=`<text x="${x}" y="${y}" class="t-xs">% with chest pain among people having an MI</text>`}
    else if(i===1){head('Where else it is felt','UDMI4 · ESC 2023 · AHA/ACC 2021');
      const R=[['either arm','both arms: LR 2.6'],['jaw and neck','chest pain-equivalent'],['shoulders','counts as chest pain'],['back','between the shoulder blades'],['upper belly','epigastric discomfort']];
      R.forEach((r,k)=>{const yy=P.y+78+k*(N?36:40),op=clamp(u*5-k);s+=`<g style="opacity:${f1(op)}"><circle cx="${x+6}" cy="${yy-4}" r="5" style="fill:var(--pain)"/><text x="${x+18}" y="${yy}" class="t-lbl">${r[0]}</text><text x="${x+18}" y="${yy+14}" class="t-xs">${r[1]}</text></g>`});
      const yb=P.y+78+5*(N?36:40);if(yb+8<P.y+P.h)s+=`<text x="${x}" y="${yb+4}" class="t-xs" style="fill:var(--dx)">Symptoms are not specific: tests decide.</text>`}
    else if(i===2){head('Three or more extra symptoms','VIRGO · women vs men');
      let y=P.y+84;s+=bar(x,y,w,'women',61.9,100,u,'var(--brand)','%',fem);y+=36;s+=bar(x,y,w,'men',54.8,100,u,'var(--dx)','%',man);y+=40;
      s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">Reported alongside chest pain:</text>`;
      const C=['epigastric symptoms','palpitations','jaw or neck pain','arm pain','between shoulder blades'];
      C.forEach((c,k)=>{const cx=x+(k%2)*(w/2),cy=y+12+Math.floor(k/2)*24;s+=chip(cx,cy,Math.min(w/2-6,168),c,clamp(u*5-k))});}
    else if(i===3){head('No chest pain on arrival','NRMI-2 · 434,877 people with MI');
      const sz=N?12:14,gp=N?3:4,I=icons(x,P.y+64,{n:100,cols:10,k:Math.round(33*u),size:sz,gap:gp,col:'var(--brand)'});s+=I.svg;
      const tx=x+10*(sz+gp)+14,tw=P.x+P.w-16-tx;
      s+=`<text x="${tx}" y="${P.y+92}" style="font:800 34px var(--display);fill:var(--brand)">${Math.round(33*u)}%</text><text x="${tx}" y="${P.y+110}" class="t-xs">of 100 people with</text><text x="${tx}" y="${P.y+122}" class="t-xs">an MI: no chest pain</text>`;
      let y=P.y+156;s+=`<text x="${tx}" y="${y}" class="t-xs" style="fill:var(--ink)">NRMI 1994–2006</text>`;y+=18;
      s+=bar(tx,y,tw,'women','42.0',100,u,'var(--brand)','%',fem);y+=32;s+=bar(tx,y,tw,'men',30.7,100,u,'var(--dx)','%',man);y+=34;
      if(y+20<P.y+P.h)s+=`<text x="${tx}" y="${y}" class="t-xs">GRACE (all ACS): 8.4%</text>`}
    else if(i===4){head('Who arrived without chest pain','NRMI-2 · no chest pain vs chest pain');
      const R=[['women','%','49.0','38.0',100,fem||man],['diabetes','%',32.6,25.4,100,lens==='diabetes'],['prior heart failure','%',26.4,12.3,100,lens==='diabetes'],['mean age','y',74.2,66.9,90,lens==='older']];
      let y=P.y+74;s+=`<text x="${x}" y="${y}" class="t-xs"><tspan style="fill:var(--brand);font-weight:700">■ no chest pain</tspan>   <tspan style="fill:var(--muted);font-weight:700">■ chest pain</tspan></text>`;y+=26;
      const rh=N?62:62;R.forEach(r=>{s+=`<text x="${x}" y="${y}" class="t-lbl" style="${r[5]?'fill:var(--brand)':''}">${r[0]}${r[5]?'  ◂':''}</text>`;
        s+=bar(x,y+16,w,'',r[2],r[4],u,'var(--brand)',r[1],true)+bar(x,y+38,w,'',r[3],r[4],u,'var(--muted)',r[1],false);y+=rh})}
    else{head('Why it matters','NRMI-2 · population statistics, 1994–1998');
      const cy=P.y+(N?100:104),r=N?30:32,c1=x+r+4,c2=x+w/2+r+4;
      s+=clock(c1,cy,r,5.3*60*u,{full:720,col:'var(--muted)'})+clock(c2,cy,r,7.9*60*u,{full:720,col:'var(--brand)'});
      s+=`<text x="${c1+r+8}" y="${cy-4}" class="t-lbl">${f1(5.3*u)} h</text><text x="${c1+r+8}" y="${cy+10}" class="t-xs">chest pain</text><text x="${c2+r+8}" y="${cy-4}" class="t-lbl" style="fill:var(--brand)">${f1(7.9*u)} h</text><text x="${c2+r+8}" y="${cy+10}" class="t-xs">no chest pain</text>`;
      s+=`<text x="${x}" y="${cy+r+16}" class="t-xs">mean time from onset to arrival</text>`;
      let y=cy+r+40;const R=[['MI diagnosed on admission',50.3,22.2],['treatment to reopen the artery','74.0',25.3],['died in hospital',9.3,23.3]];
      R.forEach(rr=>{s+=`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:700">${rr[0]}</text>`;
        const hw=(w-12)/2;s+=bar(x,y+28,hw,'chest pain',rr[1],100,u,'var(--muted)','%',false)+bar(x+hw+12,y+28,hw,'no chest pain',rr[2],100,u,'var(--brand)','%',true);y+=N?58:58})}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 672'),p=phaseOf(SY_STEPS,t),S=SY_STEPS[p],L=SY_LENS[lens];
    const u=ramp(t,S.from,S.from+.06),pulse=.86+.14*Math.sin(t*90);
    const B=N?{x:200,y:52,s:1.3}:{x:156,y:20,s:1.72},P=N?{x:10,y:322,w:380,h:344}:{x:322,y:12,w:386,h:356};
    /* region glow */
    const spread=['larm','jaw','neck','rarm','lshoulder','rshoulder','back','epi'];const hl={};
    let chest=ramp(t,0,.07);if(t>=.5)chest=lerp(1,.12,ramp(t,.5,.58));
    hl.chest=chest*(L.w.chest)*pulse;
    spread.forEach((k,j)=>{let v=ramp(t,.17+j*.012,.2+j*.012);if(t>=.5)v*=lerp(1,.45,ramp(t,.5,.58));hl[k]=v*L.w[k]*pulse});
    let s=bodymap(B.x,B.y,B.s,{hl}).svg;
    const at=bodymap(B.x,B.y,B.s,{}).at,sc=B.s;
    /* labels on the regions */
    const lab=(k,txt,dx,dy,an)=>{const v=k==='chest'?chest:hl[k];if(!(v>.25))return '';const p=at[k];return `<text x="${f1(p[0]+dx*sc)}" y="${f1(p[1]+dy*sc)}" class="t-xs ${an||'t-mid'}" style="fill:var(--ink);font-weight:700;${halo}">${txt}</text>`};
    s+=lab('chest','chest',0,3)+lab('jaw','jaw',0,-1)+lab('neck','neck',0,8)+lab('epi','upper belly',0,3)+lab('larm','left arm',0,26)+lab('rarm','right arm',0,26);
    if(hl.back>.25)s+=`<text x="${f1(B.x)}" y="${f1(B.y+152*sc)}" class="t-xs t-mid" style="fill:var(--pain);font-weight:700;${halo}">dashed ring: back</text>`;
    /* accompanying symptoms beside the head */
    const cop=t<.34?0:ramp(t,.36,.44),cw=N?96:94,lx=B.x-34*sc-cw,rx=B.x+34*sc;
    s+=chip(Math.max(4,lx),B.y+2,cw,'light-headed',cop)+chip(Math.max(4,lx),B.y+26,cw,'breathless',cop*ramp(t,.37,.45))+chip(Math.min((N?400:320)-cw-4,rx),B.y+2,cw,'nausea',cop*ramp(t,.38,.46))+chip(Math.min((N?400:320)-cw-4,rx),B.y+26,cw,'palpitations',cop*ramp(t,.39,.47));
    if(t>=.5)s+=`<text x="${f1(B.x)}" y="${f1(B.y+196*sc)}" class="t-sm t-mid" style="fill:var(--brand);font-weight:600">${t<.84?'no chest pain: other symptoms only':'arrives later, treated less often'}</text>`;
    else s+=`<text x="${f1(B.x)}" y="${f1(B.y+196*sc)}" class="t-xs t-mid">lens: ${L.n.toLowerCase()}</text>`;
    s+=panel(P,p,u,N);
    svg.innerHTML=s;setSt(p);
    $('#syNote').innerHTML=noteHTML(S)+`<div class="kv"><div><dt>Lens · ${L.n}</dt><dd>${L.kv}</dd></div></div>`;
  }
  function readout(){const L=SY_LENS[lens];$('#syRead').innerHTML=L.read.map(r=>`<span>${r[0]} <b>${r[1]}</b></span>`).join('')}
  const stop=playWire(rg,$('#syPlay'),draw,26000,'Replay','symptoms');
  const setSt=stepWire($('#sySteps'),SY_STEPS,rg,draw,stop);
  $$('[data-sylens]').forEach(b=>b.addEventListener('click',()=>{lens=b.dataset.sylens;$$('[data-sylens]').forEach(x=>x.setAttribute('aria-pressed',x===b));readout();draw(+rg.value)}));
  readout();draw(+rg.value);

  /* ---- words that delay care ---- */
  const W=$('#syWords');
  W.innerHTML=SY_WORDS.map((w,i)=>`<button class="sy-word" data-syw="${i}" aria-pressed="false"><span class="q">${w.q}</span><span class="flip">What the evidence says</span><span class="a">${w.a}</span></button>`).join('');
  W.addEventListener('click',e=>{const b=e.target.closest('[data-syw]');if(!b)return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});
  $('#syWordsAll').addEventListener('click',()=>$$('[data-syw]',W).forEach(b=>b.setAttribute('aria-pressed','true')));
  $('#syWordsNone').addEventListener('click',()=>$$('[data-syw]',W).forEach(b=>b.setAttribute('aria-pressed','false')));

  /* ---- delay bars ---- */
  const dsvg=$('#syDelay'),drg=$('#syDelayT');
  function ddraw(t){const N=vb(dsvg,'720 300','400 430'),hrs=t*9;
    const x0=N?14:200,x1=N?386:700,top=N?40:46,rh=N?70:44,X=h=>x0+(x1-x0)*h/9;let s='';
    for(let h=0;h<=9;h++){const xx=X(h);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${top-8}" y2="${top+rh*5}" class="grid"/><text x="${f1(xx)}" y="${top-14}" class="t-xs t-mid">${h}${h===9?' h':''}</text>`}
    SY_DELAY.forEach((d,i)=>{const y=top+i*rh+(N?28:10),w=X(Math.min(hrs,d.h))-x0,done=hrs>=d.h;
      s+=N?`<text x="${x0}" y="${y-8}" class="t-sm" style="fill:var(--ink)">${d.l} <tspan class="t-xs">(${d.s})</tspan></text>`:`<text x="${x0-10}" y="${y+10}" class="t-sm t-end" style="fill:var(--ink)">${d.l}</text><text x="${x0-10}" y="${y+23}" class="t-xs t-end">${d.s}</text>`;
      s+=`<rect x="${x0}" y="${y}" width="${f1(Math.max(0,w))}" height="16" rx="5" style="fill:${d.c};opacity:${done?.9:.55}"/>`;
      if(w>0)s+=`<text x="${f1(x0+w+6)}" y="${y+12}" class="t-sm" style="fill:${d.c};font-weight:700">${done?d.h.toFixed(1)+' h':''}</text>`});
    s+=`<line x1="${f1(X(hrs))}" x2="${f1(X(hrs))}" y1="${top-6}" y2="${top+rh*5}" style="stroke:var(--brand);stroke-width:1.6"/>`;
    dsvg.innerHTML=s;
    const passed=SY_DELAY.filter(d=>hrs>=d.h).length;
    $('#syDelayNote').innerHTML=noteHTML({k:`${f1(hrs)} hours after symptoms began`,t:passed===0?'Most people are still at home':passed<5?`${passed} of 5 groups have, on average, arrived`:'Every group has arrived, hours later',
      txt:`In the GRACE registry (14 countries, 1999–2001), about 41% of people with STEMI arrived within 2 hours, compared with about one third with NSTEMI or unstable angina; median delays were 2.3 and 3.0 hours. Among people aged 65 or older in central Massachusetts, the median was 2.0 hours, with no significant improvement from 2001 to 2011. In NRMI-2, people without chest pain arrived on average 2.6 hours later than people with it. [[Goldberg2002GRACE,Makam2016,Canto2000]]`,
      pt:`Many people wait hours before getting help. Delay is common and nobody's fault, but calling early helps.`,
      hook:`GRACE median prehospital delay: 2.3 h STEMI, 3.0 h NSTEMI. [[Goldberg2002GRACE]]`})}
  const dstop=playWire(drg,$('#syDelayPlay'),ddraw,9000,'Replay','symptoms');void dstop;
  ddraw(+drg.value);
};
