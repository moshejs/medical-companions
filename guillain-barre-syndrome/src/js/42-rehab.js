/* =============== 4.2 Rehabilitation & recovery =============== */
/* Three widgets: (1) the main player, two years of one Swedish cohort (Forsberg 2004/2005: values at 2 weeks,
   1 year and 2 years, joined by straight lines) beside a body outline and the care setting; (2) two routes of
   nerve recovery drawn with the kit's nerveFibre (reversible block, axonal regrowth), each with its own sources;
   (3) an exercise-schedule comparer against the published programmes. Numbers from research G and C. */
const RH_MEAS=[
 {id:'walk',l:'Cannot walk 10 m alone',sh:'Cannot walk 10 m',v:[62,10,7],col:'var(--rec)',dash:''},
 {id:'str',l:'Below full overall strength',sh:'Below full strength',v:[100,62,55],col:'var(--weak)',dash:'7 4'},
 {id:'grip',l:'Weaker grip than normal',sh:'Weak grip',v:[98,38,31],col:'var(--muscle)',dash:'2 3'},
 {id:'sens',l:'Sensation affected',sh:'Sensation affected',v:[93,55,52],col:'var(--accent)',dash:'10 3 2 3'},
 {id:'face',l:'Face muscles affected',sh:'Face affected',v:[38,14,12],col:'var(--dx)',dash:'4 4'},
 {id:'adl',l:'Needs help with personal care',sh:'Help with personal care',v:[76,14,12],col:'var(--rx)',dash:''},
 {id:'iadl',l:'Dependent in instrumental tasks',sh:'Instrumental tasks',v:[98,28,26],col:'var(--care)',dash:'1 3'}];
