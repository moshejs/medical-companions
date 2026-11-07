/* =============== 5.4 Nursing care =============== */
/* (1) The main scrubber: an assessment of a breathless person with COPD in six steps, a bedside scene (nuScene,
   local glyph) plus a panel of cited figures per step. The patient's readings are made up for teaching and
   labelled as such; every target, device and figure is quoted from the research. (2) An oxygen target checker
   that restates the BTS 2017 target ranges and review triggers. (3) A teach-to-goal inhaler checklist. */
const NU_STEPS=[
 {from:0,at:.05,k:'Count',t:'Respiratory rate',
  txt:'Respiratory rate is often not recorded in hospital, even though an abnormal rate is a recognised predictor of serious clinical events [[Cretikos2008]]. It is one of the observations in the National Early Warning Score, which in 35,585 acute medical admissions discriminated death within 24 hours with an AUROC of 0.894 [[Smith2013NEWS]].',
  pt:'Counting breaths for a full minute is one of the simplest and most useful checks a nurse makes [[Cretikos2008]].',
  hook:'Respiratory rate: the neglected vital sign that predicts serious events [[Cretikos2008]].'},
 {from:.16,at:.22,k:'Score',t:'NEWS2 and scale 2',
  txt:'NEWS2 has two oxygen saturation scales; the second sets the target at 88–92% for people with hypercapnic respiratory failure. In 2,645 people admitted with an exacerbation, scoring everyone with COPD on scale 2 cut alerts by 12.6% without missing same-day deaths, and its AUROC for inpatient death was 0.72 vs 0.65 for NEWS [[Echevarria2019]]. A multicentre study found NEWS2 slightly less discriminating than NEWS in people at risk of type 2 failure (0.860 vs 0.881), so who goes on scale 2 is still debated [[Pimentel2019]].',
  pt:'People whose lungs hold on to carbon dioxide are scored against a lower oxygen target, so the alarm does not ring for a level that is right for them [[Echevarria2019]].',
  hook:'NEWS2 scale 2: target 88–92% in hypercapnic respiratory failure; alerts −12.6% in one COPD study [[Echevarria2019]].'},
 {from:.33,at:.39,k:'Prescribe a target',t:'Controlled oxygen',
  txt:'The BTS 2017 guideline recommends a target saturation of 94–98% for most acutely ill patients, or 88–92% (or a patient-specific range) for those at risk of hypercapnic respiratory failure, with a target range prescribed for every patient on admission. Before blood gases are available in COPD it lists a 24% Venturi mask at 2–3 L/min, a 28% Venturi mask at 4 L/min or nasal cannulae at 1–2 L/min, aiming for 88–92%, adjusted to 94–98% if the PCO2 is normal. Venturi flow can be increased by up to 50% if the respiratory rate is above 30 [[ODriscoll2017G]].',
  pt:'Oxygen is a medicine. For many people with COPD the aim is a little lower than for others, 88 to 92% [[ODriscoll2017G]].',
  hook:'Hypercapnic risk: 88–92% with a 24% Venturi at 2–3 L/min or 28% at 4 L/min until gases are back [[ODriscoll2017G]].'},
 {from:.5,at:.56,k:'Check the gas',t:'Oximetry has limits',
  txt:'The BTS guideline recommends clinical assessment if saturation falls by 3% or more or below the target range, and notes that oximetry can be normal despite abnormal pH or PCO2, so blood gases are still needed [[ODriscoll2017G]]. In 1,216 patients with paired readings, occult hypoxaemia (SaO2 below 88% while SpO2 read 92–96%) occurred in 28.5% of Black, 30.2% of Asian and 29.8% of non-Black Hispanic patients vs 17.2% of White patients; SpO2 overestimated SaO2 by 1.1–1.7 points in these groups [[Fawzy2022]].',
  pt:'A finger oximeter does not measure carbon dioxide, and it can read too high on darker skin, so a blood test is sometimes needed [[ODriscoll2017G,Fawzy2022]].',
  hook:'Oximetry can be normal despite abnormal pH or PCO2; review if SpO2 falls by 3% or more [[ODriscoll2017G]].'},
 {from:.66,at:.72,k:'Teach back',t:'Inhaler technique',
  txt:'Across 144 studies, only 31% of people used their inhaler correctly [[Sanchis2016]]. In a randomised trial in hospitalised adults, 62% misused their metered-dose inhaler before teaching; after teach-to-goal (repeated demonstration plus teach-back) misuse was 12.5% vs 46% after brief verbal and written instruction (p = 0.01) [[Press2012]]. Instruction by health caregivers was the only modifiable factor linked to less mishandling [[Melani2011]].',
  pt:'Most people make at least one inhaler mistake without knowing it. Being watched and shown again cut mistakes a lot [[Sanchis2016,Press2012]].',
  hook:'Teach-to-goal: MDI misuse 12.5% vs 46% after brief instruction [[Press2012]].'},
 {from:.83,at:.9,k:'Go home safely',t:'Oxygen fire safety',
  txt:'Tobacco smoking is the greatest fire risk for people on home oxygen; estimates suggest 14–51% of users continue to smoke, and US data from four states recorded 38 deaths from smoking-related home oxygen fires over 2000–2007 [[Cooper2015]]. In a Canadian burn centre, 17 people with COPD burned while smoking on home oxygen stayed a mean 42.8 days and two died [[Murabit2012]]. The BTS home oxygen guideline includes risk assessment of users who smoke [[Hardinge2015]].',
  pt:'Oxygen makes fire burn much faster. Smoking, e-cigarettes and open flames near home oxygen have caused serious burns and deaths [[Cooper2015,Murabit2012]].',
  hook:'Smoking is the main cause of home-oxygen fires [[Cooper2015]].'}
];
const NU_TXT={
  rr:'RR',sp:'SpO2',home:'at home',outlet:'oxygen',nurse:'nurse',ex:'example patient (made up)',
  read:(rr,sp,dev)=>`<span>Breathing rate <b>${rr}</b> per minute</span><span>SpO2 <b>${sp}%</b></span><span>Oxygen <b>${dev}</b></span>`,
  devs:['air','24% Venturi mask'],
  p0:{h:'Count for a full minute',c:'breaths counted',sec:'60 s',l:['Example patient: 32 breaths per minute (made up).','Respiratory rate is often left unrecorded, yet an abnormal rate predicts serious events.','NEWS: AUROC 0.894 for death within 24 hours (35,585 admissions).']},
  p1:{h:'Two targets, two scales',r1:'Most acutely ill patients (BTS): 94–98%',r2:'Hypercapnic risk (BTS) and NEWS2 scale 2: 88–92%',mk:'example: 87% on air',
    l:['Scale 2 for everyone with COPD: 12.6% fewer alerts, no same-day deaths missed.','Inpatient death: AUROC 0.72 with scale 2 vs 0.65 with NEWS; DECAF 0.82.','A multicentre study: NEWS2 0.860 vs NEWS 0.881 in people at risk of type 2 failure.']},
  p2:{h:'Devices listed before blood gases (BTS)',d:['24% Venturi mask: 2–3 L/min','28% Venturi mask: 4 L/min','Nasal cannulae: 1–2 L/min'],mk:v=>'example: '+v+'%',band:'target 88–92%',
    l:['Adjust the target to 94–98% if the PCO2 is normal.','Venturi flow may be raised by up to 50% if the rate is above 30 (example: 32).','An oxygen alert card guides initial oxygen until gases are back.']},
  p3:{h:'What the oximeter cannot show',abg:'Oximetry can be normal despite abnormal pH or PCO2: blood gases are still needed.',ch:'Occult hypoxaemia with SpO2 92–96%',
    bars:[['Black',28.5],['Asian',30.2],['Hispanic (non-Black)',29.8],['White',17.2]],l:['SpO2 read 1.1–1.7 points above SaO2 in these groups.','Review if SpO2 falls by 3% or more, or below the target range.']},
  p4:{h:'Metered-dose inhaler misuse',bars:[['before teaching',62],['after brief instruction',46],['after teach-to-goal',12.5]],cyc:['demonstrate','teach back','repeat until correct']},
  p5:{h:'Home oxygen and fire',l:['Smoking is the greatest fire risk with home oxygen.','14–51% of home-oxygen users are estimated to still smoke.','38 deaths in four US states, 2000–2007.','Burn centre: 17 people, mean stay 42.8 days, 2 deaths.','E-cigarettes: considered unsafe with home oxygen (EIGA).','Thermal fuses: cost-effective in one model (early evidence).']},
  pct:v=>v+'%',
  /* oxygen checker */
  sAxis:'SpO2 (%)',tgt:(lo,hi)=>`target ${lo}–${hi}%`,now:v=>`now ${v}%`,prev:v=>`before ${v}%`,perMin:v=>v+' per minute',
  grp:[{lo:94,hi:98,txt:'For most acutely ill patients the BTS guideline recommends a target of 94–98% [[ODriscoll2017G]].'},
       {lo:88,hi:92,txt:'For people at risk of hypercapnic respiratory failure the BTS guideline recommends 88–92%, or a patient-specific range; NEWS2 scale 2 uses the same 88–92% target [[ODriscoll2017G,Echevarria2019]].'},
       {lo:94,hi:98,txt:'The BTS guideline says the target is adjusted to 94–98% if the PCO2 is normal [[ODriscoll2017G]].'}],
  st:{below:'Below the target range',within:'Within the target range',above:'Above the target range'},
  stBelow:'The guideline recommends clinical assessment when saturation falls below the target range [[ODriscoll2017G]].',
  stAbove:'Above the range: for people at risk of hypercapnic respiratory failure, the guideline\'s target range is 88–92% [[ODriscoll2017G]].',
  fall:d=>`A fall of ${d} points: the guideline recommends clinical assessment if saturation falls by 3% or more [[ODriscoll2017G]].`,
  rrVent:'Breathing rate above 30: the guideline says the Venturi mask flow can be increased by up to 50% [[ODriscoll2017G]].',
  dev:['',
    'Nasal cannulae at 1–2 L/min are one of the options the guideline lists before blood gases in COPD [[ODriscoll2017G]].',
    'A 24% Venturi mask at 2–3 L/min is one of the options the guideline lists before blood gases in COPD [[ODriscoll2017G]].',
    'A 28% Venturi mask at 4 L/min is one of the options the guideline lists before blood gases in COPD [[ODriscoll2017G]].'],
  gas:'Whatever the reading, oximetry can be normal despite abnormal pH or PCO2, and it can overestimate saturation in people with darker skin [[ODriscoll2017G,Fawzy2022]].',
  count:(n,all)=>`${n} of ${all} reviewed`
};
function nuTx(x,y,s,cls='t-sm',st='',an){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${an?` text-anchor="${an}"`:''}${st?` style="${st}"`:''}>${s}</text>`}
/* bedside scene in a w x h box: bed and seated patient, monitor, nurse, oxygen outlet and props by step */
function nuScene(x,y,w,h,o){const X=v=>x+v*w,Y=v=>y+v*h,ph=o.ph||0;let s='';
  s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
  /* oxygen outlet on the wall */
  if(!o.home)s+=`<rect x="${f1(X(.03))}" y="${f1(Y(.16))}" width="${f1(w*.06)}" height="${f1(h*.08)}" rx="3" style="fill:var(--panel);stroke:var(--line)"/><circle cx="${f1(X(.06))}" cy="${f1(Y(.2))}" r="3" style="fill:var(--air)"/>`+nuTx(X(.03),Y(.32),NU_TXT.outlet,'t-xs');
  else s+=`<rect x="${f1(X(.66))}" y="${f1(Y(.62))}" width="${f1(w*.14)}" height="${f1(h*.3)}" rx="6" style="fill:var(--panel);stroke:var(--line)"/><circle cx="${f1(X(.73))}" cy="${f1(Y(.7))}" r="4" style="fill:var(--air)"/>`+nuTx(X(.97),Y(.1),NU_TXT.home,'t-lbl','fill:var(--rec)','end');
  /* bed */
  s+=`<rect x="${f1(X(.05))}" y="${f1(Y(.66))}" width="${f1(w*.57)}" height="${f1(h*.08)}" rx="6" style="fill:var(--panel);stroke:var(--line)"/><path d="M${f1(X(.07))} ${f1(Y(.74))}V${f1(Y(.92))}M${f1(X(.6))} ${f1(Y(.74))}V${f1(Y(.92))}" style="stroke:var(--line);stroke-width:4"/>`;
  s+=`<path d="M${f1(X(.07))} ${f1(Y(.66))}L${f1(X(.12))} ${f1(Y(.4))}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/>`;
  /* patient sitting up: chest rises with each breath */
  const br=(Math.sin(ph)+1)/2,hr=h*.065,hx=X(.2),hy=Y(.34)-br*h*.008;
  s+=`<path d="M${f1(X(.15))} ${f1(Y(.66))}L${f1(X(.16))} ${f1(Y(.44))}Q${f1(X(.2))} ${f1(Y(.42)-br*h*.02)} ${f1(X(.27)+br*w*.01)} ${f1(Y(.47))}L${f1(X(.32))} ${f1(Y(.62))}L${f1(X(.58))} ${f1(Y(.62))}V${f1(Y(.66))}Z" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.2"/>`;
  s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(hr)}" style="fill:var(--skin);stroke:var(--brand);stroke-width:1.2"/>`;
  if(o.count)s+=`<path d="M${f1(X(.29))} ${f1(Y(.5))}q${f1(w*.04)} ${f1(-h*.03)} ${f1(w*.06)} 0" style="fill:none;stroke:var(--dx);stroke-width:2;opacity:${f1(.3+.7*br)}"/>`;
  /* mask or nasal tubing */
  if(o.dev&&!o.home){s+=`<path d="M${f1(X(.06))} ${f1(Y(.2))}C${f1(X(.1))} ${f1(Y(.05))} ${f1(hx+hr*2)} ${f1(Y(.1))} ${f1(hx+hr*.9)} ${f1(hy+hr*.4)}" style="fill:none;stroke:var(--air);stroke-width:1.8"/><ellipse cx="${f1(hx+hr*.75)}" cy="${f1(hy+hr*.35)}" rx="${f1(hr*.45)}" ry="${f1(hr*.55)}" style="fill:var(--air-soft);stroke:var(--air);stroke-width:1.4;opacity:.9"/>`}
  if(o.home){s+=`<path d="M${f1(X(.73))} ${f1(Y(.7))}C${f1(X(.6))} ${f1(Y(.45))} ${f1(hx+hr*3)} ${f1(Y(.5))} ${f1(hx+hr*.9)} ${f1(hy+hr*.2)}" style="fill:none;stroke:var(--air);stroke-width:1.6"/>`;
    s+=cig(hx+hr*1.6,hy+hr*2.6,w*.09,{burn:.3,smoke:.7,ph:ph*.2});
    const fx=X(.42),fy=Y(.44),fl=1+Math.sin(ph*3)*.12;
    s+=`<path d="M${f1(fx)} ${f1(fy+10)}q${f1(-9*fl)} ${f1(-10*fl)} 0 ${f1(-24*fl)}q${f1(9*fl)} ${f1(14*fl)} 0 ${f1(24*fl)}z" style="fill:var(--fl);opacity:.9"/>`;
    s+=`<path d="M${f1(fx+18)} ${f1(fy-30)}l12 22h-24z" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.6"/>`+nuTx(fx+18,fy-12,'!','t-lbl','fill:var(--warn)','middle')}
  if(o.inh)s+=inhaler(hx+hr*2.4,hy+hr*1.4,h*.13,'pmdi',{puff:o.puff||0});
  if(o.abg)s+=`<g transform="rotate(-30 ${f1(X(.4))} ${f1(Y(.3))})"><rect x="${f1(X(.34))}" y="${f1(Y(.28))}" width="${f1(w*.12)}" height="${f1(h*.04)}" rx="2" style="fill:var(--panel);stroke:var(--ink)"/><rect x="${f1(X(.35))}" y="${f1(Y(.285))}" width="${f1(w*.06)}" height="${f1(h*.03)}" style="fill:var(--blood)"/><path d="M${f1(X(.46))} ${f1(Y(.3))}h${f1(w*.05)}" style="stroke:var(--ink);stroke-width:1.2"/></g>`;
  /* monitor */
  if(!o.home){const mx=X(.66),my=Y(.04),mw=w*.31,mh=h*.4;
    s+=`<rect x="${f1(mx)}" y="${f1(my)}" width="${f1(mw)}" height="${f1(mh)}" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=nuTx(mx+8,my+16,NU_TXT.rr,'t-xs')+nuTx(mx+8,my+36,o.rr,'t-big','fill:var(--dx)');
    s+=nuTx(mx+8,my+56,NU_TXT.sp,'t-xs')+nuTx(mx+8,my+76,NU_TXT.pct(o.sp),'t-big',`fill:${o.sp>=o.tgt[0]&&o.sp<=o.tgt[1]?'var(--good)':'var(--warn)'}`);
    const bx=mx+8,bw=mw-16,by=my+mh-14,Xs=v=>bx+(v-80)/20*bw;
    s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="6" rx="3" style="fill:var(--panel)"/><rect x="${f1(Xs(o.tgt[0]))}" y="${f1(by)}" width="${f1(Xs(o.tgt[1])-Xs(o.tgt[0]))}" height="6" rx="3" style="fill:var(--good)"/><circle cx="${f1(Xs(o.sp))}" cy="${f1(by+3)}" r="4" style="fill:var(--ink)"/>`;
    s+=person(X(.84),Y(.97),h*.4,{col:'var(--dx)'})+nuTx(X(.84),Y(.97)-h*.44,NU_TXT.nurse,'t-xs','fill:var(--dx)','middle')}
  s+=nuTx(X(.03),Y(.97),NU_TXT.ex,'t-xs');
  return s}
