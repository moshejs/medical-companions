/* =============== 1.6 the course over time =============== */
/* Time axis: the first 8 weeks are stretched (linear), months and years squeezed (logarithmic), so the slider spends
   its first 55% on days 0-56 and the rest on day 56 to day 730. */
const CO_T8=.55,CO_END=730;
function coDay(t){return t<=CO_T8?56*t/CO_T8:56*Math.pow(CO_END/56,(t-CO_T8)/(1-CO_T8))}
function coTOf(d){return d<=56?d/56*CO_T8:CO_T8+(1-CO_T8)*Math.log(d/56)/Math.log(CO_END/56)}
/* the schematic course: rises to the Italian mean nadir (day 12), holds to the mean first improvement (day 28),
   falls towards the mean clinical recovery (day 200), with a long tail. Shape illustrative [[Italian1996]] */
function coLv(d){if(d<=12)return .06+.94*(1-Math.pow(1-d/12,2));if(d<=28)return 1;
  if(d<=200)return 1-.78*ease(Math.log(d/28)/Math.log(200/28));return .22-.12*clamp(Math.log(d/200)/Math.log(CO_END/200))}
const CO_STEPS=[
 {from:0,at:.012,k:'Day 0',t:'Weakness begins',
  txt:'Weakness, often with tingling or pain, starts in both legs or all four limbs. In IGOS the median time from onset of weakness to hospital admission was 3 days (IQR 2 to 6). [[Doets2018]] Maximum weakness within 24 hours of onset should prompt a search for another diagnosis, [[Leonhard2019]] and the EAN/PNS guideline lists no further worsening after 24 hours as making GBS less likely. [[vanDoorn2023]]',
  pt:'Weakness usually builds over several days, not minutes. People often reach hospital within a few days of it starting.',
  hook:'Nadir in under 24 hours: think of another diagnosis. [[Leonhard2019]]'},
 {from:.03,at:.06,k:'The first days',t:'Progression',
  txt:'Weakness climbs. In 67 Dutch children (median age 5) the progressive phase lasted a median of 6 days, [[Roodbol2017]] and in 156 children the median from weakness to nadir was 8 days. [[Helfferich2022]] In the 2013 to 2014 Zika outbreak in French Polynesia, the median installation phase was 6 days. [[CaoLormeau2016]] In the Italian cohort, 73% had reached their plateau by 1 week and 98% by 4 weeks. [[Italian1996]]',
  pt:'For most people, weakness keeps increasing for some days, up to about 2 weeks.',
  hook:'Children: progressive phase median 6 days, under 4 weeks in all. [[Roodbol2017]]'},
 {from:.09,at:.118,k:'Mean day 12',t:'The worst point',
  txt:'In 297 Italian people followed prospectively, the mean time to nadir was 12 days. [[Italian1996]] Of 494 Dutch adults, 80% had reached nadir by 2 weeks, 97% by 4 weeks and all by 6 weeks. [[Fokke2014]] The EAN/PNS guideline requires worsening for no more than 4 weeks and notes that progression almost never exceeds 4 weeks. [[vanDoorn2023]] In IGOS, 19% were ventilated. [[Doets2018]]',
  pt:'The weakest point usually comes within about 2 weeks, and almost always within 4.',
  hook:'Nadir: 80% by 2 weeks, 97% by 4 weeks, 100% by 6 weeks (494 Dutch adults). [[Fokke2014]]'},
 {from:.14,at:.2,k:'Days to weeks',t:'The plateau',
  txt:'After the progressive phase comes a plateau lasting days, weeks or months. [[Leonhard2019]] Its length is thinly reported: in French Polynesia the median was 4 days (IQR 3 to 10). [[CaoLormeau2016]] In a small series of 6 treated people, a longer plateau went with less recovery of knee and elbow strength. [[ElMhandi2007]]',
  pt:'Then comes a flat stretch: no worse, not yet better. It can be short or long.',
  hook:'Plateau: median 4 days in the French Polynesia outbreak, the best direct figure. [[CaoLormeau2016]]'},
 {from:.27,at:.3,k:'Mean day 28',t:'Recovery begins',
  txt:'In the Italian cohort the mean time to first improvement was 28 days; improvement had begun within the first week in 36% and within 4 weeks in 85%. [[Italian1996]] Up to two-thirds of deaths in GBS occur in the recovery phase, mostly from heart and breathing problems, so monitoring continues after the nadir. [[Leonhard2019]] In a Dutch cohort, 67% of deaths came in the recovery phase. [[vanDenBerg2013]]',
  pt:'Improvement usually starts within a few weeks. Checks and care continue, because problems can still happen while things get better.',
  hook:'Up to two-thirds of deaths occur in the recovery phase. [[Leonhard2019,vanDenBerg2013]]'},
 {from:.4,at:.47,k:'Up to 8 weeks',t:'Watching for a dip',
  txt:'Treatment-related fluctuations, worsening within 2 months after a first improvement or stabilisation on treatment, occur in 6 to 10%. [[Leonhard2019]] In 170 people followed prospectively, the first fluctuation always came within 8 weeks of onset (median 18 days, range 10 to 54). [[Ruts2010]] Worsening after 8 weeks, or 3 or more times, raises acute-onset CIDP, the final diagnosis in about 5%. [[Ruts2010,vanDoorn2023]] The explorer further down shows the patterns.',
  pt:'Some people get a bit worse again after first improving. This can be part of GBS. Worsening that goes on past about 8 weeks may point to a related long-term condition, CIDP.',
  hook:'A-CIDP: 3 or more fluctuations, or worsening 8 weeks or more after onset. [[Ruts2010,vanDoorn2023]]'},
 {from:.55,at:.757,k:'Months',t:'The long climb back',
  txt:'Mean time to clinical recovery in the Italian cohort was 200 days; 57% had recovered at 6 months, 70% at 12 months and 82% at 24 months. [[Italian1996]] About 80% regain independent walking by 6 months. [[Leonhard2019]] In IGOS the median time to walking independently was 63 days in Europe/Americas, 39 in Asia and 95 in Bangladesh. [[Doets2018]] In 76 people treated in intensive care it was 198 days. [[Dhar2008]]',
  pt:'Recovery is usually slow, over months. Most of the gain comes in the first year.',
  hook:'Italian cohort means: nadir 12 days, first improvement 28, clinical recovery 200. [[Italian1996]]'},
 {from:.86,at:.95,k:'Years',t:'Gains continue',
  txt:'In a Swedish cohort of 42, recovery happened mainly in the first year, and motor and sensory problems were each still detectable in more than half at 2 years. [[Forsberg2004Impairment]] Among people treated in intensive care, 19% improved by at least one functional grade after 1 year. [[Fletcher2000]] Recovery from remaining complaints may still occur more than 5 years after onset, [[Leonhard2019]] and in one intensive care cohort as late as 10 years. [[Dhar2008]]',
  pt:'Progress can keep coming for years. Tiredness, pain or some weakness can remain, even after a good recovery.',
  hook:'Fastest in the first year, but recovery can continue for more than 5 years. [[Leonhard2019]]'}
];
const CO_TICKS=[{d:0,l:'0'},{d:7,l:'1 wk',w:1},{d:14,l:'2 wk'},{d:28,l:'4 wk'},{d:56,l:'8 wk'},{d:182,l:'6 mo'},{d:365,l:'1 yr'},{d:730,l:'2 yr'}];
const CO_MARK=[{d:12,n:'1'},{d:28,n:'2'},{d:200,n:'3'}];
const CO_FS=[{d:0,l:'a healthy fibre'},{d:1,l:'myelin being stripped'},{d:12,l:'signals blocked'},{d:28,l:'thin new myelin forming'},{d:200,l:'thin new myelin'}];
const CO_LBL={a:'disability over time (schematic)',b:'share of people (dots published, lines schematic)',worse:'worse',better:'better',x:'time since weakness began',fibre:'nerve fibre'};
const CO_UNIT={d:'Day',m:'Month',y:'Year'};
/* cumulative series: published points with the sentence each one supports */
const CO_SER=[
 {id:'nad',lab:'worst point reached',col:'var(--rx)',dash:'',none:'Worst point: the first published point is at 2 weeks. [[Fokke2014]]',
  P:[{d:14,v:80,txt:'80% of Dutch adults had reached their worst point by 2 weeks. [[Fokke2014]]'},{d:28,v:97,txt:'97% had reached their worst point by 4 weeks. [[Fokke2014]]'},{d:42,v:100,txt:'All had reached their worst point by 6 weeks. [[Fokke2014]]'}]},
 {id:'imp',lab:'improvement begun',col:'var(--accent)',dash:'7 4',none:'Improvement: the first published point is at 1 week. [[Italian1996]]',
  P:[{d:7,v:36,txt:'Improvement had begun in 36% of the Italian cohort by 1 week. [[Italian1996]]'},{d:28,v:85,txt:'Improvement had begun in 85% by 4 weeks. [[Italian1996]]'}]},
 {id:'rec',lab:'clinically recovered',col:'var(--rec)',dash:'2 3',none:'Recovery: the first published point is at 1 week. [[Italian1996]]',
  P:[{d:7,v:4,txt:'4% of the Italian cohort had clinically recovered at 1 week. [[Italian1996]]'},{d:28,v:24,txt:'24% had clinically recovered at 4 weeks. [[Italian1996]]'},{d:182,v:57,txt:'57% had clinically recovered at 6 months. [[Italian1996]]'},{d:365,v:70,txt:'70% had clinically recovered at 12 months. [[Italian1996]]'},{d:730,v:82,txt:'82% had clinically recovered at 24 months. [[Italian1996]]'}]}
];
/* the Swedish cohort, n=42 [[Forsberg2004Impairment,Forsberg2005Disability]] */
const CO_SW_T=['2 weeks','1 year','2 years'];
const CO_SW=[
 {n:'Could not walk 10 m alone',v:[62,10,7]},
 {n:'Overall strength below normal',v:[100,62,55]},
 {n:'Grip strength below normal',v:[98,38,31]},
 {n:'Sensation affected',v:[93,55,52]},
 {n:'Face muscles affected',v:[38,14,12]},
 {n:'Needed help with personal care',v:[76,14,12]},
 {n:'Needed help with household tasks',v:[98,28,26]}
];
const CO_SW_HEAD='% of the 42 people at each examination; dashed outline: the 2-week value';
const CO_SW_NOTE=[
 {k:'2 weeks',t:'Early on, nearly everything is affected',txt:'At 2 weeks almost everyone had weaker muscles and changed sensation, 62% could not walk 10 metres on their own, and everyone who had been working was unable to work. [[Forsberg2004Impairment,Forsberg2005Disability]]'},
 {k:'1 year',t:'Most of the recovery has happened',txt:'By 1 year, 10% could not walk 10 metres alone and 14% needed help with personal care. Yet 62% still had below-normal strength and 55% changed sensation: walking returns before strength is fully back. [[Forsberg2004Impairment,Forsberg2005Disability]]'},
 {k:'2 years',t:'Slower change, real gains',txt:'Between 1 and 2 years the figures moved only a little. Motor and sensory problems were each still detectable in more than half, and 17% of those who had worked before were unable to work. [[Forsberg2004Impairment,Forsberg2005Disability]] Recovery from remaining complaints can still occur more than 5 years after onset. [[Leonhard2019]]'}
];
/* fluctuation patterns: schematic shapes in weeks; tx = treatment marks; pk = worsening peaks */
const CO_FL=[
 {id:'mono',n:'One course',P:[ [0,0],[1.7,1],[3,1],[6,.74],[10,.5],[16,.35] ],tx:[1],pk:[],
  k:'Monophasic',t:'One rise, a plateau, recovery',
  txt:'This is the usual pattern. In 494 Dutch adults, 95% had a monophasic course, and 10% of those had a treatment-related fluctuation within it. [[Fokke2014]] Among 67 Dutch children, 97% had a monophasic course. [[Roodbol2017]]'},
 {id:'trf',n:'Treatment-related fluctuation',P:[ [0,0],[1.6,1],[2.4,.98],[3.6,.72],[4.6,.93],[5.4,.9],[8,.62],[12,.45],[16,.38] ],tx:[1,4.6],pk:[4.6],
  k:'Treatment-related fluctuation',t:'Better, then worse again, within 8 weeks',
  txt:'Worsening within 2 months after a first improvement or stabilisation on treatment, in 6 to 10%. [[Leonhard2019]] In 170 people the first fluctuation came at a median of 18 days (range 10 to 54), always within 8 weeks; 31% of those had a second and none a third. [[Ruts2010]] It was not related to whether plasma exchange or IVIg was given. [[Visser1998]] The EAN/PNS guideline suggests considering repeat treatment, on observational evidence (quoted as published, not as instructions). [[vanDoorn2023]]'},
 {id:'acidp',n:'Acute-onset CIDP pattern',P:[ [0,0],[2,.9],[4,.66],[5.8,.88],[7.4,.7],[10,.97],[12,.95],[16,.82] ],tx:[1,5.8,10],pk:[5.8,10],
  k:'Acute-onset CIDP',t:'Worse again past 8 weeks, or 3 or more times',
  txt:'About 5% of people first diagnosed with GBS turn out to have A-CIDP. [[vanDoorn2023,Leonhard2019]] Further worsening after 8 weeks had a sensitivity of 100% and specificity of 92%; 3 or more fluctuations, 52% and 96%. [[vanDoorn2023]] A-CIDP cannot be confirmed unless worsening continues at least 8 weeks after onset. [[vanDoorn2023]] Marked sensory signs and no facial, swallowing or breathing weakness make it possibly more likely. [[vanDoorn2023]]'}
];
const CO_FL_LBL={x:'weeks since weakness began',w8:'8 weeks from onset',tx:'treatment',worse:'worse',better:'better'};

