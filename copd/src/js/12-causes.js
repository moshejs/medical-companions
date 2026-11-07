/* =============== 1.2 Causes & risk factors =============== */
/* Main player: a lifetime lung-function curve that each exposure pulls down (genes, early life, tobacco, household
   and outdoor air and work, infection), ending with Lange's two roads to COPD. Then a forest plot of published odds
   ratios, the derived Fletcher–Peto "stop at age X" chart (Lung Health Study rates) and a trajectories panel
   (Lange 2015, Tasmanian cohort). Figures from research pass A; citations sit in HTML text only. */
const CA_STEPS=[
 {from:0,at:.07,k:'Genes',t:'Born with a risk',
  txt:'SERPINA1 variants causing alpha-1 antitrypsin deficiency are the most important known genetic risk, and many small-effect variants together may raise susceptibility [[Agusti2023]]. About 40% of the variability in airflow limitation is attributable to genetics [[Stolz2022]].',
  pt:'Some people are born with genes that make their lungs easier to damage.',
  hook:'Only two monogenic causes are clearly shown: alpha-1 antitrypsin deficiency and TERT mutations [[Stolz2022]].'},
 {from:.17,at:.25,k:'Early life',t:'Lungs that grow less',
  txt:'Prematurity, low birth weight, maternal smoking in pregnancy, repeated childhood infections and poor nutrition lower peak lung function [[Agusti2023]]. Very to moderate preterm birth was linked to COPD at 53 (odds ratio 2.9) [[Bui2022]], and low early-adult FEV1 is behind about half of COPD [[Lange2015]].',
  pt:'If the lungs do not grow fully in childhood, they start adult life with less in reserve.',
  hook:'Lungs grow until about age 20–25, earlier in females [[Agusti2023]].'},
 {from:.34,at:.42,k:'Smoke',t:'Tobacco',
  txt:'Current smoking roughly triples the odds of COPD (odds ratio 3.2) [[Adeloye2022]] and accounts for 46.0% of COPD disability-adjusted life years [[Safiri2022]]. Smokers have a faster yearly fall in FEV1 [[Agusti2023]]. In the drawing, the curve after age 25 now falls faster.',
  pt:'Tobacco smoke is the biggest single cause. It makes lung function fall faster each year.',
  hook:'Current smoking OR 3.2; ever smoking OR 2.3 [[Adeloye2022]].'},
 {from:.5,at:.58,k:'Air',t:'Fires, traffic and work',
  txt:'Solid-fuel smoke (odds ratio 2.80) [[Kurmi2010]], PM2.5 (odds ratio 1.52 per 5 µg/m³) [[Doiron2019]] and work dusts and fumes (population-attributable fraction 14%) [[Blanc2019]] add risk. GOLD 2023 sees no apparent safe threshold for air pollution [[Agusti2023]].',
  pt:'Smoke from cooking fires, polluted outdoor air and dust or fumes at work can also cause COPD.',
  hook:'GBD 2019: ambient particulate matter 20.7% and occupational exposures 15.6% of COPD DALYs [[Safiri2022]].'},
 {from:.66,at:.74,k:'Infection',t:'TB, HIV and childhood illness',
  txt:'Past tuberculosis triples the odds of COPD (odds ratio 3.05) [[Byrne2015]]. COPD stayed associated with HIV after adjusting for tobacco (odds ratio 2.58) [[Bigna2018]], and the Commission estimates that 10–42% of people with early-life pneumonia, tuberculosis or HIV develop COPD [[Stolz2022]].',
  pt:'Serious lung infections, such as tuberculosis, can leave lasting damage.',
  hook:'Past TB: pooled OR 3.05, strongest in high-TB countries, never smokers and younger people [[Byrne2015]].'},
 {from:.83,at:.92,k:'Two roads',t:'Fast decline or low start',
  txt:'About half of the people with COPD at the end of follow-up had started with normal FEV1 and declined fast (53 ± 21 mL a year); the other half had low FEV1 in early adulthood and a normal-range decline (27 ± 18 mL a year) [[Lange2015]].',
  pt:'Some people reach COPD because their lungs wear out fast. Others start with smaller lungs and wear out at a normal pace.',
  hook:'Lange 2015: ~50% via accelerated decline, ~50% via low peak lung function [[Lange2015,Agusti2023]].'}
];
const CA_TXT={
 chartY:'lung function (FEV1)',chartX:'age, years',healthy:'healthy curve',person:'this person',band:'COPD range (schematic)',
 layers:['genes','early life','tobacco','air & work','infection'],
 icon:['SERPINA1 and many small variants','prematurity, infections, maternal smoking','cigarettes, pipes, passive smoke','cooking fires, traffic, dust and fumes','tuberculosis, HIV, childhood pneumonia','two roads to the same place'],
 roadA:'normal start, fast decline: 53 mL a year',roadB:'low start, normal decline: 27 mL a year',
 roadAs:'normal start, fast fall',roadBs:'low start, normal fall',rate:'mean rates, Lange 2015'
};
/* odds ratios: [label, OR, lo, hi, colour, note] */
const CA_OR=[
 {l:'Current smoking',d:'3.2 (2.5–4.0)',v:3.2,lo:2.5,hi:4.0,c:'var(--smoke)',k:'Tobacco',
  txt:'In the global prevalence meta-analysis, current smoking raised the odds of COPD 3.2-fold (95% CI 2.5–4.0) [[Adeloye2022]]. Smokers have more symptoms, faster FEV1 decline and a higher COPD death rate than non-smokers [[Agusti2023]].',
  pt:'Smoking now about triples the odds of having COPD.'},
 {l:'Ever smoking',d:'2.3 (2.0–2.5)',v:2.3,lo:2.0,hi:2.5,c:'var(--smoke)',k:'Tobacco',
  txt:'Ever smoking raised the odds 2.3-fold (95% CI 2.0–2.5) [[Adeloye2022]]. Quitting does not restore lost FEV1, but returns its decline to the normal rate in susceptible smokers [[Fletcher1977]].',
  pt:'Having smoked in the past still raises the odds, but less than smoking now.'},
 {l:'Male sex',d:'2.1',v:2.1,c:'var(--brand)',k:'Sex',
  txt:'Male sex had an odds ratio of 2.1 in the same meta-analysis [[Adeloye2022]]; worldwide prevalence at ages 30–79 was 14.1% in men and 6.5% in women [[Adeloye2022]]. GOLD 2023 notes prevalence in developed countries is now almost equal in men and women [[Agusti2023]].',
  pt:'Worldwide, more men than women have COPD, partly because of who has smoked.'},
 {l:'Underweight (BMI below 18.5)',d:'2.2 (1.7–2.7)',v:2.2,lo:1.7,hi:2.7,c:'var(--accent)',k:'Nutrition',
  txt:'A BMI below 18.5 kg/m² carried an odds ratio of 2.2 (95% CI 1.7–2.7) [[Adeloye2022]]. Poor nutrition is among the childhood factors that shape peak lung function [[Agusti2023]].',
  pt:'Being underweight goes with higher odds of COPD.'},
 {l:'Solid fuel use (meta-analysis)',d:'2.80 (1.85–4.0)',v:2.80,lo:1.85,hi:4.0,c:'var(--accent)',k:'Household air',
  txt:'In a meta-analysis, solid fuel use was associated with COPD (odds ratio 2.80, 95% CI 1.85–4.0) and chronic bronchitis (2.32); wood smoke during domestic work carried the highest risk [[Kurmi2010]].',
  pt:'Breathing smoke from cooking or heating fires indoors raises the odds of COPD.'},
 {l:'Biomass exposure',d:'1.4 (1.2–1.7)',v:1.4,lo:1.2,hi:1.7,c:'var(--accent)',k:'Household air',
  txt:'In the global prevalence meta-analysis, biomass exposure had an odds ratio of 1.4 (95% CI 1.2–1.7) [[Adeloye2022]], lower than in the solid-fuel meta-analysis: different studies, definitions and adjustments give different figures [[Kurmi2010,Adeloye2022]].',
  pt:'Different studies of smoke from fires found different sizes of risk.'},
 {l:'Work dust or smoke',d:'1.4 (1.3–1.6)',v:1.4,lo:1.3,hi:1.6,c:'var(--dx)',k:'Work',
  txt:'Occupational exposure to dust or smoke had a pooled odds ratio of 1.4 (95% CI 1.3–1.6) [[Adeloye2022]]. An ATS/ERS statement put the occupational population-attributable fraction at 14% for COPD [[Blanc2019]].',
  pt:'Dust, gases and fumes at work add to the risk.'},
 {l:'PM2.5, per 5 µg/m³ more',d:'1.52 (1.42–1.62)',v:1.52,lo:1.42,hi:1.62,c:'var(--air)',k:'Outdoor air',
  txt:'In UK Biobank (303,887 adults aged 40–69), each 5 µg/m³ higher PM2.5 went with 83.13 mL lower FEV1 and higher COPD prevalence (odds ratio 1.52, 95% CI 1.42–1.62) [[Doiron2019]].',
  pt:'People living with more fine particles in the air had lower lung function.'},
 {l:'Past tuberculosis',d:'3.05 (2.42–3.85)',v:3.05,lo:2.42,hi:3.85,c:'var(--bact)',k:'Infection',
  txt:'A history of tuberculosis was associated with COPD in adults over 40 (pooled odds ratio 3.05, 95% CI 2.42–3.85), most strongly in high-TB countries, never smokers and younger people [[Byrne2015]].',
  pt:'Having had TB about triples the odds of COPD.'},
 {l:'HIV (adjusted for tobacco)',d:'2.58 (1.05–6.35)',v:2.58,lo:1.05,hi:6.35,c:'var(--bact)',k:'Infection',
  txt:'COPD prevalence among people with HIV was 10.6% by the fixed ratio, and HIV stayed associated with COPD after adjustment for tobacco (odds ratio 2.58, 95% CI 1.05–6.35) [[Bigna2018]].',
  pt:'People living with HIV have higher odds of COPD, even allowing for smoking.'},
 {l:'Very to moderate preterm birth',d:'2.9 (1.1–7.7)',v:2.9,lo:1.1,hi:7.7,c:'var(--rec)',k:'Early life',
  txt:'Birth at 28 to under 34 weeks was associated with COPD at age 53 (odds ratio 2.9, 95% CI 1.1–7.7); late preterm birth was not [[Bui2022]].',
  pt:'Being born quite early is linked to COPD in middle age.'},
 {l:'Severe childhood asthma',d:'32 (3.4–269)',v:32,lo:3.4,hi:269,c:'var(--rec)',k:'Asthma',
  txt:'In the Melbourne asthma cohort followed to age 50, children with severe asthma had an adjusted 32-fold higher risk of COPD (95% CI 3.4–269), and 43% of the COPD group had never smoked [[Tai2014]]. The very wide interval reflects small numbers.',
  pt:'Severe asthma in childhood is strongly linked to COPD later.'},
 {l:'Trajectory: early low, fast decline',d:'35.0 (19.5–64.0)',v:35.0,lo:19.5,hi:64.0,c:'var(--rec)',k:'Trajectory',
  txt:'In the Tasmanian cohort (age 7 to 53), the "early below average, accelerated decline" trajectory carried an odds ratio of 35.0 (95% CI 19.5–64.0) for COPD at 53 compared with the average group; its early predictors included childhood asthma, bronchitis, pneumonia, allergic disease, parental asthma and maternal smoking [[Bui2018]].',
  pt:'Children whose lungs start below average and then decline fast have very high odds of COPD by 53.'}
];
const CA_FP={start:4,age0:25,smoke:.062,never:.031,gain:.047};
const CA_FPT={
 y:'FEV1, litres (illustrative)',x:'age, years',
 nevS:'never or not susceptible',smoS:'keeps smoking',quiS:'stops smoking',
 stopAt:q=>`stops at ${q}`,noStop:'does not stop',out:q=>q>75?'does not stop':String(q),
 read:(q,vq,vs,vn)=>(q>75?'':`At 75 if stops at ${q}: <b>${vq.toFixed(2)} L</b> · `)+`if keeps smoking: <b>${vs.toFixed(2)} L</b> · never or not susceptible: <b>${vn.toFixed(2)} L</b>`,
 doll:(d,y)=>`British doctors who stopped at about ${d} gained about ${y} years of life expectancy [[Doll2004]].`,
 kept:(q,dl)=>`Stopping at ${q} keeps an illustrative ${dl.toFixed(2)} L more FEV1 at 75 than smoking on.`
};
const CA_DOLL=[[30,10],[40,9],[50,6],[60,3]];
const CA_LG={
 lange:{cap:'Three cohorts followed for 22 years; people with FEV1 below 80% predicted before age 40 against those with normal FEV1 [[Lange2015]]. Each figure is one person in 100.',
  a:{t1:'FEV1 below 80% predicted',t2:'before age 40',n:26},b:{t1:'FEV1 80% predicted or more',t2:'before age 40',n:7},foot:n=>`${n} in 100 had COPD 22 years later`,
  note:{k:'Lange 2015 · three cohorts',t:'Half start low, half fall fast',txt:'26% of people with FEV1 below 80% predicted before age 40 had COPD 22 years later, against 7% of those with normal FEV1. About half of those with COPD at the end had started normal and declined fast (53 ± 21 mL a year); the other half started low and declined at a normal-range rate (27 ± 18 mL a year) [[Lange2015]]. The Commission argues this undermines the old picture of COPD as only a smoker\'s disease of fast decline [[Stolz2022,Lange2015]].',pt:'Starting adult life with smaller lungs makes COPD later more likely, even without a fast decline.',hook:'COPD 22 years later: 26% with early FEV1 below 80% vs 7% with normal FEV1 [[Lange2015]].'}},
 tahs:{cap:'Tasmanian Longitudinal Health Study, lung function from age 7 to 53: share of the cohort in each FEV1 trajectory and odds of COPD at 53 against the average group [[Bui2018]].',
  rows:[['Average',39,null,0],['Below average',32,3.7,1],['Persistently high',12,null,0],['Early low, accelerated growth, normal decline',8,null,0],['Persistently low',6,9.5,1],['Early below average, accelerated decline',4,35.0,1]],
  sh:'% of cohort',orl:v=>`odds of COPD ×${v}`,
  note:{k:'Tasmanian cohort · age 7 to 53',t:'Three trajectories, 75% of COPD',txt:'Six FEV1 trajectories were found. Three of them (early below average with accelerated decline, persistently low, below average) accounted for 75% of COPD at age 53 [[Bui2018]]. The smallest group, early below average with accelerated decline (4%), had an odds ratio of 35.0 [[Bui2018]].',pt:'How the lungs grow in childhood helps decide who gets COPD in middle age.',hook:'TAHS: three trajectories account for 75% of COPD at 53 [[Bui2018]].'}}
};
/* small glyphs for this module */
function caHelix(x,y,w,ph){let s='';const n=10;for(let i=0;i<=n;i++){const u=i/n,xx=x-w/2+w*u,a=Math.sin(u*Math.PI*2+ph)*14,b=-a;
  s+=`<line x1="${f1(xx)}" y1="${f1(y+a)}" x2="${f1(xx)}" y2="${f1(y+b)}" style="stroke:var(--line);stroke-width:2"/>`}
  s+=`<path d="${pathFn(u=>.5+Math.sin(u*Math.PI*2+ph)*.5,x-w/2,x+w/2,y-14,y+14,40)}" style="fill:none;stroke:var(--rx);stroke-width:3"/>`;
  s+=`<path d="${pathFn(u=>.5-Math.sin(u*Math.PI*2+ph)*.5,x-w/2,x+w/2,y-14,y+14,40)}" style="fill:none;stroke:var(--dx);stroke-width:3"/>`;return s}
