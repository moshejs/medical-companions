/* =============== 4.2 Ascites, infection & kidney injury =============== */
const AS_STEPS=[
 {from:0,at:.1,k:'Step 1 · the pressure',t:'Portal pressure rises',
  txt:`Scar and nodules make it hard for blood from the gut to pass through the liver, so pressure builds in the portal vein. Baveno VII: a hepatic venous pressure gradient (HVPG) above 5 mmHg indicates sinusoidal portal hypertension, and 10 mmHg or more is clinically significant portal hypertension. Ascites is the most common decompensating event: 5–10% of people with compensated cirrhosis develop it each year. [[deFranchis2022BavenoVII,EASL2018Decomp]] The pressure itself is the subject of <a href="#portal" data-go="portal">Portal hypertension &amp; varices</a>.`,
  pt:`Scarring makes it hard for blood from the gut to get through the liver, so pressure builds up in the portal vein. [[Gines2021Lancet,DiazSoto2022TAG]]`,
  hook:`HVPG &gt;5 mmHg = portal hypertension; ≥10 mmHg = clinically significant portal hypertension (CSPH). [[deFranchis2022BavenoVII]]`},
 {from:.16,at:.26,k:'Step 2 · the arteries',t:'Gut arteries widen',
  txt:`The peripheral arterial vasodilation hypothesis (Schrier, 1988): early widening of the splanchnic (gut) arteries "underfills" the arterial tree. The body reads this as too little circulating volume and switches on its salt- and water-saving systems. The same idea explains the continuum from compensated cirrhosis to decompensation to hepatorenal syndrome. [[Schrier1988Hepatology]]`,
  pt:`The blood vessels of the gut relax and widen. The rest of the body then behaves as if it were short of blood. [[Schrier1988Hepatology]]`,
  hook:`Splanchnic vasodilation → arterial underfilling → RAAS, sympathetic nerves and vasopressin → sodium and water retention. [[Schrier1988Hepatology]]`},
 {from:.32,at:.47,k:'Step 3 · the kidneys',t:'Kidneys hold salt and water',
  txt:`EASL 2018: the mainstay of ascites formation is renal sodium retention from activation of the renin–angiotensin–aldosterone and sympathetic nervous systems; vasopressin adds water. Portal hypertension directs the retained fluid into the abdomen. EASL grades: grade 1 is seen only on ultrasound, grade 2 is moderate symmetrical distension, grade 3 is marked distension. [[EASL2018Decomp,Schrier1988Hepatology]]`,
  pt:`The kidneys hold on to salt and water, and the high pressure pushes that fluid into the belly. [[EASL2018Decomp,Schrier1988Hepatology]]`,
  hook:`SAAG ≥1.1 g/dl = portal-hypertensive ascites (correct in 96.7% of 901 samples). [[EASL2018Decomp,Runyon1992AnnIntern]]`},
 {from:.52,at:.63,k:'Step 4 · treatment',t:'Less salt, then diuretics',
  txt:`EASL 2018, quoted as published and not as instructions: "a moderate restriction of sodium intake (80–120 mmol/day, corresponding to 4.6–6.9 g of salt)". For a first grade 2 ascites, an anti-mineralocorticoid such as spironolactone alone, "starting at 100 mg/day with stepwise increases every 72 h (in 100 mg steps) to a maximum of 400 mg/day". Furosemide is added if weight loss is &lt;2 kg/week or hyperkalaemia develops, "from 40 mg/day to a maximum of 160 mg/day (in 40 mg steps)"; long-standing or recurrent ascites gets the combination. [[EASL2018Decomp]]`,
  pt:`Less salt and water pills (diuretics) help the kidneys let go of salt and water. Only your care team sets the doses. [[EASL2018Decomp]]`,
  hook:`EASL steps: spironolactone 100 → 400 mg/day; furosemide 40 → 160 mg/day. Stop diuretics for Na⁺ &lt;125 mmol/L, AKI, worsening HE or incapacitating cramps. [[EASL2018Decomp]]`},
 {from:.68,at:.8,k:'Step 5 · treatment',t:'Drain, then give albumin',
  txt:`For grade 3 ascites, EASL calls large-volume paracentesis (LVP) first-line, removing all the fluid in one session. For more than 5 L, EASL: albumin "8 g/L of ascites removed"; 6–8 g per litre is the commonly cited AASLD and EASL figure, set by expert opinion. Without albumin, renal impairment or severe hyponatraemia developed in 11 patients vs 1 with albumin (RCT, 105 patients); across 17 trials albumin cut circulatory dysfunction (OR 0.39), hyponatraemia (OR 0.58) and death (OR 0.64). [[EASL2018Decomp,Trebicka2025Hepatology,Biggins2021AASLD,Gines1988Gastro,Bernardi2012Hepatology]]`,
  pt:`A needle drains the fluid. Albumin, a protein given through a drip, helps protect the circulation and kidneys afterwards. [[EASL2018Decomp,Bernardi2012Hepatology]]`,
  hook:`LVP &gt;5 L: albumin 8 g per litre removed (EASL); 6–8 g/L is the commonly cited range. [[EASL2018Decomp,Trebicka2025Hepatology]]`},
 {from:.84,at:.95,k:'Step 6 · treatment',t:'TIPS for recurrent ascites',
  txt:`The fluid keeps coming back. Baveno VII: TIPS "should be considered in patients with recurrent ascites (requirement of ≥3 large-volume paracenteses within 1 year)". Covered-stent TIPS vs repeated LVP plus albumin (62 people): 1-year transplant-free survival 93% vs 52%, 32 vs 320 paracenteses in total, and 65% free of encephalopathy at 1 year in both groups. EASL notes that TIPS has not been shown to improve survival in fully refractory ascites, which carries a median survival of about 6 months and calls for immediate transplant referral. [[deFranchis2022BavenoVII,Bureau2017Gastro,EASL2018Decomp]]`,
  pt:`TIPS stands for transjugular intrahepatic portosystemic shunt: a stent-supported channel inside the liver, placed by interventional radiology, that lets portal blood bypass the scar. In the first such case, in 1989, the pressure gradient fell from 38 to 18 mmHg. [[Richter1989Radiologe]]`,
  hook:`Recurrent ascites (≥3 LVPs in a year) → consider TIPS (Baveno VII). Refractory ascites → transplant referral (EASL). [[deFranchis2022BavenoVII,EASL2018Decomp]]`}
];
/* a grid of person icons: k of n coloured */
function asGrid(x,y,k,col,o={}){const n=o.n||100,cols=o.cols||10,s=o.s||15,gx=o.gx||s*1.2,gy=o.gy||s*1.25;let g='';
  for(let i=0;i<n;i++){const c=i%cols,r=Math.floor(i/cols);g+=person(x+c*gx+s*.3,y+r*gy,s,i<k?col:'var(--line)')}return g}
