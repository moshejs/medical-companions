/* ===== 3.1 Definitions & scores: SIRS to Sepsis-3 ===== */
const DF_STEPS=[
 {from:0,at:.07,yr:1992,t:'Sepsis-1',k:'1991 conference · 1992',h:'Sepsis-1: infection plus SIRS',
  txt:`The ACCP/SCCM conference defined SIRS (2 or more of: temperature &gt;38 or &lt;36°C, heart rate &gt;90, respiratory rate &gt;20 or PaCO₂ &lt;32 mmHg, white count &gt;12,000, &lt;4,000 or &gt;10% bands). Sepsis = infection + SIRS; severe sepsis = sepsis + organ dysfunction; septic shock = sepsis-induced hypotension despite fluids. [[Bone1992SIRS,Song2018qSOFA,Kaukonen2015]]`,
  pt:`The first definition looked for signs of inflammation, such as fever and a fast pulse, in someone with an infection. Each stage was seen as a step on a staircase.`,
  hook:`SIRS = 2 of 4: temperature, heart rate, respiratory rate (or PaCO₂), white count.`},
 {from:.15,at:.21,yr:2003,t:'Sepsis-2',k:'2001 conference · 2003',h:'Sepsis-2: no change in the core definition',
  txt:`29 participants from five societies found that "apart from expanding the list of signs and symptoms of sepsis… no evidence exists to support a change to the definitions". They proposed PIRO (predisposition, infection, response, organ dysfunction) as "a hypothesis-generating model for future research". [[Levy2003Sepsis2]]`,
  pt:`Ten years later, experts kept the same definition but added more possible signs to the list.`,
  hook:`Sepsis-2 (2001/2003) expanded the signs list; PIRO was a research hypothesis.`},
 {from:.29,at:.36,yr:2015,t:'One in eight',k:'Kaukonen 2015',h:'The crack: one in eight missed',
  txt:`In 109,663 ICU patients with infection and organ failure, 12.1% did not meet 2 SIRS criteria. Their mortality fell over 2000–2013 just as it did in SIRS-positive patients (27.7% to 9.3%, against 36.1% to 18.3%). Each extra SIRS criterion raised the odds of death by 1.13, with no step at 2. [[Kaukonen2015]]`,
  pt:`A large study found that 1 in 8 very sick people with infection and failing organs would have been missed by the SIRS rule.`,
  hook:`Kaukonen 2015: 1 in 8 with infection and organ failure is SIRS-negative.`},
 {from:.43,at:.5,yr:2016,t:'Sepsis-3',k:'Sepsis-3 · 2016',h:'Sepsis-3: organ dysfunction',
  txt:`"Sepsis should be defined as life-threatening organ dysfunction caused by a dysregulated host response to infection." Organ dysfunction is an acute SOFA rise of 2 or more, linked with in-hospital mortality above 10%. "Severe sepsis" was dropped as redundant, and qSOFA was offered as a bedside prompt. [[Singer2016Sepsis3,Seymour2016qSOFA]]`,
  pt:`Since 2016, sepsis means an infection that is damaging the body's organs because of the way the body reacts to it.`,
  hook:`Sepsis-3: infection + acute SOFA ≥2. "Severe sepsis" no longer exists.`},
 {from:.57,at:.64,yr:2016,t:'Septic shock',k:'Sepsis-3 · 2016',h:'Septic shock: pressure and lactate',
  txt:`Septic shock is a subset of sepsis with profound circulatory, cellular and metabolic abnormalities. Criteria: a vasopressor needed to keep MAP at 65 mmHg or more and a lactate above 2 mmol/L despite adequate fluids. Hospital mortality is above 40%; in the SSC database this group had 42.3%. [[Singer2016Sepsis3,ShankarHari2016Shock]]`,
  pt:`Septic shock is the most serious form: blood pressure stays low even after fluids, so medicines are needed to raise it, and the body's cells are struggling.`,
  hook:`Septic shock = vasopressor for MAP ≥65 + lactate &gt;2 mmol/L despite fluids.`},
 {from:.72,at:.78,yr:2024,t:'Phoenix',k:'Children · 2024',h:'Phoenix criteria for children',
  txt:`Sepsis-3 excluded children. The 2024 Phoenix criteria define sepsis in children under 18 as suspected infection with a Phoenix Sepsis Score of 2 or more, from four systems: respiratory, cardiovascular, coagulation and neurological. Septic shock is sepsis with at least 1 cardiovascular point. [[Schlapbach2024Phoenix]]`,
  pt:`Children now have their own definition, built from more than 3 million hospital records.`,
  hook:`Phoenix: suspected infection + score ≥2; shock = ≥1 cardiovascular point.`},
 {from:.86,at:.93,yr:2025,t:'SOFA-2',k:'SOFA-2 · 2025',h:'SOFA-2: the score is updated',
  txt:`SOFA-2 keeps six systems with revised thresholds and modern support (high-flow oxygen, ECMO, more vasopressors, kidney replacement therapy, delirium treatment). AUROC 0.79 against 0.77 for SOFA. Sepsis-3 is still defined with the original SOFA. [[Ranzani2025SOFA2,Lobo2025SOFA2]]`,
  pt:`The organ score behind the definition was updated in 2025. Whether the sepsis definition itself will switch to it is not yet settled.`,
  hook:`SOFA-2 (2025): 6 systems, revised thresholds; Sepsis-3 still uses SOFA-1.`}];
