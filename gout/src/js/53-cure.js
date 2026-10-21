/* =============== 5.3 toward a cure =============== */
const cuWrap=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
const CU_LVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
const CU_LVLTXT={est:['ESTABLISHED','var(--good)'],early:['EARLY EVIDENCE','var(--warn)'],hyp:['HYPOTHESIS','var(--crocus)']};
/* 1 · crystal clearance */
const CU_X=[
 {from:0,at:.02,k:'Before treatment',t:'Crystals sit in the joint',
  txt:'Gout is a disease of monosodium urate crystal deposits, and those deposits are reversible: long-term urate-lowering therapy dissolves them and so prevents flares and tophi. Plasma is saturated with urate at about 6.8 mg/dL (405 µmol/L). [[Dalbeth2021,Dalbeth2019NRDP,Martillo2014]]',
  pt:'Above a certain level, urate comes out of solution as tiny needles. Bring the level down and the needles can melt back.',
  hook:'Gout is the one common arthritis with a <b>removable cause</b>: the crystal. [[Dalbeth2021]]'},
 {from:.08,at:.1,k:'Months 0–3',t:'Urate brought below target',
  txt:'EULAR 2016 sets the target as below 6 mg/dL (360 µmol/L), or below 5 mg/dL (300 µmol/L) in severe gout, "to cure the disease". ACR 2020 strongly recommends treat-to-target titration with a target below 6 mg/dL. A target below saturation keeps the gradient in favour of dissolution. [[Richette2017,FitzGerald2020,Martillo2014]]',
  pt:'The urate number in the blood has to stay under the line, every day, for the crystals to shrink.',
  hook:'EULAR\'s own words: the target is set "to <b>cure</b> the disease". [[Richette2017]]'},
 {from:.2,at:.22,k:'Month 3',t:'Fewer crystals in the fluid',
  txt:'In 18 people with crystal-proven gout whose urate was brought to normal, the median crystal count in joint fluid fell from 7.5 to 3 per 400× field within 3 months. In 63 people with tophaceous gout, tophi shrank faster the lower the urate, a linear relation. [[Pascual2007,PerezRuiz2002]]',
  pt:'Within a few months there are already fewer crystals to find in the joint.',
  hook:'Lower urate, faster tophus shrinkage: the relation is <b>linear</b>. [[PerezRuiz2002]]'},
 {from:.5,at:.6,k:'Months 3–33',t:'Clear',
  txt:'Crystals disappeared from the joint fluid of all 18 joints, taking 3 to 33 months. The time correlated with how long the person had had gout (rs = 0.71). So cure in gout is crystal clearance with sustained urate lowering, not a single event, and stopping treatment lets the urate pool rebuild. [[Pascual2007,PerezRuiz2006,FitzGerald2020]]',
  pt:'Every joint cleared in the end, but a joint that had gout for longer took years rather than months.',
  hook:'Synovial crystals cleared in <b>3 to 33 months</b>, longer with longer disease. [[Pascual2007]]'}
];
/* remission cohorts: [year, %] */
const CU_REM={
 cares:{n:'CARES population',c:'var(--sea)',pts:[[1,37.4],[6,63.1]],off:[[-8,-8,1],[-8,-8,1]],cite:'[[TabiAmponsah2025,White2018]]'},
 nor:{n:'NOR-Gout',c:'var(--gold)',pts:[[1,7.7],[2,45.4],[5,58.6]],off:[[8,4,0],[-8,-8,1],[-8,-8,1]],cite:'[[Uhlig2025]]'},
 nurse:{n:'Nurse-led trial',c:'var(--good)',pts:[[1,17.6],[2,42.7]],off:[[-8,4,1],[8,16,0]],cite:'[[TabiAmponsah2024]]'}
};
/* 2 · the pathway */
const CU_ST=[
 {l:['Purines','food · cells'],k:'Stage 1 · The supply',t:'Purines in',
  txt:'Urate is the end product of purine breakdown in humans. Production was estimated at 591 mg a day in 123 people on haemodialysis without urine output, the first new estimate in over 50 years. [[Chen2016,Ohashi2023]]',
  pt:'Urate comes from breaking down purines, which are in food and in every cell the body replaces.',
  hook:'Diet explains at most 0.3% of the variation in serum urate; common genetic variation explains 23.9%. [[Major2018]]'},
 {l:['Xanthine oxidase','makes urate'],k:'Stage 2 · Production',t:'Xanthine oxidase makes urate',
  txt:'Xanthine oxidoreductase catalyses both hypoxanthine to xanthine and xanthine to urate. Blocking it is the production route: allopurinol and febuxostat today, tigulixostat and topiroxostat in the pipeline. [[Chen2016,FitzGerald2020,Terkeltaub2023,Hosoya2016]]',
  pt:'One enzyme does the last two steps of making urate. Block it and less urate is made.',
  hook:'Allopurinol is first-line urate-lowering therapy, started at 100 mg a day or less and titrated to target. [[FitzGerald2020,Richette2017]]'},
 {l:['Serum urate','the pool'],k:'Stage 3 · The pool',t:'The urate pool, and its two exits',
  txt:'At least 90% of filtered urate is reabsorbed, by transporters including URAT1 and GLUT9, so blocking URAT1 is the excretion route. Most mammals have a second exit: uricase turns urate into allantoin, about 100 times more soluble, but humans and higher primates lack it. [[Chen2016,Enomoto2002,So2010]]',
  pt:'The kidney normally takes most urate back. Humans also lack the enzyme other animals use to break urate down.',
  hook:'URAT1 (2002) is the target of uricosuric drugs; recombinant uricase gives humans back the missing exit. [[Enomoto2002,Sundy2011]]'},
 {l:['MSU crystals','in joints · tophi'],k:'Stage 4 · Crystals',t:'Above saturation, crystals form',
  txt:'Plasma is saturated at about 6.8 mg/dL. Silent deposits are common: dual-energy CT found urate deposits in 24% of people with asymptomatic hyperuricaemia, and ultrasound found a double contour or tophus in 38.7% of 269 people with no flares. [[Martillo2014,Dalbeth2015,Stewart2026US]]',
  pt:'Crystals can build up for years before the first flare.',
  hook:'Only the three urate routes reach this box. Everything downstream treats the reaction, not the crystal. [[Dalbeth2019NRDP]]'},
 {l:['NLRP3','inflammasome'],k:'Stage 5 · Sensing',t:'Crystals switch on NLRP3',
  txt:'MSU crystals activate the NALP3 (NLRP3) inflammasome, and caspase-1 then releases IL-1β; mice lacking inflammasome parts or the IL-1 receptor had impaired crystal-induced neutrophil influx. Oral NLRP3 inhibitors aim here: dapansutrile has an open-label phase 2a and a placebo-controlled phase 2/3 recruiting. [[Martinon2006,Kluck2020,NCT05658575]]',
  pt:'Immune cells that swallow a crystal set off an alarm complex called NLRP3.',
  hook:'Martinon 2006: urate crystals activate <b>NALP3</b>. [[Martinon2006]]'},
 {l:['IL-1β','the signal'],k:'Stage 6 · The signal',t:'IL-1β calls in neutrophils',
  txt:'IL-1β drives the flare. Canakinumab, an anti-IL-1β antibody, cut 72-hour pain more than triamcinolone (25.0 vs 35.7 mm) and lowered new-flare risk by 62% (HR 0.38). Firsekibart, a second anti-IL-1β antibody, was approved in China in June 2025. [[Schlesinger2012,Crescioli2026]]',
  pt:'The alarm complex releases a signal that brings in white cells, and they cause the heat and pain.',
  hook:'Canakinumab gained US approval for gout flares in August 2023, for people in whom NSAIDs, colchicine and repeated steroids are unsuitable. [[FDA-BLA125319-S107,IlarisPIG]]'},
 {l:['Flare & damage','pain · tophi'],k:'Stage 7 · The result',t:'Flares, then tophi and damage',
  txt:'Flares are what people feel. Inflammation resolves within days even though crystals can still be found in fluid and tissue, so each flare ends while the cause stays. [[Schauer2014,Dalbeth2019NRDP]]',
  pt:'The flare settles by itself, but the crystals stay unless urate is lowered.',
  hook:'IL-1 and NLRP3 blockade treat or prevent flares; <b>they do not remove crystals</b>. [[Dalbeth2019NRDP,Dalbeth2021]]'}
];
const CU_STEPS=CU_ST.map((s,i)=>({from:i*.135,at:i*.135+.03,k:s.k,t:s.t,txt:s.txt,pt:s.pt,hook:s.hook}));
/* route mechanics: b = barrier before stage b; pass = share that gets through a partial barrier;
   pk/pu = share drained by the kidney and by uricase; xt = crystal trend (-1 dissolve, 0 hold, 1 grow) */
