/* =============== 2.1 Spirometry & the FEV1/FVC ratio =============== */
/* Main scrubber: one forced blow. The lungs empty while the kit's spiroVT (volume-time) and spiroFV
   (flow-volume) curves build, FEV1 is marked at 1 s and FVC at the plateau, two repeat blows are
   overlaid, an inhaler puff is followed by the post-bronchodilator blow, and a scale places the ratio
   against 0.70. COPD numbers are the UPLIFT means (derived curves, see the research pass); the healthy
   curve is the ATS worked example's predicted FEV1 with an assumed ratio of 0.80, labelled on screen. */
const SP_STEPS=[
 {from:0,at:.08,k:'Breathe in',t:'Fill to the top',sub:'a maximal breath in, to total lung capacity',
  txt:`The forced vital capacity (FVC) manoeuvre has four phases: a maximal breath in, a "blast" of expiration, continued complete expiration for up to 15 seconds, and a maximal breath back in to full lungs [[Graham2019]]. All first diagnostic spirometry is done before and after a bronchodilator, because a normal baseline result does not rule out a bronchodilator response [[Graham2019]].`,
  pt:`You breathe in as deeply as you can, until your lungs feel completely full. Then you blow out into the machine as hard and as long as you can.`,
  hook:`Four phases of an FVC blow: maximal inspiration, blast, complete expiration (up to 15 s), maximal inspiration [[Graham2019]].`},
 {from:.17,at:.3,k:'Blast',t:'Time zero and the first second',sub:'the volume blown out in 1 second is the FEV1',
  txt:`Time zero is found by back-extrapolation (the dashed line). To show a maximal start, the back-extrapolated volume must be under 5% of FVC or 0.100 L, whichever is greater [[Graham2019]]. The volume blown out by 1 second is the FEV1: 1.10 L in the COPD example, the mean before bronchodilator in 5,756 UPLIFT participants (39.3% predicted) [[Tashkin2008]], and 4.50 L in the healthy example, the ATS predicted value for a 40-year-old man 6 feet tall [[Bhakta2023]].`,
  pt:`The first second is the "blast". The amount of air you push out in that one second is called FEV1.`,
  hook:`Back-extrapolated volume must be under 5% of FVC or 0.100 L, whichever is greater [[Graham2019]].`},
 {from:.34,at:.47,k:'Keep going',t:'Empty completely',sub:'keep blowing to a plateau, then breathe back in',
  txt:`The blow ends at one of three signs: a plateau (no more than 0.025 L change in the last 1 second), an expiratory time of 15 seconds or more, or an FVC within the repeatability tolerance of (or greater than) the largest previous FVC [[Graham2019]]. Narrowed airways empty slowly, so the COPD curve keeps rising for many seconds; its FVC is 2.63 L [[Tashkin2008]]. A full breath back in closes the flow–volume loop [[Graham2019]].`,
  pt:`You keep blowing until nothing more comes out, then take a big breath back in. Many people find this the hardest part: in a survey for the 2019 standard, 31% said being told to keep blowing was a moderate or serious problem [[Graham2019]].`,
  hook:`End of blow: plateau ≤ 0.025 L in 1 s, or ≥ 15 s, or FVC matching the largest earlier FVC [[Graham2019]].`},
 {from:.5,at:.62,k:'Repeat',t:'Three good blows',sub:'acceptable and repeatable: quality grade A',
  txt:`The aim is at least three acceptable blows. Grade A needs three or more acceptable blows with the two largest FEV1 and the two largest FVC each within 0.150 L [[Graham2019]]. The largest FEV1 and the largest FVC are reported, even from different blows, and the ratio is given to two decimal places. Eight blows is "generally a practical upper limit" for adults [[Graham2019]].`,
  pt:`You do the blow at least three times. The results have to be close to each other, so the team knows the test is reliable.`,
  hook:`Repeatability (age > 6): two best FEV1 and two best FVC within 0.150 L; grade A needs ≥ 3 acceptable blows [[Graham2019]].`},
 {from:.67,at:.8,k:'Bronchodilator',t:'Test again after the inhaler',sub:'GOLD uses the post-bronchodilator blow',
  txt:`GOLD 2023 needs a post-bronchodilator ratio to establish the diagnosis [[Agusti2023]]. In UPLIFT, 80 µg ipratropium followed by 400 µg salbutamol raised FEV1 by a mean 229 mL and FVC by 407 mL [[Tashkin2008]]. In ECLIPSE, 400 µg salbutamol raised FEV1 by a mean 0.12 L in COPD and 0.08 L in non-smoking controls, and a person's reversibility status changed between tests over a year [[Albert2012]].`,
  pt:`You take a puff of reliever medicine, wait, and do the blows again. The doctor uses this second set of results.`,
  hook:`Diagnosis uses post-bronchodilator spirometry; reversibility itself varies from test to test [[Agusti2023,Albert2012]].`},
 {from:.84,at:.95,k:'The ratio',t:'Below 0.70 means obstruction',sub:'FEV1 ÷ FVC after the inhaler, then the GOLD grade',
  txt:`A post-bronchodilator FEV1/FVC below 0.7 confirms airflow obstruction in the right clinical context, and FEV1 % predicted then sets GOLD grade 1–4: ≥ 80%, 50–79%, 30–49% and &lt; 30% [[Agusti2023,Lin2025]]. In the COPD example, 1.33 ÷ 3.04 = 0.44. A ratio between 0.60 and 0.80 on a single test should be repeated on another occasion [[Agusti2023]].`,
  pt:`The machine divides the first-second air by the total. If the answer is less than 0.70 after the medicine, the airways are narrowed.`,
  hook:`COPD needs a post-bronchodilator FEV1/FVC < 0.70; GOLD grade then comes from FEV1 % predicted [[Agusti2023,Lin2025]].`}
];
const SP_CURVE={
  h:{pre:{fev1:4.50,fvc:5.62},reps:[{fev1:4.44,fvc:5.55},{fev1:4.38,fvc:5.49}],pk:1,scoop:0},
  c:{pre:{fev1:1.10,fvc:2.63},post:{fev1:1.33,fvc:3.04},reps:[{fev1:1.06,fvc:2.57},{fev1:1.02,fvc:2.52}],pk:.42,pkPost:.5,scoop:1}
};
const SP_TXT={
  vt:'Volume against time',fv:'Flow against volume',sec:'seconds',lit:'litres',
  state:{inn:'breathing in',out:'blowing out',full:'breathing back in',rest:'resting',puff:'inhaler puff'},
  healthy:'healthy example',crit:'THE 2019 STANDARD SAYS',critBD:'WHAT THE TRIALS FOUND',ratioK:'THE RATIO',
  fev1:v=>`FEV1 ${v} L`,fvc:v=>`FVC ${v} L`,fev1Both:(a,b)=>`FEV1 ${a} → ${b} L`,fvcBoth:(a,b)=>`FVC ${a} → ${b} L`,
  strip:[
    'Phase 1 of 4: a maximal breath in, to the top. Then comes the blast, a complete blow out for up to 15 seconds, and a full breath back in.',
    'Dashed line: back-extrapolation finds time zero. For a maximal start, the back-extrapolated volume must be under 5% of FVC or 0.100 L, whichever is greater.',
    'The blow ends at a plateau (no more than 0.025 L change in the last second, shown in green), at 15 seconds of blowing, or when FVC matches the largest earlier FVC.',
    (a,b)=>`Grade A needs at least 3 acceptable blows, with the two largest FEV1 and the two largest FVC each within 0.150 L. Here they differ by ${a} L and ${b} L (illustrative blows).`,
    {c:'After the inhaler (UPLIFT: 80 µg ipratropium, then 400 µg salbutamol) mean FEV1 rose by 229 mL and FVC by 407 mL. Dashed: the blow before the inhaler.',
     h:'In ECLIPSE, 400 µg salbutamol raised FEV1 by a mean 0.08 L in non-smoking controls: a healthy blow changes little, so no second curve is drawn here.'}],
  ratioEq:(a,b,r)=>`FEV1/FVC = ${a} ÷ ${b} = ${r}`,
  below:'below 0.70: airflow obstruction',above:'0.70 or above: not obstructed',
  pctC:'FEV1 about 48% predicted (derived)',gradeC:'GOLD 3, severe (30–49%)',noGrade:'no GOLD grade: ratio is normal',
  thr:'0.70',win:'dashed box: repeat-test window, 0.60 to 0.80',
  /* calculator */
  need:'Enter post-bronchodilator FEV1 and FVC in litres to see the ratio.',
  bigger:'FEV1 cannot be larger than FVC: FEV1 is the part of the FVC blown out in the first second. Check the two numbers.',
  head:r=>`<span class="kicker">FEV1/FVC, to two decimal places</span><div class="big-num">${r}</div>`,
  vBelow:'Below 0.70: meets GOLD’s spirometric threshold for airflow obstruction',
  vAbove:'0.70 or above: not obstructed by the fixed ratio',
  window:'The ratio is between 0.60 and 0.80. GOLD 2023 advises repeating spirometry on a separate occasion, because biological variation can move the ratio [[Agusti2023]].',
  under60:'An initial ratio below 0.6 is, in GOLD’s words, "very unlikely" to rise spontaneously above 0.7 [[Agusti2023]].',
  gname:{1:'GOLD 1, mild (FEV1 ≥ 80% predicted)',2:'GOLD 2, moderate (50–79%)',3:'GOLD 3, severe (30–49%)',4:'GOLD 4, very severe (below 30%)'},
  grade:(pct,g)=>`With a ratio below 0.70, an FEV1 of ${pct}% predicted falls in <b>${g}</b> [[Lin2025,Agusti2023]].`,
  needPct:'Add FEV1 % predicted to place the GOLD grade.',
  prism:pct=>`The ratio is normal but FEV1 is ${pct}% predicted, below 80%. GOLD 2023 calls this pattern PRISm (preserved ratio impaired spirometry). It is not COPD, but it is associated with more all-cause mortality and can move to normal, obstructive or restrictive spirometry over time [[Agusti2023]]. <button class="btn ghost" data-go="lookalikes">PRISm and pre-COPD</button>`,
  lln:{both:l=>`Below both 0.70 and the LLN you entered (${l}): the two rules agree.`,
    fixed:l=>`Below 0.70 but at or above the LLN you entered (${l}): the fixed ratio calls obstruction and the LLN does not. GOLD acknowledges that, compared with the LLN, the fixed ratio may overdiagnose the elderly, especially in mild disease [[Agusti2023]].`,
    lln:l=>`At or above 0.70 but below the LLN you entered (${l}): the LLN calls obstruction and the fixed ratio does not. GOLD acknowledges the fixed ratio may underdiagnose young adults [[Agusti2023]].`,
    none:l=>`At or above both 0.70 and the LLN you entered (${l}): the two rules agree.`},
  ageO:(a,c)=>`At ${a} years you are past ${c}, the median age at which the LLN of FEV1/FVC fell below 0.70 in healthy people of the chosen sex [[Swanney2008]]. At this age the fixed ratio tends to label more people as obstructed than the LLN would.`,
  ageY:(a,c)=>`At ${a} years you are below ${c}, the median age at which the LLN of FEV1/FVC fell below 0.70 in healthy people of the chosen sex [[Swanney2008]]. At this age the LLN tends to label more people as obstructed than the fixed ratio would.`,
  ageNoSex:'The LLN of FEV1/FVC fell below 0.70 at a median age of 42 for men and 48 for women in healthy people [[Swanney2008]]. Choose a sex to compare with the age you entered.',
  cRatio:'FEV1/FVC',cPct:'FEV1, % predicted',cLln:v=>`LLN ${v}`,cNoPct:'enter % predicted',
  /* age chart */
  ageAx:'age (years)',legM:'LLN, men',legF:'LLN, women',legFix:'fixed 0.70',
  cross:{m:'42 (men)',f:'48 (women)'},miss:'missed by 0.70',over:'over-called by 0.70',
  barsT:'Healthy never-smokers labelled obstructed by the fixed ratio',
  bars:['Men over 60: 17–45%','Women over 60: 7–26%','Bergen, over 70: about 35%','Bergen, over 80: about 50%'],
  ageV:a=>`${a} years`,
  ageNote:{m:{y:a=>`At ${a} years, men are younger than 42, the median age at which the LLN fell below 0.70 in healthy men [[Swanney2008]]. A ratio between 0.70 and the LLN is low by the LLN but passes the fixed ratio: the underdiagnosis of young adults that GOLD acknowledges [[Agusti2023]].`,
             o:a=>`At ${a} years, men are past 42, the median age at which the LLN fell below 0.70 in healthy men [[Swanney2008]]. A ratio between the LLN and 0.70 counts as obstruction by the fixed ratio but is normal by the LLN: the overdiagnosis of older people that GOLD acknowledges [[Agusti2023]].`},
           f:{y:a=>`At ${a} years, women are younger than 48, the median age at which the LLN fell below 0.70 in healthy women [[Swanney2008]]. A ratio between 0.70 and the LLN is low by the LLN but passes the fixed ratio: the underdiagnosis of young adults that GOLD acknowledges [[Agusti2023]].`,
             o:a=>`At ${a} years, women are past 48, the median age at which the LLN fell below 0.70 in healthy women [[Swanney2008]]. A ratio between the LLN and 0.70 counts as obstruction by the fixed ratio but is normal by the LLN: the overdiagnosis of older people that GOLD acknowledges [[Agusti2023]].`}}
};
const SP_CROSS={m:42,f:48};
inits.spirometry=()=>{
  const svg=$('#spSvg'),rg=$('#spT'),note=$('#spNote'),tog=$('#spMode');
  let mode='c',setSt=()=>{};
  const spVol=(c,sec)=>sec<=0?0:c.fvc*spiroVT(c.fev1,c.fvc)(sec/6);
  function draw(t){
    const N=vb(svg,'720 400','400 740'),p=phaseOf(SP_STEPS,t),S=SP_STEPS[p],M=SP_CURVE[mode],cp=mode==='c';
    const L=N?{sub:52,lu:{x:16,y:76,w:150,h:196},lc:{x:91,y:96,s:124},vt:{x:206,y:100,w:178,h:146},fv:{x:40,y:318,w:344,h:146},st:{x:16,y:512,w:368,h:216},cw:50,
               bar:{x:32,y:572,w:336},ro:{x:32,y:644,dy:20}}
             :{sub:100,lu:{x:16,y:56,w:176,h:232},lc:{x:104,y:76,s:150},vt:{x:238,y:72,w:200,h:176},fv:{x:490,y:72,w:210,h:176},st:{x:16,y:300,w:688,h:92},cw:98,
               bar:{x:40,y:342,w:340},ro:{x:410,y:322,dy:19}};
    let s=`<text x="16" y="26" class="t-big" style="fill:var(--dx)">${S.t}</text>`+wrapT(16,42,S.sub,L.sub,{cls:'t-sm'}).svg;
    /* where the blow is */
    let sec=0,ins=0,vol=1,state='rest',puff=0,ps=0;
    const C0=M.pre,post=cp?M.post:null;
    if(p===0){vol=lerp(.4,1,ease(ramp(t,.02,.15)));state='inn'}
    else if(p===1){sec=ramp(t,.19,.32);state='out'}
    else if(p===2){sec=1+9*ramp(t,.35,.45);ins=ramp(t,.455,.495);state=ins>0?'full':'out'}
    else{sec=10;ins=1}
    if(p===1||p===2)vol=lerp(1-.72*spVol(C0,sec)/C0.fvc,1,ins);
    const rep=[ramp(t,.52,.57),ramp(t,.58,.63)];
    if(p===3){const b=Math.max(bump(t,.52,.57),bump(t,.58,.63));vol=1-.72*b;state=b>.05?'out':'rest'}
    if(p===4){puff=bump(t,.685,.72);
      if(cp){ps=10*ramp(t,.725,.81);vol=ps>0?1-.72*(spVol(post,ps)/post.fvc)*(1-ramp(t,.815,.835)):1;state=puff>.05?'puff':ps>0&&ps<10?'out':'rest'}
      else{vol=.9;state=puff>.05?'puff':'rest'}}
    if(p===5){vol=.85}
    /* lungs */
    const LU=L.lu,ls=L.lc.s*(.8+.2*vol);
    s+=`<rect x="${LU.x}" y="${LU.y}" width="${LU.w}" height="${LU.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=lungs(L.lc.x,L.lc.y+(L.lc.s-ls)*.3,ls,{hyper:cp?.5:0,bullae:cp?.45:0,breathe:vol,inflam:cp?.3:0});
    s+=`<text x="${LU.x+10}" y="${LU.y+LU.h-10}" class="t-xs" style="fill:var(--ink);font-weight:600">${SP_TXT.state[state]}</text>`;
    const ty=L.lc.y+(L.lc.s-ls)*.3;
    if(state==='out'||state==='inn'||state==='full'){const up=state==='out';for(let i=0;i<3;i++){const u=(t*30+i/3)%1,ax=L.lc.x+12+i*7,ay=up?ty+14-u*12:ty+2+u*12;
      s+=`<path d="M${f1(ax)} ${f1(ay)}l3 ${up?-6:6}" style="stroke:${up?'var(--dx)':'var(--air)'};stroke-width:1.8;stroke-linecap:round;opacity:${f1(1-u)}"/>`}}
    if(p===4)s+=inhaler(LU.x+22,LU.y+28,30,'pmdi',{puff,col:'var(--bd)'});
    /* volume-time */
    const VT=L.vt,ymax=6,tmax=10,X=sc=>VT.x+VT.w*sc/tmax,Y=v=>VT.y+VT.h-VT.h*v/ymax;
    s+=`<text x="${VT.x}" y="${VT.y-10}" class="t-lbl">${SP_TXT.vt}</text>`;
    s+=axes(VT.x,VT.y,VT.w,VT.h,{xt:[0,1,2,4,6,8,10].map(v=>[v/tmax,String(v)]),yt:[0,2,4,6].map(v=>[v/ymax,v+' L']),xl:SP_TXT.sec});
    const vtPath=(c,sc)=>pathFn(u=>spVol(c,u*sc)/ymax,X(0),X(sc),Y(0),Y(ymax),90);
    const mainCol=cp?'var(--bad)':'var(--dx)',postOn=cp&&p>=4&&ps>0||cp&&p===5;
    if(cp&&p>=2){const H=SP_CURVE.h.pre;s+=`<path d="${vtPath(H,10)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:2 4"/>`;
      s+=`<text x="${f1(VT.x+VT.w-4)}" y="${f1(Y(H.fvc)-6)}" class="t-xs t-end">${SP_TXT.healthy}</text>`}
    if(p===3)M.reps.forEach((c,k)=>{if(rep[k]>0)s+=`<path d="${vtPath(c,10*rep[k])}" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`});
    if(p===1){const sl=C0.fvc*(-Math.log(1-C0.fev1/C0.fvc))/6*6,tt=Math.min(1.1,.6*C0.fvc/sl);
      s+=`<path d="M${f1(X(0))} ${f1(Y(0))}L${f1(X(tt))} ${f1(Y(sl*tt))}" style="stroke:var(--dx);stroke-width:1.4;stroke-dasharray:4 3;fill:none"/>`}
    if(sec>0)s+=`<path d="${vtPath(C0,sec)}" style="fill:none;stroke:${postOn?'var(--muted)':mainCol};stroke-width:${postOn?1.6:2.6};${postOn?'stroke-dasharray:5 4':''}"/>`;
    if(p===2&&sec>=9.9){s+=`<path d="${pathFn(u=>spVol(C0,9+u)/ymax,X(9),X(10),Y(0),Y(ymax),12)}" style="fill:none;stroke:var(--good);stroke-width:5;stroke-linecap:round;opacity:.8"/>`}
    if(postOn)s+=`<path d="${vtPath(post,p===5?10:ps)}" style="fill:none;stroke:var(--bd);stroke-width:2.6"/>`;
    if(p>=1&&p<3&&sec>0&&sec<10){s+=`<circle cx="${f1(X(sec))}" cy="${f1(Y(spVol(C0,sec)))}" r="4.5" style="fill:${mainCol};stroke:var(--panel);stroke-width:2"/>`}
    if(sec>=.999){const fy=Y(C0.fev1);
      s+=`<path d="M${f1(X(1))} ${f1(Y(0))}V${f1(fy)}H${f1(X(0))}" style="fill:none;stroke:var(--dx);stroke-width:1.2;stroke-dasharray:3 3"/><circle cx="${f1(X(1))}" cy="${f1(fy)}" r="4" style="fill:var(--dx)"/>`;
      if(postOn&&(p===5||ps>=1))s+=`<circle cx="${f1(X(1))}" cy="${f1(Y(post.fev1))}" r="4" style="fill:var(--bd)"/>`;
      const lab=postOn&&(p===5||ps>=1)?SP_TXT.fev1Both(C0.fev1.toFixed(2),post.fev1.toFixed(2)):SP_TXT.fev1(C0.fev1.toFixed(2));
      s+=`<text x="${f1(X(1)+7)}" y="${f1(fy+15)}" class="t-sm" style="fill:var(--dx);font-weight:600">${lab}</text>`}
    if(sec>=9.9){const both=postOn&&(p===5||ps>=9.9),lab=both?SP_TXT.fvcBoth(C0.fvc.toFixed(2),post.fvc.toFixed(2)):SP_TXT.fvc(C0.fvc.toFixed(2));
      s+=`<text x="${f1(VT.x+VT.w-4)}" y="${f1(both?Y(post.fvc)-8:Y(C0.fvc)+20)}" class="t-sm t-end" style="fill:var(--ink);font-weight:600">${lab}</text>`}
    /* flow-volume */
    const FV=L.fv,zy=FV.y+FV.h*.72,eh=FV.h*.72-6,ih=FV.h*.28-6,FX=v=>FV.x+FV.w*v/ymax;
    s+=`<text x="${FV.x}" y="${FV.y-10}" class="t-lbl">${SP_TXT.fv}</text>`;
    s+=`<path d="M${FV.x} ${FV.y}V${f1(FV.y+FV.h)}" class="axis" style="fill:none"/><line x1="${FV.x}" x2="${FV.x+FV.w}" y1="${f1(zy)}" y2="${f1(zy)}" class="axis"/>`;
    [0,2,4,6].forEach(v=>s+=`<text x="${f1(FX(v))}" y="${f1(FV.y+FV.h+15)}" class="t-xs t-mid">${v} L</text>`);
    s+=`<text x="${FV.x+FV.w}" y="${f1(FV.y+FV.h+30)}" class="t-xs t-end">${SP_TXT.lit}</text>`;
    const fvPath=(c,e,pk,sc)=>{const f=spiroFV(0,c.fvc,sc);return pathFn(u=>f(u*e)*pk,FX(0),FX(c.fvc*e),zy,zy-eh,90)};
    const insPath=(c,fr)=>{const x0=FX(0),x1=FX(c.fvc),cx=(x0+x1)/2,rx=(x1-x0)/2,n=40;let d='';for(let i=0;i<=Math.round(n*fr);i++){const a=Math.PI*i/n;d+=(i?'L':'M')+f1(cx+rx*Math.cos(a))+' '+f1(zy+ih*Math.sin(a))}return d};
    if(cp&&p>=2){const H=SP_CURVE.h;s+=`<path d="${fvPath(H.pre,1,H.pk,H.scoop)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:2 4"/>`}
    if(p===3)M.reps.forEach((c,k)=>{if(rep[k]>0)s+=`<path d="${fvPath(c,spVol(c,10*rep[k])/c.fvc,M.pk*.97,M.scoop)}" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`});
    if(sec>0){const e=spVol(C0,sec)/C0.fvc;s+=`<path d="${fvPath(C0,e,M.pk,M.scoop)}" style="fill:none;stroke:${postOn?'var(--muted)':mainCol};stroke-width:${postOn?1.6:2.6};${postOn?'stroke-dasharray:5 4':''}"/>`;
      if(p<3&&sec<10){const f=spiroFV(0,C0.fvc,M.scoop);s+=`<circle cx="${f1(FX(C0.fvc*e))}" cy="${f1(zy-eh*f(e)*M.pk)}" r="4.5" style="fill:${mainCol};stroke:var(--panel);stroke-width:2"/>`}}
    if(ins>0&&!postOn)s+=`<path d="${insPath(C0,ins)}" style="fill:none;stroke:${mainCol};stroke-width:2;opacity:.85"/>`;
    if(postOn){const pe=p===5?1:spVol(post,ps)/post.fvc;s+=`<path d="${fvPath(post,pe,M.pkPost,M.scoop)}" style="fill:none;stroke:var(--bd);stroke-width:2.6"/>`}
    /* the strip */
    const ST=L.st;s+=`<rect x="${ST.x}" y="${ST.y}" width="${ST.w}" height="${ST.h}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    if(p<5){let tx=SP_TXT.strip[p];
      if(p===3){const r=M.reps[0];tx=tx((C0.fev1-r.fev1).toFixed(2),(C0.fvc-r.fvc).toFixed(2))}
      if(p===4)tx=tx[mode];
      s+=`<text x="${ST.x+14}" y="${ST.y+20}" class="t-xs" style="fill:var(--dx);font-weight:600">${p===4?SP_TXT.critBD:SP_TXT.crit}</text>`+wrapT(ST.x+14,ST.y+40,tx,L.cw,{cls:'t-sm',lh:16}).svg}
    else{const B=L.bar,R=r=>B.x+B.w*(clamp(r,.3,1)-.3)/.7,fin=cp?post:C0,rv=+(fin.fev1/fin.fvc).toFixed(2),k=ease(ramp(t,.85,.93));
      s+=`<rect x="${f1(B.x)}" y="${B.y}" width="${f1(R(.7)-B.x)}" height="12" style="fill:var(--bad-soft)"/><rect x="${f1(R(.7))}" y="${B.y}" width="${f1(B.x+B.w-R(.7))}" height="12" style="fill:var(--good-soft)"/>`;
      s+=`<rect x="${f1(R(.6))}" y="${B.y-5}" width="${f1(R(.8)-R(.6))}" height="22" rx="4" style="fill:none;stroke:var(--warn);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      s+=`<line x1="${f1(R(.7))}" x2="${f1(R(.7))}" y1="${B.y-9}" y2="${B.y+21}" style="stroke:var(--ink);stroke-width:2"/>`;
      [.3,.4,.5,.6,.8,.9,1].forEach(v=>s+=`<text x="${f1(R(v))}" y="${B.y+34}" class="t-xs t-mid">${v.toFixed(1)}</text>`);
      s+=`<text x="${f1(R(.7))}" y="${B.y+34}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${SP_TXT.thr}</text>`;
      s+=`<text x="${B.x}" y="${B.y+50}" class="t-xs">${SP_TXT.win}</text>`;
      const nx=lerp(R(1),R(rv),k),mc=rv<.7?'var(--bad)':'var(--good)';
      s+=`<path d="M${f1(nx)} ${B.y-2}l-6 -10h12z" style="fill:${mc}"/><text x="${f1(nx)}" y="${B.y-16}" class="t-lbl t-mid" style="fill:${mc}">${(lerp(1,rv,k)).toFixed(2)}</text>`;
      const RO=L.ro,lines=cp?[SP_TXT.ratioEq(post.fev1.toFixed(2),post.fvc.toFixed(2),rv.toFixed(2)),SP_TXT.below,SP_TXT.pctC,SP_TXT.gradeC]
        :[SP_TXT.ratioEq(C0.fev1.toFixed(2),C0.fvc.toFixed(2),rv.toFixed(2)),SP_TXT.above,SP_TXT.noGrade];
      lines.forEach((l,i)=>s+=`<text x="${RO.x}" y="${RO.y+i*RO.dy}" class="${i===0||i===3?'t-lbl':'t-sm'}" style="opacity:${f1(ramp(t,.88+i*.015,.9+i*.015))};${i===3?'fill:var(--bad)':''}">${l}</text>`)}
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#spPlay'),draw,16000,'%t:player.replay%','spirometry');
  setSt=stepWire($('#spSteps'),SP_STEPS,rg,draw,stop);
  tog.addEventListener('click',e=>{const b=e.target.closest('[data-spmode]');if(!b)return;mode=b.dataset.spmode;
    $$('[data-spmode]',tog).forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));draw(+rg.value)});
  draw(+rg.value);

  /* ---- calculator ---- */
  const cs=$('#spCalcSvg'),out=$('#spCalcOut'),I={f:$('#spFev1'),v:$('#spFvc'),p:$('#spPct'),l:$('#spLln'),a:$('#spAgeIn'),x:$('#spSex')};
  const num=el=>{const v=parseFloat(el.value);return isFinite(v)?v:null};
  let cState={r:null,pct:null,lln:null};
  function spGrade(pct){return pct>=80?1:pct>=50?2:pct>=30?3:4}
  function drawCalc(){const N=vb(cs,'560 192','400 200'),W=N?{x:16,w:368,y1:56,y2:150}:{x:20,w:520,y1:52,y2:144};
    const {r,pct,lln}=cState;let s='';
    const R=v=>W.x+W.w*(clamp(v,.3,1)-.3)/.7,P=v=>W.x+W.w*clamp(v,0,120)/120;
    s+=`<text x="${W.x}" y="${W.y1-30}" class="t-lbl">${SP_TXT.cRatio}</text>`;
    s+=`<rect x="${W.x}" y="${W.y1}" width="${f1(R(.7)-W.x)}" height="16" style="fill:var(--bad-soft)"/><rect x="${f1(R(.7))}" y="${W.y1}" width="${f1(W.x+W.w-R(.7))}" height="16" style="fill:var(--good-soft)"/>`;
    s+=`<rect x="${f1(R(.6))}" y="${W.y1-4}" width="${f1(R(.8)-R(.6))}" height="24" rx="4" style="fill:none;stroke:var(--warn);stroke-width:1.4;stroke-dasharray:4 3"/><line x1="${f1(R(.7))}" x2="${f1(R(.7))}" y1="${W.y1-8}" y2="${W.y1+24}" style="stroke:var(--ink);stroke-width:2"/>`;
    [.3,.5,.9,1].forEach(v=>s+=`<text x="${f1(R(v))}" y="${W.y1+32}" class="t-xs t-mid">${v.toFixed(1)}</text>`);
    s+=`<text x="${f1(R(.7))}" y="${W.y1+32}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">0.70</text>`;
    if(lln!=null){s+=`<line x1="${f1(R(lln))}" x2="${f1(R(lln))}" y1="${W.y1-6}" y2="${W.y1+22}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:3 2"/>`;
      const lx=clamp(R(lln),W.x+24,W.x+W.w-24);s+=`<text x="${f1(lx)}" y="${W.y1+45}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">${SP_TXT.cLln(lln.toFixed(2))}</text>`}
    if(r!=null){const x=R(r),c=r<.7?'var(--bad)':'var(--good)';s+=`<path d="M${f1(x)} ${W.y1-2}l-6 -10h12z" style="fill:${c}"/><text x="${f1(clamp(x,W.x+14,W.x+W.w-14))}" y="${W.y1-15}" class="t-lbl t-mid" style="fill:${c}">${r.toFixed(2)}</text>`}
    const op=r!=null&&r>=.7?.4:1;
    s+=`<text x="${W.x}" y="${W.y2-30}" class="t-lbl">${SP_TXT.cPct}</text><g style="opacity:${op}">`;
    [[0,30,'var(--bad-soft)','GOLD 4'],[30,50,'var(--fl-soft)','GOLD 3'],[50,80,'var(--warn-soft)','GOLD 2'],[80,120,'var(--good-soft)','GOLD 1']].forEach(b=>{
      s+=`<rect x="${f1(P(b[0]))}" y="${W.y2}" width="${f1(P(b[1])-P(b[0]))}" height="18" style="fill:${b[2]};stroke:var(--panel);stroke-width:1"/><text x="${f1((P(b[0])+P(b[1]))/2)}" y="${W.y2+13}" class="t-xs t-mid" style="fill:var(--ink)">${b[3]}</text>`});
    [0,30,50,80,120].forEach(v=>s+=`<text x="${f1(P(v))}" y="${W.y2+32}" class="t-xs t-mid">${v}%</text>`);
    if(pct!=null){const x=P(pct);s+=`<path d="M${f1(x)} ${W.y2-2}l-6 -10h12z" style="fill:var(--ink)"/><text x="${f1(clamp(x,W.x+16,W.x+W.w-16))}" y="${W.y2-15}" class="t-lbl t-mid">${Math.round(pct)}%</text>`}
    else s+=`<text x="${W.x+W.w}" y="${W.y2-15}" class="t-xs t-end">${SP_TXT.cNoPct}</text>`;
    cs.innerHTML=s+'</g>'}
  function calc(){const f=num(I.f),v=num(I.v),pct=num(I.p),lln=num(I.l),age=num(I.a),sx=I.x.value;
    cState={r:null,pct,lln:lln!=null&&lln>0&&lln<1?lln:null};
    if(f==null||v==null||f<=0||v<=0){out.innerHTML=`<p>${SP_TXT.need}</p>`;drawCalc();return}
    if(f>v){out.innerHTML=`<div class="verdict no">${SP_TXT.bigger}</div>`;drawCalc();return}
    const r=Math.round(f/v*100)/100;cState.r=r;
    let h=SP_TXT.head(r.toFixed(2))+`<div class="verdict ${r<.7?'maybe':'yes'}">${r<.7?SP_TXT.vBelow:SP_TXT.vAbove}</div>`;
    if(r<.7){h+=pct!=null?`<p>${SP_TXT.grade(Math.round(pct),SP_TXT.gname[spGrade(pct)])}</p>`:`<p>${SP_TXT.needPct}</p>`}
    else if(pct!=null&&pct<80)h+=`<p>${SP_TXT.prism(Math.round(pct))}</p>`;
    if(r>=.6&&r<=.8)h+=`<p>${SP_TXT.window}</p>`;
    if(r<.6)h+=`<p>${SP_TXT.under60}</p>`;
    const L2=cState.lln;if(L2!=null){const ls=L2.toFixed(2);h+=`<p>${r<.7?(r<L2?SP_TXT.lln.both(ls):SP_TXT.lln.fixed(ls)):(r<L2?SP_TXT.lln.lln(ls):SP_TXT.lln.none(ls))}</p>`}
    if(age!=null){const a=Math.round(age);h+=`<p>${sx?(a>SP_CROSS[sx]?SP_TXT.ageO(a,SP_CROSS[sx]):SP_TXT.ageY(a,SP_CROSS[sx])):SP_TXT.ageNoSex}</p>`}
    out.innerHTML=h;drawCalc()}
  Object.values(I).forEach(el=>{el.addEventListener('input',calc);el.addEventListener('change',calc)});
  calc();

  /* ---- fixed ratio vs LLN by age ---- */
  const as=$('#spAgeSvg'),ar=$('#spAgeT'),av=$('#spAgeV'),an=$('#spAgeNote');
  const SL=-.0025,lln=(sx,a)=>.70+SL*(a-SP_CROSS[sx]);
  function drawAge(){const N=vb(as,'720 300','400 500'),a=+ar.value;
    const L=N?{cx:50,cy:40,cw:334,ch:210,lg:[50,150,270],bx:30,by:310,bw:300,bt:50,rows:346,rdy:38}
             :{cx:60,cy:40,cw:360,ch:200,lg:[60,190,320],bx:470,by:40,bw:220,bt:34,rows:96,rdy:44};
    const X=g=>L.cx+L.cw*(g-20)/70,Y=r=>L.cy+L.ch*(.9-r)/.35;let s='';
    /* legend */
    s+=`<line x1="${L.lg[0]}" x2="${L.lg[0]+18}" y1="18" y2="18" style="stroke:var(--dx);stroke-width:2.4"/><text x="${L.lg[0]+24}" y="22" class="t-xs">${SP_TXT.legM}</text>`;
    s+=`<line x1="${L.lg[1]}" x2="${L.lg[1]+18}" y1="18" y2="18" style="stroke:var(--rx);stroke-width:2.4;stroke-dasharray:5 3"/><text x="${L.lg[1]+24}" y="22" class="t-xs">${SP_TXT.legF}</text>`;
    s+=`<line x1="${L.lg[2]}" x2="${L.lg[2]+18}" y1="18" y2="18" style="stroke:var(--ink);stroke-width:2"/><text x="${L.lg[2]+24}" y="22" class="t-xs">${SP_TXT.legFix}</text>`;
    s+=axes(L.cx,L.cy,L.cw,L.ch,{xt:[20,30,40,50,60,70,80,90].map(g=>[(g-20)/70,String(g)]),yt:[.6,.7,.8,.9].map(r=>[(r-.55)/.35,r.toFixed(2)]),xl:SP_TXT.ageAx});
    /* zones from the men's line (the earlier crossing) */
    const zcur=`<line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="${L.cy}" y2="${L.cy+L.ch}" style="stroke:var(--brand);stroke-width:1.6;stroke-dasharray:3 3"/>`;
    const zm=g=>Y(lln('m',g));
    s+=`<path d="M${f1(X(20))} ${f1(Y(.7))}L${f1(X(42))} ${f1(Y(.7))}L${f1(X(20))} ${f1(zm(20))}Z" style="fill:var(--warn-soft);opacity:.9"/>`;
    s+=`<path d="M${f1(X(42))} ${f1(Y(.7))}L${f1(X(90))} ${f1(Y(.7))}L${f1(X(90))} ${f1(zm(90))}Z" style="fill:var(--bad-soft);opacity:.9"/>`;
    s+=zcur;s+=`<text x="${f1(X(21))}" y="${f1(Y(.84))}" class="t-xs" style="fill:var(--warn);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px">${SP_TXT.miss}</text><path d="M${f1(X(25))} ${f1(Y(.832))}L${f1(X(30))} ${f1(Y(.712))}" style="stroke:var(--warn);stroke-width:1.2;fill:none"/>`;
    s+=`<text x="${f1(X(89))}" y="${f1(Y(.678))}" class="t-xs t-end" style="fill:var(--bad);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px">${SP_TXT.over}</text>`;
    s+=`<line x1="${f1(X(20))}" x2="${f1(X(90))}" y1="${f1(Y(.7))}" y2="${f1(Y(.7))}" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=`<line x1="${f1(X(20))}" x2="${f1(X(90))}" y1="${f1(Y(lln('m',20)))}" y2="${f1(Y(lln('m',90)))}" style="stroke:var(--dx);stroke-width:2.4"/>`;
    s+=`<line x1="${f1(X(20))}" x2="${f1(X(90))}" y1="${f1(Y(lln('f',20)))}" y2="${f1(Y(lln('f',90)))}" style="stroke:var(--rx);stroke-width:2.4;stroke-dasharray:5 3"/>`;
    s+=`<circle cx="${f1(X(42))}" cy="${f1(Y(.7))}" r="4.5" style="fill:var(--dx)"/><text x="${f1(X(42)-6)}" y="${f1(Y(.7)+18)}" class="t-xs t-end" style="fill:var(--dx);font-weight:600">${SP_TXT.cross.m}</text>`;
    s+=`<circle cx="${f1(X(48))}" cy="${f1(Y(.7))}" r="4.5" style="fill:var(--rx)"/><text x="${f1(X(48)+6)}" y="${f1(Y(.7)-22)}" class="t-xs" style="fill:var(--rx);font-weight:600">${SP_TXT.cross.f}</text>`;
    /* age cursor dots */
    s+=`<circle cx="${f1(X(a))}" cy="${f1(Y(lln('m',a)))}" r="4" style="fill:var(--panel);stroke:var(--dx);stroke-width:2"/><circle cx="${f1(X(a))}" cy="${f1(Y(lln('f',a)))}" r="4" style="fill:var(--panel);stroke:var(--rx);stroke-width:2"/>`;
    /* bars */
    const T=wrapT(L.bx,L.by,SP_TXT.barsT,N?50:34,{cls:'t-lbl',lh:16});s+=T.svg;
    const BX=v=>L.bx+L.bw*v/60,lit=[a>60,a>60,a>70,a>80],vals=[[17,45],[7,26],[35,35],[50,50]];
    s+=`<line x1="${f1(BX(0))}" x2="${f1(BX(0))}" y1="${L.rows-12}" y2="${L.rows+3*L.rdy+18}" class="axis"/>`;
    vals.forEach((v,i)=>{const y=L.rows+i*L.rdy,o=lit[i]?1:.45;
      s+=`<g style="opacity:${o}"><text x="${L.bx}" y="${y}" class="t-xs" style="fill:var(--ink)">${SP_TXT.bars[i]}</text>`;
      if(v[0]===v[1])s+=`<rect x="${f1(BX(0))}" y="${y+6}" width="${f1(BX(v[1])-BX(0))}" height="11" rx="2" style="fill:var(--bad)"/>`;
      else s+=`<rect x="${f1(BX(0))}" y="${y+6}" width="${f1(BX(v[0])-BX(0))}" height="11" style="fill:var(--bad)"/><rect x="${f1(BX(v[0]))}" y="${y+6}" width="${f1(BX(v[1])-BX(v[0]))}" height="11" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1"/>`;
      s+='</g>'});
    [0,20,40,60].forEach(v=>s+=`<text x="${f1(BX(v))}" y="${L.rows+3*L.rdy+32}" class="t-xs t-mid">${v}%</text>`);
    as.innerHTML=s;av.textContent=SP_TXT.ageV(a);
    an.innerHTML=SP_TXT.ageNote.m[a>42?'o':'y'](a)+' '+SP_TXT.ageNote.f[a>48?'o':'y'](a);
  }
  ar.addEventListener('input',drawAge);drawAge();
  const prev=redraws.spirometry;redraws.spirometry=()=>{prev&&prev();drawCalc();drawAge()};
};
