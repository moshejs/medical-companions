/* =============== 4.2 Hospital treatment =============== */
/* Main scrubber: an admission on a stretched time axis (square root of hours, so the first two hours and
   two weeks both fit). Left, a bed scene with an oxygen or NIV mask and a monitor of made-up example
   values; right, seven lanes that fill in as the cursor passes: controlled oxygen, blood gases,
   bronchodilators, steroid (5 or 14 days, REDUCE), antibiotic (if sputum is purulent), NIV (if acidotic)
   and going home. Then a trial results explorer (bars or ratio plots) and the DECAF score. */
const HS_STEPS=[
 {from:0,at:.07,k:'Arrival',t:'Controlled oxygen, then a blood gas',ts:'Controlled oxygen, then a blood gas',sh:'Arrival',
  txt:`Before blood gases are known in COPD, BTS 2017 says to "use a 24% Venturi mask at 2–3 L/min or 28% Venturi mask at 4 L/min or nasal cannulae at 1–2 L/min", aiming for 88–92%. If the PCO2 is normal, the target is adjusted to 94–98% (unless there is a history of NIV or invasive ventilation), and gases are rechecked after 30–60 minutes. [[ODriscoll2017Summary]] GOLD 2023 adds that Venturi masks give more accurate delivery than nasal prongs. [[Agusti2023]]`,
  pt:`In hospital, staff give a measured amount of oxygen and take a blood sample from an artery to check oxygen, carbon dioxide and acid. [[ODriscoll2017Summary]]`,
  hook:`Before gases: 24% Venturi at 2–3 L/min or 28% at 4 L/min, target 88–92%, recheck gases at 30–60 min. [[ODriscoll2017Summary]]`},
 {from:.16,at:.22,k:'Medicines',t:'Bronchodilators, 5 days of steroid, antibiotics if sputum is purulent',ts:'Bronchodilator, steroid, antibiotic',sh:'Medicines',
  txt:`GOLD 2023 lists short-acting bronchodilators first (SABA with or without SAMA), preferring air-driven to oxygen-driven nebulisers; "40 mg prednisone-equivalent per day for 5 days"; and antibiotics for 5–7 days when sputum volume and purulence increase. [[Agusti2023]] In REDUCE, 5 days of prednisone 40 mg was non-inferior to 14 days for re-exacerbation within 180 days (37.2% against 38.4%). [[Leuppi2013]] Use the sputum and steroid buttons to change the lanes.`,
  pt:`A short course of steroid tablets (often 5 days) helps the airways calm down. Antibiotics help most when phlegm increases and changes colour. [[Leuppi2013,Anthonisen1987]]`,
  hook:`Prednisone 40 mg for 5 days is as good as 14 days (REDUCE), and oral works as well as IV. [[Leuppi2013,deJong2007]]`},
 {from:.3,at:.36,k:'Check the acid',t:'pH below 7.35 with high CO2 despite treatment',ts:'Is the blood acidic?',sh:'Acid',
  txt:`BTS/ICS 2016: "NIV should be started when pH &lt;7.35 and pCO2 &gt;6.5 kPa persist or develop despite optimal medical therapy". [[Davidson2016Summary]] BTS 2017 puts it as respiratory acidosis with PCO2 &gt;6 kPa persisting for more than 30 minutes after initial standard management. [[ODriscoll2017Summary]] Choose the not-acidotic example to see the NIV lane stay empty.`,
  pt:`If carbon dioxide builds up and the blood turns acidic despite treatment, a mask machine (NIV) can help. [[Osadnik2017]]`,
  hook:`NIV line (BTS/ICS): pH &lt;7.35 and pCO2 &gt;6.5 kPa persisting despite optimal medical therapy. [[Davidson2016Summary]]`},
 {from:.42,at:.5,k:'NIV',t:'The mask machine within the hour',ts:'The mask machine within the hour',sh:'NIV',
  txt:`BTS Quality Standards: start NIV within 60 minutes of the qualifying blood gas (and within 120 minutes of arrival), and recheck gases within 2 hours of starting. [[Davies2018]] In the Cochrane review (17 trials, 1264 people), NIV cut mortality by 46% (RR 0.54, NNT 12) and intubation by 65% (RR 0.36, NNT 5), and raised pH by 0.05 at one hour. [[Osadnik2017]] BTS/ICS advises maximising time on NIV in the first 24 hours. [[Davidson2016Summary]]`,
  pt:`NIV gives breathing support through a mask, and it often avoids a breathing tube. [[Osadnik2017]]`,
  hook:`NIV: NNT 12 to prevent a death and NNT 5 to prevent an intubation. [[Osadnik2017]]`},
 {from:.6,at:.68,k:'Escalate or ease off',t:'Intubate if pH keeps falling, wean as it normalises',ts:'Escalate, or ease off NIV',sh:'Escalate',
  txt:`BTS/ICS Box 1 lists "persisting pH &lt;7.15 or deterioration in pH despite NIV" among the indications for invasive ventilation. As things improve, daytime NIV is tapered over 2–3 days before stopping overnight, and NIV stops once pH and pCO2 have normalised. [[Davidson2016Summary]] GOLD 2023: once patients tolerate at least 4 hours of unassisted breathing, NIV can be stopped directly without weaning. [[Agusti2023]]`,
  pt:`If breathing keeps getting worse on the mask, a breathing tube may be needed. As things improve, the mask is used less and less. [[Davidson2016Summary]]`,
  hook:`Invasive ventilation if pH &lt;7.15 persists or pH worsens despite NIV (BTS/ICS Box 1). [[Davidson2016Summary]]`},
 {from:.78,at:.9,k:'Going home',t:'Bundle, follow-up, rehab',ts:'Going home: bundle, follow-up, rehab',sh:'Home',
  txt:`Discharge bundles cut readmissions (pooled RR 0.80) [[Ospina2017]], and so did rehabilitation after a flare-up (OR 0.44). [[Puhan2016]] GOLD 2023 advises follow-up within one month and again at three months. [[Agusti2023]] ERS/ATS suggests starting rehabilitation within 3 weeks of discharge. [[Wedzicha2017]] After hypercapnic failure, the BTS/ICS checklist adds an oxygen alert card and consideration of home NIV. [[Davidson2016Summary]]`,
  pt:`A check-up within a month of leaving hospital, and a rehab course, lower the chance of going back in. [[Agusti2023,Puhan2016]]`,
  hook:`Discharge bundle RR 0.80 and post-exacerbation rehab OR 0.44 for readmission. [[Ospina2017,Puhan2016]]`}
];
const HS_TXT={
  lanes:['Oxygen','Blood gas','Bronchodilator','Steroid','Antibiotic','NIV','Going home'],
  o2:'88–92%',saba:'SABA ± SAMA',st:n=>`40 mg × ${n} d`,ab:'5–7 days',abNo:'criteria not met',niv:'NIV',nivNo:'not needed',fu:'review ≤1 month →',fuN:'≤1 month →',
  ticks:[[0,'0'],[2,'2 h'],[24,'1 d'],[48,'2 d'],[120,'5 d'],[336,'14 d']],
  mon:'example values',spo2:'SpO2',ph:'pH',pco2:'PaCO2',kpa:v=>`${v.toFixed(1)} kPa`,pct:v=>`${Math.round(v)}%`,
  when:h=>h<1?`${Math.round(h*60)} min`:h<24?`${h.toFixed(h<2?1:0)} h`:`day ${Math.floor(h/24)+1}`,
  nivW:['on','tapering','off','not needed'],
  stW:(d,n)=>d>n?'course finished':`day ${d} of ${n}`,
  read:(w,niv,st)=>`<span>Time <b>${w}</b></span><span>Oxygen target <b>88–92%</b></span><span>NIV <b>${niv}</b></span><span>Steroid <b>${st}</b></span>`,
  ann:[
    ['Before gases: 24% Venturi at 2–3 L/min, 28% at 4 L/min, or nasal cannulae at 1–2 L/min (BTS 2017)','Blood gas on arrival, rechecked after 30–60 minutes'],
    ['Bronchodilator: SABA with or without SAMA; air-driven nebuliser preferred (GOLD 2023)','Steroid: 40 mg prednisone-equivalent a day for 5 days (GOLD 2023)','Antibiotic for 5–7 days when sputum volume and purulence increase (GOLD 2023)'],
    ['NIV line (BTS/ICS): pH <7.35 and pCO2 >6.5 kPa persisting despite optimal medical therapy'],
    ['Start NIV within 60 min of the qualifying gas; recheck gases within 2 h (BTS Quality Standards)','Maximise time on NIV in the first 24 hours (BTS/ICS)'],
    ['Taper daytime NIV over 2–3 days, then stop overnight; stop once pH and pCO2 normalise','pH <7.15 persisting, or falling despite NIV: invasive ventilation (BTS/ICS Box 1)'],
    ['Before home: inhaler education, home support, a follow-up plan (GOLD 2023)','Review within 1 month and at 3 months; rehab within 3 weeks of discharge (ERS/ATS)']],
  annAcid:'In this example the acidosis persists, so the NIV line is met',annNo:'In this example there is no acidosis: the NIV lane stays empty',
  ann14:'REDUCE: 14 days was no better than 5 for re-exacerbation at 180 days',
  /* trial explorer */
  trOut:'Outcome',
  /* DECAF */
  decY:'% died in hospital',decX:'DECAF score',decN:n=>`n=${n}`,
  dec:(s,m)=>`DECAF ${s}: in the 1725-patient validation cohort, ${m}% of patients with this score died in hospital.`,
  decLo:' The authors describe 0–1 as low risk.',decHi:' The authors describe 3–6 as high risk.',decSix:' Only 2 patients scored 6.'
};
const HS_TR=[
  {id:'reduce',b:'REDUCE: 5 vs 14 days',t:'Re-exacerbation within 180 days, %',kind:'bars',rows:[['14 days, prednisone 40 mg',38.4,0],['5 days, prednisone 40 mg',37.2,1]],
    txt:`REDUCE (314 emergency patients, 92% admitted): 5 days was non-inferior to 14 (HR 0.95, 90% CI 0.70–1.29), with a cumulative prednisone dose of 379 mg against 793 mg. [[Leuppi2013]]`},
  {id:'dejong',b:'Oral vs IV steroid',t:'Treatment failure at 90 days, %',kind:'bars',rows:[['IV prednisolone 60 mg',61.7,0],['oral prednisolone 60 mg',56.3,1]],
    txt:`210 inpatients, 5 days of prednisolone 60 mg: oral was non-inferior to IV. [[deJong2007]] Cochrane found no benefit of parenteral over oral steroid on failure, relapse or death, and more adverse effects with parenteral. [[Walters2014]]`},
  {id:'sccope',b:'SCCOPE: steroid vs placebo',t:'Treatment failure at 30 days, %',kind:'bars',rows:[['placebo',33,0],['glucocorticoids',23,1]],
    txt:`VA SCCOPE (271 inpatients): 8 weeks of steroid was no better than 2, and high blood sugar needing treatment occurred in 15% against 4%. [[Niewoehner1999]]`},
  {id:'walters',b:'Cochrane: steroids',t:'Systemic steroid against placebo',kind:'forest',rows:[['Treatment failure',.48,.35,.67,'OR 0.48 (0.35–0.67)'],['30-day mortality',1.00,null,null,'OR 1.00'],['Adverse events',2.33,null,null,'OR 2.33']],
    txt:`16 trials: treatment failure fell (NNT 9, high-quality evidence), 30-day mortality did not change, and adverse events rose (one extra per six treated). [[Walters2014]]`},
  {id:'anth',b:'Anthonisen: antibiotics',t:'Treatment success at 21 days, % (higher is better)',kind:'bars',rows:[['placebo',55,0],['antibiotic',68,1]],
    txt:`Crossover trial of 362 flare-ups defined by more breathlessness, more sputum and more purulent sputum; deterioration was 19% on placebo against 10% on antibiotic. [[Anthonisen1987]]`},
  {id:'vollen',b:'Cochrane: antibiotics',t:'Antibiotic against placebo: treatment failure',kind:'forest',rows:[['Outpatients',.72,null,null,'RR 0.72'],['Non-ICU inpatients',.65,.38,1.12,'RR 0.65 (0.38–1.12)'],['ICU (one trial)',.19,null,null,'RR 0.19']],
    txt:`19 trials, 2663 people. Outpatients: 295 to 212 failures per 1000 (low-quality evidence). Inpatients on current antibiotics: not significant. ICU: 565 to 107 per 1000, and mortality Peto OR 0.21. [[Vollenweider2018]]`},
  {id:'austin',b:'Austin: titrated oxygen',t:'Mortality before and in hospital, %',kind:'bars',rows:[['high flow, all patients',9,0],['titrated, all patients',4,1],['high flow, confirmed COPD',9,0],['titrated, confirmed COPD',2,1]],
    txt:`Tasmanian cluster trial, 405 patients treated by paramedics: RR 0.42 overall and 0.22 in confirmed COPD. Titrated oxygen per protocol meant less acidosis and lower PaCO2. [[Austin2010]] A Cochrane review found it is still the only such trial; certainty was low. [[Kopsaftis2020]]`},
  {id:'brochard',b:'Brochard 1995: NIV',t:'85 ICU patients, %',kind:'bars',rows:[['standard: intubated',74,0],['NIV: intubated',26,1],['standard: died in hospital',29,0],['NIV: died in hospital',9,1]],
    txt:`NIV also cut complications from 48% to 16% and the mean stay from 35 to 23 days. [[Brochard1995]]`},
  {id:'plant',b:'Plant 2000: ward NIV',t:'236 patients on 14 UK wards, %',kind:'bars',rows:[['standard: treatment failure',27,0],['NIV: treatment failure',15,1],['standard: died in hospital',20,0],['NIV: died in hospital',10,1]],
    txt:`Mild-to-moderate acidosis on general respiratory wards; NIV raised pH faster in the first hour and lowered the breathing rate more by 4 hours. [[Plant2000]]`},
  {id:'osadnik',b:'Cochrane: NIV',t:'NIV against usual care',kind:'forest',rows:[['Mortality',.54,.38,.76,'RR 0.54 (0.38–0.76)'],['Intubation',.36,.28,.46,'RR 0.36 (0.28–0.46)']],
    txt:`17 trials, 1264 people, moderate-quality evidence: NNT 12 for a death and 5 for an intubation; stay 3.39 days shorter; similar benefit for pH 7.30–7.35 and below 7.30, on ward or ICU; more intolerance (risk difference 0.11). [[Osadnik2017]]`},
  {id:'hothmv',b:'HOT-HMV: home NIV',t:'Readmission or death within 12 months, %',kind:'bars',rows:[['home oxygen alone',80.4,0],['home NIV plus oxygen',63.4,1]],
    txt:`116 people with persistent hypercapnia 2–4 weeks after a flare-up: median time to readmission or death 4.3 against 1.4 months (adjusted HR 0.49). Median home settings: IPAP 24 and EPAP 4 cmH2O, backup rate 14. [[Murphy2017]]`},
  {id:'disc',b:'After discharge',t:'Readmission, against usual care',kind:'forest',rows:[['Discharge bundles',.80,.65,.99,'RR 0.80 (0.65–0.99)'],['Rehabilitation after a flare-up',.44,.21,.91,'OR 0.44 (0.21–0.91)'],['Hospital at home',.76,.59,.99,'RR 0.76 (0.59–0.99)']],
    txt:`Bundles: four trials at moderate-to-high risk of bias, no clear effect on mortality. [[Ospina2017]] Rehabilitation: 20 trials, heterogeneous. [[Puhan2016]] Hospital at home: 8 trials, people with pH &lt;7.35 excluded. [[Jeppesen2012]]`}
];
const HS_DECAF=[[0,0,255],[1,1.5,519],[2,5.4,498],[3,15.3,301],[4,31.0,113],[5,40.5,37],[6,50.0,2]];
const HS_KN=[[0,0],[.16,1],[.3,1.5],[.42,2],[.6,24],[.78,96],[1,336]];
const HS_V={acid:{ph:[[0,7.28],[1,7.29],[2,7.29],[4,7.33],[24,7.37],[72,7.40],[336,7.41]],co2:[[0,8.2],[1,8.0],[2,8.0],[4,7.4],[24,6.6],[72,6.0],[336,5.9]]},
  non:{ph:[[0,7.37],[1,7.38],[24,7.40],[336,7.41]],co2:[[0,5.9],[1,5.8],[24,5.6],[336,5.5]]},sat:[[0,84],[.75,90],[24,91],[336,91]]};
