/* =============== 3.2 Inhaled steroids, triple therapy & beyond =============== */
/* Main scene: a small airway with eosinophils in its wall (the kit's airway() plus eosinophil dots), a blood
   vessel carrying eosinophils, air sacs for the pneumonia step, tablets for the add-ons and antibodies for the
   biologics. The panel draws the published results for each step (research pass D). Everything outside the
   panel is schematic. Uses inhBars/inhCI/inhRows/inhNum from 3.1 (same builder, same script scope). */
const ESC_STEPS=[
 {from:0,at:.08,k:'Check the count',t:'Eosinophils predict who gains from ICS',
  txt:`In a secondary analysis of two fluticasone furoate/vilanterol trials (3177 people), adding the inhaled corticosteroid (ICS) cut exacerbations by 29% in people with blood eosinophils ≥2%, but by only 10% below 2% (P=0.28). The effect grew with the count: 24% at ≥2–<4%, 32% at 4–<6% and 42% at ≥6%, while the pneumonia increase did not depend on eosinophils [[Pascoe2015]]. GOLD 2023: "Adding ICS has little or no effect at a blood eosinophil count of &lt;100 cells/μl, whereas blood eosinophils ≥300 cells/μl identify patients with a strong likelihood of treatment benefit", with "a continuous gradation" in between [[Agusti2023]].`,
  pt:`A blood test counts a white blood cell called the eosinophil. People with more of them are more likely to be helped by a steroid inhaler [[Agusti2023,Pascoe2015]].`,
  hook:`GOLD 2023 eosinophil cut-offs: &lt;100 cells/µL little or no ICS benefit; ≥300 cells/µL strong likelihood of benefit [[Agusti2023]].`},
 {from:.16,at:.25,k:'Add the steroid',t:'Triple therapy for exacerbators',
  txt:`IMPACT randomised 10,355 people to once-daily single-inhaler fluticasone furoate/umeclidinium/vilanterol (triple), fluticasone furoate/vilanterol (FF/VI) or umeclidinium/vilanterol (UMEC/VI) for 52 weeks. Moderate-or-severe exacerbations were 0.91 per year with triple, 1.07 with FF/VI (rate ratio 0.85) and 1.21 with UMEC/VI (rate ratio 0.75) [[Lipson2018]]. ETHOS (8509 in the modified intention-to-treat population) found the same direction with budesonide/glycopyrrolate/formoterol [[Rabe2020]]. GOLD 2023: "The use of LABA + ICS in COPD is no longer encouraged. If there is an indication for an ICS, then LABA + LAMA + ICS has been shown to be superior to LABA + ICS and is therefore the preferred choice" [[Agusti2023]].`,
  pt:`For people who keep having flare-ups, one inhaler with three medicines (two airway openers and a steroid) cut flare-ups more than two medicines in trials [[Lipson2018,Rabe2020]].`,
  hook:`IMPACT: triple 0.91 vs UMEC/VI 1.21 moderate-or-severe exacerbations per year (rate ratio 0.75) [[Lipson2018]].`},
 {from:.33,at:.42,k:'Weigh the cost',t:'More pneumonia with ICS',
  txt:`Clinician-diagnosed pneumonia was more frequent with triple therapy than with UMEC/VI in IMPACT (HR 1.53; 95% CI 1.22 to 1.92) [[Lipson2018]]. In ETHOS, confirmed pneumonia occurred in 3.5–4.5% of the ICS-containing groups versus 2.3% with glycopyrrolate-formoterol [[Rabe2020]]. A Cochrane review found fluticasone raised serious pneumonia (OR 1.78), 18 more per 1000 treated over 18 months, without changing overall mortality [[Kew2014]]. The Trelegy label says "Physicians should remain vigilant for the possible development of pneumonia in patients with COPD as clinical features of pneumonia and exacerbations frequently overlap" [[FDA-Trelegy]].`,
  pt:`Steroid inhalers slightly raise the chance of pneumonia, a lung infection. That is one reason they are matched to the people most likely to benefit [[Kew2014,Agusti2023]].`,
  hook:`IMPACT pneumonia: triple vs UMEC/VI HR 1.53 [[Lipson2018]]. Fluticasone: 18 more serious pneumonias per 1000 over 18 months [[Kew2014]].`},
 {from:.5,at:.58,k:'Still flaring',t:'Roflumilast or azithromycin',
  txt:`GOLD 2023: for exacerbations despite triple therapy, or with eosinophils &lt;100 cells/µL, "the addition of roflumilast (particularly in patients with chronic bronchitis and an FEV1 &lt; 50% predicted) or a macrolide (particularly in patients who are not current smokers) may be considered" [[Agusti2023]]. In two 52-week trials (3091 people), roflumilast 500 µg daily gave 1.14 versus 1.37 moderate-or-severe exacerbations per patient-year (17% reduction) [[Calverley2009]]. Azithromycin 250 mg daily lengthened the median time to first exacerbation from 174 to 266 days and gave 1.48 versus 1.83 exacerbations per patient-year [[Albert2011]], with no benefit in current smokers (HR 0.99) [[Han2014]].`,
  pt:`If flare-ups keep happening, doctors may add a daily tablet (roflumilast) or a daily antibiotic (azithromycin) [[Agusti2023]].`,
  hook:`Roflumilast is not a bronchodilator; it is labelled for severe COPD with chronic bronchitis and prior exacerbations [[FDA-Daliresp]]. Azithromycin: hearing decrements 25% vs 20% [[Albert2011]].`},
 {from:.66,at:.75,k:'Type 2 COPD',t:'Biologics for eosinophils ≥300',
  txt:`In people on triple therapy with blood eosinophils ≥300/µL and a high exacerbation risk, dupilumab 300 mg every 2 weeks cut moderate-or-severe exacerbations to 0.78 versus 1.10 per year in BOREAS (rate ratio 0.70) [[Bhatt2023]] and 0.86 versus 1.30 in NOTUS (rate ratio 0.66) [[Bhatt2024]]. Mepolizumab 100 mg every 4 weeks gave 0.80 versus 1.01 in MATINEE (rate ratio 0.79) [[Sciurba2025]]. Dupilumab blocks IL-4Rα, shared by the IL-4 and IL-13 receptors [[FDA-Dupixent]]; mepolizumab blocks IL-5 from binding its receptor on eosinophils [[FDA-Nucala]]. No head-to-head trial exists [[Bhatt2023,Bhatt2024,Sciurba2025]].`,
  pt:`For some people with many eosinophils and repeated flare-ups, an injection that blocks one signal of allergic-type inflammation lowered flare-ups by about a fifth to a third [[Bhatt2023,Bhatt2024,Sciurba2025]].`,
  hook:`Dupilumab (anti-IL-4Rα) and mepolizumab (anti-IL-5): FDA-approved add-ons for COPD with an eosinophilic phenotype, in 2024 and 2025 [[FDA-Dupixent,FDA-Nucala]].`},
 {from:.83,at:.93,k:'Step down',t:'Withdrawing ICS when it is not needed',
  txt:`In WISDOM (2485 people with a history of exacerbations on tiotropium, salmeterol and fluticasone), stepwise fluticasone withdrawal over 12 weeks was noninferior for time to first moderate or severe exacerbation (HR 1.06; 95% CI 0.94 to 1.19; margin 1.20), but trough FEV1 fell 38 mL more by week 18 and 43 mL more by week 52 [[Magnussen2014]]. In SUNSET, people with ≥300 eosinophils/µL lost more lung function and had a higher exacerbation risk after withdrawal [[Chapman2018]]. The ERS 2020 guideline conditionally recommends "the withdrawal of ICS in patients with COPD without a history of frequent exacerbations", and strongly recommends "not to withdraw ICS in patients with blood eosinophil counts ≥300 eosinophils·µL-1" [[Chalmers2020]].`,
  pt:`Steroid inhalers can sometimes be stopped in people who rarely have flare-ups, but guidelines advise against stopping them when the eosinophil count is high [[Chalmers2020]].`,
  hook:`WISDOM: ICS withdrawal noninferior for first exacerbation (HR 1.06) but FEV1 about 40 mL lower [[Magnussen2014]]. ERS: do not withdraw at eosinophils ≥300/µL (strong) [[Chalmers2020]].`}
];
const ESC_TXT={
 ph:['Counting eosinophils','An inhaled steroid joins in','The pneumonia trade-off','Add-ons for repeated flare-ups','Antibodies for eosinophilic COPD','Stepping the steroid down'],
 phN:['Counting eosinophils','A steroid joins in','The pneumonia trade-off','Add-ons','Biologics','Stepping down'],
 sub:['blood eosinophils travel to the airway wall','ICS settles on the wall; inflammation quietens','ICS can let germs take hold in the air sacs','roflumilast tablet or daily azithromycin','an antibody blocks an eosinophil signal','fewer flare-ups: ICS may be withdrawn'],
 subN:['blood count to airway wall','ICS on the airway wall','germs in the air sacs','tablet or antibiotic','antibody on eosinophils','ICS withdrawn'],
 vessel:'blood vessel',eos:'eosinophil',airway:'small airway, cut across',sacs:'air sacs',
 lg:['eosinophil','inhaled steroid (ICS)','bacteria','antibody (biologic)'],
 roflu:'roflumilast',azi:'azithromycin',
 p0t:'Pascoe 2015: fewer exacerbations with ICS',p0s:'reduction, % (by blood eosinophils)',
 bands:['&lt;2%','2–&lt;4%','4–&lt;6%','≥6%'],
 p1t:'IMPACT: exacerbations per year',tri:'Triple',ffvi:'FF/VI',umvi:'UMEC/VI',p1n:'Triple vs UMEC/VI: rate ratio 0.75',
 p2t:'Pneumonia with an ICS',p2a:'IMPACT, triple vs UMEC/VI (HR)',p2b:'FLAME, % of people',lics:'LABA + ICS',dual:'LABA + LAMA',p2n:'ETHOS: 3.5–4.5% with ICS vs 2.3% without',
 p3t:'Add-ons: exacerbations per year',p3a:'Roflumilast trials (52 weeks)',p3b:'Azithromycin trial (1 year)',rof:'Roflumilast',az:'Azithromycin',pbo:'Placebo',
 p4t:'On top of triple: exacerbations per year',p4a:'BOREAS (dupilumab)',p4b:'NOTUS (dupilumab)',p4c:'MATINEE (mepolizumab)',dup:'Dupilumab',mep:'Mepolizumab',
 p5t:'WISDOM: stepwise ICS withdrawal',p5a:'First exacerbation, withdrawal (HR)',p5m:'margin 1.20',p5b:'Extra FEV1 fall with withdrawal',w18:'Week 18',w52:'Week 52',mL:'mL',
 p5n:'ERS: do not withdraw at ≥300/µL (strong)',
 /* eosinophil explorer */
 unitC:'cells/µL',unitP:'% of white cells',
 zones:['little or no effect','continuous gradation','strong likelihood of benefit'],
 axC:'blood eosinophils, cells/µL',axP:'blood eosinophils, % of white cells',
 baf:'Bafadhel 2018: rate ratio 0.75 from 100 cells/µL',bafN:'rate ratio 0.75 from 100',
 valC:v=>`${v} cells/µL`,valP:v=>`${(+v).toFixed(1)}%`,
 zoneHTML:[
  `<b>Below 100 cells/µL.</b> GOLD 2023: "Adding ICS has little or no effect at a blood eosinophil count of &lt;100 cells/μl" [[Agusti2023]]. In GOLD's follow-up flow, people with exacerbations on LABA + LAMA and eosinophils &lt;100 are pointed to roflumilast or a macrolide instead [[Agusti2023]].`,
  `<b>100 to 299 cells/µL.</b> GOLD 2023 describes "a continuous gradation" of ICS effect between 100 and 300 [[Agusti2023]]. In a pooled analysis of three budesonide-formoterol trials, the ICS reduced exacerbations from 100 cells/µL upward (rate ratio 0.75; 95% CI 0.57 to 0.99) [[Bafadhel2018]]. GOLD 2023 recommends escalation from LABA + LAMA to triple for people with exacerbations at ≥100 cells/µL [[Agusti2023]].`,
  `<b>300 cells/µL or more.</b> GOLD 2023: this level identifies "patients with a strong likelihood of treatment benefit", and starting triple therapy "can be considered" in Group E [[Agusti2023]]. The ERS guideline strongly recommends "not to withdraw ICS" at this level [[Chalmers2020]]. BOREAS, NOTUS and MATINEE enrolled people on triple therapy with ≥300/µL [[Bhatt2023,Bhatt2024,Sciurba2025]].`],
 pascoeHTML:[
  `<b>Below 2%.</b> Adding fluticasone furoate cut exacerbations by 10% (0.79 vs 0.89 per year), and the difference was not significant (P=0.28) [[Pascoe2015]].`,
  `<b>2% to under 4%.</b> Adding fluticasone furoate cut exacerbations by 24% [[Pascoe2015]].`,
  `<b>4% to under 6%.</b> Adding fluticasone furoate cut exacerbations by 32% [[Pascoe2015]].`,
  `<b>6% or more.</b> Adding fluticasone furoate cut exacerbations by 42% [[Pascoe2015]].`],
 pascoeNote:'Pascoe 2015 reported percentages, GOLD 2023 uses cells/µL; this guide does not convert between them.',
 /* pneumonia icon array */
 pnLbl:{flu:'Fluticasone: 18 more serious pneumonias per 1000 treated over 18 months',bud:'Budesonide: 6 more serious pneumonias per 1000 treated over 9 months'},
 pnExtra:'extra serious pneumonia',pnOther:'one of 1000 people treated',
 /* GOLD 2023 follow-up flow */
 now:'Now',trait:'Main problem',next:'GOLD 2023 wording',
 tx:{mono:'One long-acting bronchodilator (LABA or LAMA)',dual:'LABA + LAMA',lics:'LABA + ICS',triple:'LABA + LAMA + ICS (triple)'},
 tr:{dysp:'Breathlessness (dyspnoea)',exac:'Exacerbations'},
 eosT:{lo:'eosinophils &lt;100 cells/µL',mid:'eosinophils 100–299 cells/µL',hi:'eosinophils ≥300 cells/µL'},
 eosS:{lo:'eosinophils <100/µL',mid:'eosinophils 100–299/µL',hi:'eosinophils ≥300/µL'}
};
/* GOLD 2023 follow-up wording, quoted as published [[Agusti2023]]; k = verdict colour */
const ESC_Q={
 lics:{nx:'Triple preferred if an ICS is indicated',k:'maybe',q:`"The use of LABA + ICS in COPD is no longer encouraged. If there is an indication for an ICS, then LABA + LAMA + ICS has been shown to be superior to LABA + ICS and is therefore the preferred choice" [[Agusti2023]].`},
 dyspMono:{nx:'Step up to LABA + LAMA',k:'yes',q:`Persistent dyspnoea on one long-acting bronchodilator: "a step up to LABA + LAMA is recommended" [[Agusti2023]].`},
 dyspDual:{nx:'Review device, molecules, other causes',k:'maybe',q:`If LABA + LAMA does not relieve dyspnoea, "clinicians should consider switching inhaler device or molecules, as well as investigating and treating other causes of dyspnea" [[Agusti2023]].`},
 dyspTri:{nx:'No separate step in the quoted wording',k:'no',q:`The GOLD 2023 wording quoted in this guide's sources gives no separate dyspnoea step for people already on triple therapy. GOLD 2023 does say "ICS de-escalation can be considered if pneumonia or other considerable side effects develop" [[Agusti2023]].`},
 exMono:{nx:'Escalate to LABA + LAMA',k:'yes',q:`Exacerbations on monotherapy: "escalation to LABA + LAMA is recommended, except for patients with blood eosinophils ≥300 cells/μl, who may be escalated to LABA + LAMA + ICS" [[Agusti2023]].`},
 exMonoHi:{nx:'May escalate to LABA + LAMA + ICS',k:'yes',q:`Exacerbations on monotherapy: "escalation to LABA + LAMA is recommended, except for patients with blood eosinophils ≥300 cells/μl, who may be escalated to LABA + LAMA + ICS" [[Agusti2023]].`},
 exDual:{nx:'Escalate to LABA + LAMA + ICS',k:'yes',q:`Exacerbations on LABA + LAMA: "escalation to LABA + LAMA + ICS is recommended if they have blood eosinophils ≥100 cells/μl" [[Agusti2023]].`},
 exAdd:{nx:'Roflumilast or a macrolide may be considered',k:'maybe',q:`Exacerbations despite triple therapy, or with eosinophils &lt;100 cells/µL: "the addition of roflumilast (particularly in patients with chronic bronchitis and an FEV1 &lt; 50% predicted) or a macrolide (particularly in patients who are not current smokers) may be considered" [[Agusti2023]].`}
};
const ESC_BIO=`Since GOLD 2023 was written, the FDA approved dupilumab (2024-09-27) and mepolizumab (2025-05-22) as add-on maintenance treatment for adults with inadequately controlled COPD and an eosinophilic phenotype [[FDA-Dupixent,FDA-Nucala]]. Later GOLD reports are not quoted in this guide.`;
function escRule(tr,tx,eo){if(tx==='lics')return ESC_Q.lics;
  if(tr==='dysp')return tx==='mono'?ESC_Q.dyspMono:tx==='dual'?ESC_Q.dyspDual:ESC_Q.dyspTri;
  if(tx==='mono')return eo==='hi'?ESC_Q.exMonoHi:ESC_Q.exMono;
  if(tx==='dual')return eo==='lo'?ESC_Q.exAdd:ESC_Q.exDual;
  return ESC_Q.exAdd}
