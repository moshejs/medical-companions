/* =============== 1.1 What alcohol use disorder is =============== */
/* NESARC-III (Grant 2015) and NESARC (Grant 2017) figures, % of US adults. Icon counts are those
   percentages rounded to whole people out of 100 with the largest-remainder rule, so the three
   severity groups add up to the rounded total: 12-month 7.3/3.2/3.4 -> 7/3/4 (14); lifetime
   8.6/6.6/13.9 -> 9/6/14 (29). */
const WH_NUM={drank:72.7,m12:{mild:7.3,mod:3.2,sev:3.4,all:13.9},life:{mild:8.6,mod:6.6,sev:13.9,all:29.1},
  ic12:{mild:7,mod:3,sev:4},icLife:{mild:9,mod:6,sev:14},trLife:19.8,tr12:7.7,trWorld:17.3,trLow:9.3};
const WH_COL={none:'var(--line)',drank:'var(--eth-fill)',drankLine:'var(--eth-fill)',aud:'var(--brand)',mild:'var(--gaba-fill)',mod:'var(--brand)',sev:'var(--accent)',tr:'var(--rx)'};
function whWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n&&c){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L}

inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote'),rd=$('#whRead');
  const STEPS=[
    {from:0,at:.1,k:'Step 1 · The spectrum',t:'A spectrum, not a switch',
     txt:`Drinking runs along a spectrum. The USPSTF uses "unhealthy alcohol use" for everything from risky drinking to alcohol use disorder [[USPSTF2018Alcohol]]. In 2012–2013, 72.7% of US adults drank alcohol in the past year [[Grant2017JAMAPsych]]. Binge drinking in US federal surveys means 5 or more drinks (males) or 4 or more (females) on one occasion [[KranzlerSoyka2018]]. Most people who drink heavily do not have dependence: in NSDUH 2009–2011, 10.2% of excessive drinkers met DSM-IV dependence criteria and about 90% did not [[Esser2014PCD]]. "Lower risk" is not "no risk": GBD 2016 found the level that minimised harm was zero drinks a week. [[GBD2016Alcohol]]`,
     pt:`Drinking is not simply "fine" or "a disorder". Most people who sometimes drink too much do not have AUD, but heavy drinking still carries risk.`,
     hook:`Unhealthy alcohol use (USPSTF) covers the whole spectrum, from risky drinking to AUD. About 90% of excessive drinkers do not meet dependence criteria. [[USPSTF2018Alcohol,Esser2014PCD]]`},
    {from:.2,at:.3,k:'Step 2 · Past 12 months',t:'About 1 in 7 US adults',
     txt:`NESARC-III interviewed 36,309 US adults face to face in 2012–2013. Under DSM-5 criteria, <b>13.9%</b> had AUD in the past 12 months: 17.6% of men and 10.4% of women [[Grant2015NESARC]]. AUD is diagnosed when at least 2 of 11 criteria occur within 12 months: see <a href="#criteria" data-go="criteria">Diagnosis</a> [[APA2022]]. In the same survey 12-month drug use disorder was 3.9%, so AUD is the more common disorder. [[Grant2016DUD]]`,
     pt:`In a given year, about 1 in 7 US adults has alcohol use disorder. It is one of the most common health conditions there is.`,
     hook:`NESARC-III 12-month DSM-5 AUD: 13.9% of US adults. Mean age at onset 26.2 years. [[Grant2015NESARC]]`},
    {from:.4,at:.5,k:'Step 3 · Severity',t:'Mild, moderate, severe',
     txt:`Severity counts the criteria met: mild 2–3, moderate 4–5, severe 6 or more [[Hasin2013]]. Of the 13.9%, <b>7.3%</b> of adults had mild, <b>3.2%</b> moderate and <b>3.4%</b> severe AUD. Severe 12-month AUD was 4.5% in men and 2.3% in women, it was most common at the lowest income level, and disability rose with severity [[Grant2015NESARC]]. Mean age at onset fell as severity rose: 30.1 years for mild, 25.9 for moderate and 23.9 for severe AUD. [[Grant2015NESARC]]`,
     pt:`Mild AUD is the most common kind: about half of the people with AUD in a year. The more criteria a person meets, the more the condition tends to disrupt daily life.`,
     hook:`Severity by criterion count: mild 2–3, moderate 4–5, severe 6 or more of 11. Practise it with the counter in <a href="#criteria" data-go="criteria">Diagnosis</a>. [[Hasin2013]]`},
    {from:.6,at:.7,k:'Step 4 · Lifetime',t:'About 3 in 10, at some point in life',
     txt:`Counting everyone who has ever met the criteria, <b>29.1%</b> of US adults had lifetime AUD: 8.6% mild, 6.6% moderate and 13.9% severe. Lifetime AUD was 36.0% in men and 37.0% at ages 18–29 [[Grant2015NESARC]]. Lifetime figures include people whose AUD is in the past. Recovery is common at population level: 9.1% of US adults say they used to have an alcohol or drug problem and no longer do. These are group figures, not a promise for one person. [[Kelly2017Recovery]]`,
     pt:`Over a lifetime, about 3 in 10 US adults meet the criteria at some point. That count includes many people who are no longer affected.`,
     hook:`12-month 13.9% vs lifetime 29.1% (NESARC-III). Severe AUD: 3.4% in the past 12 months but 13.9% lifetime. [[Grant2015NESARC]]`},
    {from:.8,at:.93,k:'Step 5 · The treatment gap',t:'Most never receive treatment',
     txt:`Only <b>19.8%</b> of people with lifetime AUD, and <b>7.7%</b> with 12-month AUD, had ever sought treatment or help. Treatment seeking rose with severity: 2.7% (mild), 4.9% (moderate), 21.3% (severe) [[Grant2015NESARC]]. Worldwide, a meta-analysis of 32 articles found 17.3% of people with AUD received any treatment, and 9.3% in low and lower-middle-income countries [[Mekonen2021]]. The NESARC-III authors call DSM-5 AUD "highly prevalent, highly comorbid, disabling" and say it "often goes untreated". [[Grant2015NESARC]]`,
     pt:`Most people with alcohol use disorder never get help, even though treatments that work exist. [[Carvalho2019Lancet]]`,
     hook:`Treatment gap: 19.8% of lifetime and 7.7% of 12-month AUD ever treated (NESARC-III); about 1 in 6 (17.3%) worldwide. [[Grant2015NESARC,Mekonen2021]]`}];
  const SEG=[{n:'No drinking',s:'',c:'var(--panel-2)'},{n:'Lower risk',s:'not no risk',c:'var(--eth-soft)'},{n:'Hazardous / binge',s:'≥5 (m) / ≥4 (f) drinks',c:'var(--eth-fill)'},
    {n:'AUD mild',s:'2–3 criteria',c:WH_COL.mild},{n:'AUD moderate',s:'4–5 criteria',c:WH_COL.mod},{n:'AUD severe',s:'6+ criteria',c:WH_COL.sev}];
  let setSt=()=>{};
  /* state for a time t */
  function state(t){const p=phaseOf(STEPS,t);
    const drank=ramp(t,0,.09)*(1-ramp(t,.6,.66));            /* past-year drinkers layer: fades for lifetime */
    const fill12=ramp(t,.2,.3),split=ramp(t,.4,.46),life=ramp(t,.6,.7),gap=ramp(t,.8,.9);
    const n=k=>Math.round(lerp(WH_NUM.ic12[k],WH_NUM.icLife[k],life));
    const cnt={sev:n('sev'),mod:n('mod'),mild:n('mild')};const tot=cnt.sev+cnt.mod+cnt.mild;
    const shown=Math.round(tot*fill12);
    const pct=lerp(WH_NUM.m12.all*fill12,WH_NUM.life.all,life);
    const sv=k=>lerp(WH_NUM.m12[k],WH_NUM.life[k],life)*split;
    return {p,drank,fill12,split,life,gap,cnt,tot,shown,pct,sev:sv('sev'),mod:sv('mod'),mild:sv('mild'),trN:Math.round(tot*WH_NUM.trLife/100)}}
  function draw(t){const S=state(t),N=vb(svg,'720 420','400 '+(S.gap>0?750:640));let s='';
    /* ---- spectrum strip ---- */
    const hiSeg=S.p===0?Math.min(5,Math.floor(ramp(t,0,.17)*6)):-1;
    const segBox=(i)=>{if(!N){const w=(720-48)/6;return [24+i*w,26,w-4,30]}const w=(400-32)/3;return [16+(i%3)*w,i<3?30:90,w-4,28]};
    s+=`<text x="${N?16:24}" y="${N?18:16}" class="t-sm" style="fill:var(--brand)">THE SPECTRUM OF DRINKING</text>`;
    if(N)s+=`<text x="16" y="84" class="t-sm" style="fill:var(--brand)">ALCOHOL USE DISORDER (DSM-5)</text>`;
    SEG.forEach((g,i)=>{const [x,y,w,h]=segBox(i),aud=i>=3,on=aud?(S.p>=1):(S.p===0&&i<=hiSeg),cur=S.p===0&&i===hiSeg;
      const op=S.p===0?(i<=hiSeg?1:.35):(aud?1:.35);
      s+=`<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="${h}" rx="7" style="fill:${g.c};opacity:${f1(op)};stroke:${cur?'var(--ink)':'none'};stroke-width:1.6"/>`;
      const dark=i>=4;s+=`<text x="${f1(x+w/2)}" y="${y+h/2+4}" class="t-xs t-mid" style="fill:${dark?'#fff':'var(--ink)'};font-weight:600;opacity:${f1(Math.max(op,.6))}">${N&&aud?g.n.replace('AUD ',''):g.n}</text>`;
      if(g.s)s+=`<text x="${f1(x+w/2)}" y="${y+h+12}" class="t-xs t-mid" style="opacity:${f1(on?1:.6)}">${g.s}</text>`});
    if(!N)s+=`<path d="M${f1(24+3*112)} 72h${f1(3*112-4)}" style="stroke:var(--brand);stroke-width:2"/><text x="${f1(24+4.5*112)}" y="84" class="t-xs t-mid" style="fill:var(--brand)">alcohol use disorder: 2 or more of 11 criteria in 12 months</text>`;
    /* ---- icon array: 100 adults ---- */
    const IA=N?{x0:47,y0:150,dx:34,dy:30,s:25}:{x0:38,y0:112,dx:26,dy:28,s:22};
    const order=[];/* severe first, then moderate, then mild: contiguous blocks read best */
    for(let i=0;i<S.cnt.sev;i++)order.push('sev');for(let i=0;i<S.cnt.mod;i++)order.push('mod');for(let i=0;i<S.cnt.mild;i++)order.push('mild');
    const trEvery=S.tot/Math.max(1,S.trN);
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),x=IA.x0+c*IA.dx,y=IA.y0+r*IA.dy;let fill=WH_COL.none,op=1,ring=false;
      if(i<S.shown){fill=S.split>0?WH_COL[order[i]]:WH_COL.aud;if(S.split>0&&S.split<1)fill=S.split>.5?WH_COL[order[i]]:WH_COL.aud;
        if(S.gap>0){const k=Math.floor(i/trEvery);ring=Math.floor((i)%trEvery)===0&&k<Math.round(S.trN*S.gap);op=ring?1:lerp(1,.45,S.gap)}}
      else if(i<Math.round(WH_NUM.drank*S.drank)){fill=WH_COL.drank}
      s+=person(x,y,IA.s,fill,{op:fill===WH_COL.drank?op*.6:op});
      if(i>=S.shown&&i<Math.round(WH_NUM.drank*S.drank))s+=`<circle cx="${x}" cy="${f1(y+IA.s*.17)}" r="${f1(IA.s*.17)}" style="fill:none;stroke:${WH_COL.drankLine};stroke-width:.9;opacity:.8"/>`;
      if(ring)s+=`<circle cx="${x}" cy="${f1(y+IA.s*.55)}" r="${f1(IA.s*.62)}" style="fill:none;stroke:${WH_COL.tr};stroke-width:2.2"/>`}
    const iaB=IA.y0+10*IA.dy;
    /* legend under the icon array */
    const lg=[];if(S.drank>.05)lg.push([WH_COL.drank,'drank in the past year']);
    if(S.shown>0&&S.split<.5)lg.push([WH_COL.aud,'alcohol use disorder']);
    if(S.split>=.5)lg.push([WH_COL.mild,'mild'],[WH_COL.mod,'moderate'],[WH_COL.sev,'severe']);
    if(S.gap>.05)lg.push(['ring','ever sought treatment or help']);
    let lx=N?16:24,ly=iaB+(N?4:2);
    lg.forEach(([c,l])=>{const w=l.length*5.6+22;if(lx+w>(N?390:300)&&lx>(N?16:24)){lx=N?16:24;ly+=14}
      s+=c==='ring'?`<circle cx="${lx+6}" cy="${ly}" r="5.5" style="fill:none;stroke:${WH_COL.tr};stroke-width:2"/>`:`<rect x="${lx}" y="${ly-5}" width="12" height="10" rx="3" style="fill:${c};stroke:${c===WH_COL.drank?WH_COL.drankLine:'none'};stroke-width:.8"/>`;
      s+=`<text x="${lx+17}" y="${ly+3.5}" class="t-xs">${l}</text>`;lx+=w});
    /* ---- right panel (wide) / bottom panel (narrow): the numbers ---- */
    const P=N?{x:16,y:iaB+36,w:368}:{x:340,y:112,w:356};
    const big=S.p===0?WH_NUM.drank*S.drank:S.pct;
    const bigLab=S.p===0?'of US adults drank in the past year':S.life>.5?'of US adults: AUD at some point in life':'of US adults: AUD in the past 12 months';
    const bigCol=S.p===0?'var(--eth)':'var(--brand)';
    s+=`<text x="${P.x}" y="${P.y+(N?30:40)}" class="t-big" style="font-size:${N?40:50}px;fill:${bigCol}">${f1(big)}%</text>`;
    s+=`<text x="${P.x+(N?118:150)}" y="${P.y+(N?16:22)}" class="t-lbl">${bigLab.split(':')[0]}${bigLab.includes(':')?':':''}</text>`;
    if(bigLab.includes(':'))s+=`<text x="${P.x+(N?118:150)}" y="${P.y+(N?32:40)}" class="t-sm">${bigLab.split(': ')[1]}</text>`;
    s+=`<text x="${P.x+(N?118:150)}" y="${P.y+(N?46:56)}" class="t-xs">${S.p===0?'NESARC 2012–2013':'NESARC-III, DSM-5'}</text>`;
    /* severity bars */
    const bx=P.x+(N?84:96),bw=P.w-(N?84:96)-48,sc=v=>bw*v/16;let by=P.y+(N?66:86);
    if(S.split>0){s+=`<text x="${P.x}" y="${by-8}" class="t-sm" style="opacity:${f1(S.split)}">BY SEVERITY · ${S.life>.5?'LIFETIME':'PAST 12 MONTHS'}</text>`;
      [['mild','Mild 2–3'],['mod','Moderate 4–5'],['sev','Severe 6+']].forEach(([k,l],i)=>{const y=by+i*24,v=S[k];
        s+=`<text x="${P.x}" y="${y+12}" class="t-xs" style="opacity:${f1(S.split)}">${l}</text><rect x="${bx}" y="${y+2}" width="${f1(bw)}" height="13" rx="4" style="fill:var(--panel-2);opacity:${f1(S.split)}"/><rect x="${bx}" y="${y+2}" width="${f1(sc(v))}" height="13" rx="4" style="fill:${WH_COL[k]}"/><text x="${f1(bx+sc(v)+6)}" y="${y+12.5}" class="t-xs" style="fill:var(--ink);opacity:${f1(S.split)}">${f1(v)}%</text>`});
      by+=3*24+18}
    else if(S.p===0){/* step 1: drinkers vs dependence among excessive drinkers */
      const a=ramp(t,.03,.09);s+=`<text x="${P.x}" y="${by-8}" class="t-sm" style="opacity:${f1(a)}">AMONG EXCESSIVE DRINKERS (NSDUH 2009–2011)</text>`;
      const W=P.w-10;s+=`<rect x="${P.x}" y="${by}" width="${f1(W)}" height="18" rx="5" style="fill:var(--eth-soft);opacity:${f1(a)}"/><rect x="${P.x}" y="${by}" width="${f1(W*.102*a)}" height="18" rx="5" style="fill:var(--brand)"/>`;
      s+=`<text x="${f1(P.x+W*.102+6)}" y="${by+13}" class="t-xs" style="fill:var(--ink);opacity:${f1(a)}">10.2% met dependence criteria · about 90% did not</text>`;by+=46}
    /* treatment-gap bars */
    if(S.gap>0){const g=S.gap;s+=`<text x="${P.x}" y="${by-8}" class="t-sm" style="fill:var(--rx);opacity:${f1(g)}">EVER SOUGHT TREATMENT OR HELP</text>`;
      [['US, lifetime AUD',WH_NUM.trLife],['US, 12-month AUD',WH_NUM.tr12],['Worldwide (32 studies)',WH_NUM.trWorld],['Low/lower-middle income',WH_NUM.trLow]].forEach(([l,v],i)=>{const y=by+i*22,W=bw;
        s+=`<text x="${P.x}" y="${y+11}" class="t-xs" style="opacity:${f1(g)}">${N?l.replace('Low/lower-middle income','Lower-income').replace(' (32 studies)',''):l}</text>`;
        const x0=P.x+(N?118:132),ww=P.w-(N?118:132)-46;s+=`<rect x="${x0}" y="${y+1}" width="${f1(ww)}" height="12" rx="4" style="fill:var(--panel-2);opacity:${f1(g)}"/><rect x="${x0}" y="${y+1}" width="${f1(ww*v/100*g)}" height="12" rx="4" style="fill:var(--rx)"/><text x="${f1(x0+ww*v/100*g+5)}" y="${y+11}" class="t-xs" style="fill:var(--ink);opacity:${f1(g)}">${f1(v*g)}%</text>`});
      by+=4*22+8}
    if(!N&&S.p===4){s+=`<text x="${P.x}" y="${Math.min(by+10,404)}" class="t-xs">Ringed: ${S.trN} of the ${S.tot} figures, about 19.8% of lifetime AUD.</text>`}
    if(!N&&S.p>=1&&S.p<=2){s+=`<text x="${P.x}" y="${by+8}" class="t-xs">12-month drug use disorder in the same survey: 3.9%</text>`}
    svg.innerHTML=s;
    const P0=STEPS[S.p];note.innerHTML=noteHTML(P0);setSt(S.p);
    rd.innerHTML=S.p===0?`<span>Past-year drinking <b>72.7%</b></span><span>Excessive drinkers with dependence <b>10.2%</b></span>`:
      `<span>AUD <b>${f1(S.pct)}%</b> ${S.life>.5?'lifetime':'12-month'}</span>`+(S.split>0?`<span>mild <b>${f1(S.mild)}</b> · moderate <b>${f1(S.mod)}</b> · severe <b>${f1(S.sev)}</b></span>`:'')+(S.gap>0?`<span>ever treated <b>19.8%</b> lifetime · <b>7.7%</b> 12-month</span>`:'');
  }
  const stop=playWire(rg,$('#whPlay'),draw,16000,'%t:player.replay%','what');
  setSt=stepWire($('#whSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- who is affected ---------- */
  const wsv=$('#whWho');let who='sex',whoK=1,whoStop=null;
  const WHO={
    sex:{title:'12-MONTH AUD BY SEX · NESARC-III',max:20,ser:[['any AUD','var(--brand)'],['severe AUD','var(--accent)']],
      rows:[['Men',[17.6,4.5]],['Women',[10.4,2.3]]],
      cap:`NESARC-III, 2012–2013, % of US adults. Lifetime AUD was 36.0% in men. [[Grant2015NESARC]]`,
      note:{k:'Who is affected · sex',t:'The gap between men and women is closing',
        txt:`In NESARC-III, 12-month AUD was 17.6% in men and 10.4% in women, and severe AUD 4.5% and 2.3% [[Grant2015NESARC]]. Across 68 studies of birth cohorts from 1891 to 2001, the male-to-female ratio for problematic alcohol use fell from 3.0 in cohorts born in the early 1900s to 1.2 in those born in the late 1900s, most clearly among young adults [[Slade2016]]. In the US, alcohol-related deaths rose 12.5% a year in men and 14.7% a year in women from 2018 to 2020. [[Karaye2023]]`,
        pt:`Men still have AUD more often, but women are catching up, especially among younger people.`,
        hook:`Male:female ratio for problem drinking: 3.0 (born early 1900s) to 1.2 (born late 1900s). [[Slade2016]]`}},
    age:{title:'12-MONTH AUD BY AGE · NESARC-III',max:30,ser:[['any AUD','var(--brand)']],
      rows:[['18–29',[26.7]],['30–44',[16.2]],['45–64',[10.0]],['65 and older',[2.3]]],
      cap:`NESARC-III, 2012–2013, % of US adults in each age band. Lifetime AUD was 37.0% at ages 18–29. [[Grant2015NESARC]]`,
      note:{k:'Who is affected · age',t:'Highest in young adults, rising in older adults',
        txt:`12-month AUD was 26.7% at ages 18–29 and 2.3% at 65 and older; mean age at onset was 26.2 years [[Grant2015NESARC]]. Among US adults aged 50 and older, AUD rose 23.3% in relative terms from 2005/2006 to 2013/2014 [[Han2017Older]], and AUD prevalence and mortality over age 70 rose from 2000 to 2021 [[Danpanichkul2025Older]]. Among US 8th, 10th and 12th graders, frequent binge drinking declined from 1991 to 2015. [[Jang2017]]`,
        pt:`AUD is most common in people in their twenties, but it can start or continue at any age.`,
        hook:`12-month AUD peaks at 18–29 (26.7%) and is lowest at 65+ (2.3%). [[Grant2015NESARC]]`}},
    grp:{title:'AUD BY GROUP · NESARC-III',max:50,ser:[['12-month','var(--brand)'],['lifetime','var(--thi-fill)']],
      rows:[['White',[14.0,32.6]],['Native American',[19.2,43.4]],['Never married',[25.0,35.5]],['Previously married',[11.4,27.1]]],
      cap:`NESARC-III, 2012–2013, % within each group. Group figures describe populations, not individuals. [[Grant2015NESARC]]`,
      note:{k:'Who is affected · groups',t:'Unequal by group and income',
        txt:`12-month and lifetime AUD were 14.0% and 32.6% among white respondents and 19.2% and 43.4% among Native American respondents; 25.0% and 35.5% among never-married adults and 11.4% and 27.1% among previously married adults. Severe AUD was most common at the lowest income level [[Grant2015NESARC]]. Binge drinking was most common at family incomes of $75,000 or more, but dependence was most common under $25,000. [[Esser2014PCD]]`,
        pt:`Some groups carry more of the burden than others. These are averages for groups: they say nothing about any one person.`,
        hook:`Binge drinking peaks at higher incomes, dependence at lower incomes (NSDUH 2009–2011). [[Esser2014PCD]]`}},
    trend:{title:'US TRENDS · TWO SURVEYS, TWO METHODS',max:16,ser:[['earlier','var(--muted)'],['later','var(--brand)']],
      rows:[['DSM-IV AUD, 2001–02 → 2012–13',[8.5,12.7]],['NSDUH men, 2021 → 2024',[13.3,12.6]],['NSDUH women, 2021 → 2024',[9.7,8.2]]],
      cap:`NESARC (in-person interview) and NSDUH (self-administered) use different methods: compare within a row, not between rows. [[Grant2017JAMAPsych,Han2026NSDUH]]`,
      note:{k:'Who is affected · over time',t:'Up, then flat or slightly down',
        txt:`From 2001–2002 to 2012–2013, DSM-IV AUD rose from 8.5% to 12.7% of US adults (a relative rise of 49.4%), and high-risk drinking from 9.7% to 12.6%; the rises were greatest among women, older adults, racial and ethnic minorities and people with lower education and income [[Grant2017JAMAPsych]]. In NSDUH 2021–2024 (DSM-5), past-year AUD went from 13.3% to 12.6% in men and from 9.7% to 8.2% in women, and the authors describe moderate-to-severe AUD as stable or declining. [[Han2026NSDUH]]`,
        pt:`US drinking problems rose in the 2000s and have been level or slightly lower since 2021. Deaths are a different story: see the next section.`,
        hook:`DSM-IV AUD rose 49.4% in relative terms between NESARC waves (8.5% to 12.7%). [[Grant2017JAMAPsych]]`}}};
  function drawWho(k){const D=WHO[who],nr=D.rows.length,ns=D.ser.length,N=vb(wsv,'720 '+(62+nr*(ns>1?(nr>3?54:70):52)+20),'400 '+(58+nr*(ns>1?78:62)+24));let s='';
    const L=N?{x0:16,lw:0,bx:16,bw:300,top:58,rowH:D.ser.length>1?78:62,lab:true}:{x0:24,lw:220,bx:252,bw:400,top:62,rowH:D.ser.length>1?(D.rows.length>3?54:70):52};
    s+=`<text x="${L.x0}" y="22" class="t-sm" style="fill:var(--brand)">${D.title}</text>`;
    /* legend */
    let lx=L.x0;D.ser.forEach(([n,c])=>{s+=`<rect x="${lx}" y="32" width="12" height="10" rx="3" style="fill:${c}"/><text x="${lx+17}" y="41" class="t-xs">${n}</text>`;lx+=n.length*5.8+36});
    /* grid */
    const X=v=>L.bx+L.bw*v/D.max;const gy0=L.top-6,gy1=L.top+D.rows.length*L.rowH-10;
    for(let v=0;v<=D.max;v+=D.max>=30?10:D.max>=20?5:4){s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${gy0}" y2="${gy1}" class="${v?'grid':'axis'}"/><text x="${f1(X(v))}" y="${gy1+14}" class="t-xs t-mid">${v}%</text>`}
    D.rows.forEach(([lab,vals],i)=>{const y=L.top+i*L.rowH;
      if(N)s+=`<text x="${L.x0}" y="${y+4}" class="t-lbl" style="font-size:12px">${lab}</text>`;
      else s+=`<text x="${L.x0+L.lw-8}" y="${y+(vals.length>1?18:14)}" class="t-lbl t-end" style="font-size:12.5px">${lab}</text>`;
      vals.forEach((v,j)=>{const by=y+(N?10:0)+j*(N?22:20),h=N?16:15,w=L.bw*v/D.max*k,c=D.ser[j][1];
        s+=`<rect x="${L.bx}" y="${by}" width="${f1(Math.max(0,w))}" height="${h}" rx="4" style="fill:${c}"/><text x="${f1(L.bx+w+6)}" y="${by+h-3.5}" class="t-xs" style="fill:var(--ink);font-weight:600">${f1(v*k)}%</text>`})});
    wsv.innerHTML=s;
    $('#whWhoCap').innerHTML=D.cap;$('#whWhoNote').innerHTML=noteHTML(D.note)}
  function setWho(k){who=k;$$('#whWhoBtns [data-who]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.who===k));
    whoStop&&whoStop();whoStop=animate(650,p=>drawWho(ease(p)),()=>{whoStop=null})}
  $('#whWhoBtns').addEventListener('click',e=>{const b=e.target.closest('[data-who]');if(b)setWho(b.dataset.who)});
  drawWho(1);

  /* ---------- burden comparator ---------- */
  const bsv=$('#whBur');let bur='world',burStop=null;
  const BUR={
    world:{title:'ALCOHOL-ATTRIBUTABLE DEATHS WORLDWIDE, MILLIONS',max:3.5,unit:'M',dec:2,
      rows:[['GBD 2016 · year 2016',2.8,'var(--brand)'],['WHO model · 2016',3.0,'var(--gold)'],['WHO model · 2019',2.6,'var(--gold)'],['GBD 2020 · year 2020',1.78,'var(--brand)']],
      cap:`Totals differ because the models and risk curves differ, not because deaths fell that fast. [[GBD2016Alcohol,Shield2020,Shield2025,GBD2020Alcohol]]`,
      note:{k:'Burden · the world',t:'Millions of deaths a year, by any model',
        txt:`GBD 2016 attributed 2.8 million deaths in 2016 to alcohol use [[GBD2016Alcohol]]. The WHO comparative risk model gave 3.0 million for 2016, 5.3% of all deaths, with 52.4% of alcohol-attributable deaths in people under 60 and 17.7% of all injury deaths caused by alcohol [[Shield2020]]; its update gave 2.6 million (4.7%) for 2019 [[Shield2025]]. GBD 2020 estimated 1.78 million for 2020, and 1.34 billion people drinking harmful amounts. [[GBD2020Alcohol]]`,
        pt:`Alcohol causes millions of deaths every year around the world. Experts disagree on the exact number, not on the scale.`,
        hook:`Pair every global figure with its model: GBD 2016 2.8 M (2016); WHO model 3.0 M (2016), 2.6 M (2019); GBD 2020 1.78 M (2020).`}},
    young:{title:'SHARE OF DEATHS ATTRIBUTABLE TO ALCOHOL, AGES 15–49 (GBD 2016)',max:14,unit:'%',dec:1,
      rows:[['Men · deaths',12.2,'var(--accent)'],['Women · deaths',3.8,'var(--accent)'],['Men · DALYs',8.9,'var(--brand)'],['Women · DALYs',2.3,'var(--brand)']],
      cap:`At ages 15–49 alcohol was the leading risk factor for death worldwide in 2016. [[GBD2016Alcohol]]`,
      note:{k:'Burden · young and middle-aged adults',t:'The leading risk factor at ages 15–49',
        txt:`In 2016, alcohol caused 12.2% of male and 3.8% of female deaths at ages 15–49, and 8.9% and 2.3% of DALYs. The leading attributable causes of death in this age group were tuberculosis (1.4% of total deaths), road injuries (1.2%) and self-harm (1.1%). At ages 50 and older, cancers made up 27.1% of alcohol-attributable female deaths and 18.9% of male deaths. [[GBD2016Alcohol]]`,
        pt:`For people aged 15 to 49, nothing else on the list of risk factors caused as many deaths as alcohol.`,
        hook:`GBD 2016: alcohol = 7th leading risk factor overall, 1st at ages 15–49 (12.2% of male deaths). [[GBD2016Alcohol]]`}},
    us:{title:'US DEATHS FROM EXCESSIVE DRINKING, PER YEAR (CDC)',max:200000,unit:'',dec:0,
      rows:[['2016–2017, all',137927,'var(--muted)'],['2020–2021, all',178307,'var(--accent)'],['2020–2021, chronic causes',117245,'var(--liver)'],['2020–2021, acute causes',61063,'var(--gold)']],
      cap:`About 488 deaths a day in 2020–2021. Among adults aged 20–64 in 2015–2019, about 1 in 8 deaths. [[Esser2024MMWR,Esser2022JNO]]`,
      note:{k:'Burden · the United States',t:'Up 29.3% in four years',
        txt:`Average annual deaths from excessive drinking rose from 137,927 in 2016–2017 to 178,307 in 2020–2021, and the age-standardised rate from 38.1 to 47.6 per 100,000. Deaths among women rose 34.7% and among men 26.8%. Leading chronic causes were alcohol-associated liver disease (48,972 a year) and heart disease and stroke (37,317); leading acute causes were alcohol poisonings (21,806) and motor-vehicle crashes (15,055) [[Esser2024MMWR]]. Among adults aged 20–49, about 1 in 5 deaths (20.3%) were attributable to excessive drinking. [[Esser2022JNO]]`,
        pt:`In the US, excessive drinking causes about 1 in 8 deaths between ages 20 and 64. Alcohol poisoning is an emergency: call emergency services.`,
        hook:`CDC: 178,307 US deaths a year from excessive drinking in 2020–2021, about 488 a day. [[Esser2024MMWR]]`}},
    life:{title:'MEN TREATED FOR AUD: STANDARDISED MORTALITY RATIO AT 10 YEARS',max:20,unit:'×',dec:1,
      rows:[['Mental disorders',18.0,'var(--dx)'],['Liver cirrhosis',14.8,'var(--liver)'],['Injury',6.6,'var(--gold)'],['Cancer, cardiovascular (about)',2,'var(--muted)']],
      cap:`Meta-analysis of 17 cohorts (28,087 patients). SMR 1 = the general-population rate. Ratios were higher still in women, from fewer studies. [[Roerecke2014]]`,
      note:{k:'Burden · a shorter life',t:'24–28 years of life lost',
        txt:`In Nordic registers (1987–2006), people hospitalised with AUD lived 24–28 years less than the general population, an average life expectancy of 47–53 years in men and 50–58 in women, with all-cause mortality 3.0–5.2 times higher [[Westman2015]]. Among people treated for AUD, men died of liver cirrhosis at 14.8 times and of mental disorders at 18.0 times the expected rate after 10 years. [[Roerecke2014]] These are population statistics from people hospitalised or treated, not a prediction for anyone.`,
        pt:`On average, people treated in hospital for AUD have died decades earlier than others. Treatment and stopping or cutting down can change a person's own path.`,
        hook:`Nordic registers: life expectancy 24–28 years shorter after hospitalisation for AUD. [[Westman2015]]`}}};
  const fmtB=(v,D)=>D.unit==='M'?f1(v)+(v===1.78?'':'')+' M':D.unit==='%'?f1(v)+'%':D.unit==='×'?f1(v)+'×':Math.round(v).toLocaleString('en-US');
  function drawBur(k){const N=vb(bsv,'720 300','400 400'),D=BUR[bur];let s='';
    const L=N?{x0:16,bx:16,bw:290,top:46,rowH:72}:{x0:24,bx:270,bw:360,top:50,rowH:54};
    s+=N?whWrap(D.title,46).map((l,i)=>`<text x="16" y="${20+i*13}" class="t-sm" style="fill:var(--brand)">${l}</text>`).join(''):`<text x="24" y="22" class="t-sm" style="fill:var(--brand)">${D.title}</text>`;
    const X=v=>L.bx+L.bw*v/D.max;
    D.rows.forEach(([lab,v,c],i)=>{const y=L.top+i*L.rowH+(N?10:0);
      if(N)s+=`<text x="16" y="${y+10}" class="t-lbl" style="font-size:12px">${lab}</text>`;else s+=`<text x="${L.bx-10}" y="${y+18}" class="t-lbl t-end" style="font-size:12.5px">${lab}</text>`;
      const by=y+(N?18:4),w=L.bw*v/D.max*k;
      s+=`<rect x="${L.bx}" y="${by}" width="${f1(L.bw)}" height="20" rx="5" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${by}" width="${f1(w)}" height="20" rx="5" style="fill:${c}"/>`;
      const v2=D.unit==='M'?(Math.round(v*k*100)/100):v*k;s+=`<text x="${f1(L.bx+w+7)}" y="${by+14.5}" class="t-xs" style="fill:var(--ink);font-weight:600">${D.unit==='M'?(Math.round(v2*100)/100).toFixed(v===1.78?2:1)+' M':fmtB(v2,D)}</text>`;
      if(bur==='life'&&!N)s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${by-3}" y2="${by+23}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 2"/>`});
    if(bur==='life'){const yy=L.top+4*L.rowH+(N?12:4);s+=`<text x="${N?16:L.bx}" y="${yy}" class="t-xs">${N?'':'dashed line: SMR 1, the general-population rate · '}Nordic registers: life expectancy 24–28 years shorter</text>`}
    if(bur==='us'){const yy=L.top+4*L.rowH+(N?12:4);s+=`<text x="${N?16:L.bx}" y="${yy}" class="t-xs">≈ 488 deaths a day in 2020–2021 · +29.3% vs 2016–2017</text>`}
    bsv.innerHTML=s;$('#whBurCap').innerHTML=D.cap;$('#whBurNote').innerHTML=noteHTML(D.note)}
  function setBur(k){bur=k;$$('#whBurBtns [data-bur]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.bur===k));
    burStop&&burStop();burStop=animate(700,p=>drawBur(ease(p)),()=>{burStop=null})}
  $('#whBurBtns').addEventListener('click',e=>{const b=e.target.closest('[data-bur]');if(b)setBur(b.dataset.bur)});
  drawBur(1);
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();drawWho(1);drawBur(1)};
};
