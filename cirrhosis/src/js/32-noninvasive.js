/* =============== 3.2 Measuring scarring without a biopsy =============== */
const NI_STEPS=[
 {from:0,at:.15,k:'Step 1 · a blood-test score',t:'FIB-4: four numbers',
  txt:`FIB-4 as published is age [years] × AST [U/L] ÷ (platelets [10⁹/L] × √ALT [U/L]). It was developed in 832 people with HIV/HCV coinfection, with an AUROC of 0.765 for Ishak stages 0–3 versus 4–6. AASLD 2023 keeps it as the first-line test for general practitioners and endocrinologists because it is simple and adds little cost, while noting it is statistically inferior to ELF and elastography. [[Sterling2006FIB4,Rinella2023AASLD]]`,
  pt:`FIB-4 is a free score made from your age and three routine blood tests. It helps decide who needs a liver scan, but it is not a diagnosis.`,
  hook:`FIB-4 = (age × AST) ÷ (platelets × √ALT).`},
 {from:.2,at:.36,k:'Step 2 · sorting by risk',t:'Three FIB-4 bands',
  txt:`AASLD 2023 describes FIB-4 bands of low risk (&lt;1.3), intermediate (1.3–2.67) and high (&gt;2.67). These cut-offs come from Shah 2009 in 541 adults with NAFLD, where ≤1.30 gave a 90% negative and ≥2.67 an 80% positive predictive value for advanced fibrosis. Sterling's original HIV/HCV cut-offs were &lt;1.45 and &gt;3.25. Age matters: at ≥65 years specificity fell to 35%, and McPherson proposed a cut-off of 2.0 for that group. [[Rinella2023AASLD,Shah2009FIB4,Sterling2006FIB4,McPherson2017Age]]`,
  pt:`A low score makes serious scarring unlikely. A higher score does not mean cirrhosis: it means the next test is worth doing.`,
  hook:`NAFLD/MASLD cut-offs: &lt;1.3 low, ≥2.67 high (Shah 2009). Original HIV/HCV: 1.45 and 3.25 (Sterling 2006). Age ≥65: 2.0.`},
 {from:.42,at:.58,k:'Step 3 · liver stiffness',t:'Elastography',
  txt:`In the AASLD pathway, a FIB-4 of 1.3 or more leads to a secondary assessment with vibration-controlled transient elastography (VCTE, preferred over MR elastography in primary care for cost reasons) or ELF. Across 50 studies, transient elastography had a mean AUROC of 0.94 for cirrhosis. Baveno VII: LSM &lt;10 kPa, without other signs, rules out compensated advanced chronic liver disease (cACLD); 10–15 kPa is suggestive and &gt;15 kPa highly suggestive. [[Rinella2023AASLD,FriedrichRust2008TE,deFranchis2022BavenoVII]]`,
  pt:`A FibroScan is like an ultrasound. A gentle pulse measures how stiff the liver is, and stiffer usually means more scarring.`,
  hook:`Baveno VII "rule of five": 10, 15, 20 and 25 kPa mark progressively higher risk of decompensation and liver-related death, whatever the cause.`},
 {from:.64,at:.8,k:'Step 4 · next steps',t:'Where people land',
  txt:`AASLD: refer to specialty care if risk stays intermediate or high; people with 2 or more metabolic risk factors, especially prediabetes or type 2 diabetes, should repeat FIB-4 every 1–2 years. Baveno VII rules out clinically significant portal hypertension (CSPH, HVPG ≥10 mmHg) with LSM ≤15 kPa plus platelets ≥150 ×10⁹/L, and rules it in with LSM ≥25 kPa. Even in sequence, FIB-4 then VCTE left 33% needing a biopsy in one meta-analysis. [[Rinella2023AASLD,deFranchis2022BavenoVII,Mozes2022IPD]]`,
  pt:`Most people with a low score stay with their usual doctor and recheck in a year or two. A higher result means a referral to a liver specialist, not a diagnosis.`,
  hook:`CSPH ruled out: LSM ≤15 kPa + platelets ≥150 ×10⁹/L. Ruled in: LSM ≥25 kPa.`},
 {from:.84,at:.95,k:'Step 5 · pitfalls',t:'When a reading misleads',
  txt:`In 13,369 examinations, liver stiffness measurement failed in 3.1% and was unreliable in a further 15.8%, so nearly 1 in 5 results could not be interpreted; BMI &gt;30 (odds ratio 7.5 for failure) and operators with fewer than 500 exams were the main causes. Baveno VII says an index LSM ≥10 kPa should be repeated while fasting, because TE can give false-positive results. FIB-4 did poorly at age ≤35 (AUROC 0.60). [[Castera2010Pitfalls,deFranchis2022BavenoVII,McPherson2017Age]]`,
  pt:`Scan results can be wrong if you have just eaten or if the scan is hard to do, so a high result is often repeated while fasting.`,
  hook:`FIB-4 is unreliable at age ≤35 (AUROC 0.60) and loses specificity at ≥65.`}
];
/* 24 schematic people: FIB-4 band (0 low, 1 intermediate, 2 high), and after VCTE whether they go back to primary care */
const NI_DOTS=[...Array(24)].map((_,i)=>{const b=i<12?0:i<19?1:2,back=b===0||(i>=12&&i<=16)||i===19;
  const kpa=b===0?0:back?[6.2,7.1,5.4,6.8,7.6,6.5][i===19?5:i-12]:{17:12.5,18:14,20:17.5,21:22,22:27,23:13}[i];return {b,back,kpa}});
