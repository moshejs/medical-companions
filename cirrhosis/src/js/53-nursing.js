/* =============== 5.3 Nursing care =============== */
/* t 0..1 = the shift 07:00 -> 19:00 */
const NU_H=t=>7+12*clamp(t), NU_T=h=>(h-7)/12;
const NU_STEPS=[
 {from:0,at:NU_T(7.5),k:'07:00 · handover',t:'Baseline: weight, girth, balance',
  txt:`The day starts with the measurements everything else is compared against. LiverHope's decompensated-cirrhosis nursing measures: vital signs, weight and abdominal girth, nutrition counselling, adherence, and assessment of quality of life, frailty, sleep, depression and anxiety; in hospital, body weight and urine volume are monitored daily. [[Fabrellas2020LiverHope]] Its ascites table says to discuss diuretic changes with the physician if weight rises, does not fall, or falls by more than 500 g/day for 2 consecutive days without leg oedema, or by more than 1 kg with oedema (quoted as published). [[Fabrellas2020LiverHope]]`,
  pt:`Weighing at the same time on the same scale each day shows whether fluid is building up or coming off.`,
  hook:`LiverHope: weight loss on diuretics above 500 g/day (no oedema) or above 1 kg/day (with oedema) for 2 days → discuss with the physician. [[Fabrellas2020LiverHope]]`},
 {from:NU_T(8.3),at:NU_T(9),k:'08:30 · mind and bowels',t:'Mental status, asterixis, stools',
  txt:`LiverHope's hepatic encephalopathy nursing care: mental status evaluation, aspiration prevention, looking for triggers (especially infection and GI bleeding), nutrition support, skin-breakdown prevention, accurate intake and output, and bowel cleansing. [[Fabrellas2020LiverHope]] Asterixis is a brief, irregular loss of muscle tone while a posture is held, first described as the "liver flap" in hepatic encephalopathy. [[Lui2026Asterixis]] Stools are counted because lactulose is titrated to them: the US label to "2 or 3 soft stools daily", LiverHope's table to 3–4 bowel movements a day. Both are shown as published; the prescriber sets the target. [[FDA-Enulose,Fabrellas2020LiverHope]] More in <a href="#encephalopathy" data-go="encephalopathy">hepatic encephalopathy</a>.`,
  pt:`A short check of how alert and oriented the person is, a look at the hands held out, and a count of bowel movements tell the team how the brain and the lactulose are doing.`,
  hook:`Lactulose targets differ by source: US label 2–3 soft stools a day; LiverHope 3–4 bowel movements a day. Know both, follow the prescriber. [[FDA-Enulose,Fabrellas2020LiverHope]]`},
 {from:NU_T(10),at:NU_T(11.2),k:'10:00 · paracentesis',t:'Paracentesis care',
  txt:`Fluid is drained from the abdomen and the belly flattens. LiverHope, after large-volume paracentesis: blood pressure every 15 minutes for 2 hours, then every 30 minutes for 2 hours; 25% albumin as ordered; check the puncture site for leak or infection. If the site leaks, a wafer or urostomy bag can measure the fluid; if it leaks straight afterwards, the person can lie on the opposite side for a few hours (quoted as published). [[Fabrellas2020LiverHope]] Albumin reduced post-paracentesis circulatory dysfunction (OR 0.39) and death (OR 0.64) in a meta-analysis of 17 trials, and severe bleeding after 4,729 paracenteses was 0.19%. [[Bernardi2012Hepatology,Pache2005]]`,
  pt:`After the drain, blood pressure is checked often for a few hours, because removing a lot of fluid can make it drop.`,
  hook:`Post-paracentesis BP: every 15 min × 2 h, then every 30 min × 2 h (LiverHope). [[Fabrellas2020LiverHope]]`},
 {from:NU_T(12.7),at:NU_T(13.4),k:'13:00 · bleeding watch',t:'Watching for bleeding',
  txt:`LiverHope's GI-bleeding nursing: monitor lying and standing blood pressure and heart rate, mental status, skin pallor and temperature, urine volume, and the colour of vomit or stool (black or bright red); know how severe the varices are before passing a nasogastric tube. [[Fabrellas2020LiverHope]] In clinic it suggests checking that a beta-blocker has an adequate effect (a 25% fall in heart rate, to about 55–60 bpm). Baveno VII 7.7: in people with ascites, beta-blockers or carvedilol are reduced or stopped if systolic pressure stays under 90 mmHg or mean arterial pressure under 65 mmHg and/or with HRS-AKI. [[Fabrellas2020LiverHope,deFranchis2022BavenoVII]]`,
  pt:`Black, tarry stool (melaena) or vomiting blood can mean bleeding inside. It is an emergency.`,
  hook:`Black tarry stool = melaena = upper GI bleeding until proven otherwise: teach patients and caregivers to recognise it. [[Fabrellas2020LiverHope]]`},
 {from:NU_T(14.7),at:NU_T(15.4),k:'15:00 · infection and skin',t:'Infection screen and skin care',
  txt:`LiverHope's infection priorities: prevention (especially with encephalopathy or leg oedema), watching for signs of sepsis, minimising invasive procedures and timely antibiotics; avoid bladder catheters unless there is incontinence with skin breakdown or severe kidney injury needing exact output. Early signs to look for: fever, abdominal pain, early encephalopathy, painful urination and respiratory symptoms. Skin: prevent pressure injuries, especially in fragile, malnourished people, and care for the skin of swollen legs. [[Fabrellas2020LiverHope]] In a meta-analysis of 178 studies, infection raised the odds of death about fourfold (OR 3.75); 30.3% of infected patients died within a month (population figures). [[Arvaniti2010Gastro]]`,
  pt:`Early signs of infection to look for include fever, belly pain and new confusion, so small changes are reported early.`,
  hook:`Infection raises the odds of death about fourfold in cirrhosis (OR 3.75). [[Arvaniti2010Gastro]]`},
 {from:NU_T(16.6),at:NU_T(17.3),k:'17:00 · alcohol and food',t:'Withdrawal watch and nutrition',
  txt:`The CIWA-Ar is a shortened 10-item scale for quantifying alcohol withdrawal severity. [[Sullivan1989CIWA]] ACG 2024: withdrawal in alcohol-related liver disease "should be assessed and managed as per the CIWA-Ar protocol", and clinicians should distinguish it from hepatic encephalopathy, recognising the two can coexist. Mild or moderate withdrawal usually begins 6–24 hours after the last drink; withdrawal scores are not validated in severe liver disease, a symptom-triggered approach is preferred, and short- or intermediate-acting benzodiazepines (lorazepam, oxazepam) are safer with poor liver function. [[Jophlin2024ACG]] AASLD 2021: a dietitian within 24 hours of admission, and as little fasting and nil-by-mouth time as possible. [[Lai2021AASLD]] In hospital, brief alcohol interventions reduced deaths at 6 months (RR 0.42). [[McQueen2011]]`,
  pt:`Withdrawal and liver-related confusion can look alike and can happen together; the team checks for both.`,
  hook:`CIWA-Ar = 10 items. In liver disease ACG prefers symptom-triggered treatment and shorter-acting benzodiazepines (lorazepam, oxazepam). [[Sullivan1989CIWA,Jophlin2024ACG]]`},
 {from:NU_T(18.2),at:NU_T(19),k:'18:30 · handover',t:'Teaching before home',
  txt:`LiverHope's three main teaching aims in decompensated cirrhosis: recognising and preventing complications, falls awareness and prevention, and the effects and side effects of medicines; the main caregiver should attend each visit. At home, people are taught to monitor their weight and to call when it rises by more than 500 g/day for at least 3 consecutive days, and that NSAIDs such as aspirin and ibuprofen must be avoided. [[Fabrellas2020LiverHope]] In 150 outpatients only 53% of self-management questions were answered correctly at baseline; a short booklet raised that to 67% at 3 months (Early evidence). [[Volk2013Knowledge]] More in <a href="#living" data-go="living">living with cirrhosis</a>.`,
  pt:`Before going home, the person and their carer learn the warning signs, how to weigh daily, and what each medicine does.`,
  hook:`After a decompensation, 37% were readmitted within a month. [[Volk2012Readmit]]`}
];
const NU_TODO=[
 ['Weigh: same time, same scale','Measure abdominal girth','Vital signs','Start intake and output chart','Check adherence and nutrition'],
 ['Mental status check','Look for asterixis (liver flap)','Count stools on lactulose','Aspiration and falls precautions','Look for triggers: infection, bleeding'],
 ['BP every 15 min for 2 h','then every 30 min for 2 h','25% albumin as ordered','Check puncture site for leak','Leak: bag to measure the fluid'],
 ['BP and pulse lying and standing','Pallor, temperature, mental status','Colour of vomit or stool','Urine volume','Beta-blocker: heart-rate effect'],
 ['Fever, belly pain, new confusion','Painful urination, cough','Avoid a bladder catheter if possible','Pressure areas, oedematous skin','Timely antibiotics if ordered'],
 ['Withdrawal: CIWA-Ar per protocol','Withdrawal vs HE: can coexist','Dietitian within 24 h','Avoid long nil-by-mouth','Offer a brief alcohol intervention'],
 ['Teach red flags, melaena','Teach daily weights at home','Medicines: effects, side effects','Main caregiver present','Follow-up arranged']
];
/* variceal bleed sorter: now | hours | no */
const NU_VB=[
 {n:'Large-bore peripheral IV (16–18 gauge)',a:'now',w:`LiverHope: insert a large-bore peripheral IV (16–18 gauge). [[Fabrellas2020LiverHope]]`},
 {n:'Monitor BP, pulse, mental status, vomit and stool colour',a:'now',w:`LiverHope lists lying and standing BP and heart rate, mental status, pallor, temperature, urine volume and the colour of vomit or stool. [[Fabrellas2020LiverHope]]`},
 {n:'Start the vasoactive drug as ordered',a:'now',w:`Baveno VII: vasoactive drugs (terlipressin, somatostatin, octreotide) "should be started as soon as possible and continued for 2–5 days". [[deFranchis2022BavenoVII]]`},
 {n:'Antibiotic prophylaxis as ordered',a:'now',w:`Baveno VII: antibiotic prophylaxis "is an integral part of therapy" and starts from admission. [[deFranchis2022BavenoVII]] In a Cochrane review it reduced mortality (RR 0.79). [[ChavezTapia2010Cochrane]]`},
 {n:'Conservative red-cell transfusion (target Hb 7–8 g/dl)',a:'now',w:`Baveno VII 6.2: transfusion should be conservative, target haemoglobin 7–8 g/dl, adjusted for heart disease, age, haemodynamics and ongoing bleeding. LiverHope: transfuse if haemoglobin is under 7 g/dL. [[deFranchis2022BavenoVII,Fabrellas2020LiverHope]]`},
 {n:'Upper endoscopy',a:'hours',w:`Baveno VII 6.17: after resuscitation, upper endoscopy within 12 hours of presentation. [[deFranchis2022BavenoVII]]`},
 {n:'Lactulose by mouth or enema to clear blood from the gut',a:'hours',alt:'now',w:`Baveno VII 6.33: rapid removal of blood from the gut with lactulose (oral or enemas) should be used to prevent hepatic encephalopathy; LiverHope lists it in the bleeding table. Early in the course, so "now" is also reasonable. [[deFranchis2022BavenoVII,Fabrellas2020LiverHope]]`},
 {n:'Fresh frozen plasma to correct the INR',a:'no',w:`Baveno VII 6.36: fresh frozen plasma is not recommended: it will not correct the coagulopathy and may worsen portal hypertension. [[deFranchis2022BavenoVII]]`},
 {n:'Transfuse up to a normal haemoglobin',a:'no',w:`Baveno VII 6.2 calls for conservative transfusion with a target of 7–8 g/dl, not a normal level. [[deFranchis2022BavenoVII]]`}
];
const NU_VBC={now:'Now: first minutes',hours:'Within hours',no:'Not recommended'};
const NU_Q=[
 {q:'A person has had a large-volume paracentesis. Which blood-pressure schedule does the LiverHope nursing table give afterwards?',o:['Every 15 minutes for 2 hours, then every 30 minutes for 2 hours','Once an hour for 4 hours','Once, when the drain is removed','Every 4 hours for 24 hours'],a:0,
  e:`LiverHope: blood pressure every 15 minutes for 2 hours and then every 30 minutes for 2 hours, 25% albumin as ordered, and a check of the puncture site for leak or infection. [[Fabrellas2020LiverHope]]`},
 {q:'A person taking lactulose for hepatic encephalopathy has had one bowel movement in the last 24 hours. Which response fits the published targets?',o:['This is below both published targets; report it so the prescriber can review the dose','One bowel movement a day is the target, so no action is needed','Stop the lactulose, as it is not working','Give an antidiarrhoeal so the stools stay formed'],a:0,
  e:`The US label adjusts the dose "to produce 2 or 3 soft stools daily"; LiverHope's nursing table uses 3–4 bowel movements a day and considers cleansing enemas if there are none. One a day is below both. [[FDA-Enulose,Fabrellas2020LiverHope]]`},
 {q:'A person with cirrhosis and ascites asks for something for back pain. Which medicine does AASLD 2022 call the preferred first-line choice?',o:['Ibuprofen','Paracetamol (acetaminophen), up to 2 g a day','Tramadol','Codeine'],a:1,
  e:`AASLD 2022: "Acetaminophen, 500 mg every 6 h, up to a maximum dose of 2 g/d, is the preferred first-line pharmacotherapy", and "Systemic NSAIDs should be avoided". Codeine, morphine and tramadol should generally be avoided. [[Rogal2022AASLD]]`},
 {q:'On the afternoon round a person passes a black, tarry stool and their pulse is higher than at handover. What is the priority?',o:['Treat it as possible upper GI bleeding: check BP and pulse lying and standing, mental status and pallor, and escalate at once','Record it and recheck at the next routine round','Give a laxative to clear the bowel','Encourage oral fluids and review tomorrow'],a:0,
  e:`Black stool (melaena) is a sign of GI bleeding that patients and caregivers are taught to recognise. LiverHope's bleeding observations include lying and standing BP and heart rate, mental status, pallor and the colour of stool or vomit. [[Fabrellas2020LiverHope]]`},
 {q:'A person with covert hepatic encephalopathy asks for a sleeping tablet. Which statement is supported by the sources?',o:['Benzodiazepines should generally not be used for sleep in cirrhosis because of sedation, confusion and falls','Long-acting benzodiazepines are the safest choice in cirrhosis','Falls are no more common with cognitive problems','Sleep problems are rare in cirrhosis'],a:0,
  e:`AASLD 2022 advises against benzodiazepines for sleep (sedation, respiratory depression, cognitive impairment, falls) and describes short-term melatonin or hydroxyzine in Child–Pugh A and B. [[Rogal2022AASLD]] Falls within a year: 52.3% with cognitive dysfunction vs 6.5% without. [[Soriano2012]]`},
 {q:'Spironolactone has just been started for ascites. Which blood test does the label say to check within one week?',o:['Ammonia','Potassium','Amylase','Cholesterol'],a:1,
  e:`The spironolactone label says to monitor potassium within one week of starting, and warns of hyperkalaemia, hyponatraemia and, in cirrhosis with ascites, fluid and electrolyte shifts that may worsen hepatic encephalopathy. [[FDA-Aldactone]]`},
 {q:'A person with alcohol-related cirrhosis, admitted 10 hours after their last drink, is tremulous and muddled. Which statement fits ACG 2024?',o:['Confusion rules out alcohol withdrawal','Withdrawal and hepatic encephalopathy can coexist; assess per the CIWA-Ar protocol and look for encephalopathy too','Withdrawal never begins before 72 hours','Long-acting benzodiazepines are preferred in poor liver function'],a:1,
  e:`ACG 2024: assess withdrawal per the CIWA-Ar protocol and distinguish it from hepatic encephalopathy, recognising both can coexist; mild or moderate withdrawal usually starts 6–24 hours after the last drink; short- or intermediate-acting benzodiazepines (lorazepam, oxazepam) are safer in poor liver function. [[Jophlin2024ACG]]`}
];
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT'),note=$('#nuNote');let setSt=()=>{};
  const BP=[];for(let k=1;k<=8;k++)BP.push(10.5+k*.25);for(let k=1;k<=4;k++)BP.push(12.5+k*.5);
  const STOOL=[8.2,12.6,16.4],INP=[[7.5,250],[8,200],[10.6,100],[12.5,300],[15,200],[17.5,300]],OUT=[[8.2,150],[9.5,300],[12.6,150],[13,250],[16.4,150],[16.8,300]];
  const hh=h=>String(Math.floor(h)).padStart(2,'0')+':'+String(Math.round((h%1)*60)%60).padStart(2,'0');
  function hand(x,y,a){return `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-46" y="-6" width="40" height="12" rx="6" style="fill:var(--skin);stroke:var(--brain-line)"/><g transform="rotate(${f1(a)} -6 0)"><path d="M-8 -9h18q6 0 6 6v6q0 6 -6 6h-18z" style="fill:var(--skin);stroke:var(--brain-line)"/>${[-6,-2,2,6].map(d=>`<rect x="14" y="${d-1.6}" width="16" height="3.4" rx="1.7" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:.8"/>`).join('')}</g></g>`}
  function draw(t){const N=vb(svg,'720 372','400 552'),h=NU_H(t),p=phaseOf(NU_STEPS,t);let s='';
    const W=N?400:720,tx0=N?20:30,tx1=W-(N?20:30),X=v=>lerp(tx0,tx1,(v-7)/12);
    /* shift timeline */
    s+=`<line x1="${tx0}" x2="${tx1}" y1="26" y2="26" class="axis"/>`;
    for(let k=7;k<=19;k++){const big=k%2===1;s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${big?20:23}" y2="29" class="axis"/>`;if(big&&(!N||k%4===3))s+=`<text x="${f1(X(k))}" y="14" class="t-xs t-mid">${String(k).padStart(2,'0')}:00</text>`}
    NU_STEPS.forEach((st,i)=>{const sx=X(NU_H(st.at));s+=`<circle cx="${f1(sx)}" cy="26" r="${i===p?6:4}" style="fill:${i<=p?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.6"/>`});
    s+=`<path d="M${f1(X(h))} 34l-5 8h10z" style="fill:var(--ink)"/>`;
    /* patient */
    const fl=lerp(.8,.32,ease(ramp(h,10,10.6))),tap=h>=10&&h<10.8?ramp(h,10,10.15):0;
    const px=N?82:122,py=N?58:52,ps=N?.74:1;
    s+=abdomen(px,py,ps,{fluid:fl,tap,jaundice:.25,liver:true,fib:4}).svg;
    s+=`<text x="${px}" y="${f1(py+228*ps)}" class="t-xs t-mid">${h<10?'ascites':h<10.8?'paracentesis':'after paracentesis'}</text>`;
    /* step badge under the patient */
    const bx=N?82:122,by=N?250:302;
    if(p===1){const a=-18*Math.abs(Math.sin(h*40));s+=hand(bx+6,by+10,a)+`<text x="${bx}" y="${by+42}" class="t-xs t-mid">arms out, wrists back:</text><text x="${bx}" y="${by+54}" class="t-xs t-mid">a flap = asterixis</text>`}
    else if(p===3){[['#7b5232','brown'],['#141414','black'],['var(--artery)','red']].forEach(([c,n],i)=>{const cx=bx-44+i*44;s+=`<circle cx="${cx}" cy="${by+8}" r="11" style="fill:${c};stroke:var(--line)"/><text x="${cx}" y="${by+34}" class="t-xs t-mid" style="${i?'fill:var(--bad)':''}">${n}</text>`});s+=`<text x="${bx}" y="${by+50}" class="t-xs t-mid">stool and vomit colour</text>`}
    else if(p===4){const tmp=lerp(36.8,37.4,ramp(h,14.7,15.6));s+=`<rect x="${bx-6}" y="${by-14}" width="12" height="40" rx="6" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${bx-3}" y="${f1(by+22-26*ramp(tmp,36,38))}" width="6" height="${f1(26*ramp(tmp,36,38))}" rx="3" style="fill:var(--bad)"/><circle cx="${bx}" cy="${by+26}" r="8" style="fill:var(--bad)"/><text x="${bx+16}" y="${by+10}" class="t-sm">${tmp.toFixed(1)} °C</text><text x="${bx}" y="${by+50}" class="t-xs t-mid">${N?'report small changes':'report small changes early'}</text>`}
    else if(p===5){s+=`<rect x="${bx-58}" y="${by-14}" width="116" height="46" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/><text x="${bx}" y="${by+4}" class="t-lbl t-mid">CIWA-Ar</text><text x="${bx}" y="${by+20}" class="t-xs t-mid">10 items · per protocol</text><text x="${bx}" y="${by+48}" class="t-xs t-mid">${N?'can coexist with HE':'withdrawal and HE can coexist'}</text>`}
    else if(p===2){s+=`<text x="${bx}" y="${by+6}" class="t-sm t-mid" style="fill:var(--fluid)">albumin 25% as ordered</text><text x="${bx}" y="${by+24}" class="t-xs t-mid">site: leak? infection?</text>`}
    else if(p===6){s+=`<text x="${bx}" y="${by+6}" class="t-sm t-mid" style="fill:var(--rx)">teach-back with the carer</text><text x="${bx}" y="${by+24}" class="t-xs t-mid">${N?'weights, red flags':'weights, red flags, medicines'}</text>`}
    else{s+=`<text x="${bx}" y="${by+6}" class="t-sm t-mid">same scale, same time</text><text x="${bx}" y="${by+24}" class="t-xs t-mid">girth at the navel</text>`}
    /* observation chart */
    const ox=N?172:262,ow=N?212:206,oy=N?54:52;let y=oy;const OX=v=>lerp(ox,ox+ow,(v-7)/12);
    s+=`<rect x="${ox-8}" y="${oy-6}" width="${ow+16}" height="280" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${ox}" y="${y+8}" class="t-sm">DAILY WEIGHT · GIRTH</text>`;
    if(h>=7.3){s+=`<text x="${ox}" y="${y+30}" class="t-big" style="font-size:20px">78.4 kg</text><text x="${ox}" y="${y+46}" class="t-xs">−0.7 kg since yesterday</text><text x="${ox}" y="${y+59}" class="t-xs">girth ${h>=10.8?'98 cm after drain (102 at 07:00)':'102 cm at the navel'}</text>`}
    y+=72;
    s+=`<text x="${ox}" y="${y+8}" class="t-sm">INTAKE / OUTPUT (mL)</text>`;
    const sum=A=>A.reduce((a,[tt,v])=>a+(h>=tt?v:0),0),iv=sum(INP),ovv=sum(OUT),bw=ow-60;
    [['in',iv,'var(--fluid)'],['out',ovv,'var(--bile)']].forEach(([n,v,c],i)=>{const yy=y+18+i*16;s+=`<text x="${ox}" y="${yy+9}" class="t-xs">${n}</text><rect x="${ox+26}" y="${yy}" width="${bw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${ox+26}" y="${yy}" width="${f1(bw*v/1500)}" height="10" rx="3" style="fill:${c}"/><text x="${ox+ow}" y="${yy+9}" class="t-xs t-end">${v}</text>`});
    y+=56;
    s+=`<text x="${ox}" y="${y+8}" class="t-sm">STOOLS ON LACTULOSE · TODAY</text>`;
    const ns=STOOL.filter(v=>h>=v).length;for(let k=0;k<4;k++){const sx=ox+k*24;s+=`<rect x="${sx}" y="${y+18}" width="18" height="18" rx="4" style="fill:${k<ns?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.4;opacity:${k<ns?1:.5}"/>`}
    s+=`<text x="${ox+102}" y="${y+31}" class="t-big" style="font-size:18px">${ns}</text><text x="${ox+118}" y="${y+31}" class="t-xs">so far</text>`;
    s+=`<text x="${ox}" y="${y+52}" class="t-xs">US label: 2 or 3 soft stools a day</text><text x="${ox}" y="${y+64}" class="t-xs">LiverHope: 3–4 bowel movements a day</text>`;
    y+=78;
    if(!N||true){s+=`<text x="${ox}" y="${y+8}" class="t-sm">BP AFTER PARACENTESIS</text>`;
      const BX=v=>lerp(ox+6,ox+ow-6,(v-10.5)/4);
      s+=`<line x1="${f1(BX(10.5))}" x2="${f1(BX(14.5))}" y1="${y+26}" y2="${y+26}" class="axis"/>`;
      BP.forEach(v=>{const on=h>=v;s+=`<circle cx="${f1(BX(v))}" cy="${y+26}" r="${on?4:3}" style="fill:${on?'var(--fluid)':'var(--panel)'};stroke:var(--fluid);stroke-width:1.3"/>`});
      [10.5,12.5,14.5].forEach((v,i)=>{s+=`<text x="${f1(BX(v))}" y="${y+56}" class="t-xs ${['','t-mid','t-end'][i]}" style="${''}">${hh(v)}</text>`});
      const done=BP.filter(v=>h>=v).length;s+=`<text x="${ox+ow}" y="${y+8}" class="t-xs t-end">${done}/12</text>`;
      s+=`<text x="${f1((BX(10.5)+BX(12.5))/2)}" y="${y+42}" class="t-xs t-mid">every 15 min</text><text x="${f1((BX(12.5)+BX(14.5))/2)}" y="${y+42}" class="t-xs t-mid">every 30 min</text>`}
    /* priorities */
    const cx0=N?20:490,cy0=N?352:52,cw=N?360:214;
    s+=`<text x="${cx0}" y="${cy0+8}" class="t-sm" style="fill:var(--rx)">PRIORITIES · ${hh(h)}</text>`;
    const st=NU_STEPS[p],u=ramp(t,st.from,Math.max(st.from+.001,(NU_STEPS[p+1]?NU_STEPS[p+1].from:1)-.02));
    NU_TODO[p].forEach((ln,i)=>{const yy=cy0+(N?28:34)+i*(N?30:40),done=u>=(i+1)/(NU_TODO[p].length+.5);
      s+=`<rect x="${cx0}" y="${yy-12}" width="16" height="16" rx="4" style="fill:${done?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.5"/>`;
      if(done)s+=`<path d="M${cx0+4} ${yy-4}l3.5 3.5l5.5 -7" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
      s+=`<text x="${cx0+24}" y="${yy+1}" class="t-lbl" style="font-weight:${done?700:500};font-size:${N?12.5:12.5}px">${ln}</text>`});
    s+=`<text x="${cx0}" y="${cy0+(N?28:34)+5*(N?30:40)+4}" class="t-xs">${NU_STEPS[p].k}</text>`;
    svg.innerHTML=s;note.innerHTML=noteHTML(NU_STEPS[p]);setSt(p);
    svg.setAttribute('aria-label',`Shift time ${hh(h)}. ${NU_STEPS[p].t}. Priorities: ${NU_TODO[p].join('; ')}.`)}
  const stop=playWire(rg,$('#nuPlay'),draw,22000,'%t:player.replay%','nursing');
  setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- variceal bleed sorter ---- */
  const vbx=$('#nuVb'),vs=$('#nuVbScore'),pick={};
  vbx.innerHTML=NU_VB.map((v,i)=>`<div class="row" data-nuvb="${i}"><b>${v.n}</b><div class="opts3" role="group" aria-label="When: ${v.n}">${Object.keys(NU_VBC).map(c=>`<button class="btn" data-nuc="${c}" aria-pressed="false">${NU_VBC[c]}</button>`).join('')}</div><div class="fb" aria-live="polite"></div></div>`).join('');
  const vscore=()=>{const n=Object.keys(pick).length,ok=NU_VB.filter((v,i)=>pick[i]!=null&&(pick[i]===v.a||pick[i]===v.alt)).length;vs.innerHTML=n?`<span>Sorted <b>${n}</b> of ${NU_VB.length}</span><span>Matching the sources: <b>${ok}</b></span>`:'<span>Choose a time for each action.</span>'};
  vbx.addEventListener('click',e=>{const b=e.target.closest('[data-nuc]');if(!b)return;const row=b.closest('[data-nuvb]'),i=+row.dataset.nuvb,v=NU_VB[i];pick[i]=b.dataset.nuc;
    $$('[data-nuc]',row).forEach(q=>q.setAttribute('aria-pressed',q===b));const ok=pick[i]===v.a||pick[i]===v.alt,fb=$('.fb',row);fb.className='fb '+(ok?'ok':'off');
    fb.innerHTML=`<b>${ok?'Matches the sources.':'The sources place it: '+NU_VBC[v.a]+'.'}</b> ${v.w}`;vscore()});
  vscore();

  /* ---- exam-style scenarios ---- */
  const qc=$('#nuQ'),ans={};let qi=0;
  function q(){const Q=NU_Q[qi],L='ABCD',a=ans[qi];
    qc.innerHTML=`<div class="kicker">Scenario ${qi+1} of ${NU_Q.length}</div><p class="q">${Q.q}</p><div class="opts">${Q.o.map((o,i)=>`<button class="opt${a!=null?(i===Q.a?' right':i===a?' wrong':''):''}" data-nuo="${i}"${a!=null?' disabled':''}><span class="l">${L[i]}</span><span>${o}</span></button>`).join('')}</div>${a!=null?`<div class="expl"><b>${a===Q.a?'Correct.':'Not quite: the answer is '+L[Q.a]+'.'}</b> ${Q.e}</div>`:''}`;
    $('#nuBar').style.width=(100*Object.keys(ans).length/NU_Q.length)+'%';
    $('#nuQn').textContent=`${Object.keys(ans).filter(k=>ans[k]===NU_Q[k].a).length} correct of ${Object.keys(ans).length} answered`;
    $('#nuPrev').disabled=qi===0;$('#nuNext').disabled=qi===NU_Q.length-1}
  qc.addEventListener('click',e=>{const b=e.target.closest('[data-nuo]');if(!b||ans[qi]!=null)return;ans[qi]=+b.dataset.nuo;q()});
  $('#nuPrev').addEventListener('click',()=>{if(qi>0){qi--;q()}});$('#nuNext').addEventListener('click',()=>{if(qi<NU_Q.length-1){qi++;q()}});
  q();
};