/* SOFA points as tabulated by Lambden 2019 (modified from Vincent 1996) */
const DF_SOFA=[
 {k:'resp',n:'Respiratory',u:'PaO₂/FiO₂ (mmHg)',o:['&gt;400','&lt;400','&lt;300','&lt;200 with respiratory support','&lt;100 with respiratory support']},
 {k:'coag',n:'Coagulation',u:'Platelets (×10³/µL)',o:['&gt;150','&lt;150','&lt;100','&lt;50','&lt;20']},
 {k:'liver',n:'Liver',u:'Bilirubin, mg/dL [µmol/L]',o:['&lt;1.2 [&lt;20]','1.2–1.9 [20–32]','2.0–5.9 [33–101]','6.0–11.9 [102–204]','&gt;12.0 [&gt;204]']},
 {k:'cv',n:'Cardiovascular',u:'MAP or vasopressors (µg/kg/min)',o:['MAP &gt;70 mmHg','MAP &lt;70 mmHg','Dopamine ≤5 or dobutamine (any dose)','Dopamine &gt;5, adrenaline ≤0.1 or noradrenaline ≤0.1','Dopamine &gt;15, adrenaline &gt;0.1 or noradrenaline &gt;0.1']},
 {k:'cns',n:'Nervous system',u:'Glasgow Coma Scale',o:['15','13–14','10–12','6–9','&lt;6']},
 {k:'renal',n:'Kidneys',u:'Creatinine, mg/dL [µmol/L], or urine output',o:['&lt;1.2 [&lt;110]','1.2–1.9 [110–170]','2.0–3.4 [171–299]','3.5–4.9 [300–440] or urine &lt;500 ml/day','&gt;5.0 [&gt;440] or urine &lt;200 ml/day']}];
