/* =============== 4.1 Prognosis: EGOS & mEGOS =============== */
/* Three widgets: (1) the main player, two blocks of 100 people regaining walking over time, scaled from
   published cohort proportions (pass G); (2) a points calculator for mEGOS at admission, mEGOS at day 7 and
   EGOS, which shows how the published tables add up and never gives a per-person risk; (3) mortality bars
   in three views. Every number is from research file G; movement between published time points is schematic. */
const PG_AX=[
 {l:'4 weeks',s:'4 wk'},{l:'3 months',s:'3 mo'},{l:'6 months',s:'6 mo'},{l:'1 year',s:'1 yr'},{l:'2 years and later',s:'later'}];
/* each step: the two panels. v = people in 100 not yet walking alone (scaled from the published proportion) */
const PG_STEPS=[
 {from:0,at:.04,k:'Week 4',t:'Four weeks: most cannot yet walk alone',sv:'Four weeks after onset',
  P:[{h:'Netherlands',sub:'all treated with IVIg or plasma exchange',v:55,big:'55%',c1:'could not',c2:'walk alone',n:'217 of 394'},
     {h:'Bangladesh',sub:'86% supportive care only',v:66,big:'66%',c1:'could not',c2:'walk alone',n:'321 of 489'}],
  txt:'In the Dutch cohort used to build mEGOS, everyone was treated with IVIg or plasma exchange, and 55% (217 of 394) still could not walk independently at 4 weeks. In a Bangladeshi cohort of 506 people, where 86% had supportive care only, the figure was 66% (321 of 489) [[Papri2022mEGOS]]. Most people reach their weakest point within 2 weeks [[Leonhard2019]], so at 4 weeks many are only starting to recover.',
  pt:'A month after GBS starts, more than half of people still cannot walk on their own. That is expected, and it is not the end of the story [[Papri2022mEGOS,Leonhard2019]].',
  hook:'Unable to walk independently means a GBS disability score above 2 [[Papri2022mEGOS]].'},
 {from:.2,at:.3,k:'Month 3',t:'Three months: walking returns for many',sv:'Three months after onset',
  P:[{h:'Netherlands',sub:'all treated with IVIg or plasma exchange',v:29,big:'29%',c1:'could not',c2:'walk alone',n:'111 of 389'},
     {h:'Bangladesh',sub:'86% supportive care only',v:44,big:'44%',c1:'could not',c2:'walk alone',n:'211 of 484'}],
  txt:'By 3 months the share unable to walk independently had fallen to 29% (111 of 389) in the Dutch cohort and 44% (211 of 484) in Bangladesh [[Papri2022mEGOS]]. The cohorts differed in more than treatment: median age 28 against 52 years, and preceding diarrhoea in 51% against 23% [[Papri2022mEGOS]].',
  pt:'Three months in, about 7 in 10 people in the Dutch group were walking on their own again [[Papri2022mEGOS]].',
  hook:'mEGOS predicts inability to walk unaided at 4 weeks, 3 months and 6 months [[Walgaard2011]].'},
 {from:.42,at:.52,k:'Month 6',t:'Six months: about 8 in 10 walk alone',sv:'Six months after onset',
  P:[{h:'Netherlands',sub:'all treated with IVIg or plasma exchange',v:19,big:'19%',c1:'could not',c2:'walk alone',n:'74 of 388'},
     {h:'Bangladesh',sub:'86% supportive care only',v:29,big:'29%',c1:'could not',c2:'walk alone',n:'141 of 480'}],
  txt:'At 6 months, 19% (74 of 388) of the Dutch cohort and 29% (141 of 480) of the Bangladeshi cohort could not walk independently [[Papri2022mEGOS]]. Across studies, about 80% of people with GBS regain independent walking at 6 months [[Leonhard2019]], and about 20% are still unable to walk unaided despite treatment [[vanDoorn2008]].',
  pt:'About 8 in 10 people can walk on their own by 6 months after GBS starts. This is a group figure, not a promise for one person [[Leonhard2019]].',
  hook:'About 80% walk independently at 6 months; about 20% do not, despite treatment [[Leonhard2019,vanDoorn2008]].'},
 {from:.64,at:.74,k:'Year 1 · IGOS',t:'One year, around the world',sv:'One year: the IGOS cohort',
  P:[{h:'IGOS: Europe and Americas',sub:'a different, international cohort',v:17,big:'83%',c1:'walked',c2:'unaided',n:'334 of 404'},
     {h:'IGOS: Bangladesh',sub:'a different, international cohort',v:31,big:'69%',c1:'walked',c2:'unaided',n:'67 of 97'}],
  txt:'The panels now switch to the International GBS Outcome Study (IGOS). Among its first 1000 inclusions, the share walking unaided at 1 year was 83% (334 of 404) in Europe and the Americas, 69% (67 of 97) in Bangladesh and 91% (31 of 34) in the rest of Asia [[Doets2018]]. Mortality in IGOS also differed by region, 17% in Bangladesh against 5% in Europe and the Americas [[Doets2018]].',
  pt:'A year after GBS, most people in every region were walking without help, but fewer in Bangladesh, where treatment and intensive care are harder to get [[Doets2018,Papri2022mEGOS]].',
  hook:'Regional differences in IGOS: walking unaided at 1 year 91% (Asia without Bangladesh), 83% (Europe/Americas), 69% (Bangladesh) [[Doets2018]].'},
 {from:.84,at:.95,k:'Later',t:'After the first year: slower gains that still count',sv:'Later: gains continue',
  P:[{h:'Sweden, 2 years',sub:'42 adults followed from onset',v:7,big:'7%',c1:'could not',c2:'walk 10 m alone',n:'from 62% at 2 weeks'},
     {h:'After prolonged ventilation',sub:'26 people, median 93 days ventilated',v:42,big:'58%',c1:'walked unaided',c2:'at last follow-up',n:'31% after year 1'}],
  txt:'In a Swedish cohort of 42 adults, 62% could not walk 10 m independently at 2 weeks, 10% at 1 year and 7% at 2 years; recovery came mainly in the first year [[Forsberg2004Impairment]]. In a group with prolonged ventilation (median 93 days), 58% walked unaided at the last follow-up, and 31% got there more than a year after diagnosis [[vanDenBerg2018]]. Recovery from residual complaints may still happen more than 5 years after onset [[Leonhard2019]].',
  pt:'Recovery can keep going for years. Some people first walk again more than a year after becoming ill [[vanDenBerg2018,Hiraga2005]].',
  hook:'Most recovery happens in the first year, but late gains are real: beyond 1 year, 19% of ICU survivors improved by at least one grade [[Forsberg2004Impairment,Fletcher2000]].'}
];
const PG_LEG={walk:'walking alone',not:'not yet walking alone'};
/* calculator tables, as published (Papri2022mEGOS, Busl2023) */
const PG_SC={
 adm:{name:'mEGOS at admission',max:9,age:[0,1,2],dia:[0,1],str:[0,2,4,6],sl:'MRC sum score',thr:6},
 d7:{name:'mEGOS at day 7',max:12,age:[0,1,2],dia:[0,1],str:[0,3,6,9],sl:'MRC sum score',thr:6},
 egos:{name:'EGOS at 2 weeks',max:7,age:[0,.5,1],dia:[0,1],str:null,sl:'Disability score',thr:null}};
