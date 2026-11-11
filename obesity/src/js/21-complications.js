/* =============== 2.1 Complications across the body =============== */
/* The body map lights one organ system per step and grows its published relative risks on a log scale beside it.
   Every number in CO_ROWS is a population statistic from the source named in the step's note; nothing here is a
   personal risk. The figure is the kit's neutral person(): no face, one colour, never a "before and after". */
const CO_STEPS=[
 {from:0,at:.1,k:'Heart & vessels',t:'Heart and blood vessels',
  txt:'In a meta-analysis of 89 prospective cohorts, obesity (BMI ≥30) compared with normal BMI went with incidence rate ratios for high blood pressure of 2.42 in women and 1.84 in men, for coronary artery disease of 3.10 and 1.72, and for congestive heart failure of about 1.8 in both. [[Guh2009]] In Framingham, heart-failure risk rose 5% in men and 7% in women for each 1-unit rise in BMI. [[Kenchaiah2002]] Across 51 studies, each 5-unit BMI rise meant 29% more atrial fibrillation (OR 1.29). [[Wong2015AF]] Ischaemic stroke RR was 1.64 [[Strazzullo2010]] and venous thromboembolism OR 2.33. [[Ageno2008]]',
  pt:'Extra body fat makes the heart and blood vessels work harder. In large groups, high blood pressure, heart failure and an irregular heartbeat all become more common.',
  hook:'Framingham: each 1-unit BMI rise, heart failure +5% (men) and +7% (women). [[Kenchaiah2002]] Obesity-linked AF ran through left atrial enlargement. [[Wang2004AF]]'},
 {from:1/6,at:1/6+.1,k:'Liver & gut',t:'Liver, gallbladder and gullet',
  txt:'MASLD, the new name for NAFLD, means fat in the liver plus at least 1 of 5 cardiometabolic risk factors. [[Rinella2023MASLD]] A meta-analysis of 151 studies found it in 75% of people with obesity and 70% of people with overweight; among people with obesity and the disease, 21.6% had significant fibrosis. [[Quek2023]] Each 5 kg/m² higher BMI meant 82% higher liver mortality (HR 1.82). [[Whitlock2009PSC]] Gallbladder disease RR was 2.32 in women with obesity [[Guh2009]]; reflux symptoms OR 1.94 above BMI 30, and oesophageal adenocarcinoma OR 2.78. [[Hampel2005]]',
  pt:'Fat can build up inside the liver itself. It usually causes no symptoms, so it is found with blood tests or scans, not by how someone feels.',
  hook:'MASLD = steatosis + at least 1 of 5 cardiometabolic risk factors. [[Rinella2023MASLD]] A "normal" ALT does not exclude it. [[Rinella2023AASLD]]'},
 {from:2/6,at:2/6+.1,k:'Airway & lungs',t:'Airway, sleep and breathing',
  txt:'In the Wisconsin Sleep Cohort, a 10% weight gain predicted a 32% rise in the apnoea-hypopnoea index (AHI) and about 6-fold odds of developing moderate-to-severe sleep-disordered breathing (95% CI 2.2–17.0); a 10% weight loss predicted a 26% fall in AHI. [[Peppard2000]] In US adults in 2007–2010, an estimated 10% of men aged 30–49 and 17% aged 50–70 had moderate-to-severe sleep-disordered breathing. [[Peppard2013]] Asthma RR was 1.78 in women and 1.43 in men with obesity; pulmonary embolism 3.51 in a single study. [[Guh2009]]',
  pt:'Fat around the neck and airway can narrow it in sleep. Breathing stops and starts, sleep breaks up, and daytime tiredness follows. Loud snoring is a reason to ask about a sleep test.',
  hook:'Peppard 2000: +10% weight, about 6-fold odds of moderate-to-severe sleep-disordered breathing; −10% weight, AHI −26%. [[Peppard2000]]'},
 {from:3/6,at:3/6+.1,k:'Pancreas & kidneys',t:'Pancreas, diabetes and kidneys',
  txt:'Type 2 diabetes is the strongest association: IRR 12.41 in women and 6.74 in men with obesity versus normal BMI. [[Guh2009]] Among 51 529 US male health professionals, BMI ≥35 carried an RR of 42.1 against BMI under 23. [[Chan1994]] Mendelian randomisation supports a causal role (OR 1.67). [[Riaz2018]] Chronic kidney disease RR was 1.83 with obesity [[Wang2008Kidney]], and end-stage kidney disease rose step by step to an adjusted RR of 7.07 at BMI ≥40 in 320 252 adults. [[Hsu2006]] <a href="#" data-go="diabetes">Module 2.2</a> follows the diabetes story.',
  pt:'Extra fat makes insulin work less well, so the pancreas has to strain to keep blood sugar normal. Over years the kidneys can be harmed too.',
  hook:'Guh 2009: obesity and type 2 diabetes, IRR 12.41 (women) and 6.74 (men), the strongest of the 18 comorbidities pooled. [[Guh2009]]'},
 {from:4/6,at:4/6+.1,k:'Joints & pelvis',t:'Joints, fertility and bladder',
  txt:'Each 5-unit BMI rise raised knee osteoarthritis risk by 35% (RR 1.35). [[Jiang2012]] Each kilogram lost meant about 40.6 N less compressive force on the knee per step, roughly 4 times the weight lost. [[Messier2005]] Joint replacement for osteoarthritis: IRR 4.20 in men with obesity; chronic back pain 2.81. [[Guh2009]] Obesity was more common in women with PCOS (RR 2.77). [[Lim2012PCOS]] An estimated 25% of ovulatory infertility in US women may be attributable to BMI ≥25 [[RichEdwards2002]], and longer time to pregnancy was linked to higher BMI in both partners. [[RamlauHansen2007]] Chronic urinary incontinence is one of the Lancet Commission criteria for clinical obesity. [[Rubino2025Commission]]',
  pt:'Knees carry several times body weight with every step, so they feel extra load early. Weight can also affect periods, fertility and bladder control.',
  hook:'Messier 2005: 1 kg lost, about 4 kg less load through the knee with each step. [[Messier2005]]'},
 {from:5/6,at:5/6+.11,k:'Cancer & mood',t:'Thirteen cancers, and mood',
  txt:'The IARC Working Group found sufficient evidence that the absence of excess body fat lowers the risk of 13 cancers: oesophageal adenocarcinoma, gastric cardia, colon and rectum, liver, gallbladder, pancreas, postmenopausal breast, corpus uteri, ovary, kidney, meningioma, thyroid and multiple myeloma. For endometrial cancer the RR climbs from about 1.5 (overweight) to 7.1 (class 3 obesity). [[LaubySecretan2016]] In the US in 2014, 40% of all cancers diagnosed were types associated with overweight and obesity. [[Steele2017MMWR]] Mood runs both ways: obesity raised the odds of later depression (OR 1.55), and depression the odds of later obesity (OR 1.58). [[Luppino2010]]',
  pt:'Extra body fat is linked to 13 kinds of cancer. Low mood and weight can feed each other, so help for one can help with the other.',
  hook:'IARC: 13 sites, including meningioma, thyroid and multiple myeloma. [[LaubySecretan2016]] Obesity and depression: OR 1.55 one way, 1.58 the other. [[Luppino2010]]'}
];
/* the risks drawn beside the body, one list per step: label, value, what it compares */
const CO_ROWS=[
 [{l:'Coronary artery disease, women',v:3.10,m:'IRR'},{l:'High blood pressure, women',v:2.42,m:'IRR'},{l:'Venous thromboembolism',v:2.33,m:'OR'},{l:'Heart failure, men',v:1.79,m:'RR'},{l:'Ischaemic stroke',v:1.64,m:'RR'},{l:'Atrial fibrillation, per +5 BMI',v:1.29,m:'OR'}],
 [{l:'Oesophageal adenocarcinoma',v:2.78,m:'OR'},{l:'Gallbladder disease, women',v:2.32,m:'IRR'},{l:'Reflux symptoms',v:1.94,m:'OR'},{l:'Liver deaths, per +5 BMI',v:1.82,m:'HR'}],
 [{l:'Moderate-severe SDB, after +10% weight',v:6,m:'odds ×'},{l:'Pulmonary embolism (1 study)',v:3.51,m:'IRR'},{l:'Asthma, women',v:1.78,m:'RR'},{l:'Asthma, men',v:1.43,m:'RR'}],
 [{l:'Type 2 diabetes, women',v:12.41,m:'IRR'},{l:'End-stage kidney disease, BMI ≥40',v:7.07,m:'RR'},{l:'Type 2 diabetes, men',v:6.74,m:'IRR'},{l:'Diabetes deaths, per +5 BMI',v:2.16,m:'HR'},{l:'Chronic kidney disease',v:1.83,m:'RR'}],
 [{l:'Joint replacement for OA, men',v:4.20,m:'IRR'},{l:'Chronic back pain',v:2.81,m:'RR'},{l:'Obesity, in women with PCOS',v:2.77,m:'RR'},{l:'Knee OA, per +5 BMI',v:1.35,m:'RR'},{l:'Subfecundity, women, per BMI group',v:1.32,m:'OR'}],
 [{l:'Endometrial cancer, class 3',v:7.1,m:'RR'},{l:'Oesophageal adenocarcinoma, BMI ≥40',v:4.8,m:'RR'},{l:'Kidney cancer, women',v:2.64,m:'IRR'},{l:'Colorectal cancer, men',v:1.95,m:'IRR'},{l:'Later obesity, after depression',v:1.58,m:'OR'},{l:'Later depression, after obesity',v:1.55,m:'OR'}]
];
/* organ placement on the figure, in person() units (100 = height); front view, the person's left on the viewer's right */
const CO_ORGANS=[['heart','vessels'],['liver','gallbladder','gullet'],['airway','lungs'],['pancreas','kidneys'],['knees','pelvis'],['sites','brain']];
const CO_LBL={heart:[2,37,'heart'],vessels:[1,60,'blood vessels'],liver:[-6,42,'liver'],gallbladder:[-4.6,47.8,'gallbladder'],gullet:[0.6,30,'gullet'],
  airway:[0,20,'airway'],lungs:[-6.4,31,'lungs'],pancreas:[4,48,'pancreas'],kidneys:[6.6,52,'kidneys'],knees:[-5.6,77,'knees'],pelvis:[0,57.5,'uterus & ovaries'],
  brain:[0,7,'brain: mood'],sites:[0,0,'']};
