/* =============== 5.2 Pregnancy & parenthood =============== */
inits.pregnancy=()=>{
  const svg=$('#prSvg'),rg=$('#prT');
  let ty='h',plan=false;
  const W0=-6,W1=46,wk=t=>lerp(W0,W1,t),tOf=w=>(w-W0)/(W1-W0);

  /* risk rows: weeks a..b where each published risk concentrates (schematic), with its published figure */
  const ROWS={
    h:[{l:'Hyperemesis (survey)',a:5,b:16,v:'25.5% vs 3% population'},
       {l:'Pelvic pain, instability',a:14,b:40,v:'26% vs 7% (EDS, Dutch)'},
       {l:'Preterm birth, PROM',a:24,b:37,v:'survey ↑ · Swedish register no ↑'},
       {l:'Rapid labour ≤3 h',a:38.5,b:41,v:'28–36% (guidance review)'},
       {l:'Postpartum haemorrhage',a:40,b:42.5,v:'20.6% vs 6.4% (survey)'},
       {l:'Wounds, pelvic health',a:40,b:46,v:'plan with the team'}],
    c:[{l:'Fetal EDS: fragile membranes',a:22,b:37,v:'preterm 40% if baby affected'},
       {l:'Pelvic pain, instability',a:14,b:40,v:'26% vs 7% (EDS, Dutch)'},
       {l:'Skin and wound healing',a:39,b:43,v:'two-layer, tension-free closure'},
       {l:'Bleeding risk review',a:36,b:41,v:'classical EDS: consensus'},
       {l:'Postpartum haemorrhage',a:40,b:42.5,v:'19% vs 7% (EDS, Dutch)'},
       {l:'Newborn bruising',a:40,b:46,v:'EDS is on the differential'}],
    v:[{l:'Miscarriage',a:4,b:20,v:'13.8% review · 19% Dutch'},
       {l:'Preterm birth',a:24,b:37,v:'8.8% review · 19.1% Dutch'},
       {l:'Planned birth ~37 weeks',a:36.5,b:37.5,v:'caesarean suggested (review)'},
       {l:'Arterial dissection, rupture',a:36,b:46,v:'9.2% of deliveries'},
       {l:'Uterine rupture',a:37,b:41,v:'2.6% of deliveries'},
       {l:'Maternal death',a:38,b:46,v:'5.3%/delivery · 0/121 Dutch'}]};
  const PLAN={
    h:['Genetic counselling: 1 in 2 per child','No prenatal or embryo test for hEDS','Preconception review: joints, medicines','POTS: ≥2.5 L fluid daily antenatally','Mast cell disease: an action plan','Birth plan across four phases'],
    c:['Genetic counselling: 1 in 2 per child','Prenatal or embryo test: variant known','About half are new (de novo) variants','Plan wound closure for delivery','Bleeding-risk evaluation','The baby\u2019s EDS status matters'],
    v:['High-risk obstetric programme','Delivery plan stratified by variant','Prenatal or embryo test (PGD, UK HFEA)','"5% mortality risk with each pregnancy"','Shared decision-making','Emergency card or vEDS passport']};

  const NOTES={
   h:[
    {k:'Before pregnancy',t:'Planning with hEDS or HSD',
     txt:`GeneReviews advises that hEDS pregnancy planning cover preconception (musculoskeletal health, medicines), antenatal (joint instability, pelvic strength, hernias, pain), intrapartum (birth choices, mobility, anaesthesia) and postpartum issues (wound healing, pelvic health, newborn care). Prenatal and preimplantation testing are not possible for hEDS because no causal gene is known. [[Hakim2024GeneReviews]] A Consortium-facilitated guideline, built from a scoping review and expert co-creation, recommends at least 2.5 L of fluid daily antenatally for people with POTS and action plans with premedication or prehydration for mast cell disease, and notes "limited high quality evidence". [[Pezaro2024]] Press <b>Planning view</b> for the list.`,
     pt:`Many people with hypermobile EDS have uncomplicated pregnancies, but tell your midwife early so they can plan. [[Karthikeyan2018,Pezaro2024]]`,
     hook:`hEDS planning in four phases: preconception, antenatal, intrapartum, postpartum. No prenatal test exists for hEDS. [[Hakim2024GeneReviews,Pezaro2024]]`},
    {k:'Weeks 0–13 · first trimester',t:'Early pregnancy',
     txt:`<span class="ev early">Early evidence</span> In an international survey of 947 women with hEDS or HSD, hyperemesis gravidarum was reported in 25.48% of pregnancies against a quoted population figure of 3%. Volunteers recruited online may over-represent complicated pregnancies. [[Pearce2023]] In 386 French women with hEDS seen in an expert centre, spontaneous abortion (28%) and multiple spontaneous abortion (13%) were higher than in the general population. [[HugonRodin2016]]`,
     pt:`Survey answers point to more severe sickness, but people with harder pregnancies are more likely to answer surveys.`,
     hook:`Survey (self-report): hyperemesis 25.48% vs 3%. Treat volunteer-survey rates as upper estimates. [[Pearce2023]]`},
    {k:'Weeks 14–27 · second trimester',t:'Joints and the pelvis',
     txt:`In a Dutch patient-association study of 46 women with EDS (128 pregnancies beyond 24 weeks), pelvic pain and instability were more frequent than in unaffected mothers (26% vs 7%). [[Lind2002]] In most women with hEDS, joint dislocation, pain, autonomic symptoms and POTS are the issues to plan for. [[Karthikeyan2018]] Perinatal guidance advises careful positioning of the head and neck, shoulders, back, hips, knees and ankles with wedges, balls, pillows and bed adaptations, anticipating joint pain or dysfunction. [[Pezaro2024]]`,
     pt:`Pregnancy loosens the pelvis in everyone. With EDS, pelvic pain and unstable joints are more common, so supports and careful positions help.`,
     hook:`Dutch EDS study: pelvic pain and instability 26% vs 7% in unaffected mothers. [[Lind2002]]`},
    {k:'Weeks 28–39 · third trimester',t:'Preterm birth: the data disagree',
     txt:`The international survey reported preterm birth in 15.45% of babies (quoted population 7.8%) and preterm rupture of membranes in 7.03% (under 3%). [[Pearce2023]] The Swedish nationwide register found no increase in preterm birth (aOR 0.6, 95% CI 0.3–1.2) or preterm premature rupture of membranes (aOR 0.8). [[Sundelin2017]] In the French expert-centre cohort, premature birth (6.2%) was similar to the general population. [[HugonRodin2016]] US inpatient data (all EDS types) found raised odds of prematurity (OR 1.47) and cervical incompetence (OR 3.11). [[Spiegel2022]]`,
     pt:`Some studies find more early births, others find none. The answer depends on who was studied and how.`,
     hook:`Register vs survey: Swedish register, no excess preterm birth; volunteer survey, 15.45%. [[Sundelin2017,Pearce2023]]`},
    {k:'Around week 40 · labour and birth',t:'Birth',
     txt:`The perinatal guidance reports rapid or precipitous birth (≤3 hours) at 28–36%, prefers physiological vaginal birth where there is no obstetric contraindication, and reserves caesarean for obstetric indications. It states that "higher doses of local anesthesia may be needed" and that epidural is preferred over spinal anaesthesia in hEDS/HSD. [[Pezaro2024]] In the Swedish register, induction of labour (aOR 2.6) and amniotomy (aOR 3.8) were more common among births to women with an EDS code. [[Sundelin2017]]`,
     pt:`Labour can be fast. Numbing medicine may not work as well, so tell the team if you can still feel things. [[Pezaro2024,Bourne2026RAPM]]`,
     hook:`hEDS/HSD birth: precipitous labour 28–36%; vaginal birth preferred without obstetric contraindication; epidural over spinal. [[Pezaro2024]]`},
    {k:'Weeks after birth',t:'After birth',
     txt:`The survey reported postpartum haemorrhage in 20.60% (quoted population 6.38%); the Dutch EDS study 19% against 7%. [[Pearce2023,Lind2002]] The perinatal guidance recommends gentle handling of fragile tissues, longer-lasting absorbable sutures and tension-free interrupted closure; checking an infant's latch with a mirror rather than straining the head and neck; and documenting early bruising in infants, and its causes, "to avoid false accusations of maltreatment". [[Pezaro2024]] GeneReviews lists wound healing, pelvic health and newborn care for the postpartum plan. [[Hakim2024GeneReviews]]`,
     pt:`After the birth, bleeding, healing and sore joints need watching. Feeding positions can be adapted so the parent's neck is not strained.`,
     hook:`Document infant bruising and its causes, to avoid false accusations of maltreatment. [[Pezaro2024]]`}],
   c:[
    {k:'Before pregnancy',t:'Planning with classical EDS',
     txt:`Classical EDS is autosomal dominant: each child of an affected parent has a 50% chance of inheriting it. About half of people with cEDS have an affected parent and about half have a new (de novo) variant. Once the familial variant is known, prenatal and preimplantation testing are possible. [[Malfait2024GeneReviews]] Large cohorts giving cEDS-specific obstetric rates are lacking; the best-supported point is the fetal-membrane effect described later. [[Lind2002,Almheiri2026]]`,
     pt:`A parent with classical EDS has a 1 in 2 chance of passing it on in each pregnancy. A gene test can be done before or during pregnancy once the family's gene change is known.`,
     hook:`cEDS: autosomal dominant, about 50% de novo; prenatal and PGT possible once the familial variant is known. [[Malfait2024GeneReviews]]`},
    {k:'Weeks 0–13 · first trimester',t:'Whose EDS matters?',
     txt:`A 2026 review found that the baby's EDS status predicted complications more strongly than the mother's. [[Almheiri2026]] In classical EDS, aortic root dilatation and mitral valve prolapse occur but are rarely clinically significant. [[Malfait2024GeneReviews]]`,
     pt:`If the baby has EDS, the membranes around it may be more fragile, whichever parent passed it on.`,
     hook:`Fetal EDS status predicts complications more strongly than maternal disease. [[Almheiri2026]]`},
    {k:'Weeks 14–27 · second trimester',t:'Joints and the pelvis',
     txt:`In the Dutch patient-association study (46 women with EDS, mixed types), pelvic pain and instability affected 26% against 7% of unaffected mothers. [[Lind2002]]`,
     pt:`Pelvic pain and loose joints are more common in pregnancy with EDS.`,
     hook:`Pelvic pain and instability: 26% vs 7%. [[Lind2002]]`},
    {k:'Weeks 28–39 · third trimester',t:'Fragile membranes',
     txt:`In the Dutch study, preterm delivery occurred in 21% of affected mothers but in 40% of unaffected mothers carrying an affected infant, which points to the baby's EDS (fragile membranes) as a driver of prematurity. Premature rupture of membranes was strongly associated with fetal EDS in a 2026 review. [[Lind2002,Almheiri2026]] A 2026 systematic review found EDS studies of spontaneous preterm birth too heterogeneous to pool; the evidence is weaker than for Marfan syndrome. [[Treacy2026]]`,
     pt:`When the baby has EDS, the waters may break early. That can happen even when the mother does not have EDS.`,
     hook:`Preterm delivery 40% when an unaffected mother carried an affected baby, vs 21% in affected mothers. [[Lind2002]]`},
    {k:'Around week 40 · labour and birth',t:'Skin, wounds and bleeding',
     txt:`GeneReviews (classical EDS) advises closing dermal wounds without tension, preferably in two layers, with generous deep stitches, cutaneous stitches left in place twice as long as usual, and adjacent skin carefully taped to prevent the scar stretching. It states that desmopressin "may be useful to normalize bleeding time". [[Malfait2024GeneReviews]] A 2026 anaesthesia Delphi panel recommends bleeding-risk evaluation, and considering desmopressin, in classical, classical-like, kyphoscoliotic and vascular EDS. [[Amaral2026]]`,
     pt:`Skin in classical EDS tears and scars easily, so stitches are placed in layers and left in longer.`,
     hook:`cEDS sutures: two layers, no tension, skin stitches left twice as long as usual. [[Malfait2024GeneReviews]]`},
    {k:'Weeks after birth',t:'After birth and the newborn',
     txt:`Postpartum haemorrhage was more frequent in the Dutch EDS study (19% vs 7%). [[Lind2002]] EDS is on the differential for bruising in suspected child abuse, especially in types with marked skin and capillary involvement; careful examination of the child and extended family is routine. <span class="ev hyp">Hypothesis</span> EDS as an explanation for infant fractures remains speculative. [[Castori2015]] Young children with fragile skin can wear pads or bandages over the forehead, knees and shins. [[Malfait2024GeneReviews]]`,
     pt:`Babies and toddlers with classical EDS bruise and cut easily. Padding the forehead, knees and shins protects them.`,
     hook:`EDS belongs on the bruising differential in suspected abuse; as an explanation for infant fractures it is unproven. [[Castori2015]]`}],
   v:[
    {k:'Before pregnancy',t:'Planning with vascular EDS',
     txt:`GeneReviews states that affected women have "a 5% mortality risk with each pregnancy" and advises follow-up in a high-risk obstetric programme, with delivery decisions stratified by the genetic variant. Prenatal and preimplantation testing are possible once the familial COL3A1 variant is known. [[Byers2025GeneReviews]] The UK Human Fertilisation and Embryology Authority has approved vEDS for pre-implantation genetic diagnosis; a published case describes PGD with surrogacy. [[Angwin2023H]] A Dutch cohort proposes shared decision-making rather than discouraging all pregnancies. [[vandenBersselaar2026]]`,
     pt:`Pregnancy with vascular EDS needs planning with a high-risk pregnancy team before and during pregnancy. [[Byers2025GeneReviews]]`,
     hook:`GeneReviews: vEDS carries "a 5% mortality risk with each pregnancy"; high-risk obstetric care; delivery planned by variant. [[Byers2025GeneReviews]]`},
    {k:'Weeks 0–13 · first trimester',t:'Early pregnancy',
     txt:`A systematic review (6 studies, 412 pregnancies) reported 30% infertility and 13.8% miscarriage. [[Haem2024]] In a Dutch multicentre cohort of 121 pregnancies in 43 women with a COL3A1 variant, miscarriage was 19% (23/121), clustered in women with glycine substitutions (19 of 23). [[vandenBersselaar2026]]`,
     pt:`Miscarriage is more common with vascular EDS, especially with some kinds of gene change.`,
     hook:`vEDS miscarriage: 13.8% (review), 19% (Dutch cohort, mostly glycine substitutions). [[Haem2024,vandenBersselaar2026]]`},
    {k:'Weeks 14–27 · second trimester',t:'Watching and waiting',
     txt:`The international consensus recommends keeping blood pressure in the normal range and treating hypertension aggressively. [[Byers2017]] People with vEDS are told to seek immediate medical attention for sudden, unexplained pain. [[Byers2025GeneReviews]] In pedigree data, Kaplan–Meier survival did not differ between parous and nulliparous women with vEDS. [[Murray2014GenetMed]]`,
     pt:`With vascular EDS, sudden, unexplained pain is an emergency: go to hospital and show your emergency card. [[Byers2025GeneReviews]]`,
     hook:`vEDS: parous and nulliparous women had similar survival in pedigree data. [[Murray2014GenetMed]]`},
    {k:'Weeks 28–39 · third trimester',t:'Timing the birth',
     txt:`The review reported that 8.8% of live births were preterm and suggested scheduling caesarean birth at 37 weeks to avoid expulsive efforts; this is the authors' conclusion, not a trial result. [[Haem2024]] In the UK national service, women diagnosed before delivery all had early planned caesarean birth under general anaesthesia in a tertiary hospital. [[Bowen2023vEDS]] <span class="ev early">Early evidence</span> In 41 children with vEDS, preterm birth was more common than in the US population (48.8% vs 12.2%) whether or not the mother was affected, which suggests the baby's own diagnosis confers the risk. [[Stephens2022]]`,
     pt:`Teams often plan an early caesarean birth for vascular EDS, so the body does not have to push.`,
     hook:`vEDS review: caesarean at 37 weeks suggested to avoid expulsive efforts. [[Haem2024]]`},
    {k:'Around week 40 · delivery',t:'Delivery: arteries and uterus',
     txt:`In interviews covering 76 deliveries, 46% were uncomplicated. Life-threatening complications occurred in 14.5%: arterial dissection or rupture 9.2%, uterine rupture 2.6% and surgical complications 2.6%. Third- or fourth-degree lacerations (20%) and preterm delivery (19%) were commonest. [[Murray2014GenetMed]] Anaesthesia guidance recommends avoiding spinal or epidural anaesthesia in vEDS and discussing cross-matched blood, cell salvage and prophylactic desmopressin. [[Wiesmann2014]] vEDS should be considered in a young person presenting with uterine rupture in pregnancy. [[Pepin2000]]`,
     pt:`Around the birth, the main danger is a tear in an artery or the womb. Planned care in a specialist hospital is meant to lower that risk.`,
     hook:`vEDS deliveries (n = 76): life-threatening 14.5%, arterial 9.2%, uterine rupture 2.6%. [[Murray2014GenetMed]]`},
    {k:'Weeks after birth',t:'After birth',
     txt:`Pregnancy-related deaths occurred in 30 of 565 deliveries (5.3%) by pedigree review, and in 5.7% per pregnancy in the systematic review. [[Murray2014GenetMed,Haem2024]] The Dutch cohort, with genetic diagnosis, found no pregnancy-related deaths, arterial dissections or uterine ruptures in the perinatal period. [[vandenBersselaar2026]] In the UK service, 5 of 104 pregnancies had life-threatening or fatal events, all before diagnosis. [[Bowen2023vEDS]] <span class="ev early">Early evidence</span> In mice, blocking oxytocin signalling after birth improved postpartum survival to about 90% in a vEDS model. [[Bowen2020JCI]]`,
     pt:`The weeks after birth still carry risk. Newer studies of people diagnosed before pregnancy show far better outcomes than older ones.`,
     hook:`vEDS pregnancy deaths: 30/565 deliveries (5.3%) in older pedigrees; 0/121 in a Dutch cohort diagnosed by gene test. [[Murray2014GenetMed,vandenBersselaar2026]]`}]};
  const AT=[[0,tOf(-3)],[tOf(0),tOf(8)],[tOf(14),tOf(21)],[tOf(28),tOf(34)],[tOf(38.5),tOf(40)],[tOf(41.2),tOf(44)]];
  const mk=()=>NOTES[ty].map((n,i)=>Object.assign({from:AT[i][0],at:AT[i][1]},n));
  let STEPS=mk(),setSt;

  /* side-view silhouette facing right; (x,y) top of head, s scale (1 ≈ 200 tall); B belly 0..1; pp postpartum 0..1 */
  function body(x,y,s,B,pp,hl){const P=(a,b)=>f1(x+a*s)+' '+f1(y+b*s);let g='';
    const by=B*(1-pp);
    g+=`<path d="M${P(-6,30)}L${P(-15,40)}Q${P(-18,80)} ${P(-15,108)}Q${P(-22,122)} ${P(-12,130)}L${P(-11,198)}L${P(-1,198)}L${P(0,140)}L${P(3,198)}L${P(13,198)}L${P(10,128)}C${P(12+64*by,124)} ${P(12+64*by,82)} ${P(12,78)}Q${P(20,60)} ${P(14,40)}L${P(6,30)}Z" style="fill:var(--brand-soft);stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round"/>`;
    g+=`<circle cx="${f1(x)}" cy="${f1(y+16*s)}" r="${f1(14*s)}" style="fill:var(--brand-soft);stroke:var(--ink);stroke-width:1.5"/>`;
    if(by>.05){const cx=x+(12+26*by)*s,cy=y+103*s;g+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1((5+17*by)*s)}" ry="${f1((5+15*by)*s)}" style="fill:var(--skin-derm);stroke:var(--skin-line);stroke-width:1"/><circle cx="${f1(cx+(4+6*by)*s)}" cy="${f1(cy-(2+6*by)*s)}" r="${f1((2+5*by)*s)}" style="fill:var(--skin-epi)"/>`;
      if(hl)g+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1((12+20*by)*s)}" ry="${f1((12+18*by)*s)}" style="fill:none;stroke:var(--vas);stroke-width:2;stroke-dasharray:5 3"/>`}
    if(pp>0){g+=`<path d="M${P(4,44)}L${P(16,80)}L${P(34,70)}" style="fill:none;stroke:var(--ink);stroke-width:${f1(5*s)};stroke-linecap:round;stroke-linejoin:round;opacity:${f1(pp)}"/><g style="opacity:${f1(pp)}"><ellipse cx="${f1(x+30*s)}" cy="${f1(y+64*s)}" rx="${f1(13*s)}" ry="${f1(8*s)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/><circle cx="${f1(x+40*s)}" cy="${f1(y+60*s)}" r="${f1(5*s)}" style="fill:var(--skin-epi);stroke:var(--skin-line)"/></g>`}
    else g+=`<path d="M${P(4,44)}Q${P(10,72)} ${P(8,100)}" style="fill:none;stroke:var(--ink);stroke-width:${f1(5*s)};stroke-linecap:round"/>`;
    return g}
  function pelvis(x,y,s,gap){/* two iliac wings and the pubic symphysis, which widens */
    let g='';[-1,1].forEach(sd=>{const o=sd*gap/2;g+=`<path d="M${f1(x+o)} ${f1(y+18*s)}Q${f1(x+o+sd*8*s)} ${f1(y+4*s)} ${f1(x+o+sd*30*s)} ${f1(y-10*s)}Q${f1(x+o+sd*40*s)} ${f1(y+6*s)} ${f1(x+o+sd*26*s)} ${f1(y+24*s)}Q${f1(x+o+sd*12*s)} ${f1(y+30*s)} ${f1(x+o)} ${f1(y+18*s)}Z" style="fill:var(--bone);stroke:var(--bone-line);stroke-width:1.3"/>`});
    g+=`<line x1="${f1(x-gap/2)}" x2="${f1(x+gap/2)}" y1="${f1(y+20*s)}" y2="${f1(y+20*s)}" style="stroke:var(--variant);stroke-width:2"/>`;return g}

  function draw(t){const N=vb(svg,'720 380','400 640');const W=N?400:720;let s='';const w=wk(t);
    const rows=ROWS[ty];
    const x0=N?16:236,x1=W-(N?16:20),X=v=>x0+(v-W0)/(W1-W0)*(x1-x0);
    const bandY=N?268:46,rowY=N?308:92,rh=N?53:36;
    /* silhouette + type-specific tissue */
    const B=ease(ramp(w,6,40)),pp=ramp(w,40.3,41.5),hl=ty==='v'&&w>35&&w<46;
    if(N){s+=body(64,28,.95,B,pp,hl)}else s+=body(96,36,1.18,B,pp,hl);
    const tx=N?150:28,tyy=N?150:300;
    if(ty==='h'){const gp=lerp(3,14,ease(ramp(w,12,40)))*(1-.6*ramp(w,42,46));s+=pelvis(tx+(N?60:76),tyy+(N?12:2),N?1.2:1.3,gp);s+=`<text x="${tx+(N?60:76)}" y="${tyy+(N?60:56)}" class="t-xs t-mid">pelvic joints loosen</text>`}
    if(ty==='c'){const sk=skin(tx+(N?6:6),tyy+(N?4:-4),N?118:150,{h:N?40:44,scar:ramp(w,39,42),bruise:ramp(w,40,43)*.6});s+=sk.svg;s+=`<text x="${tx+(N?65:81)}" y="${tyy+(N?58:56)}" class="t-xs t-mid">skin: fragile, slow to heal</text>`}
    if(ty==='v'){const tr=ramp(w,36,41)*(w<46?1:0);s+=artery(tx+(N?6:6),tyy+(N?20:12),N?118:150,{r:13,media:13,thin:true,flow:t*6,tear:tr});s+=`<text x="${tx+(N?65:81)}" y="${tyy+(N?58:56)}" class="t-xs t-mid" style="fill:${tr>.2?'var(--vas)':'var(--muted)'}">thin-walled artery</text>`}
    /* readout */
    const ph=w<0?'Before pregnancy':w<14?'First trimester':w<28?'Second trimester':w<39.5?'Third trimester':w<41.2?'Labour and birth':'After birth';
    const wl=w<0?'Planning':w<=40?'Week '+Math.max(0,Math.round(w)):(Math.round(w-40))+' wk after birth';
    if(N){s+=`<text x="${W-16}" y="44" class="t-big t-end" style="font-size:24px">${wl}</text><text x="${W-16}" y="64" class="t-sm t-end">${ph.toUpperCase()}</text><text x="${W-16}" y="84" class="t-xs t-end">${{h:'hEDS / HSD',c:'classical EDS',v:'vascular EDS'}[ty]}</text>`}
    else{s+=`<text x="${x0}" y="24" class="t-big" style="font-size:22px">${wl}</text><text x="${x0+150}" y="24" class="t-sm">${ph.toUpperCase()} · ${{h:'hEDS / HSD',c:'CLASSICAL EDS',v:'VASCULAR EDS'}[ty]}</text>`}
    /* trimester bands */
    [[W0,0,'Plan','var(--panel-2)'],[0,14,'1st','var(--brand-soft)'],[14,28,'2nd','var(--accent-soft)'],[28,40,'3rd','var(--brand-soft)'],[40,W1,'After','var(--gold-soft)']].forEach(([a,b,l,c])=>{
      s+=`<rect x="${f1(X(a)+1)}" y="${bandY}" width="${f1(X(b)-X(a)-2)}" height="22" rx="5" style="fill:${c}"/><text x="${f1((X(a)+X(b))/2)}" y="${bandY+15}" class="t-xs t-mid" style="fill:var(--ink)">${l}</text>`});
    [0,14,28,40].forEach(v=>s+=`<text x="${f1(X(v))}" y="${bandY-4}" class="t-xs t-mid">${v}</text>`);
    s+=`<path d="M${f1(X(40))} ${bandY-2}l-5 -7h10z" style="fill:var(--accent)"/>`;
    /* rows or planning list */
    if(plan){const L=PLAN[ty],on=1;s+=`<rect x="${x0}" y="${rowY-8}" width="${x1-x0}" height="${rows.length*rh+4}" rx="10" style="fill:var(--panel-2)"/>`;
      s+=`<text x="${x0+12}" y="${rowY+10}" class="t-sm">BEFORE PREGNANCY · AS PUBLISHED</text>`;
      L.forEach((it,i)=>{const yy=rowY+26+i*((rows.length*rh-30)/L.length),vis=on;
        s+=`<circle cx="${x0+20}" cy="${f1(yy-4)}" r="7" style="fill:var(--accent);opacity:${f1(vis)}"/><path d="M${x0+16.5} ${f1(yy-4)}l2.5 2.5l4.5 -5" style="fill:none;stroke:var(--on-brand);stroke-width:1.6"/><text x="${x0+34}" y="${f1(yy)}" class="t-lbl" style="font-size:12.5px">${it}</text>`})}
    else rows.forEach((r,i)=>{const y=rowY+i*rh,act=w>=r.a&&w<=r.b,past=w>r.b,seen=w>=r.a;
      const col=ty==='v'&&i>=3?'var(--vas)':'var(--brand)';
      s+=`<text x="${x0}" y="${y+11}" class="t-lbl" style="font-size:12.5px;opacity:${seen?1:.55}">${r.l}</text>`;
      if(seen)s+=`<text x="${N?x0:x1}" y="${N?y+40:y+11}" class="t-xs${N?'':' t-end'}" style="fill:${act?'var(--ink)':'var(--muted)'}">${r.v}</text>`;
      s+=`<rect x="${f1(x0)}" y="${y+17}" width="${f1(x1-x0)}" height="${N?7:9}" rx="4" style="fill:var(--panel-2)"/>`;
      const fe=Math.min(w,r.b);if(fe>r.a||r.b-r.a<1.5)s+=`<rect x="${f1(X(r.a))}" y="${y+17}" width="${f1(Math.max(4,X(Math.max(fe,r.a+1))-X(r.a)))}" height="${N?7:9}" rx="4" style="fill:${col};opacity:${act?1:past?.45:.18}"/>`;
      else s+=`<rect x="${f1(X(r.a))}" y="${y+17}" width="${f1(X(r.b)-X(r.a))}" height="${N?7:9}" rx="4" style="fill:none;stroke:${col};stroke-dasharray:3 3;opacity:.5"/>`});
    /* cursor */
    const cx=X(w);if(!plan)s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${bandY-2}" y2="${rowY+rows.length*rh-6}" style="stroke:var(--ink);stroke-width:1.4;opacity:.55"/><circle cx="${f1(cx)}" cy="${bandY+11}" r="4" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);$('#prNote').innerHTML=noteHTML(STEPS[p]);setSt&&setSt(p);
  }
  const stop=playWire(rg,$('#prPlay'),draw,24000,'%t:player.replay%','pregnancy');
  function wire(){const old=$('#prSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS,rg,draw,stop)}
  $$('[data-prty]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.prty;$$('[data-prty]').forEach(x=>x.setAttribute('aria-pressed',x===b));STEPS=mk();wire();draw(+rg.value)}));
  $('#prPlan').addEventListener('click',()=>{plan=!plan;$('#prPlan').setAttribute('aria-pressed',plan);if(plan){stop();rg.value=STEPS[0].at}draw(+rg.value)});
  wire();draw(+rg.value);

  /* ---------- inheritance odds ---------- */
  const ps=$('#prPed');let mode='ad',hist=[],seed=7;let R=rng(seed);
  const MODE={
    ad:{fa:1,mo:0,pa:['V','v'],pm:['v','v'],kids:[1,1,0,0],pA:.5,pC:0,lab:'affected',
      note:{k:'Autosomal dominant',t:'1 in 2, every pregnancy',
       txt:`vEDS, cEDS and hEDS are autosomal dominant: each child of an affected parent has a 50% chance of inheriting the condition. [[Byers2025GeneReviews,Malfait2024GeneReviews,Hakim2024GeneReviews]] The chance is the same in every pregnancy; earlier children do not change it. About half of people diagnosed with vEDS, and about half with cEDS, have a new (de novo) variant, so a negative family history does not exclude them. [[Byers2025GeneReviews,Malfait2024GeneReviews]] Once the familial variant is known, prenatal and preimplantation testing are possible for vEDS and cEDS. [[Byers2025GeneReviews,Malfait2024GeneReviews]]`,
       pt:`Most EDS types pass from parent to child. Each child has a 1 in 2 chance. [[Byers2025GeneReviews,Hakim2024GeneReviews]]`,
       hook:`Around half of vEDS cases are de novo: a negative family history does not exclude vEDS. [[Byers2025GeneReviews]]`}},
    ar:{fa:.5,mo:.5,pa:['A','a'],pm:['A','a'],kids:[0,.5,.5,1],pA:.25,pC:.5,lab:'affected',
      note:{k:'Autosomal recessive',t:'1 in 4 when both parents carry',
       txt:`In the recessive types (kyphoscoliotic, classical-like, musculocontractural and others), when both parents carry one changed copy, each child has a 25% chance of being affected, 50% of being a carrier like the parents, and 25% of inheriting neither. [[RohrbachGR-kEDS,vanDijkGR-clEDS,KoshoGR-mcEDS]] Carriers usually have no signs. See <a href="#genes" data-go="genes">Inheritance &amp; genetic testing</a> and <a href="#types" data-go="types">The 13 types</a>.`,
       pt:`In the rarer recessive types, both parents usually carry the gene change without being affected. Each child then has a 1 in 4 chance.`,
       hook:`Recessive: 25% affected, 50% carriers, 25% neither, per pregnancy. [[RohrbachGR-kEDS]]`}},
    heds:{fa:1,mo:0,pa:['?','?'],pm:['?','?'],kids:[1,1,0,0],pA:.5,pC:0,lab:'affected',subtle:true,
      note:{k:'Hypermobile EDS',t:'A family history without a gene',
       txt:`hEDS is autosomal dominant and most people with it have an affected parent. Recognising that often needs a detailed history and examination of the parents, because the parent's signs may be subtle. No causal gene has been identified, so prenatal and preimplantation testing are not possible. [[Hakim2024GeneReviews]] <span class="ev early">Early evidence</span> Researchers are studying candidate genes such as KLK15; none is a diagnostic test. [[Gensemer2025KLK15]] The diagram's question marks stand for the unknown gene.`,
       pt:`Scientists are looking for the gene or genes behind hypermobile EDS. There is no gene test for it yet. [[Hakim2024GeneReviews,Gensemer2025KLK15]]`,
       hook:`No prenatal or preimplantation testing for hEDS: no causal gene is known. [[Hakim2024GeneReviews]]`}}};
  function drawP(){const M=MODE[mode],N=vb(ps,'720 330','400 540');const W=N?400:720;let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    /* pedigree */
    const ox=N?200:180,py=N?50:58,ky=N?160:170,r=N?14:15;
    s+=ped(ox-60,py,'m',M.fa,{r})+ped(ox+60,py,'f',M.mo,{r});
    s+=`<path d="M${ox-60+r} ${py}H${ox+60-r}M${ox} ${py}V${py+42}M${ox-120} ${py+42}H${ox+120}" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`;
    s+=`<text x="${ox-60}" y="${py-r-8}" class="t-xs t-mid">${M.pa.join(' ')}</text><text x="${ox+60}" y="${py-r-8}" class="t-xs t-mid">${M.pm.join(' ')}</text>`;
    if(M.subtle)s+=`<text x="${ox-60-r-6}" y="${py+4}" class="t-xs t-end">signs may be subtle</text>`;
    M.kids.forEach((a,i)=>{const kx=ox-120+i*80;s+=`<path d="M${kx} ${py+42}V${ky-r}" style="stroke:var(--ink);stroke-width:1.5"/>`+ped(kx,ky,i%2?'f':'m',a,{r});
      s+=`<text x="${kx}" y="${ky+r+16}" class="t-xs t-mid">${a>=1?'affected':a>0?'carrier':'unaffected'}</text>`});
    s+=`<text x="${ox}" y="${ky+r+36}" class="t-sm t-mid" style="fill:var(--ink)">expected in each pregnancy: ${Math.round(M.pA*100)}% affected${M.pC?` · ${Math.round(M.pC*100)}% carriers`:''}</text>`;
    /* Punnett square */
    const qx=N?110:470,qy=N?262:44,cs=N?60:62;
    s+=`<text x="${qx+cs}" y="${qy-8}" class="t-sm t-mid">${mode==='heds'?'gene unknown':'one copy from each parent'}</text>`;
    for(let i=0;i<2;i++){s+=`<text x="${qx-12}" y="${qy+22+i*cs+cs/2}" class="t-lbl t-mid">${M.pa[i]}</text><text x="${qx+cs/2+i*cs}" y="${qy+14}" class="t-lbl t-mid">${M.pm[i]}</text>`;
      for(let j=0;j<2;j++){const al=M.pa[i]+M.pm[j],aff=mode==='ar'?(al==='aa'?1:al==='AA'?0:.5):(mode==='heds'?(i===0?1:0):(M.pa[i]==='V'?1:0));
        s+=`<rect x="${qx+j*cs}" y="${qy+22+i*cs}" width="${cs-4}" height="${cs-4}" rx="6" style="fill:${aff>=1?'var(--variant)':aff>0?'var(--gold-soft)':'var(--panel-2)'};opacity:${aff>=1?.85:1}"/><text x="${qx+j*cs+cs/2-2}" y="${qy+22+i*cs+cs/2+3}" class="t-lbl t-mid" style="fill:${aff>=1?'#fff':'var(--ink)'}">${mode==='heds'?(aff?'aff.':'—'):al}</text>`}}
    /* simulation */
    const sy=N?430:252,sx=N?16:30,sw=W-(N?32:60);
    const n=hist.length,a=hist.filter(v=>v===1).length,c=hist.filter(v=>v===.5).length;
    s+=`<text x="${sx}" y="${sy-8}" class="t-sm">SIMULATED PREGNANCIES · ${n}</text>`;
    const per=N?14:24,last=hist.slice(-per*(N?2:1));last.forEach((v,i)=>{const row=Math.floor(i/per),col=i%per;s+=ped(sx+10+col*(N?26:27),sy+12+row*26,(i%2?'f':'m'),v,{r:8})});
    const by=sy+(N?72:40);s+=`<rect x="${sx}" y="${by}" width="${sw}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    if(n){s+=`<rect x="${sx}" y="${by}" width="${f1(sw*a/n)}" height="14" rx="7" style="fill:var(--variant)"/>`;
      if(c)s+=`<rect x="${f1(sx+sw*a/n)}" y="${by}" width="${f1(sw*c/n)}" height="14" style="fill:var(--gold-soft);stroke:var(--warn);stroke-width:.6"/>`}
    const ex=sx+sw*M.pA;s+=`<line x1="${f1(ex)}" x2="${f1(ex)}" y1="${by-6}" y2="${by+20}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(ex)}" y="${by+32}" class="t-xs t-mid">expected ${Math.round(M.pA*100)}%</text>`;
    ps.innerHTML=s;
    $('#prTally').innerHTML=`<span>Pregnancies <b>${n}</b></span><span>Affected <b>${a}</b>${n?` (${Math.round(a/n*100)}%)`:''}</span>${mode==='ar'?`<span>Carriers <b>${c}</b>${n?` (${Math.round(c/n*100)}%)`:''}</span>`:''}<span>Each pregnancy is independent: small runs wander, long runs settle near ${Math.round(M.pA*100)}%.</span>`;
    $('#prPedNote').innerHTML=noteHTML(M.note)}
  function sim(k){const M=MODE[mode];for(let i=0;i<k;i++){const u=R();hist.push(u<M.pA?1:u<M.pA+M.pC?.5:0)}drawP()}
  $('#prSim').addEventListener('click',()=>sim(1));$('#prSim20').addEventListener('click',()=>sim(20));
  $('#prReset').addEventListener('click',()=>{hist=[];R=rng(++seed);drawP()});
  $$('[data-prih]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.prih;$$('[data-prih]').forEach(x=>x.setAttribute('aria-pressed',x===b));hist=[];R=rng(++seed);drawP()}));
  drawP();
  {const pr=redraws.pregnancy;redraws.pregnancy=()=>{pr&&pr();drawP()}}
};
