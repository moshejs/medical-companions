/* =============== 3.2 Lactate, cultures, procalcitonin & tests =============== */
const TS_STEPS=[
 {from:0,at:.1,k:'Step 1 · the usual route',t:'Oxygen in, little lactate',
  txt:`Cells get energy from glucose. Glycolysis splits it into pyruvate, which the cell normally burns using oxygen, and only a little leaves as lactate. The drawing is schematic: a muscle cell under a capillary, with the blood lactate tube on the right. Lactate is a marker of how stressed the cells are, and its causes are debated. [[GarciaAlvarez2014]]`,
  pt:`Lactate is a chemical in the blood. A little is always there. A high level can mean the body's tissues are struggling, and higher levels go with more serious illness.`},
 {from:.2,at:.32,k:'Step 2 · the classic view',t:'Too little oxygen',
  txt:`When blood flow and oxygen delivery fall, more pyruvate is turned into lactate (anaerobic glycolysis) and blood lactate rises. The ESICM task force defines circulatory shock as "a life-threatening, generalized form of acute circulatory failure associated with inadequate oxygen utilization by the cells", with cellular dysoxia and raised lactate. Lactate is "typically >2 mEq/L (or mmol/L) in shock states". [[Cecconi2014ESICM]]`,
  pt:`When blood flow is poor, cells run short of oxygen and make more lactate, so the level in the blood rises.`,
  hook:`Shock is defined by inadequate cellular oxygen use, not by low blood pressure alone. Lactate is typically above 2 mmol/L. [[Cecconi2014ESICM]]`},
 {from:.4,at:.52,k:'Step 3 · a stress signal too',t:'Adrenaline makes lactate',
  txt:`James and colleagues (1999) proposed that much of the lactate in injury or sepsis comes from aerobic glycolysis in skeletal muscle, driven by adrenaline acting on the Na⁺/K⁺ pump, rather than from oxygen debt <span class="ev hyp">Hypothesis</span>, since supported. In thigh muscle of 14 people in septic shock, microdialysis found muscle lactate a mean 1.98 mmol/L above arterial lactate. Ouabain, a Na⁺/K⁺-ATPase blocker, stopped the excess, and the lactate-to-pyruvate ratio did not change. A 2014 review concluded that stress-driven aerobic glycolysis explains sepsis-associated hyperlactataemia better than hypoxia alone <span class="ev est">Established</span> as a marker; the mechanism is still debated. [[James1999Lactate,Levy2005Lactate,GarciaAlvarez2014]]`,
  pt:`Stress hormones such as adrenaline make muscles burn sugar faster, and this also raises lactate, even when there is enough oxygen. So a high lactate is a warning sign, but it does not always mean the body is short of oxygen.`,
  hook:`High lactate in resuscitated sepsis is not proof of oxygen debt: adrenaline-driven Na⁺/K⁺-ATPase activity in muscle makes lactate too, and ouabain abolishes it. [[Levy2005Lactate]]`},
 {from:.6,at:.72,k:'Step 4 · what the number predicts',t:'Higher lactate, higher risk',
  txt:`In 1,278 admitted ED patients with infection, in-hospital mortality was 4.9% at a venous lactate of 0–2.5 mmol/L, 9.0% at 2.5–4.0 and 28.4% at 4.0 or more. A lactate of 4.0 or more was 36% sensitive and 92% specific for death. In 830 ED adults with severe sepsis, intermediate and high lactate were linked to mortality independent of shock. In the SSC database (28,150 patients), mortality was 44.5% with lactate above 4 mmol/L plus hypotension, against 29% with neither. SSC 2021 suggests measuring lactate in adults with suspected sepsis (weak, low quality), but lactate "alone is neither sensitive nor specific enough to rule-in or rule-out the diagnosis on its own". [[Shapiro2005Lactate,Mikkelsen2009Lactate,Casserly2015Lactate,Evans2021SSC]]`,
  pt:`On average, a higher lactate goes with more serious illness. These are figures for large groups of patients, not a prediction for any one person.`,
  hook:`Sepsis-3 septic shock = a vasopressor needed for MAP ≥65 mm Hg AND lactate >2 mmol/L (>18 mg/dL) without hypovolaemia; hospital mortality above 40%. [[Singer2016Sepsis3]]`},
 {from:.8,at:.9,k:'Step 5 · watching it fall',t:'Lactate as a guide',
  txt:`SSC 2021 suggests guiding resuscitation to decrease serum lactate when it is raised (weak, low quality). In the LACTATE trial (348 ICU patients) the target was a fall of 20% or more every 2 h for 8 h: hospital mortality was 33.9% against 43.5% (P = 0.067; adjusted HR 0.61). Jones 2010 found lactate clearance of at least 10% noninferior to an ScvO₂ target (17% vs 23% mortality). ANDROMEDA-SHOCK compared capillary refill targeting with lactate targeting: 34.9% vs 43.4% at 28 days, not significant (P = .06). [[Evans2021SSC,Jansen2010Lactate,Jones2010LactateClearance,Hernandez2019ANDROMEDA]]`,
  pt:`Teams may repeat the lactate test to see how the body responds to treatment. Trials have also tried steering treatment by how fast colour returns after a fingertip is pressed.`,
  hook:`LACTATE trial target: a ≥20% fall every 2 h for the first 8 h. Jones 2010: ≥10% clearance. [[Jansen2010Lactate,Jones2010LactateClearance]]`}
];
const TS_CAP=[
 ['Schematic muscle cell: glucose → pyruvate → burned with oxygen','Only a little pyruvate becomes lactate','Blood lactate stays low'],
 ['Blood flow falls: less oxygen reaches the cell','More pyruvate becomes lactate (anaerobic glycolysis)','ESICM: lactate typically >2 mmol/L in shock'],
 ['Oxygen is back, but adrenaline drives the Na⁺/K⁺ pump','Muscle makes lactate aerobically: 1.98 mmol/L above arterial','So a high lactate is not proof of oxygen debt']];
const TS_SHAP=[['0–2.5 mmol/L',4.9,'43 of 877'],['2.5–4.0',9.0,'24 of 267'],['4.0 or more',28.4,'38 of 134']];
const TS_CLR=[[0,5.5],[2,4.2],[4,3.1],[6,2.4],[8,1.8]];
const TS_CLRf=monoFn(TS_CLR);
const TS_BANDS=[{from:0,to:2,col:'var(--good)',label:'≤2'},{from:2,to:4,col:'var(--warn)',label:'>2'},{from:4,to:10,col:'var(--bad)',label:'≥4'}];
function tsState(t){const o2=1-.75*ramp(t,.2,.32)+.75*ramp(t,.4,.47),adr=ramp(t,.42,.52)*(1-.6*ramp(t,.84,.98));
  return {o2,adr,lf:clamp(.12+(1-o2)*.7+adr*.4,0,.85)}}
