/* =============== 4.1 how the drugs work =============== */
const DM_IND=`"Relapsing forms of multiple sclerosis (MS), to include clinically isolated syndrome, relapsing-remitting disease, and active secondary progressive disease, in adults" (the wording shared by most current US labels). [[AubagioLabel2026,MayzentLabel2026,KesimptaLabel2026,BriumviLabel2026,TyrukoLabel2025]]`;
const DM_PH=[{from:0,at:.08,t:'No treatment'},{from:.2,at:.28,t:'The drug arrives'},{from:.38,at:.52,t:'It acts'},{from:.68,at:.82,t:'The result'}];
const DM_PH0=`Without treatment, T cells (orange) and B cells (violet) are activated in a lymph node, leave it through the S1P1 receptor, travel in the blood, grip VCAM-1 on the blood-brain barrier with the integrin VLA-4, squeeze through and attack myelin. [[Matloubian2004,Yednock1992,Hemmer2015]] The whole story is in <a href="#immune" data-go="immune">1.3 The immune attack</a>.`;
const DM_TIER={mod:['Moderate efficacy',''],mid:['Moderate to higher','brand'],high:['Higher efficacy','rx'],na:['Not FDA-approved','warn'],hist:['Historic','']};
/* p: how the drug changes the traffic. mode: held (S1P), rest (teriflunomide), block (natalizumab), pass (fewer cells dock);
   dep: which cells are destroyed (B or TB) and what share; leave/blood/cns: meter reductions at full effect (illustrative);
   glyph: mol (small molecule or polymer) or ab (antibody); to: where the glyph travels */
