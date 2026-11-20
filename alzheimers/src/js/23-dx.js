/* =============== 2.3 diagnosis and biomarkers =============== */
const DX_STEPS=[
 {k:'Step 1 · Concern',t:'Someone notices a change',ti:'Concern',sub:'someone notices',
  txt:`Diagnosis starts with a history of decline from the person's usual level, corroborated by someone who knows them well. Dementia of any cause means cognitive or behavioural symptoms that interfere with work or usual activities, are a decline from before, are not explained by delirium or a major psychiatric disorder, and involve at least two domains. [[Arvanitakis2019,McKhann2011]]`,
  pt:`It usually starts when the person, or someone close to them, notices that things are not as they were.`,
  hook:`Dementia needs both a decline in at least two domains and interference with everyday function. An informant's history is part of the criteria.`},
 {k:'Step 2 · Screening',t:'A brief cognitive test',ti:'Screening',sub:'MoCA, MMSE',
  txt:`Brief tests such as the MMSE, MoCA and Mini-Cog grade severity and prompt further assessment. They do not establish the cause. A Cochrane review concluded that the MMSE "should not be used in isolation to confirm or exclude disease". [[Creavin2016,Crum1993,Tombaugh1992]]`,
  pt:`A short pen-and-paper test shows whether thinking is affected and by how much. It cannot say why.`,
  hook:`Screening tests measure. They do not diagnose the cause.`},
 {k:'Step 3 · History and examination',t:'Talk, examine, review the medicines',ti:'History, exam',sub:'informant, meds',
  txt:`A mental-status examination covers memory, language, attention, visuospatial and executive function, and mood; the physical examination looks for focal signs. Two things are checked early. Delirium, with tools such as the CAM. And medicines: the heaviest cumulative use of strong anticholinergics was associated with dementia (hazard ratio 1.54). [[Arvanitakis2019,Inouye1990,Gray2015]]`,
  pt:`The clinician talks with the person and family, examines them, and goes through every medicine.`},
 {k:'Step 4 · Blood tests',t:'Look for reversible causes',ti:'Blood tests',sub:'B12, thyroid',
  txt:`The AAN 2001 practice parameter, an older guideline, recommended screening for depression, B12 deficiency and hypothyroidism, and testing for syphilis only when neurosyphilis is suspected. In a meta-analysis of 5,620 people with dementia, 9% had a potentially reversible cause but only 0.6% actually reversed. [[Knopman2001,Clarfield2003]]`,
  pt:`Blood tests look for treatable problems that can affect thinking. They are worth finding, though they rarely explain everything.`,
  hook:`AAN routine screen: B12, thyroid, depression. Syphilis serology only if suspected.`},
 {k:'Step 5 · Brain imaging',t:'CT or MRI',ti:'Brain imaging',sub:'CT or MRI',
  txt:`Non-contrast CT or MRI was judged appropriate in the initial evaluation. Imaging looks for infarcts, tumour, focal atrophy and the enlarged ventricles of normal-pressure hydrocephalus. Medial temporal atrophy supports Alzheimer's at the MCI stage but is not specific to it. [[Knopman2001,Arvanitakis2019,Frisoni2010,Nakajima2021]]`,
  pt:`A brain scan looks for strokes, tumours, fluid build-up and shrinking of memory areas.`},
 {k:'Step 6 · Biomarkers',t:'Is Alzheimer\'s pathology there?',ti:'Biomarkers',sub:'PET, CSF or blood',
  txt:`Biomarkers test for the pathology itself. Amyloid PET visual reads found moderate-to-frequent plaques with 92% sensitivity and 100% specificity against autopsy. CSF testing favours the Aβ42/40 ratio over Aβ42 alone. In May 2025 the FDA cleared the first blood test (a plasma p-tau217/Aβ42 ratio) for specialised care, and in Swedish primary and secondary care a p-tau217 test was about 90% accurate. A 2019 review advised considering CSF or genetic testing in atypical cases: onset before 65, rapid onset or non-memory presentations. [[Clark2012,Hansson2019,FDA2025,Palmqvist2024,Arvanitakis2019]]`,
  pt:`A scan, a spinal fluid test, or now a blood test can show whether the Alzheimer's proteins are present.`,
  hook:`2024 criteria: one abnormal Core 1 biomarker (amyloid PET, an approved CSF assay, or an accurate plasma test such as p-tau217) establishes Alzheimer's biology. [[Jack2024]]`},
 {k:'Step 7 · Diagnosis',t:'A cause and a stage',ti:'Diagnosis',sub:'cause and stage',
  txt:`Biomarker results change care: in the IDEAS study, amyloid PET changed management in 60.2% of people with MCI and 63.5% with dementia of uncertain cause. The 2024 scheme combines a clinical stage (0 to 6) with a biological stage (A to D), such as "3A". Anti-amyloid antibodies require confirmed amyloid pathology; see <a href="#antibody" data-go="antibody">Anti-amyloid antibodies</a>. [[Rabinovici2019,Jack2024,FDA2024Donanemab]]`,
  pt:`The result is a named cause and a stage. Planning and treatment decisions are built on both.`}
];
DX_STEPS.forEach((s,i)=>{s.from=i/7;s.at=i/7+.05});
const DX_GSTEPS=[ {from:0,k:'Step 1',t:'1,000 people are tested'},{from:.32,k:'Step 2',t:'Who truly has the pathology'},{from:.6,k:'Step 3',t:'What the test says'} ];
const DX_CRIT=[
 {n:'NIA-AA 2011',h:'Clinical criteria',ev:'',d:`Clinical criteria are the cornerstone. Dementia needs decline in at least two domains that interferes with daily life; probable Alzheimer's dementia adds insidious onset and clear worsening. Biomarker tests were not advocated for routine diagnosis. [[McKhann2011]]`,
  v:[`No diagnosis: these dementia criteria apply only once dementia is present, and this person has no symptoms. Separate 2011 research guidelines described preclinical stages. [[Jack2024]]`,`No diagnosis: these dementia criteria apply only once dementia is present, and this person has no symptoms. Separate 2011 research guidelines described preclinical stages. [[Jack2024]]`,`Not Alzheimer's dementia: daily life is not disrupted, so the dementia criteria are not met.`,`Probable Alzheimer's dementia, if onset was insidious, worsening is clear and nothing else explains it. No biomarker is required.`]},
 {n:'NIA-AA 2018',h:'ATN research framework',ev:'',d:`A biological definition for research only. A is amyloid (CSF or PET), T is tau (CSF p-tau or tau PET), (N) is neurodegeneration, in brackets because it is not specific. The authors called clinical use "premature and inappropriate". [[Jack2018]]`,
  v:[`A+T−: "Alzheimer's pathologic change", on the Alzheimer's continuum, but not yet "Alzheimer's disease".`,`A+T+: "Alzheimer's disease", even without symptoms.`,`At least "Alzheimer's pathologic change"; "Alzheimer's disease" only if T is also positive.`,`Cannot be placed: without biomarkers the framework has no label to give.`]},
 {n:'Alzheimer\'s Association 2024',h:'Revised criteria',ev:'<span class="ev early">Debated</span>',d:`Alzheimer's is a biological process from its first pathology. One abnormal Core 1 biomarker establishes it. Stages pair a clinical number (0 to 6) with a biological letter (A to D). The workgroup still recommends against testing people without symptoms outside research. [[Jack2024]]`,
  v:[`Alzheimer's disease, stage 1A: no symptoms, amyloid only.`,`Alzheimer's disease, stage 1B or later, depending on how far tau has spread on PET.`,`Alzheimer's disease, stage 3, with the letter set by tau PET (3A if amyloid only).`,`Alzheimer's biology is not established until a Core 1 biomarker is tested.`]},
 {n:'IWG 2024',h:'International Working Group',ev:'<span class="ev early">Debated</span>',d:`Rejects a purely biological definition for clinical use. Most biomarker-positive people without symptoms will not become symptomatic on a near timeline, and telling them they have Alzheimer's is the most problematic consequence. Both groups accept the biomarkers; they disagree on the label. [[Dubois2024,Jack2024]]`,
  v:[`"At risk for Alzheimer's", not Alzheimer's disease.`,`"At risk", or "presymptomatic Alzheimer's" only for specific biomarker patterns that signal symptoms are near.`,`Fits the clinical-biological idea, symptoms plus Alzheimer's biomarkers; the IWG sets which biomarker patterns count.`,`Not confirmed: the IWG construct needs biomarker evidence as well as the clinical picture.`]}
];
function dxGlyph(k,x,y,lp,on){
  const c=on?'var(--rose)':'var(--muted)',S=`style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"`;
  let g=`<g transform="translate(${f1(x)} ${f1(y)})">`;
  switch(k){
    case 0:g+=`<path d="M-12 -11h24v16h-11l-6 6v-6h-7z" ${S}/><text x="0" y="2" class="t-sm t-mid" style="fill:${c};font-weight:700">?</text>`;break;
    case 1:g+=`<path d="M-10 -12h20v25h-20zM-4 -14h8v4h-8z" ${S}/>`;for(let i=0;i<3;i++)if(lp>.2+i*.22)g+=`<path d="M-6 ${-5+i*7}l2.5 2.5 4.5 -5" ${S}/>`;break;
    case 2:g+=`<circle cx="-6" cy="-6" r="4.5" ${S}/><path d="M-14 10q0 -9 8 -9t8 9" ${S}/><circle cx="7" cy="-4" r="4" style="fill:none;stroke:${on?'var(--sky)':c};stroke-width:2"/><path d="M0 11q0 -8 7 -8t7 8" style="fill:none;stroke:${on?'var(--sky)':c};stroke-width:2;stroke-linecap:round"/>`;break;
    case 3:{const lv=on?clamp(lp*1.4):1;g+=`<rect x="-4" y="${f1(12-16*lv)}" width="8" height="${f1(16*lv)}" style="fill:var(--vessel);opacity:.8"/><path d="M-5 -13h10M-4 -13v22a4 4 0 0 0 8 0v-22" ${S}/>`;break}
    case 4:{g+=`<ellipse rx="12" ry="14" ${S}/><path d="M-3 -3q-3 3 0 6M3 -3q3 3 0 6" ${S}/>`;if(on){const yy=-14+28*((lp*2.2)%1);g+=`<path d="M-15 ${f1(yy)}h30" style="stroke:var(--sky);stroke-width:2"/>`}break}
    case 5:g+=`<circle cx="-7" cy="-5" r="4" style="fill:var(--amber)"/><circle cx="6" cy="-6" r="4" style="fill:var(--sky)"/><circle cx="0" cy="7" r="4" style="fill:var(--rose)"/>`;break;
    case 6:g+=`<path d="M-12 -8h14l9 9 -9 9h-14z" ${S}/><path d="M-8 1l3 3 6 -6" ${S}/>`;break;
  }
  return g+'</g>'}
