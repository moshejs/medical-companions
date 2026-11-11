/* =============== 3.5 side effects, safety & stopping =============== */
/* Main player: 120 weeks of one trial group. The Wegovy label's dose steps run along the bottom, a schematic curve of
   new stomach and gut symptoms peaks during the escalation and settles, and the weight-change line is drawn through the
   STEP 1 extension's published points (week 0, 68 and 120; the shape between them is schematic). A spotlight panel on
   the right changes with each step: GI rates, gallbladder, pancreatitis, the thyroid boxed warning, anaesthesia, lean
   mass, stopping. Numbers from the research pass; the curve shapes are illustrative. */
const SE_WK=120,SE_STOPW=68;
const SE_STEPS=[
 {from:0,at:.1,k:'Weeks 0–20 · the dose steps',t:'Stomach and gut effects',
  txt:'In the Wegovy label\'s pooled adult weight trials (2116 people on semaglutide 2.4 mg, 1261 on placebo), nausea affected 44% vs 16%, diarrhoea 30% vs 16%, vomiting 24% vs 6% and constipation 24% vs 11%; 6.8% vs 3.2% stopped because of adverse reactions. [[FDA-Wegovy]] Across STEP 1–3, GI events were most frequent during or shortly after dose escalation; 99.5% were non-serious and 98.1% mild to moderate. Weight loss was similar in people with and without GI events, so it is not simply the result of feeling sick. [[Wharton2022GItolerability]]',
  pt:'Feeling sick, loose stools or constipation are common, mostly early on and when the dose goes up, and they usually settle. [[Wharton2022GItolerability]]',
  hook:'Wegovy label: nausea 44% vs 16% on placebo; most GI events come during or just after dose escalation. [[FDA-Wegovy,Wharton2022GItolerability]]'},
 {from:.18,at:.25,k:'Any time on treatment',t:'Gallbladder',
  txt:'In the Wegovy adult trials, gallstones (cholelithiasis) occurred in 1.6% on the injection vs 0.7% on placebo, and cholecystitis in 0.6% vs 0.2%. In adolescents, gallstones occurred in 3.8% vs 0%, and the label says acute gallbladder disease was more common than placebo even after accounting for the degree of weight loss. [[FDA-Wegovy]] A meta-analysis of 76 trials (103,371 patients) linked GLP-1 receptor agonists to more gallbladder or biliary disease (RR 1.37), and more so in weight-loss trials (RR 2.29), at higher doses and with longer use. [[He2022Gallbladder]]',
  pt:'Gallstones are a little more common on these medicines, especially at the higher doses used for weight loss. [[He2022Gallbladder]]',
  hook:'GLP-1 receptor agonists and gallbladder disease: RR 2.29 in weight-loss trials. [[He2022Gallbladder]]'},
 {from:.3,at:.35,k:'Rare',t:'Pancreatitis',
  txt:'Adjudicated acute pancreatitis was uncommon: 4 cases on Wegovy (0.2 per 100 patient-years) vs 1 on placebo, and 9 of 3291 (0.3%) on Saxenda. The labels say to stop the drug if pancreatitis is suspected. [[FDA-Wegovy,FDA-Saxenda]] In the Zepbound sleep apnoea studies the rate was 0.84 patients per 100 years vs 0 on placebo. [[FDA-Zepbound]] A meta-analysis of 21 cardiovascular outcome trials (99,599 patients) found no difference in pancreatitis. [[Galli2025]]',
  pt:'Inflammation of the pancreas is rare. Severe stomach pain that does not go away, sometimes spreading to the back, needs urgent medical review. [[FDA-Wegovy]]',
  hook:'Suspected pancreatitis: the labels say stop the drug. [[FDA-Wegovy,FDA-Saxenda]]'},
 {from:.4,at:.45,k:'Boxed warning',t:'Thyroid C-cell tumours',
  txt:'Wegovy, Zepbound and Saxenda carry a boxed warning: semaglutide, tirzepatide and liraglutide caused thyroid C-cell tumours in rodents, and human relevance "has not been determined". All are contraindicated with a personal or family history of medullary thyroid carcinoma (MTC) or multiple endocrine neoplasia type 2 (MEN 2). [[FDA-Wegovy,FDA-Zepbound,FDA-Saxenda]] Routine calcitonin or thyroid ultrasound monitoring is "of uncertain value"; patients are counselled about a neck mass, trouble swallowing, shortness of breath or persistent hoarseness. [[FDA-Wegovy]] In a Scandinavian cohort of 145,410 GLP-1 receptor agonist users, the thyroid cancer HR was 0.93 (95% CI 0.66–1.31). [[Pasternak2024Thyroid]]',
  pt:'The warning comes from studies in rats and mice. Large human studies so far have not shown a clear rise in thyroid cancer, though follow-up is still short. [[Pasternak2024Thyroid,Ko2026Cancer]]',
  hook:'Boxed warning: rodent thyroid C-cell tumours; contraindicated with a personal or family history of MTC or MEN 2. [[FDA-Wegovy]]'},
 {from:.5,at:.54,k:'Before a procedure',t:'Anaesthesia and aspiration',
  txt:'Semaglutide delays gastric emptying. [[FDA-Wegovy]] The Wegovy label describes rare postmarketing reports of pulmonary aspiration under general anaesthesia or deep sedation in people taking GLP-1 receptor agonists who had food left in the stomach despite fasting. It says the data are insufficient to recommend holding the drug or changing fasting, and that patients should tell their care team before any procedure. [[FDA-Wegovy]] Slower emptying is also why Zepbound can reduce the effect of oral hormonal contraceptives. [[FDA-Zepbound]]',
  pt:'If you are having surgery or a scope, tell the team that you take one of these medicines. [[FDA-Wegovy]]',
  hook:'Aspiration under anaesthesia: food may remain in the stomach despite fasting. [[FDA-Wegovy]]'},
 {from:.56,at:.61,k:'Week 68 · body composition',t:'Lean mass share of loss',
  txt:'Weight lost includes some lean mass. In the SURMOUNT-1 DXA substudy (160 people), about 75% of the weight lost on tirzepatide was fat and 25% lean mass, the same proportions as with placebo. [[Look2025SURMOUNT1DXA]] Across GLP-1-based trials the lean share has ranged from about 15% or less to 40–60%. "Lean mass" includes organs, bone and water as well as muscle, and MRI studies suggest the muscle changes may be adaptive, with better muscle quality. <span class="ev early">Early evidence</span> [[Neeland2024LeanMass]]',
  pt:'Some of the weight lost is muscle and other lean tissue, so ways to protect muscle are worth discussing with a clinician. [[Neeland2024LeanMass]]',
  hook:'SURMOUNT-1 DXA: about 75% fat and 25% lean of the weight lost, as with placebo. [[Look2025SURMOUNT1DXA]]'},
 {from:.62,at:.96,k:'Weeks 68–120 · treatment stopped',t:'Stopping and regain',
  txt:'In the STEP 1 extension all treatment, including lifestyle support, stopped at week 68. People who had lost 17.3% regained 11.6 percentage points by week 120, "two-thirds of their prior weight loss", and most cardiometabolic gains reverted towards baseline; the authors say this confirms the chronicity of obesity. [[Wilding2022STEP1ext]] In STEP 4, switching to placebo led to +6.9% vs −7.9% for those who continued; [[Rubino2021STEP4]] in SURMOUNT-4, +14.0% vs −5.5%. [[Aronne2024SURMOUNT4]] Across 37 studies, weight returned at about 0.4 kg a month after any weight-management medicine stopped. [[West2026BMJ]]',
  pt:'Obesity is a long-term condition. When the medicine stops, the body tends to regain weight. This is biology, not failure. [[Wilding2022STEP1ext,Aronne2024SURMOUNT4]]',
  hook:'STEP 1 extension: two-thirds of the weight lost came back within a year of stopping. [[Wilding2022STEP1ext]]'}
];
/* weight change, % from week 0: published points at 0, 68 and 120 [[Wilding2022STEP1ext]]; the points between are schematic */
const SE_WSEM=[[0,0],[8,-3],[20,-8.5],[36,-13.5],[52,-16.3],[68,-17.3],[80,-14.6],[96,-10],[120,-5.6]];
const SE_WPLC=[[0,0],[20,-1.6],[44,-2.1],[68,-2.0],[94,-1],[120,-.1]];
const SE_WPUB=[[0,0],[68,-17.3],[120,-5.6]],SE_WPUBP=[[68,-2.0],[120,-.1]];
/* Wegovy label dose steps, mg weekly [[FDA-Wegovy]]; stopped at week 68 as in the STEP 1 extension */
const SE_DOSE=[[0,.25],[4,.5],[8,1],[12,1.7],[16,2.4],[68,0]];
/* pooled label rates, % (semaglutide 2.4 mg, placebo) [[FDA-Wegovy]] */
const SE_GI=[['nausea',44,16],['diarrhoea',30,16],['vomiting',24,6],['constipation',24,11]];
const SE_L={wt:'weight change, % from week 0',gi:'new stomach and gut symptoms (schematic shape)',dose:'label dose steps, mg weekly',
  wk:'week',on:'on semaglutide 2.4 mg',esc:'dose escalation',stopped:'treatment stopped',sem:'semaglutide group',plc:'placebo group',
  pooled:'pooled label data, adults, %',drug:'2.4 mg',pl:'placebo',
  gb:'gallstones (adults, injection)',gb2:'gallstones (adolescents)',gb3:'RR in weight-loss trials',gbl:'gallbladder',
  pan:'pancreas',pan1:'cases on Wegovy (1 on placebo)',pan2:'per 100 patient-years',pan3:'urgent: severe pain that does not settle',
  box:'BOXED WARNING',th1:'rodents: C-cell tumours',th2:'humans: relevance not determined',th3:'contraindicated with a personal',th4:'or family history of MTC or MEN 2',th5:'C cells',thy:'thyroid',
  an1:'food left in the stomach',an2:'despite fasting',an3:'aspiration risk',an4:'tell the team before any procedure',airway:'airway',
  ln1:'of the weight lost (SURMOUNT-1 DXA)',fat:'fat',lean:'lean',ln2:'lean share across trials',ln3:'≤15%',ln4:'40–60%',
  st1:'randomised to continue or stop',cont:'continued',swp:'switched to placebo',st2:'regain after any medicine stops',st3:'0.4 kg a month (37 studies)',
  pub:'published point',sch:'shape between points schematic'};

