/* ===== 5.4 After sepsis: recovery & families ===== */
/* The year after discharge. The scrubber runs 0..AF_MMAX months. Every plotted point is a published time point
   (cited in the caption and the notes); lines only join them. Studies differ, so lines are not one cohort. */
const AF_MMAX=13;
const AF_PAN=['Body and daily life','Thinking','Mood'];
const AF_L=[
 {p:0,n:'readmitted (cumulative)',col:'var(--accent)',pts:[[0,0],[7/30,9.3],[1,21.4],[3,42.7]]},
 {p:0,n:'back at work',col:'var(--rec)',pts:[[3,33],[6,55],[12,56]]},
 {p:1,n:'marked impairment (1.5 SD)',col:'var(--dx)',pts:[[3,40],[12,34]]},
 {p:1,n:'severe impairment (2 SD)',col:'var(--mottle)',pts:[[3,26],[12,24]]},
 {p:2,n:'anxiety symptoms',col:'var(--warn)',pts:[[2.5,32],[6,40],[13,34]]},
 {p:2,n:'depressive symptoms',col:'var(--dx)',pts:[[2.5,29],[6,34],[13,29]]},
 {p:2,n:'PTSD symptoms (IES 35+)',col:'var(--accent)',pts:[[3.5,25],[9.5,17]]}
];
const AF_MS=[[0,'discharge'],[1,'1 mo'],[3,'3 mo'],[6,'6 mo'],[12,'1 year']];
const AF_STEPS=[
 {m0:0,at:.2,k:'Week 0',t:'Leaving hospital',sub:'new problems may not show yet',
  txt:`Post-intensive care syndrome (PICS) means new or worsening physical, cognitive or mental health problems after critical illness that persist beyond the hospital stay, in the survivor or a family member. [[Needham2012PICS]] The Surviving Sepsis Campaign 2021 lists, as best practice statements, medicine reconciliation at ICU and hospital discharge and a discharge summary covering the ICU stay, sepsis, treatments and common impairments after sepsis; it suggests (weak) written and verbal sepsis education before discharge. [[Evans2021SSC]]`,
  pt:`Before you leave hospital, you can ask for written information about sepsis, your treatment, and what problems to look out for. [[Evans2021SSC]]`,
  hook:`PICS = physical + cognitive + mental health problems that persist after critical illness; PICS-F = the same idea in family members. [[Needham2012PICS]]`},
 {m0:.5,at:1,k:'The first month',t:'The first weeks home',sub:'readmissions start early',
  txt:`Rehospitalisation after sepsis averaged 9.3% by 7 days and 21.4% by 30 days, and infection was the most common reason. [[ShankarHari2020Rehospitalisation]] A 30-day nurse-navigator transition programme (IMPACTS) lowered death or readmission by 30 days from 33.3% to 28.7%. [[Taylor2022IMPACTS]] In a diary trial, ICU diaries were given 1 month after ICU discharge, and new PTSD at 3 months fell from 13% to 5%. [[Jones2010Diaries]]`,
  pt:`Going back into hospital in the first weeks is common, often because of another infection. Knowing the warning signs and getting help early matters. [[ShankarHari2020Rehospitalisation]]`,
  hook:`Commonest readmission diagnosis after sepsis: infection. [[ShankarHari2020Rehospitalisation]]`},
 {m0:1.6,at:3,k:'Months 1 to 3',t:'About 4 in 10 back in hospital',sub:'and thinking and mood are often affected',
  txt:`Among 2,617 older US adults surviving severe sepsis, 42.7% were rehospitalised within 90 days; readmission for sepsis (6.4% vs 2.8%) and acute kidney failure (3.3% vs 1.2%) were the clear excesses over matched controls. [[Prescott2015Readmission]] After respiratory failure or shock, 40% scored 1.5 SD below population means for global cognition at 3 months (like moderate traumatic brain injury) and 26% 2 SD below (like mild Alzheimer's disease). [[Pandharipande2013BRAINICU]] At 2–3 months, 32% of ICU survivors had anxiety symptoms and 29% depressive symptoms (HADS ≥8). [[Nikayin2016Anxiety,Rabiee2016Depression]] Only 33% of previously employed survivors were back at work at 3 months. [[McPeake2019RTW]]`,
  pt:`Feeling foggy, worried or low in the first months is common after intensive care, and these problems can be treated. Tell your doctor or nurse. [[Parker2015PTSD,Rabiee2016Depression]]`,
  hook:`About 40% of sepsis survivors are readmitted within 90 days. [[Prescott2015Readmission]] BRAIN-ICU: 40% at 3 months had TBI-like cognitive scores. [[Pandharipande2013BRAINICU]]`},
 {m0:4.5,at:6,k:'Around 6 months',t:'Halfway through the year',sub:'mood symptoms have not yet eased',
  txt:`At 6 months, anxiety symptoms affected 40% and depressive symptoms 34% of ICU survivors, so they had not fallen since 2–3 months. [[Nikayin2016Anxiety,Rabiee2016Depression]] Clinically important PTSD symptoms had a pooled prevalence of 25% at 1–6 months (Impact of Event Scale ≥35), or 44% with the lower threshold of ≥20; they were more common with benzodiazepine use and frightening early ICU memories. [[Parker2015PTSD]] Return to work reached 55% at 6 months after critical illness, and 58.6% after a sepsis hospitalisation in Norway. [[McPeake2019RTW,Skei2023RTW]] Abnormal sleep was reported in 22–57% at 3–6 months. [[Altman2017Sleep]]`,
  pt:`About half of people who were working before are working again by around 6 months. It often takes time, and that is normal. [[McPeake2019RTW,Skei2023RTW]]`,
  hook:`PTSD prevalence depends on the threshold: always quote the scale and cut-off beside the figure. [[Parker2015PTSD]]`},
 {m0:10,at:12,k:'One year',t:'One year on',sub:'about half have recovered',
  txt:`Among people discharged after sepsis, a review estimates that about half recover, one third die during the following year and one sixth have severe persistent impairments (population statistics). [[Prescott2018Recovery]] In England, 15% of 94,748 adult survivors of critical care had died by 1 year. [[ShankarHari2019LateMortality]] At 12 months, 34% still had cognition 1.5 SD below population means and 24% 2 SD below. [[Pandharipande2013BRAINICU]] PTSD symptoms (IES ≥35) fell to 17% at 7–12 months; anxiety was 34% and depression 29% at 12–14 months. [[Parker2015PTSD,Nikayin2016Anxiety,Rabiee2016Depression]] Return to work was 56% at 12 months after critical illness and 67.5% at 1 year after sepsis in Norway. [[McPeake2019RTW,Skei2023RTW]]`,
  pt:`Many people get better after sepsis, but recovery can take months, and some problems last longer. The figures describe large groups and cannot predict what will happen to one person. [[Prescott2018Recovery]]`,
  hook:`After sepsis discharge: about half recover, one third die within a year, one sixth have severe persistent impairment. [[Prescott2018Recovery]]`},
 {m0:12.6,at:13,k:'Beyond the first year',t:'Years 2 to 5',sub:'risk stays raised for years',
  txt:`In the English cohort, 6% to 8% died per year over the 5 years after the first. [[ShankarHari2019LateMortality]] In older US adults, sepsis was linked to a 22.1% absolute increase in deaths from 31 days to 2 years compared with matched adults not in hospital, so more than 1 in 5 survivors has a late death not explained by their health before sepsis. [[Prescott2016LateMortality]] <span class="ev early">Early evidence</span> Survivors had higher long-term risk of heart attack (aHR 1.77), stroke (1.67) and heart failure (1.65), with low to very low certainty. [[Kosyakovsky2021CV]] Return to work was 63.4% at 2 years in Norway. [[Skei2023RTW]] <span class="ev hyp">Hypothesis</span> Why the risk persists is not known: persistent inflammation, immune dysfunction and residual organ damage are proposed. [[Prescott2016LateMortality,Kosyakovsky2021CV]]`,
  pt:`Sepsis can leave the body more vulnerable for some years. Regular check-ups, medicine reviews and getting new infections seen early are part of looking after yourself. [[Prescott2018Recovery]]`,
  hook:`Prescott 2016: 22.1% absolute excess late mortality vs non-hospitalised controls. [[Prescott2016LateMortality]]`}
].map(s=>Object.assign(s,{from:s.m0/AF_MMAX,at:s.at/AF_MMAX}));

