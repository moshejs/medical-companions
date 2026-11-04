/* =============== 2.1 Screening: AUDIT, AUDIT-C & brief intervention =============== */
/* WHO AUDIT zones as published (Babor & Robaina 2016) */
const SC_ZONES=[
 {n:'Zone I',lo:0,hi:7,what:'abstinence or lower-risk drinking',sw:'lower risk',sa:'Feedback',act:'Feedback',col:'var(--good)',soft:'var(--good-soft)'},
 {n:'Zone II',lo:8,hi:15,what:'hazardous use',sw:'hazardous use',sa:'Brief intervention',act:'Brief intervention',col:'var(--warn)',soft:'var(--warn-soft)'},
 {n:'Zone III',lo:16,hi:19,what:'harmful use',sw:'harmful use',sa:'BI, monitoring, diagnostic evaluation',act:'Brief intervention, monitoring, diagnostic evaluation',col:'var(--accent)',soft:'var(--accent-soft)'},
 {n:'Zone IV',lo:20,hi:40,what:'possible dependence',sw:'possible dependence',sa:'Referral to specialist treatment',act:'Referral to specialist treatment',col:'var(--bad)',soft:'var(--bad-soft)'}];
const scZone=v=>v>=20?3:v>=16?2:v>=8?1:0;
/* the illustrative person's item scores (made up for teaching; items 9 and 10 score 0, 2 or 4) */
const SC_DEMO=[3,2,2,1,2,0,2,1,2,2];
const SC_STEPS=[
 {from:0,at:.08,k:'Step 1 · Ask everyone',t:'Ask everyone',
  txt:`The USPSTF recommends screening adults 18 and over in primary care, including pregnant women, for unhealthy alcohol use: a spectrum from risky drinking to alcohol use disorder. Asking is not yet routine enough: in 2017 survey data from 13 US states and DC, 81.4% of adults had been asked about alcohol at a checkup, but only 37.8% about binge-level drinking, and only 20.1% of current binge drinkers were advised to cut down or quit. [[USPSTF2018Alcohol,McKnightEily2020MMWR]]`,
  pt:`Doctors and nurses ask everyone about alcohol because problems are common and easy to miss. Being asked is routine, not an accusation.`,
  hook:`USPSTF 2018: screen adults 18+ (including pregnancy) and give brief counselling = grade B; adolescents 12–17 = I statement.`},
 {from:.2,at:.34,k:'Step 2 · Pre-screen',t:'Single question or AUDIT-C',
  txt:`A quick first screen sorts people. The NIAAA single question asks how many times in the past year a person had 5 (men) or 4 (women) or more drinks in a day; 1 or more is positive (sensitivity 81.8%, specificity 79.3% for unhealthy use). The AUDIT-C is the first three AUDIT items, 0–12, positive at ≥4 in men and ≥3 in women. Our illustrative person scores 7 and goes on; another person screens negative and gets feedback. [[Smith2009JGIM,Bradley2007AUDITC]]`,
  pt:`One or three short questions decide whether a longer conversation is worth having.`,
  hook:`AUDIT-C maximum is 12. Positive: ≥4 men (0.86 / 0.89), ≥3 women (0.73 / 0.91) in primary care.`},
 {from:.4,at:.56,k:'Step 3 · Full AUDIT',t:'The 10-item AUDIT and its zones',
  txt:`The AUDIT came from a six-country WHO project. Its 10 items cover consumption (1–3), dependence symptoms (4–6) and harms (7–10), each scored 0–4, for a total of 0–40. WHO zones: 0–7 Zone I, 8–15 Zone II, 16–19 Zone III, 20–40 Zone IV. Watch the needle cross the zones as the items add up: this person totals 17, Zone III. The zones themselves rest on little validation. [[Saunders1993AUDIT,HigginsBiddle2018USAUDIT,Babor2016AUDITZones]]`,
  pt:`The score is a guide to how much help to offer. It is not a diagnosis.`,
  hook:`AUDIT: 10 items, 0–40; ≥8 flags hazardous or harmful use. Zones 0–7 / 8–15 / 16–19 / 20–40.`},
 {from:.6,at:.72,k:'Step 4 · Brief intervention',t:'A short, structured conversation',
  txt:`For Zones II and III the WHO response is a brief intervention: usually feedback, information on the harms of drinking and the benefits of cutting down, advice, and a personal plan, in five or fewer sessions totalling under an hour. In 69 Cochrane trials, people drank on average about 20 g a week less after one year (95% CI −28 to −12) from a baseline of 244 g a week; the USPSTF review found −1.6 drinks a week and lower odds of exceeding limits (OR 0.60). [[Kaner2018Cochrane,OConnor2018JAMA,Babor2016AUDITZones]]`,
  pt:`A short talk with a health worker helps many people drink less, on average. It is a group result, not a promise for any one person.`,
  hook:`Brief intervention: about −20 g/week at 1 year (Cochrane) or −1.6 drinks/week (USPSTF review); ≤5 sessions, &lt;60 minutes in total.`},
 {from:.8,at:.96,k:'Step 5 · Referral to treatment',t:'Zone IV and the weakest link',
  txt:`A second illustrative person totals 23, Zone IV: possible dependence, so the published response is referral for diagnostic evaluation and specialist treatment. A high score or any dependence symptom means an assessment is needed, not that AUD is present. Referral is the weakest link of SBIRT: across 9 trials, brief interventions did not increase the use of specialty alcohol services (RR 1.08, 95% CI 0.92–1.28). [[Babor2016AUDITZones,HigginsBiddle2018USAUDIT,Babor2007SBIRT,Glass2015Referral]]`,
  pt:`A high score means "let's look more closely together". Getting from a referral to actual care is where many people are lost.`,
  hook:`SBIRT = Screening, Brief Intervention, Referral to Treatment. Brief intervention does not reliably raise specialty-care uptake.`}];
