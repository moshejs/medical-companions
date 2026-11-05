/* =============== 2.3 Assessment & interviews =============== */
const AS_STEPS=[
 {from:0,at:.07,k:'Step 1 of 7 · Concern',t:'Concern raised',
  txt:`Assessment usually starts when the person, someone close to them or a clinician notices a long-standing pattern: intense emotions, stormy relationships, impulsive acts or self-harm. BPD is common where people seek help: 6.4% lifetime prevalence in one US primary care practice, where 42.9% of those with BPD had not been recognised by their physician as having an emotional problem. [[Gross2002PrimaryCare]] It affects about 10–12% of psychiatric outpatients and 20–22% of inpatients. [[Ellison2018]]`,
  pt:`If your emotions and relationships have felt like a storm for years, it is reasonable to ask for a proper assessment.`,
  hook:`Missing BPD leads to misleading drug treatment that rarely succeeds: ask actively about relationships and unstable identity. [[Gunderson2018]]`},
 {from:1/7,at:1/7+.07,k:'Step 2 of 7 · Screening',t:'Screening questionnaire',
  txt:`The McLean Screening Instrument (MSI-BPD) has 10 yes/no items. In 200 people with treatment histories, a cut-off of 7 or more gave sensitivity 0.81 and specificity 0.85. [[Zanarini2003MSI]] In a Dutch sample, a cut-off of 5 gave sensitivity 0.94 and specificity 0.86, and a review argues the cut-off may need to be below 7 when the aim is screening rather than case-finding. [[Andre2015,Zimmerman2021MSI]] Asking a single question about affective instability picks up 92.8% of outpatients with BPD. [[Zimmerman2017BJP]]`,
  pt:`A short questionnaire can flag who should have a full assessment. It cannot tell you that you have BPD.`,
  hook:`MSI-BPD: 10 items, cut-off 7, sensitivity 0.81, specificity 0.85. [[Zanarini2003MSI]]`},
 {from:2/7,at:2/7+.07,k:'Step 3 of 7 · Diagnosis',t:'Structured interview',
  txt:`The recommended route is a structured or semi-structured interview for the diagnosis, with self-report questionnaires for screening or severity. [[Kaess2025,Leichsenring2024WP]] The DIB-R reached kappas above 0.75 for the BPD diagnosis. [[Zanarini2002DIBR]] The IPDE was tested in 716 patients at 14 centres in 11 countries. [[Loranger1994]] The SCID-II showed excellent inter-rater agreement for most personality disorders [[Lobbestael2011]], and the SCID-5-PD acceptable agreement for BPD in one Persian study <span class="ev early">Early evidence</span> [[Gharraee2022]].`,
  pt:`The diagnosis comes from a careful conversation with a trained clinician, who asks about the same experiences in a set order.`,
  hook:`Interview = diagnosis; questionnaire = screening or severity. Using both together identified BPD criteria best in CLPS. [[Hopwood2008]]`},
 {from:3/7,at:3/7+.07,k:'Step 4 of 7 · Differential',t:'Differential and comorbidities',
  txt:`Most people with BPD have other conditions too. Among adult inpatients with BPD, lifetime rates were 89.0% for any anxiety disorder, 86.6% for major depression, 62.1% for a substance use disorder, 53.8% for an eating disorder and 27.9% for ADHD; 76.6% had "complex comorbidity", a disorder of affect plus a disorder of impulse. [[Zanarini2021Comorbidity]] Short mood shifts lasting hours point to BPD; sustained mood episodes point to bipolar disorder. [[Kaess2025,Paris2015]]`,
  pt:`Depression, anxiety, trauma symptoms, substance or eating problems often come with BPD. Each one deserves its own attention.`,
  hook:`Complex comorbidity (affect + impulse disorder) is a strong marker of BPD. [[Zanarini1998AxisI]]`},
 {from:4/7,at:4/7+.07,k:'Step 5 of 7 · Disclosure',t:'Sharing the diagnosis',
  txt:`Withholding the diagnosis to protect the person is now generally seen as unethical. [[Sims2022]] Yet 57% of 134 US psychiatrists surveyed had at some point not disclosed it. [[Sisti2016]] NICE asks for an atmosphere of hope, "explaining that recovery is possible and attainable". [[NICE2009]] The evidence behind that hope: 34.5% of 290 people were in remission at 2 years, 49.4% at 4 years and 68.6% at 6 years (population statistics from one cohort). [[Zanarini2003Course]] A psychoeducation workshop soon after disclosure reduced impulsivity and relationship storminess. <span class="ev early">Early evidence</span> [[Zanarini2008Psychoed]]`,
  pt:`You have the right to know your diagnosis, and to hear that recovery is common.`,
  hook:`MSAD remission: 34.5% at 2 years, 49.4% at 4, 68.6% at 6; recurrence after remission only 5.9%. [[Zanarini2003Course]]`},
 {from:5/7,at:5/7+.07,k:'Step 6 of 7 · Measurement',t:'Severity and change',
  txt:`Two scales track how things change. The BSL-23 is a 23-item self-rating with six grades of mean item score from none or low (0–0.3) to extremely high (3.5–4); a mean of 1.50 best separated BPD from other disorders. [[Bohus2009,Kleindienst2020]] The ZAN-BPD is clinician-rated over the past week: 9 criteria, each 0–4, total 0–36. [[Zanarini2003ZAN]] The scores in the drawing are illustrative.`,
  pt:`Simple scores, repeated over time, help you and your clinician see whether treatment is working.`,
  hook:`ZAN-BPD: 9 × 0–4 = 0–36, past week. BSL-23: self-rated, grades 0–4, cut-off 1.50. [[Zanarini2003ZAN,Kleindienst2020]]`},
 {from:6/7,at:6/7+.07,k:'Step 7 of 7 · Safety',t:'Crisis and safety plan',
  txt:`APA 2024 implementation text says people with BPD should be monitored for suicide risk, with assessments documented and "individualized safety plans" developed. [[APA2024Guideline]] NICE CG78 asks that each care plan include a crisis plan naming triggers, self-management strategies that work and how to reach services, including out-of-hours numbers. [[NICE2009]] Risk scales should not be used to predict suicide or self-harm. [[NICE2022NG225]]`,
  pt:`A safety plan is a short written plan you make with a clinician: your warning signs, what helps, who to contact and crisis numbers.`,
  hook:`NICE NG225: no risk tools or low/medium/high stratification to predict suicide; use a risk formulation instead. [[NICE2022NG225]]`}
];
const AS_TEEN=[
 `In young people, BPD affects around 3% in the community, and from 11% of outpatients to 78% of suicidal adolescents seen in an emergency department. [[Guile2018]] NICE recommends that a person under 18 with repeated self-harm, persistent risk-taking or marked emotional instability is referred to CAMHS for assessment. [[NICE2009]]`,
 `In 63 participants aged 25 or under, the MSI-BPD cut-off of 7 gave sensitivity 0.90 and specificity 0.93. [[Zanarini2003MSI]] In 101 outpatients aged 15–25, the Borderline Personality Questionnaire had sensitivity 0.68, specificity 0.90, PPV 0.65 and NPV 0.91. [[Chanen2008]]`,
 `The criteria are the same, but under 18 the features must have been present for at least 1 year. [[APA2022,Kaess2025]] Evidence supports diagnosis from age 12, and tools validated in youth include the CI-BPD, DIB-R, BPDSI-IV adolescent version, SCID-II, BPFSC, BPQ, MSI-BPD and BSL. [[Kaess2025]] An expert review found "no justification for failing to make an early diagnosis". [[Fonagy2015]]`,
 `In adolescent inpatients with BPD, lifetime rates were 75.0% for major depression, 60.6% for anxiety disorders, 35.6% for substance use, 30.8% for eating disorders and 22.1% for ADHD; complex comorbidity was 40.4%. [[Zanarini2021Comorbidity]]`,
 `Clinicians remain reluctant to diagnose BPD in adolescents, and more training in early diagnosis is recommended. [[Kaess2025,Peters2023]] The symptom network is broadly the same in adolescents and adults. [[Peters2023]]`,
 `The BSL is among the measures validated in young people. [[Kaess2025]]`,
 `Lifetime self-injury (about 90%) and suicide attempts (about 75%) were similar in adolescent and adult inpatients with BPD [[Goodman2017]], so safety planning belongs in youth assessment too. Young people should have the full range of recommended treatments within CAMHS. [[NICE2009]]`
];
const AS_LBL={w:['Concern','Screening','Interview','Differential','Sharing it','Measuring','Safety plan'],n:['Concern','Screen','Interview','Rule out','Share','Measure','Plan']};
const AS_SUB=['','MSI-BPD','SCID · DIB-R','comorbidity','hope','BSL · ZAN','crisis plan'],AS_SUBN=['','MSI-BPD','SCID','comorbid.','hope','BSL·ZAN','crisis'];
const AS_SET=[{n:'Community',p:1,src:'median point prevalence about 1%'},{n:'Primary care',p:6.4,src:'6.4% lifetime in one US practice'},{n:'Psychiatric outpatients',p:11,src:'10–12% (midpoint shown)'},{n:'Psychiatric inpatients',p:21,src:'20–22% (midpoint shown)'}];
const AS_TESTS=[{n:'MSI-BPD, cut-off 7',se:.81,sp:.85,c:'[[Zanarini2003MSI]]'},{n:'MSI-BPD, cut-off 7, age 25 or under',se:.90,sp:.93,c:'[[Zanarini2003MSI]]'},{n:'MSI-BPD (Dutch), cut-off 5',se:.94,sp:.86,c:'[[Andre2015]]'},{n:'MSI-BPD (Dutch), cut-off 7',se:.71,sp:.96,c:'[[Andre2015]]'},{n:'BPQ, ages 15–25',se:.68,sp:.90,c:'[[Chanen2008]]'}];
inits.assess=()=>{
  const svg=$('#asSvg'),rg=$('#asT');let teen=false;
  const tx=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const chip=(x,y,w,h,col,soft)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="7" style="fill:${soft};stroke:${col};stroke-width:1.2"/>`;
  /* the panel above the stairs: one small scene per step, u = 0..1 progress within the step */
  function scene(i,u,X,Y,W,H){let s=chip(X,Y,W,H,'var(--line)','var(--field)');
    const T=['1 · A concern is raised','2 · Screening questionnaire','3 · Structured interview','4 · Differential and comorbidities','5 · Sharing the diagnosis','6 · Measuring severity and change','7 · Crisis and safety plan'];
    s+=tx(X+14,Y+22,T[i],'t-lbl');
    s+=tx(X+W-12,Y+22,teen?'ADOLESCENT':'ADULT','t-xs t-end','fill:var(--dx);font-weight:700');
    if(i===0){s+=person(X+38,Y+40,46,'var(--other)');
      s+=bubble(X+76,Y+36,W-92,44,{tx:X+52,ty:Y+52,lines:W<340?['Ask about emotions,','relationships, sense of self']:['Ask about emotions, relationships','and sense of self'],col:'var(--dx)'});
      const st=teen?['≈3% community','11% outpatients','78% suicidal, ED']:['6.4% primary care','10–12% outpatients','20–22% inpatients'],cw=(W-28-12)/3;
      st.forEach((t,k)=>{const a=ramp(u,.15+k*.18,.35+k*.18);if(a<=0)return;
        s+=`<g style="opacity:${f1(a)}">${chip(X+14+k*(cw+6),Y+H-36,cw,24,'var(--dx)','var(--dx-soft)')}${tx(X+14+k*(cw+6)+cw/2,Y+H-20,t,'t-xs t-mid','fill:var(--dx);font-weight:700;font-size:'+f1(Math.min(9.5,(cw-6)/t.length/.6))+'px')}</g>`});
      s+=tx(X+14,Y+H-44,'how common BPD is where people seek help','t-xs');}
    else if(i===1){const n=Math.round(ramp(u,.05,.75)*8),bs=Math.min(24,(W-60)/10-6),gap=6,x0=X+14;
      s+=tx(X+14,Y+42,'MSI-BPD · 10 yes/no items','t-sm');
      for(let k=0;k<10;k++){const bx=x0+k*(bs+gap),on=k<n;
        s+=`<rect x="${f1(bx)}" y="${f1(Y+52)}" width="${f1(bs)}" height="${f1(bs)}" rx="4" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:1.4"/>`;
        if(on)s+=`<path d="M${f1(bx+bs*.22)} ${f1(Y+52+bs*.52)}l${f1(bs*.2)} ${f1(bs*.2)}l${f1(bs*.38)} ${f1(-bs*.42)}" style="fill:none;stroke:var(--dx);stroke-width:2.2;stroke-linecap:round"/>`}
      const lx=x0+6*(bs+gap)-gap/2;s+=`<line x1="${f1(lx)}" x2="${f1(lx)}" y1="${f1(Y+46)}" y2="${f1(Y+58+bs)}" style="stroke:var(--storm);stroke-width:1.6;stroke-dasharray:4 3"/>`+tx(lx+4,Y+58+bs+12,'cut-off: 7 or more','t-xs','fill:var(--storm)');
      s+=tx(X+14,Y+60+bs+30,`${n} of 10 · `+(n>=7?'<tspan style="fill:var(--storm);font-weight:700">screen positive → interview next</tspan>':'below the cut-off so far'),'t-sm');
      if(teen)s+=tx(X+14,Y+H-28,'MSI-BPD, age ≤25: sens 0.90 · spec 0.93','t-xs','fill:var(--ink)')+tx(X+14,Y+H-14,'BPQ, ages 15–25: sens 0.68 · spec 0.90','t-xs','fill:var(--ink)');else s+=tx(X+14,Y+H-14,'Cut-off 7: sensitivity 0.81 · specificity 0.85','t-xs','fill:var(--ink)')}
    else if(i===2){const R=teen?[['CI-BPD','validated in youth'],['DIB-R','validated in youth'],['Under 18','features present ≥ 1 year']]:[['SCID-5-PD','semi-structured · DSM-5'],['DIB-R','κ > 0.75 for the diagnosis'],['IPDE','WHO trial: 716 patients, 11 countries']];
      const rh=Math.min(32,(H-48)/3-4);
      R.forEach((r,k)=>{const a=ramp(u,.05+k*.2,.25+k*.2);if(a<=0)return;const yy=Y+36+k*(rh+5);
        s+=`<g style="opacity:${f1(a)}" transform="translate(${f1((1-a)*20)} 0)">${chip(X+14,yy,W-28,rh,'var(--dx)','var(--panel)')}${tx(X+24,yy+rh/2+4,r[0],'t-lbl','font-size:12px')}${tx(X+W-24,yy+rh/2+4,r[1],'t-xs t-end')}</g>`})}
    else if(i===3){const R=teen?[['Depression',75.0],['Anxiety',60.6],['Substance use',35.6],['Eating disorder',30.8],['ADHD',22.1]]:[['Anxiety',89.0],['Depression',86.6],['Substance use',62.1],['Eating disorder',53.8],['ADHD',27.9]];
      const bx=X+120,bw=W-120-52,rh=Math.min(22,(H-58)/5);s+=tx(X+14,Y+40,(teen?'adolescent':'adult')+' inpatients with BPD · lifetime %','t-xs');
      R.forEach((r,k)=>{const yy=Y+50+k*rh,w=bw*r[1]/100*ease(ramp(u,.05+k*.08,.45+k*.08));
        s+=tx(X+14,yy+rh*.65,r[0],'t-sm','fill:var(--ink)')+`<rect x="${f1(bx)}" y="${f1(yy+3)}" width="${f1(bw)}" height="${f1(rh-7)}" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(bx)}" y="${f1(yy+3)}" width="${f1(w)}" height="${f1(rh-7)}" rx="3" style="fill:var(--dx);opacity:.85"/>`+tx(bx+bw+6,yy+rh*.65,w>0?r[1].toFixed(1):'','t-xs','fill:var(--ink)')})}
    else if(i===4){const bw=Math.min(190,W*.48);s+=person(X+30,Y+40,40,'var(--dx)');
      s+=bubble(X+54,Y+34,bw,46,{tx:X+40,ty:Y+50,lines:['Recovery is possible','and attainable'],col:'var(--accent)'});
      s+=tx(X+14,Y+H-14,'NICE: hope and optimism','t-xs');
      const gx=X+54+bw+16,gw=X+W-14-gx,R=[['2 y',34.5],['4 y',49.4],['6 y',68.6]],gb=Y+H-30,gh=H-78,cw=gw/3;
      s+=tx(gx,Y+44,'remission','t-xs')+tx(gx,Y+56,'290 people','t-xs');
      R.forEach((r,k)=>{const h=gh*r[1]/100*ease(ramp(u,.1+k*.15,.5+k*.15));
        s+=`<rect x="${f1(gx+k*cw+cw*.18)}" y="${f1(gb-h)}" width="${f1(cw*.64)}" height="${f1(h)}" rx="3" style="fill:var(--accent)"/>`+tx(gx+k*cw+cw/2,gb+13,r[0],'t-xs t-mid')+(h>0?tx(gx+k*cw+cw/2,gb-h-4,r[1],'t-xs t-mid','fill:var(--ink)'):'')});
      s+=`<line x1="${f1(gx)}" x2="${f1(gx+gw)}" y1="${f1(gb)}" y2="${f1(gb)}" class="axis"/>`}
    else if(i===5){const B=[0,.3,.7,1.7,2.7,3.5,4],C=['var(--calm)','var(--calm)','var(--mood)','var(--mood)','var(--storm)','var(--storm)'],O=[.25,.5,.35,.65,.6,.9],x0=X+14,w=W-28,Xv=v=>x0+w*v/4,by=Y+68;
      const NM=['none/low','mild','moderate','high','very high','extremely high'];
      s+=tx(X+14,Y+38,'BSL-23 · self-rated · mean item score 0–4','t-xs');
      for(let k=0;k<6;k++)s+=`<rect x="${f1(Xv(B[k]))}" y="${by}" width="${f1(Xv(B[k+1])-Xv(B[k])-1)}" height="14" style="fill:${C[k]};opacity:${O[k]}"/>`;
      B.forEach(v=>{s+=tx(Xv(v),by+26,v,'t-xs t-mid')});
      const v=lerp(2.4,1.2,ease(ramp(u,.1,.85))),bi=B.findIndex((b,k)=>v>=b&&v<B[k+1]);
      s+=`<path d="M${f1(Xv(v))} ${by-2}l-6 -9h12z" style="fill:var(--ink)"/>`+tx(Xv(v),by-14,v.toFixed(1)+' · '+NM[bi],'t-xs t-mid','fill:var(--ink);font-weight:700');
      s+=`<line x1="${f1(Xv(1.5))}" x2="${f1(Xv(1.5))}" y1="${by-4}" y2="${by+18}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 2"/>`;
      const zy=by+48,z=Math.round(lerp(20,10,ease(ramp(u,.1,.85))));
      s+=tx(X+14,zy-6,'ZAN-BPD · clinician-rated · past week · 0–36','t-xs')+`<rect x="${f1(x0)}" y="${zy}" width="${f1(w)}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(x0)}" y="${zy}" width="${f1(w*z/36)}" height="12" rx="6" style="fill:var(--dx)"/>`+tx(x0+w*z/36+6,zy+10,z,'t-xs','fill:var(--ink);font-weight:700');
      if(H>zy+30-Y)s+=tx(X+14,Y+H-12,'illustrative scores falling over treatment','t-xs')}
    else{const L=['Warning signs','Internal coping','People &amp; places','People to ask','Crisis lines','Safer surroundings'],cw=(W-28)/2,rh=Math.min(30,(H-70)/3);
      L.forEach((l,k)=>{const c=k%2,r=Math.floor(k/2),xx=X+14+c*cw,yy=Y+36+r*rh,a=ramp(u,.04+k*.11,.14+k*.11);
        s+=`<rect x="${f1(xx)}" y="${f1(yy+4)}" width="16" height="16" rx="4" style="fill:${a>=1?'var(--accent-soft)':'var(--panel)'};stroke:var(--accent);stroke-width:1.3"/>`;
        if(a>0)s+=`<path d="M${f1(xx+4)} ${f1(yy+12)}l3.5 3.5l5 -7" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round;opacity:${f1(a)}"/>`;
        s+=tx(xx+24,yy+16,l,'t-sm','fill:var(--ink)')});
      s+=tx(X+14,Y+H-14,(W<340?'':'written with the person · ')+'see 4.2 Suicide &amp; self-harm safety','t-xs','fill:var(--accent)')}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 620');
    const L=N?{lx:12,ly:290,lw:376,lh:310,cx:12,cy:12,cw:376,ch:238}:{lx:24,ly:120,lw:672,lh:230,cx:24,cy:14,cw:382,ch:162};
    const f=t*7,i=clamp(Math.floor(f),0,6),u=clamp(f-i);
    const lab=AS_LBL[N?'n':'w'];
    const ld=ladder(L.lx,L.ly,L.lw,L.lh,lab,{at:i,col:'var(--dx)',done:true});
    let s=ld.svg;
    const sw=L.lw/7,sh=L.lh/7;
    (N?AS_SUBN:AS_SUB).forEach((sb,k)=>{if(!sb||sh*(k+1)<44)return;const sx=L.lx+sw*k+(sw-3)/2,sy=L.ly+L.lh-sh*(k+1)+30;
      s+=tx(sx,sy,sb,'t-xs t-mid',k===i?'fill:var(--on-brand);opacity:.85':'opacity:.8')});
    /* the climber: stands on step i, hops to i+1 at the end of each step */
    const hop=ease(ramp(u,.86,1)),a=ld.top(i),b=ld.top(Math.min(6,i+1)),px=lerp(a[0],b[0],i<6?hop:0),py=lerp(a[1],b[1],i<6?hop:0)-(i<6?bump(hop,0,1)*16:0);
    s+=person(px,py-30,28,'var(--self)');
    s+=N?`<g transform="translate(12 12) scale(1.2533)">${scene(i,u,0,0,300,190)}</g>`:scene(i,u,L.cx,L.cy,L.cw,L.ch);
    if(!N)s+=tx(696,40,`step ${i+1} of 7`,'t-sm t-end')+tx(696,56,teen?'adolescent pathway':'adult pathway','t-xs t-end');
    svg.innerHTML=s;
    const p=phaseOf(AS_STEPS,t);setSt(p);
    $('#asNote').innerHTML=noteHTML(AS_STEPS[p])+(teen?`<div class="kv"><div><dt>Adolescent pathway</dt><dd>${AS_TEEN[p]}</dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#asPlay'),draw,28000,'%t:player.replay%','assess');
  const setSt=stepWire($('#asSteps'),AS_STEPS,rg,draw,stop);
  $$('[data-asage]').forEach(b=>b.addEventListener('click',()=>{teen=b.dataset.asage==='teen';$$('[data-asage]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- predictive-value calculator: 1,000 people screened ---- */
  const isv=$('#asIcons'),pr=$('#asPrev'),ts=$('#asTest');let reveal=1,stopR=null;
  function counts(){const p=+pr.value/100,T=AS_TESTS[+ts.value]||AS_TESTS[0],D=Math.round(1000*p),TP=Math.round(D*T.se),FN=D-TP,FP=Math.round((1000-D)*(1-T.sp)),TN=1000-D-FP;return{p,T,D,TP,FN,FP,TN}}
  function drawI(){const N=vb(isv,'720 360','400 620');const c=counts();
    const cols=N?25:40,rows=N?40:25,cell=N?14.4:13.6,x0=N?(400-cols*cell)/2:(720-cols*cell)/2,y0=N?8:8;
    let s='';const lim=Math.round(1000*reveal);
    for(let k=0;k<1000;k++){const r=Math.floor(k/cols),q=k%cols,x=x0+q*cell,y=y0+r*cell;
      const g=k<c.TP?0:k<c.TP+c.FN?1:k<c.TP+c.FN+c.FP?2:3,on=k<lim;
      const st=!on?'fill:var(--panel-2);opacity:.5':g===0?'fill:var(--storm)':g===1?'fill:var(--storm-soft);stroke:var(--storm);stroke-width:1':g===2?'fill:var(--dx)':'fill:var(--panel-2)';
      s+=`<rect x="${f1(x+1)}" y="${f1(y+1)}" width="${f1(cell-2.6)}" height="${f1(cell-2.6)}" rx="2" style="${st}"/>`}
    const yb=y0+rows*cell+(N?14:12);
    s+=`<text x="${f1(x0)}" y="${f1(yb)}" class="t-xs">1,000 people screened · ${AS_SET.some(z=>z.p===+pr.value)?'':'custom '}prevalence ${(+pr.value).toFixed(1)}% · ${c.T.n.replace('&','&amp;')}</text>`;
    isv.innerHTML=s;
    const pos=c.TP+c.FP,ppv=pos?c.TP/pos*100:0,npv=(c.TN+c.FN)?c.TN/(c.TN+c.FN)*100:0;
    $('#asPrevV').textContent=(+pr.value).toFixed(1)+'%';
    $('#asRead').innerHTML=`<div><small>truly have BPD</small><b class="as-big">${c.D}</b></div><div><small>screen positive</small><b class="as-big">${pos}</b></div><div><small>positive and truly BPD</small><b class="as-big" style="color:var(--storm)">${Math.round(ppv)}%</b></div><div><small>negative and truly not</small><b class="as-big" style="color:var(--good)">${npv.toFixed(1)}%</b></div>`;
    const set=AS_SET.find(z=>z.p===+pr.value);
    $('#asCalcNote').innerHTML=noteHTML({k:set?set.n+' · '+set.src:'Custom prevalence',t:`${pos} positive screens, ${c.TP} with BPD`,
      txt:`With ${c.T.n} (sensitivity ${c.T.se.toFixed(2)}, specificity ${c.T.sp.toFixed(2)}) ${c.T.c} and a prevalence of ${(+pr.value).toFixed(1)}%, ${c.D} of 1,000 people have BPD. The questionnaire flags ${c.TP} of them and misses ${c.FN}, and it also flags ${c.FP} people who do not have BPD. So a positive screen means BPD about ${Math.round(ppv)}% of the time (positive predictive value), and a negative screen is right ${npv.toFixed(1)}% of the time (negative predictive value).`,
      pt:`A positive questionnaire means "worth a proper assessment", not "you have BPD". Where BPD is rare, most positive screens are false alarms.`,
      hook:`Sensitivity and specificity belong to the test; PPV and NPV depend on prevalence. Calculated MSI-BPD PPV: about 5% at 1%, 38% at 10% and 57% at 20% prevalence. [[Zanarini2003MSI,Ellison2018]]`})
      +`<div class="verdict ${ppv<30?'no':ppv<60?'maybe':'yes'}">${ppv<30?'Most positive screens here are false alarms':ppv<60?'A positive screen is close to a coin toss here':'Most positive screens here are true cases'}: an interview is still needed to diagnose.</div>`;
  }
  function run(){if(stopR)stopR();reveal=0;stopR=animate(700,p=>{reveal=p;drawI()},()=>{stopR=null})}
  $$('[data-asset]').forEach(b=>b.addEventListener('click',()=>{pr.value=AS_SET[+b.dataset.asset].p;$$('[data-asset]').forEach(x=>x.setAttribute('aria-pressed',x===b));run()}));
  pr.addEventListener('input',()=>{if(stopR){stopR();stopR=null}reveal=1;$$('[data-asset]').forEach(x=>x.setAttribute('aria-pressed',AS_SET[+x.dataset.asset].p===+pr.value));drawI()});
  ts.addEventListener('change',run);
  drawI();
  const prevR=redraws.assess;redraws.assess=()=>{prevR&&prevR();drawI()};
  const prevH=onHide.assess;onHide.assess=()=>{prevH&&prevH();if(stopR){stopR();stopR=null;reveal=1}};
};
