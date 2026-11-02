/* =============== 4.3 The MTA study & long-term treatment =============== */
const MT_ARMS=[{n:'Medication management',sh:'Medication',c:'var(--dx)',succ:56,dose:37.5},{n:'Behavioural treatment',sh:'Behavioural',c:'var(--beh)',succ:34,dose:25.7},
 {n:'Combined',sh:'Combined',c:'var(--brand)',succ:68,dose:30.4},{n:'Community care',sh:'Community',c:'var(--gold)',succ:25,dose:24.0}];
const MT_TL=['0','14 mo','24 mo','36 mo','6 y','8 y','16 y'];
/* schematic symptom severity (1 = baseline, lower is better), drawn through the published comparisons */
const MT_SYM=[[1,.42,.49,.57,.57,.57,.55],[1,.58,.58,.58,.57,.57,.56],[1,.37,.48,.56,.56,.57,.55],[1,.64,.61,.59,.58,.58,.56]];
const MT_N=['579 randomised','579 at the end of treatment','540 of 579 (93%)','485 of 579 (84%)','436 at 6 and 8 years','476 with ADHD and 241 classmates'];
const MT_STEPS=[
 {from:0,at:.02,k:'Baseline · 1990s',t:'579 children, four strategies',
  txt:`The Multimodal Treatment Study of Children with ADHD (MTA) randomised 579 children aged 7 to 9.9 with ADHD combined type to 14 months of medication management, intensive behavioural treatment, the two combined, or community care. Medication management meant careful titration, then monthly visits; the behavioural arm had parent, school and child components, with therapist involvement reduced over time. [[MTA1999,Jensen2001MTA]]`,
  pt:`Children were put into one of four treatment groups by chance, so the groups started out alike.`,
  hook:`MTA: N = 579, ages 7–9.9, combined type, 4 arms, 14 months, intention-to-treat.`},
 {from:.1,at:.167,k:'14 months · end of treatment',t:'Medication strategies lead',
  txt:`All four groups improved a lot. For most ADHD symptoms, combined treatment and medication management beat behavioural treatment and community care, and did not differ from each other on any direct comparison. On a secondary "success" measure (low symptoms on averaged parent and teacher ratings), the rates were 68% combined, 56% medication, 34% behavioural and 25% community care, and by that measure combined treatment did beat medication alone. Study medication beat community care although about two-thirds of community-care children took medication. [[MTA1999,Swanson2001MTA]]`,
  pt:`In the first year, carefully managed medicine worked best for the core symptoms.`,
  hook:`MTA success rates at 14 months: combined 68%, medication 56%, behavioural 34%, community 25%. [[Swanson2001MTA]]`},
 {from:.26,at:.333,k:'24 months · 10 months after treatment ended',t:'The gap halves',
  txt:`With 540 of 579 children assessed, medication strategies were still ahead for ADHD and oppositional symptoms, but by less, and combined treatment no longer added anything over medication management. The effect size of the medication advantage fell by 50%. Children who stopped medication deteriorated most, and children who started it improved. Mean doses (methylphenidate equivalent) were 37.5 mg/day in medication management, 30.4 combined, 25.7 behavioural and 24.0 community care, quoted as reported. [[MTA2004,MTA2004Growth]]`,
  pt:`Once the study's careful treatment ended, families made their own choices and the groups started to look more alike.`,
  hook:`MTA 24 months: medication advantage halved; combined no longer better than medication alone. [[MTA2004]]`},
 {from:.42,at:.5,k:'36 months · mean age 11.9',t:'No differences left',
  txt:`At 3 years (485 children), the four groups no longer differed significantly on any measure. One reason shows in the lower chart: between 14 and 36 months, children taking medication more than half the time rose from 14% to 45% in the behavioural arm, fell from 91% to 71% in the medication arms, and stayed at 60–62% in community care. After 14 months the arms were no longer receiving the treatments they were randomised to. [[Jensen2007MTA]]`,
  pt:`By three years, many children had switched treatments, so the original groups ended up alike.`,
  hook:`MTA 36 months: no significant group differences; crossover (behavioural arm 14% → 45% medicated). [[Jensen2007MTA]]`},
 {from:.58,at:.8,k:'6 and 8 years · teenagers',t:'Trajectory matters more than arm',
  txt:`At 6 and 8 years (436 young people), the original groups did not differ on nearly any measure, including grades, arrests and psychiatric hospitalisations. Medication use fell by 62% after the trial: 32.5% took medication on more than half of days at 8 years, against 63.3% at 14 months. What did predict 8-year outcomes was the symptom course over the first 3 years (55% of the variance): 52% improved strongly and stayed improved, 34% improved gradually, and 14% improved then returned to their starting level. The ADHD group fared worse than classmates on 91% of variables. [[Molina2009]]`,
  pt:`How a child's symptoms went in the first three years told more about the teenage years than which group they had been in.`,
  hook:`MTA 8 years: early 3-year trajectory, not the assigned treatment, predicted outcomes. [[Molina2009]]`},
 {from:.88,at:1,k:'16 years · mean age about 25',t:'Into adulthood',
  txt:`At 16 years (476 with ADHD, 241 classmates), 50% still had persistent symptoms, and education, work, income and risky sexual behaviour followed a gradient: classmates best, persistent-symptom group worst. Across 8 assessments to age 25, only 9.1% had sustained recovery, 10.8% stable persistence and 63.8% a fluctuating course. By 16 years there had been 10 deaths in the ADHD group and 1 among classmates, cohort counts and not individual risks. Switch the outcome to <b>Adult height</b> or <b>Substance use</b> for two questions people often ask. [[Hechtman2016,Sibley2022]]`,
  pt:`Most of these young adults still had some ADHD symptoms, and for most of them the symptoms came and went over the years.`,
  hook:`MTA to age 25: sustained recovery 9.1%, stable persistence 10.8%, fluctuating 63.8%. [[Sibley2022]]`}
];
const MT_OUTNOTE={
 height:`<div class="callout"><b>Adult height.</b> In young adulthood, consistent or inconsistent stimulant use was associated with being 2.55 ± 0.73 cm shorter than negligible use, while longer use was not associated with lower adult symptom severity. These were naturalistic subgroups chosen by families after the trial, not randomised arms. NICE suggests considering a planned treatment break for catch-up growth if a child's height has clearly been affected. [[Swanson2017MTA,NICE2018F]]</div>`,
 sub:`<div class="callout"><b>Substance use.</b> By a mean age of 17, neither the randomised treatment, medication at follow-up nor cumulative stimulant treatment was associated with adolescent substance use or substance use disorder, in either direction. Participants with ADHD used more substances than classmates at every time point. Register studies with within-person designs find fewer substance-related emergencies during medicated months, so the two designs answer different questions. [[Molina2013,Quinn2017]]</div>`};