/* AUDIT items: stems shortened, answer options and points as published (Saunders 1993) */
const SC_FREQ=['Never','Less than monthly','Monthly','Weekly','Daily or almost daily'];
const SC_YN=[['No',0],['Yes, but not in the last year',2],['Yes, during the last year',4]];
const SC_ITEMS=[
 {d:'Consumption',q:'How often do you have a drink containing alcohol?',o:['Never','Monthly or less','2–4 times a month','2–3 times a week','4 or more times a week']},
 {q:'How many drinks containing alcohol on a typical day when drinking?',o:['1 or 2','3 or 4','5 or 6','7 to 9','10 or more']},
 {q:'How often six or more drinks on one occasion?',o:SC_FREQ},
 {d:'Dependence symptoms',q:'In the last year, how often unable to stop drinking once started?',o:SC_FREQ},
 {q:'In the last year, how often failed to do what was normally expected because of drinking?',o:SC_FREQ},
 {q:'In the last year, how often needed a first drink in the morning to get going after heavy drinking?',o:SC_FREQ},
 {d:'Harms',q:'In the last year, how often a feeling of guilt or remorse after drinking?',o:SC_FREQ},
 {q:'In the last year, how often unable to remember the night before because of drinking?',o:SC_FREQ},
 {q:'Have you or someone else been injured because of your drinking?',yn:true},
 {q:'Has a relative, friend, doctor or other health worker been concerned about your drinking or suggested cutting down?',yn:true}];
/* screening tools: sensitivity / specificity as published, each against its own reference standard */
const SC_TOOLS=[
 {id:'acm',n:'AUDIT-C ≥4 (men)',se:.86,sp:.89,tgt:'alcohol misuse, primary care',c:'[[Bradley2007AUDITC]]'},
 {id:'acw',n:'AUDIT-C ≥3 (women)',se:.73,sp:.91,tgt:'alcohol misuse, primary care',c:'[[Bradley2007AUDITC]]'},
 {id:'sq',n:'Single question',se:.818,sp:.793,tgt:'unhealthy alcohol use, primary care',c:'[[Smith2009JGIM]]'},
 {id:'sqa',n:'Single question for AUD',se:.879,sp:.668,tgt:'current alcohol use disorder, primary care',c:'[[Smith2009JGIM]]'},
 {id:'cage',n:'CAGE ≥2',se:.71,sp:.90,tgt:'abuse or dependence, medical, surgical and psychiatric settings',c:'[[Dhalla2007CAGE]]'},
 {id:'crafft',n:'CRAFFT ≥2 (age 14–18)',se:.76,sp:.94,tgt:'any alcohol or drug problem, adolescent clinic',c:'[[Knight2002CRAFFT]]'},
 {id:'preg',n:'AUDIT-C ≥3 (pregnancy)',se:.96,sp:.71,tgt:'alcohol use disorder in pregnancy',c:'[[Burns2010Pregnancy]]'}];