inits.course=()=>{
  /* ---------- the course player ---------- */
  const svg=$('#coSvg'),rg=$('#coT'),read=$('#coRead');
  const serF=S=>{const P=[{d:0,v:0}].concat(S.P);return d=>{if(d>=P[P.length-1].d)return P[P.length-1].v;let i=0;while(d>P[i+1].d)i++;return lerp(P[i].v,P[i+1].v,(d-P[i].d)/(P[i+1].d-P[i].d))}};
  const SF=CO_SER.map(serF);
  function draw(t){
    const N=vb(svg,'720 400','400 640');
    const L=N?{bx:70,by:24,bs:170,dx:150,dy:58,da:'',py:78,fx:150,fw:234,fy:142,fh:24,fly:102,fsy:182,ax:40,aw:344,ay:244,ah:122,aty:232,bx2:40,by2:420,bh:170,bty:406,tky:606,tly:624}
             :{bx:84,by:36,bs:186,dx:84,dy:262,da:'t-mid',py:282,fx:12,fw:144,fy:334,fh:22,fly:298,fsy:368,ax:190,aw:514,ay:34,ah:128,aty:24,bx2:190,by2:214,bh:140,bty:204,tky:370,tly:388};
    const d=coDay(t),p=phaseOf(CO_STEPS,t),P=CO_STEPS[p],X=dd=>L.ax+L.aw*coTOf(dd);
    const YA=v=>L.ay+L.ah-6-(L.ah-22)*v,YB=v=>L.by2+L.bh-L.bh*v/110;
    let s='';
    /* body, day readout, fibre */
    s+=bodyFront(L.bx,L.by,L.bs,{level:coLv(d)*.8,tingle:d<200?.8:.3}).svg;
    const dTxt=d<56?`${CO_UNIT.d} ${Math.round(d)}`:d<365?`${CO_UNIT.m} ${Math.round(d/30.44)}`:`${CO_UNIT.y} ${(d/365).toFixed(1)}`;
    s+=`<text x="${L.dx}" y="${L.dy}" class="t-big ${L.da}" style="font-size:26px">${dTxt}</text><text x="${L.dx}" y="${L.py}" class="t-sm ${L.da}" style="fill:var(--ink)">${P.k}</text>`;
    const demy=ramp(d,1,12),remy=ramp(Math.log(Math.max(d,1)),Math.log(28),Math.log(200));
    const nv=nerveFibre(L.fx,L.fy,L.fw,{n:N?4:3,h:L.fh,demy:[demy*.8,demy,demy*.6,demy*.3],remy:[remy,remy,remy,remy],mac:[0,demy*(1-remy),0,0],pulse:(t*40)%1,block:d>=6&&d<30?1:undefined});
    let fs=CO_FS[0].l;CO_FS.forEach(f=>{if(d>=f.d)fs=f.l});
    s+=`<text x="${L.fx}" y="${L.fly}" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_LBL.fibre}</text>`+nv.svg+kitLabel(L.fx+L.fw/2,L.fsy,fs,{a:'m'});
    /* shared grid */
    const grid=(y,h)=>CO_TICKS.filter(k=>!(N&&k.w)).map(k=>`<line x1="${f1(X(k.d))}" x2="${f1(X(k.d))}" y1="${y}" y2="${y+h}" class="grid"/>`).join('');
    /* panel A: schematic course */
    s+=`<text x="${L.ax}" y="${L.aty}" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_LBL.a}</text><rect x="${L.ax}" y="${L.ay}" width="${L.aw}" height="${L.ah}" style="fill:var(--field)"/>`+grid(L.ay,L.ah);
    s+=`<text x="${L.ax-6}" y="${L.ay+12}" class="t-xs t-end">${CO_LBL.worse}</text><text x="${L.ax-6}" y="${L.ay+L.ah-2}" class="t-xs t-end">${CO_LBL.better}</text>`;
    const pathA=(t1)=>{let q='';const n=Math.max(2,Math.round(220*t1));for(let i=0;i<=n;i++){const tt=t1*i/n,dd=coDay(tt);q+=(i?'L':'M')+f1(X(dd))+' '+f1(YA(coLv(dd)))}return q};
    s+=`<path d="${pathA(1)}" style="fill:none;stroke:var(--weak);stroke-width:1.6;stroke-dasharray:3 4;opacity:.55"/>`;
    const pa=pathA(t);s+=`<path d="${pa}L${f1(X(d))} ${L.ay+L.ah}L${L.ax} ${L.ay+L.ah}Z" style="fill:var(--weak);opacity:.18"/><path d="${pa}" style="fill:none;stroke:var(--weak);stroke-width:3;stroke-linejoin:round"/>`;
    CO_MARK.forEach(m=>{const on=d>=m.d,x=X(m.d),y=YA(coLv(m.d));s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1.6"/><text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700">${m.n}</text>`});
    /* panel B: cumulative shares */
    s+=`<text x="${L.bx2}" y="${L.bty}" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_LBL.b}</text><rect x="${L.bx2}" y="${L.by2}" width="${L.aw}" height="${L.bh}" style="fill:var(--field)"/>`+grid(L.by2,L.bh);
    [0,50,100].forEach(v=>{s+=`<line x1="${L.bx2}" x2="${L.bx2+L.aw}" y1="${f1(YB(v))}" y2="${f1(YB(v))}" class="grid"/><text x="${L.bx2-6}" y="${f1(YB(v)+3)}" class="t-xs t-end">${v}%</text>`});
    CO_SER.forEach((S,j)=>{const f=SF[j],end=S.P[S.P.length-1].d;
      const path=(dmax)=>{let q='';const t1=coTOf(Math.min(dmax,end)),n=Math.max(2,Math.round(200*t1));for(let i=0;i<=n;i++){const dd=coDay(t1*i/n);q+=(i?'L':'M')+f1(X(dd))+' '+f1(YB(f(dd)))}return q};
      s+=`<path d="${path(end)}" style="fill:none;stroke:${S.col};stroke-width:1.4;opacity:.3${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
      if(d>0)s+=`<path d="${path(d)}" style="fill:none;stroke:${S.col};stroke-width:3;stroke-linejoin:round${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
      S.P.forEach(q=>{const on=d>=q.d;s+=`<circle cx="${f1(X(q.d))}" cy="${f1(YB(q.v))}" r="${on?4.2:3.2}" style="fill:${on?S.col:'var(--panel)'};stroke:${S.col};stroke-width:1.6"/>`});
      const ex=X(end),ev=S.P[S.P.length-1].v,reached=d>=end;
      const lp=S.id==='nad'?[ex+6,YB(ev)+4,'']:S.id==='imp'?[ex+6,YB(ev)+14,'']:[ex-2,YB(ev)-9,'t-end'];
      s+=`<text x="${f1(lp[0])}" y="${f1(lp[1])}" class="t-xs ${lp[2]}" style="fill:var(--ink);font-weight:700;opacity:${reached?1:.6}">${S.lab}</text>`});
    /* now line and axis */
    s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${L.ay-4}" y2="${L.by2+L.bh+4}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=`<line x1="${L.bx2}" x2="${L.bx2+L.aw}" y1="${L.by2+L.bh}" y2="${L.by2+L.bh}" class="axis"/>`;
    CO_TICKS.filter(k=>!(N&&k.w)).forEach(k=>{const x=X(k.d),last=k.d===CO_END;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.by2+L.bh}" y2="${L.by2+L.bh+4}" class="axis"/><text x="${f1(last?x+2:x)}" y="${L.tky}" class="t-xs ${last?'t-end':'t-mid'}">${k.l}</text>`});
    s+=`<text x="${L.bx2+L.aw}" y="${L.tly}" class="t-xs t-end">${CO_LBL.x}</text>`;
    s+=`<circle cx="${f1(X(d))}" cy="${f1(YA(coLv(d)))}" r="5" style="fill:var(--weak);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    setSt(p);$('#coNote').innerHTML=noteHTML(P);
    read.innerHTML=CO_SER.map(S=>{let tx=S.none;S.P.forEach(q=>{if(d>=q.d)tx=q.txt});return `<p><i class="${S.id}" aria-hidden="true"></i><span>${tx}</span></p>`}).join('');
  }
  const stop=playWire(rg,$('#coPlay'),draw,24000,'%t:player.replay%','course');
  const setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the Swedish cohort ---------- */
  const ssv=$('#coSw'),sb=$('#coSwBtns'),snote=$('#coSwNote');let si=0,cur=CO_SW.map(r=>r.v[0]),stopS=null;
  sb.innerHTML=CO_SW_T.map((x,i)=>`<button class="btn" data-w="${i}" aria-pressed="${i===0}">${x}</button>`).join('');
  function drawSw(){
    const N=vb(ssv,'720 330','400 370');
    const L=N?{x0:16,bw:310,y0:40,rh:46,ly:12,by:18}:{x0:290,bw:340,y0:42,rh:40,ly:16,by:5};
    let s=`<text x="16" y="20" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_SW_HEAD}</text>`;
    CO_SW.forEach((r,i)=>{const y=L.y0+i*L.rh,v=cur[i],g=r.v[0];
      s+=`<text x="16" y="${y+L.ly}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text>`;
      s+=`<rect x="${L.x0}" y="${y+L.by}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.x0}" y="${y+L.by}" width="${f1(Math.max(3,L.bw*v/100))}" height="14" rx="4" style="fill:var(--rec)"/>`;
      if(si>0)s+=`<rect x="${L.x0}" y="${y+L.by-2}" width="${f1(L.bw*g/100)}" height="18" rx="5" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3;opacity:.7"/>`;
      s+=`<text x="${L.x0+L.bw+6}" y="${y+L.by+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${Math.round(v)}%</text>`});
    ssv.innerHTML=s;
    const n=CO_SW_NOTE[si];snote.innerHTML=`<div class="kicker">${n.k}</div><h4>${n.t}</h4><p>${n.txt}</p>`;
  }
  sb.addEventListener('click',e=>{const b=e.target.closest('[data-w]');if(!b)return;si=+b.dataset.w;$$('[data-w]',sb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    const from=cur.slice(),to=CO_SW.map(r=>r.v[si]);stopS&&stopS();stopS=animate(700,q=>{const e2=ease(q);cur=from.map((v,i)=>lerp(v,to[i],e2));drawSw()},()=>{stopS=null;cur=to;drawSw()})});
  drawSw();

  /* ---------- fluctuation explorer ---------- */
  const fsv=$('#coFl'),frg=$('#coFlT'),fb=$('#coFlBtns'),fnote=$('#coFlNote');let fi=0;
  const FF=CO_FL.map(c=>monoFn(c.P));
  fb.innerHTML=CO_FL.map((c,i)=>`<button class="btn" data-f="${i}" aria-pressed="${i===0}">${c.n}</button>`).join('');
  function drawFl(t){
    const N=vb(fsv,'720 300','400 320');
    const L=N?{x:40,w:344,y:52,h:200,tk:4,ty:268,xl:286}:{x:56,w:644,y:46,h:194,tk:2,ty:256,xl:274};
    const c=CO_FL[fi],f=FF[fi],wk=16*t,X=w=>L.x+L.w*w/16,Y=v=>L.y+L.h-8-(L.h-30)*v;
    let s=`<text x="${L.x}" y="18" class="t-sm" style="fill:var(--ink);font-weight:700">${c.k}</text>`;
    s+=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    for(let w=0;w<=16;w+=L.tk){s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${L.y+L.h}" y2="${L.y+L.h+4}" class="axis"/><text x="${f1(X(w))}" y="${L.ty}" class="t-xs t-mid">${w}</text>`}
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${L.y+L.h}" y2="${L.y+L.h}" class="axis"/><text x="${L.x+L.w}" y="${L.xl}" class="t-xs t-end">${CO_FL_LBL.x}</text>`;
    s+=`<text x="${L.x-6}" y="${L.y+12}" class="t-xs t-end">${CO_FL_LBL.worse}</text><text x="${L.x-6}" y="${L.y+L.h-2}" class="t-xs t-end">${CO_FL_LBL.better}</text>`;
    s+=`<rect x="${f1(X(8))}" y="${L.y}" width="${f1(X(16)-X(8))}" height="${L.h}" style="fill:var(--warn-soft);opacity:.6"/><line x1="${f1(X(8))}" x2="${f1(X(8))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    s+=`<text x="${f1(X(8)+5)}" y="${L.y+L.h-12}" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_FL_LBL.w8}</text>`;
    let full='',cur2='';for(let i=0;i<=160;i++){const w=16*i/160,pt=f1(X(w))+' '+f1(Y(f(w)));full+=(i?'L':'M')+pt;if(w<=wk)cur2+=(i?'L':'M')+pt}
    s+=`<path d="${full}" style="fill:none;stroke:var(--weak);stroke-width:1.4;stroke-dasharray:3 4;opacity:.5"/>`;
    if(cur2)s+=`<path d="${cur2}" style="fill:none;stroke:var(--weak);stroke-width:3.2;stroke-linejoin:round"/>`;
    c.tx.forEach(w=>{if(wk<w)return;const x=X(w);s+=`<path d="M${f1(x-6)} ${L.y+2}L${f1(x+6)} ${L.y+2}L${f1(x)} ${L.y+12}Z" style="fill:var(--rx)"/><text x="${f1(x)}" y="${L.y-6}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${CO_FL_LBL.tx}</text>`});
    c.pk.forEach((w,i)=>{if(wk<w)return;const x=X(w)+16,y=Y(f(w))+2;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.6"/><text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">${i+1}</text>`});
    s+=`<circle cx="${f1(X(wk))}" cy="${f1(Y(f(wk)))}" r="5" style="fill:var(--weak);stroke:var(--panel);stroke-width:2"/>`;
    fsv.innerHTML=s;
    fnote.innerHTML=`<div class="kicker">${c.k}</div><h4>${c.t}</h4><p>${c.txt}</p>`;
  }
  const stopF=playWire(frg,$('#coFlPlay'),drawFl,7000,'%t:player.replay%','course');
  fb.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;fi=+b.dataset.f;$$('[data-f]',fb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    stopF();frg.value=0;drawFl(0);$('#coFlPlay').click()});
  drawFl(+frg.value);
  const prev=redraws.course;redraws.course=()=>{prev&&prev();drawSw()};
  const prevH=onHide.course;onHide.course=()=>{prevH&&prevH();stopS&&stopS();stopS=null;cur=CO_SW.map(r=>r.v[si])};
};
