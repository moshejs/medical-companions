/* =============== 2.1 Alcohol-related liver disease =============== */
inits.alcohol=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;

  /* ---------- 1. the spectrum: 100 heavy drinkers ---------- */
  const STEPS=[
    {from:0,at:.08,k:'The starting point',t:'Heavy drinking',
     txt:`ACG 2018 defines a US standard drink as about 14 g of alcohol and describes heavy drinking as more than 3 drinks a day for men and more than 2 for women. Most people who drink more than 40 g a day develop a fatty liver, but only a subset go on to more advanced disease. The 100 icons are one group of people who drink heavily. [[Singal2018ACG,Seitz2018NRDP]]`,
     pt:`A "standard drink" is a small can of beer, a small glass of wine or a single shot of spirits. Heavy drinking means more than 3 a day for men or 2 for women.`,
     hook:`ARLD spectrum: steatosis → steatohepatitis → fibrosis → cirrhosis (± HCC); alcohol-associated hepatitis can appear at any point on top of it. [[Seitz2018NRDP]]`},
    {from:.18,at:.3,k:'Within weeks',t:'Fatty liver in about 9 in 10',
     txt:`ACG 2018: fatty liver, usually large droplets (macrovesicular), "develops in ~90% of heavy drinkers". It may appear within 2 weeks of heavy, regular drinking and "resolves rapidly following complete abstinence". The cells on the left fill with fat droplets. [[Singal2018ACG]]`,
     pt:`Almost everyone who drinks heavily gets fat stored in the liver. This stage usually clears if drinking stops.`,
     hook:`About 90% of heavy drinkers develop steatosis; it reverses with abstinence. [[Singal2018ACG]]`},
    {from:.4,at:.5,k:'Inflammation',t:'Steatohepatitis',
     txt:`In some people the fatty liver becomes inflamed: alcohol-related steatohepatitis, with swollen, injured cells. "Pure" fatty liver is not harmless either: of 88 people with biopsy-proven fatty liver and no fibrosis, followed for a median 10.5 years, 9 developed cirrhosis and 7 fibrosis; 8 of the 9 were still drinking more than 40 units a week. [[Seitz2018NRDP,Teli1995Lancet]]`,
     pt:`The liver cells become irritated and swollen. Scar can start to form if drinking continues.`,
     hook:`Teli 1995: 9 of 88 people with "simple" alcohol-related fatty liver reached cirrhosis in about 10 years, mostly those who kept drinking.`},
    {from:.6,at:.72,k:'Years to decades',t:'Cirrhosis or severe hepatitis in 1–2 in 10',
     txt:`ACG 2018: "only about 10–20% of chronic heavy drinkers develop severe forms such as AH or cirrhosis", with behavioural, environmental and genetic cofactors as likely modifiers. People with ARLD progress faster than people with other causes and more often present late. Alcohol-related cirrhosis carries a lifetime liver-cancer risk of about 3–10% (about 1% a year). [[Singal2018ACG,Jophlin2024ACG]]`,
     pt:`Most heavy drinkers never get cirrhosis, but no one can tell in advance who will. Genes, weight and drinking pattern all play a part.`,
     hook:`Only 10–20% of chronic heavy drinkers develop severe AH or cirrhosis (shaded icons: the lighter ten show the upper end of the range). [[Singal2018ACG]]`},
    {from:.8,at:.93,k:'What stopping does',t:'Stopping drinking',
     txt:`Abstinence is "the best treatment for all stages". Fat clears quickly; scar can thin, though nodules may remain. Among 633 people with decompensated alcohol-related cirrhosis who stopped drinking, 31.1% regained compensation by Baveno VII criteria (33.8% cumulative by 5 years), and stopping within 1 month of decompensation raised the chance (aSHR 2.04). [[Seitz2018NRDP,Hofer2026JHep]]`,
     pt:`Stopping helps at every stage. About 1 in 3 people with complications who stopped drinking recovered enough that the complications went away. These are averages, not a promise.`,
     hook:`Abstinence-induced recompensation: 12.3% at 1 year, 23.4% at 2 years, 33.8% at 5 years. [[Hofer2026JHep]]`}
  ];
  const svg=$('#alSvg'),rg=$('#alT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const fat=ramp(t,.18,.34),hurt=ramp(t,.42,.56),fib=4*ease(ramp(t,.46,.76)),reg=ramp(t,.82,.97);
    const fatNow=fat*(1-.85*reg),hurtNow=hurt*(1-.8*reg);
    let s='';
    /* liver + cells */
    const L=N?{x:200,y:92,s:1.15}:{x:172,y:118,s:1.4};
    s+=liver(L.x,L.y,L.s,{fib,regress:reg,seed:11}).svg;
    if(fatNow>.05){/* fat speckles over the liver */const r=rng(5);for(let i=0;i<26;i++){const a=r()*6.28,d=r();const px=L.x+(r()*150-80)*L.s*.8,py=L.y+(r()*70-40)*L.s*.8;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1((1.4+2.4*d)*L.s*fatNow)}" style="fill:var(--accent-soft);stroke:var(--bile);stroke-width:.6;opacity:${f1(.85*fatNow)}"/>`}}
    s+=T(L.x,N?28:30,['Healthy liver','Fatty liver','Steatohepatitis','Cirrhosis','After stopping'][phaseOf(STEPS,t)],'t-lbl t-mid');
    const cy=N?218:292,cx=N?[110,200,290]:[92,172,252],cs=N?50:58;
    s+=`<line x1="${cx[0]-cs*.7}" x2="${cx[2]+cs*.7}" y1="${cy-cs*.72}" y2="${cy-cs*.72}" class="grid"/>`;
    cx.forEach((x,i)=>{const f=clamp(fatNow*(1.15-i*.12)),h=clamp(hurtNow*(.6+i*.25));s+=hepatocyte(x,cy,cs,{fat:f,hurt:h,seed:3+i});
      if(h>.3){/* inflammatory cells */for(let k=0;k<3;k++){const a=k*2.1+i;s+=`<circle cx="${f1(x+Math.cos(a)*cs*.62)}" cy="${f1(cy+Math.sin(a)*cs*.5)}" r="${f1(3)}" style="fill:var(--nh3-fill);opacity:${f1(h)}"/>`}}});
    if(fib>1.5)s+=collagen(cx[0]+cs*.45,cy+cs*.42,cx[2]-cs*.45,cy+cs*.42,{op:ramp(fib,1.5,3.5)*(1-.6*reg),amp:2.5});
    s+=T(cx[1],cy+cs*.62+14,'magnified liver cells','t-xs t-mid');
    /* icon array */
    const A=N?{x:86,y:300,dx:24,dy:24,s:19}:{x:396,y:50,dx:30,dy:28.5,s:22};
    s+=T(N?200:546,A.y-14,'100 people who drink heavily','t-sm t-mid','fill:var(--ink)');
    const nFat=Math.round(90*fat),sev=ramp(t,.62,.7),sev2=ramp(t,.66,.76);
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,x=A.x+c*A.dx,y=A.y+r*A.dy;
      let col='var(--muted)',op=.32;
      if(i<nFat){col='var(--bile)';op=1-.7*reg}
      if(i<10&&sev>0){col='var(--liver)';op=.35+.65*sev}
      else if(i>=10&&i<20&&sev2>0){col='var(--nodule)';op=(.25+.5*sev2)}
      s+=person(x,y,A.s,col,{op})}
    /* legend */
    const lg=N?[[40,552],[150,552],[268,552]]:[[396,350],[486,350],[594,350]];
    const lt=[['var(--bile)','fatty liver'],['var(--liver)','severe: 10'],['var(--nodule)','up to 20']];
    lt.forEach(([c,l],i)=>{s+=`<rect x="${lg[i][0]}" y="${lg[i][1]-8}" width="10" height="10" rx="2" style="fill:${c}"/>`+T(lg[i][0]+14,lg[i][1]+1,l,'t-xs')});
    if(reg>.05){const bx=N?200:546,by=N?432:210;
      s+=`<g style="opacity:${f1(reg)}"><rect x="${bx-(N?175:150)}" y="${by-30}" width="${N?350:300}" height="62" rx="10" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.5"/>`+T(bx,by-10,'After stopping, fat clears quickly.','t-sm t-mid','fill:var(--ink)')+T(bx,by+7,'Decompensated cirrhosis: about 1 in 3','t-sm t-mid','fill:var(--rx)')+T(bx,by+22,'regained compensation by 5 years','t-sm t-mid','fill:var(--rx)')+'</g>'}
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);$('#alNote').innerHTML=noteHTML(STEPS[p]);setSt(p);
    $('#alRead').innerHTML=`<span>Fatty liver: <b>${nFat} of 100</b></span><span>Severe hepatitis or cirrhosis: <b>${sev2>.5?'10–20':sev>.5?'10':'0'} of 100</b></span><span>Scar stage (schematic): <b>F${Math.min(4,Math.round(fib*(1-.3*reg)))}</b></span>`;
  }
  const stop=playWire(rg,$('#alPlay'),draw,22000,'Replay','alcohol');
  setSt=stepWire($('#alSteps'),STEPS,rg,draw,stop);draw(+rg.value);

  /* ---------- 2. dose–response (Roerecke 2019) ---------- */
  const CAT=[
    {x:0,n:'Long-term abstainers',sh:'abstain'},
    {x:1,n:'Occasional',sh:'occasional'},
    {x:2,n:'1 a day',sh:'1/day'},
    {x:4,n:'5–6 a day',sh:'5–6/day',f:[12.44,6.65,23.27],m:[3.80,.85,17.02]},
    {x:5,n:'7 or more a day',sh:'7+/day',f:[24.58,14.77,40.90],m:[6.93,1.07,44.99]}];
  const sex={f:true,m:true};
  const ds=$('#alDose'),dr=$('#alDoseT');
  const DNOTE=[
    {k:'Reference group',t:'Long-term abstainers',txt:`Every risk in this chart is relative to people who have not drunk for a long time (RR = 1). In a Danish cohort of 55,917 adults, no cases of alcohol-related cirrhosis occurred in lifetime abstainers. [[Roerecke2019Cirrhosis,Askgaard2015JHep]]`,
     pt:`The chart compares each drinking level with people who do not drink.`},
    {k:'Occasional drinking',t:'No increase found',txt:`The meta-analysis found no increased cirrhosis risk for occasional drinkers compared with long-term abstainers. Whether any level is truly "safe" for the liver is unresolved: the data are observational and rely on self-report. [[Roerecke2019Cirrhosis]]`,
     pt:`Drinking now and then did not raise the risk of cirrhosis in these studies.`},
    {k:'About 12 g a day',t:'One drink a day: women and men differ',txt:`One drink a day raised cirrhosis risk in women but not in men, compared with long-term abstainers. Women's risk was "consistently higher" than men's at every level. [[Roerecke2019Cirrhosis]]`,
     pt:`For women, even one drink a day raised the risk a little. For men, it did not.`,
     hook:`Roerecke 2019: at 1 drink a day, cirrhosis risk rose in women only.`},
    {k:'5–6 drinks a day',t:'Risk climbs steeply',txt:`Relative risk of cirrhosis: women 12.44 (95% CI 6.65–23.27); men 3.80 (95% CI 0.85–17.02, which crosses 1). The authors describe risk as "increasing exponentially" with intake, and the spread between studies points to genes, body weight, metabolic factors and drinking pattern. [[Roerecke2019Cirrhosis]]`,
     pt:`At 5 to 6 drinks a day a woman's risk is about 12 times that of a non-drinker.`,
     hook:`Women vs men at the same intake: RR 12.44 vs 3.80 at 5–6 drinks a day. [[Roerecke2019Cirrhosis]]`},
    {k:'7 or more drinks a day',t:'The highest risk',txt:`Relative risk: women 24.58 (95% CI 14.77–40.90); men 6.93 (95% CI 1.07–44.99). The wide intervals for men reflect fewer cases at each level. [[Roerecke2019Cirrhosis]]`,
     pt:`At 7 or more drinks a day the risk is many times higher, and highest for women.`,
     hook:`RR at ≥7 drinks a day: women 24.58, men 6.93. [[Roerecke2019Cirrhosis]]`}];
  function drawDose(t){
    const N=vb(ds,'720 340','400 480');
    const B=N?{x:52,y:40,w:326,h:330}:{x:70,y:34,w:440,h:250};
    const X=v=>B.x+B.w*(v+.5)/6,Ylog=v=>B.y+B.h-B.h*(Math.log10(v)-Math.log10(.5))/(Math.log10(60)-Math.log10(.5));
    const xc=t*5.6-.3;let s=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" style="fill:var(--field)"/>`;
    [1,2,5,10,20,50].forEach(v=>{s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${f1(Ylog(v))}" y2="${f1(Ylog(v))}" class="${v===1?'axis':'grid'}"/>`+T(B.x-6,Ylog(v)+3,v,'t-xs t-end')});
    s+=`<text transform="translate(${N?14:22} ${B.y+B.h/2}) rotate(-90)" class="t-xs t-mid">relative risk of cirrhosis (log scale)</text>`;
    s+=`<rect x="${f1(X(2.5))}" y="${B.y}" width="${f1(X(3.5)-X(2.5))}" height="${B.h}" style="fill:var(--panel-2);opacity:.7"/>`+T(X(3),B.y+16,'2–4/day:','t-xs t-mid')+T(X(3),B.y+28,'in figures','t-xs t-mid')+T(X(3),B.y+40,'only','t-xs t-mid');
    CAT.forEach((c,i)=>{const on=xc>=c.x-.25;s+=`<line x1="${f1(X(c.x))}" x2="${f1(X(c.x))}" y1="${B.y+B.h}" y2="${B.y+B.h+5}" class="axis"/>`;
      s+=T(X(c.x),B.y+B.h+17,N?['none','occas.','1','5–6','7+'][i]:c.sh,'t-xs t-mid',on?'fill:var(--ink)':'')});
    s+=T(B.x+B.w,B.y+B.h+34,'drinks a day (≈12 g each) →','t-xs t-end');
    const SX={f:{col:'var(--liver)',dx:-7,lab:'women'},m:{col:'var(--portal)',dx:7,lab:'men'}};
    /* reference and qualitative points */
    if(xc>=-.1)s+=`<circle cx="${f1(X(0))}" cy="${f1(Ylog(1))}" r="5.5" style="fill:var(--ink)"/>`+T(X(0),Ylog(1)-10,'reference','t-xs t-mid');
    if(xc>=.75)s+=`<circle cx="${f1(X(1))}" cy="${f1(Ylog(1))}" r="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`+T(X(1),Ylog(1)+18,'no increase','t-xs t-mid');
    if(xc>=1.75){if(sex.f)s+=`<path d="M${f1(X(2)+SX.f.dx)} ${f1(Ylog(1)-4)}V${f1(Ylog(1.7))}" style="stroke:${SX.f.col};stroke-width:2.4" marker-end="url(#alUp)"/>`+T(X(2)-10,Ylog(1.9),'women: raised','t-xs t-end',`fill:${SX.f.col}`);
      if(sex.m)s+=`<circle cx="${f1(X(2)+SX.m.dx)}" cy="${f1(Ylog(1))}" r="4.5" style="fill:var(--panel);stroke:${SX.m.col};stroke-width:2"/>`+T(X(2)+2,Ylog(1)+18,'men: not raised','t-xs','fill:'+SX.m.col)}
    ['f','m'].forEach(k=>{if(!sex[k])return;const P=SX[k];const pts=CAT.filter(c=>c[k]&&xc>=c.x-.25);
      const line=[[X(0),Ylog(1)]].concat(pts.map(c=>[X(c.x)+P.dx,Ylog(c[k][0])]));
      if(pts.length)s+=`<path d="M${line.map(p=>f1(p[0])+' '+f1(p[1])).join('L')}" style="fill:none;stroke:${P.col};stroke-width:1.6;stroke-dasharray:4 4;opacity:.8"/>`;
      pts.forEach(c=>{const [v,lo,hi]=c[k],x=X(c.x)+P.dx;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(Ylog(lo))}" y2="${f1(Ylog(hi))}" style="stroke:${P.col};stroke-width:1.6"/><line x1="${f1(x-4)}" x2="${f1(x+4)}" y1="${f1(Ylog(lo))}" y2="${f1(Ylog(lo))}" style="stroke:${P.col};stroke-width:1.6"/><line x1="${f1(x-4)}" x2="${f1(x+4)}" y1="${f1(Ylog(hi))}" y2="${f1(Ylog(hi))}" style="stroke:${P.col};stroke-width:1.6"/><circle cx="${f1(x)}" cy="${f1(Ylog(v))}" r="5.5" style="fill:${P.col};stroke:var(--panel);stroke-width:1.5"/>`;
        s+=T(k==='f'?x-10:x+10,Ylog(v)+4,v.toFixed(2),'t-sm'+(k==='f'?' t-end':''),`fill:${P.col};font-weight:700`)})});
    s+=`<line x1="${f1(X(clamp(xc,-.3,5.3)))}" x2="${f1(X(clamp(xc,-.3,5.3)))}" y1="${B.y}" y2="${B.y+B.h}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    /* legend / side panel */
    const lx=N?B.x:540,ly=N?B.y-22:60;
    ['f','m'].forEach((k,i)=>{const P=SX[k];const xx=N?lx+i*110:lx,yy=N?ly:ly+i*22;s+=`<circle cx="${xx+6}" cy="${yy-4}" r="5" style="fill:${P.col};opacity:${sex[k]?1:.25}"/>`+T(xx+16,yy,P.lab+(sex[k]?'':' (hidden)'),'t-sm',sex[k]?'fill:var(--ink)':'')});
    if(!N){s+=T(lx,128,'Daily vs non-daily drinking,','t-sm','fill:var(--ink)')+T(lx,143,'same total amount:','t-sm','fill:var(--ink)')+T(lx,163,'men RR 1.71','t-sm','fill:var(--portal)')+T(lx,179,'women RR 1.56','t-sm','fill:var(--liver)')+T(lx,200,'(meta-analysis of 5 studies)','t-xs');}
    ds.innerHTML=`<defs>${marker('alUp','var(--liver)')}</defs>`+s;
    const ci=xc<.6?0:xc<1.6?1:xc<3.6?2:xc<4.6?3:4;$('#alDoseNote').innerHTML=noteHTML(Object.assign({},DNOTE[ci],ci===4||ci===3?{}:{}));
  }
  playWire(dr,$('#alDosePlay'),drawDose,9000,'Replay','alcohol');
  $$('[data-alsex]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.alsex;sex[k]=!sex[k];if(!sex.f&&!sex.m){sex[k==='f'?'m':'f']=true;$(`[data-alsex="${k==='f'?'m':'f'}"]`).setAttribute('aria-pressed','true')}b.setAttribute('aria-pressed',sex[k]);drawDose(+dr.value)}));
  drawDose(+dr.value);

  /* ---------- 3. alcohol-associated hepatitis ---------- */
  const AH=[
    {from:0,at:.08,k:'Recognising it',t:'A recognisable pattern',
     txt:`The NIAAA consortium criteria for trials: jaundice starting within the prior 8 weeks; ongoing intake of more than 40 g a day (women) or 60 g a day (men) for 6 months or more, with less than 60 days of abstinence before the jaundice; AST over 50 IU/L, AST/ALT over 1.5 and both under 400 IU/L; and total bilirubin over 3.0 mg/dL. An AST/ALT ratio below 1.5 is seen in under 2% of biopsy-proven cases, and biopsy is recommended when the picture is atypical. [[Crabb2016NIAAA]]`,
     pt:`Yellow skin and eyes that came on over weeks, in someone who has been drinking heavily, with a typical pattern on liver blood tests.`,
     hook:`AH labs: AST >50 but <400 IU/L, AST/ALT >1.5, bilirubin >3 mg/dL. [[Crabb2016NIAAA]]`},
    {from:.18,at:.3,k:'How severe?',t:'Grading severity: Maddrey and MELD',
     txt:`Maddrey's 1978 trial found that a prolonged prothrombin time and a high bilirubin independently predicted death: the basis of his discriminant function. ACG 2018 used Maddrey ≥32 to define severe disease. ACG 2024 names MELD "the most accurate score", with MELD over 20 defining severe disease. In a global cohort of 2,581 patients (median MELD 23.5), mortality was 20% at 28 days and 30.9% at 90 days, and the authors concluded Maddrey "should no longer be used" for prognosis. [[Maddrey1978,Singal2018ACG,Jophlin2024ACG,MoralesArraez2022]]`,
     pt:`Doctors use blood-test scores to judge how dangerous the illness is. Higher scores mean higher risk.`,
     hook:`Severe AH: Maddrey DF ≥32 (older) or MELD >20 (ACG 2024 prefers MELD). [[Singal2018ACG,Jophlin2024ACG]]`},
    {from:.4,at:.5,k:'Treatment trial',t:'Steroids: the STOPAH trial',
     txt:`STOPAH randomised 1,103 people with severe alcohol-associated hepatitis in a 2×2 design. 28-day mortality: placebo 17%, prednisolone 14%, pentoxifylline 19%, both 13%. Prednisolone's odds ratio was 0.72 (95% CI 0.52–1.01; P = 0.06), with no effect at 90 days or 1 year; pentoxifylline did not help. Serious infections: 13% on prednisolone vs 7% without. An individual-patient meta-analysis of 11 trials found a 28-day benefit (HR 0.64) but none at 6 months. [[Thursz2015STOPAH,Louvet2018Gastro]]`,
     pt:`Steroid tablets may help some people survive the first month, but they raise the risk of infection and the benefit fades by 6 months.`,
     hook:`STOPAH: prednisolone OR 0.72 for 28-day death (P = 0.06), no 90-day benefit; pentoxifylline no benefit; infections 13% vs 7%. [[Thursz2015STOPAH]]`},
    {from:.6,at:.72,k:'Day 7',t:'The Lille model: is it working?',
     txt:`The Lille model combines age, kidney function, albumin, prothrombin time, bilirubin and the change in bilirubin by day 7 of steroids. Its AUROC for 6-month death was 0.89, against 0.62 for Child–Pugh and 0.66 for Maddrey. Above 0.45 ("non-responders", about 40%), 6-month survival was 25%, against 85% below it. In pooled trials, 28-day survival on steroids was 91.1% in complete responders, 79.4% in partial and 53.3% in null responders. ACG 2018 places the score at 4–7 days. [[Louvet2007Lille,Mathurin2011Gut,Singal2018ACG]]`,
     pt:`After about a week, a score checks whether the bilirubin (the yellow pigment) is coming down. If it is not, steroids are unlikely to help.`,
     hook:`Lille ≥0.45 at day 7 = non-response: 6-month survival 25% vs 85%. [[Louvet2007Lille]]`},
    {from:.8,at:.93,k:'When medicine fails',t:'Early liver transplant',
     txt:`People not responding to medical therapy had about 30% 6-month survival, with most deaths in the first 2 months, so a 6-month abstinence rule excluded most of them. In a Franco-Belgian pilot, 26 highly selected people (fewer than 2% of admissions) had 6-month survival of 77% with early transplant vs 23% in matched controls. In ACCELERATE-AH (147 people, median 55 days' abstinence), survival was 94% at 1 year and 84% at 3 years. ACG 2024: transplant "should be considered in selected patients with AH, who are unresponsive to medical therapy and have a low risk of relapse". [[Mathurin2011NEJM,Lee2018Gastro,Jophlin2024ACG]]`,
     pt:`For a small number of carefully chosen people who do not get better with medicine, a liver transplant can be life-saving.`,
     hook:`Mathurin 2011: early transplant, 6-month survival 77% vs 23%. [[Mathurin2011NEJM]]`}];
  const ah=$('#alAh'),ar=$('#alAhT');let setAh=()=>{};
  function bar(x,y,w,h,v,max,col,lab,val,N){const bh=h*v/max;return `<rect x="${f1(x)}" y="${f1(y+h-bh)}" width="${f1(w)}" height="${f1(bh)}" rx="3" style="fill:${col}"/>`+T(x+w/2,y+h-bh-6,val,'t-sm t-mid','fill:var(--ink);font-weight:700')+T(x+w/2,y+h+14,lab,'t-xs t-mid')}
  function drawAh(t){
    const N=vb(ah,'720 360','400 600');const p=phaseOf(AH,t),u=ramp(t,AH[p].from,AH[p].from+.14);let s='';
    const W=N?400:720,cxm=W/2;
    s+=T(cxm,24,AH[p].t,'t-lbl t-mid');
    if(p===0){/* person with jaundice + lab bars */
      const ab=abdomen(N?200:130,N?46:52,N?.95:1.2,{jaundice:u,liver:true,fib:2});s+=ab.svg+T(N?200:130,N?268:330,'jaundice within 8 weeks','t-xs t-mid');
      const L=N?{x:40,y:310,w:320}:{x:290,y:60,w:400};const rows=[['AST','> 50 and < 400 IU/L',.55],['AST/ALT ratio','> 1.5',.5],['ALT','< 400 IU/L',.35],['Bilirubin','> 3.0 mg/dL',.7],['Alcohol','> 40 g/day (women) or > 60 g/day (men), ≥ 6 months',.9]];
      rows.forEach(([n,c,v],i)=>{const y=L.y+i*(N?52:56),bw=L.w*v*ease(ramp(u,i*.12,i*.12+.5));s+=T(L.x,y,n,'t-sm','fill:var(--ink);font-weight:700')+`<rect x="${L.x}" y="${y+6}" width="${L.w}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${L.x}" y="${y+6}" width="${f1(bw)}" height="12" rx="6" style="fill:${i===4?'var(--liver)':'var(--bile)'}"/>`+T(L.x,y+34,c,'t-xs')});
    }else if(p===1){const g1=N?{x:200,y:200,r:120}:{x:200,y:230,r:140},mv=lerp(6,23.5,ease(u));
      s+=gauge(g1.x,g1.y,g1.r,mv,40,{bands:[{to:20,col:'var(--good)'},{to:40,col:'var(--bad)'}],big:true,label:'MELD (median in global cohort: 23.5)',lo:'6',hi:'40'});
      s+=T(g1.x+g1.r*.35,g1.y-g1.r*1.02,'> 20 = severe','t-sm','fill:var(--bad);font-weight:700');
      const bx=N?40:400,by=N?300:80;const r28=20*ramp(u,.3,.8),r90=30.9*ramp(u,.5,1);
      s+=T(bx,by,'Global AH cohort, 2,581 people','t-sm','fill:var(--ink)');
      [['28 days',r28,20],['90 days',r90,30.9]].forEach(([l,v,full],i)=>{const y=by+24+i*44;s+=T(bx,y,l,'t-xs')+`<rect x="${bx}" y="${y+6}" width="${N?320:280}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+6}" width="${f1((N?320:280)*v/100)}" height="16" rx="4" style="fill:var(--bad)"/>`+T(bx+(N?320:280)*v/100+6,y+19,f1(v)+'% died','t-sm','fill:var(--ink)')});
      s+=T(bx,by+128,'Maddrey DF ≥ 32 (ACG 2018) also marks','t-xs')+T(bx,by+142,'severe disease, with about 20–50% 30-day','t-xs')+T(bx,by+156,'mortality; MELD predicted death better.','t-xs');
    }else if(p===2){const B=N?{x:50,y:70,w:300,h:220}:{x:60,y:60,w:380,h:230};const arms=[['placebo',17],[N?'pred.':'prednisolone',14],[N?'pentox.':'pentoxifylline',19],['both',13]];const bw=B.w/4*.6;
      s+=T(B.x,B.y-14,'STOPAH: 28-day mortality','t-sm','fill:var(--ink)')+`<line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+B.h}" y2="${B.y+B.h}" class="axis"/>`;
      arms.forEach(([n,v],i)=>{s+=bar(B.x+i*B.w/4+(B.w/4-bw)/2,B.y,bw,B.h,v*ease(ramp(u,i*.1,i*.1+.6)),25,n.startsWith('pred')||n==='both'?'var(--rx)':'var(--muted)',n,Math.round(v*ease(ramp(u,i*.1,i*.1+.6)))+'%')});
      const ix=N?50:490,iy=N?350:90;s+=T(ix,iy,'Serious infections','t-sm','fill:var(--ink)');
      [['prednisolone',13,'var(--bad)'],['no prednisolone',7,'var(--muted)']].forEach(([n,v,c],i)=>{const y=iy+16+i*34;s+=`<rect x="${ix}" y="${y}" width="${f1(10*v*ramp(u,.4,1))}" height="16" rx="3" style="fill:${c}"/>`+T(ix+10*v*ramp(u,.4,1)+6,y+12,Math.round(v*ramp(u,.4,1))+'% '+n,'t-xs','fill:var(--ink)')});
      s+=T(ix,iy+102,'Prednisolone OR 0.72','t-xs')+T(ix,iy+116,'(95% CI 0.52–1.01; P = 0.06)','t-xs')+T(ix,iy+130,'No benefit at 90 days or 1 year.','t-xs');
    }else if(p===3){const st=N?[200,70]:[110,180],a=N?[90,250]:[360,90],b=N?[310,250]:[360,270];
      const stc=`<circle cx="${st[0]}" cy="${st[1]}" r="34" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:2"/>`+T(st[0],st[1]-2,'steroids','t-sm t-mid','fill:var(--ink)')+T(st[0],st[1]+12,'days 1–7','t-xs t-mid');
      const k=ease(u);[[a,'var(--good)','Lille < 0.45','responders (~60%)','85%'],[b,'var(--bad)','Lille ≥ 0.45','non-responders (~40%)','25%']].forEach(([pt,col,l1,l2,sv])=>{const ex=lerp(st[0],pt[0],k),ey=lerp(st[1],pt[1],k);
        s+=`<path d="M${st[0]} ${st[1]}L${f1(ex)} ${f1(ey)}" style="stroke:${col};stroke-width:4;stroke-linecap:round;opacity:.8"/>`;
        if(k>.95)s+=`<rect x="${pt[0]-(N?82:70)}" y="${pt[1]-40}" width="${N?164:140}" height="${N?120:84}" rx="10" style="fill:var(--panel);stroke:${col};stroke-width:2"/>`+T(pt[0],pt[1]-20,l1,'t-sm t-mid','fill:var(--ink);font-weight:700')+T(pt[0],pt[1]-6,l2,'t-xs t-mid')+T(pt[0],pt[1]+24,sv,'t-big t-mid',`fill:${col};font-size:24px`)+T(pt[0],pt[1]+38,'6-month survival','t-xs t-mid')});
      s+=stc;if(!N){s+=T(520,120,'28-day survival on steroids','t-sm','fill:var(--ink)')+T(520,136,'by response (pooled trials):','t-sm','fill:var(--ink)');
        [['complete',91.1],['partial',79.4],['null',53.3]].forEach(([n,v],i)=>{const y=156+i*36;s+=`<rect x="520" y="${y}" width="${f1(1.6*v*ramp(u,.5,1))}" height="16" rx="3" style="fill:${i===2?'var(--bad)':'var(--good)'};opacity:${i===1?.7:1}"/>`+T(520,y+30,`${n}: ${v}%`,'t-xs','fill:var(--ink)')})}
      else s+=T(200,460,'28-day survival by response: complete 91.1%,','t-xs t-mid')+T(200,474,'partial 79.4%, null 53.3% (pooled trials)','t-xs t-mid');
    }else{const B=N?{x:60,y:80,w:280,h:200}:{x:70,y:70,w:300,h:220};const bw=B.w*.28;
      s+=T(B.x,B.y-16,'6-month survival, selected non-responders','t-sm','fill:var(--ink)')+`<line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+B.h}" y2="${B.y+B.h}" class="axis"/>`;
      s+=bar(B.x+B.w*.12,B.y,bw,B.h,77*ease(u),100,'var(--rx)','early transplant',Math.round(77*ease(u))+'%')+bar(B.x+B.w*.6,B.y,bw,B.h,23*ease(u),100,'var(--muted)','matched controls',Math.round(23*ease(u))+'%');
      const lx=N?40:440,ly=N?360:90;s+=T(lx,ly,'ACCELERATE-AH (147 early transplants)','t-sm','fill:var(--ink)');
      [['alive at 1 year',94,'var(--rx)'],['alive at 3 years',84,'var(--rx)'],['sustained drinking by 3 years',17,'var(--bad)']].forEach(([n,v,c],i)=>{const y=ly+18+i*40,w=(N?300:240)*v/100*ramp(u,.3+i*.15,.8+i*.07);s+=`<rect x="${lx}" y="${y}" width="${f1(w)}" height="14" rx="3" style="fill:${c}"/>`+T(lx,y+28,`${v}% ${n}`,'t-xs','fill:var(--ink)')});
      s+=T(lx,ly+148,'Fewer than 2% of people admitted with','t-xs')+T(lx,ly+162,'severe AH were selected in the pilot.','t-xs');
    }
    ah.innerHTML=s;$('#alAhNote').innerHTML=noteHTML(AH[p]);setAh(p);
  }
  const stopAh=playWire(ar,$('#alAhPlay'),drawAh,20000,'Replay','alcohol');
  setAh=stepWire($('#alAhSteps'),AH,ar,drawAh,stopAh);drawAh(+ar.value);

  /* ---------- 4. abstinence over five years ---------- */
  const XIE=[[.5,.48,0],[1,.58,0],[1.5,.51,1],[2,.55,1],[3,.54,1],[4,.60,1],[5,.63,1]];
  const HOF=[[0,0],[1,12.3],[2,23.4],[5,33.8]];
  const ab=$('#alAbs'),abr=$('#alAbsT');
  const hofAt=y=>{for(let i=1;i<HOF.length;i++)if(y<=HOF[i][0]){const a=HOF[i-1],b=HOF[i],u=(y-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*(u*(2-u)*.5+u*.5)}return HOF[HOF.length-1][1]};
  function drawAbs(t){
    const N=vb(ab,'720 330','400 560');const Y=t*5;let s='';
    const P1=N?{x:56,y:44,w:310,h:190}:{x:62,y:46,w:270,h:220},P2=N?{x:56,y:318,w:310,h:190}:{x:420,y:46,w:270,h:220};
    /* left: HR */
    const X1=v=>P1.x+P1.w*v/5,Y1=v=>P1.y+P1.h-P1.h*v/1.2;
    s+=T(P1.x,P1.y-16,'Death: abstinence vs continued drinking','t-sm','fill:var(--ink)')+`<rect x="${P1.x}" y="${P1.y}" width="${P1.w}" height="${P1.h}" style="fill:var(--field)"/>`;
    [0,.25,.5,.75,1].forEach(v=>{s+=`<line x1="${P1.x}" x2="${P1.x+P1.w}" y1="${f1(Y1(v))}" y2="${f1(Y1(v))}" class="${v===1?'axis':'grid'}"/>`+T(P1.x-5,Y1(v)+3,v,'t-xs t-end')});
    s+=T(P1.x+P1.w-4,Y1(1)+13,'HR 1 = no difference','t-xs t-end');
    for(let v=0;v<=5;v++)s+=T(X1(v),P1.y+P1.h+15,v,'t-xs t-mid');s+=T(P1.x+P1.w,P1.y+P1.h+30,'years','t-xs t-end');
    s+=`<text transform="translate(${P1.x-30} ${P1.y+P1.h/2}) rotate(-90)" class="t-xs t-mid">hazard ratio</text>`;
    const shown=XIE.filter(d=>d[0]<=Y+.01);
    if(shown.length>1)s+=`<path d="M${shown.map(d=>f1(X1(d[0]))+' '+f1(Y1(d[1]))).join('L')}" style="fill:none;stroke:var(--rx);stroke-width:2;opacity:.7"/>`;
    shown.forEach(d=>{const x=X1(d[0]),y=Y1(d[1]);if(d[0]===1.5)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(Y1(.33))}" y2="${f1(Y1(.81))}" style="stroke:var(--rx);stroke-width:1.5"/>`;if(d[0]===5)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(Y1(.52))}" y2="${f1(Y1(.76))}" style="stroke:var(--rx);stroke-width:1.5"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:${d[2]?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.8"/>`+T(x,y+([1,2,4].includes(d[0])?-9:17),d[1].toFixed(2),'t-xs t-mid','fill:var(--ink)')});
    if(Y>=1.5)s+=`<rect x="${f1(X1(1.5))}" y="${P1.y+4}" width="${f1(X1(5)-X1(1.5))}" height="16" rx="4" style="fill:var(--rx-soft)"/>`+T(X1(3.25),P1.y+16,'significant from 1.5 years','t-xs t-mid','fill:var(--rx)');
    s+=`<circle cx="${P1.x+8}" cy="${P1.y+P1.h-12}" r="4" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/>`+T(P1.x+16,P1.y+P1.h-8,'not significant','t-xs');
    /* right: recompensation */
    const X2=v=>P2.x+P2.w*v/5,Y2=v=>P2.y+P2.h-P2.h*v/40;
    s+=T(P2.x,P2.y-16,'Recompensation after stopping (cumulative %)','t-sm','fill:var(--ink)')+`<rect x="${P2.x}" y="${P2.y}" width="${P2.w}" height="${P2.h}" style="fill:var(--field)"/>`;
    [0,10,20,30,40].forEach(v=>{s+=`<line x1="${P2.x}" x2="${P2.x+P2.w}" y1="${f1(Y2(v))}" y2="${f1(Y2(v))}" class="${v?'grid':'axis'}"/>`+T(P2.x-5,Y2(v)+3,v+'%','t-xs t-end')});
    for(let v=0;v<=5;v++)s+=T(X2(v),P2.y+P2.h+15,v,'t-xs t-mid');s+=T(P2.x+P2.w,P2.y+P2.h+30,'years','t-xs t-end');
    let d='';const n=60;for(let i=0;i<=n;i++){const y=Y*i/n;d+=(i?'L':'M')+f1(X2(y))+' '+f1(Y2(hofAt(y)))}
    if(Y>0)s+=`<path d="${d}L${f1(X2(Y))} ${f1(Y2(0))}L${f1(X2(0))} ${f1(Y2(0))}Z" style="fill:var(--rx);opacity:.15"/><path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:2.6"/>`;
    HOF.slice(1).forEach(([y,v])=>{if(Y>=y-.01)s+=`<circle cx="${f1(X2(y))}" cy="${f1(Y2(v))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>`+T(X2(y)-(y===5?8:0),Y2(v)-10,v+'%','t-sm'+(y===5?' t-end':' t-mid'),'fill:var(--ink);font-weight:700')});
    s+=`<line x1="${f1(X2(Y))}" x2="${f1(X2(Y))}" y1="${P2.y}" y2="${P2.y+P2.h}" style="stroke:var(--ink);opacity:.3"/>`+`<line x1="${f1(X1(Y))}" x2="${f1(X1(Y))}" y1="${P1.y}" y2="${P1.y+P1.h}" style="stroke:var(--ink);opacity:.3"/>`;
    ab.innerHTML=s;
    const early=Y<1.5;
    $('#alAbsNote').innerHTML=noteHTML({k:`Year ${Y.toFixed(1)}`,t:early?'The benefit takes time to show':'Stopping keeps paying off',
      txt:early?`In a meta-analysis of 7 cohorts (1,235 people with alcohol-related cirrhosis), the hazard ratios at 0.5 and 1 year (0.48 and 0.58) were not statistically significant. Separately, among people with decompensated cirrhosis who stopped drinking, 12.3% had regained compensation by 1 year. [[Xie2014HepatolRes,Hofer2026JHep]]`
        :`The survival benefit of abstinence reached significance from 1.5 years (HR 0.51; 95% CI 0.33–0.81) and persisted to 5 years (HR 0.63; 95% CI 0.52–0.76). Recompensation reached 33.8% by 5 years and was linked to lower all-cause mortality (aHR 0.255); no recompensated person who stayed abstinent died of liver causes or developed liver cancer. [[Xie2014HepatolRes,Hofer2026JHep]]`,
      pt:early?`The benefit of stopping drinking can take a year or more to show up in the numbers. That is not a reason to wait.`:`People who stop drinking live longer on average, and some recover enough that their complications go away.`,
      hook:`Abstinence in alcohol-related cirrhosis: HR for death 0.51 at 1.5 years and 0.63 at 5 years. [[Xie2014HepatolRes]]`});
  }
  playWire(abr,$('#alAbsPlay'),drawAbs,9000,'Replay','alcohol');drawAbs(+abr.value);
};
