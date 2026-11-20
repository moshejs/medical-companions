/* =============== 4.1 Psychoeducation & talking therapies =============== */
/* main timeline: t 0..1 is split into the Barcelona years (0-5) and the STEP-BD months (0-12) */
const TH_C0=.14,TH_C2=.38,TH_C5=.62,TH_S0=.62,TH_S12=.9;
const TH_STEPS=[
 {from:0,at:.07,k:'Before follow-up',t:'Why add a talking therapy?',
  txt:`Medicines are the base of treatment. NICE says relapse-prevention programmes should give information about bipolar disorder, include self-monitoring of mood, thoughts and behaviour, address relapse risk and functioning, and "develop plans for relapse management and staying well". [[NICE2014CG185]] In the Barcelona trial, 120 outpatients in remission for at least 6 months, all on standard medication, were randomised to 21 sessions of group psychoeducation or 21 non-structured group meetings. [[Colom2003]]`,
  pt:`Therapy is added to medicine, not a replacement for it. The dots are the 120 people being split into two groups by chance.`,
  hook:`NICE CG185: a structured psychological intervention designed for bipolar disorder, with a published manual, in addition to medicines. [[NICE2014CG185]]`},
 {from:TH_C0,at:.3,k:'Barcelona · years 0–2',t:'Group psychoeducation: the first two years',
  txt:`At 2 years, psychoeducation reduced the number of people who relapsed and the number of recurrences per person. It lengthened the time to depressive, manic, hypomanic and mixed recurrences, and reduced the number and length of hospital stays. [[Colom2003]] The control group met just as often, so the benefit is not simply from attention or company.`,
  pt:`Both groups met 21 times. Only one group learned a structured course about the illness, and that group had fewer relapses.`,
  hook:`Colom 2003: 21 sessions of group psychoeducation vs 21 non-structured meetings, in people already in remission.`},
 {from:TH_C2,at:.56,k:'Barcelona · years 2–5',t:'Five years on: fewer recurrences, fewer days ill',
  txt:`Of the 120 people, 99 completed 5-year follow-up. Mean recurrences were 3.86 with psychoeducation vs 8.37 in the control group (P<0.0001). Total time acutely ill was 154 vs 586 days (P=0.0001), and time to any recurrence was longer (log rank 9.953, P<0.002). The authors call it "the first psychological intervention showing such a long-term maintained efficacy" <span class="ev early">Early evidence: one centre</span>. [[Colom2009]] Inpatient care made up about 15% of estimated cost with psychoeducation vs 40% in the control group: "less costly and more effective". [[Scott2009Cost]]`,
  pt:`Over 5 years, people in the class spent about 154 days unwell compared with about 586 days in the other group.`,
  hook:`Colom 2009 at 5 years: recurrences 3.86 vs 8.37; days acutely ill 154 vs 586.`},
 {from:TH_S0,at:.86,k:'STEP-BD · months 0–12',t:'Intensive therapy for bipolar depression',
  txt:`STEP-BD randomised 293 outpatients with bipolar I or II depression, all on protocol medication, to intensive psychotherapy (up to 30 sessions over 9 months of family-focused therapy, IPSRT or CBT; n=163) or collaborative care (3 sessions over 6 weeks; n=130). Year-end recovery was 64.4% vs 51.5%. Intensive therapy shortened time to recovery (HR 1.47, 95% CI 1.08–2.00), and people were 1.58 times more likely to be "clinically well" in any study month. The three therapies did not differ from one another, and drop-out was similar (35.6% vs 30.8%). [[Miklowitz2007]]`,
  pt:`More therapy sessions helped more people recover from depression within a year: about 64 in 100 compared with about 52 in 100.`,
  hook:`STEP-BD: intensive psychotherapy (FFT, IPSRT or CBT) 64.4% year-end recovery vs 51.5% with 3-session collaborative care; HR 1.47.`},
 {from:TH_S12,at:1,k:'Pooled evidence',t:'What 39 trials say together',
  txt:`<span class="ev est">Established</span> In a network meta-analysis of 39 RCTs (3863 participants), manualised psychotherapy plus medication had lower recurrence than control treatments (OR 0.56, 95% CI 0.43–0.74). Psychoeducation with guided practice of illness-management skills worked better in a family or group format than individually (OR 0.12). [[Miklowitz2021NMA]] In a subsample of STEP-BD, intensive therapy also improved relationships and life satisfaction, though not work functioning. [[Miklowitz2007AJP]]`,
  pt:`Talking therapies work best alongside medicine. Learning in a group or with family seems to help most.`,
  hook:`Miklowitz 2021 NMA: therapy + medication vs control, recurrence OR 0.56; family/group skills practice OR 0.12 vs individual.`}
];
const TH_TX=[
 {id:'psy',n:'Group psychoeducation',ev:'est',evl:'Established',
  what:'Information about bipolar disorder, self-monitoring of mood, thoughts and behaviour, early warning signs, and a plan for relapse and staying well, learned with others who have the condition. [[NICE2014CG185]]',
  len:'21 sessions in the Barcelona trial; 21 weekly 2-hour sessions in PARADES. [[Colom2003,Morriss2016PARADES]]',
  trial:'Barcelona: 5-year mean recurrences 3.86 vs 8.37 and 154 vs 586 days acutely ill. [[Colom2009]] PARADES (n=304): no overall difference from optimised peer support, but a benefit in people with 1–7 previous episodes (HR 0.28). [[Morriss2016PARADES]]',
  nma:'Family or group skills practice beat the same strategies delivered individually (OR 0.12). Brief psychoeducation kept more people in treatment than standard psychoeducation (OR 0.44). [[Miklowitz2021NMA]]',
  bars:{u:'mean recurrences per person, 5 years',mx:9,a:['Psychoeducation',3.86],b:['Control group',8.37],f:v=>v.toFixed(2),cap:'Barcelona trial, 5-year follow-up. [[Colom2009]]'}},
 {id:'fft',n:'Family-focused therapy (FFT)',ev:'est',evl:'Established',
  what:'The person and their family learn about the illness together, then practise communication skills and problem-solving. [[Miklowitz2003FFT]]',
  len:'21 sessions over 9 months in the adult trial; 12 sessions in the high-risk youth trial. [[Miklowitz2003FFT,Miklowitz2020FFT]]',
  trial:'Adults recovering from an episode, all on medication: 35% relapsed over 2 years with FFT vs 54% with crisis management; mean time without relapse 73.5 vs 53.2 weeks (HR 0.38). FFT also improved medication adherence. [[Miklowitz2003FFT]]',
  nma:'People were more likely to stay in treatment with family or conjoint therapy than with standard psychoeducation (OR 0.46). Its effect on depressive symptoms pointed the right way (SMD −0.46) but the interval crossed zero. [[Miklowitz2021NMA]]',
  bars:{u:'% relapsed over 2 years',mx:100,a:['FFT',35],b:['Crisis management',54],f:v=>Math.round(v)+'%',cap:'Miklowitz 2003, adults with bipolar disorder, intention to treat. [[Miklowitz2003FFT]]'}},
 {id:'ipsrt',n:'Interpersonal & social rhythm therapy (IPSRT)',ev:'early',evl:'Early evidence',
  what:'Interpersonal psychotherapy (relationships, roles, grief and conflict) plus a social-rhythm part: keeping daily routines such as waking, meals and activity regular. [[Frank2005IPSRT]] Try the rhythm grid below.',
  len:'Weekly acute treatment, then a 2-year maintenance phase in the original trial; one of the three options in STEP-BD (up to 30 sessions). [[Frank2005IPSRT,Miklowitz2007]]',
  trial:'175 acutely ill people with bipolar I: IPSRT did not speed stabilisation, but people given IPSRT in the acute phase went longer without a new episode (P=.01). More regular routines went with fewer recurrences (P=.05). [[Frank2005IPSRT]]',
  nma:'Interpersonal therapy pointed towards steadier depressive symptoms (SMD −0.46), but the interval crossed zero. [[Miklowitz2021NMA]]',
  bars:{u:'% recovered at year end, STEP-BD',mx:100,a:['Intensive therapy',64.4],b:['Collaborative care',51.5],f:v=>v.toFixed(1)+'%',cap:'STEP-BD intensive arm pooled FFT, IPSRT and CBT, which did not differ. [[Miklowitz2007]]'}},
 {id:'cbt',n:'Cognitive behavioural therapy (CBT)',ev:'early',evl:'Mixed results',
  what:'Working on thoughts and behaviours linked to mood: spotting early signs, coping strategies and routines. A version focused on insomnia (CBTI-BP) targets sleep. [[Lam2003CT,Harvey2015CBTI]]',
  len:'About 14 sessions plus 2 booster sessions in Lam 2003. [[Lam2003CT]]',
  trial:'Lam 2003 (n=103): fewer episodes, days in episode and admissions over 12 months. Scott 2006 (n=253): no overall difference in recurrence (HR 1.05), with benefit only in people with fewer than 12 previous episodes. [[Lam2003CT,Scott2006CBT]] Insomnia-focused CBT pilot (n=58): 3.3 vs 25.5 days in a mood episode over 6 months <span class="ev early">Early evidence</span>. [[Harvey2015CBTI]]',
  nma:'CBT stabilised depressive symptoms compared with treatment as usual (SMD −0.32, 95% CI −0.64 to −0.01). Its clearest support is for depressive symptoms, not for preventing recurrence. [[Miklowitz2021NMA]]',
  bars:{u:'days in a mood episode over 6 months (pilot)',mx:30,a:['CBTI-BP',3.3],b:['Psychoeducation',25.5],f:v=>v.toFixed(1),cap:'Pilot RCT of insomnia-focused CBT in bipolar I, between episodes. Early evidence. [[Harvey2015CBTI]]'}},
 {id:'peer',n:'Peer support',ev:'early',evl:'Early evidence',
  what:'Meeting and learning from people with lived experience of the condition, in person or online, usually without a structured course. [[Morriss2016PARADES,LloydEvans2014]]',
  len:'21 weekly 2-hour meetings as the PARADES comparison arm; online forums in MoodSwings 2.0. [[Morriss2016PARADES,Gliddon2019]]',
  trial:'PARADES: 65% had a new episode by 96 weeks with optimised peer support vs 58% with psychoeducation (time to episode HR 0.83, not significant). Median attendance was 9 vs 14 sessions. [[Morriss2016PARADES]] Across severe mental illness, peer support showed little effect on admissions or symptoms but some benefit for hope, recovery and empowerment. [[LloydEvans2014]]',
  nma:'Not separately ranked for recurrence in the network meta-analysis. Adding online peer support raised adherence to an online course. [[Miklowitz2021NMA,Proudfoot2012]]',
  bars:{u:'% with a new episode by 96 weeks',mx:100,a:['Psychoeducation',58],b:['Peer support',65],f:v=>Math.round(v)+'%',cap:'PARADES, 8 sites in England. The difference was not significant. [[Morriss2016PARADES]]'}}
];
/* social-rhythm anchors: usual clock hour and a week of deviations (hours) when steady or irregular */
const TH_ANCH=[
 {n:'Out of bed',h:7,st:[0,.2,-.2,.1,0,.4,.5],ir:[0,-.5,1.6,.3,-1.2,3,3.5]},
 {n:'First meal',h:7.5,st:[.1,0,.2,-.1,.1,.5,.6],ir:[.2,-.8,2.4,0,1.6,3.5,-1.4]},
 {n:'Main activity starts',h:9,st:[0,.1,0,-.2,.1,.6,.7],ir:[0,1.8,-1.3,2.6,0,-2.2,4]},
 {n:'Evening meal',h:18.5,st:[.2,-.1,0,.3,.1,.4,-.3],ir:[1.5,-.2,2.2,-1.6,.4,2.8,-.5]},
 {n:'Lights out',h:23,st:[0,.2,-.1,.1,.3,.6,.5],ir:[.5,2,-.4,1.4,3,3.5,2.2]}
];
const TH_DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
inits.therapy=()=>{
  const svg=$('#thSvg'),rg=$('#thT'),read=$('#thRead');
  const lamS=-Math.log(1-.644)/12,lamC=-Math.log(1-.515)/12;
  const fS=m=>1-Math.exp(-lamS*m),fC=m=>1-Math.exp(-lamC*m);
  const hm=n=>{const r=rng(n),a=[];for(let i=0;i<120;i++)a.push(r());return a};
  const R120=hm(41);
  /* one illustrative person per arm: recurrence times spread over 5 years (4 vs 8, the rounded means) */
  const EVP=[.55,1.6,2.9,4.2],EVC=[.3,.9,1.5,2.1,2.7,3.3,3.9,4.6];
  function draw(t){
    const N=vb(svg,'720 400','400 640');
    const yr=5*ramp(t,TH_C0,TH_C5),mo=12*ramp(t,TH_S0,TH_S12),ph=phaseOf(TH_STEPS,t);
    const A=N?{x0:52,x1:372,y0:52,y1:186,r1:234,r2:262,b0:298}:{x0:52,x1:326,y0:56,y1:220,r1:256,r2:280,b0:316};
    const B=N?{x0:52,x1:372,y0:400,y1:530,tx:566}:{x0:420,x1:694,y0:56,y1:220,tx:262};
    let s=`<defs>${marker('thAr','var(--muted)')}</defs>`;
    /* ---- panel A: Barcelona ---- */
    const AX=y=>lerp(A.x0,A.x1,y/5),AY=v=>lerp(A.y1,A.y0,v/9);
    s+=`<text x="${A.x0-36}" y="${A.y0-28}" class="t-sm" style="fill:var(--accent)">BARCELONA · GROUP PSYCHOEDUCATION</text><text x="${A.x0-36}" y="${A.y0-14}" class="t-xs">mean recurrences per person · 120 randomised</text>`;
    const split=t<TH_C0+.02;
    if(!split){[0,3,6,9].forEach(v=>{s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${f1(AY(v))}" y2="${f1(AY(v))}" class="${v?'grid':'axis'}"/><text x="${A.x0-6}" y="${f1(AY(v)+3)}" class="t-xs t-end">${v}</text>`});
    [0,1,2,3,4,5].forEach(y=>{s+=`<text x="${f1(AX(y))}" y="${A.y1+14}" class="t-xs t-mid">${y===5?'5 y':y}</text>`})}
    if(split){/* the 120 people split into two arms */
      const sp=ease(ramp(t,.02,.12));
      R120.forEach((r,i)=>{const arm=i%2,k=Math.floor(i/2);
        const x0=A.x0+40+(i%15)*14,y0=A.y0+14+Math.floor(i/15)*17;
        const x=lerp(x0,(arm?A.x0+(A.x1-A.x0)*.55:A.x0+12)+(k%6)*12,sp),y=lerp(y0,A.y0+6+Math.floor(k/6)*(N?13:15),sp);
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:${sp>.05?(arm?'var(--muted)':'var(--accent)'):'var(--line)'}"/>`});
      if(sp>.6){const ly=A.y0+6+10*(N?13:15)+8;s+=`<text x="${f1(A.x0+42)}" y="${f1(ly)}" class="t-xs t-mid" style="fill:var(--accent)">21 group sessions</text><text x="${f1(A.x0+(A.x1-A.x0)*.55+30)}" y="${f1(ly)}" class="t-xs t-mid">21 unstructured meetings</text>`}
    }else{
      const fP=y=>3.86*y/5,fCt=y=>8.37*y/5;
      const ln=(f,c,dash)=>{let d='';for(let i=0;i<=40;i++){const y=yr*i/40;d+=(i?'L':'M')+f1(AX(y))+' '+f1(AY(f(y)))}return `<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.6;stroke-linecap:round${dash?';stroke-dasharray:6 4':''}"/>`};
      s+=ln(fCt,'var(--muted)',1)+ln(fP,'var(--accent)');
      if(yr>=1.99&&yr<4.9){s+=`<line x1="${f1(AX(2))}" x2="${f1(AX(2))}" y1="${A.y0}" y2="${A.y1}" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:2 3;opacity:.7"/><text x="${f1(AX(2)+4)}" y="${A.y0+10}" class="t-xs" style="fill:var(--accent)">2-year report: fewer relapsed</text>`}
      const ex=AX(yr);
      s+=`<circle cx="${f1(ex)}" cy="${f1(AY(fCt(yr)))}" r="4" style="fill:var(--muted)"/><circle cx="${f1(ex)}" cy="${f1(AY(fP(yr)))}" r="4" style="fill:var(--accent)"/>`;
      if(yr>=4.99){s+=`<text x="${f1(ex-6)}" y="${f1(AY(8.37)-8)}" class="t-lbl t-end" style="fill:var(--muted)">8.37</text><text x="${f1(ex-6)}" y="${f1(AY(3.86)-8)}" class="t-lbl t-end" style="fill:var(--accent)">3.86</text>`}
      else if(yr>.3){s+=`<text x="${f1(ex+7)}" y="${f1(AY(fCt(yr))+3)}" class="t-xs" style="fill:var(--muted)">control</text><text x="${f1(ex+7)}" y="${f1(AY(fP(yr))+12)}" class="t-xs" style="fill:var(--accent)">psychoeducation</text>`}
      /* illustrative people: ticks on two rows */
      [[A.r1,EVP,'var(--accent)','one person, psychoeducation'],[A.r2,EVC,'var(--muted)','one person, control']].forEach(([y,E,c,l])=>{
        s+=`<line x1="${A.x0}" x2="${f1(AX(yr))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:1.4;opacity:.6"/>`;
        E.forEach(e=>{if(e<=yr)s+=`<path d="M${f1(AX(e))} ${y-7}L${f1(AX(e)+4)} ${y}L${f1(AX(e))} ${y+7}L${f1(AX(e)-4)} ${y}Z" style="fill:${c}"/>`});
        s+=`<text x="${A.x1}" y="${y-9}" class="t-xs t-end" style="fill:${c}">${l}: ${E.filter(e=>e<=yr).length}</text>`});
      /* days acutely ill */
      const dP=154*yr/5,dC=586*yr/5,bw=v=>(A.x1-A.x0)*v/600;
      s+=`<text x="${A.x0-36}" y="${A.b0-6}" class="t-xs">days acutely ill, total over follow-up</text>`;
      s+=`<rect x="${A.x0}" y="${A.b0}" width="${f1(bw(dP))}" height="13" rx="3" style="fill:var(--accent)"/><text x="${f1(A.x0+bw(dP)+5)}" y="${A.b0+10}" class="t-xs" style="fill:var(--accent)">${Math.round(dP)}</text>`;
      s+=`<rect x="${A.x0}" y="${A.b0+18}" width="${f1(bw(dC))}" height="13" rx="3" style="fill:var(--muted);opacity:.75"/><text x="${f1(A.x0+bw(dC)+5)}" y="${A.b0+28}" class="t-xs">${Math.round(dC)}</text>`;
    }
    /* ---- panel B: STEP-BD ---- */
    const BX=m=>lerp(B.x0,B.x1,m/12),BY=v=>lerp(B.y1,B.y0,v/100),on=t>=TH_S0-.04;
    s+=`<g style="opacity:${on?1:.35}">`;
    s+=`<text x="${B.x0-36}" y="${B.y0-28}" class="t-sm" style="fill:var(--accent)">STEP-BD · BIPOLAR DEPRESSION</text><text x="${B.x0-36}" y="${B.y0-14}" class="t-xs">% recovered · 293 randomised</text>`;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${B.x0}" x2="${B.x1}" y1="${f1(BY(v))}" y2="${f1(BY(v))}" class="${v?'grid':'axis'}"/><text x="${B.x0-6}" y="${f1(BY(v)+3)}" class="t-xs t-end">${v}</text>`});
    [0,3,6,9,12].forEach(m=>{s+=`<text x="${f1(BX(m))}" y="${B.y1+14}" class="t-xs t-mid">${m===12?'12 mo':m}</text>`});
    if(!on)s+=`<text x="${f1((B.x0+B.x1)/2)}" y="${f1((B.y0+B.y1)/2)}" class="t-xs t-mid">plays after the Barcelona years</text>`;
    if(mo>0){const cv=(f,c,dash)=>{let d='';for(let i=0;i<=48;i++){const m=mo*i/48;d+=(i?'L':'M')+f1(BX(m))+' '+f1(BY(100*f(m)))}return `<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.6;stroke-linecap:round${dash?';stroke-dasharray:6 4':''}"/>`};
      s+=cv(fC,'var(--muted)',1)+cv(fS,'var(--accent)');
      const vS=100*fS(mo),vC=100*fC(mo),ex=BX(mo);
      s+=`<circle cx="${f1(ex)}" cy="${f1(BY(vS))}" r="4" style="fill:var(--accent)"/><circle cx="${f1(ex)}" cy="${f1(BY(vC))}" r="4" style="fill:var(--muted)"/>`;
      if(mo>=11.99){s+=`<text x="${f1(ex-6)}" y="${f1(BY(vS)-9)}" class="t-lbl t-end" style="fill:var(--accent)">64.4%</text><text x="${f1(ex-6)}" y="${f1(BY(vC)+18)}" class="t-lbl t-end" style="fill:var(--muted)">51.5%</text>`}
      else if(mo>1.5){s+=`<text x="${f1(ex-4)}" y="${f1(BY(vS)-9)}" class="t-xs t-end" style="fill:var(--accent)">intensive therapy</text><text x="${f1(ex-4)}" y="${f1(BY(vC)+16)}" class="t-xs t-end">collaborative care</text>`}
    }
    const tl=N?[B.x0-36,B.tx]:[B.x0-36,B.tx];
    s+=`<text x="${tl[0]}" y="${tl[1]}" class="t-xs">up to 30 sessions (FFT, IPSRT or CBT) vs 3 sessions</text>`;
    if(mo>=11.99)s+=`<text x="${tl[0]}" y="${tl[1]+16}" class="t-xs" style="fill:var(--accent)">time to recovery HR 1.47 · well in any month ×1.58</text>`;
    s+='</g>';
    /* ---- summary band ---- */
    if(ph===4){const o=ramp(t,TH_S12,.95),y=N?614:380,x0=N?20:60,w=N?360:600;
      s+=`<g style="opacity:${f1(o)}"><rect x="${x0}" y="${y-20}" width="${w}" height="34" rx="9" style="fill:var(--accent-soft);stroke:var(--accent)"/><text x="${x0+w/2}" y="${y+2}" class="t-lbl t-mid" style="fill:var(--accent)">${N?'39 RCTs: recurrence OR 0.56 with therapy':'39 RCTs pooled: therapy + medication vs control, recurrence OR 0.56'}</text></g>`}
    svg.innerHTML=s;
    read.innerHTML=t<TH_C0?'<span>Randomising: <b>120</b> people</span>':`<span>Barcelona: <b>year ${f1(yr)}</b></span><span>STEP-BD: <b>${mo<.05?'not started':'month '+f1(mo)}</b></span>`;
    $('#thNote').innerHTML=noteHTML(TH_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#thPlay'),draw,24000,'Replay','therapy');
  const setSt=stepWire($('#thSteps'),TH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- comparator ---- */
  const pick=$('#thPick'),cmp=$('#thCmpSvg');let cur='psy',stopB=null;
  pick.innerHTML=TH_TX.map(x=>`<button class="btn" data-tx="${x.id}" aria-pressed="${x.id===cur}">${x.n.replace(/ \(.*\)/,'')}</button>`).join('');
  function bars(B,p){const N=false;let s='';const x0=20,w=360,bw=v=>w*clamp(v/B.mx);
    s+=`<text x="${x0}" y="22" class="t-sm">${B.u.toUpperCase()}</text>`;
    [[B.a,'var(--accent)',60],[B.b,'var(--muted)',136]].forEach(([[l,v],c,y])=>{const vv=v*p;
      s+=`<text x="${x0}" y="${y-8}" class="t-lbl" style="fill:${c}">${l}</text><rect x="${x0}" y="${y}" width="${w}" height="30" rx="6" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y}" width="${f1(Math.max(2,bw(vv)))}" height="30" rx="6" style="fill:${c};opacity:.9"/>`;
      const inside=bw(vv)>70;s+=`<text x="${f1(inside?x0+bw(vv)-8:x0+bw(vv)+8)}" y="${y+20}" class="t-big${inside?' t-end':''}" style="fill:${inside?'var(--panel)':c}">${B.f(vv)}</text>`});
    s+=`<text x="${x0}" y="208" class="t-xs">scale 0–${B.mx}</text>`;
    cmp.innerHTML=s}
  function show(id){cur=id;const x=TH_TX.find(q=>q.id===id);
    $$('[data-tx]',pick).forEach(b=>b.setAttribute('aria-pressed',b.dataset.tx===id));
    $('#thCard').innerHTML=`<div class="th-head"><h4>${x.n}</h4><span class="ev ${x.ev}">${x.evl}</span></div><dl><div><dt>What happens in sessions</dt><dd>${x.what}</dd></div><div><dt>How long</dt><dd>${x.len}</dd></div><div><dt>Key trial</dt><dd>${x.trial}</dd></div><div><dt>Network meta-analysis (39 RCTs)</dt><dd>${x.nma}</dd></div></dl>`;
    $('#thCmpCap').innerHTML=x.bars.cap;
    if(stopB)stopB();bars(x.bars,0);stopB=animate(700,p=>bars(x.bars,ease(p)))}
  pick.addEventListener('click',e=>{const b=e.target.closest('[data-tx]');if(b)show(b.dataset.tx)});
  bars(TH_TX[0].bars,1);show(cur);

  /* ---- social rhythm grid ---- */
  const rs=$('#thRhythm'),irr=TH_ANCH.map(()=>false);
  $('#thRhythmBtns').innerHTML='<span class="kicker">Make irregular</span>'+TH_ANCH.map((a,i)=>`<button class="btn" data-an="${i}" aria-pressed="false">${a.n}</button>`).join('');
  const hh=h=>{const H=((Math.floor(h)%24)+24)%24,M=Math.round((h-Math.floor(h))*60);return String(H).padStart(2,'0')+':'+String(M===60?0:M).padStart(2,'0')};
  function drawR(){const N=vb(rs,'720 340','400 470');
    const L=N?{lx:10,c0:62,c1:350,top:46,rh:82,sx:392,dev:13}:{lx:16,c0:190,c1:610,top:46,rh:56,sx:700,dev:9};
    let s='',ok=0;
    TH_DAYS.forEach((d,j)=>{const x=lerp(L.c0,L.c1,j/6);s+=`<text x="${f1(x)}" y="${L.top-18}" class="t-xs t-mid">${d}</text>`});
    TH_ANCH.forEach((a,i)=>{const yc=L.top+L.rh*i+L.rh/2+(N?8:0),dv=irr[i]?a.ir:a.st;
      s+=N?`<text x="${L.lx}" y="${f1(yc-L.rh/2+4)}" class="t-xs" style="fill:var(--ink)">${a.n} · usual ${hh(a.h)}</text>`
          :`<text x="${L.lx}" y="${f1(yc-2)}" class="t-lbl">${a.n}</text><text x="${L.lx}" y="${f1(yc+12)}" class="t-xs">usual ${hh(a.h)}</text>`;
      s+=`<rect x="${L.c0-20}" y="${f1(yc-L.dev)}" width="${L.c1-L.c0+40}" height="${2*L.dev}" rx="5" style="fill:var(--eu-soft)"/><line x1="${L.c0-20}" x2="${L.c1+20}" y1="${yc}" y2="${yc}" style="stroke:var(--eu);stroke-width:1;stroke-dasharray:2 3"/>`;
      let d='',n=0;dv.forEach((v,j)=>{const x=lerp(L.c0,L.c1,j/6),y=yc-clamp(v,-3,3)/3*L.dev*2.3;d+=(j?'L':'M')+f1(x)+' '+f1(y)});
      s+=`<path d="${d}" style="fill:none;stroke:var(--muted);stroke-width:1.2;opacity:.6"/>`;
      dv.forEach((v,j)=>{const x=lerp(L.c0,L.c1,j/6),y=yc-clamp(v,-3,3)/3*L.dev*2.3,in1=Math.abs(v)<=1;if(in1)n++;
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${N?5:5.5}" style="fill:${in1?'var(--eu)':'var(--accent)'};stroke:var(--panel);stroke-width:1.5"><title>${TH_DAYS[j]}: ${hh(a.h+v)}</title></circle>`});
      ok+=n;s+=`<text x="${L.sx}" y="${f1(yc+4)}" class="t-lbl t-end" style="fill:${n===7?'var(--eu)':'var(--accent)'}">${n}/7</text>`});
    s+=`<text x="${N?10:L.c0-20}" y="${N?462:334}" class="t-xs">${N?'band: within 1 hour of usual · higher dot = later':'shaded band: within 1 hour of the usual time · dots above the line are later'}</text>`;
    rs.innerHTML=s;
    const pc=Math.round(100*ok/35),nIrr=irr.filter(Boolean).length;
    $('#thScore').textContent=pc+'%';$('#thScoreTxt').textContent=`${ok} of 35 anchors within an hour of the usual time (schematic)`;
    $('#thRhythmNote').innerHTML=noteHTML(nIrr===0?
      {k:'Steady week',t:'Regular anchors, steadier body clock',txt:`Every anchor stays close to its usual time, even at the weekend. IPSRT made social rhythms more regular by the end of acute treatment (P&lt;.001), and people who increased their regularity were less likely to have a recurrence (P=.05). <span class="ev early">Early evidence</span> [[Frank2005IPSRT]]`,
       pt:`Getting up, eating and going to bed at about the same times each day can help keep moods steadier.`,hook:`IPSRT = interpersonal psychotherapy + social rhythm regularity. [[Frank2005IPSRT]]`}:
      {k:nIrr+' irregular routine'+(nIrr>1?'s':''),t:'Shifting anchors, shifting sleep',txt:`Late nights and late mornings pull the other anchors with them. Sleep loss can trigger a switch into mania, and mania in turn reduces sleep: a proposed self-reinforcing loop (<span class="ev hyp">Hypothesis</span>, supported by sleep-deprivation data). [[Wehr1987]] Between episodes, people with bipolar disorder already show more variable sleep-wake patterns than controls. [[Ng2015Sleep]] Sleep disturbance is the most common early warning sign of mania (median 77%). [[Jackson2003]]`,
       pt:`A run of late nights is worth noticing. Losing sleep is often the first warning sign of a high.`,hook:`Most robust early sign of mania: sleep disturbance (median 77%). [[Jackson2003]]`})}
  $('#thRhythmBtns').addEventListener('click',e=>{const b=e.target.closest('[data-an]');if(!b)return;const i=+b.dataset.an;irr[i]=!irr[i];b.setAttribute('aria-pressed',irr[i]);drawR()});
  drawR();
  const pr=redraws.therapy;redraws.therapy=()=>{pr&&pr();drawR()};
};