inits.dx=()=>{
  /* ---------- 1. pathway ---------- */
  const svg=$('#dxSvg'),rg=$('#dxT');
  function draw(t){
    const N=vb(svg,'720 390','400 700');
    const L=N?{P:[ [200,44],[200,134],[200,224],[200,314],[200,404],[200,494],[200,650] ],bw:260,chips:[ [75,566],[200,566],[325,566] ],cw:116}
             :{P:[ [95,80],[270,80],[445,80],[620,80],[620,230],[370,230],[110,230] ],bw:150,chips:[ [250,322],[370,322],[490,322] ],cw:112};
    const pos=t*7,cur=Math.min(6,Math.floor(pos)),lp=clamp(pos-cur);
    let s=`<defs>${marker('dxA')}${marker('dxAr','var(--rose)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* connectors */
    for(let i=0;i<6;i++){const [x0,y0]=L.P[i],[x1,y1]=L.P[i+1],done=i<cur;let d;
      if(N)d=i===5?`M${x0} ${y0+29}V${L.chips[1][1]-22}M${x1} ${L.chips[1][1]+22}V${y1-31}`:`M${x0} ${y0+29}V${y1-31}`;
      else if(y0===y1)d=x1>x0?`M${x0+L.bw/2} ${y0}H${x1-L.bw/2-2}`:`M${x0-L.bw/2} ${y0}H${x1+L.bw/2+2}`;
      else d=`M${x0} ${y0+29}V${y1-31}`;
      s+=`<path d="${d}" style="fill:none;stroke:${done?'var(--rose)':'var(--muted)'};stroke-width:${done?2.4:1.6};${done?'':'stroke-dasharray:4 4'}" marker-end="url(#${done?'dxAr':'dxA'})"/>`}
    /* biomarker chips */
    const CH=[ ['Amyloid PET','92/100 vs autopsy','var(--amber)'],['CSF Aβ42/40','ratio beats Aβ42','var(--sky)'],['Blood p-tau217','FDA-cleared 2025','var(--rose)'] ];
    L.chips.forEach(([x,y],k)=>{const on=cur>5||(cur===5&&lp>.12+k*.2);
      if(!N)s+=`<path d="M${L.P[5][0]} ${L.P[5][1]+29}L${x} ${y-21}" style="stroke:var(--line);stroke-width:1.5"/>`;
      s+=`<rect x="${x-L.cw/2}" y="${y-20}" width="${L.cw}" height="40" rx="9" style="fill:${on?'var(--panel)':'var(--field)'};stroke:${on?CH[k][2]:'var(--line)'};stroke-width:${on?2:1}"/><text x="${x}" y="${y-4}" class="t-sm t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:700">${CH[k][0]}</text><text x="${x}" y="${y+11}" class="t-xs t-mid">${CH[k][1]}</text>`});
    /* nodes */
    L.P.forEach(([x,y],i)=>{const on=i===cur,done=i<cur,S=DX_STEPS[i];
      s+=`<g class="clk" data-node="${i}" tabindex="0" role="button" aria-label="Step ${i+1}: ${S.ti}${done?', done':''}" aria-pressed="${on}">`;
      s+=`<rect x="${x-L.bw/2}" y="${y-29}" width="${L.bw}" height="58" rx="12" style="fill:${on?'var(--rose-soft)':'var(--panel)'};stroke:${on?'var(--rose)':done?'var(--sage)':'var(--line)'};stroke-width:${on?2.4:1.4}"/>`;
      s+=dxGlyph(i,x-L.bw/2+24,y,on?lp:1,on||done);
      s+=`<text x="${x-L.bw/2+46}" y="${y-3}" class="t-lbl">${S.ti}</text><text x="${x-L.bw/2+46}" y="${y+13}" class="t-xs">${S.sub}</text>`;
      if(done)s+=`<circle cx="${x+L.bw/2-4}" cy="${y-25}" r="8" style="fill:var(--sage)"/><path d="M${x+L.bw/2-8} ${y-25}l3 3 5 -6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
      s+=`</g>`});
    /* traveller */
    const [ax,ay]=L.P[cur],[bx,by]=L.P[Math.min(6,cur+1)],m=cur<6?ease(ramp(lp,.72,1)):0;
    let tx=lerp(ax,bx,m),ty=lerp(ay,by,m);
    if(cur===5&&m>0){const cx=L.chips[1][0],cy=L.chips[1][1];tx=m<.5?lerp(ax,cx,m*2):lerp(cx,bx,m*2-1);ty=m<.5?lerp(ay,cy,m*2):lerp(cy,by,m*2-1)}
    const ox=N?L.bw/2+14:0,oy=N?0:-40;
    s+=`<circle cx="${f1(tx+(m>0&&m<1?0:ox))}" cy="${f1(ty+(m>0&&m<1?0:oy))}" r="8" style="fill:var(--rose);stroke:var(--panel);stroke-width:3"/>`;
    svg.innerHTML=s;
    const p=phaseOf(DX_STEPS,t);setSt(p);$('#dxNote').innerHTML=noteHTML(DX_STEPS[p]);
  }
  const stop=playWire(rg,$('#dxPlay'),draw,21000,'Replay','dx');
  const setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  const go=i=>{stop();rg.value=DX_STEPS[i].at;draw(DX_STEPS[i].at)};
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-node]');if(g)go(+g.dataset.node)});
  svg.addEventListener('keydown',e=>{const g=e.target.closest('[data-node]');if(!g||(e.key!=='Enter'&&e.key!==' '))return;e.preventDefault();const i=+g.dataset.node;go(i);const ng=svg.querySelector(`[data-node="${i}"]`);ng&&ng.focus()});

  /* ---------- 2. predictive-value grid ---------- */
  const gs=$('#dxGrid'),gr=$('#dxGridT'),se=$('#dxSens'),sp=$('#dxSpec'),pr=$('#dxPre');
  function nums(){const sens=+se.value/100,spec=+sp.value/100,pre=+pr.value/100,D=Math.round(1000*pre),TP=Math.round(D*sens),FN=D-TP,H=1000-D,TN=Math.round(H*spec),FP=H-TN;
    return {sens,spec,pre,D,TP,FN,H,TN,FP,ppv:TP+FP?TP/(TP+FP):0,npv:TN+FN?TN/(TN+FN):0}}
  function drawGrid(t){
    const N=vb(gs,'720 340','400 800');
    const L=N?{cols:25,cell:13,gx:37,gy:48,px:24,py:600,bw:250}:{cols:40,cell:11,gx:20,gy:48,px:496,py:60,bw:170};
    const n=nums(),c=L.cell,app=ramp(t,0,.3),o1=ramp(t,.32,.5),o2=ramp(t,.6,.8),o3=ramp(t,.82,1);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const head=t<.32?'1,000 people tested':t<.6?`${n.D} truly have amyloid pathology (${Math.round(n.pre*100)}%)`:`${n.TP+n.FP} positive results, ${n.TN+n.FN} negative`;
    s+=`<text x="${L.gx}" y="30" class="t-lbl">${head}</text>`;
    for(let i=0;i<1000;i++){if(i/1000>=app)break;
      const x=L.gx+(i%L.cols)*c+c/2,y=L.gy+Math.floor(i/L.cols)*c+c/2,dis=i<n.D,tp=i<n.TP,fp=!dis&&i<n.D+n.FP;
      if(dis){if(o1<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.16)}" style="fill:var(--muted);opacity:${f1(1-o1)}"/>`;
        if(o1>0){if(!tp||o2<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.32)}" style="fill:none;stroke:var(--rose);stroke-width:1.5;opacity:${f1(tp?o1*(1-o2):o1)}"/>`;
          if(tp&&o2>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.38)}" style="fill:var(--rose);opacity:${f1(o2)}"/>`}}
      else if(fp){if(o2<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.16)}" style="fill:var(--muted);opacity:${f1(1-o2)}"/>`;
        if(o2>0)s+=`<rect x="${f1(x-c*.32)}" y="${f1(y-c*.32)}" width="${f1(c*.64)}" height="${f1(c*.64)}" rx="1.5" style="fill:var(--amber);opacity:${f1(o2)}"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.16)}" style="fill:var(--muted)"/>`}
    /* legend and predictive values */
    const LG=[ ['tp','True positive',n.TP,'has it, test positive'],['fn','False negative',n.FN,'has it, test negative'],['fp','False positive',n.FP,'does not, test positive'],['tn','True negative',n.TN,'does not, test negative'] ];
    LG.forEach(([k,l,v,d],i)=>{const x=N?L.px+(i%2)*186:L.px,y=N?L.py+Math.floor(i/2)*42:L.py+i*42,show=o2;
      let mk=k==='tp'?`<circle cx="${x+6}" cy="${y-4}" r="6" style="fill:var(--rose)"/>`:k==='fn'?`<circle cx="${x+6}" cy="${y-4}" r="5" style="fill:none;stroke:var(--rose);stroke-width:1.8"/>`:k==='fp'?`<rect x="${x}" y="${y-10}" width="12" height="12" rx="2" style="fill:var(--amber)"/>`:`<circle cx="${x+6}" cy="${y-4}" r="2.5" style="fill:var(--muted)"/>`;
      s+=`<g style="opacity:${f1(.25+.75*show)}">${mk}<text x="${x+20}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:600">${l} <tspan style="font-weight:700">${show>0?v:'–'}</tspan></text><text x="${x+20}" y="${y+14}" class="t-xs">${d}</text></g>`});
    if(o3>0){const by=N?L.py+88:L.py+176;
      [ ['Positive predictive value',n.ppv,'var(--rose)',`${n.TP} of ${n.TP+n.FP} positives are true`],['Negative predictive value',n.npv,'var(--sage)',`${n.TN} of ${n.TN+n.FN} negatives are true`] ].forEach(([l,v,col,d],i)=>{const y=by+i*(N?58:56);
        s+=`<g style="opacity:${f1(o3)}"><text x="${L.px}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:600">${l}</text><rect x="${L.px}" y="${y+6}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.px}" y="${y+6}" width="${f1(L.bw*v*ease(o3))}" height="14" rx="4" style="fill:${col}"/><text x="${L.px+L.bw+(N?-4:6)}" y="${y+(N?0:18)}" class="t-lbl ${N?'t-end':''}">${Math.round(v*100)}%</text><text x="${L.px}" y="${y+33}" class="t-xs">${d}</text></g>`})}
    gs.innerHTML=s;
    const p=phaseOf(DX_GSTEPS,t),P=DX_GSTEPS[p];let txt;
    if(p===0)txt=`Imagine 1,000 people like the person in front of the clinician, all given the same test.`;
    else if(p===1)txt=`With a pre-test probability of ${Math.round(n.pre*100)}%, ${n.D} of the 1,000 truly have amyloid pathology (rings) and ${n.H} do not.`;
    else txt=`Sensitivity ${Math.round(n.sens*100)}% finds ${n.TP} of the ${n.D} with pathology and misses ${n.FN}. Specificity ${Math.round(n.spec*100)}% clears ${n.TN} of the ${n.H} without it, but ${n.FP} test positive anyway. So a positive result is right ${Math.round(n.ppv*100)}% of the time (PPV), and a negative result ${Math.round(n.npv*100)}% of the time (NPV).`;
    $('#dxGridNote').innerHTML=noteHTML({k:P.k+' · teaching tool',t:P.t,txt:txt+` The 2025 Alzheimer's Association guideline, for specialised memory care only, says a blood test with at least 90% sensitivity and 75% specificity can triage, with positives confirmed by PET or CSF, and one with at least 90% and 90% can substitute for them. Both are conditional recommendations on low-certainty evidence, and many commercial tests miss these thresholds. [[Palmqvist2025CPG]]`,
      pt:`The same test gives more false alarms when the condition is rarer in the people tested. The 2025 guideline covers only specialised memory care, not primary care or people without symptoms.`,
      hook:`Sensitivity and specificity belong to the test. PPV and NPV also depend on pre-test probability. Low prevalence: good NPV, poor PPV. The primary-care test was cleared to help rule out, and its reported 97.9% NPV depends on the low prevalence of the people studied. [[Roche2025]]`});
    gr.setAttribute('aria-valuetext',`${P.t}. PPV ${Math.round(n.ppv*100)}%, NPV ${Math.round(n.npv*100)}%`);
  }
  const gstop=playWire(gr,$('#dxGridPlay'),drawGrid,9000,'Replay','dx');
  const sync=()=>{$('#dxSensV').textContent=se.value+'%';$('#dxSpecV').textContent=sp.value+'%';$('#dxPreV').textContent=pr.value+'%';
    $$('#m-dx [data-sens]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sens===se.value&&b.dataset.spec===sp.value));
    $$('#m-dx [data-pre]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pre===pr.value));
    gstop();if(+gr.value<.82)gr.value=1;drawGrid(+gr.value)};
  [se,sp,pr].forEach(r=>r.addEventListener('input',sync));
  $$('#m-dx [data-sens]').forEach(b=>b.onclick=()=>{se.value=b.dataset.sens;sp.value=b.dataset.spec;sync()});
  $$('#m-dx [data-pre]').forEach(b=>b.onclick=()=>{pr.value=b.dataset.pre;sync()});

  /* ---------- 3. criteria compared ---------- */
  let prof=0;
  function drawCrit(){
    $('#dxCrit').innerHTML=DX_CRIT.map(c=>`<div class="card">${c.ev}<div class="kicker">${c.n}</div><h4>${c.h}</h4><p>${c.d}</p><div class="verdict"><b>For this person</b>${c.v[prof]}</div></div>`).join('')+
      `<div class="card"><div class="pt"><b>In plain words</b>Everyone agrees on what the tests measure. They disagree on whether a person with a positive test and no symptoms "has Alzheimer's" or is "at risk".</div><div class="hook"><b>Exam hook</b>2018 ATN: Alzheimer's disease needs A+T+. 2024 Alzheimer's Association: one Core 1 biomarker is enough. IWG 2024: amyloid-only people without symptoms are "at risk", not diseased. [[Jack2018,Jack2024,Dubois2024]]</div></div>`;
    $$('#m-dx [data-prof]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.prof===prof));
  }
  $$('#m-dx [data-prof]').forEach(b=>b.onclick=()=>{prof=+b.dataset.prof;drawCrit()});
  drawCrit();
  draw(+rg.value);drawGrid(+gr.value);
};
