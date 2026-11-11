/* =============== 4.1 Children & adolescents =============== */
/* Main player: a schematic BMI-for-age chart. The curves are shapes, not CDC data (no BMI values are printed on the
   axis), so the chart teaches how the 85th, 95th, 120% and 140% of the 95th percentile relate as a child grows. Beside
   it, the AAP 2023 options light up when the child's age and severity meet the published thresholds. */
const CH_P95=monoFn([[2,19.3],[4,18],[6,18.4],[8,20],[10,22.4],[12,24.6],[14,26.6],[16,28.4],[18,29.8]]);
const CH_P85=monoFn([[2,18.2],[4,17],[6,17.1],[8,18.2],[10,19.9],[12,21.7],[14,23.3],[16,24.8],[18,26]]);
/* the child's position between the lines: 0 = 85th, 1 = 95th, 2 = 120% of 95th, 3 = 140% of 95th (schematic) */
const CH_S=monoFn([[3,-.7],[5,-.35],[7,.25],[9,.95],[11,1.5],[13,2.1],[15,2.35],[18,2.5]]);
function chBmi(a,s){const p85=CH_P85(a),p95=CH_P95(a);
  if(s<0)return p85+(p85-p95)*(-s)*.8;if(s<1)return lerp(p85,p95,s);if(s<2)return lerp(p95,1.2*p95,s-1);return lerp(1.2*p95,1.4*p95,s-2)}
