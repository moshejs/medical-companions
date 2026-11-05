/* =============== 2.3 rating scales & assessment =============== */
const SC_STEPS=[
 {from:0,at:.07,k:'Station 1',t:'Screen',
  txt:'A screener is a short questionnaire that flags who may need a full assessment. The WHO Adult ADHD Self-Report Scale (ASRS) screener has 6 questions picked from its 18 by stepwise regression; for children, the Vanderbilt parent and teacher scales and the SNAP-IV collect DSM-based symptom ratings. A positive screen is a reason for assessment, not a diagnosis. [[Kessler2005,Wolraich2003,Bussing2008,Ustun2017]]',
  pt:'A short questionnaire can say "worth a closer look". It cannot say "this is ADHD".',
  hook:'WFADHD consensus: ADHD cannot be diagnosed by rating scales alone. [[Faraone2021]]'},
 {from:.17,at:.24,k:'Station 2',t:'Clinical interview',
  txt:'The core of the assessment is a clinician going through each symptom, its frequency, its impact and its history. Semi-structured interviews help: DIVA 2.0 agreed 100% with CAADID diagnoses in 40 adult outpatients and is offered free online; the Korean DIVA-5 (DSM-5 version, 279 participants) had 91.3% sensitivity and 93.6% specificity against psychiatrist diagnosis. [[RamosQuiroga2019,Hong2020DIVA5]]',
  pt:'The main part of an assessment is a long conversation with a trained clinician.',
  hook:'DIVA = Diagnostic Interview for ADHD in adults; DIVA-5 follows DSM-5. [[Hong2020DIVA5]]'},
 {from:.33,at:.4,k:'Station 3',t:'Childhood history & collateral',
  txt:'Several symptoms must have been present before age 12, so the clinician needs the childhood story, ideally from more than one person. Who reports changes the answer: among hyperactive children followed to age 19–25, ADHD persisted in 5% by self-report but 46% by parent report. For adults, the female ADHD consensus advises collateral history from a parent or someone who has known the person well for 5 years or more, plus school or work reports. [[Barkley2002,Young2020Females]]',
  pt:'Old school reports and someone who knew you as a child help a lot, especially for adults.',
  hook:'Self-report under-counts: persistence 5% (self) vs 46% (parent) in one follow-up. [[Barkley2002]]'},
 {from:.5,at:.57,k:'Station 4',t:'School and other settings',
  txt:'Symptoms have to show in two or more settings. The AAP asks for reports from parents, teachers and other school staff, and for adolescents from at least 2 teachers or other adults, because teenagers tend to minimise their own symptoms. Parent and teacher ratings agree only weakly for inattention and moderately to strongly for hyperactivity-impulsivity, and each adds valid information. [[Wolraich2019,Narad2015]]',
  pt:'Teachers and parents often see different things. Both views count.',
  hook:'AAP: adolescents need reports from ≥2 teachers or other adults. [[Wolraich2019]]'},
 {from:.66,at:.73,k:'Station 5',t:'Rule-outs and co-occurring conditions',
  txt:'The AAP asks clinicians to rule out other causes and to screen for co-occurring conditions: anxiety, depression, oppositional and conduct problems, substance use, learning and language disorders, autism, tics and sleep apnoea. Medical look-alikes include sleep-disordered breathing, absence seizures, hearing loss, vision problems such as amblyopia, and rare thyroid-hormone disorders. In young people, cannabis use can mimic ADHD. [[Wolraich2019,Cortese2009Sleep,Vanderwiel2024,LanceShapiro2013,Faraone2021,Hauser1993]]',
  pt:'A good assessment checks sleep, hearing, eyesight, seizures, stress and other conditions before settling on ADHD.',
  hook:'AAP KAS 3: screen for anxiety, depression, ODD, conduct disorder, substance use, learning disorders, autism, tics and sleep apnoea. [[Wolraich2019]]'},
 {from:.82,at:.92,k:'Station 6',t:'The clinician decides',
  txt:'Only now does the clinician weigh everything against the criteria. Computer tests and brain measures can add information but cannot decide: continuous performance tests had pooled sensitivity 0.75 and specificity 0.71; QbTest 0.78 and 0.70, and its meta-analysis says not to use it alone; the EEG theta/beta ratio is not a reliable diagnostic measure. [[Arrondo2024,Bellato2024QbTest,Arns2013,Faraone2021]]',
  pt:'There is no blood test, scan or computer game that diagnoses ADHD. A trained clinician puts the whole picture together.',
  hook:'CPT, QbTest, EEG and imaging: adjuncts at most, never diagnostic alone. [[Faraone2021,Bellato2024QbTest]]'}
];
const SC_ST=[
 {n:'Screen',ic:'clip',lab:['questionnaire']},
 {n:'Interview',ic:'talk',lab:['DIVA-5 style','interview']},
 {n:'Childhood',ic:'album',lab:['before 12?','who remembers?']},
 {n:'Settings',ic:'school',lab:['home · school','work']},
 {n:'Rule-outs',ic:'lens',lab:['sleep · hearing','vision · seizures']},
 {n:'Decision',ic:'check',lab:['criteria','weighed']}
];
/* the predictive-value calculator: published accuracy; PPV and NPV are calculated here */
const SC_TESTS=[
 {id:'asrs',n:'ASRS v1.1 screener (6 items)',se:.687,sp:.995,c:'[[Kessler2005]]',who:'adults'},
 {id:'asrs5',n:'ASRS-5 (6 items)',se:.914,sp:.96,c:'[[Ustun2017]]',who:'adults'},
 {id:'vp',n:'Vanderbilt parent scale (community)',se:.80,sp:.75,c:'[[Bard2013Parent]]',who:'children'},
 {id:'vt',n:'Vanderbilt teacher scale (community)',se:.69,sp:.84,c:'[[Wolraich2013Teacher]]',who:'children'},
 {id:'cpt',n:'Continuous performance test (total score)',se:.75,sp:.71,c:'[[Arrondo2024]]',who:'any'},
 {id:'qb',n:'QbTest (total score)',se:.78,sp:.70,c:'[[Bellato2024QbTest]]',who:'children'}
];
const SC_SET=[
 {id:'ad',n:'Adults in the general population',p:2.5,c:'[[Simon2009]]'},
 {id:'us',n:'US adults aged 18–44 (NCS-R)',p:4.4,c:'[[Kessler2006]]'},
 {id:'ch',n:'Children aged 3–12 (pooled studies)',p:7.6,c:'[[Salari2023]]'},
 {id:'sud',n:'Adults in substance-use treatment',p:23.1,c:'[[vanEmmerikvanOortmerssen2012]]'},
 {id:'cl',n:'Adults referred to a psychiatry clinic (NYU sample)',p:57.7,c:'[[Ustun2017]]'}
];
/* illustrative screening questions, written for this guide (NOT the ASRS wording), each tied to a DSM-5-TR item [[APA2022DSM]] */
const SC_Q=[
 {q:'How often do you have trouble finishing the last details of a task once the hard part is done?',d:'A1(d) does not follow through'},
 {q:'How often is it hard to get things in order when a task needs organising?',d:'A1(e) organising'},
 {q:'How often do you forget appointments or things you meant to do?',d:'A1(i) forgetful'},
 {q:'How often do you put off starting a task that needs a lot of thought?',d:'A1(f) avoids sustained effort'},
 {q:'How often do you fidget or squirm when you have to sit for a long time?',d:'A2(a) fidgets'},
 {q:'How often do you feel driven, as if you have to keep moving?',d:'A2(e) “driven by a motor”'}
];
const SC_FREQ=['Never','Rarely','Sometimes','Often','Very often'];
inits.scales=()=>{
  /* ---------------- the assessment pathway ---------------- */
  const svg=$('#scSvg'),rg=$('#scT');
  function icon(k,x,y,on){const c=on?'var(--dx)':'var(--muted)',st=`style="fill:none;stroke:${c};stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"`;
    if(k==='clip')return `<rect x="${x-9}" y="${y-11}" width="18" height="22" rx="2" ${st}/><path d="M${x-5} ${y-4}H${x+5}M${x-5} ${y+1}H${x+5}M${x-5} ${y+6}H${x+2}" ${st}/>`;
    if(k==='talk')return `<rect x="${x-12}" y="${y-11}" width="15" height="11" rx="4" ${st}/><rect x="${x-2}" y="${y-2}" width="15" height="11" rx="4" ${st}/>`;
    if(k==='album')return `<rect x="${x-11}" y="${y-9}" width="22" height="17" rx="2" ${st}/><circle cx="${x-4}" cy="${y-3}" r="2.5" ${st}/><path d="M${x-9} ${y+6}L${x-2} ${y}L${x+3} ${y+4}L${x+9} ${y-2}" ${st}/>`;
    if(k==='school')return `<path d="M${x-12} ${y+10}V${y-2}L${x} ${y-11}L${x+12} ${y-2}V${y+10}ZM${x-3} ${y+10}V${y+3}H${x+3}V${y+10}" ${st}/>`;
    if(k==='lens')return `<circle cx="${x-3}" cy="${y-3}" r="7.5" ${st}/><path d="M${x+3} ${y+3}L${x+10} ${y+10}" ${st}/>`;
    return `<circle cx="${x}" cy="${y}" r="11" ${st}/><path d="M${x-5} ${y}L${x-1} ${y+4}L${x+6} ${y-4}" ${st}/>`}
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(SC_STEPS,t);
    /* station positions: one row on desktop, a zig-zag of two columns on a phone */
    const P=N?SC_ST.map((s,i)=>[i%2?290:110,70+i*68]):SC_ST.map((s,i)=>[70+i*116,96]);
    const sp=SC_STEPS.map(s=>s.at),idx=t<=sp[0]?0:t>=sp[5]?5:(()=>{let k=0;for(let i=0;i<5;i++)if(t>=sp[i])k=i;return k})();
    const u=t<=sp[0]?0:t>=sp[5]?0:ease(clamp((t-sp[idx])/(sp[idx+1]-sp[idx])));
    const nx=idx<5?idx+1:5,px=lerp(P[idx][0],P[nx][0],u),py=lerp(P[idx][1],P[nx][1],u);
    let s=`<defs>${marker('scArr','var(--muted)',5)}</defs>`;
    for(let i=0;i<5;i++){const [x1,y1]=P[i],[x2,y2]=P[i+1],done=i<idx||(i===idx&&u>0);
      s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${done?'var(--dx)':'var(--line)'};stroke-width:3;stroke-dasharray:${done?'0':'5 5'}"/>`}
    SC_ST.forEach((st,i)=>{const [x,y]=P[i],on=i<=p,cur=i===p;
      s+=`<circle cx="${x}" cy="${y}" r="${cur?27:23}" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${cur?2.4:1.4}"/>`+icon(st.ic,x,y,on);
      const ly=N?y+4:y+46,lx=N?(i%2?x-38:x+38):x,an=N?(i%2?'t-end':''):'t-mid';
      s+=`<text x="${lx}" y="${ly}" class="t-lbl ${an}" style="${on?'':'fill:var(--muted)'}">${i+1} ${st.n}</text>`;
      st.lab.forEach((l,k)=>s+=`<text x="${lx}" y="${ly+14+k*12}" class="t-xs ${an}">${l}</text>`)});
    /* the traveller */
    s+=person(px-(N?0:0),py-62*(N?0:1)+(N?-46:0),N?18:22,'var(--drug)');
    /* the folder of evidence fills with one sheet per station */
    const F=N?{x:12,y:470,w:376,h:118}:{x:40,y:236,w:640,h:120};
    s+=`<rect x="${F.x}" y="${F.y}" width="${F.w}" height="${F.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${F.x+14}" y="${F.y+20}" class="t-sm" style="font-weight:600">ASSESSMENT FILE · ${p+1} of 6 sources</text>`;
    const sheets=['screen scores','interview notes','childhood history','other settings','rule-out checks','formulation'];
    sheets.forEach((n,i)=>{const cols=N?2:6,cw=N?(F.w-28)/2:(F.w-28)/6,x=F.x+14+(i%cols)*cw,y=F.y+30+Math.floor(i/cols)*(N?21:0),a=i<p?1:i===p?ramp(t,SC_STEPS[p].from,SC_STEPS[p].at):0;
      const h=N?17:62;
      s+=`<rect x="${f1(x)}" y="${f1(y+(1-a)*8)}" width="${f1(cw-8)}" height="${h}" rx="5" style="fill:var(--panel);stroke:var(--dx);opacity:${f1(.1+.9*a)}"/>`;
      if(!N)for(let k=0;k<3;k++)s+=`<line x1="${f1(x+8)}" x2="${f1(x+cw-18-k*10)}" y1="${f1(y+(1-a)*8+30+k*9)}" y2="${f1(y+(1-a)*8+30+k*9)}" style="stroke:var(--line);stroke-width:2;opacity:${f1(a)}"/>`;
      s+=`<text x="${f1(x+6)}" y="${f1(y+(1-a)*8+(N?12:16))}" class="t-xs" style="fill:var(--ink);opacity:${f1(.25+.75*a)}">${n}</text>`});
    const fy=N?F.y+F.h-9:F.y+20,fx=N?F.x+14:F.x+F.w-14,fa=N?'':'t-end';
    if(p===5)s+=`<text x="${fx}" y="${fy}" class="t-xs ${fa}" style="fill:var(--good);font-weight:700">only the clinician concludes</text>`;
    else s+=`<text x="${fx}" y="${fy}" class="t-xs ${fa}">no single sheet decides</text>`;
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',`Station ${p+1} of 6: ${SC_STEPS[p].t}`);
    $('#scNote').innerHTML=noteHTML(SC_STEPS[p]);
  }
  const stop=playWire(rg,$('#scPlay'),draw,20000,'Replay','scales');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------------- the screener walkthrough ---------------- */
  const ans=new Array(6).fill(-1);
  const wq=$('#scWalk');
  wq.innerHTML=SC_Q.map((q,i)=>`<div class="scq"><p><b>${i+1}.</b> ${q.q} <span class="scd">${q.d}</span></p><div class="scf" role="group" aria-label="Question ${i+1}">${SC_FREQ.map((f,k)=>`<button class="btn" data-q="${i}" data-f="${k}" aria-pressed="false">${f}</button>`).join('')}</div></div>`).join('');
  function walk(){const n=ans.filter(a=>a>=0).length,hi=ans.filter(a=>a>=3).length;
    let h=`<div class="kicker">${n} of 6 answered</div>`;
    if(n<6)h+=`<h4>Keep going</h4><p>So far ${hi} answer${hi===1?'':'s'} at "often" or "very often". A screener only makes sense once every question is answered.</p>`;
    else h+=`<h4>${hi} of 6 at "often" or more</h4><p>On a real screener a published scoring rule turns answers like these into "screen positive" or "screen negative". This illustrative set has no validated rule, so it gives no result, on purpose.</p>`;
    h+=`<div class="pt"><b>What a positive screen means</b>Only that a full assessment may be worth having. The ASRS was built for case-finding in surveys and outreach. [[Kessler2005,Ustun2017]] In the validation sample the 6-question screener caught 68.7% of people with ADHD (sensitivity) and correctly cleared 99.5% without it (specificity). [[Kessler2005]]</div>`;
    h+=`<div class="hook"><b>What a full assessment adds</b>A clinical interview, childhood history, reports from people in other settings, checks for look-alikes and co-occurring conditions, and the impact on daily life. Single ASRS items agreed with clinicians only modestly (kappa 0.16–0.81), so no one answer carries much weight. [[Kessler2005,Faraone2021]]</div>`;
    $('#scWalkOut').innerHTML=h}
  wq.addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b)return;const q=+b.dataset.q,f=+b.dataset.f;ans[q]=f;
    $$(`[data-q="${q}"]`,wq).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.f===f?'true':'false'));walk()});
  walk();

  /* ---------------- predictive value: 1,000 people ---------------- */
  const ps=$('#scPv'),prg=$('#scPrev'),srg=$('#scSort'),tsel=$('#scTest'),ssel=$('#scSet');
  tsel.innerHTML=SC_TESTS.map(x=>`<option value="${x.id}">${x.n}</option>`).join('');
  ssel.innerHTML=SC_SET.map(x=>`<option value="${x.id}">${x.n} (${x.p}%)</option>`).join('')+'<option value="own">Set my own prevalence with the slider</option>';
  const PMIN=1,PMAX=60,toPrev=v=>Math.round(PMIN*Math.pow(PMAX/PMIN,+v)*10)/10,fromPrev=p=>Math.log(p/PMIN)/Math.log(PMAX/PMIN);
  const R=rng(41),order=[...Array(1000).keys()].map(i=>[i,R()]).sort((a,b)=>a[1]-b[1]).map(a=>a[0]);
  function pv(){const T=SC_TESTS.find(x=>x.id===tsel.value),prev=toPrev(prg.value)/100;
    const pos=Math.round(prev*1000),tp=Math.round(pos*T.se),fn=pos-tp,neg=1000-pos,tn=Math.round(neg*T.sp),fp=neg-tn;
    return {T,prev,tp,fn,fp,tn,ppv:tp+fp?tp/(tp+fp):0,npv:tn+fn?tn/(tn+fn):0}}
  function drawPv(){const N=vb(ps,'720 360','400 690'),S=pv(),k=ease(+srg.value);
    const {tp,fn,fp,tn}=S,cat=[];/* category of each person by rank */
    for(let i=0;i<1000;i++)cat.push(i<tp?0:i<tp+fn?1:i<tp+fn+fp?2:3);
    const COL=['var(--good)','var(--warn)','var(--bad)','var(--muted)'],NAME=['true positive','false negative','false positive','true negative'];
    const g=N?{x:18,y:12,cols:25,cw:14.6,rh:13,s:10.5}:{x:16,y:12,cols:40,cw:10.6,rh:11.8,s:9.4};
    /* sorted: the same grid, filled group by group, each group starting on a new row */
    const start=[0,0,0,0];let row=0;[tp,fn,fp,tn].forEach((n,c)=>{start[c]=row;row+=Math.ceil(n/g.cols)});
    let s=`<defs><g id="scPer">${person(0,0,g.s,'inherit')}</g></defs>`;
    const base=[0,tp,tp+fn,tp+fn+fp];
    for(let r=0;r<1000;r++){const id=order[r],c=cat[r],j=r-base[c];
      const gx=g.x+(id%g.cols)*g.cw,gy=g.y+Math.floor(id/g.cols)*g.rh;
      const sx=g.x+(j%g.cols)*g.cw,sy=g.y+(start[c]+Math.floor(j/g.cols)+c*.35)*g.rh;
      const x=lerp(gx,sx,k),y=lerp(gy,sy,k),op=c===3?lerp(1,.4,k):1;
      s+=`<use href="#scPer" x="${f1(x)}" y="${f1(y)}" style="fill:${COL[c]};opacity:${op}"/>`}
    const Lg=N?[[18,598],[206,598],[18,616],[206,616]]:[[452,40],[452,62],[452,84],[452,106]];
    [tp,fn,fp,tn].forEach((n,c)=>{const [lx,ly]=Lg[c];s+=`<rect x="${lx}" y="${ly-9}" width="10" height="10" rx="2" style="fill:${COL[c]}"/><text x="${lx+16}" y="${ly}" class="t-xs" style="fill:var(--ink)">${NAME[c]}: <tspan style="font-weight:700">${n}</tspan></text>`});
    if(!N)s+=`<text x="452" y="20" class="t-sm" style="font-weight:600">1,000 PEOPLE · ${Math.round(S.prev*1000)} WITH ADHD</text>`;
    /* the PPV bar */
    const B=N?{x:18,y:648,w:364}:{x:452,y:290,w:252};
    s+=`<text x="${B.x}" y="${B.y-8}" class="t-sm">Of ${tp+fp} positive results, ${tp} have ADHD</text>`;
    s+=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="16" rx="4" style="fill:var(--bad);opacity:.75"/><rect x="${B.x}" y="${B.y}" width="${f1(B.w*S.ppv)}" height="16" rx="4" style="fill:var(--good)"/>`;
    s+=`<text x="${B.x}" y="${B.y+32}" class="t-lbl">PPV ${Math.round(S.ppv*100)}%</text><text x="${B.x+B.w}" y="${B.y+32}" class="t-lbl t-end">NPV ${(S.npv*100).toFixed(1)}%</text>`;
    ps.innerHTML=s;
    const pr=toPrev(prg.value);
    prg.setAttribute('aria-valuetext',`prevalence ${pr}%`);
    $('#scPvRead').innerHTML=`<span>prevalence <b>${pr}%</b></span><span>sensitivity <b>${(S.T.se*100).toFixed(1)}%</b></span><span>specificity <b>${(S.T.sp*100).toFixed(1)}%</b></span><span>PPV <b>${Math.round(S.ppv*100)}%</b></span>`;
    const setO=SC_SET.find(x=>x.id===ssel.value);
    $('#scPvNote').innerHTML=`<div class="kicker">${S.T.n}</div><h4>${Math.round(S.ppv*100)} in 100 positive results are true</h4>
      <p>In ${setO?setO.n.toLowerCase()+' '+setO.c:'a group'} at ${pr}% prevalence, ${tp+fp} of 1,000 people would screen positive: ${tp} with ADHD and ${fp} without it. ${fn} people with ADHD would be missed. The accuracy figures come from the published study ${S.T.c}. The PPV and NPV shown are calculated here from those figures, not published results.</p>
      <div class="pt"><b>In plain words</b>The rarer a condition is in the group being tested, the more of the positive results are false alarms, even with a good test.</div>
      <div class="hook"><b>Exam hook</b>Same test, different PPV: ASRS-5 gave a published PPV of 67.3% at 8.2% prevalence and 82.8% in a clinic where 57.7% had ADHD. In a community sample the Vanderbilt parent scale's PPV was 0.19, with NPV 0.98. [[Ustun2017,Bard2013Parent]]</div>
      ${S.T.who==='adults'&&setO&&setO.id==='ch'?'<p><b>Note:</b> this scale was validated in adults; applying it to children is only an arithmetic exercise.</p>':''}${S.T.who==='children'&&setO&&setO.id!=='ch'?'<p><b>Note:</b> this test was studied in children; applying it to adults is only an arithmetic exercise.</p>':''}`;
  }
  ssel.addEventListener('change',()=>{const o=SC_SET.find(x=>x.id===ssel.value);if(o){prg.value=fromPrev(o.p);}drawPv()});
  tsel.addEventListener('change',drawPv);
  prg.addEventListener('input',()=>{ssel.value='own';drawPv()});
  srg.addEventListener('input',drawPv);
  const sb=$('#scSortBtn');let sStop=null;
  sb.addEventListener('click',()=>{sStop&&sStop();const to=+srg.value>.5?0:1,fr=+srg.value;sb.setAttribute('aria-pressed',to?'true':'false');sb.textContent=to?'Mix them back':'Sort into groups';
    sStop=animate(1400,q=>{srg.value=lerp(fr,to,q);drawPv()})});
  ssel.value='ad';prg.value=fromPrev(2.5);tsel.value='asrs5';
  drawPv();
  const prevR=redraws.scales;redraws.scales=()=>{prevR&&prevR();drawPv()};

  /* ---------------- who reports: Barkley 2002 ---------------- */
  const bs=$('#scInf');let rule='count';
  function drawInf(){const N=vb(bs,'720 200','400 260'),D=rule==='count'?[5,46]:[12,66];
    let s='';const x0=N?120:200,w=N?250:460,lab=['Self-report','Parent report'];
    D.forEach((v,i)=>{const y=(N?40:40)+i*(N?70:60);
      s+=`<text x="${x0-10}" y="${y+16}" class="t-lbl t-end">${lab[i]}</text><rect x="${x0}" y="${y}" width="${w}" height="24" rx="5" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${x0}" y="${y}" width="${f1(w*v/100)}" height="24" rx="5" style="fill:${i?'var(--dx)':'var(--drug)'}"/><text x="${f1(x0+w*v/100+8)}" y="${y+17}" class="t-lbl">${v}%</text>`});
    s+=`<text x="${x0}" y="${N?200:170}" class="t-xs">ADHD still present at age 19–25 in the same hyperactive children</text>`;
    s+=`<text x="${x0}" y="${N?214:184}" class="t-xs">${rule==='count'?'rule: DSM symptom criteria':'rule: developmentally referenced cut-off (+2 SD)'}</text>`;
    bs.innerHTML=s}
  $$('[data-scr]').forEach(b=>b.addEventListener('click',()=>{rule=b.dataset.scr;$$('[data-scr]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));drawInf()}));
  drawInf();
  const prevR2=redraws.scales;redraws.scales=()=>{prevR2&&prevR2();drawInf()};
};
