/* =============== 1.2 Standard drinks, blood alcohol & metabolism =============== */
/* One illustrative evening: four 14 g drinks at hours 0, 1, 2 and 3. Every model value comes from the
   research pass (cited in the stage caption); the absorption speeds are ours, chosen so the peak after
   each drink lands inside the published 10-60 minute window. */
const DR_H=12;
const DR_DOSES=[[0,14],[1,14],[2,14],[3,14]];
const DR_PERSON={m:{kg:70,r:.68,n:'man, 70 kg'},f:{kg:60,r:.55,n:'woman, 60 kg'}};
const DR_FOOD=[{ka:4,beta:.0125,n:'empty stomach'},{ka:1.5,beta:.0175,n:'after a meal'}];
/* effect ladder: Abrahao 2017 thresholds in mM, converted to g/dL by the research team */
const DR_BANDS=[
 {from:.03,to:.055,col:'var(--gaba-fill)',label:'≈0.03 effects distinguishable'},
 {from:.055,to:.08,col:'var(--thi-fill)',label:'≈0.055 anxiolytic, euphoric'},
 {from:.08,to:.23,col:'var(--eth-fill)',label:'≈0.08 slowed reactions → sedation'},
 {from:.23,to:.6,col:'var(--glu-fill)',label:'>0.23 coma, breathing stops'}];