function caFire(x,y,s,ph){let g=`<path d="M${f1(x-s*.6)} ${f1(y)}h${f1(s*1.2)}" style="stroke:var(--tar);stroke-width:4;stroke-linecap:round"/>`;
  for(let i=0;i<3;i++){const fx=x+(i-1)*s*.28,fh=s*(.5+.2*Math.sin(ph*9+i*2));g+=`<path d="M${f1(fx-s*.14)} ${f1(y-2)}Q${f1(fx)} ${f1(y-fh*1.3)} ${f1(fx+s*.14)} ${f1(y-2)}Z" style="fill:var(--accent);opacity:.9"/>`}
  return g+smoke(x-s*.5,y-s*1.9,s,s*1.4,{amt:.9,ph,seed:12})}
function caFactory(x,y,s,ph){let g=`<path d="M${f1(x-s*.5)} ${f1(y)}V${f1(y-s*.45)}l${f1(s*.3)} ${f1(-s*.18)}v${f1(s*.18)}l${f1(s*.3)} ${f1(-s*.18)}v${f1(s*.18)}H${f1(x+s*.5)}V${f1(y)}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><rect x="${f1(x+s*.28)}" y="${f1(y-s*.95)}" width="${f1(s*.14)}" height="${f1(s*.5)}" style="fill:var(--muted)"/>`;
  return g+dots(x-s*.4,y-s*1.5,s*.9,s*.5,14,{col:'var(--smoke)',r:2,ph:ph*3,seed:8})}
