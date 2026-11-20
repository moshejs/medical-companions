/* =============== 5.3 Nursing care =============== */
/* Two players and a reveal set: one round of bedside checks around a person in bed (main player: eight stations,
   each with its own small animated monitor), a single-breath-count explorer that shows which published threshold a
   count crosses, and three common misunderstandings. Monitor drawings are schematic; numbers come from passes H and F. */

const NSG_TX={
  check:'CHECK',of:'of 8',schem:'schematic',stronger:'stronger',perCheck:'one dot per check',
  count:'count on one breath',vc:'VC, ml/kg',vc20:'20',vc15:'15',
  mouth:'mouth',wind:'windpipe',food:'food pipe',safe:'swallowed safely',silent:'into the windpipe, no cough',
  ecg:'ECG',suction:'suction',pause:'pause',bp:'systolic BP over one day',range:'daily range above 85 mmHg',
  bladder:'bladder filling',retention:'retention?',bowel:'bowel',moving:'contents moving',ileus:'ileus: gut stops',
  heel:'heel: pressure area',calf:'calf vein: clot (DVT)',turn:'change position',
  say:'I am going to turn you now.',hear:'can hear and see',dream:'vivid dreams, hallucinations',pain:'pain',
  stages:['ICU','ward','rehab','home'],watch:'still watched: rhythm, BP, mucus plugs',
  sbcSay:'on one breath',sbcNow:'reached',sbcAxis:'single breath count',
  sbcSrc:{k:'Kalita 2020 · 94 people · early evidence',g:'ten-steps guideline',e:'EAN/PNS guideline'}
};

