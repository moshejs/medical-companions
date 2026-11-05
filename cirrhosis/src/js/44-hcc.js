/* =============== 4.4 Liver cancer surveillance =============== */
const HC_Y=6;/* years on the main timeline */
const HC_STEPS=[
 {from:0,at:.15,k:'Years 0–2 · the background risk',t:'Risk builds year by year',
  txt:`About 1% to 4% of people with cirrhosis develop hepatocellular carcinoma each year [[Tapper2023JAMA]]. In a VA cirrhosis cohort the incidence was 1.3 per 100 patient-years, the rate the icons follow; hepatitis C, hepatitis B, obesity and low platelets were independent predictors [[Ioannou2007HCC]]. AASLD 2023 recommends surveillance once the risk reaches 1.0% a year [[Singal2023AASLDHCC]].`,
  pt:`People with cirrhosis have a higher chance of liver cancer. Each year a small number of them develop it [[Tapper2023JAMA]].`,
  hook:`Surveillance threshold (AASLD 2023): HCC risk ≥1.0% a year, which covers Child–Pugh A–B cirrhosis of any cause [[Singal2023AASLDHCC]].`},
 {from:.34,at:.4,k:'Year 2 · no symptoms',t:'A tumour starts silently',
  txt:`An early liver cancer usually causes no symptoms, which is why surveillance is offered rather than waiting for them. AASLD 2023: "HCC surveillance should be performed using ultrasound and AFP at semiannual (approximately every 6 months) intervals" (Level 2, Strong Recommendation). It does not recommend routine CT- or MRI-based surveillance [[Singal2023AASLDHCC]].`,
  pt:`An ultrasound, often with an AFP blood test, every 6 months can find liver cancer early, when it is easier to treat [[Singal2023AASLDHCC,Singal2014PLoSMed]].`,
  hook:`HCC surveillance = ultrasound ± AFP every 6 months for people with cirrhosis [[Singal2023AASLDHCC]].`},
 {from:.48,at:.6,k:'Years 3–3.5 · the 6-monthly check',t:'A check finds it while small',
  txt:`No single scan is perfect. In a meta-analysis of 32 studies, ultrasound found HCC at any stage with 84% sensitivity but early-stage HCC with only 47%. Where both were compared, ultrasound plus AFP detected early HCC with 63% sensitivity versus 45% for ultrasound alone [[Tzartzeva2018]]. That is why repeated checks matter: switch between the two buttons above to see one scan miss the tumour and the next one catch it. A new solid lesion of 1 cm or more, or a raised AFP, leads to multiphase CT or contrast MRI [[Singal2023AASLDHCC]].`,
  pt:`A check can miss a small tumour. Coming back every 6 months gives another chance to find it.`,
  hook:`Early HCC sensitivity: ultrasound alone 45–47%, ultrasound + AFP 63% [[Tzartzeva2018]].`},
 {from:.66,at:.82,k:'Years 4–5 · without checks',t:'Without checks: found late',
  txt:`Without surveillance the same tumour keeps growing until it causes symptoms, by which time it has often reached an advanced stage. In a Shanghai trial of 18,816 people with hepatitis B or chronic hepatitis, AFP plus ultrasound every 6 months cut HCC mortality by 37%, and resection was possible in 46.5% of screened versus 7.5% of control cancers; 5-year survival was 46.4% versus 0 [[Zhang2004Screening]]. In 47 cohort studies in cirrhosis, surveillance went with early detection (OR 2.08) and longer survival (OR 1.90) [[Singal2014PLoSMed]].`,
  pt:`When liver cancer is found because it causes symptoms, it is usually bigger and harder to treat.`,
  hook:`Shanghai RCT: 6-monthly AFP + ultrasound reduced HCC mortality by 37% (rate ratio 0.63) [[Zhang2004Screening]].`},
 {from:.88,at:.97,k:'Year 6 · the stage sets the options',t:'Stage decides the treatment',
  txt:`BCLC 2022 links each stage to treatment and to expected median survival, a population statistic: more than 5 years for BCLC 0/A, 2.5 years for B, 2 years for C and 3 months for D [[Reig2022BCLC]]. Early tumours can be removed, ablated or treated with a transplant; intermediate ones with chemoembolisation; advanced ones with systemic therapy, with atezolizumab–bevacizumab as first-choice first line [[Reig2022BCLC]]. Explore each stage below.`,
  pt:`Liver cancer found early can often be removed, burned away (ablation) or treated with a transplant. Later stages have medicines that help many people live longer [[Reig2022BCLC,Finn2020IMbrave150]].`,
  hook:`BCLC median survival: 0/A >5 years, B 2.5 years, C 2 years, D 3 months [[Reig2022BCLC]].`}
];
const HC_STAGE=[{n:'0',w:'very early',sv:'> 5 y',m:66},{n:'A',w:'early',sv:'> 5 y',m:66},{n:'B',w:'intermediate',sv:'2.5 y',m:30},{n:'C',w:'advanced',sv:'2 y',m:24},{n:'D',w:'end stage',sv:'3 mo',m:3}];
const HC_BC=[
 {t:'BCLC 0 · very early',def:`A single HCC ≤2 cm without vascular invasion or spread, with preserved liver function and no cancer symptoms [[Reig2022BCLC]].`,
  rx:[`Ablation or resection: for HCC ≤2 cm they give the same survival benefit; if transplant is not feasible, ablation gives survival similar to resection [[Reig2022BCLC]].`,
      `In 218 people with a single HCC ≤2 cm treated by radiofrequency ablation, sustained complete response was 97.2% and 5-year survival 68.5% in potentially operable patients [[Livraghi2008RFA]].`],
  sv:`Expected median survival more than 5 years (population statistic) [[Reig2022BCLC]].`},
 {t:'BCLC A · early',def:`A single HCC of any size, or up to 3 nodules none larger than 3 cm, without macrovascular invasion or spread, performance status 0 and preserved liver function [[Reig2022BCLC]].`,
  rx:[`Resection: AASLD 2023 reports 5-year survival above 70% with postoperative mortality below 3% in well-selected people without CSPH; it is generally limited to Child–Turcotte–Pugh A [[Singal2023AASLDHCC]].`,
      `Ablation: in a trial of 180 people with a solitary HCC ≤5 cm, 4-year survival was 67.9% after ablation versus 64.0% after resection, with fewer complications [[Chen2006Ablation]]. Beyond 2 cm, ablation is less effective and resection is favoured; microwave ablation may be best up to 4 cm [[Reig2022BCLC]].`,
      `Transplant within the Milan criteria (checker below): median survival of 10 years, and 5-year recurrence about 10% versus 50–60% after resection or ablation [[Singal2023AASLDHCC]].`],
  sv:`Expected median survival more than 5 years (population statistic) [[Reig2022BCLC]].`},
 {t:'BCLC B · intermediate',def:`Multifocal HCC beyond BCLC A, with preserved liver function, performance status 0 and no vascular invasion or spread. BCLC 2022 splits it into 3 groups by tumour burden and liver function [[Reig2022BCLC]].`,
  rx:[`Chemoembolisation (TACE): in a trial of 112 people with Child–Pugh A/B, 1- and 2-year survival was 82% and 63%, versus 63% and 27% with conservative treatment (HR 0.47) [[Llovet2002TACE]].`,
      `A systematic review of conventional TACE cited by AASLD found an objective response of 52.5% and a median survival of 19.4 months [[Singal2023AASLDHCC]].`,
      `Some tumours can be downstaged to within Milan, which allows a transplant exception score after 6 months under UNOS criteria [[Singal2023AASLDHCC]].`],
  sv:`Expected median survival 2.5 years (population statistic) [[Reig2022BCLC]].`},
 {t:'BCLC C · advanced',def:`Vascular invasion or spread outside the liver, with performance status ≤2 and preserved liver function [[Reig2022BCLC]].`,
  rx:[`Systemic therapy, with atezolizumab–bevacizumab as first-choice first line. It requires preserved liver function (Child–Pugh A if cirrhosis is present) and no high-risk bleeding signs on upper endoscopy (varices properly treated, no history of variceal bleeding) [[Reig2022BCLC]]: see <a href="#portal" data-go="portal">varices</a>.`,
      `IMbrave150 (501 people): HR for death 0.58 versus sorafenib; in the update, median overall survival 19.2 versus 13.4 months [[Finn2020IMbrave150,Cheng2022IMbrave150]]. Doses as published: atezolizumab 1200 mg plus bevacizumab 15 mg/kg IV every 3 weeks [[Cheng2022IMbrave150]].`,
      `HIMALAYA (STRIDE: tremelimumab plus durvalumab): median OS 16.43 versus 13.77 months with sorafenib; 48-month OS 25.2% versus 15.1% [[AbouAlfa2022HIMALAYA,Sangro2024HIMALAYA]]. Earlier, sorafenib (SHARP, 10.7 vs 7.9 months) and lenvatinib (non-inferior, 13.6 vs 12.3 months) [[Llovet2008SHARP,Kudo2018REFLECT]].`],
  sv:`Expected median survival 2 years (population statistic) [[Reig2022BCLC]].`},
 {t:'BCLC D · end stage',def:`Major cancer-related symptoms (performance status above 2) and/or impaired liver function without a transplant option [[Reig2022BCLC]].`,
  rx:[`Palliative care focuses on physical, spiritual and psychosocial needs for the person and their caregivers. AASLD states it can be considered at any stage of cirrhosis, alongside disease-directed treatment [[Rogal2022AASLD]].`,
      `AASLD notes that only 11% of people with cirrhosis receive specialty palliative care or hospice referrals, often very late [[Rogal2022AASLD]]. Asking about it early is a reasonable question for any care team.`],
  sv:`Expected median survival 3 months (population statistic) [[Reig2022BCLC]].`}
];
const HC_IV={
 3:{t:'Every 3 months',txt:`More often is not better: in a randomised trial, quarterly surveillance did not improve on semiannual surveillance [[Singal2023AASLDHCC]].`,pt:`Extra scans add appointments without finding cancers earlier in a way that helped.`},
 6:{t:'Every 6 months',txt:`AASLD 2023: "HCC surveillance should be performed using ultrasound and AFP at semiannual (approximately every 6 months) intervals" (Level 2, Strong Recommendation) [[Singal2023AASLDHCC]]. The Shanghai trial that cut HCC mortality by 37% used a 6-monthly schedule [[Zhang2004Screening]].`,pt:`Twice a year is the schedule the guidelines recommend.`},
 12:{t:'Every 12 months',txt:`Semiannual surveillance was linked with earlier stage at diagnosis and longer survival than annual surveillance, even after adjusting for lead time (40.3 vs 30 months) [[Singal2023AASLDHCC]].`,pt:`Once a year leaves a longer gap in which a tumour can grow unseen.`}
};
inits.hcc=()=>{
  const svg=$('#hcSvg'),rg=$('#hcT'),note=$('#hcNote'),rd=$('#hcRead');let mode='usafp',setSt=()=>{};
  /* the illustrative tumour: appears at year 2.2, first visible at 2.8 */
  const ON=2.2,VIS=2.8;
  const tr=y=>y<ON?0:Math.min(22,1.6*Math.exp(.78*(y-ON)));
  const catchY=()=>mode==='us'?3.5:3.0;
  const stage2=y=>y<3.4?0:y<4.1?1:y<4.8?2:3;/* untreated track, schematic */
  const visits=[];for(let v=.5;v<=HC_Y+1e-9;v+=.5)visits.push(v);
  function draw(t){
    const N=vb(svg,'720 430','400 664'),Y=t*HC_Y,ph=phaseOf(HC_STEPS,t);let s='';
    /* ---- icon array: 100 people at 1.3 per 100 patient-years ---- */
    const k=Math.min(100,Math.floor(1.3*Y+.0001)),frac=1.3*Y-k;
    const A=N?{x:28,y:58,dx:19,dy:19}:{x:28,y:66,dx:19,dy:19};
    s+=`<text x="${A.x-8}" y="${A.y-24}" class="t-lbl">100 people with cirrhosis</text>`;
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),j=99-i;/* fill from the bottom right */
      const hit=j<k,glow=j===k&&frac>.5;s+=person(A.x+c*A.dx,A.y+r*A.dy-6,15,hit?'var(--bad)':glow?'var(--accent)':'var(--line)')}
    const cx=N?250:28,cy=N?96:A.y+10*A.dy+28;
    s+=`<text x="${cx}" y="${cy}" class="t-big" style="font-size:30px;fill:var(--bad)">${k}<tspan class="t-sm" style="font-size:12px;fill:var(--muted)"> in 100</tspan></text>`;
    s+=`<text x="${cx}" y="${cy+18}" class="t-sm">have developed HCC</text><text x="${cx}" y="${cy+34}" class="t-sm">after ${f1(Y)} years</text>${N?`<text x="${cx}" y="${cy+50}" class="t-xs">at 1.3 per 100</text><text x="${cx}" y="${cy+62}" class="t-xs">patient-years</text>`:`<text x="${cx}" y="${cy+50}" class="t-xs">at 1.3 per 100 patient-years</text>`}`;
    /* ---- the two tracks ---- */
    const T=N?{x0:20,x1:262,lx:334,y1:348,y2:470,l1:300,l2:422,ls:.5}:{x0:250,x1:560,lx:636,y1:118,y2:238,l1:48,l2:170,ls:.62};
    const X=y=>T.x0+(T.x1-T.x0)*y/HC_Y,cY=catchY(),caught=Y>=cY;
    s+=`<text x="${T.x0}" y="${T.l1}" class="t-lbl">With checks every 6 months</text><text x="${T.x0}" y="${T.l1+15}" class="t-xs">${mode==='us'?'ultrasound alone':'ultrasound + AFP'}</text>`;
    s+=`<text x="${T.x0}" y="${T.l2}" class="t-lbl">Without surveillance</text><text x="${T.x0}" y="${T.l2+15}" class="t-xs">found when it causes symptoms</text>`;
    [T.y1,T.y2].forEach((ty,j)=>{s+=`<line x1="${T.x0}" x2="${T.x1}" y1="${ty}" y2="${ty}" class="axis"/>`;
      for(let y=0;y<=HC_Y;y++)s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${ty-3}" y2="${ty+3}" class="axis"/><text x="${f1(X(y))}" y="${ty+16}" class="t-xs t-mid">${y}</text>`;
      /* tumour-present bar */
      if(Y>ON){const end=j===0&&caught?cY:Math.min(Y,j===1?5.3:HC_Y);s+=`<rect x="${f1(X(ON))}" y="${ty-12}" width="${f1(Math.max(0,X(end)-X(ON)))}" height="5" rx="2" style="fill:var(--bad);opacity:.55"/>`;
        if(Y>ON+.15&&j===1)s+=`<text x="${f1(X(ON))}" y="${ty-16}" class="t-xs" style="fill:var(--bad)">tumour present, unseen</text>`}
      s+=`<circle cx="${f1(X(Math.min(Y,HC_Y)))}" cy="${ty}" r="4" style="fill:var(--ink)"/>`});
    s+=`<text x="${T.x1}" y="${T.y2+30}" class="t-xs t-end">years</text>`;
    /* visits on track 1 */
    visits.forEach(v=>{if(v>Y+1e-9)return;const x=X(v),y=T.y1;
      if(caught&&v>cY)return;
      const miss=mode==='us'&&Math.abs(v-3.0)<.01,hit=Math.abs(v-cY)<.01;
      if(hit){s+=`<circle cx="${f1(x)}" cy="${y}" r="8" style="fill:var(--accent)"/><path d="M${f1(x-4)} ${y}l3 3l5 -6" style="fill:none;stroke:var(--panel);stroke-width:2"/><text x="${f1(x)}" y="${y-20}" class="t-xs t-mid" style="fill:var(--accent);font-weight:700">found</text>`}
      else if(miss){s+=`<circle cx="${f1(x)}" cy="${y}" r="7" style="fill:var(--panel);stroke:var(--bad);stroke-width:1.6"/><path d="M${f1(x-3)} ${y-3}l6 6M${f1(x+3)} ${y-3}l-6 6" style="stroke:var(--bad);stroke-width:1.6"/><text x="${f1(x)}" y="${y-20}" class="t-xs t-mid" style="fill:var(--bad)">missed</text>`}
      else s+=`<circle cx="${f1(x)}" cy="${y}" r="5" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.6"/>`});
    /* livers with the tumour */
    const r1=caught?tr(cY)*(1-ramp(Y,cY+.1,cY+.6)):tr(Y),r2=tr(Math.min(Y,5.3));
    [[T.y1,r1],[T.y2,r2]].forEach(([ty,r],j)=>{const lv=liver(T.lx,ty-8,T.ls,{fib:3.3,gb:false,seed:11});s+=lv.svg;
      if(r>.3){const tx=T.lx-14*T.ls*2,tyy=ty-12;s+=`<circle cx="${f1(tx)}" cy="${f1(tyy)}" r="${f1(Math.max(3.5,r*T.ls*1.8))}" style="fill:var(--bile);stroke:var(--bad);stroke-width:2.2"/>`;
        if(j===1&&Y>=4.8){s+=`<path d="M${f1(tx+r*.6)} ${f1(tyy+r*.4)}q14 10 22 26" style="fill:none;stroke:var(--bad);stroke-width:2;stroke-dasharray:3 2"/><circle cx="${f1(tx+r*.6+24)}" cy="${f1(tyy+r*.4+28)}" r="3" style="fill:var(--bad)"/>`}}
      if(j===0&&caught&&Y>cY+.1)s+=`<text x="${T.lx}" y="${ty+30}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">treated early</text>`;
      if(j===1&&Y>=5.3)s+=`<text x="${T.lx}" y="${ty+30}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">symptoms: found</text>`});
    /* ---- BCLC strip ---- */
    const B=N?{x:16,y:548,w:368,h:58}:{x:250,y:322,w:450,h:58};
    const bw=(B.w-16)/5,s1=caught?(cY<3.2?0:1):null,s2=Y>ON?stage2(Math.min(Y,5.3)):null;
    s+=`<text x="${B.x}" y="${B.y-12}" class="t-sm" style="fill:var(--ink);font-weight:700">BCLC stage · expected median survival</text>`;
    HC_STAGE.forEach((S,i)=>{const x=B.x+i*(bw+4),a=i===s1,b=i===s2&&Y>=3;
      s+=`<rect x="${f1(x)}" y="${B.y}" width="${f1(bw)}" height="${B.h}" rx="8" style="fill:${a?'var(--accent-soft)':b?'var(--bad-soft)':'var(--panel-2)'};stroke:${a?'var(--accent)':b?'var(--bad)':'var(--line)'};stroke-width:${a||b?2:1}"/>`;
      s+=`<text x="${f1(x+bw/2)}" y="${B.y+22}" class="t-big t-mid" style="font-size:19px">${S.n}</text><text x="${f1(x+bw/2)}" y="${B.y+36}" class="t-xs t-mid">${S.w}</text><text x="${f1(x+bw/2)}" y="${B.y+50}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${S.sv}</text>`;
      if(a)s+=`<path d="M${f1(x+bw/2-7)} ${B.y-4}h14l-7 7z" style="fill:var(--accent)"/>`;
      if(b)s+=`<path d="M${f1(x+bw/2-7)} ${B.y+B.h+11}h14l-7 -7z" style="fill:var(--bad)"/>`});
    s+=`<text x="${B.x}" y="${B.y+B.h+26}" class="t-xs"><tspan style="fill:var(--accent)">▲ with checks</tspan>   <tspan style="fill:var(--bad)">▼ without surveillance</tspan>${N?'':'   survival: population medians, BCLC 2022'}</text>`+(N?`<text x="${B.x}" y="${B.y+B.h+40}" class="t-xs">survival: population medians, BCLC 2022</text>`:'');
    svg.innerHTML=s;
    rd.innerHTML=`<span>Year <b>${f1(Y)}</b></span><span>With checks <b>${Y<ON?'no tumour':!caught?(Y>=VIS?'tumour visible, not yet found':'tumour too small to see'):'found at BCLC '+HC_STAGE[s1].n}</b></span><span>Without <b>${Y<ON?'no tumour':Y<5.3?'growing unseen':'found at BCLC C'}</b></span>`;
    note.innerHTML=noteHTML(HC_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#hcPlay'),draw,22000,'Replay','hcc');
  setSt=stepWire($('#hcSteps'),HC_STEPS,rg,draw,stop);
  $$('[data-hm]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.hm;$$('[data-hm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- why every 6 months ---------- */
  const iv=$('#hcIvSvg'),ivn=$('#hcIvNote');let curV=6;
  function drawIv(){let s='';const x0=78,x1=384,X=m=>x0+(x1-x0)*m/36;
    [3,6,12].forEach((m,i)=>{const y=40+i*44,on=m===curV;
      s+=`<text x="10" y="${y+4}" class="t-sm" style="${on?'fill:var(--ink);font-weight:700':''}">${m} months</text><line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" class="axis"/>`;
      for(let v=0;v<=36;v+=m)s+=`<circle cx="${f1(X(v))}" cy="${y}" r="${on?5:3.5}" style="fill:${on?'var(--accent)':'var(--muted)'};opacity:${on?1:.5}"/>`});
    [0,12,24,36].forEach(v=>{s+=`<text x="${f1(X(v))}" y="160" class="t-xs t-mid">${v?v/12+' y':'0'}</text>`});
    iv.innerHTML=s;const D=HC_IV[curV];ivn.innerHTML=noteHTML({k:'Surveillance interval',t:D.t,txt:D.txt,pt:D.pt})}
  $$('[data-iv]').forEach(b=>b.addEventListener('click',()=>{curV=+b.dataset.iv;$$('[data-iv]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawIv()}));
  drawIv();

  /* ---------- BCLC stage selector ---------- */
  const bs=$('#hcBc'),bn=$('#hcBcNote');let curB=0;
  const NOD=[[[-30,-6,8]],[[-30,-6,16]],[[-44,-14,9],[-12,4,8],[20,-18,7],[-54,10,6],[34,-6,6]],[[-36,-8,12],[6,0,9],[30,-16,7]],[[-38,-10,13],[4,2,10],[30,-16,8],[-58,10,7]]];
  function drawB(){const N=vb(bs,'520 300','400 360');let s='';
    const L=N?{x:200,y:120,s:1.35}:{x:130,y:130,s:1.25};
    const lv=liver(L.x,L.y,L.s,{fib:3.3,gb:false,seed:5});s+=lv.svg;
    if(curB>=3){/* tumour into the portal vein and spread beyond the liver */
      s+=`<path d="M${f1(L.x-10*L.s)} ${f1(L.y+30*L.s)}Q${f1(L.x-4*L.s)} ${f1(L.y+60*L.s)} ${f1(L.x+20*L.s)} ${f1(L.y+70*L.s)}" style="fill:none;stroke:var(--portal);stroke-width:${f1(6*L.s*.7)};stroke-linecap:round"/><path d="M${f1(L.x-10*L.s)} ${f1(L.y+30*L.s)}Q${f1(L.x-6*L.s)} ${f1(L.y+46*L.s)} ${f1(L.x)} ${f1(L.y+52*L.s)}" style="fill:none;stroke:var(--bad);stroke-width:${f1(3.4*L.s*.7)};stroke-linecap:round"/>`;
      s+=`<text x="${f1(L.x+24*L.s)}" y="${f1(L.y+74*L.s)}" class="t-xs">tumour in the portal vein</text>`;
      [[86,-40],[96,-28],[80,-24]].forEach(([a,b])=>{s+=`<circle cx="${f1(L.x+a*L.s)}" cy="${f1(L.y+b*L.s)}" r="3.5" style="fill:var(--bad)"/>`});
      s+=`<text x="${f1(L.x+80*L.s)}" y="${f1(L.y-48*L.s)}" class="t-xs t-mid">spread</text>`}
    NOD[curB].forEach(([a,b,r])=>{s+=`<circle cx="${f1(L.x+a*L.s)}" cy="${f1(L.y+b*L.s)}" r="${f1(r*L.s)}" style="fill:var(--bile);stroke:var(--bad);stroke-width:2.4"/>`});
    if(curB<=1){const [a,b,r]=NOD[curB][0],tx=L.x+a*L.s,ty=L.y+b*L.s;s+=`<path d="M${f1(tx-r*L.s*.7)} ${f1(ty+r*L.s*.7)}L${f1(tx-30)} ${f1(ty+64)}" style="stroke:var(--ink);stroke-width:1.2"/><text x="${f1(tx-30)}" y="${f1(ty+76)}" class="t-sm t-mid" style="fill:var(--ink)">${curB?'single tumour':'single tumour ≤2 cm'}</text>`}
    if(curB===4)s+=`<text x="${f1(L.x)}" y="${f1(L.y-60*L.s)}" class="t-xs t-mid" style="fill:var(--bad)">impaired liver function or major symptoms</text>`;
    /* survival bars */
    const by=N?250:226,bx=N?90:330,bw=N?250:140,mx=66;
    if(!N)s+=`<text x="${bx-70}" y="${by-104}" class="t-sm" style="fill:var(--ink);font-weight:700">median survival</text>`;
    else s+=`<text x="16" y="${by-10}" class="t-sm" style="fill:var(--ink);font-weight:700">median survival (population statistic)</text>`;
    const rows=[['0 / A','> 5 y',66,curB<=1],['B','2.5 y',30,curB===2],['C','2 y',24,curB===3],['D','3 mo',3,curB===4]];
    rows.forEach(([n,l,m,on],i)=>{const y=N?by+6+i*24:by-92+i*24;
      s+=`<text x="${bx-10}" y="${y+12}" class="t-sm t-end" style="${on?'fill:var(--ink);font-weight:700':''}">${n}</text><rect x="${bx}" y="${y}" width="${f1(bw*m/mx)}" height="16" rx="4" style="fill:${on?'var(--accent)':'var(--panel-2)'}"/><text x="${f1(bx+bw*m/mx+6)}" y="${y+12}" class="t-sm" style="${on?'fill:var(--ink);font-weight:700':''}">${l}</text>`});
    if(!N)s+=`<text x="${bx-70}" y="${by+12}" class="t-xs">population statistics, BCLC 2022</text>`;
    bs.innerHTML=s;
    const D=HC_BC[curB];bn.innerHTML=`<div class="kicker">BCLC 2022</div><h4>${D.t}</h4><p>${D.def}</p><ul>${D.rx.map(x=>`<li>${x}</li>`).join('')}</ul><p class="surv">${D.sv}</p>`}
  $$('[data-bc]').forEach(b=>b.addEventListener('click',()=>{curB=+b.dataset.bc;$$('[data-bc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawB()}));
  drawB();

  /* ---------- Milan checker ---------- */
  const mn=$('#hcMn'),ms=$('#hcMs'),mv=$('#hcMv'),mo=$('#hcMsO'),mV=$('#hcMV'),msv=$('#hcMilanSvg');
  function drawM(){const n=+mn.value,sz=+ms.value,inv=mv.checked;mo.textContent=sz.toFixed(1)+' cm';
    const px=15,cols=n===1?[200]:n===2?[120,280]:n===3?[72,200,328]:[60,150,250,340];let s='';
    const lim=n===1?5:3;
    cols.forEach((x,i)=>{const d=i===0?sz:Math.max(.5,sz*(.75-.12*i));
      if(n<=3)s+=`<circle cx="${x}" cy="100" r="${f1(lim*px/2)}" style="fill:none;stroke:var(--good);stroke-width:1.6;stroke-dasharray:5 4"/>`;
      s+=`<circle cx="${x}" cy="100" r="${f1(d*px/2)}" style="fill:var(--bile);stroke:var(--bad);stroke-width:1.8;opacity:.9"/><text x="${x}" y="${f1(100+Math.max(d,n<=3?lim:0)*px/2+14)}" class="t-xs t-mid">${d.toFixed(1)} cm</text>`});
    s+=`<text x="10" y="18" class="t-xs">dashed: Milan limit ${n===1?'5 cm (single tumour)':n<=3?'3 cm each (2–3 tumours)':'none: more than 3 tumours'}</text><line x1="10" x2="${10+px*2}" y1="200" y2="200" style="stroke:var(--ink);stroke-width:2"/><text x="${14+px*2}" y="203" class="t-xs">2 cm</text>`;
    if(inv)s+=`<text x="390" y="203" class="t-xs t-end" style="fill:var(--bad);font-weight:700">macrovascular invasion</text>`;
    msv.innerHTML=s;
    let ok=!inv&&n<=3&&sz<=lim,why=inv?'macrovascular invasion':n>3?'more than 3 tumours':sz>lim?(n===1?'a single tumour larger than 5 cm':'with 2–3 tumours, one is larger than 3 cm'):'';
    mV.className='verdict '+(ok?'yes':'no');mV.textContent=ok?'Within the Milan criteria (as published).':'Beyond the Milan criteria: '+why+'. Wider criteria (UCSF, up-to-seven) and downstaging exist.'}
  [mn,ms,mv].forEach(e=>{e.addEventListener('input',drawM);e.addEventListener('change',drawM)});
  drawM();
  redraws.hcc=(()=>{const prev=redraws.hcc;return()=>{prev&&prev();drawB()}})();
};