const NI_CAP=[
 ['Derivation: 832 people with HIV/HCV coinfection','AUROC 0.765 for Ishak 0–3 versus 4–6','Biopsy avoidable in 71% of the validation group'],
 ['AASLD 2023: low <1.3 · intermediate 1.3–2.67 · high >2.67','Shah 2009: ≤1.30 gave 90% NPV, ≥2.67 an 80% PPV','Sterling 2006 original cut-offs: <1.45 and >3.25'],
 ['Baveno VII: <10 kPa rules out cACLD (no other signs)','10–15 kPa suggestive · >15 kPa highly suggestive','Rule of five: 10, 15, 20, 25 kPa = rising risk'],
 ['CSPH ruled out: ≤15 kPa and platelets ≥150 ×10⁹/L','CSPH ruled in: ≥25 kPa (viral, alcohol, non-obese MASH)','Refer if risk stays intermediate or high (AASLD 2023)'],
 ['Failed 3.1% + unreliable 15.8% of 13,369 exams','BMI >30: odds ratio 7.5 for a failed measurement','Baveno VII: repeat a reading ≥10 kPa while fasting']
];
const NI_BCOL=['var(--good)','var(--warn)','var(--bad)'];
const NI_R5=[{to:10,col:'var(--good)'},{to:15,col:'var(--bile)'},{to:20,col:'var(--warn)'},{to:25,col:'var(--artery)'},{to:30,col:'var(--bad)'}];
const niFib4=(a,ast,alt,plt)=>a*ast/(plt*Math.sqrt(alt));
inits.noninvasive=()=>{
  const svg=$('#niSvg'),rg=$('#niT');
  function draw(t){
    const N=vb(svg,'720 380','400 700'),p=phaseOf(NI_STEPS,t),st=NI_STEPS[p],nx=p<4?NI_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx);
    const L=N?{A:{x:12,y:8,w:376,h:140},B:[{x:12,y:158,w:120,h:86},{x:140,y:158,w:120,h:86},{x:268,y:158,w:120,h:86}],C:{x:12,y:254,w:376,h:198},D:[{x:12,y:462,w:184,h:118},{x:204,y:462,w:184,h:118}],cap:{x:12,y:590,w:376,h:102}}
             :{A:{x:12,y:14,w:176,h:300},B:[{x:204,y:214,w:150,h:100},{x:204,y:114,w:150,h:92},{x:204,y:14,w:150,h:92}],C:{x:370,y:14,w:180,h:300},D:[{x:566,y:14,w:142,h:146},{x:566,y:168,w:142,h:146}],cap:{x:12,y:322,w:696,h:52}};
    let s=`<defs>${marker('niAr','var(--muted)')}</defs>`;
    const box=(b,on,col)=>`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="12" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${col||(on?'var(--dx)':'var(--line)')};stroke-width:${on?1.6:1}"/>`;
    /* ---- A: the formula ---- */
    const A=L.A;s+=box(A,p===0);
    s+=`<text x="${A.x+12}" y="${A.y+20}" class="t-lbl" style="fill:var(--dx)">1 · FIB-4</text>`;
    const fx=N?A.x+96:A.x+A.w/2,fy=N?A.y+48:A.y+56;
    s+=`<text x="${fx}" y="${fy}" class="t-big t-mid">age × AST</text><line x1="${fx-74}" x2="${fx+74}" y1="${fy+9}" y2="${fy+9}" style="stroke:var(--ink);stroke-width:1.6"/><text x="${fx}" y="${fy+30}" class="t-big t-mid">platelets × √ALT</text>`;
    /* the example fills in during step 1 */
    const e1=ramp(t,.02,.06),e2=ramp(t,.05,.09),e3=ramp(t,.08,.12),e4=ramp(t,.11,.15),e5=ramp(t,.14,.18);
    const ex=N?A.x+290:A.x+A.w/2,ey=N?A.y+26:A.y+118;
    s+=`<text x="${ex}" y="${ey}" class="t-xs t-mid">example: age 58, AST 45,</text><text x="${ex}" y="${ey+12}" class="t-xs t-mid">ALT 38, platelets 180</text>`;
    const num=`<tspan style="opacity:${f1(e1)}">58</tspan><tspan style="opacity:${f1(e2)}"> × 45</tspan>`,den=`<tspan style="opacity:${f1(e3)}">180</tspan><tspan style="opacity:${f1(e4)}"> × √38</tspan>`;
    s+=`<text x="${ex}" y="${ey+34}" class="t-lbl t-mid">${num}</text><line x1="${ex-46}" x2="${ex+46}" y1="${ey+40}" y2="${ey+40}" style="stroke:var(--ink);stroke-width:1.2;opacity:${f1(e1)}"/><text x="${ex}" y="${ey+56}" class="t-lbl t-mid">${den}</text>`;
    const val=niFib4(58,45,38,180);
    s+=`<text x="${ex}" y="${ey+(N?78:86)}" class="t-big t-mid" style="font-size:22px;fill:var(--warn);opacity:${f1(e5)}">= ${(val*e5).toFixed(2)}</text>`;
    if(!N)s+=`<text x="${ex}" y="${ey+104}" class="t-xs t-mid" style="opacity:${f1(e5)}">intermediate band</text>`;
    /* ---- B: three bands ---- */
    const BL=[['Low','below 1.3'],['Intermediate','1.3 to 2.67'],['High','above 2.67']];
    L.B.forEach((b,k)=>{const on=p===1;s+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="12" style="fill:var(--panel);stroke:${NI_BCOL[k]};stroke-width:${on?2:1.2}"/>`;
      s+=`<text x="${b.x+10}" y="${b.y+18}" class="t-lbl" style="fill:${NI_BCOL[k]}">${BL[k][0]}</text><text x="${b.x+10}" y="${b.y+31}" class="t-xs">FIB-4 ${BL[k][1]}</text>`});
    if(!N)s+=`<path d="M${A.x+A.w+2} ${A.y+150}H${L.B[0].x-2}" class="arrow" marker-end="url(#niAr)"/>`;
    /* ---- C: elastography ---- */
    const C=L.C;s+=box(C,p===2);
    s+=`<text x="${C.x+12}" y="${C.y+20}" class="t-lbl" style="fill:var(--dx)">2 · Liver stiffness</text>`;
    const half=N?C.x+194:C.x+C.w,px=N?C.x+96:C.x+C.w/2,sTop=C.y+(N?52:58),sH=N?70:64,sx0=C.x+10,sx1=(N?half:C.x+C.w)-10;
    /* current reading */
    const mv=NI_DOTS.map((d,i)=>i).filter(i=>NI_DOTS[i].b>0);
    let kv=5,cur=-1;
    if(p===2){const q=lp*mv.length,ii=Math.min(mv.length-1,Math.floor(q)),fr=q-ii;cur=mv[ii];const a=ii?NI_DOTS[mv[ii-1]].kpa:5;kv=lerp(a,NI_DOTS[cur].kpa,ease(clamp(fr*2.2)))}
    else if(p>2)kv=NI_DOTS[mv[mv.length-1]].kpa;
    const cid=uid('nicl');
    s+=`<clipPath id="${cid}"><rect x="${sx0}" y="${sTop}" width="${sx1-sx0}" height="${sH}" rx="8"/></clipPath>`;
    s+=`<rect x="${sx0}" y="${sTop}" width="${sx1-sx0}" height="${sH}" rx="8" style="fill:var(--liver-soft);stroke:var(--liver)"/>`;
    s+=`<g clip-path="url(#${cid})">`;
    const sc=ramp(kv,5,27),rr=rng(31);for(let i=0;i<Math.round(4+sc*16);i++){const x=lerp(sx0,sx1,rr()),y=lerp(sTop,sTop+sH,rr());s+=collagen(x,y,x+16+rr()*18,y+(rr()-.5)*14,{w:1.1,op:.4+sc*.4,amp:2,n:2})}
    const ph=(t*90)%1;for(let k=0;k<4;k++){const r=((ph+k/4)%1)*(sH+16),op=1-r/(sH+16);s+=`<path d="M${f1(px-r)} ${sTop}A${f1(r)} ${f1(r)} 0 0 0 ${f1(px+r)} ${sTop}" style="fill:none;stroke:var(--dx);stroke-width:2;opacity:${f1(op*(p>=2?.9:.35))}"/>`}
    s+=`</g>`;
    s+=`<rect x="${px-16}" y="${sTop-16}" width="32" height="16" rx="5" style="fill:var(--dx)"/><rect x="${px-5}" y="${sTop-30}" width="10" height="14" rx="3" style="fill:var(--dx);opacity:.7"/>`;
    s+=`<text x="${px+22}" y="${sTop-6}" class="t-xs">probe</text>`;
    s+=`<text x="${sx0+6}" y="${sTop+sH+12}" class="t-xs">liver tissue (schematic)</text>`;
    /* gauge with the rule of five */
    const gcx=N?C.x+290:C.x+C.w/2,gcy=N?C.y+136:C.y+246,gr=N?72:66;
    s+=gauge(gcx,gcy,gr,kv,30,{bands:NI_R5,ends:false})+`<text x="${gcx}" y="${gcy+(N?26:24)}" class="t-big t-mid" style="font-size:20px">${kv.toFixed(1)}<tspan class="t-xs"> kPa</tspan></text>`;
    [10,15,20,25].forEach(v=>{const a=Math.PI*(1-v/30),x=gcx+(gr+9)*Math.cos(a),y=gcy-(gr+9)*Math.sin(a);s+=`<text x="${f1(x)}" y="${f1(y+3)}" class="t-xs t-mid" style="font-weight:700">${v}</text>`});
    const kl=kv<10?'<10: rules out cACLD*':kv<=15?'10–15: suggestive':kv<25?'>15: highly suggestive':'≥25: rules in CSPH*';
    s+=`<text x="${gcx}" y="${gcy+(N?40:37)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${p>=2?kl:'rule of five (kPa)'}</text>`;
    if(N&&p>=2)s+=`<text x="${gcx}" y="${gcy+52}" class="t-xs t-mid">*see the notes</text>`;
    /* ---- D: outcomes ---- */
    const DL=[['Low risk','stay in primary care;','recheck FIB-4 in 1–2 y','with ≥2 metabolic risks'],['Specialist','referred when risk','stays intermediate','or high']];
    L.D.forEach((b,k)=>{s+=box(b,p===3,k?'var(--bad)':'var(--good)');s+=`<text x="${b.x+10}" y="${b.y+18}" class="t-lbl" style="fill:${k?'var(--bad)':'var(--good)'}">${DL[k][0]}</text>`;
      DL[k].slice(1).forEach((l,j)=>{s+=`<text x="${b.x+10}" y="${b.y+32+j*11}" class="t-xs">${l}</text>`})});
    /* ---- dots ---- */
    const cnt=[0,0,0],c2=[0],cD=[0,0];
    const slot=NI_DOTS.map((d,i)=>{const j=cnt[d.b]++,bb=L.B[d.b],cols=5,sp=N?20:22,P1=[bb.x+(N?20:22)+(j%cols)*sp,bb.y+(N?46:50)+Math.floor(j/cols)*(N?14:16)];
      const P0=N?[A.x+16+i*15,A.y+128]:[A.x+20+(i%6)*27,A.y+246+Math.floor(i/6)*16];
      let P2=null;if(d.b>0){const m=c2[0]++;P2=N?[C.x+18+m*14,C.y+186]:[C.x+16+m*13.5,C.y+150]}
      const dk=d.back?0:1,m3=cD[dk]++,db=L.D[dk],c3=N?8:6,P3=[db.x+(N?18:16)+(m3%c3)*20,db.y+(N?78:84)+Math.floor(m3/c3)*(N?14:16)];
      return {P0,P1,P2,P3}});
    const bumpY=(a,b,u,h)=>[lerp(a[0],b[0],u),lerp(a[1],b[1],u)-Math.sin(Math.PI*u)*h];
    const unrel=[2,7,13,18,21];
    NI_DOTS.forEach((d,i)=>{const S=slot[i],sg=i/24*.05,app=ramp(t,i*.005,i*.005+.03);
      const u1=ease(ramp(t,.22+sg,.3+sg)),u2=d.b?ease(ramp(t,.44+sg*1.6,.47+sg*1.6)):0,u3=ease(ramp(t,.66+sg,.74+sg));
      let P=bumpY(S.P0,S.P1,u1,24);if(d.b&&u2>0)P=bumpY(S.P1,S.P2,u2,30);
      if(u3>0)P=bumpY(d.b?S.P2:S.P1,S.P3,u3,30);
      const col=u3>.5?(d.back?'var(--good)':'var(--bad)'):u1>.5?NI_BCOL[d.b]:'var(--muted)';
      s+=`<circle cx="${f1(P[0])}" cy="${f1(P[1])}" r="${i===cur?6:4.6}" style="fill:${col};stroke:${i===cur?'var(--ink)':'var(--panel)'};stroke-width:${i===cur?2:1};opacity:${f1(app)}"/>`;
      if(p===4&&unrel.includes(i)){const fl=ramp(lp,.1+unrel.indexOf(i)*.08,.2+unrel.indexOf(i)*.08);if(fl>0)s+=`<text x="${f1(P[0])}" y="${f1(P[1]+3.5)}" class="t-xs t-mid" style="fill:var(--on-brand);font-weight:700;opacity:${f1(fl)}">?</text>`}});
    if(p===2&&cur>=0){const P=slot[cur].P2;s+=`<path d="M${f1(P[0])} ${f1(P[1]-8)}L${f1(P[0])} ${f1(sTop+sH+16)}" style="stroke:var(--ink);stroke-dasharray:2 3;opacity:.5"/>`}
    /* ---- caption strip ---- */
    const K=L.cap,lines=NI_CAP[p];s+=`<rect x="${K.x}" y="${K.y}" width="${K.w}" height="${K.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    if(p===4){const bx=K.x+12,bw=N?K.w-24:300,by=K.y+(N?12:10),f=ramp(lp,0,.5);
      s+=`<rect x="${bx}" y="${by}" width="${bw}" height="14" rx="4" style="fill:var(--good-soft);stroke:var(--line)"/>`;
      s+=`<rect x="${bx}" y="${by}" width="${f1(bw*.031*f)}" height="14" style="fill:var(--bad)"/><rect x="${f1(bx+bw*.031*f)}" y="${by}" width="${f1(bw*.158*f)}" height="14" style="fill:var(--warn);opacity:.8"/>`;
      s+=`<text x="${f1(bx+bw*.189*f+6)}" y="${by+11}" class="t-xs">${f>.5?'≈1 in 5 uninterpretable':''}</text>`;
      s+=`<text x="${bx}" y="${by+28}" class="t-xs">13,369 liver stiffness exams</text>`;
      lines.forEach((l,j)=>{s+=N?`<text x="${K.x+12}" y="${K.y+56+j*14}" class="t-xs">${l}</text>`:`<text x="${K.x+332}" y="${K.y+15+j*14}" class="t-xs">${l}</text>`})}
    else lines.forEach((l,j)=>{s+=`<text x="${K.x+12}" y="${K.y+(N?24+j*24:15+j*14)}" class="${N?'t-xs':'t-sm'}" style="${j===0?'fill:var(--ink)':''}">${l}</text>`});
    svg.innerHTML=s;
    setSt(p);
    const nb=[0,0,0];NI_DOTS.forEach(d=>nb[d.b]++);
    $('#niRead').innerHTML=`<span>step <b>${p+1} of 5</b></span><span>example FIB-4 <b>${val.toFixed(2)}</b></span><span>stiffness shown <b>${kv.toFixed(1)} kPa</b></span>`;
    $('#niNote').innerHTML=noteHTML(st)+(p>=2?`<p class="stage-cap">* "Rules out cACLD" applies without other signs of advanced disease; the ≥25 kPa rule-in for CSPH was stated for virus- or alcohol-related and non-obese NASH-related cACLD. [[deFranchis2022BavenoVII]]</p>`:'');
  }
  const stop=playWire(rg,$('#niPlay'),draw,32000,'Replay','noninvasive');
  const setSt=stepWire($('#niSteps'),NI_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- FIB-4 teaching calculator ---- */
  const SETS={
   nafld:{cuts:[1.3,2.67],z:[['Low risk','below 1.3','var(--good)'],['Intermediate','1.3 to 2.67','var(--warn)'],['High risk','above 2.67','var(--bad)']],
     src:`AASLD 2023 (NAFLD) bands: low &lt;1.3, intermediate 1.3–2.67, high &gt;2.67. In Shah 2009 (541 adults with NAFLD), ≤1.30 gave a 90% negative predictive value and ≥2.67 an 80% positive predictive value for advanced fibrosis. [[Rinella2023AASLD,Shah2009FIB4]]`},
   age65:{cuts:[2.0],z:[['Below 2.0','proposed cut-off','var(--good)'],['2.0 or more','proposed cut-off','var(--warn)']],
     src:`For people aged 65 or over, McPherson proposed a FIB-4 cut-off of 2.0; at that cut-off specificity for advanced fibrosis was 70% with 77% sensitivity, against the 35% specificity reported for FIB-4 at that age. [[McPherson2017Age]]`},
   orig:{cuts:[1.45,3.25],z:[['Below 1.45','90% NPV (sens 70%)','var(--good)'],['1.45 to 3.25','in between','var(--warn)'],['Above 3.25','65% PPV (spec 97%)','var(--bad)']],
     src:`Sterling 2006 derived FIB-4 in 832 people with HIV/HCV coinfection: &lt;1.45 had a 90% negative predictive value (sensitivity 70%) and &gt;3.25 a 65% positive predictive value (specificity 97%) for Ishak stage 4–6. [[Sterling2006FIB4]]`},
   cirr:{cuts:[1.67,3.48],z:[['Below 1.67','rules out cirrhosis','var(--good)'],['1.67 to 3.48','in between','var(--warn)'],['3.48 or more','rules in cirrhosis','var(--bad)']],
     src:`For cirrhosis specifically, AASLD 2023 lists FIB-4 ≥3.48 to rule in (90% specificity) and &lt;1.67 to rule out (90% sensitivity). [[Rinella2023AASLD]]`}};
  const fs=$('#niFibSvg'),DEF={niAge:58,niAst:45,niAlt:38,niPlt:180};
  function calc(){const g=id=>parseFloat($('#'+id).value),age=g('niAge'),ast=g('niAst'),alt=g('niAlt'),plt=g('niPlt'),S=SETS[$('#niSet').value];
    const ok=[age,ast,alt,plt].every(v=>isFinite(v)&&v>0);
    const v=ok?niFib4(age,ast,alt,plt):NaN;
    let zi=-1;if(ok){zi=0;S.cuts.forEach((c,k)=>{if($('#niSet').value==='cirr'||$('#niSet').value==='age65'?v>=c:(k===0?v>=c:v>c))zi=k+1})}
    drawFib(v,S,zi);
    if(!ok){$('#niFibNote').innerHTML=`<div class="kicker">Teaching result</div><h4>Enter all four numbers</h4><p>Age, AST, ALT and platelets must each be a positive number.</p>`;return}
    const Z=S.z[zi],ageN=age<=35?`<p><b>Age ${age}:</b> FIB-4 performed poorly in people aged 35 or under (AUROC 0.60). [[McPherson2017Age]]</p>`:age>=65&&$('#niSet').value!=='age65'?`<p><b>Age ${age}:</b> at 65 or over FIB-4 specificity for advanced fibrosis fell to 35%; try the "Age 65 or over" cut-off above. [[McPherson2017Age]]</p>`:'';
    $('#niFibNote').innerHTML=`<div class="kicker">Teaching result (not a diagnosis)</div><div class="big-num">${v.toFixed(2)}</div>
      <div class="niform">${age} × ${ast} ÷ (${plt} × √${alt}) = ${f1(age*ast)} ÷ ${(plt*Math.sqrt(alt)).toFixed(1)}</div>
      <div class="verdict ${zi===0?'yes':zi===S.z.length-1?'no':'maybe'}">${Z[0]}: ${Z[1]}</div><p>${S.src}</p>${ageN}
      <div class="pt"><b>In plain words</b>FIB-4 is a free score made from your age and three routine blood tests. It helps decide who needs a liver scan, but it is not a diagnosis. [[Sterling2006FIB4,Rinella2023AASLD]]</div>
      <div class="hook"><b>Exam hook</b>Same person, different cut-offs: the band depends on which published set is used, which is why age- and cause-specific cut-offs are still debated.</div>`}
  function drawFib(v,S,zi){const N=vb(fs,'720 120','400 140'),x0=N?16:24,x1=N?384:696,y=N?72:62,mx=5,X=u=>lerp(x0,x1,clamp(u/mx));let s='';
    const c=[0,...S.cuts,mx];
    S.z.forEach((z,k)=>{s+=`<rect x="${f1(X(c[k]))}" y="${y-12}" width="${f1(X(c[k+1])-X(c[k]))}" height="24" style="fill:${z[2]};opacity:${k===zi?.55:.2}"/>`;
      const mid=(X(c[k])+X(c[k+1]))/2;s+=`<text x="${f1(mid)}" y="${y+4}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${k===zi?700:500}">${N&&z[0].length>11?z[0].split(' ')[0]:z[0]}</text>`});
    S.cuts.forEach(cc=>{s+=`<line x1="${f1(X(cc))}" x2="${f1(X(cc))}" y1="${y-16}" y2="${y+16}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(X(cc))}" y="${y+30}" class="t-xs t-mid" style="font-weight:700">${cc}</text>`});
    for(let u=0;u<=mx;u++)s+=`<text x="${f1(X(u))}" y="${y+44}" class="t-xs t-mid">${u}${u===mx?'+':''}</text>`;
    if(isFinite(v)){const xv=X(v);s+=`<path d="M${f1(xv-7)} ${y-30}L${f1(xv+7)} ${y-30}L${f1(xv)} ${y-17}Z" style="fill:var(--ink)"/><text x="${f1(clamp(xv,x0+40,x1-40))}" y="${y-36}" class="t-lbl t-mid">FIB-4 ${v.toFixed(2)}${v>mx?' (off scale)':''}</text>`}
    fs.innerHTML=s}
  ['niAge','niAst','niAlt','niPlt'].forEach(id=>$('#'+id).addEventListener('input',calc));
  $('#niSet').addEventListener('change',calc);
  $('#niReset').addEventListener('click',()=>{Object.entries(DEF).forEach(([k,v])=>$('#'+k).value=v);$('#niSet').value='nafld';calc()});
  calc();

  /* ---- kPa band explainer ---- */
  const ks=$('#niKSvg');
  function kcalc(){const v=+$('#niKpa').value,hi=$('#niKPlt').value==='hi',cause=$('#niKCause').value;$('#niKpaOut').textContent=v.toFixed(1);
    drawK(v);
    const bav=v<10?`<b>Below 10 kPa:</b> without other signs, rules out cACLD; Baveno VII gives a negligible 3-year risk (≤1%) of decompensation and liver-related death at this level.`:v<=15?`<b>10–15 kPa:</b> suggestive of cACLD.`:`<b>Above 15 kPa:</b> highly suggestive of cACLD.`;
    const tier=v<10?'below the first':v<15?'between 10 and 15, the first':v<20?'between 15 and 20, the second':v<25?'between 20 and 25, the third':'at or above 25, the highest';
    let csph;
    if(v<=15&&hi)csph=`<div class="verdict yes">CSPH ruled out: LSM ≤15 kPa with platelets ≥150 ×10⁹/L (sensitivity and NPV &gt;90%).</div>`;
    else if(v>=25&&cause!=='ob')csph=`<div class="verdict no">CSPH ruled in: LSM ≥25 kPa (specificity and PPV &gt;90%) in ${cause==='va'?'virus- or alcohol-related':'non-obese NASH-related'} cACLD.</div>`;
    else if(v>=25)csph=`<div class="verdict maybe">≥25 kPa, but Baveno VII stated this rule-in for virus- or alcohol-related and non-obese NASH-related cACLD, not for people with obesity.</div>`;
    else csph=`<div class="verdict maybe">Neither Baveno VII rule for CSPH applies here${v<=15&&!hi?' (the rule-out needs platelets ≥150 ×10⁹/L too)':''}.</div>`;
    const aas=v<8?'below 8 kPa rules out advanced fibrosis':v<=12?'8–12 kPa may indicate fibrotic NASH':v<20?'above 12 kPa makes advanced fibrosis likely, though the PPV is low (0.34–0.71)':'20 kPa or more rules in cirrhosis';
    $('#niKNote').innerHTML=`<div class="kicker">Teaching result (not a diagnosis)</div><div class="big-num">${v.toFixed(1)} <span style="font-size:18px">kPa</span></div>
      <p>${bav} [[deFranchis2022BavenoVII]]</p>${csph}
      <p><b>Rule of five:</b> this reading is ${tier} threshold (10, 15, 20, 25 kPa), which Baveno VII uses to mark progressively higher relative risks of decompensation and liver-related death. [[deFranchis2022BavenoVII]]</p>
      <p><b>AASLD 2023, fatty liver:</b> ${aas}.${cause==='va'?' These bands were written for NAFLD/MASLD; for alcohol-related disease a cut-off of about 12.5 kPa was suggested, with caution. [[Rinella2023AASLD,Pavlov2016ALD]]':' [[Rinella2023AASLD]]'}</p>
      ${v>=10?`<div class="hook"><b>Exam hook</b>Baveno VII: an index LSM ≥10 kPa should be repeated while fasting, because transient elastography can give false-positive results. [[deFranchis2022BavenoVII]]</div>`:`<div class="pt"><b>In plain words</b>A FibroScan is like an ultrasound. A gentle pulse measures how stiff the liver is, and stiffer usually means more scarring. [[FriedrichRust2008TE,deFranchis2022BavenoVII]]</div>`}`}
  function drawK(v){const N=vb(ks,'720 150','400 170'),x0=N?14:24,x1=N?386:696,X=u=>lerp(x0,x1,(clamp(u,2,40)-2)/38);let s='';
    const r1=N?34:30,r2=N?96:88;
    s+=`<text x="${x0}" y="${r1-14}" class="t-sm" style="fill:var(--ink)">Baveno VII (any cause)</text>`;
    [[2,10,'var(--good)','<10'],[10,15,'var(--bile)','10–15'],[15,20,'var(--warn)','15–20'],[20,25,'var(--artery)','20–25'],[25,40,'var(--bad)','≥25']].forEach(([a,b,c,l])=>{const on=v>=a&&(v<b||b===40);s+=`<rect x="${f1(X(a))}" y="${r1-6}" width="${f1(X(b)-X(a))}" height="22" style="fill:${c};opacity:${on?.6:.22}"/><text x="${f1((X(a)+X(b))/2)}" y="${r1+9}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${l}</text>`});
    s+=`<text x="${x0}" y="${r2-14}" class="t-sm" style="fill:var(--ink)">AASLD 2023 (fatty liver)</text>`;
    [[2,8,'var(--good)','<8'],[8,12,'var(--warn)','8–12'],[12,20,'var(--artery)','>12'],[20,40,'var(--bad)','≥20: cirrhosis']].forEach(([a,b,c,l])=>{const on=v>=a&&(v<b||b===40);s+=`<rect x="${f1(X(a))}" y="${r2-6}" width="${f1(X(b)-X(a))}" height="22" style="fill:${c};opacity:${on?.6:.22}"/><text x="${f1((X(a)+X(b))/2)}" y="${r2+9}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${l}</text>`});
    [2,10,20,30,40].forEach(u=>s+=`<text x="${f1(X(u))}" y="${r2+32}" class="t-xs t-mid">${u}</text>`);
    s+=`<text x="${x1}" y="${r2+46}" class="t-xs t-end">kPa (transient elastography)</text>`;
    const xv=X(v);s+=`<line x1="${f1(xv)}" x2="${f1(xv)}" y1="${r1-10}" y2="${r2+20}" style="stroke:var(--ink);stroke-width:2"/><circle cx="${f1(xv)}" cy="${r1-10}" r="4" style="fill:var(--ink)"/>`;
    ks.innerHTML=s}
  $('#niKpa').addEventListener('input',kcalc);$('#niKPlt').addEventListener('change',kcalc);$('#niKCause').addEventListener('change',kcalc);
  kcalc();
  const prevR=redraws.noninvasive;redraws.noninvasive=()=>{prevR&&prevR();calc();kcalc()};
};
