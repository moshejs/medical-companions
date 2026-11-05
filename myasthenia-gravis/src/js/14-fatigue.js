/* =============== 1.4 Weakness over a day =============== */
/* The day curve is a schematic model: use drains strength, rest restores it, and the ceiling
   sinks through the day (worse later in the day, Juel 2007). No study publishes this curve. */
const FTG_REST=[[10.5,10.84],[13.25,14],[17.5,18]];
const ftgUse=h=>h<7.5?.4:h<9.5?1:h<18?.8:h<19.5?1:.6;
function ftgDay(mg,rest,heat){
  const a=(mg?.0012:.00015)*(heat?1.3:1),out=new Float32Array(961);let S=1;
  for(let m=0;m<=960;m++){const h=7+m/60,Smax=mg?1-.22*m/960:1,r=rest&&FTG_REST.some(([x,y])=>h>=x&&h<y),u=r?0:ftgUse(h);
    out[m]=S;S+=-a*u+(r?.03:.002)*(Smax-S);S=clamp(S,.12,Smax)}
  return out}
/* fibres differ: each one's safety factor is the mean times a spread (normal quantiles, modelled) */
function ftgZ(p){const q=p<.5?p:1-p,t=Math.sqrt(-2*Math.log(q)),z=t-(2.515517+.802853*t+.010328*t*t)/(1+1.432788*t+.189269*t*t+.001308*t*t*t);return p<.5?-z:z}
const FTG_Z=Array.from({length:24},(_,i)=>ftgZ((i+.5)/24));
/* rundown across a train: biggest fall 1st→2nd, lowest at the 4th-5th, slight recovery after (shape published, size modelled) */
const ftgRun=n=>n<=5?1-.14*(1-Math.exp(-(n-1)/.9)):1-.14*(1-Math.exp(-4/.9))+.035*(n-5)/5;
const ftgHM=h=>{const H=Math.floor(h),M=Math.min(59,Math.round((h-H)*60));return String(H).padStart(2,'0')+':'+String(M).padStart(2,'0')};
const FTG_STEPS=[
 {from:0,at:.02,k:'07:00 · Morning',t:'Strongest after sleep',
  txt:'Weakness fluctuates from hour to hour and is generally worse later in the day [[Juel2007]]. Willis described it in 1672: patients well in the morning and weak by noon [[Deymeer2021]]. At a healthy junction each impulse normally releases 2-4 times more transmitter than is needed to fire the muscle fibre: the safety factor [[Slater2017]]. Ruff and Lennon measured it in human intercostal muscle as 2.98 in controls and 1.09 in MG [[Ruff2008]].',
  pt:'After a night\'s sleep the muscles work best. In MG, though, the message from nerve to muscle has almost no spare strength even in the morning.',
  hook:'Safety factor = EPP ÷ the depolarisation needed to fire. Healthy about 3, MG about <b>1.1</b>. [[Ruff2008]]'},
 {from:.16,at:.2,k:'Mid-morning · Use',t:'Repeated firing: each EPP smaller',
  txt:'During a burst of impulses the readily releasable store of vesicles empties, so each endplate potential (EPP) is smaller than the last: rundown. A healthy endplate has so much spare that every EPP stays above threshold [[Kouyoumdjian2023]]. In MG the margin is so thin that rundown drops some fibres below threshold and they stop contracting: myasthenia is, in the end, the failure of the EPP to reach threshold [[Sine2012]]. The largest fall comes between the 1st and 2nd impulses and the lowest point at the 4th or 5th [[Rousseff2021]].',
  pt:'Each time the nerve fires in quick succession it releases a little less messenger. With fewer catchers on the muscle, some fibres stop responding, and the muscle tires.',
  hook:'The <b>RNS decrement</b> is this rundown seen electrically: a reproducible fall of 10% or more from the 1st to the 4th or 5th response at 2-5 Hz. [[AAEM2001,Kouyoumdjian2023]]'},
 {from:.38,at:.42,k:'Early afternoon · Rest',t:'A rest restores strength',
  txt:'Weakness eases with rest and recurs with use [[MSDManual2026]]. Within a train, after 1-2 seconds transmitter moves up from a secondary store to refill the releasable one, which is why the decrement levels off and partly recovers [[Kouyoumdjian2023]]. Over minutes, rest lets the lid and the limbs recover. The rest (sleep) test uses this: after 30 minutes of sleep, ptosis resolves and returns over 30 seconds to 5 minutes [[Odel1991]].',
  pt:'Resting gives the nerve endings time to restock, so strength comes back, at least for a while.',
  hook:'In one comparison of 2-minute tests, mean ptosis improved 1.3 mm with rest, 2.3 mm with ice and 0.33 mm with heat. [[Yoganathan2022]]'},
 {from:.6,at:.75,k:'Evening',t:'Weakest late in the day',
  txt:'By evening weakness is usually at its worst [[Juel2007]]. Sustained exercise and a higher body temperature can add to it [[Juel2007]]. Not every subtype behaves this way: in MuSK MG diurnal variation is less common [[Dresser2021]]. The day curve here is a schematic built from these descriptions; no study in our sources publishes an hour-by-hour strength curve.',
  pt:'Lids droop and speech or chewing tire more in the evening. The pattern is so typical that it is part of the diagnosis.',
  hook:'Fatigability is the hallmark: worse with use and later in the day, better with rest.'},
 {from:.82,at:.9,k:'Bedside tests',t:'Sustained upgaze, ice and rest',
  txt:'A clinician can provoke and relieve the weakness at the bedside. Ptosis that worsens on sustained upgaze shows the lid levator tiring [[Juel2007,Yoganathan2022]]. An ice pack over the lid for 2-5 minutes counts as positive if ptosis improves by 2 mm or more [[Rousseff2021]]; in a series of 155 consecutive ptosis referrals it was 86% sensitive and 79% specific [[Giannoccaro2020]]. Slight local cooling also reduced the electrical decrement in 28 patients [[Ricker1977]]. Try the ice and heat buttons, and the tests below.',
  pt:'Cold makes a drooping lid lift a little; heat makes weakness worse. A doctor can use an ice pack to see this in a few minutes.',
  hook:'Ice pack test: positive at <b>2 mm or more</b> of lid lift. [[Rousseff2021,Proudman2023]]'}
];
inits.fatigue=()=>{
  const svg=$('#ftgSvg'),rg=$('#ftgT');let mg=true,rest=true,ice=false,heat=false;
  let day,hday;const recompute=()=>{day=ftgDay(mg,rest,heat);hday=ftgDay(false,rest,heat)};recompute();
  const ord=(()=>{const r=rng(11),a=[...Array(24).keys()];for(let i=23;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  function state(t){const m=Math.round(clamp(t)*960),S=day[m],h=7+m/60;
    const inRest=rest&&FTG_REST.some(([x,y])=>h>=x&&h<y);
    const SF0=mg?1.09:2.98,sf=SF0*(.8+.2*S)*(ice?1.12:1)*(heat?.93:1);
    const fired=n=>FTG_Z.map(z=>sf*Math.exp(.22*z)*ftgRun(n)>=1);
    const counts=[...Array(10)].map((_,i)=>fired(i+1).filter(Boolean).length);
    const droop=mg?clamp(.08+(1-S)*.95-(ice?.2:0),.03,.88):.06;
    return {m,S,h,inRest,SF0,sf,counts,fired,droop}}
  const lidWord=d=>d<.28?'lid well open':d<.42?'mild ptosis':d<.6?'lid down to the pupil':'lid over the pupil';
  function terminal(x,y,k,o){let s='';
    const vis=Math.round(k<=5?12-7*(1-Math.exp(-(k-1)/.9)):5+Math.min(2,Math.floor((k-5)/2)));
    s+=`<rect x="${x+10}" y="${y}" width="70" height="74" rx="24" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.6"/>`;
    s+=`<text x="${x+45}" y="${y+14}" class="t-xs t-mid" style="fill:var(--nerve)">store</text>`;
    for(let i=0;i<12;i++){const c=i%4,r=Math.floor(i/4);s+=vesicle(x+22+c*15,y+28+r*14,5.6,i<vis?1:.15,3)}
    for(let i=0;i<Math.min(mg?3:6,vis);i++)s+=mg?achDot(x+26+i*19,y+80,2.2,o):achDot(x+13+i*14,y+80+(i%2)*3,2.2,o);
    s+=`<rect x="${x}" y="${y+94}" width="90" height="34" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.2"/>`;
    const nR=mg?4:9;for(let i=0;i<nR;i++){const rx=mg?x+16+i*19:x+9+i*9.2;s+=achr(rx,y+94,7,o>.5?.7:.2)}
    if(mg)[0,1,2].forEach(i=>{s+=igg(x+16+i*19,y+80,6,Math.PI,1)});
    s+=`<text x="${x+45}" y="${y+142}" class="t-xs t-mid">${mg?'fewer receptors':'receptors'}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 540','400 1048');
    const L=N?{
      eye:{x:200,y:78,w:96,lab:18,desc:138,st:154},
      A:{tt:190,sch:206,X0:48,X1:384,Yt:226,Yb:350,st:360,tk:384,hrs:[7,11,15,19,23]},
      div:'M20 404H380',
      B:{tt:428,sub:444,term:{x:20,y:478},fib:{x:150,y:492,cols:8,dx:30,dy:22,w:20,lab:480},
         epp:{x0:66,dx:27,w:18,base:830,top:676,lab:664,thrX:334,nY:844,tickX:56},
         cm:{x0:66,dx:27,w:18,base:966,h:76,lab:874,nY:980},ro:[1008,1024]}}
     :{
      eye:{x:640,y:116,w:92,lab:40,desc:182,st:198},
      A:{tt:22,sch:22,X0:60,X1:560,Yt:46,Yb:186,st:196,tk:222,hrs:[7,9,11,13,15,17,19,21,23]},
      div:'M20 244H700',
      B:{tt:268,sub:284,term:{x:20,y:306},fib:{x:470,y:316,cols:12,dx:20,dy:22,w:15,lab:302},
         epp:{x0:150,dx:25,w:17,base:470,top:316,lab:302,thrX:398,nY:484,tickX:138},
         cm:{x0:470,dx:24,w:16,base:470,h:80,lab:370,nY:484},ro:[510,526]}};
    const st=state(t),A=L.A,B=L.B;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    /* ---- A: the day ---- */
    const hx=h=>lerp(A.X0,A.X1,(h-7)/16),sy=v=>lerp(A.Yb,A.Yt,v);
    s+=`<text x="20" y="${A.tt}" class="t-lbl">A · A waking day, 07:00-23:00</text>`;
    s+=`<text x="${N?20:A.X1}" y="${A.sch}" class="t-xs${N?'':' t-end'}" style="fill:var(--warn);font-weight:600">SCHEMATIC: shape modelled, not measured</text>`;
    if(rest)FTG_REST.forEach(([a,b])=>{s+=`<rect x="${f1(hx(a))}" y="${A.Yt}" width="${f1(hx(b)-hx(a))}" height="${A.st+10-A.Yt}" style="fill:var(--good);opacity:.13"/>`});
    [[0,'0'],[.5,'50%'],[1,'100%']].forEach(([v,l])=>{s+=`<line x1="${A.X0}" x2="${A.X1}" y1="${f1(sy(v))}" y2="${f1(sy(v))}" class="grid"/><text x="${A.X0-6}" y="${f1(sy(v)+3)}" class="t-xs t-end">${l}</text>`});
    s+=`<text x="${A.X0}" y="${A.Yt-6}" class="t-xs">strength</text>`;
    /* activity strip */
    for(let q=0;q<64;q++){const h0=7+q/4,hm=h0+.125,r=rest&&FTG_REST.some(([x,y])=>hm>=x&&hm<y),u=r?0:ftgUse(hm);
      s+=`<rect x="${f1(hx(h0))}" y="${A.st}" width="${f1(hx(h0+.25)-hx(h0)+.4)}" height="10" style="fill:${r?'var(--good)':'var(--ab)'};opacity:${r?.8:f1(.15+.55*u)}"/>`}
    s+=`<text x="${A.X0-6}" y="${A.st+9}" class="t-xs t-end">use</text>`;
    A.hrs.forEach(h=>s+=`<text x="${f1(hx(h))}" y="${A.tk}" class="t-xs t-mid">${String(h).padStart(2,'0')}:00</text>`);
    const path=(arr,m0,m1)=>{let d='';for(let m=m0;m<=m1;m+=4){d+=(d?'L':'M')+f1(hx(7+m/60))+' '+f1(sy(arr[m]))}if((m1-m0)%4)d+='L'+f1(hx(7+m1/60))+' '+f1(sy(arr[m1]));return d};
    if(mg){s+=`<path d="${path(hday,0,960)}" style="fill:none;stroke:var(--achr);stroke-width:1.4;stroke-dasharray:4 4;opacity:.7"/><text x="${A.X1}" y="${f1(sy(hday[960])-5)}" class="t-xs t-end" style="fill:var(--achr)">healthy</text>`}
    const col=mg?'var(--ab)':'var(--achr)';
    s+=`<path d="${path(day,0,960)}" style="fill:none;stroke:${col};stroke-width:1.6;stroke-dasharray:2 4;opacity:.45"/>`;
    if(st.m>0)s+=`<path d="${path(day,0,st.m)}" style="fill:none;stroke:${col};stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`;
    const px=hx(st.h),py=sy(st.S);
    s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${A.Yt}" y2="${A.st+10}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/><circle cx="${f1(px)}" cy="${f1(py)}" r="5.5" style="fill:var(--panel);stroke:${col};stroke-width:2.4"/>`;
    {const lab=`${ftgHM(st.h)} · ${Math.round(st.S*100)}%`,w=lab.length*6.7,right=px+10+w<A.X1;
      s+=`<text x="${f1(right?px+10:px-10)}" y="${f1(py<A.Yt+34?py+20:py-10)}" class="t-sm${right?'':' t-end'}" style="fill:var(--ink);font-weight:600">${lab}</text>`}
    /* eye */
    const E=L.eye;
    s+=`<text x="${E.x}" y="${E.lab}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">eyelid now</text>`;
    s+=eyelid(E.x,E.y,E.w,st.droop);
    s+=`<text x="${E.x}" y="${E.desc}" class="t-xs t-mid" style="fill:var(--ink)">${mg?lidWord(st.droop):'no ptosis'}</text>`;
    const tags=[];if(ice)tags.push('ice: mean lift 2.3 mm');if(heat)tags.push('hot day: faster decline');
    if(tags.length)s+=`<text x="${E.x}" y="${E.st}" class="t-xs t-mid" style="fill:${ice?'var(--nerve)':'var(--warn)'};font-weight:600">${tags.join(' · ')}</text>`;
    if(N&&tags.length>1)s=s.replace(`>${tags.join(' · ')}</text>`,`>${tags[0]}</text><text x="${E.x}" y="${E.st+12}" class="t-xs t-mid" style="fill:var(--warn);font-weight:600">${tags[1]}</text>`);
    s+=`<path d="${L.div}" class="axis"/>`;
    /* ---- B: one train ---- */
    const k=1+Math.floor(((t*16)%1)*10.999)%10;
    s+=`<text x="20" y="${B.tt}" class="t-lbl">B · Zoom: one train of 10 impulses, now</text>`;
    s+=N?`<text x="20" y="${B.sub}" class="t-xs">a few seconds of firing at ${ftgHM(st.h)};</text><text x="20" y="${B.sub+12}" class="t-xs">the train repeats as the day runs</text>`
        :`<text x="20" y="${B.sub}" class="t-xs">a few seconds of firing at ${ftgHM(st.h)}; the train repeats as the day runs</text>`;
    s+=terminal(B.term.x,B.term.y,k,1);
    const P=B.epp,ey=v=>P.base-v/3.3*(P.base-P.top),thr=ey(1);
    s+=`<text x="${N?20:P.x0}" y="${P.lab}" class="t-xs">endplate potential (EPP) of an average fibre</text>`;
    [1,2,3].forEach(v=>s+=`<text x="${P.tickX}" y="${f1(ey(v)+3)}" class="t-xs t-end">${v}×</text>`);
    s+=`<line x1="${P.x0-6}" x2="${P.x0+9*P.dx+P.w+4}" y1="${P.base}" y2="${P.base}" class="axis"/>`;
    for(let n=1;n<=10;n++){const v=st.sf*ftgRun(n),x=P.x0+(n-1)*P.dx,y=ey(v),on=n<=k,ok=v>=1;
      s+=`<rect x="${x}" y="${f1(y)}" width="${P.w}" height="${f1(P.base-y)}" rx="2" style="fill:${ok?'var(--achr)':'var(--ab-soft)'};stroke:${ok?'none':'var(--ab)'};stroke-width:1.3;opacity:${on?1:.22}"/>`;
      if(on)s+=`<circle cx="${x+P.w/2}" cy="${f1(y)}" r="3" style="fill:var(--field);stroke:var(--ink);stroke-width:1.2"/>`;
      s+=`<text x="${x+P.w/2}" y="${P.nY}" class="t-xs t-mid" style="${n===k?'fill:var(--ink);font-weight:700':''}">${n}</text>`}
    s+=`<text x="${P.tickX}" y="${P.nY}" class="t-xs t-end">impulse</text>`;
    s+=`<line x1="${P.x0-6}" x2="${P.x0+9*P.dx+P.w+4}" y1="${f1(thr)}" y2="${f1(thr)}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 3"/><text x="${P.thrX}" y="${f1(thr+4)}" class="t-xs" style="fill:var(--ink);font-weight:600">threshold</text>`;
    /* published mean safety factor, first impulse, morning */
    const x1=P.x0+P.w/2,yp=ey(st.SF0);
    s+=`<circle cx="${x1}" cy="${f1(yp)}" r="4.5" style="fill:var(--ink)"/><text x="${x1+8}" y="${f1(yp-6)}" class="t-xs" style="fill:var(--ink);font-weight:600">SF ${st.SF0} (published)</text>`;
    /* fibres at impulse k */
    const F=B.fib,fk=st.fired(k),ck=st.counts[k-1];
    s+=`<text x="${N?F.x:F.x}" y="${F.lab}" class="t-xs" style="fill:var(--ink)">fibres at impulse ${k}: <tspan style="font-weight:700">${ck} of 24 fire</tspan></text>`;
    ord.forEach((fi,i)=>{const c=i%F.cols,r=Math.floor(i/F.cols),x=F.x+c*F.dx,y=F.y+r*F.dy,on=fk[fi];
      s+=on?`<rect x="${x}" y="${y}" width="${F.w}" height="9" rx="4.5" style="fill:var(--achr)"/>`:`<rect x="${x}" y="${y}" width="${F.w}" height="9" rx="4.5" style="fill:none;stroke:var(--ab);stroke-width:1.3;stroke-dasharray:3 2"/>`});
    /* CMAP-like count per impulse */
    const C=B.cm;
    s+=`<text x="${N?20:C.x0}" y="${C.lab}" class="t-xs">fibres firing per impulse (as on RNS)</text>`;
    s+=`<line x1="${C.x0-4}" x2="${C.x0+9*C.dx+C.w+4}" y1="${C.base}" y2="${C.base}" class="axis"/>`;
    st.counts.forEach((c,i)=>{const x=C.x0+i*C.dx,h=c/24*C.h,on=i<k;
      s+=`<rect x="${x}" y="${f1(C.base-h)}" width="${C.w}" height="${f1(Math.max(h,.5))}" rx="2" style="fill:var(--nerve);opacity:${on?.9:.22}"/>`;
      if(N||i===0||i===3)s+=`<text x="${x+C.w/2}" y="${f1(C.base-h-4)}" class="t-xs t-mid" style="opacity:${on?1:.4}">${c}</text>`;
      if(N)s+=`<text x="${x+C.w/2}" y="${C.nY}" class="t-xs t-mid">${i+1}</text>`});
    if(!N)s+=`<text x="${C.x0}" y="${C.nY}" class="t-xs">1</text><text x="${C.x0+9*C.dx+C.w}" y="${C.nY}" class="t-xs t-end">10</text>`;
    const dec=st.counts[0]?Math.round((st.counts[0]-st.counts[3])/st.counts[0]*100):100;
    const dc=dec>=10?'var(--ab)':'var(--achr)',dv=dec>=10?'abnormal on RNS (10% or more)':'normal (under 10%)',sl=st.inRest?'resting now: the store and the strength recover':'the store empties over 4-5 impulses; it refills in 1-2 s';
    s+=N?`<text x="20" y="${B.ro[0]}" class="t-sm" style="fill:${dc};font-weight:600">decrement, 1st → 4th: ${dec}%</text><text x="20" y="${B.ro[0]+14}" class="t-xs" style="fill:${dc};font-weight:600">${dv}</text><text x="20" y="${B.ro[1]+12}" class="t-xs">${sl}</text>`
        :`<text x="20" y="${B.ro[0]}" class="t-sm" style="fill:${dc};font-weight:600">decrement, 1st → 4th: ${dec}% · ${dv}</text><text x="20" y="${B.ro[1]}" class="t-xs">${sl}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(FTG_STEPS,t);setSt(p);const S0=FTG_STEPS[p];
    let P2=S0;if(p===2&&!rest)P2=Object.assign({},S0,{txt:S0.txt+' <b>Rest breaks are switched off</b>, so the curve keeps falling through the afternoon.'});
    let extra='';
    if(!mg)extra=`<div class="hook"><b>What you see</b>A healthy junction: with a safety factor near 3, every EPP stays above threshold despite rundown, so all 24 fibres fire and strength barely changes over the day. Switch to MG to compare.</div>`;
    $('#ftgNote').innerHTML=noteHTML(P2)+extra;
    $('#ftgRead').innerHTML=`<span>time <b>${ftgHM(st.h)}</b></span><span>strength <b>${Math.round(st.S*100)}%</b> (schematic)</span><span>safety factor now <b>${st.sf.toFixed(2)}</b> (modelled)</span><span>fibres firing, impulse 1 → 5 <b>${st.counts[0]} → ${st.counts[4]}</b></span><span>decrement <b>${dec}%</b></span>`;
  }
  const stop=playWire(rg,$('#ftgPlay'),draw,20000,'Replay','fatigue');
  const setSt=stepWire($('#ftgSteps'),FTG_STEPS,rg,draw,stop);
  const rd=()=>{recompute();draw(+rg.value)};
  $('#ftgHealthy').onclick=()=>{mg=false;$('#ftgHealthy').setAttribute('aria-pressed','true');$('#ftgMG').setAttribute('aria-pressed','false');rd()};
  $('#ftgMG').onclick=()=>{mg=true;$('#ftgHealthy').setAttribute('aria-pressed','false');$('#ftgMG').setAttribute('aria-pressed','true');rd()};
  $('#ftgRest').onclick=()=>{rest=!rest;$('#ftgRest').setAttribute('aria-pressed',rest);rd()};
  $('#ftgIce').onclick=()=>{ice=!ice;$('#ftgIce').setAttribute('aria-pressed',ice);if(ice&&heat){heat=false;$('#ftgHeat').setAttribute('aria-pressed','false')}rd()};
  $('#ftgHeat').onclick=()=>{heat=!heat;$('#ftgHeat').setAttribute('aria-pressed',heat);if(heat&&ice){ice=false;$('#ftgIce').setAttribute('aria-pressed','false')}rd()};
  draw(+rg.value);

  $('#ftgSF').innerHTML=`
   <div class="card"><span class="kicker">Healthy margin</span><span class="ftg-big">2-5×</span><p>more transmitter than needed: 2-4 times at low firing rates [[Slater2017]], generally 3-5 in adult mammals [[Wood2001]], four to five times in a clinical review [[Kouyoumdjian2023]]. Humans rely on elaborate postsynaptic folds rather than on releasing a lot of transmitter [[Wood2001]].</p></div>
   <div class="card"><span class="kicker">Measured in people</span><span class="ftg-big">2.98 → 1.09</span><p>safety factor in healthy versus MG intercostal muscle, 37% of control. MG miniature potentials were 53% and EPPs 58% of control, and a fibre needed 21.6 mV of depolarisation to fire instead of 13.5 mV. Loss of sodium current accounted for 40% of the fall [[Ruff2008]].</p></div>
   <div class="card"><span class="kicker">Two losses, not one</span><p>Endplate sodium current fell to about 60% of control in MG, while miniature potentials fell to under 30%: receptor loss is larger than sodium-channel loss [[Ruff1998]]. The sodium channels are lost with the endplate membrane that complement destroys, not by a direct antibody effect [[Ruff2008]].</p></div>
   <div class="card"><span class="kicker">A small reserve to start with</span><span class="ftg-big">20-30</span><p>quanta (packets) released per impulse at human junctions, against 50-100 in mice, the smallest known among vertebrates studied [[Slater2017]]. During 10-100 Hz firing, quantal content and EPP size fall but normally stay adequate [[Slater2017]].</p></div>
   <div class="card"><span class="kicker">The nerve tries to compensate</span><p>In muscle from people with AChR MG and from rats with experimental MG, nerve endings released more quanta than normal, and the increase at each endplate tracked the loss in miniature-potential size [[Plomp1995]]. MuSK MG may lack this compensation: in mice given patient MuSK IgG4, release did not rise and depression during fast firing was exaggerated [[Klooster2012]]. <span class="ev early">Early evidence</span> (mouse study)</p></div>
   <div class="card"><span class="kicker">Proximal muscles first</span><p>On RNS the decrement completes earlier in the deltoid (shoulder) than in a hand muscle, consistent with a lower safety factor in proximal muscles [[Ueta2024]]. Proximal RNS is abnormal in 60-70% of generalized MG, distal in 30-35% [[Rousseff2021]]. More in <a href="#dx" data-go="dx">Diagnosis</a> and <a href="#nmj" data-go="nmj">The neuromuscular junction</a>.</p></div>`;

  /* ---------- bedside tests ---------- */
  const BT={
   ice:{n:'Ice pack test',yl:'lid lift from start (mm)',lo:-1,hi:4,
    ph:[[0,.2,'measure'],[.2,.7,'ice on the lid, 2-5 min'],[.7,1,'measure again']],
    ticks:[[0,'0'],[.2,'start ice'],[.7,'2-5 min'],[1,'later']],
    v:t=>t<.2?0:t<.7?2.3*ease(ramp(t,.2,.7)):2.3-1.4*ease(ramp(t,.78,1)),
    cover:t=>t>=.2&&t<.7,droop:v=>.52-v*.08,
    word:t=>t<.2?'baseline ptosis measured':t<.7?'ice held over the closed lid':t<.78?'lid lifts: ptosis improved':'lift fades as the lid warms (schematic)'},
   up:{n:'Sustained upgaze',yl:'lid position',lo:0,hi:1,
    ph:[[0,.167,'up to 10 s'],[.167,.75,'11-45 s'],[.75,1,'over 45 s']],
    ticks:[[0,'0 s'],[.167,'10 s'],[.75,'45 s'],[1,'60 s']],
    v:t=>.32+.28*Math.pow(ramp(t,.28,1),1.15),droop:v=>v,
    word:t=>t<.28?'looking up and holding: lid holds':t<.98?'lid creeps down as the levator tires':'60 s: lid down to the pupil'},
   rest:{n:'Rest (sleep) test',yl:'lid position',lo:0,hi:1,
    ph:[[0,.15,'ptosis'],[.15,.55,'sleep 30 min'],[.55,.62,'wake'],[.62,1,'returns in 30 s-5 min']],
    ticks:[[0,'0'],[.15,'eyes closed'],[.55,'30 min'],[1,'+5 min']],
    v:t=>t<.15?.55:t<.55?1:t<.62?.14:.14+.41*ease(ramp(t,.62,1)),droop:v=>v,
    word:t=>t<.15?'ptosis before the rest':t<.55?'eyes closed, quiet room':t<.62?'on waking: ptosis gone':'ptosis returns over 30 s to 5 min'}
  };
  const BTN={
   ice:`<div class="kicker">Ice pack test</div><h4>Cold lifts the lid</h4><div class="ftg-acc"><div><b>86%</b>sensitivity</div><div><b>79%</b>specificity</div><div><b>2.3 mm</b>mean lift</div></div><p>In 155 consecutive ptosis referrals (102 with ocular MG), the ice pack test had 86% sensitivity and 79% specificity; combined with single-fibre EMG, sensitivity rose to 98% if either was positive, and specificity to 92% if both were [[Giannoccaro2020]]. Across 20 studies (1,264 people), sensitivity ranged from 38.5% to 100%; specificity was above 95% in six studies, and no adverse effects were reported [[Proudman2023]].</p><p>Ice is held over the symptomatic eye for 2-5 minutes, and 2 mm or more of improvement counts as positive, a cut-off Rousseff calls somewhat arbitrary because heat produced similar changes in some patients; some report specificity as low as about 25% [[Rousseff2021]]. Mean improvement was 2.3 mm with ice, 1.3 mm with rest and 0.33 mm with heat, and repeating the ice test raised sensitivity by 35% [[Yoganathan2022]].</p><div class="hook"><b>Exam hook</b>Ice improves myasthenic ptosis; a lift of about 2 mm or more strongly suggests it. [[Estephan2022]]</div>`,
   up:`<div class="kicker">Sustained upgaze</div><h4>Make the lid work</h4><div class="ftg-acc"><div><b>73%</b>sensitivity with ice</div><div><b>97%</b>specificity with ice</div><div><b>28%</b>ice alone</div></div><p>Ptosis that increases on sustained upgaze shows that the lid levator tires. In one study the ice pack alone was 28% sensitive and 100% specific, against 73% and 97% when combined with 2 minutes of sustained upgaze [[Yoganathan2022]]. Our sources give no accuracy figure for upgaze on its own.</p><p>Scores use it too. The MG Composite scores ptosis on upgaze by time to onset: over 45 s scores 0, 11-45 s 1, 1-10 s 2, immediate 3 [[Burns2008]]. The MG-CE scores the lid after 60 s: above the pupil 1, at the pupil 2, below it 3 [[Guidon2021]]. The patient in the animation would score 1 and 2.</p><div class="pt"><b>In plain words</b>Looking up for a minute makes a weak eyelid tire and droop, which shows it is the muscle tiring, not a fixed droop.</div>`,
   rest:`<div class="kicker">Rest (sleep) test</div><h4>Half an hour of rest</h4><div class="ftg-acc"><div><b>30 min</b>sleep</div><div><b>30 s-5 min</b>to return</div><div><b>1.3 mm</b>mean, 2-min rest</div></div><p>After a 30-minute sleep, ptosis or eye-movement weakness resolves immediately and reappears over the next 30 seconds to 5 minutes. The authors called the test safe, moderately sensitive and specific, as an alternative to the edrophonium (Tensilon) test; the abstract gives no numbers [[Odel1991]]. In 2-minute tests rest lifted the lid less than ice, by 1.3 mm against 2.3 mm on average [[Yoganathan2022]].</p><div class="hook"><b>Exam hook</b>Since 2018 edrophonium is no longer marketed in the US as a test for MG, so the safe bedside tests matter more. [[Yoganathan2022]]</div>`
  };
  const sb=$('#ftgBt'),rb=$('#ftgBtT');let bt='ice';
  function draw2(t){const N=vb(sb,'720 300','400 500');const T=BT[bt];
    const L=N?{ex:200,ey:112,ew:136,el:16,ed:188,gx0:52,gx1:384,gt:236,gp:254,gy0:268,gy1:440,gk:456}
             :{ex:150,ey:140,ew:150,el:28,ed:250,gx0:316,gx1:700,gt:26,gp:44,gy0:58,gy1:220,gk:236};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const v=T.v(t),cov=T.cover&&T.cover(t),dr=bt==='ice'?T.droop(v):(bt==='rest'&&t>=.15&&t<.55?1:T.droop(v));
    s+=`<text x="${L.ex}" y="${L.el}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${T.n}</text>`;
    s+=eyelid(L.ex,L.ey,L.ew,clamp(dr));
    if(dr>=1){const w=L.ew/2,tp=-L.ew*.34*1.25;s+=`<path d="M${f1(L.ex-w)} ${L.ey}Q${L.ex} ${f1(L.ey+tp)} ${f1(L.ex+w)} ${L.ey}Q${L.ex} ${f1(L.ey-tp)} ${f1(L.ex-w)} ${L.ey}Z" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.6"/><path d="M${f1(L.ex-w)} ${L.ey}Q${L.ex} ${f1(L.ey-tp*.9)} ${f1(L.ex+w)} ${L.ey}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`}
    if(cov){const w=L.ew+30;s+=`<rect x="${L.ex-w/2}" y="${L.ey-48}" width="${w}" height="88" rx="18" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:2;opacity:.94"/><text x="${L.ex}" y="${L.ey}" class="t-lbl t-mid" style="fill:var(--nerve)">ice pack</text><text x="${L.ex}" y="${L.ey+16}" class="t-xs t-mid" style="fill:var(--nerve)">${f1(lerp(0,5,ramp(t,.2,.7)))} min</text>`}
    if(bt==='up')s+=`<path d="M${L.ex-L.ew/2-24} ${L.ey+10}V${L.ey-40}" style="fill:none;stroke:var(--nerve);stroke-width:2" marker-end="url(#ftgUp)"/><text x="${L.ex-L.ew/2-24}" y="${L.ey+26}" class="t-xs t-mid" style="fill:var(--nerve)">gaze up</text>`;
    s+=`<text x="${L.ex}" y="${L.ed}" class="t-xs t-mid" style="fill:var(--ink)">${T.word(t)}</text>`;
    if(bt==='up'){const sec=Math.round(t*60);s+=`<text x="${L.ex}" y="${L.ed+14}" class="t-xs t-mid">${sec} s of upgaze</text>`}
    /* graph */
    s+=`<text x="${L.gx0}" y="${L.gt}" class="t-lbl">${T.yl}</text><text x="${L.gx1}" y="${L.gt}" class="t-xs t-end" style="fill:var(--warn);font-weight:600">illustrative patient</text>`;
    const gx=u=>lerp(L.gx0,L.gx1,u);
    const gy=bt==='ice'?(val=>lerp(L.gy1,L.gy0,(val-T.lo)/(T.hi-T.lo))):(val=>lerp(L.gy0,L.gy1,(val-.1)/(1-.1)));
    T.ph.forEach(([a,b,l],i)=>{s+=`<rect x="${f1(gx(a))}" y="${L.gy0}" width="${f1(gx(b)-gx(a))}" height="${L.gy1-L.gy0}" style="fill:${i%2?'var(--panel-2)':'var(--panel)'};opacity:.7"/>`;
      const cx=(gx(a)+gx(b))/2,w=l.length*5.7;if(w<gx(b)-gx(a)+6)s+=`<text x="${f1(cx)}" y="${L.gp}" class="t-xs t-mid">${l}</text>`});
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${L.gy1}" y2="${L.gy1}" class="axis"/>`;
    T.ticks.forEach(([u,l],i)=>s+=`<text x="${f1(gx(u))}" y="${L.gk}" class="t-xs ${i===0?'':i===T.ticks.length-1?'t-end':'t-mid'}">${l}</text>`);
    if(bt==='ice'){[0,2,4].forEach(m=>s+=`<text x="${L.gx0-5}" y="${f1(gy(m)+3)}" class="t-xs t-end">${m}</text>`);
      s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(gy(0))}" y2="${f1(gy(0))}" class="grid"/>`;
      s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(gy(2))}" y2="${f1(gy(2))}" style="stroke:var(--good);stroke-width:1.4;stroke-dasharray:6 3"/><text x="${L.gx0+4}" y="${f1(gy(2)-5)}" class="t-xs" style="fill:var(--good);font-weight:600">positive: 2 mm or more</text>`}
    else{/* lid bands by the pupil (eyelid geometry: top of pupil at droop .41, bottom at .65) */
      [[.1,.413,'above pupil'],[.413,.651,'at pupil'],[.651,1,'below pupil']].forEach(([a,b,l])=>{s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(gy(b))}" y2="${f1(gy(b))}" class="grid"/><text x="${L.gx0-5}" y="${f1((gy(a)+gy(b))/2+3)}" class="t-xs t-end">${N?l.replace(' pupil',''):l}</text>`})}
    /* curve so far + ghost */
    const pts=(u0,u1)=>{let d='';for(let u=u0;u<=u1+1e-9;u+=.005){const q=Math.min(u,u1);d+=(d?'L':'M')+f1(gx(q))+' '+f1(gy(T.v(q)))}return d};
    const hidden=u=>(bt==='ice'&&u>=.2&&u<.7)||(bt==='rest'&&u>=.15&&u<.55);
    s+=`<path d="${pts(0,1)}" style="fill:none;stroke:var(--ab);stroke-width:1.4;stroke-dasharray:3 4;opacity:.35"/>`;
    /* draw solid where measured, dashed where the lid is hidden (under ice, or eyes closed) */
    let segs=[],cur=null;for(let u=0;u<=t+1e-9;u+=.005){const q=Math.min(u,t),h=hidden(q);if(!cur||cur.h!==h){cur={h,d:(cur?cur.last:'M'+f1(gx(q))+' '+f1(gy(T.v(q))))};segs.push(cur)}const p=f1(gx(q))+' '+f1(gy(T.v(q)));cur.d+=(cur.d.length?'L':'M')+p;cur.last='M'+p}
    segs.forEach(g=>s+=`<path d="${g.d}" style="fill:none;stroke:var(--ab);stroke-width:${g.h?1.6:3};${g.h?'stroke-dasharray:4 3;opacity:.6;':''}stroke-linecap:round"/>`);
    if(bt==='ice'&&t>=.72)s+=`<circle cx="${f1(gx(.72))}" cy="${f1(gy(2.3))}" r="5.5" style="fill:var(--ab)"/><text x="${f1(gx(.72)-6)}" y="${f1(gy(2.3)-12)}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">mean 2.3 mm (published)</text>`;
    if(bt==='rest'&&t>=.15)s+=`<text x="${f1(gx(.35))}" y="${f1(gy(1)-6)}" class="t-xs t-mid">eyes closed</text>`;
    if(bt==='ice'&&t>=.2)s+=`<text x="${f1(gx(.45))}" y="${f1(gy(1.2)+14)}" class="t-xs t-mid">under the ice</text>`;
    s+=`<line x1="${f1(gx(t))}" x2="${f1(gx(t))}" y1="${L.gy0}" y2="${L.gy1}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/><circle cx="${f1(gx(t))}" cy="${f1(gy(v))}" r="5" style="fill:var(--panel);stroke:var(--ab);stroke-width:2.2"/>`;
    sb.innerHTML=`<defs>${marker('ftgUp','var(--nerve)')}</defs>`+s;
    $('#ftgBtNote').innerHTML=BTN[bt];
  }
  const stop2=playWire(rb,$('#ftgBtPlay'),draw2,9000,'Replay','fatigue');
  $$('[data-ftgb]').forEach(b=>b.addEventListener('click',()=>{stop2();bt=b.dataset.ftgb;$$('[data-ftgb]').forEach(x=>x.setAttribute('aria-pressed',x===b));rb.value=.02;draw2(.02)}));
  draw2(+rb.value);

  $('#ftgLid').innerHTML=`
   <div class="card"><span class="kicker">Cogan's lid twitch</span><p>After looking down, then back to the front, the lid overshoots and twitches. Sensitivity 50-99% and specificity 75-100% across 7 studies [[Pietris2023]]; "relatively low" in a 35-patient prospective series [[VanStavern2007]].</p></div>
   <div class="card"><span class="kicker">Forced eyelid closure</span><p>An excess upward lid overshoot after squeezing the eyes shut for 5-10 seconds: sensitivity 94% and specificity 91% in 48 patients [[Apinyawasisuk2017]].</p></div>
   <div class="card"><span class="kicker">Enhanced ptosis (curtain sign)</span><p>Lifting the more drooping lid makes the other one fall. It is described clinically, but our sources found no study of its accuracy, so no figure can be given.</p></div>
   <div class="card"><span class="kicker">Edrophonium, now historical</span><p>The Tensilon test acts within 30 s and lasts about 5 min, but serious adverse events include bradyarrhythmia to asystole and bronchospasm [[Rousseff2021]]. It has been discontinued in the US as a test for MG since 2018 [[Yoganathan2022]].</p></div>`;

  $('#ftgWorse').innerHTML=`
   <div class="card"><span class="kicker">Heat and fever</span><p>A higher body temperature can increase weakness, and fever is a recognised trigger for worsening [[Juel2007]]. Cooler temperatures lessen it [[MSDManual2026]]. Our sources found no controlled study measuring how much heat worsens MG.</p></div>
   <div class="card"><span class="kicker">Cold, but only a little</span><p>In 28 patients slight local cooling reduced the electrical decrement, but the force decrement also increased, so cooling was not practical as a treatment; severe cooling (18-22 °C) caused transmission failure [[Ricker1977]].</p></div>
   <div class="card"><span class="kicker">Sustained effort</span><p>Sustained exercise can increase weakness [[Juel2007]]. Supervised training is a different thing: in two small trials (15 and 10 people), 8-12 weeks of aerobic or resistance training did not worsen MG scores and improved strength or performance, though a few people in the larger trial had bulbar symptoms or more fatigue [[Rahbek2017,Westerberg2017]]. See <a href="#living" data-go="living">Living with MG</a>.</p></div>
   <div class="card"><span class="kicker">Infection</span><p>Intercurrent illness, especially viral respiratory infection, worsens symptoms [[Juel2007]]. Infection was the commonest trigger (38%) of myasthenic crisis in one series [[Thomas1997]].</p></div>
   <div class="card"><span class="kicker">Thyroid, pregnancy, medicines</span><p>Thyroid disease, pregnancy and drugs that impair neuromuscular transmission can all worsen MG [[Juel2007]]. With antibiotics the real-world risk is small and often confounded by the infection itself: worsening followed 2.4% of ciprofloxacin and 1.3% of amoxicillin courses (p = 0.68) [[Uysal2025]]. A 2021 review says infections must still be treated, and lists antibiotic classes to avoid if possible and others it considers safe [[Sheikh2021]].</p></div>
   <div class="card"><span class="kicker">Tiredness is not only weakness</span><p>Fatigue, as distinct from muscle fatigability, affects about 60% of patients and is linked to severity, depression and inactivity [[Campman2026]]. Severe fatigue was present in 62% of 420 Dutch registry patients and was associated with BMI and depressive symptoms [[Ruiter2021]]. Obstructive sleep apnoea was found in 36%, against an expected 15-20% in the general population [[Nicolle2006]]. Low mood can be mistaken for myasthenic weakness and lead to overtreatment [[OConnell2020]].</p></div>`;
};
