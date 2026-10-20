/* =============== 1.3 Antibodies at the junction =============== */
const AN_ACHR=[
 {from:0,at:.05,k:'AChR · 1',t:'Dense receptor clusters on the crests',cap:'healthy: receptors packed on the fold crests',
  txt:'On a healthy endplate, rapsyn holds AChRs in a near-crystalline array of about 10,000 per µm² on the fold crests. [[Slater2017,Gautam1995]] Radioimmunoassay finds antibodies to this receptor in 83% to 88% of validated MG sera, depending on the antigen used. [[Vincent1985]] They are mostly IgG1 and IgG3. [[Rodgaard1987]]',
  pt:'Before the attack: catchers packed tightly on the ridges of the muscle membrane.'},
 {from:.15,at:.25,k:'AChR · 2',t:'Cross-linking: pairs taken inside',cap:'IgG bridges two receptors; the pair is taken in',
  txt:'An IgG has two arms, so it can bridge two receptors. Cross-linked receptors gather into clusters and are taken in through large endocytic pits. [[Pumplin1983]] Myasthenic immunoglobulin raised the receptor degradation rate from 3.97% per hour to 8.51% per hour. [[Kao1977]] Monovalent Fab, which cannot bridge, had no effect unless a second antibody linked it. [[Drachman1978]] One study disagrees that bridging is required: see the cards below. [[Sterz1986]]',
  pt:'Each antibody grabs two catchers at once. The muscle takes the pair inside and breaks it down, faster than it can make new ones.',
  hook:'Antigenic modulation: divalent IgG cross-links AChR, so it is taken in and degraded faster, about threefold in one study [[Drachman1978]] and about twofold (3.97% to 8.51% per hour) in another. [[Kao1977]]'},
 {from:.32,at:.45,k:'AChR · 3',t:'Complement: C1q to C5b-9',cap:'C1q binds the antibodies; C5b-9 rings form',
  txt:'IgG1 and IgG3 bound to AChR bind C1q, which starts the classical pathway: C1r and C1s, then C4, then the C5 convertase, then C5b with C6, C7, C8 and C9 as the terminal complex C5b-9. [[Albazli2020]] IgG and C3 sit on the postsynaptic membrane and on shed fold fragments, and the length of membrane carrying them tracks mEPP amplitude. [[Engel1977]] Membrane attack complex was found at every endplate of all 30 patients in one study, while inflammatory cells were at fewer than 10% of endplates. [[Nakano1993]]',
  pt:'The antibodies call in a cascade of blood proteins that ends by making rings in the muscle membrane.',
  hook:'The effector response is humoral, not cell-mediated: MAC at every endplate, almost no inflammatory cells. [[Nakano1993]]'},
 {from:.5,at:.56,k:'AChR · 4',t:'The folds simplify',cap:'fold tips break down and are shed into the cleft',
  txt:'C9 sits on short segments of postsynaptic membrane, on degenerating fold fragments shed into the cleft and on breaking folds, and the more C9 there is locally the less intact the folds are. [[Sahashi1980]] In chronic experimental MG, postsynaptic membrane length and density both fell, with the damage worst at the fold tips where AChR is concentrated. [[Engel1976]]',
  pt:'The deep folds are worn down. The muscle loses both its catchers and the shape that made them work well.',
  mg:'The trough Na⁺ channels go with the membrane that carries them: endplate Na⁺ current fell to about 60% of control, which raises the firing threshold. [[Ruff1998,Ruff2008]]'},
 {from:.66,at:.72,k:'AChR · 5',t:'Blockade: a minority mechanism',cap:'a few antibodies sit on the ACh site itself',
  txt:'Some antibodies sit on or near the ACh binding site. Myasthenic serum globulin blocked α-bungarotoxin binding in at least 5 of 15 patients. [[Almon1974]] In a 349-patient series, blocking antibodies were positive in 52% against 86% for binding and 86% for modulating antibodies, and blocking was never the only positive test. [[Howard1987]]',
  pt:'A few antibodies simply plug the catcher, so the messenger cannot land.',
  hook:'Three mechanisms: cross-linking and internalization, complement, and blockade. Blockade is the minority one. [[Drachman1978,Nakano1993,Howard1987]]'},
 {from:.8,at:.9,k:'AChR · 6',t:'Fewer receptors: a smaller endplate potential',cap:'about a third of the receptors left; the EPP falls',
  txt:'Deltoid junctions held 0.7 ± 0.1 × 10⁷ receptors in 76 patients against 2.1 ± 0.2 × 10⁷ in 49 controls, and the loss tracked clinical severity. [[Pestronk1985]] At the endplate, mEPPs fell to 53% and EPPs to 58% of control, and the safety factor fell from 2.98 to 1.09. [[Ruff2008]] That is the link back to <a href="#nmj" data-go="nmj">the junction</a>.',
  pt:'With a third of the catchers left, the muscle signal only just reaches the level needed to fire.',
  hook:'Receptor loss, not antibody titre, tracks severity. [[Pestronk1985,Howard1987]]'}];
