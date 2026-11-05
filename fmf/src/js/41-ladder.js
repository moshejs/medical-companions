/* =============== 4.1 the treatment ladder =============== */
const LD_RUNGS=[
 {t:'Clinical diagnosis',s:'EULAR: colchicine from this point'},
 {t:'Starting dose by age',s:'EULAR 2016 bands, single or divided'},
 {t:'Maximum tolerated dose',s:'adherence first · CRP/SAA every 3 months'},
 {t:'Resistant or intolerant',s:'the definitions, and what they require'},
 {t:'Add IL-1 blockade',s:'colchicine continues alongside it'},
 {t:'Other options',s:'weaker or negative evidence'}
];
const LD_STEPS=[
 {from:0,at:.04,k:'Rung 1 · Start',t:'Colchicine at clinical diagnosis',
  txt:'EULAR 2016 recommendation 3 says colchicine should start as soon as a clinical diagnosis of FMF is made (level of evidence 1b). The 2024 update keeps this, and both versions allow the daily amount to be given once a day or split through the day. A Cochrane review of 10 randomised trials in 312 participants, and the 2025 systematic review written for the update, found once-daily and divided dosing equivalent. [[Ozen2016,Ozen2025,RheumNow2025,Yin2022,Sag2025]]',
  pt:'Treatment does not wait for the gene test. Once the clinical picture fits FMF, published guidance starts colchicine.',
  hook:'Colchicine is <b>prophylaxis</b>, started on clinical grounds, taken for life. Genetics support the diagnosis; they do not gate the treatment.'},
 {from:.16,at:.2,k:'Rung 2 · Dose',t:'2016 starting doses by age',
  txt:'The 2016 paper gives starting bands of up to 0.5 mg a day under age 5, 0.5 to 1.0 mg a day at ages 5 to 10, and 1.0 to 1.5 mg a day over age 10 and in adults. The stated ceilings are 2 mg a day in children and 3 mg a day in adults, and the 2024 update keeps the same two ceilings. These are published figures quoted for study. The dose for any individual is set by their clinician. [[Ozen2016,Ozen2025,RheumNow2025,Ozen2017]]',
  pt:'Published guidance starts children low and adults a little higher, with a ceiling for each.',
  hook:'Ceilings to remember: <b>2 mg/day children, 3 mg/day adults</b>. Starting band over age 10 is 1.0 to 1.5 mg/day.'},
 {from:.32,at:.36,k:'Rung 3 · Titrate',t:'Up to the maximum tolerated dose',
  txt:'If attacks or subclinical inflammation continue in a patient who is taking the tablets, the 2016 guideline raises the dose in steps of about 0.5 mg a day, and asks for CRP or SAA at least every 3 months while the dose is being escalated. Those escalation statements are about attacks or inflammation that persist over time, not about stopping an attack already under way. Adherence is checked first because in one Israeli clinic only 13% of patients filled every prescription over a year, and poor adherence is a frequent reason for apparent resistance. [[Ozen2016,Ozen2017,RheumNow2025,BenChetrit2009D]]',
  pt:'If attacks continue, the dose goes up step by step. Before that, the first question is whether the tablets are actually being taken every day.',
  hook:'Order matters: <b>adherence → maximum tolerated dose → only then "resistant"</b>.'},
 {from:.48,at:.52,k:'Rung 4 · Define',t:'Resistant, or intolerant',
  txt:'EULAR 2016: an adherent patient who keeps having one or more attacks a month despite the maximum tolerated dose for at least 6 months may be considered a non-responder. The 2021 modified-Delphi consensus defines resistance as recurrent attacks averaging at least one a month over 3 months, or persistent laboratory inflammation between attacks, at the maximum tolerated dose with adherence confirmed. Intolerance is the separate situation where side effects stop the dose from being raised; roughly 5 to 10% are resistant and another 2 to 5% intolerant. [[Ozen2016,Ozen2021,Ozen2017,BenChetrit2018Textbook]]',
  pt:'"Resistant" is a defined label, not a feeling. It needs a minimum number of attacks, a minimum time, the highest tolerated dose and proof the tablets were taken.',
  hook:'2016: <b>≥1 attack/month for ≥6 months at max tolerated dose</b>. 2021 Delphi: <b>≥1/month over 3 months, or persistent inflammation between attacks</b>.'},
 {from:.64,at:.68,k:'Rung 5 · Add on',t:'IL-1 blockade, with colchicine continuing',
  txt:'Biologics are indicated in resistant disease and colchicine is continued alongside them, because colchicine may still lower amyloid risk. The three IL-1 blockers studied in FMF are anakinra (an IL-1 receptor antagonist, given daily), canakinumab (an anti-IL-1β antibody, every 4 weeks) and rilonacept (an IL-1 trap, given weekly in its trial). They are not interchangeable: canakinumab is the one with an FMF dose written into the US prescribing information, while the anakinra and rilonacept evidence in FMF rests on two small randomised trials of 25 and 14 patients. The 2024 update names IL-1 targeting drugs as the add-on with the strongest evidence, and adds statements on optimising the biologic dose and on tapering or stopping once remission is reached. [[Ozen2016,Ozen2025,RheumNow2025,BenZvi2017,DeBenedetti2018,Hashkes2012,IlarisPI,Sag2025]]',
  pt:'If attacks keep coming at the top dose, a drug that blocks the IL-1 signal is added. The colchicine does not stop.',
  hook:'Three IL-1 blockers, three rhythms: <b>anakinra daily, canakinumab every 4 weeks, rilonacept weekly</b>. All are add-ons, not replacements, and the evidence behind them is not equal.'},
 {from:.82,at:.9,k:'Rung 6 · Beyond',t:'Other options, weaker evidence',
  txt:'Tocilizumab blocks the IL-6 receptor. Both of its randomised trials failed: a German phase II trial in 25 patients missed its primary endpoint, although SAA normalised, and a Japanese phase III trial also missed its primary endpoint (rate ratio 0.691, P=0.577). Its lower attack recurrence in that trial (HR 0.457) is a secondary finding in a trial that did not meet its primary endpoint, so neither trial establishes that tocilizumab works in FMF. TNF inhibitors have been used mainly in colchicine-resistant patients with joint involvement, in observational studies only; chronic arthritis affects about 5% of patients and may need DMARDs, joint injections or biologics. For JAK inhibitors there are only case series of four patients or fewer: four patients refractory to IL-1, anti-TNF and tocilizumab improved on tofacitinib, and no randomised trial of any JAK inhibitor in FMF exists. No established mechanism links JAK/STAT signalling to pyrin inflammasome activation, whose output is IL-1β, IL-18 and gasdermin D, so any benefit would have to act on downstream amplification rather than on the FMF lesion itself. [[Henes2022,Koga2022,Mertz2025,Ozen2016,Karadeniz2020,Park2016]]',
  pt:'Past IL-1 blockade the evidence thins out fast: one drug class failed both its randomised trials, one has only observational support, and one has only a handful of reported patients.',
  hook:'Tocilizumab: <b>both randomised trials missed their primary endpoints</b>; SAA normalised in the German one. Anti-TNF: joints, observational. JAK inhibitors: <b>case series of four or fewer, and no pyrin-pathway mechanism</b>.'}
];
inits.ladder=()=>{
  const svg=$('#ldSvg'),rg=$('#ldT');
  const wrapT=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  /* each rung shows what it means: colchicine tablets whose count rises with the dose,
     an injection at the IL-1 rung, a dashed vial where the evidence thins out, and a
     colchicine thread that keeps running up alongside the biologic rungs */
  const LD_GLY=[{p:1},{p:2},{p:4},{p:4,atk:1},{syr:1},{vial:1}];
  const pill=(x,y,r)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--crocus);stroke:var(--crocus);stroke-width:1.2"/><line x1="${f1(x-r*.5)}" x2="${f1(x+r*.5)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--panel);stroke-width:1.1;opacity:.75"/>`;
  const syringe=(x,y)=>`<g transform="translate(${f1(x)} ${f1(y)})"><line x1="0" x2="8" y1="0" y2="0" style="stroke:var(--sea);stroke-width:1.6"/><rect x="-24" y="-6.5" width="24" height="13" rx="2.5" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/><rect x="-22.5" y="-4.5" width="11" height="9" rx="1.5" style="fill:var(--sea)"/><line x1="-30" x2="-24" y1="0" y2="0" style="stroke:var(--sea);stroke-width:1.6"/><line x1="-30" x2="-30" y1="-5" y2="5" style="stroke:var(--sea);stroke-width:2.2"/></g>`;
  const vial=(x,y)=>`<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-17" y="-4" width="16" height="15" rx="2.5" style="fill:none;stroke:var(--warn);stroke-width:1.5;stroke-dasharray:3 3"/><rect x="-13.5" y="-10" width="9" height="6" rx="1.5" style="fill:none;stroke:var(--warn);stroke-width:1.4"/></g>`;
  const atk=(x,y)=>`<path d="M${f1(x-5)} ${f1(y+5)}L${f1(x)} ${f1(y-5)}L${f1(x+5)} ${f1(y+5)}z" style="fill:var(--terra)"/>`;
  function draw(t){
    const N=vb(svg,'720 430','400 772');
    const L=N
      ? {X0:24,X1:358,BX:38,BW:306,TX:52,RY0:360,P:58,BH:48,TY:-6,SY:14,GR:336,GP:13,TR:4.5,GY:-11,THX:288,CLX:372,
         PX:14,PY:410,PW:372,QX:14,QY:626,QW:372}
      : {X0:72,X1:404,BX:88,BW:310,TX:102,RY0:392,P:62,BH:40,TY:-3,SY:13,GR:392,GP:14,TR:5,GY:0,THX:336,CLX:420,
         PX:450,PY:40,PW:258,QX:450,QY:256,QW:258};
    const RY=i=>L.RY0-i*L.P;
    let s=`<defs>${marker('ldA','var(--sea)')}</defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const lit=LD_RUNGS.map((r,i)=>ease(ramp(t,LD_STEPS[i].from+.005,LD_STEPS[i].from+.085)));
    // rails
    const topY=RY(5)-L.BH/2-6,botY=RY(0)+L.BH/2+8;
    [L.X0,L.X1].forEach(x=>{s+=`<line x1="${x}" x2="${x}" y1="${botY}" y2="${topY}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/>`;
      const h=(botY-topY)*clamp(lit.reduce((a,b)=>a+b,0)/6);
      s+=`<line x1="${x}" x2="${x}" y1="${botY}" y2="${f1(botY-h)}" style="stroke:var(--sea);stroke-width:5;stroke-linecap:round"/>`});
    s+=`<text x="${L.X0}" y="${topY-10}" class="t-sm" style="fill:var(--sea)">ESCALATION ↑</text>`;
    // rungs
    LD_RUNGS.forEach((r,i)=>{const cy=RY(i),o=lit[i],g=LD_GLY[i],gy=cy+L.GY;
      s+=`<g class="clk" data-rung="${i}">`;
      s+=`<rect x="${L.BX}" y="${f1(cy-L.BH/2)}" width="${L.BW}" height="${L.BH}" rx="11" style="fill:${o>.5?'var(--sea-soft)':'var(--panel-2)'};stroke:${o>.5?'var(--sea)':'var(--line)'};stroke-width:${f1(1+1.4*o)}"/>`;
      s+=`<text x="${L.TX}" y="${f1(cy+L.TY)}" class="t-lbl" style="fill:${o>.5?'var(--sea)':'var(--muted)'}">${r.t}</text>`;
      s+=`<text x="${L.TX}" y="${f1(cy+L.SY)}" class="t-xs">${r.s}</text>`;
      s+=`<g style="opacity:${f1(.3+.7*o)}">`;
      if(g.p)for(let k=0;k<g.p;k++)s+=pill(L.GR-k*L.GP,gy,L.TR);
      if(g.atk)s+=atk(L.GR-1.5*L.GP,gy+L.TR+9);
      if(g.syr)s+=syringe(L.GR-8,gy);
      if(g.vial)s+=vial(L.GR+1,gy);
      s+='</g>';
      s+=`<circle cx="${L.X0}" cy="${cy}" r="13" style="fill:${o>.5?'var(--sea)':'var(--panel)'};stroke:${o>.5?'var(--sea)':'var(--line)'};stroke-width:2"/>`;
      s+=`<text x="${L.X0}" y="${cy+4}" class="t-xs t-mid" style="fill:${o>.5?'var(--on-sea)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+='</g>'});
    // the colchicine thread: the tablets do not stop when the injection starts
    s+=`<g style="opacity:${f1(.25+.75*lit[4])}">`;
    s+=`<line x1="${L.THX}" x2="${L.THX}" y1="${f1(RY(3)-L.BH/2)}" y2="${f1(topY-4)}" style="stroke:var(--crocus);stroke-width:3;stroke-linecap:round;opacity:.6"/>`;
    [4,5].forEach(i=>{s+=pill(L.THX,RY(i),L.TR-.5)});
    s+=`<text x="${L.GR+5}" y="${f1(topY-10)}" class="t-xs t-end" style="fill:var(--crocus)">colchicine continues ↑</text>`;
    s+='</g>';
    // climber
    const pos=clamp((t-.04)/.86)*5, cyC=RY(0)-pos*L.P;
    s+=`<g transform="translate(${L.CLX} ${f1(cyC)})"><circle r="9" style="fill:var(--terra);opacity:.25"/><circle r="5" style="fill:var(--terra)"/></g>`;
    s+=N?`<text transform="rotate(90 ${L.CLX+16} ${f1(cyC)})" x="${L.CLX+16}" y="${f1(cyC)}" class="t-xs t-mid" style="fill:var(--terra)">you are here</text>`
        :`<text x="${L.CLX+14}" y="${f1(cyC+4)}" class="t-xs" style="fill:var(--terra)">you are here</text>`;
    // side lane: during an attack
    const o2=ease(ramp(t,.26,.44));
    s+=`<g style="opacity:${f1(.15+.85*o2)}"><rect x="${L.PX}" y="${L.PY}" width="${L.PW}" height="196" rx="12" style="fill:var(--panel);stroke:var(--terra);stroke-width:1.6"/>`;
    s+=`<text x="${L.PX+14}" y="${L.PY+22}" class="t-sm" style="fill:var(--terra)">${N?'DURING AN ATTACK · WHAT 2016 AND 2024 SAY':'DURING AN ATTACK · 2016 AND 2024'}</text>`;
    const lines=['continue the usual colchicine dose','NSAIDs for symptoms','always consider other causes,','for example appendicitis'];
    lines.forEach((Ln,i)=>{const oo=ease(ramp(t,.28+i*.03,.36+i*.03));
      s+=`<text x="${L.PX+26}" y="${L.PY+48+i*20}" class="t-xs" style="opacity:${f1(oo)};fill:var(--ink)">${Ln}</text>`;
      if(i<3)s+=`<circle cx="${L.PX+16}" cy="${L.PY+44+i*20}" r="2.6" style="fill:var(--terra);opacity:${f1(oo)}"/>`});
    s+=`<line x1="${L.PX+14}" x2="${L.PX+L.PW-14}" y1="${L.PY+138}" y2="${L.PY+138}" class="grid"/>`;
    ['2016 only: a prodrome dose rise is','reported but unproven. In stressful','periods an increase may be considered.']
      .forEach((Ln,i)=>{s+=`<text x="${L.PX+14}" y="${L.PY+156+i*13}" class="t-xs">${Ln}</text>`});
    s+='</g>';
    // target box
    const o3=ease(ramp(t,.55,.72));
    s+=`<g style="opacity:${f1(.12+.88*o3)}"><rect x="${L.QX}" y="${L.QY}" width="${L.QW}" height="136" rx="12" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+22}" class="t-sm" style="fill:var(--sea)">THE TWO TARGETS</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+46}" class="t-lbl">1 · no or minimal attacks</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+70}" class="t-lbl">2 · inflammation controlled</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+87}" class="t-xs">between attacks, by SAA or CRP</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+112}" class="t-xs">2024 update: both targets, to</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+125}" class="t-xs">prevent damage over a lifetime</text>`;
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(LD_STEPS,t);setSt(p);
    $('#ldNote').innerHTML=noteHTML(LD_STEPS[p]);
    $('#ldCap').textContent=`Rung ${p+1} of 6 lit. Click any rung to jump to it. Schematic, not to scale.`;
  }
  const stop=playWire(rg,$('#ldPlay'),draw,17000,'Replay','ladder');
  const setSt=stepWire($('#ldSteps'),LD_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-rung]');if(!g)return;stop();const a=LD_STEPS[+g.dataset.rung].at;rg.value=a;draw(a)});
  draw(+rg.value);

  /* ---- trial bars ---- */
  const bs=$('#ldBars'),br=$('#ldB');
  const LD_PCT=[
   {l:'CLUSTER',s2:'crFMF 150 mg',a:61,p:6},
   {l:'CLUSTER',s2:'MKD / HIDS',a:35,p:6},
   {l:'CLUSTER',s2:'TRAPS',a:45,p:8},
   {l:'escalated',s2:'crFMF 300 mg',a:71,p:null},
   {l:'every 8 weeks',s2:'stayed controlled',a:46,p:null}
  ];
  const LD_ATT=[
   {l:'Anakinra RCT',s2:'n=25, attacks/month',a:1.7,p:3.5,ad:'1.7',pd:'3.5'},
   {l:'Rilonacept',s2:'n=14, median/month',a:0.77,p:2.00,ad:'0.77',pd:'2.00'}
  ];
  const LD_CAVA='63 FMF patients, randomised at a flare · endpoint: flare resolution, no new flare to week 16';
  const LD_CAVB='last two bars have no placebo comparator: 300 mg escalation, and extended every-8-week dosing';
  const LD_COCH='Cochrane re-analysis, moderate certainty: no clear difference in the number of patients having attacks for anakinra (RR 0.76, 0.54–1.07) or rilonacept (RR 0.87, 0.59–1.26). Only canakinumab reached RR 0.41 (0.26–0.65).';
  const LD_TOCI=[['phase II (n=25): missed its primary','ink'],['endpoint, but SAA normalised','ink'],['phase III: missed too (RR 0.691,',''],['P=0.577); no efficacy shown','']];
  /* narrow: the grouped vertical bars become horizontal bars, one trial per block,
     each trial's name on its own line above its bars, so nothing is squeezed */
  function drawBN(t){
    const BX0=14,BX1=316,pw=BX1-BX0;let s='';
    s+=`<text x="14" y="24" class="t-sm" style="fill:var(--sea)">CANAKINUMAB IN CLUSTER</text>`;
    s+=`<text x="14" y="38" class="t-xs">complete response at week 16 vs placebo</text>`;
    const pairsOf=g=>g.p==null?[[g.a,'var(--sea)','']]:[[g.p,'var(--muted)','placebo'],[g.a,'var(--sea)','drug']];
    const aTop=52, aH=LD_PCT.reduce((a,g)=>a+(g.p==null?44:62),0), aBot=aTop+aH-10;
    [0,25,50,75,100].forEach(v=>{const x=lerp(BX0,BX1,v/100);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${aTop}" y2="${aBot}" class="grid"/><text x="${f1(x)}" y="${aBot+16}" class="t-xs t-mid">${v}%</text>`});
    let y=aTop;
    LD_PCT.forEach((g,i)=>{const k=ease(ramp(t,i*.1,i*.1+.42)),prs=pairsOf(g);
      s+=`<text x="14" y="${y+10}" class="t-xs" style="fill:var(--ink)">${g.l} · ${g.s2}</text>`;
      prs.forEach((pr,j)=>{const by=y+16+j*18,w=pw*pr[0]/100*k;
        s+=`<rect x="${BX0}" y="${by}" width="${f1(w)}" height="14" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(BX0+w+6)}" y="${by+11}" class="t-xs" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[0]}%${pr[2]?' '+pr[2]:''}</text>`});
      y+=prs.length>1?62:44});
    y=aBot+34;
    wrapT(LD_CAVA,58).concat(wrapT(LD_CAVB,58)).forEach(l=>{s+=`<text x="14" y="${y}" class="t-xs">${l}</text>`;y+=14});
    // panel B
    y+=12;
    s+=`<text x="14" y="${y}" class="t-sm" style="fill:var(--terra)">ATTACKS PER MONTH · lower is better</text>`;y+=14;
    s+=`<text x="14" y="${y}" class="t-xs">as each trial reported it</text>`;y+=14;
    const bTop=y, bBot=bTop+LD_ATT.length*62-10;
    [0,1,2,3,4].forEach(v=>{const x=lerp(BX0,BX1,v/4);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${bTop}" y2="${bBot}" class="grid"/><text x="${f1(x)}" y="${bBot+16}" class="t-xs t-mid">${v}</text>`});
    LD_ATT.forEach((g,i)=>{const k=ease(ramp(t,.4+i*.12,.86+i*.12)),yy=bTop+i*62;
      s+=`<text x="14" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${g.l} · ${g.s2}</text>`;
      [[g.p,'var(--muted)',g.pd,'placebo'],[g.a,'var(--sea)',g.ad,'drug']].forEach((pr,j)=>{const by=yy+16+j*18,w=pw*pr[0]/4*k;
        s+=`<rect x="${BX0}" y="${by}" width="${f1(w)}" height="14" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(BX0+w+6)}" y="${by+11}" class="t-xs" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[2]} ${pr[3]}</text>`});});
    // tocilizumab box
    y=bBot+34;
    const o=ease(ramp(t,.75,1));
    s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="14" y="${y}" width="372" height="92" rx="11" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6"/>`;
    s+=`<text x="28" y="${y+22}" class="t-sm" style="fill:var(--warn)">TOCILIZUMAB · IL-6 RECEPTOR</text>`;
    LD_TOCI.forEach((l,i)=>{s+=`<text x="28" y="${y+42+i*13+(i>1?5:0)}" class="t-xs"${l[1]?' style="fill:var(--ink)"':''}>${l[0]}</text>`});
    s+='</g>';
    // Cochrane caveat, on the face of the chart
    y+=108;
    s+=`<line x1="14" x2="386" y1="${y}" y2="${y}" class="grid"/>`;y+=18;
    wrapT(LD_COCH,58).forEach(l=>{s+=`<text x="14" y="${y}" class="t-xs" style="fill:var(--warn)">${l}</text>`;y+=14});
    return s;
  }
  function drawB(t){
    const N=vb(bs,'720 456','400 800');
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    if(N){bs.innerHTML=s+drawBN(t);return}
    // panel A
    const AX0=118,AX1=700,AY=206,ATOP=56,pc=v=>AY-(AY-ATOP)*v/100;
    s+=`<text x="14" y="34" class="t-sm" style="fill:var(--sea)">CANAKINUMAB IN CLUSTER · complete response at week 16 vs placebo</text>`;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${AX0}" x2="${AX1}" y1="${f1(pc(v))}" y2="${f1(pc(v))}" class="grid"/><text x="${AX0-8}" y="${f1(pc(v)+3)}" class="t-xs t-end">${v}%</text>`});
    s+=`<line x1="${AX0}" x2="${AX1}" y1="${AY}" y2="${AY}" class="axis"/>`;
    const gw=(AX1-AX0)/LD_PCT.length;
    LD_PCT.forEach((g,i)=>{const cx=AX0+gw*(i+.5),k=ease(ramp(t,i*.1,i*.1+.42));
      const bw=28,pairs=g.p==null?[[g.a,'var(--sea)','']]:[[g.p,'var(--muted)','placebo'],[g.a,'var(--sea)','drug']];
      pairs.forEach((pr,j)=>{const n=pairs.length,x=cx-(n*bw+8*(n-1))/2+j*(bw+8),h=(AY-ATOP)*pr[0]/100*k;
        s+=`<rect x="${f1(x)}" y="${f1(AY-h)}" width="${bw}" height="${f1(h)}" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(x+bw/2)}" y="${f1(AY-h-6)}" class="t-xs t-mid" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[0]}%</text>`});
      s+=`<text x="${f1(cx)}" y="${AY+18}" class="t-xs t-mid" style="fill:var(--ink)">${g.l}</text>`;
      s+=`<text x="${f1(cx)}" y="${AY+31}" class="t-xs t-mid">${g.s2}</text>`});
    s+=`<text x="${AX0}" y="${AY+44}" class="t-xs">63 FMF patients, randomised at a flare · endpoint: flare resolution, no new flare to week 16</text>`;
    s+=`<text x="${AX0}" y="${AY+56}" class="t-xs">last two bars have no placebo comparator: 300 mg escalation, and extended every-8-week dosing</text>`;
    // panel B
    const BX0=118,BX1=404,BY=372,BTOP=286,at=v=>BY-(BY-BTOP)*v/4;
    s+=`<text x="14" y="276" class="t-sm" style="fill:var(--terra)">ATTACKS PER MONTH · as each trial reported it (lower is better)</text>`;
    [0,1,2,3,4].forEach(v=>{s+=`<line x1="${BX0}" x2="${BX1}" y1="${f1(at(v))}" y2="${f1(at(v))}" class="grid"/><text x="${BX0-8}" y="${f1(at(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${BX0}" x2="${BX1}" y1="${BY}" y2="${BY}" class="axis"/>`;
    const gw2=(BX1-BX0)/LD_ATT.length;
    LD_ATT.forEach((g,i)=>{const cx=BX0+gw2*(i+.5),k=ease(ramp(t,.4+i*.12,.86+i*.12)),bw=30;
      [[g.p,'var(--muted)',g.pd],[g.a,'var(--sea)',g.ad]].forEach((pr,j)=>{const x=cx-(2*bw+8)/2+j*(bw+8),h=(BY-BTOP)*pr[0]/4*k;
        s+=`<rect x="${f1(x)}" y="${f1(BY-h)}" width="${bw}" height="${f1(h)}" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(x+bw/2)}" y="${f1(BY-h-6)}" class="t-xs t-mid" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[2]}</text>`});
      s+=`<text x="${f1(cx)}" y="${BY+18}" class="t-xs t-mid" style="fill:var(--ink)">${g.l}</text>`;
      s+=`<text x="${f1(cx)}" y="${BY+31}" class="t-xs t-mid">${g.s2}</text>`});
    // tocilizumab box
    const o=ease(ramp(t,.75,1));
    s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="440" y="282" width="268" height="104" rx="11" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6"/>`;
    s+=`<text x="454" y="304" class="t-sm" style="fill:var(--warn)">TOCILIZUMAB · IL-6 RECEPTOR</text>`;
    s+=`<text x="454" y="326" class="t-xs" style="fill:var(--ink)">phase II (n=25): missed its primary</text>`;
    s+=`<text x="454" y="339" class="t-xs" style="fill:var(--ink)">endpoint, but SAA normalised</text>`;
    s+=`<text x="454" y="357" class="t-xs">phase III: missed too (RR 0.691,</text>`;
    s+=`<text x="454" y="370" class="t-xs">P=0.577); no efficacy shown</text>`;
    s+='</g>';
    // Cochrane caveat, on the face of the chart
    s+=`<line x1="14" x2="706" y1="412" y2="412" class="grid"/>`;
    s+=`<text x="14" y="430" class="t-xs" style="fill:var(--warn)">Cochrane re-analysis, moderate certainty: no clear difference in the number of patients having attacks for</text>`;
    s+=`<text x="14" y="444" class="t-xs" style="fill:var(--warn)">anakinra (RR 0.76, 0.54–1.07) or rilonacept (RR 0.87, 0.59–1.26). Only canakinumab reached RR 0.41 (0.26–0.65).</text>`;
    bs.innerHTML=s;
  }
  playWire(br,$('#ldBPlay'),drawB,9000,'Replay','ladder');drawB(+br.value);

  $('#ldCards').innerHTML=`
   <div class="card"><h4>2016 vs the 2024 update</h4><ul>
     <li>Fewer, consolidated statements: <b>12 recommendations instead of 18</b>, plus 4 overarching principles, with agreement above 9/10 on every statement.</li>
     <li>More weight on <b>adherence</b>, which sits at the core of lifelong prophylaxis.</li>
     <li>A new statement on <b>colchicine overdose</b>, intentional or accidental, which can be fatal and must be assessed carefully.</li>
     <li>New statements on <b>optimising biologic doses and tapering</b> them once remission is reached.</li>
     <li>A <b>minimum outcome set</b>: attack frequency per 3 months, physician assessment, patient-reported outcome and experience measures, and CRP or SAA, plus quality indicators.</li>
     <li>No fixed monitoring interval is given; monitor more often at diagnosis and when disease is uncontrolled. [[Ozen2025,RheumNow2025,Ozen2016]]</li></ul></div>
   <div class="card"><h4>How CLUSTER was built</h4><p>A phase 3 randomised trial across three diseases at once: colchicine-resistant FMF, mevalonate kinase deficiency and TRAPS. Patients were randomised at the time of a flare to canakinumab 150 mg under the skin every 4 weeks or placebo. The primary endpoint was resolution of that flare with no new flare through week 16. The FMF cohort had 63 participants. A 72-week open-label extension showed sustained flare control with CRP and SAA normalised, which is durable suppression rather than cure: attacks return when the drug is withdrawn. [[DeBenedetti2018,Yin2022,Ozen2020]]</p></div>
   <div class="card"><h4>The canakinumab label dose</h4><p>The US prescribing information gives 150 mg every 4 weeks for FMF patients over 40 kg, or 2 mg/kg for 40 kg and under, increasable to 300 mg (4 mg/kg) if the response is not adequate. In CLUSTER, 71% of colchicine-resistant FMF patients responded at 300 mg every 4 weeks, and 46% stayed controlled when dosing was stretched to every 8 weeks. Quoted here as published label and trial figures, not as a dose for anyone: the dose for any individual is set by their clinician. [[IlarisPI,DeBenedetti2018]]</p></div>
   <div class="card"><h4>Colchicine does not stop</h4><p>When a biologic is added, guidelines continue colchicine alongside it, because colchicine carries the hard long-term outcome data on preventing AA amyloidosis: cumulative proteinuria of 1.7% at 11 years in adherent patients against 48.9% at 9 years in non-adherent ones, in 1,070 patients. The IL-1 blockers control attacks and acute-phase markers; they have no comparable multi-decade amyloid outcome data. [[Ozen2016,Zemer1986,Sag2025]]</p>
     <div class="pt"><b>In plain words</b>The new injection is added on top of the old tablet. It does not replace it.</div></div>
   <div class="card"><span class="ev early">Evidence check</span><h4>What the Cochrane review concluded</h4><p>Re-analysing the randomised trials, Cochrane rated the evidence for each IL-1 blocker as moderate certainty. Canakinumab reduced the number of patients with attacks (RR 0.41, 95% CI 0.26–0.65, 63 participants). For anakinra (RR 0.76, 0.54–1.07) and rilonacept (RR 0.87, 0.59–1.26) the confidence intervals crossed 1, so on that outcome the review found no clear difference from placebo, although anakinra did lower CRP. The individual trials still reported fewer attacks on drug; the bars above are those trial figures, and this re-analysis is the more cautious reading of the same data. The trials are small; the reviewers asked for more. [[Yin2022]]</p></div>
   <div class="card"><h4>Intolerance is not the same as resistance</h4><p>Resistance means attacks or inflammation persist at the maximum tolerated dose. Intolerance means side effects, most often diarrhoea and other gut symptoms, stop the dose from reaching that point. Roughly 5 to 10% of patients are described as resistant and another 2 to 5% as intolerant; both groups are the population every biologic trial recruits. [[Ozen2021,Ozen2017,BenChetrit2018Textbook]]</p></div>
   <div class="card"><h4>What a trial counted as success</h4><p>Different trials used different yardsticks, which is why the bars above cannot be compared across groups. CLUSTER used complete response at week 16. The anakinra trial counted attacks per month (1.7 vs 3.5, P=0.037) and how many patients fell below one attack a month (6 of 12 vs 0 of 13). The rilonacept trial compared median attack rates within the same patients on and off drug (0.77 vs 2.00, P=0.027), and 29% versus 0% of treatment courses were attack-free. A 2025 systematic review of 42 studies and 1,798 patients, including 6 randomised trials of IL-1 blockers, concluded they are effective and relatively safe in colchicine-unresponsive FMF. [[DeBenedetti2018,BenZvi2017,Hashkes2012,Hashkes2014,Sag2025]]</p></div>`;
};
