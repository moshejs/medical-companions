/* =============== 3.3 Antiplatelets & anticoagulants =============== */
const AT_STEPS=[
 {from:0,at:.08,k:'Step 1 · The torn plaque',t:'Platelets switch on',
  txt:`When a plaque tears, platelets stick to it, are activated and clump, while the clotting cascade makes thrombin and fibrin. Two platelet signals matter most for the medicines: thromboxane A2, made by the enzyme COX-1, and ADP acting on the P2Y12 receptor. Both switch on the GP IIb/IIIa receptor, which lets fibrinogen bridge one platelet to the next. ESC 2023: “A combination of antiplatelet and anticoagulant therapy is indicated acutely for patients with ACS.” [[Byrne2023ESC,Vane2003,FDA-Plavix]]`,
  pt:`Platelets are tiny blood cells that clump together to plug a cut. On a torn plaque they plug the artery instead.`,
  hook:`Two platelet pathways, two tablets: thromboxane A2 (blocked by aspirin) and ADP at P2Y12 (blocked by clopidogrel, prasugrel, ticagrelor).`},
 {from:.16,at:.25,k:'Step 2 · Aspirin',t:'Aspirin shuts off thromboxane',
  txt:`Aspirin is “an irreversible inhibitor of platelet cyclooxygenase activity”: it acetylates serine 529 of platelet COX-1. Low-dose aspirin gives “long-lasting suppression of thromboxane (TX) A2 production”, which explains both its benefit against clots and its bleeding risk. For long-term use, 75–150 mg daily was “at least as effective as higher daily doses”. [[Undas2014,Patrono2015,ATT2002]]`,
  pt:`Aspirin makes platelets less sticky, and the effect lasts for the life of each platelet it touches.`,
  hook:`Aspirin irreversibly acetylates COX-1 (serine 529), blocking thromboxane A2 for the platelet's life.`},
 {from:.32,at:.40,k:'Step 3 · P2Y12 inhibitors',t:'P2Y12 blockers plug the ADP receptor',
  txt:`Clopidogrel is a prodrug whose active metabolite binds P2Y12 irreversibly; prasugrel's active metabolite does too. Ticagrelor binds reversibly and needs no activation; cangrelor is an intravenous, reversible P2Y12 inhibitor. GP IIb/IIIa inhibitors such as tirofiban block the final step, and ESC 2023 keeps them for bail-out “if there is evidence of no-reflow or a thrombotic complication during PCI.” [[FDA-Plavix,FDA-Effient,FDA-Brilinta,FDA-Kengreal,FDA-Aggrastat,Byrne2023ESC]]`,
  pt:`The second tablet blocks a different “on switch” on the platelet. Together, the two are called dual antiplatelet therapy (DAPT).`,
  hook:`Clopidogrel and prasugrel: irreversible thienopyridine prodrugs. Ticagrelor and cangrelor: reversible, no activation needed.`},
 {from:.48,at:.555,k:'Step 4 · Onset and offset',t:'How fast they start, how long they last',
  txt:`Clopidogrel: inhibition “can be seen 2 hours after single oral doses”; at 75 mg daily it reaches 40–60% between day 3 and 7, and function returns “generally in about 5 days” after stopping. Prasugrel: about 90% of patients had at least 50% inhibition by 1 hour; baseline returns over 5–9 days. Ticagrelor: peak inhibition at about 2 hours; by day 5 after the last dose it is similar to placebo. Cangrelor: inhibition “within 2 minutes”, and function “returns to normal within 1 hour” after the infusion stops. [[FDA-Plavix,FDA-Effient,FDA-Brilinta,FDA-Kengreal]]`,
  pt:`Some of these medicines work within minutes or an hour; others take longer. Some wear off as soon as they are stopped; others last until the body makes new platelets.`,
  hook:`Cangrelor: IV, onset 2 min, offset 1 h. At 2 h, >50% inhibition in 98% on ticagrelor vs 31% on clopidogrel 600 mg (ONSET/OFFSET). [[FDA-Kengreal,Gurbel2009ONSET]]`},
 {from:.62,at:.71,k:'Step 5 · The founding trials',t:'ISIS-2 and CURE',
  txt:`ISIS-2 (17,187 people with suspected MI): aspirin cut 5-week vascular death from 11.8% to 9.4%, an odds reduction of 23%, with no significant excess of cerebral or transfused bleeds. CURE (12,562 people with NSTE-ACS): adding clopidogrel to aspirin cut cardiovascular death, MI or stroke from 11.4% to 9.3% (RR 0.80), but major bleeding rose from 2.7% to 3.7%. [[ISIS2_1988,Yusuf2001CURE]]`,
  pt:`In a big 1988 trial, aspirin lowered the chance of dying in the next 5 weeks from about 12 in 100 to about 9 in 100 people. These are averages across a large group, not a promise for one person.`,
  hook:`ISIS-2: aspirin 9.4% vs 11.8%; with streptokinase too, 8.0% vs 13.2% (42% odds reduction): additive. CURE: 9.3% vs 11.4%, major bleeding 3.7% vs 2.7%.`},
 {from:.80,at:1,k:'Step 6 · Stronger P2Y12 blockers',t:'TRITON and PLATO: more protection, more bleeding',
  txt:`TRITON-TIMI 38: prasugrel beat clopidogrel (9.9% vs 12.1%) but raised major bleeding (2.4% vs 1.8%) and fatal bleeding (0.4% vs 0.1%). PLATO: ticagrelor beat clopidogrel (9.8% vs 11.7% at 12 months) and lowered all-cause death (4.5% vs 5.9%), with more non-CABG major bleeding (4.5% vs 3.8%). Head to head in ISAR-REACT 5 (open-label), prasugrel beat ticagrelor (6.9% vs 9.3%) with similar bleeding. [[Wiviott2007TRITON,Wallentin2009PLATO,Schupke2019ISAR5]]`,
  pt:`Prasugrel and ticagrelor act faster and stronger than clopidogrel, but they can cause more bleeding. Doctors weigh both for each person.`,
  hook:`Per 1000 treated: TRITON 22 fewer ischaemic events, 6 more major bleeds; PLATO 19 fewer, 7 more (from the published percentages).`}
];
/* trial bars: ischaemic outcome (drug a vs comparator b) and bleeding (ba vs bb) as published */
const AT_TRIALS=[
 {n:'ISIS-2 (1988)',d:'aspirin vs placebo, suspected MI',o:'5-week vascular death',al:'Aspirin',bl:'Placebo',a:9.4,b:11.8,ba:null,bb:null,bt:'no significant excess of cerebral or transfused bleeds',r:[.63,.70]},
 {n:'CURE (2001)',d:'clopidogrel vs placebo on aspirin, NSTE-ACS',o:'CV death, MI or stroke',al:'Clopidogrel',bl:'Placebo',a:9.3,b:11.4,ba:3.7,bb:2.7,bt:'major bleeding',r:[.70,.78]},
 {n:'TRITON-TIMI 38 (2007)',d:'prasugrel vs clopidogrel, ACS with PCI',o:'CV death, MI or stroke',al:'Prasugrel',bl:'Clopidogrel',a:9.9,b:12.1,ba:2.4,bb:1.8,bt:'TIMI major bleeding',r:[.80,.87]},
 {n:'PLATO (2009)',d:'ticagrelor vs clopidogrel, ACS',o:'vascular death, MI or stroke',al:'Ticagrelor',bl:'Clopidogrel',a:9.8,b:11.7,ba:4.5,bb:3.8,bt:'non-CABG major bleeding',r:[.86,.93]}
];
/* balance scenarios: each is one randomised trial; m0..m1 months; i = ischaemic end point, b = bleeding end point */
const AT_BAL={
 plato:{k:'PLATO · 18,624 people with ACS',a:'Ticagrelor + aspirin',b:'Clopidogrel + aspirin',m0:0,m1:12,end:'12',il:'Vascular death, MI or stroke',ia:9.8,ib:11.7,bl:'Non-CABG major bleeding',ba:4.5,bb:3.8,kb:8.3,
  t:'A stronger P2Y12 blocker for 12 months',txt:`At 12 months, vascular death, MI or stroke was 9.8% with ticagrelor vs 11.7% with clopidogrel (HR 0.84). Non-CABG major bleeding was 4.5% vs 3.8% (P=0.03). About half of the non-CABG major bleeds came in the first 30 days, which is why the bleeding lines rise steeply at first. [[Wallentin2009PLATO,FDA-Brilinta]]`,
  pt:`More protection from clots, a little more bleeding: on balance, fewer events with the stronger tablet in this trial.`,hook:`PLATO: 19 fewer ischaemic events and 7 more non-CABG major bleeds per 1000 over a year.`},
 twilight:{k:'TWILIGHT · 7119 high-risk PCI patients',a:'Ticagrelor alone',b:'Ticagrelor + aspirin',m0:3,m1:15,end:'15',il:'Death, MI or stroke',ia:3.9,ib:3.9,bl:'BARC 2, 3 or 5 bleeding',ba:4.0,bb:7.1,kb:1.2,
  t:'Drop aspirin after 3 months',txt:`After 3 months of ticagrelor plus aspirin, event-free patients were randomised to ticagrelor with placebo or with aspirin for a year. Bleeding (BARC 2, 3 or 5) was 4.0% vs 7.1% (HR 0.56), and death, MI or stroke was 3.9% in both arms. [[Mehran2019TWILIGHT]]`,
  pt:`Stopping aspirin but keeping ticagrelor nearly halved bleeding, with no rise in heart attacks or strokes in this trial.`,hook:`TWILIGHT: bleeding 4.0% vs 7.1%; death, MI or stroke 3.9% vs 3.9%.`},
 ultimate:{k:'ULTIMATE-DAPT · 3400 people with ACS',a:'Ticagrelor alone',b:'Ticagrelor + aspirin',m0:1,m1:12,end:'12',il:'MACCE',ia:3.6,ib:3.7,bl:'BARC 2, 3 or 5 bleeding',ba:2.1,bb:4.6,kb:1.2,
  t:'Drop aspirin after 1 month',txt:`People with ACS who were event-free after 1 month of DAPT took ticagrelor with placebo or with aspirin until month 12. Bleeding (BARC 2, 3 or 5) was 2.1% vs 4.6% (HR 0.45); major adverse cardiac and cerebrovascular events were 3.6% vs 3.7% (noninferior). [[Ge2024ULTIMATE]] ESC 2023 describes “DAPT duration further shortened to 1–3 months followed by P2Y12 receptor inhibitor monotherapy”. [[Byrne2023ESC]]`,
  pt:`Even one month of two tablets, then ticagrelor alone, halved bleeding without more heart events in this double-blind trial.`,hook:`Ticagrelor-based monotherapy after 1–3 months (TWILIGHT, TICO, ULTIMATE-DAPT) cut bleeding without more ischaemic events.`},
 stopdapt:{k:'STOPDAPT-2 ACS · 4136 people with ACS in Japan',a:'Clopidogrel alone after 1–2 months',b:'12 months of DAPT',m0:1,m1:12,end:'end',il:'Cardiovascular events',ia:2.8,ib:1.9,bl:'Bleeding',ba:.5,bb:1.2,kb:1.2,
  t:'A strategy that tipped the wrong way',txt:`Switching to clopidogrel alone after 1–2 months of DAPT was not noninferior for the net end point (3.2% vs 2.8%; HR 1.14). Cardiovascular events rose numerically (2.8% vs 1.9%; HR 1.50, 95% CI 0.99–2.26) while bleeding fell (0.5% vs 1.2%). [[Watanabe2022STOPDAPT2ACS]] The ticagrelor-based monotherapy trials have the stronger evidence, and most were in East Asian populations. [[Mehran2019TWILIGHT,Kim2020TICO,Ge2024ULTIMATE]]`,
  pt:`Shortening treatment is not automatically safer: here fewer bleeds came with more heart events.`,hook:`STOPDAPT-2 ACS: clopidogrel monotherapy after 1–2 months failed noninferiority in ACS.`},
 master:{k:'MASTER DAPT · high bleeding risk',a:'Stop DAPT at 1 month',b:'Continue DAPT',m0:1,m1:12,end:'end',il:'MACCE',ia:6.1,ib:5.9,bl:'Major or clinically relevant non-major bleeding',ba:6.5,bb:9.4,kb:1.2,
  t:'High bleeding risk: shorter is the rule',txt:`In people at high bleeding risk, stopping DAPT 1 month after a sirolimus-eluting stent was noninferior for net adverse clinical events (7.5% vs 7.7%) and MACCE (6.1% vs 5.9%), and cut major or clinically relevant bleeding (6.5% vs 9.4%). [[Valgimigli2021MASTER]] ESC 2023: “The presence of one major or two minor ARC-HBR risk factors indicates high bleeding risk (HBR)”, and in HBR “aspirin or P2Y12 receptor inhibitor monotherapy after 1 month of DAPT may be considered.” [[Byrne2023ESC]] ACC/AHA 2025 formally recommends P2Y12 monotherapy at one month in HBR as an alternative (per review). [[Restrepo2026]] In PRECISE-DAPT, longer DAPT increased bleeding with a score of 25 or more, without ischaemic benefit. [[Costa2017PRECISE]]`,
  pt:`For people who bleed easily, doctors often shorten the time on two tablets. Bleeding scores are teaching and planning tools, not something to work out at home.`,hook:`ARC-HBR: 1 major or 2 minor criteria = high bleeding risk. PRECISE-DAPT ≥25: longer DAPT adds bleeding, not protection.`}
};
inits.antithrombotic=()=>{
  const svg=$('#atSvg'),rg=$('#atT');
  const TX=(x,y,cls,txt,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const box=(x,y,w,h,lines,o={})=>{let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="8" style="fill:${o.fill||'var(--panel-2)'};stroke:${o.stroke||'var(--line)'};stroke-width:1.2;opacity:${o.op==null?1:f1(o.op)}"/>`;
    lines.forEach((l,i)=>{s+=`<text x="${f1(x+w/2)}" y="${f1(y+h/2+4+(i-(lines.length-1)/2)*13)}" class="t-mid" style="font:600 11px var(--body);fill:var(--ink);opacity:${o.op==null?1:f1(o.op)}">${l}</text>`});return s};
  const badge=(x,y,txt,op,w)=>{if(op<=.02)return '';const ww=w||txt.length*5.9+16;return `<g style="opacity:${f1(op)}"><rect x="${f1(x-ww/2)}" y="${f1(y)}" width="${f1(ww)}" height="18" rx="9" style="fill:var(--rx);"/><text x="${f1(x)}" y="${f1(y+12.5)}" class="t-mid" style="font:700 10.5px var(--body);fill:var(--on-brand)">${txt}</text></g>`};
  const blockMark=(x,y,op)=>op<=.02?'':`<path d="M${f1(x-8)} ${f1(y)}H${f1(x+8)}M${f1(x)} ${f1(y)}V${f1(y+9)}" style="stroke:var(--rx);stroke-width:3;stroke-linecap:round;opacity:${f1(op)}"/>`;
  /* ---- left: the torn plaque and one platelet, zoomed ---- */
  function mech(W,H,t,N){
    const act=ramp(t,.02,.12),asp=ramp(t,.18,.27),p2=ramp(t,.34,.43),tx=act*(1-asp*.92);
    const stick=act*(1-.32*asp-.45*p2),clot=.18+.62*stick;
    let s=TX(12,18,'t-sm','A TORN PLAQUE, ZOOMED');
    const ay=H-112,A=artery(8,ay,W-16,100,{plaque:.78,px:.5,cap:.15,rupture:.8,clot,ph:t*5,seed:11});
    s+=A.svg;
    /* platelets drifting in the lumen toward the plaque, switching on as they near it */
    const rr=rng(5);for(let i=0;i<6;i++){const u=(i/6+t*2.4+rr()*.05)%1,px=14+u*(W-28),py=A.at.top+10+rr()*(A.at.bot-A.at.top-30),near=1-clamp(Math.abs(px-A.at.cx)/(W*.32));
      if(Math.abs(px-A.at.cx)<34&&py>A.at.plaque[1]-26)continue;s+=platelet(px,py,11,{act:act*near*(1-.5*p2),ang:i*40})}
    const cx=W*.5,cy=N?122:128,ps=N?92:100;
    /* zoom guides from the clot to the big platelet */
    s+=`<path d="M${f1(A.at.cx-14)} ${f1(A.at.plaque[1]-6)}L${f1(cx-ps*.62)} ${f1(cy+ps*.42)}M${f1(A.at.cx+14)} ${f1(A.at.plaque[1]-6)}L${f1(cx+ps*.62)} ${f1(cy+ps*.42)}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;fill:none;opacity:.7"/>`;
    s+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(ps*.8)}" ry="${f1(ps*.58)}" style="fill:var(--panel);stroke:var(--line);stroke-width:1.2"/>`;
    s+=platelet(cx,cy,ps,{act,rec:true,block:p2,tx});
    /* labels: thromboxane on the left, P2Y12 receptors on top */
    s+=TX(cx-ps*.78-6,cy+4,'t-sm t-end',N?'TXA2':'thromboxane A2',`fill:var(--warn);opacity:${f1(.35+.65*tx)}`);
    if(asp>.5)s+=`<path d="M${f1(cx-ps*.78-(N?40:96))} ${f1(cy-6)}l${N?34:90} 14" style="stroke:var(--bad);stroke-width:2;opacity:${f1(ramp(asp,.5,1))}"/>`;
    const ry=cy-ps*.46*lerp(.5,.92,act)-14;
    s+=`<path d="M${f1(cx+ps*.18)} ${f1(ry+4)}L${f1(cx+ps*.62)} ${f1(ry-14)}" style="stroke:var(--muted);stroke-width:1"/>`+TX(cx+ps*.64,ry-16,'t-sm',p2>.5?'P2Y12 plugged':'P2Y12 (ADP)',p2>.5?'fill:var(--rx);font-weight:600':'');
    /* the tablets travelling in */
    if(asp>0&&asp<1||t>.16){const u=ease(asp),x=lerp(-30,cx-ps*.92,u),y=lerp(cy-60,cy-58,u);s+=pill(x,y,30,{round:true,txt:'ASA',col:'var(--rx)'})+TX(x,y-20,'t-xs t-mid','aspirin',`opacity:${f1(clamp(u*2))}`)}
    if(t>.32){const u=ease(p2),x=lerp(W+40,cx-ps*.12,u),y=lerp(26,ry-24,u);s+=pill(x,y,36,{ang:-12,txt:'P2Y12',col:'var(--rx)'})}
    /* status chips */
    const chip=(x,y,txt,on)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(txt.length*6.1+14)}" height="18" rx="9" style="fill:${on?'var(--rx-soft)':'var(--warn-soft)'}"/><text x="${f1(x+7)}" y="${f1(y+12.5)}" class="t-sm" style="fill:${on?'var(--rx)':'var(--warn)'}">${txt}</text>`;
    const cy2=ay-24;s+=chip(10,cy2,asp>.6?'TXA2 blocked':'TXA2 flowing',asp>.6)+chip(N?W/2+4:W/2+6,cy2,p2>.6?'ADP receptor blocked':'ADP receptor open',p2>.6);
    return s}
  /* ---- right panel A: what switches a platelet on ---- */
  function pathway(W,H,t,op){
    if(op<=.01)return '';
    const asp=ramp(t,.17,.23),p2=ramp(t,.33,.38),gp=ramp(t,.37,.42),ac=ramp(t,.40,.45),hw=W/2-14;
    let s=`<g style="opacity:${f1(op)}">`+TX(8,18,'t-sm','WHAT SWITCHES A PLATELET ON');
    s+=box(W/2-130,30,260,34,['Torn plaque exposes collagen','and tissue factor']);
    s+=box(8,98,hw,40,['COX-1 makes','thromboxane A2'],{fill:asp>.5?'var(--panel)':'var(--warn-soft)',op:asp>.5?.55:1});
    s+=box(W/2+6,98,hw,40,['ADP binds the','P2Y12 receptor'],{fill:p2>.5?'var(--panel)':'var(--plt-soft)',op:p2>.5?.55:1});
    s+=box(W/2-130,178,260,40,['GP IIb/IIIa switches on:','fibrinogen bridges platelets'],{fill:'var(--plt-soft)'});
    s+=box(8,262,hw,40,['Clotting cascade:','thrombin makes fibrin'],{fill:ac>.5?'var(--panel)':'var(--isch-soft)',op:ac>.5?.6:1});
    s+=box(W/2+6,262,hw,40,['Platelet clump + fibrin','= the clot'],{fill:'var(--brand-soft)',stroke:'var(--brand)'});
    const ar=(x1,y1,x2,y2)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" class="arrow" marker-end="url(#atAr)"/>`;
    s+=ar(W/2-50,64,8+hw/2,96)+ar(W/2+50,64,W/2+6+hw/2,96)+ar(8+hw/2,138,W/2-50,176)+ar(W/2+6+hw/2,138,W/2+50,176)+ar(W/2,218,W/2+6+hw/2,260)+ar(8+hw,282,W/2+4,282)+`<path d="M${f1(W/2-130)} 47H3V280H6" class="arrow" marker-end="url(#atAr)"/>`;
    s+=blockMark(8+hw/2,140,asp)+badge(8+hw/2,152,'Aspirin',asp);
    s+=blockMark(W/2+6+hw/2,140,p2)+badge(W/2+6+hw/2,152,W<380?'P2Y12 inhibitors':'Clopidogrel · prasugrel · ticagrelor',p2);
    s+=blockMark(W/2,220,gp)+badge(W/2,232,'GP IIb/IIIa inhibitors: bail-out',gp*.85);
    s+=blockMark(8+hw/2,304,ac)+badge(8+hw/2,316,W<380?'Heparins, bivalirudin':'Heparin · enoxaparin · bivalirudin',ac);
    s+=TX(8,H-10,'t-xs',t<.16?'Each box is a step a medicine can block.':'Teal badges: where each medicine acts.');
    return s+'</g>'}
  /* ---- right panel B: onset and offset on a log time axis ---- */
  const AT_PD=[
   {n:'Clopidogrel',tag:'prodrug (CYP2C19) · irreversible',on:120,onl:'2 h',off:[7200],offl:'~5 d'},
   {n:'Prasugrel',tag:'irreversible',on:60,onl:'1 h',off:[7200,12960],offl:'5–9 d'},
   {n:'Ticagrelor',tag:'reversible',on:120,onl:'~2 h',off:[7200],offl:'5 d'},
   {n:'Cangrelor (IV)',tag:'reversible',on:2,onl:'2 min',off:[60],offl:'1 h'}];
  function onset(W,H,t,op){
    if(op<=.01)return '';
    const x0=W<380?14:14,x1=W-14,LG=Math.log(20160),X=m=>x0+(x1-x0)*Math.log(m)/LG,cur=Math.exp(LG*ramp(t,.49,.60)),ay=H-70;
    let s=`<g style="opacity:${f1(op)}">`+TX(8,18,'t-sm','HOW FAST THEY START, HOW LONG THEY LAST');
    s+=`<line x1="${x0}" x2="${x1}" y1="${ay}" y2="${ay}" class="axis"/>`;
    [[1,'1 min'],[10,'10 min'],[60,'1 h'],[360,'6 h'],[1440,'1 d'],[7200,'5 d'],[20160,'14 d']].forEach(([m,l])=>{s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${ay-3}" y2="${ay+3}" class="axis"/>`+TX(X(m),ay+15,'t-xs t-mid',l)});
    s+=`<line x1="${f1(X(cur))}" x2="${f1(X(cur))}" y1="34" y2="${ay}" style="stroke:var(--brand);stroke-width:1.4;stroke-dasharray:4 3"/>`+TX(X(cur),ay+30,'t-xs t-mid','time since dose','fill:var(--brand)');
    const rs=(ay-58)/4;AT_PD.forEach((d,i)=>{const y=44+i*rs,vis=ramp(t,.485+i*.012,.5+i*.012);if(vis<=0)return;
      s+=`<g style="opacity:${f1(vis)}">`+TX(x0,y,'t-lbl',d.n)+TX(x0+(W<380?96:110),y,'t-xs',d.tag);
      const xo=X(d.on),xf=X(d.off[0]),xf2=X(d.off[d.off.length-1]),on=cur>=d.on,off=cur>=d.off[0];
      s+=`<line x1="${f1(xo)}" x2="${f1(xf)}" y1="${y+14}" y2="${y+14}" style="stroke:var(--rx);stroke-width:5;stroke-linecap:round;opacity:${on?.55:.15}"/>`;
      if(xf2>xf)s+=`<line x1="${f1(xf)}" x2="${f1(xf2)}" y1="${y+14}" y2="${y+14}" style="stroke:var(--rx);stroke-width:5;stroke-linecap:round;opacity:.25;stroke-dasharray:2 3"/>`;
      s+=`<circle cx="${f1(xo)}" cy="${y+14}" r="6" style="fill:${on?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.6"/>`+TX(xo,y+30,'t-xs t-mid',d.onl,on?'fill:var(--ink);font-weight:600':'');
      s+=`<circle cx="${f1(xf2)}" cy="${y+14}" r="6" style="fill:var(--panel);stroke:${off?'var(--ink)':'var(--line)'};stroke-width:1.8"/>`+TX(xf2,y+30,'t-xs t-mid',d.offl,off?'fill:var(--ink);font-weight:600':'')+'</g>'});
    s+=`<circle cx="${x0+5}" cy="${H-22}" r="4.5" style="fill:var(--rx)"/>`+TX(x0+14,H-18,'t-xs','effect seen after a dose')+`<circle cx="${f1(W/2+14)}" cy="${H-22}" r="4.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.5"/>`+TX(W/2+23,H-18,'t-xs','normal again after last dose');
    return s+'</g>'}
  /* ---- right panel C: trial bars ---- */
  function trials(W,H,t,op){
    if(op<=.01)return '';
    const lx=8,bx=W<380?92:96,bw=W-bx-44,mx=14,BX=v=>bx+bw*v/mx;
    let s=`<g style="opacity:${f1(op)}">`+TX(8,18,'t-sm','THE TRIALS: BENEFIT AND BLEEDING');
    [0,5,10].forEach(v=>{s+=`<line x1="${f1(BX(v))}" x2="${f1(BX(v))}" y1="30" y2="${30+4*60}" class="grid"/>`+TX(BX(v),30+4*60+12,'t-xs t-mid',v+'%')});
    AT_TRIALS.forEach((r,i)=>{const y=34+i*60,g=ramp(t,r.r[0],r.r[1]);
      s+=TX(lx,y+8,'t-lbl',r.n,g>0?'':'opacity:.4')+TX(lx+r.n.length*7+8,y+8,'t-xs',r.o,g>0?'':'opacity:.4');
      s+=TX(bx-6,y+21,'t-xs t-end',r.al)+TX(bx-6,y+33,'t-xs t-end',r.bl);
      s+=`<rect x="${bx}" y="${y+13}" width="${f1(bw*r.a/mx*g)}" height="10" rx="2" style="fill:var(--isch)"/><rect x="${bx}" y="${y+25}" width="${f1(bw*r.b/mx*g)}" height="10" rx="2" style="fill:var(--isch);opacity:.4"/>`;
      if(g>.95)s+=TX(BX(r.a)+4,y+22,'t-xs',r.a+'%','fill:var(--ink);font-weight:600')+TX(BX(r.b)+4,y+34,'t-xs',r.b+'%');
      const gb=ramp(g,.4,1);
      if(r.ba!=null){s+=`<rect x="${bx}" y="${y+39}" width="${f1(bw*r.ba/mx*gb)}" height="5" rx="1" style="fill:var(--bad)"/><rect x="${bx}" y="${y+46}" width="${f1(bw*r.bb/mx*gb)}" height="5" rx="1" style="fill:var(--bad);opacity:.4"/>`;
        if(g>.95)s+=TX(BX(Math.max(r.ba,r.bb))+4,y+50,'t-xs',`${r.ba}% vs ${r.bb}% ${W<380?'bleeding':r.bt}`,'fill:var(--bad)')}
      else if(g>.6)s+=TX(bx,y+50,'t-xs',W<380?'no significant bleeding excess':r.bt,'fill:var(--bad)')});
    const ly=30+4*60+28;
    s+=`<rect x="8" y="${ly-8}" width="12" height="8" rx="2" style="fill:var(--isch)"/>`+TX(24,ly,'t-xs','main ischaemic outcome')+`<rect x="${f1(W/2+6)}" y="${ly-6}" width="12" height="5" style="fill:var(--bad)"/>`+TX(W/2+22,ly,'t-xs','bleeding · pale = comparator');
    const sm=ramp(t,.93,.98);
    if(sm>0){s+=`<g style="opacity:${f1(sm)}">`+TX(8,ly+22,'t-sm','PER 1000 TREATED (FROM THE PERCENTAGES)','fill:var(--ink)');
      const L=W<380?['ISIS-2 −24 deaths · CURE −21 events, +10 bleeds','TRITON −22 events, +6 bleeds · PLATO −19, +7']:['ISIS-2: 24 fewer deaths · CURE: 21 fewer events, 10 more bleeds','TRITON: 22 fewer events, 6 more bleeds · PLATO: 19 fewer, 7 more'];
      L.forEach((l,i)=>{s+=TX(8,ly+38+i*14,'t-xs',l,'fill:var(--ink)')});s+='</g>'}
    return s+'</g>'}
  const setStep=()=>{};let setSt=setStep;
  function draw(t){
    const N=vb(svg,'720 380','400 730');
    const opA=1-ramp(t,.46,.49),opB=ramp(t,.46,.49)*(1-ramp(t,.60,.63)),opC=ramp(t,.60,.63);
    let s=`<defs>${marker('atAr')}</defs>`;
    if(N){s+=`<g>${mech(400,340,t,true)}</g><line x1="10" x2="390" y1="346" y2="346" class="axis"/><g transform="translate(0 356)">${pathway(400,370,t,opA)}${onset(400,370,t,opB)}${trials(400,370,t,opC)}</g>`}
    else{s+=`<g>${mech(342,380,t,false)}</g><line x1="352" x2="352" y1="12" y2="368" class="axis"/><g transform="translate(362 0)">${pathway(354,380,t,opA)}${onset(354,380,t,opB)}${trials(354,380,t,opC)}</g>`}
    svg.innerHTML=s;
    const p=phaseOf(AT_STEPS,t);$('#atNote').innerHTML=noteHTML(AT_STEPS[p]);setSt(p);
  }
  const stop=playWire(rg,$('#atPlay'),draw,26000,'%t:player.replay%','antithrombotic');
  setSt=stepWire($('#atSteps'),AT_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= the 12-month balance ================= */
  const bs=$('#atBal'),br=$('#atBalT');let sc='plato',hbr=false;
  const cum=(E,u,k)=>E*(1-Math.exp(-k*u))/(1-Math.exp(-k));
  function chart(x,y,w,h,S,u,which){
    const ea=which?S.ba:S.ia,eb=which?S.bb:S.ib,k=which?S.kb:1.2,top=Math.max(2,Math.ceil(Math.max(S.ia,S.ib,S.ba,S.bb)*1.18)),Y=v=>y+h-h*v/top,X=uu=>x+w*uu;
    let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:var(--field)"/><line x1="${x}" x2="${x+w}" y1="${y+h}" y2="${y+h}" class="axis"/><line x1="${x}" x2="${x}" y1="${y}" y2="${y+h}" class="axis"/>`;
    s+=`<text x="${x}" y="${y-8}" class="t-sm" style="fill:${which?'var(--bad)':'var(--isch)'};font-weight:600">${which?S.bl:S.il}</text>`;
    [0,Math.round(top/2),top].forEach(v=>{s+=`<text x="${x-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`});
    const col=which?'var(--bad)':'var(--isch)';
    [[ea,1],[eb,.42]].forEach(([E,op],j)=>{let d='';const n=60;for(let i=0;i<=n;i++){const uu=u*i/n;d+=(i?'L':'M')+f1(X(uu))+' '+f1(Y(cum(E,uu,k)))}
      s+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:${j?2:2.8};opacity:${op};${j?'stroke-dasharray:5 3':''}"/>`;
      const v=cum(E,u,k);s+=`<circle cx="${f1(X(u))}" cy="${f1(Y(v))}" r="3.6" style="fill:${col};opacity:${op}"/>`;
      if(u>.98)s+=`<text x="${f1(X(1)+6)}" y="${f1(Y(E)+(j?(eb<ea?9:-2):(ea<=eb?9:-2)))}" class="t-xs" style="fill:var(--ink);${j?'':'font-weight:700'}">${E}%</text>`});
    return s}
  function bdraw(u){
    const N=vb(bs,'720 360','400 650'),S=hbr?AT_BAL.master:AT_BAL[sc];
    let s='';
    const cw=N?306:350,cx=N?46:40;
    s+=chart(cx,N?52:52,cw,N?96:94,S,u,0)+chart(cx,N?190:212,cw,N?96:94,S,u,1);
    /* month axis under each chart */
    [N?148:146,N?286:306].forEach(yy=>{const mm=[S.m0,Math.round((S.m0+S.m1)/2),S.m1];mm.forEach((m,i)=>{const xx=cx+cw*i/2;s+=`<text x="${f1(xx)}" y="${yy+13}" class="t-xs ${['','t-mid','t-end'][i]}">${i===2&&S.end==='end'?'end of follow-up':'month '+m}</text>`})});
    s+=`<g transform="translate(${N?16:cx} ${N?318:338})"><line x1="0" x2="18" y1="0" y2="0" style="stroke:var(--ink);stroke-width:2.8"/><text x="24" y="3" class="t-xs" style="fill:var(--ink)">${S.a}</text><line x1="${N?190:190}" x2="${N?208:208}" y1="0" y2="0" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:5 3;opacity:.5"/><text x="${N?214:214}" y="3" class="t-xs">${S.b}</text></g>`;
    /* balance scale: left pan = fewer events with the strategy, right pan = more events with it */
    const iD=(S.ib-S.ia)*10,bD=(S.bb-S.ba)*10,ui=cum(1,u,1.2),ub=cum(1,u,S.kb);
    const fewer=[],more=[];const push=(arr,n,col)=>{for(let i=0;i<Math.round(n);i++)arr.push(col)};
    push(iD>0?fewer:more,Math.abs(iD)*ui,'var(--isch)');push(bD>0?fewer:more,Math.abs(bD)*ub,'var(--bad)');
    const px=N?200:556,py=N?420:128,L=N?140:104,ang=clamp((more.length-fewer.length)/30,-1,1)*13*Math.PI/180;
    const end=sgn=>[px+sgn*L*Math.cos(ang),py+sgn*L*Math.sin(ang)];
    s+=`<path d="M${px-26} ${py+150}L${px+26} ${py+150}L${px+6} ${py+144}L${px+3} ${py}L${px-3} ${py}L${px-6} ${py+144}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
    const [lx,ly]=end(-1),[rx,ry]=end(1);
    s+=`<line x1="${f1(lx)}" y1="${f1(ly)}" x2="${f1(rx)}" y2="${f1(ry)}" style="stroke:var(--ink);stroke-width:4;stroke-linecap:round"/><circle cx="${px}" cy="${py}" r="6" style="fill:var(--ink)"/>`;
    const pan=(x,y,arr,title,sub)=>{let g=`<path d="M${f1(x)} ${f1(y)}L${f1(x-46)} ${f1(y+40)}M${f1(x)} ${f1(y)}L${f1(x+46)} ${f1(y+40)}" style="stroke:var(--muted);stroke-width:1"/><path d="M${f1(x-56)} ${f1(y+40)}Q${f1(x)} ${f1(y+74)} ${f1(x+56)} ${f1(y+40)}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
      arr.forEach((c,i)=>{const row=Math.floor(i/10),col=i%10;g+=`<circle cx="${f1(x-40.5+col*9)}" cy="${f1(y+34-row*8.5)}" r="3.6" style="fill:${c}"/>`});
      g+=`<text x="${f1(x)}" y="${f1(y+90)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${title}</text><text x="${f1(x)}" y="${f1(y+104)}" class="t-xs t-mid">${sub}</text>`;return g};
    s+=pan(lx,ly,fewer,'fewer events',`${fewer.length} per 1000`)+pan(rx,ry,more,'more events',`${more.length} per 1000`);
    s+=`<text x="${px}" y="${py-30}" class="t-sm t-mid" style="fill:var(--ink)">With “${S.a}”:</text>`;
    s+=`<g transform="translate(${N?60:px-125} ${N?600:py+214})"><circle cx="4" cy="-3" r="4" style="fill:var(--isch)"/><text x="12" y="0" class="t-xs">ischaemic</text><circle cx="${N?92:84}" cy="-3" r="4" style="fill:var(--bad)"/><text x="${N?100:92}" y="0" class="t-xs">bleeding</text><text x="${N?160:150}" y="0" class="t-xs">1 dot = 1 per 1000</text></g>`;
    s+=`<text x="${N?16:cx}" y="${N?20:18}" class="t-sm" style="fill:var(--ink);font-weight:600">${S.k}</text>`;
    bs.innerHTML=s;
    const nt=noteHTML({k:S.k,t:S.t,txt:S.txt,pt:S.pt,hook:S.hook});
    $('#atBalNote').innerHTML=nt;
  }
  const bstop=playWire(br,$('#atBalPlay'),bdraw,9000,'%t:player.replay%','antithrombotic');
  $$('[data-atb]').forEach(b=>b.addEventListener('click',()=>{bstop();sc=b.dataset.atb;hbr=false;$('#atHbr').setAttribute('aria-pressed','false');
    $$('[data-atb]').forEach(x=>x.setAttribute('aria-pressed',x===b));br.value=0;bdraw(0);$('#atBalPlay').click()}));
  $('#atHbr').addEventListener('click',()=>{bstop();hbr=!hbr;$('#atHbr').setAttribute('aria-pressed',hbr);
    $$('[data-atb]').forEach(x=>x.setAttribute('aria-pressed',hbr?'false':String(x.dataset.atb===sc)));br.value=hbr?0:1;bdraw(+br.value);if(hbr)$('#atBalPlay').click()});
  bdraw(+br.value);
};
