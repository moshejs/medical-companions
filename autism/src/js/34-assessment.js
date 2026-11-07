/* =============== 3.4 The diagnostic assessment =============== */
const AS_FROM=[0,.17,.34,.5,.67,.84];
const AS_CHILD=[
 {k:'Station 1 · Primary care',t:'Surveillance & screening',lab:['Surveillance','& screening'],
  txt:`Development is watched at every routine visit, and the AAP recommends an autism-specific screen at 18 and 24 months on top of that surveillance. [[Hyman2020]] A screen only raises the possibility of autism and cannot confirm it; a negative screen does not rule autism out when other information points to developmental differences. [[Fuentes2021ESCAP]] In a UK survey of 1,047 parents, families typically waited about a year after first concerns before seeking help. [[Crane2016Diagnosis]]`,
  pt:`A questionnaire at a check-up is a first look, not an answer. A parent's worry is a good reason to ask for a closer look.`,
  hook:`AAP: autism-specific screening at 18 and 24 months, plus developmental surveillance at every visit. [[Hyman2020]]`},
 {k:'Station 2 · Referral',t:'Referral & the wait',lab:['Referral','& the wait'],
  txt:`A positive screen, or a concern raised by a family, teacher or clinician, leads to referral for a diagnostic assessment. In the UK survey, the delay from first approaching a professional to a confirmed diagnosis was about 3.5 years, and just over half of parents were dissatisfied with the process. [[Crane2016Diagnosis]] In a Utah health system, screen-positive children were diagnosed earlier than unscreened children (38.5 vs 48.5 months). [[Carbone2020]]`,
  pt:`Getting from a first worry to a diagnosis often takes years, not weeks.`,
  hook:`Screen-positive vs unscreened toddlers in Utah: diagnosed at 38.5 vs 48.5 months. [[Carbone2020]]`},
 {k:'Station 3 · Assessment',t:'History & observation',lab:['History &','observation'],
  txt:`The reference standard combines a semistructured caregiver interview with semistructured direct observation. [[Hirota2023]] The ADI-R interview is usable from a mental age of about 18 months into adulthood. [[Lord1994]] The ADOS observes social interaction, communication, play and imaginative use of materials, in four modules of about 30 minutes chosen by expressive language, [[Lord2000]] with a Toddler Module under 30 months that reports a "range of concern". [[Luyster2009]]`,
  pt:`One part is a long talk with the family about the early years. The other is a planned play session in which the clinician watches how the child communicates and plays.`,
  hook:`ADI-R = caregiver interview; ADOS-2 = direct observation. Neither alone makes the diagnosis. [[Fuentes2021ESCAP]]`},
 {k:'Station 4 · Assessment',t:'Development, senses & medical',lab:['Development','& medical'],
  txt:`The ESCAP minimum assessment adds developmental level and language, a physical and sensory examination (hearing, vision and a neurological screen), emotional and behavioural difficulties, and socio-environmental factors. [[Fuentes2021ESCAP]] If the examination finds no specific problem, EEG and neuroimaging are usually not needed. [[Fuentes2021ESCAP]] Chromosomal microarray, the first-tier genetic test for unexplained developmental delay or autism, finds a cause in 15–20%, against about 3% for a karyotype. [[Miller2010CMA]]`,
  pt:`Hearing is checked, because repeatedly not answering to one's name counts as an autism sign only when hearing is normal. Blood tests and scans cannot diagnose autism. [[Araujo2026,Hirota2023]]`,
  hook:`CMA yield 15–20% vs karyotype ≈3% [[Miller2010CMA]]; exome sequencing ≈36% across neurodevelopmental disorders. [[Srivastava2019]]`},
 {k:'Station 5 · Diagnosis',t:'Feedback & report',lab:['Feedback','& report'],
  txt:`No single instrument decides: the diagnosis rests on expert clinical judgement using information from all relevant sources. [[Fuentes2021ESCAP]] In the 2022 ADDM data, the median age at earliest known diagnosis among 8-year-olds was 47 months, from 36 months in California to 69.5 months in Laredo, Texas. [[Shaw2025]] Early diagnoses mostly hold: overall stability was 0.84 in toddlers evaluated at 12–36 months. [[Pierce2019]]`,
  pt:`The team puts all the pieces together and talks them through with the family. It is their judgement, not one test score.`,
  hook:`ADDM 2022: median age at diagnosis 47 months (site range 36–69.5). [[Shaw2025]]`},
 {k:'Station 6 · After the diagnosis',t:'Post-diagnostic support',lab:['Post-diagnostic','support'],
  txt:`A diagnosis should open the way to support. Autistic children have service needs across behavioural, educational, health, leisure and family-support areas, chosen with families through shared decision-making. [[Hyman2020]] Co-occurring conditions should be assessed routinely. [[Simonoff2008,Lai2019]] Parents in the UK survey rated post-diagnostic support as unsatisfactory; [[Crane2016Diagnosis]] in one trial, an online group programme improved caregivers' mental health at 52 weeks <span class="ev early">Early evidence</span>. [[Leadbitter2025]]`,
  pt:`The diagnosis is a start, not an end: it should lead to help at home, at school and with health.`,
  hook:`70% of autistic 10–14-year-olds had at least one co-occurring psychiatric disorder: always look for them. [[Simonoff2008]]`}
];
const AS_ADULT=[
 {k:'Station 1 · Recognition',t:'Autism noticed in adulthood',lab:['Noticed in','adulthood'],
  txt:`Recorded autism incidence in UK primary care rose 787% between 1998 and 2018, most steeply in adults and in females, which suggests better recognition rather than a true rise alone. [[Russell2022]] In England, 2.94% of 10–14-year-olds have a recorded diagnosis against 0.02% of people aged 70 or older, and an estimated 59–72% of autistic people may be undiagnosed. [[ONions2023]]`,
  pt:`Many autistic adults grew up before autism was well understood. It is never too late to ask for an assessment. [[ONions2023,Russell2022]]`,
  hook:`An estimated 59–72% of autistic people in England may be undiagnosed. [[ONions2023]]`},
 {k:'Station 2 · Screening',t:'A short questionnaire',lab:['Short','questionnaire'],
  txt:`The AQ-10 is a ten-item questionnaire. In a case-control sample, the adult version at a cut-point of 6 had sensitivity 0.88, specificity 0.91 and PPV 0.85, [[Allison2012]] but case-control accuracy is usually higher than in real clinics. [[Allison2012,Ashwood2016]] In 476 adults referred to a UK service, the full AQ did not significantly predict diagnosis (specificity 0.29), 64% of those below the cutoff were in fact autistic, and generalised anxiety raised scores. [[Ashwood2016]]`,
  pt:`Online autism quizzes measure traits. They cannot tell you whether you are autistic, and stress or anxiety can raise scores. [[Ashwood2016]]`,
  hook:`Adult AQ-10 cut-point 6: sensitivity 0.88, specificity 0.91 in case-control data [[Allison2012]]; full AQ specificity in a referral clinic: 0.29. [[Ashwood2016]]`},
 {k:'Station 3 · Assessment',t:'Interview & informant history',lab:['Interview &','informant'],
  txt:`First diagnosis in adulthood is harder: there may be no one to give a developmental history, the person may have learned camouflaging strategies, and co-occurring conditions are common. [[Lai2015LancetPsych]] Camouflaging combines masking and compensation to fit in, at a cost that includes exhaustion. [[Hull2017]] The criteria allow for this: features are present in early development but may be masked later by learned strategies. [[APA2022]]`,
  pt:`The team asks about childhood as well as now, because autism starts early even when it is noticed late. [[APA2022]]`,
  hook:`Why adult diagnosis is harder: missing developmental history, camouflaging, co-occurring conditions. [[Lai2015LancetPsych]]`},
 {k:'Station 4 · Differentials',t:'Earlier diagnoses',lab:['Earlier','diagnoses'],
  txt:`In 1,211 Dutch autistic adults, 24.6% reported an earlier psychiatric diagnosis they saw as a misdiagnosis: 31.7% of women and 16.7% of men; personality disorder was the most frequent. [[Kentrou2024]] In 161 adults diagnosed in two Italian centres, two thirds had received other diagnoses first, most often intellectual disability, psychoses, personality disorders and depression. [[FusarPoli2022]] These may be misdiagnoses, true co-occurring conditions, or both. [[Lai2015LancetPsych,Kentrou2024]]`,
  pt:`Some adults are given a different diagnosis before autism is recognised, women more often than men. [[Kentrou2024]]`,
  hook:`Reported misdiagnosis: 31.7% of autistic women vs 16.7% of men; personality disorder most often. [[Kentrou2024]]`},
 {k:'Station 5 · Diagnosis',t:'Diagnosis, often late',lab:['Diagnosis,','often late'],
  txt:`In the Italian centres, the median age at autism diagnosis was 23 years; the first mental-health evaluation had been at a median of 13, an 11-year gap. [[FusarPoli2022]] Girls who meet criteria are at disproportionate risk of not being diagnosed, [[Loomes2017]] and in a Dutch survey of 2,275 autistic people, adult women with autistic disorder were identified later than men. [[Begeer2013]]`,
  pt:`Many women are diagnosed late. Some describe "pretending to be normal" for years, and professionals missing their autism because of their gender. [[Bargiela2016]]`,
  hook:`Late-diagnosed adults: first mental-health contact at a median of 13, autism diagnosis at 23. [[FusarPoli2022]]`},
 {k:'Station 6 · After the diagnosis',t:'Post-diagnostic support',lab:['Post-diagnostic','support'],
  txt:`A scoping review found that adults often feel strong emotions after diagnosis, that adult pathways are unclear and inconsistent, and that post-diagnostic support is scarce. [[Huang2020]] Nine adults diagnosed after 50 had previously been treated for anxiety and depression, and saw the diagnosis as positive, allowing a "reconfiguration of self". [[Stagg2019]]`,
  pt:`Relief, grief or both are common after a late diagnosis. Meeting other autistic people and finding the right support can help make sense of it.`,
  hook:`Adult post-diagnostic services are scarce; the route to diagnosis is unclear and variable. [[Huang2020]]`}
];
AS_CHILD.forEach((s,i)=>{s.from=AS_FROM[i];s.at=AS_FROM[i]+.08});
AS_ADULT.forEach((s,i)=>{s.from=AS_FROM[i];s.at=AS_FROM[i]+.08});