const AN_MUSK=[
 {from:0,at:.05,k:'MuSK · 1',t:'Agrin, LRP4, MuSK, Dok-7, rapsyn',cap:'healthy: the clustering signal holds receptors together',
  txt:'The nerve releases agrin. Agrin binds LRP4, LRP4 forms a complex with MuSK and activates it, MuSK signals through Dok-7, and rapsyn tethers the receptors into dense clusters. [[Kim2008,Zhang2008,Okada2006,Gautam1995]] Mice without Dok-7 form no clusters and no neuromuscular synapses. [[Okada2006]]',
  pt:'A chain of proteins keeps the catchers bunched together under the nerve. The nerve sends the signal that starts it.'},
 {from:.15,at:.22,k:'MuSK · 2',t:'IgG4 swaps arms',cap:'Fab-arm exchange makes each antibody monovalent for MuSK',
  txt:'MuSK antibodies were found in 70% of AChR-antibody-negative patients and in none of the AChR-positive ones. [[Hoch2001]] They are mainly IgG4, a subclass that does not activate complement and binds Fcγ receptors weakly. [[Huijbers2018]] IgG4 swaps half-molecules with unrelated IgG4 in the blood, so each antibody ends up with two different arms: functionally monovalent, unable to cross-link. [[Vergoossen2021]] At least half of patients had MuSK IgG4 that could exchange in vitro, and exchanged hybrids were isolated from patients. [[Koneczny2017]]',
  pt:'These antibodies trade halves with other antibodies, so each one can hold only a single target.',
  hook:'IgG4 Fab-arm exchange makes MuSK antibodies functionally monovalent. About 99% of circulating IgG4 MuSK antibodies are bispecific. [[Vergoossen2021]]'},
 {from:.3,at:.38,k:'MuSK · 3',t:'The LRP4 link is blocked',cap:'IgG4 binds the first Ig-like domain and blocks MuSK–LRP4',
  txt:'Pathogenic IgG4 binds a structural epitope in the first Ig-like domain of MuSK, stops MuSK binding LRP4 and blocks agrin-driven MuSK phosphorylation, with no direct effect on dimerisation or internalization. [[Huijbers2013]] Monovalent anti-MuSK IgG4 abolished agrin-induced phosphorylation and clustering, while the same antibodies in bivalent form partly activated MuSK instead. [[Vergoossen2021]]',
  pt:'The antibody sits where two proteins should meet, so the clustering signal never starts.',
  hook:'Monovalent blocks, bivalent partly activates: the opposite directions are why monovalency matters. [[Vergoossen2021]]'},
 {from:.48,at:.56,k:'MuSK · 4',t:'Clusters disperse',cap:'receptors drift apart; no complement rings',
  txt:'Purified IgG4, but not IgG1–3, from MuSK patients bound mouse junctions and, injected into mice, caused paralysis, lower AChR density, fragmented AChR areas and severely reduced sensitivity to ACh. [[Klooster2012]] Monovalent anti-MuSK IgG4 caused rapid severe weakness in mice while the parental bivalent form was weaker or caused nothing. [[Vergoossen2021]] IgG4 itself does not activate complement. [[Huijbers2018]]',
  pt:'Without the signal, the catchers drift apart instead of being destroyed.',
  mg:'Disagreement: IgG1–3 MuSK antibodies also inhibited agrin-induced clustering and dispersed preformed clusters, so IgG4 may not be the only pathogenic factor. [[Koneczny2013,Vincent2018]]'},
 {from:.66,at:.74,k:'MuSK · 5',t:'No compensation from the nerve',cap:'the nerve does not turn release up, as it does in AChR MG',
  txt:'In AChR MG the nerve raises quantal content at the weakest endplates. [[Plomp1995]] In mice given patient MuSK IgG4 that compensation did not happen, and depression during fast activity was exaggerated. [[Klooster2012]]',
  pt:'In AChR MG the nerve partly makes up for the loss by releasing more. In MuSK MG it does not.'},
 {from:.82,at:.9,k:'MuSK · 6',t:'A different response to treatment',cap:'cholinesterase inhibition helps less; B-cell depletion helps more',
  txt:'Edrophonium or neostigmine was equivocal or negative in 11 of 37 MuSK-positive patients (29.7%), and oral pyridostigmine ranged from mild benefit to poor tolerance. [[Evoli2003]] In mice given MuSK antibodies, pyridostigmine made receptor loss and weakness worse. [[Morsch2013]] In a blinded multicentre review, 58% (14/24) of rituximab-treated MuSK patients reached a favourable outcome against 16% (5/31) of controls (Class IV evidence). [[Hehir2017]] IgG4 does not activate complement, so the reasoning behind C5 inhibition in AChR MG does not carry over. [[Huijbers2018]] Treatment choices are set by the treating clinician; see <a href="#ladder" data-go="ladder">the treatment ladder</a>.',
  pt:'Because the mechanism is different, the treatments that help are different too.',
  hook:'MuSK MG: IgG4, no complement, clustering blocked. Hence the interest in B-cell depletion rather than C5 inhibition. [[Huijbers2018,Hehir2017]]'}];
const AN_LRP4=[
 {from:0,at:.05,k:'LRP4 · 1',t:'LRP4 is agrin\'s receptor',cap:'healthy: agrin binds LRP4, which activates MuSK',
  txt:'LRP4 is the agrin receptor and the partner MuSK needs. [[Kim2008,Zhang2008]] Antibodies against it were first reported in AChR-antibody-negative patients; they stop LRP4 binding its ligand and are predominantly IgG1, a complement activator. [[Higuchi2011]]',
  pt:'LRP4 is the piece agrin lands on. Antibodies here hit the same chain one link earlier than MuSK.'},
 {from:.2,at:.3,k:'LRP4 · 2',t:'How often: the cohorts disagree',cap:'reported frequencies range widely between cohorts',
  txt:'One 217-patient series found LRP4 antibodies in 9.2% (11/120) of double-seronegative patients, against 2% and about 50% in two studies from other places. [[Zhang2012]] Another series found about half of 13 double-seronegative sera bound LRP4-transfected cells, and 4 of 13 cut agrin-induced AChR aggregation by more than half. [[Pevzner2012]] In routine clustered-AChR testing, all 21 seronegative patients tested were LRP4-negative. [[RodriguezCruz2015]]',
  pt:'How common these antibodies are depends a lot on who is testing and where.',
  hook:'LRP4 frequency is genuinely unsettled: 2% to about 50% of double-seronegative patients by cohort. [[Zhang2012]]'},
 {from:.42,at:.52,k:'LRP4 · 3',t:'Clustering blocked, and complement too',cap:'clusters disperse and C5b-9 appears at the endplate',
  txt:'Blocking LRP4 blocks the same clustering pathway MuSK antibodies hit. [[Higuchi2011,Pevzner2012]] But because these antibodies are IgG1, complement is in play as well: in seven LRP4-antibody-positive patients, C5b-9 was found at junctions in every biopsy, on 6% to 96% of identified endplates, always with IgG1, and three of four evaluable patients had reduced, shortened postsynaptic clefts. [[Hoffmann2026]]',
  pt:'Here both things happen: the clustering signal is blocked and the damaging cascade is called in.'},
 {from:.66,at:.76,k:'LRP4 · 4',t:'Antibodies are not unique to MG',cap:'LRP4 antibodies also appear in other diseases',
  txt:'LRP4 antibodies have been reported in up to 23% of people with ALS, so a positive result is read together with the clinical picture. [[Rousseff2021]] <a href="#ddx" data-go="ddx">The differential</a> covers that overlap.',
  pt:'A positive antibody test is one piece of evidence, not the whole diagnosis.'},
 {from:.86,at:.93,k:'LRP4 · 5',t:'Fewer receptors again',cap:'the end result is the same: fewer working receptors',
  txt:'The expected endpoint is the one measured in AChR MG: fewer working receptors on the crests, a smaller endplate potential and a thinner safety factor (1.09 against 2.98 in controls). [[Ruff2008]] Those measurements were made in AChR MG; no comparable count exists for LRP4 MG.',
  pt:'Different routes, same destination: not enough catchers.'}];
