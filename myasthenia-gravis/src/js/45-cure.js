/* =============== 4.5 Toward a cure =============== */
/* The chain the module animates: node index = position s along it (0 thymus ... 5 complement, 6 the junction) */
const CUR_NODES=[
 {n:'Thymus',sub:'tolerance breaks'},{n:'T helper',sub:'helps B cells'},{n:'B cell',sub:'CD19 · CD20'},
 {n:'Plasma cell',sub:'BCMA · CD38'},{n:'IgG',sub:'recycled by FcRn'},{n:'Complement',sub:'C5 → MAC'}];
/* lvl: est | early | hyp. mode: ctrl (cut again with each dose), course (one course), reset (deep cut, naive
   cells return), once (surgery), spec (antigen-specific). eff: share of the flow a full cut stops (schematic). */
const CUR_R=[
 {id:'none',n:'No cut',lvl:null,cuts:[],mode:'none',eff:0,what:'No treatment: activation signals and antibodies run the whole chain to the junction.'},
 {id:'comp',n:'Complement inhibitors',lvl:'est',tag:'CONTROL, NOT CURE',cuts:[{s:5.5,k:'link'}],mode:'ctrl',eff:0,
  what:'Blocks complement from building the membrane attack complex at the junction. Antibodies still bind.',
  ev:`C5 inhibition stops C5 cleavage and so prevents the membrane attack complex. [[Howard2018]] Eculizumab, ravulizumab and zilucoplan are covered in <a href="#biologics" data-go="biologics">Complement &amp; FcRn inhibitors</a>. Newer agents: in NIMBLE (284 randomised) the C5 siRNA cemdisiran improved MG-ADL by 2.3 points more than placebo at week 24, and the combination with pozelimab by 1.7. In PREVAIL (260 randomised) once-weekly gefurulimab improved MG-ADL by 1.6 and QMG by 2.1 more than placebo, with no meningococcal infections reported. [[Vu2026b,Gwathmey2026]]`,
  neg:`Iptacopan, an oral factor B inhibitor, is in a phase 3 with no results expected before 2027. <b>Correction:</b> no MG trial of the C1s inhibitor riliprubart was found in PubMed or ClinicalTrials.gov on 20 October 2026. [[CTIptacopan,DSa2024]]`,
  st:`<span class="ev est">Established</span> as control, achieved only while dosing continues. Iptacopan and C1s inhibition in MG: <span class="ev hyp">Hypothesis</span>. [[Vu2026b,Gwathmey2026,CTIptacopan]]`},
 {id:'fcrn',n:'FcRn blockers',lvl:'est',tag:'CONTROL, NOT CURE',cuts:[{s:4,k:'node'}],mode:'ctrl',eff:.72,
  what:'Blocks FcRn, the receptor that recycles IgG, so IgG is cleared faster. Plasma cells keep making it.',
  ev:`FcRn rescues IgG from breakdown inside cells. Blocking it lowered IgG by about 75% in healthy volunteers, and IgG returned to baseline about 8 weeks after the last dose. [[Pyzik2019,Ulrichts2018]] Nipocalimab (Vivacity-MG3) improved MG-ADL by 1.45 points more than placebo and was FDA-approved in April 2025. Batoclimab in China: sustained MG-ADL improvement in 58.2% against 31.3%. Over 2.6 years of cyclic efgartigimod (ADAPT-SC+), 59.2% of AChR-positive participants reached minimal symptom expression at some point, with treatment continuing in cycles throughout. [[Antozzi2025,AJMCNipocalimab2025,Yan2024,Meisel2026F]]`,
  neg:`Batoclimab's global phase 3 met its endpoints in a sponsor topline release, but the company said it would not seek approval in MG, and the registry lists the trial as terminated. [[ImmunovantPR2025,CTBatoclimab]]`,
  st:`<span class="ev est">Established</span> as control, not cure: repeated cycles are needed, and the mechanism removes circulating IgG without touching the cells that make it. [[Yan2024,Antozzi2025,Meisel2026F]]`},
 {id:'plasma',n:'Plasma-cell and BAFF/APRIL drugs',lvl:'early',tag:'REPEAT DOSING',cuts:[{s:3,k:'node'}],mode:'ctrl',eff:.72,
  what:'Starves or removes antibody-making plasma cells: telitacicept blocks BAFF and APRIL; anti-CD38 and bortezomib hit plasma cells.',
  ev:`Telitacicept, weekly under the skin, in an open-label phase 2 of 29: QMG fell 7.7 points on 160 mg and 9.6 on 240 mg by week 24. A placebo-controlled phase 3 in China (114 people) is reported only at conferences: both reports give a 3-point MG-ADL response in 98.1% against 12.0%, but their mean changes differ (MG-ADL −5.74 vs −0.91 in one, −6.4 vs −1.6 in the other), so the numbers are unverified. [[Yin2024,MGNewsTelitacicept2025,EMJTelitacicept2025]] Bortezomib cut bone-marrow plasma cells by up to 81% in rats and killed plasma cells in MG thymus cultures; clinical data are thin. [[Gomez2011,Gomez2014,Kohler2019]]`,
  neg:`Belimumab (BAFF alone) missed its phase 2 primary endpoint (QMG, P=0.256). Mezagitamab (anti-CD38) did not separate from placebo in phase 2. Daratumumab salvage in 7 people caused grade 3 or worse toxicity in 5, including one death. [[Hewett2018,CTMezagitamab,Scheibe2022]]`,
  st:`<span class="ev early">Early evidence</span> for telitacicept; bortezomib <span class="ev hyp">Hypothesis</span>. The global telitacicept phase 3 (UPSTREAM MG, 191 enrolled) is due to complete in 2029. [[CTUpstream,Gomez2011]]`},
 {id:'bcell',n:'B-cell antibodies',lvl:'est',tag:'REPEAT DOSING',cuts:[{s:2,k:'node'}],mode:'ctrl',eff:.72,
  what:'Depletes B cells with an antibody against CD19 (inebilizumab) or CD20 (rituximab). Plasma cells without the target can escape.',
  ev:`MINT (238 randomised): inebilizumab improved MG-ADL by 1.9 points and QMG by 2.5 more than placebo at week 26 while steroids were tapered, and lowered exacerbation risk (HR 0.41). FDA approval followed in December 2025, with a dose every 6 months. [[Nowak2025,Nowak2026,FDAUplizna2025]] In new-onset generalized MG, a single 500 mg rituximab infusion in RINOMAX gave minimal manifestations at 16 weeks in 71% against 29% on placebo; follow-up to 5 years found lower QMG at 12 and 24 months. [[Piehl2022,Wu2025]] CD19-negative plasma cells escape CD19-directed depletion. [[Ruan2026]]`,
  neg:`In established mild-to-moderate AChR-positive MG, BeatMG (52 people) was futile: 60% on rituximab and 56% on placebo met the steroid-sparing goal. The same drug looking different early and late in the disease is a live controversy. [[Nowak2022,Wu2025]]`,
  st:`<span class="ev est">Established</span> as treatment, not cure: inebilizumab is given every 6 months and adds about 2 MG-ADL points over placebo; rituximab is established in new-onset disease only. [[Nowak2025,FDAUplizna2025,Piehl2022]]`},
 {id:'bcma',n:'mRNA anti-BCMA CAR-T (Descartes-08)',lvl:'early',tag:'ONE COURSE, NO CHEMOTHERAPY',cuts:[{s:3,k:'node'}],mode:'course',eff:.72,
  what:'T cells briefly loaded with mRNA for an anti-BCMA receptor kill plasmablasts and plasma cells, with no chemotherapy first.',
  ev:`Phase 2b, randomised and double-blind (26 people, six weekly outpatient infusions): a 5-point MG Composite improvement at month 3 in 66.7% against 27.3% on placebo (P=0.047). Among biologic-naive participants, 55.6% reached minimal symptom expression by month 6 and kept it to month 12 without further treatment. There was no hypogammaglobulinaemia, and vaccine antibodies did not fall. [[Vu2026,Fedak2026]] In the earlier open study, 5 of 7 kept their response at 12 months, and retreatment worked in 2 of 3 who lost it. [[Chahin2025]]`,
  neg:`Infusion reactions were common (80% against 56% on placebo). The trial was small, and the receptor is not permanent, so durability may depend on retreatment. [[Vu2026,Granit2023]]`,
  st:`<span class="ev early">Early evidence</span>, the strongest among cell therapies: the only CAR-type therapy with a completed randomised placebo-controlled MG trial. Phase 3 AURORA (128 planned) has an estimated primary completion of 30 December 2026. [[Vu2026,CTAURORA]]`},
 {id:'cd19',n:'Anti-CD19 CAR-T',lvl:'early',tag:'IMMUNE RESET',cuts:[{s:2,k:'node'}],mode:'reset',eff:.78,
  what:'Engineered T cells clear CD19 B cells deep into tissue after chemotherapy; naive B cells then grow back.',
  ev:`The first MG patient was treated in 2023. A German series of 3 people with severe refractory MG reported remission for at least 19 months with all MG immunotherapy stopped, although AChR antibodies stayed detectable. [[Haghikia2023,Hegelmaier2026]] In RESET-MG (rese-cel), conference coverage reports meaningful MG-ADL improvement off immunomodulators in 10 of 13, with B cells back at a median 85 days. [[NeurologyLiveRESET2026]]`,
  neg:`<b>Unverified:</b> two trade reports of the same KYSA-6 phase 2 data (7 people) disagree on the 24-week effect (MG-ADL −8.0 and QMG −7.7 in one, −8.3 and −11.7 in the other); neither is a peer-reviewed paper. The company and the treating centre give the first patient's age as 33 and 34. Pooled harms across autoimmune CAR-T studies: any cytokine release syndrome 63% (grade 3 or worse 0%), hypogammaglobulinaemia 47%, infection within 3 months 29%. [[NeurologyLiveKYV2026,KyvernaPR2023,UMMagdeburg2023,Wong2026]]`,
  st:`<span class="ev early">Early evidence</span>. KYSA-6, an open-label randomised phase 2/3 against standard care (66 planned), has primary completion estimated in September 2027. [[CTKYSA6]]`},
 {id:'dual',n:'BCMA + CD19 CAR-T',lvl:'early',tag:'IMMUNE RESET',cuts:[{s:2,k:'node'},{s:3,k:'node'}],mode:'reset',eff:.85,
  what:'One CAR-T product hits CD19 B cells and BCMA plasma cells together, so CD19-negative plasma cells cannot escape.',
  ev:`In a Chinese phase 1 of 6 people with refractory MG, given without lymphodepletion, 5 reached MG-ADL 0 by day 90 and all stopped steroids. A second 6-person series reported drug-free remission with minimal manifestations in 5 by month 6, lasting to 12 months even after B cells returned, and the new B cells were less AChR-specific. [[Ruan2026,Huang2026I]]`,
  neg:`The one relapse showed expansion of FCRL5-high age-associated B cells, also seen after rituximab relapse, which the authors propose as a relapse mechanism. There is no control arm, and follow-up is 6 to 18 months. [[Huang2026I,Tian2024]]`,
  st:`<span class="ev early">Early evidence</span>: two 6-patient phase 1 series and a 2-patient BCMA report. [[Ruan2026,Huang2026I,Tian2024]]`},
 {id:'hsct',n:'Autologous stem cell transplant',lvl:'early',tag:'IMMUNE RESET',cuts:[{s:1,k:'node'},{s:2,k:'node'},{s:3,k:'node'}],mode:'reset',eff:.85,
  what:'High-dose chemotherapy and anti-thymocyte globulin wipe out the immune cells; the person\'s own stem cells rebuild them.',
  ev:`In the largest series (21 people with severe refractory MG, retrospective), 16 of 18 evaluable patients (89%) reached stable remission or minimal manifestations off all treatment, held over a median 6.7 years: the longest drug-free follow-up of any curative-intent MG treatment. Three people with MuSK MG became symptom-free or nearly so for 2 to 5.5 years. [[Beland2025,Beland2023]]`,
  neg:`Transplant-related mortality at 100 days was 9.5%. In a single-patient report the person was symptom-free at 2 years while AChR antibodies persisted. No randomised comparison exists. [[Beland2025,Schlatter2023]]`,
  st:`<span class="ev early">Early evidence</span>, bounded by its early mortality. [[Beland2025]]`},
 {id:'thymus',n:'Thymectomy',lvl:'est',tag:'ONE-TIME SURGERY, PARTIAL',cuts:[{s:0,k:'node'}],mode:'once',eff:.5,
  what:'Removes the thymus, where tolerance to AChR breaks down in early-onset MG. Antibody-making cells elsewhere remain.',
  ev:`MGTX: lower QMG and less prednisone over 3 and 5 years. [[Wolfe2016,Wolfe2019]] In 421 people followed about 10 years, complete stable remission off all treatment was reached by 12.2% after thymectomy against 4.3% without (HR 3.40). A 2026 review calls thymectomy the only widely applied, sometimes curative treatment for AChR-positive MG. [[Zhang2026,ElWahsh2026]] More in <a href="#thymectomy" data-go="thymectomy">Thymectomy over the years</a>.`,
  neg:`Only a minority reach drug-free remission, and benefit outside MGTX's population (late-onset, seronegative) is unresolved. Guidance says evidence does not support it in MuSK MG. [[Zhang2026,Narayanaswami2021]]`,
  st:`<span class="ev est">Established</span> for improving the course of AChR-positive MG; only partly curative. [[Wolfe2016,Zhang2026]]`},
 {id:'musk',n:'MuSK-CAART',lvl:'early',tag:'ANTIGEN-SPECIFIC',cuts:[{s:2,k:'node'}],mode:'spec',eff:.85,
  what:'T cells carry the MuSK protein itself as bait, so they kill only B cells that make anti-MuSK antibody.',
  ev:`In the lab and in mice, MuSK-CAART removed anti-MuSK B cells as well as anti-CD19 CAR-T did, kept working when soluble anti-MuSK antibody was present, and lowered anti-MuSK IgG without lowering total B cells or total IgG. [[Oh2023]] MuSK antibodies are mainly IgG4, which cannot activate complement, so the junction here shows no attack complex. [[Huijbers2018]]`,
  neg:`<b>No results yet:</b> the phase 1 (7 enrolled) is listed as completed in July 2025 with no results posted, and no peer-reviewed report was found as of 20 October 2026. [[CTMuSKCAART]]`,
  st:`<span class="ev early">Early evidence</span> for feasibility only; antigen-specific cure in people is a <span class="ev hyp">Hypothesis</span>. [[Oh2023,CTMuSKCAART]]`},
 {id:'tol',n:'Tolerance approaches',lvl:'hyp',tag:'ANTIGEN-SPECIFIC',cuts:[{s:1.5,k:'link'}],mode:'spec',eff:.65,
  what:'Re-teach the immune system to ignore AChR: soluble receptor fragments, AChR-specific regulatory T cells, antibody filters.',
  ev:`In rats with experimental MG, a soluble mutated fragment of the AChR α1 subunit reversed established disease, and a single dose of conditioned regulatory T cells reduced AChR-specific antibody. Sterilisable columns carrying recombinant MuSK captured anti-MuSK antibody from rabbit antisera. [[Lazaridis2022,Aricha2016,Futami2025]]`,
  neg:`A 2026 review states that antigen-bait, anti-idiotype and tolerogenic approaches have not been demonstrated in people with naturally acquired MG. [[ElWahsh2026]]`,
  st:`<span class="ev hyp">Hypothesis</span>: rodent and device work only. [[Lazaridis2022,Aricha2016,ElWahsh2026]]`}
];
const CUR_W=1/CUR_R.length;
const CUR_PH=[
 {from:0,at:.04,k:'The chain',t:'Where the antibodies come from',
  txt:`In AChR MG the thymus is part of the disease, with hyperplasia and germinal centres in early-onset disease and a thymoma in about 10 to 15%. [[Gilhus2019]] T helper cells drive B cells to become plasma cells that make IgG against the receptor. FcRn recycles IgG so it lasts in the blood, and bound IgG switches on complement, whose membrane attack complex is found at essentially every MG endplate examined. [[Roopenian2007,Nakano1993]] Each treatment cuts this chain at a different point.`,
  pt:'Harmful antibodies come off a production line of immune cells. Every treatment, old or new, acts somewhere along that line.',
  hook:'No therapy has yet been shown to cure MG reliably. A 2026 review calls thymectomy only sometimes curative and describes the approved biologics as continuous suppression at significant cost. [[ElWahsh2026]]'},
 {from:CUR_W,at:CUR_W*1.5,k:'Downstream',t:'Block complement or clear IgG',
  txt:`Complement and FcRn inhibitors act at the end of the chain, so they work fast, but the plasma cells keep making antibody. Watch the scissors: when a dose wears off the attack returns, and the next dose cuts again. That is why they are labelled control, not cure. [[Meisel2026F,ElWahsh2026]]`,
  pt:'These drugs block or mop up the damage, but the factory keeps running, so they are given again and again.',
  hook:'<b>Control, not cure</b>: complement and FcRn inhibitors work only while they are given.'},
 {from:CUR_W*3,at:CUR_W*3.5,k:'Upstream',t:'Deplete B cells and plasma cells',
  txt:`Cutting higher up removes the cells that make antibody. B-cell antibodies (inebilizumab, rituximab) and plasma-cell or survival-factor drugs (telitacicept) are still given in repeated courses, and long-lived plasma cells that lack CD19 can escape a B-cell cut. [[Nowak2025,Yin2024,Ruan2026]]`,
  pt:'Removing the cells that make the antibodies works more slowly, but closer to the source.',
  hook:'Same drug, different stage: rituximab was futile in established MG (BeatMG) but beat placebo in new-onset MG (RINOMAX). [[Nowak2022,Piehl2022]]'},
 {from:CUR_W*5,at:CUR_W*6.5,k:'Reset',t:'Cell therapies and transplant',
  txt:`CAR-T cells and autologous stem cell transplant aim at an immune reset: a deep, one-time clearance after which new, naive B cells grow back, with remission and no ongoing treatment as the goal. The evidence comes from small, mostly open-label studies; CAR-T follow-up in autoimmune neurological disease is generally under two years, with relapses already reported, and transplant follow-up reaches a median 6.7 years. [[Bradhurst2026,Beland2025]]`,
  pt:'Researchers are testing ways to clear out the faulty immune cells once and let a fresh set grow back.',
  hook:'CAR-T results in MG are <b>early</b>: small, mostly open-label studies. Only the mRNA anti-BCMA product has a completed randomised placebo-controlled trial. [[Bradhurst2026,Vu2026]]'},
 {from:CUR_W*9,at:CUR_W*9.5,k:'Antigen-specific',t:'Thymus, MuSK-CAART and tolerance',
  txt:`The most precise cut would remove only the cells that react to AChR or MuSK and leave the rest of the immune system alone. Thymectomy is the established upstream cut; MuSK-CAART and tolerance approaches are still at feasibility or animal stages. [[Wolfe2016,Oh2023,ElWahsh2026]]`,
  pt:'The hope is to switch off only the faulty reaction, so the rest of the immune system keeps protecting the body.',
  hook:'Antigen-specific means targeting only the autoreactive cells. This has not yet been shown to work in people with MG. [[ElWahsh2026]]'}
];
/* negative and halted results, pinned to the node they aimed at */
const CUR_NEG=[
 {s:2,l:'✕ belimumab',k:'belimumab'},{s:2,l:'✕ BeatMG',k:'beat'},{s:3,l:'✕ mezagitamab',k:'meza'},{s:3,l:'◐ satralizumab',k:'satra'}];
