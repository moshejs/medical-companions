/* =============== 4.3 Talking therapies and mutual help =============== */
const TH_STEPS=[
 {from:0,at:.1,k:'Tool 1 · primary care, emergency care, wards',t:'Brief intervention',
  txt:`A nurse or doctor asks about drinking, gives personal feedback and advice, often in 5–15 minutes. In the 2018 Cochrane review (69 RCTs, 33,642 participants), people who had a brief intervention drank 20 g/week less at one year than people with minimal or no intervention (95% CI −28 to −12; moderate-quality evidence). Mean baseline intake was 244 g/week, so the cut is about 8%. Longer counselling added little. The USPSTF recommends screening adults 18 or older, including pregnant women, and offering brief behavioural counselling for risky drinking (B). [[Kaner2018Cochrane,USPSTF2018Alcohol]]`,
  pt:`A short, respectful talk about drinking helps many people drink a bit less on average. It is a starting point, not the whole treatment.`,
  hook:`Brief intervention: −20 g/week at 1 year (Cochrane 2018). Not proven for dependence or very heavy drinking. [[Saitz2010]]`},
 {from:.2,at:.31,k:'Tool 2 · a way of talking',t:'Motivational interviewing',
  txt:`Motivational interviewing (MI) helps a person voice their own reasons for change instead of being told. Picture a balance: the reasons to keep things as they are on one side, the reasons to change on the other. In the 2023 Cochrane review (93 studies, 22,776 participants), MI beat no intervention right after treatment (SMD 0.48, 95% CI 0.07–0.89; low certainty), less at short-term follow-up (0.20) and not clearly at long-term follow-up (0.12, −0.00 to 0.25). It did no better than other active treatments. Motivational enhancement therapy (MET), a manualised version, did as well as CBT and twelve-step facilitation in Project MATCH. [[Schwenker2023,ProjectMATCH1997]]`,
  pt:`Change sticks better when the reasons are yours. MI is a conversation that helps you hear them.`,
  hook:`MI effect: largest right after, fading later (SMD 0.48 → 0.20 → 0.12). At 3 years in MATCH, readiness to change and self-efficacy best predicted outcome. [[Schwenker2023,ProjectMATCH1998]]`},
 {from:.4,at:.52,k:'Tool 3 · skills for risky moments',t:'CBT and relapse prevention',
  txt:`Cognitive behavioural therapy (CBT) maps the chain from a high-risk situation to a thought ("a drink would help"), an urge and a choice, and practises a coping response at each link. Marlatt's relapse-prevention model adds planning for lapses and building self-efficacy. A meta-analysis of 26 studies (9,504 participants) found relapse prevention effective, especially for alcohol and with medicine. CBT beat minimal treatment but not other specific therapies; combined with medicine it beat usual care (g 0.18–0.28). [[Larimer1999,Irvin1999,Magill2019,Ray2020CBT]]`,
  pt:`CBT is practice for the hard moments: spot your triggers, notice the thought, and have a plan ready.`,
  hook:`Relapse prevention = high-risk situations, coping, self-efficacy, outcome expectancies and the abstinence violation effect. [[Larimer1999]]`},
 {from:.6,at:.73,k:'Tool 4 · rewards for verified change',t:'Contingency management',
  txt:`Contingency management (CM) gives a reward, often a prize draw, for each test that shows no recent drinking. In an RCT of 79 outpatients with alcohol dependence and serious mental illness, 12 weeks of prize draws for urine ethyl glucuronide below 150 ng/mL (tested three times a week) made a negative sample 3.1 times more likely (95% CI 2.2–4.5), about 1.5 extra weeks of abstinence. Across substances CM has a mean effect of d = 0.42, larger for opiates and cocaine, and effects fade once rewards stop. The related community reinforcement approach reduces drinking days more than usual care. [[McDonell2017,Prendergast2006,Roozen2004CRA]]`,
  pt:`Each alcohol-free test earns a small reward. It makes progress visible, week by week.`,
  hook:`EtG-based CM: alcohol-negative sample 3.1× more likely (McDonell 2017). CM effects fade after rewards stop. [[McDonell2017,Prendergast2006]]`},
 {from:.8,at:.9,k:'Tool 5 · community and peers',t:'Mutual help: AA, TSF and SMART',
  txt:`Twelve-step facilitation (TSF) is a manualised therapy that links people to Alcoholics Anonymous. In the 2020 Cochrane review (27 studies, 10,565 participants), manualised AA/TSF gave more continuous abstinence at 12 months than other treatments such as CBT (RR 1.21, 95% CI 1.03–1.42; high certainty), and probably large healthcare savings. AA seems to work mainly through people: changes in social networks and confidence to stay abstinent in social settings explained 43–67% of its effect. Deeper involvement in SMART Recovery, LifeRing or Women for Sobriety went with outcomes no different from 12-step groups. <span class="ev early">Early evidence</span> [[Kelly2020Cochrane,Kelly2012AAMech,Zemore2018]]`,
  pt:`Groups connect you with people who support change. AA is free and in most communities; SMART, LifeRing and Women for Sobriety are other choices.`,
  hook:`Cochrane 2020: AA/TSF RR 1.21 (1.03–1.42) for 12-month continuous abstinence vs CBT and others; high certainty. [[Kelly2020Cochrane]]`}
];
/* forest-style plot: rows {lab, v, lo, hi, col}; rev 0..1 reveals the rows in turn */
function thForest(x,y,w,rows,o){const mn=o.min,mx=o.max,pw=w-60,X=v=>x+pw*(clamp(v,mn,mx)-mn)/(mx-mn),rh=o.rh||40,rev=o.rev==null?1:o.rev;
  let s=`<text x="${f1(x)}" y="${f1(y)}" class="t-sm" style="fill:var(--ink);font-weight:600">${o.title}</text>`;
  const y0=y+14,yb=y0+rows.length*rh;
  if(o.ref!=null)s+=`<line x1="${f1(X(o.ref))}" x2="${f1(X(o.ref))}" y1="${f1(y0)}" y2="${f1(yb)}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
  s+=`<line x1="${f1(x)}" x2="${f1(x+pw)}" y1="${f1(yb)}" y2="${f1(yb)}" class="axis"/>`;
  (o.ticks||[]).forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(yb)}" y2="${f1(yb+4)}" class="axis"/><text x="${f1(X(v))}" y="${f1(yb+15)}" class="t-xs t-mid">${v}</text>`});
  if(o.unit)s+=`<text x="${f1(x+w)}" y="${f1(yb+28)}" class="t-xs t-end">${o.unit}</text>`;
  if(o.left)s+=`<text x="${f1(x)}" y="${f1(yb+28)}" class="t-xs">${o.left}</text>`;
  rows.forEach((r,i)=>{const a=clamp((rev*rows.length-i)*1.4);if(a<=0)return;const ry=y0+i*rh+rh*.62,c=r.col||'var(--rx)';
    s+=`<g style="opacity:${f1(a)}"><text x="${f1(x)}" y="${f1(y0+i*rh+12)}" class="t-sm" style="fill:var(--ink)">${r.lab}</text>`;
    if(r.bar){s+=`<rect x="${f1(X(o.ref||0))}" y="${f1(ry-5)}" width="${f1(Math.max(1,(X(r.v)-X(o.ref||0))*a))}" height="10" rx="3" style="fill:${c};opacity:.8"/>`}
    else{if(r.lo!=null){const l=X(lerp(r.v,r.lo,a)),h=X(lerp(r.v,r.hi,a));s+=`<line x1="${f1(l)}" x2="${f1(h)}" y1="${f1(ry)}" y2="${f1(ry)}" style="stroke:${c};stroke-width:2"/><line x1="${f1(l)}" x2="${f1(l)}" y1="${f1(ry-4)}" y2="${f1(ry+4)}" style="stroke:${c};stroke-width:1.6"/><line x1="${f1(h)}" x2="${f1(h)}" y1="${f1(ry-4)}" y2="${f1(ry+4)}" style="stroke:${c};stroke-width:1.6"/>`}
      if(r.lo2!=null)s+=`<rect x="${f1(X(r.lo2))}" y="${f1(ry-4)}" width="${f1(X(r.hi2)-X(r.lo2))}" height="8" rx="4" style="fill:${c};opacity:.45"/>`;
      if(r.v!=null&&r.lo2==null)s+=`<rect x="${f1(X(r.v)-5)}" y="${f1(ry-5)}" width="10" height="10" style="fill:${c}" transform="rotate(45 ${f1(X(r.v))} ${f1(ry)})"/>`}
    s+=`<text x="${f1(x+w)}" y="${f1(ry+4)}" class="t-sm t-end" style="fill:${c};font-weight:700">${r.val}</text></g>`});
  return s}
