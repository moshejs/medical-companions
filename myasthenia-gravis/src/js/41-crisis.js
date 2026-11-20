/* =============== 4.1 Myasthenic crisis =============== */
/* The slider runs days 0-21, but not evenly: the first 40% of the slider covers days 0-5,
   where the trigger, the warning signs, the falling numbers and the ventilation decision
   all happen within a few days; the rest covers days 5-21. */
const CR_STEPS=[
 {from:0,at:.03,k:'Day 0 · Trigger',t:'Something sets it off, most often an infection',
  txt:`In 73 crises at Columbia, infection set off 38% (usually pneumonia or an upper respiratory infection), aspiration 10%, and no obvious cause was found in 30%. A 2023 review puts "no trigger found" at 30-40% and respiratory infection first; crises set off by infection had worse outcomes in a German cohort. Pick a trigger chip above to see what the sources say about it. [[Thomas1997,Claytor2023,Nelke2022]]`,
  pt:`A crisis is often set off by something else, most often a chest infection. In about a third of people no cause is found.`,
  hook:`Commonest trigger: <b>infection</b> (38%). No cause found: <b>30-40%</b>. Aspiration: <b>10%</b>.`},
 {from:.1,at:.15,k:'Days 1-3 · Warning signs',t:'Swallowing, speech and the neck weaken',
  txt:`Crisis usually builds up rather than starting suddenly, which "provides a window of opportunity for prevention". No single number predicts breathing failure well, so a combined bedside picture is preferred: history, single breath count, neck flexion strength, bulbar weakness, paradoxical breathing and lung function, repeated to show the trend. In the breath count a person counts aloud on one deep breath at 2 counts per second; ≥25 fits normal breathing muscles and difficulty reaching 20 signals expiratory weakness. Neck flexor strength tracked spirometry in one study, and its recovery tracks bulbar and breathing recovery. [[Claytor2023,McKenzie2024,Dishnica2023,Elsheikh2016,Wendell2011]]`,
  pt:`Before breathing fails, swallowing, speech and the neck muscles often weaken. Counting out loud on one breath is a quick bedside check.`,
  hook:`Breath count <b>≥25</b> fits normal; trouble reaching <b>20</b> signals weakness. Weak neck flexion travels with weak breathing.`},
 {from:.2,at:.255,k:'Days 2-4 · The numbers fall',t:'Vital capacity and pressures cross the thresholds',
  txt:`In 42 people with severe MG, ventilation was unlikely while vital capacity stayed above 20 mL/kg, expiratory pressure above 40 cmH2O and inspiratory pressure more negative than −40 cmH2O; a fall of 30% or more in inspiratory pressure marked higher risk. A review gives VC under 1 L (or 20-25 mL/kg) and NIF weaker than −20 cmH2O as signs of significant weakness. Not every study agrees: in a small ICU series, repeated VC did not separate the episodes that needed ventilation. The familiar "20/30/40" figures come from a Guillain-Barré study: switch on the overlay to compare. [[Thieben2005,Wendell2011,Rieder1995,Lawn2001]]`,
  pt:`Two things are measured: how much air the person can blow out, and how hard they can breathe in and out. How fast the numbers fall matters as much as any one reading.`,
  hook:`MG thresholds (Thieben 2005): VC <b>20 mL/kg</b>, MIP <b>−40</b>, MEP <b>40 cmH2O</b>, MIP fall <b>≥30%</b>. The <b>20/30/40</b> rule is from <b>Guillain-Barré</b> (Lawn 2001).`},
 {from:.28,at:.335,k:'Days 3-5 · Support',t:'BiPAP first; a breathing tube if it fails',
  txt:`Manifest crisis is defined by the need for intubation, or for noninvasive ventilation to avoid it. In a Mayo series of 60 episodes, BiPAP was the first support in 24 and avoided intubation in 14 (about 58%); a PaCO2 above 45 mmHg when BiPAP started was the only predictor of failure (above 50 in an earlier series). Reviews call myasthenic crisis the classic neuromuscular condition for NIV, though NIV may raise aspiration risk when bulbar weakness is present. Oximetry can look normal while CO2 is high (shown in chronic neuromuscular disease, not acute MG). A review says pyridostigmine is usually stopped during ventilation to cut secretions, and restarted at a low dose around extubation. [[Sanders2016,Seneviratne2008,Rabinstein2002,Rabinstein2016,McKenzie2024,Wendell2011,Gray2024]]`,
  pt:`First a tight mask pushes air in with each breath (BiPAP). If carbon dioxide keeps climbing, a breathing tube and a ventilator take over for a while.`,
  hook:`BiPAP avoided intubation in <b>14 of 24</b>. PaCO2 <b>above 45 mmHg</b> at BiPAP start predicted failure. A normal SpO2 does not rule out a high CO2.`},
 {from:.38,at:.45,k:'Days 4-9 · Rescue',t:'Plasma exchange or IVIG',
  txt:`The 2016 consensus: trials suggest plasma exchange (PLEX) and IVIG work about equally in impending or manifest crisis, but "expert consensus suggests that PLEX is more effective and works more quickly". The choice depends on the person: PLEX is avoided in sepsis, IVIG in hypercoagulable states, renal failure or immunoglobulin hypersensitivity. A review gives the onset as about 2 days for PLEX and about 4-5 days for IVIG. Switch between them above to see the onset move. [[Sanders2016,Wendell2011]]`,
  pt:`Plasma exchange takes out the liquid part of the blood, which carries the harmful antibodies, and replaces it. IVIG is a drip of antibodies pooled from donors. Plasma exchange tends to start working a little sooner.`,
  hook:`Onset: PLEX <b>about 2 days</b>, IVIG <b>about 4-5 days</b>. PLEX avoided in <b>sepsis</b>; IVIG avoided in <b>hypercoagulable states and renal failure</b>.`},
 {from:.55,at:.6,k:'Days 9-13 · Improvement',t:'Strength returns; steroids are timed',
  txt:`Corticosteroids may cause transient worsening, so the consensus says it may be reasonable to wait several days for PLEX or IVIG to work before starting them. A review describes high-dose prednisone (60-100 mg/day in that review) started with IVIG or PLEX, ideally in hospital, with improvement typically from around day 13 and in 85% within 3 weeks. Any drug and dose for a person is set by the treating clinician. Longer intubation was predicted by bicarbonate ≥30 before intubation, a peak VC under 25 mL/kg on days 1-6, and age over 50 (see section 5). [[Sanders2016,Wendell2011,Thomas1997]]`,
  pt:`As the antibody attack eases, strength comes back slowly. Steroids help over weeks but can make weakness briefly worse at the start, so their timing is planned.`,
  hook:`Steroids can cause <b>transient worsening</b>: the consensus suggests letting PLEX or IVIG act for several days first.`},
 {from:.7,at:.83,k:'Days 13-18 · Weaning',t:'Coming off the ventilator',
  txt:`In the Columbia series, 25% were extubated by day 7, 50% by day 13 and 75% by day 31. Extubation often fails: 27% in one series, 44% at Mayo, 43% in a German cohort. Atelectasis was the strongest predictor of failure; others were male sex, a previous crisis and intubation for more than 10 days, and older age in another series. Extubation succeeded most often between day 7 and day 12 after intubation. NIV after extubation prevented reintubation in about 70% in two studies. [[Thomas1997,Rabinstein2005,Seneviratne2008b,Neumann2024,Wendell2011]]`,
  pt:`Once the numbers recover, the breathing tube is taken out. It does not always work the first time, and a second attempt is common.`,
  hook:`Extubated: <b>25%</b> by day 7, <b>50%</b> by day 13, <b>75%</b> by day 31. Extubation failure <b>27-44%</b>; strongest predictor <b>atelectasis</b>.`},
 {from:.9,at:.97,k:'Day 18 onward · After the ICU',t:'The long tail, and the risk of dying',
  txt:`Median ventilation was 12 days in 250 German ventilated crises, and 20.5% of survivors still needed ventilation at discharge. About half had a tracheostomy, and early tracheostomy (by day 10) went with about 2 weeks less ventilation. Deaths per crisis fell from 42% in the early 1960s to about 4% in later US series; the older German ventilated cohort had 12%, mostly from sepsis and multiorgan failure. After a crisis in a Chinese cohort, 79.8% had a favourable outcome at 1 year. [[Neumann2020,Angstwurm2022,Cohen1981,Thomas1997,Alshekhlee2009,Huan2026]]`,
  pt:`Most people survive a crisis today, but some need weeks on the ventilator. Infections, especially sepsis, were the main cause of death in the large cohorts.`,
  hook:`Deaths per crisis: <b>42%</b> (early 1960s), <b>about 4%</b> (US, 1983-2005), <b>12%</b> in an older ventilated German cohort.`}
];
const CR_TRIG={
 inf:{lab:'infection',pct:'38%',
  txt:`Columbia: 38% of 73 crises, usually pneumonia or an upper respiratory infection. Respiratory infection is the most common trigger in a 2023 review, and infection-triggered crises had worse outcomes in a German cohort. Infection set off 6 of 14 crises in a small Indian series, and COVID-19 2 of 5 episodes in an eculizumab case series. Sepsis was the leading cause of death in two cohorts. [[Thomas1997,Claytor2023,Nelke2022,Kalita2014,Huang2026,Neumann2020,Huan2026]]`},
 none:{lab:'no cause found',pct:'30-40%',
  txt:`No obvious cause in 30% at Columbia, 30-40% in a 2023 review, and one-third to one-half in another review. [[Thomas1997,Claytor2023,Wendell2011]]`},
 asp:{lab:'aspiration',pct:'10%',
  txt:`Aspiration set off 10% of Columbia crises. In the 1960s-1970s series most crises came from aspiration pneumonia or happened in people with severe dysphagia. In 20 people with MG given a barium swallow, 7 aspirated and 4 of them silently. [[Thomas1997,Cohen1981,Koopman2004]]`},
 surg:{lab:'surgery',pct:'no % found',
  txt:`Surgery set off 5 of 14 crises in a small Indian series; no percentage from a large crisis cohort was found in the sources read (unverified). After thymectomy, a previous crisis and bulbar symptoms each raised the risk of postoperative crisis in a meta-analysis. [[Kalita2014,Geng2020]]`},
 taper:{lab:'drug taper',pct:'no % found',
  txt:`A drug taper preceded 2 of 14 crises in the Indian series; no large-cohort percentage was found (unverified). A London medicines-safety bulletin calls pyridostigmine time-critical and warns that a missed or late dose can precipitate crisis. [[Kalita2014,KHP2025]]`},
 ster:{lab:'steroid start',pct:'9-18%',
  txt:`Crisis after starting steroids is reported in 9-18% of patients (review). In one study, 42% of 55 people given prednisone 40-80 mg worsened within 4 weeks. [[Wendell2011,Bae2006]]`},
 preg:{lab:'pregnancy / postpartum',pct:'no % found',
  txt:`In a systematic review of 824 pregnancies, crisis occurred in 6.4% during pregnancy and 8.2% after delivery. That is the risk for a pregnant woman with MG, not the share of all crises that pregnancy causes; no such share was found in the crisis cohorts read (unverified). [[Banner2022]]`},
 drug:{lab:'a new medicine',pct:'case counts',
  txt:`Iodinated contrast set off 1 of 14 crises in the Indian series, and a PD-1 inhibitor 1 of 5 episodes in an eculizumab series. Module 4.2 lists the drugs with label warnings. [[Kalita2014,Huang2026]] <button class="btn" data-go="drugs">Open 4.2 Drugs that can worsen MG</button>`}
};
const CR_RX={
 plex:{n:'Plasma exchange (PLEX)',on:2,
  txt:`Onset about 2 days (review). Regimen in that review: 5 exchanges over 10 days, shown here as 5 sessions every other day. In one trial PLEX had more side effects than IVIG (8 vs 1 patients). Avoided in sepsis. Regimens are set by the treating team. [[Wendell2011,Gajdos1997,Sanders2016]]`},
 ivig:{n:'IVIG',on:4.5,
  txt:`Onset about 4-5 days (review). Regimen in that review: 400 mg/kg/day for 5 days; a trial used 1 g/kg/day for 2 days. Avoided in hypercoagulable states, renal failure and immunoglobulin hypersensitivity. Regimens are set by the treating team. [[Wendell2011,Barth2011,Sanders2016]]`}
};
const CR_PATH={
 int:`<b>This run:</b> PaCO2 is 52 mmHg when BiPAP starts on day 3.5 (above the 45 mmHg predictor), BiPAP fails, and the person is intubated on day 4.5 and extubated on day 16, 11.5 days later, inside the day 7-12 window. Schematic numbers. [[Seneviratne2008,Neumann2024]]`,
 niv:`<b>This run:</b> PaCO2 is 43 mmHg when BiPAP starts on day 3.5, and BiPAP alone carries the person for 4.3 days, the mean in the 14 Mayo patients who avoided intubation. Schematic numbers. [[Seneviratne2008]]`
};
const CR_SIGNS=[
 {id:'sweat',lab:'Sweating',side:'ch',src:`[[Wendell2011,FDAEnlon2026]]`},
 {id:'tear',lab:'Tearing',side:'ch',src:`[[Wendell2011,FDAEnlon2026]]`},
 {id:'saliva',lab:'Salivation',side:'ch',src:`[[Wendell2011,FDAEnlon2026]]`},
 {id:'gi',lab:'Nausea, cramps, diarrhoea',side:'ch',src:`[[Wendell2011,FDAEnlon2026]]`},
 {id:'brady',lab:'Slow heart rate',side:'ch',src:`[[Wendell2011]]`},
 {id:'fasc',lab:'Muscle twitching (fasciculations)',side:'ch',src:`[[Wendell2011,FDAEnlon2026]]`},
 {id:'secr',lab:'More airway secretions',side:'ch',src:`[[Sanders2016]]`},
 {id:'early',lab:'Worse 15-60 min after a dose',side:'ch',src:`[[RightDecisionsPyrido2025]]`},
 {id:'dose',lab:'Dose recently raised',side:'ch',src:`[[OpenStaxPharmNurses]]`},
 {id:'late',lab:'Worse 3-4 h after a dose',side:'my',src:`[[RightDecisionsPyrido2025]]`},
 {id:'ptosis',lab:'Drooping eyelids',side:'my',src:`[[OpenStaxPharmNurses]]`},
 {id:'dysph',lab:'Trouble swallowing',side:'my',src:`[[OpenStaxPharmNurses]]`},
 {id:'infx',lab:'Recent infection',side:'my',src:`[[Thomas1997]]`},
 {id:'weak',lab:'Severe weakness',side:'both',src:`[[FDAMestinon2026]]`},
 {id:'breath',lab:'Trouble breathing',side:'both',src:`[[FDAMestinon2020,Sanders2016]]`},
 {id:'pupil',lab:'Small pupils',side:'unv',src:`not named as a sign that separates the two crises in the sources read (unverified)`}
];
const CR_SIDE_TXT={
 my:`Underdosing signs named in nursing teaching include ptosis and dysphagia; worsening 3-4 hours after a dose suggests underdosing. [[OpenStaxPharmNurses,RightDecisionsPyrido2025]]`,
 ch:`Worsening 15-60 minutes after a dose suggests cholinergic toxicity; raising the dose risks cholinergic crisis. [[RightDecisionsPyrido2025,OpenStaxPharmNurses]]`
};
const CR_MORT=[
 {lab:'Early 1960s',sub:'Cohen 1981',v:42},
 {lab:'Late 1970s',sub:'Cohen 1981',v:6},
 {lab:'Columbia 1983-94',sub:'73 crises (3 deaths)',v:4},
 {lab:'US hospitals 2000-05',sub:'national inpatient data',v:4.47},
 {lab:'Germany 2006-15',sub:'ventilated, median age 72',v:12},
 {lab:'China, prospective',sub:'277 patients, in-hospital',v:5.05}
];
const CR_PRO=[0,21,46,88];
const CR_PRO_TXT=[
 `With none of the three risk factors, no one in the Columbia series stayed intubated for more than 2 weeks. [[Thomas1997]]`,
 `With one risk factor, 21% stayed intubated for more than 2 weeks. [[Thomas1997]]`,
 `With two risk factors, 46% stayed intubated for more than 2 weeks. [[Thomas1997]]`,
 `With all three, 88% stayed intubated for more than 2 weeks. [[Thomas1997]]`
];
inits.crisis=()=>{
  const svg=$('#crSvg'),rg=$('#crT');
  let path='int',rx='plex',ov=false,trig='inf';
  const dayOf=t=>t<.4?t/.4*5:5+(t-.4)/.6*16;
  const T_IN=4.5,T_RX=4,T_BI=3.5,T_EX=16,PLEX_D=[4,6,8,10,12];
  const NIV_END=T_BI+4.3;
  /* the schematic course: everything here is modelled, anchored to the published values in the notes */
  function model(d){
    const I=path==='int',ds=T_RX+CR_RX[rx].on;
    const f1=ease(ramp(d,.6,I?T_IN:4)),f2=ease(ramp(d,ds,ds+10));
    const mix=(b,n,e)=>b+(n-b)*f1+(e-n)*f2;
    const vc=mix(38,I?13:18.5,31),mip=mix(62,I?16:24,46),mep=mix(72,I?22:30,52);
    let sup='none';
    if(d>=T_BI)sup='bipap';
    if(I&&d>=T_IN)sup='tube';
    if(I&&d>=T_EX)sup=d<T_EX+2?'nivpost':'none';
    if(!I&&d>=NIV_END)sup='none';
    const peak=I?52:43;
    let co2;
    if(d<T_BI)co2=40+(peak-40)*ease(ramp(d,1.8,T_BI));
    else if(I)co2=d<T_IN?lerp(peak,peak+3,ramp(d,T_BI,T_IN)):lerp(peak+3,40,ease(ramp(d,T_IN,T_IN+1)));
    else co2=lerp(peak,40,ease(ramp(d,T_BI,6.5)));
    const spo2=sup==='tube'?98:97-1.6*ease(ramp(d,2,T_IN))+1.6*ease(ramp(d,6,9));
    const st=clamp((vc-10)/28);
    return{vc,mip,mep,sup,co2,spo2,ds,st,sbc:Math.round(vc*70/100)};
  }
  const LW={W:720,H:530,X0:50,X1:424,hy:14,l0:34,l1:56,l2:78,vc:[106,214],pr:[250,358],ax:375,ex:394,ov:450,pcx:592,pcy:150,nar:false};
  const LN={W:400,H:1050,X0:44,X1:348,hy:13,l0:50,l1:72,l2:94,vc:[134,242],pr:[280,388],ax:405,ex:424,ov:478,pcx:200,pcy:744,nar:true};
  const NOTES_W=[
   ['Solid red: thresholds from an MG study (Thieben 2005): VC 20 mL/kg, MIP −40, MEP 40 cmH2O.',
    'Amber: a review (Wendell 2011): VC 20-25 mL/kg, NIF −20. Pressures are plotted as strength (MIP without its minus).',
    'Green band: days 7-12 after intubation, when extubation most often succeeded (Neumann 2024).'],
   ['Dashed: the 20/30/40 rule, which comes from a Guillain-Barré study (Lawn 2001), not from MG:',
    'VC <20 mL/kg, MIP <30, MEP <40 cmH2O, or a fall of more than 30%. No MG validation of the full rule was found.']];
  const NOTES_N=[
   ['Solid red: MG study thresholds (Thieben 2005):','VC 20 mL/kg, MIP −40, MEP 40 cmH2O.','Amber: a review (Wendell 2011): VC 25, NIF −20.',
    'Pressures shown as strength (MIP without its minus).','Green band: days 7-12 after intubation.'],
   ['Dashed: the 20/30/40 rule, from a Guillain-Barré','study (Lawn 2001), not from MG: VC <20 mL/kg,','MIP <30, MEP <40 cmH2O, or a fall of >30%.','No MG validation of the full rule was found.']];
  function person(L,m,d,s){
    const cx=L.pcx,cy=L.pcy,I=path==='int';
    let o=`<text x="${cx-112}" y="${cy-132}" class="t-sm">THE PERSON · schematic</text>`;
    // IV pole and IVIG bag (left)
    const ivOn=rx==='ivig'&&d>=T_RX&&d<T_RX+5,plOn=rx==='plex'&&PLEX_D.some(q=>d>=q&&d<q+.6);
    o+=`<line x1="${cx-102}" y1="${cy-74}" x2="${cx-102}" y2="${cy+118}" style="stroke:var(--line);stroke-width:3"/>`;
    if(rx==='ivig'){const op=d>=T_RX?(ivOn?1:.35):.18;
      o+=`<g style="opacity:${f1(op)}"><rect x="${cx-116}" y="${cy-80}" width="28" height="40" rx="7" style="fill:var(--drug-soft);stroke:var(--drug);stroke-width:1.6"/><text x="${cx-102}" y="${cy-56}" class="t-xs t-mid" style="fill:var(--drug);font-weight:600">IVIG</text>
      <path d="M${cx-102} ${cy-40}C${cx-102} ${cy+20} ${cx-86} ${cy+50} ${cx-64} ${cy+72}" style="fill:none;stroke:var(--drug);stroke-width:1.4"/></g>`;
      if(ivOn)for(let k=0;k<3;k++){const q=((d*6)+k/3)%1;o+=`<circle cx="${f1(lerp(cx-102,cx-70,q))}" cy="${f1(lerp(cy-34,cy+66,q))}" r="2.4" style="fill:var(--drug)"/>`}}
    // PLEX machine (lower left)
    if(rx==='plex'){const op=d>=T_RX&&d<13?(plOn?1:.45):.18,mx=cx-120,my=cy+128;
      o+=`<g style="opacity:${f1(op)}"><rect x="${mx}" y="${my}" width="58" height="46" rx="8" style="fill:var(--drug-soft);stroke:var(--drug);stroke-width:1.6"/>
      <g transform="rotate(${f1(d*720)} ${mx+18} ${my+20})"><circle cx="${mx+18}" cy="${my+20}" r="11" style="fill:none;stroke:var(--drug);stroke-width:2;stroke-dasharray:6 4"/></g>
      <text x="${mx+44}" y="${my+24}" class="t-xs t-mid" style="fill:var(--drug);font-weight:600">PLEX</text>
      <path d="M${cx-70} ${cy+74}Q${cx-70} ${my-6} ${mx+30} ${my}" style="fill:none;stroke:var(--ab);stroke-width:1.4"/></g>`;
      if(plOn)for(let k=0;k<2;k++){const q=((d*5)+k/2)%1;o+=igg(lerp(cx-70,mx+32,q),lerp(cy+80,my-2,q),6,Math.PI*q,1,'var(--ab)')}}
    // torso
    o+=`<path d="M${cx-82} ${cy+114}Q${cx-80} ${cy+60} ${cx-16} ${cy+52}H${cx+16}Q${cx+80} ${cy+60} ${cx+82} ${cy+114}Z" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.5"/>`;
    o+=`<rect x="${cx-11}" y="${cy+26}" width="22" height="30" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.2"/>`;
    // neck flexion test: on days 1-3.5 the head bends forward and back; the arc shrinks as the neck weakens
    let ang=0;
    if(d>1&&d<T_BI)ang=(4+20*m.st)*Math.max(0,Math.sin((d-1)*Math.PI*4));
    if(m.sup==='tube')ang=-4;
    const droop=clamp(.08+(1-m.st)*.62);
    o+=`<g transform="rotate(${f1(ang)} ${cx} ${cy+40})">`;
    o+=`<circle cx="${cx}" cy="${cy}" r="36" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.6"/>`;
    o+=`<path d="M${cx-34} ${cy-10}Q${cx-30} ${cy-42} ${cx+4} ${cy-38}Q${cx+30} ${cy-36} ${cx+34} ${cy-14}Q${cx+10} ${cy-28} ${cx-34} ${cy-10}Z" style="fill:var(--nuc-deep);opacity:.75"/>`;
    o+=`<path d="M${cx+34} ${cy-4}L${cx+43} ${cy+8}L${cx+34} ${cy+11}" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.4;stroke-linejoin:round"/>`;
    o+=eyelid(cx+14,cy-4,20,droop);
    o+=`<path d="M${cx+18} ${cy+20}Q${cx+26} ${cy+22} ${cx+32} ${cy+19}" style="fill:none;stroke:var(--memb);stroke-width:1.6;stroke-linecap:round"/>`;
    if(m.sup==='bipap'||m.sup==='nivpost')o+=`<path d="M${cx+22} ${cy+2}Q${cx+48} ${cy+2} ${cx+46} ${cy+16}Q${cx+44} ${cy+30} ${cx+20} ${cy+28}Z" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.8;opacity:.92"/><path d="M${cx+21} ${cy+22}Q${cx-6} ${cy+30} ${cx-34} ${cy+12}" style="fill:none;stroke:var(--nerve);stroke-width:1.4"/>`;
    o+=`</g>`;
    // the ventilator / BiPAP box and its hose or tube
    if(m.sup!=='none'){const bx=cx+52,by=cy+62,tube=m.sup==='tube',col=tube?'var(--bad)':'var(--nerve)';
      o+=`<path d="M${tube?cx+30:cx+44} ${cy+20}C${cx+70} ${cy+22} ${cx+56} ${by-6} ${bx+20} ${by}" style="fill:none;stroke:${col};stroke-width:${tube?3:4};stroke-linecap:round;opacity:.85"/>`;
      o+=`<rect x="${bx}" y="${by}" width="66" height="40" rx="7" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/><text x="${bx+33}" y="${by+17}" class="t-xs t-mid" style="fill:${col};font-weight:600">${tube?'ventilator':m.sup==='nivpost'?'NIV':'BiPAP'}</text>`;
      const w=(d*3)%1;o+=`<path d="M${bx+8} ${by+30}${[0,1,2,3,4,5].map(k=>'L'+f1(bx+9+k*9.6)+' '+f1(by+30-6*Math.sin((k/5+w)*Math.PI*2))).join('')}" style="fill:none;stroke:${col};stroke-width:1.3"/>`}
    // breath count bubble (needs the mouth: not while intubated)
    if(m.sup!=='tube'){const c=m.sbc,col=c>=25?'var(--good)':c>=20?'var(--warn)':'var(--bad)';
      o+=`<rect x="${cx-86}" y="${cy-118}" width="172" height="44" rx="12" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><path d="M${cx+30} ${cy-74}L${cx+38} ${cy-60}L${cx+44} ${cy-74}" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><rect x="${cx+31}" y="${cy-76}" width="12" height="4" style="fill:var(--panel)"/>`;
      o+=`<text x="${cx-76}" y="${cy-101}" class="t-xs">single breath count</text><text x="${cx-76}" y="${cy-83}" class="t-big" style="fill:${col}">≈ ${c}</text><text x="${cx+76}" y="${cy-83}" class="t-xs t-end">${c>=25?'≥25: fits normal':c>=20?'under 25':'under 20'}</text>`}
    else o+=`<text x="${cx}" y="${cy-92}" class="t-xs t-mid">no breath count while intubated</text>`;
    // swallowing warning at the throat
    const bul=1-m.st;
    if(bul>.35&&m.sup!=='tube')o+=`<path d="M${cx+14} ${cy+36}q4 -4 8 0t8 0t8 0" style="fill:none;stroke:var(--ab);stroke-width:2;opacity:${f1(clamp((bul-.35)*3))}"/>`;
    // meters
    const my=cy+200;
    o+=`<text x="${cx-112}" y="${my-6}" class="t-xs">neck flexion strength (schematic)</text>`;
    o+=`<rect x="${cx-112}" y="${my}" width="224" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${cx-112}" y="${my}" width="${f1(224*m.st)}" height="12" rx="6" style="fill:${m.st>.6?'var(--achr)':m.st>.35?'var(--warn)':'var(--bad)'}"/>`;
    const bt=m.sup==='tube'?'speech and swallowing: tube in place':m.st>.72?'speech and swallowing: normal':m.st>.45?'speech and swallowing: weakening':'swallowing unsafe: aspiration risk';
    o+=`<text x="${cx-112}" y="${my+34}" class="t-sm" style="fill:${m.st>.72||m.sup==='tube'?'var(--muted)':'var(--ab)'}">${bt}</text>`;
    const hi=m.co2>45.5;
    o+=`<text x="${cx-112}" y="${my+64}" class="t-big"><tspan style="fill:${hi?'var(--bad)':'var(--ink)'}">PaCO2 ${Math.round(m.co2)}</tspan><tspan class="t-sm" dx="6">mmHg</tspan><tspan dx="10">SpO2 ${Math.round(m.spo2)}%</tspan></text>`;
    o+=`<text x="${cx-112}" y="${my+80}" class="t-xs">${hi?'CO2 high while SpO2 looks normal':'schematic blood-gas values'}</text>`;
    return o;
  }
  function draw(t){
    const N=vb(svg,'720 530','400 1050'),L=N?LN:LW,d=dayOf(t),m=model(d),I=path==='int';
    const X0=L.X0,X1=L.X1,xd=q=>X0+(X1-X0)*q/21;
    let s=`<rect x="0" y="0" width="${L.W}" height="${L.H}" style="fill:var(--field)"/>`;
    s+=`<text x="${X0-40<4?4:X0-40}" y="${L.hy}" class="t-sm" style="fill:var(--ab)">SCHEMATIC: one illustrative course, lines modelled</text>`;
    if(N)s+=`<text x="4" y="${L.hy+13}" class="t-xs">anchors are published values (see the notes)</text>`;
    // lanes
    const lane=(y,lab)=>`<text x="${X0-5}" y="${y+3}" class="t-xs t-end">${lab}</text><line x1="${X0}" x2="${X1}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-dasharray:1 4"/>`;
    s+=lane(L.l0,'events')+lane(L.l1,'support')+lane(L.l2,'rescue');
    // trigger chip
    {const T=CR_TRIG[trig],tx=T.lab+(T.pct&&!/no %|case/.test(T.pct)?' '+T.pct:''),w=tx.length*5.8+12;
      s+=`<rect x="${X0}" y="${L.l0-8}" width="${f1(w)}" height="16" rx="8" style="fill:var(--ab-soft);stroke:var(--ab)"/><text x="${X0+6}" y="${L.l0+3.5}" class="t-xs" style="fill:var(--ab);font-weight:600">${tx}</text>`}
    // steroid marker
    if(d>=9.5){const x=xd(9.5);s+=`<path d="M${f1(x)} ${L.l0-6}l6 6l-6 6l-6 -6z" style="fill:var(--drug)"/><text x="${f1(x+9)}" y="${L.l0+3.5}" class="t-xs" style="fill:var(--drug)">steroid start (timing schematic)</text>`}
    // support lane
    const bar=(a,b,y,lab,fill,str,inside)=>{if(d<a)return'';const e=Math.min(b,d),x=xd(a),w=Math.max(2,xd(e)-x);
      let o=`<rect x="${f1(x)}" y="${y-7}" width="${f1(w)}" height="14" rx="4" style="fill:${fill};stroke:${str}"/>`;
      if(inside&&w>lab.length*5.8+8)o+=`<text x="${f1(x+5)}" y="${y+3.5}" class="t-xs" style="fill:${str};font-weight:600">${lab}</text>`;
      else if(!inside)o+=`<text x="${f1(x-4)}" y="${y+3.5}" class="t-xs t-end" style="fill:${str};font-weight:600">${lab}</text>`;
      return o};
    if(I){
      if(d>=T_IN+7)s+=`<rect x="${f1(xd(T_IN+7))}" y="${L.l1-10}" width="${f1(xd(Math.min(d,T_IN+12))-xd(T_IN+7))}" height="20" style="fill:var(--good-soft)"/>`;
      s+=bar(T_BI,T_IN,L.l1,'BiPAP','var(--warn-soft)','var(--warn)',false);
      s+=bar(T_IN,T_EX,L.l1,'intubated','var(--bad-soft)','var(--bad)',true);
      s+=bar(T_EX,T_EX+2,L.l1,'NIV','var(--nerve-soft)','var(--nerve)',true);
      if(d>=T_EX)s+=`<text x="${f1(xd(T_EX+2)+4)}" y="${L.l1+3.5}" class="t-xs" style="fill:var(--good)">extubated</text>`;
    }else{
      s+=bar(T_BI,NIV_END,L.l1,'BiPAP','var(--warn-soft)','var(--warn)',true);
      if(d>=NIV_END)s+=`<text x="${f1(xd(NIV_END)+4)}" y="${L.l1+3.5}" class="t-xs" style="fill:var(--good)">off BiPAP, no tube</text>`;
    }
    // rescue lane
    if(rx==='plex'){
      if(d>=T_RX)s+=`<text x="${f1(xd(T_RX)-9)}" y="${L.l2+3.5}" class="t-xs t-end" style="fill:var(--drug);font-weight:600">PLEX</text>`;
      PLEX_D.forEach((q,i)=>{if(d>=q)s+=`<circle cx="${f1(xd(q))}" cy="${L.l2}" r="5.5" style="fill:var(--drug)"/><text x="${f1(xd(q))}" y="${L.l2+3}" class="t-xs t-mid" style="fill:var(--panel);font-size:8px">${i+1}</text>`});
      if(d>=12.4)s+=`<text x="${f1(xd(12)+9)}" y="${L.l2+3.5}" class="t-xs" style="fill:var(--drug)">5 exchanges</text>`;
    }else s+=bar(T_RX,T_RX+5,L.l2,'IVIG 5 days','var(--drug-soft)','var(--drug)',true);
    // charts
    const chart=(y0,y1,max,ticks,title,right)=>{let o=`<text x="${X0}" y="${y0-7}" class="t-sm">${title}</text>`;
      if(right)o+=`<text x="${X1}" y="${y0-7}" class="t-xs t-end">${right}</text>`;
      o+=`<rect x="${X0}" y="${y0}" width="${X1-X0}" height="${y1-y0}" style="fill:var(--panel);stroke:var(--line)"/>`;
      ticks.forEach(v=>{const y=y1-(y1-y0)*v/max;o+=`<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${X0-5}" y="${f1(y+3)}" class="t-xs t-end">${v}</text>`});return o};
    const yv=(y0,y1,max)=>v=>y1-(y1-y0)*clamp(v/max,0,1.02);
    const VY=yv(L.vc[0],L.vc[1],45),PY=yv(L.pr[0],L.pr[1],90);
    s+=chart(L.vc[0],L.vc[1],45,[0,10,20,30,40],'Vital capacity, mL/kg',ov?'dashed = GBS rule':'');
    s+=chart(L.pr[0],L.pr[1],90,[0,20,40,60,80],'Pressures, cmH2O','▼ MIP down 30%: MG risk sign');
    // threshold lines + margin labels
    const thr=(Y,v,col,lab,dash,wd)=>{const y=Y(v);return `<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${col};stroke-width:${wd||1.5};${dash?'stroke-dasharray:6 4;':''}"/><text x="${X1+4}" y="${f1(y+3)}" class="t-xs" style="fill:${col}">${lab}</text>`};
    s+=`<rect x="${X0}" y="${f1(VY(25))}" width="${X1-X0}" height="${f1(VY(20)-VY(25))}" style="fill:var(--warn-soft);opacity:.7"/>`;
    s+=thr(VY,25,'var(--warn)','25','',1.2)+thr(VY,20,'var(--bad)',ov?'20 both':'20 MG');
    s+=thr(PY,40,'var(--bad)',ov?'40 both':'40 MG')+thr(PY,20,'var(--warn)','20 NIF','',1.2);
    if(ov){s+=thr(VY,20,'var(--ink)','',true,1.3)+thr(PY,30,'var(--ink)','30 GBS',true,1.3)+thr(PY,40,'var(--ink)','',true,1.3)}
    // PLEX / IVIG onset marker
    const dsx=xd(m.ds);
    if(d>=T_RX){const op=d>=m.ds?1:.45;
      s+=`<line x1="${f1(dsx)}" x2="${f1(dsx)}" y1="${L.vc[0]}" y2="${L.pr[1]}" style="stroke:var(--drug);stroke-width:1.2;stroke-dasharray:2 3;opacity:${op}"/>`;
      s+=`<text x="${f1(dsx+4)}" y="${L.vc[0]+12}" class="t-xs" style="fill:var(--drug);opacity:${op}">${rx==='plex'?'PLEX onset ~2 d':'IVIG onset ~4-5 d'}</text>`}
    // curves up to now
    const crv=(f,Y,col,w,dash)=>{let p='';const n=Math.max(2,Math.ceil(d*8));for(let i=0;i<=n;i++){const q=d*i/n;p+=(i?'L':'M')+f1(xd(q))+' '+f1(Y(f(model(q))))}
      return `<path d="${p}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linejoin:round;${dash?'stroke-dasharray:'+dash:''}"/>`};
    s+=crv(q=>q.vc,VY,'var(--nerve)',2.6)+crv(q=>q.mep,PY,'var(--ach)',2,'6 3')+crv(q=>q.mip,PY,'var(--nerve)',2.6);
    // MIP 30% fall marker (MG-specific, Thieben 2005): first day MIP <= 70% of baseline
    {let dc=null;for(let q=0;q<=6;q+=.02){if(model(q).mip<=62*.7){dc=q;break}}
      if(dc!=null&&d>=dc){const x=xd(dc),y=PY(62*.7);s+=`<path d="M${f1(x-5)} ${f1(y-11)}h10l-5 8z" style="fill:var(--bad)"/>`}}
    // now cursor + dots + direct labels
    const nx=xd(d);
    s+=`<line x1="${f1(nx)}" x2="${f1(nx)}" y1="${L.l0-10}" y2="${L.pr[1]}" style="stroke:var(--ink);opacity:.25"/>`;
    const dot=(y,col)=>`<circle cx="${f1(nx)}" cy="${f1(y)}" r="5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`;
    const lx=nx>X1-60?nx-8:nx+8,la=nx>X1-60?'t-end':'';
    s+=dot(VY(m.vc),m.vc<20?'var(--bad)':'var(--nerve)')+`<text x="${f1(lx)}" y="${f1(VY(m.vc)-8)}" class="t-xs ${la}" style="fill:var(--nerve);font-weight:600">VC ${Math.round(m.vc)}</text>`;
    s+=dot(PY(m.mep),'var(--ach)')+`<text x="${f1(lx)}" y="${f1(PY(m.mep)-8)}" class="t-xs ${la}" style="fill:var(--ach);font-weight:600">MEP ${Math.round(m.mep)}</text>`;
    s+=dot(PY(m.mip),m.mip<40?'var(--bad)':'var(--nerve)')+`<text x="${f1(lx)}" y="${f1(PY(m.mip)+15)}" class="t-xs ${la}" style="fill:var(--nerve);font-weight:600">MIP −${Math.round(m.mip)}</text>`;
    // day axis
    for(let q=0;q<=21;q+=3)s+=`<text x="${f1(xd(q))}" y="${L.ax}" class="t-xs t-mid">${q}</text>`;
    s+=`<text x="${X1+4}" y="${L.ax+12}" class="t-xs">day</text>`;
    // extubation anchors / BiPAP result strip
    if(I){const y=L.ex;
      s+=`<text x="${X0}" y="${y}" class="t-sm">Columbia 1997: share extubated, days after intubation</text>`;
      [[7,'25% by d7'],[13,'50% by d13']].forEach(([k,lab])=>{const q=T_IN+k,x=xd(q),on=d>=q;
        s+=`<circle cx="${f1(x)}" cy="${y+20}" r="4.5" style="fill:${on?'var(--good)':'var(--panel)'};stroke:var(--good);stroke-width:1.5"/><text x="${f1(x)}" y="${y+11}" class="t-xs t-mid" style="fill:var(--good);opacity:${on?1:.5}">${lab}</text>`});
      s+=`<line x1="${f1(xd(T_IN))}" x2="${X1}" y1="${y+20}" y2="${y+20}" style="stroke:var(--good);stroke-dasharray:2 3;opacity:.6"/><path d="M${X1} ${y+16}l7 4l-7 4z" style="fill:var(--good)"/>`;
      s+=`<text x="${X1+10}" y="${y+23}" class="t-xs" style="fill:var(--good)">75%</text><text x="${X1+10}" y="${y+34}" class="t-xs" style="fill:var(--good)">by d31</text>`;
      s+=`<circle cx="${f1(xd(T_IN))}" cy="${y+20}" r="3" style="fill:var(--bad)"/><text x="${f1(xd(T_IN)-6)}" y="${y+23}" class="t-xs t-end" style="fill:var(--bad)">intubation</text>`;
    }else{const y=L.ex;
      s+=`<text x="${X0}" y="${y}" class="t-sm">Mayo 2008: BiPAP first in 24 episodes; 14 avoided intubation</text>`;
      s+=`<text x="${X0}" y="${y+16}" class="t-xs">mean BiPAP 4.3 days in those 14; PaCO2 &gt;45 at start predicted failure</text>`}
    // notes
    const NT=N?NOTES_N:NOTES_W;let ny=L.ov;
    NT[0].forEach(l=>{s+=`<text x="${N?8:12}" y="${ny}" class="t-xs">${l}</text>`;ny+=13});
    if(ov){ny+=3;NT[1].forEach(l=>{s+=`<text x="${N?8:12}" y="${ny}" class="t-xs" style="fill:var(--ink)">${l}</text>`;ny+=13})}
    else if(N)s+=`<text x="8" y="${ny+3}" class="t-xs" style="fill:var(--ink)">Overlay off: the 20/30/40 rule (from</text><text x="8" y="${ny+16}" class="t-xs" style="fill:var(--ink)">Guillain-Barré, not MG) is hidden.</text>`;
    else s+=`<text x="12" y="${ny+3}" class="t-xs" style="fill:var(--ink)">Overlay off: the 20/30/40 rule (from Guillain-Barré, not MG) is hidden.</text>`;
    s+=person(L,m,d);
    svg.innerHTML=s;
    // readout
    const supT={none:d<T_BI?'none yet':'breathing on own',bipap:'BiPAP',tube:'intubated, ventilator',nivpost:'NIV after extubation'}[m.sup];
    let rxT='not started';
    if(d>=T_RX){if(rx==='plex'){const n=PLEX_D.filter(q=>d>=q).length;rxT=`PLEX, ${n} of 5 sessions`}else rxT=d<T_RX+5?`IVIG, day ${Math.floor(d-T_RX)+1} of 5`:'IVIG course done'}
    $('#crRead').innerHTML=`<span>day <b>${f1(d)}</b></span><span>VC <b>${Math.round(m.vc)} mL/kg</b> (≈${f1(m.vc*.07)} L at 70 kg)</span><span>MIP <b>−${Math.round(m.mip)}</b> · MEP <b>${Math.round(m.mep)}</b> cmH2O</span><span>breath count <b>≈${m.sbc}</b> (derived)</span><span>PaCO2 <b>${Math.round(m.co2)}</b> · SpO2 <b>${Math.round(m.spo2)}%</b></span><span>support <b>${supT}</b></span><span>rescue <b>${rxT}</b></span>`;
    const p=phaseOf(CR_STEPS,t);setSt(p);
    let kv=`<div><dt>Trigger shown: ${CR_TRIG[trig].lab}</dt><dd>${CR_TRIG[trig].txt}</dd></div>`;
    if(p>=3)kv=`<div><dt>${I?'BiPAP fails':'BiPAP is enough'}</dt><dd>${CR_PATH[path]}</dd></div>`+(p>=4?`<div><dt>${CR_RX[rx].n}</dt><dd>${CR_RX[rx].txt}</dd></div>`:'');
    $('#crNote').innerHTML=noteHTML(CR_STEPS[p])+`<div class="kv">${kv}</div>`;
  }
  const stop=playWire(rg,$('#crPlay'),draw,26000,'Replay','crisis');
  const setSt=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  const grp=(attr,set)=>$$(`[${attr}]`).forEach(b=>b.addEventListener('click',()=>{set(b.getAttribute(attr));$$(`[${attr}]`).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  grp('data-crt',v=>{trig=v});
  grp('data-crp',v=>{path=v});
  grp('data-crx',v=>{rx=v});
  $('#crOv').addEventListener('click',()=>{ov=!ov;$('#crOv').setAttribute('aria-pressed',ov);draw(+rg.value)});
  draw(+rg.value);

  /* ---------- myasthenic vs cholinergic sorter ---------- */
  const on=new Set(),bal=$('#crBal');let tilt=0,stopB=null;
  $('#crSigns').innerHTML=CR_SIGNS.map(g=>`<button class="btn" data-sg="${g.id}" data-side="${g.side}" aria-pressed="false">${g.lab}</button>`).join('');
  function drawBal(a){
    const cx=180,cy=58,hl=120,r=a*Math.PI/180,lx=cx-hl*Math.cos(r),ly=cy-hl*Math.sin(r),rx2=cx+hl*Math.cos(r),ry=cy+hl*Math.sin(r);
    const nm=CR_SIGNS.filter(g=>on.has(g.id)&&g.side==='my').length,nc=CR_SIGNS.filter(g=>on.has(g.id)&&g.side==='ch').length;
    const pan=(x,y,lab,n,col)=>`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x-24)}" y2="${f1(y+34)}" style="stroke:var(--muted)"/><line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x+24)}" y2="${f1(y+34)}" style="stroke:var(--muted)"/><path d="M${f1(x-30)} ${f1(y+34)}Q${f1(x)} ${f1(y+50)} ${f1(x+30)} ${f1(y+34)}Z" style="fill:${col};stroke:${col==='var(--ab-soft)'?'var(--ab)':'var(--ach)'};stroke-width:1.5"/><text x="${f1(x)}" y="${f1(y+30)}" class="t-big t-mid">${n}</text><text x="${f1(x)}" y="${f1(y+66)}" class="t-xs t-mid">${lab}</text>`;
    let o=`<path d="M${cx-18} 150L${cx} ${cy}L${cx+18} 150Z" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    o+=`<line x1="${f1(lx)}" y1="${f1(ly)}" x2="${f1(rx2)}" y2="${f1(ry)}" style="stroke:var(--ink);stroke-width:4;stroke-linecap:round"/><circle cx="${cx}" cy="${cy}" r="5" style="fill:var(--ink)"/>`;
    o+=pan(lx,ly,'myasthenic',nm,'var(--ab-soft)')+pan(rx2,ry,'cholinergic',nc,'var(--ach-soft)');
    o+=`<text x="${cx}" y="18" class="t-xs t-mid">tally of tapped signs, not a diagnosis</text>`;
    bal.innerHTML=o;
  }
  function col(id,side){const items=CR_SIGNS.filter(g=>on.has(g.id)&&g.side===side);const h=$(id).querySelector('h4').outerHTML;
    $(id).innerHTML=h+(items.length?`<ul>${items.map(g=>`<li>${g.lab}${g.side==='unv'?': ':' '}${g.src}</li>`).join('')}</ul>`:`<p class="cr-empty">Nothing here yet.</p>`)+(items.length&&CR_SIDE_TXT[side]?`<p class="cr-empty">${CR_SIDE_TXT[side]}</p>`:'')}
  function upd(){col('#crColMy','my');col('#crColCh','ch');col('#crColBoth','both');col('#crColUnv','unv');
    const nm=CR_SIGNS.filter(g=>on.has(g.id)&&g.side==='my').length,nc=CR_SIGNS.filter(g=>on.has(g.id)&&g.side==='ch').length;
    const to=clamp((nc-nm)*3,-15,15),from=tilt;if(stopB)stopB();stopB=animate(450,p=>{tilt=lerp(from,to,ease(p));drawBal(tilt)},()=>{stopB=null})}
  $('#crSigns').addEventListener('click',e=>{const b=e.target.closest('[data-sg]');if(!b)return;const id=b.dataset.sg;on.has(id)?on.delete(id):on.add(id);b.setAttribute('aria-pressed',on.has(id));upd()});
  $('#crClear').addEventListener('click',()=>{on.clear();$$('[data-sg]').forEach(b=>b.setAttribute('aria-pressed','false'));upd()});
  upd();

  /* ---------- prolonged intubation (Columbia risk factors) ---------- */
  const fac=new Set(),pro=$('#crPro');
  function drawPro(){const n=fac.size;let o='';const X=58,W=280,Y0=150,H=110;
    o+=`<text x="10" y="18" class="t-sm">intubated more than 2 weeks, Columbia 1997</text>`;
    [0,25,50,75,100].forEach(v=>{const y=Y0-H*v/100;o+=`<line x1="${X-6}" x2="${X+W}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${X-10}" y="${f1(y+3)}" class="t-xs t-end">${v}%</text>`});
    CR_PRO.forEach((v,i)=>{const bw=44,x=X+14+i*68,h=Math.max(2,H*v/100),cur=i===n;
      o+=`<rect x="${x}" y="${f1(Y0-h)}" width="${bw}" height="${f1(h)}" rx="4" style="fill:${cur?'var(--ab)':'var(--ab-soft)'};stroke:var(--ab)"/><text x="${x+bw/2}" y="${f1(Y0-h-6)}" class="t-lbl t-mid" style="fill:${cur?'var(--ab)':'var(--muted)'}">${v}%</text><text x="${x+bw/2}" y="${Y0+16}" class="t-xs t-mid">${i} factor${i===1?'':'s'}</text>`});
    o+=`<text x="${X+W}" y="${Y0+34}" class="t-xs t-end">filled bars: published group shares</text>`;
    pro.innerHTML=o;
    $('#crProNote').innerHTML=`<div class="kicker">${n} of 3 risk factors</div><h4><span class="cr-num">${CR_PRO[n]}%</span>stayed intubated more than 2 weeks</h4><p>${CR_PRO_TXT[n]}</p><p>In Germany, longer ventilation (over 15 days) went with older age, late-onset MG, more than 3 other illnesses (OR 2.99), pneumonia (OR 3.13) and resuscitation (OR 9.15); early-onset MG, thymic hyperplasia and a successful NIV trial went with shorter ventilation. [[Neumann2020]]</p><div class="hook"><b>Exam hook</b>Columbia predictors of intubation over 2 weeks: <b>bicarbonate ≥30</b>, <b>peak VC &lt;25 mL/kg</b> on days 1-6, <b>age &gt;50</b>: 0, 21, 46, 88% with 0-3 factors.</div>`;
  }
  $$('[data-crf]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.crf;fac.has(k)?fac.delete(k):fac.add(k);b.setAttribute('aria-pressed',fac.has(k));drawPro()}));
  drawPro();

  /* ---------- mortality bars ---------- */
  const ms=$('#crMort');let grow=1,stopM=null;
  function drawMort(){const N=vb(ms,'720 286','400 470');let o='';
    const X=N?16:300,W=N?300:360,max=45,rowH=N?72:38,top=N?34:30;
    o+=`<text x="${N?16:10}" y="16" class="t-sm">deaths per crisis, % (published values)</text>`;
    [0,10,20,30,40].forEach(v=>{const x=X+W*v/max;o+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${top-4}" y2="${top+rowH*6-4}" class="grid"/><text x="${f1(x)}" y="${top+rowH*6+10}" class="t-xs t-mid">${v}</text>`});
    CR_MORT.forEach((r,i)=>{const y=top+i*rowH,w=W*r.v/max*grow,col=r.v>=10?'var(--bad)':'var(--ab)';
      if(N){o+=`<text x="${X}" y="${y+10}" class="t-lbl">${r.lab}</text><text x="${X}" y="${y+24}" class="t-xs">${r.sub}</text>`;
        o+=`<rect x="${X}" y="${y+32}" width="${f1(Math.max(2,w))}" height="18" rx="4" style="fill:${col}"/><text x="${f1(X+Math.max(2,w)+6)}" y="${y+45}" class="t-lbl">${r.v}%</text>`}
      else{o+=`<text x="10" y="${y+14}" class="t-lbl">${r.lab}</text><text x="${X-12}" y="${y+14}" class="t-xs t-end">${r.sub}</text>`;
        o+=`<rect x="${X}" y="${y+1}" width="${f1(Math.max(2,w))}" height="20" rx="4" style="fill:${col}"/><text x="${f1(X+Math.max(2,w)+6)}" y="${y+15}" class="t-lbl">${r.v}%</text>`}});
    ms.innerHTML=o}
  drawMort();
  const prevS=onShow.crisis;onShow.crisis=()=>{prevS&&prevS();if(stopM)stopM();grow=0;stopM=animate(900,p=>{grow=ease(p);drawMort()},()=>{stopM=null})};
  const prevR=redraws.crisis;redraws.crisis=()=>{prevR&&prevR();drawMort()};
};