function tsLac(t,p,lp){if(p<=2)return 1+3.6*ease(ramp(t,.22,.36))-1*ease(ramp(t,.42,.54));
  if(p===3){const v=[1.5,3.2,5.5],k=lp*3,i=Math.min(2,Math.floor(k)),fr=k-i;return lerp(i?v[i-1]:3.6,v[i],ease(clamp(fr*3)))}
  return TS_CLRf(clamp(lp*1.15)*8)}
/* the schematic cell: capillary on top, cell in the middle, blood strip below */
function tsCell(P,S,t,lac,N){const X=f=>P.x+P.w*f,cy0=P.y+8,ch=34,mt=P.y+56,mb=P.y+P.h-42;
  let s=`<rect x="${P.x}" y="${cy0}" width="${P.w}" height="${ch}" rx="15" style="fill:var(--blood-soft);stroke:var(--wall);stroke-width:2"/>`;
  const nrc=Math.round(3+9*S.o2);
  for(let i=0;i<nrc;i++){const u=((t*5)+i/12)%1,x=P.x+10+u*(P.w-20),y=cy0+ch/2+Math.sin(i*2.1)*6;
    s+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="7" ry="4.6" style="fill:var(--deoxy)"/><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="7" ry="4.6" style="fill:var(--oxy);opacity:${f1(S.o2)}"/>`}
  s+=`<text x="${P.x+8}" y="${cy0-1}" class="t-xs" style="fill:var(--ink)">capillary</text>`;
  if(S.o2<.7)s+=`<text x="${P.x+P.w-6}" y="${cy0-1}" class="t-xs t-end" style="fill:var(--bad);font-weight:700;opacity:${f1(ramp(.7-S.o2,0,.2))}">less flow, less oxygen</text>`;
  /* cell */
  s+=`<rect x="${P.x+10}" y="${mt}" width="${P.w-20}" height="${mb-mt}" rx="24" style="fill:var(--cell);stroke:var(--muted);stroke-width:1.4"/>`;
  s+=`<text x="${P.x+P.w-24}" y="${mt+16}" class="t-xs t-end">muscle cell (schematic)</text>`;
  /* blood strip */
  const by=P.y+P.h-32;s+=`<rect x="${P.x}" y="${by}" width="${P.w}" height="30" rx="10" style="fill:var(--blood-soft);opacity:.55"/><text x="${P.x+8}" y="${by+19}" class="t-xs" style="fill:var(--ink)">blood</text>`;
  const nl=Math.round(lac*3.2);for(let i=0;i<nl;i++){const u=((t*1.5)+i*.137)%1;s+=`<circle cx="${f1(P.x+46+u*(P.w-60))}" cy="${f1(by+8+((i*7)%15))}" r="2.6" style="fill:var(--lactate)"/>`}
  /* nodes and routes */
  const G0=[X(.14),cy0+ch/2],G1=[X(.14),mt],Py=[X(.36),P.y+128],Mi=[X(.7),P.y+112],L0=[X(.48),mb],L1=[X(.56),by+16];
  s+=`<path d="M${f1(G1[0])} ${f1(G1[1])}Q${f1(G1[0])} ${f1(Py[1])} ${f1(Py[0]-9)} ${f1(Py[1])}" class="arrow" marker-end="url(#tsAr)"/>`;
  s+=`<path d="M${f1(Py[0]+9)} ${f1(Py[1]-3)}L${f1(Mi[0]-P.w*.12)} ${f1(Mi[1])}" class="arrow" marker-end="url(#tsAr)" style="opacity:${f1(.35+.65*S.o2)}"/>`;
  s+=`<path d="M${f1(Py[0]+4)} ${f1(Py[1]+9)}L${f1(L0[0])} ${f1(L0[1]-2)}" class="arrow" marker-end="url(#tsAr)" style="stroke:var(--lactate);stroke-width:${f1(1.4+S.lf*3)}"/>`;
  s+=`<text x="${f1(G1[0]+6)}" y="${f1(mt+14)}" class="t-xs" style="fill:var(--ink)">glucose</text><text x="${f1(G1[0]+8)}" y="${f1(Py[1]-18)}" class="t-xs">glycolysis</text>`;
  s+=`<circle cx="${f1(Py[0])}" cy="${f1(Py[1])}" r="8" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.4"/><text x="${f1(Py[0])}" y="${f1(Py[1]+22)}" class="t-xs t-mid" style="fill:var(--ink)">pyruvate</text>`;
  const mrx=P.w*.12;s+=`<ellipse cx="${f1(Mi[0])}" cy="${f1(Mi[1])}" rx="${f1(mrx)}" ry="22" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.6;opacity:${f1(.45+.55*S.o2)}"/>`;
  let cr=`M${f1(Mi[0]-mrx*.8)} ${f1(Mi[1])}`;for(let k=1;k<=8;k++)cr+=`L${f1(Mi[0]-mrx*.8+mrx*1.6*k/8)} ${f1(Mi[1]+(k%2?-12:12))}`;
  s+=`<path d="${cr}" style="fill:none;stroke:var(--rx);stroke-width:1.2;opacity:${f1(.45+.55*S.o2)}"/><text x="${f1(Mi[0])}" y="${f1(Mi[1]+36)}" class="t-xs t-mid" style="fill:var(--rx)">${N?'uses oxygen':'mitochondrion: uses oxygen'}</text>`;
  s+=`<text x="${f1(L0[0]+8)}" y="${f1(L0[1]-12)}" class="t-xs" style="fill:var(--lactate);font-weight:700">→ lactate</text>`;
  /* oxygen diffusing to the mitochondrion */
  const no=Math.round(6*S.o2);for(let i=0;i<no;i++){const u=((t*6)+i/6)%1,a=[X(.5+.07*i),cy0+ch],x=lerp(a[0],Mi[0],u),y=lerp(a[1],Mi[1],u);
    s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.4" style="fill:var(--oxy);opacity:${f1(1-u*.6)}"/>`}
  if(no)s+=`<text x="${f1(X(.5)+4)}" y="${f1(cy0+ch+12)}" class="t-xs" style="fill:var(--oxy);font-weight:700">O₂</text>`;
  /* glucose → pyruvate → mitochondrion or lactate */
  const na=9+Math.round(S.adr*7);
  for(let i=0;i<na;i++){const z=(t*7)+i/16,ph=z%1,c=Math.floor(z),toL=((i*.618+c*.37)%1)<S.lf;let p,col='var(--gold)';
    if(ph<.15)p=[lerp(G0[0],G1[0],ph/.15),lerp(G0[1],G1[1],ph/.15)];
    else if(ph<.5){const u=(ph-.15)/.35;p=[lerp(G1[0],Py[0],u*u),lerp(G1[1],Py[1],Math.sqrt(u))]}
    else if(toL){col='var(--lactate)';if(ph<.8){const u=(ph-.5)/.3;p=[lerp(Py[0],L0[0],u),lerp(Py[1],L0[1],u)]}else{const u=(ph-.8)/.2;p=[lerp(L0[0],L1[0],u),lerp(L0[1],L1[1],u)]}}
    else{col='var(--rx)';const u=(ph-.5)/.4;if(u>1)continue;p=[lerp(Py[0],Mi[0],u),lerp(Py[1],Mi[1],u)]}
    s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.4" style="fill:${col};stroke:var(--panel);stroke-width:.8"/>`}
  /* adrenaline and the Na+/K+ pump */
  if(S.adr>.01){const Pu=[X(.84),mb],op=f1(S.adr);
    s+=`<g style="opacity:${op}"><circle cx="${f1(Pu[0])}" cy="${f1(Pu[1])}" r="10" style="fill:var(--panel);stroke:var(--accent);stroke-width:2"/>`;
    const a=t*900*S.adr*Math.PI/180;s+=`<path d="M${f1(Pu[0]+Math.cos(a)*6)} ${f1(Pu[1]+Math.sin(a)*6)}A6 6 0 1 1 ${f1(Pu[0]+Math.cos(a+4.4)*6)} ${f1(Pu[1]+Math.sin(a+4.4)*6)}" style="fill:none;stroke:var(--accent);stroke-width:1.8"/>`;
    s+=`<text x="${f1(Pu[0])}" y="${f1(Pu[1]-15)}" class="t-xs t-mid" style="fill:var(--accent);font-weight:700">Na⁺/K⁺ pump</text>`;
    s+=`<path d="M${f1(Pu[0]-12)} ${f1(Pu[1]-6)}Q${f1(X(.6))} ${f1(Py[1]+40)} ${f1(Py[0]+12)} ${f1(Py[1]+4)}" style="fill:none;stroke:var(--accent);stroke-width:1.4;stroke-dasharray:4 3" marker-end="url(#tsAr2)"/>`;
    s+=`<text x="${f1(X(.62))}" y="${f1(Py[1]+44)}" class="t-xs t-mid" style="fill:var(--accent)">faster glycolysis</text>`;
    for(let i=0;i<5;i++){const u=((t*9)+i/5)%1,x=lerp(P.x+P.w-8,Pu[0],u),y=lerp(by+18,Pu[1]+4,u),z=3.6;
      s+=`<path d="M${f1(x)} ${f1(y-z)}L${f1(x+z)} ${f1(y)}L${f1(x)} ${f1(y+z)}L${f1(x-z)} ${f1(y)}Z" style="fill:var(--accent)"/>`}
    s+=`<text x="${P.x+P.w-6}" y="${by+27}" class="t-xs t-end" style="fill:var(--accent);font-weight:700">adrenaline</text></g>`}
  return s}
inits.tests=()=>{
  /* ---- 1. why lactate rises ---- */
  const svg=$('#tsSvg'),rg=$('#tsT');
  function draw(t){const N=vb(svg,'720 400','400 470'),p=phaseOf(TS_STEPS,t),st=TS_STEPS[p],nx=p<4?TS_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx),S=tsState(t),lac=tsLac(t,p,lp);
    const L=N?{P:{x:12,y:12,w:286,h:262},M:{x:318,y:40,w:20,h:206},K:{x:12,y:294,w:376,h:168}}:{P:{x:12,y:12,w:440,h:262},M:{x:478,y:34,w:26,h:222},K:{x:12,y:286,w:696,h:106}};
    let s=`<defs>${marker('tsAr','var(--muted)')}${marker('tsAr2','var(--accent)')}</defs>`;
    s+=`<g style="opacity:${f1(1-.5*ramp(t,.58,.62))}">`+tsCell(L.P,S,t,lac,N)+`</g>`;
    const M=L.M;s+=lactateMeter(M.x,M.y,M.w,M.h,lac,10,{bands:TS_BANDS,val:true,unit:N?'':'mmol/L',label:N?'mmol/L':'blood lactate'});
    if(!N){const Y=v=>M.y+M.h-M.h*v/10,tx=M.x+M.w+42;
      [[2,'2: Sepsis-3 shock criterion','(with a vasopressor, after fluids)'],[4,'4: Hour-1 bundle fluid trigger','(with hypotension or alone)']].forEach(([v,a,b])=>{
        s+=`<line x1="${M.x+M.w+30}" x2="${tx-2}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" style="stroke:var(--line)"/><text x="${tx}" y="${f1(Y(v)+3)}" class="t-xs" style="fill:var(--ink)">${a}</text><text x="${tx}" y="${f1(Y(v)+14)}" class="t-xs">${b}</text>`});
      s+=`<text x="${tx}" y="${f1(Y(9)+3)}" class="t-xs">thresholds as published</text>`}
    const K=L.K;s+=`<rect x="${K.x}" y="${K.y}" width="${K.w}" height="${K.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    if(p<=2)TS_CAP[p].forEach((l,j)=>{s+=`<text x="${K.x+12}" y="${K.y+(N?26+j*24:24+j*26)}" class="${N?'t-xs':'t-sm'}" style="${j===0?'fill:var(--ink);font-weight:600':''}">${l}</text>`});
    else if(p===3){const bx=K.x+(N?96:130),bw=N?K.w-150:330,sel=Math.min(2,Math.floor(lp*3));
      s+=`<text x="${K.x+12}" y="${K.y+16}" class="t-xs" style="fill:var(--ink);font-weight:600">In-hospital deaths by lactate, 1,278 ED patients with infection (Shapiro 2005)</text>`;
      TS_SHAP.forEach(([lab,v,n],i)=>{const y=K.y+28+i*(N?24:22),g=ease(ramp(lp,i*.28,i*.28+.2)),on=i===sel;
        s+=`<text x="${bx-8}" y="${y+11}" class="t-xs t-end" style="${on?'fill:var(--ink);font-weight:700':''}">${lab}</text><rect x="${bx}" y="${y}" width="${bw}" height="14" rx="3" style="fill:var(--panel-2)"/>`;
        s+=`<rect x="${bx}" y="${y}" width="${f1(bw*v/40*g)}" height="14" rx="3" style="fill:${['var(--good)','var(--warn)','var(--bad)'][i]};opacity:${on?1:.6}"/>`;
        s+=`<text x="${f1(bx+bw*v/40*g+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink);opacity:${f1(g)}">${v}%${N?'':' ('+n+')'}</text>`});
      const cy=N?K.y+112:K.y+30,cx=N?K.x+12:K.x+490;
      ['SSC database, 28,150 patients:','44.5% died with lactate >4 + hypotension','29% with neither (Casserly 2015)'].forEach((l,j)=>{s+=`<text x="${cx}" y="${cy+j*15}" class="t-xs" style="${j===0?'fill:var(--ink);font-weight:600':''}">${l}</text>`})}
    else{const hr=clamp(lp*1.15)*8,cx=K.x+(N?34:44),cw=N?K.w-50:380,cyy=K.y+12,chh=N?92:K.h-34;
      const C=tcurve(cx,cyy,cw,chh,TS_CLR,{x0:0,x1:8,y0:0,y1:6,upto:hr,ref:2,refLabel:'2 mmol/L',dot:true});s+=C.svg;
      let d='';[0,2,4,6,8].forEach((h,i)=>{const v=5.5*Math.pow(.8,i);d+=(i?'L':'M')+f1(C.X(h))+' '+f1(C.Y(v))});
      s+=`<path d="${d}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:3 4"/>`;
      [0,2,4,6,8].forEach(h=>{s+=`<text x="${f1(C.X(h))}" y="${f1(cyy+chh+12)}" class="t-xs t-mid">${h} h</text>`});
      [0,2,4,6].forEach(v=>{s+=`<text x="${cx-4}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v}</text>`});
      const tx=N?K.x+12:K.x+446,ty=N?K.y+128:K.y+24;
      (N?['solid: an illustrative patient · dashed: 20% fall every 2 h','LACTATE trial target; ≥10% clearance in Jones 2010']
        :['solid: an illustrative patient','dashed: a 20% fall every 2 h,','the LACTATE trial target for 8 h','Jones 2010: ≥10% clearance target','ANDROMEDA-SHOCK: capillary refill vs lactate']).forEach((l,j)=>{s+=`<text x="${tx}" y="${ty+j*(N?14:15)}" class="t-xs" style="${j===0?'fill:var(--ink)':''}">${l}</text>`})}
    svg.innerHTML=s;setSt(p);
    $('#tsRead').innerHTML=`<span>step <b>${p+1} of 5</b></span><span>lactate shown <b>${lac.toFixed(1)} mmol/L</b></span><span>oxygen supply <b>${S.o2>.8?'normal':'reduced'}</b></span><span>adrenaline <b>${S.adr>.3?'high':'low'}</b></span>`;
    $('#tsNote').innerHTML=noteHTML(st)}
  const stop=playWire(rg,$('#tsPlay'),draw,30000,'%t:player.replay%','tests');
  const setSt=stepWire($('#tsSteps'),TS_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- 2. lactate thresholds explainer ---- */
  const ls=$('#tlSvg'),lv=$('#tlV'),lc=$('#tlVaso');
  function drawL(){const v=+lv.value,N=vb(ls,'720 170','400 236'),x0=N?20:150,x1=N?380:700,X=u=>x0+(x1-x0)*clamp(u/10),y1=N?62:56,y2=N?168:122,vs=lc.checked;
    $('#tlOut').textContent=v.toFixed(1);
    let s='';
    if(!N){s+=`<text x="12" y="${y1+4}" class="t-xs" style="fill:var(--ink);font-weight:600">Published thresholds</text><text x="12" y="${y2+4}" class="t-xs" style="fill:var(--ink);font-weight:600">Shapiro 2005:</text><text x="12" y="${y2+16}" class="t-xs">in-hospital deaths</text>`}
    else{s+=`<text x="${x0}" y="14" class="t-xs" style="fill:var(--ink);font-weight:600">Published thresholds</text><text x="${x0}" y="${y2-26}" class="t-xs" style="fill:var(--ink);font-weight:600">Shapiro 2005: in-hospital deaths</text>`}
    [[0,2,'var(--good-soft)'],[2,4,'var(--warn-soft)'],[4,10,'var(--bad-soft)']].forEach(([a,b,c])=>{s+=`<rect x="${f1(X(a))}" y="${y1-10}" width="${f1(X(b)-X(a))}" height="20" style="fill:${c}"/>`});
    for(let k=0;k<=10;k++)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${y1+10}" y2="${y1+14}" class="axis"/><text x="${f1(X(k))}" y="${y1+24}" class="t-xs t-mid">${k}</text>`;
    s+=`<text x="${x1}" y="${y1+36}" class="t-xs t-end">mmol/L</text>`;
    [[2,N?'2: Sepsis-3':'2: Sepsis-3 septic shock criterion'],[4,N?'4: Hour-1 fluids':'4: Hour-1 bundle fluid trigger']].forEach(([k,l],i)=>{const yy=y1-16;
      s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${yy-8}" y2="${y1+10}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(i?X(k)+4:X(k)-4)}" y="${yy}" class="t-xs${i?'':' t-end'}" style="fill:var(--ink)">${l}</text>`});
    const zi=v<2.5?0:v<4?1:2;
    TS_SHAP.forEach(([lab,m],i)=>{const a=[0,2.5,4][i],b=[2.5,4,10][i],on=i===zi;
      s+=`<rect x="${f1(X(a)+1)}" y="${y2-10}" width="${f1(X(b)-X(a)-2)}" height="22" rx="4" style="fill:${['var(--good-soft)','var(--warn-soft)','var(--bad-soft)'][i]};stroke:${on?'var(--ink)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      const w=X(b)-X(a);s+=`<text x="${f1((X(a)+X(b))/2)}" y="${y2+4}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${w<60?m.toFixed(1)+'%':m.toFixed(1)+'% died'}</text>`});
    s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y1-12}" y2="${y2+14}" style="stroke:var(--lactate);stroke-width:2.4"/><path d="M${f1(X(v)-6)} ${y2+22}L${f1(X(v)+6)} ${y2+22}L${f1(X(v))} ${y2+14}Z" style="fill:var(--lactate)"/>`;
    ls.innerHTML=s;
    const shock=v>2&&vs;
    const verdict=shock?`<div class="verdict no">Lactate above 2 mmol/L with a vasopressor needed after fluids: this matches the Sepsis-3 clinical criteria for septic shock, as published.</div>`
      :v>2?`<div class="verdict maybe">Above 2 mmol/L. On its own this does not meet the Sepsis-3 septic shock criteria, which also need a vasopressor for MAP ≥65 mm Hg after fluids.</div>`
      :`<div class="verdict yes">2 mmol/L or below: under the Sepsis-3 lactate criterion. A normal lactate does not rule sepsis out.</div>`;
    $('#tlNote').innerHTML=`<div class="kicker">Teaching result (not a diagnosis)</div><div class="big-num">${v.toFixed(1)} <span style="font-size:16px">mmol/L</span></div>${verdict}
      <p>Sepsis-3 identifies septic shock by a vasopressor requirement to keep MAP at 65 mm Hg or more <i>and</i> a serum lactate above 2 mmol/L (&gt;18 mg/dL) without hypovolaemia, a combination that carried hospital mortality above 40%. [[Singer2016Sepsis3]]</p>
      <p>In Shapiro 2005 (1,278 ED patients with infection), ${['4.9% of people with a lactate of 0–2.5 mmol/L','9.0% of people with a lactate of 2.5–4.0 mmol/L','28.4% of people with a lactate of 4.0 mmol/L or more'][zi]} died in hospital. That is a figure for a group of patients, not a prediction for one person. ${zi===2?'A lactate of 4.0 or more was 36% sensitive and 92% specific for death in hospital.':''} [[Shapiro2005Lactate]]</p>
      ${v>=4?`<p>The 2018 Hour-1 bundle lists "rapid administration of 30 mL/kg crystalloid for hypotension or lactate ≥4 mmol/L", quoted as published. [[Wang2021Hour1,Levy2018Bundle]]</p>`:v>2?`<p>The Hour-1 bundle says to "remeasure lactate level if initial lactate is &gt;2 mmol/L", quoted as published. [[Wang2021Hour1,Levy2018Bundle]]</p>`:''}`}
  lv.addEventListener('input',drawL);lc.addEventListener('change',drawL);drawL();
  {const pr=redraws.tests;redraws.tests=()=>{pr&&pr();drawL()}}

  /* ---- 3. blood cultures ---- */
  const TC_STEPS=[
   {from:0,at:.12,k:'Scene 1 · how many sets',t:'Two sets, before antibiotics',
    txt:`SSC 2021 restates its 2016 best-practice statement: routine cultures, including blood, are taken before antimicrobials "if it results in no substantial delay in the start of antimicrobials (i.e. &lt; 45 min)". In adult inpatients with 3 or more cultures in 24 h, the first detected 73.1% of bloodstream infections, two 89.7%, three 98.2% and four 99.8%: two cultures in 24 h detect about 90%, and up to four may be needed for more than 99%. [[Evans2021SSC,Lee2007Cultures]]`,
    pt:`Blood cultures are blood samples put into bottles to see whether germs grow. Taking more than one set makes it more likely that a germ is found if one is there.`,
    hook:`Two sets detect about 90% of bloodstream infections; three about 98%. [[Lee2007Cultures]]`},
   {from:.2,at:.32,k:'Scene 2 · antibiotics first',t:'Antibiotics lower the yield',
    txt:`In 325 ED adults with severe sepsis, blood cultures drawn before antimicrobials were positive in 31.4%. Cultures drawn a median 70 minutes after antimicrobials were positive in 19.4%, so post-antimicrobial cultures were only 52.9% sensitive. SMFM 2023 also recommends cultures before antimicrobials "as long as there are no substantial delays in timely administration of antibiotics". [[Cheng2019Cultures,SMFM2023Sepsis]]`,
    pt:`Antibiotics make germs harder to grow in the lab, so cultures are taken first when this can be done quickly. Antibiotics should not wait for the results.`,
    hook:`Cultures drawn after antibiotics are positive about 40% less often (31.4% → 19.4%). [[Cheng2019Cultures]]`},
   {from:.4,at:.52,k:'Scene 3 · contamination',t:'A false alarm from the skin',
    txt:`Contaminated blood cultures (false positives) range from 1% to more than 10% of all results. Older guidance set ≤3% as an acceptable rate, though the evidence for that target is debated. ASM's 2024 guideline found that chlorhexidine skin preparation, diversion devices, sterile technique, phlebotomy teams and education each lowered contamination, by about 40–60% together. False positives lead to unnecessary antibiotics, higher costs and delay in finding the true cause. [[Sautter2024Contamination,Doern2019Contamination]]`,
    pt:`Sometimes germs from the skin get into the bottle. The test then looks positive when there is no blood infection, which can lead to antibiotics that are not needed.`,
    hook:`Traditional acceptable contamination rate: ≤3%. [[Sautter2024Contamination]]`},
   {from:.6,at:.72,k:'Scene 4 · who is likely to be bacteraemic',t:'Pre-test probability',
    txt:`In a meta-analysis of 35 studies (4,566 bacteraemic episodes), the chance of bacteraemia ranged from about 2% in cellulitis to 69% in septic shock. A temperature of 38 °C or more had a likelihood ratio of 1.9 and isolated leukocytosis below 1.7, while shaking chills were more informative (4.7). [[Coburn2012Bacteremia]]`,
    pt:`How likely a blood infection is depends on how ill someone is. A fever alone says less than people expect.`,
    hook:`Shaking chills LR 4.7; fever ≥38 °C LR 1.9; leukocytosis LR &lt;1.7. [[Coburn2012Bacteremia]]`},
   {from:.8,at:.9,k:'Scene 5 · naming the germ',t:'Faster identification',
    txt:`In a randomised trial of 617 patients with positive blood culture bottles, rapid multiplex PCR identified the organism 1.3 h after the Gram stain, against 22.3 h with standard processing; fewer contaminants were treated, but mortality, length of stay and cost did not differ. A meta-analysis of 31 studies linked molecular rapid testing to lower mortality only with a stewardship programme <span class="ev early">Early evidence</span>. T2 magnetic resonance testing named Candida species from whole blood in a mean 4.4 h, against 2–5 days for culture. [[Banerjee2015rmPCR,Timbrook2017mRDT,Mylonakis2015T2]]`,
    pt:`Newer gene-based tests can name the germ in hours instead of a day or more, which helps doctors choose the right antibiotic sooner.`,
    hook:`rmPCR: organism named 1.3 h vs 22.3 h after Gram stain, but no mortality difference in the RCT. [[Banerjee2015rmPCR]]`}];
  const TC_CAP=[
   ['Lee 2007: share of bloodstream infections found by 1, 2, 3 and 4 cultures in 24 h','SSC 2021: cultures first only if no substantial delay (< 45 min)','Bottles are schematic'],
   ['Cheng 2019, 325 ED adults with severe sepsis','Positive before antimicrobials: 31.4% · after (median 70 min): 19.4%','Each grid shows 100 people'],
   ['Contamination: 1% to more than 10% of all blood culture results','Traditional acceptable rate ≤3% (evidence debated)','Prevention bundles cut contamination by about 40–60%'],
   ['Coburn 2012: 35 studies, 4,566 bacteraemic episodes','Pre-test probability ~2% (cellulitis) to 69% (septic shock)','Likelihood ratios: above 1 raises the probability'],
   ['Banerjee 2015: 617 patients with positive bottles','Organism named 22.3 h (standard) vs 1.3 h (rapid PCR) after Gram stain','T2 for Candida: 4.4 h vs 2–5 days for culture']];
  const tsv=$('#tcSvg'),trg=$('#tcT');
  const bottle=(x,y,s,lev,o={})=>{const w=22*s,h=40*s;let g=`<rect x="${f1(x-6*s)}" y="${f1(y)}" width="${f1(12*s)}" height="${f1(6*s)}" rx="${f1(2*s)}" style="fill:${o.cap||'var(--dx)'}"/><rect x="${f1(x-4*s)}" y="${f1(y+6*s)}" width="${f1(8*s)}" height="${f1(6*s)}" style="fill:var(--panel);stroke:var(--device);stroke-width:1"/>`;
    g+=`<rect x="${f1(x-w/2)}" y="${f1(y+12*s)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(5*s)}" style="fill:var(--panel);stroke:var(--device);stroke-width:1.3"/>`;
    const lh=(h-4*s)*clamp(lev);if(lh>.5)g+=`<rect x="${f1(x-w/2+2*s)}" y="${f1(y+12*s+h-2*s-lh)}" width="${f1(w-4*s)}" height="${f1(lh)}" rx="${f1(3*s)}" style="fill:${o.col||'var(--blood-soft)'};stroke:var(--clot);stroke-width:.6"/>`;
    if(o.bug)g+=bacterium(x,y+12*s+h*.65,9*s,{kind:'coccus',op:o.bug});
    if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+12*s+h+12)}" class="t-xs t-mid" style="fill:var(--ink)">${o.label}</text>`;return g};
  function tcScene(p,B,lp,N){let s='';const cx=B.x+B.w/2;
    if(p===0){const n=4,gw=N?B.w/4:110,x0=N?B.x+gw/2:B.x+250,DET=[73.1,89.7,98.2,99.8];
      if(!N){s+=`<text x="${B.x+12}" y="${B.y+22}" class="t-lbl">Before antibiotics</text>`;
        s+=`<rect x="${B.x+12}" y="${B.y+40}" width="96" height="16" rx="4" style="fill:var(--dx)"/><text x="${B.x+60}" y="${B.y+52}" class="t-xs t-mid" style="fill:var(--on-brand)">cultures</text>`;
        s+=`<rect x="${B.x+112}" y="${B.y+40}" width="96" height="16" rx="4" style="fill:var(--rx)"/><text x="${B.x+160}" y="${B.y+52}" class="t-xs t-mid" style="fill:var(--on-brand)">antibiotics</text>`;
        s+=`<text x="${B.x+12}" y="${B.y+74}" class="t-xs">SSC 2021: if no substantial</text><text x="${B.x+12}" y="${B.y+86}" class="t-xs">delay (&lt; 45 min)</text>`;
        s+=ivBag(B.x+160,B.y+102,.9,{col:'var(--rx)',label:'abx',fill:1-.5*ramp(lp,.6,1),ph:lp*20,drip:lp>.6}).svg}
      for(let i=0;i<n;i++){const x=x0+i*gw,y=B.y+(N?20:26),f=ease(ramp(lp,i*.18,i*.18+.14));
        s+=bottle(x,y,N?1.1:1.4,f,{label:`${i+1} set${i?'s':''}`});
        const by=y+(N?86:110),bh=N?160:76,hv=bh*DET[i]/100*f;
        s+=`<rect x="${f1(x-14)}" y="${by}" width="28" height="${bh}" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x-14)}" y="${f1(by+bh-hv)}" width="28" height="${f1(hv)}" rx="3" style="fill:var(--dx);opacity:${i===1?1:.65}"/>`;
        s+=`<text x="${f1(x)}" y="${f1(by-4)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700;opacity:${f1(f)}">${DET[i]}%</text>`}
      s+=`<text x="${N?B.x+8:x0-60}" y="${B.y+B.h-6}" class="t-xs">bars: cumulative share of bloodstream infections detected (Lee 2007)</text>`}
    else if(p===1){const K=[31,19],labs=['drawn before antimicrobials','redrawn a median 70 min after'],sz=N?13:14,gp=N?3:4,gw=10*(sz+gp);
      for(let k=0;k<2;k++){const x=N?cx-gw/2:B.x+80+k*330,y=N?B.y+30+k*190:B.y+44,kk=Math.round(K[k]*ease(ramp(lp,.05+k*.3,.35+k*.3)));
        s+=`<text x="${x}" y="${y-22}" class="t-lbl" style="fill:${k?'var(--rx)':'var(--dx)'}">${K[k]===31?'31.4':'19.4'}% positive</text><text x="${x}" y="${y-8}" class="t-xs">${labs[k]}</text>`;
        s+=icons(x,y,{n:100,cols:10,k:kk,size:sz,gap:gp,col:k?'var(--rx)':'var(--dx)',shape:'dot'}).svg}}
    else if(p===2){const sx=N?B.x+12:B.x+20,sy=B.y+20,sw=N?B.w-24:300,sh=110;
      s+=`<rect x="${sx}" y="${sy}" width="${sw}" height="30" rx="6" style="fill:var(--skin)"/><text x="${sx+6}" y="${sy+19}" class="t-xs" style="fill:var(--ink)">skin</text>`;
      s+=`<rect x="${sx}" y="${sy+64}" width="${sw}" height="34" rx="12" style="fill:var(--blood-soft);stroke:var(--wall);stroke-width:2"/><text x="${sx+6}" y="${sy+85}" class="t-xs" style="fill:var(--ink)">vein</text>`;
      for(let i=0;i<5;i++)s+=bacterium(sx+40+i*(sw-60)/4,sy+12+(i%2)*6,11,{kind:'coccus',seed:i+3});
      const nx=sx+sw*.6,ny=ease(ramp(lp,.05,.35));s+=`<path d="M${f1(nx+60-60*ny)} ${f1(sy-14+ny*60)}l70 -46" style="stroke:var(--device);stroke-width:3;stroke-linecap:round"/><path d="M${f1(nx+60-60*ny)} ${f1(sy-14+ny*60)}l-8 7" style="stroke:var(--device);stroke-width:1.4"/>`;
      const bx=N?B.x+B.w-50:sx+sw+70,byy=N?sy+sh+6:sy+10,cont=ramp(lp,.35,.6);
      s+=bottle(bx,byy,N?1.1:1.5,.6*ramp(lp,.3,.5),{bug:cont,label:cont>.5?'false positive':'culture bottle'});
      const rx=N?B.x+12:B.x+440,rw=N?B.w-90:236,ry=N?sy+sh+40:sy+40,X=v=>rx+rw*v/12;
      s+=`<text x="${rx}" y="${ry-14}" class="t-xs" style="fill:var(--ink);font-weight:600">contamination rate (% of all results)</text>`;
      s+=`<line x1="${rx}" x2="${rx+rw}" y1="${ry+12}" y2="${ry+12}" class="axis"/>`;[0,3,6,9,12].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${ry+26}" class="t-xs t-mid">${v}${v===12?'+':''}</text>`});
      const g=ease(ramp(lp,.5,.8));s+=`<rect x="${f1(X(1))}" y="${ry}" width="${f1((X(10)-X(1))*g)}" height="10" rx="3" style="fill:var(--warn);opacity:.7"/>`;
      if(g>.9)s+=`<path d="M${f1(X(10))} ${ry+5}h${f1(rw*.12)}" style="stroke:var(--warn);stroke-width:3" marker-end="url(#tcAr)"/>`;
      s+=`<line x1="${f1(X(3))}" x2="${f1(X(3))}" y1="${ry-6}" y2="${ry+16}" style="stroke:var(--good);stroke-width:2.4"/><text x="${f1(X(3))}" y="${ry+40}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">≤3% target</text>`;
      s+=`<text x="${rx}" y="${ry+60}" class="t-xs">1% to more than 10% (Sautter 2024)</text>`}
    else if(p===3){const rx=N?B.x+14:B.x+40,rw=N?B.w-28:B.w-80,ry=B.y+(N?50:44),X=v=>rx+rw*v/100,g=ease(ramp(lp,.05,.4));
      s+=`<text x="${rx}" y="${ry-22}" class="t-xs" style="fill:var(--ink);font-weight:600">pre-test probability of bacteraemia</text>`;
      s+=`<rect x="${rx}" y="${ry}" width="${rw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(X(2))}" y="${ry}" width="${f1((X(69)-X(2))*g)}" height="12" rx="6" style="fill:var(--dx);opacity:.55"/>`;
      [0,25,50,75,100].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${ry+26}" class="t-xs t-mid">${v}%</text>`});
      s+=`<circle cx="${f1(X(2))}" cy="${ry+6}" r="6" style="fill:var(--dx)"/><text x="${f1(X(2))}" y="${ry-6}" class="t-xs" style="fill:var(--ink)">cellulitis ~2%</text>`;
      if(g>.95)s+=`<circle cx="${f1(X(69))}" cy="${ry+6}" r="6" style="fill:var(--bad)"/><text x="${f1(X(69))}" y="${ry-6}" class="t-xs t-mid" style="fill:var(--ink)">septic shock 69%</text>`;
      const LR=[['shaking chills',4.7,'var(--dx)'],['fever ≥38 °C',1.9,'var(--muted)'],['leukocytosis','<1.7',1.7]],lx=N?B.x+110:B.x+200,lw=N?B.w-150:360,ly=ry+(N?66:62),LX=v=>lx+lw*v/5;
      s+=`<text x="${N?B.x+14:rx}" y="${ly-10}" class="t-xs" style="fill:var(--ink);font-weight:600">likelihood ratio for bacteraemia</text>`;
      LR.forEach(([lab,v,c],i)=>{const y=ly+i*(N?28:24),num=typeof v==='number'?v:c,gg=ease(ramp(lp,.4+i*.15,.55+i*.15));
        s+=`<text x="${lx-8}" y="${y+11}" class="t-xs t-end" style="fill:var(--ink)">${lab}</text><rect x="${lx}" y="${y}" width="${f1((LX(num)-lx)*gg)}" height="14" rx="3" style="fill:${typeof v==='number'?c:'var(--muted)'};opacity:.8"/><text x="${f1(lx+(LX(num)-lx)*gg+5)}" y="${y+11}" class="t-xs" style="opacity:${f1(gg)}">${v}</text>`});
      s+=`<line x1="${f1(LX(1))}" x2="${f1(LX(1))}" y1="${ly-4}" y2="${ly+(N?82:72)}" style="stroke:var(--ink);stroke-dasharray:3 3"/><text x="${f1(LX(1))}" y="${ly+(N?94:84)}" class="t-xs t-mid">1 = no change</text>`}
    else{const ax=N?B.x+14:B.x+150,aw=N?B.w-28:B.w-200,ay=B.y+(N?150:150),X=v=>ax+aw*v/24,g=ease(ramp(lp,.05,.6));
      const A=tline(ax,ay,aw,{min:0,max:24,step:N?6:4,fmt:v=>v+' h',label:'hours after the Gram stain'});s+=A.svg;
      const rows=[['standard processing',22.3,'var(--muted)'],['rapid multiplex PCR',1.3,'var(--rx)']];
      rows.forEach(([lab,v,c],i)=>{const y=B.y+(N?40:46)+i*(N?50:44),w=X(Math.min(v,22.3*g))-ax;
        s+=`<text x="${N?ax:ax-10}" y="${N?y-6:y+12}" class="t-xs${N?'':' t-end'}" style="fill:var(--ink);font-weight:600">${lab}</text><rect x="${ax}" y="${y}" width="${f1(Math.max(2,w))}" height="16" rx="4" style="fill:${c};opacity:.8"/><text x="${f1(ax+w+6)}" y="${y+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${f1(Math.min(v,22.3*g))} h</text>`});
      const ty=ay+(N?44:34);s+=`<text x="${N?ax:ax}" y="${ty}" class="t-xs">T2 for Candida from whole blood: species in a mean 4.4 h (culture: 2–5 days)</text>`;
      if(!N)s+=`<text x="${ax}" y="${ty+14}" class="t-xs">Benefit on mortality only with stewardship in a meta-analysis (Early evidence)</text>`}
    return s}
  function drawC(t){const N=vb(tsv,'720 330','400 560'),p=phaseOf(TC_STEPS,t),st=TC_STEPS[p],nx=p<4?TC_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx);
    const B=N?{x:12,y:12,w:376,h:384}:{x:12,y:12,w:696,h:228},K=N?{x:12,y:406,w:376,h:144}:{x:12,y:248,w:696,h:74};
    let s=`<defs>${marker('tcAr','var(--warn)')}</defs><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<g style="opacity:${f1(.25+.75*ramp(lp,0,.08))}">${tcScene(p,B,lp,N)}</g>`;
    s+=`<rect x="${K.x}" y="${K.y}" width="${K.w}" height="${K.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    TC_CAP[p].forEach((l,j)=>{if(N){const w=tsWrap(l,62);w.forEach((ll,q)=>{s+=`<text x="${K.x+12}" y="${K.y+22+j*42+q*14}" class="t-xs" style="${j===0?'fill:var(--ink);font-weight:600':''}">${ll}</text>`})}
      else s+=`<text x="${K.x+12}" y="${K.y+20+j*20}" class="t-sm" style="${j===0?'fill:var(--ink);font-weight:600':''}">${l}</text>`});
    tsv.innerHTML=s;setC(p);$('#tcNote').innerHTML=noteHTML(st)}
  const stopC=playWire(trg,$('#tcPlay'),drawC,30000,'%t:player.replay%','tests');
  const setC=stepWire($('#tcSteps'),TC_STEPS,trg,drawC,stopC);
  drawC(+trg.value);

  /* ---- 4. procalcitonin stop rule ---- */
  const TP=[[0,4],[1,12],[2,9.5],[3,6],[4,3.4],[5,2],[6,1.2],[7,.75],[8,.5],[9,.34],[10,.25]];
  const tpf=monoFn(TP),tp=$('#tpSvg'),trp=$('#tpT');
  let tpStop=-1;for(let d=0;d<=10;d+=.01){let pk=0;for(let e=0;e<=d+1e-9;e+=.01)pk=Math.max(pk,tpf(e));const v=tpf(d);if(d>=1&&(v<=pk*.2||v<=.5)){tpStop=d;break}}
  function drawP(t){const N=vb(tp,'720 260','400 300'),day=t*10,x=N?44:60,w=N?340:420,y=16,h=N?200:196;
    const C=tcurve(x,y,w,h,TP,{x0:0,x1:10,y0:.1,y1:20,log:true,upto:day,col:'var(--dx)',dot:true,ref:.5,refLabel:'0.5 μg/L'});let s=C.svg;
    let pk=0;for(let e=0;e<=day+1e-9;e+=.02)pk=Math.max(pk,tpf(e));const v=tpf(day),fall=pk>0?1-v/pk:0,met=day>=tpStop&&tpStop>=0;
    if(day>=1){const yy=C.Y(pk*.2);s+=`<line x1="${x}" x2="${x+w}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--warn);stroke-width:1.3;stroke-dasharray:5 4"/><text x="${x+w-4}" y="${f1(yy-5)}" class="t-xs t-end" style="fill:var(--warn)">80% below peak</text>`}
    [.1,.5,1,2,5,10,20].forEach(q=>{s+=`<text x="${x-5}" y="${f1(C.Y(q)+3)}" class="t-xs t-end">${q}</text>`});
    for(let d=0;d<=10;d+=2)s+=`<text x="${f1(C.X(d))}" y="${y+h+13}" class="t-xs t-mid">day ${d}</text>`;
    s+=`<text x="${x}" y="${y-4}" class="t-xs" style="fill:var(--ink)">PCT (μg/L, log scale)</text>`;
    if(tpStop>=0){const sx=C.X(tpStop);s+=`<line x1="${f1(sx)}" x2="${f1(sx)}" y1="${y}" y2="${y+h}" style="stroke:var(--good);stroke-width:1.6;opacity:${met?1:.35}"/><text x="${f1(sx+4)}" y="${y+12}" class="t-xs" style="fill:var(--good);font-weight:700;opacity:${met?1:.5}">stop rule met</text>`}
    if(!N){const tx=x+w+20;['Illustrative patient','peak to date: '+pk.toFixed(1)+' μg/L','now: '+v.toFixed(2)+' μg/L','fall from peak: '+Math.round(fall*100)+'%'].forEach((l,j)=>{s+=`<text x="${tx}" y="${y+30+j*18}" class="${j?'t-sm':'t-lbl'}" style="${j?'':'fill:var(--dx)'}">${l}</text>`});
      s+=`<text x="${tx}" y="${y+120}" class="t-lbl" style="fill:${met?'var(--good)':'var(--muted)'}">${met?'SAPS stop rule met':'not yet met'}</text>`}
    tp.innerHTML=s;
    $('#tpRead').innerHTML=`<span>day <b>${day.toFixed(1)}</b></span><span>PCT <b>${v.toFixed(2)} μg/L</b></span><span>fall from peak <b>${Math.round(fall*100)}%</b></span><span>stop rule <b>${met?'met':'not met'}</b></span>`;
    $('#tpNote').innerHTML=`<div class="kicker">Teaching example (not care advice)</div><h4>${met?'The published stop rule is met':'The published stop rule is not met yet'}</h4>
      <p>In SAPS (1,546 ICU patients, 15 Dutch hospitals) the PCT stop rule was a fall of 80% or more from peak, or a level of 0.5 μg/L or lower. Median antibiotic duration was 5 days with PCT guidance and 7 with standard care, and 28-day mortality was 20% against 25%. [[deJong2016SAPS]]</p>
      <p>SSC 2021 suggests using procalcitonin <i>and</i> clinical evaluation to decide when to stop, where source control is adequate and the right duration is unclear, and suggests against using it to decide when to start. [[Evans2021SSC]]</p>
      <div class="pt"><b>%t:note.plain%</b>Procalcitonin is a blood test that can help doctors decide when it may be safe to stop antibiotics. It is always read together with how the person is doing. [[deJong2016SAPS,Evans2021SSC]]</div>`}
  playWire(trp,$('#tpPlay'),drawP,14000,'%t:player.replay%','tests');
  drawP(+trp.value);
};
function tsWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c.trim());c=x}else c+=' '+x});if(c.trim())L.push(c.trim());return L}