const AN_SERO=[
 {from:0,at:.05,k:'Seronegative · 1',t:'No antibody found by the standard test',cap:'the standard assay is negative, the clinical picture is MG',
  txt:'Standard radioimmunoassay was negative in 26 of 153 validated MG sera (17%), falling to 12% with a mixed protocol, so the test is positive in about 88% of people with clinical MG. [[Vincent1985]] "Seronegative" names a test result, not a different disease.',
  pt:'Some people have clear MG but the usual blood test finds nothing.'},
 {from:.2,at:.3,k:'Seronegative · 2',t:'Clustered AChR: a receptor the test can see',cap:'receptors clustered with rapsyn in cells reveal low-affinity antibodies',
  txt:'Expressing AChR subunits together with rapsyn in cells packs receptors into clusters, as they are packed at the endplate. That assay found antibodies in 66% (25/38) of sera that were negative in the solution-phase test; they were mainly IgG1 and activated complement. [[Leite2008]] In routine practice the yield was 38.1% (16/42) of RIA-negative patients, with 100% specificity. [[RodriguezCruz2015]]',
  pt:'Clumping the catchers together in the test makes weakly sticking antibodies visible.',
  hook:'Solution-phase assays miss low-affinity antibodies that bind only clustered receptors. [[Leite2008]]'},
 {from:.42,at:.52,k:'Seronegative · 3',t:'A distinct clinical profile',cap:'clustered-AChR-only patients: younger, more ocular, milder',
  txt:'Clustered-AChR-only patients in one series had prepubertal onset in 62.5% (median age 6 years, against 11.5% and median 38 years in the remaining seronegative group), ocular MG in 62.5% against 42.3%, less bulbar involvement, no respiratory symptoms, less thymectomy and more remission (50.0% against 8.3%). [[RodriguezCruz2015]]',
  pt:'This group tends to be younger, with more eye involvement and a gentler course.'},
 {from:.66,at:.76,k:'Seronegative · 4',t:'The rest of the map',cap:'LRP4, agrin and intracellular markers',
  txt:'About 10–20% of patients lack AChR antibodies; MuSK is the commonest alternative, and cell-based assays extend testing to clustered AChR, LRP4 and agrin. Antibodies to intracellular targets (cortactin, titin, ryanodine receptor) serve as biomarkers in some patients. [[Vincent2018]] Titin and ryanodine receptor antibodies occur in about 95% and about 70% of thymoma MG, and their in vivo pathogenicity is still unproven. [[Romi2011,Skeie2006]]',
  pt:'More tests exist now, and some antibodies are useful signposts rather than the cause of the weakness.'},
 {from:.86,at:.93,k:'Seronegative · 5',t:'Treated as MG',cap:'diagnosis rests on the clinical and electrical picture',
  txt:'When no antibody is found, the diagnosis rests on the clinical picture with nerve testing and single-fibre EMG, which <a href="#dx" data-go="dx">Diagnosis</a> covers. Guidance says thymectomy "may be considered" in seronegative generalised MG if immunosuppression fails or is not tolerated. [[Sanders2016,Narayanaswami2021]] Since 8 May 2026 the US efgartigimod label covers adults with generalised MG without an antibody restriction, with ADAPT SERON data in the label. [[FDAVyvgart2026]] Treatment choices are set by the treating clinician.',
  pt:'A negative antibody test does not rule MG out.'}];
const AN_MODES={
 achr:{steps:AN_ACHR,label:'AChR · IgG1/IgG3',col:'var(--ab)',btn:'anAChR',
   mech:[['Cross-linking → taken inside',.15],['Complement → C5b-9',.32],['Folds damaged, receptors shed',.5],['Blockade of the ACh site (few)',.66]],
   rec0:.33,recNote:'● measured 0.7 vs 2.1 ×10⁷ per NMJ',fold0:.45,
   cap:'AChR antibodies: cross-linking, complement, blockade'},
 musk:{steps:AN_MUSK,label:'MuSK · IgG4',col:'var(--musk)',btn:'anMuSK',
   mech:[['Fab-arm exchange → monovalent',.15],['MuSK–LRP4 link blocked',.3],['Clusters disperse',.48],['No complement',0]],
   rec0:.45,recNote:'○ schematic: density down, area broken up',fold0:.85,
   cap:'MuSK antibodies: monovalent IgG4 blocks the clustering signal'},
 lrp4:{steps:AN_LRP4,label:'LRP4 · IgG1',col:'var(--ab)',btn:'anLRP4',
   mech:[['Agrin–LRP4 binding blocked',.2],['Clusters disperse',.42],['Complement → C5b-9',.42],['Cleft shortened',.6]],
   rec0:.42,recNote:'○ schematic: no published count',fold0:.6,
   cap:'LRP4 antibodies: clustering blocked and complement at the endplate'},
 sero:{steps:AN_SERO,label:'Seronegative',col:'var(--muted)',btn:'anSero',
   mech:[['Standard assay negative',0],['Clustered-AChR assay positive in 38–66%',.2],['Mainly IgG1, complement-fixing',.42],['Diagnosis on clinical and EMG picture',.66]],
   rec0:.6,recNote:'○ schematic: loss not quantified',fold0:.8,
   cap:'Seronegative MG: the antibody is often there but harder to see'}};
