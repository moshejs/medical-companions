/* =============== 3.4 Treating subarachnoid haemorrhage =============== */
/* Main scrubber: day 0 to 21 lanes. Then coil against clip with ISAT, the BRANT course, sodium causes, trends, long-term dots. */
const SH_STEPS=[
 {from:0,at:.01,k:'Hours 0 to 12',t:'Rebleeding: the first danger',
  txt:`Rebleeding occurs in about 40% if the aneurysm stays untreated [[Vergouwen2026]]. Most occurs within 24 hours of onset [[Claassen2022]], and the rate is highest in the first 6 hours [[Larsen2013]]. Rebleeding under 6 hours had OR 3.22 (1.46 to 7.12) in a meta-analysis of 14 studies [[Tang2014]]. AHA/ASA 2023 asks for blood pressure control with short-acting agents to avoid severe hypotension, hypertension and variability (1, C-EO), and emergency anticoagulant reversal (1, C-EO) [[Hoh2023]].`,
  pt:`After an aneurysm bleeds, doctors try to seal it fast because it may bleed again, most often soon after the first bleed [[Claassen2022]].`},
 {from:.024,at:.036,k:'Within 24 hours',t:'Securing the aneurysm',
  txt:`AHA/ASA 2023: as early as feasible, preferably within 24 hours of onset (1, B-NR) [[Hoh2023]]. ESO 2026 moved from within 72 hours to a consensus of within 24 hours with the most dedicated team available, noting low-quality evidence [[Vergouwen2026]].`},
 {from:.048,at:.1,k:'Days 1 to 3',t:'Early brain injury and acute hydrocephalus',
  txt:`The first 24 to 48 hours are called the early brain injury phase <span class="ev early">Early evidence</span> [[Dodd2021]]. Acute hydrocephalus falls within 3 days in one review's scheme [[Chen2017]]. AHA/ASA 2023: urgent CSF diversion for acute symptomatic hydrocephalus (1, B-NR) [[Hoh2023]].`},
 {from:.19,at:.24,k:'Days 4 to 6',t:'DCI begins',
  txt:`Delayed cerebral ischaemia (DCI) occurs in about 30%, mostly between days 4 and 14 [[Hoh2023]]. Clinical deterioration is focal impairment or a fall of at least 2 GCS points, per AHA text [[Hoh2023]]. Hyponatraemia is also common, in a pooled 37.0% [[Gillespie2025]]. The sources used here give no day window for it, so its lane is dashed.`,
  hook:`Thick clot filling a cistern or fissure and blood in both lateral ventricles independently predicted DCI (ORs 2.3 and 4.1) [[Claassen2001]].`},
 {from:.286,at:.38,k:'Days 6 to 10',t:'Peak risk for DCI and vasospasm',
  txt:`Peak risk for DCI and vasospasm is post-bleed days 6 to 10 [[Hoh2023]]. AHA/ASA 2023 lists euvolaemia (2a, B-NR), raising systolic pressure for symptomatic vasospasm (2b, B-NR) and, for severe vasospasm, intra-arterial vasodilators and angioplasty (2b, B-NR). Prophylactic haemodynamic augmentation is 3: Harm, B-R [[Hoh2023]].`,
  hook:`DCI mostly days 4 to 14, peak days 6 to 10 [[Hoh2023]].`},
 {from:.476,at:.56,k:'Days 10 to 14',t:'The window closes',
  txt:`After the peak on days 6 to 10, the window AHA/ASA describes runs to day 14 [[Hoh2023]]. Subacute hydrocephalus runs days 4 to 14 in one review's scheme [[Chen2017]].`},
 {from:.667,at:.84,k:'Days 14 to 21',t:'Nimodipine finishes, the long road starts',
  txt:`BRANT gave oral nimodipine 60 mg every 4 hours for 21 days, started within 96 hours [[Pickard1989]]. Chronic hydrocephalus (after 2 weeks) affects 10 to 20% in one review [[Chen2017]]. Before discharge, AHA/ASA 2023 asks for validated screening of physical, cognitive, behavioural and quality-of-life deficits (1, B-NR) [[Hoh2023]].`,
  pt:`Blood around the brain can cause trouble days later, so people often stay in hospital for up to two weeks and take a medicine called nimodipine [[Hoh2023,Pickard1989]].`}];