const DR_STEPS=[
 {from:0,at:.02,k:'Hour 0 · the first drink',t:'Grams, not glasses',
  txt:`This evening is four US standard drinks of about 14 g of ethanol each, one an hour. [[KranzlerSoyka2018]] Ethanol is absorbed quickly from the gut: peak blood alcohol after a dose usually comes 10–60 minutes later. [[Jones2019WIREs]] How fast depends on the drinking pattern, the drink's strength and, most of all, whether the person has eaten. [[Norberg2003]] Press <b>After a meal</b> to compare.`,
  pt:`A drink is counted by the grams of pure alcohol in it. From the stomach it reaches the blood within minutes.`,
  hook:`US standard drink = 0.6 oz ethanol (≈14 g): 12 oz beer 5%, 5 oz wine 12%, 1.5 oz spirits 40%. GBD and the WHO AUDIT use 10 g. [[KranzlerSoyka2018,GBD2016Alcohol]]`},
 {from:.05,at:.2,k:'Hours 0.5–3 · rising',t:'Absorption outpaces the liver',
  txt:`Ethanol spreads through total body water: it has low lipid solubility and does not bind to plasma proteins. [[Norberg2003]] Its average volume of distribution is about 0.70 L/kg in men and 0.60 L/kg in women; estimate formulas often use fixed Widmark factors of 0.68 and 0.55. [[Jones2019WIREs,Terpstra2020]] Each new drink arrives faster than the liver can clear it, so the curve climbs in steps. Switch to <b>Woman, 60 kg</b>: the same grams in less body water give a higher curve. [[Frezza1990]]`,
  pt:`The alcohol spreads into the water in the body. Less body water means a higher level from the same drinks.`,
  hook:`BAC ≈ grams ÷ (r × body weight). r ≈ 0.68 men, 0.55 women (Widmark). [[Terpstra2020]]`},
 {from:.27,at:.305,k:'About hour 3.5 · the peak',t:'The peak, and what the brain feels',
  txt:`Effects follow blood level, but not exactly. Abrahao 2017 gives thresholds in millimolar: effects reliably distinguishable at about 6 mM (≈0.03 g/dL), anxiolytic and euphoric effects at about 12 mM (≈0.055), slowed reactions, poor coordination and impaired thinking around legal intoxication, 18 mM (≈0.08). Up to 50 mM (≈0.23) sedation escalates; above it, strong sedation and respiratory depression can lead to coma or death. [[Abrahao2017]] Severity also depends on how fast alcohol is taken, tolerance and other conditions. [[Parmar2026StatPearls]]`,
  pt:`The higher the level, the more the brain slows. At very high levels breathing can stop: that is alcohol poisoning, an emergency.`,
  hook:`100 mg/100 mL (0.1%) ≈ 22 mM ethanol. [[Edenberg2007]]`},
 {from:.36,at:.47,k:'Hours 4–9 · falling',t:'A straight-line fall: zero-order elimination',
  txt:`Once absorption ends, BAC falls by about the same amount every hour. The rate-limiting step is cytosolic alcohol dehydrogenase (ADH), whose Km is so low (2–10 mg/100 mL) that it is saturated after the first few drinks: zero-order kinetics describe the fall above about 20 mg/100 mL. [[Jones2010]] Typical rates are 10–15 mg/100 mL per hour fasting and 15–20 after food; 15 is a good average for moderate drinkers. [[Jones2010]] Average liver capacity is about 7 g of ethanol an hour. [[Cederbaum2012]]`,
  pt:`The liver works at a fixed top speed, roughly one drink an hour. Coffee, a cold shower or sleep do not change that; only time does.`,
  hook:`<b>Zero-order</b>: BAC falls by a constant amount per hour (≈0.015 g/dL/h), not a constant fraction. ADH is saturated. [[Jones2010]]`},
 {from:.55,at:.6,k:'Inside a liver cell',t:'Ethanol → acetaldehyde → acetate',
  txt:`ADH, with help from CYP2E1 and catalase, oxidises ethanol to acetaldehyde; mitochondrial ALDH2 then oxidises acetaldehyde to acetate. Both steps reduce NAD<sup>+</sup> to NADH. [[Zakhari2006,Cederbaum2012]] The NADH surplus stimulates fatty-acid synthesis and opposes fat burning, which promotes fatty liver, and raises lactate. [[Lieber2004Fatty]] Acetaldehyde, the first and most toxic metabolite, is a mutagen that damages DNA and the main focus of research into how alcohol causes cancer. [[Seitz2007,Brooks2009]] Normally most is cleared at once, so blood acetaldehyde stays low: the small middle pool. [[Cederbaum2012]] See <a href="#liver" data-go="liver">The liver</a>.`,
  pt:`The liver turns alcohol into acetaldehyde, a harmful substance linked to cancer, and then into harmless acetate. The process also pushes the liver to store fat.`,
  hook:`Acetaldehyde causes the <b>flush</b> (when ALDH2 is slow) and is a <b>carcinogen</b>; NADH excess → fatty liver. [[Brooks2009,Lieber2004Fatty]]`},
 {from:.75,at:.88,k:'Hours 9–12 · the tail',t:'Back to zero, eventually',
  txt:`Below about 20 mg/100 mL ADH is no longer saturated and the line curves into the axis. [[Jones2010]] 92–98% of ethanol is oxidised; only 2–10% leaves unchanged in breath, urine and sweat, and 0.1–0.2% becomes ethyl glucuronide and ethyl sulfate, the basis of the urine tests in <a href="#biomarkers" data-go="biomarkers">Blood and urine markers</a>. [[Jones2019WIREs]] People who drink heavily clear faster, 25–35 mg/100 mL per hour, because CYP2E1 is induced, which also brings cross-tolerance to other drugs and more toxic paracetamol metabolites. [[Jones2010,Lieber2004MEOS]]`,
  pt:`It can take many hours to clear an evening's drinks, often past the next morning.`,
  hook:`Chronic drinking induces CYP2E1 (MEOS): faster clearance, cross-tolerance, more toxic acetaminophen metabolites. Acute drinking <b>inhibits</b> other drugs' metabolism. [[Lieber2004MEOS]]`}
];

/* BAC function sampled once per scenario, then looked up */
function drTable(doses,kg,r,beta,ka,H,step){const f=bacSeries({doses,kg,r,beta,ka}),n=Math.round(H/step),a=new Float64Array(n+1);for(let i=0;i<=n;i++)a[i]=f(i*step);
  return h=>{const u=clamp(h,0,H)/step,i=Math.floor(u),j=Math.min(n,i+1);return lerp(a[i],a[j],u-i)}}

