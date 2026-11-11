/* =============== 4.4 Nursing care =============== */
/* Main player: a hospital stay in six stations. Each sixth of the timeline animates one vignette: admission and
   handling, blood pressure cuff fit, skin, airway position, injections, and observations after bariatric surgery.
   Numbers drawn in the scenes are published values; the simulated patient's readings are illustrative. */
const NU_ST=['Admission','BP cuff','Skin','Airway','Injections','After surgery'];
const NU_STEPS=[
 {from:0,at:.09,k:'Station 1 of 6',t:'Admission, equipment and handling',
  txt:'Start by asking permission to discuss weight, without judgement: the first of the modified 5As. [[Vallis2013]] Many obesity-related safety incidents reported in the UK involved a lack of suitable equipment, and hospitals should invest in appropriately rated beds, operating tables, trolleys and lifting aids. [[Nightingale2015]] The Revised NIOSH Lifting Equation gives a recommended maximum of 35 lb (about 16 kg) for patient-handling tasks; above this, assistive devices should be used. [[Waters2007]] An international consensus says the right infrastructure should be a standard requirement for accrediting medical facilities. [[Rubino2020Stigma]]',
  pt:'You can ask for equipment that fits you: a wider chair, a stronger bed, a seatbelt extender. Good care includes the right equipment.',
  hook:'NIOSH: 35 lb (about 16 kg) recommended maximum for manual patient-handling tasks. [[Waters2007]]'},
 {from:1/6,at:.27,k:'Station 2 of 6',t:'A cuff that fits the arm',
  txt:'The 2019 AHA statement: measure arm circumference at the midpoint between acromion and olecranon, and choose a cuff whose bladder length is 75% to 100% and width 37% to 50% of the arm circumference, on bare skin. [[Muntner2019]] A cuff that is too small overestimates blood pressure, a common error in people with larger arms. <span class="ev est">Established</span> [[Muntner2019]] A tronco-conical cuff may suit some people, and a thigh cuff can be used if the arm is larger than the largest arm cuff. [[Muntner2019]]',
  pt:'You can ask your nurse for a larger blood pressure cuff. A small cuff can give a falsely high reading.',
  hook:'AHA 2019: bladder length 75 to 100% and width 37 to 50% of arm circumference; too small reads high. [[Muntner2019]]'},
 {from:2/6,at:.43,k:'Station 3 of 6',t:'Skin and pressure injury',
  txt:'In a dose-response meta-analysis of 31,389 hospitalised adults, the link between BMI and pressure injury was J-shaped: odds ratios vs normal weight were 1.70 for underweight, 1.12 for obesity and 1.70 for “morbid obesity”. [[Jia2024]] Immobile people with a high BMI need more staff to reposition them. [[Nightingale2015]] Obesity changes skin barrier function, sweat, lymphatic flow and wound healing, and is linked to intertrigo, cellulitis and lymphoedema. [[Yosipovitch2007]] A systematic review found no evidence on preventing intertrigo in skin folds and no firm evidence on any treatment. [[Mistiaen2010]]',
  pt:'Skin in folds can get sore. Checking it and changing position regularly, with enough people to help, protects it.',
  hook:'Pressure injury risk vs BMI is J-shaped (ORs 1.70, 1.12, 1.70). [[Jia2024]]'},
 {from:3/6,at:.6,k:'Station 4 of 6',t:'Airway and the ramped position',
  txt:'Difficult intubation occurred in 15.5% of patients with BMI 35 or more vs 2.2% of lean patients. [[Juvin2003]] In 100 patients with BMI over 40, neck circumference and Mallampati score, not BMI, predicted difficulty. [[Brodsky2002]] The ramped position, with the tragus of the ear level with the sternum, improves the laryngoscopy view and is recommended as the default for induction; after surgery, patients should be managed sitting or with 45° head-up tilt. [[Nightingale2015]] STOP-BANG is the best-validated sleep apnoea screen; a score of 5 or more suggests significant sleep-disordered breathing. [[Nightingale2015]]',
  pt:'Raising the head and shoulders makes breathing and airway care easier. Bring your own CPAP machine to hospital if you use one.',
  hook:'Ramped: tragus level with sternum. After surgery: sitting or 45° head-up. [[Nightingale2015]]'},
 {from:4/6,at:.77,k:'Station 5 of 6',t:'Injections and VTE prophylaxis',
  txt:'Deltoid fat pad thickness in 220 adults was 11.7 mm in women vs 8.3 mm in men; a 16 mm needle would not have reached 5 mm into muscle in 48.4% of women and 17% of men. [[Poland1997]] On CT, dorsogluteal depth exceeded 35 mm in 43 of 100 adults. [[Nisbet2006]] The AAGBI/SOBA guideline advises avoiding intramuscular drugs in obesity because of unpredictable pharmacokinetics, and recommends VTE prophylaxis for anything more than minor surgery. [[Nightingale2015]] The Lovenox label says the safety and efficacy of prophylactic doses with BMI over 30 “has not been fully determined and there is no consensus for dose adjustment”. [[FDA-Lovenox]]',
  pt:'A standard needle may not reach the muscle through a thicker fat layer. Nurses choose the needle length and site for each person.',
  hook:'A 16 mm deltoid needle missed muscle in 48.4% of women. [[Poland1997]]'},
 {from:5/6,at:.93,k:'Station 6 of 6',t:'After bariatric surgery: watch the pulse',
  txt:'In 210 patients after laparoscopic gastric bypass, 9 leaked (4.3%); respiratory distress and a heart rate above 120 beats per minute were the most sensitive signs, and a routine contrast swallow found only 2 of the 9 leaks. [[Hamilton2003]] Leak signs can be nonspecific: sustained tachycardia, fever, abdominal or shoulder pain and breathing changes. [[Kim2026Complications]] Rhabdomyolysis is rare but serious; consider it with deep tissue pain, classically in the buttocks. [[Nightingale2015]] A team approach to perioperative care is mandatory. [[Mechanick2019]]',
  pt:'After weight-loss surgery, tell the team at once if you have a racing heart, trouble breathing or new belly pain.',
  hook:'Heart rate above 120 after gastric bypass is a leak warning sign; contrast studies missed 78% of leaks. [[Hamilton2003]]'}
];
/* pen teaching, from the labels (statements, not instructions) */
const NU_PENS=[
 {b:'Wegovy (semaglutide)',sites:['abdomen','thigh','arm'],
  items:['Weekly injection under the skin of the abdomen, thigh or upper arm. [[FDA-Wegovy]]','If 2 or more consecutive doses are missed, the label says to restart dose escalation at a lower dosage. [[FDA-Wegovy]]','Single-dose pens are kept in the fridge at 2 to 8 °C and may be kept at 8 to 30 °C for up to 28 days; FlexTouch pens can be stored for 56 days after first use. [[FDA-Wegovy]]','Tell the care team about the medicine before any procedure under anaesthesia or deep sedation: there are rare reports of aspiration. [[FDA-Wegovy]]']},
 {b:'Zepbound (tirzepatide)',sites:['abdomen','thigh','backarm'],
  items:['Weekly injection in the abdomen or thigh; another person may inject in the back of the upper arm. [[FDA-Zepbound]]','A missed dose is given within 4 days (96 hours); if more than 4 days have passed, it is skipped. [[FDA-Zepbound]]','Single-dose pens are refrigerated and may be kept unrefrigerated, up to 30 °C, for a total of 21 days. [[FDA-Zepbound]]','It may reduce the effect of oral contraceptive pills: the label advises a non-oral or added barrier method for 4 weeks after starting and each dose increase. [[FDA-Zepbound]]']},
 {b:'Saxenda (liraglutide)',sites:['abdomen','thigh','arm'],
  items:['Daily injection in the abdomen, thigh or upper arm. [[FDA-Saxenda]]','A missed dose is not made up with an extra or larger dose. [[FDA-Saxenda]]','Indicated from age 12 with body weight over 60 kg and obesity. [[FDA-Saxenda]]']}
];