const SH_LANES=[
 {n:'Secure aneurysm',note:'within 24 h',seg:[[0,1,'--good-soft','--good']],out:'preferably within 24 h'},
 {n:'Rebleeding',note:'highest first 6 h',seg:[[0,1,'--bad-soft','--bad']],out:'most within 24 h, highest in first 6 h'},
 {n:'Early brain injury',note:'24 to 48 h',seg:[[0,2,'--warn-soft','--warn']],out:'first 24 to 48 h'},
 {n:'Hydrocephalus',note:'one review\'s phases',seg:[[0,3,'--bad-soft','--bad','acute'],[4,14,'--warn-soft','--warn','subacute'],[14,21,'--panel-2','--muted','chronic']]},
 {n:'DCI and vasospasm',note:'AHA/ASA days 4 to 14',seg:[[4,14,'--warn-soft','--warn','days 4 to 14',0,12],[6,10,'--bad-soft','--bad','peak 6 to 10']]},
 {n:'Hyponatraemia',note:'pooled 37%',seg:[[0,21,'--panel-2','--muted','no day window in these sources',1]]},
 {n:'Nimodipine',note:'BRANT course',seg:[[0,21,'--good-soft','--good','60 mg every 4 h for 21 days']]}];
const SH_C=[
 {from:0,at:.08,k:'Before',t:'A burst aneurysm, not yet secured',
  txt:`Both methods aim for complete obliteration whenever feasible (AHA/ASA 2023, 1, B-NR) [[Hoh2023]]. UK data from 3341 people: 75% coiled [[Galea2017]].`},
 {from:.18,at:.42,k:'The two methods',t:'Coil from inside, clip from outside',
  txt:`In coiling, a microcatheter reaches the sac through the arteries and packs it with platinum, so blood leaves the sac. In clipping, a surgeon places a metal clip across the neck. ISAT randomised 2143 people who could have either [[Molyneux2002]].`},
 {from:.62,at:.74,k:'ISAT at 1 year',t:'Less death or dependence with coiling',
  txt:`Dependent or dead at 1 year: 23.7% coiling versus 30.6% clipping (ARR 6.9%, 2.5 to 11.3) [[Molyneux2002]]. In the 2005 report: 23.5% versus 30.9% (ARR 7.4%, 3.6 to 11.2). The survival advantage held up to 7 years [[Molyneux2005]]. Among otherwise non-disabled survivors, cognitive impairment was also less often seen after coiling (OR 0.58) [[Scott2010]].`,
  hook:`ISAT: 1-year death or dependence about 7% less with coiling, late rebleeding more common [[Molyneux2005]].`},
 {from:.84,at:.94,k:'ISAT later',t:'The gap persists, but coils rebleed more',
  txt:`UK cohort at 10 to 18.5 years (1644 people): alive at 10 years 83% versus 79% (OR 1.35). Alive and independent OR 1.34 (1.07 to 1.67). 33 recurrent SAH after 1 year, 17 from the target aneurysm [[Molyneux2015]]. Target aneurysm recurrent aSAH is quoted as 1.6% coiling and 0.5% clipping [[Vergouwen2026]]. Epilepsy was lower with coiling [[Molyneux2005]].`}];