const RH_MO=[.5,12,24];
const RH_TICK=[{m:.5,l:'2 wk'},{m:6,l:'6 mo'},{m:12,l:'1 yr'},{m:24,l:'2 yr'},{m:28,l:'later'}];
const RH_LIST='Swedish cohort of 42 adults';
const RH_LATEST=['Published at 2 weeks','Published at 1 year','Published at 2 years'];
const RH_LATER='after 2 years: no figure';
const RH_LATERW={w:'after 2 years',n:'later'};
const RH_WASH='weakness wash: schematic';
const RH_STEPS=[
 {from:0,at:.04,mo:.5,k:'2 weeks · acute ward',t:'The start: weakest, and rehabilitation begins',sv:'Two weeks after onset',set:'Acute ward',lv:.62,
  txt:'In a Swedish prospective cohort of 42 adults (mean age 52; 21% ventilated), 62% could not walk 10 m independently at 2 weeks, overall strength was below normal in everyone, and sensation was affected in 93% [[Forsberg2004Impairment]]. 76% depended on others for personal care, and all who had been working were unable to work [[Forsberg2005Disability]]. The guideline calls arranging rehabilitation a crucial step, first to reduce disability [[Leonhard2019]].',
  pt:'In the first weeks most people need help with their personal care. Rehabilitation starts early, first to reduce disability [[Forsberg2005Disability,Leonhard2019]].',
  hook:'About 40% of people hospitalised with GBS need inpatient rehabilitation; prior ventilation most strongly predicts a longer stay [[Meythaler1997]].'},
 {from:.14,at:.26,mo:3,k:'Months · inpatient rehabilitation',t:'Inpatient rehabilitation: function returns',sv:'Inpatient rehabilitation',set:'Rehabilitation unit',lv:.48,
  txt:'In an Israeli cohort, people spent on average 20 days on acute wards and 61 days in rehabilitation; total FIM rose 30 points [[Bondi2021]]. Swedish hospital stays averaged 82 days [[Forsberg2006Burden]]. At the end of US inpatient rehabilitation, 87.5% were independent in communication but only 24.7% in walking and moving about [[Andrews2023]].',
  pt:'By the end of a rehabilitation stay, most people could communicate on their own, but only about 1 in 4 could walk and move about without help [[Andrews2023]].',
  hook:'Gain in bed, chair and wheelchair transfers was the strongest predictor of going home from inpatient rehabilitation [[Kushner2023]].'},
 {from:.34,at:.44,mo:6,k:'First 6 months',t:'The first six months bring the fastest gains',sv:'The first six months',set:'Home, outpatient therapy',lv:.32,
  txt:'In a small series of 6 treated people, measured strength rose fastest in the first 6 months and more slowly from 6 to 18 months [[ElMhandi2007]]. Across cohorts, about 80% walk independently by 6 months [[Leonhard2019]]. The chart has no Swedish data point here: its straight lines simply join 2 weeks to 1 year.',
  pt:'Most of the strength comes back in the first months. The lines between dots on the chart are drawn straight, so they only hint at the real shape [[ElMhandi2007,Forsberg2004Impairment]].',
  hook:'A longer plateau went with less strength recovery in knees and elbows (rho -0.82, n = 6) [[ElMhandi2007]].'},
 {from:.52,at:.62,mo:12,k:'1 year',t:'One year: most recovery has happened',sv:'One year after onset',set:'Home and work',lv:.18,
  txt:'At 1 year, 10% could not walk 10 m alone, strength was still below full in 62%, grip in 38%, and sensation was affected in 55% [[Forsberg2004Impairment]]. Dependence in personal care had fallen from 76% to 14% [[Forsberg2005Disability]]. The authors concluded that recovery came mainly in the first year [[Forsberg2004Impairment]].',
  pt:'By a year, most people manage their own care and walk, even if they are not as strong as before [[Forsberg2005Disability,Forsberg2004Impairment]].',
  hook:'Large gains in quality of life come in the first year, but not clearly after it [[Darweesh2014]].'},
 {from:.7,at:.8,mo:24,k:'2 years',t:'Two years: slower change, real limits for some',sv:'Two years after onset',set:'Home and work',lv:.14,
  txt:'At 2 years, 7% could not walk 10 m alone, strength was below full in 55% and sensation affected in 52%: motor and sensory problems were each still detectable in more than half [[Forsberg2004Impairment]]. 12% depended on help for personal care and 17% of those who had worked were unable to work [[Forsberg2005Disability]].',
  pt:'Two years on, most people are independent, but more than half still notice some weakness or numbness [[Forsberg2004Impairment]].',
  hook:'Swedish 2-year figures: 7% unable to walk 10 m; over 50% with detectable motor and sensory impairment [[Forsberg2004Impairment]].'},
 {from:.86,at:.96,mo:28,k:'Years later',t:'Years later: gains still happen',sv:'Years later',set:'Years after',lv:.1,
  txt:'Recovery from remaining problems may still happen more than 5 years after onset [[Leonhard2019]]. In 76 intensive care patients, recovery could come as late as 10 years after onset [[Dhar2008]], and 19% of ICU survivors improved by at least one grade after 1 year [[Fletcher2000]]. In 47 rehabilitation inpatients, independence scores kept rising, to 95 at a mean of 7.5 years [[Shniper2022]].',
  pt:'It is never simply over at one or two years. Some people keep getting stronger for many years [[Leonhard2019,Dhar2008]].',
  hook:'Recovery can continue for years; follow-up of at least 24 months has been suggested [[ElMhandi2007,Leonhard2019]].'}];
/* nerve routes */
const RH_ROUTES={
 block:{lab:['antibodies at the nodes','the block clears'],time:'days to weeks',tl:['onset','weeks'],
  cap:'Where antibodies (for example IgG anti-GM1) stop conduction at the node without destroying the axon, blocks disappeared or began to resolve within 3 weeks, with no sign of remyelination [[Kokubun2010,Kuwabara1998GM1]]. In northern China, people with AMAN walked 5 m with help after a median of 31 days, as fast as with AIDP: too fast for regrowth of the whole nerve. Reversal at the node and regrowth of nerve terminals in the muscle are the proposed reasons <span class="ev early">Early evidence</span> [[Ho1997Recovery,Griffin1996Nodal]].'},
 regrow:{lab:['axon broken','growth cone advancing'],time:'months, sometimes years',tl:['onset','years'],
  cap:'Where the axon degenerates, it must regrow from the break. In 7 people with AMAN, strength began to return in week 4 without more motor units, suggesting early sprouting from surviving fibres and later nerve regeneration [[Kuwabara2001]]. Sensory responses that rose over months also suggested regeneration [[Capasso2011]]. Of 6 people with slowly recovering AMAN, 4 walked by 1 year and 2 at 28 and 57 months [[Hiraga2005]].'}};
