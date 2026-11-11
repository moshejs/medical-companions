/* =============== 5.4 Research frontier =============== */
/* Three pieces: (1) where new drugs act on the antibody and complement attack at a node of Ranvier (main stepper),
   (2) a trial explorer with animated bars of published group results, (3) neurofilament light (NfL) leaking from a
   broken axon into blood, with the published medians and proposed cut-offs on a log strip.
   Every number comes from research pass I (frontier) or E (immunotherapy). Drawings are schematic. */
const FN_STEPS=[
 {from:0,at:.06,k:'Step 1 · why look further',t:'Two treatments for 30 years',sub:'IVIg and plasma exchange help, but not fully',
  txt:'IVIg and plasma exchange have been the only proven immune treatments for GBS for 30 years, and a substantial proportion of people still recover incompletely <span class="ev est">Established</span> [[Wiegers2025]]. New trials aim at two steps of the attack: the IgG antibodies that bind the nerve, and complement, the protein cascade those antibodies switch on [[Wiegers2025]]. Such trials are hard to run: GBS is acute and rare, people must be enrolled fast, the disease varies, and testing a new drug without standard care is ethically difficult [[Wiegers2025]].',
  pt:'Doctors have used the same two treatments for GBS for about 30 years. They help, but some people still recover slowly or not fully [[Wiegers2025]].',
  hook:'IVIg and plasma exchange are still the only proven immune treatments for GBS [[Wiegers2025]].'},
 {from:.16,at:.22,k:'Step 2 · the target',t:'Antibodies switch on complement at the nerve',sub:'IgG binds the node; the cascade ends in pores',
  txt:'In a mouse model of Miller Fisher syndrome, anti-GQ1b antibodies with human serum paralysed breathing through complement activation at the diaphragm nerve terminals, and the anti-C5 antibody eculizumab prevented this <span class="ev early">Early evidence</span> (animal data) [[Halstead2008]]. A mouse model with anti-GM1 antibody at the nodal membrane was used to test early blockade with the anti-C2 antibody ARGX-117 [[Campbell2022]]. Complement is also deposited on myelin in AIDP, where no specific antibody is known, which is one argument for complement as a target across subtypes <span class="ev hyp">Hypothesis</span> [[Freiha2026]].',
  pt:'Researchers are testing new medicines. Some try to clear the harmful antibodies faster. Others try to switch off complement, a part of the immune system that damages nerves [[Wiegers2025]].',
  hook:'Tanruprubart blocks C1q, the first step of the classical pathway; eculizumab blocks C5, the last step before the membrane attack complex [[Freiha2026]].'},
 {from:.32,at:.4,k:'Step 3 · fewer antibodies',t:'Clear the IgG faster',sub:'cut IgG, or stop the body recycling it',
  txt:'Imlifidase is an enzyme from <i>Streptococcus pyogenes</i> that cleaves all four subclasses of human IgG; it is already approved for highly sensitised kidney transplant candidates [[Freiha2026,Wiegers2025]]. Its GBS trial had a single arm, so there is no randomised result <span class="ev early">Early evidence</span> [[NCT03943589]]. Efgartigimod blocks the neonatal Fc receptor (FcRn), which normally recycles IgG, so IgG is broken down faster. It has shown benefit in CIDP, but no randomised GBS trial has reported <span class="ev hyp">Hypothesis</span> in GBS [[Freiha2026]].',
  pt:'These medicines lower the amount of the harmful antibody in the blood, either by cutting it up or by letting the body break it down faster [[Freiha2026]].',
  hook:'Imlifidase cleaves IgG; efgartigimod blocks FcRn so IgG is broken down faster. Neither has a randomised GBS result [[Freiha2026]].'},
 {from:.49,at:.57,k:'Step 4 · block early',t:'Stop complement at its first step',sub:'C1q (tanruprubart) or C2 (empasiprubart)',
  txt:'Tanruprubart (ANX005) is a humanised antibody that blocks C1q, the first protein of the classical complement pathway, upstream of C5 [[Freiha2026,Crescioli2026]]. In its phase 3 trial in Bangladesh and the Philippines, the 30 mg/kg dose was reported to meet the week-8 primary endpoint with 2.4-fold higher odds of improvement than placebo; the 75 mg/kg dose did not <span class="ev early">Early evidence</span>: company-reported, with no peer-reviewed trial paper yet [[Crescioli2026]]. Empasiprubart (ARGX-117) blocks C2 in the classical and lectin pathways; a placebo-controlled add-on trial with IVIg is planned [[VandeWalle2025,NCT07821762]].',
  pt:'Another medicine, tanruprubart, looked helpful in a large trial in Bangladesh and the Philippines. The full results are not yet published in a medical journal, and it has not been compared with usual treatment [[Freiha2026,Crescioli2026]].',
  hook:'In the tanruprubart phase 3 trial the control arm had no IVIg or plasma exchange, so it compared drug with placebo, not with standard care [[Freiha2026,Wiegers2025]].'},
 {from:.65,at:.73,k:'Step 5 · block late',t:'Block C5: the target fell, function did not',sub:'eculizumab hit C5, yet recovery was not faster',
  txt:'Eculizumab blocks C5. In the Japanese phase 3 trial (57 adults, all also given IVIg), serum C5 fell by 99.99% one hour after the dose and stayed suppressed to week 5, yet the primary endpoint, time to being able to run, was not met: hazard ratio 0.9 (95% CI 0.45–1.97) <span class="ev est">Established</span>: no benefit shown [[Kuwabara2024]]. The earlier JET-GBS phase 2 trial also missed its predefined threshold [[Misawa2018]]. Why C1q blockade looked better is unresolved: it acts further upstream <span class="ev hyp">Hypothesis</span> [[Freiha2026,Gorson2025]], or the trial populations simply differed [[Kuwabara2024,Wiegers2025]].',
  pt:'One complement medicine, eculizumab, did not help in two trials in Japan [[Kuwabara2024,Misawa2018]].',
  hook:'Eculizumab (anti-C5) failed its primary endpoint in both JET-GBS and the 57-patient phase 3 trial despite near-complete C5 blockade [[Misawa2018,Kuwabara2024]].'},
 {from:.84,at:.92,k:'Step 6 · the scoreboard',t:'Where the evidence stands',sub:'IVIg and plasma exchange remain the proven options',
  txt:'The 2023 EAN/PNS guideline does not recommend eculizumab for GBS [[Wiegers2025]]; it weakly recommends against it [[vanDoorn2023]]. Tanruprubart had FDA Fast Track and Orphan Drug designations and an EMA orphan designation, with an EU marketing application planned for January 2026; its current approval status was not confirmed for this guide [[Crescioli2026]]. Imlifidase and efgartigimod still lack randomised GBS results [[Freiha2026]]. All outcome figures here are group statistics from trials, not predictions for any one person.',
  pt:'For now, IVIg and plasma exchange are the proven treatments. The new medicines are still being tested, and some results are not yet published in full [[Wiegers2025,Freiha2026]].',
  hook:'IVIg and plasma exchange remain the only proven immune treatments; the 2023 guideline does not recommend eculizumab [[Wiegers2025]].'}
];
/* the attack, top to bottom */
const FN_ROWS=['IgG antibody','C1q','C2','C3','C5','MAC pore'];
const FN_HEAD={att:'THE ATTACK, STEP BY STEP',drug:'DRUGS IN GBS TRIALS',attN:'THE ATTACK',zoom:'ONE NODE OF RANVIER, CLOSE-UP',sc:'STANDARD TODAY',sc1:'IVIg',sc2:'plasma exchange',sc3:'in use for 30 years',cutL:'IgG cut into pieces',my:'myelin',nd:'node',na:'sodium channels',ax:'axon'};
const FN_CHIPS=[{l:'IgG on the node',k:'ab'},{l:'C3 deposits',k:'c3'},{l:'MAC pores',k:'mac'}];
const FN_LVL={hi:'HIGH',lo:'LOW'};
const FN_CAP=['Schematic: where each drug is designed to act.','It does not show that a drug works.'];
/* drug badges: row = cascade row, slot for the two IgG drugs; st = the step that introduces it */
const FN_DRUGS=[
 {n:'imlifidase',m:'cuts IgG',s:'Early evidence · 1 arm',row:0,slot:0,st:2,col:'var(--warn)'},
 {n:'efgartigimod',m:'blocks FcRn recycling',s:'Hypothesis in GBS',row:0,slot:1,st:2,col:'var(--rx)'},
 {n:'tanruprubart',m:'anti-C1q antibody',s:'Early evidence',row:1,st:3,col:'var(--warn)'},
 {n:'empasiprubart',m:'anti-C2 antibody',s:'Trial not yet recruiting',row:2,st:3,col:'var(--muted)'},
 {n:'eculizumab',m:'anti-C5 antibody',s:'Phase 3: no benefit',row:4,st:4,col:'var(--bad)'}
];

