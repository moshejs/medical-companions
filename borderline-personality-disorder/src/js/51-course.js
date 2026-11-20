/* =============== 5.1 Course & recovery =============== */
/* Published follow-up points (research pass G). Years since baseline -> cumulative %. */
const CU_D={
 rem2:[[0,0],[2,35],[4,55],[6,76],[8,88],[10,91],[12,95],[14,97],[16,99]],   /* 2-year remission, BPD (Zanarini 2012) */
 rem8:[[8,28],[10,43],[12,57],[14,70],[16,78]],                               /* 8-year remission, BPD */
 rec2:[[0,0],[2,14],[4,27],[6,36],[8,43],[10,47],[12,50],[14,56],[16,60]],   /* 2-year recovery, BPD */
 oRem:[[0,0],[2,88],[4,96],[6,99],[16,99]],                                   /* comparison: other personality disorders */
 oRec:[[0,0],[2,51],[4,67],[6,71],[8,77],[10,84],[16,85]],
 rc2:[[0,0],[2,16],[4,21],[6,30],[8,33],[10,34],[12,36],[14,36]],            /* recurrence after a 2-year remission, by years since it */
 clps:[[0,0],[10,85]]                                                         /* CLPS: 85% remitted by 10 years (Gunderson 2011) */
};
/* piecewise-linear through knots; before the first knot 0 (or null when strict) */
function cuPL(k,y,strict){if(y<k[0][0])return strict?null:k[0][1];for(let i=1;i<k.length;i++)if(y<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return k[k.length-1][1]}
const cuY=t=>16*ramp(t,.02,.88);
const CU_SYM=[ /* name, group (a acute, t temperamental, o other), 2-year remission %, 4-year remission %, recurrence after a 2-year remission % (Zanarini 2016) */
 ['Self-harm','a',97,91,43],['Help-seeking suicide attempts','a',99,null,55],['Affective instability','o',96,73,null],['Serious identity disturbance','o',99,null,null],
 ['Chronic depression','t',72,43,null],['Chronic loneliness, emptiness','t',71,42,90],['Chronic anger','t',67,38,98],['Chronic anxiety','t',62,34,93]];
const CU_STEPS={
 msad:[
  {from:0,at:.02,k:'Year 0 · McLean Hospital, 1992–1995',t:'Who was followed',
   txt:`The McLean Study of Adult Development (MSAD) enrolled 290 inpatients who met two sets of criteria for BPD (DIB-R and DSM-III-R), plus 72 inpatients with other personality disorders, and re-interviewed them every 2 years. At baseline they were 77.1% female and 87% white, with a mean age of 27 and a mean GAF score of 39.8, which means major impairment. Retention was high: 87.5% of surviving participants with BPD were seen at every wave to 16 years. [[Temes2019,Zanarini2012]]`,
   pt:`The study followed a group of very unwell young adults for many years and checked on them every two years.`,
   hook:`MSAD = 290 BPD inpatients + 72 other-PD comparisons, McLean, from 1992, assessed every 2 years. [[Temes2019]]`},
  {from:.1,at:.33,k:'Years 2–6',t:'Remission begins early',
   txt:`About a third had a 2-year remission by the 2-year follow-up, and three-quarters by year 6 (35%, 55%, 76% at 2, 4, 6 years). The first 6-year report gave 34.5%, 49.4% and 68.6%, with 73.5% remitting at some point, and only 5.9% of those who remitted had a recurrence by then. No comparison subject developed BPD. [[Zanarini2012,Zanarini2003Course]] Recovery, which also needs good social and vocational functioning, climbs much more slowly: 14% at 2 years, 36% at 6. [[Zanarini2012]]`,
   pt:`Within a few years, most people no longer had enough symptoms for the diagnosis. Getting life back on track took longer.`,
   hook:`MSAD 6-year remission: 34.5% → 49.4% → 68.6%; only 5.9% of remitters had a recurrence. [[Zanarini2003Course]]`},
  {from:.4,at:.55,k:'Year 10',t:'Most have remitted; recovery lags',
   txt:`By 10 years, 93% had a remission lasting at least 2 years and 86% one lasting at least 4 years, but only 50% had recovered. Recurrence was 30% after a 2-year remission and 15% after a 4-year one, and 34% of those who recovered lost their recovery later. [[Zanarini2010Recovery]] Among the 242 people who remitted by 10 years, 39.3% first remitted by year 2 and only 3.7% between years 8 and 10. [[Zanarini2006Prediction]]`,
   pt:`Ten years on, nearly everyone had had a long break from symptoms. About half also had good work and social lives.`,
   hook:`MSAD 10 years: 93% 2-year remission, 86% 4-year remission, 50% recovery; 34% of the recovered lost it. [[Zanarini2010Recovery]]`},
  {from:.62,at:.88,k:'Year 16',t:'Long remissions last',
   txt:`By 16 years, cumulative remission was 99% for a 2-year remission and 78% for an 8-year one; recovery was 60% and 40%. The longer a remission had lasted, the less likely it was to end: recurrence was 36% after a 2-year remission but 10% after an 8-year one (comparison subjects 7% to 4%). People with BPD remitted more slowly than comparison subjects (hazard ratio 0.15 for a 2-year remission) and recurred faster (HR 6.87). [[Zanarini2012]] Rings in the icon array show people who had a recurrence after remitting.`,
   pt:`Once symptoms have stayed away for years, they usually stay away. Work and relationships remain the harder part.`,
   hook:`MSAD 16 years: 99% 2-year remission vs 60% 2-year recovery; recurrence 36% after a 2-year but 10% after an 8-year remission. [[Zanarini2012]]`},
  {from:.9,at:1,k:'Year 16 · by symptom',t:'Acute fades fast, temperamental lingers',
   txt:`MSAD separates "acute" symptoms, such as self-harm and help-seeking suicide attempts, from "temperamental" ones, such as chronic anger and profound abandonment concerns. Acute symptoms resolve faster and often drive costly care; temperamental ones resolve more slowly and track ongoing impairment. [[Zanarini2005MSAD]] By 16 years, self-harm had a 2-year remission in 97% of those who had it, chronic anger in 67%, and recurrence was 43% for self-harm against 98% for chronic anger. [[Zanarini2016Fluidity]] <span class="ev early">Early evidence</span> CLPS did not find this split: there, all criteria declined at similar rates over 10 years. [[Gunderson2011]]`,
   pt:`Risky, impulsive behaviours such as self-harm usually fade first. Feelings like anger, emptiness and loneliness often take longer. [[Zanarini2016Fluidity]]`,
   hook:`Acute (impulsive) symptoms remit fastest and recur least; temperamental (dysphoric) symptoms persist. [[Zanarini2007Subsyndromal,Zanarini2016Fluidity]]`}],
 clps:[
  {from:0,at:.02,k:'Year 0 · four US cities',t:'Who was followed',
   txt:`The Collaborative Longitudinal Personality Disorders Study (CLPS) followed treatment-seeking patients aged 18–45 from 19 hospital and outpatient settings: 175 with BPD, 312 with cluster C personality disorders and 95 with major depressive disorder and no personality disorder. [[Gunderson2011]] CLPS enrolled 668 treatment-seeking adults at four US sites in 2000. [[Gunderson2000CLPS]] Its sample was broader than MSAD's inpatients, so the two studies' numbers are not interchangeable.`,
   pt:`A second big study followed people from clinics as well as hospitals, and compared BPD with other conditions.`,
   hook:`CLPS (from 2000): 175 BPD, 312 cluster C PD, 95 MDD; 10-year follow-up. [[Gunderson2011]]`},
  {from:.1,at:.18,k:'Years 0–2',t:'Fast change for some',
   txt:`Within 6 months, 18 of 160 patients improved dramatically to 2 or fewer criteria, and only 1 had relapsed by 2 years; changes in life situation and remission of a co-occurring disorder were judged the main drivers. [[Gunderson2003Remissions]] After 2 years, 50–61% of the personality-disorder groups were below the diagnostic threshold, but only 23–38% met a stricter definition of improvement. [[Grilo2004CLPS]] The line between published points is drawn, not measured.`,
   pt:`Some people improve quickly, sometimes after a big change in their life. How much counts as "better" depends on the rule used.`,
   hook:`CLPS 2 years: 50–61% below threshold, 23–38% by a stricter rule. [[Grilo2004CLPS]]`},
  {from:.4,at:.55,k:'Year 10',t:'85% remitted, 12% relapsed',
   txt:`Over 10 years, 85% of patients with BPD remitted and 12% relapsed. Remission was slower than in major depression and only slightly slower than in other personality disorders, and relapse was less frequent and slower. [[Gunderson2011]] Social functioning, though, showed "severe and persistent impairment" with only modest improvement. [[Gunderson2011]]`,
   pt:`In this study too, most people stopped meeting the diagnosis, and few slipped back. Everyday functioning improved much less.`,
   hook:`CLPS 10 years: 85% remission, 12% relapse, social functioning still severely impaired. [[Gunderson2011]]`},
  {from:.62,at:.88,k:'Beyond year 10',t:'Traits and behaviours',
   txt:`CLPS reported to 10 years. Its authors proposed that personality disorders are hybrids of stable traits and intermittently expressed symptomatic behaviours: improvement is "possible and not uncommon", but traits change slowly. [[Skodol2005CLPS]] <span class="ev hyp">Hypothesis</span> The hybrid model is an interpretation; the stability and change it explains are observed. [[Skodol2005CLPS]]`,
   pt:`Some parts of BPD are behaviours that can stop; other parts are long-standing ways of feeling that change more slowly.`,
   hook:`Hybrid model (CLPS): stable traits + intermittent symptomatic behaviours. [[Skodol2005CLPS]]`},
  {from:.9,at:1,k:'By criterion',t:'All criteria declined together',
   txt:`Unlike MSAD, CLPS found that all BPD criteria declined at similar rates over 10 years. [[Gunderson2011]] Over the first 2 years, though, affective instability and anger were the most prevalent and least changeable criteria, while self-injury and frantic efforts to avoid abandonment changed most. [[McGlashan2005CLPS]] How fast specific symptoms change depends on the sample and the method.`,
   pt:`The two big studies agree that people get better; they differ on whether some symptoms fade faster than others.`,
   hook:`CLPS 10 years: criteria fell at similar rates; at 2 years affective instability and anger were the most stable. [[Gunderson2011,McGlashan2005CLPS]]`}]
};
inits.course=()=>{
  const svg=$('#cuSvg'),rg=$('#cuT');let study='msad',setSt=()=>{};
  const DEF=`<defs><g id="cuP"><circle cx="0" cy="1.7" r="1.7"/><path d="M-2.6 10V6Q-2.6 4 0 4Q2.6 4 2.6 6V10Z"/></g></defs>`;
  const P=(x,y,s,fill,op)=>`<use href="#cuP" transform="translate(${f1(x)} ${f1(y)}) scale(${(s/10).toFixed(3)})" style="fill:${fill}${op!=null&&op<1?';opacity:'+op.toFixed(2):''}"/>`;
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  /* rings: people who had a recurrence after a 2-year remission, from new remitters at each wave times the
     recurrence curve, scaled so that at 16 years 36% of remitters are ringed (the published figure) */
  function rings(Y){let r=0;for(let w=2;w<=Y+1e-9;w+=2){const d=cuPL(CU_D.rem2,w)-cuPL(CU_D.rem2,w-2);r+=d*cuPL(CU_D.rc2,Y-w)/100}
    let r16=0;for(let w=2;w<=16;w+=2){r16+=(cuPL(CU_D.rem2,w)-cuPL(CU_D.rem2,w-2))*cuPL(CU_D.rc2,16-w)/100}
    return r*(36*99/100)/r16}
  function draw(t){const N=vb(svg,'720 470','400 680');const ph=phaseOf(CU_STEPS[study],t);setSt(ph);const Y=cuY(t),ms=study==='msad';
    const C=N?{x:46,y:66,w:330,h:170}:{x:52,y:62,w:360,h:230};
    let s=DEF;
    s+=T(N?20:22,28,ms?'MSAD · 290 inpatients with BPD':'CLPS · 175 patients with BPD','t-big')+T(N?20:22,46,ms?'cumulative share reaching each outcome':'cumulative share remitted; CLPS reported to 10 years','t-sm');
    /* chart */
    s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="8" style="fill:var(--field)"/>`;
    for(let v=0;v<=100;v+=25){const y=C.y+C.h*(1-v/100);s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/>`+T(C.x-5,y+3,v+'%','t-xs t-end')}
    const tl=tline(C.x,C.y+C.h+10,C.w,{min:0,max:16,step:N?4:2,fmt:v=>v,label:''});s+=tl.svg+T(C.x+C.w,C.y+C.h+40,'years since baseline','t-xs t-end');
    const fK=k=>u=>{const v=cuPL(k,u*16,true);return v==null?NaN:v/100};
    const up=Y/16;
    const line=(k,col,o)=>{const f=fK(k),u0=k[0][0]/16;if(up<u0)return '';const g=u=>f(u0+(up-u0)*u)||0;
      return wave(C.x+C.w*u0,C.y,C.w*(up-u0)||.01,C.h,g,Object.assign({col},o)).svg};
    const dots=(k,col)=>k.filter(p=>p[0]>0&&p[0]<=Y+1e-6).map(p=>`<circle cx="${f1(tl.X(p[0]))}" cy="${f1(C.y+C.h*(1-p[1]/100))}" r="3.4" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`).join('');
    if(ms){
      s+=line(CU_D.oRem,'var(--muted)',{dash:true}).replace(/stroke-width:2.6/,'stroke-width:1.4;opacity:.6');
      s+=line(CU_D.oRec,'var(--muted)',{dash:true}).replace(/stroke-width:2.6/,'stroke-width:1.4;opacity:.45');
      s+=line(CU_D.rem8,'var(--mood)',{dash:true}).replace(/stroke-width:2.6/,'stroke-width:1.8');
      s+=line(CU_D.rem2,'var(--mood)',{dot:true})+dots(CU_D.rem2,'var(--mood)');
      s+=line(CU_D.rec2,'var(--accent)',{dot:true,fill:true})+dots(CU_D.rec2,'var(--accent)');
      const lab=(v,txt,col,dy=0)=>{const x=tl.X(Y),y=C.y+C.h*(1-v/100)+dy;const right=x>C.x+C.w*.62;return T(right?x-9:x+9,y+4,txt,'t-sm'+(right?' t-end':''),`fill:${col};font-weight:600`)};
      if(Y>.3){const r2=cuPL(CU_D.rem2,Y),rc=cuPL(CU_D.rec2,Y);s+=lab(r2,'remission '+Math.round(r2)+'%','var(--mood)',r2>88?16:-6)+lab(rc,'recovery '+Math.round(rc)+'%','var(--accent)',rc>r2-14?14:0);
        if(Y>=8.5){const r8=cuPL(CU_D.rem8,Y);s+=lab(r8,'8-year remission '+Math.round(r8)+'%','var(--mood)',8).replace('font-weight:600','font-weight:400')}}
      if(Y>3&&!N)s+=T(C.x+C.w-6,C.y+C.h-8,'grey dashed: other personality disorders','t-xs t-end');
    }else{
      s+=line(CU_D.rem2,'var(--muted)',{}).replace(/stroke-width:2.6/,'stroke-width:1.2;opacity:.35');
      const Yc=Math.min(Y,10),uc=Yc/16;
      if(Yc>0)s+=wave(C.x,C.y,C.w*uc||.01,C.h,u=>.85*u,{col:'var(--dx)',dash:true,dot:Y<=10}).svg;
      if(Y>=1.6){const x2=tl.X(2);s+=`<line x1="${f1(x2)}" x2="${f1(x2)}" y1="${f1(C.y+C.h*(1-.61))}" y2="${f1(C.y+C.h*(1-.50))}" style="stroke:var(--dx);stroke-width:5;stroke-linecap:round;opacity:.55"/>`+T(x2+8,C.y+C.h*(1-.56)+3,'50–61%','t-xs','fill:var(--dx)')}
      if(Y>=9.9){const x=tl.X(10),y=C.y+C.h*.15;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:var(--panel);stroke:var(--dx);stroke-width:2"/>`+T(x-9,y-8,'85% remitted by 10 years','t-sm t-end','fill:var(--dx);font-weight:600')+T(x+9,y+22,'12% relapsed','t-xs','fill:var(--storm)')}
      if(Y>10){s+=`<rect x="${f1(tl.X(10))}" y="${C.y}" width="${f1(tl.X(16)-tl.X(10))}" height="${C.h}" style="fill:var(--panel-2);opacity:.6"/>`+T((tl.X(10)+tl.X(16))/2,C.y+C.h/2+30,'not followed','t-xs t-mid')}
      if(!N)s+=T(C.x+C.w-6,C.y+C.h-8,'faint line: MSAD 2-year remission, for comparison','t-xs t-end');
    }
    const cx=tl.X(Y);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${C.y}" y2="${C.y+C.h}" style="stroke:var(--ink);stroke-width:1;opacity:.3"/>`+T(cx,C.y-6,'year '+f1(Y).replace('.0',''),'t-xs t-mid','fill:var(--ink)');
    /* icon array: 100 people */
    const G=N?{x:56,y:316,dx:29,dy:22,sz:15}:{x:448,y:70,dx:25,dy:22,sz:15};
    const rem=ms?cuPL(CU_D.rem2,Y):.85*Math.min(Y,10)/10*100,rec=ms?cuPL(CU_D.rec2,Y):0;
    const nRem=Math.round(rem),nRec=Math.round(rec),nRing=ms?Math.round(rings(Y)):Math.round(12*ramp(Y,0,10));
    s+=T(G.x-4,G.y-14,'100 PEOPLE','t-sm','fill:var(--ink);font-weight:600');
    for(let k=0;k<100;k++){const x=G.x+(k%10)*G.dx+G.dx/2,y=G.y+Math.floor(k/10)*G.dy;
      const col=k<nRec?'var(--accent)':k<nRem?'var(--mood)':'var(--storm)';s+=P(x,y,G.sz,col);
      /* ring the remitted, non-recovered people first, then the recovered */
      const ringed=nRing>0&&k<nRem&&k>=nRem-nRing;
      if(ringed)s+=`<circle cx="${f1(x)}" cy="${f1(y+7.5)}" r="10.5" style="fill:none;stroke:var(--storm);stroke-width:1.4;opacity:.9"/>`}
    const ly=G.y+10*G.dy+(N?8:10);
    const leg=ms?[['var(--storm)',`still meets criteria ${100-nRem}`],['var(--mood)',`remitted ${nRem-nRec}`],['var(--accent)',`recovered ${nRec}`]]:[['var(--storm)',`still meets criteria ${100-nRem}`],['var(--mood)',`remitted ${nRem}`]];
    leg.forEach(([c,l],i)=>{const lx=G.x+(N?(i%2)*150:0),yy=ly+(N?Math.floor(i/2)*15:i*15);s+=`<rect x="${f1(lx)}" y="${f1(yy-8)}" width="9" height="9" rx="2" style="fill:${c}"/>`+T(lx+13,yy,l,'t-xs')});
    const ry=ly+(N?(leg.length>2?30:15):leg.length*15);s+=`<circle cx="${f1(G.x+4)}" cy="${f1(ry-4)}" r="5" style="fill:none;stroke:var(--storm);stroke-width:1.4"/>`+T(G.x+13,ry,ms?`ringed: had a recurrence after remitting ${nRing}`:`ringed: relapsed ${nRing}`,'t-xs');
    /* acute vs temperamental bars */
    const B=N?{x:20,y:600,w:360}:{x:22,y:384,w:676};
    s+=T(B.x,B.y,ms?'SYMPTOMS STILL PRESENT':'BY CRITERION (CLPS)','t-sm','fill:var(--ink);font-weight:600')+(ms?T(B.x+(N?0:186),B.y+(N?14:0),'mean of the 2-year remission rates, scaled to the 16-year values','t-xs'):'');
    const acute=(97+99)/2,temp=(72+71+67+62)/4,sh=ms?cuPL(CU_D.rem2,Y)/99:Math.min(Y,10)/10;
    const bars=ms?[['Acute (self-harm, suicide attempts)',100-acute*sh,'var(--storm)'],['Temperamental (anger, emptiness, anxiety, depression)',100-temp*sh,'var(--mood)']]:[['Acute criteria',100-60*sh,'var(--storm)'],['Temperamental criteria',100-60*sh,'var(--mood)']];
    const bx=B.x+(N?0:312),bw=N?B.w-40:B.w-352;
    if(ms)bars.forEach(([l,v,c],i)=>{const y=B.y+(N?28:16)+i*(N?34:30);
      s+=T(B.x,y+(N?0:12),l,'t-xs','fill:var(--ink)');
      const yb=N?y+5:y;s+=`<rect x="${f1(bx)}" y="${f1(yb)}" width="${f1(bw)}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(bx)}" y="${f1(yb)}" width="${f1(bw*v/100)}" height="14" rx="4" style="fill:${c}"/>`+T(bx+bw*v/100+6,yb+11,Math.round(v)+'%','t-xs','fill:var(--ink)')});
    if(!ms){const L2=['All BPD criteria declined at similar rates over 10 years.','At 2 years, affective instability and anger were the least changeable.'];L2.forEach((l,i)=>{s+=T(B.x,B.y+(N?34:24)+i*15,l,'t-xs','fill:var(--ink)')})}
    svg.innerHTML=s;
    $('#cuNote').innerHTML=noteHTML(CU_STEPS[study][ph]);
    $('#cuRead').innerHTML=ms?`<span>year <b>${f1(Y)}</b></span><span>2-year remission <b>${Math.round(rem)}%</b></span><span>2-year recovery <b>${Math.round(rec)}%</b></span>`:`<span>year <b>${f1(Y)}</b></span><span>remitted <b>${Y<=10?'drawn':'85%'}</b> (published at 10 years)</span><span>relapsed by 10 years <b>12%</b></span>`}
  const stop=playWire(rg,$('#cuPlay'),draw,22000,'%t:player.replay%','course');
  function wire(){const old=$('#cuSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,CU_STEPS[study],rg,draw,stop)}
  wire();
  $$('[data-cuc]').forEach(b=>b.addEventListener('click',()=>{study=b.dataset.cuc;$$('[data-cuc]').forEach(x=>x.setAttribute('aria-pressed',x===b));stop();wire();draw(+rg.value)}));
  draw(+rg.value);

  /* ---- the symptom remission race ---- */
  const rs=$('#cuRace'),rr=$('#cuRaceT');let rm='r2';
  const RACE_NOTE={
   r2:{k:'2-year remission · by 16 years',t:'Self-harm fades, dysphoria lingers',txt:`Each bar is the share of people who had the symptom at baseline and had not yet had a 2-year remission from it. By 16 years, 2-year remission ranged from 62% to 100% across the 24 symptoms (median 93%). [[Zanarini2016Fluidity]]`,pt:`The behaviours most likely to bring someone to hospital are the ones most likely to stop.`,hook:`By 16 years: self-harm 97%, help-seeking suicide attempts 99%, chronic anger 67%, chronic anxiety 62% (2-year remission). [[Zanarini2016Fluidity]]`},
   r4:{k:'4-year remission · by 16 years',t:'A stricter test widens the gap',txt:`Requiring the symptom to stay away for 4 years separates the groups further: self-harm still reached 91%, but chronic anger 38% and chronic anxiety 34%. Four-year remission ranged from 34% to 100% (median 74%). Bars marked "not reported" have no 4-year figure in this guide's sources. [[Zanarini2016Fluidity]]`,pt:`Feelings like anger and anxiety often come and go for years, even when the dangerous behaviours have stopped.`,hook:`4-year remission by 16 years: self-harm 91% vs chronic anger 38%. [[Zanarini2016Fluidity]]`},
   rc:{k:'Recurrence after a 2-year remission',t:'Fluid, not fixed',txt:`Here the bars grow: the share who had the symptom come back after a 2-year remission. Recurrence was lowest for impulsive symptoms (self-harm 43%, help-seeking suicide attempts 55%) and highest for temperamental ones (chronic anger 98%, chronic anxiety 93%, loneliness and emptiness 90%); the median across all 24 symptoms was 75%. The authors call BPD symptoms fluid, with the urgent acute ones carrying a better prognosis. [[Zanarini2016Fluidity]]`,pt:`Symptoms can come and go. A return of anger or emptiness is common and does not mean starting again from zero.`,hook:`Recurrence after remission: self-harm 43% vs chronic anger 98% (median 75%). [[Zanarini2016Fluidity]]`}};
  function drawR(t){const N=vb(rs,'720 360','400 560'),Y=16*t;let s='';
    const L=N?{x:20,lw:0,bx:20,bw:300,y:58,dy:60}:{x:22,lw:230,bx:262,bw:380,y:56,dy:36};
    s+=T(L.x,24,{r2:'Still without a 2-year remission',r4:'Still without a 4-year remission',rc:'Came back after a 2-year remission'}[rm],'t-big')+T(L.x,42,`year ${f1(Y)} of 16`,'t-sm');
    const sh=rm==='rc'?cuPL(CU_D.rc2,Math.min(14,Y*14/16))/36:rm==='r4'?(Y<4?0:cuPL(CU_D.rem2,Y-2)/cuPL(CU_D.rem2,14)):cuPL(CU_D.rem2,Y)/99;
    CU_SYM.forEach(([nm,g,v2,v4,vr],i)=>{const v=rm==='r2'?v2:rm==='r4'?v4:vr,y=L.y+i*L.dy;const col=g==='a'?'var(--storm)':g==='t'?'var(--mood)':'var(--dx)';
      s+=T(N?L.x:L.x+L.lw-8,N?y:y+12,nm,'t-sm'+(N?'':' t-end'),'fill:var(--ink)');
      const by=N?y+8:y;
      s+=`<rect x="${L.bx}" y="${f1(by)}" width="${L.bw}" height="16" rx="4" style="fill:var(--panel-2)"/>`;
      if(v==null){s+=T(L.bx+8,by+12,'not reported','t-xs');return}
      const val=rm==='rc'?v*sh:100-v*sh;
      s+=`<rect x="${L.bx}" y="${f1(by)}" width="${f1(L.bw*val/100)}" height="16" rx="4" style="fill:${col}"/>`+T(L.bx+L.bw*val/100+6,by+12,Math.round(val)+'%','t-xs','fill:var(--ink);font-weight:600')});
    const ly=N?L.y+8*L.dy+6:L.y+8*L.dy+12;
    [['var(--storm)','acute (impulsive)'],['var(--mood)','temperamental'],['var(--dx)','not grouped here']].forEach(([c,l],i)=>{const lx=(N?L.x:L.bx)+i*(N?120:130);s+=`<rect x="${lx}" y="${ly-8}" width="9" height="9" rx="2" style="fill:${c}"/>`+T(lx+13,ly,l,'t-xs')});
    rs.innerHTML=s;$('#cuRaceNote').innerHTML=noteHTML(RACE_NOTE[rm])}
  playWire(rr,$('#cuRacePlay'),drawR,9000,'%t:player.replay%','course');
  $$('[data-cur]').forEach(b=>b.addEventListener('click',()=>{rm=b.dataset.cur;$$('[data-cur]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawR(+rr.value)}));
  drawR(+rr.value);
};
