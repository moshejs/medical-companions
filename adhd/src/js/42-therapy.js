/* =============== 4.2 CBT, coaching & adult support =============== */
const TH_STEPS=[
 {from:0,at:.07,k:'Before therapy',t:'The avoidance loop',
  txt:`A common way to describe the problem CBT targets: a task feels too big ("I'll do it later"), that brings a wave of overwhelm, the task is avoided, and the relief of avoiding it makes avoiding more likely next time, while unfinished tasks pile up. The loop is an illustration. The trial that made CBT for adult ADHD widely known enrolled 86 adults who were already taking medication but still had significant symptoms, and compared 12 individual CBT sessions with 12 sessions of relaxation plus educational support. [[Safren2010]]`,
  pt:`Putting things off is not laziness. Avoiding a task gives quick relief, and that relief keeps the habit going.`,
  hook:`Safren 2010 (JAMA): 86 medication-treated adults with persistent symptoms; CBT vs an attention-matched relaxation-plus-education control.`},
 {from:.14,at:.25,k:'Sessions 1–4 · core module 1',t:'Organise and plan',
  txt:`The first module combines psychoeducation with organising and planning: one calendar and one task list, problem-solving, and breaking big tasks into steps small enough to start. It takes 4 sessions. In the planner, the essay becomes outline, draft and check on different days, and Sunday evening becomes the weekly planning slot. [[Safren2010]]`,
  pt:`Everything goes in one calendar and one list, and big jobs are cut into small first steps.`,
  hook:`Safren CBT core modules: organise & plan (4 sessions) → reduce distractibility (2) → cognitive restructuring (3). [[Safren2010]]`},
 {from:.36,at:.43,k:'Sessions 5–6 · core module 2',t:'Reduce distractibility',
  txt:`The second core module, 2 sessions, works on distractibility. The planner shows one way this is often practised: work in timed blocks sized to the person's real attention span, with stray thoughts parked on a note to deal with later. The exact techniques are in the manual; the drawing is an illustration. [[Safren2010]]`,
  pt:`Work in short, timed blocks you can actually finish, and park distractions on a note for later.`,
  hook:`Two sessions on distractibility sit between planning and cognitive restructuring in Safren's protocol.`},
 {from:.5,at:.59,k:'Sessions 7–9 · core module 3',t:'Adaptive thinking',
  txt:`Cognitive restructuring takes 3 sessions: noticing the thought that fuels avoidance and testing it. In the loop, "I'll do it later" is rewritten as "Start with 10 minutes", which turns the next arrow from avoidance into a first step. Group meta-cognitive therapy, which focuses on time management, organisation and planning, beat supportive group therapy in 88 adults (odds ratio for response 5.41). [[Safren2010,Solanto2010]]`,
  pt:`Catch the thought that says "later", and swap it for one that gets you started.`,
  hook:`Meta-cognitive group therapy vs supportive group: OR for response 5.41 (95% CI 1.77 to 16.55). [[Solanto2010]]`},
 {from:.68,at:.76,k:'Sessions 10–12 · optional and ending',t:'Procrastination and relapse prevention',
  txt:`Optional sessions cover procrastination and a session with a family member, and the course ends with relapse prevention: which skills to keep, and what to do when old habits return. A meta-analysis found adult psychosocial treatment gains maintained for at least 12 months. [[Safren2010,LopezPinar2018]]`,
  pt:`The last sessions plan for bad weeks, so the skills survive after therapy ends.`,
  hook:`Adult psychosocial treatment: gains maintained ≥12 months; group DBT trials and active-control trials gave smaller effects. [[LopezPinar2018]]`},
 {from:.84,at:.95,k:'After 12 sessions',t:'Responders: twice as many with CBT',
  txt:`On the ADHD rating scale scored by a blind assessor, CBT beat the comparison arm (difference −4.63, 95% CI −8.30 to −0.96). Responders were 67% versus 33% (odds ratio 4.29), and on the clinician global impression 53% versus 23% (odds ratio 3.80). Gains were maintained at 6 and 12 months. These are group results in medicated adults; they cannot predict one person's response. [[Safren2010]]`,
  pt:`Adults with ADHD can benefit from CBT focused on planning, organising and handling distraction, especially alongside medicine.`,
  hook:`Adult CBT (Safren 2010): responders 67% vs 33% on the ADHD rating scale, 53% vs 23% on the CGI.`}
];
/* planner entries: [day 0-6, slot 0-2, line1, line2, colour, step from which it appears] */
const TH_PLAN_CBT=[[6,2,'Plan','week','--beh',1],[0,0,'Essay','pt 1','--beh',1],[2,1,'Essay','pt 2','--beh',1],[3,0,'Pay','bills','--beh',1],[4,1,'Essay','pt 3','--beh',1],
 [1,1,'25min','block','--accent',2],[3,1,'25min','block','--accent',2],[1,0,'Phone','away','--accent',2],
 [2,0,'Test','that','--dx',3],[0,2,'Start','10min','--gold',4],[5,0,'Look','back','--gold',4]];
