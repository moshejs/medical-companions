/* =============== 3.4 Good psychiatric management =============== */
inits.gpm=()=>{
  const svg=$('#gpSvg'),rg=$('#gpT');let view='gpm',setSt=()=>{};
  const RUNG=[
    {w:'GPM + psychoed.',nw:'GPM',n:'GPM and psychoeducation',who:['Generalist clinicians,','once weekly'],tr:['GPM-A: a one-day staff','workshop (uncontrolled)']},
    {w:'STEPPS groups',nw:'Groups',n:'Structured group programme',who:['Manualised group, 20 weeks,','added to usual care'],tr:['Systems component involves','the support network']},
    {w:'DBT · MBT · ST',nw:'Specialist',n:'Specialist psychotherapy',who:['Specialist teams'],tr:['DBT: weekly consultation team','MBT: limited extra training']},
    {w:'Crisis care',nw:'Crisis',n:'Crisis care and brief admission',who:['Self-admission agreed','in advance (Skåne model)'],tr:['Up to 3 days, at most','3 times a month']}
  ];
  /* level of care (0..3) the person needs, as knots [t, level]; the specialist-only view waits for a place */
  const KN={gpm:[[0,0],[.3,0],[.36,1],[.48,1],[.53,2],[.64,2],[.68,3],[.76,3],[.8,2],[.86,1],[.93,0],[1,0]],
    spec:[[0,0],[.5,0],[.53,2],[.64,2],[.68,3],[.76,3],[.8,2],[.9,2],[.93,0],[1,0]]};
  const lvl=t=>{const k=KN[view];if(t<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(t<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*ease((t-a[0])/(b[0]-a[0]))}return k[k.length-1][1]};
  const STEPS=[
    {from:0,at:.06,k:'Month 0 · diagnosis',t:'Diagnosis, said out loud',
     txt:`GPM starts by naming the disorder and explaining it. APA 2024 recommends (1C) "a collaborative discussion about their diagnosis and treatment, which includes psychoeducation related to the disorder". [[APA2024Guideline]] In 50 young women, a psychoeducation workshop within a week of being told the diagnosis gave a greater fall in impulsivity and stormy relationships than a waitlist. [[Zanarini2008Psychoed]] Yet 57% of 134 US psychiatrists surveyed had at some point not disclosed a BPD diagnosis. [[Sisti2016]]`,
     sp:`On a specialist-only pathway, the diagnosis may come with a referral and a wait.`,
     pt:`Being told the name of what you have, and what it means, is a treatment step in itself. It helps people make sense of their experiences.`,
     hook:`APA 2024 (1C): collaborative discussion of diagnosis with psychoeducation. Withholding the diagnosis is now generally seen as unethical. [[APA2024Guideline,Sims2022]]`},
    {from:.16,at:.22,k:'Months 2–7 · the model',t:'Interpersonal hypersensitivity',
     txt:`GPM "medicalizes the disorder, emphasizes psychoeducation, and focuses on social adaptation". [[Gunderson2018GPM]] Its explanatory model comes from Gunderson and Lyons-Ruth's "interpersonal hypersensitivity" phenotype: an inherited reactivity to interpersonal stress that, together with parents' own vulnerabilities, may escalate into disorganised attachment and later BPD. <span class="ev hyp">Hypothesis</span> [[GundersonLyonsRuth2008]] The person stays on the base step: once-weekly generalist care.`,
     sp:`The person is still waiting at the base, without structured care.`,
     pt:`GPM explains BPD as being extra sensitive to how others treat you: feeling connected keeps things calm; feeling rejected sets off the storm.`,
     hook:`GPM = once-weekly, generalist, medicalizes the disorder, psychoeducation, social adaptation. [[Gunderson2018GPM]]`},
    {from:.32,at:.4,k:'Months 8–12 · step up',t:'Add a structured group',
     txt:`When needs grow, a structured group can be added. STEPPS is a 20-week, manual-based group programme combining cognitive-behavioural elements and skills training with a "systems" component, added to usual care. [[Blum2008STEPPS]] In 124 people, STEPPS improved ZAN-BPD total and all four domains, impulsivity, mood and global functioning, but not suicide attempts, self-harm or hospitalisation; dropout was high in both arms. [[Blum2008STEPPS]] A 14-week emotion regulation group added to therapy reduced self-harm in 61 women, with gains kept at 9 months. [[Gratz2014ERGT]]`,
     sp:`The specialist-only pathway has no middle step: the person keeps waiting.`,
     pt:`A skills group gives tools for handling emotions and involves the people around you.`,
     hook:`STEPPS: 20-week add-on group with a systems component; improves BPD symptoms, not suicide attempts or self-harm. [[Blum2008STEPPS]]`},
    {from:.5,at:.57,k:'Months 12–15 · specialist',t:'Specialist therapy if not responding',
     txt:`GPM's authors keep intensive therapies for people who do not respond to generalist care. <span class="ev hyp">Hypothesis</span> [[Gunderson2018GPM]] A 2024 review notes that "almost half of the patients do not respond sufficiently" to psychotherapy and finds no approach superior. [[Leichsenring2024]] Specialist options are covered in <a href="#dbt" data-go="dbt">DBT</a>, <a href="#mbt" data-go="mbt">MBT</a> and <a href="#schema" data-go="schema">Schema therapy &amp; TFP</a>.`,
     sp:`A specialist place opens: the person jumps straight from waiting to the specialist step.`,
     pt:`If things are not improving, more intensive specialist therapy is the next step up.`,
     hook:`Stepped care: start generalist; step up for non-response (Hypothesis, Gunderson 2018). [[Gunderson2018GPM]]`},
    {from:.66,at:.72,k:'Month 17 · crisis',t:'Safety plan and brief admission',
     txt:`A crisis takes the person to the top step. APA 2024 implementation text calls for monitoring suicide risk and "individualized safety plans". [[APA2024Guideline]] Safety planning-type interventions cut suicidal behaviour (RR 0.570; NNT 16) in mixed populations. [[Nuij2021]] In the Brief Admission Skåne model, people agree a contract in advance and can self-admit for up to 3 days, at most 3 times a month [[Liljedahl2017BA]]; its trial found no advantage in hospital days at 12 months. [[Westling2019BA]] A whole-of-service stepped-care model cut bed days per admission from 13.46 to 4.28. [[Grenyer2018Stepped]]`,
     sp:`Crisis care is the same on both pathways.`,
     pt:`A safety plan is a short written plan made with a clinician: warning signs, things that help, people to call, and crisis numbers. Short, planned hospital stays can be part of it.`,
     hook:`Stepped care (Grenyer 2018 cluster RCT): bed days per admission 13.46 → 4.28; cost-neutral. [[Grenyer2018Stepped]]`},
    {from:.8,at:.95,k:'Months 19–24 · step down',t:'"Get a life": work and relationships',
     txt:`As the crisis settles, care steps back down. GPM focuses on social adaptation [[Gunderson2018GPM]] because symptom remission is not the same as a full life: 2 years after DBT or GPM, about two-thirds of people had reached diagnostic remission, but 53% were neither employed nor in school and 39% were receiving psychiatric disability support. [[McMain2012]] In Montreal, people in extended care for 18–24 months improved no more than those staying 6–12 months. <span class="ev early">Early evidence</span> [[Laporte2018Stepped]]`,
     sp:`In this view the person also steps down, but only after a fixed specialist course.`,
     pt:`Getting better is not only fewer crises. GPM keeps asking about work, study and relationships, the things that make a life.`,
     hook:`McMain 2012: ~two-thirds remitted, but 53% not working or studying at 36 months: functional recovery lags. [[McMain2012]]`}
  ];
  function draw(t){
    const N=vb(svg,'720 400','400 610'),L=lvl(t),p=phaseOf(STEPS,t),ri=Math.round(L),mo=Math.round(t*24),wait=view==='spec'&&t<.515;
    const G=N?{lx:20,ly:56,lw:360,lh:220,tx0:40,tx1:380,ty0:318,ty1:376,bx:20,by:410,bw:360,bh:180}:{lx:30,ly:56,lw:440,lh:230,tx0:50,tx1:470,ty0:318,ty1:372,bx:494,by:56,bw:206,bh:230};
    let o='';
    const LD=ladder(G.lx,G.ly,G.lw,G.lh,RUNG.map(r=>N?r.nw:r.w),{at:wait?-1:ri,col:'var(--rx)',done:false});
    o+=LD.svg;
    /* the person: interpolate between tread centres */
    const a=LD.top(Math.floor(L)),b=LD.top(Math.min(3,Math.floor(L)+1)),f=L-Math.floor(L),px=lerp(a[0],b[0],f),py=lerp(a[1],b[1],f)-Math.sin(Math.PI*f)*18;
    const ps=N?34:40;
    /* queue of others waiting, specialist view */
    if(wait){const qs=N?22:26,sp=N?16:19;for(let i=0;i<4;i++)o+=person(G.lx+12+i*sp,G.ly+G.lh-qs-4,qs,'var(--muted)',{op:.55});
      o+=person(G.lx+12+4*sp,G.ly+G.lh-qs-4,qs,'var(--self)')}
    else o+=person(px,py-ps-2,ps,'var(--self)');
    /* timeline trace of the level of care */
    const X=u=>lerp(G.tx0,G.tx1,u),Y=v=>lerp(G.ty1,G.ty0,v/3);
    o+=`<text x="${G.tx0}" y="${G.ty0-10}" class="t-xs">LEVEL OF CARE OVER 24 MONTHS</text>`;
    [0,1,2,3].forEach(v=>o+=`<line x1="${G.tx0}" x2="${G.tx1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`);
    let d='';for(let i=0;i<=120;i++){const u=t*i/120;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(lvl(u)))}
    o+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:2.4;stroke-linejoin:round"/><circle cx="${f1(X(t))}" cy="${f1(Y(L))}" r="4.5" style="fill:var(--rx)"/>`;
    [0,6,12,18,24].forEach(m=>o+=`<text x="${f1(X(m/24))}" y="${G.ty1+14}" class="t-xs t-mid">${m}</text>`);
    o+=`<text x="${G.tx1}" y="${G.ty1+27}" class="t-xs t-end">months</text>`;
    /* info card for the current step */
    const R=wait?{n:'Waiting list',who:['No structured care yet'],tr:['Fewer than 25% receive','guideline-adherent therapy']}:RUNG[ri];
    o+=`<rect x="${G.bx}" y="${G.by}" width="${G.bw}" height="${G.bh}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    let yy=G.by+22;const tx=G.bx+14;
    o+=`<text x="${tx}" y="${yy}" class="t-xs" style="fill:var(--rx)">${wait?'NOW · NOT YET ON THE LADDER':'NOW · STEP '+(ri+1)+' OF 4'}</text>`;yy+=20;
    o+=`<text x="${tx}" y="${yy}" class="t-lbl">${R.n}</text>`;yy+=24;
    o+=`<text x="${tx}" y="${yy}" class="t-xs">DELIVERED BY</text>`;yy+=15;
    R.who.forEach(l=>{o+=`<text x="${tx}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text>`;yy+=14});yy+=8;
    o+=`<text x="${tx}" y="${yy}" class="t-xs">TRAINING / FORMAT</text>`;yy+=15;
    R.tr.forEach(l=>{o+=`<text x="${tx}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text>`;yy+=14});
    yy+=10;o+=`<text x="${tx}" y="${yy}" class="t-xs" style="fill:var(--warn)">${view==='gpm'?'pathway: GPM + stepped care':'pathway: specialist only'}</text>`;
    o+=`<text x="${N?200:G.lx}" y="${N?32:30}" class="t-sm${N?' t-mid':''}" style="fill:var(--ink)">Month ${mo} · ${wait?'waiting for a specialist place':['diagnosis and psychoeducation','generalist care','stepping up','specialist therapy','crisis','stepping down'][p]}</text>`;
    svg.innerHTML=o;
    setSt(p);const S=STEPS[p];
    $('#gpNote').innerHTML=noteHTML(view==='gpm'?S:Object.assign({},S,{txt:`<b>Specialist-only view.</b> ${S.sp} Fewer than 25% of patients with BPD receive guideline-adherent psychotherapy. [[Assmann2025]] `+S.txt}));
    $('#gpRead').innerHTML=`<span>month <b>${mo}</b></span><span>step <b>${wait?'waiting':(ri+1)+' · '+R.n}</b></span><span>pathway <b>${view==='gpm'?'GPM + stepped care':'specialist only'}</b></span>`;
  }
  const stop=playWire(rg,$('#gpPlay'),draw,24000,'Replay','gpm');
  setSt=stepWire($('#gpSteps'),STEPS,rg,draw,stop);
  $$('[data-gpv]').forEach(b=>b.addEventListener('click',()=>{stop();view=b.dataset.gpv;$$('[data-gpv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- evidence board ---------- */
  const ev=$('#gpEv');let cur='mcm',grow=1,stopG=null;
  /* row kinds: eq (both arms improved equally), bar (single published %), pair (two values), d (effect size, 0..1 scale) */
  const EV=[
    {id:'mcm',b:'DBT vs GPM (McMain 2009, 2012)',t:'DBT vs general psychiatric management',k:'180 people · 1 year of treatment · 2-year follow-up',
     rows:[{eq:'Self-harm episodes',v:'fewer, less severe'},{eq:'Emergency visits, hospital days',v:'fewer'},{eq:'BPD symptoms, depression, anger',v:'better'},{eq:'Interpersonal functioning',v:'better'},
       {h:'36 months, both groups together'},{bar:'Diagnostic remission (~two-thirds)',v:67},{bar:'Neither employed nor in school',v:53},{bar:'On psychiatric disability support',v:39}],
     txt:`Both groups improved, with fewer and less severe self-harm episodes, fewer emergency visits and hospital days, and better BPD symptoms, depression, anger and interpersonal functioning: "No significant differences across any outcomes were found between groups". [[McMain2009]] Two years after treatment the gains held in both groups; about two-thirds had reached diagnostic remission, but 53% were neither employed nor in school and 39% were on psychiatric disability support at 36 months. [[McMain2012]]`,
     pt:`A well-organised general approach did as well as DBT for these patients.`,hook:`McMain 2009: DBT = GPM on all outcomes at 1 year; McMain 2012: still equal 2 years later. [[McMain2009,McMain2012]]`},
    {id:'brief',b:'Brief GPM (2024, 2026)',t:'Brief GPM vs usual treatment',k:'76 patients · 10 sessions over 4 months',
     rows:[{d:'Total ZAN-BPD at 4 months',v:.04},{d:'Relationship problems at 4 months',v:.52},{eq:'ZAN-BPD at 12 months',v:'GPM reduced symptoms significantly more',one:1}],
     txt:`Brief GPM did not differ from usual treatment on total ZAN-BPD at 4 months (d 0.04) but did better on relationship problems (d 0.52), impulsivity, social problems and retention. [[Kramer2024GPM]] At 12 months the GPM group showed significantly greater ZAN-BPD reduction. <span class="ev early">Early evidence</span> [[BlancoMachinea2026]]`,
     pt:`A short, 10-session version of GPM helped with relationships quickly, and its effect on symptoms showed up later.`,hook:`Brief GPM: d 0.04 on total symptoms at 4 months, d 0.52 on relationships. [[Kramer2024GPM]]`},
    {id:'steps',b:'STEPPS and skills groups',t:'Add-on groups',k:'Blum 2008 RCT and a 2022 meta-analysis',
     rows:[{d:'Add-on DBT skills: BPD severity (SMD)',v:.66},{d:'Add-on STEPPS: BPD severity (SMD)',v:.48},{eq:'STEPPS: suicide attempts, self-harm',v:'no difference (nor hospitalisation)',none:1}],
     txt:`In the 2022 focused meta-analysis, add-on DBT skills training reduced BPD severity (SMD −0.66, moderate certainty) and add-on STEPPS SMD −0.48. [[StoffersWinterling2022BJP]] In Blum 2008 (124 analysed), STEPPS improved ZAN-BPD and all four domains with moderate to large effects, but not suicide attempts, self-harm or hospitalisation; dropout was high in both arms. [[Blum2008STEPPS]] Effects are shown as sizes, ignoring sign.`,
     pt:`Skills groups added to ordinary care reduce BPD symptoms, though they did not reduce self-harm in the STEPPS trial.`,hook:`STEPPS: 20 weeks, add-on, systems component; SMD −0.48 on BPD severity. [[Blum2008STEPPS,StoffersWinterling2022BJP]]`},
    {id:'scm',arms:['MBT','SCM'],b:'Structured clinical management',t:'SCM as an active comparator',k:'Bateman 2009 (134) and a 2026 Korean pilot (64)',
     rows:[{eq:'Overall at 18 months (Bateman 2009)',v:'substantial improvement in both'},{eq:'Suicide attempts (2026 pilot)',v:'both reduced, no difference'},{h:'8 years after the 2009 trial'},{pair:'Still meeting recovery criteria',a:74,b2:51,la:'MBT',lb:'SCM'}],
     txt:`In Bateman 2009, "Substantial improvements were observed in both conditions", though MBT gave a steeper decline in suicide attempts and hospitalisation. [[Bateman2009]] Eight years later more people still met recovery criteria after MBT (74% vs 51%). [[Bateman2021]] A 2026 Korean pilot found MBT and SCM both cut suicide attempts, with no difference. <span class="ev early">Early evidence</span> [[Shin2026]]`,
     pt:`Structured clinical management is organised general care. People improved a lot with it, even though a specialist therapy sometimes did a bit better.`,hook:`Bateman 2009: MBT vs SCM, "Substantial improvements were observed in both conditions". [[Bateman2009]]`},
    {id:'step',b:'Stepped care and youth services',t:'Changing the service, not the therapy',k:'Grenyer 2018 cluster RCT · MOBY 2022',
     rows:[{pair:'Bed days per admission',a:13.46,b2:4.28,la:'before',lb:'stepped care',u:' days',mx:15},{pair:'Treatment completion, youth',a:47.8,b2:19.2,la:'HYPE service',lb:'general youth service',u:'%',mx:100},{eq:'Adding CAT to HYPE (MOBY)',v:'no added benefit',none:1}],
     txt:`A cost-neutral whole-of-service stepped-care model cut bed days per admission from 13.46 to 4.28, made re-presentation to emergency 1.3 times less likely and saved an estimated USD 2,720 per patient per year (642 inpatients). [[Grenyer2018Stepped]] In MOBY (139 people aged 15–25), a dedicated youth BPD service had higher completion (47.8% vs 19.2%), but adding cognitive analytic therapy did not improve functioning. [[Chanen2022MOBY]]`,
     pt:`How a service is organised can matter as much as which therapy it offers.`,hook:`Grenyer 2018: stepped care, bed days 13.46 → 4.28; MOBY: service model beat therapy brand. [[Grenyer2018Stepped,Chanen2022MOBY]]`},
    {id:'tau',b:'Usual care arms',t:'What unstructured usual care does',k:'Meta-analysis of 16 trials\' TAU arms',
     rows:[{d:'BPD symptoms (Hedges g)',v:.371},{d:'Self-harm and suicidality (Hedges g)',v:.003}],
     txt:`Across the treatment-as-usual arms of 16 BPD trials, BPD symptoms improved by a small-to-moderate amount (g 0.371; 95% CI 0.246–0.495), but self-harm and suicidality did not change (g 0.003). The authors say this questions the idea that usual care is harmful. [[Finch2019TAU]]`,
     pt:`Ordinary care is not harmful, but on its own it did not reduce self-harm. Structure matters.`,hook:`TAU arms: symptoms g 0.371, self-harm g 0.003. [[Finch2019TAU]]`}
  ];
  const bt=$('#gpEvBtns');bt.innerHTML='<span class="kicker">Compare</span>'+EV.map(e=>`<button class="btn" data-gpe="${e.id}" aria-pressed="${e.id===cur}">${e.b}</button>`).join('');
  function drawE(){const N=vb(ev,'600 360','400 560'),E=EV.find(e=>e.id===cur);let o='';const x0=N?16:24,x1=(N?400:600)-(N?16:24);
    o+=`<text x="${x0}" y="22" class="t-sm" style="fill:var(--ink);font-weight:600">${E.t.toUpperCase()}</text><text x="${x0}" y="38" class="t-xs">${E.k}</text>`;
    let y=60;const lw=N?0:230,c0=x0+lw,cw=N?220:x1-c0-150;
    E.rows.forEach(r=>{
      if(r.h){o+=`<text x="${x0}" y="${y+10}" class="t-xs" style="fill:var(--rx)">${r.h.toUpperCase()}</text>`;y+=22;return}
      const ty=y+11,ry=N?y+18:y;
      if(!N||r.eq||r.bar||r.d||r.pair)o+=`<text x="${x0}" y="${ty}" class="t-xs" style="fill:var(--ink)">${r.eq||r.bar||r.d||r.pair}</text>`;
      if(r.eq){const g=f1(grow);
        if(r.none)o+=`<text x="${c0+(N?0:8)}" y="${ry+(N?11:11)}" class="t-xs" style="opacity:${g}">= ${r.v}</text>`;
        else if(r.one)o+=`<text x="${c0+(N?0:8)}" y="${ry+11}" class="t-xs" style="fill:var(--rx);opacity:${g}">▲ ${r.v}</text>`;
        else{const A=E.arms||['DBT','GPM'];o+=`<text x="${c0+(N?0:8)}" y="${ry+11}" class="t-xs" style="fill:var(--rx);opacity:${g}">● ${A[0]} = ${A[1]}: ${r.v}</text>`}
        y+=N?40:26;return}
      if(r.bar){const w=cw*r.v/100*grow;o+=`<rect x="${c0}" y="${ry+1}" width="${f1(Math.max(1.5,w))}" height="12" rx="3" style="fill:var(--rx);opacity:.8"/><text x="${f1(c0+w+6)}" y="${ry+11}" class="t-xs" style="fill:var(--ink)">${grow<1?'':r.v+'%'}</text>`;y+=N?40:26;return}
      if(r.d){const w=cw*r.v*grow;o+=`<rect x="${c0}" y="${ry+1}" width="${f1(Math.max(1.5,w))}" height="12" rx="3" style="fill:var(--accent)"/><text x="${f1(c0+Math.max(1.5,w)+6)}" y="${ry+11}" class="t-xs" style="fill:var(--ink)">${grow<1?'':r.v}</text>`;y+=N?40:26;return}
      if(r.pair){const mx=r.mx||100,u=r.u||'%';[[r.a,r.la,'var(--rx)',1],[r.b2,r.lb,'var(--muted)',.7]].forEach(([v,l,c,op],j)=>{const w=cw*v/mx*grow,yy=ry+j*16;
          o+=`<rect x="${c0}" y="${yy+1}" width="${f1(Math.max(1.5,w))}" height="12" rx="3" style="fill:${c};opacity:${op}"/><text x="${f1(c0+w+6)}" y="${yy+11}" class="t-xs" style="fill:var(--ink)">${grow<1?'':v+u+' · '+l}</text>`});y+=N?56:42}});
    if(E.rows.some(r=>r.d)){y+=14;o+=`<text x="${x0}" y="${y}" class="t-xs">effect sizes shown as magnitudes</text>`;y+=8}
    ev.setAttribute('viewBox',`0 0 ${N?400:600} ${Math.max(N?220:200,Math.round(y+16))}`);
    ev.innerHTML=o;
    $('#gpEvNote').innerHTML=noteHTML({k:E.k,t:E.t,txt:E.txt,pt:E.pt,hook:E.hook});
    $('#gpEvCap').innerHTML='Values as published in each abstract. "=" means the trial found no significant difference between arms. Population statistics, not individual predictions.'}
  bt.addEventListener('click',e=>{const b=e.target.closest('[data-gpe]');if(!b)return;cur=b.dataset.gpe;$$('[data-gpe]',bt).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopG)stopG();grow=0;drawE();stopG=animate(600,p=>{grow=ease(p);drawE()},()=>{stopG=null;grow=1;drawE()});
    setTimeout(()=>{if(grow<1){if(stopG)stopG();stopG=null;grow=1;drawE()}},900)});
  redraws.gpm=(prev=>()=>{prev&&prev();drawE()})(redraws.gpm);
  drawE();
};