/* the 13 IARC sites, in order of the published list, placed on the figure */
const CO_SITES=[['oesophagus (adenocarcinoma)',.6,30],['gastric cardia',2.6,41.6],['colon & rectum',-4.5,55],['liver',-7,42],['gallbladder',-4.6,47.8],['pancreas',4.2,48],
  ['breast (after menopause)',5.2,31],['uterus',0,57.5],['ovary',3.2,57],['kidney',6.6,52],['meningioma',-2.4,4.6],['thyroid',0,19.6],['multiple myeloma',-5.4,67]];

/* relative risk, made visible: cases for every 10 in the reference group, or (prevalence) people out of 100 */
const CO_RR=[
 {id:'t2dw',n:'Type 2 diabetes, women',m:'IRR',b:[['Normal BMI',1],['Overweight',3.92],['Obesity',12.41]],src:'[[Guh2009]]',ref:'normal BMI'},
 {id:'t2dm',n:'Type 2 diabetes, men',m:'IRR',b:[['Normal BMI',1],['Overweight',2.40],['Obesity',6.74]],src:'[[Guh2009]]',ref:'normal BMI'},
 {id:'htnw',n:'High blood pressure, women',m:'IRR',b:[['Normal BMI',1],['Overweight',1.65],['Obesity',2.42]],src:'[[Guh2009]]',ref:'normal BMI'},
 {id:'htnm',n:'High blood pressure, men',m:'IRR',b:[['Normal BMI',1],['Overweight',1.28],['Obesity',1.84]],src:'[[Guh2009]]',ref:'normal BMI'},
 {id:'cadw',n:'Coronary artery disease, women',m:'RR',b:[['Normal BMI',1],['Overweight',1.80],['Obesity',3.10]],src:'[[Guh2009]]',ref:'normal BMI'},
 {id:'endo',n:'Endometrial cancer',m:'RR (about)',b:[['Normal BMI',1],['Overweight',1.5],['Class 1',2.5],['Class 2',4.5],['Class 3',7.1]],src:'[[LaubySecretan2016]]',ref:'normal BMI'},
 {id:'esrd',n:'End-stage kidney disease',m:'adjusted RR',b:[['Normal BMI',1],['Overweight',1.87],['Class I',3.57],['Class II',6.12],['BMI ≥40',7.07]],src:'[[Hsu2006]]',ref:'normal BMI'},
 {id:'mort',n:'Death from any cause, never-smokers',m:'HR',b:[['BMI 22.5–<25',1],['30–<35',1.45],['35–<40',1.94],['40–<60',2.76]],src:'[[GBMC2016]]',ref:'BMI 22.5 to under 25'},
 {id:'masld',n:'Fatty liver disease (how common)',m:'prevalence',abs:true,b:[['Overweight',70],['Obesity',75]],src:'[[Quek2023]]'}
];
/* what modest weight loss improved: Look AHEAD odds ratios (5 to <10% lost at 1 year vs stable weight), and organ outcomes */
const CO_LA=[{l:'HbA1c down ≥0.5 point',v:3.52},{l:'Triglycerides down ≥40 mg/dL',v:2.20},{l:'HDL up ≥5 mg/dL',v:1.69},{l:'Systolic BP down ≥5 mmHg',v:1.56},{l:'LDL cholesterol',v:1,none:true}];
const CO_ORGW=[{l:'NASH resolved, ≥10% lost',v:90,g:'liver'},{l:'NASH resolved, ≥5% lost',v:58,g:'liver'},{l:'Incontinence episodes cut, 8% lost',v:47,c:28,g:'bladder'},{l:'Fibrosis regressed, ≥10% lost',v:45,g:'liver'},{l:'AHI fall after 10% loss',v:26,g:'sleep'}];

