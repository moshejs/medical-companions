/* =============== 2.5 Chest pain: heart attack or something else? =============== */
const DF_STEPS=[
 {from:0,at:.07,k:'Overview',t:'What chest pain turns out to be',
  txt:`Among 10,689 US emergency patients with possible cardiac ischaemia, 17% had acute cardiac ischaemia, 21% other cardiac problems and 55% noncardiac problems. In a JAMA review, about 10% of people with acute chest pain were finally diagnosed with acute coronary syndrome. [[Pope2000,Fanaroff2015]]`,
  pt:`Some conditions feel like a heart attack, such as a tear in the main artery, a clot in the lung or inflammation around the heart. That is why emergency care matters.`,
  hook:`History, examination and ECG alone neither confirm nor exclude ACS. [[Fanaroff2015]]`},
 {from:.13,at:.21,k:'The aorta',t:'Aortic dissection',
  txt:`A tear in the inner wall of the aorta. In IRAD (464 patients), sudden severe sharp pain was the commonest complaint, while aortic regurgitation (31.6%) and a pulse deficit (15.1%) were often absent. The ECG was normal in 31.3% and the chest X-ray in 12.4%. In-hospital mortality was 27.4%. [[Hagan2000]] In ADvISED, a low aortic dissection detection risk score (ADD-RS ≤1) with D-dimer below 500 ng/mL had a failure rate of 0.3%. [[Nazerian2018]]`,
  pt:`A tear in the main artery (aortic dissection) can cause sudden, severe chest or back pain. A normal heart tracing does not rule it out.`,
  hook:`The ECG is normal in about one-third of aortic dissections. [[Hagan2000]]`},
 {from:.27,at:.35,k:'The lungs',t:'Pulmonary embolism',
  txt:`A clot lodges in a lung artery. The Wells score gives points for clinical signs of deep vein thrombosis (3.0), no likelier alternative diagnosis (3.0), heart rate over 100 (1.5), immobilisation or surgery in the previous 4 weeks (1.5), previous DVT or PE (1.5), coughing blood (1.0) and cancer (1.0). A score of 4.0 or less with a negative D-dimer applied to 46% of patients, and PE was then found in 2.2% (derivation) and 1.7% (validation). [[Wells2000]]`,
  pt:`A clot in the lung can cause chest pain and breathlessness. Doctors use a points score and a blood test (D-dimer) to decide who needs a scan.`,
  hook:`Wells ≤4 + negative D-dimer: PE in 1.7% on validation. [[Wells2000]]`},
 {from:.41,at:.49,k:'The heart sac',t:'Pericarditis & myocarditis',
  txt:`Pericarditis is the commonest pericardial disease, diagnosed clinically from chest pain, a pericardial rub, ECG changes and a pericardial effusion. In developed countries 80–90% is idiopathic or presumed viral, and it recurs in about 30% without preventive treatment. Fever over 38 °C, a subacute course, a large effusion or tamponade, and failure of anti-inflammatory drugs (NSAIDs) mark a poorer outlook. [[Imazio2015]] Myocarditis, inflammation of the muscle itself, causes non-ischaemic myocardial injury: troponin can rise without an MI. [[Thygesen2018UDMI4C]]`,
  pt:`Inflammation around the heart (pericarditis) or in the heart muscle (myocarditis) can mimic a heart attack. Most pericarditis follows a virus.`,
  hook:`Pericarditis: chest pain, rub, ECG changes, effusion. 80–90% idiopathic or viral. [[Imazio2015]]`},
 {from:.55,at:.63,k:'The ventricle',t:'Takotsubo syndrome',
  txt:`The tip of the left ventricle stops contracting and balloons while the base still squeezes. UDMI4 reports ST elevation in 44%, usually widespread beyond one coronary territory, modest and short-lived troponin rises, and apical akinesis in 82%. [[Thygesen2018UDMI4C]] InterTAK criteria include transient left ventricular dysfunction usually extending beyond a single coronary territory, and significant coronary disease does not rule it out. In the registry, 89.8% were women. [[Ghadri2018,Templin2015]]`,
  pt:`"Broken heart syndrome" (takotsubo) can look like a heart attack. It mostly affects older women and is often set off by stress or illness.`,
  hook:`Takotsubo: about 90% women, apical ballooning, coronary disease does not exclude it. [[Ghadri2018,Templin2015]]`},
 {from:.69,at:.77,k:'A coronary artery',t:'SCAD',
  txt:`In spontaneous coronary artery dissection, a tear inside the wall of a heart artery narrows it, rather than a furred-up, blocked artery. The AHA calls it an important cause of acute coronary syndrome, MI and sudden death, particularly among young women and people with few conventional risk factors. [[Hayes2018]] In the Canadian cohort, 88.5% were women, mean age 51.8, and 33.9% had no cardiac risk factors. [[Saw2019]]`,
  pt:`Some people, often younger women, have a heart attack from a tear inside a heart artery (SCAD) rather than from a blocked, furred-up artery.`,
  hook:`SCAD: young women, few risk factors, pregnancy and fibromuscular dysplasia. [[Hayes2018,Saw2019]]`},
 {from:.83,at:.91,k:'Open arteries',t:'MINOCA',
  txt:`MI with no obstructive coronary arteries: the criteria for MI are met, but angiography shows no obstructive disease. A systematic review found it in 6% of MI. Cardiac MRI showed a typical infarct in only 24% and myocarditis in 33%, and coronary spasm could be provoked in 27%. [[Pasupathy2015]] The AHA treats MINOCA as a working diagnosis whose many causes each need evaluation. [[TamisHolland2019MINOCA]]`,
  pt:`Sometimes a heart attack happens even though the heart arteries look open. Further tests, often an MRI scan of the heart, look for the cause.`,
  hook:`MINOCA ≈ 6% of MI; a working diagnosis; MRI often shows myocarditis. [[Pasupathy2015]]`}
];
const DF_COND=[
 {id:'mi',n:'Heart attack (type 1 MI)'},{id:'ad',n:'Aortic dissection'},{id:'pe',n:'Pulmonary embolism'},{id:'peri',n:'Pericarditis'},
 {id:'myo',n:'Myocarditis'},{id:'tako',n:'Takotsubo'},{id:'scad',n:'SCAD'},{id:'minoca',n:'MINOCA'}];