/* differential matrix content */
const AS_DD={
 lang:{n:'Language disorder / social (pragmatic) communication disorder',
  sh:`Late or limited speech. No single words by 16 months and no two-word phrases by 24 months are red flags for autism, but they predict more when combined with social differences. [[Araujo2026]]`,
  au:`Social-communication differences together with restricted, repetitive behaviours, now or in the past. [[APA2022,Norbury2014]] Requiring both parent report and clinician observation improved specificity against non-autism diagnoses such as language disorder. [[Huerta2012]]`,
  ot:`Social (pragmatic) communication disorder: social-communication difficulty without restricted or repetitive behaviours, current or past. [[Norbury2014,Fuentes2021ESCAP]]`,
  v:'yes',vt:`Can co-occur. DSM-5-TR records accompanying language impairment as a specifier. [[APA2022]]`},
 id:{n:'Intellectual disability or global developmental delay',
  sh:`Development is delayed across areas. Many children with profound intellectual disability develop in ways that resemble autism. [[Fuentes2021ESCAP]]`,
  au:`Social communication is below what is expected for the person's general developmental level. [[APA2022]] A developmental assessment is crucial to tell them apart. [[Fuentes2021ESCAP]]`,
  ot:`Social communication broadly in line with overall developmental level; the differences are better explained by the intellectual disability. [[APA2022]]`,
  v:'yes',vt:`Can co-occur, often: 39.6% of autistic 8-year-olds with cognitive data in ADDM 2022 had intellectual disability. [[Shaw2025]]`},
 adhd:{n:'ADHD',
  sh:`Trouble with attention and social difficulties can appear in both; social (pragmatic) communication difficulties overlap with ADHD too. [[Norbury2014]]`,
  au:`Autism needs all three social-communication criteria and at least two restricted or repetitive patterns. [[APA2022,Fuentes2021ESCAP]]`,
  ot:`ADHD criteria centre on inattention and hyperactivity-impulsivity, not on social communication or repetitive patterns. [[APA2022]] More in the <a href="%SITE%/adhd/">ADHD Companion</a>.`,
  v:'yes',vt:`Can co-occur, often: 28% pooled prevalence of ADHD in autistic people [[Lai2019]]; autistic people in Sweden had 22 times the odds of an ADHD diagnosis. [[Ghirardi2018]]`},
 hear:{n:'Hearing loss',
  sh:`Not answering to one's name and delayed speech.`,
  au:`Repeated failure to respond to name at 9–12 months despite normal hearing is an early autism sign. [[Araujo2026]]`,
  ot:`A physical and sensory examination, including hearing and vision, is part of the minimum assessment. [[Fuentes2021ESCAP]]`,
  v:'yes',vt:`Can co-occur: autism is more common with profound deafness, and diagnosis is harder there. [[Fuentes2021ESCAP]]`},
 sanx:{n:'Social anxiety',
  sh:`Avoiding social situations. Anxiety can raise autism-questionnaire scores: in adult referrals, generalised anxiety disorder appeared to "mimic" autism and caused false positives on the AQ. [[Ashwood2016]]`,
  au:`Differences present from the early developmental period, even if masked later, plus restricted or repetitive patterns. [[APA2022]]`,
  ot:`Without social-communication differences from early development, the autism criteria are not met. [[APA2022]]`,
  v:'yes',vt:`Can co-occur, often: social anxiety disorder in 29.2% of autistic 10–14-year-olds [[Simonoff2008]]; any anxiety disorder 20% pooled. [[Lai2019]]`},
 ocd:{n:'Obsessive-compulsive disorder',
  sh:`Repetitive behaviour and insistence on routines (in autism, criteria B1 and B2). [[APA2022]]`,
  au:`In autism, repetitive patterns sit with social-communication differences present from early development. [[APA2022]]`,
  ot:`The link runs both ways in Danish registers: autism raised the risk of a later OCD diagnosis (IRR 2.18), and OCD raised the risk of a later autism diagnosis (IRR 3.91). [[Meier2015]]`,
  v:'yes',vt:`Can co-occur: OCD 9% pooled [[Lai2019]]; 17.4% in autistic young people. [[vanSteensel2011]]`},
 regr:{n:'Regression conditions: Rett syndrome, Landau–Kleffner syndrome',
  sh:`Loss of language or social skills that were there before. About a third of autistic children lose skills (32.1%), at a mean of about 1.8 years. [[Barger2013]]`,
  au:`Autistic regression happens within the autism profile; the full assessment still looks for the two domains. [[APA2022,Barger2013]]`,
  ot:`Consider Rett syndrome (MECP2) with regression, particularly in girls. Landau–Kleffner syndrome presents with sudden language loss and EEG abnormalities after typical development. [[Fuentes2021ESCAP]]`,
  v:'maybe',vt:`A genetic syndrome and autism can coexist; social and repetitive features may be part of the syndrome, which makes diagnosis harder. [[Fuentes2021ESCAP]]`},
 pd:{n:'Personality disorders (adults)',
  sh:`Personality disorder was the most frequent earlier diagnosis that autistic adults later saw as a misdiagnosis. [[Kentrou2024]]`,
  au:`An early developmental history of autistic features, plus restricted or repetitive patterns; that history may be hard to get in adults. [[APA2022,Lai2015LancetPsych]]`,
  ot:`A meta-analysis found borderline personality disorder in 4% of autistic people and autism in 3% of people with BPD, within population ranges; it could not test misdiagnosis directly <span class="ev hyp">Hypothesis</span>. [[May2021BPD]] See the <a href="%SITE%/borderline-personality-disorder/">BPD Companion</a>.`,
  v:'maybe',vt:`Possible: the earlier label may be a misdiagnosis, a true co-occurring condition, or both. [[Lai2015LancetPsych,Kentrou2024]]`},
 psy:{n:'Psychosis (adults)',
  sh:`Psychoses were among the commonest earlier diagnoses in adults diagnosed with autism late. [[FusarPoli2022]]`,
  au:`Autism is a neurodevelopmental condition, not a psychotic disorder, [[Fuentes2021ESCAP]] with features present from early development. [[APA2022]]`,
  ot:`The confusion is old: Bleuler coined "autism" in 1911 for a symptom of schizophrenia. [[Gundel1993]]`,
  v:'yes',vt:`Can co-occur: psychosis in 9.4% of autistic adults [[Varcin2022]]; schizophrenia spectrum disorders 4% pooled. [[Lai2019]]`}
};
const AS_ACC={ados:{n:'ADOS',se:.94,sp:.80},adir:{n:'ADI-R',se:.52,sp:.84},cars:{n:'CARS',se:.80,sp:.88}};

