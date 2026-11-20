/* =============== 5.5 Nursing care in hospital =============== */
/* One illustrative 72-hour admission. The CIWA-Ar line is drawn (knots below), not measured;
   intervals, bands and windows are the published ones, cited in the notes. */
const NU_H=72;
const NU_CIWA=[[0,5],[4,7],[8,11],[12,14],[18,16],[22,14],[26,11],[29,9],[34,7],[42,5],[54,3.5],[72,2]];
function nuPL(k,x){if(x<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(x<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return k[k.length-1][1]}
/* checks: every 2 h while scores are moderate or medicine is given (ASAM: 1-4 h for 24 h), every 4 h until
   the score has been < 10 for 24 h, then every 6 h (ASAM: 4-8 h) */
const NU_CHECKS=(()=>{const c=[];for(let h=0;h<=28;h+=2)c.push(h);for(let h=32;h<=52;h+=4)c.push(h);for(let h=58;h<=70;h+=6)c.push(h);return c})();
/* symptom-triggered doses: ASAM's sample regimen gives a dose "when CIWA-Ar >= 10", no more often than every 4 h here */
const NU_DOSES=(()=>{const d=[];let last=-9;NU_CHECKS.forEach(h=>{if(nuPL(NU_CIWA,h)>=10&&h-last>=4){d.push(h);last=h}});return d})();
const NU_LIST=[
 [0.5,'AUDIT-C + PAWSS screen'],
 [1,'CIWA-Ar, vitals, mood'],
 [2,'Thiamine (+ glucose, any order)'],
 [3,'Bloods: Mg, K, phosphate'],
 [4,'Falls & seizure precautions'],
 [36,'CAM delirium screen'],
 [48,'Addiction consult, AUD medicine'],
 [68,'Discharge: follow-up linked']];
const NU_STEPS=[
 {from:0,at:.5/NU_H,k:'Hour 0 · admission',t:'Screening on admission',
  txt:`In a UK meta-analysis, 19.76% of inpatients had harmful alcohol use and 10.25% alcohol dependence (GRADE: very low quality). [[Roberts2019]] The three AUDIT-C consumption questions detected heavy drinking with an AUROC of 0.891 in their first validation. [[Bush1998AUDITC]] The 10-item <b>PAWSS</b> then estimates who is at risk of <i>complicated</i> withdrawal: at a cut-off of 4 it had a sensitivity of 93.1% and a specificity of 99.5% in 403 medical and surgical inpatients, and ASAM 2020 says it "can be used for predicting risk" in the medically ill. [[Maldonado2015,ASAM2020Withdrawal]] A Cochrane review notes that simply asking about drinking "may also have a positive impact". [[McQueen2011]] These are teaching tools here, not self-tests: see <a href="#screening" data-go="screening">AUDIT and AUDIT-C</a>.`,
  pt:`Being asked about drinking is a normal part of hospital care. The answers help the team keep you safe if withdrawal starts.`,
  hook:`PAWSS predicts (before symptoms; a score of 4 or more flags high risk). CIWA-Ar measures (once withdrawal has started). [[Maldonado2015,Sullivan1989CIWA]]`},
 {from:1.5/NU_H,at:2.5/NU_H,k:'Hours 1–4 · first hours',t:'Thiamine, glucose and the first bloods',
  txt:`ASAM 2020 states that thiamine "should be provided to prevent Wernicke encephalopathy", IV or IM for people with poor nutrition or severe complications: "Typical dosing is 100 mg IV/IM per day for 3–5 days" (quoted as published, not an instruction). On glucose, ASAM says the two "can be administered thiamine and glucose in any order or concurrently", so glucose is not delayed. That differs from the older teaching, still in the EFNS 2010 guideline, of thiamine before any carbohydrate. [[ASAM2020Withdrawal,Galvin2010EFNS,Sechi2007]] ASAM gives magnesium for hypomagnesaemia, arrhythmias, electrolyte disturbances or past withdrawal seizures, and phosphorus below 1 mg/dL. Low potassium in AUD often comes with low magnesium. [[ASAM2020Withdrawal,Elisaf2002]]`,
  pt:`Vitamin B1 (thiamine) protects the brain in people who drink heavily. A low blood sugar is treated straight away.`,
  hook:`Old rule: "thiamine before glucose". ASAM 2020: any order or together; never delay glucose. EFNS 2010 still says thiamine first: a real guideline difference.`},
 {from:5/NU_H,at:14/NU_H,k:'Hours 4–28 · active withdrawal',t:'CIWA-Ar every 1–4 hours',
  txt:`The CIWA-Ar has 10 items (nine scored 0–7, one 0–4; maximum 67). [[Sullivan1989CIWA,Mirijello2015]] For moderate to severe withdrawal or anyone on medicine, ASAM 2020 says "re-assess every 1–4 hours for 24 hours, as clinically indicated"; its example bands are mild &lt;10, moderate 10–18 and severe ≥19. Symptom-triggered dosing is "the preferred benzodiazepine dosing method" in hospital; in ASAM's sample regimen a dose follows "when CIWA-Ar ≥ 10". Watch for over-sedation and respiratory depression. [[ASAM2020Withdrawal]] In a double-blind RCT (n = 101), symptom-triggered chlordiazepoxide cut median treatment from 68 h to 9 h and total dose from 425 mg to 100 mg, with no difference in severity, seizures or delirium tremens. [[Saitz1994]] The score is not a diagnosis: fever, some medicines and communication problems can raise it. [[ASAM2020Withdrawal]]`,
  pt:`Nurses check the shakes, sweating, anxiety and other signs often, every 1 to 4 hours at first, and give medicine when the score calls for it.`,
  hook:`Saitz 1994: symptom-triggered vs fixed schedule, 9 h vs 68 h and 100 mg vs 425 mg, with no rise in seizures or DTs. [[Saitz1994]]`},
 {from:18/NU_H,at:24/NU_H,k:'Hours 8–48 · seizure window',t:'Seizure and fall precautions',
  txt:`ASAM 2020: withdrawal seizures may begin as early as 8 h after the last drink, can continue for up to 48 h and peak at about 24 h; hallucinations develop within 12–24 h and usually resolve within 24–48 h unless delirium appears. A second seizure "generally happens within 6 hours of the first". After a seizure ASAM says to "re-assess every 1-2 hours for 6–24 hours". Supportive care includes safety protocols, "e.g., assess risk for fall/syncope". [[ASAM2020Withdrawal,Saitz1998AHRW]] People with mild, low-risk withdrawal "may be observed for up to 36 hours, after which more severe withdrawal is unlikely to develop". [[ASAM2020Withdrawal]]`,
  pt:`The first two days carry the highest seizure risk. This is why stopping heavy daily drinking should happen with medical help.`,
  hook:`Seizures: from 8 h, peak about 24 h, up to 48 h (ASAM 2020). A second one usually comes within 6 h of the first. [[ASAM2020Withdrawal,Saitz1998AHRW]]`},
 {from:32/NU_H,at:44/NU_H,k:'Hours 36–72 · delirium watch',t:'Screening for delirium (CAM)',
  txt:`The Confusion Assessment Method takes under 5 minutes: (1) acute onset and fluctuating course and (2) inattention, plus (3) disorganised thinking or (4) altered consciousness. [[Inouye1990]] ASAM does not recommend CIWA-Ar in delirium, because it relies on what the patient reports. [[ASAM2020Withdrawal]] When delirium tremens begins differs between sources: 48–72 h after the last drink in Mirijello's stage table, 72–96 h in ASAM's initial-assessment section (shaded on the strip). [[Mirijello2015,ASAM2020Withdrawal]] Non-drug care as published: frequent reassurance, re-orientation, "an evenly lit, quiet room". Restraints only "when required to prevent injuries". [[ASAM2020Withdrawal]] Confusion can also be Wernicke encephalopathy: see <a href="#wernicke" data-go="wernicke">module 3.4</a>.`,
  pt:`New confusion that comes and goes is a warning sign. A calm, quiet, evenly lit room and simple reminders of the day and place help.`,
  hook:`CAM = 1 + 2 + (3 or 4). DT onset: 48–72 h (Mirijello 2015) vs 72–96 h (ASAM 2020). [[Inouye1990,Mirijello2015,ASAM2020Withdrawal]]`},
 {from:50/NU_H,at:66/NU_H,k:'Hours 48–72 · before discharge',t:'Starting treatment and linking onward',
  txt:`ASAM 2020: "When feasible, alcohol use disorder (AUD) treatment should be initiated concurrently with alcohol withdrawal management as cognitive status permits", with medicine offered or a link to services and recovery support. [[ASAM2020Withdrawal]] After a discharge-planning protocol in San Francisco, AUD medicine at discharge rose from 0% to 64% and 30-day readmission fell from 23.4% to 8.2% (before-and-after design). [[Wei2015]] Yet in 12 hospitals only 19.8% of withdrawal admissions started medicine. [[Bernstein2026]] For injectable naltrexone the label states people "should be opioid-free before starting VIVITROL" (7–10 days) and warns of a "potentially fatal overdose" risk from lost opioid tolerance. [[FDA-Vivitrol]] See <a href="#medicines" data-go="medicines">Approved medicines</a>.`,
  pt:`Hospital is a good place to start treatment. Leaving with a medicine and a follow-up plan was linked to fewer trips back to hospital.`,
  hook:`Wei 2015: AUD medicine 0% → 64%; 30-day readmission 23.4% → 8.2%. Naltrexone needs 7–10 opioid-free days first. [[Wei2015,FDA-Vivitrol]]`}
];
const NU_Q=[
 {s:`On admission, a woman says she drinks heavily every day. She has no symptoms yet (CIWA-Ar 4) and her PAWSS score is 5. Which statement fits the published tools?`,
  o:[`A low CIWA-Ar means withdrawal monitoring can stop`,`PAWSS ≥4 flags high risk of complicated withdrawal, so closer monitoring is planned`,`PAWSS is a diagnostic test for alcohol use disorder`,`She should be discharged to stop drinking at home`],a:1,
  e:`PAWSS predicts risk before symptoms appear; at a cut-off of 4 it had 93.1% sensitivity and 99.5% specificity in medically ill inpatients. CIWA-Ar measures withdrawal once it has started, so a low early score does not rule out later severe withdrawal. [[Maldonado2015,ASAM2020Withdrawal]]`},
 {s:`At 36 hours a man has a coarse tremor and says he sees insects on the wall. He knows where he is and what day it is. CIWA-Ar is 17. What do the published guidelines support?`,
  o:[`Restrain him to prevent a fall`,`Reassess with CIWA-Ar every 1–4 hours and give symptom-triggered medicine per protocol`,`Stop all monitoring: hallucinations always resolve`,`Record it as delirium tremens`],a:1,
  e:`17 is in ASAM's moderate band (10–18). Hallucinations usually develop within 12–24 h and resolve within 24–48 h unless delirium appears; he is oriented, so this is not delirium. ASAM prefers symptom-triggered dosing and reassessment every 1–4 h. Restraints are only for preventing injury. [[ASAM2020Withdrawal]]`},
 {s:`At hour 20 a patient has a witnessed generalised seizure and is now drowsy but breathing. Which plan matches ASAM 2020?`,
  o:[`Return to 4–8-hourly checks once awake`,`Start long-term phenytoin`,`Close monitoring, reassessing every 1–2 hours for 6–24 hours, and watch for delirium`,`Discharge once fully awake`],a:2,
  e:`ASAM: after a withdrawal seizure, admit where close monitoring is available and "re-assess every 1-2 hours for 6–24 hours", watching for delirium and the need for IV fluids. Phenytoin should not be used unless there is a separate seizure disorder. A second seizure generally comes within 6 hours of the first. [[ASAM2020Withdrawal,Saitz1998AHRW]]`},
 {s:`A patient's blood glucose is low. Thiamine has not been given yet. What does ASAM 2020 say?`,
  o:[`Withhold glucose until thiamine has been given`,`Give thiamine and glucose in any order or together, without delaying glucose`,`Thiamine is only needed if the patient is confused`,`Give oral sugar and skip thiamine`],a:1,
  e:`ASAM 2020: thiamine and glucose "in any order or concurrently"; glucose should not be delayed. A review of 19 papers found no evidence above case-report level for the older "thiamine first" rule, which EFNS 2010 still recommends. [[ASAM2020Withdrawal,Schabelman2012,Galvin2010EFNS]]`},
 {s:`On day 3 a patient becomes newly confused: attention drifts, it fluctuates over hours and his thinking is disorganised. What fits the guidance?`,
  o:[`Rely on CIWA-Ar to track it`,`Assess with a delirium tool such as CAM, increase observation, and consider causes including Wernicke encephalopathy`,`Assume it is normal at day 3`,`Apply restraints first`],a:1,
  e:`CAM: acute fluctuating course plus inattention plus disorganised thinking. ASAM does not recommend CIWA-Ar in delirium and asks for close observation, often in ICU. Caine criteria for Wernicke need 2 of 4 signs, one of them an altered mental state. [[Inouye1990,ASAM2020Withdrawal,Caine1997]]`},
 {s:`Before discharge a patient wants to start injectable naltrexone. He has been taking oxycodone for a fracture. What does the label say?`,
  o:[`Start it today; opioids do not matter`,`He should be opioid-free for 7–10 days first, and lost tolerance raises overdose risk later`,`AUD medicine cannot be started in hospital`,`Naltrexone treats opioid pain`],a:1,
  e:`The Vivitrol label: patients "should be opioid-free before starting VIVITROL" (a minimum of 7–10 days) to avoid severe precipitated withdrawal, and afterwards are "vulnerable to potentially fatal overdose". ASAM supports starting AUD treatment in hospital when feasible, so another medicine or a planned start may be discussed. [[FDA-Vivitrol,ASAM2020Withdrawal]]`}
];
const NU_LINK={
 wei:{t:'Discharge-planning protocol',cap:`San Francisco General Hospital, before and after a resident-led protocol for patients admitted with alcohol dependence. Before-and-after design: other changes over time could explain part of it. [[Wei2015]]`,
  bars:[{l:'AUD medicine at discharge',a:0,b:64,la:'before',lb:'after'},{l:'30-day readmission',a:23.4,b:8.2,la:'before',lb:'after'},{l:'30-day ED visit',a:18.8,b:6.1,la:'before',lb:'after',ns:'p = 0.056'}],
  note:{k:'Wei 2015 · pre-post',t:'Medicine before discharge',txt:`AUD medicine rose from 0% to 64% (p &lt; 0.001); all-cause 30-day readmission fell from 23.4% to 8.2% (p = 0.042); ED visits fell from 18.8% to 6.1% (p = 0.056, not significant). In a separate quasi-experimental study of 399 inpatients, an addiction consult team gave +12.7 vs +5.6 days of abstinence at 30 days. [[Wei2015,Wakeman2017]]`,pt:`When the hospital started medicine and booked follow-up, fewer people came back within a month.`,hook:`Wei 2015: readmission 23.4% → 8.2%.`}},
 lam:{t:'Addiction consultation',cap:`19,697 admissions for substance use disorder, 2019–2023. Observational: people who saw the consult team may differ in other ways. [[Lambert2025]]`,
  bars:[{l:'AUD medicine during the stay',a:6.0,b:33.4,la:'no consult',lb:'consult'}],
  extra:[`Discharge prescription for AUD medicine: RR 9.48 (95% CI 8.05–11.16)`,`30-day readmission with a consult: aRR 0.82 (0.75–0.89)`,`Newly started AUD medicine: aRR 0.78 for readmission`],
  note:{k:'Lambert 2025 · retrospective',t:'A consult team changes prescribing',txt:`With an addiction consultation, 33.4% received AUD medicine during the stay against 6.0% without, and the discharge prescription rate was 9.48 times higher. Consultation was associated with lower 30-day readmission (aRR 0.82); for AUD, discharge medicine (aRR 0.84) and newly started medicine (aRR 0.78) were too. [[Lambert2025]]`,pt:`A specialist team on the ward made it far more likely that people left with treatment.`,hook:`Consult → AUD medicine in hospital 33.4% vs 6.0%.`}},
 gap:{t:'How often medicine is started',cap:`Three recent US studies. The range across 12 hospitals was 5.1–43.2%. [[Anderson2026,Bernstein2026,Lebin2026]]`,
  bars:[{l:'VA AUD hospitalisations (2022–23)',b:30.8,lb:'started ≤7 days'},{l:'12 hospitals, withdrawal stays',b:19.8,lb:'started',rng:[5.1,43.2]},{l:'ED, age ≥55, AUDIT-C positive',b:3,lb:'medicine prescribed'}],
  note:{k:'Anderson 2026 · Bernstein 2026 · Lebin 2026',t:'The treatment gap',txt:`In 29,041 VA hospitalisations for AUD, medicine was started in hospital or within 7 days in 30.8% (naltrexone 57.9% of starts, acamprosate 16.5%, injectable naltrexone 13.9%); age ≥65, frailty and ICU stays made starting less likely, an addiction consult more likely. Across 12 hospitals, 19.8% of withdrawal stays started medicine (5.1–43.2%). In emergency departments, older adults screening positive were prescribed AUD medicine in only 3% of encounters. [[Anderson2026,Bernstein2026,Lebin2026]]`,pt:`Most people admitted with alcohol problems still leave hospital without a medicine for AUD.`,hook:`Starting AUD medicine varies 5–43% between hospitals. [[Bernstein2026]]`}}
};
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 560'),h=t*NU_H,sc=nuPL(NU_CIWA,h);
    const L=N?{sx:10,sy:20,lx:206,ly:34,lw:186,x0:44,x1:388,c0:252,c1:392,iv:240,dz:410,rk:428,rh:18,ax:498,axl:532,ft:552}
             :{sx:16,sy:22,lx:20,ly:196,lw:206,x0:262,x1:704,c0:44,c1:206,iv:34,dz:222,rk:240,rh:20,ax:318,axl:348,ft:372};
    const X=v=>lerp(L.x0,L.x1,v/NU_H),Y=v=>lerp(L.c1,L.c0,v/25);
    let s=`<defs>${marker('nuA','var(--muted)')}</defs>`;
    /* ---- ward scene ---- */
    const bx=L.sx+(N?60:70),by=L.sy+(N?120:118);
    s+=`<text x="${L.sx}" y="${L.sy}" class="t-sm" style="fill:var(--brand)">${N?'THE WARD':'THE WARD · BAY 4'}</text>`;
    s+=`<text x="${L.sx+(N?180:204)}" y="${L.sy}" class="t-big t-end" style="font-size:15px">Hour ${Math.floor(h)}</text>`;
    /* nurse station */
    s+=`<rect x="${L.sx}" y="${by-34}" width="34" height="34" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/><text x="${L.sx+17}" y="${by+12}" class="t-xs t-mid">station</text>`;
    /* bed and patient */
    s+=`<rect x="${bx}" y="${by-8}" width="${N?112:124}" height="12" rx="4" style="fill:var(--panel-2);stroke:var(--brain-line)"/><rect x="${bx+(N?96:108)}" y="${by-40}" width="8" height="44" rx="3" style="fill:var(--panel-2);stroke:var(--brain-line)"/><line x1="${bx+6}" y1="${by+4}" x2="${bx+6}" y2="${by+14}" style="stroke:var(--brain-line);stroke-width:2"/><line x1="${bx+(N?106:118)}" y1="${by+4}" x2="${bx+(N?106:118)}" y2="${by+14}" style="stroke:var(--brain-line);stroke-width:2"/>`;
    const px=bx+(N?64:72),py=by-62,ps=56,trem=clamp((sc-5)/11),sw=clamp((sc-8)/8);
    s+=person(px,py,ps,'var(--muted)')+symptoms(px,py,ps,{tremor:trem,sweat:sw});
    /* drip with thiamine from hour 2, while it runs */
    if(h>=2){const dx=bx+(N?20:24),on=h<2+20;s+=`<line x1="${dx}" y1="${py-14}" x2="${dx}" y2="${by-8}" style="stroke:var(--brain-line);stroke-width:1.4"/><rect x="${dx-9}" y="${py-14}" width="18" height="24" rx="4" style="fill:${on?'var(--thi-soft)':'var(--panel)'};stroke:var(--thi)"/><text x="${dx}" y="${py+2}" class="t-xs t-mid" style="fill:var(--thi)">B1</text>`;
      if(on)s+=`<path d="M${dx} ${py+12}Q${dx+16} ${py+30} ${px-8} ${py+34}" style="fill:none;stroke:var(--thi-fill);stroke-width:1.2;stroke-dasharray:2 3"/>`}
    /* nurse: at the bedside within 0.6 h of a check, otherwise at the station */
    let near=0;NU_CHECKS.forEach(c=>{const d=h-c;if(d>=-.6&&d<=.9)near=Math.max(near,d<0?1-(-d/.6):d<.5?1:1-(d-.5)/.4)});
    const nx=lerp(L.sx+17,bx-8,ease(clamp(near))),ny=by-58;
    s+=person(nx,ny,54,'var(--rx)');
    if(near>.8){s+=`<rect x="${nx-30}" y="${ny-20}" width="60" height="15" rx="7.5" style="fill:var(--panel);stroke:var(--rx)"/><text x="${nx}" y="${ny-9}" class="t-xs t-mid" style="fill:var(--rx)">CIWA ${Math.round(sc)}</text>`}
    /* room light: calm, evenly lit (V.5) once withdrawal is moderate */
    s+=`<text x="${L.sx}" y="${by+30}" class="t-xs">${sc>=10?'quiet, evenly lit room':h>=34?'reorient: day, place, plan':'routine observations'}</text>`;
    /* ---- checklist ---- */
    s+=`<text x="${L.lx}" y="${L.ly-10}" class="t-sm">CHECKLIST</text>`;
    let curI=-1;NU_LIST.forEach((it,i)=>{if(h>=it[0])curI=i});
    NU_LIST.forEach((it,i)=>{const y=L.ly+i*21,done=h>=it[0],cur=i===curI&&h-it[0]<(i<5?2:8);
      if(cur)s+=`<rect x="${L.lx-4}" y="${y-2}" width="${L.lw}" height="19" rx="5" style="fill:var(--brand-soft)"/>`;
      s+=`<rect x="${L.lx}" y="${y+1}" width="13" height="13" rx="3" style="fill:${done?'var(--good)':'var(--panel)'};stroke:${done?'var(--good)':'var(--line)'};stroke-width:1.4"/>`;
      if(done)s+=`<path d="M${L.lx+3} ${y+7.5}l3 3l5 -6" style="fill:none;stroke:var(--panel);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/>`;
      s+=`<text x="${L.lx+19}" y="${y+11}" class="t-xs" style="fill:${done?'var(--ink)':'var(--muted)'}">${it[1]}</text>`});
    /* ---- CIWA-Ar chart ---- */
    const bands=[[0,10,'var(--good)','mild <10'],[10,19,'var(--warn)','moderate 10–18'],[19,25,'var(--bad)','severe ≥19']];
    bands.forEach(b=>{s+=`<rect x="${L.x0}" y="${f1(Y(b[1]))}" width="${L.x1-L.x0}" height="${f1(Y(b[0])-Y(b[1]))}" style="fill:${b[2]};opacity:.09"/><text x="${L.x1-4}" y="${f1(Y(b[1])+11)}" class="t-xs t-end" style="fill:${b[2]}">${b[3]}</text>`});
    [0,10,19,25].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<text x="${L.x0}" y="${L.c0-(N?24:20)}" class="t-sm" style="fill:var(--accent)">${N?'CIWA-Ar (illustrative) · ASAM bands':'CIWA-Ar SCORE (illustrative) · ASAM 2020 example bands'}</text>`;
    /* interval brackets */
    const IV=[[0,28,N?'every 1–4 h (here 2-hourly)':'re-assess every 1–4 h (here 2-hourly)'],[28,52,N?'<10: keep 1–4 h for 24 h':'score <10: keep 1–4 h until 24 h stable'],[52,72,N?'4–8 h':'then every 4–8 h']];
    IV.forEach(([a,b,l],i)=>{if(h<a)return;const xb=X(Math.min(b,h));s+=`<path d="M${f1(X(a)+1)} ${L.iv+4}V${L.iv}H${f1(xb-1)}V${L.iv+4}" style="fill:none;stroke:var(--rx);stroke-width:1.2"/>`;
      if(h>=a+(i?6:4))s+=`<text x="${f1(X(a)+3)}" y="${L.iv-3}" class="t-xs" style="fill:var(--rx)">${l}</text>`});
    /* the line up to now */
    s+=`<path d="${pathFn(u=>nuPL(NU_CIWA,u*h)/25,L.x0,X(h),L.c1,L.c0,Math.max(4,Math.round(h*2)))}" style="fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linejoin:round"/>`;
    NU_CHECKS.forEach(c=>{if(c>h)return;const v=nuPL(NU_CIWA,c);s+=`<circle cx="${f1(X(c))}" cy="${f1(Y(v))}" r="3.4" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/>`});
    s+=`<circle cx="${f1(X(h))}" cy="${f1(Y(sc))}" r="5" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/>`;
    /* doses row */
    s+=`<text x="${L.x0-5}" y="${L.dz+4}" class="t-xs t-end">dose</text>`;
    NU_DOSES.forEach(d=>{if(d<=h)s+=pill(X(d),L.dz,14,{ang:-20,col:'var(--rx)'})});
    if(h>=8)s+=`<text x="${f1(X(NU_DOSES[NU_DOSES.length-1])+12)}" y="${L.dz+4}" class="t-xs">${N?'symptom-triggered, when ≥10':'symptom-triggered: a dose when CIWA-Ar ≥10 (ASAM sample)'}</text>`;
    /* risk windows (hours after the last drink) */
    const RK=[{a:8,b:48,pk:24,l:'seizures 8–48 h, peak ~24 h',c:'var(--bad)',src:'ASAM'},{a:12,b:48,b0:24,l:'hallucinations 12–24 h, settle by 24–48 h',c:'var(--dx)'},{a:48,b:72,l:N?'DT 48–72 h (Mirijello)':'delirium tremens 48–72 h (Mirijello)',c:'var(--accent)',more:N?'ASAM: 72–96 →':'72–96 h in ASAM →'}];
    RK.forEach((r,i)=>{const y=L.rk+i*L.rh,on=h>=r.a,x0=X(r.a),x1=X(r.b),act=h>=r.a&&h<=(r.b0||r.b);
      if(r.b0){s+=`<rect x="${f1(x0)}" y="${y}" width="${f1(X(r.b0)-x0)}" height="${L.rh-5}" rx="4" style="fill:${r.c};opacity:${on?.32:.1}"/><rect x="${f1(X(r.b0))}" y="${y}" width="${f1(x1-X(r.b0))}" height="${L.rh-5}" rx="4" style="fill:${r.c};opacity:${on?.12:.05}"/>`}
      else s+=`<rect x="${f1(x0)}" y="${y}" width="${f1(x1-x0)}" height="${L.rh-5}" rx="4" style="fill:${r.c};opacity:${on?.28:.1}"/>`;
      if(r.pk)s+=`<line x1="${f1(X(r.pk))}" x2="${f1(X(r.pk))}" y1="${y}" y2="${y+L.rh-5}" style="stroke:${r.c};stroke-width:2"/>`;
      s+=`<text x="${f1(r.more?x0-4:x0+4)}" y="${y+L.rh-9}" class="t-xs${r.more?' t-end':''}" style="fill:${act?'var(--ink)':'var(--muted)'};font-weight:${act?700:500}">${r.l}</text>`;
      if(r.more)s+=`<text x="${f1(x0+4)}" y="${y+L.rh-9}" class="t-xs" style="fill:var(--accent)">${r.more}</text>`});
    /* axis and playhead */
    const tl=tline(L.x0,L.ax,L.x1-L.x0,{min:0,max:72,step:12,fmt:v=>v});s+=tl.svg;
    s+=`<text x="${L.x1}" y="${L.axl}" class="t-xs t-end">${N?'hours (last drink at hour 0)':'hours since admission (last drink assumed at hour 0)'}</text>`;
    s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${L.c0-6}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    s+=`<text x="${N?L.x0-34:L.lx}" y="${L.ft}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one illustrative admission, not a protocol</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(NU_STEPS,t);setSt(ph);
    const nC=NU_CHECKS.filter(c=>c<=h).length,nD=NU_DOSES.filter(d=>d<=h).length,band=sc<10?'mild (<10)':sc<19?'moderate (10–18)':'severe (≥19)';
    $('#nuRead').innerHTML=`<span>hour <b>${f1(h)}</b></span><span>CIWA-Ar <b>${Math.round(sc)}</b> · ${band}</span><span>checks so far <b>${nC}</b></span><span>symptom-triggered doses <b>${nD}</b></span><span>checklist <b>${NU_LIST.filter(i=>h>=i[0]).length}/${NU_LIST.length}</b></span>`;
    $('#nuNote').innerHTML=noteHTML(NU_STEPS[ph]);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,24000,'%t:player.replay%','nursing');
  setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- priority questions ---- */
  const qz=$('#nuQuiz'),first={};
  function score(){const n=Object.keys(first).length,r=Object.values(first).filter(Boolean).length;$('#nuScore').innerHTML=`<span>answered <b>${n}/${NU_Q.length}</b></span><span>right first time <b>${r}</b></span>`}
  function build(){qz.innerHTML=NU_Q.map((q,i)=>`<div class="card nu-q" data-q="${i}"><span class="kicker">Question ${i+1} of ${NU_Q.length}</span><p class="scen">${q.s}</p><div class="opts">${q.o.map((o,j)=>`<button class="opt" data-nuo="${i}:${j}" aria-pressed="false"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div class="expl" hidden></div></div>`).join('');score()}
  qz.addEventListener('click',e=>{const b=e.target.closest('[data-nuo]');if(!b)return;const [i,j]=b.dataset.nuo.split(':').map(Number),q=NU_Q[i],card=b.closest('.nu-q');
    if(!(i in first))first[i]=j===q.a;
    $$('[data-nuo]',card).forEach((x,k)=>{x.setAttribute('aria-pressed',k===j);x.classList.toggle('right',k===q.a);x.classList.toggle('wrong',k===j&&j!==q.a)});
    const ex=$('.expl',card);ex.hidden=false;ex.innerHTML=`<b>${j===q.a?'Right.':'Not quite: the best answer is '+'ABCD'[q.a]+'.'}</b> ${q.e}`;score()});
  $('#nuReset').addEventListener('click',()=>{Object.keys(first).forEach(k=>delete first[k]);build()});
  build();

  /* ---- starting treatment chart ---- */
  const ls=$('#nuLink');let view='wei',cancel=null;
  function drawL(p){const N=vb(ls,'720 300','400 440'),V=NU_LINK[view];let s='';
    const x0=N?20:250,x1=N?380:700,W=x1-x0,P=v=>x0+W*v/100;
    s+=`<text x="${N?20:20}" y="24" class="t-sm" style="fill:var(--brand)">${V.t.toUpperCase()}</text>`;
    if(!N)[0,25,50,75,100].forEach(v=>s+=`<line x1="${f1(P(v))}" x2="${f1(P(v))}" y1="40" y2="${40+V.bars.length*72}" class="grid"/><text x="${f1(P(v))}" y="${52+V.bars.length*72}" class="t-xs t-mid">${v}%</text>`);
    V.bars.forEach((b,i)=>{const y=N?54+i*96:50+i*72,lab=N?y:y+20;
      s+=`<text x="${N?20:20}" y="${N?y-6:lab}" class="t-lbl"${N?'':' style="font-size:12.5px"'}>${b.l}</text>`;
      const by=N?y+4:y+4,rows=b.a!=null?[[b.a,b.la,'var(--muted)'],[b.b,b.lb,'var(--rx)']]:[[b.b,b.lb,'var(--rx)']];
      rows.forEach(([v,lab2,c],k)=>{const yy=by+k*24,w=W*v/100*ease(p);
        s+=`<rect x="${x0}" y="${yy}" width="${f1(Math.max(1.5,w))}" height="16" rx="4" style="fill:${c};opacity:${k||rows.length===1?.85:.45}"/>`;
        s+=`<text x="${f1(x0+Math.max(1.5,w)+6)}" y="${yy+12}" class="t-xs" style="fill:var(--ink)">${lab2} ${(v*p).toFixed(v%1?1:0)}%</text>`});
      if(b.rng){const yy=by+8;s+=`<line x1="${f1(P(b.rng[0]))}" x2="${f1(P(b.rng[1]))}" y1="${yy}" y2="${yy}" style="stroke:var(--ink);stroke-width:1.4;opacity:${p}"/><line x1="${f1(P(b.rng[0]))}" x2="${f1(P(b.rng[0]))}" y1="${yy-5}" y2="${yy+5}" style="stroke:var(--ink);stroke-width:1.4;opacity:${p}"/><line x1="${f1(P(b.rng[1]))}" x2="${f1(P(b.rng[1]))}" y1="${yy-5}" y2="${yy+5}" style="stroke:var(--ink);stroke-width:1.4;opacity:${p}"/>`;
        if(p>.9)s+=`<text x="${f1(P(b.rng[1])+6)}" y="${yy-6}" class="t-xs">range ${b.rng[0]}–${b.rng[1]}% by hospital</text>`}
      if(b.ns&&p>.9)s+=`<text x="${x1}" y="${N?y-6:lab}" class="t-xs t-end" style="fill:var(--warn)">${b.ns}, not significant</text>`});
    if(V.extra){const y0=(N?54:50)+V.bars.length*(N?96:72)+(N?6:22);V.extra.forEach((e,i)=>{s+=`<text x="20" y="${y0+i*20}" class="t-xs" style="fill:var(--ink);opacity:${f1(clamp(p*1.4-i*.2))}">• ${e}</text>`})}
    ls.innerHTML=s;$('#nuLinkCap').innerHTML=V.cap;$('#nuLinkNote').innerHTML=noteHTML(V.note)}
  function showL(){if(cancel)cancel();cancel=animate(700,drawL,()=>{cancel=null})}
  $$('[data-nul]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.nul;$$('[data-nul]').forEach(x=>x.setAttribute('aria-pressed',x===b));showL()}));
  drawL(1);
  const pr=redraws.nursing;redraws.nursing=()=>{pr&&pr();drawL(1)};
};
