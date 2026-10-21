/* =============== 2.1 prodrome: before the tremor =============== */
/* The clock runs from 20 years before diagnosis (t=0) to 5 years after (t=1). */
const PRD_Y0=-20,PRD_Y1=5,PRD_yOf=t=>PRD_Y0+(PRD_Y1-PRD_Y0)*t;
const PRD_fy=y=>(y>0?'+':y<0?'−':'')+Math.abs(Math.round(y));
/* cohort view: onset years (lo..hi) are the cited estimates; the shape inside each lane is schematic */
const PRD_LANES=[
 {n:'Smell loss',s:'starts more than 20 y before',c:'var(--sage)',lo:-24,hi:-24},
 {n:'Constipation',s:'10–16 y before',c:'var(--glia)',lo:-16,hi:-10},
 {n:'Colour vision, erectile',s:'10–16 y before',c:'var(--vessel)',lo:-16,hi:-10},
 {n:'Acting out dreams (RBD)',s:'median 8 y after sleep study',c:'var(--rose)',lo:-8,hi:-8},
 {n:'Bladder, subtle thinking',s:'7–9 y before',c:'var(--violet)',lo:-9,hi:-7},
 {n:'Low mood',s:'raised in records 5 y before',c:'var(--violet)',lo:-5,hi:-5,dash:'5 3'},
 {n:'Dopamine terminals',s:'about 5 y of hidden cell loss',c:'var(--amber)',lo:-5,hi:-5},
 {n:'Subtle motor signs',s:'5–7 y; then rigidity, tremor',c:'var(--ink)',lo:-7,hi:-5,ticks:[[-5.5,'B'],[-3,'R'],[-2,'T']]},
 {n:'Diagnosis',s:'motor parkinsonism',c:'var(--bad)',lo:0,hi:0,dx:1}];
const PRD_val=(L,y)=>L.dx?(y>=0?1:0):y<L.lo?0:.85*Math.pow(clamp((y-L.lo)/(0-L.lo)),1.25)+.15*ramp(y,0,5);
/* records view: relative risk in people later diagnosed against controls, at 10 and 5 years before (Schrag 2015) */
const PRD_REC=[
 {n:'Tremor',c:'var(--ink)',r10:7.59,r5:13.70},
 {n:'Constipation',c:'var(--glia)',r10:2.01,r5:2.24},
 {n:'Low blood pressure',c:'var(--vessel)',r5:3.23},
 {n:'Balance problems',c:'var(--ink)',r5:2.19},
 {n:'Dizziness',c:'var(--vessel)',r5:1.99},
 {n:'Urinary problems',c:'var(--violet)',r5:1.96},
 {n:'Depression',c:'var(--violet)',r5:1.76},
 {n:'Erectile dysfunction',c:'var(--vessel)',r5:1.30}];
