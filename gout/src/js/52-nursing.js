/* =============== 5.2 nursing care =============== */
const nuWrap=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
const NU_SITES={
 joint:{n:'The joint',
  what:'A self-report flare definition needs at least 3 of 4 items: the person says it is a flare, pain at rest above 3 on a 0–10 scale, at least one swollen joint, and at least one warm joint. In 509 patients at 17 sites it was 85% sensitive and 95% specific. Maximal pain within 24 hours and resolution within 14 days are both features scored by the 2015 classification criteria. [[Gaffo2018,Neogi2015]]',
  hook:'A flare is <b>3 of 4</b>: says it is a flare, pain at rest above 3/10, a swollen joint, a warm joint. [[Gaffo2018]]',
  pt:'Ask the person, then look and feel: is the joint swollen, is it warm, and how bad is the pain when they are still?'},
 pain:{n:'Pain & function',
  what:'For acute gout, OMERACT 9 named five core domains: pain, joint swelling, joint tenderness, patient global assessment and activity limitation. Pain on a 0–4 Likert scale, a 0–10 numeric rating scale or a 0–100 mm visual analogue scale, and swelling and tenderness on a 4-point Likert scale, all meet the OMERACT filter. The HAQ discriminated within groups but not between them. [[Schumacher2009,Taylor2014]]',
  hook:'Flares are 2.36 times as likely overnight as in the daytime, in 724 people with 1,433 flares, so the worst pain is often reported from the night before. [[Choi2015]]'},
 tophi:{n:'Tophi',
  what:'Vernier caliper measurement of the longest diameter differed by a mean of 0.45 mm between observers and correlated with CT volume (r = 0.91). A systematic review of 8 tophus methods found that calipers and ultrasound met most of the OMERACT filter. The nurse-led trial recorded tophus number, sites and the largest diameter by caliper. [[Dalbeth2007,Dalbeth2011ARD,Doherty2018]]',
  hook:'In the nurse-led arm the largest tophus shrank from 16.89 mm to 3.29 mm over 2 years, against 20.09 to 13.61 mm in usual care. [[Doherty2018]]',
  pt:'A tophus is a lump of urate crystals under the skin. Measuring its widest point each visit shows whether treatment is dissolving it.'},
 urate:{n:'Serum urate',
  what:'A normal serum urate does not rule out a flare. In 339 people with acute gout, 14% had a serum urate at or below 6 mg/dL (360 µmol/L) and 32% at or below 8 mg/dL (476 µmol/L). [[Schlesinger2009]]',
  hook:'A low urate during a flare is not evidence against gout: <b>14%</b> were at or below 6 mg/dL. [[Schlesinger2009]]',
  pt:'The blood urate can dip during a flare, so one normal result does not mean it is not gout.'},
 screen:{n:'Medicine screen',
  what:'In pharmacokinetic studies, strong CYP3A4 or P-glycoprotein inhibitors other than azithromycin raised colchicine peak level and exposure by more than 125%, and the recommended dose cuts were 33–66% for flare treatment and 50–75% for prophylaxis. Febuxostat is contraindicated with azathioprine or mercaptopurine, and with allopurinol their doses must be reduced. [[Terkeltaub2011,FDA-Uloric,FDA-Allopurinol]]',
  hook:'Strong CYP3A4 or P-gp inhibitors <b>more than double</b> colchicine exposure; azathioprine is a contraindication for febuxostat. [[Terkeltaub2011,FDA-Uloric]]'},
 hosp:{n:'In hospital',
  what:'In a population cohort of 429 people with gout, the flare rate rose about tenfold during a hospital stay (RR 10.2, 95% CI 6.8–14.5), and an in-hospital flare lengthened the stay by 1.8 days. After surgery, 31 of 70 people with known gout flared, a mean 3.7 days after the operation, and only 13% of those flares involved the first MTP joint. [[Zleik2018,Jeong2019]]',
  hook:'Post-operative gout often presents as <b>fever</b>: in one surgical series almost all flares were febrile, and many had tests for unexplained fever before gout was recognised. [[Craig1995]]'}
};
const NU_FLAGS=[
 {t:'Could the joint be infected?',d:'Septic and gouty arthritis can coexist. In 30 such cases one-third were afebrile, 30% had a normal blood white count, and 10% had a synovial fluid white count below 6000/mm³. Ruptured or infected tophi were the commonest route, and the authors advise culturing aspirated fluid in a flare. [[Yu2003]]'},
 {t:'Diarrhoea or vomiting on colchicine',d:'Acute colchicine toxicity typically begins within 24 hours with abdominal pain, nausea, vomiting and diarrhoea, and multi-organ failure follows at 24–72 hours. In the flare trial, gut reactions occurred in 26% at the recommended 1.8 mg over an hour against 77% at the old high dose. [[FDA-Colcrys]]'},
 {t:'Any rash on allopurinol',d:'The label says to stop allopurinol at the first appearance of skin rash or other signs of hypersensitivity, and to tell the patient to stop and seek care promptly. Serious reactions occur in about 5 per 10,000. Thiazides, ampicillin or amoxicillin, and kidney impairment add to the rash risk. [[FDA-Allopurinol]]'},
 {t:'Urate rising on pegloticase',d:'A urate above 6 mg/dL before an infusion, particularly on 2 consecutive checks, is the label\'s signal to stop, because loss of response carries a higher risk of anaphylaxis and infusion reactions. [[FDA-Krystexxa]]'},
 {t:'A flare that does not settle',d:'Maximal pain within 24 hours and resolution within 14 days are the expected pattern; a course outside it is a reason to look again at the diagnosis. [[Neogi2015]] <a href="#ddx" data-go="ddx">The differential</a>'}
];
const NU_TOOLS=[
 {n:'Flare definition',s:'Validated',b:['3 of 4: the person says it is a flare; pain at rest above 3 on 0–10; at least one swollen joint; at least one warm joint.','85% sensitive, 95% specific, accuracy 92%, in 509 patients at 17 sites.'],c:'[[Gaffo2018]]'},
 {n:'Pain scales',s:'OMERACT filter',b:['0–4 Likert, 0–10 numeric rating or 0–100 mm visual analogue scale all pass for acute gout.','Swelling and tenderness on a 4-point Likert scale pass too.'],c:'[[Taylor2014]]'},
 {n:'OMERACT core domains',s:'What to measure',b:['Acute gout: pain, joint swelling, joint tenderness, patient global assessment, activity limitation.','Chronic gout: serum urate, flares, tophus burden, health-related quality of life, activity limitation, pain, patient global assessment.'],c:'[[Schumacher2009]]'},
 {n:'Gout Impact Scale',s:'Patient-reported',b:['5 scales, each scored 0–100, where higher means worse.','Two-week test–retest reliability 0.77–0.89 in 308 patients.','The minimally important difference is 5–8 points.'],c:'[[Hirsch2008,Khanna2011]]'},
 {n:'HAQ-DI',s:'Function',b:['Valid for physical function in gout, with floor effects.','A 3-option rescoring fits the Rasch model better.','Scores correlated with days of sick leave (r² = 0.44).'],c:'[[Taylor2008]]'},
 {n:'Vernier caliper',s:'Tophus size',b:['Longest diameter; a mean 0.45 mm difference between observers.','Correlates with CT volume, r = 0.91.','Calipers and ultrasound met most of the OMERACT filter among 8 methods.'],c:'[[Dalbeth2007,Dalbeth2011ARD]]'}
];
const NU_CHK=[
 {t:'The order',d:'Drug, dose, route and timing as prescribed.'},
 {t:'Interactions',d:'CYP3A4 and P-gp inhibitors, azathioprine, thiazides.'},
 {t:'Kidneys, liver and tests',d:'Function, baseline bloods, genetic screens.'},
 {t:'Warning signs to teach',d:'What means stop, and who to tell.'},
 {t:'During a flare',d:'What carries on, and what is added.'}
];
const NU_SCEN={
 colch:{n:'Colchicine for a flare',flag:[1,3],
  note:'The US label gives 1.2 mg at the first sign of a flare, then 0.6 mg one hour later, a maximum of 1.8 mg in one hour. Someone already on prophylaxis can take the same flare dose, wait 12 hours, then restart the prophylactic dose. ACR 2020 strongly recommends low-dose over high-dose colchicine. Strong CYP3A4 or P-glycoprotein inhibitors raised exposure by more than 125%, so the published flare-dose cuts are 33–66%. [[FDA-Colcrys,FitzGerald2020,Terkeltaub2011]]',
  hook:'Gut effects were <b>26%</b> at the low dose, <b>77%</b> at the old high dose and 20% on placebo; diarrhoea (23%) was the commonest reaction. [[FDA-Colcrys]]'},
 nsaid:{n:'An NSAID',flag:[2,3],
  note:'The naproxen label carries a boxed warning for cardiovascular thrombotic events and for gut bleeding, ulceration and perforation, with older people and those with a past ulcer or bleed at greater risk. It is contraindicated around coronary bypass surgery. It advises the lowest effective dose for the shortest time, and monitoring kidney function in kidney or liver impairment, heart failure or dehydration. The acute gout dose it gives is 750 mg, then 250 mg every 8 hours until the flare subsides. NICE suggests adding a proton pump inhibitor when an NSAID is used for a flare. [[FDA-Naproxen,NICE-NG219]]',
  hook:'An NSAID, colchicine or a glucocorticoid are all strongly recommended first-line flare treatments in ACR 2020; the choice rests on the person\'s other conditions. [[FitzGerald2020]]'},
 allo:{n:'Starting allopurinol',flag:[2,3],
  note:'The label lists baseline serum urate, full blood count, chemistry, liver tests and kidney function before starting, and suggests titrating by 100 mg weekly to a urate of 6 mg/dL or less, maximum 800 mg a day. It is better tolerated after meals, doses above 300 mg are divided, and a missed dose is not doubled. ACR 2020 conditionally recommends HLA-B*58:01 testing first for people of Southeast Asian descent (carriage 7.4%) and African American people (3.8%). [[FDA-Allopurinol,FitzGerald2020]]',
  hook:'<b>Rash = stop.</b> The label says to stop at the first rash and seek care promptly. [[FDA-Allopurinol]]'},
 febux:{n:'Febuxostat',flag:[0,1],
  note:'The US label restricts febuxostat to people with an inadequate response to, intolerance of, or unsuitability for allopurinol, because people with established cardiovascular disease had higher cardiovascular death than on allopurinol in an outcomes study. It starts at 40 mg, going to 80 mg if urate is not below 6 mg/dL after 2 weeks, with a baseline liver panel and flare prophylaxis at the start. It is interrupted for ALT or AST above 3 times the upper limit, stopped if a serious skin reaction is suspected, and contraindicated with azathioprine or mercaptopurine. [[FDA-Uloric]]',
  hook:'Febuxostat is <b>second line</b> in the US label, with a boxed warning for cardiovascular death. [[FDA-Uloric]]'},
 keep:{n:'A flare while on urate-lowering therapy',flag:[4],
  note:'The allopurinol label tells patients to stay on allopurinol if a flare happens, and the pegloticase label says it need not be stopped for a flare. ACR 2020 even allows urate-lowering therapy to be started during a flare (conditional). The flare itself is treated with colchicine, an NSAID or a glucocorticoid. [[FDA-Allopurinol,FDA-Krystexxa,FitzGerald2020]]',
  hook:'Never stop urate-lowering therapy because of a flare: only 12% of people on it knew flares can worsen when it starts. [[Harrold2012]]'}
};
const NU_MYTHS=[
 {m:'"Allopurinol is my flare pill"',t:'It lowers urate over months; it does not treat a flare',
  a:'ACR 2020 strongly recommends colchicine, an NSAID or a glucocorticoid for the flare itself, and treat-to-target dose titration of urate-lowering therapy for the long term. The two jobs use different medicines. [[FitzGerald2020]]',
  q:'Ask: "Which tablet is for the pain, and which one is for the crystals?"'},
 {m:'"Stop the allopurinol while a flare is on"',t:'Keep it going through a flare',
  a:'The allopurinol label tells patients to stay on it if a flare happens, and the pegloticase label says it need not be stopped. ACR 2020 allows urate-lowering therapy to be started during a flare. [[FDA-Allopurinol,FDA-Krystexxa,FitzGerald2020]]',
  q:'Ask: "What did you do with your allopurinol during the last flare?"'},
 {m:'"More flares since I started means it isn\'t working"',t:'Early flares are expected',
  a:'Only 12% of people on urate-lowering therapy knew flares can worsen when it starts. On pegloticase, flares fell from 74% in months 1–3 to 41% in months 4–6. In the nurse-led trial, flares were more common in year 1 and far less common in year 2. [[Harrold2012,FDA-Krystexxa,Doherty2018]]',
  q:'Ask: "What do you think it means if you get a flare in the first few months?"'},
 {m:'"I can stop once the pain goes"',t:'Urate climbs back when it stops',
  a:'ACR 2020 conditionally recommends continuing urate-lowering therapy indefinitely. In the withdrawal series it cites, only 13% (27/211) of people whose urate stayed below 7 mg/dL off treatment were flare-free over 5 years. Qualitative syntheses describe denial, minimising symptoms and uncertainty about medicines behind stopping. [[FitzGerald2020,Tvedten2025,Rai2018]]',
  q:'Ask: "How long do you expect to be on this tablet?"'},
 {m:'"Gout is all about diet"',t:'Genes matter far more to urate than food',
  a:'Diet scores explained at most 0.3% of the variance in serum urate, against 23.9% for common genetic variation. Detailed dietary education raised knowledge but did not lower urate in treated gout. Most people with recent gout still believed diet had caused it. [[Major2018,Holland2015,Dalbeth2011ACR]]',
  q:'Ask: "What do you think caused your gout?"'},
 {m:'"My uric acid was normal, so it can\'t be gout"',t:'Urate can read low during a flare',
  a:'In 339 people with acute gout, 14% had a serum urate at or below 6 mg/dL and 32% at or below 8 mg/dL. [[Schlesinger2009]]',
  q:'Ask: "When was your urate last checked: during a flare, or between flares?"'},
 {m:'"It\'s not serious, and it\'s my own fault"',t:'Both beliefs are documented barriers',
  a:'Interviews with 20 patients and 18 professionals found the beliefs that gout is self-inflicted and that you treat the flares, not the cause, widespread. The nurse-led trial names "not serious" and "self-induced by lifestyle" as barriers, shared by some doctors. Men with chronic gout described shame and isolation that led them to play down severity. [[Spencer2012,Doherty2018,Lindsay2011]]',
  q:'Ask: "How much does gout get in the way of your life?"'}
];
const NU_DOC=[
 {k:'diary',l:'Flares since the last contact (diary)',v:'Flare diary: 2 flares since the last visit (left 1st MTP, right ankle); longest 6 days.',c:true},
 {k:'current',l:'This flare: joints, onset, the 3-of-4 check',v:'This flare: left 1st MTP, woke with it at 03:00, day 2. Says it is a flare; pain at rest 7/10; joint swollen and warm: 4 of 4.',c:true},
 {k:'septic',l:'Temperature and infection screen',v:'Temperature 37.6 °C. Single joint; skin over the tophus intact. Medical team informed.',c:true},
 {k:'su',l:'Serum urate against target',v:'Serum urate 7.9 mg/dL (470 µmol/L); target below 6 mg/dL (360 µmol/L). Drawn during a flare, so it may read low.',c:true},
 {k:'dose',l:'Urate-lowering dose and changes',v:'Allopurinol 300 mg daily, continued through the flare. Increase to 400 mg agreed with the prescriber.',c:true},
 {k:'proph',l:'Flare treatment and prophylaxis',v:'Colchicine for this flare as prescribed; prophylaxis started with allopurinol 2 months ago.',c:false},
 {k:'ae',l:'Adverse effects asked about',v:'No rash. Loose stools after colchicine: reported to the prescriber.',c:true},
 {k:'tophi',l:'Tophi: number, sites, largest diameter',v:'Tophi: 2 (right olecranon, left 1st MTP). Largest 14 mm by Vernier caliper.',c:false},
 {k:'pro',l:'Patient-reported measures',v:'Gout Impact Scale, gout concern overall: 62/100.',c:false},
 {k:'adher',l:'Adherence, asked without blame',v:'Reports about 3 missed doses in the last month; stopped for 4 days at the start of the flare, thinking it would help.',c:true},
 {k:'teach',l:'What was taught, and what they said back',v:'Taught: keep allopurinol going in a flare; early flares are expected; any rash means stop and seek care. Explained it back correctly.',c:false},
 {k:'contact',l:'Contact type and next check',v:'Clinic visit. Next urate check in 4 weeks, with a phone review in between.',c:false}
];
const NU_MON=[
 {m:0,t:'Before starting',d:'Baseline serum urate, blood count, chemistry, liver and kidney tests for allopurinol; a liver panel for febuxostat; HLA-B*58:01 where ACR 2020 suggests it.',c:'[[FDA-Allopurinol,FDA-Uloric,FitzGerald2020]]'},
 {m:1,t:'Titrating',d:'Serum urate every 2–5 weeks while the dose is raised, and after each change; titration should take weeks to months, not years.',c:'[[Khanna2012P1,FitzGerald2020]]'},
 {m:3,t:'Prophylaxis',d:'Anti-inflammatory prophylaxis for 3–6 months from the start, extended if flares continue (ACR 2020, strong).',c:'[[FitzGerald2020]]'},
 {m:6,t:'At target',d:'Serum urate every 6 months once at target, partly as a check on adherence (ACR 2012).',c:'[[Khanna2012P1]]'},
 {m:12,t:'For good',d:'Urate-lowering therapy continued indefinitely (ACR 2020, conditional); after stopping, only 13% were flare-free at 5 years.',c:'[[FitzGerald2020]]'}
];
/* Doherty 2018: published values at baseline, 1 and 2 years [nurse-led, usual care] */
const NU_DT={
 target:{l:'Urate < 6 mg/dL (360 µmol/L)',n:[22.35,94.75,94.88],u:[21.46,26.22,29.71],good:'up'},
 flares:{l:'2 or more flares in the year',n:[79.92,53.99,8.00],u:[79.77,39.82,24.29],good:'down'},
 tophi:{l:'Tophi present',n:[13.73,7.06,2.85],u:[8.78,10.15,11.29],good:'down'},
 ult:{l:'Taking urate-lowering therapy',n:[39.61,96.70,96.10],u:[38.93,46.83,56.13],good:'up'}
};
const NU_SU={n:[443,251,252],u:[439,428,421]};
const nuAt=(a,mo)=>mo<=12?lerp(a[0],a[1],mo/12):lerp(a[1],a[2],(mo-12)/12);
const NU_LOOP=[
 {from:0,at:.02,k:'Month 0',t:'A first visit, not a prescription',
  txt:'Trained nurses gave a holistic assessment, discussed what the person believed about gout, explained its nature, causes, associations, consequences and treatment options, shared the decision and gave a written booklet. Once fully informed, 99% chose urate-lowering therapy. [[Doherty2018]]',
  pt:'The first visit is mostly talking: what gout is, why crystals form, and what the choices are.',
  hook:'<b>99%</b> chose urate-lowering therapy once fully informed. [[Doherty2018]]'},
 {from:.07,at:.09,k:'Months 1–3',t:'Start low, go up step by step',
  txt:'Allopurinol started at 100 mg and rose by 100 mg every 3–4 weeks to a maximum of 900 mg, then febuxostat 80 to 120 mg or benzbromarone 50 to 200 mg if needed. Urate fell by a mean of 183 µmol/L (3.1 mg/dL) in the first 3 months. [[Doherty2018]]',
  pt:'The dose goes up a little at a time, with a blood test before each step.',
  hook:'Titration intervals disagree: the allopurinol label says weekly, ACR every 2–5 weeks, the trial every 3–4 weeks; no head-to-head data exist. [[FDA-Allopurinol,FitzGerald2020,Doherty2018]]'},
 {from:.19,at:.21,k:'Months 1–6',t:'Check, adjust, repeat',
  txt:'Urate was checked "as often as required", and phone contact could replace a visit. On average there were 9.3 visits and 8.3 phone calls over 2 years, mostly in the first 6 months, against 0.6 gout-specific GP visits in usual care. [[Doherty2018]]',
  pt:'Lots of short contacts early, then fewer once the urate is low enough.',
  hook:'The loop is <b>contact → urate → dose → teaching</b>, repeated until the target is reached. [[Doherty2018]]'},
 {from:.36,at:.4,k:'Year 1',t:'More flares at first',
  txt:'Two or more flares in year 1 were more common with nurse-led care, 53.99% against 39.82%. Only 3 of 255 nurse-led patients chose colchicine prophylaxis. ACR 2020 strongly recommends prophylaxis for 3–6 months; the trial authors suggest it might not be needed if titration is slow, which is unresolved. [[Doherty2018,FitzGerald2020]]',
  pt:'Flares can get more frequent at the start, while crystals loosen. That is expected and usually passes.',
  hook:'Early flares did not break adherence: 96.70% were still taking urate-lowering therapy at 1 year. [[Doherty2018]]'},
 {from:.5,at:.52,k:'Year 1',t:'At target',
  txt:'At 1 year, 94.75% of the nurse-led group had a urate below 360 µmol/L (6 mg/dL) against 26.22% in usual care (RR 3.59, 95% CI 2.72–4.75), and 87.42% against 13.75% were below 300 µmol/L (5 mg/dL). Mean urate fell from 443 to 251 µmol/L. [[Doherty2018]]',
  pt:'After a year, almost everyone in the nurse group had their urate low enough to dissolve crystals.',
  hook:'Nurse-led treat-to-target: <b>95% vs 26%</b> at target at 1 year. [[Doherty2018]]'},
 {from:.72,at:.76,k:'Year 2',t:'Flares and tophi fall away',
  txt:'At 2 years, 94.88% against 29.71% were at target. Two or more flares in the year fell to 8.00% against 24.29% (RR 0.33), and tophi were present in 2.85% against 11.29%. The Gout Impact Scale concern score fell from 71.56 to 37.54 against 68.51 to 53.62. [[Doherty2018]]',
  pt:'In the second year, flares became rare and the lumps under the skin mostly went away.',
  hook:'Year 2: two or more flares in <b>8% vs 24%</b>; four or more in 1.15% vs 12.39%. [[Doherty2018]]'},
 {from:.9,at:.94,k:'Beyond 2 years',t:'Worth the cost',
  txt:'Nurse-led care cost £5066 per QALY gained at 2 years, modelled at £286 at 3 years and cost-saving from 5 years. In an earlier pilot, 90.7% of 75 responders were still on urate-lowering therapy at 5 years after GP takeover. ACR 2020 conditionally recommends an augmented, non-physician protocol for everyone on urate-lowering therapy. [[Doherty2018,Abhishek2017,FitzGerald2020]]',
  pt:'Paying for the nurse visits saves money within a few years, because flares and hospital visits fall.',
  hook:'The trial used research nurses, not practice nurses, and its authors call for an implementation study. [[Doherty2018]]'}
];
inits.nursing=()=>{
  /* ---- 1 · assessment ---- */
  $('#nuAssessLede').innerHTML='A flare comes on fast and is gone within two weeks. Pick what to assess. The curves run through one flare, and the four boxes tick as the published flare definition is met. [[Neogi2015,Gaffo2018]]';
  let site='joint',flags=false;
  $('#nuSites').innerHTML='<span class="kicker">Assess</span>'+Object.entries(NU_SITES).map(([k,v])=>`<button class="btn" data-nus="${k}" aria-pressed="${k===site}">${v.n}</button>`).join('');
  const svg=$('#nuSvg'),rg=$('#nuT');
  /* schematic, in days: peak within 24 h, gone by day 14 */
  const C={pain:d=>8.5*ease(ramp(d,0,.6))*(1-ease(ramp(d,1,12))),
           swell:d=>3*ease(ramp(d,.1,1))*(1-ease(ramp(d,2,13))),
           tender:d=>3*ease(ramp(d,0,.7))*(1-ease(ramp(d,1.2,11))),
           warm:d=>3*ease(ramp(d,0,.6))*(1-ease(ramp(d,1.5,9)))};
  function foot(x,y,s,d){
    const p=C.pain(d)/8.5,w=C.warm(d)/3,sw=C.swell(d)/3;
    let o=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
    o+=`<path d="M48 232 C20 230 14 196 18 160 C22 120 14 92 22 64 C28 44 46 34 70 36 C96 38 116 44 122 62 C128 84 118 118 112 150 C106 186 102 226 74 232 Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
    o+=`<ellipse cx="40" cy="22" rx="13" ry="17" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
    [[66,17,8],[86,21,7],[102,29,6],[115,41,5]].forEach(([a,b,r])=>o+=`<circle cx="${a}" cy="${b}" r="${r}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`);
    o+=`<circle cx="40" cy="56" r="${f1(16+14*w)}" style="fill:var(--terra);opacity:${f1(.12+.3*w)}"/>`;
    o+=`<circle cx="40" cy="56" r="${f1(8+6*sw)}" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:${f1(1.5+1.5*p)}"/>`;
    o+='</g>';return o}
  function panel(P){
    const S=site,d=P.d;let s=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    const cx=P.x+P.w/2;
    if(S==='joint'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">FIRST MTP JOINT · TOP VIEW</text>`;
      s+=foot(cx-62,P.y+34,.82,d);
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">glow = warmth · ring = swelling</text>`;
    }else if(S==='pain'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">PAIN AT REST · NRS 0–10</text>`;
      const x0=P.x+24,x1=P.x+P.w-24,y0=P.y+P.h/2,v=C.pain(d);
      s+=`<rect x="${x0}" y="${y0-8}" width="${x1-x0}" height="16" rx="8" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${f1(x0+(x1-x0)*.3)}" y="${y0-8}" width="${f1((x1-x0)*.7)}" height="16" rx="0" style="fill:var(--terra-soft)"/>`;
      for(let k=0;k<=10;k++){const x=lerp(x0,x1,k/10);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y0+10}" y2="${y0+16}" class="axis"/><text x="${f1(x)}" y="${y0+30}" class="t-xs t-mid">${k}</text>`}
      const xv=lerp(x0,x1,v/10);
      s+=`<path d="M${f1(xv)} ${y0-12} l-7 -12 h14 z" style="fill:var(--terra)"/><text x="${f1(xv)}" y="${y0-30}" class="t-lbl t-mid" style="fill:var(--terra)">${f1(v)}</text>`;
      s+=`<text x="${f1(x0+(x1-x0)*.65)}" y="${y0+52}" class="t-xs t-mid" style="fill:var(--terra)">above 3 = one of the 4 flare items</text>`;
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">also: swelling, tenderness, global, activity</text>`;
    }else if(S==='tophi'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">TOPHUS · VERNIER CALIPER</text>`;
      const by=P.y+P.h*.7,r=Math.min(54,P.w*.17),tx=cx;
      s+=`<path d="M${P.x+16} ${f1(by)} H${f1(tx-r)} A${r} ${f1(r*.75)} 0 0 1 ${f1(tx+r)} ${f1(by)} H${P.x+P.w-16}" style="fill:var(--field);stroke:var(--memb);stroke-width:2.4"/>`;
      const R=rng(11);for(let k=0;k<16;k++){const a=R()*Math.PI,rr=R()*r*.75;s+=needle(tx+Math.cos(a)*rr,by-Math.sin(a)*rr*.62-4,10,R()*180,.85)}
      const jy=by-r*.75-22;
      s+=`<rect x="${f1(tx-r-30)}" y="${f1(jy-14)}" width="${f1(2*r+60)}" height="12" rx="3" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
      s+=`<path d="M${f1(tx-r)} ${f1(jy-2)} V${f1(by-4)} M${f1(tx+r)} ${f1(jy-2)} V${f1(by-4)}" style="stroke:var(--ink);stroke-width:3"/>`;
      s+=`<text x="${f1(tx)}" y="${f1(jy-22)}" class="t-lbl t-mid">longest diameter 16.9 mm</text>`;
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">16.89 mm: mean largest tophus, nurse-led arm, baseline (Doherty 2018)</text>`;
    }else if(S==='urate'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">URATE DURING A FLARE · 339 PEOPLE</text>`;
      const x0=P.x+20,W=P.w-40,y0=P.y+70;
      const seg=[['≤ 6 mg/dL',14,'var(--sea)'],['6–8',18,'var(--gold-soft)'],['> 8 mg/dL',68,'var(--gold)']];let acc=0;
      seg.forEach(([l,v,c])=>{const x=x0+W*acc/100;s+=`<rect x="${f1(x)}" y="${y0}" width="${f1(W*v/100)}" height="34" style="fill:${c};stroke:var(--panel);stroke-width:2"/>`;
        s+=`<text x="${f1(x+W*v/200)}" y="${y0+56}" class="t-xs t-mid">${l}</text><text x="${f1(x+W*v/200)}" y="${y0+72}" class="t-lbl t-mid">${v}%</text>`;acc+=v});
      wrapLines('One normal result during a flare does not exclude gout; recheck between flares.',Math.round(W/6.3)).forEach((l,i)=>s+=`<text x="${x0}" y="${y0+108+i*15}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">Schlesinger 2009 · 6–8 band derived from 32% − 14%</text>`;
    }else if(S==='screen'){
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">COLCHICINE EXPOSURE (AUC)</text>`;
      const x0=P.x+20,W=P.w-40,y0=P.y+64,mx=250;
      [['alone',100,'var(--crocus-soft)'],['+ strong CYP3A4 / P-gp inhibitor',225,'var(--crocus)']].forEach(([l,v,c],i)=>{const y=y0+i*62;
        s+=`<text x="${x0}" y="${y-6}" class="t-xs">${l}</text><rect x="${x0}" y="${y}" width="${f1(W*v/mx)}" height="26" rx="5" style="fill:${c};stroke:var(--crocus)"/>`;
        s+=`<text x="${f1(x0+W*v/mx+6)}" y="${y+18}" class="t-lbl">${i?'> +125%':'100%'}</text>`});
      s+=`<text x="${x0}" y="${y0+146}" class="t-xs" style="fill:var(--ink)">published cuts: flare dose 33–66%, prophylaxis 50–75%</text>`;
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">bar length is the lower bound (Terkeltaub 2011)</text>`;
    }else{
      s+=`<text x="${P.x+14}" y="${P.y+22}" class="t-sm">FLARE RATE · IN HOSPITAL vs NOT</text>`;
      const x0=P.x+30,yb=P.y+P.h-56,H=P.h-110,bw=Math.min(70,P.w*.2);
      [['not in hospital',1,'var(--panel-2)'],['in hospital',10.2,'var(--terra)']].forEach(([l,v,c],i)=>{const x=x0+i*(bw+60),h=H*v/10.2;
        s+=`<rect x="${f1(x)}" y="${f1(yb-h)}" width="${f1(bw)}" height="${f1(h)}" rx="4" style="fill:${c};stroke:var(--terra)"/>`;
        s+=`<text x="${f1(x+bw/2)}" y="${yb+16}" class="t-xs t-mid">${l}</text><text x="${f1(x+bw/2)}" y="${f1(yb-h-6)}" class="t-lbl t-mid">×${v}</text>`});
      s+=`<text x="${P.x+14}" y="${P.y+P.h-14}" class="t-xs">RR 10.2, 429 people with gout (Zleik 2018)</text>`;
    }
    return s}
  const wrapLines=nuWrap;
  function draw(u){
    const N=vb(svg,'720 430','400 760');
    const d=u*16;
    const L=N?{bx:20,by:28,bw:360,rowH:56, cx:20,cy:262,cw:360, P:{x:20,y:378,w:360,h:250}, ex:20,ey:668,ew:360}
             :{bx:20,by:28,bw:300,rowH:56, cx:20,cy:244,cw:300, P:{x:344,y:14,w:362,h:300}, ex:20,ey:372,ew:686};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const OBS=[['pain','Pain at rest · NRS',v=>f1(v)+' / 10',10,'var(--terra)'],
               ['swell','Swelling · 0–3',v=>f1(v),3,'var(--terra)'],
               ['tender','Tenderness · 0–3',v=>f1(v),3,'var(--terra)'],
               ['warm','Warmth · 0–3',v=>f1(v),3,'var(--gold)']];
    OBS.forEach(([k,l,fmt,mx,c],i)=>{const y=L.by+i*L.rowH,v=C[k](d);
      s+=`<text x="${L.bx}" y="${y}" class="t-sm" style="fill:${c}">${l.toUpperCase()}</text>`;
      s+=`<rect x="${L.bx}" y="${y+8}" width="${L.bw}" height="11" rx="5.5" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${L.bx}" y="${y+8}" width="${f1(L.bw*v/mx)}" height="11" rx="5.5" style="fill:${c}"/>`;
      s+=`<text x="${L.bx+L.bw}" y="${y}" class="t-sm t-end"><tspan style="fill:var(--ink);font-weight:700">${fmt(v)}</tspan></text>`});
    // the 3-of-4 flare definition
    const items=[['says it is a flare',C.pain(d)>1.5],['pain at rest > 3/10',C.pain(d)>3],['a swollen joint',C.swell(d)>=1],['a warm joint',C.warm(d)>=1]];
    const met=items.filter(x=>x[1]).length;
    s+=`<text x="${L.cx}" y="${L.cy}" class="t-sm" style="fill:var(--ink)">FLARE DEFINITION · ${met} OF 4</text>`;
    items.forEach(([l,ok],i)=>{const x=L.cx+(i%2)*(L.cw/2),y=L.cy+16+Math.floor(i/2)*30;
      s+=`<rect x="${x}" y="${y}" width="18" height="18" rx="4" style="fill:${ok?'var(--terra)':'var(--panel)'};stroke:${ok?'var(--terra)':'var(--line)'};stroke-width:1.6"/>`;
      if(ok)s+=`<path d="M${x+4} ${y+9} l4 4 7 -8" style="fill:none;stroke:var(--panel);stroke-width:2.4;stroke-linecap:round"/>`;
      s+=`<text x="${x+26}" y="${y+14}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    s+=`<text x="${L.cx}" y="${L.cy+88}" class="t-xs" style="fill:${met>=3?'var(--terra)':'var(--muted)'};font-weight:700">${met>=3?'3 or more: meets the flare definition':'fewer than 3: does not meet it'}</text>`;
    // the selected panel
    s+=panel(Object.assign({d},L.P));
    // the time course band
    const ex=L.ex,ey=L.ey,ew=L.ew,X=v=>ex+ew*v/16;
    s+=`<text x="${ex}" y="${ey-10}" class="t-sm">ONE FLARE · peak within 24 h, settled within 14 days</text>`;
    s+=`<rect x="${ex}" y="${ey}" width="${ew}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${ex}" y="${ey}" width="${f1(X(14)-ex)}" height="14" rx="7" style="fill:var(--terra-soft)"/>`;
    s+=`<rect x="${ex}" y="${ey}" width="${f1(X(1)-ex)}" height="14" rx="4" style="fill:var(--terra);opacity:.6"/>`;
    s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${ey-5}" y2="${ey+19}" style="stroke:var(--ink);stroke-width:2.5"/>`;
    [0,2,4,6,8,10,12,14,16].filter(k=>!N||k%4===0).forEach((k,i,a)=>s+=`<text x="${f1(X(k))}" y="${ey+32}" class="t-xs ${i===a.length-1?'t-end':i===0?'':'t-mid'}">day ${k}</text>`);
    s+=`<text x="${ex}" y="${ey+52}" class="t-xs" style="fill:${d>14?'var(--bad)':'var(--muted)'}">${d>14?'beyond 14 days: outside the expected course, so look again':'within the expected course'}</text>`;
    svg.innerHTML=s;
    $('#nuRead').innerHTML=`<span>day <b>${f1(d)}</b></span><span>pain <b>${f1(C.pain(d))}/10</b></span><span>flare items met <b>${met} of 4</b></span>`;
    const S=NU_SITES[site];
    $('#nuNote').innerHTML=flags
      ? `<div class="kicker">Red flags</div><h4>When it may not be a simple flare</h4>`+NU_FLAGS.map(f=>`<div class="kv"><div><dt>${f.t}</dt><dd>${f.d}</dd></div></div>`).join('')
      : `<div class="kicker">${S.n}</div><h4>What the literature describes</h4><p>${S.what}</p>`+(S.hook?`<div class="hook"><b>Exam hook</b>${S.hook}</div>`:'')+(S.pt?`<div class="pt"><b>In plain words</b>${S.pt}</div>`:'');
  }
  playWire(rg,$('#nuPlay'),draw,13000,'Replay','nursing');
  $('#nuSites').addEventListener('click',e=>{const b=e.target.closest('[data-nus]');if(!b)return;site=b.dataset.nus;$$('[data-nus]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#nuFlag').onclick=()=>{flags=!flags;$('#nuFlag').setAttribute('aria-pressed',flags);$('#nuFlag').textContent=flags?'Back to the assessment':'Show the red flags';draw(+rg.value)};
  $('#nuTools').innerHTML=NU_TOOLS.map(t=>`<div class="nu-card"><span class="tag sea">${t.s}</span><h5>${t.n}</h5><ul>${t.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${t.c}</p></div>`).join('');

  /* ---- 2 · giving the medicines ---- */
  $('#nuMedLede').innerHTML='Five checks come before any dose. Pick a medicine or a situation and see which checks it changes. The detail comes from the US labels and ACR 2020. [[FDA-Colcrys,FDA-Allopurinol,FDA-Uloric,FDA-Naproxen,FitzGerald2020]]';
  let scen='colch';
  $('#nuScen').innerHTML='<span class="kicker">Situation</span>'+Object.entries(NU_SCEN).map(([k,v])=>`<button class="btn" data-nusc="${k}" aria-pressed="${k===scen}">${v.n}</button>`).join('');
  const msv=$('#nuMedSvg');
  function drawMed(){
    const N=vb(msv,'560 400','400 420');
    const S=NU_SCEN[scen];let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const w=N?360:480,x=N?20:40,gap=N?78:72,y0=N?22:26;
    NU_CHK.forEach((st,i)=>{const y=y0+i*gap,ok=!S.flag.includes(i);
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${N?64:58}" rx="11" style="fill:var(--panel);stroke:${ok?'var(--line)':'var(--terra)'};stroke-width:${ok?1:2.5}"/>`;
      s+=`<circle cx="${x+26}" cy="${y+29}" r="13" style="fill:${ok?'var(--good-soft)':'var(--terra-soft)'};stroke:${ok?'var(--good)':'var(--terra)'};stroke-width:2"/>`;
      s+=ok?`<path d="M${x+20} ${y+29} l4 5 8 -10" style="fill:none;stroke:var(--good);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`
           :`<text x="${x+26}" y="${y+34}" class="t-lbl t-mid" style="fill:var(--terra)">!</text>`;
      s+=`<text x="${x+50}" y="${y+24}" class="t-lbl">${st.t}</text>`;
      nuWrap(st.d,N?44:60).forEach((l,j)=>s+=`<text x="${x+50}" y="${y+42+j*13}" class="t-xs">${l}</text>`)});
    msv.innerHTML=s;
    $('#nuMedNote').innerHTML=`<div class="kicker">${S.n}</div><h4>What the label and guideline say</h4><p>${S.note}</p><div class="hook"><b>Exam hook</b>${S.hook}</div>`;
    $('#nuMedCap').textContent='Five checks, and the ones this situation changes (marked !). Drawn from the labels and guidelines, not a local protocol.';
  }
  $('#nuScen').addEventListener('click',e=>{const b=e.target.closest('[data-nusc]');if(!b)return;scen=b.dataset.nusc;$$('[data-nusc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMed()});

  /* ---- pegloticase ---- */
  const psv=$('#nuPegSvg'),prg=$('#nuPegT');let loss=false;
  const PG_RESP=[9.2,.6,.4,.5,.4,.5,.4,.5,.6,.5,.4,.5,.4];
  const PG_LOSS=[9.2,.6,.5,.8,2.4,4.6,6.8,7.6,7.9,8.2,8.4,8.5,8.6];
  function drawPeg(u){
    const N=vb(psv,'720 360','400 600');
    const wk=lerp(-5,25,u),SU=loss?PG_LOSS:PG_RESP;
    let stopAt=-1;if(loss)for(let i=1;i<SU.length;i++)if(SU[i]>6&&SU[i-1]>6){stopAt=i;break}
    const x0=N?30:110,x1=N?384:700,X=w=>lerp(x0,x1,(w+5)/30);
    const ty=N?86:78;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="24" class="t-sm" style="fill:var(--sea)">PEGLOTICASE · US LABEL SCHEDULE</text>`;
    // lead-in band
    s+=`<rect x="${f1(X(-4))}" y="${ty-12}" width="${f1(X(24.5)-X(-4))}" height="24" rx="6" style="fill:var(--sea-soft);opacity:.6"/>`;
    (N?['methotrexate 15 mg weekly + folic acid,','from at least 4 weeks before']:['methotrexate 15 mg weekly + folic acid, from at least 4 weeks before']).forEach((l,i)=>s+=`<text x="${f1(X(-4)+4)}" y="${ty+28+i*13}" class="t-xs" style="fill:var(--sea)">${l}</text>`);
    if(!N)s+=`<text x="16" y="${ty+4}" class="t-xs">weekly MTX</text>`;
    // pre-start checks
    const pre=[[-4.5,'G6PD screen'],[-1,'stop oral ULT']];
    pre.forEach(([w,l],i)=>{const on=wk>=w;s+=`<path d="M${f1(X(w))} ${ty-20} l-6 -10 h12 z" style="fill:${on?'var(--warn)':'var(--panel-2)'};stroke:var(--warn)"/>`;
      s+=N?`<text x="${f1(X(w))}" y="${ty-36-i*12}" class="t-xs ${i?'t-mid':''}" style="fill:var(--warn)">${l}</text>`:`<text x="${f1(X(w)+(i?10:-10))}" y="${ty-24}" class="t-xs ${i?'':'t-end'}" style="fill:var(--warn)">${l}</text>`});
    // infusions
    const iy=N?160:150;
    if(!N)s+=`<text x="16" y="${iy+4}" class="t-xs">infusion</text>`;
    for(let k=0;k<13;k++){const w=k*2,x=X(w),given=wk>=w&&(stopAt<0||k<stopAt),stopped=stopAt>=0&&k>=stopAt;
      s+=`<path d="M${f1(x)} ${iy-14} c7 9 7 15 0 20 c-7 -5 -7 -11 0 -20z" style="fill:${stopped?'var(--panel-2)':given?'var(--sea)':'var(--panel)'};stroke:${stopped?'var(--line)':'var(--sea)'};stroke-width:1.4"/>`;
      if(k%(N?4:2)===0)s+=`<text x="${f1(x)}" y="${iy+22}" class="t-xs t-mid">wk ${w}</text>`}
    // urate chart
    const gy0=N?212:212,gy1=N?340:300,Y=v=>lerp(gy1,gy0,v/10);
    s+=`<text x="${N?16:16}" y="${gy0-10}" class="t-sm">URATE BEFORE EACH INFUSION · SCHEMATIC</text>`;
    [0,6,10].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v===6?'':'grid'}" style="${v===6?'stroke:var(--sea);stroke-width:1.6;stroke-dasharray:5 4':''}"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<text x="${x1}" y="${f1(Y(6)-6)}" class="t-xs t-end" style="fill:var(--sea)">6 mg/dL: stop above this</text>`;
    let d='';SU.forEach((v,k)=>{if(wk<k*2)return;if(stopAt>=0&&k>stopAt)return;d+=(d?'L':'M')+f1(X(k*2))+' '+f1(Y(v))});
    if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--gold);stroke-width:2"/>`;
    SU.forEach((v,k)=>{if(wk<k*2||(stopAt>=0&&k>stopAt))return;const hi=v>6;
      s+=`<circle cx="${f1(X(k*2))}" cy="${f1(Y(v))}" r="${hi?6:4.5}" style="fill:${hi?'var(--bad)':'var(--gold)'};stroke:var(--panel);stroke-width:1.5"/>`});
    if(stopAt>=0&&wk>=stopAt*2){const x=X(stopAt*2);
      s+=`<path d="M${f1(x-9)} ${iy-20} l18 18 M${f1(x+9)} ${iy-20} l-18 18" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
      s+=`<text x="${f1(Math.min(x,x1-60))}" y="${gy1+(N?20:18)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">2 checks above 6: stop</text>`}
    s+=`<line x1="${f1(X(wk))}" x2="${f1(X(wk))}" y1="${ty-30}" y2="${gy1}" style="stroke:var(--ink);stroke-width:1.4;opacity:.45"/>`;
    // the routine at each infusion
    const ry=N?390:346;
    const steps=['check urate','pre-medicate','infuse ≥ 120 min','observe'];
    if(N){s+=`<text x="16" y="${ry}" class="t-sm">AT EVERY INFUSION</text>`;
      steps.forEach((l,i)=>{const y=ry+18+i*26;s+=`<circle cx="26" cy="${y-4}" r="9" style="fill:var(--sea-soft);stroke:var(--sea)"/><text x="26" y="${y}" class="t-xs t-mid" style="fill:var(--sea);font-weight:700">${i+1}</text><text x="44" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
      nuWrap('Pre-medication is an antihistamine and a corticosteroid, in a setting ready for anaphylaxis.',58).forEach((l,i)=>s+=`<text x="16" y="${ry+136+i*14}" class="t-xs">${l}</text>`);
    }else{
      s+=`<text x="16" y="${ry}" class="t-xs">every infusion:</text>`;
      steps.forEach((l,i)=>{const x=150+i*140;s+=`<circle cx="${x}" cy="${ry-4}" r="9" style="fill:var(--sea-soft);stroke:var(--sea)"/><text x="${x}" y="${ry}" class="t-xs t-mid" style="fill:var(--sea);font-weight:700">${i+1}</text><text x="${x+14}" y="${ry}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    }
    psv.innerHTML=s;
    let k=-1;for(let i=0;i<13;i++)if(wk>=i*2)k=i;
    let h,txt,hook,pt;
    if(k<0){h='Before the first infusion';txt='Methotrexate 15 mg weekly, with folic or folinic acid, starts at least 4 weeks before. People at higher risk of G6PD deficiency (African, Mediterranean or Southern Asian ancestry) are screened first, because the deficiency is a contraindication: haemolysis and methaemoglobinaemia. Oral urate-lowering drugs are stopped before pegloticase starts. [[FDA-Krystexxa]]';
      hook='Pegloticase is <b>contraindicated in G6PD deficiency</b>. [[FDA-Krystexxa]]';pt='Before the first drip: weeks of methotrexate tablets, a blood test for G6PD, and the urate tablets stop.'}
    else if(stopAt>=0&&k>=stopAt){h='Stop: two checks above 6 mg/dL';txt='The label says to measure urate before every infusion and to stop treatment if it rises above 6 mg/dL, "particularly when 2 consecutive levels above 6 mg/dL are observed". Loss of response carries a higher risk of anaphylaxis and infusion reactions. [[FDA-Krystexxa]]';
      hook='A rising pre-infusion urate predicts reactions: it is the <b>stopping rule</b>, not just a result. [[FDA-Krystexxa]]';pt='If the urate comes back up, the body has started to block the drug, and the next drip could cause a bad reaction. So it stops.'}
    else{h=`Infusion ${k+1}: urate ${f1(SU[k])} mg/dL, so it goes ahead`;txt='The label gives 8 mg intravenously every 2 weeks over no less than 120 minutes, with pre-medication (antihistamines and corticosteroids), in a setting ready for anaphylaxis, with observation afterwards. In MIRROR, adding methotrexate raised the month-6 response from 38.5% to 71.0% and cut infusion reactions from 30.6% to 4.2%. Without methotrexate, anaphylaxis occurred in 6.5% in the pre-marketing trials. [[FDA-Krystexxa,Botson2023]]';
      hook='Methotrexate with pegloticase: response <b>71.0% vs 38.5%</b>, infusion reactions <b>4.2% vs 30.6%</b>. [[Botson2023]]';pt='Every two weeks: a blood test first, then medicines to prevent a reaction, then a two-hour drip, then a wait to make sure all is well.'}
    $('#nuPegNote').innerHTML=noteHTML({k:wk<0?'Week '+Math.round(wk):'Week '+Math.max(0,Math.floor(wk)),t:h,txt,pt,hook});
  }
  playWire(prg,$('#nuPegPlay'),drawPeg,14000,'Replay','nursing');
  $('#nuPegLoss').onclick=()=>{loss=!loss;$('#nuPegLoss').setAttribute('aria-pressed',loss);$('#nuPegLoss').textContent=loss?'Show a sustained response':'Show a loss of response';drawPeg(+prg.value)};

  /* ---- 3 · the nurse-led loop ---- */
  $('#nuLoopLede').innerHTML='In the Nottingham trial, 517 people with a recent flare were randomised to nurse-led care or usual GP care for 2 years. The nurses explained gout, shared the decision, and raised the dose until urate was on target. The loop below repeats until it is. [[Doherty2018]]';
  const lsv=$('#nuLoopSvg'),lrg=$('#nuLoopT');
  const NODES=['contact','urate','dose','teach'];
  /* schematic pace: most contacts in the first 6 months */
  const laps=mo=>6*ease(ramp(mo,0,6))+2*ramp(mo,6,24);
  function drawLoop(u){
    const N=vb(lsv,'720 420','400 660');
    const mo=u*24,ph=phaseOf(NU_LOOP,u);
    const L=N?{cx:200,cy:156,r:100, bx:20,by:360,bw:360,mH:72}:{cx:180,cy:206,r:118, bx:376,by:44,bw:320,mH:76};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="24" class="t-sm" style="fill:var(--sea)">THE NURSE-LED LOOP</text>`;
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${L.r}" style="fill:none;stroke:var(--sea-soft);stroke-width:14"/>`;
    const lp=laps(mo),ang=lp*2*Math.PI-Math.PI/2;
    // arc travelled in the current lap
    const fr=lp%1,a0=-Math.PI/2,a1=a0+fr*2*Math.PI,large=fr>.5?1:0;
    if(fr>.002)s+=`<path d="M${f1(L.cx+L.r*Math.cos(a0))} ${f1(L.cy+L.r*Math.sin(a0))} A${L.r} ${L.r} 0 ${large} 1 ${f1(L.cx+L.r*Math.cos(a1))} ${f1(L.cy+L.r*Math.sin(a1))}" style="fill:none;stroke:var(--sea);stroke-width:5;stroke-linecap:round"/>`;
    NODES.forEach((n,i)=>{const a=-Math.PI/2+i*Math.PI/2,x=L.cx+L.r*Math.cos(a),y=L.cy+L.r*Math.sin(a),on=Math.floor(fr*4)===i&&mo<23.9;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?16:12}" style="fill:${on?'var(--sea)':'var(--panel)'};stroke:var(--sea);stroke-width:2"/>`;
      const lx=x+(i===1?22:i===3?-22:0),ly=y+(i===0?-24:i===2?32:4),an=i===1?'':i===3?'t-end':'t-mid';
      s+=`<text x="${f1(lx)}" y="${f1(ly)}" class="t-xs ${an}" style="fill:var(--ink);font-weight:700">${n}</text>`});
    s+=`<circle cx="${f1(L.cx+L.r*Math.cos(ang))}" cy="${f1(L.cy+L.r*Math.sin(ang))}" r="7" style="fill:var(--ink)"/>`;
    const suN=nuAt(NU_SU.n,mo)/59.48,suU=nuAt(NU_SU.u,mo)/59.48;
    s+=`<text x="${L.cx}" y="${L.cy-8}" class="t-big t-mid" style="font-size:24px;fill:${suN<6?'var(--sea)':'var(--gold)'}">${f1(suN)}</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+10}" class="t-xs t-mid">mean urate, mg/dL</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+26}" class="t-xs t-mid">usual care ${f1(suU)}</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+L.r+(N?52:48)}" class="t-xs t-mid">month ${Math.floor(mo)} · ${mo<6?'frequent contacts':mo<12?'fewer contacts':'at target, follow-up'}</text>`;
    // bars
    s+=`<text x="${L.bx}" y="${L.by-18}" class="t-sm">NURSE-LED vs USUAL CARE (%)</text>`;
    Object.values(NU_DT).forEach((m,i)=>{const y=L.by+i*L.mH,vn=nuAt(m.n,mo),vu=nuAt(m.u,mo);
      s+=`<text x="${L.bx}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:700">${m.l}</text>`;
      [[vn,'var(--sea)','nurse'],[vu,'var(--muted)','usual']].forEach(([v,c,l],j)=>{const yy=y+8+j*20;
        s+=`<rect x="${L.bx}" y="${yy}" width="${L.bw-56}" height="13" rx="6.5" style="fill:var(--panel-2)"/>`;
        s+=`<rect x="${L.bx}" y="${yy}" width="${f1((L.bw-56)*v/100)}" height="13" rx="6.5" style="fill:${c}"/>`;
        s+=`<text x="${L.bx+L.bw}" y="${yy+11}" class="t-xs t-end"><tspan style="fill:${c};font-weight:700">${f1(v)}</tspan> ${l}</text>`})});
    s+=`<text x="${L.bx}" y="${L.by+4*L.mH-8}" class="t-xs">published at 0, 12 and 24 months · interpolated between</text>`;
    lsv.innerHTML=s;
    setLoop(ph);
    $('#nuLoopRead').innerHTML=`<span>month <b>${Math.floor(mo)}</b></span><span>at target <b>${f1(nuAt(NU_DT.target.n,mo))}% vs ${f1(nuAt(NU_DT.target.u,mo))}%</b></span><span>mean urate <b>${Math.round(nuAt(NU_SU.n,mo))} vs ${Math.round(nuAt(NU_SU.u,mo))} µmol/L</b></span>`;
    $('#nuLoopNote').innerHTML=noteHTML(NU_LOOP[ph]);
  }
  const stopL=playWire(lrg,$('#nuLoopPlay'),drawLoop,20000,'Replay','nursing');
  const setLoop=stepWire($('#nuLoopSteps'),NU_LOOP,lrg,drawLoop,stopL);

  /* ---- 4 · teaching ---- */
  $('#nuTeachLede').innerHTML='EULAR 2016 makes education an overarching principle: people with gout should be told about the disease and its treatments, and taught to treat a flare at the first warning symptoms. These are the misunderstandings the studies record. [[Richette2017]]';
  let myth=0;
  function renderMyths(){
    $('#nuMyths').innerHTML=NU_MYTHS.map((m,i)=>`<button class="nu-q" data-nm="${i}" aria-expanded="${i===myth}"><span class="myth">Often believed</span><b>${m.m}</b></button>`).join('');
    const M=NU_MYTHS[myth];
    $('#nuMythNote').innerHTML=`<div class="kicker">What the literature says</div><h4>${M.t}</h4><div class="nu-ans"><p>${M.a}</p><p><b>${M.q}</b></p></div>`;
  }
  $('#nuMyths').addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;myth=+b.dataset.nm;renderMyths()});
  renderMyths();

  /* adherence */
  const asv=$('#nuAdhSvg');let pilot=false;
  function drawAdh(){
    const N=vb(asv,'560 320','400 340');
    const x0=N?46:60,x1=N?380:530,y0=N?40:36,y1=N?250:250,X=v=>lerp(x0,x1,v/5),Y=v=>lerp(y1,y0,v/100);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="22" class="t-sm">STILL ON ALLOPURINOL (NO 90-DAY GAP)</text>`;
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    [0,1,2,3,4,5].forEach(v=>s+=`<text x="${f1(X(v))}" y="${y1+16}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${x1}" y="${y1+32}" class="t-xs t-end">years after starting</text>`;
    const P=[[0,100],[1,61.5],[5,43.1]];
    s+=`<path d="M${P.map(p=>f1(X(p[0]))+' '+f1(Y(p[1]))).join('L')}" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:4 4"/>`;
    P.forEach(p=>{s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="5" style="fill:var(--gold)"/>`;if(p[0])s+=`<text x="${f1(X(p[0])+(p[0]===5?-8:8))}" y="${f1(Y(p[1])-9)}" class="t-lbl ${p[0]===5?'t-end':''}">${p[1]}%</text>`});
    s+=`<text x="${f1(X(1.2))}" y="${f1(Y(36))}" class="t-xs">usual care, 48,280 UK starters</text>`;
    if(pilot){s+=`<circle cx="${f1(X(5))}" cy="${f1(Y(90.7))}" r="7" style="fill:var(--sea)"/><text x="${f1(X(5)-10)}" y="${f1(Y(90.7)+4)}" class="t-lbl t-end" style="fill:var(--sea)">90.7% nurse-led pilot</text>`;
      s+=`<text x="${f1(X(5)-10)}" y="${f1(Y(90.7)+20)}" class="t-xs t-end">75 responders; not the same denominator</text>`}
    asv.innerHTML=s;
    $('#nuAdhNote').innerHTML=`<div class="kicker">Adherence</div><h4>Most people stop</h4><p>Among 48,280 UK people starting allopurinol, 38.5% had a first 90-day gap by 1 year and 56.9% by 5 years, so 61.5% and 43.1% were still persisting; 61% were non-adherent overall. After a gap, 43.3% restarted within a year. A meta-analysis of 13 studies pooled 46% adherent. [[Scheepers2018Rheum,Scheepers2018SAR]]</p>`+
      (pilot?`<p>In the nurse-led pilot, 90.7% of the 75 people who replied at 5 years were still on urate-lowering therapy after GP takeover, and 85.3% took it at least 6 days a week. It is a small, self-selected group, so the two figures are not a like-for-like comparison. [[Abhishek2017]]</p>`:'')+
      `<div class="hook"><b>Exam hook</b>Persistence falls fast: <b>61.5%</b> still on allopurinol at 1 year, <b>43.1%</b> at 5 years. [[Scheepers2018Rheum]]</div><div class="pt"><b>In plain words</b>More than half of people have stopped their urate tablet within five years. People who feel they understand gout are more likely to keep taking it.</div>`;
  }
  $('#nuAdhBtn').onclick=()=>{pilot=!pilot;$('#nuAdhBtn').setAttribute('aria-pressed',pilot);$('#nuAdhBtn').textContent=pilot?'Hide the nurse-led pilot':'Add the nurse-led pilot';drawAdh()};
  $('#nuTeachCards').innerHTML=`
   <div class="nu-card"><h5>What the effective model taught</h5><ul><li>The nature, causes, associations and consequences of gout, and the treatment options, with a written booklet and a shared decision.</li><li>What the person believes about gout, discussed rather than corrected.</li><li>ACR 2020's patient panel asked for a "medication-in-pocket" flare plan for people who recognise early signs.</li></ul><p class="stage-cap">[[Doherty2018,FitzGerald2020]]</p></div>
   <div class="nu-card"><h5>What people do not know</h5><ul><li>In 240 US respondents, seafood, beef, pork and beer were recognised as triggers by only 23%, 22%, 7% and 43%.</li><li>Only 12% of those on urate-lowering therapy knew flares can worsen when it starts.</li><li>Poor health literacy (9.4% of 551 primary-care patients) was linked to 2 or more flares a year (adjusted OR 4.10).</li></ul><p class="stage-cap">[[Harrold2012,Watson2024]]</p></div>
   <div class="nu-card"><h5>Beliefs change outcomes</h5><ul><li>In 142 people with gout for under 10 years, adherence rose with perceived understanding and fell with perceived severity, and negative perceptions predicted worse disability at 1 year.</li><li>Beliefs about consequences predicted all-cause mortality (HR 1.18) in 242 people.</li></ul><p class="stage-cap">[[Dalbeth2011ACR,Serlachius2017]]</p></div>
   <div class="nu-card"><h5>Asking about adherence</h5><ul><li>EULAR's points to consider: discuss adherence regularly, assess it without blame, build trust and tailor the solution. Non-adherence in rheumatic diseases runs at 30–80%.</li><li>EULAR's patient-education recommendations (eight, four with strength-A evidence) cover when, by whom and how education is given.</li></ul><p class="stage-cap">[[Ritschl2021,Zangi2015]]</p></div>
   <div class="nu-card"><h5>Other people who can run the loop</h5><ul><li>A 1463-patient site-randomised trial of pharmacist-led, mostly automated telephone care improved adherence (50% vs 37%) and urate below 6 mg/dL (30% vs 15%) at 1 year; the adherence gain faded in year 2.</li><li>A 77-patient pharmacist telephone trial reached urate at or below 6 mg/dL in 35% vs 13% at 26 weeks.</li><li>ACR 2020 says the key is that the treating provider, who could be the physician, educates and treats to target where such staff are not available.</li></ul><p class="stage-cap">[[Mikuls2019,Goldfien2016,FitzGerald2020]]</p></div>
   <div class="nu-card"><h5>Shame and stigma</h5><ul><li>A synthesis of 45 qualitative studies (1203 patients) found five themes: denying illness, negotiating uncertainty, juggling competing priorities, minimising symptoms and lifestyle restrictions, and developing strategies and empowerment.</li><li>ACR 2020 aimed to give lifestyle guidance "without implying any patient-blaming", given gout's strong genetic determinants.</li></ul><p class="stage-cap">[[Tvedten2025,FitzGerald2020]]</p></div>`;

  /* ---- 5 · hospital ---- */
  $('#nuHosp').innerHTML=`
   <div class="nu-card"><span class="tag terra">Risk</span><h5>A tenfold rise</h5><ul><li>In 429 people with gout the flare rate rose about tenfold during a hospital stay (RR 10.2), and an in-hospital flare added 1.8 days to the stay.</li></ul><p class="stage-cap">[[Zleik2018]]</p></div>
   <div class="nu-card"><span class="tag terra">Prediction</span><h5>The GOUT-36 rule</h5><ul><li>Four pre-admission items: no flare prophylaxis, no urate-lowering therapy, a tophus, and urate above 0.36 mmol/L (6 mg/dL) in the past year.</li><li>75% sensitive and 67% specific for inpatient flares; in validation, 80% of very-high-risk patients flared against 11% of low-risk patients.</li></ul><p class="stage-cap">[[Jatuworapruk2022Rheum]]</p></div>
   <div class="nu-card"><span class="tag terra">After surgery</span><h5>Days 1 to 17</h5><ul><li>31 of 70 people (44.3%) with known gout flared a mean 3.7 days after surgery; 61.3% were monoarticular, 83.9% in the lower limb, and only 13% in the first MTP joint.</li><li>Pre-operative urate of 9 mg/dL (535 µmol/L) or more had OR 3.77; taking allopurinol had OR 0.15.</li><li>In an older series, 52 of 302 flared 1–17 days after admission, almost all with fever.</li></ul><p class="stage-cap">[[Jeong2019,Craig1995]]</p></div>
   <div class="nu-card"><span class="tag warn">Evidence gap</span><h5>Keep the urate tablet going?</h5><ul><li>Regular pre-admission urate-lowering therapy was linked to a 10% shorter stay in 36,047 New Zealand admissions (observational).</li><li>No trial has tested continuing or starting urate-lowering therapy during an admission.</li></ul><p class="stage-cap">[[Jatuworapruk2022IJRD,Jatuworapruk2022Rheum]]</p></div>`;

  /* ---- 6 · documentation ---- */
  $('#nuDocLede').innerHTML='The nurse-led trial recorded flare diaries, urate at every titration contact, doses and changes, side-effects and reasons for stopping, tophus number, sites and largest diameter, the SF-36 and Gout Impact Scale, and every visit or call. That is a ready template. Tick what you observed and the entry assembles. [[Doherty2018]]';
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

  /* monitoring plan */
  const mv=$('#nuMonSvg'),mr=$('#nuMonT');
  function drawMon(t){
    const N=vb(mv,'720 230','400 420');
    const T=t*12;let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(N){
      NU_MON.forEach((e,i)=>{const y=30+i*78,on=T>=e.m;
        s+=`<circle cx="30" cy="${y}" r="9" style="fill:${on?'var(--sea)':'var(--panel-2)'};stroke:var(--sea);stroke-width:2"/>`;
        if(i<NU_MON.length-1)s+=`<line x1="30" x2="30" y1="${y+10}" y2="${y+68}" style="stroke:var(--line);stroke-width:2"/>`;
        s+=`<text x="52" y="${y+4}" class="t-lbl" style="opacity:${on?1:.45}">${e.m===12?'month 12+':'month '+e.m} · ${e.t}</text>`;
        nuWrap(e.d,52).slice(0,3).forEach((l,j)=>s+=`<text x="52" y="${y+20+j*13}" class="t-xs" style="opacity:${on?1:.45}">${l}${j===2&&nuWrap(e.d,52).length>3?'…':''}</text>`)});
    }else{
      const x0=60,x1=680,xm=m=>lerp(x0,x1,m/12);
      s+=`<line x1="${x0}" x2="${x1}" y1="120" y2="120" class="axis"/>`;
      for(let m=0;m<=12;m+=3)s+=`<text x="${f1(xm(m))}" y="146" class="t-xs t-mid">${m===12?'month 12+':'month '+m}</text>`;
      NU_MON.forEach((e,i)=>{const x=xm(e.m),on=T>=e.m,up=i%2===0;
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${up?80:120}" y2="${up?120:160}" style="stroke:var(--line);stroke-width:1.5"/>`;
        s+=`<circle cx="${f1(x)}" cy="120" r="8" style="fill:${on?'var(--sea)':'var(--panel-2)'};stroke:var(--sea);stroke-width:2"/>`;
        s+=`<text x="${f1(x)}" y="${up?70:180}" class="t-lbl ${i===0?'':i===NU_MON.length-1?'t-end':'t-mid'}" style="opacity:${on?1:.45}">${e.t}</text>`});
      s+=`<line x1="${f1(xm(Math.min(T,12)))}" x2="${f1(xm(Math.min(T,12)))}" y1="40" y2="200" style="stroke:var(--ink);stroke-width:1.5;opacity:.3"/>`;
    }
    mv.innerHTML=s;
    const reached=NU_MON.filter(e=>T>=e.m).slice(-1)[0]||NU_MON[0];
    $('#nuMonCap').innerHTML=`Month ${T.toFixed(0)} · <b>${reached.t}</b>. ${reached.d} ${reached.c}`;
  }
  playWire(mr,$('#nuMonPlay'),drawMon,9000,'Replay','nursing');
  $('#nuDocCards').innerHTML=`
   <div class="nu-card"><h5>Measures with published validity</h5><ul><li>The 3-of-4 flare definition, pain on an NRS or VAS, the Gout Impact Scale, HAQ-DI and caliper tophus diameter all have published validity for the record.</li></ul><p class="stage-cap">[[Gaffo2018,Taylor2014,Hirsch2008,Taylor2008,Dalbeth2007]]</p></div>
   <div class="nu-card"><h5>Pregnancy</h5><ul><li>BSR 2023 asks that the risks and benefits of drug treatment in pregnancy be discussed and clearly documented by every professional involved (GRADE 1A).</li></ul><p class="stage-cap">[[Schreiber2023]]</p></div>
   <div class="nu-card"><h5>What the record is for</h5><ul><li>Checking urate every 6 months at target is partly a check on adherence, so the result belongs next to what the person says they take.</li><li>Every contact counted in the trial, including phone calls: 9.3 visits and 8.3 calls on average over 2 years.</li></ul><p class="stage-cap">[[Khanna2012P1,Doherty2018]]</p></div>`;

  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawMed();drawAdh()};
  draw(+rg.value);drawMed();drawPeg(+prg.value);drawLoop(+lrg.value);drawAdh();drawMon(+mr.value);
};
