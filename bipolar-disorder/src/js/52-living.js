/* =============== 5.2 Living well: sleep, routine & mood charting =============== */
inits.living=()=>{
  const svg=$('#lwSvg'),rg=$('#lwT'),noteEl=$('#lwNote'),read=$('#lwRead');
  const ND=56,DU=d=>d/(ND-1);
  /* piecewise-linear through [day,value] knots */
  const pl=(k,d)=>{if(d<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(d<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(d-a[0])/(b[0]-a[0])}return k[k.length-1][1]};
  /* one illustrative person: knots in rating units (-3..+3) and hours */
  const fM=moodSeries([[0,0],[6,.25],[11,-.25],[16,.1],[20,0],[24,.4],[27,.9],[30,1.5],[33,1.95],[35,1.5],[38,.8],[41,.3],[46,.1],[50,-.1],[55,.05]].map(([d,v])=>[DU(d),v/3]));
  const fG=moodSeries([[33,1.95],[36,2.5],[40,2.9],[45,3],[55,2.9]].map(([d,v])=>[DU(d),v/3]));
  const SK=[[0,7.5],[19,7.4],[21,5.9],[23,5.5],[25,5.8],[27,5.1],[30,4.7],[33,4.2],[34,5.4],[36,6.8],[38,7.4],[55,7.6]];
  const GK=[[33,4.2],[36,3.4],[40,3],[46,3.2],[55,3.3]];
  const r=rng(5202),DAY=[];
  for(let d=0;d<ND;d++){const n1=(r()-.5)*.8,n2=(r()-.5)*.9,calm=d>21&&d<40;
    DAY.push({m:clamp(Math.round(fM(DU(d))*3+n1*(calm?.3:1)),-3,3),s:Math.round(clamp(pl(SK,d)+n2*(calm?.4:1),2,10)*2)/2,
      gm:clamp(Math.round(fG(DU(d))*3),-3,3),gs:Math.round(pl(GK,d)*2)/2})}
  const EVENTS=[{d:20,t:'work deadline: late nights'},{d:44,t:'family birthday'}];
  const SIGNS=[{d:23,t:'short nights'},{d:26,t:'more plans than usual'},{d:28,t:'talking faster (partner noticed)'},{d:31,t:'spending more'}];
  const PLAN=[['call my agreed','contact'],['protect sleep:','usual bedtime'],['cut back plans','and spending'],['care team reviews','treatment']],PD=33;
  const short=(d,ghost)=>{let n=0;for(let i=Math.max(0,d-6);i<=d;i++)if((ghost&&i>=PD?DAY[i].gs:DAY[i].s)<6)n++;return n};
  const STEPS=[
   {from:0,at:DU(10),k:'Weeks 1–3',t:'A steady baseline',
    txt:`Each day gets one mood rating and one sleep figure. The NIMH prospective Life Chart Method rates mood every day by how much it impairs functioning; in 270 people its ratings correlated with clinicians' depression (r = −0.785) and mania (r = 0.656) scales. Small ups and downs inside the steady band are normal. Knowing your own baseline is what makes a change visible. [[Denicoff2000]]`,
    pt:`A mood chart is a short daily note: how was my mood, how long did I sleep. Over weeks it shows what "normal for me" looks like.`,
    hook:`NIMH-LCM-p: daily, prospective, and rated by how much mood impairs functioning. [[Denicoff2000]]`},
   {from:DU(19.5),at:DU(22),k:'Weeks 3–4',t:'A trigger: late nights',
    txt:`<span class="ev hyp">Hypothesis</span> A work deadline brings late nights. Sleep loss can trigger a switch into mania, and mania in turn cuts sleep: a proposed self-reinforcing loop, with sleep reduction as a "final common pathway", supported by sleep-deprivation experiments. Even between episodes, people with bipolar disorder show more variable sleep-wake patterns than controls, one reason regular routines matter. [[Wehr1987,Ng2015Sleep]]`,
    pt:`A few short nights in a row is worth noticing, even if you feel fine, or better than fine.`,
    hook:`Sleep loss and mania feed each other (Wehr 1987). [[Wehr1987]]`},
   {from:DU(23),at:DU(29),k:'Weeks 4–5',t:'Early warning signs',
    txt:`Sleep keeps shortening and this person's own warning signs appear one by one (the numbered triangles): more plans than usual, talking faster, spending more. In a review of 17 studies, at least 80% of people with a mood disorder could identify one or more early signs, and sleep disturbance was the most robust early sign of mania (median 77%). Manic run-ups lasted more than 20 days on average, with a wide range (1–120 days), so there is often time to act. [[Jackson2003]]`,
    pt:`Many people have a pattern of early signs that comes back each time. Writing yours down while you are well helps you and others spot it.`,
    hook:`Most robust early sign of mania: sleep disturbance (median 77%). [[Jackson2003]]`},
   {from:DU(32.5),at:DU(35),k:'Week 5',t:'The action plan',
    txt:`Short nights plus two of the listed signs are what this person wrote down as "time to act", so on day 34 they use the plan. NICE CG185 says such a plan covers triggers and early warning signs, the person's own coping strategies, how services will respond, and who to contact in a crisis. Training people to spot early symptoms and get prompt treatment lengthened the time to a first manic relapse (65 vs 17 weeks at the 25th centile) and cut manic relapses by a median 30%. Using coping strategies at the early-sign stage went with fewer relapses. [[NICE2014CG185,Perry1999BMJ,Lam2001Prodromes]]`,
    pt:`A plan made while you are well works like a fire drill: when the signs come, you already know who to call and what to do.`,
    hook:`Early-warning-sign training (Perry 1999): fewer manic relapses, but no effect on depressive relapse. [[Perry1999BMJ]]`},
   {from:DU(37),at:DU(47),k:'Weeks 6–7',t:'Back to steady',
    txt:`<span class="ev early">Early evidence</span> Sleep returns to its usual length and mood settles back into the steady band over about a week. The dashed lines are a schematic of the course the plan is meant to head off. Regular daily routines are the added ingredient of interpersonal and social rhythm therapy (IPSRT): people who made their daily rhythms more regular were less likely to have a recurrence. A busy family birthday in week 7 passes without trouble: not every event is a trigger. [[Frank2005IPSRT]]`,
    pt:`Regular times to wake, eat and go to bed can help keep moods steadier.`,
    hook:`IPSRT = interpersonal psychotherapy + regular social rhythms. [[Frank2005IPSRT]]`},
   {from:DU(50),at:1,k:'Week 8',t:'What the chart is for',
    txt:`The low side is harder to catch. A quarter of people had difficulty detecting depressive early signs, depressive run-ups were shorter (under 19 days on average), and early-sign training did not reduce depressive relapse. A chart also does not work on its own: in the MONARCA I trial, daily smartphone self-monitoring with feedback did not reduce symptoms. It earns its place when it is shared with the care team and acted on. Try your own chart below. [[Lam2001Prodromes,Jackson2003,Perry1999BMJ,FaurholtJepsen2015]]`,
    pt:`Low moods are harder to notice from the inside. Agree with someone you trust that they will tell you what they see.`,
    hook:`Self-monitoring is part of NICE relapse-prevention therapy, but monitoring alone (MONARCA I) did not reduce symptoms. [[NICE2014CG185,FaurholtJepsen2015]]`}
  ];
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 590');
    const L=N?{x0:40,x1:386,ev:36,m0:62,m1:196,sg:212,s0:232,s1:326,ax:344,px:14,py:376,pw:372,ph:200}
             :{x0:58,x1:550,ev:34,m0:62,m1:200,sg:216,s0:236,s1:338,ax:356,px:570,py:22,pw:140,ph:352};
    const dd=t*(ND-1),di=Math.min(ND-1,Math.floor(dd+1e-6)),ph=phaseOf(STEPS,t);
    const cw=(L.x1-L.x0)/ND,X=d=>L.x0+cw*(d+.5),Y=m=>L.m1-(m+3)/6*(L.m1-L.m0),SY=h=>L.s1-h/10*(L.s1-L.s0);
    let s=`<defs>${marker('lwAr','var(--muted)')}</defs>`;
    /* mood bands */
    [[1.5,3,'var(--up-soft)',1],[.5,1.5,'var(--up-soft)',.5],[-.5,.5,'var(--eu-soft)',1],[-1.5,-.5,'var(--down-soft)',.5],[-3,-1.5,'var(--down-soft)',1]].forEach(([a,b,c,o])=>{
      s+=`<rect x="${L.x0}" y="${f1(Y(b))}" width="${f1(L.x1-L.x0)}" height="${f1(Y(a)-Y(b))}" style="fill:${c};opacity:${o}"/>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" style="stroke:var(--eu);stroke-width:1.1;stroke-dasharray:2 4"/>`;
    [3,2,1,0,-1,-2,-3].forEach(m=>{s+=`<text x="${L.x0-6}" y="${f1(Y(m)+3.5)}" class="t-xs t-end">${m>0?'+'+m:m<0?'−'+(-m):'0'}</text>`});
    s+=`<text x="${L.x0}" y="${L.m0-6}" class="t-sm" style="fill:var(--ink)">MOOD</text><text x="${L.x0+40}" y="${L.m0-6}" class="t-xs">${N?'−3 low … +3 high':'daily rating, −3 low to +3 high'}</text>`;
    /* sleep panel */
    [0,5,10].forEach(h=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(SY(h))}" y2="${f1(SY(h))}" class="${h?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(SY(h)+3.5)}" class="t-xs t-end">${h}</text>`});
    s+=`<text x="${L.x0}" y="${L.s0-6}" class="t-sm" style="fill:var(--ink)">SLEEP</text><text x="${L.x0+44}" y="${L.s0-6}" class="t-xs">hours each night</text>`;
    /* weeks */
    for(let w=0;w<=8;w++){const x=L.x0+cw*w*7;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.m0}" y2="${L.s1}" class="grid" style="opacity:.6"/>`;
      if(w<8)s+=`<text x="${f1(x+cw*3.5)}" y="${L.ax}" class="t-xs t-mid">${N?'w'+(w+1):'week '+(w+1)}</text>`}
    /* action-plan band */
    if(dd>=PD-.5){const xe=X(Math.min(dd,40))+cw/2;s+=`<rect x="${f1(X(PD)-cw/2)}" y="${L.m0}" width="${f1(Math.max(2,xe-X(PD)+cw/2))}" height="${L.s1-L.m0}" style="fill:var(--brand);opacity:.09"/>`;
      s+=`<text x="${f1(X(PD)-cw/2+3)}" y="${L.m0+11}" class="t-xs" style="fill:var(--brand);font-weight:700">action plan</text>`}
    /* the 6-hour line from the person's plan */
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(SY(6))}" y2="${f1(SY(6))}" style="stroke:var(--up);stroke-width:1.2;stroke-dasharray:5 3"/><text x="${L.x1}" y="${f1(SY(6)-4)}" class="t-xs t-end" style="fill:var(--up)">my plan: under 6 h</text>`;
    /* ghost course */
    const showG=ph>=4&&dd>PD;
    if(showG){let g='',gs='';for(let d=PD;d<=Math.min(di,ND-1);d++){g+=(g?'L':'M')+f1(X(d))+' '+f1(Y(DAY[d].gm));gs+=(gs?'L':'M')+f1(X(d))+' '+f1(SY(DAY[d].gs))}
      s+=`<path d="${g}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4;opacity:.8"/><path d="${gs}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4;opacity:.8"/>`;
      if(di>=42){s+=`<text x="${f1(X(41))}" y="${f1(Y(3)+12)}" class="t-xs t-end">signs missed (schematic)</text>`}}
    /* sleep bars */
    for(let d=0;d<=di;d++){const h=DAY[d].s,lo=h<6;s+=`<rect x="${f1(X(d)-cw*.36)}" y="${f1(SY(h))}" width="${f1(cw*.72)}" height="${f1(SY(0)-SY(h))}" rx="1.2" style="fill:${lo?'var(--up-fill)':'var(--night)'};opacity:${lo?.95:.8}"/>`}
    /* mood line and dots */
    let p='';for(let d=0;d<=di;d++)p+=(d?'L':'M')+f1(X(d))+' '+f1(Y(DAY[d].m));
    s+=`<path d="${p}" style="fill:none;stroke:var(--ink);stroke-width:1.4;opacity:.55;stroke-linejoin:round"/>`;
    for(let d=0;d<=di;d++){const m=DAY[d].m,c=m>0?'var(--up-fill)':m<0?'var(--down-fill)':'var(--eu)';s+=`<circle cx="${f1(X(d))}" cy="${f1(Y(m))}" r="${d===di?4.6:2.5}" style="fill:${c};stroke:var(--panel);stroke-width:${d===di?1.8:.8}"/>`}
    /* events */
    s+=`<text x="${L.x0}" y="${L.ev-12}" class="t-sm" style="fill:var(--ink)">LIFE</text>`;
    EVENTS.forEach(E=>{if(di<E.d)return;const x=X(E.d),w=E.t.length*5.5,end=x+8+w>L.x1;
      s+=`<path d="M${f1(x)} ${L.ev+12}V${L.ev-8}l7 3.5-7 3.5" style="fill:var(--accent);stroke:var(--accent);stroke-width:1.2"/><text x="${f1(end?x-4:x+10)}" y="${L.ev}" class="t-xs${end?' t-end':''}" style="fill:var(--accent)">${E.t}</text>`});
    /* warning signs (numbered) */
    SIGNS.forEach((g,i)=>{if(di<g.d)return;const x=X(g.d);s+=`<path d="M${f1(x)} ${L.sg-6}l6 10h-12z" style="fill:var(--up-fill);stroke:var(--up);stroke-width:1"/><text x="${f1(x)}" y="${L.sg+3}" class="t-mid" style="font:700 7px var(--mono);fill:var(--ink)">${i+1}</text>`});
    /* cursor */
    s+=`<line x1="${f1(X(dd))}" x2="${f1(X(dd))}" y1="${L.m0}" y2="${L.s1+4}" style="stroke:var(--ink);stroke-width:1.2;opacity:.5"/>`;
    /* panel: this week */
    const sn=short(di),seen=SIGNS.filter(g=>g.d<=di),mood=DAY[di].m;
    let st,col;
    if(di<20){st='Steady';col='var(--eu)'}else if(di<23){st='A trigger';col='var(--accent)'}
    else if(di<PD){st=seen.length>=2&&sn>=3?'Use the plan':'Watch closely';col='var(--up)'}
    else if(di<=40){st='Plan in use';col='var(--brand)'}else{st='Steady again';col='var(--eu)'}
    const P={x:L.px,y:L.py};let q=`<rect x="${P.x}" y="${P.y}" width="${L.pw}" height="${L.ph}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const cx=P.x+12;let yy=P.y+22;
    q+=`<text x="${cx}" y="${yy}" class="t-sm">THIS WEEK</text>`;yy+=22;
    q+=`<text x="${cx}" y="${yy}" class="t-big" style="fill:${col}">${st}</text>`;yy+=22;
    q+=`<text x="${cx}" y="${yy}" class="t-xs">short nights (last 7)</text>`;yy+=12;
    for(let i=0;i<7;i++){const d=di-6+i,on=d>=0&&DAY[d].s<6;q+=`<rect x="${cx+i*15}" y="${yy}" width="11" height="11" rx="2.5" style="fill:${d<0?'var(--panel)':on?'var(--up-fill)':'var(--night)'};opacity:${on?1:.55}"/>`}
    q+=`<text x="${cx+112}" y="${yy+9.5}" class="t-lbl">${sn}/7</text>`;yy+=28;
    q+=`<text x="${cx}" y="${yy}" class="t-xs">mood today</text><text x="${cx+L.pw-24}" y="${yy}" class="t-lbl t-end">${mood>0?'+'+mood:mood<0?'−'+(-mood):'0'}</text>`;yy+=20;
    /* narrow: signs and plan side by side */
    const c2=N?P.x+L.pw/2+6:cx,top2=yy;
    q+=`<text x="${cx}" y="${yy}" class="t-xs">my warning signs</text>`;yy+=15;
    SIGNS.forEach((g,i)=>{const on=g.d<=di;q+=`<text x="${cx}" y="${yy}" style="font:${on?700:500} 10px var(--body);fill:${on?'var(--ink)':'var(--muted)'};opacity:${on?1:.55}">${i+1}. ${N&&g.t.length>20?g.t.split(' (')[0]:g.t.replace(' (partner noticed)','')}</text>`;yy+=14});
    let y2=N?top2:yy+10;
    q+=`<text x="${c2}" y="${y2}" class="t-xs">action plan</text>`;y2+=15;
    PLAN.forEach((it,i)=>{const on=dd>=PD+i*.8;q+=`<rect x="${c2}" y="${y2-9}" width="10" height="10" rx="2" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1"/>`;
      if(on)q+=`<path d="M${c2+2} ${y2-4}l2.5 2.5 4-5" style="fill:none;stroke:var(--on-brand);stroke-width:1.5"/>`;
      const fs=`font:${on?700:500} 10px var(--body);fill:${on?'var(--ink)':'var(--muted)'}`;
      q+=`<text x="${c2+15}" y="${y2}" style="${fs}">${N?it.join(' '):it[0]}</text>`;
      if(!N){y2+=13;q+=`<text x="${c2+15}" y="${y2}" style="${fs}">${it[1]}</text>`}
      y2+=15});
    s+=q;
    svg.innerHTML=s;
    noteEl.innerHTML=noteHTML(STEPS[ph]);setSt(ph);
    read.innerHTML=`<span>day <b>${di+1}</b> · week <b>${Math.floor(di/7)+1}</b></span><span>mood <b>${mood>0?'+'+mood:mood<0?'−'+(-mood):'0'}</b></span><span>sleep <b>${DAY[di].s} h</b></span><span>short nights this week <b>${sn}/7</b></span>`;
  }
  const stop=playWire(rg,$('#lwPlay'),draw,22000,'Replay','living');
  setSt=stepWire($('#lwSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the reader's own chart ---------- */
  const mine=$('#lwMine'),cap=$('#lwMineCap'),msg=$('#lwMsg'),dateEl=$('#lwDate'),moodEl=$('#lwMood'),sleepEl=$('#lwSleep'),demoB=$('#lwDemo');
  const KEY='lwChart';
  let data=store.get(KEY,{});if(!data||typeof data!=='object'||Array.isArray(data))data={};
  const pad=n=>String(n).padStart(2,'0');
  const isoL=dt=>`${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;
  const parse=s=>{const a=String(s).split('-').map(Number);return new Date(a[0],a[1]-1,a[2])};
  const addD=(dt,n)=>{const x=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate()+n);return x};
  const today=new Date();dateEl.value=isoL(today);dateEl.max=isoL(today);
  const say=(t,ok)=>{msg.textContent=t;msg.classList.toggle('ok',!!ok)};
  let demo=false;
  function demoData(){const o={},rr=rng(77),M=[0,0,1,0,0,-1,0,0,1,1,2,1,1,0],S=[7.5,7,7.5,8,7,7.5,7,6.5,6,5.5,5,6,6.5,7];
    for(let i=0;i<14;i++){o[isoL(addD(today,i-13))]={m:M[i],s:Math.max(3,S[i]+(rr()<.3?.5:0))}}return o}
  function fill(){const e=data[dateEl.value];if(e){moodEl.value=String(e.m);sleepEl.value=e.s}}
  function drawMine(){
    const N=vb(mine,'720 300','400 380'),D=demo?demoData():data;
    const L=N?{x0:40,x1:386,m0:30,m1:170,s0:204,s1:300,ax:322}:{x0:58,x1:704,m0:26,m1:150,s0:178,s1:254,ax:274};
    const keys=Object.keys(D).filter(k=>/^\d{4}-\d\d-\d\d$/.test(k)).sort();
    let end=today;if(keys.length){const last=parse(keys[keys.length-1]);if(last>end)end=last}
    const n=28,start=addD(end,-(n-1)),cw=(L.x1-L.x0)/n,X=i=>L.x0+cw*(i+.5),Y=m=>L.m1-(m+3)/6*(L.m1-L.m0),SY=h=>L.s1-Math.min(h,12)/12*(L.s1-L.s0);
    let s='';
    [[1.5,3,'var(--up-soft)',1],[.5,1.5,'var(--up-soft)',.5],[-.5,.5,'var(--eu-soft)',1],[-1.5,-.5,'var(--down-soft)',.5],[-3,-1.5,'var(--down-soft)',1]].forEach(([a,b,c,o])=>{
      s+=`<rect x="${L.x0}" y="${f1(Y(b))}" width="${f1(L.x1-L.x0)}" height="${f1(Y(a)-Y(b))}" style="fill:${c};opacity:${o}"/>`});
    [3,0,-3].forEach(m=>{s+=`<text x="${L.x0-6}" y="${f1(Y(m)+3.5)}" class="t-xs t-end">${m>0?'+3':m<0?'−3':'0'}</text>`});
    s+=`<text x="${L.x0}" y="${L.m0-8}" class="t-xs">mood</text>`;
    [0,6,12].forEach(h=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(SY(h))}" y2="${f1(SY(h))}" class="${h?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(SY(h)+3.5)}" class="t-xs t-end">${h}</text>`});
    s+=`<text x="${L.x0}" y="${L.s0-8}" class="t-xs">sleep, hours</text>`;
    const pts=[];
    for(let i=0;i<n;i++){const dt=addD(start,i),k=isoL(dt),e=D[k];
      if(i%7===0||i===n-1)s+=`<text x="${f1(X(i))}" y="${L.ax}" class="t-xs t-mid">${dt.getDate()}/${dt.getMonth()+1}</text>`;
      if(isoL(dt)===isoL(today))s+=`<line x1="${f1(X(i))}" x2="${f1(X(i))}" y1="${L.m0}" y2="${L.s1}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:3 3"/>`;
      if(!e)continue;const h=+e.s,m=+e.m;
      if(isFinite(h))s+=`<rect x="${f1(X(i)-cw*.36)}" y="${f1(SY(h))}" width="${f1(cw*.72)}" height="${f1(SY(0)-SY(h))}" rx="1.2" style="fill:var(--night);opacity:.8"/>`;
      if(isFinite(m))pts.push([i,m])}
    let p='';pts.forEach(([i,m],j)=>{p+=(j&&pts[j-1][0]===i-1?'L':'M')+f1(X(i))+' '+f1(Y(m))});
    if(p)s+=`<path d="${p}" style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:.6"/>`;
    pts.forEach(([i,m])=>{s+=`<circle cx="${f1(X(i))}" cy="${f1(Y(m))}" r="3.6" style="fill:${m>0?'var(--up-fill)':m<0?'var(--down-fill)':'var(--eu)'};stroke:var(--panel);stroke-width:1.2"/>`});
    if(!pts.length)s+=`<text x="${f1((L.x0+L.x1)/2)}" y="${f1(Y(0)-10)}" class="t-lbl t-mid">No days saved yet</text><text x="${f1((L.x0+L.x1)/2)}" y="${f1(Y(0)+8)}" class="t-xs t-mid">${N?'Save today above, or show the example':'Save today above, or press “Show an example fortnight”'}</text>`;
    if(demo)s+=`<text x="${L.x1}" y="${L.m0-8}" class="t-xs t-end" style="fill:var(--accent)">EXAMPLE DATA, NOT YOURS</text>`;
    mine.innerHTML=s;
    const last7=keys.filter(k=>parse(k)<=end).slice(-7).map(k=>+D[k].s).filter(isFinite);
    cap.textContent=demo?'Showing a made-up fortnight. Press the button again to go back to your own chart.':
      keys.length?`${keys.length} day${keys.length>1?'s':''} saved in this browser. The last 28 days are shown${last7.length?`; average sleep over your last ${last7.length} saved night${last7.length>1?'s':''}: ${f1(last7.reduce((a,b)=>a+b,0)/last7.length)} h`:''}.`
      :'Nothing saved yet. Entries stay on this device only.';
  }
  dateEl.addEventListener('change',()=>{fill();say('')});
  $('#lwSave').addEventListener('click',()=>{
    const k=dateEl.value,h=parseFloat(sleepEl.value),m=parseInt(moodEl.value,10);
    if(!/^\d{4}-\d\d-\d\d$/.test(k)){say('Pick a date first.');return}
    if(!isFinite(h)||h<0||h>24){say('Hours of sleep should be a number from 0 to 24.');return}
    data[k]={m:clamp(m,-3,3),s:Math.round(h*2)/2};store.set(KEY,data);
    if(demo){demo=false;demoB.setAttribute('aria-pressed','false')}
    say(`Saved ${k}.`,true);drawMine()});
  $('#lwDel').addEventListener('click',()=>{const k=dateEl.value;if(data[k]){delete data[k];store.set(KEY,data);say(`Removed ${k}.`,true)}else say('Nothing saved for that date.');drawMine()});
  demoB.addEventListener('click',()=>{demo=!demo;demoB.setAttribute('aria-pressed',String(demo));say(demo?'Showing example data.':'');drawMine()});
  $('#lwCsv').addEventListener('click',()=>{const keys=Object.keys(data).sort();if(!keys.length){say('Nothing saved yet to download.');return}
    const csv='date,mood (-3 to +3),sleep hours\n'+keys.map(k=>`${k},${data[k].m},${data[k].s}`).join('\n');
    try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='my-mood-chart.csv';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);say('Downloaded my-mood-chart.csv.',true)}catch(e){say('Download is not available in this browser.')}});
  let armed=0;const clr=$('#lwClear');
  clr.addEventListener('click',()=>{if(!armed){armed=setTimeout(()=>{armed=0;clr.textContent='Clear my chart'},4000);clr.textContent='Click again to clear all';return}
    clearTimeout(armed);armed=0;clr.textContent='Clear my chart';data={};store.set(KEY,data);say('Your chart was cleared.',true);drawMine()});
  fill();drawMine();
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawMine()};
};
