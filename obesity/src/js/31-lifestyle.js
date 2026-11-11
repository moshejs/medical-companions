/* =============== 3.1 diet, activity & behaviour =============== */
/* Time axis: years 0 to 15, the first 2 years stretched over 40% of the slider. Each trial has its own unit and scale;
   dots are published group means, the lines between them schematic. */
const LF_T2=.4,LF_END=15;
function lfYr(t){return t<=LF_T2?2*t/LF_T2:2+(LF_END-2)*(t-LF_T2)/(1-LF_T2)}
function lfTOf(y){return y<=2?y/2*LF_T2:LF_T2+(1-LF_T2)*(y-2)/(LF_END-2)}
const LF_TRIALS={
 dietfits:{n:'DIETFITS',unit:'kg',y0:-10,y1:1,yt:[0,-5,-10],head:'609 adults, healthy low-fat vs healthy low-carbohydrate, 12 months',
  S:[{n:'healthy low-fat',col:'var(--tx)',dash:'',P:[[0,0,''],[1,-5.3,'Low-fat: −5.3 kg at 12 months. [[Gardner2018DIETFITS]]']]},
     {n:'healthy low-carb',col:'var(--accent)',dash:'7 4',P:[[0,0,''],[1,-6.0,'Low-carbohydrate: −6.0 kg; the 0.7 kg difference was not significant (95% CI −0.2 to 1.6). [[Gardner2018DIETFITS]]']]}]},
 pounds:{n:'POUNDS LOST',unit:'kg',y0:-8,y1:1,yt:[0,-4,-8],head:'811 adults, four reduced-calorie diets with different fat, protein and carbohydrate',
  S:[{n:'65% carbohydrate',col:'var(--tx)',dash:'',P:[[0,0,''],[.5,-6,'All four diets: about −6 kg (7%) at 6 months, then regain after 12 months. [[Sacks2009POUNDS]]'],[2,-2.9,'65% carbohydrate: −2.9 kg at 2 years. [[Sacks2009POUNDS]]']]},
     {n:'35% carbohydrate',col:'var(--accent)',dash:'7 4',P:[[0,0,''],[.5,-6,''],[2,-3.4,'35% carbohydrate: −3.4 kg at 2 years (P>0.20 for every comparison). [[Sacks2009POUNDS]]']]}]},
 lookahead:{n:'Look AHEAD',unit:'%',y0:-10,y1:1,yt:[0,-5,-10],head:'5145 adults with type 2 diabetes, intensive lifestyle vs diabetes support and education',
  S:[{n:'intensive lifestyle',col:'var(--tx)',dash:'',P:[[0,0,''],[1,-8.6,'Intensive: −8.6% at 1 year. [[LookAHEAD2007]]'],[4,-4.7,'Intensive: −4.7% at 4 years; 46% kept off ≥5%. [[Wadden2011LookAHEAD]]'],[8,-4.7,'Intensive: −4.7% at 8 years; 50.3% kept off ≥5%. [[LookAHEAD2014Obesity]]'],[9.6,-6.0,'Intensive: −6.0% at the end (median 9.6 years). [[LookAHEAD2013]]']]},
     {n:'support and education',col:'var(--muted)',dash:'7 4',P:[[0,0,''],[1,-0.7,'Control: −0.7% at 1 year. [[LookAHEAD2007]]'],[4,-1.1,'Control: −1.1% at 4 years. [[Wadden2011LookAHEAD]]'],[8,-2.1,'Control: −2.1% at 8 years. [[LookAHEAD2014Obesity]]'],[9.6,-3.5,'Control: −3.5% at the end. [[LookAHEAD2013]]']]}]},
 direct:{n:'DiRECT',unit:'kg',y0:-12,y1:1,yt:[0,-6,-12],head:'306 adults with type 2 diabetes, total diet replacement then structured support, vs best-practice care',
  S:[{n:'diet replacement programme',col:'var(--tx)',dash:'',P:[[0,0,''],[1,-10.0,'Programme: −10.0 kg at 12 months; 46% in diabetes remission vs 4%. [[Lean2018DiRECT]]'],[2,-7.6,'Programme: −7.6 kg at 24 months; remission 36%. [[Lean2024DiRECT,Lean2019DiRECT]]'],[5,-6.1,'Extension with low-intensity support: −6.1 kg at 5 years, 13% in remission (non-randomised). [[Lean2024DiRECT]]']]},
     {n:'best-practice care',col:'var(--muted)',dash:'7 4',P:[[0,0,''],[1,-1.0,'Control: −1.0 kg at 12 months. [[Lean2018DiRECT]]'],[5,-4.6,'Original controls: −4.6 kg at 5 years, 5% in remission. [[Lean2024DiRECT]]']]}]},
 droplet:{n:'DROPLET',unit:'kg',y0:-12,y1:1,yt:[0,-6,-12],head:'278 adults in primary care, 8 weeks of an 810 kcal/day formula diet vs nurse-led usual care',
  S:[{n:'total diet replacement',col:'var(--tx)',dash:'',P:[[0,0,''],[1,-10.7,'Diet replacement: −10.7 kg at 12 months; 45% lost ≥10%. [[Astbury2018DROPLET]]'],[3,-6.2,'Diet replacement: −6.2 kg at 3 years, after regaining 8.9 kg from programme end. [[Astbury2021DROPLET]]']]},
     {n:'usual care',col:'var(--muted)',dash:'7 4',P:[[0,0,''],[1,-3.1,'Usual care: −3.1 kg at 12 months. [[Astbury2018DROPLET]]'],[3,-2.7,'Usual care: −2.7 kg at 3 years. [[Astbury2021DROPLET]]']]}]},
 nwcr:{n:'Weight Control Registry',unit:'kg',y0:-35,y1:1,yt:[0,-15,-30],xl:'years since joining',head:'2886 registry members who had already lost weight: a self-selected registry, not a trial',
  S:[{n:'loss kept off since joining',col:'var(--tx)',dash:'',P:[[0,-31.3,'At entry: 31.3 kg below their maximum. [[Thomas2014NWCR]]'],[5,-23.8,'23.8 kg at 5 years. [[Thomas2014NWCR]]'],[10,-23.1,'23.1 kg at 10 years; more than 87% still ≥10% below their maximum. [[Thomas2014NWCR]]']]}]},
 dpp:{n:'DPP (diabetes risk)',unit:'risk',y0:0,y1:70,yt:[0,30,60],head:'3234 adults with raised glucose: diabetes risk, not weight, vs placebo',
  S:[{n:'lifestyle',col:'var(--tx)',dash:'',P:[[2.8,58,'Lifestyle: 58% lower incidence over 2.8 years. [[Knowler2002DPP]]'],[10,34,'34% lower at 10 years, after partial regain. [[DPPRG2009]]'],[15,27,'27% lower at 15 years. [[DPPRG2015]]']]},
     {n:'metformin',col:'var(--accent)',dash:'7 4',P:[[2.8,31,'Metformin: 31% lower. [[Knowler2002DPP]]'],[10,18,'18% lower at 10 years. [[DPPRG2009]]'],[15,18,'18% lower at 15 years. [[DPPRG2015]]']]}]}
};
const LF_ORDER=['dietfits','pounds','lookahead','direct','droplet','nwcr','dpp'];
const LF_STEPS=[
 {from:0,at:.2,trial:'dietfits',k:'Year 1',t:'Any diet you can keep to',
  txt:'POUNDS LOST randomised 811 adults to four reduced-calorie diets with different fat, protein and carbohydrate. All lost about 6 kg by 6 months and began to regain after 12; at 2 years the diets did not differ, and each group session attended added about 0.2 kg of loss. [[Sacks2009POUNDS]] In DIETFITS, low-fat and low-carbohydrate diets gave −5.3 vs −6.0 kg at 12 months, and neither genotype nor insulin secretion predicted who did better on which. [[Gardner2018DIETFITS]] A network meta-analysis "supports the practice of recommending any diet that a patient will adhere to". [[Johnston2014]]',
  pt:'No single "best diet" exists. Low-fat, low-carbohydrate and Mediterranean diets gave similar average results; the one a person can keep up matters most. [[Sacks2009POUNDS,Gardner2018DIETFITS,Johnston2014]]',
  hook:'DIETFITS: −5.3 vs −6.0 kg, not significant; genotype did not predict response. [[Gardner2018DIETFITS]]'},
 {from:.24,at:.3,trial:'lookahead',k:'Intensive support',t:'Behavioural programmes',
  txt:'USPSTF recommends that clinicians offer or refer adults with BMI ≥30 to intensive, multicomponent behavioural interventions (grade B). [[Curry2018USPSTF]] Its evidence review found 2.39 kg more loss than control at 12 to 18 months. [[LeBlanc2018]] The 2013 guideline defines high intensity as "≥14 sessions in 6 mo", with average losses of about 8 kg. [[Jensen2014Guideline]] In Look AHEAD, the intensive arm lost 8.6% of starting weight at 1 year vs 0.7%, and HbA1c fell from 7.3% to 6.6%. [[LookAHEAD2007]]',
  pt:'Regular support from a trained coach, in a group or one to one, helps more than advice alone. [[Jensen2014Guideline,Curry2018USPSTF]]',
  hook:'USPSTF 2018: grade B, intensive behavioural interventions for adults with BMI ≥30. [[Curry2018USPSTF]]'},
 {from:.36,at:.46,trial:'lookahead',k:'Years 1 to 4',t:'Activity for maintenance',
  txt:'Aerobic exercise alone gave only 1.6 kg loss at 6 months. [[Thorogood2011]] The ACSM says more than 250 min/week goes with better maintenance in observational studies, but no well-designed RCT shows it prevents regain. [[Donnelly2009ACSM]] The 2013 guideline quotes about 200 to 300 min/week for long-term maintenance, with at least monthly contact for a year or more. [[Jensen2014Guideline]] At year 4 of Look AHEAD, 46% of the intensive arm vs 25% of controls had kept off ≥5%. [[Wadden2011LookAHEAD]]',
  pt:'Exercise on its own usually changes weight only a little. It still helps the heart, blood sugar, mood and strength, and it helps people keep weight off. [[Thorogood2011,Shaw2006Exercise]]',
  hook:'Activity matters more for maintenance and health than for the initial loss. [[Thorogood2011,Donnelly2009ACSM]]'},
 {from:.52,at:.62,trial:'direct',k:'Years 2 to 5',t:'Regain is the rule',
  txt:'Across 80 trials, losses plateaued at about 6 months; 3 to 6 kg was kept off at 48 months. [[Franz2007]] In DiRECT, remission of type 2 diabetes fell from 46% at 1 year to 36% at 2 years, tracking regain, [[Lean2018DiRECT,Lean2019DiRECT]] and was 13% at 5 years with low-intensity support. [[Lean2024DiRECT]] In DROPLET, regain from programme end to 3 years was 8.9 kg. [[Astbury2021DROPLET]] Even so, risk-factor benefits lasted at least 5 years. [[HartmannBoyce2023]] The biology is in <a href="#adaptation" data-go="adaptation">Why lost weight comes back</a>.',
  pt:'After weight loss, the body pushes back and some weight usually returns. That is biology, not a lack of willpower, and health gains can last even so. [[Sumithran2011,HartmannBoyce2023]]',
  hook:'DiRECT remission: 46% at 1 year, 36% at 2 years; 86% in those who lost ≥15 kg at 1 year. [[Lean2018DiRECT,Lean2019DiRECT]]'},
 {from:.75,at:.95,trial:'nwcr',k:'Up to 10 years',t:'What maintainers do',
  txt:'About 20% of people with overweight keep off ≥10% for at least a year. [[Wing2005AJCN]] National Weight Control Registry members reported about an hour a day of activity, regular breakfast, self-weighing and a consistent eating pattern; this is a self-selected registry, not a trial. [[Wing2005AJCN]] Over 10 years, 2886 members kept off a mean 23.1 kg. [[Thomas2014NWCR]] Behaviours, not demographics, predicted maintenance across 67 studies, [[Varkevisser2019]] and maintenance programmes cut regain by 1.56 kg at 12 months. [[Dombrowski2014]]',
  pt:'People who keep weight off tend to stay active, keep an eye on their weight and have ongoing support. Ongoing care matters. [[Wing2005AJCN,Dombrowski2014]]',
  hook:'Maintenance interventions reduce regain by about 1.6 kg at 12 months. [[Dombrowski2014]]'}
];
/* diet comparator: each trial's arms, bars scaled within the trial */
const LF_DIET=[
 {id:'macro',n:'Macronutrients',t:'Fat vs carbohydrate: small differences',
  txt:'Large trials find small or no differences between macronutrient patterns; pooled analyses give low-carbohydrate about a 1 kg edge over low-fat (1.15 kg in 53 RCTs). [[Tobias2015]] Adherence dominates. [[Johnston2014]] In DIRECT, low-carbohydrate cut the total:HDL cholesterol ratio by 20% vs 12% on low-fat. [[Shai2008DIRECT]] Weight loss diminished by 12 months in a network meta-analysis of 121 trials. [[Ge2020BMJ]]',
  R:[{n:'POUNDS LOST, 2 years',u:'kg',A:[['65% carbohydrate',-2.9],['35% carbohydrate',-3.4]]},
     {n:'DIETFITS, 12 months',u:'kg',A:[['healthy low-fat',-5.3],['healthy low-carb',-6.0]]},
     {n:'DIRECT (Israel), 2 years',u:'kg',A:[['low-fat',-2.9],['Mediterranean',-4.4],['low-carbohydrate',-4.7]]}]},
 {id:'timing',n:'Meal timing',t:'Eating window: no clear extra benefit',
  txt:'With the same calorie-restricted diet, adding an 8 am to 4 pm eating window gave −8.0 vs −6.3 kg at 12 months, a net −1.8 kg that was not significant (P = 0.11). [[Liu2022TRE]] In TREAT, 16:8 eating alone was no better than three meals (difference −0.26 kg) and lean mass fell more. [[Lowe2020TREAT]] Early eating (7 am to 3 pm) gave 2.3 kg more loss at 14 weeks. <span class="ev early">Early evidence</span> [[Jamshed2022]] Alternate-day fasting matched daily restriction but had the highest dropout, 38%. [[Trepanowski2017ADF]]',
  R:[{n:'Liu 2022, 12 months (both calorie-restricted)',u:'kg',A:[['time-restricted + calories',-8.0],['calorie restriction only',-6.3]]},
     {n:'Alternate-day fasting, 12 months',u:'%',A:[['alternate-day fasting',-6.0],['daily restriction',-5.3]]}]},
 {id:'vlcd',n:'Meal replacement & VLCD',t:'Fast early loss, then regain',
  txt:'Very-low-calorie diets (under 800 kcal/day) gave more short-term loss than low-calorie diets (16.1% vs 9.7%) but similar long-term loss (6.3% vs 5.0%). [[Tsai2006VLCD]] Partial meal replacement gave 2.43 to 2.63 kg more at 1 year than a conventional diet. [[Heymsfield2003]] DROPLET kept a −3.3 kg difference at 3 years, but regain after the programme was larger with diet replacement. [[Astbury2021DROPLET]] The 2013 guideline describes very-low-calorie diets as medically supervised, within high-intensity programmes. [[Jensen2014Guideline]]',
  R:[{n:'Tsai 2006, short term',u:'%',A:[['very-low-calorie',-16.1],['low-calorie',-9.7]]},
     {n:'Tsai 2006, long term',u:'%',A:[['very-low-calorie',-6.3],['low-calorie',-5.0]]},
     {n:'DROPLET, 12 months',u:'kg',A:[['total diet replacement',-10.7],['usual care',-3.1]]},
     {n:'DROPLET, 3 years',u:'kg',A:[['total diet replacement',-6.2],['usual care',-2.7]]}]},
 {id:'move',n:'Exercise',t:'Exercise: modest for weight, strong for muscle and health',
  txt:'Aerobic exercise alone gave 1.6 kg at 6 months and 1.7 kg at 12 months vs control. [[Thorogood2011]] In older adults losing about 9%, aerobic training lost more lean mass (5%) than resistance (2%) or combined training (3%). [[Villareal2017]] Resistance training does not enhance weight loss but may preserve fat-free mass. [[Donnelly2009ACSM]]',
  R:[{n:'Aerobic exercise alone vs control',u:'kg',A:[['6 months',-1.6],['12 months',-1.7]]},
     {n:'LITOE, lean mass change, 6 months',u:'% lean mass',A:[['aerobic',-5],['resistance',-2],['combined',-3]]}]}
];