const chAge=t=>3+15*t;
const CH_STEPS=[
 {from:0,at:.04,k:'Age 2 and up',t:'A yearly check',
  txt:'The AAP guideline (key action statement 1) says to screen all children aged 2 years and older for overweight and obesity at least once a year, using BMI percentile for age and sex. [[Orr2026,Hampl2023AAP]] The 2000 CDC growth charts, which introduced BMI-for-age charts built from five US national surveys, cover ages 2 to 20. [[Kuczmarski2002]] A child’s BMI is compared with other children of the same age and sex, because BMI changes a great deal as children grow.',
  pt:'Doctors plot a child’s measurements on a growth chart that compares them with other children of the same age and sex. The chart is a tool, not a judgement.',
  hook:'Children: BMI percentile for age and sex, checked at least yearly from age 2 (AAP KAS 1). [[Orr2026,Hampl2023AAP]]'},
 {from:.2,at:.27,k:'85th percentile',t:'Crossing the 85th',
  txt:'In a US study of 8579 children and young people aged 3 to 19 with BMI at or above the 85th percentile, 46.9% had overweight, 36.4% class I obesity, 11.9% class II and 4.8% class III. [[Skinner2015]] The AAP refers children with overweight and obesity to intensive health behaviour and lifestyle treatment (IHBLT), described as most effective with 26 or more hours of face-to-face, family-based, multicomponent treatment over 3 to 12 months (KAS 11). [[Cuda2024OMA,Orr2026,Hampl2023AAP]] The recommendation is graded B from age 6 and C for ages 2 to 5. [[Orr2026,Hampl2023AAP]]',
  pt:'Treatment for children means the whole family working on everyday habits with a skilled team, for many hours over months. It is not a diet for the child.',
  hook:'IHBLT: 26 hours or more, face to face, family-based, over 3 to 12 months (AAP KAS 11). [[Cuda2024OMA,Orr2026]]'},
 {from:.4,at:.45,k:'95th percentile',t:'At or above the 95th: obesity',
  txt:'In children and adolescents, obesity is defined as BMI at or above the 95th percentile of BMI-for-age. [[Ogden2023]] The AAP guideline recommends against “watchful waiting”: treatment should begin when obesity is diagnosed, and comorbidities are treated at the same time (KAS 4, grade A). [[Cuda2024OMA,Orr2026,Hampl2023AAP]] In a meta-analysis of 15 cohorts (200,777 participants), children and adolescents with obesity were around five times more likely to have obesity as adults. [[Simmonds2016]]',
  pt:'Obesity in a child is not something to wait and see about. Help can start as soon as it is found, and it focuses on health for the whole family.',
  hook:'Paediatric obesity = BMI at or above the 95th percentile for age and sex; no “watchful waiting”. [[Ogden2023,Cuda2024OMA]]'},
 {from:.6,at:.66,k:'120% and 140% of the 95th',t:'Severe obesity',
  txt:'Severe obesity is BMI at or above 120% of the 95th percentile, or a BMI of 35 or more; the AAP uses 120% for class 2 and 140% for class 3. [[Ogden2023,Hampl2023AAP]] The 2000 charts could not grade this well, so in December 2022 CDC released extended charts that reach a BMI of 60 and add the 98th, 99th, 99.9th and 99.99th percentiles. From about age 7 the extended 98th approximates 120% of the 95th. [[Ogden2023]] In 2017 to March 2020, 6.7% of US children and adolescents aged 2 to 19 had BMI at or above 120% of the 95th percentile. [[Ogden2023]]',
  pt:'For higher BMIs, doctors describe how far above the 95th line a child is, as a percentage of it. Special extended charts now show these higher values.',
  hook:'Class 2 = 120% of the 95th percentile (or BMI 35); class 3 = 140% (or BMI 40). [[Ogden2023,Hampl2023AAP]]'},
 {from:.74,at:.8,k:'Age 12 and up',t:'Medicines can be offered',
  txt:'Key action statement 12: offer adolescents aged 12 and older with obesity weight-loss pharmacotherapy as an adjunct to health behaviour and lifestyle treatment, weighing risks and benefits (grade B), quoted as published. [[Orr2026,Hampl2023AAP]] Added to lifestyle therapy, newer medicines reduce mean BMI by about 5% to 17% at one year in adolescents. [[Kelly2024JAMA]] Uptake is low: fewer than 2% of eligible adolescents receive pharmacotherapy. [[Orr2026]]',
  pt:'Some teenagers aged 12 or older may be offered a medicine alongside family lifestyle support. The decision is made with a specialist team and the family.',
  hook:'AAP KAS 12: pharmacotherapy offered from age 12, as an adjunct (grade B). [[Orr2026,Hampl2023AAP]]'},
 {from:.88,at:.95,k:'Age 13 and up, severe obesity',t:'Evaluation for surgery',
  txt:'Key action statement 13: refer adolescents aged 13 and older with severe obesity for evaluation for metabolic and bariatric surgery (grade C), quoted as published. [[Orr2026,Hampl2023AAP]] The ASMBS 2018 paediatric guideline says adolescents with class II obesity plus a listed comorbidity, or class III obesity, “should be considered” for surgery. [[Pratt2018ASMBS]] AAP policy calls surgery an underused option, with unequal access. [[Armstrong2019AAP]]',
  pt:'For some teenagers with very high weight, surgery can be discussed with a specialist team. Referral means an assessment, not a decision.',
  hook:'AAP KAS 13: refer for surgical evaluation from age 13 with severe obesity (grade C). [[Orr2026,Hampl2023AAP]]'}
];
const CH_OPTS=[
 {n:'Screen every year',d:'BMI percentile from age 2',ok:(a,s)=>a>=2,w:''},
 {n:'Treat at diagnosis',d:'no watchful waiting; IHBLT 26 h+',ok:(a,s)=>s>=0,w:'overweight or obesity'},
 {n:'Medicines can be offered',d:'age 12+, with obesity',ok:(a,s)=>a>=12&&s>=1,w:'age 12 and obesity'},
 {n:'Evaluation for surgery',d:'age 13+, severe obesity',ok:(a,s)=>a>=13&&s>=2,w:'age 13 and severe obesity'}
];
const CH_ZONE=['below the 85th percentile','85th to below 95th: overweight','95th or above: obesity','120% of the 95th or above: severe obesity'];

