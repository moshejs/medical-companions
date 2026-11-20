/* =============== 5.3 Nursing care =============== */
const NU_STEPS=[
 {from:0,at:.1,k:'Station 1',t:'Referral and assessment',
  txt:`Diagnosis is made by a specialist after a full assessment. NICE says "a diagnosis of ADHD should not be made solely on the basis of rating scale or observational data": parent and teacher scales are aids, not tests. For children under 5, group parent training comes first, and NICE says do not offer medication "without a second specialist opinion". [[NICE2018F]]`,
  pt:`The questionnaires you fill in help the specialist, but they cannot diagnose ADHD on their own.`,
  hook:`Rating scales support, but never replace, a full diagnostic assessment.`,
  ck:[[`Parent and teacher rating scales collected as aids`,`NICE2018F`],[`Under 5: parent training first; medication only after a second specialist opinion`,`NICE2018F`],[`Explain that parent training "does not imply bad parenting"`,`NICE2018F`]],
  doc:`Who referred, the concerns, and which scales were used.`},
 {from:.17,at:.28,k:'Station 2',t:'Baseline before medication',
  txt:`NICE 1.7.4: a medical history and current medicines; height and weight against the normal range for age, height and sex; pulse and blood pressure with an appropriately sized cuff against the normal range for age; a cardiovascular assessment; and a risk assessment for substance misuse and diversion. Stimulant labels add a family history of sudden death or ventricular arrhythmia and a check for tics. Strattera asks about bipolar disorder, mania or hypomania; Qelbree about suicide, bipolar disorder and depression. [[NICE2018F,FDA-Concerta,FDA-Strattera,FDA-Qelbree]]`,
  pt:`Before the first dose, the nurse measures height, weight, pulse and blood pressure and asks about heart problems in you and your family. Most people do not need a heart tracing.`,
  hook:`Baseline: height, weight, BP, HR (right cuff), cardiac and family history of sudden death, misuse and diversion risk.`,
  ck:[[`Height and weight against the normal range, plotted on a growth chart`,`NICE2018F`],[`Pulse and BP with an appropriately sized cuff`,`NICE2018F`],[`Cardiovascular history; family history of sudden death or ventricular arrhythmia`,`FDA-Concerta`],[`Personal or family history of tics or Tourette's syndrome`,`FDA-Concerta`],[`Substance misuse and diversion risk`,`NICE2018F`],[`Baseline symptoms, impairment and adverse effects (sleep, appetite) on standard scales`,`NICE2018F`]],
  doc:`Baseline measurements against age norms, cardiovascular and family history, misuse and diversion risk.`},
 {from:.35,at:.46,k:'Station 3',t:'Titration: finding the dose',
  txt:`During titration NICE asks for symptoms, impairment and adverse effects to be recorded at baseline and at each dose change, on standard scales from parents and teachers, with regular contact, for example weekly by phone. Pulse and blood pressure are checked before and after each dose change. The AAP says to titrate "to achieve maximum benefit with tolerable side effects". Labels set the steps; Concerta, for example, rises weekly in 18 mg steps as published. [[NICE2018F,Wolraich2019,FDA-Concerta]]`,
  pt:`The dose is raised step by step. At each step the family and school fill in a short form, and pulse and blood pressure are checked again.`,
  hook:`Every dose change: rating scales from home and school, plus pulse and BP before and after.`,
  ck:[[`Rating scales from parents and teachers at each dose change`,`NICE2018F`],[`Pulse and BP before and after each dose change`,`NICE2018F`],[`Regular contact, for example a weekly phone call`,`NICE2018F`],[`Ask about appetite, sleep, mood and new tics`,`NICE2018F`]],
  doc:`Dose, date, scale scores and adverse effects at each change.`},
 {from:.52,at:.66,k:'Station 4',t:'Maintenance monitoring',
  txt:`NICE 1.8.5 and 1.8.9: height every 6 months in children and young people; weight every 3 months at 10 and under, at 3 and 6 months then every 6 months over 10, and every 6 months in adults; pulse and blood pressure every 6 months. No routine blood tests or ECGs unless clinically indicated. Review if, on 2 occasions, there is sustained resting tachycardia above 120 bpm, arrhythmia, or systolic BP above the 95th percentile (or a clinically significant increase). [[NICE2018F]]`,
  pt:`Every 6 months the nurse checks height, pulse and blood pressure; younger children are weighed every 3 months. Tell the team about poor sleep, poor appetite or mood changes.`,
  hook:`Baseline, then 6-monthly height, weight, BP and HR (weight 3-monthly at 10 and under).`,
  ck:[[`Height every 6 months, plotted with weight`,`NICE2018F`],[`Weight every 3 months (10 and under) or as scheduled`,`NICE2018F`],[`Pulse and BP every 6 months`,`NICE2018F`],[`Sleep (diary if needed), tics, seizures, behaviour`,`NICE2018F`],[`Misuse and diversion risk, which changes with age`,`NICE2018F`]],
  doc:`Growth chart, vital signs against age norms, adverse effects.`},
 {from:.7,at:.8,k:'Station 5',t:'Annual review',
  txt:`NICE 1.10.1: a medication review at least once a year by a clinician with ADHD expertise, covering benefits, adverse effects, effects on education and employment, and the effects of missed doses, planned dose reductions and periods without treatment. NICE 1.10.3 suggests trial periods of stopping or reducing when the balance suggests it, recording the reasons if treatment continues. If height has clearly been affected, NICE suggests a planned break over school holidays for catch-up growth. [[NICE2018F]] After 2+ years on methylphenidate, 40.4% worsened after withdrawal versus 15.9% who continued. [[Matthijssen2019]]`,
  pt:`Once a year the team asks: is the medicine still helping, what are the side effects, and is a trial without it worth trying?`,
  hook:`Review ADHD medication at least once a year and record why it continues.`,
  ck:[[`Benefits, adverse effects, school or work`,`NICE2018F`],[`Effects of missed doses and breaks`,`NICE2018F`],[`Consider a trial off or a lower dose`,`NICE2018F`],[`Consider a holiday break if growth is affected`,`NICE2018F`]],
  doc:`The reasons for continuing medication.`},
 {from:.85,at:1,k:'Station 6',t:'Transition to adult services',
  txt:`NICE: reassess at school-leaving age, and if treatment is still needed the transfer "should usually be completed by the time the young person is 18 years", with a formal meeting between services considered and a full assessment by adult services. The AAP suggests planning from about 14. In UK surveillance of young people on ADHD medication, 64% had a referral accepted, 22% attended a first adult appointment and 6% had an optimal transition. In UK primary care, 63% were still on medication at 17 and 41% at 18. [[NICE2018F,Wolraich2019,Eke2020,NewloveDelgado2018]]`,
  pt:`Moving from children's to adult services is where many people fall through the gap. Start talking about it around age 14.`,
  hook:`Only 6% of UK young people on ADHD medication had an optimal transition.`,
  ck:[[`Reassess at school-leaving age`,`NICE2018F`],[`Plan from about age 14`,`Wolraich2019`],[`Formal meeting between child and adult services`,`NICE2018F`],[`Transfer usually completed by 18`,`NICE2018F`]],
  doc:`Transfer summary: diagnosis, treatment history, monitoring results.`}
];
/* citations must be literal for the build, so the checklist keys map to literal strings */
const NU_CITE={NICE2018F:`[[NICE2018F]]`,'FDA-Concerta':`[[FDA-Concerta]]`,Wolraich2019:`[[Wolraich2019]]`};
const NU_ST=['Referral','Baseline','Titration','Maintenance','Annual review','Transition'];
const NU_ROWS=[ /* name, months */
 ['Rating scales',[0,.25,.5,.75,1],'var(--dx)'],
 ['Pulse & BP',[0,.25,.5,.75,1,6,12,18,24],'var(--dz)'],
 ['Height',[0,6,12,18,24],'var(--rx)'],
 ['Weight, 10 and under',[0,3,6,9,12,15,18,21,24],'var(--gold)'],
 ['Weight, over 10',[0,3,6,12,18,24],'var(--gold)'],
 ['Weight, adults',[0,6,12,18,24],'var(--gold)'],
 ['Annual review',[12,24],'var(--brand)']];
