/* =============== 5.5 Research frontier =============== */
/* Player 1 (#frSvg): eight routes. Steps 1-5 share one scene, an airway wall cut through (lumen, mucus,
   lining cells, an immune cell, eosinophils, smooth muscle, a nerve) with the alarmin and type 2 signals
   flowing between them; each step adds one class of treatment. Step 6 is a lifetime lung-function chart,
   step 7 lung repair, step 8 the alpha-1 routes in overview. A side panel gives the evidence label and the
   published results. Player 2 (#faSvg): the alpha-1 routes along gene -> RNA -> protein in a liver cell.
   Widget 3: the trial pipeline map, filters, detail panel and table. Every number comes from research pass H. */
const FR_EV={est:'Established',early:'Early evidence',hyp:'Hypothesis'};
const frEv=(k,extra)=>`<span class="ev ${k}">${FR_EV[k]}${extra?': '+extra:''}</span>`;
const FR_STEPS=[
 {from:0,at:.06,k:'Damage',t:'Smoke and viruses injure the lining',
  txt:`Epithelial damage releases IL-33, an inflammatory cytokine implicated in COPD [[Rabe2024AERIFY]], and TSLP, whose expression is higher in COPD than in healthy people [[Singh2025COURSE]]. Genetics pointed to IL-33 before the trials did: loss-of-function IL33 variants were associated with lower COPD risk, and gain-of-function variants in IL33 and IL1RL1 (the gene for ST2) with higher risk ${frEv('early')} [[Rabe2021]]. Downstream, signals such as IL-4/IL-13 and IL-5 drive type 2 inflammation [[Bhatt2023,Sciurba2025]].`,
  pt:`Damaged airway cells send out alarm signals that switch on inflammation deeper in the airway wall [[Singh2025COURSE,Rabe2024AERIFY]].`,
  hook:`TSLP and IL-33 are epithelial "alarmins" at the top of the cascade; ST2 is the IL-33 receptor [[Rabe2021,Singh2025COURSE]].`},
 {from:.125,at:.19,k:'Alarm',t:'Blocking the alarmins',
  txt:`Anti-IL-33 tozorakimab cut exacerbations by about 30% in the replicate phase 3 trials OBERON and TITANIA (rate ratios 0.70 and 0.71), without selecting patients by eosinophil count [[Sciurba2026]]. Anti-ST2 astegolimab gave a 15% pooled reduction (rate ratio 0.85) [[Wedzicha2026]]. Anti-TSLP tezepelumab missed its phase 2a primary endpoint (0.83) [[Singh2025COURSE]]. For itepekimab, AERIFY-1 was positive (0.729) and AERIFY-2 was not (0.984); both are registry-posted results, not peer-reviewed ${frEv('early')} [[NCT04701983,NCT04751487]].`,
  pt:`Newer injections block these alarm signals. One, tozorakimab, cut flare-ups by about a third in two large studies, but it is not approved yet [[Sciurba2026]].`,
  hook:`Tozorakimab reduced exacerbations by about 30% in both OBERON and TITANIA [[Sciurba2026]].`},
 {from:.25,at:.31,k:'Type 2',t:'Downstream: IL-4/IL-13 and IL-5',
  txt:`In people with blood eosinophils ≥300/µL on triple therapy, dupilumab (anti-IL-4Rα; rate ratio 0.70 in BOREAS and 0.66 in NOTUS) and mepolizumab (anti-IL-5; 0.79 in MATINEE) lowered exacerbations [[Bhatt2023,Bhatt2024,Sciurba2025]]. Both have US COPD labels limited to an eosinophilic phenotype ${frEv('est')} [[FDA-Dupixent,FDA-Nucala]]. Benralizumab, an IL-5 receptor-α cytolytic antibody, did not significantly lower the exacerbation rate in GALATHEA or TERRANOVA [[Criner2019H]].`,
  pt:`Two injections are already approved for people with COPD who have high levels of a white blood cell called the eosinophil [[FDA-Dupixent,FDA-Nucala]].`,
  hook:`BOREAS and NOTUS both required eosinophils ≥300/µL; the rate ratios were 0.70 and 0.66 [[Bhatt2023,Bhatt2024]].`},
 {from:.375,at:.44,k:'Muscle and mucus',t:'Dual PDE3/4 inhibition',
  txt:`Ensifentrine is a dual PDE3 and PDE4 inhibitor given by nebuliser. In ENHANCE-1 and ENHANCE-2, FEV1 AUC0–12h improved by 87 and 94 mL vs placebo, and the 24-week exacerbation rate ratios were 0.64 and 0.57 [[Anzueto2023]]. The FDA approved it on 26 June 2024 ${frEv('est')} [[FDA-Ohtuvayre]]. The inhaled PDE4 inhibitor tanimilast stalled: its phase 3 trials were terminated by sponsor decision, not for safety [[NCT04636801,NCT04636814]]. A cautionary result: the CXCR2 antagonist danirixin, meant to stop neutrophil migration, increased exacerbations [[Lazaar2020]].`,
  pt:`Ensifentrine is a newer inhaled medicine, breathed in through a nebuliser machine, that opens the airways [[FDA-Ohtuvayre,Anzueto2023]].`,
  hook:`Ensifentrine is a dual PDE3/PDE4 inhibitor given by nebuliser; FDA approved it on 26 June 2024 [[FDA-Ohtuvayre,Anzueto2023]].`},
 {from:.5,at:.56,k:'Structure',t:'Resurfacing airways and cutting nerves',
  txt:`Bronchial rheoplasty applies pulsed electrical fields to ablate the lining so that normal epithelium can regrow: CAT fell by 7.9 points at 6 months, uncontrolled [[Valipour2020]]. Metered cryospray improved SGRQ by 5.9 points vs sham in SPRAY-CB [[Criner2026SPRAYCB]], though a mechanistic trial found no fall in goblet-cell density [[Orton2026]]. Targeted lung denervation disrupts parasympathetic nerves to the lungs: respiratory adverse events were 32% vs 71% with sham in AIRFLOW-2 ${frEv('early')} [[Slebos2019]].`,
  pt:`Doctors are testing small procedures done through a camera tube to calm mucus-making airways or the nerves that tighten them. These are still being studied [[Criner2026SPRAYCB,Slebos2019]].`,
  hook:`Targeted lung denervation ablates parasympathetic nerves; rheoplasty and cryospray resurface the epithelium [[Slebos2019,Valipour2020,Criner2026SPRAYCB]].`},
 {from:.625,at:.69,k:'Early life',t:'Two paths into COPD',
  txt:`The normal lifetime curve has three phases, growth to early adulthood, a plateau and decline with ageing, and genes and environment can change any of them [[Agusti2019Trajectories]]. About half of COPD does not come from fast decline. In three cohorts, people with FEV1 <80% predicted before age 40 developed COPD over 22 years in 26% of cases vs 7% [[Lange2015]]. Of 332 people with COPD, about half started normal and lost 53 ± 21 mL a year; the other half started low and lost only 27 ± 18 mL a year [[Lange2015]]. In the Tasmanian cohort, three of six trajectories carried 75% of COPD burden at 53 ${frEv('est','association')} [[Bui2018]]. Perspectives on "early COPD" [[Martinez2018]] and "pre-COPD" [[Han2021]] set the agenda for catching the disease before airflow obstruction, but treating pre-COPD with bronchodilators did not help in RETHINC ${frEv('hyp','as a target')} [[Han2022RETHINC,Colak2024]].`,
  pt:`COPD can start early in life. Children whose lungs never grow to full size have a higher chance of COPD later, even if their lungs do not wear out faster [[Lange2015,Bui2018]].`,
  hook:`Half of COPD comes from a low peak FEV1 in early adulthood, not from fast decline (27 vs 53 mL a year) [[Lange2015]].`},
 {from:.75,at:.81,k:'Repair',t:'Regrowing lung tissue',
  txt:`After injury, lung progenitor cells can activate, the basis for stimulating repair or replacing cells ${frEv('hyp')} [[Kotton2014]]. Retinoids did not help in FORTE or REPAIR [[Roth2006,Stolk2012]], and mesenchymal stem-cell infusions were safe but changed no outcome [[Weiss2013]]. Autologous P63+ airway progenitor cells, brushed out, cultured 3–5 weeks and returned by bronchoscope, changed DLCO by +18.2% in 17 treated people vs −17.4% in 3 controls ${frEv('early','very small trial')} [[Wang2024P63]].`,
  pt:`Scientists are trying to regrow damaged lung tissue, but so far this works only in small early studies [[Wang2024P63,Weiss2013]].`,
  hook:`Retinoids and stem-cell infusions have failed so far; P63+ progenitor transplantation is the first small positive signal [[Roth2006,Weiss2013,Wang2024P63]].`},
 {from:.875,at:.94,k:'Alpha-1',t:'From protein back to the gene',
  txt:`In alpha-1 antitrypsin deficiency, weekly A1PI augmentation slowed CT lung density loss at TLC (−1.45 vs −2.19 g/L a year) ${frEv('est')} [[Chapman2015]]. Newer routes act earlier: RNA interference silences the Z message in the liver [[Strnad2022Fazirsiran]], correctors help Z-AAT fold [[Lomas2021]], and base or RNA editing rewrites the gene or its message ${frEv('hyp')} [[Krooss2027,Monian2026]]. The alpha-1 animation further down walks these routes step by step.`,
  pt:`For alpha-1 antitrypsin deficiency, researchers are testing ways to fix the faulty gene or its message, not only to replace the missing protein [[Krooss2027,Clark2024SEQUOIA]].`,
  hook:`Fazirsiran is an RNAi drug for AATD liver disease: it lowers Z-AAT and does not replace AAT for the lung [[Strnad2022Fazirsiran]].`}];