/* two arms side by side, for a trial outcome; p animates the fill 0..1 */
function asArms(svg,arms,row,p,good){
  const N=vb(svg,'440 330','400 330'),s=N?13.5:15,gx=N?16.6:18,gy=N?17.4:19,xs=N?[16,212]:[20,236],col=good?'var(--good)':'var(--bad)';let g='';
  [0,1].forEach(a=>{const v=a?row.b:row.a,k=Math.round(v*p),x=xs[a];
    g+=`<text x="${x}" y="20" class="t-lbl">${arms[a]}</text>`;
    g+=asGrid(x,34,k,col,{s,gx,gy});
    g+=`<text x="${x}" y="${34+10*gy+34}" class="t-big" style="font-size:28px;fill:${col}">${Math.round(v*p)}%</text>`});
  g+=`<text x="${N?200:220}" y="${34+10*gy+60}" class="t-sm t-mid">${row.n} · per 100 people</text>`;
  svg.innerHTML=g}
const AS_SORT=[{n:'Kidney impairment',a:33,b:10},{n:'Died in hospital',a:29,b:10},{n:'Died by 3 months',a:41,b:22}];
const AS_CONF=[{n:'HRS reversal (verified)',a:17,b:32,good:true},{n:'Death from respiratory disorders, 90 days',a:2,b:11},{n:'Died within 90 days',a:45,b:51}];