inits.complications=()=>{
  const svg=$('#coSvg'),rg=$('#coT'),note=$('#coNote');
  const lg=Math.log(14);
  function heartPath(c,h){const[x,y]=c;return `M${f1(x)} ${f1(y+h*.9)}C${f1(x-h*1.3)} ${f1(y+h*.1)} ${f1(x-h*1.1)} ${f1(y-h*.9)} ${f1(x-h*.35)} ${f1(y-h*.8)}C${f1(x-h*.1)} ${f1(y-h*.78)} ${f1(x)} ${f1(y-h*.55)} ${f1(x)} ${f1(y-h*.45)}C${f1(x)} ${f1(y-h*.55)} ${f1(x+h*.1)} ${f1(y-h*.78)} ${f1(x+h*.35)} ${f1(y-h*.8)}C${f1(x+h*1.1)} ${f1(y-h*.9)} ${f1(x+h*1.3)} ${f1(y+h*.1)} ${f1(x)} ${f1(y+h*.9)}Z`}
  /* organ style: v = 0 resting, then visited (.25) and lit (1) */
  const sty=(v,base)=>v>.02?`fill:var(--risk);fill-opacity:${f1(.18+.55*v)};stroke:var(--risk);stroke-width:${f1(1+v)}`:`fill:${base||'var(--panel-2)'};fill-opacity:.85;stroke:var(--figure-line);stroke-width:1`;
  function body(X,Y,S,L,cur,u){
    const k=S/100,G=(px,py)=>[X+px*k,Y+py*k];let s=person(X,Y,S,{size:.55}).svg;
    const e=(c,rx,ry,v,rot=0)=>`<ellipse cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${f1(rx*k)}" ry="${f1(ry*k)}" transform="rotate(${rot} ${f1(c[0])} ${f1(c[1])})" style="${sty(v)}"/>`;
    /* vessels */
    const vs=L.vessels||0,vp=[G(1.4,40),G(.6,52),G(.4,58)];
    s+=`<path d="${ptsD(vp)}M${f1(G(.4,58)[0])} ${f1(G(.4,58)[1])}L${f1(G(-5.4,72)[0])} ${f1(G(-5.4,72)[1])}M${f1(G(.4,58)[0])} ${f1(G(.4,58)[1])}L${f1(G(5.8,72)[0])} ${f1(G(5.8,72)[1])}M${f1(G(1.4,34)[0])} ${f1(G(1.4,34)[1])}L${f1(G(-1.6,20)[0])} ${f1(G(-1.6,20)[1])}M${f1(G(1.4,34)[0])} ${f1(G(1.4,34)[1])}L${f1(G(2.4,20)[0])} ${f1(G(2.4,20)[1])}" style="fill:none;stroke:${vs>.02?'var(--risk)':'var(--vessel)'};stroke-width:${f1(1.2+vs*1.6)};stroke-linecap:round;opacity:${f1(.35+.6*vs)}"/>`;
    /* brain */
    s+=e(G(0,7.6),5.6,4.4,L.brain||0);
    /* airway and lungs */
    const aw=L.airway||0;s+=e(G(-6.2,33),4.3,7.4,L.lungs||0,8)+e(G(6.2,33),4.3,7.4,L.lungs||0,-8);
    s+=`<path d="${ptsD([G(0,15),G(0,28)])}M${f1(G(0,28)[0])} ${f1(G(0,28)[1])}L${f1(G(-3.6,31)[0])} ${f1(G(-3.6,31)[1])}M${f1(G(0,28)[0])} ${f1(G(0,28)[1])}L${f1(G(3.6,31)[0])} ${f1(G(3.6,31)[1])}" style="fill:none;stroke:${aw>.02?'var(--risk)':'var(--figure-line)'};stroke-width:${f1(2+aw*2.2)};stroke-linecap:round"/>`;
    /* gullet */
    const gu=L.gullet||0;if(gu>.02)s+=`<path d="${ptsD([G(.3,22),G(.6,32),G(2,41)])}" style="fill:none;stroke:var(--risk);stroke-width:${f1(1.5+gu*1.6)};stroke-linecap:round;opacity:${f1(.4+.6*gu)}"/>`;
    /* heart */
    s+=`<path d="${heartPath(G(2.2,37),3.8*k)}" style="${sty(L.heart||0,'var(--panel-2)')}"/>`;
    /* liver (kit), its fat shows when the liver lights */
    const lv=L.liver||0,ls=12.5*k/140,lo=G(-11.5,39.2);
    s+=liver(lo[0],lo[1],ls,{fat:lv,seed:5}).svg;
    if(lv>.02){s+=`<path d="${smoothPath(LV_OUT.map(p=>[lo[0]+p[0]*ls,lo[1]+p[1]*ls]))}" style="fill:none;stroke:var(--risk);stroke-width:${f1(1+lv*1.4)}"/>`}
    s+=e(G(-4.6,47.8),1.1,1.3,L.gallbladder||0);
    /* pancreas and kidneys */
    s+=e(G(6.4,52),1.8,3,L.kidneys||0,-8)+e(G(-6.4,52),1.8,3,L.kidneys||0,8);
    s+=e(G(3.6,48),5,1.3,L.pancreas||0,-12);
    /* pelvis: uterus and ovaries */
    const pv=L.pelvis||0;s+=`<path d="${smoothPath([G(-2.2,55.4),G(2.2,55.4),G(1.2,59.4),G(0,60.6),G(-1.2,59.4)])}" style="${sty(pv)}"/>`+e(G(-3.4,56.6),.9,.9,pv)+e(G(3.4,56.6),.9,.9,pv);
    /* knees */
    s+=e(G(-5.6,77),2.4,2.6,L.knees||0)+e(G(5.6,77),2.4,2.6,L.knees||0);
    /* the 13 cancer sites, lit one by one in the last step */
    let ns=0;if(cur===5){ns=Math.round(13*ease(ramp(u,.05,.7)));CO_SITES.forEach((q,i)=>{if(i>=ns)return;const c=G(q[1],q[2]);
      s+=`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(1.25*k)}" style="fill:var(--risk);stroke:var(--panel);stroke-width:1.2"/>`;
      if(i===ns-1)s+=`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(2.6*k)}" style="fill:none;stroke:var(--risk);stroke-width:1.4;opacity:.7"/>`})}
    return {svg:s,G,ns};
  }
  function draw(t){
    const N=vb(svg,'720 380','400 650'),p=phaseOf(CO_STEPS,t),u=clamp((t-CO_STEPS[p].from)*6);
    /* lit organs: the current step glows, earlier steps keep a faint trace */
    const L={};CO_ORGANS.forEach((os,i)=>os.forEach(o=>{L[o]=i<p?.22:i===p?ease(ramp(u,0,.3)):0}));
    const X=N?92:150,Y=N?12:10,S=N?296:352,B=body(X,Y,S,L,p,u);let s=B.svg;
    /* labels for the lit organs, with leader lines */
    const right=N?178:228,left=78;
    CO_ORGANS[p].forEach((o,j)=>{if(o==='sites')return;const q=CO_LBL[o],c=B.G(q[0],q[1]),onLeft=!N&&q[0]<0,lx=onLeft?left:right,ly=c[1];
      const a=clamp(ramp(u,.05+.1*j,.3+.1*j));if(a<=0)return;
      s+=`<g style="opacity:${f1(a)}"><path d="M${f1(c[0])} ${f1(c[1])}L${f1(lx+(onLeft?4:-4))} ${f1(ly)}" style="stroke:var(--risk);stroke-width:1.1;fill:none;stroke-dasharray:3 2"/>${kitLabel(lx,ly+3.5,q[2],{a:onLeft?'e':''})}</g>`});
    if(p===5){s+=kitLabel(right,(N?96:120),`IARC sites: ${B.ns} of 13`,{});
      if(B.ns>0)s+=`<text x="${right}" y="${N?110:134}" class="t-xs">${CO_SITES[B.ns-1][0]}</text>`}
    /* the risk panel */
    const P=N?{x:20,y:356,w:360,rh:44,lw:0}:{x:322,y:42,w:378,rh:51,lw:0};
    const rows=CO_ROWS[p],X0=P.x,W=P.w-56,Xv=v=>X0+W*Math.log(v)/lg;
    s+=`<text x="${P.x}" y="${P.y-24}" class="t-big">${CO_STEPS[p].t}</text><text x="${P.x}" y="${P.y-8}" class="t-xs">relative risk vs the reference group (log scale)</text>`;
    const top=P.y+6,bot=top+rows.length*P.rh;
    [1,2,5,10].forEach(v=>{const x=Xv(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(top)}" y2="${f1(bot)}" class="grid"/><text x="${f1(x)}" y="${f1(bot+13)}" class="t-xs t-mid">${v===1?'1 = same':'×'+v}</text>`});
    rows.forEach((r,j)=>{const y=top+j*P.rh,g=ease(clamp(ramp(u,.12+.07*j,.42+.07*j))),x1=Xv(1+(r.v-1)*g);
      s+=`<text x="${X0}" y="${f1(y+14)}" class="t-lbl" style="font-size:12px">${r.l}</text>`;
      s+=`<rect x="${f1(X0)}" y="${f1(y+21)}" width="${f1(Math.max(1.5,x1-X0))}" height="14" rx="3" style="fill:var(--risk);opacity:${f1(.35+.5*g)}"/>`;
      if(g>.05)s+=`<text x="${f1(x1+6)}" y="${f1(y+32)}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.m==='odds ×'?'×'+r.v:r.m+' '+r.v.toFixed(2).replace(/0$/,'')}</text>`});
    rows.forEach((r,j)=>{const y=top+j*P.rh;s+=`<line x1="${f1(Xv(1))}" x2="${f1(Xv(1))}" y1="${f1(y+18)}" y2="${f1(y+38)}" style="stroke:var(--ink);stroke-width:1.4"/>`});
    svg.innerHTML=s;
    note.innerHTML=noteHTML(CO_STEPS[p]);setA(p);
  }
  const stop=playWire(rg,$('#coPlay'),draw,24000,'%t:player.replay%','complications');
  const setA=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- relative risk as icons ---- */
  const isvg=$('#coIcSvg'),sel=$('#coIcSel'),read=$('#coIcRead');
  sel.innerHTML=CO_RR.map((c,i)=>`<option value="${i}">${c.n}</option>`).join('');
  let ci=0,stopI=null;
  function drawI(g){
    const c=CO_RR[ci],N=vb(isvg,'720 300','400 520'),nb=c.b.length,per=N?Math.min(nb,3):nb,W=N?380:700,x0=N?10:10;
    const bw=W/per,sz=Math.min(c.abs?10:9,(bw-18)/10-2.2),gp=2.2;let s='',y0=N?30:34,maxH=0;
    c.b.forEach((b,i)=>{const col=i%per,row=Math.floor(i/per);
      const n=c.abs?100:Math.round(10*b[1]),k=c.abs?Math.round(b[1]*g):Math.round(n*g);
      const tot=c.abs?100:n,arr=iconArray(0,0,{n:tot,cols:10,size:sz,gap:gp,shape:'dot',k:0});
      const bx=x0+col*bw+(bw-arr.w)/2,by=y0+row*(N?215:0);
      const ia=iconArray(bx,by+30,{n:tot,cols:10,size:sz,gap:gp,shape:'dot',groups:[{k,col:'var(--risk)'}],base:c.abs?'var(--line)':'var(--panel-2)'});
      s+=`<text x="${f1(bx+arr.w/2)}" y="${f1(by+4)}" class="t-lbl t-mid" style="font-size:12.5px">${b[0]}</text>`;
      s+=`<text x="${f1(bx+arr.w/2)}" y="${f1(by+20)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${c.abs?k+' of 100':k+' cases'+(i===0?' (reference)':'')}</text>`;
      s+=ia.svg;maxH=Math.max(maxH,by+30+ia.h)});
    isvg.setAttribute('viewBox',`0 0 ${N?400:720} ${Math.ceil(Math.max(150,maxH+12))}`);
    isvg.innerHTML=s;
    const big=c.b[c.b.length-1];
    read.innerHTML=c.abs?`<b>${c.n}.</b> In a meta-analysis of 151 studies, NAFLD (now MASLD) was found in 69.99% of people with overweight and 75.27% of people with obesity, shown here as people out of 100. ${c.src} This counts how common the disease is, not how many people will develop it.`
      :`<b>${c.n}.</b> Each block shows how many cases occur in a group for every 10 cases in an equal-sized group with ${c.ref}. With ${c.m} ${big[1]}, the ${big[0].toLowerCase()} group has about ${Math.round(10*big[1])}. ${c.src} A relative risk says nothing on its own about how common a disease is: if it is rare, even a large ratio means few extra cases.`;
  }
  function runI(){stopI&&stopI();drawI(0);stopI=animate(1100,p=>drawI(ease(p)),()=>{stopI=null})}
  sel.addEventListener('change',()=>{ci=+sel.value;runI()});
  drawI(1);

  /* ---- what modest loss improves ---- */
  const lsvg=$('#coLaSvg'),lb=$('#coLaBtns'),lread=$('#coLaRead');let lv=0,stopL=null;
  function drawL(g){
    const N=vb(lsvg,'720 312','400 440');let s='';
    if(lv===0){const x0=N?20:250,w=N?300:380,y0=N?30:34,rh=N?78:48,X=v=>x0+w*v/4;
      [0,1,2,3,4].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y0}" y2="${y0+rh*5}" class="grid"/><text x="${f1(X(v))}" y="${y0+rh*5+14}" class="t-xs t-mid">${v}</text>`});
      s+=`<text x="${f1(X(4))}" y="${y0+rh*5+28}" class="t-xs t-end">odds ratio vs stable weight</text>`;
      CO_LA.forEach((r,j)=>{const y=y0+j*rh,ly=N?y+14:y+22,by=N?y+24:y+10,e=ease(clamp(g*1.4-j*.1));
        s+=`<text x="${N?x0:x0-12}" y="${ly}" class="t-lbl${N?'':' t-end'}" style="font-size:12.5px">${r.l}</text>`;
        if(r.none)s+=`<text x="${f1(X(1)+8)}" y="${by+16}" class="t-sm" style="fill:var(--ink)">no association (P = 0.79)</text><circle cx="${f1(X(1))}" cy="${by+11}" r="5" style="fill:none;stroke:var(--muted);stroke-width:2"/>`;
        else{const x1=X(r.v*e);s+=`<rect x="${f1(x0)}" y="${by}" width="${f1(Math.max(1,x1-x0))}" height="22" rx="4" style="fill:var(--good);opacity:.8"/>`;if(e>.1)s+=`<text x="${f1(x1+6)}" y="${by+16}" class="t-sm" style="fill:var(--ink);font-weight:700">OR ${r.v.toFixed(2)}</text>`}});
      CO_LA.forEach((r,j)=>{const by=(N?y0+j*rh+24:y0+j*rh+10);s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${by-4}" y2="${by+26}" style="stroke:var(--ink);stroke-width:1.5"/>`});s+=`<text x="${f1(X(1)+4)}" y="${y0-8}" class="t-xs">1 = no better than stable weight</text>`;
      lread.innerHTML='Look AHEAD, 5145 adults with type 2 diabetes: compared with people whose weight stayed stable, those who lost 5 to under 10% at 1 year had higher odds of each improvement shown. The odds were even greater with 10 to 15% loss. LDL cholesterol did not track weight loss. [[Wing2011DiabetesCare]] Odds ratios from an observational analysis within the trial: they describe groups, not what one person will see.'}
    else{const x0=N?20:300,w=N?320:360,y0=N?30:30,rh=N?76:50,X=v=>x0+w*v/100;
      [0,25,50,75,100].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y0}" y2="${y0+rh*5}" class="grid"/><text x="${f1(X(v))}" y="${y0+rh*5+14}" class="t-xs t-mid">${v}%</text>`});
      CO_ORGW.forEach((r,j)=>{const y=y0+j*rh,ly=N?y+14:y+22,by=N?y+24:y+10,e=ease(clamp(g*1.4-j*.1)),x1=X(r.v*e);
        s+=`<text x="${N?x0:x0-12}" y="${ly}" class="t-lbl${N?'':' t-end'}" style="font-size:12.5px">${r.l}</text>`;
        s+=`<rect x="${f1(x0)}" y="${by}" width="${f1(Math.max(1,x1-x0))}" height="${r.c?13:22}" rx="4" style="fill:var(--good);opacity:.8"/>`;
        if(r.c){const xc=X(r.c*e);s+=`<rect x="${f1(x0)}" y="${by+15}" width="${f1(Math.max(1,xc-x0))}" height="9" rx="3" style="fill:var(--muted);opacity:.6"/>`;if(e>.1)s+=`<text x="${f1(xc+6)}" y="${by+24}" class="t-xs">control ${r.c}%</text>`}
        if(e>.1)s+=`<text x="${f1(x1+6)}" y="${by+(r.c?11:16)}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.v}%</text>`});
      lread.innerHTML='Liver: in 293 people with biopsy-proven NASH, 90% of those who lost ≥10% had NASH resolution and 45% fibrosis regression; 58% resolved with ≥5%. [[VilarGomez2015]] Bladder: in PRIDE, an 8% loss cut weekly incontinence episodes by 47% versus 28% in controls. [[Subak2009PRIDE]] Sleep: a 10% loss predicted a 26% fall in AHI. [[Peppard2000]] Different trials and measures, shown side by side only to compare direction; population averages.'}
    lsvg.innerHTML=s;
  }
  function runL(){stopL&&stopL();stopL=animate(1200,p=>drawL(p),()=>{stopL=null})}
  lb.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;lv=+b.dataset.v;$$('[data-v]',lb).forEach(x=>x.setAttribute('aria-pressed',x===b));runL()});
  drawL(1);
  const prevR=redraws.complications;redraws.complications=()=>{prevR&&prevR();drawI(1);drawL(1)};
  const prevH=onHide.complications;onHide.complications=()=>{prevH&&prevH();stopI&&stopI();stopL&&stopL();stopI=stopL=null};
};
