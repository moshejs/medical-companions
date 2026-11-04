/* =============== 2.3 Blood and urine markers of drinking =============== */
/* time axis: t in 0..1 maps to days on a square-root scale, 0 to 120 days */
const BM_MAXD=120,bmDay=t=>BM_MAXD*t*t,bmT=d=>Math.sqrt(clamp(d/BM_MAXD));
const bmFmtD=d=>d<1?Math.round(d*24)+' h':d<14?f1(d)+' days':d<60?f1(d/7)+' weeks':f1(d/30)+' months';
const BM_PETH0=1000,BM_PHL=7.24;/* illustrative start; mean half-life of PEth 16:0/18:1 in AUD withdrawal (de Bejczy 2026) */
/* each row: level(d) 0..1 for the shaded signal, a published range [lo,hi] in days, and a status line */
const BM_ROWS=[
 {k:'eth',n:'Ethanol',s:'breath, blood',c:'var(--eth-fill)',lo:5/24,hi:15/24,rl:'5–15 h',lv:d=>clamp(1-d*24/10),
  st:d=>{const h=d*24,v=1.5-.15*h;return v>0?['positive: '+v.toFixed(2)+' g/L','var(--bad)']:['cleared','var(--good)']}},
 {k:'etg',n:'EtG / EtS',s:'urine',c:'var(--acet)',lo:40/24,hi:130/24,rl:'40–130 h',lv:d=>d<40/24?1:clamp(1-(d-40/24)/(130/24-40/24))*.8,
  st:d=>d<40/24?['positive','var(--bad)']:d<130/24?['may still be positive','var(--warn)']:['usually negative','var(--good)']}},
 {k:'peth',n:'PEth',s:'whole blood',c:'var(--dx)',lo:28,hi:42,rl:'still seen in week 4',lv:d=>{const p=BM_PETH0*Math.pow(.5,d/BM_PHL);return clamp(Math.log(p/20)/Math.log(BM_PETH0/20))},
  st:d=>{const p=BM_PETH0*Math.pow(.5,d/BM_PHL);return [Math.round(p)+' ng/mL'+(p>=200?' · heavy band':p>=20?' · significant band':' · light or none band'),p>=20?'var(--warn)':'var(--good)']}},
 {k:'cdt',n:'CDT',s:'serum',c:'var(--gaba-fill)',lo:15,hi:15,rl:'half-life ~15 d',lv:d=>Math.pow(.5,d/15),
  st:d=>[Math.round(100*Math.pow(.5,d/15))+'% of the rise left','var(--warn)']},
 {k:'ggt',n:'GGT',s:'serum',c:'var(--liver)',lo:14,hi:21,rl:'2–3 weeks',lv:d=>d<14?1-d/28:clamp(.5*(1-(d-14)/7)),
  st:d=>d<14?['may still be raised','var(--warn)']:d<21?['normalising','var(--warn)']:['usually normal','var(--good)']}},
 {k:'mcv',n:'MCV',s:'red cell size',c:'var(--accent)',lo:60,hi:120,rl:'2–4 months',lv:d=>d<60?1-d/120:clamp(.5*(1-(d-60)/60)),
  st:d=>d<60?['still raised','var(--warn)']:d<120?['normalising','var(--warn)']:['usually normal','var(--good)']}}];
