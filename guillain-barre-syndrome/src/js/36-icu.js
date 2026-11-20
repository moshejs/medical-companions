/* =============== 3.6 Intensive care & pain =============== */
/* Widgets: a schematic ventilator stay (main player), the Walgaard 2017 week-one rows, and the Pandey 2005 pain trial
   (second player). The stay is illustrative; weaning lines, medians and trial values are published and cited in the HTML. */
const IC_DAYS=70;
const IC_VC=monoFn([ [0,6],[10,6.5],[18,8],[24,12],[28,16],[32,20],[40,23],[70,27] ]);
const IC_TRACH=11,IC_WEAN=20,IC_OFF=31,IC_DECAN=36;
const IC_WEANL=[
 {v:7,t:'7: no weaning success below',col:'var(--bad)',below:false},
 {v:13,t:'13.0: mean, not extubated',col:'var(--warn)',below:true},
 {v:15,t:'15: extubation came above',col:'var(--accent)',below:false},
 {v:21.9,t:'21.9: mean, extubated',col:'var(--good)',below:false}];
const IC_MED=[ {t:'Dutch, n=150',m:28,lo:12,hi:60,v:'28 (12–60)'},{t:'IGOS',m:20,lo:10,hi:54,v:'20 (10–54)'} ];
const IC_BADGES=['pneumonia','blood clots','pressure areas','dry eyes','pain','hallucinations'];
const IC_AIR={oral:'tube through the mouth',trach:'tracheostomy',none:'breathing unaided'};
const IC_MODE={full:'full support',wean:'weaning trials',off:'off'};
const IC_STEPS=[
 {from:0,at:.02,k:'Day 0',t:'Intubation, planned if possible',
  txt:'Emergency intubation was uncommon at Mayo (7 of 43), but one person had brain injury from lack of oxygen after a respiratory arrest [[Wijdicks2003]]. Early pneumonia was more likely when intubation came more than 2 days after admission [[Orlikowski2006]]. Succinylcholine carries a risk of cardiac arrest from high potassium in denervated muscle [[FDA-Quelicin]].',
  hook:'Delayed intubation (over 2 days) independently predicted early pneumonia [[Orlikowski2006]].'},
 {from:.07,at:.1,k:'Day 7',t:'Week one: a long haul?',
  txt:'One week after intubation, people who could not lift their arms from the bed had an 87% chance of ventilation for 14 days or more, and 96% with axonal or unexcitable nerves as well [[Walgaard2017]]. Explore the published rows below the player.',
  pt:'Doctors may talk about how long the breathing machine is likely to be needed. That estimate comes from groups of people and can be wrong for one person.'},
 {from:.14,at:.17,k:'Days 9 to 14',t:'The tracheostomy question',
  txt:'A tube through the front of the neck is more comfortable than one through the mouth for a long stay. At Mayo, 87% of 60 had a tracheostomy, a median 9 days after intubation [[Lawn1999]]. In Japan, early tracheostomy did not change mortality [[Yonezawa2020]]. There is no randomised trial.'},
 {from:.28,at:.36,k:'Weeks 3 to 4',t:'Weaning trials',
  txt:'Weaning usually starts once general improvement has begun [[Weiss2025]]. In one small series no weaning trial succeeded below 7 mL/kg and extubation came above 15 mL/kg [[Chevrolet1991]]. In 44 people, VC was 21.9 mL/kg in those extubated successfully vs 13.0 in the rest, and negative inspiratory force −50.3 vs −28.6 cmH₂O [[Nguyen2006]].',
  hook:'A VC gain above 4 mL/kg had 82% sensitivity for successful extubation [[Nguyen2006]].'},
 {from:.44,at:.48,k:'About a month',t:'Off the ventilator',
  txt:'Ventilation lasted a median 28 days (IQR 12 to 60) in 150 Dutch patients, 71% needing 14 days or more [[Walgaard2017]], and a median 20 days (IQR 10 to 54) in IGOS [[Luijten2023]]. In a French nationwide cohort, 26% of extubation attempts ended in reintubation [[Thille2025]].'},
 {from:.56,at:.7,k:'After intensive care',t:'After intensive care',
  txt:'Monitoring continues on the ward: up to two-thirds of deaths occur in the recovery phase [[Leonhard2019]]. Recovery after ventilation can be long: at Mayo, 79% of survivors eventually walked independently [[Fletcher2000]], and some first walked again more than a year later [[vanDenBerg2018]].',
  pt:'Many people who needed a ventilator walk again, though it can take a long time. These are group figures, not a forecast [[Fletcher2000,vanDenBerg2018]].'}];