const RH_MUS=['muscle','responds'];
/* exercise schedules */
const RH_REV={min:[45,60],ses:[3,4],wk:12};
const RH_SHAH={min:60,ses:[2,3],wk:12};
const RH_ROWS=[{k:'min',l:'Minutes per session',max:90},{k:'ses',l:'Sessions per week',max:5},{k:'wk',l:'Weeks',max:24}];
const RH_LEG={rev:'band: 2026 review',shah:'Shah 2022 trial',you:'this schedule'};
const RH_IN={min:'Session length is inside the 45 to 60 minutes the review described.',ses:'Sessions per week are inside the 3 to 4 the review described.',wk:'The length is at least the 12 weeks the review described.'};
const RH_OUT={min:'Session length is outside the 45 to 60 minutes the review described.',ses:'Sessions per week are outside the 3 to 4 the review described.',wk:'The length is shorter than the 12 weeks the review described.'};
const RH_DOSECAP='The 2026 review (13 studies, 173 people, GBS and CIDP) linked the best results to supervised, individual, multicomponent sessions of 45 to 60 minutes, 3 to 4 times a week, for at least 12 weeks, and cautioned that study designs differed widely [[DeLeonMunoz2026]]. The Shah trial used 60 minutes, 2 to 3 times a week, for 12 weeks [[Shah2022]]; the bicycle study also ran 12 weeks [[Garssen2004Training]].';
const RH_DAYS=[ [2],[1,4],[0,2,4],[0,1,3,5],[0,1,2,3,4] ];