/* the adverse-event comparator: label (or trial) rates, % */
const SE_AE=[
 {id:'weg',n:'Wegovy',g:'semaglutide 2.4 mg weekly',arms:['placebo','2.4 mg'],
  rows:[['nausea',[16,44]],['diarrhoea',[16,30]],['vomiting',[6,24]],['constipation',[11,24]],['abdominal pain',[10,20]],['hair loss',[1,3]],['stopped: adverse reaction',[3.2,6.8]]],
  src:'Wegovy label, pooled adult weight trials (n=2116 vs 1261)',
  note:'Nausea (1.8% vs 0.2%) and vomiting (1.2% vs 0%) were the commonest reasons for stopping. The label also warns of severe GI reactions, does not recommend Wegovy in severe gastroparesis, and warns of acute kidney injury from fluid loss. [[FDA-Wegovy]] Resting heart rate rose 1–4 beats per minute on average. [[FDA-Wegovy]]'},
 {id:'zep',n:'Zepbound',g:'tirzepatide weekly',arms:['placebo','5 mg','10 mg','15 mg'],
  rows:[['nausea',[8,25,29,28]],['diarrhoea',[8,19,21,23]],['vomiting',[2,8,11,13]],['constipation',[5,17,14,11]],['hair loss',[1,5,4,5]],['stopped: adverse event',[2.6,4.3,7.1,6.2]]],
  src:'Zepbound label, Studies 1–2; stopping from SURMOUNT-1',
  note:'Symptom rates are from the label. [[FDA-Zepbound]] The last row is from the SURMOUNT-1 paper: 4.3%, 7.1% and 6.2% stopped because of adverse events vs 2.6% on placebo. [[Jastreboff2022SURMOUNT1]] Zepbound can reduce the effect of oral contraceptives; the label advises a non-oral method, or adding a barrier method for 4 weeks after starting and after each dose increase. [[FDA-Zepbound]]'},
 {id:'sax',n:'Saxenda',g:'liraglutide 3.0 mg daily',arms:['placebo','3.0 mg'],
  rows:[['nausea',[13.8,39.3]],['diarrhoea',[9.9,20.9]],['constipation',[8.5,19.4]],['vomiting',[3.9,15.7]]],
  src:'Saxenda label (n=3384 vs 1941)',
  note:'Rates as given in the Saxenda label; adjudicated acute pancreatitis occurred in 9 of 3291 (0.3%). [[FDA-Saxenda]]'},
 {id:'qsy',n:'Qsymia',g:'phentermine–topiramate ER',arms:['placebo','3.75/23','7.5/46','15/92'],
  rows:[['paraesthesia (tingling)',[2,4,14,20]],['dry mouth',[3,7,14,19]],['constipation',[6,8,15,16]],['dysgeusia (altered taste)',[1,1,7,9]]],
  src:'Qsymia label, by dose',
  note:'A different profile: tingling, dry mouth and altered taste rise with the dose. [[FDA-Qsymia]] In CONQUER, depression-related events were 4%, 4% and 7% and anxiety-related events 3%, 5% and 8% (placebo, 7.5/46, 15/92 mg). [[Gadde2011CONQUER]] Qsymia is contraindicated in pregnancy. [[FDA-Qsymia]]'},
 {id:'con',n:'Contrave',g:'naltrexone–bupropion ER',arms:['placebo','32/360 mg'],
  rows:[['nausea',[5.3,29.8]]],
  src:'COR-I trial (the label\'s own table is not in this guide\'s sources)',
  note:'Nausea is from the COR-I trial: 29.8% vs 5.3%. Blood pressure rose about 1.5 mm Hg at first and later fell about 1 mm Hg below baseline. [[Greenway2010CORI]] The label warns that Contrave can raise blood pressure or heart rate, especially in the first 3 months, and carries a boxed warning on suicidal thoughts and behaviours. [[FDA-Contrave]]'}
];

