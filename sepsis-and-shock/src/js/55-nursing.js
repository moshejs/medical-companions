/* ===== 5.5 Nursing care ===== */
/* The NEWS2 points below are the RCP chart as reproduced in Verma2023NEWS2 (cited in the section);
   the observations are invented for one illustrative patient. */
function nrPts(k,v,o2){switch(k){
  case 'rr':return v<=8?3:v<=11?1:v<=20?0:v<=24?2:3;
  case 'spo2':return v<=91?3:v<=93?2:v<=95?1:0;
  case 'air':return o2?2:0;
  case 'sbp':return v<=90?3:v<=100?2:v<=110?1:v<=219?0:3;
  case 'hr':return v<=40?3:v<=50?1:v<=90?0:v<=110?1:v<=130?2:3;
  case 'acvpu':return v==='A'?0:3;
  case 'temp':return v<=35?3:v<=36?1:v<=38?0:v<=39?1:2}}
const NR_ROWS=[['rr','Resp rate'],['spo2','SpO2 %'],['air','Air / O2'],['sbp','Systolic BP'],['hr','Pulse'],['acvpu','Conscious'],['temp','Temp °C']];
const NR_OBS=[
 {h:8,rr:18,spo2:96,o2:false,sbp:128,hr:88,acvpu:'A',temp:37.4},
 {h:12,rr:21,spo2:95,o2:false,sbp:112,hr:102,acvpu:'A',temp:38.4},
 {h:14,rr:26,spo2:93,o2:false,sbp:96,hr:118,acvpu:'C',temp:38.9},
 {h:15,rr:24,spo2:95,o2:true,sbp:104,hr:108,acvpu:'C',temp:38.6},
 {h:18,rr:20,spo2:96,o2:true,sbp:112,hr:96,acvpu:'A',temp:37.8}];
