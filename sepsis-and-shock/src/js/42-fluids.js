/* ===== 4.2 Fluids ===== */
/* Frank–Starling story: five steps. The curve shape and the dots are schematic; numbers in the notes are cited. */
const FL_SSTEPS=[
 {from:0,at:.1,k:'Step 1 · the curve',t:'Preload and stroke volume',
  txt:`Cardiac output equals stroke volume times heart rate, and depends on heart rate, contractility, preload and afterload. Preload is "the degree of myocardial distension prior to shortening". Within limits, the more the muscle is stretched, the harder it contracts: the Frank–Starling relationship [[Vincent2008CO]]. In sepsis, cardiac output is usually normal or high even when the heart muscle is depressed, because low vascular tone lowers afterload [[Vincent2008CO]].`,
  pt:`The heart works like a spring: filling it a little more makes it push out more blood, but only up to a point.`,
  hook:`CO = SV × HR. Four determinants: heart rate, contractility, preload, afterload [[Vincent2008CO]].`},
 {from:.18,at:.3,k:'Step 2 · the steep part',t:'Patient A: fluid helps',
  txt:`Patient A sits on the steep part. A fluid bolus stretches the heart a little more and stroke volume rises a lot: fluid raises stroke volume through the Frank–Starling mechanism, "like adding a tailwind to the cyclist" [[Vincent2008CO]]. The ESICM consensus defines a positive response to fluid as a cardiac output rise of at least 10–15%, and recommends giving fluid as a challenge, unless hypovolaemia is obvious [[Cecconi2014ESICM]].`,
  pt:`For some people, a drip of fluid makes the heart pump noticeably more blood. That is what doctors hope to see.`,
  hook:`Positive fluid response = cardiac output up by ≥10–15% (ESICM) [[Cecconi2014ESICM]].`},
 {from:.38,at:.5,k:'Step 3 · the flat part',t:'Patient B: fluid adds little',
  txt:`Patient B is already on the flat part. The same bolus barely changes stroke volume, so the fluid adds volume without adding flow. Only about half of unstable patients respond to fluid: 56% in a 24-study review, and a mean of 50% (95% CI 42% to 56%) across 50 studies [[Marik2008CVP,Bentzer2016JAMA]]. Observational studies tie a positive fluid balance to higher mortality, although sicker patients get more fluid [[Messmer2020CCM]].`,
  pt:`For others, more fluid does not help the heart pump more. It can collect in the tissues and lungs instead.`,
  hook:`About 1 in 2 unstable patients is fluid-responsive [[Bentzer2016JAMA]].`},
 {from:.58,at:.69,k:'Step 4 · a reversible test',t:'Passive leg raise',
  txt:`Back to the start, before any fluid. Raising the legs is a test that can be undone. With cardiac output measured, passive leg raising predicted fluid response with sensitivity 0.85, specificity 0.91 and an AUC of 0.95; the best threshold was a rise of ≥10 ± 2% [[Monnet2016PLR]]. A rise gave a positive likelihood ratio of 11, and no rise a negative LR of 0.13 [[Bentzer2016JAMA]]. Judged by pulse pressure instead of cardiac output, sensitivity fell to 0.56 [[Monnet2016PLR]]. SSC 2021 suggests "using dynamic measures to guide fluid resuscitation, over physical examination or static parameters alone" (weak, very low quality) [[Evans2021SSC]].`,
  pt:`Lifting the legs for a minute is a test. If the heart pumps more blood with the legs up, more fluid will probably help [[Monnet2016PLR,Bentzer2016JAMA]].`,
  hook:`PLR with cardiac output: AUC 0.95, threshold ≥10% [[Monnet2016PLR]]. Physical examination was not predictive [[Bentzer2016JAMA]].`},
 {from:.8,at:.93,k:'Step 5 · which test',t:'Why a static pressure fails',
  txt:`A single pressure reading cannot tell where a patient sits on the curve. Central venous pressure correlates poorly with blood volume (r 0.16) and does not predict response (AUC 0.56); the authors conclude it "should not be used to make clinical decisions regarding fluid management" [[Marik2008CVP]]. In ventilated patients, pulse pressure variation reached an AUC of 0.94, valid only during controlled ventilation without spontaneous breathing [[Marik2009PPV]]. In FRESH, PLR-guided care gave a lower 72-h balance (0.65 vs 2.02 L) and less RRT (5.1% vs 17.5%) [[Douglas2020FRESH]].`,
  pt:`A single pressure number from a central line does not tell doctors whether more fluid will help. Tests that watch how the heart responds work much better [[Marik2008CVP,Monnet2016PLR]].`,
  hook:`AUC: CVP 0.56, PPV 0.94, PLR 0.95 [[Marik2008CVP,Marik2009PPV,Monnet2016PLR]].`}
];
/* leak and balance story */
const FL_LSTEPS=[
 {from:0,at:.1,k:'Step 1 · a healthy vessel',t:'The glycocalyx lining',
  txt:`The glycocalyx is a gel-like layer lining the inside of blood vessels, about 0.5–5.0 μm thick, made of proteoglycans (syndecan-1 is the most studied), glycosaminoglycans and plasma proteins. It controls vessel permeability and tone, prevents microvascular thrombosis and regulates white-cell adhesion [[Uchimido2019]].`,
  pt:`The inside of blood vessels has a thin, gel-like lining that helps keep fluid inside them [[Uchimido2019]].`,
  hook:`Glycocalyx: 0.5–5.0 μm; syndecan-1 and heparan sulfate [[Uchimido2019]].`},
 {from:.18,at:.3,k:'Step 2 · sepsis',t:'The lining sheds, the vessel leaks',
  txt:`In sepsis, metalloproteinases, heparanase and hyaluronidase shed the glycocalyx, causing leaky vessels, unregulated vasodilation and microthrombi [[Uchimido2019]]. Pro-inflammatory proteases make endothelial cells lose their tight junctions, and leaky capillaries lose protein and plasma into the tissues [[Hotchkiss2016NRDP]]. Vasoplegia, the failure of vessels to constrict, is classically attributed to nitric oxide, ATP-sensitive potassium channels and relative vasopressin deficiency [[Landry2001]].`,
  pt:`Sepsis strips the lining away. The vessels widen and leak, so blood pressure falls [[Uchimido2019]].`,
  hook:`Distributive shock is "relative hypovolemia": the blood volume is redistributed, not lost [[Standl2018]].`},
 {from:.38,at:.5,k:'Step 3 · resuscitation',t:'Fluid goes in',
  txt:`SSC 2021 suggests "at least 30 mL/kg of intravenous (IV) crystalloid fluid" within the first 3 h for sepsis-induced hypoperfusion or septic shock (weak, low quality), and SSC 2026 keeps it (conditional, low certainty) [[Evans2021SSC,Prescott2026SSC]]. In VASST, average fluid balance was already +4.2 L at enrolment, about 12 h after presentation [[Boyd2011VASST]].`,
  pt:`Guidelines suggest a first amount of fluid based on body weight, given over the first few hours [[Evans2021SSC,Prescott2026SSC]].`,
  hook:`30 mL/kg in 3 h: weak recommendation, low-quality evidence [[Evans2021SSC]].`},
 {from:.6,at:.72,k:'Step 4 · the days after',t:'Fluid leaks, balance keeps rising',
  txt:`In VASST, cumulative balance reached +11 L by day 4, and a more positive balance at 12 h and at day 4 was associated with higher 28-day mortality; CVP above 12 mm Hg at 12 h went with the highest mortality [[Boyd2011VASST]]. Across 31 observational studies, mortality rose by a factor of 1.19 per litre of positive balance [[Messmer2020CCM]]. Over-aggressive fluid may itself worsen glycocalyx damage (Hypothesis) [[Uchimido2019]]. These are associations: sicker patients receive more fluid.`,
  pt:`Some of the fluid leaks out of the vessels into the tissues, so the body can end up holding many litres of extra fluid [[Boyd2011VASST]].`,
  hook:`VASST balance: +4.2 L at 12 h, +11 L by day 4 [[Boyd2011VASST]].`},
 {from:.82,at:.95,k:'Step 5 · de-resuscitation',t:'The four phases',
  txt:`A review proposes four phases of septic-shock fluid therapy: resuscitation, optimisation, stabilisation and evacuation (de-resuscitation), with fluid treated as a drug: "four D's" of drug, dosing, duration and de-escalation (a framework, not trial evidence) [[Malbrain2018AIC]]. In FACTT (acute lung injury), a conservative strategy gave a mean 7-day balance of −136 mL versus +6992 mL and more ventilator-free days (14.6 vs 12.1), without more shock or dialysis [[Wiedemann2006FACTT]].`,
  pt:`One proposed way of thinking about it: once the person is stable, the aim shifts from giving fluid to letting the body lose the extra fluid it has stored [[Malbrain2018AIC]].`,
  hook:`Four phases (Malbrain): resuscitation, optimisation, stabilisation, evacuation [[Malbrain2018AIC]].`}
];
/* the trial rows: a = tested fluid or strategy, b = comparison, c = third arm. Values are % as published. */
const FL_TRIALS=[
 {g:'type',n:'SMART 2018',o:'kidney events, 30 d',a:['balanced',14.3],b:['saline',15.4],e:'OR 0.91 (0.84 to 0.99)',v:'small kidney benefit'},
 {g:'type',n:'SALT-ED 2018',o:'kidney events (ED)',a:['balanced',4.7],b:['saline',5.6],e:'aOR 0.82',v:'fewer kidney events'},
 {g:'type',n:'BaSICS 2021',o:'death, 90 d',a:['balanced',26.4],b:['saline',27.2],e:'HR 0.97 (0.90 to 1.05)',v:'no difference'},
 {g:'type',n:'PLUS 2022',o:'death, 90 d',a:['Plasma-Lyte',21.8],b:['saline','22.0'],e:'−0.15 pts (−3.60 to 3.30)',v:'no difference'},
 {g:'col',n:'SAFE 2004',o:'deaths, 28 d',a:null,b:null,cnt:'726 vs 729 deaths',e:'RR 0.99 (0.91 to 1.09)',v:'4% albumin = saline'},
 {g:'col',n:'ALBIOS 2014',o:'death, 90 d',a:['20% albumin',41.1],b:['crystalloid',43.6],e:'RR 0.94 (0.85 to 1.05)',v:'no clear difference'},
 {g:'col',n:'6S 2012',o:'death, 90 d',a:['starch',51],b:['Ringer',43],e:'RR 1.17 (1.01 to 1.36)',v:'harm',harm:1},
 {g:'col',n:'CHEST 2012',o:'death, 90 d',a:['starch','18.0'],b:['saline','17.0'],e:'RR 1.06 (0.96 to 1.18)',v:'more RRT (7.0 vs 5.8%)',harm:1},
 {g:'vol',n:'CLASSIC 2022',o:'death, 90 d',a:['restrictive',42.3],b:['standard',42.1],e:'+0.1 pts (−4.7 to 4.9)',v:'no difference'},
 {g:'vol',n:'CLOVERS 2023',o:'death by day 90',a:['restrictive','14.0'],b:['liberal',14.9],e:'−0.9 pts (−4.4 to 2.6)',v:'no difference'},
 {g:'vol',n:'ARISE FLUIDS 2026',o:'pulmonary oedema',a:['vasopressors',0.6],b:['fluids','5.0'],e:'P<0.001',v:'less lung fluid'},
 {g:'lr',n:'FEAST 2011',o:'death, 48 h',a:['saline bolus',10.5],c:['albumin bolus',10.6],b:['no bolus',7.3],e:'RR 1.45 (1.13 to 1.86)',v:'boluses harmed',harm:1},
 {g:'lr',n:'Zambia 2017',o:'death in hospital',a:['protocol',48.1],b:['usual care',33.0],e:'RR 1.46 (1.04 to 2.05)',v:'protocol harmed',harm:1}
];
const FL_TCAP={
 all:`Thirteen trials on one scale. Most rows show two dots almost on top of each other: whichever fluid or strategy was tested, death rates barely moved. The exceptions are starches (6S) and boluses in settings without intensive care (FEAST, Zambia) [[Perner2012SixS,Maitland2011FEAST,Andrews2017Zambia]]. SAFE published death counts, not percentages, so its row has no dots [[Finfer2004SAFE]].`,
 type:`SMART found a small reduction in major adverse kidney events with balanced crystalloids (14.3% vs 15.4%) [[Semler2018SMART]], and SALT-ED a similar signal in non-critically ill emergency patients (4.7% vs 5.6%), with no difference in hospital-free days [[Self2018SALTED]]. BaSICS and PLUS found no mortality difference [[Zampieri2021BaSICSfluid,Finfer2022PLUS]]. SSC 2021 and 2026 suggest balanced crystalloids over saline [[Evans2021SSC,Prescott2026SSC]].`,
 col:`4% albumin matched saline in SAFE (726 vs 729 deaths) [[Finfer2004SAFE]], and 20% albumin did not clearly lower 90-day mortality in ALBIOS, although MAP was higher and net balance lower [[Caironi2014ALBIOS]]. Starch raised 90-day mortality and renal replacement therapy in 6S (RRT 22% vs 16%) [[Perner2012SixS]], and RRT and adverse events in CHEST (5.3% vs 2.8%) [[Myburgh2012CHEST]]. SSC strongly recommends against starches [[Evans2021SSC,Prescott2026SSC]].`,
 vol:`Giving less fluid after the first litres, with earlier vasopressors, did not change death rates in CLASSIC or CLOVERS [[Meyhoff2022CLASSIC,Shapiro2023CLOVERS]]. ARISE FLUIDS' main outcome, days alive and out of hospital, was 76 in both groups; the row shows pulmonary oedema, which was less common with early vasopressors [[Peake2026ARISEFLUIDS]].`,
 lr:`FEAST randomised 3141 African children with severe febrile illness and impaired perfusion to a 20–40 mL/kg bolus of albumin or saline, or no bolus: boluses raised 48-hour mortality, and at 4 weeks mortality was 12.2%, 12.0% and 8.7% [[Maitland2011FEAST]]. In Zambia (212 adults, 89.5% HIV-positive), the early protocol gave a median 3.5 L versus 2.0 L in 6 h [[Andrews2017Zambia]].`
};
/* a dot chart of trial arms, shared with 4.3: rows {n,o,a:[label,%],b,c,e,v,harm,cnt}; p 0..1 slides the dots in */
function flDumb(svg,rows,p,o={}){
  const N=NARROW(),mx=o.max||60,rh=N?70:42,top=N?40:46,W=N?400:720,H=top+rows.length*rh+(N?14:26);
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.dataset.mode=N?'n':'w';
  const x0=N?16:214,x1=N?384:468,X=v=>x0+(x1-x0)*clamp(v/mx)*ease(clamp(p));
  let s='';
  /* scale */
  const ay=N?24:30;
  for(let v=0;v<=mx;v+=o.step||10){const xx=x0+(x1-x0)*v/mx;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${ay+6}" y2="${f1(H-(N?8:18))}" class="grid"/><text x="${f1(xx)}" y="${ay}" class="t-xs t-mid">${v}${v===mx?(o.unit||'%'):''}</text>`}
  if(!N)s+=`<text x="16" y="${ay}" class="t-xs">trial · outcome</text><text x="486" y="${ay}" class="t-xs">published effect</text>`;
  rows.forEach((r,i)=>{const y=top+i*rh,ly=N?y+44:y+16;
    if(i%2===0)s+=`<rect x="4" y="${f1(y-4)}" width="${W-8}" height="${rh-2}" rx="6" style="fill:var(--panel-2);opacity:.55"/>`;
    const ec=r.harm?'var(--bad)':r.good?'var(--good)':'var(--ink)';
    if(N){s+=`<text x="16" y="${f1(y+11)}" class="t-lbl">${r.n}</text><text x="384" y="${f1(y+11)}" class="t-xs t-end" style="fill:${ec};font-weight:700">${r.v}</text>`;
      s+=`<text x="16" y="${f1(y+24)}" class="t-xs">${r.o}</text><text x="384" y="${f1(y+24)}" class="t-xs t-end" style="fill:var(--ink)">${r.e}</text>`}
    else{s+=`<text x="16" y="${f1(y+13)}" class="t-lbl">${r.n}</text><text x="16" y="${f1(y+27)}" class="t-xs">${r.o}</text>`;
      s+=`<text x="486" y="${f1(y+13)}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.e}</text><text x="486" y="${f1(y+27)}" class="t-xs" style="fill:${ec};font-weight:700">${r.v}</text>`}
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(ly)}" y2="${f1(ly)}" class="axis"/>`;
    if(!r.a){s+=`<text x="${f1((x0+x1)/2)}" y="${f1(ly-4)}" class="t-xs t-mid" style="fill:var(--ink)">${r.cnt}</text>`;return}
    const xa=X(r.a[1]),xb=X(r.b[1]);
    s+=`<line x1="${f1(Math.min(xa,xb))}" x2="${f1(Math.max(xa,xb))}" y1="${f1(ly)}" y2="${f1(ly)}" style="stroke:${r.harm?'var(--bad)':'var(--muted)'};stroke-width:3;opacity:.5"/>`;
    const dot=(xx,col,lab,v,up)=>`<circle cx="${f1(xx)}" cy="${f1(ly)}" r="5.5" style="fill:${col};stroke:var(--panel);stroke-width:1.5"/>`+(p>.95?`<text x="${f1(xx)}" y="${f1(up?ly-8:ly+15)}" class="t-xs t-mid" style="fill:${col==='var(--muted)'?'var(--muted)':'var(--ink)'}">${v}</text>`:'');
    const aUp=+r.a[1]>=+r.b[1];
    s+=dot(xb,'var(--muted)',r.b[0],r.b[1],!aUp);
    if(r.c)s+=dot(X(r.c[1]),'var(--fluid)',r.c[0],'',true);
    s+=dot(xa,'var(--rx)',r.a[0],r.a[1],aUp);
  });
  svg.innerHTML=s;
  svg.setAttribute('aria-label',(o.aria||'Dot chart of trial arms. ')+rows.map(r=>r.a?`${r.n}, ${r.o}: ${r.a[0]} ${r.a[1]}%${r.c?`, ${r.c[0]} ${r.c[1]}%`:''} versus ${r.b[0]} ${r.b[1]}%; ${r.e}.`:`${r.n}: ${r.cnt}; ${r.e}.`).join(' '));
}
inits.fluids=()=>{
  /* ---------- Frank–Starling ---------- */
  const svg=$('#flStar'),rg=$('#flST'),note=$('#flSNote'),rd=$('#flSRead');let setS=()=>{};
  const SV=p=>1-Math.exp(-3.2*p),A0=.25,B0=.75,BOL=.2,PLR=.12;
  function st(t){
    const back=ease(ramp(t,.58,.62)),aB=ease(ramp(t,.22,.32)),bB=ease(ramp(t,.42,.52)),leg=ease(ramp(t,.62,.67))*(1-ease(ramp(t,.73,.77)));
    const pA=A0+BOL*aB*(1-back)+PLR*leg,pB=B0+BOL*bB*(1-back)+PLR*leg;
    return {pA,pB,leg,showB:ramp(t,.38,.42),bag:t<.58?(t<.4?1-aB:1-bB):1,bagOn:t>=.18&&t<.6,
      dA:SV(pA)/SV(A0)-1,dB:SV(pB)/SV(B0)-1,auc:ramp(t,.82,.92),plrOn:t>=.6&&t<.8}}
  function draw(t){
    const N=vb(svg,'720 340','400 530'),S=st(t),ph=phaseOf(FL_SSTEPS,t);
    const C=N?{x:52,y:54,w:326,h:220}:{x:62,y:56,w:330,h:250};
    let s=`<defs>${marker('flAr','var(--ink)')}</defs><text x="${N?14:20}" y="${N?20:26}" class="t-lbl">${ph+1} · ${FL_SSTEPS[ph].t}</text>`;
    /* zones on the curve */
    const zx=v=>C.x+C.w*v;
    s+=`<rect x="${f1(zx(0))}" y="${C.y}" width="${f1(C.w*.45)}" height="${C.h}" style="fill:var(--rx-soft);opacity:.7"/><rect x="${f1(zx(.65))}" y="${C.y}" width="${f1(C.w*.35)}" height="${C.h}" style="fill:var(--accent-soft);opacity:.7"/>`;
    const cv=curve(C.x,C.y,C.w,C.h,SV,{x0:0,x1:1,y0:0,y1:1.08,col:'var(--brand)',lw:3});
    s+=cv.svg.replace(/^<rect[^>]*\/>/,'');
    s+=`<text x="${f1(zx(.02))}" y="${C.y+14}" class="t-xs" style="fill:var(--rx);font-weight:700">steep: responsive</text><text x="${f1(zx(.98))}" y="${C.y+C.h-8}" class="t-xs t-end" style="fill:var(--accent);font-weight:700">flat: little gain</text>`;
    s+=`<text x="${f1(C.x+C.w)}" y="${C.y+C.h+18}" class="t-sm t-end">preload (stretch before contraction) →</text>`;
    s+=`<text transform="translate(${C.x-14} ${C.y+C.h}) rotate(-90)" class="t-sm">stroke volume →</text>`;
    /* the dots */
    const dotAt=(p,p0,col,lab,op)=>{const [x,y]=cv.at(p),[x0,y0]=cv.at(p0);let g=`<g style="opacity:${f1(op)}">`;
      g+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${C.y+C.h}" style="stroke:${col};stroke-dasharray:3 3;stroke-width:1.2"/><line x1="${C.x}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${col};stroke-dasharray:3 3;stroke-width:1.2"/>`;
      if(p-p0>.015)g+=`<circle cx="${f1(x0)}" cy="${f1(y0)}" r="5" style="fill:none;stroke:${col};stroke-width:1.5"/><path d="M${f1(x0)} ${f1(y0)}L${f1(x)} ${f1(y)}" style="stroke:${col};stroke-width:1.6" marker-end="url(#flAr)"/>`;
      g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="7.5" style="fill:${col};stroke:var(--panel);stroke-width:2"/><text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:var(--on-brand);font-weight:700">${lab}</text></g>`;return g};
    s+=dotAt(S.pA,A0,'var(--rx)','A',1);
    if(S.showB>0)s+=dotAt(S.pB,B0,'var(--accent)','B',S.showB);
    /* right panel: patient on a bed, drip bag, leg raise */
    const R=N?{x:20,y:318,w:360}:{x:420,y:56,w:280};
    const auc=S.auc;
    if(auc<1){const op=1-auc,bx=R.x+20,by=R.y+(N?92:118),bw=R.w-40,hd=bx+22;let g=`<g style="opacity:${f1(op)}">`;
      g+=`<rect x="${bx}" y="${by}" width="${bw}" height="10" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/><line x1="${bx+8}" x2="${bx+8}" y1="${by+10}" y2="${by+32}" class="axis"/><line x1="${bx+bw-8}" x2="${bx+bw-8}" y1="${by+10}" y2="${by+32}" class="axis"/>`;
      /* person: head, torso flat, legs pivot at the hip */
      const hip=[bx+bw*.5,by-6],ang=-S.leg*40*Math.PI/180,L=Math.min(110,bw*.34),foot=[hip[0]+L*Math.cos(ang),hip[1]+L*Math.sin(ang)];
      g+=`<circle cx="${hd}" cy="${by-12}" r="9" style="fill:var(--skin);stroke:var(--ink);stroke-width:1.2"/><path d="M${hd+9} ${by-7}L${f1(hip[0])} ${f1(hip[1])}" style="stroke:var(--skin);stroke-width:13;stroke-linecap:round"/><path d="M${hd+9} ${by-7}L${f1(hip[0])} ${f1(hip[1])}" style="stroke:var(--ink);stroke-width:13.5;stroke-linecap:round;opacity:.12"/>`;
      g+=`<path d="M${f1(hip[0])} ${f1(hip[1])}L${f1(foot[0])} ${f1(foot[1])}" style="stroke:var(--skin);stroke-width:10;stroke-linecap:round"/>`;
      if(S.leg>.05){g+=`<path d="M${f1(foot[0]-6)} ${f1(foot[1]+8)}L${f1(foot[0]-6)} ${f1(by)}" style="stroke:var(--device);stroke-width:2"/><text x="${f1(foot[0]-10)}" y="${f1(foot[1]-8)}" class="t-xs t-end" style="fill:var(--ink)">legs raised</text>`}
      if(S.bagOn){const iv=ivBag(hd+20,R.y+(N?4:20),N?.85:1,{fill:S.bag,ph:t*6,label:'fluid',to:[hd+30,by-16]});g+=iv.svg}
      if(S.plrOn)g+=`<text x="${bx}" y="${R.y+(N?14:28)}" class="t-sm" style="fill:var(--ink);font-weight:700">passive leg raise: no fluid given</text>`;
      /* ΔSV bars */
      const gy=by+(N?48:56),gw=bw,X=v=>bx+gw*clamp(v/.4);
      g+=`<text x="${bx}" y="${gy-6}" class="t-sm">change in stroke volume</text>`;
      [['A',S.dA,'var(--rx)',1],['B',S.dB,'var(--accent)',S.showB]].forEach(([l,v,c,o2],i)=>{const yy=gy+i*22;
        g+=`<g style="opacity:${f1(Math.max(.15,o2))}"><rect x="${bx}" y="${yy}" width="${gw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${yy}" width="${f1(X(v)-bx)}" height="12" rx="3" style="fill:${c}"/><text x="${bx+gw+4}" y="${yy+10}" class="t-xs">${l} +${Math.round(v*100)}%</text></g>`});
      g+=`<line x1="${f1(X(.1))}" x2="${f1(X(.1))}" y1="${gy-2}" y2="${gy+38}" style="stroke:var(--ink);stroke-width:1.5;stroke-dasharray:3 2"/><text x="${f1(X(.1))}" y="${gy+50}" class="t-xs t-mid" style="fill:var(--ink)">10%</text>`;
      s+=g+'</g>'}
    if(auc>0){const bx=R.x+10,by=R.y+(N?20:40),bw=R.w-60;let g=`<g style="opacity:${f1(auc)}"><text x="${bx}" y="${by}" class="t-lbl">How well each predicts response</text><text x="${bx}" y="${by+14}" class="t-xs">area under the ROC curve (0.5 = chance, 1 = perfect)</text>`;
      const AU=[['CVP',.56,'var(--muted)'],['PPV (ventilated)',.94,'var(--dx)'],['PLR + cardiac output',.95,'var(--rx)']];
      AU.forEach(([l,v,c],i)=>{const yy=by+34+i*(N?40:46),w=bw*v*ease(auc);g+=`<text x="${bx}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text><rect x="${bx}" y="${yy+5}" width="${bw}" height="14" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${yy+5}" width="${f1(w)}" height="14" rx="3" style="fill:${c}"/><text x="${f1(bx+bw+6)}" y="${yy+16}" class="t-sm" style="fill:var(--ink);font-weight:700">${v.toFixed(2)}</text>`});
      const cx=bx+bw*.5;g+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${by+34}" y2="${by+34+3*(N?40:46)-14}" style="stroke:var(--ink);stroke-dasharray:3 3"/><text x="${f1(cx)}" y="${by+34+3*(N?40:46)}" class="t-xs t-mid">chance</text>`;
      s+=g+'</g>'}
    svg.innerHTML=s;
    rd.innerHTML=`<span>A <b>${S.dA>.005?'+'+Math.round(S.dA*100)+'%':'baseline'}</b> stroke volume</span><span>B <b>${S.showB<.5?'not shown yet':S.dB>.005?'+'+Math.round(S.dB*100)+'%':'baseline'}</b></span><span>Test <b>${S.leg>.05?'legs raised':S.bagOn&&t<.58?'fluid bolus':'none'}</b></span>`;
    note.innerHTML=noteHTML(FL_SSTEPS[ph]);setS(ph);
  }
  const stopS=playWire(rg,$('#flSPlay'),draw,22000,'Replay','fluids');
  setS=stepWire($('#flSSteps'),FL_SSTEPS,rg,draw,stopS);
  draw(+rg.value);

  /* ---------- leak and balance ---------- */
  const ls=$('#flLeak'),lr=$('#flLT'),ln=$('#flLNote'),lrd=$('#flLRead');let setL=()=>{};
  const PTS=[[0,0],[12,4.2],[96,11]];
  const HRS=t=>t<.4?0:t<.6?12*ramp(t,.4,.58):t<.82?lerp(12,96,ramp(t,.6,.8)):lerp(96,120,ramp(t,.82,.98));
  const PHASES=['Resuscitation','Optimisation','Stabilisation','Evacuation'];
  function drawL(t){
    const N=vb(ls,'720 400','400 600'),ph=phaseOf(FL_LSTEPS,t),hr=HRS(t);
    const rec=ramp(t,.84,.98),leak=ramp(t,.2,.32)*(1-.6*rec),shed=ramp(t,.2,.3)*(1-.25*rec),dil=.8*ramp(t,.22,.34)*(1-.4*rec),oed=Math.max(leak*.35,ramp(t,.45,.78))*(1-.55*rec);
    const V=N?{x:16,y:112,w:368,h:150}:{x:20,y:132,w:370,h:168};
    let s=`<text x="${N?14:20}" y="${N?20:26}" class="t-lbl">${ph+1} · ${FL_LSTEPS[ph].t}</text>`;
    /* drip bag feeding the vessel */
    const bagOn=ramp(t,.36,.4);
    if(bagOn>0){const fill=1-ramp(t,.4,.6)*.85,iv=ivBag(V.x+50,N?34:44,N?.8:.95,{fill,ph:t*10,label:'fluid',to:[V.x+70,V.y+V.h*.3]});s+=`<g style="opacity:${f1(bagOn)}">${iv.svg}</g>`}
    const ve=vessel(V.x,V.y,V.w,V.h,{flow:t<.38?1-.3*ramp(t,.2,.32):1,ph:(t*12)%1,leak,shed,dilate:dil,oedema:oed,seed:42});
    s+=ve.svg;
    const lab=(x,y,txt,col)=>`<text x="${f1(x)}" y="${f1(y)}" class="t-xs" style="fill:${col||'var(--ink)'};font-weight:700">${txt}</text>`;
    if(ph===0)s+=lab(V.x+V.w*.55,V.y-6,'glycocalyx fringe on the lining','var(--glyco)');
    if(ph===1)s+=lab(V.x+V.w*.45,V.y-6,'lining shed · gaps open · vessel widens','var(--bad)');
    if(ph>=3&&oed>.3)s+=lab(V.x+V.w*.5,V.y+V.h+14,'fluid in the tissues (oedema)','var(--fluid)');
    if(ph===2)s+=lab(V.x+V.w*.5,V.y+V.h+14,'volume refills the vessel','var(--fluid)');
    /* balance chart */
    const B=N?{x:52,y:330,w:326,h:170}:{x:452,y:62,w:244,h:210};
    const shown=Math.min(hr,96);
    const tc=tcurve(B.x,B.y,B.w,B.h,PTS,{x0:0,x1:120,y0:0,y1:12,upto:shown,col:'var(--fluid)',fill:true,dot:hr>0&&hr<=96});
    s+=tc.svg;
    if(hr>96){const p0=[tc.X(96),tc.Y(11)],p1=[tc.X(hr),tc.Y(lerp(11,8,(hr-96)/24))];s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}L${f1(p1[0])} ${f1(p1[1])}" style="stroke:var(--rec);stroke-width:2.6;stroke-dasharray:5 4"/><text x="${f1(p1[0]-2)}" y="${f1(p1[1]+16)}" class="t-xs t-end" style="fill:var(--rec);font-weight:700">drawn, not data</text>`}
    [0,4,8,12].forEach(v=>{s+=`<text x="${B.x-6}" y="${f1(tc.Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    [[0,'0'],[12,'12 h'],[48,'day 2'],[96,'day 4']].forEach(([h,l])=>{s+=`<text x="${f1(tc.X(h))}" y="${B.y+B.h+13}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${B.x}" y="${B.y-8}" class="t-sm" style="fill:var(--ink)">cumulative fluid balance (L), VASST average</text>`;
    if(hr>=12)s+=`<circle cx="${f1(tc.X(12))}" cy="${f1(tc.Y(4.2))}" r="4" style="fill:var(--fluid)"/><text x="${f1(tc.X(12)+8)}" y="${f1(tc.Y(4.2)+14)}" class="t-xs" style="fill:var(--ink);font-weight:700">+4.2 L at 12 h</text>`;
    if(hr>=96)s+=`<circle cx="${f1(tc.X(96))}" cy="${f1(tc.Y(11))}" r="4" style="fill:var(--fluid)"/><text x="${f1(tc.X(96)-6)}" y="${f1(tc.Y(11)-7)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">+11 L by day 4</text>`;
    /* the four phases strip */
    const P=N?{x:16,y:548,w:368}:{x:20,y:340,w:680},pw=P.w/4,act=ph<2?-1:ph===2?0:ph===3?(hr<48?1:2):3;
    s+=`<text x="${P.x}" y="${P.y-8}" class="t-xs">four phases of fluid therapy (proposed framework)</text>`;
    PHASES.forEach((l,i)=>{const on=i===act;s+=`<rect x="${f1(P.x+i*pw)}" y="${P.y}" width="${f1(pw-4)}" height="${N?30:34}" rx="7" style="fill:${on?'var(--rx)':'var(--panel-2)'};stroke:${on?'var(--rx)':'var(--line)'}"/><text x="${f1(P.x+i*pw+(pw-4)/2)}" y="${P.y+(N?19:21)}" class="t-mid" style="font:700 ${N?10.5:12.5}px var(--body);fill:${on?'var(--on-brand)':'var(--muted)'}">${l}</text>`});
    ls.innerHTML=s;
    const bal=hr<=96?tc.f(hr):lerp(11,8,(hr-96)/24);
    lrd.innerHTML=`<span>Time <b>${hr<.1?'before fluid':hr<24?Math.round(hr)+' h':'day '+(hr/24).toFixed(1)}</b></span><span>Lining <b>${shed<.1?'intact':shed>.9?'shed':'shedding'}</b></span><span>Balance <b>${hr<.1?'0 L':(hr>96?'falling (drawn)':'+'+bal.toFixed(1)+' L')}</b></span>`;
    ln.innerHTML=noteHTML(FL_LSTEPS[ph]);setL(ph);
  }
  const stopL=playWire(lr,$('#flLPlay'),drawL,22000,'Replay','fluids');
  setL=stepWire($('#flLSteps'),FL_LSTEPS,lr,drawL,stopL);
  drawL(+lr.value);

  /* ---------- trials at a glance ---------- */
  const ts=$('#flTri'),cap=$('#flTriCap');let grp='all',stopT=null;
  const rowsOf=g=>g==='all'?FL_TRIALS:FL_TRIALS.filter(r=>r.g===g);
  const drawT=p=>flDumb(ts,rowsOf(grp),p,{aria:'Dot chart of fluid trials, 0 to 60 percent. '});
  $$('#m-fluids [data-tr]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.tr;
    $$('#m-fluids [data-tr]').forEach(x=>x.setAttribute('aria-pressed',x===b));cap.innerHTML=FL_TCAP[grp];
    if(stopT)stopT();stopT=animate(700,drawT,()=>{stopT=null})}));
  cap.innerHTML=FL_TCAP.all;drawT(1);
  const prevR=redraws.fluids;redraws.fluids=()=>{prevR&&prevR();drawT(1)};
};