/* the five scenes, drawn in a 440 × 290 box */
function thScene(p,u,rr){let s='';const g='var(--rx)',ink='var(--ink)';
  s+=`<rect x="0" y="0" width="440" height="290" rx="14" style="fill:var(--field);stroke:var(--line)"/>`;
  if(p===0){/* clinician and person at a table, feedback bubble, weekly grams bar */
    s+=`<rect x="120" y="120" width="200" height="8" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=person(150,48,72,g)+person(290,48,72,'var(--muted)');
    s+=`<text x="150" y="140" class="t-xs t-mid">nurse or doctor</text><text x="290" y="140" class="t-xs t-mid">person</text>`;
    const ph=u<.3?0:u<.6?1:2,bub=['Asks about drinking (AUDIT-C)','Personal feedback','Advice and a plan'][ph];
    const bw=Math.max(150,bub.length*6.6+24);
    s+=`<rect x="${f1(220-bw/2)}" y="14" width="${f1(bw)}" height="26" rx="13" style="fill:var(--panel);stroke:${g};stroke-width:1.4"/><text x="220" y="31" class="t-sm t-mid" style="fill:${ink}">${bub}</text>`;
    s+=`<path d="M170 40L182 58" style="stroke:${g};stroke-width:1.4"/>`;
    const X=v=>40+v*360/260,base=244,now=lerp(244,224,ease(ramp(u,.35,.85)));
    s+=`<text x="40" y="172" class="t-sm" style="fill:${ink}">Average weekly alcohol in the trials (grams)</text>`;
    s+=`<rect x="40" y="182" width="${f1(X(base)-40)}" height="22" rx="4" style="fill:var(--eth-fill);opacity:.35"/><text x="${f1(X(base)-6)}" y="198" class="t-xs t-end" style="fill:${ink}">baseline 244 g</text>`;
    s+=`<rect x="40" y="214" width="${f1(X(now)-40)}" height="22" rx="4" style="fill:var(--eth-fill);opacity:.8"/><text x="${f1(X(now)-6)}" y="230" class="t-xs t-end" style="fill:${ink}">${Math.round(now)} g</text>`;
    if(u>.4)s+=`<rect x="${f1(X(now))}" y="214" width="${f1(X(base)-X(now))}" height="22" style="fill:none;stroke:var(--good);stroke-width:1.4;stroke-dasharray:3 2"/><text x="${f1(X(base)+6)}" y="230" class="t-sm" style="fill:var(--good)">−${Math.round(base-now)}</text>`;
    [0,100,200].forEach(v=>s+=`<text x="${f1(X(v))}" y="254" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="40" y="276" class="t-xs">group means, 1 year after; drawn to scale</text>`}
  else if(p===1){/* decisional balance tips toward change */
    const k=ease(ramp(u,.15,.85)),tilt=lerp(.7,-.7,k),ln=Math.round(lerp(1,5,k)),rn=Math.round(lerp(5,2,k));
    const B=balance(220,98,250,{tilt,left:'reasons to change',right:'reasons to keep drinking',lcol:'var(--rx)',rcol:'var(--eth-fill)',ln,rn});s+=B.svg;
    s+=`<text x="220" y="30" class="t-lbl t-mid">${k<.45?'"It is not that bad yet"':k<.75?'"Part of me wants things to change"':'"I want my health and sleep back"'}</text>`;
    s+=`<text x="220" y="48" class="t-xs t-mid">illustrative change talk, in the person's own words</text>`;
    const items=[['health','sleep','family','money','energy'],['relaxing','habit','friends']];
    s+=`<text x="20" y="232" class="t-sm" style="fill:var(--rx)">${items[0].slice(0,ln).join(' · ')}</text><text x="420" y="232" class="t-sm t-end" style="fill:var(--eth)">${items[1].slice(0,Math.min(3,rn)).join(' · ')}</text>`;
    s+=`<text x="220" y="270" class="t-xs t-mid">The clinician listens and reflects; the person does the weighing.</text>`}
  else if(p===2){/* trigger → thought → urge → coping skill */
    const N=[['High-risk','situation'],['Thought','"a drink would help"'],['Urge or','craving'],['Coping','response']],P=[[72,62],[220,62],[368,62],[368,158]];
    const pos=clamp(u*1.25)*3;
    P.forEach(([x,y],i)=>{const on=pos>=i-.05,c=i===3?'var(--good)':i===0?'var(--accent)':'var(--dx)';
      s+=`<rect x="${x-65}" y="${y-28}" width="130" height="56" rx="10" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${on?c:'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${x}" y="${y-5}" class="t-lbl t-mid" style="font-size:12.5px">${N[i][0]}</text><text x="${x}" y="${y+12}" class="t-xs t-mid">${N[i][1]}</text>`});
    s+=`<line x1="137" x2="153" y1="62" y2="62" class="arrow" marker-end="url(#thA)"/><line x1="285" x2="301" y1="62" y2="62" class="arrow" marker-end="url(#thA)"/><line x1="368" x2="368" y1="92" y2="126" class="arrow" marker-end="url(#thA)"/>`;
    if(pos<3){const si=Math.min(2,Math.floor(pos)),f=pos-si,A=P[si],B=P[si+1];s+=`<circle cx="${f1(lerp(A[0],B[0],f))}" cy="${f1(lerp(A[1],B[1],f))}" r="6" style="fill:var(--accent)"/>`}
    const k=ramp(u,.8,1);
    s+=`<g style="opacity:${f1(k)}"><line x1="304" x2="270" y1="158" y2="158" style="stroke:var(--good);stroke-width:1.6" marker-end="url(#thA)"/><rect x="128" y="134" width="136" height="48" rx="10" style="fill:var(--good-soft);stroke:var(--good)"/><text x="196" y="155" class="t-lbl t-mid" style="fill:var(--good);font-size:12.5px">self-efficacy grows</text><text x="196" y="171" class="t-xs t-mid">lapse risk falls</text></g>`;
    s+=`<path d="M330 92Q310 206 120 206" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3"/><text x="20" y="226" class="t-xs">no coping response: lapse risk rises</text>`;
    s+=`<text x="20" y="258" class="t-sm" style="fill:${ink}">Practised in sessions: spot triggers, challenge the thought,</text><text x="20" y="274" class="t-sm" style="fill:${ink}">ride out the urge, plan for a lapse.</text>`}
  else if(p===3){/* 12 weeks × 3 EtG tests; tokens for negatives */
    const n=Math.round(clamp(u*1.1)*36);let tok=0;
    s+=`<text x="20" y="26" class="t-sm" style="fill:${ink}">12 weeks · urine EtG test 3 times a week</text>`;
    for(let w=0;w<12;w++){s+=`<text x="${f1(46+w*31+13)}" y="46" class="t-xs t-mid">${w+1}</text>`;
      for(let d=0;d<3;d++){const i=w*3+d,cx=46+w*31+13,cy=64+d*30,neg=rr[i]<lerp(.45,.88,w/11);
        s+=`<rect x="${f1(cx-12)}" y="${f1(cy-12)}" width="24" height="24" rx="5" style="fill:var(--panel);stroke:var(--line)"/>`;
        if(i<n){if(neg){tok++;const drop=i===n-1?(1-clamp((u*1.1*36-i)))*10:0;s+=`<circle cx="${f1(cx)}" cy="${f1(cy-drop)}" r="8.5" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/><text x="${f1(cx)}" y="${f1(cy-drop+3)}" class="t-xs t-mid" style="fill:var(--gold);font-weight:700">★</text>`}
          else s+=`<path d="M${f1(cx-5)} ${f1(cy-5)}L${f1(cx+5)} ${f1(cy+5)}M${f1(cx+5)} ${f1(cy-5)}L${f1(cx-5)} ${f1(cy+5)}" style="stroke:var(--muted);stroke-width:1.6"/>`}}}
    s+=`<text x="20" y="66" class="t-xs">Mon</text><text x="20" y="96" class="t-xs">Wed</text><text x="20" y="126" class="t-xs">Fri</text>`;
    s+=`<circle cx="40" cy="168" r="8" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/><text x="54" y="172" class="t-xs">negative (EtG &lt; 150 ng/mL): a prize draw</text><path d="M36 182l8 8M44 182l-8 8" style="stroke:var(--muted);stroke-width:1.6"/><text x="54" y="190" class="t-xs">positive: no draw</text>`;
    s+=`<text x="20" y="226" style="font:800 30px var(--display);fill:var(--gold)">${tok}</text><text x="${tok>9?62:50}" y="226" class="t-sm" style="fill:${ink}">prize draws earned so far (illustrative)</text>`;
    s+=`<text x="20" y="252" class="t-xs">Pattern drawn for teaching: the trial reported odds,</text><text x="20" y="266" class="t-xs">not one person's grid.</text>`}
  else{/* circle of chairs fills; network lines */
    const cx=220,cy=136,R=92,n=9,k=clamp(u*1.15),arrived=Math.round(k*n);
    s+=`<circle cx="${cx}" cy="${cy}" r="${R+26}" style="fill:none;stroke:var(--line);stroke-dasharray:2 5"/>`;
    const P=[];for(let i=0;i<n;i++){const a=Math.PI/2+i*2*Math.PI/n;P.push([cx+R*Math.cos(a),cy+R*Math.sin(a)])}
    const net=ramp(u,.45,1);
    for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){if(i>=arrived||j>=arrived)continue;if((i*3+j*5)%4!==0&&i!==0)continue;s+=`<line x1="${f1(P[i][0])}" y1="${f1(P[i][1])}" x2="${f1(P[j][0])}" y2="${f1(P[j][1])}" style="stroke:var(--rx);stroke-width:1.2;opacity:${f1(net*.6)}"/>`}
    P.forEach(([x,y],i)=>{s+=`<rect x="${f1(x-13)}" y="${f1(y+2)}" width="26" height="8" rx="3" style="fill:var(--panel-2);stroke:var(--brain-line)"/>`;
      if(i<arrived)s+=person(x,y-24,30,i===0?'var(--rx)':'var(--muted)')});
    s+=`<text x="${cx}" y="${cy-4}" class="t-lbl t-mid">a meeting</text><text x="${cx}" y="${cy+12}" class="t-xs t-mid">free, peer-led</text>`;
    s+=`<text x="${f1(P[0][0])}" y="${f1(P[0][1]+26)}" class="t-xs t-mid" style="fill:var(--rx)">newcomer</text>`;
    s+=`<text x="18" y="26" class="t-sm" style="fill:${ink}">AA / TSF</text><text x="18" y="42" class="t-xs">twelve steps</text><text x="422" y="26" class="t-sm t-end" style="fill:${ink}">SMART · LifeRing · WfS</text><text x="422" y="42" class="t-xs t-end">secular alternatives</text>`;
    s+=`<text x="220" y="276" class="t-xs t-mid" style="opacity:${f1(net)}">lines = new ties with people who support not drinking</text>`}
  return s}