const DF_SOFA_EX=[2,2,1,3,1,2];
const DF_TOOLS={sirs:{n:'SIRS ≥2',sens:88.1,spec:25.8},qsofa:{n:'qSOFA ≥2',sens:60.8,spec:72.0}};
const DF_AUC=[{g:'Outside the ICU',v:[['qSOFA',.81],['SOFA',.79],['SIRS',.76]]},{g:'Inside the ICU',v:[['SOFA',.74],['qSOFA',.66],['SIRS',.64]]}];
function dfBox(x,y,w,h,lab,o={}){const on=o.on,op=o.op==null?1:o.op;return `<g style="opacity:${f1(op)}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${o.col||(on?'var(--dx)':'var(--line)')};stroke-width:${on?1.6:1}"/><text x="${f1(x+w/2)}" y="${f1(y+h/2+(o.sub?-2:4))}" class="t-lbl t-mid">${lab}</text>${o.sub?`<text x="${f1(x+w/2)}" y="${f1(y+h/2+13)}" class="t-xs t-mid">${o.sub}</text>`:''}${o.x?`<line x1="${f1(x+6)}" y1="${f1(y+h-6)}" x2="${f1(x+w-6)}" y2="${f1(y+6)}" style="stroke:var(--bad);stroke-width:2.6"/>`:''}</g>`}
inits.definitions=()=>{
  /* ---------- 1. the timeline ---------- */
  const svg=$('#dfSvg'),rg=$('#dfT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(DF_STEPS,t),st=DF_STEPS[p],nx=p<DF_STEPS.length-1?DF_STEPS[p+1].from:1.0001,lp=ease(ramp(t,st.from,st.from+(nx-st.from)*.5));
    const W=N?400:720,ax0=N?24:40,ax1=W-(N?24:40),ay=50,X=y=>ax0+(ax1-ax0)*(y-1990)/36;
    const P=N?{x:12,y:96,w:376,h:490}:{x:20,y:92,w:680,h:276};
    let s=`<defs>${marker('dfA','var(--muted)')}</defs><text x="${ax0}" y="24" class="t-big" style="fill:var(--dx)">${st.h}</text>`;
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${ay}" y2="${ay}" class="axis"/>`;
    [1990,2000,2010,2020].forEach(y=>{s+=`<text x="${f1(X(y))}" y="${ay+16}" class="t-xs t-mid">${y}</text><line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${ay-3}" y2="${ay+3}" class="axis"/>`});
    DF_STEPS.forEach((m,i)=>{const on=i===p,done=i<=p,x=X(m.yr)+(i===4?0:0);
      s+=`<circle cx="${f1(x)}" cy="${ay}" r="${on?7:4.5}" style="fill:${done?'var(--dx)':'var(--panel)'};stroke:var(--dx);stroke-width:1.5"/>`;
      if(on)s+=`<text x="${f1(clamp(x,ax0+30,ax1-30))}" y="${ay-12}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${m.yr} · ${m.t}</text>`});
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const cx=P.x+P.w/2;
    if(p<=1){/* the staircase */
      const labs=[['Infection',''],['Sepsis','infection + ≥2 SIRS'],['Severe sepsis','+ organ dysfunction'],['Septic shock','+ hypotension despite fluids']];
      const n=4,bw=N?P.w-120:150,bh=N?52:46;
      labs.forEach((l,i)=>{const bx=N?P.x+16+i*30:P.x+20+i*(bw+14),by=N?P.y+P.h-80-i*(bh+30):P.y+P.h-60-i*52;
        s+=dfBox(bx,by,bw,bh,l[0],{sub:l[1],on:i===1,op:p===1?1:ramp(lp,i*.2,i*.2+.3)});
        if(i<3)s+=N?`<path d="M${bx+bw/2} ${by-2}v-24" style="stroke:var(--muted);stroke-width:1.3;marker-end:url(#dfA);opacity:${f1(p===1?1:ramp(lp,i*.2+.2,i*.2+.4))}"/>`:`<path d="M${bx+bw/2} ${by-2}C${bx+bw/2} ${by-22} ${bx+bw+20} ${by-24} ${bx+bw+40} ${by-10}" style="fill:none;stroke:var(--muted);stroke-width:1.3;marker-end:url(#dfA);opacity:${f1(p===1?1:ramp(lp,i*.2+.2,i*.2+.4))}"/>`});
      const chips=['T &gt;38 or &lt;36°C','HR &gt;90','RR &gt;20','WCC &gt;12k / &lt;4k'];
      chips.forEach((c,i)=>{const cw=N?84:110,cx0=N?P.x+12+i*(cw+6):P.x+P.w-4*(cw+8)+i*(cw+8),cy0=P.y+14;
        s+=`<rect x="${cx0}" y="${cy0}" width="${cw}" height="24" rx="12" style="fill:var(--panel);stroke:var(--dx);opacity:${f1(p===1?.6:ramp(lp,.1,.4))}"/><text x="${cx0+cw/2}" y="${cy0+16}" class="t-xs t-mid" style="fill:var(--ink)">${c}</text>`});
      s+=`<text x="${N?P.x+12:P.x+P.w-4*118}" y="${P.y+54}" class="t-xs">SIRS: any 2 of 4</text>`;
      if(p===1){const L=['P','I','R','O'],W2=['Predisposition','Infection','Response','Organ dysfunction'];L.forEach((c,i)=>{const px=N?P.x+12+(i%2)*180:P.x+30,py=N?P.y+64+Math.floor(i/2)*26:P.y+70+i*28;
        s+=`<g style="opacity:${f1(ramp(lp,i*.15,i*.15+.3))}"><text x="${px}" y="${py+14}" class="t-big" style="fill:var(--rx)">${c}</text><text x="${px+18}" y="${py+13}" class="t-xs">${W2[i]}</text></g>`});
        s+=`<text x="${N?P.x+12:P.x+30}" y="${P.y+(N?130:190)}" class="t-xs" style="fill:var(--rx)">PIRO: a hypothesis</text>`}}
    if(p===2){/* the SIRS gate */
      const gx=N?cx:P.x+P.w*.55,gy=N?P.y+70:P.y+30,gh=N?300:P.h-90;
      s+=`<rect x="${gx-8}" y="${gy}" width="16" height="${gh}" rx="4" style="fill:var(--dx)"/><text x="${gx}" y="${gy-8}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">≥2 SIRS?</text>`;
      for(let i=0;i<8;i++){const miss=i===5,x0=N?P.x+30:P.x+40,yy=gy+6+i*(gh-10)/8;
        let x=lerp(x0,gx+(N?120:200),ramp(lp,i*.05,.6+i*.05)),y=yy;
        if(miss&&x>gx-30){x=gx-30;y=lerp(yy,gy+gh+4,ramp(lp,.55,.9))}
        s+=person(x,y,Math.min(18,(gh-10)/8-3),miss?'var(--muted)':'var(--dx)')}
      s+=N?`<text x="${P.x+16}" y="${P.y+P.h-34}" class="t-sm" style="fill:var(--ink)">1 in 8 (12.1%) with infection and</text><text x="${P.x+16}" y="${P.y+P.h-18}" class="t-sm" style="fill:var(--ink)">organ failure were SIRS-negative</text>`:`<text x="${P.x+40}" y="${P.y+P.h-20}" class="t-sm" style="fill:var(--ink)">1 in 8 (12.1%) with infection and organ failure were SIRS-negative</text>`}
    if(p===3||p===4){/* nested sets */
      const ex=N?cx:P.x+P.w*.4,ey=N?P.y+190:P.y+P.h/2,R=N?170:150,sc=p===3?ease(lp):1;
      s+=`<ellipse cx="${ex}" cy="${ey}" rx="${f1(R*sc)}" ry="${f1(R*.78*sc)}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><text x="${ex}" y="${f1(ey-R*.78*sc+20)}" class="t-lbl t-mid">Infection</text>`;
      s+=`<ellipse cx="${ex}" cy="${f1(ey+R*.14)}" rx="${f1(R*.66*sc)}" ry="${f1(R*.5*sc)}" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:1.6;opacity:${f1(ramp(lp,p===3?.3:0,p===3?.6:.01))}"/><text x="${ex}" y="${f1(ey-R*.2)}" class="t-lbl t-mid" style="fill:var(--dx);opacity:${f1(p===4?1:ramp(lp,.4,.7))}">Sepsis</text><text x="${ex}" y="${f1(ey-R*.2+14)}" class="t-xs t-mid" style="opacity:${f1(p===4?1:ramp(lp,.4,.7))}">acute SOFA rise ≥2</text>`;
      const so=p===4?1:ramp(lp,.6,.9);
      s+=`<ellipse cx="${ex}" cy="${f1(ey+R*.34)}" rx="${f1(R*.34)}" ry="${f1(R*.22)}" style="fill:${p===4?'var(--bad-soft)':'var(--panel)'};stroke:var(--bad);stroke-width:${p===4?2.2:1.4};opacity:${f1(so)}"/><text x="${ex}" y="${f1(ey+R*.36)}" class="t-sm t-mid" style="fill:var(--bad);font-weight:600;opacity:${f1(so)}">Septic shock</text>`;
      if(p===3){const bx=N?P.x+P.w-150:P.x+P.w-190,by=N?P.y+P.h-70:P.y+40;s+=dfBox(bx,by,N?140:160,44,'Severe sepsis',{sub:'dropped as redundant',x:ramp(lp,.7,1)>0,op:1})}
      if(p===4){const qx=N?P.x+20:P.x+P.w-230,qy=N?P.y+P.h-120:P.y+40;
        s+=`<g style="opacity:${f1(lp)}">`+pump(qx,qy,90,70,{v:lp,txt:'MAP ≥65',on:true,col:'var(--rx)'}).svg+`<text x="${qx+45}" y="${qy+86}" class="t-xs t-mid">vasopressor needed</text>`;
        s+=lactateMeter(qx+(N?280:150),qy-6,20,90,2+lp*2,8,{bands:[{from:2,to:8,col:'var(--lactate)',label:'&gt;2'}],val:true,unit:'mmol/L'})+`<text x="${qx+(N?240:120)}" y="${qy+118}" class="t-xs">despite adequate fluids</text></g>`}}
    if(p===5){/* Phoenix */
      const bx=N?P.x+90:P.x+150,by=N?P.y+24:P.y+20,bs=N?.85:.9;
      const B=body(bx,by,bs,{id:'dfB',organs:true,fail:{brain:.0,lung:.0,heart:0}});s+=B.svg;
      const sys=[['Respiratory','0–3',B.at.lung],['Cardiovascular','0–6',B.at.heart],['Coagulation','0–2',B.at.arm],['Neurological','0–2',B.at.brain]];
      sys.forEach((q,i)=>{const op=ramp(lp,i*.15,i*.15+.3),tx=N?P.x+200:P.x+330,ty=(N?P.y+60:P.y+50)+i*(N?62:50);
        s+=`<g style="opacity:${f1(op)}"><circle cx="${f1(q[2][0])}" cy="${f1(q[2][1])}" r="14" style="fill:var(--dx);opacity:.22"/><path d="M${f1(q[2][0]+14)} ${f1(q[2][1])}L${tx-8} ${ty-4}" style="stroke:var(--dx);stroke-width:1;stroke-dasharray:3 3;fill:none"/><text x="${tx}" y="${ty}" class="t-lbl">${q[0]}</text><text x="${tx}" y="${ty+14}" class="t-xs">${q[1]} points</text></g>`});
      s+=`<text x="${N?P.x+16:P.x+330}" y="${N?P.y+P.h-24:P.y+P.h-30}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(lp,.6,.9))}">suspected infection + score ≥2 = sepsis</text>`}
    if(p===6){const T=[['Brain','delirium treatment'],['Respiratory','SpO₂/FiO₂, high-flow, ECMO'],['Cardiovascular','more vasopressors, MCS'],['Liver','revised thresholds'],['Kidney','kidney replacement therapy'],['Haemostasis','revised thresholds']];
      const cols=N?2:3,tw=N?(P.w-36)/2:(P.w-60)/3,th=N?100:90;
      T.forEach((q,i)=>{const tx=P.x+12+(i%cols)*(tw+12),ty=P.y+(N?20:24)+Math.floor(i/cols)*(th+14);s+=dfBox(tx,ty,tw,th,q[0],{sub:q[1],on:ramp(lp,i*.1,i*.1+.3)>.5,op:.3+.7*ramp(lp,i*.1,i*.1+.3)})});
      s+=`<text x="${P.x+12}" y="${P.y+P.h-14}" class="t-sm" style="fill:var(--ink)">AUROC SOFA-2 0.79 vs SOFA 0.77</text>`}
    svg.innerHTML=s;
    $('#dfNote').innerHTML=noteHTML({k:st.k,t:st.h,txt:st.txt,pt:st.pt,hook:st.hook});
    $('#dfRead').innerHTML=`<span>Year <b>${st.yr}</b></span><span>Milestone <b>${p+1}</b> of ${DF_STEPS.length}</span>`;
    mark(p)}
  const stop=playWire(rg,$('#dfPlay'),draw,18000,'Replay','definitions');
  const mark=stepWire($('#dfSteps'),DF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. qSOFA ---------- */
  const qrr=$('#dfQrr'),qsbp=$('#dfQsbp'),qmen=$('#dfQmen');
  function qcalc(){const rr=+qrr.value||0,sb=+qsbp.value||0,a=rr>=22?1:0,b=sb<=100&&sb>0?1:0,c=qmen.checked?1:0,tot=a+b+c;
    $('#dfQres').innerHTML=`<div><small>qSOFA</small><b>${tot} / 3</b></div><div><small>Respiratory rate ≥22</small><b>${a}</b></div><div><small>Systolic ≤100</small><b>${b}</b></div><div><small>Altered mentation</small><b>${c}</b></div>`;
    $('#dfQnote').innerHTML=noteHTML({k:'Teaching calculator',t:tot>=2?'qSOFA 2 or more: positive':'qSOFA below 2',
      txt:tot>=2?`In the derivation data, a qSOFA of 2 or more meant a 3- to 14-fold higher hospital mortality than below 2, across baseline-risk deciles. Sepsis-3 framed it as a prompt "to consider possible sepsis", not a diagnosis. [[Seymour2016qSOFA]]`:`A low qSOFA does not rule sepsis out: pooled sensitivity for death was only 60.8%, and outside the ICU 51.2%. SSC 2021 recommends against using qSOFA as a single screening tool. [[Fernando2018,Evans2021SSC]]`,
      pt:`This only shows how the three items add up. A low number does not mean someone is safe. If someone seems very unwell with an infection, get medical help now.`,
      hook:`qSOFA: RR ≥22, altered mentation, SBP ≤100; ≥2 = positive.`})}
  [qrr,qsbp,qmen].forEach(e=>{e.addEventListener('input',qcalc);e.addEventListener('change',qcalc)});qcalc();

  /* ---------- 3. SIRS vs qSOFA ---------- */
  const cmp=$('#dfCmp');let tool='sirs';
  function dcmp(){const N=vb(cmp,'720 300','400 540'),T=DF_TOOLS[tool],k1=Math.round(T.sens),k2=Math.round(100-T.spec);
    const A=N?{x1:24,x2:212,y:46,bx:110,by:290,bw:250}:{x1:24,x2:214,y:46,bx:520,by:46,bw:170};
    let s=`<text x="${A.x1}" y="30" class="t-sm" style="fill:var(--ink);font-weight:600">100 who died: ${k1} flagged</text><text x="${A.x2}" y="30" class="t-sm" style="fill:var(--ink);font-weight:600">100 who survived: ${k2} flagged</text>`;
    s+=icons(A.x1,A.y,{n:100,cols:10,k:k1,size:12,gap:3,col:'var(--dx)',shape:'dot'}).svg+icons(A.x2,A.y,{n:100,cols:10,k:k2,size:12,gap:3,col:'var(--warn)',shape:'dot'}).svg;
    s+=`<text x="${A.x1}" y="${A.y+186}" class="t-xs">sensitivity ${T.sens}%</text><text x="${A.x2}" y="${A.y+186}" class="t-xs">false alarms (1 − specificity ${T.spec}%)</text>`;
    s+=`<text x="${N?24:A.bx-110}" y="${A.by-14}" class="t-sm" style="fill:var(--ink);font-weight:600">AUROC, in-hospital death (2016)</text>`;
    let y=A.by;DF_AUC.forEach(g=>{s+=`<text x="${N?24:A.bx-110}" y="${y+6}" class="t-xs">${g.g}</text>`;y+=12;
      g.v.forEach(v=>{const hl=(tool==='sirs'&&v[0]==='SIRS')||(tool==='qsofa'&&v[0]==='qSOFA'),w=A.bw*(v[1]-.5)/.4;
        s+=`<text x="${A.bx-8}" y="${y+10}" class="t-xs t-end">${v[0]}</text><rect x="${A.bx}" y="${y}" width="${f1(w)}" height="13" rx="3" style="fill:${hl?'var(--dx)':'var(--line)'}"/><text x="${f1(A.bx+w+5)}" y="${y+10}" class="t-xs">${v[1].toFixed(2)}</text>`;y+=18});y+=14});
    s+=`<text x="${A.bx}" y="${y}" class="t-xs">bars start at 0.5 (chance)</text>`;
    cmp.innerHTML=s;$('#dfCmpRead').innerHTML=`<span>Tool <b>${T.n}</b></span><span>Sensitivity <b>${T.sens}%</b></span><span>Specificity <b>${T.spec}%</b></span>`}
  $('#dfTog').addEventListener('click',e=>{const b=e.target.closest('[data-tool]');if(!b)return;tool=b.dataset.tool;$$('#dfTog [data-tool]').forEach(x=>x.setAttribute('aria-pressed',x===b));dcmp()});
  redraws.definitions=(()=>{const prev=redraws.definitions;return()=>{prev&&prev();dcmp();scalc()}})();
  dcmp();

  /* ---------- 4. SOFA ---------- */
  const box=$('#dfSofa');
  box.innerHTML=DF_SOFA.map(r=>`<label for="dfS_${r.k}">${r.n} <span class="stage-cap">${r.u}</span><select id="dfS_${r.k}">${r.o.map((o,i)=>`<option value="${i}">${i} · ${o}</option>`).join('')}</select></label>`).join('');
  const sels=DF_SOFA.map(r=>$('#dfS_'+r.k)),base=$('#dfBase'),ssvg=$('#dfSsvg');
  function scalc(){const v=sels.map(s=>+s.value),tot=v.reduce((a,b)=>a+b,0),b0=clamp(+base.value||0,0,24),d=tot-b0;
    $('#dfSres').innerHTML=`<div><small>SOFA total</small><b>${tot} / 24</b></div><div><small>Change from baseline</small><b>${d>0?'+':''}${d}</b></div><div><small>Sepsis-3 organ criterion</small><b style="font-size:20px">${d>=2?'Rise ≥2':'Not met'}</b></div>`;
    const N=vb(ssvg,'720 120','400 200');let s='';
    DF_SOFA.forEach((r,i)=>{const cols=N?2:6,cw=N?184:112,x=8+(i%cols)*(cw+(N?12:6)),y=N?8+Math.floor(i/2)*62:14;
      s+=`<text x="${x}" y="${y+10}" class="t-xs">${r.n}</text>`;for(let k=0;k<4;k++)s+=`<rect x="${x+k*(cw/4)}" y="${y+18}" width="${f1(cw/4-3)}" height="22" rx="4" style="fill:${k<v[i]?(v[i]>=3?'var(--organ-fail)':'var(--dx)'):'var(--panel-2)'}"/>`;
      s+=`<text x="${x}" y="${y+54}" class="t-xs" style="fill:var(--ink)">${v[i]} point${v[i]===1?'':'s'}</text>`});
    ssvg.innerHTML=s;
    $('#dfSnote').innerHTML=noteHTML({k:'Teaching calculator',t:`SOFA ${tot}, change ${d>0?'+':''}${d}`,
      txt:`${d>=2?'An acute rise of 2 points or more, in someone with infection, is the Sepsis-3 marker of organ dysfunction, associated with in-hospital mortality above 10%. [[Singer2016Sepsis3]]':'Sepsis-3 uses an acute rise of 2 points or more from baseline, in someone with infection, as its marker of organ dysfunction. [[Singer2016Sepsis3]]'} The direction over time carries information too: in Ferreira 2001, mortality was at least 50% when SOFA rose over the first 96 hours and below 27% when it fell (population statistics). [[Ferreira2001SOFA]]`,
      pt:`SOFA adds up how much six organs are struggling. It is a tool for intensive care teams; it cannot tell what will happen to one person.`,
      hook:`SOFA: 6 systems × 0–4 = 0–24. Sepsis = infection + acute rise ≥2.`})}
  sels.forEach(s=>s.addEventListener('change',scalc));base.addEventListener('input',scalc);
  $('#dfSex').addEventListener('click',()=>{sels.forEach((s,i)=>s.value=DF_SOFA_EX[i]);base.value=0;scalc()});
  $('#dfSreset').addEventListener('click',()=>{sels.forEach(s=>s.value=0);base.value=0;scalc()});
  scalc();
};