/* STEP TEENS: published points only, straight lines between them [[Weghuber2022STEPTEENS]] */
const CH_ST={sema:[[0,0],[68,-16.1],[75,-13.2]],plac:[[0,0],[68,.6],[75,1.2]]};
const CH_ST_STEPS=[
 {from:0,k:'Weeks 0 to 68',t:'On treatment, with lifestyle support',
  txt:'STEP TEENS randomised 201 adolescents aged 12 to under 18 with obesity (or overweight plus a comorbidity) 2:1 to weekly semaglutide 2.4 mg or placebo, both with lifestyle intervention. At baseline the mean age was 15.4 years and mean BMI 37.0; 62% were girls. [[Weghuber2022STEPTEENS]]',
  pt:'Everyone in the trial had lifestyle support. The gap between the two lines is what the medicine added, on average; with placebo, BMI stayed about the same.'},
 {from:.9,k:'Week 68',t:'The end of treatment',
  txt:'Mean BMI change was −16.1% with semaglutide and +0.6% with placebo, a difference of −16.7 percentage points (95% CI −20.3 to −13.2). Body weight changed −14.7% vs +2.7%, and 73% (95/131) vs 18% (11/62) lost 5% or more. [[Weghuber2022STEPTEENS]] These are trial averages, not a prediction for any one young person.',
  hook:'STEP TEENS at 68 weeks: BMI −16.1% (semaglutide) vs +0.6% (placebo). [[Weghuber2022STEPTEENS]]'},
 {from:.95,k:'Week 75, seven weeks off treatment',t:'BMI starts to rise again',
  txt:'Seven weeks after stopping, BMI change was −13.2% with semaglutide vs +1.2% with placebo, which the authors describe as a small regain. [[Weghuber2022STEPTEENS]] After liraglutide was stopped in another adolescent trial, BMI SDS also rose more than with placebo (difference 0.15). [[Kelly2020Liraglutide]] This fits obesity as a chronic, relapsing disease, not a failure of effort.',
  pt:'When the medicine stops, the body’s hunger signals come back and some weight returns. That is biology, not anyone’s fault.',
  hook:'Regain after stopping (−16.1% to −13.2% by week 75) is consistent with a chronic, relapsing disease. [[Weghuber2022STEPTEENS,Kelly2020Liraglutide]]'}
];
/* comparator views */
const CH_CMP=[
 {id:'type',b:'By treatment type',h:'Mean BMI fall at about 1 year, adolescents (approximate)',u:'%',min:0,max:35,
  rows:[{n:'Intensive lifestyle (over 26 h)',v:3,l:'about 3%'},{n:'Medicines + lifestyle',lo:5,v:17,l:'about 5 to 17%'},{n:'Surgery, severe obesity',v:30,l:'about 30%'}],
  k:'A review of adolescent obesity',t:'More intensive treatment, larger average change',
  txt:'Lifestyle therapy alone needs more than 26 contact hours over a year to produce a mean BMI fall of about 3%. Added to lifestyle therapy, newer medicines reduce mean BMI by about 5% to 17% at one year, and severe adverse events are rare. In adolescents with BMI at or above 120% of the 95th percentile, surgery reduces mean BMI by about 30% at one year; about 15% have minor and 8% major perioperative complications. [[Kelly2024JAMA]]'},
 {id:'labs3',b:'Teen-LABS at 3 years',h:'Teen-LABS: share whose condition remitted 3 years after surgery',u:'%',min:0,max:100,
  rows:[{n:'Type 2 diabetes',v:95},{n:'Abnormal kidney function',v:86},{n:'Prediabetes',v:76},{n:'Elevated blood pressure',v:74},{n:'Dyslipidaemia',v:66}],
  k:'242 adolescents, mean BMI 53',t:'Health conditions often went into remission',
  txt:'Three years after surgery, mean weight had fallen 27% (95% CI 25 to 29): 28% after gastric bypass and 26% after sleeve gastrectomy. There were costs too: 57% had low ferritin (hypoferritinaemia) and 13% had had further intra-abdominal procedures. [[Inge2016NEJM]]'},
 {id:'labs5',b:'Teens vs adults, 5 years',h:'5 years after gastric bypass: adolescents (filled) vs adults (outline)',u:'%',min:0,max:100,pair:1,
  rows:[{n:'Weight change (fall)',v:26,w:29},{n:'Diabetes remission',v:86,w:53},{n:'Hypertension remission',v:68,w:41},{n:'Low ferritin',v:48,w:29}],
  k:'Teen-LABS vs adult LABS',t:'Similar weight change, more remission, more follow-up needs',
  txt:'Five years after gastric bypass, weight change was similar in adolescents (−26%) and adults (−29%). Adolescents were more likely to have remission of type 2 diabetes (86% vs 53%) and hypertension (68% vs 41%), but had more abdominal reoperations (19 vs 10 per 500 person-years) and more low ferritin (48% vs 29%). [[Inge2019NEJM]]'},
 {id:'amos',b:'AMOS, Sweden',h:'AMOS: mean BMI change over 5 years (kg/m²)',u:'',min:-15,max:5,
  rows:[{n:'Gastric bypass',v:-13.1,l:'−13.1'},{n:'Matched, no surgery',v:3.3,l:'+3.3'}],
  k:'81 adolescents, mean BMI 45.5',t:'BMI fell after surgery and rose without it',
  txt:'In the Swedish AMOS study, BMI fell by 13.1 kg/m² over 5 years after gastric bypass, while it rose 3.3 kg/m² in matched adolescents treated without surgery. 25% of surgical patients needed further abdominal surgery and 72% had some nutritional deficiency; 25% of the non-surgical group went on to have surgery within 5 years. [[Olbers2017AMOS]]'}
];