inits.lifestyle=()=>{
  /* ---------- trial curves ---------- */
  const svg=$('#lfSvg'),rg=$('#lfT'),chips=$('#lfChips'),read=$('#lfRead');let pick='auto';
  chips.innerHTML=`<button class="btn" data-tr="auto" aria-pressed="true">Follow the steps</button>`+LF_ORDER.map(k=>`<button class="btn" data-tr="${k}" aria-pressed="false">${LF_TRIALS[k].n}</button>`).join('');
  const TK=[{y:0,l:'0'},{y:.5,l:'6 mo'},{y:1,l:'1 y'},{y:2,l:'2 y'},{y:5,l:'5 y'},{y:10,l:'10 y'},{y:15,l:'15 y'}];
  const at=(P,y)=>{if(y<P[0][0])return null;for(let i=0;i<P.length-1;i++)if(y<=P[i+1][0])return lerp(P[i][1],P[i+1][1],(y-P[i][0])/(P[i+1][0]-P[i][0]));return P[P.length-1][1]};
  function draw(t){
    const N=vb(svg,'720 380','400 440');
    const L=N?{x:52,y:92,w:330,h:270,ty:380,hy:22,lg:56}:{x:70,y:76,w:620,h:240,ty:334,hy:26,lg:56};
    const y=lfYr(t),p=phaseOf(LF_STEPS,t),P=LF_STEPS[p],key=pick==='auto'?P.trial:pick,T=LF_TRIALS[key];
    const X=v=>L.x+L.w*lfTOf(v),Y=v=>L.y+L.h-L.h*(v-T.y0)/(T.y1-T.y0);
    const uf=v=>{const m=(T.unit==='risk'||Number.isInteger(v)&&Math.abs(v)<1e-9?String(v):(+v).toFixed(1)).replace('-','−');return T.unit==='kg'?m+' kg':m+'%'};
    let s=`<text x="16" y="${L.hy}" class="t-big">${T.n}</text>`;
    /* wrap the description on phones */
    const head=T.head,cut=N?54:110;
    if(head.length>cut){const i=head.lastIndexOf(' ',cut);s+=`<text x="16" y="${L.hy+17}" class="t-xs">${head.slice(0,i)}</text><text x="16" y="${L.hy+29}" class="t-xs">${head.slice(i+1)}</text>`}
    else s+=`<text x="16" y="${L.hy+17}" class="t-xs">${head}</text>`;
    s+=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    TK.forEach(k=>{s+=`<line x1="${f1(X(k.y))}" x2="${f1(X(k.y))}" y1="${L.y}" y2="${L.y+L.h}" class="grid"/>`;
      if(!(N&&k.y===.5))s+=`<text x="${f1(k.y===LF_END?X(k.y)+2:X(k.y))}" y="${L.ty}" class="t-xs ${k.y===LF_END?'t-end':'t-mid'}">${k.l}</text>`});
    T.yt.forEach(v=>{s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v===0?'axis':'grid'}"/><text x="${L.x-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${uf(v)}</text>`});
    s+=`<text x="${L.x+L.w}" y="${L.ty+16}" class="t-xs t-end">${T.xl||'years since the start'}</text>`;
    s+=`<text x="${L.x}" y="${L.y-8}" class="t-xs" style="fill:var(--ink);font-weight:700">${T.unit==='risk'?'% lower diabetes incidence vs placebo':T.unit==='%'?'weight change, % of starting weight':'weight change, kg'}</text>`;
    T.S.forEach((S,j)=>{const Q=S.P.map(q=>[q[0],q[1]]),end=Q[Q.length-1][0];
      const path=ym=>{let d='',n=0;const a=Q[0][0],b=Math.min(ym,end);if(b<a)return '';for(let i=0;i<=80;i++){const yy=lerp(a,b,i/80);d+=(n++?'L':'M')+f1(X(yy))+' '+f1(Y(at(Q,yy)))}return d};
      s+=`<path d="${path(end)}" style="fill:none;stroke:${S.col};stroke-width:1.4;opacity:.35${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
      const pd=path(y);if(pd)s+=`<path d="${pd}" style="fill:none;stroke:${S.col};stroke-width:3;stroke-linejoin:round${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
      S.P.forEach(q=>{if(!q[2])return;const on=y>=q[0];s+=`<circle cx="${f1(X(q[0]))}" cy="${f1(Y(q[1]))}" r="${on?4.6:3.4}" style="fill:${on?S.col:'var(--panel)'};stroke:${S.col};stroke-width:1.6"/>`;
        if(on){const o=T.S[1-j],ov=o?at(o.P.map(r=>[r[0],r[1]]),q[0]):null,below=ov!=null&&q[1]<ov;s+=kitLabel(X(q[0])+(q[0]>=LF_END-1?-6:6),Y(q[1])+(below?15:-8),uf(q[1]),{a:q[0]>=LF_END-1?'e':''})}});
      /* legend */
      const lx=N?16+j*190:L.x+10+j*220,ly=N?L.y-26:L.y+16;
      s+=`<line x1="${lx}" x2="${lx+20}" y1="${ly-3}" y2="${ly-3}" style="stroke:${S.col};stroke-width:3${S.dash?';stroke-dasharray:'+S.dash:''}"/><text x="${lx+26}" y="${ly}" class="t-xs" style="fill:var(--ink)">${S.n}</text>`});
    s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=kitLabel(Math.min(X(y)+4,L.x+L.w-40),L.y+L.h-6,y<1?Math.round(y*12)+' mo':f1(y)+' y',{});
    svg.innerHTML=s;
    setSt(p);$('#lfNote').innerHTML=noteHTML(P);
    read.innerHTML=T.S.map(S=>{let tx='';S.P.forEach(q=>{if(q[2]&&y>=q[0])tx=q[2]});if(!tx)tx=S.n+': first published point at '+(S.P.find(q=>q[2])[0])+' years.';
      return `<p><i style="border-top:3px ${S.dash?'dashed':'solid'} ${S.col}" aria-hidden="true"></i><span>${tx}</span></p>`}).join('');
  }
  const stop=playWire(rg,$('#lfPlay'),draw,26000,'%t:player.replay%','lifestyle');
  const setSt=stepWire($('#lfSteps'),LF_STEPS,rg,draw,stop);
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-tr]');if(!b)return;pick=b.dataset.tr;$$('[data-tr]',chips).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* ---------- diet comparator ---------- */
  const ds=$('#lfDiet'),db=$('#lfDietBtns'),dn=$('#lfDietNote');let di=0,grow=1,stopD=null;
  db.innerHTML=LF_DIET.map((d,i)=>`<button class="btn" data-dq="${i}" aria-pressed="${i===0}">${d.n}</button>`).join('');
  function drawD(){
    const D=LF_DIET[di],narrow=NARROW();
    const rowH=narrow?40:26,headH=26,gap=12;
    let H=16;D.R.forEach(r=>{H+=headH+r.A.length*rowH+gap});H+=8;
    const N=vb(ds,'720 '+Math.max(200,H),'400 '+Math.max(220,H));
    const L=N?{lx:16,bx:16,bw:300,vx:0}:{lx:20,bx:250,bw:380,vx:0};
    let s='',y=16;
    D.R.forEach(r=>{const mx=Math.max(...r.A.map(a=>Math.abs(a[1])));
      s+=`<text x="${L.lx}" y="${y+14}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text>`;y+=headH;
      r.A.forEach((a,i)=>{const w=L.bw*Math.abs(a[1])/mx*grow,col=i===0?'var(--tx)':i===1?'var(--accent)':'var(--life)';
        if(N){s+=`<text x="${L.lx}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${a[0]}</text>`;
          s+=`<rect x="${L.bx}" y="${y+15}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${y+15}" width="${f1(Math.max(2,w))}" height="14" rx="4" style="fill:${col}"/>`;
          s+=`<text x="${L.bx+L.bw+6}" y="${y+26}" class="t-xs" style="fill:var(--ink);font-weight:700">${(+a[1]).toFixed(1).replace('-','−')}${r.u==='kg'?' kg':'%'}</text>`}
        else{s+=`<text x="${L.bx-10}" y="${y+14}" class="t-xs t-end" style="fill:var(--ink)">${a[0]}</text>`;
          s+=`<rect x="${L.bx}" y="${y+3}" width="${L.bw}" height="15" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${y+3}" width="${f1(Math.max(2,w))}" height="15" rx="4" style="fill:${col}"/>`;
          s+=`<text x="${L.bx+L.bw+8}" y="${y+15}" class="t-xs" style="fill:var(--ink);font-weight:700">${(+a[1]).toFixed(1).replace('-','−')} ${r.u}</text>`}
        y+=rowH});
      y+=gap});
    ds.innerHTML=s;
    dn.innerHTML=`<div class="kicker">${D.n}</div><h4>${D.t}</h4><p>${D.txt}</p>`;
  }
  db.addEventListener('click',e=>{const b=e.target.closest('[data-dq]');if(!b)return;di=+b.dataset.dq;$$('[data-dq]',db).forEach(x=>x.setAttribute('aria-pressed',x===b));
    stopD&&stopD();stopD=animate(600,q=>{grow=ease(q);drawD()},()=>{stopD=null;grow=1;drawD()})});
  drawD();
  const pr=redraws.lifestyle;redraws.lifestyle=()=>{pr&&pr();drawD()};
};