const DM_D=[
 {id:'ifn',btn:'Interferon-β',nm:'Interferon-β',ag:'interferon beta-1b · interferon beta-1a (IM, SC) · peginterferon beta-1a',route:'inj',badge:'injection (SC or IM)',tier:'mod',
  p:{mode:'pass',k:.35,leave:0,blood:0,cns:.35,glyph:'mol',to:'blood'},
  mech:`Injected interferons. The labels state that the mechanism in MS is unknown. [[BetaseronLabel2026]] Published summaries describe more anti-inflammatory and fewer pro-inflammatory cytokines, possibly less immune-cell traffic across the blood-brain barrier, and more CD56-bright regulatory NK cells; the mechanism remains "multifactorial and incompletely understood". [[Kieseier2011]]`,
  fda:`Betaseron 23 Jul 1993 (the first MS DMT); Avonex 17 May 1996; Rebif 7 Mar 2002; Plegridy 15 Aug 2014. [[FDA2026Approvals]]`,
  ind:DM_IND,
  dose:`Betaseron 0.25 mg SC every other day, titrated up over 6 weeks; Avonex 30 µg IM weekly; Rebif 22 or 44 µg SC three times weekly, at least 48 hours apart; Plegridy 125 µg SC or IM every 14 days after titration. [[BetaseronLabel2026,AvonexLabel2025,RebifLabel2025,PlegridyLabel2025]]`,
  trial:`IFNB 1993 (372 people, against placebo): 2-year annual exacerbation rate 0.84 versus 1.27, about one-third lower. [[IFNBMSSG1993]] PRISMS: relapses 27% lower (95% CI 14–39) on 22 µg and 33% (21–44) on 44 µg. [[PRISMS1998]] ADVANCE (peginterferon every 2 weeks): ARR 0.256 versus 0.397, rate ratio 0.644 (95% CI 0.500–0.831). [[Calabresi2014]]`,
  tw:`Cochrane 2024: interferon beta-1a gave a moderate relapse reduction (RR 0.84, moderate certainty). [[GonzalezLorenzo2024]] ECTRIMS/EAN 2018 recommends offering a more efficacious drug if disease stays active on it. [[Montalban2018]]`,
  ph:[`The injected protein reaches the bloodstream. It acts on immune cells broadly rather than at one step, so the drawing shows it spreading through the blood.`,
      `Pro-inflammatory signals (magenta dots) fall and anti-inflammatory signals (teal squares) rise. Fewer cells may cross the barrier. [[Kieseier2011]]`,
      `Traffic slows but does not stop: in the pivotal trials, relapses fell by roughly a third. [[IFNBMSSG1993,PRISMS1998]]`],
  cap:'Look for: magenta dots fade, teal squares rise',
  pt:`Interferon-β is a messenger protein that turns the immune system's volume down a little. Nobody knows exactly how it helps in MS.`,
  hook:`Interferon-β: the first MS DMT (Betaseron, 1993). Mechanism unknown per label. Label warnings include liver injury, depression, injection-site necrosis and low blood counts. [[FDA2026Approvals,BetaseronLabel2026,RebifLabel2025]]`},
 {id:'ga',btn:'Glatiramer acetate',nm:'Glatiramer acetate',ag:'glatiramer acetate (Copaxone and generics)',route:'inj',badge:'injection (SC)',tier:'mod',
  p:{mode:'pass',k:.35,th2:true,leave:0,blood:0,cns:.35,glyph:'chain',to:'apc'},
  mech:`A mixture of synthetic polypeptides "thought to act by modifying immune processes"; the label says the mechanism is not fully understood. [[CopaxoneLabel2026]] Published model: it binds MHC molecules and competes with myelin antigens for presentation to T cells, and it induces glatiramer-specific Th2 cells that enter the brain and release IL-10, TGF-β and BDNF ("bystander suppression"). [[Arnon2004]]`,
  fda:`Copaxone 20 Dec 1996. [[FDA2026Approvals]]`,
  ind:DM_IND,
  dose:`20 mg/mL SC daily, or 40 mg/mL SC three times weekly at least 48 hours apart; the label says the two strengths are "not interchangeable". [[CopaxoneLabel2026]]`,
  trial:`Johnson 1995 (251 people, against placebo): 2-year relapse rate 1.19 versus 1.68, 29% lower (annualised 0.59 versus 0.84). [[Johnson1995]] GALA (40 mg three times weekly, 12 months): ARR 0.331 versus 0.505, 34.0% lower. [[Khan2013]]`,
  tw:`Cochrane 2024: a moderate relapse reduction (RR 0.84, moderate certainty). [[GonzalezLorenzo2024]]`,
  ph:[`The polypeptide is injected under the skin and reaches the antigen-presenting cells that show protein fragments to T cells.`,
      `Glatiramer (teal chains) takes the MHC slots that myelin fragments (gold) would use, and glatiramer-specific Th2 cells form (ringed, marked Th2). [[Arnon2004]]`,
      `Th2 cells that reach the lesion release calming signals (teal squares) on the spot: bystander suppression. Other cells still travel. [[Arnon2004]]`],
  cap:'Look for: teal chains fill the MHC slots; Th2 cells',
  pt:`Glatiramer looks a little like a piece of myelin. It may distract the immune system and train calming cells that travel to the brain.`,
  hook:`Glatiramer acetate: decoy for myelin antigen on MHC, plus Th2 bystander suppression. Boxed warning: anaphylaxis, possible from the first dose up to years later. [[Arnon2004,CopaxoneLabel2026]]`},
 {id:'teri',btn:'Teriflunomide',nm:'Teriflunomide (DHODH inhibitor)',ag:'teriflunomide (Aubagio)',route:'oral',badge:'taken by mouth',tier:'mod',
  p:{mode:'rest',k:.45,leave:.45,blood:.1,cns:.35,glyph:'mol',to:'apc'},
  mech:`Inhibits dihydroorotate dehydrogenase (DHODH), a mitochondrial enzyme of de novo pyrimidine synthesis. [[AubagioLabel2026]] Rapidly dividing activated T and B cells depend on that pathway, while resting lymphocytes use a salvage pathway, so proliferation slows without cell death. [[BarOr2014]]`,
  fda:`Aubagio 12 Sep 2012. [[FDA2026Approvals]]`,
  ind:DM_IND,
  dose:`7 mg or 14 mg by mouth once daily. Boxed warning: liver toxicity and embryofetal toxicity. [[AubagioLabel2026]]`,
  trial:`TEMSO (1088 people, against placebo, 108 weeks): ARR 0.37 on either dose versus 0.54, 31.2% and 31.5% lower. [[OConnor2011]] TOWER: ARR 0.32 (95% CI 0.27–0.38) on 14 mg versus 0.50 (0.43–0.58). [[Confavreux2014]]`,
  tw:`It is the comparator that ofatumumab, ublituximab and ponesimod each beat on relapse rate. [[Hauser2020Ofatumumab,Steinman2022,Kappos2021]]`,
  ph:[`The drug is absorbed and reaches lymphocytes everywhere, including those being activated in the lymph node.`,
      `An activated T cell normally divides again and again to build an army of copies. With DHODH blocked it runs short of pyrimidines and stops dividing; resting cells carry on. [[BarOr2014]]`,
      `Fewer newly activated cells leave the node, so fewer reach the CNS. Cells are slowed, not killed. [[BarOr2014]]`],
  cap:'Look for: the dividing cell in the node stalls',
  pt:`Teriflunomide starves fast-dividing immune cells of a DNA building block, so an attacking force grows more slowly.`,
  hook:`Teriflunomide: DHODH inhibitor, cytostatic not cytotoxic. Without accelerated elimination (cholestyramine or charcoal), clearance "may take as long as 2 years". [[BarOr2014,AubagioLabel2026]]`},
 {id:'fum',btn:'Fumarates',nm:'Fumarates',ag:'dimethyl fumarate · diroximel fumarate',route:'oral',badge:'taken by mouth',tier:'mod',
  p:{mode:'pass',k:.4,leave:0,blood:.1,cns:.35,glyph:'mol',to:'apc',nrf:true},
  mech:`Dimethyl fumarate and its metabolite monomethyl fumarate activate the Nrf2 oxidative-stress pathway; the labels say the therapeutic mechanism in MS is unknown. Diroximel fumarate is converted to the same active metabolite. [[TecfideraLabel2025,VumerityLabel2025]] In the mouse model (EAE), protection was almost lost without Nrf2, and also lost without the receptor HCAR2. [[Linker2011,Chen2014]]`,
  fda:`Dimethyl fumarate 27 Mar 2013; diroximel fumarate 29 Oct 2019. [[FDA2026Approvals]]`,
  ind:DM_IND,
  dose:`Dimethyl fumarate 120 mg twice daily for 7 days, then 240 mg twice daily; diroximel fumarate 231 mg twice daily for 7 days, then 462 mg twice daily. Blood count with lymphocytes before starting, at 6 months, then every 6–12 months. [[TecfideraLabel2025,VumerityLabel2025]]`,
  trial:`DEFINE (against placebo, 2 years): ARR 0.17 versus 0.36, 53% lower. [[Gold2012]] CONFIRM: ARR 0.22 versus 0.40, 44% lower. [[Fox2012]] EVOLVE-MS-2 compared the two fumarates for gut side effects, not relapses. [[Naismith2020]]`,
  tw:`Not on the AAN 2018 higher-efficacy list; off-label rituximab outperformed dimethyl fumarate in RIFUND-MS. [[RaeGrant2018,Svenningsson2022]]`,
  ph:[`The drug is absorbed and converted to monomethyl fumarate, which reaches the body's cells, immune cells included.`,
      `Nrf2 (teal diamond) moves into the cell nucleus and switches on antioxidant defences. Whether this is how fumarates help people with MS is not known. [[TecfideraLabel2025,Linker2011]]`,
      `Fewer cells reach the lesion. The labels also require lymphocyte counts and advise considering interruption if they stay below 0.5 × 10⁹/L for more than 6 months. [[Gold2012,TecfideraLabel2025]]`],
  cap:'Look for: Nrf2 moving into the nucleus',
  pt:`Fumarates switch on the cell's own anti-stress defences. How that calms MS is still not fully understood.`,
  hook:`Fumarates: Nrf2 pathway; label lymphocyte monitoring; PML and liver injury are label warnings. Diroximel fumarate had fewer gut adverse events than dimethyl fumarate (34.8% versus 49.0%). [[TecfideraLabel2025,Naismith2020]]`},
 {id:'s1p',btn:'S1P modulators',nm:'S1P receptor modulators',ag:'fingolimod · siponimod · ozanimod · ponesimod',route:'oral',badge:'taken by mouth',tier:'mid',
  p:{mode:'held',k:.9,leave:.9,blood:.75,cns:.7,glyph:'mol',to:'gate'},
  mech:`Lymphocytes need the receptor S1P1 to leave lymph nodes. [[Matloubian2004]] These drugs first activate S1P1, then pull it inside the cell (functional antagonism), so cells cannot exit and blood lymphocyte counts fall. [[Chun2010,GilenyaLabel2026]] Fingolimod-phosphate binds S1P1, 3, 4 and 5; siponimod and ozanimod bind S1P1 and S1P5; ponesimod binds S1P1. [[GilenyaLabel2026,MayzentLabel2026,ZeposiaLabel2026,PonvoryLabel2025]]`,
  fda:`Fingolimod 21 Sep 2010; siponimod 26 Mar 2019; ozanimod 25 Mar 2020; ponesimod 18 Mar 2021. [[FDA2026Approvals]]`,
  ind:DM_IND+` Fingolimod's label extends this to patients 10 years and older. [[GilenyaLabel2026]]`,
  dose:`Fingolimod 0.5 mg once daily (0.25 mg at 40 kg or less), with at least 6 hours of first-dose observation for bradycardia. [[GilenyaLabel2026]] Siponimod needs CYP2C9 genotyping and titration; CYP2C9*3/*3 is a contraindication. [[MayzentLabel2026]] Ozanimod is titrated from 0.23 mg to 0.92 mg by day 8; ponesimod over 14 days from 2 mg to 20 mg. [[ZeposiaLabel2026,PonvoryLabel2025]]`,
  trial:`FREEDOMS (fingolimod against placebo, 24 months): ARR 0.18 versus 0.40. [[Kappos2010]] TRANSFORMS (against IM interferon): 0.16 (95% CI 0.12–0.21) versus 0.33 (0.26–0.42). [[Cohen2010]] SUNBEAM and RADIANCE (ozanimod against IM interferon): rate ratio 0.52 (0.41–0.66) and 0.62 (0.51–0.77). [[Comi2019,Cohen2019]] OPTIMUM (ponesimod against teriflunomide): ARR 0.202 versus 0.290, 30.5% lower. [[Kappos2021]] EXPAND (siponimod in SPMS): disability HR 0.79 (0.65–0.95). [[Kappos2018]]`,
  tw:`AAN 2018 lists fingolimod with alemtuzumab, natalizumab and ocrelizumab as more effective than the older self-injectables, so its own table row is tagged higher. Siponimod, ozanimod and ponesimod were approved after that statement; ozanimod and ponesimod beat active comparators head to head. [[RaeGrant2018,FDA2026Approvals,Comi2019,Kappos2021]]`,
  ph:[`The drug is absorbed and reaches the lymph node exit, where S1P1 receptors (teal dots) let lymphocytes out.`,
      `The drug pulls S1P1 inside the cells. Lymphocytes that reach the exit cannot leave, so they collect in the node and the blood empties. [[Chun2010,Matloubian2004]]`,
      `Few cells reach the CNS. The cells are not killed: when the drug stops they leave again, and the labels warn of a severe increase in disability after stopping. [[GilenyaLabel2026,MayzentLabel2026,ZeposiaLabel2026]]`],
  cap:'Look for: cells pile up in the node; the blood empties',
  pt:`S1P modulators lock the exit door of the lymph nodes. The immune cells are kept in, not destroyed, so the effect wears off when the drug stops.`,
  hook:`S1P modulators = sequestration, not depletion. Fingolimod: first-dose bradycardia observation, macular oedema (fundus check at 3–4 months), rebound after stopping. [[GilenyaLabel2026,Hatcher2016]]`},
 {id:'clad',btn:'Cladribine',nm:'Cladribine tablets',ag:'cladribine (Mavenclad)',route:'oral',badge:'tablets (by mouth)',tier:'high',
  p:{mode:'none',dep:'TB',frac:.65,leave:.6,blood:.6,cns:.7,glyph:'mol',to:'cells'},
  mech:`A purine antimetabolite thought to deplete B and T lymphocytes by impairing DNA synthesis. [[MavencladLabel2026]] It resists adenosine deaminase, [[Murphy2010]] and lymphocytes, with a high ratio of deoxycytidine kinase to 5′-nucleotidase, trap its phosphorylated form, which breaks DNA and kills the cell. [[Leist2011]]`,
  fda:`Mavenclad 29 Mar 2019. [[FDA2026Approvals]]`,
  ind:`Relapsing forms in adults, but not clinically isolated syndrome; generally recommended after an inadequate response to, or intolerance of, another drug. [[MavencladLabel2026]]`,
  dose:`A cumulative 3.5 mg/kg by mouth, split into 2 yearly courses of 1.75 mg/kg; each course is 2 cycles of 4 or 5 days. No cladribine in the following 2 years. Lymphocytes must be normal before course 1 and at least 800 cells/µL before course 2. [[MavencladLabel2026]]`,
  trial:`CLARITY (1326 people, against placebo, 96 weeks): ARR 0.14 versus 0.33; relapse-free 79.7% versus 60.9%; disability HR 0.67 (95% CI 0.48–0.93). [[Giovannoni2010]] Cochrane 2026: relapses RR 0.53 (0.45–0.62). [[Celani2026]]`,
  tw:`Cochrane 2024: high-certainty relapse reduction over 24 months (RR 0.53, 95% CI 0.44–0.64). [[GonzalezLorenzo2024]]`,
  ph:[`The tablets are taken on a few days only. The drug enters lymphocytes (teal diamonds), which cannot break it down. [[Murphy2010]]`,
      `Inside lymphocytes it builds up and breaks DNA. Many T and B cells die (bursts), wherever they are. [[Leist2011,MavencladLabel2026]]`,
      `Fewer lymphocytes are left to attack. Counts are lowest 2–3 months after each cycle and then rebuild: see the 24-month chart below. [[MavencladLabel2026]]`],
  cap:'Look for: T and B cells burst; some survive',
  pt:`Cladribine is a short course of tablets that removes many immune cells. The body then rebuilds them over months.`,
  hook:`Cladribine is a pulsed immune reconstitution therapy: 2 short yearly courses, then none for 2 years. Boxed warning: malignancy and teratogenicity. [[MavencladLabel2026]]`},
 {id:'nat',btn:'Natalizumab',nm:'Natalizumab (anti-VLA-4)',ag:'natalizumab (Tysabri) · natalizumab-sztn (Tyruko, biosimilar)',route:'iv',badge:'IV infusion',tier:'high',
  p:{mode:'block',k:.92,leave:0,blood:0,cns:.7,glyph:'ab',to:'blood'},
  mech:`A monoclonal antibody against the α4 subunit of α4β1 (VLA-4) and α4β7 integrins. It blocks leukocyte adhesion to VCAM-1 on activated endothelium, so cells cannot dock and cross into inflamed tissue. [[TyrukoLabel2025,Yednock1992]]`,
  fda:`Tysabri 23 Nov 2004, with a further efficacy supplement on 5 Jun 2006; biosimilar natalizumab-sztn (Tyruko) 24 Aug 2023. [[FDA2026Approvals]]`,
  ind:DM_IND+` The EU indication is narrower: highly active relapsing-remitting MS. [[EMATysabri2026]]`,
  dose:`300 mg IV over one hour every 4 weeks, prescribed only within a REMS programme. Boxed warning: PML, with anti-JCV antibodies, treatment duration and prior immunosuppressants as risk factors. [[TyrukoLabel2025]]`,
  trial:`AFFIRM (942 people, against placebo): relapse rate at 1 year 68% lower; sustained disability over 2 years 17% versus 29% (HR 0.58, 95% CI 0.43–0.77). [[Polman2006]] SENTINEL (added to interferon): ARR 0.34 versus 0.75. [[Rudick2006]]`,
  tw:`On the AAN 2018 higher-efficacy list; Cochrane 2024 high certainty (RR 0.56, 0.48–0.65). [[RaeGrant2018,GonzalezLorenzo2024]]`,
  ph:[`The antibody (teal Y) is infused into the blood and coats VLA-4 on circulating lymphocytes.`,
      `Coated cells reach the barrier but cannot grip VCAM-1 (red crosses), so they roll past and are carried on by the blood. [[TyrukoLabel2025,Yednock1992]]`,
      `Very few cells enter the CNS, yet blood lymphocytes are not removed. When infusions stop, activity can return: in RESTORE, MRI activity returned in 46% of those switched to placebo. [[Polman2006,Fox2014]]`],
  cap:'Look for: coated cells roll past VCAM-1',
  pt:`Natalizumab covers the "hands" immune cells use to grab the vessel wall, so they cannot climb into the brain.`,
  hook:`Natalizumab: anti-α4 integrin, blocking VLA-4 on VCAM-1. PML risk rises with anti-JCV antibodies, longer treatment and prior immunosuppressants (boxed warning). [[TyrukoLabel2025]]`},
 {id:'cd20',btn:'Anti-CD20',nm:'Anti-CD20 antibodies',ag:'ocrelizumab · ofatumumab · ublituximab · rituximab (off-label)',route:'iv',badge:'infusion or injection',tier:'high',
  p:{mode:'none',dep:'B',frac:.97,leave:.35,blood:.35,cns:.7,glyph:'ab',to:'cells',plasma:true},
  mech:`CD20-directed antibodies that lyse pre-B and mature B cells by antibody-dependent and complement-mediated cytolysis. [[OcrevusLabel2026,KesimptaLabel2026,BriumviLabel2026]] Stem cells, pro-B cells, many plasmablasts and long-lived plasma cells carry no CD20, so they are spared. [[Greenfield2018]] The response can come as early as 8–12 weeks, before immunoglobulin falls, pointing to B cells' antigen presentation and cytokines rather than antibody. [[Reich2018]]`,
  fda:`Ocrelizumab IV 28 Mar 2017; ofatumumab (MS) 20 Aug 2020; ublituximab 28 Dec 2022; SC ocrelizumab (Ocrevus Zunovo) 13 Sep 2024. [[FDA2026Approvals]] Rituximab is not approved for MS. [[Svenningsson2022]]`,
  ind:`Ofatumumab and ublituximab carry the shared relapsing-forms wording. Ocrelizumab is the only label here that includes primary progressive MS; it also covers relapsing forms in adults and relapsing-remitting MS from age 10 at 25 kg or more. [[KesimptaLabel2026,BriumviLabel2026,OcrevusLabel2026]]`,
  dose:`Ocrelizumab 300 mg IV, 300 mg two weeks later, then 600 mg every 6 months. [[OcrevusLabel2026]] SC ocrelizumab 920 mg every 24 weeks (OCARINA II). [[Newsome2025]] Ofatumumab 20 mg SC at weeks 0, 1 and 2, then monthly from week 4. [[KesimptaLabel2026]] Ublituximab 150 mg IV, 450 mg two weeks later, then 450 mg every 24 weeks. [[BriumviLabel2026]] The labels list hepatitis B screening before the first dose. [[OcrevusLabel2026,KesimptaLabel2026]]`,
  trial:`OPERA I/II (ocrelizumab against SC interferon): ARR 0.16 versus 0.29, 46% and 47% lower; disability HR 0.60 (95% CI 0.45–0.81). [[Hauser2017]] ORATORIO (PPMS): HR 0.76 (0.59–0.98). [[Montalban2017]] ASCLEPIOS (ofatumumab against teriflunomide): ARR 0.11 versus 0.22 and 0.10 versus 0.25. [[Hauser2020Ofatumumab]] ULTIMATE (ublituximab against teriflunomide): rate ratio 0.41 (0.27–0.62) and 0.51 (0.33–0.78). [[Steinman2022]] RIFUND-MS (off-label rituximab against dimethyl fumarate): relapse 3% versus 16%, risk ratio 0.19 (0.06–0.62). [[Svenningsson2022]]`,
  tw:`Ocrelizumab is on the AAN 2018 higher-efficacy list; ofatumumab and ublituximab beat teriflunomide head to head. [[RaeGrant2018,Hauser2020Ofatumumab,Steinman2022]]`,
  ph:[`The antibody (teal Y) enters the blood and finds CD20 on B cells, in the blood and in lymph nodes.`,
      `Bound B cells are destroyed (bursts). T cells carry on, and plasma cells in the node, which carry no CD20, are left untouched. [[OcrevusLabel2026,Greenfield2018]]`,
      `Blood B cells are low by day 14. Fewer attacks reach the CNS, while antibodies already made by plasma cells continue, so oligoclonal bands persist. [[OcrevusLabel2026,Reich2018,Comi2021]]`],
  cap:'Look for: B cells burst; plasma cells stay',
  pt:`Anti-CD20 medicines tag one kind of immune cell, the B cell, for destruction. The cells that make existing antibodies are spared.`,
  hook:`Anti-CD20 spares CD20-negative plasma cells (and stem and pro-B cells), so IgG usually holds and oligoclonal bands persist. Labels: monitor immunoglobulins; no live vaccines until B cells return. [[Greenfield2018,Comi2021,OcrevusLabel2026]]`},
 {id:'alem',btn:'Alemtuzumab',nm:'Alemtuzumab (anti-CD52)',ag:'alemtuzumab (Lemtrada)',route:'iv',badge:'IV infusion',tier:'high',
  p:{mode:'none',dep:'TB',frac:.93,leave:.9,blood:.9,cns:.7,glyph:'ab',to:'cells'},
  mech:`An antibody against CD52 on T and B lymphocytes, NK cells, monocytes and macrophages, which causes cytolysis. [[LemtradaLabel2025]] The immune system then rebuilds: B cells return first and overshoot, T cells take years. [[Ruck2015]]`,
  fda:`Lemtrada MS efficacy supplement 14 Nov 2014. [[FDA2026Approvals]]`,
  ind:`Relapsing forms in adults, not clinically isolated syndrome; the label says it "should generally be reserved" for an inadequate response to two or more drugs. [[LemtradaLabel2025]] EU use was restricted further in 2020. [[EMALemtrada2020]]`,
  dose:`Trial regimen (CARE-MS): 12 mg/day IV for 5 days, then for 3 days 12 months later. [[Cohen2012]] Label monitoring: monthly blood counts, creatinine and urinalysis, and thyroid tests every 3 months, until 48 months after the last infusion. [[LemtradaLabel2025]]`,
  trial:`CARE-MS I (no previous treatment, against SC interferon): relapse rate ratio 0.45 (95% CI 0.32–0.63); relapse-free at 2 years 78% versus 59%. [[Cohen2012]] CARE-MS II (relapse on first-line therapy): rate ratio 0.51 (0.39–0.65); sustained disability 13% versus 20% (HR 0.58, 0.38–0.87). [[Coles2012]]`,
  tw:`On the AAN 2018 higher-efficacy list; Cochrane 2024 high certainty (RR 0.57, 0.47–0.68). [[RaeGrant2018,GonzalezLorenzo2024]]`,
  ph:[`The antibody (teal Y) is infused over a few days and binds CD52, which lymphocytes carry.`,
      `T and B cells alike are destroyed (bursts), in the blood and in the node. Counts are lowest about 1 month after a course. [[LemtradaLabel2025]]`,
      `Almost no cells are left to attack. What grows back matters: see the chart below, where B cells overshoot and CD4 T cells recover slowly. [[Ruck2015,LemtradaLabel2025]]`],
  cap:'Look for: nearly every lymphocyte bursts',
  pt:`Alemtuzumab removes most immune cells with a few days of drips. The body regrows them over months to years.`,
  hook:`Alemtuzumab: CD52, pulsed reconstitution. The catch is secondary autoimmunity: thyroid disorders in 36.8% and immune thrombocytopenia in 2% across studies (label). [[LemtradaLabel2025]]`},
 {id:'btk',btn:'BTK inhibitors',nm:'BTK inhibitors',ag:'tolebrutinib · fenebrutinib',route:'oral',badge:'taken by mouth',tier:'na',
  p:{mode:'pass',k:.25,leave:0,blood:0,cns:.3,glyph:'mol',to:'micro',calm:true},
  mech:`Bruton's tyrosine kinase regulates maturation, survival, migration and activation of B cells and microglia. Brain-penetrant inhibitors are being tested because they could reach B cells and microglia on both sides of the barrier, where anti-CD20 antibodies penetrate poorly. [[Kramer2023]] Tolebrutinib is an oral, brain-penetrant BTK inhibitor. [[Fox2025]]`,
  fda:`None as of 20 Oct 2026. Tolebrutinib: Sanofi announced on 24 Dec 2025 that the FDA had issued a complete response letter for non-relapsing SPMS. [[Sanofi2025]] Fenebrutinib: on 30 Sep 2026 the FDA accepted Roche's application for relapsing MS and PPMS under priority review; no decision had been made by 20 Oct 2026. [[Roche2026]]`,
  ind:`EU: the marketing authorisation for Cenrifki (tolebrutinib 60 mg) was issued on 19 Jun 2026, after a CHMP positive opinion on 23 Apr 2026, for adults with SPMS "without relapses in the last 2 years", under additional monitoring. [[EMACenrifki2026]] No US label.`,
  dose:`HERCULES tested tolebrutinib 60 mg by mouth daily. [[Fox2025]] No US label.`,
  trial:`HERCULES (1131 people with non-relapsing SPMS, against placebo): 6-month confirmed disability progression 22.6% versus 30.7% (HR 0.69, 95% CI 0.55–0.88); ALT above 3 times the upper limit 4.0% versus 1.6%. [[Fox2025]] GEMINI 1 and 2 (relapsing MS): not superior to teriflunomide on ARR (0.13 versus 0.12; 0.11 versus 0.11). [[Oh2025]] Trial details are in <a href="#cure" data-go="cure">4.4 Toward a cure</a>.`,
  tw:`Not FDA-approved, so not placed in a tier here. [[Sanofi2025,Roche2026]]`,
  ph:[`The small molecule (teal diamonds) is absorbed and, unlike an antibody, crosses the blood-brain barrier. An antibody (Y) is shown bouncing off. [[Kramer2023]]`,
      `Behind the barrier it reaches microglia and B cells; the microglia beside the lesion calm down. [[Kramer2023,Fox2025]]`,
      `The aim is inflammation already inside the CNS rather than new cell traffic. HERCULES, in non-relapsing SPMS, slowed disability; GEMINI, in relapsing MS, did not beat teriflunomide on relapses. [[Fox2025,Oh2025]]`],
  cap:'Look for: small molecules cross; microglia calm',
  pt:`BTK inhibitors are medicines taken by mouth that can get inside the brain and quiet the immune cells that live there. In the US they are still under review.`,
  hook:`BTK inhibitors: brain-penetrant, acting on B cells and microglia. Tolebrutinib: EU-authorised as Cenrifki on 19 Jun 2026, but an FDA complete response letter in Dec 2025. Fenebrutinib: under FDA priority review. [[EMACenrifki2026,Sanofi2025,Roche2026]]`}
];
/* the table: d = first FDA approval (ISO) or null, dT = what to show instead */
const DM_TB=[
 {nm:'Interferon beta-1b (Betaseron)',cls:'Interferon',rt:'inj',rtT:'SC injection',fr:'Every other day',d:'1993-07-23',tr:`IFNB MS Study Group 1993 · against placebo`,ef:`2-year annual exacerbation rate 0.84 versus 1.27, about one-third lower [[IFNBMSSG1993]]`,ti:'mod'},
 {nm:'Interferon beta-1a IM (Avonex)',cls:'Interferon',rt:'inj',rtT:'IM injection',fr:'Weekly',d:'1996-05-17',tr:`MSCRG (Jacobs 1996) · against placebo`,ef:`Annual exacerbation rate 0.61 versus 0.90 [[Jacobs1996]]`,ti:'mod'},
 {nm:'Interferon beta-1a SC (Rebif)',cls:'Interferon',rt:'inj',rtT:'SC injection',fr:'Three times weekly',d:'2002-03-07',tr:`PRISMS · against placebo`,ef:`Relapses 27% lower (95% CI 14–39) on 22 µg; 33% (21–44) on 44 µg [[PRISMS1998]]`,ti:'mod'},
 {nm:'Peginterferon beta-1a (Plegridy)',cls:'Interferon',rt:'inj',rtT:'SC or IM injection',fr:'Every 14 days',d:'2014-08-15',tr:`ADVANCE · against placebo, 48 weeks`,ef:`ARR 0.256 versus 0.397; rate ratio 0.644 (95% CI 0.500–0.831) [[Calabresi2014]]`,ti:'mod'},
 {nm:'Glatiramer acetate (Copaxone)',cls:'Glatiramer acetate',rt:'inj',rtT:'SC injection',fr:'Daily (20 mg/mL) or three times weekly (40 mg/mL)',d:'1996-12-20',tr:`Johnson 1995; GALA · against placebo`,ef:`2-year relapse rate 29% lower; GALA ARR 0.331 versus 0.505, 34.0% lower [[Johnson1995,Khan2013]]`,ti:'mod'},
 {nm:'Teriflunomide (Aubagio)',cls:'DHODH inhibitor',rt:'oral',rtT:'By mouth',fr:'Once daily',d:'2012-09-12',tr:`TEMSO; TOWER · against placebo`,ef:`ARR 0.37 versus 0.54 (about 31% lower); TOWER 0.32 versus 0.50 [[OConnor2011,Confavreux2014]]`,ti:'mod'},
 {nm:'Dimethyl fumarate (Tecfidera)',cls:'Fumarate',rt:'oral',rtT:'By mouth',fr:'Twice daily',d:'2013-03-27',tr:`DEFINE; CONFIRM · against placebo`,ef:`ARR 0.17 versus 0.36 (53% lower); CONFIRM 0.22 versus 0.40 (44% lower) [[Gold2012,Fox2012]]`,ti:'mod'},
 {nm:'Diroximel fumarate (Vumerity)',cls:'Fumarate',rt:'oral',rtT:'By mouth',fr:'Twice daily',d:'2019-10-29',tr:`EVOLVE-MS-2 · against dimethyl fumarate, 5 weeks`,ef:`Tolerability trial, not a relapse trial: GI adverse events 34.8% versus 49.0% [[Naismith2020]]`,ti:'mod'},
 {nm:'Fingolimod (Gilenya)',cls:'S1P receptor modulator',rt:'oral',rtT:'By mouth',fr:'Once daily',d:'2010-09-21',tr:`FREEDOMS · against placebo; TRANSFORMS · against IM interferon`,ef:`ARR 0.18 versus 0.40; TRANSFORMS 0.16 versus 0.33 [[Kappos2010,Cohen2010]]`,ti:'high'},
 {nm:'Siponimod (Mayzent)',cls:'S1P receptor modulator',rt:'oral',rtT:'By mouth',fr:'Once daily after titration',d:'2019-03-26',tr:`EXPAND (SPMS) · against placebo`,ef:`Disability was the primary endpoint: 26% versus 32% progressed (HR 0.79, 95% CI 0.65–0.95) [[Kappos2018]]`,ti:'mid'},
 {nm:'Ozanimod (Zeposia)',cls:'S1P receptor modulator',rt:'oral',rtT:'By mouth',fr:'Once daily after titration',d:'2020-03-25',tr:`SUNBEAM; RADIANCE · against IM interferon`,ef:`ARR 0.18 versus 0.35 (rate ratio 0.52, 95% CI 0.41–0.66); 0.17 versus 0.28 (0.62, 0.51–0.77) [[Comi2019,Cohen2019]]`,ti:'mid'},
 {nm:'Ponesimod (Ponvory)',cls:'S1P receptor modulator',rt:'oral',rtT:'By mouth',fr:'Once daily after a 14-day titration',d:'2021-03-18',tr:`OPTIMUM · against teriflunomide`,ef:`ARR 0.202 versus 0.290 (30.5% lower) [[Kappos2021]]`,ti:'mid'},
 {nm:'Cladribine tablets (Mavenclad)',cls:'Purine antimetabolite',rt:'oral',rtT:'Tablets',fr:'Two yearly courses of 2 short cycles, then none for 2 years',d:'2019-03-29',tr:`CLARITY · against placebo, 96 weeks`,ef:`ARR 0.14 versus 0.33 [[Giovannoni2010]]`,ti:'high'},
 {nm:'Natalizumab (Tysabri)',cls:'Anti-α4 integrin antibody',rt:'iv',rtT:'IV infusion',fr:'Every 4 weeks',d:'2004-11-23',tr:`AFFIRM · against placebo`,ef:`Relapse rate at 1 year 68% lower [[Polman2006]]`,ti:'high'},
 {nm:'Natalizumab-sztn (Tyruko, biosimilar)',cls:'Anti-α4 integrin antibody',rt:'iv',rtT:'IV infusion',fr:'Every 4 weeks',d:'2023-08-24',tr:`Antelope · against reference natalizumab`,ef:`Equivalence trial on new active lesions (difference 0.17, 95% CI −0.61 to 0.94) [[Hemmer2023]]`,ti:'high'},
 {nm:'Ocrelizumab IV (Ocrevus)',cls:'Anti-CD20 antibody',rt:'iv',rtT:'IV infusion',fr:'Every 6 months after two starting doses',d:'2017-03-28',tr:`OPERA I/II · against SC interferon`,ef:`ARR 0.16 versus 0.29 (46% and 47% lower) [[Hauser2017]]`,ti:'high'},
 {nm:'Ocrelizumab SC (Ocrevus Zunovo)',cls:'Anti-CD20 antibody',rt:'inj',rtT:'SC injection',fr:'Every 24 weeks (OCARINA II)',d:'2024-09-13',tr:`OCARINA II · against IV ocrelizumab`,ef:`Exposure trial, not a relapse trial: drug exposure non-inferior to IV [[Newsome2025]]`,ti:'high'},
 {nm:'Ofatumumab (Kesimpta)',cls:'Anti-CD20 antibody',rt:'inj',rtT:'SC injection',fr:'Weeks 0, 1 and 2, then monthly',d:'2020-08-20',dN:'MS efficacy supplement',tr:`ASCLEPIOS I/II · against teriflunomide`,ef:`ARR 0.11 versus 0.22 and 0.10 versus 0.25 [[Hauser2020Ofatumumab]]`,ti:'high'},
 {nm:'Ublituximab (Briumvi)',cls:'Anti-CD20 antibody',rt:'iv',rtT:'IV infusion',fr:'Every 24 weeks after two starting doses',d:'2022-12-28',tr:`ULTIMATE I/II · against teriflunomide`,ef:`ARR 0.08 versus 0.19 (rate ratio 0.41, 95% CI 0.27–0.62); 0.09 versus 0.18 (0.51, 0.33–0.78) [[Steinman2022]]`,ti:'high'},
 {nm:'Rituximab (off-label)',cls:'Anti-CD20 antibody',rt:'iv',rtT:'IV infusion',fr:'Every 6 months in RIFUND-MS',d:null,dT:'Not approved for MS',tr:`RIFUND-MS · against dimethyl fumarate`,ef:`Relapse over 24 months 3% versus 16% (risk ratio 0.19, 95% CI 0.06–0.62) [[Svenningsson2022]]`,ti:'high'},
 {nm:'Alemtuzumab (Lemtrada)',cls:'Anti-CD52 antibody',rt:'iv',rtT:'IV infusion',fr:'Two yearly courses (5 days, then 3 days)',d:'2014-11-14',dN:'MS efficacy supplement',tr:`CARE-MS I (against SC interferon beta-1a); CARE-MS II (against interferon beta-1a)`,ef:`Relapse rate ratio 0.45 (95% CI 0.32–0.63) and 0.51 (0.39–0.65) [[Cohen2012,Coles2012]]`,ti:'high'},
 {nm:'Mitoxantrone (historic)',cls:'Immunosuppressant',rt:'iv',rtT:'IV infusion',fr:'Every 3 months in MIMS; lifetime limit 140 mg/m² (label)',d:null,dT:'Date not in our sources',tr:`MIMS · against placebo`,ef:`Improved a combined clinical outcome (difference 0.30, 95% CI 0.17–0.44) [[Hartung2002,MitoxantroneLabel2025]]`,ti:'hist'},
 {nm:'Tolebrutinib (Cenrifki in the EU)',cls:'BTK inhibitor',rt:'oral',rtT:'By mouth',fr:'Once daily (60 mg in HERCULES)',d:null,dT:'FDA complete response letter, Dec 2025; EU authorised 19 Jun 2026',tr:`HERCULES (SPMS) · against placebo; GEMINI · against teriflunomide`,ef:`GEMINI: not superior on ARR (0.13 versus 0.12; 0.11 versus 0.11) [[Fox2025,Oh2025,Sanofi2025,EMACenrifki2026]]`,ti:'na'},
 {nm:'Fenebrutinib',cls:'BTK inhibitor',rt:'oral',rtT:'By mouth',fr:'Not in our sources',d:null,dT:'Under FDA priority review (accepted 30 Sep 2026)',tr:`See <a href="#cure" data-go="cure">4.4 Toward a cure</a>`,ef:`No decision by 20 Oct 2026 [[Roche2026]]`,ti:'na'}
];
/* 24-month lymphocyte chart: stepper phases (months) and the published anchors */
const DL_STEPS=[
 {from:0,at:0,k:'Month 0',t:'First dose',
  txt:`Anti-CD20 infusions and daily S1P modulator doses begin continuous treatment. Cladribine (course 1: two short cycles of tablets) and alemtuzumab (5 days of infusions) begin a pulse. [[OcrevusLabel2026,GilenyaLabel2026,MavencladLabel2026,Cohen2012]]`},
 {from:.4,at:1,k:'Months 1 to 3',t:'Lowest counts',
  txt:`Alemtuzumab counts are lowest about 1 month after the course (mean CD4 count 40/µL). Cladribine counts are lowest 2–3 months after a cycle. Anti-CD20 has removed blood B cells since about day 14. S1P modulators hold lymphocytes in the nodes, so blood counts are low without the cells being killed. [[LemtradaLabel2025,MavencladLabel2026,OcrevusLabel2026,Chun2010]]`},
 {from:3.5,at:7,k:'Months 4 to 11',t:'Rebuild or hold',
  txt:`No pulsed drug is given now, and counts rebuild. Alemtuzumab B cells usually recover within 6 months; cladribine counts took a median of about 28 weeks to climb back to 800 cells/µL in those who fell below 500. The continuous drugs hold counts down only while dosing continues. [[LemtradaLabel2025,MavencladLabel2026]]`},
 {from:11.5,at:12,k:'Month 12',t:'Second course',
  txt:`Cladribine course 2 needs at least 800 cells/µL; it can be delayed up to 6 months, and if recovery takes longer no more cladribine is given. Alemtuzumab course 2 is 3 days. By now alemtuzumab B cells have overshot to 124–165% of baseline, while CD4 T cells are still low (mean 270/µL). [[MavencladLabel2026,Cohen2012,Ruck2015,LemtradaLabel2025]]`},
 {from:12.5,at:18,k:'Year 2 and after',t:'Year 2 and beyond',
  txt:`The cladribine label gives no cladribine in the following 2 years. Alemtuzumab CD8 T cells take about 31 months and CD4 T cells about 60 months to recover fully, and label monitoring runs to 48 months after the last infusion. Stopping a continuous drug reverses it: B cells took a median of 72 weeks to return after the last ocrelizumab infusion. [[MavencladLabel2026,Ruck2015,LemtradaLabel2025,OcrevusLabel2026]]`}
];
DL_STEPS.forEach(s=>{s.pt=`Some medicines work only while they keep being given. Others are given as a short burst that removes many immune cells, and then the body rebuilds them.`;
  s.hook=`Continuous (anti-CD20, S1P modulators) versus pulsed immune reconstitution therapy (cladribine, alemtuzumab). S1P: sequestration, reversible, rebound risk on stopping. Anti-CD20: depletion that spares CD20-negative plasma cells. Pulsed: deplete, then rebuild.`});