inits.nursing=()=>{
  /* ---------- 1. the assessment scrubber ---------- */
  const svg=$('#nuSvg'),rg=$('#nuT'),note=$('#nuNote'),rd=$('#nuRead');
  const lines=(x,y,arr,mx,u,sp=0)=>{let s='',yy=y;arr.forEach((l,i)=>{const W=wrapT(x+12,yy,l,mx,{cls:'t-xs',lh:13,style:'fill:var(--ink)'});s+=`<g style="opacity:${f1(ramp(u,.02+i*.07,.1+i*.07))}"><circle cx="${f1(x+4)}" cy="${f1(yy-3)}" r="3" style="fill:var(--dx)"/>${W.svg}</g>`;yy+=W.h+8+sp});return {svg:s,y:yy}};
  const band=(x,y,w,lo,hi,col,lab,mk)=>{const X=v=>x+(v-80)/20*w;let s=nuTx(x,y-8,lab,'t-xs','fill:var(--ink)')+`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(X(lo))}" y="${f1(y)}" width="${f1(X(hi)-X(lo))}" height="12" rx="6" style="fill:${col}"/>`;
    if(mk!=null)s+=`<circle cx="${f1(X(mk))}" cy="${f1(y+6)}" r="6" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;return s};
  const ticks=(x,y,w)=>[80,84,88,92,96,100].map(v=>nuTx(x+(v-80)/20*w,y,v,'t-xs','','middle')).join('');
  const hbar=(x,y,w,lab,v,col,a)=>nuTx(x,y,lab,'t-xs','fill:var(--ink)')+`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w)}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w*v/100*a)}" height="12" rx="6" style="fill:${col}"/>`+nuTx(x+w,y,NU_TXT.pct(v),'t-sm','fill:var(--ink);font-weight:700','end');
  const PAN=[
   (x,y,w,u,N,mx)=>{const P=NU_TXT.p0;let s=nuTx(x,y,P.h,'t-lbl');const cx=x+52,cy=y+62,r=40,a=u*Math.PI*2-Math.PI/2;
     s+=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--panel);stroke:var(--line);stroke-width:2"/><path d="M${cx} ${cy-r}A${r} ${r} 0 ${u>.5?1:0} 1 ${f1(cx+Math.cos(a)*r)} ${f1(cy+Math.sin(a)*r)}" style="fill:none;stroke:var(--dx);stroke-width:5"/><line x1="${cx}" y1="${cy}" x2="${f1(cx+Math.cos(a)*r*.85)}" y2="${f1(cy+Math.sin(a)*r*.85)}" style="stroke:var(--ink);stroke-width:2"/>`+nuTx(cx,cy+r+14,P.sec,'t-xs','','middle');
     s+=nuTx(x+112,y+56,Math.floor(u*32.99),'t-big','font-size:34px;fill:var(--dx)')+nuTx(x+112,y+76,P.c,'t-sm');
     return s+lines(x,y+136,P.l,mx,u).svg},
   (x,y,w,u,N,mx)=>{const P=NU_TXT.p1;let s=nuTx(x,y,P.h,'t-lbl');const bw=w-12;
     s+=band(x,y+36,bw,94,98,'var(--brand)',P.r1,u>.2?87:null)+band(x,y+80,bw,88,92,'var(--good)',P.r2,u>.2?87:null)+ticks(x,y+110,bw);
     s+=nuTx(x+(87-80)/20*bw,y+126,P.mk,'t-xs','fill:var(--ink);font-weight:600','middle');
     return s+lines(x,y+156,P.l,mx,u).svg},
   (x,y,w,u,N,mx)=>{const P=NU_TXT.p2;let s=nuTx(x,y,P.h,'t-lbl');
     P.d.forEach((d,i)=>{const on=i===0;s+=`<rect x="${x}" y="${y+12+i*26}" width="${f1(w-12)}" height="20" rx="10" style="fill:${on?'var(--air-soft)':'var(--panel)'};stroke:${on?'var(--air)':'var(--line)'}"/>`+nuTx(x+12,y+26+i*26,d,'t-sm',on?'fill:var(--air-ink);font-weight:600':'fill:var(--ink)')});
     const sp=Math.round(lerp(87,90,ease(ramp(u,.1,.6))));s+=band(x,y+112,w-12,88,92,'var(--good)',P.band,sp)+ticks(x,y+142,w-12)+nuTx(x+w-12,y+100,P.mk(sp),'t-xs','fill:var(--ink);font-weight:600','end');
     return s+lines(x,y+170,P.l,mx,u).svg},
   (x,y,w,u,N,mx)=>{const P=NU_TXT.p3;let s=nuTx(x,y,P.h,'t-lbl');const A=wrapT(x,y+22,P.abg,Math.round(mx*.85),{cls:'t-sm',lh:14,style:'fill:var(--ink)'});s+=A.svg;
     let yy=y+22+A.h+14;s+=nuTx(x,yy,P.ch,'t-xs','fill:var(--ink);font-weight:700');yy+=18;const a=ease(ramp(u,.1,.6));
     P.bars.forEach((b,i)=>{s+=hbar(x,yy+i*32,w-12,b[0],b[1],i===3?'var(--muted)':'var(--warn)',a)});
     return s+lines(x,yy+4*32+8,P.l,mx,u).svg},
   (x,y,w,u,N,mx)=>{const P=NU_TXT.p4;let s=nuTx(x,y,P.h,'t-lbl');const a=ease(ramp(u,.05,.5));
     P.bars.forEach((b,i)=>{s+=hbar(x,y+26+i*34,w-12,b[0],b[1],i===2?'var(--rec)':'var(--warn)',ramp(u,.05+i*.15,.25+i*.15)*a+.0001)});
     const cy=y+150,n=P.cyc.length,cw=(w-12)/n,k=Math.floor(u*9)%n;
     P.cyc.forEach((c,i)=>{const cx=x+cw*i+cw/2,on=i===k&&u>.45;s+=`<circle cx="${f1(cx)}" cy="${cy}" r="16" style="fill:${on?'var(--rec)':'var(--panel)'};stroke:var(--rec);stroke-width:1.6"/>`+nuTx(cx,cy+5,i+1,'t-lbl',on?'fill:var(--panel)':'fill:var(--rec)','middle')+wrapT(cx,cy+32,c,N?16:14,{cls:'t-xs',lh:12,anchor:'middle',style:'fill:var(--ink)'}).svg;
       if(i<n-1)s+=`<path d="M${f1(cx+20)} ${cy}H${f1(cx+cw-22)}" style="stroke:var(--rec);stroke-width:1.6" marker-end="url(#nuAr)"/>`});
     s+=`<path d="M${f1(x+w-12-cw/2)} ${cy+50}Q${f1(x+(w-12)/2)} ${cy+84} ${f1(x+cw/2)} ${cy+52}" style="fill:none;stroke:var(--rec);stroke-width:1.4;stroke-dasharray:4 3" marker-end="url(#nuAr)"/>`;
     return s},
   (x,y,w,u,N,mx)=>{const P=NU_TXT.p5;return nuTx(x,y,P.h,'t-lbl')+lines(x,y+28,P.l,mx,u,4).svg}];
  const SC=[{count:1},{},{dev:1},{dev:1,abg:1},{dev:1,inh:1},{home:1}];
  function draw(t){
    const N=vb(svg,'720 420','400 700'),p=phaseOf(NU_STEPS,t),S=NU_STEPS[p],nx=NU_STEPS[p+1]?NU_STEPS[p+1].from:1.0001,u=clamp((t-S.from)/(nx-S.from));
    const L=N?{tx:16,sx:16,sy:54,sw:368,sh:250,px:20,py:338,pw:364,mx:60,stx:16,stw:368,sty:684}:{tx:20,sx:20,sy:56,sw:320,sh:300,px:362,py:74,pw:340,mx:56,stx:20,stw:680,sty:398};
    const sp=p<2?87:p===2?Math.round(lerp(87,90,ease(ramp(u,.1,.6)))):90,tgt=p>=1?[88,92]:[94,98];
    let s=`<defs>${marker('nuAr','var(--rec)',6)}</defs>`+nuTx(L.tx,26,S.t,'t-big','fill:var(--rec)')+nuTx(L.tx,42,S.k,'t-sm');
    s+=nuScene(L.sx,L.sy,L.sw,L.sh,{...SC[p],rr:32,sp,tgt,ph:t*120,puff:p===4?bump(u,.3,.5):0});
    s+=PAN[p](L.px,L.py,L.pw,u,N,L.mx);
    const sw=L.stw/6;NU_STEPS.forEach((q,j)=>{s+=`<rect x="${f1(L.stx+j*sw+1)}" y="${L.sty}" width="${f1(sw-2)}" height="5" rx="2.5" style="fill:${j===p?'var(--rec)':'var(--panel-2)'}"/>`});
    s+=`<circle cx="${f1(L.stx+L.stw*t)}" cy="${L.sty+2.5}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;rd.innerHTML=NU_TXT.read(32,sp,NU_TXT.devs[SC[p].dev&&p<5?1:0]);setSt(p);note.innerHTML=noteHTML(S);
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#nuPlay'),draw,36000,'%t:player.replay%','nursing');
  setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. oxygen target checker ---------- */
  const g=$('#nuGrp'),dv=$('#nuDev'),spi=$('#nuSp'),pri=$('#nuPr'),rri=$('#nuRR'),osvg=$('#nuO2Svg'),out=$('#nuO2Out');
  function ocalc(){
    const G=NU_TXT.grp[+g.value],now=+spi.value,pre=+pri.value,rr=+rri.value,d=+dv.value,N=vb(osvg,'720 170','400 180');
    const st=now<G.lo?'below':now>G.hi?'above':'within';
    const x0=N?24:40,w=N?352:640,X=v=>x0+(v-80)/20*w;
    let s=`<defs>${marker('nuOa','var(--ink)',6)}</defs>`+nuTx(x0,20,NU_TXT.sAxis,'t-xs');
    s+=`<rect x="${x0}" y="92" width="${w}" height="16" rx="8" style="fill:var(--panel-2)"/><rect x="${f1(X(G.lo))}" y="92" width="${f1(X(G.hi)-X(G.lo))}" height="16" rx="8" style="fill:var(--good-soft);stroke:var(--good)"/>`;
    s+=nuTx((X(G.lo)+X(G.hi))/2,46,NU_TXT.tgt(G.lo,G.hi),'t-sm','fill:var(--good);font-weight:700','middle');
    for(let v=80;v<=100;v+=N?4:2)s+=nuTx(X(v),126,v,'t-xs','','middle');
    if(pre!==now)s+=`<path d="M${f1(X(pre))} 100H${f1(X(now)+(now>pre?-9:9))}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#nuOa)"/>`;
    s+=`<circle cx="${f1(X(pre))}" cy="100" r="6" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`+nuTx(X(pre),150,NU_TXT.prev(pre),'t-xs','fill:var(--ink)',pre>97?'end':pre<83?'start':'middle');
    s+=`<circle cx="${f1(X(now))}" cy="100" r="8" style="fill:${st==='within'?'var(--good)':'var(--warn)'};stroke:var(--panel);stroke-width:2"/>`+nuTx(X(now),78,NU_TXT.now(now),'t-sm','fill:var(--ink);font-weight:700',now>97?'end':now<83?'start':'middle');
    osvg.innerHTML=s;
    $('#nuSpO').textContent=NU_TXT.pct(now);$('#nuPrO').textContent=NU_TXT.pct(pre);$('#nuRRO').textContent=NU_TXT.perMin(rr);
    let h=`<div class="verdict ${st==='within'?'yes':'maybe'}">${NU_TXT.st[st]}</div><p>${G.txt}</p>`;
    if(st==='below')h+=`<p>${NU_TXT.stBelow}</p>`;
    if(st==='above'&&+g.value===1)h+=`<p>${NU_TXT.stAbove}</p>`;
    if(pre-now>=3)h+=`<div class="verdict maybe">${NU_TXT.fall(pre-now)}</div>`;
    if(+g.value>0&&d)h+=`<p>${NU_TXT.dev[d]}</p>`;
    if(rr>30&&d>=2)h+=`<p>${NU_TXT.rrVent}</p>`;
    h+=`<p>${NU_TXT.gas}</p>`;out.innerHTML=h}
  [spi,pri,rri].forEach(el=>el.addEventListener('input',ocalc));[g,dv].forEach(el=>el.addEventListener('change',ocalc));
  ocalc();
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();ocalc()};

  /* ---------- 3. inhaler checklist ---------- */
  const box=$('#nuCheck'),bar=$('#nuBar'),cnt=$('#nuCount');
  function upd(){const all=$$('[data-nuck]',box),on=all.filter(b=>b.getAttribute('aria-pressed')==='true').length;cnt.textContent=NU_TXT.count(on,all.length);bar.style.width=(100*on/all.length)+'%'}
  box.addEventListener('click',e=>{const b=e.target.closest('[data-nuck]');if(!b)return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='true'?'false':'true');upd()});
  $('#nuReset').addEventListener('click',()=>{$$('[data-nuck]',box).forEach(b=>b.setAttribute('aria-pressed','false'));upd()});
  upd();
};