/* the eight stations: (a,b) is the anchor on the body in bodyFront's local units; side l or r */
const NSG_STEPS=[
 {from:0,at:.05,k:'Check 1 · strength',t:'Strength and disability',sub:'is weakness still spreading?',a:[30,26],side:'r',dy:0,
  facts:[{l:'Need ventilation in first week of admission',v:22,s:'up to 22%'},{l:'Also checked: swallow, cough, ECG, BP, bladder, bowel'}],
  txt:'Monitoring in the ten-steps guideline covers muscle strength and disability, swallowing and coughing, ECG, heart rate, blood pressure, and bowel and bladder function; how often depends on how fast the person is worsening, autonomic involvement, the phase of the illness and the setting [[Leonhard2019]]. Up to 22% of people with GBS need ventilation within the first week of admission [[Leonhard2019]].',
  pt:'Nurses check strength, breathing, swallowing, heart, blood pressure, bladder and bowels again and again, because GBS can change fast [[Leonhard2019]].',
  hook:'How often to check depends on the rate of deterioration, autonomic involvement, the disease phase and the setting [[Leonhard2019]].'},
 {from:.125,at:.17,k:'Check 2 · breathing',t:'Breathing',sub:'measured, because breathlessness can come late',a:[6,-14],side:'r',dy:0,
  facts:[{l:'20/30/40: VC < 20 ml/kg, MIP < 30, MEP < 40 cmH2O'},{l:'Imminent: VC below 15 to 20 ml/kg or below 1 l'},{l:'Imminent: cannot count to 15 on one breath'}],
  txt:'Not all people heading for respiratory insufficiency feel breathless, so respiratory function is measured routinely [[Leonhard2019]]. Signs of imminent insufficiency: breathlessness at rest or while talking, inability to count to 15 in one breath, accessory muscle use, a rising breathing or heart rate, vital capacity below 15 to 20 ml/kg or below 1 l, or abnormal blood gases or oximetry [[Leonhard2019]]. The 20/30/40 rule flags risk at VC below 20 ml/kg, MIP below 30 cmH2O, MEP below 40 cmH2O, or a fall of more than 30% in any of these [[Lawn2001]].',
  pt:'Nurses check breathing often, sometimes by asking you to count out loud on one breath. Getting breathless when talking is a warning sign [[Leonhard2019]].',
  hook:'Inability to count to 15 in one breath signals imminent respiratory insufficiency [[Leonhard2019]]. 20/30/40: VC, MIP, MEP [[Lawn2001]].'},
 {from:.25,at:.29,k:'Check 3 · swallow and cough',t:'Swallow and cough',sub:'food or drink can go the wrong way silently',a:[0,-34],side:'l',dy:0,
  facts:[{l:'Swallowing impaired early after ICU admission',v:80,s:'over 80%'},{l:'Needed a tracheostomy (88 people)',v:39.7,s:'39.7%'},{l:'Of those, decannulated right after weaning',v:40,s:'40%'}],
  txt:'Bulbar and facial palsy bring choking, nutrition problems and hospital-acquired pneumonia [[Leonhard2019]]. Swallowing was impaired in over 80% early after ICU admission, and only about half of those with piecemeal swallowing had clinically apparent problems [[Ogna2017]]. In 88 people, 39.7% needed a tracheostomy; 40% of them were decannulated right after weaning, and dysphagia, especially lost sensation in the larynx and pharynx, was the main reason for staying cannulated [[Schroder2019]].',
  pt:'Weak throat muscles can let food or drink go the wrong way without a cough, so swallowing is checked carefully [[Ogna2017]].',
  hook:'Respiratory muscle weakness drives intubation; neurogenic dysphagia drives prolonged cannulation [[Schroder2019]].'},
 {from:.375,at:.42,k:'Check 4 · heart and blood pressure',t:'Heart and blood pressure',sub:'autonomic nerves can swing both',a:[-8,-8],side:'l',dy:6,
  facts:[{l:'Serious arrhythmia, ventilated (11 of 33)',v:33.3,s:'11 of 33'},{l:'Warning sign: daily systolic range above 85 mmHg'}],
  txt:'In 100 people, 11 of 33 who were ventilated had serious arrhythmias, often preceded by wide pulse or blood pressure swings and transient asystole after tracheal suction [[Winer1988]]. Every bradycardia episode but one was preceded by a daily systolic range above 85 mmHg [[Pfeiffer1999]]. Minor stimulation such as suction, mouth care or bathing can provoke severe bradycardia, and some teams keep atropine ready (an expert review, quoted as published, not an instruction) [[Weiss2025]].',
  pt:'GBS can affect the nerves that control heart rate and blood pressure, so these are watched closely, even during simple care like suction [[Leonhard2019,Winer1988]].',
  hook:'Suctioning can trigger asystole in severe dysautonomia [[Winer1988,Weiss2025]]. A daily systolic range above 85 mmHg preceded bradycardia [[Pfeiffer1999]].'},
 {from:.5,at:.54,k:'Check 5 · bladder and bowel',t:'Bladder and bowel',sub:'retention and a gut that stops moving',a:[0,18],side:'l',dy:6,
  facts:[{l:'Urinary dysfunction (65 people)',v:27.7,s:'27.7%'},{l:'Urinary retention',v:9.2,s:'9.2%'},{l:'Adynamic ileus, severe GBS (17 of 114)',v:15,s:'15%'}],
  txt:'Urinary dysfunction occurred in 27.7% of 65 consecutive people, including retention in 9.2%; it was commoner in AIDP (39%) than AMAN (19%) [[Sakakibara2009]]. Adynamic ileus occurred in 15% of 114 people with severe GBS; it coincided with cardiovascular dysautonomia in only 5, while ventilation, immobility, earlier abdominal surgery or rising opioid doses were implicated in others, and medical management worked in all [[Burns2001]]. The guideline lists urinary retention as a complication to watch for in everyone, and constipation with immobility [[Leonhard2019]].',
  pt:'GBS can make it hard to pass urine or open the bowels, so both are checked [[Leonhard2019]].',
  hook:'Bladder or bowel dysfunction at onset, or persisting through the course, is a red flag for another diagnosis [[Leonhard2019]]; urinary retention is a complication to watch for in everyone [[Leonhard2019]].'},
 {from:.625,at:.67,k:'Check 6 · skin, position and clots',t:'Skin, position and clots',sub:'the hazards of lying still',a:[-10,70],side:'l',dy:0,
  facts:[{l:'Clots found clinically, UK (73 people)',v:7,s:'7%'},{l:'DVT on ultrasound screening, ICU (65)',v:52,s:'52%'},{l:'DVT in US Medicare claims (16,280)',v:9,s:'9%'}],
  txt:'Immobility brings pressure ulcers and compression neuropathy, and prolonged severe weakness brings contractures and ossification; the standard prevention used for any bed-bound person is recommended [[Leonhard2019]]. A 2005 consensus group recommended heparin and graduated pressure stockings for bed-bound adults in the acute phase, from observational data and expert opinion, not trials [[Hughes2005]]. Clot rates depend on how they are looked for: 7% clinically [[Gaber2002]], 52% with ultrasound screening in an ICU despite heparin [[Ryabinkina2016]], and 9% in US claims, calculated as 100 minus the 91% who avoided DVT [[Wright2026]].',
  pt:'Lying still for a long time can harm the skin and cause blood clots in the legs, so position, skin and legs are checked [[Leonhard2019]].',
  hook:'VTE rates vary with the method: 7% clinical, 52% duplex-screened, 9% claims [[Gaber2002,Ryabinkina2016,Wright2026]].'},
 {from:.75,at:.79,k:'Check 7 · pain, mind and words',t:'Pain, mind and words',sub:'paralysed is not the same as unaware',a:[0,-44],side:'r',dy:-6,
  facts:[{l:'Pain in the acute phase (156 people)',v:66,s:'66%'},{l:'Mental status changes (16% of ICU controls)',v:31,s:'31%'},{l:'Anxiety, severe ICU group (49 people)',v:82,s:'82%'}],
  txt:'People with GBS, even with complete paralysis, usually have intact consciousness, vision and hearing, so what is said at the bedside matters, and procedures should be explained [[Leonhard2019]]. Pain was present in the acute phase in 66% [[Ruts2010Pain]]. Mental status changes occurred in 31% against 16% of ICU controls, often starting as the eyes closed, a median 9 days after onset, and lasting a median 8 days [[Cochen2005]]. Anxiety (82%) and depressive episodes (67%) were common in a severe neuro-ICU group [[Weiss2002]].',
  pt:'Even someone who cannot move or speak can usually hear and understand everything. Talk to them, and explain what you are doing [[Leonhard2019]].',
  hook:'A paralysed person with GBS is usually fully conscious and can hear: speak accordingly at the bedside [[Leonhard2019]].'},
 {from:.875,at:.92,k:'Check 8 · after intensive care',t:'After intensive care',sub:'the risk does not end at the worst point',a:[9,94],side:'r',dy:-4,
  facts:[{l:'Deaths that occur in the recovery phase',v:66.7,s:'up to two-thirds'},{l:'Readmitted within 90 days (2,587 adults)',v:14.1,s:'14.1%'},{l:'Of readmissions, within 15 days',v:46.7,s:'46.7%'}],
  txt:'Up to two-thirds of deaths occur in the recovery phase, mostly from cardiovascular and respiratory dysfunction, so arrhythmias, blood pressure shifts and mucus-plug distress are watched for, especially soon after ICU discharge [[Leonhard2019]]. Among 2,587 US adults, 14.1% were readmitted within 90 days, 46.7% of those within 15 days, and discharge to a facility rather than home raised the odds (OR 1.70) [[Voth2026]].',
  pt:'The dangerous time does not always end with the worst weakness, so checks continue during recovery [[Leonhard2019]].',
  hook:'Up to two-thirds of GBS deaths happen in the recovery phase, often after ICU discharge [[Leonhard2019]].'}
];