const AN_THY=[
 {k:'Normal',t:'The thymus teaches tolerance',
  txt:'Thymic muscle-like (myoid) cells carry AChR. [[Kao1977b]] In medullary thymic epithelial cells, AIRE controls the display of self-antigens, including CHRNA1, the AChR α subunit gene. [[Strobel2007,Giraud2007]]',
  pt:'The thymus trains immune cells not to attack the body. It shows them pieces of the body, including the muscle receptor.'},
 {k:'Early-onset MG',t:'Germinal centres inside the thymus',
  txt:'The hyperplastic early-onset MG thymus has the features of a tertiary lymphoid organ: new blood vessels with high endothelial venules, chemokines that recruit cells from the blood and ectopic germinal centres, with epithelial or myoid cells supplying AChR for local presentation to recruited B cells and T follicular helper cells. [[Cron2018]] Thymic regulatory T cells are present in normal numbers but work poorly, with reduced Foxp3. [[Balandina2005]]',
  pt:'In early-onset MG the thymus grows immune structures that normally belong in lymph nodes, right next to cells carrying the muscle receptor.'},
 {k:'Antibody factory',t:'Plasma cells and antibody into the blood',
  txt:'B cells that recognise AChR mature in those centres and become antibody-producing cells. More ectopic germinal centres in the removed thymus predicted a better outcome after thymectomy in early-onset MG. [[Sarkkinen2022]] In MuSK MG, after B-cell depletion, autoantibody-expressing CD27+ B cells reappear during relapse but not in remission, and plasmablasts make MuSK antibody. [[Stathopoulos2017]] <a href="#thymectomy" data-go="thymectomy">Thymectomy over the years</a> follows the trial evidence.',
  pt:'Inside those structures, cells that make the antibody are produced and released into the blood.'},
 {k:'Thymoma',t:'A tumour that has lost AIRE',
  txt:'About 95% of thymoma patients are "chimeric": AIRE and the major AIRE-dependent self-antigens are undetectable in the tumour but kept in the remaining thymus and lymph nodes. [[Strobel2007]] Thymomas also lack myoid cells and fail to generate FOXP3+ regulatory T cells. [[Marx2010,Strobel2008]] MG occurs in 30-44% of thymoma patients. [[Okuno2025]] Thymoma MG brings antibodies to titin (about 95%) and the ryanodine receptor (about 70%). [[Romi2011]]',
  pt:'A thymus tumour loses the machinery that teaches tolerance, and autoimmunity follows.',
  hook:'AIRE is undetectable in the tumour in about 95% of thymoma patients. [[Strobel2007]] In a person with MG under 60, titin and ryanodine receptor antibodies strongly suggest thymoma. [[Romi2011]]'},
 {k:'Late-onset & MuSK',t:'Where the thymus is not the story',
  txt:'Thymic roles differ by subtype: inflammatory changes matter in early-onset MG, neoplastic changes in thymoma MG, and probably age-related changes in late-onset MG, while the thymus is presumably unrelated to MuSK MG. [[Marx2013]] MuSK thymi are largely unremarkable: only 4 of 14 had rare small germinal centres. [[Leite2005]]',
  pt:'Not every kind of MG starts in the thymus.'}];
/* a membrane attack complex seen from the side: a ring of staves through the membrane */
function anMac(x,y,o=1,g=1){let s=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<5;i++)s+=`<rect x="${f1(-7+i*3.1)}" y="-7" width="2.1" height="${f1(14*g)}" rx="1" style="fill:var(--comp)"/>`;
  return s+`<path d="M-8 ${f1(7*g)}H8" style="stroke:var(--comp);stroke-width:1;opacity:.6"/></g>`}
