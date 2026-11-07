/* =============== 4.1 Exercise & physiotherapy =============== */
inits.physio=()=>{
  const svg=$('#phSvg'),rg=$('#phT'),note=$('#phNote'),read=$('#phRead');
  let mode='paced';

  /* published load of the HEAVY arm, Liaghat 2022 (full text): weeks 1-3 familiarisation 3x10 at 50/70/90% of the
     estimated 10RM, weeks 4-9 3 sets of 10RM, weeks 10-15 4 sets of 8RM, week 16 taper */
  const LOAD=[50,70,90,100,100,100,100,100,100,100,100,100,100,100,100,null];
  const loadTxt=w=>w<=3?`3 × 10 at ${LOAD[w-1]}% of 10RM`:w<=9?'3 sets of 10RM':w<=15?'4 sets of 8RM':'taper';
  /* illustrative stage names (not from the trial) */
  const STAGE=[[0,'Isometric & control'],[3,'Closed-chain'],[8,'Functional'],[13,'Task- & sport-specific']];
  const stageOf=wk=>{let s=STAGE[0][1];STAGE.forEach(([a,n])=>{if(wk>=a)s=n});return s};

  const STEPS=[
    {from:0,at:.09,k:'Weeks 1–3',t:'Learn the moves first',
     txt:`In the Danish high-load shoulder trial (100 adults with HSD), the first 3 weeks were familiarisation: 3 sets of 10 repetitions at 50%, then 70%, then 90% of the estimated 10-repetition maximum (10RM). Trials share this pattern: start supervised and below symptom thresholds, then progress by load or by competency, as in a children's trial that advanced exercises only when each was done well. Muscle weakness matters in its own right: in 30 people with EDS, measured weakness correlated with fatigue (r=0.461). [[Liaghat2022BJSM,Pacey2013,Voermans2011]]`,
     pt:`Start gently. People in one trial spent 3 weeks learning the exercises with light weights before using heavier ones.`,
     hook:`HEAVY arm: weeks 1–3 at 50/70/90% of 10RM, then 3×10RM (weeks 4–9), 4×8RM (weeks 10–15), taper (week 16). [[Liaghat2022BJSM]]`},
    {from:.19,at:.27,k:'Weeks 4–9',t:'Closed-chain strength and control',
     txt:`From week 4 the trial used 3 sets of the full 10RM. Proprioception, the sense of where a joint is, is often impaired in hypermobility. In an 8-week home programme of progressive closed kinetic chain exercise (feet or hands fixed, as in a squat), knee proprioceptive acuity improved in 16 of 18 people with JHS, with better balance, strength and pain, though there was no control group. A 4-week RCT of combined closed-chain and proprioceptive exercise (24 people) improved proprioception, pain and quality of life compared with no intervention. [[Liaghat2022BJSM,Ferrell2004,Daman2019]]`,
     pt:`Exercises with the foot or hand planted, like a squat or a wall push, help the joint and brain work together again.`,
     hook:`Ferrell 2004: 8 weeks of closed kinetic chain exercise, knee proprioception better in 16/18 (no control group). [[Ferrell2004]]`},
    {from:.33,at:.38,k:'A flare',t:'Flare: adjust, don\'t stop',
     txt:`Soreness is expected. In the trial, transient muscle soreness affected 56% on HEAVY vs 37% on LIGHT, and headaches 40% vs 20%; there were no serious adverse events. Pain below 5/10 was allowed during exercise. Activity pacing, spreading activity evenly instead of pushing hard on good days and crashing afterwards, is recommended by patients and clinicians, but no trial has tested pacing alone in hEDS or HSD <span class="ev hyp">Hypothesis</span>. Switch the lower chart to compare the two patterns. [[Liaghat2022BJSM,Bennett2022]]`,
     pt:`Some soreness after exercise is common and usually passes. On a bad day, do a little less rather than nothing, then build back up.`,
     hook:`HEAVY vs LIGHT harms: soreness 56% vs 37%, headache 40% vs 20%, no serious adverse events. [[Liaghat2022BJSM]]`},
    {from:.56,at:.75,k:'Weeks 10–15',t:'Heavier, then functional',
     txt:`Weeks 10–15 used 4 sets of 8RM. Over the 16 weeks, shoulder pain fell by 0.89 points (0–10 scale) with HEAVY and 0.33 with LIGHT, with no difference between groups, and pain caused by the exercise itself stayed below 0.5 throughout, "challenging previous beliefs" that heavy loading flares pain <span class="ev early">Early evidence</span>. In a 12-person feasibility study, shoulder strength rose 28–31%. Lower fear of movement and higher self-efficacy at the start predicted better results. [[Liaghat2025,Liaghat2020,Dolso2023]]`,
     pt:`In one trial, heavier training did not make pain worse during exercise, and pain eased a little over 16 weeks.`,
     hook:`Exercise-induced pain stayed below 0.5/10 during high-load shoulder training in HSD. [[Liaghat2025]]`},
    {from:.92,at:1,k:'Week 16 and after',t:'Taper, then keep going',
     txt:`At 16 weeks the function score (WOSI) favoured HEAVY by −174.5 points, smaller than the 252-point minimal important difference; more than two-thirds on HEAVY improved by more than that difference. At 1 year the gap (−92.9) was no longer significant. Children show the same pattern of improvement in both arms: 8 weeks of exercise into the hypermobile range or only to neutral cut knee pain by 14.5 mm on a VAS either way. Gains need maintaining. [[Liaghat2022BJSM,Liaghat2024BJSM,Pacey2013]]`,
     pt:`Most people in exercise trials improve, whichever programme they get. The hard part is keeping the habit going.`,
     hook:`High-load beat low-load at 16 weeks (WOSI −174.5, below the MID of 252) but not at 1 year. [[Liaghat2022BJSM,Liaghat2024BJSM]]`}
  ];
  const setActive=stepWire($('#phSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* schematic activity and pain curves over the 16 weeks (u = 0..1) */
  const FL=[.31,.45];
  const CURVE={
    paced:{a:u=>.3+.42*u-.1*bump(u,FL[0]+.02,FL[1]+.03),p:u=>.3-.12*u+.32*bump(u,FL[0],FL[1])},
    boom:{a:u=>.24+.6*Math.pow(Math.max(0,Math.sin(u*Math.PI*2*3.4)),2)-.12*Math.pow(Math.max(0,Math.sin(u*Math.PI*2*3.4-1.9)),2),
          p:u=>.22+.5*Math.pow(Math.max(0,Math.sin(u*Math.PI*2*3.4-1.25)),2)}};

  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const wk=t*16,W=Math.min(16,Math.max(1,Math.ceil(wk))),u=t;
    const prop=.12+.78*ease(ramp(wk,0,12)),str=.12+.8*ease(ramp(wk,1,15)),mus=.12+.88*ease(ramp(wk,0,15));
    const L=N?{jp:[10,10,380,232],jx:96,jy:122,js:.74,st:[22,32],gx:190,gw:178,g1:150,g2:198,
               lc:{x0:42,x1:386,top:300,base:388,ttl:276},ac:{x0:42,x1:386,top:452,base:560,ttl:428},lg:600}
             :{jp:[10,10,212,360],jx:111,jy:156,js:1.0,st:[24,34],gx:24,gw:174,g1:298,g2:334,
               lc:{x0:262,x1:706,top:44,base:160,ttl:22},ac:{x0:262,x1:706,top:218,base:330,ttl:196},lg:360};
    let s=`<defs>${marker('phArr','var(--muted)')}</defs>`;
    /* joint panel */
    const [px,py,pw,ph]=L.jp;
    s+=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${L.st[0]}" y="${L.st[1]}" class="t-xs">ILLUSTRATIVE STAGE</text><text x="${L.st[0]}" y="${L.st[1]+17}" class="t-lbl" style="fill:var(--rx)">${stageOf(wk)}</text>`;
    const wob=Math.sin(t*90)*(1-prop)*.42;
    s+=joint(L.jx,L.jy+(N?14:0),L.js,{lax:.62,muscle:mus,slip:Math.abs(wob),ang:wob*9});
    const jy2=L.jy+(N?14:0);
    if(1-prop>.3)s+=`<text x="${L.jx}" y="${f1(jy2+L.js*112)}" class="t-xs t-mid" style="fill:var(--variant)">joint wobbles</text>`;
    else s+=`<text x="${L.jx}" y="${f1(jy2+L.js*112)}" class="t-xs t-mid" style="fill:var(--rx)">steadier</text>`;
    /* gauges */
    const gauge=(y,lab,v,col)=>`<text x="${L.gx}" y="${y-8}" class="t-sm">${lab}</text><rect x="${L.gx}" y="${y}" width="${L.gw}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${L.gx}" y="${y}" width="${f1(L.gw*v)}" height="12" rx="6" style="fill:${col}"/>`;
    s+=gauge(L.g1,'Muscle strength',str,'var(--muscle)');
    s+=gauge(L.g2,'Joint control',prop,'var(--rx)');
    s+=`<text x="${L.gx}" y="${L.g2+28}" class="t-xs">gauges schematic</text>`;
    /* load chart: published weekly load */
    const C=L.lc,bw=(C.x1-C.x0)/16,yv=v=>C.base-(C.base-C.top)*v/100;
    s+=`<text x="${C.x0-(N?30:0)}" y="${C.ttl}" class="t-sm">LOAD, % OF 10-REP MAX (HEAVY ARM, AS PUBLISHED)</text>`;
    [0,50,100].forEach(v=>{s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-5}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}</text>`});
    for(let i=0;i<16;i++){const w=i+1,x=C.x0+i*bw+bw*.12,done=w<=W,cur=w===W;
      const v=LOAD[i]==null?55:LOAD[i],col=w<=3?'var(--rx-soft)':w<=9?'var(--rx)':w<=15?'var(--accent)':'var(--panel-2)';
      s+=done?`<rect x="${f1(x)}" y="${f1(yv(v))}" width="${f1(bw*.76)}" height="${f1(C.base-yv(v))}" rx="2" style="fill:${col};stroke:${cur?'var(--ink)':w===16?'var(--muted)':'none'};stroke-width:${cur?1.6:1};${w===16?'stroke-dasharray:3 2':''}"/>`
        :`<rect x="${f1(x+.5)}" y="${f1(yv(v)+.5)}" width="${f1(bw*.76-1)}" height="${f1(C.base-yv(v)-1)}" rx="2" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`;
      if(w>=10&&w<=15&&done)for(let r=1;r<4;r++)s+=`<line x1="${f1(x+1)}" x2="${f1(x+bw*.76-1)}" y1="${f1(yv(v)+r*(C.base-yv(v))/4)}" y2="${f1(yv(v)+r*(C.base-yv(v))/4)}" style="stroke:var(--panel);stroke-width:1;opacity:.7"/>`;
      if(!N||w%2===1||w===16)s+=`<text x="${f1(x+bw*.38)}" y="${C.base+12}" class="t-xs t-mid" style="${cur?'fill:var(--ink);font-weight:700':''}">${w}</text>`}
    const br=(a,b,lab,lab2)=>{const xa=C.x0+(a-1)*bw+2,xb=C.x0+b*bw-2,yb=C.top-6;
      return `<path d="M${f1(xa)} ${yb+4}V${yb}H${f1(xb)}V${yb+4}" style="fill:none;stroke:var(--muted)"/><text x="${f1((xa+xb)/2)}" y="${yb-4}" class="t-xs t-mid">${N&&lab2?lab2:lab}</text>`};
    s+=br(1,3,'familiarise','famil.')+br(4,9,'3 × 10RM')+br(10,15,'4 × 8RM')+br(16,16,'taper','');
    s+=`<text x="${C.x1}" y="${C.base+24}" class="t-xs t-end">week</text>`;
    /* activity and pain chart (schematic) */
    const A=L.ac,cv=CURVE[mode];
    s+=`<text x="${A.x0-(N?30:0)}" y="${A.ttl}" class="t-sm">${mode==='paced'?'PACED: STEADY BUILD, ONE FLARE, ADJUST':'BOOM-BUST: PUSH, CRASH, REPEAT'} (SCHEMATIC)</text>`;
    s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${A.base}" y2="${A.base}" class="axis"/><line x1="${A.x0}" x2="${A.x0}" y1="${A.top}" y2="${A.base}" class="axis"/>`;
    s+=`<text x="${A.x0-6}" y="${A.top+8}" class="t-xs t-end">high</text><text x="${A.x0-6}" y="${A.base}" class="t-xs t-end">low</text>`;
    const xu=v=>A.x0+(A.x1-A.x0)*v;
    const seg=(fn,col,w,dash)=>{const full=pathFn(fn,A.x0,A.x1,A.base,A.top,160);const done=pathFn(v=>fn(v*u),A.x0,xu(u),A.base,A.top,Math.max(2,Math.round(160*u)));
      return `<path d="${full}" style="fill:none;stroke:${col};stroke-width:${w};opacity:.18;${dash?'stroke-dasharray:4 3':''}"/>`+(u>.005?`<path d="${done}" style="fill:none;stroke:${col};stroke-width:${w};${dash?'stroke-dasharray:4 3':''}"/>`:'')};
    s+=seg(cv.a,'var(--rx)',2.6)+seg(cv.p,'var(--vas)',2,true);
    s+=`<line x1="${f1(xu(u))}" x2="${f1(xu(u))}" y1="${A.top-4}" y2="${A.base}" style="stroke:var(--ink);stroke-width:1;opacity:.5"/>`;
    s+=`<circle cx="${f1(xu(u))}" cy="${f1(A.base-(A.base-A.top)*clamp(cv.a(u)))}" r="4" style="fill:var(--rx)"/><circle cx="${f1(xu(u))}" cy="${f1(A.base-(A.base-A.top)*clamp(cv.p(u)))}" r="3.5" style="fill:var(--vas)"/>`;
    if(mode==='paced'&&u>FL[0]){const fx=xu((FL[0]+FL[1])/2),fy=A.base-(A.base-A.top)*cv.p((FL[0]+FL[1])/2);
      s+=`<text x="${f1(fx+8)}" y="${f1(fy-10)}" class="t-xs" style="fill:var(--vas)">flare → trim load, keep moving</text>`}
    if(mode==='boom'&&u>.1){const bx=xu(.073);s+=`<text x="${f1(bx+6)}" y="${A.top+4}" class="t-xs" style="fill:var(--rx)">good day: overdo it</text>`;
      if(u>.17)s+=`<text x="${f1(xu(.13)+4)}" y="${A.base-6}" class="t-xs" style="fill:var(--vas)">then a crash</text>`}
    /* legend */
    const lx=N?42:262;
    s+=`<line x1="${lx}" x2="${lx+20}" y1="${L.lg+6}" y2="${L.lg+6}" style="stroke:var(--rx);stroke-width:2.6"/><text x="${lx+26}" y="${L.lg+10}" class="t-xs">activity</text>`;
    s+=`<line x1="${lx+92}" x2="${lx+112}" y1="${L.lg+6}" y2="${L.lg+6}" style="stroke:var(--vas);stroke-width:2;stroke-dasharray:4 3"/><text x="${lx+118}" y="${L.lg+10}" class="t-xs">pain</text>`;
    s+=`<text x="${N?386:706}" y="${L.lg+(N?28:10)}" class="t-xs t-end">pacing alone untested (hypothesis)</text>`;
    svg.innerHTML=s;
    const i=phaseOf(STEPS,t);note.innerHTML=noteHTML(STEPS[i]);setActive(i);
    read.innerHTML=`<span>Week <b>${W}</b> of 16</span><span>Load <b>${loadTxt(W)}</b></span><span>Pain allowed in exercise <b>&lt; 5/10</b></span>`;
  }
  const stop=playWire(rg,$('#phPlay'),draw,9000,'%t:player.replay%','physio');
  $$('[data-phm]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.phm;$$('[data-phm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- forest plot: WOSI between-group differences ---------- */
  const fsvg=$('#phForest');
  function drawForest(){
    const N=vb(fsvg,'720 170','400 250');
    const x0=N?40:150,x1=N?380:690,lo=-400,hi=150,X=v=>x0+(x1-x0)*(v-lo)/(hi-lo);
    const rows=[{l:'16 weeks',m:-174.5,a:-341.4,b:-7.7,col:'var(--rx)'},{l:'1 year',m:-92.9,a:-257.4,b:71.5,col:'var(--muted)'}];
    const top=N?50:30,rh=N?62:44;
    let s='';
    s+=`<rect x="${f1(X(lo))}" y="${top-14}" width="${f1(X(-252)-X(lo))}" height="${rows.length*rh+8}" style="fill:var(--rx-soft);opacity:.55"/>`;
    s+=`<line x1="${f1(X(-252))}" x2="${f1(X(-252))}" y1="${top-18}" y2="${top+rows.length*rh}" style="stroke:var(--rx);stroke-width:1.4;stroke-dasharray:4 3"/>`;
    s+=`<text x="${f1(X(-252)-4)}" y="${top-20}" class="t-xs t-end" style="fill:var(--rx)">MID −252: beyond here = important</text>`;
    s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${top-18}" y2="${top+rows.length*rh}" style="stroke:var(--ink);stroke-width:1.2"/><text x="${f1(X(0)+4)}" y="${top-20}" class="t-xs">no difference</text>`;
    rows.forEach((r,i)=>{const y=top+i*rh+12;
      s+=`<text x="${N?x0:x0-12}" y="${N?y-12:y+4}" class="t-lbl ${N?'':'t-end'}">${r.l}</text>`;
      s+=`<line x1="${f1(X(r.a))}" x2="${f1(X(r.b))}" y1="${y}" y2="${y}" style="stroke:${r.col};stroke-width:2.4"/>`;
      [r.a,r.b].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y-6}" y2="${y+6}" style="stroke:${r.col};stroke-width:2"/>`);
      s+=`<rect x="${f1(X(r.m)-6)}" y="${y-6}" width="12" height="12" style="fill:${r.col}"/>`;
      s+=`<text x="${f1(X(r.m))}" y="${y+22}" class="t-xs t-mid" style="fill:var(--ink)">${r.m} (${r.a} to ${r.b})</text>`});
    const ay=top+rows.length*rh+6;
    s+=`<line x1="${x0}" x2="${x1}" y1="${ay}" y2="${ay}" class="axis"/>`;
    [-400,-300,-200,-100,0,100].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ay}" y2="${ay+4}" class="axis"/><text x="${f1(X(v))}" y="${ay+15}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${x0}" y="${ay+30}" class="t-xs">← favours HEAVY</text><text x="${x1}" y="${ay+30}" class="t-xs t-end">favours LIGHT →</text>`;
    fsvg.innerHTML=s}
  drawForest();
  {const prev=redraws.physio;redraws.physio=()=>{prev&&prev();drawForest()}}

  /* ---------- trial comparator ---------- */
  const T=[
    {n:'Liaghat 2022 · high vs low load',d:'RCT',o:['fn','pain','str'],ev:'early',pop:'100 adults with HSD and shoulder pain or instability',iv:'HEAVY (full range, high load, supervised twice a week) vs LIGHT (mid-range, low load), 3 times a week',du:'16 weeks (1-year follow-up)',ef:'WOSI −174.5 (95% CI −341.4 to −7.7) favouring HEAVY, below the MID of 252; at 1 year −92.9 (−257.4 to 71.5), not significant. Pain fell 0.89 vs 0.33 points, no between-group difference.',c:'[[Liaghat2022BJSM,Liaghat2024BJSM,Liaghat2025]]'},
    {n:'Spanhove 2023 · home programmes',d:'RCT',o:['fn'],ev:'early',pop:'21 people with hEDS/HSD and multidirectional shoulder instability',iv:'Two home exercise programmes',du:'6 months',ef:'No difference between programmes; both improved WOSI by 240 points at 12 weeks and 325 at 24 weeks. Fear of movement (Tampa) did not change.',c:'[[Spanhove2023]]'},
    {n:'Pacey 2013 · into range or to neutral',d:'RCT',o:['pain'],ev:'early',pop:'26 children aged 7–16 with JHS and knee pain',iv:'Exercise into the hypermobile range vs only to neutral knee extension',du:'8 weeks',ef:'Worst knee pain fell by a mean 14.5 mm on a VAS (95% CI 5.2 to 23.8) whichever group; no adverse events.',c:'[[Pacey2013]]'},
    {n:'Kemp 2010 · generalised vs targeted',d:'RCT',o:['pain','fn'],ev:'early',pop:'57 children aged 7–16',iv:'Generalised fitness vs targeted joint-control physiotherapy',du:'6 weeks',ef:'Both cut child and parent pain scores, no difference between them; parental global assessment favoured targeted (−21.29; 95% CI −40.03 to −2.55).',c:'[[Kemp2010]]'},
    {n:'Bale 2019 · the Bendy Study',d:'RCT',o:['pain','fn'],ev:'early',pop:'119 children aged 5–16',iv:'Tailored physiotherapy plus OT with a school visit vs standard advice',du:'8 weeks (12-month outcome)',ef:'No additional benefit at 12 months; pain, coordination and grip strength improved in both arms.',c:'[[Bale2019]]'},
    {n:'Ferrell 2004 · closed-chain proprioception',d:'Cohort',o:['prop','pain','str'],ev:'early',pop:'18 people with JHS',iv:'Progressive closed kinetic chain home exercise',du:'8 weeks',ef:'Knee proprioception improved in 16 of 18 (P<0.001); balance, strength and pain (P=0.003) also improved. No control group.',c:'[[Ferrell2004]]'},
    {n:'Sahin 2008 · proprioceptive exercise',d:'Controlled',o:['prop','pain'],ev:'early',pop:'40 people with BJHS (15 exercise, 25 controls)',iv:'Clinic-based proprioceptive exercise',du:'8 weeks',ef:'Pain fell and occupational activity improved only in the exercise group.',c:'[[Sahin2008]]'},
    {n:'Daman 2019 · combined exercise',d:'RCT',o:['prop','pain'],ev:'early',pop:'24 people with hypermobility syndrome',iv:'Closed-chain plus proprioceptive exercise, 3 days a week',du:'4 weeks',ef:'Knee proprioception, pain and quality of life improved compared with no intervention.',c:'[[Daman2019]]'},
    {n:'Toprak Celenay 2017 · spinal stabilisation',d:'RCT',o:['pain','prop'],ev:'early',pop:'38 women with BJHS (20 exercise, 18 control)',iv:'Lumbar stabilisation exercise, 3 days a week',du:'8 weeks',ef:'Pain, trunk muscle endurance and dynamic stability (eyes open) improved compared with controls.',c:'[[ToprakCelenay2017]]'},
    {n:'Luder 2021 · self-guided resistance',d:'RCT',o:['str'],ev:'early',pop:'51 women with Beighton ≥6/9',iv:'Self-guided leg and trunk resistance training twice a week',du:'12 weeks',ef:'No improvement in strength or muscle mass compared with controls; 63% did more than 80% of sessions.',c:'[[Luder2021]]'},
    {n:'Benistan 2024 · compression garments',d:'RCT',o:['prop','pain'],ev:'early',pop:'36 people with hEDS',iv:'12 physiotherapy sessions with or without daily compression garments',du:'4 weeks',ef:'Dynamic balance improved more with garments (sway velocity effect size 0.93); pain fell in both groups, no difference.',c:'[[Benistan2024]]'},
    {n:'Susanne 2025 · exercise vs orthosis',d:'RCT',o:['fn','pain','str'],ev:'early',pop:'169 adults with HSD/hEDS and hand pain or paraesthesia',iv:'Progressive wrist-stabilising exercise vs a hand orthosis',du:'12 weeks',ef:'No difference in DASH, grip, EQ-5D, pain or paraesthesia; 116 completed.',c:'[[Susanne2025]]'},
    {n:'Reychler 2019 · inspiratory muscle training',d:'RCT',o:['str','fn'],ev:'early',pop:'40 women with hEDS (20 per group)',iv:'Inspiratory muscle training',du:'6 weeks',ef:'SNIP 41 to 49 cmH2O; 6-minute walk 455 to 515 m; FEV1 94% to 103% predicted.',c:'[[Reychler2019]]'},
    {n:'Chew 2025 · HOPE online programme',d:'Pilot RCT',o:['pain','fn'],ev:'early',pop:'70 people with hEDS/HSD (36 vs 34 usual care)',iv:'Online, self-paced pain-management programme, 12 modules',du:'8 weeks',ef:'81–91% rated it feasible; at 3 months worst pain d 0.63 and impact of hypermobility (BIoH) d 0.32.',c:'[[Chew2025]]'},
    {n:'Russek 2026 · online Pilates',d:'Pragmatic trial',o:['fn'],ev:'early',pop:'420 people with symptomatic hypermobility (200 Pilates vs 220 waitlist)',iv:'Online modified Pilates, ~25-minute modules, at least 3 days a week',du:'8 weeks (6-month follow-up)',ef:'BIoH, body awareness and kinesiophobia improved (p<0.001 each), "modest" changes, held at 6 months; physical activity unchanged; high dropout; declared conflict of interest.',c:'[[Russek2026]]'},
    {n:'Rahman 2014 · CBT pain programme',d:'Open study',o:['pain'],ev:'early',pop:'87 people with JHS (96% female)',iv:'Cognitive behavioural pain-management programme, 8 days',du:'6 weeks (5-month follow-up)',ef:'All outcomes improved at 1 month (P<0.001); by 5 months scores drifted back, though all except average pain stayed significantly better. No control group.',c:'[[Rahman2014]]'},
    {n:'Palmer 2021 · systematic review',d:'Review',o:['pain','fn','prop','str'],ev:'est',pop:'11 exercise-based studies (8 controlled trials, 3 cohorts)',iv:'Conservative, exercise-based care',du:'Varied',ef:'Only 3 small controlled studies beat a control; evidence of superiority "weak", improvement over time consistent; attrition 0–44%.',c:'[[Palmer2021]]'},
    {n:'Reychler 2021 · systematic review',d:'Review',o:['pain','prop'],ev:'early',pop:'6 RCTs, 20–57 patients each',iv:'Physical therapy of any type',du:'4–8 weeks',ef:'Pain or proprioception improved in intervention groups whatever the type; quality of life "was systematically improved".',c:'[[Reychler2021]]'},
    {n:'Buryk-Iggers 2022 · systematic review',d:'Review',o:['pain','fn','str'],ev:'early',pop:'10 studies, 330 adults, all EDS types plus HSD',iv:'Exercise and rehabilitation',du:'Varied',ef:'Every study showed some physical or psychological improvement; 1 non-serious adverse event possibly linked (<1% of participants).',c:'[[BurykIggers2022]]'}
  ];
  const EVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
  const OL={pain:'pain',fn:'function',prop:'proprioception & balance',str:'strength & fitness'};
  function renderTrials(f){
    const list=T.filter(x=>f==='all'||x.o.includes(f));
    $('#phTrials').innerHTML=list.map(x=>`<article class="phtrial"><div class="chips"><span class="tag rx">${x.d}</span>${EVL[x.ev]}</div><h4>${x.n}</h4><dl><dt>Who</dt><dd>${x.pop}</dd><dt>What</dt><dd>${x.iv}</dd><dt>How long</dt><dd>${x.du}</dd><dt>Result</dt><dd>${x.ef} ${x.c}</dd></dl><div class="chips">${x.o.map(o=>`<span class="tag">${OL[o]}</span>`).join('')}</div></article>`).join('');
    $('#phCount').textContent=`${list.length} of ${T.length} studies`}
  $$('[data-phf]').forEach(b=>b.addEventListener('click',()=>{$$('[data-phf]').forEach(x=>x.setAttribute('aria-pressed',x===b));renderTrials(b.dataset.phf)}));
  renderTrials('all');

  /* ---------- "is it safe to...?" ---------- */
  const NONE={g:'',l:'No statement found',x:'The sources reviewed for this guide make no specific statement for this type. Ask the team that knows you.'};
  const S=[
    {q:'Lift heavier weights?',
     h:{g:'good',l:'Studied: supervised, progressive',x:'In a 100-person RCT in HSD with shoulder symptoms, supervised high-load training (pain below 5/10 allowed) caused no serious adverse events; soreness (56% vs 37%) and headaches (40% vs 20%) were more common than with low load. Many clinicians have avoided high loads; the question is not settled. [[Liaghat2022BJSM,Liaghat2024BJSM]]'},
     c:{g:'warn',l:'Caution',x:'GeneReviews lists "sports with heavy joint strain" to avoid in classical EDS, and says non-weight-bearing exercise promotes muscle strength and coordination. [[Malfait2024GR]]'},
     v:{g:'bad',l:'Avoid, as published',x:'GeneReviews lists heavy lifting and weight training with extreme lifting among the things to avoid in vascular EDS. [[Byers2025GR]]'}},
    {q:'Play contact or collision sport?',
     h:{g:'warn',l:'Higher injury risk',x:'Generalised joint hypermobility raised the odds of knee injury in contact sport (OR 4.69; 95% CI 1.33–16.52), not ankle injury. For upper cervical instability, consensus advises sport-specific training "with precautions such as avoiding contact sports such as football", or changes such as no heading the ball. [[Pacey2010,Russek2022UCI]]'},
     c:{g:'warn',l:'Caution',x:'Sports with heavy joint strain are listed to avoid. Children with fragile skin can wear soccer pads or ski stockings with shin padding during activities. [[Malfait2024GR]]'},
     v:{g:'bad',l:'Avoid, as published',x:'Collision sports are listed to avoid, and the Orphanet review states that "violent sports are inadvisable". [[Byers2025GR,Germain2007]]'}},
    {q:'Go scuba diving?',h:NONE,c:NONE,
     v:{g:'bad',l:'Inadvisable, as published',x:'"Intense physical activity, scuba diving and violent sports are inadvisable." [[Germain2007]]'}},
    {q:'Do yoga or see a chiropractor?',
     h:{g:'warn',l:'Not contraindicated, with care',x:'GeneReviews says chiropractic adjustment and yoga are "not contraindicated", but, like all physical treatments, must avoid causing subluxations or dislocations. Many people with HSD/hEDS report injuries "due to inappropriate interventions". [[Hakim2024GR,Russek2019]]'},
     c:NONE,
     v:{g:'warn',l:'Caution',x:'No trial defines a safe dose of stretching in vEDS. One case report describes bleeding into muscle during passive hamstring stretching after a stroke and urges caution. [[Izumi2025]]'}},
    {q:'Have neck manipulation or strong neck exercises?',
     h:{g:'bad',l:'Specialist only',x:'For upper cervical instability, the consensus advises highly irritable patients to avoid moderate to large neck movements, isometrics with more than minimal force, and axial loading or distraction. "If in doubt", avoid touching the cervical spine; only clinicians with specific expertise should do cervical manual therapy. [[Russek2022UCI]]'},
     c:{g:'bad',l:'Specialist only',x:'The upper cervical instability consensus covers symptomatic generalised hypermobility: "if in doubt", avoid touching the cervical spine. [[Russek2022UCI]]'},
     v:{g:'warn',l:'Minimise injury',x:'No neck-specific statement was found. The vEDS consensus recommends adapting lifestyle "to minimize injury, risk of vessel/organ rupture". [[Byers2017]]'}},
    {q:'Do high-impact activity, like jumping?',
     h:{g:'warn',l:'May raise risk',x:'GeneReviews says high-impact activity may increase the risk of acute subluxation or dislocation and of pain. A 10-week group running programme for 8 hypermobile children was feasible, with one minor adverse event. [[Hakim2024GR,Chappell2026]]'},
     c:{g:'warn',l:'Caution',x:'Sports with heavy joint strain are listed to avoid; non-weight-bearing exercise is suggested instead. [[Malfait2024GR]]'},
     v:{g:'bad',l:'Inadvisable, as published',x:'"Intense physical activity" is inadvisable. [[Germain2007]]'}},
    {q:'Keep up regular, gentle exercise?',
     h:{g:'good',l:'The cornerstone',x:'Exercise-based physiotherapy is the cornerstone of care; improvement over time is consistent, even though superiority over comparators is weakly shown. People given exercise advice by a physiotherapist were more likely to exercise a lot each week (OR 1.75). [[Palmer2021,Simmonds2019]]'},
     c:{g:'good',l:'Encouraged',x:'Non-weight-bearing exercise promotes muscle strength and coordination. [[Malfait2024GR]]'},
     v:{g:'good',l:'Encouraged, low intensity',x:'The UK national service advises that "regular, low-intensity exercise should be maintained for health and psychological wellbeing". [[Bowen2023]]'}},
    {q:'Exercise when POTS makes standing hard?',
     h:{g:'good',l:'Guideline-supported',x:'The heart rhythm consensus gives a structured, progressive exercise programme Class IIa and advises starting in non-upright forms (rowing machine, recumbent bike, swimming). In POTS generally, about 3 months of endurance then resistance training, moving from lying to upright, reduced symptoms; evidence in hypermobility is early. [[Sheldon2015,Peebles2024]]'},
     c:{g:'good',l:'Guideline-supported',x:'The POTS exercise advice is not type-specific: start non-upright and build gradually. [[Sheldon2015]]'},
     v:{g:'warn',l:'Low intensity',x:'Build gently and keep intensity low: intense physical activity is inadvisable in vEDS. [[Germain2007,Bowen2023]]'}}
  ];
  let ty='h';const open=new Set();
  function renderSafe(){
    $('#phSafe').innerHTML=S.map((x,i)=>{const a=x[ty],on=open.has(i);
      return `<div class="phq"><button aria-pressed="${on}" data-phq="${i}" aria-controls="phAns${i}">${x.q}</button><div class="ans" id="phAns${i}" ${on?'':'hidden'}><span class="tag ${a.g}">${a.l}</span><p>${a.x}</p></div></div>`}).join('')}
  $('#phSafe').addEventListener('click',e=>{const b=e.target.closest('[data-phq]');if(!b)return;const i=+b.dataset.phq;open.has(i)?open.delete(i):open.add(i);renderSafe();const nb=$(`[data-phq="${i}"]`);nb&&nb.focus()});
  $$('[data-phty]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.phty;$$('[data-phty]').forEach(x=>x.setAttribute('aria-pressed',x===b));renderSafe()}));
  renderSafe();
};