inits.children=()=>{
  /* ---------- growth chart player ---------- */
  const svg=$('#chSvg'),rg=$('#chT'),note=$('#chNote');let setA=null;
  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const L=N?{x:40,y:46,w:262,h:250,ox:20,oy:364,ow:360,oh:52,og:8,sy:620,lx:306}
             :{x:46,y:44,w:330,h:270,ox:460,oy:56,ow:252,oh:58,og:10,sy:362,lx:380};
    const a=chAge(t),s=CH_S(a),X=v=>L.x+L.w*(v-2)/16,Y=v=>L.y+L.h-L.h*(v-13)/(44-13);
    let g=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    /* bands between curves */
    const band=(f0,f1_,col,op)=>{let top='',bot='';for(let i=0;i<=64;i++){const v=2+16*i/64;top+=(i?'L':'M')+f1(X(v))+' '+f1(Y(Math.min(44,f1_(v))));}
      for(let i=64;i>=0;i--){const v=2+16*i/64;bot+='L'+f1(X(v))+' '+f1(Y(Math.min(44,f0(v))))}
      return `<path d="${top+bot}Z" style="fill:${col};opacity:${op}"/>`};
    const p120=v=>1.2*CH_P95(v),p140=v=>1.4*CH_P95(v),ceil=()=>44;
    g+=band(CH_P85,CH_P95,'var(--warn-soft)',.9)+band(CH_P95,p120,'var(--accent-soft)',.9)+band(p120,ceil,'var(--hl-soft)',.75);
    for(let v=2;v<=18;v+=2){g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y+L.h}" y2="${L.y+L.h+4}" class="axis"/><text x="${f1(X(v))}" y="${L.y+L.h+16}" class="t-xs t-mid">${v}</text>`}
    g+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${L.y+L.h}" y2="${L.y+L.h}" class="axis"/><line x1="${L.x}" x2="${L.x}" y1="${L.y}" y2="${L.y+L.h}" class="axis"/>`;
    g+=`<text x="${L.x+L.w}" y="${L.y+L.h+30}" class="t-xs t-end">age in years</text><text x="${L.x}" y="${L.y-8}" class="t-xs">BMI-for-age (schematic, no values)</text>`;
    const curve=(f,col,w,dash,lbl)=>{const d=pathFn(u=>(44-Math.min(44,f(2+16*u)))/(44-13),L.x,L.x+L.w,L.y,L.y+L.h,80);
      return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};${dash?'stroke-dasharray:'+dash:''}"/>`+kitLabel(L.lx,Y(Math.min(43.4,f(18)))+3,lbl)};
    g+=curve(CH_P85,'var(--muted)',1.4,'4 3','85th')+curve(CH_P95,'var(--ink)',2,'','95th')+curve(p120,'var(--accent)',1.8,'','120% of 95th')+curve(p140,'var(--hl)',1.6,'6 3','140% of 95th');
    /* the child's line */
    let d='';const n=Math.max(2,Math.round((a-3)*8));for(let i=0;i<=n;i++){const v=3+(a-3)*i/n;d+=(i?'L':'M')+f1(X(v))+' '+f1(Y(chBmi(v,CH_S(v))))}
    g+=`<path d="${d}" style="fill:none;stroke:var(--life);stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round"/>`;
    const cx=X(a),cy=Y(chBmi(a,s));
    g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="6.5" style="fill:var(--life);stroke:var(--panel);stroke-width:2.5"/>`;
    /* crossing markers */
    [[0,'85th'],[1,'95th'],[2,'120%']].forEach(([lv,lb])=>{if(s<lv)return;let lo=3,hi=a;for(let k=0;k<24;k++){const m=(lo+hi)/2;if(CH_S(m)<lv)lo=m;else hi=m}
      const px=X(hi),py=Y(chBmi(hi,lv));g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="4" style="fill:var(--panel);stroke:var(--life);stroke-width:2"/>`});
    /* a growing child in the empty upper-left of the chart: same figure, same body size, only height changes with age */
    const ph=lerp(64,112,ramp(a,3,18)),px0=L.x+(N?34:40);
    g+=person(px0,L.y+L.h*.62-ph,ph,{kid:a<11,size:.45}).svg;
    g+=`<text x="${px0+(N?40:46)}" y="${L.y+30}" class="t-big" style="font-size:24px">Age ${a.toFixed(1)}</text>`;
    /* options panel */
    const zone=s<0?0:s<1?1:s<2?2:3;
    g+=`<text x="${L.ox}" y="${L.oy-12}" class="t-sm" style="fill:var(--ink);font-weight:700">AAP 2023 options, as published</text>`;
    CH_OPTS.forEach((o,i)=>{const on=o.ok(a,s),y=L.oy+i*(L.oh+L.og);
      g+=`<rect x="${L.ox}" y="${y}" width="${L.ow}" height="${L.oh}" rx="10" style="fill:${on?'var(--life-soft)':'var(--panel)'};stroke:${on?'var(--life)':'var(--line)'};stroke-width:${on?2:1.2};${on?'':'stroke-dasharray:5 4'}"/>`;
      g+=on?`<path d="M${L.ox+12} ${y+L.oh/2}l5 5 9-11" style="fill:none;stroke:var(--life);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`:`<circle cx="${L.ox+19}" cy="${y+L.oh/2}" r="6" style="fill:none;stroke:var(--muted);stroke-width:1.5"/>`;
      g+=`<text x="${L.ox+36}" y="${y+L.oh/2-5}" class="t-sm" style="fill:var(--ink);font-weight:700">${o.n}</text><text x="${L.ox+36}" y="${y+L.oh/2+11}" class="t-xs">${on?o.d:'waits for: '+o.w}</text>`});
    g+=`<text x="${N?L.ox:L.x}" y="${L.sy}" class="t-xs" style="fill:var(--ink);font-weight:700">Now: ${CH_ZONE[zone]}</text>`;
    svg.innerHTML=g;
    const p=phaseOf(CH_STEPS,t);note.innerHTML=noteHTML(CH_STEPS[p]);setA&&setA(p);
  }
  const stop=playWire(rg,$('#chPlay'),draw,15000,'%t:player.replay%','children');
  setA=stepWire($('#chSteps'),CH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- STEP TEENS ---------- */
  const tsv=$('#chTeen'),trg=$('#chTeenT'),tnote=$('#chTeenNote');
  const at=(P,w)=>{if(w<=P[0][0])return P[0][1];for(let i=1;i<P.length;i++)if(w<=P[i][0])return lerp(P[i-1][1],P[i][1],(w-P[i-1][0])/(P[i][0]-P[i-1][0]));return P[P.length-1][1]};
  function drawTeen(t){
    const N=vb(tsv,'720 320','400 560');
    const L=N?{x:52,y:44,w:320,h:220,ax:40,ay:356,gap:180}:{x:60,y:40,w:370,h:220,ax:470,ay:70,gap:130};
    const wk=75*t,ax=curveAxes(L.x,L.y,L.w,L.h,{x0:0,x1:75,y0:-20,y1:5,xt:[0,20,40,60,75],yt:[-20,-15,-10,-5,0,5],yfmt:v=>(v>0?'+':'')+v+'%',xlabel:'weeks',ylabel:'mean BMI change from baseline'});
    let g=ax.svg;const X=ax.X,Y=ax.Y;
    g+=`<rect x="${f1(X(68))}" y="${L.y}" width="${f1(X(75)-X(68))}" height="${L.h}" style="fill:var(--warn-soft);opacity:.8"/><line x1="${f1(X(68))}" x2="${f1(X(68))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    g+=kitLabel(X(68)-4,L.y+14,'treatment stops, week 68',{a:'e'});
    g+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" style="stroke:var(--muted);stroke-width:1"/>`;
    const line=(P,col,dash)=>{let d='';const n=60;for(let i=0;i<=n;i++){const w=wk*i/n;d+=(i?'L':'M')+f1(X(w))+' '+f1(Y(at(P,w)))}return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:3;stroke-linejoin:round;${dash?'stroke-dasharray:'+dash:''}"/>`};
    g+=line(CH_ST.plac,'var(--muted)','6 4')+line(CH_ST.sema,'var(--rx-drug)','');
    [['sema','var(--rx-drug)',v=>v.toFixed(1)+'%',14],['plac','var(--muted)',v=>'+'+v.toFixed(1)+'%',-8]].forEach(([k,col,fm,dy])=>{
      CH_ST[k].slice(1).forEach(p=>{if(wk<p[0]-.01)return;g+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="4.5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`+kitLabel(X(p[0])-(p[0]===68?8:-6),Y(p[1])+dy,fm(p[1]),{a:p[0]===68?'e':''})});
      const e=at(CH_ST[k],wk);g+=`<circle cx="${f1(X(wk))}" cy="${f1(Y(e))}" r="3.5" style="fill:${col}"/>`});
    g+=kitLabel(X(6),Y(-4),'semaglutide')+kitLabel(X(6),Y(2.6),'placebo');
    /* who lost 5% or more by week 68 */
    const rev=ramp(wk,56,68);
    g+=`<text x="${L.ax}" y="${L.ay-26}" class="t-sm" style="fill:var(--ink);font-weight:700">Lost 5% or more of body weight by week 68</text>`;
    [['Semaglutide',73,'var(--rx-drug)'],['Placebo',18,'var(--muted)']].forEach(([nm,k,col],i)=>{const x=L.ax+i*L.gap;
      const ia=iconArray(x,L.ay,{n:100,cols:10,size:9,gap:2,shape:'dot',k:Math.round(k*rev),col,base:'var(--line)'});
      g+=`<text x="${x}" y="${L.ay-8}" class="t-xs" style="fill:var(--ink);font-weight:700">${nm}: ${Math.round(k*rev)} in 100</text>`+ia.svg});
    tsv.innerHTML=g;
    tnote.innerHTML=noteHTML(CH_ST_STEPS[phaseOf(CH_ST_STEPS,t)]);
  }
  playWire(trg,$('#chTeenPlay'),drawTeen,9000,'%t:player.replay%','children');
  drawTeen(+trg.value);

  /* ---------- comparator ---------- */
  const csv=$('#chCmp'),cb=$('#chCmpBtns'),cnote=$('#chCmpNote');let ci=0,stopC=null,cp=1;
  cb.innerHTML=CH_CMP.map((c,i)=>`<button class="btn" data-cv="${i}" aria-pressed="${i===0}">${c.b}</button>`).join('');
  function drawCmp(){
    const N=vb(csv,'720 300','400 420'),c=CH_CMP[ci];
    const L=N?{lx:20,bx:20,bw:300,y0:52,rh:c.rows.length>3?66:90,ly:-6,bh:16}:{lx:20,bx:270,bw:360,y0:56,rh:c.rows.length>3?46:70,ly:12,bh:18};
    const X=v=>L.bx+L.bw*(v-c.min)/(c.max-c.min),x0=X(0);
    let g=`<text x="20" y="22" class="t-sm" style="fill:var(--ink);font-weight:700">${c.h}</text>`;
    if(c.pair)g+=`<rect x="${N?20:L.bx}" y="32" width="12" height="8" style="fill:var(--life)"/><text x="${(N?20:L.bx)+16}" y="40" class="t-xs">adolescents</text><rect x="${(N?20:L.bx)+100}" y="32" width="12" height="8" style="fill:none;stroke:var(--ink);stroke-width:1.2"/><text x="${(N?20:L.bx)+116}" y="40" class="t-xs">adults</text>`;
    if(c.min<0)g+=`<line x1="${f1(x0)}" x2="${f1(x0)}" y1="44" y2="${L.y0+c.rows.length*L.rh-10}" style="stroke:var(--ink);stroke-width:1.2"/>`+kitLabel(x0,44,'0',{a:'m'});
    c.rows.forEach((r,i)=>{const y=L.y0+i*L.rh,by=N?y+4:y;
      g+=`<text x="${L.lx}" y="${N?y+L.ly:by+L.ly+(c.pair?4:0)}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text>`;
      g+=`<rect x="${L.bx}" y="${by}" width="${L.bw}" height="${L.bh}" rx="4" style="fill:var(--panel-2)"/>`;
      const v=r.v*cp,a=Math.min(X(0),X(v)),w=Math.abs(X(v)-X(0));
      if(r.lo!=null){const lo=X(r.lo*cp);g+=`<rect x="${f1(x0)}" y="${by}" width="${f1(Math.max(0,lo-x0))}" height="${L.bh}" rx="4" style="fill:var(--life);opacity:.45"/><rect x="${f1(lo)}" y="${by}" width="${f1(Math.max(0,X(v)-lo))}" height="${L.bh}" rx="4" style="fill:var(--life)"/>`}
      else g+=`<rect x="${f1(a)}" y="${by}" width="${f1(Math.max(2,w))}" height="${L.bh}" rx="4" style="fill:${r.v<0?'var(--tx)':'var(--life)'}"/>`;
      const lab=r.l||(Math.round(r.v)+(c.u));
      g+=`<text x="${f1(r.v<0?x0+6:X(v)+6)}" y="${by+L.bh-4}" class="t-xs" style="fill:var(--ink);font-weight:700">${cp>.98?lab:''}</text>`;
      if(c.pair){const yb=by+L.bh+4;g+=`<rect x="${L.bx}" y="${yb}" width="${f1(Math.max(2,X(r.w*cp)-L.bx))}" height="${L.bh-4}" rx="3" style="fill:none;stroke:var(--ink);stroke-width:1.3"/><text x="${f1(X(r.w*cp)+6)}" y="${yb+L.bh-7}" class="t-xs">${cp>.98?r.w+'%':''}</text>`}
    });
    csv.innerHTML=g;
    cnote.innerHTML=noteHTML({k:c.k,t:c.t,txt:c.txt});
  }
  cb.addEventListener('click',e=>{const b=e.target.closest('[data-cv]');if(!b)return;ci=+b.dataset.cv;$$('[data-cv]',cb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    stopC&&stopC();stopC=animate(650,p=>{cp=ease(p);drawCmp()},()=>{stopC=null;cp=1;drawCmp()})});
  drawCmp();
  const prevR=redraws.children;redraws.children=()=>{prevR&&prevR();drawCmp()};
  const prevH=onHide.children;onHide.children=()=>{prevH&&prevH();stopC&&stopC();stopC=null;cp=1};
};
