
/* =============== home: one message, two neurons =============== */
const HOME_TXT={
  healthy:'Healthy: every signal arrives',
  failing:'ALS: both neurons start to fail',
  late:'Later: fewer signals, a weaker, thinner muscle',
  cortex:'motor cortex',cord:'spinal cord',muscle:'muscle',
  umn:'upper motor neuron',lmn:'lower motor neuron',
  signals:'signals reaching the muscle'
};
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');
  function draw(t){const N=vb(svg,'520 300','400 410');
    const fail=ease(ramp(t,.3,.95));
    const L=N?{ux:200,uy:60,lx:200,ly:200,mx:80,my:320,mw:240,ax:'v'}:{ux:70,uy:70,lx:260,ly:170,mx:360,my:230,mw:130,ax:'h'};
    let s=`<rect x="0" y="0" width="100%" height="100%" rx="10" style="fill:var(--field)"/>`;
    /* regions */
    s+=`<text x="${N?20:16}" y="${N?24:24}" class="t-xs">${HOME_TXT.cortex.toUpperCase()}</text>`;
    s+=`<text x="${N?20:200}" y="${N?166:142}" class="t-xs">${HOME_TXT.cord.toUpperCase()}</text>`;
    s+=`<text x="${N?20:350}" y="${N?290:200}" class="t-xs">${HOME_TXT.muscle.toUpperCase()}</text>`;
    /* the two axons as paths */
    const pU=N?`M${L.ux} ${L.uy+34} C${L.ux} ${L.uy+90} ${L.lx} ${L.ly-90} ${L.lx} ${L.ly-16}`:`M${L.ux+10} ${L.uy+30} C${L.ux+60} ${L.uy+120} ${L.lx-120} ${L.ly} ${L.lx-18} ${L.ly}`;
    const pL=N?`M${L.lx} ${L.ly+20} C${L.lx} ${L.ly+70} ${L.mx+L.mw/2} ${L.my-80} ${L.mx+L.mw/2} ${L.my-26}`:`M${L.lx+18} ${L.ly} C${L.lx+60} ${L.ly} ${L.mx-40} ${L.my} ${L.mx-4} ${L.my}`;
    s+=`<path id="hpU" d="${pU}" style="fill:none;stroke:var(--umn);stroke-width:${f1(3.2-1.8*fail)};stroke-linecap:round;${fail>.3?`stroke-dasharray:10 ${f1(10*fail)}`:''}"/>`;
    s+=`<path id="hpL" d="${pL}" style="fill:none;stroke:var(--lmn);stroke-width:${f1(3.4-1.9*fail)};stroke-linecap:round;${fail>.4?`stroke-dasharray:12 ${f1(12*fail)}`:''}"/>`;
    s+=umn(L.ux,L.uy,15,1,{dead:fail*.8,axonLen:0});
    s+=lmn(L.lx,L.ly,14,1,{dead:fail*.85,axonLen:0});
    s+=`<text x="${L.ux+(N?28:22)}" y="${L.uy-(N?6:26)}" class="t-sm" style="fill:var(--umn)">${HOME_TXT.umn}</text>`;
    s+=`<text x="${L.lx+(N?26:-10)}" y="${L.ly+(N?4:34)}" class="t-sm ${N?'':'t-end'}" style="fill:var(--lmn)">${HOME_TXT.lmn}</text>`;
    /* muscle: rows of fibres */
    const rows=5;for(let k=0;k<rows;k++){s+=fibre(L.mx,L.my+k*(N?10:12)-(N?0:24),L.mw*(1-.08*fail),N?8:10,1,{atrophy:fail*(.5+.1*k)})}
    /* pulses travelling: fewer and fainter as neurons fail */
    svg.innerHTML=s;
    const PU=svg.querySelector('#hpU'),PL=svg.querySelector('#hpL');
    let p='';const lu=PU.getTotalLength(),ll=PL.getTotalLength();const r=rng(3);
    for(let k=0;k<6;k++){const ph=((t*9+k/6)%1);const drop=r()<fail*1.1;if(drop)continue;
      const a=PU.getPointAtLength(ph*lu),b=PL.getPointAtLength(ph*ll);
      p+=`<circle cx="${f1(a.x)}" cy="${f1(a.y)}" r="4" style="fill:var(--umn)"/><circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="4" style="fill:var(--lmn)"/>`}
    /* readout: share of signals arriving (schematic) */
    const arr=Math.round(100*(1-.85*fail));
    const bx=N?20:16,by=N?396:284,bw=N?360:200;
    p+=`<text x="${bx}" y="${by-14}" class="t-xs">${HOME_TXT.signals.toUpperCase()}</text><rect x="${bx}" y="${by-8}" width="${bw}" height="8" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by-8}" width="${f1(bw*arr/100)}" height="8" rx="4" style="fill:var(--steel)"/>`;
    svg.insertAdjacentHTML('beforeend',p);
    $('#heroCap').textContent=(t<.3?HOME_TXT.healthy:t<.7?HOME_TXT.failing:HOME_TXT.late)+'. Schematic, not to scale.';
  }
  playWire(rg,$('#heroPlay'),draw,10000,UI.replay,'home');draw(+rg.value);
};