/* side panel per step: kind rr = rate-ratio dots, bars = horizontal bars (signed), big = one number, list = labelled routes */
const FR_P=[
 {n:'Damage and alarm signals',ev:[['early','Early evidence']],tgt:'Lining cells release IL-33 and TSLP',kind:'big',big:'2.11',
  cap:'moderate or severe flare-ups a year on placebo despite triple therapy, the unmet need (COURSE)'},
 {n:'Alarmin blockers',ev:[['early','Early evidence']],tgt:'TSLP, IL-33 and the IL-33 receptor ST2',
  extra:'COURSE: tezepelumab · OBERON, TITANIA: tozorakimab · ALIENTO, ARNASA (every 4 weeks): astegolimab · AERIFY: itepekimab',
  kind:'rr',hd:'exacerbation rate ratio vs placebo',
  rows:[['COURSE','0.83'],['OBERON','0.70'],['TITANIA','0.71'],['ALIENTO','0.85'],['ARNASA','0.82'],['AERIFY-1 *','0.729',1],['AERIFY-2 *','0.984',1]]},
 {n:'Type 2 biologics',ev:[['est','Established, eosinophilic subgroup']],tgt:'IL-4Rα, IL-5 and the IL-5 receptor',
  extra:'BOREAS, NOTUS: dupilumab · MATINEE, METREX (eosinophilic subgroup): mepolizumab · GALATHEA, TERRANOVA (100 mg): benralizumab',
  kind:'rr',hd:'exacerbation rate ratio vs placebo',
  rows:[['BOREAS','0.70'],['NOTUS','0.66'],['MATINEE','0.79'],['METREX','0.82'],['GALATHEA','0.83'],['TERRANOVA','0.93']]},
 {n:'Inhaled PDE3/4 inhibitor',ev:[['est','Established']],tgt:'PDE3 and PDE4 enzymes (ensifentrine, nebulised)',
  extra:'FEV1 AUC0–12h +87 and +94 mL vs placebo',kind:'rr',hd:'exacerbation rate ratio vs placebo, 24 weeks',
  rows:[['ENHANCE-1','0.64'],['ENHANCE-2','0.57']]},
 {n:'Bronchoscopic procedures',ev:[['early','Early evidence']],tgt:'The airway lining (rheoplasty, cryospray) and airway nerves (denervation)',
  extra:'SPRAY-CB cryospray: SGRQ −5.9 and CAT −3.4 vs sham at 12 months',kind:'bars',hd:'AIRFLOW-2: respiratory adverse events, 3–6.5 months',
  rows:[['denervation',32,'32%','var(--rx)'],['sham',71,'71%','var(--muted)']]},
 {n:'Early COPD',ev:[['est','Established association'],['hyp','Hypothesis as a target']],tgt:'Low peak lung function by early adulthood',
  extra:'Tasmania: odds of COPD at 53 were 35.0, 9.5 and 3.7 times the average path for the three at-risk paths',kind:'bars',hd:'COPD within 22 years, by FEV1 before age 40',
  rows:[['<80% predicted',26,'26%','var(--bad)'],['≥80% predicted',7,'7%','var(--muted)']]},
 {n:'Lung repair',ev:[['hyp','Hypothesis'],['early','Early evidence, one small trial']],tgt:'Air-sac walls and airway progenitor cells',
  extra:'Retinoids and stem-cell infusions: no benefit so far',kind:'bars',hd:'DLCO change at 24 weeks (P63+ trial)',
  rows:[['P63+ cells, 17',18.2,'+18.2%','var(--good)'],['controls, 3',-17.4,'−17.4%','var(--bad)']]},
 {n:'Alpha-1 routes',ev:[['est','Established'],['early','Early'],['hyp','Hypothesis']],tgt:'The SERPINA1 gene, its RNA and the AAT protein',
  kind:'list',hd:'route and its evidence label',
  rows:[['A1PI augmentation','est'],['RNAi, liver','early'],['Folding correctors','early'],['Base editing','hyp'],['RNA editing','hyp']]}];
const FR_TXT={sc:'airway wall, cut through',lin:'mucus · lining cells (epithelium) ↓',imm:'immune cell',eos:'eosinophils',
  mus:'smooth muscle ↑',nerve:'airway nerve',tslpR:'TSLP-R',st2:'ST2',il4r:'IL-4Rα',
  lg:['TSLP','IL-33','IL-4/IL-13','IL-5','antibody drug'],
  ab1:['anti-TSLP','anti-IL-33','anti-ST2'],ab2:['anti-IL-4Rα','anti-IL-5'],
  neb:'ensifentrine, nebulised',open:'airway opens (FEV1 up)',
  dev1:'lining resurfaced',dev2:'nerve signal cut',
  chT:'lung function over a lifetime (schematic)',chY:'FEV1',chX:'age, years',thr:'COPD range',b40:'age 40',
  chL:['usual path','normal start, fast decline: 53 mL a year','low start, normal decline: 27 mL a year'],
  chN:'each path led to about half of the COPD cases',
  rp:['brush cells out','culture 3–5 weeks','return them'],rpS:'damaged air sacs',
  rpR:[['bad','no benefit','Retinoids: FORTE and REPAIR'],['bad','safe, no benefit','Stem-cell (MSC) infusions'],['good','DLCO +18.2%','P63+ progenitor cells, 17 treated']],
  aH:['gene','RNA','protein','blood → lung'],aR:['base editing','RNA editing or RNAi','folding correctors','replace the protein'],
  aEv:[['hyp'],['hyp','early'],['early'],['est']],evS:{est:'Established',early:'Early',hyp:'Hypothesis'},aN:'Step through these in the alpha-1 animation below.',
  target:'target',reg:'* registry-posted, not peer-reviewed',one:'1.0 = no difference',
  step:(i,n)=>`route ${i} of ${n}`};
const FR_EVC={est:['var(--good)','var(--good-soft)'],early:['var(--warn)','var(--warn-soft)'],hyp:['var(--rx)','var(--rx-soft)'],
  good:['var(--good)','var(--good-soft)'],bad:['var(--bad)','var(--bad-soft)']};

/* ---- module drawing helpers ---- */
function frPill(x,y,k,lab){const c=FR_EVC[k],w=lab.length*6.2+12;
  return {w,svg:`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="17" rx="4" style="fill:${c[1]}"/><text x="${f1(x+6)}" y="${f1(y+12)}" style="font:600 9.5px var(--mono);fill:${c[0]};letter-spacing:.04em">${lab.toUpperCase()}</text>`}}
function frY(x,y,s,col,rot,op){return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot||0})" style="opacity:${f1(op==null?1:op)}"><path d="M0 ${f1(s*.6)}V0M0 0L${f1(-s*.42)} ${f1(-s*.5)}M0 0L${f1(s*.42)} ${f1(-s*.5)}" style="stroke:${col};stroke-width:3;stroke-linecap:round;fill:none"/></g>`}
function frGl(k,x,y,op){const c={tslp:'var(--accent)',il33:'var(--inflamed)',il4:'var(--rx)',il5:'var(--gold)'}[k],st=`style="fill:${c};opacity:${f1(op)}"`;
  if(k==='tslp')return `<path d="M${f1(x)} ${f1(y-5.5)}l5 5.5l-5 5.5l-5 -5.5z" ${st}/>`;
  if(k==='il33')return `<circle cx="${f1(x)}" cy="${f1(y)}" r="4.4" ${st}/>`;
  if(k==='il4')return `<path d="M${f1(x)} ${f1(y-5)}l5 9h-10z" ${st}/>`;
  return `<rect x="${f1(x-3.6)}" y="${f1(y-3.6)}" width="7.2" height="7.2" rx="1" ${st}/>`}
function frQ(a,c,b,s){const m=1-s;return [m*m*a[0]+2*m*s*c[0]+s*s*b[0],m*m*a[1]+2*m*s*c[1]+s*s*b[1]]}
/* particles flowing a->b; blocked fraction b fades the ones past stop */
function frFlow(k,a,c,b,n,ph,amt,blk,stop){let g='';if(amt<=.01)return g;
  for(let i=0;i<n;i++){const u=(ph+i/n)%1;let op=amt*Math.min(1,u*6,(1-u)*6);if(blk>0&&u>stop)op*=1-blk;if(op<.03)continue;
    const q=frQ(a,c,b,u);g+=frGl(k,q[0],q[1],op)}return g}
/* the side panel shared by both players */
function frPanel(L,P,u){const {px,py,pw,ph}=L;let s=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="10" style="fill:var(--panel-2)"/>`;
  let y=py+24;s+=`<text x="${px+12}" y="${y}" class="t-lbl">${P.n}</text>`;y+=10;let x=px+12;
  P.ev.forEach(([k,lab])=>{const w=lab.length*6.2+12;if(x+w>px+pw-12&&x>px+12){x=px+12;y+=22}const q=frPill(x,y,k,lab);s+=q.svg;x+=q.w+6});
  y+=17+20;const cs=Math.floor((pw-24)/6.7),cx=Math.floor((pw-24)/5.8);
  s+=`<text x="${px+12}" y="${y}" class="t-xs">${FR_TXT.target}</text>`;y+=15;
  const W=wrapT(px+12,y,P.tgt,cs,{cls:'t-sm',style:'fill:var(--ink)',lh:14});s+=W.svg;y+=W.h+2;
  if(P.extra){const E=wrapT(px+12,y+2,P.extra,cx,{cls:'t-xs',lh:13});s+=E.svg;y+=E.h+4}
  y+=10;const lx=px+12;
  if(P.hd&&P.kind!=='big'){const H=wrapT(lx,y,P.hd,cx,{cls:'t-xs',lh:13,style:'fill:var(--ink);font-weight:600'});s+=H.svg;y+=H.h}
  if(P.kind==='rr'){const x0=px+12+86,x1=px+pw-50,lo=.4,hi=1.2,X=v=>x0+(v-lo)/(hi-lo)*(x1-x0),n=P.rows.length;
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${y}" y2="${y+8+n*18}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
    P.rows.forEach((r,i)=>{const yy=y+12+i*18,v=lerp(1,+r[1],ease(ramp(u,.08+i*.05,.32+i*.05)));
      s+=`<text x="${lx}" y="${yy+3}" class="t-xs" style="fill:var(--ink)">${r[0]}</text>`;
      s+=`<line x1="${f1(X(1))}" x2="${f1(X(v))}" y1="${yy}" y2="${yy}" style="stroke:var(--rx);stroke-width:2;opacity:.45"/>`;
      s+=`<circle cx="${f1(X(v))}" cy="${yy}" r="4.6" style="fill:${r[2]?'var(--panel)':'var(--rx)'};stroke:var(--rx);stroke-width:1.8"/>`;
      s+=`<text x="${px+pw-12}" y="${yy+3}" class="t-xs t-end" style="fill:var(--ink)">${r[1]}</text>`});
    const ya=y+12+n*18+4;[[.5,'0.5'],[1,'1.0']].forEach(([v,l])=>s+=`<text x="${f1(X(v))}" y="${ya+6}" class="t-xs t-mid">${l}</text>`);
    y=ya+20;if(P.rows.some(r=>r[2]))s+=`<text x="${lx}" y="${y}" class="t-xs">${FR_TXT.reg}</text>`;
    s+=`<text x="${px+pw-12}" y="${y}" class="t-xs t-end">${P.rows.some(r=>r[2])?'':FR_TXT.one}</text>`}
  else if(P.kind==='bars'){const x0=px+12+(pw>320?120:96),x1=px+pw-56;
    const neg=Math.max(0,...P.rows.map(r=>r[1]<0?-r[1]:0)),pos=Math.max(0,...P.rows.map(r=>r[1]>0?r[1]:0)),
      sc=(x1-x0)/(neg+pos),z=x0+neg*sc;
    if(neg>0&&pos>0)s+=`<line x1="${f1(z)}" x2="${f1(z)}" y1="${y+2}" y2="${y+12+P.rows.length*22}" style="stroke:var(--muted)"/>`;
    P.rows.forEach((r,i)=>{const yy=y+14+i*22,k=ease(ramp(u,.08+i*.08,.4+i*.08)),w=Math.abs(r[1])*sc*k,bx=r[1]<0?z-w:z;
      s+=`<text x="${lx}" y="${yy+4}" class="t-xs" style="fill:var(--ink)">${r[0]}</text>`;
      s+=`<rect x="${f1(bx)}" y="${yy-6}" width="${f1(Math.max(0,w))}" height="12" rx="3" style="fill:${r[3]}"/>`;
      s+=`<text x="${px+pw-12}" y="${yy+4}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${r[2]}</text>`});
    y+=14+P.rows.length*22;if(P.reg)s+=`<text x="${lx}" y="${y+6}" class="t-xs">${FR_TXT.reg}</text>`}
  else if(P.kind==='big'){y+=26;const c=FR_EVC[P.ev[0][0]][0];
    s+=`<text x="${lx}" y="${y}" class="t-big" style="font-size:34px;fill:${c};opacity:${f1(.25+.75*ramp(u,.05,.3))}">${P.big}</text>`;y+=20;
    const C=wrapT(lx,y,P.cap,cx,{cls:'t-xs',lh:13,style:'fill:var(--ink)'});s+=C.svg;y+=C.h+6;
    if(P.reg)s+=`<text x="${lx}" y="${y+4}" class="t-xs">${FR_TXT.reg}</text>`}
  else if(P.kind==='list'){P.rows.forEach((r,i)=>{const yy=y+16+i*24,op=ramp(u,.05+i*.08,.2+i*.08);
      const q=frPill(0,0,r[1],FR_EV[r[1]]);
      s+=`<g style="opacity:${f1(.2+.8*op)}"><text x="${lx}" y="${yy+4}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><g transform="translate(${f1(px+pw-12-q.w)} ${yy-8})">${q.svg}</g></g>`})}
  else if(P.kind==='matrix'){const c1=px+12+(pw-24)*.4,c2=px+12+(pw-24)*.7,m0=Math.floor((c1-lx)/5.8)-1,m1=Math.floor((c2-c1)/5.8)-1,m2=Math.floor((px+pw-12-c2)/5.8);
    y+=4;P.cols.forEach((h,i)=>s+=`<text x="${f1([lx,c1,c2][i])}" y="${y+10}" class="t-xs" style="font-weight:600">${h}</text>`);y+=24;
    P.rows.forEach((r,i)=>{const op=.2+.8*ramp(u,.05+i*.12,.25+i*.12);let hh=0;
      [[lx,m0,'var(--ink)'],[c1,m1,null],[c2,m2,null]].forEach(([xx,mm,col],j)=>{const W2=wrapT(xx,y,r[j],mm,{cls:'t-xs',lh:12,style:`fill:${col||r[3+j-1]||'var(--ink)'};opacity:${f1(op)}${j===0?';font-weight:600':''}`});s+=W2.svg;hh=Math.max(hh,W2.h)});
      y+=hh+10})}
  return s}