/* Walgaard 2017 Table 2: chance of MV for 14 days or more, judged 1 week after intubation */
const IC_PMV=[
 {k:87,t:'Cannot lift arms from the bed at 1 week',out:'87 in 100 people in this group were still ventilated at 14 days [[Walgaard2017]].'},
 {k:96,t:'Cannot lift arms, axonal or unexcitable nerves',out:'96 in 100 people in this group were still ventilated at 14 days [[Walgaard2017]].'},
 {k:90,t:'Can lift arms, axonal or unexcitable nerves',out:'90 in 100 people in this group were still ventilated at 14 days [[Walgaard2017]].'},
 {k:67,t:'Can lift arms, demyelinating or equivocal',more:[ ['14 days',67],['21 days',48],['28 days',34] ],
  out:'67 in 100 at 14 days, 48 at 21 days and 34 at 28 days in this group, from the paper\'s Table 2; the abstract gives 69% for all who could lift their arms [[Walgaard2017]].'}];
/* Pandey 2005 medians, NRS 0-10, days 1-7 */
const IC_PAIN=[
 {t:'gabapentin',v:[3.5,2.5,2.0,2.0,2.0,2.0,2.0],col:'var(--rec)',dash:''},
 {t:'carbamazepine',v:[6.0,6.0,5.0,4.0,4.0,3.5,3.0],col:'var(--care)',dash:'8 5'},
 {t:'placebo',v:[6.0,6.0,6.0,6.0,6.0,6.0,6.0],col:'var(--muted)',dash:'2 5'}];

