/* =============== 5.1 Living with TB =============== */
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT');let sup=false,setSt=()=>{};
  const M0=-1.5,M1=7.5,mOf=t=>lerp(M0,M1,t),tOf=m=>(m-M0)/(M1-M0);
  const DPM=182/6;/* doses per month on a daily 6-month regimen */
  const RND=(()=>{const r=rng(5151);return Array.from({length:183},()=>r())})();
  const missP=(md,s)=>s?.015+.02*ramp(md,2,4.5):.03+.1*ramp(md,2,4.5);
  /* feelings and practical problems along the road; alt: the label when the support package is on */
  const FLAGS=[
    {m:-1.3,l:'weeks of cough',c:'muted'},
    {m:-.9,l:'lost work days',c:'bad'},
    {m:-.45,l:'travel to clinics',c:'warn'},
    {m:0,l:'diagnosis: fear',c:'bad'},
    {m:.12,l:'mask, stay home',c:'accent'},
    {m:.45,l:'who do I tell?',c:'bad'},
    {m:.8,l:'orange urine: expected',c:'warn'},
    {m:1.2,l:'feeling low',c:'warn',alt:'counselling',ac:'good'},
    {m:1.7,l:'feeling better',c:'good'},
    {m:2.4,l:'back to work?',c:'accent'},
    {m:3.3,l:'tempted to stop',c:'warn',alt:'video check-in',ac:'good'},
    {m:4.3,l:'income gap',c:'bad',alt:'cash + food help',ac:'good'},
    {m:5.2,l:'missed a dose',c:'bad',alt:'nurse follows up',ac:'good'},
    {m:6,l:'treatment complete',c:'good'},
    {m:6.8,l:'lung check-up',c:'accent'}];
  const SUPTXT=on=>on?` <b>Support is on.</b> The dose strip misses fewer doses and the flags change: counselling, a video check-in, cash and food help. In trials, cash transfers with home visits raised treatment success from 53% to 64% (Peru) and an interactive app with a supporter from 74% to 82% (Argentina). [[Wingfield2017,Rubinstein2026]]`
    :` <b>Support is off.</b> Press the support toggle to see what changes. Without it, missed doses cluster in the long continuation phase, as they do in real cohorts. [[Liu2015PLoSMed]]`;
  const STEPS=[
    {from:0,at:tOf(-.8),k:'Weeks before diagnosis',t:'Before anyone says "TB"',
     txt:`A cough that will not go away, tiredness, sweats at night. Costs start long before treatment: in low- and middle-income countries, half the total cost to people with TB came before treatment began, and lost income made up 60% of it. On average, total costs reached 58% of a year's individual income and 39% of household income. Even where treatment is free, a model across 135 countries put the mean cost at US$ 1253 per episode. [[Tanimura2014,Portnoy2023]]`,
     pt:`TB is nobody's fault. It is caused by a germ in the air, and it can be cured. Seeing a clinician early saves money as well as health.`,
     hook:`Tanimura 2014: half of patient costs come before treatment; income loss is 60% of the total.`},
    {from:tOf(0),at:tOf(.22),k:'Weeks 0–2 · starting treatment',t:'Diagnosis and the first weeks',
     txt:`Starting effective treatment promptly is one of WHO's two strong infection-control recommendations. [[WHO-IPC2019]] It works fast on transmission: in guinea-pig studies of air from an MDR-TB ward, transmission was minimal from people who had just started effective treatment. [[Dharmadhikari2014]] Someone with TB of the lungs may be asked to stay home and wear a mask for a short time. Sputum turns negative more slowly: in pooled data only 9% had a negative smear at 2 weeks, so the test, not the calendar, decides when isolation ends. [[Calderwood2021,Jensen2005]] WHO recommends health education and counselling for everyone on treatment (strong, moderate certainty). [[WHO-Mod4-2025]]`,
     pt:`Once you are on the right medicines, you quickly become much less likely to pass TB on. A short time at home is to protect others, not a punishment.`,
     hook:`In hospital, CDC keeps airborne precautions until three negative smears, at least 2 weeks of standard treatment and clinical improvement. [[Jensen2005]]`},
    {from:tOf(.6),at:tOf(1.1),k:'Months 1–2 · the intensive phase',t:'Side effects, and feelings',
     txt:`Four drugs every day. Rifampicin can turn urine, sweat, tears and sputum orange-red and can stain soft contact lenses: expected, and people should be told in advance. [[FDA-Rifampin]] Changes in eyesight or colour vision on ethambutol should be reported straight away. [[FDA-Ethambutol]] Feelings matter as much: pooled depression prevalence in people with TB was 45%, and depressive symptoms went with loss to follow-up (OR 8.70, few studies). Stigma is common too: 82% of people describing their experience in Lusaka reported it. [[Duko2020,RuizGrosso2020,Cremers2015]]`,
     pt:`Orange urine is the medicine, not a problem. Feeling low or worried is common with TB: tell your nurse, because help is available and it makes treatment easier.`,
     hook:`Depression in about 45% of people with TB, 52% in MDR-TB (Duko 2020). Screen for it: its symptoms overlap with TB's. [[Sweetland2017]]`},
    {from:tOf(1.6),at:tOf(2.3),k:'Month 2',t:'Feeling better, still treating',
     txt:`By 2 months, 82% had a negative smear and 88% a negative solid culture in a WHO-commissioned meta-analysis. [[Calderwood2021]] The intensive phase ends and two drugs continue. Weight is a good sign to watch: in the RATIONS cohort, gaining 5% of body weight by 2 months went with a lower hazard of death (aHR 0.39). [[Bhargava2023LGH]] Going back to work or school is the clinician's call, based on tests and the response to treatment; for health workers, CDC asks for three negative sputum samples, a probably effective treatment and a physician's judgement. [[Jensen2005]]`,
     pt:`You will probably feel much better now. The germs that are left are the slow, stubborn ones, which is why the tablets carry on for months.`,
     hook:`Smear conversion: 9% at 2 weeks, 82% at 2 months; solid culture 5% and 88% (pooled). [[Calderwood2021]]`},
    {from:tOf(2.8),at:tOf(4.4),k:'Months 3–6 · the continuation phase',t:'The long middle: where support matters',
     txt:`Feeling well, back at work, money tight: this is when doses slip. Across 22 trials, DOTS cut loss to follow-up by 49%, financial incentives by 26% and education by 13%. [[Muller2018]] WHO suggests community- or home-based treatment support over clinic-only or unsupported treatment, and says video-supported treatment can replace in-person support where it can be run well. [[WHO-Mod4-2025]]`,
     pt:`A nurse or helper may watch you take your pills, in person or by video. This is support to help you finish, not a sign that anyone doubts you.`,
     hook:`WHO material support = food or money (meals, baskets, vouchers, transport, allowances). Pillboxes alone did not improve outcomes in ASCENT. [[WHO-Mod4-2025,Jerene2025]]`},
    {from:tOf(5.8),at:tOf(6.45),k:'Month 6 and after',t:'Cure, and the years after',
     txt:`Treatment success for drug-susceptible TB was 88% in the 2023 cohort worldwide. [[WHO-GTR2025]] Clinical standards ask for everyone to be assessed for post-TB lung disease at the end of treatment, with rehabilitation for those who need it. [[Migliori2021PTLD]] In Bangladesh, a 6-week programme raised 6-minute walk distance from 402.8 m to 456.7 m (no control group). [[Rifat2026]] Recurrence after successful treatment was 2.26 per 100 person-years in pooled studies, so new symptoms deserve a new check. [[Vega2021]]`,
     pt:`If breathing is still hard after treatment, lung rehabilitation exercises can help you walk further. These numbers describe groups of people, not what will happen to you.`,
     hook:`Post-TB: assess lungs at the end of treatment; rehabilitation, stopping smoking and vaccines rest on expert opinion. [[Migliori2021PTLD,Allwood2021]]`}];
  const ico=(k,x,y,s)=>{/* small support glyphs, s ~ 14 */
    const c='var(--rx)';
    if(k===0)return `<path d="M${f1(x-s*.5)} ${f1(y-s*.1)}H${f1(x+s*.5)}Q${f1(x+s*.45)} ${f1(y+s*.45)} ${f1(x)} ${f1(y+s*.45)}Q${f1(x-s*.45)} ${f1(y+s*.45)} ${f1(x-s*.5)} ${f1(y-s*.1)}Z" style="fill:${c}"/><circle cx="${f1(x-s*.15)}" cy="${f1(y-s*.25)}" r="${f1(s*.16)}" style="fill:var(--dZ)"/><circle cx="${f1(x+s*.18)}" cy="${f1(y-s*.28)}" r="${f1(s*.14)}" style="fill:var(--dR)"/>`;
    if(k===1)return `<rect x="${f1(x-s*.5)}" y="${f1(y-s*.4)}" width="${f1(s)}" height="${f1(s*.65)}" rx="${f1(s*.12)}" style="fill:${c}"/><rect x="${f1(x-s*.38)}" y="${f1(y-s*.3)}" width="${f1(s*.76)}" height="${f1(s*.22)}" style="fill:var(--panel)"/><circle cx="${f1(x-s*.28)}" cy="${f1(y+s*.3)}" r="${f1(s*.12)}" style="fill:var(--ink)"/><circle cx="${f1(x+s*.28)}" cy="${f1(y+s*.3)}" r="${f1(s*.12)}" style="fill:var(--ink)"/>`;
    if(k===2)return `<rect x="${f1(x-s*.3)}" y="${f1(y-s*.5)}" width="${f1(s*.6)}" height="${f1(s)}" rx="${f1(s*.1)}" style="fill:${c}"/><rect x="${f1(x-s*.22)}" y="${f1(y-s*.38)}" width="${f1(s*.44)}" height="${f1(s*.66)}" style="fill:var(--panel)"/><path d="M${f1(x-s*.07)} ${f1(y-s*.17)}L${f1(x+s*.12)} ${f1(y-s*.05)}L${f1(x-s*.07)} ${f1(y+s*.07)}Z" style="fill:${c}"/>`;
    return `<rect x="${f1(x-s*.55)}" y="${f1(y-s*.3)}" width="${f1(s*1.1)}" height="${f1(s*.6)}" rx="${f1(s*.08)}" style="fill:${c}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s*.17)}" style="fill:none;stroke:var(--panel);stroke-width:1.2"/>`};
  function draw(t){
    const N=vb(svg,'720 460','400 492'),m=mOf(t);
    const L=N?{x0:40,x1:384,bn:14,fr:[30,47,64,81,98],py:116,ps:34,rd:152,dT:172,d0:178,d1:196,sT:218,s0:226,s1:300,cT:344,c0:352,c1:392,uT:414,u0:432,tk:464,ft:482,ch:5.6}
            :{x0:60,x1:700,bn:14,fr:[30,47,64,81],py:100,ps:38,rd:140,dT:162,d0:168,d1:186,sT:208,s0:216,s1:292,cT:322,c0:330,c1:366,uT:388,u0:406,tk:436,ft:452,ch:5.7};
    const X=v=>lerp(L.x0,L.x1,(v-M0)/(M1-M0)),xN=X(m);let s='';
    /* phase bands */
    [[M0,0,'var(--panel-2)',N?'before':'before diagnosis'],[0,2,'var(--tb-soft)',N?'intensive':'intensive · 4 drugs'],[2,6,'var(--rx-soft)',N?'continuation · 2 drugs':'continuation phase · 2 drugs'],[6,M1,'var(--good-soft)','after']].forEach(([a,b,c,n])=>{
      s+=`<rect x="${f1(X(a))}" y="${L.bn+6}" width="${f1(X(b)-X(a))}" height="${L.u0+22-L.bn}" style="fill:${c};opacity:.55"/><text x="${f1((X(a)+X(b))/2)}" y="${L.bn}" class="t-xs t-mid" style="fill:var(--ink)">${n}</text>`});
    /* the road */
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.rd}" y2="${L.rd}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/><line x1="${L.x0}" x2="${f1(xN)}" y1="${L.rd}" y2="${L.rd}" style="stroke:var(--brand);stroke-width:5;stroke-linecap:round;opacity:.55"/>`;
    /* flags: newest first get a label; older ones keep a dot if the rows are full */
    const vis=FLAGS.filter(f=>f.m<=m+1e-6),rows=L.fr.map(()=>[]);let fl='';
    for(let i=vis.length-1;i>=0;i--){const f=vis[i],lab=sup&&f.alt?f.alt:f.l,col=sup&&f.alt?f.ac:f.c,x=X(f.m),w=lab.length*L.ch+10;
      let x0=x-4;if(x0+w>L.x1+14)x0=L.x1+14-w;
      let r=rows.findIndex(R=>R.every(([a,b])=>x0+w+4<a||x0>b+4));
      const c=col==='muted'?'var(--muted)':'var(--'+col+')';
      fl+=`<circle cx="${f1(x)}" cy="${L.rd}" r="3.4" style="fill:${c};stroke:var(--panel);stroke-width:1"/>`;
      if(r<0||(N&&vis.length-i>5))continue;
      rows[r].push([x0,x0+w]);const y=L.fr[r],fresh=clamp((m-f.m)/.25);
      fl+=`<g style="opacity:${f1(.35+.65*fresh)}"><line x1="${f1(x)}" x2="${f1(x)}" y1="${y+14}" y2="${L.rd-3}" style="stroke:${c};stroke-width:1;stroke-dasharray:2 2"/><rect x="${f1(x0)}" y="${y}" width="${f1(w)}" height="15" rx="7.5" style="fill:var(--panel);stroke:${c};stroke-width:1.3"/><text x="${f1(x0+5)}" y="${y+11}" class="t-xs" style="fill:${c==='var(--muted)'?'var(--muted)':'var(--ink)'}">${lab}</text></g>`}
    /* the person: coughing before treatment, masked for the first couple of weeks */
    const bob=Math.abs(Math.sin(m*9))*2;
    s+=person(xN,L.py-bob,L.ps,'var(--brand)',{cough:m<.35,mask:m>=0&&m<.5,face:1});
    s+=fl;
    /* lane 1: doses */
    s+=`<text x="${L.x0}" y="${L.dT}" class="t-sm" style="fill:var(--rx)">${N?'DAILY DOSES':'DAILY DOSES · drawn, not measured'}</text>`;
    let tk=0,ms=0;const dw=(X(6)-X(0))/182;
    s+=`<rect x="${f1(X(0))}" y="${L.d0}" width="${f1(X(6)-X(0))}" height="${L.d1-L.d0}" rx="3" style="fill:var(--panel);stroke:var(--line)"/>`;
    for(let d=0;d<182;d++){const md=d/DPM;if(md>m)break;const miss=RND[d]<missP(md,sup);miss?ms++:tk++;
      s+=`<rect x="${f1(X(md)+.2)}" y="${f1(miss?L.d0+1:L.d0+3)}" width="${f1(Math.max(.8,dw-.4))}" height="${f1(miss?L.d1-L.d0-2:L.d1-L.d0-6)}" style="fill:${miss?'var(--bad)':'var(--rx)'};opacity:${miss?1:.75}"/>`}
    s+=`<text x="${L.x1}" y="${L.dT}" class="t-xs t-end"><tspan style="fill:var(--rx)">■ taken ${tk}</tspan>  <tspan style="fill:var(--bad)">■ missed ${ms}</tspan></text>`;
    /* lane 2: sputum conversion, pooled published points */
    const V=p=>lerp(L.s1,L.s0,p/100);
    s+=`<text x="${L.x0}" y="${L.sT}" class="t-sm" style="fill:var(--accent)">${N?'SPUTUM NEGATIVE · pooled %':'SPUTUM TURNS NEGATIVE · share of people, pooled'}</text>`;
    [0,50,100].forEach(p=>s+=`<line x1="${f1(X(0))}" x2="${f1(X(2.6))}" y1="${f1(V(p))}" y2="${f1(V(p))}" class="${p?'grid':'axis'}"/><text x="${f1(X(0)-4)}" y="${f1(V(p)+3)}" class="t-xs t-end">${p}%</text>`);
    const SM=[[0,0],[.46,9],[2,82]],CU=[[0,0],[.46,5],[2,88]];
    const seg=(P,col,lbl,dy)=>{if(m<=0)return '';let d='';const e=Math.min(m,2);
      for(let i=0;i<P.length;i++){const [a,v]=P[i];if(a>e){const [pa,pv]=P[i-1];d+='L'+f1(X(e))+' '+f1(V(lerp(pv,v,(e-pa)/(a-pa))));break}d+=(i?'L':'M')+f1(X(a))+' '+f1(V(v))}
      let o=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.2"/>`;
      P.slice(1).forEach(([a,v])=>{if(m>=a)o+=`<circle cx="${f1(X(a))}" cy="${f1(V(v))}" r="4.5" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`});
      if(m>=2&&lbl&&!N)o+=`<text x="${f1(X(2)+8)}" y="${f1(V(P[2][1])+dy)}" class="t-xs" style="fill:${col}">${lbl}</text>`;
      return o};
    s+=seg(SM,'var(--accent)',N?'smear 82%':'smear 82%',8)+seg(CU,'var(--rx)',N?'culture 88%':'culture 88%',-3);
    if(N){if(m>=.46)s+=`<text x="${L.x0}" y="${f1(V(0)+14)}" class="t-xs">2 wk: <tspan style="fill:var(--accent)">smear 9%</tspan> · <tspan style="fill:var(--rx)">culture 5%</tspan></text>`;
      if(m>=2)s+=`<text x="${L.x0}" y="${f1(V(0)+26)}" class="t-xs">2 mo: <tspan style="fill:var(--accent)">smear 82%</tspan> · <tspan style="fill:var(--rx)">culture 88%</tspan></text>`}
    else if(m>=.46)s+=`<text x="${f1(X(.46)+8)}" y="${f1(V(0)+13)}" class="t-xs">2 weeks: <tspan style="fill:var(--accent)">smear 9%</tspan> · <tspan style="fill:var(--rx)">solid culture 5%</tspan></text>`;
    /* inset: trial results for support (appears in the continuation phase) */
    if(m>=2.8){const ix=N?X(3.1):X(3.55),iw=L.x1+(N?6:20)-ix,op=ramp(m,2.8,3.3),bw=iw-(N?44:52),rh=N?23:23;
      s+=`<g style="opacity:${f1(op)}"><rect x="${f1(ix)}" y="${L.s0-12}" width="${f1(iw)}" height="${L.s1-L.s0+18}" rx="8" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<text x="${f1(ix+8)}" y="${L.s0+1}" class="t-xs" style="fill:var(--ink)">${N?'IN TRIALS: without / with':'IN TRIALS · grey: without support · green: with'}</text>`;
      [[N?'success · cash, Peru':'treatment success · cash + visits, Peru',53,64],[N?'success · app, Argentina':'treatment success · app + supporter, Argentina',74,82],[N?'months ≥20% doses missed':'months with ≥20% doses missed · pillbox, China',29.9,13.9]].forEach(([n,a,b],i)=>{const y=L.s0+8+i*rh,bx=ix+8;
        s+=`<text x="${f1(bx)}" y="${y+7}" class="t-xs">${n}</text>`;
        s+=`<rect x="${f1(bx)}" y="${y+10}" width="${f1(bw*a/100)}" height="4.5" rx="2" style="fill:var(--fibro);opacity:${sup?.45:1}"/><rect x="${f1(bx)}" y="${y+15.5}" width="${f1(bw*b/100)}" height="4.5" rx="2" style="fill:var(--rx);opacity:${sup?1:.4}"/>`;
        s+=`<text x="${f1(bx+bw*Math.max(a,b)/100+4)}" y="${y+19}" class="t-xs">${a}→${b}%</text>`});
      s+=`</g>`}
    /* lane 3: household costs, half spent before treatment starts */
    const cum=v=>v<=0?50*ramp(v,M0,0):50+50*ramp(v,0,6),C=p=>lerp(L.c1,L.c0,p/100);
    s+=`<text x="${L.x0}" y="${L.cT}" class="t-sm" style="fill:var(--warn)">${N?'HOUSEHOLD COSTS SO FAR':'HOUSEHOLD COSTS SPENT SO FAR · share of the episode total'}</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.c1}" y2="${L.c1}" class="axis"/><line x1="${L.x0}" x2="${f1(X(6))}" y1="${f1(C(100))}" y2="${f1(C(100))}" class="grid"/>`;
    {let d=`M${f1(X(M0))} ${L.c1}`;const e=Math.min(m,6);for(let v=M0;v<=e+1e-9;v+=.05)d+='L'+f1(X(v))+' '+f1(C(cum(v)));d+=`L${f1(X(e))} ${L.c1}Z`;
      s+=`<path d="${d}" style="fill:var(--warn);opacity:.35"/>`;
      s+=`<circle cx="${f1(X(Math.min(m,6)))}" cy="${f1(C(cum(Math.min(m,6))))}" r="3.5" style="fill:var(--warn)"/>`;
      if(m>=0)s+=`<circle cx="${f1(X(0))}" cy="${f1(C(50))}" r="4.5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(0)-7)}" y="${f1(C(50)-6)}" class="t-xs t-end" style="fill:var(--ink)">${N?'half':'half before treatment'}</text>`;
      if(m>=6)s+=`<text x="${f1(X(6)-7)}" y="${f1(N?C(100)-3:C(100)+13)}" class="t-xs t-end" style="fill:var(--ink)">${N?'≈39% of yearly income':'total ≈39% of yearly household income'}</text>`}
    /* lane 4: the support package */
    s+=`<text x="${L.x0}" y="${L.uT}" class="t-sm" style="fill:var(--rx)">${N?'SUPPORT PACKAGE':'SUPPORT PACKAGE · food · transport · video DOT · cash'}</text>`;
    if(sup){for(let k=0;k<24;k++){const v=k*(N?.5:.25);if(v>Math.min(m,6))break;s+=ico(k%4,X(v)+6,L.u0,N?10:13)}}
    else s+=`<text x="${f1(X(0))}" y="${L.u0+4}" class="t-xs">none: press "With a support package"</text>`;
    /* month ticks, playhead */
    for(let v=-1;v<=7;v++){if(N&&v%2&&v!==-1)continue;s+=`<text x="${f1(X(v))}" y="${L.tk}" class="t-xs t-mid">${v===0?'dx':v<0?'−1':v}</text>`}
    s+=`<text x="${L.x1}" y="${L.ft}" class="t-xs t-end">months from diagnosis (dx)</text><text x="${L.x0}" y="${L.ft}" class="t-xs" style="fill:var(--warn)">SCHEMATIC</text>`;
    s+=`<line x1="${f1(xN)}" x2="${f1(xN)}" y1="${L.rd+8}" y2="${L.u0+18}" style="stroke:var(--ink);stroke-width:1.1;opacity:.3"/>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);setSt(ph);
    const P=Object.assign({},STEPS[ph]);if(ph===4)P.txt+=SUPTXT(sup);
    $('#lvNote').innerHTML=noteHTML(P);
    const smv=m<=0?0:m<=.46?9*m/.46:m<=2?lerp(9,82,(m-.46)/1.54):82;
    $('#lvRead').innerHTML=`<span>month <b>${m<0?f1(m)+' (before diagnosis)':f1(Math.min(m,7.5))}</b></span><span>doses taken <b>${tk}</b> · missed <b>${ms}</b>${tk+ms?` (${Math.round(100*tk/(tk+ms))}%)`:''}</span><span>pooled smear-negative <b>${m>2?'82% (2-month value)':Math.round(smv)+'%'}</b></span><span>costs spent <b>${Math.round(cum(Math.min(m,6)))}%</b></span><span>support <b>${sup?'on':'off'}</b></span>`;
  }
  const stop=playWire(rg,$('#lvPlay'),draw,24000,'Replay','living');
  setSt=stepWire($('#lvSteps'),STEPS,rg,draw,stop);
  $('#lvSup').addEventListener('click',()=>{sup=!sup;$('#lvSup').setAttribute('aria-pressed',sup);draw(+rg.value)});
  draw(+rg.value);

  /* ---- after cure: mortality icon array, catastrophic costs, DALYs ---- */
  const ps=$('#lvPost');let lp='all',lc='all';
  const LP={all:{smr:2.91,n:29,l:'everyone treated',ci:'2.21–3.84'},cured:{smr:3.76,n:38,l:'cured or completed',ci:'3.04–4.66'}};
  const LC={all:{v:47,l:'all TB · 40 national surveys',src:'WHO 2025'},dr:{v:82,l:'drug-resistant TB',src:'WHO 2025'},poor:{v:75.2,l:'poorest fifth of households',src:'model, 135 countries'},rich:{v:42.5,l:'richest fifth of households',src:'model, 135 countries'}};
  const house=(x,y,s,on)=>`<path d="M${f1(x)} ${f1(y-s*.5)}L${f1(x+s*.5)} ${f1(y-s*.05)}V${f1(y+s*.45)}H${f1(x-s*.5)}V${f1(y-s*.05)}Z" style="fill:${on?'var(--warn)':'none'};stroke:${on?'var(--warn)':'var(--line)'};stroke-width:1"/>`;
  function drawP(){
    const N=vb(ps,'720 330','400 584');let s='';
    const A=N?{x:20,y:28,w:360}:{x:20,y:28,w:330},B=N?{x:20,y:258,w:360}:{x:390,y:28,w:320};
    const P=LP[lp],C=LC[lc];
    /* panel A: deaths icon array */
    s+=`<text x="${A.x}" y="${A.y-8}" class="t-sm" style="fill:var(--brand)">${N?'DEATHS AFTER TREATMENT (SMR)':'DEATHS AFTER TB TREATMENT (SMR)'}</text>`;
    const sz=N?18:17,gap=N?34:31;
    s+=`<text x="${A.x}" y="${A.y+14}" class="t-xs" style="fill:var(--ink)">same-age general population: 10 deaths</text>`;
    for(let i=0;i<10;i++)s+=person(A.x+i*gap*.98+6,A.y+22,sz,'var(--fibro)');
    s+=`<text x="${A.x}" y="${A.y+62}" class="t-xs" style="fill:var(--ink)">people treated for TB, ${P.l}: about ${P.n}</text>`;
    for(let i=0;i<40;i++){if(i>=P.n)break;const r=Math.floor(i/10),c=i%10;s+=person(A.x+c*gap*.98+6,A.y+70+r*(sz+6),sz,'var(--brand)')}
    s+=`<text x="${A.x}" y="${A.y+70+4*(sz+6)+10}" class="t-big" style="fill:var(--brand)">SMR ${P.smr}</text><text x="${A.x+86}" y="${A.y+70+4*(sz+6)+10}" class="t-xs">95% CI ${P.ci}</text><text x="${A.x}" y="${A.y+70+4*(sz+6)+26}" class="t-xs">most common cause of death: cardiovascular (20%)</text>`;
    /* panel B: catastrophic costs, 100 houses */
    s+=`<text x="${B.x}" y="${B.y-8}" class="t-sm" style="fill:var(--warn)">CATASTROPHIC COSTS · per 100 households</text>`;
    const hs=N?16:13,hg=N?34:24,on=Math.round(C.v);
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10;s+=house(B.x+10+c*hg,B.y+12+r*(hs+5),hs,i<on)}
    const yb=B.y+12+10*(hs+5)+4;
    s+=`<text x="${B.x}" y="${yb}" class="t-big" style="fill:var(--warn)">${C.v}%</text><text x="${B.x+(N?62:56)}" y="${yb}" class="t-xs">${C.l} (${C.src})</text>`;
    s+=`<text x="${B.x}" y="${yb+14}" class="t-xs">catastrophic: above 20% of yearly household income</text>`;
    /* DALY bar across the bottom */
    const D=N?{x:20,y:yb+50,w:360}:{x:20,y:262,w:680},k=D.w/12.1;
    s+=`<text x="${D.x}" y="${D.y-8}" class="t-sm" style="fill:var(--tb)">${N?'HEALTHY LIFE LOST PER TB EPISODE':'HEALTHY LIFE LOST PER TB EPISODE · 12.1 DALYs on average'}</text>`;
    s+=`<rect x="${D.x}" y="${D.y}" width="${f1(k*6.3)}" height="18" rx="4" style="fill:var(--tb);opacity:.85"/><rect x="${f1(D.x+k*6.3)}" y="${D.y}" width="${f1(k*5.8)}" height="18" rx="4" style="fill:var(--tb);opacity:.35"/>`;
    s+=`<text x="${D.x+6}" y="${D.y+13}" class="t-xs" style="fill:var(--panel)">${N?'the illness':'the illness and its deaths'}</text><text x="${f1(D.x+k*6.3+6)}" y="${D.y+13}" class="t-xs" style="fill:var(--ink)">${N?'after it: 5.8 (47%)':'after the episode: 5.8 DALYs (47%)'}</text>`;
    s+=`<text x="${D.x}" y="${D.y+32}" class="t-xs">${N?'28% of the total comes 15+ years later':'28% of the total accrues 15 or more years later (2019 estimate)'}</text>`;
    ps.innerHTML=s;
    $('#lvPostNote').innerHTML=noteHTML({k:'Life after TB',t:lp==='cured'?'Cure is not the end of the story':'TB leaves a long shadow',
      txt:`People treated for TB had higher all-cause mortality after treatment than the general population (pooled SMR 2.91); among those cured or who completed treatment it was 3.76, and cardiovascular disease was the most common cause of death (20%). [[Romanowski2019]] A history of TB went with COPD in adults over 40 (OR 3.05), most strongly in never-smokers. [[Byrne2015]] Post-TB lung disease includes bronchiectasis, airway obstruction, scarring and vascular and pleural disease; multiple episodes, drug-resistant TB and diagnostic delay raise its risk. [[Allwood2021]] Of the 122 million DALYs from TB in 2019, 47% came after the episode. [[Menzies2021LGH]] Money: a pooled 47% of TB-affected households faced catastrophic costs, 82% with drug-resistant TB; a model put it at 75.2% in the poorest fifth and 42.5% in the richest. [[WHO-GTR2025,Portnoy2023]]`,
      pt:`Some people still have breathing problems after TB is cured. Lung check-ups, not smoking and rehabilitation help. Ask your clinic about money and food support early, not only when things are hard.`,
      hook:`TB survivors: about 3 times the mortality of the general population (SMR 2.91). Catastrophic costs: 47% of households overall, 82% with DR-TB.`});
  }
  $$('[data-lp]').forEach(b=>b.addEventListener('click',()=>{lp=b.dataset.lp;$$('[data-lp]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP()}));
  $$('[data-lc]').forEach(b=>b.addEventListener('click',()=>{lc=b.dataset.lc;$$('[data-lc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP()}));
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawP()};
  drawP();
};