const DF_TESTS=[{id:'ecg',n:'ECG'},{id:'trop',n:'Troponin'},{id:'dd',n:'D-dimer'},{id:'rule',n:'Clinical rules & exam'},{id:'echo',n:'Imaging the ventricle'},{id:'angio',n:'Coronary angiography'},{id:'mri',n:'Cardiac MRI'}];
const DF_ST={key:['●','Central','dx'],part:['◐','Supports','accent'],lim:['△','Often normal or misleading','warn'],na:['–','Not covered here','']};
const DF_MX={
 mi:{ecg:['key',`STEMI: new J-point elevation of at least 1 mm in two contiguous leads, with higher thresholds in V2–V3. But the ECG is normal in more than one-third of NSTE-ACS. [[Thygesen2018UDMI4C,Byrne2023ESC]]`],
  trop:['key',`A rise and/or fall of troponin with at least one value above the 99th percentile, plus evidence of ischaemia. [[Thygesen2018UDMI4C]]`],
  rule:['part',`HEART, TIMI and GRACE sort people into risk bands; see <a href="#scores" data-go="scores">Risk scores</a>. [[Backus2013]]`],
  echo:['part',`A new regional wall motion abnormality on imaging is one of the supporting criteria. [[Thygesen2018UDMI4C]]`],
  angio:['key',`Coronary thrombus seen at angiography is one of the criteria for type 1 MI. [[Thygesen2018UDMI4C]]`],
  mri:['part',`Imaging evidence of new loss of viable myocardium counts as a supporting criterion. [[Thygesen2018UDMI4C]]`]},
 ad:{ecg:['lim',`Normal in 31.3% of IRAD patients; the chest X-ray was normal in 12.4%. [[Hagan2000]]`],
  dd:['key',`Sensitivity 96.7% for acute aortic syndrome; ADD-RS ≤1 with D-dimer below 500 ng/mL had a failure rate of 0.3% and an efficiency of 49.9%. [[Nazerian2018]]`],
  rule:['key',`95.7% of 2538 IRAD patients had at least one of 12 guideline risk markers; on the ADD risk score 4.3% scored 0, 36.5% scored 1 and 59.2% scored 2–3. A pulse deficit (15.1%) or aortic regurgitation (31.6%) was often absent. [[Rogers2011,Hagan2000]]`]},
 pe:{dd:['key',`Wells ≤4.0 ("PE unlikely") with a negative D-dimer applied to 46% of patients; PE was found in 2.2% (derivation) and 1.7% (validation). [[Wells2000]]`],
  rule:['key',`Wells score (7 items, 1.0–3.0 points each). With low clinical suspicion, the PERC rule (age under 50, pulse under 100, oxygen saturation at least 95%, no coughing blood, no oestrogen use, no recent surgery or trauma, no prior clot, no one-sided leg swelling) had a false-negative rate of 1.0%. [[Wells2000,Kline2008]]`]},
 peri:{ecg:['key',`ECG changes are one of the four clinical features used for diagnosis. [[Imazio2015]]`],
  echo:['key',`A pericardial effusion is another feature; a large effusion or tamponade is a reason for admission. [[Imazio2015]]`],
  rule:['part',`A pericardial rub on examination is a diagnostic feature; fever over 38 °C, a subacute course and failure of NSAIDs mark a poorer prognosis. [[Imazio2015]]`]},
 myo:{trop:['part',`Myocarditis causes non-ischaemic myocardial injury: troponin above the 99th percentile without MI. A single raised value alone is not MI. [[Thygesen2018UDMI4C,Byrne2023ESC]]`],
  mri:['key',`Among people with MINOCA, cardiac MRI showed myocarditis in 33%. [[Pasupathy2015]]`]},
 tako:{ecg:['lim',`ST elevation in 44%, usually widespread beyond one coronary territory, so it can look like STEMI. [[Thygesen2018UDMI4C]]`],
  trop:['lim',`Troponin rises are usually modest and transient; BNP is frequently raised. [[Thygesen2018UDMI4C,Ghadri2018]]`],
  echo:['key',`Left ventricular dysfunction usually extends beyond a single coronary territory; apical akinesis is the commonest pattern (82%). [[Ghadri2018,Thygesen2018UDMI4C]]`],
  angio:['part',`Needed to look at the arteries, but significant coronary disease does not rule takotsubo out. [[Ghadri2018]]`]},
 scad:{ecg:['part',`SCAD is itself a cause of acute coronary syndrome and MI, so the ECG can change as in any MI. [[Hayes2018]]`],
  trop:['part',`As a cause of MI, SCAD can meet the troponin criteria for MI. [[Hayes2018]]`],
  rule:['lim',`33.9% of the Canadian cohort had no cardiac risk factors, so a risk-factor item adds nothing for them. [[Saw2019]]`]},
 minoca:{trop:['key',`The criteria for MI are met; MINOCA is 6–8% of MI in UDMI4. [[Thygesen2018UDMI4C]]`],
  angio:['key',`By definition no obstructive coronary disease; coronary spasm could be provoked in 27%. A working diagnosis, not a final one. [[Pasupathy2015,TamisHolland2019MINOCA]]`],
  mri:['key',`Showed a typical infarct in only 24% and myocarditis in 33%. [[Pasupathy2015]]`]}
};
inits.differential=()=>{
  const svg=$('#dfSvg'),rg=$('#dfT');
  const halo='paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round';
  const wrap=(txt,n)=>{const w=txt.split(' '),out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){out.push(l.trim());l=x}else l+=' '+x});if(l.trim())out.push(l.trim());return out};
  const HS=.72,HX=168,HY=196,HL=`translate(${f1(HX-100*HS)} ${f1(HY-100*HS)}) scale(${HS})`;
  const LUNG_R=smoothPath([[100,58],[68,80],[48,150],[46,250],[70,292],[122,286],[136,206],[128,92]]),LUNG_L=smoothPath([[222,58],[252,80],[274,150],[278,250],[256,292],[216,290],[204,244],[194,94]]);
  /* the chest scene in a 320 x 356 local box */
  function scene(i,u,t){const beat=Math.sin(t*120);let s=`<path d="M44 26C90 6 230 6 276 26L300 120L292 356L28 356L20 120Z" style="fill:var(--skin);opacity:.42"/>`;
    const lungHl=i===2,aoHl=i===1,peHl=i===3;
    s+=`<path d="${LUNG_R}" style="fill:var(--panel-2);stroke:${lungHl?'var(--dx)':'var(--muted)'};stroke-width:${lungHl?1.8:1};opacity:.95"/><path d="${LUNG_L}" style="fill:var(--panel-2);stroke:${lungHl?'var(--dx)':'var(--muted)'};stroke-width:${lungHl?1.8:1};opacity:.95"/>`;
    /* pulmonary embolism: grey wedge downstream of the clot */
    if(i===2){const w=ramp(u,.55,1);s+=`<path d="M92 204L52 236L56 276L94 270Z" style="fill:var(--isch-fill);opacity:${f1(w*.75)}"/>`}
    /* pulmonary arteries */
    const pa=`M193.6 162.8C214 166 236 182 244 214M232 190L258 196M193.6 162.8C170 150 140 152 118 168C102 180 94 196 92 204M118 168L84 162M104 186L72 214`;
    s+=`<path d="${pa}" style="fill:none;stroke:var(--accent);stroke-width:${lungHl?4:3};stroke-linecap:round;opacity:${lungHl?.9:.45}"/>`;
    /* descending aorta behind the heart, in heart coordinates */
    s+=`<g transform="${HL}"><path d="M154 40L157 256" style="fill:none;stroke:${aoHl?'var(--bad)':'var(--vessel)'};stroke-width:15;stroke-linecap:round"/></g>`;
    /* pericardial sac */
    const sac=smoothPath(HEART_OUT.map(p=>[105+(p[0]-105)*1.13,124+(p[1]-124)*1.13]));
    const fl=i===3?ramp(u,.1,.8):0;
    s+=`<g transform="${HL}"><path d="${sac}" style="fill:${i===3?'var(--rx-soft)':'none'};stroke:${peHl?'var(--bad)':'var(--muted)'};stroke-width:${peHl?2.6+1.2*Math.abs(beat):1.2};stroke-dasharray:${peHl?'none':'4 3'};opacity:${i===3?.6+.4*fl:.55}"/></g>`;
    /* heart */
    const H=heart(HX,HY,HS,{id:'dfh',hl:i===5?['lad']:[],labels:false});s+=H.svg;
    /* aorta highlight and the dissection flap */
    if(i===1){const fu=ramp(u,.05,.9);s+=`<g transform="${HL}"><path d="M90 66C86 40 88 22 104 15C122 8 144 12 152 28L154 44L157 256" pathLength="100" style="fill:none;stroke:var(--bad);stroke-width:6;stroke-linecap:round;opacity:.55;stroke-dasharray:${f1(fu*100)} 100"/><path d="M90 66C86 40 88 22 104 15C122 8 144 12 152 28L154 44L157 256" pathLength="100" style="fill:none;stroke:var(--panel);stroke-width:1.8;stroke-dasharray:${f1(fu*100)} 100"/></g>`;
      s+=`<text x="232" y="112" class="t-xs" style="fill:var(--bad);font-weight:700;${halo}">tear spreads</text><text x="232" y="125" class="t-xs" style="fill:var(--bad);font-weight:700;${halo}">along the aorta</text>`}
    /* PE: a clot travels from the legs, through the right heart, into a lung artery */
    if(i===2){const c=ramp(u,0,.6);let px,py;
      if(c<.4){const k=c/.4;px=150;py=lerp(352,268,k)}else if(c<.6){const k=(c-.4)/.2;px=lerp(150,193.6,k);py=lerp(268,162.8,k)}else{const k=(c-.6)/.4;px=lerp(193.6,92,k);py=lerp(162.8,204,k)-Math.sin(Math.PI*k)*30}
      if(c<.4)s+=`<line x1="150" y1="356" x2="150" y2="268" style="stroke:var(--accent);stroke-width:6;opacity:.4;stroke-linecap:round"/>`;
      s+=`<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="6" ry="4" style="fill:var(--clot);stroke:var(--cell);stroke-width:1"/>`;
      s+=`<text x="26" y="306" class="t-xs" style="fill:var(--dx);font-weight:700;${halo}">clot travels to a lung</text>`;
      if(u>.6)s+=`<text x="16" y="186" class="t-xs" style="fill:var(--dx);font-weight:700;${halo}">lodges</text>`}
    if(i===3)s+=`<text x="236" y="296" class="t-xs" style="fill:var(--bad);font-weight:700;${halo}">inflamed sac,</text><text x="236" y="309" class="t-xs" style="fill:var(--bad);font-weight:700;${halo}">fluid around</text><text x="236" y="322" class="t-xs" style="fill:var(--bad);font-weight:700;${halo}">the heart</text>`;
    /* takotsubo: apex akinetic on the heart, and an LV inset */
    if(i===4){const ap=H.at.apex;s+=`<ellipse cx="${f1(ap[0]-8)}" cy="${f1(ap[1]-18)}" rx="${f1(20+3*Math.abs(beat))}" ry="16" style="fill:var(--isch-fill);opacity:.8"/>`;
      s+=tkInset(10,250,u,t)}
    /* SCAD inset */
    if(i===5)s+=scadInset(10,250,u,t);
    if(i===6){s+=`<text x="${f1(HX)}" y="${f1(HY+4)}" class="t-mid" style="font:800 30px var(--display);fill:var(--panel);${halo.replace('var(--panel)','var(--ink)')}">?</text><text x="206" y="300" class="t-xs" style="fill:var(--dx);font-weight:700;${halo}">arteries open:</text><text x="206" y="313" class="t-xs" style="fill:var(--dx);font-weight:700;${halo}">no blockage seen</text>`}
    if(i===0){const L=[['aorta',232,120],['lungs',22,110],['heart sac',250,250],['coronary arteries',150,330]];L.forEach(l=>s+=`<text x="${l[1]}" y="${l[2]}" class="t-xs" style="fill:var(--ink);font-weight:700;${halo}">${l[0]}</text>`)}
    return s}
  function tkInset(x,y,u,t){const c=.8+.2*Math.sin(t*120),w=150,h=96;let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:var(--panel);stroke:var(--line)"/>`;
    const lv=(cx,cy,tk)=>{const k=c*ramp(u,.1,.5),D=[],P=[];
      for(let j=0;j<=28;j++){const a=j/28*Math.PI*2,xx=Math.cos(a),yy=Math.sin(a),dn=clamp((yy+1)/2),hx=22*xx*(1-.35*Math.pow(dn,2)),hy=yy<0?yy*16:yy*30;D.push([cx+hx,cy+hy]);
        const sx=tk?(dn<.5?.5:lerp(.5,1.15,Math.min(1,(dn-.5)*3))):.66,sy=tk?(yy<0?.75:1.02):.78;P.push([cx+hx*lerp(1,sx,k),cy+hy*lerp(1,sy,k)])}
      return `<path d="${smoothPath(D)}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/><path d="${smoothPath(P)}" style="fill:var(--blood-soft);stroke:${tk?'var(--isch)':'var(--muscle)'};stroke-width:2.4"/>`};
    s+=lv(x+40,y+38,false)+lv(x+108,y+38,true);
    s+=`<text x="${x+40}" y="${y+h-6}" class="t-xs t-mid">normal</text><text x="${x+108}" y="${y+h-6}" class="t-xs t-mid" style="fill:var(--isch);font-weight:700">takotsubo</text><text x="${x+w/2}" y="${y+12}" class="t-xs t-mid">left ventricle squeezing</text>`;
    return s}
  function scadInset(x,y,u,t){const w=150,h=96;let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:var(--panel);stroke:var(--line)"/>`;
    const A=artery(x+8,y+18,w-16,58,{plaque:0,ph:t*3,flow:1,down:1-.5*ramp(u,.2,.9),seed:5});s+=A.svg;
    const g=ramp(u,.1,.85),top=A.at.top,bot=A.at.bot,lh=bot-top,cx=x+w/2,L=44;
    s+=`<path d="M${f1(cx-L)} ${f1(top)}C${f1(cx-L*.5)} ${f1(top)} ${f1(cx-L*.4)} ${f1(top+lh*.6*g)} ${f1(cx)} ${f1(top+lh*.62*g)}C${f1(cx+L*.4)} ${f1(top+lh*.6*g)} ${f1(cx+L*.5)} ${f1(top)} ${f1(cx+L)} ${f1(top)}Z" style="fill:var(--clot);opacity:.9"/>`;
    s+=`<path d="M${f1(cx-L*.8)} ${f1(top+1)}Q${f1(cx)} ${f1(top+lh*.68*g+2)} ${f1(cx+L*.8)} ${f1(top+1)}" style="fill:none;stroke:var(--cap);stroke-width:1.2"/>`;
    s+=`<text x="${x+w/2}" y="${y+12}" class="t-xs t-mid">bleed inside the artery wall</text><text x="${x+w/2}" y="${y+h-6}" class="t-xs t-mid">no plaque</text>`;return s}
  /* the right-hand panel */
  function panel(P,i,u,N){const x=P.x+16,w=P.w-32;let s=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const head=(a,b)=>{s+=`<text x="${x}" y="${P.y+28}" class="t-big">${a}</text><text x="${x}" y="${P.y+46}" class="t-xs">${b}</text>`};
    const bar=(y,lab,v,max,col,txt)=>{const fw=w*v/max*ease(u);return `<text x="${x}" y="${y-5}" class="t-sm" style="fill:var(--ink)">${lab}</text><text x="${x+w}" y="${y-5}" class="t-sm t-end" style="fill:${col};font-weight:700">${txt}</text><rect x="${x}" y="${y}" width="${w}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${x}" y="${y}" width="${f1(fw)}" height="10" rx="5" style="fill:${col}"/>`};
    const keyt=(y,txt)=>{const L=wrap(txt,N?44:46);s+=`<rect x="${x}" y="${y}" width="${w}" height="${24+L.length*14}" rx="8" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${x+10}" y="${y+15}" class="t-xs" style="fill:var(--dx);font-weight:700">KEY TEST</text>`;L.forEach((l,j)=>s+=`<text x="${x+10}" y="${y+30+j*14}" class="t-xs" style="fill:var(--ink)">${l}</text>`);return y+24+L.length*14};
    if(i===0){head('Chest pain in the emergency department','10,689 US patients · Pope 2000');
      const segs=[[17,'var(--bad)','acute cardiac ischaemia'],[21,'var(--warn)','other cardiac'],[55,'var(--dx)','noncardiac']];let cx=x,y=P.y+72;
      segs.forEach(g=>{const ww=w*g[0]/100*ease(u);s+=`<rect x="${f1(cx)}" y="${y}" width="${f1(ww)}" height="26" style="fill:${g[1]};opacity:.85"/>`;cx+=w*g[0]/100});
      s+=`<rect x="${x}" y="${y}" width="${w}" height="26" rx="4" style="fill:none;stroke:var(--line)"/>`;
      segs.forEach((g,j)=>{const yy=y+50+j*22;s+=`<rect x="${x}" y="${yy-10}" width="12" height="12" rx="2" style="fill:${g[1]}"/><text x="${x+20}" y="${yy}" class="t-sm" style="fill:var(--ink)">${g[0]}% ${g[2]}</text>`});
      let yy=y+132;['Life-threatening alternatives to step through:','aortic dissection · pulmonary embolism ·','pericarditis · takotsubo · SCAD · MINOCA'].forEach((l,j)=>s+=`<text x="${x}" y="${yy+j*17}" class="${j?'t-sm':'t-lbl'}" style="${j?'fill:var(--ink)':''}">${l}</text>`);
      yy+=70;s+=bar(yy,'acute coronary syndrome in a JAMA review',10,100,'var(--bad)','≈10%')}
    else if(i===1){head('Aortic dissection','IRAD · 464 patients');let y=P.y+76;
      ['sudden severe sharp pain: the commonest complaint'].forEach(l=>{wrap(l,N?46:50).forEach(q=>{s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${q}</text>`;y+=15})});y+=16;
      s+=bar(y,'aortic regurgitation present',31.6,100,'var(--muted)','31.6%');y+=32;s+=bar(y,'pulse deficit present',15.1,100,'var(--muted)','15.1%');y+=32;s+=bar(y,'normal ECG',31.3,100,'var(--warn)','31.3%');y+=32;s+=bar(y,'died in hospital',27.4,100,'var(--bad)','27.4%');y+=20;
      keyt(y,'ADD-RS ≤1 with D-dimer below 500 ng/mL: failure rate 0.3% (ADvISED)')}
    else if(i===2){head('Pulmonary embolism','Wells score items · points as published');const W=[['signs of DVT',3],['no likelier alternative',3],['heart rate over 100',1.5],['immobilised or surgery, 4 wk',1.5],['previous DVT or PE',1.5],['coughing blood',1],['cancer',1]];
      let y=P.y+70;const bw=w-60;W.forEach((q,j)=>{const op=clamp(u*7-j);s+=`<g style="opacity:${f1(.25+.75*op)}"><text x="${x}" y="${y+9}" class="t-sm" style="fill:var(--ink)">${q[0]}</text><rect x="${x+w-54}" y="${y}" width="${f1(54*q[1]/3)}" height="11" rx="3" style="fill:var(--dx)"/><text x="${x+w-58}" y="${y+10}" class="t-sm t-end" style="fill:var(--dx);font-weight:700">${q[1].toFixed(1)}</text></g>`;y+=N?22:21});void bw;
      y+=8;keyt(y,'Wells ≤4.0 plus negative D-dimer: PE in 1.7% on validation, in 46% of patients')}
    else if(i===3){head('Pericarditis & myocarditis','JAMA review · Imazio 2015');let y=P.y+74;
      s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">Diagnosed from:</text>`;y+=8;
      ['chest pain','pericardial rub','ECG changes','effusion'].forEach((c,j)=>{const cw2=(w-8)/2,cx=x+(j%2)*(cw2+8),cy=y+Math.floor(j/2)*30,op=clamp(u*5-j);s+=`<g style="opacity:${f1(.2+.8*op)}"><rect x="${f1(cx)}" y="${cy}" width="${f1(cw2)}" height="24" rx="12" style="fill:var(--rx-soft);stroke:var(--rx)"/><text x="${f1(cx+cw2/2)}" y="${cy+16}" class="t-sm t-mid" style="fill:var(--rx);font-weight:700">${c}</text></g>`});
      y+=30;
      y+=52;s+=bar(y,'idiopathic or presumed viral',85,100,'var(--rx)','80–90%');y+=32;s+=bar(y,'recurrence without prevention',30,100,'var(--warn)','≈30%');y+=32;s+=bar(y,'tuberculosis (developed countries)',5,100,'var(--muted)','<5%');y+=20;
      keyt(y,'ECG and echocardiography for effusion; in myocarditis troponin rises without MI')}
    else if(i===4){head('Takotsubo syndrome','InterTAK registry · 1750 patients');let y=P.y+76;
      s+=bar(y,'women',89.8,100,'var(--isch)','89.8%');y+=32;s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:700">Triggers</text>`;y+=24;
      s+=bar(y,'physical',36.0,100,'var(--dx)','36.0%');y+=30;s+=bar(y,'emotional',27.7,100,'var(--dx)','27.7%');y+=30;s+=bar(y,'none evident',28.5,100,'var(--muted)','28.5%');y+=20;
      keyt(y,'Imaging the ventricle: dysfunction beyond one artery’s territory; apical akinesis in 82%')}
    else if(i===5){head('SCAD','Canadian cohort · 750 patients');let y=P.y+76;
      s+=bar(y,'women',88.5,100,'var(--brand)','88.5%');y+=30;s+=bar(y,'emotional stress reported',50.3,100,'var(--dx)','50.3%');y+=30;s+=bar(y,'no cardiac risk factors',33.9,100,'var(--warn)','33.9%');y+=30;s+=bar(y,'fibromuscular dysplasia',31.1,100,'var(--dx)','31.1%');y+=30;
      s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">mean age 51.8 · treated without a procedure: 84.3%</text>`;y+=12;
      keyt(y,'Behaves like any MI on ECG and troponin; the artery wall is the clue, not a plaque')}
    else{head('MINOCA','systematic review · Pasupathy 2015');let y=P.y+70;
      const r=N?40:42,cx=x+r+4,cy=y+r+6;let a0=-Math.PI/2;
      [[24,'var(--muscle-dark)','typical infarct'],[33,'var(--isch-fill)','myocarditis'],[43,'var(--panel-2)','other findings or none']].forEach((g,j)=>{const a1=a0+Math.PI*2*g[0]/100*ease(u),lg=a1-a0>Math.PI?1:0;
        if(a1>a0+.001)s+=`<path d="M${f1(cx)} ${f1(cy)}L${f1(cx+r*Math.cos(a0))} ${f1(cy+r*Math.sin(a0))}A${r} ${r} 0 ${lg} 1 ${f1(cx+r*Math.cos(a1))} ${f1(cy+r*Math.sin(a1))}Z" style="fill:${g[1]};stroke:var(--field);stroke-width:1.5"/>`;a0=a0+Math.PI*2*g[0]/100;
        s+=`<rect x="${cx+r+16}" y="${y+14+j*24}" width="12" height="12" rx="2" style="fill:${g[1]};stroke:var(--line)"/><text x="${cx+r+34}" y="${y+24+j*24}" class="t-sm" style="fill:var(--ink)">${g[0]}% ${g[2]}</text>`});
      s+=`<text x="${cx+r+16}" y="${y+90}" class="t-xs">cardiac MRI findings</text>`;
      y=cy+r+28;s+=bar(y,'share of all MI',6,100,'var(--dx)','6%');y+=30;s+=bar(y,'12-month mortality, MINOCA',4.7,10,'var(--muted)','4.7%');y+=30;s+=bar(y,'12-month mortality, obstructive MI',6.7,10,'var(--bad)','6.7%');y+=20;
      keyt(y,'Cardiac MRI to find the cause; coronary spasm provoked in 27%')}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 710'),p=phaseOf(DF_STEPS,t),S=DF_STEPS[p],u=ramp(t,S.from,S.from+.06);
    const sc=N?{x:40,y:6,k:1}:{x:2,y:10,k:1},P=N?{x:10,y:370,w:380,h:330}:{x:332,y:12,w:378,h:356};
    let s=`<g transform="translate(${sc.x} ${sc.y}) scale(${N?1:1})">${scene(p,u,t)}</g>`;
    s+=panel(P,p,u,N);svg.innerHTML=s;setSt(p);
    $('#dfNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#dfPlay'),draw,28000,'Replay','differential');
  const setSt=stepWire($('#dfSteps'),DF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- which test helps? ---- */
  let cond='mi';
  $('#dfCond').innerHTML='<span class="kicker">Condition</span>'+DF_COND.map(c=>`<button class="btn" data-dfc="${c.id}" aria-pressed="${c.id===cond}">${c.n}</button>`).join('');
  function tests(){const M=DF_MX[cond];
    $('#dfTests').innerHTML=DF_TESTS.map(te=>{const c=M[te.id]||['na',''],st=DF_ST[c[0]];
      return `<div class="df-test ${c[0]}"><span class="tag ${st[2]}">${st[0]} ${st[1]}</span><h4>${te.n}</h4><p>${c[1]||'This page’s sources give no figure for this test in this condition. That does not mean the test is unhelpful.'}</p></div>`}).join('');
    $$('#dfMx tbody tr').forEach(r=>r.classList.toggle('hl',r.dataset.dfr===cond))}
  $('#dfMx').innerHTML=`<thead><tr><th>Condition</th>${DF_TESTS.map(te=>`<th>${te.n}</th>`).join('')}</tr></thead><tbody>`+DF_COND.map(c=>`<tr data-dfr="${c.id}"><th>${c.n}</th>${DF_TESTS.map(te=>{const v=(DF_MX[c.id][te.id]||['na'])[0];return `<td><span class="df-sym" title="${DF_ST[v][1]}">${DF_ST[v][0]}</span><span class="sr">${DF_ST[v][1]}</span></td>`}).join('')}</tr>`).join('')+'</tbody>';
  const pick=id=>{cond=id;$$('[data-dfc]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.dfc===cond));tests()};
  $('#dfCond').addEventListener('click',e=>{const b=e.target.closest('[data-dfc]');if(b)pick(b.dataset.dfc)});
  $('#dfMx').addEventListener('click',e=>{const r=e.target.closest('[data-dfr]');if(r)pick(r.dataset.dfr)});
  tests();
};