const BM_STEPS=[
 {from:0,at:.055,k:'Hours',t:'Ethanol itself: hours',
  txt:`Ethanol in breath, blood or urine shows only current or very recent drinking, because it is eliminated at about 0.15 g/L an hour (range 0.1–0.3). From an illustrative 1.5 g/L that is about 10 hours, anywhere from 5 to 15. People with AUD in detoxification may clear 25–35 mg/100 mL an hour, because CYP2E1 activity is raised. A blood ethanol above 1.5‰ without obvious intoxication indicates tolerance. [[Jones2024BiomarkerHistory,Jones2010,Niemela2016Biomarkers]]`,
  pt:`The body removes alcohol at a fairly steady pace, so it can take many hours to clear. No calculator can tell you whether it is safe to drive.`,
  hook:`Ethanol elimination ≈ 0.15 g/L/h (zero-order above about 20 mg/100 mL); faster in AUD because of CYP2E1 induction.`},
 {from:.1,at:.165,k:'Days',t:'Urine EtG and EtS: days',
  txt:`EtG and EtS are minor conjugated metabolites that stay in urine far longer than ethanol. In 32 people in detoxification, urinary EtG stayed above 0.5 mg/L for 40 to 130 hours, median 78. After lighter drinking, a positive EtG (100 ng/mL clinical, 500 ng/mL forensic) reflects roughly the prior 1 to 3 days; at 48 hours sensitivity was poor whatever the dose. Trace exposures can turn low cut-offs positive. [[Helander2009EtG,Hahn2016PEth,Jatlow2014EtG,Thierauf2009TraceEtG]]`,
  pt:`A urine test can show drinking from the last few days. Some urine tests can turn positive after tiny amounts of alcohol, so results need a careful talk.`,
  hook:`Urine EtG: median about 3 days (78 h) after heavy drinking; measuring both EtG and EtS is usually unnecessary.`},
 {from:.25,at:.4,k:'2–3 weeks',t:'GGT and CDT: weeks',
  txt:`GGT is sensitive to drinking but not specific, and raised values in heavy drinkers usually return to normal within 2–3 weeks of abstinence. CDT is a specific marker of chronic heavy drinking: it needs at least 50–80 g a day for several weeks to rise, and its half-life is about 15 days. In heavy drinkers, sensitivity was 58% for GGT and 63% for CDT, and 90% for the combined GGT-CDT. [[Niemela2016Biomarkers,Arnts2021LiverBiomarkers,Hietala2006GGTCDT]]`,
  pt:`Some liver blood tests rise with heavy drinking and settle down within a few weeks of stopping. They can also be raised for other reasons.`,
  hook:`GGT normalises in 2–3 weeks; CDT half-life ≈ 15 days and needs 50–80 g/day for weeks to rise.`},
 {from:.45,at:.5,k:'Weeks',t:'PEth: a direct marker for weeks',
  txt:`PEth is a phospholipid made in red blood cell membranes only when ethanol is present, which makes it a direct marker. It correlates best with drinking in the past 2 weeks. In 100 people with AUD in withdrawal treatment its mean half-life was 7.24 days, and it was still detectable in the fourth week of abstinence. Watch the illustrative 1,000 ng/mL fall through the bands; very high starting values can stay positive past 30 days. [[Hahn2016PEth,Helander2019PEthDose,deBejczy2026PEth]]`,
  pt:`A blood test called PEth can show drinking from the last few weeks.`,
  hook:`PEth is a direct marker (formed only with ethanol); half-life about 4–7 days; detectable for weeks after heavy drinking.`},
 {from:.62,at:.8,k:'Months',t:'MCV: months',
  txt:`MCV, the average size of red blood cells, rises with ethanol intake in a dose-dependent way and may take 2–4 months to normalise after stopping. Its sensitivity in heavy drinkers was only 45%. Traditional markers are more likely to be raised in people over 30 and in regular drinkers with a longer drinking history. Hair EtG looks back over months too: about 1 cm of hair a month. [[Niemela2016Biomarkers,Hietala2006GGTCDT,Conigrave2003Markers,Crunelle2014HairEtG]]`,
  pt:`Some blood count changes take months to go back to normal after heavy drinking stops.`,
  hook:`MCV normalises over 2–4 months; low sensitivity (45%).`},
 {from:.9,at:1,k:'The limits',t:'No marker diagnoses AUD',
  txt:`Tests can confirm recent or heavy drinking, but alcohol use disorder is a clinical diagnosis based on criteria; biomarkers were considered for DSM-5 and left out. Indirect markers are affected by age, sex, other substances and illness. In people with liver disease, PEth, urine EtG and hair EtG were the most useful. [[Hasin2013,Niemela2016Biomarkers,Wurst2015Metabolites,Arnts2021LiverBiomarkers]]`,
  pt:`Blood and urine tests can show recent drinking, but no blood test can diagnose alcohol use disorder by itself.`,
  hook:`Direct markers: EtG, EtS, PEth, FAEE. Indirect: GGT, MCV, CDT, AST/ALT.`}];
