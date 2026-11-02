/* =============== 5.3 Living with BPD =============== */
/* One illustrative week, u in [0,1] = Monday 00:00 to Sunday 24:00. Every number in the week
   drawing is schematic. Index [0] of a pair is "without supports", [1] "with supports". */
const LI_D=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const liU=(d,h)=>(d+h/24)/7;
const LI_EV=[
 {u:liU(0,10),a:[.46,.36],f:[.07,.022],lane:'work',lbl:'deadline moved up',sk:'mindfulness: one task'},
 {u:liU(2,13),a:[.64,.42],f:[.095,.028],lane:'rel',lbl:'text left unanswered',sk:'emotion regulation'},
 {u:liU(5,20),a:[.8,.52],f:[.13,.034],lane:'rel',lbl:'argument',sk:'phone coaching'}
];
const LI_GOOD=liU(6,12);
const LI_SLEEP=[[7,6.2,5.2,6,6.3,4,6.5],[7.2,7,6.6,7.2,7,6.4,7.6]];
const LI_THR=.68;
function liShape(d,f){return d<=0?0:(1-Math.exp(-d/.005))*Math.exp(-d/f)}
function liWave(sup){const k=sup?1:0;return u=>{let v=.2+.025*Math.sin(u*Math.PI*14-1);
  LI_EV.forEach(e=>{v+=e.a[k]*liShape(u-e.u,e.f[k])});
  v-=.09*bump(u,LI_GOOD-.05,LI_GOOD+.07);return v}}