const DL_AN=[
 {n:1,l:0,m:.47,f:'cd',txt:`Blood B cells are low by day 14 after ocrelizumab. [[OcrevusLabel2026]]`},
 {n:2,l:0,m:22.57,f:'cd',only:'last',txt:`After the last infusion, B cells took a median of 72 weeks to return (shown with "Last anti-CD20 infusion at month 6"). [[OcrevusLabel2026,Hauser2017]]`},
 {n:3,l:1,m:12.92,at:14.3,f:'s1p',only:'stop',v:1.45,txt:`Early evidence: severe rebound relapses 4–16 weeks after stopping fingolimod in 5 of 46 people (10.9%) in one case series (shaded; shown with "Stop the S1P modulator"). [[Hatcher2016]]`},
 {n:4,l:2,m:2.5,f:'cl',txt:`Cladribine: lymphocyte counts are lowest 2–3 months after each cycle. [[MavencladLabel2026]]`},
 {n:5,l:2,m:8.9,f:'cl',txt:`Median recovery from below 500 to at least 800 cells/µL took about 28 weeks. [[MavencladLabel2026]]`},
 {n:6,l:2,m:12,f:'cl',txt:`Course 2 needs at least 800 cells/µL. [[MavencladLabel2026]]`},
 {n:7,l:3,m:1,f:'aB',txt:`Alemtuzumab: counts are lowest about 1 month after a course; mean CD4 count 40/µL at month 1. [[LemtradaLabel2025]]`},
 {n:8,l:3,m:6,f:'aB',txt:`B cells usually recover within 6 months. [[LemtradaLabel2025]]`},
 {n:9,l:3,m:12,f:'aB',br:[1.24,1.65],txt:`B cells overshoot to 124–165% of baseline at 12 months (bracket). [[Ruck2015]]`},
 {n:10,l:3,m:12,f:'aT',txt:`Mean CD4 count 270/µL at month 12; full recovery takes about 60 months for CD4 and 31 months for CD8 T cells. [[LemtradaLabel2025,Ruck2015]]`}
];
/* monotone cubic through anchor points: an interpolated curve never overshoots the values it joins */
function dmMono(P){const n=P.length,x=P.map(p=>p[0]),y=P.map(p=>p[1]),d=[],t=[];
  for(let i=0;i<n-1;i++)d.push((y[i+1]-y[i])/(x[i+1]-x[i]));
  t[0]=d[0];t[n-1]=d[n-2];
  for(let i=1;i<n-1;i++)t[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
  for(let i=0;i<n-1;i++){if(d[i]===0){t[i]=t[i+1]=0;continue}const a=t[i]/d[i],b=t[i+1]/d[i],h=a*a+b*b;if(h>9){const k=3/Math.sqrt(h);t[i]=k*a*d[i];t[i+1]=k*b*d[i]}}
  return v=>{if(v<=x[0])return y[0];if(v>=x[n-1])return y[n-1];let i=0;while(v>x[i+1])i++;
    const h=x[i+1]-x[i],s=(v-x[i])/h,s2=s*s,s3=s2*s;
    return (2*s3-3*s2+1)*y[i]+(s3-2*s2+s)*h*t[i]+(-2*s3+3*s2)*y[i+1]+(s3-s2)*h*t[i+1]}}
function dmAlong(pts,u){u=clamp(u);let L=[],tot=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(d);tot+=d}
  let x=u*tot;for(let i=0;i<L.length;i++){if(x<=L[i]||i===L.length-1){const k=L[i]?clamp(x/L[i]):0;return[lerp(pts[i][0],pts[i+1][0],k),lerp(pts[i][1],pts[i+1][1],k)]}x-=L[i]}}