/* the "which marker?" chooser */
const BM_CARDS=[
 {id:'eth',tag:'Ethanol',h:'Breath or blood alcohol',p:'Current or very recent drinking only; cleared in hours. [[Jones2024BiomarkerHistory]]',ss:'window: hours'},
 {id:'etg',tag:'EtG / EtS',h:'Urine ethyl glucuronide',p:'Drinking in roughly the past 1–3 days; trace exposure and “non-alcoholic” beer can exceed low cut-offs. [[Hahn2016PEth,Thierauf2010BeerEtG]]',ss:'liver disease: sens 70–89%, spec 93–99% [[Arnts2021LiverBiomarkers]]'},
 {id:'peth',tag:'PEth',h:'Phosphatidylethanol',p:'Drinking over about the past 2–4 weeks; correlates best with the past 2 weeks. [[Helander2019PEthDose,deBejczy2026PEth]]',ss:'liver disease: sens 73–100%, spec 90–96% [[Arnts2021LiverBiomarkers]]'},
 {id:'cdt',tag:'CDT',h:'Carbohydrate-deficient transferrin',p:'Heavy drinking (at least 50–80 g a day) over several weeks. [[Niemela2016Biomarkers]]',ss:'liver disease: sens 40–79%, spec 57–99% [[Arnts2021LiverBiomarkers]]'},
 {id:'ggt',tag:'GGT',h:'Gamma-glutamyltransferase',p:'Sensitive to heavy drinking but not specific (other liver disease, obesity); combined with CDT it reached 90% sensitivity. [[Niemela2016Biomarkers,Hietala2006GGTCDT]]',ss:'heavy drinkers: sens 58% [[Hietala2006GGTCDT]]'},
 {id:'mcv',tag:'MCV',h:'Mean corpuscular volume',p:'Long-term heavy drinking; slow to normalise (2–4 months). [[Niemela2016Biomarkers]]',ss:'heavy drinkers: sens 45% [[Hietala2006GGTCDT]]'},
 {id:'hair',tag:'Hair EtG',h:'EtG in scalp hair',p:'Chronic drinking over months: a 3 cm proximal segment covers about 3 months. ≥30 pg/mg strongly suggests chronic excessive drinking. [[Arnts2021LiverBiomarkers,Favretto2026SoHT]]',ss:'liver disease: sens 85–100%, spec 97–100% [[Arnts2021LiverBiomarkers]]'},
 {id:'ast',tag:'AST:ALT',h:'The enzyme ratio',p:'A ratio above 2 suggests advanced alcohol-related liver disease, not heavy drinking itself. [[Nyblom2004ASTALT]]',ss:'ratio &gt;2 in 70% of alcohol-related hepatitis and cirrhosis [[Cohen1979SGOTSGPT]]'}];
const BM_QS=[
 {id:'now',q:'Drinking now or in the last few hours?',m:['eth'],a:`Only ethanol itself answers this: it is cleared in hours, at about 0.15 g/L an hour. [[Jones2024BiomarkerHistory]]`},
 {id:'days',q:'Any drinking in the last 1–3 days?',m:['etg','peth'],a:`Urine EtG covers roughly the past 1–3 days, and is always positive 12 hours after drinking at 100–200 ng/mL cut-offs; sensitivity falls by 24–48 hours after low doses. PEth also picks up recent drinking, but over a longer window. [[Hahn2016PEth,Jatlow2014EtG]]`},
 {id:'weeks',q:'Drinking over the past 2–4 weeks?',m:['peth'],a:`PEth is the marker for weeks: it correlates best with the past 2 weeks and stays detectable into week 4 after heavy drinking. In 300 volunteers, no PEth was found in those reporting abstinence. [[deBejczy2026PEth,Schrock2017PEth]]`},
 {id:'heavy',q:'Heavy drinking over several weeks?',m:['cdt','ggt','peth'],a:`CDT needs at least 50–80 g a day for weeks; GGT is sensitive but non-specific. Combining CDT and GGT gave the best accuracy for 60 g a day or more in men; in women, GGT alone was best. PEth at 80 ng/mL was 91% sensitive for an average of 4 or more drinks a day in liver disease. [[Niemela2016Biomarkers,Chen2003CDTGGT,Stewart2014PEth]]`},
 {id:'months',q:'Chronic drinking over the past 3–6 months?',m:['hair','mcv'],a:`Hair EtG looks back months: 85–100% sensitive and 97–100% specific for chronic excessive use over 3 to 6 months in liver disease. MCV changes slowly but is insensitive (45%). [[Arnts2021LiverBiomarkers,Hietala2006GGTCDT]]`},
 {id:'liver',q:'Advanced alcohol-related liver disease?',m:['ast','ggt'],a:`A high AST:ALT ratio points to advanced alcohol-related liver disease rather than heavy drinking: in withdrawal admissions the ratio was usually 1.0 or less (64%), while 69% of people with alcohol-related cirrhosis had 2 or more. Liver care is covered in <a href="#liver" data-go="liver">The liver</a>. [[Nyblom2004ASTALT]]`}];