/* ---- trial explorer: published group results, one outcome per trial ---- */
const FX_TRIALS={
 jet:{b:'JET-GBS · eculizumab',m:'Walking independently at week 4',mn:'Walking independently, week 4',
  d:'Phase 2, Japan · 34 people unable to walk · randomised 2:1 · all also had IVIg',dn:'Phase 2, Japan · 34 people · all had IVIg',
  rows:[{l:'eculizumab + IVIg (23)',ln:'eculizumab + IVIg · 90% CI 42–78',v:61,lo:42,hi:78,vt:'61% (90% CI 42–78)',vn:'61%'},
        {l:'placebo + IVIg (11)',ln:'placebo + IVIg · 90% CI 20–73',v:45,lo:20,hi:73,vt:'45% (90% CI 20–73)',vn:'45%',ctl:1}],
  thr:50,thrL:'dashed line: the lower 90% CI bound had to clear 50%',thrN:'dashed: lower CI bound had to clear 50%',
  f:`<dl class="kv"><div><dt>Design</dt><dd>34 people unable to walk independently, randomised 2:1 to IVIg plus eculizumab (23) or IVIg plus placebo (11) [[Misawa2018]].</dd></div><div><dt>Result</dt><dd>At week 4, 61% (90% CI 42–78) on eculizumab and 45% (20–73) on placebo walked independently. The predefined response threshold, a lower 90% CI bound above 50%, was not met, and the design made no statistical comparison with placebo [[Misawa2018]].</dd></div><div><dt>Evidence</dt><dd><span class="ev early">Early evidence</span> Cochrane pooled it with the 8-person UK ICA-GBS trial (41 participants): it is uncertain whether eculizumab improves disability at 4 weeks, very low certainty [[Doets2020,Davidson2017]].</dd></div></dl>`},
 ecu3:{b:'Phase 3 · eculizumab',m:'Able to run (functional grade 1 or less)',mn:'Able to run (grade 1 or less)',
  d:'Phase 3, Japan · 57 adults with severe GBS · randomised 2:1 · all also had IVIg',dn:'Phase 3, Japan · 57 adults · all had IVIg',
  rows:[{l:'eculizumab · week 8',v:100*12/37,vt:'12 of 37'},{l:'placebo · week 8',v:100*7/20,vt:'7 of 20',ctl:1},
        {l:'eculizumab · week 24',v:100*20/37,vt:'20 of 37'},{l:'placebo · week 24',v:100*13/20,vt:'13 of 20',ctl:1}],
  f:`<dl class="kv"><div><dt>Design</dt><dd>57 adults with severe GBS within 2 weeks of onset, randomised 2:1 to eculizumab (37) or placebo (20), weekly for 4 weeks, with IVIg [[Kuwabara2024]].</dd></div><div><dt>Result</dt><dd>Primary endpoint, time to functional grade 1 or less (able to run), not met: hazard ratio 0.9 (95% CI 0.45–1.97; p=0.89). Registry medians were 112 days with eculizumab and 168 with placebo [[Kuwabara2024,NCT04752566]].</dd></div><div><dt>Why it matters</dt><dd>Serum C5 fell by 99.99% within an hour: the drug hit its target, yet function did not improve. No new safety signals; the registry lists one death in the eculizumab group [[Kuwabara2024,NCT04752566]].</dd></div><div><dt>Evidence</dt><dd><span class="ev est">Established</span> no benefit shown [[Kuwabara2024]].</dd></div></dl>`},
 anx1:{b:'Phase 1 · ANX005',m:'Able to run at week 8 (exploratory group)',mn:'Able to run, week 8 (exploratory)',
  d:'Phase 1, Bangladesh · 50 people with no access to IVIg or plasma exchange',dn:'Phase 1, Bangladesh · no IVIg or plasma exchange',
  rows:[{l:'ANX005 (18)',v:100*5/18,vt:'28% (5 of 18)'},{l:'placebo (8)',v:0,vt:'0% (0 of 8)',ctl:1}],
  f:`<dl class="kv"><div><dt>Design</dt><dd>Escalating single doses of ANX005 (38 people) or placebo (12) in recent-onset GBS; participants had no access to IVIg or plasma exchange [[Mohammad2025]].</dd></div><div><dt>Safety</dt><dd>No dose-limiting toxicity up to 100 mg/kg and no deaths. Infusion-related rash in 76% (29/38) versus 8% (1/12), all grade 1 or 2; serious adverse events 5% versus 25%, none treatment-related [[Mohammad2025]].</dd></div><div><dt>Result</dt><dd>Mean MRC sum score gain to day 8 was 11.8 versus 3.9 points (p=0.09). Groups were too small for significance [[Mohammad2025]].</dd></div><div><dt>Who took part</dt><dd>Mean age 31, all Asian, 75% classified as AMAN, mean baseline MRC sum score 15.5: unlike typical European or North American cohorts. <span class="ev early">Early evidence</span> [[Mohammad2025]]</dd></div></dl>`},
 tan3:{b:'Phase 3 · tanruprubart',m:'GBS disability score 0 at week 26 (company-reported)',mn:'GBS-DS 0 at week 26 (company data)',
  d:'Phase 3, Bangladesh and Philippines · 242 enrolled · no IVIg or plasma exchange in either arm',dn:'Phase 3 · 242 enrolled · no standard care',
  rows:[{l:'tanruprubart 30 mg/kg',v:22,vt:'22%'},{l:'placebo',v:9,vt:'9%',ctl:1}],
  f:`<dl class="kv"><div><dt>Design</dt><dd>Randomised, quadruple-masked, two single-dose arms against placebo; age 16 and over, weakness for 10 days or less, GBS disability score 3 to 5; primary outcome the score at week 8. Completed April 2024; no results posted on the registry [[NCT04701164]].</dd></div><div><dt>Reported result</dt><dd>30 mg/kg met the primary endpoint with 2.4-fold higher odds of improvement; 75 mg/kg did not [[Crescioli2026]]. For 30 mg/kg: independent walking a median 31 days earlier, 28 fewer days on a ventilator, and a score of 0 at week 26 in 22% versus 9% (OR 4.1, 95% CI 1.42–12.04) [[Gorson2025]].</dd></div><div><dt>Caution</dt><dd>The control arm had no standard care, so the trial cannot show how tanruprubart compares with IVIg or plasma exchange [[Freiha2026]]. The figures come from a manufacturer-funded review and industry surveys, not a peer-reviewed trial paper. <span class="ev early">Early evidence</span> [[Gorson2025,Crescioli2026]]</dd></div></dl>`},
 iml:{b:'Phase 2 · imlifidase',m:'Walking unaided after imlifidase then IVIg (no control arm)',mn:'Walking unaided (no control arm)',
  d:'Phase 2, single arm · 30 treated, 27 in the efficacy analysis · France, UK, Netherlands',dn:'Phase 2, single arm · 27 analysed',
  rows:[{l:'day 7',v:100*10/27,vt:'10 of 27'},{l:'day 57',v:100*18/27,vt:'18 of 27'},{l:'day 180',v:100*23/27,vt:'23 of 27'},{l:'day 360',v:100*24/27,vt:'24 of 27'}],
  f:`<dl class="kv"><div><dt>Design</dt><dd>Open label, one arm: adults within 10 days of onset and unable to walk 10 m unaided had one dose of imlifidase (0.25 mg/kg), then a standard IVIg course at least 48 hours later. Nobody walked unaided at baseline (0 of 27) [[NCT03943589]].</dd></div><div><dt>Result</dt><dd>Median time to improve one disability grade 6 days (range 3–16), two grades 16 days (8–92). Mean MRC sum score rose from 39.1 to 50.0 by day 8 and 54.1 by day 180 [[NCT03943589]].</dd></div><div><dt>Safety</dt><dd>Of 30 treated, 7 had serious adverse events, including pulmonary embolism, pneumonia, acute kidney injury and respiratory failure; 1 died [[NCT03943589]].</dd></div><div><dt>Evidence</dt><dd><span class="ev early">Early evidence</span> registry-posted, no control arm; the comparison with matched IVIg-treated IGOS patients is unpublished [[NCT03943589,Wiegers2025,Freiha2026]].</dd></div></dl>`},
 efg:{b:'Series · efgartigimod',m:'Response at week 2 (observational, not randomised)',mn:'Response at week 2 (observational)',
  d:'China · 22 people, 11 per group · treatment chosen, not randomised',dn:'China · 22 people · not randomised',
  rows:[{l:'efgartigimod (11)',v:90.9,vt:'90.9%'},{l:'IVIg (11)',v:81.8,vt:'81.8%',ctl:1}],
  f:`<dl class="kv"><div><dt>Result</dt><dd>Median time to disability-score improvement 4 days with efgartigimod and 8 with IVIg; the authors state comparative efficacy cannot be established [[Cai2025]].</dd></div><div><dt>Other series</dt><dd>A two-centre retrospective study (21 people) found no difference in its primary outcome (OR 0.67, 95% CI 0.10–4.48) [[Zhang2025]]. A single-centre series (36 people) reported a median 6 days to grade 2 or less when efgartigimod was first-line, against 25 days when it followed IVIg or plasma exchange [[Bi2026]].</dd></div><div><dt>Trials</dt><dd>A US randomised trial was withdrawn with nobody enrolled [[NCT05701189]]; the Chinese GREAT trial (about 110 adults, against IVIg) is not yet recruiting [[NCT07806916]].</dd></div><div><dt>Evidence</dt><dd><span class="ev early">Early evidence</span> no randomised trial has reported [[Freiha2026]].</dd></div></dl>`}
};
const FX_AX='share of the group, %';