/* lower chart: % of children taking medication more than half the time */
const MT_MED=[{n:'Behavioural arm',c:'var(--beh)',p:[[1,14],[3,45]]},{n:'Medication arms',c:'var(--dx)',p:[[1,91],[3,71]]},{n:'Community care',c:'var(--gold)',p:[[1,60],[3,62]]},{n:'Whole sample (days)',c:'var(--muted)',p:[[1,63.3],[5,32.5]],dash:'4 3'}];
const MT_PROT=[['Titration, monthly visits','Methylphenidate ~3×/day','Contact with school'],['Parent + school + child','Therapist contact faded','75% unmedicated, year 1'],['Medication management','+ behavioural package'],['Usual community care','~2 in 3 took medication']];
const MT_ARMTXT=[
 `<b>Medication management.</b> Titration followed by monthly visits; in practice careful but adequate dosing, methylphenidate usually three times a day, monthly follow-up and communication with schools. Success at 14 months: 56%. [[MTA1999,Jensen2001MTA,Swanson2001MTA]]`,
 `<b>Behavioural treatment.</b> Parent, school and child components, with therapist involvement reduced gradually over time. 75% of these children stayed unmedicated during the treatment year. Success at 14 months: 34%; children with anxiety disorders did relatively well in this arm. [[MTA1999,Pelham2016,Swanson2001MTA,MTA1999Moderators]]`,
 `<b>Combined.</b> Both packages together. Not better than medication alone on core symptoms, but ahead on several non-ADHD outcomes and on a composite measure (effect size 0.28 against medication management, 0.70 against community care). Success at 14 months: 68%. In families whose negative discipline fell most, combined treatment brought teacher-rated disruptive behaviour into the normal range. [[MTA1999,Conners2001,Swanson2001MTA,Hinshaw2000]]`,
 `<b>Community care.</b> The comparison group received usual care in the community; about two-thirds took medication during the study, yet did less well than the study medication strategies. Success at 14 months: 25%. [[MTA1999,Swanson2001MTA]]`];