inits.drinks=()=>{
  const svg=$('#drSvg'),rg=$('#drT');let sx='m',fd=0;const cache={};
  const scen=()=>{const k=sx+fd;if(!cache[k]){const P=DR_PERSON[sx],F=DR_FOOD[fd];const f=drTable(DR_DOSES,P.kg,P.r,F.beta,F.ka,DR_H,1/30);
      let pk=0,ph=0,zero=null;for(let h=0;h<=DR_H;h+=1/30){const v=f(h);if(v>pk){pk=v;ph=h}if(h>3.2&&zero==null&&v<=0)zero=h}
      cache[k]={f,P,F,pk,ph,zero,vd:P.r*P.kg*10}}return cache[k]};
  const gut=(h,ka)=>DR_DOSES.reduce((s,[t0,g])=>s+(h>=t0?g*Math.exp(-ka*(h-t0)):0),0);
  const given=h=>DR_DOSES.reduce((s,[t0,g])=>s+(h>=t0?g:0),0);
  /* fixed scatter positions for ethanol marks in the blood */
  const R=rng(77),BL=[];for(let i=0;i<40;i++){const head=i%7===0;BL.push(head?[(R()*2-1)*13,14+R()*20]:[(R()*2-1)*36,78+R()*140])}
  const SG=[];for(let i=0;i<14;i++)SG.push([8+R()*20,140+R()*20]);
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 372','400 600'),S=scen(),h=t*DR_H,b=S.f(h),gG=gut(h,S.F.ka),gv=given(h),elim=Math.max(0,gv-gG-b*S.vd);
    const db=(S.f(Math.min(DR_H,h+.05))-S.f(Math.max(0,h-.05)))/.1;
    let s=`<defs>${marker('drA','var(--muted)')}</defs>`;
    /* ---- body ---- */
    const bx=N?72:116,by=N?18:28,bs=N?.84:1.28;
    const body=bodymap(bx,by,bs,{hl:{stomach:clamp(gG/20),liver:b>.002?.55+.45*clamp(b/.1):0,brain:clamp(b/.12)},col:{stomach:'var(--eth-fill)',liver:'var(--liver)',brain:'var(--gaba-fill)'}});
    s+=body.svg;const A=body.at,P=(a,c)=>[bx+a*bs,by+c*bs];
    /* drinks travelling down: each dose shows for 0.3 h */
    DR_DOSES.forEach(([t0])=>{const u=(h-t0)/.3;if(u<0||u>1)return;
      for(let k=0;k<4;k++){const v=clamp(u*1.2-k*.07),p=v<.35?[lerp(A.mouth[0],A.oeso[0],v/.35),lerp(A.mouth[1],A.oeso[1],v/.35)]:[lerp(A.oeso[0],A.stomach[0],(v-.35)/.65),lerp(A.oeso[1],A.stomach[1],(v-.35)/.65)];
        s+=mol(p[0],p[1],'eth',{r:N?3.6:4.4})}});
    /* in the stomach and gut */
    for(let i=0;i<Math.round(clamp(gG/3,0,14));i++){const q=P(SG[i][0],SG[i][1]);s+=mol(q[0],q[1],'eth',{r:N?2.6:3})}
    /* in the blood: count follows BAC */
    for(let i=0;i<Math.round(clamp(b/.004,0,40));i++){const q=P(BL[i][0],BL[i][1]);s+=mol(q[0],q[1],'eth',{r:N?2.2:2.6,op:.8})}
    /* labels */
    const lab=(k,txt,side)=>{const [x,y]=A[k],lx=side>0?bx+(N?52:80):bx-(N?52:80);s+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(lx+(side>0?-3:3))}" y2="${f1(y)}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(lx)}" y="${f1(y+3.5)}" class="t-xs${side>0?'':' t-end'}">${txt}</text>`};
    lab('stomach','stomach, gut',1);lab('liver','liver',-1);lab('brain','brain',-1);
    if(!N)s+=`<text x="${bx}" y="${by+bs*250+6}" class="t-xs t-mid">amber marks: ethanol (schematic)</text>`;
    /* ---- BAC curve ---- */
    const cx=N?44:262,cy=N?262:28,cw=N?344:438,ch=N?210:182,Y1=.26;
    const C=curve(cx,cy,cw,ch,S.f,{x0:0,x1:DR_H,y0:0,y1:Y1,upto:h,fill:true,dot:true,bands:DR_BANDS});
    s+=C.svg;
    for(let v=0;v<=12;v+=2)s+=`<text x="${f1(C.X(v))}" y="${cy+ch+13}" class="t-xs t-mid">${v}</text>`;
    s+=`<text x="${cx+cw}" y="${cy+ch+26}" class="t-xs t-end">hours since the first drink</text>`;
    [.05,.1,.15,.2,.25].forEach(v=>s+=`<text x="${cx-5}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v?v.toFixed(2):'0'}</text>`);
    s+=`<text x="${cx}" y="${cy-8}" class="t-sm" style="fill:var(--eth)">BLOOD ALCOHOL, g/dL · ${S.P.n}, ${S.F.n}</text>`;
    DR_DOSES.forEach(([t0])=>{const x=C.X(t0);s+=`<path d="M${f1(x)} ${cy+ch}v-7" style="stroke:var(--eth);stroke-width:2"/>`+(h>=t0?`<circle cx="${f1(x)}" cy="${cy+ch-10}" r="2.6" style="fill:var(--eth)"/>`:'')});
    /* slope guide: the straight zero-order line */
    if(h>S.ph+.6&&b>.02){const h0=S.ph+.5,v0=S.f(h0),h1=Math.min(h,h0+(v0-.02)/S.F.beta);
      s+=`<line x1="${f1(C.X(h0))}" y1="${f1(C.Y(v0))}" x2="${f1(C.X(h1))}" y2="${f1(C.Y(v0-S.F.beta*(h1-h0)))}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 4;opacity:.7"/>`;
      const mx=C.X((h0+h1)/2),my=C.Y(v0-S.F.beta*(h1-h0)/2);
      s+=`<text x="${f1(mx+6)}" y="${f1(my+16)}" class="t-xs" style="fill:var(--ink)">−${S.F.beta.toFixed(4).replace(/0$/,'')} g/dL every hour</text>`}
    /* ---- liver cell inset ---- */
    const lx=N?132:262,ly=N?18:242,lw=N?260:438,lh=N?206:118;
    s+=`<rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="14" style="fill:var(--cell);stroke:var(--liver);stroke-width:1.4"/>`;
    s+=`<text x="${lx+12}" y="${ly+17}" class="t-sm" style="fill:var(--liver)">INSIDE A LIVER CELL</text>`;
    const act=b>.002,sat=b>.02,acet=act?.12+.12*clamp(b/.1):0;
    const pw=pathway(lx+(N?6:40),ly+(N?52:22),lw-(N?12:80),{eth:clamp(b/.13),acet,ace:act?.35+.25*clamp(b/.1):clamp(.35-(h-(S.zero||DR_H))*.2,0,.35),nadh:act?(sat?.9:.5):0});
    s+=pw.svg;
    if(act){const e=pw.at.eth,c=pw.at.acet,a=pw.at.ace;for(let k=0;k<3;k++){const u=((h*3.2)+k/3)%1;
        s+=mol(lerp(e[0]+24,c[0]-26,u),e[1]+(N?14:13),'eth',{r:2.6})+mol(lerp(c[0]+24,a[0]-26,(u+.5)%1),c[1]+(N?14:13),'acet',{r:2.4})}}
    const st=!act?(gv?'ADH idle: no ethanol left':'waiting for the first drink'):(db>.002&&!sat)?'absorbing: ethanol reaching the liver':sat?'ADH saturated: same speed at any BAC':'below ≈0.02 g/dL: ADH no longer saturated';
    s+=`<text x="${lx+lw-12}" y="${ly+17}" class="t-xs t-end" style="fill:var(--ink)">${N?'':st}</text>`;
    if(N)s+=`<text x="${lx+lw/2}" y="${ly+lh-10}" class="t-xs t-mid" style="fill:var(--ink)">${st}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(DR_STEPS,t);setSt(ph);$('#drNote').innerHTML=noteHTML(DR_STEPS[ph]);
    $('#drRead').innerHTML=`<span>hour <b>${f1(h)}</b></span><span>BAC <b>${b.toFixed(3)}</b> g/dL (teaching value)</span><span>${db>.002?'<b>rising</b>':b>.001?'falling <b>'+(-db).toFixed(3)+'</b> g/dL/h':'<b>—</b>'}</span><span>drunk <b>${gv}</b> g · in gut <b>${f1(gG)}</b> g · cleared <b>${f1(elim)}</b> g</span><span>peak <b>${S.pk.toFixed(3)}</b> at ${f1(S.ph)} h · zero ${S.zero?'at <b>'+f1(S.zero)+' h</b>':'<b>not yet by 12 h</b>'}</span>`;
  }
  const stop=playWire(rg,$('#drPlay'),draw,22000,'Replay','drinks');
  setSt=stepWire($('#drSteps'),DR_STEPS,rg,draw,stop);
  $$('[data-drsx]').forEach(b=>b.addEventListener('click',()=>{sx=b.dataset.drsx;$$('[data-drsx]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-drfd]').forEach(b=>b.addEventListener('click',()=>{fd=+b.dataset.drfd;$$('[data-drfd]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- standard-drink converter ---- */
  const cv=$('#drConv'),vol=$('#drVol'),abv=$('#drAbv');
  function conv(){const N=vb(cv,'720 236','400 360'),V=+vol.value,A=+abv.value,g=V*A/100*.789;
    $('#drVolV').textContent=`${V} mL (${f1(V/29.57)} US fl oz)`;$('#drAbvV').textContent=`${A}%`;
    let s='';const bwx=N?24:30,bwy=N?30:40,bw=N?64:84,bh=N?110:150;
    s+=beaker(bwx,bwy,bw,bh,V/1000,{label:`${V} mL at ${A}%`,ticks:4});
    s+=`<text x="${bwx+bw+4}" y="${bwy+2}" class="t-xs">1 L</text>`;
    const gx=N?120:150;
    s+=`<text x="${gx}" y="${bwy+24}" class="t-big" style="font-size:${N?30:36}px;fill:var(--eth)">${f1(g)} g</text><text x="${gx}" y="${bwy+42}" class="t-xs">of pure ethanol = ${V} × ${A}/100 × 0.789</text>`;
    const rows=[[14,'US standard drinks (14 g)'],[10,'standard drinks of 10 g'],[8,'UK units (8 g)']],cap=N?16:24,ix=N?24:330,iy0=N?178:28,sp=N?22:15.5,iw=N?13:10,ihh=N?20:16,rowH=N?60:70;
    rows.forEach(([gr,nm],ri)=>{const n=g/gr,y=iy0+ri*rowH+(N?0:4);
      s+=`<text x="${ix}" y="${y}" class="t-lbl">${n<10?n.toFixed(1):Math.round(n)} <tspan class="t-sm" style="font-weight:500">${nm}</tspan></text>`;
      const full=Math.min(cap,Math.ceil(n-.02));for(let i=0;i<full;i++){const lv=i<Math.floor(n+.02)?1:n-Math.floor(n);s+=beaker(ix+i*sp,y+12,iw,ihh,lv,{ticks:1})}
      if(n>cap)s+=`<text x="${ix+cap*sp+2}" y="${y+28}" class="t-xs">+${Math.ceil(n-cap)} more</text>`});
    cv.innerHTML=s;
    $('#drConvNote').innerHTML=noteHTML({k:'The same grams, three ways of counting',t:`${f1(g)} g of ethanol`,
      txt:`That is ${f1(g/14)} US standard drinks, ${f1(g/10)} drinks of 10 g or ${f1(g/8)} UK units. Strength matters as much as size: a large 250 mL glass of 13% wine holds almost two US drinks (25.6 g). Because the WHO AUDIT assumes a 10 g drink, the US drink is 40% larger and the USAUDIT adapts its questions to it. [[HigginsBiddle2018USAUDIT]]`,
      pt:`Count grams, not glasses. A pint of strong beer or a big glass of wine is often more than one "drink".`,
      hook:`grams = mL × ABV% ÷ 100 × 0.789. National standard drinks range from 8 to 20 g; the modal one is 10 g. [[Kalinowski2016]]`});
  }
  [vol,abv].forEach(e=>e.addEventListener('input',conv));
  $$('[data-drp]').forEach(b=>b.addEventListener('click',()=>{const [v,a]=b.dataset.drp.split(',');vol.value=v;abv.value=a;conv()}));
  conv();

  /* ---- teaching BAC calculator ---- */
  const cs=$('#drCalc'),cN=$('#drcN'),cH=$('#drcH'),cW=$('#drcW'),cG=$('#drcG'),cR=$('#drcR'),cB=$('#drcB');
  function calc(){const N=vb(cs,'720 300','400 340'),n=+cN.value,H=+cH.value,kg=+cW.value,gr=+cG.value,r=+cR.value,beta=+cB.value;
    $('#drcNV').textContent=n;$('#drcHV').textContent=H+' h';$('#drcWV').textContent=kg+' kg';
    const doses=[];for(let i=0;i<n;i++)doses.push([n>1?i*H/(n-1):0,gr]);
    const HM=16,f=drTable(doses,kg,r,beta,6,HM,1/10);let pk=0,ph=0,zero=null;for(let h=0;h<=HM+1e-9;h+=.1){const v=f(h);if(v>pk){pk=v;ph=h}if(h>H&&zero==null&&v<=0)zero=h}
    const top=Math.min(.6,Math.max(.1,Math.ceil(pk*1.3/.05)*.05));
    const x0=N?44:62,y0=N?36:30,w=N?344:630,hh=N?240:220;
    const C=curve(x0,y0,w,hh,f,{x0:0,x1:HM,y0:0,y1:top,fill:false,dot:false,bands:DR_BANDS.map(b=>Object.assign({},b,{label:N&&b.from<.05?'':b.label}))});
    let band='';for(let i=0;i<=80;i++){const hv=HM*i/80;band+=(i?'L':'M')+f1(C.X(hv))+' '+f1(C.Y(f(hv)*1.21))}for(let i=80;i>=0;i--){const hv=HM*i/80;band+='L'+f1(C.X(hv))+' '+f1(C.Y(f(hv)*.79))}
    let s=C.svg+`<path d="${band}Z" style="fill:var(--eth-fill);opacity:.22"/>`+curve(x0,y0,w,hh,f,{x0:0,x1:HM,y0:0,y1:top,col:'var(--eth)'}).svg.replace(/<rect[^>]*var\(--field\)[^>]*\/>/,'').replace(/<line[^>]*class="axis"\/>/g,'');
    for(let v=0;v<=HM;v+=2)s+=`<text x="${f1(C.X(v))}" y="${y0+hh+13}" class="t-xs t-mid">${v}</text>`;
    s+=`<text x="${x0+w}" y="${y0+hh+26}" class="t-xs t-end">hours since the first drink</text>`;
    const tk=top<=.15?.025:top<=.3?.05:.1;for(let v=0;v<=top+1e-9;v+=tk)s+=`<text x="${x0-5}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v?v.toFixed(tk<.05?3:2):'0'}</text>`;
    doses.forEach(([t0])=>s+=`<path d="M${f1(C.X(t0))} ${y0+hh}v-7" style="stroke:var(--eth);stroke-width:2"/>`);
    s+=`<text x="${x0}" y="${y0-10}" class="t-sm" style="fill:var(--warn)">TEACHING CURVE · not a measurement · not a guide to driving</text>`;
    cs.innerHTML=s;
    const tot=n*gr,poison=pk*1.21>.23;
    $('#drCalcNote').innerHTML=noteHTML({k:`${n} × ${gr} g = ${tot} g ethanol · ${kg} kg · r ${r} · β ${beta}`,t:`Textbook peak ≈ ${pk.toFixed(3)} g/dL`,
      txt:`On this model the peak comes about ${f1(ph)} h after the first drink and the curve reaches zero ${zero?'after about <b>'+f1(zero)+' h</b>':'<b>after more than 16 h</b>'}. With the ±21% band the peak could be ${(pk*.79).toFixed(3)}–${(pk*1.21).toFixed(3)} g/dL, and real bodies vary more. [[Searle2015,Posey2007Widmark]] Only time lowers BAC: the liver clears about 7 g an hour on average. [[Cederbaum2012]]${poison?` <b>The upper edge of this curve crosses ≈0.23 g/dL, the level above which published research describes strong sedation and respiratory depression that can lead to coma or death.</b> [[Abrahao2017]] In real life, someone who cannot be woken or is breathing slowly needs emergency services now. [[Kanny2015]]`:''}`,
      pt:`This shows the shape of the curve: up while drinks are absorbed, then down by a fixed amount each hour. It cannot tell you or anyone else whether it is safe to drive or to keep drinking.`,
      hook:`Widmark: C = A ÷ (r × W) − β × t. Halving β (a slow eliminator) roughly doubles the time to zero. [[Terpstra2020,Jones2010]]`});
  }
  [cN,cH,cW].forEach(e=>e.addEventListener('input',calc));[cG,cR,cB].forEach(e=>e.addEventListener('change',calc));
  calc();
  const prevR=redraws.drinks;redraws.drinks=()=>{prevR&&prevR();conv();calc()};
};
