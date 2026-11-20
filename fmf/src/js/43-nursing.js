
/* =============== 4.3 nursing care =============== */
const NU_SITES={
 gen:{n:'Fever & the envelope',dot:null,
  what:'Sudden onset, peaking within hours, and it can occur alone. The Livneh criteria define a typical attack as recurrent, at least 38 °C rectally, and lasting 12 hours to 3 days. Episodes of 6–12 hours or 3–7 days, or below 38 °C, count as incomplete attacks. [[Livneh1997,Sonmez2016,Tufan2020]]',
  gap:'No FMF-specific source was found on thermometry route, site or frequency, so this app does not state one.'},
 abdo:{n:'Abdomen',dot:[30,62],
  what:'Peritonitis is the commonest feature, in 93.7% of the 2,838-patient Turkish registry. Guarding, rebound tenderness and ileus all occur in ordinary FMF peritonitis, so peritoneal signs do not separate it from a surgical abdomen. The published discriminator for appendicitis is a shift of pain from diffuse to the right lower quadrant. Symptoms resolve completely within 24–72 hours. [[Tunca2005,Tufan2020,Lidar2008]]',
  hook:'About 80% of appendices removed from FMF patients were not inflamed, against about 20% in the general population. In one 971-patient cohort a quarter had had an appendectomy. [[Lidar2008,Bodakci2021]]'},
 chest:{n:'Chest',dot:[24,44],
  what:'Pleuritis affects fewer than half of patients: sudden, usually one-sided, sometimes with a small costophrenic-angle effusion, resolving in 1–3 days. Pericarditis is rare, 27 cases among about 4,000 Israeli patients over 20 years, and 1.4% of the Turkish registry. [[Tufan2020,Kees1997,Tunca2005]]',
  gap:'Published descriptions cover site, laterality, effusion and duration. They do not cover chest expansion, splinting or atelectasis risk, so no FMF source supports those observations.'},
 joint:{n:'Joints & muscles',dot:[24,104],
  what:'Usually acute mono- or oligoarthritis of a large lower-limb joint. The fluid is sterile but inflammatory and can mimic septic arthritis. Symptoms peak in 1–3 days and settle within about a week. Exertional leg pain occurred in 22.1% of 3,454 children, and 30.2% of M694V homozygotes. [[Tufan2020,Ozturk2022]]',
  hook:'Protracted febrile myalgia occurs in about 1.6%, lasts up to six weeks, happens despite colchicine and responds to corticosteroids. In 78 children reviewed, more than half presented with it first. [[Ozturk2022,Langevitz1994,Hospach2024]]'},
 skin:{n:'Skin',dot:[34,116],
  what:'Erysipelas-like erythema: a tender red plaque on the lower leg, ankle or top of the foot, often brought on by long walking or travel. It occurred in about 7.5% of one paediatric cohort of 782, where affected children more often had arthritis and M694V homozygosity. [[Tufan2020,GezginYildirim2020]]'},
 scrot:{n:'Scrotum',dot:[30,80],
  what:'Inflammation of the tunica vaginalis. In 175 Arab boys under 16 with FMF, 9% had scrotal attacks lasting 8 hours to 5 days. It was the first sign of FMF in a quarter of them, and 38% had surgery. [[Majeed2000]]'},
 bloods:{n:'Bloods',dot:null,
  what:'The 2024 guideline describes a raised white cell count with neutrophil predominance, raised CRP, SAA and fibrinogen, and a raised ESR. CRP rose in every attack in a dedicated study, while platelets did not rise, ferritin rose in only one patient and albumin did not change. Attack medians were SAA 693 and CRP 115 mg/L, against 6 and 4 mg/L between attacks. [[Ozen2025,Korkmaz2002,Lachmann2006]]',
  hook:'Ferritin and platelets staying flat while CRP climbs is what separates an FMF attack from Still\'s disease on the bloods. [[Korkmaz2002]]'}
};
const NU_FLAGS=[
 {t:'It does not resolve',d:'Attacks are self-limited, usually 1–3 days, and patients are usually completely well between them. An episode that does not resolve on that timescale falls outside the described natural history. [[GeneReviews,Tufan2020]]'},
 {t:'Pain shifts to the right lower quadrant',d:'Peritoneal signs are ordinary in FMF, so they do not rule appendicitis in or out. The published discriminator is the shift from diffuse pain to the right lower quadrant. Both guideline versions say other causes such as appendicitis must always be considered. [[Lidar2008,Ozen2016,Ozen2025]]'},
 {t:'Proteinuria and creatinine climbing fast',d:'Amyloid storm: sudden severe proteinuria with rapidly progressive renal failure and markedly raised acute-phase reactants, over days to weeks. In the original 20-patient series infection triggered 17 of 20, and within a year 16 reached end-stage renal disease or death against 3 controls. A 2025 review put the frequency at 5.5% of FMF-associated cases, with mortality of 33–67%. [[Ozkurt2025,Kukuy2021]]'},
 {t:'Gut symptoms in someone whose dose or drugs just changed',d:'An emergency-nursing review notes colchicine toxicity often begins with gastrointestinal symptoms and can progress to multiorgan failure, that there is no antidote so care is supportive, and that older adults, people with renal or hepatic impairment and those on interacting drugs are at highest risk. The label reports gut effects in up to 20% of patients starting treatment, and says severe ones can herald more serious toxicity. [[Denke2026,FDA-Colcrys]]'},
 {t:'The family is calm, or frightened',d:'Of parents of 171 children with FMF, 90.1% knew colchicine works but only 39.2% knew there is no vital risk during an attack. Family alarm is not a guide to severity in either direction. [[Yildirim2021]]'}
];
const NU_TOOLS=[
 {n:'AIDAI',s:'Validated',b:['A patient or parent diary kept for one month before the visit.','Twelve items scored 0 or 1 each day: fever ≥38 °C, overall symptoms, abdominal pain, nausea or vomiting, diarrhoea, headache, chest pain, painful nodes, arthralgia or myalgia, joint swelling, eye signs, skin rash. A thirteenth item, pain relief taken, is recorded but not scored.','Total 9 or more means active disease: sensitivity 89%, specificity 92%, AUC 98% against blinded expert consensus.','The 2024 guideline calls it the only validated activity score in FMF, and says it has problems reflecting activity.'],c:'[[Piram2014,Ozen2025]]'},
 {n:'ISSF',s:'Validated',b:['A severity score built by Delphi and validated in 281 patients, AUC 0.825.','Nine domains, scored as ten items because attack frequency splits in two; maximum 10.','Bands: 2 or less mild, 3–5 intermediate, 6 or more severe.','In 160 treated Turkish children it classed 21.3% mild, 70.5% intermediate, 8.1% severe.'],c:'[[DemirkayaISSF2016,Ozdemir2021]]'},
 {n:'FMF50',s:'Response, not activity',b:['Six items: change in attack frequency, change in attack duration, patient or parent global severity, physician global severity, change in arthritis attacks, and change in CRP, ESR or SAA.','Response is at least 50% improvement in 5 of the 6 with none worsening, judged after 3–6 months, and only once the maximum tolerated dose has been reached.','It separated responders poorly in the rilonacept randomised trial.'],c:'[[Ozen2014,Ozen2017,Hashkes2012]]'},
 {n:'Attack count',s:'Simplest',b:['In 239 patients, the number of attacks in the past 12 months correlated moderately with quality-of-life and pain scores, which supports it as a single activity measure.','The 2024 minimum outcome set uses attacks per 3 months.'],c:'[[Piskin2022,Ozen2025]]'},
 {n:'MASIF',s:'Adherence',b:['An 18-item, four-subscale adherence scale developed in 150 Turkish children aged 2 to 18.','Correlated with the Morisky scale at r = 0.515, Cronbach alpha 0.728, test-retest r = 0.843, parent–child agreement r = 0.781.'],c:'[[Yesilkaya2015]]'},
 {n:'JAIMAR',s:'Multidimensional',b:['Sixteen measures across functional status, pain, adherence and quality of life, parent-proxy or self-report from age 8, tested in 250 children with FMF.','About 15 minutes to complete and score.'],c:'[[Konukbay2016]]'}
];
const NU_SCEN={
 routine:{n:'A routine daily dose',steps:[1,1,1,1,1],
  note:'The label gives colchicine for FMF by mouth, once daily or in two divided doses, without regard to meals. The 2024 guideline allows either, chosen by adherence and tolerance, and notes a single dose is accepted as effective but may bring more gut upset. Dose increases are made gradually and no more often than weekly. [[FDA-Colcrys,Ozen2025]]'},
 clarithro:{n:'Also prescribed clarithromycin',steps:[1,0,1,1,1],
  note:'This is the interaction with the clearest harm. In one study 9 of 88 patients given clarithromycin and colchicine together died, against 1 of 28 given them sequentially, with baseline renal impairment, longer overlap and pancytopenia predicting death. Where no alternative exists the label caps the FMF dose at 0.6 mg a day with strong CYP3A4 or P-glycoprotein inhibitors, and the cap also applies within 14 days of the interacting drug. Azithromycin raises exposure far less. [[Hung2005,FDA-Colcrys,Terkeltaub2011]]'},
 renal:{n:'Reduced kidney function',steps:[1,1,0,1,1],
  note:'The label advises close monitoring and possible dose reduction with a creatinine clearance of 50–80 or 30–50 mL/min, and a starting dose of 0.3 mg a day below 30 mL/min or on dialysis. Colchicine is not removed by haemodialysis. The 2024 guideline adds that toxicity risk is high in reduced renal function, so signs of toxicity and creatine kinase are monitored carefully and the dose reduced accordingly. [[FDA-Colcrys,Ozen2025]]'},
 attack:{n:'In an attack right now',steps:[1,1,1,0,1],
  note:'Recommendation 11 of the 2024 guideline: during a characteristic attack the colchicine dose is not increased. The usual dose continues, NSAIDs are used for symptoms, and the recommendation names neither glucocorticoids nor opioids. The patient-information source says plainly that raising the dose during an attack does not help. Both versions say other causes, such as appendicitis, must always be considered. [[Ozen2025,PRINTO2016,Ozen2016]]'},
 missed:{n:'A dose was missed',steps:[1,1,1,1,0],
  note:'For prophylaxis, including FMF, the label says to take the dose as soon as possible and then resume the normal schedule, and that a skipped dose must not be made up by doubling the next one. The label\'s 12-hour rule belongs to a dose missed while treating a gout flare, not to FMF. [[FDA-Colcrys]]'}
};
const NU_STEPS=[
 {t:'The order',d:'Dose and whether it is given once or split.'},
 {t:'Interactions',d:'Strong CYP3A4 and P-glycoprotein inhibitors, statins, grapefruit.'},
 {t:'Kidneys and liver',d:'Clearance, and the bloods that follow it.'},
 {t:'Where in the illness',d:'Attack or no attack changes nothing about the dose.'},
 {t:'What was actually taken',d:'Missed doses, and what the patient believes about them.'}
];
const NU_INJ=[
 {n:'Outer upper arm',x:96,y:96},{n:'Abdomen',x:210,y:150},{n:'Front of mid thigh',x:170,y:236},
 {n:'Outer upper arm',x:324,y:96},{n:'Upper outer buttock',x:300,y:190},{n:'Front of mid thigh',x:250,y:236}
];
const NU_BIO=[
 {n:'Anakinra',s:'Off-label in FMF (US)',b:['100 mg a day, or 2 mg/kg, subcutaneously daily.','Sites named by the label: outer upper arms, abdomen except the 2-inch area around the navel, front of the middle thighs, upper outer buttocks. A new site each time, which may reduce the risk of injection-site amyloid deposits. No minimum distance from the last site is given.','Refrigerate at 2–8 °C, do not freeze or shake, protect from light, and let the syringe stand at room temperature for 30 minutes first.','Injection-site reactions in 71% of the rheumatoid arthritis trials, usually in the first 4 weeks; 16.3% in NOMID in the first 6 months, none after year 2.','Neutrophils before starting, monthly for 3 months, then quarterly for up to a year.','Its US indications are rheumatoid arthritis, NOMID and DIRA, so FMF use is off-label.'],c:'[[KineretPI,Ozen2025]]'},
 {n:'Canakinumab',s:'FMF is in the US label',b:['150–300 mg, or 2–4 mg/kg, subcutaneously every 4–8 weeks.','Store unopened vials at 2–8 °C in the original carton, do not freeze. Preservative-free.','The label says to avoid injecting into scar tissue, because it may give insufficient exposure.','Injection-site reactions in 10.1% in the TRAPS, HIDS/MKD and FMF study, all mild or moderate, none leading to stopping.','It reports neutropenia and other cytopenias but gives no blood-count interval.'],c:'[[IlarisPI,Ozen2025]]'},
 {n:'Rilonacept',s:'Off-label in FMF (US)',b:['2.2 mg/kg, maximum 160 mg, subcutaneously weekly. A 320 mg loading dose is given as two 160 mg injections the same day at different sites.','Reconstituted with 2.3 mL preservative-free sterile water, shaken about a minute, left to stand a minute, used within 3 hours. Vials are single-use.','Sites: abdomen, thigh or upper arm, avoiding within 2 inches of the navel and skin that is bruised, red, tender or hard, rotating each time.','Injection-site reactions in 48% in the CAPS placebo-controlled phase, against 13% on placebo.','The label advises monitoring lipids, and growth and development in children.','Its US indications are CAPS, maintenance of remission of DIRA and recurrent pericarditis.'],c:'[[ArcalystPI]]'}
];
const NU_MYTHS=[
 {m:'Take extra when an attack starts',t:'Colchicine prevents attacks; it does not treat one under way',
  a:'The patient-information source states plainly that raising the dose during an attack does not help. Recommendation 11 of the 2024 guideline says the same from the clinician side: continue the usual dose, use NSAIDs for symptoms. [[PRINTO2016,Ozen2025]]',
  q:'Ask: "If an attack starts tonight, what will you do about your tablets?"'},
 {m:'Stop it when you feel well',t:'The point of it is the years with no symptoms',
  a:'Attacks and the risk of amyloidosis return if treatment stops. Poor adherence, especially in adolescence, raises the later risk of amyloidosis. The patient source advises not changing the dose without speaking to the doctor first. [[PRINTO2016]]',
  q:'Ask: "What do you think would happen if you stopped for a few months?"'},
 {m:'Attacks continue, so it has failed',t:'Resistance is only defined after adherence is confirmed',
  a:'The consensus definition requires recurrent attacks, on average one or more a month over three months, or persistent laboratory inflammation between attacks, after adherence has been confirmed. The 2024 guideline deliberately added the words "in adherent patients" to the dose-escalation recommendation. [[Ozen2021,Ozen2025]]',
  q:'Ask: "In the last month, how many days did you miss a tablet?" rather than "are you taking it?"'},
 {m:'Diarrhoea means stopping',t:'The commonest side effect is usually managed, not a reason to stop',
  a:'The patient source describes lowering the dose until it is tolerated and then raising it slowly, and says cutting lactose for about three weeks may help. Blood counts may occasionally fall but usually recover when the dose comes down. Severe gut effects can herald more serious toxicity, so they are reported rather than endured. [[PRINTO2016,FDA-Colcrys]]',
  q:'Ask: "Has anything about the tablets been unpleasant enough to skip them?"'},
 {m:'It is unsafe in pregnancy',t:'The guideline names this misconception as a barrier',
  a:'Recommendation 10 states colchicine should be continued through conception, pregnancy and lactation, and that amniocentesis is not currently recommended. The guideline calls it essential to share with obstetricians that colchicine is safe in pregnancy, and lists "the misconception that colchicine is contraindicated in pregnancy" in its barriers table. The supporting review found female fertility unaffected, and men do not need to stop at recommended doses. [[Ozen2025]]',
  q:'Ask: "Has anyone suggested you should come off it if you became pregnant?"'},
 {m:'An attack is dangerous in itself',t:'Most parents do not know this one',
  a:'Of parents of 171 children with FMF, 90.1% knew colchicine is effective but only 39.2% knew there is no vital risk during an attack. The authors judged knowledge unsatisfactory and recommended continuing education from diagnosis onward. This does not apply to the red flags above, which are a different matter. [[Yildirim2021]]',
  q:'Ask: "What worries you most when an attack starts?"'}
];
const NU_DOC=[
 {k:'attacks',l:'Attacks since the last visit',v:'Attacks in the last 3 months: 2. Sites: abdomen, abdomen. Longest 48 h.',c:true},
 {k:'current',l:'This episode: site, onset, duration so far',v:'This episode: abdominal, onset 06:40, 14 h so far, settling.',c:true},
 {k:'temp',l:'Temperature',v:'Temperature 38.4 °C.',c:true},
 {k:'exam',l:'Examination findings',v:'Abdomen: generalised guarding, rebound present, pain diffuse and not localising to the right lower quadrant. Chest and joints clear. Skin clear.',c:true},
 {k:'labs',l:'Acute-phase bloods',v:'CRP 96 mg/L, SAA pending, WCC 14.2 with neutrophil predominance, platelets and ferritin unchanged.',c:true},
 {k:'urine',l:'Urinalysis for protein',v:'Urinalysis: no protein.',c:true},
 {k:'tox',l:'Toxicity bloods',v:'FBC and liver function within range; CK not indicated, renal function normal.',c:false},
 {k:'adher',l:'Adherence, asked in a blame-free way',v:'Adherence: reports missing about 2 doses in the last month, usually at weekends.',c:true},
 {k:'meds',l:'What was actually taken, and interactions',v:'Colchicine 1.5 mg daily, taken this morning. No new CYP3A4 or P-gp inhibitor, no statin, no grapefruit.',c:true},
 {k:'pro',l:'What the patient reports',v:'Patient rates this attack 6/10 and says the last three months were better than the three before.',c:false},
 {k:'teach',l:'What was taught, and what they said back',v:'Teaching: why the dose is not increased during an attack. Patient explained it back correctly.',c:false},
 {k:'plan',l:'Plan and who was told',v:'Plan: continue usual dose, NSAID for symptoms, review in 6 months or sooner if attacks become monthly. Discussed with the rheumatology team.',c:false}
];
const NU_MON=[
 {m:0,t:'Diagnosis',d:'Follow-up is scheduled at frequent intervals after diagnosis and while the disease is unstable.',c:'[[Ozen2025]]'},
 {m:3,t:'Escalating a dose',d:'When the colchicine dose is being escalated in active disease, CRP and/or SAA at least every 3 months.',c:'[[Ozen2016,Ozen2017]]'},
 {m:6,t:'Routine review',d:'Visits every 6 months may suffice if the disease is under control. Response is judged on attack frequency, quality of life and inflammatory markers. The 2016 version set this interval flatly; 2024 made it conditional.',c:'[[Ozen2025,Ozen2016]]'},
 {m:9,t:'Tapering a biologic',d:'Where biologic doses are tapered or intervals stretched, close monitoring ideally every 3 months for flares or worsening inflammation.',c:'[[Ozen2025]]'},
 {m:12,t:'Urinalysis',d:'Urinalysis at least yearly, and more often if the disease is poorly controlled. The 2016 version asked for one at every clinic visit.',c:'[[Ozen2025,Ozen2016]]'}
];
inits.nursing=()=>{
  /* ---- 1 · assessment ---- */
  $('#nuAssessLede').innerHTML='An attack is a moving target: it starts suddenly, peaks, and is gone inside three days. These are the findings the literature describes at each site, and the observations it does not describe, which this app leaves blank rather than filling in. [[Tufan2020,Livneh1997]]';
  let site='abdo',flags=false;
  $('#nuSites').innerHTML='<span class="kicker">Look at</span>'+Object.entries(NU_SITES).map(([k,v])=>`<button class="btn" data-nus="${k}" aria-pressed="${k===site}">${v.n}</button>`).join('');
  const svg=$('#nuSvg'),rg=$('#nuT');
  const C={temp:h=>ramp(h,1,7)*(1-ramp(h,26,52)),pain:h=>ramp(h,.5,6)*(1-ramp(h,30,66)),
           crp:h=>{const x=h/40;return h<=0?0:Math.min(1,Math.pow(x,2.2)*Math.exp(2.2*(1-x)))},
           wcc:h=>ramp(h,2,12)*(1-ramp(h,40,72))};
  function draw(u){
    const N=vb(svg,'720 430','400 556');
    const h=u*120, S=NU_SITES[site];
    const L=N?{bx:20,by:26,bw:360,rowH:60, bodyX:296,bodyY:286, envX:20,envY:478,envW:360}
             :{bx:20,by:26,bw:300,rowH:60, bodyX:356,bodyY:34,  envX:20,envY:318,envW:660};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // observation rows
    const OBS=[['temp','Temperature',v=>(37+2.8*v).toFixed(1)+' °C','var(--terra)'],
               ['pain','Pain at the site',v=>Math.round(v*10)+'/10','var(--bad)'],
               ['crp','CRP',v=>Math.round(v*115)+' mg/L','var(--sea)'],
               ['wcc','White cells',v=>(5+v*9.5).toFixed(1),'var(--gold)']];
    OBS.forEach(([k,l,fmt,c],i)=>{const y=L.by+i*L.rowH,v=C[k](h);
      s+=`<text x="${L.bx}" y="${y}" class="t-sm" style="fill:${c}">${l.toUpperCase()}</text>`;
      s+=`<rect x="${L.bx}" y="${y+8}" width="${L.bw}" height="11" rx="5.5" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${L.bx}" y="${y+8}" width="${f1(L.bw*v)}" height="11" rx="5.5" style="fill:${c}"/>`;
      s+=`<text x="${L.bx+L.bw}" y="${y}" class="t-sm t-end"><tspan style="fill:var(--ink);font-weight:700">${fmt(v)}</tspan></text>`});
    // body figure with the selected site marked
    s+=`<g transform="translate(${L.bodyX} ${L.bodyY})"><circle cx="30" cy="12" r="9" style="fill:none;stroke:var(--muted);stroke-width:1.5"/><path d="M18 26 h24 l4 50 h-6 l-2 -30 M18 26 l-4 50 h6 l2 -30 M22 72 l-2 52 h6 l4 -44 l4 44 h6 l-2 -52" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-linejoin:round"/>`;
    if(S.dot)s+=`<circle cx="${S.dot[0]}" cy="${S.dot[1]}" r="${f1(6+3*C.pain(h))}" style="fill:var(--terra)"/>`;
    s+='</g>';
    // the envelope
    const ex=L.envX,ey=L.envY,ew=L.envW;
    s+=`<text x="${ex}" y="${ey-10}" class="t-sm">THE ENVELOPE · 12 to 72 hours</text>`;
    s+=`<rect x="${ex}" y="${ey}" width="${ew}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${f1(ex+ew*12/120)}" y="${ey}" width="${f1(ew*60/120)}" height="14" style="fill:var(--sea-soft)"/>`;
    s+=`<line x1="${f1(ex+ew*h/120)}" x2="${f1(ex+ew*h/120)}" y1="${ey-5}" y2="${ey+19}" style="stroke:var(--ink);stroke-width:2.5"/>`;
    [0,24,48,72,96,120].forEach((tk,i,a)=>s+=`<text x="${f1(ex+ew*tk/120)}" y="${ey+32}" class="t-xs ${i===a.length-1?'t-end':i===0?'':'t-mid'}">${tk}h</text>`);
    s+=`<text x="${ex}" y="${ey+50}" class="t-xs" style="fill:${h>72?'var(--bad)':'var(--muted)'}">${h>72?'beyond the described envelope: this is no longer a typical attack':'within the described envelope'}</text>`;
    svg.innerHTML=s;
    $('#nuRead').innerHTML=`<span>hour <b>${Math.round(h)}</b></span><span>temp <b>${(37+2.8*C.temp(h)).toFixed(1)} °C</b></span><span>CRP <b>${Math.round(C.crp(h)*115)} mg/L</b></span>`;
    const note=flags
      ? `<div class="kicker">Not a typical attack</div><h4>When to escalate</h4>`+NU_FLAGS.map(f=>`<div class="kv"><div><dt>${f.t}</dt><dd>${f.d}</dd></div></div>`).join('')
      : `<div class="kicker">${S.n}</div><h4>What the literature describes</h4><p>${S.what}</p>`+
        (S.hook?`<div class="hook"><b>Exam hook</b>${S.hook}</div>`:'')+
        (S.gap?`<div class="pt"><b>Where the evidence stops</b>${S.gap}</div>`:'');
    $('#nuNote').innerHTML=note;
  }
  const stop=playWire(rg,$('#nuPlay'),draw,13000,'Replay','nursing');
  $('#nuSites').addEventListener('click',e=>{const b=e.target.closest('[data-nus]');if(!b)return;site=b.dataset.nus;$$('[data-nus]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#nuFlag').onclick=()=>{flags=!flags;$('#nuFlag').setAttribute('aria-pressed',flags);$('#nuFlag').textContent=flags?'Back to the sites':'Show what is not a typical attack';draw(+rg.value)};
  $('#nuTools').innerHTML=NU_TOOLS.map(t=>`<div class="nu-card"><span class="tag sea">${t.s}</span><h5>${t.n}</h5><ul>${t.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${t.c}</p></div>`).join('');

  /* ---- 2 · giving the medicines ---- */
  $('#nuMedLede').innerHTML='Colchicine has a narrow therapeutic index, and most of what goes wrong with it goes wrong at the point of giving it. Pick a situation and see which check changes. [[Finkelstein2010,FDA-Colcrys]]';
  let scen='routine';
  $('#nuScen').innerHTML='<span class="kicker">Situation</span>'+Object.entries(NU_SCEN).map(([k,v])=>`<button class="btn" data-nusc="${k}" aria-pressed="${k===scen}">${v.n}</button>`).join('');
  const msv=$('#nuMedSvg');
  function drawMed(){
    const N=vb(msv,'560 400','400 440');
    const S=NU_SCEN[scen];let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const w=N?360:480, x=N?20:40;
    NU_STEPS.forEach((st,i)=>{const y=26+i*72,ok=S.steps[i];
      s+=`<rect x="${x}" y="${y}" width="${w}" height="58" rx="11" style="fill:var(--panel);stroke:${ok?'var(--line)':'var(--terra)'};stroke-width:${ok?1:2.5}"/>`;
      s+=`<circle cx="${x+26}" cy="${y+29}" r="13" style="fill:${ok?'var(--good-soft)':'var(--terra-soft)'};stroke:${ok?'var(--good)':'var(--terra)'};stroke-width:2"/>`;
      s+=ok?`<path d="M${x+20} ${y+29} l4 5 8 -10" style="fill:none;stroke:var(--good);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`
           :`<text x="${x+26}" y="${y+34}" class="t-lbl t-mid" style="fill:var(--terra)">!</text>`;
      s+=`<text x="${x+50}" y="${y+24}" class="t-lbl">${st.t}</text><text x="${x+50}" y="${y+42}" class="t-xs">${st.d}</text>`});
    msv.innerHTML=s;
    $('#nuMedNote').innerHTML=`<div class="kicker">${S.n}</div><h4>What changes</h4><p>${S.note}</p>`+
      (scen==='routine'?'<div class="hook"><b>Exam hook</b>Overdose can be fatal and there is no antidote. The 2024 guideline asks that intentional or accidental overdosing be carefully assessed, with suicidal ideation or intent evaluated, and that families be told about the narrow therapeutic index. The label advises keeping it out of reach of children. [[Ozen2025,FDA-Colcrys,Denke2026]]</div>':'');
    $('#nuMedCap').textContent='Five checks, and which one the situation changes. The checks are drawn from the label and the guideline, not from a local protocol.';
  }
  $('#nuScen').addEventListener('click',e=>{const b=e.target.closest('[data-nusc]');if(!b)return;scen=b.dataset.nusc;$$('[data-nusc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMed()});
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawMed();drawInj(injI);drawMon(+$('#nuMonT').value)};

  /* injection sites */
  const isv=$('#nuInjSvg');let injI=0,injTimer=null;
  function drawInj(k){
    vb(isv,'420 320','400 330');
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<g transform="translate(150 20)"><circle cx="60" cy="22" r="17" style="fill:none;stroke:var(--muted);stroke-width:2"/><path d="M34 50 h52 l10 104 h-14 l-6 -62 M34 50 l-10 104 h14 l6 -62 M44 142 l-6 110 h14 l8 -92 l8 92 h14 l-4 -110" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-linejoin:round"/></g>`;
    NU_INJ.forEach((p,i)=>{const on=i===k;
      s+=`<circle cx="${p.x}" cy="${p.y}" r="${on?13:9}" style="fill:${on?'var(--sea)':'var(--sea-soft)'};stroke:var(--sea);stroke-width:2"/>`;
      if(on)s+=`<circle cx="${p.x}" cy="${p.y}" r="20" style="fill:none;stroke:var(--sea);stroke-width:1.5;opacity:.5"/>`});
    const p=NU_INJ[k];
    s+=`<text x="210" y="300" class="t-lbl t-mid">${p.n}</text><text x="210" y="316" class="t-xs t-mid">site ${k+1} of ${NU_INJ.length} · a new site each time</text>`;
    isv.innerHTML=s;
    $('#nuInjNote').innerHTML='<div class="kicker">Subcutaneous sites</div><h4>Rotating them</h4><p>These are the sites the labels name. Anakinra\'s instructions list the outer upper arms, the abdomen except the 2-inch area around the navel, the front of the middle thighs and the upper outer buttocks, and tell the patient to choose a new site each time, which may reduce the risk of injection-site amyloid deposits. Skin that is bruised, red, scarred, hard, thickened or lumpy is avoided. No minimum distance from the last site is given. [[KineretPI]]</p><div class="hook"><b>Exam hook</b>Injection-site reactions differ sharply: 71% with anakinra in the rheumatoid arthritis trials, 48% with rilonacept in the CAPS placebo-controlled phase against 13% on placebo, and 10.1% with canakinumab in the TRAPS, HIDS/MKD and FMF study, all mild or moderate. [[KineretPI,ArcalystPI,IlarisPI]]</div><div class="pt"><b>In plain words</b>The injection goes in a different spot each time, so the skin in any one place gets a rest.</div>';
  }
  /* with reduced motion the button steps one site at a time instead of looping */
  if(RM)$('#nuInjPlay').textContent='Next site';
  $('#nuInjPlay').onclick=()=>{
    if(RM){injI=(injI+1)%NU_INJ.length;drawInj(injI);return}
    if(injTimer){clearInterval(injTimer);injTimer=null;$('#nuInjPlay').textContent='Rotate through the sites';return}
    $('#nuInjPlay').textContent='Stop';
    injTimer=setInterval(()=>{injI=(injI+1)%NU_INJ.length;drawInj(injI)},1300);
  };
  const prevH=onHide.nursing;onHide.nursing=()=>{prevH&&prevH();if(injTimer){clearInterval(injTimer);injTimer=null;$('#nuInjPlay').textContent='Rotate through the sites'}};
  $('#nuBio').innerHTML=NU_BIO.map(b=>`<div class="nu-card"><span class="tag ${b.s.startsWith('FMF')?'good':'warn'}">${b.s}</span><h5>${b.n}</h5><ul>${b.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${b.c}</p></div>`).join('');

  /* ---- 3 · teaching ---- */
  $('#nuTeachLede').innerHTML='The 2024 guideline makes adherence the cornerstone of management and says the goals cannot be reached without a lifelong therapeutic alliance. It also names poor information about colchicine as a barrier to implementation. These are the six things the literature records people getting wrong. [[Ozen2025]]';
  let myth=0;
  function renderMyths(){
    $('#nuMyths').innerHTML=NU_MYTHS.map((m,i)=>`<button class="nu-q" data-nm="${i}" aria-expanded="${i===myth}"><span class="myth">Often believed</span><b>${m.m}</b></button>`).join('');
    const M=NU_MYTHS[myth];
    $('#nuMythNote').innerHTML=`<div class="kicker">What the literature says</div><h4>${M.t}</h4><div class="nu-ans"><p>${M.a}</p><p><b>${M.q}</b></p></div>`;
  }
  $('#nuMyths').addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;myth=+b.dataset.nm;renderMyths()});
  renderMyths();
  $('#nuTeachCards').innerHTML=`
   <div class="nu-card"><h5>What the guidelines ask of education</h5><ul><li>Overarching principle 3, agreed by everyone on the panel: FMF needs lifetime management, so adherence is the cornerstone, and education of patient and family is crucial.</li><li>Education should cover disease, medication, adherence, prevention and self-management, and the research agenda lists tools to improve it as an open need.</li><li>The panel noted patients preferred the word "holistic" to "patient-centred".</li></ul><p class="stage-cap">[[Ozen2025]]</p></div>
   <div class="nu-card"><h5>How often it is not taken</h5><ul><li>72.8% of 324 Turkish children scored poorly adherent on the MASIF scale, many of whom reported taking it regularly.</li><li>Among 104 Turkish adults, adherence was low in 28.8% and moderate in 45.2%.</li><li>In an Israeli cohort of 4,526 patients the medication possession ratio was below 80% in more than half, and being on an IL-1 blocker did not improve it.</li><li>Self-report overestimates it: most of 179 patients were non-adherent on a validated questionnaire while far fewer said so.</li></ul><p class="stage-cap">[[ErdemTorun2026,Bolek2026,Levinsky2023,Tekgoz2021]]</p></div>
   <div class="nu-card"><h5>What has been tried, and worked</h5><ul><li>A randomised trial gave 70 adolescents individual disease-management education with a booklet: depression scores fell and quality of life rose, while the anxiety change was not significant. The authors describe it as a first study of nurses educating adolescents with FMF.</li><li>A second randomised trial in 43 children compared a purpose-built mobile game, a booklet and nothing. The game group gained in self-efficacy, symptom management and quality of life, and the effect lasted longer than the booklet\'s.</li><li>No randomised trial of a nurse-led intervention with colchicine adherence as its primary outcome, and no FMF study of teach-back or motivational interviewing, was found in an October 2026 search.</li></ul><p class="stage-cap">[[Kacan2023,KasAlay2026,PubMedSweepNursing2026]]</p></div>
   <div class="nu-card"><h5>Asking about adherence</h5><ul><li>The guideline directs teams to the 2020 EULAR points to consider on non-adherence, summarising the method as setting up a safe environment and using open questions.</li><li>Those points report that 30 to 80% of people with rheumatic diseases do not take treatment as agreed, and organise the response into preventing non-adherence, removing structural barriers, assessing it without blame, and tailoring the fix to the cause.</li><li>Measuring colchicine in hair as an objective check is described in the guideline as experimental and costly.</li></ul><p class="stage-cap">[[Ozen2025,Ritschl2021]]</p></div>
   <div class="nu-card"><h5>Family, school and genetics</h5><ul><li>Telling the school about the condition, including what to do during an attack, is described as useful, and children on long-term colchicine can take part in any sport. No published template school or work letter was found.</li><li>FMF is mostly autosomal recessive, so parents are usually unaffected carriers; if one parent has FMF and the other is a carrier, there is a 50% chance a child is affected. Testing finds variants in only about 70 to 80% of patients.</li><li>Among 90 caregivers of Turkish children, most reported mild care burden and a substantial minority moderate or severe.</li></ul><p class="stage-cap">[[PRINTO2016,Kosan2019]]</p></div>
   <div class="nu-card"><h5>Where to send people</h5><ul><li>The PRINTO and PReS family information pages cover treatment, follow-up tests, school, sport, pregnancy, inheritance and prognosis.</li><li>The FMF &amp; AID Global Association runs a helpline, educational materials and an international patient survey.</li><li>The Autoinflammatory Alliance is a US charity promoting awareness, diagnosis and care.</li></ul><p class="stage-cap">[[PRINTO2016,FMFAID,AutoinflammatoryAlliance]]</p></div>`;

  /* ---- 4 · documentation ---- */
  $('#nuDocLede').innerHTML='Recommendation 6 of the 2024 guideline asks that response, toxicity and adherence be monitored regularly, with response judged on attack frequency, quality of life and inflammatory markers. Recommendation 12 sets a minimum outcome set. Tick what you observed and the entry assembles below. [[Ozen2025]]';
  const state={};NU_DOC.forEach(f=>state[f.k]=f.c);
  function renderDoc(){
    $('#nuDocFields').innerHTML=NU_DOC.map(f=>`<label><input type="checkbox" data-nd="${f.k}" ${state[f.k]?'checked':''}><span>${f.l}</span></label>`).join('');
    const lines=NU_DOC.filter(f=>state[f.k]).map(f=>f.v);
    $('#nuDocOut').textContent=lines.length?lines.join('\n'):'Nothing ticked yet.';
  }
  $('#nuDocFields').addEventListener('change',e=>{const i=e.target.closest('[data-nd]');if(!i)return;state[i.dataset.nd]=i.checked;renderDoc()});
  $('#nuDocAll').onclick=()=>{NU_DOC.forEach(f=>state[f.k]=true);renderDoc()};
  $('#nuDocNone').onclick=()=>{NU_DOC.forEach(f=>state[f.k]=false);renderDoc()};
  renderDoc();

  /* monitoring year */
  const mv=$('#nuMonSvg'),mr=$('#nuMonT');
  function drawMon(t){
    const N=vb(mv,'720 230','400 420');
    const T=t*12;let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(N){
      NU_MON.forEach((e,i)=>{const y=30+i*76,on=T>=e.m;
        s+=`<circle cx="30" cy="${y}" r="9" style="fill:${on?'var(--sea)':'var(--panel-2)'};stroke:var(--sea);stroke-width:2"/>`;
        if(i<NU_MON.length-1)s+=`<line x1="30" x2="30" y1="${y+10}" y2="${y+66}" style="stroke:var(--line);stroke-width:2"/>`;
        s+=`<text x="52" y="${y-2}" class="t-lbl" style="opacity:${on?1:.45}">month ${e.m} · ${e.t}</text>`;
        s+=`<text x="52" y="${y+16}" class="t-xs" style="opacity:${on?1:.45}">${e.d.slice(0,58)}…</text>`});
    }else{
      const x0=60,x1=680,xm=m=>lerp(x0,x1,m/12);
      s+=`<line x1="${x0}" x2="${x1}" y1="120" y2="120" class="axis"/>`;
      for(let m=0;m<=12;m+=3)s+=`<text x="${f1(xm(m))}" y="146" class="t-xs t-mid">month ${m}</text>`;
      NU_MON.forEach((e,i)=>{const x=xm(e.m),on=T>=e.m,up=i%2===0;
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${up?80:120}" y2="${up?120:160}" style="stroke:var(--line);stroke-width:1.5"/>`;
        s+=`<circle cx="${f1(x)}" cy="120" r="8" style="fill:${on?'var(--sea)':'var(--panel-2)'};stroke:var(--sea);stroke-width:2"/>`;
        s+=`<text x="${f1(x)}" y="${up?70:180}" class="t-lbl t-mid" style="opacity:${on?1:.45}">${e.t}</text>`});
      s+=`<line x1="${f1(xm(Math.min(T,12)))}" x2="${f1(xm(Math.min(T,12)))}" y1="40" y2="200" style="stroke:var(--ink);stroke-width:1.5;opacity:.3"/>`;
    }
    mv.innerHTML=s;
    const reached=NU_MON.filter(e=>T>=e.m).slice(-1)[0]||NU_MON[0];
    $('#nuMonCap').innerHTML=`Month ${T.toFixed(0)} · <b>${reached.t}</b>. ${reached.d} ${reached.c}`;
  }
  playWire(mr,$('#nuMonPlay'),drawMon,9000,'Replay','nursing');
  $('#nuDocCards').innerHTML=`
   <div class="nu-card"><h5>The 2024 minimum outcome set</h5><ul><li>Recommendation 12, agreed by everyone on the panel: a minimum outcome set should include clinical disease activity, for example attack frequency per 3 months and physician assessment; patient experience, for example patient-reported outcome and experience measures; and biochemical markers, for example CRP and SAA.</li><li>Measures used in FMF studies: number of attacks per 3 months, attack site, quality of life, AIDAI, modified FMF50, physician global score, patient visual analogue score, CRP, SAA, SF-36, the Child Health Questionnaire and SF-12.</li><li>The panel recorded that no accepted definition of minimal disease activity existed, and that the existing tools lack the patient perspective.</li></ul><p class="stage-cap">[[Ozen2025]]</p></div>
   <div class="nu-card"><h5>Toxicity bloods, and a disagreement</h5><ul><li>Toxicity is assessed with complete blood counts and liver function tests, with dose reduction and investigation if liver enzymes exceed twice the upper limit of normal.</li><li>Creatine kinase is monitored carefully, with signs of toxicity, where renal function is reduced.</li><li>The panel recorded a real split: most paediatricians read a liver-enzyme rise as a colchicine effect in children subject to extra insults, while adult rheumatologists read it as inadequately controlled inflammation.</li><li>Children may show toxicity especially during viral infections, when raised enzymes or leukopenia may reflect the infection, concurrent NSAIDs and possibly antibiotics as well as the drug.</li></ul><p class="stage-cap">[[Ozen2025]]</p></div>
   <div class="nu-card"><h5>Amyloidosis follow-up</h5><ul><li>In AA amyloidosis the aim is complete and sustained control of biochemical inflammation measured by SAA, or a sensitive CRP where SAA is unavailable or costly.</li><li>Subclinical inflammation is monitored by SAA and proteinuria. A repeat biopsy for follow-up is not recommended.</li></ul><p class="stage-cap">[[Ozen2025]]</p></div>
   <div class="nu-card"><h5>Where the data goes</h5><ul><li>The Eurofever registry, hosted on the PRINTO website, collects baseline and cross-sectional clinical plus genetic data across the monogenic fevers and several related conditions. In its first 15 months it enrolled 1,360 patients from 64 centres in 28 countries, 376 of them with FMF.</li><li>The AIDA Network registry runs on REDCap with 3,769 fields in 23 instruments, across 110 centres in 23 countries.</li><li>A single registry across diseases was a deliberate choice, so manifestations can be compared and patients of uncertain classification included.</li></ul><p class="stage-cap">[[Toplak2011,DellaCasa2022]]</p></div>
   <div class="nu-card"><h5>Growth in children</h5><ul><li>Neither guideline version specifies an interval or method for growth monitoring, so this app does not state one.</li><li>What is published is reassurance about the outcome: in children treated over 10 years growth stayed within normal percentiles, and the patient-information source states that growth retardation is not a major problem.</li></ul><p class="stage-cap">[[BenChetrit2018Textbook,PRINTO2016]]</p></div>`;
  draw(+rg.value);drawMed();drawInj(0);drawMon(+mr.value);
};