function hsKnot(K,x){if(x<=K[0][0])return K[0][1];for(let i=1;i<K.length;i++){const a=K[i-1],b=K[i];if(x<=b[0])return lerp(a[1],b[1],clamp((x-a[0])/(b[0]-a[0])))}return K[K.length-1][1]}
/* the bed scene in local coordinates (about 220 x 190) */
function hsScene(h,o,ph){const niv=o.acid&&h>=2&&h<72,o2=!niv&&h<120,home=h>=140;let g='';
  /* monitor */
  const V=o.acid?HS_V.acid:HS_V.non,pH=hsKnot(V.ph,h),co2=hsKnot(V.co2,h),sat=hsKnot(HS_V.sat,h)+(h>1?Math.sin(ph*9)*.6:0);
  g+=`<rect x="104" y="0" width="116" height="74" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/><text x="110" y="14" class="t-xs">${HS_TXT.mon}</text>`;
  [[HS_TXT.spo2,HS_TXT.pct(sat),sat<88?'var(--bad)':'var(--ink)'],[HS_TXT.ph,pH.toFixed(2),pH<7.35?'var(--bad)':'var(--good)'],[HS_TXT.pco2,HS_TXT.kpa(co2),co2>6.5?'var(--bad)':co2>6?'var(--warn)':'var(--good)']].forEach((r,i)=>{
    const y=32+i*17;g+=`<text x="110" y="${y}" class="t-sm">${r[0]}</text><text x="214" y="${y}" class="t-lbl t-end" style="fill:${r[2]}">${r[1]}</text>`});
  /* oxygen outlet and NIV machine */
  g+=`<rect x="4" y="30" width="16" height="12" rx="2" style="fill:var(--o2-soft);stroke:var(--o2)"/>`;
  g+=`<rect x="176" y="96" width="42" height="32" rx="5" style="fill:${niv?'var(--rx-soft)':'var(--panel-2)'};stroke:${niv?'var(--rx)':'var(--line)'}"/><text x="197" y="116" class="t-xs t-mid" style="${niv?'fill:var(--rx);font-weight:700':''}">${HS_TXT.niv}</text>`;
  /* bed */
  g+=`<rect x="0" y="118" width="7" height="48" rx="2" style="fill:var(--line)"/><rect x="0" y="150" width="172" height="14" rx="4" style="fill:var(--panel);stroke:var(--line);stroke-width:1.4"/><path d="M8 164V186M164 164V186" style="stroke:var(--line);stroke-width:3"/>`;
  g+=`<ellipse cx="26" cy="143" rx="18" ry="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
  if(!home){g+=`<circle cx="30" cy="128" r="13" style="fill:var(--brand)"/><path d="M40 150Q44 128 70 132L158 140Q168 142 166 150Z" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.2"/>`;
    if(niv){g+=`<ellipse cx="40" cy="130" rx="10" ry="12" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:2"/><path d="M28 120Q34 116 42 118" style="stroke:var(--rx);stroke-width:2;fill:none"/><path d="M48 134Q110 96 176 110" style="fill:none;stroke:var(--rx);stroke-width:2.4"/>`;
      const b=(Math.sin(ph*14)+1)/2;g+=`<circle cx="${f1(66+b*40)}" cy="${f1(119-b*13)}" r="3" style="fill:var(--air);opacity:${f1(.4+.5*b)}"/>`}
    else if(o2){g+=`<ellipse cx="40" cy="131" rx="7" ry="9" style="fill:var(--o2-soft);stroke:var(--o2);stroke-width:1.8"/><path d="M44 137Q60 80 20 40" style="fill:none;stroke:var(--o2);stroke-width:1.6"/>`}}
  else g+=person(132,186,74,{walk:ph*2,col:'var(--brand)'});
  return g}
