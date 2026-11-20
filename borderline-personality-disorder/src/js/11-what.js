/* =============== 1.1 What BPD is =============== */
/* Who has BPD? Five scenes on one scrubber: a 1,000-person icon array for the community estimates,
   four 100-person grids for clinical settings, an age panel and a sex-ratio panel whose sample
   (community or clinical) is chosen by a toggle. Every number comes from research pass A. */
const WH_STEPS=[
 {from:0,at:.15,k:'In the community · 1 of 2',t:'The highest estimate: 5.9%',
  txt:`NESARC Wave 2 interviewed 34,653 US adults face to face in 2004–2005 and found lifetime BPD in 5.9% (99% CI 5.4–6.4): 59 of these 1,000 figures. The authors concluded that BPD is "much more prevalent in the general population than previously recognized". It was more common in younger adults, in people who were separated, divorced or widowed, and in people with lower income and education. [[Grant2008]]`,
  pt:`In that survey about 59 adults in every 1,000 had had BPD at some point. Keep going: most experts think this number is too high.`,
  hook:`NESARC Wave 2 (Grant 2008): 5.9% lifetime, with no sex difference (men 5.6%, women 6.2%). [[Grant2008]]`},
 {from:.2,at:.35,k:'In the community · 2 of 2',t:'Stricter rules: 2.7%',
  txt:`A reanalysis of NESARC required each criterion to cause distress or impairment. That cut any personality disorder from 21.5% to 9.1%, [[Trull2010]] and lifetime BPD to 2.7% (95% CI 2.5–3.0): 27 of 1,000. The faded figures are the people the stricter rule removed; Grant's "more liberal diagnostic rules" probably counted people with subthreshold BPD. [[Tomko2014]] Other surveys sit lower still: 1.4% in the US NCS-R and 0.7% in Oslo, and the median point prevalence across community studies is about 1%. A 2024 review gives a lifetime range of 0.7–2.7%. [[Gunderson2009Ontogeny,Torgersen2001,Ellison2018,Leichsenring2024WP]]`,
  pt:`How strict the rules are changes the count. Most experts say about 1 to 3 adults in 100 have BPD at some point in their lives. [[Ellison2018,Tomko2014]]`,
  hook:`Community prevalence ≈ 1–3% (median point ≈ 1%). Requiring distress or impairment for each criterion took NESARC from 5.9% to 2.7%. [[Ellison2018,Tomko2014]]`},
 {from:.4,at:.55,k:'In clinics',t:'Closer to care, more common',
  txt:`BPD becomes more common the nearer you get to specialist care: 6.4% (14 of 218) in a US urban primary care practice, about four times the community rate; about 10–12% of psychiatric outpatients; and about 20–22% of psychiatric inpatients. [[Gross2002PrimaryCare,Ellison2018]] Other reviews give about 12% and 22%, or 15–28% of patients in clinics or hospitals; single outpatient studies range from 7% to 27% depending on setting and method. [[Leichsenring2024WP,Gunderson2018,Korzekwa2008]] In the primary care study, half of the patients with BPD had had no mental health treatment in the past year (ringed), and 42.9% were not recognised by their physician as having an emotional problem. [[Gross2002PrimaryCare]]`,
  pt:`About 1 in 10 people seen in a mental health clinic, and about 1 in 5 people in a psychiatric hospital, have BPD. [[Ellison2018]]`,
  hook:`Outpatients ≈ 10–12%, inpatients ≈ 20–22%, primary care 6.4%, where nearly half went unrecognised. [[Ellison2018,Gross2002PrimaryCare]]`},
 {from:.6,at:.76,k:'By age',t:'It usually starts in adolescence',
  txt:`A coherent BPD syndrome usually begins in adolescence, after age 12, often after or alongside depression, anxiety, conduct problems or substance use. [[Bohus2021]] It can be diagnosed reliably from about age 11, and about 3% of adolescents in the community have it; 3.2% of 6,330 English 11-year-olds met DSM-IV criteria. [[Guile2018,Zanarini2011JPD]] Calling the diagnosis controversial in this age group "is no longer justified". [[Kaess2014Adolescence]] Personality-disorder traits fell by 28% between ages 14 and 22 in one US cohort, [[Johnson2000Acta]] and in German community data BPD fell sharply between adolescence and young adulthood while impulsivity fell and depressivity rose with age. [[Arens2013]] Older outpatients (45–68) more often reported chronic emptiness and less often impulsivity, self-harm and mood swings than younger ones, so BPD in later life is easily missed. [[Morgan2013Older,Beatson2016]]`,
  pt:`BPD usually starts in the teenage years. Teenagers can be diagnosed and helped, and there is no need to wait until 18. [[Bohus2021,Chanen2022Age]]`,
  hook:`Onset in adolescence (after 12); diagnosable from about 11; about 3% of adolescents. Older adults: more emptiness, less impulsivity. [[Bohus2021,Guile2018,Morgan2013Older]]`},
 {from:.8,at:.95,k:'By sex',t:'A sampling story',
  txt:`DSM-IV-TR stated that BPD is "diagnosed predominantly (about 75%) in females". [[Skodol2003]] In the community the gap almost disappears: 6.2% of women and 5.6% of men in NESARC Wave 2, and 3.0% and 2.4% under the stricter rules. [[Grant2008,Tomko2014]] The clinical excess "appears to be largely a function of sampling bias", and the true ratio by sex is unknown. [[Skodol2003]] Men with BPD more often have substance use disorders and antisocial personality disorder; women more often have eating, mood, anxiety and post-traumatic stress disorders. [[Sansone2011Gender]] In a 770-person clinical-trial sample, suicidality, aggression and substance misuse did not differ by sex. [[Silberschmidt2015]]`,
  pt:`Men get BPD about as often as women. Women are diagnosed more often mainly because they seek help more often in the settings where studies were done. [[Skodol2003,Grant2008]]`,
  hook:`Clinical samples ≈ 75% female; community samples ≈ equal. The difference is mainly referral (sampling) bias. [[Skodol2003,Grant2008]]`}
];
const WH_WORDS=[
 {f:'a borderline',c:'said about a person',s:'a person with BPD, someone living with BPD',
  w:`Describe the behaviour, not the person's character. In a 1988 vignette study, the personality-disorder label alone made psychiatrists judge identical patients as more difficult and less deserving of care: "an enduring pejorative judgement rather than a clinical diagnosis". [[Lewis1988]]`},
 {f:'manipulative',c:'said about a request for help',s:'Describe what happened and the need behind it: "asked several staff for help while very distressed"',
  w:`The public may see people with personality disorders as "purposefully misbehaving". [[Sheehan2016]] Nurses given the BPD label for the same challenging behaviour saw it as more under the person's control and felt less sympathy and optimism than with schizophrenia or depression labels. [[Markham2003]]`},
 {f:'attention-seeking',c:'said about self-harm',s:'Self-harm is a sign of severe distress: respond with care and assessment',
  w:`Clinicians should not read repeated suicide attempts as a sign of little wish to die. [[Black2004Suicide]] NICE states that people with BPD "should not be excluded from any health or social care service because of their diagnosis or because they have self-harmed". [[NICE2009]]`},
 {f:'a difficult patient',c:'said in a handover',s:'A person in a lot of distress: what would help right now?',
  w:`Nearly half of 706 surveyed clinicians preferred to avoid patients with BPD, but those who had treated more people with BPD reported more empathy and optimism. [[Black2011Attitudes]] Distancing can feel like rejection to someone sensitive to abandonment and may create "a self-fulfilling prophecy". [[Aviram2006]]`},
 {f:'untreatable',c:'said about the diagnosis',s:'Treatable, and most people improve a great deal',
  w:`Perceived untreatability is one of six themes in the stigma research. [[Ring2019]] In the McLean study, 99% of people had a 2-year remission by 16 years, [[Zanarini2012]] and psychotherapy reduces symptom severity compared with usual care. [[Storebo2020]] Messages that combine recovery with biological causes may reduce stigma most. [[Sheehan2016]]`},
 {f:'too young for BPD',c:'said about a teenager',s:'BPD can be recognised, and helped, in adolescence',
  w:`BPD in adolescence is as reliable and valid as in adults, and can be diagnosed from about age 11. [[Kaess2014Adolescence,Guile2018]] A global alliance calls early intervention "a novel public health priority". [[Chanen2017WP]]`}
];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');let mode='comm',setSt=()=>{};
  /* a person glyph in <defs>, reused by <use>: 1,000 of them stay light enough to redraw every frame */
  const DEF=`<defs><g id="whP"><circle cx="0" cy="1.7" r="1.7"/><path d="M-2.6 10V6Q-2.6 4 0 4Q2.6 4 2.6 6V10Z"/></g></defs>`;
  const P=(x,y,s,fill,op)=>`<use href="#whP" transform="translate(${f1(x)} ${f1(y)}) scale(${(s/10).toFixed(3)})" style="fill:${fill}${op!=null&&op<1?';opacity:'+op.toFixed(2):''}"/>`;
  /* a fixed scatter order, so the same people light up every time */
  const ORD=(()=>{const r=rng(1938),a=[...Array(1000).keys()];for(let i=999;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}const pos=new Array(1000);a.forEach((v,i)=>pos[v]=i);return pos})();
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;

  /* ---- scene A: 1,000 people and the community estimates ---- */
  function sceneA(t,N){
    const hi=t<.2?Math.round(59*ease(ramp(t,.02,.16))):Math.round(lerp(59,27,ease(ramp(t,.22,.34))));
    const ghost=t<.2?0:59-hi;
    const G=N?{x:22,y:70,dx:9,dy:11.2,s:9.6}:{x:24,y:66,dx:8.7,dy:12.2,s:10};
    let s='';
    for(let i=0;i<1000;i++){const c=i%40,r=Math.floor(i/40),x=G.x+c*G.dx+G.dx/2,y=G.y+r*G.dy,o=ORD[i];
      if(o<hi)s+=P(x,y,G.s,'var(--storm)');else if(o<hi+ghost)s+=P(x,y,G.s,'var(--storm)',.28);else s+=P(x,y,G.s,'var(--line)')}
    const gy=G.y+25*G.dy+(N?14:12);
    s+=T(G.x,gy,`<tspan style="fill:var(--storm);font-weight:600">${hi} of 1,000</tspan>${ghost?` · ${ghost} removed by the stricter rule (faded)`:''}`,'t-sm');
    /* the dot plot of estimates */
    const D=N?{x:30,w:340,y:gy+30,dy:34}:{x:420,w:270,y:96,dy:50};
    const E=[['NESARC Wave 2 · lifetime',5.9,0],['NESARC, stricter rules · lifetime',2.7,1],['NCS-R, US',1.4,1],['Median of community studies · point',1,1],['Oslo · interview study',.7,1]];
    const X=v=>D.x+D.w*v/7;
    if(!N){s+=T(D.x,70,'COMMUNITY ESTIMATES OF BPD','t-sm','fill:var(--ink);font-weight:600')}
    else s+=T(D.x,D.y-12,'COMMUNITY ESTIMATES OF BPD','t-sm','fill:var(--ink);font-weight:600');
    E.forEach(([l,v,ph],k)=>{const y=D.y+k*D.dy+(N?12:16),on=ph===0?ramp(t,.02,.1):ramp(t,.24+k*.02,.3+k*.02);if(on<=0)return;
      s+=`<g style="opacity:${f1(on)}">`+T(D.x,y-9,l)+`<line x1="${f1(D.x)}" x2="${f1(D.x+D.w)}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/>`+
        `<circle cx="${f1(X(v))}" cy="${f1(y)}" r="6" style="fill:${k===0?'var(--storm)':k===1?'var(--mood)':'var(--dx)'}"/>`+T(X(v)+11,y+4,v+'%','t-sm','fill:var(--ink);font-weight:600')+'</g>'});
    const ay=D.y+E.length*D.dy+(N?2:6);
    s+=`<line x1="${f1(D.x)}" x2="${f1(D.x+D.w)}" y1="${f1(ay)}" y2="${f1(ay)}" class="axis"/>`;
    [0,1,2,3,4,5,6,7].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(ay)}" y2="${f1(ay+4)}" class="axis"/>`+T(X(v),ay+15,v+'%','t-xs t-mid')});
    if(t>=.2){const b=ramp(t,.3,.36);s+=`<rect x="${f1(X(1))}" y="${f1(D.y-2)}" width="${f1(X(3)-X(1))}" height="${f1(ay-D.y+2)}" rx="6" style="fill:var(--accent);opacity:${f1(.1*b)}"/>`+(b>0?T((X(1)+X(3))/2,ay+28,'most reviews: about 1–3%','t-xs t-mid',`fill:var(--accent);opacity:${f1(b)}`):'')}
    return s}

  /* ---- scene B: four settings as 100-person grids ---- */
  const WH_SET=[['Community','about 1 in 100',1],['Primary care','6.4 in 100',6.4],['Psychiatric outpatients','about 11 in 100',11],['Psychiatric inpatients','about 21 in 100',21]];
  function sceneB(t,N){const p=ease(ramp(t,.41,.53));let s='';
    WH_SET.forEach(([nm,lab,v],i)=>{
      const g=N?{x:24+(i%2)*190,y:84+Math.floor(i/2)*246,dx:16,dy:17}:{x:20+i*174,y:92,dx:15.4,dy:19};
      const n=v*p,full=Math.floor(n),frac=n-full;
      for(let k=0;k<100;k++){const c=k%10,r=Math.floor(k/10),x=g.x+c*g.dx+g.dx/2,y=g.y+r*g.dy;
        if(k<full)s+=P(x,y,12,'var(--storm)');else if(k===full&&frac>.05)s+=P(x,y,12,'var(--storm)',.25+frac*.6);else s+=P(x,y,12,'var(--line)');
        if(i===1&&k<3&&p>.85)s+=`<circle cx="${f1(x)}" cy="${f1(y+6)}" r="8.4" style="fill:none;stroke:var(--warn);stroke-width:1.6;opacity:${f1(ramp(p,.85,1))}"/>`}
      const ly=g.y+10*g.dy+(N?16:18);
      s+=T(g.x+2,ly,nm,'t-lbl')+T(g.x+2,ly+(N?18:20),lab,'t-big','fill:var(--storm);font-size:15px')});
    const op=`opacity:${f1(ramp(p,.85,1))}`;
    if(N)s+=T(24,576,`<tspan style="fill:var(--warn);font-weight:600">○</tspan> ringed: in primary care, half had no mental`,'t-xs',op)+T(24,590,'health treatment in the past year','t-xs',op);
    else s+=T(20,386,`<tspan style="fill:var(--warn);font-weight:600">○</tspan> ringed: in primary care, half had no mental health treatment in the past year`,'t-xs',op);
    return s}

  /* ---- scene C: age ---- */
  const WH_AGE=[['11-year-olds|England',11,3.2],['Adolescents|community',15,3],['US adults|under 30',25,4.3],['All US|adults',45,2.7]];
  const whImp=a=>a<12?.12+.1*ramp(a,10,12):a<16?lerp(.22,.86,ramp(a,12,16)):.86*Math.exp(-(a-16)/34);
  const whEmp=a=>a<12?.1:lerp(.38,.66,ramp(a,16,64));
  function sceneC(t,N){const age=lerp(10,70,ramp(t,.61,.78));let s='';
    const B=N?{x:30,y:84,w:340,h:150}:{x:28,y:92,w:300,h:220};
    s+=T(B.x,B.y-14,'HOW COMMON, BY AGE GROUP','t-sm','fill:var(--ink);font-weight:600');
    const bw=B.w/WH_AGE.length;
    for(let v=0;v<=5;v++){const y=B.y+B.h*(1-v/5);s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${f1(y)}" y2="${f1(y)}" class="${v?'grid':'axis'}"/>`+T(B.x-4,y+3,v+'%','t-xs t-end')}
    WH_AGE.forEach(([l,a,v],i)=>{const on=ramp(age,a-3,a+3),h=B.h*v/5*ease(on),x=B.x+i*bw+bw*.18,w=bw*.64;
      s+=`<rect x="${f1(x)}" y="${f1(B.y+B.h-h)}" width="${f1(w)}" height="${f1(h)}" rx="4" style="fill:${i<2?'var(--mood)':'var(--dx)'};opacity:${f1(.3+.7*on)}"/>`;
      if(on>.5)s+=T(x+w/2,B.y+B.h-h-6,(i===1?'≈':'')+v+'%','t-sm t-mid','fill:var(--ink);font-weight:600');
      const words=l.split('|');words.forEach((wd,j)=>{s+=T(x+w/2,B.y+B.h+14+j*12,wd,'t-xs t-mid')})});
    s+=T(B.x,B.y+B.h+(N?44:46),'Bars come from different studies and rules.','t-xs');
    /* schematic lines */
    const L=N?{x:34,y:350,w:336,h:166}:{x:390,y:92,w:300,h:220};
    s+=T(L.x,L.y-14,'WHAT IT LOOKS LIKE WITH AGE (SCHEMATIC)','t-sm','fill:var(--ink);font-weight:600');
    s+=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="8" style="fill:var(--field)"/>`;
    const u=ramp(age,10,70);
    const fi=x=>whImp(lerp(10,70,x)),fe=x=>whEmp(lerp(10,70,x));
    s+=wave(L.x,L.y,L.w,L.h,fi,{upto:u,col:'var(--storm)',dot:true}).svg;
    s+=wave(L.x,L.y,L.w,L.h,fe,{upto:u,col:'var(--mood)',dot:true,dash:true}).svg;
    const tl=tline(L.x,L.y+L.h+12,L.w,{min:10,max:70,step:10,fmt:v=>v,label:''});s+=tl.svg;
    s+=T(L.x+L.w,L.y+L.h+42,'age (years)','t-xs t-end');
    /* annotations that pop up as the age cursor passes */
    /* [age, text lines, colour, y of the first line, anchor at the right edge] */
    const ann=[[12,['onset usually after 12'],'var(--storm)',L.y+L.h-10,0],[18,['traits fall 28%, ages 14 to 22'],'var(--muted)',L.y+L.h-26,0],[52,['older adults: more emptiness,','less impulsivity and self-harm'],'var(--mood)',L.y+16,1]];
    ann.forEach(([a,lines,c,yy,right])=>{const o=ramp(age,a,a+4);if(o<=0)return;const x=tl.X(a);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(right?yy+lines.length*12:L.y)}" y2="${f1(L.y+L.h)}" style="stroke:${c};stroke-width:1;stroke-dasharray:2 3;opacity:${f1(o*.8)}"/>`;
      lines.forEach((ln,j)=>{s+=T(right?L.x+L.w-6:x+4,yy+j*12,ln,'t-xs'+(right?' t-end':''),`fill:${c};opacity:${f1(o)}`)})});
    s+=T(L.x,L.y+L.h+(N?54:56),'<tspan style="fill:var(--storm)">━ impulsive features</tspan>   <tspan style="fill:var(--mood)">╍ emptiness, low mood</tspan>','t-xs');
    s+=`<line x1="${f1(tl.X(age))}" x2="${f1(tl.X(age))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    s+=T(tl.X(age),L.y-3,'age '+Math.round(age),'t-xs t-mid','fill:var(--ink)');
    return s}

  /* ---- scene D: sex ratio, community or clinical sample ---- */
  function sceneD(t,N){let s='';const p=ease(ramp(t,.81,.9)),clin=mode==='clin';
    const W=clin?15:11;/* women among 20 people with BPD: clinical 75%; community 3.0% vs 2.4% with equal numbers of men and women */
    const box=(x,y,w,h,on)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:${on?'var(--panel-2)':'none'};stroke:${on?'var(--ink)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
    const A=N?{x:20,y:70,w:360,h:140}:{x:20,y:80,w:204,h:250},C=N?{x:20,y:420,w:360,h:120}:{x:496,y:80,w:204,h:250},M=N?{x:60,y:262}:{x:270,y:158};
    s+=box(A.x,A.y,A.w,A.h,!clin)+box(C.x,C.y,C.w,C.h,clin);
    s+=T(A.x+14,A.y+22,'COMMUNITY','t-sm','fill:var(--ink);font-weight:600')+T(A.x+14,A.y+36,'NESARC, stricter rules');
    const bars=[['women',3.0,'var(--self)'],['men',2.4,'var(--other)']];
    bars.forEach(([l,v,c],k)=>{const bx=A.x+14,by=A.y+56+k*(N?30:40),bw=(A.w-90)*v/3.2;
      s+=`<rect x="${bx}" y="${by}" width="${f1(bw*(.2+.8*p))}" height="${N?16:20}" rx="4" style="fill:${c}"/>`+T(bx+bw*(.2+.8*p)+6,by+(N?12:14),l+' '+v.toFixed(1)+'%','t-sm','fill:var(--ink)')});
    s+=T(A.x+14,A.y+A.h-(N?14:40),'Wave 2: women 6.2%, men 5.6%');
    if(!N)s+=T(A.x+14,A.y+A.h-24,'near-equal');
    s+=T(C.x+14,C.y+22,'CLINICAL SAMPLES','t-sm','fill:var(--ink);font-weight:600')+T(C.x+14,C.y+36,'as stated in DSM-IV-TR');
    const cw=C.w-28;s+=`<rect x="${C.x+14}" y="${C.y+(N?54:60)}" width="${f1(cw)}" height="${N?18:22}" rx="4" style="fill:var(--other)"/><rect x="${C.x+14}" y="${C.y+(N?54:60)}" width="${f1(cw*.75*(.2+.8*p))}" height="${N?18:22}" rx="4" style="fill:var(--self)"/>`;
    s+=T(C.x+14,C.y+(N?90:102),'about 75% women','t-sm','fill:var(--ink)')+T(C.x+14,C.y+(N?106:120),'a 3 : 1 ratio');
    if(!N)s+=T(C.x+14,C.y+C.h-24,'clinics see more women');
    /* the 20 people with BPD in the chosen sample */
    const cols=N?10:5,dx=N?28:36,dy=N?40:44,sz=N?26:30;
    s+=T(M.x,M.y-(N?30:34),'20 PEOPLE WITH BPD','t-sm','fill:var(--ink);font-weight:600')+T(M.x,M.y-(N?16:20),'in the selected sample');
    const shown=Math.round(lerp(10,W,p));
    for(let i=0;i<20;i++){const x=M.x+(i%cols)*dx+dx/2,y=M.y+Math.floor(i/cols)*dy;s+=P(x,y,sz,i<shown?'var(--self)':'var(--other)')}
    const ly=M.y+(20/cols)*dy+(N?6:4);
    s+=T(M.x,ly,`<tspan style="fill:var(--self);font-weight:600">${shown} women</tspan> · <tspan style="fill:var(--other);font-weight:600">${20-shown} men</tspan>`,'t-sm');
    if(!N){s+=`<path d="M${A.x+A.w+4} ${A.y+A.h+14}H${C.x-8}" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#whArr)"/>`+T((A.x+A.w+C.x)/2,A.y+A.h+30,'who reaches a clinic, and gets studied there','t-xs t-mid')}
    else s+=`<path d="M360 ${A.y+A.h+6}V${A.y+A.h+26}" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#whArr)"/>`;
    const msg=clin?['Clinical sample selected:','the doorway skews the count.']:['Community sample selected: the split','if men and women were equally numerous.'];
    if(N)s+=T(20,568,msg[0],'t-xs','fill:var(--ink)')+T(20,582,msg[1],'t-xs','fill:var(--ink)');else s+=T(20,392,msg.join(' '),'t-xs','fill:var(--ink)');
    return s}

  const TITLES=[['Who has BPD? In the community','1,000 US adults · NESARC Wave 2'],['Who has BPD? In the community','1,000 US adults · NESARC, stricter rules'],['Who has BPD? In clinics','100 people in each setting'],['Who has BPD? By age','prevalence and how it shows'],['Who has BPD? By sex','community and clinical samples']];
  function draw(t){const N=vb(svg,'720 400','400 600');const ph=phaseOf(WH_STEPS,t);setSt(ph);
    let s=DEF.replace('</defs>',marker('whArr','var(--muted)')+'</defs>');
    s+=T(N?20:22,28,TITLES[ph][0],'t-big')+T(N?20:22,46,TITLES[ph][1],'t-sm');
    s+=ph<2?sceneA(t,N):ph===2?sceneB(t,N):ph===3?sceneC(t,N):sceneD(t,N);
    svg.innerHTML=s;
    const st=WH_STEPS[ph];
    $('#whNote').innerHTML=noteHTML(ph===4?Object.assign({},st,{txt:st.txt+(mode==='clin'?' <b>Clinical sample shown:</b> about 15 of every 20 people diagnosed are women.':' <b>Community sample shown:</b> 3.0% of women and 2.4% of men means about 11 women to 9 men among 20 people with BPD, if men and women are equally numerous (derived from the published rates).')}):st);
    const R=[`NESARC Wave 2 · <b>5.9%</b> lifetime`,`NESARC stricter rules · <b>2.7%</b> lifetime`,`community <b>≈1%</b> · primary care <b>6.4%</b> · outpatients <b>10–12%</b> · inpatients <b>20–22%</b>`,`11-year-olds <b>3.2%</b> · adolescents <b>≈3%</b> · adults under 30 <b>4.3%</b>`,mode==='clin'?`clinical samples · <b>≈75%</b> women`:`community · women <b>3.0%</b>, men <b>2.4%</b>`];
    $('#whRead').innerHTML=`<span>${R[ph]}</span>`}
  const stop=playWire(rg,$('#whPlay'),draw,24000,'%t:player.replay%','what');
  setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $$('[data-whs]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.whs;$$('[data-whs]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(+rg.value<.8){stop();rg.value=.95}draw(+rg.value)}));
  draw(+rg.value);

  /* ---- words matter: flip cards ---- */
  const wb=$('#whWords');
  wb.innerHTML=WH_WORDS.map((w,i)=>`<button class="whflip" aria-pressed="false" data-whw="${i}" aria-label="Phrase to avoid: ${w.f}. Press to turn the card over."><span class="in"><span class="fa fr"><small>You might hear · ${w.c}</small><q>${w.f}</q><small>Turn over →</small></span><span class="fa bk"><small>Try instead</small><b class="say">${w.s}</b><p>${w.w}</p></span></span></button>`).join('');
  wb.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('[data-whw]');if(!b)return;const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);
    b.setAttribute('aria-label',on?`Try instead: ${WH_WORDS[+b.dataset.whw].s}. Press to turn back.`:`Phrase to avoid: ${WH_WORDS[+b.dataset.whw].f}. Press to turn the card over.`)});
};
