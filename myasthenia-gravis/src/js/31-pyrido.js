/* =============== 3.1 Pyridostigmine, animated =============== */
/* t in [0,1] is hours 0..8 after the first dose. Phases are fixed in hours. */
const PY_STEPS=[
 {from:0,at:.02,k:'0 h · Dose',t:'One tablet swallowed',
  txt:'Pyridostigmine bromide is a carbamate ester on a permanently charged (quaternary) pyridinium ring. Charged molecules cross the gut wall poorly, so only a small share of each dose reaches the blood: 7.6% after 120 mg in one study, a mean of 14.3% after 60 mg in another, about 10% in a review, and as little as 3.3% in people with MG according to the UK SmPC. The same charge keeps it out of the brain at non-toxic doses. [[FDAMestinon2020,Aquilonius1980,BreyerPfaff1985,Aquilonius1986,UKSmPCMestinon2025]]',
  pt:'Most of the tablet never reaches the blood. The part that does stays out of the brain and works at the nerve-muscle junction.',
  hook:'Pyridostigmine is a <b>quaternary carbamate</b>: low oral bioavailability, no brain entry at non-toxic doses, and, per the US label, excreted mainly unchanged by the kidney. [[FDAMestinon2020,UKSmPCMestinon2025]]'},
 {from:.05,at:.12,k:'0.4–1.4 h · Rising',t:'The enzyme gets blocked',
  txt:'Acetylcholinesterase, anchored in the cleft by its ColQ tail, clears acetylcholine from the cleft in less than a millisecond, together with diffusion. Pyridostigmine binds the enzyme and blocks it for a while (a reversible block). Each packet of acetylcholine then lasts longer, neighbouring packets overlap and add up, and more of the remaining receptors are reached: in the label\'s words, freer transmission across the junction. No primary pharmacology study read for this guide gives an onset time in minutes; an NHS Scotland Q&A says it usually starts working in 30 to 60 minutes. [[Slater2017,Sine2012,Feng1999,Hartzell1976,FDAMestinon2020,Aquilonius1986,RightDecisionsPyrido2025]]',
  pt:'The tablet slows the enzyme that clears the messenger, so the messenger stays longer and has more chances to be caught.',
  hook:'It treats <b>symptoms</b>, not the immune cause: it does not bring back lost receptors or stop the antibodies.'},
 {from:.175,at:.2125,k:'1.4–2.6 h · Peak',t:'Peak level: 1.7 h fasting, 3.2 h with food',
  txt:'In healthy volunteers the plasma peak came 1.7 hours after a fasting dose and 3.2 hours after a dose with food; food did not change the amount absorbed. A 60 mg dose peaks at 40 to 60 µg/L 1 to 2 hours after the dose. In 6 patients the decrement on nerve testing improved most at plasma levels of 30 to 60 ng/mL (1 µg/L is 1 ng/mL). [[Aquilonius1980,Aquilonius1986,Aquilonius1983]]',
  pt:'An hour or two after the tablet, the level in the blood is highest and the muscles usually work best. A meal pushes that moment later.',
  hook:'Food <b>delays</b> the peak (1.7 → 3.2 h) without reducing how much is absorbed.'},
 {from:.325,at:.44,k:'2.6–4.4 h · Wearing off',t:'An effect of 3 to 4 hours',
  txt:'The UK SmPC gives a clinical duration of 3 to 4 hours for a daytime dose, and about 6 hours for a dose at bedtime. The half-life figures disagree: 1.78 hours after oral dosing in one study; a plasma decline of 200 minutes, twice the 97 minutes after IV, in another, which suggests slow absorption flattens the curve; and 3 to 4 hours in the UK SmPC. The half-life buttons switch the model between the first two. [[UKSmPCMestinon2025,Aquilonius1980,BreyerPfaff1985]]',
  pt:'The effect fades over a few hours, which is why doses are spread through the day.',
  hook:'Clinical duration <b>3–4 h</b> per daytime dose (SmPC). Half-life: <b>1.78 h vs 200 min vs 3–4 h</b>, depending on the source.'},
 {from:.55,at:.75,k:'4.4–8 h · Between doses',t:'Back toward the trough',
  txt:'In people on regular doses, plasma levels change little within one dosing interval, and pre-dose levels differed up to seven-fold between patients on the same daily amount. The Nordic guidance gives a usual adult dose of 30 to 60 mg every 4 to 6 hours. These are published figures quoted for study: the dose and timing for any person are set by the treating clinician. [[Aquilonius1983,Aquilonius1980,Gilhus2024]]',
  pt:'The same tablet can give very different blood levels in two people, so the schedule is fitted to the person.',
  hook:'Same daily dose, up to <b>7-fold</b> different pre-dose levels between patients.'}
];
const PY_X={
 food:'<b>With food.</b> The model delays absorption so the peak lands at 3.2 h, the published fed value, with the same area under the curve, because food did not change the amount absorbed. [[Aquilonius1980]]',
 er:'<b>Timespan 180 mg.</b> The US label says its immediate effect is about equal to a 60 mg tablet and its duration averages 2.5 times that of 60 mg, varying between patients, with at least 6 hours between Timespan doses. The slow-release part of the curve is modelled to match that 2.5 times; its shape is not published. [[FDAMestinon2020]]',
 dose2:'<b>A second dose.</b> Added at 4 hours for the 60 mg tablet (the Nordic guidance gives every 4 to 6 hours as usual) or at 6 hours for Timespan (the label minimum). The second peak sits on what is left of the first. [[Gilhus2024,FDAMestinon2020]]',
 much:'<b>Too much.</b> The model pushes the level past 100 ng/mL, above which one study of 18 patients found neuromuscular function may be impaired. The Cochrane review notes that higher than recommended doses desensitise receptors and increase weakness. The label lists muscarinic signs (nausea, vomiting, diarrhoea, cramps, saliva and bronchial secretions, small pupils, sweating) and nicotinic signs (cramps, fasciculations, weakness). Cholinergic crisis can reach the breathing muscles. <b>Difficulty breathing or swallowing is an emergency.</b> [[BreyerPfaff1990,Mehndiratta2014,FDAMestinon2020]]'
};
inits.pyrido=()=>{
  const svg=$('#pySvg'),rg=$('#pyT');
  const O={food:0,form:'ir',dose2:false,much:false,hl:'a'};
  const HL={a:1.78,b:200/60};
  const DT=.01,H=8;
  const hill=(c,K,n)=>{const a=Math.pow(Math.max(c,0),n);return a/(a+Math.pow(K,n))};
  const sig=x=>1/(1+Math.exp(-x));
  const S0=.45;                                   // untreated MG strength, schematic
  const gain=c=>.4*hill(c,22,2)-.6*sig((c-95)/12); // bell-shaped: best 30-60, harm past 100
  const blockOf=ce=>.95*ce/(ce+40);               // share of enzyme capped (schematic)
  function kaFor(ke,tmax){let lo=ke*1.0001,hi=30;for(let i=0;i<60;i++){const m=(lo+hi)/2,f=Math.log(m/ke)/(m-ke);if(f>tmax)lo=m;else hi=m}return(lo+hi)/2}
  /* one compartment with first-order absorption; Timespan = one third at once, the rest released evenly over D hours */
  function run(doses,ke,ka,hz){const n=Math.round(hz/DT),C=new Float64Array(n+1),Ce=new Float64Array(n+1);let G=0,c=0,ce=0;
    for(let i=0;i<=n;i++){for(const d of doses){if(i===d.i)G+=d.er?d.imm:d.amt;if(d.er&&i>=d.i&&i<d.i+Math.round(d.D/DT))G+=d.slow/d.D*DT}
      C[i]=c;Ce[i]=ce;const dG=-ka*G,dc=ka*G-ke*c;G+=dG*DT;c+=dc*DT;ce+=(c-ce)*2*DT}
    return{C,Ce,n}}
  const durOf=(C,sc)=>{let a=0;for(const v of C)if(v*sc>=25)a++;return a*DT};
  const ERC={};
  let SIM=null;
  function build(){
    const ke=Math.LN2/HL[O.hl],ka=kaFor(ke,1.7),lag=O.food?1.5:0;
    const ref=run([{i:0,amt:60}],ke,ka,24);let pk=0;for(const v of ref.C)pk=Math.max(pk,v);const sc=50/pk;
    let er=ERC[O.hl];
    if(O.form==='er'&&!er){const base=durOf(ref.C,sc);let best=1e9;er={slow:120,D:6};
      for(let X=20;X<=140;X+=10)for(let D=3;D<=14;D+=.5){const r=run([{i:0,er:1,imm:60,slow:X,D}],ke,ka,24);let p=0;for(const v of r.C)p=Math.max(p,v*sc);
        const e=Math.abs(durOf(r.C,sc)/base-2.5)+(p>62?(p-62)*.2:0);if(e<best){best=e;er={slow:X,D}}}
      ERC[O.hl]=er}
    const k=O.much?2.9:1,t2=O.form==='er'?6:4;
    const mk=t=>O.form==='er'?{i:Math.round((t+lag)/DT),er:1,imm:60*k,slow:er.slow*k,D:er.D}:{i:Math.round((t+lag)/DT),amt:60*k};
    const doses=[mk(0)];if(O.dose2)doses.push(mk(t2));
    const r=run(doses,ke,ka,H);
    let ymax=0;for(let i=0;i<=r.n;i++){r.C[i]*=sc;r.Ce[i]*=sc;ymax=Math.max(ymax,r.C[i])}
    SIM={C:r.C,Ce:r.Ce,n:r.n,t2,ymax:ymax>100?Math.ceil((ymax+15)/50)*50:110};
  }
  const r0=rng(31);
  const DOTS=Array.from({length:18},()=>({a:r0(),b:r0(),c:r0(),d:r0()}));
  const SLOTS=10,LOST=[1,4,8],CAPORD=[3,0,6,1,5,2,7,4];
  /* ---- glyphs ---- */
  const ache=(x,y,cap,o=1)=>`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${f1(o)}"><path d="M0 0L5.2 -6.2A8 8 0 1 1 -5.2 -6.2Z" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.3;stroke-linejoin:round"/>${cap?'<rect x="-4.4" y="-8.4" width="8.8" height="6.4" rx="2" style="fill:var(--drug);stroke:var(--panel);stroke-width:.8"/>':''}</g>`;
  const drugMol=(x,y,o=1)=>`<rect x="${f1(x-4)}" y="${f1(y-2.6)}" width="8" height="5.2" rx="2" style="fill:var(--drug);opacity:${f1(o)}"/>`;
  const pill=(x,y)=>`<rect x="${f1(x-7)}" y="${f1(y-3.5)}" width="14" height="7" rx="3.5" style="fill:var(--drug)"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y-3.5)}" y2="${f1(y+3.5)}" style="stroke:var(--panel);stroke-width:1"/>`;
  const ICON={
   gut:'<path d="M-9 -4q4.5 -6 9 0t9 0M-9 4q4.5 -6 9 0t9 0" style="fill:none;stroke:C;stroke-width:1.8;stroke-linecap:round"/>',
   sweat:'<path d="M0 -9C5 -2 6.5 1 6.5 3.5A6.5 6.5 0 0 1 -6.5 3.5C-6.5 1 -5 -2 0 -9Z" style="fill:none;stroke:C;stroke-width:1.8"/>',
   saliva:'<path d="M-9 -3q9 8 18 0" style="fill:none;stroke:C;stroke-width:1.8;stroke-linecap:round"/><path d="M0 1C3 5 3.6 6.5 3.6 7.6A3.6 3.6 0 0 1 -3.6 7.6C-3.6 6.5 -3 5 0 1Z" style="fill:C"/>',
   airway:'<path d="M0 -9V-1M0 -1L-4 2M0 -1L4 2" style="fill:none;stroke:C;stroke-width:1.6;stroke-linecap:round"/><ellipse cx="-6" cy="3" rx="4.2" ry="6" style="fill:none;stroke:C;stroke-width:1.6"/><ellipse cx="6" cy="3" rx="4.2" ry="6" style="fill:none;stroke:C;stroke-width:1.6"/>',
   pupil:'<path d="M-10 0Q0 -9 10 0Q0 9 -10 0Z" style="fill:none;stroke:C;stroke-width:1.6"/><circle r="1.8" style="fill:C"/>',
   twitch:'<path d="M-10 0l3 -6l3 12l3 -12l3 12l3 -12l3 6" style="fill:none;stroke:C;stroke-width:1.6;stroke-linejoin:round"/>',
   cramp:'<path d="M-10 0q10 -11 20 0q-10 11 -20 0Z" style="fill:none;stroke:C;stroke-width:1.6"/><path d="M-3 -2l3 2l-3 2M3 -2l-3 2l3 2" style="fill:none;stroke:C;stroke-width:1.4"/>',
   weak:'<path d="M0 -9V5M-5 0l5 5l5 -5" style="fill:none;stroke:C;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/>'
  };
  const icon=(k,x,y,col,o)=>`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${f1(o)}">${ICON[k].replace(/C(?=[;"])/g,col)}</g>`;
  const MUSC=[['gut','gut'],['sweat','sweat'],['saliva','saliva'],['airway','airway'],['pupil','pupils']];
  const NIC=[['twitch','twitch'],['cramp','cramps'],['weak','weak']];

  function synapse(L,h,i,s0){
    const x0=L.sx,y0=L.sy,W=L.sw,C=SIM.C[i],Ce=SIM.Ce[i],B=blockOf(Ce),over=clamp((Ce-95)/45);
    const cyc=h*2.4+.37,u=cyc-Math.floor(cyc);
    const tT=y0+22,tB=y0+108,my=y0+220,ay=y0+176,rx=x0+W/2;
    let s='';
    s+=`<text x="${x0}" y="${y0+10}" class="t-sm" style="fill:var(--drug)">AT THE JUNCTION</text>`;
    s+=ache(x0+W-150,y0+8,false)+`<text x="${x0+W-138}" y="${y0+10}" class="t-xs">AChE</text>`+ache(x0+W-96,y0+8,true)+`<text x="${x0+W-84}" y="${y0+10}" class="t-xs" style="fill:var(--drug)">blocked</text>`;
    // nerve terminal
    s+=`<path d="M${x0+16} ${tT}H${x0+W-16}V${tB-26}Q${x0+W-16} ${tB} ${x0+W-46} ${tB}H${x0+46}Q${x0+16} ${tB} ${x0+16} ${tB-26}Z" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.6"/>`;
    s+=`<text x="${x0+26}" y="${tT+15}" class="t-xs" style="fill:var(--nerve)">nerve terminal</text>`;
    const nv=5;for(let k=0;k<nv;k++){const vx=x0+W*(.22+.14*k),vy=tB-40+(k%2)*10;s+=vesicle(vx,vy,9,1,5)}
    // the docked vesicle that fuses each cycle
    const fo=u<.12?1-u/.12:ramp(u,.8,1);s+=vesicle(rx,tB-10,8,fo,4);
    // cleft and basal lamina
    s+=`<text x="${x0+W-12}" y="${tB+16}" class="t-xs t-end">synaptic cleft</text>`;
    s+=`<line x1="${x0+10}" x2="${x0+W-10}" y1="${ay+4}" y2="${ay+4}" style="stroke:var(--line);stroke-width:1.4;stroke-dasharray:3 4"/>`;
    // receptors and membrane
    const sx=k=>x0+26+(W-52)*k/(SLOTS-1);
    const folds=[2,4,6].map(k=>(sx(k)+sx(k+1))/2);
    let mp=`M${x0+8} ${my}`;folds.forEach(fx=>{mp+=`H${f1(fx-3)}V${my+40}H${f1(fx+3)}V${my}`});mp+=`H${x0+W-8}`;
    s+=`<path d="${mp}V${my+66}H${x0+8}Z" style="fill:var(--muscle)"/><path d="${mp}" style="fill:none;stroke:var(--memb);stroke-width:1.8"/>`;
    s+=`<text x="${x0+12}" y="${my+64}" class="t-xs" style="fill:var(--memb)">muscle fibre · gaps = receptors lost in MG</text>`;
    const present=[];for(let k=0;k<SLOTS;k++)if(!LOST.includes(k))present.push(k);
    const byC=present.slice().sort((a,b)=>Math.abs(sx(a)-rx)-Math.abs(sx(b)-rx));
    const nR=Math.min(present.length,Math.round(lerp(2,7,clamp(B/.62))));
    const nD=Math.round(over*4);                       // desensitised receptors when the level is too high
    const des=new Set(byC.slice(byC.length-nD));
    const open=new Array(SLOTS).fill(0);
    // ACh dots
    let dots='';
    const ACH=[];for(let k=0;k<SLOTS;k++)ACH.push(x0+W*(k+.5)/8);
    const nCap=Math.round(clamp(B/.75)*8),capped=new Set(CAPORD.slice(0,nCap));
    const linger=.1+B*.55;
    DOTS.forEach((d,j)=>{
      const toR=j<2*nR,slot=toR?byC[j>>1]:-1,ai=toR?-1:(j*5)%8;
      const u0=.06+d.a*.06,ua=.3+d.a*.1,ue=Math.min(.97,ua+.08+linger+d.b*.06);
      if(u<u0)return;
      let tx,ty;
      if(toR){tx=sx(slot)+((j&1)?3:-3);ty=my-16}else{tx=ACH[ai]+(d.c-.5)*6;ty=ay-10}
      const sxp=rx+(d.c-.5)*10,syp=tB+3;
      if(u<ua){const k=ease((u-u0)/(ua-u0));const x=lerp(sxp,tx,k)+Math.sin(k*Math.PI*2+d.d*6)*4*(1-k),y=lerp(syp,ty,k);dots+=achDot(x,y,2.6);return}
      if(toR){if(u<ue){dots+=achDot(tx,ty,2.6);if(!des.has(slot))open[slot]=1}return}
      const cap=capped.has(ai);
      if(!cap){const k=(u-ua)/.06;if(k<1){dots+=achDot(tx-3*k,ty+4*k,2.2*(1-k*.5),1-k)+achDot(tx+3*k,ty+4*k,1.6,1-k)}return}
      if(u<ue){const w=(u-ua)*14+d.d*6;dots+=achDot(tx+Math.cos(w)*7,ty-6+Math.sin(w*1.3)*5,2.6)}
    });
    // enzymes
    for(let k=0;k<8;k++)s+=ache(ACH[k],ay,capped.has(k));
    // free drug in the cleft
    const nF=Math.round(clamp(C/60)*5);for(let k=0;k<nF;k++){const fx=x0+30+((k*0.23+h*.05)%1)*(W-60),fy=tB+30+((k*37)%26);s+=drugMol(fx,fy,.85)}
    // receptors
    for(let k=0;k<SLOTS;k++){const x=sx(k);
      if(LOST.includes(k)){s+=`<rect x="${f1(x-6)}" y="${my-14}" width="12" height="14" rx="2" style="fill:none;stroke:var(--memb);stroke-width:1;stroke-dasharray:2 2;opacity:.6"/>`;continue}
      const dsn=des.has(k);
      s+=achr(x,my,12,open[k]?1:0,1,dsn?'var(--muted)':open[k]?'var(--achr)':'var(--achr-soft)');
      if(!dsn&&!open[k])s+=`<path d="M${f1(x-6)} ${my}V${my-13}M${f1(x+6)} ${my}V${my-13}" style="stroke:var(--achr);stroke-width:1;opacity:.7"/>`;
      if(dsn)s+=`<path d="M${f1(x-3)} ${my-22}l6 6M${f1(x+3)} ${my-22}l-6 6" style="stroke:var(--bad);stroke-width:1.4"/>`;
    }
    s+=dots;
    // legend for receptors
    const no=open.reduce((a,b)=>a+b,0);
    s+=`<text x="${x0+12}" y="${my+52}" class="t-xs" style="fill:var(--ink)">receptors opening now: <tspan style="font-weight:700;fill:var(--achr)">${no}</tspan> of ${present.length}${nD?` · <tspan style="fill:var(--bad)">${nD} desensitised</tspan>`:''}</text>`;
    // cholinergic signs strip
    const yS=y0+302,lit=O.much?clamp((C-85)/40):0;
    s+=`<line x1="${x0}" x2="${x0+W}" y1="${yS-12}" y2="${yS-12}" class="grid"/>`;
    s+=`<text x="${x0}" y="${yS+2}" class="t-sm" style="fill:${lit>.05?'var(--bad)':'var(--muted)'}">CHOLINERGIC SIGNS</text>`;
    s+=`<text x="${x0+W}" y="${yS+2}" class="t-xs t-end"${lit>.05?' style="fill:var(--bad)"':''}>${O.much?(lit>.05?'lit: level above 100':'waiting for the peak'):'press Too much'}</text>`;
    const ix0=x0+84,iw=(W-84)/5;
    s+=`<text x="${x0}" y="${yS+32}" class="t-xs" style="fill:var(--warn)">muscarinic</text>`;
    MUSC.forEach(([k,l],j)=>{const x=ix0+iw*(j+.5);s+=icon(k,x,yS+28,lit>.05?'var(--warn)':'var(--muted)',.35+.65*lit)+`<text x="${f1(x)}" y="${yS+52}" class="t-xs t-mid" style="opacity:${f1(.5+.5*lit)}">${l}</text>`});
    s+=`<text x="${x0}" y="${yS+86}" class="t-xs" style="fill:var(--bad)">nicotinic</text>`;
    NIC.forEach(([k,l],j)=>{const x=ix0+iw*(j+.5);s+=icon(k,x,yS+82,lit>.05?'var(--bad)':'var(--muted)',.35+.65*lit)+`<text x="${f1(x)}" y="${yS+106}" class="t-xs t-mid" style="opacity:${f1(.5+.5*lit)}">${l}</text>`});
    return s;
  }

  function curves(L,h,i){
    const X=hh=>lerp(L.px0,L.px1,hh/H),Yp=v=>lerp(L.py1,L.py0,clamp(v/SIM.ymax,0,1.02)),Ys=v=>lerp(L.sy1,L.sy0,clamp(v,0,1));
    let s='';
    // plasma panel
    s+=`<text x="${L.px0}" y="${L.py0-12}" class="t-sm" style="fill:var(--drug)">PLASMA LEVEL · ng/mL</text><text x="${L.px1}" y="${L.py0-12}" class="t-xs t-end" style="fill:var(--warn)">SCHEMATIC CURVE · t½ ${O.hl==='a'?'1.78 h':'200 min'}</text>`;
    s+=`<rect x="${L.px0}" y="${f1(Yp(60))}" width="${L.px1-L.px0}" height="${f1(Yp(30)-Yp(60))}" style="fill:var(--good-soft)"/>`;
    s+=`<rect x="${L.px0}" y="${f1(Yp(SIM.ymax))}" width="${L.px1-L.px0}" height="${f1(Yp(100)-Yp(SIM.ymax))}" style="fill:var(--bad-soft)"/>`;
    const ticks=[0,30,60,100,150,200,250,300].filter(v=>v<=SIM.ymax-8);
    ticks.forEach(v=>{s+=`<line x1="${L.px0}" x2="${L.px1}" y1="${f1(Yp(v))}" y2="${f1(Yp(v))}" class="grid"/><text x="${L.px0-6}" y="${f1(Yp(v)+3)}" class="t-xs t-end">${v}</text>`});
    for(let hh=0;hh<=8;hh++){const x=X(hh);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.py1}" y2="${L.py1+4}" class="axis"/><text x="${f1(x)}" y="${L.py1+15}" class="t-xs t-mid">${hh}${hh===8?' h':''}</text>`;
      s+=`<text x="${f1(x)}" y="${L.sy1+15}" class="t-xs t-mid">${hh}${hh===8?' h':''}</text>`}
    s+=`<line x1="${L.px0}" x2="${L.px1}" y1="${L.py1}" y2="${L.py1}" class="axis"/>`;
    // published 60 mg peak box
    if(O.form==='ir'&&!O.much){s+=`<rect x="${f1(X(1))}" y="${f1(Yp(60))}" width="${f1(X(2)-X(1))}" height="${f1(Yp(40)-Yp(60))}" style="fill:var(--drug);opacity:.18;stroke:var(--drug);stroke-width:1"/>`;
      s+=`<text x="${f1(X(1))}" y="${f1(Yp(60)-17)}" class="t-xs" style="fill:var(--drug)">60 mg: peak 40–60 at 1–2 h</text>`}
    // curves: the whole course faint, then solid up to now
    const pth=(arr,f,a,b)=>{let d='';for(let k=a;k<=b;k+=2)d+=(k===a?'M':'L')+f1(X(k*DT))+' '+f1(f(arr[k]));return d};
    s+=`<path d="${pth(SIM.C,Yp,0,SIM.n)}" style="fill:none;stroke:var(--drug);stroke-width:1.4;opacity:.3;stroke-dasharray:4 3"/>`;
    s+=`<path d="${pth(SIM.C,Yp,0,i)}" style="fill:none;stroke:var(--drug);stroke-width:2.6"/>`;
    // time to peak, published
    [[1.7,'1.7 h fasting',0],[3.2,'3.2 h with food',1]].forEach(([tm,l,fd])=>{const on=O.food===fd,x=X(tm);
      s+=`<circle cx="${f1(x)}" cy="${L.py1}" r="${on?4.2:3}" style="fill:${on?'var(--ink)':'var(--muted)'}"/>`;
      s+=`<text x="${f1(fd?x-10:x+10)}" y="${L.py1+28}" class="t-xs${fd?'':' t-end'}" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${l}</text>`});
    // dose pills
    const dts=[0];if(O.dose2)dts.push(SIM.t2);
    dts.forEach((d,k)=>{const x=X(d);s+=pill(x,L.py1);if(k)s+=`<text x="${f1(x+10)}" y="${L.py1-6}" class="t-xs" style="fill:var(--drug)">2nd dose</text>`});
    // strength panel
    s+=`<text x="${L.px0}" y="${L.sy0-12}" class="t-sm" style="fill:var(--achr)">MUSCLE STRENGTH</text><text x="${L.px1}" y="${L.sy0-12}" class="t-xs t-end" style="fill:var(--warn)">SCHEMATIC · relative</text>`;
    s+=`<line x1="${L.px0}" x2="${L.px1}" y1="${f1(Ys(1))}" y2="${f1(Ys(1))}" class="grid"/><text x="${L.px0-6}" y="${f1(Ys(1)+3)}" class="t-xs t-end">full</text>`;
    s+=`<line x1="${L.px0}" x2="${L.px1}" y1="${f1(Ys(S0))}" y2="${f1(Ys(S0))}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:5 4"/><text x="${L.px0-6}" y="${f1(Ys(S0)+3)}" class="t-xs t-end">${L.px0<100?'none':'no dose'}</text>`;
    s+=`<line x1="${L.px0}" x2="${L.px1}" y1="${L.sy1}" y2="${L.sy1}" class="axis"/>`;
    const St=v=>Ys(clamp(S0+gain(v),.04,1));
    s+=`<path d="${pth(SIM.Ce,St,0,SIM.n)}" style="fill:none;stroke:var(--achr);stroke-width:1.4;opacity:.3;stroke-dasharray:4 3"/>`;
    s+=`<path d="${pth(SIM.Ce,St,0,i)}" style="fill:none;stroke:var(--achr);stroke-width:2.6"/>`;
    // cholinergic weakness label at the strength minimum
    if(O.much){let mi=0,mv=9;for(let k=0;k<=SIM.n;k++){const v=S0+gain(SIM.Ce[k]);if(v<mv){mv=v;mi=k}}
      if(mv<S0-.02){const x=X(mi*DT);s+=`<text x="${f1(Math.min(L.px1-4,Math.max(L.px0+120,x+60)))}" y="${f1(L.sy1-4)}" class="t-xs t-end" style="fill:var(--bad);font-weight:700">cholinergic weakness</text>`}}
    // clinical duration, published
    const dy=L.sy1+30;
    if(O.form==='ir'){s+=`<line x1="${f1(X(0))}" x2="${f1(X(3))}" y1="${dy}" y2="${dy}" style="stroke:var(--achr);stroke-width:3;stroke-linecap:round"/><line x1="${f1(X(3))}" x2="${f1(X(4))}" y1="${dy}" y2="${dy}" style="stroke:var(--achr);stroke-width:3;stroke-dasharray:3 3"/>`;
      s+=`<circle cx="${f1(X(3))}" cy="${dy}" r="3.5" style="fill:var(--achr)"/><circle cx="${f1(X(4))}" cy="${dy}" r="3.5" style="fill:var(--achr)"/>`;
      s+=`<text x="${f1(X(4)+8)}" y="${dy+3}" class="t-xs" style="fill:var(--ink)">effect lasts 3–4 h (SmPC)</text>`}
    else{s+=`<text x="${L.px0}" y="${dy+3}" class="t-xs" style="fill:var(--ink)">Timespan: lasts about 2.5× a 60 mg dose (US label)</text>`}
    // cursor and current-model points (open = model)
    const xc=X(h);
    s+=`<line x1="${f1(xc)}" x2="${f1(xc)}" y1="${L.py0-2}" y2="${L.sy1}" style="stroke:var(--ink);stroke-width:1.2;opacity:.45"/>`;
    s+=`<circle cx="${f1(xc)}" cy="${f1(Yp(SIM.C[i]))}" r="4.5" style="fill:var(--panel);stroke:var(--drug);stroke-width:2"/>`;
    s+=`<circle cx="${f1(xc)}" cy="${f1(St(SIM.Ce[i]))}" r="4.5" style="fill:var(--panel);stroke:var(--achr);stroke-width:2"/>`;
    // legend
    let y=L.lg;
    L.lgl.forEach(l=>{s+=`<text x="${L.lgx+(l[2]||0)}" y="${y}" class="t-xs"${l[1]?` style="fill:${l[1]}"`:''}>${l[0]}</text>`;y+=14});
    s+=`<circle cx="${L.lgx+3}" cy="${L.lg-3}" r="3.2" style="fill:var(--ink)"/><circle cx="${L.lgx+168}" cy="${L.lg-3}" r="3.2" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><text x="${L.lgx+176}" y="${L.lg}" class="t-xs">open = model now</text>`+pill(L.lgx+7,L.lg+11);
    return s;
  }
  const LGL=[['filled = published value','',10],['= a dose taken (on the time axis)','',20],['green band: 30–60 ng/mL, best response (6 patients)','var(--good)'],['red band: above 100 ng/mL, may impair (18 patients)','var(--bad)'],['Curve shapes are modelled from the published anchors.','var(--warn)']];
  function draw(t){
    const N=vb(svg,'720 476','400 900');
    const L=N?{sx:12,sy:8,sw:376,px0:44,px1:386,py0:470,py1:610,sy0:688,sy1:768,lg:826,lgx:14,lgl:LGL}
             :{sx:12,sy:8,sw:306,px0:372,px1:704,py0:38,py1:192,sy0:274,sy1:354,lg:408,lgx:340,lgl:LGL};
    const h=t*H,i=Math.min(SIM.n,Math.round(h/DT));
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=synapse(L,h,i);
    if(N)s+=`<line x1="12" x2="388" y1="440" y2="440" style="stroke:var(--line);stroke-width:1"/>`;
    s+=curves(L,h,i);
    svg.innerHTML=s;
    const p=phaseOf(PY_STEPS,t);setSt(p);
    let ex='';['food','er','dose2','much'].forEach(k=>{const on=k==='food'?O.food:k==='er'?O.form==='er':O[k];if(on)ex+=`<p>${PY_X[k]}</p>`});
    $('#pyNote').innerHTML=noteHTML(PY_STEPS[p])+(ex?`<div class="kv"><div><dt>Your settings</dt><dd style="display:flex;flex-direction:column;gap:8px">${ex}</dd></div></div>`:'');
    const C=SIM.C[i],Ce=SIM.Ce[i],B=blockOf(Ce),S=clamp(S0+gain(Ce),.04,1);
    $('#pyRead').innerHTML=`<span>hour <b>${h.toFixed(1)}</b></span><span>plasma (model) <b>${Math.round(C)} ng/mL</b></span><span>enzyme blocked (model) <b>${Math.round(B*100)}%</b></span><span>ACh lingers (model) <b>${(1+1.6*B).toFixed(1)}×</b></span><span>strength (model) <b>${Math.round(S*100)}%</b> of full</span>`;
  }
  build();
  const stop=playWire(rg,$('#pyPlay'),draw,18000,'Replay','pyrido');
  const setSt=stepWire($('#pySteps'),PY_STEPS,rg,draw,stop);
  const sync=()=>{$$('[data-pyfood]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.pyfood===O.food)));
    $$('[data-pyform]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pyform===O.form)));
    $$('[data-pyx]').forEach(b=>b.setAttribute('aria-pressed',String(!!O[b.dataset.pyx])));
    $$('[data-pyhl]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pyhl===O.hl)))};
  $('#pyTog').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.pyfood!=null)O.food=+b.dataset.pyfood;
    else if(b.dataset.pyform)O.form=b.dataset.pyform;
    else if(b.dataset.pyx)O[b.dataset.pyx]=!O[b.dataset.pyx];
    else if(b.dataset.pyhl)O.hl=b.dataset.pyhl;
    else return;
    sync();build();draw(+rg.value)});
  draw(+rg.value);

  /* ---- the bell: function against plasma level ---- */
  const bs=$('#pyBell'),br=$('#pyC'),CMAX=160;
  function drawB(t){
    const N=vb(bs,'720 306','400 380');
    const L=N?{x0:44,x1:386,y0:58,y1:250,cap:[302,316,330,344,358]}:{x0:70,x1:704,y0:52,y1:220,cap:[264,278,292]};
    const c=t*CMAX,X=v=>lerp(L.x0,L.x1,v/CMAX),G0=-.26,G1=.42,Y=g=>lerp(L.y1,L.y0,(g-G0)/(G1-G0));
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${L.x0}" y="${L.y0-20}" class="t-sm" style="fill:var(--drug)">CHANGE IN NEUROMUSCULAR FUNCTION</text><text x="${L.x1}" y="${L.y0-20}" class="t-xs t-end" style="fill:var(--warn)">SCHEMATIC SHAPE</text>`;
    s+=`<rect x="${f1(X(30))}" y="${L.y0}" width="${f1(X(60)-X(30))}" height="${L.y1-L.y0}" style="fill:var(--good-soft)"/>`;
    s+=`<rect x="${f1(X(100))}" y="${L.y0}" width="${f1(X(CMAX)-X(100))}" height="${L.y1-L.y0}" style="fill:var(--bad-soft)"/>`;
    s+=`<text x="${f1((X(30)+X(60))/2)}" y="${L.y0+14}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">best</text>`;
    s+=`<text x="${f1((X(100)+X(CMAX))/2)}" y="${L.y0+14}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">may impair</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:5 4"/>`;
    s+=`<text x="${L.x0+4}" y="${f1(Y(0)+13)}" class="t-xs">no change from untreated</text>`;
    s+=`<text x="${L.x0-6}" y="${f1(Y(.3)+3)}" class="t-xs t-end">better</text><text x="${L.x0-6}" y="${f1(Y(-.2)+3)}" class="t-xs t-end">worse</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.y1}" y2="${L.y1}" class="axis"/>`;
    [0,30,60,100,130,160].forEach(v=>{if(N&&v===130)return;s+=`<text x="${f1(X(v))}" y="${L.y1+15}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${L.x1}" y="${L.y1+30}" class="t-xs t-end">plasma pyridostigmine, ng/mL</text>`;
    s+=`<path d="${pathFn(u=>(gain(u*CMAX)-G0)/(G1-G0),L.x0,L.x1,L.y1,L.y0,160)}" style="fill:none;stroke:var(--drug);stroke-width:1.4;opacity:.35"/>`;
    s+=`<path d="${pathFn(u=>u*CMAX<=c?(gain(u*CMAX)-G0)/(G1-G0):NaN,L.x0,L.x1,L.y1,L.y0,160).replace(/[ML][^ML]*NaN[^ML]*/g,'').replace(/^L/,'M')}" style="fill:none;stroke:var(--drug);stroke-width:2.8"/>`;
    const g=gain(c),zone=c<30?['too little','var(--muted)']:c<=60?['in the best range','var(--good)']:c<=100?['past the best range','var(--warn)']:['too much: cholinergic weakness','var(--bad)'];
    s+=`<line x1="${f1(X(c))}" x2="${f1(X(c))}" y1="${L.y0}" y2="${L.y1}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/>`;
    s+=`<circle cx="${f1(X(c))}" cy="${f1(Y(g))}" r="5" style="fill:var(--panel);stroke:var(--drug);stroke-width:2.2"/>`;
    s+=`<text x="${L.x0}" y="${L.y0-8}" class="t-xs" style="fill:${zone[1]};font-weight:700">At ${Math.round(c)} ng/mL: ${zone[0]}</text>`;
    const cap=N?['Green: 30–60 ng/mL gave the best decrement','improvement in 6 patients (Aquilonius 1983).','Red: above 100 ng/mL may impair function','(18 patients, Breyer-Pfaff 1990). The curve','between and beyond them is a smooth sketch.']
               :['Green: 30–60 ng/mL gave the best decrement improvement in 6 patients (Aquilonius 1983).','Red: above 100 ng/mL may impair neuromuscular function (18 patients, Breyer-Pfaff 1990).','The curve between and beyond these published ranges is a smooth sketch, not data.'];
    cap.forEach((l,k)=>{s+=`<text x="${N?14:L.x0}" y="${L.cap[k]}" class="t-xs">${l}</text>`});
    bs.innerHTML=s;
    $('#pyCCap').innerHTML=`At ${Math.round(c)} ng/mL the sketch is ${zone[0]}. A bell-shaped dose-response: in 6 patients the deltoid decrement improved most at 30–60 ng/mL (neostigmine 5–15 ng/mL), and in 18 patients levels above 100 ng/mL may impair neuromuscular function. [[Aquilonius1983,BreyerPfaff1990]]`;
  }
  playWire(br,$('#pyCPlay'),drawB,9000,'Replay','pyrido');drawB(+br.value);
};
