/* =============== 2.4 look-alikes & co-occurring conditions =============== */
/* a teaching decision path: each question routes to "consider X too" */
const DF_STEPS=[
 {from:0,at:.08,k:'Question 1',t:'Constant or episodic?',
  txt:'ADHD is a persistent, trait-like pattern from childhood. In bipolar disorder, increased activity comes in discrete episodes, tied to elevated mood and grandiosity. The female ADHD consensus advises asking whether problems are trait-like or episodic when weighing mood conditions. The two can co-occur: 7.95% of adults with ADHD also have bipolar disorder, and 17.11% of adults with bipolar disorder have ADHD. When both are present, a narrative review advises stabilising mood before starting ADHD medication. [[APA2022DSM,Young2020Females,Schiweck2021,MacDonald2023]]',
  pt:'ADHD is there most days, year after year. Mood conditions tend to come and go in episodes.',
  hook:'Bipolar disorder is <b>episodic</b>; ADHD is <b>persistent</b> from childhood. [[APA2022DSM]]'},
 {from:.16,at:.24,k:'Question 2',t:'Began before 12?',
  txt:'Criterion B asks for several symptoms before age 12. When problems seem to start later, other causes move up the list. In the MTA comparison group, about 95% of people who first screened positive for ADHD as adolescents or adults were excluded on full repeated assessment, most often because symptoms or impairment occurred only during heavy substance use. The AAP warns that cannabis use can mimic ADHD in adolescents. [[APA2022DSM,Sibley2018LateOnset,Wolraich2019]]',
  pt:'If the problems really began in the teenage years or later, the clinician looks hard for something else first, such as substance use.',
  hook:'Apparent late-onset ADHD: ~95% excluded on careful assessment. [[Sibley2018LateOnset]]'},
 {from:.32,at:.4,k:'Question 3',t:'Two or more settings?',
  txt:'Criterion C asks for several symptoms in two or more settings, and the AAP asks for reports from more than one major setting. Problems that appear only in class can point to a learning disorder: learning disability was reported in 46% of US children with ADHD against 5% without, so it is also the commonest companion of ADHD. The female ADHD consensus warns that girls may be labelled dyslexic when ADHD is the better explanation, and advises screening students with learning difficulties for ADHD. [[APA2022DSM,Wolraich2019,Larson2011,Young2020Females]]',
  pt:'If the problems only show up in one place, the clinician asks what is special about that place.',
  hook:'Learning disability: 46% of children with ADHD vs 5% without (parent report). [[Larson2011]]'},
 {from:.48,at:.56,k:'Question 4',t:'Sleep or breathing at night?',
  txt:'Children with ADHD had more bedtime resistance, night waking, daytime sleepiness and sleep-disordered breathing than controls, and a higher apnoea-hypopnoea index on sleep studies. A 2026 meta-analysis put obstructive sleep apnoea at 44% of children with ADHD, with very wide uncertainty. In the CHAT trial (464 children aged 5–9 with sleep apnoea), adenotonsillectomy improved behaviour, quality of life and sleep studies (normal in 79% vs 46%), but not the primary attention score at 7 months. [[Cortese2009Sleep,Leow2026,Marcus2013CHAT]]',
  pt:'Poor sleep can look like ADHD and can make ADHD worse. Questions about sleep and breathing at night belong in every assessment.',
  hook:'CHAT: surgery fixed the sleep study and behaviour, not the attention score. [[Marcus2013CHAT]]'},
 {from:.64,at:.72,k:'Question 5',t:'After a trauma?',
  txt:'The AAP lists trauma, posttraumatic stress disorder and toxic stress among the conditions and risk factors to consider. PTSD and ADHD are linked in both directions: the relative risk of PTSD in ADHD was 2.9 and of ADHD in PTSD 1.7. Against psychiatric controls the link was not significant, so both may share a wider pattern of psychiatric risk. [[Wolraich2019,Spencer2016PTSD]]',
  pt:'Stress and trauma can cause poor concentration and restlessness. They can also happen to someone who already has ADHD.',
  hook:'PTSD and ADHD: RR 2.9 one way, 1.7 the other. [[Spencer2016PTSD]]'},
 {from:.8,at:.9,k:'Question 6',t:'Staring, hearing, vision?',
  txt:'Staring spells can be absence seizures, ADHD or both: in a Minnesota cohort, ADHD was diagnosed in 41.5% of children with absence epilepsy vs 7.3% of matched controls, and no child had seizures worsen with ADHD treatment. A published case shows hearing loss, absence epilepsy and ADHD confusing each other in one child. Children with ADHD also had more amblyopia, astigmatism and heterotropia. In the end, co-occurrence is the rule: 77.9% of US children with current ADHD had at least one other condition, and having one does not rule ADHD out. [[Vanderwiel2024,LanceShapiro2013,Faraone2021,Danielson2024]]',
  pt:'A child who "doesn\'t listen" may not hear well, or may be having brief seizures. These are checked, and they can exist alongside ADHD.',
  hook:'Absence epilepsy: ADHD in 41.5% vs 7.3% of controls. [[Vanderwiel2024]]'}
];
const DF_Q=[
 {q:['Constant, or in','episodes?'],c:['episodes: think','bipolar, depression']},
 {q:['Several symptoms','before age 12?'],c:['no: think later','causes, substances']},
 {q:['Seen in two or','more settings?'],c:['one place only:','learning disorder?']},
 {q:['Disturbed sleep','or breathing?'],c:['think sleep-','disordered breathing']},
 {q:['Began after a','trauma?'],c:['think PTSD; it','can also co-occur']},
 {q:['Staring spells,','hearing, vision?'],c:['think absence','seizures, senses']}
];
/* the Venn: chips are short labels; every figure is cited in the note */
const DF_ADHD=['persistent, trait-like','symptoms before 12','in ≥2 settings'];
const DF_C=[
 {id:'anx',n:'Anxiety',sh:['looks like inattention','often co-occurs'],ad:[],ot:['Criterion E: explained?','in girls: may hide ADHD'],
  note:'Anxiety can look like ADHD, and the two often co-occur: parents reported anxiety in 18% of children with ADHD vs 2% without. Adults with ADHD score higher on anxiety measures (Hedges\' g 0.77), less so against clinical controls (0.437). In girls, self-reported anxiety best distinguished those with ADHD from control girls. ADHD is not diagnosed when symptoms are better explained by an anxiety disorder (Criterion E). [[Wolraich2019,Larson2011,Hoskins2026Anxiety,Skogli2013,APA2022DSM]]'},
 {id:'dep',n:'Depression',sh:['looks like inattention','often co-occurs'],ad:[],ot:['mood episodes','Criterion E: mood disorder'],
  note:'Depression was reported in 14% of children with ADHD vs 1% without, and pooled across 24 studies in 11.31%, more in girls. In adults the range was 8.6–55% vs 1.2–12.5%. Childhood ADHD is linked to later depression (OR 2.3). The question is whether problems are trait-like (ADHD) or episodic (mood). [[Larson2011,Wang2025Depression,Choi2022AdultComorbidity,Erskine2016,Young2020Females]]'},
 {id:'bip',n:'Bipolar disorder',sh:['increased activity','can co-occur'],ad:[],ot:['discrete episodes','elevated mood, grandiosity'],
  note:'In bipolar disorder, increased activity comes with elevated mood and grandiosity during discrete episodes; ADHD is persistent and trait-like from childhood. 7.95% of adults with ADHD have bipolar disorder and 17.11% of adults with bipolar disorder have ADHD, and bipolar disorder begins about 4 years earlier (3.96) when ADHD is also present. [[APA2022DSM,Schiweck2021]] <div class="hook"><b>Exam hook</b>Bipolar = episodic; ADHD = persistent. [[APA2022DSM]]</div>'},
 {id:'aut',n:'Autism',sh:['diagnosed together','shared genetics'],ad:['21% meet autism threshold'],ot:['28% have ADHD','motor problems: look'],
  note:'Since DSM-5, ADHD and autism can be diagnosed together; DSM-IV did not allow both. 28% of autistic people have ADHD, the commonest co-occurring diagnosis, and 21% of children with ADHD meet the threshold for autism. Twin studies show genetic correlations above 0.50. Children with ADHD and motor coordination problems are especially likely to be autistic, and children with both may respond less well to standard ADHD treatment. [[Epstein2013,Reiersen2008,Lai2019Autism,Hollingdale2020,Faraone2019]] <div class="hook"><b>Exam hook</b>ADHD + autism: allowed together since DSM-5. [[Epstein2013]]</div>'},
 {id:'ld',n:'Learning disorder',sh:['struggles at school','often co-occurs'],ad:[],ot:['one skill, e.g. reading','not only "fails to grasp"'],
  note:'Learning disability is the commonest co-occurring condition in children with ADHD (46% vs 5% without; 45.1% across 17 studies). Symptoms are not counted toward ADHD if they only reflect failure to understand tasks. Girls may be labelled dyslexic when ADHD is the better explanation. Neuropsychological testing does not improve ADHD diagnosis in most cases but can map learning strengths and weaknesses. [[Larson2011,DuPaul2013,APA2022DSM,Young2020Females,Wolraich2019]]'},
 {id:'slp',n:'Sleep disorders',sh:['daytime sleepiness','night waking'],ad:[],ot:['sleep-disordered breathing','higher apnoea index'],
  note:'Children with ADHD had more bedtime resistance, night waking, daytime sleepiness and sleep-disordered breathing, and a higher apnoea-hypopnoea index. Pooled obstructive sleep apnoea in children with ADHD: 44% (very uncertain). In adults with ADHD, self-reported sleep and actigraphy differed from controls but polysomnography did not. [[Cortese2009Sleep,Leow2026,DiazRoman2018]]'},
 {id:'ptsd',n:'Trauma & PTSD',sh:['linked both ways','can look like ADHD'],ad:[],ot:['follows trauma','toxic stress'],
  note:'The AAP lists trauma, PTSD and toxic stress as conditions and risk factors to consider. Relative risk of PTSD in ADHD 2.9; of ADHD in PTSD 1.7; not significant against psychiatric controls. Extreme early deprivation can also cause ADHD-like symptoms. [[Wolraich2019,Spencer2016PTSD,Faraone2021]]'},
 {id:'sen',n:'Hearing & vision',sh:['seems not to listen','misses details'],ad:[],ot:['hearing loss','amblyopia, squint'],
  note:'A child who seems not to listen may not hear well: a published case shows hearing loss, absence epilepsy and ADHD confounding each other. In Taiwanese national data, children with ADHD had almost 90% higher risk of amblyopia, over 80% higher of astigmatism and twice the risk of heterotropia (squint). [[LanceShapiro2013,Faraone2021]]'},
 {id:'thy',n:'Thyroid disease',sh:['ADHD-type symptoms'],ad:[],ot:['thyroid-hormone resistance','rare gene disorder'],
  note:'In families with generalised resistance to thyroid hormone, a rare thyroid-receptor-beta gene disorder, 70% of affected children vs 20% of unaffected relatives met ADHD criteria. [[Hauser1993]] It is rare, but it shows why a full medical, family and developmental history is part of the assessment. [[Posner2020]]'},
 {id:'abs',n:'Absence seizures',sh:['staring spells','seems not to listen'],ad:[],ot:['brief seizures','can be both'],
  note:'Staring spells can reflect absence seizures, ADHD or both. ADHD was diagnosed in 41.5% of children with absence epilepsy vs 7.3% of matched controls (5.7-fold), and no child had seizures worsen with ADHD treatment. [[LanceShapiro2013,Vanderwiel2024]]'},
 {id:'sub',n:'Substance use',sh:['can mimic ADHD','co-occurs often'],ad:['also when not using'],ot:['only during heavy use','intoxication, withdrawal'],
  note:'Cannabis can mimic ADHD in adolescents, and symptoms only during heavy use were the commonest reason to exclude apparent late-onset ADHD. ADHD is not diagnosed when symptoms are better explained by intoxication or withdrawal. In people treated for substance use disorders, 23.1% met ADHD criteria (21% in a 2023 meta-analysis); children with ADHD are more likely to develop substance use disorders. [[Wolraich2019,Sibley2018LateOnset,APA2022DSM,vanEmmerikvanOortmerssen2012,Rohner2023,Lee2011]]'}
];
/* co-occurrence: point values or [lo,hi] ranges; cmp = rate without ADHD */
const DF_BARS={
 kids:[
  {n:'Any co-occurring condition',v:77.9,c:'[[Danielson2024]]'},
  {n:'Learning disability',v:46,cmp:5,c:'[[Larson2011]]'},
  {n:'Obstructive sleep apnoea*',v:44,c:'[[Leow2026]]'},
  {n:'Conduct disorder',v:27,cmp:2,c:'[[Larson2011]]'},
  {n:'Autism (meets threshold)',v:21,c:'[[Hollingdale2020]]'},
  {n:'Anxiety',v:18,cmp:2,c:'[[Larson2011]]'},
  {n:'Depression',v:14,cmp:1,c:'[[Larson2011]]'},
  {n:'Speech problems',v:12,cmp:3,c:'[[Larson2011]]'}],
 adults:[
  {n:'Any personality disorder*',v:57,c:'[[Adamis2026]]'},
  {n:'Depressive disorder (range)',r:[8.6,55],cr:[1.2,12.5],c:'[[Choi2022AdultComorbidity]]'},
  {n:'Anxiety disorder (range)',r:[4.3,47.1],cr:[.5,9.5],c:'[[Choi2022AdultComorbidity]]'},
  {n:'Substance use disorder (range)',r:[2.3,41.2],cr:[0,16.6],c:'[[Choi2022AdultComorbidity]]'},
  {n:'Bipolar disorder',v:7.95,c:'[[Schiweck2021]]'}]
};
inits.differential=()=>{
  /* ---------------- the decision path ---------------- */
  const svg=$('#dfSvg'),rg=$('#dfT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(DF_STEPS,t);
    const Q=N?DF_Q.map((q,i)=>({x:72,y:44+i*80})):DF_Q.map((q,i)=>({x:66+i*117.6,y:70}));
    const C=N?DF_Q.map((q,i)=>({x:282,y:44+i*80})):DF_Q.map((q,i)=>({x:66+i*117.6,y:212}));
    const bw=N?124:108,bh=40,cw=N?196:108;
    let s=`<defs>${marker('dfArr','var(--muted)',6)}${marker('dfArrH','var(--dx)',6)}</defs>`;
    /* main spine */
    for(let i=0;i<5;i++){const a=Q[i],b=Q[i+1];s+=N?`<line x1="${a.x}" y1="${a.y+bh/2}" x2="${b.x}" y2="${b.y-bh/2}" class="arrow" marker-end="url(#dfArr)"/>`:`<line x1="${a.x+bw/2}" y1="${a.y}" x2="${b.x-bw/2-2}" y2="${b.y}" class="arrow" marker-end="url(#dfArr)"/>`}
    DF_Q.forEach((q,i)=>{const a=Q[i],c=C[i],on=i===p,past=i<p;
      /* the branch "yes/no -> consider" draws itself while its step is active */
      const g=on?ease(ramp(t,DF_STEPS[i].from,DF_STEPS[i].from+.05)):past?1:0;
      const x1=N?a.x+bw/2:a.x,y1=N?a.y:a.y+bh/2,x2=N?c.x-cw/2-2:c.x,y2=N?c.y:c.y-bh/2-2,len=Math.hypot(x2-x1,y2-y1);
      s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2.2:1.4};stroke-dasharray:${f1(len*g)} ${f1(len)}" ${g>.98?`marker-end="url(#${on?'dfArrH':'dfArr'})"`:''}/>`;
      s+=`<rect x="${f1(a.x-bw/2)}" y="${f1(a.y-bh/2)}" width="${bw}" height="${bh}" rx="10" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on||past?'var(--dx)':'var(--line)'};stroke-width:${on?2:1.2}"/>`;
      q.q.forEach((l,k)=>s+=`<text x="${f1(a.x)}" y="${f1(a.y-3+k*12)}" class="t-xs t-mid" style="fill:var(--ink);${on?'font-weight:700':''}">${l}</text>`);
      s+=`<text x="${f1(N?a.x-bw/2-4:a.x-bw/2)}" y="${f1(N?a.y+4:a.y-bh/2-6)}" class="t-xs ${N?'t-end':''}" style="fill:var(--dx)">${i+1}</text>`;
      const op=on?1:past?.75:.3;
      s+=`<g style="opacity:${f1(op*(.3+.7*g))}"><rect x="${f1(c.x-cw/2)}" y="${f1(c.y-bh/2)}" width="${cw}" height="${bh}" rx="10" style="fill:${on?'var(--warn-soft)':'var(--panel-2)'};stroke:${on?'var(--warn)':'var(--line)'};stroke-dasharray:4 3"/>`;
      q.c.forEach((l,k)=>s+=`<text x="${f1(c.x)}" y="${f1(c.y-3+k*12)}" class="t-xs t-mid" style="fill:var(--ink)">${l}</text>`);s+='</g>'});
    /* the token: a person moving down the spine */
    const sp=DF_STEPS.map(x=>x.at);let i0=0;for(let i=0;i<6;i++)if(t>=sp[i])i0=i;
    const u=t<sp[0]?0:i0<5?ease(clamp((t-sp[i0])/(sp[i0+1]-sp[i0]))):0,i1=Math.min(5,i0+1);
    const tx=lerp(Q[i0].x,Q[i1].x,u),ty=lerp(Q[i0].y,Q[i1].y,u);
    s+=N?person(tx-bw/2-34,ty-12,24,'var(--drug)'):person(tx,ty-56,22,'var(--drug)');
    /* destination */
    const D=N?{x:12,y:524,w:376,h:62}:{x:40,y:282,w:640,h:76},fin=ramp(t,.84,.95);
    s+=`<rect x="${D.x}" y="${D.y}" width="${D.w}" height="${D.h}" rx="12" style="fill:var(--field);stroke:${fin>.5?'var(--good)':'var(--line)'}"/>`;
    s+=`<text x="${f1(D.x+D.w/2)}" y="${D.y+24}" class="t-lbl t-mid">${N?'ADHD, something else, or both':'The answer can be ADHD, something else, or both'}</text>`;
    s+=`<text x="${f1(D.x+D.w/2)}" y="${D.y+42}" class="t-xs t-mid">${N?'most children with ADHD have another condition':'most children with ADHD have at least one other condition; it does not rule ADHD out'}</text>`;
    s+=`<text x="${f1(D.x+D.w/2)}" y="${D.y+(N?56:60)}" class="t-xs t-mid" style="fill:var(--good);opacity:${f1(fin)}">${Math.round(77.9*fin*10)/10}% of US children with current ADHD</text>`;
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',`Question ${p+1} of 6: ${DF_STEPS[p].t}`);
    $('#dfNote').innerHTML=noteHTML(DF_STEPS[p]);
  }
  const stop=playWire(rg,$('#dfPlay'),draw,22000,'Replay','differential');
  const setSt=stepWire($('#dfSteps'),DF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------------- the Venn ---------------- */
  const vs=$('#dfVenn'),cb=$('#dfConds');
  cb.innerHTML=DF_C.map((c,i)=>`<button class="btn" data-dfc="${c.id}" aria-pressed="${i?'false':'true'}">${c.n.replace('&','&amp;')}</button>`).join('');
  let cur=DF_C[0],vStop=null;
  const cw=l=>l.length*5.9+16;
  function chipsFor(c,N){
    /* returns [{text, region (0 ADHD, 1 shared, 2 other), x, y}] */
    const A=[...DF_ADHD,...c.ad],S=c.sh,O=c.ot,out=[];
    if(N){const cx=200;
      A.forEach((l,k)=>out.push({l,r:0,x:cx,y:72+k*26}));
      S.forEach((l,k)=>out.push({l,r:1,x:cx,y:228+k*26}));
      O.forEach((l,k)=>out.push({l,r:2,x:cx,y:322+k*26}))}
    else{
      A.forEach((l,k)=>out.push({l,r:0,x:198,y:150+k*30}));
      S.forEach((l,k)=>out.push({l,r:1,x:360,y:180+k*30}));
      O.forEach((l,k)=>out.push({l,r:2,x:522,y:165+k*30}))}
    return out}
  function drawV(k){const N=vb(vs,'720 360','400 515');
    const G=N?{a:[200,150],b:[200,330],r:140}:{a:[280,190],b:[440,190],r:160};
    let s=`<circle cx="${G.a[0]}" cy="${G.a[1]}" r="${G.r}" style="fill:var(--dx);opacity:.13;stroke:var(--dx);stroke-width:1.6"/>`;
    s+=`<circle cx="${G.b[0]}" cy="${G.b[1]}" r="${G.r}" style="fill:var(--warn);opacity:${f1(.04+.1*k)};stroke:var(--warn);stroke-width:1.6"/>`;
    s+=N?`<text x="200" y="42" class="t-big t-mid" style="fill:var(--dx)">ADHD</text><text x="200" y="505" class="t-big t-mid" style="fill:var(--warn)">${cur.n.replace('&','&amp;')}</text><text x="392" y="244" class="t-xs t-end">shared</text>`
        :`<text x="170" y="22" class="t-big t-mid" style="fill:var(--dx)">ADHD</text><text x="550" y="22" class="t-big t-mid" style="fill:var(--warn)">${cur.n.replace('&','&amp;')}</text><text x="360" y="22" class="t-xs t-mid">shared or overlapping</text>`;
    const ch=chipsFor(cur,N),src=N?[200,505]:[700,350];
    ch.forEach((c,i)=>{const d=clamp(k*1.6-i*.07),e=ease(d),x=lerp(src[0],c.x,e),y=lerp(src[1],c.y,e),w=cw(c.l);
      const col=c.r===0?'var(--dx)':c.r===1?'var(--ink)':'var(--warn)',bg=c.r===1?'var(--panel)':c.r===0?'var(--dx-soft)':'var(--warn-soft)';
      if(c.r===0&&k<1)return void(s+=`<g><rect x="${f1(c.x-w/2)}" y="${f1(c.y-10)}" width="${f1(w)}" height="20" rx="10" style="fill:${bg};stroke:${col}"/><text x="${f1(c.x)}" y="${f1(c.y+3.5)}" class="t-xs t-mid" style="fill:var(--ink)">${c.l}</text></g>`);
      s+=`<g style="opacity:${f1(.15+.85*e)}"><rect x="${f1(x-w/2)}" y="${f1(y-10)}" width="${f1(w)}" height="20" rx="10" style="fill:${bg};stroke:${col}"/><text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:var(--ink)">${c.l}</text></g>`});
    vs.innerHTML=s}
  function pick(c){cur=c;$$('[data-dfc]',cb).forEach(b=>b.setAttribute('aria-pressed',b.dataset.dfc===c.id?'true':'false'));
    $('#dfVNote').innerHTML=`<div class="kicker">ADHD and ${c.n.toLowerCase().replace('&','&amp;')}</div><h4>${c.n.replace('&','&amp;')}</h4><p>${c.note}</p>`;
    vStop&&vStop();vStop=animate(1100,q=>drawV(q),()=>drawV(1))}
  cb.addEventListener('click',e=>{const b=e.target.closest('[data-dfc]');if(!b)return;pick(DF_C.find(c=>c.id===b.dataset.dfc))});
  drawV(1);pick(cur);

  /* ---------------- co-occurrence bars ---------------- */
  const bs=$('#dfBars');let grp='kids',bStop=null;
  function drawB(k){const D=DF_BARS[grp],N=vb(bs,'720 '+(40+D.length*36),'400 '+(40+D.length*52));
    const x0=N?16:250,w=N?300:400,X=v=>x0+w*v/100;let s='';
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="16" y2="${f1(24+D.length*(N?52:36))}" class="grid"/><text x="${f1(X(v))}" y="12" class="t-xs t-mid">${v}%</text>`);
    D.forEach((d,i)=>{const y=N?(30+i*52):(26+i*36),by=N?y+16:y;const e=ease(clamp(k*1.4-i*.06));
      s+=`<text x="${N?x0:x0-10}" y="${N?y+8:by+13}" class="t-lbl ${N?'':'t-end'}" style="font-size:12.5px">${d.n}</text>`;
      if(d.r){const [lo,hi]=d.r;s+=`<rect x="${f1(X(lo))}" y="${by}" width="${f1((X(hi)-X(lo))*e)}" height="18" rx="4" style="fill:var(--dx);opacity:.75"/>`;
        s+=`<text x="${f1(X(lo)+(X(hi)-X(lo))*e+6)}" y="${by+13}" class="t-xs" style="fill:var(--ink)">${lo}–${hi}%</text>`;
        if(d.cr)s+=`<rect x="${f1(X(d.cr[0]))}" y="${by+20}" width="${f1(Math.max(2,(X(d.cr[1])-X(d.cr[0]))*e))}" height="5" rx="2" style="fill:var(--muted)"/>`}
      else{s+=`<rect x="${x0}" y="${by}" width="${f1((X(d.v)-x0)*e)}" height="18" rx="4" style="fill:${d.n.includes('*')?'var(--warn)':'var(--dx)'};opacity:.85"/><text x="${f1(X(d.v*e)+6)}" y="${by+13}" class="t-xs" style="fill:var(--ink);font-weight:700">${(d.v*e).toFixed(d.v%1?1:0)}%</text>`;
        if(d.cmp!=null)s+=`<rect x="${x0}" y="${by+20}" width="${f1(Math.max(2,(X(d.cmp)-x0)*e))}" height="5" rx="2" style="fill:var(--muted)"/><text x="${f1(X(d.cmp)+5)}" y="${by+26}" class="t-xs">${d.cmp}% without ADHD</text>`}});
    bs.innerHTML=s}
  function setG(g){grp=g;$$('[data-dfg]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.dfg===g?'true':'false'));
    $('#dfBarCap').innerHTML=g==='kids'?'Children with ADHD. Thin grey bars: children without ADHD (US parent report, 2007). *Sleep apnoea estimate has very wide uncertainty. No pooled figures for oppositional defiant disorder or tics were available in this guide\'s sources. [[Larson2011,Danielson2024,Hollingdale2020,Leow2026]]'
      :'Adults with ADHD. Ranges are across studies in general-population samples; thin grey bars: people without ADHD. *Personality-disorder estimate is driven by specialist clinics, with extreme heterogeneity. [[Choi2022AdultComorbidity,Adamis2026,Schiweck2021]]';
    bStop&&bStop();bStop=animate(900,q=>drawB(q),()=>drawB(1))}
  $$('[data-dfg]').forEach(b=>b.addEventListener('click',()=>setG(b.dataset.dfg)));
  drawB(1);setG('kids');
  const prevR=redraws.differential;redraws.differential=()=>{prevR&&prevR();drawV(1);drawB(1)};
};
