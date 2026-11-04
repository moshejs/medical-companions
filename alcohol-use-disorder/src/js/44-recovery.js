/* =============== 4.4 Course, relapse and recovery =============== */
/* NESARC 2001-02 end proportions (Dawson 2005), 100 icons */
const RC_CAT=[
 {k:'dep',n:'Still dependent',c:'var(--accent)',v:25.0},
 {k:'part',n:'Partial remission',c:'var(--warn)',v:27.3},
 {k:'asym',n:'Asymptomatic risk drinking',c:'var(--eth-fill)',v:11.8},
 {k:'low',n:'Low-risk drinking',c:'var(--rx)',v:17.7},
 {k:'abs',n:'Abstinent',c:'var(--good)',v:18.2}];
const RC_N=[25,27,12,18,18];
const RC_STEPS=[
 {from:0,at:.02,k:'Year 0',t:'Everyone starts with AUD',
  txt:`Start with 100 people who have alcohol use disorder. Most of them will never be treated: only 25.5% of US adults with past alcohol dependence in NESARC had ever had treatment, 19.8% of people with lifetime AUD in NESARC-III, and about 1 in 6 worldwide (17.3%; 9.3% in low and lower-middle-income countries). [[Dawson2005,Grant2015NESARC,Mekonen2021]]`,
  pt:`AUD is a medical condition that can be treated, not a moral failing. Many people never get help, so it matters that help is easy to find.`,
  hook:`Treatment gap: about 1 in 6 people with AUD worldwide are treated (17.3%). [[Mekonen2021]]`},
 {from:.1,at:.26,k:'Years 2–8',t:'Many change course, often without treatment',
  txt:`Icons start to change colour. In NESARC, recovery happened both with and without abstinence, and much of it without formal treatment. Being married went with both abstinent and non-abstinent recovery and heavier drinking with less of both; greater severity raised the odds of abstinent recovery but lowered the odds of non-abstinent recovery. [[Dawson2005]]`,
  pt:`People change at different times and in different ways. Some stop, some cut down a lot.`,
  hook:`Severity pushes towards abstinent rather than non-abstinent recovery (NESARC). [[Dawson2005]]`},
 {from:.4,at:.5,k:'Years 8–12',t:'Returns to drinking are common, and not the end',
  txt:`Some icons flash back to "still dependent" and then recover again. In a 16-year cohort of 461 people who first sought help, those who got no help were less likely to reach 3-year remission and more likely to relapse; relapse was more likely with heavier drinking, not seeing drinking as a problem, low self-efficacy and avoidance coping. Yet among people who had resolved a problem, the median number of serious attempts was 2 (IQR 1–4). [[Moos2006Relapse,Kelly2019Attempts]]`,
  pt:`A return to drinking is common on the way. It does not cancel what was learned, and most people did not need dozens of tries.`,
  hook:`Quote the median: 2 serious attempts (mean 5.35, skewed by a few people with many). [[Kelly2019Attempts]]`},
 {from:.6,at:.75,k:'Years 12–17',t:'The population snapshot',
  txt:`The array settles on the NESARC 2001–02 snapshot of 4,422 adults whose dependence began before the past year: 25.0% still dependent, 27.3% in partial remission, 11.8% asymptomatic risk drinkers, 17.7% low-risk drinkers and 18.2% abstainers. A meta-analysis of 21 long-term studies found remission in 35.0–54.4% over a mean of 17 years, a projected 6.8–9.1% a year. [[Dawson2005,Fleury2016]]`,
  pt:`Years later, about half of people who once had alcohol dependence no longer had symptoms. These are group numbers, not a forecast for one person.`,
  hook:`NESARC: 25% still dependent; about 36% low-risk drinkers or abstainers; only 25.5% ever treated. [[Dawson2005]]`},
 {from:.85,at:.95,k:'Years 17–20',t:'Recovery capital and the long view',
  txt:`Recovery capital is the personal, social and community resources that support recovery; in 312 people in recovery, more of it predicted sustained recovery, better quality of life and less stress a year later. In the National Recovery Survey, quality of life, happiness, self-esteem and recovery capital rose steeply in the first 6 years after resolving a problem, then more gradually; self-esteem and happiness dipped in the first year. 9.1% of US adults report having resolved an alcohol or drug problem. [[Laudet2008,Kelly2018QoL,Kelly2017Recovery]]`,
  pt:`The first year can feel hard. For many people life then gets steadily better, and keeps improving for years.`,
  hook:`9.1% of US adults have resolved an AOD problem; 53.9% of them used an assisted pathway, most often mutual help (45.1%). [[Kelly2017Recovery]]`}
];
/* recovery-capital / quality-of-life shape after resolution (Kelly 2018): a first-year dip, steep rise to ~6 y, then gradual */
const rcQoL=y=>{const d=-.08*Math.sin(Math.PI*clamp(y/1.2));return clamp(.18+d+.55*(1-Math.exp(-Math.max(0,y-.6)/2.4))+.012*Math.max(0,y-6),0,1)};
const RD_STEPS=[
 {from:0,at:.06,k:'The road',t:'Recovery is a process, not a switch',
  txt:`The later version of Marlatt's model treats relapse as a dynamic process in which many risk factors and situations interact, rather than a fixed chain of events. Long-term care with continued monitoring, as for diabetes, hypertension or asthma, gives lasting benefit. [[Witkiewitz2004RP,McLellan2000]]`,
  pt:`Recovery has bends and hills. Planning for them is part of the treatment.`,
  hook:`AUD fits a chronic-illness model: adherence and relapse rates are similar to diabetes, hypertension and asthma. [[McLellan2000]]`},
 {from:.2,at:.3,k:'A high-risk bend',t:'High-risk situations',
  txt:`Immediate triggers in the Marlatt model are high-risk situations, coping skills and outcome expectancies; hidden antecedents include lifestyle imbalance and urges. Therapy teaches coping for a person's own high-risk situations and builds self-efficacy. [[Larimer1999]] See the <a href="#therapy" data-go="therapy">relapse-prevention chain</a>.`,
  pt:`Some places, moods or people make drinking more likely. Knowing yours helps you plan.`,
  hook:`Self-efficacy and readiness to change were the strongest predictors of 3-year outcome in Project MATCH. [[ProjectMATCH1998]]`},
 {from:.38,at:.44,k:'A lapse',t:'One drink is a lapse, not a relapse',
  txt:`A lapse is a single use after a period of change. Whether it becomes a relapse depends partly on how the person reads it. In a study of 1,288 people, "recurrence of use" carried a more positive association than "relapse". [[Larimer1999,Ashford2018]]`,
  pt:`A slip does not erase progress.`,
  hook:`Lapse = a single use; relapse = return to the previous pattern. The abstinence violation effect is what links them. [[Larimer1999]]`},
 {from:.5,at:.66,k:'Two ways back',t:'The abstinence violation effect, or a reframe',
  txt:`The long loop is the abstinence violation effect: guilt and a sense of having "blown it", which makes full relapse more likely. The short path is the relapse-prevention response: plan for lapses beforehand and reframe a lapse as a mistake in a specific situation to learn from. [[Larimer1999]] After long, heavy daily drinking, get medical help to stop safely.`,
  pt:`Thinking "I have blown it" makes things worse. Thinking "this was a hard moment, what can I change?" helps you get back on track.`,
  hook:`Treatment plans for lapses and reframes them, so a lapse does not have to become a relapse. [[Larimer1999]]`},
 {from:.82,at:.95,k:'Further on',t:'Back on the road, with more support',
  txt:`AA's benefit came mostly through changes in social networks and confidence to stay abstinent in social settings. People who took part in AA for 27 weeks or more in the first year had better 16-year outcomes. A recovery-support app cut risky drinking days after residential treatment (1.39 vs 2.75). [[Kelly2012AAMech,Moos2006AA,Gustafson2014]]`,
  pt:`People around you, a group, an app or a counsellor all make the road easier.`,
  hook:`AA works mainly through social networks: mediators explained 43–67% of its effect. [[Kelly2012AAMech]]`}
];
const RC_LV=[
 {s:'Mutual help',n:'Mutual help and recovery support',who:[`Anyone at any stage, alone or alongside treatment: free peer groups such as AA, SMART Recovery, LifeRing and Women for Sobriety. [[Kelly2020Cochrane,Zemore2018]]`,`45.1% of US adults who resolved a problem used mutual help, 21.8% recovery support services and 6.2% recovery community centres. [[Kelly2017Recovery]]`]},
 {s:'Brief advice',n:'Brief intervention in primary care',who:[`Adults with risky or hazardous drinking found by screening: the USPSTF recommends offering brief behavioural counselling (B). [[USPSTF2018Alcohol]]`,`Not proven for people with dependence or very heavy drinking, who need more. [[Saitz2010]]`]},
 {s:'Outpatient',n:'Outpatient treatment',who:[`Therapy such as CBT, MET or twelve-step facilitation (the Project MATCH outpatient trial, N = 952), often with medicine. [[ProjectMATCH1997,Ray2020CBT]] See <a href="#medicines" data-go="medicines">medicines</a>.`,`Withdrawal can usually be managed safely as an outpatient when risk factors are limited (ASAM Level 1-WM: appropriate for CIWA-Ar &lt;10), with daily check-ins for up to 5 days. [[ASAM2020Withdrawal]]`]},
 {s:'Day / on-site',n:'Extended on-site monitoring and day programmes',who:[`ASAM Level 2-WM, extended on-site monitoring: appropriate for CIWA-Ar &lt;18; severe but not complicated withdrawal is uncertain. Drinking more than 8 standard drinks a day is flagged as neutral or uncertain at both outpatient levels. [[ASAM2020Withdrawal]]`,`Project MATCH's aftercare trial (N = 774) enrolled people after inpatient or day-hospital care. [[ProjectMATCH1997]]`]},
 {s:'Residential',n:'Residential treatment and continuing care',who:[`Studies of people leaving residential treatment show what helps next: a recovery-support app cut risky drinking days, and 6 months or more in a self-run Oxford House went with far less substance use at 24 months (15.6% vs 64.8% with usual aftercare). [[Gustafson2014,Jason2007]]`,`Long-term care with continued monitoring, as in other chronic illnesses. [[McLellan2000]]`]},
 {s:'Inpatient',n:'Medically managed inpatient care',who:[`A 1995 estimate quoted by ASAM: about 10% of people with alcohol withdrawal syndrome need inpatient treatment. [[ASAM2020Withdrawal]]`,`ASAM reasons to move up: agitation or tremor that does not resolve despite several doses; persistent vomiting, marked agitation, hallucinations, confusion or seizure; worsening illness or over-sedation; return to drinking; syncope or unstable vital signs. [[ASAM2020Withdrawal]]`,`ASAM: consider inpatient care for every pregnant patient who needs withdrawal management, and assess suicide risk at intake. [[ASAM2020Withdrawal]] See <a href="#detox" data-go="detox">managing withdrawal</a>.`]}
];
inits.recovery=()=>{
  /* ---- 100 people over 20 years ---- */
  const svg=$('#rcSvg'),rg=$('#rcT'),r=rng(44);
  const P=[];RC_N.forEach((n,ci)=>{for(let i=0;i<n;i++)P.push({c:ci})});
  /* shuffle positions so groups are mixed through the grid */
  const pos=P.map((_,i)=>i);for(let i=pos.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[pos[i],pos[j]]=[pos[j],pos[i]]}
  P.forEach((p,i)=>{p.g=pos[i];p.ty=p.c===0?99:1.5+r()*11.5;p.back=null;
    if(p.c>0&&r()<.22){const b=Math.max(p.ty+1,4+r()*7);p.back=[b,b+.8+r()*1.6]}});
  function state(p,y){if(y<p.ty)return 0;if(p.back&&y>=p.back[0]&&y<p.back[1])return -1;return p.c}
  function draw(t){
    const N=vb(svg,'720 400','400 740'),y=t*20,ph=phaseOf(RC_STEPS,t);
    const L=N?{ax:[30,370,22],gx:30,gy:52,cs:34,ps:26,bx:20,by:418,bw:360,qx:20,qy:600,qw:170,ax2:224,aw:156}:{ax:[20,300,22],gx:20,gy:48,cs:28,ps:21,bx:340,by:44,bw:360,qx:340,qy:250,qw:180,ax2:560,aw:140};
    let s='';
    const T=tline(L.ax[0],L.ax[2],L.ax[1]-L.ax[0],{min:0,max:20,step:5,fmt:v=>v,big:true});s+=T.svg;
    s+=`<circle cx="${f1(T.X(y))}" cy="${L.ax[2]}" r="5" style="fill:var(--rx)"/><text x="${f1(Math.min(T.X(y)+8,L.ax[1]-60))}" y="${L.ax[2]+16}" class="t-xs" style="fill:var(--rx);font-weight:700">year ${y.toFixed(1)}</text>`;
    const cnt=[0,0,0,0,0];let back=0;
    P.forEach(p=>{const st=state(p,y),gx=L.gx+(p.g%10)*L.cs+L.cs/2,gy=L.gy+Math.floor(p.g/10)*L.cs+2;
      const col=st===-1?'var(--accent)':RC_CAT[st].c;cnt[st===-1?0:st]++;if(st===-1)back++;
      s+=person(gx,gy,L.ps,col);
      if(st===-1)s+=`<circle cx="${f1(gx)}" cy="${f1(gy+L.ps*.55)}" r="${f1(L.ps*.62)}" style="fill:none;stroke:var(--accent);stroke-width:1.4;stroke-dasharray:2 2"/>`});
    /* live counts */
    s+=`<text x="${L.bx}" y="${L.by}" class="t-sm" style="fill:var(--ink);font-weight:600">Of 100 people, now (illustrative timing)</text>`;
    RC_CAT.forEach((c,i)=>{const yy=L.by+12+i*28,bw=L.bw-172,w=bw*cnt[i]/100;
      s+=`<text x="${L.bx}" y="${yy+13}" class="t-xs" style="fill:var(--ink)">${c.n}</text>`;
      s+=`<rect x="${L.bx+172}" y="${yy+3}" width="${f1(bw)}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx+172}" y="${yy+3}" width="${f1(Math.max(0,w))}" height="14" rx="4" style="fill:${c.c}"/>`;
      s+=`<text x="${f1(L.bx+176+Math.max(w,0))}" y="${yy+14}" class="t-xs" style="fill:var(--ink);font-weight:700">${cnt[i]}${i===0&&back?` (${back} returned)`:''}</text>`});
    if(ph>=3)s+=`<text x="${L.bx}" y="${L.by+166}" class="t-xs" style="fill:var(--muted)">NESARC snapshot: 25.0 · 27.3 · 11.8 · 17.7 · 18.2%</text>`;
    /* recovery capital curve */
    const C=curve(L.qx,L.qy+18,L.qw,90,rcQoL,{x0:0,x1:20,upto:Math.max(.05,y),col:'var(--good)',fill:true,dot:true});s+=C.svg;
    s+=`<text x="${L.qx}" y="${L.qy}" class="t-sm" style="fill:var(--ink);font-weight:600">Quality of life</text><text x="${L.qx}" y="${L.qy+13}" class="t-xs">and recovery capital: shape only</text>`;
    s+=`<text x="${L.qx}" y="${L.qy+122}" class="t-xs">0</text><text x="${f1(C.X(6))}" y="${L.qy+122}" class="t-xs t-mid">6</text><text x="${L.qx+L.qw}" y="${L.qy+122}" class="t-xs t-end">20</text><text x="${f1(L.qx+L.qw/2)}" y="${L.qy+136}" class="t-xs t-mid">years since resolving</text>`;
    if(y>.4&&y<4)s+=`<text x="${f1(C.X(1)+6)}" y="${f1(C.Y(rcQoL(1))+16)}" class="t-xs" style="fill:var(--accent)">first-year dip</text>`;
    /* attempts strip */
    const op=ph>=2?1:.3,ax=L.ax2,aw=L.aw,X=v=>ax+aw*v/8,ay=L.qy+60;
    s+=`<g style="opacity:${op}"><text x="${ax}" y="${L.qy}" class="t-sm" style="fill:var(--ink);font-weight:600">Serious attempts</text><text x="${ax}" y="${L.qy+13}" class="t-xs">before resolution</text>`;
    s+=`<line x1="${ax}" x2="${ax+aw}" y1="${ay+18}" y2="${ay+18}" class="axis"/>`;[0,2,4,6,8].forEach(v=>s+=`<text x="${f1(X(v))}" y="${ay+32}" class="t-xs t-mid">${v}</text>`);
    s+=`<rect x="${f1(X(1))}" y="${ay-8}" width="${f1(X(4)-X(1))}" height="16" rx="3" style="fill:var(--rx-soft);stroke:var(--rx)"/><line x1="${f1(X(2))}" x2="${f1(X(2))}" y1="${ay-12}" y2="${ay+12}" style="stroke:var(--rx);stroke-width:3"/>`;
    s+=`<text x="${f1(X(2))}" y="${ay-16}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">median 2</text><path d="M${f1(X(5.35))} ${ay-6}l5 6l-5 6l-5 -6Z" style="fill:var(--muted)"/><text x="${f1(X(5.35)+8)}" y="${ay-8}" class="t-xs">mean 5.35</text><text x="${ax}" y="${ay+46}" class="t-xs">box = IQR 1–4</text></g>`;
    svg.innerHTML=s;setSt(ph);
    $('#rcRead').innerHTML=`<span>year <b>${y.toFixed(1)}</b></span><span>still dependent <b>${cnt[0]}</b></span><span>in some remission <b>${100-cnt[0]}</b></span><span>no symptoms (risk, low-risk or abstinent) <b>${cnt[2]+cnt[3]+cnt[4]}</b></span>`;
    $('#rcNote').innerHTML=noteHTML(RC_STEPS[ph]);
    rg.setAttribute('aria-valuetext',`Year ${y.toFixed(0)}: ${cnt[0]} still dependent, ${100-cnt[0]} in some remission`);
  }
  const stop=playWire(rg,$('#rcPlay'),draw,24000,'%t:player.replay%','recovery');
  const setSt=stepWire($('#rcSteps'),RC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- the winding road ---- */
  const rs=$('#rdSvg'),rr=$('#rdT');
  const bez=(a,b,c,d,u)=>{const v=1-u;return [v*v*v*a[0]+3*v*v*u*b[0]+3*v*u*u*c[0]+u*u*u*d[0],v*v*v*a[1]+3*v*v*u*b[1]+3*v*u*u*c[1]+u*u*u*d[1]]};
  function drawRD(t){
    const N=vb(rs,'720 300','400 620'),ph=phaseOf(RD_STEPS,t);
    const R=N?(u=>[200+70*Math.sin(u*Math.PI*2.4),lerp(40,590,u)]):(u=>[lerp(30,690,u),150+55*Math.sin(u*Math.PI*2.4)]);
    const off=(u,d)=>{const a=R(u),b=R(Math.min(1,u+.002)),dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;return [a[0]-dy/l*d,a[1]+dx/l*d]};
    let s=`<defs>${marker('rdA','var(--muted)')}</defs>`;
    let d='';for(let i=0;i<=160;i++){const p=R(i/160);d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}
    s+=`<path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:26;stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--line);stroke-width:1.5;stroke-dasharray:8 8"/>`;
    /* high-risk bend */
    const hb=R(.3),uL=.42,lp=off(uL,N?-48:46),rj=R(.5),aj=R(.8);
    s+=`<g style="opacity:${ph>=1?1:.35}"><path d="M${f1(hb[0])} ${f1(hb[1]-(N?0:30))}l-10 -18h20Z" transform="${N?`translate(46 0)`:''}" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.4"/><text x="${f1(hb[0]+(N?46:0))}" y="${f1(hb[1]-(N?24:54))}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">high-risk bend</text></g>`;
    /* detour (AVE) and reframe paths from the lapse spot */
    const A1=N?[[lp[0]-90,lp[1]+40],[lp[0]-120,aj[1]-40]]:[[lp[0]+40,lp[1]+150],[aj[0]-80,aj[1]+150]];
    const B1=N?[[lp[0]+10,lp[1]+30],[rj[0]-50,rj[1]-20]]:[[lp[0]+30,lp[1]+30],[rj[0]-20,rj[1]+40]];
    const pathOf=(c)=>{let q='';for(let i=0;i<=60;i++){const p=bez(lp,c[0],c[1],c===A1?aj:rj,i/60);q+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}return q};
    const showB=ph>=3;
    s+=`<path d="${pathOf(A1)}" style="fill:none;stroke:var(--bad);stroke-width:2;stroke-dasharray:5 4;opacity:${showB?.85:0}"/>`;
    s+=`<path d="${pathOf(B1)}" style="fill:none;stroke:var(--good);stroke-width:2.6;opacity:${showB?1:0}"/>`;
    if(showB){const ma=bez(lp,A1[0],A1[1],aj,.5),mb=bez(lp,B1[0],B1[1],rj,.55);
      s+=`<text x="${f1(ma[0]+(N?-6:0))}" y="${f1(ma[1]+(N?0:16))}" class="t-sm ${N?'t-end':'t-mid'}" style="fill:var(--bad);font-weight:600">abstinence violation effect</text><text x="${f1(ma[0]+(N?-6:0))}" y="${f1(ma[1]+(N?14:30))}" class="t-xs ${N?'t-end':'t-mid'}">"I have blown it" → longer detour</text>`;
      s+=`<text x="${f1(mb[0]+(N?14:12))}" y="${f1(mb[1]+(N?4:4))}" class="t-sm" style="fill:var(--good);font-weight:600">reframe</text>`}
    if(ph>=2){s+=`<circle cx="${f1(lp[0])}" cy="${f1(lp[1])}" r="9" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.6"/><text x="${f1(lp[0]+(N?-14:0))}" y="${f1(lp[1]+(N?4:-14))}" class="t-sm ${N?'t-end':'t-mid'}" style="fill:var(--accent);font-weight:700">lapse</text>`}
    /* traveller */
    let tp,ghost=null;
    if(t<.4)tp=R(lerp(0,uL,t/.4));
    else if(t<.46){const k=ramp(t,.4,.46),a=R(uL);tp=[lerp(a[0],lp[0],k),lerp(a[1],lp[1],k)]}
    else if(t<.5)tp=lp;
    else if(t<.7){const k=ease(ramp(t,.5,.7));tp=bez(lp,B1[0],B1[1],rj,k);ghost=bez(lp,A1[0],A1[1],aj,ramp(t,.5,.95))}
    else{tp=R(lerp(.5,1,ramp(t,.7,1)));if(t<.95)ghost=bez(lp,A1[0],A1[1],aj,ramp(t,.5,.95))}
    if(ghost)s+=`<g style="opacity:.45">${person(ghost[0],ghost[1]-26,24,'var(--bad)')}</g>`;
    s+=person(tp[0],tp[1]-30,28,'var(--rx)');
    const st=R(0),en=R(1);s+=`<text x="${f1(st[0]+(N?40:0))}" y="${f1(st[1]+(N?0:34))}" class="t-xs ${N?'':'t-mid'}">start of change</text><text x="${f1(en[0]+(N?-40:0))}" y="${f1(en[1]+(N?0:34))}" class="t-xs ${N?'t-end':'t-mid'}">further on</text>`;
    rs.innerHTML=s;setRd(ph);$('#rdNote').innerHTML=noteHTML(RD_STEPS[ph]);
  }
  const stopR=playWire(rr,$('#rdPlay'),drawRD,16000,'%t:player.replay%','recovery');
  const setRd=stepWire($('#rdSteps'),RD_STEPS,rr,drawRD,stopR);
  drawRD(+rr.value);

  /* ---- levels of care ---- */
  const ls=$('#rcLv');let lv=2;
  $('#rcLvBtns').innerHTML=`<span class="kicker">Level</span>`+RC_LV.map((l,i)=>`<button class="btn" data-lv="${i}" aria-pressed="${i===lv}">${l.s}</button>`).join('');
  function drawLv(){
    const N=vb(ls,'720 230','400 300'),W=N?380:690,H=N?250:190;
    const Lr=ladder(N?10:15,N?20:16,W,H,RC_LV.map(l=>N?'':l.s),{at:lv,col:'var(--rx)',done:true});let s=Lr.svg;
    if(N)RC_LV.forEach((l,i)=>{const [x,y]=Lr.top(i);s+=`<text x="${f1(x-1.5)}" y="${f1(y+16)}" class="t-xs t-mid" style="fill:${i===lv?'var(--on-brand)':'var(--ink)'}">${i+1}</text>`});
    const [tx,ty]=Lr.top(lv);s+=person(tx-1.5,ty-(N?34:40),N?30:34,'var(--ink)');
    s+=`<text x="${N?10:15}" y="${N?290:222}" class="t-xs">less intensive</text><text x="${N?390:705}" y="${N?290:222}" class="t-xs t-end">more intensive, more medical care →</text>`;
    ls.innerHTML=s;
    const L=RC_LV[lv];$('#rcLvNote').innerHTML=`<div class="kicker">Level ${lv+1} of ${RC_LV.length}</div><h4>${L.n}</h4><ul>${L.who.map(x=>`<li>${x}</li>`).join('')}</ul><div class="pt"><b>%t:note.plain%</b>The right setting is the least intensive one that is safe. It can change as needs change. [[ASAM2020Withdrawal]]</div><p class="stage-cap">Teaching summary of published statements, not a placement tool.</p>`;
  }
  $$('[data-lv]').forEach(b=>b.addEventListener('click',()=>{lv=+b.dataset.lv;$$('[data-lv]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawLv()}));
  const prevR=redraws.recovery;redraws.recovery=()=>{prevR&&prevR();drawLv()};
  drawLv();
};
