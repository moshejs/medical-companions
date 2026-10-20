/* =============== 3.1 synapse: cholinesterase inhibitors and memantine =============== */
const SY_STEPS=[
 {from:0,at:.07,k:'Step 1 · Making it',t:'Acetylcholine is made',
  txt:`Choline acetyltransferase (ChAT) joins acetyl-CoA and choline into acetylcholine (ACh) in the presynaptic terminal. The vesicular acetylcholine transporter (VAChT) loads it into synaptic vesicles. [[FerreiraVieira2016]]`,
  pt:`The nerve ending builds its chemical messenger from two parts and stores it in tiny bubbles.`},
 {from:.17,at:.27,k:'Step 2 · Release',t:'Vesicles empty into the cleft',
  txt:`When the terminal depolarises, vesicles fuse with the membrane and release acetylcholine into the synaptic cleft by exocytosis. [[FerreiraVieira2016]]`,
  pt:`A signal arrives and the bubbles empty the messenger into the narrow gap between two cells.`},
 {from:.34,at:.44,k:'Step 3 · Binding',t:'Muscarinic and nicotinic receptors',
  txt:`Acetylcholine binds muscarinic receptors (M1 to M5, G-protein-coupled; M1 and M3 sit mainly after the synapse) and nicotinic receptors (five-subunit cation channels, in the brain mostly before the synapse, where they regulate release). [[FerreiraVieira2016]]`,
  pt:`The messenger lands on receivers on the next cell and passes the signal on.`,
  hook:`Muscarinic = G-protein-coupled (M1 to M5). Nicotinic = ligand-gated ion channel built from five subunits.`},
 {from:.5,at:.6,k:'Step 4 · Breakdown',t:'Two enzymes clear the cleft',
  txt:`Acetylcholinesterase (AChE) in the cleft quickly splits acetylcholine into acetate and choline. Butyrylcholinesterase (BuChE) also breaks it down. As dementia becomes more severe, BuChE activity rises while AChE activity falls. [[FerreiraVieira2016,Lane2006,Greig2005]]`,
  pt:`Enzymes in the gap chop the messenger up within moments, so each signal is short.`},
 {from:.66,at:.75,k:'Step 5 · Recycling',t:'Choline goes back for reuse',
  txt:`The high-affinity choline transporter (CHT1) carries choline back into the terminal, where it is used to make new acetylcholine. [[FerreiraVieira2016]]`,
  pt:`One of the pieces is pulled back into the nerve ending and reused.`},
 {from:.84,at:.95,k:'Step 6 · The result',t:'How long the signal lasts',txt:''}
];
/* the final step depends on what is selected */
const SY_COND={
 healthy:{lbl:'Healthy',n:18,ves:[0,1,2,3,4],bind:10,ache:0,buche:0,
  txt:`In a healthy synapse the burst of acetylcholine is large and brief: it is released, binds, and is cleared within moments, ready for the next signal. [[FerreiraVieira2016]] Switch to Alzheimer's to compare.`,
  pt:`Lots of messenger, a strong signal, then a quick clean-up.`},
 ad:{lbl:'Alzheimer\'s, untreated',n:8,ves:[1,3],bind:4,ache:0,buche:0,
  txt:`In Alzheimer's, cholinergic input from the basal forebrain (including the nucleus basalis of Meynert) to limbic and cortical areas is progressively lost; neurofibrillary degeneration is thought to be the main cause. Fewer terminals means less acetylcholine reaches the receptors. The 1982 cholinergic hypothesis tied this loss to memory dysfunction. [[Hampel2018,FerreiraVieira2016,Bartus1982]]`,
  pt:`Fewer nerve endings make less messenger, so the signal is weaker.`,
  hook:`Cholinergic hypothesis (Bartus 1982): loss of basal forebrain cholinergic input relates to memory loss. It is the rationale for every cholinesterase inhibitor.`},
 don:{lbl:'Donepezil',n:8,ves:[1,3],bind:4,ache:1,buche:0,
  txt:`Donepezil selectively inhibits AChE, so acetylcholine lingers in the cleft and keeps reaching receptors. Its half-life is about 70 hours. It does not add terminals back: the labels state no evidence that cholinesterase inhibitors change the course of the disease, and the effect may lessen as fewer cholinergic neurons remain. [[Noetzli2013,FDAAricept2021,FDAExelonPatch2024,FDAGalantamineER2025]]`,
  pt:`The drug jams the clean-up enzyme, so the little messenger there is lasts longer.`,
  hook:`Cholinesterase inhibitors are symptomatic: they boost the remaining signal, they do not slow the disease.`},
 riv:{lbl:'Rivastigmine',n:8,ves:[1,3],bind:4,ache:1,buche:1,
  txt:`Rivastigmine is a pseudo-irreversible carbamate inhibitor of both AChE and BuChE, with similar affinity for each. Its plasma half-life is about 1 to 2 hours, yet it keeps AChE inhibited for about 8.5 hours and BuChE for about 3.5 hours. Whether the BuChE action adds anything clinically is not established. [[Noetzli2013,Wilkinson2004]]`,
  pt:`This one jams both clean-up enzymes. Whether jamming the second one helps people more is not known.`,
  hook:`Rivastigmine is the only one of the three that also inhibits BuChE. The 2006 Cochrane review found no efficacy difference between the three, and fewer adverse effects with donepezil than rivastigmine. [[Birks2006]]`},
 gal:{lbl:'Galantamine',n:8,ves:[1,3],bind:4,ache:1,buche:0,flag:1,
  txt:`Galantamine is a competitive, reversible AChE inhibitor with a half-life of about 7 hours, cleared through CYP2D6 and CYP3A4. A 2003 study reported that it also boosts nicotinic receptors as an allosteric potentiating ligand. A 2018 study on human α4β2 and α7 receptors did not reproduce this, and found pore block at higher concentrations. A 2004 review judged the relevance at brain levels unclear. [[FDAGalantamineER2025,Noetzli2013,Samochocki2003,Kowal2018,Wilkinson2004]]`,
  pt:`It jams the clean-up enzyme like the others. A claimed second action on nicotinic receptors was not reproduced in a later study, so it is disputed.`,
  hook:`Galantamine's nicotinic modulation: reported 2003 (Samochocki), not reproduced 2018 (Kowal). Treat it as contested.`}
};
const SY_NM=[
 {from:0,at:.06,k:'Step 1 · At rest',t:'Magnesium plugs the channel',
  txt:`The NMDA receptor is a channel that opens when glutamate binds. At the resting voltage a magnesium ion sits in the pore and blocks it, so glutamate alone lets little through (textbook physiology).`,
  pt:`This gate needs two keys: the chemical signal and an electrical push. At rest a magnesium plug sits in it.`},
 {from:.14,at:.22,k:'Step 2 · A real signal',t:'A burst gets through',
  txt:`A strong signal brings a burst of glutamate and depolarises the membrane. The magnesium ion is pushed out, and calcium flows in briefly. This short, large calcium signal is part of how synapses strengthen (textbook physiology).`,
  pt:`A real message pops the plug out, and a short rush of calcium carries the signal.`},
 {from:.31,at:.43,k:'Step 3 · The leak',t:'Tonic glutamate, constant trickle',
  txt:`The rationale for memantine is that in Alzheimer's, NMDA receptors are activated too much, and the excess calcium entry is harmful. Here a low, constant glutamate level keeps nudging the channel, the magnesium block is incomplete, and calcium trickles in all the time: background noise that also hides real signals. [[Parsons1999,Lipton2006]]`,
  pt:`A slow, steady leak of the chemical keeps the gate half-working all the time. The constant trickle of calcium is thought to harm the cell.`},
 {from:.53,at:.64,k:'Step 4 · Memantine enters',t:'An open-channel blocker',
  txt:`Memantine is a low-to-moderate-affinity, uncompetitive NMDA receptor antagonist: it can only enter a channel that is already open, and it sits in the pore, close to where magnesium binds. It blocks channels that are pathologically overactive. [[FDAMemantineER2026,McShane2019,Parsons1999,Lipton2006]]`,
  pt:`Memantine slips into the gates that are stuck open and plugs the leak.`,
  hook:`Memantine is uncompetitive (open-channel) and voltage-dependent. It does not compete with glutamate for its binding site.`},
 {from:.74,at:.83,k:'Step 5 · A signal again',t:'The burst still gets through',
  txt:`Because memantine's blocking kinetics are rapid and strongly voltage-dependent, a strong depolarisation drives it out of the pore, the burst of calcium passes, and memantine returns as the membrane settles. Its tolerability is attributed to this moderate potency and fast kinetics. One of the two reviews making this case (Parsons 1999) comes from the developer, Merz. [[Parsons1999,Lipton2006]]`,
  pt:`When a real message arrives, memantine pops out like the magnesium did, then slips back in.`},
 {from:.92,at:.97,k:'Step 6 · What it does not do',t:'Symptomatic, not disease-modifying',
  txt:`The memantine label states no evidence that it prevents or slows neurodegeneration. In the 2019 Cochrane review it helped a little in moderate-to-severe Alzheimer's, not in mild Alzheimer's, and was not effective for agitation (CMAI +0.50, 95% CI −3.71 to 4.71). [[FDAMemantineER2026,McShane2019]]`,
  pt:`It may ease symptoms a little in later stages. It does not stop the disease.`,
  hook:`Memantine: moderate to severe Alzheimer's. In mild Alzheimer's the Cochrane review found no benefit.`}
];
const SY_BEN=[
 {k:'Effect sizes',t:'Small on every scale',
  txt:`Donepezil (Cochrane 2018, 26 weeks, 10 mg): ADAS-Cog −2.67 points on a 0 to 70 scale (95% CI −3.31 to −2.02), MMSE +1.05 (0.73 to 1.37), and clinician-rated global improvement more likely (OR 1.92, 1.54 to 2.39). Rivastigmine: ADAS-Cog −1.79. Galantamine 24 mg: about −3.1. Memantine in moderate-to-severe disease: SIB +3.11 on a 0 to 100 scale; in mild disease, no benefit (ADAS-Cog 0.21, −0.95 to 1.38). DOMINO set the minimal clinically important difference at 1.4 SMMSE points. [[Birks2018,Birks2015,Loy2006,McShane2019,Howard2012]]`,
  pt:`On average the pills move test scores by a few points on scales of 30, 70 or 100 points. The Cochrane reviewers call that small.`,
  hook:`Donepezil vs placebo at 26 weeks: ADAS-Cog −2.67, MMSE +1.05. Cochrane calls the benefits small. Most trials lasted 6 months or less. [[Birks2018]]`},
 {k:'Side effects',t:'Mostly the gut, mostly while doses rise',
  txt:`Label rates, drug versus placebo. Oral rivastigmine had the most nausea and vomiting; the 9.5 mg patch in the IDEAL trial had about two-thirds less than capsules. Most galantamine effects occurred during dose escalation. All three inhibitor labels warn of slow heart rate, heart block and fainting; in an Ontario cohort, syncope visits were 31.5 versus 18.6 per 1,000 person-years (HR 1.76). [[FDAAricept2021,FDARivastigmineCaps2022,FDAGalantamineER2025,FDAMemantineIR2023,Winblad2007,Gill2009]]`,
  pt:`Upset stomach is the commonest problem with the first three. Memantine's commonest are dizziness and headache. Slow heartbeat and fainting are rarer but serious.`,
  hook:`Cholinesterase inhibitors are vagotonic: bradycardia, heart block, syncope. Beers 2023: avoid them when syncope may be due to bradycardia. [[AGS2023]]`},
 {k:'Stopping',t:'DOMINO: what happened when donepezil stopped',
  txt:`DOMINO (295 people with moderate-to-severe Alzheimer's already on donepezil): continuing gave +1.9 SMMSE (95% CI 1.3 to 2.5) and 3.0 points less BADLS impairment (1.8 to 4.3) over 52 weeks. Stopping roughly doubled nursing-home placement in the first year (HR 2.09, 1.29 to 3.39) with no difference over the next 3 years (HR 0.89). Over 4 years, 55% moved into a nursing home. A 2021 Cochrane review found no trials of stopping memantine alone. [[Howard2012,Howard2015,Parsons2021]]`,
  pt:`Stopping donepezil in later stages was followed by faster decline and earlier moves into care in the first year. The authors say stop-or-continue decisions should weigh the possible harms of stopping.`,
  hook:`DOMINO-AD: stopping donepezil → HR 2.09 for nursing-home placement in year 1, no difference in years 2 to 4. [[Howard2015]]`}
];
inits.synapse=()=>{
  /* ---------- 1. cholinergic synapse ---------- */
  const svg=$('#sySvg'),rg=$('#syT');let cond='healthy';
  const R=rng(311),MOL=Array.from({length:18},(_,i)=>({a:R(),b:R(),c:R(),d:R(),e:R()}));
  const VX=[170,230,290,350,410],RX=[130,195,260,325,390],RT=['M','N','M','N','M'],EX=[162,292,357],BX=432;
  const CH={x:100,y:92},CT={x:90,y:190};
  function cfg(c){return SY_COND[c]}
  /* state of molecule i at time u under config C */
  function mol(i,u,C){
    const m=MOL[i],n=C.n,vi=C.ves[i%C.ves.length],eIdx=i%4,isB=eIdx===3;
    const blocked=isB?C.buche:C.ache;
    const ap=.02+.12*i/n;
    const brk=blocked?(.66+.72*(((i*7)%n)/n)):(.5+.16*i/n);
    const ex=isB?BX:EX[eIdx],ey=isB?240:250;
    const vy=lerp(135,172,ease(ramp(u,.18,.24)));
    const ang=i*2.4,vsx=VX[vi]+Math.cos(ang)*7,vsy=vy+Math.sin(ang)*7;
    const csx=clamp(VX[vi]+(m.a-.5)*50,70,440),csy=205+m.b*16;
    const bound=i<C.bind;const r=i%5;
    const tx=bound?RX[r]+(i<5?-4:4):clamp(70+m.c*370,70,440),ty=bound?259:216+m.d*24;
    if(u<ap)return null;
    let x,y,st='ach';
    if(u<ap+.04){const p=ease(ramp(u,ap,ap+.04));x=lerp(CH.x,vsx,p);y=lerp(CH.y,vsy,p)}
    else if(u<.25){x=vsx;y=vsy}
    else if(u<.33){const p=ease(ramp(u,.25,.33));x=lerp(vsx,csx,p);y=lerp(vsy,csy,p)}
    else{const p=ease(ramp(u,.33+.02*(i%4),.46));x=lerp(csx,tx,p);y=lerp(csy,ty,p);
      if(blocked&&u>.52){const w=.5+.5*Math.sin(u*34+i*1.3);x=lerp(x,csx,w*.55);y=lerp(y,csy,w*.55)}}
    if(u>=brk-.04&&u<brk){const p=ease(ramp(u,brk-.04,brk));x=lerp(x,ex,p);y=lerp(y,ey-10,p)}
    if(u>=brk){const s=Math.max(brk+.02,.66)+.02*(i%3);
      let cx=ex+4,cy=ey-12;
      if(u>s){const p=ease(ramp(u,s,s+.08));cx=lerp(ex+4,CT.x,p);cy=lerp(ey-12,CT.y+4,p)}
      let co=1;if(u>s+.08){const p=ramp(u,s+.08,s+.13);cy=lerp(CT.y+4,CT.y-36,p);co=1-p}
      const ao=1-ramp(u,brk,brk+.12),ax=ex-6+ramp(u,brk,brk+.12)*-10,ay=ey-8+ramp(u,brk,brk+.12)*-26;
      return {st:'split',cx,cy,co,ax,ay,ao,blocked}}
    return {st,x,y,bound:bound&&u>.44&&u<brk-.04,r,blocked}
  }
  function inCleft(i,u,C){const n=C.n,eIdx=i%4,isB=eIdx===3,blocked=isB?C.buche:C.ache;
    const brk=blocked?(.66+.72*(((i*7)%n)/n)):(.5+.16*i/n);return u<brk?ramp(u,.25,.34):0}
  function curve(C,u1){let d='';for(let k=0;k<=100;k++){const u=k/100*u1;let s=0;for(let i=0;i<C.n;i++)s+=inCleft(i,u,C);d+=(k?'L':'M')+u.toFixed(4)+' '+(s/18).toFixed(4)}return d}
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const X=x=>N?16+(x-30)*(368/450):x;
    const L=N?{ch:{x0:44,x1:380,y0:450,y1:604,tY:432,lgY:640},title:'PRESYNAPTIC TERMINAL',adTxt:'fewer terminals, less ACh',nic:'nicotinic boost? 2003 yes, 2018 not reproduced'}
             :{ch:{x0:528,x1:704,y0:84,y1:296,tY:68,lgY:330},title:'PRESYNAPTIC TERMINAL',adTxt:'fewer cholinergic terminals, less ACh',nic:'nicotinic boost? reported 2003, not reproduced 2018'};
    const C=cfg(cond),ad=cond!=='healthy';
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* terminal */
    s+=`<path d="M${X(60)} 18 H${X(450)} V150 Q${X(450)} 190 ${X(410)} 190 H${X(100)} Q${X(60)} 190 ${X(60)} 150 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2;opacity:${ad?.75:1}"/>`;
    s+=`<text x="${X(72)}" y="38" class="t-sm">${L.title}</text>`;
    if(ad)s+=`<text x="${X(440)}" y="38" class="t-xs t-end" style="fill:var(--rose)">${L.adTxt}</text>`;
    if(C.ache){const dl=cond==='riv'?(N?'+ rivastigmine: AChE and BuChE blocked':'+ rivastigmine: AChE and BuChE blocked'):`+ ${C.lbl.toLowerCase()}: AChE blocked`;
      s+=`<text x="${X(440)}" y="54" class="t-xs t-end" style="fill:var(--sky);font-weight:700">${dl}</text>`}
    /* signal arrives */
    const sig=bump(t,.15,.26);if(sig>0)s+=`<g style="opacity:${f1(sig)}"><path d="M${X(300)} 62 V108" class="arrow" marker-end="url(#syA)" style="stroke:var(--ink);stroke-width:2.4"/><text x="${X(308)}" y="80" class="t-xs">signal arrives</text></g>`;
    /* ChAT and the reaction */
    s+=`<rect x="${X(CH.x)-22}" y="${CH.y-11}" width="44" height="22" rx="7" style="fill:var(--panel);stroke:var(--violet);stroke-width:1.6"/><text x="${X(CH.x)}" y="${CH.y+4}" class="t-xs t-mid" style="fill:var(--violet);font-weight:700">ChAT</text>`;
    const ro=1-ramp(t,.16,.22);if(ro>0)s+=`<text x="${X(CH.x)}" y="${CH.y+30}" class="t-xs t-mid" style="opacity:${f1(ro)}">acetyl-CoA + choline</text>`;
    /* CHT1 transporter */
    s+=`<rect x="${X(CT.x)-9}" y="${CT.y-9}" width="6" height="18" rx="2" style="fill:var(--sage)"/><rect x="${X(CT.x)+3}" y="${CT.y-9}" width="6" height="18" rx="2" style="fill:var(--sage)"/><text x="${X(CT.x)}" y="${CT.y-16}" class="t-xs t-mid" style="fill:var(--sage)">CHT1</text>`;
    /* vesicles */
    const vy=lerp(135,172,ease(ramp(t,.18,.24))),fuse=ramp(t,.24,.3);
    C.ves.forEach(vi=>{const x=X(VX[vi]);
      if(fuse<1)s+=`<circle cx="${f1(x)}" cy="${f1(vy)}" r="${f1(15*(1-fuse*.5))}" style="fill:var(--violet-soft);stroke:var(--violet);stroke-width:1.4;opacity:${f1(1-fuse)}"/>`;
      if(fuse>0&&t<.5)s+=`<path d="M${f1(x-16)} 190 Q${f1(x)} ${f1(190-14*(1-fuse))} ${f1(x+16)} 190" style="fill:none;stroke:var(--violet);stroke-width:1.4;opacity:${f1(1-ramp(t,.34,.5))}"/>`});
    /* cleft label */
    s+=`<text transform="translate(${X(46)} 232) rotate(-90)" class="t-xs t-mid">cleft</text>`;
    /* postsynaptic cell */
    s+=`<path d="M${X(40)} 270 H${X(470)} V392 H${X(40)} Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<text x="${X(52)}" y="382" class="t-sm">POSTSYNAPTIC NEURON</text>`;
    /* glia with BuChE */
    s+=`<ellipse cx="${X(470)}" cy="226" rx="${N?12:16}" ry="34" style="fill:var(--glia);opacity:.35"/><text x="${X(470)}" y="${N?206:204}" class="t-xs t-mid" style="fill:var(--glia)">glia</text>`;
    /* molecules: work out which receptors are lit */
    const lit=[0,0,0,0,0];const parts=[];
    for(let i=0;i<C.n;i++){const m=mol(i,t,C);if(!m)continue;
      if(m.st==='split'){if(m.co>0)parts.push(`<circle cx="${f1(X(m.cx))}" cy="${f1(m.cy)}" r="2.8" style="fill:var(--sage);opacity:${f1(m.co)}"/>`);
        if(m.ao>0)parts.push(`<rect x="${f1(X(m.ax)-2)}" y="${f1(m.ay-2)}" width="4.4" height="4.4" style="fill:var(--muted);opacity:${f1(m.ao)}"/>`)}
      else{if(m.bound)lit[m.r]=1;parts.push(`<circle cx="${f1(X(m.x))}" cy="${f1(m.y)}" r="3.6" style="fill:var(--violet)"/>`)}}
    /* receptors */
    RX.forEach((x0,k)=>{const x=X(x0),on=lit[k],sty=`fill:${on?'var(--violet-soft)':'var(--panel)'};stroke:${on?'var(--violet)':'var(--cell-line)'};stroke-width:1.6`;
      if(RT[k]==='M')s+=`<rect x="${f1(x-8)}" y="257" width="16" height="26" rx="5" style="${sty}"/><path d="M${f1(x-3)} 261v18M${f1(x+3)} 261v18" style="stroke:${on?'var(--violet)':'var(--cell-line)'};stroke-width:1"/>`;
      else s+=`<rect x="${f1(x-11)}" y="255" width="8" height="30" rx="3" style="${sty}"/><rect x="${f1(x+3)}" y="255" width="8" height="30" rx="3" style="${sty}"/>`;
      s+=`<text x="${f1(x)}" y="${RT[k]==='M'?296:298}" class="t-xs t-mid" style="font-weight:700">${RT[k]}</text>`;
      if(on)s+=`<path d="M${f1(x-9)} 306 q9 6 18 0 M${f1(x-6)} 312 q6 4 12 0" style="fill:none;stroke:var(--violet);stroke-width:1.4"/>`;
      if(C.flag&&RT[k]==='N')s+=`<rect x="${f1(x-14)}" y="252" width="28" height="36" rx="6" style="fill:none;stroke:var(--warn);stroke-width:1.4;stroke-dasharray:3 3"/>`});
    /* enzymes */
    const enz=(x,y,lab,blk,col)=>{let g=`<path d="M${f1(x)} ${y+10} V270" style="stroke:var(--cell-line);stroke-width:2"/>`;
      g+=`<path d="M${f1(x)} ${y} L${f1(x-7)} ${y-9} A11 11 0 1 0 ${f1(x+7)} ${y-9} Z" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`;
      if(blk)g+=`<rect x="${f1(x-4.5)}" y="${y-10}" width="9" height="9" transform="rotate(45 ${f1(x)} ${y-5.5})" style="fill:var(--sky);stroke:var(--panel);stroke-width:1"/>`;
      return g+`<text x="${f1(x)}" y="${lab==='BuChE'?(N?336:322):296}" class="t-xs t-mid" style="fill:${col}">${lab}</text>`};
    EX.forEach(x=>{s+=enz(X(x),250,'AChE',C.ache,'var(--ink)')});
    s+=enz(X(BX),240,'BuChE',C.buche,'var(--glia)');
    s+=parts.join('');
    if(C.flag)s+=`<text x="${X(60)}" y="${N?324:340}" class="t-xs" style="fill:var(--warn)">${L.nic}</text>`;
    /* glyph legend */
    const lgY=N?356:358,lx=N?[32,108,198,290]:[60,150,250,350];
    s+=`<circle cx="${lx[0]+4}" cy="${lgY-3}" r="3.6" style="fill:var(--violet)"/><text x="${lx[0]+12}" y="${lgY}" class="t-xs">ACh</text>`;
    s+=`<rect x="${lx[1]}" y="${lgY-7}" width="8" height="8" transform="rotate(45 ${lx[1]+4} ${lgY-3})" style="fill:var(--sky)"/><text x="${lx[1]+13}" y="${lgY}" class="t-xs">inhibitor</text>`;
    s+=`<circle cx="${lx[2]+4}" cy="${lgY-3}" r="2.8" style="fill:var(--sage)"/><text x="${lx[2]+12}" y="${lgY}" class="t-xs">choline</text>`;
    s+=`<rect x="${lx[3]+1}" y="${lgY-5}" width="4.4" height="4.4" style="fill:var(--muted)"/><text x="${lx[3]+12}" y="${lgY}" class="t-xs">acetate</text>`;
    /* chart: ACh in the cleft over one signal */
    const K=L.ch,cw=K.x1-K.x0,chh=K.y1-K.y0;
    const map=d=>d.replace(/([ML])([\d.]+) ([\d.]+)/g,(_,c,u,v)=>c+f1(K.x0+ +u*cw)+' '+f1(K.y1-(+v)*chh*.92));
    s+=`<text x="${K.x0-4}" y="${K.tY}" class="t-sm">ACh IN THE CLEFT</text>`;
    s+=`<path d="M${K.x0} ${K.y0} V${K.y1} H${K.x1}" class="axis" style="fill:none"/>`;
    [.25,.5,.66,.84].forEach(u=>{s+=`<path d="M${f1(K.x0+u*cw)} ${K.y0} V${K.y1}" class="grid"/>`});
    s+=`<text x="${K.x0}" y="${K.y1+14}" class="t-xs">make</text><text x="${f1(K.x0+.25*cw)}" y="${K.y1+14}" class="t-xs">release</text><text x="${f1(K.x0+.5*cw)}" y="${K.y1+14}" class="t-xs">clear</text><text x="${K.x1}" y="${K.y1+14}" class="t-xs t-end">time →</text>`;
    s+=`<text x="${K.x0+6}" y="${K.y0+10}" class="t-xs">more</text>`;
    s+=`<path d="${map(curve(SY_COND.healthy,1))}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 4"/>`;
    if(cond!=='healthy'){s+=`<path d="${map(curve(SY_COND.ad,1))}" style="fill:none;stroke:var(--rose);stroke-width:1.4;stroke-dasharray:1 3;opacity:.9"/>`}
    const col=C.ache?'var(--sky)':(ad?'var(--rose)':'var(--violet)');
    s+=`<path d="${map(curve(C,t))}" style="fill:none;stroke:${col};stroke-width:2.8"/>`;
    let now=0;for(let i=0;i<C.n;i++)now+=inCleft(i,t,C);
    s+=`<circle cx="${f1(K.x0+t*cw)}" cy="${f1(K.y1-now/18*chh*.92)}" r="4.5" style="fill:${col}"/>`;
    const ly=K.lgY;
    s+=`<path d="M${K.x0} ${ly-4} h22" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 4"/><text x="${K.x0+28}" y="${ly}" class="t-xs">healthy</text>`;
    if(cond!=='healthy'&&C.ache)s+=`<path d="M${K.x0+(N?100:84)} ${ly-4} h22" style="stroke:var(--rose);stroke-width:1.4;stroke-dasharray:1 3"/><text x="${K.x0+(N?128:112)}" y="${ly}" class="t-xs">untreated</text>`;
    s+=`<path d="M${K.x0} ${ly+12} h22" style="stroke:${col};stroke-width:2.8"/><text x="${K.x0+28}" y="${ly+16}" class="t-xs" style="fill:var(--ink)">${C.lbl}</text>`;
    svg.innerHTML=`<defs>${marker('syA','var(--ink)')}</defs>`+s;
    const p=phaseOf(SY_STEPS,t);setSt(p);
    let P=SY_STEPS[p];if(p===5)P={...P,t:C.lbl+': how long the signal lasts',txt:C.txt,pt:C.pt,hook:C.hook};
    $('#syNote').innerHTML=noteHTML(P);
    $('#syCap').textContent=`Showing: ${C.lbl}. Schematic, not to scale. The chart counts the molecules in the drawing; it is not measured data.`;
  }
  const stop=playWire(rg,$('#syPlay'),draw,16000,'Replay','synapse');
  const setSt=stepWire($('#sySteps'),SY_STEPS,rg,draw,stop);
  $$('[data-sy]').forEach(b=>b.addEventListener('click',()=>{cond=b.dataset.sy;$$('[data-sy]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));

  /* ---------- 2. memantine at the NMDA receptor ---------- */
  const nm=$('#syNm'),nr=$('#syNmT');let tight=false;
  const V=u=>bump(u,.15,.29)+bump(u,.75,.89)+(u>.31&&u<.75?.12+.04*Math.sin(u*90):0);
  const memIn=u=>{if(u<.55)return 0;const enter=ease(ramp(u,.55,.63));if(tight)return enter;return enter*(1-ramp(u,.77,.8))+ramp(u,.89,.94)*(u>.89?1:0)};
  const leak=u=>u>.31?ramp(u,.31,.36)*(.32+.1*Math.sin(u*70)+.06*Math.sin(u*170)):0;
  const Ca=u=>{const burst1=bump(u,.16,.29),burst2=bump(u,.76,.89);const m=memIn(u);
    return Math.max(burst1,tight?burst2*.08:burst2*.92,leak(u)*(1-m*.9))};
  function drawNm(t){
    const N=vb(nm,'720 380','400 700');
    const L=N?{cx:200,top:44,mY0:150,mY1:226,inY:300,tr:{x0:40,x1:380,v0:404,v1:484,c0:552,c1:640},lab:{x:200,y:24,a:'t-mid'}}
             :{cx:200,top:44,mY0:150,mY1:226,inY:300,tr:{x0:440,x1:704,v0:62,v1:150,c0:212,c1:316},lab:{x:200,y:24,a:'t-mid'}};
    const cx=L.cx,my0=L.mY0,my1=L.mY1;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const zoneW=N?400:400;
    s+=`<rect x="0" y="0" width="${zoneW}" height="${my0}" style="fill:var(--csf);opacity:.4"/>`;
    s+=`<text x="${N?16:20}" y="${my0-10}" class="t-xs">OUTSIDE</text><text x="${N?16:20}" y="${my1+20}" class="t-xs">INSIDE THE NEURON</text>`;
    /* membrane */
    for(let x=(N?12:16);x<(N?392:384);x+=12){if(Math.abs(x-cx)<52)continue;s+=`<circle cx="${x}" cy="${my0+6}" r="4.6" style="fill:var(--cell-line)"/><circle cx="${x}" cy="${my1-6}" r="4.6" style="fill:var(--cell-line)"/><path d="M${x} ${my0+11}V${my1-11}" style="stroke:var(--cell-line);opacity:.5"/>`}
    /* channel walls */
    const open=clamp(Math.max(V(t)>.4?1:0,leak(t)*1.6)),gap=10+6*open;
    s+=`<path d="M${cx-gap} ${my0-30} Q${cx-gap-6} ${(my0+my1)/2} ${cx-gap} ${my1+28} H${cx-gap-34} Q${cx-gap-46} ${(my0+my1)/2} ${cx-gap-34} ${my0-30} Z" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/>`;
    s+=`<path d="M${cx+gap} ${my0-30} Q${cx+gap+6} ${(my0+my1)/2} ${cx+gap} ${my1+28} H${cx+gap+34} Q${cx+gap+46} ${(my0+my1)/2} ${cx+gap+34} ${my0-30} Z" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/>`;
    s+=`<text x="${cx+gap+56}" y="${my0+30}" class="t-xs">NMDA</text><text x="${cx+gap+56}" y="${my0+42}" class="t-xs">receptor</text>`;
    /* glutamate on binding sites */
    const gB=Math.max(bump(t,.14,.3),bump(t,.74,.9));const gT=t>.31?ramp(t,.31,.36):0;
    const occ=(k)=>gB>.2?1:(gT>0&&(Math.sin(t*60+k*2)>-.2)?1:0);
    [-1,1].forEach((d,k)=>{const x=cx+d*(gap+17),y=my0-36;
      s+=`<path d="M${x-9} ${y-6} q9 12 18 0" style="fill:none;stroke:var(--sage);stroke-width:2"/>`;
      if(occ(k))s+=`<circle cx="${x}" cy="${y-2}" r="5.5" style="fill:var(--violet)"/>`});
    /* floating glutamate */
    const nG=Math.round(gB*6+gT*2);for(let k=0;k<nG;k++){const a=k*1.9+t*8,r=40+k*9;s+=`<circle cx="${f1(cx+Math.cos(a)*r)}" cy="${f1(my0-62+Math.sin(a)*14)}" r="4" style="fill:var(--violet);opacity:.8"/>`}
    s+=`<text x="${cx+(N?-150:-160)}" y="${my0-64}" class="t-xs" style="fill:var(--violet)">glutamate</text>`;
    /* magnesium */
    const mY=(my0+my1)/2,mgOut=Math.max(clamp(V(t)*1.6-.4),leak(t)>0?(.5+.5*Math.sin(t*110))*ramp(t,.31,.36)*(1-memIn(t)):0);
    const mgy=mY-mgOut*(mY-my0+40);
    s+=`<circle cx="${cx}" cy="${f1(mgy)}" r="9" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/><text x="${cx}" y="${f1(mgy+3.5)}" class="t-xs t-mid" style="font-size:8.5px;fill:var(--ink)">Mg</text>`;
    /* memantine */
    const mi=memIn(t);
    if(t>.53){const my=lerp(my0-90,mY-18,mi),mx=lerp(cx-70,cx,mi);const o=ramp(t,.53,.56);
      const lab=tight?'tight blocker':'memantine',lw=lab.length*5.9+8,lxE=Math.min(mx-18,cx-gap-50);
      s+=`<g style="opacity:${f1(o)}"><rect x="${f1(mx-12)}" y="${f1(my-7)}" width="24" height="14" rx="7" style="fill:var(--sky);stroke:var(--panel);stroke-width:1.5"/><rect x="${f1(lxE-lw+4)}" y="${f1(my-8)}" width="${f1(lw)}" height="16" rx="4" style="fill:var(--field);opacity:.92"/><text x="${f1(lxE)}" y="${f1(my+4)}" class="t-xs t-end" style="fill:var(--sky);font-weight:700">${lab}</text></g>`}
    /* calcium flow */
    const ca=Ca(t),K=14;for(let k=0;k<K;k++){if(k/K>ca)continue;const p=(t*9+k/K)%1;const y=lerp(my0-50,my1+60,p);if(Math.abs(y-mgy)<12&&mgOut<.5)continue;if(mi>.5&&Math.abs(y-(mY-18))<10)continue;
      s+=`<circle cx="${f1(cx+Math.sin(p*9+k)*4)}" cy="${f1(y)}" r="3.4" style="fill:var(--amber)"/>`}
    s+=`<text x="${cx+gap+56}" y="${my1+46}" class="t-xs" style="fill:var(--amber)">Ca²⁺ in</text>`;
    /* phase caption */
    const ph=phaseOf(SY_NM,t);
    const cap=[ 'At rest: Mg²⁺ plugs the channel','Signal: Mg²⁺ out, a burst of Ca²⁺','Leak: Ca²⁺ trickles in all the time',tight?'Tight blocker plugs the channel':'Memantine plugs the open channel',tight?'Tight blocker stays: signal lost':'Memantine leaves: signal passes',tight?'Tight blocker: noise and signal both gone':'Leak quieted, signal kept'][ph];
    s+=`<text x="${L.lab.x}" y="${L.lab.y}" class="t-lbl t-mid">${cap}</text>`;
    s+=`<text x="${cx}" y="${L.inY+20}" class="t-xs t-mid">voltage: ${V(t)>.4?'depolarised':'near resting'}</text>`;
    /* traces */
    const T=L.tr,tw=T.x1-T.x0;
    const trace=(fn,y0,y1,col,name)=>{let g=`<text x="${T.x0}" y="${y0-8}" class="t-sm">${name}</text><path d="M${T.x0} ${y0} V${y1} H${T.x1}" class="axis" style="fill:none"/>`;
      [.14,.31,.53,.74].forEach(u=>{g+=`<path d="M${f1(T.x0+u*tw)} ${y0} V${y1}" class="grid"/>`});
      g+=`<path d="${pathFn(u=>1-fn(u*t)*.9,T.x0,T.x0+t*tw,y0,y1,160)}" style="fill:none;stroke:${col};stroke-width:2.2"/>`;
      return g};
    s+=trace(V,T.v0,T.v1,'var(--ink)','MEMBRANE VOLTAGE');
    s+=trace(Ca,T.c0,T.c1,'var(--amber)','CALCIUM ENTERING');
    const lbs=[ ['rest',0],['signal',.14],['leak',.31],[tight?'blocker':'memantine',.53],['signal',.74]];
    lbs.forEach(([l,u])=>{s+=`<text x="${f1(T.x0+u*tw+3)}" y="${T.c1+14}" class="t-xs">${l}</text>`});
    nm.innerHTML=s;
    $('#syNmNote').innerHTML=noteHTML(tight&&ph>=4?{k:'Thought experiment',t:'A blocker that never lets go',txt:`A blocker that bound tightly would silence the leak and the real signal alike. That is the contrast the developers draw: memantine's moderate potency and fast, voltage-dependent kinetics are given as the reason it leaves normal signalling largely intact and is well tolerated. [[Parsons1999,Lipton2006]] No specific drug is shown here.`,pt:`If the plug never came out, the real message would be blocked too.`}:SY_NM[ph]);
    setNm(ph);
  }
  const stopNm=playWire(nr,$('#syNmPlay'),drawNm,15000,'Replay','synapse');
  const setNm=stepWire($('#syNmSteps'),SY_NM,nr,drawNm,stopNm);
  $('#syNmMem').onclick=()=>{tight=false;$('#syNmMem').setAttribute('aria-pressed',true);$('#syNmTight').setAttribute('aria-pressed',false);drawNm(+nr.value)};
  $('#syNmTight').onclick=()=>{tight=true;$('#syNmMem').setAttribute('aria-pressed',false);$('#syNmTight').setAttribute('aria-pressed',true);drawNm(+nr.value)};

  /* ---------- 3. benefit in context ---------- */
  const bs=$('#syBen'),br=$('#syBenT');let view=0;
  const ROWS=[
   {n:'Donepezil 10 mg',m:'ADAS-Cog, 0–70, lower is better',v:2.67,lo:2.02,hi:3.31,max:70,txt:'−2.67'},
   {n:'Donepezil 10 mg',m:'MMSE, 0–30',v:1.05,lo:.73,hi:1.37,max:30,mcid:1.4,txt:'+1.05'},
   {n:'Rivastigmine',m:'ADAS-Cog, 0–70',v:1.79,lo:1.37,hi:2.21,max:70,txt:'−1.79'},
   {n:'Galantamine 24 mg',m:'ADAS-Cog, 0–70',v:3.1,lo:2.6,hi:3.7,max:70,txt:'about −3.1'},
   {n:'Memantine, moderate–severe',m:'SIB, 0–100',v:3.11,max:100,txt:'+3.11'},
   {n:'Memantine, mild',m:'ADAS-Cog, 0–70',v:.21,lo:-.95,hi:1.38,max:70,txt:'0.21: none'}
  ];
  const SE=[
   {n:'Donepezil',e:'nausea',d:11,p:6},{n:'Donepezil',e:'diarrhoea',d:10,p:5},
   {n:'Rivastigmine, oral',e:'nausea',d:47,p:12},{n:'Rivastigmine, oral',e:'vomiting',d:31,p:6},
   {n:'Rivastigmine patch*',e:'nausea',d:7.2,p:5.0},{n:'Rivastigmine patch*',e:'vomiting',d:6.2,p:3.3},
   {n:'Galantamine',e:'nausea',d:20.7,p:5.5},{n:'Galantamine',e:'vomiting',d:10.5,p:2.3},
   {n:'Memantine',e:'dizziness',d:7,p:5},{n:'Memantine',e:'headache',d:6,p:3}
  ];
  function drawBen(t){
    const N=vb(bs,'720 420','400 '+[640,740,580][view]);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(view===0){
      const rowH=N?82:52,y0=N?40:44,tx0=N?20:262,tx1=N?380:620;
      s+=`<text x="${N?20:20}" y="${N?22:24}" class="t-sm">AVERAGE DRUG–PLACEBO DIFFERENCE, DRAWN ON EACH FULL SCALE</text>`;
      ROWS.forEach((r,i)=>{const p=ease(ramp(t,i*.12,i*.12+.2));const y=y0+i*rowH+(N?40:18);
        const X=v=>tx0+(tx1-tx0)*(v/r.max);
        const o=f1(ramp(t,i*.12,i*.12+.06));
        s+=`<g style="opacity:${o}">`;
        if(N){s+=`<text x="${tx0}" y="${y-28}" class="t-lbl">${r.n}</text><text x="${tx1}" y="${y-28}" class="t-lbl t-end" style="fill:${r.v<.5?'var(--muted)':'var(--sky)'}">${r.txt}</text><text x="${tx0}" y="${y-12}" class="t-xs">${r.m}</text>`}
        else{s+=`<text x="20" y="${y-2}" class="t-lbl">${r.n}</text><text x="20" y="${y+12}" class="t-xs">${r.m}</text><text x="${tx1+10}" y="${y+5}" class="t-lbl" style="fill:${r.v<.5?'var(--muted)':'var(--sky)'}">${r.txt}</text>`}
        s+=`<rect x="${tx0}" y="${y}" width="${tx1-tx0}" height="10" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
        s+=`<rect x="${tx0}" y="${y}" width="${f1(Math.max(2,(X(r.v)-tx0)*p))}" height="10" rx="5" style="fill:var(--sky)"/>`;
        if(r.lo!=null&&p>.9){const a=Math.max(tx0,X(r.lo)),b=X(r.hi);s+=`<path d="M${f1(a)} ${y-4} H${f1(b)} M${f1(a)} ${y-7} v6 M${f1(b)} ${y-7} v6" style="stroke:var(--ink);stroke-width:1.3"/>`}
        if(r.mcid&&p>.9){const m=X(r.mcid);s+=`<path d="M${f1(m)} ${y-6} V${y+16}" style="stroke:var(--warn);stroke-width:2"/><text x="${f1(m+4)}" y="${y+24}" class="t-xs" style="fill:var(--warn)">${N?'MCID 1.4':'important change: 1.4 (DOMINO)'}</text>`}
        s+=`<text x="${tx1}" y="${y+24}" class="t-xs t-end">${r.max}</text><text x="${tx0}" y="${y+24}" class="t-xs">0</text></g>`});
      /* global impression odds ratio */
      const gy=y0+6*rowH+(N?30:22),p=ease(ramp(t,.74,.95));
      if(t>.72){const lx=v=>(N?20:262)+((N?360:358))*(Math.log(v/.5)/Math.log(8));const xa=N?20:262,xb=N?380:620;
        s+=`<g style="opacity:${f1(ramp(t,.72,.78))}">`;
        if(N)s+=`<text x="20" y="${gy-4}" class="t-lbl">Donepezil: global impression</text><text x="380" y="${gy-4}" class="t-lbl t-end" style="fill:var(--sky)">OR 1.92</text>`;
        else s+=`<text x="20" y="${gy+8}" class="t-lbl">Donepezil: clinician's</text><text x="20" y="${gy+22}" class="t-lbl">global impression</text><text x="${xb+10}" y="${gy+18}" class="t-lbl" style="fill:var(--sky)">OR 1.92</text>`;
        const yy=gy+(N?34:14);
        s+=`<path d="M${xa} ${yy} H${xb}" class="axis" style="fill:none"/>`;
        [.5,1,2,4].forEach(v=>{s+=`<path d="M${f1(lx(v))} ${yy-4} v8" class="axis" style="fill:none"/><text x="${f1(lx(v))}" y="${yy+16}" class="t-xs t-mid">${v}</text>`});
        s+=`<path d="M${f1(lx(1))} ${yy-12} V${yy+6}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
        const est=lerp(1,1.92,p);s+=`<path d="M${f1(lx(lerp(1,1.54,p)))} ${yy} H${f1(lx(lerp(1,2.39,p)))}" style="stroke:var(--sky);stroke-width:2.4"/><rect x="${f1(lx(est)-5)}" y="${yy-5}" width="10" height="10" style="fill:var(--sky)"/>`;
        s+=`<text x="${f1(lx(1)-4)}" y="${yy-14}" class="t-xs t-end">no difference</text><text x="${f1(lx(1.92))}" y="${yy-14}" class="t-xs t-mid">odds of improving</text></g>`}
    }else if(view===1){
      const rowH=N?62:32,y0=N?56:58,bx0=N?20:250,bx1=N?330:630,sc=v=>(bx1-bx0)*v/50;
      s+=`<text x="20" y="24" class="t-sm">${N?'LABEL RATES, % OF PEOPLE':'ADVERSE REACTIONS IN PLACEBO-CONTROLLED TRIALS, % OF PEOPLE'}</text>`;
      s+=`<rect x="20" y="34" width="14" height="8" style="fill:var(--rose)"/><text x="40" y="42" class="t-xs">drug</text><rect x="${N?90:96}" y="34" width="14" height="8" style="fill:var(--panel);stroke:var(--muted)"/><text x="${N?110:116}" y="42" class="t-xs">placebo</text>`;
      [0,10,20,30,40,50].forEach(v=>{s+=`<path d="M${f1(bx0+sc(v))} ${y0-4} V${y0+SE.length*rowH-8}" class="grid"/><text x="${f1(bx0+sc(v))}" y="${y0+SE.length*rowH+6}" class="t-xs t-mid">${v}%</text>`});
      SE.forEach((r,i)=>{const p=ease(ramp(t,i*.07,i*.07+.25)),y=y0+i*rowH+(N?22:0);
        if(N)s+=`<text x="20" y="${y-6}" class="t-lbl">${r.n} · ${r.e}</text>`;
        else s+=`<text x="${bx0-10}" y="${y+12}" class="t-lbl t-end">${r.n}</text><text x="${bx0-10}" y="${y+24}" class="t-xs t-end">${r.e}</text>`;
        s+=`<rect x="${bx0}" y="${y}" width="${f1(Math.max(1,sc(r.d)*p))}" height="12" rx="3" style="fill:var(--rose)"/>`;
        s+=`<rect x="${bx0}" y="${y+14}" width="${f1(Math.max(1,sc(r.p)*p))}" height="9" rx="3" style="fill:var(--panel);stroke:var(--muted)"/>`;
        if(p>.6)s+=`<text x="${f1(bx0+sc(r.d)+6)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${r.d}%</text><text x="${f1(bx0+sc(r.p)+6)}" y="${y+22}" class="t-xs">${r.p}%</text>`});
      s+=`<text x="20" y="${y0+SE.length*rowH+(N?28:24)}" class="t-xs">${N?'*patch 9.5 mg/24 h, IDEAL trial':'*Patch 9.5 mg/24 h, from the IDEAL trial; capsules in the same trial: nausea 23.1%, vomiting 17.0%.'}</text>`;
      if(N)s+=`<text x="20" y="${y0+SE.length*rowH+44}" class="t-xs">capsules in IDEAL: nausea 23.1%, vomiting 17.0%</text>`;
    }else{
      const lx0=N?20:262,lx1=N?380:630,y0=N?40:50,rowH=N?120:84;
      s+=`<text x="20" y="${N?22:26}" class="t-sm">${N?'DOMINO: CONTINUING VS STOPPING':'DOMINO: CONTINUING VERSUS STOPPING DONEPEZIL (MODERATE TO SEVERE)'}</text>`;
      const lg=(v,a,b)=>lx0+(lx1-lx0)*Math.log(v/a)/Math.log(b/a);
      const rows=[
       {n:'Nursing-home placement, year 1',m:'hazard ratio, stopped vs continued',est:2.09,lo:1.29,hi:3.39,sc:'log',a:.5,b:4,tick:[.5,1,2,4],ref:1,lab:'HR 2.09',refL:'no difference'},
       {n:'Nursing-home placement, years 2–4',m:'hazard ratio (interval not shown)',est:.89,sc:'log',a:.5,b:4,tick:[.5,1,2,4],ref:1,lab:'HR 0.89'},
       {n:'SMMSE, 52 weeks',m:'points better if continued',est:1.9,lo:1.3,hi:2.5,sc:'lin',a:0,b:4,tick:[0,1,2,3,4],ref:1.4,refL:'MCID 1.4',lab:'+1.9'},
       {n:'BADLS, 52 weeks',m:'points less impairment if continued',est:3.0,lo:1.8,hi:4.3,sc:'lin',a:0,b:6,tick:[0,2,4,6],ref:3.5,refL:'MCID 3.5',lab:'3.0'}
      ];
      rows.forEach((r,i)=>{const p=ease(ramp(t,i*.2,i*.2+.25)),y=y0+i*rowH+(N?64:30);
        const X=v=>r.sc==='log'?lg(v,r.a,r.b):lx0+(lx1-lx0)*(v-r.a)/(r.b-r.a);
        s+=`<g style="opacity:${f1(ramp(t,i*.2,i*.2+.06))}">`;
        if(N)s+=`<text x="20" y="${y-50}" class="t-lbl">${r.n}</text><text x="20" y="${y-36}" class="t-xs">${r.m}</text>`;
        else s+=`<text x="20" y="${y-4}" class="t-lbl">${r.n}</text><text x="20" y="${y+10}" class="t-xs">${r.m}</text>`;
        s+=`<path d="M${lx0} ${y} H${lx1}" class="axis" style="fill:none"/>`;
        r.tick.forEach(v=>{s+=`<path d="M${f1(X(v))} ${y-3} v6" class="axis" style="fill:none"/><text x="${f1(X(v))}" y="${y+16}" class="t-xs t-mid">${v}</text>`});
        const rx=X(r.ref);s+=`<path d="M${f1(rx)} ${y-16} V${y+4}" style="stroke:${r.sc==='log'?'var(--muted)':'var(--warn)'};stroke-width:1.6;stroke-dasharray:3 3"/>`;
        if(r.refL)s+=`<text x="${f1(rx+4)}" y="${y-18}" class="t-xs" style="fill:${r.sc==='log'?'var(--muted)':'var(--warn)'}">${r.refL}</text>`;
        const start=r.sc==='log'?1:0,e=lerp(start,r.est,p);
        if(r.lo!=null&&p>.5){const q=ramp(p,.5,1);s+=`<path d="M${f1(X(lerp(r.est,r.lo,q)))} ${y-6} H${f1(X(lerp(r.est,r.hi,q)))}" style="stroke:var(--sky);stroke-width:2.4"/>`}
        s+=`<circle cx="${f1(X(e))}" cy="${y-6}" r="6" style="fill:var(--sky)"/>`;
        if(p>.8)s+=N?`<text x="380" y="${y-50}" class="t-lbl t-end" style="fill:var(--sky)">${r.lab}</text>`:`<text x="${lx1+12}" y="${y-2}" class="t-lbl" style="fill:var(--sky)">${r.lab}</text>`;
        s+='</g>'});
      const fy=y0+4*rowH+(N?20:18);
      if(t>.85)s+=`<text x="20" y="${fy}" class="t-xs" style="opacity:${f1(ramp(t,.85,.92))}">${N?'Over 4 years, 55% moved to a nursing home.':'Over 4 years, 55% of all participants moved into a nursing home.'}</text>`;
    }
    bs.innerHTML=s;
    $('#syBenNote').innerHTML=noteHTML(SY_BEN[view]);
    $('#syBenCap').textContent=['Average differences, drug versus placebo. Whiskers are 95% confidence intervals. Bars start at zero on each scale.','Percent of people reporting each effect in placebo-controlled trials, as listed in the US labels; patch rows are from the IDEAL trial.','Points are estimates; lines are 95% confidence intervals. MCID = minimal clinically important difference set by DOMINO.'][view];
    br.setAttribute('aria-valuetext',['Effect sizes','Side effects','Stopping'][view]+', '+Math.round(t*100)+'% revealed');
  }
  const stopBen=playWire(br,$('#syBenPlay'),drawBen,9000,'Replay','synapse');
  $$('[data-syb]').forEach(b=>b.addEventListener('click',()=>{view=+b.dataset.syb;$$('[data-syb]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopBen();br.value=0;drawBen(0);$('#syBenPlay').click()}));

  $('#syCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Symptomatic, not disease-modifying</h4><p>The inhibitor and memantine labels state no evidence that the drugs change the course of the disease. Donepezil had no clear effect on behaviour (NPI −1.62, 95% CI −3.43 to 0.19) or quality of life, and only one small trial lasted 52 weeks. [[FDAExelonPatch2024,FDAGalantamineER2025,FDAMemantineER2026,Birks2018]]</p></div>
   <div class="card"><span class="ev early">Debated</span><h4>Cornerstone, or small benefit?</h4><p>A 2018 review calls cholinergic drugs the cornerstone of Alzheimer's drug treatment, likely to be combined with disease-modifying drugs. Cochrane authors describe their benefits as small and of uncertain clinical importance. Every usable rivastigmine study was industry-funded. [[Hampel2018,Birks2015]]</p></div>
   <div class="card"><h4>Not comparable with the antibodies</h4><p>Inhibitor trials enrolled people with established dementia for 6 months or less and measured a lift in scores. Lecanemab and donanemab trials enrolled people with MCI or mild dementia for about 18 months and measured slower decline on CDR-SB (0.45 and about 0.7 points). Similar-sized numbers answer different questions. [[Birks2018,vanDyck2023,Sims2023]] See <a href="#antibody" data-go="antibody">Anti-amyloid antibodies</a>.</p></div>
   <div class="card"><span class="ev early">Mixed results</span><h4>Adding memantine to donepezil</h4><p>Tariot 2004 found benefit from adding memantine in people already on donepezil. DOMINO found the combination no better than donepezil alone. The Cochrane review found memantine works whether or not a cholinesterase inhibitor is used. [[Tariot2004,Howard2012,McShane2019]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Heart rhythm and a prescribing cascade</h4><p>In Ontario, people on inhibitors had more bradycardia (HR 1.69), pacemakers (HR 1.49) and hip fractures (HR 1.18). People started on an inhibitor were more likely to be given an anticholinergic bladder drug next (4.5% vs 3.1%), a drug that works against it. [[Gill2009,Gill2005]] See <a href="#bpsd" data-go="bpsd">Beyond memory</a>.</p></div>
   <div class="card"><h4>The short version</h4><div class="pt"><b>In plain words</b>These medicines can ease memory and thinking symptoms a little for a while, on average. They do not stop the disease. Stomach upset is common when doses go up, and stopping later on was followed by faster decline in one trial. Decisions about starting or stopping belong with the prescriber.</div></div>`;
  draw(+rg.value);drawNm(+nr.value);drawBen(+br.value);
};