function thPanel(p,u){const rev=ramp(u,.1,.9);
  if(p===0)return o=>thForest(o.x,o.y,o.w,[{lab:'Brief vs minimal or none, 1 year',v:-20,lo:-28,hi:-12,val:'−20 g/wk'},{lab:'Extended vs brief, 1 year',v:2,lo:-42,hi:45,val:'+2 g/wk',col:'var(--muted)'}],{title:'Cochrane 2018 · grams per week',min:-50,max:50,ref:0,ticks:[-50,-25,0,25,50],left:'← less drinking',unit:'95% CI',rev});
  if(p===1)return o=>thForest(o.x,o.y,o.w,[{lab:'MI vs none: right after',v:.48,lo:.07,hi:.89,val:'0.48'},{lab:'MI vs none: short-term',v:.2,val:'0.20'},{lab:'MI vs none: long-term',v:.12,lo:0,hi:.25,val:'0.12',col:'var(--muted)'}],{title:'Cochrane 2023 · effect size (SMD)',min:-.2,max:1,ref:0,ticks:[0,.5,1],left:'0 = no difference',unit:'95% CI where given',rev});
  if(p===2)return o=>thForest(o.x,o.y,o.w,[{lab:'Naltrexone + medical mgmt',v:80.6,bar:1,val:'80.6'},{lab:'CBI + medical mgmt + placebo',v:79.2,bar:1,val:'79.2'},{lab:'Naltrexone + CBI + MM',v:77.1,bar:1,val:'77.1'},{lab:'Placebo + medical mgmt',v:75.1,bar:1,val:'75.1',col:'var(--muted)'},{lab:'CBI alone, no pills or MM',v:66.6,bar:1,val:'66.6',col:'var(--accent)'}],{title:'COMBINE · % days abstinent in treatment',min:0,max:100,ref:0,ticks:[0,50,100],unit:'group means',rh:36,rev});
  if(p===3)return o=>thForest(o.x,o.y,o.w,[{lab:'CM: alcohol-negative EtG sample',v:3.1,lo:2.2,hi:4.5,val:'3.1×'},{lab:'CM across substances (mean d)',v:.42,bar:1,val:'d 0.42',col:'var(--muted)'}],{title:'Contingency management',min:0,max:5,ref:0,ticks:[0,1,2,3,4,5],unit:'times more likely · 95% CI',rev});
  return o=>thForest(o.x,o.y,o.w,[{lab:'Continuous abstinence, 12 mo (RR)',v:1.21,lo:1.03,hi:1.42,val:'RR 1.21'},{lab:'% days abstinent, 12 mo (MD/100)',v:1+3.03/100,lo:1-4.36/100,hi:1+10.43/100,val:'+3.0',col:'var(--muted)'},{lab:'% days abstinent, 24 mo (MD/100)',v:1+12.91/100,val:'+12.9'},{lab:'% days abstinent, 36 mo (MD/100)',v:1+6.64/100,val:'+6.6'}],{title:'Cochrane 2020 · AA/TSF vs other treatment',min:.8,max:1.6,ref:1,ticks:[.8,1,1.2,1.4,1.6],left:'1 = no difference',unit:'MD shown as 1 + points/100',rh:36,rev})}