const SH_C_L={coil:{h:'Coiling',s:'through the arteries',L:['less dependency at 1 year','less epilepsy','more late rebleeding']},clip:{h:'Clipping',s:'open surgery',L:['more dependency at 1 year','more epilepsy','less late rebleeding']}};
const SH_C_B=[{t:'Dependent or dead, 1 year',a:23.7,b:30.6,mx:100,u:'%'},{t:'Alive, 10 years (UK)',a:83,b:79,mx:100,u:'%'},{t:'Target rebleed (scaled to 2%)',a:1.6,b:.5,mx:100,u:'%'}];
const SH_N=[
 {from:0,at:.5,k:'The course',t:'Every 4 hours for 21 days',txt:`BRANT, the British aneurysm nimodipine trial (554 people): 60 mg orally every 4 hours for 21 days, started within 96 hours [[Pickard1989]]. AHA/ASA 2023: early enteral nimodipine (Class 1, A) [[Hoh2023]]. It is one of only two things that ESO 2026 says high-level evidence backs [[Vergouwen2026]].`},
 {from:.75,at:1,k:'The result',t:'Fewer infarcts, fewer poor outcomes',txt:`Cerebral infarction 22% versus 33% (34% reduction, 13 to 50). Poor outcome 20% versus 33% (40% reduction, 20 to 55) [[Pickard1989]]. Cochrane (16 trials, 3361 people): oral nimodipine RR 0.67 (0.55 to 0.81), with results depending largely on one large trial [[DorhoutMees2007]].`,
  hook:`Oral nimodipine 60 mg every 4 hours for 21 days in BRANT; never IV from capsules [[Pickard1989,FDA-Nimodipine]].`}];
const SH_NA=[{n:'SIAD',v:36,col:'--aca'},{n:'IV fluids',v:5,col:'--ca'},{n:'Hypovolaemia',v:5,col:'--vert'},{n:'Glucocorticoid',v:4,col:'--pca'}];
const SH_TR={
 cf:{h:'Case fatality',y0:1988,y1:2010,mx:60,unit:'%',L:[{n:'90 days',a:49,b:29},{n:'30 days',a:46,b:25},{n:'5 days',a:32,b:18}],
  k:'Greater Cincinnati, 1988 to 2010',t:'Case fatality fell, with a caveat',
  txt:`Case fatality fell at 5 days 32 to 18%, at 30 days 46 to 25%, at 90 days 49 to 29%, while incidence stayed stable (8.8 to 7.7 per 100 000). For proven or highly likely aneurysmal SAH alone, the declines were no longer significant [[Mackey2016]].`},
 in:{h:'Incidence per 100 000 person-years',y0:1980,y1:2010,mx:14,unit:'',L:[{n:'per 100 000',a:10.2,b:6.1}],
  k:'Worldwide, 1980 to 2010',t:'Fewer bleeds, tracking blood pressure and smoking',
  txt:`Crude incidence fell from 10.2 to 6.1 per 100 000 person-years, by 1.7% a year. It fell 7.1% per mm Hg fall in population SBP and 2.4% per percentage point fall in smoking. It fell 40.6% in Europe, 46.2% in Asia and 14.0% in North America, and rose 59.1% in Japan [[Etminan2019]]. A Lancet review words Japan as a decrease of 59% [[Claassen2022]]: the primary analysis is shown.`}};
const SH_LT=[
 {n:'Any complaint',k:95,big:'94.6%',d:'of 111 people at 3 months',t:'Cognitive or emotional complaints',txt:`94.6% of 111 people reported at least one complaint that hampered daily life at 3 months. Most frequent: mental slowness, short-term memory, attention [[Passier2010]].`},
 {n:'Cognition',k:32,big:'32.1%',d:'of 474 non-disabled survivors, 12 months',t:'Impairment despite no visible disability',txt:`In ISAT, 32.1% of 474 otherwise non-disabled survivors had cognitive impairment at 12 months, less often after coiling (OR 0.58, 0.38 to 0.87) [[Scott2010]].`},
 {n:'Back at work',k:61,big:'61.4%',d:'of 88 working at the time, 2 to 4 years on',t:'Returning to work',txt:`Of 88 people working at the time, 61.4% returned to work 2 to 4 years later [[Passier2011]].`},
 {n:'Fully back at work',k:35,big:'35.2%',d:'of 88 working at the time, 2 to 4 years on',t:'Fully back at work',txt:`Only 35.2% of the 88 resumed work completely [[Passier2011]].`}];