inits.sideeffects=()=>{
  const T=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  /* schematic GI-symptom curve: a bump after each dose step, settling after escalation; zero once treatment stops */
  const giF=w=>{if(w<0||w>SE_STOPW)return 0;let v=.06+.2*Math.exp(-Math.max(0,w-18)/9);[0,4,8,12,16].forEach((s,k)=>{v+=(.42+.12*k)*Math.exp(-Math.pow(w-s-1.6,2)/(2*1.5*1.5))});return v};
  const GI_MAX=(()=>{let m=0;for(let w=0;w<=SE_STOPW;w+=.25)m=Math.max(m,giF(w));return m})();
  const GI_CUM=[];{let a=0;for(let i=0;i<=SE_STOPW*4;i++){a+=giF(i/4);GI_CUM.push(a)}}
  const giCum=w=>GI_CUM[Math.round(clamp(w,0,SE_STOPW)*4)]/GI_CUM[GI_CUM.length-1];
  const fW=monoFn(SE_WSEM),fP=monoFn(SE_WPLC);
  const doseAt=w=>{let d=0;SE_DOSE.forEach(p=>{if(w>=p[0])d=p[1]});return d};
  /* ---- spotlight panels: (x,y,w,h,u) ---- */
  const bar=(x,y,w,v,max,col,h=10)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w*v/max))}" height="${h}" rx="3" style="fill:${col}"/>`;
  function spGI(x,y,w,h,u,wk){const F=giCum(wk),Fp=clamp(wk/SE_STOPW);let s=T(x,y+16,SE_L.pooled,'t-xs','fill:var(--ink);font-weight:700');
    const bx=x+86,bw=w-130;
    SE_GI.forEach((r,i)=>{const yy=y+38+i*44;s+=T(x,yy+10,r[0],'t-sm','fill:var(--ink)');
      s+=bar(bx,yy,bw,r[1]*F,50,'var(--rx-drug)')+T(bx+bw+6,yy+9,Math.round(r[1]*F)+'%','t-xs','fill:var(--ink);font-weight:700');
      s+=bar(bx,yy+14,bw,r[2]*Fp,50,'var(--figure)',8)+T(bx+bw+6,yy+22,Math.round(r[2]*Fp)+'%','t-xs')});
    const ly=y+38+4*44+6;
    s+=`<rect x="${f1(x)}" y="${f1(ly)}" width="10" height="10" rx="2" style="fill:var(--rx-drug)"/>`+T(x+14,ly+9,SE_L.drug,'t-xs')+`<rect x="${f1(x+70)}" y="${f1(ly)}" width="10" height="10" rx="2" style="fill:var(--figure)"/>`+T(x+84,ly+9,SE_L.pl,'t-xs');
    return s}
  function spGB(x,y,w,h,u){let s='';const lv=liver(x+8,y+14,1.1,{});s+=lv.svg;
    const g=[lv.at.hilum[0]+8,lv.at.hilum[1]+22];
    s+=`<ellipse cx="${f1(g[0])}" cy="${f1(g[1])}" rx="13" ry="20" transform="rotate(-30 ${f1(g[0])} ${f1(g[1])})" style="fill:var(--life);fill-opacity:.35;stroke:var(--life);stroke-width:1.6"/>`;
    s+=`<path d="M${f1(g[0]+6)} ${f1(g[1]-16)}Q${f1(g[0]+10)} ${f1(g[1]-30)} ${f1(lv.at.hilum[0])} ${f1(lv.at.hilum[1])}" style="fill:none;stroke:var(--life);stroke-width:2"/>`;
    [[-4,6],[3,10],[-1,0]].forEach((p,k)=>{const q=ramp(u,.2+k*.15,.4+k*.15);if(q>0)s+=`<circle cx="${f1(g[0]+p[0])}" cy="${f1(g[1]+p[1])}" r="${f1(3.4*q)}" style="fill:var(--device);stroke:var(--panel);stroke-width:1"/>`});
    s+=kitLabel(g[0]+18,g[1]+34,SE_L.gbl,{});
    const rows=[['1.6% vs 0.7%',SE_L.gb],['3.8% vs 0%',SE_L.gb2],['RR 2.29',SE_L.gb3]];
    rows.forEach((r,i)=>{const yy=y+164+i*40,op=ramp(u,.15+i*.2,.35+i*.2);s+=`<g style="opacity:${f1(.15+.85*op)}">`+T(x,yy,r[0],'t-big','font-size:19px')+T(x,yy+15,r[1],'t-xs')+'</g>'});
    return s}
  function spPan(x,y,w,h,u){let s='';const P=[[0,26],[30,16],[80,12],[130,4],[160,0],[164,14],[130,24],[80,34],[30,40],[4,42]].map(p=>[x+16+p[0]*.95,y+40+p[1]*1.1]);
    const glow=.25+.25*Math.sin(u*Math.PI*6);
    s+=`<path d="${smoothPath(P)}" style="fill:var(--cyto);stroke:var(--gut-line);stroke-width:1.4"/><path d="${smoothPath(P)}" style="fill:var(--risk);opacity:${f1(glow*ramp(u,.1,.3))}"/>`;
    s+=`<path d="${smoothPath([[x+30,y+20],[x+8,y+40],[x+10,y+72],[x+34,y+86]],false)}" style="fill:none;stroke:var(--gut-line);stroke-width:9;stroke-linecap:round;opacity:.55"/>`;
    s+=kitLabel(x+110,y+34,SE_L.pan,{a:'m'});
    s+=`<g style="opacity:${f1(.15+.85*ramp(u,.15,.4))}">`+T(x,y+128,'4','t-big','font-size:26px')+T(x+24,y+124,SE_L.pan1,'t-xs')+'</g>';
    s+=`<g style="opacity:${f1(.15+.85*ramp(u,.35,.6))}">`+T(x,y+168,'0.2','t-big','font-size:26px')+T(x+44,y+164,SE_L.pan2,'t-xs')+'</g>';
    s+=`<rect x="${f1(x)}" y="${f1(y+192)}" width="${f1(w-6)}" height="28" rx="6" style="fill:none;stroke:var(--risk);stroke-width:1.6;opacity:${f1(ramp(u,.5,.7))}"/>`+T(x+8,y+210,SE_L.pan3,'t-xs','fill:var(--ink);font-weight:700;opacity:'+f1(ramp(u,.5,.7)));
    return s}
  function spThy(x,y,w,h,u){let s='';const cx=x+70,cy=y+70;
    /* butterfly thyroid on the trachea */
    s+=`<rect x="${f1(cx-8)}" y="${f1(cy-56)}" width="16" height="112" rx="7" style="fill:var(--panel-2);stroke:var(--device);stroke-width:1"/>`;
    [-1,1].forEach(sg=>{s+=`<path d="${blob(cx+sg*22,cy+4,24,sg>0?3:5,{rough:.08,sq:1.45})}" style="fill:var(--lean);fill-opacity:.5;stroke:var(--lean);stroke-width:1.4"/>`});
    s+=`<rect x="${f1(cx-12)}" y="${f1(cy+10)}" width="24" height="10" rx="4" style="fill:var(--lean);fill-opacity:.5"/>`;
    const rr=rng(21),c=ramp(u,.1,.5);for(let i=0;i<14;i++){const sg=i%2?1:-1,a=rr()*6.28,d=rr()*16;const px=cx+sg*22+Math.cos(a)*d*.8,py=cy+4+Math.sin(a)*d*1.3;
      s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(1.8+1.6*c)}" style="fill:var(--rx-drug);opacity:${f1(.35+.6*c)}"/>`}
    s+=kitLabel(cx+52,cy-34,SE_L.thy,{})+kitLabel(cx+52,cy-20,SE_L.th5,{});
    const bx=x,by=y+150,bw=w-6,o=ramp(u,.25,.5);
    s+=`<g style="opacity:${f1(.1+.9*o)}"><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="96" style="fill:none;stroke:var(--ink);stroke-width:2.4"/>`+
      T(bx+10,by+18,SE_L.box,'t-xs','fill:var(--ink);font-weight:700;letter-spacing:.1em')+T(bx+10,by+38,SE_L.th1,'t-xs','fill:var(--ink)')+T(bx+10,by+54,SE_L.th2,'t-xs','fill:var(--ink)')+
      T(bx+10,by+72,SE_L.th3,'t-xs')+T(bx+10,by+86,SE_L.th4,'t-xs')+'</g>';
    return s}
  function spAn(x,y,w,h,u){let s='';const st=stomach(x+40,y+50,1.1,{fill:.25+.4*ramp(u,0,.6),labels:false});s+=st.svg;
    /* airway beside the oesophagus */
    const ax=x+30;s+=`<path d="M${f1(ax)} ${f1(y+10)}L${f1(ax)} ${f1(y+70)}" style="stroke:var(--device);stroke-width:10;stroke-linecap:round;opacity:.45"/>`+T(ax+10,y+14,SE_L.airway,'t-xs');
    const q=ramp(u,.4,.9);if(q>0){const e=st.at.eso;s+=`<path d="M${f1(e[0])} ${f1(e[1]+10)}Q${f1(e[0]-10)} ${f1(y+10)} ${f1(ax+6)} ${f1(y+40)}" style="fill:none;stroke:var(--risk);stroke-width:2;stroke-dasharray:4 3;opacity:${f1(q)}" marker-end="url(#seArR)"/>`;
      s+=kitLabel(ax+12,y+86,SE_L.an3,{})}
    s+=T(x,y+222,SE_L.an1,'t-sm','fill:var(--ink)')+T(x,y+238,SE_L.an2,'t-sm','fill:var(--ink)');
    s+=`<rect x="${f1(x)}" y="${f1(y+252)}" width="${f1(w-6)}" height="26" rx="6" style="fill:none;stroke:var(--tx);stroke-width:1.4"/>`+T(x+8,y+269,SE_L.an4,'t-xs','fill:var(--ink);font-weight:700');
    return s}
  function spLean(x,y,w,h,u){let s='';const bw=w-10,g=ease(ramp(u,0,.6));
    s+=T(x,y+28,'25%','t-big','font-size:30px;fill:var(--ink)')+T(x+66,y+24,SE_L.lean,'t-sm','fill:var(--ink)')+T(x,y+46,SE_L.ln1,'t-xs');
    const by=y+62;s+=`<rect x="${f1(x)}" y="${f1(by)}" width="${f1(bw)}" height="26" rx="5" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(by)}" width="${f1(bw*.75*g)}" height="26" rx="5" style="fill:var(--fat)"/><rect x="${f1(x+bw*.75*g)}" y="${f1(by)}" width="${f1(bw*.25*g)}" height="26" rx="5" style="fill:var(--lean)"/>`;
    if(g>.5)s+=kitLabel(x+bw*.36,by+17,SE_L.fat+' 75%',{a:'m'})+kitLabel(x+bw*.875,by+17,SE_L.lean,{a:'m'});
    /* the range across trials */
    const ry=y+150,o=ramp(u,.45,.8),X=v=>x+bw*v/100;
    s+=`<g style="opacity:${f1(.12+.88*o)}">`+T(x,ry-22,SE_L.ln2,'t-xs','fill:var(--ink);font-weight:700');
    s+=`<line x1="${f1(X(0))}" x2="${f1(X(100))}" y1="${ry}" y2="${ry}" class="axis"/>`;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ry-3}" y2="${ry+3}" class="axis"/>`+T(X(v),ry+16,v+'%','t-xs t-mid')});
    s+=`<rect x="${f1(X(0))}" y="${ry-7}" width="${f1(X(15)-X(0))}" height="14" rx="3" style="fill:var(--lean);opacity:.45"/><rect x="${f1(X(40))}" y="${ry-7}" width="${f1(X(60)-X(40))}" height="14" rx="3" style="fill:var(--lean);opacity:.45"/>`;
    s+=`<circle cx="${f1(X(25))}" cy="${ry}" r="5" style="fill:var(--lean);stroke:var(--panel);stroke-width:2"/>`;
    s+=T(X(7.5),ry+32,SE_L.ln3,'t-xs t-mid')+T(X(50),ry+32,SE_L.ln4,'t-xs t-mid')+'</g>';
    return s}
  function spStop(x,y,w,h,u){let s='';const g=ease(ramp(u,.05,.5)),c=x+w*.46,sc=(w*.46-10)/15;
    s+=T(x,y+14,SE_L.st1,'t-xs','fill:var(--ink);font-weight:700');
    const D=[['STEP 4 (from week 20)',-7.9,6.9],['SURMOUNT-4 (from week 36)',-5.5,14.0]];
    D.forEach((d,i)=>{const yy=y+40+i*76;s+=T(x,yy,d[0],'t-xs');
      s+=`<line x1="${f1(c)}" x2="${f1(c)}" y1="${yy+6}" y2="${yy+52}" class="axis"/>`;
      const a=d[1]*g,b=d[2]*g;
      s+=`<rect x="${f1(c+a*sc)}" y="${yy+10}" width="${f1(-a*sc)}" height="15" rx="3" style="fill:var(--rx-drug)"/>`+T(c+a*sc-4,yy+22,f1(a)+'%','t-xs t-end','fill:var(--ink);font-weight:700');
      s+=`<rect x="${f1(c)}" y="${yy+30}" width="${f1(b*sc)}" height="15" rx="3" style="fill:var(--figure)"/>`+T(c+b*sc+4,yy+42,'+'+f1(b)+'%','t-xs','fill:var(--ink);font-weight:700')});
    const ly=y+196;s+=`<rect x="${f1(x)}" y="${ly}" width="10" height="10" rx="2" style="fill:var(--rx-drug)"/>`+T(x+14,ly+9,SE_L.cont,'t-xs')+`<rect x="${f1(x+90)}" y="${ly}" width="10" height="10" rx="2" style="fill:var(--figure)"/>`+T(x+104,ly+9,SE_L.swp,'t-xs');
    const o=ramp(u,.5,.8);s+=`<g style="opacity:${f1(.12+.88*o)}">`+T(x,y+246,SE_L.st3,'t-big','font-size:17px')+T(x,y+262,SE_L.st2,'t-xs')+'</g>';
    return s}
  const SP=[spGI,spGB,spPan,spThy,spAn,spLean,spStop];

  const svg=$('#seSvg'),rg=$('#seT'),pb=$('#sePlay'),noteEl=$('#seNote'),stepsEl=$('#seSteps');
  let setActive=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 650');
    const wk=t*SE_WK,p=phaseOf(SE_STEPS,t),nx=SE_STEPS[p+1]?SE_STEPS[p+1].from:1.0001,u=clamp((t-SE_STEPS[p].from)/(nx-SE_STEPS[p].from));
    const L=N?{x0:44,x1:388,ay:44,ah:112,by:186,bh:46,cy:256,ch:30,ty:304,sx:14,sy:330,sw:372,sh:300}
             :{x0:52,x1:438,ay:44,ah:130,by:204,bh:52,cy:280,ch:34,ty:330,sx:472,sy:26,sw:240,sh:340};
    const X=w=>L.x0+(L.x1-L.x0)*w/SE_WK,YA=v=>L.ay+L.ah*(2-v)/22,YB=v=>L.by+L.bh-L.bh*v/GI_MAX,YC=v=>L.cy+L.ch-L.ch*v/2.4;
    let s=`<defs>${marker('seArR','var(--risk)',6)}</defs>`;
    s+=T(L.x0-38,20,`${SE_L.wk} ${Math.round(wk)}`,'t-big','font-size:18px')+T(L.x0+48,19,wk<=SE_STOPW?(wk<17?SE_L.esc:SE_L.on):SE_L.stopped,'t-sm',wk>SE_STOPW?'fill:var(--ink)':'');
    /* off-treatment shading */
    s+=`<rect x="${f1(X(SE_STOPW))}" y="${L.ay}" width="${f1(X(SE_WK)-X(SE_STOPW))}" height="${f1(L.cy+L.ch-L.ay)}" style="fill:var(--panel-2);opacity:.6"/>`;
    s+=`<rect x="${f1(X(0))}" y="${L.ay}" width="${f1(X(16)-X(0))}" height="${f1(L.cy+L.ch-L.ay)}" style="fill:var(--tx);opacity:.07"/>`;
    /* panel A: weight */
    [0,-5,-10,-15,-20].forEach(v=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(YA(v))}" y2="${f1(YA(v))}" class="grid"/>`+T(L.x0-5,YA(v)+3.5,v,'t-xs t-end')});
    s+=T(L.x0,L.ay-6,SE_L.wt,'t-xs','fill:var(--ink);font-weight:700');
    const curve=(f,col,lw,dash)=>{const P=[];for(let w=0;w<=wk;w+=1)P.push([X(w),YA(f(w))]);P.push([X(wk),YA(f(wk))]);return `<path d="${ptsD(P)}" style="fill:none;stroke:${col};stroke-width:${lw};stroke-linejoin:round${dash?';stroke-dasharray:'+dash:''}"/>`};
    s+=curve(fP,'var(--figure-line)',2,'5 4')+curve(fW,'var(--rx-drug)',3);
    SE_WPUB.forEach(q=>{if(wk>=q[0])s+=`<circle cx="${f1(X(q[0]))}" cy="${f1(YA(q[1]))}" r="4.5" style="fill:var(--rx-drug);stroke:var(--panel);stroke-width:2"/>`});
    SE_WPUBP.forEach(q=>{if(wk>=q[0])s+=`<circle cx="${f1(X(q[0]))}" cy="${f1(YA(q[1]))}" r="3.5" style="fill:var(--figure-line);stroke:var(--panel);stroke-width:1.5"/>`});
    if(wk>=SE_STOPW)s+=kitLabel(X(SE_STOPW)+6,YA(-17.3)+4,'−17.3%',{});
    if(wk>=SE_WK-.5)s+=kitLabel(X(SE_WK)-4,YA(-5.6)+18,'−5.6%',{a:'e'});
    const ey=YA(fW(wk)),rt=X(wk)>L.x1-110,lx=rt?X(wk)-6:X(wk)+6,la=rt?'t-xs t-end':'t-xs';s+=T(lx,ey+(rt?16:-8),SE_L.sem,la,'fill:var(--rx-drug);font-weight:700;opacity:'+f1(ramp(wk,4,12)));
    s+=T(lx,YA(fP(wk))+(rt?14:-6),SE_L.plc,la,'opacity:'+f1(ramp(wk,4,12)));
    /* panel B: GI symptoms */
    s+=T(L.x0,L.by-6,SE_L.gi,'t-xs','fill:var(--ink);font-weight:700');
    {const P=[];for(let w=0;w<=wk;w+=.5)P.push([X(w),YB(giF(w))]);if(P.length>1)s+=`<path d="${ptsD(P)}L${f1(P[P.length-1][0])} ${f1(YB(0))}L${f1(X(0))} ${f1(YB(0))}Z" style="fill:var(--rx-drug);opacity:.18"/><path d="${ptsD(P)}" style="fill:none;stroke:var(--rx-drug);stroke-width:2"/>`}
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(YB(0))}" y2="${f1(YB(0))}" class="axis"/>`;
    /* panel C: dose steps */
    s+=T(L.x1,L.cy-6,SE_L.dose,'t-xs t-end','fill:var(--ink);font-weight:700');
    {let d='';SE_DOSE.forEach((q,k)=>{const nxw=SE_DOSE[k+1]?SE_DOSE[k+1][0]:SE_WK;if(q[0]>wk)return;const e=Math.min(nxw,wk);d+=(d?'L':'M')+f1(X(q[0]))+' '+f1(YC(q[1]))+'L'+f1(X(e))+' '+f1(YC(q[1]))});
      s+=`<path d="${d}" style="fill:none;stroke:var(--tx);stroke-width:2.6"/>`}
    if(wk>=16)s+=T(X(16)+6,YC(2.4)+12,'2.4 mg','t-xs','fill:var(--tx);font-weight:700');
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(YC(0))}" y2="${f1(YC(0))}" class="axis"/>`;
    /* week axis and now line */
    [0,16,40,68,94,120].forEach(w=>{s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${f1(L.cy+L.ch)}" y2="${f1(L.cy+L.ch+4)}" class="axis"/>`+T(X(w),L.ty,w,'t-xs t-mid')});
    s+=T(L.x1,L.ty+14,SE_L.wk+'s','t-xs t-end');
    s+=T(X(SE_STOPW)+4,YA(-19),SE_L.stopped,'t-xs','fill:var(--ink)');
    s+=`<line x1="${f1(X(wk))}" x2="${f1(X(wk))}" y1="${L.ay}" y2="${f1(L.cy+L.ch)}" style="stroke:var(--ink);stroke-width:1.2;opacity:.5"/>`;
    /* spotlight */
    s+=`<rect x="${L.sx-8}" y="${L.sy-8}" width="${L.sw+12}" height="${L.sh+12}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=T(L.sx,L.sy+12,SE_STEPS[p].t,'t-lbl');
    s+=SP[p](L.sx,L.sy+24,L.sw,L.sh-24,u,wk);
    svg.innerHTML=s;
    noteEl.innerHTML=noteHTML(SE_STEPS[p]);setActive(p);
  }
  const stop=playWire(rg,pb,draw,22000,'%t:player.replay%','sideeffects');
  setActive=stepWire(stepsEl,SE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- the adverse-event comparator ---- */
  const asvg=$('#seAE'),abtn=$('#seAEBtns'),anote=$('#seAENote');
  let cur=0,stopA=null;
  const armCol=(k,n)=>k===0?'var(--figure)':'var(--rx-drug)',armOp=(k,n)=>k===0?1:(n===2?1:[0,.45,.72,1][k]);
  function drawAE(g){
    const D=SE_AE[cur],na=D.arms.length,N=NARROW(),bh=na>2?10:13,gap=3;
    const rowH=na*(bh+gap)+(N?28:16),top=58,H=top+D.rows.length*rowH+24,Wd=N?400:720;
    vb(asvg,`720 ${H}`,`400 ${H+10}`);
    const L=N?{lx:12,bx:12,bw:316}:{lx:12,bx:210,bw:440},max=50,X=v=>L.bx+L.bw*v/max;
    let s=T(12,20,D.n+' · '+D.g,'t-lbl')+T(12,36,D.src,'t-xs');
    /* legend */
    let lx=12;D.arms.forEach((a,k)=>{s+=`<rect x="${lx}" y="44" width="10" height="10" rx="2" style="fill:${armCol(k,na)};opacity:${armOp(k,na)}"/>`+T(lx+14,53,a,'t-xs');lx+=24+a.length*6.4});
    [0,10,20,30,40,50].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top}" y2="${f1(H-20)}" class="grid"/>`+T(X(v),H-6,v+'%','t-xs t-mid')});
    D.rows.forEach((r,i)=>{const y=top+i*rowH;
      s+=T(L.lx,N?y+12:y+14,r[0],'t-sm','fill:var(--ink)');
      const by=N?y+18:y+4;
      r[1].forEach((v,k)=>{const yy=by+k*(bh+gap),vv=v*g;s+=`<rect x="${L.bx}" y="${f1(yy)}" width="${f1(Math.max(0,X(vv)-L.bx))}" height="${bh}" rx="2.5" style="fill:${armCol(k,na)};opacity:${armOp(k,na)}"/>`+T(X(vv)+4,yy+bh-1.5,f1(vv)+'%','t-xs',k?'fill:var(--ink)':'')})});
    asvg.innerHTML=s;
  }
  function setAE(i){cur=i;$$('button',abtn).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
    const D=SE_AE[i];anote.innerHTML=`<div class="kicker">${D.src}</div><h4>${D.n}</h4><p>${D.note}</p>`;
    if(stopA)stopA();stopA=animate(600,p=>drawAE(ease(p)),()=>{stopA=null})}
  abtn.innerHTML=SE_AE.map((d,i)=>`<button class="btn" aria-pressed="false" data-ae="${i}">${d.n}</button>`).join('');
  abtn.addEventListener('click',e=>{const b=e.target.closest('[data-ae]');if(b)setAE(+b.dataset.ae)});
  setAE(0);drawAE(1);
  {const prev=redraws.sideeffects;redraws.sideeffects=()=>{prev&&prev();drawAE(1)}}
};