inits.frontier=()=>{
  /* ================= player 1: the routes ================= */
  const svg=$('#frSvg'),rg=$('#frT'),note=$('#frNote');let setSt=()=>{};
  const C=FR_TXT;
  function sceneWall(p,u,t){const ph=t*26;let s='';
    const dmg=p===0?ramp(u,0,.35):0,alarm=p===0?ramp(u,.2,.45):1,blkA=p===1?ramp(u,.08,.3):0,
      t2=p===0?ramp(u,.42,.65):p===1?1-.6*blkA:1,blkT=p===2?ramp(u,.08,.3):0,
      eos=p===0?ramp(u,.55,.8):p===1?1-.45*blkA:p===2?1-.6*blkT:1,dim=p>=3?.4:1,
      pde=p===3?ramp(u,.08,.4):0,abl=p===4&&u<.5?bump(u,.06,.42):0,regrow=p===4?ramp(u,.3,.45):0,cut=p===4?ramp(u,.55,.75):0;
    /* lumen, mucus */
    s+=`<rect x="10" y="28" width="380" height="64" rx="8" style="fill:var(--air-soft)"/><rect x="10" y="90" width="380" height="12" style="fill:var(--mucus-soft)"/>`;
    s+=`<text x="16" y="42" class="t-xs" style="fill:var(--air-ink)">${C.sc}</text><text x="384" y="86" class="t-xs t-end" style="fill:var(--mucus-ink)">${C.lin}</text>`;
    if(dmg>.01){s+=smoke(20,30,200,52,{amt:dmg*(1-ramp(u,.7,.95)),ph:t*30,seed:5});s+=`<g style="opacity:${f1(dmg*(1-ramp(u,.7,.95)))}">`+dots(232,36,140,40,6,{col:'var(--virus)',r:3.6,ph:t*20,seed:8})+'</g>'}
    /* lining cells */
    const cw=47.5;for(let i=0;i<8;i++){const x=10+i*cw,gob=i===6,hit=i>=2&&i<=4;const op=hit?1-.75*abl:1;
      s+=`<rect x="${f1(x+1)}" y="102" width="${f1(cw-2)}" height="44" rx="5" style="fill:${gob?'var(--mucus-soft)':'var(--cell)'};stroke:${hit&&regrow>0&&p===4?'var(--good)':'var(--membrane)'};stroke-width:${hit&&regrow>0&&p===4?2:1.2};opacity:${f1(op)}"/>`;
      if(gob)s+=`<ellipse cx="${f1(x+cw/2)}" cy="116" rx="13" ry="9" style="fill:var(--mucus);opacity:.8"/>`;
      s+=`<ellipse cx="${f1(x+cw/2)}" cy="134" rx="8" ry="5.5" style="fill:var(--nucleus);opacity:${f1(.7*op)}"/>`;
      if(!gob)for(let j=0;j<5;j++){const cxx=x+7+j*8.5,sw=Math.sin(ph*1.4+j+i)*2.5;s+=`<path d="M${f1(cxx)} 102q${f1(sw)} -4 ${f1(sw*.6)} -8" style="stroke:var(--airway);stroke-width:1.2;fill:none;opacity:${f1(op)}"/>`}}
    if(dmg>0)s+=`<rect x="11" y="102" width="378" height="44" rx="5" style="fill:var(--inflamed-soft);opacity:${f1(dmg*.7*(1-ramp(u,.75,1)))}"/>`;
    /* submucosa */
    s+=`<rect x="10" y="146" width="380" height="152" style="fill:var(--tissue);opacity:.55"/>`;
    /* receptors and cells */
    s+=`<rect x="315" y="146" width="6" height="8" rx="1" style="fill:var(--rx)"/><text x="306" y="162" class="t-xs t-end" style="fill:var(--ink)">${C.il4r}</text>`;
    s+=`<circle cx="70" cy="254" r="18" style="fill:var(--macro);opacity:.75"/><circle cx="70" cy="256" r="8" style="fill:var(--nucleus)"/>`;
    s+=`<rect x="51" y="232" width="6" height="8" rx="1" style="fill:var(--accent)"/><rect x="83" y="232" width="6" height="8" rx="1" style="fill:var(--inflamed)"/>`;
    s+=`<text x="47" y="240" class="t-xs t-end" style="fill:var(--ink)">${C.tslpR}</text><text x="95" y="240" class="t-xs" style="fill:var(--ink)">${C.st2}</text><text x="70" y="288" class="t-xs t-mid" style="fill:var(--ink)">${C.imm}</text>`;
    const EP=[[156,272],[182,284],[208,270],[234,286],[250,262]],ne=2+3*eos;
    EP.forEach(([x,y],i)=>{const op=clamp(ne-i)*.95;if(op<.03)return;s+=`<g style="opacity:${f1(op)}"><circle cx="${x}" cy="${y}" r="9" style="fill:var(--eos);opacity:.8"/><circle cx="${x-3}" cy="${y}" r="3" style="fill:var(--nucleus)"/><circle cx="${x+3}" cy="${y}" r="3" style="fill:var(--nucleus)"/></g>`});
    s+=`<text x="264" y="290" class="t-xs" style="fill:var(--ink)">${C.eos}</text>`;
    /* signal flows */
    s+=frFlow('tslp',[34,146],[40,196],[54,230],3,ph*.5,alarm*dim,blkA,.48)+frFlow('tslp',[58,146],[60,190],[54,230],3,ph*.5+.5,alarm*dim,blkA,.48);
    s+=frFlow('il33',[106,146],[100,196],[86,230],3,ph*.5+.2,alarm*dim,blkA,.48)+frFlow('il33',[130,146],[112,190],[86,230],3,ph*.5+.7,alarm*dim,blkA,.48);
    s+=frFlow('il4',[88,252],[300,270],[318,156],5,ph*.4,t2*dim,blkT,.9)+frFlow('il5',[88,262],[140,290],[196,277],3,ph*.45,t2*dim,blkT,.5);
    /* antibodies */
    const ab='var(--dx)';
    if(blkA>0){s+=frY(44,192,16,ab,0,blkA)+frGl('tslp',44,182,blkA)+frY(106,192,16,ab,0,blkA)+frGl('il33',106,182,blkA)+frY(86,222,14,ab,180,blkA);
      const T=[[44,190],[106,190],[90,220]];C.ab1.forEach((l,i)=>{const yy=176+i*18;s+=`<g style="opacity:${f1(blkA)}"><line x1="156" y1="${yy-3}" x2="${T[i][0]+8}" y2="${T[i][1]}" style="stroke:var(--dx);stroke-width:1;stroke-dasharray:2 3"/><text x="160" y="${yy}" class="t-xs" style="fill:var(--dx);font-weight:600">${l}</text></g>`})}
    if(blkT>0){s+=frY(318,166,16,ab,0,blkT)+frY(144,276,16,ab,0,blkT)+frGl('il5',144,266,blkT);
      const T=[[310,164],[150,268]];C.ab2.forEach((l,i)=>{const yy=176+i*18,ex=160+l.length*5.8+4;s+=`<g style="opacity:${f1(blkT)}"><line x1="${i?156:f1(ex)}" y1="${yy-3}" x2="${T[i][0]}" y2="${T[i][1]}" style="stroke:var(--dx);stroke-width:1;stroke-dasharray:2 3"/><text x="160" y="${yy}" class="t-xs" style="fill:var(--dx);font-weight:600">${l}</text></g>`})}
    /* smooth muscle and nerve */
    const mh=20-10*pde;s+=`<rect x="10" y="${f1(298+(20-mh)/2)}" width="380" height="${f1(mh)}" rx="5" style="fill:var(--muscle);opacity:.75"/>`;
    s+=`<text x="16" y="331" class="t-xs" style="fill:var(--ink)">${C.mus}</text>`;
    let nd='M14 344';for(let x=14;x<=386;x+=12)nd+=`L${x} ${f1(344+Math.sin(x/9)*2.5)}`;
    s+=`<path d="${nd}" style="stroke:var(--gold);stroke-width:2;fill:none"/><text x="384" y="361" class="t-xs t-end" style="fill:var(--ink)">${C.nerve}</text>`;
    for(let i=0;i<5;i++){const x=14+((ph*.12+i/5)%1)*372;let op=.9;if(cut>0&&x>200)op*=1-cut;if(op>.05)s+=`<circle cx="${f1(x)}" cy="${f1(344+Math.sin(x/9)*2.5)}" r="3" style="fill:var(--warn);opacity:${f1(op)}"/>`}
    if(cut>0)s+=`<path d="M194 336l12 16M206 336l-12 16" style="stroke:var(--fl);stroke-width:2.4;opacity:${f1(cut)}"/>`;
    /* PDE3/4: nebulised mist */
    if(pde>0){for(let i=0;i<22;i++){const q=(i*.137+t*3)%1,x=24+((i*53)%350),y=48+q*28;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.2" style="fill:var(--bd);opacity:${f1(pde*.8*(1-q*.5))}"/>`}
      s+=chip(200,56,C.neb,{col:'var(--bd)',anchor:'middle',size:11})+`<text x="384" y="331" class="t-xs t-end" style="fill:var(--bd);font-weight:600;opacity:${f1(pde)}">${C.open}</text>`}
    /* procedures: catheter */
    if(p===4){const first=u<.5,cxp=first?150+Math.sin(u*14)*40:200;
      s+=`<path d="M180 30Q${f1(cxp)} 50 ${f1(cxp)} 86" style="stroke:var(--ink);stroke-width:3;fill:none;stroke-linecap:round"/><circle cx="${f1(cxp)}" cy="88" r="4" style="fill:var(--fl)"/>`;
      if(first)s+=`<rect x="105" y="100" width="143" height="48" rx="6" style="fill:var(--fl-soft);opacity:${f1(abl*.8)}"/>`;
      else for(let i=0;i<3;i++){const q=(t*8+i/3)%1;s+=`<path d="M190 ${f1(100+q*230)}h20" style="stroke:var(--fl);stroke-width:2;opacity:${f1(cut*(1-q)*.9)}"/>`}
      s+=chip(320,56,first?C.dev1:C.dev2,{col:'var(--fl)',anchor:'middle',size:11})}
    /* legend */
    const lx=[14,70,132,214,262];C.lg.forEach((l,i)=>{const x=lx[i];s+=(i<4?frGl(['tslp','il33','il4','il5'][i],x+4,377,1):frY(x+4,380,12,ab,0,1))+`<text x="${x+13}" y="381" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    return s}
  function sceneLife(u){let s='';const gx=48,gy=56,gw=326,gh=196;
    const nf=a=>a<25?.12+.88*(1-Math.pow(1-a/25,2)):a<35?1:1-(a-35)*.0045,
      ff=a=>a<35?nf(a):1-(a-35)*.0115,lf=a=>a<25?.12+.6*(1-Math.pow(1-a/25,2)):a<35?.72:.72-(a-35)*.00586;
    s+=`<text x="16" y="24" class="t-xs" style="fill:var(--ink);font-weight:600">${C.chT}</text>`;
    s+=axes(gx,gy,gw,gh,{xt:[[0,'0'],[.25,'20'],[.5,'40'],[.75,'60'],[1,'80']],yt:[],grid:false});
    s+=`<text x="${gx}" y="${gy-8}" class="t-xs">${C.chY}</text><text x="${gx+gw}" y="${gy+gh+30}" class="t-xs t-end">${C.chX}</text>`;
    const yv=v=>gy+gh-v*gh,thr=.55*.86;
    s+=`<rect x="${gx}" y="${f1(yv(thr))}" width="${gw}" height="${f1(gh*thr)}" style="fill:var(--bad-soft);opacity:.5"/><line x1="${gx}" x2="${gx+gw}" y1="${f1(yv(thr))}" y2="${f1(yv(thr))}" style="stroke:var(--bad);stroke-dasharray:4 3"/>`;
    s+=`<text x="${gx+gw-4}" y="${f1(yv(thr)+14)}" class="t-xs t-end" style="fill:var(--bad)">${C.thr}</text>`;
    const x40=gx+gw*.5;s+=`<line x1="${x40}" x2="${x40}" y1="${gy}" y2="${gy+gh}" class="grid"/><text x="${x40+4}" y="${gy+gh-6}" class="t-xs">${C.b40}</text>`;
    s+=`<path d="${pathFn(q=>.86*nf(q*80),gx,gx+gw,gy+gh,gy)}" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:5 4"/>`;
    const fr=Math.max(.002,ease(ramp(u,.05,.75)));
    s+=`<path d="${pathFn(q=>.86*ff(q*80*fr),gx,gx+gw*fr,gy+gh,gy,90)}" style="fill:none;stroke:var(--fl);stroke-width:2.8"/>`;
    s+=`<path d="${pathFn(q=>.86*lf(q*80*fr),gx,gx+gw*fr,gy+gh,gy,90)}" style="fill:none;stroke:var(--rx);stroke-width:2.8"/>`;
    const cols=['var(--muted)','var(--fl)','var(--rx)'];C.chL.forEach((l,i)=>{const y=296+i*18;s+=`<line x1="16" x2="38" y1="${y-3}" y2="${y-3}" style="stroke:${cols[i]};stroke-width:2.6${i?'':';stroke-dasharray:5 4'}"/><text x="44" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    s+=`<text x="16" y="358" class="t-xs" style="opacity:${f1(ramp(u,.6,.8))}">${C.chN}</text>`;
    return s}
  function sceneRepair(u,t){let s='';
    C.rp.forEach((l,i)=>{const x=14+i*126,on=Math.floor(clamp(u*1.15,0,.999)*3)===i;
      s+=`<circle cx="${x+9}" cy="40" r="9" style="fill:${on?'var(--rec)':'var(--panel-2)'};stroke:var(--rec)"/><text x="${x+9}" y="44" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--rec)'};font-weight:700">${i+1}</text><text x="${x+22}" y="44" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    s+=alveoli(110,200,140,{destroy:.7,cap:true,elastin:true,ph:t*8,seed:6}).svg;
    s+=`<text x="110" y="300" class="t-xs t-mid" style="fill:var(--ink)">${C.rpS}</text>`;
    const ret=ramp(u,.6,.95);if(ret>0){s+=`<path d="M110 60V118" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round;opacity:.7"/>`;
      for(let i=0;i<9;i++){const q=clamp(ret*1.3-i*.05),a=i*.7;s+=`<circle cx="${f1(110+Math.cos(a)*q*52)}" cy="${f1(120+q*70+Math.sin(a)*q*30)}" r="4" style="fill:var(--rec);opacity:${f1(q>0?.9:0)}"/>`}}
    C.rpR.forEach(([k,lab,txt],i)=>{const y=100+i*70,op=.25+.75*ramp(u,.15+i*.2,.3+i*.2);const P=frPill(240,y,k,lab);
      s+=`<g style="opacity:${f1(op)}">${P.svg}${wrapT(240,y+34,txt,24,{cls:'t-xs',style:'fill:var(--ink)',lh:13}).svg}</g>`});
    return s}
  function sceneAatd(u,t){let s='';const xs=[58,152,246,340];
    C.aH.forEach((h,i)=>{const op=.2+.8*ramp(u,.05+i*.15,.18+i*.15),x=xs[i];
      s+=`<g style="opacity:${f1(op)}"><text x="${x}" y="64" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${h}</text>`;
      if(i===0){let d1='',d2='';for(let k=0;k<=24;k++){const xx=x-32+k*64/24;d1+=(k?'L':'M')+f1(xx)+' '+f1(120+Math.sin(k/3.8+t*4)*9);d2+=(k?'L':'M')+f1(xx)+' '+f1(120-Math.sin(k/3.8+t*4)*9)}
        s+=`<path d="${d1}" style="stroke:var(--dx);stroke-width:2;fill:none"/><path d="${d2}" style="stroke:var(--rx);stroke-width:2;fill:none"/><rect x="${x-3}" y="108" width="6" height="24" rx="2" style="fill:var(--bad)"/>`}
      if(i===1){let d='';for(let k=0;k<=20;k++){const xx=x-32+k*64/20;d+=(k?'L':'M')+f1(xx)+' '+f1(120+Math.sin(k/2.2+t*6)*5)}s+=`<path d="${d}" style="stroke:var(--accent);stroke-width:2.4;fill:none"/><rect x="${x-3}" y="113" width="6" height="14" rx="2" style="fill:var(--bad)"/>`}
      if(i===2)[[-12,-6],[2,-12],[14,0],[-6,8],[8,12],[-16,10]].forEach(([dx,dy])=>s+=`<circle cx="${x+dx}" cy="${120+dy}" r="7" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.3"/>`);
      if(i===3)s+=alveoli(x,124,64,{destroy:.35,cap:false,elastin:true,seed:3}).svg;
      if(i<3)s+=`<path d="M${x+38} 120h18" style="stroke:var(--muted);stroke-width:1.6" marker-end="url(#frArr)"/>`;
      s+=wrapT(x,190,C.aR[i],14,{cls:'t-xs',anchor:'middle',style:'fill:var(--ink);font-weight:600',lh:13}).svg;
      C.aEv[i].forEach((k,j)=>{const lab=C.evS[k],w=lab.length*6.2+12;const P=frPill(x-w/2,222+j*22,k,lab);s+=P.svg});
      s+='</g>'});
    s+=wrapT(200,320,C.aN,50,{cls:'t-sm',anchor:'middle',style:'fill:var(--ink)'}).svg;
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 762');
    const L=N?{px:10,py:394,pw:380,ph:362}:{px:410,py:26,pw:300,ph:362};
    const p=phaseOf(FR_STEPS,t),st=FR_STEPS[p],nx=p<7?FR_STEPS[p+1].from:1.0001,u=ramp(t,st.from,nx);
    let s=`<defs>${marker('frArr','var(--muted)')}</defs>`;
    s+=p<=4?sceneWall(p,u,t):p===5?sceneLife(u):p===6?sceneRepair(u,t):sceneAatd(u,t);
    s+=frPanel(L,FR_P[p],u);
    const sw=(L.pw-24)/8,sy=L.py+L.ph-26;
    FR_STEPS.forEach((q,i)=>{s+=`<rect x="${f1(L.px+12+i*sw+1)}" y="${sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${i===p?'var(--rec)':i<p?'var(--rec-soft)':'var(--panel)'}"/>`});
    s+=`<text x="${L.px+12}" y="${sy+18}" class="t-xs">${C.step(p+1,FR_STEPS.length)}</text>`;
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(st)}
  const stop=playWire(rg,$('#frPlay'),draw,40000,'%t:player.replay%','frontier');
  setSt=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= player 2: alpha-1 routes ================= */
  const fsv=$('#faSvg'),frg=$('#faT'),fnote=$('#faNote');let setFa=()=>{};
  function faState(p,u){const S={zfix:0,cut:0,ed:0,poly:1,ser:.12,cor:0,drip:0,aav:0,rnai:false,both:false,lbl:FA_TXT.cap[p]};
    if(p===0){S.zfix=ramp(u,.25,.6);S.poly=1-.45*ramp(u,.45,.85);S.ser=.12+.38*ramp(u,.45,.85)}
    if(p===1){if(u<.5){S.rnai=true;S.cut=ramp(u,.12,.24);S.poly=1-.9*ramp(u,.2,.45);S.lbl=FA_TXT.capR[0]}
      else{S.ed=ramp(u,.58,.72);S.poly=1-.5*ramp(u,.65,.9);S.ser=.12+.33*ramp(u,.65,.9);S.lbl=FA_TXT.capR[1]}}
    if(p===2){S.cor=ramp(u,.12,.35);S.poly=1-.55*ramp(u,.3,.7);S.ser=.12+.22*ramp(u,.35,.75)}
    if(p===3){S.drip=ramp(u,.08,.25);S.ser=.12+.68*ramp(u,.2,.6);S.aav=ramp(u,.6,.8)}
    if(p===4){S.both=true;S.poly=.35;S.ser=.6}
    return S}
  function faDraw(t){
    const N=vb(fsv,'720 400','400 762');
    const L=N?{px:10,py:394,pw:380,ph:362}:{px:410,py:26,pw:300,ph:362};
    const p=phaseOf(FA_STEPS,t),st=FA_STEPS[p],nx=p<4?FA_STEPS[p+1].from:1.0001,u=ramp(t,st.from,nx),S=faState(p,u),T=FA_TXT;
    let s=`<defs>${marker('faArr','var(--muted)')}</defs>`;
    /* liver cell */
    s+=`<rect x="14" y="30" width="236" height="222" rx="14" style="fill:var(--cell);stroke:${S.both?'var(--rec)':'var(--membrane)'};stroke-width:${S.both?2.4:1.4}"/><text x="24" y="48" class="t-xs" style="fill:var(--ink);font-weight:600">${T.liver}</text>`;
    s+=`<ellipse cx="78" cy="112" rx="54" ry="40" style="fill:var(--nucleus);opacity:.4"/>`;
    let d1='',d2='';for(let k=0;k<=24;k++){const xx=38+k*80/24;d1+=(k?'L':'M')+f1(xx)+' '+f1(108+Math.sin(k/3.5+t*5)*7);d2+=(k?'L':'M')+f1(xx)+' '+f1(108-Math.sin(k/3.5+t*5)*7)}
    s+=`<path d="${d1}" style="stroke:var(--dx);stroke-width:2;fill:none"/><path d="${d2}" style="stroke:var(--rx);stroke-width:2;fill:none"/>`;
    s+=`<rect x="75" y="97" width="7" height="22" rx="2" style="fill:var(--bad)"/>`;
    if(S.zfix>0)s+=`<rect x="75" y="97" width="7" height="22" rx="2" style="fill:var(--good);opacity:${f1(S.zfix)}"/>`;
    s+=`<text x="78" y="166" class="t-xs t-mid" style="fill:var(--ink)">${T.gene}</text>`;
    /* mRNA */
    s+=`<path d="M124 102L144 90" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#faArr)"/>`;
    const mop=1-.85*S.cut;let md='';for(let k=0;k<=20;k++){const xx=146+k*90/20;md+=(k?'L':'M')+f1(xx)+' '+f1(86+Math.sin(k/2+t*7)*4)}
    s+=`<path d="${md}" style="stroke:var(--accent);stroke-width:2.4;fill:none;opacity:${f1(mop)}${S.cut>0?';stroke-dasharray:14 6':''}"/>`;
    s+=`<rect x="187" y="80" width="7" height="13" rx="2" style="fill:var(--bad);opacity:${f1(mop)}"/>`;
    if(S.ed>0)s+=`<rect x="187" y="80" width="7" height="13" rx="2" style="fill:var(--good);opacity:${f1(S.ed)}"/>`;
    s+=`<text x="190" y="66" class="t-xs t-mid" style="fill:var(--ink)">${T.mrna}</text>`;
    /* polymers in the liver cell */
    s+=`<path d="M190 100L194 140" style="stroke:var(--muted);stroke-width:1.4;opacity:${f1(mop)}" marker-end="url(#faArr)"/>`;
    const PP=[[180,170],[196,160],[212,172],[188,188],[206,192],[172,190],[222,186],[196,206]],np=PP.length*S.poly;
    PP.forEach(([x,y],i)=>{const op=clamp(np-i);if(op>.03)s+=`<circle cx="${x}" cy="${y}" r="8" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.3;opacity:${f1(op)}"/>`});
    if(S.cor>0)PP.slice(0,4).forEach(([x,y],i)=>s+=`<path d="M${x+6} ${y-10}l5 3v6l-5 3l-5 -3v-6z" style="fill:var(--accent);opacity:${f1(S.cor)}"/>`);
    s+=`<text x="196" y="236" class="t-xs t-mid" style="fill:var(--ink)">${T.poly}</text>`;
    /* secretion into blood */
    s+=`<rect x="262" y="26" width="34" height="332" rx="10" style="fill:var(--blood);opacity:.16"/><text x="279" y="20" class="t-xs t-mid" style="fill:var(--ink)">${T.blood}</text>`;
    s+=`<path d="M228 180H258" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#faArr)"/>`;
    const nd=Math.round(2+12*S.ser);for(let i=0;i<nd;i++){const q=(t*5+i/nd)%1;s+=`<circle cx="${f1(272+(i%3)*7)}" cy="${f1(32+q*320)}" r="3" style="fill:var(--good);opacity:${f1(.9*Math.min(1,q*8,(1-q)*8))}"/>`}
    s+=`<path d="M298 140H308" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#faArr)"/>`;
    /* lung, elastase and the blood gauge */
    s+=`<text x="346" y="86" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${T.lung}</text>`;
    s+=alveoli(346,138,66,{destroy:.3,cap:false,elastin:true,seed:4}).svg;
    const ne=Math.round(6*(1-S.ser));for(let i=0;i<ne;i++){const a=i*1.1+t*3;s+=`<circle cx="${f1(346+Math.cos(a)*30)}" cy="${f1(138+Math.sin(a)*28)}" r="3.2" style="fill:var(--neut)"/>`}
    s+=`<text x="346" y="194" class="t-xs t-mid">${T.elast}</text>`;
    s+=gauge(346,262,32,S.ser,{bands:[[0,.35,'var(--bad-soft)'],[.35,1,'var(--good-soft)']]})+`<text x="346" y="284" class="t-xs t-mid" style="fill:var(--ink)">${T.gauge}</text>`;
    /* agents */
    if(p===0){const q=ease(ramp(u,.02,.3)),x=lerp(20,78,q),y=lerp(20,98,q);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:var(--dx);opacity:${f1(1-ramp(u,.6,.75))}"/>`}
    if(p===1&&S.rnai){const q=ease(ramp(u,.0,.14)),x=lerp(250,206,q);s+=`<path d="M${f1(x-6)} 70l12 12M${f1(x+6)} 70l-12 12" style="stroke:var(--bad);stroke-width:2.4;opacity:${f1(1-ramp(u,.3,.45))}"/>`}
    if(p===1&&!S.rnai){const q=ease(ramp(u,.5,.6)),x=lerp(250,190,q);s+=`<circle cx="${f1(x)}" cy="72" r="6" style="fill:var(--rec);opacity:${f1(1-ramp(u,.85,.98))}"/>`}
    if(p===3){s+=`<rect x="170" y="262" width="34" height="44" rx="6" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/><rect x="173" y="${f1(268+30*ramp(u,.2,.95))}" width="28" height="${f1(Math.max(0,34-30*ramp(u,.2,.95)))}" rx="4" style="fill:var(--rx-soft)"/>`;
      s+=`<path d="M187 306Q190 330 262 330" style="stroke:var(--rx);stroke-width:1.6;fill:none;opacity:${f1(S.drip)}"/><text x="187" y="346" class="t-xs t-mid" style="fill:var(--ink)">${T.iv}</text>`;
      s+=`<rect x="20" y="268" width="96" height="40" rx="10" style="fill:var(--muscle);opacity:${f1(.25+.4*S.aav)}"/><text x="68" y="324" class="t-xs t-mid" style="fill:var(--ink)">${T.aav}</text>`;
      for(let i=0;i<4;i++){const q=(t*6+i/4)%1;s+=`<circle cx="${f1(lerp(116,262,q))}" cy="${f1(lerp(310,326,q))}" r="2" style="fill:var(--good);opacity:${f1(S.aav*.5*(1-q))}"/>`}}
    if(S.both)s+=`<text x="132" y="270" class="t-xs t-mid" style="fill:var(--rec);font-weight:600">${T.needL}</text><text x="346" y="214" class="t-xs t-mid" style="fill:var(--rec);font-weight:600">${T.needG}</text>`;
    s+=`<text x="14" y="382" class="t-sm" style="fill:var(--ink)">${S.lbl}</text>`;
    s+=frPanel(L,FA_P[p],u);
    const sw=(L.pw-24)/5,sy=L.py+L.ph-26;
    FA_STEPS.forEach((q,i)=>{s+=`<rect x="${f1(L.px+12+i*sw+1)}" y="${sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${i===p?'var(--rec)':i<p?'var(--rec-soft)':'var(--panel)'}"/>`});
    s+=`<text x="${L.px+12}" y="${sy+18}" class="t-xs">${C.step(p+1,FA_STEPS.length)}</text>`;
    fsv.innerHTML=s;setFa(p);fnote.innerHTML=noteHTML(st)}
  const fstop=playWire(frg,$('#faPlay'),faDraw,24000,'%t:player.replay%','frontier');
  setFa=stepWire($('#faSteps'),FA_STEPS,frg,faDraw,fstop);
  faDraw(+frg.value);

  /* ================= widget 3: pipeline explorer ================= */
  const map=$('#fpMap'),det=$('#fpDetail'),tb=$('#fpTable tbody');let fr='all',fe='all',sel=FP_TRIALS.findIndex(q=>q.n==='AERIFY-1');
  const hollow=q=>q.x==='none'||q.x==='reg'||q.x==='regneg',cross=q=>q.x==='neg'||q.x==='regneg',isReg=q=>q.x==='reg'||q.x==='regneg';
  const match=q=>(fr==='all'||q.r===fr)&&(fe==='all'||(fe==='reg'?isReg(q):q.ev===fe));
  function dot(q,i,x,y){const c=FR_EVC[q.ev][0],on=match(q);
    return `<g class="fp-dot${i===sel?' sel':''}" data-i="${i}" tabindex="${on?0:-1}" role="button" aria-label="${FP_TXT.aria(q)}" style="opacity:${on?1:.15}"><circle class="ring" cx="${f1(x)}" cy="${f1(y)}" r="5.4" style="fill:${hollow(q)?'var(--panel)':c};stroke:${c};stroke-width:1.8"/>${cross(q)?`<path d="M${f1(x-3)} ${f1(y-3)}l6 6M${f1(x+3)} ${f1(y-3)}l-6 6" style="stroke:${hollow(q)?c:'var(--panel)'};stroke-width:1.5"/>`:''}<circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:transparent"/></g>`}
  function drawMap(){const N=NARROW();let s='';
    if(!N){const lx=12,cx0=168,cw=108,y0=46,rh=56;
      FP_COLS.forEach((c,i)=>{const x=cx0+i*cw;s+=`<rect x="${x+2}" y="${y0-30}" width="${cw-4}" height="${rh*FP_ROUTES.length+32}" rx="8" style="fill:${i===4?'var(--good-soft)':'var(--field)'}"/><text x="${x+cw/2}" y="${y0-12}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${c}</text>`});
      FP_ROUTES.forEach((r,ri)=>{const y=y0+ri*rh;s+=`<line x1="${lx}" x2="${cx0+5*cw}" y1="${y+rh}" y2="${y+rh}" class="grid"/><text x="${lx}" y="${y+rh/2+4}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.n}</text>`;
        const cnt={};FP_TRIALS.forEach((q,i)=>{if(q.r!==r.k)return;const k=cnt[q.c]=(cnt[q.c]||0)+1;s+=dot(q,i,cx0+q.c*cw+14+((k-1)%7)*13.5,y+12+Math.floor((k-1)/7)*15)})});
      const ly=y0+rh*FP_ROUTES.length+26;s+=faLegend(12,ly,[0,190,430],[0,190,430]);map.setAttribute('viewBox',`0 0 720 ${ly+30}`)}
    else{const x0=10,cw=76,y0=40;let y=y0;
      FP_COLS.forEach((c,i)=>{s+=`<text x="${x0+i*cw+cw/2}" y="${y0-14}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${c}</text>`});
      FP_ROUTES.forEach(r=>{const P=FP_TRIALS.map((q,i)=>[q,i]).filter(([q])=>q.r===r.k),cnt={};P.forEach(([q])=>cnt[q.c]=(cnt[q.c]||0)+1);
        const lines=Math.max(1,...Object.values(cnt).map(n=>Math.ceil(n/5))),h=30+lines*15;
        s+=`<rect x="${x0}" y="${y}" width="380" height="${h-6}" rx="8" style="fill:var(--field)"/><text x="${x0+8}" y="${y+15}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.n}</text>`;
        const c2={};P.forEach(([q,i])=>{const k=c2[q.c]=(c2[q.c]||0)+1;s+=dot(q,i,x0+q.c*cw+12+((k-1)%5)*13.5,y+30+Math.floor((k-1)/5)*15)});y+=h});
      s+=faLegend(10,y+14,null,null);map.setAttribute('viewBox',`0 0 400 ${y+14+6*17+10}`)}
    map.innerHTML=s}
  function faLegend(x,y,xs,xc){let s='';const it=[['pos','var(--muted)'],['none','var(--muted)'],['neg','var(--muted)']];
    const sh=(k,cx,cy,c)=>`<circle cx="${cx}" cy="${cy}" r="5" style="fill:${k==='none'?'var(--panel)':c};stroke:${c};stroke-width:1.6"/>`+(k==='neg'?`<path d="M${cx-3} ${cy-3}l6 6M${cx+3} ${cy-3}l-6 6" style="stroke:var(--panel);stroke-width:1.5"/>`:'');
    const rows=[...FP_TXT.shape.map((l,i)=>[sh(it[i][0],0,0,'var(--muted)'),l]),...['est','early','hyp'].map(k=>[`<circle cx="0" cy="0" r="5" style="fill:${FR_EVC[k][0]}"/>`,FR_EV[k]])];
    rows.forEach(([g,l],i)=>{let gx,gy;if(xs){gx=x+(i<3?xs[i]:xc[i-3]);gy=y+(i<3?0:18)}else{gx=x;gy=y+i*17}
      s+=`<g transform="translate(${gx+5} ${gy-3})">${g}</g><text x="${gx+15}" y="${gy+1}" class="t-xs" style="fill:var(--ink)">${l}</text>`});return s}
  function showDetail(){const q=FP_TRIALS[sel];if(!q){det.innerHTML='';return}
    const rt=FP_ROUTES.find(r=>r.k===q.r).n;
    det.innerHTML=`<div class="kicker">${rt} · ${q.ph}</div><h4>${q.n}</h4><div class="row">${frEv(q.ev)}${isReg(q)?`<span class="reg">${FP_TXT.regTag}</span>`:''}</div>`+
      `<dl><dt>${FP_TXT.h[0]}</dt><dd>${q.d}</dd><dt>${FP_TXT.h[1]}</dt><dd>${q.nct?`<span class="nct">${q.nct}</span>`:FP_TXT.noNct}</dd><dt>${FP_TXT.h[2]}</dt><dd>${q.ph}</dd><dt>${FP_TXT.h[3]}</dt><dd>${q.st}</dd><dt>${FP_TXT.h[4]}</dt><dd>${q.sz}</dd><dt>${FP_TXT.h[5]}</dt><dd>${q.res}</dd></dl>`+
      (isReg(q)?`<p class="stage-cap">${FP_TXT.regNote}</p>`:'')}
  function drawTable(){const M=FP_TRIALS.map((q,i)=>[q,i]).filter(([q])=>match(q));
    tb.innerHTML=M.map(([q,i])=>`<tr data-i="${i}"${i===sel?' class="fp-hl"':''}><th scope="row"><button type="button" class="fpb" data-i="${i}">${q.n}</button><br><span class="nct">${q.d}</span></th><td class="nct">${q.nct||'—'}</td><td>${q.ph}</td><td>${q.st}</td><td>${q.res}</td><td>${frEv(q.ev)}${isReg(q)?`<span class="reg">${FP_TXT.regTag}</span>`:''}</td></tr>`).join('');
    $('#fpCount').textContent=FP_TXT.count(M.length,FP_TRIALS.length)}
  function refresh(){if(sel>=0&&!match(FP_TRIALS[sel])){const f=FP_TRIALS.findIndex(match);if(f>=0)sel=f}drawMap();drawTable();showDetail()}
  function pick(i){sel=i;drawMap();drawTable();showDetail();const g=$(`#fpMap [data-i="${i}"]`);return g}
  map.addEventListener('click',e=>{const g=e.target.closest('[data-i]');if(g)pick(+g.dataset.i)});
  map.addEventListener('keydown',e=>{const g=e.target.closest('[data-i]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();const i=+g.dataset.i;pick(i);const n=$(`#fpMap [data-i="${i}"]`);n&&n.focus()}});
  tb.addEventListener('click',e=>{const b=e.target.closest('.fpb');if(b)pick(+b.dataset.i)});
  $$('[data-fpr]').forEach(b=>b.addEventListener('click',()=>{fr=b.dataset.fpr;$$('[data-fpr]').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));refresh()}));
  $$('[data-fpe]').forEach(b=>b.addEventListener('click',()=>{fe=b.dataset.fpe;$$('[data-fpe]').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));refresh()}));
  const prevR=redraws.frontier;redraws.frontier=()=>{prevR&&prevR();drawMap()};
  refresh();
};

/* ---- alpha-1 player data ---- */
const FA_STEPS=[
 {from:0,at:.1,k:'Gene',t:'Rewrite the Z mutation',
  txt:`In the first liver biopsy after in vivo base editing (a 66-year-old PiZZ man in the YOLT-202 trial, NCT07193615), the PiZ variant was corrected in 54–57% of alleles at 10 weeks, with no off-target editing detected; circulating AAT stayed active ${frEv('hyp','to early, a single case')} [[Krooss2027,NCT07193615]]. BEAM-302, a lipid-nanoparticle base editor, is in a phase 1/2 trial for AATD lung and/or liver disease (about 192 planned, recruiting) [[NCT06389877]].`,
  pt:`Researchers are testing ways to fix the faulty gene itself, so the liver makes normal protein [[Krooss2027]].`,
  hook:`In vivo base editing corrected 54–57% of PiZ alleles in one patient's liver [[Krooss2027]].`},
 {from:.2,at:.3,k:'RNA',t:'Silence or edit the message',
  txt:`RNA interference: fazirsiran degrades Z-AAT mRNA. In SEQUOIA (n=40), serum Z-AAT fell 61%, 83% and 94% with 25, 100 and 200 mg at week 16, and liver Z-AAT fell by a median 93% vs a 26% rise on placebo [[Clark2024SEQUOIA]]; phase 3 liver trials are recruiting ${frEv('early')} [[NCT05677971,NCT06165341]]. RNA editing: SERPINA1-994, which recruits the body's own ADAR enzymes, edited 50% of Z transcripts in PiZ mouse liver and raised serum AAT ${frEv('hyp')} [[Monian2026]]. The clinical candidate WVE-006 is in a phase 1b/2a trial [[NCT06405633]].`,
  pt:`One drug switches off the faulty message so the liver stops making the clumping protein; another tries to correct the message [[Clark2024SEQUOIA,Monian2026]].`,
  hook:`Fazirsiran (RNAi) lowers Z-AAT in the liver; it does not raise AAT for the lung [[Strnad2022Fazirsiran]].`},
 {from:.4,at:.5,k:'Folding',t:'Help Z-AAT fold and leave the liver',
  txt:`GSK716 binds a cryptic pocket in Z-AAT, blocks polymerisation and raised Z-AAT secretion threefold in iPSC cells and sevenfold in transgenic mice ${frEv('hyp')} [[Lomas2021]]. VX-864 raised plasma functional AAT by about 2.2–2.3 µM vs placebo at day 28 in PiZZ patients, a registry-posted result that is not peer-reviewed ${frEv('early')} [[NCT04474197]]. A second VX-864 trial was terminated "based on frequency and nature of skin and subcutaneous tissue disorders" [[NCT05643495]].`,
  pt:`Small-molecule medicines try to help the faulty protein fold properly so it can leave the liver [[Lomas2021]].`,
  hook:`Correctors raise Z-AAT secretion (GSK716 sevenfold in mice; VX-864 +2.3 µM in patients, registry-posted) [[Lomas2021,NCT04474197]].`},
 {from:.6,at:.7,k:'Replace',t:'Give back the missing protein',
  txt:`In RAPID (n=180), weekly intravenous A1PI 60 mg/kg slowed CT lung density loss at TLC: −1.45 vs −2.19 g/L a year (p=0.03); the combined TLC+FRC primary endpoint narrowly missed (p=0.06) ${frEv('est')} [[Chapman2015]]. SPARTA (n=345) completed in July 2026 with no results posted [[NCT01983241]], and the recombinant AAT-Fc trial ELEVAATE completed without posted results [[NCT05856331]]. Intramuscular rAAV1-AAT gene therapy gave stable expression at only 2.0–2.5% of the target level from years 1 to 5 ${frEv('early')} [[Flotte2011,Mueller2017]].`,
  pt:`Weekly drips of the missing protein slowed lung damage seen on CT scans [[Chapman2015]].`,
  hook:`In RAPID, A1PI augmentation slowed lung density loss at TLC (p=0.03), but the combined primary endpoint gave p=0.06 [[Chapman2015]].`},
 {from:.8,at:.9,k:'Protect',t:'Lung and liver need different fixes',
  txt:`Silencing protects the liver but does not raise circulating AAT, so fazirsiran targets liver disease, not emphysema [[Strnad2022Fazirsiran,NCT05677971]]. Editing the gene or its message aims to do both [[Monian2026,Krooss2027]]. So far there are early human data only ${frEv('hyp')} [[Krooss2027]].`,
  pt:`The lung needs more working protein, while the liver needs less of the faulty one; some new treatments try to fix both at once [[Strnad2022Fazirsiran,Monian2026]].`,
  hook:`Silencing (RNAi) helps the liver only; augmentation targets the lung; editing aims at both [[Strnad2022Fazirsiran,Chapman2015,Monian2026]].`}];
const FA_P=[
 {n:'Base editing (DNA)',ev:[['hyp','Hypothesis to early: one case']],tgt:'The Z letter in the SERPINA1 gene',kind:'big',big:'54–57%',
  cap:'of PiZ alleles corrected in one person\'s liver at 10 weeks (YOLT-202)'},
 {n:'Silence or edit the RNA',ev:[['early','Early: RNAi'],['hyp','Hypothesis: RNA editing']],tgt:'Z-AAT messenger RNA in liver cells',
  extra:'RNA editing in mice: 50% of Z transcripts edited',kind:'bars',hd:'SEQUOIA: serum Z-AAT change at week 16',
  rows:[['fazirsiran 25 mg',-61,'−61%','var(--rx)'],['100 mg',-83,'−83%','var(--rx)'],['200 mg',-94,'−94%','var(--rx)']]},
 {n:'Folding correctors',ev:[['early','Early evidence'],['hyp','Hypothesis: GSK716']],tgt:'The misfolded Z-AAT protein',kind:'big',big:'+2.3 µM',
  cap:'plasma functional AAT vs placebo at day 28, VX-864 100 mg *',reg:1},
 {n:'Replace the protein',ev:[['est','Established: A1PI'],['early','Early: AAV']],tgt:'AAT in the blood',
  extra:'AAV gene therapy: 2.0–2.5% of the target level',kind:'bars',hd:'RAPID: CT lung density change at TLC, g/L a year',
  rows:[['placebo',-2.19,'−2.19','var(--muted)'],['A1PI weekly',-1.45,'−1.45','var(--rx)']]},
 {n:'Which organ each route helps',ev:[['hyp','Early human data only']],tgt:'Liver (Z-AAT build-up) and lung (too little AAT)',kind:'matrix',hd:'what the sources show',
  cols:['route','liver','lung'],
  rows:[['RNAi silencing','Z-AAT down','no AAT rise','var(--good)','var(--bad)'],['DNA or RNA editing','aims at both','aims at both','var(--warn)','var(--warn)'],['A1PI augmentation','not shown','density loss slowed','var(--muted)','var(--good)']]}];
const FA_TXT={liver:'liver cell',gene:'gene (Z variant)',mrna:'mRNA',poly:'Z-AAT clumps',blood:'blood',lung:'lung',elast:'free elastase',
  gauge:'AAT in blood',iv:'IV A1PI weekly',aav:'muscle (AAV)',needL:'liver: fewer Z clumps',needG:'lung: more AAT',
  cap:['A base editor rewrites the Z letter in the gene','','Correctors help Z-AAT fold and leave the cell','Infused A1PI raises AAT in the blood','The liver and the lung need different fixes'],
  capR:['RNAi cuts the message: fewer clumps, no rise in AAT','RNA editing corrects the message instead']};

/* ---- pipeline data: r route, c column (0 lab .. 4 licensed), x outcome: pos | none | neg | reg | regneg ---- */
const FP_ROUTES=[{k:'alarm',n:'Alarmins'},{k:'t2',n:'Type 2'},{k:'pde',n:'PDE & neutrophil'},{k:'dev',n:'Procedures'},{k:'early',n:'Early COPD & repair'},{k:'aatd',n:'Alpha-1'}];
const FP_COLS=['Lab','Phase 1–2','Phase 2','Phase 3','Licensed'];
const FP_TXT={h:['Drug or approach','Registry','Phase','Status','Size','Result'],noNct:'not given in this guide\'s sources',
  regTag:'Registry-posted',regNote:'This result was posted by the sponsor on ClinicalTrials.gov; no peer-reviewed paper had appeared by the pass date.',
  shape:['published result or label','no result yet, or registry-posted','stopped or missed its main goal'],
  count:(n,t)=>`${n} of ${t} trials shown.`,aria:q=>`${q.n}, ${q.ph}, ${q.st}`};
const FP_TRIALS=[
 {n:'COURSE',d:'tezepelumab (anti-TSLP)',r:'alarm',c:2,ph:'Phase 2a',nct:'',st:'Published',sz:'333',ev:'early',x:'neg',res:'Missed its primary endpoint: 1.75 vs 2.11 exacerbations a year, rate ratio 0.83 (90% CI 0.64–1.06) [[Singh2025COURSE]].'},
 {n:'EMBARK',d:'tezepelumab (anti-TSLP)',r:'alarm',c:3,ph:'Phase 3',nct:'NCT06883305',st:'Recruiting; primary completion estimated March 2029',sz:'about 990 planned',ev:'early',x:'none',res:'No results yet [[NCT06883305]].'},
 {n:'JOURNEY',d:'tezepelumab (anti-TSLP)',r:'alarm',c:3,ph:'Phase 3',nct:'NCT06878261',st:'Recruiting; primary completion estimated March 2029',sz:'about 990 planned',ev:'early',x:'none',res:'No results yet [[NCT06878261]].'},
 {n:'Verekitug phase 2b',d:'verekitug (anti-TSLP receptor)',r:'alarm',c:2,ph:'Phase 2b',nct:'NCT06981078',st:'Active, not recruiting',sz:'666',ev:'early',x:'none',res:'No results yet [[NCT06981078]].'},
 {n:'Itepekimab phase 2a',d:'itepekimab (anti-IL-33)',r:'alarm',c:2,ph:'Phase 2a',nct:'',st:'Published',sz:'343',ev:'early',x:'neg',res:'Missed overall: 1.30 vs 1.61 a year (RR 0.81, P=0.13). Former smokers RR 0.58 (95% CI 0.39–0.85); current smokers 1.09 [[Rabe2021]].'},
 {n:'AERIFY-1',d:'itepekimab (anti-IL-33)',r:'alarm',c:3,ph:'Phase 3',nct:'NCT04701983',st:'Completed August 2025; results posted',sz:'1,127 former smokers',ev:'early',x:'reg',res:'Registry-posted: 0.650 vs 0.891 exacerbations per participant-year, rate ratio 0.729 (95% CI 0.598–0.890; p=0.0019) every 2 weeks; 0.795 (p=0.0213) every 4 weeks [[NCT04701983]].'},
 {n:'AERIFY-2',d:'itepekimab (anti-IL-33)',r:'alarm',c:3,ph:'Phase 3',nct:'NCT04751487',st:'Completed August 2025; results posted',sz:'1,234',ev:'early',x:'regneg',res:'Registry-posted, former smokers: rate ratio 0.984 (p=0.88) every 2 weeks and 0.876 (p=0.22) every 4 weeks, vs a placebo rate of 0.879 [[NCT04751487]].'},
 {n:'AERIFY-4',d:'itepekimab, long-term safety',r:'alarm',c:3,ph:'Phase 3',nct:'NCT06208306',st:'Completed September 2026',sz:'669',ev:'early',x:'none',res:'No results posted [[NCT06208306]].'},
 {n:'COPD-ST2OP',d:'astegolimab (anti-ST2)',r:'alarm',c:2,ph:'Phase 2a',nct:'',st:'Published',sz:'81 registered',ev:'early',x:'neg',res:'2.18 vs 2.81 exacerbations a year (RR 0.78, P=0.19), not significant; SGRQ-C improved 3.3 points; sputum eosinophils cut (ratio 0.25) [[Yousuf2022]].'},
 {n:'ALIENTO',d:'astegolimab (anti-ST2)',r:'alarm',c:2,ph:'Phase 2b',nct:'',st:'Published',sz:'1,301',ev:'early',x:'pos',res:'Rate ratio 0.85 (95% CI 0.72–1.00; p=0.049) every 2 weeks [[Papi2026]].'},
 {n:'ARNASA',d:'astegolimab (anti-ST2)',r:'alarm',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'1,375',ev:'early',x:'neg',res:'0.85 (p=0.068) every 2 weeks and 0.82 (p=0.024) every 4 weeks; primary endpoint not met at statistical significance [[Papi2026]]. Pooled with ALIENTO: 0.85 (95% CI 0.76–0.96) [[Wedzicha2026]].'},
 {n:'FRONTIER-4',d:'tozorakimab (anti-IL-33)',r:'alarm',c:2,ph:'Phase 2a',nct:'',st:'Published',sz:'135',ev:'early',x:'neg',res:'Missed its FEV1 primary endpoint (+24 mL, p=0.216); post-bronchodilator FEV1 +67 mL [[Singh2025FRONTIER4]].'},
 {n:'OBERON',d:'tozorakimab (anti-IL-33)',r:'alarm',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'not given in this guide\'s sources',ev:'early',x:'pos',res:'Former smokers rate ratio 0.71 (95% CI 0.57–0.88); overall 0.70 [[Sciurba2026]].'},
 {n:'TITANIA',d:'tozorakimab (anti-IL-33)',r:'alarm',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'not given in this guide\'s sources',ev:'early',x:'pos',res:'Former smokers rate ratio 0.66 (95% CI 0.55–0.80); overall 0.71 [[Sciurba2026]].'},
 {n:'MIRANDA',d:'tozorakimab every 2 weeks',r:'alarm',c:3,ph:'Phase 3',nct:'NCT06040086',st:'Completed May 2026',sz:'1,454 randomised 3:2',ev:'early',x:'none',res:'No results posted [[NCT06040086,Watz2026]].'},
 {n:'PROSPERO',d:'tozorakimab, extension',r:'alarm',c:3,ph:'Phase 3',nct:'NCT05742802',st:'Completed May 2026',sz:'1,713',ev:'early',x:'none',res:'No results posted; primary endpoint severe exacerbations [[NCT05742802]].'},
 {n:'BOREAS',d:'dupilumab (anti-IL-4Rα)',r:'t2',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'939',ev:'est',x:'pos',res:'0.78 vs 1.10 exacerbations a year, rate ratio 0.70 (95% CI 0.58–0.86); FEV1 +83 mL at week 12 [[Bhatt2023]].'},
 {n:'NOTUS',d:'dupilumab (anti-IL-4Rα)',r:'t2',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'935',ev:'est',x:'pos',res:'0.86 vs 1.30 a year, rate ratio 0.66 (95% CI 0.54–0.82); FEV1 +82 mL at week 12; no significant SGRQ difference at 52 weeks [[Bhatt2024]].'},
 {n:'MATINEE',d:'mepolizumab (anti-IL-5)',r:'t2',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'804',ev:'est',x:'pos',res:'0.80 vs 1.01 a year, rate ratio 0.79 (95% CI 0.66–0.94); median time to first exacerbation 419 vs 321 days [[Sciurba2025]].'},
 {n:'METREX and METREO',d:'mepolizumab (anti-IL-5)',r:'t2',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'not given in this guide\'s sources',ev:'early',x:'pos',res:'METREX eosinophilic subgroup 1.40 vs 1.71 (RR 0.82; adjusted P=0.04), overall 0.98; METREO 100 mg 0.80 (adjusted P=0.07) [[Pavord2017]].'},
 {n:'GALATHEA and TERRANOVA',d:'benralizumab (anti-IL-5Rα)',r:'t2',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'not given in this guide\'s sources',ev:'est',x:'neg',res:'No significant fall at any dose; best rate ratio 0.83 (100 mg, GALATHEA, P=0.05) [[Criner2019H]].'},
 {n:'RESOLUTE',d:'benralizumab (anti-IL-5Rα)',r:'t2',c:3,ph:'Phase 3',nct:'NCT04053634',st:'Completed July 2025',sz:'689',ev:'early',x:'none',res:'No results posted [[NCT04053634]].'},
 {n:'ENDURA-1',d:'depemokimab (long-acting anti-IL-5)',r:'t2',c:3,ph:'Phase 3',nct:'NCT06959095',st:'Recruiting',sz:'about 981 planned',ev:'early',x:'none',res:'Primary endpoint: annual moderate or severe exacerbation rate [[NCT06959095]].'},
 {n:'ENDURA-2',d:'depemokimab (long-acting anti-IL-5)',r:'t2',c:3,ph:'Phase 3',nct:'NCT06961214',st:'Recruiting',sz:'about 961 planned',ev:'early',x:'none',res:'Primary endpoint: annual moderate or severe exacerbation rate [[NCT06961214]].'},
 {n:'VIGILANT',d:'depemokimab, early add-on',r:'t2',c:3,ph:'Phase 3',nct:'NCT07177339',st:'Recruiting',sz:'about 1,196 planned',ev:'early',x:'none',res:'Primary endpoint: annual moderate or severe exacerbation rate [[NCT07177339]].'},
 {n:'PERSEPHONE',d:'lunsekimig',r:'t2',c:3,ph:'Phase 2b/3',nct:'NCT07190209',st:'Recruiting',sz:'about 942 planned',ev:'early',x:'none',res:'Exacerbation-rate primary endpoint [[NCT07190209]].'},
 {n:'THESEUS',d:'lunsekimig',r:'t2',c:3,ph:'Phase 3',nct:'NCT07190222',st:'Recruiting',sz:'about 942 planned',ev:'early',x:'none',res:'Exacerbation-rate primary endpoint [[NCT07190222]].'},
 {n:'COLOSSUS',d:'lunsekimig, long-term safety',r:'t2',c:3,ph:'Phase 3',nct:'NCT07793409',st:'Enrolling by invitation; began September 2026',sz:'about 1,508 planned',ev:'early',x:'none',res:'No results yet [[NCT07793409]].'},
 {n:'Dupixent COPD label',d:'dupilumab',r:'t2',c:4,ph:'Licensed (US)',nct:'',st:'Labelled',sz:'—',ev:'est',x:'pos',res:'Add-on maintenance treatment for adults with inadequately controlled COPD and an eosinophilic phenotype [[FDA-Dupixent]].'},
 {n:'Nucala COPD label',d:'mepolizumab',r:'t2',c:4,ph:'Licensed (US)',nct:'',st:'Labelled',sz:'—',ev:'est',x:'pos',res:'Add-on maintenance treatment for adults with inadequately controlled COPD and an eosinophilic phenotype [[FDA-Nucala]].'},
 {n:'ENHANCE-1 and ENHANCE-2',d:'ensifentrine (PDE3/4), nebulised',r:'pde',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'760 and 789',ev:'est',x:'pos',res:'FEV1 AUC0–12h +87 and +94 mL; exacerbation rate ratio 0.64 and 0.57 over 24 weeks [[Anzueto2023]].'},
 {n:'Ohtuvayre label',d:'ensifentrine',r:'pde',c:4,ph:'Licensed (US)',nct:'',st:'Approved 26 June 2024 (NDA 217389)',sz:'—',ev:'est',x:'pos',res:'Maintenance treatment of COPD in adults [[FDA-Ohtuvayre]].'},
 {n:'PIONEER',d:'tanimilast (inhaled PDE4)',r:'pde',c:2,ph:'Phase 2',nct:'',st:'Published',sz:'1,130',ev:'early',x:'neg',res:'No FEV1 dose-response; exacerbation reductions 13–28%, not significant [[Singh2020PIONEER]].'},
 {n:'PILASTER',d:'tanimilast (inhaled PDE4)',r:'pde',c:3,ph:'Phase 3',nct:'NCT04636801',st:'Terminated: "strategic decision by Sponsor; not due to safety reasons"',sz:'4,710',ev:'early',x:'neg',res:'No results posted [[NCT04636801]].'},
 {n:'PILLAR',d:'tanimilast vs roflumilast',r:'pde',c:3,ph:'Phase 3',nct:'NCT04636814',st:'Terminated: "strategic decision by Sponsor; not due to safety reasons"',sz:'3,973',ev:'early',x:'neg',res:'No results posted [[NCT04636814]].'},
 {n:'Danirixin phase 2b',d:'danirixin (oral CXCR2 antagonist)',r:'pde',c:2,ph:'Phase 2b',nct:'',st:'Published',sz:'614',ev:'early',x:'neg',res:'No symptom or health-status benefit; more exacerbations, and pneumonias at 50 mg: "an unfavorable benefit-risk profile" [[Lazaar2020]].'},
 {n:'Rheoplasty trial',d:'bronchial rheoplasty',r:'dev',c:1,ph:'Device, uncontrolled',nct:'',st:'Published',sz:'30',ev:'early',x:'pos',res:'CAT −7.9 and SGRQ −14.6 points at 6 months; goblet-cell hyperplasia fell; mild haemoptysis in 47% [[Valipour2020]].'},
 {n:'RheSolve',d:'bronchial rheoplasty vs sham',r:'dev',c:3,ph:'Device, sham-controlled',nct:'NCT04677465',st:'Status unknown',sz:'about 270',ev:'early',x:'none',res:'No results posted; primary endpoint CAT [[NCT04677465]].'},
 {n:'SPRAY-CB',d:'metered cryospray vs sham',r:'dev',c:3,ph:'Device, sham-controlled',nct:'NCT03893370',st:'Published 2026',sz:'203 randomised 2:1',ev:'early',x:'pos',res:'SGRQ −5.9 and CAT −3.4 vs sham at 12 months; periprocedural pneumothorax in 3.6% of treatments [[Criner2026SPRAYCB,NCT03893370]].'},
 {n:'Cryospray mechanistic trial',d:'metered cryospray vs sham',r:'dev',c:2,ph:'Device, sham-controlled',nct:'',st:'Published 2026',sz:'32',ev:'early',x:'pos',res:'No fall in goblet-cell density, the expected mechanism; SGRQ −9.6 and less CT air trapping [[Orton2026]].'},
 {n:'AIRFLOW-2',d:'targeted lung denervation vs sham',r:'dev',c:2,ph:'Device, sham-controlled',nct:'',st:'Published',sz:'82',ev:'early',x:'pos',res:'Respiratory adverse events 32% vs 71% at 3–6.5 months; HR 0.35 for exacerbations needing hospital care; symptoms did not differ [[Slebos2019]].'},
 {n:'AIRFLOW-3',d:'targeted lung denervation vs sham',r:'dev',c:3,ph:'Device, sham-controlled',nct:'NCT03639051',st:'Active, not recruiting; follow-up to 2028',sz:'464',ev:'early',x:'none',res:'Primary endpoint moderate or severe exacerbations; no results yet [[NCT03639051]].'},
 {n:'RETHINC',d:'indacaterol–glycopyrrolate in pre-COPD',r:'early',c:3,ph:'Randomised trial',nct:'',st:'Published',sz:'535',ev:'hyp',x:'neg',res:'SGRQ responders 56.4% vs 59.0% (adjusted OR 0.91; P=0.65), although FEV1 rose 2.48 percentage points [[Han2022RETHINC]].'},
 {n:'FORTE',d:'all-trans and 13-cis retinoic acid',r:'early',c:1,ph:'Feasibility trial',nct:'',st:'Published',sz:'148',ev:'hyp',x:'neg',res:'No improvement in lung function, CT density or quality of life over 6 months [[Roth2006]].'},
 {n:'REPAIR',d:'palovarotene (γ-selective retinoid), AATD',r:'early',c:2,ph:'Randomised trial',nct:'',st:'Published',sz:'262',ev:'hyp',x:'neg',res:'CT lung density difference −0.25 HU at week 52 (p=0.94) [[Stolk2012]].'},
 {n:'MSC trial',d:'intravenous mesenchymal stem cells',r:'early',c:1,ph:'Randomised trial',nct:'',st:'Published',sz:'62',ev:'early',x:'neg',res:'Safe over 2 years; no change in lung function, exacerbations or quality of life [[Weiss2013]].'},
 {n:'P63+ progenitor cells',d:'autologous airway basal progenitor cells',r:'early',c:1,ph:'Small trial',nct:'',st:'Published',sz:'17 evaluable treated, 3 controls',ev:'early',x:'pos',res:'DLCO +18.2% vs −17.4% at 24 weeks (P=0.008); no grade 3–5 adverse events [[Wang2024P63]].'},
 {n:'RAPID',d:'intravenous A1PI 60 mg/kg weekly',r:'aatd',c:3,ph:'Phase 3',nct:'',st:'Published',sz:'180',ev:'est',x:'pos',res:'Lung density loss at TLC −1.45 vs −2.19 g/L a year (p=0.03); combined TLC+FRC primary p=0.06 [[Chapman2015]].'},
 {n:'SPARTA',d:'modified-process A1PI',r:'aatd',c:3,ph:'Phase 3',nct:'NCT01983241',st:'Completed July 2026',sz:'345',ev:'est',x:'none',res:'No results posted; primary endpoint whole-lung PD15 density [[NCT01983241]].'},
 {n:'ELEVAATE',d:'recombinant AAT-Fc (SAR447537)',r:'aatd',c:2,ph:'Phase 2',nct:'NCT05856331',st:'Completed August 2025',sz:'99',ev:'early',x:'none',res:'No results posted [[NCT05856331]].'},
 {n:'AROAAT-2002',d:'fazirsiran (RNAi), open-label',r:'aatd',c:2,ph:'Open-label trial',nct:'',st:'Published',sz:'16',ev:'early',x:'pos',res:'Liver Z-AAT median −83%, serum about −90% at nadir; fibrosis regressed in 7 of 15 [[Strnad2022Fazirsiran]].'},
 {n:'SEQUOIA',d:'fazirsiran (RNAi)',r:'aatd',c:2,ph:'Phase 2',nct:'',st:'Published',sz:'40',ev:'early',x:'pos',res:'Serum Z-AAT −61%, −83% and −94% at 25, 100 and 200 mg; liver Z-AAT −93% vs +26% on placebo [[Clark2024SEQUOIA]].'},
 {n:'Fazirsiran, liver fibrosis',d:'fazirsiran (RNAi)',r:'aatd',c:3,ph:'Phase 3',nct:'NCT05677971',st:'Recruiting',sz:'about 160 planned',ev:'early',x:'none',res:'Targets AATD liver disease with fibrosis [[NCT05677971]].'},
 {n:'Fazirsiran, mild fibrosis',d:'fazirsiran (RNAi)',r:'aatd',c:3,ph:'Phase 3',nct:'NCT06165341',st:'Recruiting',sz:'about 50 planned',ev:'early',x:'none',res:'Targets AATD liver disease with mild fibrosis [[NCT06165341]].'},
 {n:'VX-864 phase 2',d:'VX-864 (corrector)',r:'aatd',c:2,ph:'Phase 2',nct:'NCT04474197',st:'Completed May 2021; results posted',sz:'44',ev:'early',x:'reg',res:'Registry-posted: plasma functional AAT about +2.2–2.3 µM vs placebo at day 28 [[NCT04474197]].'},
 {n:'VX-864 second trial',d:'VX-864 (corrector)',r:'aatd',c:2,ph:'Phase 2',nct:'NCT05643495',st:'Terminated for skin and subcutaneous tissue disorders',sz:'14',ev:'early',x:'neg',res:'Stopped "based on frequency and nature of skin and subcutaneous tissue disorders" [[NCT05643495]].'},
 {n:'GSK716',d:'small-molecule corrector',r:'aatd',c:0,ph:'Laboratory',nct:'',st:'Published',sz:'cells and mice',ev:'hyp',x:'pos',res:'Blocked Z-AAT polymerisation; secretion threefold in iPSC cells, sevenfold in transgenic mice [[Lomas2021]].'},
 {n:'SERPINA1-994',d:'GalNAc RNA-editing oligonucleotide',r:'aatd',c:0,ph:'Laboratory',nct:'',st:'Published',sz:'mice',ev:'hyp',x:'pos',res:'Edited 50% of Z transcripts in PiZ mouse liver; raised serum AAT and reduced liver aggregates [[Monian2026]].'},
 {n:'rAAV1-AAT',d:'intramuscular AAV gene therapy',r:'aatd',c:2,ph:'Phase 2',nct:'',st:'Published',sz:'9',ev:'early',x:'pos',res:'Dose-dependent normal M-AAT, stable at 2.0–2.5% of the target level from years 1 to 5 [[Flotte2011,Mueller2017]].'},
 {n:'BEAM-302',d:'lipid-nanoparticle base editor',r:'aatd',c:1,ph:'Phase 1/2',nct:'NCT06389877',st:'Recruiting',sz:'about 192 planned',ev:'hyp',x:'none',res:'No results yet [[NCT06389877]].'},
 {n:'YOLT-202',d:'in vivo base editing',r:'aatd',c:1,ph:'Early phase 1',nct:'NCT07193615',st:'Active, not recruiting',sz:'about 18 planned',ev:'hyp',x:'pos',res:'Single case: PiZ corrected in 54–57% of alleles at 10 weeks on liver biopsy, no off-target editing detected [[Krooss2027,NCT07193615]].'},
 {n:'RestorAATion-2',d:'WVE-006 (RNA editing)',r:'aatd',c:1,ph:'Phase 1b/2a',nct:'NCT06405633',st:'Recruiting',sz:'about 48 planned',ev:'hyp',x:'none',res:'No results yet [[NCT06405633]].'}];