const TH_PLAN_CTL=[[0,0,'ADHD','info','--muted',1],[0,2,'Relax','15min','--muted',1],[2,2,'Relax','15min','--muted',2],[4,2,'Relax','15min','--muted',3],[6,2,'Relax','15min','--muted',4],[3,0,'ADHD','info','--muted',3]];
/* sessions reached at each t */
const thSess=t=>t<.14?0:t<.36?Math.ceil(lerp(.01,4,ramp(t,.14,.3))):t<.5?4+Math.ceil(lerp(.01,2,ramp(t,.36,.46))):t<.68?6+Math.ceil(lerp(.01,3,ramp(t,.5,.64))):t<.84?9+Math.ceil(lerp(.01,3,ramp(t,.68,.8))):12;
/* evidence ladder rows: r rung, o lenient [value,label], s strict [value,label] (null = no figure) */
const TH_RUNG={est:['Established','var(--good)','var(--good-soft)'],early:['Early evidence','var(--warn)','var(--warn-soft)'],hyp:['Hypothesis','var(--rx)','var(--rx-soft)'],none:['Small or no effect on blinded ADHD ratings','var(--bad)','var(--bad-soft)']};
const TH_IV=[
 {n:'CBT (adults)',r:'est',o:[.76,'vs wait list'],s:[.43,'vs active controls'],
  txt:`Pooled adult RCTs: SMD 0.76 against the wait list (4 trials, 160 people) and 0.43 against active controls (3 trials, 191). The 2025 umbrella review rated adult CBT as moderate-certainty evidence on clinician ratings (SMD 0.53), similar to methylphenidate (0.50). In a component network meta-analysis, though, CBT beat placebo only on clinician-rated, not self-rated, scales. [[YoungZ2020,Gosling2025,Ostinelli2025]]`},
 {n:'Parent training (parenting)',r:'est',o:[.68,'positive parenting, unblinded'],s:[.63,'probably blinded'],
  txt:`Behavioural parent training improved positive parenting (SMD 0.68 unblinded, 0.63 probably blinded), negative parenting (0.57, 0.43) and child conduct problems (0.26, 0.31). It is classed "well-established". See <a href="#parenting" data-go="parenting">Parent training &amp; classroom support</a>. [[Daley2014,Evans2014]]`},
 {n:'Organisational skills training',r:'est',o:[1.18,'teacher-rated d vs wait list'],s:null,sl:'no blinded figure in these sources',
  txt:`In 158 children in grades 3–5, organisational skills training beat the wait list on teacher-rated (d 1.18) and parent-rated (d 2.77) organisation; 60% versus 3% no longer had organisational impairment. Classed "well-established". The ratings were not blinded. [[Abikoff2013,Evans2014]]`},
 {n:'Mindfulness (adults)',r:'early',o:[.66,'inattention, mostly uncontrolled'],s:[.41,'single-blind RCT vs usual care'],
  txt:`A meta-analysis of mindfulness-based therapies found d −0.66 for inattention (10 studies), mostly from small and uncontrolled studies. In a multicentre single-blind RCT of 120 adults, 8 weeks of mindfulness-based cognitive therapy plus usual care beat usual care alone (d 0.41), lasting to 6 months. The 2025 umbrella review rated the large adult effects as low or very low certainty. [[Cairncross2020,Janssen2019,Gosling2025]]`},
 {n:'DBT-based skills group',r:'early',o:null,ol:'self-rated gains in a 51-adult RCT',s:[0,'no better than clinical management'],
  txt:`In COMPAS (433 adults), a highly structured DBT-based group was no better than individual clinical management on the blinded ADHD index at 3 months (17.6 vs 16.5), though it beat it on the clinician's global assessment of effectiveness. In a Swedish RCT of 51 adults, completers on stable medication had reduced self-rated symptoms with skills training but not with a loosely structured discussion group. [[Philipsen2015,Hirvikoski2011]]`},
 {n:'Psychoeducation (adults)',r:'early',o:[.77,'clinician-rated vs placebo'],s:null,sl:'not significant on self-rated scales',
  txt:`In a component network meta-analysis of 113 adult RCTs (14,887 people), psychoeducation beat placebo on clinician-rated scales (SMD −0.77) but not on self-rated scales. NICE asks for a full discussion after diagnosis, including strengths, stigma and labelling. [[Ostinelli2025,NICE2018F]]`},
 {n:'Physical exercise',r:'early',o:[.84,'attention; small, mostly unblinded'],s:null,sl:'no blinded pooled figure',
  txt:`Eight small RCTs (249 children) pooled to SMD 0.84 for attention, 0.56 for hyperactivity and impulsivity. A 2026 network meta-analysis (39 RCTs) found closed-skill exercise best for core symptoms (g −0.54) and estimated a minimum of about 20–25 minutes of moderate activity a day. NICE stresses regular exercise as part of a healthy lifestyle. [[Cerrillo2015,Zhang2026Exercise,NICE2018F]]`},
 {n:'Omega-3 / fatty acids',r:'early',o:null,ol:'small, significant (no SMD given here)',s:[.16,'probably blinded'],
  txt:`On probably blinded ratings, free fatty acid supplementation stayed significant but small (SMD 0.16). A meta-analysis of 10 omega-3 trials (699 children) found a small effect, larger with more EPA and modest beside medication. NICE says not to advise or offer fatty acid supplements to treat ADHD in children and young people. [[SonugaBarke2013,Bloch2011,NICE2018F]]`},
 {n:'Artificial colour exclusion',r:'early',o:null,ol:'no unblinded figure in these sources',s:[.42,'probably blinded; selected children'],
  txt:`Excluding artificial food colours stayed significant on probably blinded ratings (SMD 0.42), but these trials often enrolled children selected for food sensitivity. About 8% of children with ADHD may have symptoms related to synthetic colours. NICE advises against eliminating colourings and additives as a general treatment. [[SonugaBarke2013,Nigg2012FoodColor,NICE2018F]]`},
 {n:'Restricted elimination diet',r:'early',o:null,ol:'INCA: 23.7 points lower on masked ratings',s:null,sl:'not significant in the pooled blinded analysis',
  txt:`In the INCA trial (100 children aged 4–8), a 5-week restricted elimination diet lowered masked-paediatrician ratings by 23.7 points more than a healthy-diet control, and 63% of responders relapsed on food challenge, whatever their IgG levels; the authors discourage IgG-based diets. Pooled, restricted elimination diets were not significant on probably blinded ratings. NICE says to tell families there is no evidence on the long-term effects of a "few food" diet. [[Pelsser2011,SonugaBarke2013,NICE2018F]]`},
 {n:'ADHD coaching',r:'hyp',o:null,ol:'uncontrolled studies only',s:null,sl:'no randomised trial',
  txt:`Coaching offers practical goal-setting and accountability, often mixing CBT and psychoeducation. In 148 college students, an 8-week programme was followed by better study strategies, self-esteem and satisfaction, and an earlier study of 45 adults reported self-rated benefits; neither had a control group, and the authors call for randomised trials. [[Prevatt2015,Kubik2010]]`},
 {n:'Neurofeedback',r:'none',o:[.35,'unblinded ratings (2016)'],s:[.04,'probably blinded (2025)'],
  txt:`In 13 trials (520 children), neurofeedback helped only on unblinded ratings (SMD 0.35). The 2025 update of 38 RCTs found no effect on probably blinded total symptoms (SMD 0.04, 95% CI −0.10 to 0.18), with a small effect for standard protocols (0.21). In a double-blind trial with a realistic sham, both groups improved strongly and neurofeedback was not superior. [[Cortese2016,Westwood2025,NFCG2021]]`},
 {n:'Cognitive training',r:'none',o:[.37,'unblinded ratings'],s:[.20,'probably blinded'],
  txt:`In 16 RCTs (759 children), cognitive training fell from SMD 0.37 on unblinded to 0.20 on probably blinded ratings, and working-memory training alone had no effect on ADHD symptoms. It improved laboratory working-memory tests (SMD 0.52 verbal, 0.47 visual) but not academic performance: the trained skill did not transfer. [[Cortese2015]]`},
 {n:'Parent training (ADHD symptoms)',r:'none',o:[.35,'rated by parents'],s:null,sl:'not significant when blinded',
  txt:`Rated by the people closest to treatment, child ADHD symptoms improved (SMD 0.35); on probably blinded ratings they did not. Parent training is still recommended for its effects on parenting, conduct and function. [[Daley2014,Daley2018]]`},
 {n:'Social skills training',r:'none',o:[.11,'teacher-rated (Cochrane)'],s:null,sl:'no clinically relevant effect',
  txt:`The 2019 Cochrane review (25 RCTs, 2,690 children) found SMD 0.11 on teacher-rated social skills, about 1.22 points on a 0–102 scale where 10 points is the smallest clinically relevant difference. [[Storebo2019]]`}
];