const AF_Q=[
 {t:'Strength and everyday tasks',q:['Could weakness from intensive care (ICU-acquired weakness) explain what I notice?','Can I be referred for rehabilitation or physiotherapy?'],
  why:`ICU-acquired weakness reduces long-term physical function. [[Vanhorebeek2020ICUAW]] SSC 2021 suggests (weak) referral to a post-hospital rehabilitation programme for survivors ventilated more than 48 h or in ICU more than 72 h. [[Evans2021SSC]]`},
 {t:'Memory and concentration',q:['Is this change in memory or concentration something to assess?','Who can help with thinking problems after critical illness?'],
  why:`Moderate to severe cognitive impairment rose after severe sepsis in older adults (OR 3.34). [[Iwashyna2010Cognitive]] SSC 2021 lists assessment and follow-up of cognitive problems after discharge as a best practice statement. [[Evans2021SSC]]`},
 {t:'Worry, low mood, nightmares',q:['Could these be anxiety, depression or post-traumatic stress after intensive care?','What treatment or talking therapy is available?'],
  why:`Anxiety, depression and PTSD symptoms are common after ICU and can be treated. [[Nikayin2016Anxiety,Rabiee2016Depression,Parker2015PTSD]]`},
 {t:'Sleep',q:['Is poor sleep expected at this stage, and what might help?'],
  why:`Abnormal sleep is common after critical illness, and most studies show improvement over time. [[Altman2017Sleep]]`},
 {t:'Medicines',q:['Which medicines were stopped, started or changed in hospital, and why?','Should any long-term medicines be reviewed now?'],
  why:`SSC 2021: medicine reconciliation at ICU and hospital discharge (best practice statement). [[Evans2021SSC]] Reviewing long-term medicines is part of the suggested focus after discharge. [[Prescott2018Recovery]]`},
 {t:'Work, money and housing',q:['Can someone help me plan a return to work?','Who can advise on financial, housing or other support?'],
  why:`About half of previously employed survivors are working at 6 to 12 months. [[McPeake2019RTW]] SSC 2021: screening patients and families for economic and social support and referring where available (best practice statement). [[Evans2021SSC]]`},
 {t:'Family',q:['Is there support for my family as well as for me?','Is there a peer support group for survivors and families near us?'],
  why:`Relatives can develop anxiety, depression and post-traumatic stress (PICS-F). [[Davidson2012PICSF]] SSC 2021 suggests peer support groups for survivors and families (weak, very low quality). [[Evans2021SSC]]`},
 {t:'Understanding what happened',q:['Can someone explain what happened in intensive care and what sepsis did?','Did the unit keep an ICU diary, and can I see it?'],
  why:`SSC 2021 suggests sepsis education, including post-sepsis syndrome, before discharge and at follow-up. [[Evans2021SSC]] ICU diaries reduced new PTSD from 13% to 5% in a randomised trial. [[Jones2010Diaries]]`}
];

