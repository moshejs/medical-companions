/* =============== 4.1 CFTR modulators: how they work =============== */
/* Main scene: one airway cell with F508del CFTR. Left: the cell (ER, Golgi, three places in the apical membrane);
   right: one channel in close-up. Three toggles switch each drug class on or off, so the scene shows what each
   class adds. All levels in the scene are drawing proportions, not measurements: the cited numbers are in the
   notes and the combination readout. */
const MD_STEPS=[
 {from:0,at:.07,short:'misfold',k:'Step 1 · the defect',t:'F508del CFTR misfolds',
  txt:`CFTR modulators are small molecules that act on the CFTR protein itself. Correctors improve folding so that more CFTR reaches the cell surface; potentiators increase the function of CFTR that is already there [[Liu2019Potentiator]]. F508del is a processing variant: the protein is made but folds badly in the endoplasmic reticulum (ER) [[VanGoor2011VX809]], and the type I correctors work by stabilising its first transmembrane domain early in assembly and preventing its premature degradation [[Fiedorczuk2022Cell]].`,
  pt:`CFTR is a tiny gate for salt and water. With F508del the gate is built crooked, so the cell breaks most of it down before it can reach the surface [[Fiedorczuk2022Cell]].`,
  hook:`Correctors fix folding and trafficking (more CFTR at the surface). Potentiators fix gating (more opening of CFTR already there) [[Liu2019Potentiator]].`},
 {from:.18,at:.27,short:'corrector 1',k:'Step 2 · tezacaftor or lumacaftor',t:'A type I corrector docks',
  txt:`Cryo-EM shows lumacaftor and tezacaftor inserting into a hydrophobic pocket in the first transmembrane domain (TMD1), linking four unstable helices. Mutating that pocket made ΔF508-CFTR insensitive to both drugs <span class="ev est">Established</span> [[Fiedorczuk2022Cell]]. That they work by stabilising TMD1 early in assembly is the proposed mechanism <span class="ev early">Early evidence</span> [[Fiedorczuk2022Cell]]. On its own, lumacaftor raised chloride secretion in F508del/F508del bronchial cells to about 14% of non-CF levels [[VanGoor2011VX809]].`,
  pt:`The first corrector slips into a pocket in one half of the protein and holds its loose parts together while the rest of the protein is built [[Fiedorczuk2022Cell]].`,
  hook:`Lumacaftor and tezacaftor are type I correctors that bind TMD1 [[Fiedorczuk2022Cell]].`},
 {from:.36,at:.45,short:'corrector 2',k:'Step 3 · elexacaftor or vanzacaftor',t:'A second corrector, a different site',
  txt:`The Trikafta label states that elexacaftor and tezacaftor bind different sites on CFTR and have an additive effect on processing and trafficking [[FDA-Trikafta]]. The Alyftrek label describes the same design for vanzacaftor and tezacaftor [[FDA-Alyftrek]]. In structural work, elexacaftor alone partly corrected the interdomain assembly defect of Δ508 CFTR; combined with a type I corrector, it corrected it fully [[Fiedorczuk2022Science]].`,
  pt:`A second corrector grips the protein somewhere else. Two grips together fold it far better than either one alone [[Fiedorczuk2022Science]].`,
  hook:`Elexacaftor is a next-generation corrector that also acts as a co-potentiator [[Fiedorczuk2022Science,Veit2021ELX]].`},
 {from:.54,at:.63,short:'trafficking',k:'Step 4 · processing and trafficking',t:'Folded CFTR travels to the surface',
  txt:`In vitro, elexacaftor with tezacaftor and ivacaftor improved F508del CFTR processing, trafficking and chloride transport more than any two of the three agents together [[Keating2018VX445]]. Correctors aimed at different structural defects did little on their own, but in combination corrected ΔF508-CFTR to about 50–100% of wild-type levels in human airway cells <span class="ev early">Early evidence</span> [[Veit2018NatMed]].`,
  pt:`Once it is folded, the cell packs the protein into a small bubble and ships it, through the Golgi, to the surface that faces the airway. Correctors raise how much makes the trip [[Keating2018VX445]].`},
 {from:.70,at:.78,short:'potentiator',k:'Step 5 · ivacaftor or deutivacaftor',t:'The potentiator opens the gate',
  txt:`The ivacaftor label states that it "facilitates increased chloride transport by potentiating the channel open probability (or gating)" of CFTR at the cell surface, and that the size of the effect depends on how much CFTR is there and how responsive the variant is [[FDA-Kalydeco]]. Cryo-EM places ivacaftor at a "hotspot" in the transmembrane region, the same site as the investigational potentiator GLPG1837 [[Liu2019Potentiator]]. Elexacaftor adds co-potentiation: about 24% more ivacaftor-potentiated current for F508del in human airway cells <span class="ev early">Early evidence</span> [[Veit2021ELX]]. Deutivacaftor, the potentiator in Alyftrek, is taken once daily [[Uluer2023VTD,FDA-Alyftrek]].`,
  pt:`A potentiator props the gate open more of the time. It can only help if there is a gate in the wall to open [[FDA-Kalydeco]].`,
  hook:`Ivacaftor is a potentiator: it increases the open probability (Po) of CFTR already at the cell surface [[FDA-Kalydeco,VanGoor2009VX770]].`},
 {from:.85,at:.95,short:'chloride flows',k:'Step 6 · the result',t:'Chloride flows, the lining rehydrates',
  txt:`In cultured G551D/F508del bronchial epithelia, ivacaftor raised chloride secretion about 10-fold, to about 50% of non-CF levels; it also reduced excess sodium and fluid absorption and increased cilia beating [[VanGoor2009VX770]]. For the labels, a variant counts as responsive in the laboratory when chloride transport in Fischer rat thyroid (FRT) cells rises by at least 10% of normal over baseline, and for any single variant the size of that in vitro response does not predict the size of the clinical response [[FDA-Kalydeco,FDA-Trikafta]].`,
  pt:`With gates in the wall and opening, chloride leaves the cell, less fluid is pulled back in, and the cilia beat more strongly to sweep mucus [[VanGoor2009VX770]].`,
  hook:`The FDA in vitro threshold for a "responsive" variant: a net increase in FRT chloride transport of at least 10% of normal [[FDA-Kalydeco]].`}
];
/* what the evidence says for each combination of the three toggles: key = type I, second corrector, potentiator */
const MD_COMBO={
 '000':`<b>No modulator.</b> F508del CFTR folds badly and is degraded early, so almost none reaches the surface [[Fiedorczuk2022Cell]].`,
 '001':`<b>Potentiator alone.</b> Ivacaftor does raise the open probability of F508del CFTR in cells [[VanGoor2009VX770]], but the label notes that the effect depends on how much CFTR is at the cell surface [[FDA-Kalydeco]], and with F508del very little gets there.`,
 '100':`<b>Type I corrector alone.</b> Lumacaftor raised chloride secretion in F508del/F508del bronchial cells to about 14% of non-CF levels [[VanGoor2011VX809]]. Correctors aimed at a single defect did little on their own [[Veit2018NatMed]].`,
 '101':`<b>Type I corrector + potentiator</b> (the lumacaftor-ivacaftor and tezacaftor-ivacaftor design). In people homozygous for F508del, ppFEV1 rose 2.6 to 4.0 points over placebo with lumacaftor-ivacaftor [[Wainwright2015TRAFFIC]] and 4.0 points with tezacaftor-ivacaftor [[TaylorCousar2017EVOLVE]]: a modest effect.`,
 '010':`<b>Second corrector alone.</b> Elexacaftor alone partly corrected the interdomain assembly defect of Δ508 CFTR [[Fiedorczuk2022Science]].`,
 '011':`<b>Second corrector + potentiator.</b> Elexacaftor is also a co-potentiator: in human airway cells it raised ivacaftor-potentiated F508del current by about 24% <span class="ev early">Early evidence</span> [[Veit2021ELX]]. None of the five approved products uses this pair without a type I corrector.`,
 '110':`<b>Two correctors, no potentiator.</b> Elexacaftor and tezacaftor bind different sites with an additive effect on processing and trafficking [[FDA-Trikafta]]. More channels reach the surface, but they still open poorly without a potentiator.`,
 '111':`<b>Two correctors + potentiator</b> (Trikafta, Alyftrek). In vitro the triple beat any two of its parts [[Keating2018VX445]]. In people with F508del and a minimal-function variant, ETI raised ppFEV1 by 14.3 points over placebo [[Middleton2019ETI]].`
};
inits.modulators=()=>{
  const svg=$('#mdSvg'),rg=$('#mdT'),note=$('#mdNote'),combo=$('#mdCombo');
  const tog={t1:true,t2:true,pot:true};
  let setSt=()=>{};
  /* the schematic state at time t for the current toggles */
  function st(t){
    const rescue=tog.t1&&tog.t2?1:tog.t1?.45:tog.t2?.35:0;
    const c1=tog.t1?ramp(t,.19,.3):0,c2=tog.t2?ramp(t,.37,.48):0;
    const fold=rescue*clamp((tog.t1?.55*ramp(t,.22,.34):0)+(tog.t2?(tog.t1?.45:1)*ramp(t,.4,.52):0));
    const n=rescue>=1?3:rescue>0?1:0;
    const traf=ramp(t,.55,.69),pot=tog.pot?ramp(t,.71,.8):0;
    const gate=n?clamp((tog.pot?.15+.85*pot:.15)+(tog.t2?.12:0)):0;
    const flow=n?clamp(gate*(n/3)*ramp(t,.7,.9)+(n&&!tog.pot?.08*traf:0)):0;
    const degr=ramp(t,.5,.66);
    return {rescue,c1,c2,fold,n,traf,pot,gate,flow,degr}}
  /* vesicle path ER -> Golgi -> membrane place k */
  function along(P,u){u=clamp(u);const seg=u<.5?0:1,k=seg?(u-.5)*2:u*2;return [lerp(P[seg][0],P[seg+1][0],ease(k)),lerp(P[seg][1],P[seg+1][1],ease(k))]}
  function draw(t){const N=vb(svg,'720 380','400 600'),S=st(t),p=phaseOf(MD_STEPS,t),P=MD_STEPS[p];
    const L=N?{hx:14,hy:24,cx:12,cy:48,cw:376,ch:240,zx:200,zy:432,zs:94,gx:200,gy:556,gr:42}
             :{hx:16,hy:26,cx:12,cy:46,cw:420,ch:316,zx:586,zy:196,zs:92,gx:586,gy:336,gr:46};
    let s=`<defs>${marker('mdA','var(--muted)',6)}</defs>`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-big" style="fill:${p>=4?'var(--rx)':p?'var(--ink)':'var(--brand)'}">${P.t}</text>`;
    s+=`<text x="${L.hx}" y="${L.hy+16}" class="t-sm">${['the protein folds wrongly in the ER','first corrector binds TMD1','second corrector binds elsewhere','vesicles carry CFTR to the surface','the gate opens more often','chloride out, liquid layer deepens'][p]}</text>`;
    /* ---- the cell ---- */
    const x0=L.cx,y0=L.cy+(N?16:20),w=L.cw,h=L.ch-(N?16:20),memY=y0+h*.24,asl=8+26*S.flow;
    s+=`<rect x="${x0}" y="${f1(y0)}" width="${w}" height="${f1(memY-y0)}" rx="8" style="fill:var(--field)"/>`;
    s+=`<rect x="${x0}" y="${f1(memY-6-asl)}" width="${w}" height="${f1(asl)}" style="fill:var(--water-soft)"/>`;
    s+=`<rect x="${x0}" y="${f1(memY-6-asl-9)}" width="${w}" height="9" rx="3" style="fill:var(--mucus);opacity:${f1(.8-.3*S.flow)}"/>`;
    s+=`<text x="${x0+w-6}" y="${f1(memY-6-asl-13)}" class="t-xs t-end">airway (lumen)</text>`;
    s+=`<text x="${x0+6}" y="${f1(memY-6-asl-13)}" class="t-xs" style="fill:var(--mucus-ink)">mucus</text>`;
    if(asl>15)s+=`<text x="${x0+6}" y="${f1(memY-6-asl/2+3)}" class="t-xs" style="fill:var(--ink)">liquid layer</text>`;
    s+=`<rect x="${x0}" y="${f1(memY)}" width="${w}" height="${f1(y0+h-memY)}" rx="10" style="fill:var(--cell);stroke:var(--line);stroke-width:1.2"/>`;
    const slots=[.36,.6,.84].map(u=>x0+w*u),cs=N?30:34,arrived=k=>k<S.n&&S.traf>=.62+k*.1;
    s+=membrane(x0,memY,w,{h:12,gap:slots.filter((q,k)=>arrived(k)).map(q=>[q-cs*.3,q+cs*.3])});
    s+=`<text x="${x0+6}" y="${f1(memY+20)}" class="t-xs" style="fill:var(--ink)">apical membrane</text>`;
    /* nucleus, ER, Golgi */
    const nx=x0+w*.17,ny=y0+h*.74,erx=x0+w*.42,ery=y0+h*.76,gx=x0+w*.6,gy=y0+h*.5;
    s+=`<ellipse cx="${f1(nx)}" cy="${f1(ny)}" rx="${f1(w*.11)}" ry="${f1(h*.15)}" style="fill:var(--nucleus);opacity:.55"/><text x="${f1(nx)}" y="${f1(ny+3)}" class="t-xs t-mid" style="fill:var(--ink)">nucleus</text>`;
    for(let i=0;i<3;i++){const r1=w*(.15+i*.035),d=`M${f1(nx+r1*.55)} ${f1(ny-h*.2-i*5)}Q${f1(nx+r1*1.25)} ${f1(ny)} ${f1(nx+r1*.55)} ${f1(ny+h*.2+i*5)}`;s+=`<path d="${d}" style="fill:none;stroke:var(--membrane);stroke-width:2.2;opacity:.65"/>`}
    s+=`<text x="${f1(erx+w*.06)}" y="${f1(y0+h-8)}" class="t-xs t-mid" style="fill:var(--ink)">ER (folding)</text>`;
    for(let i=0;i<3;i++)s+=`<path d="M${f1(gx-w*.07+i*2)} ${f1(gy-10+i*7)}Q${f1(gx)} ${f1(gy-2+i*7)} ${f1(gx+w*.07-i*2)} ${f1(gy-10+i*7)}" style="fill:none;stroke:var(--membrane);stroke-width:3;stroke-linecap:round;opacity:.8"/>`;
    s+=`<text x="${f1(gx+w*.09)}" y="${f1(gy+8)}" class="t-xs" style="fill:var(--ink)">Golgi</text>`;
    /* three CFTR proteins in the ER: folding, then travelling (or degraded) */
    for(let k=0;k<3;k++){const px=erx+(k-1)*w*.075,py=ery-(k%2)*h*.06,goes=k<S.n,P3=[[px,py],[gx,gy+h*.04],[slots[k],memY+cs*.5]];
      const u=goes?clamp((S.traf-k*.1)/.62):0;
      if(goes&&u>0&&!arrived(k)){const q=along(P3,u);s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(cs*.42)}" style="fill:var(--water-soft);stroke:var(--membrane);stroke-width:1.6"/>`+folding(q[0],q[1],cs*.55,{fold:1,mis:0,seed:3+k})}
      else if(!goes){const op=1-S.degr;
        if(op>.05)s+=`<g style="opacity:${f1(op)}">${folding(px,py,cs*.95,{fold:1,mis:1-S.fold,seed:3+k})}</g>`;
        if(S.degr>.05)for(let j=0;j<5;j++){const a=j*1.3+k;s+=`<circle cx="${f1(px+Math.cos(a)*(6+10*S.degr))}" cy="${f1(py+Math.sin(a)*(5+8*S.degr))}" r="2" style="fill:var(--misfold);opacity:${f1(S.degr*(1-ramp(t,.8,1)*.6))}"/>`}}
      else if(!u)s+=folding(px,py,cs*.95,{fold:1,mis:1-S.fold,seed:3+k})}
    if(S.n<3&&S.degr>.2)s+=`<text x="${f1(erx)}" y="${f1(ery+h*.12)}" class="t-xs t-mid" style="fill:var(--misfold);font-weight:600;opacity:${f1(ramp(S.degr,.2,.5))}">${S.n?'the rest degraded':'degraded early'}</text>`;
    /* channels that have arrived, with ions up through them */
    slots.forEach((q,k)=>{if(!arrived(k)){s+=`<rect x="${f1(q-cs*.28)}" y="${f1(memY-cs*.36)}" width="${f1(cs*.56)}" height="${f1(cs*.6)}" rx="3" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;opacity:.7"/>`;return}
      s+=cftr(q,memY,cs,{state:'closed',open:S.gate,flow:S.flow>.03?clamp(S.gate*1.1):0,ph:t*7+k*.3,membrane:false}).svg});
    /* ---- close-up of one channel ---- */
    const zx=L.zx,zy=L.zy,zs=L.zs;
    s+=`<text x="${zx}" y="${f1(zy-zs*1.3)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">one CFTR channel, close up</text>`;
    const atMem=S.n>0&&S.traf>=.62,moving=S.n>0&&S.traf>0&&!atMem;
    let Z;
    if(atMem)Z=cftr(zx,zy,zs,{state:'closed',open:S.gate,flow:S.flow>.03?clamp(S.gate*1.1):0,ph:t*7,hco3:true,water:clamp(S.flow*1.4),labels:true,mw:N?240:250});
    else if(moving){Z=cftr(zx,zy,zs,{state:'absent',labels:true,mw:N?240:250});const vy=lerp(zy+zs*.62,zy+zs*.42,ease(S.traf/.62));
      Z.svg+=`<circle cx="${f1(zx)}" cy="${f1(vy)}" r="${f1(zs*.2)}" style="fill:var(--water-soft);stroke:var(--membrane);stroke-width:1.6"/>`+folding(zx,vy,zs*.32,{fold:1,mis:0,seed:9})}
    else{Z=cftr(zx,zy,zs,{state:'misfold',fold:S.fold,labels:true,mw:N?240:250});
      if(S.n===0&&S.degr>.1)Z.svg+=`<text x="${zx}" y="${f1(zy+zs*1.02)}" class="t-xs t-mid" style="fill:var(--misfold);font-weight:600">misfolded: broken down, never reaches the surface</text>`}
    s+=Z.svg;
    const A=Z.at,ms=zs*.22,hw=zs*.22;
    /* the correctors: on the tangled chain first, then riding into the membrane with it */
    const site1=atMem?[A.msd1[0]+hw*.5,zy+zs*.04]:[zx-zs*.22,zy+zs*.56],site2=atMem?[zx+zs*.17,zy+zs*.3]:[zx+zs*.24,zy+zs*.66];
    if(!moving){
      if(tog.t1&&S.c1>0)s+=modulator(lerp(zx-zs*1.15,site1[0],ease(S.c1)),lerp(zy+zs*.95,site1[1],ease(S.c1)),ms,{kind:'corr',lbl:'T',op:Math.min(1,S.c1*2)});
      if(tog.t2&&S.c2>0)s+=modulator(lerp(zx+zs*1.15,site2[0],ease(S.c2)),lerp(zy+zs*1.0,site2[1],ease(S.c2)),ms,{kind:'corr',lbl:'E',op:Math.min(1,S.c2*2)});
      if(tog.pot&&S.pot>0&&atMem)s+=modulator(lerp(zx+zs*1.1,zx+zs*.27,ease(S.pot)),lerp(zy-zs*.75,zy-zs*.12,ease(S.pot)),ms,{kind:'pot',lbl:'I',op:Math.min(1,S.pot*2)});
      if(S.c1>.9&&tog.t1&&p>=1&&p<=2)s+=`<text x="${f1(site1[0]-ms*.8)}" y="${f1(site1[1]+3)}" class="t-xs t-end" style="fill:var(--ink)">TMD1 pocket</text>`;
      if(S.c2>.9&&tog.t2&&p===2)s+=`<text x="${f1(site2[0]+ms*.8)}" y="${f1(site2[1]+3)}" class="t-xs" style="fill:var(--ink)">a second site</text>`;
      if(S.pot>.9&&atMem&&p>=4)s+=`<text x="${f1(zx+zs*.4)}" y="${f1(zy-zs*.6)}" class="t-xs" style="fill:var(--ink)">gate hotspot</text>`}
    /* the chloride gauge (schematic) */
    s+=gauge(L.gx,L.gy,L.gr,S.flow*100,100,{});
    s+=`<text x="${L.gx}" y="${L.gy+28}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">chloride out (schematic)</text>`;
    svg.innerHTML=s;
    rg.setAttribute('aria-valuetext',`${P.t}`);
    note.innerHTML=noteHTML(P);setSt(p)}
  const stop=playWire(rg,$('#mdPlay'),draw,24000,'Replay','modulators');
  setSt=stepWire($('#mdSteps'),MD_STEPS,rg,draw,stop);
  function upd(){const key=(tog.t1?'1':'0')+(tog.t2?'1':'0')+(tog.pot?'1':'0');
    $$('[data-mdt]').forEach(b=>b.setAttribute('aria-pressed',String(tog[b.dataset.mdt])));
    const pre={'001':'k','101':'o','111':'t'}[key];$$('[data-mdp]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mdp===pre)));
    combo.innerHTML=MD_COMBO[key];draw(+rg.value)}
  $$('[data-mdt]').forEach(b=>b.addEventListener('click',()=>{tog[b.dataset.mdt]=!tog[b.dataset.mdt];upd()}));
  $$('[data-mdp]').forEach(b=>b.addEventListener('click',()=>{const m={k:[0,0,1],o:[1,0,1],t:[1,1,1]}[b.dataset.mdp];tog.t1=!!m[0];tog.t2=!!m[1];tog.pot=!!m[2];if(+rg.value<.86){rg.value=.95}upd()}));
  upd();

  /* ---------- liver test schedule as the labels state ---------- */
  const lv=$('#mdLft'),lvCap=$('#mdLftCap');let lvKey='new';
  const LV={new:{dots:[0,1,2,3,4,5,6,9,12,15,18,30],lbl:'Trikafta (and Alyftrek, same boxed warning)',
      cap:`The Trikafta label: ALT, AST, alkaline phosphatase and bilirubin before starting, monthly for the first 6 months, every 3 months for the next 12 months, then at least yearly. Liver injury was reported from the first month up to 15 months after starting (shaded) [[FDA-Trikafta]]. Alyftrek carries the same boxed warning [[FDA-Alyftrek]].`},
    old:{dots:[0,3,6,9,12,24],lbl:'Kalydeco and Symdeko (older labels)',
      cap:`The ivacaftor and tezacaftor-ivacaftor labels recommend transaminases before starting, every 3 months in the first year, then yearly; dosing is interrupted if ALT or AST is more than 5 times the upper limit of normal [[FDA-Kalydeco,FDA-Symdeko]].`}};
  function drawLv(){const N=vb(lv,'720 170','400 210'),D=LV[lvKey],x=N?20:40,w=N?360:640,y=N?110:96,X=m=>x+w*m/30;let s='';
    s+=`<text x="${x}" y="22" class="t-lbl">${D.lbl}</text><text x="${x}" y="38" class="t-xs">${N?'months after starting; dots = tests listed':'months after starting (schematic timeline; dots are the tests the label lists)'}</text>`;
    if(lvKey==='new')s+=`<rect x="${f1(X(1))}" y="${y-30}" width="${f1(X(15)-X(1))}" height="44" rx="6" style="fill:var(--bad-soft)"/><text x="${f1(X(8))}" y="${y-36}" class="t-xs t-mid" style="fill:var(--bad);font-weight:600">liver injury reported: month 1 to 15</text>`;
    s+=tline(x,y+20,w,{min:0,max:30,step:N?6:3,fmt:v=>v}).svg;
    D.dots.forEach((m,i)=>{s+=`<circle cx="${f1(X(m))}" cy="${y}" r="${N?5:6}" style="fill:${i===0?'var(--ink)':'var(--rx)'};stroke:var(--panel);stroke-width:2"/>`});
    s+=`<text x="${f1(X(0))}" y="${y-12}" class="t-xs t-mid" style="fill:var(--ink)">before</text>`;
    s+=`<text x="${f1(X(30))}" y="${y-12}" class="t-xs t-mid" style="fill:var(--ink)">then yearly</text>`;
    lv.innerHTML=s;lvCap.innerHTML=D.cap;$$('[data-mdl]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mdl===lvKey)))}
  $$('[data-mdl]').forEach(b=>b.addEventListener('click',()=>{lvKey=b.dataset.mdl;drawLv()}));
  drawLv();

  /* ---------- CYP3A: exposure changes the Trikafta label reports ---------- */
  const cy=$('#mdCyp'),cyCap=$('#mdCypCap');let cyKey='ind',cyStop=null;
  const CY={ind:{rows:[['ivacaftor',.11,'−89% AUC']],title:'With rifampin, a strong CYP3A inducer',
      cap:`Rifampin cut ivacaftor exposure (AUC) by 89%, so the label does not recommend strong CYP3A inducers with ETI [[FDA-Trikafta]].`},
    inh:{rows:[['elexacaftor',2.8,'2.8-fold AUC'],['tezacaftor',4.25,'4.0–4.5-fold AUC']],title:'With itraconazole, a strong CYP3A inhibitor',
      cap:`Itraconazole raised elexacaftor AUC 2.8-fold and tezacaftor AUC 4.0–4.5-fold (the bar is drawn at the middle of that range). All three ETI components are CYP3A substrates and ivacaftor is a sensitive one, so the label reduces the dose with strong or moderate CYP3A inhibitors and advises avoiding grapefruit [[FDA-Trikafta]].`}};
  function drawCy(vals){const N=vb(cy,'720 190','400 230'),D=CY[cyKey],x=N?100:150,w=N?280:520,mx=5,X=v=>x+w*v/mx;let s=`<text x="${N?12:16}" y="22" class="t-lbl">${D.title}</text>`;
    s+=`<text x="${N?12:16}" y="38" class="t-xs">drug exposure (AUC) relative to the drug taken alone = 1×</text>`;
    [0,1,2,3,4,5].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="52" y2="${N?190:160}" class="grid"/><text x="${f1(X(v))}" y="${N?206:176}" class="t-xs t-mid">${v}×</text>`});
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="48" y2="${N?192:162}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    D.rows.forEach((r,i)=>{const yy=(N?62:58)+i*(N?54:46),v=vals[i];
      s+=`<text x="${x-10}" y="${yy+17}" class="t-sm t-end" style="fill:var(--ink)">${r[0]}</text>`;
      s+=`<rect x="${f1(X(0))}" y="${yy}" width="${f1(X(v)-X(0))}" height="26" rx="5" style="fill:${r[1]<1?'var(--warn)':'var(--bad)'};opacity:.8"/>`;
      s+=`<text x="${f1(X(v)+8)}" y="${yy+17}" class="t-sm" style="fill:var(--ink);font-weight:600">${r[2]}</text>`});
    cy.innerHTML=s}
  function setCy(k){cyKey=k;cyCap.innerHTML=CY[k].cap;$$('[data-mdc]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mdc===k)));
    if(cyStop)cyStop();const tgt=CY[k].rows.map(r=>r[1]);cyStop=animate(900,q=>{drawCy(tgt.map(v=>lerp(1,v,ease(q))))},()=>{cyStop=null})}
  $$('[data-mdc]').forEach(b=>b.addEventListener('click',()=>setCy(b.dataset.mdc)));
  cyCap.innerHTML=CY.ind.cap;drawCy(CY.ind.rows.map(r=>r[1]));
};