const MT_SM=[['Classroom rule violations per hour',8.4,12.6,14,'',1],['Needed added treatment at school',67,47,100,'%',0],['Normalised teacher ratings',78,69,100,'%',0],['Adequate parent-training dose',69,11,100,'%',2],['Cost of a school year (2013 US$)',961,1669,1800,'$',1]];

inits.mta=()=>{
  const svg=$('#mtSvg'),rg=$('#mtT');let out='sym';
  const ink='fill:var(--ink)';
  const val=(k,ti)=>{const i=Math.min(5,Math.floor(ti)),f=ease(clamp(ti-i));return lerp(k[i],k[Math.min(6,i+1)],f)};
  function draw(t){const N=vb(svg,'720 440','400 510'),ti=t*6,P=phaseOf(MT_STEPS,t),st=MT_STEPS[P];
    const L=N?{x:44,y:44,w:262,h:230,lx:316,my:340,mh:120}:{x:64,y:40,w:430,h:218,lx:530,my:316,mh:84};
    let s='';
    /* top chart */
    if(out==='sym'){const A=axes(L.x,L.y,L.w,L.h,{x0:0,x1:6.3,y0:0,y1:1.08,xt:[0,1,2,3,4,5,6],fx:i=>MT_TL[i],yt:[],xl:N?'':'follow-up (not to scale)'});s+=A.svg;
      s+=`<text x="${L.x}" y="${L.y-14}" class="t-sm" style="fill:var(--beh);font-weight:700">ADHD SYMPTOMS · SCHEMATIC</text><text x="${L.x-6}" y="${f1(A.Y(1)+3)}" class="t-xs t-end">start</text><text x="${L.x-6}" y="${f1(A.Y(.12))}" class="t-xs t-end">fewer</text>`;
      s+=`<rect x="${f1(A.X(0))}" y="${L.y}" width="${f1(A.X(1)-A.X(0))}" height="${L.h}" style="fill:var(--beh-soft);opacity:.5"/><text x="${f1(A.X(.5))}" y="${L.y+12}" class="t-xs t-mid" style="fill:var(--beh)">${N?'trial':'randomised'}</text>`;
      if(ti>4.6){const o=clamp((ti-4.6)*2);s+=`<g style="opacity:${f1(o)}"><path d="M${f1(A.X(5))} ${f1(A.Y(.2))}L${f1(A.X(Math.min(ti,6)))} ${f1(A.Y(.22))}" style="stroke:var(--muted);stroke-width:2;stroke-dasharray:4 3"/><circle cx="${f1(A.X(5))}" cy="${f1(A.Y(.2))}" r="3" style="fill:var(--muted)"/><text x="${f1(A.X(5)-6)}" y="${f1(A.Y(.2)+4)}" class="t-xs t-end">classmates</text></g>`}
      MT_ARMS.forEach((a,k)=>{const pts=[];for(let u=0;u<=Math.min(ti,6)+1e-6;u+=.05)pts.push([u,val(MT_SYM[k],u)]);pts.push([Math.min(ti,6),val(MT_SYM[k],Math.min(ti,6))]);
        s+=trace(pts,A.X,A.Y,{c:a.c,w:2.4});const cx=A.X(Math.min(ti,6)),cy=A.Y(val(MT_SYM[k],Math.min(ti,6)));s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="4" style="fill:${a.c}"/>`;
        if(ti>=1)s+=`<circle cx="${f1(A.X(1))}" cy="${f1(A.Y(MT_SYM[k][1]))}" r="6.5" style="fill:none;stroke:${a.c};stroke-width:1.5"/>`});
      const ann=(i,txt,y)=>{if(ti<i)return;s+=`<line x1="${f1(A.X(i))}" x2="${f1(A.X(i))}" y1="${f1(A.Y(.9))}" y2="${f1(A.Y(.68))}" style="stroke:var(--muted);stroke-dasharray:2 3"/><text x="${f1(A.X(i))}" y="${f1(A.Y(y))}" class="t-xs t-mid" style="${ink}">${txt}</text>`};
      ann(3,'no significant differences',.95);if(!N)ann(5,'still no differences',.95)}
    else if(out==='height'){const A=axes(L.x,L.y,L.w,L.h,{x0:0,x1:6.3,y0:-4,y1:1,xt:[0,1,2,3,4,5,6],fx:i=>MT_TL[i],yt:[-3,-2,-1,0],fy:v=>v+' cm',xl:N?'':'follow-up (not to scale)'});s+=A.svg;
      s+=`<text x="${L.x}" y="${L.y-14}" class="t-sm" style="fill:var(--beh);font-weight:700">ADULT HEIGHT · NATURALISTIC SUBGROUPS</text>`;
      s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(A.Y(0))}" y2="${f1(A.Y(0))}" style="stroke:var(--ink);opacity:.5"/>`;
      const g=ease(ramp(ti,4.8,5.9)),bx=A.X(5.55),bw=N?20:26,yb=A.Y(0),ye=A.Y(-2.55*g),e1=A.Y((-2.55-.73)*g),e2=A.Y((-2.55+.73)*g);
      s+=`<rect x="${f1(bx-bw/2)}" y="${f1(yb)}" width="${bw}" height="${f1(Math.max(0,ye-yb))}" rx="3" style="fill:var(--brand)"/><line x1="${f1(bx)}" x2="${f1(bx)}" y1="${f1(e2)}" y2="${f1(e1)}" style="stroke:var(--ink);stroke-width:1.4;opacity:${f1(g)}"/>`;
      if(g>.05)s+=`<text x="${f1(bx+bw/2+6)}" y="${f1(ye+4)}" class="t-xs" style="${ink};font-weight:700">−${(2.55*g).toFixed(2)} cm</text>`;
      s+=`<text x="${f1(bx)}" y="${f1(yb-8)}" class="t-xs t-mid">stimulant users vs negligible use</text>`;
      if(ti<4.8)s+=`<text x="${f1(A.X(2.4))}" y="${f1(A.Y(-1.5))}" class="t-xs t-mid">Height in young adulthood was compared</text><text x="${f1(A.X(2.4))}" y="${f1(A.Y(-1.5)+14)}" class="t-xs t-mid">by how much stimulant people had taken,</text><text x="${f1(A.X(2.4))}" y="${f1(A.Y(-1.5)+28)}" class="t-xs t-mid">not by randomised arm. Scrub to 16 y.</text>`}
    else{const A=axes(L.x,L.y,L.w,L.h,{x0:0,x1:6.3,y0:0,y1:1,xt:[0,1,2,3,4,5,6],fx:i=>MT_TL[i],yt:[],xl:N?'':'follow-up (not to scale)'});s+=A.svg;
      s+=`<text x="${L.x}" y="${L.y-14}" class="t-sm" style="fill:var(--beh);font-weight:700">SUBSTANCE USE · SCHEMATIC</text><text x="${L.x-6}" y="${f1(A.Y(.9))}" class="t-xs t-end">more</text>`;
      const sv=u=>u<3.6?0:.12+.5*ease(ramp(u,3.6,6)),cl=u=>u<3.6?0:.06+.28*ease(ramp(u,3.6,6));
      if(ti>3.6){MT_ARMS.forEach((a,k)=>{const pts=[];for(let u=3.6;u<=Math.min(ti,6)+1e-6;u+=.05)pts.push([u,sv(u)+(k-1.5)*.008]);s+=trace(pts,A.X,A.Y,{c:a.c,w:2})});
        const pc=[];for(let u=3.6;u<=Math.min(ti,6)+1e-6;u+=.05)pc.push([u,cl(u)]);s+=trace(pc,A.X,A.Y,{c:'var(--muted)',w:2,dash:'4 3'});
        if(ti>4.2)s+=`<text x="${f1(A.X(Math.min(ti,6))-4)}" y="${f1(A.Y(cl(Math.min(ti,6)))+14)}" class="t-xs t-end">classmates</text><text x="${f1(A.X(Math.min(ti,6))-4)}" y="${f1(A.Y(sv(Math.min(ti,6)))-10)}" class="t-xs t-end" style="${ink}">all four arms together</text>`}
      if(ti>=4.6)s+=`<line x1="${f1(A.X(4.6))}" x2="${f1(A.X(4.6))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--muted);stroke-dasharray:2 3"/><text x="${f1(A.X(4.6)-4)}" y="${L.y+14}" class="t-xs t-end">mean age 17: no arm or</text><text x="${f1(A.X(4.6)-4)}" y="${L.y+27}" class="t-xs t-end">medication effect</text>`;
      if(ti<3.6)s+=`<text x="${f1(A.X(2))}" y="${f1(A.Y(.5))}" class="t-xs t-mid">Substance use was followed from adolescence.</text>`}
    /* legend with the stat that belongs to this step */
    const stat=k=>P===1?MT_ARMS[k].succ+'% success':P===2?MT_ARMS[k].dose.toFixed(1)+' mg/day':P===3?[71,45,71,62][k]+'% medicated':P>=4?'≈ alike':'';
    const lg=N?{x:L.lx,y:L.y+10,dy:44}:{x:L.lx,y:L.y+16,dy:44};
    if(out==='sym')MT_ARMS.forEach((a,k)=>{const y=lg.y+k*lg.dy;s+=`<rect x="${lg.x}" y="${y-8}" width="12" height="4" rx="2" style="fill:${a.c}"/><text x="${lg.x+16}" y="${y-2}" class="t-xs" style="${ink}">${N?a.sh:a.n}</text>`;
      const sv=stat(k);if(sv)s+=`<text x="${lg.x+16}" y="${y+12}" class="${N?'t-xs':'t-sm'}" style="fill:${a.c};font-weight:700">${sv}</text>`});
    if(out!=='sym'&&!N){const T=out==='height'?['Compared in young','adulthood by how much','stimulant was taken:','','consistent or','inconsistent use vs','negligible use','−2.55 ± 0.73 cm']:['All four arms drawn','as one bundle: no','randomised or','medication effect','by mean age 17.','','Dashed: classmates','without ADHD.'];
      T.forEach((l,k)=>s+=`<text x="${lg.x}" y="${lg.y+k*15}" class="t-xs" style="${k===7&&out==='height'?'fill:var(--brand);font-weight:700':ink}">${l}</text>`)}
    if(out==='sym'&&!N&&P>=1&&P<=3)s+=`<text x="${lg.x}" y="${lg.y+4*lg.dy}" class="t-xs">${P===1?'low-symptom success':P===2?'mean dose at 24 mo':'on medication >50%'}</text>`;
    /* lower chart: medication use */
    const M=axes(L.x,L.my,L.w,L.mh,{x0:0,x1:6.3,y0:0,y1:100,xt:N?[]:[],yt:[0,50,100],fy:v=>v+'%'});s+=M.svg;
    s+=`<text x="${L.x}" y="${L.my-8}" class="t-sm" style="fill:var(--beh);font-weight:700">TAKING MEDICATION MOST OF THE TIME</text>`;
    MT_MED.forEach((m,k)=>{if(ti<m.p[0][0])return;const a=m.p[0],b=m.p[1],u=Math.min(ti,b[0]),v=lerp(a[1],b[1],ramp(u,a[0],b[0]));
      s+=trace([[a[0],a[1]],[u,v]],M.X,M.Y,{c:m.c,w:2.2,dash:m.dash});s+=`<circle cx="${f1(M.X(a[0]))}" cy="${f1(M.Y(a[1]))}" r="3" style="fill:${m.c}"/>`;
      if(ti>=b[0])s+=`<circle cx="${f1(M.X(b[0]))}" cy="${f1(M.Y(b[1]))}" r="3" style="fill:${m.c}"/><text x="${f1(M.X(b[0])+6)}" y="${f1(M.Y(b[1])+(k===1?-5:k===3?4:12))}" class="t-xs" style="fill:${m.c};font-weight:700">${b[1]}%</text>`;
      s+=`<text x="${f1(M.X(a[0])-6)}" y="${f1(M.Y(a[1])+(k===3?-4:k===2?12:4))}" class="t-xs t-end" style="fill:${m.c}">${a[1]}</text>`});
    MT_MED.forEach((m,k)=>{const y=N?L.my+L.mh+18+Math.floor(k/2)*14:L.my+8+k*18,x=N?L.x+(k%2)*170:L.lx;s+=`<rect x="${x}" y="${y-7}" width="12" height="4" rx="2" style="fill:${m.c}"/><text x="${x+16}" y="${y-2}" class="t-xs">${m.n}</text>`});
    /* now marker */
    const nx=Math.min(ti,6.3);s+=`<line x1="${f1(M.X(nx))}" x2="${f1(M.X(nx))}" y1="${L.y}" y2="${L.my+L.mh}" style="stroke:var(--ink);opacity:.18"/>`;
    svg.innerHTML=s;setSt(P);
    const idx=Math.min(6,Math.round(ti));rg.setAttribute('aria-valuetext',`${MT_TL[idx]==='0'?'baseline':MT_TL[idx]}: ${st.t}`);
    $('#mtRead').innerHTML=`<span>follow-up <b>${MT_TL[Math.min(6,Math.floor(ti+.15))]==='0'?'baseline':MT_TL[Math.min(6,Math.floor(ti+.15))]}</b></span><span>assessed <b>${MT_N[P]}</b></span>`;
    $('#mtNote').innerHTML=noteHTML(st)+(MT_OUTNOTE[out]||'')}
  const stop=playWire(rg,$('#mtPlay'),draw,26000,'%t:player.replay%','mta');
  const setSt=stepWire($('#mtSteps'),MT_STEPS,rg,draw,stop);
  $$('[data-mt-out]').forEach(b=>b.addEventListener('click',()=>{out=b.dataset.mtOut;$$('[data-mt-out]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- randomisation of 579 ---- */
  const rs=$('#mtRndSvg'),rr=$('#mtRndT');let selA=-1;
  const R=rng(579),perm=[...Array(579).keys()].sort(()=>R()-.5),armOf=[],slot=[],cnt=[0,0,0,0];
  perm.forEach((p,k)=>{armOf[p]=k%4});for(let i=0;i<579;i++){slot[i]=cnt[armOf[i]]++}
  function drawR(t){const N=vb(rs,'720 400','400 720');
    const B=N?[[6,30],[204,30],[6,376],[204,376]].map(([x,y])=>({x,y,w:190,h:336,cols:13,dx:14,dy:15,gx:x+10,gy:y+30})):[0,1,2,3].map(i=>({x:6+i*178,y:36,w:170,h:356,cols:12,dx:13,dy:14.5,gx:6+i*178+10,gy:66}));
    const SG=N?{cols:22,x0:20,dx:17.3,y0:40,dy:24.5}:{cols:33,x0:24,dx:20.6,y0:42,dy:19.5},gs=N?11:10.5;
    let s=`<defs><symbol id="mtP" overflow="visible">${person(0,0,gs,'currentColor')}</symbol></defs>`;
    const mv=ramp(t,.15,.6),prot=ramp(t,.62,.75),suc=ramp(t,.8,.95);
    if(mv>0)B.forEach((b,i)=>{const a=MT_ARMS[i],hl=selA===i;s+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="10" style="fill:var(--panel);stroke:${hl?a.c:'var(--line)'};stroke-width:${hl?2.4:1};opacity:${f1(mv)}"/><text x="${b.x+10}" y="${b.y+18}" class="t-sm" style="fill:${a.c};font-weight:700;opacity:${f1(mv)}">${a.n.toUpperCase()}</text>`});
    for(let i=0;i<579;i++){const a=armOf[i],b=B[a],j=slot[i];
      const sx=SG.x0+(i%SG.cols)*SG.dx,sy=SG.y0+Math.floor(i/SG.cols)*SG.dy,ex=b.gx+(j%b.cols)*b.dx,ey=b.gy+Math.floor(j/b.cols)*b.dy;
      const st=i/579*.18,p=ease(ramp(t,.15+st,.42+st)),x=lerp(sx,ex,p),y=lerp(sy,ey,p),app=ramp(t,i/579*.12,i/579*.12+.03);
      const nA=cnt[a],ok=j<Math.round(MT_ARMS[a].succ/100*nA*suc);
      const col=p<.5?'var(--muted)':MT_ARMS[a].c,op=suc>0&&!ok?.28:1;
      s+=`<use href="#mtP" x="${f1(x)}" y="${f1(y)}" style="color:${col};opacity:${f1(app*op)}"/>`}
    if(t<.62){const n=Math.round(ramp(t,0,.12)*579);s+=`<text x="${N?200:360}" y="${N?20:22}" class="t-sm t-mid" style="${ink}">${t<.15?`${n} children aged 7–9.9 enrolled`:'randomised to four arms'}</text>`}
    if(prot>0)B.forEach((b,i)=>{const ty=b.gy+13*b.dy+12;MT_PROT[i].forEach((l,k)=>s+=`<text x="${b.x+10}" y="${f1(ty+k*14)}" class="t-xs" style="${ink};opacity:${f1(prot)}">${l}</text>`)});
    if(suc>0)B.forEach((b,i)=>{const v=Math.round(MT_ARMS[i].succ*suc);s+=`<text x="${b.x+b.w-10}" y="${b.y+b.h-12}" class="t-big t-end" style="fill:${MT_ARMS[i].c}">${v}%</text><text x="${b.x+b.w-10}" y="${b.y+b.h-30}" class="t-xs t-end">success at 14 mo</text>`});
    rs.innerHTML=s;
    rr.setAttribute('aria-valuetext',t<.15?'enrolment':t<.62?'randomisation':t<.8?'protocols':'success at 14 months');
    $('#mtRndNote').innerHTML=`<div class="kicker">${selA<0?'The design':'Arm '+(selA+1)+' of 4'}</div><h4>${selA<0?'Randomisation makes the arms comparable':MT_ARMS[selA].n}</h4><p>${selA<0?`Because a random process, not families or doctors, chose each child's arm, differences at 14 months can be put down to the treatment strategies. Outcomes were measured before, during and at the end of treatment, and the medication arms were still taking medication at every assessment. Pick an arm to read its protocol. [[MTA1999]]`:MT_ARMTXT[selA]}</p><div class="pt"><b>%t:note.plain%</b>"Success" here means low symptoms at the end of treatment on averaged parent and teacher ratings. It is a group result, not a prediction for any child.</div>`}
  playWire(rr,$('#mtRndPlay'),drawR,12000,'%t:player.replay%','mta');
  $$('[data-mt-arm]').forEach(b=>b.addEventListener('click',()=>{const k=+b.dataset.mtArm;selA=selA===k?-1:k;$$('[data-mt-arm]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.mtArm===selA));drawR(+rr.value)}));
  drawR(+rr.value);

  /* ---- sequencing trial ---- */
  const ss=$('#mtSmartSvg');let pick='beh',grow=1,cS=null;
  function drawS(){const N=vb(ss,'720 300','400 470');let s='';const lx=N?14:12,bx0=N?14:300,bx1=N?330:640,rh=N?88:54;
    s+=`<rect x="${N?14:300}" y="6" width="12" height="8" rx="2" style="fill:var(--beh)"/><text x="${N?30:316}" y="14" class="t-xs" style="${ink}">behaviour first</text><rect x="${N?140:430}" y="6" width="12" height="8" rx="2" style="fill:var(--dx)"/><text x="${N?156:446}" y="14" class="t-xs" style="${ink}">medication first</text>`;
    MT_SM.forEach(([n,b,m,mx,u,lowGood],i)=>{const y=(N?34:34)+i*rh,ly=N?y+4:y+20,by=N?y+14:y+8;
      s+=`<text x="${lx}" y="${ly}" class="t-sm" style="${ink}">${n}</text>`;if(!N&&lowGood)s+=`<text x="${lx}" y="${ly+14}" class="t-xs">${lowGood===2?'parents, when it was offered':'lower is better'}</text>`;
      [[b,'var(--beh)','beh'],[m,'var(--dx)','med']].forEach(([v,c,k],j)=>{const w=(bx1-bx0)*v/mx*(k===pick?grow:1),yy=by+j*17,hl=k===pick;
        s+=`<rect x="${bx0}" y="${yy}" width="${f1(w)}" height="13" rx="3" style="fill:${c};opacity:${hl?1:.35}"/><text x="${f1(bx0+w+6)}" y="${yy+10.5}" class="t-xs" style="${hl?ink+';font-weight:700':''}">${u==='$'?'$'+v.toLocaleString('en-US'):v+(u||'')}</text>`})});
    ss.innerHTML=s;
    $('#mtSmartNote').innerHTML=pick==='beh'?noteHTML({k:'Sequencing trial · start with behavioural treatment',t:'Behaviour first',
      txt:`Children who began with low-intensity behavioural treatment had fewer observed classroom rule violations at the end of the year (8.4 vs 12.6 per hour; incidence rate ratio 0.66), and 78% had normalised teacher ratings. Adding medication after behavioural treatment worked better than the reverse order. More of these children needed added treatment at school (67% vs 47%). Parents attended a mean 6 of 8 sessions, and 69% received an adequate dose. A school year cost $961. [[Pelham2016,Page2016]]`,
      pt:`Starting with a low level of behaviour therapy, then adding medicine if needed, worked at least as well as starting with medicine in one trial, and cost less.`,
      hook:`Pelham 2016 SMART: behaviour first → fewer rule violations (8.4 vs 12.6/h), cheaper ($961 vs $1,669).`})
      :noteHTML({k:'Sequencing trial · start with medication',t:'Medication first',
      txt:`Children who began with low-dose extended-release methylphenidate needed added school treatment less often (47% vs 67%), and 69% had normalised teacher ratings. But when parent training was added later, 60% of parents attended no sessions and only 11% got an adequate dose. A school year starting this way cost $1,669 in 2013 US dollars. Most children in both arms needed more help at home (82% vs 88%). [[Pelham2016,Page2016]]`,
      pt:`Once a child had started medicine, most parents did not take up the parent training offered later.`,
      hook:`In the medication-first arm, 60% of parents offered training later attended no sessions. [[Pelham2016]]`})}
  $$('[data-mt-smart]').forEach(b=>b.addEventListener('click',()=>{pick=b.dataset.mtSmart;$$('[data-mt-smart]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(cS)cS();cS=animate(600,p=>{grow=ease(p);drawS()},()=>{cS=null})}));
  redraws.mta=(prev=>()=>{prev&&prev();drawS()})(redraws.mta);
  drawS();

  /* ---- discontinuation trial ---- */
  const ds=$('#mtDiscSvg'),dr=$('#mtDiscT');
  function drawD(t){const N=vb(ds,'720 280','400 390');const w=t*7;let s='';
    const A=axes(N?44:56,30,N?300:380,N?190:200,{x0:0,x1:7,y0:15,y1:27,xt:[0,1,2,3,4,5,6,7],yt:[15,18,21,24,27],xl:'weeks',yl:'ADHD-RS score (higher = more symptoms)'});s+=A.svg;
    s+=`<rect x="${f1(A.X(0))}" y="30" width="${f1(A.X(3)-A.X(0))}" height="${N?190:200}" style="fill:var(--panel-2);opacity:.6"/><text x="${f1(A.X(1.5))}" y="44" class="t-xs t-mid">3-week taper</text>`;
    const C=[[0,21.4],[7,21.9]],S=[[0,19.6],[7,24.7]],at=(p,x)=>lerp(p[0][1],p[1][1],x/7);
    s+=trace([[0,21.4],[w,at(C,w)]],A.X,A.Y,{c:'var(--rx)',w:2.6})+trace([[0,19.6],[w,at(S,w)]],A.X,A.Y,{c:'var(--drug)',w:2.6});
    [[C,'continued','var(--rx)',-8],[S,'switched to placebo','var(--drug)',14]].forEach(([p,l,c,dy])=>{s+=`<circle cx="${f1(A.X(w))}" cy="${f1(A.Y(at(p,w)))}" r="4" style="fill:${c}"/><text x="${f1(Math.min(A.X(w)+6,A.X(7)-2))}" y="${f1(A.Y(at(p,w))+dy)}" class="t-xs${w>5?' t-end':''}" style="fill:${c};font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3px">${at(p,w).toFixed(1)} ${l}</text>`});
    const g=ease(ramp(t,.85,1)),bx=N?44:500,by=N?296:60,bw=N?300:190;
    s+=`<text x="${bx}" y="${by-12}" class="t-sm" style="fill:var(--beh);font-weight:700">CLINICAL WORSENING</text>`;
    [['continued',15.9,'var(--rx)'],['stopped',40.4,'var(--drug)']].forEach(([l,v,c],i)=>{const y=by+i*(N?40:56);s+=`<text x="${bx}" y="${y+8}" class="t-xs" style="${ink}">${l}</text><rect x="${bx}" y="${y+14}" width="${f1(bw*v/50*g)}" height="16" rx="3" style="fill:${c}"/><text x="${f1(bx+bw*v/50*g+6)}" y="${y+26}" class="t-xs" style="${ink};font-weight:700">${g>0?(v*g).toFixed(1)+'%':''}</text>`});
    ds.innerHTML=s;dr.setAttribute('aria-valuetext',`week ${f1(w)}`);
    $('#mtDiscNote').innerHTML=noteHTML({k:'Matthijssen 2019 · week '+f1(w),t:'Stopping after 2 years',
      txt:`Mean ADHD-RS went from 21.4 to 21.9 with continued methylphenidate and from 19.6 to 24.7 after tapering to placebo (between-group difference in change −4.6, 95% CI −8.7 to −0.56). Clinical worsening on the CGI-I: 40.4% after stopping, 15.9% with continuation. [[Matthijssen2019]]`,
      pt:`For many young people the medicine was still helping after 2 years, but some did fine without it. That is why the need for it is reviewed from time to time.`,
      hook:`Discontinuation RCT: worsening 40.4% (stop) vs 15.9% (continue). Supports periodic review. [[Matthijssen2019]]`})}
  playWire(dr,$('#mtDiscPlay'),drawD,9000,'%t:player.replay%','mta');
  drawD(+dr.value);
};
