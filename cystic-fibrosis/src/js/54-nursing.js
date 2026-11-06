/* =============== 5.4 Nursing care =============== */
/* The main scrubber follows one admission for a pulmonary exacerbation across a 14-day line: a single room
   (nuRoom, local glyph) whose parts light up step by step, and a panel of cited facts for each day.
   Schematic: the room, the drug-level curve and the lung-function line show shapes, not measurements. */
function nuRoom(x,y,w,h,o={}){const hl=o.hl||[],on=k=>hl.includes(k),ph=o.ph||0,sc=Math.min(w/320,h/250);
  const lit=k=>on(k)?'var(--rec)':'var(--line)',sw=k=>on(k)?2.4:1.2;
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
  const X=v=>x+v*w,Y=v=>y+v*h;
  /* door with a precautions sign */
  s+=`<rect x="${f1(X(.04))}" y="${f1(Y(.12))}" width="${f1(w*.14)}" height="${f1(h*.72)}" rx="3" style="fill:var(--panel);stroke:${lit('door')};stroke-width:${sw('door')}"/>`;
  s+=`<rect x="${f1(X(.055))}" y="${f1(Y(.22))}" width="${f1(w*.11)}" height="${f1(h*.12)}" rx="2" style="fill:${on('door')?'var(--warn-soft)':'var(--panel-2)'};stroke:${on('door')?'var(--warn)':'var(--line)'}"/>`;
  s+=`<text x="${f1(X(.11))}" y="${f1(Y(.295))}" class="t-xs t-mid" style="font-size:${f1(7*sc+1.5)}px;fill:${on('door')?'var(--warn)':'var(--muted)'};font-weight:700">STOP</text>`;
  if(o.open)s+=`<path d="M${f1(X(.18))} ${f1(Y(.12))}L${f1(X(.27))} ${f1(Y(.18))}V${f1(Y(.9))}L${f1(X(.18))} ${f1(Y(.84))}Z" style="fill:var(--rec-soft);stroke:var(--rec);opacity:${f1(o.open)}"/>`;
  /* sink and hand gel */
  s+=`<path d="M${f1(X(.22))} ${f1(Y(.42))}h${f1(w*.1)}q0 ${f1(h*.08)} ${f1(-w*.05)} ${f1(h*.08)}q${f1(-w*.05)} 0 ${f1(-w*.05)} ${f1(-h*.08)}Z" style="fill:var(--water-soft);stroke:${lit('sink')};stroke-width:${sw('sink')}"/><path d="M${f1(X(.27))} ${f1(Y(.42))}v${f1(-h*.06)}h${f1(w*.025)}" style="fill:none;stroke:${lit('sink')};stroke-width:1.6"/>`;
  if(on('sink'))for(let i=0;i<3;i++){const k=(ph*2+i/3)%1;s+=ion(X(.29),Y(.37)+k*h*.06,'h2o',{r:2.4*sc+1,op:1-k})}
  /* bed and patient */
  const bx=X(.36),by=Y(.56),bw=w*.44,bh=h*.16;
  s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="${f1(bh)}" rx="6" style="fill:var(--panel);stroke:${lit('bed')};stroke-width:${sw('bed')}"/><rect x="${f1(bx)}" y="${f1(by+bh)}" width="${f1(w*.02)}" height="${f1(h*.14)}" style="fill:var(--line)"/><rect x="${f1(bx+bw-w*.02)}" y="${f1(by+bh)}" width="${f1(w*.02)}" height="${f1(h*.14)}" style="fill:var(--line)"/>`;
  const sit=o.sit||0,hx=bx+bw*.16,hy=by-h*.06-sit*h*.1;
  s+=`<path d="M${f1(bx+bw*.1)} ${f1(by+2)}Q${f1(hx)} ${f1(hy+h*.05)} ${f1(bx+bw*.34)} ${f1(by-h*.03-sit*h*.08)}L${f1(bx+bw*.95)} ${f1(by-h*.02)}V${f1(by+4)}Z" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.2"/>`;
  s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(h*.055)}" style="fill:var(--skin);stroke:var(--brand);stroke-width:1.2"/>`;
  if(o.mask)s+=`<rect x="${f1(hx+h*.02)}" y="${f1(hy-h*.005)}" width="${f1(h*.05)}" height="${f1(h*.04)}" rx="3" style="fill:var(--accent);opacity:.85"/>`;
  /* breathing / airway clearance arrows */
  if(on('air')){const a=Math.sin(ph*20)*.5+.5;s+=`<path d="M${f1(hx+h*.08)} ${f1(hy)}q${f1(w*.05)} ${f1(-h*.06)} ${f1(w*.1)} 0" style="fill:none;stroke:var(--rec);stroke-width:2;opacity:${f1(.3+.7*a)}" marker-end="url(#nuAr)"/>`}
  /* the port under the collarbone, and the IV pole */
  const px=bx+bw*.32,py=by-h*.035-sit*h*.08;
  s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(3.2*sc+1)}" style="fill:${on('iv')?'var(--rx)':'var(--panel-2)'};stroke:var(--rx);stroke-width:1.2"/>`;
  const ix=X(.88),iy=Y(.1);
  s+=`<path d="M${f1(ix)} ${f1(iy)}V${f1(Y(.92))}M${f1(ix-w*.04)} ${f1(Y(.92))}h${f1(w*.08)}" style="stroke:${lit('iv')};stroke-width:${sw('iv')+.6}"/>`;
  s+=`<rect x="${f1(ix-w*.035)}" y="${f1(iy+h*.02)}" width="${f1(w*.07)}" height="${f1(h*.13)}" rx="4" style="fill:var(--rx-soft);stroke:var(--rx)"/>`;
  if(o.drip){s+=`<path d="M${f1(ix)} ${f1(iy+h*.15)}C${f1(ix)} ${f1(Y(.4))} ${f1(px+w*.1)} ${f1(py-h*.12)} ${f1(px)} ${f1(py)}" style="fill:none;stroke:var(--rx);stroke-width:1.4;stroke-dasharray:3 3;stroke-dashoffset:${f1(-ph*80)}"/>`}
  /* bedside table: tray with enzymes and a glucose meter */
  const tx=X(.56),ty=Y(.44);
  s+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="${f1(w*.2)}" height="${f1(h*.05)}" rx="3" style="fill:var(--panel);stroke:${lit('tray')};stroke-width:${sw('tray')}"/>`;
  s+=`<circle cx="${f1(tx+w*.06)}" cy="${f1(ty-h*.03)}" r="${f1(h*.035)}" style="fill:var(--gut);stroke:var(--line)"/>`+capsule(tx+w*.14,ty-h*.025,w*.05,{ang:-20,open:on('tray')?.3:0});
  s+=`<rect x="${f1(tx+w*.22)}" y="${f1(ty-h*.06)}" width="${f1(w*.05)}" height="${f1(h*.11)}" rx="4" style="fill:var(--panel);stroke:${lit('gluc')};stroke-width:${sw('gluc')}"/><rect x="${f1(tx+w*.23)}" y="${f1(ty-h*.045)}" width="${f1(w*.03)}" height="${f1(h*.035)}" style="fill:${on('gluc')?'var(--warn-soft)':'var(--panel-2)'}"/>`;
  /* chart / clipboard */
  s+=`<rect x="${f1(X(.62))}" y="${f1(Y(.16))}" width="${f1(w*.1)}" height="${f1(h*.16)}" rx="3" style="fill:var(--panel);stroke:${lit('chart')};stroke-width:${sw('chart')}"/>`;
  for(let i=0;i<3;i++)s+=`<line x1="${f1(X(.635))}" x2="${f1(X(.705))}" y1="${f1(Y(.21+i*.035))}" y2="${f1(Y(.21+i*.035))}" style="stroke:var(--line);stroke-width:1.4"/>`;
  /* a nurse in gown and gloves */
  if(o.nurse){const nx=X(.3)+(o.nurseX||0)*w,ny=Y(.52);s+=person(nx,ny,h*.34,o.gown?'var(--accent)':'var(--muted)')+(o.gown?`<text x="${f1(nx)}" y="${f1(ny+h*.46)}" class="t-xs t-mid" style="fill:var(--accent)">gown + gloves</text>`:'')}
  /* labels */
  (o.labels||[]).forEach(l=>{s+=`<text x="${f1(X(l[0]))}" y="${f1(Y(l[1]))}" class="t-xs${l[3]?' '+l[3]:''}" style="fill:var(--ink);font-weight:600">${l[2]}</text>`});
  return s}
const NU_STEPS=[
 {from:0,at:.07,k:'Day 0 · admission',t:'Admission and assessment',d0:0,d1:1,
  txt:'ECFS standards call for admission within 24 hours for urgent cases and within 7 days for non-urgent ones [[Conway2014ECFS]]. The CF nurse specialist\'s role includes education, advocacy and psychosocial support at key moments, among them the first admission and first IV course [[Conway2014ECFS]]. During an exacerbation treated with IV antibiotics or systemic steroids, the ADA/CFF guideline advises screening with fasting and 2-hour post-meal glucose for the first 48 hours [[Moran2010CFRD]].',
  pt:'An admission is a planned stretch of extra treatment. The team checks breathing, blood sugar and how you are coping [[Conway2014ECFS,Moran2010CFRD]].',
  hook:'Exacerbation on IV antibiotics or steroids: fasting and 2-h post-meal glucose for the first 48 h [[Moran2010CFRD]].'},
 {from:.15,at:.22,k:'Day 0 onwards · infection control',t:'Isolation and infection prevention',d0:0,d1:14,
  txt:'Haggie summarises the CFF guideline: hand hygiene is the single most important practice, before and after all patient contact, regardless of glove use, with no artificial fingernails. People with CF wear a surgical mask in healthcare settings, and healthcare workers wear gown and gloves for aerosol-generating procedures such as chest physiotherapy, sputum sampling and spirometry [[Haggie2020,Saiman2014IPC]]. Contact precautions for MRSA, B. cepacia complex, multidrug-resistant P. aeruginosa and S. maltophilia add gown and gloves on room entry and environmental cleaning [[Haggie2020,Saiman2014IPC]]. People with CF should not share rooms, bathrooms or toilets in hospital [[Conway2014ECFS]].',
  pt:'Germs can pass between people with CF, so each person has their own room and bathroom, and staff clean their hands every time [[Conway2014ECFS,Haggie2020]].',
  hook:'Hand hygiene first; masks for people with CF in healthcare settings; gown and gloves on room entry under contact precautions [[Haggie2020,Saiman2014IPC]].'},
 {from:.3,at:.38,k:'Days 1–14 · IV antibiotics',t:'IV antibiotics and aminoglycoside watch',d0:1,d1:14,
  txt:'A Cochrane review found once-daily and thrice-daily IV aminoglycosides equally effective for exacerbations; in children, once-daily dosing probably reduced nephrotoxicity [[Bhatt2019Cochrane]]. In a randomised PK study, tobramycin levels were drawn at 1 h and at 3.5–5 h after the infusion [[Prayle2016]]. After once-daily IV tobramycin for 10 days or more, audiometric cochleotoxic change was found in 89% of 18 adults at 2 weeks [[Harruff2021Ototox]]; another cohort argues for routine ototoxicity monitoring [[Garinis2021Ototox]]. Kidney-injury risk factors include an aminoglycoside in the prior 90 days, longer courses, low albumin and co-trimoxazole [[Downes2015AKI]].',
  pt:'Strong IV antibiotics like tobramycin can affect hearing and the kidneys. Care teams check hearing and blood tests to catch problems early [[Garinis2021Ototox,Downes2015AKI]].',
  hook:'Once-daily IV aminoglycosides work as well as thrice-daily, with less nephrotoxicity in children [[Bhatt2019Cochrane]].'},
 {from:.45,at:.53,k:'Daily · airway clearance',t:'Airway clearance and getting lung function back',d0:1,d1:14,
  txt:'The ECFS framework says the specialist CF physiotherapist leads airway clearance, physical exercise and inhalation therapy [[Conway2014ECFS]]. In STOP2, adults who responded early gained a mean 12.8 ppFEV1 points with 10 days of IV antimicrobials and 13.4 with 14 days, so 10 days was non-inferior [[Goss2021STOP2]]. In 8479 US registry exacerbations treated with IV antibiotics, 25% did not recover to 90% of baseline FEV1 within 3 months [[Sanders2010]].',
  pt:'After a flare-up, most people get their lung function back, but about 1 in 4 do not get all of it back [[Sanders2010]].',
  hook:'About 1 in 4 IV-treated exacerbations does not recover to baseline FEV1 [[Sanders2010]].'},
 {from:.6,at:.68,k:'Every meal · nutrition',t:'Meals, snacks, enzymes and glucose',d0:1,d1:14,
  txt:'People with CF need a very high-calorie diet, usually 120–150% of the recommended intake for age [[Moran2010CFRD]]. The Creon label says snacks take about half the meal dose and daily dosing should reflect about three meals plus two or three snacks; capsules are swallowed whole, not crushed or chewed [[FDA-Creon]]. People with CFRD keep the high-calorie, high-salt, high-fat CF diet, and are treated with insulin [[Moran2010CFRD]]. The nurse specialist works with the dietitian on enzyme adjustment [[Conway2014ECFS]].',
  pt:'Enzyme capsules go with every meal and snack that contains fat, swallowed whole. Hospital food times and snack trolleys need planning around them [[FDA-Creon]].',
  hook:'Creon label: snacks take about half the meal dose; about 3 meals plus 2–3 snacks a day [[FDA-Creon]].'},
 {from:.75,at:.85,k:'Discharge · home',t:'Mental health and going home',d0:10,d1:14,
  txt:'Annual PHQ-9 and GAD-7 screening from age 12 is part of the CFF/ECFS consensus [[Quittner2016ICMH]]. The CF nurse specialist supports home IV antibiotics, nebulisers, enteral feeding and non-invasive ventilation, and links the family with primary care [[Conway2014ECFS]]. ECFS calls for home IV antibiotics supervised by trained outreach nurses [[Conway2014ECFS]]. In the only small trial (17 people), home IV treatment needed fewer investigations, disrupted family life less and was cheaper, but fatigue and mastery were worse at home [[Balaguer2008Cochrane]].',
  pt:'Some people finish their IV antibiotics at home, with a nurse visiting. It suits some families and not others [[Balaguer2008Cochrane,Conway2014ECFS]].',
  hook:'Home vs hospital IV: one RCT of 17 people; fewer investigations and lower cost at home, more fatigue [[Balaguer2008Cochrane]].'}];
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT'),note=$('#nuNote'),rd=$('#nuRead');let setSt=()=>{};
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const H=(x,y,s)=>T(x,y,s,'t-sm','fill:var(--ink);font-weight:600');
  function bar(x,y,w,v,max,col,lab,val,o={}){const h=o.h||12,bw=w*clamp(v/max);let s=lab?T(x,y-4,lab,'t-xs','fill:var(--ink)'):'';
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(bw)}" height="${h}" rx="4" style="fill:${col};opacity:.85"/>`;
    if(val)s+=T(x+bw+6,y+h-2,val,'t-sm','fill:var(--ink);font-weight:700');return s}
  const list=(x,y,items,u,o={})=>items.map((q,j)=>{const op=ramp(u,(o.a||.03)+j*(o.d||.1),(o.a||.03)+j*(o.d||.1)+.08),lines=Array.isArray(q)?q:[q];
    return `<g style="opacity:${f1(op)}"><circle cx="${f1(x+5)}" cy="${f1(y+j*(o.sp||34)-4)}" r="4.5" style="fill:${o.col||'var(--rec)'}"/>`+lines.map((l,k)=>T(x+16,y+j*(o.sp||34)+k*13,l,k?'t-xs':'t-sm',k?'':'fill:var(--ink)')).join('')+'</g>'}).join('');
  const PAN=[
   (x,y,w,u,N)=>H(x,y,'On arrival')+list(x,y+26,[['Admit within 24 h if urgent','or within 7 days if not (ECFS)'],['Glucose: fasting and 2-h post-meal','for the first 48 h of IV antibiotics or steroids'],['Nurse specialist support','at the first admission and first IV course'],['Psychosocial check','how the person and family are coping']],u,{sp:N?40:44}),
   (x,y,w,u,N)=>{let s=H(x,y,'Standard and contact precautions')+list(x,y+26,[['Hand hygiene: before and after contact','gloves or not; no artificial nails'],['Mask for the person with CF','in healthcare settings'],['Gown and gloves on room entry','under contact precautions'],['Own room, bathroom and toilet','no contact in waiting areas (ECFS)']],u,{sp:36});
     const by=y+(N?170:168),g=ease(ramp(u,.5,.8));s+=`<g style="opacity:${f1(ramp(u,.45,.55))}">`+T(x,by,'US programmes with written policies (2019)','t-xs','fill:var(--ink);font-weight:600');
     [['contact precautions',90],['patient masks, inpatient',85],['inpatient 6-foot rule',53]].forEach((q,j)=>{s+=bar(x,by+20+j*26,N?200:180,q[1]*g,100,j===2?'var(--warn)':'var(--accent)',q[0],Math.round(q[1]*g)+'%')});return s+'</g>'},
   (x,y,w,u,N)=>{let s=H(x,y,'Once-daily aminoglycoside: level shape (schematic)');const cx=x,cy=y+14,cw=N?240:220,ch=N?90:96;
     const f=v=>v<.04?v/.04:Math.exp(-(v-.04)*5.2);const C=curve(cx,cy,cw,ch,f,{x0:0,x1:1,y0:0,y1:1.05,upto:ease(ramp(u,.02,.35)),col:'var(--rx)',fill:true,lw:2.2});s+=C.svg;
     const tt=v=>v/24;[[1,'1 h'],[4.2,'3.5–5 h']].forEach((q,j)=>{if(u>.2+j*.08){const p=C.at(tt(q[0]));s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="4.5" style="fill:var(--warn);stroke:var(--panel);stroke-width:1.6"/>`+T(p[0]+7,p[1]-5,q[1],'t-xs','fill:var(--ink);font-weight:600')}});
     s+=T(cx,cy+ch+13,'hours after the infusion →','t-xs')+T(cx+cw,cy+ch+13,'24 h','t-xs t-end');
     s+=T(cx+(N?250:230),cy+20,'study sample','t-xs','fill:var(--warn)')+T(cx+(N?250:230),cy+33,'times (Prayle)','t-xs','fill:var(--warn)');
     const ty=cy+ch+38,g=ease(ramp(u,.45,.75));
     s+=`<g style="opacity:${f1(ramp(u,.4,.5))}">`+T(x,ty,'Watch: hearing and kidneys','t-sm','fill:var(--ink);font-weight:600')+bar(x,ty+22,N?200:180,89*g,100,'var(--bad)','audiometric change, 2 weeks after (n=18)',Math.round(89*g)+'%')+T(x,ty+52,'reported ototoxicity rates: 0–56%, by method','t-xs')+'</g>';
     s+=`<g style="opacity:${f1(ramp(u,.65,.75))}">`+T(x,ty+74,'Port (TIVAD): median survival 1441 days;','t-xs','fill:var(--ink)')+T(x,ty+88,'0.58 complications per 1000 catheter-days','t-xs','fill:var(--ink)')+'</g>';
     return s},
   (x,y,w,u,N)=>{let s=H(x,y,'ppFEV1 across the admission (schematic shape)');const cw=N?300:300,ch=N?110:120,cy=y+16;
     const f=d=>d<10?ease(d/10)*12.8:12.8;const C=curve(x+24,cy,cw,ch,f,{x0:0,x1:14,y0:-2,y1:16,upto:lerp(0,14,ease(ramp(u,.02,.7))),col:'var(--rec)',lw:2.4,dot:true});s+=C.svg;
     [0,7,14].forEach(d=>{s+=T(C.X(d),cy+ch+13,'day '+d,'t-xs t-mid')});[0,5,10,15].forEach(v=>{if(v<=16)s+=T(x+20,C.Y(v)+3,'+'+v,'t-xs t-end')});
     s+=`<line x1="${f1(C.X(10))}" x2="${f1(C.X(10))}" y1="${cy}" y2="${cy+ch}" class="grid"/>`+T(C.X(10)+4,cy+12,'day 10','t-xs','fill:var(--ink)');
     const ty=cy+ch+36;s+=`<g style="opacity:${f1(ramp(u,.35,.5))}">`+T(x,ty,'STOP2 early responders, mean gain:','t-xs','fill:var(--ink);font-weight:600')+T(x,ty+15,'10 days 12.8 · 14 days 13.4 points','t-xs','fill:var(--ink)')+'</g>';
     s+=`<g style="opacity:${f1(ramp(u,.6,.75))}">`+T(x,ty+36,'1 in 4 IV-treated exacerbations does not','t-xs','fill:var(--bad)')+T(x,ty+50,'return to 90% of baseline within 3 months','t-xs','fill:var(--bad)')+'</g>';
     return s},
   (x,y,w,u,N)=>{let s=H(x,y,'A hospital day of food and enzymes (schematic)');const lw=N?340:300,ly=y+58,X=h=>x+lw*(h-7)/15;
     s+=tline(x,ly,lw,{min:7,max:22,step:N?3:3,fmt:v=>v+':00'}).svg;
     const E=[[8,'breakfast',1],[10.5,'snack',.5],[12.5,'lunch',1],[15.5,'snack',.5],[18,'dinner',1],[20.5,'snack',.5]];
     E.forEach((e,j)=>{const op=ramp(u,.03+j*.07,.1+j*.07),xx=X(e[0]);s+=`<g style="opacity:${f1(op)}">`+capsule(xx,ly-18,e[2]===1?22:13,{ang:-30})+T(xx,ly-30,e[1],'t-xs t-mid','fill:var(--ink)')+'</g>'});
     s+=T(x,ly+34,'capsule size: a full meal dose vs about half for a snack','t-xs');
     const gy=ly+62;s+=`<g style="opacity:${f1(ramp(u,.45,.6))}">`+T(x,gy,'Glucose checks in the first 48 h','t-sm','fill:var(--ink);font-weight:600');
     [8,10,12.5,14.5,18,20].forEach((h,j)=>{const xx=X(h),fast=j===0;s+=`<rect x="${f1(xx-5)}" y="${gy+12}" width="10" height="14" rx="2" style="fill:${fast?'var(--warn)':'var(--warn-soft)'};stroke:var(--warn)"/>`});
     s+=T(x,gy+42,'fasting (dark) and 2-h post-meal (light): placed for illustration','t-xs')+'</g>';
     s+=`<g style="opacity:${f1(ramp(u,.65,.8))}">`+T(x,gy+66,'Diet target: about 120–150% of usual calories','t-xs','fill:var(--ink)')+T(x,gy+80,'Swallow whole; do not crush or chew (label)','t-xs','fill:var(--ink)')+'</g>';
     return s},
   (x,y,w,u,N)=>{let s=H(x,y,'Before going home');s+=list(x,y+26,[['Mood check','PHQ-9 and GAD-7 yearly from 12'],['Home IV plan, if chosen','supervised by outreach nurses'],['Enzymes, nebulisers, airway clearance','reviewed with the team'],['Primary care and community links','arranged by the nurse specialist']],u,{sp:N?38:40,d:.09});
     const ty=y+(N?190:196);s+=`<g style="opacity:${f1(ramp(u,.5,.62))}">`+T(x,ty,'Home vs hospital IV (1 RCT, 17 people)','t-xs','fill:var(--ink);font-weight:600');
     [['fewer investigations','home','var(--rec)'],['less disruption to family','home','var(--rec)'],['lower cost','home','var(--rec)'],['fatigue and mastery','worse at home','var(--warn)']].forEach((q,j)=>{s+=`<rect x="${x}" y="${ty+10+j*18}" width="10" height="10" rx="2" style="fill:${q[2]}"/>`+T(x+16,ty+19+j*18,q[0]+': '+q[1],'t-xs','fill:var(--ink)')});return s+'</g>'}];
  /* room highlights and props by step */
  const RMS=[{hl:['bed','chart','gluc'],labels:[[.62,.12,'chart']]},{hl:['door','sink'],nurse:1,gown:1,mask:1},{hl:['iv'],drip:1},{hl:['air','bed'],sit:1,drip:1},{hl:['tray','gluc'],sit:1,drip:1},{hl:['door','chart'],sit:1}];
  function draw(t){const N=vb(svg,'720 380','400 600'),p=phaseOf(NU_STEPS,t),S=NU_STEPS[p],nx=NU_STEPS[p+1]?NU_STEPS[p+1].from:1.0001,u=clamp((t-S.from)/(nx-S.from));
    let s=`<defs>${marker('nuAr','var(--rec)',6)}</defs>`+T(N?16:20,26,S.t,'t-big','fill:var(--rec)')+T(N?16:20,42,S.k,'t-sm');
    /* the 14-day line */
    const lx=N?20:20,lw=N?360:300,ly=N?70:72,day=lerp(S.d0,S.d1,ease(u));
    s+=tline(lx,ly,lw,{min:0,max:14,step:N?2:2,fmt:v=>v}).svg+T(lx+lw,ly-6,'day of admission','t-xs t-end');
    s+=`<rect x="${f1(lx+lw*S.d0/14)}" y="${ly-3}" width="${f1(lw*(S.d1-S.d0)/14)}" height="6" rx="3" style="fill:var(--rec);opacity:.35"/><circle cx="${f1(lx+lw*day/14)}" cy="${ly}" r="6" style="fill:var(--rec);stroke:var(--panel);stroke-width:2"/>`;
    const R=RMS[p],rx=N?20:20,ry=N?100:102,rw=N?360:300,rh=N?170:230;
    s+=nuRoom(rx,ry,rw,rh,{...R,ph:t*8,nurseX:R.nurse?.05*Math.sin(u*3):0,open:p===5?ramp(u,.6,.9):0});
    s+=PAN[p](N?24:350,N?296:84,N?352:350,u,N);
    const sx=N?16:20,sw=(N?368:680)/6,sy=N?586:360;
    NU_STEPS.forEach((q,j)=>{s+=`<rect x="${f1(sx+j*sw+1)}" y="${sy}" width="${f1(sw-2)}" height="5" rx="2.5" style="fill:${j===p?'var(--rec)':'var(--panel-2)'}"/>`});
    s+=`<circle cx="${f1(sx+(N?368:680)*t)}" cy="${sy+2.5}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    rd.innerHTML=`<span>Day <b>${Math.round(day)}</b></span><span>Focus <b>${['assessment','infection control','IV antibiotics','airway clearance','nutrition','discharge'][p]}</b></span>`;
    note.innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#nuPlay'),draw,40000,'Replay','nursing');
  setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the checklist ---------- */
  const box=$('#nuCheck'),bar2=$('#nuBar'),cnt=$('#nuCount');
  function upd(){const all=$$('[data-nuck]',box),on=all.filter(b=>b.getAttribute('aria-pressed')==='true').length;
    cnt.textContent=`${on} of ${all.length} reviewed`;bar2.style.width=(100*on/all.length)+'%'}
  box.addEventListener('click',e=>{const b=e.target.closest('[data-nuck]');if(!b)return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='true'?'false':'true');upd()});
  $('#nuReset').addEventListener('click',()=>{$$('[data-nuck]',box).forEach(b=>b.setAttribute('aria-pressed','false'));upd()});
  upd();
};
