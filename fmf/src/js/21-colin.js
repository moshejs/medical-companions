
/* =============== 2.1 colchicine inside the cell =============== */
const CI=[
 {from:0,at:.05,k:'Scene 1 · The gut',t:'Swallowed and absorbed',
  txt:'Colchicine is taken by mouth and absorbed in the small intestine. Oral bioavailability averages about 45%. Plasma levels peak 1–2 hours after a dose. P-glycoprotein in the gut wall pumps part of each dose back into the lumen, and intestinal CYP3A4 metabolizes a little more. [[Rochdi1994,FDA-Colcrys,Slobodnick2018]]',
  pt:'The tablet is absorbed from the gut. Only part of each dose gets into the body.',
  hook:'Colchicine is a P-glycoprotein (ABCB1) and CYP3A4 substrate. Both matter for drug interactions.'},
 {from:.12,at:.17,k:'Scene 2 · Liver and bile',t:'Recycling through bile',
  txt:'The liver metabolizes part of the drug through CYP3A4 and secretes some into bile. Bile returns it to the gut, where some is absorbed again: enterohepatic recycling, seen as a second plasma peak within hours. The kidneys excrete a share unchanged; the US label reports 40–65% of a dose in urine, while some reviews give lower figures. A huge volume of distribution (about 5–8 L/kg) and binding inside cells give a long half-life, about 27–31 hours with repeated dosing, though studies range widely. [[Ferron1996,FDA-Colcrys,Finkelstein2010]]',
  pt:'The liver sends the drug out in bile, and the gut takes some of it back up, so it lingers in the body.',
  hook:'Enterohepatic recirculation helps explain the long half-life and why hepatic or biliary disease raises exposure.'},
 {from:.26,at:.34,k:'Scene 3 · Neutrophils',t:'It piles up in white cells',
  txt:'Granulocytes carry no working P-glycoprotein pump, so colchicine that enters them is not pushed back out. Leukocyte levels peak about two days after a dose, long after the plasma peak at about one hour, and neutrophil concentrations can exceed peak plasma levels more than 16-fold. Why neutrophils trap the drug is a well-supported hypothesis. Levels vary a lot between people: in 30 patients taking 0.5 to 2 mg a day, plasma and leukocyte levels did not track the dose taken, and uptake into leukocytes was saturable. [[Chappey1993,Chappey1994,Klimecki1994,Leung2015,BenChetrit1998MH]]',
  pt:'White blood cells soak the drug up and hold on to it. Plasma levels fall within hours, but levels inside the white cells stay up for days.',
  hook:'Low P-gp in neutrophils = intracellular trapping. This is part of why the drug is so selective for neutrophil-driven inflammation.'},
 {from:.45,at:.5,k:'Scene 4 · Tubulin',t:'Binding free tubulin',
  txt:'Inside the cell colchicine binds free β-tubulin at the "colchicine site". The tubulin–colchicine complex adds to the growing end of a microtubule and stops further growth. [[Leung2015]]',
  pt:'The drug grabs the building blocks of the cell\'s internal scaffolding.',
  hook:'Colchicine binds <b>tubulin</b> (not the finished microtubule). Low concentrations cap; higher concentrations depolymerize.'},
 {from:.6,at:.66,k:'Scene 5 · Microtubules',t:'The scaffolding shortens',
  txt:'Microtubules constantly grow and shrink. With their growing ends capped, they shrink faster than they can rebuild. Proteins that were parked on them, including the RhoA activator GEF-H1, are released into the cytoplasm. [[Leung2015,Park2016]]',
  pt:'The scaffolding falls apart, and proteins that were stuck to it drift free.',
  hook:'Microtubule disruption releases GEF-H1, which turns RhoA on.'},
 {from:.74,at:.8,k:'Scene 6 · Pyrin',t:'Two proposed ways pyrin stays quiet',
  txt:'Route 1: free GEF-H1 activates RhoA, RhoA drives PKN, PKN re-phosphorylates pyrin, and 14-3-3 holds it off. Route 2: pyrin needs intact microtubules for its second activation step, so without them no ASC speck forms. Gao and colleagues found microtubule drugs did not prevent pyrin dephosphorylation, which argues for route 2. Which route dominates at clinical doses is still debated. [[Park2016,Gao2016,VanGorp2016,Schnappauf2019]]',
  pt:'Researchers have two explanations for how this keeps pyrin quiet. Both may be partly right.',
  hook:'Exam answer: colchicine → tubulin → microtubule disruption → <b>reduced pyrin inflammasome activation</b> and reduced neutrophil function.'},
 {from:.87,at:.93,k:'Scene 7 · The neutrophil',t:'Less crawling, less sticking',
  txt:'Without a working microtubule network, neutrophils polarize and migrate poorly toward chemoattractants. Colchicine also alters adhesion at two concentration levels: at very low, prophylactic-range levels (IC50 about 3 nM) it changes the distribution, not the amount, of E-selectin on endothelial cells, abolishing their stickiness for neutrophils; at higher, therapeutic-range levels (IC50 about 300 nM) neutrophils lose L-selectin. Fewer neutrophils stick and leave the bloodstream. It can also dampen NLRP3 assembly, which needs microtubules to bring its parts together, though in the lab this takes higher concentrations. [[Cronstein1995,Leung2015,Misawa2013]]',
  pt:'White cells move and stick less, so fewer of them reach the lining where attacks happen.',
  hook:'Two layers of effect: <b>inside</b> the cell (pyrin, NLRP3) and <b>between</b> cells (chemotaxis, selectin-mediated adhesion).'}
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
  function sceneC(t,o){if(o<=0)return'';const bind=ramp(t,.45,.6),shrink=ease(ramp(t,.58,.74));
    const L=N
      ? {hx:20,hy:24, ctCx:34,ctCy:150,ctR:18,ctLy:186,
         rows:[90,150,210],x0:64,full:12,
         gA:146,gB:154,gStep:52,gStep2:54,
         poolX:24,poolDx:66,poolPer:4,poolY:310,poolDy:30,poolLx:20,poolLy:286,
         keyX:286,keyY:326}
      : {hx:20,hy:28, ctCx:52,ctCy:200,ctR:22,ctLy:240,
         rows:[110,200,290],x0:80,full:26,
         gA:240,gB:250,gStep:90,gStep2:92,
         poolX:430,poolDx:64,poolPer:4,poolY:350,poolDy:26,poolLx:430,poolLy:330,
         keyX:560,keyY:30};
    let s=`<g style="opacity:${f1(o)}">`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-sm">INSIDE THE NEUTROPHIL · MICROTUBULES</text><circle cx="${L.ctCx}" cy="${L.ctCy}" r="${L.ctR}" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="${L.ctCx}" y="${L.ctLy}" class="t-xs t-mid">centrosome</text>`;
    L.rows.forEach((y,ri)=>{const full=L.full,n=Math.round(full*(1-.72*shrink*(1-ri*.08)));
      for(let i=0;i<n;i++){const x=L.x0+i*22;s+=`<rect x="${x}" y="${y-12}" width="10" height="11" rx="2" style="fill:var(--tub-a)"/><rect x="${x+10}" y="${y-12}" width="10" height="11" rx="2" style="fill:var(--tub-b)"/><rect x="${x+5}" y="${y+1}" width="10" height="11" rx="2" style="fill:var(--tub-b)"/><rect x="${x+15}" y="${y+1}" width="7" height="11" rx="2" style="fill:var(--tub-a)"/>`;
        if(i%5===2&&n-i>2)s+=`<circle cx="${x+10}" cy="${y-20}" r="6" style="fill:var(--good)"/>`}
      const endX=L.x0+n*22;if(bind>.2)s+=mol(endX+6,y,bind);
      // falling dimers + released GEF-H1
      for(let k=0;k<4;k++){const ph=(t*8+k*.25+ri*.3)%1;if(shrink>0&&shrink<1)s+=`<rect x="${f1(endX+10+ph*30)}" y="${f1(y+ph*36-6)}" width="16" height="9" rx="2" style="fill:var(--tub-b);opacity:${f1((1-ph)*.8)}"/>`}
      const rel=Math.round(5*shrink);for(let k=0;k<rel;k++){const gx=lerp(L.gA+k*L.gStep,L.gB+k*L.gStep2,shrink),gy=y+30+Math.sin(t*20+k)*6;s+=`<circle cx="${f1(gx)}" cy="${f1(gy)}" r="6" style="fill:var(--good);opacity:${f1(shrink)}"/>`}
    });
    // free tubulin + colchicine binding
    for(let k=0;k<7;k++){const x=L.poolX+(k%L.poolPer)*L.poolDx,y=L.poolY+Math.floor(k/L.poolPer)*L.poolDy;s+=`<rect x="${x}" y="${y-8}" width="22" height="11" rx="3" style="fill:var(--tub-b)"/>`;if(k/7<bind)s+=mol(x+28,y-3)}
    s+=`<text x="${L.poolLx}" y="${L.poolLy}" class="t-xs">tubulin + colchicine caps growing ends</text>`;
    s+=`<g transform="translate(${L.keyX} ${L.keyY})"><circle cx="6" cy="0" r="6" style="fill:var(--good)"/><text x="16" y="4" class="t-xs">GEF-H1</text><path d="M6 14 l5 5 -5 5 -5 -5z" style="fill:var(--crocus)"/><text x="16" y="23" class="t-xs">colchicine</text></g>`;
    return s+'</g>'}
  function sceneD(t,o){if(o<=0)return'';const a=ramp(t,.74,.87),b=ramp(t,.87,1);
    const L=N
      ? {r1y:24,r1Nx:380,r1Ny:42,r1End:true,
         cbX:30,cbY:58,cbStep:54,cbW:190,cbW4:190,
         offX:30,offY:276,
         r2y:306,r2Nx:380,r2Ny:324,
         d2X:24,d2Y:338,d2W:210,d2Cx:129,
         ascX:129,ascY:434,ascTx:176,ascTy:440,
         effHy:496,effX:20,effY:510,effStep:100,effW:360,effH:92,
         nX:44,nY:48,txX:76,ttY:26,l1Y:44,l2Y:58,
         arrX:104,arrY:76,arrLen:60,arrVar:100,crX:263,crY:66,
         vwX:0,vwW:320,vwY:84,vwTx:276,vwTy:78}
      : {r1y:28,r1Nx:700,r1Ny:28,r1End:true,
         cbX:30,cbY:44,cbStep:160,cbW:130,cbW4:176,
         offX:420,offY:104,
         r2y:140,r2Nx:700,r2Ny:140,
         d2X:40,d2Y:154,d2W:200,d2Cx:140,
         ascX:350,ascY:174,ascTx:400,ascTy:179,
         effHy:236,effX:40,effY:250,effStep:225,effW:205,effH:110,
         nX:36,nY:50,txX:64,ttY:32,l1Y:50,l2Y:64,
         arrX:60,arrY:86,arrLen:40,arrVar:60,crX:150,crY:76,
         vwX:0,vwW:170,vwY:96,vwTx:64,vwTy:90};
    let s=`<g style="opacity:${f1(o)}">`;
    s+=`<text x="20" y="${L.r1y}" class="t-sm">ROUTE 1 · GEF-H1 → RhoA → pyrin brake back on</text><text x="${L.r1Nx}" y="${L.r1Ny}" class="t-xs t-end" style="fill:var(--warn)">proposed · supported in cells</text>`;
    const chain=[['GEF-H1','var(--good)'],['RhoA-GTP','var(--sea)'],['PKN1/2','var(--muted)'],['pyrin-P · 14-3-3','var(--crocus)']];
    chain.forEach(([l,c],i)=>{const on=ramp(a,i*.22,i*.22+.25),w=i===3?L.cbW4:L.cbW;
      const x=N?L.cbX:L.cbX+i*L.cbStep, y=N?L.cbY+i*L.cbStep:44;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" style="fill:var(--panel);stroke:${c};stroke-width:${f1(1+2*on)};opacity:${f1(.3+.7*on)}"/><text x="${x+w/2}" y="${y+25}" class="t-lbl t-mid" style="opacity:${f1(.3+.7*on)}">${l}</text>`;
      if(i<3)s+=N
        ?`<path d="M${x+w/2} ${y+42} V${y+L.cbStep-2}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`
        :`<path d="M${x+132} 64 H${x+156}" class="arrow" marker-end="url(#ciA)" style="opacity:${f1(on)}"/>`});
    s+=`<text x="${L.offX}" y="${L.offY}" class="t-xs" style="fill:var(--crocus);opacity:${f1(ramp(a,.8,1))}">pyrin held OFF (as in the resting state)</text>`;
    s+=`<text x="20" y="${L.r2y}" class="t-sm">ROUTE 2 · ${N?'no microtubules → step 2 cannot finish':'no microtubule platform → step 2 cannot finish'}</text><text x="${L.r2Nx}" y="${L.r2Ny}" class="t-xs t-end" style="fill:var(--warn)">proposed · supported in cells</text>`;
    const r2=ramp(a,.3,1);
    s+=`<g style="opacity:${f1(.3+.7*r2)}"><rect x="${L.d2X}" y="${L.d2Y}" width="${L.d2W}" height="40" rx="10" style="fill:var(--panel);stroke:var(--terra);stroke-width:2"/><text x="${L.d2Cx}" y="${L.d2Y+25}" class="t-lbl t-mid">dephosphorylated pyrin</text>`;
    s+=N?`<path d="M${L.d2Cx} ${L.d2Y+42} V${L.ascY-30}" class="arrow" marker-end="url(#ciA)"/>`:`<path d="M${L.d2X+L.d2W+2} ${L.d2Y+20} H${L.ascX-50}" class="arrow" marker-end="url(#ciA)"/>`;
    for(let k=0;k<14;k++){const an=k/14*6.283;s+=`<circle cx="${f1(L.ascX+Math.cos(an)*22)}" cy="${f1(L.ascY+Math.sin(an)*22)}" r="4" style="fill:var(--crocus);opacity:.45"/>`}
    s+=`<path d="M${L.ascX-28} ${L.ascY-28} L${L.ascX+28} ${L.ascY+28} M${L.ascX+28} ${L.ascY-28} L${L.ascX-28} ${L.ascY+28}" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round;opacity:${f1(r2)}"/><text x="${L.ascTx}" y="${L.ascTy}" class="t-lbl">no ASC speck</text></g>`;
    // neutrophil effects
    s+=`<text x="20" y="${L.effHy}" class="t-sm" style="opacity:${f1(.3+.7*b)}">AND ACROSS THE WHOLE NEUTROPHIL</text>`;
    const eff=[['Chemotaxis','crawls poorly toward; chemoattractants'],['Adhesion','sheds L-selectin; E-selectin moved'],['NLRP3','assembly also; dampened']];
    eff.forEach(([h,d],i)=>{const on=ramp(b,i*.25,i*.25+.3);
      const x=N?L.effX:L.effX+i*L.effStep, y=N?L.effY+i*L.effStep:L.effY;
      s+=`<g style="opacity:${f1(.25+.75*on)}"><rect x="${x}" y="${y}" width="${L.effW}" height="${L.effH}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>${neutro(x+L.nX,y+L.nY,16,1)}<text x="${x+L.txX}" y="${y+L.ttY}" class="t-lbl">${h}</text><text x="${x+L.txX}" y="${y+L.l1Y}" class="t-xs">${d.split('; ')[0]}</text><text x="${x+L.txX}" y="${y+L.l2Y}" class="t-xs">${d.split('; ')[1]||''}</text>`;
      if(i===0)s+=`<path d="M${x+L.arrX} ${y+L.arrY} h${f1(L.arrLen+L.arrVar*(1-on))}" class="arrow" marker-end="url(#ciA)"/><path d="M${x+L.crX} ${y+L.crY} l14 18 M${x+L.crX+14} ${y+L.crY} l-14 18" style="stroke:var(--bad);stroke-width:3;opacity:${f1(on)}"/>`;
      if(i===1)s+=`<path d="M${x+L.vwX+20} ${y+L.vwY} H${x+L.vwX+L.vwW+20}" style="stroke:var(--bad);stroke-width:4;opacity:.5"/><text x="${x+L.vwTx}" y="${y+L.vwTy}" class="t-xs" style="fill:var(--bad)">vessel wall</text>`;
      s+='</g>'});
    return s+'</g>'}
  function draw(t){
    const oA=1-ramp(t,.24,.28),oB=ramp(t,.25,.29)*(1-ramp(t,.43,.47)),oC=ramp(t,.44,.48)*(1-ramp(t,.72,.76)),oD=ramp(t,.73,.77);
    let hN=0;if(oA>0)hN=Math.max(hN,H_A);if(oB>0)hN=Math.max(hN,H_B);if(oC>0)hN=Math.max(hN,H_C);if(oD>0)hN=Math.max(hN,H_D);
    N=vb(svg,'720 400','400 '+(hN||H_A));
    const VW=N?400:720,VH=N?(hN||H_A):400;
    svg.innerHTML=`<defs>${marker('ciA')}</defs><rect width="${VW}" height="${VH}" rx="12" style="fill:var(--field)"/>`+sceneA(t,oA)+sceneB(t,oB)+sceneC(t,oC)+sceneD(t,oD);
    const p=phaseOf(CI,t);setSt(p);$('#ciNote').innerHTML=noteHTML(CI[p]);
  }
  const stop=playWire(rg,$('#ciPlay'),draw,26000,'Replay','colin');
  const setSt=stepWire($('#ciSteps'),CI,rg,draw,stop);
  $('#ciCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>It binds tubulin and disrupts microtubules</h4><p>This has been known for decades and is the starting point of every proposed mechanism. Pyrin itself was found sitting on microtubules in 2001, long before anyone knew why that mattered. [[Leung2015,Mansfield2001]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>It suppresses the pyrin inflammasome selectively</h4><p>In cell experiments colchicine blocked pyrin-driven IL-1β release without a consistent effect on NLRP3, NLRC4 or AIM2 at the concentrations tested. [[Gao2016,Park2016]]</p></div>
   <div class="card"><span class="ev early">Debated</span><h4>Which route matters most?</h4><p>GEF-H1/RhoA re-activation (route 1) and loss of the microtubule-dependent step (route 2) were both shown in cultured cells. The results differ partly because studies used different drug concentrations. [[Park2016,Gao2016,Schnappauf2019]]</p></div>
   <div class="card"><span class="ev early">A puzzle</span><h4>FMF pyrin can fire without microtubules</h4><p>In patients' cells, FMF variants removed the need for microtubules, yet colchicine still works clinically. Proposed explanations include its effects on neutrophil migration and adhesion, and a remaining partial dependence on microtubules in the body. This is an open question. [[VanGorp2016,Magnotti2019]]</p></div>`;
  draw(+rg.value);
};
