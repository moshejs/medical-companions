/* =============== 5.3 Nursing care =============== */
const NU_STEPS=[
 {from:0,at:.08,k:'Emergency department',t:'ECG within 10 minutes',
  txt:`STEMI process measures target a door-to-ECG time of 10 minutes. At 10 US sites the median was 7 minutes, yet 37.9% of STEMI patients waited longer than 10. Those who waited were more often women (32.8% vs 22.6%), Black, not English-speaking or diabetic, and less often reported chest pain (63.3% vs 87.4%). [[Yiadom2022]] The 2023 ESC guideline states that "an ECG should be performed within 10 min of FMC" (first medical contact). [[Byrne2023ESC]] In an earlier registry, a delayed ECG went with worse 30-day outcomes in STEMI (OR 3.95). [[Diercks2006]]`,
  pt:`The first heart tracing should be done within 10 minutes of arriving, even when the person does not describe chest pain.`,
  hook:`Door-to-ECG ≤10 min. A median of 7 minutes hides the 37.9% who wait longer; women and people without chest pain wait more.`},
 {from:.17,at:.24,k:'Emergency department',t:'Oxygen only if hypoxaemic',
  txt:`In DETO2X-AMI (6,629 people with suspected MI and SpO2 ≥90%), oxygen did not lower 1-year mortality (5.0% vs 5.1%). Hypoxaemia developed in 1.9% with oxygen and 7.7% on air, so saturation needs continued monitoring. [[Hofmann2017]] In AVOID, oxygen in STEMI without hypoxia went with more recurrent MI (5.5% vs 0.9%) and larger infarcts at 6 months (20.3 g vs 13.1 g). [[Stub2015]] A Cochrane review found no evidence supporting routine oxygen and could not rule out harm. [[Cabello2016]]`,
  pt:`Extra oxygen does not help a heart attack when blood oxygen is already normal, so nurses check the level and keep checking it.`,
  hook:`Routine O2 at SpO2 ≥90%: no mortality benefit (DETO2X 5.0% vs 5.1%); AVOID: bigger infarcts (20.3 vs 13.1 g).`},
 {from:.33,at:.4,k:'Emergency department',t:'Pain relief and P2Y12 inhibitors',
  txt:`In IMPRESSION, 5 mg of IV morphine before a 180 mg ticagrelor loading dose lowered ticagrelor exposure by 36% (AUC 6,307 vs 9,791 ng·h/mL) and delayed its peak from 2 to 4 hours. [[Kubica2016]] A meta-analysis had high confidence that morphine weakens P2Y12 inhibition, but its link to higher in-hospital mortality (RR 1.45) was low confidence. [[Duarte2019]] The CRUSADE mortality signal is observational and confounded. <span class="ev hyp">Hypothesis</span> for causation. [[Meine2005H]]`,
  pt:`Morphine can slow the absorption of some clot-preventing tablets, so the team weighs pain relief against that.`,
  hook:`Morphine + ticagrelor: exposure −36%, peak delayed 2 h → 4 h (IMPRESSION). Interaction Established; harm unproven.`},
 {from:.5,at:.56,k:'Cath lab',t:'Access site: wrist or groin',
  txt:`In MATRIX (8,404 people with ACS), radial access reduced major bleeding (1.6% vs 2.3%) and all-cause mortality (1.6% vs 2.2%) at 30 days. [[Valgimigli2015MATRIX]] In RIVAL, radial access cut large haematomas (42 vs 106 patients; HR 0.40) and pseudoaneurysms needing closure (HR 0.30). [[Jolly2011RIVAL]] After femoral access, ambulation as early as 2 hours was judged safe, and back pain rose 8% for each extra hour of bed rest. [[Busca2023]]`,
  pt:`A tube through the wrist bleeds less than one through the groin. Either way, nurses check the site often.`,
  hook:`Radial vs femoral (MATRIX): major bleeding 1.6% vs 2.3%; death 1.6% vs 2.2%.`},
 {from:.66,at:.74,k:'Coronary care unit / ward',t:'Watch for bleeding and rhythm',
  txt:`About 90% of VT/VF in STEMI treated with primary PCI happened within 48 hours of symptom onset, which is why people are monitored. [[Mehta2009APEX]] After transradial PCI, haemoglobin fell a mean 0.6 g/dL in 24 hours and 30% became anaemic; a fall over 3 g/dL went with more 30-day events. [[Bertrand2010]] Retroperitoneal bleeding was rare (0.06% of PCIs), femoral access was its strongest predictor (OR 19.66), and it raised 30-day mortality (OR 3.59). [[Kwok2018]] After fibrinolysis, about 4 extra strokes per 1,000 occurred on days 0–1. [[FTT1994]] Confirming radial flow during compression (patent haemostasis) cut radial artery occlusion by 75% at 30 days. [[Pancholy2008]]`,
  pt:`For the first days the team watches the heart rhythm, the puncture site and blood counts, because these are when problems most often appear.`,
  hook:`VT/VF: 90% within 48 h of symptom onset. Femoral access: strongest predictor of retroperitoneal bleed (OR 19.66).`},
 {from:.84,at:.95,k:'Going home',t:'Discharge and teaching',
  txt:`Unplanned interruption of dual antiplatelet therapy (DAPT) carried the highest risk in the first 7 days (HR 7.04), falling to 2.17 at 8–30 days and 1.3 later. [[Mehran2013]] In PREMIER, 13.6% had stopped their thienopyridine by 30 days; their 11-month mortality was 7.5% vs 0.7%. [[Spertus2006]] Discharge programmes with several parts cut 30-day readmission (RR 0.82). [[Leppin2014]] Nurse-led prevention clinics lowered 4-year mortality (14.5% vs 18.9%). [[Murchie2003]]`,
  pt:`Do not stop your antiplatelet pills on your own, even for bruising. Talk to your heart team first.`,
  hook:`DAPT disruption HR 7.04 in the first 7 days (PARIS); physician-guided stopping did not raise risk (HR 0.63).`}
];
const NU_PRI=[
 ['12-lead ECG within 10 min of arrival','Do not wait for chest pain to be reported','Rhythm monitoring from arrival','ECG read by a qualified clinician at once'],
 ['Check SpO2 before any oxygen','No routine oxygen when SpO2 is normal','Keep monitoring: hypoxaemia can develop','Record saturation trend'],
 ['Assess and record pain','Note opioid timing against P2Y12 loading','Report pain that persists or returns','Give medicines as prescribed'],
 ['Note the access site and device','Check the radial pulse (occlusion risk)','Look for haematoma and bleeding','Femoral: early mobilisation per protocol'],
 ['Continuous rhythm monitoring','Site checks; TR band deflation per protocol','Haemoglobin trend; report big falls','Watch for bleeding after fibrinolysis'],
 ['Teach: never stop DAPT without the team','GTN use as the label states','Rehab referral and early follow-up','Mood, smoking, driving questions']
];
const NU_FLIPS=[
 ['Major bleeding','How often does major bleeding happen at 30 days?','1.6% (MATRIX, BARC major bleeding)','2.3%','Radial access reduced major bleeding and all-cause mortality (1.6% vs 2.2%) in ACS. [[Valgimigli2015MATRIX]]'],
 ['Large haematoma','How many large haematomas in RIVAL?','42 of 3,507 patients','106 of 3,514 patients','HR 0.40 for radial; pseudoaneurysm needing closure 7 vs 23 (HR 0.30). [[Jolly2011RIVAL]]'],
 ['Artery occlusion','What can block the artery afterwards?','Radial artery occlusion: 7.7% within 24 h, 5.5% after a week','Not measured for femoral access in this review','Higher heparin dose, shorter compression and patent haemostasis reduce radial occlusion. [[Rashid2016,Pancholy2008]]'],
 ['Compression','How is the site closed?','A band (TR band); deflating from 1 h, 2 mL every 10 min, did not add bleeding after diagnostic catheterisation','Compression, then a period of bed rest (length varies)','Faster deflation removed the band 129 minutes sooner with more pain-free patients. [[Deuling2017]]'],
 ['Mobilising','When can the person get up?','The band protocol, not bed rest, sets the pace','Bed rest length was not linked to haematoma; ambulation from 2 h judged safe','Back pain rose 8% per extra hour of bed rest. [[Busca2023]]'],
 ['Hidden bleeding','Which bleed can be invisible?','Retroperitoneal bleeding is rare with radial access','Femoral access: strongest predictor of retroperitoneal bleeding (OR 19.66)','RH occurred in 0.06% of UK PCIs and raised 30-day mortality (OR 3.59). [[Kwok2018]]'],
 ['Bruising at a week','Is a bruise after going home normal?','Bruising reported by 60%','Bruising reported by 73%','68.6% had bruising 5–7 days after discharge, 47% of them larger than 7.5 cm; women more often. [[Cosman2011]]']
];
/* [finding, correct: 'c' common/expected or 'r' report promptly, explanation] */
const NU_SORT=[
 ['A bruise around the wrist puncture 5 days after going home','c','Common: 68.6% of patients reported access-site bruising 5–7 days after discharge (60% after radial access). Teach that it is expected, and to report a bruise that grows, a lump or bleeding. [[Cosman2011]]'],
 ['A groin bruise larger than 7.5 cm a week after a femoral procedure','c','Surprisingly common: 47% of the bruises reported were larger than 7.5 cm, and bruising followed 73% of femoral procedures. Size alone is not an emergency; record and teach. [[Cosman2011]]'],
 ['Haemoglobin 0.6 g/dL lower the morning after transradial PCI','c','This was the mean fall within 24 hours in the EASY trial, and 30% of patients became anaemic. Record the trend. [[Bertrand2010]]'],
 ['Haemoglobin more than 3 g/dL lower than before the procedure','r','Report: a fall over 3 g/dL was linked to more major events at 30 days. [[Bertrand2010]]'],
 ['Pulsatile bleeding from the wrist while the band is being deflated','r','Report and act per protocol: pulsatile bleeding was the bleeding outcome counted in the band-deflation trial (8 vs 11 events). [[Deuling2017]]'],
 ['A large, growing haematoma at the femoral site','r','Report: large haematoma was a counted complication in RIVAL, about 2.5 times more common with femoral access (106 vs 42). [[Jolly2011RIVAL]]'],
 ['No radial pulse at the wrist the day after radial PCI','r','Report: this suggests radial artery occlusion, seen in 7.7% within 24 hours; patent haemostasis lowers the risk. [[Rashid2016,Pancholy2008]]'],
 ['Breathlessness, mild, two days after starting ticagrelor','c','Common and usually mild to moderate: dyspnoea affected about 14–21% in the label\'s trials and often resolved with continued treatment. Record it, tell the prescriber, and do not stop the drug without the team. [[FDA-Brilinta]]']
];
const NU_QUIZ=[
 {q:'A 58-year-old woman arrives at triage with nausea, sweating and tiredness but no chest pain. What is the priority?',o:['Take a full history before any tests','Obtain a 12-lead ECG within 10 minutes of arrival','Wait for the first troponin result','Give oxygen at 6 L/min'],a:1,e:`The 10-minute door-to-ECG goal applies to everyone who might be having an MI. Women and people without chest pain are the ones most likely to wait longer than 10 minutes. [[Yiadom2022]] Troponin takes longer and does not replace the ECG, and routine oxygen is not indicated with normal saturation. [[Hofmann2017]]`},
 {q:'A man with suspected MI has SpO2 97% on room air and asks for oxygen "to help the heart". What is the best response?',o:['Start oxygen at 8 L/min','Start oxygen at 2 L/min to be safe','Explain oxygen does not help when levels are normal, and keep monitoring SpO2','Stop pulse oximetry, as it is normal'],a:2,e:`At SpO2 ≥90%, oxygen did not lower mortality (DETO2X-AMI), and in AVOID it went with larger infarcts. Hypoxaemia can still develop (7.7% on air), so monitoring continues. [[Hofmann2017,Stub2015]]`},
 {q:'Four patients after transradial PCI. Whom should the nurse assess first?',o:['A 4 cm bruise at the wrist on day 1','Haemoglobin 3.4 g/dL lower than before the procedure','Asking when they can drive','Mild breathlessness two days after starting ticagrelor'],a:1,e:`A haemoglobin fall over 3 g/dL was linked to more major events at 30 days. [[Bertrand2010]] Bruising is common [[Cosman2011]], mild dyspnoea on ticagrelor is a known, usually mild effect [[FDA-Brilinta]], and the driving question can wait for teaching (check local licensing rules).`},
 {q:'Three days after a stent, a patient says the bruises on his arm worry him and he will stop his antiplatelet tablets. What should the nurse say?',o:['That is reasonable for a few days','Bruising is common; do not stop without talking to the heart team, because stopping early is risky','Halve the dose instead','Stop aspirin but keep the other tablet'],a:1,e:`Unplanned DAPT disruption had the highest risk in the first 7 days (HR 7.04), and stopping a thienopyridine by 30 days went with 7.5% vs 0.7% mortality at 11 months. [[Mehran2013,Spertus2006]] The ticagrelor label advises managing bleeding without stopping if possible. [[FDA-Brilinta]]`},
 {q:'Before discharge, a patient prescribed GTN mentions he uses tadalafil. What is the nurse\'s priority?',o:['Advise taking them at least an hour apart','Teach that the label says GTN must not be used with PDE-5 inhibitors such as tadalafil, and tell the prescriber','Say this is only a problem with sildenafil','Tell him to take half a GTN tablet'],a:1,e:`The label states: "Do not use NITROSTAT in patients who are taking PDE-5 Inhibitors, such as avanafil, sildenafil, tadalafil, vardenafil hydrochloride. Concomitant use can cause severe hypotension, syncope, or myocardial ischemia." [[FDA-Nitrostat]]`},
 {q:'Which statement shows the patient understood the GTN teaching?',o:['"I\'ll stand up so it works faster."','"I can keep a few tablets loose in my pill box."','"I sit down, take one tablet under my tongue, and can repeat every 5 minutes, no more than 3 in 15 minutes; if the pain persists or feels different, I get help at once."','"If one tablet doesn\'t work I\'ll wait an hour before the next."'],a:2,e:`This matches the label: one tablet at the first sign, another every 5 minutes, no more than three in 15 minutes, and prompt medical attention if pain persists or is different. It is taken at rest, preferably sitting, and kept in the original glass container. [[FDA-Nitrostat]]`}
];
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');
  const ROOM=[0,0,0,1,2,3],RN=['Emergency dept','Cath lab','CCU / ward','Home'],RNn=['ED','Cath lab','CCU/ward','Home'];
  const lpOf=t=>{const p=phaseOf(NU_STEPS,t),a=NU_STEPS[p].from;return ramp(t,a,Math.max(a+.01,NU_STEPS[p].at))};
  const tic=(h,tau,A)=>A*h*Math.exp(-h/tau);
  function bed(x,y,s){return `<rect x="${f1(x-16*s)}" y="${f1(y-3*s)}" width="${f1(32*s)}" height="${f1(6*s)}" rx="2" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><circle cx="${f1(x-10*s)}" cy="${f1(y-7*s)}" r="${f1(3.6*s)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><path d="M${f1(x-6*s)} ${f1(y-5*s)}H${f1(x+14*s)}" style="stroke:var(--rec);stroke-width:${f1(5*s)};stroke-linecap:round"/><path d="M${f1(x-14*s)} ${f1(y+3*s)}v${f1(5*s)}M${f1(x+14*s)} ${f1(y+3*s)}v${f1(5*s)}" style="stroke:var(--muted);stroke-width:1.6"/>`}
  function hbars(x,y,w,rows,o){let s='';rows.forEach((r,i)=>{const yy=y+i*(o.rh||30);s+=`<text x="${f1(x)}" y="${f1(yy)}" class="t-xs" style="fill:var(--ink)">${r[0]}</text>`;
      r.slice(1).forEach((v,j)=>{const by=yy+5+j*13,bw=w*clamp(v/(o.maxes?o.maxes[i]:o.max))*o.p;s+=`<rect x="${f1(x)}" y="${f1(by)}" width="${f1(w)}" height="8" rx="2" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(by)}" width="${f1(bw)}" height="8" rx="2" style="fill:${o.cols[j]}"/>`;
        if(o.p>.7)s+=`<text x="${f1(x+bw+4)}" y="${f1(by+8)}" class="t-xs" style="fill:${o.cols[j]};font-weight:600">${o.fmt(v,j)}</text>`})});return s}
  function legend(x,y,items){let s='',xx=x;items.forEach(([c,l])=>{s+=`<rect x="${f1(xx)}" y="${f1(y-7)}" width="10" height="7" style="fill:${c}"/><text x="${f1(xx+14)}" y="${f1(y)}" class="t-xs">${l}</text>`;xx+=24+l.length*6.6});return s}
  function inst(p,lp,t,x,y,w,h,N){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;const px=x+14,pw=w-28,ty=y+22;
    const head=a=>`<text x="${f1(px)}" y="${f1(ty)}" class="t-sm" style="fill:var(--ink);font-weight:600">${a}</text>`;
    if(p===0){s+=head('DOOR-TO-ECG CLOCK');const mins=lp*7;
      s+=clock(px+52,ty+70,46,mins,{full:10,col:'var(--rec)',ticks:10});
      s+=`<text x="${f1(px+52)}" y="${f1(ty+134)}" class="t-xs t-mid" style="fill:var(--ink)">${mins.toFixed(1)} of 10 min</text>`;
      const ex=px+120,ew=pw-120,ey=ty+18,eh=84;s+=ecgGrid(ex,ey,ew,eh,{mm:4,minor:!N});
      s+=ecgTrace(ex+4,ey+eh*.62,ew-8,{mm:4,hr:76,st:lp>.5?2.5:0,upto:lp,pen:lp<1}).svg;
      s+=`<text x="${f1(ex)}" y="${f1(ey+eh+16)}" class="t-xs">${N?'ECG (schematic)':'12-lead ECG being recorded (schematic)'}</text>`;
      s+=hbars(px,ty+160,pw*.6,[['Median door-to-ECG (target 10)',7]],{max:10,p:1,cols:['var(--rec)'],fmt:v=>v+' min',rh:30});
      s+=hbars(px,ty+192,pw*.6,[['STEMI patients waiting over 10 min',37.9]],{max:100,p:1,cols:['var(--brand)'],fmt:v=>v+'%',rh:30});
      if(h>230)s+=`<text x="${f1(px)}" y="${f1(ty+226)}" class="t-xs">Longer waits: women, Black patients, no chest pain</text>`}
    else if(p===1){s+=head('PULSE OXIMETER FIRST');const v=Math.round(97-lp*1);
      s+=`<rect x="${f1(px)}" y="${f1(ty+12)}" width="120" height="70" rx="10" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/><text x="${f1(px+10)}" y="${f1(ty+30)}" class="t-xs" style="fill:var(--rx)">SpO2 %</text><text x="${f1(px+60)}" y="${f1(ty+70)}" class="t-mid" style="font:800 32px var(--display);fill:var(--rx)">${v}</text>`;
      let d='';for(let i=0;i<=40;i++){const u=i/40,yy=ty+56-Math.max(0,Math.sin((u*3+t*30)*Math.PI*2))*16;d+=(i?'L':'M')+f1(px+130+u*(pw-130))+' '+f1(yy)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:2"/><text x="${f1(px)}" y="${f1(ty+100)}" class="t-xs" style="fill:var(--rx)">Trials enrolled SpO2 ≥90%: no routine oxygen</text>`;
      s+=hbars(px,ty+124,pw*.55,[['DETO2X 1-year death (%)',5.0,5.1],['AVOID infarct size (g)',20.3,13.1],['Hypoxaemia developed (%)',1.9,7.7]],{max:22,maxes:[8,22,8],p:lp,cols:['var(--brand)','var(--muted)'],fmt:(v,j)=>(j?'air ':'O2 ')+v,rh:42});
      s+=legend(px,y+h-10,[['var(--brand)','oxygen'],['var(--muted)','air / none']])}
    else if(p===2){s+=head('TICAGRELOR LEVEL AFTER LOADING');const cx=px,cw=pw,cy=ty+14,ch=h-74,up=lp*12;
      const C1=curve(cx,cy,cw,ch,hh=>tic(hh,2,1),{x0:0,x1:12,y0:0,y1:.8,upto:up,col:'var(--rx)',fill:true,dot:true});
      const C2=curve(cx,cy,cw,ch,hh=>tic(hh,4,.1977),{x0:0,x1:12,y0:0,y1:.8,upto:up,col:'var(--brand)',dot:true,dash:'6 4'});
      s+=C1.svg+C2.svg.replace(/<rect[^>]*var\(--field\)[^>]*\/>/,'');
      [0,2,4,6,8,10,12].forEach(hh=>s+=`<text x="${f1(C1.X(hh))}" y="${f1(cy+ch+14)}" class="t-xs t-mid">${hh}${hh===12?' h':''}</text>`);
      if(lp>.25){s+=`<line x1="${f1(C1.X(2))}" x2="${f1(C1.X(2))}" y1="${f1(C1.Y(.74))}" y2="${f1(cy+ch)}" class="grid"/><text x="${f1(C1.X(2.6))}" y="${f1(C1.Y(.76))}" class="t-xs" style="fill:var(--rx);font-weight:600">peak 2 h, AUC 9,791</text>`}
      if(lp>.5){s+=`<line x1="${f1(C1.X(4))}" x2="${f1(C1.X(4))}" y1="${f1(C1.Y(.29))}" y2="${f1(cy+ch)}" class="grid"/><path d="M${f1(C1.X(4))} ${f1(C1.Y(.3))}L${f1(C1.X(5.2))} ${f1(C1.Y(.56))}" style="stroke:var(--brand);stroke-width:1"/><text x="${f1(C1.X(5.3))}" y="${f1(C1.Y(.6))}" class="t-xs" style="fill:var(--brand);font-weight:600">morphine: peak 4 h</text><text x="${f1(C1.X(5.3))}" y="${f1(C1.Y(.6)+14)}" class="t-xs" style="fill:var(--brand);font-weight:600">AUC 6,307 (−36%)</text>`}
      s+=legend(px,y+h-10,[['var(--rx)','placebo'],['var(--brand)','IV morphine 5 mg']])}
    else if(p===3){s+=head('RADIAL (WRIST) VS FEMORAL (GROIN)');
      /* forearm with a band, and a groin site */
      const ax=px+8,ay=ty+20;s+=`<path d="M${f1(ax)} ${f1(ay+22)}Q${f1(ax+60)} ${f1(ay+14)} ${f1(ax+120)} ${f1(ay+20)}L${f1(ax+120)} ${f1(ay+44)}Q${f1(ax+60)} ${f1(ay+40)} ${f1(ax)} ${f1(ay+48)}Z" style="fill:var(--skin);stroke:var(--muted)"/><rect x="${f1(ax+84)}" y="${f1(ay+12)}" width="16" height="38" rx="3" style="fill:var(--accent);opacity:.75"/><ellipse cx="${f1(ax+92)}" cy="${f1(ay+30)}" rx="6" ry="9" style="fill:var(--balloon);opacity:${f1(.6-.4*lp)}"/><text x="${f1(ax+60)}" y="${f1(ay+66)}" class="t-xs t-mid">wrist + band</text>`;
      const gx=px+pw-110,gy=ty+18;s+=`<path d="M${f1(gx)} ${f1(gy)}H${f1(gx+100)}L${f1(gx+86)} ${f1(gy+56)}H${f1(gx+60)}L${f1(gx+50)} ${f1(gy+20)}L${f1(gx+40)} ${f1(gy+56)}H${f1(gx+14)}Z" style="fill:var(--skin);stroke:var(--muted)"/><circle cx="${f1(gx+24)}" cy="${f1(gy+22)}" r="${f1(4+6*lp)}" style="fill:var(--isch);opacity:.5"/><circle cx="${f1(gx+24)}" cy="${f1(gy+22)}" r="3" style="fill:var(--brand)"/><text x="${f1(gx+50)}" y="${f1(gy+70)}" class="t-xs t-mid">groin site</text>`;
      s+=hbars(px,ty+(N?112:100),pw*.55,[['Major bleeding, 30 d (%)',1.6,2.3],['All-cause death, 30 d (%)',1.6,2.2]],{max:2.6,p:lp,cols:['var(--rec)','var(--brand)'],fmt:(v,j)=>(j?'femoral ':'radial ')+v+'%',rh:44});
      s+=hbars(px,ty+(N?202:190),pw*.55,[['Large haematoma, RIVAL (patients)',42,106]],{max:110,p:lp,cols:['var(--rec)','var(--brand)'],fmt:(v,j)=>(j?'femoral ':'radial ')+v,rh:34});
      s+=legend(px,y+h-10,[['var(--rec)','radial'],['var(--brand)','femoral']])}
    else if(p===4){s+=head('MONITOR, SITE, BLOODS');const mx=px,my=ty+12,mw=pw,mh=78;
      s+=`<rect x="${f1(mx)}" y="${f1(my)}" width="${f1(mw)}" height="${f1(mh)}" rx="8" style="fill:#0e1a14"/>`;
      s+=ecgTrace(mx+8,my+52,mw-90,{mm:3.2,hr:72,from:t*40,col:'#6fe08a',lw:1.8}).svg;
      s+=`<text x="${f1(mx+mw-10)}" y="${f1(my+28)}" class="t-end" style="font:800 24px var(--display);fill:#6fe08a">72</text><text x="${f1(mx+mw-10)}" y="${f1(my+44)}" class="t-xs t-end" style="fill:#6fe08a">HR</text>`;
      s+=`<text x="${f1(px)}" y="${f1(my+mh+20)}" class="t-xs" style="fill:var(--ink)">VT/VF episodes within 48 h of symptom onset</text>`;
      s+=`<rect x="${f1(px)}" y="${f1(my+mh+28)}" width="${f1(pw)}" height="12" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(px)}" y="${f1(my+mh+28)}" width="${f1(pw*.9*lp)}" height="12" rx="4" style="fill:var(--brand)"/><text x="${f1(px+pw*.9*lp+4)}" y="${f1(my+mh+38)}" class="t-xs" style="fill:var(--brand);font-weight:700">${lp>.4?Math.round(90*lp)+'%':''}</text>`;
      const rows=[['Hb fall in 24 h (mean)','0.6 g/dL'],['Report a fall over','3 g/dL'],['Retroperitoneal bleed','0.06% of PCI'],['Extra strokes, lysis d0–1','4 / 1,000']];
      rows.forEach((r,i)=>{const yy=my+mh+64+i*18,on=lp>i*.22;s+=`<text x="${f1(px)}" y="${f1(yy)}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">${r[0]}</text><text x="${f1(px+pw)}" y="${f1(yy)}" class="t-xs t-end" style="fill:${on?'var(--brand)':'var(--muted)'};font-weight:700">${on?r[1]:'…'}</text>`})}
    else{s+=head('RISK AFTER UNPLANNED DAPT DISRUPTION');const zx=px+pw*.12,sc=(pw*.8)/7.5;
      [['0–7 days',7.04],['8–30 days',2.17],['>30 days',1.3]].forEach((r,i)=>{const yy=ty+30+i*34,bw=r[1]*sc*clamp(lp*1.5-i*.25);
        s+=`<text x="${f1(px)}" y="${f1(yy)}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><rect x="${f1(px)}" y="${f1(yy+5)}" width="${f1(Math.max(0,bw))}" height="11" rx="2" style="fill:var(--brand)"/>`;
        if(bw>=r[1]*sc*.98)s+=`<text x="${f1(px+bw+5)}" y="${f1(yy+15)}" class="t-xs" style="fill:var(--brand);font-weight:700">HR ${r[1]}</text>`});
      s+=`<line x1="${f1(px+sc)}" x2="${f1(px+sc)}" y1="${f1(ty+28)}" y2="${f1(ty+128)}" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${f1(px+sc+4)}" y="${f1(ty+138)}" class="t-xs">HR 1</text>`;void zx;
      const pyy=ty+162;s+=`<text x="${f1(px)}" y="${f1(pyy)}" class="t-xs" style="fill:var(--ink)">PREMIER: 11-month mortality</text>`;
      s+=hbars(px,pyy+18,pw*.6,[['stopped by 30 days',7.5],['continued',.7]],{max:8,p:lp,cols:['var(--brand)'],fmt:v=>v+'%',rh:26})}
    return s}
  function draw(t){
    const N=vb(svg,'720 460','400 690'),p=phaseOf(NU_STEPS,t),lp=lpOf(t);
    const RW=N?{x:12,w:91,g:4,y:14,h:84}:{x:14,w:170,g:4,y:14,h:84};
    const rx=i=>RW.x+i*(RW.w+RW.g);
    let s='';
    /* the corridor */
    s+=`<line x1="${RW.x}" x2="${rx(3)+RW.w}" y1="${RW.y+RW.h-16}" y2="${RW.y+RW.h-16}" style="stroke:var(--line);stroke-width:2;stroke-dasharray:6 5"/>`;
    for(let i=0;i<4;i++){const on=ROOM[p]===i,done=ROOM[p]>i;s+=`<rect x="${f1(rx(i))}" y="${RW.y}" width="${RW.w}" height="${RW.h}" rx="10" style="fill:${on?'var(--rec-soft)':'var(--field)'};stroke:${on?'var(--rec)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(rx(i)+10)}" y="${RW.y+20}" class="t-xs" style="fill:${on?'var(--rec)':done?'var(--ink)':'var(--muted)'};font-weight:700">${(N?RNn:RN)[i].toUpperCase()}</text>`;
      if(!N)s+=`<text x="${f1(rx(i)+10)}" y="${RW.y+36}" class="t-xs">${['ECG, monitor, O2 check','PCI, access site','rhythm, bleeding','teaching, follow-up'][i]}</text>`}
    /* patient token moves between rooms early in each step */
    const pr=p>0?ROOM[p-1]:0,cr=ROOM[p],mv=ease(ramp(t,NU_STEPS[p].from,NU_STEPS[p].from+(NU_STEPS[p].at-NU_STEPS[p].from)*.6)),ri=lerp(pr,cr,mv);
    const bx=RW.x+ri*(RW.w+RW.g)+RW.w/2;s+=bed(bx,RW.y+RW.h-22,N?1:1.3);
    /* instrument panel and priorities */
    const I=N?{x:12,y:112,w:376,h:300}:{x:14,y:112,w:444,h:334},P=N?{x:12,y:424,w:376,h:252}:{x:466,y:112,w:240,h:334};
    s+=inst(p,lp,t,I.x,I.y,I.w,I.h,N);
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="10" style="fill:var(--panel);stroke:var(--rec);stroke-width:1.2"/><text x="${P.x+14}" y="${P.y+24}" class="t-sm" style="fill:var(--rec);font-weight:600">NURSING PRIORITIES</text><text x="${P.x+14}" y="${P.y+40}" class="t-xs">${NU_STEPS[p].t}</text>`;
    NU_PRI[p].forEach((ln,i)=>{const on=lp>=i*.24+.04,yy=P.y+70+i*(N?54:62);
      s+=`<rect x="${P.x+14}" y="${yy-12}" width="16" height="16" rx="4" style="fill:${on?'var(--rec)':'none'};stroke:var(--rec);stroke-width:1.4"/>`+(on?`<path d="M${P.x+18} ${yy-4}l3 3l6 -7" style="fill:none;stroke:var(--panel);stroke-width:2"/>`:'');
      const words=ln.split(' '),lines=[''];const mx=N?40:26;words.forEach(wd=>{if((lines[lines.length-1]+' '+wd).trim().length>mx)lines.push(wd);else lines[lines.length-1]=(lines[lines.length-1]+' '+wd).trim()});
      lines.forEach((l2,j)=>s+=`<text x="${P.x+38}" y="${yy+j*15}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?600:500}">${l2}</text>`)});
    svg.innerHTML=s;
    setSt(p);
    rg.setAttribute('aria-valuetext',`${RN[ROOM[p]]}: ${NU_STEPS[p].t}`);
    $('#nuRead').innerHTML=`<span>room <b>${RN[ROOM[p]]}</b></span><span>stage <b>${p+1} of ${NU_STEPS.length}</b></span><span>priorities done <b>${NU_PRI[p].filter((x,i)=>lp>=i*.24+.04).length} of 4</b></span>`;
    $('#nuNote').innerHTML=noteHTML(NU_STEPS[p]);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,30000,'%t:player.replay%','nursing');
  const setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- flip set ---- */
  $('#nuFlips').innerHTML=NU_FLIPS.map((f,i)=>`<button class="nu-flip" type="button" aria-pressed="false" data-nf="${i}"><small>${f[0]} · tap to flip</small><span class="fr"><b class="big">${f[1]}</b></span><span class="nu-side"><span><i>Radial</i>${f[2]}</span><span><i>Femoral</i>${f[3]}</span></span><span class="bk">${f[4]}</span></button>`).join('');
  $('#nuFlips').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('[data-nf]');if(!b)return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});

  /* ---- sorter ---- */
  const so=$('#nuSort'),ans={};
  so.innerHTML=NU_SORT.map((it,i)=>`<div class="nu-item" data-ni="${i}"><p class="f">${it[0]}</p><div class="ctrls" role="group" aria-label="Sort this finding"><button class="btn" type="button" data-ns="${i}" data-v="c" aria-pressed="false">Common, expected</button><button class="btn" type="button" data-ns="${i}" data-v="r" aria-pressed="false">Report promptly</button></div><div class="fb" hidden></div></div>`).join('');
  function score(){const n=Object.keys(ans).length,ok=Object.keys(ans).filter(k=>ans[k]===NU_SORT[k][1]).length;$('#nuSortScore').innerHTML=`<span>sorted <b>${n} of ${NU_SORT.length}</b></span><span>matching the evidence <b>${ok}</b></span>`}
  so.addEventListener('click',e=>{const b=e.target.closest('[data-ns]');if(!b)return;const i=+b.dataset.ns,v=b.dataset.v,it=NU_SORT[i],row=so.querySelector(`[data-ni="${i}"]`);ans[i]=v;
    $$('[data-ns]',row).forEach(x=>x.setAttribute('aria-pressed',x===b));const fb=$('.fb',row),ok=v===it[1];fb.hidden=false;fb.className='fb '+(ok?'ok':'no');
    fb.innerHTML=`<b>${ok?'Matches the evidence.':'Look again.'}</b> ${it[2]}`;score()});
  score();

  /* ---- quiz ---- */
  const qz=$('#nuQuiz'),done={};
  qz.innerHTML=NU_QUIZ.map((q,i)=>`<div class="qcard" data-nq="${i}"><div class="kicker">Scenario ${i+1} of ${NU_QUIZ.length}</div><div class="q">${q.q}</div><div class="opts">${q.o.map((o,j)=>`<button class="opt" type="button" data-qo="${j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div class="expl" hidden></div></div>`).join('');
  function qscore(){const n=Object.keys(done).length,ok=Object.values(done).filter(Boolean).length;$('#nuQuizScore').innerHTML=`<span>answered <b>${n} of ${NU_QUIZ.length}</b></span><span>correct <b>${ok}</b></span>`}
  qz.addEventListener('click',e=>{const b=e.target.closest('[data-qo]');if(!b||b.disabled)return;const card=b.closest('[data-nq]'),i=+card.dataset.nq,q=NU_QUIZ[i],j=+b.dataset.qo;
    $$('[data-qo]',card).forEach(x=>{x.disabled=true;const k=+x.dataset.qo;if(k===q.a)x.classList.add('right');else if(k===j)x.classList.add('wrong')});
    done[i]=j===q.a;const ex=$('.expl',card);ex.hidden=false;ex.innerHTML=`<b>${j===q.a?'Correct.':'Not quite.'} The answer is ${'ABCD'[q.a]}.</b> ${q.e}`;qscore()});
  qscore();
};