function caBug(x,y,s,a){return `<rect x="${f1(x-s/2)}" y="${f1(y-s*.18)}" width="${f1(s)}" height="${f1(s*.36)}" rx="${f1(s*.18)}" transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})" style="fill:var(--bact)"/>`}
inits.causes=()=>{
  const svg=$('#caSvg'),rg=$('#caT');
  const norm=a=>a<20?.2+.75*ease(a/20):a<=25?.95:.95-.0045*(a-25);
  function draw(t){
    const N=vb(svg,'720 400','400 690'),p=phaseOf(CA_STEPS,t),P=CA_STEPS[p];
    const L=N?{tx:16,ty:26,lx:110,ly:96,ls0:120,ls1:166,ix:300,iy:170,gx:44,gy:326,gw:338,gh:220,cy:612,crow:2}
             :{tx:20,ty:28,lx:140,ly:92,ls0:128,ls1:190,ix:140,iy:345,gx:296,gy:70,gw:400,gh:232,cy:362,crow:1};
    const g=ramp(t,.02,.12),e=ramp(t,.17,.27),sm=ramp(t,.34,.44),ai=ramp(t,.5,.6),inf=ramp(t,.66,.76),R=ramp(t,.83,.9);
    const pk=.95-.15*e,rate=.0045+.0005*g+.0035*sm*(1+.3*g)+.0012*ai;
    const pers=a=>clamp((a<20?.2+(pk-.2)*ease(a/20):a<=25?pk:pk-rate*(a-25))-.04*inf*ramp(a,28,34),.03,1);
    const rA=a=>a<=25?norm(a):.95-.0088*(a-25),rB=a=>a<20?.2+.5*ease(a/20):a<=25?.7:.7-.0045*(a-25);
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big">${P.t}</text><text x="${L.tx}" y="${L.ty+17}" class="t-sm">${P.k}</text>`;
    /* lungs: grow through early life, then show the exposures */
    const ls=lerp(L.ls0,L.ls1,ramp(t,.17,.32)),ph=t*12;
    if(sm>.02||ai>.02)s+=smoke(L.lx-30,L.ly-34,60,34,{amt:Math.max(sm*bump(t,.34,.66),ai*bump(t,.5,.83))*.9+.05,col:ai>sm*bump(t,.34,.66)?'var(--tar)':'var(--smoke)',ph,seed:5});
    s+=lungs(L.lx,L.ly,ls,{inflam:sm*.8+ai*.15,mucus:Math.max(sm*.6,inf*.5),bullae:sm*.45+g*.2,hyper:sm*.2,breathe:(Math.sin(t*Math.PI*30)+1)/2});
    if(inf>.02){for(let i=0;i<7;i++){const a=i*2.3;s+=`<g style="opacity:${f1(inf*(1-R*.6))}">${caBug(L.lx+(i%2?1:-1)*ls*lerp(.18,.34,(i*.37)%1),L.ly+ls*lerp(.3,.75,(i*.53)%1),ls*.06,a*40+t*90)}</g>`}}
    /* the exposure picture for this step */
    const fade=clamp((t-P.from)/.03+(p===0?1:0)),IX=L.ix,IY=L.iy;
    s+=`<g style="opacity:${f1(fade)}">`;
    if(p===0){s+=caHelix(IX,IY-8,96,t*20)}
    else if(p===1){s+=person(IX-30,IY+22,40,{col:'var(--rec)'})+person(IX+18,IY+22,62,{col:'var(--rec)',op:.55})}
    else if(p===2){s+=cig(IX-55,IY+6,110,{burn:ramp(t,.34,.5)*.7,smoke:1,ph})}
    else if(p===3){s+=caFire(IX-40,IY+18,36,ph)+caFactory(IX+42,IY+18,48,ph)}
    else if(p===4){for(let i=0;i<6;i++)s+=caBug(IX-40+i*16,IY-6+(i%2)*14,14,i*35+t*120)}
    else{s+=`<path d="M${IX-50} ${IY}h100" style="stroke:var(--fl);stroke-width:3;stroke-linecap:round"/><path d="M${IX-50} ${IY+12}h100" style="stroke:var(--rx);stroke-width:3;stroke-linecap:round"/>`}
    const ic=wrapT(IX,IY+34,CA_TXT.icon[p],N?24:34,{cls:'t-xs',anchor:'middle',lh:12});s+=ic.svg+'</g>';
    /* lifetime chart */
    const GX=L.gx,GY=L.gy,GW=L.gw,GH=L.gh,yb=.55;
    s+=`<rect x="${GX}" y="${f1(GY+GH*(1-yb))}" width="${GW}" height="${f1(GH*yb)}" style="fill:var(--bad-soft);opacity:.55"/>`;
    s+=`<text x="${GX+GW-6}" y="${GY+GH-8}" class="t-xs t-end" style="fill:var(--bad)">${CA_TXT.band}</text>`;
    s+=axes(GX,GY,GW,GH,{xt:[[0,'0'],[.25,'20'],[.5,'40'],[.75,'60'],[1,'80']],yt:[],grid:false,xl:CA_TXT.chartX,yl:CA_TXT.chartY});
    s+=`<path d="${pathFn(u=>norm(u*80),GX,GX+GW,GY+GH,GY)}" style="fill:none;stroke:var(--muted);stroke-width:1.8;stroke-dasharray:5 4"/>`;
    if(R<1)s+=`<path d="${pathFn(u=>pers(u*80),GX,GX+GW,GY+GH,GY)}" style="fill:none;stroke:var(--o2);stroke-width:3;opacity:${f1(1-R)}"/>`;
    const rd=ramp(t,.85,.97);
    if(rd>0){s+=`<path d="${pathFn(u=>rA(u*80*rd),GX,GX+GW*rd,GY+GH,GY,90)}" style="fill:none;stroke:var(--fl);stroke-width:3"/>`;
      s+=`<path d="${pathFn(u=>rB(u*80*rd),GX,GX+GW*rd,GY+GH,GY,90)}" style="fill:none;stroke:var(--rx);stroke-width:3"/>`}
    /* legend: layers, or the two roads */
    if(R<.5){let cx=GX,cy=L.cy;const act=[g,e,sm,ai,inf],cols=['var(--rx)','var(--rec)','var(--smoke)','var(--accent)','var(--bact)'];
      s+=`<line x1="${GX}" x2="${GX+18}" y1="${cy-26}" y2="${cy-26}" style="stroke:var(--o2);stroke-width:3"/><text x="${GX+24}" y="${cy-22}" class="t-xs">${CA_TXT.person}</text>`;
      s+=`<line x1="${GX+120}" x2="${GX+138}" y1="${cy-26}" y2="${cy-26}" style="stroke:var(--muted);stroke-width:1.8;stroke-dasharray:5 4"/><text x="${GX+144}" y="${cy-22}" class="t-xs">${CA_TXT.healthy}</text>`;
      CA_TXT.layers.forEach((lb,i)=>{const w=lb.length*12*.58+16;if(cx+w>GX+GW){cx=GX;cy+=30}
        s+=`<g style="opacity:${f1(.3+.7*act[i])}">${chip(cx,cy,lb,{col:cols[i],size:12,fill:act[i]>.5?'var(--panel-2)':'var(--panel)'})}</g>`;cx+=w+8})}
    else{const cy=L.cy-18;
      s+=`<line x1="${GX}" x2="${GX+18}" y1="${cy-4}" y2="${cy-4}" style="stroke:var(--fl);stroke-width:3"/><text x="${GX+24}" y="${cy}" class="t-sm" style="fill:var(--ink)">${N?CA_TXT.roadAs:CA_TXT.roadA}</text>`;
      s+=`<line x1="${GX}" x2="${GX+18}" y1="${cy+18}" y2="${cy+18}" style="stroke:var(--rx);stroke-width:3"/><text x="${GX+24}" y="${cy+22}" class="t-sm" style="fill:var(--ink)">${N?CA_TXT.roadBs:CA_TXT.roadB}</text>`;
      if(N)s+=`<text x="${GX}" y="${cy+44}" class="t-xs">${CA_TXT.rate}: 53 · 27 mL</text>`}
    svg.innerHTML=s;setSt(p);$('#caNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#caPlay'),draw,22000,'%t:player.replay%','causes');
  const setSt=stepWire($('#caSteps'),CA_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- forest plot ---- */
  const fs=$('#caFor'),fb=$('#caOrBtns');let sel=0;
  fb.innerHTML=CA_OR.map((r,i)=>`<button class="btn" data-or="${i}" aria-pressed="${i===0}"><i style="background:${r.c}"></i>${r.l}</button>`).join('');
  function drawFor(){
    const N0=NARROW(),n=CA_OR.length,rh=N0?44:32,top=34,H=top+n*rh+40;
    const N=vb(fs,'720 '+H,'400 '+H);
    const L=N?{lx:16,bx:22,bw:356,vx:384}:{lx:20,bx:276,bw:300,vx:590};
    const lg=Math.log(70),X=v=>L.bx+L.bw*clamp(Math.log(v)/lg);
    let s='';
    CA_OR.forEach((r,i)=>{const y=top+i*rh,cy=N?y+28:y+rh/2,on=i===sel;
      s+=`<g class="clk" data-or="${i}">`;
      s+=`<rect x="${N?4:8}" y="${y+1}" width="${N?392:704}" height="${rh-2}" rx="8" style="fill:${on?'var(--brand-soft)':'transparent'}"/>`;
      s+=`<text x="${L.lx}" y="${N?y+14:cy+4}" class="t-sm" style="fill:var(--ink)${on?';font-weight:700':''}">${r.l}</text>`;
      if(r.lo!=null){const hx=X(r.hi);s+=`<line x1="${f1(X(r.lo))}" x2="${f1(hx)}" y1="${cy}" y2="${cy}" style="stroke:${r.c};stroke-width:2"/>`;
        if(r.hi>70)s+=`<path d="M${f1(hx-6)} ${cy-5}L${f1(hx)} ${cy}L${f1(hx-6)} ${cy+5}" style="fill:none;stroke:${r.c};stroke-width:2"/>`}
      s+=`<rect x="${f1(X(r.v)-5)}" y="${cy-5}" width="10" height="10" style="fill:${r.c};stroke:var(--ink);stroke-width:${on?1.5:0}"/>`;
      const vt=N?r.d.split(' ')[0]:r.d;
      s+=`<text x="${L.vx}" y="${N?y+14:cy+4}" class="t-sm${N?' t-end':''}" style="fill:var(--ink)">${vt}</text></g>`});
    const yb=top+n*rh;
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${top-4}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.2"/>`;
    s+=`<line x1="${L.bx}" x2="${L.bx+L.bw}" y1="${yb}" y2="${yb}" class="axis"/>`;
    [1,2,5,10,20,50].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-4}" y2="${yb}" class="grid"/><text x="${f1(X(v))}" y="${yb+15}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${L.bx+L.bw}" y="${yb+30}" class="t-xs t-end">${CA_ORT.axis}</text><text x="${L.bx}" y="${top-14}" class="t-xs">${CA_ORT.head}</text>`;
    fs.innerHTML=s;const r=CA_OR[sel];$('#caForNote').innerHTML=noteHTML({k:r.k,t:r.l,txt:r.txt,pt:r.pt,hook:CA_ORT.hook});
    $$('[data-or]',fb).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.or===sel));
  }
  const pick=e=>{const b=e.target.closest('[data-or]');if(!b)return;sel=+b.dataset.or;drawFor()};
  fb.addEventListener('click',pick);fs.addEventListener('click',pick);
  drawFor();

  /* ---- Fletcher–Peto: stop smoking at age X (derived, illustrative) ---- */
  const fp=$('#caFp'),qr=$('#caQuit');
  const F=CA_FP,vN=a=>F.start-F.never*(a-F.age0),vS=a=>F.start-F.smoke*(a-F.age0);
  const vQ=(a,q)=>a<=q?vS(a):a<=q+1?vS(q)+F.gain*(a-q):vS(q)+F.gain-F.never*(a-q-1);
  function drawFp(){
    const q=+qr.value,N=vb(fp,'720 380','400 430');
    const L=N?{gx:44,gy:80,gw:338,gh:280,lg:[[16,16],[16,34],[16,52]]}:{gx:64,gy:58,gw:620,gh:260,lg:[[64,20],[300,20],[520,20]]};
    const X=a=>L.gx+L.gw*(a-25)/50,Y=v=>L.gy+L.gh*(1-v/4.5);
    let s=axes(L.gx,L.gy,L.gw,L.gh,{xt:[[0,'25'],[.2,'35'],[.4,'45'],[.6,'55'],[.8,'65'],[1,'75']],yt:[[0,'0'],[1/4.5,'1'],[2/4.5,'2'],[3/4.5,'3'],[4/4.5,'4']],grid:true,xl:CA_FPT.x});
    s+=`<text x="${L.gx}" y="${L.gy-10}" class="t-xs">${CA_FPT.y}</text>`;
    const line=(fn,col,w,dash)=>{let d='';for(let a=25;a<=75;a+=.5)d+=(a===25?'M':'L')+f1(X(a))+' '+f1(Y(fn(a)));return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w}${dash?';stroke-dasharray:'+dash:''}"/>`};
    s+=line(vN,'var(--good)',2.4,'6 4')+line(vS,'var(--fl)',2.4);
    if(q<=75){s+=line(a=>vQ(a,q),'var(--rx)',3.4);
      s+=`<line x1="${f1(X(q))}" x2="${f1(X(q))}" y1="${L.gy}" y2="${L.gy+L.gh}" style="stroke:var(--rx);stroke-width:1;stroke-dasharray:3 3"/><circle cx="${f1(X(q))}" cy="${f1(Y(vS(q)))}" r="5" style="fill:var(--rx)"/>`;
      const tx=X(q)>L.gx+L.gw-90?X(q)-6:X(q)+6;s+=`<text x="${f1(tx)}" y="${L.gy+L.gh-10}" class="t-xs${X(q)>L.gx+L.gw-90?' t-end':''}" style="fill:var(--rx)">${CA_FPT.stopAt(q)}</text>`}
    const lgd=[[CA_FPT.nevS,'var(--good)','6 4'],[CA_FPT.smoS,'var(--fl)',''],[CA_FPT.quiS,'var(--rx)','']];
    lgd.forEach((d,i)=>{const[x,y]=L.lg[i];s+=`<line x1="${x}" x2="${x+20}" y1="${y-4}" y2="${y-4}" style="stroke:${d[1]};stroke-width:3${d[2]?';stroke-dasharray:'+d[2]:''}"/><text x="${x+26}" y="${y}" class="t-xs" style="fill:var(--ink)">${d[0]}</text>`});
    fp.innerHTML=s;
    $('#caQuitV').textContent=CA_FPT.out(q);qr.setAttribute('aria-valuetext',CA_FPT.out(q));
    const vq=vQ(75,q),vs=vS(75),vn=vN(75);
    let rd=`<span>${CA_FPT.read(q,vq,vs,vn)}</span>`;
    if(q<=75)rd+=`<span>${CA_FPT.kept(q,vq-vs)}</span>`;
    const D=CA_DOLL.find(d=>Math.abs(d[0]-q)<=2);if(D)rd+=`<span>${CA_FPT.doll(D[0],D[1])}</span>`;
    $('#caFpRead').innerHTML=rd;
  }
  qr.addEventListener('input',drawFp);drawFp();
  $('#caFpNote').innerHTML=noteHTML(CA_FPN);

  /* ---- trajectories ---- */
  const lgS=$('#caLg');let mode='lange';
  function drawLg(){const D=CA_LG[mode];let s='';
    if(mode==='lange'){
      const N=vb(lgS,'720 360','400 700');
      const P=N?[{x:80,y:52,c:24},{x:80,y:384,c:24}]:[{x:40,y:62,c:26},{x:400,y:62,c:26}];
      [D.a,D.b].forEach((G,j)=>{const o=P[j],col=j?'var(--dx)':'var(--fl)';
        s+=`<text x="${o.x}" y="${o.y-30}" class="t-lbl">${G.t1}</text><text x="${o.x}" y="${o.y-14}" class="t-sm">${G.t2}</text>`;
        for(let q=0;q<100;q++){const cx=o.x+(q%10+.5)*o.c,cy=o.y+(Math.floor(q/10)+.5)*o.c,on=q<G.n,c=on?col:'var(--line)';
          s+=`<circle cx="${f1(cx)}" cy="${f1(cy-o.c*.2)}" r="${f1(o.c*.15)}" style="fill:${c}"/><rect x="${f1(cx-o.c*.19)}" y="${f1(cy-o.c*.03)}" width="${f1(o.c*.38)}" height="${f1(o.c*.36)}" rx="${f1(o.c*.1)}" style="fill:${c}"/>`}
        s+=`<text x="${o.x}" y="${o.y+o.c*10+18}" class="t-sm" style="fill:${col};font-weight:600">${D.foot(G.n)}</text>`});
    }else{
      const R=D.rows,N0=NARROW(),rh=N0?54:44,H=40+R.length*rh;
      const N=vb(lgS,'720 '+H,'400 '+H);
      const L=N?{lx:16,bx:16,bw:250,vx:274}:{lx:20,bx:330,bw:250,vx:590};
      s+=`<text x="${L.bx}" y="18" class="t-xs">${D.sh}</text>`;
      R.forEach((r,i)=>{const y=30+i*rh,by=N?y+20:y+6,col=r[3]?'var(--fl)':'var(--dx)';
        s+=`<text x="${L.lx}" y="${N?y+12:y+19}" class="t-sm" style="fill:var(--ink)">${r[0]}</text>`;
        s+=`<rect x="${L.bx}" y="${by}" width="${L.bw}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${by}" width="${f1(L.bw*r[1]/40)}" height="18" rx="4" style="fill:${col}"/>`;
        s+=`<text x="${f1(L.bx+L.bw*r[1]/40+6)}" y="${by+13}" class="t-xs" style="fill:var(--ink)">${r[1]}%</text>`;
        if(r[2]!=null)s+=`<text x="${L.vx}" y="${by+13}" class="t-xs" style="fill:var(--fl);font-weight:600">${D.orl(r[2])}</text>`});
    }
    lgS.innerHTML=s;$('#caLgCap').innerHTML=D.cap;$('#caLgNote').innerHTML=noteHTML(D.note)}
  $('#caLgMode').addEventListener('click',e=>{const b=e.target.closest('[data-lg]');if(!b)return;mode=b.dataset.lg;
    $$('#caLgMode [data-lg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawLg()});
  drawLg();
  const prev=redraws.causes;redraws.causes=()=>{prev&&prev();drawFor();drawFp();drawLg()};
};
const CA_ORT={axis:'odds ratio (log scale)',head:'risk factor · odds ratio (95% CI)',hook:'An odds ratio of 1 means no difference; ratios from different studies cannot be compared directly [[Adeloye2022]].'};
const CA_FPN={k:'Fletcher & Peto 1977 · Lung Health Study 2000',t:'Lost function does not return; the fall slows',
 txt:'In susceptible smokers, stopping did not restore lost FEV1, but further loss returned to the normal rate [[Fletcher1977]]. In the Lung Health Study (3,926 smokers with mild to moderate obstruction), quitting improved FEV1 by an average of 47 mL in the first year, and later decline in sustained quitters was half that of continuing smokers (31 vs 62 mL a year) [[Scanlon2000]]. Fletcher and Peto found that infections and mucus hypersecretion did not speed up obstruction [[Fletcher1977]].',
 pt:'Stopping smoking does not give back lung function already lost, but it slows the loss down to a normal pace, at any age.',
 hook:'Quitting returns FEV1 decline to the normal rate; it does not restore what was lost [[Fletcher1977,Scanlon2000]].'};