inits.ascites=()=>{
  const svg=$('#asSvg'),rg=$('#asT'),S=AS_STEPS;
  const lbl=(x,y,t,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}" style="paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round;${st}">${t}</text>`;
  /* the belly's fluid over the story */
  function fluid(t){
    if(t<.34)return 0;
    if(t<.52)return .88*ease(ramp(t,.34,.5));
    if(t<.7)return lerp(.88,.6,ease(ramp(t,.55,.67)));
    if(t<.83)return lerp(.6,.05,ease(ramp(t,.72,.81)));
    if(t<.89)return lerp(.05,.52,ease(ramp(t,.83,.88)));
    return lerp(.52,.1,ease(ramp(t,.9,.98)))}
  function grade(F){return F<.03?['no ascites','']:F<.28?['grade 1','seen only on ultrasound']:F<.58?['grade 2','moderate, symmetrical']:['grade 3','marked distension']}
  /* ---- the six scene panels, drawn in a 400 x 250 frame ---- */
  function sc0(u,t){let g=lbl(0,10,'SCARRED LIVER, RISING PRESSURE','t-sm');
    g+=liver(108,105,.95,{fib:3+u,gb:false,seed:5}).svg;
    const vw=5+u*5,d='M222 244Q192 198 142 146',q=(a,b,c,v)=>(1-v)*(1-v)*a+2*(1-v)*v*b+v*v*c;
    g+=`<path d="${d}" style="fill:none;stroke:var(--portal);stroke-width:${f1(vw)};stroke-linecap:round"/>`;
    if(u>0)g+=`<path d="${d}" style="fill:none;stroke:var(--bad);stroke-width:${f1(vw*.32)};stroke-linecap:round;opacity:${f1(u*.75)}"/>`;
    for(let i=0;i<5;i++){const v=(t*28*(1-.7*u)+i/5)%1;g+=`<circle cx="${f1(q(222,192,142,v))}" cy="${f1(q(244,198,146,v))}" r="2.2" style="fill:var(--panel)"/>`}
    g+=lbl(232,246,'portal vein');
    if(u>.45)g+=lbl(180,206,'back-pressure','t-xs t-end',`fill:var(--bad);opacity:${f1(ramp(u,.45,.7))}`);
    const hv=lerp(4,16,u);g+=gauge(322,128,66,hv,20,{bands:[{to:5,col:'var(--good)'},{to:10,col:'var(--warn)'},{to:20,col:'var(--bad)'}]});
    g+=lbl(322,164,Math.round(hv)+' mmHg','t-big t-mid','font-size:20px;fill:'+(hv>10?'var(--bad)':hv>5?'var(--warn)':'var(--good)'))+lbl(322,180,'HVPG, needle schematic','t-xs t-mid');
    g+=lbl(322,200,'&gt;5: portal hypertension','t-xs t-mid')+lbl(322,213,'≥10: clinically significant','t-xs t-mid');
    return g}
  function sc1(u,t){let g=lbl(0,10,'GUT ARTERIES WIDEN','t-sm');
    g+=`<rect x="26" y="24" width="16" height="220" rx="8" style="fill:var(--artery);opacity:.85"/>`+lbl(48,36,'aorta');
    [72,128,184].forEach((y,k)=>{const w=3+u*10,d=`M42 ${y}C96 ${y} 120 ${y+6} 196 ${y+4}`;
      g+=`<path d="${d}" style="fill:none;stroke:var(--artery);stroke-width:${f1(w)};stroke-linecap:round;opacity:.85"/>`;
      g+=`<path d="M198 ${y+4}q10 -16 20 0t20 0t20 0" style="fill:none;stroke:var(--brain-line);stroke-width:7;stroke-linecap:round;opacity:.5"/>`;
      for(let i=0;i<4;i++){const v=(t*22*(1-.5*u)+i/4+k*.13)%1;g+=`<circle cx="${f1(lerp(48,192,v))}" cy="${f1(y+v*v*4+(i%2?1:-1)*u*2.5)}" r="1.9" style="fill:var(--panel)"/>`}});
    g+=lbl(120,58,'splanchnic (gut) arteries','t-xs t-mid')+lbl(232,214,'gut','t-xs t-mid');
    g+=lbl(170,234,u>.5?'blood pools in the widened gut vessels':'the vessels relax and widen','t-xs t-mid');
    const H=150,fl=1-.55*u;
    g+=`<rect x="316" y="44" width="42" height="${H}" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    g+=`<rect x="316" y="${f1(44+H*(1-fl))}" width="42" height="${f1(H*fl)}" rx="8" style="fill:var(--artery);opacity:.7"/>`;
    g+=`<line x1="306" x2="368" y1="44" y2="44" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
    g+=lbl(337,212,'arterial filling','t-xs t-mid')+lbl(337,225,'as the body senses it','t-xs t-mid');
    if(u>.45)g+=lbl(337,34,'"underfilled"','t-xs t-mid',`fill:var(--bad);opacity:${f1(ramp(u,.45,.7))}`);
    return g}
  function sc2(u,t){let g=lbl(0,10,'KIDNEYS HOLD SALT AND WATER','t-sm');
    g+=kidney(66,112,2.3,{label:'kidney'});
    const R=[{y:26,a:'RAAS',b:'renin → angiotensin II → aldosterone',o:ramp(u,0,.25)},{y:76,a:'Sympathetic nervous system',b:'more active',o:ramp(u,.25,.5)},{y:126,a:'Vasopressin (ADH)',b:'more water kept',o:ramp(u,.5,.75)}];
    R.forEach(r=>{g+=`<rect x="140" y="${r.y}" width="256" height="38" rx="8" style="fill:${r.o>.5?'var(--accent-soft)':'var(--panel-2)'};stroke:${r.o>.5?'var(--accent)':'var(--line)'};stroke-width:1.2"/>`;
      g+=`<text x="150" y="${r.y+16}" class="t-lbl" style="font-size:11.5px;opacity:${f1(.45+.55*r.o)}">${r.a}</text><text x="150" y="${r.y+30}" class="t-xs" style="opacity:${f1(.45+.55*r.o)}">${r.b}</text>`;
      if(r.o>0)g+=`<line x1="138" y1="${r.y+19}" x2="${f1(lerp(138,112,r.o))}" y2="${f1(lerp(r.y+19,112,r.o*.6))}" style="stroke:var(--accent);stroke-width:1.6;opacity:${f1(r.o)}" marker-end="url(#asArA)"/>`});
    const n=Math.round(u*10),q=(a,b,c,v)=>(1-v)*(1-v)*a+2*(1-v)*v*b+v*v*c;
    for(let i=0;i<n;i++){const v=(t*14+i/10)%1,x=q(96,230,392,v),y=q(150,250,214,v);
      g+=i%2?`<path d="M${f1(x)} ${f1(y-5)}q4 5 0 8q-4 -3 0 -8Z" style="fill:var(--fluid-fill);stroke:var(--fluid);stroke-width:.8"/>`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:var(--bile)"/><text x="${f1(x)}" y="${f1(y+2.4)}" class="t-mid" style="font:700 6px var(--mono);fill:var(--ink)">Na</text>`}
    g+=lbl(258,184,'Na⁺ and water stay in the body','t-xs t-mid')+lbl(380,240,'→ belly','t-xs t-end');
    return g}
  function sc3(u){let g=lbl(0,10,'LESS SALT, THEN DIURETICS · EASL 2018','t-sm');
    /* salt shaker */
    g+=`<path d="M38 58h28l6 70h-40z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/><path d="M36 58q16 -22 32 0z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`;
    [[46,50],[52,46],[58,50]].forEach(([x,y])=>g+=`<circle cx="${x}" cy="${y}" r="1.4" style="fill:var(--muted)"/>`);
    g+=`<line x1="22" y1="40" x2="84" y2="140" style="stroke:var(--bad);stroke-width:2.2;opacity:${f1(.3+.7*ramp(u,0,.25))}"/>`;
    g+=lbl(0,160,'"moderate restriction"')+lbl(0,178,'80–120 mmol/day','t-lbl','font-size:12px')+lbl(0,193,'(4.6–6.9 g of salt)');
    const k1=Math.min(3,Math.floor(ramp(u,.12,.6)*4)),k2=u<.5?-1:Math.min(3,Math.floor(ramp(u,.5,.98)*4));
    const bars=(x0,w,step,max,k,name,unit,col)=>{let s=pill(x0+16,32,26,{col})+lbl(x0+34,36,name,'t-xs','font-weight:700;fill:var(--ink)');
      for(let i=0;i<4;i++){const d=step*(i+1),h=d/max*112,x=x0+i*(w+5),on=i<=k;
        s+=`<rect x="${x}" y="${f1(200-h)}" width="${w}" height="${f1(h)}" rx="3" style="fill:${on?col:'var(--panel-2)'};stroke:${on?col:'var(--line)'};opacity:${on?.9:1}"/>`;
        s+=`<text x="${f1(x+w/2)}" y="214" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${d}</text>`}
      return s+lbl(x0,228,unit)};
    g+=bars(126,26,100,400,k1,'spironolactone','mg/day','var(--rx)');
    g+=`<g style="opacity:${f1(.35+.65*ramp(u,.45,.55))}">`+bars(268,26,40,160,k2,'+ furosemide','mg/day','var(--fluid)')+'</g>';
    g+=lbl(0,246,u<.5?'spironolactone rises in 100 mg steps every 72 h':'furosemide added if weight loss &lt;2 kg/week · quoted, not instructions','t-xs');
    return g}
  function sc4(u){let g=lbl(0,10,'LARGE-VOLUME PARACENTESIS + ALBUMIN','t-sm');
    const L=u*8,H=176,y0=34,top=y0+H*(1-L/8);
    g+=`<rect x="20" y="${y0}" width="74" height="${H}" rx="10" style="fill:var(--panel);stroke:var(--fluid);stroke-width:1.6"/>`;
    if(L>0)g+=`<rect x="21" y="${f1(top)}" width="72" height="${f1(y0+H-top)}" rx="9" style="fill:var(--fluid-fill);opacity:.65"/>`;
    for(let l=2;l<=8;l+=2){const y=y0+H*(1-l/8);g+=`<line x1="94" x2="102" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--muted)"/>`+lbl(105,y+3,l+' L')}
    const y5=y0+H*(1-5/8);g+=`<line x1="14" x2="100" y1="${f1(y5)}" y2="${f1(y5)}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:4 3"/>`+lbl(130,y5+3,'5 L','t-xs',`fill:var(--bad)`);
    g+=lbl(57,236,f1(L)+' L drained','t-lbl t-mid');
    const X=160;
    if(L<=5){g+=lbl(X,52,'Up to 5 L:','t-lbl')+lbl(X,70,'EASL: the risk of circulatory')+lbl(X,83,'dysfunction after the drain is low')}
    else{const al=8*L;g+=lbl(X,52,'More than 5 L: EASL states','t-lbl')+lbl(X,70,'albumin "8 g/L of ascites removed"');
      g+=lbl(X,100,`8 × ${f1(L)} L ≈ ${Math.round(al)} g`,'t-big','font-size:20px;fill:var(--rx)');
      g+=lbl(X,118,`6–8 g/L range: ${Math.round(6*L)}–${Math.round(al)} g`);
      g+=`<rect x="${X}" y="128" width="${f1(230*al/64)}" height="12" rx="6" style="fill:var(--rx);opacity:.75"/>`}
    g+=lbl(X,176,'RCT, 105 people:','t-xs','font-weight:700;fill:var(--ink)')+lbl(X,190,'renal impairment or severe low')+lbl(X,203,'sodium in 11 without albumin')+lbl(X,216,'vs 1 with albumin');
    g+=lbl(X,240,'litres and grams: worked example only','t-xs','font-style:italic');
    return g}
  function sc5(u,t){let g=lbl(0,10,'TIPS FOR RECURRENT ASCITES','t-sm');
    g+=portalMap(102,138,.82,{pressure:.9-.6*u,flow:t*24,tips:u,spleen:.6,varix:.25,fib:4,labels:true}).svg;
    if(u>.25)g+=lbl(70,104,'TIPS stent','t-xs',`fill:var(--accent);font-weight:700;opacity:${f1(ramp(u,.25,.5))}`);
    const X=222,W=168,bar=(y,name,v,max,txt,col)=>lbl(X,y,name)+lbl(X+W,y,txt,'t-xs t-end','fill:var(--ink);font-weight:700')+`<rect x="${X}" y="${y+4}" width="${W}" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${X}" y="${y+4}" width="${f1(Math.max(0,W*v/max*u))}" height="9" rx="4.5" style="fill:${col}"/>`;
    g+=lbl(X,36,'1-year transplant-free survival','t-xs','font-weight:700;fill:var(--ink)');
    g+=bar(52,'covered TIPS',93,100,'93%','var(--rx)')+bar(78,'drain + albumin',52,100,'52%','var(--muted)');
    g+=lbl(X,116,'paracenteses, 62 people in all','t-xs','font-weight:700;fill:var(--ink)');
    g+=bar(132,'covered TIPS',32,320,'32','var(--rx)')+bar(158,'drain + albumin',320,320,'320','var(--muted)');
    g+=lbl(X,200,'Baveno VII: consider TIPS after','t-xs')+lbl(X,213,'≥3 large-volume paracenteses','t-xs')+lbl(X,226,'within 1 year','t-xs');
    return g}
  const SC=[sc0,sc1,sc2,sc3,sc4,sc5];
  const CL=[['Portal','pressure ↑'],['Gut arteries','widen'],['RAAS · SNS','· vasopressin'],['Kidneys keep','Na⁺ + water']];
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(S,t),F=fluid(t),G=grade(F);
    let s=`<defs>${marker('asArC','var(--muted)')}${marker('asArA','var(--accent)')}</defs>`;
    /* the chain */
    const CX=N?[52,149,246,343]:[352,456,560,664],CY=N?28:38,lit=[ramp(t,0,.06),ramp(t,.16,.2),ramp(t,.32,.36),ramp(t,.38,.44)];
    CX.forEach((x,i)=>{const on=lit[i]>.5;
      if(i<3)s+=`<line x1="${x+18}" y1="${CY}" x2="${CX[i+1]-21}" y2="${CY}" style="stroke:${lit[i+1]>.5?'var(--accent)':'var(--line)'};stroke-width:1.8" marker-end="url(#${lit[i+1]>.5?'asArA':'asArC'})"/>`;
      s+=`<circle cx="${x}" cy="${CY}" r="15" style="fill:${on?'var(--accent)':'var(--panel-2)'};stroke:var(--accent);stroke-width:1.4"/><text x="${x}" y="${CY+4.5}" class="t-mid" style="font:700 13px var(--mono);fill:${on?'var(--panel)':'var(--muted)'}">${i+1}</text>`;
      s+=`<text x="${x}" y="${CY+30}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${CL[i][0]}</text><text x="${x}" y="${CY+41}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${CL[i][1]}</text>`});
    /* the trunk */
    const tap=ramp(t,.69,.72)*(1-ramp(t,.82,.84)),A=N?{x:100,y:96,s:1}:{x:150,y:18,s:1.45};
    s+=abdomen(A.x,A.y,A.s,{fluid:F,tap,liver:true,fib:3+ramp(t,0,.12)}).svg;
    if(F>.03&&p>=2)s+=lbl(A.x,A.y+186*A.s,'ascites','t-xs t-mid','fill:var(--fluid);font-weight:700');
    if(tap>.5)s+=lbl(A.x-50*A.s,A.y+222*A.s,'drain','t-xs t-mid','fill:var(--fluid)');
    if(N){s+=lbl(200,118,'ASCITES (schematic)','t-sm')+lbl(200,146,G[0],'t-big','font-size:22px;fill:var(--fluid)')+lbl(200,164,G[1]);
      s+=`<rect x="200" y="182" width="180" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="200" y="182" width="${f1(180*F/.9)}" height="10" rx="5" style="fill:var(--fluid-fill)"/>`+lbl(200,206,'fluid in the belly');
      s+=lbl(200,240,'Step '+(p+1)+' of 6','t-xs','font-weight:700;fill:var(--ink)')+lbl(200,254,S[p].t)}
    else s+=lbl(A.x,350,F<.03?'No ascites yet':'Ascites: '+G[0],'t-lbl t-mid','fill:var(--fluid)')+lbl(A.x,366,G[1]||'fluid builds from step 3','t-xs t-mid');
    /* the scene for this step */
    const us=[ramp(t,0,.14),ramp(t,.16,.3),ramp(t,.32,.5),ramp(t,.52,.68),ramp(t,.7,.82),ramp(t,.86,.98)];
    s+=`<g transform="${N?'translate(10 330) scale(.95)':'translate(306 104)'}">`+SC[p](us[p],t)+'</g>';
    svg.innerHTML=s;setSt(p);
    $('#asRead').innerHTML=`<span>step <b>${p+1}/6</b></span><span>ascites <b>${G[0]}</b></span><span>${p<3?'mechanism':'treatment as published'}</span>`;
    $('#asNote').innerHTML=noteHTML(S[p]);
  }
  const stop=playWire(rg,$('#asPlay'),draw,26000,'%t:player.replay%','ascites');
  const setSt=stepWire($('#asSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- SBP: the neutrophil threshold ---- */
  const pr=$('#asPmn'),ps=$('#asPmnSvg'),rr=rng(42),PTS=[],RBC=[];
  while(PTS.length<160){const a=rr()*6.283,d=Math.sqrt(rr());PTS.push([Math.cos(a)*d,Math.sin(a)*d,rr()*6.283])}
  for(let i=0;i<36;i++){const a=rr()*6.283,d=Math.sqrt(rr());RBC.push([Math.cos(a)*d,Math.sin(a)*d])}
  function drawPmn(){const N=vb(ps,'440 300','400 330'),v=clamp(+pr.value||0,0,1000),C=N?[120,118,94]:[128,124,104];
    const id='asClipPmn';let g=`<clipPath id="${id}"><circle cx="${C[0]}" cy="${C[1]}" r="${C[2]}"/></clipPath><circle cx="${C[0]}" cy="${C[1]}" r="${C[2]}" style="fill:var(--fluid-soft);stroke:var(--muted);stroke-width:3"/><g clip-path="url(#${id})">`;
    RBC.forEach(([x,y])=>g+=`<circle cx="${f1(C[0]+x*C[2]*.94)}" cy="${f1(C[1]+y*C[2]*.94)}" r="4.5" style="fill:var(--artery);opacity:.18"/>`);
    const n=Math.round(v/1000*150);
    for(let i=0;i<n;i++){const [x,y,a]=PTS[i],cx=C[0]+x*C[2]*.9,cy=C[1]+y*C[2]*.9;
      g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="6" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:.8"/>`;
      for(let k=0;k<3;k++){const b=a+k*2.1;g+=`<circle cx="${f1(cx+Math.cos(b)*2.4)}" cy="${f1(cy+Math.sin(b)*2.4)}" r="1.7" style="fill:var(--dx)"/>`}}
    g+='</g>';
    const R=N?[232,388]:[256,428],over=v>=250;
    g+=`<text x="${R[0]}" y="${N?66:62}" class="t-sm">NEUTROPHILS (PMN)</text><text x="${R[0]}" y="${N?100:98}" class="t-big" style="font-size:${N?30:34}px;fill:${over?'var(--bad)':'var(--ink)'}">${v}</text><text x="${R[0]}" y="${N?118:118}" class="t-xs">cells per mm³ of fluid</text>`;
    g+=`<text x="${R[0]}" y="150" class="t-lbl" style="fill:${over?'var(--bad)':'var(--good)'}">${over?'At or above 250:':'Below 250:'}</text><text x="${R[0]}" y="166" class="t-xs">${over?'meets the published':'does not meet the'}</text><text x="${R[0]}" y="179" class="t-xs">${over?'SBP threshold':'SBP threshold'}</text>`;
    const y=N?262:262,x0=20,x1=N?380:420,X=w=>lerp(x0,x1,w/1000);
    g+=`<rect x="${x0}" y="${y-6}" width="${f1(X(250)-x0)}" height="12" rx="3" style="fill:var(--good-soft)"/><rect x="${f1(X(250))}" y="${y-6}" width="${f1(x1-X(250))}" height="12" rx="3" style="fill:var(--bad-soft)"/>`;
    [0,250,500,750,1000].forEach(w=>g+=`<text x="${f1(X(w))}" y="${y+22}" class="t-xs t-mid" style="${w===250?'fill:var(--bad);font-weight:700':''}">${w}</text>`);
    g+=`<line x1="${f1(X(250))}" x2="${f1(X(250))}" y1="${y-12}" y2="${y+10}" style="stroke:var(--bad);stroke-width:2"/><path d="M${f1(X(v)-6)} ${y-16}L${f1(X(v)+6)} ${y-16}L${f1(X(v))} ${y-6}Z" style="fill:var(--ink)"/>`;
    g+=`<text x="${f1(X(250)+6)}" y="${y-14}" class="t-xs" style="fill:var(--bad)">threshold</text>`;
    ps.innerHTML=g;
    const V=$('#asPmnV');V.className='verdict '+(over?'no':'yes');
    V.innerHTML=over?`${v} cells/mm³: at or above 250, the published threshold for SBP. In real care this is a medical emergency that is treated straight away. [[EASL2018Decomp]]`:`${v} cells/mm³: below 250, so the count alone does not meet the SBP threshold. [[EASL2018Decomp]]`}
  pr.addEventListener('input',drawPmn);drawPmn();

  /* ---- trial icon arrays ---- */
  function wireArms(btnSel,svgEl,arms,data,attr){let cur=0,stopA=null;
    const run=()=>{stopA&&stopA();const row=data[cur];stopA=animate(700,p=>asArms(svgEl,arms,row,ease(p),row.good))};
    $$(btnSel).forEach(b=>b.addEventListener('click',()=>{cur=+b.dataset[attr];$$(btnSel).forEach(o=>o.setAttribute('aria-pressed',o===b));run()}));
    asArms(svgEl,arms,data[0],1,data[0].good);
    redraws.ascites=(f=>()=>{f&&f();asArms(svgEl,arms,data[cur],1,data[cur].good)})(redraws.ascites)}
  wireArms('#m-ascites [data-so]',$('#asSortSvg'),['Cefotaxime alone','Cefotaxime + albumin'],AS_SORT,'so');
  wireArms('#m-ascites [data-cf]',$('#asConfSvg'),['Placebo + albumin','Terlipressin + albumin'],AS_CONF,'cf');

  /* ---- AKI teaching calculator ---- */
  const ab=$('#asAkiB'),ac=$('#asAkiC'),aw=$('#asAkiW'),ar=$('#asAkiR'),as=$('#asAkiSvg');
  function aki(){const b=+ab.value,c=+ac.value,w=aw.value,rrt=ar.checked;
    if(!(b>0)||!(c>0))return{err:true,b,c};
    const rise=c-b,ratio=c/b;let is=false;
    if(rrt)is=true;else if(w==='48')is=rise>=.3||ratio>=1.5;else if(w==='7')is=ratio>=1.5;
    let st=0;if(is)st=(rrt||ratio>3||c>=4)?3:ratio>2?2:1;
    return{b,c,rise,ratio,is,st,w,rrt,sub:st===1?(c<1.5?'1A':'1B'):''}}
  function drawAki(){const N=vb(as,'440 300','400 300'),r=aki();let g='';
    if(r.err){as.innerHTML=`<text x="20" y="60" class="t-lbl">Enter both creatinine values above zero.</text>`;$('#asAkiOut').innerHTML='';return}
    const mx=Math.max(6,r.c*1.15,r.b*3.3),y0=262,y1=34,Y=v=>y0-(y0-y1)*clamp(v/mx),x0=50,xr=N?250:270;
    g+=`<line x1="${x0}" x2="${x0}" y1="${y1}" y2="${y0}" class="axis"/><line x1="${x0}" x2="${xr}" y1="${y0}" y2="${y0}" class="axis"/>`;
    for(let v=0;v<=mx;v+=mx>12?4:mx>8?2:1)g+=`<text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`;
    g+=`<text x="${x0-36}" y="24" class="t-xs">mg/dl</text>`;
    const lines=[{v:r.b*1.5,l:'×1.5'},{v:r.b*2,l:'×2'},{v:r.b*3,l:'×3'},{v:4,l:'4.0'}];let lastY=1e9;
    lines.sort((a,b)=>a.v-b.v).forEach(L=>{if(L.v>mx)return;const y=Y(L.v);g+=`<line x1="${x0}" x2="${xr}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${L.l==='4.0'?'var(--bad)':'var(--muted)'};stroke-dasharray:4 3;opacity:.8"/>`;
      if(lastY-y>11){g+=`<text x="${xr+4}" y="${f1(y+3)}" class="t-xs" style="${L.l==='4.0'?'fill:var(--bad)':''}">${L.l}</text>`;lastY=y}});
    const bar=(x,v,lab,col)=>`<rect x="${x}" y="${f1(Y(v))}" width="56" height="${f1(y0-Y(v))}" rx="4" style="fill:${col}"/><text x="${x+28}" y="${f1(Y(v)-6)}" class="t-lbl t-mid">${v.toFixed(1)}</text><text x="${x+28}" y="${y0+16}" class="t-xs t-mid">${lab}</text>`;
    g+=bar(x0+24,r.b,'baseline','var(--kidney)')+bar(x0+110,r.c,'now',r.is?'var(--bad)':'var(--kidney)');
    const X=N?300:322,col=r.st?'var(--bad)':'var(--good)';
    g+=`<text x="${X}" y="60" class="t-sm">ICA-AKI</text><text x="${X}" y="${N?96:100}" class="t-big" style="font-size:${N?28:34}px;fill:${col}">${r.st?'Stage '+r.st+(r.sub?'':''):'No AKI'}</text>`;
    if(r.sub)g+=`<text x="${X}" y="${N?118:124}" class="t-lbl" style="fill:${col}">(${r.sub})</text>`;
    g+=`<text x="${X}" y="150" class="t-xs">rise ${r.rise>=0?'+':''}${r.rise.toFixed(1)} mg/dl</text><text x="${X}" y="164" class="t-xs">${r.ratio.toFixed(2)} × baseline</text>`;
    as.innerHTML=g;
    let why;
    if(r.rrt)why='Renal replacement therapy places AKI at stage 3.';
    else if(!r.is)why=r.w==='0'?'The rise falls outside the 48-hour and 7-day windows of the definition, so this tool does not label it AKI.':'The rise does not reach ≥0.3 mg/dl within 48 hours or ≥50% within 7 days.';
    else why=r.st===3?'More than 3 times baseline, or 4.0 mg/dl or more.':r.st===2?'More than 2 and up to 3 times baseline.':`A rise of ≥0.3 mg/dl or 1.5–2 times baseline. ${r.sub==='1A'?'Creatinine below 1.5 mg/dl: stage 1A.':'Creatinine 1.5 mg/dl or more: stage 1B.'}`;
    $('#asAkiOut').innerHTML=`<div class="verdict ${r.st?'no':'yes'}">${r.st?'Stage '+r.st+(r.sub?' ('+r.sub+')':''):'No AKI by these criteria'}: ${why}</div><p class="stage-cap">ICA-AKI as reproduced in EASL 2018: AKI is a creatinine rise ≥0.3 mg/dl within 48 h or ≥50% within 7 days; stage 1 ≥0.3 mg/dl or 1.5–2-fold, stage 2 &gt;2–3-fold, stage 3 &gt;3-fold or ≥4.0 mg/dl, or renal replacement. 1A/1B split at 1.5 mg/dl. [[EASL2018Decomp,Huelin2017CGH]]</p>`}
  [ab,ac].forEach(e=>e.addEventListener('input',drawAki));[aw,ar].forEach(e=>e.addEventListener('change',drawAki));
  redraws.ascites=(f=>()=>{f&&f();drawPmn();drawAki()})(redraws.ascites);
  drawAki();
};