const PG_CAP={
 adm:'mEGOS at admission adds age, preceding diarrhoea and the MRC sum score, for a range of 0 to 9. In the development data it separated outcomes with an AUC of 0.73 to 0.77 [[Walgaard2011]]. A higher total means a higher estimated chance, in a group of people like the cohort, of being unable to walk unaided at 4 weeks, 3 months and 6 months.',
 d7:'mEGOS at day 7 uses the same items with heavier weights for muscle strength, for a range of 0 to 12. A week of watching sharpens the estimate: AUC 0.84 to 0.87 [[Walgaard2011]]. The SID-GBS trial used mEGOS of 6 or more to define a poor prognosis [[Walgaard2021]].',
 egos:'EGOS is scored 2 weeks after hospital entry from age, diarrhoea within 4 weeks and the GBS disability score, for a range of 1 to 7. In the derivation cohort, predicted inability to walk independently at 6 months ran from 1% at the lowest score to 83% at the highest (AUC 0.85) [[vanKoningsveld2007]]. In a Swedish cohort of 29 it only partly predicted disability at 2 and 10 years [[Forsberg2012Decade]].'};
const PG_THR='6 or more: SID-GBS poor prognosis';
const PG_EG=['score 1: about 1%','score 7: 83%'];
const PG_POP='Population figures from the derivation cohorts, never a forecast for one person.';
/* mortality views */
const PG_MORT={
 phase:{unit:'Share of 15 deaths in a Dutch cohort of 527',max:100,col:'var(--weak)',rows:[
   {l:'Progressive phase',v:20,n:'3 deaths'},{l:'Plateau',v:13,n:'2 deaths'},{l:'Recovery phase',v:67,n:'10 deaths'}],
   cap:'Of 15 deaths among 527 Dutch trial and cohort patients, 3 (20%) came in the progressive phase, 2 (13%) in the plateau and 10 (67%) in the recovery phase. Only 7 (47%) died in intensive care [[vanDenBerg2013]]. Deaths are most often from heart and breathing complications [[Leonhard2019,vanDoorn2008]].'},
 region:{unit:'Deaths in the IGOS cohort, by region',max:20,col:'var(--rx)',rows:[
   {l:'Bangladesh',v:17,n:'19 of 114'},{l:'Europe and the Americas',v:5,n:'23 of 486'},{l:'Asia, not Bangladesh',v:2,n:'1 of 45'}],
   cap:'In IGOS, 17% died in Bangladesh, 5% in Europe and the Americas and 2% elsewhere in Asia [[Doets2018]]. In a Dhaka cohort of 407, 12% died at a median of 18 days, and the lack of a ventilator when needed was the strongest risk factor (HR 11.9); 10 deaths were due to no ventilator being available [[Ishaque2017]]. Mortality among ventilated people ranged from 8.3 to 20% across seven studies [[deBoisanger2016]].'},
 den:{unit:'Deaths in Denmark: 2414 people with GBS and 23,909 matched people',max:10,col:'var(--rx)',rows:[
   {l:'GBS, first 6 months',v:4.8,n:''},{l:'Matched, first 6 months',v:.8,n:'',pop:1},{l:'GBS, 6 months to 4 years',v:7.6,n:'HR 1.5'},{l:'Matched, 6 months to 4 years',v:5.8,n:'',pop:1}],
   cap:'In a Danish population cohort, deaths in the first 6 months were 4.8% after GBS against 0.8% in matched people, and from 6 months to 4 years 7.6% against 5.8% (HR 1.5). After 4 years the risk matched the general population (HR 1.1) [[Levison2022Mortality]]. In US hospitals, in-hospital mortality was 2.58%, and intubation was a predictor (adjusted OR 5.09) [[Alshekhlee2008]].'}};

