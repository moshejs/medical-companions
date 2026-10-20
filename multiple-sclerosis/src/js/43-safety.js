/* =============== 4.3 safety & monitoring =============== */
/* ---- natalizumab PML: only the figures the research quotes, per 1,000 treated ---- */
const SF_LAB={neg:[ [0,96,.1] ],
  p0:[ [0,24,1,1],[24,48,2],[48,72,4],[72,96,2] ],      // 4th field: "fewer than"
  p1:[ [0,24,1],[24,48,6],[48,72,7],[72,96,6] ]};
const SF_BAND=['1–24','25–48','49–72','73–96'];
const SF_HO={lo:[.01,.6],mid:[.1,3.0],hi:[.2,10.0]};     // annual risk in year 1 and year 6, positive, no prior IS
const SF_AAN={lo:.2,mid:.3,hi:3};                         // after 25–36 months, no prior IS
const SF_IDX={na:'index not given',lo:'index ≤0.9',mid:'index >0.9 to 1.5',hi:'index >1.5'};
const SF_SRC={label:'Label table',bl:'Bloomgren 2012',ho:'Ho 2017',aan:'AAN 2018'};
function sfVal(src,st,m){
  const pos=st.jcv==='pos',bi=Math.min(3,Math.floor(Math.max(0,m-1e-9)/24));
  if(src==='label'){
    if(!pos)return {v:.1,txt:'1 in 10,000',band:'antibody-negative, any duration'};
    const r=(st.is?SF_LAB.p1:SF_LAB.p0)[bi];
    return {v:r[2],lt:!!r[3],txt:(r[3]?'fewer than ':'')+r[2]+' per 1,000',band:SF_BAND[bi]+' months, '+(st.is?'prior':'no prior')+' immunosuppressant'}}
  if(src==='bl'){
    if(!pos)return {v:.09,lt:'≤',txt:'≤0.09 per 1,000 (95% CI 0–0.48)',band:'antibody-negative, the lowest group'};
    if(st.is&&m>24&&m<=48)return {v:11.1,ci:[8.3,14.5],txt:'11.1 per 1,000 (95% CI 8.3–14.5)',band:'highest group (positive, prior IS, 25–48 mo); not split by index'};
    return {none:'Bloomgren 2012, as quoted in our research, gives only its lowest group (antibody-negative), its highest group (positive, prior immunosuppressant, 25–48 months) and the overall 2.1 per 1,000.'}}
  if(src==='ho'){
    if(!pos)return {v:.07,lt:'<',txt:'below 0.07 per 1,000 (95% CI 0.00–0.40)',band:'antibody-negative'};
    if(st.is)return {none:'Ho 2017\'s annual figures by index are for people without prior immunosuppressants. With them, its 6-year cumulative probability was 2.7% (95% CI 1.8–4.0), against 1.7% (1.4–2.1) without.'};
    if(st.idx==='na')return {none:'Ho 2017 splits antibody-positive patients by index. Choose an index to read its annual risk.'};
    const h=SF_HO[st.idx];
    if(m<=12)return {v:h[0],txt:h[0]+' per 1,000 a year',band:'year 1, '+SF_IDX[st.idx]};
    if(m>60&&m<=72)return {v:h[1],txt:h[1].toFixed(1)+' per 1,000 a year',band:'year 6, '+SF_IDX[st.idx]};
    return {none:'Our sources quote Ho 2017\'s annual risk only for year 1 and year 6, so nothing is shown in between.'}}
  if(src==='aan'){
    if(!pos)return {none:'The AAN 2018 summary quoted here gives figures for antibody-positive patients only.'};
    if(st.is)return {none:'The AAN 2018 figures quoted here are for people without prior immunosuppression.'};
    if(st.idx==='na')return {none:'The AAN 2018 figures are split by index. Choose an index.'};
    if(m>24&&m<=36)return {v:SF_AAN[st.idx],txt:SF_AAN[st.idx]+' per 1,000',band:'after 25–36 months, '+SF_IDX[st.idx]};
    return {none:'The AAN 2018 summary quotes risk only after 25–36 months of treatment.'}}
}
/* ---- monitoring calendars: one spec per drug, drawn by a shared renderer ---- */
const SF_MON={
 fingo:{b:'Fingolimod',ti:'FINGOLIMOD · THE FIRST DOSE',max:24,tk:[0,4,8,12,16,20,24],tl:v=>v+' h',ax:'hours after the first dose',
  curve:{l:'Heart rate (schematic, no values)',fn:h=>h<.5?.85:h<5?lerp(.85,.25,ease(ramp(h,.5,5))):h<9?lerp(.25,.6,ease(ramp(h,5,9))):h<14?lerp(.6,.45,ease(ramp(h,9,14))):lerp(.45,.7,ease(ramp(h,14,24))),
   ann:[ {a:.7,v:.95,lab:['falls within 1 h','falls within 1 h']},{a:5,v:.08,lab:['lowest within 6 h','lowest within 6 h'],al:'m'},{a:14,v:.28,lab:['second dip within 24 h','2nd dip, 24 h'],al:'m'} ]},
  rows:[
   {l:'ECG',it:[ {k:'tk',a:0,lab:'before',al:'s'},{k:'tk',a:6,lab:'at the end'} ]},
   {l:'Pulse and blood pressure',ln:'Pulse and blood pressure',it:[0,1,2,3,4,5,6].map(a=>({k:'tk',a,sm:1})).concat([ {k:'tx',a:0,lab:'hourly, for at least 6 hours',al:'s'} ])},
   {l:'Observation',it:[ {k:'bd',a:0,b:6,lab:['at least 6 hours','≥6 hours'],lp:'in'},{k:'bd',a:6,b:9,dash:1,lab:['longer if HR <45 bpm at 6 h, AV block, or lowest HR at the end','longer if HR <45 at 6 h, AV block, late nadir'],lp:'below'} ]},
   {l:'After a break',it:[ {k:'tk',a:0,lab:['repeat all of this if dosing stops for more than 14 days','repeat after a break of more than 14 days'],al:'s'} ]}],
  cap:`Before starting, the label lists a CBC, liver tests within 6 months, VZV antibodies (vaccinate if negative), a fundus examination at baseline and again at 3–4 months, and a skin examination. Symptomatic bradycardia occurred in 0.6% (placebo 0.1%); heart rate returns to baseline within a month. [[GilenyaLabel2026]]`,
  note:{k:'Fingolimod · label',t:'Watching the first dose',txt:`The label says to observe every patient for bradycardia for at least 6 hours after the first dose, with hourly pulse and blood pressure and an ECG before and at the end. Observation is extended if the adult heart rate is below 45 bpm at 6 hours, if there is AV block, or if the lowest rate falls at the end of the period. Heart rate starts falling within an hour, is lowest within 6 hours and dips again within 24 hours. Macular oedema occurred in 0.5% (4/783) on 0.5 mg and 0.4% on placebo, mostly in the first 3–4 months. [[GilenyaLabel2026]]`,
   pt:'The first fingolimod tablet slows the heart for a few hours, so the label asks for a day of checks: a heart tracing before and after, and pulse and blood pressure every hour.',
   hook:'Fingolimod: <b>≥6 h first-dose observation</b>, hourly pulse and BP, ECG before and after; <b>repeat after a break of more than 14 days</b>.'}},
 fum:{b:'Fumarates',ti:'DIMETHYL AND DIROXIMEL FUMARATE',max:30,tk:[0,6,12,18,24,30],tl:v=>String(v),ax:'months on treatment',
  curve:{l:'Lymphocytes (illustrative trace, not data)',fn:m=>m<3?lerp(1.6,1.0,m/3)/2:m<9?lerp(1.0,.45,ease(ramp(m,3,9)))/2:(.43+.02*Math.sin(m))/2,
   thr:{v:.25,lab:['0.5 × 10⁹/L','0.5 × 10⁹/L']},
   ann:[ {a:9,v:.6,lab:['below 0.5 for more than 6 months: consider interruption','under 0.5 for >6 mo: consider interruption'],show:15,col:'var(--bad)'} ]},
  rows:[
   {l:'Dose (dimethyl fumarate)',ln:'Dose, dimethyl fumarate',it:[ {k:'bd',a:0,b:30,lab:['twice daily: 120 mg for 7 days, then 240 mg','twice daily: 120 mg for 7 days, then 240 mg'],lp:'in',col:'var(--brand)'} ]},
   {l:'CBC with lymphocytes',it:[ {k:'tk',a:0,lab:'before',al:'s'},{k:'tk',a:6,lab:'6 months'},{k:'bd',a:6,b:30,dash:1,lab:'then every 6–12 months',lp:'in'} ]},
   {l:'After stopping',it:[ {k:'tx',a:0,lab:['keep checking counts until they recover','keep checking counts to recovery'],al:'s'} ]}],
  cap:`The fumarate labels list PML and liver injury as warnings. Diroximel fumarate follows the same plan at 231 mg, then 462 mg, twice daily. Non-enteric-coated aspirin up to 325 mg 30 minutes before a dose “may reduce” flushing. [[TecfideraLabel2025,VumerityLabel2025]]`,
  note:{k:'Fumarates · labels',t:'Lymphocyte counts',txt:`The labels require a CBC with lymphocyte count before starting, after 6 months and every 6–12 months thereafter, and advise considering interruption if lymphocytes stay below 0.5 × 10⁹/L for more than 6 months. The trace drawn here is an illustration of that rule, not trial data. Flushing occurred in 40% on dimethyl fumarate versus 6% on placebo, and GI events were most frequent in month 1. In EVOLVE-MS-2, GI adverse events were 34.8% on diroximel versus 49.0% on dimethyl fumarate. [[TecfideraLabel2025,VumerityLabel2025,Naismith2020]]`,
   pt:'These tablets can lower a type of white blood cell. Regular blood counts catch a drop that lasts, and the label then suggests a pause.',
   hook:'Fumarates: CBC <b>before, at 6 months, then every 6–12 months</b>; consider interruption if lymphocytes stay <b>&lt;0.5 × 10⁹/L for &gt;6 months</b>.'}},
 clad:{b:'Cladribine',ti:'CLADRIBINE TABLETS · TWO YEARLY COURSES',max:48,tk:[0,12,24,36,48],tl:v=>String(v),ax:'months from the first course',
  rows:[
   {l:'Treatment courses',it:[ {k:'tk',a:0,lab:['course 1 (2 cycles)','course 1'],al:'s',big:1},{k:'tk',a:12,lab:'course 2',al:'s',big:1} ]},
   {l:'Lymphocyte checks',it:[ {k:'tk',a:0,lab:'normal',al:'s'},{k:'tk',a:2,sm:1},{k:'tk',a:6,sm:1},{k:'tk',a:12,lab:'≥800/µL'},{k:'tk',a:14,sm:1},{k:'tk',a:18,sm:1} ]},
   {l:'Course 2 may wait',it:[ {k:'bd',a:12,b:18,dash:1,lab:['up to 6 months, for lymphocytes to recover','up to 6 months to recover'],lp:'after'} ]},
   {l:'No further cladribine',it:[ {k:'bd',a:24,b:48,col:'var(--muted)',lab:['none in the following 2 years','none in the next 2 years'],lp:'in'} ]}],
  cap:`Small ticks are the CBCs at 2 and 6 months after the start of each course; the label adds monthly counts if the month-2 count is below 200 cells/µL, with herpes prophylaxis below 200. The boxed warning covers malignancy and teratogenicity. [[MavencladLabel2026]]`,
  note:{k:'Cladribine · label',t:'Two short courses, then nothing',txt:`Cumulative 3.5 mg/kg is split into 2 yearly courses of 1.75 mg/kg, each of 2 cycles of 4 or 5 days. Lymphocytes must be normal before course 1 and at least 800 cells/µL before course 2, which can wait up to 6 months; if recovery takes longer, no further cladribine is given. None is given in the following 2 years, because <q>Treatment during these 2 years may further increase the risk of malignancy</q>. In the label 87% had lymphopenia; the nadir fell below 500 cells/µL in 26% and below 200 in 1%, and median recovery to at least 800 took about 28 weeks. Malignancies: 0.27 events per 100 patient-years. [[MavencladLabel2026]]`,
   pt:'Cladribine is taken for a few days in each of two years, then not again for at least two years. Blood counts decide whether the second year can go ahead.',
   hook:'Cladribine: lymphocytes <b>normal before course 1, ≥800/µL before course 2</b>; then <b>no cladribine for 2 years</b>.'}},
 alem:{b:'Alemtuzumab',ti:'ALEMTUZUMAB · CHECKS FOR 4 YEARS AFTER THE LAST DOSE',max:64,tk:[0,12,24,36,48,60],tl:v=>String(v),ax:'months from the first course',
  vl:[ {a:60,lab:['48 months after the last infusion','48 mo after last dose']} ],
  rows:[
   {l:'Courses, 12 mg/day',it:[ {k:'tk',a:0,lab:'5 days',al:'s',big:1},{k:'tk',a:12,lab:'3 days',al:'s',big:1} ]},
   {l:'Stroke window',it:[ {k:'mk',a:0},{k:'mk',a:12,lab:['within 3 days of an infusion (boxed warning)','within 3 days of an infusion'],al:'s'} ]},
   {l:'Herpes prophylaxis',it:[ {k:'bd',a:0,b:2,col:'var(--good)'},{k:'bd',a:12,b:14,col:'var(--good)',lab:['at least 2 months after each course','≥2 months after each course'],lp:'after'} ]},
   {l:'Monthly blood and urine',it:Array.from({length:60},(_,i)=>({k:'tk',a:i+1,sm:1})).concat([ {k:'tx',a:0,lab:['CBC with differential, creatinine, urinalysis: every month','CBC, creatinine, urinalysis monthly'],al:'s'} ])},
   {l:'Thyroid function',it:Array.from({length:20},(_,i)=>({k:'tk',a:3*(i+1),sm:1})).concat([ {k:'tx',a:0,lab:'every 3 months, for the same period',al:'s'} ])},
   {l:'Skin examination',it:[0,12,24,36,48,60].map(a=>({k:'tk',a,sm:1})).concat([ {k:'tx',a:0,lab:'at baseline, then yearly',al:'s'} ])}],
  cap:`The label reports thyroid disorders in 36.8% (with new cases more than 7 years after the first dose) and immune thrombocytopenia in 2%, some diagnosed more than 3 years after the last dose. Each 4-hour infusion needs 2 hours of monitoring afterwards, and herpes prophylaxis continues until CD4+ counts reach at least 200 cells/µL if that is later. [[LemtradaLabel2025]]`,
  note:{k:'Alemtuzumab · label',t:'Two courses, four years of checks',txt:`Monitoring runs until 48 months after the last infusion: CBC with differential, serum creatinine and urinalysis with cell counts every month, thyroid function every 3 months, and skin examination at baseline and yearly. The boxed warning covers autoimmunity, infusion reactions, stroke (ischaemic or haemorrhagic, <q>within 3 days</q> of administration) and malignancies. In CARE-MS I, thyroid adverse events occurred in 18% and immune thrombocytopenia in 1% by 24 months. [[LemtradaLabel2025,Cohen2012]]`,
   pt:'Alemtuzumab is given on a few days in two years, but the immune system can turn on the thyroid, platelets or kidneys years later. That is why monthly blood and urine tests continue for four years after the last dose.',
   hook:'Alemtuzumab: <b>monthly CBC, creatinine and urinalysis, and 3-monthly thyroid tests, until 48 months after the last infusion</b>.'}},
 teri:{b:'Teriflunomide',ti:'TERIFLUNOMIDE · AFTER STOPPING',max:24,tk:[0,4,8,12,16,20,24],tl:v=>String(v),ax:'months after the last dose',
  curve:{l:'Plasma level after stopping (schematic)',fn:m=>Math.exp(-Math.log(20)/8*m),fn2:m=>Math.exp(-Math.log(50)/.36*m),
   thr:{v:.05,lab:['0.02 mg/L: the level to confirm before a planned pregnancy','0.02 mg/L: target before pregnancy']},
   ann:[ {a:1.4,v:.92,lab:['without accelerated elimination','without accelerated elimination']} ]},
  rows:[
   {l:'Without elimination',it:[ {k:'bd',a:0,b:8,lab:['on average 8 months to fall below 0.02 mg/L','8 months on average'],lp:'below'},{k:'bd',a:8,b:24,dash:1,lab:'up to 2 years',lp:'in'} ]},
   {l:'Accelerated elimination',it:[ {k:'bd',a:0,b:.36,col:'var(--rx)'},{k:'tk',a:.36,lab:['11 days: cholestyramine 8 g every 8 h or charcoal 50 g every 12 h','11 days of cholestyramine or charcoal'],al:'s'} ]}],
  cap:`When starting, the label requires transaminases and bilirubin within 6 months before, ALT at least monthly for 6 months, a CBC, latent tuberculosis screening and blood-pressure checks. The boxed warning covers hepatotoxicity and embryofetal toxicity. [[AubagioLabel2026]]`,
  note:{k:'Teriflunomide · label',t:'A drug that lingers',txt:`Without accelerated elimination, clearance <q>may take as long as 2 years</q>; levels take on average 8 months to fall below 0.02 mg/L. Cholestyramine 8 g every 8 hours, or activated charcoal 50 g every 12 hours, for 11 days lowers levels by more than 98%. Women who wish to become pregnant must stop and confirm a level below 0.02 mg/L, and men wishing to father a child are told the same. Accelerated elimination may allow disease activity to return. [[AubagioLabel2026]]`,
   pt:'Teriflunomide stays in the blood for months after the last tablet. An 11-day course of a binding medicine clears it quickly, and a blood test confirms it has gone.',
   hook:'Teriflunomide: <b>accelerated elimination 11 days</b> (cholestyramine or charcoal); otherwise up to 2 years to reach <b>&lt;0.02 mg/L</b>.'}},
 s1p:{b:'Ozanimod and other S1P',ti:'S1P MODULATORS · STARTING DOSES',max:16,tk:[0,2,4,6,8,10,12,14,16],tl:v=>String(v),ax:'days from the first dose',
  steps:{l:'Ozanimod dose (label titration)',st:[ [1,5,.23,'0.23 mg'],[5,8,.46,'0.46 mg'],[8,16,.92,'0.92 mg from day 8'] ]},
  rows:[
   {l:'Ponesimod',it:[ {k:'bd',a:1,b:15,lab:['14-day titration from 2 mg to 20 mg','14 days: 2 mg up to 20 mg'],lp:'in'},{k:'bd',a:15,b:16,col:'var(--rx)'} ]},
   {l:'Before the first dose',it:[ {k:'tk',a:0,lab:['ECG and CBC (ozanimod, ponesimod)','ECG and CBC'],al:'s'} ]},
   {l:'Siponimod',it:[ {k:'tk',a:0,lab:['CYP2C9 genotype first: *3/*3 contraindicated; *1/*3 and *2/*3 take 1 mg','CYP2C9 genotype first; *3/*3: not used'],al:'s'} ]}],
  cap:`The marketed ozanimod dose is labelled 0.92 mg; the trials call the same dose “1 mg” (as ozanimod hydrochloride). In SUNBEAM and RADIANCE, no symptomatic first-dose bradycardia or second- or third-degree AV block was reported on ozanimod. [[ZeposiaLabel2026,Comi2019,Cohen2019]]`,
  note:{k:'S1P modulators · labels',t:'Stepping up the dose',txt:`Ozanimod is titrated: 0.23 mg on days 1–4, 0.46 mg on days 5–7, then 0.92 mg from day 8. Ponesimod rises from 2 mg to 20 mg over 14 days. Both labels require a baseline ECG and CBC. Siponimod needs CYP2C9 genotyping first: *3/*3 is a contraindication, and *1/*3 and *2/*3 carriers take 1 mg instead of 2 mg; first-dose monitoring is recommended with pre-existing bradycardia, conduction block, prior MI or heart failure. The four S1P modulators differ in receptor selectivity: fingolimod binds S1P1,3,4,5, siponimod and ozanimod S1P1 and S1P5, ponesimod S1P1. [[ZeposiaLabel2026,PonvoryLabel2025,MayzentLabel2026,GilenyaLabel2026,Kappos2021]]`,
   pt:'The newer drugs in this family start at a low dose and step up over one to two weeks. For siponimod, the label recommends first-dose heart monitoring only for people with certain heart conditions.',
   hook:'Ozanimod is <b>0.92 mg on the label</b> and “1 mg” in the trials: the same dose, named for the base or the hydrochloride salt.'}},
 cd20:{b:'Anti-CD20',ti:'OCRELIZUMAB IV · INFUSIONS AND VACCINES',max:13,tk:[0,3,6,9,12],tl:v=>String(v),ax:'months from the first infusion',
  rows:[
   {l:'Before the first dose',it:[ {k:'tk',a:0,lab:['hepatitis B screen, immunoglobulins, liver tests','HBV, immunoglobulins, liver tests'],al:'s'} ]},
   {l:'Ocrelizumab infusions',it:[ {k:'tk',a:0,lab:['300 mg + 300 mg','300+300'],al:'s',big:1},{k:'tk',a:.46,big:1},{k:'tk',a:6,lab:'600 mg',big:1},{k:'tk',a:12,lab:'600 mg',big:1} ]},
   {l:'Inactivated vaccines',it:[ {k:'bd',a:3.46,b:4.62,col:'var(--good)'},{k:'bd',a:4.62,b:5.08,col:'var(--good)',dash:1},{k:'bd',a:9,b:10.62,col:'var(--good)'},{k:'bd',a:10.62,b:11.08,col:'var(--good)',dash:1},
     {k:'tx',a:0,lab:['window: ≥3 months after an infusion, 4–6 weeks before the next','≥3 months after, 4–6 weeks before next'],al:'s'} ]},
   {l:'Live vaccines',it:[ {k:'bd',a:0,b:13,col:'var(--bad)',dash:1,lab:['avoided during treatment and until B-cell repletion','avoided until B-cell repletion'],lp:'in'} ]},
   {l:'Immunoglobulins',it:[ {k:'bd',a:0,b:13,dash:1,lab:['at the start, during treatment, and after stopping','start, during, after stopping'],lp:'in'} ]}],
  cap:`Premedication with methylprednisolone and an antihistamine before every infusion, observation for at least 1 hour after each, and infusion reactions in 34.3% in OPERA I and II. Ofatumumab is 20 mg under the skin at weeks 0, 1 and 2, then monthly from week 4; ublituximab is 150 mg, then 450 mg two weeks later, then every 24 weeks. Vaccine timing follows the ECTRIMS/EAN 2023 consensus. [[OcrevusLabel2026,Hauser2017,KesimptaLabel2026,BriumviLabel2026,OteroRomero2023]]`,
  note:{k:'Anti-CD20 · labels and consensus',t:'Timing vaccines around infusions',txt:`The ocrelizumab label schedules 300 mg IV, 300 mg two weeks later, then 600 mg every 6 months, after hepatitis B screening, quantitative immunoglobulins and liver tests. The anti-CD20 labels recommend monitoring immunoglobulins at the start, during treatment and after stopping until B cells recover, and no live or live-attenuated vaccines during treatment or until B-cell repletion. The ECTRIMS/EAN 2023 consensus places inactivated vaccines <q>at least 3 months after the last anti-CD20 treatment and 4–6 weeks before the next infusion</q>, the green windows. [[OcrevusLabel2026,KesimptaLabel2026,BriumviLabel2026,OteroRomero2023]]`,
   pt:'These drugs clear B cells for months. Vaccines work best when given in the gap between infusions, and live vaccines wait until the B cells have come back.',
   hook:'Anti-CD20: inactivated vaccines <b>≥3 months after an infusion and 4–6 weeks before the next</b>; <b>no live vaccines</b> until B-cell repletion.'}}
};
inits.safety=()=>{
  /* =========== PML explainer =========== */
  const svg=$('#sfSvg'),rg=$('#sfT');
  const st={jcv:'pos',idx:'na',is:0,src:'label',scl:'log',eid:0};
  const lg=Math.log10;
  function iconGrid(x0,y0,cols,rows,cell,v,lt,col){
    const r=cell*.36;let g=`<defs><pattern id="sfDot" x="${x0}" y="${y0}" width="${cell}" height="${cell}" patternUnits="userSpaceOnUse"><circle cx="${cell/2}" cy="${cell/2}" r="${f1(r)}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:.6"/></pattern></defs>`;
    g+=`<rect x="${x0}" y="${y0}" width="${f1(cols*cell)}" height="${f1(rows*cell)}" style="fill:url(#sfDot)"/>`;
    if(v==null)return g+`<rect x="${x0-3}" y="${y0-3}" width="${f1(cols*cell+6)}" height="${f1(rows*cell+6)}" rx="6" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 4"/>`;
    const full=Math.floor(v+1e-9),fr=v-full,c=i=>[x0+(i%cols)*cell+cell/2,y0+Math.floor(i/cols)*cell+cell/2];
    for(let i=0;i<full;i++){const [cx,cy]=c(i);g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*1.15)}" style="fill:${col}"/>`}
    if(fr>.005){const [cx,cy]=c(full);g+=`<clipPath id="sfPart"><rect x="${f1(cx-r*1.15)}" y="${f1(cy-r*1.15)}" width="${f1(2.3*r*fr)}" height="${f1(2.3*r)}"/></clipPath><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*1.15)}" clip-path="url(#sfPart)" style="fill:${col}"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*1.15)}" style="fill:none;stroke:${col};stroke-width:.8"/>`}
    if(lt){const [cx,cy]=c(full>0&&fr<.005?full-1:full);g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*2)}" style="fill:none;stroke:${col};stroke-width:1.2;stroke-dasharray:2 2"/>`}
    return g}
  function draw(m){
    const N=vb(svg,'720 470','400 960');
    const L=N?{X0:50,X1:384,Y0:290,Y1:64,cap:[16,28],dose:340,mon:392,gx:20,gy:478,cell:9,cols:40,rows:25,ix:20,iy:450,big:[20,730],box:[16,764,368]}
             :{X0:64,X1:450,Y0:290,Y1:64,cap:[16,28],dose:340,mon:392,gx:476,gy:58,cell:5.75,cols:40,rows:25,ix:476,iy:30,big:[476,232],box:[476,276,230]};
    const X=v=>L.X0+(L.X1-L.X0)*v/96,lin=st.scl==='lin';
    const Yv=v=>lin?L.Y0+(L.Y1-L.Y0)*Math.min(v,15)/15:L.Y0+(L.Y1-L.Y0)*(lg(Math.max(v,.01))+2)/(lg(20)+2);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${L.cap[0]}" y="${L.cap[1]}" class="t-sm" style="fill:var(--rx)">PML PER 1,000 TREATED · ${lin?'LINEAR':'LOG'} SCALE</text>`;
    // grid
    (lin?[0,5,10,15]:[.01,.1,1,10]).forEach(v=>{const y=Yv(v);s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${L.X0-6}" y="${f1(y+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${L.Y0}" y2="${L.Y0}" class="axis"/>`;
    for(let v=0;v<=96;v+=12){const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.Y0}" y2="${L.Y0+5}" class="axis"/><text x="${f1(x)}" y="${L.Y0+17}" class="t-xs t-mid">${v}</text>`}
    s+=`<text x="${f1((L.X0+L.X1)/2)}" y="${L.Y0+31}" class="t-xs t-mid">months on natalizumab</text>`;
    // the label table steps
    const pos=st.jcv==='pos',selKey=!pos?'neg':st.is?'p1':'p0';
    ['neg','p0','p1'].forEach(k=>{const sel=k===selKey,strong=sel&&st.src==='label';
      let d='';SF_LAB[k].forEach(([a,b,v],i)=>{d+=(i?'L':'M')+f1(X(a))+' '+f1(Yv(v))+'L'+f1(X(b))+' '+f1(Yv(v))});
      s+=`<path d="${d}" style="fill:none;stroke:${k==='neg'?'var(--good)':'var(--attack)'};stroke-width:${strong?3:1.4};opacity:${strong?1:sel?.55:.22};${k==='p1'?'':'stroke-dasharray:'+(k==='neg'?'2 3':'7 3')}"/>`;
      if(k==='p0'&&sel)s+=`<text x="${f1(X(12))}" y="${f1(Yv(1)+13)}" class="t-xs t-mid" style="fill:var(--attack);opacity:${strong?1:.6}">fewer than 1</text>`});
    if(st.src==='label'){const lab={neg:'label: antibody-negative',p0:'label: positive, no prior IS',p1:'label: positive, prior IS'}[selKey],r=SF_LAB[selKey][Math.min(2,SF_LAB[selKey].length-1)];
      void r;s+=`<text x="${L.X0}" y="${L.Y1-26}" class="t-xs" style="fill:${pos?'var(--attack)':'var(--good)'};font-weight:700">bold line = ${lab}</text>`}
    // other sources, only when chosen
    const C2='var(--brand)';
    if(st.src==='bl'){const y=Yv(2.1);s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${C2};stroke-width:1.4;stroke-dasharray:5 4"/><text x="${L.X0+4}" y="${f1(y-5)}" class="t-xs" style="fill:${C2}">all 99,571 treated: 2.1</text>`;
      if(pos){const yy=Yv(11.1),xm=X(36.5);s+=`<line x1="${f1(X(24))}" x2="${f1(X(48))}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${C2};stroke-width:${st.is?3.2:1.6};opacity:${st.is?1:.45}"/><line x1="${f1(xm)}" x2="${f1(xm)}" y1="${f1(Yv(8.3))}" y2="${f1(Yv(14.5))}" style="stroke:${C2};stroke-width:1.6;opacity:${st.is?1:.45}"/><text x="${f1(X(48)+5)}" y="${f1(yy+3)}" class="t-xs" style="fill:${C2};font-weight:700;opacity:${st.is?1:.6}">11.1 (prior IS)</text>`}
      else{const yy=Yv(.09);s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${C2};stroke-width:3"/><text x="${f1(X(50))}" y="${f1(yy+13)}" class="t-xs" style="fill:${C2};font-weight:700">≤0.09 (Bloomgren)</text>`}}
    if(st.src==='ho'){
      if(!pos){const yy=Yv(.07);s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${C2};stroke-width:3"/><text x="${f1(X(50))}" y="${f1(yy+13)}" class="t-xs" style="fill:${C2};font-weight:700">below 0.07 (Ho)</text>`}
      else ['lo','mid','hi'].forEach(k=>{const h=SF_HO[k],sel=!st.is&&st.idx===k,o=sel?1:.3,w=sel?3:1.6;
        s+=`<g style="opacity:${o}"><line x1="${f1(X(0))}" x2="${f1(X(12))}" y1="${f1(Yv(h[0]))}" y2="${f1(Yv(h[0]))}" style="stroke:${C2};stroke-width:${w}"/><line x1="${f1(X(60))}" x2="${f1(X(72))}" y1="${f1(Yv(h[1]))}" y2="${f1(Yv(h[1]))}" style="stroke:${C2};stroke-width:${w}"/>`;
        s+=`<line x1="${f1(X(12))}" x2="${f1(X(60))}" y1="${f1(Yv(h[0]))}" y2="${f1(Yv(h[1]))}" style="stroke:${C2};stroke-width:1.2;stroke-dasharray:1 4"/><text x="${f1(X(72)+5)}" y="${f1(Yv(h[1])+3)}" class="t-xs" style="fill:${C2};font-weight:700">${h[1].toFixed(1)} ${k==='lo'?'≤0.9':k==='mid'?'0.9–1.5':'>1.5'}</text></g>`})}
    if(st.src==='aan'&&pos)['lo','mid','hi'].forEach(k=>{const v=SF_AAN[k],sel=!st.is&&st.idx===k,y=Yv(v);
      s+=`<g style="opacity:${sel?1:.35}"><line x1="${f1(X(24))}" x2="${f1(X(36))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${C2};stroke-width:${sel?3.2:1.8}"/><text x="${f1(X(36)+5)}" y="${f1(y+3)}" class="t-xs" style="fill:${C2};font-weight:700">${v} ${k==='lo'?'≤0.9':k==='mid'?'0.9–1.5':'>1.5'}</text></g>`});
    // playhead and current value
    const val=sfVal(st.src,st,m),xp=X(m);
    s+=`<line x1="${f1(xp)}" x2="${f1(xp)}" y1="${L.Y1-6}" y2="${L.Y0}" style="stroke:var(--orange);stroke-width:2"/><text x="${f1(clamp(xp,L.X0+24,L.X1-24))}" y="${L.Y1-11}" class="t-xs t-mid" style="fill:var(--orange);font-weight:700">month ${Math.round(m)}</text>`;
    if(!val.none){const y=Yv(val.v),right=xp<(L.X0+L.X1)/2,tx=val.txt.replace(' (95% CI',' (CI').replace(' per 1,000',''),tw=tx.length*5.8+10,lx=right?xp+10:xp-10-tw;
      s+=`<circle cx="${f1(xp)}" cy="${f1(y)}" r="6" style="fill:var(--orange);stroke:var(--panel);stroke-width:2"/>`;
      s+=`<rect x="${f1(lx)}" y="${f1(y-22)}" width="${f1(tw)}" height="16" rx="4" style="fill:var(--panel);stroke:var(--orange)"/><text x="${f1(lx+5)}" y="${f1(y-10.5)}" class="t-xs" style="fill:var(--ink);font-weight:700">${tx}</text>`}
    // infusion ticks: every 4 weeks, or NOVA's switch to every 6 weeks after 12 months on 4-weekly
    s+=`<text x="16" y="${L.dose+4}" class="t-xs" style="fill:var(--ink)">doses</text>`;
    for(let d=0,i=0;d<=96&&i<200;i++){const x=X(d),on=d<=m;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.dose-6}" y2="${L.dose+6}" style="stroke:${on?'var(--rx)':'var(--line)'};stroke-width:${on?1.6:1.2}"/>`;d+=st.eid&&d>=12?42/30.44:28/30.44}
    s+=`<text x="${L.X0}" y="${L.dose+22}" class="t-xs">${st.eid?(N?'NOVA: 4-weekly for 12+ months, then 6-weekly':'NOVA: 4-weekly for at least 12 months, then every 6 weeks'):(N?'every 4 weeks, as the label states':'300 mg IV every 4 weeks, as the label states')}</text>`;
    // monitoring milestones
    const mo=pos?1:.4;
    [[18,'1'],[24,'2']].forEach(([a,n])=>{const x=X(a);s+=`<g style="opacity:${mo}"><circle cx="${f1(x)}" cy="${L.mon}" r="7" style="fill:${m>=a?'var(--warn)':'var(--panel)'};stroke:var(--warn);stroke-width:1.4"/><text x="${f1(x)}" y="${L.mon+3.5}" class="t-xs t-mid" style="fill:${m>=a?'var(--panel)':'var(--warn)'};font-weight:700">${n}</text></g>`});
    [N?'1 · 18 months, JCV+: MRI every 3–6 months (R13)':'1 · from 18 months, JCV positive: MRI every 3–6 months (ECTRIMS/EAN R13)',
     N?'2 · beyond 24 months: higher risk (boxed warning)':'2 · beyond 24 months: risk higher, as the boxed warning states'].forEach((t,i)=>{s+=`<text x="${L.X0}" y="${L.mon+24+i*14}" class="t-xs" style="opacity:${mo};fill:var(--ink)">${t}</text>`});
    // icon array
    s+=`<text x="${L.ix}" y="${L.iy}" class="t-sm" style="fill:var(--attack)">IN 1,000 PEOPLE · ${SF_SRC[st.src].toUpperCase()}</text>`;
    s+=iconGrid(L.gx,L.gy,L.cols,L.rows,L.cell,val.none?null:val.v,val.lt,'var(--attack)');
    const bigT=val.none?'not stated':(val.lt?(val.lt===1||val.lt===true?'fewer than '+val.v:val.lt+val.v):String(val.v))+' in 1,000';
    s+=`<text x="${L.big[0]}" y="${L.big[1]}" class="t-big" style="fill:${val.none?'var(--muted)':'var(--attack)'}">${bigT}</text>`;
    const sub=val.none?'this source gives no figure for these inputs':(st.src==='ho'&&pos?'annual risk · ':'')+val.band;
    const wr=(t,n)=>{const ws=t.split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
    wr(sub,N?62:38).slice(0,2).forEach((t,i)=>{s+=`<text x="${L.big[0]}" y="${L.big[1]+16+i*13}" class="t-xs">${t}</text>`});
    // side box: NOVA or the inputs
    const [bx,by,bw]=L.box,BY=by+30;
    const lines=st.eid?[ ['NOVA · 499 PEOPLE','var(--rx)',1],['stable ≥12 months; new or enlarging','ink'],['T2 lesions at week 72:',''],['6-weekly 0.20 vs 4-weekly 0.05','ink'],['(ratio 4.24, CI 0.86–20.85, p=0.076)',''],['secondary estimand: 0.31 vs 0.06','ink'],['(ratio 4.93, CI 1.05–23.20, p=0.044)',''],['two outlier patients drove most of it',''],['one asymptomatic PML, 6-weekly arm','bad'],['the US label still states every 4 weeks','ink'],['no PML rate for 6-weekly dosing is',''],['quoted in our sources','']]
      :[ ['THE THREE INPUTS','var(--rx)',1],['anti-JCV antibodies: all 54 PML cases','ink'],['with an earlier sample were positive',''],['a negative test is not zero risk:','ink'],['assay false-negative rate 3%;',''],['seroconversion 3–8% a year',''],['prior immunosuppressant: higher risk','ink'],['months on drug: higher beyond 2 years','ink'],['toggle “every 6 weeks” for NOVA','']];
    s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${lines.length*14+20}" rx="10" style="fill:var(--panel);stroke:${st.eid?'var(--rx)':'var(--line)'};stroke-width:1.4"/>`;
    lines.forEach(([t,c,h],i)=>{s+=`<text x="${bx+10}" y="${by+20+i*14}" class="${h?'t-sm':'t-xs'}" style="${h?'fill:'+c:c==='ink'?'fill:var(--ink)':c==='bad'?'fill:var(--bad)':''}">${t}</text>`});
    void BY;
    svg.innerHTML=s;
    // the note: every source's statement for these inputs
    const desc=!pos?'anti-JCV negative':`anti-JCV positive, ${SF_IDX[st.idx]}, ${st.is?'prior':'no prior'} immunosuppressant`;
    const li=k=>{const v=sfVal(k,st,m);return `<li><b>${SF_SRC[k]}:</b> ${v.none?v.none:v.txt+' ('+v.band+')'}</li>`};
    $('#sfNote').innerHTML=noteHTML({k:`Month ${Math.round(m)} · ${desc}`,t:val.none?`${SF_SRC[st.src]}: no figure for these inputs`:`${SF_SRC[st.src]}: ${val.txt}`,
      txt:`<ul class="sf-src">${['label','bl','ho','aan'].map(li).join('')}</ul> Bloomgren 2012 counted 212 confirmed PML cases among 99,571 treated (2.1 per 1,000). Ho 2017 pooled 37,249 patients with 156 cases. The label table comes from US postmarketing data on about 100,000 patients. ${st.eid?'NOVA tested new lesions, not PML: the table above is unchanged by the dosing toggle.':''} [[Bloomgren2012,Ho2017,TyrukoLabel2025,RaeGrant2018,Foley2022]]`,
      pt:'Most people on natalizumab never get PML. The risk is very low without JC virus antibodies, and climbs with a high antibody index, earlier immune-suppressing drugs and more than two years of treatment.',
      hook:'Natalizumab PML risk factors: <b>anti-JCV antibodies (index), prior immunosuppressants, &gt;24 months</b>. Highest Bloomgren group: <b>11.1 per 1,000</b>; overall 2.1 per 1,000.'});
  }
  const stop=playWire(rg,$('#sfPlay'),draw,16000,'Replay','safety');
  const press=(sel,attr,val)=>$$(sel).forEach(b=>b.setAttribute('aria-pressed',b.dataset[attr]===String(val)));
  const sync=()=>{press('[data-jcv]','jcv',st.jcv);press('[data-idx]','idx',st.idx);press('[data-is]','is',st.is);press('[data-src]','src',st.src);press('[data-scl]','scl',st.scl);press('[data-eid]','eid',st.eid);
    $$('[data-idx],[data-is]').forEach(b=>{b.disabled=st.jcv==='neg'});draw(+rg.value)};
  $$('[data-jcv]').forEach(b=>b.addEventListener('click',()=>{st.jcv=b.dataset.jcv;sync()}));
  $$('[data-idx]').forEach(b=>b.addEventListener('click',()=>{st.idx=b.dataset.idx;sync()}));
  $$('[data-is]').forEach(b=>b.addEventListener('click',()=>{st.is=+b.dataset.is;sync()}));
  $$('[data-src]').forEach(b=>b.addEventListener('click',()=>{st.src=b.dataset.src;sync()}));
  $$('[data-scl]').forEach(b=>b.addEventListener('click',()=>{st.scl=b.dataset.scl;sync()}));
  $$('[data-eid]').forEach(b=>b.addEventListener('click',()=>{st.eid=+b.dataset.eid;sync()}));
  sync();

  /* =========== monitoring calendars =========== */
  const ms=$('#sfMon'),mr=$('#sfMonT');let drug='fingo';
  $('#sfDrugs').innerHTML=Object.keys(SF_MON).map(k=>`<button class="btn" data-drug="${k}" aria-pressed="${k===drug}">${SF_MON[k].b}</button>`).join('');
  function drawM(t){
    const D=SF_MON[drug],N=NARROW();
    const X0=N?20:210,X1=N?384:700,X=v=>X0+(X1-X0)*v/D.max,P=D.max*t,pick=l=>Array.isArray(l)?l[N?1:0]:l;
    let s='',y=N?36:40;
    const seg=[];
    s+=`<text x="16" y="22" class="t-sm" style="fill:var(--rx)">${D.ti}</text>`;
    (D.vl||[]).forEach(v=>{const x=X(v.a);s+=`<text x="${f1(x-4)}" y="${N?50:38}" class="t-xs t-end" style="fill:var(--warn)">${pick(v.lab)}</text>`});
    if(N&&D.vl)y=58;
    const lit=a=>a<=P+1e-6;
    // curve or dose steps
    if(D.curve||D.steps){const H=N?86:80,top=y+(N?18:8),bot=top+H,Yc=v=>bot-(H-8)*v;
      s+=N?`<text x="16" y="${y+10}" class="t-sm" style="fill:var(--ink)">${(D.curve||D.steps).l}</text>`:`<text x="16" y="${top+14}" class="t-sm" style="fill:var(--ink)">${(D.curve||D.steps).l.replace(/ \(.*/,'')}</text><text x="16" y="${top+28}" class="t-xs">${((D.curve||D.steps).l.match(/\((.*)\)/)||['',''])[1]}</text>`;
      s+=`<line x1="${X0}" x2="${X1}" y1="${bot}" y2="${bot}" class="axis"/>`;
      if(D.curve){const c=D.curve;
        if(c.thr){const ty=Yc(c.thr.v);s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--bad);stroke-width:1.2;stroke-dasharray:4 3"/><text x="${X1}" y="${f1(ty-4)}" class="t-xs t-end" style="fill:var(--bad)">${pick(c.thr.lab)}</text>`}
        [[c.fn,'var(--rx)'],[c.fn2,'var(--brand)']].forEach(([fn,col])=>{if(!fn)return;
          const pts=(a,b)=>{let d='';const n=160;for(let i=0;i<=n;i++){const v=lerp(a,b,i/n);d+=(i?'L':'M')+f1(X(v))+' '+f1(Yc(clamp(fn(v),0,1)))}return d};
          s+=`<path d="${pts(0,D.max)}" style="fill:none;stroke:${col};stroke-width:1.4;opacity:.25"/>`;
          if(P>0)s+=`<path d="${pts(0,P)}" style="fill:none;stroke:${col};stroke-width:2.6"/>`});
        (c.ann||[]).forEach(a=>{if(a.show&&P<a.show)return;const x=X(a.a),yy=Yc(a.v),txt=pick(a.lab),o=lit(a.a)?1:.35;
          s+=`<text x="${f1(a.al==='m'?x:x+4)}" y="${f1(yy)}" class="t-xs${a.al==='m'?' t-mid':''}" style="fill:${a.col||'var(--ink)'};opacity:${o}">${txt}</text>`})}
      else D.steps.st.forEach(([a,b,v,lb])=>{const w=clamp((P-a)/(b-a)),h=(H-24)*v/.92,x=X(a);
        s+=`<rect x="${f1(x+1)}" y="${f1(bot-h)}" width="${f1(X(b)-x-2)}" height="${f1(h)}" rx="3" style="fill:var(--rx-soft);stroke:var(--rx);opacity:.35"/>`;
        if(w>0)s+=`<rect x="${f1(x+1)}" y="${f1(bot-h)}" width="${f1((X(b)-x-2)*w)}" height="${f1(h)}" rx="3" style="fill:var(--rx)"/>`;
        s+=`<text x="${f1(x+3)}" y="${f1(bot-h-5)}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${lit(a)?1:.45}">${lb}</text>`});
      seg.push([top,bot]);y=bot+(N?14:16)}
    // rows
    const RH=N?58:46;
    D.rows.forEach(r=>{const ty=y+(N?28:16),ly=ty+(N?18:20);seg.push([ty-11,ty+11]);
      s+=`<text x="16" y="${N?y+12:ty+4}" class="t-sm" style="fill:var(--ink)">${N?(r.ln||r.l):r.l}</text>`;
      s+=`<line x1="${X0}" x2="${X1}" y1="${ty}" y2="${ty}" style="stroke:var(--line);stroke-width:1"/>`;
      r.it.forEach(it=>{const col=it.col||'var(--rx)',txt=it.lab?pick(it.lab):'';
        if(it.k==='bd'){const a=X(it.a),b=X(it.b),pw=clamp(X(Math.min(P,it.b))-a,0,b-a);
          s+=`<rect x="${f1(a)}" y="${ty-7}" width="${f1(Math.max(2,b-a))}" height="14" rx="4" style="fill:${it.dash?'none':col};stroke:${col};stroke-width:1.2;${it.dash?'stroke-dasharray:4 3;':''}opacity:.3"/>`;
          if(pw>0)s+=`<rect x="${f1(a)}" y="${ty-7}" width="${f1(Math.max(2,pw))}" height="14" rx="4" style="fill:${col};opacity:${it.dash?.45:.9}"/>`;
          if(txt){const o=lit(it.a)?1:.45;
            if(it.lp==='in')s+=`<text x="${f1(a+8)}" y="${ty+3.5}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${o}">${txt}</text>`;
            else if(it.lp==='after')s+=`<text x="${f1(b+6)}" y="${ty+3.5}" class="t-xs" style="opacity:${o};fill:var(--ink)">${txt}</text>`;
            else s+=`<text x="${f1(a)}" y="${ly}" class="t-xs" style="opacity:${o}">${txt}</text>`}}
        else if(it.k==='tk'){const x=X(it.a),on=lit(it.a),rr=it.sm?2.6:it.big?6:4.5;
          s+=`<circle cx="${f1(x)}" cy="${ty}" r="${rr}" style="fill:${on?col:'var(--panel)'};stroke:${col};stroke-width:1.4;opacity:${on?1:.45}"/>`;
          if(txt)s+=`<text x="${f1(it.al==='s'?x-3:x)}" y="${ly}" class="t-xs${it.al==='s'?'':' t-mid'}" style="opacity:${on?1:.45};fill:var(--ink)">${txt}</text>`}
        else if(it.k==='mk'){const x=X(it.a),on=lit(it.a);
          s+=`<path d="M${f1(x)} ${ty-8}L${f1(x+8)} ${ty+6}L${f1(x-8)} ${ty+6}z" style="fill:${on?'var(--attack)':'var(--panel)'};stroke:var(--attack);stroke-width:1.4;opacity:${on?1:.45}"/><text x="${f1(x)}" y="${ty+4.5}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--attack)'};font-weight:700">!</text>`;
          if(txt)s+=`<text x="${f1(x-3)}" y="${ly}" class="t-xs" style="opacity:${on?1:.45};fill:var(--ink)">${txt}</text>`}
        else if(it.k==='tx')s+=`<text x="${f1(X(it.a)-3)}" y="${ly}" class="t-xs" style="fill:var(--muted)">${txt}</text>`});
      y+=RH});
    // vertical lines (end of monitoring)
    const yTop=N?58:44;
    (D.vl||[]).forEach(v=>{const x=X(v.a);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${yTop}" y2="${y}" style="stroke:var(--warn);stroke-width:1.4;stroke-dasharray:3 3"/>`});
    // axis and playhead
    const ay=y+4;
    s+=`<line x1="${X0}" x2="${X1}" y1="${ay}" y2="${ay}" class="axis"/>`;
    D.tk.forEach(v=>{const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ay}" y2="${ay+5}" class="axis"/><text x="${f1(x)}" y="${ay+17}" class="t-xs t-mid">${D.tl(v)}</text>`});
    s+=`<text x="${X1}" y="${ay+31}" class="t-xs t-end">${D.ax}</text>`;
    const xp=X(P);seg.concat([ [ay-8,ay] ]).forEach(([a,b])=>{s+=`<line x1="${f1(xp)}" x2="${f1(xp)}" y1="${f1(a)}" y2="${f1(b)}" style="stroke:var(--orange);stroke-width:2;opacity:.85"/>`});
    vb(ms,`720 ${Math.ceil(ay+42)}`,`400 ${Math.ceil(ay+42)}`);
    ms.innerHTML=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`+s;
    $('#sfMonNote').innerHTML=noteHTML(D.note);$('#sfMonCap').innerHTML=D.cap;
  }
  const stopM=playWire(mr,$('#sfMonPlay'),drawM,11000,'Replay','safety');
  $$('[data-drug]').forEach(b=>b.addEventListener('click',()=>{stopM();drug=b.dataset.drug;$$('[data-drug]').forEach(x=>x.setAttribute('aria-pressed',x===b));mr.value=0;drawM(0);$('#sfMonPlay').click()}));
  drawM(+mr.value);

  /* =========== safety cards =========== */
  $('#sfCards').innerHTML=`
   <div class="card"><h4>Fingolimod</h4><ul><li>First-dose observation for at least 6 hours; repeat after a break of more than 14 days.</li><li>Before starting: CBC, liver tests, VZV antibodies, fundus examination (again at 3–4 months), skin examination.</li><li>Macular oedema 0.5% on 0.5 mg versus 0.4% on placebo.</li><li>In TRANSFORMS, two fatal herpesvirus infections, both on the unapproved 1.25 mg dose. [[GilenyaLabel2026,Cohen2010]]</li></ul></div>
   <div class="card"><h4>Fumarates</h4><ul><li>CBC with lymphocytes before, at 6 months, then every 6–12 months.</li><li>Consider interruption if lymphocytes stay below 0.5 × 10⁹/L for more than 6 months.</li><li>Warnings include PML and liver injury.</li><li>On dimethyl fumarate, flushing 40% versus 6% on placebo; 3% stopped for flushing. [[TecfideraLabel2025,VumerityLabel2025]]</li></ul></div>
   <div class="card"><h4>Cladribine tablets</h4><ul><li>Lymphopenia in 87%; nadir below 500 cells/µL in 26% on 3.5 mg/kg.</li><li>In CLARITY, lymphocytopenia as an adverse event in 21.6% versus 1.8%.</li><li>Boxed warning: malignancy (0.27 events per 100 patient-years) and teratogenicity.</li><li>Handled as a cytotoxic: dry hands, swallowed at once, at least 3 hours apart from other oral drugs. [[MavencladLabel2026,Giovannoni2010]]</li></ul></div>
   <div class="card"><span class="tag attack">Boxed warning</span><h4>Alemtuzumab</h4><ul><li>Secondary autoimmunity: thyroid disorders 36.8%, with new cases more than 7 years after the first dose; immune thrombocytopenia 2%.</li><li>Monthly CBC, creatinine and urinalysis, and 3-monthly thyroid tests, until 48 months after the last infusion.</li><li>Stroke, ischaemic or haemorrhagic, and cervicocephalic arterial dissection <q>within 3 days</q> of dosing; infusion reactions in 92% in the trials. [[LemtradaLabel2025]]</li><li>Reports date an FDA safety communication on stroke to November 2018; that date is unverified, because the FDA page no longer loads.</li><li>EU: an Article 20 review (CHMP 14 November 2019; Commission decision 16 January 2020) restricted Lemtrada to highly active RRMS despite at least one DMT, or rapidly evolving severe disease, added contraindications including prior angina, myocardial infarction, stroke, cervicocephalic arterial dissection and uncontrolled hypertension, and limited infusion to hospitals with ready access to intensive care. [[EMALemtrada2020]]</li></ul></div>
   <div class="card"><span class="tag attack">Boxed warning</span><h4>Teriflunomide</h4><ul><li>Hepatotoxicity and embryofetal toxicity.</li><li>Transaminases and bilirubin within 6 months before starting, then ALT at least monthly for 6 months; CBC, tuberculosis screening, blood pressure.</li><li>Accelerated elimination: cholestyramine 8 g every 8 hours or charcoal 50 g every 12 hours for 11 days.</li><li>In TOWER, hair thinning 13% versus 4% and ALT increase 14% versus 8%. [[AubagioLabel2026,Confavreux2014]]</li></ul></div>
   <div class="card"><h4>Ozanimod, siponimod, ponesimod</h4><ul><li>Ozanimod is labelled <b>0.92 mg</b>; the trials call the same dose “1 mg” (as ozanimod hydrochloride).</li><li>Titration: ozanimod over 8 days, ponesimod over 14 days; baseline ECG and CBC.</li><li>Siponimod: CYP2C9 genotype first; *3/*3 is a contraindication.</li><li>All four S1P labels warn of a <q>severe increase in disability</q> after stopping. [[ZeposiaLabel2026,PonvoryLabel2025,MayzentLabel2026,GilenyaLabel2026]]</li></ul></div>
   <div class="card"><h4>Anti-CD20 antibodies</h4><ul><li>Hepatitis B screening and immunoglobulins before the first dose; immunoglobulins monitored during and after.</li><li>Consider stopping for serious opportunistic or recurrent infections, or prolonged hypogammaglobulinaemia.</li><li>Infusion reactions: 34.3% on ocrelizumab in OPERA; 47.7% on ublituximab in ULTIMATE. Serious infections 5.0% versus 2.9% (ULTIMATE) and 2.5% versus 1.8% (ASCLEPIOS). [[OcrevusLabel2026,Hauser2017,Steinman2022,Hauser2020Ofatumumab]]</li></ul></div>
   <div class="card"><span class="tag attack">Boxed warning</span><h4>Natalizumab</h4><ul><li>PML: anti-JCV antibodies, duration and prior immunosuppressants are the named risk factors; prescribed only within a REMS programme.</li><li>300 mg IV over one hour every 4 weeks; observation for 1 hour after each of the first 12 infusions.</li><li>Infusion reactions about 24% versus 18% on placebo; serious hypersensitivity under 1%. [[TyrukoLabel2025]]</li></ul></div>
   <div class="card"><h4>Interferons and glatiramer acetate</h4><ul><li>Interferon labels: liver injury (monitor liver tests), depression and suicide, injection-site necrosis, low blood counts (monitor CBC), thrombotic microangiopathy, pulmonary arterial hypertension, heart failure.</li><li>Glatiramer acetate carries a boxed warning for anaphylaxis, which can occur <q>from as early as after the first dose, up to years</q> after starting. [[BetaseronLabel2026,RebifLabel2025,AvonexLabel2025,CopaxoneLabel2026]]</li></ul></div>
   <div class="card"><span class="ev hyp">Historic</span><h4>Mitoxantrone</h4><ul><li>No dosing if LVEF is below 50% or the lifetime dose exceeds 140 mg/m²; LVEF before every dose.</li><li>Heart failure <q>may occur ... months to years after termination</q>; the drug <q>increases the risk of developing secondary acute myeloid leukemia</q>. [[MitoxantroneLabel2025]]</li></ul></div>`;

  /* =========== rebound after stopping =========== */
  const rs=$('#sfReb'),rr=$('#sfRebT');
  function gridN(x0,y0,cols,n,cell,k,col){let g='';for(let i=0;i<n;i++){const cx=x0+(i%cols)*cell+cell/2,cy=y0+Math.floor(i/cols)*cell+cell/2,on=i<k;
    g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(cell*.36)}" style="fill:${on?col:'var(--panel-2)'};stroke:${on?col:'var(--line)'};stroke-width:1"/>`}return g}
  function drawR(w){
    const N=vb(rs,'720 420','400 560');
    const X0=N?20:220,X1=N?384:700,X=v=>X0+(X1-X0)*v/28,pick=l=>Array.isArray(l)?l[N?1:0]:l;
    const L=N?{r:[46,122,168],ax:236,ic:282}:{r:[44,108,158],ax:216,ic:262};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="${N?20:22}" class="t-sm" style="fill:var(--attack)">${N?'AFTER THE LAST DOSE':'THE WEEKS AFTER THE LAST DOSE'}</text><!--PH-->`;
    const bar=(a,b,y,h,col,dash,o)=>{const pw=clamp(X(Math.min(w,b))-X(a),0,X(b)-X(a));
      return `<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b)-X(a))}" height="${h}" rx="3" style="fill:none;stroke:${col};stroke-width:1.2;${dash?'stroke-dasharray:4 3;':''}opacity:.5"/>`+(pw>0?`<rect x="${f1(X(a))}" y="${y}" width="${f1(pw)}" height="${h}" rx="3" style="fill:${col};opacity:${o||.85}"/>`:'')};
    const lab=(t,x,y,on,st)=>`<text x="${f1(x)}" y="${y}" class="t-xs${st?'':' sf-hl'}" style="fill:var(--ink);opacity:${on?1:.45};${st||''}">${t}</text>`;
    const head=(t,sub,y)=>N?`<text x="16" y="${y}" class="t-lbl">${t}</text><text x="${16+t.length*7.6+8}" y="${y}" class="t-xs">${sub}</text>`:`<text x="16" y="${y+8}" class="t-lbl">${t}</text><text x="16" y="${y+22}" class="t-xs">${sub}</text>`;
    // natalizumab
    let y0=L.r[0],by=N?y0+10:y0;
    s+=head('Natalizumab stopped','RESTORE; AAN 2018',y0);
    s+=bar(4,8,by,12,'var(--attack)');s+=lab(pick(['relapses from 4–8 weeks (RESTORE)','relapses 4–8 weeks (RESTORE)']),X(8)+6,by+10,w>=4);
    s+=bar(0,26,by+20,6,'var(--warn)',0,.7);s+=lab(pick(['AAN (Level A): risk rises “within six months”','AAN (A): risk rises “within six months”']),X0,by+40,w>=0);
    // switching
    y0=L.r[1];by=N?y0+10:y0;
    s+=head('Natalizumab → fingolimod','AAN 2018 switching',y0);
    s+=bar(8,12,by,12,'var(--rx)');s+=lab(pick(['AAN (B): start fingolimod within 8–12 weeks','AAN (B): start within 8–12 weeks']),X(12)+6,by+10,w>=8);
    // fingolimod
    y0=L.r[2];by=N?y0+10:y0;
    s+=head('Fingolimod stopped','label; Hatcher 2016',y0);
    s+=bar(0,12,by,12,'var(--attack)')+bar(12,24,by,12,'var(--attack)',1,.45);
    s+=lab(pick(['label: severe worsening usually within 12 weeks, up to 24','usually within 12 weeks, up to 24']),X0+8,by+9.5,1,'font-weight:700');
    s+=bar(4,16,by+20,12,'var(--orange)');s+=lab(pick(['Hatcher 2016: severe rebound 4–16 weeks','severe rebound 4–16 wks (Hatcher)']),X(4),by+46,w>=4);
    // axis, playhead
    s+=`<line x1="${X0}" x2="${X1}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    for(let v=0;v<=28;v+=4){const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ax}" y2="${L.ax+5}" class="axis"/><text x="${f1(x)}" y="${L.ax+17}" class="t-xs t-mid">${v}</text>`}
    s+=`<text x="${X1}" y="${L.ax+30}" class="t-xs t-end">weeks after the last dose</text>`;
    const ph=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${L.r[0]-8}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.6;opacity:.6"/>`;
    s=s.replace('<!--PH-->',ph);
    s+=N?`<text x="384" y="20" class="t-xs t-end" style="fill:var(--ink);font-weight:700">week ${Math.round(w)}</text>`:`<text x="${f1(clamp(X(w),X0+22,X1-22))}" y="${L.r[0]-12}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">week ${Math.round(w)}</text>`;
    // icon arrays
    const kR=Math.round(46*ramp(w,4,24)),kH=Math.round(5*ramp(w,4,16));
    const ix=N?[16,16]:[16,380],iy=N?[L.ic,L.ic+162]:[L.ic,L.ic],tx=N?[150,150]:[150,510];
    s+=`<text x="${ix[0]}" y="${iy[0]}" class="t-sm" style="fill:var(--attack)">RESTORE · MRI ACTIVITY RETURNED</text>`;
    s+=gridN(ix[0],iy[0]+10,10,100,12,kR,'var(--attack)');
    [[`${kR} of 100`,'t-big','var(--attack)'],['placebo arm, 24-week pause','t-xs',''],['continued natalizumab: 0%','t-xs','var(--ink)'],[w<24?'icons fill for illustration':'final count published','t-xs','']].forEach(([t,c,col],i)=>{s+=`<text x="${tx[0]}" y="${iy[0]+34+i*16}" class="${c}" style="${col?'fill:'+col:''}">${t}</text>`});
    s+=`<text x="${ix[1]}" y="${iy[1]+(N?0:0)}" class="t-sm" style="fill:var(--orange)">${N?'HATCHER 2016 · 46 STOPPED FINGOLIMOD':'HATCHER 2016 · 46 PEOPLE STOPPED FINGOLIMOD'}</text>`;
    s+=gridN(ix[1],iy[1]+10,10,46,12,kH,'var(--orange)');
    const hx=N?150:tx[1],hy=N?iy[1]+34:iy[1]+90;
    [[`${kH} of 46 (10.9%)`,'t-big','var(--orange)'],['severe rebound, 4–16 weeks','t-xs',''],['median 9 new Gd-enhancing lesions','t-xs','var(--ink)'],['new lesions for 3–6 months','t-xs','']].forEach(([t,c,col],i)=>{s+=`<text x="${N?hx:ix[1]+(i===0?0:0)}" y="${hy+i*16}" class="${c}" style="${col?'fill:'+col:''}">${t}</text>`});
    rs.innerHTML=s;
    $('#sfRebNote').innerHTML=noteHTML({k:`Week ${Math.round(w)} after stopping`,t:w<4?'The first weeks':w<12?'The rebound window opens':w<24?'Still inside the windows':'Six months on',
      txt:`In RESTORE, 175 relapse-free people on natalizumab were randomised to a 24-week interruption: MRI activity returned in 0% of those who continued versus 46% on placebo, and relapses occurred in 4% who continued versus 15–29% in the other arms, from 4–8 weeks after the last dose. AAN 2018 (Level A) says patients must be counselled that relapse or MRI activity risk rises <q>within six months</q> of stopping natalizumab. The fingolimod label reports severe increases in disability, usually within 12 weeks but up to 24, and most patients did not return to their previous function. In a UCSF series, 5 of 46 people (10.9%) had severe rebound relapses 4–16 weeks after stopping, with a median of 9 new gadolinium-enhancing lesions that persisted 3–6 months despite steroids or B-cell depletion. The siponimod and ozanimod labels say severe exacerbation <q>including disease rebound</q> has been <q>rarely reported</q> after stopping an S1P modulator. [[Fox2014,RaeGrant2018,GilenyaLabel2026,Hatcher2016,MayzentLabel2026,ZeposiaLabel2026]]`,
      pt:'Stopping natalizumab or fingolimod can let MS come back within weeks, sometimes more strongly than before. That is why guidelines plan the next drug before the old one stops.',
      hook:'Natalizumab: activity returns from <b>4–8 weeks</b>, risk raised <b>within 6 months</b>. Fingolimod: severe rebound usually <b>within 12 weeks</b>. ECTRIMS/EAN R16: consider another highly efficacious drug.'});
  }
  playWire(rr,$('#sfRebPlay'),drawR,12000,'Replay','safety');drawR(+rr.value);

  /* =========== contraception windows =========== */
  const cs=$('#sfCw'),cr=$('#sfCwT');
  const CW=[ ['Ponesimod','1 week after stopping',7],['Siponimod','10 days after stopping',10],['Fingolimod','2 months after stopping',60.9],['Ozanimod','3 months after stopping',91.3],
    ['Cladribine (men)','14 weeks after each course',98],['Alemtuzumab','4 months after each course',121.7],['Cladribine (women)','6 months after each course',182.6],
    ['Anti-CD20 antibodies','6 months after the last dose',182.6],['Teriflunomide','until a plasma level below 0.02 mg/L is confirmed',null] ];
  function drawC(t){
    const N=vb(cs,'720 360','400 496');
    const X0=N?16:210,X1=N?384:690,X=d=>X0+(X1-X0)*d/200,RH=N?48:30,Y0=N?40:44;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="22" class="t-sm" style="fill:var(--rx)">${N?'CONTRACEPTION AFTER THE LAST DOSE':'CONTRACEPTION WINDOW AFTER THE LAST DOSE, AS LABELLED'}</text>`;
    for(let mo=0;mo<=6;mo++){const x=X(mo*30.44);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${Y0-4}" y2="${Y0+CW.length*RH}" class="grid"/>`}
    CW.forEach(([nm,lb,d],i)=>{const y=Y0+i*RH,k=ease(ramp(t,i*.06,i*.06+.4)),by=N?y+16:y+4,isT=d==null,len=isT?X1-X0:X(d)-X0,w=len*k;
      s+=N?`<text x="16" y="${y+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${nm}</text>`:`<text x="16" y="${by+12}" class="t-lbl">${nm}</text>`;
      s+=`<rect x="${X0}" y="${by}" width="${f1(Math.max(2,w))}" height="16" rx="4" style="fill:${isT?'none':'var(--rx-soft)'};stroke:var(--rx);stroke-width:1.4;${isT?'stroke-dasharray:5 4':''}"/>`;
      const txt=isT?(N?'until <0.02 mg/L is confirmed':'until <0.02 mg/L is confirmed: 11 days if accelerated, else up to 2 years'):lb,tw=txt.length*5.8;
      const inside=isT||len>tw+16,tx=inside?X0+8:X0+w+6;
      if(k>.6)s+=`<text x="${f1(tx)}" y="${by+11.5}" class="t-xs" style="fill:var(--ink);opacity:${f1(ramp(k,.6,1))}">${txt}</text>`});
    const ay=Y0+CW.length*RH+4;
    s+=`<line x1="${X0}" x2="${X1}" y1="${ay}" y2="${ay}" class="axis"/>`;
    for(let mo=0;mo<=6;mo++){const x=X(mo*30.44);s+=`<text x="${f1(x)}" y="${ay+15}" class="t-xs t-mid">${mo}</text>`}
    s+=`<text x="${X1}" y="${ay+29}" class="t-xs t-end">months after the last dose (or course)</text>`;
    cs.innerHTML=s;
  }
  playWire(cr,$('#sfCwPlay'),drawC,6000,'Replay','safety');drawC(+cr.value);

  /* =========== VELOCE bars =========== */
  $('#sfVel').innerHTML=[ ['Tetanus response',23.9,54.5],['12 or more pneumococcal serotypes',37.3,97.1] ].map(([l,a,b])=>
    `<li><span>${l}: <b>${a}%</b> on ocrelizumab, <b>${b}%</b> in controls</span><span class="tr" aria-hidden="true"><i style="width:${a}%;background:var(--attack)"></i></span><span class="tr" aria-hidden="true"><i style="width:${b}%;background:var(--rx)"></i></span></li>`).join('');
};