const NU_CARDIO=['Congenital heart disease or previous cardiac surgery','Sudden death in a first-degree relative under 40 suggesting cardiac disease','Shortness of breath on exertion compared with peers','Fainting on exertion or with fright or noise','Rapid, regular palpitations that start and stop suddenly','Chest pain suggesting a cardiac cause','Signs of heart failure','A murmur','Blood pressure in the adult hypertensive range'];
const NU_VIS=['Baseline','Dose change 1','Dose change 2','3 months','6 months','12 months'];
const NU_EX={
 ok:{hr:[82,86,88,88,87,89],bp:['n','n','b','n','n','n'],ar:[0,0,0,0,0,0],wt:[30,30.1,30.3,30.6,31,32.2]},
 hr:{hr:[84,98,124,126,121,104],bp:['n','n','b','b','n','n'],ar:[0,0,0,0,0,0],wt:[30,29.9,30,30.2,30.6,31.4]},
 bp:{hr:[86,90,94,96,95,92],bp:['n','b','h','h','b','n'],ar:[0,0,0,0,0,0],wt:[30,30,30.2,30.5,31,31.8]},
 wt:{hr:[80,86,90,91,90,88],bp:['n','n','n','n','n','n'],ar:[0,0,0,0,0,0],wt:[30,29.6,29.1,28.7,28.8,29.2]}};
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');
  const cm=t=>t<.35?0:t<.52?2*ramp(t,.35,.5):t<.7?2+22*ramp(t,.52,.68):24;
  function walkPos(t){const F=NU_STEPS.map(s=>s.from).concat([1.0001]);let i=phaseOf(NU_STEPS,t);if(i>=5)return 5;
    const a=F[i],b=F[i+1],w=ramp(t,a+(b-a)*.62,b);return i+ease(w)}
  function draw(t){
    const N=vb(svg,'720 380','400 500'),p=phaseOf(NU_STEPS,t),m=cm(t);let s=`<defs>${marker('nuAr','var(--muted)')}</defs>`;
    /* ---- road ---- */
    const R=N?{x0:34,x1:366,y:62}:{x0:66,x1:654,y:58},SX=i=>lerp(R.x0,R.x1,i/5);
    s+=`<line x1="${R.x0}" x2="${R.x1}" y1="${R.y}" y2="${R.y}" style="stroke:var(--line);stroke-width:8;stroke-linecap:round"/>`;
    const wp=walkPos(t);
    s+=`<line x1="${R.x0}" x2="${f1(SX(wp))}" y1="${R.y}" y2="${R.y}" style="stroke:var(--brand-soft);stroke-width:8;stroke-linecap:round"/>`;
    NU_ST.forEach((n,i)=>{const x=SX(i),on=i===p,done=i<p;
      s+=`<circle cx="${f1(x)}" cy="${R.y}" r="${on?13:10}" style="fill:${on?'var(--brand)':done?'var(--brand-soft)':'var(--panel)'};stroke:${on||done?'var(--brand)':'var(--muted)'};stroke-width:2"/><text x="${f1(x)}" y="${R.y+4}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700">${i+1}</text>`;
      const w=n.split(' ');
      if(N&&w.length>1)s+=`<text x="${f1(x)}" y="${R.y+30}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${w[0]}</text><text x="${f1(x)}" y="${R.y+41}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${w[1]}</text>`;
      else s+=`<text x="${f1(x)}" y="${R.y+30}" class="${N?'t-xs':'t-sm'} t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${n}</text>`});
    /* walker above the road, bobbing while moving */
    const moving=wp%1>0&&wp<5,bob=moving?Math.abs(Math.sin(t*180))*2:0;
    s+=person(SX(wp),R.y-44-bob,26,'var(--ink)');
    /* clipboard counter beside the walker */
    const st=NU_STEPS[p],nd=Math.round(st.ck.length*clamp(ramp(t,st.from,st.at)*1.05));
    /* ---- calendar or transition funnel ---- */
    const fade=ramp(t,.85,.9);
    const C=N?{x:132,w:256,y:150,rh:38,lx:8}:{x:176,w:520,y:132,rh:27,lx:20};
    const XM=v=>C.x+(v<=3?v/3*.3:.3+(v-3)/21*.7)*C.w;
    if(fade<1){let g=`<g style="opacity:${f1(1-fade)}">`;
      g+=`<text x="${C.lx}" y="${C.y-14}" class="t-sm">MONITORING CALENDAR, NICE NG87 (months on medication)</text>`;
      const yb=C.y+NU_ROWS.length*C.rh;
      [0,1,2,3,6,12,18,24].forEach(v=>{g+=`<line x1="${f1(XM(v))}" x2="${f1(XM(v))}" y1="${C.y}" y2="${yb}" class="grid"/><text x="${f1(XM(v))}" y="${yb+14}" class="t-xs t-mid">${v}</text>`});
      g+=`<text x="${f1(XM(1.5))}" y="${yb+28}" class="t-xs t-mid" style="fill:var(--dx)">titration (stretched)</text><text x="${C.x+C.w}" y="${yb+28}" class="t-xs t-end">months</text>`;
      NU_ROWS.forEach(([n,ms,c],r)=>{const yy=C.y+r*C.rh+C.rh/2;
        g+=`<text x="${C.lx}" y="${f1(yy+3.5)}" class="t-xs" style="fill:var(--ink)">${n}</text><line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--line);stroke-width:1"/>`;
        ms.forEach(v=>{const vis=t>=.17&&v<=m+1e-6,x=XM(v);
          if(r===6){if(vis){const pulse=p===4?1+.25*Math.sin(t*90):1;g+=`<path d="M${f1(x)} ${f1(yy-8*pulse)}L${f1(x+3)} ${f1(yy-2)}L${f1(x+9*pulse)} ${f1(yy)}L${f1(x+3)} ${f1(yy+2)}L${f1(x)} ${f1(yy+8*pulse)}L${f1(x-3)} ${f1(yy+2)}L${f1(x-9*pulse)} ${f1(yy)}L${f1(x-3)} ${f1(yy-2)}Z" style="fill:${c}"/>`}else g+=`<circle cx="${f1(x)}" cy="${f1(yy)}" r="4" style="fill:none;stroke:${c};stroke-width:1;opacity:.45"/>`;return}
          g+=vis?`<circle cx="${f1(x)}" cy="${f1(yy)}" r="5" style="fill:${c}"/>`:`<circle cx="${f1(x)}" cy="${f1(yy)}" r="4" style="fill:none;stroke:${c};stroke-width:1;opacity:.45"/>`});});
      if(t>=.17)g+=`<line x1="${f1(XM(m))}" x2="${f1(XM(m))}" y1="${C.y-4}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.5;opacity:.5"/>`;
      if(t<.17)g+=`<text x="${f1(C.x+C.w/2)}" y="${f1(C.y+NU_ROWS.length*C.rh/2)}" class="t-lbl t-mid" style="fill:var(--muted)">No medication yet: assessment comes first</text>`;
      s+=g+'</g>'}
    if(fade>0){let g=`<g style="opacity:${f1(fade)}">`;const k=ease(ramp(t,.87,.97));
      const B=[['Referral to adult services accepted',64,'var(--brand)'],['Attended a first adult appointment',22,'var(--warn)'],['Optimal transition',6,'var(--bad)'],['Still on medication at 17',63,'var(--rx)'],['Still on medication at 18',41,'var(--rx)']];
      const bx=N?14:30,bw=N?300:470,by=N?150:136,bh=N?56:40;
      g+=`<text x="${bx}" y="${by-14}" class="t-sm">YOUNG PEOPLE ON ADHD MEDICATION IN THE UK (%)</text>`;
      B.forEach(([n,v,c],i)=>{const yy=by+i*bh+(i>2?(N?14:10):0);
        if(i===3)g+=`<line x1="${bx}" x2="${bx+bw+40}" y1="${f1(yy-8)}" y2="${f1(yy-8)}" class="grid"/>`;
        g+=`<text x="${bx}" y="${f1(yy+8)}" class="t-xs" style="fill:var(--ink)">${n}</text><rect x="${bx}" y="${f1(yy+13)}" width="${f1(bw*v/100*k)}" height="${N?16:13}" rx="3" style="fill:${c}"/><text x="${f1(bx+bw*v/100*k+6)}" y="${f1(yy+24)}" class="t-sm" style="fill:var(--ink)">${Math.round(v*k)}%</text>`});
      g+=`<text x="${bx}" y="${N?474:362}" class="t-xs">transition funnel: UK surveillance; medication at 17 and 18: UK primary care</text>`;
      s+=g+'</g>'}
    svg.innerHTML=s;
    setSt(p);
    const items=st.ck.map(([txt,key],i)=>`<li class="${i<nd?'on':''}"><i aria-hidden="true"></i><span>${txt} ${NU_CITE[key]}</span></li>`).join('');
    $('#nuNote').innerHTML=noteHTML(st)+`<ul class="nuchk" aria-label="Checklist">${items}</ul><div class="kv"><div><dt>Document</dt><dd>${st.doc}</dd></div></div>`;
    $('#nuRead').innerHTML=`<span>station <b>${p+1} · ${NU_ST[p]}</b></span><span>checklist <b>${nd}/${st.ck.length}</b></span>${t>=.17&&t<.85?`<span>month on medication <b>${m<3?f1(m):Math.round(m)}</b></span>`:''}`;
  }
  const stop=playWire(rg,$('#nuPlay'),draw,26000,'Replay','nursing');
  const setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- cardiology opinion checklist (NICE 1.7.5) ---- */
  const cw=$('#nuCardio'),co=$('#nuCardioOut');
  cw.innerHTML=NU_CARDIO.map((n,i)=>`<label for="nuCa${i}"><input type="checkbox" id="nuCa${i}" data-nuca="${i}"><span>${n}</span></label>`).join('')+`<label for="nuCaX"><input type="checkbox" id="nuCaX" data-nuca="x"><span>Taking another medicine that may raise cardiac risk</span></label>`;
  function cardio(){const on=$$('[data-nuca]',cw).filter(c=>c.checked).map(c=>c.dataset.nuca),f=on.filter(x=>x!=='x').length,x=on.includes('x');
    co.className='verdict '+(f?'no':x?'maybe':'yes');
    co.innerHTML=f?`${f} NICE 1.7.5 feature${f>1?'s':''} ticked: NICE calls for a cardiology opinion before starting medication. [[NICE2018F]]`
      :x?`No 1.7.5 feature, but a co-prescribed medicine with cardiac risk is one of the situations in which NICE does not rule out an ECG. [[NICE2018F]]`
      :`No feature ticked: NICE says an ECG "is not needed before starting stimulants, atomoxetine or guanfacine". The labels still require a careful history, family history and examination. [[NICE2018F,FDA-Concerta]]`}
  cw.addEventListener('change',cardio);cardio();

  /* ---- plot the readings ---- */
  const vw=$('#nuVisits'),ch=$('#nuChart'),who=$('#nuWho');let D=JSON.parse(JSON.stringify(NU_EX.ok));
  const BAND={c:{n:'below 90th centile',b:'90th–95th centile',h:'above 95th centile'},a:{n:'normal range',b:'high-normal',h:'hypertensive range'}};
  function buildVisits(){const W=who.value;
    vw.innerHTML=NU_VIS.map((v,i)=>`<div class="nuvisit"><b>${v}</b>
      <label for="nuHr${i}">Resting pulse (bpm)<input type="number" id="nuHr${i}" data-nu="hr" data-i="${i}" min="40" max="200" step="1" value="${D.hr[i]}"></label>
      <label for="nuBp${i}">Systolic BP<select id="nuBp${i}" data-nu="bp" data-i="${i}">${['n','b','h'].map(k=>`<option value="${k}"${D.bp[i]===k?' selected':''}>${BAND[W][k]}</option>`).join('')}</select></label>
      <label for="nuWt${i}">Weight (kg)<input type="number" id="nuWt${i}" data-nu="wt" data-i="${i}" min="5" max="200" step="0.1" value="${D.wt[i]}"></label>
      <label class="ck" for="nuAr${i}"><input type="checkbox" id="nuAr${i}" data-nu="ar" data-i="${i}"${D.ar[i]?' checked':''}>Arrhythmia</label></div>`).join('')}
  function read(e){const el=e.target.closest('[data-nu]');if(!el)return;const k=el.dataset.nu,i=+el.dataset.i;
    if(k==='ar')D.ar[i]=el.checked?1:0;else if(k==='bp')D.bp[i]=el.value;else{const v=parseFloat(el.value);if(!isFinite(v))return;D[k][i]=v}
    $$('[data-nuex]').forEach(b=>b.setAttribute('aria-pressed','false'));chart()}
  vw.addEventListener('input',read);vw.addEventListener('change',read);
  function chart(){
    const N=vb(ch,'720 320','400 560'),W=who.value,on=[1,2,3,4,5];
    const hrHi=on.filter(i=>D.hr[i]>120),bpHi=on.filter(i=>D.bp[i]==='h'),arr=on.filter(i=>D.ar[i]),wDrop=on.filter(i=>D.wt[i]<D.wt[i-1]);
    const P=N?{x:44,y:34,w:338,h:170}:{x:56,y:34,w:340,h:226};
    const Xv=i=>P.x+(i+.5)/6*P.w;let s='';
    const A=axes(P.x,P.y,P.w,P.h,{x0:0,x1:1,y0:50,y1:150,yt:[60,80,100,120,140],yl:'RESTING PULSE (bpm)'});s+=A.svg;
    s+=`<line x1="${P.x}" x2="${P.x+P.w}" y1="${f1(A.Y(120))}" y2="${f1(A.Y(120))}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:6 4"/><text x="${P.x+P.w}" y="${f1(A.Y(120)-5)}" class="t-xs t-end" style="fill:var(--bad)">120 bpm (NICE 1.8.11)</text>`;
    NU_VIS.forEach((v,i)=>{s+=`<text x="${f1(Xv(i))}" y="${P.y+P.h+14}" class="t-xs t-mid">${['Base','Dose 1','Dose 2','3 mo','6 mo','12 mo'][i]}</text>`});
    const hv=D.hr.map(v=>clamp(v,50,150));
    s+=`<path d="${hv.map((v,i)=>(i?'L':'M')+f1(Xv(i))+' '+f1(A.Y(v))).join('')}" style="fill:none;stroke:var(--dz);stroke-width:2.4"/>`;
    hv.forEach((v,i)=>{const hi=D.hr[i]>120;s+=`<circle cx="${f1(Xv(i))}" cy="${f1(A.Y(v))}" r="${hi?6:4.5}" style="fill:${hi?'var(--bad)':'var(--panel)'};stroke:var(--dz);stroke-width:2"/>`;
      if(hi)s+=`<circle cx="${f1(Xv(i))}" cy="${f1(A.Y(v))}" r="11" style="fill:none;stroke:var(--bad);stroke-width:1.4"/>`;
      if(D.ar[i])s+=`<text x="${f1(Xv(i))}" y="${f1(A.Y(v)-12)}" class="t-xs t-mid" style="fill:var(--bad)">arrhythmia</text>`});
    /* BP bands */
    const Q=N?{x:44,y:262,w:338,h:84}:{x:446,y:34,w:254,h:96};
    const Xq=i=>Q.x+(i+.5)/6*Q.w,bands=['h','b','n'],bh=Q.h/3;
    s+=`<text x="${N?12:Q.x}" y="${Q.y-8}" class="t-xs">SYSTOLIC BP BAND</text>`;
    bands.forEach((b,j)=>{s+=`<rect x="${Q.x}" y="${f1(Q.y+j*bh)}" width="${Q.w}" height="${f1(bh-2)}" rx="3" style="fill:${b==='h'?'var(--bad-soft)':b==='b'?'var(--warn-soft)':'var(--good-soft)'}"/><text x="${Q.x+4}" y="${f1(Q.y+j*bh+11)}" class="t-xs">${BAND[W][b]}</text>`});
    D.bp.forEach((b,i)=>{const j=bands.indexOf(b);s+=`<circle cx="${f1(Xq(i))}" cy="${f1(Q.y+j*bh+bh/2+2)}" r="${b==='h'?6:4.5}" style="fill:${b==='h'?'var(--bad)':b==='b'?'var(--warn)':'var(--good)'}"/>`});
    /* weight */
    const Wp=N?{x:44,y:396,w:338,h:110}:{x:446,y:170,w:254,h:90};
    const wmin=Math.min(...D.wt),wmax=Math.max(...D.wt),lo=Math.floor(wmin-1),hi=Math.ceil(wmax+1);
    const B=axes(Wp.x,Wp.y,Wp.w,Wp.h,{x0:0,x1:1,y0:lo,y1:hi,yt:[lo,Math.round((lo+hi)/2),hi],yl:'WEIGHT (kg)'});s+=B.svg;
    const Xw=i=>Wp.x+(i+.5)/6*Wp.w;
    s+=`<path d="${D.wt.map((v,i)=>(i?'L':'M')+f1(Xw(i))+' '+f1(B.Y(v))).join('')}" style="fill:none;stroke:var(--gold);stroke-width:2.4"/>`;
    D.wt.forEach((v,i)=>{const dr=i>0&&v<D.wt[i-1];s+=`<circle cx="${f1(Xw(i))}" cy="${f1(B.Y(v))}" r="${dr?5.5:4}" style="fill:${dr?'var(--warn)':'var(--panel)'};stroke:var(--gold);stroke-width:2"/>`});
    NU_VIS.forEach((v,i)=>{s+=`<text x="${f1(Xw(i))}" y="${Wp.y+Wp.h+13}" class="t-xs t-mid">${['B','1','2','3m','6m','12m'][i]}</text>`});
    ch.innerHTML=s;
    /* verdicts, as published */
    const ref=W==='c'?'a paediatric hypertension specialist':'an adult physician';const out=[];let lvl='yes';
    const two=(arr,what)=>{if(arr.length>=2){lvl='no';out.push(`<b>${what} on ${arr.length} occasions.</b> NICE 1.8.11: if a person on ADHD medication has, on 2 occasions, sustained resting tachycardia above 120 bpm, arrhythmia, or systolic blood pressure above the 95th percentile (or a clinically significant increase), reduce the dose and refer to ${ref}.`)}
      else if(arr.length===1){if(lvl==='yes')lvl='maybe';out.push(`<b>${what} at one visit.</b> The NICE review rule is written for 2 occasions, so this reading is rechecked at the next visit rather than acted on alone.`)}};
    two(hrHi,'Resting pulse above 120 bpm');two(arr,'Arrhythmia');two(bpHi,W==='c'?'Systolic BP above the 95th centile':'Systolic BP in the hypertensive range');
    if(D.bp[0]==='h'){lvl='no';out.push(W==='c'?`<b>Baseline BP above the 95th centile.</b> NICE 1.7.6: if this is consistent, refer to a paediatric hypertension specialist before starting medication.`:`<b>Baseline BP in the hypertensive range.</b> NICE 1.7.5 lists blood pressure in the adult hypertensive range as a reason for a cardiology opinion before starting.`)}
    if(wDrop.length){if(lvl==='yes')lvl='maybe';out.push(`<b>Weight fell at ${wDrop.length} visit${wDrop.length>1?'s':''}.</b> NICE 1.8.6 options when weight loss is a concern: medication with or after food, extra meals early in the morning or late in the evening, dietary advice, high-calorie foods of good nutritional value, a planned break, or changing medication.`)}
    if(!out.length)out.push(`<b>Nothing here meets a NICE review threshold.</b> A small rise in pulse is expected: stimulants raise heart rate by about 3 to 6 bpm and blood pressure by about 2 to 4 mm Hg on average. ${`[[FDA-Concerta]]`}`);
    $('#nuChartNote').innerHTML=`<div class="kicker">Readings at ${NU_VIS.length} visits · ${W==='c'?'child or young person':'adult'}</div><h4>${lvl==='no'?'Prompts a review':lvl==='maybe'?'Watch and recheck':'Within the expected range'}</h4><div class="verdict ${lvl}">${out.join('<br><br>')}</div><p>Thresholds quoted from NICE NG87 as published. [[NICE2018F]]</p><div class="hook"><b>Exam hook</b>Baseline, then 6-monthly height, weight, BP and HR; review after 2 readings over the threshold.</div>`;
  }
  $$('[data-nuex]').forEach(b=>b.addEventListener('click',()=>{D=JSON.parse(JSON.stringify(NU_EX[b.dataset.nuex]));$$('[data-nuex]').forEach(x=>x.setAttribute('aria-pressed',x===b));buildVisits();chart()}));
  who.addEventListener('change',()=>{buildVisits();chart()});
  buildVisits();chart();
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();chart()};
};