/* single breath count thresholds, as published; dir: le, lt, ge, or null for a marker without a direction */
const NSG_SBC=[
 {n:5,dir:'le',l:'5 or less: ventilation predicted (sens 90.6%, spec 95.2%)',ln:'5: ventilation predicted, sens 90.6%, spec 95.2%',s:'k'},
 {n:7,dir:'ge',l:'7 or more: blood gases stayed acceptable in all',ln:'7 or more: blood gases stayed acceptable',s:'k'},
 {n:13,dir:null,l:'13: admission cut-off, NPV 88.5% for ruling out ventilation',ln:'13: admission cut-off, NPV 88.5%',s:'k'},
 {n:15,dir:'lt',l:'Under 15: a sign of imminent respiratory insufficiency',ln:'Under 15: imminent insufficiency',s:'g'},
 {n:19,dir:'le',l:'19 or less: predicts the need for ventilation',ln:'19 or less: predicts ventilation',s:'g'},
 {n:20,dir:'lt',l:'Under 20: a useful bedside tool for ICU transfer',ln:'Under 20: a tool for ICU transfer',s:'e'}
];
const NSG_SBCT=[4,10,14,18,25];
const NSG_SBCCAP={
  4:'<b>Breath runs out at 4.</b> Every published line is crossed: below Kalita\'s 5 and 7 [[Kalita2020SBC]], below the guideline\'s 15 and 19 [[Leonhard2019]] and below EAN/PNS\'s 20 [[vanDoorn2023]].',
  10:'<b>Breath runs out at 10.</b> Above Kalita\'s blood-gas point of 7 [[Kalita2020SBC]], but under 15, which the ten-steps guideline lists as a sign of imminent insufficiency [[Leonhard2019]].',
  14:'<b>Breath runs out at 14.</b> Just under 15, the ten-steps sign of imminent insufficiency, and under 19, which predicts ventilation [[Leonhard2019]].',
  18:'<b>Breath runs out at 18.</b> Past 15, but still 19 or less, which the ten-steps guideline says predicts the need for ventilation [[Leonhard2019]], and under the EAN/PNS line of 20 for ICU transfer [[vanDoorn2023]].',
  25:'<b>Breath lasts to 25.</b> Past every published line. One count is one moment: the studies used serial counts, and thresholds from different studies are not interchangeable [[Kalita2020SBC,Leonhard2019]].'
};