/* IMPACT / ETHOS explorer rows (research pass D) */
const ESC_COL={tri:'var(--ics)',tri2:'var(--ics-ink)',lics:'var(--gold)',dual:'var(--rx)'};
const ESC_TR={
 impact:{n:'IMPACT',
  exac:{rows:[{type:'pair',h:'Moderate or severe exacerbations per patient-year (52 weeks)',arms:[{l:'Triple',v:.91,c:'tri'},{l:'FF/VI',v:1.07,c:'lics'},{l:'UMEC/VI',v:1.21,c:'dual'}],mx:1.5,d:2},
    {type:'ci',h:'Triple vs UMEC/VI, rate ratio',est:.75,lo:.70,hi:.81,mn:.5,mx:1.2,ticks:[.5,1,1.2]},
    {type:'ci',h:'Triple vs FF/VI, rate ratio',est:.85,lo:.80,hi:.90,mn:.5,mx:1.2,ticks:[.5,1,1.2]},
    {type:'pair',h:'Severe exacerbations (hospitalisation) per patient-year',arms:[{l:'Triple',v:.13,c:'tri'},{l:'UMEC/VI',v:.19,c:'dual'}],mx:1.5,d:2}],
   out:`IMPACT compared three once-daily Ellipta inhalers in 10,355 people: fluticasone furoate/umeclidinium/vilanterol 100/62.5/25 µg (triple), FF/VI and UMEC/VI. Both comparisons on the primary end point had P&lt;0.001; severe exacerbations leading to hospitalisation had a rate ratio of 0.66 (95% CI 0.56 to 0.78) versus UMEC/VI [[Lipson2018,NCT02164513]].`},
  death:{rows:[{type:'pair',h:'Deaths, % of people (final vital-status analysis)',arms:[{l:'Triple',v:2.36,c:'tri'},{l:'FF/VI',v:2.64,c:'lics'},{l:'UMEC/VI',v:3.19,c:'dual'}],mx:4,u:'%',d:2},
    {type:'ci',h:'Death, triple vs UMEC/VI (HR)',est:.72,lo:.53,hi:.99,mn:.3,mx:1.5,ticks:[.3,1,1.5]},
    {type:'ci',h:'Death, triple vs FF/VI (HR)',est:.89,lo:.67,hi:1.16,mn:.3,mx:1.5,ticks:[.3,1,1.5]}],
   out:`With vital status for 99.6% of 10,355 people, there were 98 deaths (2.36%) with triple, 109 (2.64%) with FF/VI and 66 (3.19%) with UMEC/VI. This was a secondary analysis, and the extra vital-status collection was done post hoc <span class="ev early">Early evidence</span> [[Lipson2020]]. A published exchange asked whether the result was "Confounded by Asthma?" (the title of the authors' reply) [[Lipson2020Reply]].`},
  pneu:{rows:[{type:'ci',h:'Clinician-diagnosed pneumonia, triple vs UMEC/VI (HR)',est:1.53,lo:1.22,hi:1.92,mn:.5,mx:2.5,ticks:[.5,1,2.5],col:'var(--bad)'}],
   out:`Pneumonia was more frequent with the ICS-containing triple inhaler than with the LAMA/LABA inhaler (HR 1.53; 95% CI 1.22 to 1.92). The research pass gives no arm percentages for IMPACT pneumonia, so only the hazard ratio is drawn [[Lipson2018]].`}},
 ethos:{n:'ETHOS',
  exac:{rows:[{type:'pair',h:'Moderate or severe exacerbations per patient-year (52 weeks)',arms:[{l:'Triple, bud 320',v:1.08,c:'tri'},{l:'Triple, bud 160',v:1.07,c:'tri2'},{l:'GLY/FOR',v:1.42,c:'dual'},{l:'BUD/FOR',v:1.24,c:'lics'}],mx:1.6,d:2},
    {type:'ci',h:'Triple (bud 320) vs GLY/FOR, rate ratio',est:.76,lo:.69,hi:.83,mn:.5,mx:1.2,ticks:[.5,1,1.2]},
    {type:'ci',h:'Triple (bud 320) vs BUD/FOR, rate ratio',est:.87,lo:.79,hi:.95,mn:.5,mx:1.2,ticks:[.5,1,1.2]}],
   out:`ETHOS gave people with at least one exacerbation in the past year twice-daily budesonide 320 or 160 µg with glycopyrrolate 18 µg and formoterol 9.6 µg (triple), glycopyrrolate-formoterol (GLY/FOR) or budesonide-formoterol (BUD/FOR). The 160 µg triple gave rate ratios of 0.75 and 0.86 [[Rabe2020,NCT02465567]].`},
  death:{rows:[{type:'ci',h:'Death, triple (bud 320) vs GLY/FOR (HR)',est:.51,lo:.33,hi:.80,mn:.2,mx:1.5,ticks:[.2,1,1.5]},
    {type:'ci',h:'Death, triple (bud 320) vs BUD/FOR (HR)',est:.72,lo:.44,hi:1.16,mn:.2,mx:1.5,ticks:[.2,1,1.5]},
    {type:'pair',h:'Cardiovascular deaths, % of people',arms:[{l:'Triple, bud 320',v:.5,c:'tri'},{l:'Triple, bud 160',v:.8,c:'tri2'},{l:'GLY/FOR',v:1.4,c:'dual'},{l:'BUD/FOR',v:.5,c:'lics'}],mx:2,u:'%',d:1}],
   out:`In the final retrieved dataset (vital status for 99.6%), the budesonide 320 µg triple lowered the risk of death versus GLY/FOR (unadjusted P=0.0035) but not significantly versus BUD/FOR. The 160 µg triple did not significantly reduce death versus either comparator <span class="ev early">Early evidence</span> [[Martinez2021]].`},
  pneu:{rows:[{type:'range',h:'Confirmed pneumonia, % of people in the ICS-containing groups',lo:3.5,hi:4.5,mn:0,mx:6,u:'%',ticks:[0,2,4,6],col:'var(--ics)'},
    {type:'pair',h:'Confirmed pneumonia without an ICS, % of people',arms:[{l:'GLY/FOR',v:2.3,c:'dual'}],mx:6,u:'%',d:1}],
   out:`Confirmed pneumonia occurred in 3.5–4.5% of the three ICS-containing groups and 2.3% with glycopyrrolate-formoterol [[Rabe2020]].`}}
};
inits.escalation=()=>{
  const svg=$('#escSvg'),rg=$('#escT'),note=$('#escNote');
  function S(t){return {ics:ramp(t,.18,.26)*(1-ramp(t,.86,.94)),bio:ramp(t,.68,.76),bact:bump(t,.34,.5),pill:bump(t,.51,.66),cnt:ramp(t,.01,.12)}}
  function yab(x,y,op){return op<=.01?'':`<path d="M${f1(x)} ${f1(y+7)}V${f1(y)}l-5 -6M${f1(x)} ${f1(y)}l5 -6" style="fill:none;stroke:var(--rx);stroke-width:2.2;stroke-linecap:round;opacity:${f1(op)}"/>`}
  function eosC(x,y,r,op){return op<=.01?'':`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--eos);stroke:var(--ink);stroke-width:.6;opacity:${f1(op)}"/><circle cx="${f1(x-r*.35)}" cy="${f1(y)}" r="${f1(r*.32)}" style="fill:var(--nucleus);opacity:${f1(op)}"/><circle cx="${f1(x+r*.35)}" cy="${f1(y)}" r="${f1(r*.32)}" style="fill:var(--nucleus);opacity:${f1(op)}"/>`}
  function panel(p,t,x,y,w,N){const g=ramp(t,ESC_STEPS[p].from+.02,ESC_STEPS[p].from+.1),lw=N?100:104;
    let s=`<rect x="${f1(x-10)}" y="${f1(y-22)}" width="${f1(w+20)}" height="${N?252:226}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    const T=(txt,yy,c)=>`<text x="${x}" y="${f1(yy)}" class="${c||'t-sm'}"${c==='t-lbl'?'':' style="fill:var(--ink)"'}>${txt}</text>`,H=(txt,yy)=>`<text x="${x}" y="${f1(yy)}" class="t-sm">${txt}</text>`;
    const B=(items,yy,mx,bh)=>inhBars(x,yy,w,items,{mx,g,lw,bh:bh||13,gap:5}).svg;
    if(p===0){s+=T(ESC_TXT.p0t,y,'t-lbl')+H(ESC_TXT.p0s,y+20);
      s+=B([10,24,32,42].map((v,i)=>({l:ESC_TXT.bands[i],v,col:'var(--ics)',t:v+'%'})),y+30,50,16)}
    else if(p===1){s+=T(ESC_TXT.p1t,y,'t-lbl');
      s+=B([{l:ESC_TXT.tri,v:.91,col:ESC_COL.tri,t:'0.91'},{l:ESC_TXT.ffvi,v:1.07,col:ESC_COL.lics,t:'1.07'},{l:ESC_TXT.umvi,v:1.21,col:ESC_COL.dual,t:'1.21'}],y+16,1.4,18);
      s+=T(ESC_TXT.p1n,y+100)}
    else if(p===2){s+=T(ESC_TXT.p2t,y,'t-lbl')+H(ESC_TXT.p2a,y+20);
      s+=inhCI(x,y+42,w,{mn:.5,mx:2.5,est:1.53,lo:1.22,hi:1.92,ref:1,ticks:[.5,1,2.5],txt:'1.53',col:'var(--bad)',g});
      s+=H(ESC_TXT.p2b,y+96)+B([{l:ESC_TXT.lics,v:4.8,col:ESC_COL.lics,t:'4.8%'},{l:ESC_TXT.dual,v:3.2,col:ESC_COL.dual,t:'3.2%'}],y+104,6);
      s+=T(ESC_TXT.p2n,y+158)}
    else if(p===3){s+=T(ESC_TXT.p3t,y,'t-lbl')+H(ESC_TXT.p3a,y+20);
      s+=B([{l:ESC_TXT.rof,v:1.14,col:'var(--rx)',t:'1.14'},{l:ESC_TXT.pbo,v:1.37,col:'var(--muted)',t:'1.37'}],y+28,2);
      s+=H(ESC_TXT.p3b,y+86)+B([{l:ESC_TXT.az,v:1.48,col:'var(--rx)',t:'1.48'},{l:ESC_TXT.pbo,v:1.83,col:'var(--muted)',t:'1.83'}],y+94,2)}
    else if(p===4){s+=T(ESC_TXT.p4t,y,'t-lbl');
      [[ESC_TXT.p4a,ESC_TXT.dup,.78,1.10],[ESC_TXT.p4b,ESC_TXT.dup,.86,1.30],[ESC_TXT.p4c,ESC_TXT.mep,.80,1.01]].forEach((r,i)=>{const yy=y+20+i*58;
        s+=H(r[0],yy)+B([{l:r[1],v:r[2],col:'var(--rx)',t:inhNum(r[2])},{l:ESC_TXT.pbo,v:r[3],col:'var(--muted)',t:inhNum(r[3])}],yy+7,1.5,12)})}
    else{s+=T(ESC_TXT.p5t,y,'t-lbl')+H(ESC_TXT.p5a,y+20);
      const x0=x+8,x1=x+w-14,X=v=>lerp(x0,x1,(v-.8)/(1.3-.8));
      s+=inhCI(x,y+42,w,{mn:.8,mx:1.3,est:1.06,lo:.94,hi:1.19,ref:1,ticks:[.8,1,1.3],txt:'1.06',col:'var(--ics)',g});
      s+=`<line x1="${f1(X(1.2))}" x2="${f1(X(1.2))}" y1="${f1(y+32)}" y2="${f1(y+56)}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:4 3"/><text x="${f1(X(1.2)-4)}" y="${f1(y+28)}" class="t-xs t-end" style="fill:var(--bad)">${ESC_TXT.p5m}</text>`;
      s+=H(ESC_TXT.p5b,y+100)+B([{l:ESC_TXT.w18,v:38,col:'var(--ics)',t:'38 '+ESC_TXT.mL},{l:ESC_TXT.w52,v:43,col:'var(--ics)',t:'43 '+ESC_TXT.mL}],y+108,50);
      s+=T(ESC_TXT.p5n,y+162)}
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 790'),st=S(t),p=phaseOf(ESC_STEPS,t);
    const L=N?{tx:16,ty:26,vx:16,vy:62,vw:368,ax:120,ay:230,ar:62,sx:306,sy:248,ss:96,dx:300,dy:136,lx:24,ly:372,lc:2,px:24,py:478,pw:352}
             :{tx:20,ty:28,vx:20,vy:62,vw:320,ax:130,ay:236,ar:66,sx:300,sy:252,ss:96,dx:300,dy:140,lx:380,ly:58,lc:1,px:378,py:166,pw:322};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="fill:var(--rx)">${(N?ESC_TXT.phN:ESC_TXT.ph)[p]}</text><text x="${L.tx}" y="${L.ty+17}" class="t-sm">${(N?ESC_TXT.subN:ESC_TXT.sub)[p]}</text>`;
    /* blood vessel with flowing red cells and eosinophils */
    const vy=L.vy+10;s+=`<rect x="${L.vx}" y="${vy}" width="${L.vw}" height="26" rx="13" style="fill:var(--o2-soft);stroke:var(--blood);stroke-width:1.2"/>`;
    for(let i=0;i<12;i++){const u=((i/12)+t*2.2)%1,px=L.vx+14+u*(L.vw-28);
      s+=i%4===1?eosC(px,vy+13,6,.95):`<ellipse cx="${f1(px)}" cy="${f1(vy+13)}" rx="6" ry="4.4" style="fill:var(--blood);opacity:.75"/>`}
    s+=`<text x="${L.vx+L.vw}" y="${vy-5}" class="t-xs t-end">${ESC_TXT.vessel}</text>`;
    /* eosinophils leaving the vessel toward the airway (step 1) */
    if(p===0){for(let i=0;i<3;i++){const u=ramp(t,.02+i*.03,.12+i*.03);if(u>0&&u<1)s+=eosC(lerp(L.vx+60+i*70,L.ax+(i-1)*30,u),lerp(vy+30,L.ay-L.ar*.7,u),5,1)}}
    /* the airway, with eosinophils in its wall */
    const eo=clamp(1-.45*st.ics-.4*st.bio);
    const A=airway(L.ax,L.ay,L.ar,{wall:.55,inflam:.15+.3*eo,squeeze:.3,tether:.8,ph:t*10,seed:5});
    s+=A.svg;const R=rng(13);
    for(let i=0;i<9;i++){const a=R()*Math.PI*2,d=lerp(A.lumen+L.ar*.14,L.ar*.86,R()),ex=L.ax+Math.cos(a)*d,ey=L.ay+Math.sin(a)*d,op=clamp(st.cnt*1.2)*clamp(eo*1.6-i*.08);
      s+=eosC(ex,ey,5,op);s+=yab(ex+7,ey-6,st.bio*op*1.4)}
    /* ICS particles drifting onto the wall */
    if(st.ics>.01){const Q=rng(21);for(let i=0;i<16;i++){const a=Q()*Math.PI*2,u=(Q()+t*3)%1,d=L.ar*lerp(1.5,.9,u);
      s+=`<circle cx="${f1(L.ax+Math.cos(a)*d)}" cy="${f1(L.ay+Math.sin(a)*d)}" r="2.6" style="fill:var(--ics);opacity:${f1(st.ics*(.4+.6*u))}"/>`}}
    s+=`<text x="${L.ax}" y="${f1(L.ay+L.ar*1.45+16)}" class="t-xs t-mid">${ESC_TXT.airway}</text>`;
    /* air sacs, with bacteria in the pneumonia step */
    const V=alveoli(L.sx,L.sy,L.ss,{cap:true,ph:t*6,seed:4});s+=`<g style="opacity:${f1(.35+.65*st.bact)}">${V.svg}</g>`;
    if(st.bact>.01){const Q=rng(31);for(let i=0;i<10;i++){const a=Q()*Math.PI*2,d=Q()*L.ss*.32;
      s+=`<rect x="${f1(L.sx+Math.cos(a)*d-4)}" y="${f1(L.sy+Math.sin(a)*d-2)}" width="8" height="4" rx="2" style="fill:var(--bact);opacity:${f1(st.bact)}"/>`}}
    s+=`<text x="${L.sx}" y="${f1(L.sy+L.ss*.5+14)}" class="t-xs t-mid">${ESC_TXT.sacs}</text>`;
    /* add-on tablets (step 4) */
    if(st.pill>.01){s+=`<g style="opacity:${f1(st.pill)}"><rect x="${L.dx-40}" y="${L.dy-8}" width="26" height="14" rx="7" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.4"/><text x="${L.dx-27}" y="${L.dy+20}" class="t-xs t-mid">${ESC_TXT.roflu}</text>`+
      `<rect x="${L.dx+14}" y="${L.dy-8}" width="30" height="14" rx="7" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.4"/><line x1="${L.dx+29}" x2="${L.dx+29}" y1="${L.dy-8}" y2="${L.dy+6}" style="stroke:var(--rx)"/><text x="${L.dx+29}" y="${L.dy+32}" class="t-xs t-mid">${ESC_TXT.azi}</text></g>`}
    /* legend */
    ESC_TXT.lg.forEach((l,i)=>{const col=L.lc===2?i%2:0,row=L.lc===2?Math.floor(i/2):i,lx=L.lx+col*180,ly=L.ly+row*20;
      const ic=i===0?eosC(lx+6,ly-4,5,1):i===1?`<circle cx="${lx+6}" cy="${ly-4}" r="3.4" style="fill:var(--ics)"/>`:i===2?`<rect x="${lx+2}" y="${ly-6}" width="8" height="4" rx="2" style="fill:var(--bact)"/>`:yab(lx+6,ly-6,1);
      s+=ic+`<text x="${lx+18}" y="${ly}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    s+=panel(p,t,L.px,L.py,L.pw,N);
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(ESC_STEPS[p]);
  }
  const stop=playWire(rg,$('#escPlay'),draw,24000,'%t:player.replay%','escalation');
  const setSt=stepWire($('#escSteps'),ESC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- eosinophil explorer ---- */
  const esvg=$('#escEosSvg'),erg=$('#escEosR'),eout=$('#escEosOut'),eval_=$('#escEosVal'),ebtn=$('#escUnit');let unit='c';
  function drawEos(){const N=NARROW(),v=+erg.value,W=N?400:720,H=N?250:220,x0=N?24:60,x1=W-(N?20:40),y0=46,y1=H-62;
    esvg.setAttribute('viewBox',`0 0 ${W} ${H}`);let s='';
    if(unit==='c'){const X=c=>lerp(x0,x1,c/600);
      s+=`<rect x="${f1(X(0))}" y="${y0}" width="${f1(X(100)-X(0))}" height="${y1-y0}" style="fill:var(--panel-2)"/>`;
      s+=`<defs><linearGradient id="escGr" x1="0" x2="1"><stop offset="0" style="stop-color:var(--ics-soft);stop-opacity:.3"/><stop offset="1" style="stop-color:var(--ics);stop-opacity:.55"/></linearGradient></defs>`;
      s+=`<rect x="${f1(X(100))}" y="${y0}" width="${f1(X(300)-X(100))}" height="${y1-y0}" style="fill:url(#escGr)"/>`;
      s+=`<rect x="${f1(X(300))}" y="${y0}" width="${f1(X(600)-X(300))}" height="${y1-y0}" style="fill:var(--ics);opacity:.6"/>`;
      [[0,100],[100,300],[300,600]].forEach(([a,b],i)=>{const W2=wrapT((X(a)+X(b))/2,y0+22,ESC_TXT.zones[i],N?10:14,{cls:'t-xs',anchor:'middle',lh:12,style:'fill:var(--ink);font-weight:600'});s+=W2.svg});
      s+=`<line x1="${f1(X(100))}" x2="${f1(X(600))}" y1="${y1-14}" y2="${y1-14}" style="stroke:var(--ics-ink);stroke-width:2" marker-end="url(#escArr)"/>`;
      s+=`<defs>${marker('escArr','var(--ics-ink)',6)}</defs><text x="${f1(X(100)+4)}" y="${y1-20}" class="t-xs" style="fill:var(--ics-ink);paint-order:stroke;stroke:var(--panel);stroke-width:3">${N?ESC_TXT.bafN:ESC_TXT.baf}</text>`;
      s+=axes(x0,y0,x1-x0,y1-y0,{xt:[0,100,300,600].map(c=>[c/600,String(c)]),yt:[],grid:false});
      s+=`<text x="${x1}" y="${y1+30}" class="t-xs t-end">${ESC_TXT.axC}</text>`;
      const mx=X(v);s+=`<line x1="${f1(mx)}" x2="${f1(mx)}" y1="${y0-6}" y2="${y1}" style="stroke:var(--ink);stroke-width:2"/>`+chip(clamp(mx,x0+40,x1-40),y0-16,ESC_TXT.valC(v),{anchor:'middle',col:'var(--ink)',size:11});
      const z=v<100?0:v<300?1:2;eout.innerHTML=ESC_TXT.zoneHTML[z];eval_.textContent=ESC_TXT.valC(v)}
    else{const X=c=>lerp(x0,x1,c/10),Y=r=>lerp(y1,y0+16,r/50),B=[[0,2,10],[2,4,24],[4,6,32],[6,10,42]];const z=v<2?0:v<4?1:v<6?2:3;
      B.forEach(([a,b,r],i)=>{s+=`<rect x="${f1(X(a)+2)}" y="${f1(Y(r))}" width="${f1(X(b)-X(a)-4)}" height="${f1(y1-Y(r))}" rx="3" style="fill:var(--ics);opacity:${i===z?.95:.35}"/>`;
        s+=`<text x="${f1((X(a)+X(b))/2)}" y="${f1(Y(r)-5)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3">${r}%</text>`});
      s+=axes(x0,y0,x1-x0,y1-y0,{xt:[0,2,4,6,10].map(c=>[c/10,c+'%']),yt:[],grid:false});
      s+=`<text x="${x1}" y="${y1+30}" class="t-xs t-end">${ESC_TXT.axP}</text>`;
      const mx=X(v);s+=`<line x1="${f1(mx)}" x2="${f1(mx)}" y1="${y0-6}" y2="${y1}" style="stroke:var(--ink);stroke-width:2"/>`+chip(clamp(mx,x0+30,x1-30),y0-16,ESC_TXT.valP(v),{anchor:'middle',col:'var(--ink)',size:11});
      eout.innerHTML=ESC_TXT.pascoeHTML[z]+`<br><small>${ESC_TXT.pascoeNote}</small>`;eval_.textContent=ESC_TXT.valP(v)}
    esvg.innerHTML=s;erg.setAttribute('aria-valuetext',eval_.textContent)}
  function setUnit(u){unit=u;$$('[data-unit]',ebtn).forEach(b=>b.setAttribute('aria-pressed',b.dataset.unit===u));
    if(u==='c'){erg.min=0;erg.max=600;erg.step=10;erg.value=150}else{erg.min=0;erg.max=10;erg.step=.1;erg.value=3}drawEos()}
  ebtn.addEventListener('click',e=>{const b=e.target.closest('[data-unit]');if(b)setUnit(b.dataset.unit)});
  erg.addEventListener('input',drawEos);setUnit('c');

  /* ---- IMPACT / ETHOS explorer ---- */
  const tsvg=$('#escTrSvg'),tout=$('#escTrOut');let tr='impact',me='exac',stopT=null;
  function drawTr(g){const V=ESC_TR[tr][me],N=NARROW(),R=inhRows(V.rows,N,g,ESC_COL);tsvg.setAttribute('viewBox',`0 0 ${N?400:720} ${R.h}`);tsvg.innerHTML=R.svg;
    tsvg.setAttribute('aria-label',ESC_TR[tr].n+': '+V.rows.map(r=>r.h).join('; '))}
  function showTr(){$$('[data-etr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.etr===tr));$$('[data-eme]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.eme===me));
    tout.innerHTML=ESC_TR[tr][me].out;stopT&&stopT();stopT=animate(700,drawTr)}
  $('#escTrBtns').addEventListener('click',e=>{const b=e.target.closest('[data-etr],[data-eme]');if(!b)return;if(b.dataset.etr)tr=b.dataset.etr;if(b.dataset.eme)me=b.dataset.eme;showTr()});
  showTr();

  /* ---- pneumonia icon array ---- */
  const psvg=$('#escPnSvg'),pout=$('#escPnOut');let pk='flu';
  function drawPn(){const N=NARROW(),n=pk==='flu'?18:6,cols=N?40:50,cs=N?9:13,r=N?3.2:4.6,x0=N?20:35,y0=14,rows=1000/cols;
    psvg.setAttribute('viewBox',`0 0 ${N?400:720} ${f1(y0+rows*cs+40)}`);let s='';
    for(let i=0;i<1000;i++){const c=i%cols,rr=Math.floor(i/cols),hit=i>=1000-n;
      s+=`<circle cx="${f1(x0+c*cs+cs/2)}" cy="${f1(y0+rr*cs+cs/2)}" r="${r}" style="fill:${hit?'var(--bad)':'var(--panel-2)'};${hit?'':'stroke:var(--line);stroke-width:.6'}"/>`}
    const ly=y0+rows*cs+22;s+=`<circle cx="${x0+6}" cy="${f1(ly-4)}" r="${r}" style="fill:var(--bad)"/><text x="${x0+16}" y="${f1(ly)}" class="t-xs" style="fill:var(--ink)">${ESC_TXT.pnExtra}</text>`;
    s+=`<circle cx="${x0+(N?190:250)}" cy="${f1(ly-4)}" r="${r}" style="fill:var(--panel-2);stroke:var(--line)"/><text x="${x0+(N?200:260)}" y="${f1(ly)}" class="t-xs" style="fill:var(--ink)">${ESC_TXT.pnOther}</text>`;
    psvg.innerHTML=s;psvg.setAttribute('aria-label',ESC_TXT.pnLbl[pk]);pout.textContent=ESC_TXT.pnLbl[pk];
    $$('[data-pn]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pn===pk))}
  $('#escPnBtns').addEventListener('click',e=>{const b=e.target.closest('[data-pn]');if(b){pk=b.dataset.pn;drawPn()}});
  drawPn();

  /* ---- GOLD 2023 follow-up flow (teaching tool) ---- */
  const fsvg=$('#escFlowSvg'),fout=$('#escFlowOut'),fT=$('#escFTr'),fX=$('#escFTx'),fE=$('#escFEo');
  function drawFlow(){const N=NARROW(),tr=fT.value,tx=fX.value,eo=fE.value,Q=escRule(tr,tx,eo);
    const kc={yes:'var(--good)',maybe:'var(--warn)',no:'var(--muted)'}[Q.k];
    const box=(x,y,w,h,ttl,body,col,mx)=>{const W=wrapT(x+12,y+40,body,mx,{cls:'t-sm',lh:14,style:'fill:var(--ink)'});
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:${col};stroke-width:2"/><text x="${x+12}" y="${y+20}" class="t-xs" style="fill:${col};font-weight:700;letter-spacing:.08em">${ttl.toUpperCase()}</text>`+W.svg};
    const trTxt=ESC_TXT.tr[tr]+(tr==='exac'?' · '+ESC_TXT.eosS[eo]:'');let s=`<defs>${marker('escFA','var(--muted)',7)}</defs>`;
    if(N){fsvg.setAttribute('viewBox','0 0 400 330');const bw=340,bx=30,bh=84;
      s+=box(bx,10,bw,bh,ESC_TXT.now,ESC_TXT.tx[tx],'var(--rx)',44)+box(bx,122,bw,bh,ESC_TXT.trait,trTxt,'var(--ics-ink)',44)+box(bx,234,bw,bh,ESC_TXT.next,Q.nx,kc,44);
      s+=`<path d="M200 96V118" style="stroke:var(--muted);stroke-width:2" marker-end="url(#escFA)"/><path d="M200 208V230" style="stroke:var(--muted);stroke-width:2" marker-end="url(#escFA)"/>`}
    else{fsvg.setAttribute('viewBox','0 0 720 112');const bw=210,bh=92;
      s+=box(10,10,bw,bh,ESC_TXT.now,ESC_TXT.tx[tx],'var(--rx)',27)+box(255,10,bw,bh,ESC_TXT.trait,trTxt,'var(--ics-ink)',27)+box(500,10,bw,bh,ESC_TXT.next,Q.nx,kc,27);
      s+=`<path d="M222 56H251" style="stroke:var(--muted);stroke-width:2" marker-end="url(#escFA)"/><path d="M467 56H496" style="stroke:var(--muted);stroke-width:2" marker-end="url(#escFA)"/>`}
    fsvg.innerHTML=s;fsvg.setAttribute('aria-label',`${ESC_TXT.tx[tx]}; ${trTxt}; ${Q.nx}`);
    fout.className='verdict '+Q.k;fout.innerHTML=Q.q+(tr==='exac'&&tx==='triple'&&eo==='hi'?`<br><br>${ESC_BIO}`:'');
    fE.disabled=(tr==='dysp'||tx==='lics')}
  [fT,fX,fE].forEach(el=>el.addEventListener('change',drawFlow));drawFlow();

  const prev=redraws.escalation;redraws.escalation=()=>{prev&&prev();drawEos();drawTr(1);drawPn();drawFlow()};
};