inits.after=()=>{
  const svg=$('#afSvg'),rg=$('#afT');let setSt=()=>{};
  const T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const at=(pts,m)=>{if(m<pts[0][0])return null;for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];if(m<=b[0])return a[1]+(b[1]-a[1])*(m-a[0])/(b[0]-a[0])}return pts[pts.length-1][1]};
  function panel(x,y,w,h,pi,M,nr){const YM=60,pl=30,pb=18,pt=26,X=m=>x+pl+(w-pl-8)*m/AF_MMAX,Y=v=>y+h-pb-(h-pb-pt)*v/YM;
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--panel-2);opacity:.55"/>`;
    s+=T(x+10,y+17,AF_PAN[pi],'t-sm','fill:var(--ink);font-weight:700');
    [0,20,40,60].forEach(v=>{s+=`<line x1="${f1(x+pl)}" x2="${f1(x+w-8)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" style="stroke:var(--line);stroke-width:${v?.6:1}"/>`+T(x+pl-4,Y(v)+3,v+'%','t-xs t-end')});
    [0,3,6,9,12].forEach(m=>{s+=T(X(m),y+h-5,m===0?'0':m+'m','t-xs t-mid')});
    s+=`<line x1="${f1(X(M))}" x2="${f1(X(M))}" y1="${f1(y+pt-4)}" y2="${f1(y+h-pb)}" style="stroke:var(--rec);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    const L=AF_L.filter(l=>l.p===pi);
    L.forEach((l,li)=>{const P=l.pts.filter(p=>p[0]<=M),v=at(l.pts,M);
      if(P.length){const Q=P.map(p=>[X(p[0]),Y(p[1])]);if(v!=null&&M<l.pts[l.pts.length-1][0])Q.push([X(M),Y(v)]);
        s+=`<path d="${Q.map((q,i)=>(i?'L':'M')+f1(q[0])+' '+f1(q[1])).join('')}" style="fill:none;stroke:${l.col};stroke-width:2.4;stroke-linecap:round"/>`;
        P.forEach(p=>{if(p[1]>0)s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="3.4" style="fill:var(--panel);stroke:${l.col};stroke-width:2"/>`})}
      const last=P.filter(p=>p[1]>0).pop(),ly=y+h+14+li*14;
      s+=`<rect x="${f1(x+4)}" y="${f1(ly-7)}" width="12" height="4" rx="2" style="fill:${l.col}"/>`+T(x+20,ly-2,l.n+(last?`: <tspan style="fill:var(--ink);font-weight:700">${f1(last[1])}%</tspan>`:''),'t-xs')});
    return s}
  function draw(t){
    const nr=vb(svg,'720 470','400 900'),M=t*AF_MMAX,ph=phaseOf(AF_STEPS,t),S=AF_STEPS[ph];let s='';
    s+=T(nr?14:20,26,S.t,'t-big')+T(nr?14:20,43,S.sub,'t-sm');
    /* the path through the year */
    const rx0=nr?24:40,rx1=nr?376:680,ry=nr?86:84,RX=m=>rx0+(rx1-rx0)*m/AF_MMAX;
    s+=`<line x1="${rx0}" x2="${rx1}" y1="${ry}" y2="${ry}" style="stroke:var(--panel-2);stroke-width:10;stroke-linecap:round"/>`;
    s+=`<line x1="${rx0}" x2="${f1(RX(M))}" y1="${ry}" y2="${ry}" style="stroke:var(--rec-soft);stroke-width:10;stroke-linecap:round"/>`;
    AF_MS.forEach(([m,l])=>{const on=M>=m;s+=`<circle cx="${f1(RX(m))}" cy="${ry}" r="4.5" style="fill:${on?'var(--rec)':'var(--panel)'};stroke:var(--rec);stroke-width:1.6"/>`+(nr&&m===1?'':T(RX(m),ry+19,l,'t-xs t-mid',on?'fill:var(--ink)':''))});
    s+=T(rx1,ry+19,M>12.5?'years 2 to 5 →':'','t-xs t-end','fill:var(--rec);font-weight:700');
    const bob=Math.abs(Math.sin(M*9))*1.6;
    s+=person(RX(M),ry-33-bob,26,'var(--rec)');
    /* three domains */
    if(!nr){[0,1,2].forEach(i=>{s+=panel(20+i*238,128,204,176,i,M,nr)})}
    else{[0,1,2].forEach(i=>{s+=panel(12,124+i*200,376,140,i,M,nr)})}
    /* one year: the review estimate as 100 people */
    const iy=nr?730:378,ix=nr?14:20,cs=nr?12:13,rh=nr?15:16,rev=ramp(M,11.2,12);
    s+=T(ix,iy-8,rev>0?'One year after discharge: review estimate per 100 people':'100 people leaving hospital after sepsis','t-sm','fill:var(--ink);font-weight:700');
    for(let i=0;i<100;i++){const c=i%20,r=Math.floor(i/20),g=i<50?0:i<67?1:2,col=['var(--rec)','var(--warn)','var(--muted)'][g],op=g===2?.45:1;
      const fill=rev>0?col:'var(--line)';s+=person(ix+c*cs+cs/2,iy+r*rh,rh-3,fill,{op:rev>0?lerp(1,op,rev):1})}
    const lx=nr?ix:ix+20*cs+18,ly=nr?iy+5*rh+16:iy+6;
    [['about 50 recover','var(--rec)'],['about 17 live with severe lasting problems','var(--warn)'],['about 33 die during the year','var(--muted)']].forEach(([l,c],i)=>{
      s+=`<g style="opacity:${f1(rev)}"><circle cx="${f1(lx+5)}" cy="${f1(ly+i*17)}" r="5" style="fill:${c}"/>${T(lx+15,ly+i*17+3.5,l,'t-xs','fill:var(--ink)')}</g>`});
    s+=`<g style="opacity:${f1(rev)}">${T(lx,ly+3*17+4,'population statistics, not a prediction for one person','t-xs','font-style:italic')}</g>`;
    svg.innerHTML=s;setSt(ph);
    $('#afNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#afPlay'),draw,30000,'Replay','after');
  setSt=stepWire($('#afSteps'),AF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- questions for follow-up ---------- */
  function qs(){const on=$$('[data-afq]').filter(c=>c.checked).map(c=>+c.dataset.afq);
    $('#afOut').innerHTML=on.length?on.map(i=>{const Q=AF_Q[i];return `<div class="card"><span class="tag rec">${Q.t}</span><ul>${Q.q.map(q=>`<li>${q}</li>`).join('')}</ul><p class="stage-cap">${Q.why}</p></div>`}).join('')
      :`<div class="card"><h4>Nothing ticked yet</h4><p>Questions you might ask will appear here. You can also ask, at any appointment: "What problems are common after sepsis, and who do I contact if I notice them?" [[Evans2021SSC]]</p></div>`}
  $$('[data-afq]').forEach(c=>c.addEventListener('change',qs));
  qs();
};