inits.nursing=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  const W=Math.PI*2;
  function bar(x,y,w,f,lbl,val,col='var(--care)'){
    if(f==null)return `<circle cx="${f1(x+3)}" cy="${f1(y-3.5)}" r="3" style="fill:var(--care)"/>`+tx(x+11,y,lbl,'t-xs',INK);
    return tx(x,y,lbl,'t-xs',INK)+tx(x+w,y,val,'t-xs t-end',INK)+`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w)}" height="9" rx="4.5" style="fill:var(--panel)"/>`+(f>0?`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(Math.max(4,w*clamp(f)))}" height="9" rx="4.5" style="fill:${col}"/>`:'')}

  /* ---- the eight monitor drawings, each inside the box (x,y,w,h), animated by u in 0..1 ---- */
  const VIS=[
    /* 1 strength: dots per check (schematic) */
    (x,y,w,h,u)=>{const V=[.88,.74,.6,.5,.47,.49],n=Math.min(6,1+Math.floor(u*6.5)),X=i=>x+24+i*(w-48)/5,Y=v=>y+h-20-(h-40)*v;
      let s=`<line x1="${f1(x+10)}" x2="${f1(x+w)}" y1="${f1(y+h-14)}" y2="${f1(y+h-14)}" class="axis"/><line x1="${f1(x+10)}" x2="${f1(x+10)}" y1="${f1(y+6)}" y2="${f1(y+h-14)}" class="axis"/>`;
      s+=tx(x+16,y+12,NSG_TX.stronger+' ↑','t-xs')+tx(x+w,y+h-1,NSG_TX.perCheck+' ('+NSG_TX.schem+')','t-xs t-end');
      const P=V.slice(0,n).map((v,i)=>[X(i),Y(v)]);if(P.length>1)s+=`<path d="${ptsD(P)}" style="fill:none;stroke:var(--care);stroke-width:2.4"/>`;
      P.forEach((p,i)=>{s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${i===n-1?7:5}" style="fill:${i===n-1?'var(--accent)':'var(--care)'};stroke:var(--panel);stroke-width:2"/>`});
      return s},
    /* 2 breathing: lungs, a count, a falling VC bar */
    (x,y,w,h,u)=>{const br=.5+.5*Math.sin(u*W*3),Lg=lungs(x+4,y+18,.92,{fill:br,weak:u*.6});let s=Lg.svg;
      const cnt=Math.floor(u*24)%13+1;s+=tx(x+150,y+40,NSG_TX.count,'t-xs')+tx(x+150,y+82,cnt,'t-big','font-size:36px;fill:var(--care)');
      const bx=x+w-46,by=y+8,bh=h-30,vc=lerp(45,22,ease(u)),Y=v=>by+bh-bh*v/60;
      s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="22" height="${f1(bh)}" rx="5" style="fill:var(--panel)"/><rect x="${f1(bx)}" y="${f1(Y(vc))}" width="22" height="${f1(by+bh-Y(vc))}" rx="5" style="fill:var(--care)"/>`;
      [ [20,NSG_TX.vc20],[15,NSG_TX.vc15] ].forEach(([v,l])=>{s+=`<line x1="${f1(bx-6)}" x2="${f1(bx+28)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:3 2"/>`+tx(bx-9,Y(v)+3,l,'t-xs t-end',INK)});
      s+=tx(bx+11,by+bh+14,NSG_TX.vc,'t-xs t-mid')+tx(x+150,y+h-6,NSG_TX.schem,'t-xs');
      return s},
    /* 3 swallow: a droplet goes down the food pipe, then silently into the windpipe */
    (x,y,w,h,u)=>{const mx=x+60,my=y+20,wx=x+56,fx=x+120,bot=y+h-22;let s='';
      s+=`<path d="M${f1(mx-34)} ${f1(my)}Q${f1(mx)} ${f1(my-14)} ${f1(mx+40)} ${f1(my+6)}" style="fill:none;stroke:var(--ink);stroke-width:2"/>`+tx(mx-34,my-8,NSG_TX.mouth,'t-xs');
      s+=`<path d="M${f1(wx-10)} ${f1(my+24)}V${f1(bot)}M${f1(wx+10)} ${f1(my+24)}V${f1(bot)}" style="stroke:var(--device);stroke-width:2"/>`;
      for(let r=my+32;r<bot;r+=12)s+=`<line x1="${f1(wx-10)}" x2="${f1(wx+10)}" y1="${f1(r)}" y2="${f1(r)}" style="stroke:var(--device);stroke-width:1;opacity:.6"/>`;
      s+=`<path d="M${f1(fx-9)} ${f1(my+24)}V${f1(bot)}M${f1(fx+9)} ${f1(my+24)}V${f1(bot)}" style="stroke:var(--gut);stroke-width:2.4"/>`;
      s+=`<path d="M${f1(mx+20)} ${f1(my+4)}Q${f1(x+90)} ${f1(my+8)} ${f1(fx)} ${f1(my+24)}M${f1(mx+12)} ${f1(my+4)}Q${f1(wx)} ${f1(my+10)} ${f1(wx)} ${f1(my+24)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/>`;
      s+=tx(wx,bot+14,NSG_TX.wind,'t-xs t-mid',INK)+tx(fx,bot+14,NSG_TX.food,'t-xs t-mid',INK);
      const two=u>=.5,q=two?ramp(u,.55,.95):ramp(u,.05,.45),tx0=two?wx:fx,dyY=lerp(my+10,bot-6,q),dxX=lerp(mx+16,tx0,Math.min(1,q*3));
      s+=`<path d="M${f1(dxX)} ${f1(dyY-7)}Q${f1(dxX+6)} ${f1(dyY+2)} ${f1(dxX)} ${f1(dyY+5)}Q${f1(dxX-6)} ${f1(dyY+2)} ${f1(dxX)} ${f1(dyY-7)}Z" style="fill:var(--ivig)"/>`;
      s+=kitLabel(x+150,y+60,two?NSG_TX.silent:NSG_TX.safe,{});
      if(two)s+=`<path d="M${f1(x+146)} ${f1(y+56)}L${f1(wx+14)} ${f1(dyY)}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:3 2"/>`;
      return s},
    /* 4 heart: a scrolling ECG with a pause after suction, and a swinging systolic trace */
    (x,y,w,h,u)=>{let s=tx(x,y+10,NSG_TX.ecg,'t-xs',INK);const ey=y+44,per=46,off=u*per*6,pauseX=x+w*.62;let d='';
      for(let px=0;px<=w-30;px+=2){const xx=x+30+px,ph=((px+off)%per)/per;let v=0;
        const inPause=Math.abs(xx-pauseX)<34&&u>.3;if(!inPause){if(ph>.4&&ph<.44)v=-6;else if(ph>=.44&&ph<.48)v=26;else if(ph>=.48&&ph<.52)v=-10;else if(ph>.7&&ph<.8)v=5*Math.sin((ph-.7)/.1*Math.PI)}
        d+=(px?'L':'M')+f1(xx)+' '+f1(ey-v)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:1.8;stroke-linejoin:round"/>`;
      if(u>.3)s+=kitLabel(pauseX,ey+24,NSG_TX.suction+' → '+NSG_TX.pause,{a:'m'});
      const by=y+86,bh=h-104;s+=tx(x,by-6,NSG_TX.bp,'t-xs',INK);
      const f=v=>.5+.42*Math.sin(v*W*1.6+.6)*Math.cos(v*W*.4);let dd='';const up=Math.max(.02,u);
      for(let i=0;i<=80;i++){const v=i/80*up;dd+=(i?'L':'M')+f1(x+30+(w-60)*v)+' '+f1(by+bh-bh*f(v))}
      s+=`<rect x="${f1(x+30)}" y="${f1(by)}" width="${f1(w-60)}" height="${f1(bh)}" style="fill:var(--panel)"/><path d="${dd}" style="fill:none;stroke:var(--blood);stroke-width:2"/>`;
      const hiY=by+bh*.06,loY=by+bh*.94,rx=x+w-22;s+=`<g style="opacity:${f1(ramp(u,.5,.7))}"><path d="M${f1(rx)} ${f1(hiY)}V${f1(loY)}M${f1(rx-5)} ${f1(hiY)}H${f1(rx+5)}M${f1(rx-5)} ${f1(loY)}H${f1(rx+5)}" style="stroke:var(--ink);stroke-width:1.6"/>`+tx(x+w,by-6,NSG_TX.range,'t-xs t-end',INK)+'</g>';
      return s},
    /* 5 bladder and bowel */
    (x,y,w,h,u)=>{const cx=x+70,cy=y+h/2,r=lerp(24,46,ease(ramp(u,0,.6)));let s='';
      s+=`<path d="${blob(cx,cy,r,5,{n:14,rough:.08})}" style="fill:var(--csf);stroke:var(--ink);stroke-width:1.4"/><path d="M${f1(cx-4)} ${f1(cy+r-2)}V${f1(cy+r+16)}M${f1(cx+4)} ${f1(cy+r-2)}V${f1(cy+r+16)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      s+=tx(cx,y+12,NSG_TX.bladder,'t-xs t-mid',INK)+(u>.5?kitLabel(cx,cy+4,NSG_TX.retention,{a:'m'}):'');
      const gx=x+170,gw=w-190,gy=y+40;const p=`M${f1(gx)} ${f1(gy)}H${f1(gx+gw)}Q${f1(gx+gw+14)} ${f1(gy+14)} ${f1(gx+gw)} ${f1(gy+28)}H${f1(gx)}Q${f1(gx-14)} ${f1(gy+42)} ${f1(gx)} ${f1(gy+56)}H${f1(gx+gw)}Q${f1(gx+gw+14)} ${f1(gy+70)} ${f1(gx+gw)} ${f1(gy+84)}H${f1(gx)}`;
      s+=`<path d="${p}" style="fill:none;stroke:var(--gut);stroke-width:12;stroke-linecap:round;opacity:.8"/>`;
      const mv=u<.5?u*2:1;for(let i=0;i<5;i++){const q=(i/5+mv*.6)%1,row=Math.floor(q*4),fr=(q*4)%1,xx=row%2?gx+gw-fr*gw:gx+fr*gw;s+=`<circle cx="${f1(xx)}" cy="${f1(gy+row*28)}" r="3.5" style="fill:var(--ink);opacity:.6"/>`}
      s+=tx(gx+gw/2,y+12,NSG_TX.bowel,'t-xs t-mid',INK)+kitLabel(gx+gw/2,gy+124,u<.5?NSG_TX.moving:NSG_TX.ileus,{a:'m'});
      return s},
    /* 6 skin and clots: a leg with a pressure heel and a growing clot, and a turning arrow */
    (x,y,w,h,u)=>{const lx=x+10,ly=y+70,lw=w*.66;let s='';
      const leg=`M${f1(lx)} ${f1(ly-22)}C${f1(lx+lw*.35)} ${f1(ly-26)} ${f1(lx+lw*.5)} ${f1(ly-20)} ${f1(lx+lw*.62)} ${f1(ly-24)}C${f1(lx+lw*.78)} ${f1(ly-28)} ${f1(lx+lw*.86)} ${f1(ly-16)} ${f1(lx+lw*.9)} ${f1(ly-14)}L${f1(lx+lw)} ${f1(ly-40)}L${f1(lx+lw+12)} ${f1(ly-36)}L${f1(lx+lw+8)} ${f1(ly+14)}C${f1(lx+lw*.9)} ${f1(ly+20)} ${f1(lx+lw*.7)} ${f1(ly+22)} ${f1(lx+lw*.55)} ${f1(ly+18)}C${f1(lx+lw*.4)} ${f1(ly+14)} ${f1(lx+lw*.2)} ${f1(ly+22)} ${f1(lx)} ${f1(ly+20)}Z`;
      s+=`<path d="${leg}" style="fill:var(--skin);stroke:var(--ink);stroke-width:1.4"/>`;
      s+=`<path d="M${f1(lx+6)} ${f1(ly)}C${f1(lx+lw*.4)} ${f1(ly+4)} ${f1(lx+lw*.7)} ${f1(ly-2)} ${f1(lx+lw*.92)} ${f1(ly)}" style="fill:none;stroke:var(--blood);stroke-width:3;opacity:.55"/>`;
      const cg=ramp(u,.25,.8);if(cg>0)s+=`<path d="${blob(lx+lw*.58,ly+1,4+cg*6,9,{n:10,rough:.3,sq:.6})}" style="fill:var(--blood)"/>`;
      const hx=lx+lw+4,hy=ly+12,pr=.4+.6*Math.abs(Math.sin(u*W));s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="9" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.6;opacity:${f1(pr)}"/>`;
      s+=tx(lx+lw*.3,ly+40,NSG_TX.calf,'t-xs t-mid',INK)+tx(hx,hy+26,NSG_TX.heel,'t-xs t-end',INK);
      const ax=x+w-34,ay=y+h-48,an=u*360*2;s+=`<g transform="rotate(${f1(an)} ${f1(ax)} ${f1(ay)})"><path d="M${f1(ax+18)} ${f1(ay)}A18 18 0 1 1 ${f1(ax)} ${f1(ay-18)}" style="fill:none;stroke:var(--care);stroke-width:3"/><path d="M${f1(ax)} ${f1(ay-25)}L${f1(ax+8)} ${f1(ay-18)}L${f1(ax)} ${f1(ay-11)}Z" style="fill:var(--care)"/></g>`+tx(ax,ay+36,NSG_TX.turn,'t-xs t-mid',INK);
      return s},
    /* 7 pain, mind and words */
    (x,y,w,h,u)=>{const hx=x+70,hy=y+h-60;let s='';
      s+=`<rect x="${f1(x+10)}" y="${f1(hy+18)}" width="120" height="16" rx="8" style="fill:var(--panel)"/>`;
      s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="24" style="fill:var(--skin);stroke:var(--ink);stroke-width:1.4"/>`;
      const shut=u>.5;s+=shut?`<path d="M${f1(hx-12)} ${f1(hy-4)}h8M${f1(hx+4)} ${f1(hy-4)}h8" style="stroke:var(--ink);stroke-width:1.8"/>`:`<circle cx="${f1(hx-8)}" cy="${f1(hy-4)}" r="2.2" style="fill:var(--ink)"/><circle cx="${f1(hx+8)}" cy="${f1(hy-4)}" r="2.2" style="fill:var(--ink)"/>`;
      s+=`<path d="M${f1(hx-6)} ${f1(hy+9)}h12" style="stroke:var(--ink);stroke-width:1.4"/>`;
      if(!shut){const a=ramp(u,.04,.14)*(1-ramp(u,.44,.5));s+=`<g style="opacity:${f1(a)}"><path d="M${f1(x+140)} ${f1(y+6)}h${f1(w-150)}a8 8 0 0 1 8 8v26a8 8 0 0 1 -8 8h${f1(-(w-184))}l-26 18l6 -18h-14a8 8 0 0 1 -8 -8v-26a8 8 0 0 1 8 -8z" style="fill:var(--care-soft);stroke:var(--care);stroke-width:1.4"/>`+tx(x+148,y+31,NSG_TX.say,'t-sm',INK)+'</g>';
        s+=kitLabel(hx+30,hy+46,NSG_TX.hear,{})}
      else{const a=ramp(u,.55,.68);s+=`<g style="opacity:${f1(a)}">`;[ [40,-46,14],[66,-62,18],[96,-74,22] ].forEach(([dx,dy,r],i)=>{s+=`<circle cx="${f1(hx+dx)}" cy="${f1(hy+dy)}" r="${r}" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.2"/>`});
        for(let i=0;i<3;i++){const sx=hx+86+i*10,sy=hy-78+Math.sin(u*W*2+i)*4;s+=`<path d="M${f1(sx)} ${f1(sy-5)}l1.6 3.4l3.6 .4l-2.7 2.4l.8 3.6l-3.3 -1.9l-3.3 1.9l.8 -3.6l-2.7 -2.4l3.6 -.4z" style="fill:var(--accent)"/>`}
        s+=kitLabel(hx+130,hy-50,NSG_TX.dream,{})+'</g>'}
      s+=`<path d="M${f1(hx+36)} ${f1(hy+18)}l4 -6l4 6l4 -6l4 6" style="fill:none;stroke:var(--damage);stroke-width:2;opacity:${f1(.5+.5*Math.sin(u*W*4))}"/>`+tx(hx+62,hy+18,NSG_TX.pain,'t-xs',INK);
      return s},
    /* 8 after ICU: a path from ICU to home with a watch band after discharge */
    (x,y,w,h,u)=>{const ty=y+70,X=v=>x+16+(w-32)*v;let s='';const st=NSG_TX.stages,cut=[0,.28,.62,.84,1];
      st.forEach((l,i)=>{s+=`<rect x="${f1(X(cut[i])+1)}" y="${f1(ty-12)}" width="${f1(X(cut[i+1])-X(cut[i])-2)}" height="24" rx="6" style="fill:${i===0?'var(--rx-soft)':i===3?'var(--rec-soft)':'var(--care-soft)'};stroke:var(--line)"/>`+tx((X(cut[i])+X(cut[i+1]))/2,ty+4,l,'t-xs t-mid',INK)});
      const bw=ramp(u,.2,.5);s+=`<rect x="${f1(X(.28))}" y="${f1(ty+20)}" width="${f1((X(.62)-X(.28))*bw)}" height="10" rx="5" style="fill:var(--warn);opacity:.55"/>`;
      if(bw>.6)s+=kitLabel(X(.28),ty+48,NSG_TX.watch,{});
      const px=X(clamp(u*1.05));s+=`<circle cx="${f1(px)}" cy="${f1(ty-26)}" r="7" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/><path d="M${f1(px)} ${f1(ty-19)}V${f1(ty-13)}" style="stroke:var(--accent);stroke-width:2"/>`;
      return s}
  ];

  /* ---------- main: the observation round ---------- */
  const svg=$('#nsgSvg'),rg=$('#nsgT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 440','400 880'),p=phaseOf(NSG_STEPS,t),P=NSG_STEPS[p],u=clamp((t-P.from)/((NSG_STEPS[p+1]?NSG_STEPS[p+1].from:1)-P.from));
    const L=N?{bx0:104,bx1:296,by0:58,by1:404,cx:200,cy:92,cs:290,lc:80,rc:320,mx:12,my:420,mw:376,mh:450,vx:28,vy:480,vw:344,vh:200,fy:712,fw:344,fr:44}
             :{bx0:50,bx1:230,by0:58,by1:428,cx:140,cy:94,cs:310,lc:26,rc:254,mx:286,my:58,mw:420,mh:370,vx:302,vy:112,vw:388,vh:190,fy:322,fw:388,fr:34};
    let s=tx(N?12:14,24,P.t,'t-big','font-size:19px;fill:var(--care)')+tx(N?12:14,41,P.sub,'t-sm');
    /* the bed, seen from above */
    s+=`<rect x="${L.bx0}" y="${L.by0}" width="${L.bx1-L.bx0}" height="${L.by1-L.by0}" rx="16" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.4"/><rect x="${L.bx0+30}" y="${L.by0+8}" width="${L.bx1-L.bx0-60}" height="22" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    const k=L.cs/146,B=bodyFront(L.cx,L.cy,L.cs,{level:.62,tingle:.6,pain:p===6?.5+.5*Math.sin(u*W*4):0,vent:false}),A=(a,b)=>[L.cx+a*k,L.cy+(b+50)*k];s+=B.svg;
    s+=`<rect x="${L.bx0+8}" y="${f1(A(0,40)[1])}" width="${L.bx1-L.bx0-16}" height="${f1(L.by1-8-A(0,40)[1])}" rx="12" style="fill:var(--care-soft);opacity:.55"/>`;
    /* station markers with leader lines */
    NSG_STEPS.forEach((S,i)=>{const an=A(S.a[0],S.a[1]),mx=S.side==='l'?L.lc:L.rc,my=an[1]+S.dy*k,on=i===p,done=i<p;
      s+=`<line x1="${f1(mx+(S.side==='l'?13:-13))}" y1="${f1(my)}" x2="${f1(an[0])}" y2="${f1(an[1])}" style="stroke:${on?'var(--care)':'var(--muted)'};stroke-width:${on?2:1};stroke-dasharray:${on?'none':'3 3'}"/><circle cx="${f1(an[0])}" cy="${f1(an[1])}" r="3" style="fill:${on?'var(--care)':'var(--muted)'}"/>`;
      if(on)s+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="${f1(15+4*Math.abs(Math.sin(u*W*2)))}" style="fill:none;stroke:var(--care);stroke-width:1.6;opacity:.5"/>`;
      s+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="13" style="fill:${on?'var(--care)':done?'var(--care-soft)':'var(--panel)'};stroke:var(--care);stroke-width:1.6"/>`+tx(mx,my+4.5,i+1,'t-lbl t-mid',on?'fill:var(--on-brand)':'fill:var(--care)')});
    /* the monitor */
    s+=`<rect x="${L.mx}" y="${L.my}" width="${L.mw}" height="${L.mh}" rx="14" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.2"/>`;
    s+=tx(L.vx,L.my+22,`${NSG_TX.check} ${p+1} ${NSG_TX.of}`,'t-xs','letter-spacing:.1em')+tx(L.vx,L.my+42,P.t,'t-lbl');
    s+=VIS[p](L.vx,L.vy,L.vw,L.vh,u);
    s+=`<line x1="${L.vx}" x2="${L.vx+L.fw}" y1="${L.fy-18}" y2="${L.fy-18}" class="axis"/>`;
    const g=ease(ramp(u,0,.35));P.facts.forEach((f,i)=>{s+=bar(L.vx,L.fy+i*L.fr,L.fw,f.v==null?null:g*f.v/100,f.l,f.s||'',i===0?'var(--care)':'var(--accent)')});
    svg.innerHTML=s;setSt(p);$('#nsgNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#nsgPlay'),draw,32000,'%t:player.replay%','nursing');
  setSt=stepWire($('#nsgSteps'),NSG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the single breath count ---------- */
  const bsv=$('#nsgSbSvg'),brg=$('#nsgSbT'),bcap=$('#nsgSbCap');let tgt=14;
  const applies=(c,T)=>T.dir==='le'?c<=T.n:T.dir==='lt'?c<T.n:T.dir==='ge'?c>=T.n:false;
  function drawSb(t){const N=vb(bsv,'720 330','400 600'),c=Math.min(tgt,Math.floor(tgt*t+1e-6)),run=t<1&&c<tgt;
    const L=N?{lx:14,ly:66,ls:.86,cx:262,cy:150,nx:22,nw:356,ny:226,ry:290,rh:52,two:true}:{lx:20,ly:70,ls:1.05,cx:100,cy:258,nx:232,nw:460,ny:60,ry:124,rh:34,two:true};
    let s='';const Lg=lungs(L.lx,L.ly,L.ls,{fill:1-.9*c/25});s+=Lg.svg;
    /* the count, said aloud */
    const said=[];for(let i=Math.max(1,c-3);i<=c;i++)said.push(i);
    const bx=N?L.lx+136:L.lx,by=N?L.ly:L.ly-46,bw=N?236:160;
    s+=`<rect x="${f1(bx)}" y="${f1(by-4)}" width="${bw}" height="28" rx="10" style="fill:var(--care-soft);stroke:var(--care)"/>`+tx(bx+10,by+14,(said.length?said.join(', '):'…')+(run?' …':''),'t-sm',INK);
    s+=tx(N?L.cx:L.cx,N?L.cy:L.cy,c,'t-big t-mid','font-size:40px;fill:var(--care)')+tx(N?L.cx:L.cx,(N?L.cy:L.cy)+18,NSG_TX.sbcSay,'t-xs t-mid');
    /* the number line */
    const X=v=>L.nx+L.nw*v/25;
    s+=`<rect x="${f1(L.nx)}" y="${f1(L.ny-6)}" width="${f1(L.nw)}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(L.nx)}" y="${f1(L.ny-6)}" width="${f1(Math.max(0,X(c)-L.nx))}" height="12" rx="6" style="fill:var(--care)"/>`;
    for(let v=0;v<=25;v+=5)s+=tx(X(v),L.ny+22,v,'t-xs t-mid');
    NSG_SBC.forEach(T=>{s+=`<path d="M${f1(X(T.n))} ${f1(L.ny-8)}l-5 -9h10z" style="fill:var(--ink)"/>`+tx(X(T.n),L.ny-20,T.n,'t-xs t-mid',INK)});
    s+=tx(L.nx+L.nw,L.ny+36,NSG_TX.sbcAxis,'t-xs t-end');
    /* the rows */
    NSG_SBC.forEach((T,i)=>{const y=L.ry+i*L.rh,on=applies(c,T),nd=T.dir===null;
      s+=nd?`<path d="M${f1(L.nx+6)} ${f1(y-10)}l6 6l-6 6l-6 -6z" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`:`<circle cx="${f1(L.nx+6)}" cy="${f1(y-4)}" r="6" style="fill:${on?'var(--care)':'none'};stroke:var(--care);stroke-width:1.6"/>`;
      s+=tx(L.nx+20,y,N?T.ln:T.l,'t-sm',on?INK:'')+tx(L.two?L.nx+20:L.nx+L.nw,L.two?y+15:y,NSG_TX.sbcSrc[T.s],'t-xs'+(L.two?'':' t-end'))});
    bsv.innerHTML=s;
    $$('[data-sbt]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.sbt===tgt));bcap.innerHTML=NSG_SBCCAP[tgt];
    brg.setAttribute('aria-valuetext',String(c));
  }
  const bstop=playWire(brg,$('#nsgSbPlay'),drawSb,6000,'%t:player.replay%','nursing');
  $$('[data-sbt]').forEach(b=>b.addEventListener('click',()=>{bstop();tgt=+b.dataset.sbt;brg.value=1;drawSb(1)}));
  drawSb(+brg.value);

  /* ---------- misunderstandings: reveal ---------- */
  $$('[data-nsmy]').forEach(b=>b.addEventListener('click',()=>{const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);
    const a=$('#'+b.getAttribute('aria-controls'));a.hidden=!on}));
};