inits.assessment=()=>{
  const svg=$('#asSvg'),rg=$('#asT'),stEl=$('#asSteps');
  let mode='child';
  const ST=AS_CHILD.slice();
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const box=(x,y,w,h,o={})=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${o.r==null?8:o.r}" style="fill:${o.fill||'var(--panel)'};stroke:${o.col||'var(--line)'};stroke-width:${o.sw||1.2}${o.dash?';stroke-dasharray:4 3':''};opacity:${o.op==null?1:o.op}"/>`;
  const doc=(x,y,w,h,lines,fill,col)=>{let g=`<path d="M${f1(x)} ${f1(y)}h${f1(w-14)}l14 14v${f1(h-14)}h${f1(-w)}z" style="fill:var(--panel);stroke:${col||'var(--accent)'};stroke-width:1.4"/><path d="M${f1(x+w-14)} ${f1(y)}v14h14" style="fill:none;stroke:${col||'var(--accent)'};stroke-width:1.2"/>`;
    for(let i=0;i<lines;i++){const on=i<fill;g+=`<rect x="${f1(x+10)}" y="${f1(y+22+i*((h-30)/lines))}" width="9" height="9" rx="2" style="fill:${on?'var(--accent)':'none'};stroke:var(--accent);stroke-width:1"/><line x1="${f1(x+26)}" x2="${f1(x+w-12)}" y1="${f1(y+27+i*((h-30)/lines))}" y2="${f1(y+27+i*((h-30)/lines))}" style="stroke:var(--muted);stroke-width:1.4;opacity:.5"/>`}
    return g};
  /* ---- scenes, drawn in a 430 x 240 local box ---- */
  function sceneChild(i,f){let g='';
    if(i===0){g+=doc(30,26,130,180,8,Math.floor(ramp(f,.05,.9)*8.99));g+=T(95,224,'questionnaire','t-xs t-mid');
      g+=face(290,92,34,{gaze:f*360%360<180?20:160,mouth:'smile'})+face(372,112,26,{gaze:180,mouth:'flat',brows:f>.5?'tense':'calm'});
      g+=bubble(318,22,104,26,{text:'is this usual?',think:true,tail:'left'});
      const vx=n=>196+n*6.6;g+=`<line x1="${vx(6)}" x2="${vx(36)}" y1="196" y2="196" style="stroke:var(--muted);stroke-width:1.4"/>`;
      [9,18,24,30].forEach(m=>{const sc=m===18||m===24,on=f>(m-6)/30;g+=`<circle cx="${f1(vx(m))}" cy="196" r="${sc?7:5}" style="fill:${on?(sc?'var(--accent)':'var(--muted)'):'var(--panel)'};stroke:${sc?'var(--accent)':'var(--muted)'};stroke-width:1.4"/>`+T(vx(m),216,m===30?'30 mo':String(m),'t-xs t-mid')});
      g+=T(vx(21),180,'autism screen 18 &amp; 24 mo','t-xs t-mid','fill:var(--accent);font-weight:600');
      g+=T(300,236,'surveillance at every visit','t-xs t-mid')}
    else if(i===1){g+=box(14,70,92,70,{col:'var(--muted)'})+T(60,98,'Primary','t-lbl t-mid')+T(60,114,'care','t-lbl t-mid');
      g+=box(324,60,96,90,{col:'var(--accent)',fill:'var(--accent-soft)'})+T(372,92,'Autism','t-lbl t-mid')+T(372,108,'team','t-lbl t-mid')+T(372,128,'assessment','t-xs t-mid');
      const n=7;for(let k=0;k<n;k++){const adv=ramp(f,.1,.95)*n,x=300-k*28+Math.min(adv,k+1)*0;const gone=k<Math.floor(adv*.6);g+=person(lerp(296-k*26,320,gone?1:0),150,30,gone?'var(--accent)':'var(--muted)',{op:gone?0:.85})}
      g+=T(212,198,'waiting list','t-xs t-mid');
      const ex=lerp(110,300,ease(ramp(f,0,.5))),ey=88-30*bump(f,0,.5);
      g+=`<g transform="translate(${f1(ex)} ${f1(ey)})"><rect x="-16" y="-11" width="32" height="22" rx="3" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.5"/><path d="M-16 -11L0 2L16 -11" style="fill:none;stroke:var(--accent);stroke-width:1.3"/></g>`;
      g+=T(205,40,'referral','t-sm t-mid','fill:var(--accent)');
      g+=T(215,216,'UK survey: ≈3.5 years from first','t-xs t-mid','fill:var(--ink)')+T(215,230,'professional to diagnosis','t-xs t-mid','fill:var(--ink)')}
    else if(i===2){g+=box(4,8,206,224,{fill:'var(--field)'})+box(220,8,206,224,{fill:'var(--field)'});
      g+=T(107,30,'ADI-R · caregiver interview','t-sm t-mid','fill:var(--accent);font-weight:600');
      g+=face(60,140,28,{gaze:0,mouth:f>.4?'open':'smile'})+face(156,140,28,{gaze:180,mouth:'flat'});
      const qs=['early years?','first words?','play &amp; friends?','routines?'],qi=Math.min(3,Math.floor(f*4));
      g+=bubble(108,52,96,26,{text:qs[qi],tail:'right'})+bubble(12,62,80,26,{text:'…',tail:'left'});
      g+=T(107,196,'from mental age ≈18 months','t-xs t-mid')+T(107,210,'into adulthood','t-xs t-mid');
      g+=T(323,30,'ADOS-2 · observation','t-sm t-mid','fill:var(--accent);font-weight:600');
      g+=face(282,120,26,{gaze:60+40*Math.sin(f*12),mouth:'smile'});
      const nb=1+Math.floor(f*4.99);for(let k=0;k<nb;k++)g+=`<rect x="${f1(300+((k%2)*4))}" y="${f1(176-k*14)}" width="22" height="13" rx="2" style="fill:${['var(--brand)','var(--rx)','var(--neuro)','var(--sense)','var(--accent)'][k]};opacity:.85"/>`;
      g+=face(386,104,22,{gaze:160,mouth:'flat'});
      g+=`<path d="M368 136l-14 8" style="stroke:var(--muted);stroke-width:1.3"/><ellipse cx="386" cy="148" rx="16" ry="9" style="fill:none;stroke:var(--muted);stroke-width:1.2"/><circle cx="386" cy="148" r="3.5" style="fill:var(--muted)"/>`;
      g+=T(323,210,'4 modules ≈30 min + Toddler','t-xs t-mid')+T(323,224,'module under 30 months','t-xs t-mid')}
    else if(i===3){const tiles=[['Development','& cognition'],['Language'],['Adaptive','skills'],['Hearing','& vision'],['Physical &','neuro exam'],['Genetics','if indicated']];
      tiles.forEach((tt,k)=>{const cx=k%3,cy=Math.floor(k/3),x=10+cx*142,y=14+cy*112,on=ramp(f,k*.13,k*.13+.15);
        g+=box(x,y,130,100,{col:on>.5?'var(--accent)':'var(--line)',fill:on>.5?'var(--accent-soft)':'var(--panel)',sw:on>.5?2:1.2});
        g+=`<circle cx="${x+22}" cy="${y+24}" r="10" style="fill:${on>.5?'var(--accent)':'var(--panel-2)'}"/>`+T(x+22,y+28,on>.5?'✓':String(k+1),'t-xs t-mid',on>.5?'fill:#fff;font-weight:700':'');
        tt.forEach((ln,j)=>g+=T(x+65,y+56+j*15,ln,'t-lbl t-mid'))});
      g+=T(355,108+112,'CMA yield 15–20%','t-xs t-mid','fill:var(--accent);opacity:'+f1(ramp(f,.75,.9)))}
    else if(i===4){const ins=['Interview','Observation','Development','Medical','Home &amp; school'];
      ins.forEach((n,k)=>{const y=22+k*46,p=ramp(f,k*.08,k*.08+.45);g+=box(4,y,110,30,{col:'var(--accent)'})+T(59,y+19,n,'t-xs t-mid','fill:var(--ink)');
        g+=`<path d="M114 ${y+15}Q170 ${y+15} 206 120" style="fill:none;stroke:var(--accent);stroke-width:1.3;opacity:.45"/>`;
        const qx=lerp(114,206,p),qy=lerp(y+15,120,p*p);if(p>0&&p<1)g+=`<circle cx="${f1(qx)}" cy="${f1(qy)}" r="4" style="fill:var(--accent)"/>`});
      const gl=ramp(f,.4,.7);g+=`<circle cx="236" cy="120" r="${f1(30+6*gl)}" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/>`+T(236,116,'Clinical','t-xs t-mid','fill:var(--ink);font-weight:600')+T(236,129,'judgement','t-xs t-mid','fill:var(--ink);font-weight:600');
      const r=ramp(f,.65,.95);g+=`<path d="M272 120H${f1(lerp(272,322,r))}" style="stroke:var(--accent);stroke-width:2"/>`;
      g+=`<g style="opacity:${f1(r)}">`+doc(326,58,92,124,4,Math.floor(r*4.99),'var(--accent)')+T(372,198,'feedback &amp;','t-xs t-mid')+T(372,211,'written report','t-xs t-mid')+'</g>'}
    else {const sp=['Family support','Education','Speech &amp; language','Co-occurring check','Sleep, gut, health','Play &amp; leisure'];
      g+=`<circle cx="215" cy="120" r="44" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/>`+T(215,116,'Child','t-lbl t-mid')+T(215,132,'&amp; family','t-lbl t-mid');
      sp.forEach((n,k)=>{const a=-Math.PI/2+k*Math.PI/3,p=ease(ramp(f,k*.1,k*.1+.35)),ex=215+Math.cos(a)*lerp(46,142,p),ey=120+Math.sin(a)*lerp(46,92,p);
        g+=`<line x1="${f1(215+Math.cos(a)*44)}" y1="${f1(120+Math.sin(a)*44)}" x2="${f1(ex)}" y2="${f1(ey)}" style="stroke:var(--accent);stroke-width:1.4;opacity:.6"/>`;
        if(p>.05)g+=`<g style="opacity:${f1(p)}"><rect x="${f1(ex-64)}" y="${f1(ey-12)}" width="128" height="24" rx="12" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.3"/>`+T(ex,ey+4,n,'t-xs t-mid','fill:var(--ink)')+'</g>'})}
    return g}
  function sceneAdult(i,f){let g='';
    if(i===0){const n=50;for(let k=0;k<n;k++){const cx=k%10,cy=Math.floor(k/10),x=40+cx*36,y=20+cy*38;
        const und=k<30,unc=k>=30&&k<36,show=ramp(f,.1,.9)*n>k;
        g+=person(x,y,30,und?'var(--panel-2)':unc?'var(--accent-soft)':'var(--accent)',{op:show?1:.25});
        if(und&&show)g+=`<circle cx="${x}" cy="${y+5}" r="5" style="fill:none;stroke:var(--muted);stroke-dasharray:2 2"/>`}
      g+=T(215,220,'England: an estimated 59–72% of autistic','t-xs t-mid','fill:var(--ink)')+T(215,234,'people may be undiagnosed (hollow)','t-xs t-mid','fill:var(--ink)')}
    else if(i===1){const sc=Math.floor(ramp(f,.05,.85)*7.99);g+=doc(30,20,150,190,10,sc);
      g+=T(105,228,'ten-item questionnaire (schematic)','t-xs t-mid');
      const X=v=>220+v*19;g+=`<line x1="${X(0)}" x2="${X(10)}" y1="110" y2="110" style="stroke:var(--muted);stroke-width:1.5"/>`;
      for(let v=0;v<=10;v++)g+=`<line x1="${X(v)}" x2="${X(v)}" y1="105" y2="115" style="stroke:var(--muted)"/>`+T(X(v),130,String(v),'t-xs t-mid');
      g+=`<line x1="${X(6)}" x2="${X(6)}" y1="70" y2="118" style="stroke:var(--accent);stroke-width:2;stroke-dasharray:4 3"/>`+T(X(6),64,'cut-point 6','t-xs t-mid','fill:var(--accent);font-weight:600');
      g+=`<circle cx="${f1(X(sc))}" cy="110" r="8" style="fill:${sc>=6?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:2"/>`+T(X(sc),94,'score '+sc,'t-xs t-mid','fill:var(--ink)');
      g+=T(315,160,sc>=6?'above the cut-point':'below: not a "no"','t-xs t-mid','fill:var(--ink)');
      g+=T(315,180,'in a clinic, 64% below','t-xs t-mid')+T(315,194,'the AQ cutoff were autistic','t-xs t-mid');
      g+=T(315,222,'teaching example only','t-xs t-mid','fill:var(--accent)')}
    else if(i===2){g+=box(4,8,206,224,{fill:'var(--field)'})+box(220,8,206,224,{fill:'var(--field)'});
      g+=T(107,30,'masking, then unmasking','t-sm t-mid','fill:var(--accent);font-weight:600');
      g+=face(107,118,40,{gaze:null,mouth:f<.5?'smile':'flat'});
      const m=1-ramp(f,.3,.8);if(m>0)g+=`<g style="opacity:${f1(m)}" transform="translate(0 ${f1(-30*(1-m))})"><path d="M62 104Q107 80 152 104Q150 150 107 156Q64 150 62 104Z" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/><ellipse cx="92" cy="114" rx="8" ry="5" style="fill:var(--field)"/><ellipse cx="122" cy="114" rx="8" ry="5" style="fill:var(--field)"/><path d="M90 136Q107 146 124 136" style="fill:none;stroke:var(--accent);stroke-width:2"/></g>`;
      g+=T(107,190,'camouflaging: masking','t-xs t-mid')+T(107,204,'+ compensation, to fit in','t-xs t-mid');
      g+=T(323,30,'informant history','t-sm t-mid','fill:var(--accent);font-weight:600');
      g+=face(268,110,24,{gaze:0,mouth:'smile',col:'var(--skin)'})+face(372,110,24,{gaze:180,mouth:f>.3?'open':'flat'});
      g+=bubble(320,52,98,26,{text:'as a child…',tail:'right'});
      g+=`<g style="opacity:${f1(ramp(f,.4,.7))}">`+doc(286,150,70,66,3,3)+'</g>';
      g+=T(400,190,'records','t-xs t-mid')+T(400,204,'if any','t-xs t-mid')}
    else if(i===3){const lb=['Depression','Anxiety','Personality disorder','Psychosis'];
      lb.forEach((n,k)=>{const p=ramp(f,k*.12,k*.12+.2),y=24+k*38;g+=`<g style="opacity:${f1(p)}">`+box(10+k*8,y,170,30,{col:'var(--muted)',dash:true})+T(95+k*8,y+19,n,'t-xs t-mid','fill:var(--ink)')+'</g>'});
      const pa=ramp(f,.55,.75);g+=`<g style="opacity:${f1(pa)}">`+box(42,180,170,32,{col:'var(--accent)',fill:'var(--accent-soft)',sw:2})+T(127,200,'Autism','t-lbl t-mid')+'</g>';
      g+=T(320,30,'reported earlier misdiagnosis','t-sm t-mid','fill:var(--accent);font-weight:600');
      [['Women',31.7],['Men',16.7]].forEach(([n,v],k)=>{const h=150*v/40*ramp(f,.2,.8),x=262+k*76;
        g+=`<rect x="${x}" y="${f1(200-h)}" width="48" height="${f1(h)}" rx="3" style="fill:${k?'var(--accent-soft)':'var(--accent)'};stroke:var(--accent)"/>`+T(x+24,192-h,f1(v*ramp(f,.2,.8))+'%','t-xs t-mid','fill:var(--ink)')+T(x+24,216,n,'t-xs t-mid')});
      g+=`<line x1="250" x2="400" y1="200" y2="200" class="axis"/>`+T(325,232,'1,211 Dutch autistic adults','t-xs t-mid')}
    else if(i===4){const ins=['Self-report','Interview','Informant','Observation','Health history'];
      ins.forEach((n,k)=>{const y=22+k*46,p=ramp(f,k*.08,k*.08+.45);g+=box(4,y,118,30,{col:'var(--accent)'})+T(63,y+19,n,'t-xs t-mid','fill:var(--ink)');
        g+=`<path d="M122 ${y+15}Q172 ${y+15} 206 120" style="fill:none;stroke:var(--accent);stroke-width:1.3;opacity:.45"/>`;
        const qx=lerp(122,206,p),qy=lerp(y+15,120,p*p);if(p>0&&p<1)g+=`<circle cx="${f1(qx)}" cy="${f1(qy)}" r="4" style="fill:var(--accent)"/>`});
      const gl=ramp(f,.4,.7);g+=`<circle cx="238" cy="120" r="${f1(30+6*gl)}" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/>`+T(238,116,'Clinical','t-xs t-mid','fill:var(--ink);font-weight:600')+T(238,129,'judgement','t-xs t-mid','fill:var(--ink);font-weight:600');
      const r=ramp(f,.6,.95);g+=`<g style="opacity:${f1(r)}">`+T(346,100,'median age','t-xs t-mid')+`<text x="346" y="136" class="t-mid" style="font:800 34px var(--display);fill:var(--accent)">23</text>`+T(346,156,'years at diagnosis','t-xs t-mid')+T(346,170,'(two Italian centres)','t-xs t-mid')+'</g>'}
    else {const sp=['Information','Autistic peers','Mental health care','Work &amp; study','Relationships','Health checks'];
      g+=`<circle cx="215" cy="120" r="44" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/>`+T(215,112,'Relief,','t-xs t-mid','fill:var(--ink);font-weight:600')+T(215,126,'grief,','t-xs t-mid','fill:var(--ink);font-weight:600')+T(215,140,'or both','t-xs t-mid','fill:var(--ink);font-weight:600');
      sp.forEach((n,k)=>{const a=-Math.PI/2+k*Math.PI/3,p=ease(ramp(f,k*.1,k*.1+.35)),ex=215+Math.cos(a)*lerp(46,142,p),ey=120+Math.sin(a)*lerp(46,92,p);
        g+=`<line x1="${f1(215+Math.cos(a)*44)}" y1="${f1(120+Math.sin(a)*44)}" x2="${f1(ex)}" y2="${f1(ey)}" style="stroke:var(--accent);stroke-width:1.4;opacity:.6;stroke-dasharray:${k%2?'4 3':'none'}"/>`;
        if(p>.05)g+=`<g style="opacity:${f1(p)}"><rect x="${f1(ex-64)}" y="${f1(ey-12)}" width="128" height="24" rx="12" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.3"/>`+T(ex,ey+4,n,'t-xs t-mid','fill:var(--ink)')+'</g>'});
      g+=T(215,236,'adult post-diagnostic support is scarce','t-xs t-mid')}
    return g}
  /* elapsed wait: child in months since first concern (1 y to seek help + 3.5 y to diagnosis); adult in years from first mental-health contact */
  const elapsed=t=>mode==='child'?(t<.17?12*ramp(t,.02,.17):t<.67?12+42*ramp(t,.17,.67):54):(t<.34?0:t<.84?11*ramp(t,.34,.84):11);
  function clock(cx,cy,r,t,N){const e=elapsed(t),mx=mode==='child'?60:12,u=e/mx,ch=mode==='child';let g='';
    g+=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--panel);stroke:var(--line);stroke-width:${f1(r*.18)}"/>`;
    if(u>0){const a1=-Math.PI/2+u*2*Math.PI,lg=u>.5?1:0,rr=r;g+=u>=.999?`<circle cx="${cx}" cy="${cy}" r="${rr}" style="fill:none;stroke:var(--accent);stroke-width:${f1(r*.18)}"/>`:
      `<path d="M${cx} ${f1(cy-rr)}A${rr} ${rr} 0 ${lg} 1 ${f1(cx+Math.cos(a1)*rr)} ${f1(cy+Math.sin(a1)*rr)}" style="fill:none;stroke:var(--accent);stroke-width:${f1(r*.18)}"/>`}
    const tk=ch?[12,24,36,48,60]:[3,6,9,12];tk.forEach(v=>{const a=-Math.PI/2+v/mx*2*Math.PI;g+=`<line x1="${f1(cx+Math.cos(a)*r*.78)}" y1="${f1(cy+Math.sin(a)*r*.78)}" x2="${f1(cx+Math.cos(a)*r*.9)}" y2="${f1(cy+Math.sin(a)*r*.9)}" style="stroke:var(--muted);stroke-width:1.4"/>`});
    if(ch){const a=-Math.PI/2+12/mx*2*Math.PI;g+=`<circle cx="${f1(cx+Math.cos(a)*r)}" cy="${f1(cy+Math.sin(a)*r)}" r="4" style="fill:var(--ink)"/>`}
    const ha=-Math.PI/2+u*2*Math.PI;g+=`<line x1="${cx}" y1="${cy}" x2="${f1(cx+Math.cos(ha)*r*.66)}" y2="${f1(cy+Math.sin(ha)*r*.66)}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/><circle cx="${cx}" cy="${cy}" r="3.5" style="fill:var(--ink)"/>`;
    const big=ch?(e/12).toFixed(1)+' yr':Math.round(e)+' yr';
    g+=`<text x="${cx}" y="${f1(cy+r*.48)}" class="t-mid" style="font:800 ${N?16:18}px var(--display);fill:var(--accent)">${big}</text>`;
    return g}
  function ruler(x0,x1,y,t){let g='';const ch=mode==='child',mx=ch?72:60,X=v=>lerp(x0,x1,v/mx);
    g+=`<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" style="stroke:var(--muted);stroke-width:1.4"/>`;
    (ch?[0,12,24,36,48,60,72]:[0,10,20,30,40,50,60]).forEach(v=>g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y-4}" y2="${y+4}" style="stroke:var(--muted)"/>`+T(X(v),y+15,ch?(v/12)+'y':v+'y','t-xs t-mid'));
    const fin=ramp(t,.62,.75);
    if(ch){g+=`<rect x="${f1(X(36))}" y="${y-7}" width="${f1(X(69.5)-X(36))}" height="14" rx="3" style="fill:var(--accent-soft);opacity:${f1(.3+.7*fin)}"/>`;
      [18,24].forEach(m=>g+=`<path d="M${f1(X(m))} ${y-10}l4 -6h-8z" style="fill:var(--accent)"/>`);
      g+=`<circle cx="${f1(X(47))}" cy="${y}" r="${f1(4+3*fin)}" style="fill:var(--accent)"/>`+T(X(47),y-12,'median 47 mo','t-xs t-mid','fill:var(--ink);font-weight:600;opacity:'+f1(.45+.55*fin))}
    else{g+=`<circle cx="${f1(X(13))}" cy="${y}" r="5" style="fill:var(--muted)"/>`+T(X(13),y-11,'13','t-xs t-mid');
      g+=`<line x1="${f1(X(13))}" x2="${f1(X(lerp(13,23,ramp(t,.34,.84))))}" y1="${y}" y2="${y}" style="stroke:var(--accent);stroke-width:4"/>`;
      g+=`<circle cx="${f1(X(23))}" cy="${y}" r="${f1(4+3*fin)}" style="fill:var(--accent);opacity:${f1(.4+.6*fin)}"/>`+T(X(23)+4,y-11,'23','t-xs','fill:var(--ink);font-weight:600')}
    return g}
  function draw(t){
    const N=vb(svg,'720 380','400 548');
    const p=phaseOf(ST,t),S=ST[p],nf=p<5?AS_FROM[p+1]:1.0001,f=clamp((t-S.from)/(nf-S.from));
    let s='';
    /* pathway */
    const px0=N?34:56,px1=N?366:664,py=N?34:42,PX=k=>lerp(px0,px1,k/5);
    s+=`<line x1="${px0}" x2="${px1}" y1="${py}" y2="${py}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    const tp=p+ (p<5?f*.999:0);s+=`<line x1="${px0}" x2="${f1(lerp(px0,px1,clamp(tp/5)))}" y1="${py}" y2="${py}" style="stroke:var(--accent);stroke-width:4;stroke-linecap:round"/>`;
    ST.forEach((st,k)=>{const x=PX(k),cur=k===p,done=k<p;
      s+=`<circle cx="${f1(x)}" cy="${py}" r="${cur?15:12}" style="fill:${cur||done?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:2"/>`+T(x,py+4,String(k+1),'t-xs t-mid',cur||done?'fill:#fff;font-weight:700':'fill:var(--accent);font-weight:700');
      if(!N)st.lab.forEach((ln,j)=>s+=T(x,py+30+j*12,ln,'t-xs t-mid',cur?'fill:var(--ink);font-weight:600':''))});
    if(N)s+=T(200,py+34,S.t.replace('&','&amp;'),'t-lbl t-mid');
    /* scene panel */
    const sb=N?{x:10,y:84,w:380,h:244}:{x:14,y:86,w:448,h:282};
    s+=box(sb.x,sb.y,sb.w,sb.h,{fill:'var(--field)',r:12});
    const sc=Math.min((sb.w-12)/430,(sb.h-12)/240),ox=sb.x+(sb.w-430*sc)/2,oy=sb.y+(sb.h-240*sc)/2;
    s+=`<g class="${N?'asn':''}" transform="translate(${f1(ox)} ${f1(oy)}) scale(${sc.toFixed(3)})">${mode==='child'?sceneChild(p,f):sceneAdult(p,f)}</g>`;
    /* clock panel */
    const cb=N?{x:10,y:340,w:380,h:200}:{x:474,y:86,w:232,h:282};
    s+=box(cb.x,cb.y,cb.w,cb.h,{r:12});
    const ch=mode==='child';
    if(N){s+=T(cb.x+14,cb.y+22,ch?'TIME SINCE FIRST CONCERN':'FROM FIRST MENTAL-HEALTH CONTACT','t-sm','fill:var(--accent)');
      s+=clock(cb.x+70,cb.y+86,46,t,N);
      const lx=cb.x+136;(ch?['≈1 yr: concern → seeking help','≈3.5 yr: first professional','→ confirmed diagnosis','UK survey, 1,047 parents']:['median 13: first evaluation','median 23: autism diagnosis','an 11-year gap','161 adults, two Italian centres']).forEach((l,k)=>s+=T(lx,cb.y+60+k*16,l,'t-xs',k===3?'':'fill:var(--ink)'));
      s+=T(cb.x+14,cb.y+152,ch?'AGE AT DIAGNOSIS · ADDM 2022':'AGE (YEARS)','t-xs','fill:var(--accent)');
      s+=ruler(cb.x+24,cb.x+cb.w-24,cb.y+174,t)}
    else{s+=T(cb.x+14,cb.y+22,ch?'TIME SINCE FIRST CONCERN':'FROM FIRST MH CONTACT','t-sm','fill:var(--accent)');
      s+=clock(cb.x+cb.w/2,cb.y+100,56,t,N);
      (ch?['≈1 yr concern → help · ≈3.5 yr','help → diagnosis (UK, 1,047 parents)']:['median 13 → median 23:','an 11-year gap (161 adults)']).forEach((l,k)=>s+=T(cb.x+cb.w/2,cb.y+182+k*13,l,'t-xs t-mid',k?'':'fill:var(--ink)'));
      s+=T(cb.x+14,cb.y+222,ch?'AGE AT DIAGNOSIS · ADDM 2022':'AGE (YEARS)','t-xs','fill:var(--accent)');
      s+=ruler(cb.x+18,cb.x+cb.w-18,cb.y+252,t)}
    svg.innerHTML=s;
    setSt(p);
    const e=elapsed(t);
    $('#asRead').innerHTML=`<span>route <b>${ch?'child':'adult'}</b></span><span>station <b>${p+1} of 6 · ${S.t.replace('&','&amp;')}</b></span><span>${ch?'since first concern':'since first mental-health contact'} <b>${ch?(e/12).toFixed(1)+' years':Math.round(e)+' years'}</b></span>`;
    $('#asNote').innerHTML=noteHTML(S);
  }
  const renderSteps=()=>{stEl.innerHTML=ST.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t.replace('&','&amp;')}</span></button>`).join('')};
  const stop=playWire(rg,$('#asPlay'),draw,22000,'Replay','assessment');
  const setSt=stepWire(stEl,ST,rg,draw,stop);
  renderSteps();
  $$('[data-aspath]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.aspath;$$('[data-aspath]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    ST.splice(0,ST.length,...(mode==='child'?AS_CHILD:AS_ADULT));renderSteps();rg.value=ST[0].at;draw(+rg.value)}));
  draw(+rg.value);

  /* ---- accuracy and prevalence ---- */
  const as=$('#asAccSvg'),ap=$('#asAccP'),at=$('#asAccTool');
  function drawAcc(){const N=vb(as,'720 230','400 470'),I=AS_ACC[at.value],P=+ap.value;
    const aut=Math.round(P*100),tp=Math.round(aut*I.se),fn=aut-tp,non=100-aut,tn=Math.round(non*I.sp),fp=non-tn;
    $('#asAccPv').textContent=Math.round(P*100)+'%';
    const cats=[['picked up (true positive)',tp,'var(--accent)'],['missed (false negative)',fn,'var(--accent-soft)'],['wrongly flagged (false positive)',fp,'var(--warn)'],['correctly cleared (true negative)',tn,'var(--panel-2)']];
    let s='',k=0;const cols=N?10:20,dx=N?34:20,dy=N?26:20,x0=N?32:24,y0=N?24:28;
    cats.forEach(([n,c,col],ci)=>{for(let j=0;j<c;j++){const cx=k%cols,cy=Math.floor(k/cols);s+=`<circle cx="${f1(x0+cx*dx)}" cy="${f1(y0+cy*dy)}" r="${N?9:7.5}" style="fill:${col};stroke:${ci===1?'var(--accent)':ci===3?'var(--muted)':col};stroke-width:1.2${ci===1?';stroke-dasharray:2 2':''}"/>`;k++}});
    const lx=N?20:440,ly=N?300:40;
    cats.forEach(([n,c,col],ci)=>{const y=ly+ci*(N?30:28);s+=`<circle cx="${lx+8}" cy="${y-4}" r="7" style="fill:${col};stroke:${ci===1?'var(--accent)':ci===3?'var(--muted)':col};stroke-width:1.2${ci===1?';stroke-dasharray:2 2':''}"/>`+T(lx+24,y,`<tspan style="font-weight:700;fill:var(--ink)">${c}</tspan> ${n}`,'t-sm')});
    const ppv=tp+fp?tp/(tp+fp):0;
    s+=T(lx,ly+(N?136:130),`Of ${tp+fp} flagged, ${Math.round(ppv*100)}% are autistic.`,'t-lbl');
    as.innerHTML=s;
    $('#asAccNote').innerHTML=`<div class="kicker">${I.n} · ${Math.round(P*100)}% autistic among those assessed</div><h4>${tp+fp} of 100 flagged, ${fp} wrongly</h4>
      <p>With sensitivity ${I.se.toFixed(2)} and specificity ${I.sp.toFixed(2)}, ${I.n} picks up ${tp} of ${aut} autistic people and wrongly flags ${fp} of ${non} who are not. Lower the share of autistic people being assessed and false positives make up more of the flags: the review warns that false positives would be more common in lower-prevalence settings. [[Randall2018]]</p>
      <div class="pt"><b>In plain words</b>A tool that is good in a specialist clinic can mislead where few people are autistic. That is one reason the team weighs everything, not one score. [[Fuentes2021ESCAP]]</div>
      <div class="hook"><b>Exam hook</b>Cochrane, preschool: ADOS sensitivity 0.94, specificity 0.80; ADI-R 0.52 and 0.84; CARS 0.80 and 0.88. [[Randall2018]]</div>`;
  }
  ap.addEventListener('input',drawAcc);at.addEventListener('change',drawAcc);
  redraws.assessment=(prev=>()=>{prev&&prev();drawAcc()})(redraws.assessment);
  drawAcc();

  /* ---- differential matrix ---- */
  function drawDd(id){const D=AS_DD[id];
    $('#asDd').innerHTML=`<div class="card"><p class="kicker">Shared features</p><h4>What overlaps</h4><p>${D.sh}</p></div>
      <div class="card mid"><p class="kicker">Points towards autism</p><h4>Autism</h4><p>${D.au}</p></div>
      <div class="card"><p class="kicker">Points towards the other condition</p><h4>${D.n}</h4><p>${D.ot}</p></div>`;
    $('#asDdV').innerHTML=`<div class="verdict ${D.v}">${D.vt}</div>`}
  $$('[data-asdd]').forEach(b=>b.addEventListener('click',()=>{$$('[data-asdd]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawDd(b.dataset.asdd)}));
  drawDd('lang');
};