function dmMol(x,y,o=1,s=4){return `<path d="M${f1(x)} ${f1(y-s)}l${s} ${s} ${-s} ${s} ${-s} ${-s}z" style="fill:var(--rx);stroke:var(--panel);stroke-width:.8;opacity:${f1(o)}"/>`}
function dmChain(x,y,o=1){return `<path d="M${f1(x-7)} ${f1(y)}l3.5 -4 3.5 4 3.5 -4 3.5 4" style="fill:none;stroke:var(--rx);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;opacity:${f1(o)}"/>`}
function dmDate(iso){const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],p=iso.split('-');return `${+p[2]} ${M[+p[1]-1]} ${p[0]}`}

inits.dmt=()=>{
  /* ---------------- 1. the pathway map ---------------- */
  const svg=$('#dmSvg'),rg=$('#dmT');
  let D=DM_D.find(d=>d.id==='s1p');
  const R=rng(41);
  const CELLS=Array.from({length:24},(_,i)=>({i,b:i%5===1||i%5===3,r:R(),q:R(),off:R(),hx:R(),hy:R(),dock:i%3,tx:R(),ty:R(),w:R()*6.283}));
  const MOLS=Array.from({length:9},(_,i)=>({i,a:R(),b:R(),c:R()}));
  const LW={VW:720,VH:500,horiz:false,
    node:{cx:110,cy:255,rx:86,ry:138},fol:[ [80,206,28],[80,330,28] ],tz:[142,284,22,50],slot:[124,160],slotLbl:[110,104,'middle'],
    gate:[176,166],entry:[268,136],gateLbl:[226,180,'middle'],nodeLbl:[ [110,412,'middle'],[110,426,'middle'] ],
    plasma:[ [150,300],[160,334] ],
    ves:{x:262,y:100,w:206,h:326},flowLbl:[272,420,'start'],
    wall:{x:468,w:28},docks:[190,280,370],btk:236,
    cns:{x:500,y:100,w:215,h:326},fib:[150,250,350],fx0:512,fx1:708,demy:[.3,.7],les:[610,250,74,60],
    macs:[ [562,302],[662,198] ],tgt:[578,218,64,64],
    badge:{x:286,y:50,w:160,h:28},bOut:[366,80],
    cap:[20,452],met:{y:472},vcLbl:[462,150,'end'],abLbl:[456,352,'end']};
  const LN={VW:400,VH:760,horiz:true,
    node:{cx:200,cy:110,rx:150,ry:66},fol:[ [140,95,24],[260,95,24] ],tz:[200,135,48,14],slot:[300,122],slotLbl:[388,38,'end'],
    gate:[85,152],entry:[64,252],gateLbl:[92,216,'start'],nodeLbl:[ [120,196,'start'] ],
    plasma:[ [318,108],[296,142] ],
    ves:{x:16,y:244,w:368,h:136},flowLbl:[384,374,'end'],
    wall:{y:380,h:26},docks:[192,266,340],btk:229,
    cns:{x:16,y:410,w:368,h:240},fib:[482,552,622],fx0:20,fx1:380,demy:[.4,.8],les:[236,552,96,50],
    macs:[ [104,517],[342,587] ],tgt:[196,526,80,50],
    badge:{x:222,y:206,w:166,h:28},bOut:[305,236],
    cap:[16,672],met:{y:690},abLbl:[376,278,'end']};
  let L=LW;
  /* geometry helpers that read the current layout */
  const flow=(p,c)=>L.horiz?[L.ves.x+p*L.ves.w,L.ves.y+16+c*(L.ves.h-40)]:[L.ves.x+16+c*(L.ves.w-36),L.ves.y+p*L.ves.h];
  const dockP=k=>L.horiz?(L.docks[k]-L.ves.x)/L.ves.w:(L.docks[k]-L.ves.y)/L.ves.h;
  const dockIn=k=>L.horiz?[L.docks[k],L.wall.y-9]:[L.wall.x-9,L.docks[k]];
  const dockOut=k=>L.horiz?[L.docks[k],L.wall.y+L.wall.h+10]:[L.wall.x+L.wall.w+10,L.docks[k]];
  const home=c=>{if(c.b){const F=L.fol[c.i%2];return[F[0]+(c.hx-.5)*F[2]*1.1,F[1]+(c.hy-.5)*F[2]*1.1]}return[L.tz[0]+(c.hx-.5)*2*L.tz[2],L.tz[1]+(c.hy-.5)*2*L.tz[3]]};
  const target=c=>[L.tgt[0]+c.tx*L.tgt[2],L.tgt[1]+c.ty*L.tgt[3]];
  const dmE=t=>ease(ramp(t,.36,.62)), dmE2=t=>ease(ramp(t,.45,.8));
  const SP=4;   // journeys per unit of timeline
  /* where one cell is, and what it is doing, at time t */
  function cellAt(c,t){const P=D.p,ph=t*SP+c.off,k=Math.floor(ph),f=ph-k,tk=(k-c.off)/SP;
    let tl=null;if(P.dep&&(P.dep==='TB'||c.b)&&c.r<P.frac)tl=.38+(c.r/P.frac)*.26;
    if(tl!=null&&t>tl+.04)return null;
    const th2=P.th2&&!c.b&&c.i%3===0&&dmE(tk)>.5;
    let fate='go';
    if(!th2){
      if(P.mode==='held'&&c.r<P.k*dmE(tk+.22/SP))fate='held';
      else if(P.mode==='rest'&&c.r<P.k*dmE(tk))fate='rest';
      else if(P.mode==='block'&&c.r<P.k*dmE(tk+.5/SP))fate='block';
      else if(P.mode==='pass'&&c.r<P.k*dmE(tk+.5/SP))fate='pass';
      if(fate==='go'&&c.q<.26)fate='pass';}
    const hm=home(c),wd=[hm[0]+Math.sin(t*40+c.w)*3,hm[1]+Math.cos(t*33+c.w)*3];
    let pos,o=1,st='node';
    const prevHeld=(P.mode==='held'&&c.r<P.k*dmE(tk-1/SP+.22/SP))||(P.mode==='rest'&&c.r<P.k*dmE(tk-1/SP));
    if(fate==='held'||fate==='rest'){pos=wd;o=prevHeld?1:ramp(f,0,.05)}
    else if(f<.22){pos=wd;o=ramp(f,0,.05)}
    else if(f<.36){pos=dmAlong([wd,L.gate,L.entry],(f-.22)/.14);st='exit'}
    else{const pd=dockP(c.dock);st='blood';
      if(fate==='pass'){pos=dmAlong([L.entry,flow(.5,c.q*.7),flow(1.02,c.q*.7)],(f-.36)/.64);o=1-ramp(f,.9,1)}
      else if(f<.58)pos=dmAlong([L.entry,flow(pd-.14,.45),flow(pd-.03,.96)],(f-.36)/.22);
      else if(fate==='block'){pos=dmAlong([flow(pd-.03,.96),flow(Math.min(1.02,pd+.1),1),flow(1.02,.45)],(f-.58)/.42);o=1-ramp(f,.9,1);st='block'}
      else if(f<.66){pos=dmAlong([flow(pd-.03,.96),dockIn(c.dock)],(f-.58)/.08);st='dock'}
      else if(f<.74){pos=dmAlong([dockIn(c.dock),dockOut(c.dock)],(f-.66)/.08);st='cross'}
      else{pos=dmAlong([dockOut(c.dock),target(c)],ease((f-.74)/.2));o=1-ramp(f,.93,1);st='cns'}}
    return{x:pos[0],y:pos[1],o,st,fate,th2,tl,lys:tl!=null&&t>=tl?(t-tl)/.04:-1}}
  function drawCell(c,s,t){const P=D.p;if(!s||s.o<=0)return'';
    let g='';const col=c.b?'var(--bcell)':'var(--tcell)';
    if(s.lys>=0){for(let j=0;j<6;j++){const a=j/6*6.283+c.w,dd=4+12*s.lys;g+=`<circle cx="${f1(s.x+Math.cos(a)*dd)}" cy="${f1(s.y+Math.sin(a)*dd)}" r="${f1(2.6*(1-s.lys)+.3)}" style="fill:${col};opacity:${f1(1-s.lys)}"/>`}return g}
    const rest=s.fate==='rest';
    g+=c.b?bcell(s.x,s.y,rest?5.5:7,s.o*(rest?.55:1)):tcell(s.x,s.y,rest?5.5:7,s.o*(rest?.55:1),s.th2?'Th2':'T');
    if(s.th2)g+=`<circle cx="${f1(s.x)}" cy="${f1(s.y)}" r="12" style="fill:none;stroke:var(--rx);stroke-width:1.6;stroke-dasharray:3 2;opacity:${f1(s.o)}"/>`;
    if(s.th2&&s.st==='cns')for(let j=0;j<4;j++){const a=j*1.57+t*30,dd=14+3*Math.sin(t*50+j);g+=`<rect x="${f1(s.x+Math.cos(a)*dd-2.5)}" y="${f1(s.y+Math.sin(a)*dd-2.5)}" width="5" height="5" style="fill:var(--rx);opacity:${f1(s.o*.9)}"/>`}
    /* drug bound to the cell */
    if(D.id==='nat'&&(s.st==='blood'||s.st==='block'||s.st==='exit')&&c.r<P.k*dmE(t))g+=ab(s.x+7,s.y-6,4.2,40,'var(--rx)')+ab(s.x-7,s.y+5,4.2,220,'var(--rx)');
    if((D.id==='cd20'||D.id==='alem')&&s.tl!=null&&t>s.tl-.07)g+=ab(s.x+7,s.y-6,4.2,40,'var(--rx)')+ab(s.x-6,s.y-7,4.2,-40,'var(--rx)');
    if(D.id==='clad'&&s.tl!=null&&t>s.tl-.09)g+=dmMol(s.x+6,s.y-6,1,3.2);
    return g}
  function meters(t){const P=D.p,e=dmE2(t);return[1-P.leave*e,1-P.blood*e,1-P.cns*e]}
  const word=v=>v>=.85?'normal':v>=.45?'reduced':'low';
  function badgeIcon(x,y){const r=D.route;
    if(r==='oral')return `<rect x="${x}" y="${y-5}" width="18" height="10" rx="5" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.5"/><path d="M${x+9} ${y-5}v10" style="stroke:var(--rx);stroke-width:1.5"/>`;
    if(r==='inj')return `<path d="M${x} ${y+5}l4 -4M${x+3} ${y+2}l9 -9M${x+8} ${y-10}l6 6" style="stroke:var(--rx);stroke-width:2;stroke-linecap:round"/>`;
    return `<rect x="${x+2}" y="${y-10}" width="12" height="14" rx="3" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.5"/><path d="M${x+8} ${y+4}v7" style="stroke:var(--rx);stroke-width:1.5"/>`}
  /* where each drug glyph goes after reaching the bloodstream */
  function molTarget(m){const to=D.p.to,j=m.i;
    if(to==='gate'){const G=L.gate,Ee=L.entry,dx=Ee[0]-G[0],dy=Ee[1]-G[1],n=Math.hypot(dx,dy);return[G[0]+dx/n*(10+j%3*7)+(-dy/n)*((j%3-1)*7),G[1]+dy/n*(10+j%3*7)+(dx/n)*((j%3-1)*7)]}
    if(to==='apc'){const a=-2.6+j*.28;return[L.slot[0]+Math.cos(a)*(24+(j%2)*5),L.slot[1]+Math.sin(a)*(24+(j%2)*5)]}
    if(to==='micro'){const M=L.macs[j%2];return[M[0]+(m.a-.5)*30,M[1]+(m.b-.5)*24]}
    return flow(.3+m.a*.6,.1+m.b*.8)}
  function molPath(m){const pts=[L.bOut,flow(.22+m.a*.12,.2+m.c*.5)];
    if(D.p.to==='gate'||D.p.to==='apc')pts.push(L.entry);
    if(D.p.to==='micro'){const a=L.horiz?[L.btk,L.wall.y-6]:[L.wall.x-6,L.btk],b=L.horiz?[L.btk,L.wall.y+L.wall.h+6]:[L.wall.x+L.wall.w+6,L.btk];pts.push(a,b)}
    pts.push(molTarget(m));return pts}

  function draw(t){
    const N=vb(svg,'720 500','400 760');L=N?LN:LW;
    const P=D.p,e=dmE(t),e2=dmE2(t),arr=ramp(t,.2,.38);
    let s=`<rect width="${L.VW}" height="${L.VH}" rx="12" style="fill:var(--field)"/>`;
    /* zones */
    const V=L.ves,C=L.cns,No=L.node;
    s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="12" style="fill:var(--axon-soft);opacity:.55"/>`;
    s+=`<rect x="${V.x}" y="${V.y}" width="${V.w}" height="${V.h}" rx="16" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.5"/>`;
    /* red blood cells drifting with the flow */
    for(let j=0;j<16;j++){const p=(j*.0625+t*2.2+(j%3)*.02)%1,cc=(j*.37)%1,q=flow(p,cc);s+=`<ellipse cx="${f1(q[0])}" cy="${f1(q[1])}" rx="5" ry="3.2" style="fill:var(--vessel);opacity:.28"/>`}
    s+=`<text x="${L.flowLbl[0]}" y="${L.flowLbl[1]}" class="t-xs${L.flowLbl[2]==='end'?' t-end':''}">${N?'blood flow →':'↓ blood flow'}</text>`;
    /* endothelium: the barrier */
    if(N){const W=L.wall,n=8,cw=V.w/n;for(let j=0;j<n;j++){const x=V.x+j*cw;s+=`<rect x="${f1(x+1)}" y="${W.y}" width="${f1(cw-2)}" height="${W.h}" rx="6" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1"/><ellipse cx="${f1(x+cw/2)}" cy="${W.y+W.h/2}" rx="9" ry="4" style="fill:var(--nuc);opacity:.55"/>`;if(j)s+=`<rect x="${f1(x-1.5)}" y="${W.y+3}" width="3" height="${W.h-6}" style="fill:var(--ink);opacity:.45"/>`}
      L.docks.forEach(x=>s+=`<path d="M${x-6} ${W.y} q6 -8 12 0" style="fill:none;stroke:var(--gold);stroke-width:2.4;stroke-linecap:round"/>`)}
    else{const W=L.wall,n=7,ch=V.h/n;for(let j=0;j<n;j++){const y=V.y+j*ch;s+=`<rect x="${W.x}" y="${f1(y+1)}" width="${W.w}" height="${f1(ch-2)}" rx="6" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1"/><ellipse cx="${W.x+W.w/2}" cy="${f1(y+ch/2)}" rx="4" ry="9" style="fill:var(--nuc);opacity:.55"/>`;if(j)s+=`<rect x="${W.x+3}" y="${f1(y-1.5)}" width="${W.w-6}" height="3" style="fill:var(--ink);opacity:.45"/>`}
      L.docks.forEach(y=>s+=`<path d="M${W.x} ${y-6} q-8 6 0 12" style="fill:none;stroke:var(--gold);stroke-width:2.4;stroke-linecap:round"/>`)}
    /* CNS: three fibres, the middle one already demyelinated, and the lesion's activity halo */
    const A=1-P.cns*e2;
    L.fib.forEach((y,j)=>{s+=fiber(L.fx0,L.fx1,y,j===1?{demy:[L.demy],loss:1,seg:30,h:12}:{seg:30,h:12}).svg});
    const Le=L.les;s+=`<ellipse cx="${Le[0]}" cy="${Le[1]}" rx="${Le[2]}" ry="${Le[3]}" style="fill:var(--attack-soft);stroke:var(--attack);stroke-width:1.6;stroke-dasharray:5 4;opacity:${f1(.2+.6*A)}"/>`;
    const calm=P.calm?e:0;
    L.macs.forEach((M,j)=>s+=mac(M[0],M[1],11,1,(A>.55&&calm<.5)?1:0,5+j));
    /* lymph node */
    const G=L.gate,Ee=L.entry;
    s+=`<path d="M${G[0]} ${G[1]}L${Ee[0]} ${Ee[1]}" style="stroke:var(--line);stroke-width:15;stroke-linecap:round"/><path d="M${G[0]} ${G[1]}L${Ee[0]} ${Ee[1]}" style="stroke:var(--lymph);stroke-width:11;stroke-linecap:round"/>`;
    s+=`<ellipse cx="${No.cx}" cy="${No.cy}" rx="${No.rx}" ry="${No.ry}" style="fill:var(--lymph);stroke:var(--bcell);stroke-width:1.6"/>`;
    L.fol.forEach(F=>s+=`<circle cx="${F[0]}" cy="${F[1]}" r="${F[2]}" style="fill:var(--panel);fill-opacity:.35;stroke:var(--bcell);stroke-width:1;stroke-dasharray:3 3;opacity:.8"/>`);
    /* S1P1 receptors at the exit */
    {const dx=Ee[0]-G[0],dy=Ee[1]-G[1],n=Math.hypot(dx,dy),ux=dx/n,uy=dy/n,px=-uy,py=ux,pull=D.id==='s1p'?e:0;
      for(let j=-1;j<=1;j++){const x=G[0]+px*j*5-ux*14*pull,y=G[1]+py*j*5-uy*14*pull;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.8" style="fill:var(--rx);opacity:${f1(1-.55*pull)}"/>`}
      if(pull>0)s+=`<path d="M${f1(G[0]+ux*6+px*9)} ${f1(G[1]+uy*6+py*9)}L${f1(G[0]+ux*6-px*9)} ${f1(G[1]+uy*6-py*9)}" style="stroke:var(--rx);stroke-width:3.5;stroke-linecap:round;opacity:${f1(pull)}"/>`;}
    const gl=L.gateLbl;s+=`<text x="${gl[0]}" y="${gl[1]}" class="t-xs${gl[2]==='middle'?' t-mid':''}" style="${D.id==='s1p'&&e>.5?'fill:var(--rx);font-weight:700':''}">${D.id==='s1p'&&e>.5?'exit shut':'exit (S1P1)'}</text>`;
    const nl=D.p.plasma&&e>.3?(N?['plasma cells (no CD20) are spared']:['plasma cells (no CD20)','are spared']):(N?['B cells in follicles · T cells between']:['B cells in follicles,','T cells between them']);
    L.nodeLbl.forEach((q,j)=>{if(nl[j])s+=`<text x="${q[0]}" y="${q[1]}" class="t-xs${q[2]==='middle'?' t-mid':''}" style="${D.p.plasma&&e>.3?'fill:var(--plasma)':''}">${nl[j]}</text>`});
    if(D.p.plasma)L.plasma.forEach(q=>s+=plasma(q[0],q[1],8,1));
    /* vignettes in the node slot: antigen presentation (glatiramer), division (teriflunomide), Nrf2 (fumarates) */
    const Sx=L.slot[0],Sy=L.slot[1],sl=L.slotLbl;let slTxt='';
    if(D.id==='ga'){s+=mac(Sx,Sy,13,1,0,9);const fill=e>.5;/* MHC cups point up, into the node */
      [-2.4,-1.57,-.74].forEach((a,j)=>{const x=Sx+Math.cos(a)*15,y=Sy+Math.sin(a)*15;s+=`<path d="M${f1(x+Math.cos(a)*4-Math.sin(a)*5)} ${f1(y+Math.sin(a)*4+Math.cos(a)*5)} l${f1(Math.cos(a)*5)} ${f1(Math.sin(a)*5)} M${f1(x+Math.cos(a)*4+Math.sin(a)*5)} ${f1(y+Math.sin(a)*4-Math.cos(a)*5)} l${f1(Math.cos(a)*5)} ${f1(Math.sin(a)*5)}" style="stroke:var(--muted);stroke-width:1.6"/>`;
        s+=fill?dmChain(x+Math.cos(a)*9,y+Math.sin(a)*9,1):`<rect x="${f1(x+Math.cos(a)*9-3)}" y="${f1(y+Math.sin(a)*9-3)}" width="6" height="6" style="fill:var(--myelin);stroke:var(--myelin-line)"/>`});
      slTxt=fill?'MHC slots filled by glatiramer':'APC shows myelin fragments'}
    if(D.id==='teri'){const stall=e>.5,n=stall?1:[1,2,4][Math.floor((t*7)%3)],O=[ [0,0],[-8,-6],[8,-6],[-8,7],[8,7] ];
      for(let j=0;j<n;j++){const q=n===1?O[0]:O[j+1];s+=tcell(Sx+q[0],Sy+q[1],n===1?9:6.5,1,'T')}
      if(stall)s+=`<circle cx="${Sx}" cy="${Sy}" r="15" style="fill:none;stroke:var(--rx);stroke-width:1.8;stroke-dasharray:4 3"/>`;
      slTxt=stall?'DHODH blocked: division stalls':'activated T cell dividing'}
    if(D.id==='fum'){s+=`<circle cx="${Sx}" cy="${Sy}" r="15" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/><circle cx="${Sx+4}" cy="${Sy+2}" r="7" style="fill:var(--nuc);opacity:.7"/>`;
      if(arr>.6){const k=ramp(e,0,1);s+=dmMol(lerp(Sx-9,Sx+4,k),lerp(Sy-8,Sy+2,k),1,3.6)}
      slTxt=e>.5?'Nrf2 enters the nucleus':(arr>.6?'Nrf2 released':'a body cell')}
    if(slTxt)s+=`<text x="${sl[0]}" y="${sl[1]}" class="t-xs${sl[2]==='middle'?' t-mid':sl[2]==='end'?' t-end':''}" style="fill:var(--rx);font-weight:700">${slTxt}</text>`;
    /* interferon: cytokine signals in the blood */
    if(D.id==='ifn'){for(let j=0;j<12;j++){const q=flow((j*.083+t*1.6)%1,(j*.41+.1)%1);if(j<Math.round(12*(1-.65*e)))s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="2.8" style="fill:var(--attack)"/>`}
      for(let j=0;j<12;j++){const q=flow((j*.083+.04+t*1.6)%1,(j*.29+.3)%1);if(j<Math.round(12*e))s+=`<rect x="${f1(q[0]-2.6)}" y="${f1(q[1]-2.6)}" width="5.2" height="5.2" style="fill:var(--rx)"/>`}}
    /* natalizumab: docking blocked */
    if(D.id==='nat'&&e>.3)L.docks.forEach((d,j)=>{const q=dockIn(j),x=q[0]+(N?12:-4),y=q[1]+(N?-4:-12);s+=`<path d="M${f1(x-4)} ${f1(y-4)}l8 8m0 -8l-8 8" style="stroke:var(--bad);stroke-width:2.2;stroke-linecap:round;opacity:${f1(ramp(e,.3,.6))}"/>`});
    /* BTK: an antibody bounces off the barrier */
    if(D.id==='btk'&&arr>0){const ph=(t*3)%1,q0=L.horiz?flow(.75,.3):flow(.7,.4),q1=L.horiz?[L.docks[1]+40,L.wall.y-12]:[L.wall.x-12,L.docks[1]+45],k=bump(ph,0,1),x=lerp(q0[0],q1[0],k),y=lerp(q0[1],q1[1],k);
      s+=ab(x,y,6,N?180:90,'var(--rx)');s+=`<text x="${L.abLbl[0]}" y="${L.abLbl[1]}" class="t-xs t-end" style="fill:var(--rx)">antibodies cross poorly</text>`}
    /* cells */
    let cs='';CELLS.forEach(c=>{cs+=drawCell(c,cellAt(c,t),t)});s+=cs;
    /* drug glyphs */
    if(arr>0){MOLS.forEach(m=>{const u=ramp(t,.2+m.i*.012,.36+m.i*.012);if(u<=0)return;
      let q;const drift=D.p.to==='blood'||D.p.to==='cells';
      if(drift&&u>=1){q=flow((.3+m.a*.6+(t-.36-m.i*.012)*1.4)%1,.1+m.b*.8)}else q=dmAlong(molPath(m),ease(u));
      const fade=(D.id==='ifn'||D.p.to==='apc')?1-ramp(t,.37+m.i*.012,.45+m.i*.012):1;if(fade<=0)return;
      if(D.p.glyph==='ab')s+=ab(q[0],q[1],5.5,m.i*40,'var(--rx)');
      else if(D.p.glyph==='chain')s+=dmChain(q[0],q[1],fade);
      else s+=dmMol(q[0],q[1],fade)})}
    /* route badge */
    const B=L.badge;s+=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="14" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.4;opacity:${f1(.45+.55*ramp(t,.15,.22))}"/>`+badgeIcon(B.x+10,B.y+B.h/2)+`<text x="${B.x+34}" y="${B.y+B.h/2+3.5}" class="t-xs" style="fill:var(--ink)">${D.badge}</text>`;
    /* headers */
    if(N){s+=`<text x="16" y="20" class="t-sm">LYMPH NODE · where cells are activated</text><text x="104" y="236" class="t-sm">BLOODSTREAM</text>`;
      s+=`<text x="16" y="426" class="t-xs" style="${D.id==='nat'&&e>.5?'fill:var(--bad);font-weight:700':''}">${D.id==='nat'&&e>.5?'BARRIER · VLA-4 blocked':'BARRIER · VCAM-1 sites'}</text><text x="16" y="444" class="t-sm">CNS · myelin attacked</text>`}
    else{[ [105,'LYMPH NODE','cells are activated'],[366,'BLOODSTREAM','cells circulate'],[486,'BARRIER','cells dock, cross'],[612,'CNS','cells attack myelin'] ].forEach(h=>s+=`<text x="${h[0]}" y="22" class="t-sm t-mid" style="font-weight:600;fill:var(--ink)">${h[1]}</text><text x="${h[0]}" y="36" class="t-xs t-mid">${h[2]}</text>`);
      const vb2=D.id==='nat'&&e>.5;s+=`<text x="${L.vcLbl[0]}" y="${L.vcLbl[1]}" class="t-xs t-end" style="${vb2?'fill:var(--bad);font-weight:700':'fill:var(--gold)'}">${vb2?'VLA-4 blocked: no docking':'VCAM-1'}</text>`}
    /* caption and meters */
    s+=`<text x="${L.cap[0]}" y="${L.cap[1]}" class="${N?'t-xs':'t-sm'}" style="fill:var(--ink)">${t<.2?'Untreated: follow the cells from node to lesion':D.cap}</text>`;
    const mv=meters(t),ml=['Leaving the node','In the blood','Reaching the CNS'];
    mv.forEach((v,j)=>{const x=N?16:20+j*240,y=N?L.met.y+j*22:L.met.y,bx=N?132:x,by=N?y+2:y+6,wx=N?250:x+118,wy=N?y+10:y+14;
      s+=`<text x="${x}" y="${N?y+9:y}" class="t-xs">${ml[j]}</text><rect x="${bx}" y="${by}" width="110" height="8" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${bx}" y="${by}" width="${f1(110*clamp(v))}" height="8" rx="4" style="fill:var(--brand)"/><text x="${wx}" y="${wy}" class="t-sm" style="fill:var(--ink);font-weight:600">${word(v)}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(DM_PH,t);setSt(p);
    $('#dmNote').innerHTML=`<div class="kicker">Step ${p+1} of 4 · ${DM_PH[p].t}</div><h4>${D.nm}</h4><p>${p===0?DM_PH0:D.ph[p-1]}</p><p class="readout">Leaving the node: <b>${word(mv[0])}</b> · In the blood: <b>${word(mv[1])}</b> · Reaching the CNS: <b>${word(mv[2])}</b> (schematic)</p>`;
  }
  const stop=playWire(rg,$('#dmPlay'),draw,14000,'Replay','dmt');
  const setSt=stepWire($('#dmSteps'),DM_PH,rg,draw,stop);
  function card(){const T=DM_TIER[D.tier];
    $('#dmCard').innerHTML=`<div class="dm-card"><div class="kicker">Drug class card</div><p class="dm-agents">${D.ag}</p><dl class="kv">
      <div><dt>Mechanism</dt><dd>${D.mech}</dd></div>
      <div><dt>First FDA approval</dt><dd>${D.fda}</dd></div>
      <div><dt>Label indication</dt><dd>${D.ind}</dd></div>
      <div><dt>Route and dosing as published</dt><dd>${D.dose}</dd></div>
      <div><dt>Pivotal trial headline</dt><dd>${D.trial}</dd></div>
      <div><dt>Efficacy tier</dt><dd><span class="tag ${T[1]}">${T[0]}</span>${D.tw}</dd></div></dl>
      <div class="pt"><b>In plain words</b>${D.pt}</div><div class="hook"><b>Exam hook</b>${D.hook}</div></div>`}
  const pick=$('#dmPick');
  pick.innerHTML=DM_D.map(d=>`<button class="btn" data-dm="${d.id}" aria-pressed="${d.id===D.id}">${d.btn}</button>`).join('');
  function select(id,play){D=DM_D.find(d=>d.id===id);$$('[data-dm]',pick).forEach(b=>b.setAttribute('aria-pressed',b.dataset.dm===id));card();stop();
    if(!play){draw(+rg.value);return}
    if(RM){rg.value=DM_PH[2].at;draw(+rg.value);return}
    rg.value=0;draw(0);$('#dmPlay').click()}
  pick.addEventListener('click',ev=>{const b=ev.target.closest('[data-dm]');if(b)select(b.dataset.dm,true)});
  select(D.id,false);

  /* ---------------- 2. lymphocyte counts over 24 months ---------------- */
  const lsvg=$('#dlSvg'),lrg=$('#dlT');let stopS=false,lastCD=false;
  function curves(){return{
    cd:dmMono(lastCD?[ [0,1],[.47,.05],[6,.04],[13,.05],[17,.25],[22.57,.9],[24,.97] ]:[ [0,1],[.47,.05],[24,.04] ]),
    s1p:dmMono(stopS?[ [0,1],[.25,.3],[12,.3],[14,.95],[24,1] ]:[ [0,1],[.25,.3],[24,.3] ]),
    cl:dmMono([ [0,1],[2.5,.3],[8.9,.6],[12,.72],[14.5,.28],[20.9,.58],[24,.68] ]),
    aB:dmMono([ [0,1],[1,.03],[6,1],[12,1.45],[13,.03],[18,1],[24,1.4] ]),
    aT:dmMono([ [0,1],[1,.05],[12,.35],[13,.05],[24,.33] ])}}
  const LANES=[
    {k:'cd',nm:'Anti-CD20',sub:'B cells · continuous',sc:'infusion every 6 months',nl:'Anti-CD20 · B cells · continuous',col:'var(--bcell)'},
    {k:'s1p',nm:'S1P modulator',sub:'lymphocytes · continuous',sc:'taken daily by mouth',nl:'S1P modulator · lymphocytes · continuous',col:'var(--brand)'},
    {k:'cl',nm:'Cladribine',sub:'lymphocytes · pulsed',sc:'2 yearly courses',nl:'Cladribine · lymphocytes · pulsed',col:'var(--orange)'},
    {k:'al',nm:'Alemtuzumab',sub:'solid: B cells',sc:'dashed: CD4 T cells',nl:'Alemtuzumab · solid B, dashed CD4 T · pulsed',col:'var(--bcell)'}];
  $('#dlKey').innerHTML=DL_AN.map(a=>`<li id="dlK${a.n}"><b>${a.n}</b><span>${a.txt}</span></li>`).join('');
  function ldraw(m){
    const N=vb(lsvg,'720 440','400 640');
    const G=N?{x0:24,x1:356,lt:i=>40+i*146,rh:112,st:12,cT:16,cB:108,ax:600,VW:400,VH:640,cur:16}:{x0:170,x1:680,lt:i=>26+i*96,rh:84,st:12,cT:16,cB:80,ax:404,VW:720,VH:440,cur:18};
    const X=mm=>G.x0+mm/24*(G.x1-G.x0),Cv=curves();
    let s=`<rect width="${G.VW}" height="${G.VH}" rx="12" style="fill:var(--field)"/>`;
    const lanePath=(fn,top,a,b)=>{let d='';const n=Math.max(2,Math.ceil((b-a)*10));for(let i=0;i<=n;i++){const mm=a+(b-a)*i/n;d+=(i?'L':'M')+f1(X(mm))+' '+f1(top+G.cB-clamp(fn(mm),0,1.7)/1.7*(G.cB-G.cT))}return d};
    const Y=(top,v)=>top+G.cB-v/1.7*(G.cB-G.cT);
    LANES.forEach((ln,i)=>{const top=G.lt(i);
      s+=`<rect x="${G.x0-6}" y="${top}" width="${G.x1-G.x0+12}" height="${G.rh}" rx="8" style="fill:var(--panel);stroke:var(--line)"/>`;
      if(N)s+=`<text x="${G.x0-6}" y="${top-6}" class="t-sm" style="fill:var(--ink);font-weight:600">${ln.nl}</text>`;
      else s+=`<text x="16" y="${top+30}" class="t-lbl">${ln.nm}</text><text x="16" y="${top+46}" class="t-xs">${ln.sub}</text><text x="16" y="${top+60}" class="t-xs">${ln.sc}</text>`;
      s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(Y(top,1))}" y2="${f1(Y(top,1))}" class="grid"/><text x="${G.x1+8}" y="${f1(Y(top,1)+3)}" class="t-xs">start</text>`;
      s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(Y(top,0))}" y2="${f1(Y(top,0))}" class="axis"/>`;
      /* dosing strip */
      const sy=top+3;
      if(ln.k==='cd')(lastCD?[0,.5,6]:[0,.5,6,12,18]).forEach(d=>s+=`<path d="M${f1(X(d)-4)} ${sy}h8l-4 7z" style="fill:var(--rx)"/>`);
      if(ln.k==='s1p'){const e=stopS?12:24;s+=`<rect x="${f1(X(0))}" y="${sy+2}" width="${f1(X(e)-X(0))}" height="4" rx="2" style="fill:var(--rx);opacity:.75"/>`;if(stopS)s+=`<text x="${f1(X(12)+5)}" y="${sy+8}" class="t-xs" style="fill:var(--rx)">stopped</text>`}
      if(ln.k==='cl'||ln.k==='al')[0,12].forEach((d,j)=>s+=`<rect x="${f1(X(d))}" y="${sy}" width="${ln.k==='al'?(j?3:5):5}" height="8" rx="1.5" style="fill:var(--rx)"/><text x="${f1(X(d)+9)}" y="${sy+8}" class="t-xs" style="fill:var(--rx)">course ${j+1}</text>`);
      /* rebound window after stopping the S1P modulator */
      if(ln.k==='s1p'&&stopS&&m>=12)s+=`<rect x="${f1(X(12.92))}" y="${f1(Y(top,1.7))}" width="${f1(X(15.68)-X(12.92))}" height="${f1(Y(top,0)-Y(top,1.7))}" style="fill:var(--attack-soft);opacity:.8"/>`;
      /* curves: faint full path, then the drawn part up to the cursor */
      const fns=ln.k==='al'?[ [Cv.aB,''],[Cv.aT,'6 4'] ]:[ [Cv[ln.k],''] ];
      fns.forEach(([fn,da])=>{s+=`<path d="${lanePath(fn,top,0,24)}" style="fill:none;stroke:${ln.k==='al'&&da?'var(--tcell)':ln.col};stroke-width:1.5;opacity:.22${da?';stroke-dasharray:'+da:''}"/>`;
        if(m>0)s+=`<path d="${lanePath(fn,top,0,m)}" style="fill:none;stroke:${ln.k==='al'&&da?'var(--tcell)':ln.col};stroke-width:2.6${da?';stroke-dasharray:'+da:''}"/>`;
        s+=`<circle cx="${f1(X(m))}" cy="${f1(Y(top,clamp(fn(m),0,1.7)))}" r="3.6" style="fill:${ln.k==='al'&&da?'var(--tcell)':ln.col};stroke:var(--panel);stroke-width:1.2"/>`});
    });
    /* anchors */
    const fnOf={cd:Cv.cd,s1p:Cv.s1p,cl:Cv.cl,aB:Cv.aB,aT:Cv.aT};
    DL_AN.forEach(a=>{const on=m>=a.m-.001&&(!a.only||(a.only==='last'?lastCD:stopS));const li=$('#dlK'+a.n);if(li)li.classList.toggle('on',on);if(!on)return;
      const top=G.lt(a.l),v=a.v!=null?a.v:fnOf[a.f](a.m),x=X(a.at||a.m),y=Y(top,v);
      if(a.br)s+=`<path d="M${f1(x+10)} ${f1(Y(top,a.br[0]))}h4V${f1(Y(top,a.br[1]))}h-4" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="7" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/><text x="${f1(x)}" y="${f1(y+3)}" class="t-mid" style="font:700 8.5px var(--mono);fill:var(--rx)">${a.n}</text>`});
    /* month axis and cursor */
    for(let mm=0;mm<=24;mm+=3)s+=`<line x1="${f1(X(mm))}" x2="${f1(X(mm))}" y1="${G.ax}" y2="${G.ax+5}" class="axis"/><text x="${f1(X(mm))}" y="${G.ax+16}" class="t-xs t-mid">${mm}</text>`;
    s+=`<text x="${G.x1}" y="${G.ax+32}" class="t-xs t-end">months after the first dose</text>`;
    const cx=X(m);LANES.forEach((ln,i)=>s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${G.lt(i)}" y2="${G.lt(i)+G.rh}" style="stroke:var(--ink);stroke-width:1;opacity:.5"/>`);s+=`<text x="${f1(clamp(cx,G.x0+30,G.x1-30))}" y="${G.cur}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">month ${f1(m)}</text>`;
    lsvg.innerHTML=s;
    const p=phaseOf(DL_STEPS,m);lset(p);
    const w=(v,a,b,c)=>v<.25?a:v<.8?b:c;
    const rb=stopS&&m>=12.92&&m<=15.68?' (inside the reported rebound window)':'';
    const rd=`Month ${f1(m)}. Anti-CD20: ${w(Cv.cd(m),'B cells depleted','B cells returning','B cells back near the start')}. S1P modulator: ${Cv.s1p(m)<.5?'lymphocytes held in nodes, blood count low':'blood count back near the start'+rb}. Cladribine: ${w(Cv.cl(m),'near its lowest','partly recovered','near the start')}. Alemtuzumab: B cells ${Cv.aB(m)>1.1?'above the start (overshoot)':w(Cv.aB(m),'very low','recovering','back near the start')}, CD4 T cells ${w(Cv.aT(m),'very low','recovering','near the start')}.`;
    $('#dlNote').innerHTML=noteHTML(DL_STEPS[p])+`<p class="readout">${rd}</p>`;
  }
  const lstop=playWire(lrg,$('#dlPlay'),ldraw,16000,'Replay','dmt');
  const lset=stepWire($('#dlSteps'),DL_STEPS,lrg,ldraw,lstop);
  const tg=(id,fn)=>$(id).addEventListener('click',e=>{const b=e.currentTarget,on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);fn(on);ldraw(+lrg.value)});
  tg('#dlStop',on=>stopS=on);tg('#dlLast',on=>lastCD=on);
  ldraw(+lrg.value);

  /* ---------------- 3. the table ---------------- */
  let sk='d',sd=1,fr='all',ft='all';
  const COLS=[ ['nm','Medicine'],['cls','Class'],['rt','Route'],['fr',null,'Frequency (label or trial)'],['d','First FDA approval'],['tr',null,'Pivotal trial'],['ef',null,'Relapse-rate effect'] ];
  function tbl(){
    let rows=DM_TB.filter(r=>(fr==='all'||r.rt===fr)&&(ft==='all'||r.ti===ft||(ft==='na'&&r.ti==='hist')));
    const key=r=>sk==='d'?(r.d||'9999'):sk==='rt'?r.rtT:String(r[sk]).toLowerCase();
    rows=rows.slice().sort((a,b)=>{const A=key(a),B=key(b);return A<B?-sd:A>B?sd:0});
    let h='<table><thead><tr>'+COLS.map(c=>{if(!c[1])return `<th scope="col">${c[2]}</th>`;const as=sk===c[0]?(sd>0?'ascending':'descending'):'none';
      return `<th scope="col" aria-sort="${as}"><button class="dm-sort" data-k="${c[0]}">${c[1]}<span aria-hidden="true">${as==='ascending'?'▲':as==='descending'?'▼':'↕'}</span></button></th>`}).join('')+'</tr></thead><tbody>';
    rows.forEach(r=>{const T=DM_TIER[r.ti];h+=`<tr><th scope="row">${r.nm}<br><span class="tag ${T[1]}">${T[0]}</span></th><td>${r.cls}</td><td>${r.rtT}</td><td>${r.fr}</td>${r.d?`<td><span class="dm-date">${dmDate(r.d)}</span>${r.dN?' ('+r.dN+')':''} [[FDA2026Approvals]]</td>`:`<td>${r.dT}</td>`}<td>${r.tr}</td><td>${r.ef}</td></tr>`});
    if(!rows.length)h+=`<tr><td colspan="7">No medicine matches both filters.</td></tr>`;
    $('#dmTbl').innerHTML=h+'</tbody></table>';
    $('#dmCount').textContent=`Showing ${rows.length} of ${DM_TB.length} medicines, sorted by ${({nm:'medicine',cls:'class',rt:'route',d:'first FDA approval'})[sk]} (${sd>0?'ascending':'descending'}).`}
  $('#dmTbl').addEventListener('click',e=>{const b=e.target.closest('.dm-sort');if(!b)return;const k=b.dataset.k;if(sk===k)sd=-sd;else{sk=k;sd=1}tbl();const nb=$(`.dm-sort[data-k="${k}"]`,$('#dmTbl'));nb&&nb.focus()});
  $$('#m-dmt [data-rt]').forEach(b=>b.addEventListener('click',()=>{fr=b.dataset.rt;$$('#m-dmt [data-rt]').forEach(x=>x.setAttribute('aria-pressed',x===b));tbl()}));
  $$('#m-dmt [data-ti]').forEach(b=>b.addEventListener('click',()=>{ft=b.dataset.ti;$$('#m-dmt [data-ti]').forEach(x=>x.setAttribute('aria-pressed',x===b));tbl()}));
  tbl();
};