/* walking after ventilation (vanDenBerg2018): figures in 100 walking unaided */
const PG_VENT={
 m6:{P:[{h:'Shorter ventilation',sub:'trial patients, walking at 6 months',v:76,big:'76%'},{h:'Ventilated over 2 months',sub:'trial patients, walking at 6 months',v:18,big:'18%'}],
  cap:'Of 526 trial patients, 28% were ventilated and 6% needed ventilation for more than 2 months. At 6 months, 18% of those with prolonged ventilation walked unaided, against 76% after shorter ventilation (P&lt;0.001) [[vanDenBerg2018]].'},
 last:{P:[{h:'Shorter ventilation',sub:'no later figure in this study',v:76,big:'76%'},{h:'Long-ventilated group',sub:'26 people, at last follow-up',v:58,big:'58%'}],
  cap:'In a separate group of 26 people ventilated for a median of 93 days, 58% walked unaided at the last follow-up, and 31% reached this more than 1 year after diagnosis. Prolonged ventilation is a slower road, not a closed one [[vanDenBerg2018]]. In a 20-year intensive care series, 79% of survivors regained independent walking [[Fletcher2000]].'}};
const PG_VLEG='walking unaided';
inits.prognosis=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- 1. main player: two blocks of 100 ---------- */
  const svg=$('#pgSvg'),rg=$('#pgT'),note=$('#pgNote');let setSt=()=>{};
  function pgVal(t,p,j){const S=PG_STEPS[p];if(p===0)return S.P[j].v;return lerp(PG_STEPS[p-1].P[j].v,S.P[j].v,ease(ramp(t,S.from,S.at)))}
  function pgPos(t){const A=PG_STEPS.map(s=>s.at);if(t<=A[0])return 0;for(let i=0;i<A.length-1;i++)if(t<=A[i+1])return i+(t-A[i])/(A[i+1]-A[i]);return A.length-1}
  function pgGrid(x,y,v){const k=100-Math.round(v);let s='';
    for(let i=0;i<100;i++){const cx=x+(i%10)*20+7.5,cy=y+Math.floor(i/10)*22;
      s+=i<k?person(cx,cy,15,'var(--rec)'):`<circle cx="${f1(cx)}" cy="${f1(cy+8)}" r="4.6" style="fill:var(--weak);opacity:.85"/>`}
    return s}
  function pgPanel(x,y,P,v,N){let s=T(x,y,P.h,'t-lbl')+T(x,y+16,P.sub);
    s+=pgGrid(x,y+30,v);
    const bx=x+215;s+=T(bx,y+96,P.big,'t-big','font-size:34px;fill:var(--ink)')+T(bx,y+118,P.c1,'t-sm')+T(bx,y+133,P.c2,'t-sm')+T(bx,y+156,P.n,'t-xs');
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const L=N?{tx:16,ty:26,ts:17,ax0:30,ax1:370,ay:60,p:[ [16,104],[16,384] ],ly:676}
             :{tx:20,ty:28,ts:18,ax0:70,ax1:650,ay:60,p:[ [20,112],[372,112] ],ly:388};
    const p=phaseOf(PG_STEPS,t),S=PG_STEPS[p];
    let s=T(L.tx,L.ty,S.sv,'t-big',`font-size:${L.ts}px`);
    /* time axis */
    const n=PG_AX.length,X=i=>L.ax0+(L.ax1-L.ax0)*i/(n-1),pos=pgPos(t);
    s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.ay}" y2="${L.ay}" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"/>`;
    s+=`<line x1="${L.ax0}" x2="${f1(lerp(L.ax0,L.ax1,pos/(n-1)))}" y1="${L.ay}" y2="${L.ay}" style="stroke:var(--rec);stroke-width:3;stroke-linecap:round"/>`;
    PG_AX.forEach((a,i)=>{const on=Math.abs(pos-i)<.02||i===p&&t>=S.at;s+=`<circle cx="${f1(X(i))}" cy="${L.ay}" r="${on?6:4}" style="fill:${i<=pos+.01?'var(--rec)':'var(--panel)'};stroke:var(--rec);stroke-width:1.6"/>`+T(X(i),L.ay+20,N?a.s:a.l,'t-xs t-mid',i===p?INK:'')});
    s+=`<circle cx="${f1(lerp(L.ax0,L.ax1,pos/(n-1)))}" cy="${L.ay}" r="7.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2.4"/>`;
    /* the two panels */
    S.P.forEach((P,j)=>{s+=pgPanel(L.p[j][0],L.p[j][1],P,pgVal(t,p,j),N)});
    /* legend: shape as well as colour */
    s+=person(L.tx+6,L.ly-12,14,'var(--rec)')+T(L.tx+18,L.ly,PG_LEG.walk,'t-sm')+`<circle cx="${L.tx+150}" cy="${L.ly-4}" r="4.6" style="fill:var(--weak)"/>`+T(L.tx+160,L.ly,PG_LEG.not,'t-sm');
    svg.innerHTML=s;
    setSt(p);note.innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#pgPlay'),draw,16000,'%t:player.replay%','prognosis');
  setSt=stepWire($('#pgSteps'),PG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. EGOS / mEGOS points calculator ---------- */
  const cs=$('#pgCalcSvg'),cc=$('#pgCalcCap'),sA=$('#pgAge'),sD=$('#pgDia'),sM=$('#pgMrc'),sG=$('#pgGbs');
  let mode='adm',shown={a:1,d:0,m:2},stopC=null;
  const fmt=v=>Math.abs(v-Math.round(v))<.01?String(Math.round(v)):v.toFixed(1);
  function pgTarget(){const C=PG_SC[mode];return {a:C.age[+sA.value],d:C.dia[+sD.value],m:C.str?C.str[+sM.value]:+sG.value}}
  function drawCalc(V){
    const N=vb(cs,'720 196','400 200'),C=PG_SC[mode];
    const L=N?{x0:16,x1:384,ty:26,ly:54,lx:[16,110,230],by:72,bh:32}:{x0:20,x1:700,ty:28,ly:56,lx:[20,190,380],by:74,bh:34};
    const X=v=>L.x0+(L.x1-L.x0)*v/C.max,tot=V.a+V.d+V.m;
    let s=T(L.x0,L.ty,`${C.name}: ${fmt(tot)} of ${C.max}`,'t-big','font-size:18px');
    const seg=[{v:V.a,c:'var(--dx)',l:`Age +${fmt(V.a)}`},{v:V.d,c:'var(--accent)',l:`Diarrhoea +${fmt(V.d)}`},{v:V.m,c:'var(--weak)',l:`${C.sl} +${fmt(V.m)}`}];
    seg.forEach((g,i)=>{s+=`<rect x="${L.lx[i]}" y="${L.ly-10}" width="12" height="12" rx="2" style="fill:${g.c}"/>`+T(L.lx[i]+17,L.ly,g.l,'t-sm','fill:var(--ink)')});
    s+=`<rect x="${L.x0}" y="${L.by}" width="${L.x1-L.x0}" height="${L.bh}" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    let acc=0;seg.forEach((g,i)=>{if(g.v>.001){s+=`<rect x="${f1(X(acc)+(acc>0?1:0))}" y="${L.by+3}" width="${f1(Math.max(0,X(acc+g.v)-X(acc)-(acc>0?1:0)))}" height="${L.bh-6}" rx="4" style="fill:${g.c};opacity:.9"/>`}acc+=g.v});
    for(let i=0;i<=C.max;i++){s+=`<line x1="${f1(X(i))}" x2="${f1(X(i))}" y1="${L.by+L.bh+2}" y2="${L.by+L.bh+8}" class="axis"/>`+T(X(i),L.by+L.bh+20,i,'t-xs t-mid')}
    const tx=X(tot);s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${L.by-6}" y2="${L.by+L.bh+6}" style="stroke:var(--ink);stroke-width:2.4"/><path d="M${f1(tx-6)} ${L.by-12}L${f1(tx+6)} ${L.by-12}L${f1(tx)} ${L.by-4}Z" style="fill:var(--ink)"/>`;
    const ly=L.by+L.bh+44;
    if(C.thr){const hx=X(C.thr);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${L.by}" y2="${L.by+L.bh}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:4 3"/>`+T(hx,ly,PG_THR,'t-xs t-mid','fill:var(--rx);font-weight:700')}
    else s+=T(X(1),ly,PG_EG[0],'t-xs t-mid','fill:var(--ink);font-weight:700')+T(L.x1,ly,PG_EG[1],'t-xs t-end','fill:var(--ink);font-weight:700');
    s+=T(L.x0,ly+(N?36:30),PG_POP,'t-xs');
    cs.innerHTML=s;
  }
  function calcUpdate(anim){const C=PG_SC[mode],tg=pgTarget(),from={...shown};
    cc.innerHTML=`<b>${C.name}: ${fmt(tg.a+tg.d+tg.m)} of ${C.max}.</b> `+PG_CAP[mode];
    if(stopC)stopC();
    if(!anim){shown=tg;drawCalc(shown);return}
    stopC=animate(450,q=>{const e=ease(q);shown={a:lerp(from.a,tg.a,e),d:lerp(from.d,tg.d,e),m:lerp(from.m,tg.m,e)};drawCalc(shown)},()=>{shown=tg;drawCalc(shown);stopC=null})}
  function setMode(m){mode=m;$$('[data-pgs]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pgs===m));
    const eg=m==='egos';sM.closest('label').hidden=eg;sG.closest('label').hidden=!eg;calcUpdate(true)}
  $$('[data-pgs]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.pgs)));
  [sA,sD,sM,sG].forEach(el=>el.addEventListener('change',()=>calcUpdate(true)));
  calcUpdate(false);

  /* ---------- 3. mortality bars ---------- */
  const ms=$('#pgMortSvg'),mc=$('#pgMortCap');let mm='phase',mShown=[0,0,0,0],stopM=null;
  function drawMort(W){
    const N=vb(ms,'720 230','400 270'),M=PG_MORT[mm];
    let s=T(N?16:20,22,M.unit,'t-sm','fill:var(--ink);font-weight:700');
    M.rows.forEach((r,i)=>{const w=W[i]||0;
      if(N){const y=48+i*52,bw=270*w/M.max;s+=T(16,y,r.l,'t-sm','fill:var(--ink)');
        s+=`<rect x="16" y="${y+8}" width="270" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="16" y="${y+8}" width="${f1(bw)}" height="18" rx="4" style="fill:${r.pop?'var(--device)':M.col};opacity:.85"/>`;
        s+=T(16+bw+8,y+22,`${fmt(r.v)}%`,'t-lbl')+(r.n?T(16+bw+56,y+22,r.n,'t-xs'):'')}
      else{const y=44+i*42,bw=330*w/M.max;s+=T(20,y+19,r.l,'t-sm','fill:var(--ink)');
        s+=`<rect x="230" y="${y+5}" width="330" height="20" rx="4" style="fill:var(--panel-2)"/><rect x="230" y="${y+5}" width="${f1(bw)}" height="20" rx="4" style="fill:${r.pop?'var(--device)':M.col};opacity:.85"/>`;
        s+=T(230+bw+8,y+20,`${fmt(r.v)}%`,'t-lbl')+(r.n?T(230+bw+56,y+20,r.n,'t-xs'):'')}});
    s+=T(N?16:20,N?262:222,'Bars share one scale within each view, not across views.','t-xs');
    ms.innerHTML=s}
  function setMort(m,anim){mm=m;$$('[data-pgm]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pgm===m));
    const M=PG_MORT[m],tg=M.rows.map(r=>r.v),from=mShown.slice();mc.innerHTML=M.cap;
    if(stopM)stopM();
    if(!anim){mShown=tg;drawMort(mShown);return}
    stopM=animate(500,q=>{const e=ease(q);mShown=tg.map((v,i)=>lerp(Math.min(from[i]||0,M.max),v,e));drawMort(mShown)},()=>{mShown=tg;drawMort(mShown);stopM=null})}
  $$('[data-pgm]').forEach(b=>b.addEventListener('click',()=>setMort(b.dataset.pgm,true)));
  setMort('phase',false);

  /* ---------- 4. walking after ventilation ---------- */
  const vs=$('#pgVentSvg'),vc=$('#pgVentCap');let vm='m6',vShown=[76,18],stopV=null;
  function drawV(W){
    const N=vb(vs,'720 260','400 500'),V=PG_VENT[vm];
    const pos=N?[ [16,24],[16,264] ]:[ [20,24],[380,24] ];
    let s='';V.P.forEach((P,j)=>{const [x,y]=pos[j],k=Math.round(W[j]);
      s+=T(x,y,P.h,'t-lbl')+T(x,y+15,P.sub,'t-xs');
      for(let i=0;i<100;i++){const cx=x+(i%10)*17+6,cy=y+28+Math.floor(i/10)*19;s+=i<k?person(cx,cy,13,'var(--rec)'):`<circle cx="${f1(cx)}" cy="${f1(cy+7)}" r="4" style="fill:var(--weak);opacity:.85"/>`}
      s+=T(x+190,y+100,Math.round(W[j])+'%','t-big','font-size:32px;fill:var(--ink)')+T(x+190,y+120,PG_VLEG,'t-sm')});
    vs.innerHTML=s}
  function setV(m,anim){vm=m;$$('[data-pgv]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pgv===m));const tg=PG_VENT[m].P.map(P=>P.v),from=vShown.slice();vc.innerHTML=PG_VENT[m].cap;
    if(stopV)stopV();if(!anim||RM){vShown=tg;drawV(tg);return}
    stopV=animate(800,q=>{const e=ease(q);vShown=tg.map((v,i)=>lerp(from[i],v,e));drawV(vShown)},()=>{vShown=tg;drawV(tg);stopV=null})}
  $$('[data-pgv]').forEach(b=>b.addEventListener('click',()=>setV(b.dataset.pgv,true)));
  setV('m6',false);
  const prev=redraws.prognosis;redraws.prognosis=()=>{prev&&prev();drawCalc(shown);drawMort(mShown);drawV(vShown)};
};