const PRD_STEPS=[
 {from:0,at:.04,t:'More than 20 years before',
  coh:{k:'Cohort · −20 years and earlier',txt:`In a prospective cohort of 154 people with isolated REM sleep behaviour disorder (RBD), 55 of whom developed a neurodegenerative disease, each marker was timed backwards from diagnosis. Olfactory loss was predicted to start more than 20 years before. [[Fereshtehnejad2019]] At diagnosis, 96.7% of 400 people with Parkinson's had measurable smell loss against young norms, or 74.5% after adjusting for age. [[Haehner2009]]`,
   pt:`The sense of smell can fade decades before any movement problem, often without the person noticing.`,
   hook:`Smell loss is the earliest marker on this timeline. Olfactory loss carries an LR of 6.4 in the 2019 prodromal criteria. [[Fereshtehnejad2019,Heinzel2019]]`},
  rec:{k:'Records · −20 years',txt:`The primary-care study compared the records of 8,166 people with Parkinson's with 46,755 controls and reported risks at 10 and 5 years before diagnosis, so it shows nothing this early. [[Schrag2015]]`,
   pt:`Family-doctor records only show what people mention and doctors write down, and this study looked back 10 years.`}},
 {from:.2,at:.28,t:'Gut and autonomic changes',
  coh:{k:'Cohort · −16 to −10 years',txt:`In the same cohort, impaired colour vision, constipation and erectile dysfunction were estimated to start 10 to 16 years before diagnosis. [[Fereshtehnejad2019]] A meta-analysis of 9 studies (741,593 people) found constipation raised the odds of later Parkinson's (OR 2.27), and still did (OR 2.13) when it was recorded more than 10 years before diagnosis. [[AdamsCarr2016]]`,
   pt:`Long-standing constipation is more common in people who later develop Parkinson's, but most people with constipation never do.`,
   hook:`Constipation: OR 2.27 overall and 2.13 more than 10 years ahead; LR 2.5 in the prodromal criteria. [[AdamsCarr2016,Heinzel2019]]`},
  rec:{k:'Records · −10 years',txt:`Ten years before diagnosis, the records of people later diagnosed already showed more tremor (relative risk 7.59) and more constipation (2.01) than those of controls. [[Schrag2015]]`,
   pt:`A decade before diagnosis, some people were already telling their doctor about a tremor or constipation.`,
   hook:`Records at −10 years: tremor RR 7.59, constipation RR 2.01. [[Schrag2015]]`}},
 {from:.4,at:.46,t:'Acting out dreams',
  coh:{k:'Cohort · about −8 years',txt:`People with REM sleep behaviour disorder act out their dreams. Among 1,280 people whose RBD was confirmed by a sleep study (polysomnography), the median time to an overt neurodegenerative disease was 8.0 years. [[Postuma2019RBD]] RBD on polysomnography has the highest LR of any prodromal marker: 130. [[Heinzel2019]] The lower chart follows that cohort year by year.`,
   pt:`Shouting, punching or kicking in a dream can be an early sign. Not everyone with it develops Parkinson's.`,
   hook:`Isolated RBD: about 6.25% convert each year, with a median of 8 years to conversion. [[Postuma2019RBD]]`},
  rec:{k:'Records · −8 years',txt:`No RBD figure from the records study is in the sources used here, so this lane has no records counterpart. Its 10-year and 5-year figures carry the story. [[Schrag2015]]`,
   pt:`Sleep behaviour rarely shows up in this kind of record-based analysis.`}},
 {from:.52,at:.56,t:'Bladder, thinking and mood',
  coh:{k:'Cohort · −9 to −5 years',txt:`Urinary dysfunction and subtle cognitive decline were estimated to start 7 to 9 years before diagnosis. [[Fereshtehnejad2019]] Low mood belongs here too: depression was more common in family-doctor records 5 years before diagnosis (relative risk 1.76), and a meta-analysis notes that anxiety, depression and constipation may be early features of the disease rather than causes. [[Schrag2015,Noyce2012]]`,
   pt:`Several common problems, such as needing the toilet more or feeling low, can be part of the early picture. On their own they say very little.`,
   hook:`Depression with or without anxiety: LR 1.6. Weak markers move the odds only a little. [[Heinzel2019]]`},
  rec:{k:'Records · −5 years',txt:`Five years before diagnosis, the records showed raised relative risks for low blood pressure (3.23), constipation (2.24), balance problems (2.19), dizziness (1.99), urinary dysfunction (1.96), depression (1.76) and erectile dysfunction (1.30). [[Schrag2015]]`,
   pt:`In the last five years before diagnosis, people visited their doctor more often with a mix of small problems.`,
   hook:`Records at −5 years: tremor 13.70, then low blood pressure 3.23, constipation 2.24. [[Schrag2015]]`}},
 {from:.6,at:.64,t:'Scans change, subtle motor signs',
  coh:{k:'Cohort · −7 to −2 years',txt:`Changes on the motor examination were estimated to appear 5 to 7 years before diagnosis: bradykinesia about 5 to 6 years, rigidity about 3 years and tremor about 2 years before (B, R and T in the lane). [[Fereshtehnejad2019]] Under the surface, Fearnley and Lees estimated a presymptomatic phase of about 5 years from the onset of nigral cell loss. [[Fearnley1991]] A clearly abnormal dopamine transporter scan has an LR of 43.3. [[Heinzel2019]]`,
   pt:`Before anyone would call it Parkinson's, an examiner may find slightly slower or stiffer movements, and a scan may already show fewer dopamine terminals.`,
   hook:`Order of the cardinal signs in this cohort: bradykinesia (about −5 to −6 y), then rigidity (−3), then tremor (−2). [[Fereshtehnejad2019]]`},
  rec:{k:'Records · −5 years',txt:`Tremor had by far the highest relative risk 5 years before diagnosis, 13.70, and balance problems were raised too (2.19). [[Schrag2015]]`,
   pt:`A tremor was the symptom most clearly linked to a later diagnosis.`}},
 {from:.74,at:.8,t:'Diagnosis',
  coh:{k:'Year 0 · diagnosis',txt:`Diagnosis needs motor parkinsonism: bradykinesia with rest tremor, rigidity or both. [[Postuma2015]] By then, imaging estimates put the loss of putaminal dopamine terminals at 50 to 70% with dopamine transporter ligands, while only about 30% of nigral neurons may be lost. [[Cheng2010]] See <a href="#dx" data-go="dx">Diagnosis and the MDS criteria</a>.`,
   pt:`By the time the movement signs are clear enough for a diagnosis, the disease has usually been present for years.`,
   hook:`At diagnosis: about 50 to 60% of putaminal terminals but only about 30% of nigral neurons lost, the "axons first" argument. [[Cheng2010]]`},
  rec:{k:'Year 0 · diagnosis',txt:`The records study was built around the date of diagnosis, comparing 8,166 people with Parkinson's with 46,755 controls. [[Schrag2015]] The diagnosis itself rests on the clinical criteria: see <a href="#dx" data-go="dx">Diagnosis and the MDS criteria</a>. [[Postuma2015]]`,
   pt:`The years of small complaints before diagnosis are easy to see only in hindsight.`}},
 {from:.9,at:.97,t:'After diagnosis',
  coh:{k:'+1 to +5 years',txt:`After diagnosis the terminals keep going: in 28 brains, dorsal putamen dopamine markers were virtually gone from 4 years after diagnosis. [[Kordower2013]] Reading the chart: the onset years are estimates from a cohort of people with RBD, timed backwards, and from the other studies named in each lane. The curve shapes are schematic, and not every person has every marker: after adjusting for age, about a quarter of people with Parkinson's in one study had normal smell. [[Fereshtehnejad2019,Haehner2009]]`,
   pt:`The years and numbers are measurements or estimates; the smooth shapes are a sketch of the order.`},
  rec:{k:'Reading the chart',txt:`Measured: each relative risk, at 10 or 5 years before diagnosis. Not shown: anything before 10 years, which this study did not report. A relative risk compares groups; it does not say how many people with a symptom will develop Parkinson's. [[Schrag2015]]`,
   pt:`A raised relative risk means a symptom was more common in people later diagnosed. Most people with these symptoms never develop Parkinson's.`}}];