inits.sah=()=>{
  /* ---------- day 0 to 21 ---------- */
  const svg=$('#shSvg'),rg=$('#shT');
  function draw(t){const N=vb(svg,'720 450','400 684'),day=21*t,p=phaseOf(SH_STEPS,t);let s='';
    const L=N?{px:16,pw:368,ly:62,lh:40,ax:[16,358,.56],an:[172,368,.5],ves:[172,492,212],lst:[16,544]}:{px:166,pw:540,ly:42,lh:28,ax:[16,256,.62],an:[184,266,.5],ves:[176,396,280],lst:[480,268]};
    const X=d=>L.px+L.pw*d/21,ytop=L.ly+L.lh*SH_LANES.length,HALO='paint-order:stroke;stroke:var(--panel);stroke-width:3;stroke-linejoin:round';
    let bars='',txt='';
    /* axis */
    [0,1,4,6,10,14,21].forEach(d=>{bars+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${L.ly-14}" y2="${f1(ytop)}" class="grid"/><text x="${f1(X(d))}" y="${L.ly-20}" class="t-xs t-mid">${d}</text>`});
    SH_LANES.forEach((l,i)=>{const y=L.ly+i*L.lh,bh=20,by=N?y+15:y;
      if(N)txt+=`<text x="${L.px}" y="${y+11}" class="t-sm" style="fill:var(--ink);font-weight:600;${HALO}">${l.n}${l.out?': '+l.out:''}</text>`;
      else txt+=`<text x="12" y="${y+14}" class="t-sm" style="fill:var(--ink);font-weight:600">${l.n}</text>`;
      l.seg.forEach(g=>{const xa=X(g[0]),xb=X(g[1]);bars+=`<rect x="${f1(xa)}" y="${by}" width="${f1(xb-xa)}" height="${bh}" rx="3" style="fill:var(${g[2]});stroke:var(${g[3]});stroke-width:1.2${g[5]?';stroke-dasharray:5 4':''}"/>`;
        if(g[4]){const c=g[6]==null?(xa+xb)/2:X(g[6]);txt+=`<text x="${f1(c)}" y="${by+14}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600;${HALO.replace('var(--panel)',`var(${g[2]})`)}">${g[4]}</text>`}});
      if(!N&&l.out)txt+=`<text x="${f1(X(l.seg[0][1])+6)}" y="${by+14}" class="t-sm" style="fill:var(--ink);${HALO}">${l.out}</text>`});
    /* cursor: over the bars, under the words */
    const cx=X(day),cur=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.ly-10}" y2="${f1(ytop+2)}" style="stroke:var(--accent);stroke-width:2"/><path d="M${f1(cx)} ${L.ly-9}l-5 -7h10Z" style="fill:var(--accent)"/>`;
    s+=bars+cur+txt;
    const dl=day<1?`Hour ${Math.round(day*24)}`:`Day ${Math.floor(day)}`;
    s+=`<text x="${N?L.px:12}" y="${N?20:22}" class="t-lbl">${dl}</text>`;
    /* slice */
    s+=brainAxial(L.ax[0],L.ax[1],L.ax[2],{sah:lerp(1,.45,ramp(day,2,21)),ivh:.35*ramp(day,0,1)*(1-.6*ramp(day,10,21))}).svg;
    /* the aneurysm being secured */
    const co=ramp(day,.5,1),rp=day<.5?.45*(1-ramp(day,.3,.5)):0;
    s+=aneurysm(L.an[0],L.an[1],L.an[2],{rupture:rp,coil:co,flow:.8,ph:t*30}).svg;
    s+=`<text x="${f1(L.an[0]+105)}" y="${L.an[1]+14}" class="t-xs" style="fill:var(--ink)">${co>=1?'secured (coil shown)':co>0?'being secured':'not yet secured'}</text>`;
    /* a vessel that narrows in spasm */
    const [vx,vy,vw]=L.ves,sp=ramp(day,4,6.5)*(1-ramp(day,10,14)),nw=lerp(9,3,sp),mid=vx+vw/2;
    const up=[],lo=[];for(let i=0;i<=40;i++){const u=i/40,x=vx+vw*u,k=Math.exp(-Math.pow((u-.5)/.18,2)),h=lerp(9,nw,k);up.push([x,vy-h]);lo.unshift([x,vy+h])}
    s+=`<path d="${ptsD(up)}L${ptsD(lo).slice(1)}Z" style="fill:var(--artery);stroke:var(--artery-line);stroke-width:1.4"/>`;
    s+=`<text x="${vx+vw}" y="${vy-15}" class="t-xs t-end" style="fill:var(--ink)">${sp>.6?'artery in spasm':sp>0?'artery narrowing':'artery at normal width'}</text><text x="${vx+vw}" y="${vy+24}" class="t-xs t-end">drawing only; DCI is more than spasm</text>`;
    /* active now */
    const act=[];if(day<1){act.push('Rebleeding risk highest','Secure the aneurysm')}if(day<2)act.push('Early brain injury phase');
    if(day<3)act.push('Acute hydrocephalus');else if(day>=4&&day<14)act.push('Subacute hydrocephalus');else if(day>=14)act.push('Chronic hydrocephalus');
    if(day>=6&&day<=10)act.push('DCI at peak risk');else if(day>=4&&day<14)act.push('DCI window open');
    act.push('Sodium watched','Nimodipine course');
    s+=`<text x="${L.lst[0]}" y="${L.lst[1]}" class="t-lbl">In play at this point</text>`;
    act.forEach((a,i)=>{const y=L.lst[1]+20+i*17;s+=`<circle cx="${L.lst[0]+5}" cy="${y-4}" r="3" style="fill:var(--accent)"/><text x="${L.lst[0]+14}" y="${y}" class="t-sm" style="fill:var(--ink)">${a}</text>`});
    svg.innerHTML=s;setSt(p);$('#shNote').innerHTML=noteHTML(SH_STEPS[p]);rg.setAttribute('aria-valuetext',dl+'. '+SH_STEPS[p].t)}
  const stop=playWire(rg,$('#shPlay'),draw,26000,'%t:player.replay%','sah');
  const setSt=stepWire($('#shSteps'),SH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- coil against clip ---------- */
  const cS=$('#scSvg'),cR=$('#scT');
  function drawC(t){const N=vb(cS,'720 400','400 760'),p=phaseOf(SH_C,t);let s='';
    const L=N?{a:[[8,40,.92],[204,40,.92]],tx:[14,210],ty:228,bx:14,by:360,bw:372}:{a:[[14,40,1],[232,40,1]],tx:[24,242],ty:246,bx:466,by:40,bw:244};
    const co=ease(ramp(t,.18,.5)),cp=ease(ramp(t,.3,.55)),rp=.5*(1-ramp(t,.06,.18));
    [['coil',{coil:co,rupture:rp,flow:.8,ph:t*20}],['clip',{clip:cp,rupture:rp,flow:.8,ph:t*20}]].forEach((g,i)=>{const a=L.a[i],D=SH_C_L[g[0]];
      s+=`<text x="${L.tx[i]}" y="24" class="t-big">${D.h}</text>`;
      s+=aneurysm(a[0],a[1],a[2],g[1]).svg;
      s+=`<text x="${L.tx[i]}" y="${L.ty}" class="t-sm" style="fill:var(--ink)">${D.s}</text>`;
      const op=ramp(t,.84,.9);D.L.forEach((x,k)=>{s+=`<text x="${L.tx[i]}" y="${L.ty+22+k*18}" class="t-sm" style="opacity:${f1(op)};fill:var(--ink)">${x}</text>`})});
    /* ISAT bars */
    const u=ease(ramp(t,.6,.74));
    SH_C_B.forEach((B,i)=>{const uu=i===0?u:ease(ramp(t,.84,.94)),y=L.by+i*(N?128:118),lw=46,bw=L.bw-lw-52;
      s+=`<text x="${L.bx}" y="${y}" class="t-lbl">${B.t}</text>`;
      [['Coil',B.a,'var(--device)'],['Clip',B.b,'var(--accent)']].forEach((r,k)=>{const yy=y+12+k*34,mx=i===2?2:B.mx,w=bw*r[1]/mx*uu;
        s+=`<text x="${L.bx}" y="${yy+16}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><rect x="${L.bx+lw}" y="${yy}" width="${f1(Math.max(w,1))}" height="24" rx="3" style="fill:${r[2]}"/>`;
        if(uu>0)s+=`<text x="${f1(L.bx+lw+Math.max(w,1)+6)}" y="${yy+16}" class="t-sm" style="fill:var(--ink);opacity:${f1(uu)}">${r[1]}${B.u}</text>`})});
    cS.innerHTML=s;setC(p);$('#scNote').innerHTML=noteHTML(SH_C[p])}
  const stopC=playWire(cR,$('#scPlay'),drawC,14000,'%t:player.replay%','sah');
  const setC=stepWire($('#scSteps'),SH_C,cR,drawC,stopC);
  drawC(+cR.value);

  /* ---------- nimodipine ---------- */
  const nS=$('#snSvg'),nR=$('#snT');
  function drawN(t){const N=vb(nS,'720 300','400 560');let s='';const u=ramp(t,0,.72),done=Math.round(126*u),day=Math.min(21,Math.floor(done/6)+(done%6?1:0));
    const gx=N?22:20,gy=52,cw=N?16.8:16,rh=N?16:16;
    s+=`<text x="${gx}" y="18" class="t-lbl">BRANT course: 6 a day for 21 days</text><text x="${gx}" y="36" class="t-sm" style="fill:var(--ink)">${done} of 126 doses, day ${day}</text>`;
    for(let d=0;d<21;d++)for(let k=0;k<6;k++){const i=d*6+k;s+=`<circle cx="${f1(gx+6+d*cw)}" cy="${f1(gy+6+k*rh)}" r="5.4" style="fill:${i<done?'var(--tpa)':'var(--panel-2)'};stroke:var(--line)"/>`}
    [1,7,14,21].forEach(d=>{s+=`<text x="${f1(gx+6+(d-1)*cw)}" y="${gy+6*rh+12}" class="t-xs t-mid">${d}</text>`});
    s+=`<text x="${gx}" y="${gy+6*rh+28}" class="t-sm">day of the course</text>`;
    const bx=N?22:400,by=N?222:40,bw=N?360:300,v=ease(ramp(t,.75,.98));
    [{t:'Cerebral infarction',a:22,b:33},{t:'Poor outcome',a:20,b:33}].forEach((B,i)=>{const y=by+i*(N?150:118);
      s+=`<text x="${bx}" y="${y}" class="t-lbl">${B.t}</text>`;
      [['Nimodipine',B.a,'var(--tpa)'],['Placebo',B.b,'var(--muted)']].forEach((r,k)=>{const yy=y+12+k*36,w=(bw-140)*r[1]/40*v,lw=84;
        s+=`<text x="${bx}" y="${yy+16}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><rect x="${bx+lw}" y="${yy}" width="${f1(Math.max(w,1))}" height="26" rx="3" style="fill:${r[2]}"/>`;
        if(v>0)s+=`<text x="${f1(bx+lw+w+6)}" y="${yy+17}" class="t-sm" style="fill:var(--ink)">${r[1]}%</text>`})});
    nS.innerHTML=s;$('#snNote').innerHTML=noteHTML(SH_N[t<.75?0:1])}
  playWire(nR,$('#snPlay'),drawN,9000,'%t:player.replay%','sah');drawN(+nR.value);

  /* ---------- sodium causes ---------- */
  const aS=$('#shNaSvg');
  function drawNa(){const N=vb(aS,'560 150','400 176'),W=N?380:540,x0=10;let s=`<text x="${x0}" y="18" class="t-lbl">Causes in 49 people with sodium under 135 mmol/L</text>`,xx=x0;
    SH_NA.forEach(g=>{const w=W*g.v/50;s+=`<rect x="${f1(xx)}" y="32" width="${f1(w-1.5)}" height="34" style="fill:var(${g.col})"/><text x="${f1(xx+w/2)}" y="82" class="t-sm t-mid" style="fill:var(--ink)">${g.v}</text>`;xx+=w});
    const y0=104;[...SH_NA,{n:'Salt wasting',v:0,col:'--line'}].forEach((g,i)=>{const col=N?1:2,xp=x0+(N?(i%2)*190:(i%3)*180),yp=y0+(N?Math.floor(i/2):Math.floor(i/3))*22;
      s+=`<rect x="${xp}" y="${yp-9}" width="11" height="11" style="fill:var(${g.col})"/><text x="${xp+16}" y="${yp}" class="t-sm" style="fill:var(--ink)">${g.n}: ${g.v}</text>`});
    aS.innerHTML=s}
  drawNa();

  /* ---------- trends ---------- */
  const tS=$('#shTrSvg');let tK='cf';
  function drawTr(){const T=SH_TR[tK],N=vb(tS,'720 300','400 340');let s=`<text x="12" y="16" class="t-lbl">${T.h}</text>`;const x0=N?60:150,x1=N?300:470,yT=30,yB=N?300:262,Y=v=>yB-(yB-yT)*v/T.mx;
    [x0,x1].forEach(x=>{s+=`<line x1="${x}" x2="${x}" y1="${yT}" y2="${yB}" class="axis"/>`});
    s+=`<text x="${x0}" y="${yB+18}" class="t-sm t-mid" style="fill:var(--ink)">${T.y0}</text><text x="${x1}" y="${yB+18}" class="t-sm t-mid" style="fill:var(--ink)">${T.y1}</text>`;
    T.L.forEach((l,i)=>{const col=['var(--bad)','var(--accent)','var(--pca)'][i],gap=(tK==='cf'&&i===0)?-6:(tK==='cf'&&i===1)?6:0,gapB=(tK==='cf'&&i===0)?-3:(tK==='cf'&&i===1)?5:0;
      s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(l.a))}" y2="${f1(Y(l.b))}" style="stroke:${col};stroke-width:2.6"/><circle cx="${x0}" cy="${f1(Y(l.a))}" r="4.5" style="fill:${col}"/><circle cx="${x1}" cy="${f1(Y(l.b))}" r="4.5" style="fill:${col}"/>`;
      s+=`<text x="${x0-9}" y="${f1(Y(l.a)+4+gap)}" class="t-sm t-end" style="fill:var(--ink)">${l.a}${T.unit}</text><text x="${x1+9}" y="${f1(Y(l.b)+4+gapB)}" class="t-sm" style="fill:var(--ink)">${l.b}${T.unit}${N||tK!=='cf'?'':' at '+l.n}</text>`;
      if(N)s+=`<text x="${x1+9}" y="${f1(Y(l.b)+16+gapB)}" class="t-xs">${l.n}</text>`});
    tS.innerHTML=s;$('#shTrNote').innerHTML=noteHTML(T)}
  $$('[data-sht]').forEach(b=>b.addEventListener('click',()=>{tK=b.dataset.sht;$$('[data-sht]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawTr()}));drawTr();

  /* ---------- long-term ---------- */
  const lS=$('#shLtSvg');let lI=0;
  $('#shLtBtns').innerHTML=SH_LT.map((x,i)=>`<button class="btn" data-shl="${i}" aria-pressed="${i===0}">${x.n}</button>`).join('');
  function drawLt(){const T=SH_LT[lI],N=vb(lS,'720 165','400 186');let s='';
    const I=icons(N?14:20,N?70:30,{n:100,cols:N?20:20,size:N?15:18,gap:N?4:6,shape:'person',k:T.k,col:'var(--accent)'});s+=I.svg;
    if(N){s+=`<text x="14" y="28" class="t-big" style="font-size:24px">${T.big}</text><text x="14" y="50" class="t-sm" style="fill:var(--ink)">${T.d}</text>`}
    else{s+=`<text x="520" y="70" class="t-big" style="font-size:30px">${T.big}</text>`;const w=T.d.split(', ');w.forEach((x,i)=>{s+=`<text x="520" y="${94+i*16}" class="t-sm" style="fill:var(--ink)">${x}</text>`})}
    lS.innerHTML=s;$('#shLtNote').innerHTML=noteHTML({k:'Long-term',t:T.t,txt:T.txt})}
  $('#shLtBtns').addEventListener('click',e=>{const b=e.target.closest('[data-shl]');if(!b)return;lI=+b.dataset.shl;$$('[data-shl]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawLt()});drawLt();

  const prev=redraws.sah;redraws.sah=()=>{prev&&prev();drawNa();drawTr();drawLt()};
};