const LI_STEPS=[
 {from:0,at:.083,k:'Monday · work',t:'Monday: the workload lands',
  txt:`A deadline moves up and the wave rises fast. In a Dutch cohort of workers, BPD symptoms went with much higher odds of impaired work performance (OR 6.02), an effect carried by depressive symptoms, which suggests treating mood may help work. [[Juurlink2020NESDA]] An integrative review linked BPD with lower education, more dropout and low employment, with symptoms, self-stigma and non-disclosure as barriers; employment itself appeared to improve symptoms. [[Larcombe2022]] With supports on, a mindfulness skill (attention to the present moment) shortens the wave. [[Chapman2006DBT]]`,
  pt:`Pressure at work can set off a big feeling quickly. A small, practised skill can bring it down sooner.`,
  hook:`Work impairment in BPD was mediated by depressive symptoms in NESDA, so treat co-occurring depression. [[Juurlink2020NESDA]]`},
 {from:liU(2,8),at:liU(2,18),k:'Wednesday · relationships',t:'A text left unanswered',
  txt:`A partner goes quiet for an afternoon and the silence feels like rejection. Across 27 effect sizes, attachment anxiety correlated most strongly with BPD traits (r = 0.48), and avoidance less (r = 0.30); the two interacted, suggesting disorganised attachment. [[Smith2020Attachment]] Emotion regulation is one of the four DBT skills areas, alongside mindfulness, distress tolerance and interpersonal effectiveness. [[Chapman2006DBT]]`,
  pt:`A slow reply can feel like being left. Naming the feeling and checking the facts can stop it from taking over the day.`,
  hook:`Attachment anxiety correlates with BPD traits at r = 0.48; avoidance at r = 0.30. [[Smith2020Attachment]]`},
 {from:liU(3,12),at:liU(3,21),k:'Thursday · therapy',t:'A skills group',
  txt:`Standard DBT combines weekly individual therapy, a weekly skills group of about 1.5–2.5 hours with 4 to 10 members, phone coaching between sessions and a therapist consultation team. [[Chapman2006DBT]] Skills training is the active ingredient for self-injury: in a component trial, arms with skills training reduced non-suicidal self-injury more than DBT without it. [[Linehan2015]] A 20-week skills group reduced suicidal and self-injury episodes more than a waitlist and improved anger, distress tolerance and emotion regulation. [[McMain2017]] Switch to <b>without supports</b> to see a week with no group. More in <a href="#dbt" data-go="dbt">Dialectical behaviour therapy</a>.`,
  pt:`In a skills group you learn and practise ways to handle strong feelings, then try them out during the week.`,
  hook:`DBT has four parts: individual therapy, skills group, phone coaching and a consultation team. [[LinehanWilks2015]]`},
 {from:liU(5,12),at:liU(5,23),k:'Saturday · relationships and health',t:'A weekend conflict',
  txt:`An argument escalates late on Saturday. Among 35 couples in which the woman had BPD, 68.7% had frequent break-ups and reconciliations. [[Bouchard2009]] Without supports the wave stays high into the night: sleep shortens and alcohol appears. People with BPD have objective sleep problems and more nightmares than healthy controls, independent of depression. [[Winsper2017Sleep]] About 45% have a current substance use disorder and 46% a current alcohol use disorder. [[Trull2018]] With supports, a phone-coaching call helps apply a distress-tolerance skill: getting through a crisis without making it worse. [[Chapman2006DBT]]`,
  pt:`If an argument ever involves hurting or being hurt, you deserve to be safe. Health workers can help you find support without judging you. [[NICE2022SelfHarm]]`,
  hook:`IPV: antisocial and borderline personality disorders show the most robust links with both perpetration and victimisation. Assess both directions. [[Collison2021]]`},
 {from:liU(6,4),at:.975,k:'Sunday',t:'A good day',
  txt:`A walk, lunch with a friend, an early night: good days are part of life with BPD too. Over time they become more common. In the McLean study, 93% had a remission lasting at least 2 years within 10 years, though full recovery, which includes work and social functioning, was reached by 50%. [[Zanarini2010Recovery]] Lived-experience research describes recovery as non-linear and driven by hope, engagement, treatment and meaningful activities and relationships. [[Ng2019LivedRecovery]] Relationship difficulties also ease: over 95% of recovered and non-recovered McLean patients reached remission from sexual relationship difficulties over 16 years. [[Karan2016]]`,
  pt:`Recovery is common. Most people with BPD stop meeting the criteria over time, though steady work and relationships can take longer.`,
  hook:`Remission ≠ recovery: at 16 years, remission 78–99% but recovery 40–60%. [[Zanarini2012]]`}
];
/* the domain explorer: rows for a small bar chart, then findings and practical points */
const LI_DOM={
 work:{h:'Work & study',max:100,unit:'%',
  rows:[{l:'Remission by 16 y',lo:78,hi:99,col:'var(--calm)'},{l:'Recovery by 16 y',lo:40,hi:60,col:'var(--brand)'},{l:'IPS job: PD',v:37.6,col:'var(--accent)'},{l:'IPS job: other',v:38.0,col:'var(--other)',fmt:'38.0%'},{l:'SSDI, per wave',v:47.2,col:'var(--med)'}],
  cap:`Ranges depend on how long remission or recovery had to last. IPS = Individual Placement and Support in a Dutch registry; PD = personality disorders. SSDI = US disability income, mean share per follow-up wave over 24 years. [[Zanarini2012,Juurlink2022,Kramer2023SSDI]]`,
  facts:[`Recovery in the McLean study needs both symptom remission and good social and vocational functioning: by 16 years, remission was 78–99% but recovery 40–60%. [[Zanarini2012]]`,
   `People with personality disorders found competitive work through IPS as often as people with other mental disorders (37.6% vs 38.0%), with a median 195.5 vs 178.5 days to a job. [[Juurlink2022]]`,
   `SSDI status was fluid: 40% of baseline recipients came off it, though 43% of those went back on, and 55% of recipients had worked or studied at least half of the previous 2 years by year 10. [[Zanarini2009]]`,
   `In university samples, clinically significant BPD features had a lifetime prevalence of 9.7%, with wide variation by method. [[Meaney2016]]`,
   `Only 7 papers on employment interventions for BPD were found, all small or non-randomised; INVEST is testing IPS for young people with BPD features. [[Kernot2023,Chanen2020INVEST]] <span class="ev hyp">Hypothesis</span>`],
  dos:[`NICE asks care plans to set long-term goals, including employment and occupation, linked to short-term treatment aims. [[NICE2009]]`,
   `Ask the care team about supported employment such as IPS. [[Juurlink2022]]`,
   `Treating co-occurring depression may help work functioning. [[Juurlink2020NESDA]]`]},
 rel:{h:'Relationships',max:100,unit:'',
  rows:[{l:'Attachment anxiety (r × 100)',v:48,col:'var(--self)',fmt:'r = 0.48'},{l:'Attachment avoidance (r × 100)',v:30,col:'var(--other)',fmt:'r = 0.30'},{l:'Couples: break-up cycles',v:68.7,col:'var(--bond)',fmt:'68.7%'},{l:'Couples: separated by 18 mo',v:30,col:'var(--muted)',fmt:'~30%'}],
  cap:`Correlations are shown ×100 to share an axis with percentages. Couple figures come from 35 couples in which the woman had BPD. [[Smith2020Attachment,Bouchard2009]]`,
  facts:[`Attachment anxiety correlated most strongly with BPD traits (r = 0.48), avoidance less (r = 0.30). [[Smith2020Attachment]]`,
   `Compared with 35 non-clinical couples, couples in which the woman had BPD had lower satisfaction, more demand/withdraw communication and more violence; nearly half of the male partners met criteria for a personality disorder. [[Bouchard2009]]`,
   `Recovered McLean patients were more likely to have married or cohabited and become parents, and less likely to have lost custody of a child. [[Zanarini2015Marriage]]`,
   `In a meta-analysis of 163 studies, antisocial and borderline personality disorders had the most robust links with both perpetration and victimisation of intimate partner violence. [[Collison2021]] In a British population sample, serious and repeated violence was better explained by co-occurring substance misuse, anxiety and antisocial personality disorder. [[Gonzalez2016]]`],
  dos:[`NICE NG225 asks staff who see someone after self-harm to ask about domestic abuse, violence or exploitation, alone if appropriate. [[NICE2022SelfHarm]]`,
   `If a relationship involves hurting or being hurt, you deserve to be safe, and health workers can help without judging you. [[NICE2022SelfHarm]]`]},
 preg:{h:'Parenting & pregnancy',max:12,unit:'%',
  rows:[{l:'Valproate',v:10.3,col:'var(--bad)'},{l:'Carbamazepine',v:5.5,col:'var(--med)'},{l:'Topiramate',v:3.9,col:'var(--med)'},{l:'Oxcarbazepine',v:3.0,col:'var(--muted)',fmt:'3.0%'},{l:'Lamotrigine',v:2.9,col:'var(--muted)'},{l:'Levetiracetam',v:2.8,col:'var(--muted)'}],
  cap:`Major congenital malformations by drug, EURAP registry, 7,355 monotherapy pregnancies (mostly epilepsy). No medicine is approved for BPD itself; these are relevant only because some are prescribed off-label. [[Tomson2018]]`,
  facts:[`In clinical perinatal samples, the pooled prevalence of BPD was 14.0%; in non-clinical samples, 0.7–1.7%. [[Prasad2022]]`,
   `In US birth data, BPD was linked after adjustment with preterm birth (OR 1.54), caesarean delivery (1.44), gestational diabetes (1.45) and venous thromboembolism (2.11). [[PareMiron2016]]`,
   `The Depakote label states valproate "should not be administered to a woman of childbearing potential unless other medications have failed to provide adequate symptom control or are otherwise unacceptable". [[FDA-Depakote]] After high-dose exposure, IQ at age 6 was 9.7 points lower. [[Baker2015]] Valproate and topiramate exposure went with more autism and intellectual disability; lamotrigine showed no consistent rise. [[Bjork2022,MadleyDowd2024]]`,
   `First-trimester lithium went with cardiac malformations in 2.41% vs 1.15% unexposed, rising with dose. [[Patorno2017]]`,
   `Reviews link maternal BPD with less sensitive, more intrusive parenting and higher parenting stress, and call for parenting interventions. [[Petfield2015,Steele2019]] <span class="ev early">Early evidence</span> In Mother–Infant DBT, 71% completed the 25 weeks and mothers' symptoms improved, though observed interaction often stayed of concern. [[SvedWilliams2021]] Mothers described more confidence reading their child's cues. [[Francis2023]]`],
  dos:[`If you are pregnant or planning a baby, ask your doctor about every medicine you take. [[FDA-Depakote]]`,
   `Interventions for perinatal BPD are few (7 studies, 2 RCTs); DBT skills groups, mother–baby units and child–parent psychotherapy showed promise. [[May2023]] <span class="ev early">Early evidence</span> See <a href="#meds" data-go="meds">Medication: the evidence</a>.`]},
 health:{h:'Physical health',max:100,unit:'%',
  rows:[{l:'Current SUD',v:45.46,col:'var(--med)'},{l:'Lifetime SUD',v:75.28,col:'var(--med)'},{l:'Current alcohol use disorder',v:46.39,col:'var(--storm)'},{l:'Obese at 6 y (McLean)',v:28,col:'var(--muted)'}],
  cap:`Substance use disorder (SUD) figures from a review of 70 studies; obesity from 264 McLean patients. Population statistics. [[Trull2018,Frankenburg2006Obesity]]`,
  facts:[`In US national survey data, BPD was linked with hypertension, liver, cardiovascular and gastrointestinal disease and arthritis after full adjustment (adjusted ORs 1.46–2.80). [[ElGabalawy2010]]`,
   `People whose BPD had not remitted were more likely to report obesity, diabetes, hypertension, back pain and chronic fatigue, and to use more emergency and hospital care. [[Frankenburg2004Medical,Keuroghlian2013Medical]]`,
   `In a Hong Kong cohort, BPD was linked with natural-cause mortality (HR 2.02), with cardiovascular disease a leading contributor, and 13.01 excess life-years lost; the authors called for physical-health monitoring alongside suicide prevention. These are population statistics. [[Chan2026]]`,
   `People with BPD sleep less efficiently and have more nightmares than healthy controls, independent of depression; non-recovered McLean patients took 39 vs 28 minutes to fall asleep. [[Winsper2017Sleep,Plante2013]]`],
  dos:[`NICE asks clinicians to monitor a broad range of outcomes, including drug and alcohol use, alongside BPD symptoms. [[NICE2009]]`,
   `Sleep, exercise, smoking, alcohol and regular check-ups are part of getting well. [[Keuroghlian2013Medical,Winsper2017Sleep]] Whether treating BPD improves physical health is unknown: the links are associations.`]},
 stigma:{h:'Stigma & disclosure',max:100,unit:'%',
  rows:[{l:'No credentials given',v:59.9,col:'var(--muted)'},{l:'Misinformation: diagnosis',v:29.2,col:'var(--storm)'},{l:'Misinformation: explainers',v:24.7,col:'var(--storm)'}],
  cap:`207 TikTok videos about BPD. Personal-experience videos drew far more engagement than treatment videos (mean weighted likes 2,389 vs 222). [[Evoy2026]]`,
  facts:[`BPD may carry stigma beyond other mental illnesses; clinicians' emotional distancing can be felt as rejection and set up a self-fulfilling cycle. [[Aviram2006]]`,
   `The public may read BPD symptoms as "purposeful misbehaviour"; recovery messages plus biological explanations looked most promising against stigma. [[Ociskova2023]] <span class="ev early">Early evidence</span>`,
   `Comments on BPD TikTok videos showed frequent self-diagnosis, confusion with autism and ADHD, and distrust of professional diagnosis; social media worked as both support and misinformation. [[Theriault2026]]`,
   `Self-stigma predicted low self-esteem in women with BPD, beyond depression and shame. [[Rusch2006]] Non-disclosure was a barrier to work and study, and honesty an enabler. [[Larcombe2022]]`],
  dos:[`You should never be turned away from care because of your diagnosis or because you have self-harmed. [[NICE2009]]`,
   `Check who made a video and whether they cite evidence; a diagnosis needs an assessment, not a quiz. See <a href="#assess" data-go="assess">Assessment &amp; interviews</a>. [[Evoy2026]]`]}
};
inits.living=()=>{
  const svg=$('#liSvg'),rg=$('#liT'),note=$('#liNote'),read=$('#liRead');
  let sup=store.get('li-sup',1)?1:0,setSt=()=>{};
  const hoursAbove=k=>{const f=liWave(k);let n=0;for(let i=0;i<=1680;i++)if(f(i/1680)>LI_THR)n++;return Math.round(n/10)};
  const H=[hoursAbove(0),hoursAbove(1)];
  function draw(t){
    const N=vb(svg,'720 400','400 410');
    const L=N?{x0:66,x1:392,eT:16,e0:28,e1:176,lw:{work:206,rel:244},hs:[268,312],th:342,ax:370,lab:4,leg:398}
             :{x0:122,x1:708,eT:18,e0:28,e1:150,lw:{work:180,rel:214},hs:[236,280],th:312,ax:338,lab:8,leg:384};
    const W=L.x1-L.x0,X=u=>L.x0+W*u,k=sup;
    let s='';
    /* day columns */
    for(let d=0;d<7;d++){if(d%2)s+=`<rect x="${f1(X(d/7))}" y="${L.e0-6}" width="${f1(W/7)}" height="${L.ax-L.e0+6}" style="fill:var(--panel-2);opacity:.45"/>`;
      s+=`<text x="${f1(X((d+.5)/7))}" y="${L.ax+16}" class="t-xs t-mid" style="${Math.floor(t*7)===d?'fill:var(--ink);font-weight:700':''}">${LI_D[d]}</text>`}
    s+=tline(L.x0,L.ax,W,{min:0,max:7,step:1,fmt:()=>''}).svg;
    /* lane titles */
    const lane=(y,txt)=>`<text x="${L.lab}" y="${f1(y+4)}" class="t-sm" style="fill:var(--ink)">${txt}</text>`;
    s+=`<text x="${L.lab}" y="${L.eT}" class="t-sm" style="fill:var(--mood);font-weight:600">EMOTION WAVE</text>`;
    s+=lane(L.lw.work,N?'Work':'Work / study')+lane(L.lw.rel,N?'People':'Relationships')+lane((L.hs[0]+L.hs[1])/2,N?'Health':'Sleep &amp; health')+lane(L.th,N?'Therapy':'Therapy &amp; skills');
    [L.lw.work,L.lw.rel,L.th].forEach(y=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${y}" y2="${y}" class="grid"/>`});
    /* emotion wave: the other condition as a dashed ghost, the current one up to t */
    const fCur=liWave(k),fAlt=liWave(1-k),eh=L.e1-L.e0;
    const g=wave(L.x0,L.e0,W,eh,fAlt,{upto:1,col:'var(--muted)',dash:true});
    s+=`<g style="opacity:.55">${g.svg}</g>`;
    const w=wave(L.x0,L.e0,W,eh,fCur,{upto:Math.max(.003,t),col:k?'var(--mood)':'var(--storm)',fill:true,dot:true,thr:LI_THR,thrLabel:'overwhelming'});
    s+=w.svg;
    s+=`<text x="${L.x1}" y="${L.e1+12}" class="t-xs t-end">dashed: same week ${k?'without':'with'} supports</text>`;
    /* work: weekday blocks */
    for(let d=0;d<5;d++){const a=liU(d,9),b=liU(d,17);if(t<a)continue;
      s+=`<rect x="${f1(X(a))}" y="${L.lw.work-5}" width="${f1(X(Math.min(b,t))-X(a))}" height="10" rx="3" style="fill:var(--dx);opacity:.35"/>`}
    /* events, and the skill that answers each one */
    LI_EV.forEach((e,i)=>{if(t<e.u)return;const y=L.lw[e.lane],x=X(e.u);
      s+=`<circle cx="${f1(x)}" cy="${y}" r="5.5" style="fill:var(--storm);stroke:var(--panel);stroke-width:1.5"/>`;
      const right=e.u<.8||!N;const lx=right?x+9:x-9;
      s+=`<text x="${f1(lx)}" y="${y-8}" class="t-xs${right?'':' t-end'}" style="fill:var(--storm)">${N&&i===1?'no reply':e.lbl}</text>`;
      const pk=w.at(e.u+.012);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y-6}" y2="${f1(Math.min(pk[1]+4,L.e1))}" style="stroke:var(--storm);stroke-width:1;stroke-dasharray:2 3;opacity:.6"/>`;
      if(k){const su=e.u+.012;if(t>=su){const sx=X(su);
        s+=`<path d="M${f1(sx)} ${L.th-7}l7 7l-7 7l-7 -7z" style="fill:var(--accent)"/>`;
        if(!N||i!==1)s+=`<text x="${f1(sx+(e.u>.8?-10:10))}" y="${L.th+18}" class="t-xs${e.u>.8?' t-end':''}" style="fill:var(--accent)">${N?'skill':e.sk}</text>`;
        const sp=w.at(Math.min(t,su+.02));s+=`<line x1="${f1(sx)}" x2="${f1(sx)}" y1="${L.th-8}" y2="${f1(sp[1]+6)}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:3 3;opacity:.8"/>`}}});
    /* relationships: the reply that came, and Sunday lunch */
    const reply=liU(2,17.5);if(t>=reply){const x=X(reply);s+=`<circle cx="${f1(x)}" cy="${L.lw.rel}" r="4" style="fill:var(--good)"/>`;if(!N)s+=`<text x="${f1(x+7)}" y="${L.lw.rel+14}" class="t-xs" style="fill:var(--good)">reply: "was in a meeting"</text>`}
    const lunch=liU(6,13);if(t>=lunch){const x=X(lunch);s+=`<circle cx="${f1(x)}" cy="${L.lw.rel}" r="4" style="fill:var(--good)"/><text x="${f1(x-7)}" y="${L.lw.rel+14}" class="t-xs t-end" style="fill:var(--good)">lunch with a friend</text>`}
    /* sleep bars, one per night */
    const [h0,h1]=L.hs,hh=h1-h0;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${h1}" y2="${h1}" class="axis"/>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(h1-hh*7/9)}" y2="${f1(h1-hh*7/9)}" style="stroke:var(--calm);stroke-width:1;stroke-dasharray:2 4"/><text x="${L.x0+2}" y="${f1(h1-hh*7/9-3)}" class="t-xs" style="fill:var(--calm)">7 h</text>`;
    LI_SLEEP[k].forEach((hrs,d)=>{const u=liU(d,23.5);if(t<u)return;const bw=N?14:24,x=X(u)-bw/2,bh=hh*hrs/9;
      s+=`<rect x="${f1(x)}" y="${f1(h1-bh)}" width="${bw}" height="${f1(bh)}" rx="3" style="fill:${hrs<5.5?'var(--storm)':'var(--other)'};opacity:.75"/>`;
      if(!N)s+=`<text x="${f1(x+bw/2)}" y="${f1(h1-bh-3)}" class="t-xs t-mid">${hrs}</text>`});
    if(!k&&t>=liU(5,22.5)){const x=X(liU(5,22.5));s+=`<text x="${f1(x-6)}" y="${h0+6}" class="t-xs t-end" style="fill:var(--med)">alcohol</text><circle cx="${f1(x)}" cy="${h0+3}" r="4" style="fill:var(--med)"/>`}
    const walk=liU(6,10);if(t>=walk){const x=X(walk);s+=`<circle cx="${f1(x)}" cy="${h0+3}" r="4" style="fill:var(--good)"/><text x="${f1(x-7)}" y="${h0+6}" class="t-xs t-end" style="fill:var(--good)">walk</text>`}
    /* therapy lane */
    if(k){[[1,16,'therapy session'],[3,18,'skills group']].forEach(([d,h,l])=>{const u=liU(d,h);if(t<u)return;const x=X(u),bw=X(u+2.2/168)-x+(N?6:10);
      s+=`<rect x="${f1(x)}" y="${L.th-8}" width="${f1(bw)}" height="16" rx="5" style="fill:var(--rx);opacity:.85"/><text x="${f1(x+bw/2)}" y="${L.th-12}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">${N?(d===3?'group':'session'):l}</text>`})}
    else s+=`<text x="${f1(X(.5))}" y="${L.th+4}" class="t-xs t-mid">no regular therapy or group this week</text>`;
    /* now cursor */
    const xn=X(t);s+=`<line x1="${f1(xn)}" x2="${f1(xn)}" y1="${L.e0-4}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    const day=Math.min(6,Math.floor(t*7)),hr=Math.floor((t*7-day)*24);
    /* legend */
    if(!N)s+=`<text x="${L.x0}" y="${L.leg}" class="t-xs"><tspan style="fill:var(--storm)">● trigger</tspan>   <tspan style="fill:var(--accent)">◆ skill used</tspan>   <tspan style="fill:var(--good)">● good moment</tspan>   <tspan style="fill:var(--other)">▮ sleep (hours)</tspan>   <tspan style="fill:var(--rx)">▬ therapy</tspan></text>`;
    else s+=`<text x="${L.lab}" y="${L.leg}" class="t-xs"><tspan style="fill:var(--storm)">● trigger</tspan>  <tspan style="fill:var(--accent)">◆ skill</tspan>  <tspan style="fill:var(--good)">● good</tspan>  <tspan style="fill:var(--other)">▮ sleep</tspan>  <tspan style="fill:var(--rx)">▬ therapy</tspan></text>`;
    svg.innerHTML=s;
    const i=phaseOf(LI_STEPS,t);note.innerHTML=noteHTML(LI_STEPS[i]);setSt(i);
    read.innerHTML=`<span><b>${LI_D[day]} ${String(hr).padStart(2,'0')}:00</b></span><span>Intensity <b>${Math.round(clamp(fCur(t))*100)}</b>/100</span><span>Hours above the line this week: <b>${H[k]}</b> ${k?'with':'without'} supports vs <b>${H[1-k]}</b> ${k?'without':'with'}</span><span>(schematic)</span>`;
  }
  const stop=playWire(rg,$('#liPlay'),draw,18000,'%t:player.replay%','living');
  setSt=stepWire($('#liSteps'),LI_STEPS,rg,draw,stop);
  $$('[data-lis]').forEach(b=>{b.setAttribute('aria-pressed',+b.dataset.lis===sup);
    b.addEventListener('click',()=>{sup=+b.dataset.lis;store.set('li-sup',sup);$$('[data-lis]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)})});
  draw(+rg.value);

  /* ---- domain explorer ---- */
  const dsv=$('#liDomSvg');let dom='work';
  function drawDom(){
    const D=LI_DOM[dom],n=D.rows.length,N=vb(dsv,'520 '+(n*40+24),'400 '+(n*50+20));
    const L=N?{lx:4,bx:4,bw:300,top:8,row:50}:{lx:170,bx:180,bw:260,top:12,row:40};
    let s='';
    D.rows.forEach((r,i)=>{const y=L.top+i*L.row,by=N?y+16:y+4,sc=v=>L.bw*v/D.max;
      s+=`<text x="${L.lx}" y="${N?y+10:y+16}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink)">${r.l}</text>`;
      s+=`<rect x="${L.bx}" y="${by}" width="${L.bw}" height="16" rx="4" style="fill:var(--panel-2)"/>`;
      if(r.lo!=null){s+=`<rect x="${f1(L.bx+sc(r.lo))}" y="${by}" width="${f1(sc(r.hi-r.lo))}" height="16" rx="4" style="fill:${r.col}"/><rect x="${L.bx}" y="${by+6}" width="${f1(sc(r.lo))}" height="4" rx="2" style="fill:${r.col};opacity:.35"/>`;
        s+=`<text x="${f1(L.bx+sc(r.hi)+6)}" y="${by+12}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.lo}–${r.hi}${D.unit}</text>`}
      else{s+=`<rect x="${L.bx}" y="${by}" width="${f1(sc(r.v))}" height="16" rx="4" style="fill:${r.col}"/><text x="${f1(L.bx+sc(r.v)+6)}" y="${by+12}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.fmt||r.v+D.unit}</text>`}});
    dsv.innerHTML=s;
  }
  function pickDom(k){dom=k;const D=LI_DOM[k];
    $$('[data-lid]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lid===k));
    $('#liDomH').textContent=D.h;$('#liDomCap').innerHTML=D.cap;
    $('#liDomTxt').innerHTML=`<p class="kicker">What studies found</p><ul>${D.facts.map(f=>`<li>${f}</li>`).join('')}</ul><div class="do"><b>Practical points</b><ul>${D.dos.map(f=>`<li>${f}</li>`).join('')}</ul></div>`;
    drawDom()}
  $$('[data-lid]').forEach(b=>b.addEventListener('click',()=>pickDom(b.dataset.lid)));
  pickDom('work');
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawDom()};
};