inits.screening=()=>{
  const svg=$('#scSvg'),rg=$('#scT'),note=$('#scNote');
  const box=(x,y,w,h,t1,t2,on,col)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?(col||'var(--dx)'):'var(--line)'};stroke-width:${on?2:1.2}"/><text x="${f1(x+w/2)}" y="${f1(y+h/2-3)}" class="t-lbl t-mid">${t1}</text><text x="${f1(x+w/2)}" y="${f1(y+h/2+12)}" class="t-xs t-mid">${t2}</text>`;
  const arrow=(x0,y0,x1,y1,lab,on,ly)=>`<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" class="arrow" style="${on?'stroke:var(--dx);stroke-width:2.2':''}" marker-end="url(#scA)"/>${lab?`<text x="${f1((x0+x1)/2)}" y="${f1(ly==null?(y0+y1)/2-5:ly)}" class="t-xs t-mid" style="${on?'fill:var(--dx)':''}">${lab}</text>`:''}`;
  const token=(x,y,col,lab)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="16" style="fill:var(--panel);stroke:${col};stroke-width:2.2"/>${person(x,y-11,22,col)}${lab?`<text x="${f1(x)}" y="${f1(y-21)}" class="t-xs t-mid" style="fill:${col};font-weight:600">${lab}</text>`:''}`;
  const along=(P,u)=>{/* position along a polyline of waypoints, u in 0..1 */
    const L=[];let tot=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);L.push(d);tot+=d}
    let s=clamp(u)*tot;for(let i=0;i<L.length;i++){if(s<=L[i]||i===L.length-1){const k=L[i]?clamp(s/L[i]):0;return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]}s-=L[i]}return P[P.length-1]};
  function layout(N){
    if(N)return {A:[14,10,372,40],B:[14,66,226,46],Neg:[258,66,128,46],C:[14,128,226,46],Z:[0,1,2,3].map(i=>[14,190+i*40,372,34]),P:[14,358,372,194],nar:true};
    return {A:[10,54,108,56],B:[134,54,136,56],Neg:[134,140,136,50],C:[318,54,104,56],Z:[0,1,2,3].map(i=>[444,14+i*47,264,40]),P:[14,214,692,156],nar:false}}
  const ctr=r=>[r[0]+r[2]/2,r[1]+r[3]/2];
  /* where a token waits at a node: above it on wide stages, at its left end on phones; at a zone's right end */
  const way=(r,N)=>N?[r[0]+22,r[1]+r[3]/2]:[r[0]+r[2]/2,r[1]-18],wayZ=(r,N)=>N?[r[0]+24,r[1]+r[3]/2]:[r[0]+r[2]-22,r[1]+r[3]/2];
  /* the lower panel, one view per step */
  function panel(L,p,t){const [x,y,w,h]=L.P,N=L.nar;let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const title=tx=>`<text x="${x+14}" y="${y+20}" class="t-sm" style="fill:var(--dx);font-weight:600">${tx}</text>`;
    if(p===0){s+=title(N?'THE SCREENING GAP · US, 2017':'THE SCREENING GAP · 13 US STATES AND DC, 2017');
      const rows=[['Asked about alcohol at a checkup (past 2 years)',81.4],['Asked about binge-level drinking',37.8],['Binge drinkers advised to cut down or quit',20.1]],g=ramp(t,0,.06);
      rows.forEach(([lab,v],i)=>{const ry=y+(N?44:42)+i*(N?50:36),bx=x+14,bw=w-(N?84:300),lx=N?bx:x+w-276;
        if(N)s+=`<text x="${bx}" y="${ry}" class="t-xs">${lab}</text>`;else s+=`<text x="${x+w-14}" y="${ry+11}" class="t-xs t-end">${lab}</text>`;
        const by=N?ry+6:ry;s+=`<rect x="${bx}" y="${by}" width="${f1(bw)}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*v/100*g)}" height="14" rx="7" style="fill:var(--dx);opacity:${i?.6:.9}"/><text x="${f1(bx+bw+8)}" y="${by+11.5}" class="t-lbl">${f1(v*g)}%</text>`});
      s+=`<text x="${x+14}" y="${y+h-10}" class="t-xs">${N?'Age-standardised survey estimates.':'Age-standardised survey estimates; BRFSS 2017.'}</text>`}
    else if(p===1){s+=title('PRE-SCREEN');
      const hx=N?x+14:x+14,hy=y+40,cw=N?w-28:w/2-28;
      s+=`<text x="${hx}" y="${hy}" class="t-lbl">Single question (NIAAA)</text>`;
      const q=N?['“How many times in the past year have you had','5 (men) / 4 (women) or more drinks in a day?”']:['“How many times in the past year have you had','5 (men) / 4 (women) or more drinks in a day?”'];
      q.forEach((l,i)=>s+=`<text x="${hx}" y="${hy+17+i*13}" class="t-xs">${l}</text>`);
      s+=`<text x="${hx}" y="${hy+52}" class="t-xs" style="fill:var(--dx);font-weight:600">1 or more = positive · sens 81.8% · spec 79.3%</text>`;
      const ax=N?x+14:x+w/2+10,ay=N?y+110:y+40,aw=N?w-28:w/2-34,v=7*ramp(t,.22,.32),X=k=>ax+aw*k/12;
      s+=`<text x="${ax}" y="${ay}" class="t-lbl">AUDIT-C (items 1–3), 0–12</text>`;
      for(let k=0;k<12;k++)s+=`<rect x="${f1(X(k)+1)}" y="${ay+14}" width="${f1(aw/12-2)}" height="16" rx="3" style="fill:${k<v?'var(--dx)':'var(--panel-2)'};opacity:${k<v?.85:1}"/>`;
      for(let k=0;k<=12;k+=3)s+=`<text x="${f1(X(k))}" y="${ay+44}" class="t-xs t-mid">${k}</text>`;
      [[3,'women ≥3'],[4,'men ≥4']].forEach(([c,l],i)=>s+=`<line x1="${f1(X(c))}" x2="${f1(X(c))}" y1="${ay+10}" y2="${ay+34}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:3 2"/><text x="${f1(X(c)+(i?4:-4))}" y="${ay+58}" class="t-xs ${i?'':'t-end'}" style="fill:var(--ink)">${l}</text>`);
      s+=`<text x="${ax}" y="${ay+76}" class="t-xs" style="fill:var(--dx);font-weight:600">This person: ${Math.round(v)} / 12${v>=6.9?' → positive, go on to the full AUDIT':''}</text>`}
    else if(p===2){s+=title('FULL AUDIT · ITEM BY ITEM');
      const k=ramp(t,.42,.56)*10,tot=SC_DEMO.reduce((a,b,i)=>a+(i<Math.floor(k)?b:0),0)+(Math.floor(k)<10?SC_DEMO[Math.floor(k)]*(k-Math.floor(k)):0);
      const bx=x+14,bw=N?(w-28)/10:300/10,by=y+38,bh=46;
      SC_DEMO.forEach((v,i)=>{const cx=bx+i*bw,fl=clamp(k-i),dom=i<3?'var(--dx)':i<6?'var(--accent)':'var(--warn)';
        s+=`<rect x="${f1(cx+2)}" y="${by}" width="${f1(bw-4)}" height="${bh}" rx="4" style="fill:var(--panel);stroke:var(--line)"/>`;
        if(fl>0)s+=`<rect x="${f1(cx+2)}" y="${f1(by+bh-bh*v/4*fl)}" width="${f1(bw-4)}" height="${f1(bh*v/4*fl)}" rx="4" style="fill:${dom};opacity:.75"/>`;
        s+=`<text x="${f1(cx+bw/2)}" y="${by+bh+13}" class="t-xs t-mid">${i+1}</text>`;
        if(fl>=1)s+=`<text x="${f1(cx+bw/2)}" y="${by-4}" class="t-xs t-mid" style="fill:var(--ink)">${v}</text>`});
      [[0,3,'consumption','var(--dx)'],[3,6,'dependence','var(--accent)'],[6,10,'harms','var(--warn)']].forEach(([a,b,l,c])=>s+=`<text x="${f1(bx+(a+b)/2*bw)}" y="${by+bh+27}" class="t-xs t-mid" style="fill:${c}">${l}</text>`);
      const zx=N?x+14:x+352,zy=N?y+132:y+52,zw=N?w-28:w-372,Z=v=>zx+zw*v/40;
      SC_ZONES.forEach((z,i)=>{s+=`<rect x="${f1(Z(z.lo))}" y="${zy}" width="${f1(Z(z.hi+(i<3?1:0))-Z(z.lo))}" height="18" style="fill:${z.col};opacity:${scZone(tot)===i?.85:.28}"/><text x="${f1((Z(z.lo)+Z(Math.min(z.hi+1,40)))/2)}" y="${zy+32}" class="t-xs t-mid" style="fill:${z.col}">${N&&i===0?'I':N?['I','II','III','IV'][i]:z.n}</text>`});
      [0,8,16,20,40].forEach(v=>s+=`<text x="${f1(Z(v))}" y="${zy-5}" class="t-xs t-mid">${v}</text>`);
      const nx=Z(tot);s+=`<path d="M${f1(nx)} ${zy+20}l-6 10h12Z" style="fill:var(--ink)"/>`;
      s+=`<text x="${zx}" y="${zy+(N?50:62)}" class="t-lbl">Total ${Math.round(tot)} / 40 · ${SC_ZONES[scZone(tot)].n}: ${SC_ZONES[scZone(tot)].what}</text>`}
    else if(p===3){s+=title('BRIEF INTERVENTION · WHAT IT USUALLY CONTAINS');
      const parts=['Feedback','Harms and benefits','Advice','A personal plan'],g=ramp(t,.6,.7);
      parts.forEach((pp,i)=>{const on=g*4>i,cx=N?x+14+(i%2)*((w-28)/2):x+14+i*140,cy=N?y+34+Math.floor(i/2)*30:y+34,cw=N?(w-28)/2-8:130;
        s+=`<rect x="${f1(cx)}" y="${cy}" width="${f1(cw)}" height="24" rx="12" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'}"/><text x="${f1(cx+cw/2)}" y="${cy+16}" class="t-xs t-mid" style="fill:${on?'var(--dx)':'var(--muted)'};font-weight:600">${pp}</text>`});
      const bx=N?x+14:x+14,by=N?y+108:y+84,bw=N?w-100:w-420,G=v=>bw*v/260,e=ramp(t,.62,.7);
      s+=`<text x="${bx}" y="${by-6}" class="t-xs">Grams of ethanol a week, trial averages (Cochrane, 1 year)</text>`;
      s+=`<rect x="${bx}" y="${by}" width="${f1(G(244))}" height="16" rx="4" style="fill:var(--muted);opacity:.45"/><text x="${f1(bx+G(244)+6)}" y="${by+12}" class="t-xs" style="fill:var(--ink)">244 g baseline</text>`;
      const after=244-20*e;s+=`<rect x="${bx}" y="${by+24}" width="${f1(G(after))}" height="16" rx="4" style="fill:var(--dx);opacity:.8"/><text x="${f1(bx+G(after)+6)}" y="${by+36}" class="t-xs" style="fill:var(--dx);font-weight:600">−${Math.round(20*e)} g</text>`;
      s+=`<line x1="${f1(bx+G(244-28))}" x2="${f1(bx+G(244-12))}" y1="${by+48}" y2="${by+48}" style="stroke:var(--dx);stroke-width:2"/><text x="${f1(bx+G(244-20))}" y="${by+60}" class="t-xs t-mid">95% CI −28 to −12</text>`;
      if(!N){const rx=x+w-300;[['−1.6 drinks / week','USPSTF review, 6–12 months'],['OR 0.60','exceeding recommended limits'],['OR 2.26','reported abstinence in pregnancy']].forEach(([a,b],i)=>{s+=`<text x="${rx}" y="${y+92+i*24}" class="t-lbl" style="fill:var(--dx);opacity:${f1(ramp(t,.68+i*.02,.74+i*.02))}">${a}</text><text x="${rx+128}" y="${y+92+i*24}" class="t-xs" style="opacity:${f1(ramp(t,.68+i*.02,.74+i*.02))}">${b}</text>`})}
      else s+=`<text x="${x+14}" y="${y+h-12}" class="t-xs" style="fill:var(--dx)">USPSTF review: −1.6 drinks/week; OR 0.60 over limits</text>`}
    else {s+=title(N?'REFERRAL · SPECIALTY CARE USE':'REFERRAL · DO BRIEF INTERVENTIONS INCREASE SPECIALTY CARE USE?');
      const fx=x+(N?24:60),fw=w-(N?48:120),fy=y+(N?78:70),R=v=>fx+fw*(Math.log(v)-Math.log(.5))/(Math.log(2)-Math.log(.5)),g=ramp(t,.84,.94);
      s+=`<line x1="${fx}" x2="${fx+fw}" y1="${fy+26}" y2="${fy+26}" class="axis"/>`;
      [.5,1,2].forEach(v=>s+=`<line x1="${f1(R(v))}" x2="${f1(R(v))}" y1="${fy+22}" y2="${fy+30}" class="axis"/><text x="${f1(R(v))}" y="${fy+42}" class="t-xs t-mid">${v}</text>`);
      s+=`<line x1="${f1(R(1))}" x2="${f1(R(1))}" y1="${fy-22}" y2="${fy+26}" style="stroke:var(--ink);stroke-dasharray:3 3"/>`;
      s+=`<text x="${f1(R(.5)+4)}" y="${fy-26}" class="t-xs">fewer referrals used</text><text x="${f1(R(2)-4)}" y="${fy-26}" class="t-xs t-end">more used</text>`;
      if(g>0){s+=`<line x1="${f1(R(1.08)+(R(.92)-R(1.08))*g)}" x2="${f1(R(1.08)+(R(1.28)-R(1.08))*g)}" y1="${fy}" y2="${fy}" style="stroke:var(--dx);stroke-width:2.4"/><rect x="${f1(R(1.08)-6)}" y="${fy-6}" width="12" height="12" style="fill:var(--dx)"/>`;
        s+=`<text x="${f1(R(1.08))}" y="${fy-12}" class="t-xs t-mid" style="fill:var(--dx);font-weight:600">RR 1.08 (0.92–1.28)</text>`}
      s+=`<text x="${x+14}" y="${y+h-(N?30:12)}" class="t-xs">${N?'9 RCTs: the interval crosses 1, so no':'9 RCTs pooled: the interval crosses 1, so no evidence that brief intervention increases specialty-care use.'}</text>`;
      if(N)s+=`<text x="${x+14}" y="${y+h-16}" class="t-xs">evidence of more specialty-care use.</text>`}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 560'),L=layout(N),p=phaseOf(SC_STEPS,t);setSt(p);note.innerHTML=noteHTML(SC_STEPS[p]);
    let s=`<defs>${marker('scA','var(--muted)')}</defs>`;
    const A=ctr(L.A),B=ctr(L.B),Ng=ctr(L.Neg),C=ctr(L.C),Zc=L.Z.map(ctr);
    /* score of the main token */
    const k=ramp(t,.42,.56)*10,tot=SC_DEMO.reduce((a,b,i)=>a+(i<Math.floor(k)?b:0),0);
    const zMain=t>=.56?2:-1,z2=t>=.88?3:-1;
    /* nodes and arrows */
    s+=box(...L.A,N?'Everyone 18+ in primary care':'Everyone 18+',N?'everyone is asked about alcohol':'all are asked',p===0);
    s+=box(...L.B,'Pre-screen',N?'single question or AUDIT-C':'single Q or AUDIT-C',p===1);
    s+=box(...L.Neg,'Negative','feedback, rescreen',t>=.28&&t<.4);
    s+=box(...L.C,'Full AUDIT','10 items, 0–40',p===2||(t>=.8&&t<.9));
    if(N){s+=arrow(A[0],L.A[1]+L.A[3],A[0],L.B[1]-2,'',p<=1);s+=arrow(L.B[0]+L.B[2],B[1],L.Neg[0]-2,Ng[1],'',t>=.28&&t<.4);
      s+=arrow(B[0]-60,L.B[1]+L.B[3],B[0]-60,L.C[1]-2,'',p===1||p===2);s+=`<text x="${f1(B[0]-54)}" y="${L.C[1]-5}" class="t-xs">positive</text>`;
      s+=arrow(C[0],L.C[1]+L.C[3],C[0],L.Z[0][1]-2,'',p>=2)}
    else{s+=arrow(L.A[0]+L.A[2],A[1],L.B[0]-2,B[1],'',p<=1);s+=arrow(B[0],L.B[1]+L.B[3],B[0],L.Neg[1]-2,'',t>=.28&&t<.4);s+=`<text x="${f1(B[0]-6)}" y="${L.B[1]+L.B[3]+20}" class="t-xs t-end">negative</text>`;
      s+=arrow(L.B[0]+L.B[2],B[1],L.C[0]-2,C[1],'positive',p===1||p===2,B[1]+16);
      Zc.forEach((z,i)=>s+=arrow(L.C[0]+L.C[2],C[1],L.Z[i][0]-2,z[1],'',(zMain===i&&t<.8)||z2===i))}
    /* zone boxes */
    SC_ZONES.forEach((z,i)=>{const [zx,zy,zw,zh]=L.Z[i],on=(zMain===i&&t<.8)||z2===i;
      s+=`<rect x="${zx}" y="${zy}" width="${zw}" height="${zh}" rx="8" style="fill:${on?z.soft:'var(--panel)'};stroke:${z.col};stroke-width:${on?2.2:1};opacity:${on?1:.85}"/>`;
      s+=`<rect x="${zx}" y="${zy}" width="6" height="${zh}" rx="3" style="fill:${z.col}"/>`;
      s+=`<text x="${zx+(N?48:14)}" y="${zy+(N?14:16)}" class="t-lbl" style="font-size:12px;fill:${z.col}">${z.n} · ${z.lo}–${z.hi} · ${z.sw}</text>`;
      s+=`<text x="${zx+(N?48:14)}" y="${zy+(N?28:31)}" class="t-xs" style="${on?'fill:var(--ink);font-weight:600':''}">${z.sa}</text>`});
    /* tokens: the main person, a person who screens negative, and a second person who scores in Zone IV */
    const wA=way(L.A,N),wB=way(L.B,N),wN=way(L.Neg,N),wC=way(L.C,N),z3=wayZ(L.Z[2],N),z4=wayZ(L.Z[3],N);let mp;
    if(t<.2)mp=wA;else if(t<.3)mp=along([wA,wB],ramp(t,.2,.3));else if(t<.38)mp=wB;else if(t<.42)mp=along([wB,wC],ramp(t,.38,.42));else if(t<.56)mp=wC;
    else mp=along([wC,z3],ramp(t,.56,.62));
    const lab=t<.3?'':t<.42?'AUDIT-C 7':t<.56?`AUDIT ${tot}`:'AUDIT 17';
    if(t>=.22&&t<.5){const np=t<.3?along([wA,wB],ramp(t,.22,.3)):(N?along([wB,wN],ramp(t,.28,.33)):along([wB,[L.B[0]+L.B[2]+24,wB[1]],[L.B[0]+L.B[2]+24,L.Neg[1]+L.Neg[3]/2]],ramp(t,.28,.33)));s+=token(np[0],np[1],'var(--muted)','')}
    if(t>=.8){const q=t<.86?along([wA,wB,wC],ramp(t,.8,.86)):along([wC,z4],ramp(t,.86,.9));s+=token(q[0],q[1],'var(--bad)',t>=.86&&!N?'AUDIT 23':'')}
    s+=token(mp[0],mp[1],'var(--dx)',N?'':lab);
    s+=panel(L,p,t);
    svg.innerHTML=s}
  const stop=playWire(rg,$('#scPlay'),draw,26000,'Replay','screening');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- AUDIT teaching calculator ---------- */
  const qb=$('#scQ'),cs=$('#scCalcSvg'),cn=$('#scCalcNote');let sex=store.get('sc:sex','m');
  qb.innerHTML=SC_ITEMS.map((it,i)=>{const opts=it.yn?SC_YN:it.o.map((o,j)=>[o,j]);
    return `${it.d?`<p class="scdom">${it.d} · items ${i+1}–${i===0?3:i===3?6:10}</p>`:''}<label for="scI${i}"><span>${i+1}. ${it.q}</span><select id="scI${i}" data-sci="${i}">${opts.map(([o,v])=>`<option value="${v}">${o} (${v})</option>`).join('')}</select></label>`}).join('');
  function calc(){const v=SC_ITEMS.map((_,i)=>+$('#scI'+i).value),tot=v.reduce((a,b)=>a+b,0),ac=v[0]+v[1]+v[2],z=scZone(tot),Z=SC_ZONES[z],cut=sex==='m'?4:3,pos=ac>=cut,dep=v[3]+v[4]+v[5]>0;
    const N=vb(cs,'720 150','400 150');const x0=N?16:30,x1=N?384:690,X=s=>lerp(x0,x1,s/40);let s='';
    s+=`<text x="${x0}" y="16" class="t-sm" style="fill:var(--dx);font-weight:600">AUDIT TOTAL ${tot} / 40</text>`;
    SC_ZONES.forEach((zz,i)=>{const a=X(zz.lo),b=X(i<3?zz.hi+1:40);s+=`<rect x="${f1(a)}" y="26" width="${f1(b-a)}" height="22" style="fill:${zz.col};opacity:${i===z?.85:.25}"/><text x="${f1((a+b)/2)}" y="62" class="t-xs t-mid" style="fill:${zz.col};font-weight:${i===z?700:500}">${N?['I','II','III','IV'][i]:zz.n}</text>`});
    [0,8,16,20,40].forEach(v=>s+=`<text x="${f1(X(v))}" y="${N?76:76}" class="t-xs t-mid">${v}</text>`);
    s+=`<path d="M${f1(X(tot))} 50l-6 9h12Z" style="fill:var(--ink)"/><line x1="${f1(X(tot))}" x2="${f1(X(tot))}" y1="22" y2="50" style="stroke:var(--ink);stroke-width:2"/>`;
    const ay=N?112:104,aw=N?(x1-x0):(x1-x0)*.5,A=s2=>x0+aw*s2/12;
    s+=`<text x="${x0}" y="${ay-8}" class="t-sm" style="fill:var(--dx);font-weight:600">AUDIT-C ${ac} / 12 · ${pos?'positive':'negative'} at ≥${cut}</text>`;
    for(let k=0;k<12;k++)s+=`<rect x="${f1(A(k)+1)}" y="${ay}" width="${f1(aw/12-2)}" height="14" rx="3" style="fill:${k<ac?'var(--dx)':'var(--panel-2)'}"/>`;
    s+=`<line x1="${f1(A(cut))}" x2="${f1(A(cut))}" y1="${ay-4}" y2="${ay+18}" style="stroke:var(--ink);stroke-width:1.8;stroke-dasharray:3 2"/><text x="${f1(A(cut))}" y="${ay+30}" class="t-xs t-mid" style="fill:var(--ink)">${sex==='m'?'men ≥4':'women ≥3'}</text>`;
    if(!N){const dx=x0+aw+30;[['Consumption (1–3)',ac,12],['Dependence (4–6)',v[3]+v[4]+v[5],12],['Harms (7–10)',v[6]+v[7]+v[8]+v[9],16]].forEach(([l,val,mx],i)=>{const yy=ay-8+i*18;s+=`<text x="${dx}" y="${yy+8}" class="t-xs">${l}</text><rect x="${dx+124}" y="${yy}" width="120" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${dx+124}" y="${yy}" width="${f1(120*val/mx)}" height="9" rx="4.5" style="fill:var(--dx);opacity:.75"/><text x="${dx+252}" y="${yy+8}" class="t-xs">${val}/${mx}</text>`})}
    cs.innerHTML=s;
    cn.innerHTML=`<div class="kicker">Teaching result · not a diagnosis</div><div class="scread"><span class="scbig">${tot}</span><b style="color:${Z.col}">${Z.n} (${Z.lo}–${Z.hi}): ${Z.what}</b></div>
      <p><b>Published zone response:</b> ${Z.act.toLowerCase()}. ${z>=2?'Validation of the zones is limited: in 625 primary care patients the Zone III and IV cut-offs were 100% specific but very insensitive (men 0.16 and 0.06). ':''}[[Babor2016AUDITZones]]</p>
      <p><b>AUDIT-C ${ac}/12</b> is ${pos?'positive':'negative'} at the ${sex==='m'?'men’s ≥4':'women’s ≥3'} cut-off. Higher AUDIT-C scores mean a higher probability of dependence, but even a positive screen leaves wide uncertainty and needs a diagnostic assessment. [[Bradley2007AUDITC,Rubinsky2010AUDITZones]]</p>
      ${dep||tot>=20?`<div class="verdict maybe">${dep?'A dependence item (4–6) is endorsed':'The total is 20 or more'}: in practice this signals that a diagnostic assessment is needed. It does not mean alcohol use disorder is present. [[HigginsBiddle2018USAUDIT]]</div>`:''}
      <div class="pt"><b>In plain words</b>A screening score only says “let's talk more”. If you are worried about your drinking or someone else's, talk with a health professional. [[HigginsBiddle2018USAUDIT]]</div>
      <div class="hook"><b>Exam hook</b>Each item scores 0–4 (items 9 and 10 only 0, 2 or 4), total 0–40. The AUDIT assumes a 10 g drink; the US drink is 14 g. [[Saunders1993AUDIT,HigginsBiddle2018USAUDIT]]</div>`}
  const setSex=v=>{sex=v;store.set('sc:sex',v);$$('[data-scsex]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.scsex===v));calc()};
  $$('[data-scsex]').forEach(b=>b.addEventListener('click',()=>setSex(b.dataset.scsex)));
  qb.addEventListener('change',calc);
  $('#scReset').addEventListener('click',()=>{SC_ITEMS.forEach((_,i)=>$('#scI'+i).selectedIndex=0);calc()});
  setSex(sex==='f'?'f':'m');

  /* ---------- icon array comparator ---------- */
  const ic=$('#scIcon'),pv=$('#scPrev'),inote=$('#scIconNote');let tool=store.get('sc:tool','acm');if(!SC_TOOLS.some(x=>x.id===tool))tool='acm';
  $('#scTools').innerHTML='<span class="kicker">Tool</span>'+SC_TOOLS.map(x=>`<button class="btn" data-sctool="${x.id}" aria-pressed="${x.id===tool}">${x.n}</button>`).join('');
  let stopI=null,shown=null;
  function counts(T,prev){const pos=Math.round(prev*100),tp=Math.round(pos*T.se),fp=Math.round((100-pos)*(1-T.sp));return {pos,tp,fn:pos-tp,fp,tn:100-pos-fp}}
  function drawI(c,T){const N=vb(ic,'720 330','400 600');let s='';
    const cols=10,gw=N?36:30,gh=N?36:30,gx=N?20:24,gy=N?36:30;
    s+=`<text x="${gx}" y="${gy-12}" class="t-sm" style="fill:var(--dx);font-weight:600">${T.n.toUpperCase()} · 100 PEOPLE</text>`;
    for(let i=0;i<100;i++){const r=Math.floor(i/cols),cc=i%cols,x=gx+cc*gw+gw/2,y=gy+r*gh+3;
      const has=i<c.pos,tp=has&&i<c.tp,fp=!has&&i<c.pos+c.fp;
      const col=tp?'var(--dx)':has?'var(--dx)':fp?'var(--warn)':'var(--muted)';
      if(has&&!tp)s+=`<circle cx="${f1(x)}" cy="${f1(y+12)}" r="${f1(gw*.42)}" style="fill:none;stroke:var(--dx);stroke-width:1.6;stroke-dasharray:3 2"/>`;
      s+=person(x,y,gh*.78,col,{op:tp||fp?1:has?.35:.28})}
    const lx=N?20:gx+cols*gw+28,ly=N?gy+10*gh+18:gy+4,P=c.tp+c.fp,ppv=P?c.tp/P:0,nn=c.fn+c.tn,npv=nn?c.tn/nn:0;
    const rows=[['var(--dx)',1,'True positives',c.tp,'have it, flagged'],['var(--dx)',.35,'Missed (false negatives)',c.fn,'have it, not flagged'],['var(--warn)',1,'False positives',c.fp,'flagged, do not have it'],['var(--muted)',.28,'True negatives',c.tn,'correctly not flagged']];
    rows.forEach(([col,op,l,v,sub],i)=>{const yy=N?ly+Math.floor(i/2)*44:ly+i*42,xx=N?lx+(i%2)*186:lx;
      s+=person(xx+8,yy,20,col,{op})+`<text x="${xx+26}" y="${yy+9}" class="t-lbl" style="font-size:12px">${l}: ${v}</text><text x="${xx+26}" y="${yy+22}" class="t-xs">${sub}</text>`});
    const py=N?ly+104:ly+186;
    s+=`<text x="${lx}" y="${py}" class="t-lbl">Of ${P} flagged, ${c.tp} have the condition</text><text x="${lx}" y="${py+16}" class="t-xs">positive predictive value ${Math.round(ppv*100)}%</text>`;
    s+=`<text x="${lx}" y="${py+38}" class="t-lbl">Of ${nn} not flagged, ${c.tn} do not</text><text x="${lx}" y="${py+54}" class="t-xs">negative predictive value ${Math.round(npv*100)}%</text>`;
    ic.innerHTML=s}
  function drawIcon(animateIt){const T=SC_TOOLS.find(x=>x.id===tool),prev=+pv.value,c=counts(T,prev);
    if(stopI){stopI();stopI=null}
    const from=shown||c;
    if(animateIt&&shown){stopI=crAnim(500,p=>{const e=ease(p),m={};['pos','tp','fp'].forEach(k=>m[k]=Math.round(lerp(from[k],c[k],e)));m.fn=m.pos-m.tp;m.tn=100-m.pos-m.fp;drawI(m,T)},()=>{stopI=null;drawI(c,T)})}
    drawI(c,T);shown=c;
    const P=c.tp+c.fp,ppv=P?Math.round(c.tp/P*100):0;
    inote.innerHTML=`<div class="kicker">${T.n} · prevalence ${Math.round(prev*100)}%</div><h4>${c.tp} found, ${c.fn} missed, ${c.fp} false alarms</h4>
      <p>Sensitivity ${Math.round(T.se*1000)/10}% and specificity ${Math.round(T.sp*1000)/10}% for ${T.tgt}. ${T.c} With ${c.pos} of 100 people affected, ${ppv}% of positive screens are true positives. Lower the prevalence and watch the false alarms outnumber the true positives: that is why a positive screen leads to a conversation and an assessment, never straight to a label.</p>
      <div class="pt"><b>In plain words</b>Even a good screening question flags some people who do not have a problem and misses some who do. A positive result means “let's talk more”. [[HigginsBiddle2018USAUDIT]]</div>
      <div class="hook"><b>Exam hook</b>${T.id==='cage'?'CAGE asks about problems, not amounts, so it misses less severe risky drinking; AUDIT-C outperformed an augmented CAGE in primary care. [[Dhalla2007CAGE,Bradley2007AUDITC]]':'In adults, brief screening instruments commonly had sensitivity and specificity between 0.70 and 0.85. [[OConnor2018JAMA]]'}</div>`}
  $('#scTools').addEventListener('click',e=>{const b=e.target.closest('[data-sctool]');if(!b)return;tool=b.dataset.sctool;store.set('sc:tool',tool);$$('[data-sctool]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.sctool===tool));drawIcon(true)});
  pv.addEventListener('input',()=>drawIcon(false));
  drawIcon(false);
  {const prevR=redraws.screening;redraws.screening=()=>{prevR&&prevR();calc();shown=null;drawIcon(false)}}
};
