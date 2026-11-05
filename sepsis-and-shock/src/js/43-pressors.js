/* ===== 4.3 Vasopressors & steroids ===== */
/* drugs for the receptor animation: v = vessel action, h = heart action, kd = kidney action (labels shown only as the
   cited label or guideline gives them); bp: whether the schematic dial rises */
const PR_DR={
 na:{n:'Noradrenaline',s:'NORAD',col:'var(--rx)',v:'α-adrenergic',h:'β-adrenergic',bp:1,
  txt:`Its label describes α-adrenergic vasoconstriction with β-adrenergic inotropy: it tightens the vessels and helps the heart contract. Levophed "is indicated to raise blood pressure in adult patients with severe, acute hypotension" [[FDA-Levophed]]. SSC 2021: "we recommend using norepinephrine as the first-line agent over other vasopressors" (strong; evidence high versus dopamine, moderate versus vasopressin) [[Evans2021SSC]]. In SOAP II, dopamine caused more arrhythmias (24.1% vs 12.4%) [[DeBacker2010SOAPII]].`,
  pt:`The usual first choice. It tightens blood vessels and helps the heart pump, so blood pressure rises [[FDA-Levophed,Evans2021SSC]].`,
  hook:`Noradrenaline is first-line (SSC, strong). α vasoconstriction + β inotropy [[Evans2021SSC,FDA-Levophed]].`},
 vp:{n:'Vasopressin',s:'VASOPR',col:'var(--dx)',v:'V1',kd:'V2: holds water',bp:1,
  txt:`Its label describes V1-receptor vasoconstriction on vascular smooth muscle, with V2-mediated antidiuresis in the kidney [[FDA-Vasostrict]]. Relative vasopressin deficiency is one classic explanation of vasoplegia [[Landry2001]]. The label indication: "to increase blood pressure in adults with vasodilatory shock who remain hypotensive despite fluids and catecholamines". Literature-reported adverse reactions include mesenteric and distal limb ischaemia [[FDA-Vasostrict]]; pooled trials showed more digital ischaemia (+1.7%) and fewer arrhythmias (−2.8%) [[Nagendran2019IPD]].`,
  pt:`A medicine that tightens blood vessels through a different receptor, often added to noradrenaline [[FDA-Vasostrict,Evans2021SSC]].`,
  hook:`V1 = vasoconstriction, V2 = antidiuresis. Usually the second agent [[FDA-Vasostrict,Evans2021SSC]].`},
 adr:{n:'Adrenaline',s:'ADREN',col:'var(--accent)',v:'vessel tone',h:'heart squeeze',bp:1,
  txt:`SSC 2021 gives adrenaline (epinephrine) two roles: a third agent when MAP stays low "despite norepinephrine and vasopressin" (weak, low quality), and, used alone, one option for septic shock with cardiac dysfunction, as an alternative to adding dobutamine to norepinephrine [[Evans2021SSC]]. So both the vessel and the heart light up here. In CAT, it reached the MAP goal as fast as norepinephrine, but 12.9% of patients were withdrawn for transient metabolic effects [[Myburgh2008CAT]]. In CATS, 28-day mortality was 40% with epinephrine alone versus 34% with norepinephrine plus dobutamine (not significant) [[Annane2007CATS]].`,
  pt:`Adrenaline can tighten vessels and make the heart pump harder. It is usually added later, if other medicines are not enough [[Evans2021SSC]].`,
  hook:`Third agent after norepinephrine + vasopressin, or alone as an inotrope option (SSC 2021) [[Evans2021SSC]].`},
 at2:{n:'Angiotensin II',s:'ANG II',col:'var(--brand)',v:'vessel tone',bp:1,
  txt:`"GIAPREZA increases blood pressure in adults with septic or other distributive shock" [[FDA-Giapreza]]. In ATHOS-3 (patients on more than 0.2 µg/kg/min of norepinephrine), MAP response at 3 h was 69.9% versus 23.4% with placebo, and 28-day mortality 46% versus 54% (P=0.12, not significant) [[Khanna2017ATHOS3]]. The label warns of thromboembolic events (12.9% vs 5.1%) [[FDA-Giapreza]]. SSC 2026 suggests norepinephrine over angiotensin II as first-line (conditional, very low certainty) [[Prescott2026SSC]].`,
  pt:`A newer add-on medicine that raises blood pressure, used by some hospitals when others are not enough [[FDA-Giapreza,Khanna2017ATHOS3]].`,
  hook:`ATHOS-3: MAP response 69.9% vs 23.4%; label thrombosis warning [[Khanna2017ATHOS3,FDA-Giapreza]].`},
 dob:{n:'Dobutamine',s:'DOBUT',col:'var(--rec)',h:'heart squeeze',bp:0,
  txt:`Dobutamine is used as an inotrope. SSC 2021 suggests "either adding dobutamine to norepinephrine or using epinephrine alone" for septic shock with cardiac dysfunction and persistent hypoperfusion "despite adequate volume status and arterial blood pressure" (weak, low quality) [[Evans2021SSC]]. SSC 2026 suggests inotropes over none, added to vasopressors rather than replacing them [[Prescott2026SSC]]. Because the statement applies when pressure is already adequate, the dial is left unchanged. In septic shock, some patients have an ejection fraction close to 40% despite a cardiac index above 3 L/min/m² [[Cecconi2014ESICM]].`,
  pt:`Some people with sepsis have a tired heart. A medicine such as dobutamine can help it squeeze harder, alongside the medicine that tightens the vessels [[Evans2021SSC,Prescott2026SSC]].`,
  hook:`Septic cardiomyopathy with hypoperfusion: add dobutamine to norepinephrine, or epinephrine alone [[Evans2021SSC]].`}
};
const PR_RSTEPS=[{from:0,at:.15,t:'The pump starts',k:'Infusion'},{from:.32,at:.46,t:'Binding',k:'Binding'},{from:.6,at:.9,t:'The effect',k:'Effect'}];
/* escalation steps: d = illustrative noradrenaline-equivalent dose (µg/kg/min) */
const PR_ESTEPS=[
 {from:0,at:.08,k:'Step 1 · first line',t:'Noradrenaline first',
  txt:`SSC 2021, recommendation 37: "we recommend using norepinephrine as the first-line agent over other vasopressors" (strong) [[Evans2021SSC]]. SOAP II (1679 patients with shock): 28-day mortality 52.5% with dopamine versus 48.5% with norepinephrine (P=0.10), with twice the arrhythmias [[DeBacker2010SOAPII]]. A meta-analysis of 32 trials found lower mortality with norepinephrine than dopamine (RR 0.89) [[Avni2015PLoSOne]].`,
  pt:`Noradrenaline (norepinephrine) is the usual first medicine to raise blood pressure [[Evans2021SSC]].`,
  hook:`Norepinephrine over dopamine: arrhythmias 12.4% vs 24.1% (SOAP II) [[DeBacker2010SOAPII]].`},
 {from:.14,at:.22,k:'Step 2 · without delay',t:'Start in an arm vein',
  txt:`SSC suggests "starting vasopressors peripherally to restore MAP rather than delaying initiation until a central venous access is secured" (weak, very low quality; kept in 2026) [[Evans2021SSC,Prescott2026SSC]]. In ARISE FLUIDS, CLOVERS and CLASSIC, giving less fluid with earlier vasopressors did not change mortality [[Peake2026ARISEFLUIDS,Shapiro2023CLOVERS,Meyhoff2022CLASSIC]]. In CENSER, early norepinephrine improved shock control by 6 h (76.1% vs 48.4%) [[Permpikul2019CENSER]].`,
  pt:`The medicine can be started through a drip in the arm, so treatment is not delayed while a bigger line is placed [[Evans2021SSC]].`,
  hook:`Peripheral start: extravasation about 2–3.4% in cohorts [[CardenasGarcia2015JHM,Tian2020EMA]].`},
 {from:.3,at:.4,k:'Step 3 · second agent',t:'Add vasopressin',
  txt:`SSC 2021, recommendation 38: "we suggest adding vasopressin instead of escalating the dose of norepinephrine" (weak, moderate); its remark: "vasopressin is usually started when the dose of norepinephrine is in the range of 0.25–0.5 μg/kg/min" [[Evans2021SSC]]. VASST (778, on at least 5 µg/min norepinephrine): 28-day mortality 35.4% versus 39.3% (P=0.26) [[Russell2008VASST]]. VANISH: RRT 25.4% versus 35.3% [[Gordon2016VANISH]]. VASSPR compared start thresholds of 0.1 and 0.4: 31.8% versus 33.0% (no difference) [[Peltan2026VASSPR]].`,
  pt:`If the first medicine is not enough, a second one, vasopressin, is often added rather than pushing the first ever higher [[Evans2021SSC]].`,
  hook:`Vasopressin "usually started" at norepinephrine 0.25–0.5 µg/kg/min (SSC 2021 remark) [[Evans2021SSC]].`},
 {from:.5,at:.63,k:'Step 4 · steroids',t:'Add hydrocortisone',
  txt:`SSC 2021 suggests IV corticosteroids for "an ongoing requirement for vasopressor therapy" (weak, moderate). Its remark, as published: hydrocortisone "200 mg/day given as 50 mg intravenously every 6 h or as a continuous infusion… commenced at a dose of norepinephrine or epinephrine ≥ 0.25 mcg/kg/min at least 4 h after initiation" [[Evans2021SSC]]. The clock shows the 4 hours. The trials are compared below.`,
  pt:`Some people also get a steroid, hydrocortisone, which can help blood pressure recover sooner [[Venkatesh2018ADRENAL,Annane2018APROCCHSS]].`,
  hook:`Steroid remark: norepinephrine or epinephrine ≥0.25 µg/kg/min for ≥4 h (SSC 2021) [[Evans2021SSC]].`},
 {from:.7,at:.8,k:'Step 5 · third agent',t:'Adrenaline or angiotensin II',
  txt:`For inadequate MAP "despite norepinephrine and vasopressin, we suggest adding epinephrine" (SSC 2021, weak, low; kept in 2026) [[Evans2021SSC,Prescott2026SSC]]. Angiotensin II was tested in ATHOS-3 in patients on more than 0.2 µg/kg/min; at entry 67% were also on vasopressin and 47% on three or more vasopressors [[Khanna2017ATHOS3,FDA-Giapreza]]. Neither has a published dose threshold for starting, so the lane is drawn without one.`,
  pt:`If two medicines are still not enough, a third can be added [[Evans2021SSC]].`,
  hook:`Third agent: epinephrine (SSC). Angiotensin II: ATHOS-3 entry >0.2 µg/kg/min [[Evans2021SSC,Khanna2017ATHOS3]].`},
 {from:.86,at:.95,k:'Step 6 · the heart',t:'If the heart is weak',
  txt:`For septic shock with cardiac dysfunction and persistent hypoperfusion despite adequate volume and blood pressure, SSC 2021 suggests "either adding dobutamine to norepinephrine or using epinephrine alone" (weak, low) [[Evans2021SSC]]. SSC 2026 suggests inotropes over none (conditional, very low certainty) and, with 2021, suggests against levosimendan [[Prescott2026SSC,Evans2021SSC]]. In LeoPARDS, levosimendan did not lower SOFA and caused more tachyarrhythmia (3.1% vs 0.4%) [[Gordon2016LeoPARDS]].`,
  pt:`If the heart itself is pumping weakly, a medicine to help it squeeze may be added [[Evans2021SSC]].`,
  hook:`Inotrope: dobutamine added to norepinephrine, or epinephrine alone [[Evans2021SSC]].`}
];
const PR_MSTEPS=[
 {from:0,at:.12,k:'Step 1 · the definition',t:'Septic shock and MAP 65',needle:65,zones:[[65,120,'var(--rx)']],
  txt:`Sepsis-3 identifies septic shock by "a vasopressor requirement to maintain a mean arterial pressure of 65 mm Hg or greater and serum lactate level greater than 2 mmol/L (>18 mg/dL) in the absence of hypovolemia" [[Singer2016Sepsis3]]. In the derivation data, these patients had a mortality of 42.3% (95% CI 41.2–43.3%), a figure for large groups, not one person [[ShankarHari2016Shock]].`,
  pt:`Doctors call it septic shock when medicines are needed to keep the average blood pressure at 65 or more, and a blood test called lactate is high [[Singer2016Sepsis3]].`,
  hook:`Septic shock = vasopressor for MAP ≥65 + lactate >2 mmol/L despite fluids [[Singer2016Sepsis3]].`},
 {from:.2,at:.3,k:'Step 2 · the guideline',t:'SSC: an initial target of 65',needle:65,zones:[[60,65,'var(--warn)'],[65,66.5,'var(--rx)']],
  txt:`SSC 2021, recommendation 9 (kept in 2026): "For adults with septic shock on vasopressors, we recommend an initial target mean arterial pressure (MAP) of 65 mm Hg over higher MAP targets" (strong, moderate quality) [[Evans2021SSC,Prescott2026SSC]]. Organ perfusion falls below a threshold "usually understood to be approximately 60 mm Hg" [[Evans2021SSC]]. ESICM also recommends initially targeting a MAP of ≥65 mm Hg and individualising it [[Cecconi2014ESICM]].`,
  pt:`Guidelines suggest aiming for an average blood pressure of about 65 at first [[Evans2021SSC]].`,
  hook:`Initial MAP target 65 mm Hg: strong recommendation, moderate quality [[Evans2021SSC]].`},
 {from:.4,at:.52,k:'Step 3 · higher?',t:'SEPSISPAM: 80–85 versus 65–70',needle:null,zones:[[65,70,'var(--rx)'],[80,85,'var(--accent)']],
  txt:`SEPSISPAM (776 patients) compared a MAP target of 80–85 with 65–70 mm Hg. 28-day mortality was 36.6% versus 34.0% (HR 1.07; 95% CI 0.84 to 1.38), and 90-day 43.8% versus 42.3%. New atrial fibrillation was more common with the high target. In patients with chronic hypertension, the higher target reduced RRT use, without a mortality difference [[Asfar2014SEPSISPAM]].`,
  pt:`Pushing the blood pressure higher did not help people survive, and caused more irregular heartbeats [[Asfar2014SEPSISPAM]].`,
  hook:`SEPSISPAM: high target, no survival gain, more AF [[Asfar2014SEPSISPAM]].`},
 {from:.6,at:.72,k:'Step 4 · lower?',t:'The 65 trial: 60–65 if 65 or older',needle:62.5,zones:[[60,65,'var(--rx)']],
  txt:`The 65 trial randomised 2600 people aged 65 or older with vasodilatory hypotension to permissive hypotension (MAP 60–65) or usual care. Vasopressor exposure fell (median 33 vs 38 h). 90-day mortality was 41.0% versus 43.8% (difference −2.85%; 95% CI −6.75 to 1.05; P=0.15); the prespecified adjusted OR was 0.82. Serious adverse events were 6.2% versus 5.8% [[Lamontagne2020SIXTYFIVE]].`,
  pt:`In older people, a slightly lower blood-pressure target meant less of the pressure medicine, and was at least as safe [[Lamontagne2020SIXTYFIVE]].`,
  hook:`65 trial: MAP 60–65 in ≥65 years; 41.0% vs 43.8% (not significant) [[Lamontagne2020SIXTYFIVE]].`},
 {from:.8,at:.92,k:'Step 5 · pooled',t:'Lower appears at least as safe',needle:62.5,zones:[[60,65,'var(--rx)'],[65,66.5,'var(--good)']],
  txt:`An individual-patient meta-analysis of SEPSISPAM, OVATION-pilot and 65 (3352 patients) gave a 90-day mortality RR of 0.93 for lower versus higher targets (95% CrI 0.76 to 1.07), with an 87% posterior probability of benefit (low certainty); no subgroup benefited from higher targets [[Angriman2025NEJMEvid]]. SSC 2026 adds, for adults aged 65 or older: "we suggest an initial MAP range of 60-65 mm Hg over higher ranges" (conditional, low certainty) [[Prescott2026SSC]].`,
  pt:`For older adults, guidelines now say a range of 60 to 65 may be fine [[Prescott2026SSC]].`,
  hook:`SSC 2026: 60–65 mm Hg for adults ≥65 years (conditional) [[Prescott2026SSC]].`}
];
const PR_MBARS=[
 {rows:[['vasopressor + lactate >2 after fluids',42.3]],cap:'hospital mortality, Sepsis-3 derivation'},
 {txt:['strong recommendation','moderate quality of evidence','~60 mm Hg: perfusion threshold']},
 {rows:[['80–85 mm Hg, day 28',36.6],['65–70 mm Hg, day 28',34.0],['80–85 mm Hg, day 90',43.8],['65–70 mm Hg, day 90',42.3]],cap:'SEPSISPAM mortality'},
 {rows:[['60–65 mm Hg, day 90',41.0],['usual care, day 90',43.8]],cap:'65 trial mortality',extra:'vasopressors: median 33 vs 38 h'},
 {txt:['RR 0.93 (95% CrI 0.76 to 1.07)','87% probability lower is better','low certainty']}
];
const PR_ST=[
 {n:'Annane 2002',o:'death, 28 d, non-responders',a:['steroids',53],b:['placebo',63],e:'HR 0.67 (0.47 to 0.95)',v:'fewer deaths',good:1},
 {n:'CORTICUS 2008',o:'death, 28 d',a:['hydrocortisone',34.3],b:['placebo',31.5],e:'P=0.51',v:'no difference'},
 {n:'ADRENAL 2018',o:'death, 90 d',a:['hydrocortisone',27.9],b:['placebo',28.8],e:'OR 0.95 (0.82 to 1.10)',v:'shock 3 vs 4 days'},
 {n:'APROCCHSS 2018',o:'death, 90 d',a:['hydro + fludro','43.0'],b:['placebo',49.1],e:'RR 0.88 (0.78 to 0.99)',v:'fewer deaths',good:1}
];
const PR_PV={
 cg:{k:2,big:'2%',u:'of 783 peripheral infusions extravasated',cap:`In one medical ICU (734 patients, 783 peripheral infusions, mean 49 h), extravasation occurred in 2% (19 patients), with no tissue injury after treatment; 13% eventually needed central access [[CardenasGarcia2015JHM]].`},
 tian:{k:3,big:'3.4%',u:'of peripheral infusions extravasated (pooled; shown as 3 in 100)',cap:`A 2020 systematic review (7 studies, 1382 patients) found extravasation in 3.4% (95% CI 2.5% to 4.7%) of peripheral infusions, with no reported tissue necrosis or limb ischaemia [[Tian2020EMA]].`},
 yerke:{k:52,big:'51.6%',u:'of first exposures never needed a central line',cap:`In 635 patients given peripheral norepinephrine under a protocol, 51.6% of first exposures never needed a central line. Extravasation occurred in 35 patients (75.8 events per 1000 infusion-days), and no patient needed surgery [[Yerke2024Chest]].`},
 lou:{k:85,big:'85.3%',u:'of injury events were further out than the elbow or knee crease',cap:`Of 204 published local tissue injury events from peripheral vasopressors, 85.3% occurred at sites distal to the antecubital or popliteal fossa [[Loubani2015JCC]]. That is why the SSC remark specifies a vein "in or proximal to the antecubital fossa" [[Evans2021SSC]].`}
};
inits.pressors=()=>{
  /* ---------- receptor animation ---------- */
  const rs=$('#prRec'),rr=$('#prRT'),rn=$('#prRNote'),rrd=$('#prRRead');let drug='na',setR=()=>{};
  function drawR(t){
    const N=vb(rs,'720 340','400 590'),D=PR_DR[drug],ph=phaseOf(PR_RSTEPS,t);
    const travel=ramp(t,.08,.45),bind=ramp(t,.34,.56),eff=ease(ramp(t,.58,.9));
    const L=N?{p:[16,34,120,78],v:[16,142,368,112],h:[110,330,74],k:[292,330,62],b:[16,430,190],g:[300,544,58]}
             :{p:[20,40,130,84],v:[200,40,300,124],h:[600,92,84],k:[600,250,66],b:[20,214,150],g:[380,300,64]};
    let s=`<text x="${N?150:20}" y="${N?22:24}" class="t-lbl">${PR_RSTEPS[ph].t} · ${D.n}</text>`;
    const P=pump(L.p[0],L.p[1]+(N?6:14),L.p[2],L.p[3],{v:ramp(t,.05,1),txt:D.s,on:t>.04,col:D.col});s+=P.svg;
    /* vessel: relaxed at first (vasoplegia), tightens where the drug acts on it */
    const vt=D.v?eff:0,V=vessel(L.v[0],L.v[1],L.v[2],L.v[3],{flow:1,ph:(t*10)%1,dilate:1-.85*vt,seed:7});s+=V.svg;
    s+=`<text x="${L.v[0]+L.v[2]}" y="${L.v[1]+L.v[3]+14}" class="t-xs t-end">${vt>.5?'vessel muscle tightens':'relaxed, widened vessel (vasoplegia)'}</text>`;
    const tg={};const vc=[L.v[0]+L.v[2]*.5,V.at.top-4];
    if(D.v)tg.v=vc;if(D.h)tg.h=[L.h[0],L.h[1]];if(D.kd)tg.k=[L.k[0],L.k[1]];
    /* receptor sites on the targets */
    const rec=(x,y,lab,on)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(5+3*on)}" style="fill:${on>.05?D.col:'var(--panel-2)'};stroke:${D.col};stroke-width:1.5;opacity:${f1(.5+.5*on)}"/>`+(lab?`<text x="${f1(x)}" y="${f1(y-12)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700;opacity:${f1(.35+.65*on)}">${lab}</text>`:'');
    if(D.v)for(let i=0;i<3;i++){const x=L.v[0]+L.v[2]*(.25+.25*i);s+=rec(x,V.at.top-3,i===1?D.v:'',bind)}
    /* heart: beats harder when the drug acts on it */
    const hs=D.h?eff:0,beat=1+(.03+.07*hs)*Math.max(0,Math.sin(t*Math.PI*2*(14+8*hs))),[hx,hy,hz]=L.h;
    s+=`<g transform="translate(${f1(hx)} ${f1(hy)}) scale(${f1(beat)}) translate(${f1(-hx)} ${f1(-hy)})">${organ('heart',hx,hy,hz,{label:'heart'})}</g>`;
    if(D.h)s+=rec(hx+hz*.45,hy-hz*.38,D.h,bind);else s+=`<text x="${f1(hx)}" y="${f1(hy-hz*.55)}" class="t-xs t-mid">no action shown</text>`;
    const [kx,ky,kz]=L.k;s+=organ('kidney',kx,ky,kz,{label:'kidneys'});
    if(D.kd){s+=rec(kx+kz*.5,ky-kz*.4,D.kd,bind);if(eff>.1)for(let i=0;i<4;i++){const a=i/4*Math.PI*2+t*4;s+=`<circle cx="${f1(kx+Math.cos(a)*kz*.6)}" cy="${f1(ky+Math.sin(a)*kz*.35)}" r="2.6" style="fill:var(--fluid);opacity:${f1(eff)}"/>`}}
    /* drug particles travelling from the pump to each target */
    Object.values(tg).forEach((to,j)=>{for(let i=0;i<6;i++){const u=clamp(travel*1.4-i*.08);if(u<=0||u>=1&&bind>.9)continue;const k=ease(u);
      const x=lerp(P.out[0],to[0],k),y=lerp(P.out[1],to[1],k)+Math.sin(k*Math.PI*2+i+j)*8*(1-k);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.2" style="fill:${D.col};opacity:${f1(.9-.4*k)}"/>`}});
    /* bars */
    const [bx,by,bw]=L.b,bars=[['vessel tone',.2+.7*vt,'var(--rx)'],['heart squeeze',.45+.45*hs,'var(--organ)']];if(D.kd)bars.push(['water kept (V2)',.1+.7*eff,'var(--fluid)']);
    bars.forEach(([l,v,c],i)=>{const y=by+i*28;s+=`<text x="${bx}" y="${y}" class="t-sm">${l}</text><rect x="${bx}" y="${y+4}" width="${bw}" height="11" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+4}" width="${f1(bw*clamp(v))}" height="11" rx="3" style="fill:${c}"/>`});
    const bp=30+(D.bp?38*eff:0);
    s+=gauge(L.g[0],L.g[1],L.g[2],bp,100,{ticks:false,label:'blood pressure (schematic)'});
    if(!D.bp)s+=`<text x="${L.g[0]}" y="${L.g[1]+30}" class="t-xs t-mid">unchanged: pressure already adequate</text>`;
    rs.innerHTML=s;
    rrd.innerHTML=`<span>Drug <b>${D.n}</b></span><span>Vessel <b>${D.v?(vt>.5?'tightened':'not yet'):'no action shown'}</b></span><span>Heart <b>${D.h?(hs>.5?'stronger beat':'not yet'):'no action shown'}</b></span>${D.kd?`<span>Kidney <b>${eff>.5?'holding water':'not yet'}</b></span>`:''}`;
    rn.innerHTML=noteHTML({k:`${PR_RSTEPS[ph].k} · ${D.n}`,t:D.n,txt:D.txt,pt:D.pt,hook:D.hook});setR(ph);
  }
  const stopR=playWire(rr,$('#prRPlay'),drawR,9000,'Replay','pressors');
  setR=stepWire($('#prRSteps'),PR_RSTEPS,rr,drawR,stopR);
  $$('#m-pressors [data-dr]').forEach(b=>b.addEventListener('click',()=>{drug=b.dataset.dr;
    $$('#m-pressors [data-dr]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopR();rr.value=.9;drawR(.9)}));
  drawR(+rr.value);

  /* ---------- escalation ruler ---------- */
  const es=$('#prEsc'),er=$('#prET'),en=$('#prENote'),erd=$('#prERead');let setE=()=>{};
  const DOSE=monoFn([[0,.02],[.2,.1],[.4,.3],[.66,.33],[.8,.6],[1,.62]]);
  const LANES=[['Noradrenaline','first line, from the start',0],['Vasopressin','SSC 2021 remark: usually at 0.25–0.5',2],['Hydrocortisone','SSC 2021 remark: ≥0.25 for ≥4 h',3],['Adrenaline or angiotensin II','if MAP still low; no start dose published',4],['Inotrope (dobutamine)','only for a weak heart with hypoperfusion',5]];
  function drawE(t){
    const N=vb(es,'720 330','400 440'),ph=phaseOf(PR_ESTEPS,t),d=DOSE(t),hrs=4*ramp(t,.5,.63);
    const x0=N?20:40,x1=N?380:680,X=v=>x0+(x1-x0)*v,ry=N?110:112;
    let s=`<text x="${N?14:20}" y="${N?20:24}" class="t-lbl">${ph+1} · ${PR_ESTEPS[ph].t}</text>`;
    /* SSC vasopressin band */
    s+=`<rect x="${f1(X(.25))}" y="${ry-38}" width="${f1(X(.5)-X(.25))}" height="16" rx="3" style="fill:var(--rx-soft)"/><text x="${f1((X(.25)+X(.5))/2)}" y="${ry-27}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">${N?'SSC vaso':'SSC 2021: vasopressin usually started'}</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${ry}" y2="${ry}" style="stroke:var(--ink);stroke-width:2"/>`;
    for(let v=0;v<=1.0001;v+=.1){const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${ry}" y2="${ry+6}" style="stroke:var(--ink)"/>`;if(Math.round(v*10)%2===0)s+=`<text x="${f1(xx)}" y="${ry+18}" class="t-xs t-mid">${v.toFixed(1)}</text>`}
    s+=`<text x="${x1}" y="${ry+30}" class="t-xs t-end">noradrenaline (or equivalent), µg/kg/min</text>`;
    /* flags */
    const flag=(v,y,lab,col)=>`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y+3}" y2="${ry}" style="stroke:${col};stroke-width:1.3;stroke-dasharray:3 2"/><text x="${f1(X(v))}" y="${y}" class="t-xs t-mid" style="fill:${col};font-weight:700">${lab}</text>`;
    s+=flag(.1,N?42:46,N?'VASSPR low':'VASSPR low (0.1)','var(--dx)')+flag(.4,N?42:46,N?'VASSPR high':'VASSPR high (0.4)','var(--dx)')+flag(.2,N?60:64,N?'ATHOS-3':'ATHOS-3 entry (>0.2)','var(--brand)');
    s+=`<line x1="${f1(X(.25))}" x2="${f1(X(.25))}" y1="${ry}" y2="${ry+40}" style="stroke:var(--accent);stroke-width:1.3;stroke-dasharray:3 2"/><text x="${f1(X(.25)+4)}" y="${ry+44}" class="t-xs" style="fill:var(--accent);font-weight:700">${N?'steroids ≥0.25, ≥4 h':'SSC 2021 steroid remark: ≥0.25 for ≥4 h'}</text>`;
    /* the moving marker */
    const mx=X(d);s+=`<path d="M${f1(mx)} ${ry-2}l-7 -12h14z" style="fill:var(--ink)"/><text x="${f1(mx+9)}" y="${ry-6}" class="t-sm" style="fill:var(--ink);font-weight:700">${d.toFixed(2)}</text>`;
    /* lanes */
    const ly0=N?190:184,lh=N?52:27;
    LANES.forEach(([n,dd,st],i)=>{const on=ph>=st,cur=ph===st,y=ly0+i*lh;
      if(cur)s+=`<rect x="${N?10:30}" y="${y-14}" width="${N?380:(ph===3?520:660)}" height="${lh-4}" rx="6" style="fill:var(--rx-soft)"/>`;
      s+=`<circle cx="${N?22:44}" cy="${y-4}" r="6" style="fill:${on?'var(--rx)':'var(--panel-2)'};stroke:var(--rx)"/>`;
      s+=`<text x="${N?34:58}" y="${y}" class="t-lbl" style="font-size:12.5px;${on?'':'fill:var(--muted)'}">${n}</text><text x="${N?34:270}" y="${N?y+15:y}" class="t-xs">${dd}</text>`});
    /* the 4-hour clock in step 4 */
    if(ph===3){const cx=N?330:640,cy=N?ly0+2*lh-6:ly0+2*lh-6;s+=clock(cx,cy,N?20:22,hrs*60,{full:240,col:'var(--accent)',label:hrs>=3.99?'4 h reached':Math.floor(hrs*60)+' min'})}
    es.innerHTML=s;
    erd.innerHTML=`<span>Illustrative dose <b>${d.toFixed(2)} µg/kg/min</b></span><span>Lanes lit <b>${LANES.filter(l=>ph>=l[2]).length} of 5</b></span>${ph===3?`<span>Time at dose <b>${hrs.toFixed(1)} h</b></span>`:''}`;
    en.innerHTML=noteHTML(PR_ESTEPS[ph]);setE(ph);
  }
  const stopE=playWire(er,$('#prEPlay'),drawE,24000,'Replay','pressors');
  setE=stepWire($('#prESteps'),PR_ESTEPS,er,drawE,stopE);
  drawE(+er.value);

  /* ---------- MAP targets ---------- */
  const ms=$('#prMap'),mr=$('#prMT'),mn=$('#prMNote'),mrd=$('#prMRead');let setM=()=>{};
  const NEED=t=>{const ph=phaseOf(PR_MSTEPS,t),S=PR_MSTEPS[ph];
    if(ph===0)return lerp(52,65,ease(ramp(t,.02,.12)));
    if(ph===2)return 67.5+15*bump(t,.42,.58)*(ramp(t,.42,.46)>0?1:0);
    if(ph===3)return lerp(65,62.5,ease(ramp(t,.6,.68)));
    return S.needle};
  function drawM(t){
    const N=vb(ms,'720 320','400 480'),ph=phaseOf(PR_MSTEPS,t),S=PR_MSTEPS[ph],v=NEED(t);
    const G=N?{x:200,y:206,r:150}:{x:200,y:236,r:162};
    let s=`<text x="${N?14:20}" y="${N?20:24}" class="t-lbl">${ph+1} · ${S.t}</text>`;
    /* zones: cumulative bands for the gauge */
    const bands=[];let last=0;S.zones.slice().sort((a,b)=>a[0]-b[0]).forEach(([a,b,c])=>{if(a>last)bands.push({to:a,col:'var(--panel-2)'});bands.push({to:b,col:c});last=b});
    s+=gauge(G.x,G.y,G.r,v,120,{bands,big:true,unit:'mm Hg',label:'MAP'});
    [60,65,70,80,85].forEach(z=>{if(!S.zones.some(([a,b])=>a===z||b===z))return;const a=Math.PI*(1-z/120),rr2=G.r+12;s+=`<text x="${f1(G.x+rr2*Math.cos(a))}" y="${f1(G.y-rr2*Math.sin(a)+3)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${z}</text>`});
    /* right panel */
    const B=PR_MBARS[ph],bx=N?20:420,by=N?262:70,bw=N?300:220;
    if(B.rows){s+=`<text x="${bx}" y="${by}" class="t-sm" style="fill:var(--ink)">${B.cap}</text>`;
      B.rows.forEach(([l,val],i)=>{const y=by+18+i*(N?38:44),w=bw*val/60;s+=`<text x="${bx}" y="${y}" class="t-xs">${l}</text><rect x="${bx}" y="${y+5}" width="${bw}" height="14" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+5}" width="${f1(w*ease(ramp(t,S.from,S.from+.06)))}" height="14" rx="3" style="fill:${i%2?'var(--muted)':'var(--rx)'}"/><text x="${f1(bx+bw+6)}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:700">${val.toFixed(1)}%</text>`});
      if(B.extra)s+=`<text x="${bx}" y="${by+18+B.rows.length*(N?38:44)+4}" class="t-xs" style="fill:var(--ink)">${B.extra}</text>`;
      s+=`<text x="${bx}" y="${by+18+B.rows.length*(N?38:44)+(B.extra?20:4)}" class="t-xs">scale 0–60%</text>`}
    else B.txt.forEach((l,i)=>{s+=`<text x="${bx}" y="${by+22+i*(N?30:34)}" class="${i?'t-sm':'t-big'}" style="fill:var(--ink)">${l}</text>`});
    ms.innerHTML=s;
    mrd.innerHTML=`<span>Needle <b>${Math.round(v)} mm Hg</b></span><span>Zone <b>${S.zones.map(([a,b])=>b-a<2?a:a+'–'+b).join(' and ')} mm Hg</b></span>`;
    mn.innerHTML=noteHTML(PR_MSTEPS[ph]);setM(ph);
  }
  const stopM=playWire(mr,$('#prMPlay'),drawM,20000,'Replay','pressors');
  setM=stepWire($('#prMSteps'),PR_MSTEPS,mr,drawM,stopM);
  drawM(+mr.value);

  /* ---------- MAP arithmetic ---------- */
  const sb=$('#prSbp'),db=$('#prDbp'),mo=$('#prMapOut');
  function calc(){const S=+sb.value,D=+db.value;$('#prSbpO').textContent=S+' mm Hg';$('#prDbpO').textContent=D+' mm Hg';
    if(D>=S){mo.innerHTML=`<div style="grid-column:1/-1"><small>The diastolic (bottom) number is always lower than the systolic (top) number. Move one of the sliders.</small></div>`;return}
    const pp=S-D;mo.innerHTML=`<div><small>traditional: DBP + PP/3</small><b>${Math.round(D+pp/3)}</b><small>mm Hg</small></div><div><small>DBP + 0.412 × PP</small><b>${Math.round(D+.412*pp)}</b><small>mm Hg</small></div><div style="grid-column:1/-1"><small>pulse pressure (PP) = ${S} − ${D} = ${pp} mm Hg</small></div>`}
  sb.addEventListener('input',calc);db.addEventListener('input',calc);calc();

  /* ---------- hydrocortisone trials ---------- */
  const ss=$('#prSt');let stopS=null;
  const drawSt=p=>flDumb(ss,PR_ST,p,{max:70,aria:'Dot chart of four hydrocortisone trials, death rates from 0 to 70 percent. '});
  $('#prStPlay').addEventListener('click',()=>{if(stopS)stopS();stopS=animate(900,drawSt,()=>{stopS=null})});
  drawSt(1);

  /* ---------- peripheral safety ---------- */
  const ps=$('#prPer'),pc=$('#prPerCap');let pv='cg';
  function drawP(){const N=vb(ps,'720 140','400 200'),D=PR_PV[pv];
    const wrap=(txt,n)=>{const out=[''];txt.split(' ').forEach(w=>{const c=out[out.length-1];if(c&&(c+' '+w).length>n)out.push(w);else out[out.length-1]=c?c+' '+w:w});return out};
    let s=`<text x="${N?16:20}" y="${N?40:62}" class="t-big" style="font-size:${N?32:40}px;fill:var(--rx)">${D.big}</text>`;
    wrap(D.u,N?56:26).forEach((l,i)=>{s+=`<text x="${N?16:20}" y="${(N?60:86)+i*15}" class="t-sm" style="fill:var(--ink)">${l}</text>`});
    const I=icons(N?20:220,N?92:30,{n:100,cols:N?20:25,k:D.k,size:N?12:15,gap:N?5:4,col:'var(--rx)',base:'var(--line)',shape:'dot'});s+=I.svg;
    ps.innerHTML=s;pc.innerHTML=D.cap;
    ps.setAttribute('aria-label',`An array of 100 dots with ${D.k} highlighted: ${D.big} ${D.u}.`)}
  $$('#m-pressors [data-pv]').forEach(b=>b.addEventListener('click',()=>{pv=b.dataset.pv;$$('#m-pressors [data-pv]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP()}));
  drawP();
  const prevR=redraws.pressors;redraws.pressors=()=>{prevR&&prevR();drawSt(1);drawP()};
};
