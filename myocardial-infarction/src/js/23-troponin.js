/* =============== 2.3 Troponin & rapid rule-out =============== */
/* one illustrative high-sensitivity troponin I course (ng/L) by hour. The shape follows the published
   description; the values are drawn, not measured. Thresholds are the published ones. */
const TR_PTS=[[0,2],[.5,5],[1,14],[2,40],[3,90],[6,400],[12,1500],[24,2500],[48,1400],[72,700],[120,160],[168,50]];
const TR_H1=168,trU=h=>Math.sqrt(clamp(h/TR_H1)),trH=u=>TR_H1*u*u;
const TR_THR={f:16,m:34,conv:50,low:5};
const TR_STEPS=[
 {from:0,at:.03,k:'Symptoms begin · 0 h',t:'Below the 99th percentile',
  txt:`UDMI4: "Detection of an elevated cTn value above the 99th percentile URL is defined as myocardial injury." Each assay has its own 99th percentile upper reference limit (URL), and UDMI4 recommends sex-specific values for high-sensitivity (hs) assays because values are lower in women. [[Thygesen2018UDMI4C]] At the very start of a heart attack the level may still be normal, so one early normal result cannot rule MI out.`,
  pt:`Troponin is a protein that leaks out of damaged heart muscle. Right at the start of a heart attack it may not have reached the blood yet.`,
  hook:`Myocardial injury = cTn above the 99th percentile URL; acute if it rises and/or falls. [[Thygesen2018UDMI4C]]`},
 {from:.06,at:.077,k:'About 1 hour',t:'hs-troponin starts to rise',
  txt:`The 2023 ESC guideline says troponin levels "rise rapidly (i.e. usually within 1 h if using high-sensitivity assays)" after symptom onset. [[Byrne2023ESC]] This is why the ESC 0/1-hour algorithm compares a sample at arrival with one taken an hour later: the change between them carries information. The assay-specific cut-offs sit in the guideline's online supplement. [[Byrne2023ESC]]`,
  pt:`Modern tests are sensitive enough to see troponin start to climb within about an hour.`,
  hook:`ESC: 0 h/1 h algorithm = "best option"; 0 h/2 h = "second-best option". [[Byrne2023ESC]]`},
 {from:.11,at:.134,k:'About 3 hours',t:'Diagnosis possible in many',
  txt:`UDMI4 says hs assays shorten the time to diagnosis to within 3 h of symptom onset in many patients, and advises a second sample "3–6 h later, or earlier with hs-cTn assays". [[Thygesen2018UDMI4C]] Older assays were slower: in 1991 a troponin T assay detected troponin within 3 h of pain onset in 50% of patients. [[Katus1991TnT]] Switch to the contemporary assay above to see a higher single threshold crossed later.`,
  pt:`With older tests, doctors often had to wait several hours for a clear answer. Newer ones can often answer sooner.`,
  hook:`Sensitive assays within 3 h of onset: AUC 0.92–0.94 vs 0.76 for a standard assay. [[Reichlin2009]]`},
 {from:.2,at:.38,k:'Hours to a day',t:'A rise to a peak',
  txt:`For an MI, UDMI4 requires "a rise and/or fall of cTn values with at least one value above the 99th percentile URL", plus evidence of acute ischaemia such as symptoms, new ischaemic ECG changes, new Q waves, imaging or coronary thrombus. [[Thygesen2018UDMI4C]] The dynamic pattern separates acute injury from a chronically raised, stable level. The peak height here is drawn; real peaks vary enormously.`,
  pt:`A heart attack shows up as a level that goes up (and later down). A level that stays high but steady points to another, longer-standing cause.`,
  hook:`MI = acute injury (rise and/or fall, one value above the 99th percentile) + evidence of acute ischaemia. [[Thygesen2018UDMI4C]]`},
 {from:.55,at:.845,k:'Days',t:'A slow fall',
  txt:`Troponin stays raised for a variable time, usually several days. [[Byrne2023ESC]] In 1991, troponin T stayed raised for more than 130 hours after MI. [[Katus1991TnT]] A raised value days after symptoms can therefore still point to a recent infarct, while people who arrive more than 12–18 h after onset may take longer to show a changing pattern. [[Thygesen2018UDMI4C]]`,
  pt:`Troponin can stay high for several days, so the test can still show a heart attack that happened a few days ago.`,
  hook:`Late presenters (>12–18 h) may not show an obvious change between samples. [[Thygesen2018UDMI4C]]`}
];
/* ESC 0/1-h algorithm cohorts: proportions (% of patients), NPV, PPV, as published */
const TR_CO={
 r15:{n:'Reichlin 2015 · prospective validation',sz:'1,320 patients, 17.3% MI',bins:[['Rule-out',59.5],['Observe',24.1],['Rule-in',16.4]],npv:99.9,ppv:78.2,
  txt:`In prospective validation of the 1-hour hs-cTnT algorithm, 59.5% were ruled out, 16.4% ruled in and 24.1% observed. NPV was 99.9% (95% CI 99.3–100%) and PPV 78.2% (72.1–83.6%). [[Reichlin2015]]`},
 trapid:{n:'TRAPID-AMI · multicentre',sz:'1,282 patients, 16.6% MI',bins:[['Rule-out',63.4],['Observe',22.2],['Rule-in',14.4]],npv:99.1,ppv:77.2,obs:22.5,
  txt:`In TRAPID-AMI, 63.4% were ruled out, 14.4% ruled in and 22.2% observed. NPV was 99.1% and PPV 77.2%; MI prevalence in the observe zone was 22.5%. [[Mueller2016]]`},
 r12:{n:'Reichlin 2012 · derivation study',sz:'872 patients, 17% MI',bins:[['Rule-out',60],['Observe',23],['Rule-in',17]],npv:100,ppv:84,
  txt:`In the derivation study of the 1-hour hs-cTnT algorithm, 60% of the validation cohort were ruled out, 17% ruled in and 23% observed. NPV was 100% and PPV 84%. [[Reichlin2012]]`},
 tw19:{n:'Twerenbold 2019 · routine care',sz:'2,296 patients, NSTEMI prevalence 9.8%',bins:[['Rule-out',62],['Observe or rule-in',38]],mace:.2,
  txt:`Applied in routine care, the ESC 0/1-h algorithm triaged 62% of patients to rule-out. 30-day major adverse cardiac events were 0.2% in the rule-out group, and the median stay in the emergency department was 2 h 30 min. The split between observe and rule-in is not given here. [[Twerenbold2019]]`}
};
inits.troponin=()=>{
  const svg=$('#trSvg'),rg=$('#trT');let ass='hs',sex='f',size='big';
  const scale=()=>size==='big'?1:.018,thrNow=()=>ass==='conv'?TR_THR.conv:TR_THR[sex];
  const valAt=(C,u)=>Math.max(2,C.f(u)*scale()+(size==='big'?0:2*(1-scale())));
  function cross(C,thr){for(let i=0;i<=600;i++){const u=i/600;if(valAt(C,u)>thr)return u}return null}
  const fmt=v=>v>=100?Math.round(v).toLocaleString('en-GB'):v>=10?v.toFixed(0):v.toFixed(1);
  function draw(t){
    const N=vb(svg,'720 380','400 520'),h=trH(t),thr=thrNow();
    const L=N?{px:50,py:30,pw:336,ph:290,hx:78,hy:440,hs:.46,tx:168,ty:396,tw:66}:{px:62,py:30,pw:440,ph:270,hx:618,hy:86,hs:.5,tx:540,ty:196,tw:58};
    const pts=TR_PTS.map(p=>[trU(p[0]),p[1]]);
    const C0=tropCurve(L.px,L.py,L.pw,L.ph,pts,{x0:0,x1:1,y0:1,y1:5000,log:true,upto:0});
    const X=C0.X,Y=v=>C0.Y(Math.max(1,v));
    let s=C0.svg;
    /* very-low band and thresholds */
    s+=`<rect x="${L.px}" y="${f1(Y(TR_THR.low))}" width="${L.pw}" height="${f1(L.py+L.ph-Y(TR_THR.low))}" style="fill:var(--good-soft);opacity:.8"/><text x="${L.px+6}" y="${f1(L.py+L.ph-6)}" class="t-xs tr-halo" style="fill:var(--good)">&lt;5 ng/L: very low at arrival (hs-cTnI)</text>`;
    [1,5,10,50,100,500,1000,5000].forEach(v=>s+=`<line x1="${L.px}" x2="${L.px+L.pw}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${L.px-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v>=1000?v/1000+'k':v}</text>`);
    s+=`<text x="${L.px-40}" y="${L.py-12}" class="t-xs">ng/L (log scale)</text>`;
    [[0,'0 h'],[1,'1'],[3,'3'],[6,'6'],[12,'12'],[24,'24 h'],[48,'2 d'],[72,'3 d'],[120,'5 d'],[168,'7 d']].forEach(([hh,l])=>{if(N&&(hh===6||hh===48))return;const xx=X(trU(hh));s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${L.py+L.ph}" y2="${L.py+L.ph+4}" class="axis"/><text x="${f1(xx)}" y="${L.py+L.ph+15}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${L.px+L.pw}" y="${L.py+L.ph+29}" class="t-xs t-end">time since symptoms began (stretched at the start)</text>`;
    const lines=[[TR_THR.f,'99th percentile, women · 16',ass==='hs'&&sex==='f'],[TR_THR.m,'99th percentile, men · 34',ass==='hs'&&sex==='m'],[TR_THR.conv,'contemporary assay, all · 50',ass==='conv']];
    lines.forEach(([v,l,on],i)=>{const yy=Y(v);s+=`<line x1="${L.px}" x2="${L.px+L.pw}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${on?'var(--bad)':'var(--muted)'};stroke-width:${on?1.8:1};stroke-dasharray:${on?'6 4':'2 4'};opacity:${on?1:.7}"/>`;
      s+=`<text x="${L.px+L.pw-4}" y="${f1(yy+(i===2?-4:i===1?-4:11))}" class="t-xs t-end tr-halo" style="fill:${on?'var(--bad)':'var(--muted)'};font-weight:${on?700:500}">${l} ng/L</text>`});
    /* the curve, below the active threshold lighter */
    const N2=220,up=t;let dLo='',dHi='',prevHi=null;
    for(let i=0;i<=N2;i++){const u=up*i/N2,v=valAt(C0,u),xx=X(u),yy=Y(v),hi=v>thr;
      if(hi){dHi+=(prevHi===true?'L':'M')+f1(xx)+' '+f1(yy)}else{dLo+=(prevHi===false?'L':'M')+f1(xx)+' '+f1(yy)}
      if(prevHi!==null&&hi!==prevHi){if(hi)dLo+='L'+f1(xx)+' '+f1(yy);else dHi+='L'+f1(xx)+' '+f1(yy)}
      prevHi=hi}
    if(up>0){s+=`<path d="${dLo}" style="fill:none;stroke:var(--trop);stroke-width:2.2;stroke-dasharray:4 3;opacity:.55"/><path d="${dHi}" style="fill:none;stroke:var(--trop);stroke-width:3;stroke-linejoin:round"/>`}
    const vNow=valAt(C0,t),pen=[X(t),Y(vNow)];
    s+=`<circle cx="${f1(pen[0])}" cy="${f1(pen[1])}" r="5.5" style="fill:var(--trop);stroke:var(--panel);stroke-width:2"/>`;
    /* first crossing of the active threshold */
    const cu=cross(C0,thr);
    if(cu!=null&&t>=cu){const xx=X(cu),hh=trH(cu);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${L.py}" y2="${L.py+L.ph}" style="stroke:var(--bad);stroke-width:1;stroke-dasharray:2 3"/><text x="${f1(xx+4)}" y="${L.py+12}" class="t-xs tr-halo" style="fill:var(--bad);font-weight:700">above threshold at ≈${hh<10?hh.toFixed(1):Math.round(hh)} h</text>`}
    else if(cu==null&&t>.6)s+=`<text x="${L.px+L.pw/2}" y="${L.py+14}" class="t-xs t-mid tr-halo" style="fill:var(--bad);font-weight:700">never above ${thr} ng/L in this illustration</text>`;
    /* heart releasing troponin while the curve is rising */
    const rate=clamp((valAt(C0,Math.min(1,t+.01))-valAt(C0,Math.max(0,t-.01)))/Math.max(1,vNow)*6),inj=ramp(h,0,12)*(size==='big'?1.6:1.05);
    const H=heart(L.hx,L.hy,L.hs,{terr:{lad:inj},occl:{a:'lad',at:.25,v:ramp(h,0,.2)},id:'trHeart'});s+=H.svg;
    const R=rng(11);for(let i=0;i<Math.round(rate*14);i++){const a=R()*Math.PI*2,d=(R()+t*40)%1,cx=H.at.lv[0]+Math.cos(a)*(10+d*44*L.hs*2),cy=H.at.lv[1]+Math.sin(a)*(8+d*34*L.hs*2);s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.2" style="fill:var(--trop);opacity:${f1(1-d)}"/>`}
    s+=`<text x="${L.hx}" y="${f1(L.hy+L.hs*112)}" class="t-xs t-mid">${rate>.05?'troponin leaking out':'release slowing'}</text>`;
    /* sample tubes at 0, 1 and 3 h */
    s+=`<text x="${L.tx}" y="${L.ty-26}" class="t-sm">BLOOD SAMPLES</text>`;
    [[0,'0 h'],[1,'1 h'],[3,'3 h']].forEach(([sh,l],i)=>{const x=L.tx+i*L.tw,y=L.ty-14,taken=h>=sh,v=valAt(C0,trU(sh)),hi=v>thr;
      s+=`<rect x="${x+10}" y="${y}" width="18" height="56" rx="8" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><rect x="${x+9}" y="${y-6}" width="20" height="9" rx="2" style="fill:${hi&&taken?'var(--bad)':'var(--trop)'}"/>`;
      if(taken)s+=`<rect x="${x+12}" y="${y+14}" width="14" height="40" rx="6" style="fill:var(--trop);opacity:${f1(.25+.6*clamp(Math.log10(v)/3.4))}"/>`;
      s+=`<text x="${x+19}" y="${y+70}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${l}</text><text x="${x+19}" y="${y+83}" class="t-xs t-mid">${taken?fmt(v):'–'}</text>`});
    if(h>=1){const d=valAt(C0,trU(1))-valAt(C0,0);s+=`<text x="${L.tx}" y="${L.ty+88}" class="t-xs" style="fill:var(--ink)">change 0→1 h: ${d>=0?'+':''}${fmt(d)} ng/L</text>`}
    svg.innerHTML=s;
    const ph=phaseOf(TR_STEPS,t);setSt(ph);
    const hTxt=h<1?Math.round(h*60)+' min':h<48?h.toFixed(h<10?1:0)+' h':(h/24).toFixed(1)+' days';
    rg.setAttribute('aria-valuetext',`${hTxt}: about ${fmt(vNow)} ng/L in this illustration`);
    $('#trRead').innerHTML=`<span>time <b>${hTxt}</b></span><span>illustrative level <b>${fmt(vNow)} ng/L</b></span><span>threshold <b>${thr} ng/L</b> (${ass==='conv'?'contemporary assay':sex==='f'?'women':'men'})</span><span>${vNow>thr?'<b>above</b> the threshold':'at or below the threshold'}</span>`;
    let extra='';
    if(size==='small')extra+=`<div><dt>A smaller infarct</dt><dd>In a Scottish emergency department study, sex-specific hs-cTnI thresholds (16 ng/L women, 34 ng/L men) reclassified 30% of women and 5% of men with type 1 MI whom a contemporary assay with a uniform ≥50 ng/L threshold had missed. [[Ferry2019]] Try both assays with the smaller infarct.</dd></div>`;
    if(ass==='conv')extra+=`<div><dt>One threshold for everyone</dt><dd>The contemporary assay line is the uniform ≥50 ng/L threshold described in that study. [[Ferry2019]] UDMI4 recommends sex-specific 99th percentiles for hs assays. [[Thygesen2018UDMI4C]]</dd></div>`;
    $('#trNote').innerHTML=noteHTML(TR_STEPS[ph])+(extra?`<div class="kv">${extra}</div>`:'');
  }
  const stop=playWire(rg,$('#trPlay'),draw,22000,'%t:player.replay%','troponin');
  const setSt=stepWire($('#trSteps'),TR_STEPS,rg,draw,stop);
  const seg=(attr,set)=>$$(`[${attr}]`).forEach(b=>b.addEventListener('click',()=>{set(b.getAttribute(attr));$$(`[${attr}]`).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  seg('data-trass',v=>ass=v);seg('data-trsex',v=>sex=v);seg('data-trsize',v=>size=v);
  draw(+rg.value);

  /* ---- the 0/1-hour algorithm ---- */
  const as=$('#trAlg'),ar=$('#trAlgT');let co='r15';
  const ORD=(()=>{const r=rng(5),a=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  function counts(C){const raw=C.bins.map(b=>b[1]),n=raw.map(Math.floor);let left=100-n.reduce((a,b)=>a+b,0);
    raw.map((v,i)=>[v-Math.floor(v),i]).sort((a,b)=>b[0]-a[0]).forEach(([,i])=>{if(left>0){n[i]++;left--}});return n}
  function drawA(t){
    const N=vb(as,'720 310','400 350'),C=TR_CO[co],n=counts(C),nb=n.length;
    const W=N?400:720,top=N?{y:12,h:50}:{y:12,h:46},grid={y:N?76:70,cols:20,sz:N?7:8,gap:N?4:5},binY=N?200:162,binH=N?130:136,ds=N?8:10,dg=N?3:4,bc=N?10:10;
    const bw=(W-20-(nb-1)*10)/nb,bx=i=>10+i*(bw+10);
    let s=`<defs>${marker('trArr','var(--muted)')}</defs>`;
    s+=`<rect x="${W/2-(N?180:230)}" y="${top.y}" width="${N?360:460}" height="${top.h}" rx="10" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${W/2}" y="${top.y+19}" class="t-lbl t-mid" style="font-size:${N?11.5:13}px">Suspected NSTEMI in the emergency department</text><text x="${W/2}" y="${top.y+36}" class="t-xs t-mid">hs-troponin at 0 h and 1 h, read with the ECG and history</text>`;
    s+=`<text x="${W/2}" y="${binY-10}" class="t-xs t-mid tr-halo">${C.n} · ${C.sz}</text>`;
    C.bins.forEach((b,k)=>{s+=`<path d="M${W/2} ${top.y+top.h}C${W/2} ${binY-60} ${f1(bx(k)+bw/2)} ${binY-70} ${f1(bx(k)+bw/2)} ${binY-24}" style="fill:none;stroke:var(--line);stroke-width:${N?6:8};stroke-linecap:round;opacity:.7"/>`});
    /* bins */
    const col=k=>/^Rule-out/.test(C.bins[k][0])?'var(--good)':/^Rule-in/.test(C.bins[k][0])?'var(--bad)':'var(--warn)';
    const soft=k=>/^Rule-out/.test(C.bins[k][0])?'var(--good-soft)':/^Rule-in/.test(C.bins[k][0])?'var(--bad-soft)':'var(--warn-soft)';
    C.bins.forEach((b,k)=>{s+=`<rect x="${f1(bx(k))}" y="${binY}" width="${f1(bw)}" height="${binH}" rx="10" style="fill:${soft(k)};stroke:${col(k)};stroke-width:1.4"/>`;
      s+=`<text x="${f1(bx(k)+10)}" y="${binY+18}" class="t-lbl" style="fill:${col(k)};font-size:${N?11.5:13}px">${b[0]}</text><text x="${f1(bx(k)+bw-10)}" y="${binY+18}" class="t-lbl t-end" style="fill:${col(k)};font-size:${N?11.5:13}px">${b[1]}%</text>`;
      const sub=/^Rule-out/.test(b[0])?(C.npv!=null?`NPV ${C.npv}%`:`30-day MACE ${C.mace}%`):/^Rule-in/.test(b[0])?`PPV ${C.ppv}%`:/^Observe$/.test(b[0])?(C.obs!=null?`MI in this zone ${C.obs}%`:'3rd test at 3 h ± echo'):'split not shown';
      s+=`<text x="${f1(bx(k)+10)}" y="${binY+32}" class="t-xs" style="fill:var(--ink)">${sub}</text>`});
    /* dots: start in the arrival grid, fall into their bin */
    const start=i=>{const gw=grid.cols*(grid.sz+grid.gap);return[W/2-gw/2+(i%grid.cols)*(grid.sz+grid.gap)+grid.sz/2,grid.y+Math.floor(i/grid.cols)*(grid.sz+grid.gap)+grid.sz/2]};
    const cumul=[0];n.forEach((v,i)=>cumul.push(cumul[i]+v));
    const binOf=i=>{for(let k=0;k<nb;k++)if(i<cumul[k+1])return k;return nb-1};
    const land=(k,j)=>{const cw=bc*(ds+dg)-dg,x0=bx(k)+(bw-cw)/2;return[x0+(j%bc)*(ds+dg)+ds/2,binY+44+Math.floor(j/bc)*(ds+dg)+ds/2]};
    let done=0;
    for(let i=0;i<100;i++){const k=binOf(i),j=i-cumul[k],o=ORD.indexOf(i),d=o/100*.62,p=ease(ramp(t,d,d+.3)),a=start(o),b=land(k,j),cx=lerp(a[0],b[0],.5),cy=binY-30;
      const x=(1-p)*(1-p)*a[0]+2*(1-p)*p*cx+p*p*b[0],y=(1-p)*(1-p)*a[1]+2*(1-p)*p*cy+p*p*b[1];if(p>=1)done++;
      const lab=C.bins[k][0];let fill='var(--muted)';
      if(p>=1&&t>.9){const mi=(/^Rule-in/.test(lab)&&j<Math.round(n[k]*C.ppv/100))||(/^Observe$/.test(lab)&&C.obs!=null&&j<Math.round(n[k]*C.obs/100))||(/^Rule-out/.test(lab)&&C.npv!=null&&j<Math.round(n[k]*(100-C.npv)/100));
        fill=mi?col(k):'var(--panel)'}
      const stroke=p>=1?col(k):'var(--muted)';
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(ds/2)}" style="fill:${fill};stroke:${stroke};stroke-width:1.3"/>`}
    if(t>.9){const lx=10,ly=binY+binH+(N?0:0);void lx;void ly}
    as.innerHTML=s;
    const ph=t<.92?0:1;
    $('#trAlgNote').innerHTML=noteHTML(ph===0?{k:`${done} of 100 sorted`,t:'Three boxes, not two',txt:`The ESC 0 h/1 h algorithm sorts people by the troponin value at arrival and its change after 1 hour. Across several large validation cohorts, rule-out has had an NPV above 99% and rule-in a PPV of about 70–75%. Those who fit neither are "observed" with a third troponin at 3 h, with or without echocardiography. [[Byrne2023ESC]]`,
        pt:`Most people with chest pain who come to hospital are not having a heart attack. Two blood tests an hour apart can show this safely for many of them, so they can go home sooner.`,
        hook:`0/1-h: rule-out NPV >99%, rule-in PPV ≈70–75%; the rest observe with a 3-h sample. [[Byrne2023ESC]]`}
      :{k:C.n,t:'Where the 100 ended up',txt:C.txt+(C.ppv!=null?` Filled dots in the rule-in box: ${Math.round(n[nb-1]*C.ppv/100)} of ${n[nb-1]} had an MI.`:'')+(C.npv!=null?` In the rule-out box, about ${f1(n[0]*(100-C.npv)/100)} of ${n[0]} had an MI (rounded to whole dots).`:''),
        pt:`"Ruled out" means a very low chance of a heart attack in research groups, not zero. Anyone whose symptoms come back or change should seek help again.`,
        hook:`The very-low single 0 h rule-out applies only if chest pain began more than 3 h before the sample. [[Byrne2023ESC]]`});
  }
  playWire(ar,$('#trAlgPlay'),drawA,9000,'%t:player.replay%','troponin');
  $$('[data-trco]').forEach(b=>b.addEventListener('click',()=>{co=b.dataset.trco;$$('[data-trco]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawA(+ar.value)}));
  drawA(+ar.value);

  /* ---- injury vs infarction ---- */
  const ts=$('#trTree');
  const EVS=['trE1','trE2','trE3','trE4','trE5'];
  const LEAF={
   none:{t:'No myocardial injury',c:'no',txt:`No value is above the 99th percentile URL, so by UDMI4 there is no myocardial injury. [[Thygesen2018UDMI4C]] Early in a heart attack troponin may not have risen yet, which is why serial samples are taken. [[Thygesen2018UDMI4C]]`},
   chronic:{t:'Chronic myocardial injury',c:'maybe',txt:`Raised but stable values, without a rise and/or fall, are chronic myocardial injury. [[Domienik2021UDMI4]] Causes include heart failure and kidney disease. [[Thygesen2018UDMI4C]] In South Australian emergency episodes, 14.79% had chronic injury. [[Chuang2021Injury]]`},
   acute:{t:'Acute myocardial injury (not MI)',c:'maybe',txt:`A rise and/or fall above the 99th percentile is acute myocardial injury. Without clinical evidence of acute ischaemia it is called myocardial injury, not MI. [[Thygesen2018UDMI4C,Domienik2021UDMI4]] Causes include myocarditis, sepsis and takotsubo syndrome. [[Byrne2023ESC]]`},
   t1:{t:'Type 1 MI',c:'yes',txt:`UDMI4 type 1 MI: "Detection of a rise and/or fall of cTn values with at least one value above the 99th percentile URL" plus at least one ischaemic criterion, caused by acute atherothrombosis (plaque rupture or erosion). [[Thygesen2018UDMI4C]] Among 2,122 Edinburgh patients with raised troponin I, 55.2% had type 1 MI. [[Chapman2018Type2]]`},
   t2:{t:'Type 2 MI',c:'yes',txt:`UDMI4 type 2 MI requires "evidence of an imbalance between myocardial oxygen supply and demand unrelated to acute coronary athero-thrombosis," plus the troponin rise and/or fall and at least one ischaemic criterion. [[Thygesen2018UDMI4C]] Mechanisms include coronary spasm, embolism or dissection, sustained tachyarrhythmia, severe hypotension or shock, respiratory failure and severe anaemia. [[Domienik2021UDMI4,DeFilippis2019Type2]]`},
   tbd:{t:'MI: type still to be decided',c:'yes',txt:`The criteria for MI are met (a rise and/or fall above the 99th percentile with evidence of acute ischaemia), but whether it is type 1 (atherothrombosis) or type 2 (supply–demand imbalance) depends on further assessment, often angiography. [[Thygesen2018UDMI4C]]`},
   t4a:{t:'Type 4a MI (PCI-related)',c:'yes',txt:`UDMI4 type 4a MI requires cTn &gt;5 times the 99th percentile URL after PCI, from a normal baseline, plus a clinical criterion, within 48 h. [[Thygesen2018UDMI4C,Domienik2021UDMI4]]`},
   t5:{t:'Type 5 MI (CABG-related)',c:'yes',txt:`UDMI4 type 5 MI requires cTn &gt;10 times the 99th percentile URL within 48 h of CABG, from a normal baseline, plus the other criteria. [[Thygesen2018UDMI4C]]`},
   proc:{t:'Procedural myocardial injury, below the MI threshold',c:'maybe',txt:`After PCI the MI threshold is &gt;5 times the URL, after CABG &gt;10 times, each with a clinical criterion. A smaller rise, or one without ischaemic evidence, is procedural myocardial injury. [[Thygesen2018UDMI4C,Domienik2021UDMI4]]`}};
  function classify(){
    const pat=$('#trPat').value,mech=$('#trMech').value,ctx=$('#trCtx').value,mul=+$('#trMul').value,ev=EVS.map(id=>$('#'+id).checked),any=ev.some(Boolean);
    if(pat==='none')return{leaf:'none',path:['q1']};
    if(pat==='stable')return{leaf:'chronic',path:['q1','q2']};
    if(!any&&ctx==='none')return{leaf:'acute',path:['q1','q2','q3']};
    if(ctx==='pci')return{leaf:mul>5&&any?'t4a':'proc',path:['q1','q2','q3','q4']};
    if(ctx==='cabg')return{leaf:mul>10&&any?'t5':'proc',path:['q1','q2','q3','q4']};
    if(ev[4]||mech==='athero')return{leaf:'t1',path:['q1','q2','q3','q4'],thr:ev[4]&&mech!=='athero'};
    return{leaf:mech==='imb'?'t2':'tbd',path:['q1','q2','q3','q4']};
  }
  function drawT(){
    const N=vb(ts,'720 270','400 450'),R=classify(),ctx=$('#trCtx').value;
    $('#trMulV').textContent=(+$('#trMul').value).toFixed(1).replace('.0','');
    const Q=[['q1','Any value above the','99th percentile?','none','No → no injury'],['q2','Rising and/or','falling?','chronic','No → chronic injury'],['q3','Evidence of acute','ischaemia?','acute','No → acute injury, not MI'],['q4',ctx==='none'?'Mechanism:':'Above the procedure',ctx==='none'?'type 1 or type 2?':'threshold?',null,null]];
    const finals=ctx==='none'?[['t1','Type 1 MI'],['t2','Type 2 MI'],['tbd','MI, type to decide']]:[[ctx==='pci'?'t4a':'t5',ctx==='pci'?'Type 4a MI (>5×)':'Type 5 MI (>10×)'],['proc','Procedural injury']];
    const qw=N?180:150,qh=46,lw=N?180:150,lh=30;
    const qp=i=>N?[10,10+i*78]:[10+i*178,14],lp=i=>N?[210,18+i*78]:[10+i*178,110],fp=j=>N?[10+(j%2)*196,330+Math.floor(j/2)*44]:[548,96+j*44];
    let s=`<defs>${marker('trTa','var(--muted)')}${marker('trTb','var(--dx)')}</defs>`;
    const box=(x,y,w,h,on,fin,l1,l2)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="8" style="fill:${fin?'var(--dx)':on?'var(--dx-soft)':'var(--panel-2)'};stroke:${on||fin?'var(--dx)':'var(--line)'};stroke-width:${on||fin?2:1}"/>`+(l2?`<text x="${f1(x+w/2)}" y="${f1(y+h/2-3)}" class="t-xs t-mid" style="fill:${fin?'var(--on-brand)':'var(--ink)'};font-weight:700">${l1}</text><text x="${f1(x+w/2)}" y="${f1(y+h/2+10)}" class="t-xs t-mid" style="fill:${fin?'var(--on-brand)':'var(--ink)'};font-weight:700">${l2}</text>`:`<text x="${f1(x+w/2)}" y="${f1(y+h/2+3.5)}" class="t-xs t-mid" style="fill:${fin?'var(--on-brand)':'var(--ink)'};font-weight:700">${l1}</text>`);
    const arr=(x1,y1,x2,y2,on)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="fill:none;stroke:${on?'var(--dx)':'var(--muted)'};stroke-width:${on?2:1.2}" marker-end="url(#${on?'trTb':'trTa'})"/>`;
    Q.forEach((q,i)=>{const [x,y]=qp(i),on=R.path.includes(q[0]);s+=box(x,y,qw,qh,on,false,q[1],q[2]);
      if(i<3){const nx=qp(i+1),yes=R.path.includes(Q[i+1][0]);
        s+=N?arr(x+qw/2,y+qh,nx[0]+qw/2,nx[1]-2,yes):arr(x+qw,y+qh/2,nx[0]-2,nx[1]+qh/2,yes);
        s+=`<text x="${f1(N?x+qw/2+6:x+qw+8)}" y="${f1(N?y+qh+16:y+qh/2-5)}" class="t-xs tr-halo" style="fill:var(--dx)">yes</text>`;
        const [lx,ly]=lp(i),lon=R.leaf===q[3];s+=(N?arr(x+qw,y+qh/2,lx-2,ly+lh/2,lon):arr(x+qw/2,y+qh,lx+lw/2,ly-2,lon))+box(lx,ly,lw,lh,false,lon,q[4])}});
    const q4=qp(3);finals.forEach((f,j)=>{const [x,y]=fp(j);s+=arr(q4[0]+qw/2,q4[1]+qh,x+(N?93:75),y-2,R.leaf===f[0])});
    finals.forEach((f,j)=>{const [x,y]=fp(j);s+=box(x,y,N?186:150,32,false,R.leaf===f[0],f[1])});
    if(!N)s+=`<text x="10" y="${262}" class="t-xs">Type 3 MI (cardiac death before troponin can be measured) sits outside this path.</text>`;
    ts.innerHTML=s;
    const Lf=LEAF[R.leaf],V=$('#trVerdict');V.className='verdict '+Lf.c;V.textContent=Lf.t;
    $('#trTreeNote').innerHTML=noteHTML({k:'UDMI4 category',t:Lf.t,txt:Lf.txt+(R.thr?' A coronary thrombus points to atherothrombosis, so the path goes to type 1.':''),
      pt:`A raised troponin means some heart muscle has been damaged. Only when there are also signs that it was starved of oxygen is it called a heart attack.`,
      hook:`Type 2 MI = supply–demand imbalance without acute atherothrombosis. Type 4a needs cTn >5× URL, type 5 >10×. [[Thygesen2018UDMI4C]]`})
      +`<div class="kv"><div><dt>Type 3 MI</dt><dd>Cardiac death with symptoms suggesting ischaemia and presumed new ischaemic ECG changes or ventricular fibrillation, before biomarkers can be obtained. [[Thygesen2018UDMI4C]]</dd></div><div><dt>Outcomes (population figures)</dt><dd>5-year death: 36.7% after type 1 MI, 62.5% after type 2 MI, 72.4% after myocardial injury. [[Chapman2018Type2]]</dd></div></div>`;
  }
  ['trPat','trMech','trCtx','trMul',...EVS].forEach(id=>{const el=$('#'+id);el.addEventListener('input',drawT);el.addEventListener('change',drawT)});
  drawT();
  const prevR=redraws.troponin;redraws.troponin=()=>{prevR&&prevR();drawT()};
};