inits.biomarkers=()=>{
  const svg=$('#bmSvg'),rg=$('#bmT'),note=$('#bmNote');
  function draw(t){const N=vb(svg,'720 380','400 600'),p=phaseOf(BM_STEPS,t),d=bmDay(t);setSt(p);note.innerHTML=noteHTML(BM_STEPS[p]);
    const L=N?{x0:14,x1:386,top:66,pitch:82,bar:24,ax:576}:{x0:186,x1:704,top:52,pitch:46,bar:20,ax:340};
    const X=dd=>L.x0+(L.x1-L.x0)*bmT(dd);let s='';
    s+=`<text x="14" y="${N?24:26}" class="t-sm" style="fill:var(--dx);font-weight:600">TIME SINCE HEAVY DRINKING STOPPED</text>`;
    s+=`<text x="${N?14:704}" y="${N?50:28}" class="${N?'':'t-end'}" style="font:800 ${N?22:24}px var(--display);fill:var(--ink)">${bmFmtD(d)}</text>`;
    BM_ROWS.forEach((r,i)=>{const y=L.top+i*L.pitch,by=N?y+20:y,on=[['eth'],['etg'],['ggt','cdt'],['peth'],['mcv'],[]][p].includes(r.k)||p===5,st=r.st(d);
      /* label column (wide) or label line (narrow) */
      if(N){s+=`<text x="14" y="${y+12}" class="t-lbl" style="${on?'':'fill:var(--muted)'}">${r.n} <tspan class="t-xs">${r.s}</tspan></text><text x="386" y="${y+12}" class="t-xs t-end" style="fill:${st[1]};font-weight:600">${st[0]}</text>`}
      else{s+=`<text x="14" y="${y+4}" class="t-lbl" style="${on?'':'fill:var(--muted)'}">${r.n}</text><text x="${14+r.n.length*7.6+8}" y="${y+4}" class="t-xs">${r.s}</text><text x="14" y="${y+19}" class="t-xs" style="fill:${st[1]};font-weight:600">${st[0]}</text>`}
      s+=`<rect x="${L.x0}" y="${f1(by-L.bar/2+(N?0:6))}" width="${L.x1-L.x0}" height="${L.bar}" rx="5" style="fill:var(--panel-2)"/>`;
      const segs=90,yy=by-L.bar/2+(N?0:6);
      for(let k=0;k<segs;k++){const u0=k/segs,u1=(k+1)/segs,dm=BM_MAXD*Math.pow((u0+u1)/2,2),lv=r.lv(dm);if(lv<=.01)continue;
        s+=`<rect x="${f1(L.x0+(L.x1-L.x0)*u0)}" y="${f1(yy)}" width="${f1((L.x1-L.x0)/segs+.4)}" height="${L.bar}" style="fill:${r.c};opacity:${f1((on?.2:.1)+lv*(on?.7:.35))}"/>`}
      /* published range bracket */
      const a=X(r.lo),b=X(r.hi),ry=yy+L.bar+4;
      if(r.hi>r.lo)s+=`<path d="M${f1(a)} ${f1(ry)}v4H${f1(b)}v-4" style="fill:none;stroke:${on?'var(--ink)':'var(--muted)'};stroke-width:1.2"/>`;
      else s+=`<path d="M${f1(a)} ${f1(ry)}v5" style="stroke:${on?'var(--ink)':'var(--muted)'};stroke-width:1.2"/>`;
      const lx=clamp((a+b)/2,L.x0+40,L.x1-40);s+=`<text x="${f1(lx)}" y="${f1(ry+(N?15:14))}" class="t-xs t-mid" style="${on?'fill:var(--ink)':''}">${r.rl}</text>`;
      /* the marker's level at the cursor */
      const lv=r.lv(d),cx=X(d);s+=`<circle cx="${f1(cx)}" cy="${f1(yy+L.bar/2)}" r="${on?6:4.5}" style="fill:${lv>.05?r.c:'var(--panel)'};stroke:var(--ink);stroke-width:1.4"/>`});
    /* axis */
    const ticks=[[.5,'12 h'],[1,'1 d'],[3,'3 d'],[7,'1 wk'],[14,'2 wk'],[28,'4 wk'],[56,'8 wk'],[120,'4 mo']];
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    ticks.forEach(([dd,l])=>{const x=X(dd);if(N&&dd===.5)return;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ax}" y2="${L.ax+5}" class="axis"/><text x="${f1(x)}" y="${L.ax+17}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${L.x0}" y="${L.ax+17}" class="t-xs t-mid">0</text>`;
    const cx=X(d);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.top-(N?6:22)}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3;opacity:.7"/><path d="M${f1(cx)} ${L.ax}l-6 9h12Z" style="fill:var(--ink)"/>`;
    svg.innerHTML=s}
  const stop=playWire(rg,$('#bmPlay'),draw,26000,'Replay','biomarkers');
  const setSt=stepWire($('#bmSteps'),BM_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- which marker? ---------- */
  const qs=$('#bmQs'),cards=$('#bmCards'),qn=$('#bmQNote');let q=store.get('bm:q','weeks');if(!BM_QS.some(x=>x.id===q))q='weeks';
  qs.innerHTML=BM_QS.map(x=>`<button class="btn" data-bmq="${x.id}" aria-pressed="${x.id===q}">${x.q}</button>`).join('');
  cards.innerHTML=BM_CARDS.map(c=>`<div class="card" data-bmc="${c.id}"><span class="tag dx">${c.tag}</span><h4>${c.h}</h4><p>${c.p}</p><span class="bmss">${c.ss}</span></div>`).join('');
  function setQ(id){q=id;store.set('bm:q',id);const Q=BM_QS.find(x=>x.id===id);
    $$('[data-bmq]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.bmq===id));
    $$('[data-bmc]',cards).forEach(c=>{const m=Q.m.includes(c.dataset.bmc);c.classList.toggle('on',m);c.classList.toggle('dim',!m)});
    qn.innerHTML=`<div class="kicker">Question</div><h4>${Q.q}</h4><p>${Q.a}</p><div class="pt"><b>In plain words</b>Different tests look back over different lengths of time. None of them can say whether someone has alcohol use disorder. [[Hasin2013]]</div>`}
  qs.addEventListener('click',e=>{const b=e.target.closest('[data-bmq]');if(b)setQ(b.dataset.bmq)});
  setQ(q);

  /* ---------- PEth band reader ---------- */
  const ps=$('#bmPeth'),pv=$('#bmPv'),pn=$('#bmPethNote');
  const lo=Math.log(5),hi=Math.log(3000),val=u=>Math.exp(lerp(lo,hi,u));
  function drawP(){const v=val(+pv.value),N=vb(ps,'720 210','400 300');const x0=N?16:30,x1=N?384:690,X=w=>x0+(x1-x0)*(Math.log(w)-lo)/(hi-lo);let s='';
    s+=`<text x="${x0}" y="16" class="t-sm" style="fill:var(--dx);font-weight:600">PEth ${v<100?f1(v):Math.round(v)} ng/mL</text>`;
    const B=[[5,20,'var(--good)','light or none'],[20,200,'var(--warn)','significant'],[200,3000,'var(--bad)','heavy']];
    B.forEach(([a,b,c,l])=>{const on=v>=a&&(v<b||b===3000);s+=`<rect x="${f1(X(a))}" y="28" width="${f1(X(b)-X(a))}" height="22" style="fill:${c};opacity:${on?.8:.25}"/><text x="${f1((X(a)+X(b))/2)}" y="43" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${l}</text>`});
    [5,10,20,50,100,200,500,1000,2000,3000].forEach(w=>{if(N&&[10,50,500,3000].includes(w))return;s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="50" y2="55" class="axis"/><text x="${f1(X(w))}" y="66" class="t-xs t-mid">${w>=1000?w/1000+'k':w}</text>`});
    const M=[[20,'20','liver disease, any drinking',0],[80,'80','≥4 drinks/day, liver disease',1],[210,'210','Swedish “excessive”',2],[250,'250','critical care: misuse',3],[400,'400','severe misuse',4]];
    M.forEach(([w,l,d,i])=>{const x=X(w),yy=N?80+i*13:78+(i%2)*13;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="26" y2="${yy-8}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 2;opacity:.6"/>`;
      if(!N)s+=`<text x="${f1(x+(i===2?-3:3))}" y="${yy}" class="t-xs ${i===2?'t-end':''}">${l}${i===1||i===3?'':''}</text>`});
    if(N)M.forEach(([w,l,d],i)=>s+=`<text x="${x0}" y="${80+i*13}" class="t-xs">${l} ng/mL: ${d}</text>`);
    const nx=X(v);s+=`<path d="M${f1(nx)} 52l-6 10h12Z" style="fill:var(--ink)" transform="translate(0 -26) rotate(180 ${f1(nx)} 57)"/><line x1="${f1(nx)}" x2="${f1(nx)}" y1="24" y2="54" style="stroke:var(--ink);stroke-width:2.4"/>`;
    /* decay to below 20 ng/mL at the published half-lives */
    const cy=N?160:118,ch=N?110:76,cw=x1-x0,days=v>20?BM_PHL*Math.log2(v/20):0,dlo=v>20?3.7*Math.log2(v/20):0,dhi=v>20?10.4*Math.log2(v/20):0,DM=Math.max(30,Math.ceil(dhi/10)*10),DX=dd=>x0+cw*dd/DM,PY=w=>cy+ch-ch*(Math.log(Math.max(w,5))-lo)/(Math.log(Math.max(v,25))-lo);
    s+=`<text x="${x0}" y="${cy-8}" class="t-xs">If no further drinking: days to fall below 20 ng/mL (half-life 7.24 d; band 3.7–10.4 d)</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${cy+ch}" y2="${cy+ch}" class="axis"/><line x1="${x0}" x2="${x1}" y1="${f1(PY(20))}" y2="${f1(PY(20))}" style="stroke:var(--good);stroke-dasharray:3 3"/>`;
    if(v>20){[[10.4,.25],[3.7,.25],[BM_PHL,1]].forEach(([hl,o])=>{let d='';for(let k=0;k<=60;k++){const dd=DM*k/60,w=v*Math.pow(.5,dd/hl);d+=(k?'L':'M')+f1(DX(dd))+' '+f1(PY(w))}s+=`<path d="${d}" style="fill:none;stroke:var(--dx);stroke-width:${o===1?2.4:1.4};opacity:${o===1?1:.5}"/>`});
      s+=`<circle cx="${f1(DX(days))}" cy="${f1(PY(20))}" r="5" style="fill:var(--dx);stroke:var(--panel);stroke-width:2"/><text x="${f1(Math.min(DX(days)+8,x1-60))}" y="${f1(PY(20)-8)}" class="t-xs" style="fill:var(--dx);font-weight:600">≈${Math.round(days)} d</text>`}
    for(let dd=0;dd<=DM;dd+=DM>60?20:10)s+=`<text x="${f1(DX(dd))}" y="${cy+ch+13}" class="t-xs t-mid">${dd}${dd===DM?' d':''}</text>`;
    ps.innerHTML=s;
    const band=v>=200?'heavy consumption':v>=20?'significant consumption':'light or no consumption';
    pn.innerHTML=`<div class="kicker">Teaching reading · not an interpretation of anyone's result</div><div style="display:flex;gap:12px;align-items:baseline;flex-wrap:wrap"><span class="bmbig">${v<100?f1(v):Math.round(v)}</span><b>ng/mL · proposed band: ${band}</b></div>
      <p>Bands as proposed: under 20 ng/mL light or no consumption, 20–199 significant, over 200 heavy. Other cut-offs differ: 210 ng/mL (0.3 µmol/L) is the Swedish “excessive” cut-off, and a mixed cohort including critically ill patients found optima of 250 and 400 ng/mL. [[Ulwelling2018PEth,Hahn2016PEth,Afshar2017PEth]]</p>
      <p>${v>20?`At a 7.24-day half-life this value would fall below 20 ng/mL after about ${Math.round(days)} days (${Math.round(dlo)}–${Math.round(dhi)} at half-lives of 3.7–10.4 days).${v>2000?' Values this high may still be positive after 30 days, so PEth alone cannot date the last drink.':''} [[deBejczy2026PEth,Helander2019PEthElimination,Hahn2016PEth]]`:'Below 20 ng/mL. In 300 volunteers, PEth was not detected in anyone reporting abstinence, and 95% of moderate drinkers by AUDIT-C were between not detected and 112 ng/mL. [[Schrock2017PEth]]'}</p>
      <div class="hook"><b>Exam hook</b>A change of about 20 g a day in intake shifted PEth by about 0.10 µmol/L on average, with large differences between people. [[Helander2019PEthDose]]</div>`}
  pv.addEventListener('input',drawP);drawP();

  /* ---------- AST:ALT ---------- */
  const as=$('#bmAs'),al=$('#bmAl'),av=$('#bmAst'),an=$('#bmAstNote');
  function drawA(){const A=+as.value,B=+al.value,r=A/B,N=vb(av,'720 150','400 160');const x0=N?16:30,x1=N?384:690,X=v=>x0+(x1-x0)*clamp(v/4);let s='';
    s+=`<text x="${x0}" y="18" class="t-sm" style="fill:var(--dx);font-weight:600">AST ${A} ÷ ALT ${B} = ${r.toFixed(2)}</text>`;
    [[0,1,'var(--good)','≤1.0'],[1,2,'var(--warn)','1–2'],[2,4,'var(--bad)','>2']].forEach(([a,b,c,l])=>{const on=r>a&&(r<=b||b===4);s+=`<rect x="${f1(X(a))}" y="32" width="${f1(X(b)-X(a))}" height="24" style="fill:${c};opacity:${on?.75:.22}"/><text x="${f1((X(a)+X(b))/2)}" y="48" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${l}</text>`});
    [0,1,2,3,4].forEach(v=>s+=`<text x="${f1(X(v))}" y="72" class="t-xs t-mid">${v}${v===4?'+':''}</text>`);
    const nx=X(r);s+=`<line x1="${f1(nx)}" x2="${f1(nx)}" y1="26" y2="60" style="stroke:var(--ink);stroke-width:2.6"/><circle cx="${f1(nx)}" cy="26" r="5" style="fill:var(--ink)"/>`;
    const notes=N?[['Withdrawal admissions: 64% had ≤1.0',X(.5)],['Alcohol-related cirrhosis: 69% had ≥2',X(3)]]:[['Most withdrawal admissions (64%) ≤1.0',X(.5)],['69% of alcohol-related cirrhosis ≥2',X(3)]];
    notes.forEach(([l,x],i)=>s+=`<text x="${f1(N?x0:x)}" y="${96+i*16}" class="t-xs ${N?'':'t-mid'}" style="fill:${i?'var(--bad)':'var(--good)'}">${l}</text>`);
    s+=`<text x="${x0}" y="${N?140:136}" class="t-xs">Cohen 1979: ratio >2 in 70% of alcohol-related hepatitis and cirrhosis vs 4% of viral hepatitis.</text>`;
    av.innerHTML=s;
    an.innerHTML=`<div class="kicker">AST:ALT ${r.toFixed(2)}</div><h4>${r>2?'Above 2: a pattern of advanced alcohol-related liver disease':r>1?'Between 1 and 2':'1.0 or less: the usual finding in heavy drinking'}</h4>
      <p>In 1979, an AST:ALT ratio above 2 was found in 70% of patients with alcohol-related hepatitis and cirrhosis, 26% with postnecrotic cirrhosis, 8% with chronic hepatitis and 4% with viral hepatitis. Among people with AUD admitted for withdrawal, the ratio was 1.0 or less in 64% and only exceptionally 2 or more, while 69% of people with alcohol-related cirrhosis had 2 or more. [[Cohen1979SGOTSGPT,Nyblom2004ASTALT]]</p>
      <div class="pt"><b>In plain words</b>This ratio tells doctors more about the liver's health than about how much someone drinks.</div>
      <div class="hook"><b>Exam hook</b>AST:ALT &gt;2 suggests advanced alcohol-related liver disease, not just heavy drinking. [[Nyblom2004ASTALT,Cohen1979SGOTSGPT]]</div>`}
  as.addEventListener('input',drawA);al.addEventListener('input',drawA);drawA();
  {const prevR=redraws.biomarkers;redraws.biomarkers=()=>{prevR&&prevR();drawP();drawA()}}
};