/* ---- neurofilament light ---- */
const NF_TXT={h1:'AXON DAMAGE RELEASES NfL',h2:'SERUM NfL OVER TIME (SCHEMATIC)',blood:'blood',brk:'axon breaks',hi:'high',lo:'low',band:'healthy range',
  ax:['onset','2 wk','4 wk','26 wk','1 yr'],
  med:'MEDIANS AT ENTRY, SPANISH IGOS COHORT · pg/mL, LOG SCALE',medN:'MEDIANS AT ENTRY · pg/mL, LOG SCALE',
  cut:'PROPOSED CUT-OFFS · pg/mL, LOG SCALE · NOT VALIDATED FOR ONE PERSON',cutN:'PROPOSED CUT-OFFS · pg/mL · NOT VALIDATED'};
const NF_MED=[{v:9.83,l:'controls 9.83',up:1},{v:46.79,l:'other variants 46.79',ln:'others 46.79',up:0},{v:55.49,l:'all GBS 55.49',up:1},{v:190.55,l:'AMAN 190.55',up:0}];
const NF_CUT=[{v:34,l:'able to run below 34',up:1},{v:248,l:'unable to run above 248',up:0},{v:319,l:'unable to walk above 319',up:1}];
const NF_CAP=[
 'Damage: when axons are injured, neurofilament light chain (NfL) is released and can be measured in blood. It is a marker of axonal damage [[MartinAguilar2020]].',
 'High early: in a Spanish IGOS cohort, median serum NfL was 55.49 pg/mL in GBS against 9.83 in healthy controls, and 190.55 in AMAN against 46.79 in other variants [[MartinAguilar2020]]. In 281 SID-GBS patients, high NfL at 2 weeks was associated with being unable to walk at 4 weeks (OR 1.74, 95% CI 1.27–2.45) [[vanTilburg2024]].',
 'Back to normal: in the Spanish cohort, serum NfL had returned to normal by 1 year [[MartinAguilar2020]]. The shape of the curve here is schematic; only the high early values and the return to normal are reported.'];