inits.rehab=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- 1. main player ---------- */
  const svg=$('#rhSvg'),rg=$('#rhT'),note=$('#rhNote');let setSt=()=>{};
  const on=new Set(['walk','str','sens','adl']);
  function rhMonth(t){const P=[ [0,.5] ].concat(RH_STEPS.map(s=>[s.at,s.mo])).concat([ [1,28] ]);
    for(let i=0;i<P.length-1;i++)if(t<=P[i+1][0])return lerp(P[i][1],P[i+1][1],P[i+1][0]>P[i][0]?(t-P[i][0])/(P[i+1][0]-P[i][0]):1);return 28}
  function rhLv(t){const p=phaseOf(RH_STEPS,t),S=RH_STEPS[p];if(p===0)return S.lv;return lerp(RH_STEPS[p-1].lv,S.lv,ease(ramp(t,S.from,S.at)))}
  function rhAt(M,m){if(m<=RH_MO[0])return M.v[0];if(m>=RH_MO[2])return M.v[2];const i=m<RH_MO[1]?0:1;return lerp(M.v[i],M.v[i+1],(m-RH_MO[i])/(RH_MO[i+1]-RH_MO[i]))}
  function draw(t){
    const N=vb(svg,'720 400','400 664');
    const L=N?{tx:16,ty:26,cx:16,cy:42,cw:196,bx:330,by:40,bs:124,wy:178,gx:44,gy:196,gw:336,gh:210,lx:16,ly:472,lc:2,cap:652}
             :{tx:20,ty:28,cx:20,cy:44,cw:160,bx:100,by:94,bs:196,wy:312,gx:228,gy:56,gw:290,gh:266,lx:544,ly:66,lc:1,cap:390};
    const p=phaseOf(RH_STEPS,t),S=RH_STEPS[p],m=rhMonth(t);
    let s=T(L.tx,L.ty,S.sv,'t-big','font-size:18px');
    /* setting chip and body */
    s+=`<rect x="${L.cx}" y="${L.cy}" width="${L.cw}" height="26" rx="13" style="fill:var(--rec-soft);stroke:var(--rec)"/>`+T(L.cx+L.cw/2,L.cy+17,S.set,'t-sm t-mid','fill:var(--rec);font-weight:700');
    s+=bodyFront(L.bx,L.by,L.bs,{level:rhLv(t)}).svg+T(L.bx,L.wy,RH_WASH,'t-xs t-mid');
    /* chart */
    const X=v=>L.gx+L.gw*v/28,Y=v=>L.gy+L.gh*(1-v/100);
    s+=`<rect x="${L.gx}" y="${L.gy}" width="${L.gw}" height="${L.gh}" style="fill:var(--field)"/><rect x="${f1(X(24))}" y="${L.gy}" width="${f1(X(28)-X(24))}" height="${L.gh}" style="fill:var(--panel-2)"/>`;
    [0,50,100].forEach(v=>{s+=`<line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(L.gx-6,Y(v)+3,v+'%','t-xs t-end')});
    s+=`<line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${L.gy+L.gh}" y2="${L.gy+L.gh}" class="axis"/>`;
    RH_TICK.forEach(k=>{s+=`<line x1="${f1(X(k.m))}" x2="${f1(X(k.m))}" y1="${L.gy+L.gh}" y2="${L.gy+L.gh+5}" class="axis"/>`+T(X(k.m),L.gy+L.gh+17,k.l,'t-xs t-mid')});
    s+=T(X(26),L.gy+16,N?RH_LATERW.n:RH_LATERW.w,'t-xs t-mid');
    const mm=Math.min(m,24);
    RH_MEAS.forEach(M=>{if(!on.has(M.id))return;let d='';const n=40;for(let i=0;i<=n;i++){const q=lerp(.5,mm,i/n);d+=(i?'L':'M')+f1(X(q))+' '+f1(Y(rhAt(M,q)))}
      s+=`<path d="${d}" style="fill:none;stroke:${M.col};stroke-width:2.6;stroke-linejoin:round${M.dash?';stroke-dasharray:'+M.dash:''}"/>`;
      RH_MO.forEach((q,i)=>{if(q<=m+.01)s+=`<circle cx="${f1(X(q))}" cy="${f1(Y(M.v[i]))}" r="4" style="fill:${M.col};stroke:var(--panel);stroke-width:1.6"/>`})});
    s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${L.gy}" y2="${L.gy+L.gh}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    /* the list: latest published value for each measure shown */
    const li=m>=23.99?2:m>=11.99?1:0;
    s+=T(L.lx,L.ly-18,RH_LIST,'t-xs',INK)+T(L.lx,L.ly-6,m>24.01?RH_LATER:RH_LATEST[li],'t-xs');
    let r=0;RH_MEAS.forEach(M=>{if(!on.has(M.id))return;const c=r%L.lc,y=L.ly+14+Math.floor(r/L.lc)*(N?36:40),x=L.lx+c*192;r++;
      s+=`<line x1="${x}" x2="${x+22}" y1="${y+8}" y2="${y+8}" style="stroke:${M.col};stroke-width:3${M.dash?';stroke-dasharray:'+M.dash:''}"/>`;
      s+=T(x+28,y+4,N?M.sh:M.l,'t-xs','fill:var(--ink)')+T(x+28,y+20,M.v[li]+'%','t-lbl')});
    if(!on.size)s+=T(L.lx,L.ly+20,'Pick a measure above the chart.','t-xs');
    s+=T(N?16:20,L.cap,'Sources: Forsberg 2004 and 2005; values are shares of the cohort.','t-xs');
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#rhPlay'),draw,18000,'%t:player.replay%','rehab');
  setSt=stepWire($('#rhSteps'),RH_STEPS,rg,draw,stop);
  $$('[data-rhm]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.rhm;on.has(k)?on.delete(k):on.add(k);b.setAttribute('aria-pressed',on.has(k));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- 2. two routes back ---------- */
  const ns=$('#rhNerve'),nr=$('#rhNT'),ncap=$('#rhNCap');let route='block';
  function drawN(t){
    const N=vb(ns,'720 240','400 266'),R=RH_ROUTES[route];
    const L=N?{x:16,w:290,y:96,h:28,mx:318,mw:70,ty:196,tw:368,lab:62}:{x:30,w:520,y:100,h:36,mx:568,mw:122,ty:196,tw:660,lab:58};
    const loop=(t*7)%1;let o={n:5,h:L.h,pulse:loop},rec=0;
    if(route==='block'){const hit=1-ease(ramp(t,.25,.75));rec=1-hit;o.nodeHit=[0,hit,hit,hit*.8,0,0];if(hit>.25)o.block=1}
    else{const g=ease(ramp(t,.12,.92));rec=g>=.98?1:0;o.cut=.42;o.regrow=g;if(g<.98)o.pulse=Math.min(loop,.4)}
    const F=nerveFibre(L.x,L.y,L.w,o);let s=F.svg;
    s+=T(L.x,24,N?'spinal cord side':'from the spinal cord','t-xs')+T(L.x+L.w,24,N?'':'to the muscle','t-xs t-end');
    /* muscle */
    const act=rec*(loop>.85?1:.5),sq=1-.12*act*(route==='block'||rec>0?1:0);
    s+=`<g transform="translate(${f1(L.mx+L.mw/2)} ${L.y}) scale(${f1(sq)} 1)"><rect x="${f1(-L.mw/2)}" y="${-L.h*1.1}" width="${L.mw}" height="${f1(L.h*2.2)}" rx="${f1(L.h*.8)}" style="fill:var(--muscle);opacity:${f1(.45+.5*rec)};stroke:var(--ink);stroke-width:1"/>`;
    for(let i=-2;i<=2;i++)s+=`<line x1="${f1(-L.mw/2+10)}" x2="${f1(L.mw/2-10)}" y1="${f1(i*L.h*.36)}" y2="${f1(i*L.h*.36)}" style="stroke:var(--ink);stroke-width:.8;opacity:.35"/>`;
    s+='</g>'+kitLabel(L.mx+L.mw/2,L.y+L.h*1.1+16,rec>.5?RH_MUS.join(' '):RH_MUS[0],{a:'m'});
    /* labels on the fibre */
    const lab=route==='block'?(rec<.5?R.lab[0]:R.lab[1]):(rec<1&&t>.12?R.lab[1]:R.lab[0]);
    const cx=F.at.cut?F.at.cut[0]:L.x+L.w/2,lx=route==='block'?F.at.nodes[2][0]:(rec<1&&t>.12?Math.min(cx+(o.regrow||0)*(L.x+L.w-cx-10),L.x+L.w-60):cx);
    s+=kitLabel(lx,L.y-L.h/2-22,lab,{a:'m'});
    /* time strip */
    s+=`<line x1="${L.x}" x2="${L.x+L.tw}" y1="${L.ty}" y2="${L.ty}" class="axis"/><line x1="${L.x}" x2="${f1(L.x+L.tw*t)}" y1="${L.ty}" y2="${L.ty}" style="stroke:var(--rec);stroke-width:3"/><circle cx="${f1(L.x+L.tw*t)}" cy="${L.ty}" r="6" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    s+=T(L.x,L.ty+20,R.tl[0],'t-xs')+T(L.x+L.tw,L.ty+20,R.tl[1],'t-xs t-end')+T(L.x+L.tw/2,L.ty+20,R.time,'t-sm t-mid',INK);
    s+=T(L.x,N?L.ty+50:L.ty+38,'Schematic: the two time strips have different scales.','t-xs');
    ns.innerHTML=s;ncap.innerHTML=R.cap}
  const stopN=playWire(nr,$('#rhNPlay'),drawN,9000,'%t:player.replay%','rehab');
  $$('[data-rhr]').forEach(b=>b.addEventListener('click',()=>{route=b.dataset.rhr;$$('[data-rhr]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopN();nr.value=.05;drawN(.05)}));
  drawN(+nr.value);

  /* ---------- 3. exercise schedule comparer ---------- */
  const ds=$('#rhDose'),dc=$('#rhDoseCap'),sMin=$('#rhMin'),sSes=$('#rhSes'),sWk=$('#rhWk');let fill=1,stopD=null;
  function drawD(f){
    const N=vb(ds,'720 236','400 376'),P={min:+sMin.value,ses:+sSes.value,wk:+sWk.value};
    const L=N?{cx:16,cy:46,cw:368,ch:112,rx:16,ry:204,rw:368,rs:54,leg:366}:{cx:20,cy:46,cw:330,ch:126,rx:400,ry:56,rw:300,rs:58,leg:226};
    const cell=L.cw/24,rowh=L.ch/7;let s=T(L.cx,24,'Weeks across, days down','t-xs',INK);
    for(let w=0;w<24;w++)for(let d=0;d<7;d++){const x=L.cx+w*cell,y=L.cy+d*rowh,inPlan=w<P.wk,sess=inPlan&&RH_DAYS[P.ses-1].includes(d),shown=w<P.wk*f;
      s+=`<rect x="${f1(x+1)}" y="${f1(y+1)}" width="${f1(cell-2)}" height="${f1(rowh-2)}" rx="2" style="fill:${inPlan?'var(--panel-2)':'var(--field)'};stroke:var(--line);stroke-width:.6"/>`;
      if(sess&&shown){const hh=(rowh-4)*P.min/90;s+=`<rect x="${f1(x+2)}" y="${f1(y+rowh-2-hh)}" width="${f1(cell-4)}" height="${f1(hh)}" rx="1.5" style="fill:var(--rec)"/>`}}
    s+=T(L.cx,L.cy+L.ch+16,`${P.min*P.ses*P.wk} minutes in all`,'t-sm',INK)+T(L.cx+L.cw,L.cy+L.ch+16,'bar height: session length','t-xs t-end');
    RH_ROWS.forEach((R,i)=>{const y=L.ry+i*L.rs,v=P[R.k],X=q=>L.rx+L.rw*q/R.max;
      s+=T(L.rx,y,R.l,'t-sm','fill:var(--ink)')+T(L.rx+L.rw,y,String(v),'t-lbl t-end');
      s+=`<rect x="${L.rx}" y="${y+8}" width="${L.rw}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
      const band=R.k==='wk'?[RH_REV.wk,R.max]:RH_REV[R.k];s+=`<rect x="${f1(X(band[0]))}" y="${y+8}" width="${f1(Math.max(4,X(band[1])-X(band[0])))}" height="10" rx="5" style="fill:var(--rec);opacity:.45"/>`;
      const sh=RH_SHAH[R.k];(Array.isArray(sh)?sh:[sh]).forEach(q=>{const x=X(q);s+=`<path d="M${f1(x)} ${y+20}l5 7l-5 7l-5 -7z" style="fill:var(--accent);stroke:var(--panel);stroke-width:1"/>`});
      s+=`<circle cx="${f1(X(v))}" cy="${y+13}" r="6" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
      s+=T(L.rx,y+30,'0','t-xs')+T(L.rx+L.rw,y+30,String(R.max),'t-xs t-end')});
    const ly=L.leg,lx=N?L.rx:L.cx;
    s+=`<rect x="${lx}" y="${ly-9}" width="18" height="10" rx="5" style="fill:var(--rec);opacity:.45"/>`+T(lx+24,ly,RH_LEG.rev,'t-xs')
      +`<path d="M${lx+136} ${ly-11}l5 7l-5 7l-5 -7z" style="fill:var(--accent)"/>`+T(lx+146,ly,RH_LEG.shah,'t-xs')
      +`<circle cx="${lx+256}" cy="${ly-4}" r="5" style="fill:var(--ink)"/>`+T(lx+266,ly,RH_LEG.you,'t-xs');
    ds.innerHTML=s;
    const ok={min:P.min>=RH_REV.min[0]&&P.min<=RH_REV.min[1],ses:P.ses>=RH_REV.ses[0]&&P.ses<=RH_REV.ses[1],wk:P.wk>=RH_REV.wk};
    dc.innerHTML=`<b>${P.min} minutes · ${P.ses} per week · ${P.wk} weeks.</b> `+['min','ses','wk'].map(k=>ok[k]?RH_IN[k]:RH_OUT[k]).join(' ')+' '+RH_DOSECAP}
  [sMin,sSes,sWk].forEach(el=>el.addEventListener('change',()=>{if(stopD)stopD();stopD=animate(700,q=>{fill=q;drawD(q)},()=>{fill=1;stopD=null})}));
  drawD(1);
  const prev=redraws.rehab;redraws.rehab=()=>{prev&&prev();drawD(fill)};
};