inits.nursing=()=>{
  /* ---------- the hospital stay ---------- */
  const svg=$('#nuSvg'),rg=$('#nuT'),note=$('#nuNote');let setA=null;
  const txt=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}" style="${st}">${s}</text>`;
  const B='fill:var(--ink);font-weight:700';
  /* 1 admission: scale, equipment, a load bar crossing the 35 lb line */
  function vAdmit(u,N,ox,oy,W){let g='';const sx=ox+(N?90:120),base=oy+(N?236:270);
    g+=`<rect x="${sx-48}" y="${base}" width="96" height="14" rx="4" style="fill:var(--device)"/><rect x="${sx-20}" y="${base+3}" width="40" height="8" rx="2" style="fill:var(--panel)"/>`;
    g+=person(sx,base-170,170,{size:.75}).svg;
    g+=txt(sx,base+32,'a platform scale rated for the person','t-xs t-mid',B);
    const bx=N?ox+200:ox+300,bw=N?150:150,by=oy+40,bh=N?190:220,lim=.42,load=lerp(.12,.95,ramp(u,.15,.8));
    g+=txt(bx,by-14,'manual lifting load','t-xs',B);
    g+=`<rect x="${bx}" y="${by}" width="44" height="${bh}" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${bx}" y="${f1(by+bh*(1-load))}" width="44" height="${f1(bh*load)}" rx="6" style="fill:${load>lim?'var(--risk)':'var(--life)'};opacity:.85"/>`;
    const ly=by+bh*(1-lim);g+=`<line x1="${bx-6}" x2="${bx+60}" y1="${f1(ly)}" y2="${f1(ly)}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:5 3"/>`+txt(bx+64,ly+4,'35 lb ≈ 16 kg','t-xs',B)+txt(bx+64,ly+16,'NIOSH limit');
    const over=load>lim;g+=`<rect x="${bx+56}" y="${by+6}" width="${N?126:150}" height="36" rx="8" style="fill:${over?'var(--life-soft)':'var(--panel)'};stroke:${over?'var(--life)':'var(--line)'};${over?'':'stroke-dasharray:4 3'}"/>`+txt(bx+64,by+21,over?'above the limit:':'below the limit','t-xs',B)+txt(bx+64,by+34,over?'use assistive devices':'');
    if(!N){const ex=ox+540;g+=txt(ex,oy+40,'rated equipment','t-xs',B);
      ['bed','operating table','trolley','lifting aid'].forEach((e,i)=>{const y=oy+62+i*48,on=u>.2+i*.12;
        g+=`<rect x="${ex}" y="${y}" width="130" height="36" rx="8" style="fill:${on?'var(--life-soft)':'var(--panel)'};stroke:${on?'var(--life)':'var(--line)'}"/>`+txt(ex+12,y+22,e,'t-sm',on?B:'')})}
    return g}
  /* 2 BP cuff: arm cross-section with the bladder arc, and the 75-100% band */
  function vCuff(u,N,ox,oy,W){let g='';const ac=lerp(32,48,ramp(u,.05,.55)),xl=u>.68,bl=xl?42:30,r=bl/ac;
    const cx=ox+(N?110:150),cy=oy+(N?120:150),R=ac*(N?2.1:2.5);
    g+=`<circle cx="${cx}" cy="${cy}" r="${f1(R)}" style="fill:var(--lean);opacity:.55;stroke:var(--figure-line)"/><circle cx="${cx}" cy="${cy}" r="${f1(R*.22)}" style="fill:var(--panel);stroke:var(--figure-line)"/>`;
    const a0=-Math.PI/2,a1=a0+2*Math.PI*Math.min(r,.999),Rc=R+7,big=r>.5?1:0;
    g+=`<path d="M${f1(cx+Rc*Math.cos(a0))} ${f1(cy+Rc*Math.sin(a0))}A${f1(Rc)} ${f1(Rc)} 0 ${big} 1 ${f1(cx+Rc*Math.cos(a1))} ${f1(cy+Rc*Math.sin(a1))}" style="fill:none;stroke:${r<.75?'var(--risk)':'var(--device)'};stroke-width:10;stroke-linecap:round"/>`;
    g+=txt(cx,cy+R+30,'upper arm, cross-section','t-xs t-mid',B)+txt(cx,cy+R+44,'(ring = cuff bladder length)','t-xs t-mid');
    const bx=N?ox+20:ox+330,bw=N?340:330,by=N?oy+(N?280:0):oy+50,S=bw/52;
    g+=txt(bx,by,`arm circumference ${ac.toFixed(0)} cm`,'t-sm',B);
    g+=`<rect x="${bx}" y="${by+10}" width="${f1(ac*S)}" height="16" rx="4" style="fill:var(--lean);opacity:.55"/><rect x="${f1(bx+ac*S*.75)}" y="${by+8}" width="${f1(ac*S*.25)}" height="20" style="fill:none;stroke:var(--good);stroke-width:2"/>`;
    g+=txt(bx+ac*S*.75,by+42,'75 to 100% band','t-xs',B);
    g+=txt(bx,by+70,`${xl?'extra-large adult cuff':'adult cuff'}: bladder ${bl} cm`,'t-sm',B);
    g+=`<rect x="${bx}" y="${by+80}" width="${f1(bl*S)}" height="16" rx="4" style="fill:${r<.75?'var(--risk)':'var(--device)'}"/>`;
    const ok=r>=.75&&r<=1;
    g+=`<rect x="${bx}" y="${by+112}" width="${bw}" height="${N?56:62}" rx="10" style="fill:${ok?'var(--good-soft)':'var(--bad-soft)'}"/>`;
    g+=txt(bx+12,by+134,`bladder = ${Math.round(r*100)}% of the arm`,'t-sm',`fill:${ok?'var(--good)':'var(--bad)'};font-weight:700`);
    g+=txt(bx+12,by+152,ok?'fits the AHA range':'too small: the reading will be falsely high','t-xs',B);
    return g}
  /* 3 skin: J-shaped odds ratios */
  function vSkin(u,N,ox,oy,W){let g='';const D=[['underweight',1.7],['normal',1],['obesity',1.12],['“morbid obesity”',1.7]];
    const x0=ox+(N?30:60),w=N?320:420,y0=oy+(N?40:40),h=N?190:220,Y=v=>y0+h-h*v/2,bw=w/4*.56;
    g+=txt(x0,y0-14,'pressure injury, odds ratio vs normal weight','t-xs',B);
    g+=`<line x1="${x0}" x2="${x0+w}" y1="${f1(Y(1))}" y2="${f1(Y(1))}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:4 3"/>`+txt(x0-4,Y(1)+4,'1','t-xs t-end');
    const pts=[];D.forEach(([n,v],i)=>{const g2=ramp(u,.05+i*.12,.3+i*.12),x=x0+w/4*(i+.5),vv=lerp(0,v,ease(g2));pts.push([x,Y(v)]);
      g+=`<rect x="${f1(x-bw/2)}" y="${f1(Y(vv))}" width="${f1(bw)}" height="${f1(Y(0)-Y(vv))}" rx="4" style="fill:var(--hl);opacity:.75"/>`;
      g+=txt(x,Y(0)+14,n,'t-xs t-mid',B)+(g2>.98?txt(x,Y(v)-6,v.toFixed(2),'t-xs t-mid',B):'')});
    if(u>.65)g+=`<path d="${smoothPath(pts,false)}" style="fill:none;stroke:var(--ink);stroke-width:2;opacity:${f1(ramp(u,.65,.8))}"/>`+kitLabel(pts[3][0]-20,pts[3][1]-22,'J-shaped',{a:'e'});
    if(!N){const sx=ox+520;g+=txt(sx,oy+40,'skin folds','t-xs',B);
      g+=`<path d="M${sx} ${oy+80}q60 -30 120 0q-60 40 -120 0z" style="fill:var(--fat);opacity:.6;stroke:var(--fat-line)"/><path d="M${sx} ${oy+100}q60 40 120 0" style="fill:none;stroke:var(--fat-line);stroke-width:1.4"/>`;
      const glow=bump(u,.3,1);g+=`<ellipse cx="${sx+60}" cy="${oy+92}" rx="50" ry="6" style="fill:var(--risk);opacity:${f1(.15+.3*glow)}"/>`;
      g+=txt(sx,oy+140,'intertrigo: no evidence on','t-xs')+txt(sx,oy+154,'prevention, none firm on','t-xs')+txt(sx,oy+168,'treatment (review of 68 studies)','t-xs')}
    return g}
  /* 4 airway: torso pivots at the hip until the ear is level with the sternum, then 45 degrees after surgery */
  function vAirway(u,N,ox,oy,W){let g='';const th=(u<.55?lerp(0,23.7,ease(ramp(u,.08,.5))):lerp(23.7,45,ease(ramp(u,.66,.95))))*Math.PI/180;
    const hx=ox+(N?290:330),hy=oy+(N?210:230),c=Math.cos(th),s=Math.sin(th);
    /* a point d along the torso from the hip, p in front of it */
    const at=(d,p)=>[hx-d*c+p*s, hy-d*s-p*c];
    g+=`<rect x="${hx-220}" y="${hy+18}" width="${N?320:420}" height="12" rx="4" style="fill:var(--device);opacity:.6"/>`;
    /* wedge / bed back */
    const k1=at(190,-18);g+=`<path d="M${hx} ${hy+18}L${f1(k1[0])} ${f1(k1[1]+18*c)}L${f1(k1[0])} ${hy+18}Z" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    /* legs */
    g+=`<path d="M${hx} ${hy}L${hx+(N?70:150)} ${hy+4}" style="stroke:var(--figure);stroke-width:34;stroke-linecap:round"/>`;
    /* torso */
    const sh=at(140,0);g+=`<path d="M${hx} ${hy}L${f1(sh[0])} ${f1(sh[1])}" style="stroke:var(--figure);stroke-width:62;stroke-linecap:round"/>`;
    const head=at(186,4);g+=`<circle cx="${f1(head[0])}" cy="${f1(head[1])}" r="22" style="fill:var(--figure);stroke:var(--figure-line)"/>`;
    const ear=at(180,8),st=at(130,30);
    const lvl=Math.abs(ear[1]-st[1])<2.5;
    g+=`<circle cx="${f1(ear[0])}" cy="${f1(ear[1])}" r="4" style="fill:var(--ink)"/><circle cx="${f1(st[0])}" cy="${f1(st[1])}" r="4" style="fill:var(--ink)"/>`;
    g+=`<line x1="${f1(ear[0]-20)}" x2="${f1(st[0]+40)}" y1="${f1(ear[1])}" y2="${f1(ear[1])}" style="stroke:${lvl?'var(--good)':'var(--muted)'};stroke-width:1.6;stroke-dasharray:5 3"/>`;
    g+=kitLabel(ear[0]-10,ear[1]-12,'tragus',{a:'e'})+kitLabel(st[0]+8,st[1]+16,'sternum');
    const deg=Math.round(th*180/Math.PI);
    g+=txt(ox+(N?20:30),oy+30,u<.6?(lvl?'ramped: ear level with sternum':'raising the head and shoulders'):(deg>=44?'after surgery: 45° head-up':'tilting towards 45°'),'t-sm',B)+txt(ox+(N?20:30),oy+48,`back angle about ${deg}° (schematic)`);
    const bx=ox+(N?20:500),by=oy+(N?290:80);
    g+=txt(bx,by,'difficult intubation','t-xs',B);
    [['lean',2.2],['BMI ≥35',15.5]].forEach(([n,v],i)=>{const y=by+12+i*30;g+=`<rect x="${bx}" y="${y}" width="${f1(v*6*ramp(u,.1,.4))}" height="16" rx="4" style="fill:var(--hl)"/>`+txt(bx+v*6+6,y+12,`${n}: ${v}%`,'t-xs',B)});
    return g}
  /* 5 injections: needles of 16, 25 and 38 mm through a growing fat layer */
  function vNeedle(u,N,ox,oy,W){let g='';const fat=lerp(8,30,ease(ramp(u,.1,.75))),k=N?3.6:4.2,x0=ox+(N?20:40),w=N?340:400,y0=oy+64;
    g+=txt(x0,y0-38,`subcutaneous fat over the muscle: ${fat.toFixed(0)} mm (schematic)`,'t-xs',B);
    g+=`<rect x="${x0}" y="${y0}" width="${w}" height="6" style="fill:var(--cyto);stroke:var(--fat-line)"/><rect x="${x0}" y="${y0+6}" width="${w}" height="${f1(fat*k)}" style="fill:var(--fat);opacity:.75"/><rect x="${x0}" y="${f1(y0+6+fat*k)}" width="${w}" height="${f1(Math.max(30,(46-fat)*k))}" style="fill:var(--lean);opacity:.8"/>`;
    g+=kitLabel(x0+w-6,y0+20,'fat',{a:'e'})+kitLabel(x0+w-6,y0+6+fat*k+18,'muscle',{a:'e'});
    [16,25,38].forEach((L,i)=>{const x=x0+w*(i+1)/4.4,tip=y0+L*k,reach=L>=fat+5;
      g+=`<rect x="${f1(x-5)}" y="${y0-26}" width="10" height="20" rx="2" style="fill:var(--pen-dark)"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${y0-6}" y2="${f1(tip)}" style="stroke:var(--device);stroke-width:2"/>`;
      g+=`<circle cx="${f1(x)}" cy="${f1(tip)}" r="5" style="fill:${reach?'var(--good)':'var(--risk)'};stroke:var(--panel);stroke-width:1.5"/>`;
      g+=kitLabel(x+8,y0-12,L+' mm')+kitLabel(x+8,tip+4,reach?'in muscle':'in fat')});
    if(!N){const sx=ox+500;g+=txt(sx,oy+60,'deltoid fat pad, mean','t-xs',B)+txt(sx,oy+76,'women 11.7 mm · men 8.3 mm','t-xs');
      g+=txt(sx,oy+110,'16 mm needle short of','t-xs',B)+txt(sx,oy+126,'5 mm into muscle:','t-xs',B)+txt(sx,oy+142,'48.4% of women, 17% of men','t-xs');
      g+=txt(sx,oy+180,'enoxaparin label, BMI >30:','t-xs',B)+txt(sx,oy+196,'“no consensus for dose','t-xs')+txt(sx,oy+212,'adjustment”','t-xs')}
    return g}
  /* 6 after surgery: a simulated heart rate climbing past 120 */
  function vObs(u,N,ox,oy,W){let g='';const hr=lerp(84,132,ease(ramp(u,.08,.75))),rr=Math.round(lerp(16,28,ease(ramp(u,.2,.8))));
    const mx=ox+(N?10:30),mw=N?360:420,my=oy+20,mh=N?170:200;
    g+=`<rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="12" style="fill:var(--ink);opacity:.92"/>`;
    const tY=v=>my+mh-14-(mh-78)*(v-60)/(140-60);
    g+=`<line x1="${mx+10}" x2="${mx+mw-10}" y1="${f1(tY(120))}" y2="${f1(tY(120))}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:6 4"/>`;
    g+=`<text x="${mx+mw-14}" y="${f1(tY(120)-5)}" class="t-xs t-end" style="fill:var(--bad-soft)">120 /min</text>`;
    let d='';const n=70;for(let i=0;i<=n;i++){const q=i/n,uu=Math.max(0,u-(1-q)*.35),h=lerp(84,132,ease(ramp(uu,.08,.75)))+Math.sin(i*1.7)*2;d+=(i?'L':'M')+f1(mx+12+(mw-24)*q)+' '+f1(tY(h))}
    g+=`<path d="${d}" style="fill:none;stroke:var(--good-soft);stroke-width:2.2"/>`;
    g+=`<text x="${mx+18}" y="${my+34}" class="t-big" style="fill:${hr>120?'var(--bad-soft)':'var(--good-soft)'};font-size:28px">HR ${Math.round(hr)}</text><text x="${mx+18}" y="${my+52}" class="t-xs" style="fill:var(--bg)">breaths ${rr}/min · simulated patient</text>`;
    const al=hr>120,ay=my+mh+14;
    g+=`<rect x="${mx}" y="${ay}" width="${mw}" height="${N?62:52}" rx="10" style="fill:${al?'var(--bad-soft)':'var(--panel-2)'};stroke:${al?'var(--bad)':'var(--line)'}"/>`;
    g+=txt(mx+12,ay+20,al?'heart rate above 120: a leak warning sign':'observations within the usual range','t-sm',`fill:${al?'var(--bad)':'var(--ink)'};font-weight:700`)+txt(mx+12,ay+38,al?(N?'tell the surgical team now':'tell the surgical team now (contrast swallow found 2 of 9 leaks)'):'keep watching pulse, breathing and pain');
    if(!N){const sx=ox+480;g+=txt(sx,oy+40,'leak warning features','t-xs',B);
      ['sustained fast pulse','breathing changes','fever','belly or shoulder pain'].forEach((e,i)=>{const on=u>.3+i*.12;g+=`<circle cx="${sx+6}" cy="${oy+64+i*26}" r="5" style="fill:${on?'var(--risk)':'var(--panel)'};stroke:var(--risk)"/>`+txt(sx+18,oy+68+i*26,e,'t-sm',on?B:'')})}
    return g}
  const NU_V=[vAdmit,vCuff,vSkin,vAirway,vNeedle,vObs];
  function draw(t){
    const N=vb(svg,'720 400','400 530');
    const i=Math.min(5,Math.floor(t*6)),u=ramp(t,i/6,(i+1)/6);
    let g='';const rx0=N?30:50,rx1=N?370:670,ry=26,RX=k=>lerp(rx0,rx1,k/5);
    g+=`<line x1="${rx0}" x2="${rx1}" y1="${ry}" y2="${ry}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${rx0}" x2="${f1(lerp(rx0,rx1,clamp(t*6/5)))}" y1="${ry}" y2="${ry}" style="stroke:var(--life);stroke-width:4;stroke-linecap:round"/>`;
    NU_ST.forEach((s,k)=>{const on=k<=i;g+=`<circle cx="${f1(RX(k))}" cy="${ry}" r="${k===i?9:6}" style="fill:${on?'var(--life)':'var(--panel)'};stroke:var(--life);stroke-width:2"/>`;
      if(!N||k===i)g+=`<text x="${f1(RX(k))}" y="${ry+24}" class="t-xs ${N&&k===5?'t-end':N&&k===0?'':'t-mid'}" style="fill:var(--ink);font-weight:${k===i?700:500}">${N?s:s}</text>`});
    const fade=Math.min(ramp(u,0,.08),1);
    g+=`<g style="opacity:${f1(.25+.75*fade)}">`+NU_V[i](u,N,N?10:10,N?62:66,N?380:700)+'</g>';
    svg.innerHTML=g;
    const p=phaseOf(NU_STEPS,t);note.innerHTML=noteHTML(NU_STEPS[p]);setA&&setA(p);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,24000,'%t:player.replay%','nursing');
  setA=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- body-weight descriptors (teaching only; no dosing output) ---------- */
  const sx=$('#nuSex'),ht=$('#nuHt'),wt=$('#nuWt'),bsv=$('#nuBw'),out=$('#nuBwOut');
  function calc(){
    const male=sx.value==='m',h=clamp(+ht.value||0,120,220),w=clamp(+wt.value||0,30,350);
    const ibw=h-(male?100:105),abw=ibw+.4*(w-ibw),cap=male?100:70;
    const N=vb(bsv,'720 220','400 270');
    const L=N?{lx:20,bx:20,bw:300,y0:24,rh:66}:{lx:20,bx:250,bw:400,y0:40,rh:52};
    const mx=Math.max(w,ibw,abw,cap)*1.08,X=v=>L.bx+L.bw*v/mx;
    const rows=[['Total body weight (TBW)',w,'var(--figure-line)','the weight on the scale'],['Ideal body weight (IBW)',ibw,'var(--tx)',`height ${h} − ${male?100:105}`],['Adjusted body weight (ABW)',abw,'var(--life)','IBW + 0.4 × (TBW − IBW)']];
    let g='';
    rows.forEach(([n,v,col,f],i)=>{const y=L.y0+i*L.rh,by=N?y+8:y;
      g+=`<text x="${L.lx}" y="${N?y:by+13}" class="t-sm" style="fill:var(--ink);font-weight:700">${n}</text>`;
      if(!N)g+=`<text x="${L.lx}" y="${by+28}" class="t-xs">${f}</text>`;
      g+=`<rect x="${L.bx}" y="${by}" width="${f1(Math.max(2,X(Math.max(0,v))-L.bx))}" height="18" rx="4" style="fill:${col};opacity:.85"/><text x="${f1(X(Math.max(0,v))+6)}" y="${by+13}" class="t-xs" style="fill:var(--ink);font-weight:700">${v.toFixed(1)} kg</text>`;
      if(i===2&&w>ibw){const a=X(ibw),b=X(w),c=X(abw);g+=`<path d="M${f1(a)} ${by+24}v6H${f1(b)}v-6" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`+kitLabel(c,by+44,'40% of the excess',{a:'m'})}});
    const cy=L.y0+3*L.rh+(N?6:0);
    g+=`<line x1="${f1(X(cap))}" x2="${f1(X(cap))}" y1="${L.y0-14}" y2="${cy}" style="stroke:var(--hl);stroke-width:1.4;stroke-dasharray:5 3"/>`+(N?kitLabel(20,cy+20,`dashed line: lean body weight rarely above ${cap} kg (${male?'men':'women'})`):kitLabel(X(cap)+4,L.y0-16,`lean body weight rarely above ${cap} kg (${male?'men':'women'})`));
    bsv.innerHTML=g;
    out.innerHTML=`<b>${w.toFixed(0)} kg</b> total · <b>${ibw.toFixed(1)} kg</b> ideal · <b>${abw.toFixed(1)} kg</b> adjusted`+(w<ibw?' · total is below ideal here, so adjusted falls between them':'');
  }
  [sx,ht,wt].forEach(el=>{el.addEventListener('input',calc);el.addEventListener('change',calc)});
  calc();

  /* ---------- pen teaching ---------- */
  const psv=$('#nuPen'),pb=$('#nuPenBtns'),pl=$('#nuPenList');let pi=0;
  pb.innerHTML=NU_PENS.map((p,i)=>`<button class="btn" data-pen="${i}" aria-pressed="${i===0}">${p.b}</button>`).join('');
  function drawPen(){
    const N=vb(psv,'720 300','400 300'),P=NU_PENS[pi];
    const px=N?120:200,py=20,ps=260,pr=person(px,py,ps,{size:.5});
    let g=pr.svg;const k=ps/100;
    const S={abdomen:[[px-18*k/2.6,py+48*k],[px+18*k/2.6,py+48*k]],thigh:[[px-7*k,py+70*k],[px+7*k,py+70*k]],arm:[[px-17*k,py+34*k],[px+17*k,py+34*k]],backarm:[[px-17*k,py+34*k],[px+17*k,py+34*k]]};
    const NM={abdomen:'abdomen',thigh:'thigh',arm:'upper arm',backarm:'back of upper arm (by another person)'};
    P.sites.forEach((s,j)=>{S[s].forEach(q=>{g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="9" style="fill:var(--rx-drug);opacity:.25"/><circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="4.5" style="fill:var(--rx-drug)"/>`});
      const q=S[s][1],lx=N?px+90:px+120,ly=q[1]+(s==='abdomen'?6:0);g+=`<line x1="${f1(q[0]+6)}" y1="${f1(q[1])}" x2="${lx-4}" y2="${ly}" style="stroke:var(--muted);stroke-width:1"/>`+kitLabel(lx,ly+3,NM[s])});
    if(!N)g+=pen(560,150,1.4,{ang:-30,needle:0,cap:true}).svg+`<text x="560" y="250" class="t-xs t-mid">prefilled pen (no dose shown)</text>`;
    psv.innerHTML=g;
    pl.innerHTML=P.items.map((it,j)=>`<li><label><input type="checkbox"> <span>${it}</span></label></li>`).join('');
  }
  pb.addEventListener('click',e=>{const b=e.target.closest('[data-pen]');if(!b)return;pi=+b.dataset.pen;$$('[data-pen]',pb).forEach(x=>x.setAttribute('aria-pressed',x===b));drawPen()});
  drawPen();
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();calc();drawPen()};
};