inits.therapy=()=>{
  const svg=$('#thSvg'),rg=$('#thT');let arm='cbt';
  const ink='fill:var(--ink)';
  function node(cx,cy,w,h,head,txt,c,hl){return `<rect x="${f1(cx-w/2)}" y="${f1(cy-h/2)}" width="${w}" height="${h}" rx="10" style="fill:${hl?'var(--beh-soft)':'var(--panel)'};stroke:${c};stroke-width:${hl?2:1.4}"/><text x="${f1(cx)}" y="${f1(cy-4)}" class="t-xs t-mid" style="fill:${c};font-weight:700">${head}</text><text x="${f1(cx)}" y="${f1(cy+10)}" class="t-xs t-mid" style="${ink}">${txt}</text>`}
  function chip(x,y,txt,c){const w=txt.length*5.8+14;return `<rect x="${f1(x-w/2)}" y="${f1(y-9)}" width="${f1(w)}" height="17" rx="8.5" style="fill:var(${c}-soft);stroke:var(${c})"/><text x="${f1(x)}" y="${f1(y+3)}" class="t-xs t-mid" style="fill:var(${c});font-weight:700">${txt}</text>`}
  function loop(t,P,u,cx,cy,R){const cbt=arm==='cbt',rw=P>=3&&cbt;let s='';
    const pts=[[cx,cy-R*.86],[cx+R*1.12,cy],[cx,cy+R*.86],[cx-R*1.12,cy]];
    /* arrows round the loop */
    for(let i=0;i<4;i++){const [x1,y1]=pts[i],[x2,y2]=pts[(i+1)%4],mx=(x1+x2)/2+(i===0||i===3?1:-1)*0+((i===0||i===1)?1:-1)*R*.28,my=(y1+y2)/2+((i===1||i===2)?1:-1)*R*.28;
      const qx=lerp(mx,cx,-.0),qy=my;void qx;
      const a=`M${f1(lerp(x1,x2,.18))} ${f1(lerp(y1,y2,.18))}Q${f1(i===0||i===1?cx+R*.85:cx-R*.85)} ${f1(i===0||i===3?cy-R*.65:cy+R*.65)} ${f1(lerp(x1,x2,.82))} ${f1(lerp(y1,y2,.82))}`;
      s+=`<path d="${a}" style="fill:none;stroke:${rw&&i===0?'var(--beh)':'var(--muted)'};stroke-width:1.6" marker-end="url(#thArr)"/>`}
    /* token travels round */
    const ang=-Math.PI/2+((t*9)%1)*Math.PI*2;s+=`<circle cx="${f1(cx+Math.cos(ang)*R*.95)}" cy="${f1(cy+Math.sin(ang)*R*.78)}" r="5" style="fill:var(--brand);opacity:${P===0?.95:.5}"/>`;
    const w=118,h=40;
    s+=node(pts[0][0],pts[0][1],w+20,h,'THOUGHT',rw?'"Start with 10 minutes"':'"I\'ll do it later"',rw?'var(--beh)':'var(--dx)',rw);
    s+=node(pts[1][0],pts[1][1],w-6,h,'FEELING','overwhelmed, tense','var(--dz)',false);
    s+=node(pts[2][0],pts[2][1],w,h,'BEHAVIOUR',rw?'a first small step':'avoids, scrolls','var(--brand)',rw);
    s+=node(pts[3][0],pts[3][1],w-14,h,'RESULT',rw?'some progress':'quick relief','var(--gold)',false);
    /* skills pinned on the loop as modules are learned */
    if(cbt){if(P>=1&&P<5||P===5)s+=chip(cx+R*.62,cy+R*.6,'steps + calendar','--beh');
      if(P>=2)s+=chip(cx-R*.62,cy+R*.6,'timed block','--accent');
      if(P>=3)s+=chip(cx-R*.62,cy-R*.6,'thought check','--dx');}
    else if(P>=1)s+=chip(cx+R*.62,cy+R*.6,'relaxation','--gold');
    /* pile of unscheduled tasks */
    const moved=cbt?ramp(t,.14,.3):0,n=Math.round((P===0?ramp(u,.1,.9):1)*6*(1-moved*.67));
    const pxl=cx-R*1.12-40,py=cy+R*.86+26;
    for(let i=0;i<n;i++)s+=`<rect x="${f1(pxl+(i%2)*6)}" y="${f1(py-i*9)}" width="34" height="8" rx="2" style="fill:var(--panel-2);stroke:var(--warn)"/>`;
    if(n)s+=`<text x="${f1(pxl+20)}" y="${f1(py+20)}" class="t-xs t-mid" style="fill:var(--warn)">unscheduled</text>`;
    return s}
  function planner(t,P,x,y,w,rh=44){const cbt=arm==='cbt',cw=(w-34)/7;let s='';
    s+=`<text x="${x}" y="${y-8}" class="t-sm" style="fill:var(--beh);font-weight:700">WEEK PLANNER</text>`;
    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach((d,i)=>s+=`<text x="${f1(x+34+cw*i+cw/2)}" y="${y+10}" class="t-xs t-mid">${d}</text>`);
    ['AM','PM','Eve'].forEach((r,j)=>{s+=`<text x="${x}" y="${f1(y+18+j*rh+rh/2+3)}" class="t-xs">${r}</text>`;for(let i=0;i<7;i++)s+=`<rect x="${f1(x+34+cw*i+1)}" y="${f1(y+18+j*rh+1)}" width="${f1(cw-2)}" height="${rh-2}" rx="4" style="fill:var(--field);stroke:var(--line)"/>`});
    const L=cbt?TH_PLAN_CBT:TH_PLAN_CTL;
    L.forEach(([d,sl,a,b,c,st],k)=>{if(P<st)return;const o=P>st?1:clamp((t-TH_STEPS[st].from)*14-k*.15);if(o<=0)return;const bx=x+34+cw*d+3,by=y+18+sl*rh+3;
      s+=`<g style="opacity:${f1(o)}"><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(cw-6)}" height="${rh-6}" rx="4" style="fill:var(${c==='--muted'?'--panel-2':c+'-soft'});stroke:var(${c})"/><text x="${f1(bx+(cw-6)/2)}" y="${f1(by+15)}" class="t-xs t-mid" style="${ink}">${a}</text><text x="${f1(bx+(cw-6)/2)}" y="${f1(by+28)}" class="t-xs t-mid">${b}</text></g>`});
    return s}
  function results(t,x,y,w){const g=ease(ramp(t,.85,.93)),cbt=arm==='cbt';let s='';
    s+=`<text x="${x}" y="${y-8}" class="t-sm" style="fill:var(--beh);font-weight:700">RESPONDERS · 86 ADULTS</text>`;
    const R=[['ADHD rating scale (blind assessor)',67,33],['Clinical global impression',53,23]],bw=w-40;
    R.forEach(([n,a,b],i)=>{const yy=y+12+i*78;s+=`<text x="${x}" y="${yy}" class="t-xs" style="${ink}">${n}</text>`;
      [[a,'CBT','var(--beh)',cbt],[b,'Comparison','var(--muted)',!cbt]].forEach(([v,l,c,hi],k)=>{const by=yy+8+k*26;
        s+=`<rect x="${x}" y="${by}" width="${f1(bw*v/100*g)}" height="18" rx="3" style="fill:${c};opacity:${hi?1:.45}"/><text x="${f1(x+bw*v/100*g+5)}" y="${by+13}" class="t-xs" style="${hi?ink+';font-weight:700':''}">${v}% ${l}</text>`})});
    s+=`<text x="${x}" y="${y+178}" class="t-xs">Gains maintained at 6 and 12 months. Group results.</text>`;
    return s}
  function sessions(t,x,y,w){const n=thSess(t),cbt=arm==='cbt',bw=w/12;let s='';
    const col=i=>!cbt?'--muted':i<4?'--beh':i<6?'--accent':i<9?'--dx':'--gold';
    for(let i=0;i<12;i++){const on=i<n,c=col(i);s+=`<rect x="${f1(x+i*bw+1)}" y="${y}" width="${f1(bw-2)}" height="20" rx="4" style="fill:${on?`var(${c==='--muted'?'--muted':c})`:'var(--panel)'};stroke:var(${c});opacity:${on?.9:.6}"/><text x="${f1(x+i*bw+bw/2)}" y="${y+14}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`}
    if(cbt){[[0,4,'organise & plan'],[4,6,'distraction'],[6,9,'thinking'],[9,12,'optional · end']].forEach(([a,b,l])=>{s+=`<text x="${f1(x+(a+b)/2*bw)}" y="${y+34}" class="t-xs t-mid">${l}</text>`})}
    else s+=`<text x="${f1(x+w/2)}" y="${y+34}" class="t-xs t-mid">relaxation + educational support, attention-matched</text>`;
    return s}
  function draw(t){const N=vb(svg,'720 400','400 650'),P=phaseOf(TH_STEPS,t),st=TH_STEPS[P],nx=P<5?TH_STEPS[P+1].from:1.0001,u=clamp((t-st.from)/(nx-st.from));
    let s=`<defs>${marker('thArr','var(--muted)',5)}</defs>`;
    if(N){s+=loop(t,P,u,200,180,118);s+=P<5?planner(t,P,12,372,376,58):results(t,14,382,372);s+=sessions(t,12,594,376)}
    else{s+=loop(t,P,u,190,186,112);s+=P<5?planner(t,P,384,40,326,62):results(t,388,48,316);s+=sessions(t,384,328,326)}
    s+=`<text x="${N?14:10}" y="${N?24:22}" class="t-sm" style="fill:var(--muted)">${arm==='cbt'?'CBT arm':'Comparison arm'} · session ${thSess(t)} of 12</text>`;
    svg.innerHTML=s;setSt(P);
    rg.setAttribute('aria-valuetext',`Session ${thSess(t)} of 12: ${st.t}`);
    $('#thNote').innerHTML=noteHTML(st)+(arm==='ctl'&&P>0?`<div class="callout"><b>Comparison arm.</b> The control group had the same number of sessions of relaxation training with educational support about ADHD, matched for therapist attention, so the trial tests the CBT skills rather than simply seeing a therapist. In this arm 33% responded on the ADHD rating scale, against 67% with CBT. [[Safren2010]]</div>`:'')}
  const stop=playWire(rg,$('#thPlay'),draw,30000,'%t:player.replay%','therapy');
  const setSt=stepWire($('#thSteps'),TH_STEPS,rg,draw,stop);
  $$('[data-th-arm]').forEach(b=>b.addEventListener('click',()=>{arm=b.dataset.thArm;$$('[data-th-arm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- evidence ladder ---- */
  const ls=$('#thLadSvg');let test='open',sel=0,cancel=null;
  const cur=TH_IV.map(r=>({v:(r.o||[0])[0],a:r.o?1:0}));
  const order=['est','early','hyp','none'];
  function drawL(){const NN=NARROW(),rh=NN?46:22,hh=24,top=NN?16:14,ay=top+order.length*(hh+4)+TH_IV.length*rh+2;
    const N=vb(ls,'720 '+(ay+34),'400 '+(ay+50)),ax0=N?14:256,ax1=N?386:700,X=v=>ax0+(ax1-ax0)*clamp(v/1.2,0,1);let y=top,s='';
    const halo='paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round';
    [0,.2,.4,.6,.8,1,1.2].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="8" y2="${ay}" class="grid"/><text x="${f1(X(v))}" y="${ay+13}" class="t-xs t-mid">${v.toFixed(1)}</text>`);
    s+=`<line x1="${f1(X(.5))}" x2="${f1(X(.5))}" y1="8" y2="${ay}" style="stroke:var(--rx);stroke-width:1.4;stroke-dasharray:5 3"/><text x="${f1(X(.5))}" y="${ay+28}" class="t-xs t-mid" style="fill:var(--rx)">┆ methylphenidate, adults</text>`;
    s+=`<text x="14" y="${N?ay+44:ay+13}" class="t-xs">SMD or d → bigger benefit</text>`;
    order.forEach(rk=>{const R=TH_RUNG[rk];s+=`<rect x="6" y="${y}" width="${N?388:708}" height="${hh-6}" rx="5" style="fill:${R[2]}"/><text x="12" y="${y+13}" class="t-xs" style="fill:${R[1]};font-weight:700">${R[0].toUpperCase()}</text>`;y+=hh;
      TH_IV.forEach((r,i)=>{if(r.r!==rk)return;const c=cur[i],on=i===sel,val=test==='open'?r.o:r.s,lab=val?val[1]:(test==='open'?r.ol:r.sl)||'no figure';
        const ny=y+13,by=N?y+24:y+11;
        s+=`<g data-row="${i}" style="cursor:pointer"><rect x="6" y="${y}" width="${N?388:708}" height="${rh}" rx="4" style="fill:${on?'var(--panel-2)':'transparent'}"/>`;
        s+=`<text x="14" y="${N?ny:by+4}" class="t-sm" style="${ink}${on?';font-weight:700':''}">${r.n}</text>`;
        s+=`<line x1="${ax0}" x2="${f1(X(c.v))}" y1="${by}" y2="${by}" style="stroke:${R[1]};stroke-width:3;opacity:${f1(c.a*.5)}"/>`;
        s+=`<circle cx="${f1(X(c.v))}" cy="${by}" r="${on?6:5}" style="fill:${R[1]};opacity:${f1(c.a)};stroke:var(--panel);stroke-width:1.5"/>`;
        const vtxt=val?`${val[0].toFixed(2)} · ${lab}`:lab;
        if(N)s+=`<text x="${ax0}" y="${by+15}" class="t-xs" style="${val?'':'font-style:italic'}">${vtxt}</text>`;
        else{const anchorEnd=val&&X(c.v)>ax1-170;s+=`<text x="${f1(val?(anchorEnd?X(c.v)-10:X(c.v)+10):ax0+4)}" y="${by+3.5}" class="t-xs${anchorEnd?' t-end':''}" style="${halo};${val?'':'font-style:italic'}">${vtxt}</text>`}
        s+='</g>';y+=rh});
      y+=4});
    ls.innerHTML=s}
  function noteL(){const r=TH_IV[sel],R=TH_RUNG[r.r],ev=r.r==='est'?'<span class="ev est">Established</span>':r.r==='early'?'<span class="ev early">Early evidence</span>':r.r==='hyp'?'<span class="ev hyp">Hypothesis</span>':'<span class="tag bad">Small or no blinded effect</span>';void R;
    const f=(v,l)=>v?`<b>${v[0].toFixed(2)}</b> (${v[1]})`:`<i>${l||'no figure'}</i>`;
    $('#thLadNote').innerHTML=`<div class="kicker">Evidence ladder</div><h4>${r.n}</h4><div class="chips">${ev}</div><dl class="kv"><div><dt>Lenient comparison</dt><dd>${f(r.o,r.ol)}</dd></div><div><dt>Strict comparison</dt><dd>${f(r.s,r.sl)}</dd></div></dl><p>${r.txt}</p>`;
    $$('[data-th-iv]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.thIv===sel))}
  function setTest(m){test=m;$$('[data-th-test]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.thTest===m));
    const from=cur.map(c=>({...c})),to=TH_IV.map((r,i)=>{const v=m==='open'?r.o:r.s;return v?{v:v[0],a:1}:{v:from[i].v*.3,a:0}});
    if(cancel)cancel();cancel=animate(700,p=>{const e=ease(p);cur.forEach((c,i)=>{c.v=lerp(from[i].v,to[i].v,e);c.a=lerp(from[i].a,to[i].a,e)});drawL()},()=>{cancel=null})}
  $('#thIv').innerHTML=TH_IV.map((r,i)=>`<button class="btn" data-th-iv="${i}" aria-pressed="${i===sel}">${r.n}</button>`).join('');
  $('#thIv').addEventListener('click',e=>{const b=e.target.closest('[data-th-iv]');if(!b)return;sel=+b.dataset.thIv;drawL();noteL()});
  ls.addEventListener('click',e=>{const g=e.target.closest('[data-row]');if(!g)return;sel=+g.dataset.row;drawL();noteL()});
  $$('[data-th-test]').forEach(b=>b.addEventListener('click',()=>setTest(b.dataset.thTest)));
  redraws.therapy=(prev=>()=>{prev&&prev();drawL()})(redraws.therapy);
  drawL();noteL();
};
