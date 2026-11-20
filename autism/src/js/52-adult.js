/* =============== 5.2 Autistic adults =============== */
inits.adult=()=>{
  const svg=$('#adSvg'),rg=$('#adT');let path='child',setSt=()=>{};
  /* age axis: 16–30 gets the first 45% of the time line, 30–50 the next 30%, 50–75 the rest */
  const AG=[[0,16],[.45,30],[.75,50],[1,75]];
  const age=t=>{for(let i=1;i<AG.length;i++)if(t<=AG[i][0])return lerp(AG[i-1][1],AG[i][1],(t-AG[i-1][0])/(AG[i][0]-AG[i-1][0]));return 75};
  const T=a=>{for(let i=1;i<AG.length;i++)if(a<=AG[i][1])return lerp(AG[i-1][0],AG[i][0],(a-AG[i-1][1])/(AG[i][1]-AG[i-1][1]));return 1};
  /* eased interpolation through knots [[age,value],...] */
  const PL=(k,a)=>{if(a<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(a<=k[i][0]){const p=k[i-1],q=k[i];return lerp(p[1],q[1],ease((a-p[0])/(q[0]-p[0])))}return k[k.length-1][1]};
  const P={
    child:{svc:[[16,.82],[16.6,.8],[18,.62],[18.4,.6],[19.2,.26],[25,.22],[40,.18],[62,.2],[75,.32]],
      en:[[16,.74],[18.2,.7],[19.4,.42],[21.5,.66],[25,.68],[27,.5],[29,.12],[30,.14],[32.5,.62],[36,.72],[55,.7],[75,.58]],
      mask:[[16,.45],[26,.55],[29,.6],[31.5,.32],[75,.28]],
      ev:[[17,'transition plan',0,'rx'],[18.4,'leaves school',1,'bad'],[20,'college',2,''],[23,'first job',3,''],[26,'own flat',0,''],[29,'burnout',1,'bad'],[32,'recovery',2,'rx'],[36,'partner',3,''],[62,'health checks',0,'']]},
    late:{svc:[[16,.12],[37.6,.1],[38.4,.4],[42,.2],[62,.18],[75,.3]],
      en:[[16,.7],[19,.58],[21,.64],[23.5,.32],[25.5,.55],[29,.5],[33,.3],[35.5,.06],[37.5,.1],[40,.48],[44,.72],[55,.72],[75,.6]],
      mask:[[16,.72],[30,.85],[37,.92],[39,.6],[44,.34],[75,.3]],
      ev:[[17,'anxiety treated',0,'warn'],[18.4,'leaves school',1,''],[21,'university',2,''],[23.6,'depression',3,'warn'],[28,'job, masked',0,''],[35.5,'burnout',1,'bad'],[38.2,'diagnosis',2,'brand'],[42,'reconfiguring',3,'rx'],[62,'health checks',0,'']]}};

  /* the side panel: published values, a different source for each stage */
  const R=(l,v,d,c)=>({l,v,d,c});
  const PAN={
    tr:{h:'BY AGE 16 · US cohort, 1,787 adolescents',rows:[R('ADHD recorded',47,'47%'),R('anxiety recorded',39,'39%'),R('no standardised testing',37,'37%')],src:'Hughes2024IEP'},
    cliff:{h:'AFTER HIGH SCHOOL · US, ages 19–23',rows:[R('received no services',39.1,'39.1%','bad'),R('case management (most used)',41.9,'41.9%'),R('speech therapy',9.1,'9.1%'),R('sheltered workshop / day centre (n=66)',56,'56%','warn')],src:'Shattuck2011Services,Taylor2011Employment'},
    work:{h:'WORK & STUDY · US young adults',rows:[R('ever paid job, 6 yrs after school',55.1,'55.1%'),R('ever attended college',34.7,'34.7%'),R('ever worked for pay, age 21–25',53.4,'53.4%'),R('job 3 mo after Project SEARCH+ASD',90,'90%','rx'),R('… control group',6,'6%')],src:'Shattuck2012,Roux2013,Wehman2017'},
    home:{h:'HOME & RELATIONSHIPS',rows:[R('ever lived with a parent (US)',87.1,'87.1%'),R('ever lived independently (US)',16.6,'16.6%'),R('ever in a supervised setting (US)',11.8,'11.8%'),R('relationship experience (n=229)',73,'73%','rx'),R('no wish for a relationship',7,'7%')],src:'Anderson2014Residential,Strunz2017'},
    burn:{h:'AUTISTIC BURNOUT · in autistic adults\' words',list:['Cause: life stressors pile up into a cumulative load, with barriers to relief, until expectations outweigh abilities.','Signs: chronic exhaustion, loss of skills, reduced tolerance to sensory input.','Recovery: acceptance and social support, time off or fewer demands, doing things in an autistic way and unmasking.','Seems distinct from work burnout and depression (hypothesis; measurement is early).'],src:'Raymaker2020,Higgins2021,Arnold2023Burnout'},
    age:{h:'AGED 65+ VS MATCHED CONTROLS · odds ratios',scale:20,rows:[R('epilepsy',18.9,'OR 18.9','bad'),R('Parkinson\'s disease',6.1,'OR 6.1','warn'),R('gastrointestinal conditions',5.2,'OR 5.2','warn'),R('dementia 30–64 (%): autism only',4.04,'4.04%'),R('dementia 30–64 (%): general population',.97,'0.97%')],src:'Hand2020Medicare,Vivanti2021'},
    undx:{h:'ENGLAND 2018 · primary-care records',rows:[R('diagnosed, age 10–14',2.94,'2.94%'),R('diagnosed, age 70+',.02,'0.02%'),R('estimated undiagnosed (59–72%)',65.5,'59–72%','warn')],src:'ONions2023'},
    mis:{h:'BEFORE AN ADULT DIAGNOSIS',rows:[R('earlier other diagnoses (Italy)',67,'two thirds','warn'),R('felt misdiagnosed: women (NL)',31.7,'31.7%','bad'),R('felt misdiagnosed: men (NL)',16.7,'16.7%'),R('median age at diagnosis (Italy)',23,'23 yrs')],src:'FusarPoli2022,Kentrou2024'},
    mask:{h:'CAMOUFLAGING · in autistic adults\' words',list:['Why: to fit in and to connect with others.','How: masking autistic traits and compensating with learned strategies.','Cost: exhaustion, threats to self-perception, delayed diagnosis.','The time spent camouflaging seemed to be what hurt most.'],src:'Hull2017,Bradley2021'},
    dx:{h:'AFTER AN ADULT DIAGNOSIS',list:['Strong emotions are common; routes to diagnosis vary and support afterwards is scarce.','Many describe relief and a "reconfiguration of self".','UK recorded diagnoses rose 787% in 1998–2018, fastest in adults and females.','Students told younger reported higher quality of life (early evidence).'],src:'Huang2020,Stagg2019,Russell2022,Oredipe2023'}};

  const STEPS={
   child:[
    {from:0,at:T(16.8),k:'Ages 16–18',t:'Planning the transition',pn:'tr',
     txt:`The top lane is the level of formal services. In a 14-year study of 204 autistic young people, services declined during high school, dropped at school exit (sharply for those with intellectual disability) and unmet needs rose right after: the cliff starts before school ends. [[Laxman2019]] In a US cohort of 1,787 autistic 16-year-olds, ADHD (47%) and anxiety (39%) were the commonest co-occurring conditions recorded. [[Hughes2024IEP]]`,
     pt:`Leaving school can mean losing services suddenly. Start planning for adult life early.`,
     hook:`The "services cliff" begins before school exit. [[Laxman2019]]`},
    {from:T(18),at:T(19.2),k:'Ages 18–21',t:'The services cliff',pn:'cliff',
     txt:`At school exit the line drops. In the US NLTS2 cohort, 39.1% of autistic young adults aged 19–23 received no services at all; use ranged from 9.1% for speech therapy to 41.9% for case management, and African American young adults and those from low-income families were more likely to get nothing. [[Shattuck2011Services]] Among 66 recent school leavers, 56% spent time in sheltered workshops or day centres. [[Taylor2011Employment]] The energy line dips: losing structure and support is itself a stressor.`,
     pt:`After school, many young autistic adults lose most of their support at once.`,
     hook:`39.1% of US autistic young adults received no services after high school. [[Shattuck2011Services]]`},
    {from:T(19.6),at:T(23),k:'Ages 19–25',t:'Work and study',pn:'work',
     txt:`In the first 6 years after high school, 55.1% had held paid work and 34.7% had attended college; autistic youth had the lowest employment of the disability groups compared. [[Shattuck2012]] At 21–25, 53.4% had ever worked for pay, earning on average $8.10 an hour. [[Roux2013]] Support changes this: in a small trial of Project SEARCH plus ASD Supports, 90% had competitive jobs 3 months after graduation against 6% of controls. <span class="ev early">Early evidence</span> [[Wehman2017]] Most employment studies have small samples and no controls. [[Hedley2017]] Try the adjustments builder below.`,
     pt:`Many autistic adults want to work and can work well with the right job match and support.`,
     hook:`Project SEARCH + ASD Supports: 90% vs 6% employed at 3 months. [[Wehman2017]]`},
    {from:T(25),at:T(27.5),k:'Ages 25–30',t:'Home and relationships',pn:'home',
     txt:`Since leaving high school, 87.1% of US autistic young adults had lived with a parent, 16.6% had ever lived independently and 11.8% in a supervised setting; independent living was more likely with better conversation and daily-living skills and higher household income. [[Anderson2014Residential]] Relationships are wanted: 73% of 229 autistic adults had romantic experience and only 7% wanted none. [[Strunz2017]] Autistic and non-autistic adults describe intimacy in similar terms. [[Sala2020]]`,
     pt:`Most autistic adults want close relationships, and many have them.`,
     hook:`87.1% ever lived with a parent vs 16.6% ever independently (NLTS2). [[Anderson2014Residential]]`},
    {from:T(28.3),at:T(30.5),k:'Ages 28–32',t:'Masking, burnout and recovery',pn:'burn',
     txt:`The masking strip darkens as a new job demands more camouflaging, and the energy line falls into the red zone: autistic burnout. Autistic adults describe it as chronic exhaustion, loss of skills and reduced tolerance to stimuli, arising when a cumulative load outweighs abilities, and link it to harm to health and independence, including suicidal behaviour. Recovery came with acceptance and social support, time off or fewer demands, and unmasking. <span class="ev early">Early evidence</span> [[Raymaker2020]] A Delphi study warned that depression treatments might worsen burnout. <span class="ev hyp">Hypothesis</span> [[Higgins2021]] A burnout measure did not yet separate current from past burnout. [[Arnold2023Burnout]]`,
     pt:`Autistic burnout is deep exhaustion with loss of skills, often after long periods of masking and stress. Rest, acceptance and fewer demands help people recover.`,
     hook:`Autistic burnout: chronic exhaustion, loss of skills, reduced tolerance to stimuli. [[Raymaker2020]]`},
    {from:T(48),at:T(64),k:'Ages 50–75',t:'Growing older',pn:'age',
     txt:`Services rise again, now for health. Autistic Medicare enrollees aged 65 and over had higher odds of nearly all physical health conditions, including epilepsy (OR 18.9) and Parkinson's disease (OR 6.1). [[Hand2020Medicare]] Dementia diagnoses were more frequent before 65 in claims data. <span class="ev early">Early evidence</span> [[Vivanti2021]] Their 5-year mortality was 2.87 times higher, but the median age at death (72 vs 75) gap was much smaller than in younger cohorts. [[Krantz2023]] All are group statistics, not forecasts for any one person.`,
     pt:`Autistic adults grow old too. Older autistic adults need the same health checks as everyone else, and some extra ones.`,
     hook:`Autistic adults 65+: higher odds of nearly all physical conditions (Hand 2020). [[Hand2020Medicare]]`}],
   late:[
    {from:0,at:T(17),k:'Ages 16–18',t:'Not yet recognised',pn:'undx',
     txt:`No diagnosis means no services to lose: the top line stays low. In English primary care in 2018, 2.94% of 10–14-year-olds had an autism diagnosis but only 0.02% of people aged 70 or older, and an estimated 59–72% of autistic people in England may be undiagnosed. [[ONions2023]] Girls' differences are often more subtle, and many camouflage. [[Fuentes2021ESCAP,Hull2017]] The masking strip is dark from the start.`,
     pt:`Many autistic people, especially girls and women, are not recognised in childhood.`,
     hook:`England 2018: an estimated 59–72% of autistic people undiagnosed. [[ONions2023]]`},
    {from:T(18),at:T(24.2),k:'Ages 17–25',t:'Anxiety and depression first',pn:'mis',
     txt:`In 161 Italian adults diagnosed with autism, the median age at diagnosis was 23, 11 years after a first mental-health evaluation, and two thirds had received other diagnoses first. [[FusarPoli2022]] In 1,211 Dutch autistic adults, 24.6% reported an earlier diagnosis they saw as a misdiagnosis, more often women (31.7%) than men (16.7%). [[Kentrou2024]] Anxiety, depression and personality disorders can be misdiagnoses, true co-occurring conditions, or both. [[Lai2015LancetPsych]]`,
     pt:`Before autism is recognised, people are often treated for anxiety or depression, sometimes with a wrong label.`,
     hook:`Adult diagnosis: possible misdiagnosis, especially in women, should be explored. [[Lai2015LancetPsych]]`},
    {from:T(26),at:T(29),k:'Ages 25–32',t:'Work while masking',pn:'mask',
     txt:`Camouflaging lets people fit in, at a price. Autistic adults described masking and compensation, motivated by fitting in, with exhaustion and threats to self-perception as costs. [[Hull2017]] In 277 autistic adults it was both protective and harmful, and the time spent camouflaging seemed most damaging. [[Bradley2021]] Late-diagnosed women described "pretending to be normal". [[Bargiela2016]] Autistic people who left university named late diagnosis among the reasons. [[Cage2020]]`,
     pt:`Hiding autistic traits all day can get you through work, but it drains energy every day.`,
     hook:`Camouflaging = masking + compensation; cost: exhaustion. [[Hull2017]]`},
    {from:T(32),at:T(35.5),k:'Ages 32–37',t:'Burnout',pn:'burn',
     txt:`Years of masking without support push the energy line deep into the red zone, lower and longer than on the other path. Autistic adults describe burnout as chronic exhaustion, loss of skills and reduced tolerance to stimuli, from a cumulative load with barriers to relief, and link it to suicidal behaviour. <span class="ev early">Early evidence</span> [[Raymaker2020]] It may be mistaken for depression; a Delphi study warned that depression treatments might worsen it. <span class="ev hyp">Hypothesis</span> [[Higgins2021]] If someone is in crisis, see the support box at the end of this page.`,
     pt:`Burnout can look like depression from outside. Asking about masking and sensory load can change the plan.`,
     hook:`Is autistic burnout distinct from depression? Qualitative work says yes; measurement is still early. [[Raymaker2020,Arnold2023Burnout]]`},
    {from:T(37.6),at:T(39.5),k:'Age 38',t:'Diagnosis in adulthood',pn:'dx',
     txt:`A diagnosis at 38 opens a short burst of services, then little. Adults diagnosed after 50 described a "reconfiguration of self" and saw the diagnosis as positive. [[Stagg2019]] A scoping review found strong emotions after diagnosis, unclear routes to it and few post-diagnostic services. [[Huang2020]] UK recorded diagnoses rose 787% from 1998 to 2018, steepest in adults and females, which the authors put down mainly to more recognition. [[Russell2022]] Unmasking and acceptance help recovery. [[Raymaker2020]]`,
     pt:`Getting diagnosed as an adult can bring relief and a new way of understanding yourself.`,
     hook:`Adult and female diagnoses are rising fastest (UK, 787% overall rise 1998–2018). [[Russell2022]]`},
    {from:T(48),at:T(64),k:'Ages 50–75',t:'Growing older',pn:'age',
     txt:`Most of today's older autistic adults were never diagnosed as children. Those diagnosed had higher odds of nearly all physical health conditions after 65, including epilepsy (OR 18.9) and Parkinson's disease (OR 6.1). [[Hand2020Medicare]] In cross-sectional tests, age-related cognitive differences were parallel or smaller, not larger, and theory-of-mind differences were absent after 50. <span class="ev hyp">Hypothesis</span> [[Lever2016]] Group statistics, not forecasts.`,
     pt:`It is never too late to be assessed, and older autistic adults need good health checks.`,
     hook:`Lever 2016: no accelerated cognitive ageing in autistic adults (cross-sectional). [[Lever2016]]`}]};

  const wrap=(s,n)=>{const w=s.split(' '),o=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){o.push(l.trim());l=x}else l+=' '+x});if(l.trim())o.push(l.trim());return o};
  const lvl=v=>v<.25?'low':v<.55?'some':'high';
  function draw(t){
    const N=vb(svg,'720 420','400 680'),a=age(t),D=P[path];
    const L=N?{x0:44,x1:384,s1T:18,s10:26,s11:78,e1T:100,e10:108,e11:182,m0:190,m1:198,vT:222,rows:[228,248,268,288],ax:304,al:318,ft:352,bx:72,by:388,br:36,px:24,pT:420,pw:356,p0:456,ph:46}
             :{x0:66,x1:460,s1T:20,s10:28,s11:92,e1T:114,e10:122,e11:206,m0:214,m1:224,vT:246,rows:[252,272,292,312],ax:334,al:350,ft:390,bx:596,by:58,br:38,px:486,pT:100,pw:222,p0:138,ph:48};
    const X=g=>lerp(L.x0,L.x1,T(g)),xN=X(a);
    const sv=PL(D.svc,a),en=PL(D.en,a),mk=PL(D.mask,a);let s='';
    /* age grid */
    [16,18,21,25,30,40,50,60,75].forEach(g=>{if(N&&(g===21||g===40||g===60))return;s+=`<line x1="${f1(X(g))}" x2="${f1(X(g))}" y1="${L.s10}" y2="${L.ax}" class="grid"/><text x="${f1(X(g))}" y="${L.al}" class="t-xs t-mid">${g}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis"/><text x="${L.x1}" y="${L.al+14}" class="t-xs t-end">age (years)</text>`;
    /* lane 1: services */
    const S=v=>lerp(L.s11,L.s10,v),E=v=>lerp(L.e11,L.e10,v);
    s+=`<text x="${L.x0}" y="${L.s1T}" class="t-sm" style="fill:var(--accent)">FORMAL SERVICES &amp; SUPPORT</text>`;
    let d='',d2='';for(let g=16;g<=a+1e-6;g+=.1){d+=(d?'L':'M')+f1(X(g))+' '+f1(S(PL(D.svc,g)))}
    if(d){s+=`<path d="${d}L${f1(xN)} ${L.s11}L${f1(X(16))} ${L.s11}Z" style="fill:var(--accent);opacity:.16"/><path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.2"/>`}
    if(path==='child'&&a>=18.4)s+=`<text x="${f1(X(19.4)+4)}" y="${f1(S(.5))}" class="t-xs" style="fill:var(--bad)">${N?'cliff':'the services cliff'}</text>`;
    if(path==='late'&&a>=38.2)s+=`<text x="${f1(X(38.4)+4)}" y="${f1(S(.48))}" class="t-xs" style="fill:var(--accent)">${N?'after dx':'after diagnosis'}</text>`;
    /* lane 2: energy with burnout zone */
    s+=`<text x="${L.x0}" y="${L.e1T}" class="t-sm" style="fill:var(--calm)">${N?'ENERGY vs DEMANDS':'ENERGY: capacity left after demands and masking'}</text>`;
    s+=`<rect x="${L.x0}" y="${f1(E(.25))}" width="${L.x1-L.x0}" height="${f1(E(0)-E(.25))}" style="fill:var(--bad);opacity:.1"/><text x="${L.x1-4}" y="${f1(E(0)-5)}" class="t-xs t-end" style="fill:var(--bad)">burnout zone</text>`;
    d='';for(let g=16;g<=a+1e-6;g+=.1){d+=(d?'L':'M')+f1(X(g))+' '+f1(E(PL(D.en,g)))}
    const other=P[path==='child'?'late':'child'];for(let g=16;g<=75;g+=.25){d2+=(d2?'L':'M')+f1(X(g))+' '+f1(E(PL(other.en,g)))}
    s+=`<path d="${d2}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 3;opacity:.7"/>`;
    if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--calm);stroke-width:2.6;stroke-linejoin:round"/><circle cx="${f1(xN)}" cy="${f1(E(en))}" r="4.5" style="fill:${en<.25?'var(--bad)':'var(--calm)'};stroke:var(--panel);stroke-width:1.5"/>`;
    /* masking strip */
    for(let g=16;g<a;g+=.5){const g2=Math.min(a,g+.5);s+=`<rect x="${f1(X(g))}" y="${L.m0}" width="${f1(X(g2)-X(g)+.4)}" height="${L.m1-L.m0}" style="fill:var(--neuro);opacity:${f1(PL(D.mask,g)*.85)}"/>`}
    s+=`<rect x="${L.x0}" y="${L.m0}" width="${L.x1-L.x0}" height="${L.m1-L.m0}" style="fill:none;stroke:var(--line)"/><text x="${L.x0-6}" y="${L.m1-1}" class="t-xs t-end" style="fill:var(--neuro)">mask</text>`;
    /* lane 3: life events */
    s+=`<text x="${L.x0}" y="${L.vT}" class="t-sm">LIFE EVENTS</text>`;
    D.ev.forEach(([g,l,r,c])=>{if(a<g-.05)return;const x=X(g),w=l.length*6.3+12,y=L.rows[r],col=c?`var(--${c})`:'var(--muted)',xl=Math.min(x,L.x1-w);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y+16}" y2="${L.ax}" style="stroke:${col};stroke-width:1;opacity:.5"/><rect x="${f1(xl)}" y="${y}" width="${f1(w)}" height="17" rx="8" style="fill:var(--panel);stroke:${col};stroke-width:1.3"/><text x="${f1(xl+w/2)}" y="${y+12}" class="t-xs t-mid" style="fill:var(--ink)">${l}</text>`});
    /* playhead */
    s+=`<line x1="${f1(xN)}" x2="${f1(xN)}" y1="${L.s10}" y2="${L.ax}" style="stroke:var(--ink);opacity:.35"/><rect x="${f1(Math.min(xN,L.x1-24)-22)}" y="${L.ax-15}" width="44" height="13" rx="4" style="fill:var(--panel)"/><text x="${f1(Math.min(xN,L.x1-24))}" y="${L.ax-5}" class="t-xs t-mid" style="fill:var(--ink)">age ${Math.floor(a)}</text>`;
    s+=`<text x="${L.x0}" y="${L.ft}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · dashed: the ${path==='child'?'late-diagnosis':'childhood-diagnosis'} path</text>`;
    /* battery and side panel */
    const ph=phaseOf(STEPS[path],t),st=STEPS[path][ph],pn=PAN[st.pn],grow=ramp(t,st.from,st.at+.02);
    s+=dial(L.bx,L.by,L.br,en,{battery:true,label:'energy now'});
    s+=`<text x="${N?L.bx+L.br+18:L.bx}" y="${N?L.by-12:L.by+30}" class="t-xs ${N?'':'t-mid'}" style="fill:var(--neuro)">masking: ${lvl(mk)}</text>`;
    if(N)s+=`<text x="${L.bx+L.br+18}" y="${L.by+4}" class="t-xs" style="fill:var(--accent)">services: ${lvl(sv)}</text>`;
    wrap(pn.h,N?52:30).forEach((l,k)=>s+=`<text x="${L.px}" y="${L.pT+k*13}" class="t-xs" style="fill:var(--brand)">${l}</text>`);
    if(pn.rows){const sc=pn.scale||100;pn.rows.forEach((r,k)=>{const y=L.p0+k*L.ph,bw=L.pw*clamp(r.v/sc)*grow,col=r.c?`var(--${r.c})`:'var(--brand)';
      s+=`<text x="${L.px}" y="${y}" class="t-xs" style="fill:var(--ink)">${r.l}</text><rect x="${L.px}" y="${y+6}" width="${L.pw}" height="11" rx="3" style="fill:var(--panel-2)"/><rect x="${L.px}" y="${y+6}" width="${f1(Math.max(1.5,bw))}" height="11" rx="3" style="fill:${col}"/><text x="${L.px+L.pw}" y="${y+30}" class="t-xs t-end" style="fill:${col}">${grow>.98?r.d:''}</text>`})}
    else{let y=L.p0;pn.list.forEach(li=>{const ls=wrap(li,N?50:30);ls.forEach((l,k)=>{s+=`<text x="${L.px+(k?10:0)}" y="${y}" class="t-xs" style="fill:var(--ink);opacity:${f1(grow)}">${k?'':'• '}${l}</text>`;y+=14});y+=8})}
    svg.innerHTML=s;
    setSt(ph);$('#adNote').innerHTML=noteHTML(st);
    $('#adRead').innerHTML=`<span>age <b>${Math.floor(a)}</b></span><span>path <b>${path==='child'?'diagnosed in childhood':'diagnosed as an adult'}</b></span><span>services <b>${lvl(sv)}</b></span><span>energy <b>${en<.25?'burnout zone':lvl(en)}</b></span><span>masking <b>${lvl(mk)}</b></span><span>panel source <b>${pn.src.split(',').join(', ')}</b></span>`;
  }
  const stop=playWire(rg,$('#adPlay'),draw,26000,'Replay','adult');
  function wire(){const old=$('#adSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS[path],rg,draw,stop)}
  $$('[data-adp]').forEach(b=>b.addEventListener('click',()=>{stop();path=b.dataset.adp;$$('[data-adp]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ================= workplace adjustments builder ================= */
  const K='[[Khalifa2020]]';
  const ADJ={
    interview:{n:'Job interviews',a:[['Questions in writing, sent in advance',0],['A practical task or work trial as well as, or instead of, a talk',0],['Clear directions, timing and who will be in the room',0],['Supported employment: job matching and coaching through recruitment',1,'[[Wehman2017]]']]},
    noise:{n:'Open-plan noise and light',a:[['A quieter desk away from walkways',1,K],['Noise-reducing headphones allowed',1,K],['A desk away from harsh lighting',0],['Some home-working days',0]]},
    rules:{n:'Unwritten rules',a:[['Expectations written down: hours, breaks, who to ask',0],['A named mentor or buddy',0],['A job coach (the most common workplace support studied)',1,K]]},
    rota:{n:'Changing rotas and tasks',a:[['A fixed or predictable rota',1,K],['Changes notified in writing, as early as possible',0],['Predictable core duties',1,K]]},
    verbal:{n:'Spoken instructions',a:[['Written follow-up after spoken instructions',0],['One task at a time, with priorities stated',0],['Time to think before answering',0]]},
    social:{n:'Meetings and social events',a:[['Agendas sent before meetings',0],['Social events optional, without penalty',0],['Chat or email as an alternative to calls',0]]}};
  const LAW={uk:`<b>Great Britain.</b> Autism may count as a disability under the Equality Act 2010 if it has a substantial and long-term negative effect on normal daily activities, which brings an entitlement to reasonable adjustments. Autistic clinicians described unmet adjustments and recommended that employer and employee discuss and revisit adjustments individually. [[Smith2025Adjustments]]`,
    us:`<b>United States.</b> Title I of the Americans with Disabilities Act covers employment discrimination. In charges filed with the EEOC, autistic charging parties were more often younger and male and more often filed against retail employers; charges against larger and service-industry employers were more likely to be upheld. [[VanWieren2008]]`,
    other:`<b>Elsewhere.</b> Many countries have disability or equality laws with a duty to adjust work; check the law where you work. The research on which adjustments help is international: minimising distractions, reducing noise and predictable duties were among the successful strategies. [[Khalifa2020]]`};
  const DISC={no:`<b>Disclosure.</b> Adjustments usually need the employer to know about a need, though not always the diagnosis. In 254 US autistic adults, those who had disclosed were more than three times as likely to be employed; this cross-sectional link cannot show cause, and disclosure is a personal decision. [[Ohl2017]]`,
    yes:`<b>Disclosed.</b> Ask for a meeting to agree adjustments in writing, with a date to review them. Autistic clinicians described adjustments made "under the radar" and recommended revisiting them as the job changes. [[Smith2025Adjustments]]`};
  const plan=$('#adPlan');
  function build(){const on=$$('[data-adb]').filter(c=>c.checked).map(c=>c.dataset.adb);const law=$('#adLaw').value,disc=$('#adDisc').value;
    let n=0,ev=0;const items=on.map(k=>{const B=ADJ[k];n+=B.a.length;ev+=B.a.filter(x=>x[1]).length;
      return `<li><b>${B.n}</b>${B.a.map(x=>`${x[0]}${x[1]?` <span class="ev est">studied</span> ${x[2]}`:''}`).join('; ')}.</li>`}).join('');
    $('#adOut').innerHTML=`<div class="kicker">Draft for a conversation · ${on.length} barrier${on.length===1?'':'s'}, ${n} ideas, ${ev} with research behind them</div><h4>${on.length?'Adjustments to discuss':'Tick a barrier to start'}</h4>${on.length?`<ol>${items}</ol>`:''}<p>${LAW[law]}</p><p>${DISC[disc]}</p><p class="stage-cap">Not legal advice. Adjustments should be agreed with the person, written down and reviewed. [[Smith2025Adjustments]]</p>`;
    const H=Math.max(110,48+on.length*34);plan.setAttribute('viewBox',`0 0 400 ${H}`);
    let s=`<text x="8" y="18" class="t-sm">IDEAS PER BARRIER</text><text x="392" y="18" class="t-xs t-end"><tspan style="fill:var(--good)">■ studied</tspan>  <tspan>■ common request</tspan></text>`;
    if(!on.length)s+=`<text x="200" y="70" class="t-sm t-mid">no barriers ticked</text>`;
    on.forEach((k,i)=>{const B=ADJ[k],y=40+i*34,e=B.a.filter(x=>x[1]).length,c=B.a.length-e,u=40;
      s+=`<text x="8" y="${y+14}" class="t-xs" style="fill:var(--ink)">${B.n}</text>`;
      for(let j=0;j<B.a.length;j++)s+=`<rect x="${196+j*u}" y="${y+2}" width="${u-6}" height="18" rx="4" style="fill:${j<e?'var(--good)':'var(--panel-2)'};stroke:${j<e?'var(--good)':'var(--line)'}"/>`;
      s+=`<text x="${196+B.a.length*u+2}" y="${y+15}" class="t-xs">${e}/${e+c}</text>`});
    plan.innerHTML=s}
  $$('[data-adb]').forEach(c=>c.addEventListener('change',build));['#adLaw','#adDisc'].forEach(q=>$(q).addEventListener('change',build));
  build();
};