/* a small labelled protein box standing in the membrane */
function anProt(x,y,w,h,lbl,col,o=1,up=1){return `<g style="opacity:${(+o).toFixed(2)}"><rect x="${f1(x-w/2)}" y="${f1(up>0?y-h:y)}" width="${f1(w)}" height="${f1(h)}" rx="3" style="fill:var(--panel);stroke:${col};stroke-width:2"/><text x="${f1(x)}" y="${f1(up>0?y-h/2+3.5:y+h/2+3.5)}" class="t-xs t-mid" style="fill:${col};font-weight:700">${lbl}</text></g>`}
inits.antibodies=()=>{
  const svg=$('#anSvg'),rg=$('#anT');let mode='achr',setSt=null;
  const LW={W:720,H:470,jx0:12,jx1:430,topY:18,preY:112,postY:238,mBot:398,D:86,nf:5,P:{x:446,y:24,w:262,h:424}};
  const LN={W:400,H:880,jx0:8,jx1:392,topY:18,preY:112,postY:238,mBot:398,D:80,nf:4,P:{x:8,y:414,w:384,h:452}};
  const GC={};
  function geo(L,key){
    if(GC[key])return GC[key];
    const span=L.jx1-L.jx0,fc=[];for(let i=0;i<L.nf;i++)fc.push(L.jx0+(i+.5)*span/L.nf);
    const rec=[],r=rng(7),step=span/L.nf;
    fc.forEach((x,i)=>{const n=Math.max(2,Math.round(step/24));
      for(let j=0;j<n;j++){const px=x+10+(j+.5)*(step-20)/n;if(px<L.jx1-8)rec.push({x:px,i})}});
    rec.forEach((d,k)=>{d.k=k;d.ord=r()});
    const order=[...rec].sort((a,b)=>a.ord-b.ord).map(d=>d.k);
    const ves=[];for(let i=0;i<9;i++)ves.push({x:lerp(L.jx0+28,L.jx1-28,(i+r()*.5)/9),y:lerp(L.topY+30,L.preY-16,r())});
    return GC[key]={fc,rec,order,ves,span};
  }
  function prog(t){
    const P={xl:0,comp:0,dmg:0,blk:0,exch:0,block:0,disp:0,assay:0},M=AN_MODES[mode];
    if(mode==='achr'){P.xl=ease(ramp(t,.15,.32));P.comp=ease(ramp(t,.32,.5));P.dmg=ease(ramp(t,.5,.66));P.blk=ease(ramp(t,.66,.8))}
    else if(mode==='musk'){P.exch=ease(ramp(t,.15,.3));P.block=ease(ramp(t,.3,.48));P.disp=ease(ramp(t,.48,.74))}
    else if(mode==='lrp4'){P.block=ease(ramp(t,.2,.42));P.disp=ease(ramp(t,.42,.72));P.comp=ease(ramp(t,.42,.66));P.dmg=ease(ramp(t,.6,.82))}
    else{P.assay=ease(ramp(t,.2,.45));P.disp=ease(ramp(t,.3,.7))}
    P.rec=lerp(1,M.rec0,ease(ramp(t,mode==='achr'?.15:.25,.9)));
    P.fold=lerp(1,M.fold0,ease(ramp(t,.5,.84)));
    return P;
  }
  function junction(t,L,G,P,D,mid){
    let s='';
    if(mode!=='sero'){
      s+=`<path d="M${L.jx0+10} ${L.preY}V${L.topY+22}Q${L.jx0+10} ${L.topY} ${L.jx0+32} ${L.topY}H${L.jx1-32}Q${L.jx1-10} ${L.topY} ${L.jx1-10} ${L.topY+22}V${L.preY}Z" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:2"/>`;
      s+=`<text x="${L.jx0+22}" y="${L.topY+18}" class="t-xs">NERVE TERMINAL</text>`;
      G.ves.forEach(v=>s+=vesicle(v.x,v.y,7,.85,4));}
    s+=`<rect x="${L.jx0}" y="${L.postY}" width="${L.jx1-L.jx0}" height="${L.mBot-L.postY}" rx="6" style="fill:var(--muscle)"/>`;
    s+=`<path d="M${L.jx0} ${L.postY}H${L.jx1}" style="stroke:var(--memb);stroke-width:2.4"/>`;
    G.fc.forEach(x=>{const w=12;s+=`<path d="M${f1(x-w/2)} ${L.postY-1}V${f1(L.postY+D-w/2)}Q${f1(x-w/2)} ${f1(L.postY+D)} ${f1(x)} ${f1(L.postY+D)}Q${f1(x+w/2)} ${f1(L.postY+D)} ${f1(x+w/2)} ${f1(L.postY+D-w/2)}V${L.postY-1}" style="fill:var(--field);stroke:var(--memb);stroke-width:1.6"/>`});
    s+=`<path d="M${L.jx0+6} ${L.postY+8}H${L.jx1-6}" style="stroke:var(--achr);stroke-width:1.2;stroke-dasharray:3 4;opacity:.7"/>`;
    s+=`<text x="${L.jx0+8}" y="${L.mBot-24}" class="t-xs">MUSCLE FIBRE · rapsyn (dashed) holds the clusters</text>`;
    s+=`<text x="${L.jx0+8}" y="${L.mBot-10}" class="t-xs">folds at ${Math.round(P.fold*100)}% of baseline depth ○ schematic</text>`;
    return s;
  }
  function overlay(t,N,L,G,P,D,mid,goneSet){
    let s='';const live=G.rec.filter(d=>!goneSet.has(d.k));
    const drift=d=>mode==='achr'?0:(d.k%2?1:-1)*P.disp*12;
    live.forEach(d=>s+=achr(d.x+drift(d),L.postY,10,0,1));
    if(mode==='achr'){
      const pairs=[];for(let i=0;i+1<G.rec.length;i+=2)pairs.push([G.rec[i],G.rec[i+1]]);
      pairs.forEach((p,i)=>{const both=goneSet.has(p[0].k)&&goneSet.has(p[1].k),cx=(p[0].x+p[1].x)/2;
        if(both){const pull=ease(clamp((P.xl*pairs.length-i)/1.6)),y=L.postY+pull*30;
          s+=achr(p[0].x,y,10,0,1-pull*.5)+achr(p[1].x,y,10,0,1-pull*.5)+igg(cx,y-22,11,Math.PI,1-pull*.4,'var(--ab)');
          if(pull>.7&&i%2===0)s+=`<text x="${f1(cx)}" y="${f1(y+24)}" class="t-xs t-mid" style="fill:var(--ab);opacity:${f1(ramp(pull,.7,.95))}">degraded</text>`}
        else if(P.xl>.04&&i<P.xl*pairs.length+1)s+=igg(cx,L.postY-26,11,Math.PI,.75,'var(--ab)')});
      const head=P.blk>.25?['a few antibodies sit on the ACh binding site itself','var(--warn)']:P.dmg>.1?['fold fragments with IgG and C3 shed into the cleft','var(--comp)']:P.xl>.1?['degradation rate 3.97 → 8.51 % per hour','var(--ab)']:null;
      if(head)s+=`<text x="${f1(mid)}" y="${f1(L.postY-116)}" class="t-xs t-mid" style="fill:${head[1]}">${head[0]}</text>`;
      if(P.comp>.02){const cy=L.postY-92,fade=1-.85*P.blk;
        ['C1q','C4b2a','C3b','C5','C5b-9'].forEach((c,i)=>{const o=ramp(P.comp,i*.13,i*.13+.22)*fade;if(o<=0)return;
          const x=lerp(L.jx0+42,L.jx1-42,i/4);
          s+=`<text x="${f1(x)}" y="${f1(cy)}" class="t-xs t-mid" style="fill:var(--comp);opacity:${f1(o)}">${c}</text>`;
          if(i<4&&o>.6)s+=`<path d="M${f1(x+20)} ${f1(cy-3.5)}H${f1(lerp(L.jx0+42,L.jx1-42,(i+1)/4)-20)}" class="arrow" style="stroke:var(--comp);opacity:${f1(o)}" marker-end="url(#anArC)"/>`});
        G.fc.forEach((x,i)=>{const o=ramp(P.comp,.55+i*.07,.85+i*.07);if(o>0)s+=anMac(x+20,L.postY,o)})}
      if(P.dmg>.02){G.fc.forEach((x,i)=>{const o=ramp(P.dmg,i*.1,.4+i*.1);if(o<=0)return;const fy=L.postY-62-6*o;
          s+=`<g transform="translate(${f1(x+26)} ${f1(fy)}) rotate(${f1(-18+i*9)})" style="opacity:${f1(o*.9)}"><path d="M-9 0h18" style="stroke:var(--memb);stroke-width:3;stroke-linecap:round"/>${achr(-3,0,7,0,1)}${igg(4,-9,7,Math.PI,.9,'var(--ab)')}</g>`});
      }
      if(P.blk>.02&&live.length){const pickd=[live[0],live[Math.floor(live.length/2)]].filter((d,i,a)=>d&&a.indexOf(d)===i);
        pickd.forEach(d=>s+=igg(d.x,L.postY-24,10,Math.PI,P.blk,'var(--warn)'));
      }
    }
    if(mode==='musk'||mode==='lrp4'){
      const sx=mid-10,col=mode==='musk'?'var(--musk)':'var(--ab)';
      s+=anProt(sx-30,L.postY,40,24,'LRP4','var(--nerve)')+anProt(sx+16,L.postY,36,24,'MuSK','var(--musk)');
      s+=`<path d="M${f1(sx-10)} ${f1(L.postY-12)}H${f1(sx-2)}" style="stroke:${P.block>.35?'var(--ab)':'var(--achr)'};stroke-width:${P.block>.35?1.2:3};${P.block>.35?'stroke-dasharray:2 2':''}"/>`;
      s+=anProt(sx+16,L.postY+6,36,18,'Dok-7','var(--achr)',1,-1);
      const ag=ease(ramp(t,.02,.2)),agX=L.jx0+26,agY=L.postY-26;
      const run=lerp(0,sx-34-agX,clamp((ag-.5)*2)),down=lerp(L.preY+6,agY,clamp(ag*2));
      s+=`<path d="M${f1(agX)} ${L.preY+6}V${f1(down)}${ag>.5?`H${f1(agX+run)}`:''}" style="fill:none;stroke:var(--ach);stroke-width:1.6;stroke-dasharray:3 3"/>`;
      s+=`<circle cx="${f1(ag>.5?agX+run:agX)}" cy="${f1(down)}" r="4.5" style="fill:var(--ach)"/><text x="${f1(agX+6)}" y="${f1(agY-8)}" class="t-xs">agrin from the nerve</text>`;
      if(mode==='musk'){
        const ex=P.exch,x0=L.jx0+56,x1=L.jx0+140;
        s+=igg(lerp(x0,sx+62,ex),lerp(L.topY+66,L.postY-46,ex),12,lerp(0,Math.PI,ex),1,'var(--musk)');
        if(ex<.95)s+=igg(lerp(x1,sx+62,ex),lerp(L.topY+66,L.postY-46,ex),12,lerp(0,Math.PI,ex),1-ex,'var(--muted)');
        if(ex>.55)s+=`<text x="${f1(sx+78)}" y="${f1(L.postY-48)}" class="t-xs" style="fill:var(--musk);opacity:${f1(ramp(ex,.55,.9))}">monovalent: one MuSK arm</text>`;
        const hm=P.disp>.3?['no phosphorylation: the clusters disperse','var(--musk)']:P.block>.15?['MuSK–LRP4 blocked: the agrin signal stops here','var(--ab)']:['Fab-arm exchange: IgG4 swaps half-molecules','var(--musk)'];
        s+=`<text x="${f1(mid)}" y="${f1(L.postY-116)}" class="t-xs t-mid" style="fill:${hm[1]}">${hm[0]}</text>`;
        s+=`<text x="${L.jx1-10}" y="${f1(L.topY+18)}" class="t-xs t-end" style="fill:var(--good)">IgG4: complement not activated</text>`;
      }else{
        s+=igg(sx-30,L.postY-50,12,Math.PI,ease(ramp(t,.08,.26)),col);
        const hl=P.comp>.3?['IgG1 fixes complement: C5b-9 on 6–96% of endplates','var(--comp)']:P.block>.15?['agrin–LRP4 binding blocked: clustering stops','var(--ab)']:['LRP4 antibodies are mainly IgG1','var(--ab)'];
        s+=`<text x="${f1(mid)}" y="${f1(L.postY-116)}" class="t-xs t-mid" style="fill:${hl[1]}">${hl[0]}</text>`;
        if(P.comp>.05)G.fc.forEach((x,i)=>{const o=ramp(P.comp,i*.12,.3+i*.12);if(o>0)s+=anMac(x+20,L.postY,o)});
      }
      if(P.disp>.12)s+=`<text x="${f1(mid)}" y="${f1(L.postY+L.D+26)}" class="t-xs t-mid" style="fill:${col};opacity:${f1(P.disp)}">receptors drift apart: the cluster loosens</text>`;
    }
    if(mode==='sero'){
      const bx=L.jx0+10,by=L.topY+6,bw=(L.jx1-L.jx0)-20,bh=98,c1=bx+bw*.27,c2=bx+bw*.73;
      s+=`<rect x="${bx}" y="${by}" width="${f1(bw)}" height="${bh}" rx="8" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<text x="${bx+10}" y="${by+16}" class="t-sm" style="fill:var(--ink);font-weight:600">THE ASSAY, NOT THE DISEASE</text>`;
      [[c1,'solution-phase AChR',0],[c2,'AChR clustered with rapsyn',1]].forEach(([cx,lbl,cl])=>{
        s+=`<text x="${f1(cx)}" y="${by+34}" class="t-xs t-mid">${lbl}</text>`;
        for(let i=0;i<4;i++)s+=achr(cl?cx-18+i*12:cx-33+i*22,by+76,9,0,1);
        if(cl&&P.assay>.1)for(let i=0;i<2;i++)s+=igg(cx-11+i*24,by+56,10,Math.PI,P.assay,'var(--ab)');
        if(!cl&&P.assay>.3)s+=`<text x="${f1(cx)}" y="${by+58}" class="t-xs t-mid" style="fill:var(--muted);opacity:${f1(P.assay)}">antibody does not hold</text>`});
      s+=`<text x="${f1(c2)}" y="${by+90}" class="t-xs t-mid" style="fill:var(--achr);opacity:${f1(P.assay)}">positive in 38–66% of negative sera</text><text x="${f1(c1)}" y="${by+90}" class="t-xs t-mid">negative</text>`;
      if(P.disp>.2)s+=`<text x="${f1(mid)}" y="${f1(L.postY-34)}" class="t-xs t-mid" style="fill:var(--muted);opacity:${f1(P.disp)}">the junction is attacked the same way: receptors are lost</text>`;
    }
    return s;
  }
  function panel(t,N,L,P,M){
    const B=L.P,x=B.x,w=B.w,y=B.y;let s=`<rect x="${x}" y="${y}" width="${w}" height="${B.h}" rx="12" style="fill:var(--panel-2)"/>`;
    s+=`<text x="${x+14}" y="${y+22}" class="t-sm" style="fill:var(--ink);font-weight:600">READOUT</text><text x="${x+w-14}" y="${y+22}" class="t-xs t-end" style="fill:${M.col}">${M.label}</text>`;
    const bar=(by,lbl,v,note,col)=>`<text x="${x+14}" y="${by}" class="t-xs">${lbl}</text><text x="${x+w-14}" y="${by}" class="t-xs t-end" style="fill:var(--ink)">${Math.round(v*100)}%</text>`
      +`<rect x="${x+14}" y="${by+6}" width="${w-28}" height="10" rx="5" style="fill:var(--field)"/><rect x="${x+14}" y="${by+6}" width="${f1((w-28)*v)}" height="10" rx="5" style="fill:${col}"/>`
      +`<text x="${x+14}" y="${by+30}" class="t-xs">${note}</text>`;
    s+=bar(y+50,'RECEPTORS REMAINING',P.rec,M.recNote,'var(--achr)');
    s+=bar(y+108,'FOLD DEPTH',P.fold,'○ schematic: folds simplify','var(--memb)');
    s+=`<text x="${x+14}" y="${y+172}" class="t-xs" style="fill:var(--ink);font-weight:600">MECHANISMS</text>`;
    M.mech.forEach((m,i)=>{const na=m[1]===0,on=!na&&t>=m[1],yy=y+194+i*24;
      s+=`<circle cx="${x+21}" cy="${yy-4}" r="5" style="fill:${on?M.col:'var(--panel)'};stroke:${na?'var(--muted)':M.col};stroke-width:1.6"/><text x="${x+34}" y="${yy}" class="t-xs" style="fill:${on||na?'var(--ink)':'var(--muted)'}">${m[0]}</text>`});
    const ty=y+194+M.mech.length*24+22;
    s+=`<text x="${x+14}" y="${ty}" class="t-xs" style="fill:var(--ink);font-weight:600">WHERE TREATMENTS ACT</text>`;
    const wrap=(txt,n)=>{const w=txt.split(' ');const out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){out.push(l);l=x}else l=(l?l+' ':'')+x});if(l)out.push(l);return out};
    const rows=[];
    rows.push(['→ FcRn blockers: less IgG in the blood','biologics']);
    if(mode==='achr'||mode==='lrp4')rows.push(['→ C5 inhibitors: no C5b-9 ring','biologics']);
    if(mode==='musk')rows.push(['C5 inhibitors: no target, IgG4 does not fix complement','']);
    if(mode!=='musk')rows.push(['→ Pyridostigmine: ACh lasts longer in the cleft','pyrido']);
    else rows.push(['→ Pyridostigmine: helps less here, see the module','pyrido']);
    let yy=ty+10;
    rows.forEach(([lbl,go])=>{const ls=wrap(lbl,Math.floor((w-44)/5.8)),h=10+ls.length*13;
      s+=`<g ${go?`class="clk" data-go="${go}" role="link" tabindex="0" aria-label="${lbl.replace('→ ','')}"`:''}><rect x="${x+14}" y="${yy}" width="${w-28}" height="${h}" rx="6" style="fill:var(--panel)"/>`;
      ls.forEach((l,k)=>s+=`<text x="${x+22}" y="${yy+16+k*13}" class="t-xs" style="fill:${go?'var(--drug)':'var(--muted)'}">${l}</text>`);
      s+='</g>';yy+=h+6});
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 470','400 880'),L=N?LN:LW,G=geo(L,N?'n':'w'),P=prog(t),M=AN_MODES[mode];
    const gone=Math.round(G.rec.length*(1-P.rec)),goneSet=new Set(G.order.slice(0,gone));
    const D=L.D*P.fold,mid=(L.jx0+L.jx1)/2;
    svg.innerHTML=`<defs>${marker('anAr','var(--muted)')}${marker('anArC','var(--comp)')}</defs>`
      +junction(t,L,G,P,D,mid)+overlay(t,N,L,G,P,D,mid,goneSet)+panel(t,N,L,P,M);
    const p=phaseOf(M.steps,t);setSt&&setSt(p);const S=M.steps[p];
    $('#anNote').innerHTML=noteHTML(S)+(S.mg?`<div class="callout">${S.mg}</div>`:'');
    $('#anCap').textContent=`${M.cap}. Schematic, not to scale; the cleft is drawn wide to make room for the antibodies.`;
  }
  const stop=playWire(rg,$('#anPlay'),draw,17000,'Replay','antibodies');
  function wireSteps(){const old=$('#anSteps'),fresh=old.cloneNode(false);old.replaceWith(fresh);setSt=stepWire(fresh,AN_MODES[mode].steps,rg,draw,stop)}
  function pick(m){mode=m;Object.keys(AN_MODES).forEach(k=>$('#'+AN_MODES[k].btn).setAttribute('aria-pressed',k===m));
    stop();wireSteps();rg.value=.05;draw(.05)}
  Object.keys(AN_MODES).forEach(m=>$('#'+AN_MODES[m].btn).onclick=()=>pick(m));
  wireSteps();draw(+rg.value);

  /* ---- where the antibodies come from: a thymus stepper ---- */
  const AN_TTXT=[
   ['TOLERANCE','AIRE drives the display of self-antigens,','including the AChR α subunit gene.','Self-reactive T cells are removed.'],
   ['GERMINAL CENTRES','New vessels, chemokines and ectopic germinal','centres: a tertiary lymphoid organ.','Regulatory T cells are there but work poorly.'],
   ['ANTIBODY OUT','Plasma cells release AChR antibody into the','blood, and it reaches every junction.','More germinal centres predicted a better','outcome after thymectomy.'],
   ['TOLERANCE LOST','About 95% of thymomas are "chimeric": AIRE','is kept in the remnant thymus, not the tumour.','MG occurs in 30-44% of thymoma patients.'],
   ['NOT ALWAYS THE THYMUS','Late-onset MG: age-related change, probably.','MuSK MG: 4 of 14 thymi had rare small germinal','centres; otherwise they looked like controls.']];
  const ts=$('#anThySvg');let ti=0,stopT=null,tp=1;
  function thyPic(i,cx,cy,sc,a){
    const S=(v)=>f1(v*sc),cell=(dx,dy,col,lbl)=>`<circle cx="${f1(cx+dx*sc)}" cy="${f1(cy+dy*sc)}" r="${S(7)}" style="fill:${col};opacity:.9"/>${lbl?`<text x="${f1(cx+dx*sc)}" y="${f1(cy+dy*sc+19*sc)}" class="t-xs t-mid">${lbl}</text>`:''}`;
    let g='';
    if(i!==3&&i!==4)[-48,48].forEach(dx=>g+=`<ellipse cx="${f1(cx+dx*sc)}" cy="${f1(cy)}" rx="${S(46)}" ry="${S(74)}" style="fill:var(--panel-2);stroke:var(--memb);stroke-width:2"/>`);
    if(i===0){g+=cell(-48,-30,'var(--achr)','mTEC · AIRE')+cell(-48,34,'var(--ach)','myoid cell · AChR')+cell(48,-30,'var(--nerve)','T cell');
      g+=`<path d="M${f1(cx-36*sc)} ${f1(cy-30*sc)}H${f1(cx+36*sc)}" class="arrow" marker-end="url(#anThyAr)"/><text x="${f1(cx)}" y="${f1(cy-40*sc)}" class="t-xs t-mid">self-antigen shown</text>`}
    else if(i===1){for(let k=0;k<4;k++){const x=cx+(-60+k*40)*sc,y=cy+(-32+(k%2)*58)*sc;
        g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(15*sc*a)}" style="fill:var(--ab-soft);stroke:var(--ab);stroke-width:1.6"/>`}
      g+=cell(48,48,'var(--ach)','myoid · AChR')+`<text x="${f1(cx)}" y="${f1(cy-86*sc)}" class="t-xs t-mid" style="fill:var(--ab)">ectopic germinal centres</text>`}
    else if(i===2){g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${S(46)}" style="fill:var(--ab-soft);stroke:var(--ab);stroke-width:2"/>`;
      for(let k=0;k<7;k++){const ang=k/7*Math.PI*2;g+=`<circle cx="${f1(cx+Math.cos(ang)*26*sc)}" cy="${f1(cy+Math.sin(ang)*26*sc)}" r="${S(6)}" style="fill:var(--ab)"/>`}
      g+=`<text x="${f1(cx)}" y="${f1(cy-86*sc)}" class="t-xs t-mid">B cells that recognise AChR</text>`;
      for(let k=0;k<3;k++){const p=clamp(a*1.4-k*.14);if(p>0)g+=igg(cx+lerp(50,112,p)*sc,cy+lerp(0,-26-k*12,p)*sc,11*sc,Math.PI/2,p,'var(--ab)')}
      g+=`<text x="${f1(cx+66*sc)}" y="${f1(cy-56*sc)}" class="t-xs" style="fill:var(--ab);opacity:${f1(a)}">into the blood</text>`}
    else if(i===3){g+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1((50+34*a)*sc)}" ry="${f1((44+26*a)*sc)}" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2.4"/>`;
      g+=`<text x="${f1(cx)}" y="${f1(cy)}" class="t-lbl t-mid" style="fill:var(--bad)">THYMOMA</text><text x="${f1(cx)}" y="${f1(cy+18*sc)}" class="t-xs t-mid" style="fill:var(--bad)">AIRE undetectable</text><text x="${f1(cx)}" y="${f1(cy+30*sc)}" class="t-xs t-mid" style="fill:var(--bad)">no myoid cells</text>`}
    else{g+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${S(84)}" ry="${S(58)}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2;stroke-dasharray:5 4"/><text x="${f1(cx)}" y="${f1(cy+4)}" class="t-sm t-mid">unremarkable</text>`}
    g+=`<text x="${f1(cx)}" y="${f1(cy+92*sc)}" class="t-sm t-mid" style="fill:var(--ink)">${['normal thymus','early-onset MG thymus','germinal centre','thymoma','late-onset MG · MuSK MG'][i]}</text>`;
    return g;
  }
  function thyDraw(){const N=vb(ts,'720 300','400 420'),T=AN_TTXT[ti];
    let s=`<defs>${marker('anThyAr','var(--muted)')}</defs>`;
    if(N){s+=thyPic(ti,200,130,.86,tp);
      s+=`<text x="14" y="276" class="t-sm" style="fill:var(--ink);font-weight:600">${T[0]}</text>`;
      T.slice(1).forEach((l,k)=>s+=`<text x="14" y="${298+k*17}" class="t-xs">${l}</text>`);
    }else{s+=thyPic(ti,200,140,1,tp);
      s+=`<text x="428" y="52" class="t-sm" style="fill:var(--ink);font-weight:600">${T[0]}</text>`;
      T.slice(1).forEach((l,k)=>s+=`<text x="428" y="${76+k*20}" class="t-xs">${l}</text>`);
      s+=`<path d="M392 140H418" class="arrow" marker-end="url(#anThyAr)"/>`}
    ts.innerHTML=s;
    $('#anThyNote').innerHTML=noteHTML({k:'Step '+(ti+1)+' of 5 · '+AN_THY[ti].k,t:AN_THY[ti].t,txt:AN_THY[ti].txt,pt:AN_THY[ti].pt,hook:AN_THY[ti].hook});
    $$('[data-thy]').forEach((b,k)=>b.setAttribute('aria-pressed',k===ti));
  }
  $('#anThySteps').innerHTML=AN_THY.map((d,i)=>`<button data-thy="${i}" aria-pressed="${i===0}"><b>${String(i+1).padStart(2,'0')}</b><span>${d.k}</span></button>`).join('');
  $('#anThySteps').addEventListener('click',e=>{const b=e.target.closest('[data-thy]');if(!b)return;
    ti=+b.dataset.thy;if(stopT)stopT();tp=0;stopT=animate(700,p=>{tp=p;thyDraw()},()=>{tp=1;thyDraw();stopT=null})});
  thyDraw();
  {const prev=redraws.antibodies;redraws.antibodies=()=>{prev&&prev();thyDraw()}}
};
