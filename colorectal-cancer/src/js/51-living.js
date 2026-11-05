/* =============== 5.1 Living with colorectal cancer =============== */
const LV_REC=[12,14,8,5,3];
const LV_SCHED={
 asco:{n:'ASCO 2013',cea:{range:true},ct:[12,24,36],sc:[12],
  note:`ASCO's endorsement of the Cancer Care Ontario guideline: history, examination and CEA every 3–6 months for 5 years (toward the more frequent end for higher-risk patients); CT chest/abdomen yearly for 3 years in most cases; colonoscopy 1 year after surgery, then every 5 years depending on findings; no PET for routine surveillance. [[Meyerhardt2013]]`},
 facs:{n:'FACS · CEA + CT arm',cea:{pts:[3,6,9,12,15,18,21,24,30,36,42,48,54,60]},ct:[6,12,18,24,36,48,60],sc:[],
  note:`FACS schedule: CEA every 3 months for 2 years, then every 6 months for 3 years; CT every 6 months for 2 years, then yearly for 3 years. Curative-intent surgery for recurrence was 6.6% in the CEA + CT arm vs 2.3% with minimum follow-up, but deaths did not differ significantly (18.2% intensive vs 15.9% minimum). Colonoscopy timing is not part of the schedule summarised here. [[Primrose2014]]`},
 colhi:{n:'COLOFOL · high-frequency',cea:{pts:[6,12,18,24,36]},ct:[6,12,18,24,36],sc:[],
  note:`COLOFOL high-frequency arm: CT and CEA at 6, 12, 18, 24 and 36 months. 5-year overall mortality 13.0% vs 14.1% with the low-frequency arm (risk difference 1.1%, P = 0.43). Colonoscopy is not part of the comparison summarised here. [[WilleJorgensen2018]]`},
 collo:{n:'COLOFOL · low-frequency',cea:{pts:[12,36]},ct:[12,36],sc:[],
  note:`COLOFOL low-frequency arm: CT and CEA at 12 and 36 months only. Cancer-specific mortality was 11.4% vs 10.6% in the high-frequency arm, and recurrence 19.4% vs 21.6%: no significant survival difference. [[WilleJorgensen2018]]`}
};
const LV_STEPS=[
 {from:0,at:.06,k:'Months 0–6',t:'The plan after surgery',
  txt:`After cure-intent treatment, ASCO endorses CEA (a blood marker) every 3–6 months for 5 years, CT of chest and abdomen yearly for 3 years in most cases, and colonoscopy 1 year after surgery. If the whole bowel was not examined before diagnosis, colonoscopy should be done after adjuvant therapy, before 1 year. Surveillance tests are not advised for people who could not have surgery or systemic therapy because of severe illness. [[Meyerhardt2013]]`,
  pt:`Check-ups usually mean a blood test every few months, a scan once a year for a few years, and a colonoscopy after one year.`,
  hook:`ASCO: CEA every 3–6 months × 5 years; CT yearly × 3 years; colonoscopy at 1 year; no routine PET.`},
 {from:.1,at:.2,k:'Year 1',t:'The first colonoscopy, the riskiest months',
  txt:`In 3655 Japanese trial patients with stage II–III disease, the hazard of recurrence peaked 10.0 months after surgery for stage II and 12.8 months for stage III; liver metastasis peaked earliest, at 8.0 months. In pooled adjuvant colon trials, 12% recurred in year 1. [[Tashiro2026,Sargent2005]]`,
  pt:`The first year or two after surgery is when the cancer is most likely to come back, so tests are closest together then.`,
  hook:`Recurrence hazard peaks around 10–13 months after surgery; liver earliest (≈8 months).`},
 {from:.3,at:.5,k:'Years 2–3',t:'Most recurrences show by year 3',
  txt:`Recurrence rates were 14% in year 2 and 8% in year 3, and <b>80% of all recurrences occurred in the first 3 years</b> (18 trials, 20,898 patients). In the older fluorouracil-era trials, the median time from recurrence to death was 12 months. 5-year relapse-free survival was 87.9% for stage II and 77.0% for stage III in the Japanese trials. [[Sargent2005,Tashiro2026]]`,
  pt:`Most recurrences that happen show up in the first 3 years. Each clear check-up after that is more reassuring.`,
  hook:`80% of colon cancer recurrences happen within 3 years of surgery.`},
 {from:.6,at:.8,k:'Years 4–5',t:'Fewer tests as the risk falls',
  txt:`Recurrence rates fell to 5% in year 4 and 3% in year 5. In the ASCO schedule, yearly CT stops after 3 years while CEA continues to 5 years. ASCO also lists keeping a healthy body weight and an active lifestyle as secondary prevention. [[Sargent2005,Meyerhardt2013]]`,
  pt:`By years 4 and 5 the chance of the cancer coming back each year is small, and check-ups thin out.`,
  hook:`Annual recurrence rate, years 1–5: 12, 14, 8, 5, 3%.`},
 {from:.95,at:1,k:'The trials',t:'Does testing more often help?',
  txt:`<span class="ev est">Established</span> FACS, COLOFOL and GILDA all found that more intensive testing detects recurrence earlier, and FACS found more recurrences that could be operated on, but none showed a clear gain in overall survival. Switch schedules above to compare them. [[Primrose2014,WilleJorgensen2018,Rosati2016]]`,
  pt:`Testing more often finds a returning cancer sooner, but trials have not shown that it helps people live longer.`,
  hook:`FACS: curative surgery for recurrence 2.3% minimum vs 6.6–8% with CEA/CT, but no mortality difference.`}
];
inits.living=()=>{
  /* ===== follow-up timeline ===== */
  const svg=$('#lvSvg'),rg=$('#lvT');let sk='asco';
  const evAt=(S,kind)=>kind==='cea'?(S.cea.range?[...Array(20)].map((_,i)=>(i+1)*3):S.cea.pts):S[kind];
  function counts(S,m){const c=a=>a.filter(x=>x<=m+.001).length;
    const cea=S.cea.range?`${Math.floor(m/6+.001)}–${Math.floor(m/3+.001)}`:String(c(S.cea.pts));
    return{cea,ct:c(S.ct),sc:c(S.sc)}}
  function draw(t){
    const N=vb(svg,'720 380','400 500');const S=LV_SCHED[sk],m=t*60;
    const L=N?{x0:66,x1:386,r:[58,92,126],lx:8,yl:150,cy0:196,cb:404,ch:150,ttl:18,br:184}
             :{x0:118,x1:704,r:[58,94,130],lx:14,yl:156,cy0:198,cb:348,ch:118,ttl:22,br:186};
    const X=mm=>lerp(L.x0,L.x1,mm/60);let s='';
    s+=`<text x="${L.lx}" y="${L.ttl}" class="t-sm" style="fill:var(--brand)">${N?S.n.toUpperCase():'FOLLOW-UP · '+S.n.toUpperCase()}</text>`;
    /* year bands */
    for(let y=0;y<5;y++){const a=X(y*12),b=X(y*12+12);s+=`<rect x="${f1(a)}" y="${L.r[0]-18}" width="${f1(b-a)}" height="${L.r[2]-L.r[0]+36}" style="fill:${y%2?'var(--panel-2)':'var(--field)'};opacity:.7"/>`;
      s+=`<text x="${f1((a+b)/2)}" y="${L.yl}" class="t-xs t-mid" style="${m>=y*12?'fill:var(--ink);font-weight:700':''}">Year ${y+1}</text>`}
    for(let mm=0;mm<=60;mm+=12)s+=`<line x1="${f1(X(mm))}" x2="${f1(X(mm))}" y1="${L.r[0]-18}" y2="${L.r[2]+18}" class="axis"/>`;
    const rows=[['CEA blood test','CEA','var(--gold)'],['CT scan','CT','var(--accent)'],['Colonoscopy','Scope','var(--rx)']];
    rows.forEach((r,i)=>s+=`<text x="${L.lx}" y="${L.r[i]+4}" class="t-lbl" style="fill:${r[2]}">${N?r[1]:r[0]}</text>`);
    /* CEA */
    const ce=L.r[0];
    if(S.cea.range){s+=`<line x1="${f1(X(3))}" x2="${f1(X(60))}" y1="${ce}" y2="${ce}" style="stroke:var(--gold);stroke-width:6;opacity:.18;stroke-linecap:round"/>`;
      for(let k=1;k<=20;k++){const mm=k*3,done=mm<=m,six=mm%6===0;
        s+=`<circle cx="${f1(X(mm))}" cy="${ce}" r="${six?5:3.4}" style="fill:${done&&six?'var(--gold)':'var(--panel)'};stroke:var(--gold);stroke-width:${six?1.8:1.2};opacity:${done?1:.55}"/>`}
      if(!N)s+=`<text x="${f1(X(60))}" y="${ce-11}" class="t-xs t-end">every 3–6 months (● 6-monthly, ○ added at 3-monthly)</text>`;
      else s+=`<text x="${f1(X(60))}" y="${ce-11}" class="t-xs t-end">every 3–6 months</text>`}
    else S.cea.pts.forEach(mm=>{const done=mm<=m;s+=`<circle cx="${f1(X(mm))}" cy="${ce}" r="5" style="fill:${done?'var(--gold)':'var(--panel)'};stroke:var(--gold);stroke-width:1.8;opacity:${done?1:.55}"/>`});
    /* CT */
    S.ct.forEach(mm=>{const done=mm<=m,x=X(mm),y=L.r[1];s+=`<rect x="${f1(x-7)}" y="${y-7}" width="14" height="14" rx="3" style="fill:${done?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:1.8;opacity:${done?1:.55}"/>`;
      if(done)s+=`<circle cx="${f1(x)}" cy="${y}" r="3" style="fill:var(--panel)"/>`});
    /* colonoscopy */
    S.sc.forEach(mm=>{const done=mm<=m,x=X(mm),y=L.r[2];s+=`<circle cx="${f1(x)}" cy="${y}" r="7.5" style="fill:${done?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.8;opacity:${done?1:.55}"/><circle cx="${f1(x)}" cy="${y}" r="3" style="fill:var(--panel)"/>`});
    if(sk==='asco')s+=`<text x="${f1(X(60))}" y="${L.r[2]+4}" class="t-xs t-end">then every 5 years, per findings →</text>`;
    else s+=`<text x="${f1(X(60))}" y="${L.r[2]+4}" class="t-xs t-end">not in this schedule</text>`;
    /* recurrence bars */
    const bw=(X(12)-X(0))*.56,mx=14;
    s+=`<text x="${L.lx}" y="${L.cy0-4}" class="t-sm" style="fill:var(--tumour)">${N?'RECURRENCE RATE BY YEAR':'RECURRENCE RATE IN EACH YEAR AFTER SURGERY'}</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.cb}" y2="${L.cb}" class="axis"/>`;
    [5,10].forEach(v=>{const y=L.cb-L.ch*v/mx;s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${L.x0-6}" y="${f1(y+3)}" class="t-xs t-end">${v}%</text>`});
    LV_REC.forEach((v,i)=>{const p=ramp(m,i*12,i*12+12),cx=X(i*12+6),h=L.ch*v/mx*p;
      s+=`<rect x="${f1(cx-bw/2)}" y="${f1(L.cb-L.ch*v/mx)}" width="${f1(bw)}" height="${f1(L.ch*v/mx)}" rx="3" style="fill:none;stroke:var(--tumour);stroke-dasharray:3 3;opacity:.4"/>`;
      if(h>0)s+=`<rect x="${f1(cx-bw/2)}" y="${f1(L.cb-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:var(--tumour);opacity:${i<3?.85:.55}"/>`;
      if(p>0)s+=`<text x="${f1(cx)}" y="${f1(L.cb-L.ch*v/mx-6)}" class="t-lbl t-mid">${p>=1?v:Math.round(v*p)}%</text>`;
      s+=`<text x="${f1(cx)}" y="${L.cb+(N?34:30)}" class="t-xs t-mid" style="opacity:${m>=36&&N?0:1}">${N?'':'yr '+(i+1)}</text>`});
    /* Tashiro peak-hazard marks */
    if(m>=6&&m<30){[8,10,12.8].forEach(mm=>{const x=X(mm);s+=`<path d="M${f1(x)} ${L.cb+2}l-4 7h8z" style="fill:var(--lymph)"/>`});
      s+=`<text x="${f1(X(14.5))}" y="${L.cb+10}" class="t-xs" style="fill:var(--lymph)">${N?'◀ peak hazard 8–12.8 mo':'◀ peak recurrence hazard: liver 8, stage II 10, stage III 12.8 months'}</text>`}
    /* 80% bracket */
    if(m>=36){const a=X(0)+6,b=X(36)-6,y=L.cb-L.ch*14/mx-24;
      s+=`<path d="M${f1(a)} ${f1(y+6)}V${f1(y)}H${f1(b)}V${f1(y+6)}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1((a+b)/2)}" y="${f1(y-5)}" class="t-lbl t-mid">80% of recurrences: first 3 years</text>`}
    /* cursor */
    const cx=X(m);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.r[0]-24}" y2="${L.cb}" style="stroke:var(--brand);stroke-width:1.6;opacity:.75"/><path d="M${f1(cx-6)} ${L.r[0]-30}h12l-6 7z" style="fill:var(--brand)"/>`;
    s+=`<text x="${f1(clamp(cx,L.x0+20,L.x1-20))}" y="${L.r[0]-34}" class="t-xs t-mid" style="fill:var(--brand);font-weight:700">month ${Math.round(m)}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(LV_STEPS,t);setSt(p);const C=counts(S,m);
    rg.setAttribute('aria-valuetext',`Month ${Math.round(m)}: ${C.cea} CEA tests, ${C.ct} CT scans, ${C.sc} colonoscopies so far`);
    $('#lvRead').innerHTML=`<span>month <b>${Math.round(m)}</b></span><span>CEA so far <b>${C.cea}</b></span><span>CT so far <b>${C.ct}</b></span><span>colonoscopy <b>${S.sc.length?C.sc:'–'}</b></span>`;
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[p])+`<div class="kv"><div><dt>${S.n}</dt><dd>${S.note}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#lvPlay'),draw,20000,'Replay','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  $$('[data-lvs]').forEach(b=>b.addEventListener('click',()=>{sk=b.dataset.lvs;$$('[data-lvs]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ===== LARS calculator ===== */
  const ls=$('#lvLars'),IT=['Flatus','Liquid stool','Frequency','Clustering','Urgency'],ICOL=['var(--accent)','var(--lymph)','var(--gold)','var(--rx)','var(--brand)'];
  function lars(){const v=[1,2,3,4,5].map(i=>+$('#lvL'+i).value),tot=v.reduce((a,b)=>a+b,0);
    const band=tot<=20?0:tot<=29?1:2,BN=['No LARS','Minor LARS','Major LARS'],BC=['yes','maybe','no'];
    const NL=vb(ls,'720 150','400 196');const x0=NL?16:24,x1=NL?384:696,X=s=>lerp(x0,x1,s/42),y=NL?92:70;let s='';
    [[0,20.5,'var(--good-soft)','var(--good)','No LARS 0–20'],[20.5,29.5,'var(--warn-soft)','var(--warn)','Minor 21–29'],[29.5,42,'var(--bad-soft)','var(--bad)','Major 30–42']].forEach(([a,b,f,c,l])=>{
      s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b)-X(a))}" height="22" style="fill:${f};stroke:${c};stroke-width:.8"/><text x="${f1((X(a)+X(b))/2)}" y="${y+38}" class="t-xs t-mid" style="fill:${c};font-weight:700">${l}</text>`});
    for(let k=0;k<=42;k+=(NL?6:3))s+=`<text x="${f1(X(k))}" y="${y+52}" class="t-xs t-mid">${k}</text>`;
    /* stacked item segments above the ruler */
    let acc=0;v.forEach((p,i)=>{if(!p)return;const a=X(acc),b=X(acc+p);s+=`<rect x="${f1(a)}" y="${y-22}" width="${f1(b-a-1)}" height="14" rx="3" style="fill:${ICOL[i]};opacity:.85"/>`;
      const lb=`${NL?IT[i].split(' ')[0]:IT[i]} ${p}`;if(b-a>lb.length*5.9+6)s+=`<text x="${f1((a+b)/2)}" y="${y-12}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${NL?IT[i].split(' ')[0]:IT[i]} ${p}</text>`;acc+=p});
    s+=`<path d="M${f1(X(tot)-7)} ${y-4}h14l-7 9z" style="fill:var(--ink)"/>`;
    s+=`<text x="${f1(clamp(X(tot),x0+40,x1-40))}" y="${y-30}" class="t-lbl t-mid">score ${tot}</text>`;
    s+=`<text x="${x0}" y="${NL?20:18}" class="t-sm">${NL?'LARS SCORE (0–42)':'LARS SCORE · 0–42 · bands from the 961-patient development study'}</text>`;
    if(NL)s+=`<text x="${x0}" y="${36}" class="t-xs">bands from the 961-patient study</text>`;
    ls.innerHTML=s;
    const top=v.indexOf(Math.max(...v));
    $('#lvLNote').innerHTML=`<div class="kicker">Your teaching score</div><div class="lv-band"><span class="big-num">${tot}</span><span>/ 42</span></div><div class="verdict ${BC[band]}">${BN[band]} (${['0–20','21–29','30–42'][band]})</div>
      <p>${tot?`The biggest contributor here is <b>${IT[top].toLowerCase()}</b> (${v[top]} points). `:''}Urgency carries the most weight (up to 16 points), then clustering (up to 11). For major LARS, the cut-off had 72.5% sensitivity and 82.5% specificity in the development study. [[Christensen2021,Emmertsen2012]]</p>
      <div class="kv"><div><dt>Compare</dt><dd>Major LARS in 41% after rectal cancer resection (meta-analysis). But in Danish adults aged 50–79 with no rectal surgery, 18.8% of women and 9.6% of men also scored 30 or more, so the score needs normative data to interpret. [[Croese2018,Juul2019]]</dd></div>
      <div><dt>What helps (MANUEL guidance)</dt><dd>Stepwise care: best supportive care first (diet, loperamide, skin care, pads), then pelvic floor rehabilitation, then transanal irrigation if supportive care has not worked. Most recommendations rest on expert opinion. [[Christensen2021]]</dd></div></div>
      <div class="pt"><b>In plain words</b>After rectal surgery, many people have urgent, frequent or clustered bowel movements. This 5-question score tells your team how much it affects you, and there are treatments that help.</div>
      <div class="hook"><b>Exam hook</b>LARS score: 5 items, 0–42. No LARS 0–20, minor 21–29, major 30–42. Risk factors: radiotherapy and a low anastomosis.</div>`;
  }
  [1,2,3,4,5].forEach(i=>{const el=$('#lvL'+i);el.addEventListener('change',lars);el.addEventListener('input',lars)});
  $('#lvLReset').addEventListener('click',()=>{[1,2,4,5].forEach(i=>$('#lvL'+i).value='0');$('#lvL3').value='0';lars()});
  lars();

  /* ===== stoma explorer ===== */
  const st=$('#lvStoma');let ty='ileo',it='temp',stT=1,stStop=null;
  function drawSt(){const NS=vb(st,'720 330','400 400');let s='';
    const T=NS?{cx:200,top:24,w:300,h:300}:{cx:220,top:16,w:300,h:298};
    const tl=T.cx-T.w/2,tr=T.cx+T.w/2,tb=T.top+T.h;
    /* torso outline */
    s+=`<path d="M${tl+30} ${T.top}Q${tl} ${T.top+20} ${tl+6} ${T.top+110}Q${tl+14} ${tb-50} ${tl+40} ${tb}H${tr-40}Q${tr-14} ${tb-50} ${tr-6} ${T.top+110}Q${tr} ${T.top+20} ${tr-30} ${T.top}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/>`;
    s+=`<circle cx="${T.cx}" cy="${T.top+150}" r="3" style="fill:var(--muted)"/>`;
    const C=colon(T.cx-95,T.top+40,.63,{w:15});
    const ileo=ty==='ileo',temp=it==='temp',restOp=temp?.35:.12;
    /* the large bowel: in use or resting */
    if(ileo){s+=`<g style="opacity:${restOp+.25}">${C.svg}</g>`}
    else{/* colon in use up to the sigmoid; below rests (temporary) or is out of use (permanent) */
      s+=`<g>${C.svg}</g>`;
      const p0=C.at(.8),p1=C.at(1);s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}L${f1(C.at(.89)[0])} ${f1(C.at(.89)[1])}L${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--panel-2);stroke-width:13;opacity:${temp?.55:.9}"/>`;
      s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}L${f1(C.at(.89)[0])} ${f1(C.at(.89)[1])}L${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--mucosa-line);stroke-width:1.4;stroke-dasharray:4 4"/>`}
    /* small bowel loops */
    let sb='';const sbx=T.cx-30,sby=T.top+120;for(let i=0;i<=60;i++){const u=i/60,x=sbx+Math.sin(u*Math.PI*6)*34+u*20,y=sby+u*80;sb+=(i?'L':'M')+f1(x)+' '+f1(y)}
    s+=`<path d="${sb}" style="fill:none;stroke:var(--mucosa-line);stroke-width:11;stroke-linecap:round;stroke-linejoin:round;opacity:.9"/><path d="${sb}" style="fill:none;stroke:var(--mucosa);stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/>`;
    const sbEnd=[sbx+20+Math.sin(Math.PI*6)*34,sby+80];
    let stoma;
    if(ileo){stoma=[tl+62,T.top+196];
      s+=`<path d="M${f1(sbEnd[0])} ${f1(sbEnd[1])}Q${f1(stoma[0]+40)} ${f1(stoma[1]+30)} ${f1(stoma[0]+6)} ${f1(stoma[1])}" style="fill:none;stroke:var(--mucosa-line);stroke-width:11;stroke-linecap:round"/><path d="M${f1(sbEnd[0])} ${f1(sbEnd[1])}Q${f1(stoma[0]+40)} ${f1(stoma[1]+30)} ${f1(stoma[0]+6)} ${f1(stoma[1])}" style="fill:none;stroke:var(--mucosa);stroke-width:8;stroke-linecap:round"/>`;
      if(temp){const cc=C.at(0);s+=`<path d="M${f1(stoma[0]+12)} ${f1(stoma[1]+6)}Q${f1(cc[0]+10)} ${f1(cc[1]+16)} ${f1(cc[0])} ${f1(cc[1]+8)}" style="fill:none;stroke:var(--mucosa-line);stroke-width:7;stroke-dasharray:4 4;opacity:.7"/>`}}
    else{stoma=[tr-62,T.top+200];const sg=C.at(.8);
      s+=`<path d="M${f1(sg[0])} ${f1(sg[1])}Q${f1(stoma[0]-10)} ${f1(stoma[1]-30)} ${f1(stoma[0]-6)} ${f1(stoma[1])}" style="fill:none;stroke:var(--mucosa-line);stroke-width:14;stroke-linecap:round"/><path d="M${f1(sg[0])} ${f1(sg[1])}Q${f1(stoma[0]-10)} ${f1(stoma[1]-30)} ${f1(stoma[0]-6)} ${f1(stoma[1])}" style="fill:none;stroke:var(--mucosa);stroke-width:11;stroke-linecap:round"/>`}
    /* stoma and pouch */
    s+=`<circle cx="${f1(stoma[0])}" cy="${f1(stoma[1])}" r="9" style="fill:var(--tumour);opacity:.55;stroke:var(--mucosa-line);stroke-width:1.5"/>`;
    const px=stoma[0],py=stoma[1]-8,pw=44,ph=70,fill=ileo?clamp(stT*.7):clamp(stT*.45);
    s+=`<defs><clipPath id="lvPouch"><path d="M${f1(px-pw/2)} ${f1(py)}Q${f1(px-pw/2)} ${f1(py+ph)} ${f1(px)} ${f1(py+ph)}Q${f1(px+pw/2)} ${f1(py+ph)} ${f1(px+pw/2)} ${f1(py)}Z"/></clipPath></defs>`;
    s+=`<rect x="${f1(px-pw/2)}" y="${f1(py+ph*(1-fill))}" width="${pw}" height="${f1(ph*fill)}" clip-path="url(#lvPouch)" style="fill:var(--stool);opacity:.55"/>`;
    s+=`<path d="M${f1(px-pw/2)} ${f1(py)}Q${f1(px-pw/2)} ${f1(py+ph)} ${f1(px)} ${f1(py+ph)}Q${f1(px+pw/2)} ${f1(py+ph)} ${f1(px+pw/2)} ${f1(py)}Z" style="fill:none;stroke:var(--accent);stroke-width:1.8"/>`;
    s+=`<circle cx="${f1(stoma[0])}" cy="${f1(stoma[1])}" r="8" style="fill:var(--tumour);opacity:.6;stroke:var(--mucosa-line);stroke-width:1.5"/>`;
    /* label column */
    const lx=NS?14:420,ly=NS?T.top+T.h+26:44;
    const lines=NS?[]:[];
    if(!NS){
      s+=`<text x="${lx}" y="${ly}" class="t-big">${ileo?'Ileostomy':'Colostomy'} · ${temp?'temporary':'permanent'}</text>`;
      const L2=ileo?[['small bowel (ileum) to the skin','var(--ink)'],['high output: more than about','var(--bad)'],['1.5–2.0 L in 24 hours','var(--bad)']]:[['colon to the skin','var(--ink)'],['parastomal hernia is commonest','var(--muted)'],['after end colostomy; EHS strongly','var(--muted)'],['recommends prophylactic mesh','var(--muted)']];
      L2.push(temp?[ileo?'faded bowel: resting until closure':'dashed bowel below: resting','var(--muted)']:['no closure planned','var(--muted)']);
      L2.forEach(([l,c],k)=>s+=`<text x="${lx}" y="${ly+24+k*17}" class="t-sm" style="fill:${c}">${l}</text>`);
      const big=ileo?(temp?['20%','readmitted within 30 days of','ileostomy creation; 6% for dehydration']:['up to 31%','of small-bowel stomas have','high output']):(temp?['19%','of TME-trial stomas were','never reversed']:['4.0–48.1%','parastomal hernia after end','colostomy (older literature)']);
      s+=`<text x="${lx}" y="${ly+150}" style="font:800 34px var(--display);fill:var(--brand)">${big[0]}</text><text x="${lx}" y="${ly+172}" class="t-sm">${big[1]}</text><text x="${lx}" y="${ly+188}" class="t-sm">${big[2]}</text>`;
      s+=`<text x="${f1(px)}" y="${f1(py+ph+14)}" class="t-xs t-mid">pouch</text>`}
    else{s+=`<text x="${lx}" y="${ly}" class="t-big">${ileo?'Ileostomy':'Colostomy'} · ${temp?'temporary':'permanent'}</text>`;
      s+=`<text x="${lx}" y="${ly+20}" class="t-sm">${ileo?'small bowel (ileum) to the skin':'colon to the skin'}</text>`;
      s+=`<text x="${lx}" y="${ly+38}" class="t-sm">${temp?(ileo?'faded bowel rests until closure':'dashed bowel below rests'):'no closure planned'}</text>`;
      void lines}
    s+=`<text x="${f1(tl+8)}" y="${T.top+14}" class="t-xs">their right</text><text x="${f1(tr-8)}" y="${T.top+14}" class="t-xs t-end">their left</text>`;
    st.innerHTML=s;
    const NT={
     'ileo-temp':{k:'Ileostomy · temporary',t:'A loop ileostomy protects a low join',txt:`In the Dutch TME trial, 57% of patients who had low anterior resection got a primary stoma. Readmission within 30 days of ileostomy creation was 20%, 6% for dehydration; after colorectal cancer resection with a diverting ileostomy, dehydration affected 9.0% (relative risk 3.37 vs no ileostomy). Postoperative diuretic use was the only independent risk factor for dehydration readmission in one series of 603. [[denDulk2007,Vogel2022,Borucki2021,Messaris2012]]`,
      pt:`With an ileostomy, watch your output. If the bag fills much more than usual (around 1.5 litres a day or more), or you feel very thirsty, dizzy or are passing little urine, call your team.`,hook:`About 1 in 5 people with a new ileostomy are readmitted within 30 days; dehydration is the leading cause (6%).`},
     'ileo-perm':{k:'Ileostomy · permanent',t:'High output and magnesium',txt:`High-output stoma (above about 1.5–2.0 L/24 h) causes water, sodium and often magnesium loss and occurs in up to 31% of small-bowel stomas. In one UK series, early high output resolved by itself in 49%; all 26 people with late high output had low magnesium and 11 were admitted with kidney impairment. Parastomal hernia after end ileostomy ranged from 1.8% to 28.3% in the older literature. [[Nightingale2022,Baker2011,Carne2003]]`,
      pt:`A permanent ileostomy can lose a lot of salt and water. Knowing your usual output, and when it is too high, is part of daily life.`,hook:`High-output stoma ≈ >1.5–2 L/day: water, sodium and magnesium depletion.`},
     'colo-temp':{k:'Colostomy · temporary',t:'Will it be reversed?',txt:`Temporary stomas are not always closed. In the TME trial, 19% were never reversed, and complications after surgery predicted a permanent stoma. In Swedish data, 9% of reversals had a major complication (return to theatre, intensive care or death). Defunctioning stomas may reduce the chance of ending up stoma-free (Early evidence; registry analysis). [[denDulk2007,Holmgren2017,Back2021]]`,
      pt:`A "temporary" stoma usually gets closed, but for some people it stays. Ask your surgeon about your own chance.`,hook:`TME trial: 19% of stomas meant to be temporary were never reversed.`},
     'colo-perm':{k:'Colostomy · permanent',t:'Parastomal hernia and mesh',txt:`End colostomy carries a higher parastomal hernia rate than other stomas: 4.0–48.1% in the older literature. The European Hernia Society strongly recommends a prophylactic synthetic non-absorbable mesh when an end colostomy is made, and strongly recommends against suture repair for elective hernia repair. Diagnosis is by examination, with CT or ultrasound if unsure. [[Carne2003,Antoniou2018]]`,
      pt:`A bulge next to a colostomy is common. A mesh placed when the stoma is made lowers the chance of it happening.`,hook:`Parastomal hernia: commonest after end colostomy; prophylactic mesh strongly recommended (EHS).`}
    }[ty+'-'+it];
    $('#lvStNote').innerHTML=noteHTML(NT);
  }
  const stAnim=()=>{stStop&&stStop();stStop=animate(1400,p=>{stT=p;drawSt()},()=>{stStop=null})};
  $$('[data-lvt]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.lvt;$$('[data-lvt]').forEach(x=>x.setAttribute('aria-pressed',x===b));stAnim()}));
  $$('[data-lvi]').forEach(b=>b.addEventListener('click',()=>{it=b.dataset.lvi;$$('[data-lvi]').forEach(x=>x.setAttribute('aria-pressed',x===b));stAnim()}));
  drawSt();

  /* ===== oxaliplatin neuropathy over time ===== */
  const ns=$('#lvNeuro'),nr=$('#lvNT');
  const NP=[{m:0,l:'during',ll:'during',any:92,g2:null,g3:13},{m:1,l:'28 d',ll:'28 days after',any:60,g2:16,g3:5},{m:6,l:'6 mo',ll:'6 months after',any:39,g2:7,g3:1},{m:18,l:'18 mo',ll:'18 months after',any:21,g2:3,g3:1}];
  const NNOTE=[
   {k:'During treatment',t:'92% have some neuropathy',txt:`In the adjuvant trial, peripheral sensory neuropathy occurred in 92% (all grades), 13% grade 3; the median time to grade 3 was 9 cycles. The acute pattern was seen in about 56%, and 80% of people with grade 3 persistent neuropathy had progressed from grade 1–2. In N08CB, 71% felt cold items as abnormal with cycle 1. [[FDA-OxaliplatinGland,Pachman2015]]`,
    pt:`Oxaliplatin can make cold things feel like pins and needles in your hands, mouth or throat for a few days after each dose. The label advises avoiding cold drinks, ice and cold on the skin.`,hook:`Acute oxaliplatin neuropathy: cold-triggered, within hours to 2 days, resolves within 14 days.`},
   {k:'28 days after the last cycle',t:'Still common a month on',txt:`60% still had some neuropathy (16% grade 2, 5% grade 3). In IDEA, 3 months of adjuvant therapy cut grade 2 or worse neurotoxicity to 16.6% (FOLFOX) and 14.2% (CAPOX), from 47.7% and 44.9% with 6 months. [[FDA-OxaliplatinGland,Grothey2018]]`,
    pt:`Tell your team early if buttons, keys or walking get harder, because they can lower or stop the dose.`,hook:`IDEA: 3 months instead of 6 cut grade ≥2 neurotoxicity from ≈45–48% to ≈14–17%.`},
   {k:'6 months after',t:'Slowly improving',txt:`39% still had some neuropathy (7% grade 2, 1% grade 3). Lowering the cumulative dose was the only effective lever in PROFILES survivors; dose delays did not reduce long-term neuropathy. ASCO 2020 recommends no agent to prevent it, and IV calcium and magnesium did not help in a phase III trial. [[FDA-OxaliplatinGland,Beijers2015,Loprinzi2020,Loprinzi2014]]`,
    pt:`Numbness often gets better over months. No pill has been shown to prevent it.`,hook:`No drug is recommended to prevent CIPN; calcium/magnesium infusions do not work.`},
   {k:'18 months after',t:'One in five still affected',txt:`21% still had some neuropathy (3% grade 2, 1% grade 3). By 18 months symptoms were worse in the feet than the hands in N08CB. For established painful neuropathy, duloxetine is the only agent with appropriate evidence, and its benefit is limited (pain fell 1.06 vs 0.34 points on a 0–10 scale). [[FDA-OxaliplatinGland,Pachman2015,Loprinzi2020,Smith2013]]`,
    pt:`For some people the numbness does not fully go away. Help is available for painful neuropathy, though it is modest.`,hook:`Duloxetine is the only drug with evidence for painful CIPN.`}];
  function drawN(t){const NN=vb(ns,'720 300','400 420');const mo=t*18;
    const G=NN?{x0:44,x1:384,y0:44,y1:220,hx:200,hy:300,lbl:236}:{x0:70,x1:470,y0:30,y1:240,hx:600,hy:110,lbl:258};
    /* x scale: during at left, then 0..18 months */
    const xd=G.x0+22,X=mm=>lerp(G.x0+(G.x1-G.x0)*.24,G.x1,mm/18),Y=v=>lerp(G.y1,G.y0,v/100);let s='';
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${G.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${G.y1}" y2="${G.y1}" class="axis"/>`;
    /* published points and stacked grades */
    let ln='';NP.forEach((p,k)=>{const x=k===0?xd:X(p.m);ln+=(k?'L':'M')+f1(x)+' '+f1(Y(p.any))});
    s+=`<path d="${ln}" style="fill:none;stroke:var(--brand);stroke-width:1.4;stroke-dasharray:4 4;opacity:.4"/>`;
    /* drawn-in line up to the cursor */
    const curX=t<=0?xd:lerp(xd,X(18),t);let dl='';
    NP.forEach((p,k)=>{if(k===0){dl='M'+f1(xd)+' '+f1(Y(p.any));return}const pr=NP[k-1];
      const xa=k===1?xd:X(pr.m),xb=X(p.m);if(curX<=xa)return;const u=clamp((curX-xa)/(xb-xa));dl+='L'+f1(lerp(xa,xb,u))+' '+f1(Y(lerp(pr.any,p.any,u)))});
    s+=`<path d="${dl}" style="fill:none;stroke:var(--brand);stroke-width:2.6"/>`;
    let last=0;NP.forEach((p,k)=>{const x=k===0?xd:X(p.m),on=k===0||curX>=x-.5;if(on)last=k;
      const bw=NN?12:16;
      if(on){if(p.g3)s+=`<rect x="${f1(x-bw/2)}" y="${f1(Y(p.g3))}" width="${bw}" height="${f1(G.y1-Y(p.g3))}" style="fill:var(--tumour);opacity:.85"/>`;
        if(p.g2)s+=`<rect x="${f1(x-bw/2)}" y="${f1(Y(p.g3+p.g2))}" width="${bw}" height="${f1(Y(p.g3)-Y(p.g3+p.g2))}" style="fill:var(--warn);opacity:.8"/>`}
      s+=`<circle cx="${f1(x)}" cy="${f1(Y(p.any))}" r="${k===last&&on?6.5:5}" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:2"/>`;
      s+=`<text x="${f1(x+(k===0?10:0))}" y="${f1(Y(p.any)-10)}" class="t-lbl ${k===0?'':'t-mid'}" style="opacity:${on?1:.4}">${p.any}%</text>`;
      s+=`<text x="${f1(x)}" y="${G.lbl}" class="t-xs t-mid">${NN?p.l:p.ll.replace(' after','')}</text>`});
    s+=`<line x1="${f1(curX)}" x2="${f1(curX)}" y1="${G.y0-8}" y2="${G.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    s+=`<text x="${G.x1}" y="${G.lbl+14}" class="t-xs t-end">months after the last cycle →</text>`;
    /* legend */
    const lgx=NN?G.x0:G.x0+120,lgy=NN?G.y0-24:G.y0-14;
    s+=`<rect x="${lgx}" y="${lgy-8}" width="10" height="8" style="fill:var(--warn)"/><text x="${lgx+14}" y="${lgy}" class="t-xs">grade 2</text><rect x="${lgx+70}" y="${lgy-8}" width="10" height="8" style="fill:var(--tumour)"/><text x="${lgx+84}" y="${lgy}" class="t-xs">grade 3</text><circle cx="${lgx+150}" cy="${lgy-4}" r="4" style="fill:var(--brand)"/><text x="${lgx+158}" y="${lgy}" class="t-xs">any grade</text>`;
    /* a hand with tingling points */
    const P=NP[last],hx=G.hx,hy=G.hy,hs=NN?.8:1;
    s+=`<g transform="translate(${hx} ${hy}) scale(${hs})"><path d="M-30 70V10Q-30 0 -22 0Q-14 0 -14 10V-30Q-14 -40 -6 -40Q2 -40 2 -30V-44Q2 -54 10 -54Q18 -54 18 -44V-32Q18 -42 26 -42Q34 -42 34 -32V-20Q34 -28 42 -28Q50 -28 50 -18V40Q50 70 30 80H-14Q-30 80 -30 70Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.6"/>`;
    const rr=rng(11),nDots=Math.round(P.any/4);for(let i=0;i<25;i++){const x=-24+rr()*70,y=-46+rr()*120,on=i<nDots;const ph=Math.sin(t*40+i);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?f1(2.4+ph*.6):1.6}" style="fill:${on?'var(--brand)':'var(--line)'};opacity:${on?.85:.6}"/>`}
    s+=`</g><text x="${hx}" y="${f1(hy+hs*100)}" class="t-xs t-mid">${P.any}% with any grade</text>`;
    if(!NN)s+=`<text x="${hx}" y="${f1(hy-66)}" class="t-sm t-mid" style="fill:var(--brand)">${last===0?'DURING TREATMENT':P.ll.toUpperCase()}</text>`;
    ns.innerHTML=s;
    nr.setAttribute('aria-valuetext',`${last===0?'During treatment':'Up to '+Math.round(mo*10)/10+' months after'}: latest published point ${P.ll}, ${P.any}% any grade`);
    $('#lvNNote').innerHTML=noteHTML(NNOTE[last]);
  }
  playWire(nr,$('#lvNPlay'),drawN,9000,'Replay','living');
  drawN(+nr.value);

  /* ===== CHALLENGE ===== */
  const ex=$('#lvEx');let xo='dfs',xT=1;
  const XD={dfs:{a:80.3,b:73.9,u:'disease-free at 5 years',hr:'HR 0.72 (95% CI 0.55–0.94)',k:'Disease-free survival'},
            os:{a:90.3,b:83.2,u:'alive at 8 years',hr:'HR 0.63 (95% CI 0.43–0.94)',k:'Overall survival'},
            ae:{a:18.5,b:11.5,u:'musculoskeletal adverse events',hr:'more with exercise',k:'Harms'}};
  function drawX(){const NX=vb(ex,'720 210','400 250');const D=XD[xo];
    const x0=NX?16:200,x1=NX?384:600,y=NX?64:56,bh=NX?30:34,gap=NX?66:62;let s='';
    s+=`<text x="${NX?16:24}" y="${NX?22:24}" class="t-sm" style="fill:var(--brand)">${D.k.toUpperCase()} · ${D.hr}</text>`;
    [['Structured exercise',D.a,'var(--rx)'],['Health education',D.b,'var(--muted)']].forEach(([l,v,c],k)=>{const yy=y+k*gap,w=(x1-x0)*v/100*ease(xT);
      if(NX)s+=`<text x="${x0}" y="${yy-6}" class="t-lbl">${l}</text>`;else s+=`<text x="${x0-12}" y="${yy+bh/2+5}" class="t-lbl t-end">${l}</text>`;
      s+=`<rect x="${x0}" y="${yy}" width="${f1(x1-x0)}" height="${bh}" rx="6" style="fill:var(--panel-2)"/><rect x="${x0}" y="${yy}" width="${f1(w)}" height="${bh}" rx="6" style="fill:${c};opacity:.85"/>`;
      s+=`<text x="${f1(Math.min(x0+w+8,x1-50))}" y="${yy+bh/2+5}" class="t-lbl" style="${x0+w+8>x1-50?'fill:var(--panel)':''}">${(v*ease(xT)).toFixed(1)}%</text>`});
    const ly=y+2*gap+(NX?2:6);s+=`<text x="${NX?16:24}" y="${ly}" class="t-xs">${xo==='ae'?'Exercise is not free of harm: more strains and joint problems.':'Difference: '+(D.a-D.b).toFixed(1)+' percentage points, '+D.u+'.'}</text>`;
    ex.innerHTML=s;
    $('#lvExNote').innerHTML=noteHTML({k:'CHALLENGE · phase 3',t:xo==='ae'?'The cost: more aches and strains':'Exercise as treatment',
      txt:`A 3-year structured exercise programme after adjuvant chemotherapy improved disease-free survival (HR 0.72; 5-year DFS 80.3% vs 73.9%), and overall survival was consistent with benefit (HR 0.63; 8-year OS 90.3% vs 83.2%). Musculoskeletal adverse events were more common with exercise (18.5% vs 11.5%). It is the first phase 3 trial to show that exercise after treatment improves cancer outcomes in colon cancer. <span class="ev est">Established</span> for this population. Earlier, in the observational CALGB 89803 cohort, 18–26.9 MET-h/week of activity was linked to better disease-free survival (HR 0.51). [[Courneya2025,Meyerhardt2006]]`,
      pt:`Regular exercise after chemotherapy helped people with colon cancer stay cancer-free longer in a large trial.`,
      hook:`CHALLENGE: structured exercise after adjuvant chemotherapy, DFS HR 0.72 (80.3% vs 73.9% at 5 years).`});
  }
  $$('[data-lvx]').forEach(b=>b.addEventListener('click',()=>{xo=b.dataset.lvx;$$('[data-lvx]').forEach(x=>x.setAttribute('aria-pressed',x===b));animate(700,p=>{xT=p;drawX()})}));
  drawX();
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();lars();drawSt();drawX()};
};