inits.icu=()=>{
  /* ---------- main player ---------- */
  const svg=$('#icSvg'),rg=$('#icT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 408','400 684');
    const L=N?{ax:12,lx:12,ly:44,ls:1.1,st:198,dl:216,vx:200,vy:34,vw:188,vh:84,md:138,bx:200,bt:166,bw:92,cl:286,cx:30,cy:300,ch:220,cr:388,cv:542,dt:576,mx:100,mw:272,my:592,ml:12,axy:648}
             :{ax:14,lx:24,ly:46,ls:1.15,st:212,dl:232,vx:220,vy:34,vw:190,vh:84,md:138,bx:220,bt:166,bw:94,cl:22,cx:452,cy:36,ch:220,cr:706,cv:276,dt:308,mx:130,mw:540,my:322,ml:14,axy:372};
    const d=IC_DAYS*t,vc=IC_VC(d),a=clamp(vc/30);
    const air=d<IC_TRACH?'oral':d<IC_DECAN?'trach':'none',mode=d<IC_WEAN?'full':d<IC_OFF?'wean':'off';
    const ph=.5+.5*Math.sin(t*Math.PI*2*60);
    const H=(x,y,tx)=>`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:700;letter-spacing:.06em">${tx}</text>`;
    let s=H(L.ax,22,'AIRWAY');
    const fill=mode==='full'?lerp(.3,.9,ph):mode==='wean'?lerp(.45-a*.3,.55+a*.3,ph):lerp(.5-a*.45,.5+a*.45,ph);
    const Lg=lungs(L.lx,L.ly,L.ls,{fill,weak:1-a,tube:air==='oral'});s+=Lg.svg;
    if(air==='trach'){const [tx,ty]=Lg.at.trachea;s+=`<path d="M${f1(tx)} ${f1(ty-4)}Q${f1(tx-6)} ${f1(ty-16)} ${f1(tx-30)} ${f1(ty-16)}" style="fill:none;stroke:var(--device);stroke-width:4;stroke-linecap:round"/><rect x="${f1(tx-36)}" y="${f1(ty-22)}" width="10" height="12" rx="2" style="fill:var(--device)"/>`}
    s+=`<text x="${L.ax}" y="${L.st}" class="t-lbl">${IC_AIR[air]}</text><text x="${L.ax}" y="${L.dl}" class="t-sm">day ${Math.round(d)} of a schematic stay</text>`;
    /* ventilator */
    s+=H(L.vx,22,'VENTILATOR');
    s+=`<rect x="${L.vx}" y="${L.vy}" width="${L.vw}" height="${L.vh}" rx="8" style="fill:var(--panel-2);stroke:var(--device);stroke-width:1.6"/><rect x="${L.vx+8}" y="${L.vy+8}" width="${L.vw-16}" height="${L.vh-16}" rx="4" style="fill:var(--field)"/>`;
    if(mode!=='off'){const amp=mode==='full'?22:10,yc=L.vy+L.vh/2+6;let p='';for(let i=0;i<=60;i++){const u=i/60,x=L.vx+12+u*(L.vw-24),w=((u*3+t*40)%1);const y=yc-amp*(w<.35?Math.sin(w/.35*Math.PI):0);p+=(i?'L':'M')+f1(x)+' '+f1(y)}
      s+=`<path d="${p}" style="fill:none;stroke:var(--care);stroke-width:2"/>`}
    else s+=`<line x1="${L.vx+12}" x2="${L.vx+L.vw-12}" y1="${L.vy+L.vh/2+6}" y2="${L.vy+L.vh/2+6}" style="stroke:var(--muted);stroke-width:1.5;stroke-dasharray:3 4"/>`;
    s+=`<text x="${L.vx}" y="${L.md}" class="t-sm">support: <tspan style="fill:var(--ink);font-weight:700">${IC_MODE[mode]}</tspan></text>`;
    /* badges */
    const act=d<IC_DECAN;s+=H(L.bx,L.bt,act?'WATCHED FOR':'STILL WATCHED ON THE WARD');
    IC_BADGES.forEach((b,i)=>{const x=L.bx+(i%2)*(L.bw+6),y=L.bt+10+Math.floor(i/2)*28,on=act||b==='pain';
      s+=`<rect x="${x}" y="${y}" width="${L.bw}" height="22" rx="6" style="fill:${on?'var(--rx-soft)':'var(--panel-2)'};stroke:${on?'var(--rx)':'var(--line)'};stroke-width:1.2"/><text x="${x+L.bw/2}" y="${y+15}" class="t-xs t-mid" style="fill:var(--ink)">${b}</text>`});
    /* VC for weaning */
    s+=H(N?12:L.cx-12,L.cl,'VITAL CAPACITY, mL/kg');
    const Y=v=>L.cy+L.ch-L.ch*v/30;
    s+=`<rect x="${L.cx}" y="${L.cy}" width="22" height="${L.ch}" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${L.cx}" y="${f1(Y(vc))}" width="22" height="${f1(L.cy+L.ch-Y(vc))}" rx="4" style="fill:var(--rec)"/>`;
    [0,10,20,30].forEach(v=>{s+=`<text x="${L.cx-4}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    IC_WEANL.forEach(l=>{const y=Y(l.v);s+=`<line x1="${L.cx}" x2="${L.cr}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${l.col};stroke-width:1.4;stroke-dasharray:6 4"/>`+kitLabel(L.cx+30,l.below?y+12:y-4,l.t)});
    s+=`<text x="${N?12:L.cx-12}" y="${L.cv}" class="t-sm">now about ${Math.round(vc)} mL/kg (schematic)</text>`;
    /* days scale with published medians */
    s+=H(L.ml,L.dt,'DAYS VENTILATED: PUBLISHED MEDIANS, IQR');
    const X=v=>L.mx+L.mw*v/IC_DAYS;
    IC_MED.forEach((m,i)=>{const y=L.my+i*26;s+=`<text x="${L.ml}" y="${y+9}" class="t-sm" style="fill:var(--ink)">${m.t}</text><rect x="${f1(X(m.lo))}" y="${y}" width="${f1(X(m.hi)-X(m.lo))}" height="11" rx="3" style="fill:var(--rx-soft);stroke:var(--rx)"/><line x1="${f1(X(m.m))}" x2="${f1(X(m.m))}" y1="${y-3}" y2="${y+14}" style="stroke:var(--ink);stroke-width:2.4"/><text x="${f1(X(m.hi)+5)}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${m.v}</text>`});
    const T=tline(L.mx,L.axy,L.mw,{min:0,max:IC_DAYS,step:10,label:'days'});s+=T.svg;
    const cx=X(d);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.my-8}" y2="${L.axy}" style="stroke:var(--brand);stroke-width:2"/><circle cx="${f1(cx)}" cy="${L.axy}" r="5" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const p=phaseOf(IC_STEPS,t);setSt(p);$('#icNote').innerHTML=noteHTML(IC_STEPS[p]);
  }
  const stop=playWire(rg,$('#icPlay'),draw,24000,'%t:player.replay%','icu');
  setSt=stepWire($('#icSteps'),IC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- week-one rows ---------- */
  const ps=$('#icPmv'),mod=$('#m-icu');let row=0;
  function drawPmv(){
    const R=IC_PMV[row],N=vb(ps,'720 210',R.more?'400 430':'400 348');
    const L=N?{ix:12,iy:40,cols:10,sz:22,gap:4,tx:12,ty:22,bx:12,by:320,bw:300}:{ix:14,iy:40,cols:20,sz:16,gap:3,tx:14,ty:22,bx:420,by:50,bw:200};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-xs" style="fill:var(--ink);font-weight:700">${R.k} in 100 still ventilated at 14 days</text>`;
    s+=icons(L.ix,L.iy,{n:100,cols:L.cols,k:R.k,size:L.sz,gap:L.gap,col:'var(--rx)'}).svg;
    if(R.more){const bx=N?L.bx:L.bx;s+=`<text x="${bx}" y="${L.by-12}" class="t-xs" style="fill:var(--ink);font-weight:700">same group, later</text>`;
      R.more.forEach(([lab,v],i)=>{const y=L.by+i*30;s+=`<text x="${bx}" y="${y+11}" class="t-sm">${lab}</text><rect x="${bx+66}" y="${y}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${bx+66}" y="${y}" width="${f1(L.bw*v/100)}" height="14" rx="4" style="fill:var(--rx)"/><text x="${f1(bx+66+L.bw*v/100+6)}" y="${y+11}" class="t-sm" style="fill:var(--ink)">${v}%</text>`})}
    const gy=N?(R.more?418:338):(R.more?168:70),gx=N?12:420;
    s+=`<circle cx="${gx+6}" cy="${gy-4}" r="6" style="fill:var(--rx)"/><text x="${gx+18}" y="${gy}" class="t-sm" style="fill:var(--ink)">still on the ventilator</text><circle cx="${gx+(N?196:6)}" cy="${(N?gy:gy+22)-4}" r="6" style="fill:var(--line)"/><text x="${gx+(N?208:18)}" y="${N?gy:gy+22}" class="t-sm" style="fill:var(--ink)">off by day 14</text>`;
    ps.innerHTML=s;$('#icPmvOut').innerHTML=R.out;
  }
  $$('[data-pmv]',mod).forEach(b=>b.addEventListener('click',()=>{row=+b.dataset.pmv;$$('[data-pmv]',mod).forEach(x=>x.setAttribute('aria-pressed',x===b));drawPmv()}));
  drawPmv();

  /* ---------- pain trial ---------- */
  const qs=$('#icPain'),qr=$('#icPainT');
  function drawPain(u){
    const N=vb(qs,'720 300','400 420'),day=1+6*u;
    const L=N?{px:40,py:96,pw:330,ph:260,lx:12,ly:18,ldy:24}:{px:56,py:30,pw:460,ph:220,lx:548,ly:60,ldy:34};
    const fns=IC_PAIN.map(sr=>monoFn(sr.v.map((v,i)=>[i+1,v])));
    let s='';
    IC_PAIN.forEach((sr,i)=>{const C=curve(L.px,L.py,L.pw,L.ph,fns[i],{x0:1,x1:7,y0:0,y1:10,upto:day,col:sr.col,dash:sr.dash,dot:true,lw:3});
      s+=i?C.svg.replace(/^<rect[^>]*\/>/,'').replace(/<line[^>]*class="axis"\/><line[^>]*class="axis"\/>/,''):C.svg;
      if(!i){[0,2,4,6,8,10].forEach(v=>{s+=`<text x="${L.px-6}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v}</text>`});
        for(let k=1;k<=7;k++)s+=`<text x="${f1(C.X(k))}" y="${L.py+L.ph+15}" class="t-xs t-mid">${k}</text>`;
        s+=`<text x="${L.px+L.pw}" y="${L.py+L.ph+30}" class="t-xs t-end">day of treatment</text><text x="${L.px}" y="${L.py-8}" class="t-xs" style="fill:var(--ink);font-weight:700">median pain score, 0 to 10</text>`}});
    const di=Math.min(6,Math.floor(day+1e-6)-1);
    IC_PAIN.forEach((sr,i)=>{const x=N?L.lx+(i%2)*190:L.lx,y=N?L.ly+Math.floor(i/2)*L.ldy:L.ly+i*L.ldy;
      s+=`<line x1="${x}" x2="${x+30}" y1="${y-4}" y2="${y-4}" style="stroke:${sr.col};stroke-width:3${sr.dash?';stroke-dasharray:'+sr.dash:''}"/><text x="${x+38}" y="${y}" class="t-sm" style="fill:var(--ink)">${sr.t} ${sr.v[di].toFixed(1)}</text>`});
    s+=`<text x="${N?L.lx:L.lx}" y="${N?L.ly+2*L.ldy+8:L.ly+3*L.ldy+6}" class="t-xs">values on day ${di+1}</text>`;
    qs.innerHTML=s;
  }
  playWire(qr,$('#icPainPlay'),drawPain,9000,'%t:player.replay%','icu');
  drawPain(+qr.value);
  const prev=redraws.icu;redraws.icu=()=>{prev&&prev();drawPmv()};
};