/* RBD conversion: Kaplan-Meier estimates (Postuma 2019) */
const PRD_KM=[[0,0],[2,10.6],[3,17.9],[5,31.3],[8,51.4],[10,60.2],[12,73.5]];
const PRD_km=y=>{for(let i=1;i<PRD_KM.length;i++){const[a,pa]=PRD_KM[i-1],[b,pb]=PRD_KM[i];if(y<=b)return lerp(pa,pb,(y-a)/(b-a))}return 73.5};
/* the 74 people who convert by 12 years, split as the 352 converters were: 52% parkinsonism, 4.5% MSA, 43.5% dementia first */
const PRD_KIND=(()=>{const a=[...Array(38).fill('p'),...Array(3).fill('m'),...Array(33).fill('d')],r=rng(11);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
const PRD_KC={p:['var(--amber)','parkinsonism first'],m:['var(--rose)','probable MSA'],d:['var(--violet)','dementia first']};
/* prodromal calculator: MDS 2019 update (Heinzel 2019) */
const PRD_AGE=[['50–54',.4],['55–59',.75],['60–64',1.25],['65–69',2],['70–74',2.5],['75–79',3.5],['80+',4]];
const PRD_MK=[
 {g:'p',id:'rbd',n:'REM sleep behaviour disorder on polysomnography',sn:'RBD, sleep study',pos:130,neg:.65},
 {g:'p',id:'rbdq',n:'Possible RBD on a questionnaire',sn:'RBD, questionnaire',pos:2.8,neg:.89,over:'rbd'},
 {g:'p',id:'dat',n:'Clearly abnormal dopaminergic PET or SPECT',sn:'abnormal DaT/PET',pos:43.3,neg:.66,d:'for example below 65% of normal, or 2 SD below the mean'},
 {g:'p',id:'sub',n:'Subthreshold parkinsonism',sn:'subthreshold parkinsonism',pos:9.6,neg:.55,d:'UPDRS-III above 3 excluding action tremor, or MDS-UPDRS-III above 6 excluding postural and action tremor'},
 {g:'p',id:'qmt',n:'Abnormal quantitative motor testing',sn:'quantitative motor test',pos:3.5,neg:.60},
 {g:'p',id:'olf',n:'Olfactory loss',sn:'smell loss',pos:6.4,neg:.40},
 {g:'p',id:'con',n:'Constipation',sn:'constipation',pos:2.5,neg:.82},
 {g:'p',id:'eds',n:'Excessive daytime somnolence',sn:'daytime sleepiness',pos:2.7,neg:.86},
 {g:'p',id:'noh',n:'Neurogenic orthostatic hypotension',sn:'neurogenic OH',pos:18.5,neg:.88},
 {g:'p',id:'soh',n:'Symptomatic orthostatic hypotension',sn:'symptomatic OH',pos:3.2,neg:.80,over:'noh'},
 {g:'p',id:'ed',n:'Erectile dysfunction',sn:'erectile dysfunction',pos:3.4,neg:.87,sex:'m',d:'men only'},
 {g:'p',id:'uri',n:'Urinary dysfunction',sn:'urinary dysfunction',pos:2,neg:.90},
 {g:'p',id:'dep',n:'Depression, with or without anxiety',sn:'depression',pos:1.6,neg:.88},
 {g:'p',id:'cog',n:'Global cognitive deficit',sn:'cognitive deficit',pos:1.8,neg:.88},
 {g:'r',id:'pest',n:'Regular pesticide exposure',sn:'pesticides',pos:1.5},
 {g:'r',id:'solv',n:'Occupational solvent exposure',sn:'solvents',pos:1.5},
 {g:'r',id:'caf',n:'Does not use caffeine',sn:'no caffeine',pos:1.35,neg:.88,nl:'Uses it'},
 {g:'r',id:'smk',n:'Smoking',sn:'smoking',pos:1.2,neg:.51,yl:'Never',nl:'Current',d:'a former-smoker value is not in the source used here, so it is left at 1'},
 {g:'r',id:'fam',n:'First-degree relative with Parkinson\'s',sn:'relative with PD',pos:2.5},
 {g:'r',id:'snh',n:'Substantia nigra hyperechogenicity on ultrasound',sn:'nigral ultrasound',pos:3.4,neg:.38},
 {g:'r',id:'dm',n:'Type 2 diabetes',sn:'type 2 diabetes',pos:1.5,neg:.97},
 {g:'r',id:'ina',n:'Physical inactivity',sn:'inactivity',pos:1.3,neg:.91},
 {g:'r',id:'ura',n:'Low plasma urate',sn:'low urate',pos:1.8,neg:.88,sex:'m',d:'men only'},
 {g:'r',id:'prs',n:'Polygenic risk score',sn:'polygenic score',pos:1.57,neg:.45,yl:'Top 25%',nl:'Bottom 25%'}];
const PRD_PRE=[
 ['Man, 65, RBD on a sleep study',3,'m',{rbd:1}],
 ['The same man, with smell loss',3,'m',{rbd:1,olf:1}],
 ['Man, 77, RBD on a sleep study',5,'m',{rbd:1}],
 ['Woman, 62, constipation and low mood',2,'f',{con:1,dep:1}],
 ['Man, 72, four markers normal',4,'m',{rbd:-1,olf:-1,dat:-1,sub:-1}],
 ['Clear all',3,'m',{}]];
const PRD_lr=v=>v>=100?Math.round(v):+v.toFixed(2);

inits.prodrome=()=>{
  /* ---------- 1. the prodromal clock ---------- */
  const svg=$('#prdSvg'),rg=$('#prdT');let rec=false,lastN='';
  function draw(t){
    const C=rec?PRD_REC:PRD_LANES,n=C.length;
    const N=vb(svg,rec?'720 364':'720 400',rec?'400 520':'400 580');
    const L=N?{x0:16,x1:388,top:58,lh:rec?50:52,tk:30}:{x0:206,x1:700,top:52,lh:rec?33:33,tk:0};
    const X=y=>lerp(L.x0,L.x1,(y-PRD_Y0)/(PRD_Y1-PRD_Y0)),yr=PRD_yOf(t),xt=X(yr);
    const yAx=L.top+n*L.lh+6;
    let s=`<defs><pattern id="prdHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 V6" style="stroke:var(--line);stroke-width:2"/></pattern></defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${N?16:12}" y="22" class="t-sm" style="fill:var(--ink)">${rec?(N?'RELATIVE RISK IN GP RECORDS':'RELATIVE RISK IN PRIMARY-CARE RECORDS · MEASURED'):(N?'WHEN EACH FEATURE BEGINS':'WHEN EACH FEATURE BEGINS · ONSETS CITED, SHAPES SCHEMATIC')}</text>`;
    // year grid
    for(let y=-20;y<=5;y+=5){const x=X(y);s+=`<path d="M${f1(x)} ${L.top-4} V${yAx}" class="grid"/><text x="${f1(x)}" y="${yAx+14}" class="t-xs t-mid" style="${y===0?'fill:var(--ink);font-weight:700':''}">${y===0?'0':PRD_fy(y)}</text>`}
    s+=`<path d="M${L.x0} ${yAx} H${L.x1}" class="axis" style="stroke:var(--muted)"/><text x="${(L.x0+L.x1)/2}" y="${yAx+30}" class="t-xs t-mid">${N?'years from diagnosis':'years from diagnosis (0 = motor diagnosis)'}</text>`;
    if(rec)s+=`<rect x="${L.x0}" y="${L.top-4}" width="${f1(X(-10)-L.x0)}" height="${yAx-L.top+4}" style="fill:url(#prdHatch);opacity:.7"/><text x="${f1((L.x0+X(-10))/2)}" y="${L.top+n*L.lh/2}" class="t-xs t-mid" style="fill:var(--ink)">not reported</text>`;
    // diagnosis line
    s+=`<path d="M${f1(X(0))} ${L.top-4} V${yAx}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    C.forEach((c,i)=>{
      const y0=L.top+i*L.lh,yc=N?y0+L.tk:y0+L.lh/2,h=N?18:20,yb=yc+h/2;
      // labels
      if(N){s+=`<text x="16" y="${y0+14}" class="t-lbl" style="font-size:12px">${c.n}</text>`;
        if(!rec)s+=`<text x="388" y="${y0+14}" class="t-xs t-end">${c.s}</text>`}
      else{s+=`<text x="12" y="${f1(yc-(rec?0:2))}" class="t-lbl" style="font-size:12.5px">${c.n}</text>`;if(!rec)s+=`<text x="12" y="${f1(yc+11)}" class="t-xs">${c.s}</text>`}
      s+=`<rect x="${L.x0}" y="${f1(yc-h/2)}" width="${L.x1-L.x0}" height="${h}" rx="5" style="fill:var(--panel);opacity:.9"/>`;
      if(!rec){
        const lo=Math.max(c.lo,PRD_Y0),fn=y=>PRD_val(c,y);
        if(c.hi>c.lo)s+=`<rect x="${f1(X(c.lo))}" y="${f1(yc-h/2)}" width="${f1(X(c.hi)-X(c.lo))}" height="${h}" rx="4" style="fill:${c.c};opacity:.13"/>`;
        const area=(y1)=>{let d=`M${f1(X(lo))} ${f1(yb)}`;const K=Math.max(2,Math.round((y1-lo)*3));for(let k=0;k<=K;k++){const y=lerp(lo,y1,k/K);d+=` L${f1(X(y))} ${f1(yb-h*fn(y))}`}return d+` L${f1(X(y1))} ${f1(yb)}Z`};
        if(!c.dx){s+=`<path d="${area(PRD_Y1)}" style="fill:${c.c};opacity:.1"/>`;if(yr>lo)s+=`<path d="${area(Math.min(yr,PRD_Y1))}" style="fill:${c.c};opacity:.32;stroke:${c.c};stroke-width:1.6;stroke-dasharray:${c.dash||'none'}"/>`}
        const on=yr>=c.lo;
        if(c.lo<PRD_Y0)s+=`<path d="M${L.x0+12} ${f1(yc-5)} l-9 5 l9 5" style="fill:none;stroke:${c.c};stroke-width:2.2;opacity:${on?1:.4}"/><text x="${L.x0+16}" y="${f1(yc+3.5)}" class="t-xs" style="fill:var(--ink)">earlier than −20</text>`;
        else if(c.dx)s+=`<circle cx="${f1(X(0))}" cy="${f1(yc)}" r="${on?8:6}" style="fill:${on?c.c:'var(--panel)'};stroke:${c.c};stroke-width:2"/>`+(on?`<text x="${f1(X(0)+13)}" y="${f1(yc+4)}" class="t-xs" style="fill:var(--ink);font-weight:700">diagnosed</text>`:'');
        else s+=`<circle cx="${f1(X(c.lo))}" cy="${f1(yc)}" r="${on?6:4.5}" style="fill:${on?c.c:'var(--panel)'};stroke:${c.c};stroke-width:2;opacity:${on?1:.6}"/>`;
        (c.ticks||[]).forEach(([y,l])=>{const x=X(y),o=yr>=y;s+=`<path d="M${f1(x)} ${f1(yc-h/2)} v${h}" style="stroke:var(--ink);stroke-width:${o?2:1};opacity:${o?1:.35}"/><text x="${f1(x+3)}" y="${f1(yc-h/2+8)}" class="t-xs" style="fill:var(--ink);opacity:${o?1:.45}">${l}</text>`});
        if(c.c==='var(--amber)'&&yr>=0)s+=`<text x="${f1(X(0)+5)}" y="${f1(yc+(N?-12:3))}" class="t-xs" style="fill:var(--amber)">${N?'':'50–70% terminals lost'}</text>`;
      }else{
        const R=v=>3+3.2*Math.log(v),pts=[];if(c.r10)pts.push([-10,c.r10]);pts.push([-5,c.r5]);
        if(pts.length>1&&yr>=-5)s+=`<path d="M${f1(X(-10))} ${f1(yc)} H${f1(X(-5))}" style="stroke:${c.c};stroke-width:2;opacity:.5"/>`;
        pts.forEach(([y,v])=>{const on=yr>=y,r=Math.min(R(v),N?9:10.5);
          s+=`<circle cx="${f1(X(y))}" cy="${f1(yc)}" r="${f1(on?r:3)}" style="fill:${on?c.c:'var(--panel)'};stroke:${c.c};stroke-width:1.6;opacity:${on?.9:.5}"/>`;
          if(on)s+=`<text x="${f1(X(y)+r+4)}" y="${f1(yc+3.5)}" class="t-xs" style="fill:var(--ink);font-weight:700">RR ${v.toFixed(2)}</text>`});
      }
    });
    // playhead
    s+=`<path d="M${f1(xt)} ${L.top-8} V${yAx}" style="stroke:var(--ink);stroke-width:1.5"/><text x="${f1(clamp(xt,L.x0+34,L.x1-34))}" y="${L.top-12}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">now ${yr>=0?'+':'−'}${f1(Math.abs(yr))} y</text>`;
    svg.innerHTML=s;
    const p=phaseOf(PRD_STEPS,t);setSt(p);
    const S={...PRD_STEPS[p][rec?'rec':'coh'],t:PRD_STEPS[p].t};
    let rd;
    if(!rec){const on=PRD_LANES.filter(c=>!c.dx&&yr>=c.lo).map(c=>c.n.toLowerCase().replace(' (rbd)',''));
      rd=`Clock <b>${yr>=0?'+':'−'}${f1(Math.abs(yr))} years</b> · Begun by now (estimates): <b>${on.length?on.join(', '):'nothing yet'}</b>${yr>=0?' · <b>diagnosed</b>':''}`}
    else{const on=[];PRD_REC.forEach(c=>{if(c.r10&&yr>=-10&&yr<-5)on.push(c.n.toLowerCase()+' '+c.r10);else if(yr>=-5)on.push(c.n.toLowerCase()+' '+c.r5)});
      rd=`Clock <b>${yr>=0?'+':'−'}${f1(Math.abs(yr))} years</b> · Raised in records: <b>${on.length?on.join(', '):'nothing reported this early'}</b>`}
    $('#prdRead').innerHTML=rd;
    const html=noteHTML(S);if(html!==lastN){$('#prdNote').innerHTML=html;lastN=html}
    $('#prdCap').textContent=rec?'Measured: each relative risk (people later diagnosed against controls, UK primary-care records). Bubble size grows with the relative risk. Years before 10 were not reported.':'Cited: the onset years written in each lane (shaded band = range of the estimate). Schematic: the rising shape inside each lane. Most onsets come from people with RBD followed until diagnosis, so they may not fit everyone.';
  }
  const stop=playWire(rg,$('#prdPlay'),draw,20000,'Replay','prodrome');
  const setSt=stepWire($('#prdSteps'),PRD_STEPS,rg,draw,stop);
  const setRec=v=>{rec=v;$('#prdCoh').setAttribute('aria-pressed',!v);$('#prdRec').setAttribute('aria-pressed',v);lastN='';draw(+rg.value)};
  $('#prdCoh').onclick=()=>setRec(false);$('#prdRec').onclick=()=>setRec(true);

  /* ---------- 2. RBD conversion ---------- */
  const rs=$('#prdRbd'),rr=$('#prdRbdT');let kind=false;
  function drawR(t){
    const N=vb(rs,'720 330','400 624'),yrs=12*t,km=PRD_km(yrs),cn=Math.round(km);
    const L=N?{x0:46,x1:384,yT:44,yB:244,tk:262,tt:278,gx:47,gy:318,gs:34,gr:25,lg:[[24,582],[220,582],[24,602]],hd:22}
             :{x0:62,x1:400,yT:44,yB:250,tk:268,tt:286,gx:456,gy:58,gs:25,gr:24,lg:[[446,302],[600,302],[446,320]],hd:22};
    const X=y=>lerp(L.x0,L.x1,y/12),V=p=>lerp(L.yB,L.yT,p/100);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${L.x0-30}" y="${L.hd}" class="t-sm" style="fill:var(--ink)">CONVERTED TO A NEURODEGENERATIVE DISEASE</text>`;
    [0,20,40,60,80,100].forEach(p=>{s+=`<path d="M${L.x0} ${f1(V(p))} H${L.x1}" class="grid"/><text x="${L.x0-6}" y="${f1(V(p)+3)}" class="t-xs t-end">${p}%</text>`});
    [0,2,4,6,8,10,12].forEach(y=>{s+=`<text x="${f1(X(y))}" y="${L.tk}" class="t-xs t-mid">${y}</text>`});
    s+=`<text x="${(L.x0+L.x1)/2}" y="${L.tt}" class="t-xs t-mid">years since RBD was confirmed by a sleep study</text>`;
    // median line
    s+=`<path d="M${f1(X(8))} ${f1(V(50))} H${L.x0}" style="stroke:var(--muted);stroke-dasharray:3 3"/><path d="M${f1(X(8))} ${f1(V(50))} V${L.yB}" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${f1(X(8)+4)}" y="${f1(V(50)+14)}" class="t-xs">median 8.0 y</text>`;
    let full='',part='';PRD_KM.forEach(([y,p],i)=>{full+=(i?'L':'M')+f1(X(y))+' '+f1(V(p))});
    const K=60;for(let k=0;k<=K;k++){const y=yrs*k/K;part+=(k?'L':'M')+f1(X(y))+' '+f1(V(PRD_km(y)))}
    s+=`<path d="${full}" style="fill:none;stroke:var(--rose);stroke-width:2.4;opacity:.2"/>`;
    if(yrs>.02)s+=`<path d="${part}" style="fill:none;stroke:var(--rose);stroke-width:3;stroke-linejoin:round"/>`;
    PRD_KM.slice(1).forEach(([y,p])=>{const on=yrs>=y-1e-6;s+=`<circle cx="${f1(X(y))}" cy="${f1(V(p))}" r="${on?5:3.5}" style="fill:${on?'var(--rose)':'var(--panel)'};stroke:var(--rose);stroke-width:1.6"/>`;
      if(on)s+=`<text x="${f1(X(y)-6)}" y="${f1(V(p)-9)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">${p}%</text>`});
    s+=`<path d="M${f1(X(yrs))} ${L.yT} V${L.yB}" style="stroke:var(--ink);stroke-width:1.2"/><circle cx="${f1(X(yrs))}" cy="${f1(V(km))}" r="4" style="fill:var(--ink)"/>`;
    // 100 people
    s+=`<text x="${L.gx-10}" y="${L.gy-26}" class="t-sm" style="fill:var(--ink)">${cn} OF 100 CONVERTED</text>`;
    for(let i=0;i<100;i++){const x=L.gx+(i%10)*L.gs,y=L.gy+Math.floor(i/10)*L.gr,on=i<cn,k=PRD_KIND[i];
      const col=on?(kind?PRD_KC[k][0]:'var(--rose)'):'var(--line)';
      s+=`<g style="opacity:${on?1:.8}"><circle cx="${x}" cy="${y-7}" r="3.6" style="fill:${col}"/><path d="M${x-4.5} ${y+6} v-5 a4.5 4.5 0 0 1 9 0 v5z" style="fill:${col}"/></g>`}
    if(kind){Object.keys(PRD_KC).forEach((k,j)=>{const[x,y]=L.lg[j],m=PRD_KIND.slice(0,cn).filter(z=>z===k).length;s+=`<circle cx="${x+5}" cy="${y-4}" r="5" style="fill:${PRD_KC[k][0]}"/><text x="${x+14}" y="${y}" class="t-xs" style="fill:var(--ink)">${PRD_KC[k][1]} ${m}</text>`})}
    else{const[x,y]=L.lg[0];s+=`<circle cx="${x+5}" cy="${y-4}" r="5" style="fill:var(--rose)"/><text x="${x+14}" y="${y}" class="t-xs" style="fill:var(--ink)">converted</text><circle cx="${L.lg[1][0]+5}" cy="${y-4}" r="5" style="fill:var(--line)"/><text x="${L.lg[1][0]+14}" y="${y}" class="t-xs" style="fill:var(--ink)">not yet</text>`}
    rs.innerHTML=s;
    rr.setAttribute('aria-valuetext',`${f1(yrs)} years after the sleep study: about ${cn}% converted`);
    const pk=PRD_KIND.slice(0,cn),cnt=k=>pk.filter(z=>z===k).length;
    $('#prdRbdNote').innerHTML=`<div class="kicker">Year ${f1(yrs)} · teaching scale of 100</div><h4>${cn===0?'Everyone still has isolated RBD':cn<50?`About ${cn} in 100 have converted`:`More than half have converted: ${cn} in 100`}</h4>`+
      `<p>Kaplan-Meier risk of an overt neurodegenerative syndrome was 10.6% at 2 years, 17.9% at 3, 31.3% at 5, 51.4% at 8, 60.2% at 10 and 73.5% at 12 years, an average of 6.25% a year. [[Postuma2019RBD]]</p>`+
      (kind?`<p>Of the 352 people who converted, 56.5% developed parkinsonism first (16 of them, 4.5%, probable MSA) and 43.5% dementia first. Here: ${cnt('p')} parkinsonism, ${cnt('m')} MSA, ${cnt('d')} dementia. [[Postuma2019RBD]] Dementia first usually means dementia with Lewy bodies; see <a href="#ddx" data-go="ddx">The differential</a>.</p>`
            :`<p>What raised the hazard of converting: abnormal quantitative motor testing (hazard ratio 3.16), an abnormal motor examination (3.03), smell loss (2.62), mild cognitive impairment (1.91–2.37), erectile dysfunction (2.13), an abnormal DaT scan (1.98) and constipation (1.67). Sex, depression and orthostatic symptoms did not predict it. [[Postuma2019RBD]]</p>`)+
      `<div class="pt"><b>In plain words</b>Most people whose dream enactment is confirmed by a sleep study develop Parkinson's, dementia with Lewy bodies or a related condition within about ten years, but not all, and the timing varies widely.</div>`+
      `<div class="hook"><b>Exam hook</b>Isolated RBD: 6.25%/year, 31.3% at 5, 60.2% at 10, 73.5% at 12 years. Converters: parkinsonism first 56.5%, dementia first 43.5%. [[Postuma2019RBD]]</div>`;
  }
  const stopR=playWire(rr,$('#prdRbdPlay'),drawR,12000,'Replay','prodrome');
  const setKind=v=>{kind=v;$('#prdRbdAll').setAttribute('aria-pressed',!v);$('#prdRbdKind').setAttribute('aria-pressed',v);drawR(+rr.value)};
  $('#prdRbdAll').onclick=()=>setKind(false);$('#prdRbdKind').onclick=()=>setKind(true);

  /* ---------- 3. prodromal calculator ---------- */
  const os=$('#prdOdds');let age=3,sex='m',V={},prog=1,stopA=null,preI=-1;
  $('#prdAge').innerHTML=PRD_AGE.map((a,i)=>`<button class="btn" data-age="${i}" aria-pressed="${i===age}" aria-label="Age ${a[0]}, prior ${a[1]}%">${a[0]} · ${a[1]}%</button>`).join('');
  $('#prdSex').innerHTML=`<button class="btn" data-sex="m" aria-pressed="true">Male · ×1.2</button><button class="btn" data-sex="f" aria-pressed="false">Female · ×0.8</button>`;
  const row=m=>{const yl=m.yl||'Yes',nl=m.nl||'No',neg=m.neg??1;
    return `<div class="prd-row" data-row="${m.id}"><div class="nm">${m.n}${m.d?`<small>${m.d}</small>`:''}</div><div class="seg" role="group" aria-label="${m.n}">`+
      `<button data-mk="${m.id}" data-v="0" aria-pressed="true">Not known</button><button class="y" data-mk="${m.id}" data-v="1" aria-pressed="false">${yl} ×${PRD_lr(m.pos)}</button><button class="n" data-mk="${m.id}" data-v="-1" aria-pressed="false">${nl} ×${PRD_lr(neg)}</button></div></div>`};
  $('#prdMk').innerHTML=PRD_MK.filter(m=>m.g==='p').map(row).join('');
  $('#prdRk').innerHTML=PRD_MK.filter(m=>m.g==='r').map(row).join('');
  $('#prdPre').insertAdjacentHTML('beforeend',PRD_PRE.map((p,i)=>`<button class="btn" data-pre="${i}" aria-pressed="false">${p[0]}</button>`).join(''));
  function calc(){
    const p0=PRD_AGE[age][1]/100,items=[{l:sex==='m'?'male sex':'female sex',lr:sex==='m'?1.2:.8}];
    PRD_MK.forEach(m=>{const v=V[m.id]||0;if(!v)return;if(m.sex&&m.sex!==sex)return;if(m.over&&V[m.over])return;
      const lr=v>0?m.pos:(m.neg??1);if(lr===1)return;items.push({l:m.sn+(v>0?'':m.nl?' ('+m.nl.toLowerCase()+')':' absent'),lr})});
    let o=p0/(1-p0);const steps=[o];items.forEach(it=>{o*=it.lr;steps.push(o)});
    const LR=items.reduce((a,b)=>a*b.lr,1),post=o/(1+o),need=4*(1-p0)/p0;
    return {p0,items,steps,LR,post,need}}
  const pct=p=>p<.001?'<0.1%':p>.999?'>99.9%':(p<.1?(p*100).toFixed(1):Math.round(p*100))+'%';
  function drawO(k){
    const R=calc(),n=R.items.length,N=NARROW();
    const rh=N?34:24,top=N?64:56,H=top+(n+2)*rh+44;
    vb(os,`560 ${H}`,`400 ${H+10}`);
    const x0=N?18:206,x1=N?382:540,lg=p=>Math.log(p/(1-p)),X=p=>lerp(x0,x1,(clamp(lg(clamp(p,.0005,.9995)),-7.6,7.6)+7.6)/15.2),pp=o=>o/(1+o);
    let s=`<defs>${marker('prdUp','var(--rose)')}${marker('prdDn','var(--good)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${N?18:16}" y="22" class="t-sm" style="fill:var(--ink)">${N?'PROBABILITY, PRIOR → POSTERIOR':'PROBABILITY OF PRODROMAL PD · PRIOR → POSTERIOR'}</text>`;
    const yE=top+(n+2)*rh-6;
    [.001,.01,.05,.2,.5,.8,.95,.999].forEach(p=>{const x=X(p);s+=`<path d="M${f1(x)} ${top-14} V${yE}" class="grid"/><text x="${f1(x)}" y="${yE+14}" class="t-xs t-mid">${p<.01?'0.1':p>.99?'99.9':Math.round(p*100)}%</text>`});
    const x80=X(.8);s+=`<rect x="${f1(x80)}" y="${top-14}" width="${f1(x1-x80)}" height="${yE-top+14}" style="fill:var(--rose-soft);opacity:.55"/><path d="M${f1(x80)} ${top-14} V${yE}" style="stroke:var(--rose);stroke-width:1.6;stroke-dasharray:5 3"/><text x="${f1(x80-4)}" y="${top-18}" class="t-xs t-end" style="fill:var(--rose);font-weight:700">80% research threshold</text>`;
    s+=`<text x="${(x0+x1)/2}" y="${yE+30}" class="t-xs t-mid">probability (log-odds scale)</text>`;
    const lab=(i,txt,b)=>N?`<text x="18" y="${top+i*rh+2}" class="t-xs" style="fill:var(--ink);${b?'font-weight:700':''}">${txt}</text>`:`<text x="194" y="${top+i*rh+14}" class="t-xs t-end" style="fill:var(--ink);${b?'font-weight:700':''}">${txt}</text>`;
    const yc=i=>N?top+i*rh+16:top+i*rh+10;
    // prior
    s+=lab(0,`age ${PRD_AGE[age][0]} prior ${PRD_AGE[age][1]}%`,1)+`<circle cx="${f1(X(R.p0))}" cy="${yc(0)}" r="6" style="fill:var(--ink)"/>`;
    R.items.forEach((it,i)=>{const a=pp(R.steps[i]),b=pp(R.steps[i+1]),g=ease(clamp(k*(n+1)-i)),xa=X(a),xb=lerp(xa,X(b),g),up=it.lr>1,y=yc(i+1);
      s+=lab(i+1,`${it.l} ×${PRD_lr(it.lr)}`,0);
      s+=`<path d="M${f1(xa)} ${y-8} V${y+8}" style="stroke:var(--muted);stroke-dasharray:2 2;opacity:.6"/>`;
      if(g>0&&Math.abs(xb-xa)>2)s+=`<path d="M${f1(xa)} ${y} H${f1(xb)}" style="stroke:${up?'var(--rose)':'var(--good)'};stroke-width:3" marker-end="url(#${up?'prdUp':'prdDn'})"/>`});
    const gF=ease(clamp(k*(n+1)-n)),xp=lerp(X(pp(R.steps[0])),X(R.post),n?gF:1),yp=yc(n+1),hit=R.post>=.8;
    s+=lab(n+1,'posterior',1)+`<circle cx="${f1(xp)}" cy="${yp}" r="9" style="fill:${hit?'var(--rose)':'var(--panel)'};stroke:${hit?'var(--rose)':'var(--ink)'};stroke-width:2.4"/><text x="${f1(xp>x1-70?xp-14:xp+14)}" y="${yp+5}" class="t-lbl ${xp>x1-70?'t-end':''}" style="fill:${hit?'var(--rose)':'var(--ink)'}">${pct(R.post)}</text>`;
    os.innerHTML=s;
  }
  function out(){
    const R=calc(),hit=R.post>=.8,o=$('#prdOut');o.className='prd-out'+(hit?' yes':'');
    o.innerHTML=`<span class="kicker">Research estimate · not a diagnosis</span><strong>${pct(R.post)} ${hit?'· meets the 80% research threshold':'· below the 80% research threshold'}</strong>`+
      `<span>Prior ${PRD_AGE[age][1]}% at ${PRD_AGE[age][0]} · combined LR ×${R.LR<10?R.LR.toFixed(2):Math.round(R.LR)} · LR needed for 80% at this age ≈ ${Math.round(R.need)}</span>`+
      `<span>${hit?'In a study, this person would be classed as "probable prodromal Parkinson\'s". That label is a research category: even people above the threshold may never develop the disease, and the markers may not be independent. [[Berg2015,Heinzel2019]]':R.items.length<2?'Choose the markers that are known. The odds start from the age-based baseline risk in non-carriers. [[Heinzel2019]]':'Below the threshold the criteria do not apply a label. In the RBD cohort, even people negative on these criteria went on to convert: 13% by 5 years. [[Postuma2019RBD]]'}</span>`;
    $('#prdMini').innerHTML=`<span>Posterior <b>${pct(R.post)}</b></span><i>threshold 80% · LR ×${R.LR<10?R.LR.toFixed(2):Math.round(R.LR)} of ${Math.round(R.need)} needed</i>`;
    $$('#prdAge [data-age]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.age===age));
    $$('#prdSex [data-sex]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sex===sex));
    $$('#m-prodrome [data-mk]').forEach(b=>b.setAttribute('aria-pressed',(V[b.dataset.mk]||0)===+b.dataset.v));
    PRD_MK.forEach(m=>{const r=$(`#m-prodrome [data-row="${m.id}"]`),off=(m.sex&&m.sex!==sex)||(m.over&&V[m.over]);r.classList.toggle('off',!!off);$$('button',r).forEach(b=>b.disabled=!!(m.sex&&m.sex!==sex))});
    $$('#prdPre [data-pre]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.pre===preI));
  }
  function update(){out();if(stopA)stopA();stopA=animate(650,p=>{prog=p;drawO(p)},()=>{stopA=null})}
  $('#m-prodrome .prd-form').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;
    if(b.dataset.age!=null)age=+b.dataset.age;else if(b.dataset.sex)sex=b.dataset.sex;else if(b.dataset.mk)V[b.dataset.mk]=+b.dataset.v;else return;preI=-1;update()});
  $('#prdPre').addEventListener('click',e=>{const b=e.target.closest('[data-pre]');if(!b)return;const P=PRD_PRE[+b.dataset.pre];age=P[1];sex=P[2];V={...P[3]};preI=+b.dataset.pre;update()});
  const prevR=redraws.prodrome;redraws.prodrome=()=>{prevR&&prevR();drawO(1)};
  onHide.prodrome=(h=>()=>{h&&h();if(stopA){stopA();stopA=null}})(onHide.prodrome);
  out();drawO(1);drawR(+rr.value);draw(+rg.value);
};
