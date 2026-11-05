/* =============== 2.4 the differential =============== */
const DD_INFO=[
 {id:'ad',n:'Alzheimer\'s disease (typical)',
  pres:`Insidious, progressive loss of recent memory plus another domain. Non-memory variants exist: logopenic, visuospatial, executive. [[McKhann2011]]`,
  tests:`One abnormal Core 1 biomarker (amyloid PET, CSF Aβ42/40 or ratios, accurate plasma p-tau217). Medial temporal atrophy. Posterior cingulate and hippocampal FDG hypometabolism. Medial and lateral temporal tau PET. [[Jack2024,Mosconi2008,Ossenkoppele2018]]`,
  more:`A positive amyloid scan is not proof that Alzheimer's explains the symptoms. In clinically diagnosed Alzheimer's dementia, PET positivity among APOE e4 non-carriers fell from 86% at age 50 to 68% at 90, which implies substantial misdiagnosis in older patients. [[Ossenkoppele2015]]`},
 {id:'vasc',n:'Vascular dementia',
  pres:`A stepwise or variable course, onset tied in time to a stroke, early gait disorder, incontinence, mood or personality change, focal signs. [[Roman1993]]`,
  tests:`Imaging evidence of cerebrovascular disease is required for probable vascular dementia: infarcts or extensive white matter disease. Amyloid PET is often negative, though positivity rises with age and APOE e4 (25 to 64% in carriers aged 60 to 80). [[Roman1993,Ossenkoppele2015]]`,
  more:`Vascular dementia causes about 15% of dementia. Infarcts often sit alongside Alzheimer's: in one community autopsy series, 38% of people with dementia had Alzheimer's plus infarcts. [[OBrien2015,Schneider2007]]`},
 {id:'dlb',n:'Dementia with Lewy bodies',
  pres:`Fluctuating cognition, recurrent well-formed visual hallucinations (up to 80%), REM sleep behaviour disorder, parkinsonism (eventually over 85%). Attention, executive and visuoperceptual problems outweigh memory early. [[McKeith2017]]`,
  tests:`Reduced dopamine transporter uptake on SPECT or PET (sensitivity 78%, specificity 90% against Alzheimer's), low cardiac MIBG uptake, REM sleep without atonia. Relatively preserved medial temporal lobe; occipital hypometabolism with the cingulate island sign. [[McKeith2017]]`,
  more:`Probable DLB: one or more core features plus an indicative biomarker, or two or more core features (the second route is read from the paper's table heading and is unverified here). Biomarkers alone are not enough. The "1-year rule": dementia before or within a year of parkinsonism is DLB. Amyloid copathology is common: 63 to 83% PET-positive in e4 carriers aged 60 to 80. [[McKeith2017,Ossenkoppele2015]]`},
 {id:'pdd',n:'Parkinson\'s disease dementia',
  pres:`Dementia developing in established Parkinson's disease, more than a year after the movement symptoms began. Attention, memory, executive and visuospatial problems, often with hallucinations and apathy. [[Emre2007,McKeith2017]]`,
  tests:`A clinical diagnosis; no specific test confirms it. [[Emre2007]]`,
  more:`In Parkinson's disease, dementia risk is up to 6 times normal and point prevalence is close to 30%. [[Emre2007]]`},
 {id:'ftd',n:'Behavioural-variant frontotemporal dementia',
  pres:`Early disinhibition, apathy, loss of empathy, compulsions, overeating or mouthing, and a dysexecutive profile; "possible" needs 3 of these 6. Memory relatively spared at first. Often a younger onset. [[Rascovsky2011]]`,
  tests:`Frontal and/or anterior temporal atrophy or hypometabolism. Amyloid PET usually negative in non-carriers (5 to 14% positive at 60 to 80). [[Rascovsky2011,Mosconi2008,Ossenkoppele2015]]`,
  more:`In 137 autopsy-confirmed cases, 86% met "possible" and 76% "probable" criteria. People the criteria missed tended to be older, with prominent memory problems. [[Rascovsky2011]]`},
 {id:'ppa',n:'Semantic or nonfluent aphasia',
  pres:`Language-led onset: loss of word meaning (semantic), or broken grammar and effortful speech, often with apraxia of speech (nonfluent). [[GornoTempini2011]]`,
  tests:`Anterior temporal atrophy (semantic, most often FTLD-TDP) or left posterior fronto-insular atrophy (nonfluent, most often FTLD-tau). [[GornoTempini2011]]`,
  more:`Primary progressive aphasia requires language to be the leading problem at onset and through the early illness. Early prominent memory or visuospatial loss excludes it. [[GornoTempini2011]]`},
 {id:'lvppa',n:'Logopenic aphasia',
  pres:`Word-finding pauses and trouble repeating sentences. [[GornoTempini2011]]`,
  tests:`Left temporoparietal atrophy. Alzheimer's is the most common pathology, so it can be an atypical Alzheimer's presentation. [[GornoTempini2011]]`,
  more:`Amyloid PET was positive in 86% of 443 logopenic cases, against 20% of nonfluent and 16% of semantic cases. See <a href="#stages" data-go="stages">Stages and symptoms</a> for the other atypical forms. [[GraffRadford2021]]`},
 {id:'late',n:'LATE (TDP-43)',
  pres:`An amnestic, "Alzheimer-like" syndrome in the oldest old, 80 and over. Slower decline when pure, faster when combined with Alzheimer's. [[Nelson2019]]`,
  tests:`No validated test in life. Medial temporal atrophy with negative or discordant Alzheimer's biomarkers may raise suspicion. [[Nelson2019]]`,
  more:`LATE changes are present in more than 20% (up to 50%) of people over 80 in community autopsy series, and about 25% of community autopsy brains had enough to be linked to cognitive impairment. [[Nelson2019]]`},
 {id:'cjd',n:'Sporadic Creutzfeldt-Jakob disease',
  pres:`Rapidly progressive dementia over weeks to months, with myoclonus, visual or cerebellar signs, pyramidal or extrapyramidal signs, or akinetic mutism. [[CDC2024CJD]]`,
  tests:`CSF RT-QuIC; high signal in cortex or caudate and putamen on DWI or FLAIR MRI; periodic sharp waves on EEG; CSF 14-3-3. A very high CSF total tau relative to p-tau. [[CDC2024CJD,Hermann2021,Elgenidi2026]]`,
  more:`Typically age 55 and over, about 1 to 2 per million a year, median 4 to 5 months from first symptom to death. In a 2026 series, 5 of 204 rapidly progressive dementias first called probable Alzheimer's were prion disease, and CSF Alzheimer's markers looked "Alzheimer-like" in 6 of 9 tested. [[CDC2024CJD,Elgenidi2026]]`},
 {id:'nph',n:'Idiopathic normal-pressure hydrocephalus',
  pres:`Gait disturbance first and most prominent, then slowed, frontal-subcortical thinking, then urinary urgency or incontinence. [[Nakajima2021]]`,
  tests:`Enlarged ventricles (Evans index 0.3 or more) with the DESH pattern on MRI; a CSF tap test. [[Nakajima2021]]`,
  more:`The full triad is often absent: it was present in only 12.1% of 1,524 patients in a Japanese survey. Recognition memory is relatively preserved and hippocampal atrophy milder than in Alzheimer's. [[Nakajima2021]]`},
 {id:'dep',n:'Depression ("pseudodementia")',
  pres:`Mood symptoms with cognitive complaints. Potentially reversible, but late-life depression is also associated with later dementia (hazard ratio 1.95), and the review could not tell whether it is a risk factor or an early sign. [[Brain2025,Pozzi2022]]`,
  tests:`Depression screening. FDG-PET can mimic Alzheimer's in depression. Normal Alzheimer's biomarkers would argue against Alzheimer's. [[Knopman2001,Pozzi2022]]`,
  more:`The sources behind this module found no validated bedside rules for telling depression-related cognitive problems from Alzheimer's.`},
 {id:'delirium',n:'Delirium (alone or on top of dementia)',
  pres:`Acute onset, fluctuating course, inattention, with disorganised thinking or an altered level of consciousness. [[Inouye1990]]`,
  tests:`The CAM algorithm and a search for medical and drug causes. CAM sensitivity is lower when dementia is present. [[Inouye1990,Morandi2012]]`,
  more:`Delirium on top of dementia was reported in 22 to 89% of older people with dementia, and was linked to faster decline, institutional care and death. [[Fick2002]]`},
 {id:'meds',n:'Medication effects',
  pres:`Cognitive problems linked in time to a drug. [[Gray2015]]`,
  tests:`A medication review. The heaviest cumulative use of strong anticholinergics was associated with dementia (hazard ratio 1.54). [[Gray2015]]`,
  more:`The most common classes were tricyclic antidepressants, first-generation antihistamines and bladder antimuscarinics. [[Gray2015]]`},
 {id:'b12',n:'B12 deficiency, hypothyroidism, neurosyphilis',
  pres:`Contributing or reversible causes. True reversal is rare. [[Clarfield2003]]`,
  tests:`B12 and thyroid tests routinely; syphilis serology only if suspected. [[Knopman2001]]`,
  more:`In 39 studies, 9% of people with dementia had a potentially reversible cause, and 0.6% actually reversed (0.29% partly, 0.31% fully). [[Clarfield2003]]`},
 {id:'osa',n:'Obstructive sleep apnoea',
  pres:`Daytime sleepiness, snoring, low oxygen during sleep. [[Yaffe2011]]`,
  tests:`Polysomnography. [[Yaffe2011]]`,
  more:`In 298 older women, sleep-disordered breathing was associated with incident MCI or dementia (odds ratio 1.85, 44.8% against 31.1%), following low oxygen rather than broken sleep. [[Yaffe2011]]`}
];
const DD_UY=Math.log10(87600);
const DD_ROWS=[
 {id:'delirium',n:'Delirium',s:'hours to days, fluctuates',course:'Acute onset over hours to days, fluctuating. What follows depends on the cause.',
  f:u=>1-.55*ease(ramp(u,.1,.3))+.12*Math.sin(u*80)*ramp(u,.14,.3),end:.62,endTxt:'depends on cause'},
 {id:'ad',n:'Alzheimer\'s',s:'gradual, over years',course:'Insidious onset and gradual worsening over years.',
  f:u=>1-.78*Math.pow(ramp(u,.72,1),1.4)},
 {id:'vasc',n:'Vascular',s:'stepwise, with strokes',course:'Stepwise or variable, with drops tied in time to strokes.',
  f:u=>{let v=1;[.84,.9,.955].forEach(s=>{v-=.2*ramp(u,s,s+.006)-.04*ramp(u,s+.01,s+.03)});return v},marks:[ [.84,'stroke'],[.9,'stroke'],[.955,'stroke'] ]},
 {id:'dlb',n:'Lewy body',s:'fluctuates; hallucinations',course:'Fluctuating cognition, with visual hallucinations, REM sleep behaviour disorder and parkinsonism.',
  f:u=>1-.6*Math.pow(ramp(u,.74,1),1.2)+.09*Math.sin(u*260)*ramp(u,.76,.82),marks:[ [.85,'hallucinations'],[.94,'parkinsonism'] ]},
 {id:'ftd',n:'Frontotemporal',s:'behaviour or language first',course:'Behaviour or language changes first, memory relatively spared at onset; often a younger onset.',
  f:u=>1-.45*Math.pow(ramp(u,.86,1),1.3),g:u=>1-.7*Math.pow(ramp(u,.74,.97),1.1),gl:'behaviour'},
 {id:'nph',n:'Hydrocephalus (NPH)',s:'gait first',course:'Gait first, then slowed thinking, then bladder control.',
  f:u=>1-.4*ramp(u,.84,1),g:u=>1-.6*ramp(u,.74,.92),gl:'gait',marks:[ [.93,'continence'] ]},
 {id:'dep',n:'Depression',s:'mood first, can improve',course:'Mood changes with cognitive complaints; potentially reversible, but also a risk factor or early sign.',
  f:u=>1-.22*ease(ramp(u,.5,.62))+.12*ramp(u,.8,.92),g:u=>1-.55*ease(ramp(u,.45,.6))+.35*ramp(u,.8,.92),gl:'mood'},
 {id:'cjd',n:'CJD (prion)',s:'rapid, weeks to months',course:'Rapid decline over weeks to months; median 4 to 5 months from first symptom to death.',
  f:u=>1-ease(ramp(u,.48,.71)),end:.712,endTxt:'median 4–5 months'}
];
const DD_STEPS=[
 {fh:0,h:8,k:'Hours',t:'Only delirium moves',
  txt:`Delirium starts over hours to days and fluctuates. The CAM algorithm requires acute onset with a fluctuating course and inattention, plus either disorganised thinking or an altered level of consciousness. [[Inouye1990]]`,
  pt:`A sudden change in thinking over hours or days is not how Alzheimer's behaves. It points to delirium, which has medical or drug causes.`,
  hook:`Hours to days → delirium until proven otherwise.`},
 {fh:48,h:24*12,k:'Days to weeks',t:'Delirium fluctuates on',
  txt:`Over days to weeks, a delirium keeps fluctuating, and its course depends on the cause. Delirium on top of dementia was reported in 22 to 89% of older people with dementia. [[Inouye1990,Fick2002]]`,
  pt:`Someone already living with dementia can also develop delirium. A sudden worsening is a warning sign.`},
 {fh:24*45,h:24*30*4,k:'Weeks to months',t:'Rapidly progressive',
  txt:`Decline over weeks to months raises rapidly progressive causes such as prion disease. Sporadic CJD typically affects people aged 55 and over, about 1 to 2 per million a year, with a median of 4 to 5 months from first symptom to death. [[CDC2024CJD]]`,
  pt:`Dementia that gets much worse month by month is unusual and points to rapidly progressive causes such as prion disease.`,
  hook:`Weeks to months → rapidly progressive dementia: think CJD (RT-QuIC, MRI DWI, EEG). [[CDC2024CJD,Hermann2021]]`},
 {fh:8760,h:8760*4,k:'Years',t:'The slow syndromes separate',
  txt:`Over years, the slow causes separate by pattern: gradual (Alzheimer's), stepwise (vascular), fluctuating with hallucinations and parkinsonism (Lewy body), behaviour or language first (frontotemporal), gait first (normal-pressure hydrocephalus). [[McKhann2011,Roman1993,McKeith2017,Rascovsky2011,Nakajima2021]]`,
  pt:`What came first, memory, behaviour, walking or hallucinations, is one of the most useful things a family can describe.`,
  hook:`First symptom: memory → Alzheimer's (or LATE in the oldest old); behaviour → bvFTD; gait → NPH or vascular; visual hallucinations and fluctuation → Lewy body.`},
 {fh:8760*8,h:87600,k:'A decade',t:'Mixed causes are the rule',
  txt:`Real courses overlap. More than half of people diagnosed with Alzheimer's dementia at US research centres had mixed pathology, and in a community autopsy series most people with dementia had more than one diagnosis. [[AA2025Facts,Schneider2007]]`,
  pt:`These lines are textbook shapes. Many older people have more than one cause at once.`}
];
inits.ddx=()=>{
  const svg=$('#ddSvg'),rg=$('#ddT');let lin=false,pick=null;
  const toT=h=>lin?h/87600:Math.log10(Math.max(1,h))/DD_UY;
  const toU=v=>lin?Math.log10(Math.max(1,v*87600))/DD_UY:v;
  const setSteps=()=>DD_STEPS.forEach(s=>{s.from=toT(s.fh);s.at=toT(s.h)});setSteps();
  const fmt=h=>h<24?`${Math.max(1,Math.round(h))} hour${Math.round(h)>1?'s':''}`:h<24*14?`${Math.round(h/24)} day${Math.round(h/24)>1?'s':''}`:h<24*61?`${Math.round(h/168)} weeks`:h<8760*1.5?`${Math.round(h/730)} months`:`${f1(h/8760)} years`;
  function draw(t){
    const N=vb(svg,'720 452','400 600');
    const L=N?{x0:14,x1:386,y0:28,rh:66,top:20,bot:58}:{x0:198,x1:704,y0:28,rh:48,top:8,bot:42};
    const X=v=>L.x0+v*(L.x1-L.x0),yb=L.y0+DD_ROWS.length*L.rh;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* ticks */
    const ticks=lin?[ [0,'0'],[.2,'2'],[.4,'4'],[.6,'6'],[.8,'8'],[1,'10 years'] ]:[ [0,'1 hour'],[toT(24),'1 day'],[toT(168),'1 week'],[toT(730),'1 month'],[toT(8760),'1 year'],[1,'10 years'] ];
    ticks.forEach(([v,l],i)=>{s+=`<path d="M${f1(X(v))} ${L.y0}V${yb}" class="grid"/><text x="${f1(X(v))}" y="${yb+16}" class="t-xs ${i===0?'':i===ticks.length-1?'t-end':'t-mid'}">${l}</text>`});
    s+=`<text x="${f1((L.x0+L.x1)/2)}" y="${yb+32}" class="t-xs t-mid">${lin?'years, evenly spaced':'time since first change (each step is about 4 to 30 times longer)'}</text>`;
    /* rows */
    DD_ROWS.forEach((r,i)=>{const y=L.y0+i*L.rh,on=pick===r.id,pt=y+L.top,pb=y+L.bot,Y=v=>pb-clamp(v,0,1)*(pb-pt);
      s+=`<g class="clk" data-row="${r.id}"><rect x="6" y="${y+2}" width="${N?388:708}" height="${L.rh-4}" rx="8" style="fill:${on?'var(--rose-soft)':i%2?'var(--field)':'var(--panel)'};stroke:${on?'var(--rose)':'none'};stroke-width:1.5"/>`;
      if(N)s+=`<text x="${L.x0}" y="${y+15}" class="t-lbl">${r.n}</text><text x="${L.x1}" y="${y+15}" class="t-xs t-end">${r.s}</text>`;
      else s+=`<text x="16" y="${y+21}" class="t-lbl">${r.n}</text><text x="16" y="${y+36}" class="t-xs">${r.s}</text>`;
      s+=`<path d="M${L.x0} ${Y(1)}H${L.x1}" style="stroke:var(--line);stroke-width:1;stroke-dasharray:1 3"/>`;
      /* draw each line up to the playhead */
      const lineTo=(fn,dash,col)=>{let d='',n=0;const M=260;for(let k=0;k<=M;k++){const v=t*k/M,u=toU(v);if(r.end&&u>r.end)break;d+=(n++?'L':'M')+f1(X(v))+' '+f1(Y(fn(u)))}
        return n>1?`<path d="${d}" style="fill:none;stroke:${col};stroke-width:${dash?2:2.6};stroke-linecap:round;stroke-linejoin:round;${dash?'stroke-dasharray:5 4':''}"/>`:''};
      if(r.g){s+=lineTo(r.g,1,'var(--amber)');const M=200;for(let k=0;k<=M;k++){const v=k/M,u=toU(v);if(v>t)break;if(r.g(u)<.9){const w=r.gl.length*5.8,lf=X(v)-6-w>L.x0;s+=`<text x="${f1(lf?X(v)-6:X(v)+6)}" y="${lf?pt+13:pb}" class="t-xs ${lf?'t-end':''}" style="fill:var(--amber);font-weight:700">${r.gl}</text>`;break}}}
      s+=lineTo(r.f,0,on?'var(--rose)':'var(--ink)');
      if(r.marks){const shown=r.marks.map(([mu])=>lin?Math.pow(10,mu*DD_UY)/87600:mu).filter(mv=>mv<=t);
        shown.forEach(mv=>{s+=`<circle cx="${f1(X(mv))}" cy="${pb-3}" r="3.2" style="fill:var(--violet)"/>`});
        if(shown.length){const lab=[...new Set(r.marks.slice(0,shown.length).map(m=>m[1]))].join(', '),w=lab.length*5.8,x0=X(shown[0]),xl=X(shown[shown.length-1]),left=x0-8-w>L.x0+(N?0:4);
          s+=`<text x="${f1(left?x0-8:xl+8)}" y="${pb}" class="t-xs ${left?'t-end':''}" style="fill:var(--violet);font-weight:600">${lab}</text>`}}
      if(r.end){const ev=lin?Math.pow(10,r.end*DD_UY)/87600:r.end;if(t>ev){const ey=Y(r.f(r.end));s+=`<circle cx="${f1(X(ev))}" cy="${f1(ey)}" r="3" style="fill:var(--muted)"/><text x="${f1(X(ev)+8)}" y="${f1(Math.min(pb,ey+(r.id==='cjd'?0:4)))}" class="t-xs">${r.endTxt}</text>`}}
      s+='</g>'});
    /* playhead */
    const px=X(t),hrs=lin?t*87600:Math.pow(10,t*DD_UY),lab=fmt(hrs),tw=lab.length*5.9+14,tx=clamp(px,L.x0+tw/2-8,L.x1-tw/2+8);
    s+=`<path d="M${f1(px)} ${L.y0}V${yb}" style="stroke:var(--rose);stroke-width:1.6"/><rect x="${f1(tx-tw/2)}" y="6" width="${f1(tw)}" height="17" rx="8.5" style="fill:var(--rose)"/><text x="${f1(tx)}" y="18" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${lab}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(DD_STEPS,t);setSt(p);$('#ddNote').innerHTML=noteHTML(DD_STEPS[p]);
    rg.setAttribute('aria-valuetext',`${lab}. Step ${p+1} of ${DD_STEPS.length}: ${DD_STEPS[p].t}`);
  }
  const stop=playWire(rg,$('#ddPlay'),draw,16000,'Replay','ddx');
  const setSt=stepWire($('#ddSteps'),DD_STEPS,rg,draw,stop);
  const setAxis=v=>{const h=lin?rg.value*87600:Math.pow(10,rg.value*DD_UY);lin=v;setSteps();rg.value=toT(h);
    $('#ddLog').setAttribute('aria-pressed',!v);$('#ddLin').setAttribute('aria-pressed',v);draw(+rg.value)};
  $('#ddLog').onclick=()=>setAxis(false);$('#ddLin').onclick=()=>setAxis(true);

  /* ---------- details: buttons, rows, table ---------- */
  const info=id=>DD_INFO.find(d=>d.id===id);
  $('#ddPickBtns').innerHTML='<span class="kicker">Details</span>'+DD_ROWS.map(r=>`<button class="btn" data-pick="${r.id}" aria-pressed="false">${r.n}</button>`).join('');
  function showPick(id){pick=id;const r=DD_ROWS.find(x=>x.id===id),d=info(id);
    $$('#ddPickBtns [data-pick]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pick===id));
    $('#ddPick').innerHTML=`<div class="kicker">Typical pattern · schematic</div><h4>${d.n}</h4><dl class="kv">${r?`<div><dt>Typical course</dt><dd>${r.course}</dd></div>`:''}<div><dt>What points to it</dt><dd>${d.pres}</dd></div><div><dt>Key tests and findings</dt><dd>${d.tests}</dd></div><div><dt>Also</dt><dd>${d.more}</dd></div></dl>`;
    draw(+rg.value)}
  $('#ddPick').innerHTML=`<div class="kicker">Details</div><p>Click a row in the drawing, or a button above, to see what points to each condition and which tests help.</p>`;
  $('#ddPickBtns').addEventListener('click',e=>{const b=e.target.closest('[data-pick]');if(b)showPick(b.dataset.pick)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-row]');if(g)showPick(g.dataset.row)});
  const tb=$('#ddTable tbody');
  tb.innerHTML=DD_INFO.map(d=>`<tr data-id="${d.id}"><th scope="row"><button class="ddb" aria-expanded="false" aria-controls="ddm-${d.id}">${d.n}</button></th><td>${d.pres}</td><td>${d.tests}</td></tr><tr class="ddmore" id="ddm-${d.id}" hidden><td colspan="3"><b>Also:</b> ${d.more}</td></tr>`).join('');
  tb.addEventListener('click',e=>{const b=e.target.closest('.ddb');if(!b)return;const tr=b.closest('tr'),m=$('#ddm-'+tr.dataset.id),open=b.getAttribute('aria-expanded')!=='true';
    b.setAttribute('aria-expanded',open);m.hidden=!open;tr.classList.toggle('hl',open)});

  /* ---------- CAM ---------- */
  const cam=$('#ddCam'),F=[true,true,false,false];
  const CF=[ ['1','Acute onset','and fluctuating'],['2','Inattention','hard to focus'],['3','Disorganised','thinking'],['4','Altered level','consciousness'] ];
  function drawCam(){
    const N=vb(cam,'720 150','400 274');
    const met=F[0]&&F[1]&&(F[2]||F[3]);
    const C=N?[ [12,16,172],[216,16,172],[24,112,156],[220,112,156] ]:[ [8,40,120],[150,40,120],[302,40,120],[446,40,120] ];
    const W=N?{and:[ [200,48],[200,96] ],or:[200,144],br:[14,104,372,72],res:[12,202,376,56]}:{and:[ [139,72],[282,72] ],or:[434,72],br:[294,32,280,72],res:[590,40,122,56]};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const [bx,by,bw,bh]=W.br,orOn=F[2]||F[3];
    s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12" style="fill:none;stroke:${orOn?'var(--rose)':'var(--muted)'};stroke-width:1.5;stroke-dasharray:4 3"/>`;
    if(!N)s+=`<text x="${bx+bw/2}" y="${by-8}" class="t-xs t-mid">at least one of</text>`;
    C.forEach(([x,y,w],i)=>{const on=F[i];
      s+=`<rect x="${x}" y="${y}" width="${w}" height="56" rx="10" style="fill:${on?'var(--rose-soft)':'var(--panel)'};stroke:${on?'var(--rose)':'var(--line)'};stroke-width:${on?2:1}"/><text x="${x+10}" y="${y+22}" class="t-big" style="fill:${on?'var(--rose)':'var(--muted)'}">${CF[i][0]}</text><text x="${x+28}" y="${y+24}" class="t-lbl" style="font-size:12.5px">${CF[i][1]}</text><text x="${x+28}" y="${y+40}" class="t-xs">${CF[i][2]}</text><text x="${x+w-8}" y="${y+14}" class="t-xs t-end" style="fill:${on?'var(--rose)':'var(--muted)'};font-weight:700">${on?'yes':'no'}</text>`});
    W.and.forEach(([x,y])=>{s+=`<text x="${x}" y="${y+4}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">AND</text>`});
    s+=`<text x="${W.or[0]}" y="${W.or[1]+4}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">OR</text>`;
    if(N)s+=`<text x="200" y="${W.res[1]-7}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">=</text>`;
    else s+=`<text x="${W.res[0]-8}" y="${W.res[1]+32}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">=</text>`;
    const [rx,ry,rw,rh]=W.res;
    s+=`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="10" style="fill:${met?'var(--bad-soft)':'var(--panel)'};stroke:${met?'var(--bad)':'var(--line)'};stroke-width:2"/><text x="${rx+rw/2}" y="${ry+24}" class="t-lbl t-mid" style="fill:${met?'var(--bad)':'var(--ink)'}">${met?'CAM positive':'Not met'}</text><text x="${rx+rw/2}" y="${ry+40}" class="t-xs t-mid">${met?'delirium likely':'by this algorithm'}</text>`;
    cam.innerHTML=s;
    $('#ddCamNote').innerHTML=noteHTML({k:'CAM algorithm',t:met?'Criteria met: delirium likely':'Criteria not met',
      txt:`${met?'Features 1 and 2 are present, plus at least one of 3 or 4.':!F[0]||!F[1]?'Both feature 1 (acute onset and fluctuating course) and feature 2 (inattention) are required.':'Features 1 and 2 are present, but neither 3 nor 4 is.'} In validation the CAM took under 5 minutes, with 94 to 100% sensitivity and 90 to 95% specificity against psychiatrist diagnosis. In people with dementia, one study found 96 to 100% specificity but only 77% sensitivity. [[Inouye1990,Morandi2012]]`,
      pt:`Delirium comes on fast and comes and goes. The key sign is trouble keeping attention.`,
      hook:`CAM = 1 + 2 + (3 or 4). Feature 1: acute onset and fluctuating course. Feature 2: inattention.`});
    $$('#m-ddx [data-cam]').forEach(b=>b.setAttribute('aria-pressed',F[+b.dataset.cam]));
  }
  $$('#m-ddx [data-cam]').forEach(b=>b.onclick=()=>{F[+b.dataset.cam]=!F[+b.dataset.cam];drawCam()});
  const prevR=redraws.ddx;redraws.ddx=()=>{prevR&&prevR();drawCam()};

  /* ---------- reversible causes ---------- */
  const rv=$('#ddRev'),rr=$('#ddRevT');
  const R=rng(53),order=[...Array(1000).keys()];for(let i=999;i>0;i--){const j=Math.floor(R()*(i+1));[order[i],order[j]]=[order[j],order[i]]}
  const kind=[];order.forEach((cell,k)=>kind[cell]=k<6?2:k<90?1:0);
  const RV_STEPS=[
   {from:0,k:'Step 1',t:'1,000 people with dementia',txt:`A 2003 meta-analysis pooled 39 studies of 5,620 people with dementia. Alzheimer's accounted for 56.3% of cases and vascular causes for 20.3%. [[Clarfield2003]]`,pt:`Most dementia is not reversible. Looking for the exceptions is still part of a good assessment.`},
   {from:.35,k:'Step 2',t:'90 with a potentially reversible cause',txt:`9% had a cause that could in principle be reversed. The AAN parameter recommended screening for depression, B12 deficiency and hypothyroidism. [[Clarfield2003,Knopman2001]]`,pt:`About 1 person in 11 had something treatable that might have been adding to the problem.`},
   {from:.7,k:'Step 3',t:'6 actually reversed',txt:`Only 0.6% actually reversed: 0.29% partly and 0.31% fully. [[Clarfield2003]]`,pt:`Full recovery is rare. Looking for treatable problems is still part of a careful assessment.`,hook:`Reversible causes: potentially reversible in about 9%, actually reversed in about 0.6% (Clarfield 2003).`}
  ];
  function drawRev(t){
    const N=vb(rv,'720 250','400 350');
    const L=N?{gx:20,gy:36,px:20,py:290}:{gx:20,gy:20,px:410,py:50},c=9,o1=ramp(t,.35,.55),o2=ramp(t,.7,.9),app=ramp(t,0,.3);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(N)s+=`<text x="${L.gx}" y="24" class="t-sm" style="fill:var(--ink);font-weight:600">1,000 people with dementia</text>`;
    for(let i=0;i<1000;i++){if(i/1000>=app)break;const x=L.gx+(i%40)*c+c/2,y=L.gy+Math.floor(i/40)*c+c/2,k=kind[i];
      if(k===0||o1<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.6" style="fill:var(--muted);opacity:${f1(k?1-o1:.8)}"/>`;
      if(k===1&&o1>0)s+=`<rect x="${f1(x-3.4)}" y="${f1(y-3.4)}" width="6.8" height="6.8" rx="1" style="fill:var(--amber);opacity:${f1(o1)}"/>`;
      if(k===2&&o1>0)s+=`<rect x="${f1(x-3.4)}" y="${f1(y-3.4)}" width="6.8" height="6.8" rx="1" style="fill:var(--amber);opacity:${f1(o1*(1-o2))}"/>${o2>0?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(3.5+4*o2)}" style="fill:var(--sage);stroke:var(--panel);stroke-width:1.5;opacity:${f1(o2)}"/>`:''}`}
    const rows=[ ['dot','1,000 people with dementia','100%',1],['sq','potentially reversible cause','90 (9%)',o1],['ring','actually reversed','6 (0.6%)',o2] ];
    rows.forEach(([m,l,v,o],i)=>{const x=N?L.px+(i?(i-1)*180:0):L.px,y=N?L.py+(i?40:0):L.py+i*52;if(N&&i===0)return;
      const mk=m==='dot'?`<circle cx="${x+6}" cy="${y-4}" r="2" style="fill:var(--muted)"/>`:m==='sq'?`<rect x="${x}" y="${y-10}" width="12" height="12" rx="2" style="fill:var(--amber)"/>`:`<circle cx="${x+6}" cy="${y-4}" r="7" style="fill:var(--sage)"/>`;
      s+=`<g style="opacity:${f1(.2+.8*o)}">${mk}<text x="${x+20}" y="${y}" class="t-lbl">${v}</text><text x="${x+20}" y="${y+15}" class="t-xs">${l}</text></g>`});
    rv.innerHTML=s;
    $('#ddRevNote').innerHTML=noteHTML(RV_STEPS[phaseOf(RV_STEPS,t)]);
  }
  playWire(rr,$('#ddRevPlay'),drawRev,9000,'Replay','ddx');
  drawCam();draw(+rg.value);drawRev(+rr.value);
};