inits.hospital=()=>{
  const svg=$('#hsSvg'),rg=$('#hsT'),rd=$('#hsRead'),o={acid:true,pur:true,sd:5};
  function draw(t){
    const N=vb(svg,'720 400','400 660'),p=phaseOf(HS_STEPS,t),S=HS_STEPS[p],h=hsKnot(HS_KN,t);
    const L=N?{sc:'translate(90 62)',gl:16,x0:124,x1:384,r0:280,rs:32,tk:500,an:526,anW:64,sy:640,cl:268}
             :{sc:'translate(16 70)',gl:250,x0:352,x1:704,r0:70,rs:30,tk:276,an:302,anW:200,sy:384,cl:56};
    let s=N?wrapT(16,26,S.ts,40,{cls:'t-big',lh:19,style:'fill:var(--fl)'}).svg:`<text x="16" y="30" class="t-big" style="fill:var(--fl)">${S.t}</text>`;
    s+=`<g transform="${L.sc}">${hsScene(h,o,t*40)}</g>`;
    const W=L.x1-L.x0,X=hh=>L.x0+W*Math.sqrt(clamp(hh,0,336)/336);
    /* lanes */
    const bar=(row,h0,h1,col,txt,op,dash)=>{const yc=L.r0+row*L.rs,x0=X(h0),x1=X(h1),hc=clamp(h,h0,h1),xc=X(hc);let g='';
      g+=`<rect x="${f1(x0)}" y="${yc-8}" width="${f1(Math.max(2,x1-x0))}" height="16" rx="5" style="fill:${dash?'none':col};opacity:${dash?1:.2};${dash?`stroke:${col};stroke-dasharray:4 3`:''}"/>`;
      if(!dash&&h>h0)g+=`<rect x="${f1(x0)}" y="${yc-8}" width="${f1(Math.max(2,xc-x0))}" height="16" rx="5" style="fill:${col};opacity:${op||.85}"/>`;
      if(txt)g+=`<text x="${f1(x0+5)}" y="${yc+4}" class="t-xs" style="fill:${dash?'var(--muted)':'var(--ink)'};font-weight:600">${txt}</text>`;return g};
    HS_TXT.lanes.forEach((l,i)=>{const yc=L.r0+i*L.rs;s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${yc}" y2="${yc}" class="grid"/><text x="${L.gl}" y="${yc+4}" class="${N?'t-sm':'t-lbl'}"${N?' style="fill:var(--ink);font-weight:600"':''}>${l}</text>`});
    s+=bar(0,0,120,'var(--o2)',HS_TXT.o2);
    [0,.75].concat(o.acid?[4]:[]).forEach(g=>{const x=X(g),on=h>=g;s+=`<circle cx="${f1(x)}" cy="${L.r0+L.rs}" r="5.5" style="fill:${on?'var(--blood)':'var(--panel)'};stroke:var(--blood);stroke-width:1.6"/>`});
    s+=bar(2,0,72,'var(--bd)',HS_TXT.saba)+bar(2,72,140,'var(--bd)','',.55);
    s+=bar(3,0,o.sd*24,'var(--ics)','');
    for(let k=1;k<o.sd;k++){const x=X(k*24);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.r0+3*L.rs-8}" y2="${L.r0+3*L.rs+8}" style="stroke:var(--panel);stroke-width:1.2"/>`}
    {const tx=HS_TXT.st(o.sd),yc=L.r0+3*L.rs;s+=`<rect x="${L.x0+2}" y="${yc-7}" width="${f1(tx.length*5.9+6)}" height="14" rx="4" style="fill:var(--ics)"/><text x="${L.x0+5}" y="${yc+4}" class="t-xs" style="fill:var(--ink);font-weight:600">${tx}</text>`}
    s+=o.pur?bar(4,0,120,'var(--fl)',HS_TXT.ab)+bar(4,120,168,'var(--fl)','',.4):bar(4,0,120,'var(--muted)',HS_TXT.abNo,0,true);
    s+=o.acid?bar(5,2,24,'var(--rx)',HS_TXT.niv)+bar(5,24,72,'var(--rx)','',.45):`<text x="${L.x0+5}" y="${L.r0+5*L.rs+4}" class="t-xs" style="fill:var(--muted);font-weight:600">${HS_TXT.nivNo}</text>`;
    {const yc=L.r0+6*L.rs,x=X(140),on=h>=140;s+=`<rect x="${f1(x-6)}" y="${yc-6}" width="12" height="12" transform="rotate(45 ${f1(x)} ${yc})" style="fill:${on?'var(--rec)':'var(--panel)'};stroke:var(--rec);stroke-width:1.6"/>`;
      if(p>=5)s+=`<text x="${L.x1}" y="${yc+4}" class="t-xs t-end" style="fill:var(--rec);font-weight:600">${N?HS_TXT.fuN:HS_TXT.fu}</text>`}
    /* time axis and cursor */
    const yb=L.r0+6*L.rs+14;s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${yb}" y2="${yb}" class="axis"/>`;
    HS_TXT.ticks.forEach(([v,l])=>{if(N&&v===2)return;const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${yb}" y2="${yb+4}" class="axis"/><text x="${f1(clamp(x,L.x0+4,L.x1-14))}" y="${L.tk}" class="t-xs t-mid">${l}</text>`});
    const xc=X(h);s+=`<line x1="${f1(xc)}" x2="${f1(xc)}" y1="${L.r0-12}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.6"/><text x="${f1(clamp(xc,L.x0+22,L.x1-22))}" y="${L.cl}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${HS_TXT.when(h)}</text>`;
    /* annotations */
    let an=HS_TXT.ann[p].slice();if(p===2)an.push(o.acid?HS_TXT.annAcid:HS_TXT.annNo);if(p===3&&!o.acid)an=[HS_TXT.annNo];if(p===5&&o.sd===14)an.push(HS_TXT.ann14);
    let ay=L.an;an.forEach(x=>{if(N){const w=wrapT(16,ay,x.replace(/</g,'&lt;').replace(/>/g,'&gt;'),62,{cls:'t-xs',lh:13,style:'fill:var(--ink)'});s+=w.svg;ay+=w.h+5}
      else{s+=`<text x="16" y="${ay}" class="t-xs" style="fill:var(--ink)">${x.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</text>`;ay+=17}});
    /* strip */
    const SW=N?368:688,sw=SW/6;HS_STEPS.forEach((q,j)=>{const on=j===p,xx=16+j*sw;
      s+=`<rect x="${f1(xx+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--fl)':'var(--panel-2)'}"/><text x="${f1(xx+sw/2)}" y="${L.sy-6}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.sh}</text>`});
    s+=`<circle cx="${f1(16+SW*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const ni=!o.acid?3:h<2?2:h<24?0:h<72?1:2,sd=Math.floor(h/24)+1;
    rd.innerHTML=HS_TXT.read(HS_TXT.when(h),HS_TXT.nivW[ni],HS_TXT.stW(sd,o.sd));
    $('#hsNote').innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#hsPlay'),draw,24000,'%t:player.replay%','hospital');
  const setSt=stepWire($('#hsSteps'),HS_STEPS,rg,draw,stop);
  [['hsa','acid',v=>v==='1'],['hsp','pur',v=>v==='1'],['hss','sd',v=>+v]].forEach(([k,f,cv])=>{
    $$(`#m-hospital [data-${k}]`).forEach(b=>b.addEventListener('click',()=>{o[f]=cv(b.dataset[k]);$$(`#m-hospital [data-${k}]`).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}))});
  draw(+rg.value);

  /* ---------- trial explorer ---------- */
  const ts=$('#hsTrSvg'),tn=$('#hsTrNote'),tb=$('#hsTrBtns');let tk='reduce',stopT=null;
  tb.innerHTML=HS_TR.map(r=>`<button class="btn" data-hst="${r.id}" aria-pressed="${r.id===tk}">${r.b}</button>`).join('');
  function trial(g){const D=HS_TR.find(r=>r.id===tk),nr=D.rows.length,N=vb(ts,`720 ${D.kind==='bars'?50+nr*40:64+nr*42}`,`400 ${D.kind==='bars'?72+nr*46:90+nr*46}`);let s='';
    let y=22;if(N){const w=wrapT(16,20,D.t,58,{cls:'t-sm',lh:14,style:'fill:var(--ink);font-weight:600'});s+=w.svg;y=20+w.h+6}
    else s+=`<text x="16" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:600">${D.t}</text>`;
    if(D.kind==='bars'){const bx=N?16:250,bw=N?314:380,rh=N?46:40;
      D.rows.forEach((r,i)=>{const yy=y+12+i*rh,by=N?yy+14:yy,v=r[1]*g,col=r[2]?'var(--rec)':'var(--muted)';
        s+=`<text x="16" y="${N?yy+8:yy+13}" class="${N?'t-xs':'t-lbl'}"${N?' style="fill:var(--ink);font-weight:600"':''}>${r[0]}</text>`;
        s+=`<rect x="${bx}" y="${by}" width="${bw}" height="18" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*v/100)}" height="18" rx="5" style="fill:${col}"/><text x="${f1(bx+bw*v/100+6)}" y="${by+14}" class="t-sm" style="fill:var(--ink);font-weight:700">${(r[1]*g).toFixed(r[1]%1?1:0)}%</text>`})}
    else{const px0=N?30:250,px1=N?370:560,lg=Math.log,XF=v=>px0+(px1-px0)*(lg(clamp(v,.1,3))-lg(.1))/(lg(3)-lg(.1)),rh=N?46:42,n=D.rows.length,yTop=y+12,yEnd=yTop+n*rh;
      s+=`<line x1="${f1(XF(1))}" x2="${f1(XF(1))}" y1="${yTop}" y2="${yEnd}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
      [.1,.2,.5,1,2].forEach(v=>{s+=`<text x="${f1(XF(v))}" y="${yEnd+14}" class="t-xs t-mid">${v}</text>`});
      D.rows.forEach((r,i)=>{const yy=yTop+i*rh,py=N?yy+26:yy+14,e=lerp(1,r[1],g);
        s+=`<text x="16" y="${N?yy+12:yy+18}" class="${N?'t-xs':'t-lbl'}"${N?' style="fill:var(--ink);font-weight:600"':''}>${r[0]}</text>`;
        if(r[2]!=null)s+=`<line x1="${f1(XF(lerp(1,r[2],g)))}" x2="${f1(XF(lerp(1,r[3],g)))}" y1="${py}" y2="${py}" style="stroke:var(--rec);stroke-width:2.4"/>`;
        s+=`<rect x="${f1(XF(e)-6)}" y="${py-6}" width="12" height="12" style="fill:var(--rec)"/>`;
        s+=`<text x="${N?384:572}" y="${N?yy+12:yy+18}" class="t-xs${N?' t-end':''}" style="fill:var(--ink)">${r[4]}</text>`})}
    ts.innerHTML=s;tn.innerHTML=D.txt}
  tb.addEventListener('click',e=>{const b=e.target.closest('[data-hst]');if(!b)return;tk=b.dataset.hst;$$('[data-hst]',tb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopT)stopT();stopT=animate(650,q=>trial(ease(q)))});
  trial(1);

  /* ---------- DECAF ---------- */
  const ds=$('#hsDecSvg'),dv=$('#hsDecV');
  function decaf(){const sc=+$('#hsDm').value+['hsDe','hsDc','hsDa','hsDf'].filter(k=>$('#'+k).checked).length,m=HS_DECAF[sc][1];
    const N=vb(ds,'720 200','400 220'),x0=N?44:70,x1=N?384:700,y0=26,y1=N?170:150,bw=(x1-x0)/7;let s='';
    [0,25,50].forEach(v=>{const y=y1-(y1-y0)*v/60;s+=`<line x1="${x0}" x2="${x1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${x0-6}" y="${f1(y+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${x0}" y="${y0-12}" class="t-xs">${HS_TXT.decY}</text>`;
    HS_DECAF.forEach(([k,v,n])=>{const bh=(y1-y0)*v/60,x=x0+k*bw+bw*.18,w=bw*.64,on=k===sc;
      s+=`<rect x="${f1(x)}" y="${f1(y1-Math.max(bh,1.5))}" width="${f1(w)}" height="${f1(Math.max(bh,1.5))}" rx="3" style="fill:${on?'var(--fl)':'var(--fl-soft)'};${on?'':'stroke:var(--fl);stroke-width:1'}"/>`;
      s+=`<text x="${f1(x+w/2)}" y="${f1(y1-bh-6)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${v}%</text><text x="${f1(x+w/2)}" y="${y1+15}" class="t-sm t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${k}</text>`;
      if(!N)s+=`<text x="${f1(x+w/2)}" y="${y1+30}" class="t-xs t-mid">${HS_TXT.decN(n)}</text>`});
    s+=`<text x="${x1}" y="${N?y1+32:y1+46}" class="t-xs t-end">${HS_TXT.decX}</text>`;
    ds.innerHTML=s;dv.className='verdict '+(sc<=1?'yes':sc===2?'maybe':'no');
    dv.textContent=HS_TXT.dec(sc,m)+(sc<=1?HS_TXT.decLo:sc>=3?HS_TXT.decHi:'')+(sc===6?HS_TXT.decSix:'')}
  $$('#hsDec select,#hsDec input').forEach(el=>el.addEventListener('change',decaf));
  decaf();
  const prev=redraws.hospital;redraws.hospital=()=>{prev&&prev();trial(1);decaf()};
};
