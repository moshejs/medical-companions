
/* =============== 1.3 crystals vs serum urate =============== */
const CR_STEPS=[
 {from:0,at:.06,k:'Years 0–4',t:'Above saturation: nucleation',
  txt:'Plasma is saturated with urate at about 6.8 mg/dL (405 µmol/L) [[Martillo2014]]. Above that point urate can leave solution in three stages: solubility, then nucleation, then growth. A high urate concentration drives all three, and no other factor was found to promote growth specifically [[Chhana2015]]. Crystals deposit preferentially at the first MTP, the femoral condyle and the Achilles and patellar tendons [[Chhana2015]].',
  pt:'When there is more urate than the joint fluid can hold, tiny needle-shaped crystals start to form on the cartilage.',
  hook:'Urate saturation is about <b>6.8 mg/dL</b> (405 µmol/L) at 37 °C, and about 6.0 mg/dL at 35 °C [[Martillo2014]].'},
 {from:.27,at:.36,k:'Years 4–6',t:'Silent growth',
  txt:'Deposits can build with no symptoms. Dual-energy CT of the feet found urate in 6 of 25 (24%) asymptomatic people with urate ≥ 540 µmol/L (≈ 9.1 mg/dL) [[Dalbeth2015]]. On ultrasound, 25% of first MTPs in asymptomatic hyperuricaemic people had a double-contour sign, a crust of crystals on the cartilage, against none in normouricaemic controls [[Pineda2011]]. This is the asymptomatic MSU crystal deposition stage; "gout" is kept for disease that has shown itself as a flare, chronic gouty arthritis or a tophus [[Bursill2019ARD]].',
  pt:'Crystals can pile up for years before the first painful flare. A scan may show them even when nothing hurts.',
  hook:'Deposition without symptoms is <b>not yet gout</b>. G-CAN calls it asymptomatic MSU crystal deposition [[Bursill2019ARD]].'},
 {from:.44,at:.458,k:'Year 7',t:'Shedding sets off a flare',
  txt:'A big deposit alone does not cause a flare: people with tophi do not necessarily have flares [[Joosten2010]]. Crystals have to meet primed immune cells (see <a href="#flare" data-go="flare">A flare, hour by hour</a>). Flares are 2.36 times as likely to start overnight as in the daytime [[Choi2015]]. Serum urate often falls during a flare: in one study it was 7.5 ± 1.4 mg/dL during flares against 8.5 ± 0.9 mg/dL between them, and normal in 20 of 41 people (49%) [[Urano2002]]. The dip in the gold trace shows this.',
  pt:'One day some crystals come loose and the joint flares. Your blood urate may even look normal that day.',
  hook:'A normal serum urate during a flare does not rule out gout. The criteria prefer a level taken more than 4 weeks after the flare began [[Urano2002,Neogi2015]].'},
 {from:.6,at:.66,k:'Year 9 onward',t:'Urate below 6: crystals dissolve',
  txt:'EULAR 2016 sets a target below 6 mg/dL (360 µmol/L), or below 5 mg/dL (300 µmol/L) in severe gout [[Richette2017]], and ACR 2020 strongly recommends treating to below 6 mg/dL [[FitzGerald2020]]. A target under saturation keeps the concentration gradient in favour of dissolution [[Martillo2014,Richette2017]]. In 63 people with tophaceous gout, tophi shrank faster the lower the mean urate on treatment, in a straight-line relation. Benzbromarone and allopurinol worked equally well once they reached the same urate [[PerezRuiz2002]]. Flares often rise in the first months: the US allopurinol label puts this down to urate mobilised from tissue deposits [[FDA-Zyloprim]], and crystals shed from shrinking deposits is one proposed reason <span class="ev hyp">Hypothesis</span> [[Martillo2014]].',
  pt:'Medicine pulls urate under the line, so the crystals slowly melt. Flares can pick up for a few months while that starts.',
  hook:'The target (&lt; 6 mg/dL) sits <b>below</b> saturation (6.8 mg/dL), so the gradient favours dissolution. Lower urate, faster tophus shrinkage [[Martillo2014,PerezRuiz2002]].'},
 {from:.8,at:.97,k:'Years 12–15',t:'Crystal-free if urate stays low',
  txt:'In 18 joints aspirated every 3 months on treatment, crystals disappeared from all 18 after 3 to 33 months, and the time tracked gout duration [[Pascual2007]]. Some crystals linger: 7 of 16 knees (44%) still held them after more than 12 months at ≤ 6 mg/dL [[LiYu2001]]. Sustained urate lowering dissolves crystals and so prevents flares and tophi [[Dalbeth2021]]. Stopping treatment lets the urate pool rebuild, and ACR 2020 conditionally recommends continuing urate-lowering therapy indefinitely [[FitzGerald2020]].',
  pt:'If urate stays low long enough, the crystals can go completely and the flares stop. Stop the medicine and urate climbs back.',
  hook:'Crystal clearance takes <b>months to years</b>, longer with longer disease [[Pascual2007]]. That is why gout treatment is long-term.'}
];
const CR_HR=[['< 6',1],['6.0–6.9',2.7],['7.0–7.9',6.6],['8.0–8.9',15],['9.0–9.9',30],['≥ 10',64]];
inits.crystals=()=>{
  const svg=$('#crSvg'),rg=$('#crT');
  let ut=5,temp=37;
  const YRS=15,DT=.01,NS=Math.round(YRS/DT),ULT0=9,PRE=[6.8,8.2],POST=[9.5,11,12.6,14.2];
  const mmol=v=>v===6.8?405:v===6?357:Math.round(v*59.48);
  /* needles: a crust on both cartilage surfaces (the double contour) and a tophus at the joint edge */
  const r=rng(1313);const ND=[];
  for(let i=0;i<54;i++){const top=i%2===0;ND.push({x:.06+r()*.6,y:top?.262+r()*.02:.738-r()*.02,a:(r()-.5)*24,l:.7+r()*.4,k:r()*.55})}
  for(let i=0;i<86;i++){const a=r()*Math.PI*2,d=Math.sqrt(r());ND.push({x:.8+Math.cos(a)*d*.12,y:.5+Math.sin(a)*d*.2,a:r()*180,l:.7+r()*.5,k:.2+r()*.8})}
  ND.sort((p,q)=>p.k-q.k);
  const SH=Array.from({length:10},()=>({x:.12+r()*.55,y:.34+r()*.32,a:r()*180,ph:r()}));
  const NE=Array.from({length:5},()=>({x:.15+r()*.5,y:.36+r()*.28,ph:r()}));
  function sim(){const S=temp===37?6.8:6.0,U=[],M=[];let m=0,nuc=0;
    for(let i=0;i<=NS;i++){const y=i*DT;
      let u=7+1.6*ease(ramp(y,0,3))+.25*Math.sin(1.7*y)+.15*Math.sin(4.3*y+1);
      PRE.forEach(f=>{u-=1.0*bump(y,f-.25,f+.3)});
      if(ut!=null)u=lerp(u,ut,ease(ramp(y,ULT0,ULT0+.8)));
      U.push(u);
      if(i){const ex=u-S;if(ex>0){nuc+=ex*DT;if(nuc>.8)m+=.05*ex*DT}else if(m>0)m+=.13*ex*DT;m=clamp(m)}
      M.push(m)}
    const fl=PRE.slice();POST.forEach(f=>{const mm=M[Math.round(f/DT)];if(f===9.5&&ut!=null?mm>.2:mm>.45)fl.push(f)});
    let clear=null;for(let i=Math.round(ULT0/DT);i<=NS;i++)if(M[i]<=0){clear=i*DT;break}
    let full=null;for(let i=0;i<=NS;i++)if(M[i]>=1){full=i*DT;break}
    return{S,U,M,fl,clear,full}}
  let R=sim();
  function draw(t){
    const N=vb(svg,'720 430','400 740');
    const L=N?{tx:16,ty:14,tw:368,th:212,gx:16,gy:252,gw:368,sx0:56,sx1:384,sy0:306,sy1:384,cx0:46,cx1:388,uy:428,uh:132,fy:584,my:606,mh:66,ay:690,cap:730}
             :{tx:16,ty:22,tw:252,th:216,gx:16,gy:262,gw:252,sx0:52,sx1:266,sy0:316,sy1:388,cx0:330,cx1:704,uy:24,uh:180,fy:226,my:250,mh:80,ay:348,cap:420};
    const y=t*YRS,i=Math.min(NS,Math.round(y/DT)),u=R.U[i],m=R.M[i],S=R.S,ex=u-S;
    const fl=Math.max(0,...R.fl.map(f=>bump(y,f-.18,f+.22)));
    let s=`<defs>${marker('crA')}</defs>`;
    /* ---- joint tank ---- */
    const {tx,ty,tw,th}=L,X=v=>tx+tw*v,Yt=v=>ty+th*v;
    s+=`<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="14" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<rect x="${tx}" y="${ty}" width="${tw}" height="${f1(th*.17)}" rx="12" style="fill:var(--panel-2);stroke:var(--memb);stroke-width:1.2"/><rect x="${tx}" y="${f1(Yt(.83))}" width="${tw}" height="${f1(th*.17)}" rx="12" style="fill:var(--panel-2);stroke:var(--memb);stroke-width:1.2"/>`;
    s+=`<text x="${tx+10}" y="${f1(Yt(.1)+3)}" class="t-xs">BONE</text><text x="${tx+10}" y="${f1(Yt(.93)+3)}" class="t-xs">BONE</text>`;
    s+=`<rect x="${tx}" y="${f1(Yt(.17))}" width="${tw}" height="${f1(th*.08)}" style="fill:var(--panel);stroke:var(--memb);stroke-width:1"/><rect x="${tx}" y="${f1(Yt(.75))}" width="${tw}" height="${f1(th*.08)}" style="fill:var(--panel);stroke:var(--memb);stroke-width:1"/>`;
    s+=`<text x="${f1(X(.69))}" y="${f1(Yt(.225)+3)}" class="t-xs t-end">cartilage</text>`;
    // joint fluid tinted by urate concentration
    s+=`<rect x="${tx}" y="${f1(Yt(.25))}" width="${tw}" height="${f1(th*.5)}" style="fill:var(--gold-soft);opacity:${f1(clamp((u-2.5)/7))}"/>`;
    s+=`<rect x="${tx}" y="${f1(Yt(.25))}" width="${tw}" height="${f1(th*.5)}" style="fill:var(--terra);opacity:${(.22*fl).toFixed(2)}"/>`;
    s+=`<text x="${tx+10}" y="${f1(Yt(.5)+3)}" class="t-xs">joint fluid · ${f1(u)} mg/dL</text>`;
    // tophus outline grows with the deposit
    const tph=ramp(m,.3,.9);
    if(tph>0)s+=`<ellipse cx="${f1(X(.8))}" cy="${f1(Yt(.5))}" rx="${f1(tw*.14*(.5+.5*tph))}" ry="${f1(th*.22*(.5+.5*tph))}" style="fill:var(--xtal-soft);stroke:var(--xtal);stroke-width:1;stroke-dasharray:3 3;opacity:${f1(tph)}"/>`;
    // needles
    const nv=m*ND.length,nl=N?13:11;
    ND.forEach((n,k)=>{if(k>=nv)return;const o=clamp(nv-k);s+=needle(X(n.x),Yt(n.y),nl*n.l,n.a,o)});
    if(tph>.5)s+=`<text x="${f1(X(.8))}" y="${f1(Yt(.5)-th*.22*(.5+.5*tph)-4)}" class="t-xs t-mid" style="fill:var(--xtal)">tophus</text>`;
    if(m>.06)s+=`<text x="${f1(X(.4))}" y="${f1(Yt(.79)+3)}" class="t-xs t-mid" style="fill:var(--xtal)">${N?'crystal crust on cartilage (double contour)':'crystal crust (double contour)'}</text>`;
    // a flare: shed crystals and neutrophils
    if(fl>.02){SH.forEach(n=>{s+=needle(X(n.x)+Math.sin(y*40+n.ph*6)*3,Yt(n.y),nl,n.a+y*200,fl)});
      NE.forEach(n=>{s+=neutro(X(n.x)+Math.cos(y*30+n.ph*6)*4,Yt(n.y),N?10:8,fl)});
      s+=`<text x="${f1(X(.5))}" y="${f1(Yt(.1)+4)}" class="t-sm t-mid" style="fill:var(--terra);font-weight:700;opacity:${f1(fl)}">FLARE</text>`}
    // temperature badge
    s+=`<rect x="${f1(tx+tw-86)}" y="${ty+6}" width="80" height="20" rx="10" style="fill:var(--panel);stroke:${temp===37?'var(--line)':'var(--xtal)'}"/><text x="${f1(tx+tw-46)}" y="${ty+20}" class="t-xs t-mid" style="fill:${temp===37?'var(--muted)':'var(--xtal)'}">${temp} °C joint</text>`;
    const state=Math.abs(ex)<.05?['AT SATURATION · no net change','var(--muted)']:ex>0?['SUPERSATURATED · crystals can grow','var(--warn)']:['BELOW SATURATION · crystals dissolve','var(--sea)'];
    /* ---- gradient gauge ---- */
    const gc=L.gx+L.gw/2,gy=L.gy,gw=L.gw/2,gv=clamp(ex/3,-1,1);
    s+=`<text x="${L.gx}" y="${gy-6}" class="t-sm" style="fill:${state[1]}">${state[0]}</text>`;
    s+=`<rect x="${L.gx}" y="${gy}" width="${L.gw}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${f1(Math.min(gc,gc+gv*gw))}" y="${gy}" width="${f1(Math.abs(gv*gw))}" height="12" rx="3" style="fill:${ex>0?'var(--warn)':'var(--sea)'}"/>`;
    s+=`<line x1="${gc}" x2="${gc}" y1="${gy-3}" y2="${gy+15}" style="stroke:var(--xtal);stroke-width:2"/>`;
    s+=`<text x="${L.gx}" y="${gy+26}" class="t-xs" style="fill:var(--sea)">← dissolves</text><text x="${gc}" y="${gy+26}" class="t-xs t-mid" style="fill:var(--xtal)">saturation ${f1(S)}</text><text x="${L.gx+L.gw}" y="${gy+26}" class="t-xs t-end" style="fill:var(--warn)">grows →</text>`;
    /* ---- shrink speed vs on-treatment urate (Perez-Ruiz 2002: linear) ---- */
    const sx=v=>lerp(L.sx0,L.sx1,(v-3)/5),sy=v=>lerp(L.sy1,L.sy0,v/4);
    s+=`<text x="${L.gx}" y="${L.sy0-10}" class="t-xs">SHRINK SPEED vs URATE ON TREATMENT · relative</text>`;
    s+=`<line x1="${L.sx0}" x2="${L.sx1}" y1="${L.sy1}" y2="${L.sy1}" class="axis"/><line x1="${L.sx0}" x2="${L.sx0}" y1="${L.sy0}" y2="${L.sy1}" class="axis"/>`;
    [3,4,5,6,7,8].forEach(v=>s+=`<text x="${f1(sx(v))}" y="${L.sy1+12}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${L.sx0-4}" y="${L.sy0+8}" class="t-xs t-end">fast</text><text x="${L.sx0-4}" y="${L.sy1-2}" class="t-xs t-end">0</text>`;
    s+=`<line x1="${f1(sx(3))}" y1="${f1(sy(S-3))}" x2="${f1(sx(S))}" y2="${f1(sy(0))}" style="stroke:var(--sea);stroke-width:2.4"/><line x1="${f1(sx(S))}" y1="${f1(sy(0))}" x2="${f1(sx(8))}" y2="${f1(sy(0))}" style="stroke:var(--warn);stroke-width:2.4;stroke-dasharray:4 3"/>`;
    s+=`<text x="${f1(sx(7.4))}" y="${f1(sy(0)-5)}" class="t-xs t-mid" style="fill:var(--warn)">grows</text>`;
    if(ut!=null){const on=y>=ULT0;s+=`<circle cx="${f1(sx(ut))}" cy="${f1(sy(Math.max(0,S-ut)))}" r="5" style="fill:${on?'var(--sea)':'var(--panel)'};stroke:var(--sea);stroke-width:2"/>`}
    /* ---- urate trace ---- */
    const xy=v=>lerp(L.cx0,L.cx1,v/YRS),yv=v=>L.uy+L.uh-L.uh*(v-2)/9;
    s+=`<text x="${L.cx0}" y="${L.uy-8}" class="t-sm" style="fill:var(--gold)">SERUM URATE, mg/dL</text>`;
    s+=`<rect x="${L.cx0}" y="${f1(yv(6))}" width="${L.cx1-L.cx0}" height="${f1(yv(2)-yv(6))}" style="fill:var(--sea-soft);opacity:.8"/>`;
    s+=`<text x="${L.cx0+6}" y="${f1(yv(6)+13)}" class="t-xs" style="fill:var(--sea)">target &lt; 6 mg/dL (360 µmol/L)</text>`;
    [4,6,8,10].forEach(v=>s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${L.cx0-6}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}</text>`);
    const So=temp===37?6.0:6.8;
    s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(yv(So))}" y2="${f1(yv(So))}" style="stroke:var(--xtal);stroke-width:1;stroke-dasharray:2 4;opacity:.45"/>`;
    s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(yv(S))}" y2="${f1(yv(S))}" style="stroke:var(--xtal);stroke-width:1.8;stroke-dasharray:6 4"/>`;
    s+=`<text x="${L.cx1}" y="${f1(yv(S)-5)}" class="t-xs t-end" style="fill:var(--xtal)">saturation ${f1(S)} mg/dL (${mmol(S)} µmol/L) at ${temp} °C</text>`;
    let gd='',cd='';for(let k=0;k<=NS;k+=5){const p=f1(xy(k*DT))+' '+f1(yv(R.U[k]));gd+=(k?'L':'M')+p;if(k<=i)cd+=(k?'L':'M')+p}
    s+=`<path d="${gd}" style="fill:none;stroke:var(--gold);stroke-width:1.2;opacity:.3"/><path d="${cd}" style="fill:none;stroke:var(--gold);stroke-width:2.8"/>`;
    s+=`<circle cx="${f1(xy(y))}" cy="${f1(yv(u))}" r="5" style="fill:var(--gold)"/>`;
    if(ut!=null){s+=`<line x1="${f1(xy(ULT0))}" x2="${f1(xy(ULT0))}" y1="${L.uy}" y2="${L.my+L.mh}" style="stroke:var(--sea);stroke-width:1.6"/><text x="${f1(xy(ULT0)+4)}" y="${L.uy+10}" class="t-xs" style="fill:var(--sea)">urate-lowering therapy →</text>`}
    /* ---- flares ---- */
    s+=`<text x="${L.cx0}" y="${L.fy+4}" class="t-xs" style="fill:var(--terra)">FLARES</text>`;
    R.fl.forEach(f=>{if(f>y)return;const x=xy(f);s+=`<path d="M${f1(x-5)} ${L.fy+6} L${f1(x)} ${L.fy-10} L${f1(x+5)} ${L.fy+6}z" style="fill:var(--terra)"/>`});
    /* ---- crystal load ---- */
    const ym=v=>L.my+L.mh-L.mh*v;
    s+=`<text x="${L.cx0}" y="${L.my-4}" class="t-xs" style="fill:var(--xtal)">CRYSTAL LOAD IN THE JOINT · relative, schematic</text><line x1="${L.cx0}" x2="${L.cx1}" y1="${L.my+L.mh}" y2="${L.my+L.mh}" class="axis"/>`;
    let ma='',mg='';for(let k=0;k<=NS;k+=5){const p=f1(xy(k*DT))+' '+f1(ym(R.M[k]));mg+=(k?'L':'M')+p;if(k<=i)ma+=(k?'L':'M')+p}
    s+=`<path d="${mg}" style="fill:none;stroke:var(--xtal);stroke-width:1.2;opacity:.3"/>`;
    if(i>0)s+=`<path d="${ma}L${f1(xy(i*DT))} ${L.my+L.mh}L${L.cx0} ${L.my+L.mh}z" style="fill:var(--xtal-soft)"/><path d="${ma}" style="fill:none;stroke:var(--xtal);stroke-width:2.4"/>`;
    if(R.clear!=null&&y>=R.clear)s+=`<text x="${L.cx1}" y="${L.my+L.mh-6}" class="t-xs t-end" style="fill:var(--sea)">crystal-free in the model</text>`;
    /* ---- time axis ---- */
    for(let yr=0;yr<=YRS;yr++){const x=xy(yr);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.my+L.mh}" y2="${L.my+L.mh+4}" class="axis"/>`;if(yr%(N?3:3)===0)s+=`<text x="${f1(x)}" y="${L.ay}" class="t-xs t-mid">${yr}</text>`}
    s+=`<text x="${L.cx1}" y="${L.ay+14}" class="t-xs t-end">years</text>`;
    s+=`<line x1="${f1(xy(y))}" x2="${f1(xy(y))}" y1="${L.uy-2}" y2="${L.my+L.mh+2}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    s+=`<text x="${N?L.tx:L.cx0}" y="${L.cap}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one imagined person · slopes are relative</text>`;
    svg.innerHTML=s;
    const p=phaseOf(CR_STEPS,t);setSt(p);
    $('#crRead').innerHTML=`<span>year <b>${f1(y)}</b></span><span>serum urate <b>${f1(u)} mg/dL</b> (${mmol(u)} µmol/L)</span><span>saturation at ${temp} °C <b>${f1(S)} mg/dL</b></span><span>crystal load <b>${Math.round(m*100)}%</b> of a full joint</span>`;
    let sc;
    if(ut==null)sc=`No urate-lowering therapy: urate stays above saturation, so the deposit keeps growing${R.full!=null?` (the model joint is full by year ${f1(R.full)})`:''} and flares keep coming. About half of people with urate ≥ 10 mg/dL develop gout within 15 years [[Dalbeth2018ARD]].`;
    else if(Math.abs(ut-S)<.05)sc=`At ${temp} °C urate saturates at ${f1(S)} mg/dL, so a treated urate of ${ut} mg/dL sits right on the line. With no gradient, deposits neither grow nor dissolve. A lower target speeds dissolution: EULAR 2016 sets &lt; 5 mg/dL (300 µmol/L) for severe gout [[Richette2017,PerezRuiz2002]].`;
    else if(ut>S)sc=`${ut} mg/dL is lower than before but still above saturation (${f1(S)} mg/dL at ${temp} °C), so crystals keep slowly growing and flares continue. This is why guidelines treat to a target below 6 mg/dL, not just "lower" [[FitzGerald2020,Richette2017]].`;
    else sc=`On treatment, urate sits ${f1(S-ut)} mg/dL below saturation. In the model the shrink speed is proportional to that gap, following the straight-line relation between on-treatment urate and tophus shrinkage; the slope itself is schematic [[PerezRuiz2002]]. ${R.clear!=null?`The model joint is crystal-free by about year ${f1(R.clear)}.`:'The model joint is still not clear at year 15.'}`;
    const tn=temp===35?' A cool joint: from 37 °C to 35 °C, solubility falls from 6.8 to 6.0 mg/dL (in vitro data), so the same urate builds crystals faster and a target of 6 mg/dL only holds steady. This may help explain why the big toe is the commonest site of a first flare [[Martillo2014,Loeb1972]].':'';
    $('#crNote').innerHTML=noteHTML(CR_STEPS[p])+`<div class="kv"><div><dt>This scenario</dt><dd>${sc}${tn}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#crPlay'),draw,22000,'Replay','crystals');
  const setSt=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  $$('[data-cru]').forEach(b=>b.onclick=()=>{ut=b.dataset.cru==='none'?null:+b.dataset.cru;$$('[data-cru]').forEach(x=>x.setAttribute('aria-pressed',x===b));R=sim();draw(+rg.value)});
  $$('[data-crtemp]').forEach(b=>b.onclick=()=>{temp=+b.dataset.crtemp;$$('[data-crtemp]').forEach(x=>x.setAttribute('aria-pressed',x===b));R=sim();draw(+rg.value)});
  draw(+rg.value);

  /* ---- 15-year risk by baseline urate (Dalbeth 2018) ---- */
  (function risk(){const el=$('#crRisk');let s='';const x0=78,x1=318,lg=v=>lerp(x0,x1,Math.log10(v)/2);
    s+=`<text x="0" y="12" class="t-xs">ADJUSTED HAZARD RATIO vs &lt; 6 mg/dL · log scale</text>`;
    [1,10,100].forEach(v=>s+=`<line x1="${f1(lg(v))}" x2="${f1(lg(v))}" y1="20" y2="182" class="grid"/><text x="${f1(lg(v))}" y="194" class="t-xs t-mid">${v}</text>`);
    CR_HR.forEach(([b,hr],k)=>{const yy=26+k*26,w=Math.max(3,lg(hr)-x0);
      s+=`<text x="${x0-8}" y="${yy+13}" class="t-sm t-end">${b}</text><rect x="${x0}" y="${yy}" width="${f1(w)}" height="18" rx="4" style="fill:var(--gold);opacity:${f1(.35+.13*k)}"/>`;
      s+=`<text x="${f1(x0+w+6)}" y="${yy+13}" class="t-lbl">${k?hr:'1 (reference)'}</text>`});
    s+=`<text x="${x0-8}" y="206" class="t-xs t-end">mg/dL</text>`;
    const waf=(ox,oy,n,lab,col)=>{let g='';for(let k=0;k<100;k++){const cx=ox+(k%10)*12+5,cy=oy+Math.floor(k/10)*12+5;g+=`<circle cx="${cx}" cy="${cy}" r="4.3" style="fill:${k<n?col:'var(--panel-2)'};stroke:${k<n?col:'var(--line)'};stroke-width:.8"/>`}
      return g+`<text x="${ox}" y="${oy-8}" class="t-sm" style="fill:${col}">${lab}</text>`};
    s+=`<text x="0" y="226" class="t-xs">GOUT WITHIN 15 YEARS, PER 100 PEOPLE</text>`;
    s+=waf(14,246,1,'&lt; 6 mg/dL: 1.1%','var(--sea)')+waf(196,246,49,'≥ 10 mg/dL: 49%','var(--terra)');
    el.innerHTML=s})();

  /* ---- crystals leaving joint fluid (Pascual 2007) ---- */
  (function pas(){const el=$('#crPas');let s='';const x0=40,x1=344,xm=mo=>lerp(x0,x1,mo/36);
    s+=`<text x="0" y="12" class="t-xs">MONTHS AFTER STARTING URATE LOWERING</text>`;
    [0,6,12,18,24,30,36].forEach(mo=>s+=`<line x1="${f1(xm(mo))}" x2="${f1(xm(mo))}" y1="22" y2="300" class="grid"/><text x="${f1(xm(mo))}" y="314" class="t-xs t-mid">${mo}</text>`);
    // urate
    const yu=v=>lerp(96,34,(v-3)/7);
    s+=`<text x="${x0}" y="30" class="t-xs" style="fill:var(--gold)">median serum urate</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(yu(6))}" y2="${f1(yu(6))}" style="stroke:var(--sea);stroke-dasharray:4 3"/><text x="${x1}" y="${f1(yu(6)-4)}" class="t-xs t-end" style="fill:var(--sea)">6 mg/dL</text>`;
    s+=`<path d="M${f1(xm(0))} ${f1(yu(9.2))} L${f1(xm(3))} ${f1(yu(4.9))}" style="fill:none;stroke:var(--gold);stroke-width:2.6"/><circle cx="${f1(xm(0))}" cy="${f1(yu(9.2))}" r="4" style="fill:var(--gold)"/><circle cx="${f1(xm(3))}" cy="${f1(yu(4.9))}" r="4" style="fill:var(--gold)"/>`;
    s+=`<text x="${f1(xm(0)+8)}" y="${f1(yu(9.2)+4)}" class="t-xs">550 µmol/L (≈ 9.2)</text><text x="${f1(xm(3)+8)}" y="${f1(yu(4.9)+12)}" class="t-xs">290 µmol/L (≈ 4.9) by month 3</text>`;
    // crystal count
    const yc=v=>lerp(176,124,v/8);
    s+=`<text x="${x0}" y="118" class="t-xs" style="fill:var(--xtal)">median crystals per 400× field</text>`;
    s+=`<path d="M${f1(xm(0))} ${f1(yc(7.5))} L${f1(xm(3))} ${f1(yc(3))}" style="fill:none;stroke:var(--xtal);stroke-width:2.6"/><circle cx="${f1(xm(0))}" cy="${f1(yc(7.5))}" r="4" style="fill:var(--xtal)"/><circle cx="${f1(xm(3))}" cy="${f1(yc(3))}" r="4" style="fill:var(--xtal)"/>`;
    s+=`<text x="${f1(xm(3)+8)}" y="${f1(yc(3)+4)}" class="t-xs">7.5 → 3 at month 3 · later counts not plotted</text>`;
    for(let k=0;k<5;k++)s+=needle(xm(0)-24+k*3,yc(7.5)+(k%2?4:-4),9,60+k*22,.9);
    // clearance
    s+=`<text x="${x0}" y="202" class="t-xs" style="fill:var(--sea)">joints cleared of crystals</text>`;
    s+=`<rect x="${f1(xm(3))}" y="212" width="${f1(xm(33)-xm(3))}" height="16" rx="8" style="fill:var(--sea-soft);stroke:var(--sea)"/><text x="${f1((xm(3)+xm(33))/2)}" y="224" class="t-xs t-mid" style="fill:var(--sea)">all 18 joints: between month 3 and 33</text>`;
    [[12,'9/10'],[18,'10/10']].forEach(([mo,l])=>{s+=`<line x1="${f1(xm(mo))}" x2="${f1(xm(mo))}" y1="236" y2="258" style="stroke:var(--sea);stroke-width:2"/><circle cx="${f1(xm(mo))}" cy="258" r="4" style="fill:var(--sea)"/><text x="${f1(xm(mo))}" y="274" class="t-xs t-mid" style="fill:var(--sea)">${l}</text>`});
    s+=`<text x="${f1(xm(15))}" y="290" class="t-xs t-mid">joints from people with gout &lt; 10 years</text>`;
    s+=`<path d="M${f1(xm(4))} 336 H${f1(xm(32))}" class="arrow" marker-end="url(#crPA)"/><text x="${f1(xm(4))}" y="330" class="t-xs">longer gout duration → longer to clear (rs = 0.71)</text>`;
    el.innerHTML=`<defs>${marker('crPA')}</defs>`+s})();

  $('#crCards').innerHTML=`
   <div class="card"><h4>Why the big toe, and why at night?</h4><p>A drop of only 2 °C, from 37 to 35 °C, lowers urate solubility from 6.8 to 6.0 mg/dL in vitro. The first MTP is cool, poorly perfused and has a high surface-to-volume ratio, which may partly explain why it is the commonest site of a first flare [[Martillo2014,Loeb1972]]. Flares are 2.36 times as likely overnight (95% CI 2.05–2.73) [[Choi2015]]. One proposed reason is that water leaves a resolving joint effusion about twice as fast as urate, so local urate rises for a while <span class="ev hyp">Hypothesis</span> [[Simkin1977]].</p></div>
   <div class="card"><h4>More than temperature</h4><p>Across 35 studies, urate solubility was lower at lower temperature, at pH 7–9 and with ions including sodium, and higher at pH ≤ 6 or ≥ 10. Cartilage homogenates and healthy synovial fluid and serum all raised solubility, while synovial fluid or serum from people with gout increased nucleation [[Chhana2015]]. Lab figures for saturation differ a little: 6.6 mg/dL (392 µmol/L) at 37 °C and pH 7.4 in one review [[Chen2016]]. This guide uses 6.8 mg/dL.</p></div>
   <div class="card"><h4>Necessary, not sufficient</h4><p>Risk climbs steeply with urate, yet only about half of people at ≥ 10 mg/dL develop gout over 15 years [[Dalbeth2018ARD]]. In the Normative Aging Study, annual incidence was 4.9% at ≥ 9 mg/dL, 0.5% at 7.0–8.9 mg/dL and 0.1% below 7.0 mg/dL [[Campion1987]]. Many hyperuricaemic people have no deposits on imaging, and local tissue factors may decide where crystals form [[Dalbeth2015,Chhana2015]].</p></div>
   <div class="card"><h4>Stages of the disease</h4><ul><li><b>A</b> Asymptomatic hyperuricaemia</li><li><b>B</b> Asymptomatic MSU crystal deposition</li><li><b>C</b> Deposition with past or current flares</li><li><b>D</b> Advanced gout: tophi, chronic arthritis, erosion</li></ul><p>The animation runs from A through C, then back toward a joint without crystals [[Chhana2015]].</p></div>
   <div class="card"><h4>Stopping treatment</h4><p>Cure in gout means clearing crystals and keeping urate low, not a one-off event [[PerezRuiz2006,FitzGerald2020]]. In a case series cited by ACR 2020, only 13% (27/211) of people whose urate stayed &lt; 7 mg/dL off treatment were flare-free over 5 years [[FitzGerald2020]]. A withdrawal study found the longest flare-free spells, more than 4 years, when on-treatment urate had averaged &lt; 5.05 mg/dL <span class="ev early">Early evidence</span> [[PerezRuiz2006]].</p></div>`;
};