const nrScore=o=>NR_ROWS.reduce((a,[k])=>a+nrPts(k,k==='air'?0:o[k],o.o2),0);
const nrBand=(sc,o)=>sc>=7?['high','var(--bad)']:sc>=5?['medium','var(--warn)']:NR_ROWS.some(([k])=>nrPts(k,k==='air'?0:o[k],o.o2)===3)?['low-medium','var(--warn)']:['low','var(--good)'];
const NR_HK=[[0,8],[.12,12],[.25,14],[.37,14.17],[.5,14.5],[.62,15],[.75,16],[.88,18],[1,18.5]];
const nrHour=t=>{const k=NR_HK;if(t<=0)return 8;for(let i=1;i<k.length;i++)if(t<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(t-a[0])/(b[0]-a[0])}return 18.5};
const nrClk=h=>{const H=Math.floor(h),M=Math.round((h-H)*60);return String(M===60?H+1:H).padStart(2,'0')+':'+String(M===60?0:M).padStart(2,'0')};
const NR_LOOP=['Observe','Score','Escalate','Act','Reassess'];
const NR_DO=[['Blood cultures × 2',14.17],['Antibiotic started',14.5],['Vasopressor, vein at/above elbow',15],['Site checked, BP every 2–5 min',15.2],['Hourly urine, fluid balance',16]];
const NR_STEPS=[
 {from:0,at:.03,loop:0,k:'08:00 · observations',t:'Observe: a baseline set',
  txt:`A full set of observations is taken and scored. Early warning scores were built for this: the original NEWS predicted death within 24 hours with an AUROC of 0.894, better than 33 other scores tested. [[Smith2013NEWS]] SSC 2021 recommends sepsis screening of acutely ill, high-risk patients as part of a hospital programme (strong). [[Evans2021SSC]]`,
  pt:`Nurses regularly check breathing, oxygen, blood pressure, pulse, alertness and temperature, and add them into one score.`,
  hook:`NEWS2 parameters: respiration rate, SpO2, air or oxygen, systolic BP, pulse, consciousness, temperature. [[Verma2023NEWS2]]`},
 {from:.1,at:.13,loop:1,k:'12:00 · score 5',t:'Score: the total starts to climb',
  txt:`Breathing 21, SpO2 95%, pulse 102 and a temperature of 38.4 °C add up to 5. On the RCP chart as reproduced by Verma, 0–4 is low, 5–6 medium and 7–20 high clinical risk; a 3 in any single parameter is treated as low-medium risk. [[Verma2023NEWS2]] In an Indian ED cohort NEWS2 predicted mortality better than qSOFA (AUC 0.781 vs 0.729), and SSC 2021 recommends against qSOFA as a single screening tool. [[Verma2023NEWS2,Evans2021SSC]]`,
  pt:`A rising score is a signal to look harder and ask: could this be sepsis?`,
  hook:`NEWS2 bands (RCP, as reproduced): 0–4 low, 5–6 medium, ≥7 high; any single 3 = low-medium. [[Verma2023NEWS2]]`},
 {from:.22,at:.26,loop:2,k:'14:00 · score 13',t:'Escalate: high score, new confusion',
  txt:`New confusion scores 3 on its own. With breathing 26, SpO2 93%, systolic 96 and pulse 118, the total is 13, in the high band. [[Verma2023NEWS2]] The nurse calls the rapid response team. In a meta-analysis, adult rapid response teams cut cardiac arrests outside the ICU (RR 0.66) without a clear fall in hospital mortality; MERIT tripled emergency calls without changing its composite outcome. [[Chan2010RRT,Hillman2005MERIT]]`,
  pt:`New confusion, fast breathing or low blood pressure in someone with an infection is a reason to get help straight away.`,
  hook:`New confusion = 3 points on NEWS2 by itself. [[Verma2023NEWS2]]`},
 {from:.34,at:.38,loop:3,k:'14:10 · cultures',t:'Act: blood cultures before antibiotics',
  txt:`SSC 2021: cultures before antimicrobials if this causes no substantial delay (under 45 minutes). [[Evans2021SSC]] Cultures after antibiotics were positive less often (19.4% vs 31.4%). [[Cheng2019Cultures]] Two sets detect about 90% of bloodstream infections. [[Lee2007Cultures]] If a catheter may be infected, IDSA 2009 asks for paired cultures from the catheter and a peripheral vein (A-II). [[Mermel2009IDSA]]`,
  pt:`Two sets of blood samples are taken to grow the germ, quickly, so the antibiotic is not held up.`,
  hook:`Cultures first only if they take under 45 minutes; never delay antibiotics for them (SSC 2021). [[Evans2021SSC]]`},
 {from:.46,at:.5,loop:3,k:'14:30 · antibiotic',t:'Act: antibiotics within the hour',
  txt:`SSC 2021 recommends antimicrobials immediately, ideally within 1 h, for possible septic shock or a high likelihood of sepsis (strong). [[Evans2021SSC]] In New York State each hour to antibiotics was linked to higher mortality (OR 1.04 per hour); median time was 0.95 h. [[Seymour2017Timing]] A nurse-driven rapid response protocol halved the median time to the first dose, 269 to 135 minutes. [[Semanco2022RRTProtocol]]`,
  pt:`The antibiotic goes in through a drip as soon as possible, here within half an hour of the alarm.`,
  hook:`SSC 2021: septic shock or high likelihood of sepsis, antimicrobials ideally within 1 h. [[Evans2021SSC]]`},
 {from:.58,at:.63,loop:3,k:'15:00 · vasopressor',t:'Act: a vasopressor through a peripheral line',
  txt:`Pressure stays low after fluids, so noradrenaline (norepinephrine) is started. SSC 2021 suggests starting peripherally rather than waiting for a central line, "only for a short period of time and in a vein in or proximal to the antecubital fossa". [[Evans2021SSC]] 85.3% of published peripheral tissue injuries involved a site below the antecubital or popliteal fossa. [[Loubani2015JCC]] The Levophed label: blood pressure every two minutes until the desired effect, then every five minutes; avoid leg veins in older people. [[FDA-Levophed]] Extravasation occurred in 2% of 783 peripheral infusions in one ICU. [[CardenasGarcia2015JHM]]`,
  pt:`The medicine that raises blood pressure runs into a vein near the elbow, and the nurse checks the site and the blood pressure very often.`,
  hook:`Peripheral vasopressor: short term, vein in or above the antecubital fossa (SSC 2021). [[Evans2021SSC,Loubani2015JCC]]`},
 {from:.7,at:.76,loop:3,k:'16:00 · fluid balance',t:'Act: hourly urine and fluid balance',
  txt:`A urinary catheter allows hourly output to be charted. Urine below 0.5 mL/kg/hour for 6 hours meets the KDIGO definition of AKI. [[Kellum2013KDIGO]] Catheters are a risk too: reminders and stop orders cut CAUTI by 53%. [[Meddings2014CAUTI]] In ARDS, a fluid balance kept near even over 7 days shortened ventilation without more shock or dialysis. [[Wiedemann2006FACTT]]`,
  pt:`Urine is measured every hour, because passing very little is an early sign that the kidneys are struggling.`,
  hook:`KDIGO: urine <0.5 mL/kg/h for 6 h = AKI. [[Kellum2013KDIGO]]`},
 {from:.84,at:.92,loop:4,k:'18:00 · score 3',t:'Reassess: the loop goes on',
  txt:`By 18:00 breathing, pressure and alertness have improved and the score has fallen to 3, still on oxygen. Observation continues, because the loop does not end with one good set. When the vasopressor is weaned, the Levophed label says to reduce it gradually, since abrupt stopping may cause marked hypotension. [[FDA-Levophed]] Daily, ask whether each line and catheter can come out. [[Berenholtz2004CRBSI]]`,
  pt:`Things are improving, but the checks carry on. The nurse keeps watching for any change.`,
  hook:`Wean noradrenaline gradually: abrupt stopping may cause marked hypotension (label). [[FDA-Levophed]]`}
];
const NR_Q=[
 {q:'An adult with pneumonia has respiration rate 26, SpO2 93% on air, systolic BP 96, pulse 118, new confusion and temperature 38.9 °C. On the NEWS2 chart as reproduced from the RCP, which band is this?',o:['High clinical risk (7 or more)','Medium clinical risk (5–6)','Low clinical risk (0–4)','It cannot be scored without a lactate'],a:0,
  e:`3 + 2 + 0 + 2 + 2 + 3 + 1 = 13. The RCP chart puts 7–20 in the high band. [[Verma2023NEWS2]] NEWS2 is a teaching example here, not a triage tool.`},
 {q:'Septic shock is suspected. The antibiotic is ready, but blood cultures have still not been obtained after 50 minutes of difficult access. Which statement matches SSC 2021?',o:['Cultures come first only if they cause no substantial delay (under 45 minutes), so the antibiotic should not keep waiting','Antibiotics must always wait until cultures are drawn','Cultures are unnecessary in septic shock','Wait for a central line before giving anything'],a:0,
  e:`SSC 2021: cultures before antimicrobials "if it results in no substantial delay in the start of antimicrobials (i.e. < 45 min)", and antimicrobials ideally within 1 h for possible septic shock. [[Evans2021SSC]]`},
 {q:'Noradrenaline (norepinephrine) is to start through a peripheral cannula. Which site fits the SSC 2021 remark and the injury data?',o:['A vein in or above the antecubital fossa','A small vein on the back of the hand','A vein on the foot','Any vein, as site makes no difference'],a:0,
  e:`SSC 2021: "in a vein in or proximal to the antecubital fossa", for a short period. [[Evans2021SSC]] 85.3% of peripheral tissue injuries involved a site below the antecubital or popliteal fossa. [[Loubani2015JCC]] The label also advises avoiding leg veins in older people. [[FDA-Levophed]]`},
 {q:'The skin around a peripheral noradrenaline site is pale, cool and swollen. Which statement matches the Levophed label?',o:['The area should be infiltrated as soon as possible with 10–15 mL of saline containing 5–10 mg of an adrenergic blocking agent (phentolamine)','Apply heat and continue the infusion at the same site','Stop the infusion abruptly everywhere and wait','Massage the area to spread the drug'],a:0,
  e:`The label: extravasated areas "should be infiltrated as soon as possible with 10 mL to 15 mL of saline solution containing from 5 mg to 10 mg of an adrenergic blocking agent". It also warns that abrupt stopping may cause marked hypotension. [[FDA-Levophed]] Quoted as published; the prescriber and local protocol decide.`},
 {q:'A 70 kg patient has passed 150 mL of urine in the last 6 hours. What does this meet?',o:['The KDIGO urine-output definition of AKI (about 0.36 mL/kg/h, below 0.5 for 6 hours)','Normal output, no action','KDIGO stage 3 (anuria)','Nothing, because only creatinine defines AKI'],a:0,
  e:`150 ÷ 70 ÷ 6 ≈ 0.36 mL/kg/h. KDIGO: urine below 0.5 mL/kg/hour for 6 hours meets the AKI definition (stage 1 at 6–12 hours). [[Kellum2013KDIGO]] Report sustained low output.`},
 {q:'A ventilated patient lies calm with eyes open and follows you with their gaze. Can delirium be ruled out by looking?',o:['No: in the CAM-ICU study delirium was present in 39.5% of observations where the patient looked alert','Yes: calm patients do not have delirium','Yes, if they are not agitated','Delirium cannot be assessed in ventilated patients'],a:0,
  e:`CAM-ICU works in ventilated patients, takes about 2 minutes, and found delirium in 39.5% of observations where the patient looked alert. [[Ely2001CAMICU]] Delirium was linked to higher 6-month mortality (34% vs 15%). [[Ely2004Delirium]]`},
 {q:'Which was one of the five parts of the Johns Hopkins central-line infection intervention?',o:['Asking every day whether each catheter could be removed','Routine replacement of every line every 3 days','Prophylactic antibiotics for all lines','Avoiding chlorhexidine'],a:0,
  e:`The five parts: staff education, an insertion cart, asking daily whether each catheter could come out, an insertion checklist, and empowering nurses to stop insertion if guidelines were breached. Infections fell from 11.3 to 0 per 1,000 catheter-days. [[Berenholtz2004CRBSI]]`},
 {q:'A patient with septic shock in ICU has a blood glucose of 12 mmol/L (216 mg/dL). Which statement matches SSC 2021?',o:['Insulin is recommended from ≥180 mg/dL (10 mmol/L), with a typical target of 144–180 mg/dL','Aim for 4.5–6.0 mmol/L, as tight control saves lives','Glucose does not matter in sepsis','Insulin only above 20 mmol/L'],a:0,
  e:`SSC 2021 recommends starting insulin at ≥180 mg/dL (10 mmol/L), typical target 144–180 mg/dL. [[Evans2021SSC]] NICE-SUGAR found tight control (81–108 mg/dL) raised mortality (27.5% vs 24.9%). [[Finfer2009NICESUGAR]]`}
];
inits.nursing=()=>{
  const svg=$('#nrSvg'),rg=$('#nrT'),note=$('#nrNote'),rd=$('#nrRead');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 668'),h=nrHour(t),p=phaseOf(NR_STEPS,t),S=NR_STEPS[p];
    const L=N?{tx:14,ty:22,cx0:10,lw:84,cw:58,ry:76,rh:27,lc:[112,418],lr:60,nr:23,ck:[316,402],cr:40,dx:14,dy:540,dh:25}
             :{tx:20,ty:24,cx0:20,lw:92,cw:46,ry:78,rh:30,lc:[540,138],lr:76,nr:27,ck:[420,312],cr:38,dx:480,dy:262,dh:26};
    let s=`<defs>${marker('nrA','var(--muted)')}</defs>`;
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-big">${p+1} · ${S.t}</text><text x="${L.tx}" y="${L.ty+16}" class="t-sm">${nrClk(h)} · illustrative ward patient</text>`;
    /* the observation chart */
    const x0=L.cx0+L.lw,top=L.ry-16;
    s+=`<text x="${L.cx0}" y="${top}" class="t-sm">OBSERVATIONS · NEWS2 POINTS</text>`;
    NR_OBS.forEach((o,c)=>{s+=`<text x="${x0+c*L.cw+L.cw/2-2}" y="${L.ry-2}" class="t-xs t-mid" style="fill:${h>=o.h?'var(--ink)':'var(--muted)'};font-weight:700">${nrClk(o.h)}</text>`});
    [...NR_ROWS,['tot','NEWS2 total']].forEach(([k,lab],r)=>{const y=L.ry+6+r*L.rh;
      s+=`<text x="${L.cx0}" y="${y+L.rh/2+2}" class="t-xs" style="fill:var(--ink);font-weight:${k==='tot'?700:500}">${lab}</text>`;
      NR_OBS.forEach((o,c)=>{const x=x0+c*L.cw,shown=h>=o.h-.001,w=L.cw-4,hh=L.rh-4;
        if(!shown){s+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="5" style="fill:var(--panel-2);opacity:.5"/>`;return}
        if(k==='tot'){const sc=nrScore(o),b=nrBand(sc,o);s+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="5" style="fill:${b[1]};opacity:.9"/><text x="${x+w/2}" y="${y+hh/2+5}" class="t-lbl t-mid" style="fill:var(--bg)">${sc}</text>`;return}
        const v=k==='air'?(o.o2?'O2':'air'):o[k],pt=nrPts(k,k==='air'?0:o[k],o.o2),fill=['var(--panel)','var(--warn-soft)','var(--accent-soft)','var(--bad-soft)'][pt];
        s+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="5" style="fill:${fill};stroke:var(--line)"/><text x="${x+w/2-(pt?4:0)}" y="${y+hh/2+3}" class="t-xs t-mid" style="fill:var(--ink)">${v}</text>`;
        if(pt)s+=`<text x="${x+w-4}" y="${y+10}" class="t-xs t-end" style="fill:${pt===3?'var(--bad)':'var(--warn)'};font-weight:700;font-size:8.5px">${pt}</text>`})});
    const cur=[...NR_OBS].reverse().find(o=>h>=o.h)||NR_OBS[0],sc=nrScore(cur),band=nrBand(sc,cur);
    const by=L.ry+6+8*L.rh+12;
    s+=`<text x="${L.cx0}" y="${by}" class="t-xs">0–4 low · 5–6 medium · 7+ high · any single 3: low-medium</text>`;
    /* the loop */
    const[lx,ly]=L.lc;s+=`<circle cx="${lx}" cy="${ly}" r="${L.lr}" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:4 5"/>`;
    const ang=i=>-Math.PI/2+i*2*Math.PI/5,np=i=>[lx+Math.cos(ang(i))*L.lr,ly+Math.sin(ang(i))*L.lr];
    const li=S.loop,prev=p>0?NR_STEPS[p-1].loop:0,mu=ease(ramp(t,S.from,S.from+.05)),ma=lerp(ang(prev),ang(li)+(li<prev?2*Math.PI:0),mu);
    s+=`<circle cx="${f1(lx+Math.cos(ma)*L.lr)}" cy="${f1(ly+Math.sin(ma)*L.lr)}" r="5" style="fill:var(--accent);stroke:var(--panel);stroke-width:1.5"/>`;
    NR_LOOP.forEach((n,i)=>{const[x,y]=np(i),on=i===li;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${L.nr}" style="fill:${on?'var(--rec)':'var(--panel)'};stroke:${on?'var(--rec)':'var(--muted)'};stroke-width:1.6"/><text x="${f1(x)}" y="${f1(y+3)}" class="t-xs t-mid" style="fill:${on?'var(--bg)':'var(--ink)'};font-weight:700;font-size:${N?8.5:9.5}px">${n}</text>`});
    s+=`<text x="${lx}" y="${ly-4}" class="t-xs t-mid">NEWS2</text><text x="${lx}" y="${ly+16}" class="t-big t-mid" style="fill:${band[1]}">${sc}</text><text x="${lx}" y="${ly+30}" class="t-xs t-mid" style="fill:${band[1]};font-weight:700">${band[0]}</text>`;
    /* the first-hour clock from the escalation call, and the action list */
    const mins=clamp((h-14)*60,0,60),[kx,ky]=L.ck;
    s+=clock(kx,ky,L.cr,mins,{h0:14,col:'var(--rx)',label:h>=14?`${Math.round(mins)} min since the call`:'first hour (from the call)',marks:h>=14?[{min:10,col:'var(--pathogen)',label:'cultures'},{min:30,col:'var(--rx)',label:'abx'}]:[]});
    s+=`<text x="${L.dx}" y="${L.dy-12}" class="t-sm" style="fill:var(--rec)">ACTIONS</text>`;
    NR_DO.forEach(([lab,at],i)=>{const y=L.dy+i*L.dh,done=h>=at-.001;
      s+=`<rect x="${L.dx}" y="${y-11}" width="15" height="15" rx="4" style="fill:${done?'var(--rec)':'var(--panel)'};stroke:var(--rec);stroke-width:1.4"/>`;
      if(done)s+=`<path d="M${L.dx+3.5} ${y-4}l3.5 3.5l5 -7" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
      s+=`<text x="${L.dx+22}" y="${y+1}" class="t-xs">${nrClk(at)}</text><text x="${L.dx+58}" y="${y+1}" class="t-xs" style="fill:var(--ink);font-weight:${done?700:500};font-size:10.5px">${lab}</text>`});
    svg.innerHTML=s;
    rd.innerHTML=`<span>Time <b>${nrClk(h)}</b></span><span>Latest NEWS2 <b>${sc}</b> (${band[0]})</span><span>Loop <b>${NR_LOOP[li]}</b></span>`;
    note.innerHTML=noteHTML(S);setSt(p);
    svg.setAttribute('aria-label',`Ward afternoon at ${nrClk(h)}. ${S.t}. Latest NEWS2 score ${sc}, ${band[0]} band. Loop stage: ${NR_LOOP[li]}. Actions done: ${NR_DO.filter(d=>h>=d[1]-.001).map(d=>d[0]).join('; ')||'none yet'}.`);
  }
  const stop=playWire(rg,$('#nrPlay'),draw,28000,'%t:player.replay%','nursing');
  setSt=stepWire($('#nrSteps'),NR_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---------- urine output teaching chart (KDIGO urine criteria, cited in the section) ---------- */
  const uw=$('#nrWt'),um=$('#nrMl'),uh=$('#nrHr'),us=$('#nrUoSvg'),uo=$('#nrUoOut');
  function uoDraw(){const w=clamp(+uw.value||0,20,250),ml=Math.max(0,+um.value||0),hr=clamp(+uh.value||0,1,48),r=ml/w/hr;
    let st,txt;
    if(ml===0&&hr>=12){st=3;txt='Stage 3 range: no urine for 12 hours or more'}
    else if(r<.3&&hr>=24){st=3;txt='Stage 3 range: below 0.3 mL/kg/h for 24 hours or more'}
    else if(r<.5&&hr>=12){st=2;txt='Stage 2 range: below 0.5 mL/kg/h for 12 hours or more'}
    else if(r<.5&&hr>=6){st=1;txt='Stage 1 range: below 0.5 mL/kg/h for 6–12 hours'}
    else if(r<.5){st=0;txt='Below 0.5 mL/kg/h, but for less than 6 hours: KDIGO counts it from 6 hours'}
    else{st=-1;txt='At or above 0.5 mL/kg/h: does not meet the KDIGO urine criterion'}
    const X=v=>30+360*clamp(v/1.5,0,1),col=st>=1?'var(--bad)':st===0?'var(--warn)':'var(--good)';
    let s=`<text x="30" y="22" class="t-sm">URINE OUTPUT · mL/kg/h (average)</text><rect x="30" y="44" width="360" height="34" rx="6" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="30" y="44" width="${f1(X(r)-30)}" height="34" rx="6" style="fill:${col};opacity:.75"/>`;
    [[.3,'0.3'],[.5,'0.5'],[1,'1.0'],[1.5,'1.5+']].forEach(([v,l])=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="38" y2="84" style="stroke:${v<=.5?'var(--bad)':'var(--line)'};stroke-width:${v<=.5?1.6:1};stroke-dasharray:${v<=.5?'4 3':'none'}"/><text x="${f1(X(v))}" y="98" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${f1(Math.min(X(r)+6,330))}" y="66" class="t-lbl" style="fill:var(--ink)">${r.toFixed(2)}</text>`;
    s+=`<text x="30" y="124" class="t-xs">${ml} mL ÷ ${w} kg ÷ ${hr} h</text><text x="30" y="146" class="t-lbl" style="fill:${col};font-size:12.5px">${st>=1?'KDIGO '+txt:txt}</text>`;
    s+=`<text x="30" y="172" class="t-xs">Thresholds as published by KDIGO; drawn range 0–1.5</text>`;
    us.innerHTML=s;us.setAttribute('aria-label',`Urine output ${r.toFixed(2)} mL per kg per hour over ${hr} hours. ${txt}.`);
    uo.innerHTML=`<span>Rate <b>${r.toFixed(2)} mL/kg/h</b></span><span>${st>=1?'<b>KDIGO stage '+st+'</b> urine range':'<b>Not a KDIGO urine stage</b>'}</span><span>Teaching only [[Kellum2013KDIGO]]</span>`}
  [uw,um,uh].forEach(el=>el.addEventListener('input',uoDraw));uoDraw();

  /* ---------- exam-style scenarios ---------- */
  const qc=$('#nrQ'),ans={};let qi=0;
  function q(){const Q=NR_Q[qi],Lt='ABCD',a=ans[qi];
    qc.innerHTML=`<div class="kicker">Scenario ${qi+1} of ${NR_Q.length}</div><p class="q">${Q.q}</p><div class="opts">${Q.o.map((o,i)=>`<button class="opt${a!=null?(i===Q.a?' right':i===a?' wrong':''):''}" data-nro="${i}"${a!=null?' disabled':''}><span class="l">${Lt[i]}</span><span>${o}</span></button>`).join('')}</div>${a!=null?`<div class="expl"><b>${a===Q.a?'Correct.':'Not quite: the answer is '+Lt[Q.a]+'.'}</b> ${Q.e}</div>`:''}`;
    $('#nrBar').style.width=(100*Object.keys(ans).length/NR_Q.length)+'%';
    $('#nrQn').textContent=`${Object.keys(ans).filter(k=>ans[k]===NR_Q[k].a).length} correct of ${Object.keys(ans).length} answered`;
    $('#nrPrev').disabled=qi===0;$('#nrNext').disabled=qi===NR_Q.length-1}
  qc.addEventListener('click',e=>{const b=e.target.closest('[data-nro]');if(!b||ans[qi]!=null)return;ans[qi]=+b.dataset.nro;q()});
  $('#nrPrev').addEventListener('click',()=>{if(qi>0){qi--;q()}});$('#nrNext').addEventListener('click',()=>{if(qi<NR_Q.length-1){qi++;q()}});
  q();
};