const CUR_LVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};

inits.cure=()=>{
  const svg=$('#cuSvg'),rg=$('#cuT');let neg=false;
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const ln=(x1,y1,x2,y2,st)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="${st}"/>`;
  const wrap=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  const R=rng(45),PR=Array.from({length:18},()=>R());
  const idxOf=t=>Math.min(CUR_R.length-1,Math.floor(t/CUR_W));
  /* cut progress inside a route's slice of the timeline */
  function actOf(mode,u){if(mode==='none')return 0;
    if(mode==='ctrl')return clamp(ramp(u,.2,.32)*(1-ramp(u,.6,.7))+ramp(u,.82,.92));
    if(mode==='once')return ramp(u,.2,.4);return ramp(u,.2,.32)}
  /* scissors, pivot at (x,y), blades pointing toward the chain (dir: 1 down, or sideways in narrow) */
  function scis(x,y,open,col,rot=0){const a=.12+.5*open,bx=Math.sin(a)*13,by=Math.cos(a)*13;
    return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot})"><path d="M${f1(-bx*.55)} ${f1(-by*.75)}L${f1(bx)} ${f1(by)}M${f1(bx*.55)} ${f1(-by*.75)}L${f1(-bx)} ${f1(by)}" style="stroke:${col};stroke-width:2.4;stroke-linecap:round;fill:none"/><circle cx="${f1(-bx*.55-2.4)}" cy="${f1(-by*.75-3.4)}" r="4" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/><circle cx="${f1(bx*.55+2.4)}" cy="${f1(-by*.75-3.4)}" r="4" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/><circle r="1.6" style="fill:${col}"/></g>`}
  /* node glyphs, centred at (x,y) */
  function glyph(i,x,y,o,naive,musk){const ab=musk?'var(--musk)':'var(--ab)',abS=musk?'var(--musk-soft)':'var(--ab-soft)';let s=`<g style="opacity:${f1(o)}">`;
    if(i===0)s+=`<ellipse cx="${f1(x-7)}" cy="${y}" rx="9" ry="20" transform="rotate(8 ${f1(x-7)} ${y})" style="fill:var(--ab-soft);stroke:var(--ab);stroke-width:1.6"/><ellipse cx="${f1(x+7)}" cy="${y}" rx="9" ry="21" transform="rotate(-8 ${f1(x+7)} ${y})" style="fill:var(--ab-soft);stroke:var(--ab);stroke-width:1.6"/><circle cx="${f1(x-6)}" cy="${y-5}" r="2.6" style="fill:var(--ab)"/><circle cx="${f1(x+7)}" cy="${y+6}" r="2.6" style="fill:var(--ab)"/>`;
    if(i===1)s+=`<circle cx="${x}" cy="${y}" r="19" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.8"/>`+T(x,y+4.5,'T','t-lbl t-mid','fill:var(--nerve)');
    if(i===2){s+=`<circle cx="${x}" cy="${y}" r="19" style="fill:${naive?'var(--good-soft)':'var(--panel)'};stroke:${naive?'var(--good)':ab};stroke-width:1.8"/>`+T(x,y+4.5,'B','t-lbl t-mid',`fill:${naive?'var(--good)':ab}`);
      [-.9,0,.9].forEach(a=>{s+=igg(x+Math.sin(a)*21,y-Math.cos(a)*21,5,a,1,naive?'var(--good)':ab)})}
    if(i===3)s+=`<ellipse cx="${x}" cy="${y}" rx="25" ry="19" style="fill:${naive?'var(--good-soft)':abS};stroke:${naive?'var(--good)':ab};stroke-width:1.8"/><circle cx="${x+9}" cy="${y}" r="7" style="fill:var(--nuc)"/><path d="M${x-17} ${y-7}q6 3 12 0M${x-18} ${y}q6 3 12 0M${x-17} ${y+7}q6 3 12 0" style="fill:none;stroke:${naive?'var(--good)':ab};stroke-width:1.2"/>`;
    if(i===4)s+=igg(x-9,y+6,9,-.4,1,ab)+igg(x+9,y+4,9,.4,1,ab)+igg(x,y-10,9,0,1,ab);
    if(i===5)for(let k=0;k<9;k++){const a=k/9*Math.PI*2;s+=`<circle cx="${f1(x+Math.cos(a)*13)}" cy="${f1(y+Math.sin(a)*13)}" r="4" style="fill:var(--comp);opacity:.85"/>`}
    return s+'</g>'}
  /* the junction: nerve terminal above, muscle membrane with receptors below */
  function junction(cx,top,w,lost,bound,mac,musk){let s='';
    s+=`<rect x="${f1(cx-w*.42)}" y="${top}" width="${f1(w*.84)}" height="28" rx="12" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.4"/>`;
    [-.25,0,.25].forEach(f=>s+=vesicle(cx+f*w,top+14,6,1,4));
    const my=top+58;s+=`<rect x="${f1(cx-w/2)}" y="${my}" width="${w}" height="34" rx="8" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.4"/>`;
    const n=6,X=k=>cx-w/2+(k+.5)*w/n;
    for(let k=0;k<n;k++){const gone=k<lost;s+=achr(X(k),my,8,.5,gone?.18:1,gone?'var(--muted)':'var(--achr)');
      if(k>=lost&&k-lost<bound)s+=igg(X(k),my-17,6,Math.PI,1,musk?'var(--musk)':'var(--ab)')}
    for(let k=0;k<mac;k++){const x=X(k)+w/n/2;for(let j=0;j<6;j++){const a=j/6*Math.PI*2;s+=`<circle cx="${f1(x+Math.cos(a)*4.4)}" cy="${f1(my+2+Math.sin(a)*4.4)}" r="1.7" style="fill:var(--comp)"/>`}}
    return s}

  function draw(t){
    const N=vb(svg,'720 400','400 900'),ri=idxOf(t),Rt=CUR_R[ri],u=clamp((t-ri*CUR_W)/CUR_W),act=actOf(Rt.mode,u);
    const repop=Rt.mode==='reset'?ramp(u,.55,.85):0,musk=Rt.id==='musk';
    const W=N?400:720;
    const P=N?CUR_NODES.map((_,i)=>[56,84+i*80]):CUR_NODES.map((_,i)=>[56+i*94,120]);
    const J=N?{cx:200,top:546,w:320}:{cx:650,top:66,w:112};
    const V=N?[...P.map((p,i)=>[p[0],p[1],i]),[56,586,5.5],[200,590,6]]:[...P.map((p,i)=>[p[0],p[1],i]),[600,112,5.6],[650,110,6]];
    const pos=s=>{for(let i=0;i<V.length-1;i++){if(s<=V[i+1][2]){const k=(s-V[i][2])/(V[i+1][2]-V[i][2]);return[lerp(V[i][0],V[i+1][0],k),lerp(V[i][1],V[i+1][1],k)]}}return[V[V.length-1][0],V[V.length-1][1]]};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=T(14,24,'THE CHAIN THAT MAKES MG ANTIBODIES','t-sm','fill:var(--ink)');
    s+=T(N?14:706,N?40:24,Rt.id==='none'?'no cut':'cut: '+Rt.n,'t-sm'+(N?'':' t-end'),`fill:${Rt.id==='none'?'var(--muted)':'var(--drug)'};font-weight:700`);
    // the spine
    let d='';V.forEach((v,i)=>{d+=(i?'L':'M')+f1(v[0])+' '+f1(v[1])});s+=`<path d="${d}" style="fill:none;stroke:var(--line);stroke-width:3"/>`;
    // node state
    const cutAt=new Set(Rt.cuts.filter(c=>c.k==='node').map(c=>c.s));
    P.forEach(([x,y],i)=>{const hit=cutAt.has(i),o=hit?1-(Rt.mode==='spec'?.5:.8)*act*(1-repop):1;
      const naive=hit&&repop>.5&&i>=1;
      s+=`<circle cx="${x}" cy="${y}" r="27" style="fill:var(--panel);stroke:var(--line)"/>`+glyph(i,x,y,o,naive,musk&&i>=2);
      if(hit&&act>.3&&!naive)s+=`<circle cx="${x}" cy="${y}" r="27" style="fill:none;stroke:var(--drug);stroke-width:1.6;stroke-dasharray:4 3;opacity:${f1(act)}"/>`;
      const nm=CUR_NODES[i];
      if(N){s+=T(96,y-2,nm.n,'t-lbl')+T(96,y+13,naive?'naive cells grow back':hit&&act>.5?'cut here':musk&&i===2?'anti-MuSK B cells':nm.sub,'t-xs',naive?'fill:var(--good)':hit&&act>.5?'fill:var(--drug)':'')}
      else{s+=T(x,y+46,nm.n,'t-lbl t-mid')+T(x,y+60,naive?'naive, regrown':musk&&i===2?'MuSK B cells only':hit&&act>.5?'cut here':nm.sub,'t-xs t-mid',naive?'fill:var(--good)':hit&&act>.5?'fill:var(--drug)':'')}});
    // arrows between nodes
    for(let i=0;i<5;i++){const [x0,y0]=P[i],[x1,y1]=P[i+1];
      s+=N?`<path d="M${x0} ${y0+29}V${y1-31}" class="arrow" marker-end="url(#cuAr)"/>`:`<path d="M${x0+29} ${y0}H${x1-31}" class="arrow" marker-end="url(#cuAr)"/>`}
    // particles: activation signals before the plasma cell, IgG after it
    const blocked=(sv,r)=>Rt.cuts.some(c=>sv>=c.s-(c.k==='node'?.3:0)&&r<act*Rt.eff);
    for(let i=0;i<PR.length;i++){const sv=((t*36+i/PR.length)%1)*6;if(blocked(sv,PR[i]))continue;
      const [x,y]=pos(sv),o=1-ramp(sv,5.75,6);
      if(Math.abs(sv-Math.round(sv))<.3&&sv<5.7)continue;   // hidden behind the node glyph
      s+=sv<3.3?`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.2" style="fill:${musk?'var(--musk)':'var(--ab)'};opacity:${f1(.85*o)}"/>`:igg(x,y,6.5,N?Math.PI/2:0,o,musk?'var(--musk)':'var(--ab)')}
    // the cuts
    const col='var(--drug)';
    Rt.cuts.forEach(c=>{const [x,y]=c.k==='node'?P[c.s]:pos(c.s);
      if(N)s+=scis(22,y,1-act,col,-90);else s+=scis(x,y-46,1-act,col,0);
      if(c.k==='link'&&act>.5){s+=N?`<rect x="${x-6}" y="${y-5}" width="12" height="10" style="fill:var(--field)"/>`+ln(x-8,y-5,x+8,y-5,`stroke:${col};stroke-width:2`)+ln(x-8,y+5,x+8,y+5,`stroke:${col};stroke-width:2`)
        :`<rect x="${x-5}" y="${y-6}" width="10" height="12" style="fill:var(--field)"/>`+ln(x-5,y-8,x-5,y+8,`stroke:${col};stroke-width:2`)+ln(x+5,y-8,x+5,y+8,`stroke:${col};stroke-width:2`)}});
    if(Rt.mode==='ctrl'&&Rt.cuts.length){const c=Rt.cuts[0],[x,y]=c.k==='node'?P[c.s]:pos(c.s);
      const lab=u>=.6&&u<.82?'dose wears off':u>=.82?'next dose':'';
      if(lab)s+=N?T(14,y-30,lab,'t-xs',`fill:${u<.82?'var(--warn)':'var(--drug)'};font-weight:700`):T(x,y-70,lab,'t-xs t-mid',`fill:${u<.82?'var(--warn)':'var(--drug)'};font-weight:700`)}
    // negative and halted results
    if(neg){const by={};CUR_NEG.forEach(g=>{const k=by[g.s]=(by[g.s]||0)+1,[x,y]=P[g.s],c=g.l[0]==='◐'?'var(--warn)':'var(--bad)';
      s+=N?T(386,y-14+k*13,g.l,'t-xs t-end',`fill:${c};font-weight:700`):T(x,y+64+k*13,g.l,'t-xs t-mid',`fill:${c};font-weight:700`)})}
    // the junction
    const abF=Rt.id==='comp'?1:1-act*Rt.eff,macF=musk?0:Rt.id==='comp'?1-act:abF;
    const lost=Math.round(4*abF*(Rt.id==='comp'?.5+.5*(1-act):1)),bound=Math.round(5*abF),mac=Math.round(3*macF);
    s+=junction(J.cx,J.top,J.w,lost,Math.min(bound,6-lost),Math.min(mac,6-lost),musk);
    const jl=J.top+108;s+=T(J.cx,jl,'Junction','t-lbl t-mid')+T(J.cx,jl+14,`${6-lost} of 6 receptors working`,'t-xs t-mid');
    if(N)s+=T(J.cx,jl+28,musk?'MuSK IgG4: no complement':mac?'red rings: attack complex':'no attack complex','t-xs t-mid');
    // the evidence strip
    let y=N?jl+52:(neg?256:238);
    if(Rt.lvl){const c=Rt.lvl==='est'?'var(--good)':Rt.lvl==='early'?'var(--warn)':'var(--drug)',lb={est:'ESTABLISHED',early:'EARLY EVIDENCE',hyp:'HYPOTHESIS'}[Rt.lvl];
      s+=`<rect x="14" y="${y}" width="150" height="24" rx="7" style="fill:var(--panel);stroke:${c};stroke-width:1.6"/>`+T(89,y+16,lb,'t-xs t-mid',`fill:${c};font-weight:700`);
      const tw=Rt.tag.length*5.8+18,tx=N&&172+tw>386?14:172,ty=N&&172+tw>386?y+32:y;
      s+=`<rect x="${tx}" y="${ty}" width="${f1(tw)}" height="24" rx="7" style="fill:${Rt.tag.startsWith('CONTROL')?'var(--warn-soft)':'var(--panel-2)'}"/>`+T(tx+9,ty+16,Rt.tag,'t-xs',`fill:${Rt.tag.startsWith('CONTROL')?'var(--warn)':'var(--ink)'};font-weight:700`);
      y=ty+46}else y+=18;
    wrap(Rt.what,N?54:104).forEach(l=>{s+=T(14,y,l,'t-sm','fill:var(--ink)');y+=15});
    y+=6;s+=T(14,y,N?'SCHEMATIC: where each route acts, not how well.':'SCHEMATIC: shows where each route acts along the chain, not how well it works.','t-xs','fill:var(--drug)');
    s=`<defs>${marker('cuAr','var(--muted)')}</defs>`+s;
    svg.setAttribute('viewBox',`0 0 ${W} ${Math.ceil(y+16)}`);svg.innerHTML=s;
    // note and buttons
    const p=phaseOf(CUR_PH,t);setSt(p);
    $$('[data-cur]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.cur===ri));
    let kv='';
    if(Rt.lvl)kv=`<div class="kv"><div><dt>Route · ${Rt.n}</dt><dd><div class="evrow">${CUR_LVL[Rt.lvl]}<span class="tag${Rt.tag.startsWith('CONTROL')?' warn':''}">${Rt.tag.toLowerCase()}</span></div></dd></div>
      <div><dt>Where it cuts</dt><dd>${Rt.what}</dd></div><div><dt>Best evidence</dt><dd>${Rt.ev}</dd></div>
      <div><dt>Negative, conflicting or unverified</dt><dd>${Rt.neg}</dd></div><div><dt>Status</dt><dd>${Rt.st}</dd></div></div>`;
    else kv=`<div class="kv"><div><dt>No cut</dt><dd>Press play to move the cut down the chain from complement to tolerance, or pick a route above.</dd></div></div>`;
    if(neg)kv+=`<div class="kv"><div><dt>Negative and halted results (overlay)</dt><dd>✕ belimumab, BAFF alone: phase 2 missed its endpoint. ✕ rituximab in BeatMG: futile in established MG. ✕ mezagitamab, anti-CD38: no separation from placebo. ◐ satralizumab, anti-IL-6 receptor: met its endpoint by 1.02 MG-ADL points, development halted. [[Hewett2018,Nowak2022,CTMezagitamab,Habib2025F]]</dd></div></div>`;
    $('#cuNote').innerHTML=noteHTML(CUR_PH[p])+kv;
    $('#cuCap').textContent=`Route ${ri+1} of ${CUR_R.length}: ${Rt.n}${Rt.mode==='ctrl'?' · cut again with each dose':Rt.mode==='reset'?' · naive cells regrow after the cut':''}. Schematic: shows where each route acts, not how well it works.`;
  }
  const stop=playWire(rg,$('#cuPlay'),draw,48000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CUR_PH,rg,draw,stop);
  $$('[data-cur]').forEach(b=>b.onclick=()=>{stop();rg.value=((+b.dataset.cur)+.5)*CUR_W;draw(+rg.value)});
  $('#cuNeg').onclick=()=>{neg=!neg;$('#cuNeg').setAttribute('aria-pressed',neg);draw(+rg.value)};
  draw(+rg.value);

  /* ---------- the routes side by side ---------- */
  const kind={ctrl:'Repeat dosing',course:'One course',reset:'One-time reset',once:'One-time surgery',spec:'Antigen-specific'};
  $('#cuTbl').innerHTML=`<table><thead><tr><th>Route</th><th>Where it cuts</th><th>Effect type</th><th>Evidence and status</th></tr></thead><tbody>${CUR_R.slice(1).map(r=>`<tr><th>${r.n}</th><td>${r.what}</td><td>${r.tag.startsWith('CONTROL')?'<span class="tag warn">Control, not cure</span>':kind[r.mode]}</td><td>${r.st}</td></tr>`).join('')}</tbody></table>`;

  /* ---------- negative and halted results ---------- */
  $('#cuNegCards').innerHTML=`
   <div class="card"><span class="tag bad">Negative</span><h4>Belimumab: blocking BAFF alone</h4><p>In a randomised double-blind phase 2 of 40 people, the change in QMG at week 24 did not differ from placebo (P=0.256), nor did any secondary endpoint. AChR antibody levels fell in both arms. No later MG programme followed. [[Hewett2018]]</p></div>
   <div class="card"><span class="tag bad">Futile</span><h4>Rituximab in BeatMG</h4><p>In 52 people with established AChR-positive MG on at least 15 mg prednisone a day, 60% on rituximab and 56% on placebo met the steroid-sparing goal at week 52, so a meaningful advantage in a larger trial was judged unlikely. In new-onset disease, RINOMAX found the opposite. [[Nowak2022,Piehl2022]]</p></div>
   <div class="card"><span class="tag bad">Negative</span><h4>Mezagitamab: anti-CD38</h4><p>The randomised placebo-controlled phase 2 (36 people) posted MG-ADL and QMG results that did not separate from placebo (posted P values 0.299 to 0.772). Adverse events rose with dose: 66.7% on placebo, 75.0% on 300 mg and 91.7% on 600 mg. [[CTMezagitamab]]</p></div>
   <div class="card"><span class="tag warn">Halted</span><h4>Satralizumab: anti-IL-6 receptor</h4><p>LUMINESCE (188 randomised) met its primary endpoint, but the MG-ADL difference was 1.02 points, which its authors called small. The sponsor halted development in generalized MG and the extension was terminated. Open-label tocilizumab in refractory disease showed larger differences without randomisation; JAK inhibition has only a 19-patient single-arm study. [[Habib2025F,CTLuminesce,Ruan2024,Zhao2026]]</p></div>`;

  /* ---------- the remission checker ---------- */
  const ck={sym:1,tx:2,dur:0,ab:0};
  function drawCk(){$$('[data-ck]').forEach(b=>{const [k,v]=b.dataset.ck.split(':');b.setAttribute('aria-pressed',ck[k]===+v)});
    let h,txt;
    if(ck.sym===2){h='Not remission, not minimal manifestations';txt='Symptoms or functional limits remain, so this is short of the 2020 consensus treatment goal of minimal manifestation status or better. [[Narayanaswami2021]]'}
    else if(ck.sym===1){h='Minimal manifestation status';txt='No symptoms or functional limits from MG, but some weakness on examination. This meets the consensus treatment goal, whatever the treatment. [[Narayanaswami2021]]'}
    else if(ck.tx===1){h='Not counted as remission';txt='The 2020 guidance excludes people taking daily cholinesterase inhibitors with symptomatic benefit from its definition of remission. [[Narayanaswami2021]]'}
    else if(ck.tx===2){h='Remission while still on treatment';txt='No symptoms or signs, but immunotherapy continues. The MGFA research standards call this pharmacologic remission. It is control, not cure. [[Jaretzki2000]]'}
    else if(ck.dur===0){h='Remission off treatment, not yet stable';txt='The cohort definition of maintainable complete stable remission needs all MG treatment stopped and no symptoms for at least a year. [[Zhang2026]]'}
    else{h='Complete stable remission';txt='All treatment stopped and symptom-free for at least a year: the closest thing to a clinical cure that MG studies count. Under conventional care it is rare (12.2% after thymectomy, 4.3% without, over about 10 years). The 2026 cure proposal also asks for low relapse risk, proportionate toxicity and cost-effectiveness. [[Zhang2026,ElWahsh2026]]'}
    let extra='';
    if(ck.sym===0&&ck.ab===0)extra='<p><b>Antibodies still detectable:</b> clinical remission without serological cure, as reported after anti-CD19 CAR-T and after autologous transplant. [[Hegelmaier2026,Schlatter2023]]</p>';
    if(ck.sym===0&&ck.ab===1)extra='<p><b>Antibodies gone:</b> falling titres can track an individual\'s improvement, but remission has also been reported with antibodies still present, so a titre alone is not used as the cure endpoint. [[Luo2024,Hegelmaier2026]]</p>';
    $('#cuChk').innerHTML=`<span class="kicker">Matches</span><b class="big">${h}</b><p>${txt}</p>${extra}<div class="pt"><b>In plain words</b>Today\'s drugs control MG. A cure would mean staying well with no treatment at all, for good.</div>`}
  $$('[data-ck]').forEach(b=>b.onclick=()=>{const [k,v]=b.dataset.ck.split(':');ck[k]=+v;drawCk()});
  drawCk();

  /* ---------- open questions ---------- */
  const QA=[
   ['Does removing the thymus add anything after a B-cell or plasma-cell reset?','Unresolved. The randomised thymectomy evidence covers only MGTX\'s population (18 to 65, AChR-positive, no thymoma, under 5 years); remission data elsewhere are retrospective. [[Wolfe2016,Zhang2026]]'],
   ['Do antibody levels need to fall for remission?','Apparently not always: remission after anti-CD19 CAR-T and after autologous transplant occurred with AChR antibodies still detectable. In 62 people on standard treatment, falling titres did parallel falling scores over 6 months. [[Hegelmaier2026,Schlatter2023,Luo2024]]'],
   ['What drives relapse when B cells come back?','One candidate is a population of FCRL5-high age-associated B cells, seen in a relapse after BCMA/CD19 CAR-T and after rituximab. [[Huang2026I]]'],
   ['Can the chemotherapy before CAR-T be left out?','Two MG series and the mRNA anti-BCMA platform omitted lymphodepletion. Whether results hold without it is open. [[Ruan2026,Vu2026]]'],
   ['How long does remission last?','The longest drug-free follow-up is after autologous transplant, a median 6.7 years (range 1.0 to 21.9). CAR-T follow-up in MG is at least 19 months in three patients, and generally under two years across autoimmune neurology. [[Beland2025,Hegelmaier2026,Bradhurst2026]]'],
   ['What are the long-term harms?','Across autoimmune CAR-T studies: hypogammaglobulinaemia 47% (any grade), infection within 3 months 29%, and cytopenias. Transplant-related mortality was 9.5% at 100 days in the largest MG series. Malignancy risk over decades is unknown. [[Wong2026,Beland2025,Bradhurst2026]]'],
   ['Who will pay, and who will get access?','A 2026 review makes cost-effectiveness part of its definition of cure and notes that current biologics deliver chronic suppression at significant cost. [[ElWahsh2026]]'],
   ['Can we predict who will respond?','Predictive biomarkers are underdeveloped. Pre-treatment miR-150-5p separated responders from non-responders at 12 months (AUC 0.85 to 0.86) in one prospective cohort, and antibody subunit patterns define two endotypes in 513 patients. [[Bhandage2026,Garai2026,Oved2025]]']];
  $('#cuQA').innerHTML=QA.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
};
