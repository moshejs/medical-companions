/* =============== 5.2 Nursing care =============== */
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');let st='clinic',setSt=()=>{};
  const SET={clinic:'Outpatient clinic',ward:'Hospital ward',community:'Community and home'};
  const LANES=[{n:'Assess',c:'var(--accent)'},{n:'Isolate',c:'var(--air)'},{n:'Sample',c:'var(--gold)'},{n:'Medicines',c:'var(--rx)'},{n:'Monitor',c:'var(--tb)'},{n:'Teach',c:'var(--brand)'},{n:'Hand over',c:'var(--vax)'}];
  const COLS=['Day 0','Days 1–3','Week 2','Month 1','Month 2','Months 3–6'];
  /* tasks: [short label, full wording with its source]; null = nothing in that lane at that point */
  const CLINIC=[
   [['symptoms, weight, mood',`Ask about cough, fever, night sweats and weight loss, and weigh. Screen for low mood: pooled depression prevalence in people with TB was 45%, and its symptoms overlap with TB's. [[Duko2020,Sweetland2017]]`],
    ['baseline bloods',`Rifampin label, adults: liver enzymes, bilirubin, creatinine, blood count and platelets. Isoniazid label: AST and ALT before starting from age 35. [[FDA-Rifampin,FDA-Isoniazid]]`],
    ['is it working?',`Look for a clinical response: less cough, no fever. CDC links reduced infectiousness to standard therapy with documented clinical improvement, usually with smear conversion over several weeks. [[Jensen2005]]`],
    ['monthly review',`Monitor and interview at least monthly, with specific questions about adverse reactions, as the isoniazid and rifampin labels state. [[FDA-Isoniazid,FDA-Rifampin]]`],
    ['weight, nutrition',`WHO (2025) recommends nutritional assessment and counselling for everyone with TB. In RATIONS, gaining 5% of body weight by 2 months went with a lower hazard of death (aHR 0.39). [[WHO-Mod6-2025,Bhargava2023LGH]]`],
    ['lung check at end',`Clinical standards: assess everyone for post-TB lung disease at the end of treatment and identify who needs pulmonary rehabilitation. [[Migliori2021PTLD]]`]],
   [['mask, fast-track',`Triage fast-tracks people with presumed TB and keeps their time in the facility short. They wear a surgical or procedure mask if possible, away from others. [[WHO-IPC2019,Jensen2005]]`],
    ['home, fresh air',`In 70 naturally ventilated rooms, opening windows and doors gave a median 28 air changes an hour, more than double the 12 of a negative-pressure room. Cough etiquette: cover with a mask, tissue or elbow, then hand hygiene. [[Escombe2007,WHO-IPC2019]]`],
    ['still infectious?',`Effective treatment cuts transmission fast, yet only 9% have a negative smear at 2 weeks: ending precautions follows the tests and the clinical response, not a fixed date. [[Dharmadhikari2014,Calderwood2021,Jensen2005]]`],null,null,null],
   [['coach the cough',`Explain how to cough up sputum, not saliva: simple instructions raised smear positivity in women 1.63-fold in a Pakistani trial. Collect away from others in a well-ventilated space; CDC places sputum induction in a ventilated booth or AII room. [[Khan2007Lancet,Jensen2005]]`],
    ['3 specimens',`Three specimens 8 to 24 hours apart, at least one early in the morning, because secretions pool overnight. For suspected TB this usually allows a decision in about 2 days. [[Jensen2005]]`],null,null,
    ['2-month sputum',`Pooled data: 82% smear-negative and 88% solid-culture-negative at 2 months. A positive 2-month culture predicts relapse poorly (sensitivity 40%). [[Calderwood2021,Horne2010]]`],null],
   [['start promptly',`Prompt effective treatment is one of WHO's two strong infection-control recommendations. For new pulmonary TB, WHO recommends 2HRZE/4HR, daily throughout (strong, high certainty). [[WHO-IPC2019,WHO-Mod4-2025]]`],
    ['DOT or VOT',`WHO suggests community- or home-based treatment support over facility-based or unsupported treatment, and says video-supported treatment can replace in-person support where it can be run well. [[WHO-Mod4-2025]]`],
    ['observe, record',`Record each dose. In Moldova, video-observed therapy cut unobserved days from 5.24 to 1.29 per 2 weeks. [[Ravenscroft2020]]`],
    ['act on missed doses',`Follow up missed doses: the response may matter more than the device. Smart pillboxes and labels alone did not improve outcomes in the ASCENT trials. [[Mohamed2025,Jerene2025]]`],
    ['to 2 drugs (4HR)',`The intensive phase ends at 2 months. WHO recommends against extending it just because the smear is still positive (strong, high certainty). [[WHO-Mod4-2025]]`],
    ['complete the course',`Treatment success for drug-susceptible TB was 88% worldwide in the 2023 cohort. [[WHO-GTR2025]]`]],
   [['baseline vision',`Ethambutol label: visual acuity of each eye and both together (Snellen chart) and colour discrimination before starting. [[FDA-Ethambutol]]`],
    ['who needs liver tests',`ATS lists people needing ALT monitoring: regular alcohol, liver disease or viral hepatitis, other liver-toxic drugs, previous isoniazid hepatitis, pregnancy or 3 months postpartum, and HIV; some experts add everyone over 35. [[Saukkonen2006]]`],null,
    ['vision, liver',`Vision monthly at ethambutol doses above 15 mg/kg/day. Isoniazid hepatitis usually occurs in the first 3 months. ATS: interrupt treatment if ALT is above 3 times normal with symptoms or jaundice, or above 5 times without. [[FDA-Ethambutol,FDA-Isoniazid,Saukkonen2006]]`],
    ['culture result',`Review the 2-month result. In Study 31, liquid culture conversion by 8 weeks was 63.4% on the 6-month control regimen. [[Dorman2021]]`],
    ['monthly to the end',`Keep the monthly review with questions about side effects to the end of treatment. [[FDA-Rifampin]]`]],
   [['TB is curable',`Health education and counselling for everyone on treatment (WHO, strong, moderate certainty). TB is caused by a germ in the air: nobody's fault, and curable. [[WHO-Mod4-2025]]`],
    ['orange fluids, coughs',`Rifampicin colours urine, sweat, sputum and tears and can stain soft lenses: say so before the first dose. Cover coughs, then wash hands. [[FDA-Rifampin,WHO-IPC2019]]`],
    ['how to take it',`Rifampin label: 1 hour before or 2 hours after a meal, with a full glass of water; no new medicines or herbs without advice. [[FDA-Rifampin]]`],
    ['alcohol, pill, eyes',`Avoid alcohol and liver-toxic drugs; hormonal contraception may be less reliable; report any change in vision at once. [[FDA-Rifampin,FDA-Ethambutol]]`],
    ['keep going',`Feeling well is not cure: the rifampin label asks staff to stress the full course and not missing doses. [[FDA-Rifampin]]`],
    ['after TB',`New symptoms after cure deserve a new check: recurrence was 2.26 per 100 person-years in pooled studies. Not smoking helps damaged lungs. [[Vega2021,Allwood2021]]`]],
   [['notify public health',`Report suspected or confirmed TB to the local public-health authority immediately, so treatment can be tracked to completion, DOT arranged and contacts evaluated. TB is a notifiable disease. [[Jensen2005]]`],
    ['list contacts',`The infectious period is set to start 3 months before diagnosis. Each contact's first face-to-face assessment should happen within 3 working days of being listed. [[NTCA2005]]`],
    ['contacts tested',`High-priority contacts (under 5, HIV, immunosuppressants) tested within 7 working days, medium-priority within 14; an induration of 5 mm or more is positive for any contact. [[NTCA2005]]`],
    ['case management',`Treatment is tracked to completion through case management with the public-health team. [[Jensen2005]]`],null,
    ['record the outcome',`Record the outcome and check contacts' follow-up: three-quarters of TB among close contacts appeared within 3 months of the index diagnosis. [[Reichler2018]]`]]];
  const cp=a=>a.map(r=>r.slice());
  const TASKS={clinic:CLINIC,ward:cp(CLINIC),community:cp(CLINIC)};
  const W=TASKS.ward,Cm=TASKS.community;
  W[0][0]=['triage, admit',`Triage on arrival, history and examination. Immunocompromised people with infectious TB, including people with HIV, should be physically separated from others, for their own sake and others'. [[Jensen2005]]`];
  W[1]=[['AIIR, sign on door',`Airborne infection isolation room: negative pressure of at least 0.01 inch water gauge (air flows from the corridor in), at least 12 air changes an hour (6 for rooms built before 2001), exhaust preferably outside, signage at the door. [[Jensen2005]]`],
    ['fit-tested N95',`Staff wear at least an N95 respirator within a respiratory protection programme: initial and periodic fit testing and annual training. Fit testing confirms the model and size and that it can be put on correctly. [[Jensen2005,WHO-IPC2019]]`],
    ['3 negative + 2 weeks + better',`In hospital, CDC keeps airborne precautions until all three: three consecutive negative smears (8–24 h apart, one early morning), at least 2 weeks of standard treatment, and clinical improvement. [[Jensen2005]]`],
    ['home before conversion?',`Discharge before smear conversion is possible with a TB-programme follow-up plan, DOT arranged, no children under 4 or immunocompromised people at home, all household members already exposed, and a willingness to stay home except for health-care visits. [[Jensen2005]]`],null,null];
  W[2][1]=['3 specimens or induction',`Three specimens 8 to 24 hours apart, one early morning. If none comes: ultrasonic nebuliser, at least 30 mL of 3% saline, up to 15 minutes, in a ventilated booth or AII room with the nurse in at least an N95. Consider a bronchodilator first in asthma or COPD and keep one at hand. Label the clear, watery result as expectorated sputum. [[Jensen2005]]`];
  W[2][2]=['smears for release',`Induction succeeded in 76.4% to 100% of attempts across 23 studies, with infrequent, mild adverse events. Nebulised salbutamol gave a similar yield with less bronchospasm in one trial (0% vs 11.3%). [[Hepple2012,Keeratichananont2015]]`];
  W[3][1]=['first doses observed',`First doses given and observed on the ward; prompt effective treatment cuts transmission. On an HIV-TB ward, 90% of transmission came from people with MDR-TB not yet on effective treatment. [[Escombe2008]]`];
  W[3][3]=['discharge with DOT',`CDC discharge planning: a specific follow-up plan with the local TB programme, treatment started and DOT arranged before discharge. [[Jensen2005]]`];
  W[6][3]=['discharge handover',`Hand over to the TB programme: follow-up appointment, DOT plan, household details and contact list. [[Jensen2005,NTCA2005]]`];
  Cm[0][0]=['home visit',`Assessment at home: symptoms, weight and food security. WHO recommends nutritional assessment and counselling for all people with TB and their household contacts. [[WHO-Mod6-2025]]`];
  Cm[1]=[['windows open, mask',`Open windows and doors: a median 28 air changes an hour in naturally ventilated rooms. Surgical masks worn by people with MDR-TB cut guinea-pig infection from 76.6% to 40%. [[Escombe2007,Dharmadhikari2012]]`],
    ['stay home for now',`CDC lists, for someone at home before smear conversion: no children under 4 or immunocompromised people in the home, all household members already exposed, and no travel outside except for health care. [[Jensen2005]]`],
    ['still infectious?',CLINIC[1][2][1]],null,null,null];
  Cm[3][1]=['home DOT or VOT',`WHO suggests support by trained lay providers or health workers over family members or no support, and community- or home-based support over facility-based. [[WHO-Mod4-2025]]`];
  Cm[3][3]=['nurse-led outreach',`A nurse-led community health worker programme reached 91.8% completion of weekly observed 3HP among adults experiencing homelessness, against a 65% clinic benchmark (single arm). [[Nyamathi2021]]`];
  Cm[6][2]=['household screened',`Contact investigation in randomised trials increased TB notification (RR 2.5) and cut mortality (RR 0.6). About half of household contacts in high-burden settings have TB infection and about 3% TB disease. [[Velen2021,Fox2013]]`];
  const STEPS=[
    {k:'Day 0 · first contact',t:'Triage and assess',
     txt:{clinic:`A person coughing for weeks arrives. Administrative controls come first in both the WHO and CDC hierarchy of TB infection control: find people with presumed TB fast, mask them, separate them and move them on. [[WHO-IPC2019,Jensen2005]]`,
       ward:`On admission, airborne precautions start as soon as TB is suspected. CDC says the remaining risk in health care comes mainly from people with unsuspected, undiagnosed TB. [[Jensen2005]]`,
       community:`At home, the nurse or community health worker assesses the person and the household together: who lives there, who is young, who is unwell. [[NTCA2005,WHO-Mod6-2025]]`},
     pt:`A mask and a short wait somewhere separate protect everyone in the room, including staff. They are not a judgement.`,
     hook:`Hierarchy of TB infection control: administrative, then environmental, then respiratory protection. Administrative controls matter most. [[WHO-IPC2019,Jensen2005]]`},
    {k:'Days 1–3',t:'Isolate and collect sputum',
     txt:{clinic:`WHO suggests community- or home-based treatment support over facility-based care. [[WHO-Mod4-2025]] Three sputum specimens are collected 8 to 24 hours apart, one early in the morning. [[Jensen2005]] Instructions improve yield; early-morning collection alone did not, across 23 studies. [[Datta2017LGH]]`,
       ward:`An airborne infection isolation room is under negative pressure (at least 0.01 inch water gauge) with at least 12 air changes an hour; staff wear fit-tested N95 respirators. Sputum induction happens in a ventilated booth or the AII room, with bronchodilators at hand. [[Jensen2005]]`,
       community:`At home, fresh air is the simplest control: opening windows and doors gave a median 28 air changes an hour. The person wears a mask around others while infectious. [[Escombe2007,Dharmadhikari2012]]`},
     pt:`Coughing up sputum from deep in the chest, not saliva, gives the test its best chance. The nurse can show you how.`,
     hook:`AII room: negative pressure ≥0.01 inch w.g. and ≥12 ACH (6 ACH for pre-2001 rooms). Three sputum specimens 8–24 h apart, one early morning. [[Jensen2005]]`},
    {k:'Week 2',t:'Is it working?',
     txt:{clinic:`Cough and fever should be easing. Most people are still culture-positive at 2 weeks (only 5% solid-culture-negative), which is why release from precautions follows the tests and clinical response. [[Calderwood2021,Jensen2005]]`,
       ward:`Inpatients stay under airborne precautions until three consecutive negative smears, at least 2 weeks of standard treatment and clinical improvement. Guinea-pig studies suggest effective treatment makes people non-infectious quickly, long before culture conversion. [[Jensen2005,Dharmadhikari2014]]`,
       community:`Daily observed doses continue at home or by video. In New York, electronic DOT was non-inferior to in-person DOT (89.8% vs 87.2% of doses completed). [[Burzynski2022]]`},
     pt:`You will often feel better within a few weeks. That is the medicine working, and the reason to keep going.`,
     hook:`Pooled: smear-negative 9% and solid-culture-negative 5% at 2 weeks. [[Calderwood2021]]`},
    {k:'Month 1',t:'Monitor and support',
     txt:{clinic:`A monthly visit with specific questions about side effects; vision checks on ethambutol; liver tests for people at risk. [[FDA-Rifampin,FDA-Ethambutol,Saukkonen2006]] This is also when life catches up: work, money, mood. Material and psychological support are part of WHO's adherence package. [[WHO-Mod4-2025]]`,
       ward:`Discharge planning: a follow-up plan with the local TB programme, treatment started and DOT arranged before the person leaves. [[Jensen2005]]`,
       community:`Nurse-led interventions in a scoping review covered health education, psychological support, breathing exercises, medication guidance, nutrition and discharge teaching, with better knowledge and adherence reported. <span class="ev early">Early evidence</span> [[Yulanda2026]]`},
     pt:`Tell your nurse about any new symptom, a change in your eyesight, or worries about money or mood. All of these can be helped.`,
     hook:`Ethambutol: visual acuity and colour testing, monthly above 15 mg/kg/day. Isoniazid hepatitis: mostly in the first 3 months. [[FDA-Ethambutol,FDA-Isoniazid]]`},
    {k:'Month 2',t:'End of the intensive phase',
     txt:{clinic:`A sputum sample at 2 months; pooled, 82% are smear-negative. Pyrazinamide and ethambutol stop and isoniazid and rifampicin continue for 4 months. [[Calderwood2021,WHO-Mod4-2025]]`,
       ward:`After discharge the same 2-month sputum and drug switch apply. CDC's conditions for going home before smear conversion included no children under 4 and no immunocompromised people in the household. [[Jensen2005,WHO-Mod4-2025]]`,
       community:`Weight is a simple marker: in RATIONS, 5% weight gain by 2 months went with a lower hazard of death, yet 54.8% were still underweight at 6 months. [[Bhargava2023LGH]]`},
     pt:`Halfway through the hardest part: fewer tablets from now on, but the course still has months to run.`,
     hook:`2HRZE/4HR: do not extend the intensive phase just because the 2-month smear is positive (WHO, strong). [[WHO-Mod4-2025]]`},
    {k:'Months 3–6',t:'Complete and hand over',
     txt:{clinic:`The public-health team tracks treatment to completion and evaluates contacts. Contact investigation is second only to treating people with TB disease in the US elimination strategy. [[Jensen2005,NTCA2005]] At the end, assess for post-TB lung disease. [[Migliori2021PTLD]]`,
       ward:`After discharge, care continues in the community with the TB programme. A health worker with infectious TB returns to work only after three negative samples, a probably effective treatment and a physician's judgement. [[Jensen2005]]`,
       community:`Completion is recorded and the household is followed up: among close contacts in the US and Canada, 51% of contact cases were diagnosed by 1 month and 92% by 12 months. [[Reichler2018]]`},
     pt:`Finishing the course is the cure. Afterwards, a lung check is worth asking for if breathing is still hard.`,
     hook:`Contacts: infectious period from 3 months before diagnosis; first assessment ≤3 working days; high priority tested ≤7 working days. [[NTCA2005]]`}];
  STEPS.forEach((s,i)=>{s.from=i/6;s.at=i/6+.07});
  const wrap=(txt,n)=>{const w=txt.split(' '),L=[''];w.forEach(x=>{const c=L[L.length-1];if(c&&(c+' '+x).length>n)L.push(x);else L[L.length-1]=c?c+' '+x:x});return L};
  /* ---------- scenes, drawn in a 360×150 box ---------- */
  const arr=(x1,y1,x2,y2,c='var(--muted)')=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:${c};stroke-width:1.6" marker-end="url(#nuAr)"/>`;
  const house=(x,y,w,h,win)=>`<path d="M${x} ${y+h*.35}L${x+w/2} ${y}L${x+w} ${y+h*.35}V${y+h}H${x}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`+(win?`<rect x="${x+w*.62}" y="${y+h*.48}" width="${w*.22}" height="${h*.24}" style="fill:var(--field);stroke:var(--muted)"/><path d="M${x+w*.84} ${y+h*.48}l${w*.1} ${-h*.08}v${h*.24}l${-w*.1} ${h*.08}" style="fill:var(--panel);stroke:var(--muted)"/>`:'');
  function scene(i,p){let s='';const fl=`<line x1="0" x2="360" y1="138" y2="138" style="stroke:var(--line);stroke-width:1.2"/>`;
    if(i===0){s+=fl;
      if(st==='community'){s+=house(14,52,120,86,true)+person(56,84,48,'var(--brand)',{mask:true,cough:true})+person(178,82,50,'var(--accent)',{n95:true,face:-1})+`<text x="74" y="46" class="t-xs t-mid">home visit</text>`;
        s+=`<text x="232" y="70" class="t-xs">assess the person</text><text x="232" y="83" class="t-xs">and the household:</text><text x="232" y="96" class="t-xs">children under 5,</text><text x="232" y="109" class="t-xs">HIV, food</text>`}
      else{[30,80,130].forEach(x=>s+=`<rect x="${x-16}" y="112" width="32" height="5" rx="2" style="fill:var(--line)"/><rect x="${x-14}" y="117" width="3" height="21" style="fill:var(--line)"/><rect x="${x+11}" y="117" width="3" height="21" style="fill:var(--line)"/>`);
        const px=lerp(80,250,ease(ramp(p,.35,1)));
        s+=person(30,80,40,'var(--fibro)',{op:.6})+person(130,80,40,'var(--fibro)',{op:.6})+person(px,78,44,'var(--brand)',{mask:p>.15,cough:true});
        if(p<=.15)s+=`<text x="80" y="62" class="t-xs t-mid">coughing for weeks</text>`;else s+=`<text x="${f1(px)}" y="64" class="t-xs t-mid" style="fill:var(--brand)">surgical mask</text>`;
        s+=`<rect x="276" y="44" width="70" height="94" rx="3" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="311" y="38" class="t-xs t-mid">${st==='ward'?'isolation':'separate room'}</text>`;
        s+=person(200,80,44,'var(--accent)',{n95:true,face:-1})+`<text x="200" y="150" class="t-xs t-mid" style="fill:var(--accent)">nurse: N95</text>`;
        s+=`<text x="160" y="20" class="t-sm t-mid" style="fill:var(--ink)">${st==='ward'?'admit straight to airborne precautions':'fast-track: mask, separate, move on'}</text>`}}
    if(i===1){s+=fl;
      if(st==='ward'){s+=`<rect x="10" y="30" width="170" height="108" style="fill:var(--air);fill-opacity:.08;stroke:var(--ink);stroke-width:1.6"/><rect x="10" y="98" width="4" height="40" style="fill:var(--panel)"/>`;
        s+=`<rect x="16" y="62" width="58" height="14" rx="2" style="fill:var(--bad)"/><text x="45" y="72" class="t-xs t-mid" style="fill:#fff;font-weight:700">AIRBORNE</text>`;
        const ph=p*3%1;[0,1,2].forEach(k=>{const x=-14+((ph+k/3)%1)*44;s+=`<circle cx="${f1(x)}" cy="128" r="2.2" style="fill:var(--air);opacity:${f1(bump((ph+k/3)%1,0,1))}"/>`});
        s+=arr(-18,118,26,118,'var(--air)')+arr(160,40,160,8,'var(--air)')+`<text x="140" y="12" class="t-xs t-end" style="fill:var(--air)">exhaust outside</text>`;
        s+=`<rect x="100" y="104" width="64" height="16" rx="3" style="fill:var(--panel-2);stroke:var(--muted)"/>`+person(132,72,36,'var(--brand)',{face:-1})+person(36,92,40,'var(--accent)',{n95:true});
        s+=`<text x="96" y="48" class="t-xs t-mid">−0.01 in. w.g. · ≥12 ACH</text>`}
      else{s+=house(10,40,170,98,false)+`<rect x="120" y="78" width="40" height="32" style="fill:var(--field);stroke:var(--muted)"/>`;
        const ph=p*3%1;[0,1,2].forEach(k=>{const u=(ph+k/3)%1;s+=`<path d="M${f1(196-u*60)} ${88+k*8}h-12" style="stroke:var(--air);stroke-width:1.6;opacity:${f1(bump(u,0,1))}" marker-end="url(#nuAr)"/>`});
        s+=person(70,90,44,'var(--brand)',{mask:true})+`<text x="95" y="30" class="t-xs t-mid">${st==='community'?'home: windows open':'home: fresh air'}</text><text x="95" y="150" class="t-xs t-mid" style="fill:var(--air)">median 28 ACH, windows open</text>`}
      /* three sputum cups, 8–24 h apart */
      [0,1,2].forEach(k=>{const x=230+k*52,f=clamp(p*3.2-k);s+=sputum(x,104,1,{fill:f*.7,label:String(k+1)});
        if(k)s+=`<path d="M${x-44} 70Q${x-26} 58 ${x-8} 70" style="fill:none;stroke:var(--muted);stroke-width:1" marker-end="url(#nuAr)"/><text x="${x-26}" y="56" class="t-xs t-mid">8–24 h</text>`});
      s+=`<circle cx="226" cy="24" r="5" style="fill:var(--gold)"/><text x="236" y="27" class="t-xs">one early in the morning</text><text x="282" y="150" class="t-xs t-mid" style="fill:var(--gold)">${st==='ward'?'deep cough or induction':'coach the deep cough'}</text>`}
    if(i===2){s+=fl+person(40,78,52,'var(--brand)',{face:1});
      s+=`<rect x="70" y="80" width="26" height="42" rx="4" style="fill:var(--ink)"/><rect x="73" y="85" width="20" height="30" style="fill:var(--panel)"/>`+person(83,90,18,'var(--accent)',{});
      s+=`<text x="60" y="30" class="t-xs t-mid">${st==='ward'?'dose observed on the ward':'video or in-person DOT'}</text>`;
      s+=blister(130,82,7,2,Math.round(14*clamp(p*1.15)),{s:16,col:'var(--dR)'})+`<text x="132" y="74" class="t-xs">14 days of doses</text>`;
      const v=Math.round(9*clamp(p*1.2));s+=`<text x="300" y="56" class="t-big t-mid" style="fill:var(--accent)">${v}%</text><text x="300" y="72" class="t-xs t-mid">smear-negative</text><text x="300" y="84" class="t-xs t-mid">at 2 weeks</text><text x="300" y="96" class="t-xs t-mid">(pooled)</text>`}
    if(i===3){const tiles=[['liver tests','tube'],['vision','eye'],['weight','scale'],['side effects?','talk']];
      tiles.forEach(([n,g],k)=>{const x=12+k*88,on=p*4.4>k;s+=`<rect x="${x}" y="30" width="76" height="92" rx="8" style="fill:${on?'var(--tb-soft)':'var(--panel-2)'};stroke:${on?'var(--tb)':'var(--line)'};stroke-width:1.3"/><text x="${x+38}" y="114" class="t-xs t-mid" style="fill:var(--ink)">${n}</text>`;
        const cx=x+38,cy=68;
        if(g==='tube')s+=`<rect x="${cx-6}" y="${cy-24}" width="12" height="44" rx="6" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${cx-6}" y="${cy-2}" width="12" height="22" rx="5" style="fill:var(--blood);opacity:.8"/>`;
        if(g==='eye')s+=`<text x="${cx}" y="${cy-8}" class="t-big t-mid">E</text><text x="${cx}" y="${cy+8}" class="t-sm t-mid" style="fill:var(--ink)">F P</text><text x="${cx}" y="${cy+20}" class="t-xs t-mid" style="fill:var(--ink)">T O Z</text>`;
        if(g==='scale')s+=`<rect x="${cx-22}" y="${cy+4}" width="44" height="14" rx="4" style="fill:var(--panel);stroke:var(--muted)"/><path d="M${cx-14} ${cy+4}A14 14 0 0 1 ${cx+14} ${cy+4}" style="fill:none;stroke:var(--muted)"/><line x1="${cx}" y1="${cy+4}" x2="${cx+8}" y2="${cy-6}" style="stroke:var(--tb);stroke-width:1.6"/>`;
        if(g==='talk')s+=`<path d="M${cx-24} ${cy-22}h48a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-30l-10 10v-10h-8a6 6 0 0 1-6-6v-20a6 6 0 0 1 6-6z" style="fill:var(--panel);stroke:var(--muted)"/><text x="${cx}" y="${cy-9}" class="t-xs t-mid" style="fill:var(--ink)">eyes?</text><text x="${cx}" y="${cy+2}" class="t-xs t-mid" style="fill:var(--ink)">skin?</text>`});
      s+=`<text x="180" y="18" class="t-sm t-mid" style="fill:var(--ink)">monthly review, as the labels state</text><text x="180" y="146" class="t-xs t-mid">${st==='ward'?'and a discharge plan with the TB programme':'plus mood, money and food'}</text>`}
    if(i===4){const dr=[['var(--dH)','H'],['var(--dR)','R'],['var(--dZ)','Z'],['var(--dE)','E']],k=ease(ramp(p,.2,.8));
      dr.forEach(([c,l],j)=>{const gone=j>1;s+=pill(30+j*36,70,28,c,{label:l,op:gone?1-k:1,ang:0})});
      s+=`<text x="84" y="40" class="t-xs t-mid">${k<.5?'2HRZE: four drugs':'4HR: two drugs'}</text>`+arr(30,100,150,100);
      s+=`<text x="90" y="118" class="t-xs t-mid">intensive → continuation</text>`;
      s+=sputum(214,84,1,{fill:.4,label:'2 mo'});
      const a=82*clamp(p*1.2),b=88*clamp(p*1.2);
      s+=`<text x="252" y="56" class="t-xs">smear −</text><rect x="252" y="60" width="${f1(a)}" height="9" rx="3" style="fill:var(--accent)"/><text x="${f1(256+a)}" y="68" class="t-xs">${Math.round(a)}%</text>`;
      s+=`<text x="252" y="88" class="t-xs">culture −</text><rect x="252" y="92" width="${f1(b*.9)}" height="9" rx="3" style="fill:var(--rx)"/><text x="${f1(256+b*.9)}" y="100" class="t-xs">${Math.round(b)}%</text><text x="252" y="120" class="t-xs">pooled, at 2 months</text>`}
    if(i===5){s+=fl;
      s+=`<rect x="10" y="66" width="70" height="72" style="fill:var(--panel-2);stroke:var(--muted)"/><path d="M45 78v20M35 88h20" style="stroke:var(--bad);stroke-width:4"/><text x="45" y="58" class="t-xs t-mid">${st==='ward'?'ward':st==='community'?'TB nurse':'clinic'}</text>`;
      s+=`<rect x="130" y="56" width="80" height="82" style="fill:var(--panel-2);stroke:var(--muted)"/><path d="M140 56V30l20 6-20 6" style="fill:var(--vax);stroke:var(--vax)"/><text x="170" y="104" class="t-xs t-mid">public</text><text x="170" y="116" class="t-xs t-mid">health</text>`;
      const a=ramp(p,0,.3),b=ramp(p,.3,.6);
      if(a>0)s+=arr(84,96,84+42*a,96,'var(--vax)');if(a>.9)s+=`<text x="105" y="88" class="t-xs t-mid" style="fill:var(--vax)">notify</text>`;
      if(b>0)s+=arr(214,96,214+30*b,96,'var(--vax)');
      [0,1,2].forEach(k=>{const x=266+k*32,on=p>.6+k*.1;s+=person(x,86,40,on?'var(--good)':'var(--fibro)',{op:on?1:.5});if(on)s+=`<path d="M${x-6} 76l4 4l8-8" style="fill:none;stroke:var(--good);stroke-width:2"/>`});
      s+=`<text x="298" y="150" class="t-xs t-mid" style="fill:var(--vax)">contacts seen ≤3 working days</text>`}
    return s}
  const FACTS=[
    {clinic:['Mask the person, separate them, fast-track','Administrative controls first (WHO, CDC)','Weigh; ask about mood, alcohol, smoking','Notify public health the same day'],
     ward:['Suspect TB → airborne precautions at once','Separate people with HIV or immunosuppression','Baseline bloods and vision before drugs','Notify public health immediately'],
     community:['Assess the person and the household','Who is under 5, has HIV, is unwell?','Nutrition for person and contacts (WHO 2025)','Link to the TB programme and notify']},
    {clinic:['3 sputum specimens, 8–24 h apart','At least one early in the morning','Instructions raise yield (women: ×1.63)','Home, fresh air, mask with others'],
     ward:['AIIR: ≥0.01 inch w.g., ≥12 ACH','Fit-tested N95 (or higher) for staff','Induction: 3% saline, booth or AIIR','Bronchodilator ready for bronchospasm'],
     community:['Windows open: median 28 ACH','Patient mask cut transmission 56%','No travel except health-care visits','3 sputum specimens, one early morning']},
    {clinic:['Smear-negative: 9% at 2 weeks (pooled)','Most still culture-positive at 2 weeks','Infectiousness falls fast on effective drugs','Release follows tests, not the calendar'],
     ward:['Release: 3 negative smears','+ at least 2 weeks of standard drugs','+ clinical improvement (CDC)','Then plan discharge with the programme'],
     community:['Daily observed doses, home or video','eDOT non-inferior: 89.8% vs 87.2%','Video DOT: unobserved days 5.24 → 1.29','Respond to every missed dose']},
    {clinic:['Monthly review with side-effect questions','Vision monthly if ethambutol >15 mg/kg','ALT if at risk; INH hepatitis early','Ask about money, food and mood'],
     ward:['Discharge: TB-programme follow-up plan','Treatment started, DOT arranged','Home: no child <4, no immunocompromised','All household members already exposed'],
     community:['Nurse-led care: education, nutrition','Psychological support, breathing exercises','Medication guidance, discharge teaching','Better knowledge and adherence (early)']},
    {clinic:['2-month sputum: 82% smear-negative','Solid culture: 88% negative (pooled)','2HRZE → 4HR: Z and E stop','Do not extend the intensive phase'],
     ward:['Care continues with the TB programme','Home rules: no child <4, no immunocompromised','Same 2-month sputum and drug switch','Keep the monthly review'],
     community:['Weight: +5% by 2 months, lower risk','54.8% still underweight at 6 months','Food support, if food-insecure','Same 2-month sputum and drug switch']},
    {clinic:['Treatment tracked to completion','Contacts: first seen ≤3 working days','High priority tested ≤7 working days','End: assess for post-TB lung disease'],
     ward:['Care continues with the TB programme','Health worker return: 3 negative samples','+ effective treatment + physician review','Outcome recorded by the programme'],
     community:['Completion recorded','Contact cases: 51% by 1 month','75% by 3 months, 92% by 12 months','Lung check if breathing is still hard']}];
  function draw(t){
    const N=vb(svg,'720 500','400 618'),c=t*6,idx=Math.min(5,Math.floor(c)),p=clamp(c-idx);let s=`<defs>${marker('nuAr','var(--muted)')}</defs>`;
    /* scene and facts */
    const SX=N?20:10,SY=N?14:24;
    s+=`<g transform="translate(${SX} ${SY})">${scene(idx,p)}</g>`;
    const F=FACTS[idx][st],fx=N?20:400,fy=N?186:44;
    s+=`<text x="${fx}" y="${fy-(N?2:0)}" class="t-sm" style="fill:var(--brand)">${COLS[idx].toUpperCase()} · ${SET[st].toUpperCase()}</text>`;
    F.forEach((l,j)=>{const on=p*5>j||idx<5&&t>=1;s+=`<circle cx="${fx+4}" cy="${fy+18+j*(N?15:24)-4}" r="3" style="fill:${on?'var(--brand)':'var(--line)'}"/><text x="${fx+14}" y="${fy+18+j*(N?15:24)}" class="t-lbl" style="font-size:${N?12:13}px;opacity:${on?1:.45}">${l}</text>`});
    /* lanes */
    const lx=N?8:12,cx0=N?82:122,cx1=N?394:710,hy=N?268:206,y0=hy+10,lh=N?44:37;
    let wts=COLS.map((_,i)=>N?1+4.2*clamp(1-Math.abs(c-(i+.5))):1);const tw=wts.reduce((a,b)=>a+b,0);
    const xs=[cx0];wts.forEach(w=>xs.push(xs[xs.length-1]+(cx1-cx0)*w/tw));
    COLS.forEach((n,i)=>{const w=xs[i+1]-xs[i],lab=N&&w<70?(i+1)+'':n;s+=`<text x="${f1((xs[i]+xs[i+1])/2)}" y="${hy}" class="t-xs t-mid" style="fill:${i===idx?'var(--ink)':'var(--muted)'};font-weight:${i===idx?700:500}">${lab}</text>`;
      if(i)s+=`<line x1="${f1(xs[i])}" x2="${f1(xs[i])}" y1="${hy+4}" y2="${y0+7*lh}" class="grid"/>`});
    LANES.forEach((L,r)=>{const y=y0+r*lh;
      s+=`<text x="${lx}" y="${y+lh/2+4}" class="t-sm" style="fill:${L.c};font-weight:700">${L.n}</text>`;
      s+=`<line x1="${cx0}" x2="${cx1}" y1="${y+lh/2}" y2="${y+lh/2}" style="stroke:${L.c};stroke-width:1;opacity:.25"/>`;
      TASKS[st][r].forEach((T,i)=>{if(!T)return;const x=xs[i]+3,w=xs[i+1]-xs[i]-6,h=lh-8,yy=y+4,state=i<idx?2:i===idx?1:0;
        const fill=state===2?`fill:${L.c};fill-opacity:.18`:state===1?`fill:${L.c};fill-opacity:${f1(.12+.2*p)}`:'fill:none';
        s+=`<rect x="${f1(x)}" y="${yy}" width="${f1(w)}" height="${h}" rx="6" style="${fill};stroke:${L.c};stroke-width:${state===1?1.8:1};${state?'':'stroke-dasharray:3 3;opacity:.5'}"/>`;
        const n=Math.floor((w-8)/5.7),lines=wrap(T[0],n);
        if(n>=6&&lines.length<=2&&lines.every(l=>l.length<=n))lines.forEach((l,j)=>s+=`<text x="${f1(x+5)}" y="${f1(yy+h/2+(lines.length===1?3.5:j?9:-2))}" class="t-xs" style="fill:${state?'var(--ink)':'var(--muted)'}">${l}</text>`);
        else s+=state===2?`<path d="M${f1(x+w/2-4)} ${yy+h/2}l3 3l6-6" style="fill:none;stroke:${L.c};stroke-width:1.8"/>`:`<circle cx="${f1(x+w/2)}" cy="${yy+h/2}" r="2.5" style="fill:${L.c};opacity:${state?1:.5}"/>`})});
    const ph=xs[idx]+(xs[idx+1]-xs[idx])*p;
    s+=`<line x1="${f1(ph)}" x2="${f1(ph)}" y1="${hy+4}" y2="${y0+7*lh}" style="stroke:var(--ink);stroke-width:1.4;opacity:.45"/>`;
    s+=`<text x="${cx1}" y="${y0+7*lh+16}" class="t-xs t-end" style="fill:var(--warn)">SCHEMATIC · drug-susceptible pulmonary TB</text>`;
    svg.innerHTML=s;
    const ph2=phaseOf(STEPS,t);setSt(ph2);const S=STEPS[ph2];
    $('#nuNote').innerHTML=noteHTML({k:S.k+' · '+SET[st],t:S.t,txt:S.txt[st],pt:S.pt,hook:S.hook});
    $('#nuNowK').textContent=`${COLS[idx]} · ${SET[st]}: every lane, in full`;
    $('#nuNow').innerHTML=TASKS[st].map((row,r)=>row[idx]?`<li style="border-left-color:${LANES[r].c}"><b>${LANES[r].n}</b>${row[idx][1]}</li>`:'').join('');
  }
  const stop=playWire(rg,$('#nuPlay'),draw,30000,'Replay','nursing');
  setSt=stepWire($('#nuSteps'),STEPS,rg,draw,stop);
  $$('[data-ns]').forEach(b=>b.addEventListener('click',()=>{st=b.dataset.ns;$$('[data-ns]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- care-plan builder ---------- */
  const PLAN={
   new:{tl:[['day 0','mask, start, notify',0],['days 1–2','3 sputum, 8–24 h apart',.13],['≤3 working days','contacts first seen',.27],['≥2 weeks','review precautions',.42],['month 2','sputum; 4HR starts',.66],['month 6','complete; lung check',.97]],
    cap:`Timings as published by CDC and NTCA/CDC; the 2HRZE/4HR schedule as WHO recommends it. [[Jensen2005,NTCA2005,WHO-Mod4-2025]]`,
    A:[`Symptoms, weight and nutritional status; screen for depression, alcohol and tobacco use. [[WHO-Mod6-2025,Duko2020,Ragan2020]]`,
      `Baseline liver enzymes, bilirubin, creatinine, blood count and platelets; AST/ALT from age 35. [[FDA-Rifampin,FDA-Isoniazid]]`,
      `Visual acuity (each eye, Snellen) and colour discrimination before ethambutol. [[FDA-Ethambutol]]`,
      `Signs of infectiousness: cough, cavity on X-ray, positive smear, lung or laryngeal disease, not covering coughs. [[Jensen2005]]`,
      `Offer a pregnancy test and family-planning referral, free and without judgement. [[Maugans2023]]`],
    I:[`Surgical mask and a separate area while waiting; fast-track through the clinic. [[WHO-IPC2019,Jensen2005]]`,
      `Three sputum specimens 8–24 h apart, one early morning, after coaching on how to cough up sputum. [[Jensen2005,Khan2007Lancet]]`,
      `Start effective treatment promptly; arrange home- or community-based DOT or video-supported treatment. [[WHO-IPC2019,WHO-Mod4-2025]]`,
      `Offer the adherence package: education, material support (food, transport), psychological support. [[WHO-Mod4-2025]]`,
      `Report to public health and list contacts for a first assessment within 3 working days. [[Jensen2005,NTCA2005]]`],
    T:[`TB is curable and nobody's fault; a mask and fresh air protect others while infectious. [[WHO-IPC2019,Escombe2007]]`,
      `Orange body fluids are expected; rifampicin 1 h before or 2 h after food; full course, no missed doses. [[FDA-Rifampin]]`,
      `Avoid alcohol; hormonal contraception may be less reliable; report any vision change at once. [[FDA-Rifampin,FDA-Ethambutol]]`,
      `When isolation can end: by tests and clinical response, decided with the team. [[Jensen2005]]`],
    D:[`Notification to the public-health authority, with the date. [[Jensen2005]]`,
      `Specimen times (8–24 h apart; which was early morning) and results. [[Jensen2005]]`,
      `Baseline labs, vision and weight; each dose observed or missed. [[FDA-Rifampin,FDA-Ethambutol,Ravenscroft2020]]`,
      `Contact list and the infectious period (from 3 months before diagnosis). [[NTCA2005]]`,
      `Education given, in the person's own language, with an interpreter if needed. [[NTCA2005,WHO-Mod4-2025]]`]},
   child:{tl:[['day 0','listed as a contact',0],['≤3 working days','first assessment',.2],['≤7 working days','infection test',.38],['disease excluded','window prophylaxis',.56],['8–10 weeks','repeat test',.78],['end','completion recorded',.97]],
    cap:`NTCA/CDC contact-investigation timings for a high-priority contact under 5. [[NTCA2005]] Preventive regimens: see Treating TB infection.`,
    A:[`High-priority contact: under 5. First face-to-face assessment within 3 working days of being listed. [[NTCA2005]]`,
      `TB disease must be excluded before window prophylaxis starts. [[NTCA2005]]`,
      `Infection test within 7 working days; 5 mm or more is positive for any contact. A TST is suggested over an IGRA for healthy children under 5. [[NTCA2005,Lewinsohn2017]]`,
      `Exposure: sharing a bedroom with the index person and age 5 or under raised TB risk among contacts. [[Reichler2020Risk]]`],
    I:[`Window prophylaxis if the first test is negative and the last exposure was under 8 weeks ago, once disease is excluded. [[NTCA2005]]`,
      `Repeat the test at 8 to 10 weeks to decide whether to stop or complete treatment. [[NTCA2005]]`,
      `Family-centred, integrated care for the child and household (WHO, conditional). [[WHO-Mod4-2025]]`,
      `Food assistance for household contacts in food-insecure settings: RATIONS cut TB in contacts by 39–48%. [[WHO-Mod6-2025,Bhargava2023Lancet]]`],
    T:[`Why it matters: untreated under-5s with a positive test had a 19% two-year TB incidence; preventive therapy was 91% effective. [[Martinez2020Lancet]]`,
      `Finishing counts: TB developed in 9.8% of contacts who never started treatment for TB infection, 1.8% with partial and 0.2% with complete treatment. [[Reichler2020Risk]]`,
      `Come back early with any illness: 83% of under-5s who developed TB were diagnosed within 90 days of the first visit. [[Martinez2020Lancet]]`],
    D:[`Dates: listed, first seen (≤3 working days), tested (≤7 working days). [[NTCA2005]]`,
      `Test type and result in mm. [[NTCA2005]]`,
      `Date of last exposure and the date of the 8–10-week repeat test. [[NTCA2005]]`,
      `Doses taken and completion. [[Reichler2020Risk]]`]},
   bpalm:{tl:[['baseline','ECG, bloods, vision',0],['weekly','blood count',.1],['week 2','ECG',.24],['week 12','ECG',.52],['week 24','ECG',.82],['6 months','end of BPaLM',.97]],
    cap:`ECG schedule from ATS/CDC/ERS/IDSA 2025 (monthly when moxifloxacin is added); weekly blood counts from the linezolid label. [[Saukkonen2025,FDA-Zyvox]]`,
    A:[`Eligibility as WHO publishes it: 14 years or older; pulmonary or most extrapulmonary TB; under 1 month of prior bedaquiline, linezolid, pretomanid or delamanid; not in pregnancy or breastfeeding. [[WHO-Mod4-2025]]`,
      `ECG before starting; potassium, calcium and magnesium when QTc is prolonged. [[WHO-Mod4-2025]]`,
      `Liver tests and a complete blood count; vision and a neuropathy check. [[WHO-Mod4-2025,FDA-Pretomanid]]`,
      `Pregnancy test and contraception, since BPaLM is not recommended in pregnancy. [[WHO-Mod4-2025,Maugans2023]]`,
      `Mood, food and money: 82% of households affected by drug-resistant TB faced catastrophic costs. [[WHO-GTR2025]]`],
    I:[`Bedaquiline is taken with food and given by DOT, as the label states. [[FDA-Sirturo]]`,
      `Linezolid 600 mg once daily in BPaLM (WHO), reduced to 300 mg or interrupted for toxicity. [[WHO-Mod4-2025,FDA-Pretomanid]]`,
      `Ambulatory, decentralised care rather than hospital where possible (WHO, conditional). [[WHO-Mod4-2025]]`,
      `Nurse-led palliative care (symptom control, psychosocial support) improved patient-reported outcomes in MDR-TB in Uganda. [[Buyinza2025]]`],
    T:[`Report tingling, numbness, blurred vision or colour change at once: these are linezolid's toxicities, and dose changes help. [[FDA-Zyvox,Conradie2022]]`,
      `Why the ECGs: QTc prolongation is bedaquiline's boxed warning. [[FDA-Sirturo]]`,
      `Tendon pain on moxifloxacin should be reported. [[FDA-Moxifloxacin]]`,
      `It works: unfavourable outcomes were 11% on BPaLM against 48% on standard care in TB-PRACTECAL. [[Nyangwa2022]]`],
    D:[`ECG and QTc at baseline and weeks 2, 12 and 24; monthly with moxifloxacin. [[Saukkonen2025]]`,
      `Weekly blood counts. [[FDA-Zyvox]]`,
      `Neuropathy and vision checks; any linezolid dose change and the reason. [[FDA-Pretomanid]]`,
      `Each dose observed; household contacts listed. [[FDA-Sirturo,NTCA2005]]`]}};
  const HEAD={A:'Assessments',I:'Interventions',T:'Teaching points',D:'Documentation'},HC={A:'var(--accent)',I:'var(--rx)',T:'var(--brand)',D:'var(--vax)'};
  const ps=$('#nuPlanSvg'),sel=$('#nuScen');
  function drawTL(){const P=PLAN[sel.value],N=NARROW(),n=P.tl.length;let s='';
    if(N){ps.setAttribute('viewBox',`0 0 300 ${30+n*40}`);s+=`<line x1="40" x2="40" y1="20" y2="${20+(n-1)*40}" style="stroke:var(--brand);stroke-width:2"/>`;
      P.tl.forEach(([a,l],i)=>{const y=20+i*40;s+=`<circle cx="40" cy="${y}" r="6" style="fill:var(--panel);stroke:var(--brand);stroke-width:2"/><text x="56" y="${y-2}" class="t-lbl">${a}</text><text x="56" y="${y+12}" class="t-xs">${l}</text>`})}
    else{ps.setAttribute('viewBox','0 0 720 150');const X=f=>lerp(80,640,f);s+=`<line x1="${X(0)}" x2="${X(1)}" y1="75" y2="75" style="stroke:var(--brand);stroke-width:2"/>`;
      P.tl.forEach(([a,l,f],i)=>{const x=X(f),up=i%2===0;s+=`<circle cx="${f1(x)}" cy="75" r="6" style="fill:var(--panel);stroke:var(--brand);stroke-width:2"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${up?69:81}" y2="${up?50:100}" style="stroke:var(--line)"/>`;
        s+=`<text x="${f1(x)}" y="${up?28:116}" class="t-lbl t-mid">${a}</text><text x="${f1(x)}" y="${up?42:130}" class="t-xs t-mid">${l}</text>`})}
    ps.innerHTML=s}
  function renderPlan(){const P=PLAN[sel.value];
    $('#nuPlan').innerHTML=['A','I','T','D'].map(k=>`<div class="card" style="border-top:3px solid ${HC[k]}"><h4>${HEAD[k]}</h4><ul>${P[k].map((x,i)=>`<li><label><input type="checkbox" data-np="${k}${i}"><span>${x}</span></label></li>`).join('')}</ul></div>`).join('');
    $('#nuPlanCap').innerHTML=P.cap;drawTL();count()}
  function count(){const b=$$('#nuPlan input'),d=b.filter(x=>x.checked).length;$('#nuPlanRead').innerHTML=`<span>items done <b>${d} of ${b.length}</b></span><span>${d===b.length?'<b>plan complete</b>: hand over and document':'tick items as you go'}</span>`}
  $('#nuPlan').addEventListener('change',count);
  sel.addEventListener('change',renderPlan);
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawTL()};
  renderPlan();
};
