/* =============== 2.3 colchicine dosing & safety =============== */
/* Adapted from the FMF Companion's 2.3: the exposure window, interaction table, organ map
   and kidney gauge keep their engine; the doses are the gout ones (label, EULAR, ACR). */
const CD_STEPS=[
 {from:0,at:.12,k:'Days 0–3',t:'Building to a steady level',
  txt:`After a 0.6 mg tablet, plasma colchicine peaks in 1–2 hours (mean Cmax 2.5 ng/mL), and absolute bioavailability is about 45%. The published half-lives do not agree: the US label reports 26.6–31.2 hours on repeated 0.6 mg twice-daily dosing, while a study after an intravenous dose found a terminal half-life of 57.8 hours. Either way each dose adds to what is left of the last until levels settle into a daily rise and fall. Colchicine is a substrate of two exits: P-glycoprotein (P-gp) pumps and the CYP3A4 enzyme. [[FDA-Colcrys,Ferron1996,Rochdi1994,Slobodnick2018]]`,
  pt:`Each tablet adds to what is left from the last one until the level settles into a steady wave. How long one dose lasts is disputed: published half-lives run from about one day to over two.`,
  hook:`Two exits: <b>P-gp</b> pumps and <b>CYP3A4</b>. Block either one and colchicine builds up. Half-life: a <b>disputed range</b>, not one number.`},
 {from:.29,at:.31,k:'Day 3',t:'An interacting drug is added',
  txt:`Strong CYP3A4 inhibitors and P-gp inhibitors close those exits. The label contraindicates these combinations in people with kidney or liver impairment, because fatal toxicity has occurred at therapeutic doses. The heights here come from the label's single-dose interaction studies, scaled schematically to twice-daily dosing. [[FDA-Colcrys,Terkeltaub2011]]`,
  pt:`Some medicines block the body's way of clearing colchicine, so the same tablet leaves more drug behind.`,
  hook:`Ritonavir, clarithromycin, cyclosporine and ketoconazole raised single-dose exposure by <b>212–296%</b>.`},
 {from:.4,at:.62,k:'Days 4–10',t:'A slow climb to a new plateau',
  txt:`Because clearance slows, the level keeps climbing for days after the inhibitor starts, so risk grows with the length of the overlap. In the clarithromycin study a longer overlap (RR 2.16), baseline kidney impairment (RR 9.1) and pancytopenia (RR 23.4) predicted death. [[Hung2005]]`,
  pt:`The extra drug piles up day after day, so a week-long antibiotic course can matter more than a single dose.`,
  hook:`Hung 2005: deaths <b>10.2%</b> with clarithromycin given together vs <b>3.6%</b> given one after the other.`},
 {from:.85,at:.97,k:'What the label publishes',t:'Gout dose adjustments',
  txt:`When there is no alternative to the interacting drug, the US label cuts the prophylaxis dose (from 0.6 mg twice daily) to 0.3 mg once daily with strong CYP3A4 or P-gp inhibitors, and to 0.3 mg twice daily or 0.6 mg once daily with moderate CYP3A4 inhibitors. The flare dose falls too, and is not repeated within 3 days. The adjustments also apply within 14 days of stopping the interacting drug. Press "Apply the label's prophylaxis dose adjustment" to see the effect. [[FDA-Colcrys,Terkeltaub2011]]`,
  pt:`If two drugs must be taken together, the label lowers the colchicine dose so that levels stay closer to normal.`,
  hook:`Label prophylaxis with interactions: <b>0.3 mg/day</b> (strong CYP3A4 or P-gp), <b>0.6 mg/day</b> (moderate CYP3A4). Flare course not repeated within <b>3 days</b>.`}
];
const CD_DRUGS={
 none:{n:'No interacting drug',sh:'nothing added',f:1,pct:'none',cap:null,capTxt:'not needed',
  txt:`Without an interaction, levels settle into the usual daily wave within about a week. [[FDA-Colcrys]]`},
 clari:{n:'Clarithromycin',sh:'clarithromycin',f:3.82,pct:'+282%',cap:.3,capTxt:'0.3 mg once daily',
  txt:`A strong CYP3A4 inhibitor. In the label's single-dose study it raised colchicine AUC by 282% (Cmax by 227%). In a retrospective study, 9 of 88 inpatients (10.2%) given both drugs together died, versus 1 of 28 (3.6%) given them one after the other. Pharmacokinetic studies support no adjustment with azithromycin. [[FDA-Colcrys,Hung2005,Terkeltaub2011]]`},
 keto:{n:'Ketoconazole / itraconazole',sh:'ketoconazole',f:3.12,pct:'+212% (ketoconazole)',cap:.3,capTxt:'0.3 mg once daily',
  txt:`Strong CYP3A4 inhibitors. Ketoconazole raised colchicine AUC by 212% in the label study; itraconazole sits in the same label group, and the curve uses the ketoconazole figure. [[FDA-Colcrys]]`},
 rito:{n:'Ritonavir',sh:'ritonavir',f:3.96,pct:'+296%',cap:.3,capTxt:'0.3 mg once daily',
  txt:`A strong CYP3A4 inhibitor, the largest increase in the label's table (+296%). Most HIV protease inhibitors are in the same label group. [[FDA-Colcrys]]`},
 cyclo:{n:'Cyclosporine',sh:'cyclosporine',f:3.59,pct:'+259%',cap:.3,capTxt:'0.3 mg once daily',
  txt:`A P-gp inhibitor that raised colchicine AUC by 259%. It is also one of the drugs the label says can potentiate colchicine myopathy and rhabdomyolysis. [[FDA-Colcrys]]`},
 vera:{n:'Verapamil',sh:'verapamil',f:2.03,pct:'+103%',cap:.6,capTxt:'0.3 mg twice daily or 0.6 mg once daily',
  txt:`A moderate CYP3A4 inhibitor in the label's list; colchicine AUC rose by 103%. [[FDA-Colcrys]]`},
 dilt:{n:'Diltiazem',sh:'diltiazem',f:1.93,pct:'+93%',cap:.6,capTxt:'0.3 mg twice daily or 0.6 mg once daily',
  txt:`A moderate CYP3A4 inhibitor in the label's list; colchicine AUC rose by 93%. [[FDA-Colcrys]]`},
 azi:{n:'Azithromycin',sh:'azithromycin',f:1.57,pct:'+57%',cap:null,capTxt:'none listed',
  txt:`Raised colchicine AUC by 57%, far less than clarithromycin. It is not in the label's adjustment lists, and pharmacokinetic studies support no adjustment, so the adjustment button has no effect here. [[FDA-Colcrys,Terkeltaub2011]]`},
 grape:{n:'Grapefruit juice',sh:'grapefruit juice',f:1,pct:'−2% in the label study',cap:.6,capTxt:'0.3 mg twice daily or 0.6 mg once daily',
  txt:`The label contradicts itself here. It lists grapefruit juice with the moderate CYP3A4 inhibitors and gives it the same dose cuts, yet its own interaction study found colchicine AUC changed by −2%. Both statements sit in the same document. The curve therefore does not move. [[FDA-Colcrys]]`},
 renal:{n:'Severe kidney impairment',sh:'severe kidney impairment',f:4.3,renal:true,pct:'clearance −75% on dialysis',cap:.3,capTxt:'start at 0.3 mg/day',
  txt:`Shown as if it began on day 3 only for comparison. This height is not from an AUC study: it is derived from a clearance figure measured in people with FMF on dialysis, whose colchicine clearance was 75% lower (0.17 vs 0.73 L/h/kg), so it is the roughest curve here. Dialysis does not remove colchicine. For gout prophylaxis in severe impairment the label starts at 0.3 mg/day. [[FDA-Colcrys]]`}
};
const CD_REGS={
 us:{n:'US label: flare',d:[[0,1.2],[1,.6]],col:'var(--crocus)',k:'COLCRYS label',
  txt:`1.2 mg at the first sign of a flare, then 0.6 mg 1 hour later: a maximum of 1.8 mg over 1 hour. The label adds that "higher doses have not been found to be more effective", and that the safety and efficacy of repeat flare courses have not been evaluated. ACR 2020 says to follow this FDA dosing when colchicine is chosen. [[FDA-Colcrys,FitzGerald2020]]`},
 usp:{n:'Flare during prophylaxis',d:[[0,1.2],[1,.6],[13,.6],[25,.6],[37,.6]],wait:[1,13],col:'var(--crocus)',k:'COLCRYS label',
  txt:`For someone already taking prophylaxis: up to 1.2 mg, then 0.6 mg 1 hour later; wait 12 hours, then resume the prophylactic dose (drawn here as 0.6 mg twice daily). The label does not recommend this flare treatment in people with kidney impairment who already take colchicine for prophylaxis. [[FDA-Colcrys]]`},
 acr12:{n:'ACR 2012: until it settles',d:[[0,1.2],[1,.6],[12,.6],[24,.6],[36,.6],[48,.6]],col:'var(--crocus)',k:'ACR 2012 guideline',
  txt:`After 1.2 mg and 0.6 mg, ACR 2012 continues 0.6 mg once or twice daily, starting 12 hours later, until the flare resolves (twice daily is drawn). It advises colchicine only if the flare began 36 hours or less earlier. [[Khanna2012P2]]`},
 eular:{n:'EULAR 2016: 1 + 0.5 mg',d:[[0,1],[1,.5]],col:'var(--sea)',k:'EULAR 2016',
  txt:`EULAR 2016 gives 1 mg, then 0.5 mg 1 hour later on day 1, within 12 hours of flare onset. ACR 2012 gives the same pair where 1 mg and 0.5 mg tablets are used, followed after 12 hours by up to 0.5 mg three times daily. [[Richette2017,Khanna2012P2]]`},
 contact:{n:'CONTACT trial: 0.5 mg ×3/day',d:[[0,.5],[8,.5],[16,.5],[24,.5],[32,.5],[40,.5],[48,.5]],col:'var(--sea)',k:'CONTACT trial (UK primary care)',
  txt:`CONTACT gave colchicine 0.5 mg three times daily for 4 days, with no loading dose, and compared it with naproxen. Pain relief was the same, but diarrhoea was more common with colchicine (45.9% vs 20.0%). No trial has compared these colchicine schedules head to head. [[Roddy2020]]`},
 high:{n:'Old high dose',d:[[0,1.2],[1,.6],[2,.6],[3,.6],[4,.6],[5,.6],[6,.6]],col:'var(--bad)',k:'AGREE high-dose arm',
  txt:`1.2 mg, then 0.6 mg every hour for 6 hours: 4.8 mg in all. In AGREE it worked no better than the low dose (32.7% vs 37.8% responders) and caused diarrhoea in 76.9%, severe in 19.2%. ACR 2020 strongly recommends low-dose over high-dose colchicine. [[Terkeltaub2010,FitzGerald2020]]`},
 proph:{n:'Prophylaxis',d:[[0,.6],[12,.6],[24,.6],[36,.6],[48,.6]],col:'var(--sea)',k:'COLCRYS and MITIGARE labels',
  txt:`0.6 mg once or twice daily (twice daily drawn), maximum 1.2 mg/day, in adults and adolescents over 16; MITIGARE capsules carry the same dose and are labelled for prophylaxis only. EULAR 2016 gives 0.5–1 mg/day for the first 6 months of urate lowering; ACR 2020 advises 3–6 months of prophylaxis rather than less than 3. [[FDA-Colcrys,FDA-Mitigare,Richette2017,FitzGerald2020]]`},
 dial:{n:'On dialysis: flare',d:[[0,.6]],col:'var(--warn)',k:'COLCRYS label, dialysis',
  txt:`On dialysis the label's flare dose is a single 0.6 mg, no more than once every 2 weeks; prophylaxis starts at 0.3 mg twice a week. Dialysis does not remove colchicine. [[FDA-Colcrys]]`}
};
const CD_ORG={
 gut:{n:'Gut',rep:`Cramping, nausea, diarrhoea, abdominal pain and vomiting are the most common effects. In the label's flare trial, gut adverse reactions occurred in 26% at the 1.8 mg dose, 77% at the old 4.8 mg dose and 20% on placebo, and diarrhoea (23%) was the most common. In CONTACT, diarrhoea affected 45.9% on colchicine 0.5 mg three times daily vs 20.0% on naproxen. [[FDA-Colcrys,Roddy2020]]`,
  mon:`The label says gut symptoms are often the first sign of toxicity, and that acute toxicity typically begins within 24 hours. [[FDA-Colcrys,FDA-Mitigare]]`},
 muscle:{n:'Muscle',rep:`Colchicine myopathy affects people with gout on customary doses when reduced kidney function raises drug levels. It causes weakness of the hip and shoulder muscles, always with a raised CK, and remits within 3–4 weeks of stopping. Statins, fibrates and cyclosporine can potentiate myopathy and rhabdomyolysis, and older people are at higher risk. [[Kuncl1987,FDA-Colcrys]]`,
  mon:`Proximal weakness with a raised CK is the pattern in the original series; kidney function is the usual setting. [[Kuncl1987]]`},
 nerves:{n:'Nerves',rep:`A mild axonal polyneuropathy often comes with the myopathy (myoneuropathy). It resolves more slowly than the muscle weakness after the drug is stopped. [[Kuncl1987]]`,
  mon:`Nerve symptoms are picked up clinically, alongside the muscle signs. [[Kuncl1987]]`},
 marrow:{n:'Bone marrow',rep:`Myelosuppression, leukopenia, granulocytopenia, thrombocytopenia and aplastic anaemia have been reported. In overdose, 0.5–0.8 mg/kg caused severe reactions such as myelosuppression. In the clarithromycin study, pancytopenia predicted death (RR 23.4). [[FDA-Colcrys,FDA-Mitigare,Hung2005]]`,
  mon:`Falling counts are a sign of serious toxicity; in the clarithromycin study they marked the patients most at risk. [[Hung2005,FDA-Colcrys]]`},
 liver:{n:'Liver',rep:`The liver metabolises colchicine through CYP3A4 and pumps it into bile through P-gp, from where some returns to the gut. ACR 2012 lists hepatic disease as a limit on colchicine, NSAIDs and COX-2 inhibitors. [[FDA-Colcrys,Slobodnick2018,Khanna2012P2]]`,
  mon:`Label (gout): no change in mild to moderate hepatic impairment, with close monitoring; in severe impairment, consider a lower prophylaxis dose and repeat flare courses no more than once every 2 weeks. No P-gp or strong CYP3A4 inhibitor with colchicine in hepatic impairment. [[FDA-Colcrys]]`},
 kidney:{n:'Kidney',rep:`The US label reports 40–65% of a 1 mg oral dose recovered unchanged in urine. Dialysis does not remove colchicine. Reduced kidney function is the usual setting for myopathy and for fatal interactions: baseline kidney impairment carried RR 9.1 for death in the clarithromycin study. [[FDA-Colcrys,Kuncl1987,Hung2005]]`,
  mon:`See the gauge below for the label's gout rules. EULAR 2016 says to avoid colchicine and NSAIDs in severe kidney impairment, and to reduce prophylaxis doses in kidney impairment. [[FDA-Colcrys,Richette2017]]`}
};
inits.coldose=()=>{
  /* ---------- 1. exposure window ---------- */
  const svg=$('#cdSvg'),rg=$('#cdT');let dk='clari',capOn=false;
  /* twice-daily dosing: half the daily amount every 12 h, so the average stays 1 */
  const DT=.25,NH=240,NI=NH/DT,KE=Math.LN2/29,KA=Math.LN2/.6,NORM=KE*24,BASE=1.2,I72=72/DT;
  Object.values(CD_DRUGS).forEach(D=>{D.fb=D.renal?1:Math.sqrt(D.f);D.fc=D.f/D.fb});
  function sim(fb,fc,df){const a=new Float32Array(NI+1);let g=0,c=0;
    for(let i=0;i<=NI;i++){const h=i*DT;if(i%(12/DT)===0&&h<NH)g+=(h>=72?fb*df:1)*.5;
      const k=h>=72?KE/fc:KE,ab=KA*g*DT;g-=ab;c+=ab-k*c*DT;a[i]=c*NORM}return a}
  const cache={};
  function get(key,capped){const id=key+(capped?'c':'');if(cache[id])return cache[id];const D=CD_DRUGS[key];return cache[id]=sim(D.fb,D.fc,capped&&D.cap?D.cap/BASE:1)}
  let X0=64,X1=700,Y0=322,Y1=46;const VM=5;
  const xh=h=>X0+(X1-X0)*h/NH,yv=v=>Y0-(Y0-Y1)*Math.min(v,VM+.15)/VM;
  function pth(a,i0,i1){let d='';for(let i=i0;i<=i1;i+=2)d+=(d?'L':'M')+f1(xh(i*DT))+' '+f1(yv(a[i]));if(i1>i0&&(i1-i0)%2)d+='L'+f1(xh(i1*DT))+' '+f1(yv(a[i1]));return d}
  function draw(t){
    /* narrow: same chart, full 400 wide and taller; axis notes and the day-3
       annotation stack instead of sitting side by side. */
    const N=vb(svg,'720 372','400 452');
    X0=N?40:64;X1=N?384:700;Y0=N?372:322;Y1=N?74:46;
    const D=CD_DRUGS[dk],hasCap=capOn&&D.cap!=null,A=get(dk,hasCap),R=get('none',false),U=hasCap?get(dk,false):null;
    const iN=Math.round(t*NI),hN=iN*DT,df=hasCap?D.cap/BASE:1,fEff=D.f*df;
    const col=fEff>2.2?'var(--bad)':fEff>1.6?'var(--warn)':'var(--crocus)';
    let s=`<defs><linearGradient id="cdTox" x1="0" y1="1" x2="0" y2="0"><stop offset="0" style="stop-color:var(--bad);stop-opacity:0"/><stop offset="1" style="stop-color:var(--bad);stop-opacity:.34"/></linearGradient></defs>`;
    s+=`<rect x="${X0}" y="${Y1}" width="${X1-X0}" height="${f1(yv(2.2)-Y1)}" style="fill:url(#cdTox)"/>`;
    s+=`<rect x="${X0}" y="${f1(yv(1.55))}" width="${X1-X0}" height="${f1(yv(.55)-yv(1.55))}" style="fill:var(--good-soft);opacity:.85"/>`;
    for(let v=0;v<=VM;v++)s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${X0-6}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}×</text>`;
    for(let d=0;d<=10;d+=(N?2:1))s+=`<text x="${f1(xh(d*24))}" y="${Y0+16}" class="t-xs t-mid">${d}</text>`;
    if(N)s+=`<text x="${f1((X0+X1)/2)}" y="${Y0+32}" class="t-xs t-mid">days of twice-daily dosing</text><text x="${X0}" y="${Y0+50}" class="t-xs">exposure vs usual average</text><text x="${X0}" y="${Y0+63}" class="t-xs">schematic model, not measured data</text>`;
    else s+=`<text x="${X1}" y="${Y0+34}" class="t-xs t-end">days of twice-daily dosing</text><text x="${X0}" y="${Y0+34}" class="t-xs">exposure vs usual average · schematic model, not measured data</text>`;
    s+=`<text x="${N?X0:X1-6}" y="${N?22:Y1+14}" class="t-sm ${N?'':'t-end'}" style="fill:var(--bad)">toxicity risk rises · no sharp threshold</text>`;
    s+=`<text x="${X0+6}" y="${f1(yv(1.55)+12)}" class="t-xs" style="fill:var(--good)">usual range (schematic)</text>`;
    const x3=xh(72);
    s+=`<line x1="${f1(x3)}" x2="${f1(x3)}" y1="${Y1-14}" y2="${Y0}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 4;opacity:.55"/>`;
    if(N){s+=`<text x="${f1(x3+6)}" y="${Y1-26}" class="t-lbl">day 3: ${dk==='none'?'nothing added':'+ '+D.sh}</text>`;
      if(hasCap)s+=`<text x="${f1(x3+6)}" y="${Y1-10}" class="t-xs" style="fill:${col}">label: ${D.cap} mg/day</text>`}
    else s+=`<text x="${f1(x3+6)}" y="${Y1-6}" class="t-lbl">day 3: ${dk==='none'?'nothing added':'+ '+D.sh}${hasCap?' · label dose '+D.cap+' mg/day':''}</text>`;
    // dose markers, one per 12 h
    for(let d=0;d<20;d++){const h=d*12;if(h>hN+.01)break;const fr=h>=72&&hasCap?df:1;s+=`<rect x="${f1(xh(h)-2.5)}" y="${f1(Y0-2-12*fr)}" width="5" height="${f1(12*fr)}" rx="2" style="fill:var(--crocus);opacity:.75"/>`}
    // curves
    if(iN>1)s+=`<path d="${pth(R,0,iN)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    if(U&&iN>I72)s+=`<path d="${pth(U,I72,iN)}" style="fill:none;stroke:var(--bad);stroke-width:1.6;opacity:.35"/>`;
    if(iN>1)s+=`<path d="${pth(A,0,Math.min(iN,I72))}" style="fill:none;stroke:var(--crocus);stroke-width:2.6;stroke-linejoin:round"/>`;
    if(iN>I72)s+=`<path d="${pth(A,I72,iN)}" style="fill:none;stroke:${col};stroke-width:2.8;stroke-linejoin:round"/>`;
    if(dk!=='none'&&Math.abs(fEff-1)>.05&&hN>72){const yy=yv(fEff);
      s+=`<line x1="${f1(x3)}" x2="${X1}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${col};stroke-width:1.2;stroke-dasharray:2 4"/><text x="${f1(x3+8)}" y="${f1(yy-6)}" class="t-xs" style="fill:${col}">average if continued ≈ ${f1(fEff)}×</text>`}
    if(iN>0){const v=A[iN],cx=xh(hN);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${Y1}" y2="${Y0}" style="stroke:var(--ink);opacity:.22"/><circle cx="${f1(cx)}" cy="${f1(yv(v))}" r="5.5" style="fill:${hN>72?col:'var(--crocus)'};stroke:var(--panel);stroke-width:2"/>`}
    svg.innerHTML=s;
    $('#cdRead').innerHTML=`<span>day <b>${f1(hN/24)}</b></span><span>exposure now <b>${f1(A[iN])}×</b> usual average</span><span>label AUC change <b>${D.pct}</b></span><span>label prophylaxis dose <b>${D.capTxt}</b></span>`;
    const p=phaseOf(CD_STEPS,t);setSt(p);
    $('#cdNote').innerHTML=noteHTML(CD_STEPS[p])+`<div class="kv"><div><dt>${D.n}${hasCap?' · adjusted':''}</dt><dd>${D.txt}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#cdPlay'),draw,15000,'Replay','coldose');
  const setSt=stepWire($('#cdSteps'),CD_STEPS,rg,draw,stop);
  $$('[data-cd]').forEach(b=>b.onclick=()=>{dk=b.dataset.cd;$$('[data-cd]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#cdCap').onclick=()=>{capOn=!capOn;$('#cdCap').setAttribute('aria-pressed',capOn);draw(+rg.value)};
  draw(+rg.value);

  /* ---------- 2. published schedules ---------- */
  const rsvg=$('#cdRegSvg');let reg='us',grow=1,stopG=null;
  $('#cdRegs').innerHTML='<span class="kicker">Schedule</span>'+Object.entries(CD_REGS).map(([k,v])=>`<button class="btn" data-reg="${k}" aria-pressed="${k===reg}">${v.n}</button>`).join('');
  /* the first 8 hours hold most of the action, so they get 40% of the axis */
  let RX0=70,RX1=690;const rx=h=>h<=8?RX0+(RX1-RX0)*.4*h/8:RX0+(RX1-RX0)*(.4+.6*(h-8)/40);
  function drawReg(){
    const N=vb(rsvg,'720 264','400 330');
    RX0=N?44:70;RX1=N?380:690;
    const R=CD_REGS[reg],TOP=N?70:62,BOT=N?232:182,MX=5,ym=v=>BOT-(BOT-TOP)*v/MX,TY=N?278:220;
    let s='';
    for(let v=0;v<=MX;v++)s+=`<line x1="${RX0}" x2="${RX1}" y1="${f1(ym(v))}" y2="${f1(ym(v))}" class="grid"/><text x="${RX0-6}" y="${f1(ym(v)+3)}" class="t-xs t-end">${v}</text>`;
    s+=`<text x="${RX0-6}" y="${TOP-12}" class="t-xs">mg taken so far</text>`;
    s+=`<line x1="${f1(rx(8))}" x2="${f1(rx(8))}" y1="${TOP}" y2="${TY+4}" style="stroke:var(--muted);stroke-dasharray:2 3;opacity:.6"/>`;
    (N?[0,1,2,4,8,24,48]:[0,1,2,3,4,6,8,12,24,36,48]).forEach(h=>s+=`<text x="${f1(rx(h))}" y="${TY+22}" class="t-xs t-mid">${h}</text>`);
    s+=`<text x="${RX1}" y="${TY+38}" class="t-xs t-end">hours from the first dose · first 8 h stretched</text>`;
    // label flare ceiling
    s+=`<line x1="${RX0}" x2="${f1(rx(48))}" y1="${f1(ym(1.8))}" y2="${f1(ym(1.8))}" style="stroke:var(--crocus);stroke-width:1.2;stroke-dasharray:6 4;opacity:.8"/><text x="${f1(rx(48))}" y="${f1(ym(1.8)-5)}" class="t-xs t-end" style="fill:var(--crocus)">1.8 mg: US label flare maximum over 1 h</text>`;
    if(R.wait)s+=`<rect x="${f1(rx(R.wait[0]))}" y="${TY-18}" width="${f1(rx(R.wait[1])-rx(R.wait[0]))}" height="36" rx="6" style="fill:var(--warn-soft)"/><text x="${f1((rx(R.wait[0])+rx(R.wait[1]))/2)}" y="${TY+30-36-2}" class="t-xs t-mid" style="fill:var(--warn)">wait 12 h</text>`;
    // running total
    let cum=0,d=`M${RX0} ${f1(ym(0))}`;const shown=R.d.filter((x,i)=>i<grow*R.d.length+.001);
    shown.forEach(([h,mg],i)=>{const k=clamp(grow*R.d.length-i);d+=` H${f1(rx(h))} V${f1(ym(cum+mg*k))}`;cum+=mg*k});
    d+=` H${f1(rx(48))}`;
    s+=`<path d="${d}" style="fill:none;stroke:${R.col};stroke-width:2.6;stroke-linejoin:round"/>`;
    // tablets on the time axis
    shown.forEach(([h,mg],i)=>{const k=ease(clamp(grow*R.d.length-i)),r=(N?3.5:5)+(N?5:7)*Math.sqrt(mg/1.2),x=rx(h),y=lerp(TY-40,TY,k);
      s+=`<g style="opacity:${f1(k)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${R.col}"/><line x1="${f1(x-r*.55)}" x2="${f1(x+r*.55)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--panel);stroke-width:1.3;opacity:.8"/>`;
      if(!(N&&R.d.length>5&&i%2))s+=`<text x="${f1(x)}" y="${f1(y-r-4)}" class="t-xs t-mid" style="fill:${R.col}">${mg}</text>`;
      s+='</g>'});
    const tot=R.d.reduce((a,[h,mg])=>a+(h<=48?mg:0),0),d1=R.d.reduce((a,[h,mg])=>a+(h<24?mg:0),0);
    s+=`<text x="${N?RX0:RX0+8}" y="${N?22:24}" class="t-lbl" style="fill:${R.col}">${R.n}</text><text x="${N?RX0:RX1}" y="${N?38:24}" class="t-sm${N?'':' t-end'}">${f1(d1)} mg in the first 24 h</text>`;
    rsvg.innerHTML=s;
    $('#cdRegRead').innerHTML=`<span>schedule <b>${R.n}</b></span><span>first 24 h <b>${f1(d1)} mg</b></span><span>first 48 h <b>${f1(tot)} mg</b></span><span>source <b>${R.k}</b></span>`;
    $('#cdRegNote').innerHTML=`<div class="kicker">${R.k}</div><h4>${R.n}</h4><p>${R.txt}</p>`;
  }
  function setReg(k){reg=k;$$('[data-reg]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.reg===k));if(stopG)stopG();grow=0;stopG=animate(700,p=>{grow=p;drawReg()},()=>{stopG=null})}
  $('#cdRegs').addEventListener('click',e=>{const b=e.target.closest('[data-reg]');if(b)setReg(b.dataset.reg)});
  drawReg();

  /* ---------- 3. organ map ---------- */
  const osv=$('#cdOrgSvg');let org='gut';
  function drawOrg(){
    /* narrow: the body stays central in a full-width 400 stage and the two label
       columns move outward with it; every organ group keeps its own hit area. */
    const N=vb(osv,'360 430','400 440');
    const DX=N?20:0,LLX=N?96:58,RLX=N?304:300;
    const on=k=>k===org;
    const st=k=>on(k)?'fill:var(--bad-soft);stroke:var(--bad);stroke-width:2.4':'fill:var(--panel);stroke:var(--muted);stroke-width:1.2';
    let s=`<g transform="translate(${DX} 0)">`;
    // body
    s+=`<g style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.5"><circle cx="180" cy="46" r="30"/><rect x="166" y="72" width="28" height="18"/><rect x="118" y="86" width="124" height="190" rx="32"/><rect x="86" y="96" width="30" height="176" rx="14"/><rect x="244" y="96" width="30" height="176" rx="14"/><rect x="126" y="262" width="50" height="160" rx="18"/><rect x="184" y="262" width="50" height="160" rx="18"/></g>`;
    const G=(k,inner,cx,cy,r)=>`<g class="clk" data-org="${k}" role="button" tabindex="0" aria-label="${CD_ORG[k].n}">${on(k)?`<circle class="cd-pulse" cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--bad)"/>`:''}${inner}</g>`;
    s+=G('muscle',`<ellipse cx="101" cy="150" rx="11" ry="34" style="${st('muscle')}"/><ellipse cx="151" cy="318" rx="19" ry="40" style="${st('muscle')}"/>`,151,318,34);
    s+=G('marrow',`<rect x="201" y="282" width="16" height="96" rx="8" style="${st('marrow')}"/><rect x="206" y="296" width="6" height="68" rx="3" style="fill:${on('marrow')?'var(--bad)':'var(--terra-soft)'}"/>`,209,330,30);
    const nv=on('nerves')?'var(--bad)':'var(--gold)',nw=on('nerves')?2.6:1.6;
    s+=G('nerves',`<path d="M259 100 L259 266 M259 150 L266 176 M259 210 L252 236 M151 362 L151 418 M151 380 L143 404 M209 382 L209 418 M209 392 L217 412" style="fill:none;stroke:${nv};stroke-width:${nw};stroke-linecap:round"/><rect x="246" y="96" width="26" height="176" style="fill:transparent"/>`,259,190,26);
    s+=G('liver',`<path d="M128 146 C140 128 196 126 206 142 C204 160 168 168 132 168 C124 162 124 152 128 146Z" style="${st('liver')}"/>`,162,150,30);
    s+=G('kidney',`<ellipse cx="142" cy="196" rx="10" ry="16" style="${st('kidney')}"/><ellipse cx="218" cy="196" rx="10" ry="16" style="${st('kidney')}"/>`,180,196,40);
    let gi='';[[166,214],[184,212],[202,216],[160,232],[178,234],[196,232],[170,250],[190,250]].forEach(([x,y])=>gi+=`<circle cx="${x}" cy="${y}" r="9" style="${st('gut')}"/>`);
    s+=G('gut',gi,181,232,34);
    // the big toe, where the flare is
    s+=`<ellipse cx="160" cy="424" rx="7" ry="5" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.4"/>`;
    s+=`</g>`;
    const L=(k,x,y,tx,ty,anchor)=>`<line x1="${x+DX}" y1="${y}" x2="${tx+(anchor==='end'?4:-4)}" y2="${ty-4}" style="stroke:var(--muted);stroke-width:1"/><text x="${tx}" y="${ty}" class="t-sm ${anchor==='end'?'t-end':''}" style="fill:${on(k)?'var(--bad)':'var(--muted)'};font-weight:${on(k)?700:500}">${k==='marrow'?'marrow':CD_ORG[k].n.toLowerCase()}</text>`;
    s+=L('muscle',96,130,LLX,118,'end')+L('liver',132,154,LLX,160,'end')+L('gut',156,240,LLX,246,'end')+L('nerves',262,128,RLX,118,'')+L('kidney',226,198,RLX,200,'')+L('marrow',216,340,RLX,334,'');
    osv.innerHTML=s;
    const O=CD_ORG[org];
    $('#cdOrgNote').innerHTML=`<div class="kicker">Toxicity map</div><h4>${O.n}</h4><dl class="kv"><div><dt>What is reported</dt><dd>${O.rep}</dd></div><div><dt>What to watch</dt><dd>${O.mon}</dd></div></dl>`;
    $$('#m-coldose button[data-org]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.org===org));
  }
  function pick(k){org=k;drawOrg()}
  $$('#m-coldose button[data-org]').forEach(b=>b.onclick=()=>pick(b.dataset.org));
  osv.addEventListener('click',e=>{const g=e.target.closest('[data-org]');if(g)pick(g.dataset.org)});
  osv.addEventListener('keydown',e=>{const g=e.target.closest('[data-org]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(g.dataset.org)}});
  drawOrg();

  /* ---------- 4. kidney gauge ---------- */
  const cr=$('#cdCr'),rsv=$('#cdRenSvg'),dial=$('#cdDial');let dOn=false,ptr=null,stopR=null;
  let GX0=16,GX1=444;const gx=c=>GX0+(GX1-GX0)*clamp(c/120);
  function cat(c){if(dOn)return{k:'dialysis',n:'On dialysis',col:'var(--bad)'};if(c<30)return{k:'severe',n:'Severe (<30)',col:'var(--bad)'};if(c<50)return{k:'moderate',n:'Moderate (30–50)',col:'var(--warn)'};if(c<=80)return{k:'mild',n:'Mild (50–80)',col:'var(--gold)'};return{k:'normal',n:'Above 80',col:'var(--good)'}}
  const RULE={
   normal:['1.2 mg, then 0.6 mg at 1 h','0.6 mg once or twice daily'],
   mild:['no dose change','no dose change · monitor closely'],
   moderate:['no dose change','no dose change · monitor closely'],
   severe:['same dose · repeat ≤ once per 2 weeks','start at 0.3 mg/day'],
   dialysis:['single 0.6 mg · ≤ once per 2 weeks','start at 0.3 mg twice a week']};
  const REN={
   normal:`Above 80 mL/min the label's kidney-impairment advice does not apply. [[FDA-Colcrys]]`,
   mild:`Label (gout), mild impairment (CrCl 50–80): no change to the flare dose, and no change to prophylaxis, with close monitoring. [[FDA-Colcrys]]`,
   moderate:`Label (gout), moderate impairment (CrCl 30–50): no change to the flare dose, and no change to prophylaxis, with close monitoring. ACR 2012 lists moderate or severe CKD as a limit on colchicine, NSAIDs and COX-2 inhibitors. [[FDA-Colcrys,Khanna2012P2]]`,
   severe:`Label (gout), severe impairment (CrCl below 30): the flare dose is not reduced, but a course is repeated no more than once every 2 weeks; prophylaxis starts at 0.3 mg/day. The label does not recommend flare treatment with colchicine for people with kidney impairment who already take it for prophylaxis. EULAR 2016 says to avoid colchicine and NSAIDs in severe kidney impairment. [[FDA-Colcrys,Richette2017]]`,
   dialysis:`Label (gout), on dialysis: a single 0.6 mg flare dose, no more than once every 2 weeks; prophylaxis starts at 0.3 mg twice a week. Dialysis does not remove colchicine. In people with FMF on dialysis, clearance was 75% lower (0.17 vs 0.73 L/h/kg) and half-life longer (18.8 vs 4.4 h) than with normal kidneys. [[FDA-Colcrys]]`};
  function drawRen(p,c){const C=cat(c);let s='';
    const NR=vb(rsv,'460 236','400 276');GX0=NR?12:16;GX1=NR?388:444;
    [[0,30,'var(--bad-soft)','severe'],[30,50,'var(--warn-soft)',NR?'mod.':'moderate'],[50,80,'var(--gold-soft)','mild'],[80,120,'var(--good-soft)',NR?'none':'no adjustment']].forEach(([a,b,f,l])=>{s+=`<rect x="${f1(gx(a))}" y="60" width="${f1(gx(b)-gx(a))}" height="34" style="fill:${f}"/><text x="${f1((gx(a)+gx(b))/2)}" y="81" class="t-xs t-mid">${l}</text>`});
    s+=`<rect x="${GX0}" y="60" width="${GX1-GX0}" height="34" rx="3" style="fill:none;stroke:var(--line)"/>`;
    [0,30,50,80,120].forEach(v=>s+=`<text x="${f1(gx(v))}" y="112" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${GX1}" y="128" class="t-xs t-end">mL/min</text>`;
    const px=gx(p);s+=`<path d="M${f1(px)} 56 l-8 -14 h16z" style="fill:${C.col}"/><line x1="${f1(px)}" x2="${f1(px)}" y1="56" y2="98" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=`<text x="${GX0}" y="28" class="t-big">${dOn?'On dialysis':'CrCl '+Math.round(c)+' mL/min'}</text><text x="${GX1}" y="30" class="t-sm t-end" style="fill:${C.col}">${C.n}</text>`;
    // the label's two rules for this category
    const rr=RULE[C.k],ry=NR?150:146;
    s+=`<text x="${GX0}" y="${ry}" class="t-xs">FLARE</text><text x="${GX0+(NR?84:90)}" y="${ry}" class="t-lbl" style="fill:${C.col}">${rr[0]}</text>`;
    s+=`<text x="${GX0}" y="${ry+22}" class="t-xs">PROPHYLAXIS</text><text x="${GX0+(NR?84:90)}" y="${ry+22}" class="t-lbl" style="fill:${C.col}">${rr[1]}</text>`;
    if(dOn){const bx=GX0,by=NR?204:196,w=GX1-GX0;s+=`<text x="${bx}" y="${by}" class="t-xs">CLEARANCE IN FMF ON DIALYSIS (label study, L/h/kg)</text><rect x="${bx}" y="${by+8}" width="${f1(w*.73/.8)}" height="12" rx="3" style="fill:var(--good)"/><text x="${f1(bx+w*.73/.8-4)}" y="${by+18}" class="t-xs t-end" style="fill:var(--panel)">normal kidneys 0.73</text><rect x="${bx}" y="${by+26}" width="${f1(w*.17/.8)}" height="12" rx="3" style="fill:var(--bad)"/><text x="${f1(bx+w*.17/.8+6)}" y="${by+36}" class="t-xs" style="fill:var(--bad)">dialysis 0.17 (−75%)</text>`}
    else s+=`<text x="${GX0}" y="${NR?206:200}" class="t-xs">Drag the slider or press "On dialysis".</text>`;
    rsv.innerHTML=s;
    $('#cdCrOut').textContent=dOn?'dialysis':Math.round(c);
    $('#cdRenNote').innerHTML=`<div class="kicker">Kidney function</div><h4>${C.n}</h4><p>${REN[C.k]}</p><p>Across every category, the label contraindicates P-gp or strong CYP3A4 inhibitors with colchicine in kidney or liver impairment. Colchicine myopathy in gout typically appears when reduced kidney function raises drug levels on customary doses. [[FDA-Colcrys,Kuncl1987]]</p>`;
  }
  function setRen(inst){const c=+cr.value,to=dOn?0:c;if(stopR)stopR();if(ptr==null||inst){ptr=to;drawRen(ptr,c);return}
    const fr=ptr;stopR=animate(380,p=>{ptr=lerp(fr,to,ease(p));drawRen(ptr,c)},()=>{stopR=null})}
  cr.addEventListener('input',()=>{if(dOn){dOn=false;dial.setAttribute('aria-pressed','false')}setRen(true)});
  dial.onclick=()=>{dOn=!dOn;dial.setAttribute('aria-pressed',dOn);setRen()};
  setRen(true);

  /* playWire only registers the exposure chart for the narrow/wide redraw, so
     chain the widgets that have no player of their own. */
  const prevRedraw=redraws.coldose;
  redraws.coldose=()=>{prevRedraw&&prevRedraw();drawReg();drawOrg();setRen(true)};
};
