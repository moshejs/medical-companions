/* =============== 4.3 toward a cure =============== */
const CU_ST=[
 {l:['MEFV gene','two alleles'],k:'Stage 1 · The gene',t:'MEFV, and the alleles that matter',
  txt:'The FMF-associated gain-of-function variants cluster in the C-terminal B30.2 domain of pyrin: M694V, M680I, V726A. Those are the alleles any genetic cure would have to correct or silence. MEFV messenger RNA in blood is restricted to myeloid cells, and the gene switches on as CD34+ progenitors differentiate down the granulocyte line, which puts the target inside the bone-marrow stem and progenitor compartment. [[Park2016,Centola2000]]',
  pt:'The fault is a small spelling change in one gene, and the cells that read that gene are made in the bone marrow.',
  hook:'FMF is <b>hematopoietic and cell-autonomous</b> in mice: bone marrow transplantation corrected the knock-in phenotype. That is why marrow-directed cures are even discussed. [[Chae2011]]'},
 {l:['MEFV mRNA','the transcript'],k:'Stage 2 · The transcript',t:'From gene to message',
  txt:'MEFV transcription is tuned by inflammation: it is upregulated by interferon-γ, TNF and LPS and downregulated by IL-4, IL-10 and TGF-β. Silencing the message is possible in the dish. siRNA knockdown in the THP-1 monocytic line reached about 62% reduction in MEFV mRNA and shifted hundreds of inflammation, cell-cycle and autophagy genes. [[Centola2000,MEFVsiRNA2014]]',
  pt:'Between the gene and the protein there is a message. You can shred the message instead of editing the gene.',
  hook:'Knockdown may be enough here because pyrin <b>loss</b> of function looks benign in mice, while <b>gain</b> of function causes disease. [[Chae2011]]'},
 {l:['pyrin','PKN + 14-3-3','the brake'],k:'Stage 3 · The brake',t:'The brake FMF variants weaken',
  txt:'At rest, active RhoA drives PKN1 and PKN2 to phosphorylate pyrin at serine 208 and serine 242, and 14-3-3 proteins hold phospho-pyrin inactive. Park 2016 found that FMF B30.2 variants reduce pyrin\'s binding to PKN1 and to 14-3-3ε, which would explain why patient cells release IL-1β with little provocation; other work points instead to the later, microtubule-dependent step, so the exact weak point is still debated. That makes "put the brake back on" a defined drug target, separate from touching the gene at all. [[Park2016,Gao2016]]',
  pt:'A healthy cell keeps pyrin clamped shut. FMF versions of pyrin do not hold the clamp well.',
  hook:'PKN activators (bryostatin-1, arachidonic acid) suppressed the pyrin inflammasome and cut constitutive IL-1β release from patient cells; the PKN inhibitor PKC412 did the opposite. [[Park2016]]'},
 {l:['inflammasome','pyrin–ASC','caspase-1'],k:'Stage 4 · Assembly',t:'The inflammasome assembles',
  txt:'Released pyrin recruits ASC, which polymerises into a speck and activates caspase-1. In healthy cells this assembly obligatorily needs intact microtubules; FMF mutations lift that requirement and allow microtubule-independent ASC speck formation. That is the best mechanistic account of how colchicine works, and the basis of a functional diagnostic assay. In knock-in mice the pyrin inflammasome is ASC-dependent and NLRP3-independent, which is exactly why NLRP3 inhibitors are off-target for FMF. [[VanGorp2016,Gao2016,Chae2011,Coll2015]]',
  pt:'The freed protein pulls a complex together. Colchicine makes that step harder in normal cells, and FMF cells partly bypass it.',
  hook:'NLRP3 inhibitors are the classic distractor: the <b>pyrin domain</b> is not the <b>pyrin sensor</b>. FMF is NLRP3-independent.'},
 {l:['IL-1β · IL-18','gasdermin D','pores'],k:'Stage 5 · The output',t:'Cytokines and pores',
  txt:'Caspase-1 cuts pro-IL-1β and pro-IL-18 into active cytokines and cleaves gasdermin D, whose N-terminal fragment forms membrane pores and drives pyroptosis. Gasdermin D is covalently druggable at a single reactive cysteine, Cys191 in humans: FDA-approved disulfiram blocks pore formation at nanomolar potency while leaving IL-1β and gasdermin D processing intact, dimethyl fumarate succinates the same cysteine, and necrosulfonamide modifies it too. All of that is cell and mouse work, including the report that dimethyl fumarate alleviates FMF in mice. No human has been treated this way for FMF. [[Hu2020,Humphries2020,Rathkey2018,LitGap-GSDMD]]',
  pt:'The complex cuts two alarm signals loose and punches holes in the cell. Two already-approved drugs block the hole-punching step.',
  hook:'Blocking gasdermin D would stop the pyroptotic release while leaving some IL-1β signalling intact. Whether that is enough in a disease defined by IL-1β excess is <b>untested</b>. [[Hu2020]]'},
 {l:['neutrophils','influx · attack'],k:'Stage 6 · The attack',t:'Neutrophils arrive, the attack happens',
  txt:'IL-1β recruits neutrophils and produces the fever and serositis that patients feel. This is the stage current standard care works on: anakinra beat placebo in colchicine-resistant FMF (1.7 vs 3.5 attacks a month), canakinumab gave 61% complete response against 6% on placebo in CLUSTER, and rilonacept cut median attacks from 2.00 to 0.77. All of them neutralise the output and need indefinite injections, leaving the mutant allele and the primed inflammasome in place. [[BenZvi2017,DeBenedetti2018,Hashkes2012]]',
  pt:'This is the part you feel, and the part today\'s injections control.',
  hook:'Cytokine blockade is <b>suppression, not cure</b>: CLUSTER\'s extension showed sustained control, and attacks return on withdrawal. [[Ozen2020]]'},
 {l:['SAA','from the liver'],k:'Stage 7 · SAA',t:'The acute-phase protein that does the damage',
  txt:'IL-1 drives the liver to make serum amyloid A. Attacks are what patients notice, but it is chronically raised SAA that builds amyloid. In 374 patients with AA amyloidosis of any cause, those in the highest SAA octile (155 mg/L or more) had 17.7 times the risk of death of those in the lowest, and deposits regressed in 60% of patients whose median SAA stayed below 10 mg/L. [[Lachmann2007,Ozen2016]]',
  pt:'The protein that forms amyloid comes from the liver, and it rises whenever the inflammation is switched on, even quietly.',
  hook:'A cure has to normalise <b>SAA between attacks</b>, not only stop attacks. That is why the 2024 update targets subclinical inflammation. [[Ozen2025]]'},
 {l:['AA amyloid','kidney'],k:'Stage 8 · Amyloid',t:'The end of the pathway, and the one nothing reverses quickly',
  txt:'AA amyloid fibrils resist breakdown and turn over very slowly. Lowering the supply of precursor can let deposits regress overall, but every route on this page acts upstream: none of them clears amyloid that is already there, and the reports of regression on anakinra or tocilizumab are uncontrolled. Eprodisate, which interfered with fibril formation, showed a borderline effect in one randomised trial and then failed to meet its primary endpoint in the confirmatory phase 3. [[Ozen2016,Dember2007,KiactaPh3,Henes2022]]',
  pt:'Once amyloid has built up in an organ, stopping the inflammation helps slowly and does not undo the deposits.',
  hook:'Open question 12 in the research literature: <b>nothing on this page treats established amyloid.</b>'}
];
const CU_STEPS=CU_ST.map((s,i)=>({from:i*.115,at:i*.115+.03,k:s.k,t:s.t,txt:s.txt,pt:s.pt,hook:s.hook}));
const CU_ROUTES={
 none:{n:'No intervention',b:-1,lvl:null},
 hsct:{n:'Allogeneic HSCT',b:1,lvl:'early',fix:'Replaces the whole myeloid compartment with donor cells that carry working pyrin.',
  ev:'One published human FMF case: a girl transplanted at age 4 from a sibling donor for congenital dyserythropoietic anaemia, with FMF as a comorbidity rather than the indication. Her symptoms resolved, colchicine was withdrawn, and she was attack-free at about 2 years. In mevalonate kinase deficiency, the closest comparator, an EBMT retrospective of 9 allogeneic transplants reported 7 complete remissions, but grade II–IV acute GvHD in 4, two transplant-related deaths and two second transplants. In cryopyrin-associated periodic syndrome, another inflammasome disease, a patient has been reported in long-term remission after allogeneic transplantation. In FMF knock-in mice, bone marrow transplantation corrected the phenotype. Every one of these is a single case or a nine-patient series, none of them in FMF except the one incidental case. [[Milledge2002,Jeyaratnam2022,Nakagawa2021,Chae2011]]',
  obs:'Myeloablative allogeneic transplant carries double-digit treatment-related mortality against a disease with near-normal life expectancy on colchicine plus IL-1 blockade. NLRP3 inflammasome activation itself contributes to GvHD and transplant-related mortality, so toxicity in an inflammasome disease is not expected to be mild. [[Chae2011,Zemer1986,Nunes2021]]',
  st:'No case series, registry cohort or trial of HSCT performed for FMF itself exists; a 2026 PubMed sweep returns only the single case. [[PubMedSweep2026]]'},
 edit:{n:'Gene-corrected HSCs and base editing',b:1,lvl:'hyp',fix:'Corrects or knocks out the mutant MEFV allele in the patient\'s own stem cells, with no donor and no GvHD.',
  ev:'The modality is clinically validated in other diseases: exagamglogene autotemcel was approved for sickle cell disease in December 2023 and for transfusion-dependent β-thalassaemia in January 2024, and base-edited autologous cells (BEAM-101) have reached patients in sickle cell disease with reported fetal haemoglobin above 60%, in small, company-presented cohorts rather than a full peer-reviewed report. For MEFV itself there is nothing: no published preclinical or clinical base-editing, prime-editing or CRISPR-correction study in human hematopoietic stem cells. Patient-derived iPSCs carrying M694V have been made and turned into macrophages, but without an isogenic corrected control. [[Casgevy2023,Frangoul2021,BEAM101,LitGap-Editing,Hakobyan2024]]',
  obs:'Exa-cel disrupts a repressor element, which is far easier than correcting a point mutation; FMF needs precise correction or allele-specific knockout of a missense variant. And every validated route still requires busulfan myeloablation, which carries the conditioning toxicity, infertility risk and secondary-malignancy concern. [[Frangoul2021,Casgevy2023,Park2016]]',
  st:'No registered trial. In-vivo editing that would avoid conditioning altogether has no FMF data at all. [[CTgovSweep2026,LitGap-Editing]]'},
 rna:{n:'RNA knockdown',b:2,lvl:'early',fix:'Destroys or silences the MEFV message so less variant pyrin is made, without touching the genome.',
  ev:'siRNA knockdown of MEFV in the THP-1 monocytic line reached about 62% reduction in mRNA and changed more than 300 genes, including CD36, LY96, S100A8, CCR1, CD53, TIRAP, MYD88 and CD14. That is cell-line work, presented as conference abstracts. [[MEFVsiRNA2014]]',
  obs:'Delivery. Myeloid cells, and neutrophils above all, are among the hardest targets for systemic siRNA and lipid nanoparticles, whose validated tropism is hepatocyte-dominant. [[LitGap-RNA]]',
  st:'No siRNA, antisense or RNA-editing candidate against MEFV has been published or registered; commercial MEFV siRNAs are research reagents. [[LitGap-RNA]]'},
 brake:{n:'PKN activator or a 14-3-3 molecular glue',b:3,lvl:'hyp',fix:'Re-imposes the phosphorylation brake that FMF variants weaken, leaving pyrin in place but held shut.',
  ev:'The lever is real in cells: PKN activators bryostatin-1 and arachidonic acid suppressed the pyrin inflammasome and reduced constitutive IL-1β release from FMF patient cells, while the PKN inhibitor PKC412 activated it. The 14-3-3 side is pure chemistry-in-waiting: a stabiliser of the 14-3-3–pyrin interaction would be the most target-faithful FMF drug imaginable, and no such compound has been reported. [[Park2016,LitGap-SmallMolecule]]',
  obs:'Bryostatin-1\'s pharmacology makes it a mechanistic probe, not a candidate. There is no pyrin-selective small molecule of any kind; searches for "pyrin inflammasome inhibitors" return NLRP3 chemistry instead. [[Park2016,LitGap-SmallMolecule]]',
  st:'No PKN activator or 14-3-3 glue has entered an FMF trial. [[CTgovSweep2026]]'},
 casp:{n:'Caspase-1 inhibitor',b:4,lvl:'early',fix:'Blocks the enzyme that cuts pro-IL-1β, pro-IL-18 and gasdermin D, so the whole output stops at once.',
  ev:'Two compounds reached the clinic in other diseases. Pralnacasan (VX-740) had its phase IIb rheumatoid arthritis programme voluntarily halted in November 2003 after a 9-month high-dose animal toxicology study showed minimal-to-moderate liver fibrosis, with no matching human liver signal reported. Belnacasan (VX-765) reached phase II in epilepsy and psoriasis, with one epilepsy trial terminated. Neither has been tested in FMF. [[Vertex2003,VX765]]',
  obs:'An animal liver-fibrosis signal killed the lead compound, and blocking caspase-1 removes IL-1β, IL-18 and pyroptosis together, which is a wide suppression of innate immunity for a disease already managed well in most patients. [[Vertex2003]]',
  st:'No FMF trial of any caspase-1 inhibitor. The claim that VX-765 was stopped specifically for liver toxicity traces to vendor copy, not primary sources. [[VX765]]'},
 gsdmd:{n:'Gasdermin D inhibitor',b:5,lvl:'early',fix:'Blocks the pore that releases IL-1β and kills the cell, downstream of everything upstream of it.',
  ev:'Gasdermin D is covalently druggable at Cys191. Disulfiram, an approved drug, blocks pore formation at nanomolar potency while leaving IL-1β and gasdermin D processing intact and prevented LPS-induced septic death in mice. Dimethyl fumarate, also approved and licensed for multiple sclerosis, succinates the same cysteine and blocks pyroptosis, and its authors report that in mice it alleviates familial Mediterranean fever by targeting gasdermin D. That is the most FMF-specific small-molecule result in the literature, and it is a mouse model, not a patient. Necrosulfonamide modifies the same cysteine and prevented lethal sepsis in mice. Two approved drugs hitting the executioner is an unusually short repurposing path. [[Hu2020,Humphries2020,Rathkey2018]]',
  obs:'No gasdermin D inhibitor has been given to an FMF patient in any published trial or case series, and none is registered anywhere, so the whole route rests on cell and mouse work. And it is not obvious that stopping the pore is enough when the disease is defined by IL-1β excess, part of which may still escape. [[LitGap-GSDMD,Hu2020]]',
  st:'Open question 7 in the research literature: worth a trial, and nobody has run one. The mouse FMF result keeps this at early evidence rather than hypothesis. [[LitGap-GSDMD,Humphries2020]]'},
 il1:{n:'IL-1 and IL-18 blockade',b:5,lvl:'est',fix:'Neutralises the cytokines after they are released, which is what today\'s standard care does.',
  ev:'Randomised evidence in colchicine-resistant FMF: anakinra 1.7 vs 3.5 attacks a month (P=0.037), canakinumab 61% complete response vs 6% in CLUSTER rising to 71% at 300 mg, rilonacept median 0.77 vs 2.00 attacks a month. A 2025 systematic review of 42 studies and 1,798 patients, including 6 randomised trials of IL-1 blockers, found them effective and relatively safe. IL-18 is a candidate target but not an established one: elevated attack-free levels in one cohort (about 879 pg/mL vs 315 in controls) were not confirmed later, and tadekinig alfa, the recombinant IL-18 binding protein, has been tested in NLRC4 gain-of-function and XIAP deficiency but never in FMF. [[BenZvi2017,DeBenedetti2018,Hashkes2012,Sag2025,Haznedaroglu2005,Cacan2021,NCT03113760]]',
  obs:'It leaves the mutant allele and the primed inflammasome in place and needs indefinite injections. Attacks return when the drug stops. [[Ozen2020]]',
  st:'Standard of care for colchicine-resistant disease, not a cure. Newer IL-1 traps are in trials: goflikicept has a placebo-controlled phase 2 programme with interim results presented in 2025, and an on-demand anakinra phase 3 started in June 2024. [[Ozen2025,NCT05092776,Goflikicept2025,NCT06336733]]'},
 jak:{n:'JAK inhibitor',b:5,p:true,lvl:'early',fix:'Dampens downstream interferon and IL-6-type amplification, not the pyrin lesion itself.',
  ev:'A case-based review reported 4 patients refractory to IL-1 antagonists, anti-TNF agents and tocilizumab who improved on tofacitinib, with the authors cautioning that data are limited. A single patient with coexisting rheumatoid arthritis and colchicine-resistant FMF was reported fully controlled. A retrospective series of 3 patients on an oral JAK inhibitor has also been reported. [[Karadeniz2020,Gok2017,Salehzadeh2026]]',
  obs:'No established mechanism links JAK/STAT to pyrin inflammasome activation: the output is IL-1β, IL-18 and gasdermin D, which are not JAK-dependent, so any benefit would be acting on downstream amplification rather than on the FMF lesion. With series of four patients or fewer and no controls, publication bias cannot be excluded. [[Park2016,Karadeniz2020]]',
  st:'No randomised trial of any JAK inhibitor in FMF. The nearest registered studies are platform trials in rare immune-mediated inflammatory disease. [[NCT06285539]]'},
 micro:{n:'Microbiome',b:3,p:true,lvl:'hyp',fix:'Would reduce the supply of RhoA-inactivating bacterial triggers that physiologically fire the pyrin inflammasome.',
  ev:'The first report linking MEFV genotype to gut bacteria compared 19 patients with 8 controls and concluded that host genotype shapes the commensal profile; it is in PLoS ONE, 2008, and is often miscited as PNAS. The largest FMF study since (119 patients, 61 controls) found enrichment of pro-inflammatory taxa, associations with homozygous MEFV genotypes and reduced bacterial network connectivity in colchicine-resistant patients. Colchicine itself expanded anti-inflammatory taxa, so treated cohorts are confounded by the drug. The only interventional data are a Lactobacillus acidophilus probiotic in Armenian patients in remission, which reduced Candida albicans and enterobacterial counts. A small Turkish pilot found largely similar diversity, which shows how inconsistent this literature is. [[Khachatryan2008,Delplanque2024,DiCiaula2020,TurkishPilot]]',
  obs:'Everything is cross-sectional and colchicine-confounded. Whether the microbiome drives the phenotype or merely reflects it is unresolved, and no faecal transplant or defined-consortium study exists in FMF. [[DiCiaula2020,Delplanque2024]]',
  st:'Mechanistically coherent, entirely untested as therapy. [[VanGorp2016,Park2016]]'},
 colch:{n:'Colchicine',b:3,p:true,lvl:'est',fix:'Keeps the microtubule-dependent assembly step hard, which is the only disease-modifying small-molecule effect with hard outcome data.',
  ev:'In 1,070 patients followed 4 to 11 years, cumulative proteinuria was 1.7% at 11 years in adherent patients against 48.9% at 9 years in non-adherent ones. That is prevention of AA amyloidosis, and no other agent has anything like it. Mechanistically, pyrin inflammasome assembly obligatorily requires intact microtubules in healthy cells, and FMF variants lift that requirement, which is why the effect is partial. [[Zemer1986,VanGorp2016,Gao2016]]',
  obs:'It is suppressive, not curative, it must be taken every day for life, and roughly 5 to 10% of patients are resistant with another 2 to 5% intolerant. It also acts downstream of pyrin dephosphorylation rather than upstream of it. [[Ozen2016,Ozen2017,Gao2016]]',
  st:'First-line and lifelong in both the 2016 recommendations and the 2024 update. [[Ozen2016,Ozen2025]]'}
};
const CU_LVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
inits.cure=()=>{
  const svg=$('#cuSvg'),rg=$('#cuT');let route='none';
  const CXs=CU_ST.map((_,i)=>66+i*118), BW=104, BY=86, BH=92, FY=216;
  const wrapC=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  /* narrow: the eight stages run top to bottom as a chain, the particles fall down
     the spine, and the barrier lies across it */
  function drawN(t){
    const R=CU_ROUTES[route],b=R.b;
    const SX=44, BX=68, NBW=316, NBH=52, P=66, Y0=62, GAP=34;
    const topOf=i=>Y0+i*P+(b>=0&&i>=b?GAP:0);
    const chainBot=topOf(7)+NBH+12, F0=46, F1=chainBot;
    const yb=b>=0?topOf(b)-20:1e9;
    let s=`<defs>${marker('cuA','var(--muted)')}${marker('cuB','var(--terra)')}</defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="26" class="t-sm" style="fill:var(--sea)">WHERE COULD WE INTERVENE?</text>`;
    s+=`<text x="14" y="40" class="t-xs">${R.n==='No intervention'?'no barrier in place':'barrier: '+R.n}</text>`;
    // the spine the signal runs down
    s+=`<line x1="${SX}" x2="${SX}" y1="${F0}" y2="${f1(F1)}" style="stroke:var(--line);stroke-width:3"/>`;
    CU_ST.forEach((st,i)=>{const dim=b>=0&&i>=b,o=dim?(R.p?.5:.28):1,reached=t>=CU_STEPS[i].from,y=topOf(i);
      s+=`<g style="opacity:${f1(o)}">`;
      s+=`<line x1="${SX}" x2="${BX-6}" y1="${f1(y+NBH/2)}" y2="${f1(y+NBH/2)}" style="stroke:var(--line);stroke-width:1.2"/>`;
      s+=`<rect x="${BX}" y="${f1(y)}" width="${NBW}" height="${NBH}" rx="12" style="fill:${reached&&!dim?'var(--panel)':'var(--panel-2)'};stroke:${reached&&!dim?'var(--sea)':'var(--line)'};stroke-width:${reached&&!dim?2:1.3}"/>`;
      s+=`<circle cx="${SX}" cy="${f1(y+NBH/2)}" r="10" style="fill:${reached&&!dim?'var(--sea)':'var(--panel)'};stroke:${reached&&!dim?'var(--sea)':'var(--line)'};stroke-width:1.6"/>`;
      s+=`<text x="${SX}" y="${f1(y+NBH/2+3.5)}" class="t-xs t-mid" style="fill:${reached&&!dim?'var(--on-sea)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${BX+14}" y="${f1(y+20)}" class="t-lbl">${st.l[0]}</text>`;
      s+=`<text x="${BX+14}" y="${f1(y+36)}" class="t-xs">${st.l.slice(1).join(' · ')}</text>`;
      s+='</g>';
      if(i<7&&!(b>=0&&i+1>=b))s+=`<path d="M${SX} ${f1(topOf(i)+NBH+1)} V${f1(topOf(i+1)-5)}" class="arrow" marker-end="url(#cuA)"/>`});
    // particles falling down the spine
    const nP=20,piled=[];
    for(let i=0;i<nP;i++){const u=((t*1.35+i/nP)%1);const y=lerp(F0,F1,u);
      if(y>yb){piled.push(i);continue}
      s+=`<circle cx="${SX}" cy="${f1(y)}" r="4.4" style="fill:var(--terra);opacity:.9"/>`}
    if(b>=0){
      piled.forEach((i,j)=>{const col=j%4,row=Math.floor(j/4);
        s+=`<circle cx="${f1(SX-16.5+col*11)}" cy="${f1(yb-8-row*11)}" r="4.4" style="fill:var(--terra);opacity:${f1(.9-row*.12)}"/>`});
      s+=`<line x1="14" x2="386" y1="${f1(yb)}" y2="${f1(yb)}" style="stroke:var(--bad);stroke-width:${R.p?4:6};${R.p?'stroke-dasharray:7 6;':''}stroke-linecap:round"/>`;
      s+=`<text x="386" y="${f1(yb-8)}" class="t-sm t-end" style="fill:var(--bad)">${R.p?'partial barrier':'barrier'}</text>`}
    let y=chainBot+22;
    s+=`<text x="14" y="${f1(y)}" class="t-xs">signal flow ↓</text>`;y+=16;
    wrapC(b>=0?'stages past the barrier are dimmed'+(R.p?', and the barrier is partial, so some signal gets through':''):'no barrier: the pathway runs end to end',56)
      .forEach(l=>{s+=`<text x="14" y="${f1(y)}" class="t-xs">${l}</text>`;y+=13});
    if(R.lvl){const col=R.lvl==='est'?'var(--good)':R.lvl==='early'?'var(--warn)':'var(--crocus)';
      const lbl=R.lvl==='est'?'ESTABLISHED':R.lvl==='early'?'EARLY EVIDENCE':'HYPOTHESIS';
      y+=10;
      s+=`<rect x="14" y="${f1(y)}" width="170" height="24" rx="7" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`;
      s+=`<text x="99" y="${f1(y+16)}" class="t-xs t-mid" style="fill:${col};font-weight:700">${lbl}</text>`;y+=40;
      wrapC(R.fix,56).forEach(l=>{s+=`<text x="14" y="${f1(y)}" class="t-xs" style="fill:var(--ink)">${l}</text>`;y+=13})}
    return{s:s,h:y+12};
  }
  function draw(t){
    const R=CU_ROUTES[route],b=R.b;
    const N=vb(svg,'960 340','400 700');
    if(N){const o=drawN(t);svg.setAttribute('viewBox','0 0 400 '+Math.round(o.h));svg.innerHTML=o.s;afterDraw(t,R,b);return}
    let s=`<defs>${marker('cuA','var(--muted)')}${marker('cuB','var(--terra)')}</defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="30" class="t-sm" style="fill:var(--sea)">WHERE COULD WE INTERVENE?</text>`;
    s+=`<text x="946" y="30" class="t-sm t-end">${R.n==='No intervention'?'no barrier in place':'barrier: '+R.n}</text>`;
    // flow line
    s+=`<line x1="14" x2="944" y1="${FY}" y2="${FY}" style="stroke:var(--line);stroke-width:3"/>`;
    const xb=b>=0?CXs[b]-BW/2-14:1e9;
    // boxes
    CU_ST.forEach((st,i)=>{const dim=b>=0&&i>=b,o=dim?(R.p?.5:.28):1;
      const reached=t>=CU_STEPS[i].from;
      s+=`<g style="opacity:${f1(o)}">`;
      s+=`<rect x="${CXs[i]-BW/2}" y="${BY}" width="${BW}" height="${BH}" rx="12" style="fill:${reached&&!dim?'var(--panel)':'var(--panel-2)'};stroke:${reached&&!dim?'var(--sea)':'var(--line)'};stroke-width:${reached&&!dim?2:1.3}"/>`;
      st.l.forEach((L,j)=>{s+=`<text x="${CXs[i]}" y="${BY+28+j*18}" class="${j?'t-xs':'t-lbl'} t-mid" style="font-size:${j?'9.5':'12'}px">${L}</text>`});
      s+=`<text x="${CXs[i]}" y="${BY+BH-10}" class="t-xs t-mid">${i+1}</text>`;
      s+=`<line x1="${CXs[i]}" x2="${CXs[i]}" y1="${BY+BH}" y2="${FY-8}" style="stroke:var(--line);stroke-width:1.2"/>`;
      s+='</g>';
      if(i<7)s+=`<path d="M${CXs[i]+BW/2+3} ${BY+BH/2} H${CXs[i+1]-BW/2-6}" class="arrow" marker-end="url(#cuA)" style="opacity:${f1(b>=0&&i+1>=b?.3:1)}"/>`});
    // particles
    const nP=20,piled=[];
    for(let i=0;i<nP;i++){const u=((t*1.35+i/nP)%1);let x=lerp(14,944,u);
      if(x>xb){piled.push(i);continue}
      s+=`<circle cx="${f1(x)}" cy="${f1(FY)}" r="4.4" style="fill:var(--terra);opacity:.9"/>`}
    if(b>=0){
      piled.forEach((i,j)=>{const col=j%5,row=Math.floor(j/5);
        s+=`<circle cx="${f1(xb-6-col*11)}" cy="${f1(FY-14+row*11)}" r="4.4" style="fill:var(--terra);opacity:${f1(.9-row*.12)}"/>`});
      s+=`<line x1="${f1(xb)}" x2="${f1(xb)}" y1="${BY-6}" y2="${FY+26}" style="stroke:var(--bad);stroke-width:${R.p?4:6};${R.p?'stroke-dasharray:7 6;':''}stroke-linecap:round"/>`;
      s+=`<text x="${f1(xb)}" y="${BY-14}" class="t-sm t-mid" style="fill:var(--bad)">${R.p?'partial barrier':'barrier'}</text>`;
      s+=`<text x="${f1(xb)}" y="${FY+42}" class="t-xs t-mid" style="fill:var(--bad)">${R.n}</text>`}
    s+=`<text x="14" y="${FY-12}" class="t-xs">signal flow</text>`;
    s+=`<text x="14" y="294" class="t-xs">${b>=0?'stages past the barrier are dimmed'+(R.p?' and the barrier is partial, so some signal gets through':''):'no barrier: the pathway runs end to end'}</text>`;
    // evidence strip
    if(R.lvl){const col=R.lvl==='est'?'var(--good)':R.lvl==='early'?'var(--warn)':'var(--crocus)';
      const lbl=R.lvl==='est'?'ESTABLISHED':R.lvl==='early'?'EARLY EVIDENCE':'HYPOTHESIS';
      s+=`<rect x="14" y="308" width="170" height="24" rx="7" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`;
      s+=`<text x="99" y="324" class="t-xs t-mid" style="fill:${col};font-weight:700">${lbl}</text>`;
      s+=`<text x="196" y="324" class="t-xs" style="fill:var(--ink)">${R.fix}</text>`}
    svg.innerHTML=s;
    afterDraw(t,R,b);
  }
  function afterDraw(t,R,b){
    const p=phaseOf(CU_STEPS,t);setSt(p);
    let extra='';
    if(R.lvl)extra=`<div class="kv"><div><dt>Route · ${R.n}</dt><dd><div class="evrow">${CU_LVL[R.lvl]}</div></dd></div>`+
      `<div><dt>What it would fix</dt><dd>${R.fix}</dd></div>`+
      `<div><dt>Best evidence</dt><dd>${R.ev}</dd></div>`+
      `<div><dt>Main obstacle</dt><dd>${R.obs}</dd></div>`+
      `<div><dt>Status</dt><dd>${R.st}</dd></div></div>`;
    $('#cuNote').innerHTML=noteHTML(CU_STEPS[p])+extra;
    $('#cuCap').textContent=`Stage ${p+1} of 8 · ${R.n==='No intervention'?'no barrier':'barrier at stage '+(b+1)+(R.p?' (partial)':'')}. Schematic pathway, not to scale.`;
  }
  const stop=playWire(rg,$('#cuPlay'),draw,18000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CU_STEPS,rg,draw,stop);
  $$('[data-cu]').forEach(btn=>btn.onclick=()=>{route=btn.dataset.cu;$$('[data-cu]').forEach(x=>x.setAttribute('aria-pressed',x===btn));draw(+rg.value)});
  draw(+rg.value);

  /* ---- marrow replacement ---- */
  const ms=$('#cuMarrow'),mr=$('#cuM'),pr=$('#cuPct');
  const MR=rng(77),MJ=Array.from({length:16},()=>({dx:MR()*2-1,dy:MR()*2-1}));
  function drawM(t){
    const target=+pr.value, cond=ease(ramp(t,.04,.26)), eng=ease(ramp(t,.26,.5)), sw=ease(ramp(t,.4,.92));
    const pct=target*sw, months=t*18;
    /* narrow: the niche and the bloodstream stack above the chimerism curve */
    const NA=vb(ms,'720 390','400 648');
    const M=NA
      ? {NX:14,NY:52,NW:372,NH:168, SX:152,SY:86,SDX:48,SDY:40, CDL:28,CDY:208,CDT:'conditioning clears host cells',
         EGX:372,EGA:'t-end', BX:14,BY:246,BW:372,BH:136, NUX:38,NUY:290,NUDX:44,NUDY:62,
         LGY:400,LG1:14,LG2:160, TTX:14,TTY:424,HYX:386,
         GX0:46,GX1:386,GY:540,GT:444, CPX:14,CPY:590}
      : {NX:18,NY:56,NW:286,NH:246, SX:58,SY:96,SDX:44,SDY:44, CDL:32,CDY:286,CDT:'conditioning clears host stem cells',
         EGX:196,EGA:'t-mid', BX:330,BY:56,BW:372,BH:152, NUX:362,NUY:100,NUDX:44,NUDY:66,
         LGY:226,LG1:344,LG2:470, TTX:344,TTY:248,HYX:694,
         GX0:344,GX1:694,GY:358,GT:266, CPX:20,CPY:324};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    // marrow niche
    s+=`<rect x="${M.NX}" y="${M.NY}" width="${M.NW}" height="${M.NH}" rx="18" style="fill:var(--cyto);stroke:var(--memb);stroke-width:3"/>`;
    s+=`<text x="${M.NX+14}" y="${M.NY-10}" class="t-sm" style="fill:var(--memb)">BONE-MARROW NICHE</text>`;
    // host stem cells fading
    for(let i=0;i<9;i++){const x=M.SX+(i%3)*M.SDX,y=M.SY+Math.floor(i/3)*M.SDY,o=1-cond;
      s+=`<circle cx="${x}" cy="${y}" r="${f1(11*(1-.5*cond))}" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:2;opacity:${f1(.15+.85*o)}"/>`}
    // conditioning label
    s+=`<text x="${M.CDL}" y="${M.CDY}" class="t-xs" style="fill:var(--bad);opacity:${f1(bump(t,.02,.34))}">${M.CDT}</text>`;
    // donor / corrected cells engrafting
    for(let i=0;i<9;i++){const x=M.SX+(i%3)*M.SDX,y=M.SY+Math.floor(i/3)*M.SDY;
      const o=eng*(i/9<target/100?1:.18);
      s+=`<circle cx="${f1(x+6)}" cy="${f1(y+6-30*(1-eng))}" r="11" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:2;opacity:${f1(o)}"/>`}
    s+=`<text x="${M.EGX}" y="${M.CDY}" class="t-xs ${M.EGA}" style="fill:var(--sea);opacity:${f1(eng)}">corrected cells engraft</text>`;
    // bloodstream
    s+=`<rect x="${M.BX}" y="${M.BY}" width="${M.BW}" height="${M.BH}" rx="18" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<text x="${M.BX+14}" y="${M.BY-10}" class="t-sm" style="fill:var(--sea)">CIRCULATING NEUTROPHILS</text>`;
    const nN=16,corr=Math.round(nN*pct/100);
    for(let i=0;i<nN;i++){const x=M.NUX+(i%8)*M.NUDX,y=M.NUY+Math.floor(i/8)*M.NUDY;
      const ok=i<corr;
      s+=neutro(x+MJ[i].dx*3,y+MJ[i].dy*3,13,1);
      s+=`<circle cx="${f1(x+MJ[i].dx*3)}" cy="${f1(y+MJ[i].dy*3)}" r="16" style="fill:none;stroke:${ok?'var(--sea)':'var(--terra)'};stroke-width:2.4"/>`}
    s+=`<text x="${M.LG1}" y="${M.LGY}" class="t-xs" style="fill:var(--terra)">○ variant pyrin</text>`;
    s+=`<text x="${M.LG2}" y="${M.LGY}" class="t-xs" style="fill:var(--sea)">○ corrected or donor-derived</text>`;
    // chimerism curve
    const GX0=M.GX0,GX1=M.GX1,GY=M.GY,GT=M.GT;
    s+=`<text x="${M.TTX}" y="${M.TTY}" class="t-sm">CORRECTED MYELOID CELLS OVER TIME</text>`;
    s+=`<text x="${M.HYX}" y="${M.TTY}" class="t-xs t-end" style="fill:var(--crocus);font-weight:700">HYPOTHETICAL CURVE</text>`;
    ['Hypothetical throughout. No FMF transplant survival','or chimerism data exist: the shape is set by the slider,','not measured in any patient.']
      .forEach((l,i)=>{s+=`<text x="${M.CPX}" y="${M.CPY+i*16}" class="t-xs" style="fill:var(--crocus)">${l}</text>`});
    [0,50,100].forEach(v=>{const y=lerp(GY,GT,v/100);s+=`<line x1="${GX0}" x2="${GX1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${GX0-6}" y="${f1(y+3)}" class="t-xs t-end">${v}%</text>`});
    let d='';const NP=60;
    for(let i=0;i<=NP;i++){const u=i/NP,tt=u*t;const v=target*ease(ramp(tt,.4,.92));
      d+=(i?'L':'M')+f1(lerp(GX0,GX1,u*t))+' '+f1(lerp(GY,GT,v/100))}
    s+=`<path d="${d}" style="fill:none;stroke:var(--sea);stroke-width:2.6"/>`;
    s+=`<line x1="${GX0}" x2="${GX1}" y1="${GY}" y2="${GY}" class="axis"/>`;
    [0,6,12,18].forEach(m=>s+=`<text x="${f1(lerp(GX0,GX1,m/18))}" y="${GY+16}" class="t-xs t-mid">${m}</text>`);
    s+=`<text x="${GX1}" y="${GY+30}" class="t-xs t-end">months after transplant</text>`;
    ms.innerHTML=s;
    $('#cuMRead').innerHTML=`<span>month <b>${months.toFixed(1)}</b></span><span>corrected myeloid cells <b>${pct.toFixed(0)}%</b></span><span>plateau set to <b>${target}%</b></span><span>phase <b>${t<.26?'conditioning':t<.5?'engraftment':'myeloid turnover'}</b></span>`;
  }
  const stopM=playWire(mr,$('#cuMPlay'),drawM,12000,'Replay','cure');
  pr.addEventListener('input',()=>drawM(+mr.value));
  drawM(+mr.value);
  $('#cuMNote').innerHTML=`<div class="kicker">Marrow replacement</div><h4>Why this animation is labelled, not promised</h4>
   <div class="evrow">${CU_LVL.hyp} <span class="t-sm">for FMF as a strategy</span></div>
   <p>FMF is recessive, and Mefv-null mice show no spontaneous autoinflammation while B30.2 knock-in mice do. So partial correction of the myeloid compartment might be enough, and monoallelic correction or knockout of the mutant allele should in principle restore the brake. That is a hypothesis: there is no validated surrogate for "enough corrected myeloid cells" in FMF, unlike the fetal-haemoglobin threshold in sickle cell disease. SAA and attack rate are the only candidate readouts. [[Chae2011,Park2016,Casgevy2023,Ozen2025]]</p>
   <div class="evrow">${CU_LVL.early} <span class="t-sm">human data</span></div>
   <p>One FMF patient has been transplanted and reported: a girl transplanted at age 4 for congenital dyserythropoietic anaemia, with FMF as a comorbidity rather than the indication, attack-free off colchicine at about 2 years. The paper is in Blood, 2002, and the word "cure" in its title is the authors\' framing of a single observation. No confirmatory case has appeared in 24 years. In mevalonate kinase deficiency, 9 allogeneic transplants produced 7 complete remissions but also grade II–IV acute GvHD in 4 patients and two transplant-related deaths. [[Milledge2002,Jeyaratnam2022]]</p>
   <div class="evrow"><span class="ev early">Early evidence</span> <span class="t-sm">the autologous route</span></div>
   <p>Both clinically validated stem-cell cures, exa-cel and BEAM-101, require busulfan myeloablation before infusion, so the conditioning toxicity, infertility risk and secondary-malignancy concern largely persist even without a donor. [[Casgevy2023,BEAM101]]</p>
   <div class="hook"><b>Exam hook</b>The risk-benefit is the whole argument. Life expectancy on colchicine plus IL-1 blockade is near normal, and myeloablative transplant carries double-digit treatment-related mortality. The commentary accompanying the mouse data says plainly that transplant risks currently preclude its use in human FMF. [[Chae2011,Zemer1986]]</div>
   <div class="pt"><b>In plain words</b>Replacing the bone marrow would replace the cells that misbehave. It would also be a far more dangerous treatment than the tablets and injections that already control the disease in almost everyone.</div>`;

  /* ---- evidence table ---- */
  const T=[
   ['Allogeneic HSCT','Replaces the myeloid compartment with donor cells','1 human FMF case (n=1, 2 years); 7/9 remissions in mevalonate kinase deficiency with 2 transplant deaths; 1 CAPS case in long-term remission; corrected in knock-in mice','early','Treatment-related mortality and GvHD against near-normal life expectancy on current treatment','No trial or series for FMF itself'],
   ['Gene-corrected HSCs, base editing','Corrects or silences the mutant allele in the patient\'s own stem cells','Modality approved in sickle cell disease and β-thalassaemia; base editing in patients for sickle cell disease','hyp','Precise correction of a missense variant is harder than disrupting an enhancer; busulfan conditioning still required','No MEFV editing study published'],
   ['RNA knockdown','Removes the message before pyrin is made','~62% MEFV mRNA knockdown in a monocytic cell line','early','Delivery to myeloid cells, especially neutrophils','No candidate, no trial'],
   ['PKN activator or 14-3-3 glue','Restores the brake that FMF variants weaken','PKN activators suppressed the pyrin inflammasome and cut IL-1β from patient cells','hyp','No drug-like molecule exists; no 14-3-3 stabiliser reported','Chemistry gap'],
   ['Caspase-1 inhibitor','Stops cytokine maturation and pore cleavage together','Pralnacasan reached phase IIb in rheumatoid arthritis before an animal liver-fibrosis signal; belnacasan reached phase II elsewhere','early','Liver-fibrosis signal in animals; broad innate suppression','Never tested in FMF'],
   ['Gasdermin D inhibitor','Blocks the pore and pyroptotic release','Disulfiram blocks pore formation at nanomolar potency; dimethyl fumarate and necrosulfonamide hit the same cysteine, and dimethyl fumarate is reported to alleviate FMF in mice','early','Unknown whether blocking the pore suffices when IL-1β is the driver','Two approved drugs, no FMF patient treated'],
   ['IL-1 and IL-18 blockade','Neutralises the output after release','Three randomised trials in colchicine-resistant FMF; systematic review of 42 studies and 1,798 patients','est','Leaves the allele and the primed inflammasome in place; indefinite injections','Standard of care, not a cure'],
   ['JAK inhibitor','Dampens downstream amplification loops','Case series of 4 and smaller; one single-patient report','early','No mechanistic link to pyrin; tiny, uncontrolled series','No randomised trial'],
   ['Microbiome','Reduces the supply of pyrin-activating triggers','Taxa differences in 119 patients vs 61 controls; one probiotic study in remission','hyp','Cross-sectional and colchicine-confounded; causality unresolved','No causal or transplant study'],
   ['Colchicine','Keeps inflammasome assembly microtubule-dependent','1,070 patients: 1.7% cumulative proteinuria at 11 years adherent vs 48.9% at 9 years non-adherent','est','Suppressive and daily for life; 5–10% resistant, 2–5% intolerant','First-line in 2016 and in the 2024 update']
  ];
  $('#cuTbl').innerHTML=T.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${CU_LVL[r[3]]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join('');

  /* ---- open questions ---- */
  const Q=[
   ['Is FMF fully hematopoietic?',`Pyrin protein has been reported in dendritic cells and in synovial fibroblasts, which raises the possibility that a myeloid-only correction leaves residual disease. No human study has quantified the non-hematopoietic contribution. [[Diaz2004,Centola2000]]`],
   ['Would correcting one allele be enough?',`Recessive inheritance and the benign Mefv-null mouse predict yes, but the clean experiment, a corrected and uncorrected iPSC-macrophage pair from the same patient, has not been published. [[Chae2011,Hakobyan2024]]`],
   ['What editing efficiency would be therapeutic?',`Sickle cell disease has a measurable fetal-haemoglobin threshold. FMF has no validated surrogate for "enough corrected myeloid cells"; SAA and attack rate are the only candidates. [[Casgevy2023,Ozen2025]]`],
   ['Can conditioning be avoided?',`Every clinically validated stem-cell cure so far requires busulfan myeloablation, which is hard to justify in a disease with near-normal survival on colchicine plus IL-1 blockade. [[Casgevy2023,BEAM101,Zemer1986]]`],
   ['Is the single transplant case reproducible?',`One patient, about 2 years of follow-up, improvement that began during conditioning, and no reported correlation between chimerism and symptoms. No confirmatory case in 24 years. [[Milledge2002]]`],
   ['Does a 14-3-3/pyrin molecular glue exist?',`It would be the most target-faithful FMF drug imaginable, and it is the most conspicuous gap in the chemistry literature. [[Park2016,LitGap-SmallMolecule]]`],
   ['Are gasdermin D inhibitors worth a trial in FMF?',`Two approved drugs hit the executioner downstream of the pyrin inflammasome, and one of them, dimethyl fumarate, is reported to alleviate FMF in mice. No FMF patient has been given either, and no trial of either is registered. [[Hu2020,Humphries2020,LitGap-GSDMD]]`],
   ['Does IL-18 blockade add anything to IL-1 blockade?',`IL-18 elevation in FMF is inconsistently reported, and tadekinig alfa has never been given to an FMF patient in a published study. [[Haznedaroglu2005,Cacan2021,NCT03113760]]`],
   ['Why do JAK inhibitors appear to work?',`No mechanistic account links JAK/STAT to pyrin inflammasome activation. The effect may act on amplification loops, or may be publication bias in series of four patients or fewer. [[Karadeniz2020]]`],
   ['Are statins harmful in FMF?',`The RhoA and geranylgeranyl pyrophosphate mechanism predicts that statins activate the pyrin inflammasome, yet patients with cardiovascular indications routinely receive them and no clinical study has looked. [[Park2016]]`],
   ['Is the microbiome causal?',`All FMF microbiome findings are cross-sectional and confounded by colchicine. No faecal transplant, defined-consortium or longitudinal pre/post-treatment study exists. [[Delplanque2024,Khachatryan2008]]`],
   ['What about amyloidosis that is already established?',`Every route on this page targets inflammation upstream. None addresses deposits already in an organ, and the regression reports on anakinra and tocilizumab are uncontrolled. [[Ozen2025,Henes2022]]`],
   ['Would an attack-free but still-mutant patient be cured?',`The field has no agreed definition. Treatment-free remission, normalised SAA, absent subclinical inflammation and a corrected genotype are four different bars. [[Ozen2025]]`]
  ];
  $('#cuQA').innerHTML=Q.map((q,i)=>`<details><summary>${String(i+1).padStart(2,'0')} · ${q[0]}</summary><p>${q[1]}</p></details>`).join('');

  /* ---- hypothetical trial designs ---- */
  $('#cuTrials').innerHTML=`
   <div class="card"><h4>A: repurposing a gasdermin D inhibitor</h4>
     <div class="evrow"><span class="tag warn">Illustration only</span>${CU_LVL.early}</div>
     <p><b>Shape.</b> A small randomised crossover in colchicine-resistant FMF of an already-approved drug that inhibits gasdermin D, added to stable colchicine, with each patient spending equal time on drug and on placebo in random order and a washout between.</p>
     <p><b>Endpoints.</b> Attack rate per month, which is the endpoint the anakinra and rilonacept trials used, and SAA between attacks, which is the marker the 2024 update treats as the damage-prevention target.</p>
     <p><b>What would count as a signal.</b> A within-patient fall in attack rate of the size the rilonacept trial saw (2.00 to 0.77 a month), together with SAA moving toward the under-10 mg/L range, in a trial too small to be definitive but large enough to justify a proper phase 2.</p>
     <p><b>Why it is only an illustration.</b> No gasdermin D inhibitor has ever been given to an FMF patient in any published study, and this page is not suggesting anyone take one. [[Hu2020,Humphries2020,LitGap-GSDMD,Hashkes2012,Ozen2025]]</p></div>
   <div class="card"><h4>B: the preclinical gate before any editing trial</h4>
     <div class="evrow"><span class="tag warn">Illustration only</span>${CU_LVL.hyp}</div>
     <p><b>Shape.</b> Not a clinical trial at all. An isogenic pair of induced pluripotent stem cell lines from the same M694V patient, one corrected and one not, differentiated into macrophages side by side.</p>
     <p><b>Endpoints.</b> Constitutive and stimulated IL-1β release, ASC speck formation with and without microtubule disruption, and the microtubule-independence that FMF variants confer.</p>
     <p><b>What would count as a signal.</b> Correction of one allele restoring the healthy-donor phenotype, which would answer open question 2 and give the field its first dose-response estimate for how much correction is enough.</p>
     <p><b>Why it is only an illustration.</b> Patient iPSC lines with M694V exist and have been differentiated into macrophages, but without an isogenic corrected control; a Koç University thesis describes a CRISPR system for MEFV in such cells with no published efficiency or rescue data. [[Hakobyan2024,KocThesis2016,VanGorp2016,Park2016]]</p></div>
   <div class="card"><h4>C: an IL-18-high subgroup study</h4>
     <div class="evrow"><span class="tag warn">Illustration only</span>${CU_LVL.hyp}</div>
     <p><b>Shape.</b> Screen colchicine-resistant patients for serum IL-18, enrol only those in the high stratum, and test recombinant IL-18 binding protein added to existing treatment against placebo.</p>
     <p><b>Endpoints.</b> Attack rate, SAA, and the IL-18 level itself as the pharmacodynamic check that the drug engaged its target.</p>
     <p><b>What would count as a signal.</b> Benefit concentrated in the high-IL-18 stratum, which would turn an inconsistent biomarker into a stratifying one. A flat result across strata would be informative too: it would close the question.</p>
     <p><b>Why it is only an illustration.</b> IL-18 elevation in FMF is reported inconsistently, and tadekinig alfa has been tested in NLRC4 gain-of-function and XIAP deficiency but never in FMF. [[Haznedaroglu2005,Cacan2021,NCT03113760,NCT03512314]]</p></div>`;

  $('#cuClose').innerHTML=`<h3 class="sub">Where this leaves us</h3>
   <p>No approved therapy cures FMF today. Colchicine and IL-1 blockade control it, and they do so well enough that in one Turkish cohort of 587 patients survival did not differ significantly from the general population, though an Israeli cohort of adolescents did find higher mortality; both point to amyloidosis as the risk that matters. Every genuinely curative route on this page is either untested in FMF or untested in humans at all, and the ones with the clearest mechanism, editing the gene or replacing the marrow, are also the ones whose current form demands myeloablative conditioning. [[Akar2012,Twig2014,Zemer1986,Casgevy2023,CTgovSweep2026]]</p>
   <p>That is not a pessimistic reading. It is the reason the research agenda in the literature looks the way it does: short-path repurposing at the bottom of the pathway, a chemistry gap at the top, and a long list of questions that a handful of well-designed studies could answer. [[Cam2024]]</p>
   <div class="pt"><b>In plain words</b>Nothing available now removes FMF. What is available controls it, for most people, for life. The work on a cure is real but early, and no part of this page is advice about anyone\'s treatment.</div>`;
};