const CU_ROUTES={
 none:{n:'No intervention',b:-1,pk:.3,pu:0,xt:1},
 prod:{n:'Xanthine oxidase inhibition',b:1,pass:.4,pk:.3,pu:0,xt:-1,lvl:'est',pipe:'early',
  fix:'Less urate is made, so the pool falls below saturation and crystals dissolve.',
  ev:'Established: allopurinol is first-line, titrated to target. Pipeline: tigulixostat phase 2 (n = 143) reached urate below 5 mg/dL at week 12 in 47.1%, 44.7% and 62.2% (50, 100, 200 mg) against 2.9% on placebo. Its phase 3 trials EURELIA 1 (NCT05586958, 354 enrolled) and EURELIA 2 (NCT05586971, 2202 enrolled, against allopurinol up to 800 mg) are completed without posted results; a Chinese phase 3 against febuxostat (NCT07414394) is active. Topiroxostat 120 mg was non-inferior to allopurinol 200 mg in Japan (36.3% vs 34.3% fall). [[FitzGerald2020,Terkeltaub2023,Saag2025,NCT05586958,NCT05586971,NCT07414394,Hosoya2016]]',
  obs:'A new xanthine oxidase inhibitor has to beat allopurinol titrated to target, not a fixed low dose; EURELIA 2 is that test and is unreported. [[NCT05586971]]',
  cards:[['Allopurinol, febuxostat','est','First-line and second-line production blockers in ACR 2020.','[[FitzGerald2020]]'],['Tigulixostat','early','Phase 2 positive; two completed phase 3 trials unreported; NCT05586958, NCT05586971, NCT07414394.','[[Terkeltaub2023,NCT05586958,NCT05586971,NCT07414394]]'],['Topiroxostat','est','Non-inferior to allopurinol 200 mg in a Japanese phase 3 (Established in Japan).','[[Hosoya2016]]']]},
 excr:{n:'URAT1 inhibition',b:-1,pk:.75,pu:0,xt:-1,lvl:'est',pipe:'early',
  fix:'The kidney stops taking urate back, so more leaves in the urine.',
  ev:'Dotinurad, approved in Japan in 2020, reached urate at or below 6 mg/dL at week 24 in 73.6% on 4 mg against 38.1% on febuxostat 40 mg in a Chinese phase 3 (n = 451; NCT05007392). US and European trials are recruiting against allopurinol (NCT07089875), in tophaceous gout (NCT07089888) and after xanthine oxidase or uricase failure (NCT07535034). AR882 completed two placebo-controlled phase 3 trials, AR882-301 (NCT06846515, 866 people) and AR882-302 (NCT06439602, 818), with no results posted. Epaminurad reached urate below 0.36 mmol/L at week 4 in 88.89% on 9 mg against 0.00% on placebo; its phase 3 EPIC (NCT05815901, 612 people) is unreported. [[Hosoya2020a,Sun2025,NCT05007392,NCT07089875,NCT07089888,NCT07535034,NCT06846515,NCT06439602,Jun2025,NCT05815901]]',
  obs:'Kidney safety has to be shown, not assumed. Lesinurad raised serum creatinine to 1.5 times baseline in 15.0% at 400 mg and its 200 mg tablet\'s approval was withdrawn in 2021; verinurad was shelved after negative kidney and heart trials. [[Saag2017,Bardin2017,FR-2021-05368,Heerspink2024,Kitzman2024]]',
  cards:[['Dotinurad','est','73.6% vs 38.1% at target against febuxostat 40 mg (Established in Japan and China); NCT05007392, NCT07089875, NCT07089888, NCT07535034.','[[Sun2025,NCT05007392,NCT07089875,NCT07089888,NCT07535034]]'],['AR882','early','Phase 3 AR882-301 (NCT06846515) and AR882-302 (NCT06439602) completed; phase 2 NCT05119686, NCT05253833.','[[NCT06846515,NCT06439602,NCT05119686,NCT05253833]]'],['Epaminurad','early','Phase 2b 88.89% vs 0.00% at target; phase 3 EPIC NCT05815901 unreported.','[[Jun2025,NCT05815901]]'],['Lesinurad, verinurad','est','Lesinurad worked with allopurinol but its 200 mg approval was withdrawn; verinurad\'s later trials were negative outside gout.','[[Saag2017,FR-2021-05368,Heerspink2024]]']]},
 brk:{n:'Uricase',b:-1,pk:.3,pu:.75,xt:-1,lvl:'est',pipe:'early',
  fix:'Restores the exit humans lost: urate is broken down to soluble allantoin.',
  ev:'Pegloticase every 2 weeks reached the urate response in 42% against 0% on placebo in two 6-month trials. In MIRROR (NCT03994731), adding methotrexate raised month-6 response to 71.0% from 38.5% and cut infusion reactions to 4.2% from 30.6%. NASP (formerly SEL-212, pegadricase with nanoencapsulated sirolimus) induces tolerance instead: in DISSOLVE I and II (NCT04513366, NCT04596540), 51% (high dose) and 43% (low dose) responded against 8% on placebo. PRX-115 is in phase 2 (NCT07280156). [[Sundy2011,Botson2023,NCT03994731,Baraf2026,NCT04513366,NCT04596540,NCT07280156]]',
  obs:'Immunogenicity: antibodies end the response and raise the risk of reactions, so urate is checked before each infusion. Pegloticase is contraindicated in G6PD deficiency. There is no head-to-head trial of methotrexate against tolerance induction. [[FDA-Krystexxa,Botson2023,Baraf2026]]',
  cards:[['Pegloticase + methotrexate','est','71.0% vs 38.5% at month 6; NCT03994731. Dosing studies NCT06229145 (every 4 weeks) and NCT07388498 (subcutaneous).','[[Botson2023,NCT03994731,NCT06229145,NCT07388498]]'],['NASP (SEL-212)','early','Phase 3 positive, not approved: 51% and 43% vs 8%; NCT04513366, NCT04596540.','[[Baraf2026,Baraf2024,NCT04513366,NCT04596540]]'],['PRX-115','early','Phase 2 RELEASE, with or without methotrexate; NCT07280156.','[[NCT07280156]]'],['ALLN-346, circRNA uricase','hyp','Oral gut uricase lowered urate in mice; its phase 2a (NCT04987294) was terminated for financing. Circular-RNA uricase works only in mice so far.','[[Pierzynowska2020,NCT04987294,Du2026]]']]},
 nlrp3:{n:'NLRP3 inhibitor',b:4,pk:.3,pu:0,xt:0,lvl:'early',pipe:'hyp',
  fix:'Stops crystals switching on the inflammasome, so a flare does not start. Crystals stay.',
  ev:'Dapansutrile, an oral NLRP3 inhibitor, cut target-joint pain by 68.9–84.2% by day 7 across doses in an open-label phase 2a of 29 per-protocol people, with no placebo arm. A placebo-controlled phase 2/3 (NCT05658575, estimated 300 people) is recruiting. DFV890 has first-in-human safety data but no gout trial registered. [[Kluck2020,NCT05658575,DFV890]]',
  obs:'No placebo-controlled result yet, and it does not touch the urate pool. [[Kluck2020]]',
  cards:[['Dapansutrile','early','Open-label phase 2a; phase 2/3 NCT05658575 recruiting.','[[Kluck2020,NCT05658575]]'],['DFV890','hyp','First-in-human data; no gout trial registered.','[[DFV890]]']]},
 il1:{n:'IL-1β blockade',b:6,pk:.3,pu:0,xt:0,lvl:'est',pipe:'early',
  fix:'Neutralises the flare signal. Treats or prevents flares; crystals stay.',
  ev:'Canakinumab beat triamcinolone on 72-hour pain and cut new-flare risk (HR 0.38), and is approved for gout flares in the EU and US. Firsekibart, approved in China in June 2025, gave new flares in 10.9% against 65.2% on betamethasone at 12 weeks (NCT05983445). Anakinra was not superior to triamcinolone on its primary endpoint and is off-label. Rilonacept cut flares when starting allopurinol (0.21–0.29 against 1.06 per person) but is not approved for gout. [[Schlesinger2012,EMA-Ilaris,FDA-BLA125319-S107,Crescioli2026,NCT05983445,Saag2021,KineretPI,Schumacher2012,ArcalystPI]]',
  obs:'It leaves the crystals in place, so urate lowering is still needed. Serious adverse events were 8.0% against 3.5% with canakinumab in the core trials. [[Schlesinger2012,Dalbeth2021]]',
  cards:[['Canakinumab','est','EU 2013, US 2023 for flares when standard options are unsuitable.','[[EMA-Ilaris,FDA-BLA125319-S107]]'],['Firsekibart','est','Approved in China, June 2025; NCT05983445; 48-week extension HR 0.30 for recurrence.','[[Crescioli2026,NCT05983445,Zhu2026]]'],['Anakinra, rilonacept, anflekitug','early','Off-label or not approved for gout; anflekitug\'s marketing application was accepted in China in June 2025.','[[Saag2021,Schumacher2012,Crescioli2026]]']]},
 prev:{n:'Treating hyperuricaemia before gout',b:3,pass:.5,pk:.3,pu:0,xt:-.4,lvl:'hyp',pipe:'early',
  fix:'Lowers urate in people with no flares yet, hoping to stop crystals and gout from starting.',
  ev:'Only about half of people with urate at or above 10 mg/dL developed gout within 15 years, and 1.1% below 6 mg/dL. In FREED (1070 older Japanese adults), febuxostat lowered a composite of cerebral, cardiovascular, renal events and death (HR 0.750), driven by renal impairment; gout flares were 1.1% against 2.6% (P = 0.069). SGLT2 inhibitors were linked to less incident gout than GLP-1 agonists (HR 0.64) and fewer recurrent flares than DPP-4 inhibitors, in observational data; the first randomised test in gout, SAVE-Care (NCT06674109), is recruiting. [[Dalbeth2018ARD,Kojima2019,Fralick2020,McCormick2023,NCT06674109]]',
  obs:'Allopurinol did not slow kidney decline in CKD-FIX or PERL, and ACR 2020 conditionally recommends against treating asymptomatic hyperuricaemia. No gout vaccine or preventive biological has a registered trial. [[Badve2020,Doria2020,FitzGerald2020]]',
  cards:[['FREED (febuxostat)','early','Composite HR 0.750 in older Japanese adults, driven by kidney events.','[[Kojima2019]]'],['CKD-FIX, PERL (allopurinol)','est','No kidney benefit: an established negative result.','[[Badve2020,Doria2020]]'],['SGLT2 inhibitors','early','Observational HR 0.64; SAVE-Care NCT06674109 recruiting.','[[Fralick2020,McCormick2023,NCT06674109]]']]}
};
/* evidence table rows: route, drug, evidence, level, registry, status */
const CU_TBL=[
 ['Production','Allopurinol, febuxostat','First-line and second-line in ACR 2020','est','—','Standard care'],
 ['Production','Tigulixostat','Phase 2: 62.2% vs 2.9% below 5 mg/dL at week 12','early','NCT05586958, NCT05586971, NCT07414394','Phase 3 completed, unreported'],
 ['Production','Topiroxostat','Non-inferior to allopurinol 200 mg (36.3% vs 34.3% fall)','est','—','Used in Japan'],
 ['Excretion','Dotinurad','73.6% vs 38.1% at target vs febuxostat 40 mg (China phase 3)','est','NCT05007392, NCT07089875, NCT07089888, NCT07535034','Approved in Japan 2020; Western trials recruiting'],
 ['Excretion','AR882','Two placebo-controlled phase 3 trials completed (866 and 818 people)','early','NCT06846515, NCT06439602, NCT05119686, NCT05253833','No results posted'],
 ['Excretion','Epaminurad','Phase 2b: 88.89% vs 0.00% below 0.36 mmol/L at week 4','early','NCT05815901','Phase 3 completed, unreported'],
 ['Excretion','Lesinurad','Worked with allopurinol; creatinine rises','est','—','200 mg approval withdrawn 2021'],
 ['Breakdown','Pegloticase + methotrexate','71.0% vs 38.5% response; infusion reactions 4.2% vs 30.6%','est','NCT03994731, NCT06229145, NCT07388498','Label regimen'],
 ['Breakdown','NASP (SEL-212)','51% and 43% vs 8% response in phase 3','early','NCT04513366, NCT04596540','Not approved'],
 ['Breakdown','PRX-115','Phase 2 with or without methotrexate','early','NCT07280156','Recruiting'],
 ['Breakdown','ALLN-346','Lowered urate in uricase-deficient mice','early','NCT04987294','Terminated for financing'],
 ['Inflammation','Dapansutrile (NLRP3)','Open-label phase 2a: pain down 68.9–84.2% by day 7','early','NCT05658575','Phase 2/3 recruiting'],
 ['Inflammation','DFV890 (NLRP3)','First-in-human safety only','hyp','—','No gout trial'],
 ['Inflammation','Canakinumab (IL-1β)','HR 0.38 for new flares vs triamcinolone','est','—','EU 2013, US 2023'],
 ['Inflammation','Firsekibart (IL-1β)','New flares 10.9% vs 65.2% at 12 weeks','est','NCT05983445','Approved in China, June 2025'],
 ['Prevention','Febuxostat in hyperuricaemia (FREED)','Composite HR 0.750, driven by kidney events','early','—','Not adopted outside Japan'],
 ['Prevention','SGLT2 inhibitors','Incident gout HR 0.64 (observational)','early','NCT06674109','Randomised test recruiting']
];
const CU_TBLC=['[[FitzGerald2020]]','[[Terkeltaub2023]]','[[Hosoya2016]]','[[Sun2025,Hosoya2020a]]','[[NCT06846515,NCT06439602]]','[[Jun2025]]','[[Saag2017,Bardin2017,FR-2021-05368]]','[[Botson2023]]','[[Baraf2026]]','[[NCT07280156]]','[[Pierzynowska2020,NCT04987294]]','[[Kluck2020]]','[[DFV890]]','[[Schlesinger2012,EMA-IlarisGout2013,FDA-IlarisGout2023]]','[[Crescioli2026]]','[[Kojima2019]]','[[Fralick2020,NCT06674109]]'];
inits.cure=()=>{
  /* ---- 1 · crystal clearance ---- */
  $('#cuXLede').innerHTML='When urate stays below saturation, crystals dissolve. Press play to run the months, and switch between a joint that cleared fastest and one that took longest in the study that measured it. [[Pascual2007,Martillo2014]]';
  const xs=$('#cuXSvg'),xr=$('#cuXT');let dur='short';
  const XR=rng(23),XN=Array.from({length:18},()=>({x:XR(),y:XR(),a:XR()*180,l:9+XR()*7}));
  function xCount(mo){const end=dur==='short'?3:33;if(mo<=0)return 7.5;if(dur==='short')return lerp(7.5,0,ease(ramp(mo,0,end)));return mo<=3?lerp(7.5,3,mo/3):lerp(3,0,ease(ramp(mo,3,end)))}
  function suOf(mo){return lerp(8.4,4.6,ease(ramp(mo,0,3)))}
  function drawX(u){
    const N=vb(xs,'720 360','400 560');
    const mo=u*36,cnt=xCount(mo),su=suOf(mo),end=dur==='short'?3:33;
    const L=N?{fx:200,fy:150,fr:110, gx0:46,gx1:384,gy0:330,gy1:470, ax:500}:{fx:150,fy:176,fr:124, gx0:330,gx1:700,gy0:60,gy1:250, ax:290};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="24" class="t-sm" style="fill:var(--sea)">JOINT FLUID · ONE 400× FIELD</text>`;
    s+=`<circle cx="${L.fx}" cy="${L.fy}" r="${L.fr}" style="fill:var(--panel);stroke:var(--line);stroke-width:2"/>`;
    const n=Math.ceil(cnt*2),fade=cnt*2-Math.floor(cnt*2);
    XN.slice(0,n).forEach((c,i)=>{const r=Math.sqrt(c.x)*L.fr*.78,a=c.y*6.283;s+=needle(L.fx+r*Math.cos(a),L.fy+r*Math.sin(a),c.l*1.4,c.a,i===n-1&&fade>0?fade:1)});
    for(let k=0;k<6;k++){const a=k*1.05+.4;s+=`<circle cx="${f1(L.fx+L.fr*.55*Math.cos(a))}" cy="${f1(L.fy+L.fr*.55*Math.sin(a))}" r="7" style="fill:var(--panel-2);opacity:.7"/>`}
    s+=`<text x="${L.fx}" y="${L.fy+L.fr+22}" class="t-lbl t-mid">${cnt<.05?'no crystals seen':f1(cnt)+' crystals per field'}</text>`;
    // urate and crystal count over months
    const X=m=>lerp(L.gx0,L.gx1,m/36),Yu=v=>lerp(L.gy1,L.gy0,v/10);
    s+=`<text x="${L.gx0}" y="${L.gy0-14}" class="t-sm">SERUM URATE (mg/dL) AND CRYSTALS</text>`;
    [0,6,10].forEach(v=>s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(Yu(v))}" y2="${f1(Yu(v))}" class="grid"/><text x="${L.gx0-6}" y="${f1(Yu(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(Yu(6.8))}" y2="${f1(Yu(6.8))}" style="stroke:var(--xtal);stroke-width:1.2;stroke-dasharray:2 3"/><text x="${L.gx1}" y="${f1(Yu(6.8)-4)}" class="t-xs t-end" style="fill:var(--xtal)">6.8 saturation</text>`;
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(Yu(6))}" y2="${f1(Yu(6))}" style="stroke:var(--sea);stroke-width:1.4;stroke-dasharray:5 4"/><text x="${L.gx1}" y="${f1(Yu(6)+12)}" class="t-xs t-end" style="fill:var(--sea)">target &lt; 6</text>`;
    s+=`<path d="${pathFn(v=>suOf(v*mo)/10,L.gx0,X(mo),L.gy1,L.gy0,80)}" style="fill:none;stroke:var(--gold);stroke-width:2.4"/>`;
    s+=`<path d="${pathFn(v=>xCount(v*mo)/10,L.gx0,X(mo),L.gy1,L.gy0,80)}" style="fill:none;stroke:var(--xtal);stroke-width:2.4"/>`;
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${L.gy1}" y2="${L.gy1}" class="axis"/>`;
    [0,6,12,18,24,30,36].forEach(m=>s+=`<text x="${f1(X(m))}" y="${L.gy1+15}" class="t-xs t-mid">${m}</text>`);
    s+=`<text x="${L.gx1}" y="${L.gy1+30}" class="t-xs t-end">months</text>`;
    // anchors
    const an=[[0,7.5,'median 7.5'],[3,3,'median 3 at 3 mo']];
    an.forEach(([m,v,l])=>{s+=`<circle cx="${f1(X(m))}" cy="${f1(Yu(v))}" r="4" style="fill:var(--panel);stroke:var(--xtal);stroke-width:2"/><text x="${f1(X(m)+7)}" y="${f1(Yu(v)-6)}" class="t-xs" style="fill:var(--xtal)">${l}</text>`});
    s+=`<line x1="${f1(X(end))}" x2="${f1(X(end))}" y1="${L.gy0}" y2="${L.gy1}" style="stroke:var(--good);stroke-width:1.4;stroke-dasharray:3 3"/><text x="${f1(X(end)+(end>20?-4:4))}" y="${L.gy0+10}" class="t-xs ${end>20?'t-end':''}" style="fill:var(--good)">clear by month ${end}</text>`;
    const lg=N?{x:L.gx0,y:L.gy1+48}:{x:L.gx0,y:L.gy1+48};
    s+=`<rect x="${lg.x}" y="${lg.y-8}" width="14" height="4" style="fill:var(--gold)"/><text x="${lg.x+20}" y="${lg.y-2}" class="t-xs">serum urate</text>`;
    s+=`<rect x="${lg.x+110}" y="${lg.y-8}" width="14" height="4" style="fill:var(--xtal)"/><text x="${lg.x+130}" y="${lg.y-2}" class="t-xs">crystals per field</text>`;
    xs.innerHTML=s;
    const p=phaseOf(CU_X,u);setX(p);
    $('#cuXRead').innerHTML=`<span>month <b>${f1(mo)}</b></span><span>urate <b>${f1(su)} mg/dL</b></span><span>crystals <b>${f1(cnt)}</b> per field</span><span>cleared by <b>month ${end}</b></span>`;
    $('#cuXNote').innerHTML=noteHTML(CU_X[p]);
  }
  const stopX=playWire(xr,$('#cuXPlay'),drawX,14000,'Replay','cure');
  const setX=stepWire($('#cuXSteps'),CU_X,xr,drawX,stopX);
  $$('[data-cud]').forEach(b=>b.onclick=()=>{dur=b.dataset.cud;$$('[data-cud]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawX(+xr.value)});

  /* remission */
  const rs=$('#cuRemSvg');const show={cares:true,nor:true,nurse:true};
  function drawRem(){
    const N=vb(rs,'560 320','400 330');
    const x0=N?44:60,x1=N?384:530,y0=40,y1=N?252:250,X=v=>lerp(x0,x1,v/6),Y=v=>lerp(y1,y0,v/100);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="22" class="t-sm">IN REMISSION, BY YEAR OF TREATMENT</text>`;
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    [0,1,2,3,4,5,6].forEach(v=>s+=`<text x="${f1(X(v))}" y="${y1+16}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${x1}" y="${y1+32}" class="t-xs t-end">years</text>`;
    Object.entries(CU_REM).forEach(([k,c])=>{if(!show[k])return;
      s+=`<path d="M${c.pts.map(p=>f1(X(p[0]))+' '+f1(Y(p[1]))).join('L')}" style="fill:none;stroke:${c.c};stroke-width:2.2"/>`;
      c.pts.forEach((p,j)=>{const o=c.off[j];s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="5" style="fill:${c.c};stroke:var(--panel);stroke-width:1.5"/><text x="${f1(X(p[0])+o[0])}" y="${f1(Y(p[1])+o[1])}" class="t-xs ${o[2]?'t-end':''}" style="fill:${c.c};font-weight:700">${p[1]}%</text>`})});
    let lx=x0;Object.entries(CU_REM).forEach(([k,c])=>{if(!show[k])return;s+=`<rect x="${lx}" y="${y1+42}" width="12" height="4" style="fill:${c.c}"/><text x="${lx+16}" y="${y1+48}" class="t-xs">${c.n}</text>`;lx+=N?112:150});
    if(!Object.values(show).some(Boolean))s+=`<text x="${(x0+x1)/2}" y="${(y0+y1)/2}" class="t-xs t-mid">pick a cohort above</text>`;
    rs.innerHTML=s;
  }
  $$('[data-cur]').forEach(b=>b.onclick=()=>{const k=b.dataset.cur;show[k]=!show[k];b.setAttribute('aria-pressed',show[k]);drawRem()});
  $('#cuRemNote').innerHTML=`<div class="kicker">Remission</div><h4>Defined, and reached over years</h4>
   <p>Preliminary criteria from 2016 set five domains: serum urate below 0.36 mmol/L, no flares, no tophi, pain below 2/10 and patient global below 2/10, each measured at least twice; the experts split between a 6-month and a 12-month window. The G-CAN definition (2025/2026) keeps three: 12 months with no flares, no subcutaneous tophi and urate below 6 mg/dL. It is called <i>clinical</i> remission because no domain measures complete crystal dissolution. [[deLautour2016,TabiAmponsah2026]]</p>
   <p>In the CARES trial population, remission rose from 37.4% at year 1 to 63.1% at year 6. In NOR-Gout it was 7.7%, 45.4% and 58.6% at years 1, 2 and 5. In a Dutch pragmatic trial, treat-to-target gave 39.4% against 24.0% with symptom-driven care in months 18–24. [[TabiAmponsah2025,Uhlig2025,Moses2026]]</p>
   <div class="hook"><b>Exam hook</b>Remission is not proof of a crystal-free joint: DECT still found urate deposits in <b>44%</b> of people meeting the preliminary criteria. [[Dalbeth2019ART]]</div>
   <div class="pt"><b>In plain words</b>Remission means a whole year with no flares, no lumps and a low urate. Most people get there, but it usually takes two years or more.</div>
   <p class="stage-cap">Points: ${Object.values(CU_REM).map(c=>c.n+' '+c.cite).join(' · ')}</p>`;

  /* ---- 2 · the pathway ---- */
  $('#cuRouteLede').innerHTML='Urate is made from purines by xanthine oxidase, leaves through the kidney, and forms crystals above saturation; crystals then switch on NLRP3 and IL-1β. Pick a route to see where it acts. Gold dots are urate; past the crystals they turn into the inflammatory signal. [[Chen2016,Martinon2006,Dalbeth2019NRDP]]';
  const svg=$('#cuSvg'),rg=$('#cuT');let route='none';
  const PR=rng(91),PRT=Array.from({length:30},()=>[PR(),PR(),PR()]);
  function geo(N){
    if(!N){const CX=CU_ST.map((_,i)=>70+i*136),BW=116,BY=58,BH=84,FY=186;
      return{N,CX,BW,BY,BH,FY,len:930,
        P:s=>[14+930*s,FY],sOfX:x=>(x-14)/930,
        bar:b=>(CX[b]-BW/2-9-14)/930,
        kS:(CX[2]-50-14)/930,uS:(CX[2]+50-14)/930,xS:(CX[3]-BW/2-14)/930,
        drainK:d=>[CX[2]-50,FY+d*64],drainU:d=>[CX[2]+50,FY+d*64]}}
    const SX=44,BX=68,NBW=316,NBH=52,P=66,Y0=70;
    return{N,SX,BX,NBW,NBH,P,Y0}
  }
  function pdots(t,R,pos){
    /* pos(s, kind, d) returns [x,y] or null; kinds: main, drainK, drainU, pile */
    let s='';const piled=[];const nP=30;
    const sBar=R.b>=0?pos.bar(R.b):9;
    PRT.forEach((r,i)=>{const sv=((t*1.2+i/nP)%1);
      // kidney and uricase drains
      if(sv>pos.kS&&r[0]<R.pk){const d=(sv-pos.kS)*14;if(d<1){const p=pos.drainK(d);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="4" style="fill:var(--gold);opacity:${f1(.9-.6*d)}"/>`}return}
      if(sv>pos.uS&&r[1]<R.pu){const d=(sv-pos.uS)*14;if(d<1){const p=pos.drainU(d);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="4" style="fill:var(--sea);opacity:${f1(.9-.6*d)}"/>`}return}
      if(sv>sBar&&(R.pass==null||r[2]>R.pass)){piled.push(i);return}
      const p=pos.P(sv),sig=sv>pos.xS;
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="4.4" style="fill:${sig?'var(--terra)':'var(--gold)'};opacity:.9"/>`});
    return{s,piled}
  }
  function needles(x,y,w,h,n,seed){const R=rng(seed);let s='';for(let i=0;i<n;i++)s+=needle(x+6+R()*(w-12),y+6+R()*(h-12),10,R()*180,.9);return s}
  function crystalN(t,R){if(R.xt>0)return Math.round(lerp(5,13,t));if(R.xt===0)return 9;if(R.xt<=-1)return Math.round(lerp(9,0,ease(ramp(t,.15,.95))));return Math.round(lerp(4,2,t))}
  function lvlStrip(R,x,y,N){if(!R.lvl)return '';const A=CU_LVLTXT[R.lvl],B=CU_LVLTXT[R.pipe];let s='';
    s+=`<text x="${x}" y="${y-6}" class="t-xs">mechanism</text><rect x="${x}" y="${y}" width="128" height="22" rx="7" style="fill:var(--panel);stroke:${A[1]};stroke-width:1.6"/><text x="${x+64}" y="${y+15}" class="t-xs t-mid" style="fill:${A[1]};font-weight:700">${A[0]}</text>`;
    s+=`<text x="${x+140}" y="${y-6}" class="t-xs">pipeline</text><rect x="${x+140}" y="${y}" width="128" height="22" rx="7" style="fill:var(--panel);stroke:${B[1]};stroke-width:1.6"/><text x="${x+204}" y="${y+15}" class="t-xs t-mid" style="fill:${B[1]};font-weight:700">${B[0]}</text>`;
    return s}
  function draw(t){
    const R=CU_ROUTES[route],b=R.b;
    const N=vb(svg,'960 380','400 900');
    let s=`<defs>${marker('cuA','var(--muted)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const nX=crystalN(t,R);
    if(!N){
      const G=geo(false),{CX,BW,BY,BH,FY}=G;
      s+=`<text x="14" y="30" class="t-sm" style="fill:var(--sea)">WHERE COULD WE INTERCEPT?</text>`;
      s+=`<text x="946" y="30" class="t-sm t-end">${route==='none'?'no intervention':R.n}</text>`;
      s+=`<line x1="14" x2="944" y1="${FY}" y2="${FY}" style="stroke:var(--line);stroke-width:3"/>`;
      CU_ST.forEach((st,i)=>{const dim=b>=0&&i>=b&&R.pass==null,o=dim?.3:1,reached=t>=CU_STEPS[i].from;
        s+=`<g style="opacity:${f1(o)}"><rect x="${CX[i]-BW/2}" y="${BY}" width="${BW}" height="${BH}" rx="12" style="fill:${reached?'var(--panel)':'var(--panel-2)'};stroke:${reached?(i>=4?'var(--terra)':'var(--sea)'):'var(--line)'};stroke-width:${reached?2:1.3}"/>`;
        s+=`<text x="${CX[i]}" y="${BY+24}" class="t-lbl t-mid" style="font-size:12px">${st.l[0]}</text><text x="${CX[i]}" y="${BY+40}" class="t-xs t-mid">${st.l[1]}</text>`;
        if(i===3)s+=needles(CX[i]-BW/2+4,BY+48,BW-8,BH-50,nX,7);
        else s+=`<text x="${CX[i]}" y="${BY+BH-10}" class="t-xs t-mid">${i+1}</text>`;
        s+=`<line x1="${CX[i]}" x2="${CX[i]}" y1="${BY+BH}" y2="${FY-8}" style="stroke:var(--line);stroke-width:1.2"/></g>`;
        if(i<6)s+=`<path d="M${CX[i]+BW/2+2} ${BY+BH/2} H${CX[i+1]-BW/2-4}" class="arrow" marker-end="url(#cuA)"/>`});
      // drains
      const dk=CX[2]-50,du=CX[2]+50;
      s+=`<line x1="${dk}" x2="${dk}" y1="${FY}" y2="${FY+64}" style="stroke:var(--line);stroke-width:2.4;stroke-dasharray:${R.pk>.5?'0':'4 4'}"/>`;
      s+=`<rect x="${dk-58}" y="${FY+66}" width="104" height="38" rx="9" style="fill:var(--panel);stroke:${R.pk>.5?'var(--sea)':'var(--line)'};stroke-width:${R.pk>.5?2:1.2}"/><text x="${dk-6}" y="${FY+82}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">kidney</text><text x="${dk-6}" y="${FY+96}" class="t-xs t-mid">URAT1 takes back</text>`;
      s+=`<line x1="${du}" x2="${du}" y1="${FY}" y2="${FY+64}" style="stroke:var(--line);stroke-width:2.4;stroke-dasharray:4 4;opacity:${R.pu>0?1:.4}"/>`;
      s+=`<rect x="${du-46}" y="${FY+66}" width="112" height="38" rx="9" style="fill:var(--panel);stroke:${R.pu>0?'var(--sea)':'var(--line)'};stroke-width:${R.pu>0?2:1.2};opacity:${R.pu>0?1:.55}"/><text x="${du+10}" y="${FY+82}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">uricase → allantoin</text><text x="${du+10}" y="${FY+96}" class="t-xs t-mid">${R.pu>0?'given as a drug':'missing in humans'}</text>`;
      const pos={P:G.P,bar:G.bar,kS:G.kS,uS:G.uS,xS:G.xS,drainK:G.drainK,drainU:G.drainU};
      const D=pdots(t,R,pos);s+=D.s;
      if(b>=0){const xb=CX[b]-BW/2-9;
        D.piled.forEach((i,j)=>{const col=j%4,row=Math.floor(j/4);s+=`<circle cx="${f1(xb-7-col*10)}" cy="${f1(FY-12+row*10)}" r="4" style="fill:${b>=4?'var(--terra)':'var(--gold)'};opacity:${f1(.9-row*.1)}"/>`});
        s+=`<line x1="${f1(xb)}" x2="${f1(xb)}" y1="${BY-8}" y2="${FY+22}" style="stroke:var(--bad);stroke-width:${R.pass!=null?4:6};${R.pass!=null?'stroke-dasharray:7 6;':''}stroke-linecap:round"/>`;
        s+=`<text x="${f1(xb)}" y="${BY-14}" class="t-sm t-mid" style="fill:var(--bad)">${R.pass!=null?'partial barrier':'barrier'}</text>`}
      s+=`<text x="${CX[4]-BW/2}" y="${FY+30}" class="t-xs">past the crystals: inflammatory signal</text>`;
      if(R.lvl){s+=lvlStrip(R,560,320,N);cuWrap(R.fix,40).forEach((l,i)=>s+=`<text x="14" y="${330+i*14}" class="t-xs" style="fill:var(--ink)">${i?'':'→ '}${l}</text>`)}
      else s+=`<text x="14" y="330" class="t-xs">no barrier: urate builds up, crystals grow, and the pathway runs to a flare</text>`;
      svg.innerHTML=s;
    }else{
      const G=geo(true),{SX,BX,NBW,NBH,P,Y0}=G,GAP=30,DR=80;
      const topOf=i=>Y0+i*P+(i>=3?DR:0)+(b>=0&&i>=b?GAP:0);
      const F0=Y0-14,F1=topOf(6)+NBH+8;
      const yS=y=>(y-F0)/(F1-F0);
      const yk=topOf(2)+NBH+22,yu=yk+36;
      const pos={P:sv=>[SX,lerp(F0,F1,sv)],bar:bb=>yS(topOf(bb)-14),kS:yS(yk),uS:yS(yu),xS:yS(topOf(3)+NBH),
        drainK:d=>[lerp(SX,170,d),yk],drainU:d=>[lerp(SX,296,d),yu]};
      s+=`<text x="14" y="26" class="t-sm" style="fill:var(--sea)">WHERE COULD WE INTERCEPT?</text>`;
      s+=`<text x="14" y="42" class="t-xs">${route==='none'?'no intervention':'route: '+R.n}</text>`;
      s+=`<line x1="${SX}" x2="${SX}" y1="${F0}" y2="${f1(F1)}" style="stroke:var(--line);stroke-width:3"/>`;
      CU_ST.forEach((st,i)=>{const dim=b>=0&&i>=b&&R.pass==null,o=dim?.3:1,reached=t>=CU_STEPS[i].from,y=topOf(i),h=NBH;
        s+=`<g style="opacity:${f1(o)}"><line x1="${SX}" x2="${BX-6}" y1="${f1(y+NBH/2)}" y2="${f1(y+NBH/2)}" style="stroke:var(--line);stroke-width:1.2"/>`;
        s+=`<rect x="${BX}" y="${f1(y)}" width="${NBW}" height="${h}" rx="12" style="fill:${reached?'var(--panel)':'var(--panel-2)'};stroke:${reached?(i>=4?'var(--terra)':'var(--sea)'):'var(--line)'};stroke-width:${reached?2:1.3}"/>`;
        s+=`<text x="${BX+14}" y="${f1(y+21)}" class="t-lbl">${i+1} · ${st.l[0]}</text><text x="${BX+14}" y="${f1(y+37)}" class="t-xs">${st.l[1]}</text>`;
        if(i===3)s+=needles(BX+150,y+6,NBW-160,h-12,nX,7);
        s+='</g>'});
      // drains
      [[yk,170,'kidney · URAT1 takes back',R.pk>.5],[yu,296,R.pu>0?'uricase → allantoin (given)':'uricase: missing in humans',R.pu>0]].forEach(([y,x,l,on],k)=>{
        s+=`<line x1="${SX}" x2="${x-4}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:2;stroke-dasharray:${on?'0':'4 4'};opacity:${k&&!on?.45:1}"/>`;
        s+=`<text x="${SX+14}" y="${y-6}" class="t-xs" style="fill:${on?'var(--sea)':'var(--muted)'};font-weight:${on?700:500}">${l}</text>`});
      const D=pdots(t,R,pos);s+=D.s;
      if(b>=0){const yb=topOf(b)-14;
        D.piled.forEach((i,j)=>{const col=j%4,row=Math.floor(j/4);s+=`<circle cx="${f1(SX-16+col*10)}" cy="${f1(yb-7-row*9)}" r="4" style="fill:${b>=4?'var(--terra)':'var(--gold)'};opacity:${f1(.9-row*.12)}"/>`});
        s+=`<line x1="14" x2="386" y1="${f1(yb)}" y2="${f1(yb)}" style="stroke:var(--bad);stroke-width:${R.pass!=null?4:6};${R.pass!=null?'stroke-dasharray:7 6;':''}stroke-linecap:round"/>`;
        s+=`<text x="386" y="${f1(yb-6)}" class="t-sm t-end" style="fill:var(--bad)">${R.pass!=null?'partial barrier':'barrier'}</text>`}
      let y=F1+26;
      if(R.lvl){s+=lvlStrip(R,14,y+10,N);y+=48;cuWrap(R.fix,58).forEach(l=>{s+=`<text x="14" y="${f1(y)}" class="t-xs" style="fill:var(--ink)">${l}</text>`;y+=14})}
      else{cuWrap('No barrier: urate builds up, crystals grow, and the pathway runs to a flare.',58).forEach(l=>{s+=`<text x="14" y="${f1(y)}" class="t-xs">${l}</text>`;y+=14})}
      svg.setAttribute('viewBox','0 0 400 '+Math.round(y+10));
      svg.innerHTML=s;
    }
    const p=phaseOf(CU_STEPS,t);setSt(p);
    let extra='';
    if(R.lvl)extra=`<div class="kv"><div><dt>Route · ${R.n}</dt><dd><div class="evrow"><span class="t-sm">mechanism</span>${CU_LVL[R.lvl]}<span class="t-sm">pipeline</span>${CU_LVL[R.pipe]}</div></dd></div>`+
      `<div><dt>What it does</dt><dd>${R.fix}</dd></div><div><dt>Best evidence</dt><dd>${R.ev}</dd></div><div><dt>Main obstacle</dt><dd>${R.obs}</dd></div></div>`+
      `<div class="cards" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">${R.cards.map(c=>`<div class="card cu-card">${CU_LVL[c[1]]}<h4 style="font-size:16px">${c[0]}</h4><p>${c[2]} ${c[3]}</p></div>`).join('')}</div>`;
    $('#cuNote').innerHTML=noteHTML(CU_STEPS[p])+extra;
    $('#cuCap').textContent=`Stage ${p+1} of 7 · ${route==='none'?'no intervention':R.n}. Schematic pathway, not to scale; the dot shares are illustrative.`;
  }
  const stop=playWire(rg,$('#cuPlay'),draw,18000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CU_STEPS,rg,draw,stop);
  $$('[data-cu]').forEach(btn=>btn.onclick=()=>{route=btn.dataset.cu;$$('[data-cu]').forEach(x=>x.setAttribute('aria-pressed',x===btn));draw(+rg.value)});
  $('#cuTbl').innerHTML=CU_TBL.map((r,i)=>`<tr><td>${r[0]}</td><th>${r[1]}</th><td>${r[2]} ${CU_TBLC[i]}</td><td>${CU_LVL[r[3]]}</td><td class="cu-reg">${r[4]}</td><td>${r[5]}</td></tr>`).join('');

  /* ---- 3 · implementation gap ---- */
  $('#cuGapLede').innerHTML='The cure exists in principle; it rarely arrives. Among 94,759 people with new gout in Catalan primary care, followed for a median 5.44 years, 37.30% never received urate-lowering therapy and only 12.40% had good control. When care is organised, the gap closes. [[Pou2026,Doherty2018]]';
  const gs=$('#cuGapSvg');let gpop='cat';
  function drawGap(){
    const N=vb(gs,'560 330','400 400');
    const D=gpop==='cat'
      ?{t:'NEW GOUT IN PRIMARY CARE · CATALONIA',seg:[[37.3,'never on urate-lowering therapy','var(--panel-2)'],[50.3,'treated, not well controlled','var(--gold)'],[12.4,'good control (< 6 mg/dL for ≥ 80% of follow-up)','var(--sea)']],src:'Pou 2026 · 94,759 people · middle band derived as 100 − 37.30 − 12.40'}
      :{t:'NURSE-LED CARE · URATE < 6 mg/dL AT 2 YEARS',seg:[[5.1,'not at target (derived)','var(--panel-2)'],[94.9,'at target','var(--sea)']],src:'Doherty 2018 · 255 people · usual care in the same trial: 29.71%'};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/><text x="16" y="24" class="t-sm">${D.t}</text>`;
    const cs=N?26:20,gx=N?(400-10*cs)/2:24,gy=40;
    let k=0;const col=[];D.seg.forEach(([v,l,c])=>{const n=Math.round(v);for(let i=0;i<n&&col.length<100;i++)col.push(c)});while(col.length<100)col.push(D.seg[D.seg.length-1][2]);
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10;s+=`<rect x="${gx+c*cs}" y="${gy+r*cs}" width="${cs-3}" height="${cs-3}" rx="3" style="fill:${col[i]};stroke:var(--line)"/>`}
    const lx=N?16:gx+10*cs+18,ly=N?gy+10*cs+24:gy+16;
    D.seg.forEach(([v,l,c],i)=>{const y=ly+i*(N?32:46);s+=`<rect x="${lx}" y="${y-10}" width="14" height="14" rx="3" style="fill:${c};stroke:var(--line)"/><text x="${lx+22}" y="${y+2}" class="t-lbl">${f1(v)}%</text>`;
      cuWrap(l,N?50:34).forEach((ll,j)=>s+=`<text x="${lx+(N?72:22)}" y="${y+(N?2:16)+j*13}" class="t-xs">${ll}</text>`)});
    cuWrap(D.src,N?60:40).forEach((l,i)=>s+=`<text x="${N?16:lx}" y="${(N?ly+D.seg.length*32+6:gy+10*cs-24)+i*13}" class="t-xs" style="fill:var(--muted)">${l}</text>`);
    gs.innerHTML=s;
    $('#cuGapNote').innerHTML=gpop==='cat'
      ?`<div class="kicker">Real-world care</div><h4>Most people never reach the target</h4><p>In Catalonia, 37.30% of people with incident gout never received urate-lowering therapy and 12.40% kept urate below 6 mg/dL for at least 80% of follow-up, with no improvement from 2012 to 2023. In the UK in 2012, only 37.63% of people consulting for gout received urate-lowering therapy, and adherence was 39.66%. [[Pou2026,Kuo2015]]</p><div class="hook"><b>Exam hook</b>The bottleneck is implementation, not chemistry: <b>12.4%</b> good control in primary care. [[Pou2026]]</div><div class="pt"><b>In plain words</b>The medicines that can dissolve crystals already exist. Most people with gout just never get them, or never get the dose high enough.</div>`
      :`<div class="kicker">Organised care</div><h4>The same drugs, a different result</h4><p>Nurse-led treat-to-target care reached urate below 360 µmol/L at 2 years in 94.88% against 29.71% with usual GP care (RR 3.18), at £5066 per QALY. The number of people with gout is projected to rise from 55.8 million in 2020 to 95.8 million in 2050, so the gap grows in absolute terms. [[Doherty2018,GBD2024Gout]]</p><div class="hook"><b>Exam hook</b>Nurse-led treat-to-target: <b>95% vs 30%</b> at target at 2 years. [[Doherty2018]]</div><div class="pt"><b>In plain words</b>With regular checks and someone raising the dose, almost everyone gets there.</div>`;
  }
  $$('[data-cug]').forEach(b=>b.onclick=()=>{gpop=b.dataset.cug;$$('[data-cug]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawGap()});

  /* ---- open questions ---- */
  const Q=[
   ['Lifelong treatment, or a holiday once crystals clear?',`ACR 2020 conditionally favours indefinite urate-lowering therapy, at very low certainty. Perez-Ruiz proposed about 5 years of treatment then a pause guided by urate. GO TEST Finale (at least 278 people in remission) and STING (NCT06956885, about 450, not yet recruiting) are testing it. [[FitzGerald2020,PerezRuiz2006,Peeters2023,NCT06956885]]`],
   ['Is clinical remission the same as a crystal-free joint?',`Of people meeting remission criteria, 44% still had DECT urate deposits. G-CAN calls its definition "clinical" for this reason, and no validated imaging-remission endpoint exists. [[Dalbeth2019ART,TabiAmponsah2026]]`],
   ['Why do only some people with high urate form crystals?',`About half of people with urate at or above 10 mg/dL stayed gout-free for 15 years. Silent deposits appear in 24% on DECT and 38.7% on ultrasound. The TIGER cohort is following people with asymptomatic hyperuricaemia to see who progresses. [[Dalbeth2018ARD,Dalbeth2015,Stewart2026US]]`],
   ['Should asymptomatic hyperuricaemia be treated?',`FREED reported fewer composite events with febuxostat, driven by kidney impairment; CKD-FIX and PERL found no kidney benefit from allopurinol; ACR advises against routine treatment. [[Kojima2019,Badve2020,Doria2020,FitzGerald2020]]`],
   ['Can new URAT1 and xanthine oxidase inhibitors beat allopurinol titrated to target?',`Dotinurad 4 mg beat febuxostat 40 mg, a low febuxostat dose. EURELIA 2 (allopurinol up to 800 mg) and the dotinurad-versus-allopurinol trial are unreported or recruiting. [[Sun2025,NCT05586971,NCT07089875]]`],
   ['Tolerance induction or methotrexate for uricase?',`NASP reached 51% response against 8% on placebo with infusion reactions in 4%; pegloticase plus methotrexate reached 71.0% with 4.2%. The trials used different comparators, and there is no head-to-head trial. [[Baraf2026,Botson2023]]`],
   ['Oral NLRP3 inhibitors or IL-1 antibodies for flares?',`Canakinumab and firsekibart have phase 3 and regulatory evidence. Oral NLRP3 inhibition has only an open-label phase 2a; the placebo-controlled dapansutrile trial is recruiting. [[Schlesinger2012,Crescioli2026,Kluck2020,NCT05658575]]`]
  ];
  $('#cuQA').innerHTML=Q.map((q,i)=>`<details><summary>${String(i+1).padStart(2,'0')} · ${q[0]}</summary><p>${q[1]}</p></details>`).join('');
  $('#cuClose').innerHTML=`<h3 class="sub">Where this leaves us</h3>
   <p>Gout already has a cure in the sense that matters most: urate held below target dissolves the crystals that cause it, and the drugs to do that have existed since 1966. The pipeline adds more potent and more convenient ways to lower urate, and better ways to stop a flare, but none of them changes the basic rule that crystals go only when urate stays low. [[Pascual2007,DrugsFDA-Zyloprim,Dalbeth2021]]</p>
   <p>The larger gap is delivery. In primary care most people never reach the target, while organised nurse-led care gets almost everyone there with the same drugs. [[Pou2026,Doherty2018]]</p>
   <div class="pt"><b>In plain words</b>The cure for gout is keeping urate low for years. The new medicines may make that easier. The hard part is still getting the right dose to every person who needs it. This page is not advice about anyone's treatment.</div>`;

  const prevR=redraws.cure;redraws.cure=()=>{prevR&&prevR();drawRem();drawGap()};
  drawX(+xr.value);drawRem();draw(+rg.value);drawGap();
};
