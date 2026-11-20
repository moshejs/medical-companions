/* =============== 3.4 Antipsychotics in bipolar disorder =============== */
/* Cipriani 2011 antimanic SMD vs placebo (magnitude), ap = antipsychotic */
const AP_MAN=[['Haloperidol',.56,1],['Risperidone',.50,1],['Olanzapine',.43,1],['Lithium',.37,0],['Quetiapine',.37,1],['Aripiprazole',.37,1],['Carbamazepine',.36,0],['Asenapine',.30,1],['Valproate',.20,0],['Ziprasidone',.20,1]];
const AP_FEW={Olanzapine:1,Risperidone:1,Quetiapine:1};
/* bipolar depression NNT for response vs placebo: Ketter 2014; cariprazine Citrome 2019. kind: 1 approved antipsychotic, 0 comparison */
const AP_DEP=[['Olanzapine–fluoxetine',4,1],['Lurasidone (alone)',5,1],['Quetiapine',6,1],['Lurasidone (add-on)',7,1],['Cariprazine',10,1],['Lumateperone',null,1],['Lamotrigine',12,0],['Add-on antidepressants',29,0]];
const AP_STEPS=[
 {from:0,at:.03,k:'Acute mania',t:'The yardstick',
  txt:`Cipriani and colleagues pooled 68 randomised trials in acute mania (16,073 participants) in a network meta-analysis, so every drug could be compared with placebo and with each other. Each dot is a standardised mean difference (SMD): how far, on average, mania scores fell beyond placebo. [[Cipriani2011Mania]]`,
  pt:`Each dot shows how much more a medicine helped than a dummy pill, on average. Further right means a bigger effect.`},
 {from:.08,at:.19,k:'Acute mania',t:'Top of the table',
  txt:`Haloperidol (SMD −0.56), risperidone (−0.50) and olanzapine (−0.43) came out on top. The authors concluded that <i>"antipsychotic drugs were significantly more effective than mood stabilisers"</i> and that risperidone, olanzapine and haloperidol <i>"should be considered as among the best of the available options"</i>. [[Cipriani2011Mania]]`,
  hook:`Most effective antimanic drugs in Cipriani 2011: haloperidol, risperidone, olanzapine.`},
 {from:.21,at:.31,k:'Acute mania',t:'A crowded middle',
  txt:`Lithium, quetiapine and aripiprazole (each −0.37) and carbamazepine (−0.36) sit close together. CANMAT/ISBD 2018 lists lithium, quetiapine, divalproex, asenapine, aripiprazole, paliperidone, risperidone and cariprazine as first-line monotherapy, with <i>"comparable efficacy (Cohen's d 0.32‐0.66)"</i>, and suggests lithium <i>"should be considered first for acute mania unless there are specific reasons not to"</i>. [[Cipriani2011Mania,Yatham2018]]`,
  pt:`Several medicines work about equally well for mania. The choice often depends on side effects, past response and what the person prefers.`,
  hook:`CANMAT/ISBD 2018: about 50% respond to one medicine within 3–4 weeks; adding an antipsychotic to lithium or divalproex helps about 20% more.`},
 {from:.34,at:.45,k:'Acute mania',t:'Smaller effects',
  txt:`Asenapine (−0.30), valproate (−0.20) and ziprasidone (−0.20) still beat placebo. Pooled across 38 trials, 48% responded on an active drug vs 31% on placebo, a number needed to treat (NNT) of 6. Second-generation antipsychotics did not differ from haloperidol in head-to-head trials. [[Cipriani2011Mania,Yildiz2011Mania]]`,
  pt:`About half of people improved clearly on a medicine within weeks, against about a third on a dummy pill.`,
  hook:`Mania: pooled response 48% vs 31%, NNT 6 (Yildiz 2011).`},
 {from:.47,at:.56,k:'Acute mania',t:'Staying on treatment',
  txt:`Olanzapine, risperidone and quetiapine led to significantly fewer discontinuations than lithium, lamotrigine, placebo, topiramate and gabapentin. Gabapentin, lamotrigine and topiramate were no better than placebo for mania. NICE: if mania develops in someone not on an antipsychotic or mood stabiliser, <i>"offer haloperidol, olanzapine, quetiapine or risperidone"</i>. [[Cipriani2011Mania,NICE2014CG185F]]`,
  pt:`A medicine only helps if a person can keep taking it, so how many people stop early matters as much as the average effect.`},
 {from:.6,at:.86,k:'Bipolar depression',t:'Five approved treatments',
  txt:`Quetiapine, lurasidone, cariprazine, lumateperone and olanzapine–fluoxetine are US-approved for bipolar depression. Here each is shown as an NNT: how many people need treating for one extra response compared with placebo (smaller is better). Olanzapine–fluoxetine 4, lurasidone 5 alone and 7 as an add-on, quetiapine 6, cariprazine 10; lamotrigine (12) and add-on antidepressants (29) are shown for comparison. [[Ketter2014,Citrome2019Cariprazine,FDA-Seroquel,FDA-Latuda,FDA-Vraylar,FDA-Caplyta,FDA-OlanzapineFluoxetine]]`,
  pt:`Several antipsychotic medicines treat bipolar depression, not only mania. Each has different side effects.`,
  hook:`FDA-approved for bipolar depression: quetiapine, lurasidone, cariprazine, lumateperone, olanzapine–fluoxetine.`},
 {from:.92,at:1,k:'Bipolar depression',t:'Bipolar II and the trade-offs',
  txt:`In a 2023 network meta-analysis of 101 trials, effects ranged from SMD 0.41 (olanzapine plus fluoxetine) to 0.16 (lamotrigine). Lumateperone's NNT is not in this guide's sources; its trial effect size was 0.56, in bipolar I and II. Quetiapine is <i>"the only recommended first‐line treatment for BDII depression"</i> in CANMAT/ISBD 2018. Benefits come with harms: olanzapine–fluoxetine weight gain NNH 6, quetiapine sedation NNH 5. [[Yildiz2023,Calabrese2021Lumateperone,Yatham2018,Ketter2014]]`,
  pt:`The most effective option is not always the best one for a person. Weight gain and sleepiness are weighed against how well a medicine works.`,
  hook:`Quetiapine is the only CANMAT/ISBD 2018 first-line treatment for bipolar II depression.`}
];
/* NICE CG185 monitoring events (weeks) for the four rows */
const AP_MROWS=[['Weight / BMI','wt'],['Glucose or HbA1c','glu'],['Blood lipids','lip'],['Pulse & blood pressure','bp']];
const AP_MEV={wt:[0,1,2,3,4,5,6,12,52],glu:[0,12,52],lip:[0,12,52],bp:[0,52]};
const AP_MN=[
 {from:0,k:'Before starting',t:'A baseline',
  txt:`NICE CG185: before starting an antipsychotic, measure and record weight or BMI, pulse, blood pressure, fasting blood glucose or HbA1c, and blood lipid profile. [[NICE2014CG185F]]`,
  pt:`A first set of measurements gives a starting point, so any change later can be spotted early.`},
 {from:.03,k:'Weeks 1–6',t:'Weight every week',
  txt:`NICE monitoring during treatment: weight or BMI weekly for the first 6 weeks. Pulse and blood pressure are checked after each dose change, and movement disorders and adherence are also monitored. Weight gain can start early: in the olanzapine maintenance trial, people gained a mean of 3.1 kg during the open-label phase. [[NICE2014CG185F,Tohen2006Olanzapine]]`,
  hook:`NICE antipsychotic monitoring: weight weekly for 6 weeks, then at 12 weeks; glucose/HbA1c and lipids at 12 weeks.`},
 {from:.5,k:'Week 12',t:'Blood tests again',
  txt:`At 12 weeks NICE advises weight or BMI again, plus fasting glucose or HbA1c and lipids. In the Seroquel label, 21% of adults on quetiapine for mania gained at least 7% of body weight within 12 weeks, vs 7% on placebo. [[NICE2014CG185F,FDA-Seroquel]]`,
  pt:`Some medicines can cause weight gain and raise blood sugar or cholesterol. Regular weight and blood checks help catch this early.`},
 {from:.9,k:'Every year',t:'The annual health check',
  txt:`NICE's annual physical health check covers weight or BMI, diet, nutrition and physical activity; pulse and blood pressure; fasting glucose or HbA1c and lipids; and liver, renal and thyroid function and calcium. Metabolic syndrome affects 37.3% of people with bipolar disorder, and 45.3% of those taking antipsychotics vs 32.4% of those not. [[NICE2014CG185,Vancampfort2013]]`,
  pt:`A yearly check-up of the body is part of treatment for bipolar disorder, not an extra.`}
];
/* side-effect comparator: metabolic tier 0 lower, 1 middle, 2 highest; null = no ranking in the sources */
const AP_SE={
 ola:{n:'Olanzapine',tier:2,src:'CANMAT/ISBD 2018; Pillinger 2020',f:[
   `Highest BMI change of 18 antipsychotics (1.07 kg/m²); with clozapine, the worst metabolic profile. [[Pillinger2020]]`,
   `Maintenance trial: mean 3.1 kg gained on open-label olanzapine; another 1.0 kg in those who continued it, while those switched to placebo lost 2.0 kg. [[Tohen2006Olanzapine]]`,
   `Effective for mania (SMD −0.43) and maintenance (relapse 46.7% vs 80.1%), but CANMAT/ISBD places it second-line for maintenance <i>"because of safety issues such as metabolic syndrome"</i>. [[Cipriani2011Mania,Tohen2006Olanzapine,Yatham2018]]`]},
 ofc:{n:'Olanzapine–fluoxetine',tier:2,src:'olanzapine’s ranking',f:[
   `The smallest NNT for bipolar depression response (4), and the matching weight-gain NNH is 6. [[Ketter2014]]`,
   `The label carries the antidepressant-class boxed warning on suicidal thoughts in young people, with close monitoring. [[FDA-OlanzapineFluoxetine]]`]},
 que:{n:'Quetiapine',tier:1,src:'CANMAT/ISBD 2018 (higher at higher doses)',f:[
   `CANMAT/ISBD ranks its metabolic risk after clozapine and olanzapine, <i>"particularly at higher doses"</i>. [[Yatham2018]]`,
   `Label: ≥7% weight gain in 21% vs 7% on placebo (mania, up to 12 weeks) and 8% vs 2% (bipolar depression, up to 8 weeks). [[FDA-Seroquel]]`,
   `Sedation or somnolence: NNH 5 in bipolar depression trials. [[Ketter2014]]`]},
 ris:{n:'Risperidone',tier:1,src:'CANMAT/ISBD 2018',f:[
   `Ranked after clozapine, olanzapine and quetiapine for metabolic risk by CANMAT/ISBD. [[Yatham2018]]`,
   `In a 3-week mania trial (290 inpatients), extrapyramidal (movement) symptoms were its most frequent adverse events. [[Khanna2005Risperidone]]`,
   `Among the most effective for mania (SMD −0.50), with fewer discontinuations than lithium or placebo. [[Cipriani2011Mania]]`]},
 ari:{n:'Aripiprazole',tier:0,src:'CANMAT/ISBD 2018; Pillinger 2020',f:[
   `Among the most benign metabolic profiles; CANMAT/ISBD describes <i>"more minimal impact"</i> for aripiprazole, ziprasidone, asenapine and lurasidone. [[Pillinger2020,Yatham2018]]`,
   `Lower metabolic syndrome risk than other antipsychotics across severe mental illness. [[Vancampfort2015]]`,
   `Not recommended alone for bipolar depression (level 1 negative): its pooled MADRS advantage of 1.12 points was judged not clinically meaningful. [[Yatham2018]]`]},
 lur:{n:'Lurasidone',tier:0,src:'CANMAT/ISBD 2018; Pillinger 2020',f:[
   `Among the most benign metabolic profiles. [[Pillinger2020]]`,
   `NNH for ≥7% weight gain: 29 at 20–60 mg/day, 5550 at 80–120 mg/day, 42 as an add-on. [[Citrome2014Lurasidone]]`,
   `In its monotherapy trial, <i>"minimal changes in weight, lipids, and measures of glycemic control"</i>. [[Loebel2014Mono]]`]},
 car:{n:'Cariprazine',tier:0,src:'Pillinger 2020',f:[
   `Among the most benign metabolic profiles; mean weight gain ≤0.5 kg in all groups in a bipolar depression trial. [[Pillinger2020,Earley2020Cariprazine]]`,
   `Akathisia (an inner restlessness) was more common on cariprazine than placebo in a mania trial. [[Calabrese2015Cariprazine]]`]},
 lum:{n:'Lumateperone',tier:null,src:'not ranked in these sources',f:[
   `In its phase 3 bipolar depression trial, weight, metabolic and endocrine changes were minimal. [[Calabrese2021Lumateperone]]`,
   `Not included in the metabolic rankings used here, so it has no pointer on the scale.`]},
 hal:{n:'Haloperidol',tier:0,src:'Pillinger 2020 (weight)',f:[
   `The only drug with weight change below placebo in the 18-drug analysis (−0.23 kg). [[Pillinger2020]]`,
   `The largest antimanic effect in Cipriani 2011 (SMD −0.56); second-generation antipsychotics did not differ from it in head-to-head trials. [[Cipriani2011Mania,Yildiz2011Mania]]`,
   `CANMAT/ISBD 2018 downgrades it to second-line for mania <i>"due to safety/tolerability risks"</i>. [[Yatham2018]]`]}
};
inits.antipsychotics=()=>{
  /* ---------- 1. evidence plot ---------- */
  const svg=$('#apSvg'),rg=$('#apT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(AP_STEPS,t);
    const fm=1-ramp(t,.58,.63),fd=ramp(t,.6,.65);let s='';
    if(fm>0){/* mania dot plot */
      const L=N?{nx:118,x0:126,x1:350,y0:96,dy:40,ax:520}:{nx:150,x0:170,x1:640,y0:70,dy:24.5,ax:326};
      const X=v=>L.x0+(L.x1-L.x0)*v/.6;
      s+=`<g style="opacity:${f1(fm)}">`;
      s+=N?`<text x="12" y="26" class="t-lbl">Acute mania: effect vs placebo</text><text x="12" y="44" class="t-xs">SMD, Cipriani 2011 · 68 trials · 16,073 people</text>`
          :`<text x="12" y="26" class="t-lbl">Acute mania: effect vs placebo (SMD)</text><text x="708" y="26" class="t-xs t-end">Cipriani 2011 · 68 trials · 16,073 people</text>`;
      [0,.1,.2,.3,.4,.5,.6].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-14}" y2="${L.ax}" class="${v?'grid':'axis'}"/><text x="${f1(X(v))}" y="${L.ax+14}" class="t-xs t-mid">${v?'−'+v.toFixed(1):'0'}</text>`});
      s+=`<text x="${f1(X(0))}" y="${L.ax+28}" class="t-xs t-mid">placebo</text><text x="${L.x1}" y="${L.ax+28}" class="t-xs t-end">bigger effect →</text>`;
      AP_MAN.forEach(([nm,v,ap],i)=>{const a=ramp(t,.06+i*.039,.1+i*.039);if(a<=0)return;
        const y=L.y0+i*L.dy,x=lerp(X(0),X(v),ease(a)),c=ap?'var(--rx)':'var(--li)';
        s+=`<text x="${L.nx}" y="${f1(y+4)}" class="t-sm t-end" style="fill:var(--ink);opacity:${f1(a)}">${nm}</text>`;
        s+=`<line x1="${f1(X(0))}" x2="${f1(x)}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:2;opacity:.35"/>`;
        s+=`<circle cx="${f1(x)}" cy="${y}" r="7" style="fill:${c};stroke:var(--panel);stroke-width:2"/>`;
        if(a>=1)s+=`<text x="${f1(x+12)}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink)">−${v.toFixed(2)}</text>`;
        const fw=ramp(t,.47,.53);if(AP_FEW[nm]&&fw>0)s+=N?`<text x="${L.nx}" y="${f1(y+16)}" class="t-xs t-end" style="fill:var(--good);opacity:${f1(fw)};font-weight:700">✓ fewer drop-outs</text>`:`<text x="${f1(x+54)}" y="${f1(y+4)}" class="t-xs" style="fill:var(--good);opacity:${f1(fw)};font-weight:700">✓ fewer drop-outs</text>`});
      const nb=ramp(t,.49,.55);
      if(nb>0)s+=`<text x="12" y="${L.ax+(N?50:46)}" class="t-sm" style="opacity:${f1(nb)};fill:var(--bad)">${N?'No better than placebo:':'No better than placebo: gabapentin, lamotrigine, topiramate'}</text>${N?`<text x="12" y="${L.ax+66}" class="t-sm" style="opacity:${f1(nb)};fill:var(--bad)">gabapentin, lamotrigine, topiramate</text>`:''}`;
      s+='</g>'}
    if(fd>0){/* depression NNT icon rows */
      const L=N?{nx:12,x0:12,y0:80,dy:62,sz:7,sp:8.6,lab:true}:{nx:186,x0:196,y0:70,dy:34,sz:10,sp:15.5,lab:false};
      s+=`<g style="opacity:${f1(fd)}">`;
      s+=N?`<text x="12" y="26" class="t-lbl">Bipolar depression: number needed</text><text x="12" y="44" class="t-lbl">to treat (NNT) for one extra response</text><text x="12" y="60" class="t-xs">smaller is better · Ketter 2014; Citrome 2019</text>`
          :`<text x="12" y="26" class="t-lbl">Bipolar depression: number needed to treat for one extra response</text><text x="708" y="44" class="t-xs t-end">smaller is better · Ketter 2014; Citrome 2019</text>`;
      AP_DEP.forEach(([nm,n,ap],i)=>{const a=ramp(t,.64+i*.03,.7+i*.03);if(a<=0)return;
        const y=L.y0+i*L.dy,c=ap?'var(--rx)':'var(--muted)',ty=N?y:y+4,ix0=N?L.x0:L.x0,iy=N?y+8:y-9;
        s+=`<text x="${L.nx}" y="${ty}" class="t-sm ${N?'':'t-end'}" style="fill:var(--ink);opacity:${f1(a)}">${nm}${ap?' ':''}</text>`;
        if(n==null){s+=`<text x="${N?ix0:ix0+4}" y="${N?iy+14:ty}" class="t-xs" style="opacity:${f1(a)}">NNT not in this guide's sources; trial effect size 0.56</text>`;return}
        const k=Math.round(a*n);for(let j=0;j<k;j++){const hl=j===0;s+=person(ix0+j*L.sp,iy,L.sz*1.4,hl?c:'var(--muted)',{op:hl?1:.35})}
        if(a>=1)s+=`<text x="${f1(ix0+n*L.sp+6)}" y="${N?iy+10:ty}" class="t-sm" style="fill:${c};font-weight:700">${n}</text>`});
      s+=`<text x="12" y="${N?585:370}" class="t-xs">${N?'one coloured figure = one extra responder':'each row: treat this many people for one extra person to respond (the coloured figure) compared with placebo'}</text>`;
      s+='</g>'}
    svg.innerHTML=s;setSt(p);
    $('#apNote').innerHTML=noteHTML(AP_STEPS[p]);
    $$('[data-apmode]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.apmode==='dep')===(t>=.6)));
  }
  const stop=playWire(rg,$('#apPlay'),draw,22000,'%t:player.replay%','antipsychotics');
  const setSt=stepWire($('#apSteps'),AP_STEPS,rg,draw,stop);
  $$('[data-apmode]').forEach(b=>b.addEventListener('click',()=>{stop();const v=b.dataset.apmode==='dep'?1:.56;rg.value=v;draw(v)}));
  draw(+rg.value);

  /* ---------- 2. monitoring timeline ---------- */
  const ms=$('#apMon'),mr=$('#apMonT');
  const W=u=>u<=.6?u/.6*12:12+(u-.6)/.4*40,U=w=>w<=12?w/12*.6:.6+(w-12)/40*.4;
  function icon(k,x,y,c){if(k==='wt')return `<rect x="${f1(x-8)}" y="${f1(y-6)}" width="16" height="12" rx="3" style="fill:none;stroke:${c};stroke-width:1.6"/><path d="M${f1(x-3)} ${f1(y-1)}L${f1(x)} ${f1(y-4)}" style="stroke:${c};stroke-width:1.6;stroke-linecap:round"/>`;
    if(k==='glu')return `<path d="M${f1(x)} ${f1(y-8)}C${f1(x+6)} ${f1(y-1)} ${f1(x+6)} ${f1(y+6)} ${f1(x)} ${f1(y+6)}S${f1(x-6)} ${f1(y-1)} ${f1(x)} ${f1(y-8)}Z" style="fill:${c};opacity:.85"/>`;
    if(k==='lip')return `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="8" ry="6" style="fill:none;stroke:${c};stroke-width:1.6"/><circle cx="${f1(x-2)}" cy="${f1(y-1)}" r="2" style="fill:${c}"/>`;
    return `<path d="M${f1(x)} ${f1(y+6)}L${f1(x-7)} ${f1(y-1)}A3.8 3.8 0 0 1 ${f1(x)} ${f1(y-5)}A3.8 3.8 0 0 1 ${f1(x+7)} ${f1(y-1)}Z" style="fill:${c};opacity:.85"/>`}
  function drawMon(t){
    const N=vb(ms,'720 300','400 430'),wk=W(t),p=phaseOf(AP_MN,t);
    const L=N?{x0:40,x1:384,y0:140,dy:62,lx:12,ly:-20,ax:392}:{x0:200,x1:700,y0:70,dy:50,lx:16,ly:4,ax:262};
    const X=u=>L.x0+(L.x1-L.x0)*u;let s='';
    s+=`<text x="12" y="24" class="t-lbl">Week ${Math.round(wk)} on an antipsychotic</text><text x="${N?12:708}" y="${N?42:24}" class="t-xs ${N?'':'t-end'}">NICE CG185 schedule</text>`;
    s+=`<rect x="${f1(X(0))}" y="${L.y0-24}" width="${f1(X(.6)-X(0))}" height="${f1(L.dy*3+48)}" rx="8" style="fill:var(--rx-soft);opacity:.35"/>`;
    s+=`<text x="${f1(X(.3))}" y="${L.y0-(N?40:30)}" class="t-xs t-mid" style="fill:var(--rx)">first 12 weeks (stretched)</text>`;
    AP_MROWS.forEach(([nm,k],i)=>{const y=L.y0+i*L.dy;
      s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${y}" y2="${y}" class="grid"/>`;
      s+=`<text x="${L.lx}" y="${y+L.ly}" class="t-sm" style="fill:var(--ink)">${nm}</text>`;
      AP_MEV[k].forEach(w=>{const u=U(w),x=X(u),done=t>=u-1e-6,now=Math.abs(t-u)<.02;
        const rr=N?8:11;s+=`<circle cx="${f1(x)}" cy="${y}" r="${now?rr+2:rr}" style="fill:${done?'var(--rx-soft)':'var(--panel)'};stroke:${done?'var(--rx)':'var(--line)'};stroke-width:${now?2:1.2}"/>`;
        s+=N?`<g transform="translate(${f1(x)} ${y}) scale(.7) translate(${f1(-x)} ${-y})">${icon(k,x,y,done?'var(--rx)':'var(--muted)')}</g>`:icon(k,x,y,done?'var(--rx)':'var(--muted)');
        if(done&&w>0)s+=`<path d="M${f1(x+6)} ${f1(y-14)}l3 3l6 -7" style="fill:none;stroke:var(--good);stroke-width:2;stroke-linecap:round"/>`})});
    if(true){const y=L.y0+3*L.dy;s+=`<text x="${f1(X(.3))}" y="${y+26}" class="t-xs t-mid">+ after each dose change</text>`}
    [0,6,12,26,52].forEach(w=>{const x=X(U(w));s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ax-4}" y2="${L.ax+4}" class="axis"/><text x="${f1(x)}" y="${L.ax+16}" class="t-xs t-mid">${w===0?'start':w===52?'1 yr':'wk '+w}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    const cx=X(t);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.y0-24}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.4;opacity:.5"/><circle cx="${f1(cx)}" cy="${L.ax}" r="5" style="fill:var(--rx)"/>`;
    ms.innerHTML=s;$('#apMonNote').innerHTML=noteHTML(AP_MN[p]);
    mr.setAttribute('aria-valuetext',`Week ${Math.round(wk)}`);
  }
  playWire(mr,$('#apMonPlay'),drawMon,12000,'%t:player.replay%','antipsychotics');drawMon(+mr.value);

  /* ---------- 3. side-effect comparator ---------- */
  const se=$('#apSe'),sel=$('#apDrug');
  function drawSe(){
    const N=vb(se,'720 150','400 190'),D=AP_SE[sel.value],TL=['Lower','Middle','Highest'],TC=['var(--good)','var(--warn)','var(--bad)'];
    const x0=N?12:20,w=N?376:680,y=N?70:66,sw=w/3;let s='';
    s+=`<text x="${x0}" y="24" class="t-lbl">${D.n}: metabolic risk ranking</text><text x="${x0}" y="42" class="t-xs">${D.src}</text>`;
    TL.forEach((l,i)=>{s+=`<rect x="${f1(x0+i*sw+2)}" y="${y}" width="${f1(sw-4)}" height="22" rx="6" style="fill:${TC[i]};opacity:${D.tier===i?.9:.22}"/><text x="${f1(x0+i*sw+sw/2)}" y="${y+40}" class="t-sm t-mid" style="${D.tier===i?'fill:var(--ink);font-weight:700':''}">${l}</text>`});
    if(D.tier!=null){const px=x0+D.tier*sw+sw/2;s+=`<path d="M${f1(px-8)} ${y-14}L${f1(px+8)} ${y-14}L${f1(px)} ${y-3}Z" style="fill:var(--ink)"/>`}
    else s+=`<text x="${f1(x0+w/2)}" y="${y+(N?70:62)}" class="t-xs t-mid">not ranked in these sources</text>`;
    se.innerHTML=s;
    $('#apSeNote').innerHTML=`<div class="kicker">Side effects</div><h4>${D.n}</h4><ul class="apfacts">${D.f.map(x=>`<li>${x}</li>`).join('')}</ul><div class="pt"><b>%t:note.plain%</b>Every medicine has trade-offs. Side effects differ a lot between antipsychotics, so if one is hard to live with, there are often others to discuss with the prescriber.</div>`;
  }
  sel.addEventListener('change',drawSe);drawSe();
  redraws.antipsychotics=(prevR=>()=>{prevR&&prevR();drawSe()})(redraws.antipsychotics);
};