/* schematic level, 0..1, along a not-to-scale time axis */
const NF_F=monoFn([ [0,.08],[.1,.55],[.2,.82],[.3,.86],[.5,.6],[.7,.32],[.85,.16],[1,.1] ]);

inits.frontier=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- 1. where the drugs act ---------- */
  const svg=$('#fnSvg'),rg=$('#fnT'),note=$('#fnNote');
  function state(t){
    const cut=ramp(t,.33,.42)*(1-ramp(t,.46,.5)),c1=ramp(t,.5,.57)*(1-ramp(t,.62,.65)),c5=ramp(t,.66,.73)*(1-ramp(t,.81,.84));
    const lit=FN_ROWS.map((_,i)=>{const b=ramp(t,.02+i*.022,.06+i*.022);const blk=Math.max(cut,i>=1?c1:0,i>=4?c5:0);return b*(1-.85*blk)});
    return {cut,c1,c5,lit,ab:ramp(t,0,.06)*(1-.88*cut),nav:ramp(t,.1,.2)*.5}}
  function draw(t){
    const N=vb(svg,'720 380','400 680'),S=state(t),p=phaseOf(FN_STEPS,t),P=FN_STEPS[p];
    const L=N?{ty:22,nx:50,ny:58,ns:1,zl:52,chX:12,chY:258,chW:120,cap:648,bx:12,bw:120,dx:146,dw:242,hy:314,rc:[356,419,467,515,563,611],sl:[337,375],scY:320}
             :{ty:24,nx:24,ny:62,ns:1.12,zl:58,chX:14,chY:296,chW:112,cap:346,bx:392,bw:118,dx:530,dw:176,hy:24,rc:[80,143,191,239,287,335],sl:[61,99],scY:44};
    let s=`<defs>${marker('fnAr','var(--muted)',6)}</defs>`;
    s+=tx(N?12:14,L.ty,P.t,'t-big')+tx(N?12:14,L.ty+16,P.sub,'t-sm');
    /* node close-up */
    s+=tx(N?12:14,L.zl,FN_HEAD.zoom,'t-xs','letter-spacing:.08em');
    const Z=nodeZoom(L.nx,L.ny,L.ns,{mode:'aman',ab:S.ab,c3:S.lit[5],nav:S.nav});s+=Z.svg;
    const k=L.ns;
    s+=kitLabel(L.nx+56*k,L.ny+24*k,FN_HEAD.my,{a:'m'})+kitLabel(L.nx+244*k,L.ny+24*k,FN_HEAD.my,{a:'m'})+kitLabel(L.nx+150*k,L.ny+138*k,FN_HEAD.na,{a:'m'})+kitLabel(L.nx+150*k,L.ny+160*k,FN_HEAD.ax,{a:'m'});
    if(S.cut<.05)s+=kitLabel(L.nx+150*k,L.ny+22*k,FN_HEAD.nd,{a:'m'});
    const dep=clamp(S.lit[3]-S.lit[5]);
    if(dep>.02)s+=`<g style="opacity:${f1(dep)}">${c3dots(L.nx+118*k,L.ny+100*k,66*k,10,9)}</g>`;
    if(S.cut>.02){Z.at.gang.forEach((g,i)=>{s+=antibody(g[0]+(i%2?8:-8)*S.cut,g[1]-22*k-S.cut*24*k-(i%3)*4,9*k,{ang:180+(i%2?50:-50),op:.75*S.cut})});
      s+=kitLabel(L.nx+150*k,L.ny+22*k,FN_HEAD.cutL,{a:'m'})}
    /* status chips */
    const lv={ab:S.ab,c3:S.lit[3],mac:S.lit[5]};
    FN_CHIPS.forEach((c,i)=>{const x=L.chX+i*(L.chW+8),y=L.chY,hi=lv[c.k]>.5;
      s+=`<rect x="${x}" y="${y}" width="${L.chW}" height="34" rx="8" style="fill:${hi?'var(--bad-soft)':'var(--panel-2)'};stroke:var(--line)"/>`;
      s+=tx(x+8,y+13,c.l)+tx(x+8,y+28,hi?FN_LVL.hi:FN_LVL.lo,'t-sm',`fill:${hi?'var(--bad)':'var(--ink)'};font-weight:700`)});
    s+=tx(N?12:14,L.cap,FN_CAP[0])+tx(N?12:14,L.cap+14,FN_CAP[1]);
    /* the cascade */
    s+=tx(L.bx,L.hy,N?FN_HEAD.attN:FN_HEAD.att,'t-xs','letter-spacing:.08em')+tx(L.dx,L.hy,FN_HEAD.drug,'t-xs','letter-spacing:.08em');
    const cx=L.bx+L.bw/2;
    for(let i=0;i<FN_ROWS.length-1;i++){const a=Math.min(S.lit[i],S.lit[i+1]);
      s+=`<line x1="${f1(cx)}" y1="${L.rc[i]+16}" x2="${f1(cx)}" y2="${L.rc[i+1]-17}" style="stroke:var(--muted);stroke-width:1.6;opacity:${f1(.3+.7*a)}" marker-end="url(#fnAr)"/>`}
    FN_ROWS.forEach((r,i)=>{const y=L.rc[i]-15,a=.3+.7*S.lit[i],col=i===0?'var(--antibody)':'var(--complement)';
      s+=`<g style="opacity:${f1(a)}"><rect x="${L.bx}" y="${y}" width="${L.bw}" height="30" rx="8" style="fill:var(--panel);stroke:${col};stroke-width:2"/><rect x="${L.bx}" y="${y}" width="7" height="30" rx="3" style="fill:${col}"/>`;
      s+=tx(L.bx+16,y+20,r,'t-lbl')+'</g>'});
    /* a packet of activation flowing down */
    const ph=(t*7)%1,kk=Math.min(4,Math.floor(ph*5)),fr=ph*5-kk,pa=Math.min(S.lit[kk],S.lit[kk+1]);
    if(pa>.4)s+=`<circle cx="${f1(cx)}" cy="${f1(lerp(L.rc[kk]+16,L.rc[kk+1]-17,fr))}" r="4.5" style="fill:var(--complement);stroke:var(--panel);stroke-width:1.5;opacity:${f1(pa)}"/>`;
    /* standard care box, early steps */
    const sca=1-ramp(t,.28,.32);
    if(sca>0){const y=L.scY;s+=`<g style="opacity:${f1(sca)}"><rect x="${L.dx}" y="${y}" width="${L.dw}" height="72" rx="10" style="fill:var(--care-soft);stroke:var(--care)"/>`+
      tx(L.dx+10,y+16,FN_HEAD.sc,'t-xs','fill:var(--care);font-weight:700;letter-spacing:.08em')+tx(L.dx+10,y+34,FN_HEAD.sc1,'t-lbl')+tx(L.dx+10,y+50,FN_HEAD.sc2,'t-lbl')+tx(L.dx+10,y+64,FN_HEAD.sc3)+'</g>'}
    /* drug badges */
    FN_DRUGS.forEach(d=>{const st=FN_STEPS[d.st],op=ramp(t,st.from-.01,st.from+.04);if(op<=0)return;
      const on=p===d.st,all=p===5,cy=d.row===0?L.sl[d.slot]:L.rc[d.row],y=cy-17,blk=on||all;
      const ex=L.bx+L.bw;
      s+=`<g style="opacity:${f1(op*(on||all?1:.55))}">`;
      s+=`<path d="M${ex+2} ${L.rc[d.row]}L${L.dx-6} ${cy}" style="fill:none;stroke:${blk?'var(--care)':'var(--muted)'};stroke-width:${blk?2.4:1.4}"/>`;
      s+=`<line x1="${ex+3}" x2="${ex+3}" y1="${L.rc[d.row]-9}" y2="${L.rc[d.row]+9}" style="stroke:${blk?'var(--care)':'var(--muted)'};stroke-width:${blk?4:2};stroke-linecap:round"/>`;
      s+=`<rect x="${L.dx}" y="${y}" width="${L.dw}" height="34" rx="8" style="fill:${on?'var(--care-soft)':'var(--panel)'};stroke:${blk?'var(--care)':'var(--line)'};stroke-width:${on?2:1.2}"/>`;
      s+=tx(L.dx+9,y+15,d.n,'t-lbl');
      s+=all?tx(L.dx+9,y+28,d.s,'t-xs',`fill:${d.col};font-weight:700`):tx(L.dx+9,y+28,d.m);
      s+='</g>'});
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#fnPlay'),draw,16000,'%t:player.replay%','frontier');
  const setSt=stepWire($('#fnSteps'),FN_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. trial explorer ---------- */
  const xs=$('#fxSvg'),xf=$('#fxFacts');let cur='jet',gr=1,xStop=null;
  function drawX(){
    const T=FX_TRIALS[cur],n=T.rows.length;
    const L=NARROW()?{y0:72,dy:50,bx:12,bw:300,bh:14}:{y0:76,dy:38,bx:248,bw:380,bh:16};
    L.ax=L.y0+(n-1)*L.dy+L.bh+16;L.tk=L.ax+16;L.thr=L.tk+(NARROW()?24:22);
    const H=Math.round((T.thr||!NARROW()?L.thr:L.tk)+12),N=vb(xs,'720 '+H,'400 '+H);
    const X=v=>L.bx+L.bw*v/100;
    let s=tx(N?12:14,22,N?T.mn:T.m,'t-lbl')+tx(N?12:14,40,N?T.dn:T.d,'t-sm');
    /* axis and grid */
    for(let v=0;v<=100;v+=25){s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-18}" y2="${L.ax}" class="grid"/>`+tx(X(v),L.tk,v+'%','t-xs t-mid')}
    s+=`<line x1="${L.bx}" x2="${L.bx+L.bw}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    if(!N)s+=tx(L.bx+L.bw,L.thr,FX_AX,'t-xs t-end');
    if(T.thr){s+=`<line x1="${f1(X(T.thr))}" x2="${f1(X(T.thr))}" y1="${L.y0-18}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 4"/>`+tx(N?12:L.bx,L.thr,N?T.thrN:T.thrL,'t-xs',INK)}
    T.rows.forEach((r,i)=>{const y=L.y0+i*L.dy,v=r.v*gr,col=r.ctl?'var(--muted)':'var(--care)';
      if(N)s+=tx(12,y-6,r.ln||r.l,'t-sm',r.ctl?'':'fill:var(--ink)');else s+=tx(L.bx-10,y+12,r.l,'t-sm t-end',r.ctl?'':'fill:var(--ink)');
      const by=y,bh=L.bh;
      s+=`<rect x="${L.bx}" y="${by}" width="${f1(Math.max(1.5,L.bw*v/100))}" height="${bh}" rx="4" style="fill:${col};opacity:${r.ctl?.5:.9}"/>`;
      let end=X(v);
      if(r.lo!=null&&gr>.98){const yy=by+bh/2;s+=`<path d="M${f1(X(r.lo))} ${f1(yy)}H${f1(X(r.hi))}M${f1(X(r.lo))} ${f1(yy-6)}V${f1(yy+6)}M${f1(X(r.hi))} ${f1(yy-6)}V${f1(yy+6)}" style="stroke:var(--ink);stroke-width:1.6"/>`;end=Math.max(end,X(r.hi))}
      s+=tx(end+7,by+bh-3,N?(r.vn||r.vt):r.vt,'t-sm',INK)});
    xs.innerHTML=s;
    $$('[data-fx]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.fx===cur));
    xf.innerHTML=T.f}
  $$('[data-fx]').forEach(b=>b.addEventListener('click',()=>{cur=b.dataset.fx;if(xStop)xStop();
    xStop=animate(700,q=>{gr=ease(q);drawX()},()=>{xStop=null})}));
  drawX();

  /* ---------- 3. neurofilament light ---------- */
  const ns=$('#nfSvg'),nr=$('#nfT'),nc=$('#nfCap');let nfMode='med';
  function drawN(t){
    const N=vb(ns,'720 350','400 460');
    const L=N?{h1:20,fx:12,fy:62,fw:376,vy:100,cx:44,cy:186,cw:340,ch:116,h2:172,sh:352,ax0:30,ax1:380,ay:404}
             :{h1:22,fx:14,fy:70,fw:336,vy:112,cx:398,cy:40,cw:306,ch:150,h2:22,sh:250,ax0:44,ax1:700,ay:296};
    let s='';
    s+=tx(L.fx,L.h1,NF_TXT.h1,'t-xs','letter-spacing:.08em');
    const broke=t>.1,F=nerveFibre(L.fx,L.fy,L.fw,{n:4,h:28,cut:broke?.55:undefined,regrow:ramp(t,.62,1)});s+=F.svg;
    const bp=F.at.cut||[L.fx+L.fw*.55,L.fy];
    if(broke&&t<.6)s+=kitLabel(bp[0],L.fy-22,NF_TXT.brk,{a:'m'});
    /* blood vessel */
    s+=`<rect x="${L.fx}" y="${L.vy}" width="${L.fw}" height="34" rx="17" style="fill:var(--blood);opacity:.16"/><rect x="${L.fx}" y="${L.vy}" width="${L.fw}" height="34" rx="17" style="fill:none;stroke:var(--blood);stroke-width:1.6"/>`;
    s+=kitLabel(L.fx+14,L.vy+21,NF_TXT.blood,{});
    const lvl=broke?NF_F(t):NF_F(0)*.6,np=Math.round(lvl*30),rr=rng(5);
    for(let i=0;i<30;i++){const px=L.fx+60+rr()*(L.fw-74),py=L.vy+8+rr()*18,sp=rr();if(i>=np)continue;
      const xx=L.fx+60+((px-L.fx-60+t*240*(.5+sp))%(L.fw-74));s+=`<circle cx="${f1(xx)}" cy="${f1(py)}" r="2.6" style="fill:var(--protein);stroke:var(--ink);stroke-width:.6"/>`}
    if(broke&&t<.62)for(let j=0;j<3;j++){const f=((t*5)+j/3)%1;s+=`<circle cx="${f1(bp[0]+(j-1)*5)}" cy="${f1(lerp(L.fy+12,L.vy+12,f))}" r="2.6" style="fill:var(--protein);stroke:var(--ink);stroke-width:.6;opacity:${f1(1-f*.4)}"/>`}
    /* time course */
    s+=tx(N?12:L.cx,L.h2,NF_TXT.h2,'t-xs','letter-spacing:.08em');
    const C=curve(L.cx,L.cy,L.cw,L.ch,NF_F,{upto:t,col:'var(--care)',fill:true,dot:true,bands:[{from:0,to:.16,col:'var(--good)',label:NF_TXT.band}]});s+=C.svg;
    s+=tx(L.cx-6,L.cy+10,NF_TXT.hi,'t-xs t-end')+tx(L.cx-6,L.cy+L.ch,NF_TXT.lo,'t-xs t-end');
    [0,.2,.3,.7,1].forEach((u,i)=>{s+=tx(C.X(u),L.cy+L.ch+14,NF_TXT.ax[i],'t-xs'+(i===0?'':i===4?' t-end':' t-mid'))});
    /* log strip */
    const lg=v=>Math.log10(v),A=v=>L.ax0+(L.ax1-L.ax0)*(lg(v)-lg(5))/(lg(500)-lg(5));
    s+=tx(N?12:14,L.sh,nfMode==='med'?(N?NF_TXT.medN:NF_TXT.med):(N?NF_TXT.cutN:NF_TXT.cut),'t-xs',INK+';letter-spacing:.06em');
    s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.ay}" y2="${L.ay}" class="axis"/>`;
    [10,30,100,300].forEach(v=>{s+=`<line x1="${f1(A(v))}" x2="${f1(A(v))}" y1="${L.ay-4}" y2="${L.ay+4}" class="axis"/>`+tx(A(v),L.ay+38,v,'t-xs t-mid')});
    const pts=nfMode==='med'?NF_MED:NF_CUT;
    pts.forEach(m=>{const x=A(m.v),lab=N&&m.ln?m.ln:m.l,hw=lab.length*2.9,y=m.up?L.ay-12:L.ay+20;
      let cls='t-xs t-mid',lx=x;if(x+hw>L.ax1+12){cls='t-xs t-end';lx=Math.min(x+6,(N?392:712))}else if(x-hw<8){cls='t-xs';lx=Math.max(8,x-6)}
      s+=nfMode==='med'?`<circle cx="${f1(x)}" cy="${L.ay}" r="5" style="fill:var(--care);stroke:var(--panel);stroke-width:1.5"/>`
        :`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ay-8}" y2="${L.ay+8}" style="stroke:var(--ink);stroke-width:2.4;stroke-dasharray:3 2"/>`;
      s+=tx(lx,y,lab,cls,INK)});
    ns.innerHTML=s;
    const ph=t<.33?0:t<.66?1:2;nc.innerHTML=NF_CAP[ph];
    nr.setAttribute('aria-valuetext',NF_CAP[ph].replace(/<[^>]+>/g,'').split(':')[0])}
  playWire(nr,$('#nfPlay'),drawN,12000,'%t:player.replay%','frontier');
  $$('[data-nf]').forEach(b=>b.addEventListener('click',()=>{nfMode=b.dataset.nf;$$('[data-nf]').forEach(c=>c.setAttribute('aria-pressed',c===b));drawN(+nr.value)}));
  drawN(+nr.value);
  const prev=redraws.frontier;redraws.frontier=()=>{prev&&prev();drawX()};
};
