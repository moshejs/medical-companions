/* =============== 2.1 colchicine inside the cell =============== */
/* Adapted from the FMF Companion's 2.1: scenes 1–5 and 7 carry over, scene 6 (pyrin)
   becomes NLRP3 assembly on microtubules, and the neutrophil now faces a urate crystal. */
const CI_STEPS=[
 {from:0,at:.05,k:'Scene 1 · The gut',t:'Swallowed and absorbed',
  txt:'Colchicine is taken by mouth and absorbed in the small intestine. One 0.6 mg tablet gives a mean peak of 2.5 ng/mL 1–2 hours after a fasting dose, and absolute bioavailability is about 45%. P-glycoprotein in the gut wall pumps part of each dose back into the lumen, and intestinal CYP3A4 metabolises a little more. The US low-dose flare regimen (1.8 mg over 1 hour) peaked at a mean 6.2 ng/mL; the old high-dose regimen (4.8 mg over 6 hours) reached only 6.8 ng/mL. [[Rochdi1994,FDA-Colcrys,Slobodnick2018]]',
  pt:'The tablet is absorbed from the gut. Only part of each dose gets into the body, and piling on more tablets barely raises the peak.',
  hook:'Colchicine is a P-glycoprotein (ABCB1) and CYP3A4 substrate. Both matter for drug interactions. The extra 3 mg of the old high-dose flare regimen added almost nothing to the peak level.'},
 {from:.12,at:.17,k:'Scene 2 · Liver and bile',t:'Recycling through bile',
  txt:'The liver metabolises part of the drug through CYP3A4 and secretes some into bile. Bile returns it to the gut, where some is absorbed again. The label reports secondary plasma peaks 3–36 hours after a dose, put down to intestinal secretion and reabsorption or biliary recirculation, and most volunteers in one study had a second peak within 6 hours. The kidneys excrete a share unchanged; the US label reports 40–65% of a 1 mg dose in urine. A volume of distribution of about 6–7 L/kg gives a long half-life, but the figures disagree: 26.6–31.2 hours on repeated dosing in the label, 30–34 hours after one oral dose, 57.8 hours after an intravenous dose. [[FDA-Colcrys,Ferron1996,Rochdi1994]]',
  pt:'The liver sends the drug out in bile, and the gut takes some of it back up, so it lingers in the body.',
  hook:'Enterohepatic recirculation helps explain the long half-life. Treat the half-life as a <b>range</b> (about 27–58 h across studies), not one number.'},
 {from:.26,at:.34,k:'Scene 3 · Neutrophils',t:'It piles up in white cells',
  txt:'After a single 1 mg dose, plasma colchicine peaked at 1 hour but leukocyte colchicine peaked 47 hours later. On repeated dosing, granulocytes held about twice the concentration of mononuclear cells, and the leukocyte half-life was 41–46 hours. Granulocytes showed no surface P-glycoprotein and no pump function, so colchicine that enters them is not pushed back out. That this trapping explains the drug\'s selectivity is a hypothesis. Levels vary a lot between people: in 30 people taking 0.5 to 2 mg a day (for FMF), plasma and leukocyte levels did not track the dose taken, and uptake into leukocytes was saturable. [[Chappey1993,Klimecki1994,BenChetrit1998MH,Chappey1994]]',
  pt:'White blood cells soak the drug up and hold on to it. Plasma levels fall within hours, but levels inside the white cells stay up for days.',
  hook:'Plasma peak at <b>1 h</b>, leukocyte peak about <b>2 days</b> later. Low P-gp in neutrophils = intracellular trapping (proposed).'},
 {from:.45,at:.5,k:'Scene 4 · Tubulin',t:'Binding free tubulin',
  txt:'Inside the cell colchicine binds free β-tubulin at the "colchicine site". The tubulin–colchicine complex adds to the growing end of a microtubule and stops further growth. The US label describes the same step: colchicine inhibits β-tubulin polymerisation into microtubules. [[Leung2015,FDA-Colcrys]]',
  pt:'The drug grabs the building blocks of the cell\'s internal scaffolding.',
  hook:'Colchicine binds <b>tubulin</b> (not the finished microtubule). Low concentrations cap; higher concentrations depolymerise.'},
 {from:.6,at:.66,k:'Scene 5 · Microtubules',t:'The tracks shorten',
  txt:'Microtubules constantly grow and shrink. With their growing ends capped, they shrink faster than they can rebuild. They are also the cell\'s tracks: motor proteins such as dynein carry mitochondria along them, and that transport is the step the inflammasome in scene 6 depends on. Tubulin disruption is the primary mechanism, and it then dampens several inflammatory pathways at once. [[Leung2015,Misawa2013]]',
  pt:'The scaffolding falls apart. Cargo that used to ride along it, such as the cell\'s mitochondria, is left stranded.',
  hook:'One target, many jobs lost: the label says colchicine prevents neutrophil <b>activation, degranulation and migration</b>. [[FDA-Colcrys]]'},
 {from:.74,at:.8,k:'Scene 6 · NLRP3',t:'NLRP3 needs microtubules to assemble',
  txt:'A gout flare starts when urate crystals switch on the NLRP3 (NALP3) inflammasome, which makes active IL-1β; mice lacking its parts, or the IL-1 receptor, had impaired neutrophil influx. Potassium leaking out of the cell is the common trigger. In cultured cells, NLRP3 activators lower NAD⁺ and inactivate sirtuin 2, so acetylated α-tubulin builds up and drives dynein to carry mitochondria, with ASC on them, to NLRP3. Only then can the two meet and assemble. Reviews state that colchicine\'s microtubule block dampens this step; the cell study itself did not test colchicine. [[Martinon2006,MunozPlanillo2013,Misawa2013,Leung2015,Dalbeth2014ClinTher]]',
  pt:'The crystal alarm needs two parts to meet inside the cell, and they travel on microtubules. With the tracks gone, the parts stay apart and the alarm is quieter.',
  hook:'Exam answer: colchicine → tubulin → microtubule disruption → <b>less NLRP3 inflammasome assembly</b> → less IL-1β → fewer neutrophils called in.'},
 {from:.87,at:.93,k:'Scene 7 · The neutrophil',t:'Less crawling, sticking and firing at crystals',
  txt:'Without a working microtubule network, neutrophils migrate poorly toward chemoattractants. Colchicine also alters adhesion at two concentration levels: at very low, prophylactic-range levels (IC50 about 3 nM) it changes the distribution, not the amount, of E-selectin on endothelial cells and abolishes their extra stickiness for neutrophils; at higher, therapeutic-range levels (IC50 about 300 nM) neutrophils lose L-selectin. In human neutrophils it blocked the signal triggered by urate and CPP crystals but not that triggered by other stimuli. In mice it blocked crystal-induced superoxide at doses 100 times lower than those needed to stop neutrophils entering, which the authors offer as a reason low doses work. [[Dalbeth2014ClinTher,Cronstein1995,Roberge1993,Chia2008]]',
  pt:'White cells move and stick less, and they react less to the crystals, so fewer of them flood the joint.',
  hook:'Two layers of effect: <b>inside</b> the cell (NLRP3, crystal signalling) and <b>between</b> cells (chemotaxis, selectin-mediated adhesion).'}
];
inits.colin=()=>{
  const svg=$('#ciSvg'),rg=$('#ciT');
  let N=false;                     // set by draw(); every scene reads it
  const r=rng(23);const MOL=Array.from({length:26},(_,i)=>({o:r()*.5,loop:i%3===0}));
  const along=(pts,u)=>{u=clamp(u);let L=[],tot=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(d);tot+=d}
    let x=u*tot;for(let i=0;i<L.length;i++){if(x<=L[i]||i===L.length-1){const k=L[i]?clamp(x/L[i]):0;return[lerp(pts[i][0],pts[i+1][0],k),lerp(pts[i][1],pts[i+1][1],k)]}x-=L[i]}};
  /* wide: a left-to-right anatomical route */
  const P_IN=[[70,46],[96,96],[118,140],[160,190],[214,220],[262,236]],P_PORT=[[262,236],[312,196],[386,150],[450,118]],P_BLOOD=[[450,118],[540,96],[640,96],[640,210]],P_BILE=[[450,118],[430,180],[392,222],[310,246],[262,236]];
  /* narrow: the same journey read top to bottom */
  const Q_IN=[[40,42],[64,80],[88,104],[96,114],[122,150],[142,176],[258,176],[286,190],[292,204],[286,218],[258,232],[106,232],[80,244],[72,260],[80,276],[106,288],[250,288]],
        Q_PORT=[[250,288],[268,312],[240,340],[204,360]],
        Q_BLOOD=[[204,360],[262,352],[310,384],[310,500]],
        Q_BILE=[[204,360],[150,392],[100,372],[70,332],[74,300],[104,288]],
        Q_BILE_M=[...Q_BILE,[250,288]];
  const mol=(x,y,o=1)=>`<path d="M${f1(x)} ${f1(y-5)} l5 5 -5 5 -5 -5z" style="fill:var(--crocus);opacity:${f1(o)}"/>`;
  const pl=pts=>'M'+pts.map(p=>p.join(' ')).join(' L');
  const H_A=640,H_B=700,H_C=372,H_D=812;   // narrow heights, one per scene
  function sceneA(t,o){if(o<=0)return'';
    const L=N
      ? {IN:Q_IN,PORT:Q_PORT,BLOOD:Q_BLOOD,BILE:Q_BILE,BILEM:Q_BILE_M,esoN:4,
         tabX:24,tabY:20,tabLx:62,tabLy:33,
         stCx:96,stCy:112,stRx:34,stRy:22,stLx:138,stLy:116,stCls:'t-xs',
         gut:'M56 176 H268 A28 28 0 0 1 268 232 H100 A28 28 0 0 0 100 288 H288',gutW:16,
         giLx:20,giLy:158,
         pvLx:272,pvLy:318,pvRot:'',
         livX:148,livY:373,
         bileCx:80,bileCy:352,bileLx:14,bileLy:452,
         bloodLx:322,bloodLy:470,
         kidStem:'M310 500 V538',kidX:300,kidY:570,kidLx:296,kidLy:606,kidCls:'t-xs t-mid',
         pgpX:64,pgpY:208,pgpT:'P-gp pumps some back',
         ehA:'M56 440 q-6 -46 20 -74',ehLx:14,ehLy:474}
      : {IN:P_IN,PORT:P_PORT,BLOOD:P_BLOOD,BILE:P_BILE,BILEM:P_BILE,esoN:3,
         tabX:54,tabY:26,tabLx:96,tabLy:38,
         stCx:120,stCy:140,stRx:34,stRy:24,stLx:120,stLy:182,stCls:'t-xs t-mid',
         gut:'M150 180 q30 40 60 10 t60 20 t50 40 t60 -10 t40 40',gutW:16,
         giLx:230,giLy:300,
         pvLx:300,pvLy:168,pvRot:' transform="rotate(-30 300 168)"',
         livX:410,livY:80,
         bileCx:430,bileCy:182,bileLx:446,bileLy:210,
         bloodLx:652,bloodLy:150,
         kidStem:'M640 210 V300',kidX:610,kidY:320,kidLx:626,kidLy:346,kidCls:'t-xs t-mid',
         pgpX:400,pgpY:270,pgpT:'P-gp in gut wall pumps some back',
         ehA:'M300 258 q-20 30 -60 22',ehLx:160,ehLy:330};
    let s=`<g style="opacity:${f1(o)}">`;
    // anatomy
    s+=`<path d="${pl(L.IN.slice(0,L.esoN))}" style="fill:none;stroke:var(--line);stroke-width:12;stroke-linecap:round"/>`;
    s+=`<ellipse cx="${L.stCx}" cy="${L.stCy}" rx="${L.stRx}" ry="${L.stRy}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><text x="${L.stLx}" y="${L.stLy}" class="${L.stCls}">stomach</text>`;
    s+=`<path d="${L.gut}" style="fill:none;stroke:var(--memb);stroke-width:${L.gutW};stroke-linecap:round;opacity:.55"/><text x="${L.giLx}" y="${L.giLy}" class="t-sm">SMALL INTESTINE</text>`;
    s+=`<path d="${pl(L.PORT)}" style="fill:none;stroke:var(--bad);stroke-width:5;opacity:.35"/><text x="${L.pvLx}" y="${L.pvLy}" class="t-xs"${L.pvRot}>portal vein</text>`;
    s+=`<path d="M${L.livX} ${L.livY} q60 -40 120 -6 q20 30 -10 56 q-60 34 -116 6 q-24 -24 6 -56z" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/><text x="${L.livX+64}" y="${L.livY+22}" class="t-lbl t-mid">liver</text><text x="${L.livX+64}" y="${L.livY+38}" class="t-xs t-mid">CYP3A4</text>`;
    s+=`<path d="${pl(L.BILE)}" style="fill:none;stroke:var(--gold);stroke-width:4;stroke-dasharray:6 5"/><circle cx="${L.bileCx}" cy="${L.bileCy}" r="12" style="fill:var(--gold-soft);stroke:var(--gold)"/><text x="${L.bileLx}" y="${L.bileLy}" class="t-xs" style="fill:var(--gold)">bile → back to gut</text>`;
    s+=`<path d="${pl(L.BLOOD)}" style="fill:none;stroke:var(--bad);stroke-width:7;opacity:.4"/><text x="${L.bloodLx}" y="${L.bloodLy}" class="t-sm">BLOOD</text>`;
    s+=`<path d="${L.kidStem}" style="stroke:var(--bad);stroke-width:7;opacity:.4"/><path d="M${L.kidX} ${L.kidY} q-14 -26 10 -34 q20 -4 22 20 q-4 24 -32 14z" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="${L.kidLx}" y="${L.kidLy}" class="${L.kidCls}">kidney → urine (40–65%)</text>`;
    s+=`<rect x="${L.tabX}" y="${L.tabY}" width="32" height="16" rx="8" style="fill:var(--crocus);opacity:${f1(1-ramp(t,0,.04))}"/><text x="${L.tabLx}" y="${L.tabLy}" class="t-xs">tablet</text>`;
    s+=`<text x="${f1(L.pgpX)}" y="${f1(L.pgpY)}" class="t-xs" style="fill:var(--crocus)">${L.pgpT}</text>`;
    const T=t/.26;
    MOL.forEach((m,i)=>{const life=clamp(T*1.5-m.o);if(life<=0)return;let p;
      if(life<.32)p=along(L.IN,life/.32);else if(life<.5)p=along(L.PORT,(life-.32)/.18);
      else if(m.loop&&life<.78)p=along(L.BILEM,(life-.5)/.28);else if(m.loop)p=along(L.PORT,(life-.78)/.22);else p=along(L.BLOOD,(life-.5)/.5);
      s+=mol(p[0],p[1]+(i%3-1)*3)});
    if(t>.12)s+=`<path d="${L.ehA}" class="arrow" style="stroke:var(--gold)"/><text x="${L.ehLx}" y="${L.ehLy}" class="t-xs" style="fill:var(--gold)">enterohepatic recycling</text>`;
    return s+'</g>'}
  function sceneB(t,o){if(o<=0)return'';const k=ramp(t,.26,.44);
    const L=N
      ? {hx:20,hy:24, nCx:200,nCy:138,nR:84, nLy:244,nL2y:260,
         pCx:200,pCy:386,pR:70,pNuc:24,pIn:48,pOut:92, pLy:498,pL2y:514,
         pumpLx:20,pumpLy:322,
         cx0:28,cx1:380,cy0:584,cy1:660,
         head:['AFTER ONE DOSE · 0–4 days','each curve scaled to its own peak','(leukocyte levels are far higher)'],headY:540,
         lgx:28,lgx2:160,lgy:680,lgEnd:false}
      : {hx:20,hy:28, nCx:190,nCy:150,nR:100, nLy:272,nL2y:288,
         pCx:500,pCy:150,pR:88,pNuc:30,pIn:60,pOut:120, pLy:262,pL2y:278,
         pumpLx:600,pumpLy:60,
         cx0:40,cx1:700,cy0:310,cy1:380,
         head:['AFTER ONE DOSE · 0–4 days · each curve scaled to its own peak (leukocyte levels are far higher)'],headY:304,
         lgx:700,lgx2:700,lgy:314,lgEnd:true};
    const sc=L.nR/100;
    let s=`<g style="opacity:${f1(o)}">`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-sm">IN THE BLOODSTREAM</text>`;
    s+=`<circle cx="${L.nCx}" cy="${L.nCy}" r="${L.nR}" style="fill:var(--neut);stroke:var(--crocus);stroke-width:3"/><text x="${L.nCx}" y="${L.nLy}" class="t-lbl t-mid">neutrophil</text><text x="${L.nCx}" y="${L.nL2y}" class="t-xs t-mid">little P-gp → drug is trapped</text>`;
    [[-30,-18,22],[26,14,22],[18,-34,18]].forEach(([dx,dy,rr])=>s+=`<circle cx="${f1(L.nCx+dx*sc)}" cy="${f1(L.nCy+dy*sc)}" r="${f1(rr*sc)}" style="fill:var(--nuc);opacity:.85"/>`);
    const rN=rng(3);const nIn=Math.round(6+44*k);for(let i=0;i<nIn;i++){const a=rN()*6.283,d=(20+rN()*68)*sc;s+=mol(L.nCx+Math.cos(a)*d,L.nCy+Math.sin(a)*d,.9)}
    s+=`<circle cx="${L.pCx}" cy="${L.pCy}" r="${L.pR}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:3"/><circle cx="${L.pCx}" cy="${L.pCy}" r="${L.pNuc}" style="fill:var(--nuc);opacity:.6"/><text x="${L.pCx}" y="${L.pLy}" class="t-lbl t-mid">cell with P-gp pumps</text><text x="${L.pCx}" y="${L.pL2y}" class="t-xs t-mid">e.g. gut lining, liver, kidney</text>`;
    [-.6,.5,1.6,2.7].forEach((a,i)=>{const x=L.pCx+L.pR*Math.cos(a),y=L.pCy+L.pR*Math.sin(a);s+=`<rect x="${f1(x-7)}" y="${f1(y-11)}" width="14" height="22" rx="4" transform="rotate(${f1(a*57.3+90)} ${f1(x)} ${f1(y)})" style="fill:var(--sea)"/>`;
      const ph=((t*30+i*.25)%1);s+=mol(lerp(L.pCx+L.pIn*Math.cos(a),L.pCx+L.pOut*Math.cos(a),ph),lerp(L.pCy+L.pIn*Math.sin(a),L.pCy+L.pOut*Math.sin(a),ph),1-ph)});
    s+=`<text x="${L.pumpLx}" y="${L.pumpLy}" class="t-xs" style="fill:var(--sea)">P-gp pumps it out</text>`;
    // mini chart: plasma vs leukocyte
    const x0=L.cx0,x1=L.cx1,y0=L.cy0,y1=L.cy1;s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    L.head.forEach((h,i)=>s+=`<text x="${x0}" y="${L.headY+i*14}" class="t-xs">${h}</text>`);
    const pf=u=>{const h=u*96;return h<1?h:.25*Math.exp(-(h-1)/40)+.75*Math.exp(-(h-1)/3)};const lf=u=>{const h=u*96;return (h/47)*Math.exp(1-h/47)};
    s+=`<path d="${pathFn(u=>u<=k?pf(u):NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--bad);stroke-width:2.5"/><path d="${pathFn(u=>u<=k?lf(u):NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--crocus);stroke-width:3"/>`;
    s+=`<text x="${L.lgx}" y="${L.lgy}" class="t-xs${L.lgEnd?' t-end':''}" style="fill:var(--crocus)">inside leukocytes</text><text x="${L.lgx2}" y="${L.lgy+(L.lgEnd?14:0)}" class="t-xs${L.lgEnd?' t-end':''}" style="fill:var(--bad)">plasma</text>`;
    return s+'</g>'}
  /* a mitochondrion: the cargo that rides the microtubule tracks (ASC sits on it in scene 6) */
  const mito=(x,y,o=1,w=9)=>`<g style="opacity:${f1(o)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${w}" ry="${f1(w*.5)}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:1.6"/><path d="M${f1(x-w*.6)} ${f1(y)} q${f1(w*.2)} ${f1(-w*.3)} ${f1(w*.4)} 0 t${f1(w*.4)} 0 t${f1(w*.4)} 0" style="fill:none;stroke:var(--memb);stroke-width:1"/></g>`;
  function sceneC(t,o){if(o<=0)return'';const bind=ramp(t,.45,.6),shrink=ease(ramp(t,.58,.74));
    const L=N
      ? {hx:20,hy:24, ctCx:34,ctCy:150,ctR:18,ctLy:186,
         rows:[90,150,210],x0:64,full:12,
         gA:146,gB:154,gStep:52,gStep2:54,
         poolX:24,poolDx:66,poolPer:4,poolY:310,poolDy:30,poolLx:20,poolLy:286,
         keyX:226,keyY:336}
      : {hx:20,hy:28, ctCx:52,ctCy:200,ctR:22,ctLy:240,
         rows:[110,200,290],x0:80,full:26,
         gA:240,gB:250,gStep:90,gStep2:92,
         poolX:430,poolDx:64,poolPer:4,poolY:350,poolDy:26,poolLx:430,poolLy:330,
         keyX:540,keyY:30};
    let s=`<g style="opacity:${f1(o)}">`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-sm">INSIDE THE WHITE CELL · MICROTUBULES</text><circle cx="${L.ctCx}" cy="${L.ctCy}" r="${L.ctR}" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="${L.ctCx}" y="${L.ctLy}" class="t-xs t-mid">centrosome</text>`;
    L.rows.forEach((y,ri)=>{const full=L.full,n=Math.round(full*(1-.72*shrink*(1-ri*.08)));
      for(let i=0;i<n;i++){const x=L.x0+i*22;s+=`<rect x="${x}" y="${y-12}" width="10" height="11" rx="2" style="fill:var(--tub-a)"/><rect x="${x+10}" y="${y-12}" width="10" height="11" rx="2" style="fill:var(--tub-b)"/><rect x="${x+5}" y="${y+1}" width="10" height="11" rx="2" style="fill:var(--tub-b)"/><rect x="${x+15}" y="${y+1}" width="7" height="11" rx="2" style="fill:var(--tub-a)"/>`;
        // cargo riding the track: it creeps toward the centrosome while the track is intact
        if(i%5===2&&n-i>2)s+=mito(x+10-(1-shrink)*((t*400+ri*7)%22),y-21,1)}
      const endX=L.x0+n*22;if(bind>.2)s+=mol(endX+6,y,bind);
      // falling dimers + stranded mitochondria
      for(let k=0;k<4;k++){const ph=(t*8+k*.25+ri*.3)%1;if(shrink>0&&shrink<1)s+=`<rect x="${f1(endX+10+ph*30)}" y="${f1(y+ph*36-6)}" width="16" height="9" rx="2" style="fill:var(--tub-b);opacity:${f1((1-ph)*.8)}"/>`}
      const rel=Math.round(5*shrink);for(let k=0;k<rel;k++){const gx=lerp(L.gA+k*L.gStep,L.gB+k*L.gStep2,shrink),gy=y+30+Math.sin(t*20+k)*6;if(!N&&ri===2&&gx>L.poolX-30)continue;s+=mito(gx,gy,shrink)}
    });
    // free tubulin + colchicine binding
    for(let k=0;k<7;k++){const x=L.poolX+(k%L.poolPer)*L.poolDx,y=L.poolY+Math.floor(k/L.poolPer)*L.poolDy;s+=`<rect x="${x}" y="${y-8}" width="22" height="11" rx="3" style="fill:var(--tub-b)"/>`;if(k/7<bind)s+=mol(x+28,y-3)}
    s+=`<text x="${L.poolLx}" y="${L.poolLy}" class="t-xs">tubulin + colchicine caps growing ends</text>`;
    s+=`<g transform="translate(${L.keyX} ${L.keyY})">${mito(6,0,1,8)}<text x="20" y="4" class="t-xs">mitochondrion (cargo)</text><path d="M6 14 l5 5 -5 5 -5 -5z" style="fill:var(--crocus)"/><text x="20" y="23" class="t-xs">colchicine</text></g>`;
    if(shrink>.5)s+=`<text x="${N?20:L.gA}" y="${N?262:376}" class="t-xs" style="fill:var(--memb);opacity:${f1(ramp(shrink,.5,1))}">tracks gone · cargo stranded</text>`;
    return s+'</g>'}
  /* scene 6 (NLRP3 on microtubule tracks) and scene 7 (the neutrophil facing a crystal) */
  function sceneD(t,o){if(o<=0)return'';const a=ramp(t,.74,.87),b=ramp(t,.87,1);
    const L=N
      ? {r1y:24,r1Nx:380,r1Ny:40,
         cbX:30,cbY:52,cbStep:52,cbW:200,
         offX:30,offY:262,
         r2y:296,r2Nx:380,r2Ny:312,
         miX:66,miY:350,erX:316,erY:350,xX:191,
         spX:70,spY:428,spTx:104,spTy:424,spT2y:438,
         neX:[270,310,350],neY:426,neTx:380,neTy:462,
         effHy:496,effX:20,effY:510,effStep:100,effW:360,effH:92,
         nX:44,nY:42,txX:76,ttY:26,l1Y:44,l2Y:58,
         arrX:104,arrY:76,arrLen:60,arrVar:100,crX:263,crY:66,
         vwX:0,vwW:320,vwY:84,vwTx:276,vwTy:78,xtY:80,xcDx:96}
      : {r1y:26,r1Nx:700,r1Ny:26,
         cbX:24,cbY:38,cbStep:172,cbW:150,
         offX:24,offY:106,
         r2y:134,r2Nx:700,r2Ny:134,
         miX:76,miY:182,erX:290,erY:182,xX:183,
         spX:410,spY:182,spTx:444,spTy:178,spT2y:194,
         neX:[600,640,680],neY:182,neTx:700,neTy:216,
         effHy:240,effX:24,effY:250,effStep:228,effW:216,effH:112,
         nX:36,nY:46,txX:64,ttY:30,l1Y:48,l2Y:62,
         arrX:60,arrY:88,arrLen:40,arrVar:60,crX:150,crY:78,
         vwX:0,vwW:176,vwY:98,vwTx:64,vwTy:92,xtY:94,xcDx:84};
    let s=`<g style="opacity:${f1(o)}">`;
    // row 1: what a crystal sets off
    s+=`<text x="20" y="${L.r1y}" class="t-sm">${N?'NO DRUG · CRYSTAL → NLRP3 MEETS ASC':'NO DRUG · A CRYSTAL SETS OFF NLRP3, CARRIED ON MICROTUBULES'}</text>`;
    if(!N)s+=`<text x="${L.r1Nx}" y="${L.r1Ny}" class="t-xs t-end" style="fill:var(--warn)">shown in cultured cells</text>`;
    else s+=`<text x="${L.r1Nx}" y="${L.r1Ny}" class="t-xs t-end" style="fill:var(--warn)">shown in cultured cells</text>`;
    const chain=[['crystal engulfed','var(--xtal)'],['NAD⁺ ↓ · SIRT2 off','var(--muted)'],['acetylated tubulin','var(--tub-a)'],['ASC meets NLRP3','var(--terra)']];
    chain.forEach(([l,c],i)=>{const on=ramp(a,i*.16,i*.16+.2),w=L.cbW;
      const x=N?L.cbX:L.cbX+i*L.cbStep, y=N?L.cbY+i*L.cbStep:L.cbY;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" style="fill:var(--panel);stroke:${c};stroke-width:${f1(1+2*on)};opacity:${f1(.3+.7*on)}"/><text x="${x+(i===0||i===3?w/2+12:w/2)}" y="${y+25}" class="t-lbl t-mid" style="opacity:${f1(.3+.7*on)}">${l}</text>`;
      if(i===0)s+=`<g style="opacity:${f1(.3+.7*on)}">${needle(x+18,y+20,24,-35)}${needle(x+24,y+24,16,20)}</g>`;
      if(i===3)s+=`<g style="opacity:${f1(.3+.7*on)}">${mito(x+16,y+20,1,8)}</g>`;
      if(i<3)s+=N
        ?`<path d="M${x+w/2} ${y+42} V${y+L.cbStep-2}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`
        :`<path d="M${x+w+2} ${y+20} H${x+L.cbStep-2}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`});
    const oo=ramp(a,.62,.8);
    s+=`<text x="${L.offX}" y="${L.offY}" class="t-xs" style="fill:var(--terra);opacity:${f1(oo)}">${N?'→ ASC speck → caspase-1 → IL-1β':'dynein carries the mitochondria (ASC) to NLRP3 → ASC speck → caspase-1 → IL-1β → neutrophils called in'}</text>`;
    if(N)s+=`<text x="${L.offX}" y="${L.offY+14}" class="t-xs" style="fill:var(--terra);opacity:${f1(oo)}">→ neutrophils called in</text>`;
    // row 2: with colchicine the tracks are gone
    const r2=ramp(a,.55,1);
    s+=`<text x="20" y="${L.r2y}" class="t-sm" style="opacity:${f1(.3+.7*r2)}">${N?'WITH COLCHICINE · NO TRACKS':'WITH COLCHICINE · NO TRACKS, SO THE PARTS STAY APART'}</text><text x="${L.r2Nx}" y="${L.r2Ny}" class="t-xs t-end" style="fill:var(--warn);opacity:${f1(.3+.7*r2)}">stated in reviews</text>`;
    s+=`<g style="opacity:${f1(.3+.7*r2)}">`;
    s+=mito(L.miX,L.miY,1,30);
    [-.9,-.3,.3,.9].forEach(k=>s+=`<circle cx="${f1(L.miX+k*24)}" cy="${f1(L.miY-15+Math.abs(k)*5)}" r="4" style="fill:var(--terra)"/>`);
    s+=`<text x="${L.miX}" y="${L.miY+32}" class="t-xs t-mid">mitochondrion + ASC</text>`;
    s+=`<rect x="${L.erX-34}" y="${L.erY-14}" width="68" height="28" rx="14" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.8"/><text x="${L.erX}" y="${L.erY+5}" class="t-lbl t-mid">NLRP3</text><text x="${L.erX}" y="${L.erY+32}" class="t-xs t-mid">on the ER</text>`;
    // broken track between them, colchicine on the fragments
    [[-58,0],[-30,6],[2,-4],[30,5]].forEach(([dx,dy],k)=>{const x=L.xX+dx,y=L.miY+dy*.6+16;s+=`<rect x="${f1(x)}" y="${f1(y-5)}" width="18" height="9" rx="2" transform="rotate(${k%2?14:-12} ${f1(x+9)} ${f1(y)})" style="fill:var(--tub-b)"/>`;if(k%2===0)s+=mol(x+22,y-4,r2)});
    s+=`<path d="M${L.miX+36} ${L.miY-2} H${L.erX-40}" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 5;fill:none"/>`;
    s+=`<path d="M${L.xX-11} ${L.miY-13} l22 22 M${L.xX+11} ${L.miY-13} l-22 22" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round;opacity:${f1(r2)}"/>`;
    // no speck, less IL-1β, fewer neutrophils
    for(let k=0;k<12;k++){const an=k/12*6.283;s+=`<circle cx="${f1(L.spX+Math.cos(an)*16)}" cy="${f1(L.spY+Math.sin(an)*16)}" r="3.4" style="fill:var(--terra);opacity:.4"/>`}
    s+=`<path d="M${L.spX-22} ${L.spY-22} L${L.spX+22} ${L.spY+22} M${L.spX+22} ${L.spY-22} L${L.spX-22} ${L.spY+22}" style="stroke:var(--bad);stroke-width:3.5;stroke-linecap:round;opacity:${f1(r2)}"/>`;
    s+=`<text x="${L.spTx}" y="${L.spTy}" class="t-lbl">no ASC speck</text><text x="${L.spTx}" y="${L.spT2y}" class="t-xs">less IL-1β made</text>`;
    L.neX.forEach((x,k)=>s+=neutro(x,L.neY,12,lerp(1,.22,ramp(r2,k*.2,k*.2+.5))));
    s+=`<text x="${L.neTx}" y="${L.neTy}" class="t-xs t-end">fewer neutrophils called in</text>`;
    s+='</g>';
    // scene 7: the neutrophil itself
    s+=`<text x="20" y="${L.effHy}" class="t-sm" style="opacity:${f1(.3+.7*b)}">AND ACROSS THE WHOLE NEUTROPHIL</text>`;
    const eff=[['Chemotaxis','crawls poorly toward; chemoattractants'],['Adhesion','sheds L-selectin; E-selectin moved'],['Crystal response','signal from crystals; blocked, less superoxide']];
    eff.forEach(([h,d],i)=>{const on=ramp(b,i*.25,i*.25+.3);
      const x=N?L.effX:L.effX+i*L.effStep, y=N?L.effY+i*L.effStep:L.effY;
      s+=`<g style="opacity:${f1(.25+.75*on)}"><rect x="${x}" y="${y}" width="${L.effW}" height="${L.effH}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>${neutro(x+L.nX,y+L.nY,16,1)}<text x="${x+L.txX}" y="${y+L.ttY}" class="t-lbl">${h}</text><text x="${x+L.txX}" y="${y+L.l1Y}" class="t-xs">${d.split('; ')[0]}</text><text x="${x+L.txX}" y="${y+L.l2Y}" class="t-xs">${d.split('; ')[1]||''}</text>`;
      if(i===0)s+=`<path d="M${x+L.arrX} ${y+L.arrY} h${f1(L.arrLen+L.arrVar*(1-on))}" class="arrow" marker-end="url(#ciA)"/><path d="M${x+L.crX} ${y+L.crY} l14 18 M${x+L.crX+14} ${y+L.crY} l-14 18" style="stroke:var(--bad);stroke-width:3;opacity:${f1(on)}"/>`;
      if(i===1)s+=`<path d="M${x+L.vwX+20} ${y+L.vwY} H${x+L.vwX+L.vwW+20}" style="stroke:var(--bad);stroke-width:4;opacity:.5"/><text x="${x+L.vwTx}" y="${y+L.vwTy}" class="t-xs" style="fill:var(--bad)">vessel wall</text>`;
      if(i===2){const cx=x+L.nX+L.xcDx,cy=y+L.xtY;
        s+=needle(cx,cy,38,-24)+needle(cx+20,cy+4,26,10)+needle(cx-12,cy+4,20,55);
        s+=`<path d="M${x+L.nX+12} ${y+L.nY+14} L${f1(cx-18)} ${f1(cy)}" style="stroke:var(--terra);stroke-width:1.6;stroke-dasharray:3 4;fill:none"/>`;
        const mx=(x+L.nX+12+cx-18)/2,my=(y+L.nY+14+cy)/2;
        s+=`<path d="M${f1(mx-7)} ${f1(my-7)} l14 14 M${f1(mx+7)} ${f1(my-7)} l-14 14" style="stroke:var(--bad);stroke-width:3;opacity:${f1(on)}"/>`;
        s+=`<text x="${f1(cx+38)}" y="${f1(cy+4)}" class="t-xs" style="fill:var(--xtal)">MSU crystal</text>`}
      s+='</g>'});
    return s+'</g>'}
  function draw(t){
    const oA=1-ramp(t,.24,.28),oB=ramp(t,.25,.29)*(1-ramp(t,.43,.47)),oC=ramp(t,.44,.48)*(1-ramp(t,.72,.76)),oD=ramp(t,.73,.77);
    let hN=0;if(oA>0)hN=Math.max(hN,H_A);if(oB>0)hN=Math.max(hN,H_B);if(oC>0)hN=Math.max(hN,H_C);if(oD>0)hN=Math.max(hN,H_D);
    N=vb(svg,'720 400','400 '+(hN||H_A));
    const VW=N?400:720,VH=N?(hN||H_A):400;
    svg.innerHTML=`<defs>${marker('ciA')}</defs><rect width="${VW}" height="${VH}" rx="12" style="fill:var(--field)"/>`+sceneA(t,oA)+sceneB(t,oB)+sceneC(t,oC)+sceneD(t,oD);
    const p=phaseOf(CI_STEPS,t);setSt(p);$('#ciNote').innerHTML=noteHTML(CI_STEPS[p]);
  }
  const stop=playWire(rg,$('#ciPlay'),draw,26000,'Replay','colin');
  const setSt=stepWire($('#ciSteps'),CI_STEPS,rg,draw,stop);
  $('#ciCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>It binds tubulin and disrupts microtubules</h4><p>This is the primary mechanism and the starting point of every downstream effect. A systematic review of colchicine in gout lists what follows from it: disrupted inflammasome activation, less microtubule-based chemotaxis, less leukotriene and cytokine generation, and less phagocytosis. [[Leung2015,Dalbeth2014ClinTher]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Urate crystals switch on NLRP3</h4><p>Crystals engage the caspase-1-activating NLRP3 (NALP3) inflammasome, producing active IL-1β and IL-18. Mice lacking caspase-1, ASC, NLRP3 or the IL-1 receptor had impaired neutrophil influx. [[Martinon2006]]</p></div>
   <div class="card"><span class="ev est">Established in cells</span><h4>NLRP3 assembly needs microtubules</h4><p>Acetylated α-tubulin drives dynein to carry mitochondria, and the ASC on them, to NLRP3. That colchicine's microtubule block dampens this step is stated in reviews; the cell study did not itself test colchicine. [[Misawa2013,Leung2015,Dalbeth2014ClinTher]]</p></div>
   <div class="card"><span class="ev est">Established in vitro</span><h4>It blocks the crystal signal in neutrophils</h4><p>In human blood neutrophils, colchicine dose-dependently blocked the tyrosine phosphorylation set off by urate and CPP crystals, but not that set off by fMLP, C5a, leukotriene B4 or zymosan. Inactive lumicolchicine, indomethacin and phenylbutazone had no such effect. [[Roberge1993]]</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Why low doses may be enough</h4><p>In a mouse crystal model, oral colchicine blocked neutrophil superoxide at doses 100 times lower than those needed to stop neutrophils entering, without acute liver or kidney toxicity. Endothelial E-selectin changed at about 3 nM, a prophylactic-range level. [[Chia2008,Cronstein1995]]</p></div>
   <div class="card"><span class="ev hyp">Hypothesis</span><h4>Why neutrophils trap the drug</h4><p>Granulocytes showed no surface P-glycoprotein and no pump function. That this lack of an efflux pump explains colchicine's selectivity for neutrophil-driven inflammation is a proposed explanation, not a proven one. [[Klimecki1994,BenChetrit1998MH]]</p></div>`;
  draw(+rg.value);
};