const TH_NOTE=['Moderate-quality evidence; most trials in general practice (55%) or emergency care (39%). [[Kaner2018Cochrane]]','Low certainty right after; MI was no better than other active treatments. [[Schwenker2023]]','During 16 weeks of treatment; MM = medical management, CBI = combined behavioural intervention. [[Anton2006COMBINE]]','RCT of 79 outpatients with serious mental illness; meta-analysis d across substance use disorders. [[McDonell2017,Prendergast2006]]','RR: high certainty; % days abstinent at 24 and 36 months: low certainty. [[Kelly2020Cochrane]]'];
inits.therapy=()=>{
  const svg=$('#thSvg'),rg=$('#thT'),RR=(()=>{const r=rng(43);return Array.from({length:36},()=>r())})();
  function draw(t){
    const N=vb(svg,'720 270','400 500');const p=phaseOf(TH_STEPS,t),u=ramp(t,TH_STEPS[p].from,p<4?TH_STEPS[p+1].from:1);
    let s=`<defs>${marker('thA','var(--muted)')}</defs>`;
    if(N){s+=`<g transform="translate(10 6) scale(${f1(380/440)})">${thScene(p,u,RR)}</g>`;
      const ph=[150,186,258,150,214][p];svg.setAttribute('viewBox','0 0 400 '+(270+ph));
      s+=`<rect x="10" y="264" width="380" height="${ph}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=thPanel(p,u)({x:24,y:288,w:352});}
    else{s+=`<g transform="translate(10 10) scale(.86)">${thScene(p,u,RR)}</g>`;
      s+=`<rect x="398" y="10" width="312" height="250" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=thPanel(p,u)({x:412,y:34,w:284})}
    svg.innerHTML=s;setSt(p);
    $('#thNote').innerHTML=noteHTML(TH_STEPS[p])+`<p class="stage-cap">${TH_NOTE[p]}</p>`;
  }
  const stop=playWire(rg,$('#thPlay'),draw,30000,'%t:player.replay%','therapy');
  const setSt=stepWire($('#thSteps'),TH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- relapse-prevention chain ---- */
  const RP={
   stress:{n:'A stressful day',type:'high-risk situation',start:'hrs',ex:'After a hard shift, the usual way home passes the shop where they used to buy alcohol.'},
   party:{n:'A party where others drink',type:'high-risk situation (social)',start:'hrs',ex:'Friends are drinking and someone hands them a glass.'},
   low:{n:'Feeling low or lonely',type:'high-risk situation (mood)',start:'hrs',ex:'An evening alone, feeling low, with nothing planned.'},
   imb:{n:'Life out of balance',type:'hidden antecedent: lifestyle imbalance',start:'imb',ex:'Weeks of obligations and no rest or enjoyment, so urges build before any one situation.'},
   lapse:{n:'One drink after weeks without',type:'a lapse',start:'lapse',ex:'After weeks without alcohol, they have one drink at a wedding.'}};
  let rp='stress',cope=true,pulse=1,stopP=null;
  const rs=$('#thRp');
  function drawRP(){
    const N=vb(rs,'720 340','400 600'),R=RP[rp],C=cope&&R.start!=='lapse';
    /* nodes: id -> [x,y,label1,label2,kind] */
    const Wd={imb:[80,50,'Lifestyle imbalance','urges and cravings','pre'],hrs:[80,170,'High-risk situation',R.start==='hrs'?R.n.toLowerCase():'urges meet a cue','risk'],
      cope:[250,90,'Coping response','used','good'],se1:[420,90,'Self-efficacy rises','','good'],low:[610,90,'Lower relapse','risk','good'],
      nocope:[250,250,'No coping response','','bad'],se2:[420,250,'Self-efficacy falls','"a drink would help"','bad'],lapse:[610,250,'Lapse','a single use','bad'],ave:[420,318,'Abstinence violation','effect','bad'],hi:[250,318,'Higher relapse','risk','bad'],
      ref:[610,170,'Reframe the lapse','back on track','good']};
    const Nn={imb:[200,28],hrs:[200,110],cope:[100,200],se1:[100,290],low:[100,380],nocope:[300,200],se2:[300,290],lapse:[300,380],ave:[108,470],hi:[108,560],ref:[300,470]};
    const P=k=>N?Nn[k]:Wd[k].slice(0,2);
    let path=[];
    if(R.start==='imb')path.push('imb');
    if(R.start!=='lapse'){path.push('hrs');path=path.concat(C?['cope','se1','low']:['nocope','se2','lapse',cope?'ref':'ave'].concat(cope?[]:['hi']))}
    else path=['lapse',cope?'ref':'ave'].concat(cope?[]:['hi']);
    const show=new Set(path);
    let s=`<defs>${marker('thB','var(--muted)')}${marker('thG','var(--good)')}${marker('thR','var(--bad)')}</defs>`;
    const E=[['imb','hrs'],['hrs','cope'],['cope','se1'],['se1','low'],['hrs','nocope'],['nocope','se2'],['se2','lapse'],['lapse','ave'],['ave','hi'],['lapse','ref']];
    const bw=N?172:152,bh=40;
    E.forEach(([a,b])=>{const on=show.has(a)&&show.has(b)&&path.indexOf(b)===path.indexOf(a)+1,[x1,y1]=P(a),[x2,y2]=P(b);
      const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,kx=Math.min(Math.abs(ux)>.001?(bw/2)/Math.abs(ux):1e9,Math.abs(uy)>.001?(bh/2)/Math.abs(uy):1e9)+4;
      const ax=x1+ux*kx,ay=y1+uy*kx,bx=x2-ux*(kx+2),by=y2-uy*(kx+2),col=on?(['cope','se1','low','ref'].includes(b)?'var(--good)':'var(--bad)'):'var(--line)';
      s+=`<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(bx)}" y2="${f1(by)}" style="stroke:${col};stroke-width:${on?2.2:1.2};${on?'':'stroke-dasharray:3 4'}" ${on?`marker-end="url(#${col==='var(--good)'?'thG':'thR'})"`:''}/>`});
    Object.keys(Wd).forEach(k=>{const [x,y]=P(k),d=Wd[k],on=show.has(k),c=d[4]==='good'?'var(--good)':d[4]==='bad'?'var(--bad)':d[4]==='pre'?'var(--dx)':'var(--accent)';
      const l2=k==='cope'?(C?'used':'—'):d[3];
      s+=`<g style="opacity:${on?1:.28}"><rect x="${f1(x-bw/2)}" y="${f1(y-bh/2)}" width="${bw}" height="${bh}" rx="9" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${on?c:'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(x)}" y="${f1(y-3)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${d[2]}</text>${l2?`<text x="${f1(x)}" y="${f1(y+11)}" class="t-xs t-mid">${l2}</text>`:''}</g>`});
    /* travelling pulse along the chosen path */
    const segs=path.length-1,pp=clamp(pulse)*segs,si=Math.min(segs-1,Math.floor(pp));
    if(segs>0){const [x1,y1]=P(path[si]),[x2,y2]=P(path[si+1]),f=pp-si;s+=`<circle cx="${f1(lerp(x1,x2,f))}" cy="${f1(lerp(y1,y2,f))}" r="6" style="fill:var(--rx);stroke:var(--panel);stroke-width:2"/>`}
    rs.innerHTML=s;
    const steps=R.start==='lapse'?
      (cope?[`Plan for lapses ahead of time, so a slip is expected and has a response. [[Larimer1999]]`,`Reframe the lapse: a mistake in a specific situation, something to learn from, not proof of failure. [[Larimer1999]]`,`Look at what led up to it and strengthen coping for that situation. [[Larimer1999]]`]
            :[`Without a plan, the abstinence violation effect can follow: guilt and the sense that "I have blown it". [[Larimer1999]]`,`That view of the lapse raises the chance that one drink becomes a full relapse. [[Larimer1999]]`,`Switch the coping response back on to see the reframing path.`])
      :C?[R.start==='imb'?`Notice lifestyle imbalance and the urges it builds: hidden antecedents, not only the moment itself. [[Larimer1999]]`:`Identify the high-risk situation in advance. [[Larimer1999]]`,`Practise a coping response for it in sessions. [[Larimer1999]]`,`Each success builds self-efficacy, which lowers the chance of a lapse. [[Larimer1999]]`]
         :[`No coping response is ready, so self-efficacy drops. [[Larimer1999]]`,`Positive expectations of drinking ("a drink would help") pull towards a lapse. [[Larimer1999]]`,`A lapse can then be reframed with a plan, or turn into the abstinence violation effect.`];
    $('#thRpNote').innerHTML=`<div class="kicker">${R.type}</div><h4>${R.n}</h4><p>${R.ex} <i>(illustrative example)</i></p><ol class="rpsteps">${steps.map(x=>`<li>${x}</li>`).join('')}</ol><div class="pt"><b>%t:note.plain%</b>${cope?'Having a plan ready turns a risky moment into practice.':'A slip does not erase progress. Relapse-prevention therapy plans for lapses and for getting back on track.'} [[Larimer1999]]</div><div class="hook"><b>%t:note.hook%</b>Abstinence violation effect: the guilt and loss of control after a lapse that make full relapse more likely; CBT reframes it. [[Larimer1999]]</div><p class="stage-cap">Teaching only, not a self-help plan or a substitute for care.</p>`;
  }
  function run(){if(stopP)stopP();pulse=0;stopP=animate(1600,q=>{pulse=q;drawRP()},()=>{stopP=null})}
  $$('[data-rp]').forEach(b=>b.addEventListener('click',()=>{rp=b.dataset.rp;$$('[data-rp]').forEach(x=>x.setAttribute('aria-pressed',x===b));run()}));
  const cb=$('#thCope');cb.addEventListener('click',()=>{cope=!cope;cb.setAttribute('aria-pressed',cope);cb.textContent=cope?'Coping response: used':'Coping response: not used';run()});
  const prevH=onHide.therapy;onHide.therapy=()=>{prevH&&prevH();if(stopP)stopP();stopP=null};
  const prevR=redraws.therapy;redraws.therapy=()=>{prevR&&prevR();drawRP()};
  drawRP();
};
